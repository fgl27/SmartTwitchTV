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
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import net.grandcentrix.tray.AppPreferences;

import java.text.DecimalFormat;
import java.util.ArrayList;
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
                                null
                        )
                )
        );
    }

    public static void SetUserLive(Context context, String userId) {

        if (userId != null ) {

            String Channels = GetChannels(userId);

            if (Channels.equals("")) StartUserLive(context, null);
            else {

                String url = String.format(
                        Locale.US,
                        "https://api.twitch.tv/kraken/streams/?channel=%s&limit=100&offset=0&stream_type=all&api_version=5",
                        Channels
                );

                StartUserLive(context, GetLiveContent(url, "streams", null));
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
                                "stream"
                        )
                )
        );
    }

    public static void StartGames(Context context) {
        ChannelsUtils.StartChannel(
                context,
                new ChannelsUtils.ChannelObj(
                        R.mipmap.ic_launcher,
                        Constants.CHANNELS_NAMES[Constants.CHANNEL_TYPE_GAMES],
                        Constants.CHANNEL_TYPE_GAMES,
                        GetGamesContent(
                                "https://api.twitch.tv/kraken/games/top?limit=100&offset=0&api_version=5",
                                "top",
                                Tools.DEFAULT_HEADERS
                        )
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

    private static List<ChannelsUtils.ChannelContentObj> GetLiveContent(String url, String object, String object2)  {
        try {
            Tools.ResponseObj response;
            JsonObject obj;
            JsonObject objChannel;
            JsonObject objPreview;
            JsonArray Streams;
            String description;
            int objSize;
            List<ChannelsUtils.ChannelContentObj> content = new ArrayList<>();

            String channelId;
            ArrayList<String> TempArray = new ArrayList<>();

            DecimalFormat decimalFormat = ChannelsUtils.getDecimalFormat();

            for (int i = 0; i < 3; i++) {

                response = Tools.Internal_MethodUrl(url, 25000  + (2500 * i), null, null, 0, Tools.DEFAULT_HEADERS);

                if (response != null) {

                    if (response.getStatus() == 200) {
                        obj = parseString(response.getResponseText()).getAsJsonObject();

                        if (obj.isJsonObject() && !obj.get(object).isJsonNull()) {

                            Streams = obj.get(object).getAsJsonArray();//Get the follows array
                            objSize = Streams.size();

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

                                        content.add(
                                                new ChannelsUtils.ChannelContentObj(
                                                        objChannel.get("display_name").getAsString(),
                                                        description + decimalFormat.format(obj.get("viewers").getAsInt()) + " viewers\n" + objChannel.get("status").getAsString(),
                                                        objPreview.get("large").getAsString(),
                                                        TvContractCompat.PreviewPrograms.ASPECT_RATIO_16_9,
                                                        new Gson().toJson(new ChannelsUtils.PreviewObj(obj, "LIVE")),
                                                        !obj.get("broadcast_platform").isJsonNull() && (obj.get("broadcast_platform").getAsString()).contains("live")
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

    private static List<ChannelsUtils.ChannelContentObj> GetGamesContent(String url, String object, String[][] HEADERS)  {
        try {
            Tools.ResponseObj response;
            JsonObject obj;
            JsonObject objGame;
            JsonObject objPreview;
            JsonArray Games;
            String description;
            int objSize;
            ArrayList<String> TempArray = new ArrayList<>();
            String gameId;
            List<ChannelsUtils.ChannelContentObj> content = new ArrayList<>();

            DecimalFormat decimalFormat = ChannelsUtils.getDecimalFormat();

            for (int i = 0; i < 3; i++) {

                response = Tools.Internal_MethodUrl(url, 25000  + (2500 * i), null, null, 0, HEADERS);

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

                                        objPreview = objGame.get("box").getAsJsonObject();
                                        description = decimalFormat.format(obj.get("channels").getAsInt()) +
                                                " Channels\nFor " + decimalFormat.format(obj.get("viewers").getAsInt()) + " viewers";

                                        content.add(
                                                new ChannelsUtils.ChannelContentObj(
                                                        objGame.get("name").getAsString(),
                                                        description,
                                                        objPreview.get("large").getAsString(),
                                                        TvContractCompat.PreviewPrograms.ASPECT_RATIO_2_3,
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

    public static String GetChannels(String userId)  {
        StringBuilder values = new StringBuilder();

        try {
            String url;
            int ChannelsOffset = 0;

            int arraySize;
            int AddedToArray;
            String channelId;
            ArrayList<String> TempArray = new ArrayList<>();

            Tools.ResponseObj response;
            JsonObject obj;
            JsonArray follows;

            do {//Get all user fallowed channels

                url = String.format(
                        Locale.US,
                        "https://api.twitch.tv/kraken/users/%s/follows/channels?limit=100&offset=%d&sortby=created_at&api_version=5",
                        userId,
                        ChannelsOffset
                );

                arraySize = 0;
                AddedToArray = 0;

                for (int i = 0; i < 3; i++) {

                    response = Tools.Internal_MethodUrl(url, 25000 + (2500 * i), null, null, 0, Tools.DEFAULT_HEADERS);

                    if (response != null) {

                        if (response.getStatus() == 200) {
                            obj = parseString(response.getResponseText()).getAsJsonObject();

                            if (obj.isJsonObject() && !obj.get("follows").isJsonNull()) {

                                follows = obj.get("follows").getAsJsonArray();//Get the follows array
                                arraySize = follows.size();

                                if (arraySize > 0) {

                                    ChannelsOffset += arraySize;

                                } else {

                                    break;

                                }

                                for (int j = 0; j < arraySize; j++) {

                                    obj = follows.get(j).getAsJsonObject();//Get the position in the follows array

                                    if (obj.isJsonObject() && !obj.get("channel").isJsonNull()) {

                                        obj = obj.get("channel").getAsJsonObject(); //Get the channel obj in position

                                        if (obj.isJsonObject() && !obj.get("_id").isJsonNull()) {

                                            channelId = obj.get("_id").getAsString();//Get the channel id

                                            if (!TempArray.contains(channelId)) {//Prevent add duplicated

                                                AddedToArray++;
                                                TempArray.add(channelId);
                                                values.append(channelId).append(",");

                                            }

                                        }
                                    }
                                }

                            }
                            break;
                        }

                    }
                }

            } while (arraySize != 0 && AddedToArray != 0);//last array was empty or didn't had noting new

        } catch (Exception e) {
            Log.w(TAG, "updateChannels e " + e.getMessage());
        }

        String result = "";

        if (values.length() > 0) {

            result =  values.toString() ;
            result = result.substring(0, result.length() - 1);//-1 as is only a comma

        }

        return result;

    }
}
