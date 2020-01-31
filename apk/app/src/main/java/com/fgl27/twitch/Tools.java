//copied https://github.com/yuliskov/SmartYouTubeTV

package com.fgl27.twitch;

import android.Manifest;
import android.app.UiModeManager;
import android.content.Context;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.media.MediaCodecInfo;
import android.media.MediaCodecList;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Environment;
import android.util.Log;

import androidx.annotation.NonNull;

import com.google.android.exoplayer2.C;
import com.google.android.exoplayer2.DefaultLoadControl;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.Format;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.extractor.Extractor;
import com.google.android.exoplayer2.extractor.ExtractorsFactory;
import com.google.android.exoplayer2.extractor.mp4.Mp4Extractor;
import com.google.android.exoplayer2.source.BehindLiveWindowException;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.ProgressiveMediaSource;
import com.google.android.exoplayer2.source.hls.HlsMediaSource;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultAllocator;
import com.google.gson.JsonObject;
import com.koushikdutta.ion.Ion;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Locale;
import java.util.Scanner;
import java.util.concurrent.ExecutionException;

public final class Tools {

    private static final String TAG = Tools.class.getName();

    private static final String[] codecNames = {"avc", "vp9", "mp4a"};

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

    //Same values as in the js counterpart
    private static final String CLIENTIDHEADER = "Client-ID";
    private static final String CLIENTID = "5seja5ptej058mxqy7gh5tcudjqtm9";
    private static final String ACCEPTHEADER = "Accept";
    private static final String TWITHCV5JSON = "application/vnd.twitchtv.v5+json";
    private static final String AUTHORIZATION = "Authorization";

    private static String[][] HEADERS = {{CLIENTIDHEADER, CLIENTID},
            {ACCEPTHEADER, TWITHCV5JSON},
            {AUTHORIZATION, null}};

    public static String readUrlHLS(Context context, String url) {
        try {
            JsonObject JSON =
                    Ion.with(context)
                            .load(url)
                            .asJsonObject()
                            .get();
            if (JSON != null) {
                return JsonObToString(200, JSON.toString());
            }
        } catch (InterruptedException e) {
            Log.w(TAG, "readUrlHLS InterruptedException ", e);
        } catch (ExecutionException e) {
            Log.w(TAG, "readUrlHLS ExecutionException ", e);
        } catch (NullPointerException e) {
            Log.w(TAG, "readUrlHLS NullPointerException ", e);
        }
        return null;
    }

    //This isn't asynchronous it will freeze js, so in function that proxy is not need and we don't wanna the freeze
    //use default js XMLHttpRequest
    public static String readUrl(String urlString, int timeout, int HeaderQuantity, String access_token) {
        HttpURLConnection urlConnection = null;
        HEADERS[2][1] = access_token;

        try {
            urlConnection = (HttpURLConnection) new URL(urlString).openConnection();

            for (int i = 0; i < HeaderQuantity; i++)
                urlConnection.setRequestProperty(HEADERS[i][0], HEADERS[i][1]);

            urlConnection.setConnectTimeout(timeout);
            urlConnection.setReadTimeout(timeout);

            urlConnection.connect();

            int status = urlConnection.getResponseCode();

            if (status != -1) {
                return JsonObToString(status, new String(
                        status != HttpURLConnection.HTTP_OK ?
                                readFully(urlConnection.getErrorStream()) : readFully(urlConnection.getInputStream()),
                        StandardCharsets.UTF_8)
                );
            } else {
                return null;
            }
        } catch (IOException e) {
            Log.w(TAG, "readUrl IOException ", e);
            return null;
        } finally {
            if (urlConnection != null)
                urlConnection.disconnect();
        }
    }

    //For other then get methods
    public static String MethodUrl(String urlString, int timeout, int HeaderQuantity, String access_token, String overwriteID, String postMessage, String Method) {
        HttpURLConnection urlConnection = null;
        HEADERS[2][1] = access_token;
        HEADERS[0][1] = overwriteID != null ? overwriteID : CLIENTID;

        try {
            urlConnection = (HttpURLConnection) new URL(urlString).openConnection();

            for (int i = 0; i < HeaderQuantity; i++)
                urlConnection.setRequestProperty(HEADERS[i][0], HEADERS[i][1]);

            urlConnection.setConnectTimeout(timeout);
            urlConnection.setReadTimeout(timeout);

            if (Method != null) {//If Method == null this will use the default get method, same as readUrl
                urlConnection.setRequestMethod(Method);
                urlConnection.setDoOutput(true);
            }

            if (postMessage != null) {//If postMessage == null we don't send a thing
                OutputStream mOutputStream = urlConnection.getOutputStream();
                OutputStreamWriter mOutputStreamWriter = new OutputStreamWriter(mOutputStream, StandardCharsets.UTF_8);
                mOutputStreamWriter.write(postMessage);
                mOutputStreamWriter.flush();
                mOutputStreamWriter.close();
                mOutputStream.close();
            }

            urlConnection.connect();

            int status = urlConnection.getResponseCode();

            if (status != -1) {
                return JsonObToString(status, new String(
                        status != HttpURLConnection.HTTP_OK ?
                                readFully(urlConnection.getErrorStream()) : readFully(urlConnection.getInputStream()),
                        StandardCharsets.UTF_8)
                );
            } else {
                return null;
            }
        } catch (IOException e) {
            Log.w(TAG, "postUrl IOException ", e);
            return null;
        } finally {
            if (urlConnection != null)
                urlConnection.disconnect();
        }
    }

    private static byte[] readFully(InputStream in) throws IOException {
        try {
            ByteArrayOutputStream bytes = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int count;
            while ((count = in.read(buffer)) != -1) {
                bytes.write(buffer, 0, count);
            }
            return bytes.toByteArray();
        } finally {
            in.close();
        }
    }

    public static boolean isCodecSupported(String name) {
        for (MediaCodecInfo codec : new MediaCodecList(MediaCodecList.REGULAR_CODECS).getCodecInfos())
            if (codec.getName().contains(name) && !codec.isEncoder() && !codec.getName().contains("google"))
                return true;

        return false;
    }

    public static boolean isAVC52Supported() {
        int maxAVCLevel = 0;
        for (MediaCodecInfo codec : new MediaCodecList(MediaCodecList.REGULAR_CODECS).getCodecInfos()) {
            if (!codec.isEncoder() && !codec.getName().contains("google")) {
                for (String type : codec.getSupportedTypes()) {
                    if (type.contains("avc")) {
                        try {
                            for (MediaCodecInfo.CodecProfileLevel codecProfileLevel : codec.getCapabilitiesForType(type).profileLevels) {
                                if (codecProfileLevel.level > maxAVCLevel) {
                                    maxAVCLevel = codecProfileLevel.level;
                                }
                            }
                        } catch (Exception e) {
                            Log.w(TAG, "mAVCMaxLevel Exception ", e);
                        }
                    }
                }
            }

        }
        return maxAVCLevel >= 65536;
    }

    // Receives the codec type (avc, vp9 or etc...) and returns a comma concatenate string
    // Type, Name, Max resolution Width x Heigth, Max bitrate Mbps, Max profile, Max level, 160p to 4k fps (returns fps = 0.0 for unsupported resolutions) | next codec same type
    //video/avc,OMX.Nvidia.h264.decode,3840x2176,120 Mbps,524288,5.2,160p : 960.00,360p : 960.00,480p : 960.00,720p : 555.56,1080p : 245.10,1440p : 138.89,4k : 61.73 | next codec same type
    public static String codecCapabilities(String CodecType) {
        StringBuilder values = new StringBuilder();
        String info;
        int position;
        int lowerWidth;
        int UperWidth;
        int Instances;

        for (MediaCodecInfo codec : new MediaCodecList(MediaCodecList.REGULAR_CODECS).getCodecInfos()) {
            if (!codec.isEncoder()) {
                for (String type : codec.getSupportedTypes()) {
                    if (type.contains(CodecType)) {
                        try {
                            MediaCodecInfo.CodecCapabilities codecCapabilities = codec.getCapabilitiesForType(type);
                            MediaCodecInfo.VideoCapabilities videoCapabilities = codecCapabilities.getVideoCapabilities();

                            if (Build.VERSION.SDK_INT >= 23) {
                                Instances = codecCapabilities.getMaxSupportedInstances();
                            } else Instances = -1;

                            MediaCodecInfo.CodecProfileLevel[] profile = codecCapabilities.profileLevels;

                            if (CodecType.contains("avc")) { //check avc arrays others codecs current not used
                                position = Arrays.asList(AvcLevelsEx).indexOf(profile[profile.length - 1].level);
                                info = String.format(Locale.US, "%d,%s",
                                        profile[profile.length - 1].profile,
                                        (position > 0) ? AvcLevels[position] : "Unknown level " + profile[profile.length - 1].level);
                            } else {
                                info = String.format(Locale.US, "%d,%d",
                                        profile[profile.length - 1].profile,//4
                                        profile[profile.length - 1].level);//5
                            }

                            lowerWidth = videoCapabilities.getSupportedWidths().getLower();
                            UperWidth = videoCapabilities.getSupportedWidths().getUpper();

                            values.append((values.length() == 0) ? "" : "|").append(String.format(Locale.US,
                                    //"type %s,codec %s,Max res %dx%d,Max bit %d Mbps,Max level %s,160p : %.2f,360p : %.2f,480p : %.2f,720p : %.2f,1080p : %.2f,1440p : %.2f,4k : %.2f",
                                    "%s,%s,%dx%d,%d Mbps,%s,%d,160p : %.2f,360p : %.2f,480p : %.2f,720p : %.2f,1080p : %.2f,1440p : %.2f,4k : %.2f",
                                    type,//0
                                    codec.getName(),//1
                                    videoCapabilities.getSupportedWidths().getUpper(),//2
                                    videoCapabilities.getSupportedHeights().getUpper(),//2
                                    videoCapabilities.getBitrateRange().getUpper() / 1000000,//3
                                    info,//4 & 5
                                    Instances,//6
                                    codecframeRate(videoCapabilities, 240, 160, lowerWidth, UperWidth),//7
                                    codecframeRate(videoCapabilities, 480, 360, lowerWidth, UperWidth),//8
                                    codecframeRate(videoCapabilities, 640, 480, lowerWidth, UperWidth),//9
                                    codecframeRate(videoCapabilities, 1280, 720, lowerWidth, UperWidth),//10
                                    codecframeRate(videoCapabilities, 1920, 1080, lowerWidth, UperWidth),//11
                                    codecframeRate(videoCapabilities, 2560, 1440, lowerWidth, UperWidth),//12
                                    codecframeRate(videoCapabilities, 3840, 2160, lowerWidth, UperWidth)));//13

                        } catch (Exception e) {
                            Log.w(TAG, "codecCapabilities Exception ", e);
                        }
                    }
                }
            }

        }
        return values.toString();
    }

    private static Double codecframeRate(MediaCodecInfo.VideoCapabilities videoCapabilities, int width, int height, int lowerWidth, int UperWidth) {
        try {
            //Check if is bigger then smallest and smaller then the biggest
            return (width >= lowerWidth && width <= UperWidth) ? videoCapabilities.getSupportedFrameRatesFor(width, height).getUpper() : 0.0;
        } catch (Exception e) {
            Log.w(TAG, "codecframeRate Exception width " + width + " height " + height, e);
            return 0.0;
        }
    }

    private static String JsonObToString(int status, String responseText) {
        JsonObject JSON = new JsonObject();
        JSON.addProperty("status", status);
        JSON.addProperty("responseText", responseText);
        return JSON.toString();
    }

    public static String mgetVideoQuality(SimpleExoPlayer player) {
        Format format = player.getVideoFormat();

        if (format == null) {
            return null;
        }

        return String.format(Locale.US, "%s,%s,%d,%s",
                format.height + "p",
                (format.frameRate == Format.NO_VALUE ? "" :
                        String.format(Locale.US, "%d", Math.round(format.frameRate))),
                format.bitrate,
                (format.codecs != null ? mgetCodec(format.codecs) : null));
    }

    private static String mgetCodec(String codec) {
        for (String codecName : codecNames) {
            if (codec.contains(codecName)) {
                return codecName;
            }
        }

        return codec;
    }

    /**
     * Increase player's min/max buffer sizes
     *
     * @return load control
     */
    public static DefaultLoadControl getLoadControl(int buffer) {
        return new DefaultLoadControl.Builder()
                .setAllocator(new DefaultAllocator(true, C.DEFAULT_BUFFER_SEGMENT_SIZE))
                .setBufferDurationsMs(
                        buffer + 5000, //DEFAULT_MIN_BUFFER_MS
                        100000, //DEFAULT_MAX_BUFFER_MS
                        buffer, //DEFAULT_BUFFER_FOR_PLAYBACK_MS
                        Math.min(buffer + 3000, 15000) //DEFAULT_BUFFER_FOR_PLAYBACK_AFTER_REBUFFER_MS
                )
                .setTargetBufferBytes(C.LENGTH_UNSET)
                .setPrioritizeTimeOverSizeThresholds(true)
                .createDefaultLoadControl();
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

    public static MediaSource buildMediaSource(Uri uri, DataSource.Factory dataSourceFactory, int mwhocall, boolean LowLatency) {
        if (mwhocall == 1) {
            if (LowLatency) {
                return new HlsMediaSource.Factory(dataSourceFactory)
                        .setAllowChunklessPreparation(true)
                        .setLowLatency(3000)
                        .createMediaSource(uri);
            } else {
                return new HlsMediaSource.Factory(dataSourceFactory)
                        .setAllowChunklessPreparation(true)
                        .createMediaSource(uri);
            }
        } else if (mwhocall == 2) {
            return new HlsMediaSource.Factory(dataSourceFactory)
                    .setAllowChunklessPreparation(true)
                    .createMediaSource(uri);
        } else
            return new ProgressiveMediaSource.Factory(dataSourceFactory, new Mp4ExtractorsFactory()).createMediaSource(uri);
    }

    //https://exoplayer.dev/shrinking.html
    private static class Mp4ExtractorsFactory implements ExtractorsFactory {
        @Override
        @NonNull
        public Extractor[] createExtractors() {
            return new Extractor[]{new Mp4Extractor()};
        }
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

    public static class BackupJson extends AsyncTask< String, Void, Void > {

        @Override
        protected Void doInBackground(String...params) {
            File Dir = new File(
                    getExternalSD(),
                    String.format(Locale.US, "data/%s/Backup", params[0])
            );

            boolean isDirCreated= Dir.exists();
            if (!isDirCreated) {
                isDirCreated = Dir.mkdirs();
            }

            if(isDirCreated) {
                try {
                    FileWriter mWriter = new FileWriter(Dir.getAbsolutePath() +  "/" + params[1], false);
                    mWriter.write(params[2]);
                    mWriter.close();
                } catch (IOException e) {
                    Log.w(TAG, "BackupJson IOException ", e);
                }
            }

            return null;
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

            while (mReader .hasNextLine()) {
                data.append(mReader .nextLine());
            }

            mReader.close();

            return data.toString();
        } catch (FileNotFoundException e) {
            Log.w(TAG, "RestoreBakupFile FileNotFoundException ", e);
        }
        return null;
    }

    public static boolean WR_storage(Context context) {
        if (Build.VERSION.SDK_INT >= 23) {
            return context.checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) ==
                    PackageManager.PERMISSION_GRANTED;
        } else return true;
    }
}
