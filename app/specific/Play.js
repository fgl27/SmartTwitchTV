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
var Play_selectedChannelLogo = '';
var Play_gameSelected = '';
var Play_videojs = null;
var Play_LoadLogoSucess = false;
var Play_loadingInfoDataTimeout = 10000;
var Play_selectedChannelViews = '';
var Play_selectedChannelFallower = '';
var Play_loadingDataTimeout = 3500;
var Play_Lang = '';
//Variable initialization end

function Play_PreStart() {
    Play_videojs = videojs('video_live');
    Play_ClearPlayer();
    document.getElementById("scene2_search_text").innerHTML = STR_SPACE + STR_SEARCH;
    document.getElementById("scene2_channel_text").innerHTML = STR_SPACE + STR_CHANNEL_CONT;
    document.getElementById("scene2_game_text").innerHTML = STR_SPACE + STR_GAME_CONT;
    Play_ChatPositions = parseInt(localStorage.getItem('ChatPositionsValue')) || 1;
    Play_ChatBackground = parseFloat(localStorage.getItem('ChatBackgroundValue')) || 0.55;
    Play_ChatSizeValue = parseInt(localStorage.getItem('ChatSizeValue')) || 3;
    Play_ChatEnable = localStorage.getItem('ChatEnable') === 'true' ? true : false;
    document.getElementById("play_dialog_exit_text").innerHTML = STR_EXIT_AGAIN;
    document.getElementById("dialog_buffer_play_text").innerHTML = STR_BUFFERING +
        '<div style="height: 45px; vertical-align: middle; display: inline-block; "><i class="fa icon-circle-o-notch fa-spin"></i></div>';
    document.getElementById("chat_container").innerHTML = '<iframe id="chat_frame" width="100%" height="100%" frameborder="0" scrolling="no" style="position: absolute; overflow: hidden;" src="about:blank"></iframe>' +
        '<div id="scene_channel_dialog_chat" style="position: absolute; text-align: center; width: 100%; margin-top: 50%;">' +
        '<div id="scene_channel_dialog_chat_text" class="strokedbig" style="display: inline-block; font-size: 216%; color: white;"></div></div>';
    document.getElementById("dialog_controls_play_text").innerHTML = STR_CONTROLS_PLAY_0;
    document.getElementById("stream_controls").innerHTML =
        '<div style="vertical-align: middle; display: inline-block"><i class="icon-question-circle" style="color: #FFFFFF; font-size: 105%; "></i></div><div style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_CONTROL_KEY + '</div>';
}

function Play_Start() {
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    Play_showBufferDialog();
    document.getElementById("stream_live_icon").innerHTML =
        '<div style="vertical-align: middle; display: inline-block"><i class="icon-circle" style="color: red; font-size: 105%; "></i></div><div style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_LIVE.toUpperCase() + '</div>';
    document.getElementById("stream_info_title").innerHTML = '';
    Play_LoadLogoSucess = false;
    document.getElementById('stream_info_icon').setAttribute('data-src', IMG_LOD_LOGO);
    document.getElementById("stream_info_name").innerHTML = Play_selectedChannelDisplayname;
    document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play_timeS(0);
    document.getElementById("stream_live_time").innerHTML = STR_SINCE + Play_timeS(0) + STR_AGO;
    Play_ChatSize(false);
    Play_ChatBackgroundChange(false);
    document.getElementById('scene2_game').classList.remove('hide');

    Play_IsWarning = false;
    Play_loadingInfoDataTry = 0;
    Play_loadingInfoDataTimeout = 10000;
    Play_updateStreamInfoStart();
    Play_streamInfoTimer = window.setInterval(Play_updateStreamInfo, 60000);
    Play_streamCheck = window.setInterval(Play_PlayerCheck, 500);
    Play_qualitiesFound = 0;
    Play_tokenResponse = 0;
    Play_playlistResponse = 0;
    Play_playingTry = 0;
    Play_state = Play_STATE_LOADING_TOKEN;
    Play_isOn = true;
    document.addEventListener('visibilitychange', Play_Resume, false);
    Play_Playing = false;
    Play_loadData();
}

function Play_Resume() {
    if (document.hidden) {
        Play_ClearPlayer();
        Play_Playing = false;
        document.getElementById('chat_frame').src = 'about:blank';
        window.clearInterval(Play_streamInfoTimer);
        window.clearInterval(Play_streamCheck);
    } else {
        document.getElementById('scene2').classList.remove('hide');
        document.getElementById('scene1').classList.add('hide');
        Play_clearPause();
        Play_showBufferDialog();
        window.setTimeout(function() {
            if (!SmartHub_SmartHubResume) {
                Play_RestoreFromResume = true;
                Play_PlayerCheckOffset = 80;
                Play_PlayerCheckQualityChanged = false;
                Play_onPlayer();
                Play_loadingInfoDataTry = 0;
                Play_loadingInfoDataTimeout = 10000;
                window.setTimeout(Play_updateStreamInfoStart, 7500); //7s is average time that takes to a stream to reload after a resume, so updateStreamInfoStart only after that
                Play_streamInfoTimer = window.setInterval(Play_updateStreamInfo, 60000);
                Play_streamCheck = window.setInterval(Play_PlayerCheck, 500);
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
                    document.getElementById("stream_info_title").innerHTML = response.stream.channel.status;
                    Play_gameSelected = response.stream.game;
                    Play_Lang = ', [' + (response.stream.channel.language).toUpperCase() + ']';
                    document.getElementById("stream_info_game").innerHTML = STR_PLAYING + Play_gameSelected + STR_FOR +
                        Main_addCommas(response.stream.viewers) + ' ' + STR_VIEWER + Play_Lang;
                    Play_selectedChannelLogo = response.stream.channel.logo;
                    Play_LoadLogo(document.getElementById('stream_info_icon'), Play_selectedChannelLogo);
                    Play_created = response.stream.created_at;
                    Play_LoadLogoSucess = true;
                    Play_selectedChannelViews = response.stream.channel.views;
                    Play_selectedChannelFallower = response.stream.channel.followers;
                    if (Main_UserName !== '') {
                        AddCode_userChannel = response.stream.channel._id;
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
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
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
                    document.getElementById("stream_info_title").innerHTML = response.stream.channel.status;
                    document.getElementById("stream_info_game").innerHTML = STR_PLAYING + response.stream.game + STR_FOR +
                        Main_addCommas(response.stream.viewers) + ' ' + STR_VIEWER + Play_Lang;
                    if (!Play_LoadLogoSucess) Play_LoadLogo(document.getElementById('stream_info_icon'), response.stream.channel.logo);
                } catch (err) {}
            }
        }
    };
    xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + Play_selectedChannel + '?' + Math.round(Math.random() * 1e7), true);
    xmlHttp.timeout = 10000;
    xmlHttp.setRequestHeader('Client-ID', Main_clientId);
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
            theUrl = 'http://api.twitch.tv/api/channels/' + Play_selectedChannel + '/access_token';
        } else {
            theUrl = 'http://usher.twitch.tv/api/channel/hls/' + Play_selectedChannel +
                '.m3u8?player=twitchweb&&type=any&sig=' + Play_tokenResponse.sig + '&token=' +
                escape(Play_tokenResponse.token) + '&allow_source=true&allow_audi_only=true&' + Math.round(Math.random() * 1e7);
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = Play_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);

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
            Play_showWarningDialog(STR_IS_OFFLINE);
            window.setTimeout(Play_shutdownStream, 2000);
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
        Play_showWarningDialog(STR_IS_OFFLINE);
        window.setTimeout(Play_shutdownStream, 1500);
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

function Play_onPlayer() {
    Play_showBufferDialog();
    Play_videojs.src({
        type: "application/x-mpegURL",
        src: Play_playingUrl
    });

    Play_offsettime = Play_oldcurrentTime;
    Play_HideWarningDialog();
    Play_hidePanel();
    if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();

    if (!Play_Playing) {
        Play_videojs.ready(function() {
            this.isFullscreen(true);
            this.requestFullscreen();
            this.autoplay(true);

            this.on('ended', function() {
                Play_HideBufferDialog();
                Play_showWarningDialog(STR_IS_OFFLINE);
                window.setTimeout(Play_shutdownStream, 1500);
            });

            this.on('timeupdate', function() {
                Play_updateCurrentTime(this.currentTime());
            });

            this.on('error', function() {
                Play_HideBufferDialog();
                Play_showWarningDialog(STR_PLAYER_PROBLEM);
                window.setTimeout(Play_shutdownStream, 1500);
            });

            this.on('loadedmetadata', function() {
                // sync chat and stream
                document.getElementById('chat_frame').src = 'https://www.nightdev.com/hosted/obschat/?theme=bttv_blackchat&channel=' +
                    Play_selectedChannel + '&fade=false&bot_activity=true&prevent_clipping=false';
            });

        });
        Play_Playing = true;
    }
}

function Play_PlayerCheck() {
    if (!Play_videojs.paused() && Play_PlayerTime === Play_videojs.currentTime()) {
        Play_PlayerCheckCount++;
        Play_showBufferDialog();
        if (Play_PlayerCheckQualityChanged && !Play_RestoreFromResume) Play_PlayerCheckOffset = -10;
        if (Play_PlayerCheckCount > (30 + Play_PlayerCheckOffset)) { //staled for 15 sec drop one quality
            Play_PlayerCheckCount = 0;
            if (Play_qualityIndex < Play_getQualitiesCount() - 1) {
                if (Play_PlayerCheckQualityChanged) Play_qualityIndex++; //Don't change first time only reload
                Play_qualityDisplay();
                Play_qualityChanged();
                Play_PlayerCheckQualityChanged = true; // -5s on next check
            } else { //staled too long close the player
                Play_HideBufferDialog();
                Play_showWarningDialog(STR_PLAYER_PROBLEM);
                window.setTimeout(Play_shutdownStream, 1500);
            }
        }
    }
    if (!Play_videojs.paused()) Play_videojs.play();
    Play_PlayerTime = Play_videojs.currentTime();
}

function Play_offPlayer() {
    Play_videojs.off('ended', null);
    Play_videojs.off('timeupdate', null);
    Play_videojs.off('error', null);
    Play_videojs.off('loadedmetadata', null);
    Play_videojs.off('playing', null);
    Play_videojs.off('canplaythrough', null);
}

function Play_updateCurrentTime(currentTime) {
    if (Play_WarningDialogVisible() && !Play_IsWarning) Play_HideWarningDialog();
    if (Play_BufferDialogVisible()) Play_HideBufferDialog();
    if (Play_isShowPauseDialogOn() && !Play_videojs.paused()) Play_clearPause();
    Play_PlayerCheckCount = 0;
    Play_PlayerCheckOffset = 0;
    Play_RestoreFromResume = false;
    Play_PlayerCheckQualityChanged = false;

    Play_oldcurrentTime = currentTime + Play_offsettime - 14; // 14 buffer size from twitch
    if (Play_isPanelShown()) document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play_timeS(Play_oldcurrentTime);
}

function Play_clock(currentTime) {
    var date = new Date(),
        dayMonth;

    if (Main_IsDayFirst) dayMonth = date.getDate() + '/' + monthNames[date.getMonth()];
    else dayMonth = monthNames[date.getMonth()] + '/' + date.getDate();

    document.getElementById("stream_clock").innerHTML = dayMonth + ' ' + Play_lessthanten(date.getHours()) + ':' + Play_lessthanten(date.getMinutes());
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
    var minutes, hours;

    time = Math.floor(time / 1000 / 60);
    minutes = Play_lessthanten(time % 60);

    time = Math.floor(time / 60);
    hours = Play_lessthanten(time);

    //final time 00:00 or 00:00:00
    return hours + ":" + minutes;
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
    document.getElementById('scene1').classList.remove('hide');
    document.getElementById('scene2').classList.add('hide');
    Main_ReStartScreens();
}

function Play_ClearPlayer() {
    Play_videojs.pause();
    Play_offPlayer();
    Play_videojs.autoplay(false);
    Play_videojs.src({
        type: "video/mp4",
        src: TEMP_MP4
    });
    Play_clearPause();
    Play_HideWarningDialog();
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
    document.getElementById('scene2_game').classList.add('hide');
}

function Play_hideFallow() {
    document.getElementById("fallow_text").innerHTML = STR_SPACE + STR_NOKEY;
    AddCode_IsFallowing = false;
}

function Play_showFallow() {
    document.getElementById('scene2_heart').classList.remove('hide');
}

function Play_showBufferDialog() {
    document.getElementById('dialog_buffer_play').classList.remove('hide');
}

function Play_HideBufferDialog() {
    document.getElementById('dialog_buffer_play').classList.add('hide');
}

function Play_BufferDialogVisible() {
    return document.getElementById('dialog_buffer_play').className.indexOf('hide') === -1;
}

function Play_showWarningDialog(text) {
    document.getElementById("dialog_warning_play_text").innerHTML = text;
    document.getElementById('dialog_warning_play').classList.remove('hide');
}

function Play_HideWarningDialog() {
    document.getElementById("dialog_warning_play_text").innerHTML = '';
    document.getElementById('dialog_warning_play').classList.add('hide');
}

function Play_WarningDialogVisible() {
    return document.getElementById('dialog_warning_play').className.indexOf('hide') === -1;
}

function Play_showExitDialog() {
    if (!Play_ExitDialogVisible()) {
        document.getElementById('play_dialog_exit').classList.remove('hide');
        Play_exitID = window.setTimeout(Play_showExitDialog, 3000);
    } else {
        document.getElementById('play_dialog_exit').classList.add('hide');
    }
}

function Play_ExitDialogVisible() {
    return document.getElementById('play_dialog_exit').className.indexOf('hide') === -1;
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
    document.getElementById('play_dialog_simple_pause').classList.add('hide');
}

function Play_showPauseDialog() {
    if (!Play_videojs.paused()) Play_clearPause();
    else if (!Play_isShowPauseDialogOn()) {
        document.getElementById('play_dialog_simple_pause').classList.remove('hide');
        Play_pauseEndID = window.setTimeout(Play_showPauseDialog, 1500);
    } else {
        document.getElementById('play_dialog_simple_pause').classList.add('hide');
        Play_pauseStartID = window.setTimeout(Play_showPauseDialog, 8000); // time in ms
    }
}

function Play_isShowPauseDialogOn() {
    return document.getElementById('play_dialog_simple_pause').className.indexOf('hide') === -1;
}

function Play_isPanelShown() {
    return document.getElementById('scene_channel_panel').className.indexOf('hide') === -1;
}

function Play_hidePanel() {
    Play_clearHidePanel();
    document.getElementById('scene_channel_panel').classList.add('hide');
    Play_quality = Play_qualityPlaying;
    Play_sizePanelOffset = 0;
    if (Play_ChatPositions === 1) Play_ChatPosition();
}

function Play_showPanel() {
    Play_Panelcouner = 0;
    Play_IconsFocus();
    Play_qualityIndexReset();
    Play_qualityDisplay();
    document.getElementById("stream_live_time").innerHTML = STR_SINCE + Play_streamLiveAt(Play_created) + STR_AGO;
    document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play_timeS(Play_oldcurrentTime);
    Play_clock();
    document.getElementById('scene_channel_panel').classList.remove('hide');
    Play_setHidePanel();
    Play_sizePanelOffset = -4;
    if (Play_ChatPositions === 1) Play_ChatPosition();
}

function Play_clearHidePanel() {
    window.clearTimeout(Play_PanelHideID);
}

function Play_setHidePanel() {
    Play_PanelHideID = window.setTimeout(Play_hidePanel, 5000);
}

function Play_showChat() {
    Play_ChatPosition();
    document.getElementById('chat_container').classList.remove('hide');
}

function Play_hideChat() {
    document.getElementById('chat_container').classList.add('hide');
}

function Play_isChatShown() {
    return document.getElementById('chat_container').className.indexOf('hide') === -1;
}

function Play_showControlsDialog() {
    document.getElementById('play_dialog_exit').classList.add('hide');
    document.getElementById('dialog_controls_play').classList.remove('hide');
}

function Play_HideControlsDialog() {
    document.getElementById('dialog_controls_play').classList.add('hide');
}

function Play_isControlsDialogShown() {
    return document.getElementById('dialog_controls_play').className.indexOf('hide') === -1;
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

    if (Play_quality.indexOf('source') !== -1) document.getElementById("quality_name").innerHTML = Play_quality.replace("source", STR_SOURCE);
    else document.getElementById("quality_name").innerHTML = Play_quality;
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
        top = (51 + Play_sizeOffset + Play_sizePanelOffset) + '.5%';

    if (!Play_ChatPositions) Play_ChatPositions = 6;

    if (Play_ChatPositions < 7) {
        if (Play_ChatPositions > 1) top = "0.5%"; // top/lefth
        if (Play_ChatPositions > 2) left = "38.3%"; // top/midle
        if (Play_ChatPositions > 3) left = "0%"; // top/right

        if (Play_ChatPositions > 4) top = (51 + Play_sizeOffset) + '.5%'; // bottom/lefth
        if (Play_ChatPositions > 5) left = "38.3%"; // bottom/midle
    } else Play_ChatPositions = 1;

    document.getElementById("chat_container").style.top = top;
    document.getElementById("chat_container").style.left = left;
    localStorage.setItem('ChatPositionsValue', Play_ChatPositions);
}

function Play_showChatBackgroundDialog(DialogText) {
    window.clearTimeout(Play_ChatBackgroundID);
    document.getElementById("scene_channel_dialog_chat_text").innerHTML = DialogText;
    document.getElementById('scene_channel_dialog_chat').classList.remove('hide');
    Play_ChatBackgroundID = window.setTimeout(Play_hideChatBackgroundDialog, 1000);
}

function Play_hideChatBackgroundDialog() {
    document.getElementById('scene_channel_dialog_chat').classList.add('hide');
}

function Play_KeyPause() {
    if (!Play_videojs.paused()) {
        Play_videojs.pause();
        webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
        Play_showPauseDialog();
    } else {
        Play_clearPause();
        Play_videojs.play();
        webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
        if (Play_isPanelShown()) Play_hidePanel();
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

function Play_setFallow() {
    if (AddCode_IsFallowing) {
        document.getElementById("fallow_heart").innerHTML = '<i class="icon-heart" style="color: #00b300; font-size: 210%; text-shadow: #FFFFFF 0px 0px 3px, #FFFFFF 0px 0px 3px, #FFFFFF 0px 0px 2px;"></i>';
        document.getElementById("fallow_text").innerHTML = STR_SPACE + STR_FALLOWING;
    } else {
        document.getElementById("fallow_heart").innerHTML = '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 210%; text-shadow: #000000 0px 0px 3px, #000000 0px 0px 3px, #000000 0px 0px 2px;"></i>';
        document.getElementById("fallow_text").innerHTML = STR_SPACE + STR_FALLOW;
    }
}

function Play_KeyReturn(is_vod) {
    if (Play_isControlsDialogShown()) Play_HideControlsDialog();
    else if (Play_isPanelShown()) {
        Play_hidePanel();
    } else {
        if (Play_ExitDialogVisible()) {
            window.clearTimeout(Play_exitID);
            document.getElementById('play_dialog_exit').classList.add('hide');
            Play_hideChat();
            if (is_vod) window.setTimeout(PlayVod_shutdownStream, 10);
            else window.setTimeout(Play_shutdownStream, 10);
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
                    window.clearTimeout(Play_exitID);
                    document.getElementById('play_dialog_exit').classList.add('hide');
                    Play_hideChat();
                    window.setTimeout(Play_shutdownStream, 10);
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
                if (!Play_isChatShown()) {
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
                } else {
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
                } else {
                    Play_showPanel();
                }
                break;
            case KEY_ENTER:
                if (Play_isPanelShown()) {
                    if (!Play_Panelcouner) {
                        Play_qualityChanged();
                        Play_clearPause();
                    } else if (Play_Panelcouner === 1) {
                        Play_FallowUnfallow();
                        Play_clearHidePanel();
                        Play_setHidePanel();
                    } else if (Play_Panelcouner === 2) {
                        if (!Main_BeforeAgameisSet) {
                            Main_BeforeAgame = (Main_BeforeChannelisSet && Main_Go !== Main_SChannelContent && Main_Go !== Main_Svod && Main_Go !== Main_Sclip) ? Main_BeforeChannel : Main_Go;
                            Main_BeforeAgameisSet = true;
                        }

                        Main_ExitCurrent(Main_Go);
                        Main_Go = Main_aGame;
                        AGame_UserGames = false;
                        Main_gameSelected = Play_gameSelected;
                        window.clearTimeout(Play_exitID);
                        document.getElementById('play_dialog_exit').classList.add('hide');
                        Play_hideChat();
                        window.setTimeout(Play_shutdownStream, 10);
                    } else if (Play_Panelcouner === 3) {
                        if (!Main_BeforeChannelisSet && Main_Go !== Main_Svod && Main_Go !== Main_Sclip) {
                            Main_BeforeChannel = (Main_BeforeAgameisSet && Main_Go !== Main_aGame) ? Main_BeforeAgame : Main_Go;
                            Main_BeforeChannelisSet = true;
                        }

                        Main_selectedChannel = Play_selectedChannel;
                        Main_selectedChannel_id = AddCode_userChannel;
                        Main_selectedChannelDisplayname = Play_selectedChannelDisplayname;
                        Main_selectedChannelLogo = Play_selectedChannelLogo;
                        Main_selectedChannelViews = Play_selectedChannelViews;
                        Main_selectedChannelFallower = Play_selectedChannelFallower;

                        Main_ExitCurrent(Main_Go);
                        SChannelContent_UserChannels = AddCode_IsFallowing;
                        Main_Go = Main_SChannelContent;
                        window.clearTimeout(Play_exitID);
                        document.getElementById('play_dialog_exit').classList.add('hide');
                        Play_hideChat();
                        window.setTimeout(Play_shutdownStream, 10);
                    } else if (Play_Panelcouner === 4) {
                        if (!Search_isSearching) Main_BeforeSearch = Main_Go;
                        Main_ExitCurrent(Main_Go);
                        Main_Go = Main_Search;
                        window.clearTimeout(Play_exitID);
                        document.getElementById('play_dialog_exit').classList.add('hide');
                        Play_hideChat();
                        window.setTimeout(Play_shutdownStream, 10);
                    }
                } else {
                    Play_showPanel();
                }
                break;
            case KEY_RETURN:
                Play_KeyReturn(false);
                break;
            case KEY_PLAY:
            case KEY_PAUSE:
            case KEY_PLAYPAUSE:
                Play_KeyPause();
                break;
            case KEY_YELLOW:
                Play_showControlsDialog();
                break;
            case KEY_BLUE:
                break;
            default:
                break;
        }
    }
}