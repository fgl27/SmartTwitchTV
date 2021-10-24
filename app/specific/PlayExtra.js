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

function PlayExtra_KeyEnter() {
    PlayExtra_clear = true;
    PlayExtra_loadDataCheckHostId = 0;

    if (Play_MaxInstances < 2) {

        Play_showWarningMidleDialog(
            STR_4_WAY_MULTI_INSTANCES.replace('%x', Play_MaxInstances) + STR_PP_MODO,
            3000
        );

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

        PlayExtra_data.isHost = Main_A_includes_B(PlayExtra_data.data[1], STR_USER_HOSTING);

        if (PlayExtra_data.isHost) {
            PlayExtra_data.DisplaynameHost = PlayExtra_data.data[1];
            PlayExtra_data.data[1] = PlayExtra_data.DisplaynameHost.split(STR_USER_HOSTING)[1];
        }

        PlayExtra_PicturePicture = true;

        Main_innerHTML('chat_container_name_text1', STR_SPACE_HTML + PlayExtra_data.data[1] + STR_SPACE_HTML);

        if (Main_IsOn_OSInterface) {
            //Not on auto mode for change to auto before start picture in picture
            if (!Main_A_includes_B(Play_data.quality, 'Auto')) OSInterface_SetQuality(-1);
            Play_SetPlayQuality("Auto");
            Play_qualityDisplay(Play_getQualitiesCount, 0, Play_SetHtmlQuality, Play_controls[Play_controlsQuality]);
            PlayExtra_data.quality = "Auto";
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

        PlayExtra_ResumeId = (new Date().getTime());

        //On resume to avoid out of sync resumes we run PP synchronous
        if (synchronous) {

            var StreamData = Play_getStreamData(PlayExtra_data.data[6]);

            //Do not check host on async, as both player may have endede with will cause a out of sync error
            //causing the player to stop in a black state
            if (StreamData) PlayExtra_ResumeResultEnd(JSON.parse(StreamData), false);
            else PlayExtra_End(false, 0);

        } else {

            OSInterface_getStreamDataAsync(
                PlayClip_BaseUrl,
                Play_live_links.replace('%x', PlayExtra_data.data[6]),
                'PlayExtra_ResumeResult',
                PlayExtra_ResumeId,
                1,
                DefaultHttpGetTimeout,
                false,
                Play_live_token.replace('%x', PlayExtra_data.data[6])
            );

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

    PlayExtra_SwitchPlayerResStoreOld();
    Main_SaveValues();

    Play_UpdateMainStream(Play_isFullScreen, false);

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

function PlayExtra_End_success(doSwitch, fail_type, errorCode) {

    var reason = (doSwitch ? Play_data.data[1] : PlayExtra_data.data[1]) + ' ' + STR_LIVE + STR_IS_OFFLINE;

    if (fail_type === 1) reason = STR_PLAYER_ERROR + STR_BR + STR_PLAYER_ERROR_MULTI;
    if (fail_type === 2) reason = STR_PLAYER_LAG_ERRO + STR_BR + STR_PLAYER_ERROR_MULTI;

    //Some player ended switch and warn
    if (doSwitch) {//Main player has end switch and close
        OSInterface_mSwitchPlayer();
        PlayExtra_SwitchPlayer();
    }

    Play_showWarningMidleDialog(
        reason + Play_GetErrorCode(errorCode),
        2500 + (fail_type ? 2500 : 0)
    );

    Play_CloseSmall();
}

var PlayExtra_loadDataCheckHostId;
function PlayExtra_loadDataCheckHost(doSwitch) {

    PlayExtra_loadDataCheckHostId = new Date().getTime();

    //Check in case both players end at same time, internet error or something that can cause it
    var Channel_Name = doSwitch ? Play_data.data[14] : PlayExtra_data.data[14];

    if (Channel_Name) {

        Main_GetHost(
            PlayExtra_CheckHost,
            doSwitch,
            PlayExtra_loadDataCheckHostId,
            Channel_Name
        );

    } else PlayExtra_End_success(doSwitch);

}

function PlayExtra_CheckHost(responseObj, doSwitch, id) {

    if (Play_isOn && PlayExtra_loadDataCheckHostId === id) {

        if (responseObj.status === 200) {

            var data = JSON.parse(responseObj.responseText).data,
                warning_text;

            if (data.user && data.user.hosting) {

                var TargetHost = data.user.hosting;

                TargetHost.id = parseInt(TargetHost.id);

                if (TargetHost.id !== PlayExtra_data.data[14] && TargetHost.id !== Play_data.data[14]) {

                    Play_IsWarning = true;
                    warning_text = (doSwitch ? Play_data.data[1] : PlayExtra_data.data[1]) + STR_IS_NOW + STR_USER_HOSTING + TargetHost.displayName;

                    if (doSwitch) {

                        Main_values.Play_isHost = true;

                        Play_data.DisplaynameHost = Play_data.data[1] + STR_USER_HOSTING + TargetHost.displayName;
                        Play_data.data[6] = TargetHost.login;
                        Play_data.data[1] = TargetHost.displayName;
                        Play_data.data[14] = parseInt(TargetHost.id);

                        Play_Start();

                        Play_AudioReset(0);

                    } else if (PlayExtra_PicturePicture) {

                        PlayExtra_data.DisplaynameHost = Play_data.data[1] + STR_USER_HOSTING + TargetHost.displayName;
                        PlayExtra_data.data[6] = TargetHost.login;
                        PlayExtra_data.data[1] = TargetHost.displayName;
                        PlayExtra_data.data[14] = parseInt(TargetHost.id);
                        PlayExtra_data.isHost = true;

                        PlayExtra_Resume();

                    }

                    Play_showWarningDialog(warning_text, 4000);
                    return;
                }

            }

        }

        PlayExtra_End_success(doSwitch);

    }

}

function PlayExtra_SetPanel() {
    Play_controls[Play_controlsChatSide].setLable();
    Play_controls[Play_controlsChatSide].setIcon();

    Play_SetControlsVisibility('ShowInPP');

    PlayExtra_UpdatePanel();
    Main_HideElement('stream_info');
    Main_ShowElement('stream_info_pp');
}

function PlayExtra_UnSetPanel() {
    PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
    Play_controls[Play_controlsChatSide].setLable();
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
    Main_innerHTML('stream_info_pp_game0', Play_data.data[3] === '' ? STR_SPACE_HTML : STR_PLAYING + Play_data.data[3]);
    Main_innerHTML(
        'stream_info_pp_viewers0',
        STR_FOR + Main_addCommas(Play_data.data[13]) + STR_SPACE_HTML + Main_GetViewerStrings(Play_data.data[13]) + ','
    );

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

    Main_innerHTML('stream_info_pp_game1', PlayExtra_data.data[3] === '' ? STR_SPACE_HTML : STR_PLAYING + PlayExtra_data.data[3]);
    Main_innerHTML(
        'stream_info_pp_viewers1',
        STR_FOR + Main_addCommas(PlayExtra_data.data[13]) + STR_SPACE_HTML + Main_GetViewerStrings(PlayExtra_data.data[13]) + ','
    );
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
        0
    );
}