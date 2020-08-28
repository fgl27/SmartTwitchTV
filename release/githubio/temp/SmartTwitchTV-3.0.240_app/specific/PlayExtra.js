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
var PlayExtra_KeyEnterID;
var PlayExtra_clear = false;
var PlayExtra_PicturePicture = false;

var PlayExtra_WasPicturePicture = false;

function PlayExtra_ResetSpeed() {
    Play_controls[Play_controlsSpeed].defaultValue = Play_CurrentSpeed;
    Play_controls[Play_controlsSpeed].bottomArrows();
    Play_controls[Play_controlsSpeed].setLable();
}

function PlayExtra_ResetAudio() {
    //After setting we only reset this if the app is close/re opened
    Play_controls[Play_controlsAudio].defaultValue = Play_controlsAudioPos;
    Play_controls[Play_controlsAudio].bottomArrows();
    Play_controls[Play_controlsAudio].setLable();
}

function PlayExtra_KeyEnter() {
    PlayExtra_clear = true;

    var doc = Play_CheckLiveThumb();
    if (doc) {

        PlayExtra_WasPicturePicture = PlayExtra_PicturePicture;

        if (PlayExtra_WasPicturePicture) {
            //PlayExtra_PicturePicture was alredy enable so save data and update live historyinfo
            PlayExtra_SavePlayData();
        } else PlayExtra_Save_data = JSON.parse(JSON.stringify(Play_data_base));

        PlayExtra_data.data = doc;
        PlayExtra_data.watching_time = new Date().getTime();

        PlayExtra_data.isHost = Main_A_includes_B(PlayExtra_data.data[1], STR_USER_HOSTING);

        if (PlayExtra_data.isHost) {
            PlayExtra_data.DisplaynameHost = PlayExtra_data.data[1];
            PlayExtra_data.data[1] = PlayExtra_data.DisplaynameHost.split(STR_USER_HOSTING)[1];
        }

        PlayExtra_PicturePicture = true;

        Main_innerHTML('chat_container_name_text1', STR_SPACE + PlayExtra_data.data[1] + STR_SPACE);

        if (Main_IsOn_OSInterface) {
            //Not on auto mode for change to auto before start picture in picture
            if (!Main_A_includes_B(Play_data.quality, 'Auto')) OSInterface_SetQuality(-1);
            Play_SetPlayQuality("Auto");
            Play_qualityDisplay(Play_getQualitiesCount, 0, Play_SetHtmlQuality, Play_controlsQuality);
            PlayExtra_data.quality = "Auto";
            PlayExtra_data.qualityPlaying = PlayExtra_data.quality;
        }

        if (!Play_PreviewId) PlayExtra_Resume();
        else {

            PlayExtra_data.AutoUrl = Play_PreviewURL;
            PlayExtra_loadDataSuccessEnd(Play_PreviewResponseText);

            Play_CheckIfIsLiveCleanEnd();
        }

        Main_EventPlay(
            'live',
            PlayExtra_data.data[6],
            PlayExtra_data.data[3],
            !PlayExtra_data.isHost ? PlayExtra_data.data[15] : 'HOSTING',
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].Screen,
            'PP'
        );

    }
}

var PlayExtra_ResumeId = 0;
function PlayExtra_Resume(synchronous) {
    if (Main_IsOn_OSInterface) {

        PlayExtra_ResumeId = (new Date().getTime());

        //On resume to avoid out of sync resumes we run PP synchronous
        if (synchronous) {
            var StreamData = Play_getStreamData(PlayExtra_data.data[6]);

            if (StreamData) PlayExtra_ResumeResultEnd(JSON.parse(StreamData));
            else PlayExtra_loadDataFail(STR_PLAYER_PROBLEM_2);

        } else {
            OSInterface_getStreamDataAsync(
                Play_live_token.replace('%x', PlayExtra_data.data[6]),
                Play_live_links.replace('%x', PlayExtra_data.data[6]),
                'PlayExtra_ResumeResult',
                PlayExtra_ResumeId,
                1,
                DefaultHttpGetReTryMax,
                DefaultHttpGetTimeout
            );
        }

    } else PlayExtra_loadDataFail(STR_PLAYER_PROBLEM_2);
}

function PlayExtra_ResumeResult(response) {

    if (PlayExtra_PicturePicture && Play_isOn && response) {

        var responseObj = JSON.parse(response);

        if (responseObj.checkResult > 0 && responseObj.checkResult === PlayExtra_ResumeId) {

            PlayExtra_ResumeResultEnd(responseObj);

        }

    }

}

function PlayExtra_ResumeResultEnd(responseObj) {

    if (responseObj.status === 200) {

        PlayExtra_data.AutoUrl = responseObj.url;
        PlayExtra_loadDataSuccessEnd(responseObj.responseText);
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

function PlayExtra_loadDataSuccessEnd(playlist) {
    UserLiveFeed_Hide();
    OSInterface_mSwitchPlayerAudio(Play_controls[Play_controlsAudio].defaultValue);
    PlayExtra_data.watching_time = new Date().getTime();
    Play_SetAudioIcon();
    PlayExtra_data.playlist = playlist;
    PlayExtra_SetPanel();

    if (!Play_isFullScreen) {
        OSInterface_mupdatesizePP(Play_isFullScreen);
        ChatLive_Init(1);
        PlayExtra_ShowChat();
        Play_SetChatSideBySide();
    } else OSInterface_mSwitchPlayerSize(Play_PicturePictureSize);

    if (Play_isOn) PlayExtra_qualityChanged();
    PlayExtra_Save_data = JSON.parse(JSON.stringify(Play_data_base));
    PlayExtra_updateStreamInfo();
    ChatLive_Playing = true;


    if (!PlayExtra_data.isHost) Main_Set_history('live', PlayExtra_data.data);
    Play_loadingInfoDataTry = 0;
    Play_updateVodInfo(PlayExtra_data.data[14], PlayExtra_data.data[7], 0);
}

function PlayExtra_SavePlayData() {
    PlayExtra_Save_data = JSON.parse(JSON.stringify(PlayExtra_data));
    Main_Set_history('live', PlayExtra_data.data);
}

function PlayExtra_RestorePlayData() {
    Play_showWarningMidleDialog(PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE, 2000);

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

    if (Main_values.Main_Go === Main_aGame) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
    Play_loadingInfoDataTry = 0;

    PlayExtra_SwitchPlayerResStoreOld();
    Main_SaveValues();

    Play_UpdateMainStream(true, false);
    Main_innerHTML('chat_container_name_text1', STR_SPACE + PlayExtra_data.data[1] + STR_SPACE);
    Main_innerHTML('chat_container_name_text0', STR_SPACE + Play_data.data[1] + STR_SPACE);
    Play_SetExternalQualities(Play_extractQualities(Play_data.playlist), 0, Play_data.data[1]);
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

function PlayExtra_End(doSwitch, fail_type) { // Called only by JAVA
    if (!fail_type && Settings_value.open_host.defaultValue) {
        Play_showWarningMidleDialog(PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE + STR_CHECK_HOST, 2000);

        Main_setTimeout(
            function() {
                PlayExtra_loadDataCheckHost(doSwitch ? 1 : 0);
            },
            2000//Delay as the stream just ended and may not show as host yet
        );
    } else PlayExtra_End_success(doSwitch, fail_type);
}

function PlayExtra_End_success(doSwitch, fail_type) {

    var reason = PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE;
    if (fail_type === 1) reason = STR_PLAYER_ERROR + STR_BR + STR_PLAYER_ERROR_MULTI;
    if (fail_type === 2) reason = STR_PLAYER_LAG_ERRO + STR_BR + STR_PLAYER_ERROR_MULTI;

    //Some player ended switch and warn
    if (doSwitch) {//Main player has end switch and close
        OSInterface_mSwitchPlayer();
        PlayExtra_SwitchPlayer();
    }

    Play_showWarningMidleDialog(reason, 2500 + (fail_type ? 2500 : 0));

    Play_CloseSmall();
}

function PlayExtra_loadDataCheckHost(doSwitch) {
    //TODO replace all '[]' with null for performance after some app updates
    OSInterface_GetMethodUrlHeadersAsync(
        ChatLive_Base_chat_url + 'hosts?include_logins=1&host=' + encodeURIComponent(doSwitch ? Play_data.data[14] : PlayExtra_data.data[14]),//urlString
        DefaultHttpGetTimeout,//timeout
        null,//postMessage, null for get
        null,//Method, null for get
        '[]',//JsonString
        'PlayExtra_CheckHostResult',//callback
        0,//checkResult
        doSwitch,//key
        3//thread
    );

}

function PlayExtra_CheckHostResult(result, doSwitch) {
    if (result) {

        var resultObj = JSON.parse(result);

        if (resultObj.status === 200) {
            PlayExtra_CheckHost(resultObj.responseText, doSwitch);
        } else {
            PlayExtra_End_success(doSwitch);
        }

    } else PlayExtra_End_success(doSwitch);
}

function PlayExtra_CheckHost(responseText, doSwitch) {
    var TargetHost = JSON.parse(responseText).hosts[0],
        warning_text;

    if (TargetHost.target_login !== undefined &&
        TargetHost.target_id !== PlayExtra_data.data[14] && TargetHost.target_id !== Play_data.data[14]) {
        if (doSwitch) {

            Play_IsWarning = true;
            warning_text = Play_data.data[1] + STR_IS_NOW + STR_USER_HOSTING + TargetHost.target_display_name;

            Main_values.Play_isHost = true;

            Play_data.DisplaynameHost = Play_data.data[1] + STR_USER_HOSTING + TargetHost.target_display_name;
            Play_data.data[6] = TargetHost.target_login;
            Play_data.data[1] = TargetHost.target_display_name;
            Play_data.data[14] = TargetHost.target_id;

            Play_Start();

            Play_showWarningDialog(warning_text, 4000);
            //Java will reset audio source reset it
            OSInterface_mSwitchPlayerAudio(Play_controls[Play_controlsAudio].defaultValue);
        } else {

            Play_IsWarning = true;
            warning_text = PlayExtra_data.data[1] + STR_IS_NOW + STR_USER_HOSTING + TargetHost.target_display_name;

            PlayExtra_data.DisplaynameHost = Play_data.data[1] + STR_USER_HOSTING + TargetHost.target_display_name;
            PlayExtra_data.data[6] = TargetHost.target_login;
            PlayExtra_data.data[1] = TargetHost.target_display_name;
            PlayExtra_data.data[14] = TargetHost.target_id;
            PlayExtra_data.isHost = true;

            PlayExtra_Resume();

            Play_showWarningDialog(warning_text, 4000);

        }
    } else PlayExtra_End_success(doSwitch);

}

function PlayExtra_SetPanel() {
    Play_controls[Play_controlsChatSide].setLable();
    Play_controls[Play_controlsChatSide].setIcon();

    Play_BottomShow(Play_controlsAudio);
    Play_BottomShow(Play_controlsQualityMini);

    Play_BottomHide(Play_controlsQuality);

    Play_IconsResetFocus();
    PlayExtra_UpdatePanel();
    Main_HideElement('stream_info');
    Main_ShowElement('stream_info_pp');
}

function PlayExtra_UnSetPanel() {
    PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
    Play_controls[Play_controlsChatSide].setLable();
    Play_controls[Play_controlsChatSide].setIcon();

    Play_BottomShow(Play_controlsQuality);

    Play_BottomHide(Play_controlsAudio);
    Play_BottomHide(Play_controlsQualityMini);
    Play_BottomHide(Play_controlsQualityMulti);
    Play_BottomHide(Play_controlsAudioMulti);

    Play_IconsResetFocus();
    ChatLive_Clear(1);
    PlayExtra_HideChat();

    Main_HideElement('stream_info_pp');
    Main_ShowElement('stream_info');
}

function PlayExtra_ClearExtra() {
    PlayExtra_PicturePicture = false;
    PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
}

function PlayExtra_UpdatePanel() {
    Main_innerHTML(
        'stream_info_pp_name0',
        Play_partnerIcon(
            Play_data.isHost ? Play_data.DisplaynameHost : Play_data.data[1],
            Play_data.data[10],
            0,
            Play_data.data[5] ? Play_data.data[5].split(' ')[1] : '',
            Play_data.data[8]
        )
    );
    Main_getElementById('stream_info_ppimg0').src = Play_data.data[9];

    Main_innerHTML('stream_info_pp_title0', twemoji.parse(Play_data.data[2], false, true));
    Main_innerHTML('stream_info_pp_game0', Play_data.data[3] === '' ? STR_SPACE : STR_PLAYING + Play_data.data[3]);
    Main_innerHTML('stream_info_pp_viewers0', STR_FOR + Main_addCommas((Play_data.data[13] > 0) ? Play_data.data[13] : 0) + STR_SPACE + STR_VIEWER + ',');

    Main_innerHTML(
        'stream_info_pp_name1',
        Play_partnerIcon(
            PlayExtra_data.isHost ? PlayExtra_data.DisplaynameHost : PlayExtra_data.data[1],
            PlayExtra_data.data[10],
            0,
            PlayExtra_data.data[5] ? PlayExtra_data.data[5].split(' ')[1] : '',
            PlayExtra_data.data[8]
        )
    );
    Main_getElementById('stream_info_ppimg1').src = PlayExtra_data.data[9];
    Main_innerHTML('stream_info_pp_title1', twemoji.parse(PlayExtra_data.data[2], false, true));

    Main_innerHTML('stream_info_pp_game1', PlayExtra_data.data[3] === '' ? STR_SPACE : STR_PLAYING + PlayExtra_data.data[3]);
    Main_innerHTML('stream_info_pp_viewers1', STR_FOR + Main_addCommas((PlayExtra_data.data[13] > 0) ? PlayExtra_data.data[13] : 0) + STR_SPACE + STR_VIEWER + ',');
}

function PlayExtra_qualityChanged() {
    if (Main_IsOn_OSInterface && Play_isOn) {
        OSInterface_StartAuto(PlayExtra_data.AutoUrl, PlayExtra_data.playlist, 1, 0, 1);
    }

    if (Main_AndroidSDK < 26 && Main_values.check_pp_workaround && !Settings_Obj_default("pp_workaround")) {

        Main_ShowElement('dialog_os');
        Main_removeEventListener("keydown", Play_handleKeyDown);
        Main_addEventListener("keydown", PlayExtra_handleKeyDown);

        Main_values.check_pp_workaround = false;
        Main_SaveValues();
    }

    //Main_Log('PlayExtra_onPlayer: Auto');
}

function PlayExtra_handleKeyDown(e) {
    if (e.keyCode === KEY_RETURN || e.keyCode === KEY_KEYBOARD_BACKSPACE) {

        Main_removeEventListener("keydown", PlayExtra_handleKeyDown);
        Main_addEventListener("keydown", Play_handleKeyDown);
        Main_HideElement('dialog_os');

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
        Play_showWarningMidleDialog(Reason, 2500);
    }
}

function PlayExtra_updateStreamInfo() {
    Play_updateStreamInfoGet(
        Main_kraken_api + 'streams/?stream_type=all&channel=' + PlayExtra_data.data[14] + Main_TwithcV5Flag,
        0,
        false
    );
}