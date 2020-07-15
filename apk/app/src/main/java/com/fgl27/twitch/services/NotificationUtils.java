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

package com.fgl27.twitch.services;

import android.annotation.SuppressLint;
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

import com.fgl27.twitch.Constants;
import com.fgl27.twitch.R;
import com.fgl27.twitch.Tools;
import com.fgl27.twitch.channels.SyncChannelJobService;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import net.grandcentrix.tray.AppPreferences;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

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

    public static class NotifyList {
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

    public static JsonArray GetLiveStreamsList(String UserId) {
        JsonArray StreamsResult = new JsonArray();

        try {
            String Channels = SyncChannelJobService.GetChannels(UserId);
            if (Channels == null) return null;

            String url;
            int Offset = 0;
            int StreamsSize;
            Tools.ResponseObj response;
            JsonObject obj;
            JsonArray TempStreams;
            String id;
            ArrayList<String> currentLive = new ArrayList<>();
            int AddedToArray;

            do {

                url = String.format(
                        Locale.US,
                        "https://api.twitch.tv/kraken/streams/?channel=%s&limit=100&offset=%d&stream_type=all&api_version=5",
                        Channels,
                        Offset
                );

                StreamsSize = 0;
                AddedToArray = 0;
                for (int i = 0; i < 3; i++) {

                    response = Tools.Internal_MethodUrl(url, 25000 + (2500 * i), null, null, 0, Tools.DEFAULT_HEADERS);

                    if (response != null) {

                        if (response.getStatus() == 200) {
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
                                    id = obj.get("_id").getAsString();//Broadcast id

                                    if (!currentLive.contains(id)) {//Prevent add duplicated or empty obj and infinity loop
                                        currentLive.add(id);
                                        AddedToArray++;

                                        StreamsResult.add(obj);
                                    }

                                }

                            }
                            break;
                        }

                    }
                }

            } while (StreamsSize > 0 && AddedToArray > 0); //last array was empty or didn't had noting new

        } catch (Exception e) {
            Log.w(TAG, "GetLiveStreamsList e " + e.getMessage());
        }

        return StreamsResult.size() > 0 ? StreamsResult : null;
    }

    public static ArrayList<NotifyList> GetNotifications(ArrayList<String> oldLive, JsonArray streams, String UserId, AppPreferences appPreferences) {

        ArrayList<NotifyList> result = new ArrayList<>();
        int StreamsSize = streams.size();
        JsonObject obj;
        NotifyList tempNotifyList;
        String id;
        String game;
        boolean isLive;
        ArrayList<String> currentLive = new ArrayList<>();

        int Repeat = Tools.getInt(Constants.PREF_NOTIFICATION_REPEAT, 1, appPreferences);

        try {
            for (int i = 0; i < StreamsSize; i++) {

                obj = streams.get(i).getAsJsonObject();//Get the position in the follows array

                if (obj.isJsonObject() && !obj.get("channel").isJsonNull()) {

                    game = !obj.get("game").isJsonNull() ? obj.get("game").getAsString() : "";
                    isLive = !obj.get("broadcast_platform").isJsonNull() && (obj.get("broadcast_platform").getAsString()).contains("live");
                    id = obj.get("_id").getAsString();//Broadcast id
                    obj = obj.get("channel").getAsJsonObject(); //Get the channel obj in position

                    if (!oldLive.contains(id)) {

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

    public static void SetOldList(JsonArray streams, String UserId, AppPreferences appPreferences) {
        ArrayList<String> currentLive = new ArrayList<>();
        JsonObject obj;
        String id;
        int StreamsSize = streams.size();

        try {
            for (int i = 0; i < StreamsSize; i++) {

                obj = streams.get(i).getAsJsonObject();//Get the position in the follows array

                if (obj.isJsonObject() && !obj.get("channel").isJsonNull()) {

                    id = obj.get("_id").getAsString();//Broadcast id

                    if (!currentLive.contains(id)) currentLive.add(id);

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

    @SuppressLint("InflateParams")
    public static void DoToast(NotifyList result, Context context, int ToastPosition) {
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        View layout;
        if (inflater != null) {
            layout = inflater.inflate(R.layout.custom_toast, null);
        } else return;

        //Get the width base on screen size and position
        WindowManager window = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        int LayoutWidth = 0;
        int ImageSize = 0;
        float textSizeSmall = 0;
        float textSizeBig = 0;
        float width;

        if (window != null) {

            Point ScreenSize = Tools.ScreenSize(window.getDefaultDisplay());

            //The device may be a phone that changes from landscape to portrait
            //Get the bigger value at the time ou the notification
            int max = Math.max(ScreenSize.x, ScreenSize.y);
            int min = Math.min(ScreenSize.x, ScreenSize.y);

            width = max / 100.0f;
            LayoutWidth = (int) (width * 40.0f);

            //Prevent notification bigger then the screen
            LayoutWidth = Math.min(LayoutWidth, (min - (min / 100)));

            ImageSize = (int) (LayoutWidth / 5.0f);

            //Scale the text to screen size and density
            float ScaleDensity = width / (context.getResources().getDisplayMetrics().density / 2.0f);
            textSizeSmall = 0.62f * ScaleDensity;
            textSizeBig = 0.68f * ScaleDensity;
        }


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

        ImageView image = layout.findViewById(R.id.image);
        Bitmap bmp = result.getLogo();
        if (bmp != null) {
            if (LayoutWidth > 0) bmp = Bitmap.createScaledBitmap(bmp, ImageSize, ImageSize, true);

            image.setImageBitmap(bmp);
        } else image.setImageResource(android.R.color.transparent);

        if (LayoutWidth > 0) {
            TextView now_live = layout.findViewById(R.id.now_live);

            now_live.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeBig);
            name.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeBig);

            title.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeSmall);
            game.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSizeSmall);
        }

        Toast toast = new Toast(context);
        toast.setGravity(ToastPositions[ToastPosition], 0, 0);
        toast.setDuration(Toast.LENGTH_LONG);
        toast.setView(layout);
        toast.show();
    }

    public static void ShowNotification(NotificationUtils.NotifyList NotifyListResult, int delay,
                                        Handler ToastHandler, Context context, AppPreferences appPreferences) {

        ToastHandler.postDelayed(() -> {
            try {
                DoToast(
                        NotifyListResult,
                        context,
                        Tools.getInt(Constants.PREF_NOTIFICATION_POSITION, 0, appPreferences)
                );
            } catch (Exception ignored) {}//silent Exception caused on android 8.1 and up when notification fail to show or user block it
        }, 5000 * delay);

    }

    public static void CheckNotifications(String UserId, AppPreferences appPreferences, Handler ToastHandler, Context context) {
        try {
            JsonArray streams = GetLiveStreamsList(UserId);

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

                        for (int i = 0; i < ResultSize; i++) {
                            ShowNotification(
                                    NotifyListResult.get(i),
                                    i,
                                    ToastHandler,
                                    context,
                                    appPreferences
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
}
