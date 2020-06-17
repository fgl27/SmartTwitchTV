package com.fgl27.twitch.services;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.fgl27.twitch.Constants;
import com.fgl27.twitch.Tools;

import net.grandcentrix.tray.AppPreferences;

public class ScreenReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {

        String action = intent.getAction();
        boolean screenOff = Intent.ACTION_SCREEN_OFF.equals(action);
        boolean screenOn = Intent.ACTION_SCREEN_ON.equals(action);

        if ((screenOff || screenOn)) {
            Tools.SendNotificationIntent(screenOff ? Constants.ACTION_SCREEN_OFF : Constants.ACTION_SCREEN_ON, context);
        }

    }

}
