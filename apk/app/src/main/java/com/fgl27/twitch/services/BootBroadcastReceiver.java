package com.fgl27.twitch.services;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import androidx.core.content.ContextCompat;

import com.fgl27.twitch.Tools;

import net.grandcentrix.tray.AppPreferences;

public class BootBroadcastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if (!Tools.deviceIsTV(context)) return;

        String action = intent.getAction();
        boolean run_boot = Tools.getBoolean("notification_background", false, new AppPreferences(context));

        if (Intent.ACTION_BOOT_COMPLETED.equals(action) && run_boot) {
            Intent mintent = new Intent(context, NotificationService.class);
            mintent.setAction("StartService");
            ContextCompat.startForegroundService(context, mintent);
        }
    }

}
