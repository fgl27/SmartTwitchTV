package com.fgl27.twitch;

import android.Manifest;
import android.app.ActivityManager;
import android.app.UiModeManager;
import android.content.Context;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.graphics.Point;
import android.media.MediaCodecInfo;
import android.media.MediaCodecList;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.util.Log;
import android.view.Display;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.fgl27.twitch.DataSource.mDefaultHttpDataSourceFactory;
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
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.io.ByteArrayOutputStream;
import java.io.Closeable;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Locale;
import java.util.Scanner;
import java.util.concurrent.ThreadLocalRandom;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.google.gson.JsonParser.parseString;

public final class Tools {

    private static final String TAG = Tools.class.getName();

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

    private static final int DefaultTimeout = 3000;
    private static final int DefaultLoadingDataTryMax = 3;

    private static final String live_token = "https://api.twitch.tv/api/channels/%s/access_token?platform=_";
    private static final String live_links = "https://usher.ttvnw.net/api/channel/hls/%s.m3u8?&token=%s&sig=%s&reassignments_supported=true&playlist_include_framerate=true&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true&cdm=wv&p=%d";

    private static final String vod_token = "https://api.twitch.tv/api/vods/%s/access_token?platform=_";
    private static final String vod_links = "https://usher.ttvnw.net/vod/%s.m3u8?&nauth=%s&nauthsig=%s&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&cdm=wv&p=%d";

    private static final Pattern TIME_NAME = Pattern.compile("time=([^\\s]+)");

    private static class readUrlSimpleObj {
        private final int status;
        private final String responseText;

        public readUrlSimpleObj(int status, String responseText) {
            this.status = status;
            this.responseText = responseText;
        }

        public int getStatus() {
            return status;
        }

        public String getResponseText() {
            return responseText;
        }
    }

    @SuppressWarnings({"unused", "FieldCanBeLocal"})
    private static class HttpResultObj {
        private final int status;
        private final String responseText;

        public HttpResultObj(int status, String responseText) {
            this.status = status;
            this.responseText = responseText;
        }
    }

    @SuppressWarnings({"unused", "FieldCanBeLocal"})
    private static class extractPlayListObj {
        private final int status;
        private final String url;
        private final String responseText;

        public extractPlayListObj(int status, String url, String responseText) {
            this.status = status;
            this.url = url;
            this.responseText = responseText;
        }
    }

    //NullPointerException some time from token isJsonNull must prevent but throws anyway
    //UnsupportedEncodingException impossible to happen as encode "UTF-8" is bepassed but throws anyway
    public static String getStreamData(String channel_name_vod_id, boolean islive) throws UnsupportedEncodingException, NullPointerException {
        readUrlSimpleObj response;
        int i, status;
        JsonObject Token;
        String StreamSig = null;
        String StreamToken = null;

        String url = String.format(
                Locale.US,
                islive ? live_token : vod_token,
                channel_name_vod_id
        );

        for (i = 0; i < DefaultLoadingDataTryMax; i++) {

            response = readUrlSimpleToken(url, DefaultTimeout + (500 * i));

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
                    return HttpResultToString(status, "token");

            }
        }

        if (StreamToken != null && StreamSig != null) {

            url = String.format(
                    Locale.US,
                    islive ? live_links : vod_links,
                    channel_name_vod_id,
                    URLEncoder.encode(StreamToken, "UTF-8"),
                    StreamSig,
                    ThreadLocalRandom.current().nextInt(1, 1000)
            );

            for (i = 0; i < DefaultLoadingDataTryMax; i++) {

                response = readUrlSimplePlaylist(url, DefaultTimeout + (500 * i));

                if (response != null) {

                    status = response.getStatus();

                    //404 = off line
                    //403 = forbidden access
                    //410 = api v3 is gone use v5 bug
                    if (status == 200)
                        return response.getResponseText();
                    else if (status == 403 || status == 404 || status == 410)
                        return HttpResultToString(CheckToken(StreamToken) ? 1 : status, "link");

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

    private static String HttpResultToString(int status, String responseText) {
        return new Gson().toJson(
                new HttpResultObj(
                        status,
                        responseText)
        );
    }

    private static readUrlSimpleObj readUrlSimpleToken(String urlString, int Timeout) {
        HttpURLConnection urlConnection = null;

        try {
            urlConnection = (HttpURLConnection) new URL(urlString).openConnection();
            urlConnection.setConnectTimeout(Timeout);
            urlConnection.setReadTimeout(Timeout);

            urlConnection.connect();

            int status = urlConnection.getResponseCode();

            if (status != -1) {
                if (status == 200) {
                    return new readUrlSimpleObj(
                            status,
                            readFullyString(urlConnection.getInputStream())
                    );
                } else return new readUrlSimpleObj(status, "");
            } else {
                return null;
            }
        } catch (IOException e) {
            Log.w(TAG, "getStreamData IOException ", e);
            return null;
        } finally {
            if (urlConnection != null)
                urlConnection.disconnect();
        }
    }

    private static readUrlSimpleObj readUrlSimplePlaylist(String urlString, int Timeout) {
        HttpURLConnection urlConnection = null;

        try {
            urlConnection = (HttpURLConnection) new URL(urlString).openConnection();
            urlConnection.setConnectTimeout(Timeout);
            urlConnection.setReadTimeout(Timeout);

            urlConnection.connect();

            int status = urlConnection.getResponseCode();

            if (status != -1) {

                if (status == 200) {
                    return new readUrlSimpleObj(
                            status,
                            new Gson().toJson(
                                    new extractPlayListObj(
                                            status,
                                            urlString,
                                            readFullyString(urlConnection.getInputStream()))
                            )
                    );
                } else return new readUrlSimpleObj(status, "");

            } else {
                return null;
            }
        } catch (IOException e) {
            Log.w(TAG, "getStreamData IOException ", e);
            return null;
        } finally {
            if (urlConnection != null)
                urlConnection.disconnect();
        }
    }


    //This isn't asynchronous it will freeze js, so in function that proxy is not need and we don't wanna the freeze
    //use default js XMLHttpRequest
    public static String readUrl(String urlString, int timeout, int HeaderQuantity, String access_token) {
        HttpURLConnection urlConnection = null;
        String[][] HEADERS = {
                {CLIENTIDHEADER, CLIENTID},
                {ACCEPTHEADER, TWITHCV5JSON},
                {AUTHORIZATION, access_token}
        };

        try {
            urlConnection = (HttpURLConnection) new URL(urlString).openConnection();

            for (int i = 0; i < HeaderQuantity; i++)
                urlConnection.setRequestProperty(HEADERS[i][0], HEADERS[i][1]);

            urlConnection.setConnectTimeout(timeout);
            urlConnection.setReadTimeout(timeout);

            urlConnection.connect();

            int status = urlConnection.getResponseCode();

            if (status != -1) {
                return HttpResultToString(
                        status,
                        readFullyString(
                                status != HttpURLConnection.HTTP_OK ?
                                        urlConnection.getErrorStream() :
                                        urlConnection.getInputStream()
                        )
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

    public static String GetPing(Runtime runtime) {
        try {

            Process process = runtime.exec("ping -c 1 api.twitch.tv");

            Matcher matcher = TIME_NAME.matcher(readFullyString(process.getInputStream()));

            return matcher.find() ? matcher.group(1) : null;
        } catch (IOException e) {
            Log.w(TAG, "GetPing IOException ", e);
        }
        return null;
    }

    //For other then get methods
    public static String MethodUrl(String urlString, int timeout, int HeaderQuantity, String access_token, String overwriteID, String postMessage, String Method) {
        HttpURLConnection urlConnection = null;
        String[][] HEADERS = {
                {CLIENTIDHEADER, overwriteID != null ? overwriteID : CLIENTID},
                {ACCEPTHEADER, TWITHCV5JSON},
                {AUTHORIZATION, access_token}
        };

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
                closeQuietly(mOutputStreamWriter);
                closeQuietly(mOutputStream);
            }

            urlConnection.connect();

            int status = urlConnection.getResponseCode();

            if (status != -1) {
                return HttpResultToString(
                        status,
                        readFullyString(
                                status != HttpURLConnection.HTTP_OK ?
                                        urlConnection.getErrorStream() :
                                        urlConnection.getInputStream()
                        )
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

    private static String readFullyString(InputStream in) throws IOException {
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
        } catch (IOException e) {
            // Ignore.
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

    public static DefaultLoadControl getLoadControl(int buffer, int DeviceRam) {
        return new DefaultLoadControl.Builder()
                .setAllocator(new DefaultAllocator(true, C.DEFAULT_BUFFER_SEGMENT_SIZE))
                .setBufferDurationsMs(
                        90000, //DEFAULT_MIN_BUFFER_MS
                        36000000, //DEFAULT_MAX_BUFFER_MS... technically infinity setTargetBufferBytes controls it
                        buffer, //DEFAULT_BUFFER_FOR_PLAYBACK_MS
                        buffer + 1000 //DEFAULT_BUFFER_FOR_PLAYBACK_AFTER_REBUFFER_MS
                )
                .setTargetBufferBytes(DeviceRam)
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

    public static MediaSource buildMediaSource(Uri uri, Context context, int who_called, boolean LowLatency, String masterPlaylist, String userAgent) {
        if (who_called == 1) {
            return new HlsMediaSource.Factory(getDefaultDataSourceFactory(context, masterPlaylist, uri, userAgent))
                    .setAllowChunklessPreparation(true)
                    .setLowLatency(LowLatency ? 3000 : 0)//3000 is a safe value the implementation will calculate the proper value
                    .createMediaSource(MediaItemBuilder(uri));
        } else if (who_called == 2) {
            return new HlsMediaSource.Factory(getDefaultDataSourceFactory(context, masterPlaylist, uri, userAgent))
                    .setAllowChunklessPreparation(true)
                    .createMediaSource(uri);
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
        if (Build.VERSION.SDK_INT >= 23) {
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
        return new MediaItem.Builder().setSourceUri(uri).build();
    }

    public static int DeviceRam(Context context) {
        ActivityManager actManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        ActivityManager.MemoryInfo memInfo = new ActivityManager.MemoryInfo();
        if (actManager != null) {
            actManager.getMemoryInfo(memInfo);
        } else return 100000000;

        return (int) (memInfo.totalMem / 16);
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
                            ArrayList<QualitiesObj> result = new ArrayList<>();
                            Format format;
                            TrackGroup groupIndex = trackGroupArray.get(0);

                            result.add(new QualitiesObj("Auto", 0, "avc"));

                            for (int trackIndex = 0; trackIndex < groupIndex.length; trackIndex++) {
                                format = groupIndex.getFormat(trackIndex);
                                result.add(
                                        new QualitiesObj(
                                                format.height + "p" + extractFPS(format.frameRate),
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
                (FullValue < 10 ? "&nbsp;&nbsp;" : ""),
                FullValue,
                (FullValueAVG < 10 ? "&nbsp;&nbsp;" : ""),
                FullValueAVG,
                end
        );
    }

    public static String getTime(float time) {
        time = time > 0 ? time / 1000 : 0;

        return String.format(
                Locale.US,
                "%s%.02f s",
                (time < 10 ? "&nbsp;&nbsp;" : ""),
                time
        );
    }
}
