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

import static androidx.media3.extractor.mp4.Mp4Extractor.FLAG_EMIT_RAW_SUBTITLE_DATA;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.ActivityManager;
import android.app.UiModeManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.graphics.Point;
import android.media.MediaCodecInfo;
import android.media.MediaCodecList;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.LocaleList;
import android.util.Base64;
import android.util.Log;
import android.view.Display;
import android.view.Gravity;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.FrameLayout;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;
import androidx.media3.common.C;
import androidx.media3.common.Format;
import androidx.media3.common.MediaItem;
import androidx.media3.common.TrackGroup;
import androidx.media3.datasource.DefaultDataSource;
import androidx.media3.exoplayer.DefaultLoadControl;
import androidx.media3.exoplayer.hls.HlsMediaSource;
import androidx.media3.exoplayer.source.MediaSource;
import androidx.media3.exoplayer.source.ProgressiveMediaSource;
import androidx.media3.exoplayer.source.TrackGroupArray;
import androidx.media3.exoplayer.trackselection.DefaultTrackSelector;
import androidx.media3.exoplayer.trackselection.MappingTrackSelector;
import androidx.media3.exoplayer.upstream.DefaultAllocator;
import androidx.media3.extractor.Extractor;
import androidx.media3.extractor.ExtractorsFactory;
import androidx.media3.extractor.mp4.Mp4Extractor;
import androidx.media3.extractor.text.SubtitleParser;
import androidx.webkit.WebViewCompat;
import com.fgl27.twitch.DataSource.DefaultHttpDataSource;
import com.fgl27.twitch.notification.NotificationService;
import com.google.firebase.crashlytics.FirebaseCrashlytics;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.ByteArrayOutputStream;
import java.io.Closeable;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;
import java.util.StringTokenizer;
import net.grandcentrix.tray.AppPreferences;

@SuppressLint("UnsafeOptInUsageError")
//Media3 issue TODO review and remove this when the problem is resolved
public final class Tools {

    private static final String TAG = "STTV_Tools";

    private static final Type ArrayType = new TypeToken<String[][]>() {}.getType();

    private static final Type setType = new TypeToken<Set<String>>() {}.getType();

    //https://developer.android.com/reference/android/media/MediaCodecInfo.CodecProfileLevel.html
    private static final Map<Integer, String> AvcLevelsMap = new HashMap<Integer, String>() {
        {
            put(1, "1");
            put(4, "1.1");
            put(8, "1.2");
            put(16, "1.3");
            put(2, "1.b");

            put(32, "2");
            put(64, "2.1");
            put(128, "2.2");

            put(256, "3");
            put(512, "3.1");
            put(1024, "3.2");

            put(2048, "4");
            put(4096, "4.1");
            put(8192, "4.2");

            put(16384, "5");
            put(32768, "5.1");
            put(65536, "5.2");

            put(131072, "6");
            put(262144, "6.1");
            put(524288, "6.2");
        }
    };

    private static final Map<Integer, String> Av1LevelsMap = new HashMap<Integer, String>() {
        {
            put(1, "2");
            put(2, "2.1");
            put(4, "2.2");
            put(8, "2.2");

            put(16, "3");
            put(32, "3.1");
            put(64, "3.2");
            put(128, "3.3");

            put(256, "4");
            put(512, "4.1");
            put(1024, "4.2");
            put(2048, "4.3");

            put(4096, "5");
            put(8192, "5.1");
            put(16384, "5.2");
            put(32768, "5.3");

            put(65536, "6");
            put(131072, "6.1");
            put(262144, "6.2");
            put(524288, "6.3");

            put(1048576, "7");
            put(2097152, "7.1");
            put(4194304, "7.2");
            put(8388608, "7.3");
        }
    };

    private static final Map<Integer, String> HEVCLevelsMap = new HashMap<Integer, String>() {
        {
            put(1, "Main 1");
            put(2, "High 1");
            put(4, "Main 2");
            put(8, "High 2");

            put(16, "Main 1 2.1");
            put(32, "High 2.1");
            put(64, "Main 3");
            put(128, "High 3");

            put(256, "Main 3.1");
            put(512, "High 3.1");
            put(1024, "Main 4");
            put(2048, "High 4");

            put(4096, "Main 4.1");
            put(8192, "High 4.1");
            put(16384, "Main 5");
            put(32768, "High 5");

            put(65536, "Main 5.1");
            put(131072, "High 5.1");
            put(262144, "Main 5.2");
            put(524288, "High 5.2");

            put(1048576, "Main 6");
            put(2097152, "High 6");
            put(4194304, "Main 6.1");
            put(8388608, "High 6.1");

            put(16777216, "Main 6.2");
            put(33554432, "High 6.2");
        }
    };

    private static final Integer[] resolutionsWidth = { 240, 480, 640, 1280, 1600, 1920, 2560, 3840, 7680, 8192 };

    private static final String[] resolutionsHeight = { "160p", "360p", "480p", "720p", "900p", "1080p", "1440p", "4k", "8k", "8k" };

    private static final Integer[] resolutionsHeightInt = { 160, 360, 480, 720, 900, 1080, 1440, 2160, 4320, 4608 };

    static String ResponseObjToString(long checkResult) {
        return new Gson().toJson(new ResponseObj(0, "", checkResult));
    }

    static ResponseObj MethodUrlHeaders(String urlString, int timeout, String postMessage, String Method, long checkResult, String JsonHeadersArray) {
        try {
            return Internal_MethodUrl(
                urlString,
                timeout,
                postMessage,
                Method,
                checkResult,
                JsonHeadersArray == null ? new String[0][0] : new Gson().fromJson(JsonHeadersArray, ArrayType)
            );
        } catch (Throwable e) {
            recordException(TAG, "MethodUrlHeaders ", e);
            return null;
        }
    }

    //For other then get methods
    public static ResponseObj Internal_MethodUrl(
        String urlString,
        int timeout,
        String postMessage,
        String Method,
        long checkResult,
        String[][] HEADERS
    ) {
        HttpURLConnection urlConnection = null;

        try {
            urlConnection = (HttpURLConnection) new URL(urlString).openConnection();

            for (String[] header : HEADERS) urlConnection.setRequestProperty(header[0], header[1]);

            urlConnection.setConnectTimeout(timeout);
            urlConnection.setReadTimeout(timeout);

            if (Method != null) { //If Method == null this will use the default get method, same as readUrl
                urlConnection.setRequestMethod(Method);
            }

            if (postMessage != null) { //If postMessage == null we don't send a thing
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
                        status >= HttpURLConnection.HTTP_OK && status < HttpURLConnection.HTTP_MULT_CHOICE && urlConnection.getInputStream() != null
                            ? urlConnection.getInputStream()
                            : urlConnection.getErrorStream()
                    ),
                    checkResult
                );
            } else {
                return null;
            }
        } catch (Throwable ignore) {
            //recordException(TAG, "Internal_MethodUrl ", e);
            return null;
        } finally {
            if (urlConnection != null) urlConnection.disconnect();
        }
    }

    static String readFullyString(InputStream in) throws Throwable { //OutOfMemoryError, IOException or NullPointerException
        if (in == null) return "";

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

    static void closeQuietly(@Nullable Closeable closeable) {
        if (closeable != null) {
            try {
                closeable.close();
            } catch (Exception ignored) {}
        }
    }

    //Returns a stringify json obj contain
    //[{"instances": 32, "maxbitrate": "120 Mbps", "maxlevel": "5.2", "maxresolution": "3840x2176", "name": "OMX.Nvidia.h264.decode", "resolutions": "160p : 960 fps | 360p : 960 fps | 480p : 960 fps | 720p : 555 fps | 1080p : 245 fps | 1440p : 138 fps | 2160p : 61 fps", "type": "video/avc"}, {"instances": 32, "maxbitrate": "48 Mbps", "maxlevel": "5.2", "maxresolution": "4080x4080", "name": "OMX.google.h264.decoder", "resolutions": "160p : 960 fps | 360p : 960 fps | 480p : 960 fps | 720p : 546 fps | 1080p : 240 fps | 1440p : 136 fps | 2160p : 60 fps", "type": "video/avc"}]
    static String codecCapabilities(String CodecType) {
        int lowerWidth;
        int UperWidth;
        int instances;

        int position;

        String maxlevel;
        String resolutions;
        boolean supportsIsHw = Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q;

        ArrayList<CodecList> result = new ArrayList<>();

        for (MediaCodecInfo codec : new MediaCodecList(MediaCodecList.REGULAR_CODECS).getCodecInfos()) {
            if (codec != null && !codec.isEncoder()) {
                for (String type : codec.getSupportedTypes()) {
                    if (type.contains(CodecType)) {
                        MediaCodecInfo.CodecCapabilities codecCapabilities = codec.getCapabilitiesForType(type);
                        MediaCodecInfo.VideoCapabilities videoCapabilities = codecCapabilities.getVideoCapabilities();

                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                            instances = codecCapabilities.getMaxSupportedInstances();
                        } else {
                            instances = -1;
                        }

                        MediaCodecInfo.CodecProfileLevel[] profile = codecCapabilities.profileLevels;
                        position = profile[profile.length - 1].level;

                        if (CodecType.contains("avc")) {
                            maxlevel = AvcLevelsMap.containsKey(position)
                                ? AvcLevelsMap.get(position)
                                : "Unknown level " + profile[profile.length - 1].level;
                        } else if (CodecType.contains("av01")) {
                            maxlevel = Av1LevelsMap.containsKey(position)
                                ? Av1LevelsMap.get(position)
                                : "Unknown level " + profile[profile.length - 1].level;
                        } else if (CodecType.contains("hevc")) {
                            maxlevel = HEVCLevelsMap.containsKey(position)
                                ? HEVCLevelsMap.get(position)
                                : "Unknown level " + profile[profile.length - 1].level;
                        } else {
                            maxlevel = String.format(Locale.US, "%d", profile[profile.length - 1].level);
                        }

                        lowerWidth = videoCapabilities.getSupportedWidths().getLower();
                        UperWidth = videoCapabilities.getSupportedWidths().getUpper();

                        StringBuilder values = new StringBuilder();
                        for (int i = 0; i < resolutionsWidth.length; i++) {
                            resolutions = codecframeRate(
                                videoCapabilities,
                                resolutionsWidth[i],
                                resolutionsHeight[i],
                                resolutionsHeightInt[i],
                                lowerWidth,
                                UperWidth
                            );
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
                                codec.getName() + type, //nameType
                                supportsIsHw ? codec.getCanonicalName() : null, //name
                                String.format(
                                    Locale.US,
                                    "%dx%d",
                                    videoCapabilities.getSupportedWidths().getUpper(),
                                    videoCapabilities.getSupportedHeights().getUpper()
                                ), //maxresolution
                                String.format(Locale.US, "%d Mbps", videoCapabilities.getBitrateRange().getUpper() / 1000000), //maxbitrate
                                maxlevel, //maxlevel
                                instances, //instances
                                resolutions, //resolutions
                                supportsIsHw && codec.isHardwareAccelerated(),
                                supportsIsHw && codec.isSoftwareOnly(),
                                supportsIsHw
                            )
                        );
                    }
                }
            }
        }
        return new Gson().toJson(result);
    }

    private static String codecframeRate(
        MediaCodecInfo.VideoCapabilities videoCapabilities,
        int width,
        String height,
        int heightInt,
        int lowerWidth,
        int UperWidth
    ) {
        try {
            //Check if is bigger then smallest and smaller then the biggest
            return (width >= lowerWidth && width <= UperWidth)
                ? String.format(
                    Locale.US,
                    "%s : %d fps | ",
                    height,
                    Math.round(videoCapabilities.getSupportedFrameRatesFor(width, heightInt).getUpper())
                )
                : null;
        } catch (Exception e) {
            recordException(TAG, "codecframeRate Exception width " + width + " height " + height, e);
            return null;
        }
    }

    static boolean DefectedCodecDontExist(String[] CodecList) {
        String codecName;

        for (MediaCodecInfo codec : new MediaCodecList(MediaCodecList.REGULAR_CODECS).getCodecInfos()) {
            if (codec != null && !codec.isEncoder()) {
                for (String type : codec.getSupportedTypes()) {
                    if (type.contains("avc")) {
                        codecName = codec.getName().toLowerCase(Locale.US);

                        for (String CodecListName : CodecList) {
                            if (codecName.contains(CodecListName)) {
                                return false;
                            }
                        }
                    }
                }
            }
        }

        return true;
    }

    static DefaultLoadControl getLoadControl(int buffer, int DeviceRam) {
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

    static MediaSource buildMediaSource(
        Uri uri,
        Context context,
        int Type,
        int LowLatency,
        boolean speedAdjustment,
        String mainPlaylist,
        String userAgent
    ) {
        if (Type == 1) {
            return new HlsMediaSource.Factory(getDefaultDataSourceFactory(mainPlaylist, uri, userAgent))
                .setAllowChunklessPreparation(true)
                .setLowLatency(LowLatency)
                .setspeedAdjustment(speedAdjustment)
                .createMediaSource(MediaItemBuilder(uri));
        } else if (Type == 2) {
            return new HlsMediaSource.Factory(getDefaultDataSourceFactory(mainPlaylist, uri, userAgent))
                .setAllowChunklessPreparation(true)
                .setLowLatency(LowLatency) //For VODs that the live has not yet ended and the user has not yet watched
                .createMediaSource(MediaItemBuilder(uri));
        } else return new ProgressiveMediaSource.Factory(new DefaultDataSource.Factory(context), new Mp4ExtractorsFactory()).createMediaSource(
            MediaItemBuilder(uri)
        );
    }

    private static DefaultHttpDataSource.Factory getDefaultDataSourceFactory(String mainPlaylist, Uri uri, String userAgent) {
        if (mainPlaylist == null) mainPlaylist = ""; //technically should not happen but check to prevent exception when converting to byte[]

        return new DefaultHttpDataSource.Factory()
            .setUserAgent(userAgent)
            .setConnectTimeoutMs(10000)
            .setReadTimeoutMs(10000)
            .setAllowCrossProtocolRedirects(false)
            .setMainPlaylistBytes(mainPlaylist.getBytes())
            .setUri(uri);
    }

    static boolean deviceIsTV(@NonNull Context context) {
        UiModeManager uiModeManager = (UiModeManager) context.getSystemService(Context.UI_MODE_SERVICE);
        return (uiModeManager != null ? uiModeManager.getCurrentModeType() : 0) == Configuration.UI_MODE_TYPE_TELEVISION;
    }

    //Deprecated in API level 29 but gives the path that I need and works on API 29
    //as long one adds android:requestLegacyExternalStorage="true"to manifest
    @SuppressWarnings({ "deprecation", "RedundantSuppression" })
    private static File getExternalSD() {
        File Sdcard = null;

        try {
            Sdcard = Environment.getExternalStorageDirectory();
        } catch (Exception e) {
            recordException(TAG, "getExternalSD", e);
        }

        return Sdcard != null && Sdcard.canWrite() ? Sdcard : null;
    }

    private static MediaItem MediaItemBuilder(Uri uri) {
        return new MediaItem.Builder().setUri(uri).build();
    }

    static int DeviceRam(Context context) {
        ActivityManager actManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        ActivityManager.MemoryInfo memInfo = new ActivityManager.MemoryInfo();
        int maxRamSize = 196000000;

        if (actManager != null) {
            actManager.getMemoryInfo(memInfo);
        } else {
            return maxRamSize;
        }
        int ramSize = (int) (memInfo.totalMem / 20);

        //Prevent Ram too big bigger then max int value
        //Or just too big even on devices with a lot of RAM it can't be too large
        ramSize = ramSize > maxRamSize || ramSize < 0 ? maxRamSize : ramSize;

        return ramSize;
    }

    static String getWebviewVersion(Context context) {
        PackageInfo pInfo = WebViewCompat.getCurrentWebViewPackage(context);

        return pInfo != null ? pInfo.versionName : null;
    }

    public static Point ScreenSize(Display display) {
        Point size = new Point();
        //TODO check deprecation
        display.getSize(size);

        return size;
    }

    static String getQualities(DefaultTrackSelector trackSelector) {
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

                            result.add(new QualitiesObj("Auto", 0, "Auto"));

                            for (int trackIndex = 0; trackIndex < groupIndex.length; trackIndex++) {
                                format = groupIndex.getFormat(trackIndex);
                                result.add(
                                    new QualitiesObj(
                                        String.format(Locale.US, "%dp%d", format.height, extractFPS(format.frameRate)),
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

    private static String extractBand(int band) {
        return band > 0 ? String.format(Locale.US, " | %.02fMbps", ((float) band / 1000000)) : "";
    }

    static String GetVideoQuality(Format format) {
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
        else if (codec.contains("avc")) return " | AVC";
        else if (codec.contains("vp9")) return " | VP9";
        else if (codec.contains("hvc") || codec.contains("hev")) return " | HEVC";
        else if (codec.contains("av01")) return " | AV1";
        else if (codec.contains("mp4a")) return " | MP4";

        return "";
    }

    private static int extractFPS(float fps) {
        if (fps > 58 && fps < 62) return 60;
        else if (fps < 32 && fps > 28) return 30;

        return (int) Math.ceil(fps);
    }

    static String GetCounters(float FullValue, float FullValueAVG, long Counter) {
        FullValueAVG = (Counter > 0 ? (FullValueAVG / Counter) : 0);

        return String.format(
            Locale.US,
            "%s%.02f | %s%.02f",
            (FullValue < 10 ? "&nbsp;&nbsp;" : ""), //Keeps the indentation when the values go bellow 10
            FullValue,
            (FullValueAVG < 10 ? "&nbsp;&nbsp;" : ""), //Keeps the indentation when the values go bellow 10
            FullValueAVG
        );
    }

    static String getTime(float time) {
        time = time > 0 ? time / 1000 : 0;

        return String.format(
            Locale.US,
            "%s%.02f",
            (time < 10 ? "&nbsp;&nbsp;" : ""), //Keeps the indentation when the values go bellow 10
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
        } catch (Exception e) { //Exception caused on android 8.1 and up when notification fail to
            recordException(TAG, "SendNotificationIntent e ", e);
        }
    }

    public static boolean isConnected(Context context) {
        ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        if (cm == null) return true;
        NetworkInfo activeNetwork = cm.getActiveNetworkInfo();

        return activeNetwork != null && activeNetwork.isConnected();
    }

    static void hideKeyboardFrom(Context context, View view) {
        InputMethodManager imm = (InputMethodManager) context.getSystemService(Context.INPUT_METHOD_SERVICE);
        if (imm != null) {
            imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
        }
    }

    static void showKeyboardFrom(Context context, View view) {
        InputMethodManager imm = (InputMethodManager) context.getSystemService(Context.INPUT_METHOD_SERVICE);
        if (imm != null) {
            imm.showSoftInputFromInputMethod(view.getWindowToken(), 0);
        }
    }

    static void LongLog(@SuppressWarnings("SameParameterValue") String TAG, String veryLongString) {
        int maxLogSize = 1000;
        int len = veryLongString.length();

        for (int i = 0; i <= len / maxLogSize; i++) {
            Log.i(TAG, veryLongString.substring((i * maxLogSize), Math.min((i + 1) * maxLogSize, len)));
        }
    }

    static FrameLayout.LayoutParams BasePreviewLayout(float bottom, float right, float left, int web_height, Point ScreenSize, boolean bigger) {
        float scale = (float) ScreenSize.y / web_height; //WebView screen size is not the same size as device screen

        float width = (int) ((right - left) * scale);
        float offset = width / 135; //Minor offset to make it feet inside the box without overflowing
        width -= offset;

        float bottomMargin = bottom * scale;
        float leftMargin = (left * scale) + (offset / 1.8f);

        if (bigger) {
            bottomMargin = (ScreenSize.y - bottomMargin) - (offset / 2.2f);
            float OldWidth = width;

            width = width * 1.26f;
            leftMargin = leftMargin - ((width - OldWidth) / 2); //center on the thumbnail

            //Log.i(TAG, "leftMargin before " + leftMargin + " (leftMargin + width) " + (leftMargin + width));

            if (leftMargin < 0) leftMargin = 0;
            else if ((leftMargin + width) > ScreenSize.x) leftMargin = ScreenSize.x - width;
            //Log.i(TAG, "leftMargin after " + leftMargin);
        } else bottomMargin = (ScreenSize.y - bottomMargin) + (offset / 1.8f);

        float height = (width * 9) / 16; //16 by 9 box
        FrameLayout.LayoutParams PlayerViewSidePanel = new FrameLayout.LayoutParams((int) width, (int) height, Gravity.LEFT | Gravity.BOTTOM);

        //Center on top of the box in relation to the offset
        PlayerViewSidePanel.bottomMargin = (int) bottomMargin;
        PlayerViewSidePanel.leftMargin = (int) leftMargin;

        //Log.i(TAG, "height " + height + " bottomMargin " + bottomMargin + " bottomMargin + height " + (height + bottomMargin) + " ScreenSize.y " + ScreenSize.y);

        return PlayerViewSidePanel;
    }

    static void deleteCache(Context context) {
        try {
            File dir = context.getCacheDir();
            deleteDir(dir);
        } catch (Exception e) {
            recordException(TAG, "deleteCache e ", e);
        }
    }

    private static boolean deleteDir(File dir) {
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
        } else if (dir != null && dir.isFile()) {
            return dir.delete();
        } else {
            return false;
        }
    }

    public static boolean hasTokens(String UserId, AppPreferences appPreferences) {
        return getString(UserId + Constants.PREF_ACCESS_TOKEN, null, appPreferences) != null;
    }

    public static boolean refreshTokens(String UserId, AppPreferences appPreferences) {
        //        String refresh_token = getString(UserId + Constants.PREF_REFRESH_TOKEN, null, appPreferences);
        //        String client_id = getString(Constants.PREF_CLIENT_ID, null, appPreferences);
        //        String client_secret = getString(Constants.PREF_CLIENT_SECRET, null, appPreferences);
        //        String redirect_uri = getString(Constants.PREF_REDIRECT_URI, null, appPreferences);
        //
        //        if (client_id == null || client_secret == null || redirect_uri == null || refresh_token == null) {
        //
        //            if (refresh_token == null) eraseTokens(UserId, appPreferences);
        //
        //            return false;
        //
        //        }
        //
        //        try {
        //            String urlString = String.format(
        //                    Locale.US,
        //                    "https://id.twitch.tv/oauth2/token?grant_type=refresh_token&client_id=%s&client_secret=%s&refresh_token=%s&redirect_uri=%s",
        //                    client_id,
        //                    client_secret,
        //                    refresh_token,
        //                    redirect_uri
        //            );
        //
        //            JsonObject obj;
        //            String ResponseText;
        //            ResponseObj response;
        //
        //            for (int i = 0; i < 3; i++) {
        //
        //                response =
        //                        Internal_MethodUrl(
        //                                urlString,
        //                                Constants.DEFAULT_HTTP_TIMEOUT + (Constants.DEFAULT_HTTP_EXTRA_TIMEOUT * i),
        //                                null,
        //                                "POST",
        //                                0,
        //                                new String[0][2]
        //                        );
        //
        //                if (response != null) {
        //
        //                    ResponseText = response.responseText;
        //
        //                    if (response.status == 200) {
        //
        //                        obj = parseString(ResponseText).getAsJsonObject();
        //
        //                        appPreferences.put(
        //                                UserId + Constants.PREF_REFRESH_TOKEN,
        //                                obj.has("refresh_token") && !obj.get("refresh_token").isJsonNull() ?
        //                                        obj.get("refresh_token").getAsString() :
        //                                        null
        //                        );
        //
        //                        appPreferences.put(
        //                                UserId + Constants.PREF_ACCESS_TOKEN,
        //                                obj.has("access_token") && !obj.get("access_token").isJsonNull() ?
        //                                        (Constants.BASE_HEADERS[1][1] + obj.get("access_token").getAsString()) :
        //                                        null
        //                        );
        //
        //                        appPreferences.put(
        //                                UserId + Constants.PREF_TOKEN_EXPIRES_WHEN,
        //                                obj.has("expires_in") && !obj.get("expires_in").isJsonNull() ?
        //                                        (System.currentTimeMillis() + ((obj.get("expires_in").getAsLong() - 100) * 1000)) :
        //                                        0
        //                        );
        //
        //                        return true;
        //                    } else if (ResponseText.contains("Invalid refresh token")) {
        //
        //                        eraseTokens(UserId, appPreferences);
        //
        //                        return false;
        //                    }
        //
        //                }
        //
        //            }
        //        } catch (Exception e) {
        //            recordException(TAG, "refreshTokens e ", e);
        //        }

        return false;
    }

    static void eraseTokens(String UserId, AppPreferences appPreferences) {
        appPreferences.put(UserId + Constants.PREF_REFRESH_TOKEN, null);
        appPreferences.put(UserId + Constants.PREF_ACCESS_TOKEN, null);
        appPreferences.put(UserId + Constants.PREF_TOKEN_EXPIRES_WHEN, 0);
    }

    public static void recordException(String TAG, String message, Throwable e) {
        try {
            FirebaseCrashlytics.getInstance().log(TAG + " " + message);

            if (e != null) {
                FirebaseCrashlytics.getInstance().recordException(e);
                Log.w(TAG, message, e);
            } else {
                FirebaseCrashlytics.getInstance().recordException(new RuntimeException(TAG + " e " + message));
                Log.w(TAG, message);
            }

            FirebaseCrashlytics.getInstance().sendUnsentReports();
        } catch (Exception ignore) { //Just in case prevent a crash sending a crash
        }
    }

    //    static void checkTokens(String UserId, AppPreferences appPreferences) {
    //        String token = getString(UserId + Constants.PREF_ACCESS_TOKEN, null, appPreferences);
    //
    //        try {
    //            String urlString = "https://id.twitch.tv/oauth2/validate";
    //
    //            String[][] HEADERS = {
    //                    {Constants.BASE_HEADERS[1][0], token}
    //            };
    //
    //            JsonObject obj;
    //            int status;
    //            ResponseObj response;
    //
    //            for (int i = 0; i < 3; i++) {
    //
    //                response =
    //                        Internal_MethodUrl(
    //                                urlString,
    //                                Constants.DEFAULT_HTTP_TIMEOUT + (Constants.DEFAULT_HTTP_EXTRA_TIMEOUT * i),
    //                                null,
    //                                null,
    //                                0,
    //                                HEADERS
    //                        );
    //
    //                if (response != null) {
    //
    //                    status = response.status;
    //
    //                    if (status == 200) {
    //                        obj = parseString(response.responseText).getAsJsonObject();
    //
    //                        if (obj.has("expires_in") && obj.get("expires_in").isJsonNull()) {
    //
    //                            appPreferences.put(
    //                                    UserId + Constants.PREF_TOKEN_EXPIRES_WHEN,
    //                                    (System.currentTimeMillis() + ((obj.get("expires_in").getAsLong() - 100) * 1000))
    //                            );
    //
    //                        }
    //                        break;
    //                    } else if (status == 401 || status == 403) {
    //
    //                        refreshTokens(
    //                                UserId,
    //                                appPreferences
    //                        );
    //                        break;
    //                    }
    //
    //                }
    //
    //            }
    //        } catch (Exception e) {
    //            recordException(TAG, "checkTokens e ", e);
    //        }
    //    }

    //TODO check deprecation
    static boolean InstallFromPLay(Context context) {
        // A list with valid installers package name
        final List<String> validInstallers = new ArrayList<>(Arrays.asList("com.android.vending", "com.google.android.feedback"));

        // The package name of the app that has installed your app
        final String installer = context.getPackageManager().getInstallerPackageName(context.getPackageName());

        // true if your app has been downloaded from Play Store
        return installer != null && validInstallers.contains(installer);
    }

    static String DownloadAPK(String apkURL, Context context) {
        HttpURLConnection urlConnection = null;
        InputStream input = null;
        OutputStream output = null;

        try {
            urlConnection = (HttpURLConnection) new URL(apkURL).openConnection();
            urlConnection.setConnectTimeout(Constants.DEFAULT_HTTP_TIMEOUT);
            urlConnection.setReadTimeout(Constants.DEFAULT_HTTP_TIMEOUT * 10);

            urlConnection.connect();

            int status = urlConnection.getResponseCode();

            if (status != -1) {
                if (status == 200) {
                    File file = GetUpdateFile(context);
                    if (file == null) return null;

                    input = urlConnection.getInputStream();
                    output = new FileOutputStream(file);

                    byte[] buffer = new byte[1024];
                    int count;
                    while ((count = input.read(buffer)) != -1) {
                        output.write(buffer, 0, count);
                    }

                    return file.getAbsolutePath();
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (Throwable e) {
            recordException(TAG, "DownloadAPK ", e);
            return null;
        } finally {
            closeQuietly(input);
            closeQuietly(output);

            if (urlConnection != null) urlConnection.disconnect();
        }
    }

    private static File getCacheDir(Context context) {
        File cacheDir;

        // Android 6.0 fix (providers not supported)
        cacheDir = context.getExternalCacheDir();

        if (cacheDir == null || !cacheDir.canWrite()) { // no storage, try to use internal one
            cacheDir = getExternalSD();

            if (cacheDir == null) {
                // Android 7.0 and above (supports install from internal dirs)
                cacheDir = context.getCacheDir();
            }
        }

        return cacheDir;
    }

    static File GetUpdateFile(Context context) {
        try {
            String path = getCacheDir(context).getAbsolutePath() + "/update.apk";
            File file = new File(path);

            if (file.exists()) {
                //noinspection ResultOfMethodCallIgnored
                file.delete();
            }

            return file;
        } catch (Throwable e) {
            recordException(TAG, "GetUpdateFile ", e);
        }

        return null;
    }

    static void installPackage(Context context, String packagePath) {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        Uri file = getFileUri(context, packagePath);
        intent.setDataAndType(file, "application/vnd.android.package-archive");
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_GRANT_READ_URI_PERMISSION); // without this flag android returned a intent error!

        try {
            context.startActivity(intent);
        } catch (Throwable e) {
            recordException(TAG, "installPackage ", e);
        }
    }

    private static Uri getFileUri(Context context, String filePath) {
        // If your targetSdkVersion is 24 (Android 7.0 Nougat) or higher, we have to use FileProvider class
        // https://stackoverflow.com/questions/38200282/android-os-fileuriexposedexception-file-storage-emulated-0-test-txt-exposed
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            return FileProvider.getUriForFile(context, context.getPackageName() + ".update_provider", new File(filePath));
        } else {
            return Uri.fromFile(new File(filePath));
        }
    }

    //langCode in the format en_US, ru_RU
    static void SetLanguage(Context context, String langCode) {
        if (langCode == null || langCode.isEmpty()) {
            return;
        }

        Locale locale = parseLangCode(langCode);
        Locale oldLocale = Locale.getDefault();

        if (oldLocale.equals(locale)) {
            return;
        }

        Locale.setDefault(locale);
        Resources resources = context.getResources();
        Configuration config = resources.getConfiguration();
        config.locale = locale;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            config.setLocales(new LocaleList(locale));
        }

        resources.updateConfiguration(config, resources.getDisplayMetrics());
    }

    private static Locale parseLangCode(String langCode) {
        if (langCode == null) {
            return null;
        }

        StringTokenizer tokenizer = new StringTokenizer(langCode, "_");
        String lang = tokenizer.nextToken();
        String country = tokenizer.hasMoreTokens() ? tokenizer.nextToken() : "";

        return new Locale(lang, country);
    }

    public static Set<String> getBlockedByType(String type, AppPreferences appPreferences) {
        return new Gson().fromJson(getString(type, "[]", appPreferences), setType);
    }

    public static class ResponseObj {

        public final int status;
        public final String responseText;
        final long checkResult;
        final String url;

        ResponseObj(int status, String responseText, long checkResult) {
            this.status = status;
            this.responseText = responseText;
            this.checkResult = checkResult;
            this.url = null;
        }
    }

    @SuppressWarnings({ "unused", "FieldCanBeLocal", "RedundantSuppression" })
    private static class CodecList {

        private final String type;
        private final String name;
        private final String nameType;
        private final String CanonicalName;
        private final String maxresolution;
        private final String maxbitrate;
        private final String maxlevel;
        private final int instances;
        private final String resolutions;
        private final boolean isHardwareAccelerated;
        private final boolean isSoftwareOnly;
        private final boolean supportsIsHw;

        CodecList(
            String type,
            String name,
            String nameType,
            String CanonicalName,
            String maxresolution,
            String maxbitrate,
            String maxlevel,
            int instances,
            String resolutions,
            boolean isHardwareAccelerated,
            boolean isSoftwareOnly,
            boolean supportsIsHw
        ) {
            this.type = type;
            this.name = name;
            this.nameType = nameType;
            this.CanonicalName = CanonicalName;
            this.maxresolution = maxresolution;
            this.maxbitrate = maxbitrate;
            this.maxlevel = maxlevel;
            this.instances = instances;
            this.resolutions = resolutions;
            this.isHardwareAccelerated = isHardwareAccelerated;
            this.isSoftwareOnly = isSoftwareOnly;
            this.supportsIsHw = supportsIsHw;
        }
    }

    //https://exoplayer.dev/shrinking.html
    private static class Mp4ExtractorsFactory implements ExtractorsFactory {

        @Override
        @NonNull
        public Extractor[] createExtractors() {
            return new Extractor[] { new Mp4Extractor(SubtitleParser.Factory.UNSUPPORTED, /* flags= */FLAG_EMIT_RAW_SUBTITLE_DATA) };
        }
    }

    @SuppressWarnings({ "unused", "FieldCanBeLocal", "RedundantSuppression" })
    private static class QualitiesObj {

        private final String id;
        private final String band;
        private final String codec;

        QualitiesObj(String id, int band, String codec) {
            this.id = id;
            this.band = extractBand(band);
            this.codec = extractCodec(codec);
        }
    }
}
