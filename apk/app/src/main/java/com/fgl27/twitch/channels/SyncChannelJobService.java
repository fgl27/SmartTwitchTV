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
package com.fgl27.twitch.channels;

import android.app.job.JobParameters;
import android.app.job.JobService;
import android.content.Context;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Looper;
import com.fgl27.twitch.Constants;
import com.fgl27.twitch.Tools;
import net.grandcentrix.tray.AppPreferences;

public class SyncChannelJobService extends JobService {

    private static final String TAG = "STTV_ChannelJobService";

    @Override
    public boolean onStartJob(final JobParameters jobParameters) {
        try {
            UpdateChannels(getApplicationContext(), jobParameters);
        } catch (Exception e) {
            Tools.recordException(TAG, "onStartJob e ", e);
        }

        return true;
    }

    @Override
    public boolean onStopJob(JobParameters jobParameters) {
        return true;
    }

    private void UpdateChannels(Context context, JobParameters jobParameters) {
        HandlerThread updateThread = new HandlerThread("UpdateThread");
        updateThread.start();

        new Handler(updateThread.getLooper()).post(() -> {
            try {
                ChannelsUtils.UpdateAllChannels(context, new AppPreferences(context), Constants.CHANNELS_NAMES);
            } catch (Exception e) {
                Tools.recordException(TAG, "UpdateChannels e ", e);
            }

            new Handler(Looper.getMainLooper()).post(() -> jobFinished(jobParameters, false));
        });
    }
}
