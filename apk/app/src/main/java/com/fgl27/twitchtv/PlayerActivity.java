package com.fgl27.twitchtv;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Color;
import android.net.Uri;
import android.view.KeyEvent;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.google.android.exoplayer2.C;
import com.google.android.exoplayer2.DefaultLoadControl;
import com.google.android.exoplayer2.DefaultRenderersFactory;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.mediacodec.MediaCodecRenderer.DecoderInitializationException;
import com.google.android.exoplayer2.mediacodec.MediaCodecUtil.DecoderQueryException;
import com.google.android.exoplayer2.source.BehindLiveWindowException;
import com.google.android.exoplayer2.source.ExtractorMediaSource;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.dash.DashMediaSource;
import com.google.android.exoplayer2.source.hls.HlsMediaSource;
import com.google.android.exoplayer2.source.smoothstreaming.SsMediaSource;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.ui.PlayerView;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultAllocator;
import com.google.android.exoplayer2.upstream.DefaultBandwidthMeter;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.android.exoplayer2.util.Util;
import com.wang.avi.AVLoadingIndicatorView;

import static com.google.android.exoplayer2.Player.STATE_IDLE;
import static com.google.android.exoplayer2.Player.STATE_BUFFERING;
import static com.google.android.exoplayer2.Player.STATE_ENDED;
import static com.google.android.exoplayer2.Player.STATE_READY;

public class PlayerActivity extends Activity {
    //private static final String TAG = PlayerActivity.class.getName();
    private PlayerView simpleExoPlayerView;
    public static SimpleExoPlayer player;
    private DataSource.Factory dataSourceFactory;
    private static final DefaultBandwidthMeter BANDWIDTH_METER = new DefaultBandwidthMeter();

    private DefaultTrackSelector trackSelector;
    private boolean shouldAutoPlay;

    private int mResumeWindow;
    private long mResumePosition;

    public static String url;
    private AVLoadingIndicatorView loading;

    public WebView mwebview;
    public Context mcontext;
    public boolean onCreateReady;
    public boolean alredystarted;
    private boolean loadingcanshow;
    public int mwhocall = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (!onCreateReady) {
            onCreateReady = true;
            setContentView(R.layout.activity_player);
            url = "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/temp.mp4";

            dataSourceFactory =
                    new DefaultDataSourceFactory(
                            this, Util.getUserAgent(this, this.getString(R.string.app_name)));
            loading = findViewById(R.id.loading);
            hideLoading();
            simpleExoPlayerView = findViewById(R.id.player_view);
            shouldAutoPlay = false;

            mcontext = this;
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
                    getLoadControl(),
                    null,
                    BANDWIDTH_METER);

            simpleExoPlayerView.setPlayer(player);

            MediaSource mediaSource = buildMediaSource(Uri.parse(url));

            if (mResumeWindow != C.INDEX_UNSET) {
                player.seekTo(mResumePosition);
            }

            //player.seekTo(useDEfaultStart ? DEFAULT_STARTING : 0);
            player.prepare(mediaSource, false, true);
            player.setPlayWhenReady(true);
            player.addListener(PlayerEvent());
        } else {
            //Reset player background to a empty black screen
            player = ExoPlayerFactory.newSimpleInstance(this);
            simpleExoPlayerView.setPlayer(player);

            MediaSource mediaSource = buildMediaSource(Uri.parse(url));
            player.prepare(mediaSource, false, true);
            player.setPlayWhenReady(false);

            releasePlayer();
            clearResumePosition();
            hideLoading();
        }
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
        loading.setVisibility(View.GONE);
    }

    private void showLoading(boolean runnow) {
        if (runnow) loading.setVisibility(View.VISIBLE);
        else {
            new java.util.Timer().schedule(
                    new java.util.TimerTask() {
                        @Override
                        public void run() {
                            if (loadingcanshow) loading.setVisibility(View.VISIBLE);
                        }
                    },
                    500
            );
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        mregisterReceiver();
    }

    //This function is called when overview key is pressed
    @Override
    public void onPause() {
        super.onPause();
        munregisterReceiver();
    }
    //This function is called when home key is pressed
    public void onStop() {
        super.onStop();
        munregisterReceiver();
        updateResumePosition();
        releasePlayer();
    }

    //This function is called when TV wakes up
    public void onStart() {
        super.onStart();
        if (mwebview != null && alredystarted) mwebview.loadUrl("javascript:Play_CheckResume()");
        alredystarted = true;
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        releasePlayer();
        munregisterReceiver();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (event.getAction() == KeyEvent.ACTION_DOWN) {
            switch (keyCode) {
                case KeyEvent.KEYCODE_BACK:
                    mwebview.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_1));
                    mwebview.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_1));
                    return true;
            }

        }
        return super.onKeyDown(keyCode, event);
    }

    public void munregisterReceiver() {
        try {
            this.unregisterReceiver(initializePlayerReceiver);
            this.unregisterReceiver(showBufferReceiver);
        } catch (IllegalArgumentException ignored) {}
    }

    public void mregisterReceiver() {
        try {
            this.registerReceiver(initializePlayerReceiver, new IntentFilter("initializePlayerReceiver"));
            this.registerReceiver(showBufferReceiver, new IntentFilter("showBufferReceiver"));
        } catch (NullPointerException ignored) {}
    }

    /**
     * Increase player's min/max buffer size to 60 secs
     * @return load control
     */
    private DefaultLoadControl getLoadControl() {
        return new DefaultLoadControl.Builder()
                .setAllocator(new DefaultAllocator(true, C.DEFAULT_BUFFER_SEGMENT_SIZE))
                .setBufferDurationsMs(
                        DefaultLoadControl.DEFAULT_MIN_BUFFER_MS * 4,
                        DefaultLoadControl.DEFAULT_MAX_BUFFER_MS * 2,
                        DefaultLoadControl.DEFAULT_BUFFER_FOR_PLAYBACK_MS,
                        DefaultLoadControl.DEFAULT_BUFFER_FOR_PLAYBACK_AFTER_REBUFFER_MS
                )
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
        mResumeWindow = C.INDEX_UNSET;
        mResumePosition = C.TIME_UNSET;
    }

    protected void updateResumePosition() {
        if (player == null) {
            return;
        }

        mResumeWindow = player.getCurrentWindowIndex();
        mResumePosition = player.isCurrentWindowSeekable() ? Math.max(0, player.getCurrentPosition()) : C.TIME_UNSET;
    }

    private MediaSource buildMediaSource(Uri uri) {
        @C.ContentType int type = Util.inferContentType(uri);
        switch (type) {
            case C.TYPE_DASH:
                return new DashMediaSource.Factory(dataSourceFactory).createMediaSource(uri);
            case C.TYPE_SS:
                return new SsMediaSource.Factory(dataSourceFactory).createMediaSource(uri);
            case C.TYPE_HLS:
                return new HlsMediaSource.Factory(dataSourceFactory).createMediaSource(uri);
            case C.TYPE_OTHER:
                return new ExtractorMediaSource.Factory(dataSourceFactory).createMediaSource(uri);
            default:
                throw new IllegalStateException("Unsupported type: " + type);
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
        mwebview.clearCache(true);

        //mwebview.loadUrl("file:///android_asset/index.html");
        mwebview.loadUrl("https://fgl27.github.io/SmartTwitchTV/release/index.min.html");

        mwebview.addJavascriptInterface(new WebAppInterface(this), "Android");

        mwebview.setWebViewClient(new WebViewClient() {
            @SuppressWarnings("unused")//called by JS
            public void onConsoleMessage(String message, int lineNumber, String sourceID) {
                Log.d("MyApplication", message + " -- From line " +
                        lineNumber + " of " +
                        sourceID);
            }
        });
        mwebview.requestFocus();
    }

    public class WebAppInterface {
        Context mwebContext;

        /** Instantiate the interface and set the context */
        WebAppInterface(Context c) {
            mwebContext = c;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mshowLoading(boolean show) {
            final Intent NewIntent = new Intent();
            NewIntent.setAction("showBufferReceiver");
            NewIntent.putExtra("show", show);
            mwebContext.sendBroadcast(NewIntent);
        }

        /** Show a toast from the web page */
        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void showToast(String toast) {
            Toast.makeText(mwebContext, toast, Toast.LENGTH_SHORT).show();
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void startVideo(String videoAddress, int whocall) {
            PlayerActivity.url = videoAddress;
            SendBroadcast("initializePlayerReceiver", mwebContext, true, whocall, 0);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void startVideoOffset(String videoAddress, int whocall, long position) {
            PlayerActivity.url = videoAddress;
            SendBroadcast("initializePlayerReceiver", mwebContext, true, whocall, position);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void stopVideo(int whocall) {
            PlayerActivity.url = "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/temp.mp4";
            SendBroadcast("initializePlayerReceiver", mwebContext, false, whocall, 0);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public long gettime() {
            if (PlayerActivity.player != null) return PlayerActivity.player.getCurrentPosition();
            return 0;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void play(boolean play) {
            if (PlayerActivity.player != null) player.setPlayWhenReady(play);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public boolean getPlaybackState() {
            if (PlayerActivity.player != null) return player.getPlayWhenReady();
            return false;
        }
    }

    public static void SendBroadcast(String action, Context context, boolean shouldAutoPlay,
                                     int whocall, long position) {
        final Intent NewIntent = new Intent();
        NewIntent.setAction(action);
        NewIntent.putExtra("shouldAutoPlay", shouldAutoPlay);
        NewIntent.putExtra("whocall", whocall);
        NewIntent.putExtra("position", position);
        context.sendBroadcast(NewIntent);
    }

    private final BroadcastReceiver initializePlayerReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            shouldAutoPlay = intent.getBooleanExtra("shouldAutoPlay", false);
            mwhocall = intent.getIntExtra("whocall", 1);
            long mPosition = intent.getLongExtra("position", 0);
            if (mPosition > 0) {
                mResumeWindow = 1;
                mResumePosition = mPosition;
            }
            initializePlayer();
        }
    };

    private final BroadcastReceiver showBufferReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (intent.getBooleanExtra("show", false)) showLoading(true);
            else hideLoading();
        }
    };

    public Player.EventListener PlayerEvent() {
        return new Player.EventListener() {

            @Override
            public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {
                //Log.d(TAG, "on player state changed---" + playWhenReady + "--------" + playbackState + "-----get buffer position-----" + player.getBufferedPosition() + "------get real position-----" + player.getCurrentPosition());
                if (playWhenReady) {
                    switch (playbackState) {
                        case STATE_IDLE:
                            break;
                        case STATE_BUFFERING:
                            loadingcanshow = true;
                            showLoading(false);
                            break;
                        case STATE_READY:
                            hideLoading();
                            break;
                        case STATE_ENDED:
                            //Toast.makeText(PlayerActivity.this, "Video Ended", Toast.LENGTH_SHORT).show();
                            //Log.d(TAG, "Video Ended");
                            hideLoading();
                            mwebview.loadUrl("javascript:Play_PannelEndStart(" + mwhocall + ")");
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
}
