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

    public Context context;

    public Handler MainJobHandler;
    public Handler UpdateHandler;
    public HandlerThread UpdateThread;

    @Override
    public boolean onStartJob(final JobParameters jobParameters) {
        context = getApplicationContext();

        MainJobHandler = new Handler(Looper.getMainLooper());
        UpdateThread = new HandlerThread("UpdateThread");
        UpdateThread.start();
        UpdateHandler = new Handler(UpdateThread.getLooper());

        AppPreferences appPreferences = new AppPreferences(context);

        UpdateHandler.post(() -> {

            try {

                ChannelsUtils.StartLive(context);
                ChannelsUtils.StartFeatured(context);
                ChannelsUtils.StartGames(context);
                ChannelsUtils.UpdateUserChannels(context, appPreferences);

            } catch (Exception e) {
                Log.w(TAG, "updateChannels e " + e.getMessage());
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
