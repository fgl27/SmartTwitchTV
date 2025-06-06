/*
 * Copyright (c) 2017-2020 Felipe de Leon <fglfgl27@gmail.com>
 *
 * This file is part of SmartTwitchTV <https://github.com/fgl27/SmartTwitchTV>
 *
 * SmartTwitchTV is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SmartTwitchTV is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SmartTwitchTV.  If not, see <https://github.com/fgl27/SmartTwitchTV/blob/master/LICENSE>.
 *
 */

package com.fgl27.twitch.notification;

import static android.content.pm.ServiceInfo.FOREGROUND_SERVICE_TYPE_SHORT_SERVICE;

import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.IBinder;
import android.os.Looper;
import androidx.core.app.NotificationCompat;
import com.fgl27.twitch.Constants;
import com.fgl27.twitch.R;
import com.fgl27.twitch.Tools;
import java.util.Objects;
import net.grandcentrix.tray.AppPreferences;

public class NotificationService extends Service {

    @SuppressWarnings("FieldCanBeLocal")
    private final String TAG = "STTV_Notification";

    private HandlerThread NotificationThread;
    private Handler NotificationHandler;
    private Handler ToastHandler;

    private BroadcastReceiver mReceiver = null;
    private AppPreferences appPreferences;

    private boolean isRunning;
    private boolean screenOn = true;

    private Context context;

    private String UserId;

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        startNotification();

        try {
            String action = intent.getAction();

            if (Objects.equals(action, Constants.ACTION_NOTIFY_STOP)) {
                //Fully stop the service
                StopService();
            } else if (Objects.equals(action, Constants.ACTION_NOTIFY_BACKGROUND_START)) {
                appPreferences = new AppPreferences(getApplicationContext());

                appPreferences.put(Constants.PREF_APP_RUNNING, false);

                //Start or restart the service
                startService();
            } else if (Objects.equals(action, Constants.ACTION_NOTIFY_START)) {
                //Start or restart the service
                startService();
            } else if (Objects.equals(action, Constants.ACTION_SCREEN_OFF)) {
                screenOn = false;

                //Stop all current running notification
                StopRunningNotifications();
            } else if (Objects.equals(action, Constants.ACTION_SCREEN_ON)) {
                screenOn = true;
                //Small delay as the device just wakeup and may need some time to connect to the internet
                if (isRunning) InitNotifications(10 * 1000);
                else StopService();
            }
        } catch (Exception e) { //Exception caused on android 8.1 and up when notification fail to
            Tools.recordException(TAG, "onStartCommand e ", e);
        }

        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        PauseService();
    }

    @Override
    public void onCreate() {
        super.onCreate();
        startNotification();
    }

    private void PauseService() {
        StopRunningNotifications();
        isRunning = false;
        mUnRegisterReceiver();
    }

    private void StopRunningNotifications() {
        if (NotificationHandler != null) NotificationHandler.removeCallbacksAndMessages(null);
        if (ToastHandler != null) ToastHandler.removeCallbacksAndMessages(null);
        if (appPreferences != null) appPreferences.put(Constants.PREF_NOTIFICATION_WILL_END, 0);
    }

    private void StopService() {
        PauseService();
        stopForeground(true);
        stopSelf();
    }

    private void startNotification() {
        context = getApplicationContext();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationCompat.Builder builder = NotificationUtils.NotificationBuilder(
                getString(R.string.notification_service),
                getString(R.string.notification_text),
                TAG,
                context
            );

            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
                startForeground(100, builder.build());
            } else {
                startForeground(100, builder.build(), FOREGROUND_SERVICE_TYPE_SHORT_SERVICE);
            }
        }
    }

    private void startService() {
        super.onCreate();

        appPreferences = new AppPreferences(context);

        String tempUserId = Tools.getString(Constants.PREF_USER_ID, null, appPreferences);

        if (tempUserId == null || !Tools.getBoolean(Constants.PREF_NOTIFICATION_BACKGROUND, false, appPreferences)) {
            StopService();
            return;
        } else if (isRunning) {
            InitNotifications(0);
            return;
        }

        if (NotificationThread == null || NotificationHandler == null || ToastHandler == null) {
            NotificationThread = new HandlerThread("NotificationThread");
            NotificationThread.start();
            Looper NotificationLooper = NotificationThread.getLooper();
            NotificationHandler = new Handler(NotificationLooper);
            ToastHandler = new Handler(NotificationLooper);
        }

        UserId = tempUserId;
        mRegisterReceiver();

        InitNotifications(0);
        isRunning = true;
    }

    private void InitNotifications(int timeout) {
        try {
            if (NotificationHandler != null) {
                NotificationHandler.removeCallbacksAndMessages(null);

                long delay = Tools.getLong(Constants.PREF_NOTIFICATION_WILL_END, 0, appPreferences);
                if (delay > 0) delay = delay - System.currentTimeMillis();

                NotificationHandler.postDelayed(
                    () -> {
                        if (screenOn && isRunning) {
                            RunNotifications();
                            InitNotifications(Constants.NOTIFICATION_CHECK_INTERVAL); //it 3 min refresh
                        }
                    },
                    timeout + (delay > 0 ? delay : 0)
                );
            }
        } catch (Exception e) {
            Tools.recordException(TAG, "InitHandler e ", e);
        }
    }

    private void RunNotifications() {
        if (CheckCanRun() || !Tools.isConnected(context)) return;

        NotificationUtils.CheckNotifications(UserId, appPreferences, ToastHandler, context);
    }

    private boolean CheckCanRun() {
        //If user changed don't Notify
        String tempUserId = Tools.getString(Constants.PREF_USER_ID, null, appPreferences);

        if (tempUserId == null || !Tools.getBoolean(Constants.PREF_NOTIFICATION_BACKGROUND, false, appPreferences)) {
            StopService();
            return true;
        } else if (!Objects.equals(tempUserId, UserId)) {
            //Stop all toast as user has changed
            //Technical can't happen after the service has started but just in case one is so fast that can change user during a off and on of the service
            if (ToastHandler != null) ToastHandler.removeCallbacksAndMessages(null);
            NotificationUtils.ResetNotificationList(appPreferences, tempUserId);
        }

        UserId = tempUserId;
        return false;
    }

    private void mRegisterReceiver() {
        try {
            mUnRegisterReceiver();
            IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_ON);
            filter.addAction(Intent.ACTION_SCREEN_OFF);
            mReceiver = new ScreenReceiver();
            registerReceiver(mReceiver, filter);
        } catch (Exception ignored) {}
    }

    private void mUnRegisterReceiver() {
        try {
            if (mReceiver != null) unregisterReceiver(mReceiver);
            mReceiver = null;
        } catch (Exception ignored) {}
    }
}
