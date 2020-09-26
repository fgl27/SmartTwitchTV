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

import android.Manifest;
import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.content.res.Configuration;
import android.graphics.Color;
import android.graphics.Point;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Looper;
import android.provider.Settings;
import android.transition.ChangeBounds;
import android.transition.Transition;
import android.transition.TransitionManager;
import android.util.Log;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewGroup.LayoutParams;
import android.view.WindowManager;
import android.view.animation.LinearInterpolator;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.fgl27.twitch.channels.ChannelsUtils;
import com.fgl27.twitch.notification.NotificationUtils;
import com.google.android.exoplayer2.C;
import com.google.android.exoplayer2.DefaultRenderersFactory;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.LoadControl;
import com.google.android.exoplayer2.PlaybackParameters;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.analytics.AnalyticsListener;
import com.google.android.exoplayer2.extractor.ExtractorsFactory;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.TrackGroupArray;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.MappingTrackSelector;
import com.google.android.exoplayer2.trackselection.TrackSelectionArray;
import com.google.android.exoplayer2.ui.PlayerView;
import com.google.android.exoplayer2.util.Util;
import com.google.gson.Gson;

import net.grandcentrix.tray.AppPreferences;

import java.util.Objects;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PlayerActivity extends Activity {
    private final String TAG = "STTV_PlayerActivity";
    private final Pattern TIME_NAME = Pattern.compile("time=([^\\s]+)");
    private final int PlayerAccount = 4;
    private final int PlayerAccountPlus = PlayerAccount + 1;

    private final int[] keys = {//same order as Main_initClickDoc /smartTwitchTV/app/specific/Main.js
            KeyEvent.KEYCODE_DPAD_UP,//0
            KeyEvent.KEYCODE_DPAD_DOWN,//1
            KeyEvent.KEYCODE_DPAD_LEFT,//2
            KeyEvent.KEYCODE_DPAD_RIGHT,//3
            KeyEvent.KEYCODE_ENTER,//4
            KeyEvent.KEYCODE_F2,//KEYCODE_F2 is mapped as back key //5
            KeyEvent.KEYCODE_PAGE_UP,//6
            KeyEvent.KEYCODE_PAGE_DOWN,//7
            KeyEvent.KEYCODE_3//8
    };

    private final int[] keysAction = {
            KeyEvent.ACTION_DOWN,//0
            KeyEvent.ACTION_UP//1
    };

    private final int[] idsurface = {
            R.id.player_view,//0
            R.id.player_view2,//1
            R.id.player_view3,//2
            R.id.player_view4,//3
            R.id.player_view_e//4
    };

    private final int[] idtexture = {
            R.id.player_view_texture_view,//0
            R.id.player_view2_texture_view,//1
            R.id.player_view3_texture_view,//2
            R.id.player_view4_texture_view,//3
            R.id.player_view_e_texture_view//4
    };

    private int[] BUFFER_SIZE = {4000, 4000, 4000, 4000};//Default, live, vod, clips
    private String[] BLACKLISTEDCODECS = null;
    private PlayerView[] PlayerView = new PlayerView[PlayerAccountPlus];
    private SimpleExoPlayer[] player = new SimpleExoPlayer[PlayerAccountPlus];
    private PlayerEventListener[] playerListener = new PlayerEventListener[PlayerAccountPlus];
    private DefaultTrackSelector[] trackSelector = new DefaultTrackSelector[PlayerAccountPlus];
    private DefaultTrackSelector.Parameters[] trackSelectorParameters = new DefaultTrackSelector.Parameters[3];
    private TrackGroupArray lastSeenTrackGroupArray;
    private long mResumePosition;
    private long mResumePositionSmallPlayer;
    private int mWho_Called = 1;
    private MediaSource[] mediaSources = new MediaSource[PlayerAccountPlus];
    private String userAgent;
    private WebView mWebView;
    private WebView mWebViewKey;
    private boolean PicturePicture;
    private boolean deviceIsTV;
    private boolean MultiStreamEnable;
    private boolean isFullScreen = true;
    private boolean CheckSource = true;
    private int PicturePicturePosition = 0;
    private int PicturePictureSize = 1;//sizes are 0 , 1 , 2, 3, 4
    private int PreviewSize = 1;//sizes are 0 , 1 , 2, 3
    private int FullScreenSize = 3;//sizes are 0 , 1 , 2, 3, 4 ... 2 default 75%
    private int FullScreenPosition = 1;//0 right 1 left
    private int AudioSource = 1;
    private int AudioMulti = 0;//window 0
    private float PreviewOthersAudio = 0.3f;//window 0
    private float PreviewAudio = 1f;//window 0
    private float PingValue = 0f;
    private float PingValueAVG = 0f;
    private long PingCounter = 0L;
    private long PingErrorCounter = 0L;
    private boolean warningShowing = false;
    private boolean WebviewLoaded = false;
    private boolean mWebViewKeyIsShowing = false;
    private long PlayerCurrentPosition = 0L;
    private long SmallPlayerCurrentPosition = 0L;
    private boolean[] PlayerIsPlaying = new boolean[PlayerAccountPlus];
    private Handler[] PlayerCheckHandler = new Handler[PlayerAccountPlus];
    private int[] PlayerCheckCounter = new int[PlayerAccountPlus];
    private long droppedFrames = 0;
    private float conSpeed = 0f;
    private float netActivity = 0f;
    private long DroppedFramesTotal = 0L;
    private int DeviceRam = 0;
    private String VideoQualityResult = null;
    private String getVideoStatusResult = null;
    private String PreviewPlayerPlaylist;
    private float conSpeedAVG = 0f;
    private float NetActivityAVG = 0f;
    private long NetCounter = 0L;
    private long SpeedCounter = 0L;
    private int mLowLatency = 0;
    private boolean AlreadyStarted;
    private boolean onCreateReady;
    private boolean IsStopped;
    private boolean IsInAutoMode = true;
    private boolean PingWarning = true;
    private AppPreferences appPreferences;
    private LoadControl[] loadControl = new LoadControl[PlayerAccount];
    //The default size for all loading dialog
    private FrameLayout.LayoutParams DefaultLoadingLayout;
    //the default size for the main player 100% width x height
    private FrameLayout.LayoutParams PlayerViewDefaultSize;
    //the default size for the main player when on side by side plus chat 75% width x height
    private FrameLayout.LayoutParams[][] PlayerViewSideBySideSize;
    //the default size for the other player when on PP mode, some positions are also used when on side by side for both players
    private FrameLayout.LayoutParams[][] PlayerViewSmallSize;
    //the default size for the extra player used by side panel and live player feed
    private FrameLayout.LayoutParams[][] PlayerViewExtraLayout;
    //the default size for the players of multistream 4 player two modes
    private FrameLayout.LayoutParams[] MultiStreamPlayerViewLayout;
    //the default size for the side panel players
    private FrameLayout.LayoutParams PlayerViewSidePanel;
    private FrameLayout.LayoutParams PlayerViewScreensPanel;
    private FrameLayout VideoHolder;
    private FrameLayout VideoWebHolder;
    private ProgressBar[] loadingView = new ProgressBar[PlayerAccount + 3];

    private Point ScreenSize;

    private String IntentObj;
    private String LastIntent;
    private boolean canRunChannel;
    private boolean closeThisCalled;

    private String[][] PreviewFeedResult = new String[25][100];
    private String[] StreamDataResult = new String[PlayerAccount];

    private Handler[] RuntimeHandler = new Handler[2];
    private Handler MainThreadHandler;
    private Handler[] CurrentPositionHandler = new Handler[2];
    private Handler SaveBackupJsonHandler;
    private Handler NotificationHandler;
    private Handler ToastHandler;
    private Handler ChannelHandler;
    private Handler DeleteHandler;

    private Process PingProcess;
    private Runtime PingRuntime;
    private boolean PingSDKBool;

    private ThreadPoolExecutor DataThreadPool;

    private Transition PreviewTransition;

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setTheme(R.style.AppTheme);
        super.onCreate(savedInstanceState);
        //On create is called onResume so prevent it if already set
        if (!onCreateReady) {
            Intent intent = getIntent();
            boolean isChannelIntent = Objects.equals(intent.getAction(), Constants.CHANNEL_INTENT);
            intent.setAction(null);
            setIntent(intent);

            setContentView(R.layout.activity_player);
            SetDefaultLoadingLayout();

            IsStopped = false;
            AlreadyStarted = true;
            onCreateReady = true;

            int Number_of_Cores = Runtime.getRuntime().availableProcessors();
            //Background threads
            DataThreadPool = new ThreadPoolExecutor(
                    Number_of_Cores,
                    Number_of_Cores * 2,
                    60L,
                    TimeUnit.SECONDS,
                    new LinkedBlockingQueue<>()
            );

            //Main loop threads
            Looper MainLooper = Looper.getMainLooper();
            MainThreadHandler = new Handler(MainLooper);
            CurrentPositionHandler[0] = new Handler(MainLooper);
            CurrentPositionHandler[1] = new Handler(MainLooper);
            for (int i = 0; i < PlayerAccountPlus; i++) {
                PlayerCheckHandler[i] = new Handler(MainLooper);
            }

            //BackGroundThread Etc threads that may or may not use delay to start
            HandlerThread backGroundThread = new HandlerThread("BGT");
            backGroundThread.start();
            Looper BackGroundThreadLooper = backGroundThread.getLooper();

            NotificationHandler = new Handler(BackGroundThreadLooper);
            ToastHandler = new Handler(BackGroundThreadLooper);
            SaveBackupJsonHandler = new Handler(BackGroundThreadLooper);
            ChannelHandler = new Handler(BackGroundThreadLooper);
            DeleteHandler = new Handler(BackGroundThreadLooper);

            SetPing();

            deviceIsTV = Tools.deviceIsTV(this);
            canRunChannel = deviceIsTV && Build.VERSION.SDK_INT >= Build.VERSION_CODES.O;

            appPreferences = new AppPreferences(this);
            if (canRunChannel && isChannelIntent) SaveIntent(intent);

            userAgent = Util.getUserAgent(this, TAG);

            VideoHolder = findViewById(R.id.videoholder);
            VideoWebHolder = findViewById(R.id.videowebholder);
            setPlayerSurface(true);

            DeviceRam = Tools.DeviceRam(this);
            //Ram too big.bigger then max int value... use 196MB
            if (DeviceRam < 0) DeviceRam = 196000000;

            initializeWebview();

            StopNotificationService();
        }
    }

    private void SetDefaultLoadingLayout() {
        ScreenSize = Tools.ScreenSize(getWindowManager().getDefaultDisplay());
        float Density = this.getResources().getDisplayMetrics().density;

        float Scale = (float) ScreenSize.y / 1080.0f;
        float ScaleDensity = Density / 2.0f;

        int DefaultSize = Math.round(40 * Density * Scale / ScaleDensity);
        DefaultLoadingLayout = new FrameLayout.LayoutParams(DefaultSize, DefaultSize, Gravity.CENTER);

        loadingView[6] = findViewById(R.id.loading2);
        FrameLayout.LayoutParams DefaultLoadingLayoutBottom = new FrameLayout.LayoutParams(DefaultSize, DefaultSize, Gravity.CENTER | Gravity.BOTTOM);
        DefaultLoadingLayoutBottom.bottomMargin = (int) (ScreenSize.x / 40 * Density / ScaleDensity);
        loadingView[6].setLayoutParams(DefaultLoadingLayoutBottom);

        loadingView[5] = findViewById(R.id.loading);
        loadingView[5].setLayoutParams(DefaultLoadingLayout);

        //Set default warning text size base on screen size
        float textSize = (ScreenSize.y / 100.0f) * ScaleDensity * 2;
        TextView warning = findViewById(R.id.warning);
        warning.setTextSize(TypedValue.COMPLEX_UNIT_DIP, textSize);
    }

    public void setPlayerSurface(boolean surface_view) {
        int[] idGone = idtexture, idVisible = idsurface;
        //Some old devices (old OS N or older) is need to use texture_view to have a proper working PP mode
        if (!surface_view) {
            idGone = idsurface;
            idVisible = idtexture;
        }

        for (int i = 0; i < PlayerAccountPlus; i++) {
            PlayerView[i] = findViewById(idGone[i]);
            PlayerView[i].setVisibility(View.GONE);
            PlayerView[i] = findViewById(idVisible[i]);
        }

        PlayerView[0].setVisibility(View.VISIBLE);
        for (int i = 1; i < PlayerAccountPlus; i++) {
            PlayerView[i].setVisibility(View.GONE);
        }

        for (int i = 0; i < PlayerAccountPlus; i++) {
            loadingView[i] = PlayerView[i].findViewById(R.id.exo_buffering);
            loadingView[i].setIndeterminateTintList(ColorStateList.valueOf(Color.WHITE));
            loadingView[i].setBackgroundResource(R.drawable.shadow);
            loadingView[i].setLayoutParams(DefaultLoadingLayout);
        }
    }

    private void ReUsePlayer(int PlayerPosition, int Who_Called, DefaultTrackSelector.Parameters trackSelectorParameters) {

        PlayerCheckHandler[PlayerPosition].removeCallbacksAndMessages(null);
        PlayerCheckHandler[4].removeCallbacksAndMessages(null);

        if (player[PlayerPosition] != null) {
            player[PlayerPosition].removeListener(playerListener[PlayerPosition]);
            player[PlayerPosition].setPlayWhenReady(false);
        }
        player[4].setPlayWhenReady(false);

        playerListener[4].UpdatePosition(PlayerPosition);
        playerListener[4].UpdateWho_Called(Who_Called);
        playerListener[PlayerPosition] = playerListener[4];

        SimpleExoPlayer tempPlayer = player[PlayerPosition];
        player[PlayerPosition] = player[4];
        player[4] = tempPlayer;

        DefaultTrackSelector tempTrackSelector = trackSelector[PlayerPosition];
        trackSelector[PlayerPosition] = trackSelector[4];
        trackSelector[4] = tempTrackSelector;

        MediaSource tempMediaSource = mediaSources[PlayerPosition];
        mediaSources[PlayerPosition] = mediaSources[4];
        mediaSources[4] = tempMediaSource;

        PlayerView[PlayerPosition].setPlayer(player[PlayerPosition]);
        PlayerView[PlayerPosition].setVisibility(View.VISIBLE);

        player[PlayerPosition].setPlayWhenReady(true);
        trackSelector[PlayerPosition].setParameters(trackSelectorParameters);

        if (PlayerPosition == 0) GetCurrentPosition();

        PlayerView[4].setPlayer(player[4]);
        Clear_PreviewPlayer();
    }

    private void SetupPlayer(int PlayerPosition, int loadControlPosition, int Who_Called, long ResumePosition,
                             boolean StartGetCurrentPosition, DefaultTrackSelector.Parameters trackSelectorParameters) {

        if (IsStopped) {
            monStop();
            return;
        }

        if (BuildConfig.DEBUG) {
            Log.i(TAG, "SetupPlayer position " + PlayerPosition + " player[PlayerPosition] == null " + (player[PlayerPosition] == null));
        }

        PlayerCheckHandler[PlayerPosition].removeCallbacksAndMessages(null);

        if (player[PlayerPosition] == null) {

            trackSelector[PlayerPosition] = new DefaultTrackSelector(this);
            trackSelector[PlayerPosition].setParameters(trackSelectorParameters);

            DefaultRenderersFactory renderersFactory = new DefaultRenderersFactory(this);
            if (BLACKLISTEDCODECS != null)
                renderersFactory.setMediaCodecSelector(new BlackListMediaCodecSelector(BLACKLISTEDCODECS));

            player[PlayerPosition] = new SimpleExoPlayer.Builder(this, renderersFactory, ExtractorsFactory.EMPTY)
                    .setTrackSelector(trackSelector[PlayerPosition])
                    .setLoadControl(loadControl[loadControlPosition])
                    .build();

            playerListener[PlayerPosition] = new PlayerEventListener(PlayerPosition, Who_Called);
            player[PlayerPosition].addListener(playerListener[PlayerPosition]);

            player[PlayerPosition].addAnalyticsListener(new AnalyticsEventListener());

            PlayerView[PlayerPosition].setPlayer(player[PlayerPosition]);

        } else {

            playerListener[PlayerPosition].UpdateWho_Called(Who_Called);
            playerListener[PlayerPosition].UpdatePosition(PlayerPosition);

        }

        player[PlayerPosition].setPlayWhenReady(true);
        player[PlayerPosition].setMediaSource(
                mediaSources[PlayerPosition],
                ResumePosition
        );

        player[PlayerPosition].prepare();

        if (PlayerView[PlayerPosition].getVisibility() != View.VISIBLE)
            PlayerView[PlayerPosition].setVisibility(View.VISIBLE);

        KeepScreenOn(true);

        if (PlayerPosition < 4) {
            //Main players

            //Player can only be accessed from main thread so start a "position listener" to pass the value to Webview
            if (StartGetCurrentPosition) GetCurrentPosition();

            hideLoading(5);
            droppedFrames = 0;
            NetActivityAVG = 0;
            NetCounter = 0;

        } else if (StartGetCurrentPosition) {
            //Preview player

            GetCurrentPositionSmall();
            SmallPlayerCurrentPosition = ResumePosition;

        }

    }

    private void PreparePlayer_Single_PP(int who_called, long ResumePosition, int position) {
        mWho_Called = who_called;
        mResumePosition = ResumePosition > 0 ? ResumePosition : 0;
        if (position == 0) {
            CurrentPositionHandler[0].removeCallbacksAndMessages(null);
            PlayerCurrentPosition = mResumePosition;
        }
        lastSeenTrackGroupArray = null;
        initializePlayer_Single_PP(position);
    }

    // The main player initialization function
    private void initializePlayer_Single_PP(int PlayerPosition) {

        boolean isSmall = PlayerPosition == 1;
        int Who_Called = mWho_Called > 3 ? (mWho_Called - 3) : mWho_Called;

        SetupPlayer(
                PlayerPosition,
                Who_Called,
                Who_Called,
                ((mResumePosition > 0) && (Who_Called > 1)) ? mResumePosition : C.TIME_UNSET,
                PlayerPosition == 0,
                isSmall ? trackSelectorParameters[1] : trackSelectorParameters[0]

        );

        SwitchPlayerAudio(AudioSource);

        if (!isSmall) {
            //Reset small player view so it shows after big one has started
            if (player[1] != null) {
                PlayerView[1].setVisibility(View.GONE);
                PlayerView[1].setVisibility(View.VISIBLE);
            }
        }

    }

    private void initializePlayer_Multi(int PlayerPosition) {

        SetupPlayer(
                PlayerPosition,
                0,
                1,
                C.TIME_UNSET,
                PlayerPosition == 0,
                trackSelectorParameters[1]

        );

        SetMultiVolume(PlayerPosition);

    }

    private void SetMultiVolume(int PlayerPosition) {
        float volume = 0f;
        if (AudioMulti == 4 || AudioMulti == PlayerPosition)
            volume = player[4] == null ? 1f : PreviewOthersAudio;

        player[PlayerPosition].setVolume(volume);
    }

    private void initializePlayer_Preview(Long resumePosition, boolean IsVod) {

        int ActivePlayerAccount = 0;

        for (int i = 0; i < PlayerAccount; i++) {
            if (player[i] != null) ActivePlayerAccount++;
        }

        SetupPlayer(
                4,
                0,
                IsVod ? 2 : 1,
                (IsVod && (resumePosition > 0)) ? resumePosition : C.TIME_UNSET,
                IsVod,
                ActivePlayerAccount > 3 ? trackSelectorParameters[2] : trackSelectorParameters[1]

        );

        player[4].setVolume(PreviewAudio);

    }

    private void ClearPlayer(int position) {
        if (BuildConfig.DEBUG) {
            Log.i(TAG, "ClearPlayer position " + position);
        }

        releasePlayer(position);
        //Multi audio is deal on js side when a player closes
        if (position == 1 && !MultiStreamEnable) SwitchPlayerAudio(1);

        CheckKeepScreenOn();
    }

    private void Clear_PreviewPlayer() {
        if (BuildConfig.DEBUG) {
            Log.i(TAG, "ClearSmallPlayer");
        }

        releasePlayer(4);
        mSetPreviewOthersAudio();

        CurrentPositionHandler[1].removeCallbacksAndMessages(null);
        SmallPlayerCurrentPosition = 0L;
        mResumePositionSmallPlayer = 0L;
        CheckKeepScreenOn();
    }

    private void CheckKeepScreenOn() {
        //All players are close enable screen saver
        if (player[0] == null && player[1] == null && player[2] == null && player[3] == null) {
            KeepScreenOn(false);
            CurrentPositionHandler[0].removeCallbacksAndMessages(null);
            CurrentPositionHandler[1].removeCallbacksAndMessages(null);
        }
    }

    //Stop the player called from js, clear it all
    private void ResetPlayerState() {

        PicturePicture = false;
        AudioSource = 1;

        for (int i = 0; i < PlayerAccount; i++) {
            releasePlayer(i);
        }

        clearResumePosition();
        KeepScreenOn(false);

    }

    //Main release function
    private void releasePlayer(int position) {
        PlayerCheckHandler[position].removeCallbacksAndMessages(null);
        PlayerView[position].setVisibility(View.GONE);

        if (player[position] != null) {
            player[position].release();
            player[position] = null;
            trackSelector[position] = null;
            playerListener[position] = null;
        }

        PlayerCheckCounter[position] = 0;
        PlayerIsPlaying[position] = false;

        if (BuildConfig.DEBUG) {
            Log.i(TAG, "releasePlayer position " + position);
        }
    }

    //Basic player position setting, for resume playback
    private void clearResumePosition() {
        mResumePosition = C.TIME_UNSET;
    }

    private void updateResumePosition(int position) {
        // If PlayerCheckCounter > 1 we already have restarted the player so the value of getCurrentPosition
        // is already gone and we already saved the correct mResumePosition
        if (player[position] != null && PlayerCheckCounter[position] < 2) {
            mResumePosition = GetResumePosition(position);
        }
    }

    private long GetResumePosition(int position) {
        return player[position].isCurrentWindowSeekable() ?
                Math.max(0, player[position].getCurrentPosition()) : C.TIME_UNSET;
    }

    public void KeepScreenOn(boolean keepOn) {
        //On android 6 this seems to cause a exception
        //Didn't manage to catch it on a device I own
        //after this try was added no more reports
        try {
            if (keepOn)
                getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            else
                getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        } catch (Exception e) {
            Log.w(TAG, "KeepScreenOn Exception ", e);
        }
    }

    private void showLoading() {
        loadingView[5].setVisibility(View.VISIBLE);
    }

    private void showLoadingBotton() {
        loadingView[6].setVisibility(View.VISIBLE);
    }

    private void hideLoading(int position) {
        loadingView[position].setVisibility(View.GONE);
    }

    private void SetDefaultLayouts() {
        PreviewTransition = new ChangeBounds();
        PreviewTransition.setDuration(200);
        PreviewTransition.setInterpolator(new LinearInterpolator());

        int[] positions = {
                Gravity.RIGHT | Gravity.BOTTOM,//0
                Gravity.RIGHT | Gravity.CENTER,//1
                Gravity.RIGHT | Gravity.TOP,//2
                Gravity.CENTER | Gravity.TOP,//3
                Gravity.LEFT | Gravity.TOP,//4
                Gravity.LEFT | Gravity.CENTER,//5
                Gravity.LEFT | Gravity.BOTTOM,//6
                Gravity.CENTER | Gravity.BOTTOM//7
        };

        float Density = this.getResources().getDisplayMetrics().density;
        float ScaleDensity = Density / 2.0f;

        int HeightDefault = ScreenSize.y;
        int WidthDefault = ScreenSize.x;

        //Default players sizes
        PlayerViewDefaultSize = new FrameLayout.LayoutParams(
                LayoutParams.MATCH_PARENT,
                LayoutParams.MATCH_PARENT,
                Gravity.TOP
        );

        //PlayerView player used on preview feed positions and sizes
        int[] ExtraWidth = {
                (WidthDefault / 5),
                (int) (WidthDefault / 3.77),
                (int) (WidthDefault / 3.25),
                (int) (WidthDefault / 2.7)
        };
        int[] ExtraHeight = {
                (HeightDefault / 5),
                (int) (HeightDefault / 3.77),
                (int) (HeightDefault / 3.25),
                (int) (HeightDefault / 2.7)
        };
        PlayerViewExtraLayout = new FrameLayout.LayoutParams[ExtraWidth.length][5];

        int margin, i, j, len = PlayerViewExtraLayout.length, lenEx;
        for (i = 0; i < len; i++) {
            PlayerViewExtraLayout[i][0] = new FrameLayout.LayoutParams(ExtraWidth[i], ExtraHeight[i], Gravity.LEFT | Gravity.BOTTOM);
            PlayerViewExtraLayout[i][1] = new FrameLayout.LayoutParams(ExtraWidth[i], ExtraHeight[i], Gravity.LEFT | Gravity.BOTTOM);
            PlayerViewExtraLayout[i][2] = new FrameLayout.LayoutParams(ExtraWidth[i], ExtraHeight[i], Gravity.CENTER | Gravity.BOTTOM);
            PlayerViewExtraLayout[i][3] = new FrameLayout.LayoutParams(ExtraWidth[i], ExtraHeight[i], Gravity.RIGHT | Gravity.BOTTOM);
            PlayerViewExtraLayout[i][4] = new FrameLayout.LayoutParams(ExtraWidth[i], ExtraHeight[i], Gravity.RIGHT | Gravity.BOTTOM);

            lenEx = PlayerViewExtraLayout[i].length;
            for (j = 0; j < lenEx; j++) {
                PlayerViewExtraLayout[i][j].bottomMargin = (int) (ScreenSize.x / 22 * Density / ScaleDensity);
            }

            margin = WidthDefault / 5;//The screen has 5 thumbnails
            margin = (margin + (margin / 2)) - (ExtraWidth[i] / 2);

            PlayerViewExtraLayout[i][1].leftMargin = margin;//Center on the middle of seconds thumb
            PlayerViewExtraLayout[i][3].rightMargin = margin;//Center on the middle of fourth thumb
        }

        int[] PlayerViewSideBySideHeight = {
                (int) (HeightDefault * 0.90),
                (int) (HeightDefault * 0.85),
                (int) (HeightDefault * 0.80),
                (int) (HeightDefault * 0.75),
                (int) (HeightDefault * 0.70),
                (int) (HeightDefault * 0.65),
                (int) (HeightDefault * 0.60),
        };
        int[] PlayerViewSideBySideWidth = {
                (int) (WidthDefault * 0.90),
                (int) (WidthDefault * 0.85),
                (int) (WidthDefault * 0.80),
                (int) (WidthDefault * 0.75),
                (int) (WidthDefault * 0.70),
                (int) (WidthDefault * 0.65),
                (int) (WidthDefault * 0.60),
        };

        len = PlayerViewSideBySideWidth.length;
        PlayerViewSideBySideSize = new FrameLayout.LayoutParams[2][len];
        for (i = 0; i < len; i++) {

            PlayerViewSideBySideSize[0][i] = new FrameLayout.LayoutParams(
                    PlayerViewSideBySideWidth[i],
                    PlayerViewSideBySideHeight[i],
                    Gravity.RIGHT | Gravity.CENTER
            );

            PlayerViewSideBySideSize[1][i] = new FrameLayout.LayoutParams(
                    PlayerViewSideBySideWidth[i],
                    PlayerViewSideBySideHeight[i],
                    Gravity.LEFT | Gravity.CENTER
            );

        }

        //Small player sizes and positions
        int[] SmallPlayerSizesHeight = {
                (HeightDefault / 2),
                (int) (HeightDefault / 2.5),
                (HeightDefault / 3),
                (int) (HeightDefault / 3.5),
                (HeightDefault / 4)
        };
        int[] SmallPlayerSizesWidth = {
                (WidthDefault / 2),
                (int) (WidthDefault / 2.5),
                (WidthDefault / 3),
                (int) (WidthDefault / 3.5),
                (WidthDefault / 4)
        };
        PlayerViewSmallSize = new FrameLayout.LayoutParams[8][SmallPlayerSizesHeight.length];
        len = PlayerViewSmallSize.length;
        for (i = 0; i < len; i++) {
            for (j = 0; j < PlayerViewSmallSize[i].length; j++) {
                PlayerViewSmallSize[i][j] = new FrameLayout.LayoutParams(
                        SmallPlayerSizesWidth[j],
                        SmallPlayerSizesHeight[j],
                        positions[i]
                );
            }
        }
        //The side PP player
        PlayerView[1].setLayoutParams(PlayerViewSmallSize[PicturePicturePosition][PicturePictureSize]);

        //MultiStream
        MultiStreamPlayerViewLayout = new FrameLayout.LayoutParams[8];
        //4 way same size
        MultiStreamPlayerViewLayout[0] = new FrameLayout.LayoutParams(
                (WidthDefault / 2),
                (HeightDefault / 2),
                positions[4]
        );
        MultiStreamPlayerViewLayout[1] = new FrameLayout.LayoutParams(
                (WidthDefault / 2),
                (HeightDefault / 2),
                positions[2]
        );

        MultiStreamPlayerViewLayout[2] = new FrameLayout.LayoutParams(
                (WidthDefault / 2),
                (HeightDefault / 2),
                positions[6]
        );

        MultiStreamPlayerViewLayout[3] = new FrameLayout.LayoutParams(
                (WidthDefault / 2),
                (HeightDefault / 2),
                positions[0]
        );

        //4 way main big
        MultiStreamPlayerViewLayout[4] = new FrameLayout.LayoutParams(
                (WidthDefault * 2 / 3),
                (HeightDefault * 2 / 3),
                positions[4]
        );

        MultiStreamPlayerViewLayout[5] = new FrameLayout.LayoutParams(
                (WidthDefault / 3),
                (HeightDefault / 3),
                positions[6]
        );

        MultiStreamPlayerViewLayout[6] = new FrameLayout.LayoutParams(
                (WidthDefault / 3),
                (HeightDefault / 3),
                positions[7]
        );

        MultiStreamPlayerViewLayout[7] = new FrameLayout.LayoutParams(
                (WidthDefault / 3),
                (HeightDefault / 3),
                positions[0]
        );
    }

    //Used in side-by-side mode chat plus video
    private void updateVideSize(boolean FullScreen) {
        isFullScreen = FullScreen;
        if (FullScreen)
            PlayerView[0].setLayoutParams(PlayerViewDefaultSize);//100% width x height
        else
            PlayerView[0].setLayoutParams(PlayerViewSideBySideSize[FullScreenPosition][FullScreenSize]);//CENTER_VERTICAL 75% width x height
    }

    //Used in 50/50 mode two videos on the center plus two chat one on it side
    private void updateVideSizePP(boolean FullScreen) {
        isFullScreen = FullScreen;
        if (FullScreen) {
            PlayerView[0].setLayoutParams(PlayerViewDefaultSize);
            UpdadeSizePosSmall(1, false);
        } else {
            PlayerView[0].setLayoutParams(PlayerViewSmallSize[3][0]);//center top 50% width x height
            PlayerView[1].setLayoutParams(PlayerViewSmallSize[7][0]);//center bottom 50% width x height
        }
    }

    //SwitchPlayer with is the big and small player used by picture in picture mode
    private void SwitchPlayer() {
        int i;

        //Pausing the playback prevent (is not 100% but prevent most cases) the player from display a flicker green screen, or odd green artifacts after the switch
        //The odd behavior will stay until the player is releasePlayer
        for (i = 0; i < 2; i++) {
            if (player[i] != null) player[i].setPlayWhenReady(false);
        }

        SimpleExoPlayer tempMainPlayer = player[0];
        player[0] = player[1];
        player[1] = tempMainPlayer;

        DefaultTrackSelector tempTrackSelector = trackSelector[0];
        trackSelector[0] = trackSelector[1];
        trackSelector[1] = tempTrackSelector;

        MediaSource tempMediaSource = mediaSources[0];
        mediaSources[0] = mediaSources[1];
        mediaSources[1] = tempMediaSource;

        for (i = 0; i < 2; i++) {

            PlayerView[i].setPlayer(player[i]);
            if (player[i] != null) player[i].setPlayWhenReady(true);

            if (trackSelector[i] != null)
                trackSelector[i].setParameters(trackSelectorParameters[i]);

            if (playerListener[i] != null)
                playerListener[i].UpdatePosition(i ^ 1);

        }

        SwitchPlayerAudio(AudioSource);

    }

    public void SwitchPlayerAudio(int pos) {
        float volume = player[4] == null ? 1f : PreviewOthersAudio;
        AudioSource = pos;
        if (pos >= 2) {//both
            AudioMulti = 4;
            SetAudio(0, volume);
            SetAudio(1, volume);
        } else if (pos == 1) {//Main
            AudioMulti = 0;
            SetAudio(0, volume);
            SetAudio(1, 0f);
        } else {//Small
            AudioMulti = 1;
            SetAudio(0, 0f);
            SetAudio(1, volume);
        }
    }

    public void SetAudio(int pos, float volume) {
        if (player[pos] != null) player[pos].setVolume(volume);
    }

    public void UpdadeSizePosSmall(int pos, boolean animate) {
        PlayerView[pos].setLayoutParams(PlayerViewSmallSize[PicturePicturePosition][PicturePictureSize]);
        AnimateSetLayoutParams(
                PlayerView[pos],
                PlayerViewSmallSize[PicturePicturePosition][PicturePictureSize],
                animate
        );
    }

    public void AnimateSetLayoutParams(ViewGroup view, FrameLayout.LayoutParams layout, boolean animate) {
        //Animate the size changes looks odd, the video it self is slow to resize and there is a ghost effect, not noticeable when changing only the position
        if (animate) TransitionManager.beginDelayedTransition(view, PreviewTransition);
        view.setLayoutParams(layout);
    }

    public void mSetPreviewOthersAudio() {
        if (MultiStreamEnable) SetPlayerAudioMulti();
        else SwitchPlayerAudio(AudioSource);
    }

    public void SetPlayerAudioMulti() {

        float volume = player[4] == null ? 1f : PreviewOthersAudio;

        for (int i = 0; i < PlayerAccount; i++) {

            if (player[i] != null) {

                if (AudioMulti == 4 || AudioMulti == i) player[i].setVolume(volume);
                else player[i].setVolume(0f);

            }

        }

    }

    public void SetMultiStreamMainBig(int offset) {

        for (int i = 0; i < PlayerAccount; i++) {

            PlayerView[i].setLayoutParams(MultiStreamPlayerViewLayout[i + 4]);
            PlayerView[i].setVisibility(View.VISIBLE);

        }

        if (offset != 0) {

            SimpleExoPlayer tempPlayer;
            DefaultTrackSelector tempTrackSelector;
            MediaSource tempMediaSource;

            int len = Math.abs(offset);
            int i;
            int j;
            int j_len = PlayerAccount - 1;

            boolean left = offset > 0;

            //Pausing the playback prevent (is not 100% but prevent most cases) the player from display a flicker green screen, or odd green artifacts after the switch
            //The odd behavior will stay until the player is releasePlayer
            for (i = 0; i < PlayerAccount; i++) {

                if (player[i] != null) {

                    player[i].setPlayWhenReady(false);

                }

            }

            for (i = 0; i < len; i++) {

                //https://www.javatpoint.com/java-program-to-left-rotate-the-elements-of-an-array
                if (left) {//if offset = 1 result 1 2 3 0

                    //Stores the first element of the array
                    tempPlayer = player[0];
                    tempTrackSelector = trackSelector[0];
                    tempMediaSource = mediaSources[0];

                    for (j = 0; j < j_len; j++) {
                        //Shift element of array by one
                        player[j] = player[j + 1];
                        trackSelector[j] = trackSelector[j + 1];
                        mediaSources[j] = mediaSources[j + 1];

                        if (playerListener[j] != null)
                            playerListener[j].UpdatePosition(j + 1);
                    }
                    //First element of array will be added to the end
                    player[j] = tempPlayer;
                    trackSelector[j] = tempTrackSelector;
                    mediaSources[j] = tempMediaSource;

                    if (playerListener[j] != null)
                        playerListener[j].UpdatePosition(0);

                    //https://www.javatpoint.com/java-program-to-right-rotate-the-elements-of-an-array
                } else {// else if offset -1 result 3 0 1 2

                    //Stores the last element of array
                    tempPlayer = player[3];
                    tempTrackSelector = trackSelector[3];
                    tempMediaSource = mediaSources[3];

                    for (j = j_len; j > 0; j--) {
                        //Shift element of array by one
                        player[j] = player[j - 1];
                        trackSelector[j] = trackSelector[j - 1];
                        mediaSources[j] = mediaSources[j - 1];

                        if (playerListener[j] != null)
                            playerListener[j].UpdatePosition(j - 1);
                    }
                    //Last element of array will be added to the start of array.
                    player[0] = tempPlayer;
                    trackSelector[0] = tempTrackSelector;
                    mediaSources[0] = tempMediaSource;

                    if (playerListener[0] != null)
                        playerListener[0].UpdatePosition(3);
                }

            }

            for (i = 0; i < PlayerAccount; i++) {
                PlayerView[i].setPlayer(player[i]);
            }

            for (i = 0; i < PlayerAccount; i++) {

                if (player[i] != null) {

                    player[i].setPlayWhenReady(true);

                }

            }
        }

        AudioMulti = AudioMulti == 4 ? AudioMulti : 0;
        SetPlayerAudioMulti();

        if (trackSelector[0] != null)
            trackSelector[0].setParameters(trackSelectorParameters[1]);

    }

    public void SetMultiStream() {

        for (int i = 0; i < PlayerAccount; i++) {
            PlayerView[i].setLayoutParams(MultiStreamPlayerViewLayout[i]);
        }

        if (trackSelector[0] != null)
            trackSelector[0].setParameters(trackSelectorParameters[1]);
    }

    public void UnSetMultiStream() {
        ClearPlayer(2);
        ClearPlayer(3);

        if (PicturePicture) {

            updateVideSizePP(isFullScreen);

            //Reset small player position over big player, as after a resume all player restart and position is reset on that case
            PlayerView[1].setVisibility(View.GONE);
            PlayerView[1].setVisibility(View.VISIBLE);

        } else {

            updateVideSize(isFullScreen);
            PlayerView[1].setLayoutParams(PlayerViewSmallSize[PicturePicturePosition][PicturePictureSize]);

        }

        if (!PicturePicture || player[0] == null || player[1] == null) {

            PicturePicture = false;
            ClearPlayer(1);
            SwitchPlayerAudio(1);

        } else SwitchPlayerAudio(AudioSource);

        PlayerView[2].setVisibility(View.GONE);
        PlayerView[3].setVisibility(View.GONE);

        if (trackSelector[0] != null)
            trackSelector[0].setParameters(trackSelectorParameters[0]);
    }

    private void GetCurrentPosition() {
        CurrentPositionHandler[0].removeCallbacksAndMessages(null);

        CurrentPositionHandler[0].postDelayed(() -> {

            PlayerCurrentPosition = player[0] != null ? player[0].getCurrentPosition() : 0L;

            GetCurrentPosition();

        }, 500);
    }

    private void GetCurrentPositionSmall() {
        CurrentPositionHandler[1].removeCallbacksAndMessages(null);

        CurrentPositionHandler[1].postDelayed(() -> {

            SmallPlayerCurrentPosition = player[4] != null ? player[4].getCurrentPosition() : 0L;

            GetCurrentPositionSmall();

        }, 500);
    }

    private void ShowNoNetworkWarning() {
        ShowWarningText(getString(R.string.no_network));
        NetworkCheck();
    }

    private void NetworkCheck() {
        MainThreadHandler.postDelayed(() -> {
            if (Tools.isConnected(this)) {
                HideWarningText();
                initializeWebViewEnd();
            } else NetworkCheck();
        }, 250);
    }

    private void ShowWarningText(String text) {
        TextView warning = findViewById(R.id.warning);
        warning.setText(text);
        warning.setVisibility(View.VISIBLE);
        warningShowing = true;
    }

    private void HideWarningText() {
        TextView warning = findViewById(R.id.warning);
        warning.setVisibility(View.GONE);
        warningShowing = false;
    }

    private void SetPing() {
        //Ping handler this handler may block the Queue but is very light run it on separated treads
        //So one can un block the other
        PingSDKBool = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O;
        HandlerThread[] runtimeThread = new HandlerThread[PingSDKBool ? 1 : 2];

        for (int i = 0; i < runtimeThread.length; i++) {

            runtimeThread[i] = new HandlerThread("RT" + i);
            runtimeThread[i].start();
            RuntimeHandler[i] = new Handler(runtimeThread[i].getLooper());

        }

        PingRuntime = Runtime.getRuntime();
    }

    private void StartPing() {
        RuntimeHandler[0].removeCallbacksAndMessages(null);
        RuntimeHandler[0].postDelayed(this::CheckPing, 5000);
    }

    private void CheckPing() {
        String TempPing = DoGetPing();
        if (!PingSDKBool) RuntimeHandler[1].removeCallbacksAndMessages(null);

        if (TempPing != null) {

            PingValue = Float.parseFloat(TempPing);
            PingValueAVG += PingValue;
            PingCounter++;
            //Reset error check
            PingErrorCounter = 0L;
            //Prevent clear ShowNoNetworkWarning
            if (warningShowing) MainThreadHandler.post(this::HideWarningText);

        } else if (!warningShowing && PingWarning && player[0] == null) {//Prevent showing if playing or disabled by user

            PingErrorCounter++;
            if (PingErrorCounter > 3) {//> 0 1 2 3 = 32s... 5 seconds of postDelayed plus 3 seconds of waitFor/postDelayed times 4 = 32s

                PingErrorCounter = 0L;
                MainThreadHandler.post(() -> ShowWarningText(getString(R.string.no_internet)));
                MainThreadHandler.postDelayed(this::HideWarningText, 30000);

            }

        }

        if (!IsStopped) StartPing();

    }

    private void DestroyGetPing() {
        try {
            if (PingProcess != null) PingProcess.destroy();
        } catch (Exception ignore) {
        }
    }

    @SuppressLint("NewApi")
    private String DoGetPing() {
        PingProcess = null;

        try {

            PingProcess = PingRuntime.exec("ping -c 1 api.twitch.tv");

            if (PingSDKBool) {

                if (!PingProcess.waitFor(3, TimeUnit.SECONDS)) {
                    PingProcess.destroy();
                    return null;
                }

            } else {

                RuntimeHandler[1].removeCallbacksAndMessages(null);
                RuntimeHandler[1].postDelayed(this::DestroyGetPing, 3000);

            }

            Matcher pingMatcher = TIME_NAME.matcher(Tools.readFullyString(PingProcess.getInputStream()));
            PingProcess.getErrorStream();

            return pingMatcher.find() ? pingMatcher.group(1) : null;

        } catch (Exception ignore) {
        } finally {
            if (PingProcess != null) PingProcess.destroy();
        }

        return null;
    }

    @Override
    public void onResume() {
        super.onResume();
        if (!IsStopped)
            return;//Prevent onResume call after startActivityForResult() from OpenExternal()
        IsStopped = false;

        if (!WebviewLoaded) return;

        Intent intent = getIntent();
        boolean isChannelIntent = Objects.equals(intent.getAction(), Constants.CHANNEL_INTENT);
        intent.setAction(null);
        setIntent(intent);

        if (Tools.isConnected(this)) {
            if (isChannelIntent && AlreadyStarted) CheckIntent(intent);
            DoResume(isChannelIntent);
        } else if (AlreadyStarted) {
            ShowNoNetworkResumeWarning(isChannelIntent);
        }

        StopNotificationService();

        if (BuildConfig.DEBUG) {
            Log.i(TAG, "onResume end");
        }
    }

    private void SaveIntent(Intent intent) {
        String IntentObj = intent.getStringExtra(Constants.CHANNEL_OBJ);
        //IntentObj == null the channel content is empty or user clicked on the refresh opt
        LastIntent = IntentObj != null ? IntentObj : String.valueOf(intent.getIntExtra(Constants.CHANNEL_TYPE, 0));
    }

    private void CheckIntent(Intent intent) {
        if (!canRunChannel) return;

        IntentObj = intent.getStringExtra(Constants.CHANNEL_OBJ);

        if (IntentObj != null) {

            mWebView.loadUrl("javascript:smartTwitchTV.Main_onNewIntent(Android.GetIntentObj())");

        } else {

            RefreshChannel(intent.getIntExtra(Constants.CHANNEL_TYPE, 0), false, this);
            mWebView.loadUrl("javascript:smartTwitchTV.Main_CheckResume()");

        }

    }

    public void RefreshChannel(int Type, boolean skipToast, Context context) {
        if (!canRunChannel || Type == 0) return;

        ChannelHandler.post(() -> {

            String[][] DEFAULT_HEADERS = {
                    {Constants.BASE_HEADERS[0][0], Tools.getString(Constants.PREF_CLIENT_ID, null, appPreferences)},
                    {Constants.BASE_HEADERS[1][0], Constants.BASE_HEADERS[1][1]}
            };

            try {
                switch (Type) {
                    case Constants.CHANNEL_TYPE_LIVE:
                        ChannelsUtils.StartLive(context, appPreferences, DEFAULT_HEADERS);
                        break;
                    case Constants.CHANNEL_TYPE_USER_LIVE:
                        ChannelsUtils.SetUserLive(
                                context,
                                Tools.getString(Constants.PREF_USER_ID, null, appPreferences),
                                appPreferences
                        );
                        break;
                    case Constants.CHANNEL_TYPE_FEATURED:
                        ChannelsUtils.StartFeatured(context, DEFAULT_HEADERS);
                        break;
                    case Constants.CHANNEL_TYPE_GAMES:
                        ChannelsUtils.StartGames(context, DEFAULT_HEADERS);
                        break;
                    case Constants.CHANNEL_TYPE_USER_GAMES:
                        ChannelsUtils.StartUserGames(
                                context,
                                Tools.getString(Constants.PREF_USER_NAME, null, appPreferences)
                        );
                        break;
                    case Constants.CHANNEL_TYPE_USER_HOST:
                        ChannelsUtils.StartUserHost(
                                context,
                                Tools.getString(Constants.PREF_USER_NAME, null, appPreferences)
                        );
                        break;
                    default:
                        break;
                }

            } catch (Exception e) {
                Log.w(TAG, "RefreshChannel Type" + Type + " Exception ", e);
            }

            if (!skipToast) RefreshChannelToast(Type, context);
        });

    }

    public void RefreshChannelToast(int Type, Context context) {
        if (!canRunChannel || Type == 0) return;

        Toast.makeText(context, Constants.CHANNELS_NAMES[Type] + " home screen channel refreshed", Toast.LENGTH_LONG).show();

        LoadUrlWebview("javascript:smartTwitchTV.Main_EventChannelRefresh(" + Type + ")");
    }

    private void DoResume(boolean skipResumeJS) {
        if (mWebView != null && AlreadyStarted) {
            StartPing();

            if (!skipResumeJS) {
                mWebView.loadUrl("javascript:smartTwitchTV.Main_CheckResume()");
            }

        }
    }

    private void ShowNoNetworkResumeWarning(boolean skipResumeJS) {
        ShowWarningText(getString(R.string.no_network));
        NetworkResumeCheck(skipResumeJS);
    }

    private void NetworkResumeCheck(boolean skipResumeJS) {
        MainThreadHandler.postDelayed(() -> {
            if (Tools.isConnected(this)) {
                HideWarningText();
                DoResume(skipResumeJS);
            } else {
                if (!IsStopped) NetworkResumeCheck(skipResumeJS);
                else HideWarningText();
            }
        }, 250);
    }

    private void ClearWebViewChache() {
        if (mWebView != null) {
            CookieManager.getInstance().removeAllCookies(null);
            CookieManager.getInstance().flush();
            mWebView.clearCache(true);
            mWebView.clearHistory();

            DeleteHandler.post(() -> Tools.deleteCache(this));
        }
    }

    //This function is called when home key is pressed
    @Override
    public void onStop() {
        super.onStop();
        monStop();
    }

    private void monStop() {
        IsStopped = true;
        if (!WebviewLoaded) return;

        int temp_AudioMulti = AudioMulti;

        updateResumePosition(0);//VOD only uses mainPlayer
        for (int i = 0; i < PlayerAccount; i++) {
            ClearPlayer(i);
        }
        Clear_PreviewPlayer();
        CurrentPositionHandler[0].removeCallbacksAndMessages(null);

        ClearWebViewChache();

        //Prevent java timeout and related on background
        if (mWebView != null && AlreadyStarted) {
            mWebView.loadUrl("javascript:smartTwitchTV.Main_CheckStop()");
        }

        //Clear activity notification check and start background service if enable
        NotificationHandler.removeCallbacksAndMessages(null);
        StartNotificationService();

        //ClearPlayer will reset audio position
        AudioMulti = temp_AudioMulti;

        //Reset status values
        PingValue = 0f;
        PingValueAVG = 0f;
        PingCounter = 0L;

        droppedFrames = 0;
        DroppedFramesTotal = 0L;

        conSpeed = 0f;
        conSpeedAVG = 0f;
        SpeedCounter = 0L;

        netActivity = 0f;
        NetActivityAVG = 0f;
        NetCounter = 0L;

        if (BuildConfig.DEBUG) {
            Log.i(TAG, "onStop");
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (!AlreadyStarted) return;

        StopNotifications();

        StartNotificationService();

        for (int i = 0; i < PlayerAccount; i++) {
            ClearPlayer(i);
        }

        Clear_PreviewPlayer();

        if (BuildConfig.DEBUG) {
            Log.i(TAG, "onDestroy");
        }
    }

    public void StopNotifications() {
        NotificationHandler.removeCallbacksAndMessages(null);
        ToastHandler.removeCallbacksAndMessages(null);
        appPreferences.put(Constants.PREF_NOTIFICATION_WILL_END, 0);
    }

    public void StartNotificationService() {
        //closeThisCalled... If the user force close the app using closeThis() the service can't run
        if (appPreferences != null && !closeThisCalled && NotificationUtils.StartNotificationService(appPreferences))
            Tools.SendNotificationIntent(Constants.ACTION_NOTIFY_START, this);
    }

    public void StopNotificationService() {
        long delay = Tools.getLong(Constants.PREF_NOTIFICATION_WILL_END, 0, appPreferences);

        if (appPreferences != null && NotificationUtils.StartNotificationService(appPreferences)) {
            ChannelHandler.postDelayed(() -> Tools.SendNotificationIntent(Constants.ACTION_NOTIFY_STOP, this), delay > 0 ? delay : 0);
        }

    }

    private void InitNotifications(int timeout, Context context) {
        try {

            NotificationHandler.removeCallbacksAndMessages(null);

            long delay = Tools.getLong(Constants.PREF_NOTIFICATION_WILL_END, 0, appPreferences);
            if (delay > 0) delay = delay - System.currentTimeMillis();

            NotificationHandler.postDelayed(() -> {

                if (!IsStopped) {
                    RunNotifications(context);
                    InitNotifications(Constants.NOTIFICATION_CHECK_INTERVAL, context);//it 3 min refresh
                }

            }, timeout + (delay > 0 ? delay : 0));

        } catch (Exception e) {
            Log.w(TAG, "InitNotifications e ", e);
        }
    }

    private void RunNotifications(Context context) {
        if (!Tools.isConnected(context)) return;

        String UserId = Tools.getString(Constants.PREF_USER_ID, null, appPreferences);

        if (UserId != null) {

            NotificationUtils.CheckNotifications(
                    UserId,
                    appPreferences,
                    ToastHandler,
                    context
            );

        } else NotificationHandler.removeCallbacksAndMessages(null);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus && !deviceIsTV) {
            hideSystemUI();
        }
    }

    public void hideSystemUI() {
        // Enables regular immersive mode.
        // For "lean back" mode, remove SYSTEM_UI_FLAG_IMMERSIVE.
        // Or for "sticky immersive," replace it with SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        View decorView = getWindow().getDecorView();
        decorView.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                        // Set the content to appear under the system bars so that the
                        // content doesn't resize when the system bars hide and show.
                        | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        // Hide the nav bar and status bar
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN);
    }

    //Force close the app
    private void closeThis() {
        if (BuildConfig.DEBUG) {
            Log.i(TAG, "closeThis");
        }
        closeThisCalled = true;
        StopNotifications();
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
        if (keyCode == KeyEvent.KEYCODE_BACK && event.isTracking() && !event.isCanceled()) {
            // if the call key is being released, AND we are tracking
            // it from an initial key down, AND it is not canceled,
            // then handle it.
            mWebView.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_F2));
            mWebView.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_F2));
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
            mWebView.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_P));
            mWebView.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_P));
            return true;
        } else if (event.getKeyCode() == KeyEvent.KEYCODE_MEDIA_PAUSE) {
            //Prevent send it up down and up
            if (event.getAction() == KeyEvent.ACTION_DOWN) return true;

            //S for stop/pause
            mWebView.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_S));
            mWebView.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_S));
            return true;
        }

        return super.dispatchKeyEvent(event);
    }

    public void LoadUrlWebview(String LoadUrlString) {
        MainThreadHandler.post(() -> mWebView.loadUrl(LoadUrlString));
    }

    // A web app that loads all thumbnails content and interact with the player
    private void initializeWebview() {
        mWebView = findViewById(R.id.WebView);
        mWebView.setBackgroundColor(Color.TRANSPARENT);

        if (BuildConfig.DEBUG) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        WebSettings websettings = mWebView.getSettings();

        websettings.setJavaScriptEnabled(true);
        websettings.setDomStorageEnabled(true);
        websettings.setAllowFileAccess(true);
        websettings.setAllowContentAccess(true);
        websettings.setAllowFileAccessFromFileURLs(true);
        websettings.setAllowUniversalAccessFromFileURLs(true);
        websettings.setUseWideViewPort(true);
        websettings.setCacheMode(WebSettings.LOAD_NO_CACHE);

        mWebView.clearCache(true);
        mWebView.clearHistory();

        mWebView.addJavascriptInterface(new WebAppInterface(this), "Android");

        //When we request a full url change on autentication key request
        //prevent open it on a external browser
        mWebView.setWebViewClient(new WebViewClient() {

            @SuppressWarnings({"deprecation", "RedundantSuppression"})
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false;
            }

            @TargetApi(Build.VERSION_CODES.N)
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return false;
            }

        });

        if (Tools.isConnected(this)) initializeWebViewEnd();
        else ShowNoNetworkWarning();

        mWebView.requestFocus();
    }

    private void initializeWebViewEnd() {

        //Run on screen key and notification on a separated WebView
        if (!deviceIsTV) initializeWebViewKey();
        else {
            mWebViewKey = findViewById(R.id.WebViewKey);
            mWebViewKey.setVisibility(View.GONE);
        }

        mWebView.loadUrl(Constants.PageUrl);
        WebviewLoaded = true;
        mWebView.requestFocus();

        //The recommendation is to start this on BroadcastReceiver action ACTION_INITIALIZE_PROGRAMS
        //But that process is bugged the BroadcastReceiver gets called too many times some times 3 plus under a second after the
        //app gets installed... so do it here, as is a better option as the user will not get the default channel added unless the app is opened
        if (canRunChannel) {

            ChannelHandler.postDelayed(() -> {

                if (ChannelsUtils.isJobServiceNotSchedule(this)) {

                    ChannelsUtils.scheduleSyncingChannel(this);

                } else {

                    try {
                        ChannelsUtils.UpdateAllChannels(this, appPreferences);
                    } catch (Exception e) {
                        Log.w(TAG, "UpdateAllChannels Exception ", e);
                    }

                }

            }, 3000);

        }

        StartPing();
    }

    private void initializeWebViewKey() {
        mWebViewKey = findViewById(R.id.WebViewKey);
        mWebViewKey.setBackgroundColor(Color.TRANSPARENT);

        if (BuildConfig.DEBUG) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        WebSettings websettings = mWebViewKey.getSettings();

        websettings.setJavaScriptEnabled(true);
        websettings.setDomStorageEnabled(true);
        websettings.setAllowFileAccess(true);
        websettings.setAllowContentAccess(true);
        websettings.setAllowFileAccessFromFileURLs(true);
        websettings.setAllowUniversalAccessFromFileURLs(true);
        websettings.setUseWideViewPort(true);
        websettings.setCacheMode(WebSettings.LOAD_NO_CACHE);

        mWebViewKey.clearCache(true);
        mWebViewKey.clearHistory();

        mWebViewKey.addJavascriptInterface(new WebAppInterface(this), "Android");

        //When we request a full url change on autentication key request
        //prevent open it on a external browser
        mWebViewKey.setWebViewClient(new WebViewClient() {

            @SuppressWarnings({"deprecation", "RedundantSuppression"})
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false;
            }

            @TargetApi(Build.VERSION_CODES.N)
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return false;
            }

            @Override
            public boolean shouldOverrideKeyEvent(WebView view, KeyEvent event) {
                //because this WebView in on top key will be dispatched here
                //Main WebView must handle all the keys
                MainThreadHandler.post(() -> mWebView.dispatchKeyEvent(event));
                //If return true, WebView will not handle the key event
                return true;
            }

        });

        mWebViewKeyIsShowing = true;
        mWebViewKey.loadUrl(Constants.KeyPageUrl);
    }

    public void mSetQuality(int position) {

        if (trackSelector[0] != null) {
            IsInAutoMode = position == -1;

            if (IsInAutoMode) {
                trackSelector[0].setParameters(trackSelectorParameters[0]);
                return;
            }

            MappingTrackSelector.MappedTrackInfo mappedTrackInfo = trackSelector[0].getCurrentMappedTrackInfo();

            if (mappedTrackInfo != null) {
                for (int rendererIndex = 0; rendererIndex < mappedTrackInfo.getRendererCount(); rendererIndex++) {

                    if (mappedTrackInfo.getRendererType(rendererIndex) == C.TRACK_TYPE_VIDEO) {

                        DefaultTrackSelector.ParametersBuilder builder = trackSelector[0].getParameters().buildUpon();
                        builder.clearSelectionOverrides(rendererIndex).setRendererDisabled(rendererIndex, false);

                        if (position < mappedTrackInfo.getTrackGroups(rendererIndex).get(/* groupIndex */ 0).length) {// else auto quality

                            builder.setSelectionOverride(
                                    rendererIndex,
                                    mappedTrackInfo.getTrackGroups(rendererIndex),
                                    new DefaultTrackSelector.SelectionOverride(/* groupIndex */ 0, position)//groupIndex = 0 as the length of trackGroups in trackGroupArray is always 1
                            );

                        }

                        trackSelector[0].setParameters(builder);
                        break;
                    }

                }
            }
        }
    }

    public void RequestGetQualities(int Who_Called) {

        if (!PicturePicture && !MultiStreamEnable && Who_Called < 3) {
            mWebView.loadUrl("javascript:smartTwitchTV.Play_getQualities(" + Who_Called + ")");
        }
    }

    public void PlayerEventListenerCheckCounter(int position, int Who_Called, int fail_type) {
        PlayerCheckHandler[position].removeCallbacksAndMessages(null);

        //Pause to things run smother and prevent odd behavior during the checks
        if (player[position] != null) {

            player[position].setPlayWhenReady(false);

        }

        PlayerCheckCounter[position]++;

        if (BuildConfig.DEBUG) {
            Log.i(TAG, "PlayerEventListenerCheckCounter position " + position + " PlayerCheckCounter[position] " + PlayerCheckCounter[position]);
        }

        if (position < 4) {
            //Main players

            if (PlayerCheckCounter[position] < 4 && PlayerCheckCounter[position] > 1 && Who_Called < 3) {

                if (CheckSource && !IsInAutoMode && !MultiStreamEnable && !PicturePicture)//force go back to auto freeze for too long auto will resolve
                    LoadUrlWebview("javascript:smartTwitchTV.Play_PlayerCheck(" + Who_Called + ")");
                else//already on auto just restart the player
                    PlayerEventListenerCheckCounterEnd(position, Who_Called);

            } else if (PlayerCheckCounter[position] > 3) {

                // try == 3 Give up internet is probably down or something related
                PlayerEventListenerClear(position, fail_type);

            } else if (PlayerCheckCounter[position] > 1) {//only for clips

                // Second check drop quality as it freezes too much
                LoadUrlWebview("javascript:smartTwitchTV.Play_PlayerCheck(" + Who_Called + ")");

            } else PlayerEventListenerCheckCounterEnd(position, Who_Called);//first check just reset

        } else {
            //Preview player

            boolean IsVod = Who_Called == 2;

            if (IsVod) {
                // If PlayerCheckCounter > 1 we already have restarted the player so the value of getCurrentPosition
                // is already gone and we already saved the correct mResumePositionSmallPlayer
                if (PlayerCheckCounter[position] < 2 && player[position] != null) {

                    mResumePositionSmallPlayer = GetResumePosition(position);

                }

            } else mResumePositionSmallPlayer = 0L;

            if (PlayerCheckCounter[position] < 4) {

                initializePlayer_Preview(mResumePositionSmallPlayer, IsVod);

            } else {

                Clear_PreviewPlayer();
                LoadUrlWebview("javascript:smartTwitchTV.Play_CheckIfIsLiveClean(" + fail_type + ")");

            }

        }
    }

    //First check only reset the player as it may be stuck
    public void PlayerEventListenerCheckCounterEnd(int position, int Who_Called) {
        if (BuildConfig.DEBUG) {
            Log.i(TAG, "PlayerEventListenerCheckCounterEnd position " + position + " PlayerCheckCounter[position] " + PlayerCheckCounter[position]);
        }

        if (Who_Called == 1) clearResumePosition();
        else if (Who_Called == 2) updateResumePosition(position);//VOD

        if (Who_Called == 1) {

            if (MultiStreamEnable) initializePlayer_Multi(position);
            else initializePlayer_Single_PP(position);

        } else initializePlayer_Single_PP(position);
    }

    public void PlayerEventListenerClear(int position, int fail_type) {
        if (BuildConfig.DEBUG) {
            Log.i(TAG, "PlayerEventListenerClear position " + position + " fail_type " + fail_type);
        }
        String WebViewLoad;

        if (position < 4) {
            //Main players

            hideLoading(5);
            hideLoading(position);

            if (MultiStreamEnable) {

                ClearPlayer(position);
                WebViewLoad = "Play_MultiEnd(" + position + "," + fail_type + ")";

            } else if (PicturePicture) {

                ClearPlayer(position);
                WebViewLoad = "PlayExtra_End(" + (position == 0) + "," + fail_type + ")";

            } else if (mWho_Called > 3) {

                ClearPlayer(position);
                WebViewLoad = "Play_CheckIfIsLiveClean(" + fail_type + ")";

            } else WebViewLoad = "Play_PannelEndStart(" + mWho_Called + "," + fail_type + ")";

        } else {
            //Preview player

            Clear_PreviewPlayer();
            WebViewLoad = "Play_CheckIfIsLiveClean(" + fail_type + ")";
            mSetPreviewOthersAudio();

        }

        LoadUrlWebview("javascript:smartTwitchTV." + WebViewLoad);
    }

    @TargetApi(23)
    private void Check_WriteExternalStorage() {
        if (!Tools.WR_storage(this)) {
            requestPermissions(new String[]{
                            Manifest.permission.WRITE_EXTERNAL_STORAGE
                    },
                    123);
        }
    }

    //TO understand better the use of it WebAppInterface functon is used check the file app/specific/Android.js
    @SuppressWarnings({"unused", "RedundantSuppression"})
    public class WebAppInterface {
        final Context mWebViewContext;

        /**
         * Instantiate the interface and set the context
         */
        WebAppInterface(Context context) {
            mWebViewContext = context;
        }

        @JavascriptInterface
        public String GetIntentObj() {
            return IntentObj;
        }

        @JavascriptInterface
        public String GetLastIntentObj() {
            String tempLastIntent = LastIntent;
            LastIntent = null;

            return tempLastIntent;
        }

        @JavascriptInterface
        public void mCheckRefreshToast(int type) {
            RefreshChannelToast(type, mWebViewContext);
        }

        @JavascriptInterface
        public void mCheckRefresh(int type) {
            RefreshChannel(type, true, mWebViewContext);
        }

        @JavascriptInterface
        public String mPageUrl() {
            return Constants.PageUrl;
        }

        @JavascriptInterface
        public void mloadUrl(String url) {
            LoadUrlWebview(url);
        }

        @JavascriptInterface
        public void mshowLoading(boolean show) {
            MainThreadHandler.post(() -> {
                if (show) showLoading();
                else hideLoading(5);
            });
        }

        @JavascriptInterface
        public void mshowLoadingBottom(boolean show) {
            MainThreadHandler.post(() -> {
                if (show) showLoadingBotton();
                else hideLoading(6);
            });
        }

        @JavascriptInterface
        public void mclose(boolean close) {
            MainThreadHandler.post(() -> {
                if (close) closeThis();
                else minimizeThis();
            });
        }

        @JavascriptInterface
        public void showToast(String toast) {
            MainThreadHandler.post(() -> Toast.makeText(mWebViewContext, toast, Toast.LENGTH_LONG).show());
        }

        @JavascriptInterface
        public void OpenExternal(String url) {

            MainThreadHandler.post(() -> {

                Intent intent = new Intent(Intent.ACTION_VIEW);
                intent.setDataAndType(Uri.parse(url), "video/*");

                if (intent.resolveActivity(getPackageManager()) != null) {
                    startActivityForResult(intent, 101);
                } else {
                    Toast.makeText(mWebViewContext, getString(R.string.external_player_fail), Toast.LENGTH_LONG).show();
                }

            });

        }

        @JavascriptInterface
        public boolean isConnected() {
            return Tools.isConnected(mWebViewContext);
        }

        @JavascriptInterface
        public boolean isKeyboardConnected() {
            return getResources().getConfiguration().keyboard == Configuration.KEYBOARD_QWERTY;
        }

        @JavascriptInterface
        public void KeyboardCheckAndHIde() {
            MainThreadHandler.post(() -> {
                if (getResources().getConfiguration().keyboard == Configuration.KEYBOARD_QWERTY) {
                    Tools.hideKeyboardFrom(mWebViewContext, mWebView);
                }
            });
        }

        @JavascriptInterface
        public void hideKeyboardFrom() {
            MainThreadHandler.post(() -> Tools.hideKeyboardFrom(mWebViewContext, mWebView));
        }

        @JavascriptInterface
        public void AvoidClicks(boolean Avoid) {
            if (deviceIsTV) return;

            MainThreadHandler.post(() -> {
                if (Avoid) {
                    mWebViewKeyIsShowing = false;
                    mWebViewKey.setVisibility(View.GONE);
                    mWebView.requestFocus();
                } else {
                    mWebViewKeyIsShowing = true;
                    mWebViewKey.setVisibility(View.VISIBLE);
                    mWebViewKey.requestFocus();
                }
            });
        }

        @JavascriptInterface
        public void initbodyClickSet() {
            if (deviceIsTV) return;

            MainThreadHandler.post(() -> {
                mWebViewKeyIsShowing = true;
                mWebViewKey.setVisibility(View.VISIBLE);
                mWebViewKey.requestFocus();
                mWebViewKey.loadUrl("javascript:Extrapage.initbodyClickSet()");
            });
        }

        @JavascriptInterface
        public void SetKeysOpacity(int Opacity) {
            if (deviceIsTV) return;
            MainThreadHandler.post(() -> mWebViewKey.loadUrl("javascript:Extrapage.Set_dpad_opacity(" + Opacity + ")"));
        }

        @JavascriptInterface
        public void SetKeysPosition(int Position) {
            if (deviceIsTV) return;
            MainThreadHandler.post(() -> mWebViewKey.loadUrl("javascript:Extrapage.Set_dpad_position(" + Position + ")"));
        }

        @JavascriptInterface
        public boolean WebViewKeyIsShowing() {
            return deviceIsTV || mWebViewKeyIsShowing;
        }

        @JavascriptInterface
        public void showKeyboardFrom() {
            MainThreadHandler.post(() -> Tools.showKeyboardFrom(mWebViewContext, mWebView));
        }

        @JavascriptInterface
        public void SetCheckSource(boolean mCheckSource) {
            CheckSource = mCheckSource;
        }

        @JavascriptInterface
        public void SetNotificationPosition(int position) {
            appPreferences.put(Constants.PREF_NOTIFICATION_POSITION, position);
        }

        @JavascriptInterface
        public void SetNotificationRepeat(int times) {
            appPreferences.put(Constants.PREF_NOTIFICATION_REPEAT, times);
        }

        @JavascriptInterface
        public void SetNotificationSinceTime(long time) {
            appPreferences.put(Constants.PREF_NOTIFICATION_SINCE_TIME, time);
        }

        @JavascriptInterface
        public void RunNotificationService() {
            InitNotifications(0, mWebViewContext);
        }

        @JavascriptInterface
        public void StopNotificationService() {
            StopNotifications();
        }

        @JavascriptInterface
        public void upNotificationState(boolean Notify) {
            appPreferences.put(Constants.PREF_NOTIFICATION_BACKGROUND, Notify);
        }

        @JavascriptInterface
        public void SetNotificationLive(boolean Notify) {
            appPreferences.put(Constants.PREF_NOTIFICATION_STREAM_LIVE, Notify);
        }

        @JavascriptInterface
        public void SetNotificationTitle(boolean Notify) {
            appPreferences.put(Constants.PREF_NOTIFICATION_STREAM_TITLE, Notify);
        }

        @JavascriptInterface
        public void SetNotificationGame(boolean Notify) {
            appPreferences.put(Constants.PREF_NOTIFICATION_STREAM_GAME, Notify);
        }

        @JavascriptInterface
        public void SetNotificationGameLive(boolean Notify) {
            appPreferences.put(Constants.PREF_NOTIFICATION_GAME, Notify);
        }

        @JavascriptInterface
        public void setAppIds(String client_id, String client_secret, String redirect_uri) {
            appPreferences.put(Constants.PREF_CLIENT_ID, client_id);
            appPreferences.put(Constants.PREF_CLIENT_SECRET, client_secret);
            appPreferences.put(Constants.PREF_REDIRECT_URI, redirect_uri);
        }

        @JavascriptInterface
        public void UpdateUserId(String id, String name, String refresh_token) {

            String tempUserId = Tools.getString(Constants.PREF_USER_ID, null, appPreferences);
            String temp_refresh_token = Tools.getString(id + Constants.PREF_REFRESH_TOKEN, null, appPreferences);

            appPreferences.put(Constants.PREF_USER_ID, id);
            appPreferences.put(Constants.PREF_USER_NAME, name);
            if (id != null)
                appPreferences.put(id + Constants.PREF_REFRESH_TOKEN, refresh_token);

            if (id == null) {

                StopNotifications();

                ChannelHandler.post(() -> {

                    try {
                        ChannelsUtils.UpdateUserChannels(mWebViewContext, appPreferences);
                    } catch (Exception e) {
                        Log.w(TAG, "UpdateUserChannels Exception ", e);
                    }

                });

            } else if (!Objects.equals(tempUserId, id)) {
                //User has changed stop notifications and reset list
                ToastHandler.removeCallbacksAndMessages(null);
                NotificationUtils.ResetNotificationList(appPreferences, id);

                ChannelHandler.post(() -> {

                    if (refresh_token != null) {

                        if (temp_refresh_token == null ||
                                Tools.getString(id + Constants.PREF_ACCESS_TOKEN, null, appPreferences) == null ||
                                !Objects.equals(temp_refresh_token, refresh_token)) {

                            Tools.refreshTokens(id, appPreferences);

                        } else {

                            Tools.checkTokens(id, appPreferences);

                        }

                    } else Tools.eraseTokens(id, appPreferences);

                    try {
                        ChannelsUtils.UpdateUserChannels(mWebViewContext, appPreferences);
                    } catch (Exception e) {
                        Log.w(TAG, "UpdateUserChannels Exception ", e);
                    }

                });
            } else if (refresh_token != null) {

                if (temp_refresh_token == null ||
                        Tools.getString(id + Constants.PREF_ACCESS_TOKEN, null, appPreferences) == null ||
                        !Objects.equals(temp_refresh_token, refresh_token)) {

                    ChannelHandler.post(() -> Tools.refreshTokens(id, appPreferences));

                } else {

                    ChannelHandler.post(() -> Tools.checkTokens(id, appPreferences));

                }

            } else {

                Tools.eraseTokens(id, appPreferences);

            }
        }

        @JavascriptInterface
        public void upDateLang(String lang) {
            appPreferences.put(Constants.PREF_USER_LANGUAGE, lang);
        }

        @JavascriptInterface
        public void Settings_SetPingWarning(boolean warning) {
            PingWarning = warning;
        }

        @JavascriptInterface
        public void SetFullScreenSize(int mFullScreenSize) {
            FullScreenSize = mFullScreenSize;
        }

        @JavascriptInterface
        public void SetFullScreenPosition(int mFullScreenPosition) {
            FullScreenPosition = mFullScreenPosition;
        }

        @JavascriptInterface
        public void mupdatesize(boolean FullScreen) {
            MainThreadHandler.post(() -> updateVideSize(FullScreen));
        }

        @JavascriptInterface
        public void mupdatesizePP(boolean FullScreen) {
            MainThreadHandler.post(() -> updateVideSizePP(FullScreen));
        }

        @JavascriptInterface
        public void getDuration(String callback) {

            MainThreadHandler.post(() -> {

                if (player[0] != null) {

                    mWebView.loadUrl("javascript:smartTwitchTV." + callback + "(" + player[0].getDuration() + ")");

                }
            });

        }

        @JavascriptInterface
        public void mseekTo(long position) {
            MainThreadHandler.post(() -> {

                if (player[0] != null) {
                    long duration = player[0].getDuration();
                    long jumpPosition = position > 0 ? position : 0;

                    if (jumpPosition >= duration)
                        jumpPosition = duration - 1000;

                    PlayerCurrentPosition = jumpPosition;
                    //Make sure we are playing and not paused, this way the listeners will properly work
                    player[0].setPlayWhenReady(true);
                    player[0].seekTo(jumpPosition);
                }
            });
        }

        @JavascriptInterface
        public void StartAuto(String uri, String mainPlaylistString, int who_called, long ResumePosition, int position) {
            MainThreadHandler.post(() -> {
                boolean startPlayer = true;

                if (mWho_Called > 3) {
                    startPlayer = player[0] == null;
                }

                if (startPlayer) {
                    VideoWebHolder.bringChildToFront(mWebView);

                    boolean reUsePlayer = player[4] != null && PreviewPlayerPlaylist != null && Objects.equals(mainPlaylistString, PreviewPlayerPlaylist);

                    if (reUsePlayer) {

                        ReUsePlayer(position, who_called, trackSelectorParameters[position]);

                        SwitchPlayerAudio(AudioSource);

                    } else {

                        mediaSources[position] = Tools.buildMediaSource(
                                Uri.parse(uri),
                                mWebViewContext,
                                who_called,
                                mLowLatency,
                                mainPlaylistString,
                                userAgent
                        );

                        PreparePlayer_Single_PP(who_called, ResumePosition, position);

                        if (player[4] != null) releasePlayer(4);
                    }

                    PreviewPlayerPlaylist = null;

                    if (position == 1) {
                        PicturePicture = true;
                    }

                } else {

                    hideLoading(5);
                    mWho_Called = who_called;
                    PlayerView[0].setLayoutParams(PlayerViewDefaultSize);

                    mWebView.loadUrl("javascript:smartTwitchTV.Play_UpdateDuration(" + player[0].getDuration() + ")");

                    //Add a delay to make sure the PlayerView already change size before bring webview to front also webview may need a small delay to hide the screen UI and show the player
                    MainThreadHandler.postDelayed(() -> VideoWebHolder.bringChildToFront(mWebView), 100);
                }
            });
        }

        @JavascriptInterface
        public void RestartPlayer(int who_called, long ResumePosition, int position) {
            MainThreadHandler.post(() -> {

                //Player Restart options... the player may randomly display a flicker green screen, or odd green artifacts after a player start or SwitchPlayer
                //The odd behavior will stay until the player is releasePlayer
                releasePlayer(position);

                PreparePlayer_Single_PP(who_called, ResumePosition, position);

                if (position == 1) {

                    PicturePicture = true;

                }
            });
        }

//        @JavascriptInterface
//        public void PlayerEventListenerClearTest() {
//
//            MainThreadHandler.post(() -> PlayerEventListenerClear(0, 1));
//
//        }

        @JavascriptInterface
        public String GetCheckIfIsLiveFeed(int x, int y) {
            return PreviewFeedResult[x][y];
        }

        @JavascriptInterface
        public void CheckIfIsLiveFeed(String token_url, String hls_url, String callback, int x, int y, int Timeout) {
            PreviewFeedResult[x][y] = null;

            DataThreadPool.execute(() ->
                    {
                        try {
                            PreviewFeedResult[x][y] = Tools.getStreamData(token_url, hls_url, 0L, Timeout);
                        } catch (Exception e) {
                            Log.w(TAG, "CheckIfIsLiveFeed Exception ", e);
                        }

                        if (PreviewFeedResult[x][y] != null)
                            LoadUrlWebview("javascript:smartTwitchTV." + callback + "(Android.GetCheckIfIsLiveFeed(" + x + "," + y + "), " + x + "," + y + ")");
                    }
            );
        }

        @JavascriptInterface
        public String getStreamData(String token_url, String hls_url, int Timeout) {
            try {
                return Tools.getStreamData(token_url, hls_url, 0L, Timeout);
            } catch (Exception e) {
                Log.w(TAG, "getStreamData Exception ", e);
            }

            return null;
        }

        @JavascriptInterface
        public void getStreamDataAsync(String token_url, String hls_url, String callback, long checkResult, int position, int Timeout) {
            StreamDataResult[position] = null;

            DataThreadPool.execute(() ->
                    {
                        String result = null;

                        try {
                            result = Tools.getStreamData(token_url, hls_url, checkResult, Timeout);
                        } catch (Exception e) {
                            Log.w(TAG, "getStreamDataAsync Exception ", e);
                        }

                        if (result != null) StreamDataResult[position] = result;
                        else StreamDataResult[position] = Tools.ResponseObjToString(0, "", checkResult);

                        LoadUrlWebview("javascript:smartTwitchTV." + callback + "(Android.GetDataResult(" + position + "), " + position + ")");
                    }
            );

        }

        @JavascriptInterface
        public String GetDataResult(int position) {
            return StreamDataResult[position];
        }

        @JavascriptInterface
        public String mMethodUrlHeaders(String urlString, int timeout, String postMessage, String Method, long checkResult, String JsonHeadersArray) {
            return new Gson().toJson(Tools.MethodUrlHeaders(urlString, timeout, postMessage, Method, 0L, JsonHeadersArray));
        }

        @JavascriptInterface
        public void GetMethodUrlHeadersAsync(String urlString, int timeout, String postMessage, String Method, String JsonHeadersArray,
                                             String callback, long checkResult, long key, int thread) {
            StreamDataResult[thread] = null;

            DataThreadPool.execute(() ->
                    {
                        Tools.ResponseObj response;

                        response = Tools.MethodUrlHeaders(
                                urlString,
                                timeout,
                                postMessage,
                                Method,
                                checkResult,
                                JsonHeadersArray
                        );

                        if (response != null) {
                            StreamDataResult[thread] = new Gson().toJson(response);
                            LoadUrlWebview("javascript:smartTwitchTV." + callback + "(Android.GetDataResult(" + thread + "), " + key + "," + checkResult + ")");
                            return;
                        }

                        //MethodUrl is null inform JS callback
                        StreamDataResult[thread] = Tools.ResponseObjToString(0, "", checkResult);
                        LoadUrlWebview("javascript:smartTwitchTV." + callback + "(Android.GetDataResult(" + thread + "), " + key + "," + checkResult + ")");
                    }
            );
        }

        @JavascriptInterface
        public void SetFeedPosition(int position) {
            MainThreadHandler.post(() -> PlayerView[4].setLayoutParams(PlayerViewExtraLayout[PreviewSize][position]));
        }

        @JavascriptInterface
        public void ClearFeedPlayer(boolean PreventClean) {
            MainThreadHandler.post(() -> {

                if (PreventClean) {

                    if (player[4] != null) player[4].setPlayWhenReady(false);
                    PlayerView[4].setVisibility(View.GONE);

                } else Clear_PreviewPlayer();

            });
        }

        @JavascriptInterface
        public void StartFeedPlayer(String uri, String mainPlaylistString, int position, long resumePosition, boolean isVod) {
            MainThreadHandler.post(() -> {

                PreviewPlayerPlaylist = mainPlaylistString;
                mediaSources[4] = Tools.buildMediaSource(
                        Uri.parse(uri),
                        mWebViewContext,
                        isVod ? 2 : 1,
                        mLowLatency,
                        mainPlaylistString,
                        userAgent
                );

                PlayerView[4].setLayoutParams(PlayerViewExtraLayout[PreviewSize][position]);
                initializePlayer_Preview(resumePosition, isVod);

            });
        }

        @JavascriptInterface
        public void SetPlayerViewFeedBottom(float bottom, int web_height) {
            int i, j, len = PlayerViewExtraLayout.length, lenEx;

            float scale = (float) ScreenSize.y / web_height;//WebView screen size is not the same size as device screen
            float bottomMargin = bottom * scale;
            bottomMargin = (float) ScreenSize.y - bottomMargin;

            for (i = 0; i < len; i++) {
                lenEx = PlayerViewExtraLayout[i].length;
                for (j = 0; j < lenEx; j++) {
                    PlayerViewExtraLayout[i][j].bottomMargin = (int) bottomMargin;
                }
            }
        }

        @JavascriptInterface
        public void SetPlayerViewSidePanel(float bottom, float right, float left, int web_height) {
            PlayerViewSidePanel = Tools.BasePreviewLayout(bottom, right, left, web_height, ScreenSize, false);
        }

        @JavascriptInterface
        public void StartSidePanelPlayer(String uri, String mainPlaylistString) {
            MainThreadHandler.post(() -> {

                mediaSources[0] = Tools.buildMediaSource(
                        Uri.parse(uri),
                        mWebViewContext,
                        1,
                        mLowLatency,
                        mainPlaylistString,
                        userAgent
                );

                VideoWebHolder.bringChildToFront(VideoHolder);
                PlayerView[0].setLayoutParams(PlayerViewSidePanel);
                PreparePlayer_Single_PP(4, 0, 0);

            });
        }

        @JavascriptInterface
        public void StartScreensPlayer(String uri, String mainPlaylistString, int ResumePosition,
                                       float bottom, float right, float left, int web_height, int who_called, boolean bigger) {
            MainThreadHandler.post(() -> {

                mediaSources[0] = Tools.buildMediaSource(
                        Uri.parse(uri),
                        mWebViewContext,
                        who_called,
                        mLowLatency,
                        mainPlaylistString,
                        userAgent
                );

                PlayerViewScreensPanel = Tools.BasePreviewLayout(bottom, right, left, web_height, ScreenSize, bigger);

                VideoWebHolder.bringChildToFront(VideoHolder);
                PlayerView[0].setLayoutParams(PlayerViewScreensPanel);
                PreparePlayer_Single_PP(3 + who_called, ResumePosition, 0);

            });
        }

        @JavascriptInterface
        public void SidePanelPlayerRestore() {
            MainThreadHandler.post(() -> {
                mWho_Called = 4;
                VideoWebHolder.bringChildToFront(VideoHolder);
                //Add a delay to make sure the VideoWebHolder already bringChildToFront before change size also webview may need a small delay to hide the player UI and show the screen
                MainThreadHandler.postDelayed(() -> PlayerView[0].setLayoutParams(PlayerViewSidePanel), 100);
            });
        }

        @JavascriptInterface
        public void ScreenPlayerRestore(float bottom, float right, float left, int web_height, int who_called, boolean bigger) {
            MainThreadHandler.post(() -> {

                if (player[0] != null) {
                    mWho_Called = 3 + who_called;
                    VideoWebHolder.bringChildToFront(VideoHolder);

                    PlayerViewScreensPanel = Tools.BasePreviewLayout(bottom, right, left, web_height, ScreenSize, bigger);
                    //Add a delay to make sure the VideoWebHolder already bringChildToFront before change size also webview may need a small delay to hide the player UI and show the screen
                    MainThreadHandler.postDelayed(() -> PlayerView[0].setLayoutParams(PlayerViewScreensPanel), 100);
                }

            });
        }

        @JavascriptInterface
        public void ClearSidePanelPlayer() {
            MainThreadHandler.post(() -> {

                VideoWebHolder.bringChildToFront(mWebView);
                ClearPlayer(0);

            });
        }

        @JavascriptInterface
        public void mSetlatency(int LowLatency) {
            mLowLatency = LowLatency;
        }

        @JavascriptInterface
        public void stopVideo() {
            MainThreadHandler.post(PlayerActivity.this::ResetPlayerState);
        }

        @JavascriptInterface
        public void mClearSmallPlayer() {
            MainThreadHandler.post(() -> {
                PicturePicture = false;
                ClearPlayer(1);
            });
        }

        @JavascriptInterface
        public void mSwitchPlayer() {
            MainThreadHandler.post(PlayerActivity.this::SwitchPlayer);
        }

        @JavascriptInterface
        public void mSwitchPlayerPosition(int mPicturePicturePosition) {
            PicturePicturePosition = mPicturePicturePosition;
            MainThreadHandler.post(() -> UpdadeSizePosSmall(1, true));
        }

        @JavascriptInterface
        public void mSetPlayerPosition(int PicturePicturePos) {
            PicturePicturePosition = PicturePicturePos;
        }

        @JavascriptInterface
        public void mSwitchPlayerSize(int mPicturePictureSize) {
            PicturePictureSize = mPicturePictureSize;
            MainThreadHandler.post(() -> UpdadeSizePosSmall(1, false));
        }

        @JavascriptInterface
        public void mSetPlayerSize(int mPicturePictureSize) {
            PicturePictureSize = mPicturePictureSize;
            MainThreadHandler.post(PlayerActivity.this::SetDefaultLayouts);
        }

        @JavascriptInterface
        public void mSwitchPlayerAudio(int position) {
            MainThreadHandler.post(() -> SwitchPlayerAudio(position));
        }

        @JavascriptInterface
        public void mSetAudio(int position, float volume) {
            MainThreadHandler.post(() -> SetAudio(position, volume));
        }

        @JavascriptInterface
        public void mSetPlayerAudioMulti(int position) {
            MainThreadHandler.post(() -> {

                AudioMulti = position;
                SetPlayerAudioMulti();

            });
        }

        @JavascriptInterface
        public void SetPreviewOthersAudio(int volume) {
            PreviewOthersAudio = volume / 100f;
        }

        @JavascriptInterface
        public void SetPreviewAudio(int volume) {
            PreviewAudio = volume / 100f;
        }

        @JavascriptInterface
        public void SetPreviewSize(int mPreviewSize) {
            PreviewSize = mPreviewSize;
        }

        @JavascriptInterface
        public void SetMainPlayerBitrate(int Bitrate) {
            int mainPlayerBitrate = Bitrate == 0 ? Integer.MAX_VALUE : Bitrate;

            trackSelectorParameters[0] = DefaultTrackSelector.Parameters.getDefaults(mWebViewContext)
                    .buildUpon()
                    .setMaxVideoBitrate(mainPlayerBitrate)
                    .build();

        }

        @JavascriptInterface
        public void SetSmallPlayerBitrate(int Bitrate) {
            int PP_PlayerBitrate = Bitrate == 0 ? Integer.MAX_VALUE : Bitrate;

            // Prevent small window causing lag to the device
            // Bitrates bigger then 8Mbs on two simultaneous video playback side by side can slowdown some devices
            // even though that device can play a 2160p60 at 30+Mbs on a single playback without problem
            trackSelectorParameters[1] = DefaultTrackSelector.Parameters.getDefaults(mWebViewContext)
                    .buildUpon()
                    .setMaxVideoBitrate(PP_PlayerBitrate)
                    .build();

            int extraSmallPlayerBitrate = 4000000;
            trackSelectorParameters[2] = DefaultTrackSelector.Parameters.getDefaults(mWebViewContext)
                    .buildUpon()
                    .setMaxVideoBitrate(
                            Math.min(PP_PlayerBitrate, extraSmallPlayerBitrate)
                    ).build();
        }

        @JavascriptInterface
        public long getsavedtime() {
            return mResumePosition;
        }

        @JavascriptInterface
        public long gettime() {
            return PlayerCurrentPosition > 0 ? PlayerCurrentPosition : 0;
        }

        @JavascriptInterface
        public long gettimepreview() {
            return SmallPlayerCurrentPosition > 0 ? SmallPlayerCurrentPosition : 0;
        }

        @JavascriptInterface
        public String getManufacturer() {
            return Build.MANUFACTURER;
        }

        @JavascriptInterface
        public String getDevice() {
            return Build.MODEL;
        }

        @JavascriptInterface
        public int getSDK() {
            return Build.VERSION.SDK_INT;
        }

        @JavascriptInterface
        public void mKeepScreenOn(boolean keepOn) {
            MainThreadHandler.post(() -> KeepScreenOn(keepOn));
        }

        @JavascriptInterface
        public void PlayPauseChange() {
            MainThreadHandler.post(() -> {

                if (player[0] != null) {

                    boolean state = !player[0].isPlaying();

                    for (int i = 0; i < PlayerAccount; i++) {
                        if (player[i] != null) player[i].setPlayWhenReady(state);
                    }

                    KeepScreenOn(state);
                    mWebView.loadUrl("javascript:smartTwitchTV.Play_PlayPauseChange(" + state + "," + mWho_Called + ")");
                }
            });
        }

        @JavascriptInterface
        public void PlayPause(boolean state) {
            MainThreadHandler.post(() -> {
                for (int i = 0; i < PlayerAccount; i++) {
                    if (player[i] != null) player[i].setPlayWhenReady(state);
                }

                KeepScreenOn(state);
            });
        }

        @JavascriptInterface
        public boolean getPlaybackState() {
            return PlayerIsPlaying[0];
        }

        @JavascriptInterface
        public void setPlaybackSpeed(float speed) {
            MainThreadHandler.post(() -> {
                if (MultiStreamEnable) {
                    for (int i = 0; i < PlayerAccount; i++) {
                        if (player[i] != null)
                            player[i].setPlaybackParameters(new PlaybackParameters(speed));
                    }
                } else if (player[0] != null)
                    player[0].setPlaybackParameters(new PlaybackParameters(speed));
            });
        }

        @JavascriptInterface
        public void SetBuffer(int who_called, int buffer_size) {
            BUFFER_SIZE[who_called] = Math.min(buffer_size, 15000);
            loadControl[who_called] = Tools.getLoadControl(BUFFER_SIZE[who_called], DeviceRam);

            //MUltiStream and preview feed player
            loadControl[0] = Tools.getLoadControl(BUFFER_SIZE[1], DeviceRam / 2);
        }

        @JavascriptInterface
        public String getversion() {
            return BuildConfig.VERSION_NAME;
        }

        @JavascriptInterface
        public boolean getdebug() {
            return BuildConfig.DEBUG;
        }

        @JavascriptInterface
        public void clearCookie() {
            CookieManager.getInstance().removeAllCookies(null);
            CookieManager.getInstance().flush();
        }

        @JavascriptInterface
        public String getVideoQualityString() {
            return VideoQualityResult;
        }

        @JavascriptInterface
        public void getVideoQuality(int who_called) {
            VideoQualityResult = null;

            MainThreadHandler.post(() -> {

                if (player[0] != null)
                    VideoQualityResult = Tools.GetVideoQuality(player[0].getVideoFormat());

                mWebView.loadUrl("javascript:smartTwitchTV.Play_ShowVideoQuality(" + who_called + ",Android.getVideoQualityString())");
            });
        }

        @JavascriptInterface
        public String getVideoStatusString() {
            return getVideoStatusResult;
        }

        @JavascriptInterface
        public void getVideoStatus(boolean showLatency) {
            getVideoStatusResult = null;

            MainThreadHandler.post(() -> {

                long buffer = 0L;
                long LiveOffset = 0L;
                long Duration = 0L;

                if (player[0] != null) {
                    buffer = player[0].getTotalBufferedDuration();
                    LiveOffset = player[0].getCurrentLiveOffset();
                    Duration = player[0].getDuration();
                }

                getVideoStatusResult = new Gson().toJson(
                        new Object[]{
                                Tools.GetCounters(conSpeed, conSpeedAVG, SpeedCounter, "Mb"),//0
                                Tools.GetCounters(netActivity, NetActivityAVG, NetCounter, "Mb"),//1
                                droppedFrames,//2
                                DroppedFramesTotal,//3
                                Tools.getTime(buffer),//4
                                Tools.getTime(LiveOffset),//5
                                Tools.GetCounters(PingValue, PingValueAVG, PingCounter, "ms"),//6
                                (buffer / 1000.0),//7
                                Duration//8
                        }
                );
                //Erase after read
                netActivity = 0L;

                mWebView.loadUrl("javascript:smartTwitchTV.Play_ShowVideoStatus(" + showLatency + "," + mWho_Called + ",Android.getVideoStatusString())");
            });

        }

        @JavascriptInterface
        public void getLatency(int chat_number) {
            MainThreadHandler.post(() -> {

                if (player[chat_number] != null) {

                    mWebView.loadUrl("javascript:smartTwitchTV.ChatLive_SetLatency(" + chat_number + "," + player[chat_number].getCurrentLiveOffset() + ")");

                }

            });

        }

        @JavascriptInterface
        public boolean deviceIsTV() {
            return deviceIsTV;
        }

        @JavascriptInterface
        public void keyEvent(int key, int keyaction) {
            MainThreadHandler.post(() -> mWebView.dispatchKeyEvent(new KeyEvent(keysAction[keyaction], keys[key])));
        }

        @JavascriptInterface
        public String getcodecCapabilities(String CodecType) {
            return Tools.codecCapabilities(CodecType);
        }

        @JavascriptInterface
        public void setBlackListMediaCodec(String CodecList) {
            BLACKLISTEDCODECS = !CodecList.isEmpty() ? CodecList.split(",") : null;
        }

        @JavascriptInterface
        public void msetPlayer(boolean surface_view, boolean FullScreen) {
            MainThreadHandler.post(() -> {
                setPlayerSurface(surface_view);

                if (FullScreen) updateVideSizePP(true);
                else updateVideSize(false);

                UpdadeSizePosSmall(1, false);
            });
        }

        @JavascriptInterface
        public void mhideSystemUI() {
            MainThreadHandler.post(PlayerActivity.this::hideSystemUI);
        }

        @JavascriptInterface
        public void BackupFile(String file, String file_content) {
            SaveBackupJsonHandler.postDelayed(() -> {
                if (Tools.WR_storage(mWebViewContext)) {
                    Tools.BackupJson(
                            mWebViewContext.getPackageName(),
                            file,
                            file_content
                    );
                }
            }, 5000);
        }

        @JavascriptInterface
        public boolean HasBackupFile(String file) {
            return Tools.HasBackupFile(file, mWebViewContext);
        }

        @JavascriptInterface
        public String RestoreBackupFile(String file) {
            if (Tools.WR_storage(mWebViewContext))
                return Tools.RestoreBackupFile(file, mWebViewContext);

            return null;
        }

        @JavascriptInterface
        public void requestWr() {
            MainThreadHandler.post(PlayerActivity.this::Check_WriteExternalStorage);
        }

        @JavascriptInterface
        public boolean canBackupFile() {
            return Tools.WR_storage(mWebViewContext);
        }

        @JavascriptInterface
        public void EnableMultiStream(boolean MainBig, int offset) {
            MainThreadHandler.post(() -> {
                MultiStreamEnable = true;
                if (MainBig) SetMultiStreamMainBig(offset);
                else SetMultiStream();
            });
        }

        @JavascriptInterface
        public void DisableMultiStream() {
            MainThreadHandler.post(() -> {
                MultiStreamEnable = false;
                UnSetMultiStream();
            });
        }

        @JavascriptInterface
        public void StartMultiStream(int position, String uri, String mainPlaylistString, boolean Restart) {
            MainThreadHandler.post(() -> {

                //Player Restart options... the player may randomly display a flicker green screen, or odd green artifacts after a SetMultiStreamMainBig
                //The odd behavior will stay until the player is releasePlayer
                if (Restart) releasePlayer(position);

                boolean reUsePlayer = player[4] != null && PreviewPlayerPlaylist != null && Objects.equals(mainPlaylistString, PreviewPlayerPlaylist);

                if (reUsePlayer) {

                    ReUsePlayer(position, 1, trackSelectorParameters[1]);

                    SetMultiVolume(position);

                } else {

                    mediaSources[position] = Tools.buildMediaSource(
                            Uri.parse(uri),
                            mWebViewContext,
                            1,
                            mLowLatency,
                            mainPlaylistString,
                            userAgent
                    );

                    initializePlayer_Multi(position);

                    if (player[4] != null) releasePlayer(4);
                }

                PreviewPlayerPlaylist = null;

            });
        }

        @JavascriptInterface
        public boolean isAccessibilitySettingsOn() {
            try {
                return Settings.Secure.getInt(
                        mWebViewContext.getContentResolver(),
                        android.provider.Settings.Secure.ACCESSIBILITY_ENABLED
                ) == 1;

            } catch (Settings.SettingNotFoundException e) {
                Log.w(TAG, "isAccessibilitySettingsOn SettingNotFoundException ", e);
            }

            return false;
        }

        @JavascriptInterface
        public String getWebviewVersion() {
            return Tools.getWebviewVersion(mWebViewContext);
        }

        @JavascriptInterface
        public String getQualities() {
            return Tools.getQualities(trackSelector[0]);
        }

        @JavascriptInterface
        public void SetQuality(int position) {
            mSetQuality(position);
        }

        @JavascriptInterface
        public void LongLog(String log) {
            Tools.LongLog(TAG, log);
        }
    }

    // Basic EventListener for exoplayer
    private class PlayerEventListener implements Player.EventListener {

        private int position;
        private final int Delay_ms;
        private int Who_Called;

        private PlayerEventListener(int position, int m_Who_Called) {
            this.Who_Called = m_Who_Called;// > 3 ? (m_Who_Called - 3) : m_Who_Called;
            this.position = position;
            int defaultDelayPlayerCheck = 8000;
            this.Delay_ms = BUFFER_SIZE[m_Who_Called] + defaultDelayPlayerCheck + (MultiStreamEnable ? (defaultDelayPlayerCheck / 2) : 0);
        }

        private void UpdateWho_Called(int m_Who_Called) {
            this.Who_Called = m_Who_Called;// > 3 ? (m_Who_Called - 3) : m_Who_Called;
        }

        private void UpdatePosition(int position) {
            this.position = position;
        }

        @Override
        @SuppressWarnings("ReferenceEquality")
        public void onTracksChanged(@NonNull TrackGroupArray trackGroups, @NonNull TrackSelectionArray trackSelections) {
            //onTracksChanged -> Called when the available or selected tracks change.
            //When the player is already prepare and one changes the Mediasource this will be called before the new Mediasource is prepare
            //So trackGroups.length will be 0 and getQualities result = null, after 100ms or so this will be again called and all will be fine
            if (trackGroups != lastSeenTrackGroupArray && trackGroups.length > 0 && position < 4) {//position < 4 Main players
                RequestGetQualities(Who_Called);
                lastSeenTrackGroupArray = trackGroups;
            }
        }

        @Override
        public void onIsPlayingChanged(boolean isPlaying) {
            PlayerIsPlaying[position] = isPlaying;
        }

        @Override
        public void onPlaybackStateChanged(@Player.State int playbackState) {

            if (player[position] == null || !player[position].getPlayWhenReady())
                return;

            if (BuildConfig.DEBUG) {
                Log.i(TAG, "onPlaybackStateChanged position " + position + " playbackState " + playbackState);
            }

            if (playbackState == Player.STATE_ENDED) {

                PlayerCheckHandler[position].removeCallbacksAndMessages(null);
                player[position].setPlayWhenReady(false);

                PlayerEventListenerClear(position, 0);//player_Ended

            } else if (playbackState == Player.STATE_BUFFERING) {

                //Use the player buffer as a player check state to prevent be buffering for ever
                //If buffer for too long check because the player may have froze
                PlayerCheckHandler[position].removeCallbacksAndMessages(null);
                PlayerCheckHandler[position].postDelayed(() -> {

                    //Check if Player was released or is on pause
                    if (player[position] == null || !player[position].isPlaying())
                        return;

                    PlayerEventListenerCheckCounter(position, Who_Called, 2);//Player_Lag
                }, Delay_ms);

            } else if (playbackState == Player.STATE_READY) {

                PlayerCheckHandler[position].removeCallbacksAndMessages(null);

                if (position < 4) {
                    //Main players

                    //Delay the counter reset to make sure the connection is fine now when not on a auto mode
                    if (!IsInAutoMode || Who_Called == 3)
                        PlayerCheckHandler[position].postDelayed(() -> PlayerCheckCounter[position] = 0, 10000);
                    else
                        PlayerCheckCounter[position] = 0;

                    if (mWho_Called == 1) {

                        //If other not playing just play it so they stay in sync
                        if (MultiStreamEnable) {

                            for (int i = 0; i < PlayerAccount; i++) {
                                if (position != i && player[i] != null)
                                    player[i].setPlayWhenReady(true);
                            }

                            if (position == 0)
                                LoadUrlWebview("javascript:smartTwitchTV.ChatLive_SetLatency(0," + player[position].getCurrentLiveOffset() + ")");

                        } else {

                            int OtherPlayer = position ^ 1;
                            if (player[OtherPlayer] != null) {
                                if (!player[OtherPlayer].isPlaying())
                                    player[OtherPlayer].setPlayWhenReady(true);
                            }

                            LoadUrlWebview("javascript:smartTwitchTV.ChatLive_SetLatency(" + position + "," + player[position].getCurrentLiveOffset() + ")");

                        }

                    } else {

                        LoadUrlWebview("javascript:smartTwitchTV.Play_UpdateDuration(" + player[position].getDuration() + ")");

                    }

                } else {
                    //Preview player

                    PlayerCheckCounter[position] = 0;
                    mSetPreviewOthersAudio();
                }

            }
        }

        @Override
        public void onPlayerError(@NonNull ExoPlaybackException e) {

            PlayerCheckHandler[position].removeCallbacksAndMessages(null);
            PlayerEventListenerCheckCounter(position, Who_Called, 1);//player_Erro

            Log.w(TAG, "onPlayerError pos " + position + " isBehindLiveWindow " + Tools.isBehindLiveWindow(e) + " e ", e);

        }

    }

    private class AnalyticsEventListener implements AnalyticsListener {

        @Override
        public final void onDroppedVideoFrames(@NonNull EventTime eventTime, int count, long elapsedMs) {
            droppedFrames += count;
            DroppedFramesTotal += count;
        }

        @Override
        public void onBandwidthEstimate(@NonNull EventTime eventTime, int totalLoadTimeMs, long totalBytesLoaded, long bitrateEstimate) {
            conSpeed = (float) bitrateEstimate / 1000000;
            if (conSpeed > 0) {
                SpeedCounter++;
                conSpeedAVG += conSpeed;
            }

            netActivity = (float) totalBytesLoaded * 8 / 1000000;
            if (netActivity > 0) {
                NetCounter++;
                NetActivityAVG += netActivity;
            }
        }
    }

}
