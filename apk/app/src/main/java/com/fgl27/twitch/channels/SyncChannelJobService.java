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

import androidx.tvprovider.media.tv.TvContractCompat;

import com.fgl27.twitch.Constants;
import com.fgl27.twitch.R;
import com.fgl27.twitch.Tools;
import com.fgl27.twitch.notification.NotificationUtils;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import net.grandcentrix.tray.AppPreferences;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

import static com.google.gson.JsonParser.parseString;

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

                StartLive(context);
                StartFeatured(context);
                StartGames(context);
                SetUserLive(
                        context,
                        Tools.getString(Constants.PREF_USER_ID, null, appPreferences)
                );
                SyncChannelJobService.StartUserGames(
                        context,
                        Tools.getString(Constants.PREF_USER_NAME, null, appPreferences)
                );

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

    public static void StartLive(Context context) {
        AppPreferences appPreferences = new AppPreferences(context);
        String lang = Tools.getString(Constants.CHANNEL_LANGUAGE, null, appPreferences);

        ChannelsUtils.StartChannel(
                context,
                new ChannelsUtils.ChannelObj(
                        R.mipmap.ic_launcher,
                        Constants.CHANNELS_NAMES[Constants.CHANNEL_TYPE_LIVE],
                        Constants.CHANNEL_TYPE_LIVE,
                        GetLiveContent(
                                "https://api.twitch.tv/kraken/streams?limit=100&offset=0&api_version=5" + (lang != null ? "&language=" + lang : ""),
                                "streams",
                                null,
                                true
                        )
                )
        );
    }

    public static void SetUserLive(Context context, String userId) {

        if (userId != null ) {

            JsonArray Streams = NotificationUtils.GetLiveStreamsList(userId);

            if (Streams == null) StartUserLive(context, null);
            else {

                StartUserLive(
                        context,
                        ProcessLiveArray(
                                Streams,//Get the follows array
                                null,
                                true
                        )
                );

            }
        } else {
            List<ChannelsUtils.ChannelContentObj> content = new ArrayList<>();
            content.add(ChannelsUtils.NoUserContent);
            StartUserLive(context, content);
        }
    }

    public static void StartUserLive(Context context, List<ChannelsUtils.ChannelContentObj> contentObj) {
        ChannelsUtils.StartChannel(
                context,
                new ChannelsUtils.ChannelObj(
                        R.mipmap.ic_launcher,
                        Constants.CHANNELS_NAMES[Constants.CHANNEL_TYPE_USER_LIVE],
                        Constants.CHANNEL_TYPE_USER_LIVE,
                        contentObj
                )
        );
    }

    public static void StartFeatured(Context context) {
        ChannelsUtils.StartChannel(
                context,
                new ChannelsUtils.ChannelObj(
                        R.mipmap.ic_launcher,
                        Constants.CHANNELS_NAMES[Constants.CHANNEL_TYPE_FEATURED],
                        Constants.CHANNEL_TYPE_FEATURED,
                        GetLiveContent(
                                "https://api.twitch.tv/kraken/streams/featured?limit=100&offset=0&api_version=5",
                                "featured",
                                "stream",
                                false
                        )
                )
        );
    }

    public static void StartGames(Context context) {

        List<ChannelsUtils.ChannelContentObj> content = GetGamesContent(
                "https://api.twitch.tv/kraken/games/top?limit=100&offset=0&api_version=5",
                "top",
                Tools.DEFAULT_HEADERS
        );

        if (content != null) {
            int contentSize = content.size();
            if (contentSize > 1) {
                Collections.sort(content.subList(1, contentSize), new ChannelsUtils.SortLiveViews());
            }
        }

        ChannelsUtils.StartChannel(
                context,
                new ChannelsUtils.ChannelObj(
                        R.mipmap.ic_launcher,
                        Constants.CHANNELS_NAMES[Constants.CHANNEL_TYPE_GAMES],
                        Constants.CHANNEL_TYPE_GAMES,
                        content
                )
        );
    }

    public static void StartUserGames(Context context, String name) {
        List<ChannelsUtils.ChannelContentObj> content = new ArrayList<>();

        if (name != null) {

            String url = String.format(
                    Locale.US,
                    "https://api.twitch.tv/api/users/%s/follows/games/live?limit=250",
                    name
            );

            content = GetGamesContent(url, "follows", new String[0][2]);
        } else {
            content.add(ChannelsUtils.NoUserContent);
            StartUserLive(context, content);
        }

        ChannelsUtils.StartChannel(
                context,
                new ChannelsUtils.ChannelObj(
                        R.mipmap.ic_launcher,
                        Constants.CHANNELS_NAMES[Constants.CHANNEL_TYPE_USER_GAMES],
                        Constants.CHANNEL_TYPE_USER_GAMES,
                        content
                )
        );
    }

    private static List<ChannelsUtils.ChannelContentObj> GetLiveContent(String url, String object, String object2, boolean sort)  {

        try {
            Tools.ResponseObj response;

            for (int i = 0; i < 3; i++) {

                response = Tools.Internal_MethodUrl(
                        url,
                        Constants.DEFAULT_HTTP_TIMEOUT  + (Constants.DEFAULT_HTTP_EXTRA_TIMEOUT * i),
                        null,
                        null,
                        0,
                        Tools.DEFAULT_HEADERS
                );

                if (response != null) {

                    if (response.getStatus() == 200) {

                        JsonObject obj = parseString(response.getResponseText()).getAsJsonObject();

                        if (obj.isJsonObject() && !obj.get(object).isJsonNull()) {

                            return ProcessLiveArray(
                                    obj.get(object).getAsJsonArray(),//Get the follows array
                                    object2,
                                    sort
                            );
                        }

                        break;
                    }

                }
            }

        } catch (Exception e) {
            Log.w(TAG, "updateChannels e " + e.getMessage());
        }

        return null;

    }

    private static List<ChannelsUtils.ChannelContentObj> ProcessLiveArray(JsonArray Streams, String object2, boolean sort)  {
        List<ChannelsUtils.ChannelContentObj> content = new ArrayList<>();
        ArrayList<String> TempArray = new ArrayList<>();

        JsonObject obj;
        JsonObject objChannel;
        JsonObject objPreview;

        String channelId;
        String description;

        int viewers;
        int objSize = Streams.size();

        DecimalFormat decimalFormat = ChannelsUtils.getDecimalFormat();

        if (objSize < 1) return null;
        else content.add(ChannelsUtils.getRefreshContent());

        for (int j = 0; j < objSize; j++) {

            obj = Streams.get(j).getAsJsonObject();//Get the position in the follows array

            if (object2 != null) {
                obj = obj.get(object2).getAsJsonObject();//Featured holds the featured stream inside another level
            }

            if (obj.isJsonObject() && !obj.get("channel").isJsonNull()) {
                objChannel = obj.get("channel").getAsJsonObject(); //Get the channel obj in position

                channelId = objChannel.get("_id").getAsString();

                if (!TempArray.contains(channelId)) {//Prevent add duplicated
                    TempArray.add(channelId);

                    objPreview = obj.get("preview").getAsJsonObject();
                    description = obj.get("game").getAsString();
                    if (!Objects.equals(description, "")) description = "Playing " + description + ", for ";
                    viewers = obj.get("viewers").getAsInt();

                    content.add(
                            new ChannelsUtils.ChannelContentObj(
                                    objChannel.get("display_name").getAsString(),
                                    description + decimalFormat.format(viewers) + " viewers\n" + objChannel.get("status").getAsString(),
                                    objPreview.get("large").getAsString(),
                                    TvContractCompat.PreviewPrograms.ASPECT_RATIO_16_9,
                                    viewers,
                                    new Gson().toJson(new ChannelsUtils.PreviewObj(obj, "LIVE")),
                                    !obj.get("broadcast_platform").isJsonNull() && (obj.get("broadcast_platform").getAsString()).contains("live")
                            )
                    );
                }

            }
        }

        int contentSize = content.size();

        if (sort && contentSize > 1) {
            Collections.sort(content.subList(1, contentSize), new ChannelsUtils.SortLiveViews());
        }

        return contentSize > 0 ? content : null;
    }

    private static List<ChannelsUtils.ChannelContentObj> GetGamesContent(String url, String object, String[][] HEADERS)  {
        try {
            Tools.ResponseObj response;
            JsonObject obj;
            JsonObject objGame;
            JsonObject objPreview;
            JsonArray Games;
            String description;
            int objSize;
            int viewers;
            ArrayList<String> TempArray = new ArrayList<>();
            String gameId;
            List<ChannelsUtils.ChannelContentObj> content = new ArrayList<>();

            DecimalFormat decimalFormat = ChannelsUtils.getDecimalFormat();

            for (int i = 0; i < 3; i++) {

                response = Tools.Internal_MethodUrl(
                        url,
                        Constants.DEFAULT_HTTP_TIMEOUT  + (Constants.DEFAULT_HTTP_EXTRA_TIMEOUT * i),
                        null,
                        null,
                        0,
                        HEADERS
                );

                if (response != null) {

                    if (response.getStatus() == 200) {
                        obj = parseString(response.getResponseText()).getAsJsonObject();

                        if (obj.isJsonObject() && !obj.get(object).isJsonNull()) {

                            Games = obj.get(object).getAsJsonArray();//Get the follows array
                            objSize = Games.size();

                            if (objSize < 1) return null;
                            else content.add(ChannelsUtils.getRefreshContent());

                            for (int j = 0; j < objSize; j++) {

                                obj = Games.get(j).getAsJsonObject();

                                if (obj.isJsonObject() && !obj.get("game").isJsonNull()) {

                                    objGame = obj.get("game").getAsJsonObject(); //Get the channel obj in position
                                    gameId = objGame.get("_id").getAsString();

                                    if (!TempArray.contains(gameId)) {//Prevent add duplicated
                                        TempArray.add(gameId);

                                        viewers =obj.get("viewers").getAsInt();
                                        objPreview = objGame.get("box").getAsJsonObject();
                                        description = decimalFormat.format(obj.get("channels").getAsInt()) +
                                                " Channels\nFor " + decimalFormat.format(viewers) + " viewers";

                                        content.add(
                                                new ChannelsUtils.ChannelContentObj(
                                                        objGame.get("name").getAsString(),
                                                        description,
                                                        objPreview.get("large").getAsString(),
                                                        TvContractCompat.PreviewPrograms.ASPECT_RATIO_2_3,
                                                        viewers,
                                                        new Gson().toJson(new ChannelsUtils.PreviewObj(objGame, "GAME")),
                                                        false
                                                )
                                        );
                                    }

                                }
                            }

                        }
                        break;
                    }

                }
            }

            if (content.size() > 0) return content;

        } catch (Exception e) {
            Log.w(TAG, "updateChannels e " + e.getMessage());
        }

        return null;

    }

}
