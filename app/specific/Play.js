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

var Play_ChatEnable = false;
var Play_exitID = null;

var Play_created = '';

var Play_loadingInfoDataTry = 0;

var Play_ResumeAfterOnlineCounter = 0;
var Play_ResumeAfterOnlineId;
var Play_isOn = false;
var Play_ChatBackgroundID = null;
var Play_Playing = false;
var Play_IsWarning = false;
var Play_LoadLogoSucess = false;
var Play_Endcounter = 0;
var Play_EndTextCounter = 3;
var Play_EndSettingsCounter = 3;
var Play_EndTextID = null;
var Play_EndFocus = false;
var Play_DialogEndText = '';
var Play_ChatDelayPosition = 0;
//var Play_4K_ModeEnable = false;
var Play_TargetHost = '';
var Play_chat_container;
var Play_ProgresBarrElm;
var Play_ProgresBarrBufferElm;
var Play_DefaultjumpTimers = [];

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

var Play_ChatFontObj = [];

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

    if (Main_IsOn_OSInterface) {
        //TODO remove this after some app updates
        if (Play_PicturePictureSize > 2) {
            Play_PicturePictureSize = 0;
            Main_setItem('Play_PicturePictureSize', Play_PicturePictureSize);
        }
        OSInterface_mSetPlayerPosition(Play_PicturePicturePos);
        OSInterface_mSetPlayerSize(Play_PicturePictureSize);
        OSInterface_mSetlatency(Play_LowLatency);
        Settings_PP_Workaround();
    }

    Play_SetQuality();

    var i = 25, max = 301;
    for (i; i < max; i++) {
        Play_ChatFontObj.push(i);
    }
    if (Main_values.Chat_font_size_new > (Play_ChatFontObj.length - 1)) Main_values.Chat_font_size_new = Play_ChatFontObj.length - 1;

    Play_ChatSize(false);
    Play_ChatBackgroundChange(false);
    Play_SetChatFont();

    Main_innerHTML(
        'user_feed_notify_img_holder',
        '<img id="user_feed_notify_img" alt="" class="notify_img" src="' + IMG_404_LOGO +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';" >'
    );
    Play_MultiSetpannelInfo();

    Play_MakeControls();
    Play_SetControls();
    Play_SetFullScreen(Play_isFullScreen);
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

    if (Main_IsOn_OSInterface) {
        if (PlayExtra_PicturePicture) OSInterface_mupdatesizePP(Play_isFullScreen);
        else OSInterface_mupdatesize(Play_isFullScreen);
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
    document.getElementById('chat_inner_container').style.fontSize = Play_ChatFontObj[Main_values.Chat_font_size_new] + '%';
    document.getElementById('chat_inner_container2').style.fontSize = Play_ChatFontObj[Main_values.Chat_font_size_new] + '%';
}

function Play_Start() {
    //Main_Log('Play_Start');

    Play_LoadLogoSucess = false;
    //reset channel logo to prevent another channel logo
    Play_LoadLogo(document.getElementById('stream_info_icon'), IMG_404_BANNER);

    document.getElementById('controls_' + Play_MultiStream).style.display = '';
    document.getElementById('controls_' + Play_controlsOpenVod).style.display = 'none';
    document.getElementById('controls_' + Play_controlsChatDelay).style.display = '';
    document.getElementById('controls_' + Play_controlsLowLatency).style.display = '';
    document.getElementById('controls_' + Play_controlsChatSend).style.display = '';

    if (!PlayExtra_PicturePicture) PlayExtra_UnSetPanel();

    PlayClip_HideShowNext(0, 0);
    PlayClip_HideShowNext(1, 0);
    Main_HideElement('progress_bar_div');
    Main_ShowElement('controls_holder');

    Play_data.isHost = Main_values.Play_isHost;
    Main_values.Play_isHost = false;

    Play_data.watching_time = new Date().getTime();
    Main_innerHTML("stream_watching_time", "," + STR_SPACE + STR_WATCHING + Play_timeS(0));
    Play_created = Play_timeMs(0);

    Main_textContent("stream_live_time", Play_created);

    Play_isOn = true;
    Play_Playing = false;
    Play_state = Play_STATE_LOADING_TOKEN;

    if (!Play_PreviewId) {
        Play_showBufferDialog();
        Play_loadData();
    } else {

        Play_data.AutoUrl = Play_PreviewURL;
        Play_loadDataSuccessend(Play_PreviewResponseText);

        Play_CheckIfIsLiveCleanEnd();
        Play_getQualities(1, true);
    }

    Play_CurrentSpeed = 3;

    Play_ShowPanelStatus(1);
    Play_IconsResetFocus();

    if (!Main_IsOn_OSInterface) Play_UpdateMainStream(true, true);

    Play_streamInfoTimerId = Main_setInterval(Play_updateStreamInfo, (1000 * 60 * 3), Play_streamInfoTimerId);

    Main_values.Play_WasPlaying = 1;
    Main_SaveValues();
}

// To Force a warn, not used regularly so keep commented out
//function Play_Warn(text) {
//    Play_showWarningMidleDialog(text);
//}

var Play_PreviewURL = '';
var Play_PreviewId = 0;
var Play_PreviewResponseText = '';
var Play_PreviewCheckId = 0;

function Play_CheckIfIsLiveStart(callback) {
    var doc = document.getElementById(UserLiveFeed_ids[3] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]);

    if (doc) {
        Play_showBufferDialog();

        var selectedChannelDisplayname = JSON.parse(doc.getAttribute(Main_DataAttribute));

        Play_PreviewCheckId = (new Date().getTime());

        OSInterface_getStreamDataAsync(
            Play_live_token.replace('%x', selectedChannelDisplayname[6]),
            Play_live_links.replace('%x', selectedChannelDisplayname[6]),
            callback,
            Play_PreviewCheckId,
            2,//Main player runs on 0 extra player on 1 the check on 2
            DefaultHttpGetReTryMax,
            DefaultHttpGetTimeout
        );
    }

}

function Play_CheckIfIsLiveStartFail(text) {
    Play_HideBufferDialog();
    Play_CheckIfIsLiveCleanEnd();

    Play_showWarningMidleDialog(text, 2000);
}

function Play_CheckIfIsLiveClean() {//called from java

    if (Sidepannel_isShowing()) {

        Sidepannel_CheckIfIsLiveWarn(
            STR_IS_OFFLINE + STR_TOO_ERRORS,
            JSON.parse(document.getElementById(UserLiveFeed_side_ids[3] + Sidepannel_PosFeed).getAttribute(Main_DataAttribute))[1]
        );

    } else if (Main_isScene1DocShown()) {

        Screens_LoadPreviewWarn(
            STR_PREVIEW_END,
            '',
            Screens_Current_Key
        );

    } else {

        Play_CheckIfIsLiveStartFail(STR_STREAM_ERROR_SMALL);

    }
}

function Play_CheckIfIsLiveCleanEnd() {
    Play_PreviewURL = '';
    Play_PreviewId = 0;
    Play_PreviewResponseText = '';
}

function Play_CheckResume() {
    if (Play_isOn) Play_Resume();
    else if (PlayVod_isOn) PlayVod_Resume();
    else if (PlayClip_isOn) PlayClip_Resume();
    else if (Sidepannel_isShowing()) {
        Sidepannel_UpdateThumbDiv();
        if (Settings_Obj_default('show_side_player')) Sidepannel_CheckIfIsLiveStart();
    }
}

function Play_Resume() {
    UserLiveFeed_Hide();

    ChatLive_Playing = true;
    Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i></div>');
    Play_showBufferDialog();
    Play_ResumeAfterOnlineCounter = 0;

    if (navigator.onLine) Play_ResumeAfterOnline();
    else Play_ResumeAfterOnlineId = Main_setInterval(Play_ResumeAfterOnline, 100, Play_ResumeAfterOnlineId);

    if (!Play_MultiEnable) Play_data.watching_time = new Date().getTime();

    Play_streamInfoTimerId = Main_setInterval(Play_updateStreamInfo, (1000 * 60 * 3), Play_streamInfoTimerId);
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

            var i = 0, len = Play_MultiArray.length;
            for (i; i < len; i++) {
                if (Play_MultiArray[i].data.length > 0) {

                    Play_MultiStart(i);

                }
            }

        } else {
            Play_state = Play_STATE_LOADING_TOKEN;
            // TO test a if a stream has ended during a resume process force change this
            //PlayExtra_data.data[6] = 'testtt';
            //PlayExtra_data.data[14] = 'id';
            //Play_data.data[6] = 'testtt';
            //Play_data.data[14] = id;
            if (PlayExtra_PicturePicture) PlayExtra_Resume(true);
            Play_loadData();
        }
        Play_updateStreamInfo();
    }
    Play_ResumeAfterOnlineCounter++;
}

function Play_getStreamData(channel_name) {

    return OSInterface_getStreamData(
        Play_live_token.replace('%x', channel_name),
        Play_live_links.replace('%x', channel_name),
        DefaultHttpGetReTryMax,
        DefaultHttpGetTimeout
    );

}

function Play_updateStreamInfoStart() {
    var theUrl = Main_kraken_api + 'streams/' + Play_data.data[14] + Main_TwithcV5Flag_I;
    BasexmlHttpGet(
        theUrl,
        (DefaultHttpGetTimeout * 2) + (Play_loadingInfoDataTry * DefaultHttpGetTimeoutPlus),
        2,
        null,
        Play_updateStreamInfoStartValues,
        Play_updateStreamInfoStartError
    );
}

function Play_UpdateMainStreamDiv() {
    //Restore or set info panel
    Main_innerHTML("stream_info_title", twemoji.parse(Play_data.data[2], false, true));
    Main_innerHTML(
        "stream_info_name",
        Play_partnerIcon(
            Play_data.isHost ? Play_data.DisplaynameHost : Play_data.data[1],
            Play_data.data[10],
            0,
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
    if (Play_loadingInfoDataTry < DefaultHttpGetReTryMax) {
        Main_setTimeout(
            function() {
                if (Play_isOn) Play_updateStreamInfoStart();
            },
            750
        );
        Play_loadingInfoDataTry++;
    } else {
        Play_loadingInfoDataTry = 0;

        if (Play_isOn && Play_data.data.length > 0) {

            Main_Set_history('live', Play_data.data);

        }
    }
}

function Play_updateVodInfo(Channel_id, BroadcastID, tryes) {
    var theUrl = Main_kraken_api + 'channels/' + Channel_id + '/videos?limit=100&broadcast_type=archive&sort=time',
        xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = (DefaultHttpGetTimeout * 2) + (tryes * DefaultHttpGetTimeoutPlus);

    for (var i = 0; i < 2; i++)
        xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

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

    var i = 0, len = response.length;
    for (i; i < len; i++) {
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

function Play_updateStreamInfo() {
    if (Play_MultiEnable) {
        var i = 0, len = Play_MultiArray.length;
        for (i; i < len; i++) {
            Play_updateStreamInfoMulti(i);
        }
    } else {
        //When update this also update PlayExtra_updateStreamInfo
        Play_updateStreamInfoGet(
            Main_kraken_api + 'streams/' + Play_data.data[14] + Main_TwithcV5Flag_I,
            0,
            true
        );
    }
}

function Play_updateStreamInfoGet(theUrl, tryes, Is_play) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = (DefaultHttpGetTimeout * 2) + (tryes * DefaultHttpGetTimeoutPlus);

    for (var i = 0; i < 2; i++)
        xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                Play_updateStreamInfoValues(xmlHttp.responseText, Is_play);
            } else {
                Play_updateStreamInfoGetError(theUrl, tryes, Is_play);
            }
        }
    };

    xmlHttp.send(null);
}

function Play_updateStreamInfoValues(response, Is_play) {
    response = JSON.parse(response);

    if (response.stream !== null) {

        if (Is_play) {
            Play_updateStreamInfoEnd(response);

            if (PlayExtra_PicturePicture) {
                PlayExtra_updateStreamInfo();
            }

        } else {
            var tempData = ScreensObj_LiveCellArray(response.stream);
            Main_Set_history('live', tempData);

            //if ... Player is playing ... else... was closed by Play_CloseSmall just Main_history_UpdateLive
            if (PlayExtra_data.data.length > 0) {
                PlayExtra_data.data = tempData;

                PlayExtra_UpdatePanel();
            }
        }
    }
}

function Play_updateStreamInfoGetError(theUrl, tryes, Is_play) {
    if (tryes < DefaultHttpGetReTryMax) {
        Main_setTimeout(
            function() {
                if (Play_isOn) Play_updateStreamInfoGet(theUrl, tryes + 1, Is_play);
                //give a second for it retry as the TV may be on coming from resume
            },
            750
        );
    } else if (Play_isOn) {

        //we fail but we still watching so update the time
        if (Is_play && Play_data.data.length > 0) {

            Main_Set_history('live', Play_data.data);

        } else if (!Is_play && PlayExtra_data.data.length > 0) {

            Main_Set_history('live', PlayExtra_data.data);
        }

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
function Play_loadData(synchronous) {
    //Main_Log('Play_loadData');

    if (Main_IsOn_OSInterface) {

        Play_loadDataId = (new Date().getTime());

        //On resume to avoid out of sync resumes we run PP synchronous
        if (synchronous) {

            var StreamData = Play_getStreamData(Play_data.data[6]);

            if (StreamData) Play_loadDataResultEnd(JSON.parse(StreamData));
            else Play_loadDataErrorFinish();

        } else {
            OSInterface_getStreamDataAsync(
                Play_live_token.replace('%x', Play_data.data[6]),
                Play_live_links.replace('%x', Play_data.data[6]),
                'Play_loadDataResult',
                Play_loadDataId,
                0,
                DefaultHttpGetReTryMax,
                DefaultHttpGetTimeout
            );
        }

    } else Play_loadDataSuccessFake();
}

function Play_loadDataResult(response) {

    if (Play_isOn && response) {

        var responseObj = JSON.parse(response);

        if (responseObj.checkResult > 0 && responseObj.checkResult === Play_loadDataId) {

            Play_loadDataResultEnd(responseObj);
        }

    }
}

function Play_loadDataResultEnd(responseObj) {

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
    Play_showWarningMidleDialog(STR_FORBIDDEN, 3000);

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
    Play_SetExternalQualities(Play_data.qualities, 1);
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
    if (Main_IsOn_OSInterface) OSInterface_SetQuality(Play_data.qualityIndex - 1);
    else Play_onPlayer();
    //Play_PannelEndStart(1);
}

var Play_getQualitiesFail = false;
function Play_getQualities(position, skipchange) {
    if (!Main_IsOn_OSInterface) return;

    var baseQualities = OSInterface_getQualities();
    var result;

    if (baseQualities) {
        Play_getQualitiesFail = false;
        result = JSON.parse(baseQualities);

        if (result.length > 1) result[1].id += " | source";

        if (position === 1) {
            Play_data.qualities = result;
            if (!skipchange && !PlayExtra_PicturePicture && !Play_MultiEnable && !Main_A_includes_B(Play_data.quality, 'Auto')) Play_qualityChanged();
            if (Play_data.playlist) Play_SetExternalQualities(Play_extractQualities(Play_data.playlist), 0, Play_data.data[1]);
        } else {
            PlayVod_qualities = result;
            if (!skipchange && !Main_A_includes_B(PlayVod_quality, 'Auto')) PlayVod_qualityChanged();
            if (PlayVod_playlist) Play_SetExternalQualities(Play_extractQualities(PlayVod_playlist), 0);
        }
    } else Play_getQualitiesFail = true;
}

var Play_ExternalUrls = [];
function Play_SetExternalQualities(array, startPos, name) {
    var i;

    Play_controls[Play_controlsExternal].values = [];
    Play_ExternalUrls = [];

    for (i = array.length - 1; i >= startPos; i--) {
        Play_ExternalUrls.push(array[i].url);
        Play_controls[Play_controlsExternal].values.push(array[i].id);
    }
    Play_controls[Play_controlsExternal].defaultValue = Play_controls[Play_controlsExternal].values.length - 1;
    Play_controls[Play_controlsExternal].setLable();

    Main_innerHTML('extra_button_text' + Play_controlsExternal, STR_OPEN_EXTERNAL_PLAYER + (name ? STR_SPACE + '(' + name + ')' : ''));

    Main_Log('Play_SetExternalQualities ' + JSON.stringify(array) + ' name ' + name);
}

function Play_extractQualities(input) {
    var result = [],
        addedresolution = {},
        marray,
        marray2,
        Regexp = /#EXT-X-MEDIA:(.)*\n#EXT-X-STREAM-INF:(.)*\n(.)*/g,
        Regexp2 = /NAME="(.+?)".*BANDWIDTH=(\d+).*CODECS="(.+?)".*(http(.*))/g;

    while ((marray = Regexp.exec(input))) {
        while ((marray2 = Regexp2.exec(marray[0].replace(/(\r\n|\n|\r)/gm, "")))) {
            if (!result.length) {

                if (!Main_A_includes_B(marray2[1], 'ource')) marray2[1] = marray2[1] + ' | ' + STR_SOURCE;
                else if (marray2[1]) marray2[1] = marray2[1].replace('(', '| ').replace(')', '').replace("source", STR_SOURCE);

                result.push({
                    'id': marray2[1] + Play_extractBand(marray2[2]) + Play_extractCodec(marray2[3]),
                    'url': marray2[4]
                });
                addedresolution[marray2[1].split(' | ')[0]] = 1;
            } else {
                //Prevent duplicated resolution 720p60 source and 720p60
                if (!addedresolution[marray2[1]]) {
                    result.push({
                        'id': marray2[1] + Play_extractBand(marray2[2]) + Play_extractCodec(marray2[3]),
                        'url': marray2[4]
                    });
                    addedresolution[marray2[1]] = 1;
                }
            }
        }
    }
    return result;
}

function Play_extractBand(input) {
    input = parseInt(input);
    return input > 0 ? ' | ' + parseFloat(input / 1000000).toFixed(2) + 'Mbps' : '';
}

function Play_extractCodec(input) {
    if (Main_A_includes_B(input, 'avc')) return ' | avc';
    else if (Main_A_includes_B(input, 'vp9')) return ' | vp9';
    else if (Main_A_includes_B(input, 'mp4')) return ' | mp4';
    return '';
}

function Play_onPlayer() {
    //Main_Log('Play_onPlayer');

    if (Main_IsOn_OSInterface && Play_isOn) {
        OSInterface_StartAuto(Play_data.AutoUrl, Play_data.playlist, 1, 0, 0);
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
        OSInterface_SetQuality(-1);
        OSInterface_RestartPlayer(1, 0, 0);
        Play_qualityDisplay(Play_getQualitiesCount, 0, Play_SetHtmlQuality, Play_controlsQuality);
        Play_showWarningMidleDialog(STR_PLAYER_LAG, 2000);

    } else if (mwhocall === 2) {

        PlayVod_quality = "Auto";
        PlayVod_qualityPlaying = PlayVod_quality;
        OSInterface_SetQuality(-1);
        OSInterface_RestartPlayer(2, OSInterface_gettime(), 0);
        Play_qualityDisplay(PlayVod_getQualitiesCount, 0, PlayVod_SetHtmlQuality, Play_controlsQuality);
        Play_showWarningMidleDialog(STR_PLAYER_LAG, 2000);

    } else if (mwhocall === 3) {
        if (document.hidden || !navigator.onLine) Play_EndStart(false, mwhocall);
        else if ((PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1)) {
            PlayClip_qualityIndex++;
            Play_qualityDisplay(PlayClip_getQualitiesCount, PlayClip_qualityIndex, PlayClip_SetHtmlQuality, Play_controlsQuality);
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
        Main_values.Play_WasPlaying = 0;
        Play_exitMain();
        Play_data = JSON.parse(JSON.stringify(Play_data_base));
    }
}

function Play_PreshutdownStream(closePlayer) {
    //Main_Log('Play_PreshutdownStream ' + closePlayer);
    if (Main_IsOn_OSInterface) {
        if (closePlayer) {
            //We are closing the player on error or on end
            OSInterface_mClearSmallPlayer();
            if (!Play_PreviewId) OSInterface_stopVideo(1);
        }
    }

    if (closePlayer) {
        Play_isOn = false;
        if (Play_MultiEnable) Play_controls[Play_MultiStream].enterKey(false);
    }

    if ((!Play_isEndDialogVisible() || closePlayer)) {
        if (!Play_PreviewId) UserLiveFeed_Hide();
        else UserLiveFeed_HideAfter();
    }

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
    if (Main_IsOn_OSInterface) OSInterface_mshowLoading(true);
    else Main_ShowElement('dialog_loading_play');
}

function Play_HideBufferDialog() {
    if (Main_IsOn_OSInterface) OSInterface_mshowLoading(false);
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

        if (Main_IsOn_OSInterface) {
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

    if (isLive && Main_A_includes_B(Play_data.qualityPlaying, 'Auto')) OSInterface_getVideoQuality(0);
    else if (mwhocall === 2 && Main_A_includes_B(PlayVod_qualityPlaying, 'Auto')) OSInterface_getVideoQuality(1);
    OSInterface_getVideoStatus(isLive);
}

function Play_showPanel() {
    if (Play_getQualitiesFail) Play_getQualities(1, true);
    PlayVod_IconsBottonResetFocus();
    Play_qualityIndexReset();
    Play_qualityDisplay(Play_getQualitiesCount, Play_data.qualityIndex, Play_SetHtmlQuality, Play_controlsQuality);
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
        if (Main_IsOn_OSInterface) {
            if (Main_A_includes_B(Play_data.qualityPlaying, 'Auto')) OSInterface_getVideoQuality(0);
            OSInterface_getVideoStatus(true);
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

var Play_BufferSize = 0;
function Play_ShowVideoStatus(showLatency, Who_Called) {
    var value = OSInterface_getVideoStatusString();

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
        PlayVod_ProgresBarrUpdate((OSInterface_gettime() / 1000), Play_DurationSeconds, !PlayVod_IsJumping);
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

function Play_ShowVideoQuality(who_called) {
    var value = OSInterface_getVideoQualityString();

    if (!value) {
        if (!who_called) Play_SetHtmlQuality('stream_quality');
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

function Play_qualityDisplay(getQualitiesCount, qualityIndex, callback, Play_controls) {
    var doc_up = document.getElementById("control_arrow_up_" + Play_controls),
        doc_down = document.getElementById("control_arrow_down" + Play_controls),
        total = getQualitiesCount();

    if (total === 1) {
        doc_up.classList.add('hide');
        doc_down.classList.add('hide');
    } else if (!qualityIndex) {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = "0.2";
        doc_down.style.opacity = "1";
    } else if (qualityIndex === total - 1) {
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

    callback('controls_name_' + Play_controls);
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
    ChatLive_Clear(0);
    ChatLive_Clear(1);
    Main_clearInterval(Play_streamInfoTimerId);
    Main_setTimeout(Play_loadDataCheckHost, 50);
}

function Play_loadDataCheckHost() {
    var theUrl = 'https://tmi.twitch.tv/hosts?include_logins=1&host=' + encodeURIComponent(Play_data.data[14]);

    Main_setTimeout(
        function() {

            OSInterface_GetMethodUrlHeadersAsync(
                theUrl,//urlString
                DefaultHttpGetTimeout,//timeout
                null,//postMessage, null for get
                null,//Method, null for get
                JSON.stringify(
                    [
                        [Main_clientIdHeader, Main_clientId]
                    ]
                ),//JsonString
                'Play_CheckHostResult',//callback
                0,//checkResult
                0,//key
                3//thread
            );

        },
        100//Delay as the stream just ended and may not show as host yet
    );
}

function Play_CheckHostResult(result) {
    if (result) {
        var resultObj = JSON.parse(result);
        if (resultObj.status === 200) {
            Play_CheckHost(resultObj.responseText);
        } else {
            Play_EndStart(false, 1);
        }
    }
    else Play_EndStart(false, 1);
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
    if (Main_isScene1DocShown()) {
        if (!Sidepannel_isShowing()) Screens_LoadPreviewRestore(Screens_Current_Key);//fix position after animation has endede after Player.STATE_READY
    } else if (duration > 0) {
        Play_DurationSeconds = duration / 1000;
        Main_textContent('progress_bar_duration', Play_timeS(Play_DurationSeconds));
        PlayVod_RefreshProgressBarr();
        if (!Play_Status_Always_On) OSInterface_getVideoStatus(false);
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
        if (Main_IsOn_OSInterface) OSInterface_mSwitchPlayer();
        PlayExtra_SwitchPlayer();
        Play_CloseSmall();

    } else {
        if (Main_IsOn_OSInterface) OSInterface_mClearSmallPlayer();
        Play_CheckHostStart(error_410);
    }
    PlayExtra_UnSetPanel();
}

function Play_CloseSmall() {
    PlayExtra_updateStreamInfo();
    PlayExtra_PicturePicture = false;

    if (Main_IsOn_OSInterface) {
        OSInterface_mClearSmallPlayer();
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
    if (Play_PreviewId || Play_CheckLiveThumb()) Play_OpenLiveFeed();
}

function Play_OpenLiveFeed() {
    Play_SavePlayData();
    UserLiveFeed_Hide(true);

    Main_values.Play_isHost = false;
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
    Main_Set_history('live', Play_data.data);
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
    Play_CheckPreview();
    Play_CleanHideExit();
    Play_hideChat();
    PlayExtra_ClearExtra();
    Play_shutdownStream();
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