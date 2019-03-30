//Variable initialization
var PlayClip_PlayerTime = 0;
var PlayClip_streamCheck = null;
var PlayClip_PlayerCheckCount = 0;
var PlayClip_IsJumping = false;
var PlayClip_jumpCount = 0;
var PlayClip_TimeToJump = 0;
var PlayClip_isOn = false;
var PlayClip_loadingDataTry = 0;
var PlayClip_loadingDataTimeout = 2000;
var PlayClip_loadingDataTryMax = 5;
var PlayClip_quality = 'source';
var PlayClip_qualityPlaying = PlayClip_quality;
var PlayClip_qualityIndex = 0;
var PlayClip_qualities = [];
var PlayClip_playingUrl = '';
var PlayClip_offsettime = 0;
var PlayClip_currentTime = 0;
var PlayClip_state = 0;
var PlayClip_STATE_PLAYING = 1;
var PlayClip_HasVOD = false;
var PlayClip_Buffer = 4;
var PlayClip_PlayerCheckCounter = 0;
var PlayClip_PlayerCheckQualityChanged = false;
var PlayClip_PlayerCheckRun = false;

var PlayClip_jumpTimers = [0, 5];
var PlayClip_DurationSeconds = 0;
//Variable initialization end

function PlayClip_Start() {
    Play_showBufferDialog();
    Play_HideEndDialog();
    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);
    Main_textContent("stream_info_name", Main_values.Main_selectedChannelDisplayname);
    Main_innerHTML("stream_info_title", ChannelClip_title);
    Main_innerHTML("stream_info_game", ChannelClip_game + ', ' + ChannelClip_views + ', ' + ChannelClip_language);
    Main_textContent("stream_live_icon", ChannelClip_createdAt);
    Main_textContent('progress_bar_duration', Play_timeS(PlayClip_DurationSeconds));
    Play_DefaultjumpTimers = PlayClip_jumpTimers;
    PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);

    Main_values.Play_isHost = false;

    Main_textContent('progress_bar_current_time', Play_timeS(0));
    Main_textContent("stream_live_time", '');
    Main_textContent("stream_watching_time", '');
    PlayClip_HasVOD = Main_values.ChannelVod_vodId !== null;
    Chat_title = STR_CLIP + '.';
    if (PlayClip_HasVOD) {
        Chat_offset = ChannelVod_vodOffset;
        Chat_Init();
    } else Chat_NoVod();
    Main_ShowElement('progress_bar_div');
    PlayClip_SetOpenVod();
    Play_offsettimeMinus = 0;
    Main_ShowElement('scene_channel_panel_bottom');

    Main_ShowElement('chat_box');
    Main_HideElement('chat_frame');

    PlayClip_PlayerCheckCounter = 0;
    PlayClip_PlayerCheckRun = false;
    Play_PlayerPanelOffset = -13;
    PlayClip_state = 0;
    PlayClip_offsettime = 0;
    PlayClip_currentTime = 0;
    PlayClip_qualityIndex = 2;
    Play_EndSet(3);
    Play_IsWarning = false;
    Play_IconsResetFocus();

    if (AddUser_UserIsSet()) {
        AddCode_PlayRequest = true;
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
        AddCode_CheckFallow();
    } else Play_hideFallow();

    document.addEventListener('visibilitychange', PlayClip_Resume, false);
    PlayClip_IsJumping = false;
    PlayClip_jumpCount = 0;
    PlayClip_TimeToJump = 0;
    PlayClip_isOn = true;

    PlayClip_loadData();
    document.body.removeEventListener("keyup", Main_handleKeyUp);
}

function PlayClip_loadData() {
    PlayClip_loadingDataTry = 0;
    PlayClip_loadingDataTimeout = 2000;
    PlayClip_loadDataRequest();
}

function PlayClip_loadDataRequest() {
    var theUrl = 'https://clips.twitch.tv/api/v2/clips/' + ChannelClip_playUrl + '/status';
    if (Main_Android) {

        var jsonOb = Android.mreadUrl(theUrl, Play_loadingDataTimeout, false, false, null);

        if (jsonOb) jsonOb = JSON.parse(jsonOb);
        else {
            PlayClip_loadDataError();
            return;
        }

        if (jsonOb.result === 200) {
            PlayClip_QualityGenerate(jsonOb.value);
        } else {
            PlayClip_loadDataError();
        }

    } else {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", proxyurl + theUrl, true);
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
    }
}

function PlayClip_loadDataError() {
    PlayClip_loadingDataTry++;
    if (PlayClip_loadingDataTry < PlayClip_loadingDataTryMax) {
        PlayClip_loadingDataTimeout += 250;
        PlayClip_loadDataRequest();
    } else {
        Play_HideBufferDialog();
        Play_PannelEndStart(3);
    }
}

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

    Play_BufferPercentage = 0;
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
    if (!Main_isReleased) console.log('PlayClip_onPlayer:', '\n' + '\n"' + PlayClip_playingUrl + '"\n');
    PlayClip_state = PlayClip_STATE_PLAYING;

    if (!Main_isReleased) console.log('PlayClip_onPlayer:', '\n' + '\n"' + Play_playingUrl + '"\n');
    if (Main_Android && PlayClip_isOn) Android.startVideo(PlayClip_playingUrl, 3);
    PlayClip_onPlayer();
}

function PlayClip_onPlayer() {
    if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();

    if (Main_Android) {
        PlayClip_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = 3;
        PlayClip_PlayerCheckQualityChanged = false;
        window.clearInterval(PlayClip_PlayerCheck);
        PlayClip_streamCheck = window.setInterval(PlayClip_PlayerCheck, Play_PlayerCheckInterval);
    }
}

function PlayClip_Resume() {
    if (document.hidden) {
        PlayClip_shutdownStream();
        window.clearInterval(PlayClip_streamCheck);
    }
}

// On clips avplay call oncurrentplaytime it 500ms so call PlayClip_PlayerCheck it 1500 works well
function PlayClip_PlayerCheck() {
    if (Main_Android) PlayClip_currentTime = Android.gettime();
    if (PlayClip_PlayerTime === PlayClip_currentTime && !Play_isNotplaying()) {
        PlayClip_PlayerCheckCount++;
        if (PlayClip_PlayerCheckCount > (Play_PlayerCheckTimer + (Play_BufferPercentage > 90 ? 1 : 0))) {

            //Don't change the first time only retry
            if (PlayClip_PlayerCheckQualityChanged && PlayClip_PlayerCheckRun && (PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1)) PlayClip_qualityIndex++;
            else if (!PlayClip_PlayerCheckQualityChanged && PlayClip_PlayerCheckRun) PlayClip_PlayerCheckCounter++;

            if (!navigator.onLine) Play_EndStart(false, 3);
            else if (PlayClip_PlayerCheckCounter > 1) Play_CheckConnection(PlayClip_PlayerCheckCounter, 3, PlayClip_DropOneQuality);
            else {
                PlayClip_qualityDisplay();
                // if (!PlayClip_offsettime) PlayClip_offsettime = Play_videojs.getCurrentTime();
                PlayClip_qualityChanged();
                PlayClip_PlayerCheckRun = true;
            }

        } // else we try for too long let the listener onerror catch it
    } else {
        PlayClip_PlayerCheckCounter = 0;
        PlayClip_PlayerCheckCount = 0;
        PlayClip_PlayerCheckRun = false;

    }

    PlayClip_PlayerTime = PlayClip_currentTime;
}

function PlayClip_DropOneQuality(ConnectionDrop) {

    if (!ConnectionDrop) {
        if (PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1) PlayClip_qualityIndex++;
        else {
            Play_EndStart(false, 3);
            return;
        }
    }

    PlayClip_PlayerCheckCounter = 0;
    PlayClip_qualityDisplay();
    //if (!PlayClip_offsettime) PlayClip_offsettime = Play_videojs.getCurrentTime();
    PlayClip_qualityChanged();
    PlayClip_PlayerCheckRun = true;
}

function PlayClip_shutdownStream() {
    if (PlayClip_isOn) {
        PlayClip_PreshutdownStream();
        Play_CleanHideExit();
        Play_exitMain();
    }
}

function PlayClip_PreshutdownStream() {
    if (Main_Android) Android.stopVideo(3);
    PlayClip_isOn = false;
    Chat_Clear();
    Play_ClearPlayer();
    document.body.removeEventListener("keydown", PlayClip_handleKeyDown);
    document.removeEventListener('visibilitychange', PlayClip_Resume);
    PlayClip_hidePanel();
    document.getElementById('scene2_pannel_0').style.display = 'none';
    document.getElementById("scene2_pannel_1").style.width = '30%';
    document.getElementById("quality_name").style.width = '77%';
    document.getElementById("quality_name").style.fontSize = '87.5%';
    ChannelVod_vodOffset = 0;

    window.clearInterval(PlayClip_streamCheck);
}

function PlayClip_hidePanel() {
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_addToJump = 0;
    Play_clearHidePanel();
    PlayClip_quality = PlayClip_qualityPlaying;
    document.getElementById("scene_channel_panel").style.opacity = "0";
    if (Main_Android) PlayVod_ProgresBarrUpdate((Android.gettime() / 1000), PlayClip_DurationSeconds, true);
    Main_innerHTML('progress_bar_jump_to', STR_SPACE);
    document.getElementById('progress_bar_steps').style.display = 'none';
    Play_ChatPosition();
    window.clearInterval(PlayVod_RefreshProgressBarrID);
}

function PlayClip_showPanel() {
    PlayClip_RefreshProgressBarr();
    Play_clock();
    PlayVod_RefreshProgressBarrID = window.setInterval(PlayClip_RefreshProgressBarr, 1000);
    Play_CleanHideExit();
    PlayVod_IconsBottonResetFocus();
    PlayClip_qualityIndexReset();
    PlayClip_qualityDisplay();
    document.getElementById("scene_channel_panel").style.opacity = "1";
    Play_ChatPosition();
    PlayClip_setHidePanel();
}

function PlayClip_RefreshProgressBarr() {
    if (Main_Android) PlayVod_ProgresBarrUpdate((Android.gettime() / 1000), PlayClip_DurationSeconds, !PlayVod_IsJumping);
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
    if (PlayClip_getQualitiesCount() === 1) {
        document.getElementById("quality_arrow_up").style.opacity = "0";
        document.getElementById("quality_arrow_down").style.opacity = "0";
    } else if (!PlayClip_qualityIndex) {
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

    if (PlayClip_quality.indexOf('source') !== -1) Main_textContent("quality_name", PlayClip_quality.replace("source", STR_SOURCE));
    else Main_textContent("quality_name", PlayClip_quality);
}

function PlayClip_setHidePanel() {
    Play_PanelHideID = window.setTimeout(PlayClip_hidePanel, 5000 + PlayVod_ProgressBaroffset); // time in ms
}

function PlayClip_SetOpenVod() {
    document.getElementById("scene2_pannel_1").style.width = '18%';
    document.getElementById("quality_name").style.width = '60%';
    document.getElementById("quality_name").style.fontSize = '72%';
    Main_textContent("open_vod_text", (PlayClip_HasVOD ? STR_OPEN_BROADCAST : STR_NO_BROADCAST));
    document.getElementById('scene2_pannel_0').style.display = 'inline-block';
}

function PlayClip_OpenVod() {
    if (PlayClip_HasVOD) {
        Main_values.vodOffset = ChannelVod_vodOffset;
        PlayClip_PreshutdownStream();
        document.body.addEventListener("keydown", PlayVod_handleKeyDown, false);
        Play_IconsResetFocus();
        PlayVod_Start();
    } else {
        Play_IsWarning = true;
        Play_showWarningDialog(STR_NO_BROADCAST_WARNING);
        window.setTimeout(function() {
            Play_IsWarning = false;
            Play_HideWarningDialog();
        }, 2000);
    }
}

function PlayClip_handleKeyDown(e) {
    if (PlayClip_state !== PlayClip_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_GREEN:
                if (!Main_isReleased) window.location.reload(true); // refresh the app from live
                break;
            case KEY_RETURN:
                if (Play_ExitDialogVisible()) {
                    Play_CleanHideExit();
                    PlayClip_shutdownStream();
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
                if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown()) {
                    Play_ChatPositions++;
                    Play_ChatPosition();
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY) {
                        Play_IconsRemoveFocus();
                        Play_Panelcounter++;
                        if (Play_Panelcounter > 5) Play_Panelcounter = 0;
                        Play_IconsAddFocus();
                    } else {
                        PlayVod_jumpStart(-1, PlayClip_DurationSeconds);
                        PlayVod_ProgressBaroffset = 2500;
                    }
                    PlayClip_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter--;
                    if (Play_Endcounter < 0) Play_Endcounter = 3;
                    Play_EndIconsAddFocus();
                } else PlayClip_showPanel();
                break;
            case KEY_RIGHT:
                if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible()) {
                    if (!Play_isChatShown() && !Play_isEndDialogVisible()) {
                        Play_showChat();
                        Play_ChatEnable = true;
                    } else {
                        Play_hideChat();
                        Play_ChatEnable = false;
                    }
                    Main_setItem('ChatEnable', Play_ChatEnable ? 'true' : 'false');
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY) {
                        Play_IconsRemoveFocus();
                        Play_Panelcounter--;
                        if (Play_Panelcounter < 0) Play_Panelcounter = 5;
                        Play_IconsAddFocus();
                    } else {
                        PlayVod_jumpStart(1, PlayClip_DurationSeconds);
                        PlayVod_ProgressBaroffset = 2500;
                    }
                    PlayClip_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = 0;
                    Play_EndIconsAddFocus();
                } else PlayClip_showPanel();
                break;
            case KEY_UP:
                if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (Play_isPanelShown()) {
                    if (PlayVod_PanelY && Play_Panelcounter !== 1) {
                        PlayVod_PanelY--;
                        PlayVod_IconsBottonFocus();
                    } else if (PlayClip_qualityIndex > 0 && Play_Panelcounter === 1) {
                        PlayClip_qualityIndex--;
                        PlayClip_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    PlayClip_setHidePanel();
                } else if (Play_isFullScreen && Play_isChatShown()) {
                    Play_ChatSizeValue++;
                    if (Play_ChatSizeValue > 4) {
                        Play_ChatSizeValue = 1;
                        Play_ChatPositionConvert(false);
                    } else if (Play_ChatSizeValue === 4) Play_ChatPositionConvert(true);
                    Play_ChatSize(true);
                } else PlayClip_showPanel();
                break;
            case KEY_DOWN:
                if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (Play_isPanelShown()) {
                    if (!PlayVod_PanelY) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else if (PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1 && Play_Panelcounter === 1) {
                        PlayClip_qualityIndex++;
                        PlayClip_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    PlayClip_setHidePanel();
                } else if (Play_isFullScreen && Play_isChatShown()) {
                    Play_ChatBackground += 0.05;
                    if (Play_ChatBackground > 1.05) Play_ChatBackground = 0.05;
                    Play_ChatBackgroundChange(true);
                } else PlayClip_showPanel();
                break;
            case KEY_ENTER:
                if (Play_isEndDialogVisible()) Play_EndDialogPressed(3);
                else if (Play_isPanelShown()) {
                    if (!PlayVod_PanelY) {
                        Play_clearHidePanel();
                        PlayClip_setHidePanel();
                        if (PlayVod_addToJump) PlayVod_jump();
                    } else Play_BottomOptionsPressed(3);

                } else PlayClip_showPanel();
                break;
            case KEY_RETURN:
                if (Play_isControlsDialogShown()) Play_HideControlsDialog();
                else if (Play_isPanelShown()) PlayClip_hidePanel();
                else {
                    if (Play_ExitDialogVisible()) {
                        Play_CleanHideExit();
                        PlayClip_shutdownStream();
                    } else {
                        Play_showExitDialog();
                    }
                }
                break;
            case KEY_PLAY:
            case KEY_PAUSE:
            case KEY_PLAYPAUSE:
                if (PlayClip_HasVOD && !Main_values.Play_ChatForceDisable) {
                    if (Play_isNotplaying()) Chat_Play(Chat_Id);
                    else Chat_Pause();
                }
                if (!Play_isEndDialogVisible()) Play_KeyPause(3);
                break;
            case KEY_INFO:
            case KEY_CHANNELGUIDE:
                if (Play_isFullScreen) {
                    if (!Play_isChatShown() && !Play_isEndDialogVisible()) {
                        Play_showChat();
                        Play_ChatEnable = true;
                    } else {
                        Play_hideChat();
                        Play_ChatEnable = false;
                    }
                    Main_setItem('ChatEnable', Play_ChatEnable ? 'true' : 'false');
                }
                break;
            case KEY_CHANNELUP:
                if (Play_isFullScreen && Play_isChatShown()) {
                    Play_ChatPositions++;
                    Play_ChatPosition();
                }
                break;
            case KEY_CHANNELDOWN:
                if (Play_isFullScreen && Play_isChatShown()) {
                    Play_ChatPositions--;
                    Play_ChatPosition();
                }
                break;
            case KEY_YELLOW:
                if (!Play_isEndDialogVisible()) Play_showControlsDialog();
                break;
            case KEY_GREEN:
                //if (!Main_isReleased) window.location.reload(true); // refresh the app from live
                if (!PlayClip_HasVOD) return;
                Main_values.Play_ChatForceDisable = !Main_values.Play_ChatForceDisable;
                if (Main_values.Play_ChatForceDisable) Chat_Disable();
                else if (PlayClip_HasVOD) {
                    Chat_offset = ChannelVod_vodOffset;
                    Chat_Init();
                }
                Main_SaveValues();
                break;
            case KEY_RED:
                Play_isFullScreen = !Play_isFullScreen;
                Play_SetFullScreen(Play_isFullScreen);
                break;
            case KEY_BLUE:
                Play_OpenSearch(3);
                break;
            default:
                break;
        }
    }
}