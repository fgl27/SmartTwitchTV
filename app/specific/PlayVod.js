//Variable initialization
var PlayVod_PanelHideID = null;
var PlayVod_quality = 'source';
var PlayVod_qualityPlaying = PlayVod_quality;

var PlayVod_STATE_LOADING_TOKEN = 0;
var PlayVod_STATE_LOADING_PLAYLIST = 1;
var PlayVod_STATE_PLAYING = 2;
var PlayVod_state = PlayVod_STATE_LOADING_TOKEN;

var PlayVod_streamInfoTimer = null;
var PlayVod_tokenResponse = 0;
var PlayVod_playlistResponse = 0;
var PlayVod_playingTry = 0;

var PlayVod_playingUrl = '';
var PlayVod_qualities = [];
var PlayVod_qualityIndex = 0;

var PlayVod_loadingDataTry = 0;
var PlayVod_loadingDataTryMax = 5;
var PlayVod_isOn = false;
var PlayVod_offsettime = 0;

var PlayVod_loadingInfoDataTry = 0;
var PlayVod_loadingInfoDataTryMax = 5;
var PlayVod_loadingInfoDataTimeout = 10000;

var PlayVod_PlayerTime = 0;
var PlayVod_streamCheck = null;
var PlayVod_PlayerCheckCount = 0;
var PlayVod_PlayerCheckQualityChanged = false;
var PlayVod_Playing = false;
var Play_jumping = false;
var PlayVod_JumpID;
var PlayVod_updateStreamInfId;
var PlayVod_TimeToJump = 0;
var PlayVod_IsJumping = false;
var PlayVod_jumpCount = 0;
var PlayVod_jumpCountMin = -16;
var PlayVod_jumpCountMax = 16;
var PlayVod_loadingDataTimeout = 3500;
var PlayVod_qualitiesFound = false;
var PlayVod_currentTime = 0;
var PlayVod_JustStartPlaying = true;
var PlayVod_bufferingcomplete = false;
var PlayVod_vodOffset = 0;
var PlayVod_Buffer = 4;
var PlayVod_QualityChangedCounter = 0;
//Variable initialization end

function PlayVod_Start() {
    Play_HideEndDialog();
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    Play_showBufferDialog();
    if (PlayVod_vodOffset) { // this is a vod comming from a clip
        PlayVod_PrepareLoad();
        PlayVod_updateVodInfo();
    } else {
        if (!Vod_isVod) {
            Play_LoadLogo(document.getElementById('stream_info_icon'), Main_selectedChannelLogo);
            Chat_Init();
        } else {
            PlayVod_PrepareLoad();
            PlayVod_updateStreamInfo();
        }
        Main_textContent("stream_info_name", Main_selectedChannelDisplayname);
        Main_textContent("stream_info_title", ChannelVod_title);
        Main_innerHTML("stream_info_game", ChannelVod_views + ', [' + (ChannelVod_language).toUpperCase() + ']');
        Main_textContent("stream_live_icon", ChannelVod_createdAt);
        Main_textContent("stream_live_time", ChannelVod_Duration);
    }
    Main_empty('dialog_buffer_play_percentage');
    if (Main_UserName !== '') {
        AddCode_PlayRequest = true;
        AddCode_CheckFallow();
    } else Play_hideFallow();

    Play_offsettimeMinus = 0;
    Main_textContent("stream_watching_time", STR_WATCHING + Play_timeMs(0));

    Main_ShowElement('chat_box');
    Main_HideElement('chat_frame');

    PlayVod_currentTime = 0;
    PlayVod_qualitiesFound = false;
    Play_IsWarning = false;
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_tokenResponse = 0;
    PlayVod_playlistResponse = 0;
    PlayVod_playingTry = 0;
    PlayVod_jumpCountMin = -16;
    PlayVod_jumpCountMax = 16;
    PlayVod_state = PlayVod_STATE_LOADING_TOKEN;
    document.addEventListener('visibilitychange', PlayVod_Resume, false);
    PlayVod_Playing = false;
    Play_jumping = false;
    PlayVod_isOn = true;
    PlayVod_loadData();
    Play_EndSet(2);
    document.body.removeEventListener("keyup", Main_handleKeyUp);
}

function PlayVod_PrepareLoad() {
    PlayVod_loadingInfoDataTry = 0;
    PlayVod_loadingInfoDataTryMax = 5;
    PlayVod_loadingInfoDataTimeout = 10000;
}

function PlayVod_updateStreamInfo() {
    try {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users?login=' + Main_selectedChannel, true);
        xmlHttp.timeout = PlayVod_loadingInfoDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    var users = JSON.parse(xmlHttp.responseText).users[0];
                    if (users !== undefined) {
                        Main_selectedChannelLogo = users.logo;
                        Main_selectedChannel_id = users._id;
                        Chat_Init();
                    } else {
                        Main_selectedChannelLogo = IMG_404_LOGO;
                        Main_selectedChannel_id = '';
                    }
                    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_selectedChannelLogo);
                    return;
                } else {
                    PlayVod_updateStreamInfoError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        PlayVod_updateStreamInfoError();
    }
}

function PlayVod_updateStreamInfoError() {
    PlayVod_loadingInfoDataTry++;
    if (PlayVod_loadingInfoDataTry < PlayVod_loadingInfoDataTryMax) {
        PlayVod_loadingInfoDataTimeout += 2000;
        PlayVod_updateStreamInfo();
    } else PlayVod_updateStreamInfId = window.setTimeout(PlayVod_updateStreamInfo, 2500);
}

function PlayVod_updateVodInfo() {
    try {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/videos/' + ChannelVod_vodId, true);
        xmlHttp.timeout = PlayVod_loadingInfoDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    PlayVod_updateVodInfoPannel(xmlHttp.responseText);
                    return;
                } else {
                    PlayVod_updateVodInfoError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        PlayVod_updateVodInfoError();
    }
}

function PlayVod_updateVodInfoError() {
    PlayVod_loadingInfoDataTry++;
    if (PlayVod_loadingInfoDataTry < PlayVod_loadingInfoDataTryMax) {
        PlayVod_loadingInfoDataTimeout += 2000;
        PlayVod_updateVodInfo();
    }
}

function PlayVod_updateVodInfoPannel(response) {
    response = JSON.parse(response);
    ChannelVod_DurationSeconds = parseInt(response.length);
    Main_textContent("stream_info_title", response.title);
    Main_innerHTML("stream_info_game", STR_STARTED + STR_PLAYING + response.game +
        ', ' + Main_addCommas(response.views) + STR_VIEWS + ', [' + (response.language).toUpperCase() + ']');
    Main_textContent("stream_live_icon", STR_STREAM_ON + Main_videoCreatedAt(response.created_at));
    Main_textContent("stream_live_time", STR_DURATION + Play_timeS(ChannelVod_DurationSeconds));
}

function PlayVod_Resume() {
    if (document.hidden) {
        Play_avplay.pause();
        PlayVod_offsettime = Play_avplay.getCurrentTime();
        Play_ClearPlayer();
        window.clearInterval(PlayVod_streamCheck);
        Play_clearPause();
    } else {
        PlayVod_isOn = true;
        Main_ShowElement('scene2');
        Main_HideElement('scene1');
        Play_clearPause();
        Play_showBufferDialog();
        PlayVod_Playing = false;
        PlayVod_onPlayer();
        Play_EndSet(2);
    }
}

function PlayVod_loadData() {
    PlayVod_loadingDataTry = 0;
    PlayVod_loadingDataTimeout = 3500;
    PlayVod_loadDataRequest();
}

function PlayVod_loadDataRequest() {
    try {
        var xmlHttp = new XMLHttpRequest();

        var theUrl;
        if (PlayVod_state === PlayVod_STATE_LOADING_TOKEN) {
            theUrl = 'https://api.twitch.tv/api/vods/' + ChannelVod_vodId + '/access_token' + (AddCode_OauthToken !== '' ? '?oauth_token=' + AddCode_OauthToken : '');
        } else {
            theUrl = 'http://usher.twitch.tv/vod/' + ChannelVod_vodId +
                '.m3u8?player=twitchweb&type=any&nauthsig=' + PlayVod_tokenResponse.sig + '&nauth=' +
                escape(PlayVod_tokenResponse.token) + '&allow_source=true&allow_audi_only=true&' + Math.round(Math.random() * 1e7);
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = PlayVod_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        PlayVod_loadingDataTry = 0;
                        if (PlayVod_isOn) PlayVod_loadDataSuccess(xmlHttp.responseText);
                    } catch (err) {}

                } else PlayVod_loadDataError();
            }
        };
        xmlHttp.send(null);
    } catch (error) {
        PlayVod_loadDataError();
    }
}

function PlayVod_loadDataError() {
    if (PlayVod_isOn) {
        if (JSON.parse(PlayVod_tokenResponse.token).chansub.restricted_bitrates.length !== 0) {
            PlayVod_loadDataCheckSub();
            return;
        }

        PlayVod_loadingDataTry++;
        if (PlayVod_loadingDataTry < PlayVod_loadingDataTryMax) {
            PlayVod_loadingDataTimeout += 500;
            PlayVod_loadDataRequest();
        } else {
            Play_HideBufferDialog();
            Play_PannelEndStart(2);
        }
    }
}

function PlayVod_loadDataSuccess(responseText) {
    if (PlayVod_state === PlayVod_STATE_LOADING_TOKEN) {
        PlayVod_tokenResponse = JSON.parse(responseText);
        PlayVod_state = PlayVod_STATE_LOADING_PLAYLIST;
        PlayVod_loadData();
    } else if (PlayVod_state === PlayVod_STATE_LOADING_PLAYLIST) {
        PlayVod_playlistResponse = responseText;
        PlayVod_qualities = Play_extractQualities(PlayVod_playlistResponse);
        PlayVod_state = Play_STATE_PLAYING;
        if (PlayVod_isOn) PlayVod_qualityChanged();
    }
}

function PlayVod_loadDataCheckSub() {
    if (AddCode_OauthToken !== '') AddCode_CheckSub();
    else {
        Play_HideBufferDialog();
        Play_showWarningDialog(STR_IS_SUB_ONLY + STR_IS_SUB_NOOAUTH);
        window.setTimeout(function() {
            if (PlayVod_isOn) PlayVod_shutdownStream();
        }, 4000);
    }
}

function PlayVod_NotSub() {
    Play_HideBufferDialog();
    Play_showWarningDialog(STR_IS_SUB_ONLY + STR_IS_SUB_NOT_SUB);
    window.setTimeout(function() {
        if (PlayVod_isOn) PlayVod_shutdownStream();
    }, 4000);
}

function PlayVod_isSub() {
    Play_HideBufferDialog();
    Play_showWarningDialog(STR_IS_SUB_ONLY + STR_IS_SUB_IS_SUB);
    window.setTimeout(function() {
        if (PlayVod_isOn) PlayVod_shutdownStream();
    }, 4000);
}

function PlayVod_qualityChanged() {
    PlayVod_qualityIndex = 0;
    PlayVod_playingUrl = PlayVod_qualities[0].url;
    if (PlayVod_quality.indexOf("source") !== -1) PlayVod_quality = "source";
    for (var i = 0; i < PlayVod_getQualitiesCount(); i++) {
        if (PlayVod_qualities[i].id === PlayVod_quality) {
            PlayVod_qualityIndex = i;
            PlayVod_playingUrl = PlayVod_qualities[i].url;
            break;
        } else if (PlayVod_qualities[i].id.indexOf(PlayVod_quality) !== -1) { //make shore to set a value before break out
            PlayVod_qualityIndex = i;
            PlayVod_playingUrl = PlayVod_qualities[i].url;
        }
    }

    Play_BufferPercentage = 0;
    PlayVod_qualityPlaying = PlayVod_quality;
    if (PlayVod_isOn) PlayVod_onPlayer();
}

var PlayVod_listener = {
    onbufferingstart: function() {
        Play_showBufferDialog();
        PlayVod_bufferingcomplete = false;
        PlayVod_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = PlayVod_Buffer;
        PlayVod_PlayerCheckQualityChanged = true;
        PlayVod_QualityChangedCounter = 0;
    },
    onbufferingcomplete: function() {
        Play_HideBufferDialog();
        PlayVod_bufferingcomplete = true;
        Main_empty('dialog_buffer_play_percentage');
        // reset the values after using
        PlayVod_vodOffset = 0;
        PlayVod_offsettime = 0;
        PlayVod_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = PlayVod_Buffer;
        PlayVod_PlayerCheckQualityChanged = true;
        PlayVod_QualityChangedCounter = 0;
    },
    onbufferingprogress: function(percent) {
        if (percent < 5) PlayVod_PlayerCheckCount = 0;

        Play_PlayerCheckTimer = PlayVod_Buffer;
        PlayVod_PlayerCheckQualityChanged = true;
        PlayVod_QualityChangedCounter = 0;
        //percent has a -2 offset and goes up to 98
        if (percent < 98) {
            Play_BufferPercentage = percent;
            Main_textContent("dialog_buffer_play_percentage", percent + 3);
            if (!Play_BufferDialogVisible()) Play_showBufferDialog();
        } else {
            Play_BufferPercentage = 0;
            Play_HideBufferDialog();
            Play_bufferingcomplete = true;
            Main_empty('dialog_buffer_play_percentage');
            // reset the values after using
            PlayVod_vodOffset = 0;
            PlayVod_offsettime = 0;
        }
    },
    oncurrentplaytime: function(currentTime) {
        if (PlayVod_currentTime !== currentTime) PlayVod_updateCurrentTime(currentTime);
    },
    onstreamcompleted: function() {
        Play_PannelEndStart(2);
    },
    onerror: function(eventType) {
        if (eventType === "PLAYER_ERROR_CONNECTION_FAILED" || eventType === "PLAYER_ERROR_INVALID_URI")
            Play_PannelEndStart(2);
    }
};

function PlayVod_onPlayer() {
    Play_showBufferDialog();
    if (!Main_isReleased) console.log('PlayVod_onPlayer:', '\n' + '\n' + PlayVod_playingUrl + '\n');
    try {
        Play_avplay.stop();
        Play_avplay.open(PlayVod_playingUrl);

        if (PlayVod_vodOffset > ChannelVod_DurationSeconds) PlayVod_vodOffset = 0;

        if (PlayVod_vodOffset) {
            Chat_loadChatOffset(PlayVod_vodOffset);
            Play_avplay.seekTo(PlayVod_vodOffset * 1000);
        } else if (PlayVod_offsettime > 0 && PlayVod_offsettime !== Play_avplay.getCurrentTime()) {
            Play_avplay.seekTo(PlayVod_offsettime - 3500); // minor delay on the seekTo to show were it stop or at least before
            Play_clearPause();
        }

        Play_avplay.setBufferingParam("PLAYER_BUFFER_FOR_PLAY", "PLAYER_BUFFER_SIZE_IN_SECOND", PlayVod_Buffer);
        Play_avplay.setBufferingParam("PLAYER_BUFFER_FOR_RESUME", "PLAYER_BUFFER_SIZE_IN_SECOND", PlayVod_Buffer);
        Play_avplay.setListener(PlayVod_listener);
        if (Main_Is4k && !Play_4K_ModeEnable) {
            Play_avplay.setStreamingProperty("SET_MODE_4K", "TRUE");
            Play_4K_ModeEnable = true;
        }

        Play_PlayerCheckTimer = 2;
        PlayVod_PlayerCheckQualityChanged = false;
    } catch (e) {
        console.log(e);
    }

    PlayVod_JustStartPlaying = true;
    Play_avplay.prepareAsync(function() {
        Play_avplay.play();
        PlayVod_Playing = true;
    });

    Main_ready(function() {
        Play_HideWarningDialog();
        PlayVod_hidePanel();
        if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
        window.clearInterval(PlayVod_streamCheck);
        PlayVod_PlayerCheckCount = 0;
        PlayVod_streamCheck = window.setInterval(PlayVod_PlayerCheck, Play_PlayerCheckInterval);

    });
}

function PlayVod_PlayerCheck() {
    if (Play_isIdleOrPlaying() && PlayVod_PlayerTime === PlayVod_currentTime) {
        PlayVod_PlayerCheckCount++;
        if (PlayVod_PlayerCheckCount > (Play_PlayerCheckTimer + (Play_BufferPercentage > 90 ? 1 : 0))) {
            if ((PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1) && (PlayVod_QualityChangedCounter < Play_QualityChangedCounterMax)) {
                if (PlayVod_PlayerCheckQualityChanged) PlayVod_qualityIndex++; //Don't change the first time only retry
                PlayVod_qualityDisplay();
                if (!PlayVod_offsettime) PlayVod_offsettime = Play_avplay.getCurrentTime();
                PlayVod_qualityChanged();
                PlayVod_QualityChangedCounter++;
            } else {
                Play_avplay.stop();
                Play_PannelEndStart(2); //staled for too long close the player
            }
        }
    } else PlayVod_PlayerCheckCount = 0;
    PlayVod_PlayerTime = PlayVod_currentTime;
}

function PlayVod_updateCurrentTime(currentTime) {
    PlayVod_currentTime = currentTime;

    if (!PlayVod_IsJumping && !Play_IsWarning && Play_WarningDialogVisible()) Play_HideWarningDialog();
    if (PlayVod_bufferingcomplete && Play_BufferDialogVisible()) Play_HideBufferDialog();

    if (Play_isPanelShown()) Main_textContent("stream_watching_time", STR_WATCHING + Play_timeMs(PlayVod_currentTime));
}

function PlayVod_shutdownStream() {
    if (PlayVod_isOn) {
        PlayVod_PreshutdownStream();
        Play_exitMain();
    }
}

function PlayVod_PreshutdownStream() {
    window.clearInterval(PlayVod_updateStreamInfId);
    Chat_Clear();
    Play_ClearPlayer();
    PlayVod_ClearVod();
    PlayVod_isOn = false;
    Vod_isVod = false;
}

function PlayVod_ClearVod() {
    PlayVod_Playing = false;
    document.body.removeEventListener("keydown", PlayVod_handleKeyDown);
    document.removeEventListener('visibilitychange', PlayVod_Resume);
    PlayVod_offsettime = 0;
    PlayVod_vodOffset = 0;
    window.clearInterval(PlayVod_streamInfoTimer);
    window.clearInterval(PlayVod_streamCheck);
    ChannelVod_DurationSeconds = 0;
}

function PlayVod_hidePanel() {
    PlayVod_clearHidePanel();
    document.getElementById("scene_channel_panel").style.opacity = "0";
    PlayVod_quality = PlayVod_qualityPlaying;
}

function PlayVod_showPanel() {
    Play_IconsResetFocus();
    PlayVod_qualityIndexReset();
    Play_clock();
    Play_CleanHideExit();
    Main_textContent("stream_watching_time", STR_WATCHING + Play_timeMs(PlayVod_currentTime));
    PlayVod_qualityDisplay();
    document.getElementById("scene_channel_panel").style.opacity = "1";
    PlayVod_setHidePanel();
}

function PlayVod_clearHidePanel() {
    window.clearTimeout(PlayVod_PanelHideID);
}

function PlayVod_setHidePanel() {
    PlayVod_PanelHideID = window.setTimeout(PlayVod_hidePanel, 5000); // time in ms
}

function PlayVod_qualityIndexReset() {
    PlayVod_qualityIndex = 0;
    for (var i = 0; i < PlayVod_getQualitiesCount(); i++) {
        if (PlayVod_qualities[i].id === PlayVod_quality) {
            PlayVod_qualityIndex = i;
            break;
        } else if (PlayVod_qualities[i].id.indexOf(PlayVod_quality) !== -1) { //make shore to set a value before break out
            PlayVod_qualityIndex = i;
        }
    }
}

function PlayVod_qualityDisplay() {
    if (!PlayVod_qualityIndex) {
        document.getElementById("quality_arrow_up").style.opacity = "0.2";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    } else if (PlayVod_qualityIndex === PlayVod_getQualitiesCount() - 1) {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "0.2";
    } else {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    }

    PlayVod_quality = PlayVod_qualities[PlayVod_qualityIndex].id;
    if (PlayVod_quality.indexOf('source') !== -1) Main_textContent("quality_name", PlayVod_quality.replace("source", STR_SOURCE) + PlayVod_qualities[PlayVod_qualityIndex].band);
    else Main_textContent("quality_name", PlayVod_quality + PlayVod_qualities[PlayVod_qualityIndex].band);
}

function PlayVod_getQualitiesCount() {
    return PlayVod_qualities.length;
}

function PlayVod_jump() {
    if (!Play_isEndDialogShown()) {
        if (Play_isIdleOrPlaying()) Play_avplay.pause();

        PlayVod_PlayerCheckQualityChanged = false;
        if (PlayVod_TimeToJump > 0) {
            try {
                Play_avplay.jumpForward(PlayVod_TimeToJump * 1000);
            } catch (e) {
                Play_HideWarningDialog();
                console.log(e);
            }
        } else {
            try {
                Play_avplay.jumpBackward(PlayVod_TimeToJump * -1000);
            } catch (e) {
                Play_HideWarningDialog();
                console.log(e);
            }
        }

        Chat_loadChatOffset((PlayVod_currentTime / 1000) + PlayVod_TimeToJump);
        if (!Play_isIdleOrPlaying()) Play_avplay.play();
    }
    PlayVod_jumpCount = 0;
    PlayVod_jumpCountMin = -16;
    PlayVod_jumpCountMax = 16;
    PlayVod_IsJumping = false;
    Play_clearPause();
}

function PlayVod_jumpCancel() {
    PlayVod_TimeToJump = 0;
    PlayVod_jumpCountMin = -16;
    PlayVod_jumpCountMax = 16;
    Play_showWarningDialog(STR_JUMP_CANCEL);
    PlayVod_JumpID = window.setTimeout(function() {
        PlayVod_IsJumping = false;
    }, 1500);
}

function PlayVod_jumpStart() {
    window.clearTimeout(PlayVod_JumpID);
    PlayVod_IsJumping = true;
    var time = '',
        jumpTotime = '';

    if (!PlayVod_jumpCount) {
        PlayVod_jumpCancel();
        return;
    } else if (PlayVod_jumpCount < 0) {
        if (PlayVod_jumpCount === -1) PlayVod_TimeToJump = -5;
        else if (PlayVod_jumpCount === -2) PlayVod_TimeToJump = -10;
        else if (PlayVod_jumpCount === -3) PlayVod_TimeToJump = -15;
        else if (PlayVod_jumpCount === -4) PlayVod_TimeToJump = -30;
        else if (PlayVod_jumpCount === -5) PlayVod_TimeToJump = -60;
        else if (PlayVod_jumpCount === -6) PlayVod_TimeToJump = -120;
        else if (PlayVod_jumpCount === -7) PlayVod_TimeToJump = -300;
        else if (PlayVod_jumpCount === -8) PlayVod_TimeToJump = -600;
        else if (PlayVod_jumpCount === -9) PlayVod_TimeToJump = -900;
        else if (PlayVod_jumpCount === -10) PlayVod_TimeToJump = -1800;
        else if (PlayVod_jumpCount === -11) PlayVod_TimeToJump = -3600;
        else if (PlayVod_jumpCount === -12) PlayVod_TimeToJump = -7200;
        else if (PlayVod_jumpCount === -13) PlayVod_TimeToJump = -10800;
        else if (PlayVod_jumpCount === -14) PlayVod_TimeToJump = -14400;
        else if (PlayVod_jumpCount === -15) PlayVod_TimeToJump = -18000;
        else PlayVod_TimeToJump = -36000;

        time = PlayVod_TimeToJump + STR_SEC;
        if (PlayVod_TimeToJump < -30) time = (PlayVod_TimeToJump / 60) + STR_MIN;
        if (PlayVod_TimeToJump < -1800) time = ((PlayVod_TimeToJump / 60) / 60) + STR_HR;

        jumpTotime = (Play_avplay.getCurrentTime() / 1000) + PlayVod_TimeToJump;
        if (jumpTotime < 0) {
            PlayVod_jumpCountMin = PlayVod_jumpCount;
            jumpTotime = 0;
        }
        jumpTotime = Play_timeS(jumpTotime);
    } else {
        if (PlayVod_jumpCount === 1) PlayVod_TimeToJump = 5;
        else if (PlayVod_jumpCount === 2) PlayVod_TimeToJump = 10;
        else if (PlayVod_jumpCount === 3) PlayVod_TimeToJump = 15;
        else if (PlayVod_jumpCount === 4) PlayVod_TimeToJump = 30;
        else if (PlayVod_jumpCount === 5) PlayVod_TimeToJump = 60;
        else if (PlayVod_jumpCount === 6) PlayVod_TimeToJump = 120;
        else if (PlayVod_jumpCount === 7) PlayVod_TimeToJump = 300;
        else if (PlayVod_jumpCount === 8) PlayVod_TimeToJump = 600;
        else if (PlayVod_jumpCount === 9) PlayVod_TimeToJump = 900;
        else if (PlayVod_jumpCount === 10) PlayVod_TimeToJump = 1800;
        else if (PlayVod_jumpCount === 11) PlayVod_TimeToJump = 3600;
        else if (PlayVod_jumpCount === 12) PlayVod_TimeToJump = 7200;
        else if (PlayVod_jumpCount === 13) PlayVod_TimeToJump = 10800;
        else if (PlayVod_jumpCount === 14) PlayVod_TimeToJump = 14400;
        else if (PlayVod_jumpCount === 15) PlayVod_TimeToJump = 18000;
        else PlayVod_TimeToJump = 36000;

        time = PlayVod_TimeToJump + STR_SEC;
        if (PlayVod_TimeToJump > 30) time = (PlayVod_TimeToJump / 60) + STR_MIN;
        if (PlayVod_TimeToJump > 1800) time = ((PlayVod_TimeToJump / 60) / 60) + STR_HR;

        jumpTotime = (Play_avplay.getCurrentTime() / 1000) + PlayVod_TimeToJump;
        if (jumpTotime > ChannelVod_DurationSeconds) {
            PlayVod_TimeToJump = 0;
            PlayVod_jumpCountMax = PlayVod_jumpCount;
            Play_showWarningDialog(STR_JUMP_CANCEL + STR_JUMP_TIME_BIG);
            PlayVod_JumpID = window.setTimeout(function() {
                PlayVod_jumpCountMax = 16;
                PlayVod_jumpCount = 0;
                PlayVod_IsJumping = false;
            }, 1500);
            return;
        } else {
            jumpTotime = Play_timeS(jumpTotime);
        }

    }

    Play_showWarningDialog(STR_JUMP_TIME + time + STR_JUMP_T0 + jumpTotime);
    PlayVod_JumpID = window.setTimeout(PlayVod_jump, 1500);
}

function PlayVod_handleKeyDown(e) {
    if (PlayVod_state !== PlayVod_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_RETURN:
                if (Play_ExitDialogVisible()) {
                    Play_CleanHideExit();
                    Main_ready(PlayVod_shutdownStream);
                } else {
                    Play_showExitDialog();
                }
                break;
            default:
                break;
        }
    } else {
        switch (e.keyCode) {
            case KEY_INFO:
            case KEY_CHANNELGUIDE:
                if (!Play_isChatShown() && !Play_isEndDialogShown()) {
                    Play_showChat();
                    Play_ChatEnable = true;
                    localStorage.setItem('ChatEnable', 'true');
                } else {
                    Play_hideChat();
                    Play_ChatEnable = false;
                    localStorage.setItem('ChatEnable', 'false');
                }
                break;
            case KEY_CHANNELUP:
                if (Play_isChatShown()) {
                    Play_ChatPositions++;
                    Play_ChatPosition();
                }
                break;
            case KEY_CHANNELDOWN:
                if (Play_isChatShown()) {
                    Play_ChatPositions--;
                    Play_ChatPosition();
                }
                break;
            case KEY_LEFT:
                if (Play_isPanelShown()) {
                    Play_IconsRemoveFocus();
                    Play_Panelcouner++;
                    if (Play_Panelcouner > 5) Play_Panelcouner = 1;
                    Play_IconsAddFocus();
                    PlayVod_clearHidePanel();
                    PlayVod_setHidePanel();
                } else if (Play_isEndDialogShown()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter--;
                    if (Play_Endcounter < 0) Play_Endcounter = 3;
                    if (Play_Endcounter === 1) Play_Endcounter = 0;
                    Play_EndIconsAddFocus();
                } else if (!Play_BufferDialogVisible()) {
                    if (PlayVod_jumpCount > PlayVod_jumpCountMin) PlayVod_jumpCount--;
                    PlayVod_jumpStart();
                }
                break;
            case KEY_RIGHT:
                if (Play_isPanelShown()) {
                    Play_IconsRemoveFocus();
                    Play_Panelcouner--;
                    if (Play_Panelcouner < 1) Play_Panelcouner = 5;
                    Play_IconsAddFocus();
                    PlayVod_clearHidePanel();
                    PlayVod_setHidePanel();
                } else if (Play_isEndDialogShown()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = 0;
                    if (Play_Endcounter === 1) Play_Endcounter = 2;
                    Play_EndIconsAddFocus();
                } else if (!Play_BufferDialogVisible()) {
                    if (PlayVod_jumpCount < PlayVod_jumpCountMax) PlayVod_jumpCount++;
                    PlayVod_jumpStart();
                }
                break;
            case KEY_UP:
                if (Play_isPanelShown()) {
                    if (PlayVod_qualityIndex > 0 && Play_Panelcouner === 1) {
                        PlayVod_qualityIndex--;
                        PlayVod_qualityDisplay();
                    }
                    PlayVod_clearHidePanel();
                    PlayVod_setHidePanel();
                } else if (Play_isChatShown()) {
                    if (Play_ChatSizeValue < 4) {
                        Play_ChatSizeValue++;
                        if (Play_ChatSizeValue === 4) Play_ChatPositionConvert(true);
                        Play_ChatSize(true);
                    } else Play_showChatBackgroundDialog('Size 100%');
                } else if (Play_isEndDialogShown()) Play_EndTextClear();
                else {
                    PlayVod_showPanel();
                }
                break;
            case KEY_DOWN:
                if (Play_isPanelShown()) {
                    if (PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1 && Play_Panelcouner === 1) {
                        PlayVod_qualityIndex++;
                        PlayVod_qualityDisplay();
                    }
                    PlayVod_clearHidePanel();
                    PlayVod_setHidePanel();
                } else if (Play_isChatShown()) {
                    if (Play_ChatSizeValue > 1) {
                        Play_ChatSizeValue--;
                        if (Play_ChatSizeValue === 3) Play_ChatPositionConvert(false);
                        Play_ChatSize(true);
                    } else Play_showChatBackgroundDialog('Size 33%');
                } else if (Play_isEndDialogShown()) Play_EndTextClear();
                else {
                    PlayVod_showPanel();
                }
                break;
            case KEY_ENTER:
                if (Play_isEndDialogShown()) Play_EndDialogPressed(2);
                else if (Play_isPanelShown()) Play_BottomOptionsPressed(2);
                else PlayVod_showPanel();
                break;
            case KEY_RETURN:
                Play_KeyReturn(true);
                break;
            case KEY_PLAY:
            case KEY_PAUSE:
            case KEY_PLAYPAUSE:
                if (!Play_isEndDialogShown()) Play_KeyPause(2);
                break;
            case KEY_YELLOW:
                if (!Play_isEndDialogShown()) Play_showControlsDialog();
                break;
            case KEY_BLUE:
                break;
            default:
                break;
        }
    }
}