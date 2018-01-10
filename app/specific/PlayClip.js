/*jshint multistr: true */
function PlayClip() {

}
//Variable initialization

PlayClip.PlayerTime = 0;
PlayClip.streamCheck = null;
PlayClip.PlayerCheckCount = 0;
PlayClip.Canjump = false;
PlayClip.Cliplength = 0;
PlayClip.videoHeight = 0;
PlayClip.videoQualities = [];
PlayClip.videoUrl = [];
PlayClip.BaseUrl = '';
PlayClip.qualityUser = null;
PlayClip.qualityIndex = 0;
PlayClip.qualityPlaying = 0;

//Variable initialization end

PlayClip.Start = function() {
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    Play.showBufferDialog();
    $("#stream_info_icon").attr("src", Main.selectedChannelChannelLogo);
    $('#stream_info_name').text(Main.selectedChannel);
    $("#stream_info_title").text(Sclip.title);
    $("#stream_info_game").text(Sclip.createdAt);
    $("#stream_live").text(Sclip.views);
    $("#stream_info_livetime").text(Sclip.Duration);
    document.getElementById("stream_info_currentime").innerHTML = STR_WATCHING + Play.timeS(0);

    document.addEventListener('visibilitychange', PlayClip.Resume, false);
    PlayClip.streamCheck = window.setInterval(PlayClip.PlayerCheck, 500);
    PlayClip.Canjump = false;

    Play.videojs.src({
        type: "video/mp4",
        src: Sclip.playUrl
    });

    Play.videojs.ready(function() {
        this.on('loadedmetadata', function() {
            PlayClip.videoHeight = parseInt(this.videoHeight());
            PlayClip.extractQualities();
        });
    });
};

PlayClip.extractQualities = function() {
    Play.videojs.off('loadedmetadata', null);
    PlayClip.videoQualities = [];
    PlayClip.videoUrl = [];

    PlayClip.BaseUrl = (Sclip.playUrl).slice(0, -4);
    if (PlayClip.BaseUrl.indexOf("vod") === -1) PlayClip.BaseUrl = PlayClip.BaseUrl.replace("tv/", "tv/AT-");

    PlayClip.Cliplength = 0;
    // anything bellow 720 can't be seeing
    // there inst today resolution above 1080 the day there is add more checks. 
    if (PlayClip.videoHeight > 1080) PlayClip.Cliplength = 2;
    else if (PlayClip.videoHeight > 720) PlayClip.Cliplength = 1;

    if (PlayClip.Cliplength > 0) {
        for (var i = 0; i < PlayClip.Cliplength; i++) {
            if (i === 0) {
                PlayClip.videoQualities[i] = '720p';
                PlayClip.videoUrl[i] = PlayClip.BaseUrl + '-1280x720.mp4';
            } else if (i === 1) {
                PlayClip.videoQualities[i] = '1080p';
                PlayClip.videoUrl[i] = PlayClip.BaseUrl + '-1920x1080.mp4';
            }
        }
    }
    PlayClip.videoQualities[PlayClip.Cliplength] = PlayClip.videoHeight + 'p (source)';
    PlayClip.videoUrl[PlayClip.Cliplength] = Sclip.playUrl;

    console.log("PlayClip.videoQualities = " + PlayClip.videoQualities);
    console.log("PlayClip.videoUrl = " + PlayClip.videoUrl);

    PlayClip.qualityIndex = PlayClip.Cliplength;
    if (PlayClip.qualityUser !== null && PlayClip.qualityUser < PlayClip.Cliplength) PlayClip.qualityIndex = PlayClip.qualityUser;

    PlayClip.play();
};

PlayClip.play = function() {
    if (PlayClip.qualityIndex < PlayClip.Cliplength) {
        Play.videojs.src({
            type: "video/mp4",
            src: PlayClip.videoUrl[PlayClip.qualityIndex]
        });
    }

    Play.videojs.ready(function() {
        this.isFullscreen(true);
        this.requestFullscreen();
        this.autoplay(true);

        this.on('ended', function() {
            PlayClip.Exit();
        });

        this.on('timeupdate', function() {
            PlayClip.updateCurrentTime(this.currentTime());
        });

        this.on('error', function() {
            Play.showWarningDialog(STR_IS_OFFLINE);
            window.setTimeout(PlayClip.Exit, 1500);
        });

        this.on('loadedmetadata', function() {
            console.log("videoHeight = " + parseInt(this.videoHeight()));
        });

    });
    PlayClip.qualityPlaying = PlayClip.qualityIndex;
    PlayClip.qualityDisplay();
};

PlayClip.qualityChanged = function() {
    Play.videojs.src({
        type: "video/mp4",
        src: PlayClip.videoUrl[PlayClip.qualityIndex]
    });
};

PlayClip.offPlayer = function() {
    Play.videojs.off('ended', null);
    Play.videojs.off('timeupdate', null);
    Play.videojs.off('error', null);
    Play.videojs.off('loadedmetadata', null);
};

PlayClip.Resume = function() {
    if (document.hidden) {
        PlayClip.Exit();
        PlayClip.offPlayer();
    }
};

PlayClip.PlayerCheck = function() {
    if (PlayClip.PlayerTime == Play.videojs.currentTime() && !Play.videojs.paused()) {
        PlayClip.PlayerCheckCount++;
        Play.showBufferDialog();
        if (PlayClip.PlayerCheckCount > 90) {
            PlayClip.PlayerCheckCount = 0;
            Play.showWarningDialog(STR_PLAYER_PROBLEM);
            window.setTimeout(PlayClip.shutdownStream, 1500);
        }
    }
    if (!Play.videojs.paused()) Play.videojs.play();
    PlayClip.PlayerTime = Play.videojs.currentTime();
};

PlayClip.Exit = function() {
    Play.videojs.pause();
    Play.videojs.autoplay(false);
    Play.videojs.src('app/images/temp.mp4');
    PlayClip.offPlayer();
    document.body.removeEventListener("keydown", PlayClip.handleKeyDown);
    document.removeEventListener('visibilitychange', PlayClip.Resume);
    window.clearInterval(PlayClip.streamCheck);
    PlayClip.hidePanel();
    $("#play_dialog_simple_pause").hide();
    $("#play_dialog_exit").hide();
    Play.HideWarningDialog();
    $("#scene1").show();
    $("#scene2").hide();
    Main.ReStartScreens();
};

PlayClip.updateCurrentTime = function(currentTime) {
    if (Play.WarningDialogVisible()) Play.HideWarningDialog();
    if (Play.BufferDialogVisible()) Play.HideBufferDialog();
    PlayClip.PlayerCheckCount = 0;
    PlayClip.Canjump = true;

    document.getElementById("stream_info_currentime").innerHTML = STR_WATCHING + Play.timeS(currentTime);
};

PlayClip.hidePanel = function() {
    PlayClip.clearHidePanel();
    $("#scene_channel_panel").hide();
};

PlayClip.showPanel = function() {
    Play.clock();
    PlayClip.qualityIndex = PlayClip.qualityPlaying;
    PlayClip.qualityDisplay();
    $("#scene_channel_panel").show();
    PlayClip.setHidePanel();
};

PlayClip.clearHidePanel = function() {
    window.clearTimeout(PlayClip.PanelHideID);
};

PlayClip.setHidePanel = function() {
    PlayClip.PanelHideID = window.setTimeout(PlayClip.hidePanel, 5000); // time in ms
};

PlayClip.qualityDisplay = function() {
    if (PlayClip.qualityIndex === 0) {
        $('#quality_arrow_up').css({
            'opacity': 1.0
        });
        $('#quality_arrow_down').css({
            'opacity': 0.2
        });
    } else if (PlayClip.qualityIndex === PlayClip.Cliplength) {
        $('#quality_arrow_up').css({
            'opacity': 0.2
        });
        $('#quality_arrow_down').css({
            'opacity': 1.0
        });
    } else {
        $('#quality_arrow_up').css({
            'opacity': 1.0
        });
        $('#quality_arrow_down').css({
            'opacity': 1.0
        });
    }

    $('#quality_name').text(PlayClip.videoQualities[PlayClip.qualityIndex]);
};

PlayClip.handleKeyDown = function(e) {
    switch (e.keyCode) {
        case TvKeyCode.KEY_LEFT:
            if (PlayClip.Canjump)
                Play.videojs.currentTime(Play.videojs.currentTime() - 5);
            break;
        case TvKeyCode.KEY_RIGHT:
            if (PlayClip.Canjump)
                Play.videojs.currentTime(Play.videojs.currentTime() + 5);
            break;
        case TvKeyCode.KEY_UP:
            if (Play.isPanelShown()) {
                if (PlayClip.qualityIndex < PlayClip.Cliplength) {
                    PlayClip.qualityIndex++;
                    PlayClip.qualityDisplay();
                }
                PlayClip.clearHidePanel();
                PlayClip.setHidePanel();
            } else {
                PlayClip.showPanel();
            }
            break;
        case TvKeyCode.KEY_DOWN:
            if (Play.isPanelShown()) {
                if (PlayClip.qualityIndex > 0) {
                    PlayClip.qualityIndex--;
                    PlayClip.qualityDisplay();
                }
                PlayClip.clearHidePanel();
                PlayClip.setHidePanel();
            } else {
                PlayClip.showPanel();
            }
            break;
        case TvKeyCode.KEY_ENTER:
            if (!Play.isPanelShown()) {
                PlayClip.showPanel();
            } else {
                PlayClip.qualityUser = (PlayClip.qualityIndex === PlayClip.Cliplength ? null : PlayClip.qualityIndex);
                PlayClip.qualityPlaying = PlayClip.qualityIndex;
                PlayClip.qualityChanged();
                Play.clearPause();
            }
            break;
        case TvKeyCode.KEY_RETURN:
            if (Play.isPanelShown()) {
                PlayClip.hidePanel();
            } else {
                if (Play.ExitDialogVisible()) {
                    window.clearTimeout(Play.exitID);
                    $("#play_dialog_exit").hide();
                    window.setTimeout(PlayClip.Exit, 10);
                } else {
                    Play.showExitDialog();
                }
            }
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
            if (!Play.videojs.paused()) {
                Play.showPauseDialog();
                Play.videojs.pause();
                webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
            } else {
                Play.videojs.play();
                Play.clearPause();
                webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
        case TvKeyCode.KEY_CHANNELUP:
        case TvKeyCode.KEY_CHANNELDOWN:
        case TvKeyCode.KEY_VOLUMEUP:
        case TvKeyCode.KEY_VOLUMEDOWN:
        case TvKeyCode.KEY_MUTE:
        case TvKeyCode.KEY_RED:
        case TvKeyCode.KEY_GREEN:
        case TvKeyCode.KEY_YELLOW:
        case TvKeyCode.KEY_BLUE:
            break;
        default:
            break;
    }
};
