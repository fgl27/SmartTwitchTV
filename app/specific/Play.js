//Variable initialization
var Play_ChatPositions = 1;
var Play_ChatBackground = 0.55;
var Play_ChatSizeValue = 3;
var Play_PanelHideID = '';
var Play_quality = "source";
var Play_qualityPlaying = Play_quality;
var Play_sizePanelOffset = 0;

var Play_STATE_LOADING_TOKEN = 0;
var Play_STATE_LOADING_PLAYLIST = 1;
var Play_STATE_PLAYING = 2;
var Play_state = Play_STATE_LOADING_TOKEN;

var Play_streamInfoTimer = '';
var Play_tokenResponse = 0;
var Play_playlistResponse = 0;
var Play_playingTry = 0;

var Play_playingUrl = '';
var Play_qualities = [];
var Play_qualityIndex = 0;
var Play_ChatEnable = false;
var Play_exitID = '';

var Play_pauseEndID = '';
var Play_pauseStartID = '';

var Play_sizeOffset = 0;
var Play_created = '';

var Play_loadingDataTry = 0;
var Play_loadingDataTryMax = 10;

var Play_loadingInfoDataTry = 0;
var Play_loadingInfoDataTryMax = 15;

var Play_isOn = false;
var Play_ChatBackgroundID = null;
var Play_oldcurrentTime = 0;
var Play_offsettime = 0;
var Play_qualityCount = 0;
var Play_qualityName = [];
var Play_qualityLinks = [];
var Play_qualitiesFound = false;
var Play_PlayerTime = 0;
var Play_streamCheck = null;
var Play_PlayerCheckCount = 0;
var Play_RestoreFromResume = false;
var Play_PlayerCheckOffset = 0;
var Play_PlayerCheckQualityChanged = false;
var Play_Playing = false;
var Play_selectedChannel = '';
var Play_selectedChannelDisplayname = '';
var Play_Panelcouner = 0;
var Play_IsWarning = false;
var Play_gameSelected = '';
var Play_avplay;
var Play_LoadLogoSucess = false;
var Play_loadingInfoDataTimeout = 10000;
var Play_loadingDataTimeout = 3500;
var Play_Lang = '';
var Play_Endcounter = 0;
var Play_EndTextCounter = 3;
var Play_EndTextID = null;
var Play_DialogEndText = '';
var Play_currentTime = 0;
var Play_JustStartPlaying = true;
var Play_bufferingcomplete = false;
//Variable initialization end

function Play_PreStart() {
    Play_avplay = (window.tizen && window.webapis.avplay) || {};
    Play_ClearPlayer();
    Main_innerHTML("scene2_search_text", STR_SPACE + STR_SEARCH);
    Main_innerHTML("scene2_channel_text", STR_SPACE + STR_CHANNEL_CONT);
    Main_innerHTML("scene2_game_text", STR_SPACE + STR_GAME_CONT);

    Main_textContent("dialog_end_replay_text", STR_REPLAY);
    Main_textContent("dialog_end_vod_text", STR_CLIP_TO_VOD);
    Main_textContent("dialog_end_channel_text", STR_CHANNEL_CONT);
    Main_textContent("dialog_end_game_text", STR_GAME_CONT);

    Play_ChatPositions = parseInt(localStorage.getItem('ChatPositionsValue')) || 1;
    Play_ChatBackground = parseFloat(localStorage.getItem('ChatBackgroundValue')) || 0.55;
    Play_ChatSizeValue = parseInt(localStorage.getItem('ChatSizeValue')) || 3;
    Play_ChatEnable = localStorage.getItem('ChatEnable') === 'true' ? true : false;
    Main_textContent("play_dialog_exit_text", STR_EXIT_AGAIN);
    Main_innerHTML("dialog_buffer_play_text", STR_BUFFERING +
        '<div style="height: 45px; vertical-align: middle; display: inline-block; "><i class="fa icon-circle-o-notch fa-spin"></i><div id="dialog_buffer_play_percentage" style="display:flex; font-weight: bold; font-size: 38%; transform: translate(0,-220%);">0</div></div>');
    Main_innerHTML("chat_container", '<iframe id="chat_frame" width="100%" height="100%" frameborder="0" scrolling="no" style="position: absolute; overflow: hidden;" src="about:blank"></iframe>' +
        '<div id="scene_channel_dialog_chat" style="position: absolute; text-align: center; width: 100%; margin-top: 50%;">' +
        '<div id="scene_channel_dialog_chat_text" class="strokedbig" style="display: inline-block; font-size: 216%; color: white;"></div></div>');
    Main_innerHTML("dialog_controls_play_text", STR_CONTROLS_PLAY_0);
    Main_innerHTML("stream_controls", '<div style="vertical-align: middle; display: inline-block"><i class="icon-question-circle" style="color: #FFFFFF; font-size: 105%; "></i></div><div style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_CONTROL_KEY + '</div>');
}

function Play_Start() {
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    Play_showBufferDialog();
    Main_innerHTML("stream_live_icon", '<div style="vertical-align: middle; display: inline-block"><i class="icon-circle" style="color: red; font-size: 105%; "></i></div><div style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_LIVE.toUpperCase() + '</div>');
    Main_empty('stream_info_title');
    Play_LoadLogoSucess = false;
    document.getElementById('stream_info_icon').setAttribute('data-src', IMG_LOD_LOGO);
    Main_textContent("stream_info_name", Play_selectedChannelDisplayname);
    Main_textContent("stream_watching_time", STR_WATCHING + Play_timeMs(0));
    Main_textContent("stream_live_time", STR_SINCE + Play_timeMs(0) + STR_AGO);
    Main_textContent("dialog_buffer_play_percentage", 0);
    Play_ChatSize(false);
    Play_ChatBackgroundChange(false);

    Play_currentTime = 0;
    Play_IsWarning = false;
    Play_loadingInfoDataTry = 0;
    Play_loadingInfoDataTimeout = 10000;
    Play_updateStreamInfoStart();
    Play_streamInfoTimer = window.setInterval(Play_updateStreamInfo, 60000);
    Play_qualitiesFound = 0;
    Play_tokenResponse = 0;
    Play_playlistResponse = 0;
    Play_playingTry = 0;
    Play_state = Play_STATE_LOADING_TOKEN;
    Play_isOn = true;
    document.addEventListener('visibilitychange', Play_Resume, false);
    Play_Playing = false;
    Play_loadData();
    Play_EndSet(1);
}

function Play_Resume() {
    if (document.hidden) {
        Play_ClearPlayer();
        Play_Playing = false;
        document.getElementById('chat_frame').src = 'about:blank';
        window.clearInterval(Play_streamInfoTimer);
        window.clearInterval(Play_streamCheck);
    } else {
        Play_isOn = true;
        Main_ShowElement('scene2');
        Main_HideElement('scene1');
        Play_clearPause();
        Play_showBufferDialog();
        window.setTimeout(function() {
            if (!SmartHub_SmartHubResume) {
                if (Play_isOn) {
                    Play_RestoreFromResume = true;
                    Play_PlayerCheckOffset = 80;
                    Play_PlayerCheckQualityChanged = false;
                    Play_onPlayer();
                    Play_loadingInfoDataTry = 0;
                    Play_loadingInfoDataTimeout = 10000;
                    window.setTimeout(Play_updateStreamInfoStart, 7500); //7s is average time that takes to a stream to reload after a resume, so updateStreamInfoStart only after that
                    Play_streamInfoTimer = window.setInterval(Play_updateStreamInfo, 60000);
                    Play_streamCheck = window.setInterval(Play_PlayerCheck, 1500);
                }
            }
        }, 500);
    }
}

function Play_updateStreamInfoStart() {
    try {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    var response = JSON.parse(xmlHttp.responseText);
                    Main_textContent("stream_info_title", response.stream.channel.status);
                    Play_gameSelected = response.stream.game;
                    Play_Lang = ', [' + (response.stream.channel.language).toUpperCase() + ']';
                    Main_textContent("stream_info_game", STR_PLAYING + Play_gameSelected + STR_FOR +
                        Main_addCommas(response.stream.viewers) + ' ' + STR_VIEWER + Play_Lang);
                    Main_selectedChannelLogo = response.stream.channel.logo;
                    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_selectedChannelLogo);
                    Play_created = response.stream.created_at;
                    Play_LoadLogoSucess = true;
                    Main_selectedChannel_id = response.stream.channel._id;
                    if (Main_UserName !== '') {
                        AddCode_PlayRequest = true;
                        AddCode_CheckFallow();
                        Play_showFallow();
                    } else Play_hideFallow();
                } else { // internet error
                    Play_updateStreamInfoStartError();
                }
            }
        };
        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + Play_selectedChannel + '?' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = Play_loadingInfoDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.send(null);
    } catch (e) {
        Play_updateStreamInfoStartError();
    }
}

function Play_updateStreamInfoStartError() {
    Play_loadingInfoDataTry++;
    if (Play_loadingInfoDataTry < Play_loadingInfoDataTryMax) {
        Play_loadingInfoDataTimeout += 2000;
        Play_updateStreamInfoStart();
    }
}

function Play_updateStreamInfo() {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                try {
                    var response = JSON.parse(xmlHttp.responseText);
                    Main_textContent("stream_info_title", response.stream.channel.status);
                    Main_textContent("stream_info_game", STR_PLAYING + response.stream.game + STR_FOR +
                        Main_addCommas(response.stream.viewers) + ' ' + STR_VIEWER + Play_Lang);
                    if (!Play_LoadLogoSucess) Play_LoadLogo(document.getElementById('stream_info_icon'), response.stream.channel.logo);
                } catch (err) {}
            }
        }
    };
    xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + Play_selectedChannel + '?' + Math.round(Math.random() * 1e7), true);
    xmlHttp.timeout = 10000;
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.send(null);
}

function Play_LoadLogo(ImgObjet, link) {
    ImgObjet.onerror = function() {
        this.src = IMG_404_LOGO; //img fail to load use predefined
        Play_LoadLogoSucess = false;
    };
    ImgObjet.src = link;
}

function Play_loadData() {
    Play_loadingDataTry = 0;
    Play_loadingDataTimeout = 3500;
    Play_loadDataRequest();
}

function Play_loadDataRequest() {
    try {
        var xmlHttp = new XMLHttpRequest();

        var theUrl;
        if (Play_state === Play_STATE_LOADING_TOKEN) {
            theUrl = 'https://api.twitch.tv/api/channels/' + Play_selectedChannel + '/access_token';
        } else {
            theUrl = 'http://usher.twitch.tv/api/channel/hls/' + Play_selectedChannel +
                '.m3u8?player=twitchweb&&type=any&sig=' + Play_tokenResponse.sig + '&token=' +
                escape(Play_tokenResponse.token) + '&allow_source=true&allow_audi_only=true&' + Math.round(Math.random() * 1e7);
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = Play_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        Play_loadingDataTry = 0;
                        if (Play_isOn) Play_loadDataSuccess(xmlHttp.responseText);
                    } catch (err) {}
                } else {
                    if ((xmlHttp.responseText).indexOf('Bad auth token') !== -1) {
                        Play_restore();
                    } else Play_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (error) {
        Play_loadDataError();
    }
}

function Play_loadDataError() {
    if (Play_isOn) {
        Play_loadingDataTry++;
        if (Play_loadingDataTry < Play_loadingDataTryMax) {
            Play_loadingDataTimeout += (Play_loadingDataTry < 5) ? 250 : 3500;
            Play_loadDataRequest();
        } else {
            Play_HideBufferDialog();
            Play_PannelEndStart(1);
        }
    }
}

function Play_saveQualities() {
    Play_qualityName[Play_qualityCount] = Play_selectedChannel;
    Play_qualityLinks[Play_qualityCount] = Play_qualities;
    Play_qualityCount++;
}

function Play_restore() {
    for (var i = 0; i < Play_qualityName.length; i++) {
        if (Play_qualityName[i] === Play_selectedChannel) {
            Play_qualities = Play_qualityLinks[i];
            Play_qualitiesFound = true;
        }
    }

    if (Play_qualitiesFound) {
        Play_state = Play_STATE_PLAYING;
        if (Play_isOn) Play_qualityChanged();
    } else {
        Play_HideBufferDialog();
        Play_PannelEndStart(1);
    }
}

function Play_loadDataSuccess(responseText) {
    if (Play_state === Play_STATE_LOADING_TOKEN) {
        Play_tokenResponse = JSON.parse(responseText);
        Play_state = Play_STATE_LOADING_PLAYLIST;
        Play_loadData();
    } else if (Play_state === Play_STATE_LOADING_PLAYLIST) {
        Play_playlistResponse = responseText;
        Play_qualities = Play_extractQualities(Play_playlistResponse);
        Play_state = Play_STATE_PLAYING;
        SmartHub_SmartHubResume = false;
        if (Play_isOn) Play_qualityChanged();
        Play_saveQualities();
    }
}

function Play_extractQualities(input) {
    var Band,
        result = [],
        TempId = '',
        tempCount = 1;

    var streams = Play_extractStreamDeclarations(input);
    for (var i = 0; i < streams.length; i++) {
        TempId = streams[i].split('NAME="')[1].split('"')[0];
        Band = Play_extractBand(streams[i].split('BANDWIDTH=')[1].split(',')[0]);
        if (!result.length) {
            if (TempId.indexOf('ource') === -1) TempId = TempId + ' (source)';
            result.push({
                'id': TempId + Band,
                'url': streams[i].split("\n")[2]
            });
        } else if (result[i - tempCount].id !== TempId && result[i - tempCount].id !== TempId + ' (source)') {
            result.push({
                'id': TempId + Band,
                'url': streams[i].split("\n")[2]
            });
        } else tempCount++;
    }

    return result;
}

function Play_extractBand(input) {
    input = parseInt(input);
    return input > 0 ? ' (' + parseFloat(input / 1000000).toFixed(2) + 'Mbps)' : '';
}

function Play_extractStreamDeclarations(input) {
    var result = [];

    var myRegexp = /#EXT-X-MEDIA:(.)*\n#EXT-X-STREAM-INF:(.)*\n(.)*/g;
    var marray;
    while (marray = myRegexp.exec(input)) result.push(marray[0]); // jshint ignore:line 

    return result;
}

function Play_qualityChanged() {
    Play_qualityIndex = 0;
    Play_playingUrl = Play_qualities[0].url;
    if (Play_quality.indexOf("source") !== -1) Play_quality = "source";
    for (var i = 0; i < Play_getQualitiesCount(); i++) {
        if (Play_qualities[i].id === Play_quality) {
            Play_qualityIndex = i;
            Play_playingUrl = Play_qualities[i].url;
            break;
        } else if (Play_qualities[i].id.indexOf(Play_quality) !== -1) { //make shore to set a value before break out
            Play_qualityIndex = i;
            Play_playingUrl = Play_qualities[i].url;
        }
    }

    Play_qualityPlaying = Play_quality;
    if (Play_isOn) Play_onPlayer();
}

var Play_listener = {
    onbufferingstart: function() {
        Play_showBufferDialog();
        Play_bufferingcomplete = false;
    },
    onbufferingcomplete: function() {
        Play_HideBufferDialog();
        Play_bufferingcomplete = true;
        Main_textContent("dialog_buffer_play_percentage", 0);
        Play_RestoreFromResume = false;
    },
    onbufferingprogress: function(percent) {
        //percent has a -2 offset
        if (percent <= 98) Main_textContent("dialog_buffer_play_percentage", percent + 2);
        else {
            Play_HideBufferDialog();
            Play_bufferingcomplete = true;
            Main_textContent("dialog_buffer_play_percentage", 0);
            Play_RestoreFromResume = false;
        }
    },
    oncurrentplaytime: function(currentTime) {
        if (Play_currentTime !== currentTime) Play_updateCurrentTime(currentTime);
    },
    onstreamcompleted: function() {
        Play_PannelEndStart(1);
    }
};

function Play_onPlayer() {
    Play_showBufferDialog();
    console.log('Play_onPlayer:', '\n' + '\n' + Play_playingUrl + '\n');
    try {
        Play_avplay.stop();
        Play_avplay.open(Play_playingUrl);
        Play_avplay.setDisplayRect(0, 0, screen.width, screen.height);
        Play_avplay.setListener(Play_listener);
    } catch (e) {
        console.log(e);
    }

    Play_JustStartPlaying = true;
    Play_avplay.prepareAsync(function() {
        Play_avplay.play();
        Play_Playing = true;
    });

    Main_ready(function() {

        // sync chat and stream
        document.getElementById('chat_frame').src = 'https://www.nightdev.com/hosted/obschat/?theme=bttv_blackchat&channel=' + Play_selectedChannel + '&fade=false&bot_activity=true&prevent_clipping=false';

        Play_offsettime = Play_oldcurrentTime;
        Play_HideWarningDialog();
        Play_hidePanel();
        if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
        window.clearInterval(Play_streamCheck);
        Play_streamCheck = window.setInterval(Play_PlayerCheck, 1500);
    });
}

// If idle or playing, the media is be played or process to
// So we use PlayerCheck to avaluate if we are staled fro too long or not and drop the quality
function Play_isIdleOrPlaying() {
    var state = Play_avplay.getState();
    return !Play_isEndDialogShown() && (state === 'IDLE' || state === 'PLAYING');
}

function Play_PlayerCheck() {
    if (Play_isIdleOrPlaying() && Play_PlayerTime === Play_currentTime) {
        Play_PlayerCheckCount++;
        Play_PlayerCheckOffset = 0;
        if (Play_PlayerCheckQualityChanged && !Play_RestoreFromResume) Play_PlayerCheckOffset = -3;
        if (Play_PlayerCheckCount > (10 + Play_PlayerCheckOffset)) { //staled for 15 sec drop one quality
            Play_PlayerCheckCount = 0;
            if (Play_qualityIndex < Play_getQualitiesCount() - 1) {
                if (Play_PlayerCheckQualityChanged) Play_qualityIndex++; //Don't change first time only reload
                Play_qualityDisplay();
                Play_qualityChanged();
                Play_PlayerCheckQualityChanged = true; // -5s on next check
            } else {
                Play_avplay.stop();
                Play_PannelEndStart(1); //staled for too long close the player
            }
        }
    } else Play_PlayerCheckCount = 0;
    Play_PlayerTime = Play_currentTime;
}

function Play_isplaying() {
    return Play_avplay.getState() === 'PLAYING';
}

function Play_offPlayer() {
    Play_avplay.stop();
}

function Play_updateCurrentTime(currentTime) {
    Play_currentTime = currentTime;

    if (Play_WarningDialogVisible() && !Play_IsWarning) Play_HideWarningDialog();
    if (Play_bufferingcomplete) Play_HideBufferDialog();

    Play_oldcurrentTime = currentTime + Play_offsettime - 14000; // 14s buffer size from twitch
    if (Play_isPanelShown()) Main_textContent("stream_watching_time", STR_WATCHING + Play_timeMs(Play_oldcurrentTime));
}

function Play_clock(currentTime) {
    var date = new Date(),
        dayMonth;

    if (Main_IsDayFirst) dayMonth = date.getDate() + '/' + monthNames[date.getMonth()];
    else dayMonth = monthNames[date.getMonth()] + '/' + date.getDate();

    Main_textContent("stream_clock", dayMonth + ' ' + Play_lessthanten(date.getHours()) + ':' + Play_lessthanten(date.getMinutes()));
}

function Play_lessthanten(time) {
    return (time < 10) ? "0" + time : time;
}

function Play_timeS(time) {
    var seconds, minutes, hours;

    seconds = Play_lessthanten(parseInt(time) % 60);

    time = Math.floor(time / 60);
    minutes = Play_lessthanten(time % 60);

    time = Math.floor(time / 60);
    hours = Play_lessthanten(time);

    //final time 00:00 or 00:00:00
    return (!time) ? (minutes + ":" + seconds) : (hours + ":" + minutes + ":" + seconds);
}

function Play_timeMs(time) {
    var seconds, minutes, hours;

    seconds = Play_lessthanten(parseInt(time / 1000) % 60);

    time = Math.floor(time / 1000 / 60);
    minutes = Play_lessthanten(time % 60);

    time = Math.floor(time / 60);
    hours = Play_lessthanten(time);

    //final time 00:00 or 00:00:00
    return (!time) ? (minutes + ":" + seconds) : (hours + ":" + minutes + ":" + seconds);
}

function Play_streamLiveAt(time) { //time in '2017-10-27T13:27:27Z'
    return Play_timeMs((new Date().getTime()) - (new Date(time).getTime()));
}

function Play_shutdownStream() {
    if (Play_isOn) {
        Play_PreshutdownStream();
        Play_exitMain();
    }
}

function Play_PreshutdownStream() {
    Play_ClearPlayer();
    Play_ClearPlay();
    Play_isOn = false;
}

function Play_exitMain() {
    Main_ShowElement('scene1');
    Main_HideElement('scene2');
    Main_ReStartScreens();
}

function Play_ClearPlayer() {
    Play_offPlayer();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_HideEndDialog();
}

function Play_ClearPlay() {
    Play_Playing = false;
    document.body.removeEventListener("keydown", Play_handleKeyDown);
    document.removeEventListener('visibilitychange', Play_Resume);
    Play_oldcurrentTime = 0;
    Play_offsettime = 0;
    document.getElementById('chat_frame').src = 'about:blank';
    window.clearInterval(Play_streamInfoTimer);
    window.clearInterval(Play_streamCheck);
    Play_PlayerCheckOffset = 0;
    Play_RestoreFromResume = false;
    Play_PlayerCheckQualityChanged = false;
}

function Play_hideFallow() {
    Main_innerHTML("fallow_text", STR_SPACE + STR_NOKEY);
    AddCode_IsFallowing = false;
}

function Play_showFallow() {
    Main_ShowElement('scene2_heart');
}

function Play_showBufferDialog() {
    Main_ShowElement('dialog_buffer_play');
}

function Play_HideBufferDialog() {
    Main_HideElement('dialog_buffer_play');
}

function Play_BufferDialogVisible() {
    return Main_isElementShowing('dialog_buffer_play');
}

function Play_showWarningDialog(text) {
    Main_textContent("dialog_warning_play_text", text);
    Main_ShowElement('dialog_warning_play');
}

function Play_HideWarningDialog() {
    Main_HideElement('dialog_warning_play');
}

function Play_WarningDialogVisible() {
    return Main_isElementShowing('dialog_warning_play');
}

function Play_showExitDialog() {
    if (!Play_ExitDialogVisible()) {
        Main_ShowElement('play_dialog_exit');
        Play_exitID = window.setTimeout(Play_showExitDialog, 3000);
    } else {
        Play_CleanHideExit();
    }
}

function Play_CleanHideExit() {
    window.clearTimeout(Play_exitID);
    Main_HideElement('play_dialog_exit');
}

function Play_ExitDialogVisible() {
    return Main_isElementShowing('play_dialog_exit');
}

// For some reason clearTimeout fail some time when two are set in a sequence on the same function
function Play_clearPauseEnd() {
    window.clearTimeout(Play_pauseEndID);
}

function Play_clearPauseStart() {
    window.clearTimeout(Play_pauseStartID);
}

function Play_clearPause() {
    Play_clearPauseEnd();
    Play_clearPauseStart();
    Main_HideElement('play_dialog_simple_pause');
}

function Play_showPauseDialog() {
    if (Play_isplaying()) Play_clearPause();
    else if (!Play_isShowPauseDialogOn()) {
        Main_ShowElement('play_dialog_simple_pause');
        Play_pauseEndID = window.setTimeout(Play_showPauseDialog, 1500);
    } else {
        Main_HideElement('play_dialog_simple_pause');
        Play_pauseStartID = window.setTimeout(Play_showPauseDialog, 8000); // time in ms
    }
}

function Play_isShowPauseDialogOn() {
    return Main_isElementShowing('play_dialog_simple_pause');
}

function Play_isPanelShown() {
    return document.getElementById("scene_channel_panel").style.opacity === '1';
}

function Play_hidePanel() {
    Play_clearHidePanel();
    document.getElementById("scene_channel_panel").style.opacity = "0";
    Play_quality = Play_qualityPlaying;
    Play_sizePanelOffset = 0;
    if (Play_ChatPositions === 1 || Play_ChatPositions === 7 || Play_ChatPositions === 8) Play_ChatPosition();
}

function Play_showPanel() {
    Play_Panelcouner = 0;
    Play_IconsFocus();
    Play_qualityIndexReset();
    Play_qualityDisplay();
    Main_textContent("stream_live_time", STR_SINCE + Play_streamLiveAt(Play_created) + STR_AGO);
    Main_textContent("stream_watching_time", STR_WATCHING + Play_timeMs(Play_oldcurrentTime));
    Play_clock();
    Play_CleanHideExit();
    document.getElementById("scene_channel_panel").style.opacity = "1";
    Play_setHidePanel();
    Play_sizePanelOffset = -5;
    if (Play_ChatPositions === 1 || Play_ChatPositions === 7 || Play_ChatPositions === 8) Play_ChatPosition();
}

function Play_clearHidePanel() {
    window.clearTimeout(Play_PanelHideID);
}

function Play_setHidePanel() {
    Play_PanelHideID = window.setTimeout(Play_hidePanel, 5000);
}

function Play_showChat() {
    Play_ChatPosition();
    Main_ShowElement('chat_container');
}

function Play_hideChat() {
    Main_HideElement('chat_container');
}

function Play_isChatShown() {
    return Main_isElementShowing('chat_container');
}

function Play_showControlsDialog() {
    Play_CleanHideExit();
    Main_ShowElement('dialog_controls_play');
}

function Play_HideControlsDialog() {
    Main_HideElement('dialog_controls_play');
}

function Play_isControlsDialogShown() {
    return Main_isElementShowing('dialog_controls_play');
}

function Play_qualityIndexReset() {
    Play_qualityIndex = 0;
    for (var i = 0; i < Play_getQualitiesCount(); i++) {
        if (Play_qualities[i].id === Play_quality) {
            Play_qualityIndex = i;
            break;
        } else if (Play_qualities[i].id.indexOf(Play_quality) !== -1) { //make shore to set a value before break out
            Play_qualityIndex = i;
        }
    }
}

function Play_qualityDisplay() {
    if (!Play_qualityIndex) {
        document.getElementById("quality_arrow_up").style.opacity = "0.2";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    } else if (Play_qualityIndex === Play_getQualitiesCount() - 1) {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "0.2";
    } else {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    }

    Play_quality = Play_qualities[Play_qualityIndex].id;

    if (Play_quality.indexOf('source') !== -1) Main_textContent("quality_name", Play_quality.replace("source", STR_SOURCE));
    else dMain_textContent("quality_name", Play_quality);
}

function Play_getQualitiesCount() {
    return Play_qualities.length;
}

function Play_ChatSize(showDialog) {
    var containerHeight = 48,
        percentage = 100,
        dialogTop = 50;
    Play_sizeOffset = 0;
    if (Play_ChatSizeValue === 2) {
        containerHeight = 32;
        percentage = 66;
        dialogTop = 25;
        Play_sizeOffset = 16;
    } else if (Play_ChatSizeValue === 1) {
        containerHeight = 17;
        percentage = 33;
        dialogTop = 12.5;
        Play_sizeOffset = 31;
    }
    document.getElementById("chat_container").style.height = containerHeight + '%';
    //window.parent.document.getElementById("chat_frame").style.height = '100%';
    document.getElementById("scene_channel_dialog_chat").style.marginTop = dialogTop + '%';
    Play_ChatPosition();
    if (showDialog) Play_showChatBackgroundDialog('Size ' + percentage + '%');

    localStorage.setItem('ChatSizeValue', Play_ChatSizeValue);
}

function Play_ChatBackgroundChange(showDialog) {
    var chat_value = Play_ChatBackground - 0.05; //Do not save a 0 value for ChatBackgroundValue

    if (chat_value < 0.05) chat_value = 0;
    else chat_value = chat_value.toFixed(2);

    document.getElementById("chat_container").style.backgroundColor = "rgba(0, 0, 0, " + chat_value + ")";
    if (showDialog) Play_showChatBackgroundDialog('Brightness ' + (chat_value * 100).toFixed(0) + '%');

    localStorage.setItem('ChatBackgroundValue', Play_ChatBackground);
}

function Play_ChatPosition() {
    //default
    var left = "75.3%",
        top = (52 + Play_sizeOffset + Play_sizePanelOffset) + '%';

    if (!Play_ChatPositions) Play_ChatPositions = 8;

    if (Play_ChatPositions < 9) {
        if (Play_ChatPositions > 1) top = "33%"; // center/lefth
        if (Play_ChatPositions > 2) top = "0%"; // top/lefth
        if (Play_ChatPositions > 3) left = "38.3%"; // top/midle
        if (Play_ChatPositions > 4) left = "0%"; // top/right
        if (Play_ChatPositions > 5) top = "33%"; // center/right
        if (Play_ChatPositions > 6) top = (52 + Play_sizeOffset + Play_sizePanelOffset) + '%'; // bottom/lefth
        if (Play_ChatPositions > 7) left = "38.3%"; // bottom/midle
    } else Play_ChatPositions = 1;

    document.getElementById("chat_container").style.top = top;
    document.getElementById("chat_container").style.left = left;
    localStorage.setItem('ChatPositionsValue', Play_ChatPositions);
}

function Play_showChatBackgroundDialog(DialogText) {
    window.clearTimeout(Play_ChatBackgroundID);
    Main_textContent("scene_channel_dialog_chat_text", DialogText);
    Main_ShowElement('scene_channel_dialog_chat');
    Play_ChatBackgroundID = window.setTimeout(Play_hideChatBackgroundDialog, 1000);
}

function Play_hideChatBackgroundDialog() {
    Main_HideElement('scene_channel_dialog_chat');
}

function Play_KeyPause(PlayVodClip) {
    if (Play_isplaying()) {
        if (PlayVodClip === 1) window.clearInterval(Play_streamCheck);
        else if (PlayVodClip === 2) window.clearInterval(PlayVod_streamCheck);
        else if (PlayVodClip === 3) window.clearInterval(PlayClip_streamCheck);

        Play_avplay.pause();
        webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
        Play_showPauseDialog();
    } else {
        Play_clearPause();
        Play_avplay.play();
        webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
        if (Play_isPanelShown()) Play_hidePanel();

        if (PlayVodClip === 1) Play_streamCheck = window.setInterval(Play_PlayerCheck, 1500);
        else if (PlayVodClip === 2) PlayVod_streamCheck = window.setInterval(PlayVod_PlayerCheck, 1500);
        else if (PlayVodClip === 3) PlayClip_streamCheck = window.setInterval(PlayClip_PlayerCheck, 1500);
    }
}

function Play_IconsFocus() {
    Main_ChangeBorder("scene2_quality", "3.5px solid rgba(0, 0, 0, 0)");
    Main_ChangebackgroundColor("scene2_quality", "rgba(0, 0, 0, 0)");

    Main_ChangeBorder("scene2_heart", "3.5px solid rgba(0, 0, 0, 0)");
    Main_ChangebackgroundColor("scene2_heart", "rgba(0, 0, 0, 0)");

    Main_ChangeBorder("scene2_channel", "3.5px solid rgba(0, 0, 0, 0)");
    Main_ChangebackgroundColor("scene2_channel", "rgba(0, 0, 0, 0)");

    Main_ChangeBorder("scene2_game", "3.5px solid rgba(0, 0, 0, 0)");
    Main_ChangebackgroundColor("scene2_game", "rgba(0, 0, 0, 0)");

    Main_ChangeBorder("scene2_search", "3.5px solid rgba(0, 0, 0, 0)");
    Main_ChangebackgroundColor("scene2_search", "rgba(0, 0, 0, 0)");

    if (!Play_Panelcouner) {
        Main_ChangeBorder("scene2_quality", "3.5px solid #FFFFFF");
        Main_ChangebackgroundColor("scene2_quality", "rgba(0, 0, 0, 0.7)");
    } else if (Play_Panelcouner === 1) {
        Main_ChangeBorder("scene2_heart", "3.5px solid #FFFFFF");
        Main_ChangebackgroundColor("scene2_heart", "rgba(0, 0, 0, 0.7)");
    } else if (Play_Panelcouner === 2) {
        Main_ChangeBorder("scene2_game", "3.5px solid #FFFFFF");
        Main_ChangebackgroundColor("scene2_game", "rgba(0, 0, 0, 0.7)");
    } else if (Play_Panelcouner === 3) {
        Main_ChangeBorder("scene2_channel", "3.5px solid #FFFFFF");
        Main_ChangebackgroundColor("scene2_channel", "rgba(0, 0, 0, 0.7)");
    } else if (Play_Panelcouner === 4) {
        Main_ChangeBorder("scene2_search", "3.5px solid #FFFFFF");
        Main_ChangebackgroundColor("scene2_search", "rgba(0, 0, 0, 0.7)");
    }
}

function Play_PrepareshowEndDialog(PlayVodClip) {
    Play_state = Play_STATE_PLAYING;
    PlayVod_state = Play_STATE_PLAYING;
    PlayClip_state = PlayClip_STATE_PLAYING;
    Play_hideChat();
    Play_hidePanel();
    PlayClip_hidePanel();
    PlayVod_hidePanel();
    Play_HideWarningDialog();
    Play_HideBufferDialog();
    Play_CleanHideExit();
    Play_HideControlsDialog();
    Play_EndIconsFocus(PlayVodClip);
}

function Play_showEndDialog(PlayVodClip) {
    Main_ShowElement('dialog_end_stream');
}

function Play_HideEndDialog() {
    Main_HideElement('dialog_end_stream');
    Play_EndTextClear();
    Play_Endcounter = 0;
}

function Play_isEndDialogShown() {
    return Main_isElementShowing('dialog_end_stream');
}

function Play_EndIconsFocus(PlayVodClip) {
    Main_ChangeBorder("dialog_end_replay", "3.5px solid rgba(0, 0, 0, 0)");
    Main_ChangebackgroundColor("dialog_end_replay", "rgba(0, 0, 0, 0)");

    Main_ChangeBorder("dialog_end_vod", "3.5px solid rgba(0, 0, 0, 0)");
    Main_ChangebackgroundColor("dialog_end_vod", "rgba(0, 0, 0, 0)");

    Main_ChangeBorder("dialog_end_channel", "3.5px solid rgba(0, 0, 0, 0)");
    Main_ChangebackgroundColor("dialog_end_channel", "rgba(0, 0, 0, 0)");

    Main_ChangeBorder("dialog_end_game", "3.5px solid rgba(0, 0, 0, 0)");
    Main_ChangebackgroundColor("dialog_end_game", "rgba(0, 0, 0, 0)");

    if (PlayVodClip === 1 && Play_Endcounter < 2) Play_Endcounter += 2;

    if (!Play_Endcounter) {
        Main_ChangeBorder("dialog_end_replay", "3.5px solid #FFFFFF");
        Main_ChangebackgroundColor("dialog_end_replay", "rgba(150,150,150, 0.7)");
    } else if (Play_Endcounter === 1) {
        Main_ChangeBorder("dialog_end_vod", "3.5px solid #FFFFFF");
        Main_ChangebackgroundColor("dialog_end_vod", "rgba(150,150,150, 0.7)");
    } else if (Play_Endcounter === 2) {
        Main_ChangeBorder("dialog_end_channel", "3.5px solid #FFFFFF");
        Main_ChangebackgroundColor("dialog_end_channel", "rgba(150,150,150, 0.7)");
    } else if (Play_Endcounter === 3) {
        Main_ChangeBorder("dialog_end_game", "3.5px solid #FFFFFF");
        Main_ChangebackgroundColor("dialog_end_game", "rgba(150,150,150, 0.7)");
    }
}

function Play_EndText(PlayVodClip) {
    if (PlayVodClip === 1) Play_DialogEndText = Play_selectedChannelDisplayname + ' ' + STR_LIVE;
    else if (PlayVodClip === 2) Play_DialogEndText = Main_selectedChannelDisplayname + STR_VIDEO;
    else if (PlayVodClip === 3) Play_DialogEndText = Main_selectedChannelDisplayname + STR_CLIP;
    Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR + STR_STREAM_END +
        Play_EndTextCounter + '...');
    Play_EndTextCounter--;
    if (Play_EndTextCounter === -1) {
        Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR + STR_STREAM_END +
            '0...');
        Play_CleanHideExit();
        Play_hideChat();

        if (PlayVodClip === 1) Main_ready(Play_shutdownStream);
        else if (PlayVodClip === 2) Main_ready(PlayVod_shutdownStream);
        else if (PlayVodClip === 3) Main_ready(PlayClip_shutdownStream);

    } else {
        Play_EndTextID = window.setTimeout(function() {
            Play_EndText(PlayVodClip);
        }, 1000);
    }
}

function Play_EndTextClear() {
    window.clearTimeout(Play_EndTextID);
    Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR + STR_STREAM_END_EXIT);
}

function Play_EndEnterPressed(PlayVodClip) {
    if (!Play_Endcounter) {
        if (PlayVodClip === 2) {
            PlayVod_offsettime = 0;
            PlayVod_PlayerCheckQualityChanged = false;
            PlayVod_qualityChanged();
            Play_clearPause();
        } else if (PlayVodClip === 3) {
            PlayClip_offsettime = 0;
            PlayClip_PlayerCheckQualityChanged = false;
            PlayClip_qualityChanged();
            Play_clearPause();
        }
    } else if (Play_Endcounter === 1) PlayClip_OpenVod();
    else if (Play_Endcounter === 2) Play_OpenChannel(PlayVodClip);
    else if (Play_Endcounter === 3) Play_OpenGame(PlayVodClip);
    Play_HideEndDialog();
}

function Play_EndSet(PlayVodClip) {
    document.getElementById('dialog_end_replay').style.display = 'inline-block';
    document.getElementById('dialog_end_vod').style.display = 'inline-block';
    if (PlayVodClip === 1) {
        document.getElementById('dialog_end_replay').style.display = 'none';
        document.getElementById('dialog_end_vod').style.display = 'none';
    } else if (PlayVodClip > 1) document.getElementById('dialog_end_vod').style.display = 'none';
}

function Play_OpenChannel(PlayVodClip) {
    if (!Main_BeforeChannelisSet && Main_Go !== Main_Svod && Main_Go !== Main_Sclip) {
        Main_BeforeChannel = (Main_BeforeAgameisSet && Main_Go !== Main_aGame) ? Main_BeforeAgame : Main_Go;
        Main_BeforeChannelisSet = true;
    }

    Main_ExitCurrent(Main_Go);
    Main_Go = Main_SChannelContent;

    if (PlayVodClip === 1) {
        Main_selectedChannel = Play_selectedChannel;
        Main_selectedChannelDisplayname = Play_selectedChannelDisplayname;
        SChannelContent_UserChannels = AddCode_IsFallowing;
        Play_hideChat();
        Main_ready(Play_shutdownStream);
    } else if (PlayVodClip === 2) Main_ready(PlayVod_shutdownStream);
    else if (PlayVodClip === 3) Main_ready(PlayClip_shutdownStream);
}

function Play_OpenSearch(PlayVodClip) {
    if (!Search_isSearching) Main_BeforeSearch = Main_Go;
    Main_ExitCurrent(Main_Go);
    Main_Go = Main_Search;

    if (PlayVodClip === 1) {
        Play_hideChat();
        Main_ready(Play_shutdownStream);
    } else if (PlayVodClip === 2) Main_ready(PlayVod_shutdownStream);
    else if (PlayVodClip === 3) Main_ready(PlayClip_shutdownStream);
}

function Play_OpenGame(PlayVodClip) {
    if (!Main_BeforeAgameisSet && Main_Go !== Main_Gvod && Main_Go !== Main_Gclip) {
        Main_BeforeAgame = (Main_BeforeChannelisSet && Main_Go !== Main_SChannelContent && Main_Go !== Main_Svod && Main_Go !== Main_Sclip) ? Main_BeforeChannel : Main_Go;
        Main_BeforeAgameisSet = true;
    }

    Main_ExitCurrent(Main_Go);
    Main_Go = Main_aGame;
    AGame_UserGames = false;

    if (PlayVodClip === 1) {
        Main_gameSelected = Play_gameSelected;
        Play_hideChat();
        Main_ready(Play_shutdownStream);
    } else if (PlayVodClip === 2) {
        Main_gameSelected = Svod_game;
        Main_ready(PlayVod_shutdownStream);
    } else if (PlayVodClip === 3) Main_ready(PlayClip_shutdownStream);
}

function Play_FallowUnfallow() {
    if (AddCode_OauthToken !== '') {
        if (AddCode_IsFallowing) AddCode_UnFallow();
        else AddCode_Fallow();
    } else {
        Play_showWarningDialog(STR_NOKEY_WARN);
        Play_IsWarning = true;
        window.setTimeout(function() {
            Play_HideWarningDialog();
            Play_IsWarning = false;
        }, 2000);
    }
}

// PlayVodClip | play = 1 | vod = 2 | clip = 1
function Play_PannelEnterPressed(PlayVodClip) {
    if (!Play_Panelcouner) {
        if (PlayVodClip === 1) {
            Play_PlayerCheckQualityChanged = false;
            Play_qualityChanged();
        } else if (PlayVodClip === 2) {
            PlayVod_offsettime = Play_avplay.getCurrentTime();
            PlayVod_PlayerCheckQualityChanged = false;
            PlayVod_qualityChanged();
        } else if (PlayVodClip === 3) {
            PlayClip_offsettime = Play_avplay.getCurrentTime();
            PlayClip_PlayerCheckQualityChanged = false;
            PlayClip_qualityChanged();
        }
        Play_clearPause();
    } else if (Play_Panelcouner === 1) {
        Play_FallowUnfallow();

        if (PlayVodClip === 1) {
            Play_clearHidePanel();
            Play_setHidePanel();
        } else if (PlayVodClip === 2) {
            PlayVod_clearHidePanel();
            PlayVod_setHidePanel();
        } else if (PlayVodClip === 3) {
            PlayClip_clearHidePanel();
            PlayClip_setHidePanel();
        }
    } else if (Play_Panelcouner === 2) Play_OpenGame(PlayVodClip);
    else if (Play_Panelcouner === 3) Play_OpenChannel(PlayVodClip);
    else if (Play_Panelcouner === 4) Play_OpenSearch(PlayVodClip);
}

function Play_PannelEndStart(PlayVodClip) {
    Play_PrepareshowEndDialog(PlayVodClip);
    Play_EndTextCounter = 3;
    Main_ready(function() {
        Play_EndText(PlayVodClip);
        Play_showEndDialog(PlayVodClip);
    });
}

function Play_setFallow() {
    if (AddCode_IsFallowing) {
        Main_innerHTML("fallow_heart", '<i class="icon-heart" style="color: #00b300; font-size: 210%; text-shadow: #FFFFFF 0 0 3px, #FFFFFF 0 0 3px, #FFFFFF 0 0 2px;"></i>');
        Main_innerHTML("fallow_text", STR_SPACE + STR_FALLOWING);
    } else {
        Main_innerHTML("fallow_heart", '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 210%; text-shadow: #000000 0 0 3px, #000000 0 0 3px, #000000 0 0 2px;"></i>');
        Main_innerHTML("fallow_text", STR_SPACE + STR_FALLOW);
    }
}

function Play_KeyReturn(is_vod) {
    if (Play_isControlsDialogShown()) Play_HideControlsDialog();
    else if (Play_isEndDialogShown() && !Play_ExitDialogVisible()) {
        Play_EndTextClear();
        Play_showExitDialog();
    } else if (Play_isPanelShown()) {
        Play_hidePanel();
    } else {
        if (is_vod && Play_WarningDialogVisible() && PlayVod_IsJumping) {
            window.clearTimeout(PlayVod_JumpID);
            PlayVod_jumpCount = 0;
            PlayVod_jumpCancel();
        } else if (Play_ExitDialogVisible()) {
            Play_CleanHideExit();
            Play_hideChat();
            if (is_vod) Main_ready(PlayVod_shutdownStream);
            else Main_ready(Play_shutdownStream);
        } else if (Play_WarningDialogVisible()) {
            Play_HideWarningDialog();
            Play_showExitDialog();
        } else {
            Play_showExitDialog();
        }
    }
}

function Play_handleKeyDown(e) {
    if (Play_state !== Play_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_RETURN:
                if (Play_ExitDialogVisible()) {
                    Play_CleanHideExit();
                    Play_hideChat();
                    Main_ready(Play_shutdownStream);
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
                if (!Play_isPanelShown() && Play_isChatShown()) {
                    Play_ChatBackground -= 0.05;
                    if (Play_ChatBackground < 0.05) Play_ChatBackground = 0.05;
                    Play_ChatBackgroundChange(true);
                } else if (Play_isPanelShown()) {
                    Play_Panelcouner++;
                    if (Play_Panelcouner > 4) Play_Panelcouner = 0;
                    Play_IconsFocus();
                    Play_clearHidePanel();
                    Play_setHidePanel();
                } else if (Play_isEndDialogShown()) {
                    Play_EndTextClear();
                    Play_Endcounter--;
                    if (Play_Endcounter < 0) Play_Endcounter = 3;
                    Play_EndIconsFocus(1);
                } else {
                    Play_showPanel();
                }
                break;
            case KEY_RIGHT:
                if (!Play_isPanelShown() && Play_isChatShown()) {
                    Play_ChatBackground += 0.05;
                    if (Play_ChatBackground > 1.05) Play_ChatBackground = 1.05;
                    Play_ChatBackgroundChange(true);
                } else if (Play_isPanelShown()) {
                    Play_Panelcouner--;
                    if (Play_Panelcouner < 0) Play_Panelcouner = 4;
                    Play_IconsFocus();
                    Play_clearHidePanel();
                    Play_setHidePanel();
                } else if (Play_isEndDialogShown()) {
                    Play_EndTextClear();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = 0;
                    Play_EndIconsFocus(1);
                } else {
                    Play_showPanel();
                }
                break;
            case KEY_UP:
                if (Play_isPanelShown()) {
                    if (Play_qualityIndex > 0 && (!Play_Panelcouner)) {
                        Play_qualityIndex--;
                        Play_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    Play_setHidePanel();
                } else if (Play_isChatShown()) {
                    if (Play_ChatSizeValue < 3) {
                        Play_ChatSizeValue++;
                        Play_ChatSize(true);
                    } else Play_showChatBackgroundDialog('Size 100%');
                } else if (Play_isEndDialogShown()) Play_EndTextClear();
                else {
                    Play_showPanel();
                }
                break;
            case KEY_DOWN:
                if (Play_isPanelShown()) {
                    if (Play_qualityIndex < Play_getQualitiesCount() - 1 && (!Play_Panelcouner)) {
                        Play_qualityIndex++;
                        Play_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    Play_setHidePanel();
                } else if (Play_isChatShown()) {
                    if (Play_ChatSizeValue > 1) {
                        Play_ChatSizeValue--;
                        Play_ChatSize(true);
                    } else Play_showChatBackgroundDialog('Size 33%');
                } else if (Play_isEndDialogShown()) Play_EndTextClear();
                else {
                    Play_showPanel();
                }
                break;
            case KEY_ENTER:
                if (Play_isEndDialogShown()) Play_EndEnterPressed(1);
                else if (Play_isPanelShown()) Play_PannelEnterPressed(1);
                else Play_showPanel();
                break;
            case KEY_RETURN:
                Play_KeyReturn(false);
                break;
            case KEY_PLAY:
            case KEY_PAUSE:
            case KEY_PLAYPAUSE:
                if (!Play_isEndDialogShown()) Play_KeyPause(1);
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