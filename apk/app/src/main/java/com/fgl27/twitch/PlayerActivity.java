//adapt part of the player from https://github.com/yuliskov/SmartYouTubeTV

package com.fgl27.twitch;

import android.app.Activity;
import android.content.Context;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.Point;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.Display;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.google.android.exoplayer2.C;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.LoadControl;
import com.google.android.exoplayer2.PlaybackParameters;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.analytics.AnalyticsListener;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.ui.PlayerView;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.android.exoplayer2.util.Util;

import java.util.Locale;

public class PlayerActivity extends Activity {
    public static final String TAG = PlayerActivity.class.getName();
    private static final int[] positions = {
            Gravity.RIGHT | Gravity.BOTTOM,
            Gravity.RIGHT | Gravity.CENTER,
            Gravity.RIGHT | Gravity.TOP,
            Gravity.CENTER | Gravity.TOP,
            Gravity.LEFT | Gravity.TOP,
            Gravity.LEFT | Gravity.CENTER,
            Gravity.LEFT | Gravity.BOTTOM,
            Gravity.CENTER | Gravity.BOTTOM};

    public int[] BUFFER_SIZE = {4000, 4000, 4000, 4000};//Default, live, vod, clips

    public int DefaultPositions = 0;

    public PlayerView[] PlayerView = new PlayerView[2];
    public SimpleExoPlayer[] player = new SimpleExoPlayer[2];
    public DataSource.Factory dataSourceFactory;

    public DefaultTrackSelector[] trackSelector = new DefaultTrackSelector[2];

    public DefaultTrackSelector.Parameters trackSelectorParameters;
    public DefaultTrackSelector.Parameters trackSelectorParametersSmall;
    public int mainPlayerBandwidth = Integer.MAX_VALUE;
    public int smallPlayerBandwidth = 3000000;

    private LoadControl[] loadControl = new LoadControl[4];

    public long mResumePosition;
    public int mwhocall = 1;

    private Uri uri;
    private MediaSource mediaurireset;

    //The mediaSources stored to be used when changing from auto to source 720 etc etc
    public MediaSource[] mediaSourcesAuto = new MediaSource[2];
    public long[] expires = new long[2];

    //The mediaSources that the player usesreceives mediaSourcesAuto or null if null we know that we aren't in auto mode
    public MediaSource[] mediaSourcePlaying = new MediaSource[2];

    private FrameLayout.LayoutParams PlayerViewDefaultSize;
    private FrameLayout.LayoutParams PlayerViewDefaultSizeChat;
    private FrameLayout.LayoutParams PlayerViewSmallSize;
    private FrameLayout.LayoutParams PlayerViewDefaultSizePP;
    private FrameLayout.LayoutParams PlayerViewDefaultSizeChatPP;
    private FrameLayout VideoHolder;

    public WebView mwebview;

    private boolean onCreateReady;
    public boolean PicturePicture;

    public int heightDefault = 0;
    public int mwidthDefault = 0;
    public int heightChat = 0;
    public int mwidthChat = 0;

    public int mainPlayer = 0;
    public int playerDivider = 3;
    public int AudioSource = 1;

    public Handler myHandler;
    public Handler[] PlayerCheckHandler = new Handler[2];
    public int[] PlayerCheckCounter = new int[2];

    private ProgressBar[] loadingView = new ProgressBar[3];

    public int[] droppedFrames = new int[2];
    public long[] conSpeed = new long[2];
    public long[] netActivity = new long[2];

    public long droppedFramesTotal = 0L;
    public float conSpeedAVG = 0f;
    public float netActivityAVG = 0f;
    public long netcounter = 0L;
    public long speedcounter = 0L;

    private boolean alredystarted;
    private boolean shouldCallJavaCheck;
    public boolean IsIN5050 = false;
    public boolean mLowLatency = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //On create is called onResume so prevent it if already set
        if (!onCreateReady) {
            onCreateReady = true;
            setContentView(R.layout.activity_player);

            myHandler = new Handler(Looper.getMainLooper());
            PlayerCheckHandler[0] = new Handler(Looper.getMainLooper());
            PlayerCheckHandler[1] = new Handler(Looper.getMainLooper());

            dataSourceFactory =
                    new DefaultDataSourceFactory(
                            this,
                            Util.getUserAgent(this, this.getString(R.string.app_name)));

            trackSelectorParameters = DefaultTrackSelector.Parameters.getDefaults(this);

            // Prevent small window causing lag to the device
            // Bitrates bigger then 8Mbs on two simultaneous video playback side by side can slowdown some devices
            // even though that device can play a 2160p60 at 30+Mbs on a single playback without problem
            trackSelectorParametersSmall = trackSelectorParameters
                    .buildUpon()
                    .setMaxVideoBitrate(smallPlayerBandwidth)
                    .build();

            trackSelectorParameters = trackSelectorParameters
                    .buildUpon()
                    .setMaxVideoBitrate(mainPlayerBandwidth)
                    .build();

            mediaurireset = Tools.buildMediaSource(Uri.parse("file:///android_asset/temp.mp4"),
                    dataSourceFactory,
                    3,
                    false);

            VideoHolder = findViewById(R.id.videoholder);

            loadingView[2] = findViewById(R.id.loading);

            PlayerView[0] = findViewById(R.id.player_view);
            PlayerView[1] = findViewById(R.id.player_view2);
            PlayerView[1].setVisibility(View.GONE);

            loadingView[0] = PlayerView[0].findViewById(R.id.exo_buffering);
            loadingView[0].setIndeterminateTintList(ColorStateList.valueOf(Color.WHITE));
            loadingView[0].setBackgroundResource(R.drawable.shadow);

            loadingView[1] = PlayerView[1].findViewById(R.id.exo_buffering);
            loadingView[1].setIndeterminateTintList(ColorStateList.valueOf(Color.WHITE));
            loadingView[1].setBackgroundResource(R.drawable.shadow);

            Display display = getWindowManager().getDefaultDisplay();
            Point size = new Point();
            display.getSize(size);

            float Scale = (float) size.y / 1080.0f;
            int DefaultSize = Math.round(40 * this.getResources().getDisplayMetrics().density * Scale);
            FrameLayout.LayoutParams DefaultSizeFrame = new FrameLayout.LayoutParams(DefaultSize, DefaultSize, Gravity.CENTER);

            loadingView[0].setLayoutParams(DefaultSizeFrame);
            loadingView[1].setLayoutParams(DefaultSizeFrame);
            loadingView[2].setLayoutParams(DefaultSizeFrame);

            shouldCallJavaCheck = false;

            initializeWebview();
        }
    }

    // The main player initialization function
    private void initializePlayer(int position) {
        boolean isSmall = (mainPlayer != position);
        boolean seeking = (mResumePosition > 0) && (mwhocall > 1);

        PlayerCheckHandler[position].removeCallbacksAndMessages(null);

        //Show main loading if this call is in the main player as this is needed fro when we are fast/back forwarding
        //On small player it will show its own loading
        if (!isSmall && !IsIN5050) showLoading();

        if (PlayerView[position].getVisibility() != View.VISIBLE)
            PlayerView[position].setVisibility(View.VISIBLE);

        if (player[position] == null) {
            trackSelector[position] = new DefaultTrackSelector(this);
            trackSelector[position].setParameters(isSmall ? trackSelectorParametersSmall : trackSelectorParameters);

            player[position] = new SimpleExoPlayer.Builder(this)
                    .setTrackSelector(trackSelector[position])
                    .setLoadControl(loadControl[mwhocall])
                    .build();

            player[position].addListener(new PlayerEventListener(position));
            player[position].addAnalyticsListener(new AnalyticsEventListener(position));

            PlayerView[position].setPlayer(player[position]);
        }

        if (seeking) player[position].seekTo(mResumePosition);

        player[position].prepare(
                mediaSourcePlaying[position] != null ? mediaSourcePlaying[position] : Tools.buildMediaSource(uri, dataSourceFactory, mwhocall, mLowLatency),
                !seeking,
                true);

        player[position].setPlayWhenReady(true);
        SwitchPlayerAudio(AudioSource);

        if (!isSmall) {
            //Reset small player view so it shows after big one has started
            int tempPos = position ^ 1;
            if (player[tempPos] != null) {
                PlayerView[tempPos].setVisibility(View.GONE);
                PlayerView[tempPos].setVisibility(View.VISIBLE);
            }
        }

        KeepScreenOn(true);
    }

    // For some reason the player can lag a device when stated without releasing it first
    // It seems that the app keeps working on the player somehow in the background on the already released player
    // So here we do more then what seems necessary by releasing, starting and releasing again
    // But on longer test this gives the best performance
    private void ClearPlayer(int position) {
        PlayerCheckHandler[position].removeCallbacksAndMessages(null);
        PlayerView[position].setVisibility(View.GONE);

        if (player[position] != null) {
            player[position].setPlayWhenReady(false);
            releasePlayer(position);
        }

        PlayerCheckCounter[position] = 0;

        if (mainPlayer != position) SwitchPlayerAudio(1);

        //Reset player background to a empty black screen and reset all states
        player[position] = new SimpleExoPlayer.Builder(this).build();

        PlayerView[position].setPlayer(player[position]);

        player[position].setPlayWhenReady(false);
        player[position].prepare(mediaurireset, true, true);

        releasePlayer(position);

        //Both players are close enable screen saver
        if (player[0] == null && player[1] == null)
            KeepScreenOn(false);
    }

    //The main PreinitializePlayer used for when we first start the player or to play clips/vods
    //Also used to change the main player that is the big screen
    private void PreinitializePlayer(MediaSource mediaSource, String videoAddress, int whocall, long resumeposition) {

        mediaSourcePlaying[mainPlayer] = mediaSource;
        uri = Uri.parse(videoAddress);
        shouldCallJavaCheck = true;
        mwhocall = whocall;
        mResumePosition = resumeposition > 0 ? resumeposition : 0;

        initializePlayer(mainPlayer);
    }

    //The way to start the Picture in Picture small window
    private void PreinitializePlayer2(MediaSource mediaSource, String videoAddress) {
        mediaSourcePlaying[mainPlayer ^ 1] = mediaSource;
        uri = Uri.parse(videoAddress);
        shouldCallJavaCheck = true;
        mResumePosition = 0;

        initializePlayer(mainPlayer ^ 1);
        PicturePicture = true;
    }

    //Stop the player called from js, clear it all
    private void PreResetPlayer(int whocall, int position) {
        if (IsIN5050) updateVidesizeChatPP(false);
        if (mainPlayer == 1) SwitchPlayer();
        PicturePicture = false;
        shouldCallJavaCheck = false;
        AudioSource = 1;

        PlayerCheckHandler[0].removeCallbacksAndMessages(null);
        PlayerCheckHandler[1].removeCallbacksAndMessages(null);
        mediaSourcePlaying[0] = null;
        mediaSourcePlaying[1] = null;
        mediaSourcesAuto[0] = null;
        mediaSourcesAuto[1] = null;
        mwhocall = whocall;
        mResumePosition = 0;

        ClearPlayer(position);
        clearResumePosition();
    }

    //Main release function
    private void releasePlayer(int position) {
        if (player[position] != null) {
            player[position].release();
            player[position] = null;
            trackSelector[position] = null;
            droppedFrames[position] = 0;
            netActivity[position] = 0L;
        }
    }

    //Basic player position setting, for resume playback 
    private void clearResumePosition() {
        mResumePosition = C.TIME_UNSET;
    }

    private void updateResumePosition(int position) {
        if (player[position] == null) return;

        // If PlayerCheckCounter > 1 we alredy have restarted the player so the value of getCurrentPosition
        // is already gone and we alredy saved the correct mResumePosition
        if (PlayerCheckCounter[position] < 2) {
            mResumePosition = player[position].isCurrentWindowSeekable() ?
                    Math.max(0, player[position].getCurrentPosition()) : C.TIME_UNSET;
        }
    }

    public void KeepScreenOn(boolean keepOn) {
        if (keepOn)
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        else
            getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }

    private void showLoading() {
        loadingView[2].setVisibility(View.VISIBLE);
    }

    private void hideLoading(int position) {
        loadingView[position].setVisibility(View.GONE);
    }

    private void SetheightDefault() {
        //Make it visible for calculation
        boolean isNvisible = PlayerView[0].getVisibility() != View.VISIBLE;
        if (isNvisible) PlayerView[0].setVisibility(View.VISIBLE);

        heightDefault = PlayerView[0].getHeight();
        mwidthDefault = PlayerView[0].getWidth();

        heightChat = (int) (heightDefault * 0.75);
        mwidthChat = (int) (mwidthDefault * 0.75);

        if (isNvisible) PlayerView[0].setVisibility(View.GONE);

        PlayerViewDefaultSize = new FrameLayout.LayoutParams(mwidthDefault, heightDefault, Gravity.TOP);
        PlayerViewDefaultSizeChat = new FrameLayout.LayoutParams(mwidthChat, heightChat, Gravity.CENTER_VERTICAL);

        PlayerViewDefaultSizePP = new FrameLayout.LayoutParams((mwidthDefault / 2), (heightDefault / 2), positions[3]);
        PlayerViewDefaultSizeChatPP = new FrameLayout.LayoutParams((mwidthDefault / 2), (heightDefault / 2), positions[7]);

        PlayerViewSmallSize = new FrameLayout.LayoutParams((mwidthDefault / playerDivider), (heightDefault / playerDivider), positions[DefaultPositions]);
        PlayerView[1].setLayoutParams(PlayerViewSmallSize);
    }

    //Used in side-by-side mode chat plus video
    private void updateVidesizeChat(boolean sizechat) {
        if (sizechat) PlayerView[mainPlayer].setLayoutParams(PlayerViewDefaultSizeChat);
        else PlayerView[mainPlayer].setLayoutParams(PlayerViewDefaultSize);
    }

    //Used in 50/50 mode two videos on the center plus two chat one on it side
    private void updateVidesizeChatPP(boolean sizechat) {
        if (sizechat) {
            IsIN5050 = true;
            PlayerView[mainPlayer].setLayoutParams(PlayerViewDefaultSizePP);
            PlayerView[mainPlayer ^ 1].setLayoutParams(PlayerViewDefaultSizeChatPP);
        } else {
            IsIN5050 = false;
            PlayerView[mainPlayer].setLayoutParams(PlayerViewDefaultSize);
            UpdadeSizePosSmall(mainPlayer ^ 1);
        }
    }

    //SwitchPlayer with is the big and small player used by picture in picture mode
    private void SwitchPlayer() {
        int WillBeMain = mainPlayer ^ 1;//shift 0 to 1 and vice versa

        //Set new video sizes
        PlayerView[WillBeMain].setLayoutParams(PlayerViewDefaultSize);
        PlayerView[mainPlayer].setLayoutParams(PlayerViewSmallSize);

        VideoHolder.bringChildToFront(PlayerView[mainPlayer]);

        PlayerView[mainPlayer].setVisibility(View.GONE);
        PlayerView[mainPlayer].setVisibility(View.VISIBLE);

        //change trackSelector to limit video bandwidth
        if (trackSelector[WillBeMain] != null)
            trackSelector[WillBeMain].setParameters(trackSelectorParameters);
        if (trackSelector[mainPlayer] != null)
            trackSelector[mainPlayer].setParameters(trackSelectorParametersSmall);

        mainPlayer = WillBeMain;

        //Set proper video volume, muted to small
        SwitchPlayerAudio(AudioSource);
    }

    public void SwitchPlayerAudio(int pos) {
        AudioSource = pos;
        if (pos == 2) {//both
            if (player[0] != null) player[0].setVolume(1f);
            if (player[1] != null) player[1].setVolume(1f);
        } else if (pos == 1) {//Main
            if (player[mainPlayer] != null) player[mainPlayer].setVolume(1f);
            if (player[mainPlayer ^ 1] != null) player[mainPlayer ^ 1].setVolume(0f);
        } else {//Small
            if (player[mainPlayer] != null) player[mainPlayer].setVolume(0f);
            if (player[mainPlayer ^ 1] != null) player[mainPlayer ^ 1].setVolume(1f);
        }
    }

    public void UpdadeSizePosSmall(int pos) {
        PlayerViewSmallSize = new FrameLayout.LayoutParams((mwidthDefault / playerDivider), (heightDefault / playerDivider), positions[DefaultPositions]);
        PlayerView[pos].setLayoutParams(PlayerViewSmallSize);
    }

    @Override
    public void onResume() {
        super.onResume();
        //The app was close but shouldCallJavaCheck is true that means the TV enter standby so call java here
        if (player[mainPlayer] == null && shouldCallJavaCheck && mwebview != null && alredystarted) {
            mwebview.loadUrl("javascript:Play_CheckResume()");
        }
        alredystarted = true;
    }

    //This function is called when home key is pressed
    @Override
    public void onStop() {
        super.onStop();
        PlayerCheckHandler[0].removeCallbacksAndMessages(null);
        PlayerCheckHandler[1].removeCallbacksAndMessages(null);
        updateResumePosition(0);
        updateResumePosition(1);
        ClearPlayer(0);
        ClearPlayer(1);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        ClearPlayer(0);
        ClearPlayer(1);
    }

    //Close the app
    private void closeThis() {
        finishAndRemoveTask();
    }

    //Minimize the app
    private void minimizeThis() {
        this.moveTaskToBack(true);
    }

    //https://android-developers.googleblog.com/2009/12/back-and-other-hard-keys-three-stories.html
    //Use back key to kill the app
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

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        //Override key play and pause as those get send to js as KEYCODE_MEDIA_PLAY_PAUSE
        if (event.getKeyCode() == KeyEvent.KEYCODE_MEDIA_PLAY) {
            //Prevent send it up down and up
            if (event.getAction() == KeyEvent.ACTION_DOWN) return true;

            //P for play
            mwebview.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_P));
            mwebview.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_P));
            return true;
        } else if (event.getKeyCode() == KeyEvent.KEYCODE_MEDIA_PAUSE) {
            //Prevent send it up down and up
            if (event.getAction() == KeyEvent.ACTION_DOWN) return true;

            //S for stop/pause
            mwebview.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_S));
            mwebview.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_S));
            return true;
        }

        return super.dispatchKeyEvent(event);
    }

    // A web app that loads all thumbnails content and interact with the player
    private void initializeWebview() {
        mwebview = findViewById(R.id.WebView);
        mwebview.setBackgroundColor(Color.TRANSPARENT);
        if (BuildConfig.DEBUG)
            WebView.setWebContentsDebuggingEnabled(true);

        WebSettings websettings = mwebview.getSettings();

        websettings.setJavaScriptEnabled(true);
        websettings.setDomStorageEnabled(true);
        websettings.setAllowFileAccess(true);
        websettings.setAllowContentAccess(true);
        websettings.setAllowFileAccessFromFileURLs(true);
        websettings.setAllowUniversalAccessFromFileURLs(true);
        websettings.setUseWideViewPort(true);
        websettings.setCacheMode(WebSettings.LOAD_NO_CACHE);

        mwebview.clearCache(true);
        mwebview.clearHistory();

        mwebview.addJavascriptInterface(new WebAppInterface(this), "Android");

        mwebview.setWebViewClient(new WebViewClient() {
            @SuppressWarnings("unused")//called by JS
            public void onConsoleMessage(String message, int lineNumber, String sourceID) {
                Log.d(TAG, message + " -- From line " +
                        lineNumber + " of " +
                        sourceID);
            }
        });

        //To load page from assets
        //mwebview.loadUrl("file:///android_asset/index.html");
        //To load page from githubio
        mwebview.loadUrl("https://fgl27.github.io/SmartTwitchTV/release/index.min.html");

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
                if (show) showLoading();
                else hideLoading(2);
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
            myHandler.post(() -> updateVidesizeChat(sizechat));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mupdatesizePP(boolean sizechat) {
            myHandler.post(() -> updateVidesizeChatPP(sizechat));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void startVideo(String videoAddress, int whocall) {
            myHandler.post(() -> PreinitializePlayer(null, videoAddress, whocall, -1));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void startVideoOffset(String videoAddress, int whocall, long position) {
            myHandler.post(() -> PreinitializePlayer(null, videoAddress, whocall, position));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void initializePlayer2(String url) {
            myHandler.post(() -> PreinitializePlayer2(null, url));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void initializePlayer2Auto() {
            myHandler.post(() -> PreinitializePlayer2(mediaSourcesAuto[mainPlayer ^ 1], ""));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void SetAuto(String url) {
            //The live token expires in 20 min add a timer to request a refresh in case the js code fail to refresh it
            //For some reason maybe a twitch bug the vod expires in 20 hours not min
            myHandler.post(() -> {
                expires[mainPlayer] = System.currentTimeMillis() + 18000;
                mediaSourcesAuto[mainPlayer] = Tools.buildMediaSource(Uri.parse(url), dataSourceFactory, 1, mLowLatency);
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void ResStartAuto(String url, int whocall, long position) {
            //The live token expires in 20 min add a timer to request a refresh in case the js code fail to refresh it
            //For some reason maybe a twitch bug the vod expires in 20 hours not min
            myHandler.post(() -> {
                expires[mainPlayer] = System.currentTimeMillis() + 18000;
                mediaSourcesAuto[mainPlayer] = Tools.buildMediaSource(Uri.parse(url), dataSourceFactory, 1, mLowLatency);
                PreinitializePlayer(mediaSourcesAuto[mainPlayer], "", whocall, position);
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void ResStartAuto2(String url) {
            //The live token expires in 20 min add a timer to request a refresh in case the js code fail to refresh it
            //For some reason maybe a twitch bug the vod expires in 20 hours not min
            myHandler.post(() -> {
                expires[mainPlayer ^ 1] = System.currentTimeMillis() + 18000;
                mediaSourcesAuto[mainPlayer ^ 1] = Tools.buildMediaSource(Uri.parse(url), dataSourceFactory, 1, mLowLatency);
                PreinitializePlayer2(mediaSourcesAuto[mainPlayer ^ 1], "");
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void SetAuto2(String url) {
            //The live token expires in 20 min add a timer to request a refresh in case the js code fail to refresh it
            //For some reason maybe a twitch bug the vod expires in 20 hours not min
            myHandler.post(() -> {
                expires[mainPlayer ^ 1] = System.currentTimeMillis() + 18000;
                mediaSourcesAuto[mainPlayer ^ 1] = Tools.buildMediaSource(Uri.parse(url), dataSourceFactory, 1, mLowLatency);
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mSetlatency(boolean LowLatency) {
            mLowLatency = LowLatency;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void StartAuto(int whocall, long position) {
            myHandler.post(() -> PreinitializePlayer(mediaSourcesAuto[mainPlayer], "", whocall, position));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void stopVideo(int whocall) {
            myHandler.post(() -> PreResetPlayer(whocall, mainPlayer));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mClearBigPlayer() {
            myHandler.post(() -> ClearPlayer(mainPlayer));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mClearSmallPlayer() {
            myHandler.post(() -> {
                PicturePicture = false;
                ClearPlayer(mainPlayer ^ 1);
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mSwitchPlayer() {
            myHandler.post(PlayerActivity.this::SwitchPlayer);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mSwitchPlayerPosition(int position) {
            DefaultPositions = position;
            myHandler.post(() -> UpdadeSizePosSmall(mainPlayer ^ 1));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mSetPlayerPosition(int position) {
            DefaultPositions = position;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mSwitchPlayerSize(int position) {
            playerDivider = position;
            myHandler.post(() -> UpdadeSizePosSmall(mainPlayer ^ 1));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mSetPlayerSize(int position) {
            playerDivider = position;
            myHandler.post(PlayerActivity.this::SetheightDefault);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mSwitchPlayerAudio(int position) {
            myHandler.post(() -> SwitchPlayerAudio(position));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void SetMainPlayerBandwidth(int band) {
            mainPlayerBandwidth = band == 0 ? Integer.MAX_VALUE : band;
            myHandler.post(() -> trackSelectorParameters = trackSelectorParameters
                    .buildUpon()
                    .setMaxVideoBitrate(mainPlayerBandwidth)
                    .build());
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void SetSmallPlayerBandwidth(int band) {
            smallPlayerBandwidth = band == 0 ? Integer.MAX_VALUE : band;
            myHandler.post(() -> trackSelectorParametersSmall = trackSelectorParameters
                    .buildUpon()
                    .setMaxVideoBitrate(smallPlayerBandwidth)
                    .build());
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public long getsavedtime() {
            return mResumePosition;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public long gettime() {
            HVTHandler.RunnableResult<Long> result = HVTHandler.post(myHandler, new HVTHandler.RunnableValue<Long>() {
                @Override
                public void run() {
                    if (player[mainPlayer] != null) value = player[mainPlayer].getCurrentPosition();
                    else value = 0L;
                }
            });
            return result.get();
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public int getAndroid() {
            return 1;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String mreadUrl(String urlString, int timeout, int HeaderQuantity, String access_token) {
            return Tools.readUrl(urlString, timeout, HeaderQuantity, access_token, false);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String mreadUrl(String urlString, int timeout, int HeaderQuantity, String access_token, boolean post) {
            return Tools.readUrl(urlString, timeout, HeaderQuantity, access_token, post);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String getDevice() {
            return android.os.Build.MODEL;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mKeepScreenOn(boolean keepOn) {
            myHandler.post(() -> KeepScreenOn(keepOn));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void play(boolean play) {
            myHandler.post(() -> {
                if (player[0] != null) player[0].setPlayWhenReady(play);
                if (player[1] != null) player[1].setPlayWhenReady(play);

                KeepScreenOn(play);
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public boolean getPlaybackState() {
            HVTHandler.RunnableResult<Boolean> result = HVTHandler.post(myHandler, new HVTHandler.RunnableValue<Boolean>() {
                @Override
                public void run() {
                    if (player[mainPlayer] != null) value = player[mainPlayer].getPlayWhenReady();
                    else value = false;
                }
            });
            return result.get();
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void setPlaybackSpeed(float value) {
            myHandler.post(() -> {
                if (player[mainPlayer] != null)
                    player[mainPlayer].setPlaybackParameters(new PlaybackParameters(value, 1.0f));
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void SetBuffer(int whocall, int value) {
            BUFFER_SIZE[whocall] = Math.min(value, 15000);
            loadControl[whocall] = Tools.getLoadControl(BUFFER_SIZE[whocall]);
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
            return Tools.isCodecSupported("vp9");
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public boolean misAVC52Supported() {
            return Tools.isAVC52Supported();
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String getVideoQuality() {
            HVTHandler.RunnableResult<String> result = HVTHandler.post(myHandler, new HVTHandler.RunnableValue<String>() {
                @Override
                public void run() {
                    if (player[mainPlayer] != null)
                        value = Tools.mgetVideoQuality(player[mainPlayer]);
                    else value = null;
                }
            });
            return result.get();
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String getVideoStatus() {
            HVTHandler.RunnableResult<String> result = HVTHandler.post(myHandler, new HVTHandler.RunnableValue<String>() {
                @Override
                public void run() {
                    value = String.format(Locale.US, "%d,%d,%d,%s,%d,%s,",
                            droppedFrames[mainPlayer],
                            droppedFramesTotal,
                            conSpeed[mainPlayer],
                            String.format(Locale.US, "%.02f", (speedcounter > 0 ? (conSpeedAVG / speedcounter) : 0)),
                            netActivity[mainPlayer],
                            String.format(Locale.US, "%.02f", (netcounter > 0 ? (netActivityAVG / netcounter) : 0)));

                    netActivity[mainPlayer] = 0L;
                    if (player[mainPlayer] != null)
                        value += String.format(Locale.US, "%d", player[mainPlayer].getTotalBufferedDuration());
                    else value += "0";
                }
            });
            return result.get();
        }
    }

    // Basic EventListener for exoplayer
    private class PlayerEventListener implements Player.EventListener {

        private int position;
        private int delayms;

        private PlayerEventListener(int mposition) {
            position = mposition;
            delayms = (BUFFER_SIZE[mwhocall] * 2) + (mwhocall == 2 ? 5000 : 3000);
        }

        @Override
        public void onPlayerStateChanged(boolean playWhenReady, @Player.State int playbackState) {
            myHandler.post(() -> {
                hideLoading(2);
                if (playWhenReady) {
                    if (playbackState == Player.STATE_ENDED) {
                        PlayerCheckHandler[position].removeCallbacksAndMessages(null);
                        player[position].setPlayWhenReady(false);
                        PlayerEventListenerClear(position);
                    } else if (playbackState == Player.STATE_BUFFERING) {
                        //Use the player buffer as a player check state to prevent be buffering for ever
                        //If buffer for as long as BUFFER_SIZE * 2 do something because player is frozen
                        PlayerCheckHandler[position].removeCallbacksAndMessages(null);
                        PlayerCheckHandler[position].postDelayed(() -> {
                            //Player was released or is on pause
                            if (player[position] == null || !player[position].getPlayWhenReady())
                                return;

                            PlayerEventListenerCheckCounter(position, false);
                        }, delayms);
                    } else if (playbackState == Player.STATE_READY) {
                        PlayerCheckHandler[position].removeCallbacksAndMessages(null);
                        PlayerCheckCounter[position] = 0;

                        //If other not playing just play it so they stay close to sync
                        int otherplayer = position ^ 1;
                        if (player[otherplayer] != null) {
                            if (!player[otherplayer].getPlayWhenReady())
                                player[otherplayer].setPlayWhenReady(true);
                        }

                        if (mwhocall > 1) {
                            mwebview.loadUrl("javascript:Play_UpdateDuration(" +
                                    mwhocall + "," + player[position].getDuration() + ")");
                        }
                    }
                }
            });
        }

        @Override
        public void onPlayerError(@NonNull ExoPlaybackException e) {
            myHandler.post(() -> {
                PlayerCheckHandler[position].removeCallbacksAndMessages(null);
                PlayerEventListenerCheckCounter(position, Tools.isBehindLiveWindow(e));
            });
        }
    }

    public void PlayerEventListenerClear(int position) {
        hideLoading(2);
        hideLoading(position);
        if (PicturePicture) {
            boolean mswitch = (mainPlayer == position);

            PicturePicture = false;

            if (mswitch) SwitchPlayer();

            ClearPlayer(position);
            AudioSource = 1;

            mwebview.loadUrl("javascript:PlayExtra_End(" + mswitch + ")");

        } else mwebview.loadUrl("javascript:Play_PannelEndStart(" + mwhocall + ")");
    }

    public void PlayerEventListenerCheckCounter(int position, boolean mclearResumePosition) {
        PlayerCheckHandler[position].removeCallbacksAndMessages(null);
        //Pause to things run smother and prevent odd behavior during the checks + start loading to show what is going on
        player[position].setPlayWhenReady(false);
        showLoading();

        PlayerCheckCounter[position]++;
        if (PlayerCheckCounter[position] < 4 &&
                (mainPlayer != position || mediaSourcePlaying[position] != null)) {

            //this is small screen  or is in auto mode check before restart it
            if (mclearResumePosition || mwhocall == 1) clearResumePosition();
            else updateResumePosition(position);

            if (mwhocall == 1) {
                //ask java to reset the qualities only if time expired
                if (expires[position] < System.currentTimeMillis()) {
                    mediaSourcePlaying[position] = mediaSourcesAuto[position];
                    initializePlayer(position);
                } else
                    mwebview.loadUrl("javascript:Play_CheckResumeForced(" + (mainPlayer != position) + ")");

            } else initializePlayer(position);

        } else if (PlayerCheckCounter[position] > 3) {

            // try == 3 Give up internet is probably down or something related
            PlayerEventListenerClear(position);

        } else if (PlayerCheckCounter[position] > 1) {

            // Second if not in auto mode use js to check if is possible to drop quality
            mwebview.loadUrl("javascript:Play_PlayerCheck(" + mwhocall + ")");

        } else {
            //First try and not auto mode only restart the player
            if (mclearResumePosition || mwhocall == 1) clearResumePosition();
            else updateResumePosition(position);

            initializePlayer(position);
        }
    }

    private class AnalyticsEventListener implements AnalyticsListener {

        private int position;

        private AnalyticsEventListener(int mposition) {
            position = mposition;
        }

        @Override
        public final void onDroppedVideoFrames(@NonNull EventTime eventTime, int count, long elapsedMs) {
            droppedFrames[position] += count;
            droppedFramesTotal += count;
        }

        @Override
        public void onBandwidthEstimate(@NonNull EventTime eventTime, int totalLoadTimeMs, long totalBytesLoaded, long bitrateEstimate) {
            conSpeed[position] = bitrateEstimate;
            netActivity[position] = totalBytesLoaded * 8;
            if (bitrateEstimate > 0) {
                speedcounter++;
                conSpeedAVG += ((float) bitrateEstimate / 1000000);
            }
            if (netActivity[position] > 0) {
                netcounter++;
                netActivityAVG += ((float) netActivity[position] / 1000000);
            }
        }
    }
}
