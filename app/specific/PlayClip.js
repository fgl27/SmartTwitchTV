//Variable initialization
var PlayClip_IsJumping = false;
var PlayClip_jumpCount = 0;
var PlayClip_TimeToJump = 0;
var PlayClip_isOn = false;
var PlayClip_loadingDataTry = 0;
var PlayClip_loadingDataTimeout = 2000;
var PlayClip_loadingDataTryMax = 3;
var PlayClip_quality = 'source';
var PlayClip_qualityPlaying = PlayClip_quality;
var PlayClip_qualityIndex = 0;
var PlayClip_qualities = [];
var PlayClip_playingUrl = '';
var PlayClip_replayOrNext = false;
var PlayClip_replay = false;
var PlayClip_currentTime = 0;
var PlayClip_state = 0;
var PlayClip_STATE_PLAYING = 1;
var PlayClip_HasVOD = false;
var PlayClip_Buffer = 2000;
var PlayClip_loadData410 = false;

var PlayClip_jumpTimers = [0, 5];
var PlayClip_DurationSeconds = 0;

var PlayClip_HasNext = false;
var PlayClip_HasBack = false;
var PlayClip_HideShowNextDiv = ['next_button', 'back_button'];
var PlayClip_EnterPos = 0;
var PlayClip_All = false;
var PlayClip_All_Forced = true;
var PlayClip_loadingtreamerInfoTry = 0;
//Variable initialization end

function PlayClip_Start() {
    Play_showBufferDialog();
    Play_HideEndDialog();

    PlayClip_HasVOD = Main_values.ChannelVod_vodId !== null;
    Chat_title = STR_CLIP + '.';
    if (PlayClip_HasVOD) {
        Chat_offset = ChannelVod_vodOffset;
        Chat_Init();
    } else Chat_NoVod();

    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);
    Main_textContent("stream_info_name", Main_values.Main_selectedChannelDisplayname);
    Main_innerHTML("stream_info_title", ChannelClip_title);
    Main_innerHTML("stream_info_game", ChannelClip_game);

    Main_innerHTML("stream_live_time", ChannelClip_createdAt + ',' + STR_SPACE + ChannelClip_views);
    Main_textContent("stream_live_viewers", '');
    Main_textContent("stream_watching_time", '');

    Main_textContent('progress_bar_duration', Play_timeS(PlayClip_DurationSeconds));
    Play_DefaultjumpTimers = PlayClip_jumpTimers;
    PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);
    Main_replaceClassEmoji('stream_info_title');

    Main_values.Play_isHost = false;
    PlayClip_SetOpenVod();
    document.getElementById('controls_' + Play_controlsChatDelay).style.display = 'none';
    document.getElementById('controls_' + Play_controlsLowLatency).style.display = 'none';
    PlayExtra_UnSetPanel();
    Play_CurrentSpeed = 3;
    Play_IconsResetFocus();

    Play_ShowPanelStatus(3);

    Main_textContent('progress_bar_current_time', Play_timeS(0));

    Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i> </div>');
    Main_ShowElement('progress_bar_div');
    Main_ShowElement('controls_holder');

    Play_PlayerPanelOffset = -13;
    PlayClip_state = 0;
    PlayClip_currentTime = 0;
    PlayClip_qualityIndex = 2;
    UserLiveFeed_PreventHide = false;
    PlayClip_UpdateNext();
    Play_EndSet(3);
    UserLiveFeed_Unset();
    Play_IsWarning = false;

    if (AddUser_UserIsSet()) {
        AddCode_PlayRequest = true;
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
        AddCode_CheckFallow();
    } else Play_hideFallow();

    PlayClip_IsJumping = false;
    PlayClip_jumpCount = 0;
    PlayClip_TimeToJump = 0;
    PlayClip_isOn = true;

    if (!PlayClip_replay) PlayClip_loadData();
    else PlayClip_qualityChanged();
    PlayClip_replay = false;

    document.body.removeEventListener("keyup", Main_handleKeyUp);

    PlayClip_loadingtreamerInfoTry = 0;
    PlayClip_GetStreamerInfo();
    PlayVod_loadingInfoDataTry = 0;
    if (PlayClip_HasVOD) PlayClip_updateVodInfo();
    else {
        Main_textContent("end_vod_name_text", '');
        Main_innerHTML("end_vod_title_text", '');
        Play_controls[Play_controlsOpenVod].setLable('');
    }
    Play_controls[Play_controlsChanelCont].setLable(Main_values.Main_selectedChannelDisplayname);
    Play_controls[Play_controlsGameCont].setLable(Main_values.Play_gameSelected);
}

function PlayClip_updateVodInfo() {
    var theUrl = 'https://api.twitch.tv/kraken/videos/' + Main_values.ChannelVod_vodId + Main_TwithcV5Flag_I;
    BasexmlHttpGet(theUrl, PlayVod_loadingInfoDataTimeout, 2, null, PlayClip_updateVodInfoSucess, PlayClip_updateVodInfoError, false);
}

function PlayClip_updateVodInfoSucess(response) {
    ChannelVod_title = twemoji.parse(JSON.parse(response).title, false, false);
    Main_innerHTML("end_vod_title_text", ChannelVod_title);
    Play_controls[Play_controlsOpenVod].setLable(ChannelVod_title);
}

function PlayClip_updateVodInfoError() {
    PlayVod_loadingInfoDataTry++;
    if (PlayVod_loadingInfoDataTry < PlayVod_loadingInfoDataTryMax) PlayClip_updateVodInfo();
}

function PlayClip_GetStreamerInfo() {
    var theUrl = 'https://api.twitch.tv/kraken/channels/' + Main_values.Main_selectedChannel_id + Main_TwithcV5Flag_I;

    BasehttpGet(theUrl, 10000, 2, null, PlayClip_GetStreamerInfoSuccess, PlayClip_GetStreamerInfoSuccessError);
}

function PlayClip_GetStreamerInfoSuccessError() {
    PlayClip_loadingtreamerInfoTry++;
    if (PlayClip_loadingtreamerInfoTry < PlayClip_loadingDataTryMax) PlayClip_GetStreamerInfo();
}

function PlayClip_GetStreamerInfoSuccess(response) {
    Main_values.Main_selectedChannelPartner = JSON.parse(response).partner;
    Play_partnerIcon(Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelPartner, false, ChannelClip_language);
}

function PlayClip_loadData() {
    if (PlayClip_loadData410 || !Main_IsNotBrowser) {
        PlayClip_loadDataSuccess410();
        return;
    }
    PlayClip_loadingDataTry = 0;
    PlayClip_loadingDataTimeout = 2000;
    PlayClip_loadDataRequest();
}

function PlayClip_loadDataRequest() {
    var theUrl = 'https://clips.twitch.tv/api/v2/clips/' + ChannelClip_playUrl + '/status';

    var xmlHttp = Android.mreadUrl(theUrl, PlayClip_loadingDataTimeout, 1, null);

    if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
    else {
        PlayClip_loadDataError();
        return;
    }

    if (xmlHttp.status === 200) {
        PlayClip_QualityGenerate(xmlHttp.responseText);
    } else if (xmlHttp.status === 410) { //Workaround for future 410 issue
        PlayClip_loadData410 = true;
        window.setTimeout(function() {
            PlayClip_loadData410 = false;
        }, 60 * 60 * 1000);//try again after 1h
        PlayClip_loadDataSuccess410();
    } else {
        PlayClip_loadDataError();
    }
}

function PlayClip_loadDataError() {
    PlayClip_loadingDataTry++;
    if (PlayClip_loadingDataTry < PlayClip_loadingDataTryMax) {
        PlayClip_loadingDataTimeout += 250;
        PlayClip_loadDataRequest();
    } else {
        if (Main_IsNotBrowser) {
            Play_HideBufferDialog();
            Play_PlayEndStart(3);
        } else PlayClip_loadDataSuccessFake();
    }
}

function PlayClip_loadDataSuccessFake() {
    PlayClip_qualities = [{
        'id': 'Auto',
        'url': ''
    },
    {
        'id': '1080p60 | source | mp4',
        'url': 'https://fake'
    },
    ];
    PlayClip_state = PlayClip_STATE_PLAYING;
    PlayClip_qualityChanged();
}

function PlayClip_loadDataSuccess410() {
    PlayClip_qualities = [];
    PlayClip_qualities.push({
        'id': 'source | mp4',
        'url': ChannelClip_playUrl2
    });

    PlayClip_state = PlayClip_STATE_PLAYING;
    PlayClip_qualityChanged();
}

function PlayClip_QualityGenerate(response) {
    PlayClip_qualities = [];

    response = JSON.parse(response).quality_options;

    for (var i = 0; i < response.length; i++) {

        if (!PlayClip_qualities.length) {
            PlayClip_qualities.push({
                'id': response[i].quality + 'p' + PlayClip_FrameRate(response[i].frame_rate) + ' | source | mp4',
                'url': response[i].source
            });
        } else {
            PlayClip_qualities.push({
                'id': response[i].quality + 'p' + PlayClip_FrameRate(response[i].frame_rate) + ' | mp4',
                'url': response[i].source
            });
        }
    }

    PlayClip_state = PlayClip_STATE_PLAYING;
    PlayClip_qualityChanged();
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
        } else if (PlayClip_qualities[i].id.indexOf(PlayClip_quality) !== -1) { //make shore to set a value before break out
            PlayClip_qualityIndex = i;
            PlayClip_playingUrl = PlayClip_qualities[i].url;
        }
    }

    PlayClip_state = PlayClip_STATE_PLAYING;

    PlayClip_quality = PlayClip_qualities[PlayClip_qualityIndex].id;
    PlayClip_qualityPlaying = PlayClip_quality;
    PlayClip_SetHtmlQuality('stream_quality');
    PlayClip_onPlayer();
    //Play_PannelEndStart(3);
}

function PlayClip_onPlayer() {
    if (Main_isDebug) console.log('PlayClip_onPlayer:', '\n' + '\n"' + PlayClip_playingUrl + '"\n');
    if (Main_IsNotBrowser && PlayClip_isOn) Android.startVideoOffset(PlayClip_playingUrl, 3,
        PlayClip_replayOrNext ? -1 : Android.gettime());
    PlayClip_replayOrNext = false;

    if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
    Play_SetFullScreen(Play_isFullScreen);
}

function PlayClip_UpdateDuration(duration) {
    PlayClip_DurationSeconds = duration / 1000;
    Main_textContent('progress_bar_duration', Play_timeS(PlayClip_DurationSeconds));
    PlayClip_RefreshProgressBarr();
}

function PlayClip_Resume() {
    //return;
    window.clearInterval(Play_ShowPanelStatusId);
    PlayClip_shutdownStream();
}

function PlayClip_shutdownStream() {
    if (PlayClip_isOn) {
        PlayClip_All = false;
        PlayClip_PreshutdownStream(true);
        Play_CleanHideExit();
        Play_exitMain();
    }
}

function PlayClip_PreshutdownStream(closePlayer) {
    PlayClip_hidePanel();
    if (Main_IsNotBrowser) {
        if (closePlayer) Android.stopVideo(3);
        else Android.play(false);
    }
    if (closePlayer) PlayClip_isOn = false;
    Chat_Clear();
    Play_ClearPlayer();
    UserLiveFeed_Hide(true);
    PlayClip_qualities = [];
    document.body.removeEventListener("keydown", PlayClip_handleKeyDown);
    ChannelVod_vodOffset = 0;
}

function PlayClip_UpdateNext() {
    var nextid = PlayClip_getIdNext(1, 0);
    var backid = PlayClip_getIdNext(-1, inUseObj.ColoumnsCount - 1);
    var text;

    PlayClip_HasNext = false;
    PlayClip_HasBack = false;

    if (nextid) {
        PlayClip_HasNext = true;
        text = JSON.parse(document.getElementById(inUseObj.ids[8] + nextid).getAttribute(Main_DataAttribute));
        Main_textContent("next_button_text_name", text[4]);
        Main_innerHTML("next_button_text_title", text[9]);

        Main_textContent("end_next_button_text_name", text[4]);
        Main_innerHTML("end_next_button_text_title", text[9]);

        PlayClip_HideShowNext(0, 1);
    } else PlayClip_HideShowNext(0, 0);

    if (backid) {
        PlayClip_HasBack = true;
        text = JSON.parse(document.getElementById(inUseObj.ids[8] + backid).getAttribute(Main_DataAttribute));
        Main_textContent("back_button_text_name", text[4]);
        Main_innerHTML("back_button_text_title", text[9]);
        PlayClip_HideShowNext(1, 1);
    } else PlayClip_HideShowNext(1, 0);
}

function PlayClip_getIdNext(y, x) {
    if (Main_ThumbNull((inUseObj.posY), (inUseObj.posX + y), inUseObj.ids[0]))
        return inUseObj.posY + '_' + (inUseObj.posX + y);
    else if (Main_ThumbNull((inUseObj.posY + y), x, inUseObj.ids[0]))
        return (inUseObj.posY + y) + '_' + x;

    return null;
}

function PlayClip_HideShowNext(which, val) {
    document.getElementById(PlayClip_HideShowNextDiv[which]).style.opacity = val;
}

function PlayClip_Enter() {
    if (!PlayClip_EnterPos) {
        if (PlayClip_HasVOD && !Main_values.Play_ChatForceDisable) {
            if (Play_isNotplaying()) Chat_Play(Chat_Id);
            else Chat_Pause();
        }
        if (!Play_isEndDialogVisible()) Play_KeyPause(3);
    } else if (PlayClip_EnterPos === 1) PlayClip_PlayNext();
    else if (PlayClip_EnterPos === -1) PlayClip_PlayPreviously();
}

function PlayClip_PlayNext() {
    Screens_KeyLeftRight(1, 0);
    PlayClip_PlayNextPreviously();
}

function PlayClip_PlayPreviously() {
    Screens_KeyLeftRight(-1, inUseObj.ColoumnsCount - 1);
    PlayClip_PlayNextPreviously();
}

function PlayClip_PlayNextPreviously() {
    Play_ForceHidePannel();
    Main_ready(function() {
        PlayClip_replayOrNext = true;
        PlayClip_PreshutdownStream(false);
        Main_OpenClip(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids, Screens_handleKeyDown);
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
    if (Main_IsNotBrowser) PlayVod_ProgresBarrUpdate((Android.gettime() / 1000), PlayClip_DurationSeconds, true);
    Main_innerHTML('progress_bar_jump_to', STR_SPACE);
    document.getElementById('progress_bar_steps').style.display = 'none';
    window.clearInterval(PlayVod_RefreshProgressBarrID);
}

function PlayClip_showPanel() {
    PlayClip_RefreshProgressBarr();
    Play_clock();
    window.clearInterval(PlayVod_RefreshProgressBarrID);
    PlayVod_RefreshProgressBarrID = window.setInterval(PlayClip_RefreshProgressBarr, 1000);
    Play_CleanHideExit();
    PlayVod_IconsBottonResetFocus();
    PlayClip_qualityIndexReset();
    PlayExtra_ResetSpeed();
    PlayClip_qualityDisplay();
    Play_ForceShowPannel();
    Play_clearHidePanel();
    PlayClip_setHidePanel();
}

function PlayClip_RefreshProgressBarr() {
    if (Main_IsNotBrowser) PlayVod_ProgresBarrUpdate((Android.gettime() / 1000), PlayClip_DurationSeconds, !PlayVod_IsJumping);

    if (!Play_Status_Always_On) {
        if (Main_IsNotBrowser) Play_VideoStatus(false);
        else Play_VideoStatusTest();
    }
}

function PlayClip_qualityIndexReset() {
    PlayClip_qualityIndex = 0;
    for (var i = 0; i < PlayClip_getQualitiesCount(); i++) {
        if (PlayClip_qualities[i].id === PlayClip_quality) {
            PlayClip_qualityIndex = i;
            break;
        } else if (PlayClip_qualities[i].id.indexOf(PlayClip_quality) !== -1) { //make shore to set a value before break out
            PlayClip_qualityIndex = i;
        }
    }
}

function PlayClip_getQualitiesCount() {
    return PlayClip_qualities.length;
}

function PlayClip_qualityDisplay() {
    if (PlayClip_getQualitiesCount() === 1) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "0";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "0";
    } else if (!PlayClip_qualityIndex) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "0.2";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "1";
    } else if (PlayClip_qualityIndex === PlayClip_getQualitiesCount() - 1) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "1";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "0.2";
    } else {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "1";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "1";
    }

    PlayClip_SetHtmlQuality('controls_name_' + Play_controlsQuality);
}

function PlayClip_SetHtmlQuality(element) {
    if (!PlayClip_qualities[PlayClip_qualityIndex].hasOwnProperty('id')) return;

    PlayClip_quality = PlayClip_qualities[PlayClip_qualityIndex].id;

    var quality_string = PlayClip_quality;
    if (PlayClip_quality.indexOf('source') !== -1) quality_string = quality_string.replace("source", STR_SOURCE);

    Main_textContent(element, PlayClip_quality);
}

function PlayClip_setHidePanel() {
    Play_PanelHideID = window.setTimeout(PlayClip_hidePanel, 5000 + PlayVod_ProgressBaroffset); // time in ms
}

function PlayClip_SetOpenVod() {
    document.getElementById('controls_' + Play_controlsOpenVod).style.display = PlayClip_HasVOD ? 'inline-block' : 'none';
}

function PlayClip_OpenVod() {
    if (PlayClip_HasVOD) {
        Main_values.vodOffset = ChannelVod_vodOffset;
        PlayClip_PreshutdownStream(true);
        document.body.addEventListener("keydown", PlayVod_handleKeyDown, false);
        Play_IconsResetFocus();
        Main_ready(PlayVod_Start);
    } else {
        Play_clearHidePanel();
        Play_IsWarning = true;
        Play_showWarningDialog(STR_NO_BROADCAST_WARNING);
        window.setTimeout(function() {
            Play_IsWarning = false;
            Play_HideWarningDialog();
        }, 2000);
    }
}

function PlayClip_OpenLiveStream() {
    PlayClip_PreshutdownStream(true);
    Main_OpenLiveStream(Play_FeedPos, UserLiveFeed_ids, PlayClip_handleKeyDown);
}

function PlayClip_handleKeyDown(e) {
    if (PlayClip_state !== PlayClip_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_STOP:
                Play_CleanHideExit();
                PlayClip_shutdownStream();
                break;
            case KEY_RETURN_Q:
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
                if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) {
                    if (Play_FeedPos && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos--;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown()) {
                    Play_ChatPositions++;
                    Play_ChatPosition();
                    Play_controls[Play_controlsChatPos].defaultValue = Play_ChatPositions;
                    Play_controls[Play_controlsChatPos].setLable();
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(3, -1);
                    else if (!PlayVod_PanelY) {
                        PlayVod_jumpStart(-1, PlayClip_DurationSeconds);
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
                } else PlayClip_showPanel();
                break;
            case KEY_RIGHT:
                if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) {
                    if (Play_FeedPos < (UserLiveFeed_GetSize() - 1) && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos++;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible()) {
                    Play_controls[Play_controlsChat].enterKey(3);
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(3, 1);
                    else if (!PlayVod_PanelY) {
                        PlayVod_jumpStart(1, PlayClip_DurationSeconds);
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
                } else PlayClip_showPanel();
                break;
            case KEY_UP:
                if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    document.body.removeEventListener("keydown", PlayClip_handleKeyDown, false);
                    document.body.addEventListener("keyup", Play_handleKeyUp, false);
                    Play_EndUpclear = false;
                    Play_EndUpclearCalback = PlayClip_handleKeyDown;
                    Play_EndUpclearID = window.setTimeout(Play_keyUpEnd, 250);
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY--;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(3, 1);
                    PlayClip_setHidePanel();
                } else if (!UserLiveFeed_isFeedShow()) UserLiveFeed_ShowFeed();
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedRefresh();
                else PlayClip_showPanel();
                break;
            case KEY_DOWN:
                if (Play_isEndDialogVisible()) Play_EndDialogUpDown();
                else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(3, -1);
                    PlayClip_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
                else if (Play_isFullScreen && Play_isChatShown()) {
                    Play_KeyChatSizeChage();
                } else PlayClip_showPanel();
                break;
            case KEY_ENTER:
                if (Play_isEndDialogVisible()) {
                    if (Play_EndFocus) Play_EndDialogPressed(3);
                    else {
                        Play_EndDialogEnter = 3;
                        Play_EndUpclearCalback = PlayClip_handleKeyDown;
                        Play_SavePlayData();
                        Main_OpenLiveStream(Play_FeedPos, UserLiveFeed_ids, Play_handleKeyDown);
                    }
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (!PlayVod_PanelY) {
                        if (PlayVod_addToJump) PlayVod_jump();
                    } else if (PlayVod_PanelY === 1) PlayClip_Enter();
                    else Play_BottomOptionsPressed(3);
                    PlayClip_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) Play_CheckIfIsLiveStart(PlayClip_OpenLiveStream);
                else PlayClip_showPanel();
                break;
            case KEY_STOP:
                Play_CleanHideExit();
                PlayClip_shutdownStream();
                break;
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                if (Play_isEndDialogVisible()) Play_EndTextClear();

                if (Play_isPanelShown()) PlayClip_hidePanel();
                else if (UserLiveFeed_isFeedShow() && !Play_isEndDialogVisible()) UserLiveFeed_Hide();
                else {
                    if (Play_ExitDialogVisible() || Play_SingleClickExit) {
                        Play_CleanHideExit();
                        PlayClip_shutdownStream();
                    } else {
                        Play_showExitDialog();
                    }
                }
                break;
            case KEY_PLAY:
                if (!Play_isEndDialogVisible() && Play_isNotplaying()) {
                    Play_KeyPause(2);
                    if (!Main_values.Play_ChatForceDisable) Chat_Play(Chat_Id);
                }
                break;
            case KEY_PAUSE:
                if (!Play_isEndDialogVisible() && !Play_isNotplaying()) {
                    Play_KeyPause(2);
                    if (!Main_values.Play_ChatForceDisable) Chat_Pause();
                }
                break;
            case KEY_PLAYPAUSE:
            case KEY_KEYBOARD_SPACE:
                if (PlayClip_HasVOD && !Main_values.Play_ChatForceDisable) {
                    if (Play_isNotplaying()) Chat_Play(Chat_Id);
                    else Chat_Pause();
                }
                if (!Play_isEndDialogVisible()) Play_KeyPause(3);
                break;
            case KEY_REFRESH:
                Play_controls[Play_controlsChat].enterKey(3);
                break;
            case KEY_PG_UP:
                Play_Panelcounter = Play_controlsChatPos;
                Play_BottomUpDown(3, 1);
                Play_Panelcounter = Play_controlsDefault;
                break;
            case KEY_PG_DOWN:
                Play_Panelcounter = Play_controlsChatPos;
                Play_BottomUpDown(3, -1);
                Play_Panelcounter = Play_controlsDefault;
                break;
            case KEY_MEDIA_FAST_FORWARD:
                if (!Play_isEndDialogVisible()) PlayClip_FastBackForward(1);
                break;
            case KEY_MEDIA_REWIND:
                if (!Play_isEndDialogVisible()) PlayClip_FastBackForward(-1);
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

    PlayVod_jumpStart(position, PlayClip_DurationSeconds);
    PlayVod_ProgressBaroffset = 2500;
    PlayClip_setHidePanel();
}
