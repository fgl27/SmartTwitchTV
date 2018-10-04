//Variable initialization
var PlayVod_quality = 'source';
var PlayVod_qualityPlaying = PlayVod_quality;

var PlayVod_state = 0;

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
var PlayVod_SizeClearID;
var PlayVod_updateStreamInfId;
var PlayVod_TimeToJump = 0;
var PlayVod_IsJumping = false;
var PlayVod_jumpCount = 0;
var PlayVod_loadingDataTimeout = 3500;
var PlayVod_qualitiesFound = false;
var PlayVod_currentTime = 0;
var PlayVod_bufferingcomplete = false;
var PlayVod_vodOffset = 0;
var PlayVod_Buffer = 4;
var PlayVod_VodIds = {};
var PlayVod_VodPositions = 0;
var PlayVod_PanelY = 0;
var PlayVod_HasVodInfo = true;
var PlayVod_ProgressBaroffset = 0;
var PlayVod_StepsCount = 0;
var PlayVod_jumpTimers = [0, 15, 30, 60, 120, 300, 600, 900, 1200, 1800];

var PlayVod_WasPlaying = 0;
var PlayVod_Restore_value = {
    "vodOffset": 1,
    "vod_id": 1
};
var PlayVod_SaveOffsetId;
var PlayVod_WasSubChekd = false;
//Variable initialization end

function PlayVod_Start() {
    Play_HideEndDialog();
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    PlayVod_currentTime = 0;
    Main_empty('dialog_buffer_play_percentage');
    Main_textContent("stream_live_time", '');
    Main_textContent("stream_watching_time", '');
    Main_textContent('progress_bar_current_time', Play_timeS(0));
    Chat_title = STR_PAST_BROA + '.';
    Main_HideElement('progress_bar_div');
    PlayVod_StepsCount = 0;
    Play_DefaultjumpTimers = PlayVod_jumpTimers;
    PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);
    PlayVod_state = Play_STATE_LOADING_TOKEN;

    if (PlayVod_vodOffset) { // this is a vod comming from a clip
        PlayVod_PrepareLoad();
        PlayVod_updateVodInfo();
    } else {
        if (PlayVod_HasVodInfo && Main_selectedChannel_id !== '') {
            Play_LoadLogo(document.getElementById('stream_info_icon'), Main_selectedChannelLogo);
            if (!PlayVod_VodIds['#' + ChannelVod_vodId]) Chat_Init();
            if (AddUser_UserIsSet()) {
                AddCode_Channel_id = Main_selectedChannel_id;
                AddCode_PlayRequest = true;
                AddCode_CheckFallow();
            } else Play_hideFallow();
        } else {
            PlayVod_PrepareLoad();
            PlayVod_updateStreamerInfo();
        }
        Main_textContent("stream_info_name", Main_selectedChannelDisplayname);
        Main_innerHTML("stream_info_title", ChannelVod_title);
        Main_innerHTML("stream_info_game", ChannelVod_views + ', [' + (ChannelVod_language).toUpperCase() + ']');
        Main_textContent("stream_live_icon", ChannelVod_createdAt);
    }

    if (PlayVod_VodIds['#' + ChannelVod_vodId] && !PlayVod_vodOffset) {
        Play_HideBufferDialog();
        Play_showVodDialog();
    } else {
        PlayVod_PosStart();
        Play_showBufferDialog();
    }
}

function PlayVod_PosStart() {
    Play_offsettimeMinus = 0;

    Main_ShowElement('chat_box');
    Main_HideElement('chat_frame');
    window.setTimeout(function() {
        Main_ShowElement('scene_channel_panel_bottom');
        Main_ShowElement('progress_bar_div');
    }, 1000);
    Main_textContent('progress_bar_duration', Play_timeS(ChannelVod_DurationSeconds));

    PlayVod_Restore_value.vod_id = ChannelVod_vodId;
    localStorage.setItem('PlayVod_WasPlaying', 1);
    PlayVod_SaveOffset();
    PlayVod_SaveOffsetId = window.setInterval(PlayVod_SaveOffset, 60000);
    Main_PreLoadAImage(Play_IncrementView);

    SmartHub_SmartHubResume = false;
    Play_PlayerPanelOffset = -13;
    PlayVod_qualitiesFound = false;
    Play_IsWarning = false;
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_tokenResponse = 0;
    PlayVod_playlistResponse = 0;
    PlayVod_playingTry = 0;
    document.addEventListener('visibilitychange', PlayVod_Resume, false);
    PlayVod_Playing = false;
    Play_jumping = false;
    PlayVod_isOn = true;
    PlayVod_WasSubChekd = false;
    PlayVod_loadData();
    Play_EndSet(2);
    document.body.removeEventListener("keyup", Main_handleKeyUp);
}

function PlayVod_PrepareLoad() {
    PlayVod_loadingInfoDataTry = 0;
    PlayVod_loadingInfoDataTryMax = 5;
    PlayVod_loadingInfoDataTimeout = 10000;
}

function PlayVod_updateStreamerInfo() {
    try {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users?login=' + encodeURIComponent(Main_selectedChannel), true);
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
                        if (!PlayVod_VodIds['#' + ChannelVod_vodId]) Chat_Init();
                        if (AddUser_UserIsSet()) {
                            AddCode_Channel_id = Main_selectedChannel_id;
                            AddCode_PlayRequest = true;
                            AddCode_CheckFallow();
                        } else Play_hideFallow();
                    } else {
                        Main_selectedChannelLogo = IMG_404_LOGO;
                        Main_selectedChannel_id = '';
                    }
                    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_selectedChannelLogo);
                    return;
                } else {
                    PlayVod_updateStreamerInfoError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        PlayVod_updateStreamerInfoError();
    }
}

function PlayVod_updateStreamerInfoError() {
    PlayVod_loadingInfoDataTry++;
    if (PlayVod_loadingInfoDataTry < PlayVod_loadingInfoDataTryMax) {
        PlayVod_loadingInfoDataTimeout += 2000;
        PlayVod_updateStreamerInfo();
    } else PlayVod_updateStreamInfId = window.setTimeout(PlayVod_updateStreamerInfo, 2500);
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

    Main_innerHTML("stream_info_title", twemoji.parse(response.title));
    Main_innerHTML("stream_info_game", STR_STARTED + STR_PLAYING + response.game +
        ', ' + Main_addCommas(response.views) + STR_VIEWS + ', [' + (response.language).toUpperCase() + ']');
    Main_textContent("stream_live_icon", STR_STREAM_ON + Main_videoCreatedAt(response.created_at));

    ChannelVod_DurationSeconds = parseInt(response.length);
    Main_textContent('progress_bar_duration', Play_timeS(ChannelVod_DurationSeconds));

    PlayVod_currentTime = PlayVod_vodOffset * 1000;
    PlayVod_ProgresBarrUpdate(PlayVod_vodOffset, ChannelVod_DurationSeconds, true);

    Main_selectedChannelDisplayname = response.channel.display_name;
    Main_textContent("stream_info_name", Main_selectedChannelDisplayname);

    Main_selectedChannelLogo = response.channel.logo;
    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_selectedChannelLogo);

    Main_selectedChannel_id = response.channel._id;
    Main_selectedChannel = response.channel.name;

    if (AddUser_UserIsSet()) {
        AddCode_PlayRequest = true;
        AddCode_Channel_id = Main_selectedChannel_id;
        AddCode_CheckFallow();
    } else Play_hideFallow();
    Main_PreLoadAImage(response.increment_view_count_url);
}

function PlayVod_SaveOffset() {
    PlayVod_Restore_value.vodOffset = parseInt(PlayVod_currentTime / 1000);
    localStorage.setItem('PlayVod_Restore_value', JSON.stringify(PlayVod_Restore_value));
}

function PlayVod_Resume() {
    if (document.hidden) {
        PlayVod_SaveOffset();
        PlayVod_SaveVodIds();
        Chat_Pause();
        Play_avplay.pause();
        PlayVod_offsettime = Play_avplay.getCurrentTime();
        Play_ClearPlayer();
        window.clearInterval(PlayVod_streamCheck);
        window.clearInterval(PlayVod_SaveOffsetId);
    } else {
        PlayVod_isOn = true;
        Main_ShowElement('scene2');
        Main_HideElement('scene1');
        Play_showBufferDialog();
        window.setTimeout(function() {
            if (!SmartHub_SmartHubResume) {
                if (PlayVod_isOn) {
                    PlayVod_Playing = false;
                    PlayVod_onPlayer();
                    Chat_Play(Chat_Id);
                    Play_EndSet(2);
                    PlayVod_SaveOffsetId = window.setInterval(PlayVod_SaveOffset, 60000);
                }
            }
        }, 500);
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
        if (PlayVod_state === Play_STATE_LOADING_TOKEN) {
            theUrl = 'https://api.twitch.tv/api/vods/' + ChannelVod_vodId + '/access_token' +
                (AddUser_UserIsSet() && AddUser_UsernameArray[Users_Position].access_token ? '?oauth_token=' +
                    AddUser_UsernameArray[Users_Position].access_token : '');
        } else {
            theUrl = 'http://usher.ttvnw.net/vod/' + ChannelVod_vodId +
                '.m3u8?&nauth=' + escape(PlayVod_tokenResponse.token) + '&nauthsig=' + PlayVod_tokenResponse.sig +
                '&allow_source=true&allow_audi_only=true';
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = PlayVod_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    PlayVod_loadingDataTry = 0;
                    if (PlayVod_isOn) PlayVod_loadDataSuccess(xmlHttp.responseText);
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
    if (PlayVod_state === Play_STATE_LOADING_TOKEN) {
        PlayVod_tokenResponse = JSON.parse(responseText);
        PlayVod_state = Play_STATE_LOADING_PLAYLIST;
        PlayVod_loadData();
    } else if (PlayVod_state === Play_STATE_LOADING_PLAYLIST) {
        PlayVod_playlistResponse = responseText;
        PlayVod_qualities = Play_extractQualities(PlayVod_playlistResponse);
        PlayVod_state = Play_STATE_PLAYING;
        if (PlayVod_isOn) PlayVod_qualityChanged();
    }
}

function PlayVod_loadDataCheckSub() {
    if (AddUser_UserIsSet() && AddUser_UsernameArray[Users_Position].access_token) {
        AddCode_Channel_id = Main_selectedChannel_id;
        AddCode_CheckSub();
    } else {
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
    if (!PlayVod_WasSubChekd) {
        // Do one more try before failing, because the access_token may be expired on the first treys
        // the PlayVod_loadData can't check if is expired, but the AddCode_RequestCheckSub can
        // and will refresh the token if it fail, so just to be shore run the PlayVod_loadData one more time
        PlayVod_WasSubChekd = true;
        PlayVod_state = Play_STATE_LOADING_TOKEN;
        PlayVod_loadData();
    } else {
        Play_HideBufferDialog();
        Play_showWarningDialog(STR_IS_SUB_ONLY + STR_IS_SUB_IS_SUB);
        window.setTimeout(function() {
            if (PlayVod_isOn) PlayVod_shutdownStream();
        }, 4000);
    }
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
    },
    onbufferingprogress: function(percent) {
        if (percent < 5) PlayVod_PlayerCheckCount = 0;

        Play_PlayerCheckTimer = PlayVod_Buffer;
        PlayVod_PlayerCheckQualityChanged = true;
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
            Chat_offset = PlayVod_vodOffset;
            Chat_Init();
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

        PlayVod_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = 2;
        PlayVod_PlayerCheckQualityChanged = false;
    } catch (e) {
        console.log(e);
    }

    Play_avplay.prepareAsync(function() {
        Play_avplay.play();
        PlayVod_Playing = true;
        ChannelVod_DurationSeconds = Play_avplay.getDuration() / 1000;
        Main_textContent('progress_bar_duration', Play_timeS(ChannelVod_DurationSeconds));
    });

    Main_ready(function() {
        PlayVod_hidePanel();
        if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
        PlayVod_PlayerCheckCount = 0;
        window.clearInterval(PlayVod_streamCheck);
        PlayVod_streamCheck = window.setInterval(PlayVod_PlayerCheck, Play_PlayerCheckInterval);
    });
}

function PlayVod_PlayerCheck() {
    if (Play_isIdleOrPlaying() && PlayVod_PlayerTime === PlayVod_currentTime) {
        PlayVod_PlayerCheckCount++;
        if (PlayVod_PlayerCheckCount > (Play_PlayerCheckTimer + (Play_BufferPercentage > 90 ? 1 : 0))) {
            if (PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1) {
                if (PlayVod_PlayerCheckQualityChanged) PlayVod_qualityIndex++; //Don't change the first time only retry
                PlayVod_qualityDisplay();
                if (!PlayVod_offsettime) PlayVod_offsettime = Play_avplay.getCurrentTime();
                PlayVod_qualityChanged();
            } else {
                Play_avplay.stop();
                Play_PannelEndStart(2); //staled for too long close the player
            }
        } // else we try for too long let the listener onerror catch it
    } else PlayVod_PlayerCheckCount = 0;
    PlayVod_PlayerTime = PlayVod_currentTime;
}

function PlayVod_updateCurrentTime(currentTime) {
    PlayVod_currentTime = currentTime;

    if (!Play_IsWarning && Play_WarningDialogVisible()) Play_HideWarningDialog();
    if (PlayVod_bufferingcomplete && Play_BufferDialogVisible()) Play_HideBufferDialog();

    if (Play_isPanelShown() && !Play_BufferDialogVisible())
        PlayVod_ProgresBarrUpdate((PlayVod_currentTime / 1000), ChannelVod_DurationSeconds, !PlayVod_IsJumping);
}

function PlayVod_shutdownStream() {
    if (PlayVod_isOn) {
        PlayVod_PreshutdownStream(true);
        Play_exitMain();
    }
}

function PlayVod_PreshutdownStream(saveOffset) {
    PlayVod_isOn = false;
    window.clearInterval(PlayVod_SaveOffsetId);
    if (saveOffset) PlayVod_SaveVodIds();
    window.clearInterval(PlayVod_updateStreamInfId);
    localStorage.setItem('PlayVod_WasPlaying', 0);
    PlayVod_HasVodInfo = true;
    Chat_Clear();
    Play_ClearPlayer();
    PlayVod_ClearVod();
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
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_TimeToJump = 0;
    Play_clearHidePanel();
    document.getElementById("scene_channel_panel").style.opacity = "0";
    PlayVod_ProgresBarrUpdate((PlayVod_currentTime / 1000), ChannelVod_DurationSeconds, true);
    Main_innerHTML('progress_bar_jump_to', STR_SPACE);
    PlayVod_quality = PlayVod_qualityPlaying;
    Play_ChatPosition();
}

function PlayVod_showPanel(autoHide) {
    Play_clock();
    Play_CleanHideExit();
    PlayVod_ProgresBarrUpdate((PlayVod_currentTime / 1000), ChannelVod_DurationSeconds, true);
    if (autoHide) {
        PlayVod_IconsBottonResetFocus();
        PlayVod_qualityIndexReset();
        PlayVod_qualityDisplay();
        PlayVod_setHidePanel();
    }
    document.getElementById("scene_channel_panel").style.opacity = "1";
    Play_ChatPosition();
}

function PlayVod_IconsBottonResetFocus() {
    Play_Panelcounter = 1;
    PlayVod_PanelY = 0;
    PlayVod_IconsBottonFocus();
}

function PlayVod_IconsBottonFocus() {
    if (PlayVod_PanelY) {
        Main_RemoveClass('progress_bar_div', 'progress_bar_div_focus');
        Play_IconsAddFocus();
        Main_innerHTML('progress_bar_jump_to', STR_SPACE);
        document.getElementById('progress_bar_steps').style.display = 'none';
    } else {
        Main_AddClass('progress_bar_div', 'progress_bar_div_focus');
        Play_IconsRemoveFocus();
        Main_innerHTML('progress_bar_jump_to', (PlayVod_TimeToJump > 0 ? STR_JUMP_TIME + STR_JUMP_T0 + Play_timeS((Play_avplay.getCurrentTime() / 1000) + PlayVod_TimeToJump) : STR_SPACE));
        document.getElementById('progress_bar_steps').style.display = 'inline-block';
    }
}

function PlayVod_setHidePanel() {
    Play_PanelHideID = window.setTimeout(PlayVod_hidePanel, 5000 + PlayVod_ProgressBaroffset); // time in ms
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
    if (PlayVod_getQualitiesCount() === 1) {
        document.getElementById("quality_arrow_up").style.opacity = "0";
        document.getElementById("quality_arrow_down").style.opacity = "0";
    } else if (!PlayVod_qualityIndex) {
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

function PlayVod_ProgresBarrUpdate(current_time_seconds, duration_seconds, update_bar) {
    Main_textContent('progress_bar_current_time', Play_timeS(current_time_seconds));
    if (update_bar) Play_ProgresBarrElm.style.width = ((current_time_seconds / duration_seconds) * 100) + '%';
}

function PlayVod_jump() {
    if (!Play_isEndDialogShown()) {
        if (Play_isIdleOrPlaying()) Play_avplay.pause();

        PlayVod_PlayerCheckQualityChanged = false;
        PlayClip_PlayerCheckQualityChanged = false;
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

        Chat_offset = (PlayVod_currentTime / 1000) + PlayVod_TimeToJump;
        if (Chat_offset) Chat_Init();
        if (!Play_isIdleOrPlaying()) Play_avplay.play();
    }
    Main_innerHTML('progress_bar_jump_to', STR_SPACE);
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_TimeToJump = 0;
    Play_clearPause();
}

function PlayVod_SizeClear() {
    PlayVod_jumpCount = 0;
    PlayVod_StepsCount = 0;
    PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);
}

function PlayVod_jumpSteps(duration_seconds) {
    if (Math.abs(duration_seconds) > 60)
        Main_textContent('progress_bar_steps', STR_JUMPING_STEP + (duration_seconds / 60) + STR_MINUTES);
    else if (duration_seconds)
        Main_textContent('progress_bar_steps', STR_JUMPING_STEP + duration_seconds + STR_SECONDS);
    else
        Main_textContent('progress_bar_steps', STR_JUMPING_STEP + Play_DefaultjumpTimers[1] + STR_SECONDS);

}

function PlayVod_jumpStart(multiplier, duration_seconds) {
    var currentTime = Play_avplay.getCurrentTime() / 1000,
        jumpTotime;
    window.clearTimeout(PlayVod_SizeClearID);
    PlayVod_IsJumping = true;

    if (PlayVod_jumpCount < (Play_DefaultjumpTimers.length - 1) && (PlayVod_StepsCount++ % 6) === 0) PlayVod_jumpCount++;

    PlayVod_TimeToJump += Play_DefaultjumpTimers[PlayVod_jumpCount] * multiplier;
    jumpTotime = currentTime + PlayVod_TimeToJump;

    if (jumpTotime > duration_seconds) {
        PlayVod_TimeToJump = duration_seconds - currentTime - Play_DefaultjumpTimers[1];
        jumpTotime = currentTime + PlayVod_TimeToJump;
        PlayVod_jumpCount = 0;
        PlayVod_StepsCount = 0;
    } else if (jumpTotime < 0) {
        PlayVod_TimeToJump = 0 - currentTime;
        PlayVod_jumpCount = 0;
        PlayVod_StepsCount = 0;
        jumpTotime = 0;
    }

    Main_textContent('progress_bar_jump_to', STR_JUMP_TIME + STR_JUMP_T0 + Play_timeS(jumpTotime));
    Play_ProgresBarrElm.style.width = ((jumpTotime / duration_seconds) * 100) + '%';
    PlayVod_jumpSteps(Play_DefaultjumpTimers[PlayVod_jumpCount] * multiplier);

    PlayVod_SizeClearID = window.setTimeout(PlayVod_SizeClear, 1000);
}

function PlayVod_SaveVodIds() {
    var time = PlayVod_currentTime / 1000;
    var vod_id = '#' + ChannelVod_vodId; // prevent only numeric key, that makes the obj be shorted

    if (time > 300 && time < (ChannelVod_DurationSeconds - 300)) { //time too small don't save

        //delete before save to add this to the end, and prevent loose it in restorevodids
        if (PlayVod_VodIds[vod_id]) delete PlayVod_VodIds[vod_id];

        PlayVod_VodIds[vod_id] = parseInt(PlayVod_currentTime / 1000);
        localStorage.setItem('PlayVod_VodIds', JSON.stringify(PlayVod_VodIds));

    } else if (time > (ChannelVod_DurationSeconds - 300) && PlayVod_VodIds[vod_id]) {

        //if ended or almost delete
        delete PlayVod_VodIds[vod_id];
        localStorage.setItem('PlayVod_VodIds', JSON.stringify(PlayVod_VodIds));
    }
}

function PlayVod_RestoreVodIds() {
    PlayVod_VodIds = JSON.parse(localStorage.getItem('PlayVod_VodIds')) || {};

    //Prevent too big obj in storage
    var size = PlayVod_VodIdsSize();
    if (size > 250) PlayVod_CleanVodIds(size - 250);
}

function PlayVod_VodIdsSize() {
    var size = 0;
    for (var key in PlayVod_VodIds) {
        if (PlayVod_VodIds.hasOwnProperty(key)) size++;
    }
    return size;
}

function PlayVod_CleanVodIds(quantity) {
    var position = 0;
    for (var key in PlayVod_VodIds) {
        if (position < quantity) delete PlayVod_VodIds[key];
        else break;
        position++;
    }
    localStorage.setItem('PlayVod_VodIds', JSON.stringify(PlayVod_VodIds));
}

function Play_showVodDialog() {
    Main_HideElement('scene_channel_panel_bottom');
    PlayVod_showPanel(false);
    Main_innerHTML("dialog_vod_saved_text", STR_FROM + Play_timeMs(PlayVod_VodIds['#' + ChannelVod_vodId] * 1000));
    Main_ShowElement('dialog_vod_start');
}

function Play_HideVodDialog() {
    PlayVod_hidePanel();
    Main_HideElement('dialog_vod_start');
    PlayVod_IconsResetFocus();
    window.setTimeout(function() {
        Main_ShowElement('scene_channel_panel_bottom');
    }, 1000);
}

function Play_isVodDialogShown() {
    return Main_isElementShowing('dialog_vod_start');
}

function PlayVod_IconsResetFocus() {
    PlayVod_IconsRemoveFocus();
    PlayVod_VodPositions = 0;
    PlayVod_IconsAddFocus();
}

function PlayVod_IconsAddFocus() {
    Main_AddClass('dialog_vod_' + PlayVod_VodPositions, 'dialog_end_icons_focus');
}

function PlayVod_IconsRemoveFocus() {
    Main_RemoveClass('dialog_vod_' + PlayVod_VodPositions, 'dialog_end_icons_focus');
}

function PlayVod_DialogPressed() {
    Play_HideVodDialog();
    if (!PlayVod_VodPositions) {
        PlayVod_vodOffset = PlayVod_VodIds['#' + ChannelVod_vodId];
        PlayVod_currentTime = PlayVod_vodOffset * 1000;
        PlayVod_ProgresBarrUpdate(PlayVod_vodOffset, ChannelVod_DurationSeconds, true);
        PlayVod_PosStart();
    } else {
        delete PlayVod_VodIds['#' + ChannelVod_vodId];
        PlayVod_vodOffset = 0;
        PlayVod_Start();
    }
}

function PlayVod_handleKeyDown(e) {
    if (PlayVod_state !== Play_STATE_PLAYING && !Play_isVodDialogShown()) {
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
                if (!Play_isChatShown() && !Play_isEndDialogShown() && !Play_isVodDialogShown()) {
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
                if (!Play_isPanelShown() && Play_isChatShown()) {
                    Play_ChatBackground -= 0.05;
                    if (Play_ChatBackground < 0.05) Play_ChatBackground = 0.05;
                    Play_ChatBackgroundChange(true);
                } else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY) {
                        Play_IconsRemoveFocus();
                        Play_Panelcounter++;
                        if (Play_Panelcounter > 5) Play_Panelcounter = 1;
                        Play_IconsAddFocus();
                    } else if (!Play_BufferDialogVisible()) {
                        PlayVod_jumpStart(-1, ChannelVod_DurationSeconds);
                        PlayVod_ProgressBaroffset = 2500;
                    }
                    PlayVod_setHidePanel();
                } else if (Play_isVodDialogShown()) {
                    PlayVod_IconsRemoveFocus();
                    if (PlayVod_VodPositions) PlayVod_VodPositions--;
                    else PlayVod_VodPositions++;
                    PlayVod_IconsAddFocus();
                } else if (Play_isEndDialogShown()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter--;
                    if (Play_Endcounter < 0) Play_Endcounter = 3;
                    if (Play_Endcounter === 1) Play_Endcounter = 0;
                    Play_EndIconsAddFocus();
                } else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_RIGHT:
                if (!Play_isPanelShown() && Play_isChatShown()) {
                    Play_ChatBackground += 0.05;
                    if (Play_ChatBackground > 1.05) Play_ChatBackground = 1.05;
                    Play_ChatBackgroundChange(true);
                } else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY) {
                        Play_IconsRemoveFocus();
                        Play_Panelcounter--;
                        if (Play_Panelcounter < 1) Play_Panelcounter = 5;
                        Play_IconsAddFocus();
                    } else if (!Play_BufferDialogVisible()) {
                        PlayVod_jumpStart(1, ChannelVod_DurationSeconds);
                        PlayVod_ProgressBaroffset = 2500;
                    }
                    PlayVod_setHidePanel();
                } else if (Play_isVodDialogShown()) {
                    PlayVod_IconsRemoveFocus();
                    if (PlayVod_VodPositions) PlayVod_VodPositions--;
                    else PlayVod_VodPositions++;
                    PlayVod_IconsAddFocus();
                } else if (Play_isEndDialogShown()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = 0;
                    if (Play_Endcounter === 1) Play_Endcounter = 2;
                    Play_EndIconsAddFocus();
                } else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_UP:
                if (Play_isEndDialogShown()) Play_EndTextClear();
                else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
                    if (PlayVod_PanelY && Play_Panelcounter !== 1) {
                        PlayVod_PanelY--;
                        PlayVod_IconsBottonFocus();
                    } else if (PlayVod_qualityIndex > 0 && Play_Panelcounter === 1) {
                        PlayVod_qualityIndex--;
                        PlayVod_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    PlayVod_setHidePanel();
                } else if (Play_isChatShown()) {
                    if (Play_ChatSizeValue < 4) {
                        Play_ChatSizeValue++;
                        if (Play_ChatSizeValue === 4) Play_ChatPositionConvert(true);
                        Play_ChatSize(true);
                        if (Chat_div) Chat_div.scrollTop = Chat_div.scrollHeight;
                    } else Play_showChatBackgroundDialog(STR_SIZE + Play_ChatSizeVal[Play_ChatSizeVal.length - 1].percentage);
                } else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_DOWN:
                if (Play_isEndDialogShown()) Play_EndTextClear();
                else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
                    if (!PlayVod_PanelY) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else if (PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1 && Play_Panelcounter === 1) {
                        PlayVod_qualityIndex++;
                        PlayVod_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    PlayVod_setHidePanel();
                } else if (Play_isChatShown()) {
                    if (Play_ChatSizeValue > 1) {
                        Play_ChatSizeValue--;
                        if (Play_ChatSizeValue === 3) Play_ChatPositionConvert(false);
                        Play_ChatSize(true);
                        if (Chat_div) Chat_div.scrollTop = Chat_div.scrollHeight;
                    } else Play_showChatBackgroundDialog(STR_SIZE + Play_ChatSizeVal[0].percentage);
                } else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_ENTER:
                if (Play_isVodDialogShown()) PlayVod_DialogPressed();
                else if (Play_isEndDialogShown()) Play_EndDialogPressed(2);
                else if (Play_isPanelShown()) {
                    if (!PlayVod_PanelY && PlayVod_TimeToJump) PlayVod_jump();
                    else Play_BottomOptionsPressed(2);
                } else PlayVod_showPanel(true);
                break;
            case KEY_RETURN:
                Play_KeyReturn(true);
                break;
            case KEY_PLAY:
            case KEY_PAUSE:
            case KEY_PLAYPAUSE:
                if (Play_isplaying()) Chat_Pause();
                else Chat_Play(Chat_Id);
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