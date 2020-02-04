//Variable initialization
var PlayExtra_KeyEnterID;
var PlayExtra_clear = false;
var PlayExtra_loadingDataTry = 0;
var PlayExtra_state = Play_STATE_LOADING_TOKEN;
var PlayExtra_PicturePicture = false;
var PlayExtra_RefreshAutoTry = 0;

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
            if (Play_data.quality.indexOf("Auto") === -1) Android.StartAuto(1, 0);

            Play_data.quality = "Auto";
            Play_data.qualityPlaying = Play_data.quality;
            PlayExtra_data.quality = "Auto";
            PlayExtra_data.qualityPlaying = PlayExtra_data.quality;
        }
        PlayExtra_Resume();

    }
}

function PlayExtra_Resume() {
    // restart audio source position to where ther user has left it
    if (Main_IsNotBrowser) Android.mSwitchPlayerAudio(Play_controlsAudioPos);
    PlayExtra_data.watching_time = new Date().getTime();
    Play_SetAudioIcon();
    PlayExtra_state = Play_STATE_LOADING_TOKEN;
    PlayExtra_loadingDataTry = 0;
    PlayExtra_loadDataRequest();
}

function PlayExtra_SavePlayData() {
    PlayExtra_Save_data = JSON.parse(JSON.stringify(PlayExtra_data));
}

function PlayExtra_RestorePlayData() {
    Play_showWarningDialog(PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE);
    window.setTimeout(function() {
        Play_HideWarningDialog();
    }, 2000);

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

    Play_UpdateMainStream();

    PlayExtra_SwitchPlayerResStoreOld();
    Main_SaveValues();

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

    //If in 50/50 fix postion
    if (!Play_isFullScreen) {
        Play_isFullScreen = !Play_isFullScreen;
        Play_SetFullScreen(Play_isFullScreen);
    } // else if (doSwitch) Android.mSwitchPlayer(); // else if doSwitch switch small to big

    PlayExtra_PicturePicture = false;
    PlayExtra_UnSetPanel();

    Play_showWarningDialog(PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE);
    window.setTimeout(function() {
        Play_HideWarningDialog();
    }, 2500);
}

function PlayExtra_loadDataSuccess(responseText) {
    if (PlayExtra_state === Play_STATE_LOADING_TOKEN) {
        Play_tokenResponse = JSON.parse(responseText);
        PlayExtra_state = Play_STATE_LOADING_PLAYLIST;
        PlayExtra_loadingDataTry = 0;
        PlayExtra_loadDataRequest();
    } else if (PlayExtra_state === Play_STATE_LOADING_PLAYLIST) {

        //Low end device will not support High Level 5.2 video/mp4; codecs="avc1.640034"
        //        if (!Main_SupportsAvc1High && PlayExtra_SupportsSource && responseText.indexOf('avc1.640034') !== -1) {
        //            PlayExtra_SupportsSource = false;
        //            PlayExtra_loadingDataTry = 0;
        //            PlayExtra_loadDataRequest();
        //            return;
        //        }
        UserLiveFeed_Hide();
        Android.SetAuto2(PlayExtra_data.AutoUrl);
        PlayExtra_data.qualities = Play_extractQualities(responseText);
        PlayExtra_state = Play_STATE_PLAYING;
        PlayExtra_SetPanel();
        if (Play_isOn) PlayExtra_qualityChanged();
        PlayExtra_Save_data = JSON.parse(JSON.stringify(Play_data_base));
        PlayExtra_updateStreamInfo();
        ChatLive_Playing = true;

        if (!Play_isFullScreen) {
            Android.mupdatesizePP(!Play_isFullScreen);
            ChatLive_Init(1);
            PlayExtra_ShowChat();
        }
        Main_Set_history('live', PlayExtra_data.data);
        Play_loadingInfoDataTry = 0;
        Play_updateVodInfo(PlayExtra_data.data[14], PlayExtra_data.data[7], 0);
    }
}

function PlayExtra_SetPanel() {
    Play_controls[Play_controlsChatSide].setLable();
    Play_controls[Play_controlsChatSide].setIcon();
    document.getElementById('controls_' + Play_controlsQuality).style.display = 'none';
    document.getElementById('controls_' + Play_controlsAudio).style.display = '';
    document.getElementById('controls_' + Play_controlsQualityMini).style.display = '';
    Play_IconsResetFocus();
}

function PlayExtra_UnSetPanel() {
    PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
    Play_controls[Play_controlsChatSide].setLable();
    Play_controls[Play_controlsChatSide].setIcon();
    document.getElementById('controls_' + Play_controlsQuality).style.display = '';
    document.getElementById('controls_' + Play_controlsAudio).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQualityMini).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQualityMulti).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQualityMulti).style.display = 'none';
    document.getElementById('controls_' + Play_controlsAudioMulti).style.display = 'none';
    Play_IconsResetFocus();
    ChatLive_Clear(1);
    PlayExtra_HideChat();
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
    if (e.keyCode === KEY_RETURN || e.keyCode === KEY_RETURN_Q || e.keyCode === KEY_KEYBOARD_BACKSPACE) {

        document.body.removeEventListener("keydown", PlayExtra_handleKeyDown, false);
        document.body.addEventListener("keydown", Play_handleKeyDown, false);
        Main_HideElement('dialog_os');

    }
}

function PlayExtra_loadDataRequest() {
    var theUrl, state = PlayExtra_state === Play_STATE_LOADING_TOKEN;

    if (state) {
        theUrl = 'https://api.twitch.tv/api/channels/' + PlayExtra_data.data[6] + '/access_token?platform=_';
    } else {
        theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + PlayExtra_data.data[6] +
            '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
            '&reassignments_supported=true&playlist_include_framerate=true&fast_bread=true&allow_source=true' +
            (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();

        //(PlayExtra_SupportsSource ? "&allow_source=true" : '') +
        //(Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();

        PlayExtra_data.AutoUrl = theUrl;
    }

    var xmlHttp;
    if (Main_IsNotBrowser) {
        if (state) xmlHttp = Android.mreadUrlHLS(theUrl);
        else xmlHttp = Android.mreadUrl(theUrl, 3000, 0, null);

        if (xmlHttp) {
            PlayExtra_loadDataSuccessreadyState(JSON.parse(xmlHttp));
        } else Play_loadDataError();

    } else {
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = Play_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) PlayExtra_loadDataSuccessreadyState(xmlHttp);
        };

        xmlHttp.send(null);
    }
}

function PlayExtra_loadDataSuccessreadyState(xmlHttp) {
    if (xmlHttp.status === 200) {

        if (xmlHttp.responseText.indexOf('"status":410') !== -1) PlayExtra_loadDataError();
        else {
            Play_loadingDataTry = 0;
            PlayExtra_loadDataSuccess(xmlHttp.responseText);
        }

    } else if (xmlHttp.status === 403) { //forbidden access
        PlayExtra_loadDataFail(STR_FORBIDDEN);
    } else if (xmlHttp.status === 404) { //off line
        PlayExtra_loadDataFail(PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE);
    } else PlayExtra_loadDataError();
}

function PlayExtra_loadDataError() {
    if (Play_isOn && Play_isLive) {
        PlayExtra_loadingDataTry++;
        if (PlayExtra_loadingDataTry < Play_loadingDataTryMax) PlayExtra_loadDataRequest();
        else PlayExtra_loadDataFail(STR_PLAYER_PROBLEM_2);
    }
}

function PlayExtra_loadDataFail(Reason) {
    if (Play_data_old.data.length < 0) {

        PlayExtra_PicturePicture = false;
        PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
        ChatLive_Clear(1);
        Main_HideElement('chat_container2');
        if (Main_IsNotBrowser && !Play_isFullScreen) Android.mupdatesize(!Play_isFullScreen);

        Play_HideBufferDialog();
        Play_showWarningDialog(Reason);
        window.setTimeout(function() {
            Play_HideWarningDialog();
        }, 2500);
    } else PlayExtra_RestorePlayData();
}

function PlayExtra_RefreshAutoRequest(UseAndroid) {
    var theUrl = 'https://api.twitch.tv/api/channels/' + PlayExtra_data.data[6] + '/access_token?platform=_';

    var xmlHttp = Android.mreadUrlHLS(theUrl);

    if (xmlHttp) PlayExtra_RefreshAutoRequestSucess(JSON.parse(xmlHttp), UseAndroid);
    else PlayExtra_RefreshAutoError(UseAndroid);
}

function PlayExtra_RefreshAutoRequestSucess(xmlHttp, UseAndroid) {
    if (xmlHttp.status === 200) {

        Play_tokenResponse = JSON.parse(xmlHttp.responseText);
        //410 error
        if (!Play_tokenResponse.hasOwnProperty('token') || !Play_tokenResponse.hasOwnProperty('sig') ||
            xmlHttp.responseText.indexOf('"status":410') !== -1) {
            PlayExtra_RefreshAutoError(UseAndroid);
            return;
        }

        var theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + PlayExtra_data.data[6] +
            '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
            '&reassignments_supported=true&playlist_include_framerate=true&fast_bread=true' +
            '&reassignments_supported=true&playlist_include_framerate=true&fast_bread=true&allow_source=true' +
            (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();

        //(PlayExtra_SupportsSource ? "&allow_source=true" : '') +
        //(Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();

        PlayExtra_data.AutoUrl = theUrl;

        if (UseAndroid) Android.ResStartAuto2(theUrl);
        else Android.SetAuto2(theUrl);

    } else PlayExtra_RefreshAutoError(UseAndroid);
}

function PlayExtra_RefreshAutoError(UseAndroid) {
    if (Play_isOn) {
        PlayExtra_RefreshAutoTry++;
        if (PlayExtra_RefreshAutoTry < 5) PlayExtra_RefreshAutoRequest(UseAndroid);
        else if (UseAndroid) PlayExtra_loadDataFail(STR_PLAYER_PROBLEM_2);
    }
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
