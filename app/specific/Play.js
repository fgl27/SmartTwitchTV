//Variable initialization
var Play_ChatPositions = 0;
var Play_ChatPositionConvertBefore = Play_ChatPositions;
var Play_ChatBackground = 0.55;
var Play_ChatSizeValue = 2;
var Play_MaxChatSizeValue = 4;
var Play_PanelHideID = null;
var Play_isFullScreen = true;
var Play_ChatPositionsBF;
var Play_ChatEnableBF;
var Play_ChatSizeValueBF;
var Play_Buffer = 2000;
var Play_CurrentSpeed = 3;
var Play_PicturePicturePos = 4;
var Play_PicturePictureSize = 1;
var Play_controlsAudioPos = 1;
var Play_STATE_LOADING_TOKEN = 0;
var Play_STATE_PLAYING = 1;
var Play_state = 0;
var Play_Status_Always_On = false;
var Play_SingleClickExit = 0;
var Play_MultiEnable = false;
var Play_MultiArray = [];
var Play_LowLatency = false;
var Play_EndUpclear = false;
var Play_EndUpclearID;
var Play_EndUpclearCalback;
var Play_EndDialogEnter = 0;
var Play_PanneInfoDoclId;
var Play_Multi_MainBig = false;
var Play_Multi_Offset = 0;
var Play_DurationSeconds = 0;
var Play_seek_previews;
var Play_seek_previews_img;

var Play_streamInfoTimerId = null;
var Play_tokenResponse = 0;
var Play_playingTry = 0;

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
var Play_Endcounter = 0;
var Play_EndTextCounter = 3;
var Play_EndSettingsCounter = 3;
var Play_EndTextID = null;
var Play_EndFocus = false;
var Play_DialogEndText = '';
var Play_currentTime = 0;
var Play_ChatDelayPosition = 0;
//var Play_4K_ModeEnable = false;
var Play_TargetHost = '';
var Play_isLive = true;
var Play_RestoreFromResume = false;
var Play_updateStreamInfoErrorTry = 0;
var Play_chat_container;
var Play_ProgresBarrElm;
var Play_ProgresBarrBufferElm;
var Play_DefaultjumpTimers = [];
var Play_UserLiveFeedPressed = false;

//To pass to Java
var Play_live_token = "https://api.twitch.tv/api/channels/%x/access_token?platform=_";
var Play_live_links = "https://usher.ttvnw.net/api/channel/hls/%x.m3u8?&token=%s&sig=%s&reassignments_supported=true&playlist_include_framerate=true&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true&cdm=wv&p=%d";

var Play_vod_token = "https://api.twitch.tv/api/vods/%x/access_token?platform=_";
var Play_vod_links = "https://usher.ttvnw.net/vod/%x.m3u8?&nauth=%s&nauthsig=%s&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&cdm=wv&p=%d";

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
    playlist: null,
    qualityPlaying: "Auto",
    quality: "Auto",
    AutoUrl: '',
    resultId: 0
};

var Play_data = JSON.parse(JSON.stringify(Play_data_base));
var PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));

var Play_data_old = JSON.parse(JSON.stringify(Play_data_base));
var PlayExtra_Save_data = JSON.parse(JSON.stringify(Play_data_base));
var PlayExtra_data_old = JSON.parse(JSON.stringify(Play_data_base));

//Variable initialization end

function Play_PreStart() {
    Play_seek_previews = document.getElementById("seek_previews");
    Play_seek_previews_img = new Image();
    Play_chat_container = document.getElementById("chat_container");
    Play_ProgresBarrElm = document.getElementById("inner_progress_bar");
    Play_ProgresBarrBufferElm = document.getElementById("inner_progress_bar_buffer");
    Play_PanneInfoDoclId = document.getElementById("scene_channel_panel");

    Play_ChatPositions = Main_getItemInt('ChatPositionsValue', 0);
    Play_ChatSizeValue = Main_getItemInt('ChatSizeValue', 2);
    Play_ChatEnable = Main_getItemBool('ChatEnable', false);
    Play_isFullScreen = Main_getItemBool('Play_isFullScreen', true);
    Play_ChatBackground = (Main_values.ChatBackground * 0.05).toFixed(2);
    Play_ChatDelayPosition = Main_getItemInt('Play_ChatDelayPosition', 0);
    Play_PicturePicturePos = Main_getItemInt('Play_PicturePicturePos', 4);
    Play_PicturePictureSize = Main_getItemInt('Play_PicturePictureSize', 1);
    Play_controlsAudioPos = Main_getItemInt('Play_controlsAudioPos', 1);

    Play_LowLatency = Main_getItemBool('Play_LowLatency', false);

    if (Main_IsOnAndroid) {
        //TODO remove this after some app updates
        if (Play_PicturePictureSize > 2) {
            Play_PicturePictureSize = 0;
            Main_setItem('Play_PicturePictureSize', Play_PicturePictureSize);
        }
        Android.mSetPlayerPosition(Play_PicturePicturePos);
        Android.mSetPlayerSize(Play_PicturePictureSize);
        Android.mSetlatency(Play_LowLatency);
        Settings_PP_Workaround();
    }

    Play_SetQuality();

    Play_ChatSize(false);
    Play_ChatBackgroundChange(false);
    Play_SetChatFont();

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
    var changed = Play_isFullScreenold !== Play_isFullScreen;
    Play_isFullScreenold = Play_isFullScreen;

    if (isfull) {
        if (Play_ChatPositionsBF !== undefined) {
            if (changed) {
                Play_ChatPositions = Play_ChatPositionsBF;
                Play_ChatEnable = Play_ChatEnableBF;
                Play_ChatSizeValue = Play_ChatSizeValueBF;
            }
            if (!Play_ChatEnable) Play_hideChat();
        }
    } else {
        if (changed) {
            Play_ChatPositionsBF = Play_ChatPositions;
            Play_ChatEnableBF = Play_ChatEnable;
            Play_ChatSizeValueBF = Play_ChatSizeValue;
        }
        Play_SetChatSide();
    }
    Play_ChatSize(false);

    if (Main_IsOnAndroid) {
        if (PlayExtra_PicturePicture) Android.mupdatesizePP(Play_isFullScreen);
        else Android.mupdatesize(Play_isFullScreen);
    }

    Main_setItem('Play_isFullScreen', Play_isFullScreen);
}

function Play_SetChatSide() {
    Play_ChatPositions = 0;
    Play_showChat();
    Play_ChatEnable = true;
    Play_ChatSizeValue = Play_MaxChatSizeValue;
    Play_ChatPositionConvert(true);
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
    //Main_Log('Play_Start');

    Play_showBufferDialog();

    Play_LoadLogoSucess = false;
    PlayClip_HasVOD = true;
    //reset channel logo to prevent another channel logo
    Play_LoadLogo(document.getElementById('stream_info_icon'), IMG_404_BANNER);

    document.getElementById('controls_' + Play_MultiStream).style.display = '';
    document.getElementById('controls_' + Play_controlsOpenVod).style.display = 'none';
    document.getElementById('controls_' + Play_controlsChatDelay).style.display = '';
    document.getElementById('controls_' + Play_controlsLowLatency).style.display = '';
    document.getElementById('controls_' + Play_controlsChatSend).style.display = '';

    if (!PlayExtra_PicturePicture) PlayExtra_UnSetPanel();
    Play_CurrentSpeed = 3;

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
    Play_created = Play_timeMs(0);

    Main_textContent("stream_live_time", Play_created);
    Main_HideElement('progress_bar_div');

    Play_UserLiveFeedPressed = false;
    if (!Play_EndDialogEnter) {
        Play_EndSet(1);
        UserLiveFeed_SetFeedPicText();
    }

    Play_updateStreamInfoErrorTry = 0;
    Play_loadingInfoDataTimeout = 10000;
    Play_isLive = true;
    Play_tokenResponse = 0;
    Play_playingTry = 0;
    Play_isOn = true;
    Play_Playing = false;
    Play_state = Play_STATE_LOADING_TOKEN;

    if (!Play_CheckIfIsLiveResponseText) Play_loadData();
    else {

        Play_data.AutoUrl = Play_CheckIfIsLiveURL;
        Play_loadDataSuccessend(Play_CheckIfIsLiveResponseText);

        Play_CheckIfIsLiveCleanEnd();
    }

    if (!Main_IsOnAndroid) Play_UpdateMainStream(true, true);

    Play_streamInfoTimerId = Main_setInterval(Play_updateStreamInfo, 300000, Play_streamInfoTimerId);
}

// To Force a warn, not used regularly so keep commented out
//function Play_Warn(text) {
//    Play_showWarningMidleDialog(text);
//}

var Play_CheckIfIsLiveURL = '';
var Play_CheckIfIsLiveChannel = '';
var Play_CheckIfIsLiveResponseText = null;
var Play_CheckIfIsLiveId = 0;

function Play_CheckIfIsLiveStart(callback) {
    var doc = document.getElementById(UserLiveFeed_ids[8] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]);

    if (doc) {
        Play_showBufferDialog();

        var selectedChannelDisplayname = JSON.parse(doc.getAttribute(Main_DataAttribute));

        Play_CheckIfIsLiveId = (new Date().getTime());
        //TODO remove the try after some app updates
        try {
            Android.getStreamDataAsync(
                Play_live_token.replace('%x', selectedChannelDisplayname[6]),
                Play_live_links.replace('%x', selectedChannelDisplayname[6]),
                callback,
                Play_CheckIfIsLiveId,
                2//Main player runs on 0 extra player on 1 the check on 2
            );
        } catch (e) {
            Play_HideBufferDialog();
        }
    }

}

function Play_CheckIfIsLiveStartFail(text) {
    Play_HideBufferDialog();
    Play_CheckIfIsLiveCleanEnd();

    Play_showWarningMidleDialog(text, 2000);
}

function Play_CheckIfIsLiveClean() {//called from java
    Play_CheckIfIsLiveCleanEnd();
    if (Sidepannel_isShowing()) {
        Sidepannel_CheckIfIsLiveWarn(
            STR_IS_OFFLINE + STR_TOO_ERRORS,
            JSON.parse(document.getElementById(UserLiveFeed_side_ids[8] + Sidepannel_PosFeed).getAttribute(Main_DataAttribute))[1]
        );
    } else Play_showWarningMidleDialog(STR_STREAM_ERROR_SMALL, 2000);
}

function Play_CheckIfIsLiveCleanEnd() {
    Play_CheckIfIsLiveURL = '';
    Play_CheckIfIsLiveChannel = '';
    Play_CheckIfIsLiveResponseText = null;
}

function Play_CheckResume() {
    if (Play_isOn) Play_Resume();
    else if (PlayVod_isOn) PlayVod_Resume();
    else if (PlayClip_isOn) PlayClip_Resume();
    else if (Sidepannel_isShowing()) {
        Sidepannel_UpdateThumbDiv();
        Sidepannel_CheckIfIsLiveStart();
    }
}

function Play_Resume() {
    UserLiveFeed_Hide();

    ChatLive_Playing = true;
    Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i></div>');
    Play_showBufferDialog();
    Play_loadingInfoDataTimeout = 10000;
    Play_RestoreFromResume = true;
    Play_ResumeAfterOnlineCounter = 0;

    if (navigator.onLine) Play_ResumeAfterOnline();
    else Play_ResumeAfterOnlineId = Main_setInterval(Play_ResumeAfterOnline, 100, Play_ResumeAfterOnlineId);

    if (!Play_MultiEnable) Play_data.watching_time = new Date().getTime();

    Play_streamInfoTimerId = Main_setInterval(Play_updateStreamInfo, 300000, Play_streamInfoTimerId);
    Play_ShowPanelStatus(1);

}

function Play_ResumeAfterOnline() {
    if (navigator.onLine || Play_ResumeAfterOnlineCounter > 200) {
        Main_clearInterval(Play_ResumeAfterOnlineId);
        Play_CheckIfIsLiveCleanEnd();
        if (Play_MultiEnable) {
            Play_data_old = JSON.parse(JSON.stringify(Play_data_base));
            Play_data = JSON.parse(JSON.stringify(Play_MultiArray[Play_MultiFirstAvailable()]));
            ChatLive_Init(0);
            Play_data.watching_time = new Date().getTime();

            for (var i = 0; i < Play_MultiArray.length; i++) {
                if (Play_MultiArray[i].data.length > 0) {

                    Play_MultiStart(i);

                }
            }

        } else {
            Play_state = Play_STATE_LOADING_TOKEN;
            // TO test a if a stream has ended during a resume process force change this
            //PlayExtra_data.data[6] = 'testtt';
            //Play_data.data[6] = 'testtt';
            if (PlayExtra_PicturePicture) PlayExtra_Resume();
            Play_loadData();
        }
        Play_updateStreamInfo();
    }
    Play_ResumeAfterOnlineCounter++;
}

function Play_updateStreamInfoStart() {
    var theUrl = Main_kraken_api + 'streams/' + Play_data.data[14] + Main_TwithcV5Flag_I;
    BasexmlHttpGet(theUrl, Play_loadingInfoDataTimeout, 2, null, Play_updateStreamInfoStartValues, Play_updateStreamInfoStartError);
}

function Play_UpdateMainStreamDiv() {
    //Restore or set info panel
    Main_innerHTML("stream_info_title", twemoji.parse(Play_data.data[2], false, true));
    Main_innerHTML(
        "stream_info_name",
        Play_partnerIcon(
            Play_data.isHost ? Play_data.DisplaynameHost : Play_data.data[1],
            Play_data.data[10],
            true,
            Play_data.data[5] ? Play_data.data[5].split(' ')[1] : ''
        )
    );
    Main_textContent("stream_info_game", (Play_data.data[3] !== "" ? STR_PLAYING + Play_data.data[3] : ""));
    Main_innerHTML("stream_live_viewers", STR_SPACE + STR_FOR + Main_addCommas(Play_data.data[13]) + STR_SPACE + STR_VIEWER);
    Play_LoadLogoSucess = true;
    Play_LoadLogo(document.getElementById('stream_info_icon'), IMG_404_BANNER);
    Play_LoadLogo(document.getElementById('stream_info_icon'), Play_data.data[9]);
    Play_created = Play_data.data[12];
    Play_controls[Play_controlsChanelCont].setLable(Play_data.data[1]);
    Play_controls[Play_controlsGameCont].setLable(Play_data.data[3]);
    Main_innerHTML('chat_container_name_text', STR_SPACE + Play_data.data[1] + STR_SPACE);

    if (PlayExtra_PicturePicture) PlayExtra_UpdatePanel();
}

function Play_UpdateMainStream(startChat, refreshInfo) {
    if (startChat) {
        ChatLive_Init(0);
        Play_CheckFollow();
    }
    Play_UpdateMainStreamDiv();
    //Restore info panel from web
    Play_loadingInfoDataTry = 0;
    if (refreshInfo) Play_updateStreamInfoStart();
}

function Play_updateStreamInfoStartValues(response) {
    Play_CheckFollow();

    response = JSON.parse(response);
    if (response.stream !== null) {
        Play_updateStreamInfoEnd(response);
        Play_loadingInfoDataTry = 0;
        Play_updateVodInfo(response.stream.channel._id, response.stream._id, 0);
    }
}

function Play_CheckFollow() {
    if (AddUser_UserIsSet()) {
        AddCode_PlayRequest = true;
        AddCode_Channel_id = Play_data.data[14];
        AddCode_CheckFollow();
    } else Play_hideFollow();
}

function Play_updateStreamInfoEnd(response) {
    Play_data.data = ScreensObj_LiveCellArray(response.stream);

    Play_UpdateMainStreamDiv();

    Main_Set_history('live', Play_data.data);
}

function Play_updateStreamInfoStartError() {
    if (Play_loadingInfoDataTry < Play_loadingInfoDataTryMax) {
        Play_loadingInfoDataTimeout += 500;
        Main_setTimeout(
            function() {
                if (Play_isOn) Play_updateStreamInfoStart();
            },
            750
        );
        Play_loadingInfoDataTry++;
    } else Play_loadingInfoDataTry = 0;
}

function Play_updateStreamInfoValues(response) {
    response = JSON.parse(response);
    if (response.stream !== null) {

        Play_updateStreamInfoEnd(response);

        if (PlayExtra_PicturePicture) {
            Play_updateStreamInfoErrorTry = 0;
            PlayExtra_updateStreamInfo();
        }
    }
}

function Play_updateStreamInfoError() {
    if (Play_updateStreamInfoErrorTry < Play_loadingInfoDataTryMax) {
        Main_setTimeout(
            function() {
                if (Play_isOn) Play_updateStreamInfo();
                //give a second for it retry as the TV may be on coming from resume
            },
            750
        );
        Play_updateStreamInfoErrorTry++;
    } else Play_updateStreamInfoErrorTry = 0;
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
        Main_setTimeout(
            function() {
                if (Play_isOn) Play_updateVodInfo(Channel_id, BroadcastID, tryes + 1);
            },
            500
        );
    }
}

function Play_updateVodInfoSuccess(response, BroadcastID) {
    response = JSON.parse(response).videos;

    for (var i = 0; i < response.length; i++) {
        if (Main_A_includes_B(response[i].status, 'recording')) {

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
        Play_MultiArray[pos].data = ScreensObj_LiveCellArray(response.stream);

        if (!pos) {
            Play_controls[Play_controlsChanelCont].setLable(Play_MultiArray[pos].data[1]);
            Play_controls[Play_controlsGameCont].setLable(Play_MultiArray[pos].data[3]);
        }

        Play_MultiUpdateinfo(
            (pos + (4 - Play_Multi_Offset)) % 4,
            response.stream.game,
            response.stream.viewers,
            twemoji.parse(response.stream.channel.status, false, true),
            (Play_Multi_MainBig ? '_big' : '')
        );

        Main_Set_history('live', Play_MultiArray[pos].data);

    }
}

function Play_updateStreamInfoMultiError(theUrl, tryes, pos) {
    if (tryes < Play_loadingInfoDataTryMax) {
        Main_setTimeout(
            function() {
                if (Play_isOn) Play_RefreshMultiGet(theUrl, tryes + 1, pos);
                //give a second for it retry as the TV may be on coming from resume
            },
            2500
        );
    }
}

//When update this also update PlayExtra_updateStreamInfo
function Play_updateStreamInfo() {
    if (Play_MultiEnable) {
        for (var i = 0; i < Play_MultiArray.length; i++) {
            Play_updateStreamInfoMulti(i);
        }
    } else {
        var theUrl = Main_kraken_api + 'streams/' + Play_data.data[14] + Main_TwithcV5Flag_I;
        BasexmlHttpGet(theUrl, 3000, 2, null, Play_updateStreamInfoValues, Play_updateStreamInfoError);
    }
}

function Play_updateStreamInfoMulti(pos) {
    Main_setTimeout(
        function() {
            if (Play_MultiArray[pos].data.length > 0) {
                Play_RefreshMultiGet(
                    Main_kraken_api + 'streams/' + Play_MultiArray[pos].data[14] + Main_TwithcV5Flag_I,
                    0,
                    pos
                );
            }
        },
        (pos * 2000)
    );
}

function Play_LoadLogo(ImgObjet, link) {
    ImgObjet.onerror = function() {
        this.onerror = null;
        this.src = IMG_404_LOGO; //img fail to load a predefined logo
        Play_LoadLogoSucess = false;
    };
    ImgObjet.src = link;
}

var Play_loadDataId = 0;
function Play_loadData() {
    //Main_Log('Play_loadData');

    if (Main_IsOnAndroid) {

        Play_loadDataId = (new Date().getTime());
        //TODO remove the try after some app updates
        try {
            Android.getStreamDataAsync(
                Play_live_token.replace('%x', Play_data.data[6]),
                Play_live_links.replace('%x', Play_data.data[6]),
                'Play_loadDataResult',
                Play_loadDataId,
                0
            );
        } catch (e) {
            Play_loadDataErrorFinish();
        }

    } else Play_loadDataSuccessFake();
}

function Play_loadDataResult(response) {

    if (Play_isOn && response) {

        var responseObj = JSON.parse(response);

        if (responseObj.checkResult > 0 && responseObj.checkResult === Play_loadDataId) {

            if (responseObj.status === 200) {

                Play_data.AutoUrl = responseObj.url;
                Play_loadDataSuccessend(responseObj.responseText);
                return;

            } else if (responseObj.status === 1 || responseObj.status === 403 ||
                responseObj.status === 404 || responseObj.status === 410) {

                //404 = off line
                //403 = forbidden access
                //410 = api v3 is gone use v5 bug
                Play_loadDataErrorFinish(responseObj.status === 410, (responseObj.status === 403 || responseObj.status === 1));
                return;

            }

            Play_loadDataErrorFinish();
        }

    }
}

function Play_loadDataSuccessend(playlist) {
    UserLiveFeed_Hide();

    if (Play_EndDialogEnter === 2) PlayVod_PreshutdownStream(true);
    else if (Play_EndDialogEnter === 3) {
        PlayClip_PreshutdownStream(false);
        PlayClip_isOn = false;
    }

    Play_EndDialogEnter = 0;

    Play_EndSet(1);
    UserLiveFeed_SetFeedPicText();
    Play_HideEndDialog();
    Play_UpdateMainStream(true, true);

    Play_data.playlist = playlist;
    Play_state = Play_STATE_PLAYING;
    if (Play_isOn) Play_onPlayer();
    Play_data_old = JSON.parse(JSON.stringify(Play_data_base));
    UserLiveFeed_PreventHide = false;
    ChatLive_Playing = true;

    if (!Play_data.isHost) Main_Set_history('live', Play_data.data);
}


function Play_loadDataErrorFinish(error_410, Isforbiden) {
    if (Play_EndDialogEnter) {
        Play_EndDialogEnter = 0;
        Play_HideBufferDialog();

        Main_removeEventListener("keydown", Play_handleKeyDown);
        Main_addEventListener("keydown", Play_EndUpclearCalback);
        Play_state = Play_STATE_PLAYING;

        Play_showWarningMidleDialog(error_410 ? STR_410_ERROR :
            Play_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE,
            2000);

        Play_RestorePlayDataValues();
        Main_values.Play_WasPlaying = 0;
        Main_SaveValues();
    } else if (Play_OlddataSet()) Play_RestorePlayData(error_410, Isforbiden);
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
    Play_showWarningMidleDialog(STR_FORBIDDEN);
    Main_setTimeout(
        function() {
            if (Play_isOn) Play_CheckHostStart();
        },
        4000
    );
}

//Browsers crash trying to get the streams link
function Play_loadDataSuccessFake() {
    Play_data.qualities = [
        {
            'id': 'Auto',
            'band': 0,
            'codec': 'avc',
        },
        {
            'id': '1080p60 | source ',
            'band': '| 10.00Mbps',
            'codec': ' | avc',
        },
        {
            'id': '720p60',
            'band': ' | 5.00Mbps',
            'codec': ' | avc',
        },
        {
            'id': '720p',
            'band': ' | 2.50Mbps',
            'codec': ' | avc',
        },
        {
            'id': '480p',
            'band': ' | 2.50Mbps',
            'codec': ' | avc',
        },
        {
            'id': '320p',
            'band': ' | 2.50Mbps',
            'codec': ' | avc',
        },
    ];
    Play_state = Play_STATE_PLAYING;
    if (Play_isOn) Play_qualityChanged();
    if (!Play_data.isHost) Main_Set_history('live', Play_data.data);
}

function Play_qualityChanged() {
    Play_data.qualityIndex = 1;

    for (var i = 0; i < Play_getQualitiesCount(); i++) {
        if (Play_data.qualities[i].id === Play_data.quality) {
            Play_data.qualityIndex = i;
            break;
        } else if (Main_A_includes_B(Play_data.qualities[i].id, Play_data.quality)) { //make shore to set a value before break out
            Play_data.qualityIndex = i;
        }
    }

    Play_data.quality = Play_data.qualities[Play_data.qualityIndex].id;
    Play_data.qualityPlaying = Play_data.quality;

    Play_SetHtmlQuality('stream_quality');
    if (Main_IsOnAndroid) Android.SetQuality(Play_data.qualityIndex - 1);
    else Play_onPlayer();
    //Play_PannelEndStart(1);
}

var Play_getQualitiesFail = false;
function Play_getQualities(position, skipchange) {
    if (!Main_IsOnAndroid) return;

    var baseQualities = Android.getQualities();
    var result;

    if (baseQualities) {
        Play_getQualitiesFail = false;
        result = JSON.parse(baseQualities);

        if (result.length > 1) result[1].id += " | source";

        if (position === 1) {
            Play_data.qualities = result;
            if (!skipchange && !PlayExtra_PicturePicture && !Play_MultiEnable && !Main_A_includes_B(Play_data.quality, 'Auto')) Play_qualityChanged();
        } else {
            PlayVod_qualities = result;
            if (!skipchange && !Main_A_includes_B(PlayVod_quality, 'Auto')) PlayVod_qualityChanged();
        }
    } else Play_getQualitiesFail = true;
}

function Play_onPlayer() {
    //Main_Log('Play_onPlayer');

    if (Main_IsOnAndroid && Play_isOn) {
        Android.StartAuto(Play_data.AutoUrl, Play_data.playlist, 1, 0, 0);
    }

    if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
    Play_SetFullScreen(Play_isFullScreen);
    Play_Playing = true;
}

function Play_SetHtmlQuality(element) {
    if (!Play_data.qualities[Play_data.qualityIndex] || !Play_data.qualities[Play_data.qualityIndex].hasOwnProperty('id')) return;

    Play_data.quality = Play_data.qualities[Play_data.qualityIndex].id;

    var quality_string = '';

    if (Main_A_includes_B(Play_data.quality, 'source')) quality_string = Play_data.quality.replace("source", STR_SOURCE);
    else quality_string = Play_data.quality;

    quality_string += !Main_A_includes_B(Play_data.quality, 'Auto') ? Play_data.qualities[Play_data.qualityIndex].band + Play_data.qualities[Play_data.qualityIndex].codec : "";

    Main_innerHTML(element, quality_string);
}

function Play_PlayerCheck(mwhocall) { // Called only by JAVA
    if (mwhocall === 1) {

        Play_data.quality = "Auto";
        Play_data.qualityPlaying = Play_data.quality;
        Android.SetQuality(-1);
        Android.RestartPlayer(1, 0, 0);
        Play_qualityDisplay(Play_getQualitiesCount, 0, Play_SetHtmlQuality);
        Play_showWarningMidleDialog(STR_PLAYER_LAG, 2000);

    } else if (mwhocall === 2) {

        PlayVod_quality = "Auto";
        PlayVod_qualityPlaying = PlayVod_quality;
        Android.SetQuality(-1);
        Android.RestartPlayer(2, Android.gettime(), 0);
        Play_qualityDisplay(PlayVod_getQualitiesCount, 0, PlayVod_SetHtmlQuality);
        Play_showWarningMidleDialog(STR_PLAYER_LAG, 2000);

    } else if (mwhocall === 3) {
        if (document.hidden || !navigator.onLine) Play_EndStart(false, mwhocall);
        else if ((PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1)) {
            PlayClip_qualityIndex++;
            Play_qualityDisplay(PlayClip_getQualitiesCount, PlayClip_qualityIndex, PlayClip_SetHtmlQuality);
            PlayClip_qualityChanged();
            Play_showWarningMidleDialog(STR_PLAYER_SOURCE, 2000);
        } else Play_EndStart(false, 3);

    }
}

function Play_EndStart(hosting, PlayVodClip) {
    Main_values.Play_isHost = hosting;
    Play_EndSet(PlayVodClip);
    Play_PlayEndStart(PlayVodClip);
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
    //Main_Log('Play_shutdownStream ' + Play_isOn);
    if (Play_isOn) {
        Play_PreshutdownStream(true);
        Play_data.qualities = [];
        Main_values.Play_WasPlaying = 0;
        Play_exitMain();
    }
}

function Play_PreshutdownStream(closePlayer) {
    //Main_Log('Play_PreshutdownStream ' + closePlayer);
    if (Main_IsOnAndroid) {
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
    //Main_Log('Play_exitMain');
    if (AddUser_UserIsSet()) {
        AddCode_IsFollowing = false;
        Play_setFollow();
    } else Play_hideFollow();

    PlayExtra_HideChat();
    UserLiveFeed_PreventHide = false;
    PlayVod_ProgresBarrUpdate(0, 0);
    Play_HideBufferDialog();
    Main_showScene1Doc();
    Main_hideScene2Doc();
    Main_ReStartScreens();
}

function Play_ClearPlayer() {
    //Main_Log('Play_ClearPlayer');

    Main_clearInterval(Play_ShowPanelStatusId);
    Play_hidePanel();
    Play_HideWarningDialog();
    if (!Play_EndDialogEnter) Play_HideEndDialog();
    Main_updateclock();

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
    //Main_Log('Play_ClearPlay');

    Play_Playing = false;
    Main_removeEventListener("keydown", Play_handleKeyDown);
    if (clearChat) ChatLive_Clear(0);
    Main_clearInterval(Play_streamInfoTimerId);
    Play_IsWarning = false;
}

function Play_hideFollow() {
    Play_controls[Play_controlsFollow].setLable(STR_NOKEY);
    AddCode_IsFollowing = false;
}

function Play_showBufferDialog() {
    if (Main_IsOnAndroid) Android.mshowLoading(true);
    else Main_ShowElement('dialog_loading_play');
}

function Play_HideBufferDialog() {
    if (Main_IsOnAndroid) Android.mshowLoading(false);
    else Main_HideElement('dialog_loading_play');
}

var Play_showWarningDialogId;
function Play_showWarningDialog(text, timeout) {
    Main_innerHTML("dialog_warning_play_text", text);
    Main_ShowElement('dialog_warning_play');

    if (timeout) {
        Play_showWarningDialogId = Main_setTimeout(
            function() {
                Play_IsWarning = false;
                Play_HideWarningDialog();
            },
            timeout,
            Play_showWarningDialogId
        );
    } else Main_clearTimeout(Play_showWarningDialogId);
}

function Play_HideWarningDialog() {
    Main_HideElement('dialog_warning_play');
}

function Play_WarningDialogVisible() {
    return Main_isElementShowing('dialog_warning_play');
}

var Play_showWarningMidleDialogId;
function Play_showWarningMidleDialog(text, timeout) {
    Main_innerHTML("dialog_warning_play_middle_text", text);
    Main_ShowElement('dialog_warning_play_middle');

    if (timeout) {
        Play_showWarningMidleDialogId = Main_setTimeout(
            function() {
                Play_HideWarningMidleDialog();
            },
            timeout,
            Play_showWarningMidleDialogId
        );
    } else Main_clearTimeout(Play_showWarningMidleDialogId);
}

function Play_HideWarningMidleDialog() {
    Main_HideElement('dialog_warning_play_middle');
}

function Play_WarningMidleDialogVisible() {
    return Main_isElementShowing('dialog_warning_play_middle');
}

function Play_showExitDialog() {
    if (!Play_ExitDialogVisible()) {
        Main_ShowElement('play_dialog_exit');
        Play_exitID = Main_setTimeout(Play_showExitDialog, 3000, Play_exitID);
    } else {
        Play_CleanHideExit();
    }
}

function Play_CleanHideExit() {
    Main_clearTimeout(Play_exitID);
    Main_HideElement('play_dialog_exit');
}

function Play_ExitDialogVisible() {
    return Main_isElementShowing('play_dialog_exit');
}

function Play_isPanelShown() {
    return Play_PanneInfoDoclId.style.opacity === '1';
}

function Play_hidePanel() {
    //return;//return;
    Play_clearHidePanel();
    Play_ForceHidePannel();
    Play_data.quality = Play_data.qualityPlaying;
    Main_clearInterval(PlayVod_RefreshProgressBarrID);
}

function Play_ForceShowPannel() {
    Play_PanneInfoDoclId.style.opacity = "1";
    if (!Play_Status_Always_On) Main_ShowElement('playsideinfo');
    else Main_RemoveClass('playsideinfo', 'playsideinfofocus');
}

function Play_ForceHidePannel() {
    Play_PanneInfoDoclId.style.opacity = "0";
    if (!Play_Status_Always_On) Main_HideElement('playsideinfo');
    else Main_AddClass('playsideinfo', 'playsideinfofocus');
}

var Play_ShowPanelStatusId;
function Play_ShowPanelStatus(mwhocall) {
    if (Play_Status_Always_On) {

        if (Main_IsOnAndroid) {
            Play_ShowPanelStatusId = Main_setInterval(
                function() {
                    Play_UpdateStatus(mwhocall);
                },
                1000,
                Play_ShowPanelStatusId
            );
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

    if (isLive && Main_A_includes_B(Play_data.qualityPlaying, 'Auto')) Play_getVideoQuality(0);
    else if (mwhocall === 2 && Main_A_includes_B(PlayVod_qualityPlaying, 'Auto')) Play_getVideoQuality(1);
    Play_VideoStatus(isLive);
}

function Play_showPanel() {
    if (Play_getQualitiesFail) Play_getQualities(1, true);
    PlayVod_IconsBottonResetFocus();
    Play_qualityIndexReset();
    Play_qualityDisplay(Play_getQualitiesCount, Play_data.qualityIndex, Play_SetHtmlQuality);
    PlayExtra_ResetSpeed();
    PlayExtra_ResetAudio();
    if (!Main_A_includes_B(Play_data.qualityPlaying, 'Auto')) Play_SetHtmlQuality('stream_quality');
    Play_RefreshWatchingtime();
    PlayVod_RefreshProgressBarrID = Main_setInterval(Play_RefreshWatchingtime, 1000, PlayVod_RefreshProgressBarrID);
    Play_clock();
    Play_CleanHideExit();
    Play_ForceShowPannel();
    Play_clearHidePanel();
    Play_setHidePanel();
}

function Play_RefreshWatchingtime() {
    if (Play_MultiEnable) {

        var extraText = Play_Multi_MainBig ? 'big' : '', pos, i;

        for (i = 0; i < 4; i++) {
            pos = (i + (4 - Play_Multi_Offset)) % 4;
            if (Play_MultiArray[i].data.length > 0) {
                Main_innerHTML("stream_info_multi_watching_time" + extraText + pos, STR_WATCHING + Play_timeMs((new Date().getTime()) - (Play_MultiArray[i].watching_time)));
                Main_innerHTML('stream_info_multi_livetime' + extraText + pos, STR_SINCE + Play_streamLiveAt(Play_MultiArray[i].data[12]));
            } else {
                Main_innerHTML("stream_info_multi_watching_time" + extraText + pos, STR_SPACE);
                Main_innerHTML('stream_info_multi_livetime' + extraText + pos, STR_SPACE);
            }
        }

    } else if (PlayExtra_PicturePicture) {
        Main_innerHTML("stream_info_pp_watching_time0", STR_WATCHING + Play_timeMs((new Date().getTime()) - (Play_data.watching_time)));

        Main_innerHTML("stream_info_pp_livetime0", STR_SINCE +
            (Main_A_includes_B('00:00', Play_created) ? '00:00' : Play_streamLiveAt(Play_data.data[12])));

        Main_innerHTML("stream_info_pp_watching_time1", STR_WATCHING + Play_timeMs((new Date().getTime()) - (PlayExtra_data.watching_time)));

        Main_innerHTML("stream_info_pp_livetime1", STR_SINCE +
            (Main_A_includes_B('00:00', Play_created) ? '00:00' : Play_streamLiveAt(PlayExtra_data.data[12])));
    } else {
        Main_innerHTML("stream_watching_time", "," +
            STR_SPACE + STR_WATCHING + Play_timeMs((new Date().getTime()) - (Play_data.watching_time)));

        Main_innerHTML("stream_live_time", STR_SINCE +
            (Main_A_includes_B('00:00', Play_created) ? '00:00' : Play_streamLiveAt(Play_created)));
    }

    if (!Play_Status_Always_On) {
        if (Main_IsOnAndroid) {
            if (Main_A_includes_B(Play_data.qualityPlaying, 'Auto')) Play_getVideoQuality(0);
            Play_VideoStatus(true);
        } else Play_VideoStatusTest();
    }
}

function Play_VideoStatusTest() {
    Main_innerHTML("stream_status", STR_NET_SPEED + STR_SPACE + STR_SPACE + STR_SPACE + Play_getMbps(101 * 1000000) + ' (150.00 Avg) Mbps' +
        STR_BR + STR_NET_ACT + Play_getMbps(45 * 1000000) + ' (150.00 Avg) Mbps' + STR_BR + STR_DROOPED_FRAMES + '1000 (1000 Today)' +
        STR_BR + STR_BUFFER_HEALT + Play_getBuffer(100.37 * 1000) +
        STR_BR + STR_LATENCY + Play_getBuffer(100.37 * 1000) +
        STR_BR + STR_PING + " 100.00 (99.00 Avg) ms");
}

function Play_VideoStatus(showLatency) {
    Android.getVideoStatus(showLatency);
}

var Play_BufferSize = 0;
function Play_ShowVideoStatus(showLatency, Who_Called) {
    var value = Android.getVideoStatusString();

    if (value) value = JSON.parse(value);
    else return;

    Main_innerHTML("stream_status",
        STR_NET_SPEED + STR_SPACE + STR_SPACE + STR_SPACE + value[0] + STR_BR +
        STR_NET_ACT + value[1] + STR_BR +
        STR_DROOPED_FRAMES + value[2] + " (" + (value[3] < 10 ? STR_SPACE + STR_SPACE : "") + value[3] + STR_TODAY + STR_BR +
        STR_BUFFER_HEALT + value[4] +
        (showLatency ? (STR_BR + STR_LATENCY + value[5]) : '') +
        STR_BR + STR_PING + value[6]);

    if (Who_Called > 1) {
        Play_BufferSize = parseInt(value[7]);
        PlayVod_ProgresBarrUpdate((Android.gettime() / 1000), Play_DurationSeconds, !PlayVod_IsJumping);
    }
}

function Play_getMbps(value) {
    value = (parseInt(value) / 1000000).toFixed(2);

    return (parseInt(value) < 10 ? (STR_SPACE + STR_SPACE + value) : value);
}

function Play_getBuffer(value) {
    value = (value > 0 ? (value / 1000).toFixed(2) : 0);

    return (parseInt(value) < 10 ? (STR_SPACE + value) : value) + " s";
}

function Play_getVideoQuality(position) {
    Android.getVideoQuality(position);
}

function Play_ShowVideoQuality(position) {
    var value = Android.getVideoQualityString();

    if (!value) {
        if (!position) Play_SetHtmlQuality('stream_quality');
        else PlayVod_SetHtmlQuality('stream_quality');

        return;
    }

    Main_innerHTML("stream_quality", value);
}

function Play_clearHidePanel() {
    Main_clearTimeout(Play_PanelHideID);
    PlayVod_ProgressBaroffset = 0;
}

function Play_setHidePanel() {
    Play_PanelHideID = Main_setTimeout(Play_hidePanel, 5000, Play_PanelHideID);
}

function Play_showChat() {
    Play_ChatPosition();
    Play_ChatBackgroundChange(false);
    Play_chat_container.classList.remove('opacity_zero');

    Play_controls[Play_controlsChat].setLable();
}

function Play_hideChat() {
    Play_chat_container.classList.add('opacity_zero');
    Play_controls[Play_controlsChat].setLable();
}

function Play_isChatShown() {
    return !Main_A_includes_B(Play_chat_container.className, 'opacity_zero');
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
    Main_textContent("play_chat_dialog_text", DialogText);
    Main_ShowElement('play_chat_dialog');
    Play_ChatBackgroundID = Main_setTimeout(Play_hideChatBackgroundDialog, 1000, Play_ChatBackgroundID);
}

function Play_hideChatBackgroundDialog() {
    Main_HideElement('play_chat_dialog');
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
        } else if (Main_A_includes_B(Play_data.qualities[i].id, Play_data.quality)) { //make sure to set a value before break out
            Play_data.qualityIndex = i;
        }
    }
}

//called by android PlayerActivity
function Play_PannelEndStart(PlayVodClip) { // Called only by JAVA
    if (PlayVodClip === 1) { //live
        PlayExtra_ClearExtra();
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
    Main_clearInterval(Play_streamInfoTimerId);
    Main_setTimeout(Play_loadDataCheckHost, 50);
}

function Play_loadDataCheckHost() {
    var theUrl = 'https://tmi.twitch.tv/hosts?include_logins=1&host=' + encodeURIComponent(Play_data.data[14]);

    //TODO remove the try after some app updates
    try {
        Android.GetMethodUrlAsync(
            theUrl,//urlString
            Play_loadingDataTimeout,//timeout
            1,//HeaderQuantity
            null,//access_token
            null,//overwriteID
            null,//postMessage, null for get
            null,//Method, null for get
            'Play_CheckHostResult',//callback
            0,//checkResult
            0,//key
            11//thread
        );

    } catch (e) {
        BasehttpGet(theUrl, Play_loadingDataTimeout, 1, null, Play_CheckHost, Play_loadDataCheckHostError);
    }
}

function Play_CheckHostResult(result) {
    if (result) {
        var resultObj = JSON.parse(result);
        if (resultObj.status === 200) {
            Play_CheckHost(resultObj.responseText);
        } else {
            Play_loadDataCheckHostError();
        }
    }
    else Play_loadDataCheckHostError();
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
    Play_state = Play_STATE_PLAYING;

    if (Play_TargetHost.target_login !== undefined) {
        Play_IsWarning = true;
        var warning_text = Play_data.data[1] + STR_IS_NOW + STR_USER_HOSTING + Play_TargetHost.target_display_name;

        Main_values.Play_isHost = true;

        if (Settings_value.open_host.defaultValue) {
            Play_OpenHost();
            Play_showWarningDialog(warning_text, 4000);
            return;
        } else Play_EndSet(0);

        Play_showWarningDialog(warning_text, 4000);
    } else {
        Play_EndSet(1);
        Main_values.Play_isHost = false;
    }

    Play_PlayEndStart(1);
}

function Play_UpdateDuration(duration) { // Called only by JAVA
    if (duration > 0) {
        Play_DurationSeconds = duration / 1000;
        Main_textContent('progress_bar_duration', Play_timeS(Play_DurationSeconds));
        PlayVod_RefreshProgressBarr();
        if (!Play_Status_Always_On) Play_VideoStatus(false);
        if (PlayVod_isOn) PlayVod_muted_segments(PlayVod_muted_segments_value, true);//duration may have changed update the positions
    }
}

function Play_setFollow() {
    Play_controls[Play_controlsFollow].setLable(AddCode_IsFollowing ? STR_FOLLOWING : STR_FOLLOW, AddCode_IsFollowing);
}

function Play_CloseBigAndSwich(error_410) {
    Play_HideBufferDialog();
    Play_state = Play_STATE_PLAYING;

    Play_showWarningMidleDialog(error_410 ? STR_410_ERROR :
        Play_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE,
        2500);

    if (PlayExtra_data.data.length > 0) {
        if (Main_IsOnAndroid) Android.mSwitchPlayer();
        PlayExtra_SwitchPlayer();
        Play_CloseSmall();

    } else {
        if (Main_IsOnAndroid) Android.mClearSmallPlayer();
        Play_CheckHostStart(error_410);
    }
    PlayExtra_UnSetPanel();
}

function Play_CloseSmall() {
    PlayExtra_updateStreamInfo();
    PlayExtra_PicturePicture = false;

    if (Main_IsOnAndroid) {
        Android.mClearSmallPlayer();
        Play_SetFullScreen(Play_isFullScreen);
    }
    PlayExtra_UnSetPanel();
    Play_CleanHideExit();
    Play_getQualities(1, true);
}

function Play_EndDialogUpDown(adder) {

    Play_EndTextClear();
    if (UserLiveFeed_loadingData[UserLiveFeed_FeedPosX]) return;

    if (Play_EndFocus) {
        Play_EndFocus = false;
        Play_EndIconsRemoveFocus();
        UserLiveFeed_FeedAddFocus(false, UserLiveFeed_FeedPosX);
        Play_CleanHideExit();
    } else UserLiveFeed_KeyUpDown(adder);
}

function Play_OpenLiveFeedCheck() {
    if (Play_CheckIfIsLiveResponseText || Play_CheckLiveThumb()) Play_OpenLiveFeed();
}

function Play_OpenLiveFeed() {
    Play_SavePlayData();
    UserLiveFeed_Hide(true);

    Main_values.Play_isHost = false;
    Play_UserLiveFeedPressed = true;
    Main_OpenLiveStream(
        UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX],
        UserLiveFeed_ids,
        Play_handleKeyDown,
        !UserLiveFeed_CheckVod()
    );
}

function Play_RestorePlayData(error_410, Isforbiden) {
    Play_HideBufferDialog();
    Play_state = Play_STATE_PLAYING;

    Play_showWarningMidleDialog(error_410 ? STR_410_ERROR :
        Play_data.data[1] + ' ' + STR_LIVE + STR_BR + (Isforbiden ? STR_FORBIDDEN : STR_IS_OFFLINE),
        2000);

    Play_RestorePlayDataValues();

    Main_SaveValues();
}

function Play_SavePlayData() {
    Play_data_old = JSON.parse(JSON.stringify(Play_data));
}

function Play_RestorePlayDataValues() {
    Play_data = JSON.parse(JSON.stringify(Play_data_old));
    Play_data_old = JSON.parse(JSON.stringify(Play_data_base));
    Play_created = Play_data.data[12];
    Play_LoadLogo(document.getElementById('stream_info_icon'), Play_data.data[9]);
}

function Play_handleKeyUpClear() {
    Main_clearTimeout(PlayExtra_KeyEnterID);
    Main_removeEventListener("keyup", Play_handleKeyUp);
    if (!Main_isElementShowing('dialog_os')) Main_addEventListener("keydown", Play_handleKeyDown);
}

function Play_Exit() {
    Play_CleanHideExit();
    Play_hideChat();
    PlayExtra_ClearExtra();
    Play_shutdownStream();
}

function Play_Multi_SetPanel() {
    document.getElementById('controls_' + Play_controlsChatSide).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQuality).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQualityMini).style.display = 'none';
    document.getElementById('controls_' + Play_controlsAudio).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQualityMulti).style.display = '';
    document.getElementById('controls_' + Play_controlsAudioMulti).style.display = '';
    UserLiveFeed_SetMulti();
    ChatLive_Clear(1);
    PlayExtra_HideChat();
    Play_IconsRemoveFocus();
    Play_Panelcounter = Play_MultiStream;
    Play_IconsAddFocus();
    Main_HideElement('stream_info_pp');
    Main_HideElement('stream_info');
    Main_ShowElement('dialog_multi_help');
    Main_ShowElement('stream_info_multi');
}

function Play_Multi_UnSetPanelDivs(checkChat) {
    document.getElementById('controls_' + Play_controlsAudioMulti).style.display = 'none';
    document.getElementById('controls_' + Play_controlsChatSide).style.display = '';
    document.getElementById('controls_' + Play_controlsQuality).style.display = '';
    document.getElementById('controls_' + Play_controlsAudio).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQualityMini).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQualityMulti).style.display = 'none';
    UserLiveFeed_SetFeedPicText();
    Main_ShowElement('stream_info');
    Main_HideElement('stream_info_multi');
    Main_HideElement('stream_info_multi_big');
    Main_HideElement('dialog_multi_help');
    if (checkChat) Play_Multi_UnSetPanelDivsCheckChat();
    Main_SaveValues();
    Play_IconsRemoveFocus();
    Play_Panelcounter = Play_MultiStream;
    Play_IconsAddFocus();
    if (Play_Multi_MainBig) {
        Play_ResStoreChatPos();
        Play_Multi_MainBig = false;
    }
}

function Play_Multi_UnSetPanelDivsCheckChat() {
    if (!Play_isFullScreen) {
        Play_controls[Play_controlsChat].enterKey();
        Play_SetChatSide();
    }
}

function Play_Multi_UnSetPanel(shutdown) {
    Play_Multi_UnSetPanelDivs();
    for (var i = 0; i < 4; i++) Play_MultiInfoReset(i);

    var pos_0 = Play_Multi_Offset % 4;
    var pos_1 = (1 + Play_Multi_Offset) % 4;

    if (Play_MultiArray[pos_0].data.length > 0 && Play_MultiArray[pos_1].data.length > 0) {
        if (PlayExtra_PicturePicture) {
            PlayExtra_data = JSON.parse(JSON.stringify(Play_MultiArray[pos_1]));
            PlayExtra_SetPanel();
            Android.mSwitchPlayerAudio(Play_controls[Play_controlsAudio].defaultValue);

            if (Play_Multi_Offset) {
                Android.StartAuto(PlayExtra_data.AutoUrl, PlayExtra_data.playlist, 1, 0, 1);
            }

            if (!Play_isFullScreen) {
                Main_innerHTML('chat_container2_name_text', STR_SPACE + PlayExtra_data.data[1] + STR_SPACE);
                ChatLive_Init(1);
                PlayExtra_ShowChat();
            }
        }
    } else {
        Play_Multi_UnSetPanelDivsCheckChat();
        if (PlayExtra_PicturePicture) PlayExtra_UnSetPanel();
        PlayExtra_PicturePicture = false;
    }
    Play_Multi_UnSetPanelDivsCheckChat();

    //Check if main player is open if not check if one is so it can be main
    var First = (Play_MultiFirstAvailable() + Play_Multi_Offset) % 4;
    if (First !== null) {
        var name = Play_data.data[14];
        Play_data = JSON.parse(JSON.stringify(Play_MultiArray[First]));

        if ((name !== Play_data.data[14] || Play_Multi_Offset) && First) {
            Android.StartAuto(Play_data.AutoUrl, Play_data.playlist, 1, 0, 0);
            Play_UpdateMainStream(true, true);
            Play_MultiUpdateMain();
        } else Play_UpdateMainStream(name !== Play_data.data[14], name !== Play_data.data[14]);

    } else if (shutdown) Play_shutdownStream();

    Play_Multi_Offset = 0;
    Play_Oldaudio = Play_controls[Play_controlsAudio].defaultValue;
}

function Play_MultiFirstAvailable() {
    for (var i = 0; i < Play_MultiArray.length; i++) {
        if (Play_MultiArray[i].data.length > 0) return i;
    }
    return null;
}

function Play_MultiEnd(position) {
    Play_showWarningMidleDialog(Play_MultiArray[position].data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE, 2000);

    Play_MultiArray[position] = JSON.parse(JSON.stringify(Play_data_base));
    Play_MultiInfoReset(position);
    if (!Play_MultiHasOne()) {
        Play_MultiEnable = false;
        Android.DisableMultiStream();
        Play_Multi_UnSetPanelDivs(true);
        PlayExtra_ClearExtra();
        Play_CheckHostStart();
    } else {
        if (Play_Multi_MainBig && position === Play_Multi_Offset) {
            var tempAudio = Play_controls[Play_controlsAudioMulti].defaultValue === 4;
            Play_MultiEnableKeyRightLeft(1);
            if (tempAudio) Play_MultiKeyDownHold();
        } else if (Play_controls[Play_controlsAudioMulti].defaultValue !== 4 && position === Play_Multi_Offset) Play_MultiEnableKeyRightLeft(1);

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

        Play_MultiStart(position);

    }
}

function Play_MultiStart(pos) {
    if (Play_CheckIfIsLiveResponseText) {
        Play_MultiStartQualitySucess(
            pos,
            Play_CheckIfIsLiveURL,
            Play_CheckIfIsLiveResponseText
        );
        UserLiveFeed_CheckIfIsLiveSTop();
        return;
    }

    Play_MultiArray[pos].resultId = (new Date().getTime());
    //TODO remove the try after some app updates
    try {
        Android.getStreamDataAsync(
            Play_live_token.replace('%x', Play_MultiArray[pos].data[6]),
            Play_live_links.replace('%x', Play_MultiArray[pos].data[6]),
            'Play_MultiResult',
            Play_MultiArray[pos].resultId,
            pos
        );
    } catch (e) {
        Play_MultiStartFail(pos, Play_MultiArray[pos].data[1]);
    }

}

function Play_MultiResult(response, pos) {

    if (Play_MultiEnable && Play_isOn && response) {

        var responseObj = JSON.parse(response);

        if (responseObj.checkResult > 0 && responseObj.checkResult === Play_MultiArray[pos].resultId) {

            if (responseObj.status === 200) {

                Play_MultiStartQualitySucess(pos, responseObj.url, responseObj.responseText);
                return;

            } else if (responseObj.status === 1 || responseObj.status === 403) {

                Play_MultiStartFail(pos, Play_MultiArray[pos].data[1], STR_FORBIDDEN);
                return;

            } else if (responseObj.status === 404) {

                Play_MultiStartFail(pos, Play_MultiArray[pos].data[1]);
                return;

            }

            Play_MultiStartFail(pos, Play_MultiArray[pos].data[1]);
        }

    }
}

function Play_MultiStartFail(pos, display_name, string_fail_reason) {
    Play_showWarningMidleDialog(string_fail_reason ? string_fail_reason : (display_name + ' ' + STR_LIVE + STR_IS_OFFLINE), 2000);
    Play_HideBufferDialog();

    if (Play_OlddataSet()) {
        Play_MultiArray[pos] = JSON.parse(JSON.stringify(Play_data_old));
        Play_data_old = JSON.parse(JSON.stringify(Play_data_base));

    } else {
        Play_MultiArray[pos] = JSON.parse(JSON.stringify(Play_data_base));
        Play_MultiInfoReset(pos);
        if (!Play_MultiHasOne()) {
            Play_MultiEnable = false;
            Android.DisableMultiStream();
            Play_Multi_UnSetPanelDivs(true);
            PlayExtra_ClearExtra();
            Play_CheckHostStart();
        }
    }
}

function Play_MultiStartQualitySucess(pos, theUrl, playlist) {
    Play_MultiArray[pos].AutoUrl = theUrl;
    if (Play_MultiIsFull()) UserLiveFeed_Hide();

    Android.StartMultiStream(pos, theUrl, playlist);

    Play_MultiArray[pos].playlist = playlist;

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

    //reset chat and follow icon if pos 0 changed
    var tempPos = (pos + (4 - Play_Multi_Offset)) % 4;//revert the value to check for chat
    if (!tempPos && Play_data.data[14] !== Play_MultiArray[pos].data[14]) {
        Play_data = JSON.parse(JSON.stringify(Play_MultiArray[pos]));
        Play_MultiUpdateMain();
    }
    Play_updateVodInfo(Play_MultiArray[pos].data[14], Play_MultiArray[pos].data[7], 0);
    Play_data_old = JSON.parse(JSON.stringify(Play_data_base));

    Play_MultiCheckLiveFeed(pos);
}

function Play_MultiUpdateMain() {
    ChatLive_Init(0);
    Play_controls[Play_controlsChanelCont].setLable(Play_data.data[1]);
    Play_controls[Play_controlsGameCont].setLable(Play_data.data[3]);
    Play_CheckFollow();
    Main_SaveValues();
}

function Play_MultiCheckLiveFeed(pos) {
    Main_setTimeout(
        function() {
            if (Play_CheckIfIsLiveResponseText &&
                Main_A_equals_B(Play_MultiArray[pos].data[6], Play_CheckIfIsLiveChannel))
                UserLiveFeed_CheckIfIsLiveSTop();
        },
        1000
    );
}

function Play_MultiEnableKeyRightLeft(adder) {
    //reset audio value if on big as it may had be changed via hold down or bottom controls
    var IsAUdio_All;

    if (Play_Multi_MainBig) {
        Play_controls[Play_controlsAudioMulti].defaultValue = Play_Multi_Offset;
        IsAUdio_All = Play_AudioAll;
    }

    Play_controls[Play_controlsAudioMulti].defaultValue += adder;

    if (Play_controls[Play_controlsAudioMulti].defaultValue > (Play_controls[Play_controlsAudioMulti].values.length - 2)) {

        Play_controls[Play_controlsAudioMulti].defaultValue = 0;

    } else if (Play_controls[Play_controlsAudioMulti].defaultValue < 0) {

        Play_controls[Play_controlsAudioMulti].defaultValue = Play_controls[Play_controlsAudioMulti].values.length - 2;

    }

    if (!Play_MultiArray[Play_controls[Play_controlsAudioMulti].defaultValue].data.length) {
        //Prevent infity loop from first fun line
        if (Play_Multi_MainBig) Play_Multi_Offset = Play_controls[Play_controlsAudioMulti].defaultValue;

        Play_MultiEnableKeyRightLeft(adder);
        return;
    }

    if (Play_Multi_MainBig && Play_Multi_Offset !== Play_controls[Play_controlsAudioMulti].defaultValue) {

        Play_Multi_Offset = Play_controls[Play_controlsAudioMulti].defaultValue;

        Play_showWarningMidleDialog(
            STR_MAIN_WINDOW + STR_SPACE + Play_MultiArray[Play_Multi_Offset].data[1],
            2000
        );

        Android.EnableMultiStream(Play_Multi_MainBig, Play_Multi_Offset);
        Play_data = JSON.parse(JSON.stringify(Play_MultiArray[Play_Multi_Offset]));
        Play_MultiUpdateinfoMainBig('_big');
        Play_MultiUpdateMain();

        if (IsAUdio_All) Play_MultiKeyDownHold(true);

    } else Play_controls[Play_controlsAudioMulti].enterKey();
}

function Play_MultiUpdateinfoMainBig(extraText) {
    var pos;
    for (var i = 0; i < Play_MultiArray.length; i++) {

        if (Play_MultiArray[i].data.length > 0) {
            pos = (i + (4 - Play_Multi_Offset)) % 4;

            Main_innerHTML(
                'stream_info_multi_name' + extraText + pos,
                Play_partnerIcon(
                    Play_MultiArray[i].data[1],
                    Play_MultiArray[i].data[10],
                    true,
                    Play_MultiArray[i].data[5] ? Play_MultiArray[i].data[5].split(' ')[1] : '',
                    Play_MultiArray[i].data[8]
                )
            );

            document.getElementById('stream_info_multiimg' + extraText + pos).src = Play_MultiArray[i].data[9];

            Play_MultiUpdateinfo(
                pos,
                Play_MultiArray[i].data[3],
                Play_MultiArray[i].data[13],
                twemoji.parse(Play_MultiArray[i].data[2]),
                extraText
            );

        } else Play_MultiInfoReset(i);
    }
}

function Play_MultiInfoReset(pos) {
    Play_MultiSetinfo(
        pos,
        '',
        -1,
        '',
        false,
        IMG_404_LOGO,
        STR_MULTI_EMPTY
    );
}

function Play_MultiSetinfo(pos, game, views, displayname, is_rerun, logo, title) {

    Play_MultiArray[pos].isHost = Main_A_includes_B(displayname, STR_USER_HOSTING);

    if (Play_MultiArray[pos].isHost) {
        Play_MultiArray[pos].DisplaynameHost = displayname;
        Play_MultiArray[pos].data[1] = displayname.split(STR_USER_HOSTING)[1];
        displayname = Play_MultiArray[pos].data[1];
    }

    var partner = Play_MultiArray[pos].data[10];
    var lang = Play_MultiArray[pos].data[5] ? Play_MultiArray[pos].data[5].split(' ')[1] : '';

    pos = (pos + (4 - Play_Multi_Offset)) % 4;
    var extraText = Play_Multi_MainBig ? '_big' : '';
    document.getElementById('stream_info_multiimg' + extraText + pos).src = logo;

    Main_innerHTML(
        'stream_info_multi_name' + extraText + pos,
        displayname === '' ? STR_SPACE :
            Play_partnerIcon(
                displayname,
                partner,
                true,
                lang,
                is_rerun
            )
    );
    Play_MultiUpdateinfo(pos, game, views, title, extraText);
}

function Play_MultiUpdateinfo(pos, game, views, title, extraText) {
    Main_innerHTML('stream_info_multi_title' + extraText + pos, title);
    Main_innerHTML('stream_info_multi_game' + extraText + pos, game === '' ? STR_SPACE : STR_PLAYING + game);
    Main_innerHTML('stream_info_multi_views' + extraText + pos, (views > 0) ? (STR_SPACE + STR_FOR + Main_addCommas(views) + STR_SPACE + STR_VIEWER) : STR_SPACE);
}

function Play_MultiSetpannelInfo() {
    Main_textContent('stream_dialog_multi_title', STR_REPLACE_MULTI);
    Main_textContent('stream_dialog_multi_end', STR_REPLACE_MULTI_ENTER);
    for (var i = 0; i < 4; i++) {
        Main_innerHTML("stream_info_multiimgholder" + i,
            '<img id="stream_info_multiimg' + i + '" alt="" class="multi_info_img" src="' + IMG_404_BANNER + '"' +
            'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');

        Main_innerHTML("stream_info_multiimgholder_big" + i,
            '<img id="stream_info_multiimg_big' + i + '" alt="" class="multi_info_img_big" src="' + IMG_404_BANNER + '"' +
            'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');

        Main_innerHTML("stream_dialog_multiimgholder_big" + i,
            '<img id="stream_dialog_multiimg_big' + i + '" alt="" class="side_panel_channel_img" src="' + IMG_404_BANNER + '"' +
            'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');

        Main_innerHTML("stream_dialog_multiimgholder" + i,
            '<img id="stream_dialog_multiimg' + i + '" alt="" class="side_panel_channel_img" src="' + IMG_404_BANNER + '"' +
            'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');
    }

    var doc = document.getElementById('stream_info_multiimg_big0');
    doc.style.width = '16.5%';
    doc.style.marginTop = '-0.5%';

    Main_innerHTML("stream_dialog_multiimgholder-1",
        '<img id="stream_dialog_multiimg-1" alt="" class="side_panel_channel_img" src="' + IMG_404_BANNER + '"' +
        'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');

    Main_innerHTML("stream_info_ppimgholder0",
        '<img id="stream_info_ppimg0" alt="" class="panel_pp_img" src="' + IMG_404_BANNER + '"' +
        'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');

    Main_innerHTML("stream_info_ppimgholder1",
        '<img id="stream_info_ppimg1" alt="" class="panel_pp_img" src="' + IMG_404_BANNER + '"' +
        'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');
}

var Play_MultiDialogPos = 0;
function Play_MultiSetUpdateDialog(doc) {
    var pos;
    var extraText = Play_Multi_MainBig ? '_big' : '';

    for (var i = 0; i < 4; i++) {
        pos = (i + (4 - Play_Multi_Offset)) % 4;
        Main_textContent('stream_dialog_multi_name' + extraText + pos, Play_MultiArray[i].data[1]);
        document.getElementById('stream_dialog_multiimg' + extraText + pos).src = Play_MultiArray[i].data[9];
        Main_innerHTML('stream_dialog_multi_game' + extraText + pos, Play_MultiArray[i].data[3] === '' ? STR_SPACE : Play_MultiArray[i].data[3]);
        Main_innerHTML('stream_dialog_multi_title' + extraText + pos, twemoji.parse(Play_MultiArray[i].data[2]));
    }

    Main_textContent('stream_dialog_multi_name-1', (Main_A_includes_B(doc[1], STR_USER_HOSTING) ? doc[1].split(STR_USER_HOSTING)[1] : doc[1]));
    document.getElementById('stream_dialog_multiimg-1').src = doc[9];
    Main_innerHTML('stream_dialog_multi_game-1', doc[3] === '' ? STR_SPACE : doc[3]);
    Main_innerHTML('stream_dialog_multi_title-1', twemoji.parse(doc[2]));

    UserLiveFeed_Hide(true);
    Play_MultiDialogPos = 0;
    Play_MultiAddFocus();
    Play_ShowMultiDialog();
}

function Play_MultiAddFocus() {
    Main_AddClass('stream_dialog_multi_div' + (Play_Multi_MainBig ? '_big' : '') + Play_MultiDialogPos, 'side_panel_div_focused');
    Play_setHideMultiDialog();
}

function Play_MultiRemoveFocus() {
    Main_RemoveClass('stream_dialog_multi_div' + (Play_Multi_MainBig ? '_big' : '') + Play_MultiDialogPos, 'side_panel_div_focused');
}

function Play_ShowMultiDialog() {
    var doc = document.getElementById('dialog_multi');
    if (Play_Multi_MainBig) {
        Main_HideElement('stream_dialog_multi_4');
        Main_ShowElement('stream_dialog_multi_big');
        //doc.style.width = '97%';
        doc.style.setProperty('width', '97%', 'important');
        doc.style.left = '1.5%';
    } else {
        Main_HideElement('stream_dialog_multi_big');
        Main_ShowElement('stream_dialog_multi_4');
        doc.style.width = '';
        doc.style.left = '';
    }

    Main_ShowElementWithEle(doc);
}

function Play_HideMultiDialog(PreventcleanQuailities) {
    //return;
    Main_HideElement('dialog_multi');
    Play_clearHideMultiDialog();
    Play_MultiRemoveFocus();
    if (!PreventcleanQuailities) Play_CheckIfIsLiveCleanEnd();
}

function Play_MultiDialogVisible() {
    return Main_isElementShowing('dialog_multi');
}

function Play_clearHideMultiDialog() {
    Main_clearTimeout(Play_HideMultiDialogID);
}

var Play_HideMultiDialogID;
function Play_setHideMultiDialog() {
    Play_clearHideMultiDialog();
    Play_HideMultiDialogID = Main_setTimeout(Play_HideMultiDialog, 10000, Play_HideMultiDialogID);
}

var Play_StoreChatPosValue = {
    height: '',
    marginTop: '',
    top: '',
    left: ''
};

function Play_StoreChatPos() {
    Play_StoreChatPosValue.height = Play_chat_container.style.height;
    Play_StoreChatPosValue.marginTop = document.getElementById("play_chat_dialog").style.marginTop;
    Play_StoreChatPosValue.top = Play_chat_container.style.top;
    Play_StoreChatPosValue.left = Play_chat_container.style.left;
}

function Play_ResStoreChatPos() {
    Play_chat_container.style.width = '';
    if (!Play_ChatEnable) Play_hideChat();
    Play_chat_container.style.height = Play_StoreChatPosValue.height;
    document.getElementById("play_chat_dialog").style.marginTop = Play_StoreChatPosValue.marginTop;
    Play_chat_container.style.top = Play_StoreChatPosValue.top;
    Play_chat_container.style.left = Play_StoreChatPosValue.left;
}

function Play_AudioChangeRight() {
    Play_controls[Play_controlsAudio].defaultValue++;
    if (Play_controls[Play_controlsAudio].defaultValue > (Play_controls[Play_controlsAudio].values.length - 2)) Play_controls[Play_controlsAudio].defaultValue = 0;
    Play_controls[Play_controlsAudio].enterKey();
}

function Play_AudioChangeLeft() {
    Play_controls[Play_controlsAudio].defaultValue--;
    if (Play_controls[Play_controlsAudio].defaultValue < 0) Play_controls[Play_controlsAudio].defaultValue = (Play_controls[Play_controlsAudio].values.length - 2);
    Play_controls[Play_controlsAudio].enterKey();
}