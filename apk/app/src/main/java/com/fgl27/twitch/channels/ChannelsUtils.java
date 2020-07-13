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
import android.util.Log;

import androidx.annotation.DrawableRes;
import androidx.annotation.NonNull;
import androidx.tvprovider.media.tv.Channel;
import androidx.tvprovider.media.tv.ChannelLogoUtils;
import androidx.tvprovider.media.tv.PreviewProgram;
import androidx.tvprovider.media.tv.TvContractCompat;

import com.fgl27.twitch.Constants;
import com.fgl27.twitch.PlayerActivity;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

public final class ChannelsUtils {
    private static final String TAG = "STTV_ChannelsUtils";

    private static final String[] TV_CONTRACT_ARRAY = {
            TvContractCompat.Channels._ID,
            TvContract.Channels.COLUMN_DISPLAY_NAME
    };

    public static final ChannelContentObj NoUserContent =
            new ChannelContentObj(
                    "Add User",
                    "Is necessary to add a user first to load this content",
                    "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/add_user.png",
                    TvContractCompat.PreviewPrograms.ASPECT_RATIO_1_1,
                    new Gson().toJson(new PreviewObj(null, "USER")),
                    false
            );

    private static final ChannelContentObj emptyContent =
            new ChannelContentObj(
                    "Empty list",
                    "Connection failed, unable to load content. Press enter to refresh this (refresh only happens when the app is visible, so click here will open the app)",
                    "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/refresh.png",
                    TvContractCompat.PreviewPrograms.ASPECT_RATIO_1_1,
                    null,
                    false
            );

    @SuppressWarnings({"unused", "FieldCanBeLocal"})
    public static class PreviewObj {
        private final JsonObject obj;
        private final String type;

        public PreviewObj(JsonObject obj, String type) {
            this.obj = obj;
            this.type = type;
        }
    }

    public static class ChannelContentObj {
        private final String title;
        private final String description;
        private final String imgUrl;
        private final int previewSize;
        private final String obj;
        private final boolean isLive;

        public ChannelContentObj(String title, String description, String imgUrl, int previewSize, String obj, boolean isLive) {
            this.title = title;
            this.description = description;
            this.imgUrl = imgUrl;
            this.previewSize = previewSize;
            this.obj = obj;
            this.isLive = isLive;
        }

        public String getObj() {
            return obj;
        }

        public String getImgUrl() {
            return imgUrl;
        }

        public String getDescription() {
            return description;
        }

        public String getTitle() {
            return title;
        }

        public int getPreviewSize() {
            return previewSize;
        }

        public boolean getIsLive() {
            return isLive;
        }
    }

    public static class ChannelObj {
        private final int drawable;
        private final String name;
        private final int type;
        private final List<ChannelContentObj> Content;

        public ChannelObj(int drawable, String name, int type, List<ChannelContentObj> content) {
            this.drawable = drawable;
            this.name = name;
            this.type = type;
            this.Content = content;
        }

        public String getName() {
            return name;
        }

        public int getDrawable() {
            return drawable;
        }

        public List<ChannelContentObj> getContent() {
            return Content;
        }

        public int getType() {
            return type;
        }
    }

    public static void StartChannel(Context context, ChannelObj channel) {
        // Checks if our subscription has been added to the channels before.
        long channelId = getChannelIdFromTvProvider(context, channel.getName());

        if (channelId != -1L) {
            updateChannel(context, channelId, channel);
            createChannelContent(context, channelId, channel);
            return;
        }

        channelId = createChannel(context, channel);

        if (channelId != -1L) createChannelContent(context, channelId, channel);
    }

    private static void updateChannel(Context context, long channelId, ChannelObj channel) {
        writeChannelLogo(context, channelId, channel.getDrawable());

        Channel.Builder builder = createChannelBuilder(channel.getName(), context);

        int rowsUpdated = context.getContentResolver().update(
                TvContractCompat.buildChannelUri(channelId), builder.build().toContentValues(), null, null);

        if (rowsUpdated < 1) {
            Log.w(TAG, "Update channel failed " + channel.getName());
        }
    }

    private static long createChannel(Context context, ChannelObj channel) {
        Channel.Builder builder = createChannelBuilder(channel.getName(), context);

        Uri channelUri = null;

        try {

            channelUri = context.getContentResolver()
                    .insert(
                            TvContractCompat.Channels.CONTENT_URI,
                            builder.build().toContentValues()
                    );

        } catch (Exception e) { // channels not supported
            Log.w(TAG, "createChannel e " + e.getMessage());
        }

        if (channelUri == null || channelUri.equals(Uri.EMPTY)) {
            Log.w(TAG, "Insert channel failed " + channel.getName());
            return -1L;
        }

        long channelId = ContentUris.parseId(channelUri);

        writeChannelLogo(context, channelId, channel.getDrawable());

        return channelId;
    }

    public static void createChannelContent(Context context, long channelId, ChannelObj channel) {
        DeleteProgram(context, channelId);

        int channel_type = channel.getType();
        String randomImg = "?" + ThreadLocalRandom.current().nextInt(1, 1000000);
        List<ChannelContentObj> Content = channel.getContent();

        if (Content != null) {
            int ContentSize = Content.size();
            int weight = ContentSize;

            for (int i = 0; i < ContentSize; i++, --weight) {
                PreviewProgramAdd(context, channelId, Content.get(i), weight, channel_type, randomImg);
            }

        } else {
            PreviewProgramAdd(context, channelId, emptyContent, 0, channel_type, randomImg);
        }

    }

    public static void PreviewProgramAdd(Context context, long channelId, ChannelContentObj ContentObj, int weight, int channel_type, String randomImg) {
        PreviewProgram.Builder builder =
                new PreviewProgram.Builder()
                        .setTitle(ContentObj.getTitle())
                        .setDescription(ContentObj.getDescription())
                        .setPosterArtUri(Uri.parse(ContentObj.getImgUrl() + randomImg))
                        .setPosterArtAspectRatio(ContentObj.getPreviewSize())
                        .setIntent(createAppIntent(context, ContentObj.getObj(), channel_type))
                        .setType(TvContractCompat.PreviewPrograms.TYPE_MOVIE)
                        .setLive(ContentObj.getIsLive())
                        .setWeight(weight)
                        .setChannelId(channelId);

        Uri programUri = null;

        try {
            programUri = context.getContentResolver().insert(
                    TvContractCompat.PreviewPrograms.CONTENT_URI,
                    builder.build().toContentValues()
            );
        } catch (Exception e) {
            Log.w(TAG, "programUri e " + e.getMessage());
        }

        if (programUri == null || programUri.equals(Uri.EMPTY)) {
            Log.w(TAG, "Insert program failed " + ContentObj.getTitle());
        }
    }

    public static Intent createAppIntent(Context context, String channel_obj, int channel_type) {

        Intent intent = new Intent(context, PlayerActivity.class);
        intent.setAction(Constants.CHANNEL_INTENT);
        intent.putExtra(Constants.CHANNEL_TYPE, channel_type);
        intent.putExtra(Constants.CHANNEL_OBJ, channel_obj);

        return intent;
    }

    static private void writeChannelLogo(Context context, long channelId, @DrawableRes int drawableId) {
        if (channelId != -1 && drawableId != -1) {

            ChannelLogoUtils.storeChannelLogo(
                    context,
                    channelId,
                    convertToBitmap(context, drawableId)
            );

        }
    }

    @NonNull
    public static Bitmap convertToBitmap(Context context, int resourceId) {
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

    public static void DeleteProgram(Context context, long channelId) {
        //long channelId = getChannelIdFromTvProvider(context, name);

        if (channelId != -1L) {

            context.getContentResolver().delete(
                    TvContractCompat.buildPreviewProgramsUriForChannel(channelId),
                    null,
                    null
            );

        }
    }

    private static long getChannelIdFromTvProvider(Context context, String channel_name) {
        Cursor cursor =
                context.getContentResolver()
                        .query(
                                TvContractCompat.Channels.CONTENT_URI,
                                TV_CONTRACT_ARRAY,
                                null,
                                null,
                                null);

        if (cursor != null && cursor.moveToFirst()) {
            do {
                Channel channel = Channel.fromCursor(cursor);
                if (channel_name.equals(channel.getDisplayName())) {
                    return channel.getId();
                }
            } while (cursor.moveToNext());

            cursor.close();
        }

        return -1L;
    }

    public static void scheduleSyncingChannel(Context context) {

        JobScheduler scheduler = (JobScheduler) context.getSystemService(Context.JOB_SCHEDULER_SERVICE);

        scheduler.cancel(1);
        scheduler.schedule(
                new JobInfo.Builder(1, new ComponentName(context, SyncChannelJobService.class))
                        .setPeriodic(TimeUnit.MINUTES.toMillis(30))
                        .setRequiredNetworkType(JobInfo.NETWORK_TYPE_ANY)
                        .setRequiresDeviceIdle(false)
                        .setRequiresCharging(false)
                        .build()
        );
    }

    private static Channel.Builder createChannelBuilder(String name, Context context) {

        return new Channel.Builder()
                .setDisplayName(name)
                .setAppLinkIntent(createAppIntent(context, null, 0))
                .setType(TvContractCompat.Channels.TYPE_PREVIEW);

    }

    public static ChannelContentObj getRefreshContent() {
        Calendar rightNow = Calendar.getInstance();

        return new ChannelContentObj(
                "Last refresh " + String.format(Locale.US, "%02d:%02d", rightNow.get(Calendar.HOUR_OF_DAY), rightNow.get(Calendar.MINUTE)),
                "Press enter to refresh this, a manual refresh can only happen when the app is visible, so clicking here will open the app, this channel auto refresh it 30 minutes",
                "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/refresh.png",
                TvContractCompat.PreviewPrograms.ASPECT_RATIO_1_1,
                null,
                false
        );

    }
}
