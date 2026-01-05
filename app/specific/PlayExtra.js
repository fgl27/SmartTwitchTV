/*
 * Copyright (c) 2017–present Felipe de Leon <fglfgl27@gmail.com>
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
var PlayExtra_KeyEnterID;
var PlayExtra_clear = false;
var PlayExtra_PicturePicture = false;

var PlayExtra_WasPicturePicture = false;

function PlayExtra_KeyEnter() {
    PlayExtra_clear = true;

    if (Play_MaxInstances < 2) {
        Play_showWarningMiddleDialog(STR_4_WAY_MULTI_INSTANCES.replace('%x', Play_MaxInstances) + STR_PP_MODO, 3000);

        return;
    }

    if (!Play_preventVodOnPP()) return;

    var doc = Play_CheckLiveThumb(false, false);

    if (doc) {
        PlayExtra_WasPicturePicture = PlayExtra_PicturePicture;

        if (PlayExtra_WasPicturePicture) {
            //PlayExtra_PicturePicture was alredy enable so save data and update live historyinfo
            PlayExtra_SavePlayData();
        } else PlayExtra_Save_data = JSON.parse(JSON.stringify(Play_data_base));

        PlayExtra_data.data = doc;
        PlayExtra_data.watching_time = new Date().getTime();

        PlayExtra_data.isHost = Main_A_includes_B(PlayExtra_data.data[1], STR_USER_HOSTED_BY);

        if (PlayExtra_data.isHost) {
            PlayExtra_data.DisplayNameHost = PlayExtra_data.data[1];
            PlayExtra_data.data[1] = PlayExtra_data.DisplayNameHost.split(STR_USER_HOSTED_BY)[0];
        }

        PlayExtra_PicturePicture = true;

        Main_innerHTML('chat_container_name_text1', STR_SPACE_HTML + PlayExtra_data.data[1] + STR_SPACE_HTML);

        if (Main_IsOn_OSInterface) {
            //Not on auto mode for change to auto before start picture in picture
            if (!Main_A_includes_B(Play_data.quality, 'Auto')) {
                OSInterface_SetQuality(-1);
            }

            Play_SetPlayQuality('Auto');
            Play_qualityDisplay(Play_getQualitiesCount, 0, Play_SetHtmlQuality, Play_controls[Play_controlsQuality]);
            PlayExtra_data.quality = 'Auto';
            PlayExtra_data.qualityPlaying = PlayExtra_data.quality;
        }

        if (!Play_PreviewId) PlayExtra_Resume();
        else {
            PlayExtra_data.AutoUrl = Play_PreviewURL;
            PlayExtra_loadDataSuccessEnd(Play_PreviewResponseText, true);

            Play_CheckIfIsLiveCleanEnd();
        }

        Main_EventPlay(
            'PictureInPicture',
            PlayExtra_data.data[6],
            PlayExtra_data.data[3],
            !PlayExtra_data.isHost ? PlayExtra_data.data[15] : 'HOSTING',
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].Screen
        );
    }
}

var PlayExtra_ResumeId = 0;
function PlayExtra_Resume(synchronous) {
    if (Main_IsOn_OSInterface) {
        PlayExtra_ResumeId = new Date().getTime();

        //On resume to avoid out of sync resumes we run PP synchronous
        if (synchronous) {
            var StreamData = Play_getStreamData(PlayExtra_data.data[6]);

            //Do not check host on async, as both player may have endede with will cause a out of sync error
            //causing the player to stop in a black state
            if (StreamData) PlayExtra_ResumeResultEnd(JSON.parse(StreamData), false);
            else PlayExtra_End(false, 0);
        } else {
            PlayHLS_GetPlayListAsync(true, PlayExtra_data.data[6], PlayExtra_ResumeId, null, PlayExtra_ResumeResult);
        }
    }
}

function PlayExtra_ResumeResult(response) {
    if (PlayExtra_PicturePicture && Play_isOn && response) {
        var responseObj = JSON.parse(response);

        if (responseObj.checkResult > 0 && responseObj.checkResult === PlayExtra_ResumeId) {
            PlayExtra_ResumeResultEnd(responseObj);
        }
    }
}

function PlayExtra_ResumeResultEnd(responseObj, checkHost) {
    if (responseObj.status === 200) {
        PlayExtra_data.AutoUrl = responseObj.url;
        PlayExtra_loadDataSuccessEnd(responseObj.responseText);
        return;
    } else if (checkHost) {
        PlayExtra_End(false, 0);
        return;
    } else if (responseObj.status === 1 || responseObj.status === 403) {
        PlayExtra_loadDataFail(STR_FORBIDDEN);
        return;
    } else if (responseObj.status === 404) {
        PlayExtra_loadDataFail(PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE);
        return;
    }

    PlayExtra_loadDataFail(STR_PLAYER_PROBLEM_2);
}

function PlayExtra_loadDataSuccessEnd(playlist, PreventCleanQualities) {
    PlayExtra_data.watching_time = new Date().getTime();
    Play_SetAudioIcon();
    PlayExtra_data.playlist = playlist;
    PlayExtra_SetPanel();

    if (!Play_isFullScreen) {
        ChatLive_Init(1);
        OSInterface_mupdatesizePP(Play_isFullScreen);
        PlayExtra_ShowChat();
        Play_SetChatSideBySide();
    } else OSInterface_mSwitchPlayerSize(Play_PicturePictureSize);

    if (Main_IsOn_OSInterface && Play_isOn) {
        if (PreventCleanQualities) {
            OSInterface_ReuseFeedPlayer(PlayExtra_data.AutoUrl, PlayExtra_data.playlist, 1, 0, 1);
        } else {
            OSInterface_StartAuto(PlayExtra_data.AutoUrl, PlayExtra_data.playlist, 1, 0, 1);
        }
    }

    UserLiveFeed_Hide(PreventCleanQualities);

    PlayExtra_Save_data = JSON.parse(JSON.stringify(Play_data_base));
    PlayExtra_updateStreamInfo();

    ChatLive_Playing = true;

    if (!PlayExtra_data.isHost) Main_Set_history('live', PlayExtra_data.data);
    Play_updateVodInfo(PlayExtra_data.data[14], PlayExtra_data.data[7], PlayExtra_data.data[0]);

    Main_Log('PlayExtra_data.playlist\n' + PlayExtra_data.playlist);
}

function PlayExtra_SavePlayData() {
    PlayExtra_Save_data = JSON.parse(JSON.stringify(PlayExtra_data));
    Main_Set_history('live', PlayExtra_data.data);
}

function PlayExtra_RestorePlayData() {
    Play_showWarningMiddleDialog(PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE, 2000);

    PlayExtra_data = JSON.parse(JSON.stringify(PlayExtra_Save_data));
    PlayExtra_Save_data = JSON.parse(JSON.stringify(Play_data_base));
}

function PlayExtra_SwitchPlayerStoreOld() {
    PlayExtra_data_old = JSON.parse(JSON.stringify(Play_data));
}

function PlayExtra_SwitchPlayerResStoreOld() {
    PlayExtra_data = JSON.parse(JSON.stringify(PlayExtra_data_old));
}

function PlayExtra_SwitchPlayer() {
    PlayExtra_SwitchPlayerStoreOld();
    Play_data = JSON.parse(JSON.stringify(PlayExtra_data));

    if (Main_values.Main_Go === Main_aGame) {
        Main_values.Main_OldgameSelected = Main_values.Main_gameSelected_id;
    }

    PlayExtra_SwitchPlayerResStoreOld();
    Main_SaveValues();

    Play_UpdateMainStream(Play_isFullScreen, false);
    PlayExtra_UpdatePanel();

    if (!Play_isFullScreen) {
        ChatLive_Switch();
    }

    Main_innerHTML('chat_container_name_text1', STR_SPACE_HTML + PlayExtra_data.data[1] + STR_SPACE_HTML);
    Main_innerHTML('chat_container_name_text0', STR_SPACE_HTML + Play_data.data[1] + STR_SPACE_HTML);
    Play_SetExternalQualities(Play_extractQualities(Play_data.playlist), 0, Play_data.data[1]);

    var temp_Volume_0 = Play_volumes[0];
    Play_volumes[0] = Play_volumes[1];
    Play_volumes[1] = temp_Volume_0;
    Play_SetAudioIcon();
}

function PlayExtra_ShowChat() {
    Main_ShowElement('chat_container1');
    Main_ShowElement('chat_container_name0');
    Main_ShowElement('chat_container_name1');
}

function PlayExtra_HideChat() {
    Main_HideElement('chat_container1');
    Main_HideElement('chat_container_name0');
    Main_HideElement('chat_container_name1');
}

function PlayExtra_End(doSwitch, fail_type) {
    // Called only by JAVA

    if (!fail_type && Settings_value.open_host.defaultValue) {
        Play_showWarningMiddleDialog(PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE + STR_CHECK_HOST, 2000);

        PlayExtra_End_success(doSwitch ? 1 : 0);
    } else PlayExtra_End_success(doSwitch, fail_type);
}

function PlayExtra_End_success(doSwitch, fail_type, errorCode) {
    var reason = (doSwitch ? Play_data.data[1] : PlayExtra_data.data[1]) + ' ' + STR_LIVE + STR_IS_OFFLINE;

    if (fail_type === 1) reason = STR_PLAYER_ERROR + STR_BR + STR_PLAYER_ERROR_MULTI;
    if (fail_type === 2) reason = STR_PLAYER_LAG_ERRO + STR_BR + STR_PLAYER_ERROR_MULTI;

    //Some player ended switch and warn
    if (doSwitch) {
        //Main player has end switch and close
        OSInterface_mSwitchPlayer();
        PlayExtra_SwitchPlayer();
    }

    Play_showWarningMiddleDialog(reason + Play_GetErrorCode(errorCode), 2500 + (fail_type ? 2500 : 0));

    Play_CloseSmall();
}

function PlayExtra_SetPanel() {
    Play_controls[Play_controlsChatSide].setLabel();
    Play_controls[Play_controlsChatSide].setIcon();

    Play_SetControlsVisibility('ShowInPP');

    Main_HideElement('stream_info');
    Main_ShowElement('stream_info_pp');
}

function PlayExtra_UnSetPanel() {
    PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
    Play_controls[Play_controlsChatSide].setLabel();
    Play_controls[Play_controlsChatSide].setIcon();

    Play_SetControlsVisibility('ShowInLive');

    ChatLive_Clear(1);
    PlayExtra_HideChat();

    Main_HideElement('stream_info_pp');
    Main_ShowElement('stream_info');

    Play_AudioReset(0);
}

function PlayExtra_ClearExtra() {
    PlayExtra_PicturePicture = false;
    PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
}

var streamTitle1;
var streamGame1;
var streamViewers1;

var streamTitle2;
var streamGame2;
var streamViewers2;

function PlayExtra_UpdatePanel() {
    //Main
    if (Play_data.data[9]) {
        Main_getElementById('stream_info_ppimg0').src = Play_data.data[9];
    }

    PlayExtra_updateStreamLogo(Play_data.data[14], 0);

    if (streamTitle1 !== Play_data.data[2]) {
        Main_innerHTML('stream_info_pp_title0', twemoji.parse(Play_data.data[2], false, true));
    }
    streamTitle1 = Play_data.data[2];

    if (streamGame1 !== Play_data.data[3]) {
        Main_innerHTML('stream_info_pp_game0', Play_data.data[3] === '' ? STR_SPACE_HTML : STR_PLAYING + Play_data.data[3]);
    }
    streamGame1 = Play_data.data[3];

    if (streamViewers1 !== Play_data.data[13]) {
        Main_innerHTML(
            'stream_info_pp_viewers0',
            STR_FOR + Main_formatNumber(Play_data.data[13]) + STR_SPACE_HTML + Main_GetViewerStrings(Play_data.data[13]) + ','
        );
    }
    streamViewers1 = Play_data.data[13];

    //pp
    if (PlayExtra_data.data[9]) {
        Main_getElementById('stream_info_ppimg1').src = PlayExtra_data.data[9];
    }
    PlayExtra_updateStreamLogo(PlayExtra_data.data[14], 1);

    if (streamTitle2 !== PlayExtra_data.data[2]) {
        Main_innerHTML('stream_info_pp_title1', twemoji.parse(PlayExtra_data.data[2], false, true));
    }
    streamTitle2 = PlayExtra_data.data[2];

    if (streamGame2 !== PlayExtra_data.data[3]) {
        Main_innerHTML('stream_info_pp_game1', PlayExtra_data.data[3] === '' ? STR_SPACE_HTML : STR_PLAYING + PlayExtra_data.data[3]);
    }
    streamGame2 = PlayExtra_data.data[3];

    if (streamViewers2 !== PlayExtra_data.data[13]) {
        Main_innerHTML(
            'stream_info_pp_viewers1',
            STR_FOR + Main_formatNumber(PlayExtra_data.data[13]) + STR_SPACE_HTML + Main_GetViewerStrings(PlayExtra_data.data[13]) + ','
        );
    }
    streamViewers2 = PlayExtra_data.data[13];
}

var PlayExtra_updateStreamLogoValuesId = [];
function PlayExtra_updateStreamLogo(channelId, pp) {
    if (!pp && Play_data.data && Play_data.data.length && Play_data.data[10] !== null && Play_data.data[9] !== null) {
        PlayExtra_updateLogo(pp);
    } else if (pp && PlayExtra_data.data && PlayExtra_data.data.length && PlayExtra_data.data[10] !== null && PlayExtra_data.data[9] !== null) {
        PlayExtra_updateLogo(pp);
    }

    PlayExtra_updateStreamLogoValuesId[pp] = new Date().getTime();
    var theUrl = Main_helix_api + 'users?id=' + channelId;

    BaseXmlHttpGet(theUrl, PlayExtra_updateStreamLogoValues, noop_fun, pp, PlayExtra_updateStreamLogoValuesId[pp], true);
}

function PlayExtra_updateStreamLogoValues(responseText, pp, ID) {
    if (!pp && (!Play_data || !Play_data.data || !Play_data.data.length)) {
        return;
    }

    if (pp && (!PlayExtra_data || !PlayExtra_data.data || !PlayExtra_data.data.length)) {
        return;
    }

    var response = JSON.parse(responseText);

    if (response.data && response.data.length && PlayExtra_updateStreamLogoValuesId[pp] === ID) {
        //TODO update this with a API that provides logo and is partner
        var objData = response.data[0];

        if (!pp && Main_A_equals_B(objData.id, Play_data.data[14])) {
            Play_data.data[10] = objData.broadcaster_type === 'partner';
            Play_data.data[9] = objData.profile_image_url;

            PlayExtra_updateLogo(pp);
        } else if (Main_A_equals_B(objData.id, PlayExtra_data.data[14])) {
            PlayExtra_data.data[10] = objData.broadcaster_type === 'partner';
            PlayExtra_data.data[9] = objData.profile_image_url;

            PlayExtra_updateLogo(pp);
        }
    }
}

var updateLogoPPDiv;
var updateLogoMainDiv;

var updateLogoPPLogo;
var updateLogoMainLogo;
function PlayExtra_updateLogo(pp) {
    var div;
    if (!pp) {
        div = Play_partnerIcon(
            Play_data.isHost ? Play_data.DisplayNameHost : Play_data.data[1],
            Play_data.data[10],
            0,
            Play_data.data[5] ? '[' + Play_data.data[5].split('[')[1] : '',
            Play_data.data[8]
        );

        if (updateLogoMainDiv !== div) {
            Main_innerHTML('stream_info_pp_name0', div);
        }

        updateLogoMainDiv = div;

        if (updateLogoMainLogo !== Play_data.data[9]) {
            Main_getElementById('stream_info_ppimg0').src = Play_data.data[9];
        }

        updateLogoMainLogo = Play_data.data[9];
    } else {
        div = Play_partnerIcon(
            PlayExtra_data.isHost ? PlayExtra_data.DisplayNameHost : PlayExtra_data.data[1],
            PlayExtra_data.data[10],
            0,
            PlayExtra_data.data[5] ? '[' + PlayExtra_data.data[5].split('[')[1] : '',
            PlayExtra_data.data[8]
        );

        if (updateLogoPPDiv !== div) {
            Main_innerHTML('stream_info_pp_name1', div);
        }
        updateLogoPPDiv = div;

        if (updateLogoPPLogo !== Play_data.data[9]) {
            Main_getElementById('stream_info_ppimg1').src = PlayExtra_data.data[9];
        }

        updateLogoPPLogo = PlayExtra_data.data[9];
    }
}

function PlayExtra_loadDataFail(Reason) {
    if (PlayExtra_Save_data.data.length > 0) PlayExtra_RestorePlayData();
    else {
        PlayExtra_PicturePicture = false;
        PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
        ChatLive_Clear(1);
        Main_HideElement('chat_container1');
        if (Main_IsOn_OSInterface && !Play_isFullScreen) OSInterface_mupdatesizePP(Play_isFullScreen);
        PlayExtra_UnSetPanel();
        Play_HideBufferDialog();
        Play_showWarningMiddleDialog(Reason, 2500);
    }
}

function PlayExtra_updateStreamInfo() {
    Play_updateStreamInfoGet(Main_helix_api + 'streams?user_id=' + PlayExtra_data.data[14], 0);
}
