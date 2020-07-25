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

package com.fgl27.twitch;

import android.Manifest;
import android.app.ActivityManager;
import android.app.UiModeManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.graphics.Point;
import android.media.MediaCodecInfo;
import android.media.MediaCodecList;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.util.Log;
import android.view.Display;
import android.view.Gravity;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;
import androidx.webkit.WebViewCompat;

import com.fgl27.twitch.DataSource.mDefaultHttpDataSourceFactory;
import com.fgl27.twitch.notification.NotificationService;
import com.google.android.exoplayer2.C;
import com.google.android.exoplayer2.DefaultLoadControl;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.Format;
import com.google.android.exoplayer2.MediaItem;
import com.google.android.exoplayer2.extractor.Extractor;
import com.google.android.exoplayer2.extractor.ExtractorsFactory;
import com.google.android.exoplayer2.extractor.mp4.Mp4Extractor;
import com.google.android.exoplayer2.source.BehindLiveWindowException;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.ProgressiveMediaSource;
import com.google.android.exoplayer2.source.TrackGroup;
import com.google.android.exoplayer2.source.TrackGroupArray;
import com.google.android.exoplayer2.source.hls.HlsMediaSource;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.MappingTrackSelector;
import com.google.android.exoplayer2.upstream.DefaultAllocator;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import net.grandcentrix.tray.AppPreferences;

import java.io.ByteArrayOutputStream;
import java.io.Closeable;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Locale;
import java.util.Scanner;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.google.gson.JsonParser.parseString;

public final class Tools {

    private static final String TAG = "STTV_Tools";

    public static final String[][] DEFAULT_HEADERS = {
            {"Client-ID", "5seja5ptej058mxqy7gh5tcudjqtm9"},
            {"Accept", "application/vnd.twitchtv.v5+json"}
    };

    //https://developer.android.com/reference/android/media/MediaCodecInfo.CodecProfileLevel.html
    private static final String[] AvcLevels = {
            "1", "1.1", "1.2", "1.3", "1.b",
            "2", "2.1", "2.2",
            "3", "3.1", "3.2",
            "4", "4.1", "4.2",
            "5", "5.1", "5.2",
            "6", "6.1", "6.2"};

    private static final Integer[] AvcLevelsEx = {
            1, 4, 8, 16, 2,
            32, 64, 128,
            256, 512, 1024,
            2048, 4096, 8192,
            16384, 32768, 65536,
            131072, 262144, 524288};

    public static final Integer[] resolutionsWidth = {
            240,
            480,
            640,
            1280,
            1600,
            1920,
            2560,
            3840
    };

    public static final Integer[] resolutionsHeight = {
            160,
            360,
            480,
            720,
            900,
            1080,
            1440,
            2160
    };

    private static final Pattern TIME_NAME = Pattern.compile("time=([^\\s]+)");

    @SuppressWarnings({"unused", "FieldCanBeLocal"})
    public static class ResponseObj {
        private final int status;
        private final String responseText;
        private final long checkResult;
        private final String url;

        public ResponseObj(int status, String responseText) {
            this.status = status;
            this.responseText = responseText;
            this.checkResult = 0L;
            this.url = null;
        }

        public ResponseObj(int status, String responseText, long checkResult) {
            this.status = status;
            this.responseText = responseText;
            this.checkResult = checkResult;
            this.url = null;
        }

        public ResponseObj(int status, String url, String responseText, long checkResult) {
            this.status = status;
            this.responseText = responseText;
            this.checkResult = checkResult;
            this.url = url;
        }

        public int getStatus() {
            return status;
        }

        public String getResponseText() {
            return responseText;
        }
    }

    //NullPointerException some time from token isJsonNull must prevent but throws anyway
    //UnsupportedEncodingException impossible to happen as encode "UTF-8" is bepassed but throws anyway
    public static String getStreamData(String token_url, String hls_url, long checkResult, int ReTryMax, int Timeout) throws Exception {
        ResponseObj response;
        int i, status;
        JsonObject Token;
        String StreamSig = null;
        String StreamToken = null;

        for (i = 0; i < ReTryMax; i++) {

            response = GetResponseObj(token_url, Timeout + (2500 * i));

            if (response != null) {

                status = response.getStatus();

                if (status == 200) {
                    Token = parseString(response.getResponseText()).getAsJsonObject();

                    if(Token.isJsonObject() && !Token.get("token").isJsonNull() && !Token.get("sig").isJsonNull()) {
                        StreamToken = Token.get("token").getAsString();
                        StreamSig = Token.get("sig").getAsString();
                        break;
                    }

                } else if (status == 403 || status == 404 || status == 410)
                    return ResponseObjToString(status, "token", checkResult);

            }
        }

        if (StreamToken != null && StreamSig != null) {

            String url = String.format(
                    Locale.US,
                    hls_url,
                    URLEncoder.encode(StreamToken, "UTF-8"),
                    StreamSig,
                    ThreadLocalRandom.current().nextInt(1, 100000)
            );

            for (i = 0; i < ReTryMax; i++) {

                response = GetResponseObj(url, Timeout + (2500 * i));

                if (response != null) {

                    status = response.getStatus();

                    //404 = off line
                    //403 = forbidden access
                    //410 = api v3 is gone use v5 bug
                    if (status == 200) {
                        return new Gson().toJson(
                                new ResponseObj(
                                        status,
                                        url,
                                        response.getResponseText(),
                                        checkResult
                                )
                        );
                    } else if (status == 403 || status == 404 || status == 410)
                        return ResponseObjToString(CheckToken(StreamToken) ? 1 : status, "link", checkResult);

                }
            }

        }

        return null;
    }

    private static boolean CheckToken(String token) {
        JsonObject Token = parseString(token).getAsJsonObject();

        if(Token.isJsonObject() && !Token.get("chansub").isJsonNull()) {
            JsonElement restricted_bitrates = Token.get("chansub").getAsJsonObject().get("restricted_bitrates");

            return !restricted_bitrates.isJsonNull() && restricted_bitrates.getAsJsonArray().size() > 0;
        }

        return false;
    }

    public static String ResponseObjToString(int status, String responseText, long checkResult) {
        return new Gson().toJson(
                new ResponseObj(
                        status,
                        responseText,
                        checkResult
                )
        );
    }

    //TODO add a header version of this fun
    public static ResponseObj GetResponseObj(String urlString, int Timeout) {
        HttpURLConnection urlConnection = null;

        try {
            urlConnection = (HttpURLConnection) new URL(urlString).openConnection();
            urlConnection.setConnectTimeout(Timeout);
            urlConnection.setReadTimeout(Timeout);

            urlConnection.connect();

            int status = urlConnection.getResponseCode();

            if (status != -1) {
                if (status == 200) {
                    return new ResponseObj(
                            status,
                            readFullyString(urlConnection.getInputStream())
                    );
                } else return new ResponseObj(status, "");
            } else {
                return null;
            }
        } catch (Exception e) {
            Log.w(TAG, "getStreamData Exception ", e);
            return null;
        } finally {
            if (urlConnection != null)
                urlConnection.disconnect();
        }
    }

    public static String GetPing(Runtime runtime) {
        Process process = null;
        try {

            process = runtime.exec("ping -c 1 api.twitch.tv");

            //TODO find a solution for older api
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                if(!process.waitFor(5, TimeUnit.SECONDS)) {
                    process.destroy();
                    return null;
                }
            }

            Matcher matcher = TIME_NAME.matcher(readFullyString(process.getInputStream()));

            return matcher.find() ? matcher.group(1) : null;
        } catch (Exception e) {
            Log.w(TAG, "GetPing Exception ", e);
        } finally {
            if (process != null) process.destroy();
        }

        return null;
    }

    public static ResponseObj MethodUrlHeaders(String urlString, int timeout, String postMessage,
                                               String Method, long checkResult, String JsonHeadersArray) {

        JsonArray DEFAULT_HEADERS = parseString(JsonHeadersArray).getAsJsonArray();
        JsonArray temp_array;

        String[][] HEADERS = new String[DEFAULT_HEADERS.size()][2];

        for(int i = 0; i< HEADERS.length; i++) {

            temp_array = DEFAULT_HEADERS.get(i).getAsJsonArray();

            HEADERS[i][0] = temp_array.get(0).getAsString();
            HEADERS[i][1] = temp_array.get(1).getAsString();

        }

        return Internal_MethodUrl(urlString, timeout, postMessage, Method, checkResult, HEADERS);
    }

    //For other then get methods
    public static ResponseObj Internal_MethodUrl(String urlString, int timeout, String postMessage, String Method, long checkResult, String[][] HEADERS) {

        HttpURLConnection urlConnection = null;

        try {
            urlConnection = (HttpURLConnection) new URL(urlString).openConnection();

            for (String[] header : HEADERS)
                urlConnection.setRequestProperty(header[0], header[1]);

            urlConnection.setConnectTimeout(timeout);
            urlConnection.setReadTimeout(timeout);

            if (Method != null) {//If Method == null this will use the default get method, same as readUrl
                urlConnection.setRequestMethod(Method);
            }

            if (postMessage != null) {//If postMessage == null we don't send a thing
                urlConnection.setDoOutput(true);

                OutputStream mOutputStream = urlConnection.getOutputStream();
                OutputStreamWriter mOutputStreamWriter = new OutputStreamWriter(mOutputStream, StandardCharsets.UTF_8);

                mOutputStreamWriter.write(postMessage);
                mOutputStreamWriter.flush();

                closeQuietly(mOutputStreamWriter);
                closeQuietly(mOutputStream);
            }

            urlConnection.connect();

            int status = urlConnection.getResponseCode();

            if (status != -1) {
                return new ResponseObj(
                        status,
                        readFullyString(
                                status == HttpURLConnection.HTTP_OK ?
                                        urlConnection.getInputStream() :
                                        urlConnection.getErrorStream()
                        ),
                        checkResult
                );
            } else {
                return null;
            }
        } catch (Exception e) {
            Log.w(TAG, "postUrl Exception ", e);
            return null;
        } finally {
            if (urlConnection != null)
                urlConnection.disconnect();
        }
    }

    private static String readFullyString(InputStream in) throws Exception {//IOException and or NullPointerException
        try {
            ByteArrayOutputStream bytes = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int count;
            while ((count = in.read(buffer)) != -1) {
                bytes.write(buffer, 0, count);
            }
            return bytes.toString("UTF-8");
        } finally {
            closeQuietly(in);
        }
    }

    private static void closeQuietly(@Nullable Closeable closeable) {
        try {
            if (closeable != null) {
                closeable.close();
            }
        } catch (IOException ignored) {}
    }

    @SuppressWarnings({"unused", "FieldCanBeLocal"})
    private static class CodecList {
        private final String type;
        private final String name;
        private final String maxresolution;
        private final String maxbitrate;
        private final String maxlevel;
        private final int instances;
        private final String resolutions;

        public CodecList(String type, String name, String maxresolution, String maxbitrate, String maxlevel, int instances, String resolutions) {
            this.type = type;
            this.name = name;
            this.maxresolution = maxresolution;
            this.maxbitrate = maxbitrate;
            this.maxlevel = maxlevel;
            this.instances = instances;
            this.resolutions = resolutions;
        }
    }

    //Returns a stringify json obj contain
    //[{"instances": 32, "maxbitrate": "120 Mbps", "maxlevel": "5.2", "maxresolution": "3840x2176", "name": "OMX.Nvidia.h264.decode", "resolutions": "160p : 960 fps | 360p : 960 fps | 480p : 960 fps | 720p : 555 fps | 1080p : 245 fps | 1440p : 138 fps | 2160p : 61 fps", "type": "video/avc"}, {"instances": 32, "maxbitrate": "48 Mbps", "maxlevel": "5.2", "maxresolution": "4080x4080", "name": "OMX.google.h264.decoder", "resolutions": "160p : 960 fps | 360p : 960 fps | 480p : 960 fps | 720p : 546 fps | 1080p : 240 fps | 1440p : 136 fps | 2160p : 60 fps", "type": "video/avc"}]
    public static String codecCapabilities(String CodecType) {
        int lowerWidth;
        int UperWidth;
        int instances;

        String maxlevel;
        String resolutions;

        ArrayList<CodecList> result = new ArrayList<>();

        for (MediaCodecInfo codec : new MediaCodecList(MediaCodecList.REGULAR_CODECS).getCodecInfos()) {
            if (!codec.isEncoder()) {
                for (String type : codec.getSupportedTypes()) {
                    if (type.contains(CodecType)) {
                        MediaCodecInfo.CodecCapabilities codecCapabilities = codec.getCapabilitiesForType(type);
                        MediaCodecInfo.VideoCapabilities videoCapabilities = codecCapabilities.getVideoCapabilities();

                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) instances = codecCapabilities.getMaxSupportedInstances();
                        else instances = -1;

                        MediaCodecInfo.CodecProfileLevel[] profile = codecCapabilities.profileLevels;

                        if (CodecType.contains("avc")) { //check avc arrays others codecs current not used

                            int position = Arrays.asList(AvcLevelsEx).indexOf(profile[profile.length - 1].level);
                            maxlevel = (position > 0) ? AvcLevels[position] : "Unknown level " + profile[profile.length - 1].level;

                        } else {
                            maxlevel = String.format(
                                    Locale.US,
                                    "%d",
                                    profile[profile.length - 1].level
                            );
                        }

                        lowerWidth = videoCapabilities.getSupportedWidths().getLower();
                        UperWidth = videoCapabilities.getSupportedWidths().getUpper();

                        StringBuilder values = new StringBuilder();
                        for (int i = 0; i < resolutionsWidth.length; i++) {
                            resolutions = codecframeRate(videoCapabilities, resolutionsWidth[i], resolutionsHeight[i], lowerWidth, UperWidth);
                            if (resolutions != null) values.append(resolutions);
                        }

                        if (values.length() > 0) {
                            resolutions = values.toString();
                            resolutions = resolutions.substring(0, resolutions.length() - 3);
                        } else resolutions = "";

                        result.add(
                                new CodecList(
                                        type, //type
                                        codec.getName(), //name
                                        String.format(
                                                Locale.US,
                                                "%dx%d",
                                                videoCapabilities.getSupportedWidths().getUpper(),
                                                videoCapabilities.getSupportedHeights().getUpper()
                                        ), //maxresolution
                                        String.format(
                                                Locale.US,
                                                "%d Mbps",
                                                videoCapabilities.getBitrateRange().getUpper() / 1000000
                                        ), //maxbitrate
                                        maxlevel, //maxlevel
                                        instances, //instances
                                        resolutions //resolutions
                                )
                        );

                    }
                }
            }

        }
        return new Gson().toJson(result);
    }

    public static String codecframeRate(MediaCodecInfo.VideoCapabilities videoCapabilities, int width, int height, int lowerWidth, int UperWidth) {
        try {
            //Check if is bigger then smallest and smaller then the biggest
            return (width >= lowerWidth && width <= UperWidth) ?
                    String.format(
                            Locale.US,
                            "%dp : %d fps | ",
                            height,
                            Math.round(videoCapabilities.getSupportedFrameRatesFor(width, height).getUpper())
                    )
                    : null;
        } catch (Exception e) {
            Log.w(TAG, "codecframeRate Exception width " + width + " height " + height, e);
            return null;
        }
    }

    public static DefaultLoadControl getLoadControl(int buffer, int DeviceRam) {
        return new DefaultLoadControl.Builder()
                .setAllocator(new DefaultAllocator(true, C.DEFAULT_BUFFER_SEGMENT_SIZE))
                .setBufferDurationsMs(
                        60000, //DEFAULT_MIN_BUFFER_MS
                        36000000, //DEFAULT_MAX_BUFFER_MS... technically infinity setTargetBufferBytes controls it
                        buffer, //DEFAULT_BUFFER_FOR_PLAYBACK_MS
                        buffer + 1000 //DEFAULT_BUFFER_FOR_PLAYBACK_AFTER_REBUFFER_MS
                )
                .setTargetBufferBytes(DeviceRam)
                .build();
    }

    public static boolean isBehindLiveWindow(ExoPlaybackException e) {
        if (e.type != ExoPlaybackException.TYPE_SOURCE) {
            return false;
        }
        Throwable cause = e.getSourceException();
        while (cause != null) {
            if (cause instanceof BehindLiveWindowException) {
                return true;
            }
            cause = cause.getCause();
        }
        return false;
    }

    public static MediaSource buildMediaSource(Uri uri, Context context, int who_called, boolean LowLatency, String masterPlaylist, String userAgent) {
        if (who_called == 1) {
            return new HlsMediaSource.Factory(getDefaultDataSourceFactory(context, masterPlaylist, uri, userAgent))
                    .setAllowChunklessPreparation(true)
                    .setLowLatency(LowLatency)
                    .createMediaSource(MediaItemBuilder(uri));
        } else if (who_called == 2) {
            return new HlsMediaSource.Factory(getDefaultDataSourceFactory(context, masterPlaylist, uri, userAgent))
                    .setAllowChunklessPreparation(true)
                    .createMediaSource(MediaItemBuilder(uri));
        } else
            return new ProgressiveMediaSource
                    .Factory(new DefaultDataSourceFactory(context, userAgent), new Mp4ExtractorsFactory())
                    .createMediaSource(MediaItemBuilder(uri));
    }

    private static DefaultDataSourceFactory getDefaultDataSourceFactory(Context context, String masterPlaylist, Uri uri, String userAgent) {
        if (masterPlaylist == null) masterPlaylist = "";//technically should not happen but check to prevent exception when converting to byte[]

        return new DefaultDataSourceFactory(
                context,
                new mDefaultHttpDataSourceFactory(
                        userAgent,
                        null,
                        4000,
                        4000,
                        false,
                        masterPlaylist.getBytes(),
                        uri
                )
        );
    }

    public static boolean deviceIsTV(@NonNull Context context) {
        UiModeManager uiModeManager = (UiModeManager) context.getSystemService(Context.UI_MODE_SERVICE);
        return (uiModeManager != null ? uiModeManager.getCurrentModeType() : 0) == Configuration.UI_MODE_TYPE_TELEVISION;
    }

    //Deprecated in API level 29 but gives the path that I need and works on API 29
    //as long one adds android:requestLegacyExternalStorage="true"to manifest
    @SuppressWarnings({"deprecation", "RedundantSuppression"})
    public static File getExternalSD() {
        return Environment.getExternalStorageDirectory();
    }

    public static void BackupJson(String app_name, String file, String file_content) {
        File Dir = new File(
                getExternalSD(),
                String.format(Locale.US, "data/%s/Backup", app_name)
        );

        boolean isDirCreated = Dir.exists();
        if (!isDirCreated) {
            isDirCreated = Dir.mkdirs();
        }

        if (isDirCreated) {
            try {
                FileWriter mWriter = new FileWriter(Dir.getAbsolutePath() + "/" + file, false);
                mWriter.write(file_content);
                closeQuietly(mWriter);
            } catch (IOException e) {
                Log.w(TAG, "BackupJson IOException ", e);
            }
        }
    }

    public static boolean HasBackupFile(String file, Context context) {

        File mFile = new File(
                getExternalSD(),
                String.format(Locale.US, "data/%s/Backup/" + file, context.getPackageName())
        );

        return mFile.exists();
    }

    public static String RestoreBackupFile(String file, Context context) {
        try {
            File mFile = new File(
                    getExternalSD(),
                    String.format(Locale.US, "data/%s/Backup/" + file, context.getPackageName())
            );

            StringBuilder data = new StringBuilder();
            Scanner mReader = new Scanner(mFile);

            while (mReader.hasNextLine()) {
                data.append(mReader.nextLine());
            }

            closeQuietly(mReader);

            return data.toString();
        } catch (FileNotFoundException e) {
            Log.w(TAG, "RestoreBakupFile FileNotFoundException ", e);
        }
        return null;
    }

    public static boolean WR_storage(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return context.checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) ==
                    PackageManager.PERMISSION_GRANTED;
        } else return true;
    }

    //https://exoplayer.dev/shrinking.html
    private static class Mp4ExtractorsFactory implements ExtractorsFactory {
        @Override
        @NonNull
        public Extractor[] createExtractors() {
            return new Extractor[]{new Mp4Extractor()};
        }
    }

    private static MediaItem MediaItemBuilder(Uri uri) {
        return new MediaItem.Builder().setUri(uri).build();
    }

    public static int DeviceRam(Context context) {
        ActivityManager actManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        ActivityManager.MemoryInfo memInfo = new ActivityManager.MemoryInfo();
        if (actManager != null) {
            actManager.getMemoryInfo(memInfo);
        } else return 500000000;

        return (int) (memInfo.totalMem / 18);
    }

    public static String getWebviewVersion(Context context) {
        PackageInfo pInfo = WebViewCompat.getCurrentWebViewPackage(context);

        return pInfo != null ? pInfo.versionName: null;
    }

    public static Point ScreenSize(Display display) {
        Point size = new Point();
        display.getSize(size);

        return size;
    }

    public static String getQualities(DefaultTrackSelector trackSelector) {
        if (trackSelector != null) {
            MappingTrackSelector.MappedTrackInfo mappedTrackInfo = trackSelector.getCurrentMappedTrackInfo();

            if (mappedTrackInfo != null) {

                for (int rendererIndex = 0; rendererIndex < mappedTrackInfo.getRendererCount(); rendererIndex++) {

                    if (mappedTrackInfo.getRendererType(rendererIndex) == C.TRACK_TYPE_VIDEO) {

                        TrackGroupArray trackGroupArray = mappedTrackInfo.getTrackGroups(rendererIndex);
                        if (trackGroupArray.length > 0) {

//                            if (BuildConfig.DEBUG) {
//                                Log.i(TAG, "trackGroupArray:");
//                                LongLog(TAG, new Gson().toJson(trackGroupArray));
//                            }

                            ArrayList<QualitiesObj> result = new ArrayList<>();
                            Format format;
                            TrackGroup groupIndex = trackGroupArray.get(0);

                            result.add(new QualitiesObj("Auto", 0, "avc"));

                            for (int trackIndex = 0; trackIndex < groupIndex.length; trackIndex++) {
                                format = groupIndex.getFormat(trackIndex);
                                result.add(
                                        new QualitiesObj(
                                                String.format(Locale.US,"%dp%d", format.height, extractFPS(format.frameRate)),
                                                format.bitrate,
                                                format.codecs
                                        )
                                );

                            }
                            return new Gson().toJson(result);
                        }

                    }

                }

            }
        }

        return null;
    }

    @SuppressWarnings({"unused", "FieldCanBeLocal"})
    private static class QualitiesObj {
        private final String id;
        private final String band;
        private final String codec;

        public QualitiesObj(String id, int band, String codec) {
            this.id = id;
            this.band = extractBand(band);
            this.codec = extractCodec(codec);
        }
    }

    private static String extractBand(int band) {
        return band > 0 ? String.format(Locale.US, " | %.02fMbps", ((float) band / 1000000)) : "";
    }

    public static String GetVideoQuality(Format format) {
        if (format == null) {
            return null;
        }

        return String.format(
                Locale.US,
                "%dp%s | Auto%s%s",
                format.height,
                (format.frameRate == Format.NO_VALUE ? "" : String.valueOf(extractFPS(format.frameRate))),
                extractBand(format.bitrate),
                extractCodec(format.codecs)

        );
    }

    private static String extractCodec(String codec) {

        if (codec == null) return "";
        else if (codec.contains("avc")) return " | avc";
        else if (codec.contains("vp9")) return " | vp9";
        else if (codec.contains("mp4a")) return " | mp4";

        return "";
    }

    private static int extractFPS(float fps) {
        if (fps > 58 && fps < 62) return 60;
        else if (fps < 32 && fps > 28) return 30;

        return (int) Math.ceil(fps);
    }

    public static String GetCounters(float FullValue, float FullValueAVG, long Counter, String end) {
        FullValueAVG = (Counter > 0 ? (FullValueAVG / Counter) : 0);

        return String.format(
                Locale.US,
                "%s%.02f (%s%.02f Avg) %s",
                (FullValue < 10 ? "&nbsp;&nbsp;" : ""),//Keeps the indentation when the values go bellow 10
                FullValue,
                (FullValueAVG < 10 ? "&nbsp;&nbsp;" : ""),//Keeps the indentation when the values go bellow 10
                FullValueAVG,
                end
        );
    }

    public static String getTime(float time) {
        time = time > 0 ? time / 1000 : 0;

        return String.format(
                Locale.US,
                "%s%.02f s",
                (time < 10 ? "&nbsp;&nbsp;" : ""),//Keeps the indentation when the values go bellow 10
                time
        );
    }

    public static boolean getBoolean(String name, boolean defaults, AppPreferences appPreferences) {
        return appPreferences.getBoolean(name, defaults);
    }

    public static String getString(String name, String defaults, AppPreferences appPreferences) {
        return appPreferences.getString(name, defaults);
    }

    public static long getLong(String name, long defaults, AppPreferences appPreferences) {
        return appPreferences.getLong(name, defaults);
    }

    public static int getInt(String name, int defaults, AppPreferences appPreferences) {
        return appPreferences.getInt(name, defaults);
    }

    public static void SendNotificationIntent(String action, Context context) {
        try {
            Intent intent = new Intent(context, NotificationService.class);
            intent.setAction(action);
            ContextCompat.startForegroundService(context, intent);
        } catch (Exception ignored) {}//silent Exception caused on android 8.1 and up when notification fail to
    }

    public static boolean isConnected(Context context) {
        ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        if (cm == null) return true;
        NetworkInfo activeNetwork = cm.getActiveNetworkInfo();

        return activeNetwork != null && activeNetwork.isConnected();
    }

    public static void hideKeyboardFrom(Context context, View view) {
        InputMethodManager imm = (InputMethodManager) context.getSystemService(Context.INPUT_METHOD_SERVICE);
        if (imm != null) {
            imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
        }
    }

    public static void showKeyboardFrom(Context context, View view) {
        InputMethodManager imm = (InputMethodManager) context.getSystemService(Context.INPUT_METHOD_SERVICE);
        if (imm != null) {
            imm.showSoftInputFromInputMethod(view.getWindowToken(), 0);
        }
    }

    public static void LongLog(String TAG, String veryLongString) {
        int maxLogSize = 1000;
        int len = veryLongString.length();

        for(int i = 0; i <= len / maxLogSize; i++) {
            Log.i(
                    TAG,
                    veryLongString.substring(
                            (i * maxLogSize),
                            Math.min((i + 1) * maxLogSize, len)
                    )
            );
        }

    }

    public static FrameLayout.LayoutParams BasePreviewLayout(float bottom, float right, float left, int web_height, Point ScreenSize, boolean bigger) {
        float scale = (float) ScreenSize.y / web_height;//WebView screen size is not the same size as device screen

        float width = (int)((right - left) * scale);
        float offset = width / 135; //Minor offset to make it feet inside the box without overflowing
        width -= offset;

        float bottomMargin = bottom * scale;
        float leftMargin = (left * scale) + (offset / 1.8f);

        if (bigger) {
            bottomMargin =  (ScreenSize.y - bottomMargin) - (offset / 2.2f);
            float OldWidth = width;

            width = width * 1.26f;
            leftMargin = leftMargin - ((width - OldWidth) / 2);//center on the thumbnail

            //Log.i(TAG, "leftMargin before " + leftMargin + " (leftMargin + width) " + (leftMargin + width));

            if (leftMargin < 0) leftMargin = 0;
            else if ((leftMargin + width) > ScreenSize.x) leftMargin = ScreenSize.x - width;

            //Log.i(TAG, "leftMargin after " + leftMargin);
        } else bottomMargin =  (ScreenSize.y - bottomMargin) + (offset / 1.8f);

        float height = width * 9 / 16;//16 by 9 box
        FrameLayout.LayoutParams PlayerViewSidePanel = new FrameLayout.LayoutParams((int) width, (int) height, Gravity.LEFT | Gravity.BOTTOM);

        //Center on top of the box in relation to the offset
        PlayerViewSidePanel.bottomMargin = (int) bottomMargin;
        PlayerViewSidePanel.leftMargin = (int) leftMargin;

        //Log.i(TAG, "height " + height + " bottomMargin " + bottomMargin + " bottomMargin + height " + (height + bottomMargin) + " ScreenSize.y " + ScreenSize.y);

        return PlayerViewSidePanel;
    }

    public static void deleteCache(Context context) {
        try {
            File dir = context.getCacheDir();
            deleteDir(dir);
        } catch (Exception e) {
            Log.w(TAG, "deleteCache e ", e);
        }
    }

    public static boolean deleteDir(File dir) {
        if (dir != null && dir.isDirectory()) {
            String[] children = dir.list();
            if (children != null) {
                for (String child : children) {
                    boolean success = deleteDir(new File(dir, child));
                    if (!success) {
                        return false;
                    }
                }
            }
            return dir.delete();
        } else if(dir!= null && dir.isFile()) {
            return dir.delete();
        } else {
            return false;
        }
    }

    public static void checkTokens(String UserId, AppPreferences appPreferences) {
        String token = getString(UserId + Constants.PREF_USER_TOKEN, null, appPreferences);

        try {
            String urlString = "https://id.twitch.tv/oauth2/validate";

            String[][] HEADERS = {
                    {"Authorization", "OAuth " + token}
            };

            JsonObject obj;
            int status;
            ResponseObj response;

            for (int i = 0; i < 3; i++) {

                response =
                        Internal_MethodUrl(
                                urlString,
                                Constants.DEFAULT_HTTP_TIMEOUT + (Constants.DEFAULT_HTTP_EXTRA_TIMEOUT * i),
                                null,
                                null,
                                0,
                                HEADERS
                        );

                if (response != null) {

                    status = response.getStatus();

                    if (status == 200) {
                        obj = parseString(response.getResponseText()).getAsJsonObject();

                        if (obj.get("expires_in").isJsonNull()) {

                            appPreferences.put(
                                    UserId + Constants.PREF_USER_TOKEN_EXPIRES_WHEN,
                                    (System.currentTimeMillis() + ((obj.get("expires_in").getAsLong() - 100) * 1000))
                            );

                        }
                        break;
                    } else if (status == 401 || status == 403) {

                        refreshTokens(
                                UserId,
                                appPreferences
                        );
                        break;
                    }

                }

            }
        } catch (Exception e) {
            Log.w(TAG, "updateChannels e ", e);
        }
    }

    public static boolean refreshTokens(String UserId, AppPreferences appPreferences) {
        String refresh_token = getString(UserId + Constants.PREF_USER_REFRESH_TOKEN, null, appPreferences);

        if (refresh_token == null) {
            eraseTokens(UserId, appPreferences);
            return false;
        }

        try {
            String urlString = String.format(
                    Locale.US,
                    "https://id.twitch.tv/oauth2/token?grant_type=refresh_token&client_id=5seja5ptej058mxqy7gh5tcudjqtm9&client_secret=elsu5d09k0xomu7cggx3qg5ybdwu7g&refresh_token=%s&redirect_uri=https://fgl27.github.io/SmartTwitchTV/release/index.min.html",
                    refresh_token
            );

            JsonObject obj;
            String ResponseText;
            ResponseObj response;

            for (int i = 0; i < 3; i++) {

                response =
                        Internal_MethodUrl(
                                urlString,
                                Constants.DEFAULT_HTTP_TIMEOUT + (Constants.DEFAULT_HTTP_EXTRA_TIMEOUT * i),
                                null,
                                "POST",
                                0,
                                new String[0][2]
                        );

                if (response != null) {

                    ResponseText = response.getResponseText();

                    if (response.getStatus() == 200) {
                        obj = parseString(ResponseText).getAsJsonObject();

                        appPreferences.put(
                                UserId + Constants.PREF_USER_REFRESH_TOKEN,
                                !obj.get("refresh_token").isJsonNull() ? obj.get("refresh_token").getAsString() : null
                        );

                        appPreferences.put(
                                UserId + Constants.PREF_USER_TOKEN,
                                !obj.get("access_token").isJsonNull() ? obj.get("access_token").getAsString() : null
                        );

                        appPreferences.put(
                                UserId + Constants.PREF_USER_TOKEN_EXPIRES_WHEN,
                                !obj.get("expires_in").isJsonNull() ? (System.currentTimeMillis() + ((obj.get("expires_in").getAsLong() - 100) * 1000)) : 0
                        );

                        return true;
                    } else if (ResponseText.contains("Invalid refresh token")){

                        eraseTokens(UserId, appPreferences);

                        return false;
                    }

                }

            }
        } catch (Exception e) {
            Log.w(TAG, "updateChannels e ", e);
        }

        return false;
    }

    public static void eraseTokens(String UserId, AppPreferences appPreferences) {
        appPreferences.put(UserId + Constants.PREF_USER_REFRESH_TOKEN, null);
        appPreferences.put(UserId + Constants.PREF_USER_TOKEN, null);
        appPreferences.put(UserId + Constants.PREF_USER_TOKEN_EXPIRES_WHEN, 0);
    }
}
