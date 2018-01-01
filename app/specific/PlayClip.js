/*jshint multistr: true */
function PlayClip() {

}
//Variable initialization
PlayClip.exitID = '';
PlayClip.pauseEndID = '';
PlayClip.pauseStartID = '';
Sclip.playUrl = '';

//Variable initialization end

PlayClip.PreStart = function() {
    PlayClip.Player = videojs('video_clip');
    $("#play_clip_dialog_exit_text").text(STR_EXIT);
};

PlayClip.Start = function() {
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    $("#scene3_quality").hide();
    $("#stream_clip_info_icon").attr("src", Main.selectedChannelChannelLogo);
    $('#stream_clip_info_name').text(Main.selectedChannel);
    $("#stream_clip_info_title").text(Sclip.title);
    $("#stream_clip_info_game").text(Sclip.createdAt);
    $("#stream_clip_live").text(Sclip.views);
    $("#stream_clip_info_livetime").text(Sclip.Duration);

    document.addEventListener('visibilitychange', PlayClip.Resume, false);

    PlayClip.Player.src({
        type: "video/mp4",
        src: Sclip.playUrl
    });

    PlayClip.Player.ready(function() {
        this.isFullscreen(true);
        this.requestFullscreen();
        this.play();

        this.on('ended', function() {
            PlayClip.Exit();
        });

        this.on('timeupdate', function() {
            PlayClip.updateCurrentTime(this.currentTime());
        });

        this.on('error', function() {
            PlayClip.showWarningDialog(STR_IS_OFFLINE);
            window.setTimeout(PlayClip.Exit, 1000);
        });

    });
};

PlayClip.offPlayer = function() {
    PlayClip.Player.off('ended', null);
    PlayClip.Player.off('timeupdate', null);
    PlayClip.Player.off('error', null);
};

PlayClip.Resume = function() {
    if (document.hidden) {
        PlayClip.Exit();
        PlayClip.offPlayer();
    }
};

PlayClip.Exit = function() {
    PlayClip.Player.pause();
    PlayClip.Player.src('app/images/temp.mp4');
    PlayClip.offPlayer();
    document.body.removeEventListener("keydown", PlayClip.handleKeyDown);
    document.removeEventListener('visibilitychange', Play.Resume);
    PlayClip.hidePanel();
    $("#play_clip_dialog_simple_pause").hide();
    $("#play_clip_dialog_exit").hide();
    PlayClip.HideWarningDialog();
    $("#scene1").show();
    $("#scene3").hide();
    Main.ReStartScreens();
};

PlayClip.updateCurrentTime = function(currentTime) {
    document.getElementById("stream_clip_info_currentime").innerHTML = STR_WATCHING + PlayClip.timeS(currentTime);

    var today = (new Date()).toString().split(' ');
    var time = today[4].toString().split(':');
    document.getElementById("stream_clip_system_time").innerHTML = today[2].toString() + '/' + today[1].toString() + ' ' + time[0] + ':' + time[1];

    if (PlayClip.WarningDialogVisible()) PlayClip.HideWarningDialog();
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
            PlayClip.Player.currentTime(PlayClip.Player.currentTime() - 5);
            break;
        case TvKeyCode.KEY_RIGHT:
            PlayClip.Player.currentTime(PlayClip.Player.currentTime() + 5);
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
            if (!PlayClip.Player.paused()) {
                PlayClip.showPauseDialog();
                PlayClip.Player.pause();
                webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
            } else {
                PlayClip.Player.play();
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
