/*
 * Copyright (c) 2017-2020 Felipe de Leon <fglfgl27@gmail.com>
 *
 * This file is part of SmartTwitchTV <https://github.com/fgl27/SmartTwitchTV>
 *
 * SmartTwitchTV is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SmartTwitchTV is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SmartTwitchTV.  If not, see <https://github.com/fgl27/SmartTwitchTV/blob/master/LICENSE>.
 *
 */

//Variable initialization
var Play_ChatPositions = 0;
var Play_ChatPositionConvertBefore = Play_ChatPositions;
var Play_ChatBackground = 0.55;
var Play_ChatSizeValue = 4;
var Play_MaxChatSizeValue = 4;
var Play_PanelHideID = null;
var Play_isFullScreen = true;
var Play_Buffer = 2000;
var PlayVod_RefreshProgressBarrTimeout = 1000;
var Play_CurrentSpeed = 3;
var Play_PicturePicturePos = 4;
var Play_PicturePictureSize = 2;
var Play_MultiEnable = false;
var Play_LowLatency = 1;
var Play_EndUpclear = false;
var Play_EndUpclearID;
var Play_EndUpclearCalback;
var Play_EndDialogEnter = 0;
var Play_PanneInfoDoclId;
var Play_Multi_MainBig = false;
var Play_DurationSeconds = 0;
var Play_EndDialogElem;
var Play_MultiDialogElem;
var Play_SkipStartAuto = false;
var Play_MaxMaxInstances = 0;
var Play_HasLive;

var Play_streamInfoTimerId = null;

var Play_ChatEnable = false;
var Play_exitID = null;

var Play_ResumeAfterOnlineCounter = 0;
var Play_ResumeAfterOnlineId;
var Play_isOn = false;
var Play_ChatBackgroundID = null;
var Play_Playing = false;
var Play_IsWarning = false;
var Play_EndCounter = 0;
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

var Play_base_backup_headers = '';
var Play_base_backup_headers_Array = [];

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
var Play_ChatPositionsAfter = [ //Chat positions size 100 to 75%
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

//Variable initialization end

function Play_ResetDefaultQuality() {

    if (!Main_A_includes_B(Settings_Obj_values('default_quality'), STR_AUTO)) {

        Play_SetQuality();

    }

}

function Play_SetQuality() {
    Play_SetPlayQuality(Settings_Obj_values('default_quality').replace(STR_SOURCE, "source"));

    PlayVod_quality = Play_data.quality;
    PlayVod_qualityPlaying = Play_data.quality;
}

function Play_SetPlayQuality(quality) {
    Play_data.quality = quality;
    Play_data.qualityPlaying = Play_data.quality;

    Play_data_base.quality = Play_data.quality;
    Play_data_base.qualityPlaying = Play_data.qualityPlaying;
}

function Play_Start(offline_chat) {
    //Main_Log('Play_Start');

    if (!Play_OlddataSet()) {
        //reset channel logo to prevent another channel logo
        Play_LoadLogo(Main_getElementById('stream_info_icon'), IMG_404_BANNER);
        Play_UpdateMainStreamDiv();
    }

    Play_StartStayShowBottom();

    Play_SetControlsVisibility('ShowInStay');

    Play_BottonIconsResetFocus();

    PlayClip_HideShowNext(0, 0);
    PlayClip_HideShowNext(1, 0);
    Main_ShowElementWithEle(Play_Controls_Holder);
    Main_textContentWithEle(Play_BottonIcons_Progress_CurrentTime, Play_timeS(0));
    Main_textContentWithEle(Play_BottonIcons_Progress_Duration, Play_timeS(28));
    Play_DurationSeconds = 28;

    Play_data.isHost = Main_values.Play_isHost;
    Main_values.Play_isHost = false;
    Play_loadDataCheckHostId = 0;
    Play_StayCheckHostId = 0;
    Play_HasLive = false;

    Play_data.watching_time = new Date().getTime();
    Main_textContentWithEle(Play_infoWatchingTime, ", " + STR_WATCHING + Play_timeS(0));
    PlayClip_SetProgressBarJumpers();
    PlayVod_previews_clear();
    Main_empty('inner_progress_bar_muted');

    Main_textContentWithEle(Play_infoLiveTime, Play_timeMs(0));

    Play_isOn = true;
    Play_Playing = false;

    if (offline_chat) {

        Play_StartStay();

    } else if (!Play_PreviewId) {

        Play_showBufferDialog();
        Play_loadData();

    } else {

        Play_data.AutoUrl = Play_PreviewURL;
        Play_SkipStartAuto = !PlayClip_DontSkipStartAuto;
        Play_loadDataSuccessEnd(Play_PreviewResponseText, true, false, true);

        Play_CheckIfIsLiveCleanEnd();
        Play_getQualities(1, false);
    }

    Play_CurrentSpeed = 3;
    Play_ShowPanelStatus(1);

    Main_values.Play_WasPlaying = 1;
    Main_SaveValues();
    //Check the Play_UpdateMainStream fun when on a browser
    if (!Main_IsOn_OSInterface && !offline_chat) {

        Play_UpdateMainStream(true, true);

    }
    PlayClip_DontSkipStartAuto = false;
}

// To Force a warn, not used regularly so keep commented out
//function Play_Warn(text) {
//    Play_showWarningMidleDialog(text);
//}

//When update this check PlayClip_CheckIfIsLiveResult
function Play_CheckIfIsLiveResult(response) {

    Play_CheckIfIsLiveResultEnd(response, Play_isOn, Play_OpenLiveFeed);

}

function Play_CheckIfIsLiveResultEnd(response, isOn, callback, callbackError) {

    if (isOn && response) {

        var responseObj = JSON.parse(response);

        if (UserLiveFeed_ObjNotNull(UserLiveFeed_FeedPosX) && responseObj.checkResult > 0 && responseObj.checkResult === Play_PreviewCheckId) {

            var StreamInfo = UserLiveFeed_GetObj(UserLiveFeed_FeedPosX),
                isVod = UserLiveFeed_FeedPosX >= UserLiveFeedobj_UserVodPos,
                error = StreamInfo[6] + STR_SPACE_HTML;

            Play_CheckIfIsLiveResultCheck(
                response,
                responseObj,
                error,
                isVod,
                callback,
                callbackError
            );

        }

    }

}

function Play_CheckIfIsLiveResultCheck(response, responseObj, error, isVod, callback, callbackError) {

    if (responseObj.status === 200) {

        Play_PreviewURL = responseObj.url;
        Play_PreviewResponseText = responseObj.responseText;
        callback();
        return;

    } else {

        error += Play_CheckIfIsLiveGetEror(response, isVod);

    }

    Play_CheckIfIsLiveStartFail(
        error,
        2000,
        callbackError
    );

}

function Play_CheckIfIsLiveGetEror(response, isVod) {
    var error;

    if (response.status === 1) {

        error = (isVod ? 'VOD' : STR_LIVE) + STR_SPACE_HTML + STR_IS_SUB_ONLY_ERROR + STR_BR + STR_410_FEATURING;

    } else if (response.status === 403) {

        error = (isVod ? 'VOD' : STR_LIVE) + STR_BR + STR_FORBIDDEN;

    } else {

        if (isVod) error = STR_PREVIEW_ERROR_LOAD + STR_SPACE_HTML + 'VOD' + STR_PREVIEW_ERROR_LINK + STR_PREVIEW_VOD_DELETED;
        else error = STR_LIVE + STR_SPACE_HTML + STR_IS_OFFLINE;

    }

    return error;
}

var Play_PreviewURL = '';
var Play_PreviewId = null;
var Play_PreviewOffset = 0;
var Play_PreviewResponseText = '';
var Play_PreviewCheckId = 0;
var Play_PreviewVideoEnded = false;

function Play_CheckIfIsLiveStart(callback) {

    if (UserLiveFeed_ObjNotNull(UserLiveFeed_FeedPosX)) {
        Play_showBufferDialog();

        var obj = UserLiveFeed_GetObj(UserLiveFeed_FeedPosX),
            id, token, link, isVod;

        if (UserLiveFeed_FeedPosX >= UserLiveFeedobj_UserVodPos) {//vod

            isVod = true;
            id = obj[7];
            token = Play_vod_token;
            link = Play_vod_links;

        } else {//live

            id = obj[6];
            token = Play_live_token;
            link = Play_live_links;
        }

        Play_PreviewCheckId = (new Date().getTime());

        OSInterface_getStreamDataAsync(
            PlayClip_BaseUrl,
            link.replace('%x', id),
            callback,
            Play_PreviewCheckId,
            2,//Main player runs on 0 extra player on 1 the check on 2
            DefaultHttpGetTimeout,
            isVod,
            token.replace('%x', id)
        );
    }

}

function Play_CheckIfIsLiveStartFail(text, time, callbackError) {
    Play_HideBufferDialog();
    Play_CheckIfIsLiveCleanEnd();

    Play_showWarningMidleDialog(text, time);

    if (callbackError) callbackError();
}

function Play_CheckIfIsLiveClean(fail_type, errorCode) {//called from java

    var reason = STR_PREVIEW_END;
    if (fail_type === 1) reason = STR_PLAYER_ERROR;
    if (fail_type === 2) reason = STR_PLAYER_LAG_ERRO;

    if (Sidepannel_isShowingUserLive()) {

        Sidepannel_CheckIfIsLiveWarn(
            reason + Play_GetErrorCode(errorCode),
            0
        );

    } else if (Main_isScene1DocVisible()) {

        if (ScreenObj[Main_values.Main_Go].screenType === 2 && Settings_Obj_default('auto_clip_preview')) {

            var id = ScreenObj[Main_values.Main_Go].posY + '_' + ScreenObj[Main_values.Main_Go].posX;

            if (!ScreenObj[Main_HistoryClip].histPosX[1]) {
                //Save as we have watched it all

                var data = Screens_GetObj(Main_values.Main_Go);

                Main_getElementById(ScreenObj[Main_values.Main_Go].ids[7] + id).style.width = '100%';

                Main_Set_history('clip', data);
                Main_history_UpdateVodClip(data[7], data[1], 'clip');

            }

            if (PlayClip_getIdNext(1, 0)) {
                //Use OSInterface_keyEvent to prevent odd screen scroll visual behavior
                OSInterface_keyEvent(3, 0);
                //send a key up with a minor delay to simulate a click
                Main_setTimeout(
                    function() {
                        OSInterface_keyEvent(3, 1);
                    },
                    25
                );
            } else {
                Play_CheckIfIsLiveCleanEnd();

                Main_RemoveClass(
                    ScreenObj[Main_values.Main_Go].ids[1] + id,
                    'opacity_zero'
                );
            }

        } else {
            OSInterface_ClearSidePanelPlayer();

            Screens_LoadPreviewWarn(
                reason + Play_GetErrorCode(errorCode),
                Main_values.Main_Go,
                fail_type ? 5000 : 2000
            );
        }

    } else {

        Play_CheckIfIsLiveStartFail(
            reason + Play_GetErrorCode(errorCode),
            fail_type ? 5000 : 2000
        );

    }
}

function Play_CheckIfIsLiveCleanEnd() {
    Play_PreviewURL = '';
    Play_PreviewId = null;
    Play_PreviewResponseText = '';
    Play_PreviewOffset = 0;
}

function Play_CheckResume() {
    if (Play_isOn) Play_Resume();
    else if (PlayVod_isOn) PlayVod_Resume();
    else if (PlayClip_isOn) PlayClip_Resume();
    else if (Sidepannel_isShowingUserLive()) {
        Sidepannel_UpdateThumbDiv();
        Play_CheckIfIsLiveCleanEnd();
        Sidepannel_ShowFeed();
    }
}

function Play_Resume() {
    UserLiveFeed_Hide();

    ChatLive_Playing = true;
    Main_innerHTMLWithEle(Play_BottonIcons_Pause, '<div ><i class="pause_button3d icon-pause"></i></div>');
    Play_showBufferDialog();
    Play_ResumeAfterOnlineCounter = 0;

    if (navigator.onLine) Play_ResumeAfterOnline();
    else Play_ResumeAfterOnlineId = Main_setInterval(Play_ResumeAfterOnline, 100, Play_ResumeAfterOnlineId);

    Play_ShowPanelStatus(1);
}

function Play_ResumeAfterOnlineMulti(pos) {
    //delay it call as some slow end device will not be able to handle all at once
    Main_setTimeout(
        function() {
            if (Play_MultiArray[pos].data.length > 0 && !Main_isStoped && Play_isOn && Play_MultiEnable) Play_MultiStart(pos);
        },
        25 * pos
    );

}

function Play_ResumeAfterOnline() {
    if (navigator.onLine || Play_ResumeAfterOnlineCounter > 200) {

        Main_clearInterval(Play_ResumeAfterOnlineId);
        Play_CheckIfIsLiveCleanEnd();

        if (Play_MultiEnable) {

            Play_streamInfoTimerId = Main_setInterval(Play_updateStreamInfo, (1000 * 60 * 3), Play_streamInfoTimerId);
            Play_data_old = JSON.parse(JSON.stringify(Play_data_base));
            Play_data = JSON.parse(JSON.stringify(Play_MultiArray[Play_MultiFirstAvailable()]));
            Play_data.watching_time = new Date().getTime();

            var i = 0;

            for (i; i < Play_MultiArray_length; i++) {

                Play_ResumeAfterOnlineMulti(i);

            }

            Main_setTimeout(
                function() {
                    if (!Main_isStoped && Play_isOn) ChatLive_Init(0);
                },
                200
            );

        } else {

            Play_data.watching_time = new Date().getTime();
            Play_SetControlsVisibility('ShowInStay');
            // TO test a if a stream has ended during a resume process force change this
            //PlayExtra_data.data[6] = 'testtt';
            //PlayExtra_data.data[14] = 1234;
            //Play_data.data[6] = 'testtt';
            //Play_data.data[14] = 1234;
            if (PlayExtra_PicturePicture) PlayExtra_Resume(true);
            Play_loadData();

        }
    }
    Play_ResumeAfterOnlineCounter++;
}

function Play_getStreamData(channel_name) {

    return OSInterface_getStreamData(
        PlayClip_BaseUrl,
        Play_live_links.replace('%x', channel_name),
        DefaultHttpGetTimeout,
        false,
        Play_live_token.replace('%x', channel_name)
    );

}

function Play_UpdateMainStreamDiv() {

    if (!Play_data.data.length) return;

    //Restore or set info panel
    Main_innerHTML("stream_info_title", twemoji.parse(Play_data.data[2], false, true));
    Main_innerHTML(
        "stream_info_name",
        Play_partnerIcon(
            Play_data.isHost ? Play_data.DisplaynameHost : Play_data.data[1],
            Play_data.data[10],
            0,
            Play_data.data[5] ? Play_data.data[5].split(' ')[1] : '',
            Play_data.data[8]
        )
    );
    Main_textContent("stream_info_game", (Play_data.data[3] !== "" ? STR_PLAYING + Play_data.data[3] : ""));
    Main_innerHTML("stream_live_viewers", STR_SPACE_HTML + STR_FOR + Main_addCommas(Play_data.data[13]) + STR_SPACE_HTML + Main_GetViewerStrings(Play_data.data[13]));
    Play_LoadLogo(Main_getElementById('stream_info_icon'), Play_data.data[9]);
    Play_controls[Play_controlsChanelCont].setLable(Play_data.data[1]);
    Play_controls[Play_controlsGameCont].setLable(Play_data.data[3]);
    Main_innerHTML('chat_container_name_text0', STR_SPACE_HTML + Play_data.data[1] + STR_SPACE_HTML);

    if (PlayExtra_PicturePicture) PlayExtra_UpdatePanel();
}

function Play_UpdateMainStream(startChat, refreshInfo) {

    if (startChat) ChatLive_Init(0);

    Play_CheckFollow(Play_data.data[14]);
    Play_UpdateMainStreamDiv();

    if (refreshInfo) {

        Play_updateStreamInfoStart();

    }

}

var Play_updateStreamInfoStartId;
function Play_updateStreamInfoStart() {
    if (!Play_data.data[14]) return;

    var theUrl = Main_kraken_api + 'streams/?stream_type=all&channel=' + Play_data.data[14] + Main_TwithcV5Flag;

    Play_updateStreamInfoStartId = new Date().getTime();

    BaseXmlHttpGet(
        theUrl,
        2,
        null,
        Play_updateStreamInfoStartValues,
        Play_updateStreamInfoStartError,
        0,
        Play_updateStreamInfoStartId
    );
}

function Play_updateStreamInfoStartValues(response, key, ID) {

    var obj = JSON.parse(response);

    if (Play_isOn && obj.streams && obj.streams.length && Play_updateStreamInfoStartId === ID) {

        Play_updateStreamInfoEnd(obj.streams[0]);

        Play_updateVodInfo(
            obj.streams[0].channel._id,
            obj.streams[0]._id
        );

        if (!Main_IsOn_OSInterface) {

            Play_SetSceneBackground(
                obj.streams[0].preview.template.replace("{width}x{height}", "1280x720") + Main_randomimg
            );
        }
    }
}

function Play_updateStreamInfoEnd(response) {
    var tempData = ScreensObj_LiveCellArray(response);

    //Prevent save the wrong stream data this can happen when switching right after enable PP mode
    if (Play_data.data.length > 0 && Main_A_equals_B(tempData[14], Play_data.data[14])) {

        Play_data.data = tempData;

        Play_UpdateMainStreamDiv();

        if (!Play_StayDialogVisible()) Main_Set_history('live', Play_data.data);
    }

}

function Play_updateStreamInfoStartError() {

    if (Play_isOn && Play_data.data.length > 0 && !Play_StayDialogVisible()) {

        Main_Set_history('live', Play_data.data);

    }

}

function Play_CheckFollow(id) {
    if (AddUser_UserIsSet() && id) {
        AddCode_PlayRequest = true;
        AddCode_Channel_id = id;
        AddCode_CheckFollow();
    } else Play_hideFollow();
}

function Play_hideFollow() {
    Play_controls[Play_controlsFollow].setLable(STR_NOKEY);
    AddCode_IsFollowing = false;
}

function Play_setFollow() {
    Play_controls[Play_controlsFollow].setLable(
        (AddCode_IsFollowing ? STR_FOLLOWING : STR_FOLLOW) + ' - ' + (Play_isOn ? Play_data.data[1] : Main_values.Main_selectedChannelDisplayname),
        AddCode_IsFollowing
    );
}

function Play_updateVodInfo(Channel_id, BroadcastID) {
    var theUrl = Main_kraken_api + 'channels/' + Channel_id + '/videos?limit=100&broadcast_type=archive&sort=time';

    BaseXmlHttpGet(
        theUrl,
        2,
        null,
        Play_updateVodInfoSuccess,
        noop_fun,
        BroadcastID
    );
}

function Play_updateVodInfoSuccess(response, BroadcastID) {
    response = JSON.parse(response).videos;

    var i = 0, len = response.length;
    for (i; i < len; i++) {
        if (Main_A_includes_B(response[i].status, 'recording')) {

            Main_history_UpdateLiveVod(
                BroadcastID,
                response[i]._id.substr(1),
                ScreensObj_VodGetPreview(response[i].preview.template, response[i].animated_preview_url)
            );

            break;
        }
    }
}

function Play_updateStreamInfo() {
    if (Play_MultiEnable) {

        var i = 0;

        for (i; i < Play_MultiArray_length; i++) {

            Play_updateStreamInfoMulti(i);

        }

    } else {
        //When update this also update PlayExtra_updateStreamInfo
        Play_updateStreamInfoGet(
            Main_kraken_api + 'streams/?stream_type=all&channel=' + Play_data.data[14] + Main_TwithcV5Flag,
            1
        );
    }
}

var Play_updateStreamInfoGetId;
function Play_updateStreamInfoGet(theUrl, Is_play) {

    Play_updateStreamInfoGetId = new Date().getTime();

    BaseXmlHttpGet(
        theUrl,
        2,
        null,
        Play_updateStreamInfoValues,
        Play_updateStreamInfoGetError,
        Is_play,
        Play_updateStreamInfoGetId
    );

}

function Play_updateStreamInfoValues(response, Is_play, ID) {
    var obj = JSON.parse(response);

    if (Play_isOn && obj.streams && obj.streams.length && Play_updateStreamInfoGetId === ID) {

        if (Is_play) {
            Play_updateStreamInfoEnd(obj.streams[0]);

            if (PlayExtra_PicturePicture) {
                PlayExtra_updateStreamInfo();
            }

        } else {
            var tempData = ScreensObj_LiveCellArray(obj.streams[0]);
            if (!Play_StayDialogVisible()) Main_Set_history('live', tempData);

            //if ... Player is playing ... else... was closed by Play_CloseSmall just Main_history_UpdateLive
            if (PlayExtra_data.data.length > 0 && Main_A_equals_B(tempData[14], PlayExtra_data.data[14])) {
                PlayExtra_data.data = tempData;

                PlayExtra_UpdatePanel();
            }
        }
    }
}

function Play_updateStreamInfoGetError(Is_play) {

    if (Play_StayDialogVisible()) return;

    //we fail but we still watching so update the time
    if (Is_play && Play_data.data.length > 0) {

        Main_Set_history('live', Play_data.data);

    } else if (!Is_play && PlayExtra_data.data.length > 0) {

        Main_Set_history('live', PlayExtra_data.data);
    }

}

function Play_LoadLogo(ImgObjet, link) {
    ImgObjet.onerror = function() {
        this.onerror = null;
        this.src = IMG_404_BANNER; //img fail to load a predefined logo
    };
    ImgObjet.src = link;
}

var Play_loadDataId = 0;
function Play_loadData(synchronous) {
    //Main_Log('Play_loadData');

    if (Main_IsOn_OSInterface) {

        Play_loadDataId = new Date().getTime();

        //On resume to avoid out of sync resumes we run PP synchronous
        if (synchronous) {

            var StreamData = Play_getStreamData(Play_data.data[6]);

            if (StreamData) Play_loadDataResultEnd(JSON.parse(StreamData));
            else Play_loadDataErrorFinish();

        } else {

            OSInterface_getStreamDataAsync(
                PlayClip_BaseUrl,
                Play_live_links.replace('%x', Play_data.data[6]),
                'Play_loadDataResult',
                Play_loadDataId,
                0,
                DefaultHttpGetTimeout,
                false,
                Play_live_token.replace('%x', Play_data.data[6])
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
        Play_loadDataSuccessEnd(responseObj.responseText, true);
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

function Play_loadDataSuccessEnd(playlist, startChat, SkipSaveHistory, PreventcleanQuailities) {
    UserLiveFeed_Hide(PreventcleanQuailities);

    if (Play_EndDialogEnter === 2) PlayVod_PreshutdownStream(true);
    else if (Play_EndDialogEnter === 3) {
        PlayClip_PreshutdownStream(false);
        PlayClip_isOn = false;
    }
    Play_EndDialogEnter = 0;

    Play_HideEndDialog();
    ChatLive_Playing = true;

    if (Play_OlddataSet()) {
        //reset channel logo to prevent another channel logo
        Play_LoadLogo(Main_getElementById('stream_info_icon'), IMG_404_BANNER);
        Play_UpdateMainStreamDiv();
    }
    Play_UpdateMainStream(startChat, true);

    Play_data.playlist = playlist;
    if (Play_isOn) Play_onPlayer();

    Play_data_old = JSON.parse(JSON.stringify(Play_data_base));
    UserLiveFeed_PreventHide = false;

    UserLiveFeed_SetFeedPicText();
    Play_streamInfoTimerId = Main_setInterval(Play_updateStreamInfo, (1000 * 60 * 3), Play_streamInfoTimerId);
    if (!Play_data.isHost && !SkipSaveHistory) Main_Set_history('live', Play_data.data);
}


function Play_loadDataErrorFinish(error_410, Isforbiden) {
    if (Play_EndDialogEnter) {

        Play_EndDialogEnter = 0;
        Play_HideBufferDialog();

        Main_removeEventListener("keydown", Play_handleKeyDown);
        Main_addEventListener("keydown", Play_EndUpclearCalback);

        Play_showWarningMidleDialog(error_410 ? STR_410_ERROR :
            Play_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE,
            2000);

        Play_RestorePlayDataValues();
        Main_values.Play_WasPlaying = 0;
        Main_SaveValues();

    } else if (Play_OlddataSet()) {

        Play_RestorePlayData(error_410, Isforbiden);

    } else if (!PlayExtra_PicturePicture) {

        if (Isforbiden) Play_ForbiddenLive();
        else Play_CheckHostStart(error_410);

    } else {

        Play_CloseBigAndSwich(error_410);

    }
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
            'id': STR_AUTO,
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
    Play_qualityReset();
    if (Play_isOn) Play_qualityChanged();

    if (!Play_data.isHost) Main_Set_history('live', Play_data.data);

    Main_setTimeout(Play_HideBufferDialog, 1000);
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

    Play_SetPlayQuality(Play_data.qualities[Play_data.qualityIndex].id);

    Play_SetHtmlQuality(Play_info_quality);
    if (Main_IsOn_OSInterface) OSInterface_SetQuality(Play_data.qualityIndex - 1);
    else Play_onPlayer();
    //Play_PannelEndStart(1);
}

var Play_getQualitiesFail = false;
function Play_getQualities(Who_Called, skipchange) {
    if (!Main_IsOn_OSInterface) return;

    var baseQualities = OSInterface_getQualities();
    var result;

    if (baseQualities) {

        Play_getQualitiesFail = false;
        result = JSON.parse(baseQualities);

        if (result.length > 1) result[1].id += " | source";

        if (Who_Called === 1) {

            Play_data.qualities = result;

            if (!skipchange && !PlayExtra_PicturePicture && !Play_MultiEnable) {

                Play_ResetDefaultQuality();

                if (!Main_A_includes_B(Play_data.quality, 'Auto'))
                    Play_qualityChanged();
            }

            if (Play_data.playlist) {
                Play_SetExternalQualities(Play_extractQualities(Play_data.playlist), 0, Play_data.data[1]);
                Main_Log('Play_data.playlist\n' + Play_data.playlist);
            }

            Play_qualityReset();
        } else {

            PlayVod_qualities = result;

            if (!skipchange) {

                Play_ResetDefaultQuality();
                if (!Main_A_includes_B(PlayVod_quality, 'Auto'))
                    PlayVod_qualityChanged();

            }

            if (PlayVod_playlist) {
                Play_SetExternalQualities(Play_extractQualities(PlayVod_playlist), 0);
                Main_Log('PlayVod_playlist\n' + PlayVod_playlist);
            }
            PlayVod_qualityReset();
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

    Main_innerHTML('extra_button_title' + Play_controlsExternal, STR_OPEN_EXTERNAL_PLAYER + (name ? STR_SPACE_HTML + '(' + name + ')' : ''));

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

        if (Play_SkipStartAuto) {

            OSInterface_FixViewPosition(0, 1);

        } else {

            OSInterface_StartAuto(Play_data.AutoUrl, Play_data.playlist, 1, 0, 0);

        }
    }

    if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
    Play_SetFullScreen(Play_isFullScreen);
    Play_Playing = true;
    Play_SkipStartAuto = false;

    Play_SetControlsVisibilityPlayer(1);
}

function Play_SetHtmlQuality(element) {
    if (!Play_data.qualities.length || !Play_data.qualities[Play_data.qualityIndex] || !Play_data.qualities[Play_data.qualityIndex].hasOwnProperty('id')) return;

    Play_data.quality = Play_data.qualities[Play_data.qualityIndex].id;
    Play_data_base.quality = Play_data.quality;

    var quality_string = '';

    //Java getQualities fun will generate the first quality of the array as 'Auto'
    if (Main_A_includes_B(Play_data.quality, 'Auto')) {

        if (Main_IsOn_OSInterface) {

            quality_string = Play_data.quality.replace("Auto", STR_AUTO);

        } else {

            if (Play_info_quality !== element) quality_string = Play_data.quality.replace("Auto", STR_AUTO);
            else {

                quality_string = Play_data.qualities[1].id.replace("source", STR_AUTO) +
                    Play_data.qualities[1].band + Play_data.qualities[1].codec;
            }

        }

    } else if (Main_A_includes_B(Play_data.quality, 'source')) quality_string = Play_data.quality.replace("source", STR_SOURCE);
    else quality_string = Play_data.quality;

    quality_string += !Main_A_includes_B(Play_data.quality, 'Auto') ? Play_data.qualities[Play_data.qualityIndex].band + Play_data.qualities[Play_data.qualityIndex].codec : "";

    Main_innerHTMLWithEle(element, quality_string);
}

function Play_PlayerCheck(mwhocall, errorCode) { // Called only by JAVA
    if (mwhocall === 1) {

        Play_SetPlayQuality("Auto");

        OSInterface_SetQuality(-1);
        OSInterface_RestartPlayer(1, 0, 0);
        Play_qualityDisplay(
            Play_getQualitiesCount,
            0,
            Play_SetHtmlQuality,
            Play_controls[Play_controlsQuality]
        );
        Play_showWarningMidleDialog(
            STR_PLAYER_LAG + Play_GetErrorCode(errorCode),
            2000
        );

    } else if (mwhocall === 2) {

        PlayVod_quality = "Auto";
        PlayVod_qualityPlaying = PlayVod_quality;
        OSInterface_SetQuality(-1);
        OSInterface_RestartPlayer(2, OSInterface_gettime(), 0);
        Play_qualityDisplay(PlayVod_getQualitiesCount, 0, PlayVod_SetHtmlQuality, Play_controls[Play_controlsQuality]);
        Play_showWarningMidleDialog(
            STR_PLAYER_LAG + Play_GetErrorCode(errorCode),
            2000
        );

    } else if (mwhocall === 3) {

        if (!navigator.onLine) Play_EndStart(false, mwhocall);
        else if ((PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1)) {

            PlayClip_qualityIndex++;
            Play_qualityDisplay(PlayClip_getQualitiesCount, PlayClip_qualityIndex, PlayClip_SetHtmlQuality, Play_controls[Play_controlsQuality]);
            PlayClip_qualityChanged();

            Play_showWarningMidleDialog(
                STR_PLAYER_SOURCE + Play_GetErrorCode(errorCode),
                2000
            );

        } else Play_EndStart(false, 3);

    }
}

function Play_GetErrorCode(errorCode) {
    return errorCode ? (STR_BR + 'Error Code:' + errorCode) : '';

}

function Play_EndStart(hosting, PlayVodClip) {
    Main_values.Play_isHost = hosting;
    Play_EndSet(PlayVodClip);
    Play_PlayEndStart(PlayVodClip);
}

function Play_lessthanten(time) {
    return (time < 10) ? "0" + time : time;
}

function Play_timeS(time) {
    var seconds, minutes, hours;
    time = Math.round(Math.max(0, time));

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
    return Play_timeMs(Main_date_Ms - (new Date(time).getTime()));
}

function Play_streamLiveAtWitDate(dateNow, time) { //time in '2017-10-27T13:27:27Z'
    return Play_timeMs(dateNow - (new Date(time).getTime()));
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

        Play_loadDataCheckHostId = 0;
        Play_StayCheckHostId = 0;
        PlayExtra_loadDataCheckHostId = 0;
    }
}

function Play_PreshutdownStream(closePlayer) {
    //Main_Log('Play_PreshutdownStream ' + closePlayer);

    if (Main_IsOn_OSInterface) {
        if (closePlayer) {
            //We are closing the player on error or on end
            if (!Play_PreviewId) OSInterface_stopVideo();
            else OSInterface_mClearSmallPlayer();
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
    Play_StopStay();
}

function Play_exitMain() {
    //Main_Log('Play_exitMain');

    UserLiveFeed_PreventHide = false;
    Play_HideBufferDialog();
    Main_showScene1Doc();
    Main_hideScene2Doc();
    Main_ReStartScreens(true);
}

function Play_ClearPlayer() {
    //Main_Log('Play_ClearPlayer');

    Main_clearInterval(Play_ShowPanelStatusId);
    Play_hidePanel();
    Play_HideWarningDialog();
    if (!Play_EndDialogEnter) Play_HideEndDialog();

    if (Play_data.qualities[1] && Play_data.qualityIndex === (Play_getQualitiesCount() - 1)) {
        if (Play_data.qualities[1].hasOwnProperty('id')) {
            Play_SetPlayQuality(Play_data.qualities[1].id);
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
    Main_innerHTMLWithEle(Play_dialog_warning_play_text, text);
    Main_ShowElementWithEle(Play_dialog_warning_play);

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
    Main_HideElementWithEle(Play_dialog_warning_play);
}

function Play_WarningDialogVisible() {
    return Main_isElementShowingWithEle(Play_dialog_warning_play);
}

var Play_showWarningMidleDialogId;
function Play_showWarningMidleDialog(text, timeout, IsLiveWarning) {
    Main_innerHTMLWithEle(Play_dialog_warning_play_middle_text, text);
    Play_dialog_warning_play_middle.style.width = '';

    if (UserLiveFeed_isPreviewShowing()) Play_dialog_warning_play_middle.style.marginTop = '90vh';
    else if (IsLiveWarning) {

        Play_dialog_warning_play_middle.style.marginTop = '81.5vh';
        Play_dialog_warning_play_middle.style.width = '62%';

    } else Play_dialog_warning_play_middle.style.marginTop = '50vh';

    Main_ShowElementWithEle(Play_dialog_warning_play_middle);

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
    Main_HideElementWithEle(Play_dialog_warning_play_middle);
    Main_clearTimeout(Play_showWarningMidleDialogId);
}

function Play_WarningMidleDialogVisible() {
    return Main_isElementShowingWithEle(Play_dialog_warning_play_middle);
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

var Play_ShowPanelStatusId;
function Play_ShowPanelStatus(mwhocall) {

    if (Play_Status_Visible === 1 && !Play_StayDialogVisible()) {

        if (Main_IsOn_OSInterface) {

            Play_ShowPanelStatusId = Main_setInterval(
                function() {
                    Play_UpdateStatus(mwhocall);
                },
                1000,
                Play_ShowPanelStatusId
            );

        } else Play_VideoStatusTest();

        Main_ShowElementWithEle(Play_side_info_div);
        Main_AddClassWitEle(Play_side_info_div, 'playsideinfofocus');

    } else {

        Main_clearTimeout(Play_ShowPanelStatusId);
        Main_HideElementWithEle(Play_side_info_div);
        Main_RemoveClassWithEle(Play_side_info_div, 'playsideinfofocus');

    }

}

function Play_UpdateStatus(who_called) {
    var isLive = who_called === 1;

    if (isLive && Main_A_includes_B(Play_data.qualityPlaying, 'Auto')) OSInterface_getVideoQuality(0);
    else if (who_called === 2 && Main_A_includes_B(PlayVod_qualityPlaying, 'Auto')) OSInterface_getVideoQuality(1);

    OSInterface_getVideoStatus(isLive, who_called);
}


function Play_isPanelShowing() {
    return parseInt(Play_PanneInfoDoclId.style.opacity);
}

function Play_ForceShowPannel() {
    Play_PanneInfoDoclId.style.opacity = 1;

    if (!Play_StayDialogVisible()) {

        if (!Play_Status_Visible) Main_ShowElementWithEle(Play_side_info_div);
        else if (Play_Status_Visible === 1) Main_RemoveClassWithEle(Play_side_info_div, 'playsideinfofocus');

    }

    Play_PanneInfoDoclId.style.pointerEvents = '';
}

function Play_ForceHidePannel() {
    Play_PanneInfoDoclId.style.opacity = 0;

    if (!Play_Status_Visible) Main_HideElementWithEle(Play_side_info_div);
    else if (Play_Status_Visible === 1) Main_AddClassWitEle(Play_side_info_div, 'playsideinfofocus');

    Play_PanneInfoDoclId.style.pointerEvents = 'none';
}

function Play_hidePanel() {
    //return;//return;
    Play_ForceHidePannel();

    //Reset values
    Play_qualityReset();
    Play_ResetSpeed();
    Play_ResetLowlatency();
    Play_controls[Play_controlsBack].enterKey(1, true);
    Play_BottonIconsResetFocus(true);

    if (Play_MultiEnable || PlayExtra_PicturePicture) Play_ResetQualityControls();

    Play_clearHidePanel();
    PlayVod_ClearProgressJumptime(0);
}

function Play_qualityReset() {
    Play_data.quality = Play_data.qualityPlaying;
    Play_data_base.quality = Play_data.quality;
    Play_qualityIndexReset();
    Play_qualityDisplay(
        Play_getQualitiesCount,
        Play_data.qualityIndex,
        Play_SetHtmlQuality,
        Play_controls[Play_controlsQuality]
    );

    if (!Main_A_includes_B(Play_data.qualityPlaying, 'Auto')) Play_SetHtmlQuality(Play_info_quality);
}

function Play_showPanel() {
    if (Play_getQualitiesFail) Play_getQualities(1, true);

    if (!Play_StayDialogVisible()) {

        PlayVod_RefreshProgressBarrStart(true, 0);

    } else {

        PlayVod_PanelY = 2;
        Play_BottonIconsFocus();
        Play_RefreshWatchingTime();
        PlayVod_RefreshProgressBarrID = Main_setInterval(Play_RefreshWatchingTime, 1000, PlayVod_RefreshProgressBarrID);

    }

    Play_CleanHideExit();
    Play_ForceShowPannel();
    Play_Resetpanel(1);
}

function Play_RefreshWatchingTime() {

    var dateNow = new Date().getTime();

    if (Play_MultiEnable) {

        var extraText = Play_Multi_MainBig ? 'big' : 'small', i;

        for (i = 0; i < 4; i++) {

            if (Play_MultiArray[i].data.length > 0) {

                Main_textContentWithEle(Play_infoMultiWatchingTime[i][extraText], STR_WATCHING + Play_timeMs(dateNow - Play_MultiArray[i].watching_time));
                Main_textContentWithEle(Play_infoMultiLiveTime[i][extraText], Play_GetLiveTime(dateNow, Play_MultiArray[i].data[12], Play_MultiArray[i].watching_time));

            } else {

                Main_innerHTMLWithEle(Play_infoMultiWatchingTime[i][extraText], STR_SPACE_HTML);
                Main_innerHTMLWithEle(Play_infoMultiLiveTime[i][extraText], STR_SPACE_HTML);

            }

        }

    } else if (PlayExtra_PicturePicture) {

        Main_textContentWithEle(Play_infoPPWatchingTime[0], STR_WATCHING + Play_timeMs(dateNow - Play_data.watching_time));
        Main_textContentWithEle(Play_infoPPLiveTime[0], Play_GetLiveTime(dateNow, Play_data.data[12], Play_data.watching_time));

        Main_textContentWithEle(Play_infoPPWatchingTime[1], STR_WATCHING + Play_timeMs(dateNow - PlayExtra_data.watching_time));
        Main_textContentWithEle(Play_infoPPLiveTime[1], Play_GetLiveTime(dateNow, PlayExtra_data.data[12], Play_data.watching_time));

    } else if (Play_StayDialogVisible()) {

        Main_textContentWithEle(Play_infoLiveTime, STR_WAITING + Play_timeMs(dateNow - (Play_data.watching_time)));
        Main_textContentWithEle(Play_infoWatchingTime, '');
        Main_textContent("stream_live_viewers", '');

        return;

    } else {

        Main_textContentWithEle(Play_infoWatchingTime, ", " + STR_WATCHING + Play_timeMs(dateNow - Play_data.watching_time));
        Main_textContentWithEle(
            Play_infoLiveTime,
            Play_GetLiveTime(dateNow, Play_data.data[12], Play_data.watching_time)
        );

    }

}

//Server time info may be wrong resulting in too big time
function Play_GetLiveTime(dateNow, Time, watching_time) {
    return STR_SINCE + Play_streamLiveAtWitDate(
        dateNow,
        Time && parseInt(Time) ? Time : watching_time
    );
}

function Play_VideoStatusTest() {
    Play_UpdateVideoStatus(
        STR_SPACE_HTML + Play_getMbps(101 * 1000000) + ' | 150.00',
        Play_getMbps(115 * 1000000) + ' | 150.00 ',
        STR_SPACE_HTML + STR_SPACE_HTML + '0 | 27',
        '14.27',
        Play_isOn ? (Play_LowLatency ? 2.05 : 13.13) : null,
        " 15.05 | 16.50"
    );
}

function Play_UpdateVideoStatus(net_speed, net_act, dropped_frames, buffer_size, latency, ping) {
    Main_innerHTMLWithEle(
        Play_StreamStatus,
        STR_NET_SPEED + STR_SPACE_HTML + STR_SPACE_HTML + net_speed + STR_AVG + STR_BR +
        STR_NET_ACT + STR_SPACE_HTML + net_act + STR_AVG + STR_BR +
        STR_DROOPED_FRAMES + dropped_frames + STR_TODAY + STR_BR +
        STR_BUFFER_HEALT + buffer_size + STR_BR +
        (latency !== null ? (STR_LATENCY + latency + STR_BR) : '') +
        STR_PING + ping + STR_AVG
    );
}

var Play_BufferSize = 0;
function Play_ShowVideoStatus(showLatency, Who_Called, valueString) {

    if (!valueString) return;

    var value = JSON.parse(valueString);

    if (Play_Status_Visible !== 2) {

        Play_UpdateVideoStatus(
            value[0],
            value[1],
            value[2] + " |" + (value[3] < 10 ? STR_SPACE_HTML + STR_SPACE_HTML : "") + value[3],
            value[4],
            (showLatency ? value[5] : null),
            value[6]
        );

    }

    //Remove the check after some app updates
    var timeMs = value[9] ? value[9] : OSInterface_gettime();

    Play_BufferSize = parseFloat(value[7]);

    if (Who_Called !== 2) Play_BufferSize = Math.ceil(Play_BufferSize);
    else PlayVod_ChaptersSetGame(timeMs);

    if (value[8] > 0) Play_UpdateDurationDiv(value[8]);

    PlayVod_ProgresBarrUpdate(
        (timeMs / 1000),
        Play_DurationSeconds,
        !PlayVod_IsJumping || PlayVod_PanelY
    );

}

function Play_getMbps(value) {
    value = (parseInt(value) / 1000000).toFixed(2);

    return (parseInt(value) < 10 ? (STR_SPACE_HTML + STR_SPACE_HTML + value) : value);
}

function Play_ShowVideoQuality(who_called, value) {

    if (!value) {

        if (!who_called) Play_SetHtmlQuality(Play_info_quality);
        else PlayVod_SetHtmlQuality(Play_info_quality);

    } else Main_innerHTML("stream_quality", value);

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
    Play_chat_container.classList.remove('hide');

    Play_controls[Play_controlsChat].setLable();
}

function Play_hideChat() {
    Play_chat_container.classList.add('hide');
    Play_controls[Play_controlsChat].setLable();
}

function Play_isChatShown() {
    return !Main_A_includes_B(Play_chat_container.className, 'hide');
}

function Play_getQualitiesCount() {
    return Play_data.qualities.length;
}

function Play_ChatSize(showDialog) {
    if (Play_ChatSizeValue > Play_MaxChatSizeValue) Play_ChatSizeValue = Play_MaxChatSizeValue;
    Play_chat_container.style.height = Play_ChatSizeVal[Play_ChatSizeValue].containerHeight + '%';
    Main_getElementById("play_chat_dialog").style.marginTop = Play_ChatSizeVal[Play_ChatSizeValue].dialogTop + '%';
    Play_ChatPosition();

    if (showDialog) Play_showChatBackgroundDialog(STR_SIZE + Play_ChatSizeVal[Play_ChatSizeValue].percentage);

    Main_setItem('ChatSizeValue', Play_ChatSizeValue);

    Play_SetChatPosString();
}

function Play_SetChatPosString() {

    if (Play_ChatSizeValue === Play_MaxChatSizeValue) {

        Play_controls[Play_controlsChatPos].values = STR_CHAT_100_ARRAY;

    } else {

        Play_controls[Play_controlsChatPos].values = STR_CHAT_BASE_ARRAY;

    }
    Play_controls[Play_controlsChatPos].setLable();
    Play_controls[Play_controlsChatPos].bottomArrows();

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

function Play_qualityDisplay(getQualitiesCount, qualityIndex, callback, obj) {

    var doc_up = obj.doc_up,
        doc_down = obj.doc_down,
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

    callback(obj.doc_name);

}

function Play_qualityIndexReset() {
    if (PlayExtra_PicturePicture || Play_MultiEnable) return;

    Play_data.qualityIndex = 0;
    var i = 0, len = Play_getQualitiesCount();

    for (i; i < len; i++) {
        if (Play_data.qualities[i].id === Play_data.quality) {
            Play_data.qualityIndex = i;
            break;
        } else if (Main_A_includes_B(Play_data.qualities[i].id, Play_data.quality)) { //make sure to set a value before break out
            Play_data.qualityIndex = i;
        }
    }

    if (Play_data.qualities[Play_data.qualityIndex]) Play_qualityTitleReset(Play_data.qualities[Play_data.qualityIndex].id);
}

function Play_qualityTitleReset(title) {
    Main_textContent(
        'extra_button_title' + Play_controlsQuality,
        STR_QUALITY + ' - ' + title
    );
}

//called by android PlayerActivity
function Play_PannelEndStart(PlayVodClip, fail_type, errorCode) { // Called only by JAVA

    //Stop all players to make sure no more end call happen
    if (Main_IsOn_OSInterface && fail_type) {

        OSInterface_stopVideo();
        Play_showWarningDialog(
            ((fail_type === 1) ? STR_PLAYER_ERROR : STR_PLAYER_LAG_ERRO) + Play_GetErrorCode(errorCode),
            2000
        );

    }

    Main_setTimeout(
        function() {
            if (PlayVodClip === 1) { //live
                PlayExtra_ClearExtra();
                Play_CheckHostStart();
            } else {
                Play_PlayEndStart(PlayVodClip);
            }
        },
        PlayVodClip === 1 ? 2000 : 0//Allow a delay before check the host, to make sure the server has updated
    );
}

function Play_PlayEndStart(PlayVodClip) {
    if (PlayVodClip === 1 && Settings_value.play_stay.defaultValue) {
        Play_StartStay();
        return;
    }
    Play_PrepareshowEndDialog(PlayVodClip);
    Play_EndTextCounter = (!Play_EndSettingsCounter ? -2 : Play_EndSettingsCounter);

    Play_EndText(PlayVodClip);
    Play_showEndDialog(PlayVodClip);
}

function Play_CheckHostStart(error_410) {
    if (error_410) {
        Play_IsWarning = true;
        Play_showWarningDialog(STR_410_ERROR);
    }

    Play_showBufferDialog();
    Play_SetControlsVisibility('ShowInStay');

    ChatLive_Clear(0);
    ChatLive_Clear(1);
    Main_clearInterval(Play_streamInfoTimerId);
    Main_setTimeout(Play_loadDataCheckHost, 50);
}

var Play_loadDataCheckHostId;
function Play_loadDataCheckHost() {
    Play_loadDataCheckHostId = new Date().getTime();

    Main_setTimeout(
        function() {

            Main_GetHost(
                Play_CheckHost,
                0,
                Play_loadDataCheckHostId,
                Play_data.data[6]
            );

        },
        100//Delay as the stream just ended and may not show as host yet
    );
}

function Play_CheckHost(responseObj, key, id) {

    if (Play_isOn && Play_loadDataCheckHostId === id) {

        if (Play_CheckHostResult(responseObj)) {

            if (Settings_value.open_host.defaultValue) return;

        } else {

            Play_EndSet(1);

        }

        Play_PlayEndStart(1);


    }

}

function Play_UpdateDuration(duration) { // Called only by JAVA

    if (Main_isScene1DocVisible()) {

        if (!Sidepannel_isShowingUserLive()) Screens_LoadPreviewRestore(Main_values.Main_Go);//fix position after animation has endede after Player.STATE_READY

    } else if (duration > 0) {

        Play_UpdateDurationDiv(duration);

        if (PlayVod_isOn) PlayVod_muted_segments(PlayVod_muted_segments_value, true);//duration may have changed update the positions

    }

}

function Play_UpdateDurationDiv(duration) {

    Play_DurationSeconds = duration / 1000;

    Main_textContentWithEle(Play_BottonIcons_Progress_Duration, Play_timeS(Play_DurationSeconds));
}

function Play_CloseBigAndSwich(error_410) {
    Play_HideBufferDialog();

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
    Play_getQualities(1, false);
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
    Main_values.Play_isHost = false;

    if (!Main_IsOn_OSInterface || Play_PreviewId ||
        (UserLiveFeed_FeedPosX < UserLiveFeedobj_UserVodPos)) {

        Play_OpenFeed(Play_handleKeyDown);

    } else {

        Play_CheckIfIsLiveStart('Play_CheckIfIsLiveResult');

    }
}

function Play_OpenFeed(keyfun) {

    if (UserLiveFeed_FeedPosX >= UserLiveFeedobj_UserVodPos) {

        if (Play_MultiEnable || PlayExtra_PicturePicture) {
            Play_showWarningMidleDialog(STR_PP_VOD_ERROR, 2500);
            return;
        }

        Play_PreviewOffset = OSInterface_gettimepreview();

        if (Play_PreviewId && Main_IsOn_OSInterface) {

            OSInterface_ReuseFeedPlayer(
                Play_PreviewURL,
                Play_PreviewResponseText,
                2,
                Play_PreviewOffset,
                0
            );

        }

        UserLiveFeed_Hide(Play_PreviewId);

        Play_data = JSON.parse(JSON.stringify(Play_data_base));
        Play_PreviewOffset = Play_PreviewOffset / 1000;
        Main_clearInterval(Play_ShowPanelStatusId);
        Main_values.Play_WasPlaying = 0;
        Play_ClearPlay(true);
        Play_isOn = false;

        if (!Play_PreviewOffset) Play_PreviewOffset = UserLiveFeed_PreviewOffset;

        Main_OpenVodStart(
            UserLiveFeed_GetObj(UserLiveFeed_FeedPosX),
            UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX],
            UserLiveFeed_ids,
            keyfun,
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].Screen
        );

    } else {

        if (Play_PreviewId && Main_IsOn_OSInterface) {

            OSInterface_ReuseFeedPlayer(Play_PreviewURL, Play_PreviewResponseText, 1, 0, 0);

        }

        UserLiveFeed_Hide(Play_PreviewId);
        Play_OpenLiveStream(keyfun);

    }

    Play_StopStay();
}

function Play_OpenLiveStream(keyfun) {
    Main_OpenLiveStream(
        UserLiveFeed_GetObj(UserLiveFeed_FeedPosX),
        UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX],
        UserLiveFeed_ids,
        keyfun,
        !UserLiveFeed_CheckVod(),
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].Screen
    );
}

function Play_RestorePlayData(error_410, Isforbiden) {
    Play_HideBufferDialog();

    Play_showWarningMidleDialog(error_410 ? STR_410_ERROR :
        Play_data.data[1] + ' ' + STR_LIVE + STR_BR + (Isforbiden ? STR_FORBIDDEN : STR_IS_OFFLINE),
        2000);

    Play_RestorePlayDataValues();

    Main_SaveValues();
}

function Play_SavePlayData() {
    if (Play_data.data && Play_data.data.length > 0) {
        Play_data_old = JSON.parse(JSON.stringify(Play_data));
        if (!Play_StayDialogVisible()) Main_Set_history('live', Play_data.data);
    }
}

function Play_RestorePlayDataValues() {
    Play_data = JSON.parse(JSON.stringify(Play_data_old));
    Play_data_old = JSON.parse(JSON.stringify(Play_data_base));
    Play_LoadLogo(Main_getElementById('stream_info_icon'), Play_data.data[9]);
    Play_SetControlsVisibilityPlayer(1);
}

function Play_handleKeyUpClear() {
    Main_clearTimeout(PlayExtra_KeyEnterID);
    Main_removeEventListener("keyup", Play_handleKeyUp);
    Main_addEventListener("keydown", Play_handleKeyDown);
}

function Play_Exit() {
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
    Play_StoreChatPosValue.marginTop = Main_getElementById("play_chat_dialog").style.marginTop;
    Play_StoreChatPosValue.top = Play_chat_container.style.top;
    Play_StoreChatPosValue.left = Play_chat_container.style.left;
}

function Play_ResStoreChatPos() {
    Play_chat_container.style.width = '';
    if (!Play_ChatEnable) Play_hideChat();
    else Play_showChat();
    Play_chat_container.style.height = Play_StoreChatPosValue.height;
    Main_getElementById("play_chat_dialog").style.marginTop = Play_StoreChatPosValue.marginTop;
    Play_chat_container.style.top = Play_StoreChatPosValue.top;
    Play_chat_container.style.left = Play_StoreChatPosValue.left;
}

function Play_FastBackForward(position) {
    if (!Play_isPanelShowing()) Play_showPanel();
    Play_clearHidePanel();
    PlayVod_PanelY = 0;
    Play_BottonIconsFocus();

    PlayVod_jumpStart(position, Play_DurationSeconds);
    PlayVod_ProgressBaroffset = 2500;
    Play_setHidePanel();
}