//Variable initialization
var PlayClip_PlayerTime = 0;
var PlayClip_streamCheck = null;
var PlayClip_PlayerCheckCount = 0;
var PlayClip_IsJumping = false;
var PlayClip_jumpCount = 0;
var PlayClip_JumpID = null;
var PlayClip_TimeToJump = 0;
var PlayClip_jumpCountMin = -12;
var PlayClip_jumpCountMax = 12;
var PlayClip_isOn = false;
var PlayClip_qualityIndex = 2;
var PlayClip_qualityIndexPosition = 2;
var PlayClip_PanelHideID = null;
var PlayClip_loadingDataTry = 0;
var PlayClip_loadingDataTimeout = 3500;
var PlayClip_loadingDataTryMax = 10;
var PlayClip_currentTime = 0;
var PlayClip_JustStartPlaying = true;
var PlayClip_quality = 'source';
var PlayClip_qualityPlaying = PlayClip_quality;
var PlayClip_qualityIndex = 0;
var PlayClip_qualities = [];
var PlayClip_playingUrl = '';
var PlayClip_offsettime = 0;
var PlayClip_PlayerCheckQualityChanged = false;
var PlayClip_PlayerCheckOffset = 0;
var PlayClip_state = 0;
var PlayClip_STATE_PLAYING = 1;
var PlayClip_bufferingcomplete = false;
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
    document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play_timeMs(0);

    PlayClip_state = 0;
    PlayClip_offsettime = 0;
    PlayClip_currentTime = 0;
    PlayClip_qualityIndex = 2;
    PlayClip_qualityIndexPosition = 2;
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
                if (xmlHttp.status === 200) PlayClip_QualityGenerate(xmlHttp.responseText);
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
        Play_PannelEndStart(3);
    }
}

var PlayClip_listener = {
    onbufferingstart: function() {
        Play_showBufferDialog();
        PlayClip_bufferingcomplete = false;
    },
    onbufferingcomplete: function() {
        Play_HideBufferDialog();
        PlayClip_bufferingcomplete = true;
    },
    oncurrentplaytime: function(currentTime) {
        if (PlayClip_currentTime !== currentTime) PlayClip_updateCurrentTime(currentTime);
    },
    onstreamcompleted: function() {
        Play_PannelEndStart(3);
    }
};

function PlayClip_QualityGenerate(response) {
    PlayClip_qualities = [];

    response = JSON.parse(response).quality_options;

    for (var i = 0; i < response.length; i++) {

        if (!PlayClip_qualities.length) {
            PlayClip_qualities.push({
                'id': response[i].quality + 'p' + PlayClip_FrameRate(response[i].frame_rate) + ' (source)',
                'url': response[i].source
            });
        } else {
            PlayClip_qualities.push({
                'id': response[i].quality + 'p' + PlayClip_FrameRate(response[i].frame_rate),
                'url': response[i].source
            });
        }
    }

    PlayClip_state = PlayClip_STATE_PLAYING;
    PlayClip_qualityChanged();
}

function PlayClip_FrameRate(value) {
    if (value > 40) return 60;
    else return '';
}

function PlayClip_qualityChanged() {
    PlayClip_qualityIndex = 0;
    PlayClip_playingUrl = PlayClip_qualities[0].url;
    if (PlayClip_quality.indexOf("source") !== -1) PlayClip_quality = "source";
    for (var i = 0; i < PlayClip_getQualitiesCount(); i++) {
        if (PlayClip_qualities[i].id === PlayClip_quality) {
            PlayClip_qualityIndex = i;
            PlayClip_playingUrl = PlayClip_qualities[i].url;
            break;
        } else if (PlayClip_qualities[i].id.indexOf(PlayClip_quality) !== -1) { //make shore to set a value before break out
            PlayClip_qualityIndex = i;
            PlayClip_playingUrl = PlayClip_qualities[i].url;
        }
    }

    PlayClip_qualityPlaying = PlayClip_quality;
    if (PlayClip_isOn) PlayClip_onPlayer();
}

function PlayClip_onPlayer() {
    Play_showBufferDialog();
    try {
        Play_avplay.stop();
        Play_avplay.open(PlayClip_playingUrl);

        if (PlayClip_offsettime > 0 && PlayClip_offsettime !== Play_avplay.getCurrentTime()) {
            Play_avplay.seekTo(PlayClip_offsettime - 3500); // minor delay on the seekTo to show were it stop or at least before
            Play_clearPause();
        }

        Play_avplay.setDisplayRect(0, 0, screen.width, screen.height);
        Play_avplay.setListener(PlayClip_listener);
    } catch (e) {
        console.log(e);
    }

    PlayClip_JustStartPlaying = true;
    Play_avplay.prepareAsync(function() {
        Play_avplay.play();
    });

    Main_ready(function() {
        Play_HideWarningDialog();
        PlayClip_hidePanel();
        window.clearInterval(PlayClip_streamCheck);
        PlayClip_streamCheck = window.setInterval(PlayClip_PlayerCheck, 1500);
    });
}

function PlayClip_Resume() {
    if (document.hidden) {
        PlayClip_shutdownStream();
        window.clearInterval(PlayClip_streamCheck);
    }
}

// On clips avplay call oncurrentplaytime it 500ms so call PlayClip_PlayerCheck it 1500 works well
function PlayClip_PlayerCheck() {
    if (Play_isIdleOrPlaying() && PlayClip_PlayerTime === PlayClip_currentTime) {
        PlayClip_PlayerCheckCount++;
        if (PlayClip_PlayerCheckQualityChanged) PlayClip_PlayerCheckOffset = -3;
        if (PlayClip_PlayerCheckCount > (10 + PlayClip_PlayerCheckOffset)) { //staled for 15 sec drop one quality
            PlayClip_PlayerCheckCount = 0;
            if (PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1) {
                if (PlayClip_PlayerCheckQualityChanged) PlayClip_qualityIndex++; //Don't change first time only reload
                PlayClip_qualityDisplay();
                PlayClip_qualityChanged();
                PlayClip_PlayerCheckQualityChanged = true; // -5s on next check
            } else {
                Play_avplay.stop();
                Play_PannelEndStart(3); //staled for too long close the player
            }
        }
    }

    PlayClip_PlayerTime = PlayClip_currentTime;
}

function PlayClip_shutdownStream() {
    if (PlayClip_isOn) {
        PlayClip_PreshutdownStream();
        Play_CleanHideExit();
        Play_exitMain();
    }
}

function PlayClip_PreshutdownStream() {
    Play_ClearPlayer();
    document.body.removeEventListener("keydown", PlayClip_handleKeyDown);
    document.removeEventListener('visibilitychange', PlayClip_Resume);
    PlayClip_hidePanel();

    window.clearInterval(PlayClip_streamCheck);
    PlayClip_isOn = false;
}

function PlayClip_updateCurrentTime(currentTime) {
    PlayClip_currentTime = currentTime;

    if (Play_WarningDialogVisible() && !PlayClip_IsJumping && !Play_IsWarning) Play_HideWarningDialog();

    //Play_JustStartPlaying prevent the buffer dialog from blink when enable by Play_PlayerCheck
    if (PlayClip_bufferingcomplete) Play_HideBufferDialog();

    PlayClip_PlayerCheckCount = 0;

    if (Play_isPanelShown()) document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play_timeMs(currentTime);
}

function PlayClip_hidePanel() {
    PlayClip_clearHidePanel();
    PlayClip_quality = PlayClip_qualityPlaying;
    document.getElementById("scene_channel_panel").style.opacity = "0";
}

function PlayClip_showPanel() {
    Play_clock();
    Play_Panelcouner = 0;
    Play_IconsFocus();
    PlayClip_qualityIndexReset();
    PlayClip_qualityDisplay();
    document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play_timeMs(Play_avplay.getCurrentTime());
    document.getElementById("scene_channel_panel").style.opacity = "1";
    PlayClip_setHidePanel();
}

function PlayClip_qualityIndexReset() {
    PlayClip_qualityIndex = 0;
    for (var i = 0; i < PlayClip_getQualitiesCount(); i++) {
        if (PlayClip_qualities[i].id === PlayClip_quality) {
            PlayClip_qualityIndex = i;
            break;
        } else if (PlayClip_qualities[i].id.indexOf(PlayClip_quality) !== -1) { //make shore to set a value before break out
            PlayClip_qualityIndex = i;
        }
    }
}

function PlayClip_getQualitiesCount() {
    return PlayClip_qualities.length;
}

function PlayClip_qualityDisplay() {
    if (!PlayClip_qualityIndex) {
        document.getElementById("quality_arrow_up").style.opacity = "0.2";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    } else if (PlayClip_qualityIndex === PlayClip_getQualitiesCount() - 1) {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "0.2";
    } else {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    }

    PlayClip_quality = PlayClip_qualities[PlayClip_qualityIndex].id;

    if (PlayClip_quality.indexOf('source') !== -1) document.getElementById("quality_name").innerHTML = PlayClip_quality.replace("source", STR_SOURCE);
    else document.getElementById("quality_name").innerHTML = PlayClip_quality;
}

function PlayClip_clearHidePanel() {
    window.clearTimeout(PlayClip_PanelHideID);
}

function PlayClip_setHidePanel() {
    PlayClip_PanelHideID = window.setTimeout(PlayClip_hidePanel, 5000); // time in ms
}

function PlayClip_jump() {
    if (Play_isIdleOrPlaying()) Play_avplay.pause();

    if (PlayClip_TimeToJump > 0) {
        PlayClip_TimeToJump -= 2;
        try {
            Play_avplay.jumpForward(PlayClip_TimeToJump * 1000);
        } catch (e) {
            Play_HideWarningDialog();
            console.log(e);
        }
    } else {
        PlayClip_TimeToJump += 2;
        try {
            Play_avplay.jumpBackward(PlayClip_TimeToJump * -1000);
        } catch (e) {
            Play_HideWarningDialog();
            console.log(e);
        }
    }

    PlayClip_jumpCount = 0;
    PlayClip_jumpCountMin = -12;
    PlayClip_jumpCountMax = 12;
    PlayClip_IsJumping = false;
    if (!Play_isIdleOrPlaying()) Play_avplay.play();
}

function PlayClip_jumpCancel() {
    PlayClip_TimeToJump = 0;
    PlayClip_jumpCountMin = -12;
    PlayClip_jumpCountMax = 12;
    Play_showWarningDialog(STR_JUMP_CANCEL);
    window.setTimeout(function() {
        PlayClip_IsJumping = false;
    }, 1500);
}

function PlayClip_jumpStart() {
    window.clearTimeout(PlayClip_JumpID);
    PlayClip_IsJumping = true;
    var time = '',
        jumpTotime = '';

    if (!PlayClip_jumpCount) {
        PlayClip_jumpCancel();
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

        jumpTotime = (Play_avplay.getCurrentTime() / 1000) + PlayClip_TimeToJump;
        if (jumpTotime < 0) {
            PlayClip_jumpCountMin = PlayClip_jumpCount;
            jumpTotime = 0;
        }
        jumpTotime = Play_timeMs(jumpTotime);
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

        jumpTotime = (Play_avplay.getCurrentTime() / 1000) + PlayClip_TimeToJump;
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
            jumpTotime = Play_timeMs(jumpTotime);
        }
    }

    Play_showWarningDialog(STR_JUMP_TIME + time + STR_JUMP_T0 + jumpTotime);
    PlayClip_JumpID = window.setTimeout(PlayClip_jump, 1500);
}

function PlayClip_OpenVod() {
    console.log("PlayClip_OpenVod");
}

function PlayClip_handleKeyDown(e) {
    if (PlayClip_state !== PlayClip_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_RETURN:
                if (Play_ExitDialogVisible()) {
                    Play_CleanHideExit();
                    Main_ready(PlayClip_shutdownStream);
                } else {
                    Play_showExitDialog();
                }
                break;
            default:
                break;
        }
    } else {
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
                } else if (!Play_BufferDialogVisible()) {
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
                } else if (!Play_BufferDialogVisible()) {
                    if (PlayClip_jumpCount < PlayClip_jumpCountMax) PlayClip_jumpCount++;
                    PlayClip_jumpStart();
                }
                break;
            case KEY_UP:
                if (Play_isEndDialogShown()) Play_EndTextClear();
                else if (!Play_isPanelShown()) PlayClip_showPanel();
                else {
                    if (PlayClip_qualityIndex > 0 && (!Play_Panelcouner)) {
                        PlayClip_qualityIndex--;
                        PlayClip_qualityDisplay();
                    }

                    PlayClip_clearHidePanel();
                    PlayClip_setHidePanel();
                }
                break;
            case KEY_DOWN:
                if (Play_isEndDialogShown()) Play_EndTextClear();
                else if (!Play_isPanelShown()) PlayClip_showPanel();
                else {
                    if (PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1 && (!Play_Panelcouner)) {
                        PlayClip_qualityIndex++;
                        PlayClip_qualityDisplay();
                    }

                    PlayClip_clearHidePanel();
                    PlayClip_setHidePanel();
                }
                break;
            case KEY_ENTER:
                if (Play_isEndDialogShown()) Play_EndEnterPressed(3);
                else if (Play_isPanelShown()) Play_PannelEnterPressed(3);
                else PlayClip_showPanel();
                break;
            case KEY_RETURN:
                if (Play_WarningDialogVisible() && PlayClip_IsJumping) {
                    window.clearTimeout(PlayClip_JumpID);
                    PlayClip_jumpCount = 0;
                    PlayClip_jumpCancel();
                } else if (Play_isControlsDialogShown()) Play_HideControlsDialog();
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
                if (!Play_isEndDialogShown()) Play_KeyPause(3);
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
                //if (!Play_isEndDialogShown()) PlayClip_Restart();
                break;
            default:
                break;
        }
    }
}