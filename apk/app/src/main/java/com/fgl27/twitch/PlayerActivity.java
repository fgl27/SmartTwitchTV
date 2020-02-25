package com.fgl27.twitch;

import android.Manifest;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Context;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.Point;
import android.net.Uri;
import android.os.Build;
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
import com.google.android.exoplayer2.DefaultRenderersFactory;
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

import java.io.UnsupportedEncodingException;
import java.util.Locale;

public class PlayerActivity extends Activity {
    public static final String TAG = PlayerActivity.class.getName();
    //public static final String PageUrl = "file:///android_asset/index.html";
    public static final String PageUrl = "https://fgl27.github.io/SmartTwitchTV/release/index.min.html";
    public static final int PlayerAcount = 4;
    public static final int PlayerAcountPlus = PlayerAcount + 1;
    private static final int[] positions = {
            Gravity.RIGHT | Gravity.BOTTOM,//0
            Gravity.RIGHT | Gravity.CENTER,//1
            Gravity.RIGHT | Gravity.TOP,//2
            Gravity.CENTER | Gravity.TOP,//3
            Gravity.LEFT | Gravity.TOP,//4
            Gravity.LEFT | Gravity.CENTER,//5
            Gravity.LEFT | Gravity.BOTTOM,//6
            Gravity.CENTER | Gravity.BOTTOM//7
    };
    public final int[] keys = {//same order as Main_initClickDoc /smartTwitchTV/app/specific/Main.js
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

    public final int[] keysAction = {
            KeyEvent.ACTION_DOWN,//0
            KeyEvent.ACTION_UP//1
    };

    public final int[] idsurface = {
            R.id.player_view,//0
            R.id.player_view2,//1
            R.id.player_view3,//2
            R.id.player_view4,//3
            R.id.player_view_e//4
    };

    public final int[] idtexture = {
            R.id.player_view_texture_view,//0
            R.id.player_view2_texture_view,//1
            R.id.player_view3_texture_view,//2
            R.id.player_view4_texture_view,//3
            R.id.player_view_e_texture_view//4
    };
    public int[] BUFFER_SIZE = {4000, 4000, 4000, 4000};//Default, live, vod, clips
    public String[] BLACKLISTEDCODECS = null;
    public int DefaultPositions = 0;
    public PlayerView[] PlayerView = new PlayerView[PlayerAcountPlus];
    public SimpleExoPlayer[] player = new SimpleExoPlayer[PlayerAcountPlus];
    public DataSource.Factory dataSourceFactory;
    public DefaultRenderersFactory renderersFactory;
    public DefaultTrackSelector[] trackSelector = new DefaultTrackSelector[PlayerAcountPlus];
    public DefaultTrackSelector.Parameters trackSelectorParameters;
    public DefaultTrackSelector.Parameters trackSelectorParametersSmall;
    public DefaultTrackSelector.Parameters trackSelectorParametersExtraSmall;
    public int mainPlayerBandwidth = Integer.MAX_VALUE;
    public int smallPlayerBandwidth = 3000000;
    public int smallExtraPlayerBandwidth = 4000000;
    public long mResumePosition;
    public int mwhocall = 1;
    //The mediaSources stored to be used when changing from auto to source 720 etc etc
    public MediaSource[] mediaSourcesAuto = new MediaSource[PlayerAcountPlus];
    public long[] expires = new long[PlayerAcountPlus];
    //The mediaSources that the player usesreceives mediaSourcesAuto or null if null we know that we aren't in auto mode
    public MediaSource[] mediaSourcePlaying = new MediaSource[PlayerAcountPlus];
    public WebView mwebview;
    public boolean PicturePicture;
    public boolean deviceIsTV;
    public boolean MultiStream;
    public boolean isSizechat;
    public int heightDefault = 0;
    public int mwidthDefault = 0;
    public int heightChat = 0;
    public int mwidthChat = 0;
    public int mainPlayer = 0;
    public int playerDivider = 3;
    public int AudioSource = 1;
    public int AudioMulti = 0;//window 0
    public Handler myHandler;
    public Handler[] PlayerCheckHandler = new Handler[PlayerAcountPlus];
    public int[] PlayerCheckCounter = new int[PlayerAcountPlus];
    public int[] droppedFrames = new int[2];
    public long[] conSpeed = new long[2];
    public long[] netActivity = new long[2];
    public long droppedFramesTotal = 0L;
    public int deviceRam = 0;
    public float conSpeedAVG = 0f;
    public float netActivityAVG = 0f;
    public long netcounter = 0L;
    public long speedcounter = 0L;
    public boolean IsIN5050 = false;
    public boolean mLowLatency = false;
    public boolean UsefullBandwidth = false;
    private LoadControl[] loadControl = new LoadControl[PlayerAcountPlus];
    private Uri uri;
    private FrameLayout.LayoutParams DefaultSizeFrame;
    private FrameLayout.LayoutParams PlayerViewDefaultSize;
    private FrameLayout.LayoutParams PlayerViewDefaultSizeChat;
    private FrameLayout.LayoutParams PlayerViewSmallSize;
    private FrameLayout.LayoutParams PlayerViewDefaultSizePP;
    private FrameLayout.LayoutParams PlayerViewDefaultSizeChatPP;
    private FrameLayout.LayoutParams[] PlayerViewExtraLayout = new FrameLayout.LayoutParams[6];
    private FrameLayout VideoHolder;
    private boolean onCreateReady;
    private boolean IsonStop;
    private ProgressBar[] loadingView = new ProgressBar[PlayerAcount + 3];
    private boolean alredystarted;
    private boolean shouldCallJavaCheck;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //On create is called onResume so prevent it if already set
        if (!onCreateReady) {
            IsonStop = false;
            onCreateReady = true;
            setContentView(R.layout.activity_player);

            deviceIsTV = Tools.deviceIsTV(this);

            myHandler = new Handler(Looper.getMainLooper());

            for (int i = 0; i < (PlayerAcountPlus); i++) {
                PlayerCheckHandler[i] = new Handler(Looper.getMainLooper());
            }

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

            trackSelectorParametersExtraSmall = trackSelectorParameters
                    .buildUpon()
                    .setMaxVideoBitrate(smallExtraPlayerBandwidth)
                    .build();

            SetDefaultSizeFrame();

            VideoHolder = findViewById(R.id.videoholder);

            loadingView[5] = findViewById(R.id.loading);
            loadingView[5].setLayoutParams(DefaultSizeFrame);

            setPlayer(true);

            shouldCallJavaCheck = false;

            deviceRam = Tools.deviceRam(this);
            //Ram too big.bigger then max int value... use 1000MB
            if (deviceRam < 0) deviceRam = 1000000000;

            initializeWebview();
        }
    }

    private void SetDefaultSizeFrame() {
        Display display = getWindowManager().getDefaultDisplay();
        float density = this.getResources().getDisplayMetrics().density;
        Point size = new Point();
        display.getSize(size);

        float Scale = (float) size.y / 1080.0f;
        float Scaledensity = density / 2.0f;

        int DefaultSize = Math.round(40 * density * Scale / Scaledensity);
        DefaultSizeFrame = new FrameLayout.LayoutParams(DefaultSize, DefaultSize, Gravity.CENTER);

        loadingView[6] = findViewById(R.id.loading2);
        FrameLayout.LayoutParams defaultSizeFrameBottom = (FrameLayout.LayoutParams) loadingView[6].getLayoutParams();
        defaultSizeFrameBottom.width = DefaultSize;
        defaultSizeFrameBottom.height = DefaultSize;
        defaultSizeFrameBottom.bottomMargin = (int) (size.x / 40 * density / Scaledensity);
        loadingView[6].setLayoutParams(defaultSizeFrameBottom);
    }

    public void setPlayer(boolean surface_view) {
        //Some old devices (old OS N or older) is need to use texture_view to have a proper working PP mode
        if (surface_view) {
            for (int i = 0; i < PlayerAcountPlus; i++) {
                PlayerView[i] = findViewById(idtexture[i]);
                PlayerView[i].setVisibility(View.GONE);
                PlayerView[i] = findViewById(idsurface[i]);
            }

            PlayerView[0].setVisibility(View.VISIBLE);
            for (int i = 1; i < PlayerAcountPlus; i++) {
                PlayerView[i].setVisibility(View.GONE);
            }
        } else {

            for (int i = 0; i < PlayerAcountPlus; i++) {
                PlayerView[i] = findViewById(idsurface[i]);
                PlayerView[i].setVisibility(View.GONE);
                PlayerView[i] = findViewById(idtexture[i]);
            }

            PlayerView[0].setVisibility(View.VISIBLE);
            for (int i = 1; i < PlayerAcountPlus; i++) {
                PlayerView[i].setVisibility(View.GONE);
            }
        }

        for (int i = 0; i < PlayerAcountPlus; i++) {
            loadingView[i] = PlayerView[i].findViewById(R.id.exo_buffering);
            loadingView[i].setIndeterminateTintList(ColorStateList.valueOf(Color.WHITE));
            loadingView[i].setBackgroundResource(R.drawable.shadow);
            loadingView[i].setLayoutParams(DefaultSizeFrame);
        }
    }

    // The main player initialization function
    private void initializePlayer(int position) {
        if (IsonStop) {
            monStop();
            return;
        }
        PlayerCheckHandler[position].removeCallbacksAndMessages(null);

        boolean isSmall = (mainPlayer != position);

        //Show main loading if this call is in the main player as this is needed fro when we are fast/back forwarding
        //On small player it will show its own loading
        if (!isSmall && !IsIN5050) showLoading();

        if (PlayerView[position].getVisibility() != View.VISIBLE)
            PlayerView[position].setVisibility(View.VISIBLE);

        if (player[position] == null) {
            trackSelector[position] = new DefaultTrackSelector(this);
            trackSelector[position].setParameters(isSmall ? trackSelectorParametersSmall : trackSelectorParameters);

            if (BLACKLISTEDCODECS != null) {
                renderersFactory = new DefaultRenderersFactory(this);
                renderersFactory.setMediaCodecSelector(new BlackListMediaCodecSelector(BLACKLISTEDCODECS));

                player[position] = new SimpleExoPlayer.Builder(this, renderersFactory)
                        .setTrackSelector(trackSelector[position])
                        .setLoadControl(loadControl[mwhocall])
                        .build();
            } else {
                player[position] = new SimpleExoPlayer.Builder(this)
                        .setTrackSelector(trackSelector[position])
                        .setLoadControl(loadControl[mwhocall])
                        .build();
            }

            player[position].addListener(new PlayerEventListener(position));
            player[position].addAnalyticsListener(new AnalyticsEventListener(position));

            PlayerView[position].setPlayer(player[position]);
        }

        player[position].setMediaSource(
                mediaSourcePlaying[position] != null ?
                        mediaSourcePlaying[position] :
                        Tools.buildMediaSource(uri, dataSourceFactory, mwhocall, mLowLatency),
                ((mResumePosition > 0) && (mwhocall > 1)) ? mResumePosition : C.TIME_UNSET);

        player[position].prepare();

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

    private void initializeSmallPlayer(MediaSource mediaSource) {
        if (IsonStop) {
            monStop();
            return;
        }
        PlayerCheckHandler[4].removeCallbacksAndMessages(null);

        if (PlayerView[4].getVisibility() != View.VISIBLE)
            PlayerView[4].setVisibility(View.VISIBLE);

        if (player[4] == null) {
            trackSelector[4] = new DefaultTrackSelector(this);
            trackSelector[4].setParameters(
                    UsefullBandwidth ?
                    trackSelectorParameters :
                    (smallPlayerBandwidth < smallExtraPlayerBandwidth ?
                    trackSelectorParametersSmall : 
                    trackSelectorParametersExtraSmall)
            );

            if (BLACKLISTEDCODECS != null) {
                renderersFactory = new DefaultRenderersFactory(this);
                renderersFactory.setMediaCodecSelector(new BlackListMediaCodecSelector(BLACKLISTEDCODECS));

                player[4] = new SimpleExoPlayer.Builder(this, renderersFactory)
                        .setTrackSelector(trackSelector[4])
                        .setLoadControl(loadControl[mwhocall])
                        .build();
            } else {
                player[4] = new SimpleExoPlayer.Builder(this)
                        .setTrackSelector(trackSelector[4])
                        .setLoadControl(loadControl[mwhocall])
                        .build();
            }

            player[4].addListener(new PlayerEventListenerSmall());

            PlayerView[4].setPlayer(player[4]);
        }

        mediaSourcePlaying[4] = mediaSource;
        player[4].setMediaSource(
                mediaSourcePlaying[4],
                C.TIME_UNSET);

        player[4].prepare();
        player[4].setPlayWhenReady(true);

        KeepScreenOn(true);
        shouldCallJavaCheck = true;
    }

    private void ClearSmallPlayer() {
        PlayerCheckHandler[4].removeCallbacksAndMessages(null);
        PlayerView[4].setVisibility(View.GONE);

        if (player[4] != null) {
            player[4].setPlayWhenReady(false);
            releasePlayer(4);
        }

        PlayerCheckCounter[4] = 0;
        shouldCallJavaCheck = false;
        UsefullBandwidth = false;
    }

    private void initializePlayerMulti(int position, MediaSource mediaSource) {
        if (IsonStop) {
            monStop();
            return;
        }

        mediaSourcePlaying[position] = mediaSource;
        PlayerCheckHandler[position].removeCallbacksAndMessages(null);

        if (PlayerView[position].getVisibility() != View.VISIBLE)
            PlayerView[position].setVisibility(View.VISIBLE);

        if (player[position] == null) {
            trackSelector[position] = new DefaultTrackSelector(this);
            trackSelector[position].setParameters(trackSelectorParametersSmall);

            if (BLACKLISTEDCODECS != null) {
                renderersFactory = new DefaultRenderersFactory(this);
                renderersFactory.setMediaCodecSelector(new BlackListMediaCodecSelector(BLACKLISTEDCODECS));

                player[position] = new SimpleExoPlayer.Builder(this, renderersFactory)
                        .setTrackSelector(trackSelector[position])
                        .setLoadControl(loadControl[mwhocall])
                        .build();
            } else {
                player[position] = new SimpleExoPlayer.Builder(this)
                        .setTrackSelector(trackSelector[position])
                        .setLoadControl(loadControl[mwhocall])
                        .build();
            }

            player[position].addListener(new PlayerEventListener(position));

            player[position].addAnalyticsListener(
                    (position < 2) ? new AnalyticsEventListener(position) :
                            new AnalyticsEventListenerMulti()
            );

            PlayerView[position].setPlayer(player[position]);
        }

        player[position].setMediaSource(
                mediaSourcePlaying[position],
                C.TIME_UNSET
        );

        player[position].prepare();

        player[position].setPlayWhenReady(true);

        if (AudioMulti == 4 || AudioMulti == position) player[position].setVolume(1f);
        else player[position].setVolume(0f);

        KeepScreenOn(true);
    }

    private void ClearPlayer(int position) {
        PlayerCheckHandler[position].removeCallbacksAndMessages(null);
        PlayerView[position].setVisibility(View.GONE);

        if (player[position] != null) {
            player[position].setPlayWhenReady(false);
            releasePlayer(position);
        }

        PlayerCheckCounter[position] = 0;

        if (mainPlayer != position && !MultiStream) SwitchPlayerAudio(1);
        else if (AudioMulti != 4 && AudioMulti == position) {
            for (int i = 0; i < PlayerAcount; i++) {
                if (i != position && player[i] != null) {
                    AudioMulti = i;
                    player[i].setVolume(1f);
                    break;
                }
            }
        }

        //All players are close enable screen saver
        if (player[0] == null && player[1] == null && player[2] == null && player[3] == null)
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

        for (int i = 0; i < (PlayerAcountPlus); i++) {
            PlayerCheckHandler[i].removeCallbacksAndMessages(null);
            mediaSourcePlaying[i] = null;
            mediaSourcesAuto[i] = null;
        }

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

            if (position < 2) {//Only player 0 & 1 acount for this
                droppedFrames[position] = 0;
                netActivity[position] = 0L;
            }
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

        //Player extra positions
        Display display = getWindowManager().getDefaultDisplay();
        float density = this.getResources().getDisplayMetrics().density;
        Point size = new Point();
        display.getSize(size);
        float Scaledensity = density / 2.0f;
        int margin = (int) (size.y / 6.7 * density / Scaledensity);
        int Extrawidth = (int) (mwidthDefault / 3.77);
        int Extraheight = (int) (heightDefault / 3.77);

        PlayerViewExtraLayout[0] = new FrameLayout.LayoutParams(Extrawidth, Extraheight, Gravity.LEFT | Gravity.BOTTOM);
        PlayerViewExtraLayout[1] = new FrameLayout.LayoutParams(Extrawidth, Extraheight, Gravity.LEFT | Gravity.BOTTOM);
        PlayerViewExtraLayout[2] = new FrameLayout.LayoutParams(Extrawidth, Extraheight, Gravity.CENTER | Gravity.BOTTOM);
        PlayerViewExtraLayout[3] = new FrameLayout.LayoutParams(Extrawidth, Extraheight, Gravity.RIGHT | Gravity.BOTTOM);
        PlayerViewExtraLayout[4] = new FrameLayout.LayoutParams(Extrawidth, Extraheight, Gravity.RIGHT | Gravity.BOTTOM);
        PlayerViewExtraLayout[5] = new FrameLayout.LayoutParams((int) (mwidthDefault / 1.33),(int) (heightDefault / 1.33), Gravity.RIGHT | Gravity.BOTTOM);

        for (int i = 0; i < 5; i++) {
            PlayerViewExtraLayout[i].bottomMargin = (int) (size.x / 22 * density / Scaledensity);
        }

        PlayerViewExtraLayout[5].bottomMargin = (int) (size.x / 16 * density / Scaledensity);
        PlayerViewExtraLayout[1].leftMargin = margin;
        PlayerViewExtraLayout[3].rightMargin = margin;

        PlayerView[4].setLayoutParams(PlayerViewExtraLayout[0]);
    }

    //Used in side-by-side mode chat plus video
    private void updateVidesizeChat(boolean sizechat) {
        isSizechat = sizechat;
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
        if (pos >= 2) {//both
            AudioMulti = 4;
            SetAudio(0, 1f);
            SetAudio(1, 1f);
        } else if (pos == 1) {//Main
            AudioMulti = 0;
            SetAudio(mainPlayer, 1f);
            SetAudio(mainPlayer ^ 1, 0f);
        } else {//Small
            AudioMulti = 1;
            SetAudio(mainPlayer, 0f);
            SetAudio(mainPlayer ^ 1, 1f);
        }
    }

    public void SetAudio(int pos, float volume) {
        if (player[pos] != null) player[pos].setVolume(volume);
    }

    public void UpdadeSizePosSmall(int pos) {
        PlayerViewSmallSize = new FrameLayout.LayoutParams((mwidthDefault / playerDivider), (heightDefault / playerDivider), positions[DefaultPositions]);
        PlayerView[pos].setLayoutParams(PlayerViewSmallSize);
    }

    public void SetPlayerAudioMulti() {
        for (int i = 0; i < PlayerAcount; i++) {
            if (player[i] != null) {
                if (AudioMulti == 4 || AudioMulti == i) player[i].setVolume(1f);
                else player[i].setVolume(0f);
            }
        }
    }

    public void SetMultiStream() {
        FrameLayout.LayoutParams PlayerViewSizePos = new FrameLayout.LayoutParams(
                (mwidthDefault / 2),
                (heightDefault / 2),
                positions[4]
        );
        PlayerView[mainPlayer].setLayoutParams(PlayerViewSizePos);

        PlayerViewSizePos = new FrameLayout.LayoutParams(
                (mwidthDefault / 2),
                (heightDefault / 2),
                positions[2]
        );
        PlayerView[mainPlayer ^ 1].setLayoutParams(PlayerViewSizePos);

        PlayerViewSizePos = new FrameLayout.LayoutParams(
                (mwidthDefault / 2),
                (heightDefault / 2),
                positions[6]
        );
        PlayerView[2].setLayoutParams(PlayerViewSizePos);

        PlayerViewSizePos = new FrameLayout.LayoutParams(
                (mwidthDefault / 2),
                (heightDefault / 2),
                positions[0]
        );
        PlayerView[3].setLayoutParams(PlayerViewSizePos);

        if (trackSelector[mainPlayer] != null)
            trackSelector[mainPlayer].setParameters(trackSelectorParametersSmall);
    }

    public void UnSetMultiStream() {
        ClearPlayer(2);
        ClearPlayer(3);

        if (PicturePicture) updateVidesizeChatPP(IsIN5050);
        else {
            updateVidesizeChat(isSizechat);
            PlayerView[mainPlayer ^ 1].setLayoutParams(PlayerViewSmallSize);
        }

        if (!PicturePicture || player[mainPlayer ^ 1] == null || player[mainPlayer] == null) {
            PicturePicture = false;
            ClearPlayer(mainPlayer ^ 1);
            SwitchPlayerAudio(1);
        } else SwitchPlayerAudio(AudioSource);

        PlayerView[2].setVisibility(View.GONE);
        PlayerView[3].setVisibility(View.GONE);
        if (trackSelector[mainPlayer] != null)
            trackSelector[mainPlayer].setParameters(trackSelectorParameters);
    }

    @Override
    public void onResume() {
        super.onResume();
        IsonStop = false;
        //The app was close but shouldCallJavaCheck is true that means the TV enter standby so call java here
        if (player[mainPlayer] == null && shouldCallJavaCheck && mwebview != null && alredystarted) {
            mwebview.loadUrl("javascript:smartTwitchTV.Play_CheckResume()");
        }
        alredystarted = true;
    }

    //This function is called when home key is pressed
    @Override
    public void onStop() {
        super.onStop();
        monStop();
    }

    private void monStop() {
        IsonStop = true;
        int temp_AudioMulti = AudioMulti;

        for (int i = 0; i < (PlayerAcountPlus); i++) {
            PlayerCheckHandler[i].removeCallbacksAndMessages(null);
            updateResumePosition(i);
            ClearPlayer(i);
        }

        //Kill playclip if playing or if on end dialog
        if (player[mainPlayer] != null && mwebview != null && alredystarted && mwhocall == 3) {
            mwebview.loadUrl("javascript:smartTwitchTV.Play_CheckResume()");
        }
        //ClearPlayer will reset audio position
        AudioMulti = temp_AudioMulti;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        for (int i = 0; i < (PlayerAcountPlus); i++) {
            ClearPlayer(i);
        }
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
        if (keyCode == KeyEvent.KEYCODE_BACK && event.isTracking() && !event.isCanceled()) {
            // if the call key is being released, AND we are tracking
            // it from an initial key down, AND it is not canceled,
            // then handle it.
            mwebview.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_F2));
            mwebview.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_F2));
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
        //Don't allow CORS from js this is neeed for the images redirec to work
        //when CORS affects a link that is needed to load one uses Tools.readUrl
        //websettings.setAllowUniversalAccessFromFileURLs(true);
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

        mwebview.loadUrl(PageUrl);

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
        public String mPageUrl() {
            return PageUrl;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mloadUrl(String url) {
            myHandler.post(() -> mwebview.loadUrl(url));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mshowLoading(boolean show) {
            myHandler.post(() -> {
                if (show) showLoading();
                else hideLoading(5);
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mshowLoadingBotton(boolean show) {
            myHandler.post(() -> {
                if (show) showLoadingBotton();
                else hideLoading(6);
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
        public void mseekTo(long position) {
            myHandler.post(() -> {
                if (player[mainPlayer] != null) {
                    player[mainPlayer].seekTo(position);
                    player[mainPlayer].setPlayWhenReady(true);
                }
            });
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
        public void StartFeedPlayer(String url, int position, boolean fullBandwidth) {
            myHandler.post(() -> {
                UsefullBandwidth = fullBandwidth;
                expires[4] = System.currentTimeMillis() + 18000;
                mediaSourcesAuto[4] = Tools.buildMediaSource(Uri.parse(url), dataSourceFactory, 1, mLowLatency);
                PlayerView[4].setLayoutParams(PlayerViewExtraLayout[position]);
                initializeSmallPlayer(mediaSourcesAuto[4]);
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void SetAutoFeedPlayer(String url) {
            myHandler.post(() -> {
                expires[4] = System.currentTimeMillis() + 18000;
                mediaSourcesAuto[4] = Tools.buildMediaSource(Uri.parse(url), dataSourceFactory, 1, mLowLatency);
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void ClearFeedPlayer() {
            myHandler.post(PlayerActivity.this::ClearSmallPlayer);
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
        public void mSetAudio(int position, float volume) {
            myHandler.post(() -> SetAudio(position, volume));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mSetPlayerAudioMulti(int position) {
            myHandler.post(() -> {
                int mposition = position;
                if (position == 0) mposition = mainPlayer;
                else if (position == 1) mposition = mainPlayer ^ 1;

                AudioMulti = mposition;
                SetPlayerAudioMulti();
            });
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
            return Tools.readUrl(urlString, timeout, HeaderQuantity, access_token);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String mMethodUrl(String urlString, int timeout, int HeaderQuantity, String access_token, String overwriteID, String postMessage, String Method) {
            return Tools.MethodUrl(urlString, timeout, HeaderQuantity, access_token, overwriteID, postMessage, Method);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String getManufacturer() {
            return Build.MANUFACTURER;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String getDevice() {
            return Build.MODEL;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public int getSDK() {
            return Build.VERSION.SDK_INT;
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
                for (int i = 0; i < PlayerAcount; i++) {
                    if (player[i] != null) player[i].setPlayWhenReady(play);
                }
                KeepScreenOn(play);
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public boolean getPlaybackState() {
            HVTHandler.RunnableResult<Boolean> result = HVTHandler.post(myHandler, new HVTHandler.RunnableValue<Boolean>() {
                @Override
                public void run() {
                    if (player[mainPlayer] != null) value = player[mainPlayer].isPlaying();
                    else value = false;
                }
            });
            return result.get();
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void setPlaybackSpeed(float speed) {
            myHandler.post(() -> {
                if (MultiStream) {
                    for (int i = 0; i < PlayerAcount; i++) {
                        if (player[i] != null)
                            player[i].setPlaybackParameters(new PlaybackParameters(speed));
                    }
                } else if (player[mainPlayer] != null)
                    player[mainPlayer].setPlaybackParameters(new PlaybackParameters(speed));
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void SetBuffer(int whocall, int value) {
            BUFFER_SIZE[whocall] = Math.min(value, 15000);
            loadControl[whocall] = Tools.getLoadControl(BUFFER_SIZE[whocall], deviceRam);
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
                        value += String.format(Locale.US, "%d", player[mainPlayer].getTotalBufferedDuration()) + "," +
                                String.format(Locale.US, "%d", player[mainPlayer].getCurrentLiveOffset());
                    else value += "0,0";
                }
            });
            return result.get();
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public boolean deviceIsTV() {
            return deviceIsTV;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void keyEvent(int key, int keyaction) {
            myHandler.post(() -> mwebview.dispatchKeyEvent(new KeyEvent(keysAction[keyaction], keys[key])));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String getcodecCapabilities(String CodecType) {
            return Tools.codecCapabilities(CodecType);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void setBlackListMediaCodec(String CodecType) {
            BLACKLISTEDCODECS = !CodecType.isEmpty() ? CodecType.split(",") : null;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void msetPlayer(boolean surface_view, boolean sizechat) {
            myHandler.post(() -> {
                setPlayer(surface_view);

                if (sizechat) updateVidesizeChatPP(false);
                else updateVidesizeChat(true);

                UpdadeSizePosSmall(mainPlayer ^ 1);
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mhideSystemUI() {
            myHandler.post(PlayerActivity.this::hideSystemUI);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void BackupFile(String file, String file_content) {

            if (Tools.WR_storage(mwebContext)) {
                Tools.BackupJson(
                        mwebContext.getPackageName(),
                        file,
                        file_content
                );
            }
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public boolean HasBackupFile(String file) {
            return Tools.HasBackupFile(file, mwebContext);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String RestoreBackupFile(String file) {
            if (Tools.WR_storage(mwebContext)) return Tools.RestoreBackupFile(file, mwebContext);

            return null;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void requestWr() {
            myHandler.post(PlayerActivity.this::check_writeexternalstorage);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public boolean canBackupFile() {
            return Tools.WR_storage(mwebContext);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void EnableMultiStream() {
            myHandler.post(() -> {
                MultiStream = true;
                SetMultiStream();
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void DisableMultiStream() {
            myHandler.post(() -> {
                MultiStream = false;
                UnSetMultiStream();
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void StartMultiStream(int position, String url) {
            myHandler.post(() -> {

                int mposition = position;
                if (position == 0) mposition = mainPlayer;
                else if (position == 1) mposition = mainPlayer ^ 1;

                mediaSourcesAuto[mposition] = Tools.buildMediaSource(Uri.parse(url), dataSourceFactory, 1, mLowLatency);
                initializePlayerMulti(mposition, mediaSourcesAuto[mposition]);
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void SetAutoMulti(int position, String url) {
            //The live token expires in 20 min add a timer to request a refresh in case the js code fail to refresh it
            //For some reason maybe a twitch bug the vod expires in 20 hours not min
            myHandler.post(() -> {

                int mposition = position;
                if (position == 0) mposition = mainPlayer;
                else if (position == 1) mposition = mainPlayer ^ 1;

                expires[mposition] = System.currentTimeMillis() + 18000;
                mediaSourcesAuto[mposition] = Tools.buildMediaSource(Uri.parse(url), dataSourceFactory, 1, mLowLatency);
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String getStreamData(String channel_name_vod_id, boolean islive) {
            try {
                return Tools.getStreamData(channel_name_vod_id, islive);
            } catch (UnsupportedEncodingException e) {
                Log.d(TAG, "getStreamData UnsupportedEncodingException");
                return null;
            }
        }
    }

    // Basic EventListener for exoplayer
    private class PlayerEventListener implements Player.EventListener {

        private int position;
        private int delayms;

        private PlayerEventListener(int mposition) {
            position = mposition;
            delayms = (BUFFER_SIZE[mwhocall] * 2) + 5000 + (MultiStream ? 2000 : 0);
        }

        @Override
        public void onPlaybackStateChanged(@Player.State int playbackState) {
            myHandler.post(() -> {
                if (player[position] == null || !player[position].getPlayWhenReady())
                    return;

                hideLoading(5);
                if (playbackState == Player.STATE_ENDED) {
                    PlayerCheckHandler[position].removeCallbacksAndMessages(null);
                    player[position].setPlayWhenReady(false);

                    PlayerEventListenerClear(position);
                } else if (playbackState == Player.STATE_BUFFERING) {
                    //Use the player buffer as a player check state to prevent be buffering for ever
                    //If buffer for as long as BUFFER_SIZE * 2 do something because player is frozen
                    PlayerCheckHandler[position].removeCallbacksAndMessages(null);
                    PlayerCheckHandler[position].postDelayed(() -> {

                        //Check if Player was released or is on pause
                        if (player[position] != null || player[position].isPlaying())
                            PlayerEventListenerCheckCounter(position, false);

                    }, delayms);
                } else if (playbackState == Player.STATE_READY) {
                    PlayerCheckHandler[position].removeCallbacksAndMessages(null);
                    PlayerCheckCounter[position] = 0;

                    //If other not playing just play it so they stay in sync
                    if (MultiStream) {
                        for (int i = 0; i < PlayerAcount; i++) {
                            if (position != i && player[i] != null) player[i].setPlayWhenReady(true);
                        }
                    } else {
                        int otherplayer = position ^ 1;
                        if (player[otherplayer] != null) {
                            if (!player[otherplayer].isPlaying())
                                player[otherplayer].setPlayWhenReady(true);
                        }
                    }

                    if (mwhocall > 1) {
                        mwebview.loadUrl("javascript:smartTwitchTV.Play_UpdateDuration(" +
                                mwhocall + "," + player[position].getDuration() + ")");
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

    public void PlayerEventListenerCheckCounter(int position, boolean mclearResumePosition) {
        PlayerCheckHandler[position].removeCallbacksAndMessages(null);
        //Pause to things run smother and prevent odd behavior during the checks + start loading to show what is going on
        if (player[position] != null) {
            player[position].setPlayWhenReady(false);
        }

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

                    if (MultiStream) initializePlayerMulti(position, mediaSourcePlaying[position]);
                    else initializePlayer(position);

                } else
                    mwebview.loadUrl("javascript:smartTwitchTV.Play_CheckResumeForced(" + (mainPlayer != position) + ", " + MultiStream + ", " + position + ")");

            } else initializePlayer(position);

        } else if (PlayerCheckCounter[position] > 3) {

            // try == 3 Give up internet is probably down or something related
            PlayerEventListenerClear(position);

        } else if (PlayerCheckCounter[position] > 1) {

            // Second if not in auto mode use js to check if is possible to drop quality
            mwebview.loadUrl("javascript:smartTwitchTV.Play_PlayerCheck(" + mwhocall + ")");

        } else {
            //First try and not auto mode only restart the player
            if (mclearResumePosition || mwhocall == 1) clearResumePosition();
            else updateResumePosition(position);

            initializePlayer(position);
        }
    }

    public void PlayerEventListenerClear(int position) {
        hideLoading(5);
        hideLoading(position);
        if (MultiStream) {
            ClearPlayer(position);
            mwebview.loadUrl("javascript:smartTwitchTV.Play_MultiEnd(" + position + ")");
        } else if (PicturePicture) {
            boolean mswitch = (mainPlayer == position);

            PicturePicture = false;

            if (mswitch) SwitchPlayer();

            ClearPlayer(position);
            AudioSource = 1;

            mwebview.loadUrl("javascript:smartTwitchTV.PlayExtra_End(" + mswitch + ")");

        } else mwebview.loadUrl("javascript:smartTwitchTV.Play_PannelEndStart(" + mwhocall + ")");
    }

    private class PlayerEventListenerSmall implements Player.EventListener {

        @Override
        public void onPlaybackStateChanged(@Player.State int playbackState) {
            myHandler.post(() -> {
                if (player[4] == null || !player[4].getPlayWhenReady())
                    return;

                if (playbackState == Player.STATE_ENDED) {
                    PlayerCheckHandler[4].removeCallbacksAndMessages(null);
                    player[4].setPlayWhenReady(false);

                    ClearSmallPlayer();
                    mwebview.loadUrl("javascript:smartTwitchTV.Play_CheckIfIsLiveClean()");
                } else if (playbackState == Player.STATE_BUFFERING) {
                    //Use the player buffer as a player check state to prevent be buffering for ever
                    //If buffer for as long as BUFFER_SIZE * 2 do something because player is frozen
                    PlayerCheckHandler[4].removeCallbacksAndMessages(null);
                    PlayerCheckHandler[4].postDelayed(() -> {

                        //Check if Player was released or is on pause
                        if (player[4] == null || !player[4].isPlaying())
                            return;

                        PlayerEventListenerCheckCounterSmall();

                    }, (BUFFER_SIZE[mwhocall] * 2) + 5000 + (MultiStream ? 2000 : 0));
                } else if (playbackState == Player.STATE_READY) {
                    PlayerCheckHandler[4].removeCallbacksAndMessages(null);
                    PlayerCheckCounter[4] = 0;
                }
            });
        }

        @Override
        public void onPlayerError(@NonNull ExoPlaybackException e) {
            myHandler.post(() -> {
                PlayerCheckHandler[4].removeCallbacksAndMessages(null);
                PlayerEventListenerCheckCounterSmall();
            });
        }

    }

    public void PlayerEventListenerCheckCounterSmall() {
        PlayerCheckHandler[4].removeCallbacksAndMessages(null);
        //Pause to things run smother and prevent odd behavior during the checks + start loading to show what is going on
        if (player[4] != null) {
            player[4].setPlayWhenReady(false);
        }

        PlayerCheckCounter[4]++;
        if (PlayerCheckCounter[4] < 4 && expires[4] < System.currentTimeMillis())
            initializeSmallPlayer(mediaSourcesAuto[4]);
        else {
            ClearSmallPlayer();
            mwebview.loadUrl("javascript:smartTwitchTV.Play_CheckIfIsLiveClean()");
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

    //Simple AnalyticsListener for multiplayer no need to be account for all the data for all players
    //as the only info show to the user is droppedFramesTotal for all players
    private class AnalyticsEventListenerMulti implements AnalyticsListener {

        @Override
        public final void onDroppedVideoFrames(@NonNull EventTime eventTime, int count, long elapsedMs) {
            droppedFrames[mainPlayer] += count;
            droppedFramesTotal += count;
        }

    }

    @TargetApi(23)
    private void check_writeexternalstorage() {
        if (!Tools.WR_storage(this)) {
            requestPermissions(new String[]{
                            Manifest.permission.WRITE_EXTERNAL_STORAGE
                    },
                    123);
        }
    }
}
