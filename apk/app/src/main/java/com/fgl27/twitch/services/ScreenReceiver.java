package com.fgl27.twitch.services;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import androidx.core.content.ContextCompat;

import com.fgl27.twitch.Constants;
import com.fgl27.twitch.Tools;

import net.grandcentrix.tray.AppPreferences;

public class ScreenReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if (!Tools.deviceIsTV(context)) return;

        String action = intent.getAction();
        boolean runNotifications = Tools.getBoolean(Constants.PREF_NOTIFICATION_BACKGROUND, false, new AppPreferences(context));

        boolean screenOff = Intent.ACTION_SCREEN_OFF.equals(action);
        boolean screenOn = Intent.ACTION_SCREEN_ON.equals(action);

        if ((screenOff || screenOn) && runNotifications) {
            Intent mIntent = new Intent(context, NotificationService.class);
            mIntent.setAction(screenOff ? Constants.ACTION_SCREEN_OFF : Constants.ACTION_SCREEN_ON);
            ContextCompat.startForegroundService(context, mIntent);
        }

    }

}
