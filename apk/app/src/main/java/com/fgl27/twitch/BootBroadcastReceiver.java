/*
 * Copyright (c) 2017–present Felipe de Leon <fglfgl27@gmail.com>
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

package com.fgl27.twitch;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import com.fgl27.twitch.channels.ChannelsUtils;
import com.fgl27.twitch.notification.NotificationUtils;
import net.grandcentrix.tray.AppPreferences;

public class BootBroadcastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();

        if (Intent.ACTION_BOOT_COMPLETED.equals(action)) {
            AppPreferences appPreferences = new AppPreferences(context);

            if (NotificationUtils.StartNotificationService(appPreferences)) {
                Tools.SendNotificationIntent(Constants.ACTION_NOTIFY_BACKGROUND_START, context);
            }

            if (Tools.deviceIsTV(context) && Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && ChannelsUtils.isJobServiceNotSchedule(context)) {
                ChannelsUtils.scheduleSyncingChannel(context);
            }
        }
    }
}
