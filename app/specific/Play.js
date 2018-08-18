//Variable initialization
var Play_ChatPositions = 0;
var Play_ChatPositionConvertBefore = Play_ChatPositions;
var Play_ChatBackground = 0.55;
var Play_ChatSizeValue = 3;
var Play_PanelHideID = null;
var Play_quality = "source";
var Play_qualityPlaying = Play_quality;
var Play_sizePanelOffset = 0;

var Play_STATE_LOADING_TOKEN = 0;
var Play_STATE_LOADING_PLAYLIST = 1;
var Play_STATE_PLAYING = 2;
var Play_state = Play_STATE_LOADING_TOKEN;

var Play_streamInfoTimer = null;
var Play_tokenResponse = 0;
var Play_playlistResponse = 0;
var Play_playingTry = 0;

var Play_playingUrl = '';
var Play_qualities = [];
var Play_qualityIndex = 0;
var Play_ChatEnable = false;
var Play_exitID = null;

var Play_pauseEndID = null;
var Play_pauseStartID = null;

var Play_created = '';

var Play_loadingDataTry = 0;
var Play_loadingDataTryMax = 5;

var Play_loadingInfoDataTry = 0;
var Play_loadingInfoDataTryMax = 5;

var Play_isOn = false;
var Play_ChatBackgroundID = null;
var Play_oldcurrentTime = 0;
var Play_offsettime = 0;
var Play_qualitiesFound = false;
var Play_PlayerTime = 0;
var Play_streamCheck = null;
var Play_PlayerCheckCount = 0;
var Play_PlayerCheckQualityChanged = false;
var Play_Playing = false;
var Play_selectedChannel = '';
var Play_selectedChannelDisplayname = '';
var Play_Panelcouner = 1;
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
var Play_offsettimeMinus = 0;
var Play_BufferPercentage = 0;
var Play_4K_ModeEnable = false;
var Play_TargetHost = '';
var Play_DisplaynameHost = '';
var Play_isHost = false;
var Play_isLive = true;
var Play_RestoreFromResume = false;
var Play_Chatobj;
var Play_ChatLoadOK = false;
var Play_CheckChatCounter = 0;
var Play_CheckChatId;
var Play_ChatLoadStarted = false;
var Play_Buffer = 4;
var Play_PlayerCheckTimer = 4;
var Play_PlayerCheckInterval = 1000;
var Play_QualityChangedCounter = 0;
var Play_QualityChangedCounterMax = 4;
var Play_updateStreamInfoErrorTry = 0;
var Play_chat_container;
var Play_ChatFixPositionId;
var Play_selectedChannelLogo;
var Play_selectedChannel_id;
//counterclockwise movement, Vertical/horizontal Play_ChatPositions
//sizeOffset in relation to the size
var Play_ChatPositionVal = [{
    "top": 52, // Bottom/right 0
    "left": 75.3,
    "sizeOffset": [31, 16, 0, 0]
}, {
    "top": 33, // Middle/right 1
    "left": 75.3,
    "sizeOffset": [12.5, 0, -6.25, 0]
}, {
    "top": 0, // Top/right 2
    "left": 75.3,
    "sizeOffset": [0, 0, 0, 0]
}, {
    "top": 0, // Top/center 3
    "left": 38.3,
    "sizeOffset": [0, 0, 0, 0]
}, {
    "top": 0, // Top/left 4
    "left": 0,
    "sizeOffset": [0, 0, 0, 0]
}, {
    "top": 33, // Middle/left 5
    "left": 0,
    "sizeOffset": [12.5, 0, -6.25, 0]
}, {
    "top": 52, // Bottom/left 6
    "left": 0,
    "sizeOffset": [31, 16, 0, 0]
}, {
    "top": 52, // Bottom/center 7
    "left": 38.3,
    "sizeOffset": [31, 16, 0, 0]
}];

//Conversion between chat at 100% and bellow 50%
var Play_ChatPositionsBefore = [0, 0, 0, 1, 2, 2, 2, 1]; //Chat positions size 50 to 100%
var Play_ChatPositionsAfter = [ //Chat positions size 100 to 50%
    [0, 1, 2, 2, 2, 1, 0, 0],
    [7, 3, 3, 3, 3, 3, 7, 7],
    [6, 5, 4, 4, 4, 5, 6, 6]
];

var Play_ChatSizeVal = [{
    "containerHeight": 17, // 12.5%
    "percentage": 12.5,
    "dialogTop": 15
}, {
    "containerHeight": 32, // 25%
    "percentage": 25,
    "dialogTop": 30
}, {
    "containerHeight": 48, // 50%
    "percentage": 50,
    "dialogTop": 50
}, {
    "containerHeight": 100, // 100%
    "percentage": 100,
    "dialogTop": 115
}];
//Variable initialization end

function Play_PreStart() {
    Play_avplay = (window.tizen && window.webapis.avplay) || {};
    Play_SetAvPlayGlobal();
    Play_Chatobj = document.getElementById('chat_frame');
    Play_chat_container = document.getElementById("chat_container");
    Play_ClearPlayer();

    Play_ChatPositions = (parseInt(localStorage.getItem('ChatPositionsValue')) - 1) || 0;
    Play_ChatBackground = parseFloat(localStorage.getItem('ChatBackgroundValue')) || 0.55;
    Play_ChatSizeValue = parseInt(localStorage.getItem('ChatSizeValue')) || 3;
    Play_ChatEnable = localStorage.getItem('ChatEnable') === 'true' ? true : false;
    Play_ChatSize(false);
    Play_ChatBackgroundChange(false);
}

//this are the global set option that need to be set only once
//and they need to be set like this to work, faking a video playback
function Play_SetAvPlayGlobal() {
    try {
        Play_avplay.stop();
        Play_avplay.open(GIT_IO + "temp.mp4");
        Play_avplay.setDisplayRect(0, 0, screen.width, screen.height);
        Play_avplay.setListener(PlayStart_listener);
    } catch (e) {
        console.log(e + " Play_SetAvPlayGlobal()");
    }
    Play_avplay.prepare();
}

var PlayStart_listener = {
    onstreamcompleted: function() {
        Play_avplay.stop();
    }
};

function Play_SetBuffers() {
    Play_Buffer = Settings_Obj_values(1);
    PlayVod_Buffer = Settings_Obj_values(2);
    PlayClip_Buffer = Settings_Obj_values(3);
}

function Play_Start() {
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    Play_showBufferDialog();
    Main_innerHTML("stream_live_icon", '<div style="vertical-align: middle; display: inline-block"><i class="icon-circle" style="color: red; font-size: 105%; "></i></div><div style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_LIVE.toUpperCase() + '</div>');
    Main_empty('stream_info_title');
    Play_LoadLogoSucess = false;
    //reset channel logo to prevent another channel logo
    document.getElementById('stream_info_icon').setAttribute('data-src', IMG_404_LOGO);
    Main_textContent("stream_info_name", (Play_isHost ? Play_DisplaynameHost : Play_selectedChannelDisplayname));
    Play_isHost = false;
    Play_DisplaynameHost = '';
    Main_empty('dialog_buffer_play_percentage');
    Play_RestoreFromResume = false;

    Play_QualityChangedCounter = 0;
    Play_offsettimeMinus = 0;
    Main_textContent("stream_watching_time", STR_WATCHING + Play_timeMs(0));
    Main_textContent("stream_live_time", STR_SINCE + Play_timeMs(0) + STR_AGO);
    Main_ShowElement('chat_frame');
    Main_HideElement('chat_box');
    Play_updateStreamInfoErrorTry = 0;
    Play_ChatLoadOK = false;
    Play_currentTime = 0;
    Play_loadingInfoDataTry = 0;
    Play_loadingInfoDataTimeout = 3000;
    Play_isLive = true;
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
    document.body.removeEventListener("keyup", Main_handleKeyUp);
}

function Play_Resume() {
    if (document.hidden) {
        Play_ClearPlayer();
        Play_Playing = false;
        Play_Chatobj.src = 'about:blank';
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
                    Play_loadingInfoDataTry = 0;
                    Play_loadingInfoDataTimeout = 3000;
                    Play_RestoreFromResume = true;
                    if (!Play_LoadLogoSucess) Play_updateStreamInfoStart();
                    else Play_updateStreamInfo();
                    Play_onPlayer();
                    Play_streamInfoTimer = window.setInterval(Play_updateStreamInfo, 60000);
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
                    if (response.stream !== null) {
                        Play_selectedChannel_id = response.stream.channel._id;
                        Main_textContent("stream_info_title", response.stream.channel.status);
                        Play_gameSelected = response.stream.game;
                        Play_Lang = ', [' + (response.stream.channel.language).toUpperCase() + ']';
                        Main_textContent("stream_info_game", STR_PLAYING + Play_gameSelected + STR_FOR +
                            Main_addCommas(response.stream.viewers) + ' ' + STR_VIEWER + Play_Lang);
                        Play_selectedChannelLogo = response.stream.channel.logo;
                        Play_LoadLogoSucess = true;
                        Play_LoadLogo(document.getElementById('stream_info_icon'), Play_selectedChannelLogo);
                        Play_created = response.stream.created_at;
                        if (Main_UserName !== '') {
                            AddCode_PlayRequest = true;
                            AddCode_CheckFallow();
                        } else Play_hideFallow();
                    } else if (Play_isOn) {
                        Play_isLive = false;
                        Play_offPlayer();
                        Play_CheckHostStart();
                    }
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
    try {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Play_updateStreamInfoErrorTry = 0;
                    var response = JSON.parse(xmlHttp.responseText);
                    if (response.stream !== null) {
                        Main_textContent("stream_info_title", response.stream.channel.status);
                        Main_textContent("stream_info_game", STR_PLAYING + response.stream.game + STR_FOR +
                            Main_addCommas(response.stream.viewers) + ' ' + STR_VIEWER + Play_Lang);
                        if (!Play_LoadLogoSucess) Play_LoadLogo(document.getElementById('stream_info_icon'), response.stream.channel.logo);
                    } else if (Play_RestoreFromResume) {
                        Play_isLive = false;
                        Play_offPlayer();
                        Play_CheckHostStart();
                    }
                } else Play_updateStreamInfoError();
            }
        };
        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + Play_selectedChannel + '?' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = 3000;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.send(null);
    } catch (err) {
        Play_updateStreamInfoError();
    }
}

function Play_updateStreamInfoError() {
    if (Play_updateStreamInfoErrorTry < Play_loadingInfoDataTryMax) {
        window.setTimeout(function() {
            if (Play_isOn) Play_updateStreamInfo();
            //give a second for it retry as the TV may be on coming from resume
        }, 1000);
        Play_updateStreamInfoErrorTry++;
    } else Play_updateStreamInfoErrorTry = 0;
}

function Play_LoadLogo(ImgObjet, link) {
    ImgObjet.onerror = function() {
        this.src = IMG_404_LOGO; //img fail to load a predefined logo
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
                '.m3u8?player=twitchweb&type=any&sig=' + Play_tokenResponse.sig + '&token=' +
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
                } else Play_loadDataError();
            }
        };

        xmlHttp.send(null);
    } catch (error) {
        Play_loadDataError();
    }
}

function Play_loadDataError() {
    if (Play_isOn && Play_isLive) {
        Play_loadingDataTry++;
        if (Play_loadingDataTry < Play_loadingDataTryMax) {
            Play_loadingDataTimeout += 500;
            Play_loadDataRequest();
        } else Play_CheckHostStart();
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
                'id': TempId,
                'band': Band,
                'url': streams[i].split("\n")[2]
            });
        } else if (result[i - tempCount].id !== TempId && result[i - tempCount].id !== TempId + ' (source)') {
            result.push({
                'id': TempId,
                'band': Band,
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

    Play_BufferPercentage = 0;
    Play_qualityPlaying = Play_quality;
    if (Play_isOn) Play_onPlayer();
}

var Play_listener = {
    onbufferingstart: function() {
        Play_showBufferDialog();
        Play_bufferingcomplete = false;
        Play_RestoreFromResume = false;
        Play_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = Play_Buffer;
        Play_PlayerCheckQualityChanged = true;
        Play_QualityChangedCounter = 0;
        // sync chat and stream
        if (!Play_ChatLoadStarted) Play_loadChat();
    },
    onbufferingcomplete: function() {
        Play_HideBufferDialog();
        Play_bufferingcomplete = true;
        Play_RestoreFromResume = false;
        Main_empty('dialog_buffer_play_percentage');
        Play_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = Play_Buffer;
        Play_PlayerCheckQualityChanged = true;
        Play_QualityChangedCounter = 0;
        if (!Play_ChatLoadStarted) Play_loadChat();
    },
    onbufferingprogress: function(percent) {
        if (percent < 5) Play_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = Play_Buffer;
        Play_PlayerCheckQualityChanged = true;
        Play_QualityChangedCounter = 0;
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
        }
        if (!Play_ChatLoadStarted) Play_loadChat();
        Play_RestoreFromResume = false;
    },
    oncurrentplaytime: function(currentTime) {
        if (Play_currentTime !== currentTime) Play_updateCurrentTime(currentTime);
    },
    onstreamcompleted: function() {
        Play_CheckHostStart();
    },
    onerror: function(eventType) {
        if (eventType === "PLAYER_ERROR_CONNECTION_FAILED" || eventType === "PLAYER_ERROR_INVALID_URI")
            Play_CheckHostStart();
    }
};

function Play_onPlayer() {
    Play_showBufferDialog();
    if (!Main_isReleased) console.log('Play_onPlayer:', '\n' + '\n' + Play_playingUrl + '\n');
    try {
        Play_avplay.stop();
        Play_avplay.open(Play_playingUrl);
        Play_avplay.setBufferingParam("PLAYER_BUFFER_FOR_PLAY", "PLAYER_BUFFER_SIZE_IN_SECOND", Play_Buffer);
        Play_avplay.setBufferingParam("PLAYER_BUFFER_FOR_RESUME", "PLAYER_BUFFER_SIZE_IN_SECOND", Play_Buffer);

        Play_avplay.setListener(Play_listener);
        if (Main_Is4k && !Play_4K_ModeEnable) {
            Play_avplay.setStreamingProperty("SET_MODE_4K", "TRUE");
            Play_4K_ModeEnable = true;
        }

        Play_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = 3;
        Play_PlayerCheckQualityChanged = false;
        window.clearTimeout(Play_CheckChatId);
        Play_ChatLoadStarted = false;
    } catch (e) {
        console.log(e);
    }

    Play_JustStartPlaying = true;
    //Use prepareAsync as prepare() only can freeze up the app
    Play_avplay.prepareAsync(function() {
        Play_avplay.play();
        Play_Playing = true;
    });

    Main_ready(function() {
        Play_offsettime = Play_oldcurrentTime;
        Play_HideWarningDialog();
        Play_hidePanel();
        if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
        window.clearInterval(Play_streamCheck);
        Play_PlayerCheckCount = 0;
        Play_streamCheck = window.setInterval(Play_PlayerCheck, Play_PlayerCheckInterval);
    });
}

function Play_loadChat() {
    Play_ChatLoadStarted = true;
    window.clearInterval(Play_ChatFixPositionId);

    //Clear the iframe doc to prevent false true from Play_CheckChat "indexOf('Connected') !== -1"
    var doc = Play_Chatobj.contentDocument;
    if (doc !== undefined && doc.body !== null) {
        doc.open();
        doc.write("");
        doc.close();
    }

    window.clearTimeout(Play_CheckChatId);
    Play_CheckChatCounter = 0;
    Play_ChatLoadOK = false;
    Play_Chatobj.src = 'https://www.nightdev.com/hosted/obschat/?theme=bttv_blackchat&channel=' + Play_selectedChannel + '&fade=false&bot_activity=true&prevent_clipping=false';
    Play_CheckChatId = window.setTimeout(Play_CheckChat, 3500);
}

function Play_CheckChat() {
    var doc = Play_Chatobj.contentDocument;
    if (doc !== undefined && doc.body !== null)
        Play_ChatLoadOK = doc.body.innerHTML.indexOf('Connected') !== -1; //when connected OK a "Connected" is see in the chat

    if (!Play_ChatLoadOK) {
        if (Play_ChatLoadStarted && Play_CheckChatCounter < 7) {
            Play_CheckChatCounter++;
            Play_CheckChatId = window.setTimeout(Play_CheckChat, 1000);
        } else Play_loadChat();
    } else Play_ChatFixPositionId = window.setInterval(Play_ChatFixPosition, 500);
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
        if (Play_PlayerCheckCount > (Play_PlayerCheckTimer + (Play_BufferPercentage > 90 ? 1 : 0))) {
            if ((Play_qualityIndex < Play_getQualitiesCount() - 1) && (Play_QualityChangedCounter < Play_QualityChangedCounterMax)) {
                if (Play_PlayerCheckQualityChanged) Play_qualityIndex++; //Don't change the first time only retry
                Play_qualityDisplay();
                Play_qualityChanged();
                Play_QualityChangedCounter++;
            } else {
                Play_avplay.stop();
                Play_CheckHostStart(); //staled for too long close the player
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

    if (!Play_IsWarning && Play_WarningDialogVisible()) Play_HideWarningDialog();
    if (Play_bufferingcomplete && Play_BufferDialogVisible()) Play_HideBufferDialog();

    Play_oldcurrentTime = currentTime + Play_offsettime - 14000; // 14s buffer size from twitch
    if (Play_isPanelShown()) {
        Main_textContent("stream_watching_time", STR_WATCHING + Play_timeMs(Play_oldcurrentTime));
        Main_textContent("stream_live_time", STR_SINCE + Play_streamLiveAt(Play_created) + STR_AGO);
    }
}

function Play_clock() {
    var clock = Main_getclock();
    Main_textContent("stream_clock", clock);
    Main_textContent('label_clock', clock);
}

function Play_lessthanten(time) {
    return (time < 10) ? "0" + time : time;
}

function Play_timeS(time) {
    var seconds, minutes, hours;
    time += Play_offsettimeMinus / 1000;

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

    if (time < 0 && !Play_offsettimeMinus) Play_offsettimeMinus = time * -1;
    time += Play_offsettimeMinus;

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
    window.clearInterval(Play_ChatFixPositionId);
    Play_isOn = false;
    Play_selectedChannel_id = '';
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
    Play_Chatobj.src = 'about:blank';
    window.clearInterval(Play_streamInfoTimer);
    window.clearInterval(Play_streamCheck);
    Play_IsWarning = false;
}

function Play_hideFallow() {
    Main_innerHTML("fallow_text", STR_SPACE + STR_NOKEY);
    AddCode_IsFallowing = false;
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
    if (!Play_ChatPositions || Play_ChatPositions > 5) Play_ChatPosition();
}

function Play_showPanel() {
    Play_IconsResetFocus();
    Play_qualityIndexReset();
    Play_qualityDisplay();
    Main_textContent("stream_live_time", STR_SINCE + Play_streamLiveAt(Play_created) + STR_AGO);
    Main_textContent("stream_watching_time", STR_WATCHING + Play_timeMs(Play_oldcurrentTime));
    Play_clock();
    Play_CleanHideExit();
    document.getElementById("scene_channel_panel").style.opacity = "1";
    Play_setHidePanel();
    Play_sizePanelOffset = -5;
    if (!Play_ChatPositions || Play_ChatPositions > 5) Play_ChatPosition();
}

function Play_clearHidePanel() {
    window.clearTimeout(Play_PanelHideID);
}

function Play_setHidePanel() {
    Play_PanelHideID = window.setTimeout(Play_hidePanel, 5000);
}

// chat_box is a inner element from the chat_frame iframe, when changing it size it's content may be off screen
// This also help with a bug when the emote is slow to load and loads after the scrollTop function from the iframe
// with causes the line to be half off screen, in that case the interval will fix it
function Play_ChatFixPosition() {
    var doc = Play_Chatobj.contentDocument;
    if (doc !== undefined && doc.body !== null) {
        doc = doc.getElementById('chat_box');
        if (doc) doc.scrollTop = doc.scrollHeight;
    }
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

    if (Play_quality.indexOf('source') !== -1) Main_textContent("quality_name", Play_quality.replace("source", STR_SOURCE) + Play_qualities[Play_qualityIndex].band);
    else Main_textContent("quality_name", Play_quality + Play_qualities[Play_qualityIndex].band);
}

function Play_getQualitiesCount() {
    return Play_qualities.length;
}

function Play_ChatSize(showDialog) {
    Play_chat_container.style.height = Play_ChatSizeVal[Play_ChatSizeValue - 1].containerHeight + '%';
    document.getElementById("play_chat_dialog").style.marginTop = Play_ChatSizeVal[Play_ChatSizeValue - 1].dialogTop + '%';
    Play_ChatPosition();
    Play_ChatFixPosition();

    if (showDialog) Play_showChatBackgroundDialog('Size ' + Play_ChatSizeVal[Play_ChatSizeValue - 1].percentage + '%');

    localStorage.setItem('ChatSizeValue', (Play_ChatSizeValue));
}

function Play_ChatBackgroundChange(showDialog) {
    var chat_value = Play_ChatBackground - 0.05; //Do not save a 0 value for ChatBackgroundValue

    if (chat_value < 0.05) chat_value = 0;
    else chat_value = chat_value.toFixed(2);

    Play_chat_container.style.backgroundColor = "rgba(0, 0, 0, " + chat_value + ")";
    if (showDialog) Play_showChatBackgroundDialog('Brightness ' + (chat_value * 100).toFixed(0) + '%');

    localStorage.setItem('ChatBackgroundValue', Play_ChatBackground);
}

function Play_ChatPositionConvert(up) {
    if (up) {
        Play_ChatPositionConvertBefore = Play_ChatPositions;
        Play_ChatPositions = Play_ChatPositionsBefore[Play_ChatPositions];
    } else Play_ChatPositions = Play_ChatPositionsAfter[Play_ChatPositions][Play_ChatPositionConvertBefore];
}

function Play_ChatPosition() {
    var bool = (Play_ChatSizeValue === 4);

    if (Play_ChatPositions < 0) Play_ChatPositions = (bool ? 2 : 7);
    else if (Play_ChatPositions > (bool ? 2 : 7)) Play_ChatPositions = 0;

    Play_chat_container.style.top = ((bool ? 0 : (Play_ChatPositionVal[Play_ChatPositions].top + Play_ChatPositionVal[Play_ChatPositions].sizeOffset[Play_ChatSizeValue - 1])) + Play_sizePanelOffset) + '%';

    Play_chat_container.style.left =
        Play_ChatPositionVal[Play_ChatPositions + (bool ? 2 : 0)].left + '%';

    localStorage.setItem('ChatPositionsValue', (Play_ChatPositions + 1));
}

function Play_showChatBackgroundDialog(DialogText) {
    window.clearTimeout(Play_ChatBackgroundID);
    Main_textContent("play_chat_dialog_text", DialogText);
    Main_ShowElement('play_chat_dialog');
    Play_ChatBackgroundID = window.setTimeout(Play_hideChatBackgroundDialog, 1000);
}

function Play_hideChatBackgroundDialog() {
    Main_HideElement('play_chat_dialog');
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

        if (PlayVodClip === 1) Play_streamCheck = window.setInterval(Play_PlayerCheck, Play_PlayerCheckInterval);
        else if (PlayVodClip === 2) PlayVod_streamCheck = window.setInterval(PlayVod_PlayerCheck, Play_PlayerCheckInterval);
        else if (PlayVodClip === 3) PlayClip_streamCheck = window.setInterval(PlayClip_PlayerCheck, Play_PlayerCheckInterval);
    }
}

function Play_IconsResetFocus() {
    Play_IconsRemoveFocus();
    Play_Panelcouner = 1;
    Play_IconsAddFocus();
}

function Play_IconsAddFocus() {
    Main_AddClass('scene2_pannel_' + Play_Panelcouner, 'playbotton_focus');
}

function Play_IconsRemoveFocus() {
    Main_RemoveClass('scene2_pannel_' + Play_Panelcouner, 'playbotton_focus');
}

function Play_PrepareshowEndDialog() {
    Play_state = Play_STATE_PLAYING;
    PlayVod_state = Play_STATE_PLAYING;
    PlayClip_state = PlayClip_STATE_PLAYING;
    Play_hideChat();
    Play_hidePanel();
    PlayClip_hidePanel();
    PlayVod_hidePanel();
    if (!Play_IsWarning) Play_HideWarningDialog();
    Play_HideBufferDialog();
    Play_CleanHideExit();
    Play_HideControlsDialog();
    Play_EndIconsAddFocus();
}

function Play_showEndDialog() {
    Main_ShowElement('dialog_end_stream');
}

function Play_HideEndDialog() {
    Main_HideElement('dialog_end_stream');
    Play_EndTextClear();
    Play_EndIconsResetFocus();
}

function Play_isEndDialogShown() {
    return Main_isElementShowing('dialog_end_stream');
}

function Play_EndIconsResetFocus() {
    Play_EndIconsRemoveFocus();
    Play_Endcounter = 0;
    Play_EndIconsAddFocus();
}

function Play_EndIconsAddFocus() {
    Main_AddClass('dialog_end_' + Play_Endcounter, 'dialog_end_icons_focus');
}

function Play_EndIconsRemoveFocus() {
    Main_RemoveClass('dialog_end_' + Play_Endcounter, 'dialog_end_icons_focus');
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

function Play_EndDialogPressed(PlayVodClip) {
    if (!Play_Endcounter) {
        if (PlayVodClip === 2) {
            PlayVod_offsettime = 0;
            PlayVod_PlayerCheckQualityChanged = false;
            PlayVod_qualityChanged();
            Play_clearPause();
            Chat_offset = 0;
            Chat_Init();
        } else if (PlayVodClip === 3) {
            PlayClip_offsettime = 0;
            PlayClip_PlayerCheckQualityChanged = false;
            PlayClip_qualityChanged();
            Play_clearPause();
            Chat_offset = ChannelVod_vodOffset;
            Chat_Init();
        }
    } else if (Play_Endcounter === 1) {
        if (Play_isHost) {
            Play_DisplaynameHost = Play_selectedChannelDisplayname + STR_USER_HOSTING;
            Play_selectedChannel = Play_TargetHost.target_login;
            Play_selectedChannelDisplayname = Play_TargetHost.target_display_name;
            Play_DisplaynameHost = Play_DisplaynameHost + Play_selectedChannelDisplayname;
            Play_PreshutdownStream();
            document.body.addEventListener("keydown", Play_handleKeyDown, false);
            Play_Start();
        } else PlayClip_OpenVod();
    } else if (Play_Endcounter === 2) Play_OpenChannel(PlayVodClip);
    else if (Play_Endcounter === 3) Play_OpenGame(PlayVodClip);
    if (Play_Endcounter !== 1) Play_HideEndDialog();
}

function Play_EndSet(PlayVodClip) {
    if (!PlayVodClip) {
        Play_EndIconsRemoveFocus();
        Play_Endcounter = 1;
        Play_EndIconsAddFocus();
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'inline-block';
        Main_textContent("dialog_end_vod_text", STR_OPEN_HOST);
    } else if (PlayVodClip === 1) {
        Play_EndIconsRemoveFocus();
        Play_Endcounter = 2;
        Play_EndIconsAddFocus();
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'none';
    } else if (PlayVodClip === 2) {
        Play_EndIconsResetFocus();
        document.getElementById('dialog_end_0').style.display = 'inline-block';
        document.getElementById('dialog_end_1').style.display = 'none';
    } else if (PlayVodClip === 3) {
        Play_EndIconsResetFocus();
        document.getElementById('dialog_end_0').style.display = 'inline-block';
        document.getElementById('dialog_end_1').style.display = 'inline-block';
        Main_textContent("dialog_end_vod_text", PlayClip_HasVOD ? STR_OPEN_BROADCAST : STR_NO_BROADCAST);
    }
}

function Play_OpenChannel(PlayVodClip) {
    if (!Main_BeforeChannelisSet && Main_Go !== Main_ChannelVod && Main_Go !== Main_ChannelClip) {
        Main_BeforeChannel = (Main_BeforeAgameisSet && Main_Go !== Main_aGame) ? Main_BeforeAgame : Main_Go;
        Main_BeforeChannelisSet = true;
    }

    Main_ExitCurrent(Main_Go);
    Main_Go = Main_ChannelContent;

    if (PlayVodClip === 1) {
        Main_selectedChannel_id = Play_selectedChannel_id;
        Main_selectedChannelLogo = Play_selectedChannelLogo;
        Main_selectedChannel = Play_selectedChannel;
        Main_selectedChannelDisplayname = Play_selectedChannelDisplayname;
        ChannelContent_UserChannels = AddCode_IsFallowing;
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
    if (!Main_BeforeAgameisSet && Main_Go !== Main_AGameVod && Main_Go !== Main_AGameClip) {
        Main_BeforeAgame = (Main_BeforeChannelisSet && Main_Go !== Main_ChannelContent && Main_Go !== Main_ChannelVod && Main_Go !== Main_ChannelClip) ? Main_BeforeChannel : Main_Go;
        Main_BeforeAgameisSet = true;
    }

    Main_ExitCurrent(Main_Go);
    Main_Go = Main_aGame;
    AGame_UserGames = false;

    Main_gameSelected = Play_gameSelected;
    Play_hideChat();
    if (PlayVodClip === 1) Main_ready(Play_shutdownStream);
    else if (PlayVodClip === 2) Main_ready(PlayVod_shutdownStream);
    else if (PlayVodClip === 3) Main_ready(PlayClip_shutdownStream);
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

function Play_BottomOptionsPressed(PlayVodClip) {
    if (!Play_Panelcouner) PlayClip_OpenVod();
    else if (Play_Panelcouner === 1) {
        if (PlayVodClip === 1) {
            Play_qualityChanged();
        } else if (PlayVodClip === 2) {
            if (!PlayVod_offsettime) PlayVod_offsettime = Play_avplay.getCurrentTime();
            PlayVod_PlayerCheckQualityChanged = false;
            PlayVod_qualityChanged();
        } else if (PlayVodClip === 3) {
            if (!PlayClip_offsettime) PlayClip_offsettime = Play_avplay.getCurrentTime();
            PlayClip_PlayerCheckQualityChanged = false;
            PlayClip_qualityChanged();
        }
        Play_clearPause();
    } else if (Play_Panelcouner === 2) {
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
    } else if (Play_Panelcouner === 3) Play_OpenGame(PlayVodClip);
    else if (Play_Panelcouner === 4) Play_OpenChannel(PlayVodClip);
    else if (Play_Panelcouner === 5) Play_OpenSearch(PlayVodClip);
}

function Play_PannelEndStart(PlayVodClip) {
    Play_PrepareshowEndDialog();
    Play_EndTextCounter = 3;
    Main_ready(function() {
        Play_EndText(PlayVodClip);
        Play_showEndDialog(PlayVodClip);
    });
}

function Play_CheckHostStart() {
    Play_state = -1;
    Play_loadingDataTry = 0;
    Play_loadingDataTimeout = 3500;
    if (Play_selectedChannel_id !== '') Play_loadDataCheckHost();
    else Play_CheckId();
}

function Play_CheckId() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users?login=' + Play_selectedChannel, true);
        xmlHttp.timeout = Play_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    var users = JSON.parse(xmlHttp.responseText).users[0];
                    if (users !== undefined) {
                        Play_selectedChannel_id = users._id;
                        Play_loadingDataTry = 0;
                        Play_loadingDataTimeout = 3500;
                        Play_loadDataCheckHost();
                    } else Play_PannelEndStart(1);
                    return;
                } else {
                    Play_CheckIdError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Play_CheckIdError();
    }
}

function Play_CheckIdError() {
    Play_loadingDataTry++;
    if (Play_loadingDataTry < Play_loadingDataTryMax) {
        Play_loadingDataTimeout += 500;
        Play_CheckId();
    } else Play_PannelEndStart(1);
}

function Play_loadDataCheckHost() {
    try {

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'http://tmi.twitch.tv/hosts?include_logins=1&host=' + encodeURIComponent(Play_selectedChannel_id) + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = Play_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Play_CheckHost(xmlHttp.responseText);
                    return;
                } else Play_loadDataCheckHostError();
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Play_loadDataCheckHostError();
    }
}

function Play_loadDataCheckHostError() {
    Play_loadingDataTry++;
    if (Play_loadingDataTry < Play_loadingDataTryMax) {
        Play_loadingDataTimeout += 500;
        Play_loadDataCheckHost();
    } else Play_PannelEndStart(1);
}

function Play_CheckHost(responseText) {
    Play_TargetHost = JSON.parse(responseText).hosts[0];

    if (Play_TargetHost.target_login !== undefined) {
        Play_IsWarning = true;
        Play_showWarningDialog(Play_selectedChannelDisplayname + STR_IS_NOW + STR_USER_HOSTING + Play_TargetHost.target_display_name);
        window.setTimeout(function() {
            Play_IsWarning = false;
        }, 4000);

        Play_EndSet(0);
        Play_isHost = true;
    } else {
        Play_EndSet(1);
        Play_isHost = false;
    }

    Play_PannelEndStart(1);
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
    } else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
        Play_hidePanel();
    } else {
        if (is_vod && Play_WarningDialogVisible() && PlayVod_IsJumping) {
            window.clearTimeout(PlayVod_JumpID);
            PlayVod_jumpCount = 0;
            PlayVod_jumpCancel();
        } else if (Play_isVodDialogShown() && Play_ExitDialogVisible()) {
            Main_ShowElement('scene_channel_panel_bottom');
            Play_HideVodDialog();
            PlayVod_PreshutdownStream();
            Play_exitMain();
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
                    Play_IconsRemoveFocus();
                    Play_Panelcouner++;
                    if (Play_Panelcouner > 5) Play_Panelcouner = 1;
                    Play_IconsAddFocus();
                    Play_clearHidePanel();
                    Play_setHidePanel();
                } else if (Play_isEndDialogShown()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter--;
                    if (Play_Endcounter < (Play_isHost ? 1 : 2)) Play_Endcounter = 3;
                    Play_EndIconsAddFocus();
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
                    Play_IconsRemoveFocus();
                    Play_Panelcouner--;
                    if (Play_Panelcouner < 1) Play_Panelcouner = 5;
                    Play_IconsAddFocus();
                    Play_clearHidePanel();
                    Play_setHidePanel();
                } else if (Play_isEndDialogShown()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = (Play_isHost ? 1 : 2);
                    Play_EndIconsAddFocus();
                } else {
                    Play_showPanel();
                }
                break;
            case KEY_UP:
                if (Play_isPanelShown()) {
                    if (Play_qualityIndex > 0 && Play_Panelcouner === 1) {
                        Play_qualityIndex--;
                        Play_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    Play_setHidePanel();
                } else if (Play_isChatShown()) {
                    if (Play_ChatSizeValue < 4) {
                        Play_ChatSizeValue++;
                        if (Play_ChatSizeValue === 4) Play_ChatPositionConvert(true);
                        Play_ChatSize(true);
                    } else Play_showChatBackgroundDialog('Size 100%');
                } else if (Play_isEndDialogShown()) Play_EndTextClear();
                else {
                    Play_showPanel();
                }
                break;
            case KEY_DOWN:
                if (Play_isPanelShown()) {
                    if (Play_qualityIndex < Play_getQualitiesCount() - 1 && Play_Panelcouner === 1) {
                        Play_qualityIndex++;
                        Play_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    Play_setHidePanel();
                } else if (Play_isChatShown()) {
                    if (Play_ChatSizeValue > 1) {
                        Play_ChatSizeValue--;
                        if (Play_ChatSizeValue === 3) Play_ChatPositionConvert(false);
                        Play_ChatSize(true);
                    } else Play_showChatBackgroundDialog('Size 33%');
                } else if (Play_isEndDialogShown()) Play_EndTextClear();
                else {
                    Play_showPanel();
                }
                break;
            case KEY_ENTER:
                if (Play_isEndDialogShown()) Play_EndDialogPressed(1);
                else if (Play_isPanelShown()) Play_BottomOptionsPressed(1);
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