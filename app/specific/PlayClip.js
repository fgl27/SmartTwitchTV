//Variable initialization
var PlayClip_PlayerTime = 0;
var PlayClip_streamCheck = null;
var PlayClip_PlayerCheckCount = 0;
var PlayClip_Canjump = false;
var PlayClip_IsJumping = false;
var PlayClip_jumpCount = 0;
var PlayClip_JumpID = null;
var PlayClip_TimeToJump = 0;
var PlayClip_jumpCountMin = -12;
var PlayClip_jumpCountMax = 12;
var PlayClip_isOn = false;
var PlayClip_speedArray = ['2x', '1.5x', '1x (Normal)', '0.5x', '0.25x'];
var PlayClip_SpeedIndex = 2;
var PlayClip_SpeedIndexPosition = 2;
var PlayClip_PanelHideID = null;
var PlayClip_loadingDataTry = 0;
var PlayClip_loadingDataTimeout = 3500;
var PlayClip_loadingDataTryMax = 10;
//Variable initialization end

function PlayClip_Start() {
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    Play_showBufferDialog();
    Play_hideChat();
    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_selectedChannelLogo);
    document.getElementById("stream_info_name").innerHTML = Main_selectedChannelDisplayname;
    document.getElementById("stream_info_title").innerHTML = Sclip_title;
    document.getElementById("stream_info_game").innerHTML = Sclip_game + ', ' + Sclip_views + ', ' + Sclip_language;
    document.getElementById("stream_live_icon").innerHTML = Sclip_createdAt;
    document.getElementById("stream_live_time").innerHTML = Sclip_Duration;
    document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play_timeS(0);
    PlayClip_SpeedToQuality(1);

    PlayClip_SpeedIndex = 2;
    PlayClip_SpeedIndexPosition = 2;
    Play_EndSet(3);
    Play_IsWarning = false;
    Play_Panelcouner = 0;
    Play_IconsFocus();

    if (Main_UserName !== '') {
        AddCode_PlayRequest = true;
        AddCode_CheckFallow();
        Play_showFallow();
    } else Play_hideFallow();

    document.addEventListener('visibilitychange', PlayClip_Resume, false);
    PlayClip_Canjump = false;
    PlayClip_IsJumping = false;
    PlayClip_jumpCount = 0;
    PlayClip_TimeToJump = 0;
    PlayClip_jumpCountMin = -12;
    PlayClip_jumpCountMax = 12;
    PlayClip_isOn = true;

    PlayClip_loadData();
}

function PlayClip_loadData() {
    PlayClip_loadingDataTry = 0;
    PlayClip_loadingDataTimeout = 3500;
    PlayClip_loadDataRequest();
}

function PlayClip_loadDataRequest() {
    try {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://clips.twitch.tv/api/v2/clips/' + Sclip_playUrl + '/status', true);
        xmlHttp.timeout = PlayClip_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) PlayClip_Play(xmlHttp.responseText);
                else PlayClip_loadDataError();
            }
        };
        xmlHttp.send(null);
    } catch (error) {
        PlayClip_loadDataError();
    }
}

function PlayClip_loadDataError() {
    PlayClip_loadingDataTry++;
    if (PlayClip_loadingDataTry < PlayClip_loadingDataTryMax) {
        PlayClip_loadingDataTimeout += 1000;
        PlayClip_loadDataRequest();
    } else {
        Play_HideBufferDialog();
        Play_PannelEnterStart(3);
    }
}

function PlayClip_Play(response) {
    //Main_ready to prevent clip start playing before the document finish loading and cause odd visual effects
    Sclip_playUrl = JSON.parse(response).quality_options[0].source;
    Main_ready(function() {
        Play_videojs.src({
            type: "video/mp4",
            src: Sclip_playUrl
        });

        Play_videojs.ready(function() {
            this.isFullscreen(true);
            this.requestFullscreen();
            this.autoplay(true);

            this.on('ended', function() {
                Play_PannelEnterStart(3);
            });

            this.on('timeupdate', function() {
                PlayClip_updateCurrentTime(this.currentTime());
            });

            this.on('error', function() {
                Play_PannelEnterStart(3);
            });

            this.on('loadedmetadata', function() {
                PlayClip_Canjump = true;
            });

        });
        PlayClip_streamCheck = window.setInterval(PlayClip_PlayerCheck, 500);
    });
}

function PlayClip_Resume() {
    if (document.hidden) PlayClip_shutdownStream();
}

function PlayClip_SpeedToQuality(bool) {
    if (bool) {
        document.getElementById("scene2_quality").style.width = "18%";
        document.getElementById("quality_video").innerHTML = '<i class="icon-speedometer strokicon" style="font-size: 225%;"></i>';
        document.getElementById("quality_name").style.width = "55%";
        document.getElementById("quality_name").style.fontSize = "205%";
    } else {
        document.getElementById("scene2_quality").style.width = "28%";
        document.getElementById("quality_video").innerHTML = '<i class="icon-videocamera strokicon"></i>';
        document.getElementById("quality_name").style.width = "80%";
        document.getElementById("quality_name").style.fontSize = "185%";
    }
}

function PlayClip_PlayerCheck() {
    if (!Play_videojs.paused() && PlayClip_PlayerTime === Play_videojs.currentTime()) {
        PlayClip_PlayerCheckCount++;
        Play_showBufferDialog();
        if (PlayClip_PlayerCheckCount > 90) {
            PlayClip_PlayerCheckCount = 0;
            Play_HideBufferDialog();
            Play_showWarningDialog(STR_PLAYER_PROBLEM);
            window.setTimeout(PlayClip_shutdownStream, 1500);
        }
    }
    if (!Play_videojs.paused()) Play_videojs.play();
    PlayClip_PlayerTime = Play_videojs.currentTime();
}

function PlayClip_shutdownStream() {
    if (PlayClip_isOn) {
        PlayClip_PreshutdownStream();
        Play_exitMain();
    }
}

function PlayClip_PreshutdownStream() {
    Play_ClearPlayer();
    document.body.removeEventListener("keydown", PlayClip_handleKeyDown);
    document.removeEventListener('visibilitychange', PlayClip_Resume);
    PlayClip_hidePanel();
    PlayClip_SpeedToQuality(0);

    window.clearInterval(PlayClip_streamCheck);
    PlayClip_isOn = false;
}

function PlayClip_updateCurrentTime(currentTime) {
    if (Play_WarningDialogVisible() && !PlayClip_IsJumping && !Play_IsWarning) Play_HideWarningDialog();
    if (Play_BufferDialogVisible()) Play_HideBufferDialog();
    if (Play_isShowPauseDialogOn() && !Play_videojs.paused()) Play_clearPause();
    PlayClip_PlayerCheckCount = 0;
    PlayClip_Canjump = true;

    if (Play_isPanelShown()) document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play_timeS(currentTime);
}

function PlayClip_hidePanel() {
    PlayClip_clearHidePanel();
    document.getElementById("scene_channel_panel").style.opacity = "0";
}

function PlayClip_showPanel() {
    Play_clock();
    Play_Panelcouner = 0;
    Play_IconsFocus();
    PlayClip_SpeedIndex = PlayClip_SpeedIndexPosition;
    PlayClip_speedDisplay();
    document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play_timeS(Play_videojs.currentTime());
    document.getElementById("scene_channel_panel").style.opacity = "1";
    PlayClip_setHidePanel();
}

function PlayClip_clearHidePanel() {
    window.clearTimeout(PlayClip_PanelHideID);
}

function PlayClip_setHidePanel() {
    PlayClip_PanelHideID = window.setTimeout(PlayClip_hidePanel, 5000); // time in ms
}

function PlayClip_jump() {
    if (!Play_videojs.paused()) Play_videojs.pause();
    Play_videojs.currentTime(PlayClip_TimeToJump);
    PlayClip_jumpCount = 0;
    PlayClip_jumpCountMin = -12;
    PlayClip_jumpCountMax = 12;
    PlayClip_IsJumping = false;
    PlayClip_Canjump = false;
    Play_videojs.play();
}

function PlayClip_jumpStart() {
    window.clearTimeout(PlayClip_JumpID);
    PlayClip_IsJumping = true;
    var time = '',
        jumpTotime = '';

    if (!PlayClip_jumpCount) {
        PlayClip_TimeToJump = 0;
        PlayClip_jumpCountMin = -12;
        PlayClip_jumpCountMax = 12;
        Play_showWarningDialog(STR_JUMP_CANCEL);
        window.setTimeout(function() {
            PlayClip_IsJumping = false;
        }, 1500);
        return;
    } else if (PlayClip_jumpCount < 0) {
        if (PlayClip_jumpCount === -1) PlayClip_TimeToJump = -5;
        else if (PlayClip_jumpCount === -2) PlayClip_TimeToJump = -10;
        else if (PlayClip_jumpCount === -3) PlayClip_TimeToJump = -15;
        else if (PlayClip_jumpCount === -4) PlayClip_TimeToJump = -20;
        else if (PlayClip_jumpCount === -5) PlayClip_TimeToJump = -25;
        else if (PlayClip_jumpCount === -6) PlayClip_TimeToJump = -30;
        else if (PlayClip_jumpCount === -7) PlayClip_TimeToJump = -35;
        else if (PlayClip_jumpCount === -8) PlayClip_TimeToJump = -40;
        else if (PlayClip_jumpCount === -9) PlayClip_TimeToJump = -45;
        else if (PlayClip_jumpCount === -10) PlayClip_TimeToJump = -50;
        else if (PlayClip_jumpCount === -11) PlayClip_TimeToJump = -55;
        else PlayClip_TimeToJump = -60;

        time = PlayClip_TimeToJump + STR_SEC;

        jumpTotime = Play_videojs.currentTime() + PlayClip_TimeToJump;
        if (jumpTotime < 0) {
            PlayClip_jumpCountMin = PlayClip_jumpCount;
            jumpTotime = 0;
        }
        PlayClip_TimeToJump = jumpTotime;
        jumpTotime = Play_timeS(jumpTotime);
    } else {
        if (PlayClip_jumpCount === 1) PlayClip_TimeToJump = 5;
        else if (PlayClip_jumpCount === 2) PlayClip_TimeToJump = 10;
        else if (PlayClip_jumpCount === 3) PlayClip_TimeToJump = 15;
        else if (PlayClip_jumpCount === 4) PlayClip_TimeToJump = 20;
        else if (PlayClip_jumpCount === 5) PlayClip_TimeToJump = 25;
        else if (PlayClip_jumpCount === 6) PlayClip_TimeToJump = 30;
        else if (PlayClip_jumpCount === 7) PlayClip_TimeToJump = 35;
        else if (PlayClip_jumpCount === 8) PlayClip_TimeToJump = 40;
        else if (PlayClip_jumpCount === 9) PlayClip_TimeToJump = 45;
        else if (PlayClip_jumpCount === 10) PlayClip_TimeToJump = 50;
        else if (PlayClip_jumpCount === 11) PlayClip_TimeToJump = 55;
        else PlayClip_TimeToJump = 60;

        time = PlayClip_TimeToJump + STR_SEC;

        jumpTotime = Play_videojs.currentTime() + PlayClip_TimeToJump;
        if (jumpTotime > Sclip_DurationSeconds) {
            PlayClip_TimeToJump = 0;
            PlayClip_jumpCountMax = PlayClip_jumpCount;
            Play_showWarningDialog(STR_JUMP_CANCEL + STR_JUMP_TIME_BIG);
            PlayClip_JumpID = window.setTimeout(function() {
                PlayClip_jumpCountMax = 16;
                PlayClip_jumpCount = 0;
                PlayClip_IsJumping = false;
            }, 1500);
            return;
        } else {
            PlayClip_TimeToJump = jumpTotime;
            jumpTotime = Play_timeS(jumpTotime);
        }
    }

    Play_showWarningDialog(STR_JUMP_TIME + time + STR_JUMP_T0 + jumpTotime);
    PlayClip_JumpID = window.setTimeout(PlayClip_jump, 1500);
}

function PlayClip_speed() {
    var value = 1;
    if (!PlayClip_SpeedIndex) value = 2;
    else if (PlayClip_SpeedIndex === 1) value = 1.5;
    else if (PlayClip_SpeedIndex === 3) value = 0.5;
    else if (PlayClip_SpeedIndex === 4) value = 0.25;

    Play_videojs.playbackRate(value);
    PlayClip_clearHidePanel();
    PlayClip_hidePanel();
    PlayClip_SpeedIndexPosition = PlayClip_SpeedIndex;
}

function PlayClip_speedDisplay() {
    if (!PlayClip_SpeedIndex) {
        document.getElementById("quality_arrow_up").style.opacity = "0.2";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    } else if (PlayClip_SpeedIndex === PlayClip_speedArray.length - 1) {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "0.2";

    } else {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    }

    document.getElementById("quality_name").innerHTML = PlayClip_speedArray[PlayClip_SpeedIndex];
}

function PlayClip_Restart() {
    Play_videojs.src({
        type: "video/mp4",
        src: Sclip_playUrl
    });
    Play_showBufferDialog();
    Play_clearPause();
    PlayClip_SpeedIndexPosition = 2;
    PlayClip_SpeedIndex = 2;
    PlayClip_speedDisplay();
}

function PlayClip_OpenVod() {
    console.log("PlayClip_OpenVod");
}

function PlayClip_handleKeyDown(e) {
    switch (e.keyCode) {
        case KEY_LEFT:
            if (Play_isPanelShown()) {
                Play_Panelcouner++;
                if (Play_Panelcouner > 4) Play_Panelcouner = 0;
                Play_IconsFocus();
                PlayClip_clearHidePanel();
                PlayClip_setHidePanel();
            } else if (Play_isEndDialogShown()) {
                Play_EndTextClear();
                Play_Endcouner--;
                if (Play_Endcouner < 0) Play_Endcouner = 3;
                if (Play_Endcouner === 1) Play_Endcouner = 0;
                Play_EndIconsFocus(3);
            } else if (PlayClip_Canjump) {
                if (PlayClip_jumpCount > PlayClip_jumpCountMin) PlayClip_jumpCount--;
                PlayClip_jumpStart();
            }
            break;
        case KEY_RIGHT:
            if (Play_isPanelShown()) {
                Play_Panelcouner--;
                if (Play_Panelcouner < 0) Play_Panelcouner = 4;
                Play_IconsFocus();
                PlayClip_clearHidePanel();
                PlayClip_setHidePanel();
            } else if (Play_isEndDialogShown()) {
                Play_EndTextClear();
                Play_Endcouner++;
                if (Play_Endcouner > 3) Play_Endcouner = 0;
                if (Play_Endcouner === 1) Play_Endcouner = 2;
                Play_EndIconsFocus(3);
            } else if (PlayClip_Canjump) {
                if (PlayClip_jumpCount < PlayClip_jumpCountMax) PlayClip_jumpCount++;
                PlayClip_jumpStart();
            }
            break;
        case KEY_UP:
            if (Play_isEndDialogShown()) Play_EndTextClear();
            else if (!Play_isPanelShown()) PlayClip_showPanel();
            else if (Play_Panelcouner === 0) {
                PlayClip_clearHidePanel();
                PlayClip_setHidePanel();
                PlayClip_SpeedIndex--;
                if (PlayClip_SpeedIndex < 0) PlayClip_SpeedIndex = 0;
                PlayClip_speedDisplay();
            }
            break;
        case KEY_DOWN:
            if (Play_isEndDialogShown()) Play_EndTextClear();
            else if (!Play_isPanelShown()) PlayClip_showPanel();
            else if (Play_Panelcouner === 0) {
                PlayClip_clearHidePanel();
                PlayClip_setHidePanel();
                PlayClip_SpeedIndex++;
                if (PlayClip_SpeedIndex > 4) PlayClip_SpeedIndex = 4;
                PlayClip_speedDisplay();
            }
            break;
        case KEY_ENTER:
            if (Play_isEndDialogShown()) Play_EndEnterPressed(3);
            else if (Play_isPanelShown()) Play_PannelEnterPressed(3);
            else PlayClip_showPanel();
            break;
        case KEY_RETURN:
            if (Play_isControlsDialogShown()) Play_HideControlsDialog();
            else if (Play_isPanelShown()) PlayClip_hidePanel();
            else {
                if (Play_ExitDialogVisible()) {
                    Play_CleanHideExit();
                    Main_ready(PlayClip_shutdownStream);
                } else {
                    Play_showExitDialog();
                }
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
            if (!Play_isEndDialogShown()) Play_KeyPause();
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            Play_hideChat();
            Play_ChatEnable = false;
            localStorage.setItem('ChatEnable', 'false');
            break;
        case KEY_YELLOW:
            if (!Play_isEndDialogShown()) Play_showControlsDialog();
            break;
        case KEY_BLUE:
            if (!Play_isEndDialogShown()) PlayClip_Restart();
            break;
        default:
            break;
    }
}