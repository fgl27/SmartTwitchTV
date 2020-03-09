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

        PlayExtra_PicturePicture = true;
        Play_UserLiveFeedPressed = true;

        Main_innerHTML('chat_container2_name_text', STR_SPACE + PlayExtra_data.data[1] + STR_SPACE);

        if (Main_IsNotBrowser) {
            //Not on auto mode for change to auto before start picture in picture
            if (!Main_A_includes_B(Play_data.quality, 'Auto')) Android.StartAuto(1, 0);

            Play_data.quality = "Auto";
            Play_data.qualityPlaying = Play_data.quality;
            PlayExtra_data.quality = "Auto";
            PlayExtra_data.qualityPlaying = PlayExtra_data.quality;
        }

        if (!Play_CheckIfIsLiveQualities.length) PlayExtra_Resumenew();
        else {

            PlayExtra_data.AutoUrl = Play_CheckIfIsLiveURL;
            PlayExtra_loadDataSuccessEnd(JSON.parse(JSON.stringify(Play_CheckIfIsLiveQualities)));

            Play_CheckIfIsLiveCleanEnd();
        }

    }
}

function PlayExtra_Resumenew() {
    if (Main_IsNotBrowser) {

        var StreamData = Play_getStreamData(PlayExtra_data.data[6], true);

        if (StreamData) {
            StreamData = JSON.parse(StreamData);//obj status url responseText

            if (StreamData.status === 200) {

                PlayExtra_data.AutoUrl = StreamData.url;
                PlayExtra_loadDataSuccessEnd(StreamData.responseText);
                return;

            } else if (StreamData.status === 1 || StreamData.status === 403) {

                PlayExtra_loadDataFail(STR_FORBIDDEN);
                return;

            } else if (StreamData.status === 404) {

                PlayExtra_loadDataFail(PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE);
                return;

            }

        }

    }

    PlayExtra_loadDataFail(STR_PLAYER_PROBLEM_2);
}

function PlayExtra_loadDataSuccessEnd(qualities) {
    UserLiveFeed_Hide();
    Android.mSwitchPlayerAudio(Play_controlsAudioPos);
    PlayExtra_data.watching_time = new Date().getTime();
    Play_SetAudioIcon();
    Android.SetAuto2(PlayExtra_data.AutoUrl);
    PlayExtra_data.qualities = qualities;
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


    Main_Set_history('live', PlayExtra_data.data);
    Play_loadingInfoDataTry = 0;
    Play_updateVodInfo(PlayExtra_data.data[14], PlayExtra_data.data[7], 0);
}

function PlayExtra_SavePlayData() {
    PlayExtra_Save_data = JSON.parse(JSON.stringify(PlayExtra_data));
}

function PlayExtra_RestorePlayData() {
    Play_showWarningDialog(PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE, 2000);

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
    //Some player ended switch and warn
    if (doSwitch) PlayExtra_SwitchPlayer();

    Play_showWarningDialog(PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE, 2500);

    Play_CloseSmall();
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
//     Main_HideElement('stream_info');
//     Main_ShowElement('stream_info_pp');
// }

function PlayExtra_UpdatePanel() {
    Main_innerHTML('stream_info_pp_name0',
        Play_partnerIcon(Play_data.isHost ? Play_data.DisplaynameHost : Play_data.data[1], Play_data.data[10], true, Play_data.data[5] ? Play_data.data[5].split(' ')[1] : ''));
    document.getElementById('stream_info_ppimg0').src = Play_data.data[9];

    Main_innerHTML('stream_info_pp_title0', twemoji.parse(Play_data.data[2], false, true));
    Main_innerHTML('stream_info_pp_game0', Play_data.data[3] === '' ? STR_SPACE : STR_PLAYING + Play_data.data[3]);
    Main_innerHTML('stream_info_pp_viewers0', STR_FOR + Main_addCommas((Play_data.data[13] > 0) ? Play_data.data[13] : 0) + STR_SPACE + STR_VIEWER + ',');

    Main_innerHTML('stream_info_pp_name1',
        Play_partnerIcon(PlayExtra_data.isHost ? PlayExtra_data.DisplaynameHost : PlayExtra_data.data[1], PlayExtra_data.data[10], true, PlayExtra_data.data[5] ? PlayExtra_data.data[5].split(' ')[1] : '', true));
    document.getElementById('stream_info_ppimg1').src = PlayExtra_data.data[9];
    Main_innerHTML('stream_info_pp_title1', twemoji.parse(PlayExtra_data.data[2], false, true));

    Main_innerHTML('stream_info_pp_game1', PlayExtra_data.data[3] === '' ? STR_SPACE : STR_PLAYING + PlayExtra_data.data[3]);
    Main_innerHTML('stream_info_pp_viewers1', STR_FOR + Main_addCommas((PlayExtra_data.data[13] > 0) ? PlayExtra_data.data[13] : 0) + STR_SPACE + STR_VIEWER + ',');
}

function PlayExtra_qualityChanged() {
    if (Main_IsNotBrowser && Play_isOn) Android.initializePlayer2Auto();

    if (Main_AndroidSDK < 26 && Main_values.check_pp_workaround && !Settings_Obj_default("pp_workaround")) {

        Main_ShowElement('dialog_os');
        document.body.removeEventListener("keydown", Play_handleKeyDown, false);
        document.body.addEventListener("keydown", PlayExtra_handleKeyDown, false);

        Main_values.check_pp_workaround = false;
        Main_SaveValues();
    }

    if (Main_isDebug) console.log('PlayExtra_onPlayer: Auto');
}

function PlayExtra_handleKeyDown(e) {
    if (e.keyCode === KEY_RETURN || e.keyCode === KEY_KEYBOARD_BACKSPACE) {

        document.body.removeEventListener("keydown", PlayExtra_handleKeyDown, false);
        document.body.addEventListener("keydown", Play_handleKeyDown, false);
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
        if (Main_IsNotBrowser && !Play_isFullScreen) Android.mupdatesize(Play_isFullScreen);
        PlayExtra_UnSetPanel();
        Play_HideBufferDialog();
        Play_showWarningDialog(Reason, 2500);
    }
}

function PlayExtra_RefreshAutoRequest(RestartAuto) {

    var tempUrl = Play_RefreshHlsUrl(PlayExtra_data.data[6]);

    if (tempUrl) {

        PlayExtra_data.AutoUrl = tempUrl;

        if (RestartAuto) Android.ResStartAuto2(tempUrl);
        else Android.SetAuto2(tempUrl);

    } else if (RestartAuto) PlayExtra_loadDataFail(STR_PLAYER_PROBLEM_2);

}

function PlayExtra_updateStreamInfo() {
    var theUrl = Main_kraken_api + 'streams/' + PlayExtra_data.data[14] + Main_TwithcV5Flag_I;
    BasexmlHttpGet(theUrl, 3000, 2, null, PlayExtra_updateStreamInfoValues, PlayExtra_updateStreamInfoError);
}

function PlayExtra_updateStreamInfoValues(response) {
    response = JSON.parse(response);
    if (response.stream !== null) {

        Main_history_UpdateLive(
            response.stream._id,
            response.stream.game,
            response.stream.channel.status,
            response.stream.viewers
        );

        //if ... Player is playing ... else... was closed by Play_CloseSmall just Main_history_UpdateLive
        if (PlayExtra_data.data.length > 0) {
            PlayExtra_data.data[2] = response.stream.channel.status;
            PlayExtra_data.data[3] = response.stream.game;
            PlayExtra_data.data[7] = response.stream._id;
            PlayExtra_data.data[8] = Main_is_rerun(response.stream.broadcast_platform);
            PlayExtra_data.data[12] = response.stream.created_at;
            PlayExtra_data.data[13] = response.stream.viewers;

            PlayExtra_UpdatePanel();
        }
    }
}

function PlayExtra_updateStreamInfoError() {
    if (Play_updateStreamInfoErrorTry < Play_loadingInfoDataTryMax) {
        window.setTimeout(function() {
            if (Play_isOn) PlayExtra_updateStreamInfo();
            //give a second for it retry as the TV may be on coming from resume
        }, 2500);
        Play_updateStreamInfoErrorTry++;
    } else Play_updateStreamInfoErrorTry = 0;
}
