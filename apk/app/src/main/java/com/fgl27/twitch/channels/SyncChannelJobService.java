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
package com.fgl27.twitch.channels;

import android.app.job.JobParameters;
import android.app.job.JobService;
import android.content.Context;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Looper;
import android.util.Log;

import net.grandcentrix.tray.AppPreferences;

public class SyncChannelJobService extends JobService {

    private static final String TAG = "STTV_ChannelJobService";
    private Handler UpdateHandler;

    @Override
    public boolean onStartJob(final JobParameters jobParameters) {
        Context context = getApplicationContext();

        Handler MainJobHandler = new Handler(Looper.getMainLooper());

        HandlerThread updateThread = new HandlerThread("UpdateThread");
        updateThread.start();
        UpdateHandler = new Handler(updateThread.getLooper());

        UpdateHandler.post(() -> {

            try {

                ChannelsUtils.UpdateAllChannels(
                        context,
                        new AppPreferences(context)
                );

            } catch (Exception e) {
                Log.w(TAG, "updateChannels e ", e);
            }

            MainJobHandler.post(() -> jobFinished(jobParameters, false));
        });

        return true;
    }

    @Override
    public boolean onStopJob(JobParameters jobParameters) {
        UpdateHandler.removeCallbacksAndMessages(null);
        return true;
    }

}
