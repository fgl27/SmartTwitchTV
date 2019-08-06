//copied https://github.com/yuliskov/SmartYouTubeTV

package com.fgl27.twitch;

import android.media.MediaCodecInfo;
import android.media.MediaCodecList;
import android.net.Uri;
import android.util.Log;

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

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.charset.IllegalCharsetNameException;
import java.nio.charset.StandardCharsets;
import java.nio.charset.UnsupportedCharsetException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class Tools {

    private static final String TAG = Tools.class.getName();

    private static final String[] codecNames = {"avc", "vp9", "mp4a"};

    //Same values as in the js counterpart
    private static final String CLIENTIDHEADER = "Client-ID";
    private static final String CLIENTID = "5seja5ptej058mxqy7gh5tcudjqtm9";
    private static final String ACCEPTHEADER = "Accept";
    private static final String TWITHCV5JSON = "application/vnd.twitchtv.v5+json";
    private static final String AUTHORIZATION = "Authorization";

    private static String[][] HEADERS = {{CLIENTIDHEADER, CLIENTID},
            {ACCEPTHEADER, TWITHCV5JSON},
            {AUTHORIZATION, null}};

    //TODO try a asynchronous one
    //This isn't asynchronous it will freeze js, so in function that proxy is not need and we don't wanna the freeze
    //use default js XMLHttpRequest
    public static String readUrl(String urlString, int timeout, int HeaderQuantity, String access_token, boolean post) {
        try {
            HttpURLConnection urlConnection = (HttpURLConnection) new URL(urlString).openConnection();
            HEADERS[2][1] = access_token;

            for (int i = 0; i < HeaderQuantity; i++)
                urlConnection.setRequestProperty(HEADERS[i][0], HEADERS[i][1]);

            urlConnection.setConnectTimeout(timeout);

            if (post) {
                urlConnection.setRequestMethod("POST");
                urlConnection.setDoOutput(true);
            }

            int status = urlConnection.getResponseCode();

            if (status != -1) {
                final Charset mresponseCharset = mresponseCharset(urlConnection.getContentType());

                if (mresponseCharset != null) {
                    byte[] responseBytes;

                    if (status != HttpURLConnection.HTTP_OK) responseBytes = readFully(urlConnection.getErrorStream());
                    else responseBytes = readFully(urlConnection.getInputStream());

                    return JsonObToString(status, new String(responseBytes, mresponseCharset));
                } else return JsonObToString(status, "fail");
            } else {
                return null;
            }
        } catch (IOException e) {
            Log.w(TAG, "IOException ", e);
            return null;
        }
    }

    private static byte[] readFully(InputStream in ) throws IOException {
        try {
            return readFullyNoClose( in );
        } finally {
            in .close();
        }
    }

    // Returns a byte[] containing the remainder of 'in'.

    private static byte[] readFullyNoClose(InputStream in) throws IOException {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int count;
        while ((count = in .read(buffer)) != -1) {
            bytes.write(buffer, 0, count);
        }
        return bytes.toByteArray();
    }

    /**
     * Returns the response charset of a HTTP response based on the {@code Content-Type} of
     * the response (see RFC 7230). If the {@code Content-Type} header is missing or invalid,
     * the response is assumed to be encoded as {@code UTF-8}. Note that a charset usually
     * makes sense only for {@code "text/plain"} and other "text based" responses.
     *
     * @throws IllegalCharsetNameException if the response specified charset is illegal.
     * @throws UnsupportedCharsetException if the response specified charset is unsupported.
     */
    private static Charset responseCharset(String contentTypeHeader)
            throws IllegalCharsetNameException, UnsupportedCharsetException {
        Charset responseCharset = StandardCharsets.UTF_8;
        if (contentTypeHeader != null) {
            Map < String, String > contentTypeParams = parseContentTypeParameters(contentTypeHeader);
            String charsetParameter = contentTypeParams.get("charset");
            if (charsetParameter != null) {
                responseCharset = Charset.forName(charsetParameter);
            }
        }
        return responseCharset;
    }
    /**
     * Parse content-type parameters. The format of this header is roughly :
     * {@code type/subtype; param1=value1; param2=value2 ...} where each of the
     * parameters are optional. Parsing is lenient, malformed parameters are ignored.
     *
     * Parameter keys & values are trimmed of whitespace and keys are converted to
     * lower case.
     */
    private static Map < String, String > parseContentTypeParameters(String contentTypeHeader) {
        Map < String, String > parameters = Collections.emptyMap();
        String[] fields = contentTypeHeader.split(";");
        if (fields.length > 1) {
            parameters = new HashMap < > ();
            // Ignore the first element in the array (the type/subtype).
            for (int i = 1; i < fields.length; ++i) {
                final String parameter = fields[i];
                if (!parameter.isEmpty()) {
                    final String[] components = parameter.split("=");
                    if (components.length != 2) {
                        continue;
                    }
                    final String key = components[0].trim().toLowerCase(Locale.US);
                    final String value = components[1].trim();
                    if (key.isEmpty() || value.isEmpty()) {
                        continue;
                    }
                    parameters.put(key, value);
                }
            }
        }
        return parameters;
    }

    public static boolean isCodecSupported(String name) {
        for (MediaCodecInfo codec : new MediaCodecList(MediaCodecList.REGULAR_CODECS).getCodecInfos())
            if (codec.getName().contains(name) && !codec.getName().contains("google"))
                return true;

        return false;
    }

    private static Charset mresponseCharset(String getContentType) {
        try {
            return responseCharset(getContentType);
        } catch (UnsupportedCharsetException e) {
            Log.i(TAG, "Unsupported response charset", e);
            return null;
        } catch (IllegalCharsetNameException e) {
            Log.i(TAG, "Illegal response charset", e);
            return null;
        }
    }

    private static String JsonObToString(int status, String responseText) {
        JSONObject ob = new JSONObject();
        try {
            ob.put("status", status);
            ob.put("responseText", responseText);
            return ob.toString();
        } catch (JSONException e) {
            Log.w(TAG, "JSONException ", e);
            return null;
        }
    }

    public static String mgetVideoQuality(SimpleExoPlayer player) {
        Format format = player.getVideoFormat();

        if (format == null) {
            return null;
        }

        return format.height + "p," + (format.frameRate == Format.NO_VALUE ? "," : Math.round(format.frameRate) + ",") + format.bitrate + "," +  mgetCodec(format.codecs);
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
                        buffer + 2500, //DEFAULT_MIN_BUFFER_MS
                        100000, //DEFAULT_MAX_BUFFER_MS
                        buffer, //DEFAULT_BUFFER_FOR_PLAYBACK_MS
                        buffer //DEFAULT_BUFFER_FOR_PLAYBACK_AFTER_REBUFFER_MS
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

    public static MediaSource buildMediaSource(Uri uri, DataSource.Factory dataSourceFactory, int mwhocall) {
        if (mwhocall < 3) return new HlsMediaSource.Factory(dataSourceFactory).setAllowChunklessPreparation(true).createMediaSource(uri);
        else return new ProgressiveMediaSource.Factory(dataSourceFactory, new Mp4ExtractorsFactory()).createMediaSource(uri);
    }

    //https://exoplayer.dev/shrinking.html
    private static class Mp4ExtractorsFactory implements ExtractorsFactory {
        @Override
        public Extractor[] createExtractors() {
            return new Extractor[]{new Mp4Extractor()};
        }
    }
}
