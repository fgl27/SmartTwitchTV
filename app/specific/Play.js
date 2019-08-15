//Variable initialization
var Play_ChatPositions = 0;
var Play_ChatPositionConvertBefore = Play_ChatPositions;
var Play_PlayerPanelOffset = -5;
var Play_ChatBackground = 0.55;
var Play_ChatSizeValue = 2;
var Play_MaxChatSizeValue = 4;
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
var Play_PicturePicturePos = 4;
var Play_PicturePictureSize = 3;
var Play_controlsAudioPos = 1;
var Play_STATE_LOADING_TOKEN = 0;
var Play_STATE_LOADING_PLAYLIST = 1;
var Play_STATE_PLAYING = 2;
var Play_state = 0;
var Play_Status_Always_On = false;
var Play_RefreshAutoTry = 0;

var Play_streamInfoTimerId = null;
var Play_tokenResponse = 0;
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
var Play_Playing = false;
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
var Play_ChatDelayPosition = 0;
//var Play_4K_ModeEnable = false;
var Play_TargetHost = '';
var Play_isLive = true;
var Play_RestoreFromResume = false;
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
    "sizeOffset": [31, 16, 0, -25.2, 0] // top - sizeOffset is the defaul top for it chat position
}, {
    "top": 33, // Middle/right 1
    "left": 75.1,
    "sizeOffset": [12.5, 0, -6.25, -19.5, 0]
}, {
    "top": 0.2, // Top/right 2
    "left": 75.1,
    "sizeOffset": [0, 0, 0, 0, 0]
}, {
    "top": 0.2, // Top/center 3
    "left": 38.3,
    "sizeOffset": [0, 0, 0, 0, 0]
}, {
    "top": 0.2, // Top/left 4
    "left": 0.2,
    "sizeOffset": [0, 0, 0, 0, 0]
}, {
    "top": 33, // Middle/left 5
    "left": 0.2,
    "sizeOffset": [12.5, 0, -6.25, -19.5, 0]
}, {
    "top": 51.8, // Bottom/left 6
    "left": 0.2,
    "sizeOffset": [31, 16, 0, -25.2, 0]
}, {
    "top": 51.8, // Bottom/center 7
    "left": 38.3,
    "sizeOffset": [31, 16, 0, -25.2, 0]
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
    "containerHeight": 73, // 75%
    "percentage": '75%',
    "dialogTop": 75
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
    Play_ChatDelayPosition = Main_getItemInt('Play_ChatDelayPosition', 0);
    Play_PicturePicturePos = Main_getItemInt('Play_PicturePicturePos', 4);
    Play_PicturePictureSize = Main_getItemInt('Play_PicturePictureSize', 3);
    Play_controlsAudioPos = Main_getItemInt('Play_controlsAudioPos', 1);

    try {
        Android.mSetPlayerPosition(Play_PicturePicturePos);
        Android.mSetPlayerSize(Play_PicturePictureSize);
    } catch (e) {}

    Play_SetQuality();

    Play_ChatSize(false);
    Play_ChatBackgroundChange(false);
    Play_SetChatFont();
    Play_SetAudioIcon();
}

function Play_SetQuality() {
    Play_quality = Settings_Obj_values('default_quality').replace(STR_SOURCE, "source");
    Play_qualityPlaying = Play_quality;

    PlayVod_quality = Play_quality;
    PlayVod_qualityPlaying = Play_quality;
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
        Play_ChatSizeValue = Play_MaxChatSizeValue;
        Play_ChatPositionConvert(true);
        Play_ChatSize(false);
        if (Chat_div[0]) Chat_div[0].scrollTop = Chat_div[0].scrollHeight;
    }

    if (PlayExtra_PicturePicture) {
        if (Main_IsNotBrowser) Android.mupdatesizePP(!Play_isFullScreen);
        if (!Play_isFullScreen) {
            ChatLive_Init(1);
            PlayExtra_ShowChat();
        } else {
            ChatLive_Clear(1);
            PlayExtra_HideChat();
        }
    } else if (Main_IsNotBrowser) Android.mupdatesize(!Play_isFullScreen);

    Main_setItem('Play_isFullScreen', Play_isFullScreen);
}

function Play_SetChatFont() {
    for (var i = 0; i < Play_ChatFontObj.length; i++) {
        Main_RemoveClass('chat_inner_container', Play_ChatFontObj[i]);
        Main_RemoveClass('chat_inner_container2', Play_ChatFontObj[i]);
    }

    Main_AddClass('chat_inner_container', Play_ChatFontObj[Main_values.Chat_font_size]);
    Main_AddClass('chat_inner_container2', Play_ChatFontObj[Main_values.Chat_font_size]);
}

function Play_Start() {
    if (Play_isFullScreen) Play_showBufferDialog();

    Main_empty('stream_info_title');
    Play_LoadLogoSucess = false;
    PlayClip_HasVOD = true;
    //reset channel logo to prevent another channel logo
    Play_LoadLogo(document.getElementById('stream_info_icon'), IMG_404_LOGO_TEMP);

    //past broadcast
    document.getElementById('controls_' + Play_controlsOpenVod).style.display = 'none';
    //Chat delay
    document.getElementById('controls_' + Play_controlsChatDelay).style.display = '';
    if (!PlayExtra_PicturePicture) PlayExtra_UnSetPanel();
    Play_CurrentSpeed = 3;
    UserLiveFeed_SetFeedPicText();
    Play_RefreshAutoTry = 0;

    Play_ShowPanelStatus(1);

    Play_IconsResetFocus();

    PlayClip_HideShowNext(0, 0);
    PlayClip_HideShowNext(1, 0);

    Main_values.Play_WasPlaying = 1;
    Main_SaveValues();

    Play_isHost = Main_values.Play_isHost;
    Main_values.Play_isHost = false;
    Play_RestoreFromResume = false;
    Main_ShowElement('controls_holder');

    Play_currentTime = 0;
    Play_watching_time = new Date().getTime();
    Main_innerHTML("stream_watching_time", STR_SPACE + "|" + STR_SPACE + STR_WATCHING + Play_timeS(0));
    Main_textContent('chat_container_name_text', Main_values.Play_selectedChannelDisplayname);
    Play_created = Play_timeMs(0);

    Main_textContent("stream_live_time", Play_created);
    Main_HideElement('progress_bar_div');

    Play_UserLiveFeedPressed = false;
    Play_EndSet(1);
    Play_PlayerPanelOffset = -5;
    Play_updateStreamInfoErrorTry = 0;
    Play_loadingInfoDataTry = 0;
    Play_loadingInfoDataTimeout = 3000;
    Play_isLive = true;
    Play_tokenResponse = 0;
    Play_playingTry = 0;
    Play_isOn = true;
    Play_Playing = false;
    Play_state = Play_STATE_LOADING_TOKEN;
    document.addEventListener('visibilitychange', Play_Resume, false);
    Play_updateStreamInfoStart();
    Play_loadData();
    document.body.removeEventListener("keyup", Main_handleKeyUp);
    Play_streamInfoTimerId = window.setInterval(Play_updateStreamInfo, 300000);
}

function Play_Warn(text) { // jshint ignore:line
    Play_showWarningDialog(text);
}

function Play_CheckResume() { // jshint ignore:line
    if (Play_isOn) Play_Resume();
    else if (PlayVod_isOn) PlayVod_Resume();
    else if (PlayClip_isOn) PlayClip_shutdownStream();
}

function Play_CheckResumeForced(isPicturePicture) { // jshint ignore:line
    Play_RefreshAutoTry = 0;
    PlayExtra_RefreshAutoTry = 0;

    if (isPicturePicture) PlayExtra_RefreshAutoRequest(true);
    else Play_RefreshAutoRequest(true);
}

function Play_RefreshAutoRequest(UseAndroid) {
    var theUrl = 'https://api.twitch.tv/api/channels/' + Main_values.Play_selectedChannel + '/access_token?platform=_' +
        (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token ? '&oauth_token=' +
            AddUser_UsernameArray[Main_values.Users_Position].access_token : '');

    var xmlHttp;
    if (UseAndroid) {

        xmlHttp = Android.mreadUrl(theUrl, 3000, 1, null);

        if (xmlHttp) Play_RefreshAutoRequestSucess(JSON.parse(xmlHttp), UseAndroid);
        else Play_RefreshAutoError(UseAndroid);

    } else {
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = 3000;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) Play_RefreshAutoRequestSucess(xmlHttp, UseAndroid);
        };

        xmlHttp.send(null);
    }
}

function Play_RefreshAutoRequestSucess(xmlHttp, UseAndroid) {
    if (xmlHttp.status === 200) {
        Play_RefreshAutoTry = 0;
        Play_tokenResponse = JSON.parse(xmlHttp.responseText);

        var theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + Main_values.Play_selectedChannel +
            '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
            '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true' +
            (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();

        if (UseAndroid) {
            try {
                Android.ResStartAuto(theUrl, 1, 0);
            } catch (e) {}
        } else Android.SetAuto(theUrl);

    } else Play_RefreshAutoError(UseAndroid);
}

function Play_RefreshAutoError(UseAndroid) {
    if (Play_isOn) {
        Play_RefreshAutoTry++;
        if (Play_RefreshAutoTry < 5) Play_RefreshAutoRequest(UseAndroid);
        else if (UseAndroid) Play_CheckHostStart();
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
            ChatLive_Clear(0);
            ChatLive_Clear(1);
            window.clearInterval(Play_streamInfoTimerId);
        }
    } else {
        Play_watching_time = new Date().getTime();
        Play_isOn = true;
        Play_clearPause();
        if (Play_isOn) {
            Play_showBufferDialog();
            Play_loadingInfoDataTry = 0;
            Play_RefreshAutoTry = 0;
            Play_loadingInfoDataTimeout = 3000;
            Play_RestoreFromResume = true;
            if (!Play_LoadLogoSucess) Play_updateStreamInfoStart();
            else Play_updateStreamInfo();
            Play_ResumeAfterOnlineCounter = 0;
            if (navigator.onLine) Play_ResumeAfterOnline();
            else Play_ResumeAfterOnlineId = window.setInterval(Play_ResumeAfterOnline, 100);
            Play_streamInfoTimerId = window.setInterval(Play_updateStreamInfo, 300000);
            window.clearInterval(Play_ShowPanelStatusId);

            Play_ShowPanelStatusId = window.setInterval(function() {
                Play_UpdateStatus(1);
            }, 1000);
        }
    }
}

function Play_ResumeAfterOnline(forced) {
    if (forced || navigator.onLine || Play_ResumeAfterOnlineCounter > 200) {
        window.clearInterval(Play_ResumeAfterOnlineId);
        Play_state = Play_STATE_LOADING_TOKEN;
        Play_loadData();
        if (PlayExtra_PicturePicture) PlayExtra_Resume();
    }
    Play_ResumeAfterOnlineCounter++;
}

function Play_updateStreamInfoStart() {
    var theUrl = 'https://api.twitch.tv/kraken/streams/' + Main_values.Play_selectedChannel_id;
    BasexmlHttpGet(theUrl, Play_loadingInfoDataTimeout, 2, null, Play_updateStreamInfoStartValues, Play_updateStreamInfoStartError, false);
}

function Play_partnerIcon(name, partner, islive, lang) {
    var div = '<div class="partnericon_div"> ' + name + STR_SPACE + STR_SPACE + '</div>' +
        (partner ? ('<img class="partnericon_img" alt="" src="' +
            IMG_PARTNER + '">') : "");

    if (islive) {
        div += STR_SPACE + STR_SPACE + '<div class="partnericon_text" style="background: #' +
            (Main_values.IsRerun ? 'FFFFFF; color: #000000;' : 'E21212;') + '">' +
            STR_SPACE + STR_SPACE + (Main_values.IsRerun ? STR_NOT_LIVE : STR_LIVE) + STR_SPACE + STR_SPACE + '</div>';
    }

    div += '<div class="lang_text" ">' + STR_SPACE + STR_SPACE + lang + '</div>';

    Main_innerHTML("stream_info_name", div);
}

function Play_updateStreamInfoStartValues(response) {
    response = JSON.parse(response);
    if (response.stream !== null) {
        Main_values.IsRerun = Main_is_rerun(response.stream.stream_type);

        Main_innerHTML("stream_info_title", twemoji.parse(response.stream.channel.status, false, true));
        Main_values.Play_gameSelected = response.stream.game;
        Play_Lang = ' [' + (response.stream.channel.broadcaster_language).toUpperCase() + ']';

        Play_partnerIcon(Play_isHost ? Main_values.Play_DisplaynameHost : Main_values.Play_selectedChannelDisplayname, response.stream.channel.partner, true, Play_Lang);

        var playing = (Main_values.Play_gameSelected !== "" ? STR_PLAYING + Main_values.Play_gameSelected : "");
        Main_textContent("stream_info_game", playing);

        Main_innerHTML("stream_live_viewers", STR_SPACE + STR_FOR + Main_addCommas(response.stream.viewers) + ' ' + STR_VIEWER);
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
    Play_RefreshAutoTry = 0;
    Play_RefreshAutoRequest(false);

    if (PlayExtra_PicturePicture) {
        PlayExtra_RefreshAutoTry = 0;
        PlayExtra_RefreshAutoRequest(false);
    }

    var theUrl = 'https://api.twitch.tv/kraken/streams/' + Main_values.Play_selectedChannel_id;
    BasexmlHttpGet(theUrl, 3000, 2, null, Play_updateStreamInfoValues, Play_updateStreamInfoError, false);
}

function Play_updateStreamInfoValues(response) {
    response = JSON.parse(response);
    if (response.stream !== null) {
        Main_innerHTML("stream_info_title", twemoji.parse(response.stream.channel.status, false, true));
        Main_values.Play_gameSelected = response.stream.game;
        Main_textContent("stream_info_game", STR_PLAYING + Main_values.Play_gameSelected);

        Main_innerHTML("stream_live_viewers", STR_SPACE + STR_FOR + Main_addCommas(response.stream.viewers) +
            ' ' + STR_VIEWER);

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
            '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true' +
            (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();
    }

    var xmlHttp;
    if (Main_IsNotBrowser) {

        xmlHttp = Android.mreadUrl(theUrl, Play_loadingDataTimeout, 1, null);
        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            Play_loadDataError();
            return;
        }
        if (xmlHttp.status === 200) {
            Play_loadingDataTry = 0;
            if (Play_isOn) {
                if (!state) Android.SetAuto(theUrl);
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
                    if (Main_IsNotBrowser) Play_ForbiddenLive();
                    else Play_loadDataSuccessFake();
                } else if (xmlHttp.status === 404) { //off line
                    Play_loadDataErrorLog(xmlHttp);
                    if (Main_IsNotBrowser) Play_CheckHostStart();
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
            if (Main_IsNotBrowser) Play_CheckHostStart();
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
            'url': 'https://auto'
        },
        {
            'id': '1080p60 | source ',
            'band': '| 10.00Mbps',
            'codec': ' | avc',
            'url': 'https://souce'
        },
        {
            'id': '720p60',
            'band': ' | 5.00Mbps',
            'codec': ' | avc',
            'url': 'https://720p60'
        },
        {
            'id': '720p',
            'band': ' | 2.50Mbps',
            'codec': ' | avc',
            'url': 'https://720'
        },
        {
            'id': '480p',
            'band': ' | 2.50Mbps',
            'codec': ' | avc',
            'url': 'https://480'
        },
        {
            'id': '320p',
            'band': ' | 2.50Mbps',
            'codec': ' | avc',
            'url': 'https://320'
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
        Play_qualities = Play_extractQualities(responseText);
        Play_state = Play_STATE_PLAYING;
        if (Play_isOn) Play_qualityChanged();
    }
}

function Play_extractQualities(input) {
    var Band,
        codec,
        result = [],
        TempId = '',
        tempCount = 1;

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
                'url': 'Auto_url'
            });
            if (TempId.indexOf('ource') === -1) TempId = TempId + ' | source';
            else TempId = TempId.replace('(', ' | ').replace(')', '');
            result.push({
                'id': TempId,
                'band': Band,
                'codec': codec,
                'url': streams[i].split("\n")[2]
            });
        } else if (result[i - tempCount].id !== TempId && result[i - tempCount].id !== TempId + ' | source') {
            result.push({
                'id': TempId,
                'band': Band,
                'codec': codec,
                'url': streams[i].split("\n")[2]
            });
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
    Play_qualityIndex = 1;
    Play_playingUrl = Play_qualities[1].url;

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

    Play_quality = Play_qualities[Play_qualityIndex].id;
    Play_qualityPlaying = Play_quality;

    Play_SetHtmlQuality('stream_quality');

    Play_state = Play_STATE_PLAYING;
    Play_onPlayer();
}

function Play_onPlayer() {
    if (Main_isDebug) console.log('Play_onPlayer:', '\n' + '\n"' + Play_playingUrl + '"\n');

    if (Main_IsNotBrowser && Play_isOn) {
        if (Play_quality.indexOf("Auto") !== -1 || PlayExtra_PicturePicture) Android.StartAuto(1, 0);
        else Android.startVideo(Play_playingUrl, 1);
    }

    if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
    Play_SetFullScreen(Play_isFullScreen);
    Play_Playing = true;
    Play_loadChat();
}

function Play_SetHtmlQuality(element) {
    if (!Play_qualities[Play_qualityIndex] || !Play_qualities[Play_qualityIndex].hasOwnProperty('id')) return;

    Play_quality = Play_qualities[Play_qualityIndex].id;

    var quality_string = '';

    if (Play_quality.indexOf('source') !== -1) quality_string = Play_quality.replace("source", STR_SOURCE);
    else quality_string = Play_quality;

    quality_string += Play_quality.indexOf('Auto') === -1 ? Play_qualities[Play_qualityIndex].band + Play_qualities[Play_qualityIndex].codec : "";

    Main_innerHTML(element, quality_string);
}

function Play_loadChat() {
    if (Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }

    ChatLive_Init(0);
}

//called by android PlayerActivity
function Play_PlayerCheck(mwhocall) { // jshint ignore:line
    if (mwhocall === 1) {

        if (navigator.onLine && (Play_qualityIndex < Play_getQualitiesCount() - 1)) {
            Play_qualityIndex++;
            Play_qualityDisplay();
            Play_qualityChanged();
        } else Play_EndStart(false, 1);

    } else if (mwhocall === 2) {

        if (navigator.onLine && (PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1)) {
            PlayVod_qualityIndex++;
            Main_values.vodOffset = Android.getsavedtime() / 1000;
            PlayVod_qualityDisplay();
            PlayVod_qualityChanged();
        } else Play_EndStart(false, 2);

    } else if (mwhocall === 3) {

        if (navigator.onLine && (PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1)) {
            PlayClip_qualityIndex++;
            PlayClip_qualityDisplay();
            PlayClip_qualityChanged();
        } else Play_EndStart(false, 3);

    }
}

function Play_EndStart(hosting, PlayVodClip) {
    Main_values.Play_isHost = hosting;
    Play_EndSet(PlayVodClip);
    Play_PlayEndStart(PlayVodClip);
}

function Play_isNotplaying() {
    if (Main_IsNotBrowser) return !Android.getPlaybackState();
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
        Main_values.Play_WasPlaying = 0;
        Play_exitMain();
    }
}

function Play_PreshutdownStream() {
    if (Main_IsNotBrowser) {
        //we are updating the main player via live feed
        try {
            if (PlayExtra_PicturePicture) Android.mClearBigPlayer();
            else {
                //We are closing the player on error or on end
                Android.mClearSmallPlayer();
                Android.stopVideo(1);
                Chat_Clear();
                Play_ClearPlay();
            }
        } catch (e) {}
    }

    Play_isOn = false;
    UserLiveFeed_Hide();
    Play_ClearPlayer();

    Main_values.Play_selectedChannel_id = '';
}

function Play_exitMain() {
    PlayVod_ProgresBarrUpdate(0, 0);
    Main_ShowElement('scene1');
    Main_HideElement('scene2');
    Main_ReStartScreens();
}

function Play_ClearPlayer() {
    window.clearInterval(Play_ShowPanelStatusId);
    Play_hidePanel();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_HideEndDialog();
    Play_IncrementView = '';

    if (Play_qualityIndex === (Play_getQualitiesCount() - 1)) {
        Play_quality = Play_qualities[1].id;
        Play_qualityPlaying = Play_quality;
    }
    if (PlayVod_qualityIndex === (PlayVod_getQualitiesCount() - 1)) {
        PlayVod_quality = PlayVod_qualities[1].id;
        PlayVod_qualityPlaying = PlayVod_quality;
    }
    if (PlayClip_qualityIndex === (PlayClip_getQualitiesCount() - 1)) {
        PlayClip_quality = PlayClip_qualities[0].id;
        PlayClip_qualityPlaying = PlayClip_quality;
    }

}

function Play_ClearPlay() {
    Play_Playing = false;
    document.body.removeEventListener("keydown", Play_handleKeyDown);
    document.removeEventListener('visibilitychange', Play_Resume);
    ChatLive_Clear(0);
    window.clearInterval(Play_streamInfoTimerId);
    Play_IsWarning = false;
}

function Play_hideFallow() {
    Play_controls[Play_controlsFallow].setLable(STR_NOKEY);
    AddCode_IsFallowing = false;
}

function Play_showBufferDialog() {
    if (Main_IsNotBrowser) Android.mshowLoading(true);
    else Main_ShowElement('dialog_loading_play');
}

function Play_HideBufferDialog() {
    if (Main_IsNotBrowser) Android.mshowLoading(false);
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
}

function Play_isPanelShown() {
    return document.getElementById("scene_channel_panel").style.opacity === '1';
}

function Play_hidePanel() {
    //return;//return;
    Play_clearHidePanel();
    Play_ForceHidePannel();
    Play_quality = Play_qualityPlaying;
    window.clearInterval(PlayVod_RefreshProgressBarrID);
}

function Play_ForceShowPannel() {
    document.getElementById("scene_channel_panel").style.opacity = "1";
    if (!Play_Status_Always_On) Main_ShowElement('playsideinfo');
    else Main_RemoveClass('playsideinfo', 'playsideinfofocus');
}

function Play_ForceHidePannel() {
    document.getElementById("scene_channel_panel").style.opacity = "0";
    if (!Play_Status_Always_On) Main_HideElement('playsideinfo');
    else Main_AddClass('playsideinfo', 'playsideinfofocus');
}

var Play_ShowPanelStatusId;

function Play_ShowPanelStatus(mwhocall) {
    if (Play_Status_Always_On) {

        window.clearInterval(Play_ShowPanelStatusId);

        Play_ShowPanelStatusId = window.setInterval(function() {
            Play_UpdateStatus(mwhocall);
        }, 1000);

        Main_ShowElement('playsideinfo');
        Main_AddClass('playsideinfo', 'playsideinfofocus');
    } else {
        Main_HideElement('playsideinfo');
        Main_RemoveClass('playsideinfo', 'playsideinfofocus');
        window.clearInterval(Play_ShowPanelStatusId);
    }
}
//tdo cleac 
function Play_UpdateStatus(mwhocall) {
    if (Main_IsNotBrowser) {
        var value = null;

        if (mwhocall === 1) {

            if (Play_qualityPlaying.indexOf("Auto") === -1) Play_SetHtmlQuality('stream_quality');
            else {
                value = Android.getVideoQuality();
                if (value !== null && value !== undefined) Play_getVideoQuality(value);
            }

        } else if (mwhocall === 2) {

            if (PlayVod_qualityPlaying.indexOf("Auto") === -1) PlayVod_SetHtmlQuality('stream_quality');
            else {
                value = Android.getVideoQuality();
                if (value !== null && value !== undefined) Play_getVideoQuality(value);
            }

        }

        try {
            Play_Status(Android.getVideoStatus());
        } catch (e) {}
    } else Play_StatusFake();
}

function Play_showPanel() {
    PlayVod_IconsBottonResetFocus();
    Play_qualityIndexReset();
    Play_qualityDisplay();
    PlayExtra_ResetSpeed();
    PlayExtra_ResetAudio();
    if (Play_qualityPlaying.indexOf("Auto") === -1) Play_SetHtmlQuality('stream_quality');
    Play_RefreshWatchingtime();
    window.clearInterval(PlayVod_RefreshProgressBarrID);
    PlayVod_RefreshProgressBarrID = window.setInterval(Play_RefreshWatchingtime, 1000);
    Play_clock();
    Play_CleanHideExit();
    Play_ForceShowPannel();
    Play_clearHidePanel();
    Play_setHidePanel();
}

function Play_RefreshWatchingtime() {
    Main_innerHTML("stream_watching_time", STR_SPACE + "|" + STR_SPACE +
        STR_WATCHING + Play_timeMs((new Date().getTime()) - (Play_watching_time)));

    Main_innerHTML("stream_live_time", STR_SINCE +
        (Play_created.indexOf('00:00') === -1 ? Play_streamLiveAt(Play_created) : '00:00'));

    if (!Play_Status_Always_On) {
        if (Play_qualityPlaying.indexOf("Auto") !== -1 && Main_IsNotBrowser) {
            var value = Android.getVideoQuality();

            if (value !== null && value !== undefined) Play_getVideoQuality(value);
            else Play_SetHtmlQuality('stream_quality');
        }

        if (Main_IsNotBrowser) {
            try {
                Play_Status(Android.getVideoStatus());
            } catch (e) {}
        } else Play_StatusFake();
    }
}

function Play_StatusFake() {
    Main_innerHTML("stream_status", "Net Speed:&nbsp;&nbsp;&nbsp;90.00 (90.00 Avg) Mbps" + STR_BR +
        "Net Activity: 20.00 (20.00 Avg) Mb" + STR_BR + "Drooped frames: 100 (100 Today)" + STR_BR +
        " Buffer health: 22.22 s");
}

function Play_Status(value) {
    value = value.split(',');

    Main_innerHTML("stream_status", "Net Speed:" + STR_SPACE + STR_SPACE + STR_SPACE + Play_getMbps(value[2]) +
        " (" + value[3] + " Avg) Mbps" + STR_BR + "Net Activity: " + Play_getMbps(value[4]) + " (" +
        value[5] + " Avg) Mb" + STR_BR + "Drooped frames: " + value[0] + " (" + value[1] + " Today)" +
        STR_BR + " Buffer health: " + Play_getBuffer(value[6]));
}

function Play_getMbps(value) {
    value = (parseInt(value) / 1000000).toFixed(2);

    return (parseInt(value) < 10 ? (STR_SPACE + STR_SPACE + value) : value);
}

function Play_getBuffer(value) {
    value = (value > 0 ? (value / 1000).toFixed(2) : 0);

    return (parseInt(value) < 10 ? (STR_SPACE + value) : value) + " s";
}

function Play_getVideoQuality(value) {
    value = value.split(',');

    for (var i = 0; i < value.length; i++) {
        value[i] = (value[i] !== null && value[i] !== 'null' && value[i] !== undefined) ? value[i] : '';
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
    if (Play_ChatSizeValue > Play_MaxChatSizeValue) Play_ChatSizeValue = Play_MaxChatSizeValue;
    Play_chat_container.style.height = Play_ChatSizeVal[Play_ChatSizeValue].containerHeight + '%';
    document.getElementById("play_chat_dialog").style.marginTop = Play_ChatSizeVal[Play_ChatSizeValue].dialogTop + '%';
    Play_ChatPosition();
    ChatLive_ChatFixPosition(0);

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
    var bool = (Play_ChatSizeValue === Play_MaxChatSizeValue);

    if (Play_ChatPositions < 0) Play_ChatPositions = (bool ? 2 : 7);
    else if (Play_ChatPositions > (bool ? 2 : 7)) Play_ChatPositions = 0;

    Play_chat_container.style.top = (bool ? 0.2 : (Play_ChatPositionVal[Play_ChatPositions].top + Play_ChatPositionVal[Play_ChatPositions].sizeOffset[Play_ChatSizeValue])) + '%';

    Play_chat_container.style.left =
        Play_ChatPositionVal[Play_ChatPositions + (bool ? 2 : 0)].left + '%';

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
        Play_HideBufferDialog();

        Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i> </div>');

        if (Play_isPanelShown()) {
            if (PlayVodClip === 1) Play_hidePanel();
            else if (PlayVodClip === 2) PlayVod_hidePanel();
            else if (PlayVodClip === 3) PlayClip_hidePanel();
        }

        if (Main_IsNotBrowser) {
            Android.play(true);
        }
    } else {
        Play_HideBufferDialog();

        Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-play-1"></i> </div>');

        if (Main_IsNotBrowser) Android.play(false);
    }
}

function Play_IconsResetFocus() {
    Play_IconsRemoveFocus();
    Play_Panelcounter = Play_controlsDefault;
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

            if (PlayVodClip === 1) {
                PlayExtra_PicturePicture = false;
                PlayExtra_selectedChannel = '';
                Play_shutdownStream();
            } else if (PlayVodClip === 2) PlayVod_shutdownStream();
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
                PlayClip_qualityChanged();
                Play_clearPause();
                if (PlayClip_HasVOD) {
                    PlayVod_currentTime = 0;
                    Chat_offset = ChannelVod_vodOffset;
                    Chat_Init(0);
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
        PlayExtra_PicturePicture = false;
        PlayExtra_selectedChannel = '';
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
    if (PlayVodClip === 1) {
        PlayExtra_PicturePicture = false;
        PlayExtra_selectedChannel = '';
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
    if (PlayVodClip === 1) {
        PlayExtra_PicturePicture = false;
        PlayExtra_selectedChannel = '';
        Play_shutdownStream();
    } else if (PlayVodClip === 2) PlayVod_shutdownStream();
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

function Play_qualityDisplay() {
    if (Play_getQualitiesCount() === 1) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "0";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "0";
    } else if (!Play_qualityIndex) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "0.2";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "1";
    } else if (Play_qualityIndex === Play_getQualitiesCount() - 1) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "1";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "0.2";
    } else {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "1";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "1";
    }

    Play_SetHtmlQuality('controls_name_' + Play_controlsQuality);
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
        PlayExtra_PicturePicture = false;
        PlayExtra_selectedChannel = '';
        Play_CheckHostStart();
    } else {
        Play_PlayEndStart(PlayVodClip);
    }
}

function Play_PlayEndStart(PlayVodClip) {
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
    ChatLive_Clear(0);
    ChatLive_Clear(1);
    window.clearInterval(Play_streamInfoTimerId);
    Play_loadDataCheckHost();
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
            if (PlayExtra_PicturePicture) {
                if (Main_IsNotBrowser) {
                    try {
                        Android.mClearSmallPlayer();
                        if (!Play_isFullScreen) {
                            Play_isFullScreen = !Play_isFullScreen;
                            Play_SetFullScreen(Play_isFullScreen);
                        }
                    } catch (e) {}
                }
                PlayExtra_PicturePicture = false;
                PlayExtra_selectedChannel = '';
                PlayExtra_UnSetPanel();
                Play_CleanHideExit();
            } else {
                Play_CleanHideExit();
                Play_hideChat();
                if (is_vod) PlayVod_shutdownStream();
                else Play_shutdownStream();
            }
        } else if (Play_WarningDialogVisible()) {
            Play_HideWarningDialog();
            Play_showExitDialog();
        } else {
            Main_textContent("play_dialog_exit_text", PlayExtra_PicturePicture ? STR_EXIT_AGAIN_PICTURE : STR_EXIT_AGAIN);
            Play_showExitDialog();
        }
    }
}

function Play_handleKeyUp(e) {
    if (e.keyCode === KEY_ENTER) {
        Play_handleKeyUpClear();
        if (!PlayExtra_clear) {
            var doc = document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos);
            if (doc === null) UserLiveFeed_ResetFeedId();
            else {
                var selectedChannel = JSON.parse(doc.getAttribute(Main_DataAttribute))[0];
                if (Main_values.Play_selectedChannel !== selectedChannel &&
                    PlayExtra_selectedChannel !== selectedChannel) {
                    Play_PreshutdownStream();
                    Main_values.Play_isHost = false;
                    Play_UserLiveFeedPressed = true;
                    Main_OpenLiveStream(Play_FeedPos, UserLiveFeed_ids, Play_handleKeyDown);
                } else UserLiveFeed_ResetFeedId();
            }
        }
    }
}

function Play_handleKeyUpClear() {
    window.clearTimeout(PlayExtra_KeyEnterID);
    document.body.removeEventListener("keyup", Play_handleKeyUp);
    document.body.addEventListener("keydown", Play_handleKeyDown, false);
}

function Play_handleKeyDown(e) {
    if (Play_state !== Play_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_RETURN:
                if (Play_ExitDialogVisible()) {
                    Play_CleanHideExit();
                    Play_hideChat();
                    PlayExtra_PicturePicture = false;
                    PlayExtra_selectedChannel = '';
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
                } else if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown() &&
                    !PlayExtra_PicturePicture) {
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
                } else if (PlayExtra_PicturePicture && Play_isFullScreen) {
                    Play_PicturePicturePos++;
                    if (Play_PicturePicturePos > 7) Play_PicturePicturePos = 0;

                    try {
                        Android.mSwitchPlayerPosition(Play_PicturePicturePos);
                    } catch (e) {}
                    Main_setItem('Play_PicturePicturePos', Play_PicturePicturePos);
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
                } else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible() &&
                    !PlayExtra_PicturePicture) {
                    Play_controls[Play_controlsChat].enterKey(1);
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
                } else if (PlayExtra_PicturePicture && Play_isFullScreen) {
                    Play_PicturePictureSize++;
                    if (Play_PicturePictureSize > 4) Play_PicturePictureSize = 2;
                    try {
                        Android.mSwitchPlayerSize(Play_PicturePictureSize);
                    } catch (e) {}
                    Main_setItem('Play_PicturePictureSize', Play_PicturePictureSize);
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
                else if (Play_isFullScreen && Play_isChatShown() && !PlayExtra_PicturePicture) {
                    Play_ChatSizeValue++;
                    if (Play_ChatSizeValue > Play_MaxChatSizeValue) {
                        Play_ChatSizeValue = 0;
                        Play_ChatPositionConvert(false);
                    } else if (Play_ChatSizeValue === Play_MaxChatSizeValue) Play_ChatPositionConvert(true);

                    Play_ChatSize(true);

                    Play_controls[Play_controlsChatSize].defaultValue = Play_ChatSizeValue;
                    Play_controls[Play_controlsChatSize].bottomArrows();
                    Play_controls[Play_controlsChatSize].setLable();
                } else if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (PlayExtra_PicturePicture) {
                    if (Play_isFullScreen) {
                        try {
                            if (Main_IsNotBrowser) Android.mSwitchPlayer();
                        } catch (e) {}
                        PlayExtra_SwitchPlayer();
                    } else {
                        Play_controls[Play_controlsAudio].defaultValue++;

                        if (Play_controls[Play_controlsAudio].defaultValue > (Play_controls[Play_controlsAudio].values.length - 1)) Play_controls[Play_controlsAudio].defaultValue = 0;

                        Play_controls[Play_controlsAudio].enterKey();
                    }
                } else Play_showPanel();
                break;
            case KEY_ENTER:
                if (Play_isEndDialogVisible()) Play_EndDialogPressed(1);
                else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 1) {
                        if (!Play_isEndDialogVisible()) Play_KeyPause(1);
                    } else Play_BottomOptionsPressed(1);
                    Play_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) {
                    document.body.removeEventListener("keydown", Play_handleKeyDown, false);
                    document.body.addEventListener("keyup", Play_handleKeyUp, false);
                    PlayExtra_clear = false;
                    UserLiveFeed_ResetFeedId();
                    PlayExtra_KeyEnterID = window.setTimeout(PlayExtra_KeyEnter, 1000);
                } else Play_showPanel();
                break;
            case KEY_RETURN:
                Play_KeyReturn(false);
                break;
            case KEY_PLAY:
                if (!Play_isEndDialogVisible() && Play_isNotplaying()) Play_KeyPause(1);
                break;
            case KEY_PAUSE:
                if (!Play_isEndDialogVisible() && !Play_isNotplaying()) Play_KeyPause(1);
                break;
            case KEY_PLAYPAUSE:
                if (!Play_isEndDialogVisible()) Play_KeyPause(1);
                break;
            case KEY_REFRESH:
                Play_controls[Play_controlsChat].enterKey(1);
                break;
            case KEY_PG_UP:
                Play_Panelcounter = Play_controlsChatPos;
                Play_BottomUpDown(1, 1);
                Play_Panelcounter = Play_controlsDefault;
                break;
            case KEY_PG_DOWN:
                Play_Panelcounter = Play_controlsChatPos;
                Play_BottomUpDown(1, -1);
                Play_Panelcounter = Play_controlsDefault;
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
var Play_controlsQualityMini = 7;
var Play_controlsAudio = 8;
var Play_controlsChat = 9;
var Play_controlsChatSide = 10;
var Play_controlsChatForceDis = 11;
var Play_controlsChatPos = 12;
var Play_controlsChatSize = 13;
var Play_controlsChatBright = 14;
var Play_controlsChatFont = 15;
var Play_controlsChatDelay = 16;

var Play_controlsDefault = Play_controlsChat;
var Play_Panelcounter = Play_controlsDefault;

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
            Android.setPlaybackSpeed(this.values[this.defaultValue]);
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
        values: ['1080p60 | Source | 10.00Mbps | avc'],
        defaultValue: 0,
        opacity: 0,
        enterKey: function(PlayVodClip) {

            if (PlayVodClip === 1) {
                Play_hidePanel();
                Play_quality = Play_qualities[Play_qualityIndex].id;
                Play_qualityPlaying = Play_quality;
                Play_playingUrl = Play_qualities[Play_qualityIndex].url;
                Play_SetHtmlQuality('stream_quality');
                Play_onPlayer();
            } else if (PlayVodClip === 2) {
                PlayVod_hidePanel();
                PlayVod_quality = PlayVod_qualities[PlayVod_qualityIndex].id;
                PlayVod_qualityPlaying = PlayVod_quality;
                PlayVod_playingUrl = PlayVod_qualities[PlayVod_qualityIndex].url;
                PlayVod_SetHtmlQuality('stream_quality');
                PlayVod_onPlayer();
            } else if (PlayVodClip === 3) {
                PlayClip_hidePanel();
                PlayClip_quality = PlayClip_qualities[PlayClip_qualityIndex].id;
                PlayClip_qualityPlaying = PlayClip_quality;
                PlayClip_playingUrl = PlayClip_qualities[PlayClip_qualityIndex].url;
                PlayClip_SetHtmlQuality('stream_quality');
                PlayClip_onPlayer();
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

    Play_controls[Play_controlsQualityMini] = { //quality for picture in picture
        icons: "videocamera",
        string: STR_PLAYER_RESYNC,
        values: [STR_PLAYER_AUTO_SMALLS, STR_PLAYER_AUTO_BIG, STR_PLAYER_AUTO_ALL],
        defaultValue: 2,
        opacity: 0,
        enterKey: function() {

            try {
                if (this.defaultValue === 2) {
                    Android.StartAuto(1, 0);
                    Android.initializePlayer2Auto();
                } else if (this.defaultValue) Android.StartAuto(1, 0);
                else Android.initializePlayer2Auto();
            } catch (e) {}

            Play_hidePanel();
            this.defaultValue = 2;
            this.bottomArrows();
            this.setLable();
        },
        updown: function(adder) {

            this.defaultValue += adder;
            if (this.defaultValue < 0) this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);

            this.bottomArrows();
            this.setLable();
        },
        setLable: function() {
            Main_textContent('controls_name_' + this.position,
                Play_controls[this.position].values[Play_controls[this.position].defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },

    };

    Play_controls[Play_controlsAudio] = { //speed
        icons: "sound",
        string: STR_AUDIO_SOURCE,
        values: [STR_PLAYER_AUTO_SMALLS, STR_PLAYER_AUTO_BIG, STR_PLAYER_AUTO_ALL],
        defaultValue: Play_controlsAudioPos,
        opacity: 0,
        enterKey: function() {

            try {
                Android.mSwitchPlayerAudio(this.defaultValue);
            } catch (e) {}

            Play_hidePanel();
            Play_controlsAudioPos = this.defaultValue;

            Main_setItem('Play_controlsAudioPos', Play_controlsAudioPos);

            this.bottomArrows();
            this.setLable();
            Play_SetAudioIcon();
        },
        updown: function(adder) {

            this.defaultValue += adder;
            if (this.defaultValue < 0) this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);

            this.bottomArrows();
            this.setLable();
        },
        setLable: function() {
            Main_textContent('controls_name_' + this.position,
                Play_controls[this.position].values[Play_controls[this.position].defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
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
            if (!Play_isFullScreen) string = Play_isFullScreen ? STR_CHAT_SIDE : STR_CHAT_5050;

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
            var title = Play_isFullScreen ? STR_CHAT_SIDE_FULL : STR_CHAT_SIDE;
            if (PlayExtra_PicturePicture) title = Play_isFullScreen ? STR_CHAT_PP_SIDE_FULL : STR_CHAT_5050;

            Main_textContent('extra_button_' + this.position, '(' + title + ')');

            Play_controls[Play_controlsChat].setLable();
        },
        setIcon: function() {
            var icon = (Play_isFullScreen ? "resize-down" : "resize-up");
            if (PlayExtra_PicturePicture) icon = 'pp';

            Main_innerHTML('controls_icon_' + this.position, '<i class="pause_button3d icon-' +
                icon + '" ></i>');
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

            if (PlayVodClip === 1) {
                ChatLive_Init(0);
                if (PlayExtra_PicturePicture && !Play_isFullScreen) ChatLive_Init(1);
            } else Chat_Init(0);

            this.setLable();
            Main_SaveValues();
        },
        setLable: function() {
            Main_textContent('extra_button_' + this.position, '(' +
                (Main_values.Play_ChatForceDisable ? STR_YES : STR_NO) + ')');
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
        values: ["12.5%", "25%", "50%", "75%", "100%"],
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

            if (Play_ChatSizeValue === (Play_MaxChatSizeValue - 1) && adder === -1) {
                Play_ChatPositionConvert(false);
            } else if (Play_ChatSizeValue === Play_MaxChatSizeValue) Play_ChatPositionConvert(true);

            Play_ChatSize(true);

            Play_controls[Play_controlsChatPos].defaultValue = Play_ChatPositions;
            this.setLable();
        },
        setLable: function() {
            Main_textContent('controls_name_' + Play_controlsChatPos,
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

    Play_controls[Play_controlsChatDelay] = { //chat delay
        icons: "chat-delay",
        string: STR_CHAT_DELAY,
        values: [STR_DISABLE, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
            20, 25, 30, 45, 60, 90, 120, 150, 180, 240, 300
        ],
        defaultValue: Play_ChatDelayPosition,
        opacity: 0,
        isChat: false,
        updown: function(adder) {
            this.defaultValue += adder;

            if (this.defaultValue < 0)
                this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1))
                this.defaultValue = (this.values.length - 1);

            Play_ChatDelayPosition = this.defaultValue;

            Main_setItem('Play_ChatDelayPosition', Play_ChatDelayPosition);
            this.bottomArrows();
            this.setLable();
        },
        setLable: function() {
            var stringSec = '';

            if (this.defaultValue > 1) stringSec = STR_SECONDS;
            else if (this.defaultValue > 0) stringSec = STR_SECOND;

            Main_textContent('controls_name_' + this.position, this.values[this.defaultValue] + stringSec);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };
}

function Play_SetAudioIcon() {
    if (Play_controlsAudioPos === 2) {
        Main_innerHTML("chat_container_sound_icon", '<i class="icon-sound strokicon" ></i>');
        Main_innerHTML("chat_container2_sound_icon", '<i class="icon-sound strokicon" ></i>');
    } else if (Play_controlsAudioPos === 1) {
        Main_innerHTML("chat_container_sound_icon", '<i class="icon-sound strokicon" ></i>');
        Main_innerHTML("chat_container2_sound_icon", '<i class="icon-sound-off strokicon" ></i>');
    } else {
        Main_innerHTML("chat_container_sound_icon", '<i class="icon-sound-off strokicon" ></i>');
        Main_innerHTML("chat_container2_sound_icon", '<i class="icon-sound strokicon" ></i>');
    }
}

function Play_IconsAddFocus() {
    Main_AddClass('controls_button_' + Play_Panelcounter, 'progress_bar_div_focus');
    document.getElementById('controls_button_text_' + Play_Panelcounter).style.opacity = "1";

    if (Play_controls[Play_Panelcounter].isChat && (!Play_isChatShown() || !Play_isFullScreen))
        document.getElementById('controls_button_text_' + Play_controlsChat).style.opacity = "1";
    else if (Play_Panelcounter !== Play_controlsChat && !Play_controls[Play_Panelcounter].isChat)
        document.getElementById('controls_button_text_' + Play_controlsChat).style.opacity = "0";
}

function Play_IconsRemoveFocus() {
    Main_RemoveClass('controls_button_' + Play_Panelcounter, 'progress_bar_div_focus');
    document.getElementById('controls_button_text_' + Play_Panelcounter).style.opacity = "0";
    //in case chat is disable and the warning is showing because some chat option was selected
    document.getElementById('controls_button_text_' + Play_controlsChat).style.opacity = "0";
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
    if (Play_controls[position].values.length === 1) {
        document.getElementById("control_arrow_up_" + position).style.opacity = "0";
        document.getElementById("control_arrow_down" + position).style.opacity = "0";
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
            ';"><div id="extra_button_text' + key + '" class="extra_button_text strokedeline" >' +
            Play_controls[key].string + '</div><div id="extra_button_' + key +
            '" class="extra_button_text strokedeline" >' +
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
