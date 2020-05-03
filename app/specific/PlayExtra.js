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
        Play_UserLiveFeedPressed = true;

        Main_innerHTML('chat_container2_name_text', STR_SPACE + PlayExtra_data.data[1] + STR_SPACE);

        if (Main_IsOnAndroid) {
            //Not on auto mode for change to auto before start picture in picture
            if (!Main_A_includes_B(Play_data.quality, 'Auto')) Android.SetQuality(-1);

            Play_data.quality = "Auto";
            Play_data.qualityPlaying = Play_data.quality;
            Play_qualityDisplay(Play_getQualitiesCount, 0, Play_SetHtmlQuality);
            PlayExtra_data.quality = "Auto";
            PlayExtra_data.qualityPlaying = PlayExtra_data.quality;
        }

        if (!Play_CheckIfIsLiveResponseText) PlayExtra_Resume();
        else {

            PlayExtra_data.AutoUrl = Play_CheckIfIsLiveURL;
            PlayExtra_loadDataSuccessEnd(Play_CheckIfIsLiveResponseText);

            Play_CheckIfIsLiveCleanEnd();
        }

    }
}

var PlayExtra_ResumeId = 0;
function PlayExtra_Resume() {
    if (Main_IsOnAndroid) {

        PlayExtra_ResumeId = (new Date().getTime());
        //TODO remove the try after some app updates
        try {
            Android.getStreamDataAsync(
                Play_live_token.replace('%x', PlayExtra_data.data[6]),
                Play_live_links.replace('%x', PlayExtra_data.data[6]),
                'PlayExtra_ResumeResult',
                PlayExtra_ResumeId,
                1
            );
        } catch (e) {
            PlayExtra_loadDataFail(STR_PLAYER_PROBLEM_2);
        }

    } else PlayExtra_loadDataFail(STR_PLAYER_PROBLEM_2);
}

function PlayExtra_ResumeResult(response) {

    if (PlayExtra_PicturePicture && Play_isOn && response) {

        var responseObj = JSON.parse(response);

        if (responseObj.checkResult > 0 && responseObj.checkResult === PlayExtra_ResumeId) {

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

    }

}

function PlayExtra_loadDataSuccessEnd(playlist) {
    UserLiveFeed_Hide();
    Android.mSwitchPlayerAudio(Play_controlsAudioPos);
    PlayExtra_data.watching_time = new Date().getTime();
    Play_SetAudioIcon();
    PlayExtra_data.playlist = playlist;
    PlayExtra_SetPanel();

    if (!Play_isFullScreen) {
        Android.mupdatesizePP(Play_isFullScreen);
        ChatLive_Init(1);
        PlayExtra_ShowChat();
    } else Android.mSwitchPlayerSize(Play_PicturePictureSize);

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
    Main_innerHTML('chat_container2_name_text', STR_SPACE + PlayExtra_data.data[1] + STR_SPACE);
    Main_innerHTML('chat_container_name_text', STR_SPACE + Play_data.data[1] + STR_SPACE);
}

function PlayExtra_ShowChat() {
    Main_ShowElement('chat_container2');
    Main_ShowElement('chat_container_name');
    Main_ShowElement('chat_container2_name');
}

function PlayExtra_HideChat() {
    Main_HideElement('chat_container2');
    Main_HideElement('chat_container_name');
    Main_HideElement('chat_container2_name');
}

function PlayExtra_End(doSwitch) { // Called only by JAVA
    if (Settings_value.open_host.defaultValue) {
        Play_loadingDataTry = 0;
        Play_loadingDataTimeout = 2000;
        PlayExtra_loadDataCheckHost(doSwitch ? 1 : 0);
    } else PlayExtra_End_success(doSwitch);
}

function PlayExtra_End_success(doSwitch) {
    //Some player ended switch and warn
    if (doSwitch) PlayExtra_SwitchPlayer();

    Play_showWarningMidleDialog(PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE, 2500);

    Play_CloseSmall();
}

function PlayExtra_loadDataCheckHost(doSwitch) {
    var theUrl = 'https://tmi.twitch.tv/hosts?include_logins=1&host=' + encodeURIComponent(doSwitch ? Play_data.data[14] : PlayExtra_data.data[14]);

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
            'PlayExtra_CheckHostResult',//callback
            0,//checkResult
            doSwitch,//key
            11//thread
        );

    } catch (e) {
        PlayExtra_End_success(doSwitch);
    }
}

function PlayExtra_CheckHostResult(result, doSwitch) {
    if (result) {
        var resultObj = JSON.parse(result);
        if (resultObj.status === 200) {
            PlayExtra_CheckHost(resultObj.responseText, doSwitch);
        } else {
            PlayExtra_loadDataCheckHostError(doSwitch);
        }
    }
    else PlayExtra_loadDataCheckHostError(doSwitch);
}

function PlayExtra_loadDataCheckHostError(doSwitch) {
    Play_loadingDataTry++;
    if (Play_loadingDataTry < Play_loadingDataTryMax) {
        Play_loadingDataTimeout += 250;
        PlayExtra_loadDataCheckHost(doSwitch);
    } else PlayExtra_End_success(doSwitch);
}

function PlayExtra_CheckHost(responseText, doSwitch) {
    var TargetHost = JSON.parse(responseText).hosts[0],
        warning_text;

    if (TargetHost.target_login !== undefined) {
        if (doSwitch) {
            Play_IsWarning = true;
            warning_text = Play_data.data[1] + STR_IS_NOW + STR_USER_HOSTING + TargetHost.target_display_name;

            Main_values.Play_isHost = true;

            Play_data.DisplaynameHost = Play_data.data[1] + STR_USER_HOSTING + TargetHost.target_display_name;
            Play_data.data[6] = TargetHost.target_login;
            Play_data.data[1] = TargetHost.target_display_name;
            Play_data.data[14] = TargetHost.target_id;

            Main_setTimeout(Play_Start);

            Play_showWarningDialog(warning_text, 4000);

        } else {
            Play_IsWarning = true;
            warning_text = PlayExtra_data.data[1] + STR_IS_NOW + STR_USER_HOSTING + TargetHost.target_display_name;

            PlayExtra_data.DisplaynameHost = Play_data.data[1] + STR_USER_HOSTING + TargetHost.target_display_name;
            PlayExtra_data.data[6] = TargetHost.target_login;
            PlayExtra_data.data[1] = TargetHost.target_display_name;
            PlayExtra_data.data[14] = TargetHost.target_id;
            PlayExtra_data.isHost = true;

            Main_setTimeout(PlayExtra_Resume);

            Play_showWarningDialog(warning_text, 4000);
        }
    } else PlayExtra_End_success(doSwitch);

}

function PlayExtra_SetPanel() {
    Play_controls[Play_controlsChatSide].setLable();
    Play_controls[Play_controlsChatSide].setIcon();
    document.getElementById('controls_' + Play_controlsQuality).style.display = 'none';
    document.getElementById('controls_' + Play_controlsAudio).style.display = '';
    document.getElementById('controls_' + Play_controlsQualityMini).style.display = '';
    Play_IconsResetFocus();
    PlayExtra_UpdatePanel();
    Main_HideElement('stream_info');
    Main_ShowElement('stream_info_pp');
}

function PlayExtra_UnSetPanel() {
    PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
    Play_controls[Play_controlsChatSide].setLable();
    Play_controls[Play_controlsChatSide].setIcon();

    document.getElementById('controls_' + Play_controlsQuality).style.display = '';
    document.getElementById('controls_' + Play_controlsAudio).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQualityMini).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQualityMulti).style.display = 'none';
    document.getElementById('controls_' + Play_controlsAudioMulti).style.display = 'none';

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

// function PlayExtra_UpdatePanelTest() {
//     PlayExtra_data = Play_data;
//     PlayExtra_UpdatePanel();
//     Play_SetAudioIcon();
//     Main_HideElement('stream_info');
//     Main_ShowElement('stream_info_pp');
// }

function PlayExtra_UpdatePanel() {
    Main_innerHTML(
        'stream_info_pp_name0',
        Play_partnerIcon(
            Play_data.isHost ? Play_data.DisplaynameHost : Play_data.data[1],
            Play_data.data[10],
            true,
            Play_data.data[5] ? Play_data.data[5].split(' ')[1] : '',
            Play_data.data[8]
        )
    );
    document.getElementById('stream_info_ppimg0').src = Play_data.data[9];

    Main_innerHTML('stream_info_pp_title0', twemoji.parse(Play_data.data[2], false, true));
    Main_innerHTML('stream_info_pp_game0', Play_data.data[3] === '' ? STR_SPACE : STR_PLAYING + Play_data.data[3]);
    Main_innerHTML('stream_info_pp_viewers0', STR_FOR + Main_addCommas((Play_data.data[13] > 0) ? Play_data.data[13] : 0) + STR_SPACE + STR_VIEWER + ',');

    Main_innerHTML(
        'stream_info_pp_name1',
        Play_partnerIcon(
            PlayExtra_data.isHost ? PlayExtra_data.DisplaynameHost : PlayExtra_data.data[1],
            PlayExtra_data.data[10],
            true,
            PlayExtra_data.data[5] ? PlayExtra_data.data[5].split(' ')[1] : '',
            PlayExtra_data.data[8]
        )
    );
    document.getElementById('stream_info_ppimg1').src = PlayExtra_data.data[9];
    Main_innerHTML('stream_info_pp_title1', twemoji.parse(PlayExtra_data.data[2], false, true));

    Main_innerHTML('stream_info_pp_game1', PlayExtra_data.data[3] === '' ? STR_SPACE : STR_PLAYING + PlayExtra_data.data[3]);
    Main_innerHTML('stream_info_pp_viewers1', STR_FOR + Main_addCommas((PlayExtra_data.data[13] > 0) ? PlayExtra_data.data[13] : 0) + STR_SPACE + STR_VIEWER + ',');
}

function PlayExtra_qualityChanged() {
    if (Main_IsOnAndroid && Play_isOn) {
        Android.StartAuto(PlayExtra_data.AutoUrl, PlayExtra_data.playlist, 1, 0, 1);
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
        Main_HideElement('chat_container2');
        if (Main_IsOnAndroid && !Play_isFullScreen) Android.mupdatesize(Play_isFullScreen);
        PlayExtra_UnSetPanel();
        Play_HideBufferDialog();
        Play_showWarningMidleDialog(Reason, 2500);
    }
}

function PlayExtra_updateStreamInfo() {
    var theUrl = Main_kraken_api + 'streams/' + PlayExtra_data.data[14] + Main_TwithcV5Flag_I;
    BasexmlHttpGet(theUrl, 3000, 2, null, PlayExtra_updateStreamInfoValues, PlayExtra_updateStreamInfoError);
}

function PlayExtra_updateStreamInfoValues(response) {
    response = JSON.parse(response);
    if (response.stream !== null) {

        var tempData = ScreensObj_LiveCellArray(response.stream);
        Main_Set_history('live', tempData);

        //if ... Player is playing ... else... was closed by Play_CloseSmall just Main_history_UpdateLive
        if (PlayExtra_data.data.length > 0) {
            PlayExtra_data.data = tempData;

            PlayExtra_UpdatePanel();
        }
    }
}

function PlayExtra_updateStreamInfoError() {
    if (Play_updateStreamInfoErrorTry < Play_loadingInfoDataTryMax) {
        Main_setTimeout(
            function() {
                if (Play_isOn) PlayExtra_updateStreamInfo();
                //give a second for it retry as the TV may be on coming from resume
            },
            2500
        );
        Play_updateStreamInfoErrorTry++;
    } else Play_updateStreamInfoErrorTry = 0;
}
