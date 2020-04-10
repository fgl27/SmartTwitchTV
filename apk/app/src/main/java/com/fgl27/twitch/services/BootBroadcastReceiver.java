package com.fgl27.twitch.services;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.fgl27.twitch.Constants;
import com.fgl27.twitch.Tools;

import net.grandcentrix.tray.AppPreferences;

public class BootBroadcastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if (!Tools.deviceIsTV(context)) return;

        String action = intent.getAction();
        boolean runNotifications = Tools.getBoolean(Constants.PREF_NOTIFICATION_BACKGROUND, false, new AppPreferences(context));

        if (Intent.ACTION_BOOT_COMPLETED.equals(action) && runNotifications) {
            Tools.SendNotificationIntent(Constants.ACTION_NOTIFY_START, context);
        }
    }

}
