//Variable initialization
var Play_ChatPositions = 0;
var Play_ChatPositionConvertBefore = Play_ChatPositions;
var Play_PlayerPanelOffset = -5;
var Play_ChatBackground = 0.55;
var Play_ChatSizeValue = 2;
var Play_PanelHideID = null;
var Play_quality = "Auto";
var Play_qualityPlaying = Play_quality;
var Play_isFullScreen = true;
var Play_ChatPositionsBF;
var Play_ChatEnableBF;
var Play_ChatSizeValueBF;
var Play_isHost = false;
var Play_FeedOldUserName = '';
var Play_FeedPos = 0;
var Play_Buffer = 2000;
var Play_CurrentSpeed = 3;

var Play_STATE_LOADING_TOKEN = 0;
var Play_STATE_LOADING_PLAYLIST = 1;
var Play_STATE_PLAYING = 2;
var Play_state = 0;

var Play_streamInfoTimerId = null;
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

var Play_ResumeAfterOnlineCounter = 0;
var Play_ResumeAfterOnlineId;
var Play_isOn = false;
var Play_ChatBackgroundID = null;
var Play_qualitiesFound = false;
var Play_PlayerTime = 0;
var Play_streamCheckId = null;
var Play_PlayerCheckCount = 0;
var Play_PlayerCheckCounter = 0;
var Play_PlayerCheckQualityChanged = false;
var Play_PlayerCheckRun = false;
var Play_Playing = false;
var Play_Panelcounter = 7;
var Play_IsWarning = false;
var Play_LoadLogoSucess = false;
var Play_loadingInfoDataTimeout = 10000;
var Play_loadingDataTimeout = 2000;
var Play_Lang = '';
var Play_Endcounter = 0;
var Play_EndTextCounter = 3;
var Play_EndSettingsCounter = 3;
var Play_EndTextID = null;
var Play_DialogEndText = '';
var Play_currentTime = 0;
var Play_watching_time = 0;
//var Play_4K_ModeEnable = false;
var Play_TargetHost = '';
var Play_isLive = true;
var Play_RestoreFromResume = false;
var Play_ChatLoadStarted = false;
var Play_PlayerCheckTimer = 7;
var Play_PlayerCheckInterval = 1000;
var Play_updateStreamInfoErrorTry = 0;
var Play_chat_container;
var Play_IncrementView = '';
var Play_ProgresBarrElm;
var Play_DefaultjumpTimers = [];
var Play_UserLiveFeedPressed = false;
//counterclockwise movement, Vertical/horizontal Play_ChatPositions
//sizeOffset in relation to the size
var Play_ChatPositionVal = [{
    "top": 51.8, // Bottom/right 0
    "left": 75.1,
    "sizeOffset": [31, 16, 0, 0]
}, {
    "top": 33, // Middle/right 1
    "left": 75.1,
    "sizeOffset": [12.5, 0, -6.25, 0]
}, {
    "top": 0.2, // Top/right 2
    "left": 75.1,
    "sizeOffset": [0, 0, 0, 0]
}, {
    "top": 0.2, // Top/center 3
    "left": 38.3,
    "sizeOffset": [0, 0, 0, 0]
}, {
    "top": 0.2, // Top/left 4
    "left": 0.2,
    "sizeOffset": [0, 0, 0, 0]
}, {
    "top": 33, // Middle/left 5
    "left": 0.2,
    "sizeOffset": [12.5, 0, -6.25, 0]
}, {
    "top": 51.8, // Bottom/left 6
    "left": 0.2,
    "sizeOffset": [31, 16, 0, 0]
}, {
    "top": 51.8, // Bottom/center 7
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
    "percentage": '12.5%',
    "dialogTop": 15
}, {
    "containerHeight": 32, // 25%
    "percentage": '25%',
    "dialogTop": 30
}, {
    "containerHeight": 48, // 50%
    "percentage": '50%',
    "dialogTop": 50
}, {
    "containerHeight": 99.6, // 100%
    "percentage": '100%',
    "dialogTop": 115
}];

var Play_ChatFontObj = ['chat_extra_small', 'chat_size_small', 'chat_size_default', 'chat_size_biger', 'chat_size_bigest'];

//Variable initialization end

function Play_PreStart() {
    Play_chat_container = document.getElementById("chat_container");
    Play_ProgresBarrElm = document.getElementById("inner_progress_bar");

    Play_ChatPositions = Main_getItemInt('ChatPositionsValue', 0);
    Play_ChatSizeValue = Main_getItemInt('ChatSizeValue', 2);
    Play_ChatEnable = Main_getItemBool('ChatEnable', false);
    Play_isFullScreen = Main_getItemBool('Play_isFullScreen', true);
    Play_ChatBackground = (Main_values.ChatBackground * 0.05).toFixed(2);

    Play_SetQuality();

    Play_ChatSize(false);
    Play_ChatBackgroundChange(false);
    Play_SetChatFont();
}

function Play_SetQuality() {
    Play_quality = Settings_Obj_values('default_quality');
    Play_qualityPlaying = Play_quality;
    PlayVod_quality = Play_quality;
    PlayVod_qualityPlaying = PlayVod_quality;

}

var Play_isFullScreenold = true;

function Play_SetFullScreen(isfull) {
    if (Play_isFullScreenold === Play_isFullScreen) return;
    Play_isFullScreenold = Play_isFullScreen;

    if (isfull) {
        if (Play_ChatPositionsBF !== undefined) {
            Play_ChatPositions = Play_ChatPositionsBF;
            Play_ChatEnable = Play_ChatEnableBF;
            Play_ChatSizeValue = Play_ChatSizeValueBF;
            if (!Play_ChatEnable) Play_hideChat();
            Play_ChatSize(false);
        }
    } else {
        Play_ChatPositionsBF = Play_ChatPositions;
        Play_ChatEnableBF = Play_ChatEnable;
        Play_ChatSizeValueBF = Play_ChatSizeValue;
        Play_ChatPositions = 0;
        Play_showChat();
        Play_ChatEnable = true;
        Play_ChatSizeValue = 3;
        Play_ChatPositionConvert(true);
        Play_ChatSize(false);
        if (Chat_div) Chat_div.scrollTop = Chat_div.scrollHeight;
    }

    //TODO remove the try some day after the app update has be live for some time
    try {
        Android.mupdatesize(!Play_isFullScreen);
    } catch (e) {}

    Main_setItem('Play_isFullScreen', Play_isFullScreen);
}

function Play_SetChatFont() {
    for (var i = 0; i < Play_ChatFontObj.length; i++)
        Main_RemoveClass('chat_inner_container', Play_ChatFontObj[i]);

    Main_AddClass('chat_inner_container', Play_ChatFontObj[Main_values.Chat_font_size]);
}

function Play_Start() {
    Play_showBufferDialog();

    var icon = 'circle';
    var color = 'red';
    if (Main_values.IsRerun) {
        color = '#FFFFFF';
        icon = 'refresh';
    }

    Main_innerHTML("stream_live_icon", '<div style="vertical-align: middle; display: inline-block"><i class="icon-' +
        icon + '" style="color: ' + color + '; font-size: 90%; vertical-align: middle;"></i></div><div style="display: inline-block">' + STR_SPACE + (Main_values.IsRerun ? STR_NOT_LIVE : STR_LIVE).toUpperCase() + '</div>');
    Main_empty('stream_info_title');
    Play_LoadLogoSucess = false;
    PlayClip_HasVOD = true;
    //reset channel logo to prevent another channel logo
    Play_LoadLogo(document.getElementById('stream_info_icon'), IMG_404_LOGO);
    if (Main_values.Play_isHost) Main_textContent("stream_info_name", Main_values.Play_DisplaynameHost);
    else Main_textContent("stream_info_name", Main_values.Play_selectedChannelDisplayname);

    //past broadcast
    document.getElementById('controls_' + 3).style.display = 'none';
    Play_CurrentSpeed = 3;

    PlayClip_HideShowNext(0, 0);
    PlayClip_HideShowNext(1, 0);

    Main_values.Play_WasPlaying = 1;
    Main_SaveValues();

    Play_isHost = Main_values.Play_isHost;
    Main_values.Play_isHost = false;
    Play_RestoreFromResume = false;
    Main_ShowElement('controls_holder');

    Play_currentTime = 0;
    Play_watching_time = 0;
    Main_textContent("stream_watching_time", STR_WATCHING + Play_timeS(0));
    Play_created = Play_timeMs(0);

    Main_textContent("stream_live_time", STR_SINCE + Play_created);
    Main_HideElement('progress_bar_div');

    Play_UserLiveFeedPressed = false;
    Play_EndSet(1);
    Play_PlayerPanelOffset = -5;
    Play_updateStreamInfoErrorTry = 0;
    Play_PlayerCheckCounter = 0;
    Play_PlayerCheckCount = 0;
    window.clearInterval(Play_streamCheckId);
    Play_PlayerCheckRun = false;
    Play_loadingInfoDataTry = 0;
    Play_loadingInfoDataTimeout = 3000;
    Play_isLive = true;
    Play_qualitiesFound = 0;
    Play_tokenResponse = 0;
    Play_playlistResponse = 0;
    Play_playingTry = 0;
    Play_state = Play_STATE_LOADING_TOKEN;
    Play_isOn = true;
    Play_Playing = false;
    document.addEventListener('visibilitychange', Play_Resume, false);
    Play_updateStreamInfoStart();
    Play_loadData();
    document.body.removeEventListener("keyup", Main_handleKeyUp);
    Play_streamInfoTimerId = window.setInterval(Play_updateStreamInfo, 60000);
}

function Play_Warn(text) { // jshint ignore:line
    Play_showWarningDialog(text);
}

function Play_CheckResume() { // jshint ignore:line
    if (Play_isOn) Play_Resume();
    if (PlayVod_isOn) PlayVod_Resume();
    if (PlayClip_isOn) {
        PlayClip_shutdownStream();
        window.clearInterval(PlayClip_streamCheckId);
    }
}

function Play_Resume() {
    if (document.hidden) {
        if (Play_isEndDialogVisible()) {
            Play_CleanHideExit();
            Play_hideChat();
            Play_shutdownStream();
        } else {
            Play_ClearPlayer();
            Play_Playing = false;
            ChatLive_Clear();
            window.clearInterval(Play_streamInfoTimerId);
        }
    } else {
        Play_isOn = true;
        Play_clearPause();
        if (Play_isOn) {
            Play_showBufferDialog();
            Play_loadingInfoDataTry = 0;
            Play_loadingInfoDataTimeout = 3000;
            Play_RestoreFromResume = true;
            if (!Play_LoadLogoSucess) Play_updateStreamInfoStart();
            else Play_updateStreamInfo();
            Play_state = Play_STATE_LOADING_TOKEN;
            Play_ResumeAfterOnlineCounter = 0;
            if (navigator.onLine) Play_loadData();
            else Play_ResumeAfterOnlineId = window.setInterval(Play_ResumeAfterOnline, 100);
            Play_streamInfoTimerId = window.setInterval(Play_updateStreamInfo, 60000);
        }
    }
}

function Play_ResumeAfterOnline() {
    if (navigator.onLine || Play_ResumeAfterOnlineCounter > 200) {
        window.clearInterval(Play_ResumeAfterOnlineId);
        Play_loadData();
    }
    Play_ResumeAfterOnlineCounter++;
}

function Play_updateStreamInfoStart() {
    var theUrl = 'https://api.twitch.tv/kraken/streams/' + Main_values.Play_selectedChannel_id;
    BasexmlHttpGet(theUrl, Play_loadingInfoDataTimeout, 2, null, Play_updateStreamInfoStartValues, Play_updateStreamInfoStartError, false);
}

function Play_updateStreamInfoStartValues(response) {
    response = JSON.parse(response);
    if (response.stream !== null) {
        if (Play_isHost) Main_textContent("stream_info_name", Main_values.Play_DisplaynameHost);
        else Main_textContent("stream_info_name", Main_values.Play_selectedChannelDisplayname);

        Main_values.IsRerun = Main_is_rerun(response.stream.stream_type);
        var icon = 'circle';
        var color = 'red';
        if (Main_values.IsRerun) {
            color = '#FFFFFF';
            icon = 'refresh';
        }

        Main_innerHTML("stream_live_icon", '<div style="vertical-align: middle; display: inline-block"><i class="icon-' +
            icon + '" style="color: ' + color + '; font-size: 90%; vertical-align: middle;"></i></div><div style="display: inline-block">' + STR_SPACE + (Main_values.IsRerun ? STR_NOT_LIVE : STR_LIVE).toUpperCase() + '</div>');

        Main_values.Play_selectedChannel_id = response.stream.channel._id;
        Main_innerHTML("stream_info_title", twemoji.parse(response.stream.channel.status, false, true));
        Main_values.Play_gameSelected = response.stream.game;
        Play_Lang = ' [' + (response.stream.channel.broadcaster_language).toUpperCase() + ']';
        var playing = (Main_values.Play_gameSelected !== "" ? STR_PLAYING + Main_values.Play_gameSelected + STR_FOR : "");
        Main_textContent("stream_info_game", playing + Main_addCommas(response.stream.viewers) + ' ' + STR_VIEWER + Play_Lang);
        Main_values.Play_selectedChannelLogo = response.stream.channel.logo;
        Play_LoadLogoSucess = true;
        Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Play_selectedChannelLogo);
        Play_created = response.stream.created_at;
        if (AddUser_UserIsSet()) {
            AddCode_PlayRequest = true;
            AddCode_Channel_id = Main_values.Play_selectedChannel_id;
            AddCode_CheckFallow();
        } else Play_hideFallow();
    }
}

function Play_updateStreamInfoStartError() {
    if (Play_loadingInfoDataTry < Play_loadingInfoDataTryMax) {
        Play_loadingInfoDataTimeout += 500;
        window.setTimeout(function() {
            if (Play_isOn) Play_updateStreamInfoStart();
        }, 750);
    }
    Play_loadingInfoDataTry++;
}

function Play_updateStreamInfo() {
    var theUrl = 'https://api.twitch.tv/kraken/streams/' + Main_values.Play_selectedChannel_id;
    BasexmlHttpGet(theUrl, 3000, 2, null, Play_updateStreamInfoValues, Play_updateStreamInfoError, false);
}

function Play_updateStreamInfoValues(response) {
    response = JSON.parse(response);
    if (response.stream !== null) {
        Main_innerHTML("stream_info_title", twemoji.parse(response.stream.channel.status, false, true));
        Main_values.Play_gameSelected = response.stream.game;
        Main_textContent("stream_info_game", STR_PLAYING + Main_values.Play_gameSelected + STR_FOR +
            Main_addCommas(response.stream.viewers) + ' ' + STR_VIEWER + Play_Lang);
        if (!Play_LoadLogoSucess) Play_LoadLogo(document.getElementById('stream_info_icon'),
            response.stream.channel.logo);
    }
}

function Play_updateStreamInfoError() {
    if (Play_updateStreamInfoErrorTry < Play_loadingInfoDataTryMax) {
        window.setTimeout(function() {
            if (Play_isOn) Play_updateStreamInfo();
            //give a second for it retry as the TV may be on coming from resume
        }, 2500);
        Play_updateStreamInfoErrorTry++;
    } else Play_updateStreamInfoErrorTry = 0;
}

function Play_LoadLogo(ImgObjet, link) {
    ImgObjet.onerror = function() {
        this.onerror = null;
        this.src = IMG_404_LOGO; //img fail to load a predefined logo
        Play_LoadLogoSucess = false;
    };
    ImgObjet.src = link;
}

function Play_loadData() {
    Play_loadingDataTry = 0;
    Play_loadingDataTimeout = 2000 + (Play_RestoreFromResume ? 3000 : 0);
    Play_loadDataRequest();
}

function Play_loadDataRequest() {
    var theUrl, state = Play_state === Play_STATE_LOADING_TOKEN;

    if (state) {
        theUrl = 'https://api.twitch.tv/api/channels/' + Main_values.Play_selectedChannel + '/access_token?platform=_' +
            (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token ? '&oauth_token=' +
                AddUser_UsernameArray[Main_values.Users_Position].access_token : '');
    } else {
        theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + Main_values.Play_selectedChannel +
            '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
            '&playlist_include_framerate=true&reassignments_supported=true&allow_source=true&fast_bread=true' +
            (Main_vp9supported ? '&preferred_codecs=vp09' : '');
    }

    var xmlHttp;
    if (Main_Android) {

        xmlHttp = Android.mreadUrl(theUrl, Play_loadingDataTimeout, 1, null);
        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            Play_loadDataError();
            return;
        }
        if (xmlHttp.status === 200) {
            Play_loadingDataTry = 0;
            if (Play_isOn) {
                if (!state) {
                    try {
                        Android.SetAuto(theUrl);
                    } catch (e) {}
                }
                Play_loadDataSuccess(xmlHttp.responseText);
            }
        } else if (xmlHttp.status === 403) { //forbidden access
            Play_ForbiddenLive();
        } else if (xmlHttp.status === 404) { //off line
            Play_CheckHostStart();
        } else {
            Play_loadDataError();
        }

    } else {
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = Play_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Play_loadingDataTry = 0;
                    if (Play_isOn) Play_loadDataSuccess(xmlHttp.responseText);
                } else if (xmlHttp.status === 403) { //forbidden access
                    Play_loadDataErrorLog(xmlHttp);
                    if (!Main_isBrowser) Play_ForbiddenLive();
                    else Play_loadDataSuccessFake();
                } else if (xmlHttp.status === 404) { //off line
                    Play_loadDataErrorLog(xmlHttp);
                    if (!Main_isBrowser) Play_CheckHostStart();
                    else Play_loadDataSuccessFake();
                } else {
                    Play_loadDataErrorLog(xmlHttp);
                    Play_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    }
}

function Play_loadDataErrorLog(xmlHttp) {
    if (Main_isDebug) {
        console.log(xmlHttp.status);
        console.log(xmlHttp.responseText);
    }
}

function Play_loadDataError() {
    if (Play_isOn && Play_isLive) {
        Play_loadingDataTry++;
        if (Play_loadingDataTry < (Play_loadingDataTryMax + (Play_RestoreFromResume ? 7 : 0))) {
            Play_loadingDataTimeout += 250;
            if (Play_RestoreFromResume) window.setTimeout(Play_loadDataRequest, 500);
            else Play_loadDataRequest();
        } else {
            if (!Main_isBrowser) Play_CheckHostStart();
            else Play_loadDataSuccessFake();
        }
    }
}

function Play_ForbiddenLive() {
    Play_HideBufferDialog();
    Play_showWarningDialog(STR_FORBIDDEN);
    window.setTimeout(function() {
        if (Play_isOn) Play_CheckHostStart();
    }, 4000);
}

//Browsers crash trying to get the streams link
function Play_loadDataSuccessFake() {
    Play_qualities = [{
            'id': 'Auto',
            'band': 0,
            'codec': 'avc',
            'url': ''
        },
        {
            'id': '1080p60 | Source',
            'band': '| 10.00Mbps',
            'codec': ' | avc',
            'url': 'https://fake'
        },
    ];
    Play_state = Play_STATE_PLAYING;
    if (Play_isOn) Play_qualityChanged();
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
        if (Play_isOn) Play_qualityChanged();
    }
}

var Play_qualitiesAuto;

function Play_extractQualities(input) {
    var Band,
        codec,
        result = [],
        TempId = '',
        tempCount = 1;
    //Play_qualitiesAuto = [];

    var streams = Play_extractStreamDeclarations(input);
    for (var i = 0; i < streams.length; i++) {
        TempId = streams[i].split('NAME="')[1].split('"')[0];
        Band = Play_extractBand(streams[i].split('BANDWIDTH=')[1].split(',')[0]);
        codec = Play_extractCodec(streams[i].split('CODECS="')[1].split('.')[0]);
        if (!result.length) {
            result.push({
                'id': 'Auto',
                'band': 0,
                'codec': 'avc',
                'url': ''
            });
            if (TempId.indexOf('ource') === -1) TempId = TempId + ' | source';
            else TempId = TempId.replace('(', ' | ').replace(')', '');
            result.push({
                'id': TempId,
                'band': Band,
                'codec': codec,
                'url': streams[i].split("\n")[2]
            });
            //Play_qualitiesAuto.push(result[i].url);
        } else if (result[i - tempCount].id !== TempId && result[i - tempCount].id !== TempId + ' | source') {
            result.push({
                'id': TempId,
                'band': Band,
                'codec': codec,
                'url': streams[i].split("\n")[2]
            });
            //Play_qualitiesAuto.push(result[i].url);
        } else tempCount++;
    }

    return result;
}

function Play_extractBand(input) {
    input = parseInt(input);
    return input > 0 ? ' | ' + parseFloat(input / 1000000).toFixed(2) + 'Mbps' : '';
}

function Play_extractCodec(input) {
    if (input.indexOf('avc') !== -1) return ' | avc';
    else if (input.indexOf('vp9') !== -1) return ' | vp9';
    else if (input.indexOf('mp4') !== -1) return ' | mp4';
    return '';
}

function Play_extractStreamDeclarations(input) {
    var result = [];

    var myRegexp = /#EXT-X-MEDIA:(.)*\n#EXT-X-STREAM-INF:(.)*\n(.)*/g;
    var marray;
    while (marray = myRegexp.exec(input)) result.push(marray[0]); // jshint ignore:line 

    return result;
}

function Play_qualityChanged() {
    window.clearInterval(Play_streamCheckId);
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
    Play_SetHtmlQuality('stream_quality', true);

    Play_state = Play_STATE_PLAYING;
    if (Main_isDebug) console.log('Play_onPlayer:', '\n' + '\n"' + Play_playingUrl + '"\n');

    if (Main_Android && Play_isOn) {
        if (Play_quality.indexOf("Auto") !== -1) {
            try {
                Android.StartAuto(1, 1);
            } catch (e) {
                Android.startVideo(Play_playingUrl, 1);
            }
        } else Android.startVideo(Play_playingUrl, 1);
    }

    Play_onPlayer();
}

function Play_SetHtmlQuality(element) {
    if (!Play_qualities[Play_qualityIndex].hasOwnProperty('id')) return;

    Play_quality = Play_qualities[Play_qualityIndex].id;

    var quality_string = '';

    if (Play_quality.indexOf('source') !== -1) quality_string = Play_quality.replace("source", STR_SOURCE);
    else quality_string = Play_quality;

    quality_string += Play_quality.indexOf('Auto') === -1 ? Play_qualities[Play_qualityIndex].band + Play_qualities[Play_qualityIndex].codec : "";

    Main_textContent(element, quality_string);
}

function Play_onPlayer() {
    Play_ChatLoadStarted = false;
    if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
    Play_SetFullScreen(Play_isFullScreen);
    Play_Playing = true;
    Play_loadChat();

    if (Main_Android) {
        Play_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = 1 + ((Play_Buffer / 1000) * 2);
        Play_PlayerCheckQualityChanged = false;
        window.clearInterval(Play_streamCheckId);
        Play_streamCheckId = window.setInterval(Play_PlayerCheck, Play_PlayerCheckInterval);
    }
}

function Play_loadChat() {
    if (!Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }

    ChatLive_Init();
}

function Play_PlayerCheck() {
    var updatetime = !Play_isNotplaying();
    if (Main_Android) Play_currentTime = Android.gettime();
    if (Play_isOn && Play_PlayerTime === Play_currentTime && updatetime) {
        Play_PlayerCheckCount++;
        if (Play_PlayerCheckCount > Play_PlayerCheckTimer) {

            //Don't change the first time only retry, and don't change if in Auto mode
            if (Play_PlayerCheckQualityChanged && Play_PlayerCheckRun &&
                (Play_qualityIndex < Play_getQualitiesCount() - 1) && (Play_qualityPlaying.indexOf("Auto") === -1))
                Play_qualityIndex++;
            else if (!Play_PlayerCheckQualityChanged && Play_PlayerCheckRun) Play_PlayerCheckCounter++;

            if (!navigator.onLine) Play_EndStart(false, 1);
            else if (Play_PlayerCheckCounter > 1) Play_CheckConnection(Play_PlayerCheckCounter, 1, Play_DropOneQuality);
            else {
                Play_qualityDisplay();
                Play_qualityChanged();
                Play_PlayerCheckRun = true;
            }

        }
    } else {
        Play_PlayerCheckCounter = 0;
        Play_PlayerCheckCount = 0;
        Play_PlayerCheckRun = false;
    }
    Play_PlayerTime = Play_currentTime;
    if (updatetime) Play_watching_time++;
}

function Play_DropOneQuality(ConnectionDrop) {

    if (!ConnectionDrop) {
        if (Play_qualityIndex < Play_getQualitiesCount() - 1) Play_qualityIndex++;
        else {
            Play_CheckHostStart();
            return;
        }
    }

    Play_PlayerCheckCounter = 0;
    Play_qualityDisplay();
    Play_qualityChanged();
    Play_PlayerCheckRun = true;
}

function Play_EndStart(hosting, PlayVodClip) {
    Main_values.Play_isHost = hosting;
    Play_EndSet(PlayVodClip);
    Play_PlayEndStart(PlayVodClip);
}

// Check if connection with twitch server is OK if not for 15s drop one quality
function Play_CheckConnection(counter, PlayVodClip, DropOneQuality) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.timeout = 1000;
    xmlHttp.open("GET", 'https://static-cdn.jtvnw.net/jtv-static/404_preview-10x10.png?' + Math.random(), true);

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                DropOneQuality(counter > 2);
            } else if (counter > 12) Play_EndStart(false, PlayVodClip);
        }
    };

    xmlHttp.send(null);
}

function Play_isNotplaying() {
    if (Main_Android) return !Android.getPlaybackState();
    else return false;
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

    seconds = Play_lessthanten(parseInt(time) % 60);

    time = Math.floor(time / 60);
    minutes = Play_lessthanten(time % 60);

    time = Math.floor(time / 60);
    hours = Play_lessthanten(time);

    //final time 00:00 or 00:00:00
    return (!time) ? (minutes + ":" + seconds) : (hours + ":" + minutes + ":" + seconds);
}

function Play_timeMs(time) {
    return Play_timeS(parseInt(time / 1000));
}

function Play_streamLiveAt(time) { //time in '2017-10-27T13:27:27Z'
    return Play_timeMs((new Date().getTime()) - (new Date(time).getTime()));
}

function Play_shutdownStream() {
    if (Play_isOn) {
        Play_PreshutdownStream();
        Play_qualities = [];
        Play_qualitiesAuto = [];
        Main_values.Play_WasPlaying = 0;
        Play_exitMain();
    }
}

function Play_PreshutdownStream() {
    if (Main_Android) Android.stopVideo(1);
    Play_isOn = false;
    UserLiveFeed_Hide();
    Chat_Clear();
    Play_ClearPlayer();
    Play_ClearPlay();
    Main_values.Play_selectedChannel_id = '';
}

function Play_exitMain() {
    PlayVod_ProgresBarrUpdate(0, 0);
    Main_ShowElement('scene1');
    Main_HideElement('scene2');
    Main_ReStartScreens();
}

function Play_ClearPlayer() {
    Play_hidePanel();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_HideEndDialog();
    Play_IncrementView = '';

    if (Play_qualityIndex === (Play_getQualitiesCount() - 1)) Play_qualityPlaying = Play_qualities[0].id;
    if (PlayVod_qualityIndex === (PlayVod_getQualitiesCount() - 1)) PlayVod_qualityPlaying = PlayVod_qualities[0].id;
    if (PlayClip_qualityIndex === (PlayClip_getQualitiesCount() - 1)) PlayClip_qualityPlaying = PlayClip_qualities[0].id;

}

function Play_ClearPlay() {
    Play_Playing = false;
    document.body.removeEventListener("keydown", Play_handleKeyDown);
    document.removeEventListener('visibilitychange', Play_Resume);
    ChatLive_Clear();
    window.clearInterval(Play_streamInfoTimerId);
    window.clearInterval(Play_streamCheckId);
    Play_IsWarning = false;
}

function Play_hideFallow() {
    Play_controls[Play_controlsFallow].setLable(STR_SPACE + STR_NOKEY);
    AddCode_IsFallowing = false;
}

function Play_showBufferDialog() {
    if (Main_Android) Android.mshowLoading(true);
    else Main_ShowElement('dialog_loading_play');
}

function Play_HideBufferDialog() {
    if (Main_Android) Android.mshowLoading(false);
    else Main_HideElement('dialog_loading_play');
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
    Play_HideBufferDialog();
    if (!Play_isNotplaying()) Play_clearPause();
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
    //return;
    Play_clearHidePanel();
    document.getElementById("scene_channel_panel").style.opacity = "0";
    Play_quality = Play_qualityPlaying;
    window.clearInterval(PlayVod_RefreshProgressBarrID);
}

function Play_showPanel() {
    PlayVod_IconsBottonResetFocus();
    //Play_IconsResetFocus();
    Play_qualityIndexReset();
    Play_qualityDisplay();
    Play_ResetSpeed();
    if (Play_qualityPlaying.indexOf("Auto") === -1) Play_SetHtmlQuality('stream_quality', true);
    Play_RefreshWatchingtime();
    window.clearInterval(PlayVod_RefreshProgressBarrID);
    PlayVod_RefreshProgressBarrID = window.setInterval(Play_RefreshWatchingtime, 1000);
    Play_clock();
    Play_CleanHideExit();
    document.getElementById("scene_channel_panel").style.opacity = "1";
    Play_clearHidePanel();
    Play_setHidePanel();
}

function Play_RefreshWatchingtime() {
    Main_textContent("stream_watching_time", STR_WATCHING + Play_timeS(Play_watching_time));
    Main_textContent("stream_live_time", STR_SINCE +
        (Play_created.indexOf('00:00') === -1 ? Play_streamLiveAt(Play_created) : '00:00'));

    if (Play_qualityPlaying.indexOf("Auto") !== -1) {
        try {
            var value = null;
            try {
                value = Android.getVideoQuality();
            } catch (e) {}
            if (value !== null) Play_getVideoQuality(value);
            else Play_SetHtmlQuality('stream_quality', true);
        } catch (e) {
            Play_SetHtmlQuality('stream_quality', true);
        }
    }
}

function Play_getVideoQuality(value) {
    value = value.split(',');

    for (var i = 0; i < value.length; i++) {
        value[i] = (value[i] !== null && value[i] !== 'null') ? value[i] : '';
    }

    Main_innerHTML("stream_quality", value[0] + value[1] + " | Auto" + Play_extractBand(value[2]) + " | " + value[3]);
}

function Play_clearHidePanel() {
    window.clearTimeout(Play_PanelHideID);
    PlayVod_ProgressBaroffset = 0;
}

function Play_setHidePanel() {
    Play_PanelHideID = window.setTimeout(Play_hidePanel, 5000);
}

function Play_showChat() {
    Play_ChatPosition();
    Play_ChatBackgroundChange(false);
    Main_ShowElement('chat_container');

    Play_controls[Play_controlsChat].setLable();
}

function Play_hideChat() {
    Main_HideElement('chat_container');
    Play_controls[Play_controlsChat].setLable();
}

function Play_isChatShown() {
    return Main_isElementShowing('chat_container');
}

function Play_getQualitiesCount() {
    return Play_qualities.length;
}

function Play_ChatSize(showDialog) {
    if (Play_ChatSizeValue > 3) Play_ChatSizeValue = 3;
    Play_chat_container.style.height = Play_ChatSizeVal[Play_ChatSizeValue].containerHeight + '%';
    document.getElementById("play_chat_dialog").style.marginTop = Play_ChatSizeVal[Play_ChatSizeValue].dialogTop + '%';
    Play_ChatPosition();
    ChatLive_ChatFixPosition();

    if (showDialog) Play_showChatBackgroundDialog(STR_SIZE + Play_ChatSizeVal[Play_ChatSizeValue].percentage);

    window.setTimeout(function() {
        if (Chat_div) Chat_div.scrollTop = Chat_div.scrollHeight;
    }, 500);
    Main_setItem('ChatSizeValue', Play_ChatSizeValue);
}

function Play_ChatBackgroundChange(showDialog) {
    Play_chat_container.style.backgroundColor = "rgba(0, 0, 0, " + Play_ChatBackground + ")";
    if (showDialog) Play_showChatBackgroundDialog(STR_BRIGHTNESS + (Play_ChatBackground * 100).toFixed(0) + '%');
}

function Play_ChatPositionConvert(up) {
    if (up) {
        Play_ChatPositionConvertBefore = Play_ChatPositions;
        Play_ChatPositions = Play_ChatPositionsBefore[Play_ChatPositions];
    } else Play_ChatPositions = Play_ChatPositionsAfter[Play_ChatPositions][Play_ChatPositionConvertBefore];
}

function Play_ChatPosition() {
    var bool = (Play_ChatSizeValue === 3);

    if (Play_ChatPositions < 0) Play_ChatPositions = (bool ? 2 : 7);
    else if (Play_ChatPositions > (bool ? 2 : 7)) Play_ChatPositions = 0;

    Play_chat_container.style.top = (bool ? 0.2 : (Play_ChatPositionVal[Play_ChatPositions].top + Play_ChatPositionVal[Play_ChatPositions].sizeOffset[Play_ChatSizeValue])) + '%';

    Play_chat_container.style.left =
        Play_ChatPositionVal[Play_ChatPositions + (bool ? 2 : 0)].left + '%';

    //if (Chat_div) Chat_div.scrollTop = Chat_div.scrollHeight;
    Main_setItem('ChatPositionsValue', Play_ChatPositions);
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
    if (Play_isNotplaying()) {
        Play_clearPause();

        Main_innerHTML('pause_button', '<div style="transform: translateY(10%);"><i class="pause_button3d icon-pause"></i> </div>');

        if (PlayVodClip === 1) {
            if (Play_isPanelShown()) Play_hidePanel();
            window.clearInterval(Play_streamCheckId);
            Play_streamCheckId = window.setInterval(Play_PlayerCheck, Play_PlayerCheckInterval);
        } else if (PlayVodClip === 2) {
            if (Play_isPanelShown()) PlayVod_hidePanel();
            window.clearInterval(PlayVod_streamCheckId);
            PlayVod_streamCheckId = window.setInterval(PlayVod_PlayerCheck, Play_PlayerCheckInterval);
        } else if (PlayVodClip === 3) {
            if (Play_isPanelShown()) PlayClip_hidePanel();
            window.clearInterval(PlayClip_streamCheckId);
            PlayClip_streamCheckId = window.setInterval(PlayClip_PlayerCheck, Play_PlayerCheckInterval);
        }

        //For some reason Android.play(true); can freez the app as if the function never returns even it be a void
        //Let it at the botton and thecnicly all works
        if (Main_Android) {
            Android.play(true);
        }
    } else {
        window.clearInterval(Play_streamCheckId);
        window.clearInterval(PlayVod_streamCheckId);
        window.clearInterval(PlayClip_streamCheckId);

        Main_innerHTML('pause_button', '<div style="transform: translateY(10%);"><i class="pause_button3d icon-play-1"></i> </div>');

        Play_showPauseDialog();
        if (Main_Android) Android.play(false);
    }
}

function Play_IconsResetFocus() {
    Play_IconsRemoveFocus();
    Play_Panelcounter = 6;
    Play_IconsAddFocus();
}

function Play_PrepareshowEndDialog(PlayVodClip) {
    Play_state = -1;
    PlayVod_state = -1;
    PlayClip_state = -1;
    UserLiveFeed_Hide();
    Play_hideChat();
    Play_hidePanel();
    PlayClip_hidePanel();
    PlayVod_hidePanel();
    if (!Play_IsWarning) Play_HideWarningDialog();
    Play_HideBufferDialog();
    Play_CleanHideExit();
    if (PlayVodClip === 3 && PlayClip_HasNext && (PlayClip_All || PlayClip_All_Forced)) {
        Play_EndIconsRemoveFocus();
        Play_Endcounter = -1;
    }
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

function Play_isEndDialogVisible() {
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
    if (PlayVodClip === 1) Play_DialogEndText = Main_values.Play_selectedChannelDisplayname + ' ' + STR_LIVE;
    else if (PlayVodClip === 2) Play_DialogEndText = Main_values.Main_selectedChannelDisplayname + STR_VIDEO;
    else if (PlayVodClip === 3) Play_DialogEndText = Main_values.Main_selectedChannelDisplayname + STR_CLIP;

    if (Play_EndTextCounter === -2) { //disable
        Play_state = Play_STATE_PLAYING;
        PlayVod_state = Play_STATE_PLAYING;
        PlayClip_state = PlayClip_STATE_PLAYING;
        Play_EndTextClear();
        return;
    }

    Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR +
        ((PlayVodClip === 3 && PlayClip_HasNext && (PlayClip_All || PlayClip_All_Forced)) ? STR_PLAY_NEXT_IN : STR_STREAM_END) + Play_EndTextCounter + '...');

    if (Play_isEndDialogVisible()) {
        Play_EndTextCounter--;
        Play_state = Play_STATE_PLAYING;
        PlayVod_state = Play_STATE_PLAYING;
        PlayClip_state = PlayClip_STATE_PLAYING;

        if (Play_EndTextCounter === -1) {
            Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR + STR_STREAM_END +
                '0...');
            Play_CleanHideExit();
            Play_hideChat();

            if (PlayVodClip === 1) Play_shutdownStream();
            else if (PlayVodClip === 2) PlayVod_shutdownStream();
            else if (PlayVodClip === 3) {
                if (PlayClip_HasNext && (PlayClip_All || PlayClip_All_Forced)) PlayClip_PlayNext();
                else PlayClip_shutdownStream();
            }

        } else {
            Play_EndTextID = window.setTimeout(function() {
                Play_EndText(PlayVodClip);
            }, 1000);
        }
    } else {
        Play_EndTextID = window.setTimeout(function() {
            Play_EndText(PlayVodClip);
        }, 50);
    }
}

function Play_EndTextClear() {
    window.clearTimeout(Play_EndTextID);
    Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR + STR_STREAM_END_EXIT);
}

function Play_EndDialogPressed(PlayVodClip) {
    var canhide = true;
    if (Play_Endcounter === -1 && PlayClip_HasNext) PlayClip_PlayNext();
    else if (!Play_Endcounter) {
        if (PlayVodClip === 2) {
            if (!PlayVod_qualities.length) {
                canhide = false;
                Play_showWarningDialog(STR_CLIP_FAIL);
                window.setTimeout(function() {
                    Play_HideWarningDialog();
                }, 2000);
            } else {
                PlayVod_replay = true;
                PlayVod_PlayerCheckQualityChanged = false;
                PlayVod_qualityChanged();
                Play_clearPause();
                PlayVod_currentTime = 0;
                Chat_offset = 0;
                Chat_Init();
            }
        } else if (PlayVodClip === 3) {
            if (!PlayClip_qualities.length) {
                canhide = false;
                Play_showWarningDialog(STR_CLIP_FAIL);
                window.setTimeout(function() {
                    Play_HideWarningDialog();
                }, 2000);
            } else {
                PlayClip_replay = true;
                PlayClip_PlayerCheckQualityChanged = false;
                PlayClip_qualityChanged();
                Play_clearPause();
                if (PlayClip_HasVOD) {
                    PlayVod_currentTime = 0;
                    Chat_offset = ChannelVod_vodOffset;
                    Chat_Init();
                } else Chat_NoVod();
            }
        }
    } else if (Play_Endcounter === 1) {
        if (Main_values.Play_isHost) {
            Main_values.Play_DisplaynameHost = Main_values.Play_selectedChannelDisplayname + STR_USER_HOSTING;
            Main_values.Play_selectedChannel = Play_TargetHost.target_login;
            Main_values.Play_selectedChannelDisplayname = Play_TargetHost.target_display_name;
            Main_values.Play_DisplaynameHost = Main_values.Play_DisplaynameHost + Main_values.Play_selectedChannelDisplayname;
            Play_PreshutdownStream();
            document.body.addEventListener("keydown", Play_handleKeyDown, false);

            Main_values.Play_selectedChannel_id = Play_TargetHost.target_id;
            Main_ready(Play_Start);
        } else {
            PlayClip_OpenVod();
            if (!PlayClip_HasVOD) canhide = false;
        }
    } else if (Play_Endcounter === 2) Play_OpenChannel(PlayVodClip);
    else if (Play_Endcounter === 3) Play_OpenGame(PlayVodClip);

    if (Play_Endcounter !== 1)
        if (Play_Endcounter === 3 && Main_values.Play_gameSelected === '') canhide = false;

    if (canhide) Play_HideEndDialog();
}

function Play_EndSet(PlayVodClip) {
    if (!PlayVodClip) { // Play is hosting
        Play_EndIconsRemoveFocus();
        Play_Endcounter = 1;
        Play_EndIconsAddFocus();
        document.getElementById('dialog_end_-1').style.display = 'none';
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'inline-block';
        Main_textContent("dialog_end_vod_text", STR_OPEN_HOST);
    } else if (PlayVodClip === 1) { // play
        Play_EndIconsRemoveFocus();
        Play_Endcounter = 2;
        Play_EndIconsAddFocus();
        document.getElementById('dialog_end_-1').style.display = 'none';
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'none';
    } else if (PlayVodClip === 2) { // vod
        Play_EndIconsResetFocus();
        document.getElementById('dialog_end_-1').style.display = 'none';
        document.getElementById('dialog_end_0').style.display = 'inline-block';
        document.getElementById('dialog_end_1').style.display = 'none';
    } else if (PlayVodClip === 3) { // clip
        Play_EndIconsResetFocus();
        document.getElementById('dialog_end_-1').style.display = PlayClip_HasNext ? 'inline-block' : 'none';
        document.getElementById('dialog_end_0').style.display = 'inline-block';
        document.getElementById('dialog_end_1').style.display = 'inline-block';
        Main_textContent("dialog_end_vod_text", PlayClip_HasVOD ? STR_OPEN_BROADCAST : STR_NO_BROADCAST);
    }
}

function Play_OpenChannel(PlayVodClip) {
    if (!Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) {
        Main_values.Main_BeforeChannel = (Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_aGame) ? Main_values.Main_BeforeAgame : Main_values.Main_Go;
        Main_values.Main_BeforeChannelisSet = true;
    }

    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_ChannelContent;

    if (PlayVodClip === 1) {
        Main_values.Main_selectedChannel_id = Main_values.Play_selectedChannel_id;
        Main_values.Main_selectedChannel = Main_values.Play_selectedChannel;
        Main_values.Main_selectedChannelDisplayname = Main_values.Play_selectedChannelDisplayname;
        ChannelContent_UserChannels = AddCode_IsFallowing;
        Play_hideChat();
        Play_shutdownStream();
    } else if (PlayVodClip === 2) PlayVod_shutdownStream();
    else if (PlayVodClip === 3) PlayClip_shutdownStream();
}

//TODO improve this
function Play_OpenSearch(PlayVodClip) {
    if (PlayVodClip === 1) {
        Play_hideChat();
        Play_PreshutdownStream();
    } else if (PlayVodClip === 2) PlayVod_PreshutdownStream();
    else if (PlayVodClip === 3) PlayClip_PreshutdownStream();

    Main_values.Play_WasPlaying = 0;
    PlayVod_ProgresBarrUpdate(0, 0);
    Main_ShowElement('scene1');
    Main_HideElement('scene2');
    Main_updateclock();
    document.body.addEventListener("keyup", Main_handleKeyUp, false);
    Main_OpenSearch();
}

function Play_OpenGame(PlayVodClip) {
    if (Main_values.Play_gameSelected === '') {
        Play_clearHidePanel();
        Play_IsWarning = true;
        Play_showWarningDialog(STR_NO_GAME);
        window.setTimeout(function() {
            Play_IsWarning = false;
            Play_HideWarningDialog();
        }, 2000);
        return;
    }

    if (!Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_AGameVod && Main_values.Main_Go !== Main_AGameClip) {
        Main_values.Main_BeforeAgame = (Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelContent && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) ? Main_values.Main_BeforeChannel : Main_values.Main_Go;
        Main_values.Main_BeforeAgameisSet = true;
    }

    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_aGame;

    Main_values.Main_gameSelected = Main_values.Play_gameSelected;
    Play_hideChat();
    if (PlayVodClip === 1) Play_shutdownStream();
    else if (PlayVodClip === 2) PlayVod_shutdownStream();
    else if (PlayVodClip === 3) PlayClip_shutdownStream();
}

function Play_FallowUnfallow() {
    if (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token) {
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

//TODO improve this position base
function Play_qualityDisplay() {
    if (Play_getQualitiesCount() === 1) {
        document.getElementById("control_arrow_up_" + 6).style.opacity = "0";
        document.getElementById("control_arrow_down" + 6).style.opacity = "0";
    } else if (!Play_qualityIndex) {
        document.getElementById("control_arrow_up_" + 6).style.opacity = "0.2";
        document.getElementById("control_arrow_down" + 6).style.opacity = "1";
    } else if (Play_qualityIndex === Play_getQualitiesCount() - 1) {
        document.getElementById("control_arrow_up_" + 6).style.opacity = "1";
        document.getElementById("control_arrow_down" + 6).style.opacity = "0.2";
    } else {
        document.getElementById("control_arrow_up_" + 6).style.opacity = "1";
        document.getElementById("control_arrow_down" + 6).style.opacity = "1";
    }

    Play_SetHtmlQuality('controls_name_' + 6);
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

//called by android PlayerActivity
function Play_PannelEndStart(PlayVodClip) { // jshint ignore:line
    if (PlayVodClip === 1) { //live
        window.clearInterval(Play_streamCheckId);
        Play_CheckHostStart();
    } else {
        Play_PlayEndStart(PlayVodClip);
    }
}

function Play_PlayEndStart(PlayVodClip) {
    window.clearInterval(Play_streamCheckId);
    window.clearInterval(PlayClip_streamCheckId);
    window.clearInterval(PlayVod_streamCheckId);

    Play_PrepareshowEndDialog(PlayVodClip);
    Play_EndTextCounter = (!Play_EndSettingsCounter ? -2 : Play_EndSettingsCounter);

    Play_EndText(PlayVodClip);
    Play_showEndDialog();
}

function Play_CheckHostStart() {
    Play_showBufferDialog();
    Play_state = -1;
    Play_loadingDataTry = 0;
    Play_loadingDataTimeout = 2000;
    ChatLive_Clear();
    window.clearInterval(Play_streamInfoTimerId);
    window.clearInterval(Play_streamCheckId);
    if (Main_values.Play_selectedChannel_id !== '') Play_loadDataCheckHost();
    else Play_CheckId();
}

function Play_CheckId() {
    var theUrl = 'https://api.twitch.tv/kraken/users?login=' + Main_values.Play_selectedChannel;
    BasexmlHttpGet(theUrl, Play_loadingDataTimeout, 2, null, Play_CheckIdValue, Play_CheckIdError, false);
}

function Play_CheckIdValue(musers) {
    musers = JSON.parse(musers).users[0];
    if (musers !== undefined) {
        Main_values.Play_selectedChannel_id = musers._id;
        Play_loadingDataTry = 0;
        Play_loadingDataTimeout = 2000;
        Play_loadDataCheckHost();
    } else Play_PlayEndStart(1);
}

function Play_CheckIdError() {
    Play_loadingDataTry++;
    if (Play_loadingDataTry < Play_loadingDataTryMax) {
        Play_loadingDataTimeout += 250;
        Play_CheckId();
    } else Play_EndStart(false, 1);
}

function Play_loadDataCheckHost() {
    var theUrl = 'https://tmi.twitch.tv/hosts?include_logins=1&host=' +
        encodeURIComponent(Main_values.Play_selectedChannel_id);
    BasehttpGet(theUrl, Play_loadingDataTimeout, 1, null, Play_CheckHost, Play_loadDataCheckHostError, true);
}

function Play_loadDataCheckHostError() {
    Play_loadingDataTry++;
    if (Play_loadingDataTry < Play_loadingDataTryMax) {
        Play_loadingDataTimeout += 250;
        Play_loadDataCheckHost();
    } else Play_EndStart(false, 1);
}

function Play_CheckHost(responseText) {
    Play_TargetHost = JSON.parse(responseText).hosts[0];

    if (Play_TargetHost.target_login !== undefined) {
        Play_IsWarning = true;
        Play_showWarningDialog(Main_values.Play_selectedChannelDisplayname + STR_IS_NOW + STR_USER_HOSTING + Play_TargetHost.target_display_name);
        window.setTimeout(function() {
            Play_IsWarning = false;
        }, 4000);

        Play_EndSet(0);
        Main_values.Play_isHost = true;
    } else {
        Play_EndSet(1);
        Main_values.Play_isHost = false;
    }

    Play_PlayEndStart(1);
}

function Play_UpdateDuration(mwhocall, duration) { // jshint ignore:line
    if (duration > 0) {
        if (mwhocall === 2) PlayVod_UpdateDuration(duration);
        else if (mwhocall === 3) PlayClip_UpdateDuration(duration);
    }
}

function Play_setFallow() {
    Play_controls[Play_controlsFallow].setLable(AddCode_IsFallowing ? STR_FALLOWING : STR_FALLOW, AddCode_IsFallowing);
}

function Play_KeyReturn(is_vod) {
    if (Play_isEndDialogVisible() && !Play_ExitDialogVisible()) {
        Play_EndTextClear();
        Play_showExitDialog();
    } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
    else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
        if (is_vod) PlayVod_hidePanel();
        else Play_hidePanel();
    } else {
        if (Play_isVodDialogShown() && Play_ExitDialogVisible()) {
            Play_HideVodDialog();
            PlayVod_PreshutdownStream(false);
            Play_exitMain();
        } else if (Play_ExitDialogVisible()) {
            Play_CleanHideExit();
            Play_hideChat();
            if (is_vod) PlayVod_shutdownStream();
            else Play_shutdownStream();
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
                    Play_shutdownStream();
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
                if (UserLiveFeed_isFeedShow()) {
                    if (Play_FeedPos && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos--;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown()) {
                    Play_ChatPositions++;
                    Play_ChatPosition();
                    Play_controls[Play_controlsChatPos].defaultValue = Play_ChatPositions;
                    Play_controls[Play_controlsChatPos].setLable();
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(1, -1);
                    Play_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter--;
                    if (Play_Endcounter < (Main_values.Play_isHost ? 1 : 2)) Play_Endcounter = 3;
                    Play_EndIconsAddFocus();
                } else {
                    Play_showPanel();
                }
                break;
            case KEY_RIGHT:
                if (UserLiveFeed_isFeedShow()) {
                    if (Play_FeedPos < (UserLiveFeed_GetSize() - 1) && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos++;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible()) {
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
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(1, 1);
                    Play_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = (Main_values.Play_isHost ? 1 : 2);
                    Play_EndIconsAddFocus();
                } else {
                    Play_showPanel();
                }
                break;
            case KEY_UP:
                if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY--;
                        if (PlayVod_PanelY < 1) {
                            PlayVod_PanelY = 1;
                        } else PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(1, 1);
                    Play_setHidePanel();
                } else if (!UserLiveFeed_isFeedShow() && AddUser_UserIsSet()) UserLiveFeed_ShowFeed();
                else if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedRefreshFocus();
                break;
            case KEY_DOWN:
                if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(1, -1);
                    Play_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
                else if (Play_isFullScreen && Play_isChatShown()) {
                    Play_ChatSizeValue++;
                    if (Play_ChatSizeValue > 3) {
                        Play_ChatSizeValue = 0;
                        Play_ChatPositionConvert(false);
                    } else if (Play_ChatSizeValue === 3) Play_ChatPositionConvert(true);
                    Play_ChatSize(true);

                    Play_controls[Play_controlsChatSize].defaultValue = Play_ChatSizeValue;
                    Play_controls[Play_controlsChatSize].bottomArrows();
                    Play_controls[Play_controlsChatSize].setLable();
                } else if (Play_isEndDialogVisible()) Play_EndTextClear();
                else {
                    Play_showPanel();
                }
                break;
            case KEY_ENTER:
                if (Play_isEndDialogVisible()) Play_EndDialogPressed(1);
                else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 1) {
                        if (Main_values.Play_ChatForceDisable && Play_isNotplaying()) Play_loadChat();
                        if (!Play_isEndDialogVisible()) Play_KeyPause(1);
                    } else Play_BottomOptionsPressed(1);
                    Play_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) {
                    var doc = document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos);
                    if (doc === null) UserLiveFeed_ResetFeedId();
                    else if (Main_values.Play_selectedChannel !== JSON.parse(doc.getAttribute(Main_DataAttribute))[0]) {
                        Play_PreshutdownStream();
                        Main_values.Play_isHost = false;
                        Play_UserLiveFeedPressed = true;
                        Main_OpenLiveStream(Play_FeedPos, UserLiveFeed_ids, Play_handleKeyDown);
                    } else UserLiveFeed_ResetFeedId();
                } else Play_showPanel();
                break;
            case KEY_RETURN:
                Play_KeyReturn(false);
                break;
            case KEY_PLAY:
            case KEY_PAUSE:
            case KEY_PLAYPAUSE:
                if (!Play_isEndDialogVisible()) Play_KeyPause(1);
                break;
            default:
                break;
        }
    }
}

var Play_controls = {};
var Play_controlsSize = -1;

var Play_controlsSearch = 0;
var Play_controlsChanelCont = 1;
var Play_controlsGameCont = 2;
var Play_controlsOpenVod = 3;
var Play_controlsFallow = 4;
var Play_controlsSpeed = 5;
var Play_controlsQuality = 6;
var Play_controlsChat = 7;
var Play_controlsChatSide = 8;
var Play_controlsChatPos = 9;
var Play_controlsChatSize = 10;
var Play_controlsChatBright = 11;
var Play_controlsChatFont = 12;
var Play_controlsChatForceDis = 13;

function Play_MakeControls() {

    Play_controls[Play_controlsSearch] = { //Search
        icons: "search",
        string: STR_SEARCH,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function(PlayVodClip) {
            Play_ForceHidePannel();
            Play_OpenSearch(PlayVodClip);
            Play_ForceHidePannelReset();
        },
    };

    Play_controls[Play_controlsChanelCont] = { //channel content
        icons: "filmstrip",
        string: STR_CHANNEL_CONT,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function(PlayVodClip) {
            Play_ForceHidePannel();
            Play_OpenChannel(PlayVodClip);
            Play_ForceHidePannelReset();
        },
    };

    Play_controls[Play_controlsGameCont] = { //game content
        icons: "gamepad",
        string: STR_GAME_CONT,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function(PlayVodClip) {
            Play_ForceHidePannel();
            Play_OpenGame(PlayVodClip);
            Play_ForceHidePannelReset();
        },
    };

    Play_controls[Play_controlsOpenVod] = { //open vod
        icons: "movie-play",
        string: STR_OPEN_BROADCAST,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function() {
            Play_ForceHidePannel();
            PlayClip_OpenVod();
            Play_ForceHidePannelReset();
        },
    };


    Play_controls[Play_controlsFallow] = { //fallowing
        icons: "heart-o",
        string: STR_FALLOW,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function(PlayVodClip) {

            AddCode_Channel_id = (PlayVodClip === 1 ? Main_values.Play_selectedChannel_id : Main_values.Main_selectedChannel_id);
            Play_FallowUnfallow();

            Play_Resetpanel(PlayVodClip);
        },
        setLable: function(string, AddCode_IsFallowing) {
            Main_textContent('extra_button_text' + this.position, string);
            this.setIcon(AddCode_IsFallowing);
        },
        setIcon: function(AddCode_IsFallowing) {
            Main_innerHTML('controls_icon_' + this.position, '<i class="pause_button3d icon-' +
                (AddCode_IsFallowing ? "heart" : "heart-o") +
                '" style="color: #' + (AddCode_IsFallowing ? "00b300" : "FFFFFF") + ';" ></i>');
        },
    };

    Play_controls[Play_controlsSpeed] = { //speed
        icons: "speedometer",
        string: STR_SPEED,
        values: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
        defaultValue: 3,
        opacity: 0,
        enterKey: function() {
            Play_CurrentSpeed = this.defaultValue;
            try {
                Android.setPlaybackSpeed(this.values[this.defaultValue]);
            } catch (e) {}
        },
        updown: function(adder) {
            this.defaultValue += adder;
            if (this.defaultValue < 0)
                this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1))
                this.defaultValue = (this.values.length - 1);
            this.bottomArrows();
            this.setLable();
        },
        setLable: function() {
            Main_textContent('controls_name_' + this.position, this.values[this.defaultValue] +
                (this.values[this.defaultValue] === 1 ? 'x (' + STR_NORMAL + ')' : 'x'));
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };

    Play_controls[Play_controlsQuality] = { //quality
        icons: "videocamera",
        string: STR_QUALITY,
        values: ['1080p60 | Source | 10.00Mbps'],
        defaultValue: 0,
        opacity: 0,
        enterKey: function(PlayVodClip) {

            if (PlayVodClip === 1) {
                Play_qualityChanged();
                Play_hidePanel();
            } else if (PlayVodClip === 2) {
                PlayVod_PlayerCheckQualityChanged = false;
                PlayVod_qualityChanged();
                PlayVod_hidePanel();
            } else if (PlayVodClip === 3) {
                PlayClip_PlayerCheckQualityChanged = false;
                PlayClip_qualityChanged();
                PlayClip_hidePanel();
            }
            Play_clearPause();
        },
        updown: function(adder, PlayVodClip) {

            if (PlayVodClip === 1) {
                //TODO fix this reversed logic
                Play_qualityIndex += adder * -1;

                if (Play_qualityIndex > (Play_getQualitiesCount() - 1))
                    Play_qualityIndex = (Play_getQualitiesCount() - 1);
                else if (Play_qualityIndex < 0)
                    Play_qualityIndex = 0;

                Play_qualityDisplay();
            } else if (PlayVodClip === 2) {
                //TODO fix this reversed logic
                PlayVod_qualityIndex += adder * -1;

                if (PlayVod_qualityIndex > (PlayVod_getQualitiesCount() - 1))
                    PlayVod_qualityIndex = (PlayVod_getQualitiesCount() - 1);
                else if (PlayVod_qualityIndex < 0)
                    PlayVod_qualityIndex = 0;

                PlayVod_qualityDisplay();
            } else if (PlayVodClip === 3) {
                //TODO fix this reversed logic
                PlayClip_qualityIndex += adder * -1;

                if (PlayClip_qualityIndex > (PlayClip_getQualitiesCount() - 1))
                    PlayClip_qualityIndex = (PlayClip_getQualitiesCount() - 1);
                else if (PlayClip_qualityIndex < 0)
                    PlayClip_qualityIndex = 0;

                PlayClip_qualityDisplay();
            }

        },
    };

    Play_controls[Play_controlsChat] = { //chat enable disable
        icons: "chat",
        string: STR_CHAT,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function() {
            if (!Play_isFullScreen) return;
            if (!Play_isChatShown() && !Play_isEndDialogVisible()) {
                Play_showChat();
                Play_ChatEnable = true;
            } else {
                Play_hideChat();
                Play_ChatEnable = false;
            }
            Main_setItem('ChatEnable', Play_ChatEnable ? 'true' : 'false');
            this.setLable();
        },
        setLable: function() {
            var string = (Play_isChatShown() ? STR_YES : STR_NO);
            if (!Play_isFullScreen) string = STR_CHAT_SIDE;

            Main_textContent('extra_button_' + this.position, '(' + string + ')');
        },
    };

    Play_controls[Play_controlsChatSide] = { //chat side
        icons: Play_isFullScreen ? "resize-down" : "resize-up",
        string: STR_CHAT_VIDEO_MODE,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function() {
            Play_isFullScreen = !Play_isFullScreen;
            Play_SetFullScreen(Play_isFullScreen);

            this.setLable();
            this.setIcon();
        },
        setLable: function() {
            Main_textContent('extra_button_' + this.position, '(' + (Play_isFullScreen ? STR_CHAT_SIDE_FULL : STR_CHAT_SIDE) + ')');

            Play_controls[Play_controlsChat].setLable();
        },
        setIcon: function() {
            Main_innerHTML('controls_icon_' + this.position, '<i class="pause_button3d icon-' +
                (Play_isFullScreen ? "resize-down" : "resize-up") + '" ></i>');
        },
    };

    Play_controls[Play_controlsChatPos] = { //chat position
        icons: "chat-pos",
        string: STR_CHAT_POS,
        values: [1, 2, 3, 4, 5, 6, 7, 8],
        defaultValue: Play_ChatPositions,
        opacity: 0,
        isChat: true,
        updown: function(adder) {
            if (!Play_isChatShown() || !Play_isFullScreen) return;
            this.defaultValue += adder;
            if (this.defaultValue < 0)
                this.defaultValue = (this.values.length - 1);
            else if (this.defaultValue > (this.values.length - 1))
                this.defaultValue = 0;

            Play_ChatPositions += adder;

            Play_ChatPosition();

            this.defaultValue = Play_ChatPositions;

            this.setLable();
        },
        setLable: function() {
            Main_textContent('controls_name_' + this.position, this.values[this.defaultValue]);
        },
    };

    Play_controls[Play_controlsChatSize] = { //chat size
        icons: "chat-size",
        string: STR_CHAT_SIZE,
        values: ["12.5%", "25%", "50%", "100%"],
        defaultValue: Play_ChatSizeValue,
        opacity: 0,
        isChat: true,
        updown: function(adder) {
            if (!Play_isChatShown() || !Play_isFullScreen) return;
            this.defaultValue += adder;
            if (this.defaultValue < 0)
                this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) {
                this.defaultValue = (this.values.length - 1);
                return;
            }
            this.bottomArrows();
            Play_ChatSizeValue = this.defaultValue;

            if (Play_ChatSizeValue === 2 && adder === -1) {
                Play_ChatPositionConvert(false);
            } else if (Play_ChatSizeValue === 3) Play_ChatPositionConvert(true);

            Play_ChatSize(true);

            Play_controls[Play_controlsChatPos].defaultValue = Play_ChatPositions;
            this.setLable();
        },
        setLable: function() {
            Main_textContent('controls_name_' + (this.position - 1),
                Play_controls[Play_controlsChatPos].values[Play_controls[Play_controlsChatPos].defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };

    Play_controls[Play_controlsChatBright] = { //chat_brightness
        icons: "chat-brig",
        string: STR_CHAT_BRIGHTNESS,
        values: ["0%", "5%", "10%", "15%", "20%",
            "25%", "30%", "35%", "40%", "45%",
            "50%", "55%", "60%", "65%", "70%",
            "75%", "80%", "85%", "90%", "95%", "100%"
        ],
        defaultValue: Main_values.ChatBackground,
        opacity: 0,
        isChat: true,
        updown: function(adder) {
            if (!Play_isChatShown() || !Play_isFullScreen) return;
            this.defaultValue += adder;
            if (this.defaultValue < 0)
                this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);
            Main_values.ChatBackground = this.defaultValue;

            Play_ChatBackground = (this.defaultValue * 0.05).toFixed(2);
            Play_ChatBackgroundChange(false);

            this.setLable();
            this.bottomArrows();
            Main_SaveValues();
        },
        setLable: function() {
            Main_textContent('controls_name_' + this.position,
                this.values[this.defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };

    Play_controls[Play_controlsChatFont] = { //Chat font size
        icons: "chat-font",
        string: STR_CHAT_FONT,
        values: ["60%", "80%", "100%", "120%", "140%"],
        defaultValue: Main_values.Chat_font_size,
        opacity: 0,
        isChat: true,
        updown: function(adder) {
            if (!Play_isChatShown()) return;
            this.defaultValue += adder;
            if (this.defaultValue < 0)
                this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);
            Main_values.Chat_font_size = this.defaultValue;

            Play_SetChatFont();
            this.setLable();
            this.bottomArrows();
            Main_SaveValues();
        },
        setLable: function() {
            Main_textContent('controls_name_' + this.position,
                this.values[this.defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };

    Play_controls[Play_controlsChatForceDis] = { //force disable chat
        icons: "chat-stop",
        string: STR_F_DISABLE_CHAT,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function(PlayVodClip) {
            Main_values.Play_ChatForceDisable = !Main_values.Play_ChatForceDisable;

            if (PlayVodClip === 1) ChatLive_Init();
            else Chat_Init();

            this.setLable();
            Main_SaveValues();
        },
        setLable: function() {
            Main_textContent('extra_button_' + this.position, '(' +
                (!Main_values.Play_ChatForceDisable ? STR_YES : STR_NO) + ')');
        },
    };
}

function Play_IconsAddFocus() {
    Main_AddClass('controls_button_' + Play_Panelcounter, 'progress_bar_div_focus');
    document.getElementById('controls_button_text_' + Play_Panelcounter).style.opacity = "1";

    //TODO improve hardcoded 7
    if (Play_controls[Play_Panelcounter].isChat && (!Play_isChatShown() || !Play_isFullScreen))
        document.getElementById('controls_button_text_' + 7).style.opacity = "1";
    else if (Play_Panelcounter !== 7 && !Play_controls[Play_Panelcounter].isChat)
        document.getElementById('controls_button_text_' + 7).style.opacity = "0";
}

function Play_IconsRemoveFocus() {
    Main_RemoveClass('controls_button_' + Play_Panelcounter, 'progress_bar_div_focus');
    document.getElementById('controls_button_text_' + Play_Panelcounter).style.opacity = "0";
    //in case chat is disable and the warning is showing because some chat option was selected
    document.getElementById('controls_button_text_' + 7).style.opacity = "0";
}


function Play_ForceHidePannel() {
    var doc = document.getElementById("scene_channel_panel");
    doc.style.transition = 'none';
    doc.style.opacity = "0";
}

function Play_ForceHidePannelReset() {
    document.getElementById("scene_channel_panel").style.transition = '';
}

function Play_BottomOptionsPressed(PlayVodClip) {
    Main_ready(function() {
        if (Play_controls[Play_Panelcounter].enterKey) {
            Play_controls[Play_Panelcounter].enterKey(PlayVodClip);
        } else {
            Play_Resetpanel(PlayVodClip);
        }
    });
    Main_SaveValues();
}

function Play_Resetpanel(PlayVodClip) {
    Play_clearHidePanel();
    if (PlayVodClip === 1) Play_setHidePanel();
    else if (PlayVodClip === 2) PlayVod_setHidePanel();
    else if (PlayVodClip === 3) PlayClip_setHidePanel();
}

function Play_BottomUpDown(PlayVodClip, adder) {
    if (Play_controls[Play_Panelcounter].updown) {
        Play_controls[Play_Panelcounter].updown(adder, PlayVodClip);
    } else if (adder === 1) {
        PlayVod_PanelY--;
        PlayVod_IconsBottonFocus();
    }
}

function Play_BottomLeftRigt(PlayVodClip, adder) {
    Play_IconsRemoveFocus();
    Play_Panelcounter += adder;
    if (Play_Panelcounter > Play_controlsSize) Play_Panelcounter = 0;
    else if (Play_Panelcounter < 0) Play_Panelcounter = Play_controlsSize;

    if (document.getElementById('controls_' + Play_Panelcounter).style.display === 'none') {
        Play_BottomLeftRigt(PlayVodClip, adder);
        return;
    }

    Play_IconsAddFocus();
}

function Play_BottomArrows(position) {
    if (Play_controls[position].defaultValue === 1) {
        document.getElementById("control_arrow_up_" + position).style.opacity = "1";
        document.getElementById("control_arrow_down" + position).style.opacity = "1";
    } else if (!Play_controls[position].defaultValue) {
        document.getElementById("control_arrow_up_" + position).style.opacity = "1";
        document.getElementById("control_arrow_down" + position).style.opacity = "0.2";
    } else if (Play_controls[position].defaultValue === (Play_controls[position].values.length - 1)) {
        document.getElementById("control_arrow_up_" + position).style.opacity = "0.2";
        document.getElementById("control_arrow_down" + position).style.opacity = "1";
    } else {
        document.getElementById("control_arrow_up_" + position).style.opacity = "1";
        document.getElementById("control_arrow_down" + position).style.opacity = "1";
    }

    Main_textContent('controls_name_' + position, Play_controls[position].values[Play_controls[position].defaultValue]);
}

function Play_SetControls() {
    var div, doc = document.getElementById('controls_holder');
    for (var key in Play_controls) {
        div = document.createElement('div');
        div.classList.add('controls_button_holder');
        div.setAttribute('id', 'controls_' + key);

        div.innerHTML = '<div id="controls_button_' + key +
            '" class="controls_button"><div id="controls_icon_' + key +
            '"><i class="pause_button3d icon-' + Play_controls[key].icons +
            '" ></i></div></div><div id="controls_button_text_' + key +
            '" class="extra_button_text_holder" style="opacity: ' + Play_controls[key].opacity +
            ';"><div id="extra_button_text' + key + '" class="extra_button_text strokedextramini" >' +
            Play_controls[key].string + '</div><div id="extra_button_' + key +
            '" class="extra_button_text strokedextramini" >' +
            (Play_controls[key].values ? Play_SetControlsArrows(key) : STR_SPACE) + '</div></div></div>';

        doc.appendChild(div);
        Play_controlsSize++;
        Play_controls[key].position = key;
        if (Play_controls[key].bottomArrows) Play_BottomArrows(key);
        if (Play_controls[key].setLable) Play_controls[key].setLable();
    }
}

function Play_SetControlsArrows(key) {
    return '<div id="controls_arrows_' + key + '" style="font-size: 50%; display: inline-block; vertical-align: middle;"><div style="display: inline-block;"><div id="control_arrow_up_' + key + '" class="up"></div><div id="control_arrow_down' + key + '" class="down"></div></div></div>&nbsp;<div id="controls_name_' + key + '" class="arrows_text">' + Play_controls[key].values[Play_controls[key].defaultValue] + '</div>';
}

function Play_ResetSpeed() {
    Play_controls[Play_controlsSpeed].defaultValue = Play_CurrentSpeed;
    Play_controls[Play_controlsSpeed].bottomArrows();
    Play_controls[Play_controlsSpeed].setLable();
}