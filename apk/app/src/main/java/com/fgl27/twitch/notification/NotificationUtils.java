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

package com.fgl27.twitch.notification;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Point;
import android.os.Handler;
import android.util.Log;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.core.app.NotificationCompat;

import com.fgl27.twitch.Constants;
import com.fgl27.twitch.R;
import com.fgl27.twitch.Tools;
import com.fgl27.twitch.channels.ChannelsUtils;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import net.grandcentrix.tray.AppPreferences;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.TimeZone;

import static com.fgl27.twitch.Tools.getBoolean;
import static com.google.gson.JsonParser.parseString;

public final class NotificationUtils {

    private static final String TAG = "STTV_NotificationUtils";

    private static final Type SetStringType = new TypeToken<Set<String>>() {}.getType();
    private static final Type MapStringType = new TypeToken<Map<String, StreamObj>>() {}.getType();

    private static final int[] ToastPositions = {
            Gravity.RIGHT | Gravity.TOP,//0
            Gravity.CENTER | Gravity.TOP,//1
            Gravity.LEFT | Gravity.TOP,//2
            Gravity.LEFT | Gravity.BOTTOM,//3
            Gravity.CENTER | Gravity.BOTTOM,//4
            Gravity.RIGHT | Gravity.BOTTOM//5
    };

    private static class StreamObj {
        private final String game;
        private final String title;

        private StreamObj(String game, String title) {
            this.game = game;
            this.title = title;
        }

    }

    private static class NotifyList {
        private final boolean isGame;
        private final String notificationTitle;
        private final String game;
        private final String name;
        private final Bitmap logo;
        private final String title;
        private final boolean live;

        public NotifyList(boolean isGame, String notificationTitle, String game, String name, Bitmap logo, String title, boolean live) {
            this.isGame = isGame;
            this.notificationTitle = notificationTitle;
            this.game = game;
            this.name = name;
            this.logo = logo;
            this.title = title;
            this.live = live;
        }

    }

    public static JsonArray GetLiveStreamsList(String UserId, AppPreferences appPreferences) {

        if (Tools.getString(UserId + Constants.PREF_USER_TOKEN, null, appPreferences) != null) {

            if (System.currentTimeMillis() < Tools.getLong(UserId + Constants.PREF_USER_TOKEN_EXPIRES_WHEN, 0, appPreferences) ||
                    Tools.refreshTokens(UserId, appPreferences)) {

                return GetLiveStreamsListToken(UserId, appPreferences);

            } else {

                return GetLiveStreamsListNoToken(UserId);

            }

        } else {

            return GetLiveStreamsListNoToken(UserId);

        }

    }

    public static JsonArray GetLiveStreamsListToken(String UserId, AppPreferences appPreferences) {
        JsonArray StreamsResult = new JsonArray();
        boolean HttpRequestSuccess = false;

        try {
            Set<String> TempArray = new HashSet<>();

            JsonArray TempStreams;

            Tools.ResponseObj response;

            JsonObject obj;

            int Offset = 0;
            int StreamsSize;
            int AddedToArray;
            int status;

            String id;
            String url;
            String[][] DEFAULT_HEADERS = {
                    {Tools.DEFAULT_HEADERS[0][0], Tools.DEFAULT_HEADERS[0][1]},
                    {Tools.DEFAULT_HEADERS[1][0], Tools.DEFAULT_HEADERS[1][1]},
                    {"Authorization", "OAuth " + Tools.getString(UserId + Constants.PREF_USER_TOKEN, null, appPreferences)}
            };

            do {//Get all user fallowed live channels

                url = String.format(
                        Locale.US,
                        "https://api.twitch.tv/kraken/streams/followed?limit=100&offset=%d&stream_type=all&api_version=5",
                        Offset
                );

                StreamsSize = 0;
                AddedToArray = 0;

                for (int i = 0; i < 3; i++) {

                    response = Tools.Internal_MethodUrl(
                            url,
                            Constants.DEFAULT_HTTP_TIMEOUT  + (Constants.DEFAULT_HTTP_EXTRA_TIMEOUT * i),
                            null,
                            null,
                            0,
                            DEFAULT_HEADERS
                    );

                    if (response != null) {
                        status = response.status;

                        if (status == 200) {
                            HttpRequestSuccess = true;

                            obj = parseString(response.responseText).getAsJsonObject();

                            if (obj.isJsonObject() && !obj.get("streams").isJsonNull()) {

                                TempStreams = obj.get("streams").getAsJsonArray();//Get the follows array
                                StreamsSize = TempStreams.size();

                                if (StreamsSize > 0) {

                                    Offset += StreamsSize;

                                } else {

                                    break;

                                }

                                for (int j = 0; j < StreamsSize; j++) {

                                    obj = TempStreams.get(j).getAsJsonObject();//Get the position in the follows

                                    if (obj.isJsonObject() && !obj.get("_id").isJsonNull() && !obj.get("channel").isJsonNull()) {//Prevent null channelObj or Broadcast id

                                        id = obj.get("_id").getAsString();//Broadcast id

                                        if (!TempArray.contains(id)) {//Prevent add duplicated or empty obj and infinity loop
                                            TempArray.add(id);
                                            AddedToArray++;
                                            StreamsResult.add(obj);
                                        }

                                    }

                                }

                            }
                            break;
                        } else if (status == 401 || status == 403) {

                            if (Tools.refreshTokens(UserId, appPreferences)) {

                                return GetLiveStreamsListToken(UserId, appPreferences);

                            } else {

                                return GetLiveStreamsListNoToken(UserId);

                            }

                        }

                    }
                }

            } while (StreamsSize > 0 && AddedToArray > 0);//last array was empty or didn't had noting new

        } catch (Exception e) {
            Log.w(TAG, "GetLiveStreamsListToken e ", e);
        }

        return HttpRequestSuccess ? StreamsResult : null;
    }

    //There is a faster way to do this??? yes but that is needed the user authorization key
    //So this function runs without it is slower even more as the user follows more channels but works
    //The service that run this functions aren't time dependent so no problem
    public static JsonArray GetLiveStreamsListNoToken(String UserId) {

        JsonArray StreamsResult = new JsonArray();
        boolean HttpRequestSuccess = false;

        try {
            Set<String> ChannelsList = GetChannels(UserId);
            if (ChannelsList == null) return null;

            Set<String> TempArray = new HashSet<>();

            Tools.ResponseObj response;
            JsonObject obj;
            JsonArray TempStreams;

            String url;
            String id;

            int StreamsSize;
            int ChannelsSize = ChannelsList.size();
            int LoopSize = (ChannelsSize / 100) + 1;

            StringBuilder Channels;
            Iterator<String> iterator = ChannelsList.iterator();
            int len;

            for (int x = 0; x < LoopSize; x++) {

                //The list may contains 1000+ channels run 100 at a time
                Channels = new StringBuilder();
                len = 100;

                while(iterator.hasNext() && len > 0){
                    Channels.append(iterator.next()).append(",");
                    len--;
                }

                Channels = new StringBuilder(Channels.substring(0, Channels.length() - 1));

                url = String.format(
                        Locale.US,
                        "https://api.twitch.tv/kraken/streams/?channel=%s&limit=100&offset=0&stream_type=all&api_version=5",
                        Channels.toString()
                );

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

                        if (response.status == 200) {
                            HttpRequestSuccess = true;

                            obj = parseString(response.responseText).getAsJsonObject();

                            if (obj.isJsonObject() && !obj.get("streams").isJsonNull()) {

                                TempStreams = obj.get("streams").getAsJsonArray();//Get the follows array
                                StreamsSize = TempStreams.size();

                                if (StreamsSize < 1) {
                                    break;
                                }

                                for (int j = 0; j < StreamsSize; j++) {

                                    obj = TempStreams.get(j).getAsJsonObject();//Get the position in the follows

                                    if (obj.isJsonObject() && !obj.get("_id").isJsonNull() && !obj.get("channel").isJsonNull()) {//Prevent null channelObj or Broadcast id

                                        id = obj.get("_id").getAsString();//Broadcast id

                                        if (!TempArray.contains(id)) {//Prevent add duplicated or empty obj and infinity loop
                                            TempArray.add(id);
                                            StreamsResult.add(obj);
                                        }

                                    }

                                }

                            }
                            break;
                        }

                    }

                }
            }

        } catch(Exception e){
            Log.w(TAG, "GetLiveStreamsListNoToken e ", e);
        }

//        if (BuildConfig.DEBUG) {
//            Log.i(TAG, "GetLiveStreamsListNoToken size " + StreamsResult.size());
//        }

        return HttpRequestSuccess ? StreamsResult : null;
    }

    public static Set<String> GetChannels(String userId)  {
        Set<String> Result = new HashSet<>();
        boolean HttpRequestSuccess = false;

        try {
            int ChannelsOffset = 0;
            int arraySize;
            int AddedToArray;

            String url;
            String channelId;

            Tools.ResponseObj response;
            JsonObject obj;
            JsonArray follows;

            do {//Get all user fallowed channels

                url = String.format(
                        Locale.US,
                        "https://api.twitch.tv/kraken/users/%s/follows/channels?limit=100&offset=%d&sortby=last_broadcast&api_version=5",
                        userId,
                        ChannelsOffset
                );

                arraySize = 0;
                AddedToArray = 0;

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

                        if (response.status == 200) {
                            HttpRequestSuccess = true;

                            obj = parseString(response.responseText).getAsJsonObject();

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

                                            if (!Result.contains(channelId)) {//Prevent add duplicated

                                                AddedToArray++;
                                                Result.add(channelId);

                                            }

                                        }
                                    }
                                }

                            }
                            break;
                        }

                    }
                }

            } while (arraySize > 0 && AddedToArray > 0);//last array was empty or didn't had noting new

        } catch (Exception e) {
            Log.w(TAG, "GetChannels e ", e);
        }

        return HttpRequestSuccess ? Result : null;

    }

    private static void GetStreamNotifications(Map<String, StreamObj> oldLive, JsonArray streams, String UserId,
                                               AppPreferences appPreferences, int Repeat, long NotifySinceTimeMs,
                                               Context context, boolean DoStreamLive, boolean DoStreamTitle, boolean DoStreamGame,
                                               ArrayList<NotifyList> result) {

        Map<String, StreamObj> currentLive = new HashMap<>();

        int StreamsSize = streams.size();

        String id;
        String game;
        String display_name;
        String title;

        boolean isLive;

        JsonObject obj;
        JsonObject ChannelObj;
        NotifyList tempNotifyList;

        SimpleDateFormat input = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US);
        input.setTimeZone(TimeZone.getTimeZone("UTC"));
        Date date;
        long timeMsNow = new Date().getTime();

        String StreamCreated_at;
        boolean NotifyTime;

        String live_title = context.getString(R.string.notification_live);
        String title_title = context.getString(R.string.notification_title);
        String game_title = context.getString(R.string.notification_game);
        String game_and_title = context.getString(R.string.notification_title_game);
        String ExtraTitle;

        boolean gameChange;
        boolean titleChange;
        StreamObj TempObj;

        try {
            //There is no need to check for obj.isJsonObject() && !obj.get("_id").isJsonNull() and etc here as was already checked before reaching here
            for (int i = 0; i < StreamsSize; i++) {

                obj = streams.get(i).getAsJsonObject();//Get the position in the follows array
                id = obj.get("_id").getAsString();//Broadcast id

                ChannelObj = obj.get("channel").getAsJsonObject(); //Get the channel obj in position
                display_name = !ChannelObj.get("display_name").isJsonNull() ? ChannelObj.get("display_name").getAsString() : null;

                if (display_name != null) {

                    game = !ChannelObj.get("game").isJsonNull() ? ChannelObj.get("game").getAsString() : "";
                    title = !ChannelObj.get("status").isJsonNull() ? ChannelObj.get("status").getAsString() : "";

                    currentLive.put(
                            id,
                            new StreamObj(
                                    game,
                                    title
                            )
                    );
                    isLive = !obj.get("broadcast_platform").isJsonNull() && (obj.get("broadcast_platform").getAsString()).contains("live");

                    if (!oldLive.containsKey(id)) {

                        if (DoStreamLive) {

                            NotifyTime = true;

                            if (NotifySinceTimeMs > 0) {//NotifySinceTimeMs == 0 check is disable
                                StreamCreated_at = !obj.get("created_at").isJsonNull() ? obj.get("created_at").getAsString() : null;

                                if (StreamCreated_at != null) {

                                    date = input.parse(StreamCreated_at);

                                    if (date != null) {

                                        NotifyTime = NotifySinceTimeMs > (timeMsNow - date.getTime());

                                    }
                                }

                            }

                            if (NotifyTime) {

                                tempNotifyList = new NotifyList(
                                        false,
                                        live_title,
                                        game,
                                        display_name,
                                        GetBitmap(
                                                !ChannelObj.get("logo").isJsonNull() ? ChannelObj.get("logo").getAsString() : ChannelsUtils.LOGO_404
                                        ),
                                        title,
                                        isLive
                                );

                                //Toast can only run for about 3s allow the user to repeat same notification
                                for (int x = 0; x < Repeat; x++) {
                                    result.add(tempNotifyList);
                                }

                            }

                        }

                    } else if (DoStreamTitle || DoStreamGame) {

                        TempObj = oldLive.get(id);
                        gameChange = TempObj != null && !Objects.equals(TempObj.game, game) && DoStreamGame;
                        titleChange = TempObj != null && !Objects.equals(TempObj.title, title) && DoStreamTitle;

                        if (gameChange || titleChange) {

                            if (gameChange && titleChange) ExtraTitle = game_and_title;
                            else if (gameChange) ExtraTitle = game_title;
                            else ExtraTitle = title_title;

                            tempNotifyList = new NotifyList(
                                    false,
                                    ExtraTitle,
                                    game,
                                    display_name,
                                    GetBitmap(
                                            !ChannelObj.get("logo").isJsonNull() ? ChannelObj.get("logo").getAsString() : ChannelsUtils.LOGO_404
                                    ),
                                    title,
                                    isLive
                            );

                            //Toast can only run for about 3s allow the user to repeat same notification
                            for (int x = 0; x < Repeat; x++) {
                                result.add(tempNotifyList);
                            }

                        }

                    }

                }
            }
        } catch (Exception e) {
            Log.w(TAG, "GetNotifications e ", e);
        }

        SaveOldStreamList(
                currentLive,
                appPreferences,
                UserId
        );

    }

    private static void GetGamesNotifications(Set<String> oldLive, JsonArray games, String UserId,
                                              AppPreferences appPreferences, int Repeat,
                                              Context context,
                                              ArrayList<NotifyList> result) {

        Set<String> currentLive = new HashSet<>();

        int GamesSize = games.size();
        int viewers;
        int channels;

        String id;
        String name;

        JsonObject obj;
        JsonObject objGame;
        JsonObject objPreview;

        NotifyList tempNotifyList;

        String game_notification_title = context.getString(R.string.notification_live_game);
        DecimalFormat decimalFormat = ChannelsUtils.getDecimalFormat();

        try {
            //There is no need to check for obj.isJsonObject() && !obj.get("_id").isJsonNull() and etc here as was already checked before reaching here
            for (int i = 0; i < GamesSize; i++) {

                obj = games.get(i).getAsJsonObject();//Get the position in the follows array
                objGame = obj.get("game").getAsJsonObject(); //Get the channel obj in position

                name = !objGame.get("name").isJsonNull() ? objGame.get("name").getAsString() : null;

                if (name != null) {

                    viewers = !obj.get("viewers").isJsonNull() ? obj.get("viewers").getAsInt() : 0;
                    channels = !obj.get("channels").isJsonNull() ? obj.get("channels").getAsInt() : 0;
                    objPreview = !objGame.get("box").isJsonNull() ? objGame.get("box").getAsJsonObject() : null;
                    id = !objGame.get("_id").isJsonNull() ? objGame.get("_id").getAsString() : null;

                    currentLive.add(id);

                    if (!oldLive.contains(id)) {

                        tempNotifyList = new NotifyList(
                                true,
                                game_notification_title,
                                decimalFormat.format(viewers) + " viewers",
                                name,
                                GetBitmap(
                                        objPreview != null && !objPreview.get("large").isJsonNull() ?
                                                objPreview.get("large").getAsString() :
                                                ChannelsUtils.GAME_404
                                ),
                                decimalFormat.format(channels) + " Channels",
                                false
                        );

                        //Toast can only run for about 3s allow the user to repeat same notification
                        for (int x = 0; x < Repeat; x++) {
                            result.add(tempNotifyList);
                        }

                    }

                }
            }
        } catch (Exception e) {
            Log.w(TAG, "GetGamesNotifications e ", e);
        }

        SaveOldGamesList(
                currentLive,
                appPreferences,
                UserId
        );

    }

    private static void SetOldLiveList(JsonArray streams, String UserId, AppPreferences appPreferences) {
        Map<String, StreamObj> currentLive = new HashMap<>();
        JsonObject obj;
        JsonObject ChannelObj;
        int StreamsSize = streams.size();

        try {
            for (int i = 0; i < StreamsSize; i++) {

                //There is no need to check for obj.isJsonObject() && !obj.get("_id").isJsonNull() here as was already checked before reaching here
                obj = streams.get(i).getAsJsonObject();//Get the position in the follows array
                ChannelObj = obj.get("channel").getAsJsonObject(); //Get the channel obj in position

                currentLive.put(
                        obj.get("_id").getAsString(),
                        new StreamObj(
                                !ChannelObj.get("game").isJsonNull() ? ChannelObj.get("game").getAsString() : "",
                                !ChannelObj.get("status").isJsonNull() ? ChannelObj.get("status").getAsString() : ""
                        )
                );

            }
        } catch (Exception e) {
            Log.w(TAG, "SetOldList e ", e);
        }

        SaveOldStreamList(
                currentLive,
                appPreferences,
                UserId
        );
    }

    private static void SetOldGamesList(JsonArray games, String UserId, AppPreferences appPreferences) {
        Set<String> currentLive = new HashSet<>();
        JsonObject obj;
        int GamesSize = games.size();

        try {
            for (int i = 0; i < GamesSize; i++) {

                //There is no need to check for obj.isJsonObject() && !obj.get("_id").isJsonNull() here as was already checked before reaching here
                obj = games.get(i).getAsJsonObject().get("game").getAsJsonObject();//Get the position in the game array
                currentLive.add(obj.get("_id").getAsString());//Broadcast id

            }
        } catch (Exception e) {
            Log.w(TAG, "SetOldList e ", e);
        }

        SaveOldGamesList(
                currentLive,
                appPreferences,
                UserId
        );
    }

    private static void SaveOldGamesList(Set<String> currentLive, AppPreferences appPreferences, String UserId) {

        appPreferences.put(
                UserId + Constants.PREF_NOTIFY_OLD_GAME_LIST,
                new Gson().toJson(currentLive)
        );

    }

    private static void SaveOldStreamList(Map<String, StreamObj> currentLive, AppPreferences appPreferences, String UserId) {

        appPreferences.put(
                UserId + Constants.PREF_NOTIFY_OLD_STREAM_LIST,
                new Gson().toJson(currentLive)
        );

    }

    private static Bitmap GetBitmap(String url) {

        URL newUrl = null;
        Bitmap bmp = null;

        try {
            newUrl = new URL(url);
        } catch (MalformedURLException ignored) { }

        if (newUrl != null) {
            try {
                bmp = BitmapFactory.decodeStream(newUrl.openConnection().getInputStream());
            } catch (IOException ignored) {}
        }

        return bmp;
    }

    public static void CheckNotifications(String UserId, AppPreferences appPreferences, Handler ToastHandler, Context context) {
        try {

            ArrayList<NotifyList> NotifyListResult = new ArrayList<>();

            boolean DoStreamLive = Tools.getBoolean(Constants.PREF_NOTIFICATION_STREAM_LIVE, false, appPreferences);
            boolean DoStreamTitle = Tools.getBoolean(Constants.PREF_NOTIFICATION_STREAM_TITLE, false, appPreferences);
            boolean DoStreamGame = Tools.getBoolean(Constants.PREF_NOTIFICATION_STREAM_GAME, false, appPreferences);
            boolean DoGameLive = Tools.getBoolean(Constants.PREF_NOTIFICATION_GAME, false, appPreferences);

            int Repeat = Tools.getInt(Constants.PREF_NOTIFICATION_REPEAT, 1, appPreferences);

            long NotifySinceTimeMs = Tools.getLong(Constants.PREF_NOTIFICATION_SINCE_TIME, 0, appPreferences);

            String tempOldLiveList;

            if (DoStreamLive || DoStreamTitle || DoStreamGame) {

                JsonArray streams = GetLiveStreamsList(UserId, appPreferences);

                //If stream result is null the http request fail else even streams.size() < 1 that is the result
                if (streams != null) {

                    tempOldLiveList = Tools.getString(UserId + Constants.PREF_NOTIFY_OLD_STREAM_LIST, null, appPreferences);

                    //Null list was never created or user changed
                    if (tempOldLiveList != null) {

                        GetStreamNotifications(
                                new Gson().fromJson(tempOldLiveList, MapStringType),
                                streams,
                                UserId,
                                appPreferences,
                                Repeat,
                                NotifySinceTimeMs,
                                context,
                                DoStreamLive,
                                DoStreamTitle,
                                DoStreamGame,
                                NotifyListResult
                        );

                    } else {

                        SetOldLiveList(streams, UserId, appPreferences);

                    }
                }

            }

            if (DoGameLive) {

                JsonArray Games = ChannelsUtils.GetLiveGames(
                        String.format(
                                Locale.US,
                                "https://api.twitch.tv/api/users/%s/follows/games/live?limit=250",
                                Tools.getString(Constants.PREF_USER_NAME, null, appPreferences)
                        ),
                        "follows",
                        new String[0][0]
                );

                //If Games result is null the http request fail else even if Games.size() < 1 that is the result
                if (Games != null) {

                    tempOldLiveList = Tools.getString(UserId + Constants.PREF_NOTIFY_OLD_GAME_LIST, null, appPreferences);

                    //Null list was never created or user changed
                    if (tempOldLiveList != null) {

                        GetGamesNotifications(
                                new Gson().fromJson(tempOldLiveList, SetStringType),
                                Games,
                                UserId,
                                appPreferences,
                                Repeat,
                                context,
                                NotifyListResult
                        );

                    } else {

                        SetOldGamesList(Games, UserId, appPreferences);

                    }
                }

            }

            int ResultSize = NotifyListResult.size();

            if (ResultSize > 0) {

                int ToastPosition = Tools.getInt(Constants.PREF_NOTIFICATION_POSITION, 0, appPreferences);

                //Get the width base on screen size and position
                WindowManager window = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
                int LayoutWidth = 0;
                int ImageSize = 0;
                int ImageSizeHeight = 0;
                float textSizeSmall = 0;
                float textSizeBig = 0;

                if (window != null) {

                    Point ScreenSize = Tools.ScreenSize(window.getDefaultDisplay());

                    //The device may be a phone that changes from landscape to portrait
                    //Get the bigger value at the time ou the notification
                    int max = Math.max(ScreenSize.x, ScreenSize.y);
                    int min = Math.min(ScreenSize.x, ScreenSize.y);

                    float width = max / 100.0f;
                    LayoutWidth = (int) (width * 40.0f);

                    //Prevent notification bigger then the screen
                    LayoutWidth = Math.min(LayoutWidth, (min - (min / 100)));

                    ImageSize = (int) (LayoutWidth / 5.0f);
                    ImageSizeHeight = (int) (ImageSize * 1.5f);

                    //Scale the text to screen size and density
                    float ScaleDensity = width / (context.getResources().getDisplayMetrics().density / 2.0f);
                    textSizeSmall = 0.62f * ScaleDensity;
                    textSizeBig = 0.68f * ScaleDensity;
                }

                for (int i = 0; i < ResultSize; i++) {
                    ShowNotification(
                            NotifyListResult.get(i),
                            i,
                            ToastHandler,
                            context,
                            ToastPosition,
                            LayoutWidth,
                            ImageSize,
                            ImageSizeHeight,
                            textSizeSmall,
                            textSizeBig
                    );
                }

                appPreferences.put(Constants.PREF_NOTIFICATION_WILL_END, (System.currentTimeMillis() + (ResultSize * 5000)));
            }

        } catch (Exception e) {
            Log.w(TAG, "CheckNotifications e ", e);
        }
    }

    private static void ShowNotification(NotifyList NotifyListResult, int delay,
                                         Handler ToastHandler, Context context, int ToastPosition,
                                         int LayoutWidth, int ImageSize, int ImageSizeHeight, float textSizeSmall, float textSizeBig) {

        ToastHandler.postDelayed(() -> {
            try {
                DoToast(
                        NotifyListResult,
                        context,
                        ToastPosition,
                        LayoutWidth,
                        ImageSize,
                        ImageSizeHeight,
                        textSizeSmall,
                        textSizeBig
                );
            } catch (Exception ignored) {}//silent Exception caused on android 8.1 and up when notification fail to show or user block it
        }, 5000 * delay);

    }

    @SuppressLint("InflateParams")
    private static void DoToast(NotifyList result, Context context, int ToastPosition, int LayoutWidth, int ImageSize, int ImageSizeHeight, float textSizeSmall, float textSizeBig) {

        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        View layout;

        if (inflater != null) {
            layout = inflater.inflate(R.layout.custom_toast, null);
        } else return;

        LinearLayout layout_text = layout.findViewById(R.id.text_holder);

        if (result.isGame) {
            LayoutWidth = (int) (LayoutWidth * 0.6f);
        }

        if (LayoutWidth > 0) layout_text.getLayoutParams().width = LayoutWidth;
        layout_text.requestLayout();

        TextView not_title = layout.findViewById(R.id.not_title);
        TextView name = layout.findViewById(R.id.name);
        TextView title = layout.findViewById(R.id.title);
        TextView game = layout.findViewById(R.id.game);

        if (!result.isGame) {

            name.setCompoundDrawablesWithIntrinsicBounds(
                    result.live ? R.drawable.circle : R.drawable.ic_refresh,
                    0,
                    0,
                    0
            );

        }

        not_title.setText(result.notificationTitle);
        name.setText(result.name);
        title.setText(result.title.trim());
        game.setText(result.game);

        if (LayoutWidth > 0) {

            not_title.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeBig);
            name.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeBig);
            title.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeSmall);
            game.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeSmall);
        }

        ImageView image = layout.findViewById(R.id.image);
        Bitmap bmp = result.logo;
        if (bmp != null) {
            if (LayoutWidth > 0) {

                bmp = Bitmap.createScaledBitmap(
                        bmp,
                        ImageSize,
                        result.isGame ? ImageSizeHeight : ImageSize,
                        true
                );

            }

            image.setImageBitmap(bmp);
        } else image.setImageResource(android.R.color.transparent);

        Toast toast = new Toast(context);
        toast.setGravity(ToastPositions[ToastPosition], 0, 0);
        toast.setDuration(Toast.LENGTH_LONG);
        toast.setView(layout);
        toast.show();
    }

    public static boolean StartNotificationService(AppPreferences appPreferences) {
        return getBoolean(Constants.PREF_NOTIFICATION_BACKGROUND, false, appPreferences) &&
                Tools.getString(Constants.PREF_USER_ID, null, appPreferences) != null;
    }

    @TargetApi(26)
    public static NotificationCompat.Builder NotificationBuilder(String title, String text, String id, Context context) {
        NotificationManager mNotifyManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        if (mNotifyManager != null) {
            mNotifyManager.createNotificationChannel(
                    new NotificationChannel(
                            id,
                            title,
                            NotificationManager.IMPORTANCE_NONE
                    )
            );
        }

        return new NotificationCompat.Builder(context, id)
                .setContentTitle(title)
                .setContentText(text)
                .setOngoing(true)
                .setSmallIcon(R.drawable.ic_refresh)
                .setChannelId(id);
    }

    public static void ResetNotificationList(AppPreferences appPreferences, String id) {
        appPreferences.put(Constants.PREF_NOTIFICATION_WILL_END, 0);
        appPreferences.put(id + Constants.PREF_NOTIFY_OLD_STREAM_LIST, null);
        appPreferences.put(id + Constants.PREF_NOTIFY_OLD_GAME_LIST, null);
    }
}
