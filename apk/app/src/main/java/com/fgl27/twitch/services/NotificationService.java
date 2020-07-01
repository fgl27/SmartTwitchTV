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

package com.fgl27.twitch.services;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Point;
import android.os.Build;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.IBinder;
import android.util.Log;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.core.app.NotificationCompat;

import com.fgl27.twitch.Constants;
import com.fgl27.twitch.R;
import com.fgl27.twitch.Tools;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import net.grandcentrix.tray.AppPreferences;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

import static com.google.gson.JsonParser.parseString;

public class NotificationService extends Service {

    private final String TAG = "STTV_Notification";

    private final int[] ToastPositions = {
            Gravity.RIGHT | Gravity.TOP,//0
            Gravity.CENTER | Gravity.TOP,//1
            Gravity.LEFT | Gravity.TOP,//2
            Gravity.LEFT | Gravity.BOTTOM,//3
            Gravity.CENTER | Gravity.BOTTOM,//4
            Gravity.RIGHT | Gravity.BOTTOM//5
    };

    private int ToastPosition = 1;

    private HandlerThread NotificationThread;
    private Handler NotificationHandler;
    private HandlerThread ToastThread;
    private Handler ToastHandler;

    private ArrayList<String> oldLive = new ArrayList<>();

    private BroadcastReceiver mReceiver = null;
    private AppPreferences appPreferences;

    private boolean isRunning;
    private boolean Notify;
    private boolean screenOn = true;

    private Context context;

    private String UserId;
    private String Channels;

    private int ChannelsOffset;
    private int LayoutWidth;
    private int ImageSize;

    private float textSizeSmall;
    private float textSizeBig;

    private String[][] DEFAULT_HEADERS = {
            {"Client-ID", "5seja5ptej058mxqy7gh5tcudjqtm9"},
            {"Accept", "application/vnd.twitchtv.v5+json"}
    };

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        startNotification();
        String action = intent.getAction();

        if (Objects.equals(action, Constants.ACTION_NOTIFY_STOP)) {//Fully stop the service as is not enable or is not TV
            StopService();
        } else if (Objects.equals(action, Constants.ACTION_NOTIFY_PAUSE)) {//Just pause it
            isRunning = false;
            if (NotificationHandler != null) NotificationHandler.removeCallbacksAndMessages(null);
        } else if (Objects.equals(action, Constants.ACTION_NOTIFY_START)) {//Start or restart the service
            startService();
        } else if (Objects.equals(action, Constants.ACTION_SCREEN_OFF)) {
            screenOn = false;
            if (NotificationHandler != null) NotificationHandler.removeCallbacksAndMessages(null);
        } else if (Objects.equals(action, Constants.ACTION_SCREEN_ON)) {
            screenOn = true;
            if (isRunning) InitHandler(10 * 1000);
        }

        return START_NOT_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (NotificationHandler != null) NotificationHandler.removeCallbacksAndMessages(null);
        isRunning = false;
        mUnRegisterReceiver();
    }

    @Override
    public void onCreate() {
        super.onCreate();
        startNotification();
    }

    private void StopService() {
        if (NotificationHandler != null) NotificationHandler.removeCallbacksAndMessages(null);
        isRunning = false;
        mUnRegisterReceiver();
        stopForeground(true);
        stopSelf();
    }

    private void startNotification() {
        context = getApplicationContext();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationCompat.Builder builder = NotificationBuilder(getString(R.string.notification), context);

            startForeground(100, builder.build());
        }
    }

    private void startService() {
        super.onCreate();
        appPreferences = new AppPreferences(context);

        String tempUserId = Tools.getString(Constants.PREF_USER_ID, null, appPreferences);

        //tempUserId == null user not set
        // !isRunning resume/stop scenario change the value
        // During !isRunning user may change
        if (isRunning || tempUserId == null) {
            //After a refresh of user live feed js will call the service to refresh notifications
            if (tempUserId != null) InitHandler(0);
            else StopService();

            return;
        }

        if (NotificationThread == null || NotificationHandler == null) {
            NotificationThread = new HandlerThread("NotificationThread");
            NotificationThread.start();
            NotificationHandler = new Handler(NotificationThread.getLooper());
        }

        if (ToastThread == null || ToastHandler == null) {
            ToastThread = new HandlerThread("ToastThread");
            ToastThread.start();
            ToastHandler = new Handler(ToastThread.getLooper());
        }

        isRunning = true;
        UserId = tempUserId;
        oldLive = new ArrayList<>();
        String tempOldLive = Tools.getString(UserId + Constants.PREF_NOTIFY_OLD_LIST, null, appPreferences);

        if (tempOldLive != null) {
            oldLive = new Gson().fromJson(tempOldLive, new TypeToken<List<String>>() {}.getType());
        }

        Notify = oldLive.size() > 0;

        mRegisterReceiver();

        InitHandler(5 * 1000);
    }

    private void InitHandler(int timeout) {
        if (NotificationHandler != null) {
            NotificationHandler.removeCallbacksAndMessages(null);

            long delay = Tools.getLong(Constants.PREF_NOTIFICATION_WILL_END, 0, appPreferences);
            if (delay > 0) delay = delay - System.currentTimeMillis();

            NotificationHandler.postDelayed(() -> {
                if (screenOn && isRunning) DoNotifications();

                InitHandler(1000 * 60 * 3);//it 3 min refresh
            }, timeout + (delay > 0 ? delay : 0));
        }
    }

    private boolean CheckUserChanged() {
        //If user changed don't Notify this run only next
        String tempUserId = Tools.getString(Constants.PREF_USER_ID, null, appPreferences);
        if (tempUserId == null) {
            StopService();
            return true;
        } else if (!Objects.equals(tempUserId, UserId)) {
            Notify = false;
        }
        UserId = tempUserId;
        return false;
    }

    private void DoNotifications() {
        if (CheckUserChanged() || !Tools.isConnected(context)) return;

        ToastPosition = Tools.getInt(Constants.PREF_NOTIFICATION_POSITION, 0, appPreferences);
        Channels = "";
        ChannelsOffset = 0;
        String url;
        boolean hasChannels = true;

        while (hasChannels) {//Get all user fallowed channels
            url = String.format(
                    Locale.US,
                    "https://api.twitch.tv/kraken/users/%s/follows/channels?limit=100&offset=%d&sortby=created_at&api_version=5",
                    UserId,
                    ChannelsOffset
            );

            hasChannels = GetChannels(url);
        }
        if (Channels.equals("")) return;

        Channels = Channels.substring(0, Channels.length() - 1);

        Tools.ResponseObj response = null;
        JsonObject obj;
        JsonArray streams;
        int StreamsSize;
        int Repeat = Tools.getInt(Constants.PREF_NOTIFICATION_REPEAT, 1, appPreferences);
        NotifyList tempNotifyList;
        String id;
        String game;
        boolean isLive;
        ArrayList<NotifyList> result = new ArrayList<>();
        ArrayList<String> currentLive = new ArrayList<>();

        boolean hasLiveChannels = true;
        ChannelsOffset = 0;
        while (hasLiveChannels) {

            url = String.format(
                    Locale.US,
                    "https://api.twitch.tv/kraken/streams/?channel=%s&limit=100&offset=%d&stream_type=all&api_version=5",
                    Channels,
                    ChannelsOffset
            );

            StreamsSize = 0;
            for (int i = 0; i < 3; i++) {

                response = Tools.Internal_MethodUrl(url, 25000 + (2500 * i), null, null, 0, DEFAULT_HEADERS);

                if (response != null) {

                    if (response.getStatus() == 200) {
                        obj = parseString(response.getResponseText()).getAsJsonObject();

                        if (obj.isJsonObject() && !obj.get("streams").isJsonNull()) {

                            streams = obj.get("streams").getAsJsonArray();//Get the follows array
                            StreamsSize = streams.size();

                            if (StreamsSize > 0) {

                                ChannelsOffset += StreamsSize;

                            } else {

                                hasLiveChannels = false;
                                break;

                            }

                            for (int j = 0; j < StreamsSize; j++) {

                                obj = streams.get(j).getAsJsonObject();//Get the position in the follows array

                                if (obj.isJsonObject() && !obj.get("channel").isJsonNull()) {

                                    game = !obj.get("game").isJsonNull() ? obj.get("game").getAsString() : "";
                                    isLive = !obj.get("broadcast_platform").isJsonNull() && (obj.get("broadcast_platform").getAsString()).contains("live");
                                    id = obj.get("_id").getAsString();//Broadcast id
                                    obj = obj.get("channel").getAsJsonObject(); //Get the channel obj in position

                                    if (obj.isJsonObject()) {

                                        currentLive.add(id);

                                        if (Notify && !oldLive.contains(id)) {

                                            Bitmap bmp = null;
                                            if (!obj.get("logo").isJsonNull())
                                                bmp = GetBitmap(obj.get("logo").getAsString());

                                            tempNotifyList = new NotifyList(
                                                    game,
                                                    !obj.get("display_name").isJsonNull() ? obj.get("display_name").getAsString() : "",
                                                    bmp,
                                                    !obj.get("status").isJsonNull() ? obj.get("status").getAsString() : "",
                                                    isLive
                                            );
                                            //Toast can only run for about 3s allow the user to repeat same notification
                                            for (int x = 0; x < Repeat; x++) {
                                                result.add(tempNotifyList);
                                            }
                                        }
                                    }
                                }
                            }

                        }
                        break;
                    }

                }
            }

            if (StreamsSize == 0) break;//break out of the while
        }

        //Prevent run service if last response is not successful or user has changed durring check
        if (CheckUserChanged() || response == null || response.getStatus() != 200) return;

        if (Notify && result.size() > 0) {

            for (int i = 0; i < result.size(); i++) {
                DoNotification(result.get(i), i);
            }

            appPreferences.put(Constants.PREF_NOTIFICATION_WILL_END, (System.currentTimeMillis() + (result.size() * 5000)));
        } else {
            Notify = true;
            appPreferences.put(Constants.PREF_NOTIFICATION_WILL_END, 0);
        }

        oldLive = new ArrayList<>();
        oldLive.addAll(currentLive);

        appPreferences.put(UserId + Constants.PREF_NOTIFY_OLD_LIST, new Gson().toJson(oldLive));
    }

    private void DoNotification(NotifyList result, int delay) {
        ToastHandler.postDelayed(() -> DoToast(result), 5000 * delay);
    }

    @SuppressLint("InflateParams")
    private void DoToast(NotifyList result) {
        setWidth();
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        View layout;
        if (inflater != null) {
            layout = inflater.inflate(R.layout.custom_toast, null);
        } else return;

        LinearLayout layout_text = layout.findViewById(R.id.text_holder);
        if (LayoutWidth > 0) layout_text.getLayoutParams().width = LayoutWidth;
        layout_text.requestLayout();

        TextView name = layout.findViewById(R.id.name);
        name.setCompoundDrawablesWithIntrinsicBounds(
                result.isLive() ? R.drawable.circle : R.drawable.ic_refresh,
                0,
                0,
                0
        );
        name.setText(result.getName());

        TextView title = layout.findViewById(R.id.title);
        title.setText(result.getTitle().trim());

        TextView game = layout.findViewById(R.id.game);
        game.setText(result.getGame());

        ImageView image = layout.findViewById(R.id.image);
        Bitmap bmp = result.getLogo();
        if (bmp != null) {
            if (LayoutWidth > 0) bmp = Bitmap.createScaledBitmap(bmp, ImageSize, ImageSize, true);

            image.setImageBitmap(bmp);
        } else image.setImageResource(android.R.color.transparent);

        if (LayoutWidth > 0) {
            TextView now_live = layout.findViewById(R.id.now_live);

            now_live.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeBig);
            name.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeBig);

            title.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeSmall);
            game.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeSmall);
        }

        Toast toast = new Toast(getApplicationContext());
        toast.setGravity(ToastPositions[ToastPosition], 0, 0);
        toast.setDuration(Toast.LENGTH_LONG);
        toast.setView(layout);
        toast.show();
    }

    private boolean GetChannels(String url) {
        Tools.ResponseObj response;
        JsonObject obj;
        JsonArray follows;
        StringBuilder values = new StringBuilder();

        for (int i = 0; i < 3; i++) {

            response = Tools.Internal_MethodUrl(url, 25000  + (2500 * i), null, null, 0, DEFAULT_HEADERS);

            if (response != null) {

                if (response.getStatus() == 200) {
                    obj = parseString(response.getResponseText()).getAsJsonObject();

                    if (obj.isJsonObject() && !obj.get("follows").isJsonNull()) {

                        follows = obj.get("follows").getAsJsonArray();//Get the follows array

                        if (follows.size() > 0)
                            ChannelsOffset += follows.size();
                        else return false;

                        for (int j = 0; j < follows.size(); j++) {

                            obj = follows.get(j).getAsJsonObject();//Get the position in the follows array

                            if (obj.isJsonObject() && !obj.get("channel").isJsonNull()) {

                                obj = obj.get("channel").getAsJsonObject(); //Get the channel obj in position

                                if (obj.isJsonObject() && !obj.get("_id").isJsonNull()) {
                                    values.append(obj.get("_id").getAsString()).append(","); //Get the channel id
                                }
                            }
                        }

                    }
                    break;
                }

            }
        }

        if (values.length() > 0) {
            Channels += values.toString();
            return true;
        }

        return false;
    }

    private static class NotifyList {
        private final String game;
        private final String name;
        private final Bitmap logo;
        private final String title;
        private final boolean live;

        public NotifyList(String game, String name, Bitmap logo, String title, boolean live) {
            this.game = game;
            this.name = name;
            this.logo = logo;
            this.title = title;
            this.live = live;
        }

        public String getGame() {
            return game;
        }

        public String getName() {
            return name;
        }

        public Bitmap getLogo() {
            return logo;
        }

        public String getTitle() {
            return title;
        }

        public boolean isLive() {
            return live;
        }
    }

    private Bitmap GetBitmap(String url) {

        URL newUrl = null;
        Bitmap bmp = null;

        try {
            newUrl = new URL(url);
        } catch (MalformedURLException ignored) {
        }

        if (newUrl != null) {
            try {
                bmp = BitmapFactory.decodeStream(newUrl.openConnection().getInputStream());
            } catch (IOException ignored) {
            }
        }

        return bmp;
    }

    private void mRegisterReceiver() {
        try {
            mUnRegisterReceiver();
            IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_ON);
            filter.addAction(Intent.ACTION_SCREEN_OFF);
            mReceiver = new ScreenReceiver();
            registerReceiver(mReceiver, filter);
        } catch (Exception e) {
            Log.w(TAG, "mregisterReceiver Exception ", e);
        }
    }

    private void mUnRegisterReceiver() {
        try {
            if (mReceiver != null) unregisterReceiver(mReceiver);
            mReceiver = null;
        } catch (Exception e) {
            Log.w(TAG, "munregisterReceiver Exception ", e);
        }
    }

    @TargetApi(26)
    private NotificationCompat.Builder NotificationBuilder(String title, Context context) {
        NotificationManager mNotifyManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        if (mNotifyManager != null) {
            mNotifyManager.createNotificationChannel(new NotificationChannel(TAG, title, NotificationManager.IMPORTANCE_NONE));
        }

        return new NotificationCompat.Builder(context, TAG)
                .setContentTitle(title)
                .setOngoing(true)
                .setSmallIcon(R.drawable.ic_refresh)
                .setChannelId(TAG);
    }

    private void setWidth() {
        WindowManager window = (WindowManager) getSystemService(Context.WINDOW_SERVICE);

        if (window != null) {

            Point ScreenSize = Tools.ScreenSize(window.getDefaultDisplay());

            //The device may be a phone that changes from landscape to portrait
            //Get the bigger value at the time ou the notification
            int max = Math.max(ScreenSize.x, ScreenSize.y);
            int min = Math.min(ScreenSize.x, ScreenSize.y);

            float width = max / 100.0f;
            int NewLayoutWidth = (int) (width * 40.0f);

            //Prevent notification bigger then the screen
            NewLayoutWidth = Math.min(NewLayoutWidth, (min - (min / 100)));

            if (LayoutWidth != NewLayoutWidth) {//if changed change the other values

                LayoutWidth = NewLayoutWidth;
                ImageSize = (int) (NewLayoutWidth / 5.0f);

                //Scale the text to screen size and density
                float ScaleDensity = width / (context.getResources().getDisplayMetrics().density / 2.0f);
                textSizeSmall = 0.62f * ScaleDensity;
                textSizeBig = 0.68f * ScaleDensity;

            }

        }
    }

}
