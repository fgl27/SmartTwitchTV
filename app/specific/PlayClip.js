//Variable initialization
var PlayClip_isOn = false;
var PlayClip_quality = 'source';
var PlayClip_qualityPlaying = PlayClip_quality;
var PlayClip_qualityIndex = 0;
var PlayClip_qualities = [];
var PlayClip_playingUrl = '';
var PlayClip_replayOrNext = false;
var PlayClip_replay = false;
var PlayClip_state = 0;
var PlayClip_HasVOD = false;
var PlayClip_Buffer = 2000;
var PlayClip_loadData410 = false;

var PlayClip_jumpTimers = [0, 5];

var PlayClip_HasNext = false;
var PlayClip_HasBack = false;
var PlayClip_HideShowNextDiv = ['next_button', 'back_button'];
var PlayClip_EnterPos = 0;
var PlayClip_All = false;
var PlayClip_All_Forced = true;
var PlayClip_loadingtreamerInfoTry = 0;
//Variable initialization end

var PlayClip_BaseUrl = 'https://gql.twitch.tv/gql';
var PlayClip_postMessage = '{"query":"\\n {\\n clip(slug: \\"%x\\") {\\n videoQualities {\\n frameRate\\n quality\\n sourceURL\\n }\\n }\\n }\\n"}';

function PlayClip_Start() {
    //Main_Log('PlayClip_Start');

    Play_showBufferDialog();
    Play_HideEndDialog();

    PlayClip_HasVOD = Main_values.ChannelVod_vodId !== null;
    Chat_title = STR_CLIP;

    document.getElementById('next_button_img').src = IMG_404_BANNER;
    document.getElementById('back_button_img').src = IMG_404_BANNER;
    document.getElementById('end_button_img').src = IMG_404_BANNER;
    Main_ShowElement('next_button_img');
    Main_ShowElement('back_button_img');
    Main_ShowElement('end_button_img');

    Play_LoadLogo(document.getElementById('stream_info_icon'), IMG_404_BANNER);
    Main_innerHTML(
        "stream_info_name",
        Play_partnerIcon(
            Main_values.Main_selectedChannelDisplayname,
            false,
            2,
            ChannelClip_language
        )
    );

    Main_innerHTML("stream_info_title", ChannelClip_title);
    Main_innerHTML("stream_info_game", ChannelClip_game);

    Main_innerHTML("stream_live_time", ChannelClip_createdAt + ',' + STR_SPACE + ChannelClip_views);
    Main_textContent("stream_live_viewers", '');
    Main_textContent("stream_watching_time", '');

    Main_textContent('progress_bar_duration', Play_timeS(Play_DurationSeconds));
    Play_DefaultjumpTimers = PlayClip_jumpTimers;
    PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);
    Main_replaceClassEmoji('stream_info_title');
    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);

    Main_values.Play_isHost = false;
    PlayClip_SetOpenVod();
    document.getElementById('controls_' + Play_controlsChatDelay).style.display = 'none';
    document.getElementById('controls_' + Play_controlsLowLatency).style.display = 'none';
    document.getElementById('controls_' + Play_MultiStream).style.display = 'none';
    document.getElementById('controls_' + Play_controlsChatSend).style.display = 'none';
    PlayExtra_UnSetPanel();
    Play_CurrentSpeed = 3;
    Play_BufferSize = 0;
    PlayVod_previews_clear();
    Play_IconsResetFocus();
    Main_empty('inner_progress_bar_muted');

    Main_textContent('progress_bar_current_time', Play_timeS(0));

    Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i> </div>');
    Main_ShowElement('progress_bar_div');
    Main_ShowElement('controls_holder');

    PlayClip_state = Play_STATE_LOADING_TOKEN;
    UserLiveFeed_PreventHide = false;
    PlayClip_UpdateNext();
    Play_EndSet(3);
    UserLiveFeed_Unset();
    Play_IsWarning = false;

    PlayClip_isOn = true;

    if (!Play_PreviewId) {

        if (!PlayClip_replay) PlayClip_loadData();//Play_PlayEndStart(3);
        else PlayClip_qualityChanged();

    } else {

        PlayClip_QualityStart(Play_PreviewResponseText);
        Play_CheckIfIsLiveCleanEnd();

    }

    if (PlayClip_HasVOD) {
        Chat_offset = ChannelVod_vodOffset;
        Chat_Init();
    } else Chat_NoVod();

    PlayClip_replay = false;

    PlayClip_loadingtreamerInfoTry = 0;
    PlayClip_GetStreamerInfo();
    if (PlayClip_HasVOD) {
        PlayVod_loadingInfoDataTry = 0;
        PlayClip_updateVodInfo();
    } else {
        Main_textContent("end_vod_name_text", '');
        Main_innerHTML("end_vod_title_text", '');
        Play_controls[Play_controlsOpenVod].setLable('');
    }

    PlayVod_CheckFollow();
    Play_ShowPanelStatus(3);
    Play_controls[Play_controlsChanelCont].setLable(Main_values.Main_selectedChannelDisplayname);
    Play_controls[Play_controlsGameCont].setLable(Play_data.data[3]);
}

function PlayClip_updateVodInfo() {
    var theUrl = Main_kraken_api + 'videos/' + Main_values.ChannelVod_vodId + Main_TwithcV5Flag_I;
    BasexmlHttpGet(theUrl, (DefaultHttpGetTimeout * 2) + (PlayVod_loadingInfoDataTry * DefaultHttpGetTimeoutPlus), 2, null, PlayClip_updateVodInfoSucess, PlayClip_updateVodInfoError);
}

function PlayClip_updateVodInfoSucess(response) {
    ChannelVod_title = Main_ReplaceLargeFont(twemoji.parse(JSON.parse(response).title, false, false));
    Main_innerHTML("end_vod_title_text", ChannelVod_title);
    Play_controls[Play_controlsOpenVod].setLable(ChannelVod_title);
}

function PlayClip_updateVodInfoError() {
    PlayVod_loadingInfoDataTry++;
    if (PlayVod_loadingInfoDataTry < DefaultHttpGetReTryMax) {
        PlayClip_updateVodInfo();
    }
}

function PlayClip_GetStreamerInfo() {
    //Main_Log('PlayClip_GetStreamerInfo');
    var theUrl = Main_kraken_api + 'channels/' + Main_values.Main_selectedChannel_id + Main_TwithcV5Flag_I;

    BasexmlHttpGet(theUrl, (DefaultHttpGetTimeout * 2) + (PlayClip_loadingtreamerInfoTry * DefaultHttpGetTimeoutPlus), 2, null, PlayClip_GetStreamerInfoSuccess, PlayClip_GetStreamerInfoSuccessError);
}

function PlayClip_GetStreamerInfoSuccessError() {
    PlayClip_loadingtreamerInfoTry++;
    if (PlayClip_loadingtreamerInfoTry < DefaultHttpGetReTryMax) PlayClip_GetStreamerInfo();
}

function PlayClip_GetStreamerInfoSuccess(response) {
    Main_values.Main_selectedChannelPartner = JSON.parse(response).partner;
    Main_innerHTML(
        "stream_info_name",
        Play_partnerIcon(
            Main_values.Main_selectedChannelDisplayname,
            Main_values.Main_selectedChannelPartner,
            2,
            ChannelClip_language
        )
    );
}

function PlayClip_loadData() {
    if (!Main_IsOn_OSInterface) {
        PlayClip_loadDataSuccessFake();
        return;
    } else if (PlayClip_loadData410) {
        PlayClip_loadDataSuccess410();
        return;
    }
    PlayClip_loadDataRequest();
}

var PlayClip_loadDataRequestId = 0;

function PlayClip_loadDataRequest() {

    PlayClip_loadDataRequestId = (new Date().getTime());

    OSInterface_GetMethodUrlHeadersAsync(
        PlayClip_BaseUrl,//urlString
        DefaultHttpGetTimeout,//timeout
        PlayClip_postMessage.replace('%x', ChannelClip_playUrl),//postMessage, null for get
        'POST',//Method, null for get
        JSON.stringify(
            [
                [Main_clientIdHeader, Main_Headers_Back[0][1]]
            ]
        ),//JsonString
        'PlayClip_loadDataResult',//callback
        PlayClip_loadDataRequestId,//checkResult
        0,//key
        0//thread
    );
}

function PlayClip_loadDataResult(response) {

    if (PlayClip_isOn && response) {

        var responseObj = JSON.parse(response);

        if (responseObj.checkResult > 0 && responseObj.checkResult === PlayClip_loadDataRequestId) {

            if (responseObj.status === 200) {
                PlayClip_QualityStart(PlayClip_QualityGenerate(responseObj.responseText));
                return;
            } else if (responseObj.status === 410) { //Workaround for future 410 issue
                PlayClip_loadData410 = true;
                PlayClip_loadData410Recheck();
                PlayClip_loadDataSuccess410();
                return;
            }

            PlayClip_loadDataError();
        }

    }

}

function PlayClip_loadData410Recheck() {
    Main_Log('PlayClip_loadData410Recheck');
    Main_setTimeout(
        function() {
            PlayClip_loadData410 = false;
        },
        (30 * 60 * 1000)//try again after 30min
    );
}

function PlayClip_loadDataError() {
    if (Main_IsOn_OSInterface) {
        Play_HideBufferDialog();
        Play_PlayEndStart(3);
    } else PlayClip_loadDataSuccessFake();
}

function PlayClip_loadDataSuccessFake() {
    PlayClip_qualities = [
        {
            'id': 'Auto',
            'url': 'https://fake_auto'
        },
        {
            'id': '1080p60 | source | mp4',
            'url': 'https://fake_1080p60'
        },
    ];
    Play_SetExternalQualities(PlayClip_qualities, 1);
    PlayClip_state = Play_STATE_PLAYING;
    PlayClip_qualityChanged();
    Main_Set_history('clip', Main_values_Play_data);
}

function PlayClip_loadDataSuccess410() {
    PlayClip_qualities = [];
    PlayClip_qualities.push({
        'id': 'Auto',
        'url': ChannelClip_playUrl2
    });

    PlayClip_state = Play_STATE_PLAYING;
    PlayClip_qualityChanged();
    Main_Set_history('clip', Main_values_Play_data);
}

function PlayClip_QualityGenerate(mresponse) {
    var Array = [],
        response = JSON.parse(mresponse);

    if (response && response.hasOwnProperty('data') && response.data.hasOwnProperty('clip')) {
        response = response.data.clip.videoQualities;

        var i = 0, len = response.length;
        for (i; i < len; i++) {

            if (!Array.length) {
                Array.push({
                    'id': response[i].quality + 'p' + PlayClip_FrameRate(response[i].frameRate) + ' | source | mp4',
                    'url': response[i].sourceURL
                });
            } else {
                Array.push({
                    'id': response[i].quality + 'p' + PlayClip_FrameRate(response[i].frameRate) + ' | mp4',
                    'url': response[i].sourceURL
                });
            }
        }
    }

    return Array;
}

function PlayClip_QualityStart(qualities) {
    PlayClip_qualities = qualities;

    Play_SetExternalQualities(PlayClip_qualities, 0);
    PlayClip_state = Play_STATE_PLAYING;
    PlayClip_qualityChanged();
    Main_Set_history('clip', Main_values_Play_data);
}

function PlayClip_FrameRate(value) {
    if (value > 40) return 60;
    else return '';
}

function PlayClip_qualityChanged() {
    PlayClip_qualityIndex = 0;
    PlayClip_playingUrl = PlayClip_qualities[0].url;

    for (var i = 0; i < PlayClip_getQualitiesCount(); i++) {
        if (PlayClip_qualities[i].id === PlayClip_quality) {
            PlayClip_qualityIndex = i;
            PlayClip_playingUrl = PlayClip_qualities[i].url;
            break;
        } else if (Main_A_includes_B(PlayClip_qualities[i].id, PlayClip_quality)) { //make shore to set a value before break out
            PlayClip_qualityIndex = i;
            PlayClip_playingUrl = PlayClip_qualities[i].url;
        }
    }

    PlayClip_state = Play_STATE_PLAYING;

    PlayClip_quality = PlayClip_qualities[PlayClip_qualityIndex].id;
    PlayClip_qualityPlaying = PlayClip_quality;
    PlayClip_SetHtmlQuality('stream_quality');
    PlayClip_onPlayer();
    //Play_PannelEndStart(3);
}

function PlayClip_onPlayer() {
    //Main_Log('PlayClip_onPlayer ' + PlayClip_playingUrl);

    if (Main_IsOn_OSInterface && PlayClip_isOn) {
        OSInterface_StartAuto(
            PlayClip_playingUrl,
            '',
            3,
            PlayClip_replayOrNext ? -1 : OSInterface_gettime(),
            0
        );
    }

    PlayClip_replayOrNext = false;

    if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
    Play_SetFullScreen(Play_isFullScreen);
}

function PlayClip_Resume() {
    //return;
    Main_clearInterval(Play_ShowPanelStatusId);
    PlayClip_shutdownStream();
}

function PlayClip_shutdownStream() {
    //Main_Log('PlayClip_shutdownStream ' + PlayClip_isOn);

    if (PlayClip_isOn) {
        PlayClip_All = false;
        PlayClip_PreshutdownStream(true);
        Play_CleanHideExit();
        Play_exitMain();
    }
}

function PlayClip_PreshutdownStream(closePlayer, PreventcleanQuailities) {
    //Main_Log('PlayClip_PreshutdownStream ' + closePlayer);

    Main_history_UpdateVodClip(ChannelClip_Id, Main_IsOn_OSInterface ? (parseInt(OSInterface_gettime() / 1000)) : 0, 'clip');
    PlayClip_hidePanel();
    if (Main_IsOn_OSInterface && !Play_PreviewId) {
        if (closePlayer) OSInterface_stopVideo(3);
        else OSInterface_PlayPause(false);
    }
    if (closePlayer) PlayClip_isOn = false;
    Chat_Clear();
    Play_ClearPlayer();

    if (!Play_PreviewId) UserLiveFeed_Hide(PreventcleanQuailities);
    else UserLiveFeed_HideAfter();

    PlayClip_qualities = [];
    Main_removeEventListener("keydown", PlayClip_handleKeyDown);
    ChannelVod_vodOffset = 0;
}

function PlayClip_UpdateNext() {
    var nextid = PlayClip_getIdNext(1, 0);
    var backid = PlayClip_getIdNext(-1, ScreenObj[Screens_Current_Key].ColoumnsCount - 1);
    var data;

    PlayClip_HasNext = false;
    PlayClip_HasBack = false;

    if (nextid) {
        PlayClip_HasNext = true;
        data = JSON.parse(document.getElementById(ScreenObj[Screens_Current_Key].ids[3] + nextid).getAttribute(Main_DataAttribute));

        PlayClip_NextImg(document.getElementById('next_button_img'), data[15]);
        Main_innerHTML("next_button_text_name", Main_ReplaceLargeFont(data[4]));
        Main_innerHTML("next_button_text_title", Main_ReplaceLargeFont(data[10]));

        PlayClip_NextImg(document.getElementById('end_button_img'), data[15]);
        Main_innerHTML("end_next_button_text_name", Main_ReplaceLargeFont(data[4]));
        Main_innerHTML("end_next_button_text_title", Main_ReplaceLargeFont(data[10]));

        PlayClip_HideShowNext(0, 1);
    } else {
        PlayClip_HideShowNext(0, 0);
        Main_HideElement('end_button_img');
    }

    if (backid) {
        PlayClip_HasBack = true;
        data = JSON.parse(document.getElementById(ScreenObj[Screens_Current_Key].ids[3] + backid).getAttribute(Main_DataAttribute));

        PlayClip_NextImg(document.getElementById('back_button_img'), data[15]);
        Main_innerHTML("back_button_text_name", Main_ReplaceLargeFont(data[4]));
        Main_innerHTML("back_button_text_title", Main_ReplaceLargeFont(data[10]));
        PlayClip_HideShowNext(1, 1);
    } else PlayClip_HideShowNext(1, 0);
}

function PlayClip_NextImg(ImgObjet, link) {
    ImgObjet.onerror = function() {
        this.onerror = null;
        this.src = IMG_404_BANNER;
        Main_HideElementWithEle(this);
    };
    ImgObjet.src = link;
}

function PlayClip_getIdNext(y, x) {
    if (Main_ThumbNull((ScreenObj[Screens_Current_Key].posY), (ScreenObj[Screens_Current_Key].posX + y), ScreenObj[Screens_Current_Key].ids[0]))
        return ScreenObj[Screens_Current_Key].posY + '_' + (ScreenObj[Screens_Current_Key].posX + y);
    else if (Main_ThumbNull((ScreenObj[Screens_Current_Key].posY + y), x, ScreenObj[Screens_Current_Key].ids[0]))
        return (ScreenObj[Screens_Current_Key].posY + y) + '_' + x;

    return null;
}

function PlayClip_HideShowNext(which, val) {
    document.getElementById(PlayClip_HideShowNextDiv[which]).style.opacity = val;
}

function PlayClip_Enter() {
    if (!PlayClip_EnterPos) {
        if (Main_IsOn_OSInterface && !Play_isEndDialogVisible()) OSInterface_PlayPauseChange();
    } else if (PlayClip_EnterPos === 1) PlayClip_PlayNext();
    else if (PlayClip_EnterPos === -1) PlayClip_PlayPreviously();
}

function PlayClip_PlayNext() {
    Screens_KeyLeftRight(1, 0, Screens_Current_Key);
    PlayClip_PlayNextPreviously();
}

function PlayClip_PlayPreviously() {
    Screens_KeyLeftRight(-1, ScreenObj[Screens_Current_Key].ColoumnsCount - 1, Screens_Current_Key);
    PlayClip_PlayNextPreviously();
}

function PlayClip_PlayNextPreviously() {
    Play_ForceHidePannel();
    Main_ready(function() {
        PlayClip_replayOrNext = true;
        PlayClip_PreshutdownStream(false);
        Main_OpenClip(ScreenObj[Screens_Current_Key].posY + '_' + ScreenObj[Screens_Current_Key].posX, ScreenObj[Screens_Current_Key].ids, ScreenObj[Screens_Current_Key].key_fun);
    });
}

function PlayClip_hidePanel() {
    //return;//return;
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_addToJump = 0;
    Play_clearHidePanel();
    PlayClip_quality = PlayClip_qualityPlaying;
    Play_ForceHidePannel();
    if (Main_IsOn_OSInterface) PlayVod_ProgresBarrUpdate((OSInterface_gettime() / 1000), Play_DurationSeconds, true);
    Main_innerHTML('progress_bar_jump_to', STR_SPACE);
    document.getElementById('progress_bar_steps').style.display = 'none';
    Main_clearInterval(PlayVod_RefreshProgressBarrID);
}

function PlayClip_showPanel() {
    PlayVod_RefreshProgressBarr();
    Play_clock();
    PlayVod_RefreshProgressBarrID = Main_setInterval(PlayVod_RefreshProgressBarr, 1000, PlayVod_RefreshProgressBarrID);
    Play_CleanHideExit();
    PlayVod_IconsBottonResetFocus();
    PlayClip_qualityIndexReset();
    PlayExtra_ResetSpeed();
    Play_qualityDisplay(PlayClip_getQualitiesCount, PlayClip_qualityIndex, PlayClip_SetHtmlQuality, Play_controlsQuality);
    Play_ForceShowPannel();
    Play_clearHidePanel();
    PlayClip_setHidePanel();
}

function PlayClip_qualityIndexReset() {
    PlayClip_qualityIndex = 0;
    for (var i = 0; i < PlayClip_getQualitiesCount(); i++) {
        if (PlayClip_qualities[i].id === PlayClip_quality) {
            PlayClip_qualityIndex = i;
            break;
        } else if (Main_A_includes_B(PlayClip_qualities[i].id, PlayClip_quality)) { //make shore to set a value before break out
            PlayClip_qualityIndex = i;
        }
    }
}

function PlayClip_getQualitiesCount() {
    return PlayClip_qualities.length;
}

function PlayClip_SetHtmlQuality(element) {
    if (!PlayClip_qualities[PlayClip_qualityIndex].hasOwnProperty('id')) return;

    PlayClip_quality = PlayClip_qualities[PlayClip_qualityIndex].id;

    var quality_string = PlayClip_quality;
    if (Main_A_includes_B(PlayClip_quality, 'source')) quality_string = quality_string.replace("source", STR_SOURCE);

    Main_textContent(element, PlayClip_quality);
}

function PlayClip_setHidePanel() {
    Play_PanelHideID = Main_setTimeout(PlayClip_hidePanel, (5000 + PlayVod_ProgressBaroffset), Play_PanelHideID); // time in ms
}

function PlayClip_SetOpenVod() {
    document.getElementById('controls_' + Play_controlsOpenVod).style.display = PlayClip_HasVOD ? 'inline-block' : 'none';
}

function PlayClip_OpenVod() {
    if (PlayClip_HasVOD) {
        Play_DurationSeconds = 0;
        Main_vodOffset = ChannelVod_vodOffset;
        PlayClip_PreshutdownStream(true);
        Main_addEventListener("keydown", PlayVod_handleKeyDown);
        Play_IconsResetFocus();
        Main_ready(PlayVod_Start);
    } else {
        Play_clearHidePanel();
        Play_IsWarning = true;
        Play_showWarningDialog(STR_NO_BROADCAST_WARNING, 2000);
    }
}

//When update this check PlayVod_CheckIfIsLiveResult
function PlayClip_CheckIfIsLiveResult(response) {

    if (PlayClip_isOn && response) {

        var responseObj = JSON.parse(response);

        if (responseObj.checkResult > 0 && responseObj.checkResult === Play_PreviewCheckId) {
            var doc = document.getElementById(UserLiveFeed_ids[3] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]);

            if (responseObj.status === 200) {

                Play_PreviewURL = responseObj.url;
                Play_PreviewResponseText = responseObj.responseText;
                PlayClip_OpenLiveStream();
                return;

            } else if (doc && (responseObj.status === 1 || responseObj.status === 403)) {

                Play_CheckIfIsLiveStartFail(JSON.parse(doc.getAttribute(Main_DataAttribute))[1] + ' ' + STR_LIVE + STR_BR + STR_FORBIDDEN);
                return;

            } else if (doc && responseObj.status === 404) {

                Play_CheckIfIsLiveStartFail(JSON.parse(doc.getAttribute(Main_DataAttribute))[1] + ' ' + STR_LIVE + STR_IS_OFFLINE);
                return;

            }

            Play_CheckIfIsLiveStartFail(STR_PLAYER_PROBLEM_2);
        }

    }

}

function PlayClip_CheckIfIsLiveStart() {

    if (!Main_IsOn_OSInterface || Play_PreviewId) PlayClip_OpenLiveStream();
    else Play_CheckIfIsLiveStart('PlayClip_CheckIfIsLiveResult');

}

function PlayClip_OpenLiveStream() {
    PlayClip_PreshutdownStream(true, true);
    Main_OpenLiveStream(
        UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX],
        UserLiveFeed_ids,
        PlayClip_handleKeyDown,
        !UserLiveFeed_CheckVod()
    );
}

function PlayClip_CheckPreview() {
    if (Settings_Obj_default('show_clip_player') && ScreenObj[Screens_Current_Key].screenType === 2 &&
        !Sidepannel_isShowing() &&
        !Main_ThumbOpenIsNull(ScreenObj[Screens_Current_Key].posY + '_' + ScreenObj[Screens_Current_Key].posX, ScreenObj[Screens_Current_Key].ids[0])) {

        var doc = document.getElementById(ScreenObj[Screens_Current_Key].ids[3] + ScreenObj[Screens_Current_Key].posY + '_' + ScreenObj[Screens_Current_Key].posX);
        if (doc) {
            var ThumbId = JSON.parse(doc.getAttribute(Main_DataAttribute))[0];

            if (Main_A_equals_B(ThumbId, ChannelClip_playUrl)) {
                Play_PreviewURL = PlayClip_qualities[0].url;
                Play_PreviewResponseText = PlayClip_qualities;
                Play_PreviewId = ChannelClip_playUrl;
            }
        }
    }
}

function PlayClip_handleKeyDown(e) {
    if (PlayClip_state !== Play_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_STOP:
                Play_CleanHideExit();
                PlayClip_shutdownStream();
                break;
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                if (Play_ExitDialogVisible() || Play_SingleClickExit) {
                    Play_CleanHideExit();
                    PlayClip_shutdownStream();
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
                else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(3, -1);
                    else if (!PlayVod_PanelY) {
                        PlayVod_jumpStart(-1, Play_DurationSeconds);
                        PlayVod_ProgressBaroffset = 2500;
                    } else if (PlayVod_PanelY === 1) {
                        if (PlayClip_EnterPos > -1) {
                            PlayClip_EnterPos--;
                            if (PlayClip_HasBack || !PlayClip_EnterPos) PlayVod_IconsBottonFocus();
                            else PlayClip_EnterPos++;
                        }
                    }
                    PlayClip_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter--;
                    if (Play_Endcounter < (PlayClip_HasNext ? -1 : 0)) Play_Endcounter = 3;
                    Play_EndIconsAddFocus();
                } else PlayClip_FastBackForward(-1);
                break;
            case KEY_RIGHT:
                if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) UserLiveFeed_KeyRightLeft(1);
                else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(3, 1);
                    else if (!PlayVod_PanelY) {
                        PlayVod_jumpStart(1, Play_DurationSeconds);
                        PlayVod_ProgressBaroffset = 2500;
                    } else if (PlayVod_PanelY === 1) {
                        if (PlayClip_EnterPos < 1) {
                            PlayClip_EnterPos++;
                            if (PlayClip_HasNext || !PlayClip_EnterPos) PlayVod_IconsBottonFocus();
                            else PlayClip_EnterPos--;
                        }
                    }
                    PlayClip_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = PlayClip_HasNext ? -1 : 0;
                    Play_EndIconsAddFocus();
                } else PlayClip_FastBackForward(1);
                break;
            case KEY_UP:
                if (Play_isEndDialogVisible() || UserLiveFeed_isFeedShow()) {
                    Play_EndTextClear();
                    Main_removeEventListener("keydown", PlayClip_handleKeyDown);
                    Main_addEventListener("keyup", Play_handleKeyUp);
                    Play_EndUpclear = false;
                    Play_EndUpclearCalback = PlayClip_handleKeyDown;
                    Play_EndUpclearID = Main_setTimeout(Play_keyUpEnd, Screens_KeyUptimeout, Play_EndUpclearID);
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY--;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(3, 1);
                    PlayClip_setHidePanel();
                } else if (!UserLiveFeed_isFeedShow()) UserLiveFeed_ShowFeed();
                else PlayClip_showPanel();
                break;
            case KEY_DOWN:
                if (Play_isEndDialogVisible()) Play_EndDialogUpDown(1);
                else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(3, -1);
                    PlayClip_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_KeyUpDown(1);
                else if (Play_isFullScreen && !Play_isPanelShown()) Play_controls[Play_controlsChat].enterKey(3);
                else PlayClip_showPanel();
                break;
            case KEY_ENTER:
                if (Play_isEndDialogVisible()) {
                    if (Play_EndFocus) Play_EndDialogPressed(3);
                    else {
                        if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].IsGame) UserLiveFeed_KeyEnter(UserLiveFeed_FeedPosX);
                        else {
                            Play_EndDialogEnter = 3;
                            Play_EndUpclearCalback = PlayClip_handleKeyDown;
                            Play_SavePlayData();
                            Main_OpenLiveStream(
                                UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX],
                                UserLiveFeed_ids,
                                PlayClip_handleKeyDown,
                                !UserLiveFeed_CheckVod()
                            );
                        }
                    }
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (!PlayVod_PanelY) {
                        if (PlayVod_IsJumping) PlayVod_jump();
                    } else if (PlayVod_PanelY === 1) PlayClip_Enter();
                    else Play_BottomOptionsPressed(3);
                    PlayClip_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) {
                    if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].IsGame) UserLiveFeed_KeyEnter(UserLiveFeed_FeedPosX);
                    else if (!UserLiveFeed_CheckVod()) PlayClip_OpenLiveStream();
                    else PlayClip_CheckIfIsLiveStart();
                }
                else PlayClip_showPanel();
                break;
            case KEY_STOP:
                PlayClip_CheckPreview();
                Play_CleanHideExit();
                PlayClip_shutdownStream();
                break;
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                if (Play_isEndDialogVisible() && !Play_ExitDialogVisible()) {
                    Play_EndTextClear();

                    if (!Play_EndFocus) {
                        if (UserLiveFeed_FeedPosX === UserLiveFeedobj_UserAGamesPos ||
                            UserLiveFeed_FeedPosX === UserLiveFeedobj_AGamesPos) UserLiveFeed_KeyEnter(UserLiveFeed_FeedPosX);
                        else {
                            Play_EndFocus = true;
                            UserLiveFeed_FeedRemoveFocus(UserLiveFeed_FeedPosX);
                            Play_EndIconsAddFocus();
                        }
                    } else {
                        UserLiveFeed_FeedRemoveFocus(UserLiveFeed_FeedPosX);
                        Play_EndIconsAddFocus();
                        Play_showExitDialog();
                    }

                } else if (Play_isPanelShown()) PlayClip_hidePanel();
                else if (UserLiveFeed_isFeedShow() && !Play_isEndDialogVisible()) {
                    if (UserLiveFeed_FeedPosX === UserLiveFeedobj_UserAGamesPos ||
                        UserLiveFeed_FeedPosX === UserLiveFeedobj_AGamesPos) UserLiveFeed_KeyEnter(UserLiveFeed_FeedPosX);
                    else UserLiveFeed_Hide();
                } else {
                    if (Play_ExitDialogVisible() || Play_SingleClickExit) {
                        PlayClip_CheckPreview();
                        Play_CleanHideExit();
                        PlayClip_shutdownStream();
                    } else {
                        Play_showExitDialog();
                    }
                }
                break;
            case KEY_PLAY:
            case KEY_PLAYPAUSE:
            case KEY_KEYBOARD_SPACE:
                if (Main_IsOn_OSInterface && !Play_isEndDialogVisible()) OSInterface_PlayPauseChange();
                break;
            case KEY_1:
                if (UserLiveFeed_isFeedShow()) {
                    if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].IsGame) UserLiveFeed_KeyEnter(UserLiveFeed_FeedPosX);
                    else PlayClip_CheckIfIsLiveStart();
                }
                break;
            case KEY_REFRESH:
                if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedRefresh();
                else if (!Play_isEndDialogVisible() && !Play_isPanelShown() &&
                    !Play_MultiDialogVisible()) Play_controls[Play_controlsChatSide].enterKey();
                break;
            case KEY_CHAT:
                Play_controls[Play_controlsChat].enterKey(3);
                break;
            case KEY_MEDIA_REWIND:
            case KEY_PG_UP:
                if (UserLiveFeed_isFeedShow()) UserLiveFeed_KeyUpDown(-1);
                else if (Play_isFullScreen && Play_isChatShown()) Play_KeyChatPosChage();
                else PlayClip_showPanel();
                break;
            case KEY_PG_DOWN:
                if (UserLiveFeed_isFeedShow()) UserLiveFeed_KeyUpDown(1);
                else if (Play_isFullScreen && Play_isChatShown()) Play_KeyChatSizeChage();
                else PlayClip_showPanel();
                break;
            case KEY_MEDIA_FAST_FORWARD:
                if (Play_isEndDialogVisible()) break;

                if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedRefresh();
                else Play_controls[Play_controlsChatSide].enterKey();
                break;
            case KEY_MEDIA_NEXT:
                PlayClip_PlayNext();
                break;
            case KEY_MEDIA_PREVIOUS:
                PlayClip_PlayPreviously();
                break;
            default:
                break;
        }
    }
}

function PlayClip_FastBackForward(position) {
    if (!Play_isPanelShown()) PlayClip_showPanel();
    Play_clearHidePanel();
    PlayVod_PanelY = 0;
    PlayVod_IconsBottonFocus();

    PlayVod_jumpStart(position, Play_DurationSeconds);
    PlayVod_ProgressBaroffset = 2500;
    PlayClip_setHidePanel();
}
