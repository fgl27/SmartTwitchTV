//adapt part of the player from https://github.com/yuliskov/SmartYouTubeTV

package com.fgl27.twitch;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.media.MediaCodecInfo;
import android.media.MediaCodecList;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.Toast;

import com.fgl27.twitch.helpers.ResponseUtils;
import com.fgl27.twitch.helpers.Streams;
import com.google.android.exoplayer2.C;
import com.google.android.exoplayer2.DefaultLoadControl;
import com.google.android.exoplayer2.DefaultRenderersFactory;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.Format;
import com.google.android.exoplayer2.PlaybackParameters;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.extractor.Extractor;
import com.google.android.exoplayer2.extractor.ExtractorsFactory;
import com.google.android.exoplayer2.extractor.mp4.Mp4Extractor;
import com.google.android.exoplayer2.mediacodec.MediaCodecRenderer.DecoderInitializationException;
import com.google.android.exoplayer2.mediacodec.MediaCodecUtil.DecoderQueryException;
import com.google.android.exoplayer2.source.BehindLiveWindowException;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.ProgressiveMediaSource;
import com.google.android.exoplayer2.source.dash.DashMediaSource;
import com.google.android.exoplayer2.source.hls.HlsMediaSource;
import com.google.android.exoplayer2.source.smoothstreaming.SsMediaSource;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.ui.PlayerView;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultAllocator;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.android.exoplayer2.util.Util;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.charset.IllegalCharsetNameException;
import java.nio.charset.UnsupportedCharsetException;

public class PlayerActivity extends Activity {
    private static final String TAG = PlayerActivity.class.getName();

    private static final String CLIENTIDHEADER = "Client-ID";
    private static final String CLIENTID = "5seja5ptej058mxqy7gh5tcudjqtm9";

    private static final String ACCEPTHEADER = "Accept";
    private static final String TWITHCV5JSON = "application/vnd.twitchtv.v5+json";

    private static final String AUTHORIZATION = "Authorization";

    public static int[] BUFFER_SIZE = {4000, 4000, 4000, 4000};//Default, live, vod, clips
    private static final String[] codecNames = {"avc", "vp9", "mp4a"};

    private PlayerView simpleExoPlayerView;
    public static SimpleExoPlayer player;
    private DataSource.Factory dataSourceFactory;

    private DefaultTrackSelector trackSelector;
    private boolean shouldAutoPlay;

    //private int mResumeWindow;
    private long mResumePosition;

    public static String url;
    private MediaSource mediaSourceAuto = null;
    private MediaSource TempmediaSourceAuto;

    private ImageView spinner;
    private Animation rotation;

    public WebView mwebview;
    public boolean onCreateReady;
    public boolean alredystarted;
    private boolean loadingcanshow;
    public int mwhocall = 1;
    private int heightDefault = 0;
    private int mwidthDefault = 0;
    private int heightChat = 0;
    private int mwidthChat = 0;

    public Handler myHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (!onCreateReady) {
            onCreateReady = true;
            setContentView(R.layout.activity_player);
            url = "file:///android_asset/temp.mp4";

            myHandler = new Handler(Looper.getMainLooper());

            dataSourceFactory =
                    new DefaultDataSourceFactory(
                            this, Util.getUserAgent(this, this.getString(R.string.app_name)));

            spinner = findViewById(R.id.spinner);
            rotation = AnimationUtils.loadAnimation(this, R.anim.rotation);

            hideLoading();

            simpleExoPlayerView = findViewById(R.id.player_view);
            shouldAutoPlay = false;

            initializeWebview();
        }
    }

    private void initializePlayer() {
        if (player != null) {
            player.setPlayWhenReady(shouldAutoPlay);
            releasePlayer();
        }
        if (shouldAutoPlay) {
            showLoading(true);


            trackSelector = new DefaultTrackSelector();
            trackSelector.setParameters(new DefaultTrackSelector.ParametersBuilder().build());

            player = ExoPlayerFactory.newSimpleInstance(
                    this,
                    new DefaultRenderersFactory(this),
                    trackSelector,
                    getLoadControl());

            simpleExoPlayerView.setPlayer(player);

            player.addListener(PlayerEvent());
            player.setPlayWhenReady(true);

            //We are sekking from js or the updateResumePosition() saved the postion onStop
            if (mResumePosition > 0 && mwhocall > 1) {
                player.seekTo(mResumePosition);
            }

            player.prepare(mediaSourceAuto != null ? mediaSourceAuto : buildMediaSource(Uri.parse(url)), false, true);
        } else {
            //Reset player background to a empty black screen
            player = ExoPlayerFactory.newSimpleInstance(this);
            simpleExoPlayerView.setPlayer(player);

            player.setPlayWhenReady(false);
            player.prepare(buildMediaSource(Uri.parse(url)), false, true);

            releasePlayer();
            clearResumePosition();
            hideLoading();
        }
    }

    private void PreinitializePlayer(MediaSource mediaSource, String videoAddress, int whocall, long position, boolean mshouldAutoPlay) {

        mediaSourceAuto = mediaSource;
        PlayerActivity.url = videoAddress;
        shouldAutoPlay = mshouldAutoPlay;
        mwhocall = whocall;
        //We are sekking from js
        if (position > 0) mResumePosition = position;

        initializePlayer();
    }

    private void releasePlayer() {
        if (player != null) {
            shouldAutoPlay = player.getPlayWhenReady();
            player.release();
            player = null;
            trackSelector = null;
        }
        hideLoading();
    }

    private void hideLoading() {
        loadingcanshow = false;
        spinner.setVisibility(View.GONE);
        spinner.clearAnimation();
    }

    private void updatesize(boolean sizechat) {
        if (heightDefault == 0) {
            heightDefault = simpleExoPlayerView.getHeight();
            mwidthDefault = simpleExoPlayerView.getWidth();

            heightChat = (int) (heightDefault * 0.75);
            mwidthChat = (int) (mwidthDefault * 0.75);
        }

        if (sizechat)
            simpleExoPlayerView.setLayoutParams(new FrameLayout.LayoutParams(mwidthChat, heightChat, Gravity.CENTER_VERTICAL));
        else
            simpleExoPlayerView.setLayoutParams(new FrameLayout.LayoutParams(mwidthDefault, heightDefault, Gravity.TOP));
    }

    private void showLoading(boolean runnow) {
        if (runnow) showLoading();
        else {
            //Add a delay to prevent "short blink" ladings, can happen sporadic or right before STATE_ENDED
            myHandler.postDelayed(() -> {
                if (loadingcanshow) showLoading();
            }, 650);
        }
    }

    private void showLoading() {
        if (spinner.getVisibility() != View.VISIBLE) {
            // The duration of the spin is 1s, reset every show to use the spin as a performance counter
            // to know how much time takes to load
            spinner.startAnimation(rotation);
            spinner.setVisibility(View.VISIBLE);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (player == null && shouldAutoPlay && mwebview != null && alredystarted) {
            mwebview.loadUrl("javascript:Play_CheckResume()");
        }
        alredystarted = true;
    }

    //This function is called when overview key is pressed
    @Override
    public void onPause() {
        super.onPause();
    }

    //This function is called when home key is pressed
    @Override
    public void onStop() {
        super.onStop();
        updateResumePosition();
        releasePlayer();
    }

    //This function is called when TV wakes up
    @Override
    public void onStart() {
        super.onStart();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        releasePlayer();
    }

    private void closeThis() {
        finishAndRemoveTask();
    }

    private void minimizeThis() {
        this.moveTaskToBack(true);
    }

    //https://android-developers.googleblog.com/2009/12/back-and-other-hard-keys-three-stories.html
    @Override
    public boolean onKeyLongPress(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            closeThis();
            return true;
        }
        return super.onKeyLongPress(keyCode, event);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && event.isTracking()
                && !event.isCanceled()) {
            // if the call key is being released, AND we are tracking
            // it from an initial key down, AND it is not canceled,
            // then handle it.
            mwebview.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_1));
            mwebview.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_1));
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            // this tells the framework to start tracking for
            // a long press and eventual key up.  it will only
            // do so if this is the first down (not a repeat).
            event.startTracking();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    /**
     * Increase player's min/max buffer sizes
     *
     * @return load control
     */
    private DefaultLoadControl getLoadControl() {
        return new DefaultLoadControl.Builder()
                .setAllocator(new DefaultAllocator(true, C.DEFAULT_BUFFER_SEGMENT_SIZE))
                .setBufferDurationsMs(
                        60000, //DEFAULT_MIN_BUFFER_MS
                        120000, //DEFAULT_MAX_BUFFER_MS
                        BUFFER_SIZE[mwhocall], //DEFAULT_BUFFER_FOR_PLAYBACK_MS
                        BUFFER_SIZE[mwhocall] //DEFAULT_BUFFER_FOR_PLAYBACK_AFTER_REBUFFER_MS
                )
                .setTargetBufferBytes(C.LENGTH_UNSET)
                .setPrioritizeTimeOverSizeThresholds(true)
                .createDefaultLoadControl();
    }

    private static boolean isBehindLiveWindow(ExoPlaybackException e) {
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

    protected void clearResumePosition() {
        //mResumeWindow = C.INDEX_UNSET;
        mResumePosition = C.TIME_UNSET;
    }

    protected void updateResumePosition() {
        if (player == null) {
            return;
        }

        //mResumeWindow = player.getCurrentWindowIndex();
        mResumePosition = player.isCurrentWindowSeekable() ? Math.max(0, player.getCurrentPosition()) : C.TIME_UNSET;
    }

    private MediaSource buildMediaSource(Uri uri) {
        @C.ContentType int type = Util.inferContentType(uri);
        switch (type) {
            case C.TYPE_HLS:
                return new HlsMediaSource.Factory(dataSourceFactory)
                        .setAllowChunklessPreparation(true).createMediaSource(uri);
            case C.TYPE_OTHER:
                return new ProgressiveMediaSource.Factory(dataSourceFactory, new Mp4ExtractorsFactory()).createMediaSource(uri);
            case C.TYPE_DASH:
                return new DashMediaSource.Factory(dataSourceFactory).createMediaSource(uri);
            case C.TYPE_SS:
                return new SsMediaSource.Factory(dataSourceFactory).createMediaSource(uri);
            default:
                throw new IllegalStateException("Unsupported type: " + type);
        }
    }

    //https://exoplayer.dev/shrinking.html
    private class Mp4ExtractorsFactory implements ExtractorsFactory {
        @Override
        public Extractor[] createExtractors() {
            return new Extractor[]{new Mp4Extractor()};
        }
    }

    private void initializeWebview() {
        mwebview = findViewById(R.id.WebView);
        mwebview.setBackgroundColor(Color.TRANSPARENT);
        WebSettings websettings = mwebview.getSettings();
        websettings.setJavaScriptEnabled(true);
        websettings.setDomStorageEnabled(true);

        websettings.setAllowFileAccess(true);
        websettings.setAllowContentAccess(true);
        websettings.setAllowFileAccessFromFileURLs(true);
        websettings.setAllowUniversalAccessFromFileURLs(true);
        websettings.setCacheMode(WebSettings.LOAD_NO_CACHE);

        mwebview.clearCache(true);
        mwebview.clearHistory();

        //To load page from assets
        //mwebview.loadUrl("file:///android_asset/index.html");
        //To load page from githubio
        mwebview.loadUrl("https://fgl27.github.io/SmartTwitchTV/release/index.min.html");

        mwebview.addJavascriptInterface(new WebAppInterface(this), "Android");

        mwebview.setWebViewClient(new WebViewClient() {
            @SuppressWarnings("unused")//called by JS
            public void onConsoleMessage(String message, int lineNumber, String sourceID) {
                Log.d(TAG, message + " -- From line " +
                        lineNumber + " of " +
                        sourceID);
            }
        });
        mwebview.requestFocus();
    }

    public class WebAppInterface {
        final Context mwebContext;

        /**
         * Instantiate the interface and set the context
         */
        WebAppInterface(Context context) {
            mwebContext = context;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mshowLoading(boolean show) {
            myHandler.post(() -> {
                if (show) showLoading(true);
                else hideLoading();
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mclose(boolean close) {
            myHandler.post(() -> {
                if (close) closeThis();
                else minimizeThis();
            });
        }

        /**
         * Show a toast from the web page
         */
        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void showToast(String toast) {
            myHandler.post(() -> Toast.makeText(mwebContext, toast, Toast.LENGTH_SHORT).show());
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mupdatesize(boolean sizechat) {
            myHandler.post(() -> updatesize(sizechat));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void startVideo(String videoAddress, int whocall) {
            myHandler.post(() -> PreinitializePlayer(null, videoAddress, whocall, -1, true));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void startVideoOffset(String videoAddress, int whocall, long position) {
            myHandler.post(() -> PreinitializePlayer(null, videoAddress, whocall, position, true));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void SetAuto(String url) {
            //The token expires in 15 min so we need to set the mediaSource in case we use it in the future
            TempmediaSourceAuto = buildMediaSource(Uri.parse(url));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void StartAuto(int whocall, long position) {
            myHandler.post(() -> PreinitializePlayer(TempmediaSourceAuto, "", whocall, position, true));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void stopVideo(int whocall) {
            myHandler.post(() -> PreinitializePlayer(null, "file:///android_asset/temp.mp4", mwhocall, -1, false));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public long getsavedtime() {
            return mResumePosition;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public long gettime() {
            if (PlayerActivity.player != null) return PlayerActivity.player.getCurrentPosition();
            return 0;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public int getAndroid() {
            return 1;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String mreadUrl(String urlString, int timeout, int HeaderQuantity, String access_token) {
            return readUrl(urlString, timeout, HeaderQuantity, access_token, false);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String mreadUrl(String urlString, int timeout, int HeaderQuantity, String access_token, boolean post) {
            return readUrl(urlString, timeout, HeaderQuantity, access_token, post);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void play(boolean play) {
            if (player != null) player.setPlayWhenReady(play);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public boolean getPlaybackState() {
            if (player != null) return player.getPlayWhenReady();
            return false;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void setPlaybackSpeed(float value) {
            if (player != null) player.setPlaybackParameters(new PlaybackParameters(value, 1.0f));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void SetBuffer(int whocall, int value) {
            BUFFER_SIZE[whocall] = value;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String getversion() {
            return BuildConfig.VERSION_NAME;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void clearCookie() {
            CookieManager.getInstance().removeAllCookies(null);
            CookieManager.getInstance().flush();
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public boolean misCodecSupported() {
            return isCodecSupported("vp9");
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String getVideoQuality() {
            if (player != null) return mgetVideoQuality(player);
            else return null;
        }
    }

    public Player.EventListener PlayerEvent() {
        return new Player.EventListener() {

            @Override
            public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {
                if (playWhenReady) {
                    switch (playbackState) {
                        case Player.STATE_IDLE:
                            break;
                        case Player.STATE_BUFFERING:
                            loadingcanshow = true;
                            showLoading(false);
                            break;
                        case Player.STATE_READY:
                            hideLoading();
                            if (player != null)
                                mwebview.loadUrl("javascript:Play_UpdateDuration(" +
                                        mwhocall + "," + player.getDuration() + ")");
                            break;
                        case Player.STATE_ENDED:
                            hideLoading();
                            mwebview.loadUrl("javascript:Play_PannelEndStart(" + mwhocall + ")");
                            break;
                        default:
                            break;
                    }
                } else {
                    hideLoading();
                }
            }

            @Override
            public void onPlayerError(ExoPlaybackException e) {
                String errorString = null;

                if (e.type == ExoPlaybackException.TYPE_RENDERER) {
                    Exception cause = e.getRendererException();
                    if (cause instanceof DecoderInitializationException) {
                        // Special case for decoder initialization failures.
                        DecoderInitializationException decoderInitializationException = (DecoderInitializationException) cause;
                        if (decoderInitializationException.decoderName == null) {
                            if (decoderInitializationException.getCause() instanceof DecoderQueryException) {
                                errorString = getString(R.string.error_querying_decoders);
                            } else if (decoderInitializationException.secureDecoderRequired) {
                                errorString = getString(R.string.error_no_secure_decoder, decoderInitializationException.mimeType);
                            } else {
                                errorString = getString(R.string.error_no_decoder, decoderInitializationException.mimeType);
                            }
                        } else {
                            errorString = getString(R.string.error_instantiating_decoder, decoderInitializationException.decoderName);
                        }
                    }
                }

                if (errorString != null) {
                    Toast.makeText(PlayerActivity.this, errorString, Toast.LENGTH_SHORT).show();
                }

                if (isBehindLiveWindow(e)) clearResumePosition();
                else updateResumePosition();

                initializePlayer();
            }
        };
    }

    //TODO try a asynchronous one
    //This isn't asynchronous it will freeze js, so in function that proxy is not need and we don't wanna the freeze
    //use default js XMLHttpRequest
    public String readUrl(String urlString, int timeout, int HeaderQuantity, String access_token, boolean post) {
        try {
            HttpURLConnection urlConnection = (HttpURLConnection) new URL(urlString).openConnection();

            //Default header for all actions
            if (HeaderQuantity > 0) urlConnection.setRequestProperty(CLIENTIDHEADER, CLIENTID);
            //Header TWITHCV5 to load all screens and some stream info
            if (HeaderQuantity > 1) urlConnection.setRequestProperty(ACCEPTHEADER, TWITHCV5JSON);
            //Header to access User VOD screen
            if (HeaderQuantity > 2) urlConnection.setRequestProperty(AUTHORIZATION, access_token);

            urlConnection.setConnectTimeout(timeout);

            if (post) {
                urlConnection.setRequestMethod("POST");
                urlConnection.setDoOutput(true);
            }

            int status = urlConnection.getResponseCode();

            if (status != -1) {
                if (status == 401 || status == 403 || status == 404) return JsonObToString(status, "expired_or_offline");

                //TODO findout what is crashing when the status is 401 or 403
                // probably null mresponseCharset resolved bellow

                final Charset mresponseCharset;
                mresponseCharset = responseCharset(urlConnection.getContentType());

                if (mresponseCharset != null) {
                    byte[] responseBytes = Streams.readFully(urlConnection.getInputStream());
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

    public boolean isCodecSupported(String name) {
        for (MediaCodecInfo codec : new MediaCodecList(MediaCodecList.REGULAR_CODECS).getCodecInfos())
            if (codec.getName().contains(name) && !codec.getName().contains("google"))
                return true;

        return false;
    }

    public Charset responseCharset(String getContentType) {
        try {
            return ResponseUtils.responseCharset(getContentType);
        } catch (UnsupportedCharsetException e) {
            Log.i(TAG, "Unsupported response charset", e);
            return null;
        } catch (IllegalCharsetNameException e) {
            Log.i(TAG, "Illegal response charset", e);
            return null;
        }
    }

    public String JsonObToString(int status, String responseText) {
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

    public String mgetVideoQuality(SimpleExoPlayer player) {
        Format format = player.getVideoFormat();

        if (format == null) {
            return null;
        }

        return format.height + "p," + (format.frameRate == Format.NO_VALUE ? "," : Math.round(format.frameRate) + ",") + format.bitrate + "," +  mgetCodec(format.codecs);
    }

    public String mgetCodec(String codec) {
        for (String codecName : codecNames) {
            if (codec.contains(codecName)) {
                return codecName;
            }
        }

        return codec;
    }
}
