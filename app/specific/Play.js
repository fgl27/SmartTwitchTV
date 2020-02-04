//Variable initialization
var Play_ChatPositions = 0;
var Play_ChatPositionConvertBefore = Play_ChatPositions;
var Play_PlayerPanelOffset = -5;
var Play_ChatBackground = 0.55;
var Play_ChatSizeValue = 2;
var Play_MaxChatSizeValue = 4;
var Play_PanelHideID = null;
var Play_isFullScreen = true;
var Play_ChatPositionsBF;
var Play_ChatEnableBF;
var Play_ChatSizeValueBF;
var Play_FeedOldUserName = '';
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
var Play_MultiEnable = false;
var Play_MultiArray = [];
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
var Play_ChatEnable = false;
var Play_exitID = null;

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

var Play_data_base = {
    data: [],
    isHost: false,
    DisplaynameHost: '',
    watching_time: 0,
    qualities: [],
    qualityPlaying: "Auto",
    quality: "Auto",
    AutoUrl: ''
};

var Play_data = JSON.parse(JSON.stringify(Play_data_base));
var PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));

var Play_data_old = JSON.parse(JSON.stringify(Play_data_base));
var PlayExtra_Save_data = JSON.parse(JSON.stringify(Play_data_base));
var PlayExtra_data_old = JSON.parse(JSON.stringify(Play_data_base));

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
    Play_MultiSetpannelInfo();
}

function Play_SetQuality() {
    Play_data.quality = Settings_Obj_values('default_quality').replace(STR_SOURCE, "source");
    Play_data.qualityPlaying = Play_data.quality;

    PlayVod_quality = Play_data.quality;
    PlayVod_qualityPlaying = Play_data.quality;
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

    document.getElementById('controls_' + Play_MultiStream).style.display = '';
    document.getElementById('controls_' + Play_controlsOpenVod).style.display = 'none';
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

    Play_data.isHost = Main_values.Play_isHost;
    Main_values.Play_isHost = false;
    Play_RestoreFromResume = false;
    Main_ShowElement('controls_holder');

    Play_currentTime = 0;
    Play_data.watching_time = new Date().getTime();
    Main_innerHTML("stream_watching_time", "," + STR_SPACE + STR_WATCHING + Play_timeS(0));
    Main_innerHTML('chat_container_name_text', STR_SPACE + Play_data.data[1] + STR_SPACE);
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
    Play_loadingInfoDataTimeout = 3000;
    Play_isLive = true;
    Play_tokenResponse = 0;
    Play_playingTry = 0;
    Play_isOn = true;
    Play_Playing = false;
    Play_state = Play_STATE_LOADING_TOKEN;

    Play_loadData();
    Play_UpdateMainStream(true);
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
    if (Main_ThumbOpenIsNull(UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX], UserLiveFeed_ids[0])) return;
    else if (!Main_IsNotBrowser) {
        callback();
        return;
    }
    Play_showBufferDialog();

    Play_CheckIfIsLiveStartCounter = 0;
    Play_CheckIfIsLiveStartCallback = callback;
    Play_CheckIfIsLiveStartChannel = JSON.parse(document.getElementById(UserLiveFeed_ids[8] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]).getAttribute(Main_DataAttribute))[6];

    Play_Temp_selectedChannelDisplayname = document.getElementById(UserLiveFeed_ids[3] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]).textContent;

    Play_CheckIfIsLive();
}


function Play_CheckIfIsLive() {
    var theUrl = 'https://api.twitch.tv/api/channels/' + Play_CheckIfIsLiveStartChannel + '/access_token';

    var xmlHttp = Android.mreadUrlHLS(theUrl);

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

    var xmlHttp = Android.mreadUrl(theUrl, Play_loadingDataTimeout, 0, null);

    if (!xmlHttp) {
        Play_CheckIfIsLiveLinkError();
        return;
    }

    if (JSON.parse(xmlHttp).status === 200) Play_CheckIfIsLiveStartCallback();
    else Play_CheckIfIsLiveLinkError();
}

function Play_CheckResume() { // Called only by JAVAPlay_CheckIfIsLiveStartCallback
    if (Play_isOn) Play_Resume();
    else if (PlayVod_isOn) PlayVod_Resume();
    else if (PlayClip_isOn) PlayClip_Resume();
}

function Play_CheckResumeForced(isPicturePicture, isMulti, position) { // Called only by JAVA

    if (isMulti) {
        Play_MultiStart(
            position,
            Play_MultiArray[position].data[6],
            Play_MultiArray[position].data[1],
            0
        );
        return;
    }

    Play_RefreshAutoTry = 0;
    PlayExtra_RefreshAutoTry = 0;

    if (isPicturePicture) PlayExtra_RefreshAutoRequest(true);
    else if (Main_IsNotBrowser) Play_RefreshAutoRequest(true);
}

function Play_RefreshAutoRequest(UseAndroid) {
    var theUrl = 'https://api.twitch.tv/api/channels/' + Play_data.data[6] +
        '/access_token?platform=_';

    var xmlHttp = Android.mreadUrlHLS(theUrl);

    if (xmlHttp) Play_RefreshAutoRequestSucess(JSON.parse(xmlHttp), UseAndroid);
    else Play_RefreshAutoError(UseAndroid);
}

function Play_RefreshAutoRequestSucess(xmlHttp, UseAndroid) {
    if (xmlHttp.status === 200) {

        Play_tokenResponse = JSON.parse(xmlHttp.responseText);
        //410 error
        if (!Play_tokenResponse.hasOwnProperty('token') || !Play_tokenResponse.hasOwnProperty('sig') ||
            xmlHttp.responseText.indexOf('"status":410') !== -1) {
            Play_RefreshAutoError(UseAndroid);
            return;
        }

        var theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + Play_data.data[6] +
            '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
            '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true' +
            (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&cdm=wv&p=' + Main_RandomInt();
        //(Play_SupportsSource ? "&allow_source=true" : '') +
        //'&fast_bread=true' +
        //(Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&cdm=wv&p=' + Main_RandomInt();

        Play_data.AutoUrl = theUrl;

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
    UserLiveFeed_Hide();
    Play_data.watching_time = new Date().getTime();
    Play_isOn = true;
    ChatLive_Playing = true;
    Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i></div>');
    Play_showBufferDialog();
    Play_RefreshAutoTry = 0;
    Play_loadingInfoDataTimeout = 3000;
    Play_RestoreFromResume = true;
    Play_ResumeAfterOnlineCounter = 0;

    window.clearInterval(Play_ResumeAfterOnlineId);
    if (navigator.onLine) Play_ResumeAfterOnline();
    else Play_ResumeAfterOnlineId = window.setInterval(Play_ResumeAfterOnline, 100);

    Play_UpdateMainStream(true);
    window.clearInterval(Play_streamInfoTimerId);
    Play_streamInfoTimerId = window.setInterval(Play_updateStreamInfo, 300000);
    Play_ShowPanelStatus(1);
}

function Play_ResumeAfterOnline() {
    if (navigator.onLine || Play_ResumeAfterOnlineCounter > 200) {
        window.clearInterval(Play_ResumeAfterOnlineId);
        if (Play_MultiEnable) {
            Play_data = JSON.parse(JSON.stringify(Play_MultiArray[Play_MultiFirstAvaileble()]));
            for (var i = 0; i < Play_MultiArray.length; i++) {
                if (Play_MultiArray[i].data.length > 0) {
                    Play_MultiStart(
                        i,
                        Play_MultiArray[i].data[6],
                        Play_MultiArray[i].data[1],
                        0
                    );
                }
            }

        } else {
            Play_state = Play_STATE_LOADING_TOKEN;
            if (PlayExtra_PicturePicture) PlayExtra_Resume();
            Play_loadData();
        }
    }
    Play_ResumeAfterOnlineCounter++;
}

function Play_updateStreamInfoStart() {
    var theUrl = Main_kraken_api + 'streams/' + Play_data.data[14] + Main_TwithcV5Flag_I;
    BasexmlHttpGet(theUrl, Play_loadingInfoDataTimeout, 2, null, Play_updateStreamInfoStartValues, Play_updateStreamInfoStartError);
}

function Play_partnerIcon(name, partner, islive, lang) {
    var div = '<div class="partnericon_div"> ' + name + STR_SPACE + STR_SPACE + '</div>' +
        (partner ? ('<img class="partnericon_img" alt="" src="' +
            IMG_PARTNER + '">') : "");

    if (islive) {
        div += STR_SPACE + STR_SPACE + '<div class="partnericon_text" style="background: #' +
            (Play_data.data[8] ? 'FFFFFF; color: #000000;' : 'E21212;') + '">' +
            STR_SPACE + STR_SPACE + (Play_data.data[8] ? STR_NOT_LIVE : STR_LIVE) + STR_SPACE + STR_SPACE + '</div>';
    }

    div += '<div class="lang_text" ">' + STR_SPACE + STR_SPACE + lang + '</div>';

    Main_innerHTML("stream_info_name", div);
}

function Play_updateStreamInfoStartValues(response) {
    if (AddUser_UserIsSet()) {
        AddCode_PlayRequest = true;
        AddCode_Channel_id = Play_data.data[14];
        AddCode_CheckFallow();
    } else Play_hideFallow();

    response = JSON.parse(response);
    if (response.stream !== null) {
        Play_data.data[8] = Main_is_rerun(response.stream.broadcast_platform);
        Play_data.data[7] = response.stream._id;

        Main_innerHTML("stream_info_title", twemoji.parse(response.stream.channel.status, false, true));
        Play_data.data[3] = response.stream.game;
        Play_Lang = ' [' + (response.stream.channel.broadcaster_language).toUpperCase() + ']';

        Play_partnerIcon(Play_data.isHost ? Play_data.DisplaynameHost : Play_data.data[1], response.stream.channel.partner, true, Play_Lang);

        var playing = (Play_data.data[3] !== "" ? STR_PLAYING + Play_data.data[3] : "");
        Main_textContent("stream_info_game", playing);

        Main_innerHTML("stream_live_viewers", STR_SPACE + STR_FOR + Main_addCommas(response.stream.viewers) + STR_SPACE + STR_VIEWER);
        Play_data.data[9] = response.stream.channel.logo;
        Play_LoadLogoSucess = true;
        Play_LoadLogo(document.getElementById('stream_info_icon'), Play_data.data[9]);
        Play_created = response.stream.created_at;

        Play_controls[Play_controlsChanelCont].setLable(Play_data.data[1]);
        Play_controls[Play_controlsGameCont].setLable(Play_data.data[3]);

        if (Play_data.isHost && Main_history_Exist('live', Play_data.data[14]) < 0) {
            Main_Set_history('live', ScreensObj_LiveCellArray(response.stream));
        } else {
            Main_history_UpdateLive(
                Play_data.data[7],
                Play_data.data[3],
                response.stream.channel.status,
                response.stream.viewers
            );
        }
        Play_loadingInfoDataTry = 0;
        Play_updateVodInfo(response.stream.channel._id, response.stream._id, 0);
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

function Play_updateVodInfo(Channel_id, BroadcastID, tryes) {
    var theUrl = Main_kraken_api + 'channels/' + Channel_id + '/videos?limit=100&broadcast_type=archive&sort=time',
        xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;

    for (var i = 0; i < 2; i++)
        xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) Play_updateVodInfoSuccess(xmlHttp.responseText, BroadcastID);
            else Play_updateVodInfoError(Channel_id, BroadcastID, tryes);
        }
    };

    xmlHttp.send(null);
}

function Play_updateVodInfoError(Channel_id, BroadcastID, tryes) {
    if (tryes < 10) {
        window.setTimeout(function() {
            if (Play_isOn) Play_updateVodInfo(Channel_id, BroadcastID, tryes + 1);
        }, 500);
    }
}

function Play_updateVodInfoSuccess(response, BroadcastID) {
    response = JSON.parse(response).videos;

    for (var i = 0; i < response.length; i++) {
        if (response[i].status.indexOf('recording') !== -1) {

            Main_history_UpdateLiveVod(
                BroadcastID,
                response[i]._id.substr(1),
                'https://static-cdn.jtvnw.net/s3_vods/' + response[i].animated_preview_url.split('/')[3] +
                '/thumb/thumb0-' + Main_VideoSize + '.jpg'
            );

            break;
        }
    }
}

function Play_RefreshMultiRequest(pos, streamer, id, tryes) {
    var theUrl = 'https://api.twitch.tv/api/channels/' + streamer + '/access_token?platform=_';

    var xmlHttp = Android.mreadUrlHLS(theUrl);

    if (xmlHttp) Play_RefreshMultiRequestSucess(JSON.parse(xmlHttp), pos, streamer, id, tryes);
    else Play_RefreshMultiError(pos, streamer, id, tryes);
}

function Play_RefreshMultiRequestSucess(xmlHttp, pos, streamer, id, tryes) {
    if (xmlHttp.status === 200) {

        Play_tokenResponse = JSON.parse(xmlHttp.responseText);
        //410 error
        if (!Play_tokenResponse.hasOwnProperty('token') || !Play_tokenResponse.hasOwnProperty('sig') ||
            xmlHttp.responseText.indexOf('"status":410') !== -1) {
            Play_RefreshMultiError(pos, streamer, id, tryes);
            return;
        }

        var theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + streamer +
            '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
            '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true' +
            (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&cdm=wv&p=' + Main_RandomInt();

        Play_MultiArray[pos].AutoUrl = theUrl;

        try {
            Android.SetAutoMulti(pos, theUrl);
        } catch (e) {}

        theUrl = Main_kraken_api + 'streams/' + id + Main_TwithcV5Flag_I;
        Play_RefreshMultiGet(theUrl, 0, pos);

    } else Play_RefreshMultiError(pos, streamer, id, tryes);
}

function Play_RefreshMultiError(pos, streamer, id, tryes) {
    if (Play_isOn && tryes < 5 && Play_MultiArray[pos].data.length > 0)
        Play_RefreshMultiRequest(pos, streamer, id, tryes + 1);
}

function Play_RefreshMultiGet(theUrl, tryes, pos) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 5000;

    for (var i = 0; i < 2; i++)
        xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                Play_updateStreamInfoMultiValues(xmlHttp.responseText, pos);
            } else {
                Play_updateStreamInfoMultiError(theUrl, tryes, pos);
            }
        }
    };

    xmlHttp.send(null);
}

function Play_updateStreamInfoMultiValues(response, pos) {
    response = JSON.parse(response);
    if (response.stream !== null) {
        Play_MultiArray[pos].data[3] = response.stream.game;

        if (!pos) {
            Play_controls[Play_controlsChanelCont].setLable(Play_MultiArray[pos].data[1]);
            Play_controls[Play_controlsGameCont].setLable(Play_MultiArray[pos].data[3]);
        }

        Play_MultiUpdateinfo(
            pos,
            response.stream.game,
            response.stream.viewers,
            Main_is_rerun(response.stream.broadcast_platform),
            twemoji.parse(response.stream.channel.status, false, true)
        );

        Main_history_UpdateLive(
            response.stream._id,
            response.stream.game,
            response.stream.channel.status,
            response.stream.viewers
        );

    }
}

function Play_updateStreamInfoMultiError(theUrl, tryes, pos) {
    if (tryes < Play_loadingInfoDataTryMax) {
        window.setTimeout(function() {
            if (Play_isOn) Play_RefreshMultiGet(theUrl, tryes + 1, pos);
            //give a second for it retry as the TV may be on coming from resume
        }, 2500);
    }
}

//When update this also update PlayExtra_updateStreamInfo
function Play_updateStreamInfo() {
    if (Play_MultiEnable) {
        for (var i = 0; i < Play_MultiArray.length; i++) {
            if (Play_MultiArray[i].data.length > 0) {
                Play_RefreshMultiRequest(
                    i,
                    Play_MultiArray[i].data[6],
                    Play_MultiArray[i].data[14],
                    0
                );
            }
        }

        return;
    }

    Play_RefreshAutoTry = 0;
    if (Main_IsNotBrowser) Play_RefreshAutoRequest(false);

    if (PlayExtra_PicturePicture) {
        PlayExtra_RefreshAutoTry = 0;
        PlayExtra_RefreshAutoRequest(false);
    }

    var theUrl = Main_kraken_api + 'streams/' + Play_data.data[14] + Main_TwithcV5Flag_I;
    BasexmlHttpGet(theUrl, 3000, 2, null, Play_updateStreamInfoValues, Play_updateStreamInfoError);
}

function Play_updateStreamInfoValues(response) {
    response = JSON.parse(response);
    if (response.stream !== null) {
        Play_data.data[3] = response.stream.game;

        Main_innerHTML("stream_info_title", twemoji.parse(response.stream.channel.status, false, true));
        Main_textContent("stream_info_game", STR_PLAYING + Play_data.data[3]);

        Main_innerHTML("stream_live_viewers", STR_SPACE + STR_FOR + Main_addCommas(response.stream.viewers) +
            STR_SPACE + STR_VIEWER);

        if (!Play_LoadLogoSucess) Play_LoadLogo(document.getElementById('stream_info_icon'),
            response.stream.channel.logo);

        Play_controls[Play_controlsChanelCont].setLable(Play_data.data[1]);
        Play_controls[Play_controlsGameCont].setLable(Play_data.data[3]);

        Main_history_UpdateLive(
            response.stream._id,
            Play_data.data[3],
            response.stream.channel.status,
            response.stream.viewers
        );
        if (PlayExtra_PicturePicture) {
            Play_updateStreamInfoErrorTry = 0;
            PlayExtra_updateStreamInfo();
        }
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
//var Play_410ERROR = false;

function Play_loadDataRequest() {
    var theUrl, state = Play_state === Play_STATE_LOADING_TOKEN;

    if (state) {
        theUrl = 'https://api.twitch.tv/api/channels/' + Play_data.data[6] +
            '/access_token?platform=_';
    } else {
        if (!Play_tokenResponse.hasOwnProperty('token') || !Play_tokenResponse.hasOwnProperty('sig')) {
            Play_loadDataError();
            return;
        }

        theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + Play_data.data[6] +
            '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
            '&reassignments_supported=true&playlist_include_framerate=true' +
            '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true' +
            (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&cdm=wv&p=' + Main_RandomInt();
        //(Play_SupportsSource ? "&allow_source=true" : '') +
        //'&fast_bread=true' +
        //(Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();

        Play_data.AutoUrl = theUrl;
    }

    if (Main_IsNotBrowser) {
        var xmlHttp;

        if (state) xmlHttp = Android.mreadUrlHLS(theUrl);
        else xmlHttp = Android.mreadUrl(theUrl, Play_loadingDataTimeout, 0, null);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            Play_loadDataError();
            return;
        }

        if (xmlHttp.status === 200) {
            Play_loadingDataTry = 0;

            if (xmlHttp.responseText.indexOf('"status":410') !== -1) Play_loadDataError();
            else Play_loadDataSuccess(xmlHttp.responseText);

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
            Play_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE);

        window.setTimeout(function() {
            Play_HideWarningDialog();
        }, 2000);
        Play_RestorePlayDataValues();
        Main_values.Play_WasPlaying = 0;
        Main_SaveValues();
    } else if (Play_OlddataSet()) Play_RestorePlayData(error_410);
    else if (!PlayExtra_PicturePicture) {

        if (Isforbiden) Play_ForbiddenLive();
        else Play_CheckHostStart(error_410);

    } else Play_CloseBigAndSwich(error_410);
}

function Play_OlddataSet() {
    return Play_data_old.data.length > 0;
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
    Play_data.qualities = [{
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
    Main_Set_history('live', Play_data.data);
}

function Play_loadDataSuccess(responseText) {
    if (Play_state === Play_STATE_LOADING_TOKEN) {
        Play_tokenResponse = JSON.parse(responseText);
        Play_state = Play_STATE_LOADING_PLAYLIST;
        Play_loadData();
    } else if (Play_state === Play_STATE_LOADING_PLAYLIST) {

        UserLiveFeed_Hide();

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

        Play_data.qualities = Play_extractQualities(responseText);
        Play_state = Play_STATE_PLAYING;
        if (Main_IsNotBrowser) Android.SetAuto(Play_data.AutoUrl);
        Play_data_old = JSON.parse(JSON.stringify(Play_data_base));
        if (Play_isOn) Play_qualityChanged();
        UserLiveFeed_PreventHide = false;
        ChatLive_Playing = true;

        if (!Play_data.isHost) Main_Set_history('live', Play_data.data);
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
    Play_data.qualityIndex = 1;
    Play_playingUrl = Play_data.qualities[1].url;

    for (var i = 0; i < Play_getQualitiesCount(); i++) {
        if (Play_data.qualities[i].id === Play_data.quality) {
            Play_data.qualityIndex = i;
            Play_playingUrl = Play_data.qualities[i].url;
            break;
        } else if (Play_data.qualities[i].id.indexOf(Play_data.quality) !== -1) { //make shore to set a value before break out
            Play_data.qualityIndex = i;
            Play_playingUrl = Play_data.qualities[i].url;
        }
    }

    Play_data.quality = Play_data.qualities[Play_data.qualityIndex].id;
    Play_data.qualityPlaying = Play_data.quality;

    Play_SetHtmlQuality('stream_quality');

    Play_state = Play_STATE_PLAYING;
    Play_onPlayer();
    //Play_PannelEndStart(1);
}

function Play_onPlayer() {
    if (Main_isDebug) console.log('Play_onPlayer:', '\n' + '\n"' + Play_playingUrl + '"\n');

    if (Main_IsNotBrowser && Play_isOn) {
        if (Play_data.quality.indexOf("Auto") !== -1 || PlayExtra_PicturePicture) Android.StartAuto(1, 0);
        else Android.startVideo(Play_playingUrl, 1);
    }

    if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
    Play_SetFullScreen(Play_isFullScreen);
    Play_Playing = true;
    ChatLive_Init(0);
}

function Play_SetHtmlQuality(element) {
    if (!Play_data.qualities[Play_data.qualityIndex] || !Play_data.qualities[Play_data.qualityIndex].hasOwnProperty('id')) return;

    Play_data.quality = Play_data.qualities[Play_data.qualityIndex].id;

    var quality_string = '';

    if (Play_data.quality.indexOf('source') !== -1) quality_string = Play_data.quality.replace("source", STR_SOURCE);
    else quality_string = Play_data.quality;

    quality_string += Play_data.quality.indexOf('Auto') === -1 ? Play_data.qualities[Play_data.qualityIndex].band + Play_data.qualities[Play_data.qualityIndex].codec : "";

    Main_innerHTML(element, quality_string);
}

//called by android PlayerActivity
function Play_PlayerCheck(mwhocall) { // Called only by JAVA
    if (document.hidden || !navigator.onLine) Play_EndStart(false, mwhocall);
    else if (mwhocall === 1) {

        if ((Play_data.qualityIndex < Play_getQualitiesCount() - 1)) {
            Play_data.qualityIndex++;
            Play_qualityDisplay(Play_getQualitiesCount, Play_data.qualityIndex, Play_SetHtmlQuality);
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
        Play_data.qualities = [];
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

    if (closePlayer) {
        Play_isOn = false;
        if (Play_MultiEnable) Play_controls[Play_MultiStream].enterKey(false);
    }

    if (!Play_isEndDialogVisible() || closePlayer) UserLiveFeed_Hide();

    Play_ClearPlay(closePlayer);
    Play_ClearPlayer();
}

function Play_exitMain() {

    if (AddUser_UserIsSet()) {
        AddCode_IsFallowing = false;
        Play_setFallow();
    } else Play_hideFallow();

    PlayExtra_HideChat();
    UserLiveFeed_PreventHide = false;
    PlayVod_ProgresBarrUpdate(0, 0);
    Main_ShowElement('scene1');
    Main_HideElement('scene2');
    Main_ReStartScreens();
}

function Play_ClearPlayer() {
    window.clearInterval(Play_ShowPanelStatusId);
    Play_hidePanel();
    Play_HideWarningDialog();
    if (!Play_EndDialogEnter) Play_HideEndDialog();
    Main_updateclock();
    Play_IncrementView = '';

    if (Play_data.qualities[1] && Play_data.qualityIndex === (Play_getQualitiesCount() - 1)) {
        if (Play_data.qualities[1].hasOwnProperty('id')) {
            Play_data.quality = Play_data.qualities[1].id;
            Play_data.qualityPlaying = Play_data.quality;
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

function Play_isPanelShown() {
    return document.getElementById("scene_channel_panel").style.opacity === '1';
}

function Play_hidePanel() {
    //return;//return;
    Play_clearHidePanel();
    Play_ForceHidePannel();
    Play_data.quality = Play_data.qualityPlaying;
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

    if (isLive && Play_data.qualityPlaying.indexOf("Auto") !== -1) Play_getVideoQuality(false, Play_SetHtmlQuality);
    else if (mwhocall === 2 && PlayVod_qualityPlaying.indexOf("Auto") !== -1) Play_getVideoQuality(false, PlayVod_SetHtmlQuality);

    Play_VideoStatus(isLive);
}

function Play_showPanel() {
    PlayVod_IconsBottonResetFocus();
    Play_qualityIndexReset();
    Play_qualityDisplay(Play_getQualitiesCount, Play_data.qualityIndex, Play_SetHtmlQuality);
    PlayExtra_ResetSpeed();
    PlayExtra_ResetAudio();
    if (Play_data.qualityPlaying.indexOf("Auto") === -1) Play_SetHtmlQuality('stream_quality');
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
        STR_WATCHING + Play_timeMs((new Date().getTime()) - (Play_data.watching_time)));

    Main_innerHTML("stream_live_time", STR_SINCE +
        (('00:00').indexOf(Play_created) !== -1 ? '00:00' : Play_streamLiveAt(Play_created)));

    if (!Play_Status_Always_On) {
        if (Main_IsNotBrowser) {
            if (Play_data.qualityPlaying.indexOf("Auto") !== -1) Play_getVideoQuality(false, Play_SetHtmlQuality);
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
        (showLatency ? (STR_BR + STR_LATENCY + Play_getBuffer(value[7])) : '') +
        (Play_MultiEnable ? (STR_BR + STR_WATCHING + Play_timeMs((new Date().getTime()) - (Play_data.watching_time))) : ''));
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
    return Play_data.qualities.length;
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
        ChatLive_Playing = true;
        ChatLive_MessagesRunAfterPause();
        Play_HideBufferDialog();

        Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i></div>');

        if (Play_isPanelShown()) {
            if (PlayVodClip === 1) Play_hidePanel();
            else if (PlayVodClip === 2) PlayVod_hidePanel();
            else if (PlayVodClip === 3) PlayClip_hidePanel();
        }

        if (Main_IsNotBrowser) Android.play(true);
    } else {
        ChatLive_Playing = false;
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
    if (PlayVodClip === 1) Play_DialogEndText = Play_data.data[1] + ' ' + STR_LIVE;
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
                PlayExtra_data.data[6] = '';
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
            }
        }
    } else if (Play_Endcounter === 1) {
        if (Main_values.Play_isHost) {
            Play_data.DisplaynameHost = Play_data.data[1] + STR_USER_HOSTING;
            Play_data.data[6] = Play_TargetHost.target_login;
            Play_data.data[1] = Play_TargetHost.target_display_name;
            Play_data.DisplaynameHost = Play_data.DisplaynameHost + Play_data.data[1];
            Android.play(false);
            Play_PreshutdownStream(false);

            document.body.addEventListener("keydown", Play_handleKeyDown, false);

            Play_data.data[14] = Play_TargetHost.target_id;
            Main_ready(Play_Start);
        } else {
            PlayClip_OpenVod();
            if (!PlayClip_HasVOD) canhide = false;
        }
    } else if (Play_Endcounter === 2) Play_OpenChannel(PlayVodClip);
    else if (Play_Endcounter === 3) {
        Play_OpenGame(PlayVodClip);
        if (Play_data.data[3] === '') canhide = false;
    }

    if (canhide) {
        Play_HideEndDialog();
        UserLiveFeed_Hide();
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
        Main_innerHTML("end_channel_name_text", Play_data.data[1]);
        Main_innerHTML("end_vod_title_text", Play_data.data[1] + STR_IS_NOW + STR_USER_HOSTING + Play_TargetHost.target_display_name);
    } else if (PlayVodClip === 1) { // play
        Play_EndIconsRemoveFocus();
        Play_Endcounter = 2;
        Play_EndIconsAddFocus();
        document.getElementById('dialog_end_-1').style.display = 'none';
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'none';

        Play_EndTextsReset();
        Main_innerHTML("end_channel_name_text", Play_data.data[1]);
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
    Main_textContent("end_game_name_text", Play_data.data[3]);
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
        if (Play_MultiEnable) {
            Play_data = JSON.parse(JSON.stringify(Play_MultiArray[Play_MultiFirstAvaileble()]));
        }
        Play_ClearPP();
        Main_values.Main_selectedChannel_id = Play_data.data[14];
        Main_values.Main_selectedChannel = Play_data.data[6];
        Main_values.Main_selectedChannelDisplayname = Play_data.data[1];
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

var Play_OpenGameId;
function Play_OpenGame(PlayVodClip) {
    if (Play_data.data[3] === '') {
        Play_clearHidePanel();
        Play_IsWarning = true;
        Play_showWarningDialog(STR_NO_GAME);
        window.clearTimeout(Play_OpenGameId);
        Play_OpenGameId = window.setTimeout(function() {
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

    if (Play_MultiEnable) {
        Play_data = JSON.parse(JSON.stringify(Play_MultiArray[Play_MultiFirstAvaileble()]));
    }
    Main_values.Main_gameSelected = Play_data.data[3];

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
    PlayExtra_data.data[6] = '';
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
    Play_data.qualityIndex = 0;
    for (var i = 0; i < Play_getQualitiesCount(); i++) {
        if (Play_data.qualities[i].id === Play_data.quality) {
            Play_data.qualityIndex = i;
            break;
        } else if (Play_data.qualities[i].id.indexOf(Play_data.quality) !== -1) { //make shore to set a value before break out
            Play_data.qualityIndex = i;
        }
    }
}

//called by android PlayerActivity
function Play_PannelEndStart(PlayVodClip) { // Called only by JAVA
    if (PlayVodClip === 1) { //live
        PlayExtra_PicturePicture = false;
        PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
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
        encodeURIComponent(Play_data.data[14]);
    BasehttpGet(theUrl, Play_loadingDataTimeout, 1, null, Play_CheckHost, Play_loadDataCheckHostError);
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
        Play_showWarningDialog(Play_data.data[1] + STR_IS_NOW + STR_USER_HOSTING + Play_TargetHost.target_display_name);
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

    if (Play_isEndDialogVisible() && !Play_EndFocus) {
        Play_EndFocus = true;
        UserLiveFeed_FeedRemoveFocus(UserLiveFeed_FeedPosX);
        Play_EndIconsAddFocus();
    } else if (Play_isEndDialogVisible() && !Play_ExitDialogVisible() && !Play_SingleClickExit) Play_showExitDialog();
    else if (Play_MultiDialogVisible()) Play_HideMultiDialog();
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
            if (Play_MultiEnable) Play_controls[Play_MultiStream].enterKey();
            else if (PlayExtra_PicturePicture) Play_CloseSmall();
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
            var text = PlayExtra_PicturePicture ? STR_EXIT_AGAIN_PICTURE : STR_EXIT_AGAIN;
            text = Play_MultiEnable ? STR_EXIT_AGAIN_MULTI : text;
            Main_textContent("play_dialog_exit_text", text);
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
        Play_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE);

    window.setTimeout(function() {
        Play_HideWarningDialog();
    }, 2500);

    PlayExtra_PicturePicture = false;
    if (PlayExtra_data.data.length > 0) {
        if (Main_IsNotBrowser) Android.mSwitchPlayer();
        PlayExtra_SwitchPlayer();
        if (Main_IsNotBrowser) Android.mClearSmallPlayer();

        Play_CleanHideExit();
    } else {
        if (Main_IsNotBrowser) Android.mClearSmallPlayer();
        Play_CheckHostStart(error_410);
    }
    PlayExtra_UnSetPanel();
}

function Play_CloseSmall() {
    if (Main_IsNotBrowser) {
        Android.mClearSmallPlayer();
        if (!Play_isFullScreen) {
            Play_isFullScreen = !Play_isFullScreen;
            Play_SetFullScreen(Play_isFullScreen);
        }
    }
    PlayExtra_updateStreamInfo();
    PlayExtra_PicturePicture = false;
    PlayExtra_data.data[6] = '';
    PlayExtra_UnSetPanel();
    Play_CleanHideExit();
}

function Play_handleKeyUp(e) {
    if (e.keyCode === KEY_ENTER) {
        Play_handleKeyUpClear();
        if (!PlayExtra_clear) Play_OpenLiveFeedCheck();
    } else if (e.keyCode === KEY_UP) {
        Play_handleKeyUpEndClear();
        if (!Play_EndUpclear) {
            if (Play_isEndDialogVisible()) Play_EndDialogUpDown(-1);
            else UserLiveFeed_KeyUpDown(-1);
        }
    }
}

function Play_EndDialogUpDown(adder) {

    Play_EndTextClear();
    if (UserLiveFeed_loadingData) return;

    if (Play_EndFocus) {
        Play_EndFocus = false;
        Play_EndIconsRemoveFocus();
        UserLiveFeed_FeedAddFocus(false, UserLiveFeed_FeedPosX);
    } else UserLiveFeed_KeyUpDown(adder);
}

function Play_OpenLiveFeedCheck() {
    if (Play_CheckLiveThumb()) Play_OpenLiveFeed();
}

function Play_OpenLiveFeed() {
    Play_SavePlayData();
    Play_PreshutdownStream(false);

    Main_values.Play_isHost = false;
    Play_UserLiveFeedPressed = true;
    Main_OpenLiveStream(UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX], UserLiveFeed_ids, Play_handleKeyDown);
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

function Play_RestorePlayData(error_410) {
    Play_HideBufferDialog();
    Play_state = Play_STATE_PLAYING;

    Play_showWarningDialog(error_410 ? STR_410_ERROR :
        Play_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE);

    window.setTimeout(function() {
        Play_HideWarningDialog();
    }, 2000);

    Play_RestorePlayDataValues();

    Main_SaveValues();
    Play_UpdateMainStream(true);
}

function Play_SavePlayData() {
    Play_data_old = JSON.parse(JSON.stringify(Play_data));
}

function Play_RestorePlayDataValues() {
    Play_data = JSON.parse(JSON.stringify(Play_data_old));
    Play_data_old = JSON.parse(JSON.stringify(Play_data_base));
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
    PlayExtra_PicturePicture = false;
    PlayExtra_data.data[6] = '';
    Play_shutdownStream();
}

function Play_Multi_SetPanel() {
    document.getElementById('controls_' + Play_controlsChatSide).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQuality).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQualityMini).style.display = 'none';
    document.getElementById('controls_' + Play_controlsAudio).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQualityMulti).style.display = '';
    document.getElementById('controls_' + Play_controlsAudioMulti).style.display = '';
    UserLiveFeed_Unset();
    ChatLive_Clear(1);
    PlayExtra_HideChat();
    Main_HideElement('stream_info');
    Main_ShowElement('dialog_multi_help');
    Main_ShowElement('stream_info_multi');
}

function Play_Multi_UnSetPanel(shutdown) {
    document.getElementById('controls_' + Play_controlsAudioMulti).style.display = 'none';
    document.getElementById('controls_' + Play_controlsChatSide).style.display = '';
    document.getElementById('controls_' + Play_controlsQuality).style.display = '';
    document.getElementById('controls_' + Play_controlsAudio).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQualityMini).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQualityMulti).style.display = 'none';
    UserLiveFeed_SetFeedPicText();
    Main_ShowElement('stream_info');
    Main_HideElement('stream_info_multi');
    Main_HideElement('dialog_multi_help');

    for (var i = 0; i < 4; i++) Play_MultiInfoReset(i);

    if (Play_MultiArray[0].data.length > 0 && Play_MultiArray[1].data.length > 0) {
        if (PlayExtra_PicturePicture) {
            PlayExtra_data = JSON.parse(JSON.stringify(Play_MultiArray[1]));

            if (!Play_isFullScreen) {
                Main_innerHTML('chat_container2_name_text', STR_SPACE + PlayExtra_data.data[1] + STR_SPACE);
                ChatLive_Init(1);
                PlayExtra_ShowChat();
                if (!Play_isChatShown()) {
                    Play_controls[Play_controlsChat].enterKey();
                    Play_showChat();
                    Play_ChatEnable = true;
                    Play_controls[Play_controlsChat].setLable();
                }
            }
        }
    } else {
        if (!Play_isFullScreen) {
            Play_controls[Play_controlsChat].enterKey();
            Play_showChat();
            Play_ChatEnable = true;
            Play_controls[Play_controlsChat].setLable();
        }
        PlayExtra_PicturePicture = false;
    }

    //Check if main player is open if not check if one is so it can be main
    var First = Play_MultiFirstAvaileble();
    if (First !== null) {
        var name = Play_data.data[14];
        Play_data = JSON.parse(JSON.stringify(Play_MultiArray[First]));

        if (name !== Play_data.data[14]) {
            if (First) Play_Start();
            else Play_UpdateMainStream();
        }

    } else if (shutdown) Play_shutdownStream();
}

function Play_MultiFirstAvaileble() {
    for (var i = 0; i < Play_MultiArray.length; i++) {
        if (Play_MultiArray[i].data.length > 0) return i;
    }
    return null;
}

function Play_UpdateMainStream(startChat) {
    if (!startChat) ChatLive_Init(0);

    //Restore info panel
    Main_innerHTML("stream_info_title", twemoji.parse(Play_data.data[2], false, true));
    Play_partnerIcon(Play_data.isHost ? Play_data.DisplaynameHost : Play_data.data[1], Play_data.data[10], true, Play_Lang);
    Main_textContent("stream_info_game", (Play_data.data[3] !== "" ? STR_PLAYING + Play_data.data[3] : ""));
    Main_innerHTML("stream_live_viewers", STR_SPACE + STR_FOR + Main_addCommas(Play_data.data[13]) + STR_SPACE + STR_VIEWER);
    Play_LoadLogo(document.getElementById('stream_info_icon'), IMG_404_BANNER);
    Play_LoadLogoSucess = true;
    Play_LoadLogo(document.getElementById('stream_info_icon'), Play_data.data[9]);
    Play_created = Play_data.data[12];
    Play_controls[Play_controlsChanelCont].setLable(Play_data.data[1]);
    Play_controls[Play_controlsGameCont].setLable(Play_data.data[3]);
    Main_innerHTML('chat_container_name_text', STR_SPACE + Play_data.data[1] + STR_SPACE);

    //Restore info panel from web
    Play_loadingInfoDataTry = 0;
    Play_updateStreamInfoStart();
}

function Play_MultiEnd(position) {
    Play_showWarningDialog(Play_MultiArray[position].data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE);
    window.setTimeout(function() {
        Play_HideWarningDialog();
    }, 2000);
    Play_MultiArray[position] = JSON.parse(JSON.stringify(Play_data_base));
    Play_MultiInfoReset(position);
    if (!Play_MultiHasOne()) {
        PlayExtra_PicturePicture = false;
        PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
        Play_CheckHostStart();
    }
}

function Play_MultiFirstClear() {
    for (var i = 0; i < Play_MultiArray.length; i++) {
        if (Play_MultiArray[i].data.length < 1) return i;
    }
    return 0;
}

function Play_MultiIsAlredyOPen(Id) {
    for (var i = 0; i < Play_MultiArray.length; i++) {
        if (Play_MultiArray[i].data.length > 0 && Play_MultiArray[i].data[14] === Id) {
            UserLiveFeed_ResetFeedId();
            return true;
        }
    }

    return false;
}

function Play_MultiIsFull() {
    return (Play_MultiArray[0].data.length > 0) &&
        (Play_MultiArray[1].data.length > 0) &&
        (Play_MultiArray[2].data.length > 0) &&
        (Play_MultiArray[3].data.length > 0);
}

function Play_MultiHasOne() {
    return (Play_MultiArray[0].data.length > 0) ||
        (Play_MultiArray[1].data.length > 0) ||
        (Play_MultiArray[2].data.length > 0) ||
        (Play_MultiArray[3].data.length > 0);
}

function Play_MultiStartPrestart(position) {
    var doc = Play_CheckLiveThumb();
    if (doc) {
        position = ((position || position === 0) ? position : Play_MultiFirstClear());
        if (!Play_MultiIsFull()) {
            if (position > 2) Main_HideElement('dialog_multi_help');
        } else {
            Main_HideElement('dialog_multi_help');
            Play_data_old = JSON.parse(JSON.stringify(Play_MultiArray[position]));
        }
        Play_MultiArray[position] = JSON.parse(JSON.stringify(Play_data_base));
        Play_MultiArray[position].data = doc;
        Play_MultiStart(
            position,
            Play_MultiArray[position].data[6],
            Play_MultiArray[position].data[1],
            0
        );
    }
}

function Play_MultiStart(pos, streamer, display_name, tryes) {
    var theUrl = 'https://api.twitch.tv/api/channels/' + streamer + '/access_token?platform=_';

    var xmlHttp = Android.mreadUrlHLS(theUrl);

    if (xmlHttp) Play_MultiStartSucessToken(JSON.parse(xmlHttp), pos, streamer, display_name, tryes);
    else Play_MultiStartErro(pos, streamer, display_name, tryes);
}

function Play_MultiStartErro(pos, streamer, display_name, tryes) {
    if (Play_isOn) {
        if (tryes < 5) Play_MultiStart(pos, streamer, display_name, tryes + 1);
        else Play_MultiStartFail(pos, display_name);
    }
}

function Play_MultiStartFail(pos, display_name, string_fail_reason) {
    Play_showWarningDialog(string_fail_reason ? string_fail_reason : (display_name + ' ' + STR_LIVE + STR_IS_OFFLINE));
    window.setTimeout(function() {
        Play_HideWarningDialog();
    }, 2000);

    if (Play_OlddataSet()) {

        Play_MultiArray[pos] = JSON.parse(JSON.stringify(Play_data_old));
        Play_data_old = JSON.parse(JSON.stringify(Play_data_base));

    } else {
        Play_MultiArray[pos] = JSON.parse(JSON.stringify(Play_data_base));
        Play_MultiInfoReset(pos);
        if (!Play_MultiHasOne()) {
            PlayExtra_PicturePicture = false;
            PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
            Play_CheckHostStart();
        }
    }
}

function Play_MultiStartSucessToken(xmlHttp, pos, streamer, display_name, tryes) {
    if (xmlHttp.status === 200) {
        var tokenResponse = JSON.parse(xmlHttp.responseText);
        //410 error
        if (!tokenResponse.hasOwnProperty('token') || !tokenResponse.hasOwnProperty('sig') ||
            xmlHttp.responseText.indexOf('"status":410') !== -1) {
            Play_MultiStartErro(pos, streamer, display_name, tryes);
            return;
        }

        var theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + streamer +
            '.m3u8?&token=' + encodeURIComponent(tokenResponse.token) + '&sig=' + tokenResponse.sig +
            '&reassignments_supported=true&playlist_include_framerate=true&fast_bread=true' +
            '&reassignments_supported=true&playlist_include_framerate=true&fast_bread=true&allow_source=true' +
            (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();

        Play_MultiStartQuality(pos, theUrl, display_name, 0);

    } else if (xmlHttp.status === 403) { //forbidden access
        Play_MultiStartFail(pos, display_name, STR_FORBIDDEN);
    } else if (xmlHttp.status === 404) { //off line
        Play_MultiStartFail(pos, display_name);
    } else Play_MultiStartErro(pos, streamer, display_name, tryes);
}

function Play_MultiStartQuality(pos, theUrl, display_name, tryes) {
    var xmlHttp = Android.mreadUrl(theUrl, 3000, 0, null);

    if (xmlHttp) {
        xmlHttp = JSON.parse(xmlHttp);

        if (xmlHttp.status === 200) {

            Play_MultiArray[pos].AutoUrl = theUrl;
            if (Play_MultiIsFull()) UserLiveFeed_Hide();

            try {
                Android.StartMultiStream(pos, theUrl);
            } catch (e) {}

            Play_MultiArray[pos].qualities = Play_extractQualities(xmlHttp.responseText);

            Play_MultiSetinfo(
                pos,
                Play_MultiArray[pos].data[3],
                Play_MultiArray[pos].data[13],
                Play_MultiArray[pos].data[1],
                Play_MultiArray[pos].data[8],
                Play_MultiArray[pos].data[9],
                twemoji.parse(Play_MultiArray[pos].data[2])
            );

            Play_MultiArray[pos].watching_time = new Date().getTime();
            Main_Set_history('live', Play_MultiArray[pos].data);

            //reset chat is pos 0 changed
            if (!pos && Play_data.data[14] !== Play_MultiArray[pos].data[14]) {
                Play_data = JSON.parse(JSON.stringify(Play_MultiArray[pos]));
                ChatLive_Init(0);
                Play_controls[Play_controlsChanelCont].setLable(Play_data.data[1]);
                Play_controls[Play_controlsGameCont].setLable(Play_data.data[3]);
            }
            Play_updateVodInfo(Play_MultiArray[pos].data[14], Play_MultiArray[pos].data[7], 0);
        } else if (xmlHttp.status === 403) { //forbidden access
            Play_MultiStartFail(pos, display_name, STR_FORBIDDEN);
        } else if (xmlHttp.status === 404) { //off line
            Play_MultiStartFail(pos, display_name);
        } else Play_MultiStartQualityError(pos, theUrl, display_name, tryes);

    } else Play_MultiStartQualityError(pos, theUrl, display_name, tryes);
}

function Play_MultiStartQualityError(pos, theUrl, display_name, tryes) {
    if (Play_isOn) {
        if (tryes < 5) Play_MultiStartQuality(pos, theUrl, display_name, tryes + 1);
        else Play_MultiStartFail(pos, display_name);
    }
}

var Play_MultiEnableKeyRightLeftId;

function Play_MultiEnableKeyRightLeft(adder) {
    Play_controls[Play_controlsAudioMulti].defaultValue += adder;

    if (Play_controls[Play_controlsAudioMulti].defaultValue > (Play_controls[Play_controlsAudioMulti].values.length - 1))
        Play_controls[Play_controlsAudioMulti].defaultValue = 0;
    else if (Play_controls[Play_controlsAudioMulti].defaultValue < 0)
        Play_controls[Play_controlsAudioMulti].defaultValue = (Play_controls[Play_controlsAudioMulti].values.length - 1);

    if (Play_controls[Play_controlsAudioMulti].defaultValue < 4 &&
        Play_MultiArray[Play_controls[Play_controlsAudioMulti].defaultValue].data.length < 1) {

        Play_MultiEnableKeyRightLeft(adder);
        return;
    }

    Play_controls[Play_controlsAudioMulti].enterKey();

    Play_showWarningDialog(STR_AUDIO_SOURCE + STR_SPACE +
        Play_controls[Play_controlsAudioMulti].values[Play_controls[Play_controlsAudioMulti].defaultValue] +
        ((Play_controls[Play_controlsAudioMulti].defaultValue < 4) ?
            (STR_SPACE + Play_MultiArray[Play_controls[Play_controlsAudioMulti].defaultValue].data[1]) : ''));

    window.clearTimeout(Play_MultiEnableKeyRightLeftId);
    Play_MultiEnableKeyRightLeftId = window.setTimeout(function() {
        Play_HideWarningDialog();
    }, 1000);
}

function Play_MultiInfoReset(pos) {
    Play_MultiSetinfo(
        pos,
        STR_SPACE,
        -1,
        STR_SPACE,
        false,
        IMG_404_LOGO,
        STR_MULTI_EMPTY
    );
}

function Play_MultiSetinfo(pos, game, views, displayname, is_rerun, logo, title) {
    Main_innerHTML('stream_info_multi_name' + pos,
        (displayname.indexOf(STR_USER_HOSTING) !== -1 ? displayname.split(STR_USER_HOSTING)[1] : displayname));
    document.getElementById('stream_info_multiimg' + pos).src = logo;
    Play_MultiUpdateinfo(pos, game, views, is_rerun, title);
}

function Play_MultiUpdateinfo(pos, game, views, is_rerun, title) {
    Main_innerHTML('stream_info_multi_title' + pos, title);
    Main_innerHTML('stream_info_multi_game' + pos, game === '' ? STR_SPACE : game);
    if (views < 0) Main_textContent("stream_info_multi_views" + pos, '');
    else {
        Main_innerHTML("stream_info_multi_views" + pos,
            '<i class="icon-' + (!is_rerun ? 'circle" style="color: red;' : 'refresh" style="') +
            ' font-size: 55%; "></i><div style="font-size: 58%;">' + Main_addCommas(views));
    }
}

function Play_MultiSetpannelInfo() {
    Main_textContent('stream_dialog_multi_title', STR_REPLACE_MULTI);
    Main_textContent('stream_dialog_multi_end', STR_REPLACE_MULTI_ENTER);
    for (var i = 0; i < 4; i++) {
        Main_innerHTML("stream_info_multiimgholder" + i,
            '<img id="stream_info_multiimg' + i + '" class="side_panel_channel_img" src="' + IMG_404_BANNER + '"' +
            'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');

        Main_innerHTML("stream_dialog_multiimgholder" + i,
            '<img id="stream_dialog_multiimg' + i + '" class="side_panel_channel_img" src="' + IMG_404_BANNER + '"' +
            'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');
    }
    Main_innerHTML("stream_dialog_multiimgholder-1",
        '<img id="stream_dialog_multiimg-1" class="side_panel_channel_img" src="' + IMG_404_BANNER + '"' +
        'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');
}

var Play_MultiDialogPos = 0;
function Play_MultiSetUpdateDialog(doc) {
    for (var i = 0; i < 4; i++) {
        Main_textContent('stream_dialog_multi_name' + i, Play_MultiArray[i].data[1]);
        document.getElementById('stream_dialog_multiimg' + i).src = Play_MultiArray[i].data[9];
        Main_innerHTML('stream_dialog_multi_game' + i, Play_MultiArray[i].data[3] === '' ? STR_SPACE : Play_MultiArray[i].data[3]);
        Main_innerHTML('stream_dialog_multi_title' + i, twemoji.parse(Play_MultiArray[i].data[2]));
    }

    Main_textContent('stream_dialog_multi_name-1', doc[1]);
    document.getElementById('stream_dialog_multiimg-1').src = doc[9];
    Main_innerHTML('stream_dialog_multi_game-1', doc[3] === '' ? STR_SPACE : doc[3]);
    Main_innerHTML('stream_dialog_multi_title-1', twemoji.parse(doc[2]));

    UserLiveFeed_Hide();
    Play_MultiDialogPos = 0;
    Play_MultiAddFocus();
    Play_ShowMultiDialog();
}

function Play_MultiAddFocus() {
    Main_AddClass('stream_dialog_multi_div' + Play_MultiDialogPos, 'side_panel_div_focused');
    Play_setHideMultiDialog();
}

function Play_MultiRemoveFocus() {
    Main_RemoveClass('stream_dialog_multi_div' + Play_MultiDialogPos, 'side_panel_div_focused');
}

function Play_ShowMultiDialog() {
    Main_ShowElement('dialog_multi');
}

function Play_HideMultiDialog() {
    Main_HideElement('dialog_multi');
    Play_clearHideMultiDialog();
    Play_MultiRemoveFocus();
}

function Play_MultiDialogVisible() {
    return Main_isElementShowing('dialog_multi');
}

function Play_clearHideMultiDialog() {
    window.clearTimeout(Play_HideMultiDialogID);
}

var Play_HideMultiDialogID;
function Play_setHideMultiDialog() {
    Play_clearHideMultiDialog();
    Play_HideMultiDialogID = window.setTimeout(Play_HideMultiDialog, 10000);
}

var Play_CheckLiveThumbID;
function Play_CheckLiveThumb(PreventResetFeed) {

    var doc = document.getElementById(UserLiveFeed_ids[8] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]),
        error = STR_STREAM_ERROR;

    if (doc !== null) {
        doc = JSON.parse(doc.getAttribute(Main_DataAttribute));

        if (Play_MultiEnable) {
            if (!Play_MultiIsAlredyOPen(doc[14])) return doc;
        } else if (Play_data.data[14] !== doc[14] && PlayExtra_data.data[14] !== doc[14]) return doc;

        error = STR_ALREDY_PLAYING;
    }

    Play_showWarningDialog(error);
    window.clearTimeout(Play_CheckLiveThumbID);
    Play_CheckLiveThumbID = window.setTimeout(function() {
        Play_HideWarningDialog();
    }, 1500);

    if (!PreventResetFeed) UserLiveFeed_ResetFeedId();
    return null;
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
                if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) UserLiveFeed_KeyRightLeft(-1);
                else if (Play_MultiDialogVisible()) {
                    Play_MultiRemoveFocus();
                    Play_MultiDialogPos--;
                    if (Play_MultiDialogPos < 0) Play_MultiDialogPos = 3;
                    Play_MultiAddFocus();
                } else if (Play_MultiEnable && !Play_isPanelShown()) Play_MultiEnableKeyRightLeft(-1);
                else if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown() &&
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
                if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) UserLiveFeed_KeyRightLeft(1);
                else if (Play_MultiDialogVisible()) {
                    Play_MultiRemoveFocus();
                    Play_MultiDialogPos++;
                    if (Play_MultiDialogPos > 3) Play_MultiDialogPos = 0;
                    Play_MultiAddFocus();
                } else if (Play_MultiEnable && !Play_isPanelShown()) Play_MultiEnableKeyRightLeft(1);
                else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible() &&
                    (!PlayExtra_PicturePicture || Play_MultiEnable)) {
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
                } else if (Play_MultiDialogVisible()) {
                    Play_MultiRemoveFocus();
                    Play_MultiDialogPos -= 2;
                    if (Play_MultiDialogPos < 0) Play_MultiDialogPos += 4;
                    Play_MultiAddFocus();
                } else if (!UserLiveFeed_isFeedShow() && AddUser_UserIsSet()) UserLiveFeed_ShowFeed();
                else if (Play_isEndDialogVisible() || UserLiveFeed_isFeedShow()) {
                    Play_EndTextClear();
                    document.body.removeEventListener("keydown", Play_handleKeyDown, false);
                    document.body.addEventListener("keyup", Play_handleKeyUp, false);
                    Play_EndUpclear = false;
                    Play_EndUpclearCalback = Play_handleKeyDown;
                    Play_EndUpclearID = window.setTimeout(Play_keyUpEnd, 250);
                }
                break;
            case KEY_DOWN:
                if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(1, -1);
                    Play_setHidePanel();
                } else if (Play_MultiDialogVisible()) {
                    Play_MultiRemoveFocus();
                    Play_MultiDialogPos += 2;
                    if (Play_MultiDialogPos > 3) Play_MultiDialogPos -= 4;
                    Play_MultiAddFocus();
                } else if (Play_isEndDialogVisible()) Play_EndDialogUpDown(1);
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_KeyUpDown(1);
                else if ((Play_isFullScreen || Play_MultiEnable) && Play_isChatShown() && (!PlayExtra_PicturePicture || Play_MultiEnable)) {
                    Play_KeyChatSizeChage();
                } else if (PlayExtra_PicturePicture && !Play_MultiEnable) {
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
                        if (Play_CheckLiveThumb(true)) {
                            Play_EndDialogEnter = 1;
                            Play_EndUpclearCalback = Play_handleKeyDown;
                            Play_OpenLiveFeed();
                        }
                    }
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 1) {
                        if (!Play_isEndDialogVisible()) Play_KeyPause(1);
                    } else Play_BottomOptionsPressed(1);
                    Play_setHidePanel();
                } else if (Play_MultiDialogVisible()) {
                    Play_HideMultiDialog();
                    Play_MultiStartPrestart(Play_MultiDialogPos);
                } else if (UserLiveFeed_isFeedShow()) {
                    if (Play_MultiEnable) {
                        if (Play_MultiIsFull()) {
                            var mdoc = Play_CheckLiveThumb();
                            if (mdoc) Play_MultiSetUpdateDialog(mdoc);
                        } else Play_MultiStartPrestart();
                    }
                    else {
                        document.body.removeEventListener("keydown", Play_handleKeyDown, false);
                        document.body.addEventListener("keyup", Play_handleKeyUp, false);
                        PlayExtra_clear = false;
                        UserLiveFeed_ResetFeedId();
                        PlayExtra_KeyEnterID = window.setTimeout(PlayExtra_KeyEnter, 250);
                    }
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
var Play_controlsQualityMulti = 8;
var Play_controlsLowLatency = 9;
var Play_MultiStream = 10;
var Play_controlsAudio = 11;
var Play_controlsAudioMulti = 12;
var Play_controlsChat = 13;
var Play_controlsChatSide = 14;
var Play_controlsChatForceDis = 15;
var Play_controlsChatPos = 16;
var Play_controlsChatSize = 17;
var Play_controlsChatBright = 18;
var Play_controlsChatFont = 19;
var Play_controlsChatDelay = 20;

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

            AddCode_Channel_id = (PlayVodClip === 1 ? Play_data.data[14] : Main_values.Main_selectedChannel_id);
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
                Play_data.quality = Play_data.qualities[Play_data.qualityIndex].id;
                Play_data.qualityPlaying = Play_data.quality;
                Play_playingUrl = Play_data.qualities[Play_data.qualityIndex].url;
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
        },
        updown: function(adder, PlayVodClip) {

            if (PlayVodClip === 1) {
                //TODO fix this reversed logic
                Play_data.qualityIndex += adder * -1;

                if (Play_data.qualityIndex > (Play_getQualitiesCount() - 1))
                    Play_data.qualityIndex = (Play_getQualitiesCount() - 1);
                else if (Play_data.qualityIndex < 0)
                    Play_data.qualityIndex = 0;

                Play_qualityDisplay(Play_getQualitiesCount, Play_data.qualityIndex, Play_SetHtmlQuality);
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

    Play_controls[Play_controlsQualityMulti] = { //quality for Multi
        icons: "videocamera",
        string: STR_PLAYER_RESYNC,
        values: [STR_PLAYER_MULTI_ALL, STR_PLAYER_WINDOW + 1, STR_PLAYER_WINDOW + 2, STR_PLAYER_WINDOW + 3, STR_PLAYER_WINDOW + 4],
        defaultValue: 0,
        opacity: 0,
        enterKey: function() {

            if (!this.defaultValue) {

                for (var i = 0; i < Play_MultiArray.length; i++) {
                    if (Play_MultiArray[i].data.length > 0) {
                        try {
                            Android.StartMultiStream(i, Play_MultiArray[i].AutoUrl);
                        } catch (e) {}
                    }
                }
            } else Android.StartMultiStream(this.defaultValue - 1, Play_MultiArray[this.defaultValue - 1].AutoUrl);

            Play_hidePanel();
            this.defaultValue = 0;
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

                if (Play_MultiEnable) {

                    for (var i = 0; i < Play_MultiArray.length; i++) {
                        if (Play_MultiArray[i].data.length > 0) {
                            try {
                                Android.StartMultiStream(i, Play_MultiArray[i].AutoUrl);
                            } catch (e) {}
                        }
                    }

                } else if (PlayExtra_PicturePicture) {
                    Android.ResStartAuto(Play_data.AutoUrl, 1, 0);
                    Android.ResStartAuto2(PlayExtra_data.AutoUrl);
                } else {
                    if (Play_data.quality.indexOf("Auto") !== -1) Android.SetAuto(Play_data.AutoUrl);
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

    Play_controls[Play_controlsAudio] = { //Audio
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

    Play_controls[Play_controlsAudioMulti] = { //Audio multi
        icons: "sound",
        string: STR_AUDIO_SOURCE,
        values: [STR_PLAYER_WINDOW + 1, STR_PLAYER_WINDOW + 2, STR_PLAYER_WINDOW + 3, STR_PLAYER_WINDOW + 4, STR_PLAYER_MULTI_ALL],
        defaultValue: 0,
        opacity: 0,
        enterKey: function() {

            try {
                Android.mSetPlayerAudioMulti(this.defaultValue);
            } catch (e) {}

            Play_hidePanel();

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

    Play_controls[Play_MultiStream] = { //multi
        icons: "multi",
        string: STR_4_WAY_MULTI,
        values: null,
        opacity: 0,
        enterKey: function(shutdown) {
            Play_MultiEnable = !Play_MultiEnable;
            if (Play_MultiEnable) {
                try {
                    Android.EnableMultiStream();
                    Play_hidePanel();
                } catch (e) {}

                Play_Multi_SetPanel();
                if (Play_data.quality.indexOf("Auto") === -1) {
                    Play_data.quality = "Auto";
                    Play_data.qualityPlaying = Play_data.quality;
                    Android.StartAuto(1, 0);
                }

                Play_controls[Play_controlsAudioMulti].enterKey();

                var i = 0;
                for (i; i < 4; i++) {
                    Play_MultiArray[i] = JSON.parse(JSON.stringify(Play_data_base));
                }

                Play_MultiArray[0] = JSON.parse(JSON.stringify(Play_data));
                Play_MultiSetinfo(
                    0,
                    Play_MultiArray[0].data[3],
                    Play_MultiArray[0].data[13],
                    Play_MultiArray[0].data[1],
                    Play_MultiArray[0].data[8],
                    Play_MultiArray[0].data[9],
                    twemoji.parse(Play_MultiArray[0].data[2])
                );

                if (PlayExtra_PicturePicture) {
                    Play_MultiArray[1] = JSON.parse(JSON.stringify(PlayExtra_data));
                    Play_MultiSetinfo(
                        1,
                        Play_MultiArray[1].data[3],
                        Play_MultiArray[1].data[13],
                        Play_MultiArray[1].data[1],
                        Play_MultiArray[1].data[8],
                        Play_MultiArray[1].data[9],
                        twemoji.parse(Play_MultiArray[1].data[2])
                    );
                }

                for (i = PlayExtra_PicturePicture ? 2 : 1; i < 4; i++) {
                    Play_MultiInfoReset(i);
                }

                if (Play_isChatShown()) Play_controls[Play_controlsChat].enterKey();

            } else {
                try {
                    Android.DisableMultiStream();
                } catch (e) {}

                Play_Multi_UnSetPanel(shutdown);
            }
        }
    };

    Play_controls[Play_controlsChat] = { //chat enable disable
        icons: "chat",
        string: STR_CHAT_SHOW,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function() {
            if (!Play_isFullScreen && !Play_MultiEnable) return;
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
                if (PlayExtra_PicturePicture && !Play_isFullScreen && !Play_MultiEnable) ChatLive_Init(1);
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
