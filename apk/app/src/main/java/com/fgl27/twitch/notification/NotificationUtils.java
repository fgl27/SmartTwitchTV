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

import static com.fgl27.twitch.Tools.getBoolean;
import static com.google.gson.JsonParser.parseString;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Point;
import android.os.Build;
import android.os.Handler;
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
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import net.grandcentrix.tray.AppPreferences;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.TimeZone;
import java.util.concurrent.ThreadLocalRandom;

public final class NotificationUtils {

    private static final String TAG = "STTV_NotificationUtils";

    private static final Type MapStringType = new TypeToken<Map<String, StreamObj>>() {
    }.getType();

    private static final int[] ToastPositions = {
            Gravity.RIGHT | Gravity.TOP,//0
            Gravity.CENTER | Gravity.TOP,//1
            Gravity.LEFT | Gravity.TOP,//2
            Gravity.LEFT | Gravity.BOTTOM,//3
            Gravity.CENTER | Gravity.BOTTOM,//4
            Gravity.RIGHT | Gravity.BOTTOM//5
    };

    private static class StreamObj {
        private final String game_name;
        private final String title;

        private StreamObj(String game, String title) {
            this.game_name = game;
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

        NotifyList(boolean isGame, String notificationTitle, String game, String name, Bitmap logo, String title, boolean live) {
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

        if (Tools.hasTokens(UserId, appPreferences)) {

            return GetUserLiveStreams(UserId, appPreferences, true);

        }

        return null;
    }

    private static JsonArray GetUserLiveStreams(String UserId, AppPreferences appPreferences, Boolean tryAgain) {
        JsonArray StreamsResult = new JsonArray();
        boolean HttpRequestSuccess = false;

        try {
            Set<String> TempArray = new HashSet<>();

            JsonArray TempStreams;

            Tools.ResponseObj response;

            JsonObject obj;
            JsonObject pagination;

            int StreamsSize;
            int AddedToArray;
            int status;

            String id;
            String url;
            String cursor = null;
            String[][] DEFAULT_HEADERS = {
                    {Constants.BASE_HEADERS[0][0], Tools.getString(Constants.PREF_CLIENT_ID, null, appPreferences)},
                    {Constants.BASE_HEADERS[1][0], Tools.getString(UserId + Constants.PREF_ACCESS_TOKEN, null, appPreferences)}
            };

            do {//Get all user fallowed live channels

                url = String.format(
                        Locale.US,
                        "https://api.twitch.tv/helix/streams/followed?first=100%s&user_id=%s",
                        cursor != null ? "&after=" + cursor : "",
                        UserId
                );

                StreamsSize = 0;
                AddedToArray = 0;

                for (int i = 0; i < 3; i++) {

                    response = Tools.Internal_MethodUrl(
                            url,
                            Constants.DEFAULT_HTTP_TIMEOUT + (Constants.DEFAULT_HTTP_EXTRA_TIMEOUT * i),
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


                            if (obj.isJsonObject() && obj.has("data") && !obj.get("data").isJsonNull()) {

                                TempStreams = obj.get("data").getAsJsonArray();//Get the follows array
                                StreamsSize = TempStreams.size();
                                pagination = obj.get("pagination").getAsJsonObject();

                                cursor = pagination.isJsonObject() && pagination.has("cursor") && !pagination.get("cursor").isJsonNull() ? pagination.get("cursor").getAsString() : null;

                                if (StreamsSize == 0) {
                                    break;
                                }

                                for (int j = 0; j < StreamsSize; j++) {

                                    obj = TempStreams.get(j).getAsJsonObject();//Get the position in the follows

                                    if (obj.isJsonObject() && !obj.get("id").isJsonNull()) {//Prevent null channelObj or Broadcast id

                                        id = obj.get("id").getAsString();//Broadcast id

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

                            if (tryAgain && Tools.refreshTokens(UserId, appPreferences)) {

                                return GetUserLiveStreams(UserId, appPreferences, false);

                            } else if (!tryAgain) {
                                break;
                            }

                        }

                    }
                }

            } while (StreamsSize > 0 && AddedToArray > 0 && cursor != null && !cursor.equals(""));//last array was empty or didn't had noting new

        } catch (Exception e) {
            Tools.recordException(TAG, "GetLiveStreamsListToken e ", e);
        }

        //Log.i(TAG, "GetLiveStreamsListToken StreamsResult " + StreamsResult.size());

        //If stream result is null the http request fail else even streams.size() < 1 that is the result
        return HttpRequestSuccess ? StreamsResult : null;
    }

    private static Map<String, String> GetStreamNotificationsLogo(JsonArray streams, String UserId, AppPreferences appPreferences, Boolean tryAgain) {
        Map<String, String> logoMap = new HashMap<>();

        String randomImg = "?" + ThreadLocalRandom.current().nextInt(1, 1000000);

        int StreamsSize = streams.size();
        int counter = 0;
        int status;

        String id;
        JsonObject obj;
        StringBuilder channels = new StringBuilder();
        String url;
        Tools.ResponseObj response;
        JsonArray TempStreams;

        String[][] DEFAULT_HEADERS = {
                {Constants.BASE_HEADERS[0][0], Tools.getString(Constants.PREF_CLIENT_ID, null, appPreferences)},
                {Constants.BASE_HEADERS[1][0], Tools.getString(UserId + Constants.PREF_ACCESS_TOKEN, null, appPreferences)}
        };

        for (int i = 0; i < StreamsSize; i++) {
            obj = streams.get(i).getAsJsonObject();//Get the position in the follows array
            id = obj.get("user_id").getAsString();//channel id
            channels.append("&id=").append(id);
            counter++;

            if (counter == 100 || counter == StreamsSize) {

                url = String.format(
                        Locale.US,
                        "https://api.twitch.tv/helix/users?first=100%s",
                        channels
                );
                channels = new StringBuilder();
                StreamsSize = 0;

                for (int y = 0; y < 3; y++) {

                    response = Tools.Internal_MethodUrl(
                            url,
                            Constants.DEFAULT_HTTP_TIMEOUT + (Constants.DEFAULT_HTTP_EXTRA_TIMEOUT * i),
                            null,
                            null,
                            0,
                            DEFAULT_HEADERS
                    );

                    if (response != null) {
                        status = response.status;

                        if (status == 200) {

                            obj = parseString(response.responseText).getAsJsonObject();

                            if (obj.isJsonObject() && obj.has("data") && !obj.get("data").isJsonNull()) {

                                TempStreams = obj.get("data").getAsJsonArray();//Get the follows array
                                StreamsSize = TempStreams.size();

                                for (int j = 0; j < StreamsSize; j++) {

                                    obj = TempStreams.get(j).getAsJsonObject();//Get the position in the array

                                    if (obj.isJsonObject() && obj.has("profile_image_url") && !obj.get("profile_image_url").isJsonNull()) {//Prevent null img

                                        id = obj.get("id").getAsString();//Channel id
                                        logoMap.put(id, obj.get("profile_image_url").getAsString() + randomImg);

                                    }

                                }

                            }
                            break;
                        } else if (status == 401 || status == 403) {

                            if (tryAgain && Tools.refreshTokens(UserId, appPreferences)) {

                                return GetStreamNotificationsLogo(streams, UserId, appPreferences, false);

                            } else if (!tryAgain) {
                                break;
                            }

                        }

                    }
                }
            }

        }

        return logoMap;
    }

    private static void GetStreamNotifications(Map<String, StreamObj> oldLive, JsonArray streams, String UserId,
                                               AppPreferences appPreferences, int Repeat, long NotifySinceTimeMs,
                                               Context context, boolean DoStreamLive, boolean DoStreamTitle, boolean DoStreamGame,
                                               ArrayList<NotifyList> result) {

        Map<String, StreamObj> currentLive = new HashMap<>();
        Map<String, String> mapLogo = GetStreamNotificationsLogo(streams, UserId, appPreferences, true);
        boolean mapEmpty = mapLogo.isEmpty();

        int StreamsSize = streams.size();

        String id;
        String user_id;
        String game;
        String display_name;
        String title;

        boolean isLive;

        JsonObject obj;

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
        String NotificationTitle;

        boolean gameChange;
        boolean titleChange;
        StreamObj TempObj;

        try {
            //There is no need to check for obj.isJsonObject() && !obj.get("_id").isJsonNull() and etc here as was already checked before reaching here
            for (int i = 0; i < StreamsSize; i++) {

                obj = streams.get(i).getAsJsonObject();//Get the position in the follows array
                id = obj.get("id").getAsString();//Broadcast id
                user_id = obj.get("user_id").getAsString();//Channel id

                display_name = !obj.get("user_name").isJsonNull() ? obj.get("user_name").getAsString() : null;

                if (display_name != null) {

                    game = !obj.get("game_name").isJsonNull() ? obj.get("game_name").getAsString() : "";
                    title = !obj.get("title").isJsonNull() ? obj.get("title").getAsString() : "";

                    currentLive.put(
                            id,
                            new StreamObj(
                                    game,
                                    title
                            )
                    );
                    isLive = !obj.get("type").isJsonNull() && (obj.get("type").getAsString()).contains("live");

                    NotificationTitle = null;

                    if (!oldLive.containsKey(id)) {

                        if (DoStreamLive) {

                            NotifyTime = true;

                            if (NotifySinceTimeMs > 0) {//NotifySinceTimeMs == 0 check is disable
                                StreamCreated_at = !obj.get("started_at").isJsonNull() ? obj.get("started_at").getAsString() : null;

                                if (StreamCreated_at != null) {

                                    date = input.parse(StreamCreated_at);

                                    if (date != null) {

                                        NotifyTime = NotifySinceTimeMs > (timeMsNow - date.getTime());

                                    }
                                }

                            }

                            if (NotifyTime) NotificationTitle = live_title;

                        }

                    } else if (DoStreamTitle || DoStreamGame) {

                        TempObj = oldLive.get(id);
                        gameChange = DoStreamGame && TempObj != null && !Objects.equals(TempObj.game_name, game);
                        titleChange = DoStreamTitle && TempObj != null && !Objects.equals(TempObj.title, title);

                        if (gameChange || titleChange) {

                            if (gameChange && titleChange) NotificationTitle = game_and_title;
                            else if (gameChange) NotificationTitle = game_title;
                            else NotificationTitle = title_title;

                        }

                    }

                    if (NotificationTitle != null) {

                        NotifyListResultAdd(
                                new NotifyList(
                                        false,
                                        NotificationTitle,
                                        game,
                                        display_name,
                                        GetBitmap(
                                                //!ChannelObj.get("logo").isJsonNull() ? ChannelObj.get("logo").getAsString() : Constants.LOGO_404
                                                !mapEmpty && mapLogo.containsKey(user_id) ? mapLogo.get(user_id) : Constants.LOGO_404
                                        ),
                                        title,
                                        isLive
                                ),
                                Repeat,
                                result
                        );

                    }

                }
            }
        } catch (Exception e) {
            Tools.recordException(TAG, "GetNotifications e ", e);
        }

        SaveOldStreamList(
                currentLive,
                appPreferences,
                UserId
        );

    }

    private static void NotifyListResultAdd(NotifyList notifyList, int Repeat, ArrayList<NotifyList> result) {
        //Toast can only run for about 3s allow the user to repeat same notification
        for (int x = 0; x < Repeat; x++) {
            result.add(notifyList);
        }
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
                                !ChannelObj.get("game_name").isJsonNull() ? ChannelObj.get("game_name").getAsString() : "",
                                !ChannelObj.get("title").isJsonNull() ? ChannelObj.get("title").getAsString() : ""
                        )
                );

            }
        } catch (Exception e) {
            Tools.recordException(TAG, "SetOldList e ", e);
        }

        SaveOldStreamList(
                currentLive,
                appPreferences,
                UserId
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
        } catch (MalformedURLException ignored) {
        }

        if (newUrl != null) {
            try {
                bmp = BitmapFactory.decodeStream(newUrl.openConnection().getInputStream());
            } catch (IOException ignored) {
            }
        }

        return bmp;
    }

    public static void CheckNotifications(String UserId, AppPreferences appPreferences, Handler ToastHandler, Context context) {
        try {

            ArrayList<NotifyList> NotifyListResult = new ArrayList<>();

            boolean DoStreamLive = Tools.getBoolean(Constants.PREF_NOTIFICATION_STREAM_LIVE, false, appPreferences);
            boolean DoStreamTitle = Tools.getBoolean(Constants.PREF_NOTIFICATION_STREAM_TITLE, false, appPreferences);
            boolean DoStreamGame = Tools.getBoolean(Constants.PREF_NOTIFICATION_STREAM_GAME, false, appPreferences);

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
                    //TODO check deprecation
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

                appPreferences.put(Constants.PREF_NOTIFICATION_WILL_END, (System.currentTimeMillis() + (ResultSize * 5000L)));
            }

        } catch (Exception e) {
            Tools.recordException(TAG, "CheckNotifications e ", e);
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
            } catch (Exception e) {//Exception caused on android 8.1 and up when notification fail to
                Tools.recordException(TAG, "ShowNotification e ", e);
            }
        }, 5000L * delay);

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
        //TODO check deprecation
        toast.setView(layout);
        toast.show();
    }

    public static boolean StartNotificationService(AppPreferences appPreferences) {
        //https://developer.android.com/about/versions/11/behavior-changes-11#toasts
        return Build.VERSION.SDK_INT < Build.VERSION_CODES.R &&
                getBoolean(Constants.PREF_NOTIFICATION_BACKGROUND, false, appPreferences) &&
                Tools.getString(Constants.PREF_USER_ID, null, appPreferences) != null;
    }

    @TargetApi(26)
    static NotificationCompat.Builder NotificationBuilder(String title, String text, @SuppressWarnings("SameParameterValue") String id, Context context) {
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
