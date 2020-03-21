//Etc player fun and controls

function Play_partnerIcon(name, partner, islive, lang, isExtra) {
    var div = '<div class="partnericon_div"> ' + name + STR_SPACE + STR_SPACE + '</div>' +
        (partner ? ('<img class="partnericon_img" alt="" src="' +
            IMG_PARTNER + '">') : "");

    if (islive) {
        var rerun = isExtra ? PlayExtra_data.data[8] : Play_data.data[8];
        div += STR_SPACE + STR_SPACE + '<div class="partnericon_text" style="background: #' +
            (rerun ? 'FFFFFF; color: #000000;' : 'E21212;') + '">' +
            STR_SPACE + STR_SPACE + (rerun ? STR_NOT_LIVE : STR_LIVE) + STR_SPACE + STR_SPACE + '</div>';
    }

    return div + '<div class="lang_text" ">' + STR_SPACE + STR_SPACE + lang + '</div>';
}

function Play_IconsResetFocus() {
    Play_IconsRemoveFocus();
    Play_Panelcounter = Play_controlsDefault;
    Play_IconsAddFocus();
}

function Play_PrepareshowEndDialog(PlayVodClip) {
    Play_state = -1;
    PlayVod_state = -1;
    PlayClip_state = -1;
    Play_hideChat();
    Play_hidePanel();
    PlayClip_hidePanel();
    PlayVod_hidePanel();
    if (!Play_IsWarning) Play_HideWarningDialog();
    Play_HideBufferDialog();
    Play_CleanHideExit();
    if (PlayVodClip === 3 && PlayClip_HasNext && (PlayClip_All || PlayClip_All_Forced)) {
        Play_EndIconsRemoveFocus();
        Play_Endcounter = -1;
    }
    Play_EndIconsAddFocus();
}

function Play_showEndDialog() {
    Main_ShowElement('dialog_end_stream');
    UserLiveFeed_SetHoldUp();
    Play_EndFocus = true;
    UserLiveFeed_PreventHide = true;
    UserLiveFeed_clearHideFeed();
    UserLiveFeed_ShowFeed();
    Main_values.Play_WasPlaying = 0;
    UserLiveFeed_FeedRemoveFocus(UserLiveFeed_FeedPosX);
    Main_SaveValues();
}

function Play_HideEndDialog() {
    Main_HideElement('dialog_end_stream');
    Play_EndTextClear();
    Play_EndIconsResetFocus();
}

function Play_isEndDialogVisible() {
    return Main_isElementShowing('dialog_end_stream');
}

function Play_EndIconsResetFocus() {
    Play_EndIconsRemoveFocus();
    Play_Endcounter = 0;
    Play_EndIconsAddFocus();
}

function Play_EndIconsAddFocus() {
    Main_AddClass('dialog_end_' + Play_Endcounter, 'dialog_end_icons_focus');
}

function Play_EndIconsRemoveFocus() {
    Main_RemoveClass('dialog_end_' + Play_Endcounter, 'dialog_end_icons_focus');
}

function Play_EndText(PlayVodClip) {
    if (PlayVodClip === 1) Play_DialogEndText = Play_data.data[1] + ' ' + STR_LIVE;
    else if (PlayVodClip === 2) Play_DialogEndText = Main_values.Main_selectedChannelDisplayname + STR_VIDEO;
    else if (PlayVodClip === 3) Play_DialogEndText = Main_values.Main_selectedChannelDisplayname + STR_CLIP;

    Play_DialogEndText = Main_ReplaceLargeFont(Play_DialogEndText);

    if (Play_EndTextCounter === -2) { //disable
        Play_state = Play_STATE_PLAYING;
        PlayVod_state = Play_STATE_PLAYING;
        PlayClip_state = PlayClip_STATE_PLAYING;
        Play_EndTextClear();
        return;
    }

    Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR +
        ((PlayVodClip === 3 && PlayClip_HasNext && (PlayClip_All || PlayClip_All_Forced)) ? STR_PLAY_NEXT_IN : STR_STREAM_END) + Play_EndTextCounter + '...');

    if (Play_isEndDialogVisible()) {
        Play_EndTextCounter--;
        Play_state = Play_STATE_PLAYING;
        PlayVod_state = Play_STATE_PLAYING;
        PlayClip_state = PlayClip_STATE_PLAYING;

        if (Play_EndTextCounter === -1) {
            Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR + STR_STREAM_END +
                '0...');
            Play_CleanHideExit();
            Play_hideChat();

            if (PlayVodClip === 1) {
                PlayExtra_PicturePicture = false;
                PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
                Play_shutdownStream();
            } else if (PlayVodClip === 2) PlayVod_shutdownStream();
            else if (PlayVodClip === 3) {
                if (PlayClip_HasNext && (PlayClip_All || PlayClip_All_Forced) && !document.hidden) PlayClip_PlayNext();
                else PlayClip_shutdownStream();
            }

        } else {
            Play_EndTextID = window.setTimeout(function() {
                Play_EndText(PlayVodClip);
            }, 1000);
        }
    } else {
        Play_EndTextID = window.setTimeout(function() {
            Play_EndText(PlayVodClip);
        }, 50);
    }
}

function Play_EndTextClear() {
    window.clearTimeout(Play_EndTextID);
    Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR + STR_STREAM_END_EXIT);
}

function Play_EndDialogPressed(PlayVodClip) {
    var canhide = true;
    if (Play_Endcounter === -1 && PlayClip_HasNext) PlayClip_PlayNext();
    else if (!Play_Endcounter) {
        if (PlayVodClip === 2) {
            if (!PlayVod_qualities.length) {
                canhide = false;
                Play_showWarningDialog(STR_CLIP_FAIL, 2000);
            } else {
                PlayVod_replay = true;
                PlayVod_VodOffset = 0;
                PlayVod_Start();
                PlayVod_currentTime = 0;
                Chat_offset = 0;
                Chat_Init();
            }
        } else if (PlayVodClip === 3) {
            if (!PlayClip_qualities.length) {
                canhide = false;
                Play_showWarningDialog(STR_CLIP_FAIL, 2000);
            } else {
                PlayClip_replayOrNext = true;
                PlayClip_replay = true;
                PlayClip_Start();
            }
        }
    } else if (Play_Endcounter === 1) {
        if (Main_values.Play_isHost) {
            Play_data.DisplaynameHost = Play_data.data[1] + STR_USER_HOSTING;
            Play_data.data[6] = Play_TargetHost.target_login;
            Play_data.data[1] = Play_TargetHost.target_display_name;
            Play_data.DisplaynameHost = Play_data.DisplaynameHost + Play_data.data[1];
            Android.play(false);
            Play_PreshutdownStream(false);

            document.body.addEventListener("keydown", Play_handleKeyDown, false);

            Play_data.data[14] = Play_TargetHost.target_id;
            Main_ready(Play_Start);
        } else {
            PlayClip_OpenVod();
            if (!PlayClip_HasVOD) canhide = false;
        }
    } else if (Play_Endcounter === 2) Play_OpenChannel(PlayVodClip);
    else if (Play_Endcounter === 3) {
        Play_OpenGame(PlayVodClip);
        if (Play_data.data[3] === '') canhide = false;
    }

    if (canhide) {
        Play_HideEndDialog();
        UserLiveFeed_Hide();
        UserLiveFeed_PreventHide = false;
    }
    Play_EndDialogEnter = 0;
}

function Play_EndSet(PlayVodClip) {
    if (!PlayVodClip) { // Play is hosting
        Play_EndIconsRemoveFocus();
        Play_Endcounter = 1;
        Play_EndIconsAddFocus();
        document.getElementById('dialog_end_-1').style.display = 'none';
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'inline-block';
        Main_textContent("dialog_end_vod_text", STR_OPEN_HOST);

        Play_EndTextsReset();
        Main_innerHTML("end_channel_name_text", Play_data.data[1]);
        Main_innerHTML("end_vod_title_text", Play_data.data[1] + STR_IS_NOW + STR_USER_HOSTING + Play_TargetHost.target_display_name);
    } else if (PlayVodClip === 1) { // play
        Play_EndIconsRemoveFocus();
        Play_Endcounter = 2;
        Play_EndIconsAddFocus();
        document.getElementById('dialog_end_-1').style.display = 'none';
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'none';

        Play_EndTextsReset();
        Main_innerHTML("end_channel_name_text", Play_data.data[1]);
    } else if (PlayVodClip === 2) { // vod
        Play_EndIconsResetFocus();
        document.getElementById('dialog_end_-1').style.display = 'none';
        document.getElementById('dialog_end_0').style.display = 'inline-block';
        document.getElementById('dialog_end_1').style.display = 'none';

        Main_innerHTML("end_replay_name_text", Main_values.Main_selectedChannelDisplayname);
        Main_innerHTML("end_replay_title_text", ChannelVod_title);

        Main_textContent("end_vod_name_text", '');
        Main_textContent("end_vod_title_text", '');

        Main_innerHTML("end_channel_name_text", Main_values.Main_selectedChannelDisplayname);
    } else if (PlayVodClip === 3) { // clip
        Play_EndIconsResetFocus();
        document.getElementById('dialog_end_-1').style.display = PlayClip_HasNext ? 'inline-block' : 'none';
        document.getElementById('dialog_end_0').style.display = 'inline-block';
        document.getElementById('dialog_end_1').style.display = 'inline-block';
        Main_textContent("dialog_end_vod_text", PlayClip_HasVOD ? STR_OPEN_BROADCAST : STR_NO_BROADCAST);

        Main_innerHTML("end_replay_name_text", Main_values.Main_selectedChannelDisplayname);
        Main_innerHTML("end_replay_title_text", ChannelClip_title);

        Main_innerHTML("end_vod_name_text", Main_values.Main_selectedChannelDisplayname);

        Main_innerHTML("end_channel_name_text", Main_values.Main_selectedChannelDisplayname);
    }
    Main_textContent("end_game_name_text", Play_data.data[3]);
}

function Play_EndTextsReset() {
    Main_textContent("end_replay_name_text", '');
    Main_textContent("end_replay_title_text", '');
    Main_textContent("end_vod_name_text", '');
    Main_textContent("end_vod_title_text", '');
}

function Play_OpenChannel(PlayVodClip) {
    if (!Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) {
        Main_values.Main_BeforeChannel = (Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_aGame) ? Main_values.Main_BeforeAgame : Main_values.Main_Go;
        Main_values.Main_BeforeChannelisSet = true;
    }

    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_ChannelContent;

    if (PlayVodClip === 1) {
        if (Play_MultiEnable) {
            Play_data = JSON.parse(JSON.stringify(Play_MultiArray[Play_MultiFirstAvailable()]));
        }
        Play_ClearPP();
        Main_values.Main_selectedChannel_id = Play_data.data[14];
        Main_values.Main_selectedChannel = Play_data.data[6];
        Main_values.Main_selectedChannelDisplayname = Play_data.data[1];
        ChannelContent_UserChannels = AddCode_IsFollowing;
        Play_shutdownStream();
    } else if (PlayVodClip === 2) PlayVod_shutdownStream();
    else if (PlayVodClip === 3) PlayClip_shutdownStream();
}

function Play_OpenSearch(PlayVodClip) {
    if (PlayVodClip === 1) {
        Play_ClearPP();
        Play_PreshutdownStream(true);
    } else if (PlayVodClip === 2) PlayVod_PreshutdownStream(true);
    else if (PlayVodClip === 3) PlayClip_PreshutdownStream();

    Main_values.Play_WasPlaying = 0;
    PlayVod_ProgresBarrUpdate(0, 0);
    Main_showScene1Doc();
    Main_hideScene2Doc();
    Main_OpenSearch();
}

function Play_OpenGame(PlayVodClip) {
    if (Play_data.data[3] === '') {
        Play_clearHidePanel();
        Play_IsWarning = true;
        Play_showWarningDialog(STR_NO_GAME, 2000);
        return;
    }

    if (!Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_AGameVod && Main_values.Main_Go !== Main_AGameClip) {
        Main_values.Main_BeforeAgame = (Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelContent && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) ? Main_values.Main_BeforeChannel : Main_values.Main_Go;
        Main_values.Main_BeforeAgameisSet = true;
    }

    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_aGame;

    if (Play_MultiEnable) {
        Play_data = JSON.parse(JSON.stringify(Play_MultiArray[Play_MultiFirstAvailable()]));
    }
    Main_values.Main_gameSelected = Play_data.data[3];
    Main_values.Main_gameSelected_id = null;

    Play_hideChat();
    if (PlayVodClip === 1) {
        Play_ClearPP();
        Play_shutdownStream();
    } else if (PlayVodClip === 2) PlayVod_shutdownStream();
    else if (PlayVodClip === 3) PlayClip_shutdownStream();
}

function Play_ClearPP() {
    Play_CloseSmall();

    Play_hideChat();
}

function Play_FollowUnfollow() {
    if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
        if (AddCode_IsFollowing) AddCode_UnFollow();
        else AddCode_Follow();
    } else {
        Play_showWarningDialog(STR_NOKEY_WARN, 2000);
        Play_IsWarning = true;
    }
}

function Play_CheckLiveThumb(PreventResetFeed, PreventWarn) {

    var doc = document.getElementById(UserLiveFeed_ids[8] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]),
        error = STR_STREAM_ERROR;

    if (doc !== null) {
        doc = JSON.parse(doc.getAttribute(Main_DataAttribute));

        if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].checkHistory) {

            error = STR_ALREDY_PLAYING;

            if (Main_A_includes_B(document.getElementById(UserLiveFeed_ids[1] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]).src, 's3_vods')) {

                if (Play_MultiEnable || PlayExtra_PicturePicture) error = STR_PP_VOD;
                else return doc;
            } else if (Play_MultiEnable) {
                if (!Play_MultiIsAlredyOPen(doc[14])) return doc;
            } else if (Play_data.data[14] !== doc[14] && PlayExtra_data.data[14] !== doc[14]) return doc;

        } else {

            if (Play_MultiEnable) {
                if (!Play_MultiIsAlredyOPen(doc[14])) return doc;
            } else if (Play_data.data[14] !== doc[14] && PlayExtra_data.data[14] !== doc[14]) return doc;

            error = STR_ALREDY_PLAYING;
        }
    }

    if (!PreventWarn) Play_showWarningDialog(error, 1500);

    if (!PreventResetFeed) UserLiveFeed_ResetFeedId();

    return null;
}

function Play_KeyPause(PlayVodClip) {
    if (Play_isNotplaying()) {
        ChatLive_Playing = true;
        ChatLive_MessagesRunAfterPause();
        Play_HideBufferDialog();

        Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i></div>');

        if (Play_isPanelShown()) {
            if (PlayVodClip === 1) Play_hidePanel();
            else if (PlayVodClip === 2) PlayVod_hidePanel();
            else if (PlayVodClip === 3) PlayClip_hidePanel();
        }

        if (Main_IsNotBrowser) Android.play(true);
    } else {
        ChatLive_Playing = false;
        Play_HideBufferDialog();

        Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-play-1"></i></div>');

        if (Main_IsNotBrowser) Android.play(false);
    }
}

function Play_KeyReturn(is_vod) {
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

    } else if (Play_MultiDialogVisible()) Play_HideMultiDialog();
    else if (UserLiveFeed_isFeedShow() && !Play_isEndDialogVisible()) {
        if (UserLiveFeed_FeedPosX === UserLiveFeedobj_UserAGamesPos ||
            UserLiveFeed_FeedPosX === UserLiveFeedobj_AGamesPos) UserLiveFeed_KeyEnter(UserLiveFeed_FeedPosX);
        else UserLiveFeed_Hide();
    } else if (Play_isPanelShown() && !Play_isVodDialogVisible()) {
        if (is_vod) PlayVod_hidePanel();
        else Play_hidePanel();
    } else {
        if (Play_isVodDialogVisible() && (Play_ExitDialogVisible() || Play_SingleClickExit)) {
            Play_HideVodDialog();
            PlayVod_PreshutdownStream(false);
            Play_exitMain();
        } else if (Play_ExitDialogVisible() || Play_SingleClickExit) {
            if (Play_MultiEnable) Play_controls[Play_MultiStream].enterKey();
            else if (PlayExtra_PicturePicture) Play_CloseSmall();
            else {
                Play_CleanHideExit();
                Play_hideChat();
                if (is_vod) PlayVod_shutdownStream();
                else Play_shutdownStream();
            }
        } else if (Play_WarningDialogVisible()) {
            Play_HideWarningDialog();
            Play_showExitDialog();
        } else {
            var text = PlayExtra_PicturePicture ? STR_EXIT_AGAIN_PICTURE : STR_EXIT_AGAIN;
            text = Play_MultiEnable ? STR_EXIT_AGAIN_MULTI : text;
            Main_textContent("play_dialog_exit_text", text);
            Play_showExitDialog();
        }
    }
}

var Play_Oldaudio = 0;
function Play_MultiKeyDownHold() {
    Play_EndUpclear = true;

    if (Play_controls[Play_controlsAudioMulti].defaultValue !== 4) {
        Play_Oldaudio = Play_controls[Play_controlsAudioMulti].defaultValue;
        Play_controls[Play_controlsAudioMulti].defaultValue = 4;
        Play_controls[Play_controlsAudioMulti].enterKey();
    } else {
        Play_controls[Play_controlsAudioMulti].defaultValue = Play_Oldaudio < 4 ? Play_Oldaudio : 0;
        Play_Oldaudio = Play_controls[Play_controlsAudioMulti].defaultValue;
        Play_controls[Play_controlsAudioMulti].enterKey();
    }
}

function Play_PPKeyDownHold() {
    Play_EndUpclear = true;

    if (Play_controls[Play_controlsAudio].defaultValue !== 2) {
        Play_Oldaudio = Play_controls[Play_controlsAudio].defaultValue;
        Play_controls[Play_controlsAudio].defaultValue = 2;
        Play_controls[Play_controlsAudio].enterKey();
    } else {
        Play_controls[Play_controlsAudio].defaultValue = Play_Oldaudio < 2 ? Play_Oldaudio : 1;
        Play_Oldaudio = Play_controls[Play_controlsAudio].defaultValue;
        Play_controls[Play_controlsAudio].enterKey();
    }
}

function Play_MultiKeyDown() {
    Play_Multi_MainBig = !Play_Multi_MainBig;
    if (Play_Multi_MainBig && Play_MultiArray[0].data.length) {
        //reset audio value if on big as it may had be changed via hold down or bootm controls
        Play_controls[Play_controlsAudioMulti].defaultValue = Play_Multi_Offset;

        Android.EnableMultiStream(Play_Multi_MainBig, Play_Multi_Offset);

        Play_showWarningDialog(
            STR_MAIN_WINDOW + STR_SPACE + Play_MultiArray[Play_Multi_Offset].data[1],
            2000
        );
        Play_MultiUpdateinfoMainBig('_big');
        Main_HideElement('stream_info_multi');
        Main_HideElement('dialog_multi_help');
        Main_ShowElement('stream_info_multi_big');
        Play_StoreChatPos();
        Play_showChat();
        Play_chat_container.style.width = '32.8%';
        Play_chat_container.style.height = '65.8%';
        document.getElementById("play_chat_dialog").style.marginTop = Play_ChatSizeVal[3].dialogTop + '%';
        Play_chat_container.style.top = '0.2%';
        Play_chat_container.style.left = '67%';
    } else {
        Play_MultiUpdateinfoMainBig('');
        Main_ShowElement('stream_info_multi');
        Main_HideElement('stream_info_multi_big');
        if (!Play_MultiArray[0].data.length) {
            Play_showWarningDialog(
                STR_ENABLE_MAIN_MULTI,
                2000
            );
            Play_Multi_MainBig = false;
        } else Play_ResStoreChatPos();
        Android.EnableMultiStream(Play_Multi_MainBig, Play_Multi_Offset);
    }
}

function Play_handleKeyUp(e) {
    if (e.keyCode === KEY_ENTER) {
        Play_handleKeyUpClear();
        if (!PlayExtra_clear) Play_OpenLiveFeedCheck();
    } else if (e.keyCode === KEY_UP) {
        Play_handleKeyUpEndClear();
        if (!Play_EndUpclear) {
            if (Play_isEndDialogVisible()) Play_EndDialogUpDown(-1);
            else UserLiveFeed_KeyUpDown(-1);
        }
    } else if (e.keyCode === KEY_DOWN) {
        Play_handleKeyUpEndClear();
        if (!Play_EndUpclear) {
            if (Play_MultiEnable) Play_MultiKeyDown();
            else {
                if (Main_IsNotBrowser) Android.mSwitchPlayer();
                PlayExtra_SwitchPlayer();
            }
        }

    }
}

function Play_keyUpEnd() {
    Play_EndUpclear = true;
    UserLiveFeed_FeedRefresh();
}

function Play_handleKeyUpEndClear() {
    window.clearTimeout(Play_EndUpclearID);
    document.body.removeEventListener("keyup", Play_handleKeyUp);
    document.body.addEventListener("keydown", Play_EndUpclearCalback, false);
}

function Play_handleKeyDown(e) {
    if (Play_state !== Play_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_STOP:
                Play_Exit();
                break;
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                if (Play_ExitDialogVisible() || Play_SingleClickExit) {
                    Play_Exit();
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
                else if (Play_MultiDialogVisible()) {
                    Play_MultiRemoveFocus();
                    Play_MultiDialogPos--;
                    if (Play_MultiDialogPos < 0) Play_MultiDialogPos = 3;
                    Play_MultiAddFocus();
                } else if (Play_MultiEnable && !Play_isPanelShown()) Play_MultiEnableKeyRightLeft(-1);
                else if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown() &&
                    !PlayExtra_PicturePicture) {
                    Play_ChatPositions++;
                    Play_ChatPosition();
                    Play_controls[Play_controlsChatPos].defaultValue = Play_ChatPositions;
                    Play_controls[Play_controlsChatPos].setLable();
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(1, -1);
                    Play_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter--;
                    if (Play_Endcounter < (Main_values.Play_isHost ? 1 : 2)) Play_Endcounter = 3;
                    Play_EndIconsAddFocus();
                } else if (PlayExtra_PicturePicture && Play_isFullScreen) {
                    Play_PicturePicturePos++;
                    if (Play_PicturePicturePos > 7) Play_PicturePicturePos = 0;

                    Android.mSwitchPlayerPosition(Play_PicturePicturePos);
                    Main_setItem('Play_PicturePicturePos', Play_PicturePicturePos);
                } else if (PlayExtra_PicturePicture && !Play_isFullScreen) Play_AudioChangeLeft();
                else
                    Play_showPanel();
                break;
            case KEY_RIGHT:
                if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) UserLiveFeed_KeyRightLeft(1);
                else if (Play_MultiDialogVisible()) {
                    Play_MultiRemoveFocus();
                    Play_MultiDialogPos++;
                    if (Play_MultiDialogPos > 3) Play_MultiDialogPos = 0;
                    Play_MultiAddFocus();
                } else if (Play_MultiEnable && !Play_isPanelShown()) Play_MultiEnableKeyRightLeft(1);
                else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible() &&
                    (!PlayExtra_PicturePicture || Play_MultiEnable)) {
                    Play_controls[Play_controlsChat].enterKey(1);
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(1, 1);
                    Play_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = (Main_values.Play_isHost ? 1 : 2);
                    Play_EndIconsAddFocus();
                } else if (PlayExtra_PicturePicture && Play_isFullScreen) {
                    Play_PicturePictureSize++;
                    if (Play_PicturePictureSize > 2) Play_PicturePictureSize = 0;
                    Android.mSwitchPlayerSize(Play_PicturePictureSize);
                    Main_setItem('Play_PicturePictureSize', Play_PicturePictureSize);
                } else if (PlayExtra_PicturePicture && !Play_isFullScreen) Play_AudioChangeRight();
                else
                    Play_showPanel();
                break;
            case KEY_UP:
                if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY--;
                        if (PlayVod_PanelY < 1) {
                            PlayVod_PanelY = 1;
                        } else PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(1, 1);
                    Play_setHidePanel();
                } else if (Play_MultiDialogVisible()) {
                    Play_MultiRemoveFocus();
                    if (Play_Multi_MainBig) {
                        Play_MultiDialogPos = Play_MultiDialogPos ? 0 : 2;
                    } else {
                        Play_MultiDialogPos -= 2;
                        if (Play_MultiDialogPos < 0) Play_MultiDialogPos += 4;
                    }
                    Play_MultiAddFocus();
                } else if (!UserLiveFeed_isFeedShow()) UserLiveFeed_ShowFeed();
                else if (Play_isEndDialogVisible() || UserLiveFeed_isFeedShow()) {
                    Play_EndTextClear();
                    document.body.removeEventListener("keydown", Play_handleKeyDown, false);
                    document.body.addEventListener("keyup", Play_handleKeyUp, false);
                    Play_EndUpclear = false;
                    Play_EndUpclearCalback = Play_handleKeyDown;
                    Play_EndUpclearID = window.setTimeout(Play_keyUpEnd, 250);
                }
                break;
            case KEY_DOWN:
                if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(1, -1);
                    Play_setHidePanel();
                } else if (Play_MultiDialogVisible()) {
                    Play_MultiRemoveFocus();
                    if (Play_Multi_MainBig) {
                        Play_MultiDialogPos = !Play_MultiDialogPos ? 2 : 0;
                    } else {
                        Play_MultiDialogPos += 2;
                        if (Play_MultiDialogPos > 3) Play_MultiDialogPos -= 4;
                    }
                    Play_MultiAddFocus();
                } else if (Play_isEndDialogVisible()) Play_EndDialogUpDown(1);
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_KeyUpDown(1);
                else if (Play_isFullScreen && Play_isChatShown() && !PlayExtra_PicturePicture && !Play_MultiEnable) {
                    Play_KeyChatSizeChage();
                } else if (PlayExtra_PicturePicture && !Play_MultiEnable) {
                    if (Play_isFullScreen) {
                        document.body.removeEventListener("keydown", Play_handleKeyDown, false);
                        document.body.addEventListener("keyup", Play_handleKeyUp, false);
                        Play_EndUpclear = false;
                        Play_EndUpclearCalback = Play_handleKeyDown;
                        Play_EndUpclearID = window.setTimeout(Play_PPKeyDownHold, 250);
                    } else {
                        Play_PPKeyDownHold();
                    }
                } else if (Play_MultiEnable) {
                    document.body.removeEventListener("keydown", Play_handleKeyDown, false);
                    document.body.addEventListener("keyup", Play_handleKeyUp, false);
                    Play_EndUpclear = false;
                    Play_EndUpclearCalback = Play_handleKeyDown;
                    Play_EndUpclearID = window.setTimeout(Play_MultiKeyDownHold, 250);
                } else Play_showPanel();
                break;
            case KEY_ENTER:
                if (Play_isEndDialogVisible()) {
                    if (Play_EndFocus) Play_EndDialogPressed(1);
                    else {
                        if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].IsGame) UserLiveFeed_KeyEnter(UserLiveFeed_FeedPosX);
                        else if (Play_CheckLiveThumb(true)) {
                            Play_EndDialogEnter = 1;
                            Play_EndUpclearCalback = Play_handleKeyDown;
                            Play_OpenLiveFeed();
                        }
                    }
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 1) {
                        if (!Play_isEndDialogVisible()) Play_KeyPause(1);
                    } else Play_BottomOptionsPressed(1);
                    Play_setHidePanel();
                } else if (Play_MultiDialogVisible()) {
                    Play_HideMultiDialog(true);
                    Play_MultiStartPrestart((Play_MultiDialogPos + Play_Multi_Offset) % 4);
                } else if (UserLiveFeed_isFeedShow()) {
                    if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].IsGame) UserLiveFeed_KeyEnter(UserLiveFeed_FeedPosX);
                    else if (Play_MultiEnable) {
                        if (Play_MultiIsFull()) {
                            var mdoc = Play_CheckLiveThumb();
                            if (mdoc) Play_MultiSetUpdateDialog(mdoc);
                        } else Play_MultiStartPrestart();
                    }
                    else {
                        document.body.removeEventListener("keydown", Play_handleKeyDown, false);
                        document.body.addEventListener("keyup", Play_handleKeyUp, false);
                        PlayExtra_clear = false;
                        UserLiveFeed_ResetFeedId();
                        PlayExtra_KeyEnterID = window.setTimeout(PlayExtra_KeyEnter, 250);
                    }
                } else Play_showPanel();
                break;
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                Play_KeyReturn(false);
                break;
            case KEY_STOP:
                Play_Exit();
                break;
            case KEY_PLAY:
                if (!Play_isEndDialogVisible() && Play_isNotplaying()) Play_KeyPause(1);
                break;
            case KEY_PAUSE:
                if (!Play_isEndDialogVisible() && !Play_isNotplaying()) Play_KeyPause(1);
                break;
            case KEY_KEYBOARD_SPACE:
            case KEY_PLAYPAUSE:
                if (!Play_isEndDialogVisible()) Play_KeyPause(1);
                break;
            case KEY_1:
                if (UserLiveFeed_isFeedShow()) {
                    if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].IsGame) UserLiveFeed_KeyEnter(UserLiveFeed_FeedPosX);
                    else if (Play_MultiEnable) {
                        if (Play_MultiIsFull()) {
                            var mdoc2 = Play_CheckLiveThumb();
                            if (mdoc2) Play_MultiSetUpdateDialog(mdoc2);
                        } else Play_MultiStartPrestart();
                    } else {
                        PlayExtra_KeyEnter();
                    }
                }
                break;
            case KEY_CHAT:
                Play_controls[Play_controlsChat].enterKey(1);
                break;
            case KEY_PG_UP:
                if (UserLiveFeed_isFeedShow()) UserLiveFeed_KeyUpDown(-1);
                else {
                    Play_Panelcounter = Play_controlsChatPos;
                    Play_BottomUpDown(1, 1);
                    Play_Panelcounter = Play_controlsDefault;
                }
                break;
            case KEY_PG_DOWN:
                if (UserLiveFeed_isFeedShow()) UserLiveFeed_KeyUpDown(1);
                else {
                    Play_Panelcounter = Play_controlsChatPos;
                    Play_BottomUpDown(1, -1);
                    Play_Panelcounter = Play_controlsDefault;
                }
                break;
            case KEY_REFRESH:
            case KEY_MEDIA_FAST_FORWARD:
                if (Play_isEndDialogVisible() || Play_MultiDialogVisible() || Play_MultiEnable) break;

                if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedRefresh();
                else Play_controls[Play_controlsChatSide].enterKey();

                break;
            case KEY_MEDIA_REWIND:
                if (Play_isEndDialogVisible() || Play_MultiDialogVisible()) break;

                Play_controls[Play_MultiStream].enterKey();

                break;
            case KEY_MEDIA_NEXT:
                if (Play_isEndDialogVisible() || Play_MultiDialogVisible()) break;

                if (Play_MultiEnable) Play_MultiEnableKeyRightLeft(1);
                else if (PlayExtra_PicturePicture) Play_AudioChangeRight();

                break;
            case KEY_MEDIA_PREVIOUS:
                if (Play_isEndDialogVisible() || Play_MultiDialogVisible()) break;

                if (Play_MultiEnable) Play_MultiEnableKeyRightLeft(-1);
                else if (PlayExtra_PicturePicture) Play_AudioChangeLeft();

                break;
            default:
                break;
        }
    }
}

var Play_controls = {};
var Play_controlsSize = -1;

var Play_controlsSearch = 0;
var Play_controlsChanelCont = 1;
var Play_controlsGameCont = 2;
var Play_controlsOpenVod = 3;
var Play_controlsFollow = 4;
var Play_controlsSpeed = 5;
var Play_controlsQuality = 6;
var Play_controlsQualityMini = 7;
var Play_controlsQualityMulti = 8;
var Play_controlsLowLatency = 9;
var Play_MultiStream = 10;
var Play_controlsAudio = 11;
var Play_controlsAudioMulti = 12;
var Play_controlsChat = 13;
var Play_controlsChatSide = 14;
var Play_controlsChatForceDis = 15;
var Play_controlsChatPos = 16;
var Play_controlsChatSize = 17;
var Play_controlsChatBright = 18;
var Play_controlsChatFont = 19;
var Play_controlsChatDelay = 20;

var Play_controlsDefault = Play_controlsChat;
var Play_Panelcounter = Play_controlsDefault;

function Play_MakeControls() {

    Play_controls[Play_controlsSearch] = { //Search
        icons: "search",
        string: STR_SEARCH,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function(PlayVodClip) {
            Play_ForceHidePannel();
            Play_OpenSearch(PlayVodClip);
        },
    };

    Play_controls[Play_controlsChanelCont] = { //channel content
        icons: "filmstrip",
        string: STR_CHANNEL_CONT,
        values: '',
        defaultValue: null,
        opacity: 0,
        enterKey: function(PlayVodClip) {
            Play_ForceHidePannel();
            Play_OpenChannel(PlayVodClip);
        },
        setLable: function(title) {
            Main_innerHTML('extra_button_' + this.position,
                '<div style="max-width: 27%; text-overflow: ellipsis; overflow: hidden; transform: translate(135.5%, 0);">' +
                title + '</div>');
        },
    };

    Play_controls[Play_controlsGameCont] = { //game content
        icons: "gamepad",
        string: STR_GAME_CONT,
        values: '',
        defaultValue: null,
        opacity: 0,
        enterKey: function(PlayVodClip) {
            Play_ForceHidePannel();
            Play_OpenGame(PlayVodClip);
        },
        setLable: function(title) {
            Main_innerHTML('extra_button_' + this.position,
                '<div style="max-width: 40%; text-overflow: ellipsis; overflow: hidden; transform: translate(75%, 0);">' +
                (title === "" ? STR_NO_GAME : title) + '</div>');
        },
    };

    Play_controls[Play_controlsOpenVod] = { //open vod
        icons: "movie-play",
        string: STR_OPEN_BROADCAST,
        values: '',
        defaultValue: null,
        opacity: 0,
        enterKey: function() {
            Play_ForceHidePannel();
            PlayClip_OpenVod();
        },
        setLable: function(title) {
            Main_innerHTML('extra_button_' + this.position,
                '<div style="max-width: 60%; text-overflow: ellipsis; overflow: hidden; transform: translate(33%, 0);">' +
                title + '</div>');
        },
    };


    Play_controls[Play_controlsFollow] = { //following
        icons: "heart-o",
        string: STR_FOLLOW,
        values: '',
        defaultValue: null,
        opacity: 0,
        enterKey: function(PlayVodClip) {

            AddCode_Channel_id = (PlayVodClip === 1 ? Play_data.data[14] : Main_values.Main_selectedChannel_id);
            Play_FollowUnfollow();

            Play_Resetpanel(PlayVodClip);
        },
        setLable: function(string, AddCode_IsFollowing) {
            Main_textContent('extra_button_text' + this.position, string);
            this.setIcon(AddCode_IsFollowing);
            Main_textContent('extra_button_' + this.position, AddCode_IsFollowing ? STR_CLICK_UNFOLLOW : STR_CLICK_FOLLOW);
        },
        setIcon: function(AddCode_IsFollowing) {
            Main_innerHTML('controls_icon_' + this.position, '<i class="pause_button3d icon-' +
                (AddCode_IsFollowing ? "heart" : "heart-o") +
                '" style="color: #' + (AddCode_IsFollowing ? "6441a4" : "FFFFFF") + ';" ></i>');
        },
    };

    Play_controls[Play_controlsSpeed] = { //speed
        icons: "speedometer",
        string: STR_SPEED,
        values: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
        defaultValue: 3,
        opacity: 0,
        enterKey: function() {
            Play_CurrentSpeed = this.defaultValue;
            Android.setPlaybackSpeed(this.values[this.defaultValue]);
        },
        updown: function(adder) {
            this.defaultValue += adder;
            if (this.defaultValue < 0)
                this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1))
                this.defaultValue = (this.values.length - 1);
            this.bottomArrows();
            this.setLable();
        },
        setLable: function() {
            Main_textContent('controls_name_' + this.position, this.values[this.defaultValue] +
                (this.values[this.defaultValue] === 1 ? 'x (' + STR_NORMAL + ')' : 'x'));
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };

    Play_controls[Play_controlsQuality] = { //quality
        icons: "videocamera",
        string: STR_QUALITY,
        values: ['1080p60 | Source | 10.00Mbps | avc'],
        defaultValue: 0,
        opacity: 0,
        enterKey: function(PlayVodClip) {
            var oldQuality;
            if (PlayVodClip === 1) {
                Play_hidePanel();
                oldQuality = Play_data.quality;
                Play_data.quality = Play_data.qualities[Play_data.qualityIndex].id;
                Play_data.qualityPlaying = Play_data.quality;
                Play_SetHtmlQuality('stream_quality');
                if (oldQuality !== Play_data.quality) Android.SetQuality(Play_data.qualityIndex - 1);
                else Android.reinitializePlayer();
            } else if (PlayVodClip === 2) {
                PlayVod_hidePanel();
                oldQuality = Play_data.quality;
                PlayVod_quality = PlayVod_qualities[PlayVod_qualityIndex].id;
                PlayVod_qualityPlaying = PlayVod_quality;
                PlayVod_SetHtmlQuality('stream_quality');
                if (oldQuality !== Play_data.quality) Android.SetQuality(PlayVod_qualityIndex - 1);
                else Android.reinitializePlayer();
            } else if (PlayVodClip === 3) {
                PlayClip_hidePanel();
                PlayClip_quality = PlayClip_qualities[PlayClip_qualityIndex].id;
                PlayClip_qualityPlaying = PlayClip_quality;
                PlayClip_playingUrl = PlayClip_qualities[PlayClip_qualityIndex].url;
                PlayClip_SetHtmlQuality('stream_quality');
                PlayClip_onPlayer();
            }
        },
        updown: function(adder, PlayVodClip) {

            if (PlayVodClip === 1) {
                //TODO fix this reversed logic
                Play_data.qualityIndex += adder * -1;

                if (Play_data.qualityIndex > (Play_getQualitiesCount() - 1))
                    Play_data.qualityIndex = (Play_getQualitiesCount() - 1);
                else if (Play_data.qualityIndex < 0)
                    Play_data.qualityIndex = 0;

                Play_qualityDisplay(Play_getQualitiesCount, Play_data.qualityIndex, Play_SetHtmlQuality);
            } else if (PlayVodClip === 2) {
                //TODO fix this reversed logic
                PlayVod_qualityIndex += adder * -1;

                if (PlayVod_qualityIndex > (PlayVod_getQualitiesCount() - 1))
                    PlayVod_qualityIndex = (PlayVod_getQualitiesCount() - 1);
                else if (PlayVod_qualityIndex < 0)
                    PlayVod_qualityIndex = 0;

                Play_qualityDisplay(PlayVod_getQualitiesCount, PlayVod_qualityIndex, PlayVod_SetHtmlQuality);
            } else if (PlayVodClip === 3) {
                //TODO fix this reversed logic
                PlayClip_qualityIndex += adder * -1;

                if (PlayClip_qualityIndex > (PlayClip_getQualitiesCount() - 1))
                    PlayClip_qualityIndex = (PlayClip_getQualitiesCount() - 1);
                else if (PlayClip_qualityIndex < 0)
                    PlayClip_qualityIndex = 0;

                Play_qualityDisplay(PlayClip_getQualitiesCount, PlayClip_qualityIndex, PlayClip_SetHtmlQuality);
            }

        },
    };

    Play_controls[Play_controlsQualityMini] = { //quality for picture in picture
        icons: "videocamera",
        string: STR_PLAYER_RESYNC,
        values: [STR_PLAYER_AUTO_SMALLS, STR_PLAYER_AUTO_BIG, STR_PLAYER_AUTO_ALL],
        defaultValue: 2,
        opacity: 0,
        enterKey: function() {

            if (this.defaultValue === 2) {//both
                Android.StartAuto(1, 0, 0);
                Android.StartAuto(1, 0, 1);
            } else if (this.defaultValue) Android.StartAuto(1, 0, 0);//main
            else Android.StartAuto(1, 0, 1);//small

            Play_hidePanel();
            this.defaultValue = 2;
            this.bottomArrows();
            this.setLable();
        },
        updown: function(adder) {

            this.defaultValue += adder;
            if (this.defaultValue < 0) this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);

            this.bottomArrows();
            this.setLable();
        },
        setLable: function() {
            Main_textContent('controls_name_' + this.position,
                Play_controls[this.position].values[Play_controls[this.position].defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },

    };

    Play_controls[Play_controlsQualityMulti] = { //quality for Multi
        icons: "videocamera",
        string: STR_PLAYER_RESYNC,
        values: [STR_PLAYER_MULTI_ALL, STR_PLAYER_WINDOW + 1, STR_PLAYER_WINDOW + 2, STR_PLAYER_WINDOW + 3, STR_PLAYER_WINDOW + 4],
        defaultValue: 0,
        opacity: 0,
        enterKey: function() {

            if (!this.defaultValue) {

                for (var i = 0; i < Play_MultiArray.length; i++) {
                    if (Play_MultiArray[i].data.length > 0) {
                        Android.StartMultiStream(i, Play_MultiArray[i].AutoUrl, Play_MultiArray[i].playlist);
                    }
                }
            } else Android.StartMultiStream(this.defaultValue - 1, Play_MultiArray[this.defaultValue - 1].AutoUrl, Play_MultiArray[this.defaultValue - 1].playlist);

            Play_hidePanel();
            this.defaultValue = 0;
            this.bottomArrows();
            this.setLable();
        },
        updown: function(adder) {

            this.defaultValue += adder;
            if (this.defaultValue < 0) this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);

            this.bottomArrows();
            this.setLable();
        },
        setLable: function() {
            Main_textContent('controls_name_' + this.position,
                Play_controls[this.position].values[Play_controls[this.position].defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },

    };

    Play_controls[Play_controlsLowLatency] = { //quality
        icons: "history",
        string: STR_LOW_LATENCY,
        values: null,
        defaultValue: 0,
        opacity: 0,
        enterKey: function() {
            Play_hidePanel();

            Play_LowLatency = !Play_LowLatency;

            if (Main_IsNotBrowser) {
                Android.mSetlatency(Play_LowLatency);

                if (Play_MultiEnable) {

                    for (var i = 0; i < Play_MultiArray.length; i++) {
                        if (Play_MultiArray[i].data.length > 0) {
                            Android.StartMultiStream(i, Play_MultiArray[i].AutoUrl, Play_MultiArray[i].playlist);
                        }
                    }

                } else if (PlayExtra_PicturePicture) {
                    Android.ResStartAuto(Play_data.AutoUrl, Play_data.playlist, 1, 0, 0);
                    Android.ResStartAuto(PlayExtra_data.AutoUrl, PlayExtra_data.playlist, 1, 0, 1);
                } else {
                    Android.ResStartAuto(Play_data.AutoUrl, Play_data.playlist, 1, 0, 0);
                }

            }

            if (Play_LowLatency) Play_showWarningDialog(STR_LOW_LATENCY_SUMMARY, 3000);

            Main_setItem('Play_LowLatency', Play_LowLatency);
            this.setLable();
        },
        setLable: function() {
            Main_textContent('extra_button_' + this.position, "(" + (Play_LowLatency ? STR_ENABLE : STR_DISABLE) + ")");
        },
    };

    Play_controls[Play_controlsAudio] = { //Audio
        icons: "sound",
        string: STR_AUDIO_SOURCE,
        values: [STR_PLAYER_AUTO_SMALLS, STR_PLAYER_AUTO_BIG, STR_PLAYER_AUTO_ALL],
        defaultValue: Play_controlsAudioPos,
        opacity: 0,
        enterKey: function() {

            Android.mSwitchPlayerAudio(this.defaultValue);

            Play_controlsAudioPos = this.defaultValue;

            Main_setItem('Play_controlsAudioPos', Play_controlsAudioPos);

            this.bottomArrows();
            this.setLable();
            Play_SetAudioIcon();

            var text = !this.defaultValue ? PlayExtra_data.data[1] : Play_data.data[1];

            Play_showWarningDialog(STR_AUDIO_SOURCE + STR_SPACE +
                ((this.defaultValue < 2) ? text : this.values[this.defaultValue]),
                2000
            );
        },
        updown: function(adder) {

            this.defaultValue += adder;
            if (this.defaultValue < 0) this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);

            this.bottomArrows();
            this.setLable();
        },
        setLable: function() {
            Main_textContent('controls_name_' + this.position,
                Play_controls[this.position].values[Play_controls[this.position].defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };

    Play_controls[Play_controlsAudioMulti] = { //Audio multi
        icons: "sound",
        string: STR_AUDIO_SOURCE,
        values: [STR_PLAYER_WINDOW + 1, STR_PLAYER_WINDOW + 2, STR_PLAYER_WINDOW + 3, STR_PLAYER_WINDOW + 4, STR_PLAYER_MULTI_ALL],
        defaultValue: 0,
        opacity: 0,
        enterKey: function(preventShowWarning) {

            Android.mSetPlayerAudioMulti(this.defaultValue);

            this.bottomArrows();
            this.setLable();

            if (!preventShowWarning) {
                Play_showWarningDialog(STR_AUDIO_SOURCE + STR_SPACE +
                    ((this.defaultValue < 4) ? Play_MultiArray[this.defaultValue].data[1] : this.values[this.defaultValue]),
                    2000
                );
            }
        },
        updown: function(adder) {

            this.defaultValue += adder;
            if (this.defaultValue < 0) this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);

            this.bottomArrows();
            this.setLable();
        },
        setLable: function() {
            Main_textContent('controls_name_' + this.position,
                Play_controls[this.position].values[Play_controls[this.position].defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };

    Play_controls[Play_MultiStream] = { //multi
        icons: "multi",
        string: STR_4_WAY_MULTI,
        values: null,
        opacity: 0,
        enterKey: function(shutdown) {
            Play_MultiEnable = !Play_MultiEnable;
            if (Play_MultiEnable) {
                if (Android.IsMainNotMain()) {
                    Android.mSwitchPlayer();
                    PlayExtra_SwitchPlayer();
                }

                Android.EnableMultiStream(Play_Multi_MainBig, 0);
                Play_hidePanel();

                Play_Multi_SetPanel();
                if (!Main_A_includes_B(Play_data.quality, 'Auto')) {
                    Play_data.quality = "Auto";
                    Play_data.qualityPlaying = Play_data.quality;
                    Android.SetQuality(-1);
                }

                var i = 0;
                for (i; i < 4; i++) {
                    Play_MultiArray[i] = JSON.parse(JSON.stringify(Play_data_base));
                }

                Play_MultiArray[0] = JSON.parse(JSON.stringify(Play_data));
                Play_MultiSetinfo(
                    0,
                    Play_MultiArray[0].data[3],
                    Play_MultiArray[0].data[13],
                    Play_MultiArray[0].data[1],
                    Play_MultiArray[0].data[8],
                    Play_MultiArray[0].data[9],
                    twemoji.parse(Play_MultiArray[0].data[2])
                );

                if (PlayExtra_PicturePicture) {
                    Play_MultiArray[1] = JSON.parse(JSON.stringify(PlayExtra_data));
                    Play_MultiSetinfo(
                        1,
                        Play_MultiArray[1].data[3],
                        Play_MultiArray[1].data[13],
                        Play_MultiArray[1].data[1],
                        Play_MultiArray[1].data[8],
                        Play_MultiArray[1].data[9],
                        twemoji.parse(Play_MultiArray[1].data[2])
                    );

                    var PP_audio = Play_controls[Play_controlsAudio].defaultValue;
                    if (!PP_audio) Play_controls[Play_controlsAudioMulti].defaultValue = 1;
                    else if (PP_audio === 1) Play_controls[Play_controlsAudioMulti].defaultValue = 0;
                    else Play_controls[Play_controlsAudioMulti].defaultValue = 4;

                } else Play_controls[Play_controlsAudioMulti].defaultValue = 0;


                Play_controls[Play_controlsAudioMulti].enterKey(true);

                for (i = PlayExtra_PicturePicture ? 2 : 1; i < 4; i++) {
                    Play_MultiInfoReset(i);
                }

                if (Play_isChatShown()) Play_controls[Play_controlsChat].enterKey();

            } else {
                Android.DisableMultiStream();
                Play_Multi_UnSetPanel(shutdown);
                Play_CleanHideExit();
                Play_getQualities(1);
            }
        }
    };

    Play_controls[Play_controlsChat] = { //chat enable disable
        icons: "chat",
        string: STR_CHAT_SHOW,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function() {
            if ((!Play_isFullScreen && !Play_MultiEnable) || Play_Multi_MainBig) return;

            if (!Play_isChatShown() && !Play_isEndDialogVisible()) {
                Play_showChat();
                Play_ChatEnable = true;
            } else {
                Play_hideChat();
                Play_ChatEnable = false;
            }
            Main_setItem('ChatEnable', Play_ChatEnable ? 'true' : 'false');
            this.setLable();
        },
        setLable: function() {
            var string = (Play_isChatShown() ? STR_YES : STR_NO);
            if (!Play_isFullScreen && !Play_MultiEnable) string = Play_isFullScreen ? STR_CHAT_SIDE : STR_CHAT_5050;
            else if (Play_MultiEnable && Play_Multi_MainBig) string = STR_MULTI_MAIN_WINDOW;

            Main_textContent('extra_button_' + this.position, '(' + string + ')');
        },
    };

    Play_controls[Play_controlsChatSide] = { //chat side
        icons: Play_isFullScreen ? "resize-down" : "resize-up",
        string: STR_CHAT_VIDEO_MODE,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function() {
            Play_isFullScreen = !Play_isFullScreen;
            Play_SetFullScreen(Play_isFullScreen);

            if (PlayExtra_PicturePicture) {
                if (!Play_isFullScreen) {
                    ChatLive_Init(1);
                    PlayExtra_ShowChat();
                } else {
                    ChatLive_Clear(1);
                    PlayExtra_HideChat();
                }
            }
            this.setLable();
            this.setIcon();
        },
        setLable: function() {
            var title = Play_isFullScreen ? STR_CHAT_SIDE_FULL : STR_CHAT_SIDE;
            if (PlayExtra_PicturePicture) title = Play_isFullScreen ? STR_CHAT_PP_SIDE_FULL : STR_CHAT_5050;

            Main_textContent('extra_button_' + this.position, '(' + title + ')');

            Play_controls[Play_controlsChat].setLable();
        },
        setIcon: function() {
            var icon = (Play_isFullScreen ? "resize-down" : "resize-up");
            if (PlayExtra_PicturePicture) icon = 'pp';

            Main_innerHTML('controls_icon_' + this.position, '<i class="pause_button3d icon-' +
                icon + '" ></i>');
        },
    };

    Play_controls[Play_controlsChatForceDis] = { //force disable chat
        icons: "chat-stop",
        string: STR_F_DISABLE_CHAT,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function(PlayVodClip) {
            Main_values.Play_ChatForceDisable = !Main_values.Play_ChatForceDisable;

            if (PlayVodClip === 1) {
                ChatLive_Init(0);
                if (PlayExtra_PicturePicture && !Play_isFullScreen && !Play_MultiEnable) ChatLive_Init(1);
            } else Chat_Init();

            this.setLable();
            Main_SaveValues();
        },
        setLable: function() {
            Main_textContent('extra_button_' + this.position, '(' +
                (Main_values.Play_ChatForceDisable ? STR_YES : STR_NO) + ')');
        },
    };

    Play_controls[Play_controlsChatPos] = { //chat position
        icons: "chat-pos",
        string: STR_CHAT_POS,
        values: [1, 2, 3, 4, 5, 6, 7, 8],
        defaultValue: Play_ChatPositions,
        opacity: 0,
        isChat: true,
        updown: function(adder) {
            if (!Play_isChatShown() || (!Play_isFullScreen && !Play_MultiEnable) || Play_Multi_MainBig) return;

            this.defaultValue += adder;
            if (this.defaultValue < 0)
                this.defaultValue = (this.values.length - 1);
            else if (this.defaultValue > (this.values.length - 1))
                this.defaultValue = 0;

            Play_ChatPositions += adder;

            Play_ChatPosition();

            this.defaultValue = Play_ChatPositions;

            this.setLable();
        },
        setLable: function() {
            Main_textContent('controls_name_' + this.position, this.values[this.defaultValue]);
        },
    };

    Play_controls[Play_controlsChatSize] = { //chat size
        icons: "chat-size",
        string: STR_CHAT_SIZE,
        values: ["12.5%", "25%", "50%", "75%", "100%"],
        defaultValue: Play_ChatSizeValue,
        opacity: 0,
        isChat: true,
        updown: function(adder) {
            if (!Play_isChatShown() || (!Play_isFullScreen && !Play_MultiEnable) || Play_Multi_MainBig) return;

            this.defaultValue += adder;

            if (this.defaultValue < 0)
                this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) {
                this.defaultValue = (this.values.length - 1);
                return;
            }

            this.bottomArrows();
            Play_ChatSizeValue = this.defaultValue;

            if (Play_ChatSizeValue === (Play_MaxChatSizeValue - 1) && adder === -1) {
                Play_ChatPositionConvert(false);
            } else if (Play_ChatSizeValue === Play_MaxChatSizeValue) Play_ChatPositionConvert(true);

            Play_ChatSize(true);

            Play_controls[Play_controlsChatPos].defaultValue = Play_ChatPositions;
            this.setLable();
        },
        setLable: function() {
            Main_textContent('controls_name_' + Play_controlsChatPos,
                Play_controls[Play_controlsChatPos].values[Play_controls[Play_controlsChatPos].defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };

    Play_controls[Play_controlsChatBright] = { //chat_brightness
        icons: "chat-brig",
        string: STR_CHAT_BRIGHTNESS,
        values: ["0%", "5%", "10%", "15%", "20%",
            "25%", "30%", "35%", "40%", "45%",
            "50%", "55%", "60%", "65%", "70%",
            "75%", "80%", "85%", "90%", "95%", "100%"
        ],
        defaultValue: Main_values.ChatBackground,
        opacity: 0,
        isChat: true,
        updown: function(adder) {
            if (!Play_isChatShown() || (!Play_isFullScreen && !Play_MultiEnable) || Play_Multi_MainBig) return;

            this.defaultValue += adder;
            if (this.defaultValue < 0)
                this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);
            Main_values.ChatBackground = this.defaultValue;

            Play_ChatBackground = (this.defaultValue * 0.05).toFixed(2);
            Play_ChatBackgroundChange(false);

            this.setLable();
            this.bottomArrows();
            Main_SaveValues();
        },
        setLable: function() {
            Main_textContent('controls_name_' + this.position,
                this.values[this.defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };

    Play_controls[Play_controlsChatFont] = { //Chat font size
        icons: "chat-font",
        string: STR_CHAT_FONT,
        values: ["60%", "80%", "100%", "120%", "140%"],
        defaultValue: Main_values.Chat_font_size,
        opacity: 0,
        isChat: true,
        updown: function(adder) {
            if (!Play_isChatShown()) return;

            this.defaultValue += adder;
            if (this.defaultValue < 0)
                this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);
            Main_values.Chat_font_size = this.defaultValue;

            Play_SetChatFont();
            this.setLable();
            this.bottomArrows();
            Main_SaveValues();
        },
        setLable: function() {
            Main_textContent('controls_name_' + this.position,
                this.values[this.defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };

    Play_controls[Play_controlsChatDelay] = { //chat delay
        icons: "chat-delay",
        string: STR_CHAT_DELAY,
        values: [STR_DISABLE, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
            20, 25, 30, 45, 60, 90, 120, 150, 180, 240, 300
        ],
        defaultValue: Play_ChatDelayPosition,
        opacity: 0,
        isChat: false,
        updown: function(adder) {
            this.defaultValue += adder;

            if (this.defaultValue < 0)
                this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1))
                this.defaultValue = (this.values.length - 1);

            Play_ChatDelayPosition = this.defaultValue;

            Main_setItem('Play_ChatDelayPosition', Play_ChatDelayPosition);
            this.bottomArrows();
            this.setLable();
        },
        setLable: function() {
            var stringSec = '';

            if (this.defaultValue > 1) stringSec = STR_SECONDS;
            else if (this.defaultValue > 0) stringSec = STR_SECOND;

            Main_textContent('controls_name_' + this.position, this.values[this.defaultValue] + stringSec);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };
}

function Play_SetAudioIcon() {
    if (Play_controlsAudioPos === 2) {
        Main_innerHTML("chat_container_sound_icon", '<i class="icon-sound strokicon" ></i>');
        Main_innerHTML("chat_container2_sound_icon", '<i class="icon-sound strokicon" ></i>');
    } else if (Play_controlsAudioPos === 1) {
        Main_innerHTML("chat_container_sound_icon", '<i class="icon-sound strokicon" ></i>');
        Main_innerHTML("chat_container2_sound_icon", '<i class="icon-sound-off strokicon" ></i>');
    } else {
        Main_innerHTML("chat_container_sound_icon", '<i class="icon-sound-off strokicon" ></i>');
        Main_innerHTML("chat_container2_sound_icon", '<i class="icon-sound strokicon" ></i>');
    }
}

function Play_IconsAddFocus() {
    Main_AddClass('controls_button_' + Play_Panelcounter, 'progress_bar_div_focus');
    document.getElementById('controls_button_text_' + Play_Panelcounter).style.opacity = "1";

    if (Play_controls[Play_Panelcounter].isChat && (!Play_isChatShown() || !Play_isFullScreen))
        document.getElementById('controls_button_text_' + Play_controlsChat).style.opacity = "1";
    else if (Play_Panelcounter !== Play_controlsChat && !Play_controls[Play_Panelcounter].isChat)
        document.getElementById('controls_button_text_' + Play_controlsChat).style.opacity = "0";
}

function Play_IconsRemoveFocus() {
    Main_RemoveClass('controls_button_' + Play_Panelcounter, 'progress_bar_div_focus');
    document.getElementById('controls_button_text_' + Play_Panelcounter).style.opacity = "0";
    //in case chat is disable and the warning is showing because some chat option was selected
    document.getElementById('controls_button_text_' + Play_controlsChat).style.opacity = "0";
}

function Play_KeyChatSizeChage() {
    Play_ChatSizeValue++;
    if (Play_ChatSizeValue > Play_MaxChatSizeValue) {
        Play_ChatSizeValue = 0;
        Play_ChatPositionConvert(false);
    } else if (Play_ChatSizeValue === Play_MaxChatSizeValue) Play_ChatPositionConvert(true);
    Play_ChatSize(true);
    Play_controls[Play_controlsChatSize].defaultValue = Play_ChatSizeValue;
    Play_controls[Play_controlsChatSize].bottomArrows();
    Play_controls[Play_controlsChatSize].setLable();
}

function Play_BottomOptionsPressed(PlayVodClip) {
    Main_ready(function() {
        if (Play_controls[Play_Panelcounter].enterKey) {
            Play_controls[Play_Panelcounter].enterKey(PlayVodClip);
        } else {
            Play_Resetpanel(PlayVodClip);
        }
    });
    Main_SaveValues();
}

function Play_Resetpanel(PlayVodClip) {
    Play_clearHidePanel();
    if (PlayVodClip === 1) Play_setHidePanel();
    else if (PlayVodClip === 2) PlayVod_setHidePanel();
    else if (PlayVodClip === 3) PlayClip_setHidePanel();
}

function Play_BottomUpDown(PlayVodClip, adder) {
    if (Play_controls[Play_Panelcounter].updown) {
        Play_controls[Play_Panelcounter].updown(adder, PlayVodClip);
    } else if (adder === 1) {
        PlayVod_PanelY--;
        PlayVod_IconsBottonFocus();
    }
}

function Play_BottomLeftRigt(PlayVodClip, adder) {
    Play_IconsRemoveFocus();
    Play_Panelcounter += adder;
    if (Play_Panelcounter > Play_controlsSize) Play_Panelcounter = 0;
    else if (Play_Panelcounter < 0) Play_Panelcounter = Play_controlsSize;

    if (document.getElementById('controls_' + Play_Panelcounter).style.display === 'none') {
        Play_BottomLeftRigt(PlayVodClip, adder);
        return;
    }

    Play_IconsAddFocus();
}

function Play_BottomArrows(position) {
    var doc_up = document.getElementById("control_arrow_up_" + position),
        doc_down = document.getElementById("control_arrow_down" + position);

    if (Play_controls[position].values.length === 1) {
        doc_up.classList.add('hide');
        doc_down.classList.add('hide');
    } else if (!Play_controls[position].defaultValue) {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = "1";
        doc_down.style.opacity = "0.2";
    } else if (Play_controls[position].defaultValue === (Play_controls[position].values.length - 1)) {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = "0.2";
        doc_down.style.opacity = "1";
    } else {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = "1";
        doc_down.style.opacity = "1";
    }

    Main_textContent('controls_name_' + position, Play_controls[position].values[Play_controls[position].defaultValue]);
}

function Play_SetControls() {
    var div, doc = document.getElementById('controls_holder');
    for (var key in Play_controls) {
        div = document.createElement('div');
        div.classList.add('controls_button_holder');
        div.setAttribute('id', 'controls_' + key);

        div.innerHTML = '<div id="controls_button_' + key +
            '" class="controls_button"><div id="controls_icon_' + key +
            '"><i class="pause_button3d icon-' + Play_controls[key].icons +
            '" ></i></div></div><div id="controls_button_text_' + key +
            '" class="extra_button_text_holder" style="opacity: ' + Play_controls[key].opacity +
            ';"><div id="extra_button_text' + key + '" class="extra_button_text strokedeline" >' +
            Play_controls[key].string + '</div><div id="extra_button_' + key +
            '" class="extra_button_text strokedeline" >' +
            (Play_controls[key].values ? Play_SetControlsArrows(key) : STR_SPACE) + '</div></div></div>';

        doc.appendChild(div);
        Play_controlsSize++;
        Play_controls[key].position = key;
        if (Play_controls[key].bottomArrows) Play_BottomArrows(key);
        if (Play_controls[key].setLable) Play_controls[key].setLable();
    }
}

function Play_SetControlsArrows(key) {
    return '<div id="controls_arrows_' + key + '" style="font-size: 50%; display: inline-block; vertical-align: middle;"><div style="display: inline-block;"><div id="control_arrow_up_' + key + '" class="up"></div><div id="control_arrow_down' + key + '" class="down"></div></div></div>&nbsp;<div id="controls_name_' + key + '" class="arrows_text">' + Play_controls[key].values[Play_controls[key].defaultValue] + '</div>';
}
