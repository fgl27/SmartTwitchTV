//Variable initialization
var Play_ChatPositions = 0;
var Play_ChatPositionConvertBefore = Play_ChatPositions;
var Play_PlayerPanelOffset = -5;
var Play_ChatBackground = 0.55;
var Play_ChatSizeValue = 3;
var Play_PanelHideID = null;
var Play_quality = "source";
var Play_qualityPlaying = Play_quality;
var Play_isFullScreen = true;
var Play_ChatPositionsBF;
var Play_ChatEnableBF;
var Play_ChatSizeValueBF;
var Play_isHost;
var Play_FeedOldUserName = '';
var Play_Feedid;
var Play_FeedPos = 0;

var Play_STATE_LOADING_TOKEN = 0;
var Play_STATE_LOADING_PLAYLIST = 1;
var Play_STATE_PLAYING = 2;
var Play_state = 0;

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

var Play_ResumeAfterOnlineCounter = 0;
var Play_ResumeAfterOnlineId;
var Play_isOn = false;
var Play_ChatBackgroundID = null;
var Play_qualitiesFound = false;
var Play_PlayerTime = 0;
var Play_streamCheck = null;
var Play_PlayerCheckCount = 0;
var Play_PlayerCheckCounter = 0;
var Play_PlayerCheckQualityChanged = false;
var Play_PlayerCheckRun = false;
var Play_Playing = false;
var Play_Panelcounter = 1;
var Play_IsWarning = false;
var Play_LoadLogoSucess = false;
var Play_loadingInfoDataTimeout = 10000;
var Play_loadingDataTimeout = 2000;
var Play_Lang = '';
var Play_Endcounter = 0;
var Play_EndTextCounter = 3;
var Play_EndTextID = null;
var Play_DialogEndText = '';
var Play_currentTime = 0;
var Play_startttime = 0;
var Play_startttimeoffset = 0;
var Play_offsettimeMinus = 0;
//var Play_4K_ModeEnable = false;
var Play_TargetHost = '';
var Play_isLive = true;
var Play_RestoreFromResume = false;
var Play_Chatobj;
var Play_ChatLoadOK = false;
var Play_CheckChatCounter = 0;
var Play_CheckChatId;
var Play_ChatLoadStarted = false;
var Play_PlayerCheckTimer = 4;
var Play_PlayerCheckInterval = 1500;
var Play_updateStreamInfoErrorTry = 0;
var Play_chat_container;
var Play_ChatFixPositionId;
var Play_IncrementView = '';
var Play_ProgresBarrElm;
var Play_DefaultjumpTimers = [];
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

var Play_ChatFont = 1;
var Play_ChatFontObj = ['chat_extra_small', 'chat_size_small', 'chat_size_default', 'chat_size_biger', 'chat_size_bigest'];
//Variable initialization end

function Play_PreStart() {
    Play_Chatobj = document.getElementById('chat_frame');
    Play_chat_container = document.getElementById("chat_container");
    Play_ProgresBarrElm = document.getElementById("inner_progress_bar");

    Play_ChatPositions = Main_getItemInt('ChatPositionsValue', 0);
    Play_ChatSizeValue = Main_getItemInt('ChatSizeValue', 3);
    Play_ChatEnable = Main_getItemBool('ChatEnable', false);
    Play_isFullScreen = Main_getItemBool('Play_isFullScreen', true);

    Play_ChatSize(false);
    Play_ChatBackgroundChange(false);
    Play_SetChatFont();
}

function Play_SetFullScreen(isfull) { // jshint ignore:line
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
        // Chat is 25% of the screen, resize to 75% and center left
        Play_ChatPositions = 0;
        Play_showChat();
        Play_ChatEnable = true;
        Play_ChatSizeValue = 4;
        Play_ChatPositionConvert(true);
        Play_ChatSize(false);
        if (Chat_div) Chat_div.scrollTop = Chat_div.scrollHeight;
    }
    Main_setItem('Play_isFullScreen', Play_isFullScreen);
}

function Play_SetChatFont() {
    Play_ChatFont = Settings_Obj_default("chat_font_size");

    for (var i = 0; i < Play_ChatFontObj.length; i++)
        Main_RemoveClass('chat_inner_container', Play_ChatFontObj[i]);

    Main_AddClass('chat_inner_container', Play_ChatFontObj[Play_ChatFont]);
}

function Play_Start() {
    Play_showBufferDialog();
    Main_innerHTML("stream_live_icon", '<div style="vertical-align: middle; display: inline-block"><i class="icon-circle" style="color: red; font-size: 105%; "></i></div><div style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_LIVE.toUpperCase() + '</div>');
    Main_empty('stream_info_title');
    Play_LoadLogoSucess = false;
    PlayClip_HasVOD = true;
    //reset channel logo to prevent another channel logo
    Play_LoadLogo(document.getElementById('stream_info_icon'), IMG_404_LOGO);
    if (Main_values.Play_isHost) Main_textContent("stream_info_name", Main_values.Play_DisplaynameHost);
    else Main_textContent("stream_info_name", Main_values.Play_selectedChannelDisplayname);

    Main_values.Play_WasPlaying = 1;
    Main_SaveValues();

    Play_isHost = Main_values.Play_isHost;
    Main_values.Play_isHost = false;
    Play_RestoreFromResume = false;
    Main_ShowElement('scene_channel_panel_bottom');

    Play_offsettimeMinus = 0;
    Main_textContent("stream_watching_time", STR_WATCHING + Play_timeS(0));
    Play_created = Play_timeMs(0);
    Main_textContent("stream_live_time", STR_SINCE + Play_created + STR_AGO);
    Main_HideElement('chat_box');
    Main_ShowElement('chat_frame');
    Main_HideElement('progress_pause_holder');

    Play_EndSet(1);
    Play_PlayerPanelOffset = -5;
    Play_updateStreamInfoErrorTry = 0;
    Play_PlayerCheckCounter = 0;
    Play_PlayerCheckRun = false;
    Play_ChatLoadOK = false;
    Play_currentTime = 0;
    Play_startttime = Date.now();
    Play_startttimeoffset = 0;
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
    Play_streamInfoTimer = window.setInterval(Play_updateStreamInfo, 60000);
}

function Play_Warn(text) { // jshint ignore:line
    Play_showWarningDialog(text);
}

function Play_CheckResume() { // jshint ignore:line
    if (Play_isOn) Play_Resume();
    if (PlayVod_isOn) PlayVod_Resume();
    if (PlayClip_isOn) {
        PlayClip_shutdownStream();
        window.clearInterval(PlayClip_streamCheck);
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
            Play_Chatobj.src = 'about:blank';
            window.clearInterval(Play_streamInfoTimer);
            Play_startttimeoffset = Date.now();
        }
    } else {
        Play_isOn = true;
        Play_clearPause();
        if (Play_isOn) {
            Play_loadingInfoDataTry = 0;
            Play_loadingInfoDataTimeout = 3000;
            Play_RestoreFromResume = true;
            Play_startttimeoffset = Date.now() - Play_startttimeoffset;
            if (!Play_LoadLogoSucess) Play_updateStreamInfoStart();
            else Play_updateStreamInfo();
            Play_state = Play_STATE_LOADING_TOKEN;
            Play_ResumeAfterOnlineCounter = 0;
            if (navigator.onLine) Play_loadData();
            else Play_ResumeAfterOnlineId = window.setInterval(Play_ResumeAfterOnline, 100);
            Play_streamInfoTimer = window.setInterval(Play_updateStreamInfo, 60000);
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

    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = Play_loadingInfoDataTimeout;
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                Play_updateStreamInfoStartValues(JSON.parse(xmlHttp.responseText));
            } else { // internet error
                Play_updateStreamInfoStartError();
            }
        }
    };
    xmlHttp.send(null);
}

function Play_updateStreamInfoStartValues(response) {
    if (response.stream !== null) {
        if (Play_isHost) Main_textContent("stream_info_name", Main_values.Play_DisplaynameHost);
        else Main_textContent("stream_info_name", Main_values.Play_selectedChannelDisplayname);

        Main_values.Play_selectedChannel_id = response.stream.channel._id;
        Main_innerHTML("stream_info_title", twemoji.parse(response.stream.channel.status));
        Main_values.Play_gameSelected = response.stream.game;
        Play_Lang = ', [' + (response.stream.channel.language).toUpperCase() + ']';
        Main_textContent("stream_info_game", STR_PLAYING + Main_values.Play_gameSelected + STR_FOR +
            Main_addCommas(response.stream.viewers) + ' ' + STR_VIEWER + Play_Lang);
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
    Play_loadingDataTimeout = 3000;
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                Play_updateStreamInfoErrorTry = 0;
                Play_updateStreamInfoValues(JSON.parse(xmlHttp.responseText));
            } else Play_updateStreamInfoError();
        }
    };
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = Play_loadingDataTimeout;
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.send(null);
}

function Play_updateStreamInfoValues(response) {
    if (response.stream !== null) {
        Main_innerHTML("stream_info_title", twemoji.parse(response.stream.channel.status));
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
    var theUrl;

    if (Play_state === Play_STATE_LOADING_TOKEN) {
        theUrl = 'https://api.twitch.tv/api/channels/' + Main_values.Play_selectedChannel + '/access_token' +
            (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token ? '?oauth_token=' +
                AddUser_UsernameArray[Main_values.Users_Position].access_token : '');
    } else {
        theUrl = 'http://usher.ttvnw.net/api/channel/hls/' + Main_values.Play_selectedChannel +
            '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
            '&allow_source=true&allow_audi_only=true&fast_bread=true&allow_spectre=false';
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
            if (Play_isOn) Play_loadDataSuccess(xmlHttp.responseText);
        } else if (xmlHttp.status === 403) { //forbidden access
            Play_ForbiddenLive();
        } else if (xmlHttp.status === 404) { //off line
            Play_CheckHostStart();
        } else {
            Play_loadDataError();
        }

    } else {
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", proxyurl + theUrl, true);
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
                    Play_ForbiddenLive();
                } else if (xmlHttp.status === 404) { //off line
                    Play_loadDataErrorLog(xmlHttp);
                    Play_CheckHostStart();
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
    if (!Main_isReleased) {
        console.log(xmlHttp.status);
        console.log(xmlHttp.responseText);
    }
}

function Play_loadDataError() {
    if (Play_isOn && Play_isLive) {
        Play_loadingDataTry++;
        if (Play_loadingDataTry < (Play_loadingDataTryMax + (Play_RestoreFromResume ? 15 : 0))) {
            Play_loadingDataTimeout += 250;
            if (Play_RestoreFromResume) window.setTimeout(Play_loadDataRequest, 500);
            else Play_loadDataRequest();
        } else Play_CheckHostStart();
    }
}

function Play_ForbiddenLive() {
    Play_HideBufferDialog();
    Play_showWarningDialog(STR_FORBIDDEN);
    window.setTimeout(function() {
        if (Play_isOn) Play_CheckHostStart();
    }, 4000);
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

    Play_qualityPlaying = Play_quality;
    Play_state = Play_STATE_PLAYING;
    if (!Main_isReleased) console.log('Play_onPlayer:', '\n' + '\n"' + Play_playingUrl + '"\n');
    if (Main_Android && Play_isOn) Android.startVideo(Play_playingUrl, 1);
    Play_onPlayer();
}

function Play_onPlayer() {
    window.clearTimeout(Play_CheckChatId);
    Play_ChatLoadStarted = false;
    if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
    Play_Playing = true;
    Play_loadChat();

    if (Main_Android) {
        Play_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = 3;
        Play_PlayerCheckQualityChanged = false;
        window.clearInterval(Play_streamCheck);
        Play_streamCheck = window.setInterval(Play_PlayerCheck, Play_PlayerCheckInterval);
    }
}

function Play_loadChat() {
    if (!Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }
    Play_ChatLoadStarted = true;
    window.clearInterval(Play_ChatFixPositionId);

    //Clear the iframe doc to prevent false true from Play_CheckChat "indexOf('Connected') !== -1"
    var doc = Play_Chatobj.contentDocument;
    try {
        if (doc !== undefined && doc.body !== null) {
            doc.open();
            doc.write("");
            doc.close();
        }
    } catch (e) {}

    window.clearTimeout(Play_CheckChatId);
    Play_CheckChatCounter = 0;
    Play_ChatLoadOK = false;
    Play_Chatobj.src = 'https://www.nightdev.com/hosted/obschat/?theme=bttv_blackchat&channel=' + Main_values.Play_selectedChannel + '&fade=false&bot_activity=true&prevent_clipping=false';
    Play_CheckChatId = window.setTimeout(Play_CheckChat, 5000);
}

function Play_CheckChat() {
    var doc = Play_Chatobj.contentDocument;
    var skipothers = false;
    try {
        if (doc !== undefined && doc.body !== null)
            Play_ChatLoadOK = doc.body.innerHTML.indexOf('Connected') !== -1; //when connected OK a "Connected" is see in the chat
        skipothers = Play_ChatLoadOK;
    } catch (e) {
        Play_ChatLoadOK = true;
    }

    if (!Play_ChatLoadOK) {
        if (Play_ChatLoadStarted && Play_CheckChatCounter < 7) {
            Play_CheckChatCounter++;
            Play_CheckChatId = window.setTimeout(Play_CheckChat, 1000);
        } else Play_loadChat();
    } else if (skipothers) {
        Play_ChatFixPositionId = window.setInterval(Play_ChatFixPosition, 500);
        doc = doc.getElementById('chat_box');
        if (doc) doc.style.fontFamily = "'Helvetica Neue',Helvetica, Arial,sans-serif,Sans,Jomolhari,dejavu-sans, CambriaMath, CODE2000 , BabelStoneHan";
    }
}

function Play_PlayerCheck() {
    if (Main_Android) Play_currentTime = Android.gettime();
    if (Play_isOn && Play_PlayerTime === Play_currentTime && !Play_isNotplaying()) {
        Play_PlayerCheckCount++;
        if (Play_PlayerCheckCount > Play_PlayerCheckTimer) {

            //Don't change the first time only retry
            if (Play_PlayerCheckQualityChanged && Play_PlayerCheckRun && (Play_qualityIndex < Play_getQualitiesCount() - 1)) Play_qualityIndex++;
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
    Play_PannelEndStart(PlayVodClip);
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
        Main_values.Play_WasPlaying = 0;
        Play_exitMain();
    }
}

function Play_PreshutdownStream() {
    if (Main_Android) Android.stopVideo(1);
    Play_isOn = false;
    Play_HideFeed();
    Chat_Clear();
    Play_ClearPlayer();
    Play_ClearPlay();
    window.clearInterval(Play_ChatFixPositionId);
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
    if (Main_Android) Android.mshowLoading(true);
}

function Play_HideBufferDialog() {
    if (Main_Android) Android.mshowLoading(false);
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
    Play_clearHidePanel();
    document.getElementById("scene_channel_panel").style.opacity = "0";
    Play_quality = Play_qualityPlaying;
    window.clearInterval(PlayVod_RefreshProgressBarrID);
}

function Play_showPanel() {
    Play_IconsResetFocus();
    Play_qualityIndexReset();
    Play_qualityDisplay();
    Play_RefreshWatchingtime();
    PlayVod_RefreshProgressBarrID = window.setInterval(Play_RefreshWatchingtime, 1000);
    Play_clock();
    Play_CleanHideExit();
    document.getElementById("scene_channel_panel").style.opacity = "1";
    Play_setHidePanel();
}

function Play_RefreshWatchingtime() {
    Main_textContent("stream_watching_time", STR_WATCHING + Play_timeMs(Date.now() - Play_startttimeoffset - Play_startttime));
    Main_textContent("stream_live_time", STR_SINCE + Play_streamLiveAt(Play_created) + STR_AGO);
}

function Play_clearHidePanel() {
    window.clearTimeout(Play_PanelHideID);
    PlayVod_ProgressBaroffset = 0;
}

function Play_setHidePanel() {
    Play_PanelHideID = window.setTimeout(Play_hidePanel, 5000);
}

// chat_box is a inner element from the chat_frame iframe, when changing it size it's content may be off screen
// This also help with a bug when the emote is slow to load and loads after the scrollTop function from the iframe
// with causes the line to be half off screen, in that case the interval will fix it
function Play_ChatFixPosition() {
    var doc = Play_Chatobj.contentDocument;
    try {
        if (doc !== undefined && doc.body !== null) {
            doc = doc.getElementById('chat_box');
            if (doc) doc.scrollTop = doc.scrollHeight;
        }
    } catch (e) {}
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
    if (Play_getQualitiesCount() === 1) {
        document.getElementById("quality_arrow_up").style.opacity = "0";
        document.getElementById("quality_arrow_down").style.opacity = "0";
    } else if (!Play_qualityIndex) {
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

    if (showDialog) Play_showChatBackgroundDialog(STR_SIZE + Play_ChatSizeVal[Play_ChatSizeValue - 1].percentage);

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
    var bool = (Play_ChatSizeValue === 4);

    if (Play_ChatPositions < 0) Play_ChatPositions = (bool ? 2 : 7);
    else if (Play_ChatPositions > (bool ? 2 : 7)) Play_ChatPositions = 0;

    Play_chat_container.style.top = (bool ? 0.2 : (Play_ChatPositionVal[Play_ChatPositions].top + Play_ChatPositionVal[Play_ChatPositions].sizeOffset[Play_ChatSizeValue - 1])) + '%';

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
        if (Main_Android) Android.play(true);
        Main_innerHTML('pause_button', '<i class="strokedbig icon-pause" style="color: #FFFFFF; font-size: 180%;"></i>');
        if (PlayVodClip === 1) {
            if (Play_isPanelShown()) Play_hidePanel();
            Play_streamCheck = window.setInterval(Play_PlayerCheck, Play_PlayerCheckInterval);
        } else if (PlayVodClip === 2) {
            if (Play_isPanelShown()) PlayVod_hidePanel();
            PlayVod_streamCheck = window.setInterval(PlayVod_PlayerCheck, Play_PlayerCheckInterval);
        } else if (PlayVodClip === 3) {
            if (Play_isPanelShown()) PlayClip_hidePanel();
            PlayClip_streamCheck = window.setInterval(PlayClip_PlayerCheck, Play_PlayerCheckInterval);
        }
    } else {
        if (PlayVodClip === 1) window.clearInterval(Play_streamCheck);
        else if (PlayVodClip === 2) window.clearInterval(PlayVod_streamCheck);
        else if (PlayVodClip === 3) window.clearInterval(PlayClip_streamCheck);

        Main_innerHTML('pause_button', '<i class="strokedbig icon-play-1" style="color: #FFFFFF; font-size: 180%;"></i>');

        if (Main_Android) Android.play(false);
        Play_showPauseDialog();
    }
}

function Play_IconsResetFocus() {
    Play_IconsRemoveFocus();
    Play_Panelcounter = 1;
    Play_IconsAddFocus();
}

function Play_IconsAddFocus() {
    Main_AddClass('scene2_pannel_' + Play_Panelcounter, 'playbotton_focus');
}

function Play_IconsRemoveFocus() {
    Main_RemoveClass('scene2_pannel_' + Play_Panelcounter, 'playbotton_focus');
}

function Play_PrepareshowEndDialog() {
    Play_state = -1;
    PlayVod_state = -1;
    PlayClip_state = -1;
    Play_hideChat();
    Play_hidePanel();
    PlayClip_hidePanel();
    PlayVod_hidePanel();
    if (!Play_IsWarning) Play_HideWarningDialog();
    Play_HideBufferDialog();
    Play_CleanHideExit();
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

function Play_isFeedShow() {
    return Main_isElementShowing('user_feed');
}

function Play_ShowFeed() {
    var hasuser = AddUser_UserIsSet();
    if (hasuser) {
        if (Play_FeedOldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) UserLiveFeed_status = false;
        Play_FeedOldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
    } else UserLiveFeed_status = false;
    if (!UserLiveFeed_status && !UserLiveFeed_loadingData) UserLiveFeed_StartLoad();
    if (hasuser) {
        Main_ShowElement('user_feed');
        Play_Feedid = window.setTimeout(Play_HideFeed, 5000);
    }
}

function Play_HideFeed() {
    Main_HideElement('user_feed');
    window.clearTimeout(Play_Feedid);
}

function Play_ResetFeedId() {
    window.clearTimeout(Play_Feedid);
    Play_Feedid = window.setTimeout(Play_HideFeed, 5000);
}

function Play_FeedRefreshFocus() {
    window.clearTimeout(Play_Feedid);
    if (!UserLiveFeed_loadingData) UserLiveFeed_StartLoad();
}

function Play_FeedAddFocus() {
    Play_ResetFeedId();
    Main_AddClass(UserLiveFeed_ids[0] + Play_FeedPos, 'feed_thumbnail_focused');

    var position = 0;

    if (Play_FeedPos < 3) position = 3;
    else if (Play_ThumbNull((Play_FeedPos + 2), UserLiveFeed_ids[0]))
        position = (document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos).offsetLeft * -1) + (screen.width * 0.4);

    if (position) document.getElementById('user_feed_scroll').style.left = position + "px";
}

function Play_ThumbNull(y, thumbnail) {
    return document.getElementById(thumbnail + y, 0) !== null;
}

function Play_FeedRemoveFocus() {
    Main_RemoveClass(UserLiveFeed_ids[0] + Play_FeedPos, 'feed_thumbnail_focused');
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
    Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR + STR_STREAM_END +
        Play_EndTextCounter + '...');
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
            else if (PlayVodClip === 3) PlayClip_shutdownStream();

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
    if (!Play_Endcounter) {
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
        } else PlayClip_OpenVod();
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
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'inline-block';
        Main_textContent("dialog_end_vod_text", STR_OPEN_HOST);
    } else if (PlayVodClip === 1) { // play
        Play_EndIconsRemoveFocus();
        Play_Endcounter = 2;
        Play_EndIconsAddFocus();
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'none';
    } else if (PlayVodClip === 2) { // vod
        Play_EndIconsResetFocus();
        document.getElementById('dialog_end_0').style.display = 'inline-block';
        document.getElementById('dialog_end_1').style.display = 'none';
    } else if (PlayVodClip === 3) { // clip
        Play_EndIconsResetFocus();
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

function Play_OpenSearch(PlayVodClip) {
    if (!Main_values.Search_isSearching) Main_values.Main_BeforeSearch = Main_values.Main_Go;
    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_Search;

    if (PlayVodClip === 1) {
        Play_hideChat();
        Play_shutdownStream();
    } else if (PlayVodClip === 2) PlayVod_shutdownStream();
    else if (PlayVodClip === 3) PlayClip_shutdownStream();
}

function Play_OpenGame(PlayVodClip) {
    if (Main_values.Play_gameSelected === '') {
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
    AGame_UserGames = false;

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

function Play_BottomOptionsPressed(PlayVodClip) {
    if (!Play_Panelcounter) PlayClip_OpenVod();
    else if (Play_Panelcounter === 1) {
        if (PlayVodClip === 1) {
            Play_qualityChanged();
            Play_hidePanel();
        } else if (PlayVodClip === 2) {
            //if (!PlayVod_offsettime) PlayVod_offsettime = Play_videojs.currentTime();
            PlayVod_PlayerCheckQualityChanged = false;
            PlayVod_qualityChanged();
            PlayVod_hidePanel();
        } else if (PlayVodClip === 3) {
            //if (!PlayClip_offsettime) PlayClip_offsettime = Play_videojs.currentTime();
            PlayClip_PlayerCheckQualityChanged = false;
            PlayClip_qualityChanged();
            PlayClip_hidePanel();
        }
        Play_clearPause();
    } else if (Play_Panelcounter === 2) {

        AddCode_Channel_id = (PlayVodClip === 1 ? Main_values.Play_selectedChannel_id : Main_values.Main_selectedChannel_id);
        Play_FallowUnfallow();

        Play_clearHidePanel();
        if (PlayVodClip === 1) Play_setHidePanel();
        else if (PlayVodClip === 2) PlayVod_setHidePanel();
        else if (PlayVodClip === 3) PlayClip_setHidePanel();
    } else if (Play_Panelcounter === 3) Play_OpenGame(PlayVodClip);
    else if (Play_Panelcounter === 4) Play_OpenChannel(PlayVodClip);
    else if (Play_Panelcounter === 5) Play_OpenSearch(PlayVodClip);
}

function Play_PannelEndStart(PlayVodClip) {
    window.clearInterval(Play_streamCheck);
    window.clearInterval(PlayClip_streamCheck);
    window.clearInterval(PlayVod_streamCheck);

    Play_PrepareshowEndDialog();
    Play_EndTextCounter = 3;
    Play_EndText(PlayVodClip);
    Play_showEndDialog(PlayVodClip);
}

function Play_CheckHostStart() {
    Play_state = -1;
    Play_loadingDataTry = 0;
    Play_loadingDataTimeout = 2000;
    window.clearTimeout(Play_CheckChatId);
    Play_Chatobj.src = 'about:blank';
    window.clearInterval(Play_streamInfoTimer);
    window.clearInterval(Play_streamCheck);
    if (Main_values.Play_selectedChannel_id !== '') Play_loadDataCheckHost();
    else Play_CheckId();
}

function Play_CheckId() {
    var theUrl = 'https://api.twitch.tv/kraken/users?login=' + Main_values.Play_selectedChannel;
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = Play_loadingDataTimeout;
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                Play_CheckIdValue(JSON.parse(xmlHttp.responseText).users[0]);
                return;
            } else {
                Play_CheckIdError();
            }
        }
    };

    xmlHttp.send(null);
}

function Play_CheckIdValue(users) {
    if (users !== undefined) {
        Main_values.Play_selectedChannel_id = users._id;
        Play_loadingDataTry = 0;
        Play_loadingDataTimeout = 2000;
        Play_loadDataCheckHost();
    } else Play_PannelEndStart(1);
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
    var xmlHttp;
    if (Main_Android) {

        xmlHttp = Android.mreadUrl(theUrl, Play_loadingDataTimeout, 1, null);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            Play_loadDataCheckHostError();
            return;
        }

        if (xmlHttp.status === 200) {
            Play_CheckHost(xmlHttp.responseText);
        } else {
            Play_loadDataCheckHostError();
        }

    } else {
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", proxyurl + theUrl, true);
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
    }
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

    Play_PannelEndStart(1);
}

function Play_setFallow() {
    if (AddCode_IsFallowing) {
        Main_innerHTML("fallow_heart", '<i class="icon-heart strokicon" style="color: #00b300; font-size: 210%;"></i>');
        Main_innerHTML("fallow_text", STR_SPACE + STR_FALLOWING);
    } else {
        Main_innerHTML("fallow_heart", '<i class="icon-heart-o strokicon" style="color: #FFFFFF; font-size: 210%;"></i>');
        Main_innerHTML("fallow_text", STR_SPACE + STR_FALLOW);
    }
}

function Play_KeyReturn(is_vod) {
    if (Play_isEndDialogVisible() && !Play_ExitDialogVisible()) {
        Play_EndTextClear();
        Play_showExitDialog();
    } else if (Play_isFeedShow()) Play_HideFeed();
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
                if (Play_isFeedShow()) {
                    if (Play_FeedPos) {
                        Play_FeedRemoveFocus();
                        Play_FeedPos--;
                        Play_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown()) {
                    Play_ChatPositions++;
                    Play_ChatPosition();
                } else if (Play_isPanelShown()) {
                    Play_IconsRemoveFocus();
                    Play_Panelcounter++;
                    if (Play_Panelcounter > 5) Play_Panelcounter = 1;
                    Play_IconsAddFocus();
                    Play_clearHidePanel();
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
                if (Play_isFeedShow()) {
                    if (Play_FeedPos < (UserLiveFeed_itemsCount - 1)) {
                        Play_FeedRemoveFocus();
                        Play_FeedPos++;
                        Play_FeedAddFocus();
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
                    Play_IconsRemoveFocus();
                    Play_Panelcounter--;
                    if (Play_Panelcounter < 1) Play_Panelcounter = 5;
                    Play_IconsAddFocus();
                    Play_clearHidePanel();
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
                    if (Play_qualityIndex > 0 && Play_Panelcounter === 1) {
                        Play_qualityIndex--;
                        Play_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    Play_setHidePanel();
                } else if (!Play_isFeedShow() && AddUser_UserIsSet()) Play_ShowFeed();
                else if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (Play_isFeedShow()) Play_FeedRefreshFocus();
                break;
            case KEY_DOWN:
                if (Play_isPanelShown()) {
                    if (Play_qualityIndex < Play_getQualitiesCount() - 1 && Play_Panelcounter === 1) {
                        Play_qualityIndex++;
                        Play_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    Play_setHidePanel();
                } else if (Play_isFeedShow()) Play_HideFeed();
                else if (Play_isFullScreen && Play_isChatShown()) {
                    //Play_ChatBackground += 0.05;
                    //if (Play_ChatBackground > 1.05) Play_ChatBackground = 0.05;
                    //Play_ChatBackgroundChange(true);
                    Play_ChatSizeValue++;
                    if (Play_ChatSizeValue > 4) {
                        Play_ChatSizeValue = 1;
                        Play_ChatPositionConvert(false);
                    } else if (Play_ChatSizeValue === 4) Play_ChatPositionConvert(true);
                    Play_ChatSize(true);
                } else if (Play_isEndDialogVisible()) Play_EndTextClear();
                else {
                    Play_showPanel();
                }
                break;
            case KEY_ENTER:
                if (Play_isEndDialogVisible()) Play_EndDialogPressed(1);
                else if (Play_isPanelShown()) Play_BottomOptionsPressed(1);
                else if (Play_isFeedShow()) {
                    Play_PreshutdownStream();
                    Main_OpenLiveStream(Play_FeedPos, UserLiveFeed_ids, Play_handleKeyDown);
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