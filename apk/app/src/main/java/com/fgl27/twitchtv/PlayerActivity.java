package com.fgl27.twitchtv;

import android.app.Activity;
import android.graphics.Color;
import android.net.Uri;
import android.os.Handler;
import android.webkit.WebSettings;
import android.webkit.WebView;
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
import com.google.android.exoplayer2.PlaybackParameters;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.Timeline;
import com.google.android.exoplayer2.source.ExtractorMediaSource;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.TrackGroupArray;
import com.google.android.exoplayer2.source.dash.DashMediaSource;
import com.google.android.exoplayer2.source.hls.HlsMediaSource;
import com.google.android.exoplayer2.source.smoothstreaming.SsMediaSource;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.TrackSelectionArray;
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

    private String url;
    private AVLoadingIndicatorView loading;
    //private long resume;

    private final int DEFAULT_MIN_BUFFER_MS = 3500;
    private final int DEFAULT_MAX_BUFFER_MS = 60000;
    private final int DEFAULT_BUFFER_FOR_PLAYBACK_MS = DEFAULT_MIN_BUFFER_MS;
    private final int DEFAULT_BUFFER_FOR_PLAYBACK_AFTER_REBUFFER_MS = DEFAULT_MIN_BUFFER_MS;
    private final long DEFAULT_STARTING = 5000;//helps to prevet error/exception BehindLiveWindowException

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_player);
        if (getIntent() != null) {
            this.url = getIntent().getStringExtra("URL");
        }

        dataSourceFactory =
                new DefaultDataSourceFactory(
                        this, Util.getUserAgent(this, this.getString(R.string.app_name)));
        loading = findViewById(R.id.loading);
        simpleExoPlayerView = findViewById(R.id.player_view);
        shouldAutoPlay = true;

        WebView mwebview = (WebView) findViewById(R.id.WebView);
        mwebview.setBackgroundColor(Color.TRANSPARENT);
        WebSettings websettings = mwebview.getSettings();
        websettings.setJavaScriptEnabled(true);
        websettings.setDomStorageEnabled(true);

        websettings.setAllowFileAccess(true);
        websettings.setAllowContentAccess(true);
        websettings.setAllowFileAccessFromFileURLs(true);
        websettings.setAllowUniversalAccessFromFileURLs(true);
        //mwebview.loadUrl("file:///android_asset/index.html");
        mwebview.loadUrl("https://www.nightdev.com/hosted/obschat/?theme=bttv_blackchat&channel=cohhcarnage&fade=false&bot_activity=true&prevent_clipping=false");
    }

    private void initializePlayer() {
        simpleExoPlayerView.requestFocus();

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
    }

    private void releasePlayer() {
        if (player != null) {
            shouldAutoPlay = player.getPlayWhenReady();
            player.release();
            player = null;
            trackSelector = null;
        }
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
        }
        player.seekTo(DEFAULT_STARTING);
        player.setPlayWhenReady(shouldAutoPlay);
    }

    @Override
    public void onStart() {
        super.onStart();
        if (player == null) {
            initializePlayer();
        }
        player.seekTo(DEFAULT_STARTING);
        player.setPlayWhenReady(shouldAutoPlay);
    }

    @Override
    public void onPause() {
        super.onPause();
        //resume = player.getCurrentPosition();
    }

    public void onStop() {
        super.onStop();
        releasePlayer();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    @Override
    public void catchBufferPosition() {
        //        if(player != null) {
        //            if (player.getBufferedPosition() > 70000) {
        //                player.setPlayWhenReady(shouldAutoPlay);
        //            }
        //        }
    }

    // Internal methods.

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
