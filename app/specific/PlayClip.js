/*jshint multistr: true */
function PlayClip() {

}
//Variable initialization
PlayClip.exitID = '';
PlayClip.pauseEndID = '';
PlayClip.pauseStartID = '';
Sclip.playUrl = '';

PlayClip.PlayerTime = 0;
PlayClip.streamCheck = null;
PlayClip.PlayerCheckCount = 0;
PlayClip.Canjump = false;

//Variable initialization end

PlayClip.PreStart = function() {
    PlayClip.videojs = videojs('video_clip');
    $("#play_clip_dialog_exit_text").text(STR_EXIT);
    document.getElementById("dialog_buffer_play_clip_text").innerHTML = STR_BUFFERING +
        '<div style="height: 45px; vertical-align: middle; display: inline-block;"><i class="fa fa-spinner fa-spin"></i></div>';
};

PlayClip.Start = function() {
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    $("#dialog_buffer_play_clip").show();
    $("#scene3_quality").hide();
    $("#stream_clip_info_icon").attr("src", Main.selectedChannelChannelLogo);
    $('#stream_clip_info_name').text(Main.selectedChannel);
    $("#stream_clip_info_title").text(Sclip.title);
    $("#stream_clip_info_game").text(Sclip.createdAt);
    $("#stream_clip_live").text(Sclip.views);
    $("#stream_clip_info_livetime").text(Sclip.Duration);
    document.getElementById("stream_clip_info_currentime").innerHTML = STR_WATCHING + PlayClip.timeS(0);

    document.addEventListener('visibilitychange', PlayClip.Resume, false);
    PlayClip.streamCheck = window.setInterval(PlayClip.PlayerCheck, 500);
    PlayClip.Canjump = false;

    PlayClip.videojs.src({
        type: "video/mp4",
        src: Sclip.playUrl
    });

    PlayClip.videojs.ready(function() {
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
            PlayClip.showWarningDialog(STR_IS_OFFLINE + STR_IS_OFFLINE_P_E);
            window.setTimeout(PlayClip.Exit, 1500);
        });

        this.on('playing', function() {
            PlayClip.Canjump = true;
        });

    });
};

PlayClip.offPlayer = function() {
    PlayClip.videojs.off('ended', null);
    PlayClip.videojs.off('timeupdate', null);
    PlayClip.videojs.off('error', null);
    PlayClip.videojs.off('playing', null);
};

PlayClip.Resume = function() {
    if (document.hidden) {
        PlayClip.Exit();
        PlayClip.offPlayer();
    }
};

PlayClip.PlayerCheck = function() {
    if (PlayClip.PlayerTime == PlayClip.videojs.currentTime() && !PlayClip.videojs.paused()) {
        PlayClip.PlayerCheckCount++;
        $("#dialog_buffer_play_clip").show();
        if (PlayClip.PlayerCheckCount > 90) {
            PlayClip.PlayerCheckCount = 0;
            PlayClip.showWarningDialog(STR_PLAYER_PROBLEM);
            window.setTimeout(PlayClip.shutdownStream, 1500);
        }
    }
    if (!PlayClip.videojs.paused()) PlayClip.videojs.play();
    PlayClip.PlayerTime = PlayClip.videojs.currentTime();
};

PlayClip.Exit = function() {
    PlayClip.videojs.pause();
    PlayClip.videojs.autoplay(false);
    PlayClip.videojs.src('app/images/temp.mp4');
    PlayClip.offPlayer();
    document.body.removeEventListener("keydown", PlayClip.handleKeyDown);
    document.removeEventListener('visibilitychange', PlayClip.Resume);
    window.clearInterval(PlayClip.streamCheck);
    PlayClip.hidePanel();
    $("#play_clip_dialog_simple_pause").hide();
    $("#play_clip_dialog_exit").hide();
    PlayClip.HideWarningDialog();
    $("#scene1").show();
    $("#scene3").hide();
    Main.ReStartScreens();
};

PlayClip.updateCurrentTime = function(currentTime) {
    if (PlayClip.WarningDialogVisible()) PlayClip.HideWarningDialog();
    if ($("#dialog_buffer_play_clip").is(":visible")) $("#dialog_buffer_play_clip").hide();
    PlayClip.PlayerCheckCount = 0;

    document.getElementById("stream_clip_info_currentime").innerHTML = STR_WATCHING + PlayClip.timeS(currentTime);
};

PlayClip.lessthanten = function(time) {
    return (time < 10) ? "0" + time : time;
};

PlayClip.timeS = function(time) {
    var seconds, minutes, hours;

    seconds = PlayClip.lessthanten(parseInt(time) % 60);

    time = Math.floor(time / 60);
    minutes = PlayClip.lessthanten(time % 60);

    time = Math.floor(time / 60);
    hours = PlayClip.lessthanten(time);

    //final time 00:00 or 00:00:00
    return (time === 0) ? (minutes + ":" + seconds) : (hours + ":" + minutes + ":" + seconds);
};

PlayClip.timeMs = function(time) {
    var seconds, minutes, hours;

    time = Math.floor(time / 1000);
    seconds = PlayClip.lessthanten(time % 60);

    time = Math.floor(time / 60);
    minutes = PlayClip.lessthanten(time % 60);

    time = Math.floor(time / 60);
    hours = PlayClip.lessthanten(time);

    //final time 00:00 or 00:00:00
    return (time === 0) ? (minutes + ":" + seconds) : (hours + ":" + minutes + ":" + seconds);
};

PlayClip.showWarningDialog = function(text) {
    $("#dialog_buffer_play_clip").hide()
    $("#dialog_warning_play_clip_text").text(text);
    $("#play_clip_dialog_warning_play").show();
};

PlayClip.HideWarningDialog = function() {
    $("#dialog_warning_play_clip_text").text('');
    $("#play_clip_dialog_warning_play").hide();
};

PlayClip.WarningDialogVisible = function() {
    return $("#play_clip_dialog_warning_play").is(":visible");
};

PlayClip.showExitDialog = function() {
    if (!PlayClip.ExitDialogVisible()) {
        $("#play_clip_dialog_exit").show();
        PlayClip.exitID = window.setTimeout(PlayClip.showExitDialog, 3000);
    } else {
        $("#play_clip_dialog_exit").hide();
    }
};

PlayClip.ExitDialogVisible = function() {
    return $("#play_clip_dialog_exit").is(":visible");
};

PlayClip.clearPause = function() {
    window.clearTimeout(PlayClip.pauseEndID);
    window.clearTimeout(PlayClip.pauseStartID);
    if (PlayClip.isShowPauseDialogOn()) {
        $("#play_clip_dialog_simple_pause").hide();
    }
    if (PlayClip.isPanelShown()) {
        PlayClip.hidePanel();
    }
};

PlayClip.showPauseDialog = function() {
    if (!PlayClip.isShowPauseDialogOn()) {
        $("#play_clip_dialog_simple_pause").show();
        PlayClip.pauseEndID = window.setTimeout(PlayClip.showPauseDialog, 1500);
    } else {
        $("#play_clip_dialog_simple_pause").hide();
        PlayClip.pauseStartID = window.setTimeout(PlayClip.showPauseDialog, 8000); // time in ms
    }
};

PlayClip.isShowPauseDialogOn = function() {
    return $("#play_clip_dialog_simple_pause").is(":visible");
};

PlayClip.isPanelShown = function() {
    return $("#scene3_channel_panel").is(":visible");
};

PlayClip.hidePanel = function() {
    PlayClip.clearHidePanel();
    $("#scene3_channel_panel").hide();
    PlayClip.quality = PlayClip.qualityPlaying;
};

PlayClip.showPanel = function() {
    PlayVod.clock();
    $("#scene3_quality").hide();
    $("#scene3_channel_panel").show();
    PlayClip.setHidePanel();
};

PlayClip.clearHidePanel = function() {
    window.clearTimeout(PlayClip.PanelHideID);
};

PlayClip.setHidePanel = function() {
    PlayClip.PanelHideID = window.setTimeout(PlayClip.hidePanel, 5000); // time in ms
};

PlayClip.handleKeyDown = function(e) {
    switch (e.keyCode) {
        case TvKeyCode.KEY_LEFT:
            if (PlayClip.Canjump)
                PlayClip.videojs.currentTime(PlayClip.videojs.currentTime() - 5);
            break;
        case TvKeyCode.KEY_RIGHT:
            if (PlayClip.Canjump)
                PlayClip.videojs.currentTime(PlayClip.videojs.currentTime() + 5);
            break;
        case TvKeyCode.KEY_UP:
            if (!PlayClip.isPanelShown()) {
                PlayClip.showPanel();
            }
            break;
        case TvKeyCode.KEY_DOWN:
            if (!PlayClip.isPanelShown()) {
                PlayClip.showPanel();
            }
            break;
        case TvKeyCode.KEY_ENTER:
            if (!PlayClip.isPanelShown()) {
                PlayClip.showPanel();
            }
            break;
        case TvKeyCode.KEY_RETURN:
            if (PlayClip.isPanelShown()) {
                PlayClip.hidePanel();
            } else {
                if (PlayClip.ExitDialogVisible()) {
                    window.clearTimeout(PlayClip.exitID);
                    $("#play_clip_dialog_exit").hide();
                    window.setTimeout(PlayClip.Exit, 10);
                } else {
                    PlayClip.showExitDialog();
                }
            }
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
            if (!PlayClip.videojs.paused()) {
                PlayClip.showPauseDialog();
                PlayClip.videojs.pause();
                webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
            } else {
                PlayClip.videojs.play();
                PlayClip.clearPause();
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
