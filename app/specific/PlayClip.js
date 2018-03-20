/*jshint multistr: true */
function PlayClip() {

}
//Variable initialization

PlayClip.PlayerTime = 0;
PlayClip.streamCheck = null;
PlayClip.PlayerCheckCount = 0;
PlayClip.Canjump = false;
PlayClip.IsJumping = false;
PlayClip.jumpCount = 0;
PlayClip.JumpID = null;
PlayClip.TimeToJump = 0;
PlayClip.jumpCountMin = -12;
PlayClip.jumpCountMax = 12;
PlayClip.isOn = false;
PlayClip.speedArray = ['2x', '1.5x', '1x (Normal)', '0.5x', '0.25x'];
PlayClip.SpeedIndex = 2;
PlayClip.SpeedIndexPosition = 2;

//Variable initialization end

PlayClip.Start = function() {
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    Play.showBufferDialog();
    Play.hideChat();
    Play.LoadLogo(document.getElementById('stream_info_icon'), Main.selectedChannelChannelLogo);
    $('#stream_info_name').text(Sclip.title);
    $("#stream_info_title").text(Main.selectedChannelDisplayname + ' ' + STR_PLAYING + Sclip.game);
    $("#stream_info_game").text(Sclip.views);
    $("#stream_live_icon").text(Sclip.createdAt);
    $("#stream_live_time").text(Sclip.Duration);
    document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play.timeS(0);
    PlayClip.SetInfo();

    PlayClip.SpeedIndex = 2;
    PlayClip.SpeedIndexPosition = 2;
    Play.IsWarning = false;
    Play.Panelcouner = 2;
    PlayClip.IconsFocus();

    if (AddCode.OauthToken !== '') {
        AddCode.userChannel = Main.selectedChannel_id;
        AddCode.CheckFallow();
        Play.showFallow();
    } else Play.hideFallow();

    document.addEventListener('visibilitychange', PlayClip.Resume, false);
    PlayClip.streamCheck = window.setInterval(PlayClip.PlayerCheck, 500);
    PlayClip.Canjump = false;
    PlayClip.IsJumping = false;
    PlayClip.jumpCount = 0;
    PlayClip.TimeToJump = 0;
    PlayClip.jumpCountMin = -12;
    PlayClip.jumpCountMax = 12;
    PlayClip.isOn = true;

    window.setTimeout(function() {
        Play.videojs.src({
            type: "video/mp4",
            src: Sclip.playUrl
        });

        Play.videojs.ready(function() {
            this.isFullscreen(true);
            this.requestFullscreen();
            this.autoplay(true);

            this.on('ended', function() {
                PlayClip.shutdownStream();
            });

            this.on('timeupdate', function() {
                PlayClip.updateCurrentTime(this.currentTime());
            });

            this.on('error', function() {
                Play.HideBufferDialog();
                Play.showWarningDialog(STR_IS_OFFLINE);
                window.setTimeout(PlayClip.shutdownStream, 1500);
            });

            this.on('loadedmetadata', function() {
                PlayClip.Canjump = true;
            });

        });
    }, 1000);

};

PlayClip.Resume = function() {
    if (document.hidden) PlayClip.shutdownStream();
};

PlayClip.SetInfo = function() {
    $('#label_quality').html(STR_RESET + STR_CLIP);
    document.getElementById("label_quality").style.paddingLeft = "27%";
    $("#quality_arrows").hide();
    $("#quality_name").hide();
    $("#scene2_speed").show();
};

PlayClip.UnSetInfo = function() {
    $('#label_quality').html(STR_QUALITY);
    document.getElementById("label_quality").style.paddingLeft = "5%";
    $("#quality_arrows").show();
    $("#quality_name").show();
    $("#scene2_speed").hide();
};

PlayClip.PlayerCheck = function() {
    if (PlayClip.PlayerTime == Play.videojs.currentTime() && !Play.videojs.paused()) {
        PlayClip.PlayerCheckCount++;
        Play.showBufferDialog();
        if (PlayClip.PlayerCheckCount > 90) {
            PlayClip.PlayerCheckCount = 0;
            Play.HideBufferDialog();
            Play.showWarningDialog(STR_PLAYER_PROBLEM);
            window.setTimeout(PlayClip.shutdownStream, 1500);
        }
    }
    if (!Play.videojs.paused()) Play.videojs.play();
    PlayClip.PlayerTime = Play.videojs.currentTime();
};

PlayClip.shutdownStream = function() {
    if (PlayClip.isOn) {
        PlayClip.PreshutdownStream();
        Play.exitMain();
    }
};

PlayClip.PreshutdownStream = function() {
    Play.ClearPlayer();
    document.body.removeEventListener("keydown", PlayClip.handleKeyDown);
    document.removeEventListener('visibilitychange', PlayClip.Resume);
    PlayClip.hidePanel();
    PlayClip.UnSetInfo();

    window.clearInterval(PlayClip.streamCheck);
    PlayClip.isOn = false;
};

PlayClip.updateCurrentTime = function(currentTime) {
    if (Play.WarningDialogVisible() && !PlayClip.IsJumping && !Play.IsWarning) Play.HideWarningDialog();
    if (Play.BufferDialogVisible()) Play.HideBufferDialog();
    if (Play.isShowPauseDialogOn() && !Play.videojs.paused()) Play.clearPause();
    PlayClip.PlayerCheckCount = 0;
    PlayClip.Canjump = true;

    if (Play.isPanelShown()) document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play.timeS(currentTime);
};

PlayClip.hidePanel = function() {
    PlayClip.clearHidePanel();
    $("#scene_channel_panel").hide();
};

PlayClip.showPanel = function() {
    Play.clock();
    Play.Panelcouner = 2;
    PlayClip.IconsFocus();
    PlayClip.SpeedIndex = PlayClip.SpeedIndexPosition;
    PlayClip.speedDisplay();
    document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play.timeS(Play.videojs.currentTime());
    $("#scene_channel_panel").show();
    PlayClip.setHidePanel();
};

PlayClip.clearHidePanel = function() {
    window.clearTimeout(PlayClip.PanelHideID);
};

PlayClip.setHidePanel = function() {
    PlayClip.PanelHideID = window.setTimeout(PlayClip.hidePanel, 5000); // time in ms
};

PlayClip.jump = function() {
    if (!Play.videojs.paused()) Play.videojs.pause();
    Play.videojs.currentTime(PlayClip.TimeToJump);
    PlayClip.jumpCount = 0;
    PlayClip.jumpCountMin = -12;
    PlayClip.jumpCountMax = 12;
    PlayClip.IsJumping = false;
    PlayClip.Canjump = false;
    Play.videojs.play();
};

PlayClip.jumpStart = function() {
    window.clearTimeout(PlayClip.JumpID);
    PlayClip.IsJumping = true;
    var time = '',
        jumpTotime = '';

    if (PlayClip.jumpCount === 0) {
        PlayClip.TimeToJump = 0;
        PlayClip.jumpCountMin = -12;
        PlayClip.jumpCountMax = 12;
        Play.showWarningDialog(STR_JUMP_CANCEL);
        window.setTimeout(function() {
            PlayClip.IsJumping = false;
        }, 1500);
        return;
    } else if (PlayClip.jumpCount < 0) {
        if (PlayClip.jumpCount == -1) PlayClip.TimeToJump = -5;
        else if (PlayClip.jumpCount == -2) PlayClip.TimeToJump = -10;
        else if (PlayClip.jumpCount == -3) PlayClip.TimeToJump = -15;
        else if (PlayClip.jumpCount == -4) PlayClip.TimeToJump = -20;
        else if (PlayClip.jumpCount == -5) PlayClip.TimeToJump = -25;
        else if (PlayClip.jumpCount == -6) PlayClip.TimeToJump = -30;
        else if (PlayClip.jumpCount == -7) PlayClip.TimeToJump = -35;
        else if (PlayClip.jumpCount == -8) PlayClip.TimeToJump = -40;
        else if (PlayClip.jumpCount == -9) PlayClip.TimeToJump = -45;
        else if (PlayClip.jumpCount == -10) PlayClip.TimeToJump = -50;
        else if (PlayClip.jumpCount == -11) PlayClip.TimeToJump = -55;
        else PlayClip.TimeToJump = -60;

        time = PlayClip.TimeToJump + STR_SEC;

        jumpTotime = Play.videojs.currentTime() + PlayClip.TimeToJump;
        if (jumpTotime < 0) {
            PlayClip.jumpCountMin = PlayClip.jumpCount;
            jumpTotime = 0;
        }
        PlayClip.TimeToJump = jumpTotime;
        jumpTotime = Play.timeS(jumpTotime);
    } else {
        if (PlayClip.jumpCount == 1) PlayClip.TimeToJump = 5;
        else if (PlayClip.jumpCount == 2) PlayClip.TimeToJump = 10;
        else if (PlayClip.jumpCount == 3) PlayClip.TimeToJump = 15;
        else if (PlayClip.jumpCount == 4) PlayClip.TimeToJump = 20;
        else if (PlayClip.jumpCount == 5) PlayClip.TimeToJump = 25;
        else if (PlayClip.jumpCount == 6) PlayClip.TimeToJump = 30;
        else if (PlayClip.jumpCount == 7) PlayClip.TimeToJump = 35;
        else if (PlayClip.jumpCount == 8) PlayClip.TimeToJump = 40;
        else if (PlayClip.jumpCount == 9) PlayClip.TimeToJump = 45;
        else if (PlayClip.jumpCount == 10) PlayClip.TimeToJump = 50;
        else if (PlayClip.jumpCount == 11) PlayClip.TimeToJump = 55;
        else PlayClip.TimeToJump = 60;

        time = PlayClip.TimeToJump + STR_SEC;

        jumpTotime = Play.videojs.currentTime() + PlayClip.TimeToJump;
        if (jumpTotime > Sclip.DurationSeconds) {
            PlayClip.TimeToJump = 0;
            PlayClip.jumpCountMax = PlayClip.jumpCount;
            Play.showWarningDialog(STR_JUMP_CANCEL + STR_JUMP_TIME_BIG);
            PlayClip.JumpID = window.setTimeout(function() {
                PlayClip.jumpCountMax = 16;
                PlayClip.jumpCount = 0;
                PlayClip.IsJumping = false;
            }, 1500);
            return;
        } else {
            PlayClip.TimeToJump = jumpTotime;
            jumpTotime = Play.timeS(jumpTotime);
        }
    }

    Play.showWarningDialog(STR_JUMP_TIME + time + STR_JUMP_T0 + jumpTotime);
    PlayClip.JumpID = window.setTimeout(PlayClip.jump, 1500);
};

PlayClip.speed = function() {
    var value = 1;
    if (PlayClip.SpeedIndex === 0) value = 2;
    else if (PlayClip.SpeedIndex == 1) value = 1.5;
    else if (PlayClip.SpeedIndex == 3) value = 0.5;
    else if (PlayClip.SpeedIndex == 4) value = 0.25;

    Play.videojs.playbackRate(value);
    PlayClip.clearHidePanel();
    PlayClip.hidePanel();
    PlayClip.SpeedIndexPosition = PlayClip.SpeedIndex;
};

PlayClip.speedDisplay = function() {
    if (PlayClip.SpeedIndex === 0) {
        $('#speed_arrow_up').css({
            'opacity': 0.2
        });
        $('#speed_arrow_down').css({
            'opacity': 1.0
        });
    } else if (PlayClip.SpeedIndex == PlayClip.speedArray.length - 1) {
        $('#speed_arrow_up').css({
            'opacity': 1.0
        });
        $('#speed_arrow_down').css({
            'opacity': 0.2
        });
    } else {
        $('#speed_arrow_up').css({
            'opacity': 1.0
        });
        $('#speed_arrow_down').css({
            'opacity': 1.0
        });
    }

    $('#speed_name').text(PlayClip.speedArray[PlayClip.SpeedIndex]);
};

PlayClip.IconsFocus = function() {
    Main.ChangeBorder("scene2_quality", "3.5px solid rgba(0, 0, 0, 0)");
    Main.ChangebackgroundColor("scene2_quality", "rgba(0, 0, 0, 0)");

    Main.ChangeBorder("scene2_heart", "3.5px solid rgba(0, 0, 0, 0)");
    Main.ChangebackgroundColor("scene2_heart", "rgba(0, 0, 0, 0)");

    Main.ChangeBorder("scene2_speed", "3.5px solid rgba(0, 0, 0, 0)");
    Main.ChangebackgroundColor("scene2_speed", "rgba(0, 0, 0, 0)");

    Main.ChangeBorder("scene2_channel", "3.5px solid rgba(0, 0, 0, 0)");
    Main.ChangebackgroundColor("scene2_channel", "rgba(0, 0, 0, 0)");

    Main.ChangeBorder("scene2_search", "3.5px solid rgba(0, 0, 0, 0)");
    Main.ChangebackgroundColor("scene2_search", "rgba(0, 0, 0, 0)");

    if (Play.Panelcouner === 0) {
        Main.ChangeBorder("scene2_quality", "3.5px solid #FFFFFF");
        Main.ChangebackgroundColor("scene2_quality", "rgba(0, 0, 0, 0.7)");
    } else if (Play.Panelcouner == 1) {
        Main.ChangeBorder("scene2_heart", "3.5px solid #FFFFFF");
        Main.ChangebackgroundColor("scene2_heart", "rgba(0, 0, 0, 0.7)");
    } else if (Play.Panelcouner == 2) {
        Main.ChangeBorder("scene2_speed", "3.5px solid #FFFFFF");
        Main.ChangebackgroundColor("scene2_speed", "rgba(0, 0, 0, 0.7)");
    } else if (Play.Panelcouner == 3) {
        Main.ChangeBorder("scene2_channel", "3.5px solid #FFFFFF");
        Main.ChangebackgroundColor("scene2_channel", "rgba(0, 0, 0, 0.7)");
    } else if (Play.Panelcouner == 4) {
        Main.ChangeBorder("scene2_search", "3.5px solid #FFFFFF");
        Main.ChangebackgroundColor("scene2_search", "rgba(0, 0, 0, 0.7)");
    }
};

PlayClip.handleKeyDown = function(e) {
    switch (e.keyCode) {
        case TvKeyCode.KEY_LEFT:
            if (Play.isPanelShown()) {
                Play.Panelcouner++;
                if (Play.Panelcouner > 4) Play.Panelcouner = 0;
                PlayClip.IconsFocus();
                PlayClip.clearHidePanel();
                PlayClip.setHidePanel();
            } else if (PlayClip.Canjump) {
                if (PlayClip.jumpCount > PlayClip.jumpCountMin) PlayClip.jumpCount--;
                PlayClip.jumpStart();
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Play.isPanelShown()) {
                Play.Panelcouner--;
                if (Play.Panelcouner < 0) Play.Panelcouner = 4;
                PlayClip.IconsFocus();
                PlayClip.clearHidePanel();
                PlayClip.setHidePanel();
            } else if (PlayClip.Canjump) {
                if (PlayClip.jumpCount < PlayClip.jumpCountMax) PlayClip.jumpCount++;
                PlayClip.jumpStart();
            }
            break;
        case TvKeyCode.KEY_UP:
            if (!Play.isPanelShown()) {
                PlayClip.showPanel();
            } else if (Play.Panelcouner === 2) {
                PlayClip.clearHidePanel();
                PlayClip.setHidePanel();
                PlayClip.SpeedIndex--;
                if (PlayClip.SpeedIndex < 0) PlayClip.SpeedIndex = 0;
                PlayClip.speedDisplay();
            }
            break;
        case TvKeyCode.KEY_DOWN:
            if (!Play.isPanelShown()) {
                PlayClip.showPanel();
            } else if (Play.Panelcouner === 2) {
                PlayClip.clearHidePanel();
                PlayClip.setHidePanel();
                PlayClip.SpeedIndex++;
                if (PlayClip.SpeedIndex > 4) PlayClip.SpeedIndex = 4;
                PlayClip.speedDisplay();
            }
            break;
        case TvKeyCode.KEY_ENTER:
            if (!Play.isPanelShown()) {
                PlayClip.showPanel();
            } else {
                if (Play.Panelcouner === 0) {
                    Play.videojs.src({
                        type: "video/mp4",
                        src: Sclip.playUrl
                    });
                    Play.showBufferDialog();
                    Play.clearPause();
                    PlayClip.SpeedIndexPosition = 2;
                    PlayClip.SpeedIndex = 2;
                    PlayClip.speedDisplay();
                } else if (Play.Panelcouner === 1) {
                    if (Play.noFallow) {
                        Play.showWarningDialog(STR_NOKEY_WARN);
                        Play.IsWarning = true;
                        window.setTimeout(function() {
                            Play.HideWarningDialog();
                            Play.IsWarning = false;
                        }, 2000);
                    } else {
                        Play.FallowUnfallow();
                        PlayClip.clearHidePanel();
                        PlayClip.setHidePanel();
                    }
                } else if (Play.Panelcouner === 2) {
                    PlayClip.speed();
                } else if (Play.Panelcouner === 3) {
                    Main.Before = Main.Go;
                    Main.Go = Main.SChannelContent;
                    window.clearTimeout(Play.exitID);
                    $("#play_dialog_exit").hide();
                    window.setTimeout(PlayClip.shutdownStream, 10);
                } else if (Play.Panelcouner === 4) {
                    Main.BeforeSearch = Main.Go;
                    Main.Go = Main.Search;
                    window.clearTimeout(Play.exitID);
                    $("#play_dialog_exit").hide();
                    window.setTimeout(PlayClip.shutdownStream, 10);
                }
            }
            break;
        case TvKeyCode.KEY_RETURN:
            if (Play.isControlsDialogShown()) Play.HideControlsDialog();
            else if (Play.isPanelShown()) {
                PlayClip.hidePanel();
            } else {
                if (Play.ExitDialogVisible()) {
                    window.clearTimeout(Play.exitID);
                    $("#play_dialog_exit").hide();
                    window.setTimeout(PlayClip.shutdownStream, 10);
                } else {
                    Play.showExitDialog();
                }
            }
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
            Play.KeyPause();
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            Play.hideChat();
            Play.ChatEnable = false;
            localStorage.setItem('ChatEnable', 'false');
            break;
        case TvKeyCode.KEY_YELLOW:
            Play.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Play.speed(0.5);
            break;
        default:
            break;
    }
};
