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
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import net.grandcentrix.tray.AppPreferences;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

import static com.google.gson.JsonParser.parseString;

public final class NotificationUtils {

    private static final String TAG = "STTV_NotificationUtils";

    private static final int[] ToastPositions = {
            Gravity.RIGHT | Gravity.TOP,//0
            Gravity.CENTER | Gravity.TOP,//1
            Gravity.LEFT | Gravity.TOP,//2
            Gravity.LEFT | Gravity.BOTTOM,//3
            Gravity.CENTER | Gravity.BOTTOM,//4
            Gravity.RIGHT | Gravity.BOTTOM//5
    };

    private static class NotifyList {
        private final String game;
        private final String name;
        private final Bitmap logo;
        private final String title;
        private final boolean live;

        public NotifyList(String game, String name, Bitmap logo, String title, boolean live) {
            this.game = game;
            this.name = name;
            this.logo = logo;
            this.title = title;
            this.live = live;
        }

        public String getGame() {
            return game;
        }

        public String getName() {
            return name;
        }

        public Bitmap getLogo() {
            return logo;
        }

        public String getTitle() {
            return title;
        }

        public boolean isLive() {
            return live;
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

        try {
            ArrayList<String> TempArray = new ArrayList<>();

            JsonArray TempStreams;

            Tools.ResponseObj response;

            JsonObject obj;
            JsonObject objChannel;

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
                        status = response.getStatus();

                        if (status == 200) {

                            obj = parseString(response.getResponseText()).getAsJsonObject();

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

                                    if (obj.isJsonObject() && !obj.get("channel").isJsonNull()) {

                                        objChannel = obj.get("channel").getAsJsonObject();
                                        id = objChannel.get("_id").getAsString();//Broadcast id

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
            Log.w(TAG, "GetLiveStreamsListToken e " + e.getMessage());
        }

//        if (BuildConfig.DEBUG) {
//            Log.i(TAG, "GetLiveStreamsListToken size " + StreamsResult.size());
//        }

        return StreamsResult.size() > 0 ? StreamsResult : null;
    }

    //There is a faster way to do this??? yes but that is needed the user authorization key
    //So this function runs witout it is slower even more as the user follows more channels but works
    //The service that run this functions aren't time dependent so no problem
    public static JsonArray GetLiveStreamsListNoToken(String UserId) {
        JsonArray StreamsResult = new JsonArray();

        try {
            ArrayList<String> ChannelsList = GetChannels(UserId);
            if (ChannelsList == null) return null;

            ArrayList<String> TempArray = new ArrayList<>();

            Tools.ResponseObj response;
            JsonObject obj;
            JsonArray TempStreams;

            String url;
            String id;

            int StreamsSize;
            int ChannelsSize = ChannelsList.size();
            int LoopSize = (ChannelsSize / 100) + 1;
            int len;

            StringBuilder Channels;

            for (int x = 0; x < LoopSize; x++) {

                //The list may contains 1000+ channels run 100 at a time
                Channels = new StringBuilder();
                len = Math.min(ChannelsSize, ((x + 1) * 100));

                for (int j = x * 100; j < len; j++) {
                    Channels.append(ChannelsList.get(j)).append(",");
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

                        if (response.getStatus() == 200) {
                            obj = parseString(response.getResponseText()).getAsJsonObject();

                            if (obj.isJsonObject() && !obj.get("streams").isJsonNull()) {

                                TempStreams = obj.get("streams").getAsJsonArray();//Get the follows array
                                StreamsSize = TempStreams.size();

                                if (StreamsSize < 1) {
                                    break;
                                }

                                for (int j = 0; j < StreamsSize; j++) {

                                    obj = TempStreams.get(j).getAsJsonObject();//Get the position in the follows
                                    id = obj.get("_id").getAsString();//Broadcast id

                                    if (!TempArray.contains(id)) {//Prevent add duplicated or empty obj and infinity loop
                                        TempArray.add(id);
                                        StreamsResult.add(obj);
                                    }

                                }

                            }
                            break;
                        }

                    }

                }
            }

        } catch(Exception e){
            Log.w(TAG, "GetLiveStreamsListNoToken e " + e.getMessage());
        }

//        if (BuildConfig.DEBUG) {
//            Log.i(TAG, "GetLiveStreamsListNoToken size " + StreamsResult.size());
//        }

        return StreamsResult.size() > 0 ? StreamsResult : null;
    }

    public static ArrayList<String> GetChannels(String userId)  {
        ArrayList<String> Result = new ArrayList<>();

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
            Log.w(TAG, "updateChannels e " + e.getMessage());
        }

        return Result.size() > 0 ? Result : null;

    }

//    public static String getTimeFromMs(long millis) {
//        if(millis < 0) {
//            millis = 0;
//        }
//
//        long days = TimeUnit.MILLISECONDS.toDays(millis);
//        millis -= TimeUnit.DAYS.toMillis(days);
//        long hours = TimeUnit.MILLISECONDS.toHours(millis);
//        millis -= TimeUnit.HOURS.toMillis(hours);
//        long minutes = TimeUnit.MILLISECONDS.toMinutes(millis);
//        millis -= TimeUnit.MINUTES.toMillis(minutes);
//        long seconds = TimeUnit.MILLISECONDS.toSeconds(millis);
//
//        return(days +
//                " Days " +
//                hours +
//                " Hours " +
//                minutes +
//                " Minutes " +
//                seconds +
//                " Seconds");
//    }

    private static ArrayList<NotifyList> GetNotifications(ArrayList<String> oldLive, JsonArray streams, String UserId, AppPreferences appPreferences) {

        ArrayList<NotifyList> result = new ArrayList<>();
        ArrayList<String> currentLive = new ArrayList<>();

        int StreamsSize = streams.size();

        String id;
        String game;

        boolean isLive;

        JsonObject obj;
        NotifyList tempNotifyList;

        int Repeat = Tools.getInt(Constants.PREF_NOTIFICATION_REPEAT, 1, appPreferences);
        long NotifySinceTimeMs = Tools.getLong(Constants.PREF_NOTIFICATION_SINCE_TIME, 0, appPreferences);

        SimpleDateFormat input = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US);
        input.setTimeZone(TimeZone.getTimeZone("UTC"));
        Date date;

        String StreamCreated_at;
        long timeNow = new Date().getTime();
        boolean NotifyTime;

        try {
            for (int i = 0; i < StreamsSize; i++) {

                obj = streams.get(i).getAsJsonObject();//Get the position in the follows array

                if (obj.isJsonObject() && !obj.get("channel").isJsonNull()) {

                    NotifyTime = true;

                    if (NotifySinceTimeMs > 0) {
                        StreamCreated_at = !obj.get("created_at").isJsonNull() ? obj.get("created_at").getAsString() : null;

                        if (StreamCreated_at != null) {

                            date = input.parse(StreamCreated_at);

                            if (date != null) {

                                NotifyTime = NotifySinceTimeMs > (timeNow - date.getTime());

                            }
                        }

                    }

                    game = !obj.get("game").isJsonNull() ? obj.get("game").getAsString() : "";
                    isLive = !obj.get("broadcast_platform").isJsonNull() && (obj.get("broadcast_platform").getAsString()).contains("live");
                    id = !obj.get("_id").isJsonNull() ? obj.get("_id").getAsString() : null;//Broadcast id
                    obj = obj.get("channel").getAsJsonObject(); //Get the channel obj in position
                    currentLive.add(id);

                    if (NotifyTime && id != null && !oldLive.contains(id)) {

                        Bitmap bmp = null;
                        if (!obj.get("logo").isJsonNull())
                            bmp = GetBitmap(obj.get("logo").getAsString());

                        tempNotifyList = new NotifyList(
                                game,
                                !obj.get("display_name").isJsonNull() ? obj.get("display_name").getAsString() : "",
                                bmp,
                                !obj.get("status").isJsonNull() ? obj.get("status").getAsString() : "",
                                isLive
                        );
                        //Toast can only run for about 3s allow the user to repeat same notification
                        for (int x = 0; x < Repeat; x++) {
                            result.add(tempNotifyList);
                        }

                    }
                }
            }
        } catch (Exception e) {
            Log.w(TAG, "GetLiveStreamsList e " + e.getMessage());
        }

        SaveOldList(currentLive, UserId, appPreferences);

        return result.size() > 0 ? result : null;
    }

    private static void SetOldList(JsonArray streams, String UserId, AppPreferences appPreferences) {
        ArrayList<String> currentLive = new ArrayList<>();
        JsonObject obj;
        int StreamsSize = streams.size();

        try {
            for (int i = 0; i < StreamsSize; i++) {

                obj = streams.get(i).getAsJsonObject();//Get the position in the follows array

                if (obj.isJsonObject() && !obj.get("channel").isJsonNull()) {

                    currentLive.add(obj.get("_id").getAsString());//Broadcast id

                }
            }
        } catch (Exception e) {
            Log.w(TAG, "GetLiveStreamsList e " + e.getMessage());
        }

        SaveOldList(currentLive, UserId, appPreferences);
    }

    private static void SaveOldList(ArrayList<String> currentLive, String UserId, AppPreferences appPreferences) {
        appPreferences.put(UserId + Constants.PREF_NOTIFY_OLD_LIST, new Gson().toJson(currentLive));
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

            JsonArray streams = GetLiveStreamsList(UserId, appPreferences);

            if (streams != null) {

                ArrayList<String> oldLive = new ArrayList<>();
                String tempOldLive = Tools.getString(UserId + Constants.PREF_NOTIFY_OLD_LIST, null, appPreferences);

                if (tempOldLive != null) {
                    oldLive = new Gson().fromJson(tempOldLive, new TypeToken<List<String>>() {}.getType());
                }

                if (oldLive.size() > 0) {

                    ArrayList<NotifyList> NotifyListResult =
                            GetNotifications(
                                    oldLive,
                                    streams,
                                    UserId,
                                    appPreferences
                            );

                    if (NotifyListResult != null) {

                        int ResultSize = NotifyListResult.size();
                        int ToastPosition = Tools.getInt(Constants.PREF_NOTIFICATION_POSITION, 0, appPreferences);

                        //Get the width base on screen size and position
                        WindowManager window = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
                        int LayoutWidth = 0;
                        int ImageSize = 0;
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
                                    textSizeSmall,
                                    textSizeBig
                            );
                        }

                        appPreferences.put(Constants.PREF_NOTIFICATION_WILL_END, (System.currentTimeMillis() + (ResultSize * 5000)));
                    }

                } else {

                    SetOldList(streams, UserId, appPreferences);

                }
            }

        } catch (Exception e) {
            Log.w(TAG, "CheckNotifications e " + e.getMessage());
        }
    }

    private static void ShowNotification(NotifyList NotifyListResult, int delay,
                                         Handler ToastHandler, Context context, int ToastPosition,
                                         int LayoutWidth, int ImageSize, float textSizeSmall, float textSizeBig) {

        ToastHandler.postDelayed(() -> {
            try {
                DoToast(
                        NotifyListResult,
                        context,
                        ToastPosition,
                        LayoutWidth,
                        ImageSize,
                        textSizeSmall,
                        textSizeBig
                );
            } catch (Exception ignored) {}//silent Exception caused on android 8.1 and up when notification fail to show or user block it
        }, 5000 * delay);

    }

    @SuppressLint("InflateParams")
    private static void DoToast(NotifyList result, Context context, int ToastPosition, int LayoutWidth, int ImageSize, float textSizeSmall, float textSizeBig) {

        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        View layout;

        if (inflater != null) {
            layout = inflater.inflate(R.layout.custom_toast, null);
        } else return;

        LinearLayout layout_text = layout.findViewById(R.id.text_holder);
        if (LayoutWidth > 0) layout_text.getLayoutParams().width = LayoutWidth;
        layout_text.requestLayout();

        TextView name = layout.findViewById(R.id.name);
        name.setCompoundDrawablesWithIntrinsicBounds(
                result.isLive() ? R.drawable.circle : R.drawable.ic_refresh,
                0,
                0,
                0
        );
        name.setText(result.getName());

        TextView title = layout.findViewById(R.id.title);
        title.setText(result.getTitle().trim());

        TextView game = layout.findViewById(R.id.game);
        game.setText(result.getGame());

        if (LayoutWidth > 0) {
            TextView now_live = layout.findViewById(R.id.now_live);

            now_live.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeBig);
            name.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeBig);

            title.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeSmall);
            game.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeSmall);
        }

        ImageView image = layout.findViewById(R.id.image);
        Bitmap bmp = result.getLogo();
        if (bmp != null) {
            if (LayoutWidth > 0) bmp = Bitmap.createScaledBitmap(bmp, ImageSize, ImageSize, true);

            image.setImageBitmap(bmp);
        } else image.setImageResource(android.R.color.transparent);

        Toast toast = new Toast(context);
        toast.setGravity(ToastPositions[ToastPosition], 0, 0);
        toast.setDuration(Toast.LENGTH_LONG);
        toast.setView(layout);
        toast.show();
    }

    public static boolean StartNotificationService(AppPreferences appPreferences) {
        return Tools.getBoolean(Constants.PREF_NOTIFICATION_BACKGROUND, false, appPreferences) &&
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
}
