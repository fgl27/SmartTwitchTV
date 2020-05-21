package com.fgl27.twitch;

import android.app.ActivityManager;
import android.content.Context;
import android.graphics.Point;
import android.media.MediaCodecInfo;
import android.media.MediaCodecList;
import android.os.Build;
import android.os.Handler;
import android.os.HandlerThread;
import android.util.Log;
import android.util.Range;
import android.view.WindowManager;

import com.google.android.exoplayer2.audio.AudioCapabilities;
import com.google.gson.Gson;

import java.util.Arrays;

public final class DevLogs {

    public static final String TAG = "STTV_DEVLOG";

    public static void LogBUILD() {
        try {
            //Basic device info
            Log.i(TAG, "Build: INFO START...");
            Log.i(TAG, "BOARD: " + Build.BOARD);
            Log.i(TAG, "BOOTLOADER: " + Build.BOOTLOADER);
            Log.i(TAG, "BRAND: " + Build.BRAND);
            Log.i(TAG, "DISPLAY: " + Build.DISPLAY);
            Log.i(TAG, "FINGERPRINT: " + Build.FINGERPRINT);
            Log.i(TAG, "HARDWARE: " + Build.HARDWARE);
            Log.i(TAG, "HOST: " + Build.HOST);
            Log.i(TAG, "ID: " + Build.ID);
            Log.i(TAG, "MANUFACTURER: " + Build.MANUFACTURER);
            Log.i(TAG, "MODEL: " + Build.MODEL);
            Log.i(TAG, "PRODUCT: " + Build.PRODUCT);
            Log.i(TAG, "TAGS: " + Build.TAGS);
            Log.i(TAG, "USER: " + Build.USER);
            Log.i(TAG, "SUPPORTED_ABIS: " + Arrays.toString(Build.SUPPORTED_ABIS));
            Log.i(TAG, "TIME: " + Build.TIME);
            Log.i(TAG, "VERSION.CODENAME: " + Build.VERSION.CODENAME);
            Log.i(TAG, "VERSION.SDK_INT: " + Build.VERSION.SDK_INT);
            Log.i(TAG, "VERSION.INCREMENTAL: " + Build.VERSION.INCREMENTAL);
            Log.i(TAG, "VERSION.RELEASE: " + Build.VERSION.RELEASE);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                Log.i(TAG, "VERSION.SECURITY_PATCH: " + Build.VERSION.SECURITY_PATCH);
                Log.i(TAG, "VERSION.BASE_OS: " + Build.VERSION.BASE_OS);
            }
            Log.i(TAG, "BuildConfig.VERSION_NAME: " + BuildConfig.VERSION_NAME);

            Log.i(TAG, "Build: INFO End...");
        } catch (Exception e) {//Just in case
            Log.w(TAG, "LogBUILD Exception ", e);
        }
    }

    public static void LogMediaInfo() {
        try {
            //Codecs info
            Log.i(TAG, "MediaCodecList: Start...");
            for (MediaCodecInfo codec : new MediaCodecList(MediaCodecList.ALL_CODECS).getCodecInfos()) {

                Log.i(TAG, "Codec name: " + codec.getName());
                Log.i(TAG, "Codec isEncoder: " + codec.isEncoder());

                for (String type : codec.getSupportedTypes()) {
                    MediaCodecInfo.CodecCapabilities codecCapabilities = codec.getCapabilitiesForType(type);
                    MediaCodecInfo.VideoCapabilities videoCapabilities = codecCapabilities.getVideoCapabilities();
                    MediaCodecInfo.AudioCapabilities audioCapabilities = codecCapabilities.getAudioCapabilities();

                    Log.i(TAG, "Codec codecCapabilities:");
                    LongLog(TAG, new Gson().toJson(codecCapabilities));

                    if (videoCapabilities != null) {
                        Log.i(TAG, "Codec videoCapabilities:");
                        LongLog(TAG, "getBitrateRange: " + videoCapabilities.getBitrateRange().toString());
                        LongLog(TAG, "getSupportedFrameRates: " +  videoCapabilities.getSupportedFrameRates().toString());
                        LongLog(TAG, "getSupportedHeights: " + videoCapabilities.getSupportedHeights().toString());
                        LongLog(TAG, "getHeightAlignment: " + videoCapabilities.getHeightAlignment());
                        LongLog(TAG, "getSupportedWidths: " + videoCapabilities.getSupportedWidths().toString());
                        LongLog(TAG, "getWidthAlignment: " + videoCapabilities.getWidthAlignment());

                        int lowerWidth = videoCapabilities.getSupportedWidths().getLower();
                        int UperWidth = videoCapabilities.getSupportedWidths().getUpper();
                        String resolutions;
                        StringBuilder values = new StringBuilder();
                        for (int i = 0; i < Tools.resolutionsWidth.length; i++) {
                            resolutions = Tools.codecframeRate(videoCapabilities, Tools.resolutionsWidth[i], Tools.resolutionsHeight[i], lowerWidth, UperWidth);
                            if (resolutions != null) values.append(resolutions);
                        }

                        if (values.length() > 0) {
                            resolutions = values.toString();
                            Log.i(TAG, "Res / fps: " + resolutions.substring(0, resolutions.length() - 3));
                        }
                    }

                    if (audioCapabilities != null) {
                        Log.i(TAG, "Codec audioCapabilities:");
                        LongLog(TAG, "getBitrateRange: " + audioCapabilities.getBitrateRange().toString());
                        LongLog(TAG, "getMaxInputChannelCount: " + audioCapabilities.getMaxInputChannelCount());

                        Range[] supportedSampleRateRanges = audioCapabilities.getSupportedSampleRateRanges();
                        if (supportedSampleRateRanges != null) {
                            LongLog(TAG, "getSupportedSampleRateRanges: " + Arrays.toString(supportedSampleRateRanges));
                        } else {
                            int[] SupportedSampleRates = audioCapabilities.getSupportedSampleRates();
                            if (SupportedSampleRates != null)
                                LongLog(TAG, "getSupportedSampleRates: " + Arrays.toString(SupportedSampleRates));
                        }
                    }
                }
            }

            Log.i(TAG, "MediaCodecList: end...");

        } catch (Exception e) {//Just in case
            Log.w(TAG, "LogMediaInfo Exception ", e);
        }

    }

    public static void LogMemoryInfo(Context context) {
        try {
            //Memory info
            ActivityManager actManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
            ActivityManager.MemoryInfo memInfo = new ActivityManager.MemoryInfo();
            if (actManager != null) {
                actManager.getMemoryInfo(memInfo);
                Log.i(TAG, "memInfo: Start...");
                LongLog(TAG, memInfo.toString());
                Log.i(TAG, "memInfo: end...");
            }

        } catch (Exception e) {//Just in case
            Log.w(TAG, "LogMemoryInfo Exception ", e);
        }
    }

    public static void LogExoInfo(Context context) {
        try {

            Log.i(TAG, "Exoplayer info: Start...");
            Log.i(TAG, "audioCapabilities:");
            LongLog(TAG, AudioCapabilities.getCapabilities(context.getApplicationContext()).toString());
            Log.i(TAG, "Exoplayer info: end...");

        } catch (Exception e) {//Just in case
            Log.w(TAG, "LogDevice Exception ", e);
        }
    }

    public static void LogDisplay(Context context) {
        try {
            WindowManager window = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
            if (window != null) {
                Point ScreenSize = Tools.ScreenSize(window.getDefaultDisplay());
                Log.i(TAG, "ScreenSize info: Start...");
                LongLog(TAG, ScreenSize.toString());
                Log.i(TAG, "ScreenSize info: end...");
            }
        } catch (Exception e) {//Just in case
            Log.w(TAG, "LogDisplay Exception ", e);
        }
    }

    public static void LogDevice(Context context) {
        HandlerThread LogThread = new HandlerThread("LogThread");
        LogThread.start();
        Handler LogHandler = new Handler(LogThread.getLooper());

        LogHandler.post(() -> {
            Log.i(TAG, "LogDevice: Start...");
            Log.i(TAG, "LogDevice: Max line length 1000 character");
            LogBUILD();
            LogMediaInfo();
            LogMemoryInfo(context);
            LogDisplay(context);
            LogExoInfo(context);
            Log.i(TAG, "WebviewVersion: " + Tools.getWebviewVersion(context));
            Log.i(TAG, "LogDevice: End...");
        });

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
}
