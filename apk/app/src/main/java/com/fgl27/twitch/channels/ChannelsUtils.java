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

import static com.google.gson.JsonParser.parseString;

import android.app.job.JobInfo;
import android.app.job.JobScheduler;
import android.content.ComponentName;
import android.content.ContentUris;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.VectorDrawable;
import android.media.tv.TvContract;
import android.net.Uri;

import androidx.annotation.DrawableRes;
import androidx.annotation.NonNull;
import androidx.tvprovider.media.tv.Channel;
import androidx.tvprovider.media.tv.ChannelLogoUtils;
import androidx.tvprovider.media.tv.PreviewProgram;
import androidx.tvprovider.media.tv.TvContractCompat;

import com.fgl27.twitch.Constants;
import com.fgl27.twitch.PlayerActivity;
import com.fgl27.twitch.R;
import com.fgl27.twitch.Tools;
import com.fgl27.twitch.notification.NotificationUtils;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import net.grandcentrix.tray.AppPreferences;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Set;
import java.util.TimeZone;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

public final class ChannelsUtils {

    private static final int JOB_ID = 1;

    private static final String TAG = "STTV_ChannelsUtils";

    private static final String[] TV_CONTRACT_ARRAY = {
            TvContractCompat.Channels._ID,
            TvContract.Channels.COLUMN_DISPLAY_NAME
    };

    @SuppressWarnings({"unused", "FieldCanBeLocal", "RedundantSuppression"})
    public static class PreviewObj {
        private final JsonObject obj;
        private final String type;
        private final int screen;

        PreviewObj(JsonObject obj, String type, int screen) {
            this.obj = obj;
            this.type = type;
            this.screen = screen;
        }

        PreviewObj(int screen, String type) {
            this.obj = null;
            this.type = type;
            this.screen = screen;
        }
    }

    public static class ChannelContentObj {
        private final String title;
        private final String description;
        private final String imgUrl;
        private final int previewSize;
        private final int viewers;
        private final String obj;
        private final boolean isLive;

        ChannelContentObj(String title, String description, String imgUrl, int previewSize, int viewers, String obj, boolean isLive) {
            this.title = title;
            this.description = description;
            this.imgUrl = imgUrl;
            this.previewSize = previewSize;
            this.viewers = viewers;
            this.obj = obj;
            this.isLive = isLive;
        }

    }

    private static final Comparator<ChannelContentObj> compareViewers = (Obj1, Obj2) -> Obj2.viewers - Obj1.viewers;

    public static class ChannelObj {
        private final int drawable;
        private final String name;
        private final int type;
        private final List<ChannelContentObj> Content;

        ChannelObj(int drawable, String name, int type, List<ChannelContentObj> content) {
            this.drawable = drawable;
            this.name = name;
            this.type = type;
            this.Content = content;
        }

    }

    private static void StartChannel(Context context, ChannelObj channel, long channelId, String[] CHANNELS_NAMES) {

        if (channelId != -1L) {//Channel already created just update
            updateChannel(context, channelId, channel);
            createChannelContent(context, channelId, channel);
            return;
        }

        channelId = createChannel(context, channel);

        if (channelId != -1L) {

            createChannelContent(context, channelId, channel);

            //Default channel
            if (Objects.equals(channel.name, CHANNELS_NAMES[Constants.CHANNEL_TYPE_LIVE]))
                TvContractCompat.requestChannelBrowsable(context, channelId);

        }
    }

    private static void updateChannel(Context context, long channelId, ChannelObj channel) {
        writeChannelLogo(context, channelId, channel.drawable);

        Channel.Builder builder = createChannelBuilder(channel.name, channel.type, context);

        //int rowsUpdated =
        context.getContentResolver().update(
                TvContractCompat.buildChannelUri(channelId), builder.build().toContentValues(), null, null);

//        if (rowsUpdated < 1) {
//            Tools.recordException(TAG, "Update channel failed " + channel.name, null);
//        }
    }

    private static long createChannel(Context context, ChannelObj channel) {
        Channel.Builder builder = createChannelBuilder(channel.name, channel.type, context);

        Uri channelUri = null;

        try {

            channelUri = context.getContentResolver()
                    .insert(
                            TvContractCompat.Channels.CONTENT_URI,
                            builder.build().toContentValues()
                    );

        } catch (Exception e) { // channels not supported
            Tools.recordException(TAG, "createChannel e ", e);
        }

        if (channelUri == null || channelUri.equals(Uri.EMPTY)) {
            //Tools.recordException(TAG, "createChannel failed " + channel.name + " channelUri " + channelUri, null);
            return -1L;
        }

        long channelId = ContentUris.parseId(channelUri);

        writeChannelLogo(context, channelId, channel.drawable);

        return channelId;
    }

    private static void createChannelContent(Context context, long channelId, ChannelObj channel) {
        DeleteProgram(context, channelId);

        int channel_type = channel.type;
        String randomImg = "?" + ThreadLocalRandom.current().nextInt(1, 1000000);
        List<ChannelContentObj> Content = channel.Content;

        if (Content != null) {
            int ContentSize = Content.size();
            int weight = ContentSize;

            for (int i = 0; i < ContentSize; i++, --weight) {
                PreviewProgramAdd(context, channelId, Content.get(i), weight, channel_type, randomImg);
            }

        } else {
            PreviewProgramAdd(context, channelId, emptyContent(context), 0, channel_type, randomImg);
        }

    }

    private static ChannelContentObj emptyContent(Context context) {

        return new ChannelContentObj(
                context.getString(R.string.channel_empty),
                context.getString(R.string.channel_disable),
                "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/refresh.png",
                TvContractCompat.PreviewPrograms.ASPECT_RATIO_1_1,
                1,
                null,
                false
        );

    }

    private static void PreviewProgramAdd(Context context, long channelId, ChannelContentObj ContentObj, int weight, int channel_type, String randomImg) {
        PreviewProgram.Builder builder =
                new PreviewProgram.Builder()
                        .setTitle(ContentObj.title)
                        .setDescription(ContentObj.description)
                        .setPosterArtUri(Uri.parse(ContentObj.imgUrl + randomImg))
                        .setPosterArtAspectRatio(ContentObj.previewSize)
                        .setIntent(createAppIntent(context, ContentObj.obj, channel_type))
                        .setType(TvContractCompat.PreviewPrograms.TYPE_MOVIE)
                        .setLive(ContentObj.isLive)
                        .setWeight(weight)
                        .setChannelId(channelId);

        //Uri programUri = null;

        try {
            //programUri =
            context.getContentResolver().insert(
                    TvContractCompat.PreviewPrograms.CONTENT_URI,
                    builder.build().toContentValues()
            );
        } catch (Exception e) {
            Tools.recordException(TAG, "PreviewProgramAdd e ", e);
        }

//        if (programUri == null || programUri.equals(Uri.EMPTY)) {
//            Tools.recordException(TAG, "PreviewProgramAdd failed " + ContentObj.title + " programUri " + programUri, null);
//        }
    }

    private static Channel.Builder createChannelBuilder(String name, int channel_screen, Context context) {
        return new Channel.Builder()
                .setDisplayName(name)
                .setAppLinkIntent(createAppIntent(context, new Gson().toJson(new PreviewObj(channel_screen, "SCREEN")), 0))
                .setType(TvContractCompat.Channels.TYPE_PREVIEW);

    }

    private static Intent createAppIntent(Context context, String channel_obj, int channel_type) {

        Intent intent = new Intent(context, PlayerActivity.class);
        intent.setAction(Constants.CHANNEL_INTENT);
        intent.putExtra(Constants.CHANNEL_TYPE, channel_type);
        intent.putExtra(Constants.CHANNEL_OBJ, channel_obj);

        return intent;
    }

    static private void writeChannelLogo(Context context, long channelId, @DrawableRes int drawableId) {
        if (channelId != -1 && drawableId != -1) {

            try {

                ChannelLogoUtils.storeChannelLogo(
                        context,
                        channelId,
                        convertToBitmap(context, drawableId)
                );

            } catch (Exception e) {
                Tools.recordException(TAG, "writeChannelLogo ", e);
            }

        }
    }

    @NonNull
    private static Bitmap convertToBitmap(Context context, int resourceId) {
        Drawable drawable = context.getDrawable(resourceId);

        if (drawable instanceof VectorDrawable) {

            Bitmap bitmap =
                    Bitmap.createBitmap(
                            drawable.getIntrinsicWidth(),
                            drawable.getIntrinsicHeight(),
                            Bitmap.Config.ARGB_8888
                    );

            Canvas canvas = new Canvas(bitmap);
            drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
            drawable.draw(canvas);
            return bitmap;
        }

        return BitmapFactory.decodeResource(context.getResources(), resourceId);
    }

    private static void DeleteProgram(Context context, long channelId) {
        if (channelId != -1L) {

            try {

                context.getContentResolver().delete(
                        TvContractCompat.buildPreviewProgramsUriForChannel(channelId),
                        null,
                        null
                );

            } catch (Exception e) {
                Tools.recordException(TAG, "DeleteProgram ", e);
            }

        }
    }

    private static void DeleteChannel(Context context, long channelId) {
        if (channelId != -1L) {

            try {

                context.getContentResolver().delete(
                        TvContractCompat.buildChannelUri(channelId),
                        null,
                        null
                );

            } catch (Exception e) {
                Tools.recordException(TAG, "DeleteChannel ", e);
            }

        }
    }

    private static long getChannelIdFromTvProvider(Context context, String channel_name) {

        try (Cursor cursor =
                     context.getContentResolver()
                             .query(
                                     TvContractCompat.Channels.CONTENT_URI,
                                     TV_CONTRACT_ARRAY,
                                     null,
                                     null,
                                     null)) {
            if (cursor != null && cursor.moveToFirst()) {
                do {
                    Channel channel = Channel.fromCursor(cursor);

                    if (channel_name.equals(channel.getDisplayName())) {

                        return channel.getId();
                    }
                } while (cursor.moveToNext());

                cursor.close();
            }

        } catch (Exception e) {

            Tools.recordException(TAG, "getChannelIdFromTvProvider ", e);

        }

        return -1L;
    }


    private static boolean getChannelIsBrowsable(Context context, long channelId) {

        try (Cursor cursor =
                     context.getContentResolver()
                             .query(
                                     TvContractCompat.buildChannelUri(channelId),
                                     null,
                                     null,
                                     null,
                                     null)) {
            if (cursor != null && cursor.moveToNext()) {
                Channel channel = Channel.fromCursor(cursor);
                return channel.isBrowsable();
            }

        } catch (Exception e) {

            Tools.recordException(TAG, "getChannelIsBrowsable ", e);

        }

        return false;
    }

    public static void scheduleSyncingChannel(Context context) {

        try {

            JobScheduler scheduler = (JobScheduler) context.getSystemService(Context.JOB_SCHEDULER_SERVICE);

            scheduler.schedule(
                    new JobInfo.Builder(JOB_ID, new ComponentName(context, SyncChannelJobService.class))
                            .setPeriodic(TimeUnit.MINUTES.toMillis(30))
                            .setRequiredNetworkType(JobInfo.NETWORK_TYPE_ANY)
                            .setRequiresDeviceIdle(false)
                            .setRequiresCharging(false)
                            .build()
            );

        } catch (Exception e) {
            Tools.recordException(TAG, "scheduleSyncingChannel ", e);
        }

    }

    public static boolean isJobServiceNotSchedule(Context context) {
        JobScheduler scheduler = (JobScheduler) context.getSystemService(Context.JOB_SCHEDULER_SERVICE);

        for (JobInfo jobInfo : scheduler.getAllPendingJobs()) {
            if (jobInfo.getId() == JOB_ID) {
                return false;
            }
        }

        return true;
    }

    private static ChannelContentObj getRefreshContent(Context context) {
        Calendar rightNow = Calendar.getInstance();
        String month = rightNow.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.getDefault());
        String day = String.valueOf(rightNow.get(Calendar.DAY_OF_MONTH));
        String dayMonth;

//        @RequiresApi(api = Build.VERSION_CODES.O)
//        String pattern = DateTimeFormatterBuilder.getLocalizedDateTimePattern(
//                FormatStyle.SHORT,
//                FormatStyle.SHORT,
//                IsoChronology.INSTANCE,
//                Locale.getDefault()
//        ).replaceAll("[^Md]|(?<=(.))\\1", "").toUpperCase();

        String dateFormat = ((SimpleDateFormat) DateFormat.getDateInstance(DateFormat.SHORT, Locale.getDefault()))
                .toPattern().replaceAll("[^Md]|(?<=(.))\\1", "").toUpperCase(Locale.US);

        if (dateFormat.startsWith("M")) dayMonth = month + " " + day;
        else dayMonth = day + " " + month;

        return new ChannelContentObj(
                String.format(
                        Locale.US,
                        context.getString(R.string.channel_last_refresh),
                        rightNow.getDisplayName(Calendar.DAY_OF_WEEK, Calendar.LONG, Locale.getDefault()),
                        dayMonth,
                        rightNow.get(Calendar.HOUR_OF_DAY),
                        rightNow.get(Calendar.MINUTE)
                ),
                context.getString(R.string.channel_refresh),
                "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/refresh.png",
                TvContractCompat.PreviewPrograms.ASPECT_RATIO_1_1,
                1,
                null,
                false
        );

    }

    private static DecimalFormat getDecimalFormat() {
        DecimalFormat decimalFormat = new DecimalFormat("#.##");
        decimalFormat.setGroupingUsed(true);
        decimalFormat.setGroupingSize(3);

        return decimalFormat;
    }

    private static String getTimeFromMs(long millis) {
        if (millis < 0) return null;

        long hours = TimeUnit.MILLISECONDS.toHours(millis);
        millis -= TimeUnit.HOURS.toMillis(hours);
        long minutes = TimeUnit.MILLISECONDS.toMinutes(millis);
        millis -= TimeUnit.MINUTES.toMillis(minutes);
        long seconds = TimeUnit.MILLISECONDS.toSeconds(millis);

        return String.format(Locale.US, "%02d:%02d:%02d", hours, minutes, seconds);
    }

    public static void UpdateAllChannels(Context context, AppPreferences appPreferences, String[] CHANNELS_NAMES) {
        String UserId = Tools.getString(Constants.PREF_USER_ID, null, appPreferences);

        if (!Tools.hasTokens(UserId, appPreferences)) {
            return;
        }
        StartLive(context, UserId, appPreferences, CHANNELS_NAMES);
        StartFeatured(context);
        StartGames(context, UserId, appPreferences, CHANNELS_NAMES);
        UpdateUserChannels(context, appPreferences, CHANNELS_NAMES);
    }

    public static void UpdateUserChannels(Context context, AppPreferences appPreferences, String[] CHANNELS_NAMES) {
        SetUserLive(
                context,
                Tools.getString(Constants.PREF_USER_ID, null, appPreferences),
                appPreferences,
                CHANNELS_NAMES
        );
    }

    public static void StartLive(Context context, String UserId, AppPreferences appPreferences, String[] CHANNELS_NAMES) {
        if (!Tools.isConnected(context)) return;

        String lang = Tools.getString(Constants.PREF_USER_LANGUAGE, null, appPreferences);

        List<ChannelContentObj> content = null;
        long channelId = getChannelIdFromTvProvider(
                context,
                Constants.CHANNELS_NAMES[Constants.CHANNEL_TYPE_LIVE]
        );

        //this is the default channel add content without check for getChannelIsBrowsable
        if (channelId == -1L || getChannelIsBrowsable(context, channelId)) {

            content = GetLiveContent(
                    "https://api.twitch.tv/helix/streams?first=100" + (lang != null ? "&language=" + lang : ""),
                    "data",
                    true,
                    Constants.CHANNEL_TYPE_LIVE,
                    context,
                    UserId,
                    appPreferences,
                    true
            );

        }

        StartChannel(
                context,
                new ChannelObj(
                        R.mipmap.ic_launcher,
                        CHANNELS_NAMES[Constants.CHANNEL_TYPE_LIVE],
                        Constants.CHANNEL_TYPE_LIVE,
                        content
                ),
                channelId,
                CHANNELS_NAMES
        );
    }

    public static void SetUserLive(Context context, String userId, AppPreferences appPreferences, String[] CHANNELS_NAMES) {
        if (!Tools.isConnected(context)) return;

        long channelId = getChannelIdFromTvProvider(
                context,
                Constants.CHANNELS_NAMES[Constants.CHANNEL_TYPE_USER_LIVE]
        );

        if (userId != null) {

            if (channelId != -1L && getChannelIsBrowsable(context, channelId)) {
                JsonArray Streams = NotificationUtils.GetLiveStreamsList(userId, appPreferences);

                if (Streams != null) {

                    StartUserLive(
                            context,
                            ProcessLiveArray(
                                    Streams,//Get the follows array
                                    true,
                                    Constants.CHANNEL_TYPE_USER_LIVE,
                                    context
                            ),
                            channelId,
                            CHANNELS_NAMES
                    );

                }

                return;
            }

            StartUserLive(context, null, channelId, CHANNELS_NAMES);
        } else {

            List<ChannelContentObj> content = new ArrayList<>();
            content.add(getNoUserContent(context));
            StartUserLive(context, content, channelId, CHANNELS_NAMES);

        }
    }

    private static ChannelContentObj getNoUserContent(Context context) {
        return
                new ChannelContentObj(
                        "Add User",
                        context.getString(R.string.channel_no_user),
                        "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/add_user.png",
                        TvContractCompat.PreviewPrograms.ASPECT_RATIO_1_1,
                        1,
                        new Gson().toJson(new PreviewObj(null, "USER", Constants.CHANNEL_TYPE_USER_LIVE)),
                        false
                );
    }

    private static void StartUserLive(Context context, List<ChannelContentObj> contentObj, long channelId, String[] CHANNELS_NAMES) {
        StartChannel(
                context,
                new ChannelObj(
                        R.mipmap.ic_launcher,
                        CHANNELS_NAMES[Constants.CHANNEL_TYPE_USER_LIVE],
                        Constants.CHANNEL_TYPE_USER_LIVE,
                        contentObj
                ),
                channelId,
                CHANNELS_NAMES
        );
    }

    public static void StartFeatured(Context context) {
        if (!Tools.isConnected(context)) return;

        // List<ChannelContentObj> content = null;

        long channelId = getChannelIdFromTvProvider(
                context,
                Constants.CHANNELS_NAMES[Constants.CHANNEL_TYPE_FEATURED]
        );

        if (channelId != -1L) {
            DeleteChannel(context, channelId);
        }

//      if (channelId != -1L && getChannelIsBrowsable(context, channelId)) {

//            content = GetLiveContent(
//                    "https://api.twitch.tv/kraken/streams/featured?limit=100&offset=0&api_version=5",
//                    "featured",
//                    "stream",
//                    false,
//                    Constants.CHANNEL_TYPE_FEATURED,
//                    DEFAULT_HEADERS,
//                    context
//            );

//        }

//        StartChannel(
//                context,
//                new ChannelObj(
//                        R.mipmap.ic_launcher,
//                        CHANNELS_NAMES[Constants.CHANNEL_TYPE_FEATURED],
//                        Constants.CHANNEL_TYPE_FEATURED,
//                        content
//                ),
//                channelId,
//                CHANNELS_NAMES
//        );
    }

    public static void StartGames(Context context, String UserId, AppPreferences appPreferences, String[] CHANNELS_NAMES) {
        if (!Tools.isConnected(context)) return;

        long channelId = getChannelIdFromTvProvider(
                context,
                Constants.CHANNELS_NAMES[Constants.CHANNEL_TYPE_GAMES]
        );
        List<ChannelContentObj> content = null;

        if (channelId != -1L && getChannelIsBrowsable(context, channelId)) {

            content = GetGamesContent(
                    context,
                    UserId,
                    appPreferences
            );

            if (content != null) {

                int contentSize = content.size();

                if (contentSize > 1) {
                    Collections.sort(
                            content.subList(1, contentSize),
                            compareViewers
                    );
                }

            }
        }

        StartChannel(
                context,
                new ChannelObj(
                        R.mipmap.ic_launcher,
                        CHANNELS_NAMES[Constants.CHANNEL_TYPE_GAMES],
                        Constants.CHANNEL_TYPE_GAMES,
                        content
                ),
                channelId,
                CHANNELS_NAMES
        );
    }

    private static List<ChannelContentObj> GetLiveContent(String url, String object, boolean sort, int screen, Context context, String UserId, AppPreferences appPreferences, Boolean tryAgain) {
        String[][] DEFAULT_HEADERS = {
                {Constants.BASE_HEADERS[0][0], Tools.getString(Constants.PREF_CLIENT_ID, null, appPreferences)},
                {Constants.BASE_HEADERS[1][0], Tools.getString(UserId + Constants.PREF_ACCESS_TOKEN, null, appPreferences)}
        };
        int status;

        try {
            Tools.ResponseObj response;

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

                        JsonObject obj = parseString(response.responseText).getAsJsonObject();

                        if (obj.isJsonObject() && obj.has(object) && !obj.get(object).isJsonNull()) {

                            return ProcessLiveArray(
                                    obj.get(object).getAsJsonArray(),//Get the follows array
                                    sort,
                                    screen,
                                    context
                            );
                        }

                        break;
                    } else if (status == 401 || status == 403) {

                        if (tryAgain && Tools.refreshTokens(UserId, appPreferences)) {

                            return GetLiveContent(url, object, sort, screen, context, UserId, appPreferences, false);

                        } else if (!tryAgain) {
                            break;
                        }

                    }

                }
            }

        } catch (Exception e) {
            Tools.recordException(TAG, "GetLiveContent e ", e);
        }

        return null;

    }

    private static List<ChannelContentObj> ProcessLiveArray(JsonArray Streams, boolean sort, int screen, Context context) {
        List<ChannelContentObj> content = new ArrayList<>();

        int objSize = Streams.size();
        if (objSize < 1) return null;
        else content.add(getRefreshContent(context));

        Set<String> TempArray = new HashSet<>();

        JsonObject obj;

        String preview;
        String channelId;
        String description;
        String game;
        String StreamCreated_at;
        String title;
        String display_name;

        boolean emptyGame;

        int contentSize = 0;
        int viewers;

        DecimalFormat decimalFormat = getDecimalFormat();
        SimpleDateFormat input = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US);
        input.setTimeZone(TimeZone.getTimeZone("UTC"));
        Date date;
        long timeMsNow = new Date().getTime();

        try {

            for (int i = 0; i < objSize; i++) {

                obj = Streams.get(i).getAsJsonObject();//Get the position in the follows array

                if (obj.isJsonObject()) {

                    channelId = obj.get("user_id").getAsString();

                    if (!TempArray.contains(channelId)) {//Prevent add duplicated

                        TempArray.add(channelId);

                        preview = !obj.get("thumbnail_url").isJsonNull() ? obj.get("thumbnail_url").getAsString() : null;
                        game = !obj.get("game_name").isJsonNull() ? obj.get("game_name").getAsString() : "";
                        viewers = !obj.get("viewer_count").isJsonNull() ? obj.get("viewer_count").getAsInt() : 0;
                        StreamCreated_at = !obj.get("started_at").isJsonNull() ? obj.get("started_at").getAsString() : null;
                        title = !obj.get("title").isJsonNull() ? obj.get("title").getAsString() : null;

                        display_name = !obj.get("user_name").isJsonNull() ? obj.get("user_name").getAsString() : null;
                        //When stream comes online for the first time the display name may be and empty string
                        if (display_name != null && display_name.isEmpty()) {
                            display_name = !obj.get("user_login").isJsonNull() ? obj.get("user_login").getAsString() : null;
                        }

                        if (StreamCreated_at != null) {

                            date = input.parse(StreamCreated_at);

                            if (date != null) {

                                StreamCreated_at = getTimeFromMs(timeMsNow - date.getTime());

                            }
                        }

                        emptyGame = Objects.equals(game, "");

                        description = String.format(Locale.US,
                                context.getString(R.string.channel_live_title),
                                context.getString(emptyGame ? R.string.streaming : R.string.playing),
                                game + (emptyGame ? "" : ","),
                                StreamCreated_at != null ? StreamCreated_at : "",
                                decimalFormat.format(viewers),
                                title != null ? title : ""
                        );

                        content.add(
                                new ChannelContentObj(
                                        display_name,
                                        description,
                                        preview != null ? preview.replace("{width}x{height}", "640x360") : Constants.VIDEO_404,
                                        TvContractCompat.PreviewPrograms.ASPECT_RATIO_16_9,
                                        viewers,
                                        new Gson().toJson(new PreviewObj(obj, "LIVE", screen)),
                                        !obj.get("type").isJsonNull() && (obj.get("type").getAsString()).contains("live")
                                )
                        );
                    }

                }
            }

            contentSize = content.size();

            if (sort && contentSize > 1) {
                Collections.sort(
                        content.subList(1, contentSize),
                        compareViewers
                );
            }

        } catch (Exception e) {
            Tools.recordException(TAG, "ProcessLiveArray e ", e);
        }

        return contentSize > 0 ? content : null;
    }

    private static List<ChannelContentObj> GetGamesContent(Context context, String UserId, AppPreferences appPreferences) {

        JsonArray Games = GetLiveGames(UserId, appPreferences, true);//Get the Games array
        List<ChannelContentObj> content = new ArrayList<>();

        int objSize = Games != null ? Games.size() : 0;

        if (objSize > 0) content.add(getRefreshContent(context));
        else return null;

        JsonObject obj;
        String box_art_url;

        try {

            for (int i = 0; i < objSize; i++) {

                obj = Games.get(i).getAsJsonObject();
                if (!obj.get("name").isJsonNull()) {

                    box_art_url = !obj.get("box_art_url").isJsonNull() ? obj.get("box_art_url").getAsString() : null;

                    content.add(
                            new ChannelContentObj(
                                    obj.get("name").getAsString(),
                                    "",
                                    box_art_url != null ? box_art_url.replace("{width}x{height}", "476x665") : Constants.GAME_404,
                                    TvContractCompat.PreviewPrograms.ASPECT_RATIO_2_3,
                                    0,
                                    new Gson().toJson(new PreviewObj(obj, "GAME", Constants.CHANNEL_TYPE_GAMES)),
                                    false
                            )
                    );

                }

            }

            if (content.size() > 0) return content;

        } catch (Exception e) {
            Tools.recordException(TAG, "GetGamesContent e ", e);
        }

        return null;

    }

    private static JsonArray GetLiveGames(String UserId, AppPreferences appPreferences, Boolean tryAgain) {
        JsonArray Result = new JsonArray();
        int status = 0;

        String[][] HEADERS = {
                {Constants.BASE_HEADERS[0][0], Tools.getString(Constants.PREF_CLIENT_ID, null, appPreferences)},
                {Constants.BASE_HEADERS[1][0], Tools.getString(UserId + Constants.PREF_ACCESS_TOKEN, null, appPreferences)}
        };

        try {
            Set<String> TempArray = new HashSet<>();

            Tools.ResponseObj response;
            JsonObject obj;
            JsonArray Games;
            int objSize;

            String gameId;

            for (int i = 0; i < 3; i++) {

                response = Tools.Internal_MethodUrl(
                        "https://api.twitch.tv/helix/games/top?first=100",
                        Constants.DEFAULT_HTTP_TIMEOUT + (Constants.DEFAULT_HTTP_EXTRA_TIMEOUT * i),
                        null,
                        null,
                        0,
                        HEADERS
                );

                if (response != null) {
                    status = response.status;

                    if (status == 200) {

                        obj = parseString(response.responseText).getAsJsonObject();

                        if (obj.isJsonObject() && obj.has("data") && !obj.get("data").isJsonNull()) {

                            Games = obj.get("data").getAsJsonArray();//Get the Games array
                            objSize = Games.size();

                            if (objSize < 1) {
                                return Result;
                            }

                            for (int j = 0; j < objSize; j++) {

                                obj = Games.get(j).getAsJsonObject();

                                if (obj.isJsonObject()) {

                                    gameId = !obj.get("id").isJsonNull() ? obj.get("id").getAsString() : null;

                                    if (gameId != null && !TempArray.contains(gameId)) {//Prevent add duplicated

                                        TempArray.add(gameId);
                                        Result.add(obj);

                                    }

                                }
                            }

                        }
                        break;
                    } else if (status == 401 || status == 403) {

                        if (tryAgain && Tools.refreshTokens(UserId, appPreferences)) {

                            return GetLiveGames(UserId, appPreferences, false);

                        } else if (!tryAgain) {
                            break;
                        }

                    }

                }
            }

        } catch (Exception e) {
            Tools.recordException(TAG, "GetLiveGames e ", e);
        }

        return status == 200 ? Result : null;

    }

}
