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
var Play_SingleClickExit = 0;
//var Play_SupportsSource = true;
var Play_LowLatency = false;
var Play_EndUpclear = false;
var Play_EndUpclearID;
var Play_EndUpclearCalback;
var Play_EndDialogEnter = 0;

var Play_streamInfoTimerId = null;
var Play_tokenResponse = 0;
var Play_playingTry = 0;

var Play_playingUrl = '';
var Play_qualities = [];
var Play_qualityIndex = 0;
var Play_ChatEnable = false;
var Play_exitID = null;
var Play_AutoUrl = '';
var Play_StreamTitle = '';

var Play_selectedChannel_id_Old = null;
var Play_IsRerun_Old;
var Play_selectedChannel_Old;
var Play_isHost_Old;
var Play_Main_isHost_Old;
var Play_DisplaynameHost_Old;
var Play_selectedChannelDisplayname_Old;
var Play_gameSelected_Old;
//var Play_SupportsSource_Old;

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
var Play_EndFocus = false;
var Play_DialogEndText = '';
var Play_currentTime = 0;
var Play_watching_time = 0;
var Play_ChatDelayPosition = 0;
var Play_Temp_selectedChannelDisplayname = '';
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
    "dialogTop": -25
}, {
    "containerHeight": 32, // 25%
    "percentage": '25%',
    "dialogTop": -40
}, {
    "containerHeight": 48, // 50%
    "percentage": '50%',
    "dialogTop": -60
}, {
    "containerHeight": 73, // 75%
    "percentage": '75%',
    "dialogTop": -80
}, {
    "containerHeight": 99.6, // 100%
    "percentage": '100%',
    "dialogTop": -120
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

    Play_LowLatency = Main_getItemBool('Play_LowLatency', false);

    if (Main_IsNotBrowser) {
        Android.mSetPlayerPosition(Play_PicturePicturePos);
        Android.mSetPlayerSize(Play_PicturePictureSize);
        Android.mSetlatency(Play_LowLatency);
        Settings_PP_Workaround();
    }

    Play_SetQuality();

    Play_ChatSize(false);
    Play_ChatBackgroundChange(false);
    Play_SetChatFont();
    Play_SetAudioIcon();

    Main_innerHTML('user_feed_notify_img_holder',
        '<img id="user_feed_notify_img" alt="" class="notify_img" src="' + IMG_404_LOGO +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';" >');
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
    Play_showBufferDialog();
    //Play_SupportsSource = true;

    Main_empty('stream_info_title');
    Play_LoadLogoSucess = false;
    PlayClip_HasVOD = true;
    //reset channel logo to prevent another channel logo
    Play_LoadLogo(document.getElementById('stream_info_icon'), IMG_404_LOGO_TEMP);

    //past broadcast
    document.getElementById('controls_' + Play_controlsOpenVod).style.display = 'none';
    //Chat delay
    document.getElementById('controls_' + Play_controlsChatDelay).style.display = '';

    document.getElementById('controls_' + Play_controlsLowLatency).style.display = '';

    if (!PlayExtra_PicturePicture) PlayExtra_UnSetPanel();
    Play_CurrentSpeed = 3;
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
    Main_innerHTML("stream_watching_time", "," + STR_SPACE + STR_WATCHING + Play_timeS(0));
    Main_innerHTML('chat_container_name_text', STR_SPACE + Main_values.Play_selectedChannelDisplayname + STR_SPACE);
    Play_created = Play_timeMs(0);

    Main_textContent("stream_live_time", Play_created);
    Main_HideElement('progress_bar_div');

    Play_UserLiveFeedPressed = false;
    if (!Play_EndDialogEnter) {
        Play_EndSet(1);
        UserLiveFeed_SetFeedPicText();
    }
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

    Play_updateStreamInfoStart();
    Play_loadData();
    document.body.removeEventListener("keyup", Main_handleKeyUp);

    window.clearInterval(Play_streamInfoTimerId);
    Play_streamInfoTimerId = window.setInterval(Play_updateStreamInfo, 300000);
}

// To Force a warn, not used regularly so keep commented out
//function Play_Warn(text) {
//    Play_showWarningDialog(text);
//}

var Play_CheckIfIsLiveStartCounter = 0;
var Play_CheckIfIsLiveStartChannel = 0;
var Play_CheckIfIsLiveStartCallback = 0;

function Play_CheckIfIsLiveStart(callback) {
    if (Main_ThumbOpenIsNull(Play_FeedPos, UserLiveFeed_ids[0])) return;
    Play_showBufferDialog();

    Play_CheckIfIsLiveStartCounter = 0;
    Play_CheckIfIsLiveStartCallback = callback;
    Play_CheckIfIsLiveStartChannel = JSON.parse(document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos).getAttribute(Main_DataAttribute))[6];

    Play_Temp_selectedChannelDisplayname = document.getElementById(UserLiveFeed_ids[3] + Play_FeedPos).textContent;

    Play_CheckIfIsLive();
}


function Play_CheckIfIsLive() {
    var theUrl = 'https://api.twitch.tv/api/channels/' + Play_CheckIfIsLiveStartChannel + '/access_token';

    var xmlHttp;

    try {
        xmlHttp = Android.mreadUrlHLS(theUrl);
    } catch (e) {}

    if (xmlHttp) {
        xmlHttp = JSON.parse(xmlHttp);

        if (xmlHttp.status === 200) {
            Play_tokenResponse = JSON.parse(xmlHttp.responseText);

            if (!Play_tokenResponse.hasOwnProperty('token') || !Play_tokenResponse.hasOwnProperty('sig')) Play_CheckIfIsLiveError();
            else {
                Play_CheckIfIsLiveStartCounter = 0;
                Play_CheckIfIsLiveLink();
            }
        }

    } else Play_CheckIfIsLiveError();
}

function Play_CheckIfIsLiveError() {
    if (Play_CheckIfIsLiveStartCounter < 3) {
        Play_CheckIfIsLiveStartCounter++;
        Play_CheckIfIsLive();
    } else Play_CheckIfIsLiveWarn();
}

function Play_CheckIfIsLiveWarn() {
    Play_HideBufferDialog();
    Play_showWarningDialog(Play_Temp_selectedChannelDisplayname + ' ' + STR_LIVE + STR_IS_OFFLINE);

    window.setTimeout(function() {
        Play_HideWarningDialog();
    }, 2000);
}

function Play_CheckIfIsLiveLinkError() {
    if (Play_CheckIfIsLiveStartCounter < 3) {
        Play_CheckIfIsLiveStartCounter++;
        Play_CheckIfIsLiveLink();
    } else Play_CheckIfIsLiveWarn();
}

function Play_CheckIfIsLiveLink() {
    var theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + Play_CheckIfIsLiveStartChannel +
        '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
        '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&p=' +
        Main_RandomInt();
    //(Play_SupportsSource ? "&allow_source=true" : '') + '&p=' + Main_RandomInt();

    var xmlHttp;
    try {
        xmlHttp = Android.mreadUrl(theUrl, Play_loadingDataTimeout, 0, null);
    } catch (e) {}

    if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
    else {
        Play_CheckIfIsLiveLinkError();
        return;
    }

    if (xmlHttp.status === 200) Play_CheckIfIsLiveStartCallback();
    else Play_CheckIfIsLiveLinkError();
}

function Play_CheckResume() { // Called only by JAVA
    if (Play_isOn) Play_Resume();
    else if (PlayVod_isOn) PlayVod_Resume();
    else if (PlayClip_isOn) PlayClip_Resume();
}

function Play_CheckResumeForced(isPicturePicture) { // Called only by JAVA
    Play_RefreshAutoTry = 0;
    PlayExtra_RefreshAutoTry = 0;

    if (isPicturePicture) PlayExtra_RefreshAutoRequest(true);
    else Play_RefreshAutoRequest(true);
}

function Play_RefreshAutoRequest(UseAndroid) {
    var theUrl = 'https://api.twitch.tv/api/channels/' + Main_values.Play_selectedChannel +
        '/access_token?platform=_' +
        (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token && !Play_410ERROR ? '&oauth_token=' +
            AddUser_UsernameArray[0].access_token : '');

    var xmlHttp;

    try {
        xmlHttp = Android.mreadUrlHLS(theUrl);
    } catch (e) {}

    if (xmlHttp) Play_RefreshAutoRequestSucess(JSON.parse(xmlHttp), UseAndroid);
    else Play_RefreshAutoError(UseAndroid);
}

function Play_RefreshAutoRequestSucess(xmlHttp, UseAndroid) {
    if (xmlHttp.status === 200) {
        Play_RefreshAutoTry = 0;
        Play_tokenResponse = JSON.parse(xmlHttp.responseText);
        //410 error
        if (!Play_tokenResponse.hasOwnProperty('token') || !Play_tokenResponse.hasOwnProperty('sig') ||
            xmlHttp.responseText.indexOf('"status":410') !== -1) {
            Play_410ERROR = true;
            Play_RefreshAutoError(UseAndroid);
            return;
        }
        Play_410ERROR = false;

        var theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + Main_values.Play_selectedChannel +
            '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
            '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true' +
            (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&cdm=wv&p=' + Main_RandomInt();
        //(Play_SupportsSource ? "&allow_source=true" : '') +
        //'&fast_bread=true' +
        //(Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&cdm=wv&p=' + Main_RandomInt();

        Play_AutoUrl = theUrl;

        if (UseAndroid) Android.ResStartAuto(theUrl, 1, 0);
        else Android.SetAuto(theUrl);

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
    UserLiveFeed_Hide(true);
    Play_watching_time = new Date().getTime();
    Play_isOn = true;
    Play_clearPause();
    Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i></div>');
    Play_showBufferDialog();
    Play_loadingInfoDataTry = 0;
    Play_RefreshAutoTry = 0;
    Play_loadingInfoDataTimeout = 3000;
    Play_RestoreFromResume = true;
    if (!Play_LoadLogoSucess) Play_updateStreamInfoStart();
    else Play_updateStreamInfo();
    Play_ResumeAfterOnlineCounter = 0;

    window.clearInterval(Play_ResumeAfterOnlineId);
    if (navigator.onLine) Play_ResumeAfterOnline();
    else Play_ResumeAfterOnlineId = window.setInterval(Play_ResumeAfterOnline, 100);

    window.clearInterval(Play_streamInfoTimerId);
    Play_streamInfoTimerId = window.setInterval(Play_updateStreamInfo, 300000);
    Play_ShowPanelStatus(1);
}

function Play_ResumeAfterOnline(forced) {
    if (forced || navigator.onLine || Play_ResumeAfterOnlineCounter > 200) {
        window.clearInterval(Play_ResumeAfterOnlineId);
        Play_state = Play_STATE_LOADING_TOKEN;
        if (PlayExtra_PicturePicture) PlayExtra_Resume();
        Play_loadData();
    }
    Play_ResumeAfterOnlineCounter++;
}

function Play_updateStreamInfoStart() {
    var theUrl = Main_kraken_api + 'streams/' + Main_values.Play_selectedChannel_id + Main_TwithcV5Flag_I;
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
    if (AddUser_UserIsSet()) {
        AddCode_PlayRequest = true;
        AddCode_Channel_id = Main_values.Play_selectedChannel_id;
        AddCode_CheckFallow();
    } else Play_hideFallow();

    response = JSON.parse(response);
    if (response.stream !== null) {
        Main_values.IsRerun = Main_is_rerun(response.stream.stream_type);
        Play_StreamTitle = twemoji.parse(response.stream.channel.status, false, true);

        Main_innerHTML("stream_info_title", Play_StreamTitle);
        Main_values.Play_gameSelected = response.stream.game;
        Play_Lang = ' [' + (response.stream.channel.broadcaster_language).toUpperCase() + ']';

        Play_partnerIcon(Play_isHost ? Main_values.Play_DisplaynameHost : Main_values.Play_selectedChannelDisplayname, response.stream.channel.partner, true, Play_Lang);

        var playing = (Main_values.Play_gameSelected !== "" ? STR_PLAYING + Main_values.Play_gameSelected : "");
        Main_textContent("stream_info_game", playing);

        Main_innerHTML("stream_live_viewers", STR_SPACE + STR_FOR + Main_addCommas(response.stream.viewers) + STR_SPACE + STR_VIEWER);
        Main_values.Play_selectedChannelLogo = response.stream.channel.logo;
        Play_LoadLogoSucess = true;
        Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Play_selectedChannelLogo);
        Play_created = response.stream.created_at;

        Play_controls[Play_controlsChanelCont].setLable(Main_values.Play_selectedChannelDisplayname);
        Play_controls[Play_controlsGameCont].setLable(Main_values.Play_gameSelected);

        if (Play_isHost && Main_history_Exist('live', Main_values.Play_selectedChannel_id) < 0) {
            Main_values_Play_data = ScreensObj_LiveCellArray(response.stream);
            Main_Set_history('live');
        } else Main_history_UpdateLive(response.stream._id, Main_values.Play_gameSelected, Play_StreamTitle, response.stream.viewers, Play_created);
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

    var theUrl = Main_kraken_api + 'streams/' + Main_values.Play_selectedChannel_id + Main_TwithcV5Flag_I;
    BasexmlHttpGet(theUrl, 3000, 2, null, Play_updateStreamInfoValues, Play_updateStreamInfoError, false);
}

function Play_updateStreamInfoValues(response) {
    response = JSON.parse(response);
    if (response.stream !== null) {
        Main_values.Play_gameSelected = response.stream.game;
        Play_StreamTitle = twemoji.parse(response.stream.channel.status, false, true);

        Main_innerHTML("stream_info_title", Play_StreamTitle);
        Main_textContent("stream_info_game", STR_PLAYING + Main_values.Play_gameSelected);

        Main_innerHTML("stream_live_viewers", STR_SPACE + STR_FOR + Main_addCommas(response.stream.viewers) +
            STR_SPACE + STR_VIEWER);

        if (!Play_LoadLogoSucess) Play_LoadLogo(document.getElementById('stream_info_icon'),
            response.stream.channel.logo);

        Play_controls[Play_controlsChanelCont].setLable(Main_values.Play_selectedChannelDisplayname);
        Play_controls[Play_controlsGameCont].setLable(Main_values.Play_gameSelected);

        Main_history_UpdateLive(response.stream._id, Main_values.Play_gameSelected, Play_StreamTitle, response.stream.viewers, response.stream.created_at);
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

//Some times the server is returning {"error":"Gone","status":410,"message":"this API has been removed."}
//On those case we can't use user oauth_token to prevent the 410 error
var Play_410ERROR = false;

function Play_loadDataRequest() {
    var theUrl, state = Play_state === Play_STATE_LOADING_TOKEN;

    if (state) {
        theUrl = 'https://api.twitch.tv/api/channels/' + Main_values.Play_selectedChannel +
            '/access_token?platform=_' +
            (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token && !Play_410ERROR ? '&oauth_token=' +
                AddUser_UsernameArray[0].access_token : '');
    } else {
        if (!Play_tokenResponse.hasOwnProperty('token') || !Play_tokenResponse.hasOwnProperty('sig')) {
            Play_410ERROR = true;
            Play_loadDataError();
            return;
        }

        theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + Main_values.Play_selectedChannel +
            '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
            '&reassignments_supported=true&playlist_include_framerate=true' +
            '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true' +
            (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&cdm=wv&p=' + Main_RandomInt();
        //(Play_SupportsSource ? "&allow_source=true" : '') +
        //'&fast_bread=true' +
        //(Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();

        Play_AutoUrl = theUrl;

        Play_410ERROR = false;
    }

    if (Main_IsNotBrowser) {
        var xmlHttp;

        try {
            if (state) xmlHttp = Android.mreadUrlHLS(theUrl);
            else xmlHttp = Android.mreadUrl(theUrl, Play_loadingDataTimeout, 0, null);
        } catch (e) {}

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            Play_loadDataError();
            return;
        }

        if (xmlHttp.status === 200) {
            Play_loadingDataTry = 0;

            if (xmlHttp.responseText.indexOf('"status":410') !== -1) {
                Play_410ERROR = true;
                Play_loadDataError();
            } else {
                Play_410ERROR = false;
                Play_loadDataSuccess(xmlHttp.responseText);
            }

        } else if (xmlHttp.status === 403 || xmlHttp.status === 404 ||
            xmlHttp.status === 410) { //forbidden access
            //404 = off line
            //403 = forbidden access
            //410 = api v3 is gone use v5 bug
            Play_loadDataErrorFinish(xmlHttp.status === 410, xmlHttp.status === 403);
        } else {
            Play_loadDataError();
        }

    } else Play_loadDataSuccessFake();
}

function Play_loadDataError() {
    if (Play_isOn && Play_isLive) {
        Play_loadingDataTry++;
        if (Play_loadingDataTry < (Play_loadingDataTryMax + (Play_RestoreFromResume ? 7 : 0))) {
            Play_loadingDataTimeout += 250;
            if (Play_RestoreFromResume) window.setTimeout(Play_loadDataRequest, 500);
            else Play_loadDataRequest();
        } else {
            if (Main_IsNotBrowser) Play_loadDataErrorFinish();
            else Play_loadDataSuccessFake();
        }
    }
}

function Play_loadDataErrorFinish(error_410, Isforbiden) {
    if (Play_EndDialogEnter) {
        Play_EndDialogEnter = 0;
        Play_HideBufferDialog();

        document.body.removeEventListener("keydown", Play_handleKeyDown);
        document.body.addEventListener("keydown", Play_EndUpclearCalback, false);
        Play_state = Play_STATE_PLAYING;

        Play_showWarningDialog(error_410 ? STR_410_ERROR :
            Main_values.Play_selectedChannelDisplayname + ' ' + STR_LIVE + STR_IS_OFFLINE);

        window.setTimeout(function() {
            Play_HideWarningDialog();
        }, 2000);
        Play_RestorePlayDataValues();
        Main_values.Play_WasPlaying = 0;
        Main_SaveValues();
    } else if (Play_selectedChannel_id_Old !== null) Play_RestorePlayData(error_410);
    else if (!PlayExtra_PicturePicture) {

        if (Isforbiden) Play_ForbiddenLive();
        else Play_CheckHostStart(error_410);

    } else Play_CloseBigAndSwich(error_410);
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
    Main_Set_history('live');
}

function Play_loadDataSuccess(responseText) {
    if (Play_state === Play_STATE_LOADING_TOKEN) {
        Play_tokenResponse = JSON.parse(responseText);
        Play_state = Play_STATE_LOADING_PLAYLIST;
        Play_loadData();
    } else if (Play_state === Play_STATE_LOADING_PLAYLIST) {

        UserLiveFeed_Hide(true);

        if (Play_EndDialogEnter === 2) PlayVod_PreshutdownStream(true);
        else if (Play_EndDialogEnter === 3) PlayClip_PreshutdownStream(false);

        Play_EndDialogEnter = 0;

        Play_EndSet(1);
        UserLiveFeed_SetFeedPicText();
        Play_HideEndDialog();

        //Low end device will not support High Level 5.2 video/mp4; codecs="avc1.640034"
        //        if (!Main_SupportsAvc1High && Play_SupportsSource && responseText.indexOf('avc1.640034') !== -1) {
        //            Play_SupportsSource = false;
        //            Play_loadData();
        //            return;
        //        }

        Play_qualities = Play_extractQualities(responseText);
        Play_state = Play_STATE_PLAYING;
        if (Main_IsNotBrowser) Android.SetAuto(Play_AutoUrl);
        Play_selectedChannel_id_Old = null;
        if (Play_isOn) Play_qualityChanged();
        UserLiveFeed_PreventHide = false;

        if (!Play_isHost) Main_Set_history('live');
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
    while ((marray = myRegexp.exec(input))) result.push(marray[0]);

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
    //Play_PannelEndStart(1);
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
function Play_PlayerCheck(mwhocall) { // Called only by JAVA
    if (document.hidden || !navigator.onLine) Play_EndStart(false, mwhocall);
    else if (mwhocall === 1) {

        if ((Play_qualityIndex < Play_getQualitiesCount() - 1)) {
            Play_qualityIndex++;
            Play_qualityDisplay(Play_getQualitiesCount, Play_qualityIndex, Play_SetHtmlQuality);
            Play_qualityChanged();
        } else Play_EndStart(false, 1);

    } else if (mwhocall === 2) {

        if ((PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1)) {
            PlayVod_qualityIndex++;
            Main_values.vodOffset = Android.getsavedtime() / 1000;
            Play_qualityDisplay(PlayVod_getQualitiesCount, PlayVod_qualityIndex, PlayVod_SetHtmlQuality);
            PlayVod_qualityChanged();
        } else Play_EndStart(false, 2);

    } else if (mwhocall === 3) {

        if ((PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1)) {
            PlayClip_qualityIndex++;
            Play_qualityDisplay(PlayClip_getQualitiesCount, PlayClip_qualityIndex, PlayClip_SetHtmlQuality);
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
    return false;
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
    time = Math.round(time);

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

function Play_timeDay(time) {
    var minutes, hours, days;

    time = Math.floor(parseInt(time / 1000) / 60);
    minutes = time % 60;

    time = Math.floor(time / 60);
    hours = time % 24;

    days = Math.floor(time / 24);

    //final time 0m or 23h 59m or 1d 23h 59m
    return (days ? days + 'd ' : '') + (hours ? hours + 'h ' : '') + minutes + "m";
}

function Play_shutdownStream() {
    if (Play_isOn) {
        Play_PreshutdownStream(true);
        Play_qualities = [];
        Main_values.Play_WasPlaying = 0;
        Play_exitMain();
    }
}

function Play_PreshutdownStream(closePlayer) {
    if (Main_IsNotBrowser) {
        if (closePlayer) {
            //We are closing the player on error or on end
            Android.mClearSmallPlayer();
            Android.stopVideo(1);
        }
    }

    if (closePlayer) Play_isOn = false;

    if (!Play_isEndDialogVisible() || closePlayer) UserLiveFeed_Hide(true);

    Play_ClearPlay(closePlayer);
    Play_ClearPlayer();

    Main_values.Play_selectedChannel_id = '';
}

function Play_exitMain() {

    if (AddUser_UserIsSet()) {
        AddCode_IsFallowing = false;
        Play_setFallow();
    } else Play_hideFallow();

    UserLiveFeed_PreventHide = false;
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
    if (!Play_EndDialogEnter) Play_HideEndDialog();
    Main_updateclock();
    Play_IncrementView = '';

    if (Play_qualities[1] && Play_qualityIndex === (Play_getQualitiesCount() - 1)) {
        if (Play_qualities[1].hasOwnProperty('id')) {
            Play_quality = Play_qualities[1].id;
            Play_qualityPlaying = Play_quality;
        }
    }

    if (PlayVod_qualities[1] && PlayVod_qualityIndex === (PlayVod_getQualitiesCount() - 1)) {
        if (PlayVod_qualities[1].hasOwnProperty('id')) {
            PlayVod_quality = PlayVod_qualities[1].id;
            PlayVod_qualityPlaying = PlayVod_quality;
        }
    }

    if (PlayClip_qualities[0] && PlayClip_qualityIndex === (PlayClip_getQualitiesCount() - 1)) {
        if (PlayClip_qualities[0].hasOwnProperty('id')) {
            PlayClip_quality = PlayClip_qualities[0].id;
            PlayClip_qualityPlaying = PlayClip_quality;
        }
    }

}

function Play_ClearPlay(clearChat) {
    Play_Playing = false;
    document.body.removeEventListener("keydown", Play_handleKeyDown);
    if (clearChat) ChatLive_Clear(0);
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
    Main_innerHTML("dialog_warning_play_text", text);
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
    window.clearInterval(Play_ShowPanelStatusId);
    if (Play_Status_Always_On) {

        if (Main_IsNotBrowser) {
            Play_ShowPanelStatusId = window.setInterval(function() {
                Play_UpdateStatus(mwhocall);
            }, 1000);
        } else Play_VideoStatusTest();

        Main_ShowElement('playsideinfo');
        Main_AddClass('playsideinfo', 'playsideinfofocus');
    } else {
        Main_HideElement('playsideinfo');
        Main_RemoveClass('playsideinfo', 'playsideinfofocus');
    }
}

function Play_UpdateStatus(mwhocall) {
    var isLive = mwhocall === 1;

    if (isLive && Play_qualityPlaying.indexOf("Auto") !== -1) Play_getVideoQuality(false, Play_SetHtmlQuality);
    else if (mwhocall === 2 && PlayVod_qualityPlaying.indexOf("Auto") !== -1) Play_getVideoQuality(false, PlayVod_SetHtmlQuality);

    Play_VideoStatus(isLive);
}

function Play_showPanel() {
    PlayVod_IconsBottonResetFocus();
    Play_qualityIndexReset();
    Play_qualityDisplay(Play_getQualitiesCount, Play_qualityIndex, Play_SetHtmlQuality);
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
    Main_innerHTML("stream_watching_time", "," + STR_SPACE + STR_SPACE +
        STR_WATCHING + Play_timeMs((new Date().getTime()) - (Play_watching_time)));

    Main_innerHTML("stream_live_time", STR_SINCE +
        (('00:00').indexOf(Play_created) !== -1 ? '00:00' : Play_streamLiveAt(Play_created)));

    if (!Play_Status_Always_On) {
        if (Main_IsNotBrowser) {
            if (Play_qualityPlaying.indexOf("Auto") !== -1) Play_getVideoQuality(false, Play_SetHtmlQuality);
            Play_VideoStatus(true);
        } else Play_VideoStatusTest();
    }
}

function Play_VideoStatusTest() {
    Main_innerHTML("stream_status", STR_NET_SPEED + STR_SPACE + STR_SPACE + STR_SPACE + Play_getMbps(101 * 1000000) + ' (150.00 Avg) Mbps' +
        STR_BR + STR_NET_ACT + Play_getMbps(45 * 1000000) + ' (150.00 Avg) Mbps' + STR_BR + STR_DROOPED_FRAMES + '1000 (1000 Today)' +
        STR_BR + STR_BUFFER_HEALT + Play_getBuffer(100.37 * 1000) +
        STR_BR + STR_LATENCY + Play_getBuffer(100.37 * 1000));
}

function Play_VideoStatus(showLatency) {
    var value = Android.getVideoStatus().split(',');

    Main_innerHTML("stream_status", STR_NET_SPEED + STR_SPACE + STR_SPACE + STR_SPACE + Play_getMbps(value[2]) +
        " (" + value[3] + STR_AVGMB + STR_BR + STR_NET_ACT + Play_getMbps(value[4]) + " (" +
        value[5] + STR_AVGMB + STR_BR + STR_DROOPED_FRAMES + value[0] + " (" + value[1] + STR_TODAY +
        STR_BR + STR_BUFFER_HEALT + Play_getBuffer(value[6]) +
        (showLatency ? (STR_BR + STR_LATENCY + Play_getBuffer(value[7])) : ''));
}

function Play_getMbps(value) {
    value = (parseInt(value) / 1000000).toFixed(2);

    return (parseInt(value) < 10 ? (STR_SPACE + STR_SPACE + value) : value);
}

function Play_getBuffer(value) {
    value = (value > 0 ? (value / 1000).toFixed(2) : 0);

    return (parseInt(value) < 10 ? (STR_SPACE + value) : value) + " s";
}

function Play_getVideoQuality(forceCallback, callback) {
    var value = Android.getVideoQuality();

    if (value === null || value === undefined || forceCallback) {
        callback('stream_quality');
        return;
    }

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

        Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i></div>');

        if (Play_isPanelShown()) {
            if (PlayVodClip === 1) Play_hidePanel();
            else if (PlayVodClip === 2) PlayVod_hidePanel();
            else if (PlayVodClip === 3) PlayClip_hidePanel();
        }

        if (Main_IsNotBrowser) Android.play(true);
    } else {
        Play_HideBufferDialog();

        Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-play-1"></i></div>');

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
    UserLiveFeed_SetHoldUp();
    Play_EndFocus = true;
    UserLiveFeed_PreventHide = true;
    UserLiveFeed_clearHideFeed();
    UserLiveFeed_ShowFeed(true);
    Main_values.Play_WasPlaying = 0;
    Main_SaveValues();
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
                if (PlayClip_HasNext && (PlayClip_All || PlayClip_All_Forced) && !document.hidden) PlayClip_PlayNext();
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
                PlayVod_Start();
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
                PlayClip_replayOrNext = true;
                PlayClip_replay = true;
                PlayClip_Start();
                Play_clearPause();
            }
        }
    } else if (Play_Endcounter === 1) {
        if (Main_values.Play_isHost) {
            Main_values.Play_DisplaynameHost = Main_values.Play_selectedChannelDisplayname + STR_USER_HOSTING;
            Main_values.Play_selectedChannel = Play_TargetHost.target_login;
            Main_values.Play_selectedChannelDisplayname = Play_TargetHost.target_display_name;
            Main_values.Play_DisplaynameHost = Main_values.Play_DisplaynameHost + Main_values.Play_selectedChannelDisplayname;
            Android.play(false);
            Play_PreshutdownStream(false);

            document.body.addEventListener("keydown", Play_handleKeyDown, false);

            Main_values.Play_selectedChannel_id = Play_TargetHost.target_id;
            Main_ready(Play_Start);
        } else {
            PlayClip_OpenVod();
            if (!PlayClip_HasVOD) canhide = false;
        }
    } else if (Play_Endcounter === 2) Play_OpenChannel(PlayVodClip);
    else if (Play_Endcounter === 3) {
        Play_OpenGame(PlayVodClip);
        if (Main_values.Play_gameSelected === '') canhide = false;
    }

    if (canhide) {
        Play_HideEndDialog();
        UserLiveFeed_Hide(true);
        UserLiveFeed_PreventHide = false;
    }
    Play_EndDialogEnter = 0;
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

        Play_EndTextsReset();
        Main_innerHTML("end_channel_name_text", Main_values.Play_selectedChannelDisplayname);
        Main_innerHTML("end_vod_title_text", Main_values.Play_selectedChannelDisplayname + STR_IS_NOW + STR_USER_HOSTING + Play_TargetHost.target_display_name);
    } else if (PlayVodClip === 1) { // play
        Play_EndIconsRemoveFocus();
        Play_Endcounter = 2;
        Play_EndIconsAddFocus();
        document.getElementById('dialog_end_-1').style.display = 'none';
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'none';

        Play_EndTextsReset();
        Main_innerHTML("end_channel_name_text", Main_values.Play_selectedChannelDisplayname);
    } else if (PlayVodClip === 2) { // vod
        Play_EndIconsResetFocus();
        document.getElementById('dialog_end_-1').style.display = 'none';
        document.getElementById('dialog_end_0').style.display = 'inline-block';
        document.getElementById('dialog_end_1').style.display = 'none';

        Main_innerHTML("end_replay_name_text", Main_values.Main_selectedChannelDisplayname);
        Main_innerHTML("end_replay_title_text", ChannelVod_title);

        Main_textContent("end_vod_name_text", '');
        Main_textContent("end_vod_title_text", '');

        Main_innerHTML("end_channel_name_text", Main_values.Main_selectedChannelDisplayname);
    } else if (PlayVodClip === 3) { // clip
        Play_EndIconsResetFocus();
        document.getElementById('dialog_end_-1').style.display = PlayClip_HasNext ? 'inline-block' : 'none';
        document.getElementById('dialog_end_0').style.display = 'inline-block';
        document.getElementById('dialog_end_1').style.display = 'inline-block';
        Main_textContent("dialog_end_vod_text", PlayClip_HasVOD ? STR_OPEN_BROADCAST : STR_NO_BROADCAST);

        Main_innerHTML("end_replay_name_text", Main_values.Main_selectedChannelDisplayname);
        Main_innerHTML("end_replay_title_text", ChannelClip_title);

        Main_innerHTML("end_vod_name_text", Main_values.Main_selectedChannelDisplayname);

        Main_innerHTML("end_channel_name_text", Main_values.Main_selectedChannelDisplayname);
    }
    Main_textContent("end_game_name_text", Main_values.Play_gameSelected);
}

function Play_EndTextsReset() {
    Main_textContent("end_replay_name_text", '');
    Main_textContent("end_replay_title_text", '');
    Main_textContent("end_vod_name_text", '');
    Main_textContent("end_vod_title_text", '');
}

function Play_OpenChannel(PlayVodClip) {
    if (!Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) {
        Main_values.Main_BeforeChannel = (Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_aGame) ? Main_values.Main_BeforeAgame : Main_values.Main_Go;
        Main_values.Main_BeforeChannelisSet = true;
    }

    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_ChannelContent;

    if (PlayVodClip === 1) {
        Play_ClearPP();
        Main_values.Main_selectedChannel_id = Main_values.Play_selectedChannel_id;
        Main_values.Main_selectedChannel = Main_values.Play_selectedChannel;
        Main_values.Main_selectedChannelDisplayname = Main_values.Play_selectedChannelDisplayname;
        ChannelContent_UserChannels = AddCode_IsFallowing;
        Play_shutdownStream();
    } else if (PlayVodClip === 2) PlayVod_shutdownStream();
    else if (PlayVodClip === 3) PlayClip_shutdownStream();
}

function Play_OpenSearch(PlayVodClip) {
    if (PlayVodClip === 1) {
        Play_ClearPP();
        Play_PreshutdownStream(true);
    } else if (PlayVodClip === 2) PlayVod_PreshutdownStream(true);
    else if (PlayVodClip === 3) PlayClip_PreshutdownStream();

    Main_values.Play_WasPlaying = 0;
    PlayVod_ProgresBarrUpdate(0, 0);
    Main_ShowElement('scene1');
    Main_HideElement('scene2');
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
        Play_ClearPP();
        Play_shutdownStream();
    } else if (PlayVodClip === 2) PlayVod_shutdownStream();
    else if (PlayVodClip === 3) PlayClip_shutdownStream();
}

function Play_ClearPP() {
    if (Main_IsNotBrowser) {
        if (!Play_isFullScreen) {
            Play_isFullScreen = !Play_isFullScreen;
            Play_SetFullScreen(Play_isFullScreen);
        }
    }

    PlayExtra_PicturePicture = false;
    PlayExtra_selectedChannel = '';
    Play_hideChat();
}

function Play_FallowUnfallow() {
    if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
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

function Play_qualityDisplay(getQualitiesCount, qualityIndex, callback) {
    var doc_up = document.getElementById("control_arrow_up_" + Play_controlsQuality),
        doc_down = document.getElementById("control_arrow_down" + Play_controlsQuality);

    if (getQualitiesCount() === 1) {
        doc_up.classList.add('hide');
        doc_down.classList.add('hide');
    } else if (!qualityIndex) {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = "0.2";
        doc_down.style.opacity = "1";
    } else if (qualityIndex === getQualitiesCount() - 1) {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = "1";
        doc_down.style.opacity = "0.2";
    } else {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = "1";
        doc_down.style.opacity = "1";
    }

    callback('controls_name_' + Play_controlsQuality);
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
function Play_PannelEndStart(PlayVodClip) { // Called only by JAVA
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

function Play_CheckHostStart(error_410) {
    if (error_410) {
        Play_IsWarning = true;
        Play_showWarningDialog(STR_410_ERROR);
    }

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

function Play_UpdateDuration(mwhocall, duration) { // Called only by JAVA
    if (duration > 0) {
        if (mwhocall === 2) PlayVod_UpdateDuration(duration);
        else if (mwhocall === 3) PlayClip_UpdateDuration(duration);
    }
}

function Play_setFallow() {
    Play_controls[Play_controlsFallow].setLable(AddCode_IsFallowing ? STR_FALLOWING : STR_FALLOW, AddCode_IsFallowing);
}

function Play_KeyReturn(is_vod) {
    if (Play_isEndDialogVisible()) Play_EndTextClear();

    if (Play_isEndDialogVisible() && !Play_ExitDialogVisible() && !Play_SingleClickExit) Play_showExitDialog();
    else if (UserLiveFeed_isFeedShow() && !Play_isEndDialogVisible()) UserLiveFeed_Hide();
    else if (Play_isPanelShown() && !Play_isVodDialogVisible()) {
        if (is_vod) PlayVod_hidePanel();
        else Play_hidePanel();
    } else {
        if (Play_isVodDialogVisible() && Play_ExitDialogVisible()) {
            Play_HideVodDialog();
            PlayVod_PreshutdownStream(false);
            Play_exitMain();
        } else if (Play_ExitDialogVisible() || Play_SingleClickExit) {
            if (PlayExtra_PicturePicture) Play_CloseSmall();
            else {
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

function Play_CloseBigAndSwich(error_410) {
    Play_HideBufferDialog();
    Play_state = Play_STATE_PLAYING;

    if (!Play_isFullScreen) {
        Play_isFullScreen = !Play_isFullScreen;
        Play_SetFullScreen(Play_isFullScreen);
    }

    Play_showWarningDialog(error_410 ? STR_410_ERROR :
        Main_values.Play_selectedChannelDisplayname + ' ' + STR_LIVE + STR_IS_OFFLINE);

    window.setTimeout(function() {
        Play_HideWarningDialog();
    }, 2500);

    if (Main_IsNotBrowser) Android.mSwitchPlayer();
    PlayExtra_SwitchPlayer();
    if (Main_IsNotBrowser) Android.mClearSmallPlayer();

    PlayExtra_PicturePicture = false;
    PlayExtra_selectedChannel = '';
    PlayExtra_UnSetPanel();
    Play_CleanHideExit();
}

function Play_CloseSmall() {
    if (Main_IsNotBrowser) {
        Android.mClearSmallPlayer();
        if (!Play_isFullScreen) {
            Play_isFullScreen = !Play_isFullScreen;
            Play_SetFullScreen(Play_isFullScreen);
        }
    }
    PlayExtra_PicturePicture = false;
    PlayExtra_selectedChannel = '';
    PlayExtra_UnSetPanel();
    Play_CleanHideExit();
}

function Play_handleKeyUp(e) {
    if (e.keyCode === KEY_ENTER) {
        Play_handleKeyUpClear();
        if (!PlayExtra_clear) Play_OpenLiveFeedCheck();
    } else if (e.keyCode === KEY_UP) {
        Play_handleKeyUpEndClear();
        if (!Play_EndUpclear) Play_EndDialogUpDown();
    }
}

function Play_OpenLiveFeedCheck() {
    var doc = document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos);
    if (doc === null) UserLiveFeed_ResetFeedId();
    else Play_OpenLiveFeed(true, doc);
}

function Play_OpenLiveFeed(ResetFeed, doc) {
    var selectedChannel = JSON.parse(doc.getAttribute(Main_DataAttribute))[6];
    if (Main_values.Play_selectedChannel !== selectedChannel &&
        PlayExtra_selectedChannel !== selectedChannel) {
        Play_SavePlayData();
        Play_PreshutdownStream(false);

        Main_values.Play_isHost = false;
        Play_UserLiveFeedPressed = true;
        Main_OpenLiveStream(Play_FeedPos, UserLiveFeed_ids, Play_handleKeyDown);
    } else if (ResetFeed) UserLiveFeed_ResetFeedId();
}

function Play_keyUpEnd() {
    Play_EndUpclear = true;
    UserLiveFeed_FeedRefresh(Play_EndFocus);
}

function Play_handleKeyUpEndClear() {
    window.clearTimeout(Play_EndUpclearID);
    document.body.removeEventListener("keyup", Play_handleKeyUp);
    document.body.addEventListener("keydown", Play_EndUpclearCalback, false);
}

function Play_EndDialogUpDown() {

    Play_EndTextClear();
    if (UserLiveFeed_loadingData || !AddUser_UserIsSet()) return;

    if (Play_EndFocus) {
        Play_EndFocus = false;
        Play_EndIconsRemoveFocus();
        UserLiveFeed_FeedAddFocus();
    } else {
        Play_EndFocus = true;
        UserLiveFeed_FeedRemoveFocus();
        Play_EndIconsAddFocus();
    }
}

function Play_SavePlayData() {
    Play_selectedChannel_id_Old = Main_values.Play_selectedChannel_id;
    Play_IsRerun_Old = Main_values.IsRerun;
    Play_selectedChannel_Old = Main_values.Play_selectedChannel;
    Play_isHost_Old = Play_isHost;
    Play_Main_isHost_Old = Main_values.Play_isHost;
    Play_DisplaynameHost_Old = Main_values.Play_DisplaynameHost;
    Play_selectedChannelDisplayname_Old = Main_values.Play_selectedChannelDisplayname;
    Play_gameSelected_Old = Main_values.Play_gameSelected;
    //Play_SupportsSource_Old = Play_SupportsSource;
}

function Play_RestorePlayData(error_410) {
    Play_HideBufferDialog();
    Play_state = Play_STATE_PLAYING;

    Play_showWarningDialog(error_410 ? STR_410_ERROR :
        Main_values.Play_selectedChannelDisplayname + ' ' + STR_LIVE + STR_IS_OFFLINE);

    window.setTimeout(function() {
        Play_HideWarningDialog();
    }, 2000);

    Play_RestorePlayDataValues();

    Main_SaveValues();
    Play_updateStreamInfoStart();
}

function Play_RestorePlayDataValues() {
    Main_values.Play_selectedChannel_id = Play_selectedChannel_id_Old;
    Play_selectedChannel_id_Old = null;

    Main_values.IsRerun = Play_IsRerun_Old;
    Main_values.Play_selectedChannel = Play_selectedChannel_Old;
    Play_isHost = Play_isHost_Old;
    Main_values.Play_isHost = Play_Main_isHost_Old;
    Main_values.Play_DisplaynameHost = Play_DisplaynameHost_Old;
    Main_values.Play_selectedChannelDisplayname = Play_selectedChannelDisplayname_Old;
    Main_values.Play_gameSelected = Play_gameSelected_Old;
    //Play_SupportsSource = Play_SupportsSource_Old;
}

function Play_handleKeyUpClear() {
    window.clearTimeout(PlayExtra_KeyEnterID);
    document.body.removeEventListener("keyup", Play_handleKeyUp);
    if (!Main_isElementShowing('dialog_os')) document.body.addEventListener("keydown", Play_handleKeyDown, false);
}

function Play_Exit() {
    Play_CleanHideExit();
    Play_hideChat();
    PlayExtra_PicturePicture = false;
    PlayExtra_selectedChannel = '';
    Play_shutdownStream();
}

function Play_handleKeyDown(e) {
    if (Play_state !== Play_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_STOP:
                Play_Exit();
                break;
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                if (Play_ExitDialogVisible() || Play_SingleClickExit) {
                    Play_Exit();
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
                if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) {
                    if (Screens_ChangeFocusAnimationFinished && Play_FeedPos && !UserLiveFeed_loadingData) {
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

                    Android.mSwitchPlayerPosition(Play_PicturePicturePos);
                    Main_setItem('Play_PicturePicturePos', Play_PicturePicturePos);
                } else {
                    Play_showPanel();
                }
                break;
            case KEY_RIGHT:
                if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) {
                    if (Screens_ChangeFocusAnimationFinished &&
                        Play_FeedPos < (UserLiveFeed_GetSize() - 1) && !UserLiveFeed_loadingData) {
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
                    Android.mSwitchPlayerSize(Play_PicturePictureSize);
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
                else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    document.body.removeEventListener("keydown", Play_handleKeyDown, false);
                    document.body.addEventListener("keyup", Play_handleKeyUp, false);
                    Play_EndUpclear = false;
                    Play_EndUpclearCalback = Play_handleKeyDown;
                    Play_EndUpclearID = window.setTimeout(Play_keyUpEnd, 250);
                } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedRefresh();
                break;
            case KEY_DOWN:
                if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(1, -1);
                    Play_setHidePanel();
                } else if (Play_isEndDialogVisible()) Play_EndDialogUpDown();
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
                else if (Play_isFullScreen && Play_isChatShown() && !PlayExtra_PicturePicture) {
                    Play_KeyChatSizeChage();
                } else if (PlayExtra_PicturePicture) {
                    if (Play_isFullScreen) {
                        if (Main_IsNotBrowser) Android.mSwitchPlayer();
                        PlayExtra_SwitchPlayer();
                    } else {
                        Play_controls[Play_controlsAudio].defaultValue++;

                        if (Play_controls[Play_controlsAudio].defaultValue > (Play_controls[Play_controlsAudio].values.length - 1)) Play_controls[Play_controlsAudio].defaultValue = 0;

                        Play_controls[Play_controlsAudio].enterKey();
                    }
                } else Play_showPanel();
                break;
            case KEY_ENTER:
                if (Play_isEndDialogVisible()) {
                    if (Play_EndFocus) Play_EndDialogPressed(1);
                    else {
                        var doc = document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos);
                        if (doc !== null) {
                            Play_EndDialogEnter = 1;
                            Play_EndUpclearCalback = Play_handleKeyDown;
                            Play_OpenLiveFeed(false, doc);
                        }
                    }
                } else if (Play_isPanelShown()) {
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
                    PlayExtra_KeyEnterID = window.setTimeout(PlayExtra_KeyEnter, 250);
                } else Play_showPanel();
                break;
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                Play_KeyReturn(false);
                break;
            case KEY_STOP:
                Play_Exit();
                break;
            case KEY_PLAY:
                if (!Play_isEndDialogVisible() && Play_isNotplaying()) Play_KeyPause(1);
                break;
            case KEY_PAUSE:
                if (!Play_isEndDialogVisible() && !Play_isNotplaying()) Play_KeyPause(1);
                break;
            case KEY_KEYBOARD_SPACE:
            case KEY_PLAYPAUSE:
                if (!Play_isEndDialogVisible()) Play_KeyPause(1);
                break;
            case KEY_REFRESH:
                if (UserLiveFeed_isFeedShow()) PlayExtra_KeyEnter();
                break;
            case KEY_CHAT:
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
var Play_controlsLowLatency = 8;
var Play_controlsAudio = 9;
var Play_controlsChat = 10;
var Play_controlsChatSide = 11;
var Play_controlsChatForceDis = 12;
var Play_controlsChatPos = 13;
var Play_controlsChatSize = 14;
var Play_controlsChatBright = 15;
var Play_controlsChatFont = 16;
var Play_controlsChatDelay = 17;

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
        values: '',
        defaultValue: null,
        opacity: 0,
        enterKey: function(PlayVodClip) {
            Play_ForceHidePannel();
            Play_OpenChannel(PlayVodClip);
        },
        setLable: function(title) {
            Main_innerHTML('extra_button_' + this.position,
                '<div style="max-width: 27%; text-overflow: ellipsis; overflow: hidden; transform: translate(135.5%, 0);">' +
                title + '</div>');
        },
    };

    Play_controls[Play_controlsGameCont] = { //game content
        icons: "gamepad",
        string: STR_GAME_CONT,
        values: '',
        defaultValue: null,
        opacity: 0,
        enterKey: function(PlayVodClip) {
            Play_ForceHidePannel();
            Play_OpenGame(PlayVodClip);
        },
        setLable: function(title) {
            Main_innerHTML('extra_button_' + this.position,
                '<div style="max-width: 40%; text-overflow: ellipsis; overflow: hidden; transform: translate(75%, 0);">' +
                title + '</div>');
        },
    };

    Play_controls[Play_controlsOpenVod] = { //open vod
        icons: "movie-play",
        string: STR_OPEN_BROADCAST,
        values: '',
        defaultValue: null,
        opacity: 0,
        enterKey: function() {
            Play_ForceHidePannel();
            PlayClip_OpenVod();
        },
        setLable: function(title) {
            Main_innerHTML('extra_button_' + this.position,
                '<div style="max-width: 60%; text-overflow: ellipsis; overflow: hidden; transform: translate(33%, 0);">' +
                title + '</div>');
        },
    };


    Play_controls[Play_controlsFallow] = { //fallowing
        icons: "heart-o",
        string: STR_FALLOW,
        values: '',
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
            Main_textContent('extra_button_' + this.position, AddCode_IsFallowing ? STR_CLICK_UNFALLOW : STR_CLICK_FALLOW);
        },
        setIcon: function(AddCode_IsFallowing) {
            Main_innerHTML('controls_icon_' + this.position, '<i class="pause_button3d icon-' +
                (AddCode_IsFallowing ? "heart" : "heart-o") +
                '" style="color: #' + (AddCode_IsFallowing ? "6441a4" : "FFFFFF") + ';" ></i>');
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

                Play_qualityDisplay(Play_getQualitiesCount, Play_qualityIndex, Play_SetHtmlQuality);
            } else if (PlayVodClip === 2) {
                //TODO fix this reversed logic
                PlayVod_qualityIndex += adder * -1;

                if (PlayVod_qualityIndex > (PlayVod_getQualitiesCount() - 1))
                    PlayVod_qualityIndex = (PlayVod_getQualitiesCount() - 1);
                else if (PlayVod_qualityIndex < 0)
                    PlayVod_qualityIndex = 0;

                Play_qualityDisplay(PlayVod_getQualitiesCount, PlayVod_qualityIndex, PlayVod_SetHtmlQuality);
            } else if (PlayVodClip === 3) {
                //TODO fix this reversed logic
                PlayClip_qualityIndex += adder * -1;

                if (PlayClip_qualityIndex > (PlayClip_getQualitiesCount() - 1))
                    PlayClip_qualityIndex = (PlayClip_getQualitiesCount() - 1);
                else if (PlayClip_qualityIndex < 0)
                    PlayClip_qualityIndex = 0;

                Play_qualityDisplay(PlayClip_getQualitiesCount, PlayClip_qualityIndex, PlayClip_SetHtmlQuality);
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

            if (this.defaultValue === 2) {
                Android.StartAuto(1, 0);
                Android.initializePlayer2Auto();
            } else if (this.defaultValue) Android.StartAuto(1, 0);
            else Android.initializePlayer2Auto();

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

    Play_controls[Play_controlsLowLatency] = { //quality
        icons: "history",
        string: STR_LOW_LATENCY,
        values: null,
        defaultValue: 0,
        opacity: 0,
        enterKey: function() {
            Play_hidePanel();

            Play_LowLatency = !Play_LowLatency;

            if (Main_IsNotBrowser) {
                Android.mSetlatency(Play_LowLatency);

                if (PlayExtra_PicturePicture) {
                    Android.ResStartAuto(Play_AutoUrl, 1, 0);
                    Android.ResStartAuto2(PlayExtra_AutoUrl);
                } else {
                    if (Play_quality.indexOf("Auto") !== -1) Android.SetAuto(Play_AutoUrl);
                    Play_onPlayer();
                }

            }

            if (Play_LowLatency) {
                Play_showWarningDialog(STR_LOW_LATENCY_SUMMARY);
                window.setTimeout(Play_HideWarningDialog, 3000);
            }

            Main_setItem('Play_LowLatency', Play_LowLatency);
            this.setLable();
        },
        setLable: function() {
            Main_textContent('extra_button_' + this.position, "(" + (Play_LowLatency ? STR_ENABLE : STR_DISABLE) + ")");
        },
    };

    Play_controls[Play_controlsAudio] = { //speed
        icons: "sound",
        string: STR_AUDIO_SOURCE,
        values: [STR_PLAYER_AUTO_SMALLS, STR_PLAYER_AUTO_BIG, STR_PLAYER_AUTO_ALL],
        defaultValue: Play_controlsAudioPos,
        opacity: 0,
        enterKey: function() {

            Android.mSwitchPlayerAudio(this.defaultValue);

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
        string: STR_CHAT_SHOW,
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
            } else Chat_Init();

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

function Play_KeyChatSizeChage() {
    Play_ChatSizeValue++;
    if (Play_ChatSizeValue > Play_MaxChatSizeValue) {
        Play_ChatSizeValue = 0;
        Play_ChatPositionConvert(false);
    } else if (Play_ChatSizeValue === Play_MaxChatSizeValue) Play_ChatPositionConvert(true);
    Play_ChatSize(true);
    Play_controls[Play_controlsChatSize].defaultValue = Play_ChatSizeValue;
    Play_controls[Play_controlsChatSize].bottomArrows();
    Play_controls[Play_controlsChatSize].setLable();
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
    var doc_up = document.getElementById("control_arrow_up_" + position),
        doc_down = document.getElementById("control_arrow_down" + position);

    if (Play_controls[position].values.length === 1) {
        doc_up.classList.add('hide');
        doc_down.classList.add('hide');
    } else if (!Play_controls[position].defaultValue) {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = "1";
        doc_down.style.opacity = "0.2";
    } else if (Play_controls[position].defaultValue === (Play_controls[position].values.length - 1)) {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = "0.2";
        doc_down.style.opacity = "1";
    } else {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = "1";
        doc_down.style.opacity = "1";
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
