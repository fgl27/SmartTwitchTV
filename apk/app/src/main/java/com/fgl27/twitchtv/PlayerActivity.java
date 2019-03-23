package com.fgl27.twitchtv;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Color;
import android.net.Uri;
import android.os.Handler;
import android.view.KeyEvent;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.fgl27.twitchtv.listener.BandWidthListener;
import com.fgl27.twitchtv.listener.ViewControlInterface;
import com.google.android.exoplayer2.C;
import com.google.android.exoplayer2.DefaultLoadControl;
import com.google.android.exoplayer2.DefaultRenderersFactory;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.source.ExtractorMediaSource;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.dash.DashMediaSource;
import com.google.android.exoplayer2.source.hls.HlsMediaSource;
import com.google.android.exoplayer2.source.smoothstreaming.SsMediaSource;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.ui.PlayerView;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultBandwidthMeter;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.android.exoplayer2.util.Util;
import com.wang.avi.AVLoadingIndicatorView;

import static com.google.android.exoplayer2.Player.STATE_IDLE;
import static com.google.android.exoplayer2.Player.STATE_BUFFERING;
import static com.google.android.exoplayer2.Player.STATE_ENDED;
import static com.google.android.exoplayer2.Player.STATE_READY;

public class PlayerActivity extends Activity implements ViewControlInterface {
    private static final String TAG = PlayerActivity.class.getName();
    private PlayerView simpleExoPlayerView;
    private SimpleExoPlayer player;
    private DataSource.Factory dataSourceFactory;

    private DefaultTrackSelector trackSelector;
    private boolean shouldAutoPlay;

    public static String url;
    private AVLoadingIndicatorView loading;
    //private long resume;

    private final int DEFAULT_MIN_BUFFER_MS = 3500;
    private final int DEFAULT_MAX_BUFFER_MS = 60000;
    private final int DEFAULT_BUFFER_FOR_PLAYBACK_MS = DEFAULT_MIN_BUFFER_MS;
    private final int DEFAULT_BUFFER_FOR_PLAYBACK_AFTER_REBUFFER_MS = DEFAULT_MIN_BUFFER_MS;
    private final long DEFAULT_STARTING = 5000;//helps to prevet error/exception BehindLiveWindowException

    public WebView mwebview;
    public Context mcontext;
    public boolean onCreateReady;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreateReady before " + onCreateReady);
        if (!onCreateReady) {
            onCreateReady = true;
        Log.d(TAG, "onCreateReady " + onCreateReady);
            setContentView(R.layout.activity_player);
            this.url = "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/temp.mp4";

            dataSourceFactory =
                    new DefaultDataSourceFactory(
                            this, Util.getUserAgent(this, this.getString(R.string.app_name)));
            loading = findViewById(R.id.loading);
            hideLoading();
            simpleExoPlayerView = findViewById(R.id.player_view);
            shouldAutoPlay = false;

            mcontext = this;

            mwebview = (WebView) findViewById(R.id.WebView);
            mwebview.setBackgroundColor(Color.TRANSPARENT);
            WebSettings websettings = mwebview.getSettings();
            websettings.setJavaScriptEnabled(true);
            websettings.setDomStorageEnabled(true);

            websettings.setAllowFileAccess(true);
            websettings.setAllowContentAccess(true);
            websettings.setAllowFileAccessFromFileURLs(true);
            websettings.setAllowUniversalAccessFromFileURLs(true);

            mwebview.addJavascriptInterface(new WebAppInterface(this), "Android");
            //mwebview.loadUrl("file:///android_asset/index.html");
            mwebview.loadUrl("https://fgl27.github.io/SmartTwitchTV/release/index.min.html");
            mwebview.setWebViewClient(new WebViewClient() {
                public void onConsoleMessage(String message, int lineNumber, String sourceID) {
                    Log.d("MyApplication", message + " -- From line " +
                            lineNumber + " of " +
                            sourceID);
                }
            });
            mwebview.requestFocus();
        }
    }

    public class WebAppInterface {
        Context mwebContext;

        /** Instantiate the interface and set the context */
        WebAppInterface(Context c) {
            mwebContext = c;
        }

        /** Show a toast from the web page */
        @JavascriptInterface
        public void showToast(String toast) {
            Toast.makeText(mwebContext, toast, Toast.LENGTH_SHORT).show();
        }

        @JavascriptInterface
        public void startVideo(String videoAddress, String title, String description) {
            PlayerActivity.url = videoAddress;
            SendBroadcast("initializePlayerReceiver", mwebContext, true);
        }

        @JavascriptInterface
        public void stopVideo() {
            PlayerActivity.url = "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/temp.mp4";
            SendBroadcast("initializePlayerReceiver", mwebContext, false);
        }
    }

    public static void SendBroadcast(String action, Context context, boolean shouldAutoPlay) {
        final Intent NewIntent = new Intent();
        NewIntent.setAction(action);
        NewIntent.putExtra("shouldAutoPlay", shouldAutoPlay);
        context.sendBroadcast(NewIntent);
    }

    private final BroadcastReceiver initializePlayerReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            shouldAutoPlay = intent.getBooleanExtra("shouldAutoPlay", false);
            Log.d(TAG, "shouldAutoPlay " + shouldAutoPlay);
            initializePlayer();
        }
    };

    private void initializePlayer() {
        Log.d(TAG, "url " + url);
        if (player != null) {
            player.setPlayWhenReady(shouldAutoPlay);
            releasePlayer();
        }
        if (shouldAutoPlay) {
            showLoading();

            DefaultBandwidthMeter bandwidthMeter = new DefaultBandwidthMeter();
            bandwidthMeter.addEventListener(new Handler(), new BandWidthListener(this));

            trackSelector = new DefaultTrackSelector();
            trackSelector.setParameters(new DefaultTrackSelector.ParametersBuilder().build());

            player = ExoPlayerFactory.newSimpleInstance(this,
                    new DefaultRenderersFactory(this),
                    trackSelector,
                    new DefaultLoadControl.Builder()
                            .setBufferDurationsMs(
                                    DEFAULT_MIN_BUFFER_MS,
                                    DEFAULT_MAX_BUFFER_MS,
                                    DEFAULT_BUFFER_FOR_PLAYBACK_MS,
                                    DEFAULT_BUFFER_FOR_PLAYBACK_AFTER_REBUFFER_MS)
                            .createDefaultLoadControl(),
                    null,
                    bandwidthMeter);

            simpleExoPlayerView.setPlayer(player);

            MediaSource mediaSource = buildMediaSource(Uri.parse(url));
            player.seekTo(DEFAULT_STARTING);
            player.prepare(mediaSource, false, true);
            player.setPlayWhenReady(true);
            player.addListener(new Player.EventListener() {

                @Override
                public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {
                    Log.d(TAG, "on player state changed---" + playWhenReady + "--------" + playbackState + "-----get buffer position-----" + player.getBufferedPosition() + "------get real position-----" + player.getCurrentPosition());

                    if (playWhenReady) {
                        switch (playbackState) {
                            case STATE_IDLE:
                                break;
                            case STATE_BUFFERING:
                                showLoading();
                                break;
                            case STATE_READY:
                                hideLoading();
                                break;
                            case STATE_ENDED:
                                Toast.makeText(PlayerActivity.this, "Video Ended", Toast.LENGTH_SHORT).show();
                                Log.d(TAG, "Video Ended");
                                hideLoading();
                                break;
                        }
                    } else {
                        hideLoading();
                    }
                }

                @Override
                public void onPlayerError(ExoPlaybackException error) {
                    Log.d(TAG, "error " + error.getMessage());
                    Toast.makeText(PlayerActivity.this, error.getMessage(), Toast.LENGTH_SHORT).show();
                    player.prepare(mediaSource, false, true);
                }
            });
        } else {
            //Reset player background to a empty black screen
            player = ExoPlayerFactory.newSimpleInstance(this);
            simpleExoPlayerView.setPlayer(player);

            MediaSource mediaSource = buildMediaSource(Uri.parse(url));
            player.prepare(mediaSource, false, true);
            player.setPlayWhenReady(false);

            releasePlayer();
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
        loading.setVisibility(View.GONE);
    }


    private void showLoading() {
        loading.setVisibility(View.VISIBLE);
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (player == null) {
            initializePlayer();
        } else {
            player.seekTo(DEFAULT_STARTING);
            player.setPlayWhenReady(shouldAutoPlay);
        }

        mregisterReceiver();
        Log.d(TAG, "onResume");
    }

    @Override
    public void onPause() {
        super.onPause();
        munregisterReceiver();
        Log.d(TAG, "onPause");
        //resume = player.getCurrentPosition();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy");
        munregisterReceiver();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (event.getAction() == KeyEvent.ACTION_DOWN) {
            switch (keyCode) {
                case KeyEvent.KEYCODE_BACK:
                    mwebview.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_1));
                    return true;
            }

        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    public void catchBufferPosition() {
        //        if(player != null) {
        //            if (player.getBufferedPosition() > 70000) {
        //                player.setPlayWhenReady(shouldAutoPlay);
        //            }
        //        }
    }

    public void munregisterReceiver() {
        try {
            this.unregisterReceiver(initializePlayerReceiver);
        } catch (IllegalArgumentException ignored) {}
    }

    public void mregisterReceiver() {
        try {
            this.registerReceiver(initializePlayerReceiver, new IntentFilter("initializePlayerReceiver"));
        } catch (NullPointerException ignored) {}
    }

    public void onStop() {
        super.onStop();
        releasePlayer();
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
}
