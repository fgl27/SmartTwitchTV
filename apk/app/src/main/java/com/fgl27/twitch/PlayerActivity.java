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
import android.view.SurfaceView;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewGroup.LayoutParams;
import android.view.WindowManager;
import android.view.animation.LinearInterpolator;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
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
import com.google.android.exoplayer2.Format;
import com.google.android.exoplayer2.PlaybackException;
import com.google.android.exoplayer2.PlaybackParameters;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.analytics.AnalyticsListener;
import com.google.android.exoplayer2.extractor.ExtractorsFactory;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.TrackGroup;
import com.google.android.exoplayer2.source.TrackGroupArray;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.MappingTrackSelector;
import com.google.android.exoplayer2.trackselection.TrackSelectionArray;
import com.google.android.exoplayer2.ui.PlayerView;
import com.google.android.exoplayer2.util.Util;
import com.google.firebase.FirebaseApp;
import com.google.firebase.crashlytics.FirebaseCrashlytics;
import com.google.gson.Gson;

import net.grandcentrix.tray.AppPreferences;

import java.util.ArrayList;
import java.util.Locale;
import java.util.Objects;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PlayerActivity extends Activity {
    private final String TAG = "STTV_PlayerActivity";
    private final Pattern TIME_NAME = Pattern.compile("time=([^\\s]+)");

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

    private String AppUrl;

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
    private float AudioMaxPreviewVisible = 0.3f;//window 0
    private float PingValue = 0f;
    private float PingValueAVG = 0f;
    private long PingCounter = 0L;
    private long PingErrorCounter = 0L;
    private boolean warningShowing = false;
    private boolean WebviewLoaded = false;
    private boolean mWebViewKeyIsShowing = false;
    private long PlayerCurrentPosition = 0L;
    private long SmallPlayerCurrentPosition = 0L;
    private int CurrentPositionTimeout = 500;

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
    //A layout used to hide a view without using visibility change
    private final FrameLayout.LayoutParams HideLayout = new FrameLayout.LayoutParams(0, 0, 0);
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
    private FrameLayout.LayoutParams PlayerViewScreensLayout;
    //Base frame holders
    private FrameLayout PreviewHolder;
    private FrameLayout VideoHolder;
    private FrameLayout VideoWebHolder;

    private Point ScreenSize;

    private String IntentObj;
    private String LastIntent;
    private boolean canRunChannel;
    private boolean closeThisCalled;

    private final Handler[] RuntimeHandler = new Handler[2];
    private Handler MainThreadHandler;
    private final Handler[] CurrentPositionHandler = new Handler[2];
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

    private final int PlayerAccount = 4;
    private final int PlayerAccountPlus = PlayerAccount + 1;

    private final String[][] PreviewFeedResult = new String[25][100];
    private final String[] StreamDataResult = new String[PlayerAccount * 2];
    private final String[] BasexmlHttpGetResultArray = new String[500];//0 to 29 screen, 30 to 50 preview player, 50+ etc
    private int BasexmlHttpGetResultpos = 0;

    private final ProgressBar[] loadingView = new ProgressBar[PlayerAccount + 3];

    private boolean IsUsingSurfaceView;
    private boolean reUsePlayer = true;

    //TODO some day convert js to use 0 = live, 1 = vod, 2 = clip, as today is  1 2 3
    private final int[] BUFFER_SIZE = {250, 250, 250};//live, vod, clips

    ////Main Player, PP or Multistream, Player preview
    private final DefaultTrackSelector.Parameters[] trackSelectorParameters = new DefaultTrackSelector.Parameters[3];
    private final int[] PlayerBitrate = {Integer.MAX_VALUE, Integer.MAX_VALUE, 4000000};
    private final int[] PlayerResolution = {Integer.MAX_VALUE, Integer.MAX_VALUE, 730};

    private BlackListMediaCodecSelector BLACKLISTED_CODECS = null;
    private String[] BLACKLISTED_QUALITIES = null;

    private final PlayerObj[] PlayerObj = new PlayerObj[PlayerAccountPlus];

    private final boolean[] AudioEnabled = {true, false, false, false, true};

    public class PlayerObj {
        boolean IsPlaying;
        boolean isScreenPreview;

        DefaultTrackSelector trackSelector;
        int trackSelectorParametersPosition;

        int loadControlRamDivider;
        int Type;
        int CheckCounter;

        float volume;

        Handler CheckHandler;

        long ResumePosition;
        long LatencyOffSet;

        MediaSource mediaSources;

        PlayerEventListener Listener;
        PlayerView playerView;

        SimpleExoPlayer player;

        PlayerObj(boolean IsPlaying, boolean isScreenPreview, DefaultTrackSelector trackSelector,
                  int trackSelectorParameters, int loadControlRamDivider, int Type, int CheckCounter, float volume,
                  Handler CheckHandler, long ResumePosition, MediaSource mediaSources, PlayerEventListener Listener,
                  PlayerView playerView, SimpleExoPlayer player, long LatencyOffSet) {

            this.IsPlaying = IsPlaying;
            this.isScreenPreview = isScreenPreview;
            this.trackSelector = trackSelector;
            this.trackSelectorParametersPosition = trackSelectorParameters;

            this.loadControlRamDivider = loadControlRamDivider;

            this.Type = Type;
            this.CheckCounter = CheckCounter;

            this.volume = volume;

            this.CheckHandler = CheckHandler;
            this.ResumePosition = ResumePosition;
            this.LatencyOffSet = LatencyOffSet;

            this.mediaSources = mediaSources;
            this.Listener = Listener;

            this.playerView = playerView;
            this.player = player;
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        if (!onCreateReady) setTheme(R.style.AppTheme);
        super.onCreate(savedInstanceState);

        //On create is called onResume so prevent it if already set
        if (!onCreateReady) {
            Intent intent = getIntent();
            boolean isChannelIntent = Objects.equals(intent.getAction(), Constants.CHANNEL_INTENT);
            intent.setAction(null);
            setIntent(intent);

            FirebaseApp.initializeApp(this);
            FirebaseCrashlytics.getInstance().setCrashlyticsCollectionEnabled(true);

            try {
                setContentView(R.layout.activity_player);
            } catch (Exception e) {
                if (e.getMessage() != null && e.getMessage().toLowerCase().contains("webview")) {
                    Tools.recordException(TAG, "webview onCreate e ", e);
                    // If the system failed to inflate this view because of the WebView (which could
                    // be one of several types of exceptions), it likely means that the system WebView
                    // is either not present (unlikely) OR in the process of being updated (also unlikely).
                    // It's unlikely but we have been receiving a lot of crashes.
                    // In this case, show the user a message and finish the activity
                    Toast.makeText(this, getString(R.string.webview_exception), Toast.LENGTH_LONG).show();
                    finishAndRemoveTask();
                    return;
                } else throw e;
            }

            SetDefaultLoadingLayout();

            IsStopped = false;
            AlreadyStarted = true;
            onCreateReady = true;

            //int Number_of_Cores = Runtime.getRuntime().availableProcessors();
            //Background threads
            DataThreadPool = new ThreadPoolExecutor(
                    12,
                    12,
                    0,
                    TimeUnit.SECONDS,
                    new LinkedBlockingQueue<>()
            );

            //Main loop threads
            Looper MainLooper = Looper.getMainLooper();
            MainThreadHandler = new Handler(MainLooper);
            CurrentPositionHandler[0] = new Handler(MainLooper);
            CurrentPositionHandler[1] = new Handler(MainLooper);
            for (int i = 0; i < PlayerAccountPlus; i++) {
                PlayerObj[i] = new PlayerObj(
                        false,
                        false,
                        null,
                        0,
                        2,
                        0,
                        0,
                        1.0f,
                        null,
                        0,
                        null,
                        null,
                        null,
                        null,
                        0
                );
                PlayerObj[i].CheckHandler = new Handler(MainLooper);
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

            PreviewHolder = findViewById(R.id.previewholder);
            VideoHolder = findViewById(R.id.videoholder);
            VideoWebHolder = findViewById(R.id.videowebholder);

            setPlayerSurface(true);

            DeviceRam = Tools.DeviceRam(this);
            //Ram too big.bigger then max int value... use 196MB
            if (DeviceRam < 0) DeviceRam = 196000000;

            initializeWebview();

            StopNotificationService();
            FirebaseCrashlytics.getInstance().sendUnsentReports();

            DataThreadPool.execute(() -> Tools.GetUpdateFile(getApplicationContext()));

        }
    }

    private void SetDefaultLoadingLayout() {
        //TODO check deprecation
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
        IsUsingSurfaceView = surface_view;

        int[] idGone = idtexture, idVisible = idsurface;
        //Some old devices (old OS N or older) is need to use texture_view to have a proper working PP mode
        if (!surface_view) {
            idGone = idsurface;
            idVisible = idtexture;
        }

        for (int i = 0; i < PlayerAccountPlus; i++) {
            PlayerObj[i].playerView = findViewById(idGone[i]);
            PlayerObj[i].playerView.setVisibility(View.GONE);
            PlayerObj[i].playerView = findViewById(idVisible[i]);
        }

        PlayerObj[0].playerView.setVisibility(View.VISIBLE);
        for (int i = 1; i < PlayerAccountPlus; i++) {
            PlayerObj[i].playerView.setVisibility(View.GONE);
        }

        for (int i = 0; i < PlayerAccountPlus; i++) {
            loadingView[i] = PlayerObj[i].playerView.findViewById(R.id.exo_buffering);
            loadingView[i].setIndeterminateTintList(ColorStateList.valueOf(Color.WHITE));
            loadingView[i].setBackgroundResource(R.drawable.shadow);
            loadingView[i].setLayoutParams(DefaultLoadingLayout);
        }
    }

    private boolean AllMainPlayerInUse() {
        for (int i = 0; i < PlayerAccount; i++) {
            if (PlayerObj[i].player == null) {
                return false;
            }
        }

        return true;
    }

    private boolean AllMainPlayerNotInUse() {
        for (int i = 0; i < PlayerAccount; i++) {
            if (PlayerObj[i].player != null) {
                return false;
            }
        }

        return true;
    }

    private boolean CanReUsePlayer(String mainPlaylistString, int trackSelectorParametersPosition) {

        //If all 4 player are running skip checking resolution and bitrate as we are update multistream base on multistream dialog
        //With is a special case always different
        return reUsePlayer &&
                PlayerObj[4].player != null &&
                PreviewPlayerPlaylist != null &&
                Objects.equals(mainPlaylistString, PreviewPlayerPlaylist) &&
                (AllMainPlayerInUse() || PlayerBitrate[PlayerObj[4].trackSelectorParametersPosition] == PlayerBitrate[trackSelectorParametersPosition] &&
                        PlayerResolution[PlayerObj[4].trackSelectorParametersPosition] == PlayerResolution[trackSelectorParametersPosition]);

    }

    private void ReUsePlayer(int PlayerObjPosition) {


        if (PlayerObj[PlayerObjPosition].player != null) {

            PlayerObj[PlayerObjPosition].player.removeListener(PlayerObj[PlayerObjPosition].Listener);

        }

        //PP Multi player may not be in use, check and make visible
        if (PlayerObj[PlayerObjPosition].playerView.getVisibility() != View.VISIBLE) {

            PlayerObj[PlayerObjPosition].playerView.setVisibility(View.VISIBLE);

        }

        PlayerObj[4].Listener.UpdatePosition(PlayerObjPosition);
        PlayerObj[PlayerObjPosition].Listener = PlayerObj[4].Listener;

        PlayerObj[PlayerObjPosition].trackSelector = PlayerObj[4].trackSelector;
        PlayerObj[PlayerObjPosition].mediaSources = PlayerObj[4].mediaSources;

        SimpleExoPlayer tempPlayer = PlayerObj[PlayerObjPosition].player;
        PlayerObj[PlayerObjPosition].player = PlayerObj[4].player;
        PlayerObj[4].player = tempPlayer;

        PlayerObj[PlayerObjPosition].playerView.setPlayer(PlayerObj[PlayerObjPosition].player);
        PlayerObj[PlayerObjPosition].player.setPlayWhenReady(true);

        if (BLACKLISTED_QUALITIES != null && (IsInAutoMode || MultiStreamEnable || PicturePicture)) {

            setEnabledQualities(PlayerObjPosition);

        } else {


            PlayerObj[PlayerObjPosition].trackSelector
                    .setParameters(
                            trackSelectorParameters[PlayerObj[PlayerObjPosition].trackSelectorParametersPosition]
                    );

        }

        if (PlayerObjPosition == 0) {

            GetCurrentPosition();

        }

        PlayerObj[4].playerView.setPlayer(null);
        Clear_PreviewPlayer();

        ApplyAudioAll();
    }

    private void SetupPlayer(int PlayerObjPosition) {

        if (IsStopped) {
            monStop();
            return;
        }

        if (BuildConfig.DEBUG) {
            Log.i(TAG, "SetupPlayer position " + PlayerObjPosition + " PlayerObj[PlayerObjPosition].player == null " + (PlayerObj[PlayerObjPosition].player == null));
        }

        PlayerObj[PlayerObjPosition].CheckHandler.removeCallbacksAndMessages(null);
        PlayerObj[PlayerObjPosition].LatencyOffSet = 0;

        //Change the visibility before starting the player, as some device will have error on visibility changes
        if (PlayerObj[PlayerObjPosition].playerView.getVisibility() != View.VISIBLE)
            PlayerObj[PlayerObjPosition].playerView.setVisibility(View.VISIBLE);

        if (PlayerObj[PlayerObjPosition].player == null) {

            PlayerObj[PlayerObjPosition].trackSelector = new DefaultTrackSelector(this);
            PlayerObj[PlayerObjPosition].trackSelector.setParameters(trackSelectorParameters[PlayerObj[PlayerObjPosition].trackSelectorParametersPosition]);

            DefaultRenderersFactory renderersFactory = new DefaultRenderersFactory(this);
            if (BLACKLISTED_CODECS != null)
                renderersFactory.setMediaCodecSelector(BLACKLISTED_CODECS);

            PlayerObj[PlayerObjPosition].player = new SimpleExoPlayer.Builder(this, renderersFactory, ExtractorsFactory.EMPTY)
                    .setTrackSelector(PlayerObj[PlayerObjPosition].trackSelector)
                    .setLoadControl(
                            Tools.getLoadControl(
                                    BUFFER_SIZE[PlayerObj[PlayerObjPosition].Type - 1],
                                    DeviceRam / PlayerObj[PlayerObjPosition].loadControlRamDivider
                            )
                    )
                    .build();

            PlayerObj[PlayerObjPosition].Listener = new PlayerEventListener(PlayerObjPosition);
            PlayerObj[PlayerObjPosition].player.addListener(PlayerObj[PlayerObjPosition].Listener);

            PlayerObj[PlayerObjPosition].player.addAnalyticsListener(new AnalyticsEventListener());

            PlayerObj[PlayerObjPosition].playerView.setPlayer(PlayerObj[PlayerObjPosition].player);

        }

        PlayerObj[PlayerObjPosition].player.setPlayWhenReady(true);
        PlayerObj[PlayerObjPosition].player.setMediaSource(
                PlayerObj[PlayerObjPosition].mediaSources,
                PlayerObj[PlayerObjPosition].ResumePosition
        );

        PlayerObj[PlayerObjPosition].player.prepare();

        KeepScreenOn(true);

        if (PlayerObjPosition < 4) {
            //Main players
            ApplyAudioAll();

            //Player can only be accessed from main thread so start a "position listener" to pass the value to Webview
            if (PlayerObjPosition == 0) {
                PlayerCurrentPosition =
                        PlayerObj[PlayerObjPosition].ResumePosition == C.TIME_UNSET ?
                                0 : PlayerObj[PlayerObjPosition].ResumePosition;

                GetCurrentPosition();
            }

            hideLoading(5);
            droppedFrames = 0;
            NetActivityAVG = 0;
            NetCounter = 0;

        } else {
            //Preview player
            SetAudio(PlayerObjPosition, PlayerObj[PlayerObjPosition].volume);

            if (PlayerObj[PlayerObjPosition].Type > 1) {

                SmallPlayerCurrentPosition =
                        PlayerObj[PlayerObjPosition].ResumePosition == C.TIME_UNSET ?
                                0 : PlayerObj[PlayerObjPosition].ResumePosition;

                GetCurrentPositionSmall();

            }

        }

    }

    private void Set_PlayerObj(boolean isScreenPreview, int Type, long ResumePosition,
                               int trackSelectorParametersPosition, int position) {

        PlayerObj[position].isScreenPreview = isScreenPreview;
        PlayerObj[position].trackSelectorParametersPosition = trackSelectorParametersPosition;
        PlayerObj[position].Type = Type;
        PlayerObj[position].loadControlRamDivider = PlayerObj[position].Type > 1 ? 1 : 2;
        PlayerObj[position].CheckCounter = 0;
        PlayerObj[position].ResumePosition = ResumePosition > 0 && PlayerObj[position].Type > 1 ? ResumePosition : C.TIME_UNSET;

    }

    private void ResetPPView() {
        VideoHolder.bringChildToFront(PlayerObj[1].playerView);

        //Reset the Z position of the PP player so it show above the other
        if (IsUsingSurfaceView) {

            PlayerView ViewOnTop = PlayerObj[1].playerView;
            PlayerView ViewOnBottom = PlayerObj[0].playerView;

            SurfaceView TopSurfaceView = (SurfaceView) ViewOnTop.getVideoSurfaceView();
            SurfaceView BottomSurfaceView = (SurfaceView) ViewOnBottom.getVideoSurfaceView();

            if (TopSurfaceView != null && BottomSurfaceView != null) {

                //Try to prevent... The specified child already has a parent. You must call removeView() on the child's parent first.
                try {

                    //Remove both player view so they order gets reset, with just setZOrderMediaOverlay the effect will not work on Android 7  and older OS
                    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
                        VideoHolder.removeView(ViewOnBottom);
                        VideoHolder.removeView(ViewOnTop);
                    }

                    TopSurfaceView.setZOrderMediaOverlay(true);
                    BottomSurfaceView.setZOrderMediaOverlay(false);

                    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
                        VideoHolder.addView(ViewOnBottom);
                        VideoHolder.addView(ViewOnTop);
                    }

                } catch (Exception ignore) {
                }
            }
        }

    }

    private void Clear_PreviewPlayer() {
        if (BuildConfig.DEBUG) {
            Log.i(TAG, "Clear_PreviewPlayer");
        }

        releasePlayer(4);
        ApplyAudioAll();

        //Try to prevent... The specified child already has a parent. You must call removeView() on the child's parent first.
        try {

            //This also prevent the SurfaceView not be visible on the same situation
            if (IsUsingSurfaceView) {

                PreviewHolder.removeView(PlayerObj[4].playerView);
                PreviewHolder.addView(PlayerObj[4].playerView);

            }

        } catch (Exception ignore) {
        }

        CurrentPositionHandler[1].removeCallbacksAndMessages(null);
        SmallPlayerCurrentPosition = 0L;
        PlayerObj[4].ResumePosition = 0L;
        CheckKeepScreenOn();
    }

    private void ClearPlayer(int position) {
        if (BuildConfig.DEBUG) {
            Log.i(TAG, "ClearPlayer position " + position);
        }

        releasePlayer(position);

        CheckKeepScreenOn();
    }

    private void CheckKeepScreenOn() {
        //All players are close enable screen saver
        if (AllMainPlayerNotInUse()) {
            KeepScreenOn(false);
            CurrentPositionHandler[0].removeCallbacksAndMessages(null);
            CurrentPositionHandler[1].removeCallbacksAndMessages(null);
        }
    }

    //Stop the player called from js, clear it all
    private void ResetPlayerState() {

        PicturePicture = false;

        for (int i = 0; i < PlayerAccount; i++) {
            releasePlayer(i);
            clearResumePosition(i);
        }

        KeepScreenOn(false);

    }

    //Main release function
    private void releasePlayer(int position) {
        if (BuildConfig.DEBUG) {
            Log.i(TAG, "releasePlayer start position " + position);
        }

        PlayerObj[position].CheckHandler.removeCallbacksAndMessages(null);
        PlayerObj[position].playerView.setVisibility(View.GONE);

        if (PlayerObj[position].player != null) {
            if (BuildConfig.DEBUG) {
                Log.i(TAG, "releasePlayer notnull release position " + position);
            }

            PlayerObj[position].player.release();
        }

        PlayerObj[position].player = null;
        PlayerObj[position].trackSelector = null;
        PlayerObj[position].Listener = null;

        PlayerObj[position].CheckCounter = 0;
        PlayerObj[position].IsPlaying = false;

        PlayerObj[position].LatencyOffSet = 0;
    }

    //Simple release function
    private void SimpleReleasePlayer(int position) {
        if (BuildConfig.DEBUG) {
            Log.i(TAG, "SimpleReleasePlayer position " + position);
        }

        if (PlayerObj[position].player != null) {
            PlayerObj[position].player.release();
            PlayerObj[position].player = null;
        }

    }

    // After a stream loses connection with the serve the stream will not end
    // as there is a twitch feature to keep the stream open for sometime to see if it recuperates
    // so the stream doesn't loses views.
    // But when that happens the stream TS tag EXT-X-PROGRAM-DATE-TIME get out of sink
    // causing the LiveOffset to be wrong using a simple check we can prevent it.
    private long getCurrentLiveOffset(int PlayerObjPosition, long Duration, long Position) {

        long LiveOffset = PlayerObj[PlayerObjPosition].player.getCurrentLiveOffset();
        long Offset = Duration - Position;

        if (PlayerObj[PlayerObjPosition].LatencyOffSet == 0 && Offset > 0 && LiveOffset > (Offset + 3000)) {// 3000 minor extra offset as some streams LiveOffset maybe very close to Offset

            PlayerObj[PlayerObjPosition].LatencyOffSet = LiveOffset - Offset;

//            Log.d("TAG1", "Duration " + Duration);
//            Log.d("TAG1", "Position " + Position);
//            Log.d("TAG1", "LiveOffset " + LiveOffset);
//            Log.d("TAG1", "LatencyOffSet " + PlayerObj[PlayerObjPosition].LatencyOffSet);
//            Log.d("TAG1", "LiveOffset " + (LiveOffset - PlayerObj[PlayerObjPosition].LatencyOffSet));

        }

        LiveOffset -= PlayerObj[0].LatencyOffSet;

        if (LiveOffset < 0) {

            PlayerObj[0].LatencyOffSet = 0;

        }

        return LiveOffset;
    }

    //Basic player position setting, for resume playback
    private void clearResumePosition(int position) {
        PlayerObj[position].ResumePosition = C.TIME_UNSET;
    }

    private void updateResumePosition(int position) {

        if (PlayerObj[position].Type == 1) {//Live

            clearResumePosition(position);

        } else if (PlayerObj[position].player != null && PlayerObj[position].CheckCounter < 2) {//VOD/Clip
            // If PlayerCheckCounter > 1 we already have restarted the player so the value of getCurrentPosition
            // is already gone and we already saved the correct PlayerObj[position].ResumePosition

            PlayerObj[position].ResumePosition = GetResumePosition(position);

        }

    }

    private long GetResumePosition(int position) {
        return PlayerObj[position].player != null && PlayerObj[position].player.isCurrentWindowSeekable() ?
                Math.max(0, PlayerObj[position].player.getCurrentPosition()) : C.TIME_UNSET;
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
            Tools.recordException(TAG, "KeepScreenOn Exception ", e);
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
        PlayerObj[1].playerView.setLayoutParams(PlayerViewSmallSize[PicturePicturePosition][PicturePictureSize]);

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
            PlayerObj[0].playerView.setLayoutParams(PlayerViewDefaultSize);//100% width x height
        else
            PlayerObj[0].playerView.setLayoutParams(PlayerViewSideBySideSize[FullScreenPosition][FullScreenSize]);//CENTER_VERTICAL 75% width x height
    }

    //Used in 50/50 mode two videos on the center plus two chat one on it side
    private void updateVideSizePP(boolean FullScreen) {
        isFullScreen = FullScreen;
        if (FullScreen) {
            PlayerObj[0].playerView.setLayoutParams(PlayerViewDefaultSize);
            UpdadeSizePosSmall(1, false);
        } else {
            PlayerObj[0].playerView.setLayoutParams(PlayerViewSmallSize[3][0]);//center top 50% width x height
            PlayerObj[1].playerView.setLayoutParams(PlayerViewSmallSize[7][0]);//center bottom 50% width x height
        }
    }

    //SwitchPlayer with is the big and small player used by picture in picture mode
    private void SwitchPlayer() {

        PlayerObj tempPlayerObj = PlayerObj[0];
        PlayerObj[0] = PlayerObj[1];
        PlayerObj[1] = tempPlayerObj;

        //UpdatePosition before the rest as ResetPPView and PlayerObjUpdateTrackSelector can cause player errors
        for (int i = 0; i < 2; i++) {
            if (PlayerObj[i].Listener != null) PlayerObj[i].Listener.UpdatePosition(i);
        }

        PlayerObj[0].playerView.setLayoutParams(PlayerViewDefaultSize);
        PlayerObj[1].playerView.setLayoutParams(PlayerViewSmallSize[PicturePicturePosition][PicturePictureSize]);
        ResetPPView();

        for (int i = 0; i < 2; i++) {
            PlayerObjUpdateTrackSelector(i, i);
        }

        ApplyAudioAll();

    }

    public void PlayerObjUpdateTrackSelectorParameters(int ParametersPos, Context context, int width) {

        trackSelectorParameters[ParametersPos] = DefaultTrackSelector.Parameters.getDefaults(context)
                .buildUpon()
                .setMaxVideoBitrate(PlayerBitrate[ParametersPos])
                .setMaxVideoSize(width, PlayerResolution[ParametersPos])
                .setAllowVideoNonSeamlessAdaptiveness(true)
                .setExceedAudioConstraintsIfNecessary(true)
                .setExceedVideoConstraintsIfNecessary(true)
                .setExceedRendererCapabilitiesIfNecessary(true)
                .build();

    }

    public void PlayerObjUpdateTrackSelector(int PlayerObjPos, int ParametersPos) {
        PlayerObj[PlayerObjPos].trackSelectorParametersPosition = ParametersPos;

        if (PlayerObj[PlayerObjPos].trackSelector != null) {

            if (BLACKLISTED_QUALITIES == null)
                PlayerObj[PlayerObjPos].trackSelector.setParameters(trackSelectorParameters[ParametersPos]);
            else
                setEnabledQualities(ParametersPos);

        }
    }

    public void SetAudio(int pos, float volume) {
        if (PlayerObj[pos].player != null)
            PlayerObj[pos].player.setVolume(volume);
    }

    public void ApplyAudioAll() {
        float MaxVolume = PlayerObj[4].player == null ? 1f : AudioMaxPreviewVisible;

        for (int i = 0; i < PlayerAccount; i++) {
            SetAudio(i, AudioEnabled[i] ? Math.min(PlayerObj[i].volume, MaxVolume) : 0f);
        }

    }

    public void UpdadeSizePosSmall(int pos, boolean animate) {
        PlayerObj[pos].playerView.setLayoutParams(PlayerViewSmallSize[PicturePicturePosition][PicturePictureSize]);
        AnimateSetLayoutParams(
                PlayerObj[pos].playerView,
                PlayerViewSmallSize[PicturePicturePosition][PicturePictureSize],
                animate
        );
    }

    public void AnimateSetLayoutParams(ViewGroup view, FrameLayout.LayoutParams layout, boolean animate) {
        //Animate the size changes looks odd, the video it self is slow to resize and there is a ghost effect, not noticeable when changing only the position
        if (animate) TransitionManager.beginDelayedTransition(view, PreviewTransition);
        view.setLayoutParams(layout);
    }

    public void SetMultiStreamMainBig(int offset) {
        int i;

        if (offset != 0) {

            PlayerObj tempPlayerObj;

            int i_len = Math.abs(offset);
            int j;
            int j_len = PlayerAccount - 1;

            boolean left = offset > 0;

            for (i = 0; i < i_len; i++) {

                if (left) {//if offset = 1 result 1 2 3 0

                    //Stores the first element of the array
                    tempPlayerObj = PlayerObj[0];

                    for (j = 0; j < j_len; j++) {

                        //Shift element of array by one
                        PlayerObj[j] = PlayerObj[j + 1];
                    }

                    //First element of array will be added to the end
                    PlayerObj[j] = tempPlayerObj;

                } else {// else if offset -1 result 3 0 1 2

                    //Stores the last element of array
                    tempPlayerObj = PlayerObj[3];

                    for (j = j_len; j > 0; j--) {

                        //Shift element of array by one
                        PlayerObj[j] = PlayerObj[j - 1];
                    }


                    //Last element of array will be added to the start of array.
                    PlayerObj[0] = tempPlayerObj;
                }

            }

        }

        for (i = 0; i < PlayerAccount; i++) {

            PlayerObj[i].playerView.setLayoutParams(MultiStreamPlayerViewLayout[i + 4]);

            if (PlayerObj[i].Listener != null)
                PlayerObj[i].Listener.UpdatePosition(i);
        }

        ApplyAudioAll();

    }

    public void SetMultiStream() {

        for (int i = 0; i < PlayerAccount; i++) {
            PlayerObj[i].playerView.setLayoutParams(MultiStreamPlayerViewLayout[i]);
        }

        PlayerObjUpdateTrackSelector(0, 1);

    }

    public void UnSetMultiStream() {
        ClearPlayer(2);
        ClearPlayer(3);

        if (PicturePicture) {

            updateVideSizePP(isFullScreen);
            ResetPPView();

        } else {

            updateVideSize(isFullScreen);
            PlayerObj[1].playerView.setLayoutParams(PlayerViewSmallSize[PicturePicturePosition][PicturePictureSize]);

        }

        if (!PicturePicture || PlayerObj[0].player == null || PlayerObj[1].player == null) {

            PicturePicture = false;
            ClearPlayer(1);

        }

        PlayerObj[2].playerView.setVisibility(View.GONE);
        PlayerObj[3].playerView.setVisibility(View.GONE);

        PlayerObjUpdateTrackSelector(0, 0);
    }

    private void GetCurrentPosition() {
        CurrentPositionHandler[0].removeCallbacksAndMessages(null);

        CurrentPositionHandler[0].postDelayed(() -> {

            PlayerCurrentPosition = PlayerObj[0].player != null ? PlayerObj[0].player.getCurrentPosition() : 0L;

            GetCurrentPosition();

        }, CurrentPositionTimeout);
    }

    private void GetCurrentPositionSmall() {
        CurrentPositionHandler[1].removeCallbacksAndMessages(null);

        CurrentPositionHandler[1].postDelayed(() -> {

            SmallPlayerCurrentPosition = PlayerObj[4].player != null ? PlayerObj[4].player.getCurrentPosition() : 0L;

            GetCurrentPositionSmall();

        }, CurrentPositionTimeout);
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
            if (warningShowing) runOnUiThread(this::HideWarningText);

        } else if (!warningShowing && PingWarning && PlayerObj[0].player == null) {//Prevent showing if playing or disabled by user

            PingErrorCounter++;
            if (PingErrorCounter > 3) {//> 0 1 2 3 = 32s... 5 seconds of postDelayed plus 3 seconds of waitFor/postDelayed times 4 = 32s

                PingErrorCounter = 0L;
                runOnUiThread(() -> ShowWarningText(getString(R.string.no_internet)));
                MainThreadHandler.postDelayed(this::HideWarningText, 30000);

            }

        }

        if (!IsStopped) StartPing();

    }

    private void DestroyGetPing() {
        try {
            if (PingProcess != null) {
                PingProcess.destroy();

                Tools.closeQuietly(PingProcess.getInputStream());
                Tools.closeQuietly(PingProcess.getOutputStream());
                Tools.closeQuietly(PingProcess.getErrorStream());
            }

        } catch (Exception ignored) {
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

            if (PingProcess.exitValue() == 0) {

                Matcher pingMatcher = TIME_NAME.matcher(Tools.readFullyString(PingProcess.getInputStream()));
                return pingMatcher.find() ? pingMatcher.group(1) : null;

            } else return null;

        } catch (Throwable ignore) {
        } finally {
            DestroyGetPing();
        }

        return null;
    }

    @Override
    public void onResume() {
        super.onResume();

        if (!IsStopped) {

            return;//Prevent onResume call after startActivityForResult() from OpenExternal()

        }

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
                        ChannelsUtils.StartLive(
                                context,
                                appPreferences,
                                DEFAULT_HEADERS,
                                Constants.CHANNELS_NAMES
                        );
                        break;
                    case Constants.CHANNEL_TYPE_USER_LIVE:
                        ChannelsUtils.SetUserLive(
                                context,
                                Tools.getString(Constants.PREF_USER_ID, null, appPreferences),
                                appPreferences,
                                Constants.CHANNELS_NAMES
                        );
                        break;
                    case Constants.CHANNEL_TYPE_FEATURED:
                        ChannelsUtils.StartFeatured(
                                context,
                                DEFAULT_HEADERS,
                                Constants.CHANNELS_NAMES
                        );
                        break;
                    case Constants.CHANNEL_TYPE_GAMES:
                        ChannelsUtils.StartGames(
                                context,
                                DEFAULT_HEADERS,
                                Constants.CHANNELS_NAMES
                        );
                        break;
                    default:
                        break;
                }

            } catch (Exception e) {
                Tools.recordException(TAG, "RefreshChannel Type" + Type + " Exception ", e);
            }

            if (!skipToast) RefreshChannelToast(Type, context);
        });

    }

    public void RefreshChannelToast(int Type, Context context) {
        if (!canRunChannel || Type == 0) return;

        Toast.makeText(
                context,
                String.format(
                        Locale.US,
                        context.getString(R.string.channel_refreshed),
                        Constants.CHANNELS_NAMES[Type]
                ),
                Toast.LENGTH_LONG).show();

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

    private void ClearWebViewChache(boolean deleteBackground) {
        if (mWebView != null) {
            CookieManager.getInstance().removeAllCookies(null);
            CookieManager.getInstance().flush();
            mWebView.clearCache(true);
            mWebView.clearHistory();

            if (deleteBackground) {

                DeleteHandler.post(() -> Tools.deleteCache(this));

            } else {

                Tools.deleteCache(this);

            }
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

        updateResumePosition(0);//VOD only uses mainPlayer
        for (int i = 0; i < PlayerAccount; i++) {
            ClearPlayer(i);
        }
        Clear_PreviewPlayer();
        CurrentPositionHandler[0].removeCallbacksAndMessages(null);

        ClearWebViewChache(true);

        //Prevent java timeout and related on background
        if (mWebView != null && AlreadyStarted) {
            mWebView.loadUrl("javascript:smartTwitchTV.Main_CheckStop()");
        }

        //Clear activity notification check and start background service if enable
        NotificationHandler.removeCallbacksAndMessages(null);
        StartNotificationService();

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

        //Reset the intent to avoid leaks that may happen when the app is killed (force close do to low ram for example)
        //TODO find a way to read a intent after the app was killed
        LastIntent = null;
        Intent intent = getIntent();
        intent.setAction(null);
        setIntent(intent);

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
                    InitNotifications(Constants.NOTIFICATION_CHECK_INTERVAL, context);
                }

            }, timeout + (delay > 0 ? delay : 0));

        } catch (Exception e) {
            Tools.recordException(TAG, "InitNotifications e ", e);
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
        //TODO check deprecation
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

        //For some random devices this may crash the app

        try {

            finishAndRemoveTask();

        } catch (Exception e) {
            Tools.recordException(TAG, "closeThis Exception ", e);
        }
    }

    //Minimize the app
    private void minimizeThis() {

        //For some random devices this may crash the app

        try {

            this.moveTaskToBack(true);

        } catch (Exception e) {
            Tools.recordException(TAG, "minimizeThis Exception ", e);
        }
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
        runOnUiThread(() -> mWebView.loadUrl(LoadUrlString));
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
        //TODO check deprecation
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

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {

                CheckURL(failingUrl);

            }

            @TargetApi(Build.VERSION_CODES.M)
            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {

                CheckURL(request.getUrl().toString());

            }

            //TODO onReceivedError may not always work but onReceivedHttpError does, find a older API workaround
            @TargetApi(Build.VERSION_CODES.M)
            @Override
            public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {

                CheckURL(request.getUrl().toString());

            }


            void CheckURL(String url) {

                if (Objects.equals(url, Constants.PageUrl)) {

                    AppUrl = Constants.PageUrlBackup;
                    mWebView.loadUrl(AppUrl);

                }

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
        AppUrl = Constants.PageUrl;
        mWebView.loadUrl(AppUrl);
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
                        ChannelsUtils.UpdateAllChannels(this, appPreferences, Constants.CHANNELS_NAMES);
                    } catch (Exception e) {
                        Tools.recordException(TAG, "UpdateAllChannels Exception ", e);
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
        //TODO check deprecation
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
                runOnUiThread(() -> mWebView.dispatchKeyEvent(event));
                //If return true, WebView will not handle the key event
                return true;
            }

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {

                CheckURL(failingUrl);

            }

            @TargetApi(Build.VERSION_CODES.M)
            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {

                CheckURL(request.getUrl().toString());

            }

            @TargetApi(Build.VERSION_CODES.M)
            @Override
            public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {

                CheckURL(request.getUrl().toString());

            }

            void CheckURL(String url) {

                if (Objects.equals(url, Constants.KeyPageUrl)) {

                    mWebView.loadUrl(Constants.KeyPageUrlBackup);

                }

            }

        });

        mWebViewKeyIsShowing = true;
        mWebViewKey.loadUrl(Constants.KeyPageUrl);
    }

    public void mSetQuality(int position) {

        if (PlayerObj[0].trackSelector != null) {
            IsInAutoMode = position == -1;

            if (IsInAutoMode) {
                PlayerObjUpdateTrackSelector(0, 0);

                return;
            }

            MappingTrackSelector.MappedTrackInfo mappedTrackInfo = PlayerObj[0].trackSelector.getCurrentMappedTrackInfo();

            if (mappedTrackInfo != null) {
                for (int rendererIndex = 0; rendererIndex < mappedTrackInfo.getRendererCount(); rendererIndex++) {

                    if (mappedTrackInfo.getRendererType(rendererIndex) == C.TRACK_TYPE_VIDEO) {

                        DefaultTrackSelector.ParametersBuilder builder = PlayerObj[0].trackSelector.getParameters().buildUpon();
                        builder.clearSelectionOverrides(rendererIndex).setRendererDisabled(rendererIndex, false);

                        if (position < mappedTrackInfo.getTrackGroups(rendererIndex).get(/* groupIndex */ 0).length) {// else auto quality

                            builder.setSelectionOverride(
                                    rendererIndex,
                                    mappedTrackInfo.getTrackGroups(rendererIndex),
                                    new DefaultTrackSelector.SelectionOverride(/* groupIndex */ 0, position)//groupIndex = 0 as the length of trackGroups in trackGroupArray is always 1
                            );

                        }

                        PlayerObj[0].trackSelector.setParameters(builder);
                        break;
                    }

                }
            }
        }
    }

    public void setEnabledQualities(int position) {

        if (PlayerObj[position].trackSelector != null) {

            MappingTrackSelector.MappedTrackInfo mappedTrackInfo = PlayerObj[position].trackSelector.getCurrentMappedTrackInfo();

            if (mappedTrackInfo != null) {
                for (int rendererIndex = 0; rendererIndex < mappedTrackInfo.getRendererCount(); rendererIndex++) {

                    if (mappedTrackInfo.getRendererType(rendererIndex) == C.TRACK_TYPE_VIDEO) {

                        DefaultTrackSelector.ParametersBuilder builder = trackSelectorParameters[PlayerObj[position].trackSelectorParametersPosition].buildUpon();
                        builder.clearSelectionOverrides(rendererIndex).setRendererDisabled(rendererIndex, false);

                        TrackGroupArray trackGroupArray = mappedTrackInfo.getTrackGroups(rendererIndex);
                        if (trackGroupArray.length > 0) {

                            int MaxBitrate = PlayerBitrate[PlayerObj[position].trackSelectorParametersPosition];
                            int MaxResolution = PlayerResolution[PlayerObj[position].trackSelectorParametersPosition];

                            ArrayList<Integer> result = new ArrayList<>();
                            Format format;
                            TrackGroup groupIndex = trackGroupArray.get(0);
                            int groupIndex_len = groupIndex.length;
                            boolean add;

                            for (int trackIndex = 0; trackIndex < groupIndex_len; trackIndex++) {
                                format = groupIndex.getFormat(trackIndex);
                                add = true;

                                if (format.bitrate <= MaxBitrate && format.height <= MaxResolution) {

                                    for (String value : BLACKLISTED_QUALITIES) {
                                        if (Integer.toString(format.height).startsWith(value)) {
                                            add = false;
                                            break;
                                        }
                                    }

                                    if (add) {
                                        result.add(trackIndex);
                                    }

                                }

                            }

                            int len = result.size();
                            //prevent block it all
                            if (len >= groupIndex_len) len = groupIndex_len - 1;

                            if (len > 0) {

                                int[] ret = new int[len];

                                for (int i = 0; i < len; i++) {
                                    ret[i] = result.get(i);
                                }

                                builder.setSelectionOverride(
                                        rendererIndex,
                                        mappedTrackInfo.getTrackGroups(rendererIndex),
                                        new DefaultTrackSelector.SelectionOverride(/* groupIndex */ 0, ret)//groupIndex = 0 as the length of trackGroups in trackGroupArray is always 1
                                );

                            }
                        }

                        PlayerObj[position].trackSelector.setParameters(builder);
                        break;
                    }

                }
            }
        }
    }

    public void PlayerEventListenerCheckCounter(int position, int fail_type, int errorCode) {
        PlayerObj[position].CheckHandler.removeCallbacksAndMessages(null);

        if (BuildConfig.DEBUG) {
            Log.i(TAG, "PlayerEventListenerCheckCounter position " + position + " PlayerObj[position].CheckCounter " + PlayerObj[position].CheckCounter + " fail_type " + fail_type + " errorCode " + errorCode);
        }

        //Pause to things run smother and prevent odd behavior during the checks
        if (PlayerObj[position].player != null) {

            PlayerObj[position].player.setPlayWhenReady(false);

        }

        PlayerObj[position].CheckCounter++;


        if (position < 4) {
            //Main players

            if (PlayerObj[position].CheckCounter == 1) {//first check just reset

                PlayerEventListenerCheckCounterEnd(position);

            } else if (PlayerObj[position].CheckCounter < 4) {

                if ((PlayerObj[position].isScreenPreview || !CheckSource || IsInAutoMode || MultiStreamEnable || PicturePicture) && //General reset only cases
                        (PlayerObj[position].isScreenPreview || PlayerObj[position].Type < 3)) {//If is clip always call js unless in screen preview

                    PlayerEventListenerCheckCounterEnd(position);

                } else {

                    LoadUrlWebview("javascript:smartTwitchTV.Play_PlayerCheck(" + PlayerObj[position].Type + "," + errorCode + ")");

                }


            } else {// CheckCounter == 3 Give up internet is probably down or something related

                PlayerEventListenerClear(position, fail_type, errorCode);

            }

        } else {
            //Preview player

            if (PlayerObj[position].CheckCounter < 4) {

                PlayerEventListenerCheckCounterEnd(position);

            } else {

                Clear_PreviewPlayer();
                LoadUrlWebview("javascript:smartTwitchTV.Play_CheckIfIsLiveClean(" + fail_type + "," + errorCode + ")");

            }

        }
    }

    //First check only reset the player as it may be stuck
    public void PlayerEventListenerCheckCounterEnd(int position) {
        if (BuildConfig.DEBUG) {
            Log.i(TAG, "PlayerEventListenerCheckCounterEnd position " + position + " PlayerObj[position].CheckCounter " + PlayerObj[position].CheckCounter + " Type " + PlayerObj[position].Type);
        }

        updateResumePosition(position);

        //Simple release to make sure player is reseated before start a new playback
        SimpleReleasePlayer(position);
        SetupPlayer(position);
    }

    public void PlayerEventListenerClear(int position, int fail_type, int errorCode) {
        if (BuildConfig.DEBUG) {
            Log.i(TAG, "PlayerEventListenerClear position " + position + " fail_type " + fail_type + " errorCode " + errorCode);
        }
        String WebViewLoad;

        if (position < 4) {
            //Main players

            hideLoading(5);
            hideLoading(position);

            if (MultiStreamEnable) {

                ClearPlayer(position);
                WebViewLoad = "Play_MultiEnd(" + position + "," + fail_type + "," + errorCode + ")";

            } else if (PicturePicture) {

                ClearPlayer(position);
                WebViewLoad = "PlayExtra_End(" + (position == 0) + "," + fail_type + "," + errorCode + ")";

            } else if (PlayerObj[position].isScreenPreview) {

                ClearPlayer(position);
                WebViewLoad = "Play_CheckIfIsLiveClean(" + fail_type + "," + errorCode + ")";

            } else {

                //Don't call ClearPlayer so Play_Play_PannelEndStart works as intend
                WebViewLoad = "Play_PannelEndStart(" + PlayerObj[position].Type + "," + fail_type + "," + errorCode + ")";

            }

        } else {
            //Preview player

            Clear_PreviewPlayer();
            WebViewLoad = "Play_CheckIfIsLiveClean(" + fail_type + "," + errorCode + ")";
            ApplyAudioAll();

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
        public void SetLanguage(String lang) {
            Tools.SetLanguage(mWebViewContext, lang);
        }

        @JavascriptInterface
        public String mPageUrl() {
            return AppUrl;
        }

        @JavascriptInterface
        public void mloadUrl(String url) {
            LoadUrlWebview(url);
        }

        @JavascriptInterface
        public void CleanAndLoadUrl(String url) {

            runOnUiThread(() -> {

                ClearWebViewChache(false);
                mWebView.loadUrl(url);

            });

        }

        @JavascriptInterface
        public void mshowLoading(boolean show) {
            runOnUiThread(() -> {
                if (show) showLoading();
                else hideLoading(5);
            });
        }

        @JavascriptInterface
        public void mshowLoadingBottom(boolean show) {
            runOnUiThread(() -> {
                if (show) showLoadingBotton();
                else hideLoading(6);
            });
        }

        @JavascriptInterface
        public void mclose(boolean close) {
            runOnUiThread(() -> {
                if (close) closeThis();
                else minimizeThis();
            });
        }

        @JavascriptInterface
        public void showToast(String toast) {
            runOnUiThread(() -> Toast.makeText(mWebViewContext, toast, Toast.LENGTH_LONG).show());
        }

        @JavascriptInterface
        public void OpenExternal(String url) {

            runOnUiThread(() -> {

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
            runOnUiThread(() -> {
                if (getResources().getConfiguration().keyboard == Configuration.KEYBOARD_QWERTY) {
                    Tools.hideKeyboardFrom(mWebViewContext, mWebView);
                }
            });
        }

        @JavascriptInterface
        public void hideKeyboardFrom() {
            runOnUiThread(() -> Tools.hideKeyboardFrom(mWebViewContext, mWebView));
        }

        @JavascriptInterface
        public void AvoidClicks(boolean Avoid) {
            if (deviceIsTV) return;

            runOnUiThread(() -> {
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

            runOnUiThread(() -> {
                mWebViewKeyIsShowing = true;
                mWebViewKey.setVisibility(View.VISIBLE);
                mWebViewKey.requestFocus();
                mWebViewKey.loadUrl("javascript:Extrapage.initbodyClickSet()");
            });
        }

        @JavascriptInterface
        public void SetKeysOpacity(int Opacity) {
            if (deviceIsTV) return;
            runOnUiThread(() -> mWebViewKey.loadUrl("javascript:Extrapage.Set_dpad_opacity(" + Opacity + ")"));
        }

        @JavascriptInterface
        public void SetKeysPosition(int Position) {
            if (deviceIsTV) return;
            runOnUiThread(() -> mWebViewKey.loadUrl("javascript:Extrapage.Set_dpad_position(" + Position + ")"));
        }

        @JavascriptInterface
        public boolean WebViewKeyIsShowing() {
            return deviceIsTV || mWebViewKeyIsShowing;
        }

        @JavascriptInterface
        public void showKeyboardFrom() {
            runOnUiThread(() -> Tools.showKeyboardFrom(mWebViewContext, mWebView));
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
            //appPreferences.put(Constants.PREF_USER_NAME, name);
            if (id != null)
                appPreferences.put(id + Constants.PREF_REFRESH_TOKEN, refresh_token);

            if (id == null) {

                StopNotifications();

                mUpdateUserChannels();

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

                    mUpdateUserChannels();

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

        void mUpdateUserChannels() {
            if (!canRunChannel) return;

            ChannelHandler.post(() -> {

                try {
                    ChannelsUtils.UpdateUserChannels(mWebViewContext, appPreferences, Constants.CHANNELS_NAMES);
                } catch (Exception e) {
                    Tools.recordException(TAG, "mUpdateUserChannels Exception ", e);
                }

            });

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
            runOnUiThread(() -> updateVideSize(FullScreen));
        }

        @JavascriptInterface
        public void mupdatesizePP(boolean FullScreen) {
            runOnUiThread(() -> updateVideSizePP(FullScreen));
        }

        @JavascriptInterface
        public void getDuration(String callback) {

            runOnUiThread(() -> {

                if (PlayerObj[0].player != null) {

                    mWebView.loadUrl("javascript:smartTwitchTV." + callback + "(" + PlayerObj[0].player.getDuration() + ")");

                }
            });

        }

        @JavascriptInterface
        public void mseekTo(long position) {
            runOnUiThread(() -> {

                if (PlayerObj[0].player != null) {
                    long duration = PlayerObj[0].player.getDuration();
                    long jumpPosition = position > 0 ? position : 0;

                    if (jumpPosition >= duration)
                        jumpPosition = duration - 1000;

                    PlayerCurrentPosition = jumpPosition;
                    //Make sure we are playing and not paused, this way the listeners will properly work
                    PlayerObj[0].player.setPlayWhenReady(true);
                    PlayerObj[0].player.seekTo(jumpPosition);
                }
            });
        }

        @JavascriptInterface
        public void SetReUsePlayer(boolean mReUsePlayer) {
            reUsePlayer = mReUsePlayer;
        }

        @JavascriptInterface
        public void CheckReUsePlayer(String CodecListToCheck) {

            if (CodecListToCheck == null || CodecListToCheck.isEmpty()) reUsePlayer = true;
            else reUsePlayer = Tools.DefectedCodecDontExist(CodecListToCheck.split(","));

        }

        @JavascriptInterface
        public void ReuseFeedPlayerPrepare(int trackSelectorPos) {

            runOnUiThread(() -> {

                PlayerObj[4].playerView.setLayoutParams(HideLayout);

                if (PlayerObj[4].player != null) PlayerObj[4].player.setPlayWhenReady(false);

                PlayerObjUpdateTrackSelector(
                        4,
                        trackSelectorPos
                );

            });

        }

        @JavascriptInterface
        public void ReuseFeedPlayer(String uri, String mainPlaylistString, int Type, long ResumePosition, int PlayerObjPosition) {
            runOnUiThread(() -> {

                //Make sure callbacks are removed before
                if (PlayerObj[4].player != null) {

                    PlayerObj[4].CheckHandler.removeCallbacksAndMessages(null);
                    PlayerObj[4].player.setPlayWhenReady(false);
                    PlayerObj[4].playerView.setLayoutParams(HideLayout);

                }

                //Make sure the listener is removed also from the player that will be released
                if (PlayerObj[PlayerObjPosition].player != null) {

                    PlayerObj[PlayerObjPosition].CheckHandler.removeCallbacksAndMessages(null);
                    PlayerObj[PlayerObjPosition].player.setPlayWhenReady(false);

                }

                if (!MultiStreamEnable && PlayerObjPosition == 1) {

                    PicturePicture = true;
                    //Call this always before starting the players
                    ResetPPView();

                }

                // Minor delay to make sure there is no visual glitches
                // that can happen when using setPlayer on active players
                // this also may help to prevent slowend devices lag
                // as all players are on a paused state before doing the changes
                MainThreadHandler.postDelayed(() -> {

                    boolean mReUsePlayer = CanReUsePlayer(
                            mainPlaylistString,
                            MultiStreamEnable ? 1 : PlayerObjPosition
                    );

                    Set_PlayerObj(
                            false,
                            Type,
                            ResumePosition,
                            MultiStreamEnable ? 1 : PlayerObjPosition,// always 0 or 1... so safe to use position
                            PlayerObjPosition
                    );

                    if (mReUsePlayer) {

                        PlayerObjUpdateTrackSelector(
                                4,
                                PlayerObj[PlayerObjPosition].trackSelectorParametersPosition
                        );

                        ReUsePlayer(PlayerObjPosition);

                    } else {

                        if (PlayerObj[4].player != null) Clear_PreviewPlayer();

                        PlayerObj[PlayerObjPosition].mediaSources = Tools.buildMediaSource(
                                Uri.parse(uri),
                                mWebViewContext,
                                Type,
                                mLowLatency,
                                mainPlaylistString,
                                userAgent
                        );

                        SetupPlayer(PlayerObjPosition);

                    }

                    PreviewPlayerPlaylist = null;

                }, 50);

            });
        }

        @JavascriptInterface
        public void StartAuto(String uri, String mainPlaylistString, int Type, long ResumePosition, int position) {
            runOnUiThread(() -> {
                boolean startPlayer = PlayerObj[0].player == null || !PlayerObj[0].isScreenPreview;

                if (startPlayer) {

                    if (position == 1) {
                        PicturePicture = true;
                        //Call this always before starting the player
                        ResetPPView();
                    }

                    VideoWebHolder.bringChildToFront(mWebView);

                    Set_PlayerObj(
                            false,
                            Type,
                            ResumePosition,
                            position,// always 0 or 1... so safe to use position
                            position
                    );

                    PlayerObj[position].mediaSources = Tools.buildMediaSource(
                            Uri.parse(uri),
                            mWebViewContext,
                            Type,
                            mLowLatency,
                            mainPlaylistString,
                            userAgent
                    );

                    SetupPlayer(position);

                    PreviewPlayerPlaylist = null;

                } else {

                    mFixViewPosition(position, Type);

                }

            });
        }

        @JavascriptInterface
        public void FixViewPosition(int position, int Type) {
            runOnUiThread(() -> mFixViewPosition(position, Type));
        }

        void mFixViewPosition(int position, int Type) {

            hideLoading(5);
            PlayerObj[position].isScreenPreview = false;
            PlayerObj[position].Type = Type;
            PlayerObj[0].playerView.setLayoutParams(PlayerViewDefaultSize);

            if (PlayerObj[0].player != null)
                mWebView.loadUrl("javascript:smartTwitchTV.Play_UpdateDuration(" + PlayerObj[0].player.getDuration() + ")");

            //Add a delay to make sure the PlayerView already change size before bring webview to front also webview may need a small delay to hide the screen UI and show the player
            MainThreadHandler.postDelayed(() -> VideoWebHolder.bringChildToFront(mWebView), 100);

        }

        @JavascriptInterface
        public void RestartPlayer(int Type, long ResumePosition, int position) {
            runOnUiThread(() -> {

                //Player Restart options... the player may randomly display a flicker green screen, or odd green artifacts after a player start or SwitchPlayer
                //The odd behavior will stay until the player is releasePlayer
                SimpleReleasePlayer(position);
                SetupPlayer(position);

            });
        }

//        @JavascriptInterface
//        public void PlayerEventListenerClearTest() {
//
//            runOnUiThread(() -> PlayerEventListenerClear(1, 0));
//
//        }

        @JavascriptInterface
        public String GetCheckIfIsLiveFeed(int x, int y) {
            return PreviewFeedResult[x][y];
        }

        @JavascriptInterface
        public void CheckIfIsLiveFeed(String token_url, String hls_url, String callback, int x, int y, int Timeout, String dataProp, String postMessage) {

            PreviewFeedResult[x][y] = null;

            try {
                DataThreadPool.execute(() ->
                        {
                            try {
                                PreviewFeedResult[x][y] = Tools.getStreamData(token_url, hls_url, 0L, Timeout, dataProp, postMessage);
                            } catch (Exception e) {
                                Tools.recordException(TAG, "CheckIfIsLiveFeed Exception ", e);
                            }

                            if (PreviewFeedResult[x][y] != null)
                                LoadUrlWebview("javascript:smartTwitchTV." + callback + "(Android.GetCheckIfIsLiveFeed(" + x + "," + y + "), " + x + "," + y + ")");
                            else CheckIfIsLiveFeedError(x, y, callback);

                        }
                );
            } catch (Exception e) {//Most are RejectedExecutionException
                CheckIfIsLiveFeedError(x, y, callback);

                Tools.recordException(TAG, "CheckIfIsLiveFeed Exception ", e);
            }
        }

        void CheckIfIsLiveFeedError(int x, int y, String callback) {
            //MethodUrl is null inform JS callback
            PreviewFeedResult[x][y] = Tools.ResponseObjToString(0, "", 0);
            LoadUrlWebview("javascript:smartTwitchTV." + callback + "(Android.GetCheckIfIsLiveFeed(" + x + "," + y + "), " + x + "," + y + ")");
        }

        @JavascriptInterface
        public void SetStreamDataHeaders(String header) {
            Tools.SetStreamDataHeaders(header);
        }

        @JavascriptInterface
        public String getStreamData(String token_url, String hls_url, int Timeout, String dataProp, String postMessage) {
            try {
                return Tools.getStreamData(token_url, hls_url, 0L, Timeout, dataProp, postMessage);
            } catch (Exception e) {
                Tools.recordException(TAG, "getStreamData Exception ", e);
            }

            return null;
        }

        @JavascriptInterface
        public void getStreamDataAsync(String token_url, String hls_url, String callback, long checkResult, int position, int Timeout, String dataProp, String postMessage) {

            StreamDataResult[position] = null;

            try {
                DataThreadPool.execute(() ->
                        {

                            try {
                                StreamDataResult[position] = Tools.getStreamData(token_url, hls_url, checkResult, Timeout, dataProp, postMessage);
                            } catch (Exception e) {
                                Tools.recordException(TAG, "getStreamDataAsync Exception ", e);
                            }

                            if (StreamDataResult[position] != null) {

                                LoadUrlWebview("javascript:smartTwitchTV." + callback + "(Android.GetDataResult(" + position + "), " + position + ")");

                            } else {

                                getStreamDataAsyncError(position, callback, checkResult);

                            }

                        }
                );
            } catch (Exception e) {//Most are RejectedExecutionException

                getStreamDataAsyncError(position, callback, checkResult);

                Tools.recordException(TAG, "getStreamDataAsync Exception ", e);

            }

        }

        void getStreamDataAsyncError(int position, String callback, long checkResult) {
            StreamDataResult[position] = Tools.ResponseObjToString(0, "", checkResult);
            LoadUrlWebview("javascript:smartTwitchTV." + callback + "(Android.GetDataResult(" + position + "), " + position + ")");
        }

        @JavascriptInterface
        public String GetDataResult(int position) {
            return StreamDataResult[position];
        }

        @JavascriptInterface
        public String mMethodUrlHeaders(String urlString, int timeout, String postMessage, String Method, long checkResult, String JsonHeadersArray) {
            try {

                Tools.ResponseObj response = Tools.MethodUrlHeaders(urlString, timeout, postMessage, Method, 0L, JsonHeadersArray);

                if (response != null) return new Gson().toJson(response);

            } catch (Exception e) {//Most are RejectedExecutionException
                Tools.recordException(TAG, "mMethodUrlHeaders Exception ", e);
            }

            return Tools.ResponseObjToString(0, "", checkResult);
        }

        @JavascriptInterface
        public String BasexmlHttpGetResult(int DataResultPos) {
            return BasexmlHttpGetResultArray[DataResultPos];
        }

        @JavascriptInterface
        public void BasexmlHttpGet(String urlString, int timeout, String postMessage, String Method, String JsonHeadersArray,
                                   String callback, long checkResult, long key, String callbackSucess, String calbackError) {

            BasexmlHttpGetResultpos++;
            if (BasexmlHttpGetResultpos > BasexmlHttpGetResultArray.length - 1) {
                BasexmlHttpGetResultpos = 0;
            }

            int DataResultPos = BasexmlHttpGetResultpos;
            BasexmlHttpGetResultArray[DataResultPos] = null;

            try {
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

                                BasexmlHttpGetResultArray[DataResultPos] = new Gson().toJson(response);
                                LoadUrlWebview("javascript:smartTwitchTV." + callback + "(Android.BasexmlHttpGetResult(" + DataResultPos + "), " + key + ",'" + callbackSucess + "','" + calbackError + "'," + checkResult + ")");

                            } else {

                                BasexmlHttpGetError(callback, checkResult, key, DataResultPos, callbackSucess, calbackError);

                            }

                        }
                );
            } catch (Exception e) {//Most are RejectedExecutionException

                BasexmlHttpGetError(callback, checkResult, key, DataResultPos, callbackSucess, calbackError);

                Tools.recordException(TAG, "GetMethodUrlHeadersAsync Exception ", e);

            }
        }

        void BasexmlHttpGetError(String callback, long checkResult, long key, int DataResultPos, String callbackSucess, String calbackError) {
            //MethodUrl is null inform JS callback
            BasexmlHttpGetResultArray[DataResultPos] = Tools.ResponseObjToString(0, "", checkResult);
            LoadUrlWebview("javascript:smartTwitchTV." + callback + "(Android.BasexmlHttpGetResult(" + DataResultPos + "), " + key + ",'" + callbackSucess + "','" + calbackError + "'," + checkResult + ")");
        }

        @JavascriptInterface
        public void SetFeedPosition(int position) {
            runOnUiThread(() -> PlayerObj[4].playerView.setLayoutParams(PlayerViewExtraLayout[PreviewSize][position]));
        }

//        @JavascriptInterface
//        public void TestFun() {
//            runOnUiThread(() -> {
//
//                FrameLayout.LayoutParams temp = new FrameLayout.LayoutParams(0, 0, 0);
//                PlayerObj[0].playerView.setLayoutParams(temp);
//                PlayerObj[0].playerView.setLayoutParams(PlayerViewDefaultSize);
//
//            });
//        }

        @JavascriptInterface
        public void ClearFeedPlayer() {
            runOnUiThread(() -> {

                if (PlayerObj[4].player != null) Clear_PreviewPlayer();

            });
        }

        @JavascriptInterface
        public void StartFeedPlayer(String uri, String mainPlaylistString, int position, long resumePosition, boolean isVod) {
            runOnUiThread(() -> {

                //Reset the Z position of the PP player so it show above the other on android 7 and older
                //Call this always before starting the player
                if (IsUsingSurfaceView) {
                    SurfaceView PlayerSurfaceView = (SurfaceView) PlayerObj[4].playerView.getVideoSurfaceView();

                    if (PlayerSurfaceView != null) {

                        PlayerSurfaceView.setZOrderMediaOverlay(true);

                    }

                }

                PreviewPlayerPlaylist = mainPlaylistString;
                PlayerObj[4].mediaSources = Tools.buildMediaSource(
                        Uri.parse(uri),
                        mWebViewContext,
                        isVod ? 2 : 1,
                        mLowLatency,
                        mainPlaylistString,
                        userAgent
                );

                Set_PlayerObj(
                        false,
                        isVod ? 2 : 1,
                        resumePosition,
                        AllMainPlayerInUse() ? 2 : 1,//Technically the trackSelectorParameters[2] is requires less performance, when all player are be used use 2
                        4
                );

                PlayerObj[4].playerView.setLayoutParams(PlayerViewExtraLayout[PreviewSize][position]);

                SetupPlayer(4);
            });
        }

        @JavascriptInterface
        public void SetPlayerViewFeedBottom(float bottom, int web_height) {
            int i, j, len = PlayerViewExtraLayout.length, lenEx;

            float scale = (float) ScreenSize.y / web_height;//WebView screen size is not the same size as device screen
            int bottomMargin = (int) Math.floor(ScreenSize.y - (bottom * scale));

            for (i = 0; i < len; i++) {
                lenEx = PlayerViewExtraLayout[i].length;
                for (j = 0; j < lenEx; j++) {
                    PlayerViewExtraLayout[i][j].bottomMargin = bottomMargin;
                }
            }
        }

        @JavascriptInterface
        public void SetPlayerViewSidePanel(float bottom, float right, float left, int web_height) {
            PlayerViewSidePanel = Tools.BasePreviewLayout(bottom, right, left, web_height, ScreenSize, false);
        }

        @JavascriptInterface
        public void StartSidePanelPlayer(String uri, String mainPlaylistString) {
            runOnUiThread(() -> {

                PlayerObj[0].mediaSources = Tools.buildMediaSource(
                        Uri.parse(uri),
                        mWebViewContext,
                        1,
                        mLowLatency,
                        mainPlaylistString,
                        userAgent
                );

                VideoWebHolder.bringChildToFront(VideoHolder);
                PlayerObj[0].playerView.setLayoutParams(PlayerViewSidePanel);

                Set_PlayerObj(
                        true,
                        1,
                        0,
                        0,
                        0
                );

                SetupPlayer(0);

            });
        }

        @JavascriptInterface
        public void StartScreensPlayer(String uri, String mainPlaylistString, int ResumePosition,
                                       float bottom, float right, float left, int web_height, int Type, boolean bigger) {
            runOnUiThread(() -> {

                PlayerObj[0].mediaSources = Tools.buildMediaSource(
                        Uri.parse(uri),
                        mWebViewContext,
                        Type,
                        mLowLatency,
                        mainPlaylistString,
                        userAgent
                );

                PlayerViewScreensLayout = Tools.BasePreviewLayout(bottom, right, left, web_height, ScreenSize, bigger);

                VideoWebHolder.bringChildToFront(VideoHolder);
                PlayerObj[0].playerView.setLayoutParams(PlayerViewScreensLayout);

                Set_PlayerObj(
                        true,
                        Type,
                        ResumePosition,
                        0,
                        0
                );

                SetupPlayer(0);
            });
        }

        @JavascriptInterface
        public void SidePanelPlayerRestore() {
            runOnUiThread(() -> {
                PlayerObj[0].isScreenPreview = true;
                VideoWebHolder.bringChildToFront(VideoHolder);
                //Add a delay to make sure the VideoWebHolder already bringChildToFront before change size also webview may need a small delay to hide the player UI and show the screen
                MainThreadHandler.postDelayed(() -> PlayerObj[0].playerView.setLayoutParams(PlayerViewSidePanel), 100);
            });
        }

        @JavascriptInterface
        public void ScreenPlayerRestore(float bottom, float right, float left, int web_height, int Type, boolean bigger) {
            runOnUiThread(() -> {

                if (PlayerObj[0].player != null) {
                    PlayerObj[0].isScreenPreview = true;
                    VideoWebHolder.bringChildToFront(VideoHolder);

                    PlayerViewScreensLayout = Tools.BasePreviewLayout(bottom, right, left, web_height, ScreenSize, bigger);
                    //Add a delay to make sure the VideoWebHolder already bringChildToFront before change size also webview may need a small delay to hide the player UI and show the screen
                    MainThreadHandler.postDelayed(() -> PlayerObj[0].playerView.setLayoutParams(PlayerViewScreensLayout), 100);
                }

            });
        }

        @JavascriptInterface
        public void ClearSidePanelPlayer() {
            runOnUiThread(() -> {

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
            runOnUiThread(PlayerActivity.this::ResetPlayerState);
        }

        @JavascriptInterface
        public void mClearSmallPlayer() {
            runOnUiThread(() -> {
                PicturePicture = false;
                ClearPlayer(1);
            });
        }

        @JavascriptInterface
        public void mSwitchPlayer() {
            runOnUiThread(PlayerActivity.this::SwitchPlayer);
        }

        @JavascriptInterface
        public void mSwitchPlayerPosition(int mPicturePicturePosition) {
            PicturePicturePosition = mPicturePicturePosition;
            runOnUiThread(() -> UpdadeSizePosSmall(1, true));
        }

        @JavascriptInterface
        public void mSetPlayerPosition(int PicturePicturePos) {
            PicturePicturePosition = PicturePicturePos;
        }

        @JavascriptInterface
        public void mSwitchPlayerSize(int mPicturePictureSize) {
            PicturePictureSize = mPicturePictureSize;
            runOnUiThread(() -> UpdadeSizePosSmall(1, false));
        }

        @JavascriptInterface
        public void mSetPlayerSize(int mPicturePictureSize) {
            PicturePictureSize = mPicturePictureSize;
            runOnUiThread(PlayerActivity.this::SetDefaultLayouts);
        }

        @JavascriptInterface
        public void SetAudioEnabled(boolean pos1, boolean pos2, boolean pos3, boolean pos4) {
            AudioEnabled[0] = pos1;
            AudioEnabled[1] = pos2;
            AudioEnabled[2] = pos3;
            AudioEnabled[3] = pos4;
        }

        @JavascriptInterface
        public void SetVolumes(float pos1, float pos2, float pos3, float pos4) {
            PlayerObj[0].volume = pos1;
            PlayerObj[1].volume = pos2;
            PlayerObj[2].volume = pos3;
            PlayerObj[3].volume = pos4;
        }

        @JavascriptInterface
        public void ApplyAudio() {
            runOnUiThread(PlayerActivity.this::ApplyAudioAll);
        }

        @JavascriptInterface
        public void SetPreviewOthersAudio(int volume) {
            AudioMaxPreviewVisible = volume / 100f;
        }

        @JavascriptInterface
        public void SetPreviewAudio(int volume) {
            PlayerObj[4].volume = volume / 100f;
        }

        @JavascriptInterface
        public void SetPreviewSize(int mPreviewSize) {
            PreviewSize = mPreviewSize;
        }

        @JavascriptInterface
        public void SetMainPlayerBitrate(int Bitrate, int Resolution) {

            PlayerBitrate[0] = Bitrate == 0 ? Integer.MAX_VALUE : Bitrate;
            PlayerResolution[0] = Resolution == 0 ? Integer.MAX_VALUE : (Resolution + 10);
            int width = Resolution == 0 ? Integer.MAX_VALUE : (int) ((PlayerResolution[0] * 16.0f) / 9.0f);

            PlayerObjUpdateTrackSelectorParameters(
                    0,
                    mWebViewContext,
                    width
            );

        }

        @JavascriptInterface
        public void SetSmallPlayerBitrate(int Bitrate, int Resolution) {

            PlayerBitrate[1] = Bitrate == 0 ? Integer.MAX_VALUE : Bitrate;
            PlayerResolution[1] = Resolution == 0 ? Integer.MAX_VALUE : (Resolution + 10);
            int width = Resolution == 0 ? Integer.MAX_VALUE : (int) ((PlayerResolution[1] * 16.0f) / 9.0f);

            // Prevent small window causing lag to the device
            // Bitrates bigger then 8Mbs on two simultaneous video playback side by side can slowdown some devices
            // even though that device can play a 2160p60 at 30+Mbs on a single playback without problem
            PlayerObjUpdateTrackSelectorParameters(
                    1,
                    mWebViewContext,
                    width
            );

            //When all player are in use this will be used Max 720p60 res
            PlayerBitrate[2] = Math.min(PlayerBitrate[1], 4000000);
            PlayerResolution[2] = Math.min(PlayerResolution[1], 730);

            PlayerObjUpdateTrackSelectorParameters(
                    2,
                    mWebViewContext,
                    width
            );

        }

        @JavascriptInterface
        public long getsavedtime() {
            return PlayerObj[0].ResumePosition;
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
        public void SetCurrentPositionTimeout(int mCurrentPosition) {
            CurrentPositionTimeout = Math.max(mCurrentPosition, 100);
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
            runOnUiThread(() -> KeepScreenOn(keepOn));
        }

        @JavascriptInterface
        public void PlayPauseChange() {
            runOnUiThread(() -> {

                if (PlayerObj[0].player != null) {

                    boolean state = !PlayerObj[0].player.isPlaying();

                    for (int i = 0; i < PlayerAccount; i++) {
                        if (PlayerObj[i].player != null)
                            PlayerObj[i].player.setPlayWhenReady(state);
                    }

                    KeepScreenOn(state);
                    mWebView.loadUrl("javascript:smartTwitchTV.Play_PlayPauseChange(" + state + "," + PlayerObj[0].Type + ")");
                }
            });
        }

        @JavascriptInterface
        public void PlayPause(boolean state) {
            runOnUiThread(() -> {
                for (int i = 0; i < PlayerAccount; i++) {
                    if (PlayerObj[i].player != null) PlayerObj[i].player.setPlayWhenReady(state);
                }

                KeepScreenOn(state);
            });
        }

        @JavascriptInterface
        public boolean getPlaybackState() {
            return PlayerObj[0].IsPlaying;
        }

        @JavascriptInterface
        public void setPlaybackSpeed(float speed) {
            runOnUiThread(() -> {
                for (int i = 0; i < PlayerAccount; i++) {
                    if (PlayerObj[i].player != null)
                        PlayerObj[i].player.setPlaybackParameters(new PlaybackParameters(speed));
                }
            });
        }

        @JavascriptInterface
        public void SetBuffer(int Type, int buffer_size) {
            BUFFER_SIZE[Type - 1] = Math.min(buffer_size, 15000);
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
        public void getVideoQuality(int Type) {
            VideoQualityResult = null;

            runOnUiThread(() -> {

                if (PlayerObj[0].player != null)
                    VideoQualityResult = Tools.GetVideoQuality(PlayerObj[0].player.getVideoFormat());

                mWebView.loadUrl("javascript:smartTwitchTV.Play_ShowVideoQuality(" + Type + ",Android.getVideoQualityString())");
            });
        }

        @JavascriptInterface
        public String getVideoStatusString() {
            return getVideoStatusResult;
        }

        @JavascriptInterface
        public void getVideoStatus(boolean showLatency, int Type) {
            getVideoStatusResult = null;

            runOnUiThread(() -> {

                long buffer = 0L;
                long LiveOffset = 0L;
                long Duration = 0L;
                long Position = 0L;

                if (PlayerObj[0].player != null) {

                    buffer = PlayerObj[0].player.getTotalBufferedDuration();
                    Duration = PlayerObj[0].player.getDuration();
                    Position = PlayerObj[0].player.getCurrentPosition();

                    LiveOffset = getCurrentLiveOffset(
                            0,
                            Duration,
                            Position
                    );

                }

                getVideoStatusResult = new Gson().toJson(
                        new Object[]{
                                Tools.GetCounters(conSpeed, conSpeedAVG, SpeedCounter),//0
                                Tools.GetCounters(netActivity, NetActivityAVG, NetCounter),//1
                                droppedFrames,//2
                                DroppedFramesTotal,//3
                                Tools.getTime(buffer),//4
                                Tools.getTime(LiveOffset),//5
                                Tools.GetCounters(PingValue, PingValueAVG, PingCounter),//6
                                (buffer / 1000.0),//7
                                Duration,//8
                                Position//9
                        }
                );
                //Erase after read
                netActivity = 0L;

                mWebView.loadUrl("javascript:smartTwitchTV.Play_ShowVideoStatus(" + showLatency + "," + Type + ",Android.getVideoStatusString())");
            });

        }

        @JavascriptInterface
        public void getLatency(int chat_number) {
            runOnUiThread(() -> {

                if (PlayerObj[chat_number].player != null) {

                    //Reset the offset to force a recalculation on it update
                    PlayerObj[chat_number].LatencyOffSet = 0;

                    long LiveOffset = getCurrentLiveOffset(
                            chat_number,
                            PlayerObj[chat_number].player.getDuration(),
                            PlayerObj[chat_number].player.getCurrentPosition()
                    );

                    mWebView.loadUrl("javascript:smartTwitchTV.ChatLive_SetLatency(" + chat_number + "," + LiveOffset + ")");

                }

            });

        }

        @JavascriptInterface
        public boolean deviceIsTV() {
            return deviceIsTV;
        }

        @JavascriptInterface
        public void keyEvent(int key, int keyaction) {
            runOnUiThread(() -> mWebView.dispatchKeyEvent(new KeyEvent(keysAction[keyaction], keys[key])));
        }

        @JavascriptInterface
        public String getcodecCapabilities(String CodecType) {
            return Tools.codecCapabilities(CodecType);
        }

        @JavascriptInterface
        public void setBlackListMediaCodec(String CodecList) {
            BLACKLISTED_CODECS = CodecList != null && !CodecList.isEmpty() ? new BlackListMediaCodecSelector(CodecList.toLowerCase(Locale.US).split(",")) : null;
        }

        @JavascriptInterface
        public void msetPlayer(boolean surface_view, boolean FullScreen) {
            runOnUiThread(() -> {
                setPlayerSurface(surface_view);

                if (FullScreen) updateVideSizePP(true);
                else updateVideSize(false);

                UpdadeSizePosSmall(1, false);
            });
        }

        @JavascriptInterface
        public void mhideSystemUI() {
            runOnUiThread(PlayerActivity.this::hideSystemUI);
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
            runOnUiThread(PlayerActivity.this::Check_WriteExternalStorage);
        }

        @JavascriptInterface
        public boolean canBackupFile() {
            return Tools.WR_storage(mWebViewContext);
        }

        @JavascriptInterface
        public void EnableMultiStream(boolean MainBig, int offset) {
            runOnUiThread(() -> {
                MultiStreamEnable = true;
                if (MainBig) SetMultiStreamMainBig(offset);
                else SetMultiStream();
            });
        }

        @JavascriptInterface
        public void DisableMultiStream() {
            runOnUiThread(() -> {
                MultiStreamEnable = false;
                UnSetMultiStream();
            });
        }

        @JavascriptInterface
        public void StartMultiStream(int position, String uri, String mainPlaylistString, boolean Restart) {
            runOnUiThread(() -> {

                //Player Restart options... the player may randomly display a flicker green screen, or odd green artifacts after a SetMultiStreamMainBig
                //The odd behavior will stay until the player is releasePlayer
                if (Restart) SimpleReleasePlayer(position);

                Set_PlayerObj(
                        false,
                        1,
                        0,
                        1,
                        position
                );

                PlayerObj[position].mediaSources = Tools.buildMediaSource(
                        Uri.parse(uri),
                        mWebViewContext,
                        1,
                        mLowLatency,
                        mainPlaylistString,
                        userAgent
                );

                SetupPlayer(position);

                if (PlayerObj[4].player != null) Clear_PreviewPlayer();
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

            } catch (Settings.SettingNotFoundException ignore) {
            }

            return false;
        }

        @JavascriptInterface
        public String getWebviewVersion() {
            return Tools.getWebviewVersion(mWebViewContext);
        }

        @JavascriptInterface
        public String getQualities() {
            return Tools.getQualities(PlayerObj[0].trackSelector);
        }

        @JavascriptInterface
        public void SetQuality(int position) {
            mSetQuality(position);
        }

        @JavascriptInterface
        public void setBlackListQualities(String qualitiesList) {
            BLACKLISTED_QUALITIES = qualitiesList != null && !qualitiesList.isEmpty() ? qualitiesList.split(",") : null;
        }

        @JavascriptInterface
        public void LongLog(String log) {
            Tools.LongLog(TAG, log);
        }

        @JavascriptInterface
        public boolean getInstallFromPLay() {

            try {

                return Tools.InstallFromPLay(getApplicationContext());

            } catch (Exception ignore) {

                return false;

            }

        }

        @JavascriptInterface
        public void UpdateAPK(String apkURL, String failAll, String failDownload) {

            try {

                final Context context = getApplicationContext();
                final String appPackageName = context.getPackageName();

                if (apkURL == null) {

                    startActivity(
                            new Intent(
                                    Intent.ACTION_VIEW,
                                    Uri.parse("market://details?id=" + appPackageName)
                            )
                    );

                } else {

                    DataThreadPool.execute(() ->
                            {

                                final String file = Tools.DownloadAPK(apkURL, context);

                                if (file != null) {

                                    Tools.installPackage(context, file);

                                } else {

                                    runOnUiThread(() -> Toast.makeText(mWebViewContext, failDownload, Toast.LENGTH_LONG).show());

                                }


                            }
                    );

                }


            } catch (Exception e) {

                runOnUiThread(() -> Toast.makeText(mWebViewContext, failAll, Toast.LENGTH_LONG).show());

                Tools.recordException(TAG, "UpdateAPK Exception ", e);

            }

        }
    }

    // Basic EventListener for exoplayer
    private class PlayerEventListener implements Player.Listener {

        private int position;
        private final int Delay_ms;
        private final int defaultDelayPlayerCheck = 8000;
        private TrackGroupArray lastSeenTrackGroupArray = null;

        private PlayerEventListener(int position) {
            this.position = position;
            this.Delay_ms = BUFFER_SIZE[PlayerObj[position].Type - 1] + defaultDelayPlayerCheck + (MultiStreamEnable ? (defaultDelayPlayerCheck / 2) : 0);
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
            if (trackGroups != lastSeenTrackGroupArray && trackGroups.length > 0 && PlayerObj[position].Type < 3) {
                lastSeenTrackGroupArray = trackGroups;

                if ((IsInAutoMode || MultiStreamEnable || PicturePicture) && BLACKLISTED_QUALITIES != null && PlayerObj[position].player != null) {

                    setEnabledQualities(position);

                }

                if (position == 0 && !PicturePicture && !MultiStreamEnable) {

                    LoadUrlWebview("javascript:smartTwitchTV.Play_getQualities(" + PlayerObj[position].Type + ")");

                }

            }
        }

        @Override
        public void onIsPlayingChanged(boolean isPlaying) {
            PlayerObj[position].IsPlaying = isPlaying;
        }

        @Override
        public void onPlaybackStateChanged(@Player.State int playbackState) {

            if (PlayerObj[position].player == null)
                return;

            if (BuildConfig.DEBUG) {
                Log.i(TAG, "onPlaybackStateChanged position " + position + " Type " + PlayerObj[position].Type + " playbackState " + playbackState);
            }

            if (playbackState == Player.STATE_ENDED) {

                PlayerObj[position].CheckHandler.removeCallbacksAndMessages(null);
                PlayerObj[position].player.setPlayWhenReady(false);

                PlayerEventListenerClear(position, 0, 0);//player_Ended

            } else if (playbackState == Player.STATE_BUFFERING) {

                //Use the player buffer as a player check state to prevent be buffering for ever
                //If buffer for too long check because the player may have froze
                PlayerObj[position].CheckHandler.removeCallbacksAndMessages(null);
                PlayerObj[position].CheckHandler.postDelayed(() -> {

                    //Check if Player was released or is on pause
                    if (PlayerObj[position].player == null || !PlayerObj[position].player.isPlaying())
                        return;

                    PlayerEventListenerCheckCounter(position, 2, 0);//Player_Lag
                }, Delay_ms);

            } else if (playbackState == Player.STATE_READY) {

                PlayerObj[position].CheckHandler.removeCallbacksAndMessages(null);

                if (position < 4) {
                    //Main players

                    if (PlayerObj[position].Type == 1) {

                        //If other not playing just play it so they stay in sync
                        if (MultiStreamEnable) {

                            for (int i = 0; i < PlayerAccount; i++) {
                                if (position != i && PlayerObj[i].player != null)
                                    PlayerObj[i].player.setPlayWhenReady(true);
                            }

                        } else {

                            int OtherPlayer = position ^ 1;
                            if (PlayerObj[OtherPlayer].player != null) {
                                if (!PlayerObj[OtherPlayer].player.isPlaying())
                                    PlayerObj[OtherPlayer].player.setPlayWhenReady(true);
                            }

                        }

                        if (position < 2) {

                            //Reset the offset to force a recalculation on it update
                            PlayerObj[position].LatencyOffSet = 0;

                            long LiveOffset = getCurrentLiveOffset(
                                    position,
                                    PlayerObj[position].player.getDuration(),
                                    PlayerObj[position].player.getCurrentPosition()
                            );

                            LoadUrlWebview("javascript:smartTwitchTV.ChatLive_SetLatency(" + position + "," + LiveOffset + ")");

                        }

                    } else {

                        LoadUrlWebview("javascript:smartTwitchTV.Play_UpdateDuration(" + PlayerObj[position].player.getDuration() + ")");

                    }

                } else {
                    //Preview player

                    ApplyAudioAll();

                }

                //Delay the counter reset to make sure the connection is fine
                PlayerObj[position].CheckHandler.postDelayed(() -> PlayerObj[position].CheckCounter = 0, defaultDelayPlayerCheck);

            }
        }

        @Override
        public void onPlayerError(@NonNull PlaybackException e) {

            Tools.recordException(TAG, "onPlayerError pos " + position + " e.errorCode " + e.errorCode + " e ", e);

            PlayerEventListenerCheckCounter(position, 1, e.errorCode);//player_Erro

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
