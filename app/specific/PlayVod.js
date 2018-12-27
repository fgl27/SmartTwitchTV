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
var PlayVod_PlayerCheckCounter = 0;
var PlayVod_PlayerCheckRun = false;

var PlayVod_Playing = false;
var Play_jumping = false;
var PlayVod_SizeClearID;
var PlayVod_updateStreamInfId;
var PlayVod_addToJump = 0;
var PlayVod_IsJumping = false;
var PlayVod_jumpCount = 0;
var PlayVod_loadingDataTimeout = 2000;
var PlayVod_qualitiesFound = false;
var PlayVod_currentTime = 0;
var PlayVod_bufferingcomplete = false;
var PlayVod_Buffer = 4;
var PlayVod_VodIds = {};
var PlayVod_VodPositions = 0;
var PlayVod_PanelY = 0;
var PlayVod_HasVodInfo = true;
var PlayVod_ProgressBaroffset = 0;
var PlayVod_StepsCount = 0;
var PlayVod_TimeToJump = 0;
var PlayVod_jumpTimers = [0, 10, 30, 60, 120, 300, 600, 900, 1200, 1800];

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

    Main_values.Play_isHost = false;

    if (Main_values.vodOffset) { // this is a vod comming from a clip
        PlayVod_PrepareLoad();
        PlayVod_updateVodInfo();
    } else {
        if (PlayVod_HasVodInfo && Main_values.Main_selectedChannel_id !== '') {
            Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);
            if (!PlayVod_VodIds['#' + Main_values.ChannelVod_vodId]) Chat_Init();
            if (AddUser_UserIsSet()) {
                AddCode_Channel_id = Main_values.Main_selectedChannel_id;
                AddCode_PlayRequest = true;
                AddCode_CheckFallow();
            } else Play_hideFallow();
        } else {
            PlayVod_PrepareLoad();
            PlayVod_updateStreamerInfo();
        }
        Main_textContent("stream_info_name", Main_values.Main_selectedChannelDisplayname);
        Main_innerHTML("stream_info_title", ChannelVod_title);
        Main_innerHTML("stream_info_game", ChannelVod_views + ', [' + (ChannelVod_language).toUpperCase() + ']');
        Main_textContent("stream_live_icon", ChannelVod_createdAt);
    }

    if (PlayVod_VodIds['#' + Main_values.ChannelVod_vodId] && !Main_values.vodOffset) {
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

    Main_values.Play_WasPlaying = 2;
    Main_SaveValues();

    PlayVod_SaveOffsetId = window.setInterval(PlayVod_SaveOffset, 60000);
    Main_CacheImage(Play_IncrementView);

    PlayVod_PlayerCheckCounter = 0;
    PlayVod_PlayerCheckRun = false;
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
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users?login=' + encodeURIComponent(Main_values.Main_selectedChannel), true);
    xmlHttp.timeout = PlayVod_loadingInfoDataTimeout;
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                var users = JSON.parse(xmlHttp.responseText).users[0];
                if (users !== undefined) {
                    Main_values.Main_selectedChannelLogo = users.logo;
                    Main_values.Main_selectedChannel_id = users._id;
                    if (!PlayVod_VodIds['#' + Main_values.ChannelVod_vodId]) Chat_Init();
                    if (AddUser_UserIsSet()) {
                        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
                        AddCode_PlayRequest = true;
                        AddCode_CheckFallow();
                    } else Play_hideFallow();
                } else {
                    Main_values.Main_selectedChannelLogo = IMG_404_LOGO;
                    Main_values.Main_selectedChannel_id = '';
                }
                Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);
                return;
            } else {
                PlayVod_updateStreamerInfoError();
            }
        }
    };

    xmlHttp.send(null);
}

function PlayVod_updateStreamerInfoError() {
    PlayVod_loadingInfoDataTry++;
    if (PlayVod_loadingInfoDataTry < PlayVod_loadingInfoDataTryMax) {
        PlayVod_loadingInfoDataTimeout += 2000;
        PlayVod_updateStreamerInfo();
    } else PlayVod_updateStreamInfId = window.setTimeout(PlayVod_updateStreamerInfo, 2500);
}

function PlayVod_updateVodInfo() {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", 'https://api.twitch.tv/kraken/videos/' + Main_values.ChannelVod_vodId, true);
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

    PlayVod_currentTime = Main_values.vodOffset * 1000;
    PlayVod_ProgresBarrUpdate(Main_values.vodOffset, ChannelVod_DurationSeconds, true);

    Main_values.Main_selectedChannelDisplayname = response.channel.display_name;
    Main_textContent("stream_info_name", Main_values.Main_selectedChannelDisplayname);

    Main_values.Main_selectedChannelLogo = response.channel.logo;
    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);

    Main_values.Main_selectedChannel_id = response.channel._id;
    Main_values.Main_selectedChannel = response.channel.name;

    if (AddUser_UserIsSet()) {
        AddCode_PlayRequest = true;
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
        AddCode_CheckFallow();
    } else Play_hideFallow();
    Main_CacheImage(response.increment_view_count_url);
}

function PlayVod_Resume() {
    if (document.hidden) {
        if (Play_isEndDialogVisible()) {
            Play_CleanHideExit();
            Play_hideChat();
            Main_ready(PlayVod_shutdownStream);
        } else {
            PlayVod_SaveOffset();
            PlayVod_SaveVodIds();
            Chat_Pause();
            Play_avplay.pause();
            PlayVod_offsettime = Play_avplay.getCurrentTime();
            Play_ClearPlayer();
            window.clearInterval(PlayVod_streamCheck);
            window.clearInterval(PlayVod_SaveOffsetId);
        }
    } else {
        PlayVod_isOn = true;
        Main_ShowElement('scene2');
        Main_HideElement('scene1');
        Play_showBufferDialog();
        Play_clearPause();
        if (!SmartHub_SmartHubResume) {
            if (PlayVod_isOn) {
                PlayVod_Playing = false;
                PlayVod_onPlayer();
                Chat_Play(Chat_Id);
                Play_EndSet(2);
                PlayVod_SaveOffsetId = window.setInterval(PlayVod_SaveOffset, 60000);
            }
        }
    }
}

function PlayVod_SaveOffset() {
    Main_values.vodOffset = parseInt(PlayVod_currentTime / 1000);
    Main_SaveValues();
    Main_values.vodOffset = 0;
}


function PlayVod_loadData() {
    PlayVod_loadingDataTry = 0;
    PlayVod_loadingDataTimeout = 2000;
    PlayVod_loadDataRequest();
}

function PlayVod_loadDataRequest() {
    var xmlHttp = new XMLHttpRequest();

    var theUrl;
    if (PlayVod_state === Play_STATE_LOADING_TOKEN) {
        theUrl = 'https://api.twitch.tv/api/vods/' + Main_values.ChannelVod_vodId + '/access_token' +
            (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token ? '?oauth_token=' +
                AddUser_UsernameArray[Main_values.Users_Position].access_token : '');
    } else {
        theUrl = 'http://usher.ttvnw.net/vod/' + Main_values.ChannelVod_vodId +
            '.m3u8?&nauth=' + encodeURIComponent(PlayVod_tokenResponse.token) + '&nauthsig=' + PlayVod_tokenResponse.sig +
            '&allow_source=true&allow_audi_only=true&allow_spectre=false';
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
}

function PlayVod_loadDataError() {
    if (PlayVod_isOn) {
        if (JSON.parse(PlayVod_tokenResponse.token).chansub.restricted_bitrates.length !== 0) {
            PlayVod_loadDataCheckSub();
            return;
        }

        PlayVod_loadingDataTry++;
        if (PlayVod_loadingDataTry < PlayVod_loadingDataTryMax) {
            PlayVod_loadingDataTimeout += 250;
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
    if (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token) {
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
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
    Main_empty('dialog_buffer_play_percentage');
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
        PlayVod_SaveOffset();
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
            Main_values.vodOffset = 0;
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

        if (Main_values.vodOffset > ChannelVod_DurationSeconds) Main_values.vodOffset = 0;

        if (Main_values.vodOffset) {
            Chat_offset = Main_values.vodOffset;
            Chat_Init();
            Play_avplay.seekTo(Main_values.vodOffset * 1000);
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
        Play_PlayerCheckTimer = 6;
        PlayVod_PlayerCheckQualityChanged = false;
    } catch (e) {
        console.log('PlayVod_onPlayer ' + e);
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
        window.clearInterval(PlayVod_streamCheck);
        PlayVod_streamCheck = window.setInterval(PlayVod_PlayerCheck, Play_PlayerCheckInterval);
    });
}

function PlayVod_PlayerCheck() {
    if (PlayVod_PlayerTime === PlayVod_currentTime && Play_isIdleOrPlaying()) {
        PlayVod_PlayerCheckCount++;
        if (PlayVod_PlayerCheckCount > (Play_PlayerCheckTimer + (Play_BufferPercentage > 90 ? 1 : 0))) {


            //Don't change the first time only retry
            if (PlayVod_PlayerCheckQualityChanged && PlayVod_PlayerCheckRun && (PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1)) PlayVod_qualityIndex++;
            else if (!PlayVod_PlayerCheckQualityChanged && PlayVod_PlayerCheckRun) PlayVod_PlayerCheckCounter++;

            if (!navigator.onLine) Play_EndStart(false, 2);
            else if (PlayVod_PlayerCheckCounter > 1) Play_CheckConnection(PlayVod_PlayerCheckCounter, 2, PlayVod_DropOneQuality);
            else {
                PlayVod_qualityDisplay();
                if (!PlayVod_offsettime) PlayVod_offsettime = Play_avplay.getCurrentTime();
                PlayVod_qualityChanged();
                PlayVod_PlayerCheckRun = true;
            }

        } // else we try for too long let the listener onerror catch it
    } else {
        PlayVod_PlayerCheckCounter = 0;
        PlayVod_PlayerCheckCount = 0;
        PlayVod_PlayerCheckRun = false;
    }

    PlayVod_PlayerTime = PlayVod_currentTime;
}

function PlayVod_DropOneQuality(ConnectionDrop) {

    if (!ConnectionDrop) {
        if (PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1) PlayVod_qualityIndex++;
        else {
            Play_EndStart(false, 2);
            return;
        }
    }

    PlayVod_PlayerCheckCounter = 0;
    PlayVod_qualityDisplay();
    if (!PlayVod_offsettime) PlayVod_offsettime = Play_avplay.getCurrentTime();
    PlayVod_qualityChanged();
    PlayVod_PlayerCheckRun = true;
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
    Main_values.Play_WasPlaying = 0;
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
    Main_values.vodOffset = 0;
    window.clearInterval(PlayVod_streamInfoTimer);
    window.clearInterval(PlayVod_streamCheck);
    ChannelVod_DurationSeconds = 0;
}

function PlayVod_hidePanel() {
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_addToJump = 0;
    Play_clearHidePanel();
    document.getElementById("scene_channel_panel").style.opacity = "0";
    PlayVod_ProgresBarrUpdate((PlayVod_currentTime / 1000), ChannelVod_DurationSeconds, true);
    Main_innerHTML('progress_bar_jump_to', STR_SPACE);
    document.getElementById('progress_bar_steps').style.display = 'none';
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
        if (PlayVod_addToJump) {
            PlayVod_jumpTime();
            document.getElementById('progress_bar_steps').style.display = 'inline-block';
        }
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
    Play_clearPause();
    if (!Play_isEndDialogVisible()) {
        if (Play_isIdleOrPlaying()) Play_avplay.pause();

        PlayVod_PlayerCheckQualityChanged = false;
        PlayClip_PlayerCheckQualityChanged = false;
        try {
            Play_avplay.seekTo(PlayVod_TimeToJump * 1000);
        } catch (e) {
            Play_HideWarningDialog();
            console.log('PlayVod_jump ' + e);
        }

        if (PlayVod_isOn) Chat_offset = PlayVod_TimeToJump;
        else Chat_offset = ChannelVod_vodOffset;

        Chat_Init();
        if (!Play_isIdleOrPlaying()) Play_avplay.play();
    }
    Main_innerHTML('progress_bar_jump_to', STR_SPACE);
    document.getElementById('progress_bar_steps').style.display = 'none';
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_addToJump = 0;
    PlayVod_TimeToJump = 0;
}

function PlayVod_SizeClear() {
    PlayVod_jumpCount = 0;
    PlayVod_StepsCount = 0;
    PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);
}

function PlayVod_jumpSteps(duration_seconds) {
    if (PlayVod_addToJump && !PlayVod_PanelY) document.getElementById('progress_bar_steps').style.display = 'inline-block';
    if (Math.abs(duration_seconds) > 60)
        Main_textContent('progress_bar_steps', STR_JUMPING_STEP + (duration_seconds / 60) + STR_MINUTES);
    else if (duration_seconds)
        Main_textContent('progress_bar_steps', STR_JUMPING_STEP + duration_seconds + STR_SECONDS);
    else
        Main_textContent('progress_bar_steps', STR_JUMPING_STEP + Play_DefaultjumpTimers[1] + STR_SECONDS);
}

function PlayVod_jumpTime() {
    Main_textContent('progress_bar_jump_to', STR_JUMP_TIME + ' (' + (PlayVod_addToJump < 0 ? '-' : '') + Play_timeS(Math.abs(PlayVod_addToJump)) + ')' + STR_JUMP_T0 + Play_timeS(PlayVod_TimeToJump));
}

function PlayVod_jumpStart(multiplier, duration_seconds) {
    var currentTime = Play_avplay.getCurrentTime() / 1000;

    window.clearTimeout(PlayVod_SizeClearID);
    PlayVod_IsJumping = true;

    if (PlayVod_jumpCount < (Play_DefaultjumpTimers.length - 1) && (PlayVod_StepsCount++ % 6) === 0) PlayVod_jumpCount++;

    PlayVod_addToJump += Play_DefaultjumpTimers[PlayVod_jumpCount] * multiplier;
    PlayVod_TimeToJump = currentTime + PlayVod_addToJump;

    //hls jump/seek time in avplay is "10 base", jump/seek to 1:53:53 will jump to 1:53:50, round to show then
    if (PlayVod_isOn) PlayVod_TimeToJump = Math.floor(PlayVod_TimeToJump / 10) * 10;

    if (PlayVod_TimeToJump > duration_seconds) {
        PlayVod_addToJump = duration_seconds - currentTime - Play_DefaultjumpTimers[1];
        PlayVod_TimeToJump = currentTime + PlayVod_addToJump;
        PlayVod_jumpCount = 0;
        PlayVod_StepsCount = 0;
    } else if (PlayVod_TimeToJump < 0) {
        PlayVod_addToJump = 0 - currentTime;
        PlayVod_jumpCount = 0;
        PlayVod_StepsCount = 0;
        PlayVod_TimeToJump = 0;
    }

    PlayVod_jumpTime();
    Play_ProgresBarrElm.style.width = ((PlayVod_TimeToJump / duration_seconds) * 100) + '%';
    PlayVod_jumpSteps(Play_DefaultjumpTimers[PlayVod_jumpCount] * multiplier);

    PlayVod_SizeClearID = window.setTimeout(PlayVod_SizeClear, 1000);
}

function PlayVod_SaveVodIds() {
    var time = PlayVod_currentTime / 1000;
    var vod_id = '#' + Main_values.ChannelVod_vodId; // prevent only numeric key, that makes the obj be shorted

    if (time > 300 && time < (ChannelVod_DurationSeconds - 300)) { //time too small don't save

        //delete before save to add this to the end, and prevent loose it in restorevodids
        if (PlayVod_VodIds[vod_id]) delete PlayVod_VodIds[vod_id];

        PlayVod_VodIds[vod_id] = parseInt(PlayVod_currentTime / 1000);
        Main_setItem('PlayVod_VodIds', JSON.stringify(PlayVod_VodIds));

    } else if (time > (ChannelVod_DurationSeconds - 300) && PlayVod_VodIds[vod_id]) {

        //if ended or almost delete
        delete PlayVod_VodIds[vod_id];

        Main_setItem('PlayVod_VodIds', JSON.stringify(PlayVod_VodIds));
    }
}

function PlayVod_RestoreVodIds() {
    PlayVod_VodIds = Main_getItemJson('PlayVod_VodIds', {});

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
    Main_setItem('PlayVod_VodIds', JSON.stringify(PlayVod_VodIds));
}

function Play_showVodDialog() {
    Main_HideElement('scene_channel_panel_bottom');
    PlayVod_showPanel(false);
    Main_innerHTML("dialog_vod_saved_text", STR_FROM + Play_timeMs(PlayVod_VodIds['#' + Main_values.ChannelVod_vodId] * 1000));
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

function PlayVod_DialogPressed(fromStart) {
    Play_HideVodDialog();
    if (!fromStart) {
        Main_values.vodOffset = PlayVod_VodIds['#' + Main_values.ChannelVod_vodId];
        PlayVod_currentTime = Main_values.vodOffset * 1000;
        PlayVod_ProgresBarrUpdate(Main_values.vodOffset, ChannelVod_DurationSeconds, true);
        PlayVod_PosStart();
    } else {
        delete PlayVod_VodIds['#' + Main_values.ChannelVod_vodId];
        Main_values.vodOffset = 0;
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
                if (Play_isFullScreen) {
                    if (!Play_isChatShown() && !Play_isEndDialogVisible() && !Play_isVodDialogShown()) {
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
            case KEY_LEFT:
                if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown()) {
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
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter--;
                    if (Play_Endcounter < 0) Play_Endcounter = 3;
                    if (Play_Endcounter === 1) Play_Endcounter = 0;
                    Play_EndIconsAddFocus();
                } else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_RIGHT:
                if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown()) {
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
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = 0;
                    if (Play_Endcounter === 1) Play_Endcounter = 2;
                    Play_EndIconsAddFocus();
                } else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_UP:
                if (Play_isEndDialogVisible()) Play_EndTextClear();
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
                } else if (Play_isFullScreen && Play_isChatShown()) {
                    if (Play_ChatSizeValue < 4) {
                        Play_ChatSizeValue++;
                        if (Play_ChatSizeValue === 4) Play_ChatPositionConvert(true);
                        Play_ChatSize(true);
                        if (Chat_div) Chat_div.scrollTop = Chat_div.scrollHeight;
                    } else Play_showChatBackgroundDialog(STR_SIZE + Play_ChatSizeVal[Play_ChatSizeVal.length - 1].percentage);
                } else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_DOWN:
                if (Play_isEndDialogVisible()) Play_EndTextClear();
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
                } else if (Play_isFullScreen && Play_isChatShown()) {
                    if (Play_ChatSizeValue > 1) {
                        Play_ChatSizeValue--;
                        if (Play_ChatSizeValue === 3) Play_ChatPositionConvert(false);
                        Play_ChatSize(true);
                        if (Chat_div) Chat_div.scrollTop = Chat_div.scrollHeight;
                    } else Play_showChatBackgroundDialog(STR_SIZE + Play_ChatSizeVal[0].percentage);
                } else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_ENTER:
                if (Play_isVodDialogShown()) PlayVod_DialogPressed(PlayVod_VodPositions);
                else if (Play_isEndDialogVisible()) Play_EndDialogPressed(2);
                else if (Play_isPanelShown()) {
                    if (!PlayVod_PanelY && PlayVod_addToJump) PlayVod_jump();
                    else Play_BottomOptionsPressed(2);
                } else PlayVod_showPanel(true);
                break;
            case KEY_RETURN:
                Play_KeyReturn(true);
                break;
            case KEY_PLAY:
            case KEY_PAUSE:
            case KEY_PLAYPAUSE:
                if (Play_isNotplaying()) Chat_Play(Chat_Id);
                else Chat_Pause();

                if (!Play_isEndDialogVisible()) Play_KeyPause(2);
                break;
            case KEY_YELLOW:
                if (!Play_isEndDialogVisible()) Play_showControlsDialog();
                break;
            case KEY_GREEN:
                if (!Main_isReleased) window.location.reload(true); // refresh the app from live
                break;
            case KEY_RED:
                Play_isFullScreen = !Play_isFullScreen;
                Play_SetFullScreen(Play_isFullScreen);
                break;
            case KEY_BLUE:
                Play_OpenSearch(2);
                break;
            default:
                break;
        }
    }
}