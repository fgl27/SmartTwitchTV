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
 import java.util.concurrent.ThreadLocalRandom;

 import static com.google.gson.JsonParser.parseString;

 /**
  * A service that will populate the TV provider with channels that every user should have. Once a
  * channel is created, it trigger another service to add programs.
  */
 public class SyncChannelJobService extends JobService {

     private static final String TAG = "STTV_ChannelJobService";

     public static int ChannelsOffset;
     public static String Channels;

     public Context context;

     public Handler MainJobHandler;
     public Handler UpdateHandler;
     public HandlerThread UpdateThread;

     @Override
     public boolean onStartJob(final JobParameters jobParameters) {
         context = this;

         MainJobHandler = new Handler(Looper.getMainLooper());
         UpdateThread = new HandlerThread("UpdateThread");
         UpdateThread.start();
         UpdateHandler = new Handler(UpdateThread.getLooper());


         AppPreferences appPreferences = new AppPreferences(context);

         UpdateHandler.post(() -> {

             try {
                 String tempUserId = Tools.getString(Constants.PREF_USER_ID, null, appPreferences);

                 //The first channel added will be the default
                 if (tempUserId != null) {
                     SetUserLive(context, tempUserId);
                     StartLive(context);
                     StartFeatured(context);
                 } else {
                     StartLive(context);
                     StartFeatured(context);
                     SetUserLive(context, null);
                 }

             } catch (Exception e) {
                 Log.d(TAG, "updateChannels e " + e.getMessage());
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

     public static void SetUserLive(Context context, String userId) {

         if (userId != null ) {
             Channels = "";
             ChannelsOffset = 0;
             String url;
             boolean hasChannels = true;

             while (hasChannels) {//Get all user fallowed channels
                 url = String.format(
                         Locale.US,
                         "https://api.twitch.tv/kraken/users/%s/follows/channels?limit=100&offset=%d&sortby=created_at&api_version=5",
                         userId,
                         ChannelsOffset
                 );

                 hasChannels = GetChannels(url);
             }
             if (Channels.equals("")) StartUserLive(context, null);

             url = String.format(
                     Locale.US,
                     "https://api.twitch.tv/kraken/streams/?channel=%s&limit=100&offset=0&stream_type=all&api_version=5",
                     Channels
             );

             StartUserLive(context, GetContent(url, "streams", null));
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
                         R.mipmap.ic_launcher, "User Live",
                         Constants.CHANNEL_TYPE_USER_LIVE,
                         contentObj
                 )
         );
     }

     public static void StartLive(Context context) {
         AppPreferences appPreferences = new AppPreferences(context);
         String lang = Tools.getString(Constants.CHANNEL_LANGUAGE, null, appPreferences);

         ChannelsUtils.StartChannel(
                 context,
                 new ChannelsUtils.ChannelObj(
                         R.mipmap.ic_launcher, "Live",
                         Constants.CHANNEL_TYPE_LIVE,
                         GetContent(
                                 "https://api.twitch.tv/kraken/streams?limit=100&offset=0&api_version=5" + (lang != null ? "&language=" + lang : ""),
                                 "streams", null
                         )
                 )
         );
     }

     public static void StartFeatured(Context context) {
         ChannelsUtils.StartChannel(
                 context,
                 new ChannelsUtils.ChannelObj(
                         R.mipmap.ic_launcher, "Featured",
                         Constants.CHANNEL_TYPE_FEATURED,
                         GetContent("https://api.twitch.tv/kraken/streams/featured?limit=100&offset=0&api_version=5", "featured", "stream")
                 )
         );
     }

     private static List<ChannelsUtils.ChannelContentObj> GetContent(String url, String object, String object2)  {
         try {
             Tools.ResponseObj response;
             JsonObject obj;
             JsonObject objChannel;
             JsonObject objPreview;
             JsonArray Streams;
             String description;
             int objSize;
             int radomInt = ThreadLocalRandom.current().nextInt(1, 100000);
             List<ChannelsUtils.ChannelContentObj> content = new ArrayList<>();

             DecimalFormat decimalFormat = new DecimalFormat("#.##");
             decimalFormat.setGroupingUsed(true);
             decimalFormat.setGroupingSize(3);

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
                                     objPreview = obj.get("preview").getAsJsonObject();
                                     description = obj.get("game").getAsString();
                                     if (!Objects.equals(description, "")) description = "Playing " + description + ", for ";

                                     content.add(
                                             new ChannelsUtils.ChannelContentObj(
                                                     objChannel.get("display_name").getAsString(),
                                                     description + decimalFormat.format(obj.get("viewers").getAsInt()) + " viewers\n" + objChannel.get("status").getAsString(),
                                                     objPreview.get("large").getAsString() + "?" + radomInt,
                                                     TvContractCompat.PreviewPrograms.ASPECT_RATIO_16_9,
                                                     new Gson().toJson(new ChannelsUtils.PreviewObj(obj, "LIVE")),
                                                     true
                                             )
                                     );

                                 }
                             }

                         }
                         break;
                     }

                 }
             }

             if (content.size() > 0) return content;

         } catch (Exception ignored) {}//silent Exception

         return null;

     }

     public static boolean GetChannels(String url)  {
         try {
             Tools.ResponseObj response;
             JsonObject obj;
             JsonArray follows;
             StringBuilder values = new StringBuilder();

             for (int i = 0; i < 3; i++) {

                 response = Tools.Internal_MethodUrl(url, 25000  + (2500 * i), null, null, 0, Tools.DEFAULT_HEADERS);

                 if (response != null) {

                     if (response.getStatus() == 200) {
                         obj = parseString(response.getResponseText()).getAsJsonObject();

                         if (obj.isJsonObject() && !obj.get("follows").isJsonNull()) {

                             follows = obj.get("follows").getAsJsonArray();//Get the follows array

                             if (follows.size() > 0)
                                 ChannelsOffset += follows.size();
                             else return false;

                             for (int j = 0; j < follows.size(); j++) {

                                 obj = follows.get(j).getAsJsonObject();//Get the position in the follows array

                                 if (obj.isJsonObject() && !obj.get("channel").isJsonNull()) {

                                     obj = obj.get("channel").getAsJsonObject(); //Get the channel obj in position

                                     if (obj.isJsonObject() && !obj.get("_id").isJsonNull()) {
                                         values.append(obj.get("_id").getAsString()).append(","); //Get the channel id
                                     }
                                 }
                             }

                         }
                         break;
                     }

                 }
             }

             if (values.length() > 0) {
                 Channels += values.toString();
                 return true;
             }
         } catch (Exception ignored) {}//silent Exception
         return false;

     }
 }
