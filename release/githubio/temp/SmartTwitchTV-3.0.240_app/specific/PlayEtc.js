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

//Etc player fun and controls
var Play_MultiChatBeffore;
var Play_isFullScreenold = true;
var Play_FullScreenSize = 3;
var Play_FullScreenPosition = 1;

function Play_SetFullScreen(isfull) {
    var changed = Play_isFullScreenold !== Play_isFullScreen;
    Play_isFullScreenold = Play_isFullScreen;

    if (isfull) {
        if (changed) Play_ResStoreChatFullScreen();
    } else {
        if (changed) Play_StoreChatFullScreen();
        Play_SetChatSideBySide();
    }

    if (Main_IsOn_OSInterface) {
        if (PlayExtra_PicturePicture) OSInterface_mupdatesizePP(Play_isFullScreen);
        else OSInterface_mupdatesize(Play_isFullScreen);
    }

    Main_setItem('Play_isFullScreen', Play_isFullScreen);
}

var Play_ChatFullScreenSizes = [
    [//video on the left
        {
            width: '9.7%',
            left: '0.2%'
        },
        {
            width: '14.7%',
            left: '0.2%'
        },
        {
            width: '19.7%',
            left: '0.2%'
        },
        {
            width: '24.7%',
            left: '0.2%'
        },
        {
            width: '29.7%',
            left: '0.2%'
        },
        {
            width: '34.7%',
            left: '0.2%'
        },
        {
            width: '39.7%',
            left: '0.2%'
        },
    ],
    [//video on the right
        {
            width: '9.7%',
            left: '90.1%'
        },
        {
            width: '14.7%',
            left: '85.1%'
        },
        {
            width: '19.7%',
            left: '80.1%'
        },
        {
            width: '24.7%',
            left: '75.1%'
        },
        {
            width: '29.7%',
            left: '70.1%'
        },
        {
            width: '34.7%',
            left: '65.1%'
        },
        {
            width: '39.7%',
            left: '60.1%'
        },
    ]
];

function Play_SetChatSideBySide() {

    if (PlayExtra_PicturePicture) {

        Play_chat_container.style.width = Play_ChatFullScreenSizes[1][3].width;
        Play_chat_container.style.left = Play_ChatFullScreenSizes[1][3].left;

        //Default values
        Play_chat_container.style.height = '99.6%';
        Main_getElementById("play_chat_dialog").style.marginTop = Play_ChatSizeVal[3].dialogTop + '%';
        Play_chat_container.style.top = '0.2%';

    } else {

        Play_chat_container.style.width = Play_ChatFullScreenSizes[Play_FullScreenPosition][Play_FullScreenSize].width;
        Play_chat_container.style.left = Play_ChatFullScreenSizes[Play_FullScreenPosition][Play_FullScreenSize].left;

        //Default values
        Play_chat_container.style.height = '99.6%';
        Main_getElementById("play_chat_dialog").style.marginTop = Play_ChatSizeVal[3].dialogTop + '%';
        Play_chat_container.style.top = '0.2%';

        if (Main_IsOn_OSInterface) OSInterface_mupdatesize(Play_isFullScreen);

        Play_controls[Play_controlsChatPos].values = STR_CHAT_SIDE_ARRAY;
        Play_controls[Play_controlsChatSize].values = ["10%", "15%", "20%", "25%", "30%", "35%", "40%"];
        Play_controls[Play_controlsChatPos].defaultValue = Play_FullScreenPosition;
        Play_controls[Play_controlsChatSize].defaultValue = Play_FullScreenSize;

        Play_controls[Play_controlsChatPos].setLable();
        Play_controls[Play_controlsChatPos].bottomArrows();
        Play_controls[Play_controlsChatSize].setLable();
        Play_BottomArrows(Play_controlsChatSize);
    }

    Play_ChatEnable = true;
    Play_chat_container.classList.remove('hide');

}

var Play_ChatFullScreenObj = {
    height: '',
    marginTop: '',
    top: '',
    left: '',
    WasEnable: false,
    controlsPos: [],
    controlsPosDefault: 0,
    controlsSizeDefault: 0,
};

function Play_StoreChatFullScreen() {
    Play_ChatFullScreenObj.controlsPos = Play_controls[Play_controlsChatSize].values;
    Play_ChatFullScreenObj.controlsPosDefault = Play_controls[Play_controlsChatSize].defaultValue;
    Play_ChatFullScreenObj.controlsSizeDefault = Play_controls[Play_controlsChatPos].defaultValue;

    Play_ChatFullScreenObj.WasEnable = Play_ChatEnable;
    Play_ChatFullScreenObj.height = Play_chat_container.style.height;
    Play_ChatFullScreenObj.marginTop = Main_getElementById("play_chat_dialog").style.marginTop;
    Play_ChatFullScreenObj.top = Play_chat_container.style.top;
    Play_ChatFullScreenObj.left = Play_chat_container.style.left;
}

function Play_ResStoreChatFullScreen() {
    Play_controls[Play_controlsChatSize].values = Play_ChatFullScreenObj.controlsPos;
    Play_controls[Play_controlsChatSize].defaultValue = Play_ChatFullScreenObj.controlsPosDefault;
    Play_SetChatPosString();
    Play_controls[Play_controlsChatPos].defaultValue = Play_ChatFullScreenObj.controlsSizeDefault;
    Play_controls[Play_controlsChatPos].setLable();
    Play_controls[Play_controlsChatPos].bottomArrows();
    Play_controls[Play_controlsChatSize].setLable();
    Play_BottomArrows(Play_controlsChatSize);

    Play_ChatEnable = Play_ChatFullScreenObj.WasEnable;
    Play_chat_container.style.width = '';
    if (!Play_ChatEnable) Play_hideChat();
    else Play_showChat();
    Play_chat_container.style.height = Play_ChatFullScreenObj.height;
    Main_getElementById("play_chat_dialog").style.marginTop = Play_ChatFullScreenObj.marginTop;
    Play_chat_container.style.top = Play_ChatFullScreenObj.top;
    Play_chat_container.style.left = Play_ChatFullScreenObj.left;
}

function Play_ChatFullScreenKeyLeft() {
    Play_FullScreenSize++;
    if (Play_FullScreenSize > 6) Play_FullScreenSize = 0;

    Play_SetChatFullScreenKeyLeft();
}

function Play_SetChatFullScreenKeyLeft() {
    OSInterface_SetFullScreenSize(Play_FullScreenSize);

    Play_SetChatSideBySide();

    Main_setItem('Play_FullScreenSize', Play_FullScreenSize);
}

function Play_ChatFullScreenKeyRight() {
    Play_FullScreenPosition = Play_FullScreenPosition ^ 1;

    Play_SetChatFullScreenKeyRight();
}

function Play_SetChatFullScreenKeyRight() {
    OSInterface_SetFullScreenPosition(Play_FullScreenPosition);
    Play_SetChatSideBySide();

    Main_setItem('Play_FullScreenPosition', Play_FullScreenPosition);
}

function Play_SetChatFont() {
    Main_getElementById('chat_inner_container').style.fontSize = (Play_ChatFontObj[Main_values.Chat_font_size_new] * 0.76) + '%';
    Main_getElementById('chat_inner_container2').style.fontSize = (Play_ChatFontObj[Main_values.Chat_font_size_new] * 0.76) + '%';
}


function Play_partnerIcon(name, partner, live_vod_clip, lang, rerun) {
    var div = '<div class="partnericon_div"> ' + name + STR_SPACE + STR_SPACE + '</div>' +
        (partner ? ('<img class="partnericon_img" alt="" src="' +
            IMG_PARTNER + '">') : "");

    if (!live_vod_clip) {
        var isStay = Play_StayDialogVisible();
        var text = STR_LIVE;

        if (rerun) text = STR_NOT_LIVE;
        else if (isStay) text = STR_CH_IS_OFFLINE;

        div += STR_SPACE + STR_SPACE + '<div class="partnericon_text" style="background: #' +
            (rerun || isStay ? 'FFFFFF; color: #000000;' : 'E21212;') + '">' +
            STR_SPACE + STR_SPACE + text + STR_SPACE + STR_SPACE + '</div>';
    } else if (live_vod_clip === 1) {
        div += STR_SPACE + STR_SPACE + '<div class="partnericon_text" style="background: #00a94b">&nbsp;&nbsp;VOD&nbsp;&nbsp;</div>';
    } else div += STR_SPACE + STR_SPACE + '<div class="partnericon_text" style="background: #F05700">&nbsp;&nbsp;CLIP&nbsp;&nbsp;</div>';

    return div + '<div class="lang_text">' + STR_SPACE + STR_SPACE + lang + '</div>';
}

function Play_IconsResetFocus() {
    Play_IconsRemoveFocus();
    Play_Panelcounter = Play_controlsDefault;
    Play_IconsAddFocus();
}

function Play_updownquality(adder, PlayVodClip, Play_controls) {

    var total;

    if (PlayVodClip === 1) {
        //TODO fix this reversed logic
        Play_data.qualityIndex += adder * -1;
        total = Play_getQualitiesCount() - 1;
        Play_data.qualityIndex = Play_updownqualityCheckTotal(Play_data.qualityIndex, total);

        Play_qualityDisplay(Play_getQualitiesCount, Play_data.qualityIndex, Play_SetHtmlQuality, Play_controls);
    } else if (PlayVodClip === 2) {
        //TODO fix this reversed logic
        PlayVod_qualityIndex += adder * -1;
        total = PlayVod_getQualitiesCount() - 1;
        PlayVod_qualityIndex = Play_updownqualityCheckTotal(PlayVod_qualityIndex, total);

        Play_qualityDisplay(PlayVod_getQualitiesCount, PlayVod_qualityIndex, PlayVod_SetHtmlQuality, Play_controls);
    } else if (PlayVodClip === 3) {
        //TODO fix this reversed logic
        PlayClip_qualityIndex += adder * -1;
        total = PlayClip_getQualitiesCount() - 1;
        PlayClip_qualityIndex = Play_updownqualityCheckTotal(PlayClip_qualityIndex, total);

        Play_qualityDisplay(PlayClip_getQualitiesCount, PlayClip_qualityIndex, PlayClip_SetHtmlQuality, Play_controls);
    }

}

function Play_updownqualityCheckTotal(index, total) {
    if (index > total)
        return total;
    else if (index < 0)
        return 0;

    return index;
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
    if (PlayVodClip === 3 && PlayClip_HasNext && (PlayClip_All || Settings_Obj_default("clip_auto_play_next"))) {
        Play_EndIconsRemoveFocus();
        Play_Endcounter = -1;
    }
    Play_EndIconsAddFocus();
}

function Play_EndCheckPreview(PlayVodClip) {
    //Check if the video that ends is the same focused
    if (PlayVodClip === 1) {//live

        Play_PreviewVideoEnded = Play_CheckPreviewLive(true);

    } else if (PlayVodClip === 2) {//vod

        Play_PreviewVideoEnded = PlayVod_CheckPreviewVod();

    } else if (PlayVodClip === 3) {

        Play_PreviewVideoEnded = PlayClip_CheckPreviewClip();

    }
}

function Play_showEndDialog(PlayVodClip) {
    Play_EndCheckPreview(PlayVodClip);

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
        PlayClip_state = Play_STATE_PLAYING;
        Play_EndTextClear();
        return;
    }

    Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR +
        ((PlayVodClip === 3 && PlayClip_HasNext && (PlayClip_All || Settings_Obj_default("clip_auto_play_next"))) ? STR_PLAY_NEXT_IN : STR_STREAM_END) + Play_EndTextCounter + '...');

    if (Play_isEndDialogVisible()) {
        Play_EndTextCounter--;
        Play_state = Play_STATE_PLAYING;
        PlayVod_state = Play_STATE_PLAYING;
        PlayClip_state = Play_STATE_PLAYING;

        if (Play_EndTextCounter === -1) {
            Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR + STR_STREAM_END +
                '0...');
            Play_CleanHideExit();
            Play_hideChat();
            //The content may have refreshed so re-check
            if (Play_PreviewVideoEnded) Play_EndCheckPreview(PlayVodClip);

            if (PlayVodClip === 1) {
                PlayExtra_PicturePicture = false;
                PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
                Play_shutdownStream();
            } else if (PlayVodClip === 2) PlayVod_shutdownStream();
            else if (PlayVodClip === 3) {
                if (PlayClip_HasNext && (PlayClip_All || Settings_Obj_default("clip_auto_play_next"))) PlayClip_PlayNext();
                else PlayClip_shutdownStream();
            }

        } else {
            Play_EndTextID = Main_setTimeout(
                function() {
                    Play_EndText(PlayVodClip);
                },
                1000,
                Play_EndTextID
            );
        }
    } else {
        //wait to show to start the counter
        Play_EndTextID = Main_setTimeout(
            function() {
                Play_EndText(PlayVodClip);
            },
            50,
            Play_EndTextID
        );
    }
}

function Play_EndTextClear() {
    Main_clearTimeout(Play_EndTextID);
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
        if (Main_values.Play_isHost) Play_OpenHost();
        else if (PlayVodClip === 1) Play_StartStay();
        else if (PlayVodClip === 3) {
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
        Main_getElementById('dialog_end_-1').style.display = 'none';
        Main_getElementById('dialog_end_0').style.display = 'none';
        Main_getElementById('dialog_end_1').style.display = 'inline-block';
        Main_textContent("dialog_end_vod_text", STR_OPEN_HOST);

        Play_EndTextsReset();
        Main_innerHTML("end_channel_name_text", Play_data.data[1]);
        Main_innerHTML("end_vod_title_text", Main_ReplaceLargeFont(Play_data.data[1] + STR_IS_NOW + STR_USER_HOSTING + Play_TargetHost.target_display_name));
    } else if (PlayVodClip === 1) { // play
        Play_EndIconsRemoveFocus();
        Play_Endcounter = 1;
        Play_EndIconsAddFocus();
        Main_getElementById('dialog_end_-1').style.display = 'none';
        Main_getElementById('dialog_end_0').style.display = 'none';
        Main_getElementById('dialog_end_1').style.display = 'inline-block';

        Play_EndTextsReset();
        Main_innerHTML("end_channel_name_text", Play_data.data[1]);
        Main_textContent("dialog_end_vod_text", STR_STAY_OPEN);
        Main_innerHTML("end_vod_title_text", STR_STAY_OPEN_SUMMARY);
    } else if (PlayVodClip === 2) { // vod
        Play_EndIconsResetFocus();
        Main_getElementById('dialog_end_-1').style.display = 'none';
        Main_getElementById('dialog_end_0').style.display = 'inline-block';
        Main_getElementById('dialog_end_1').style.display = 'none';

        Main_innerHTML("end_replay_name_text", Main_values.Main_selectedChannelDisplayname);
        Main_innerHTML("end_replay_title_text", ChannelVod_title);

        Main_textContent("end_vod_name_text", '');
        Main_textContent("end_vod_title_text", '');

        Main_innerHTML("end_channel_name_text", Main_values.Main_selectedChannelDisplayname);
    } else if (PlayVodClip === 3) { // clip
        Play_EndIconsResetFocus();
        Main_getElementById('dialog_end_-1').style.display = PlayClip_HasNext ? 'inline-block' : 'none';
        Main_getElementById('dialog_end_0').style.display = 'inline-block';
        Main_getElementById('dialog_end_1').style.display = 'inline-block';
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

function Play_OpenHost() {
    Play_data.DisplaynameHost = Play_data.data[1] + STR_USER_HOSTING + Play_TargetHost.target_display_name;
    Play_data.data[6] = Play_TargetHost.target_login;
    Play_data.data[1] = Play_TargetHost.target_display_name;
    Play_PreshutdownStream(false);

    Main_addEventListener("keydown", Play_handleKeyDown);

    Play_data.data[14] = Play_TargetHost.target_id;
    Play_Start();
}

var Play_StartStayTryedResult = '';
var Play_StartStayTryId;

function Play_StayDialogVisible() {
    return Main_isElementShowing('play_dialog_retry');
}

function Play_StopStay() {
    Main_clearTimeout(Play_StartStayTryId);
    Main_HideElement('play_dialog_retry');
}

function Play_StartStay() {
    if (!ChatLive_loaded[0]) ChatLive_Init(0);
    Play_showChat();
    Play_data.watching_time = new Date().getTime();
    Play_state = Play_STATE_PLAYING;

    Main_innerHTML("play_dialog_retry_text", STR_STAY_CHECK + STR_BR + 10);
    Main_ShowElement('play_dialog_retry');

    Play_StartStayTryId = Main_setTimeout(
        function() {
            Play_StartStayCheck(10);
        },
        1000,
        Play_StartStayTryId
    );

    Play_UpdateMainStreamDiv();
}

function Play_StartStayCheck(time) {
    time--;
    Main_innerHTML(
        "play_dialog_retry_text",
        (Play_StartStayTryedResult !== '' ? (STR_STAY_CHECK_LAST + STR_BR + Play_StartStayTryedResult + STR_BR) : '') + STR_STAY_CHECK + STR_BR + time
    );

    Play_StartStayTryId = Main_setTimeout(
        function() {
            if (!time) Play_StartStayStartCheck();
            else Play_StartStayCheck(time);
        },
        1000,
        Play_StartStayTryId
    );
}

function Play_StartStayStartCheck() {
    Main_innerHTML("play_dialog_retry_text", STR_STAY_CHECKING);
    if (Main_IsOn_OSInterface) Play_StayCheckHost();
    else Play_StayCheckLiveErrorFinish();
}

function Play_StayCheckHost() {
    var theUrl = ChatLive_Base_chat_url + 'hosts?include_logins=1&host=' + encodeURIComponent(Play_data.data[14]);

    //TODO replace all '[]' with null for performance after some app updates
    OSInterface_GetMethodUrlHeadersAsync(
        theUrl,//urlString
        DefaultHttpGetTimeout,//timeout
        null,//postMessage, null for get
        null,//Method, null for get
        '[]',//JsonString
        'Play_StayCheckHostResult',//callback
        0,//checkResult
        0,//key
        3//thread
    );
}

function Play_StayCheckHostResult(result) {
    if (result) {
        var resultObj = JSON.parse(result);
        if (resultObj.status === 200) {
            Play_StayCheckHostEnd(resultObj.responseText);
        } else {
            Play_StayCheckLive();
        }
    }
    else Play_StayCheckLive();
}

function Play_StayCheckHostEnd(responseText) {
    Play_TargetHost = JSON.parse(responseText).hosts[0];
    Play_state = Play_STATE_PLAYING;

    if (Play_TargetHost.target_login !== undefined) {
        Play_IsWarning = true;
        var warning_text = Play_data.data[1] + STR_IS_NOW + STR_USER_HOSTING + Play_TargetHost.target_display_name;

        Main_values.Play_isHost = true;

        if (Settings_value.open_host.defaultValue) {
            Play_OpenHost();
            Play_showWarningDialog(warning_text, 4000);
            return;
        } else Play_EndSet(0);

        Play_showWarningDialog(warning_text, 4000);
        Play_PlayEndStart(1);

    } else {
        Play_StayCheckLive();
    }
}

function Play_StayCheckLive() {

    Play_loadDataId = new Date().getTime();

    OSInterface_getStreamDataAsync(
        Play_live_token.replace('%x', Play_data.data[6]),
        Play_live_links.replace('%x', Play_data.data[6]),
        'Play_StayCheckLiveResult',
        Play_loadDataId,
        0,
        DefaultHttpGetReTryMax,
        DefaultHttpGetTimeout
    );

}

function Play_StayCheckLiveResult(response) {

    if (Play_isOn && response) {

        var responseObj = JSON.parse(response);

        if (responseObj.checkResult > 0 && responseObj.checkResult === Play_loadDataId) {

            Play_StayCheckLiveResultEnd(JSON.parse(response));

        }

    }
}

function Play_StayCheckLiveResultEnd(responseObj) {

    if (responseObj.status === 200) {
        Main_HideElement('play_dialog_retry');

        Play_data.AutoUrl = responseObj.url;
        Play_loadDataSuccessend(responseObj.responseText, false, true);
        Play_ShowPanelStatus(1);
        Main_values.Play_WasPlaying = 1;
        Main_SaveValues();
        return;

    } else if (responseObj.status === 1 || responseObj.status === 403 ||
        responseObj.status === 404 || responseObj.status === 410) {

        //404 = off line
        //403 = forbidden access
        //410 = api v3 is gone use v5 bug
        Play_StayCheckLiveErrorFinish((responseObj.status === 403 || responseObj.status === 1));
        return;

    }

    Play_StayCheckLiveErrorFinish();
}

function Play_StayCheckLiveErrorFinish(Isforbiden) {

    Play_StartStayTryedResult = Isforbiden ? STR_FORBIDDEN : STR_410_ERROR;

    Main_innerHTML(
        "play_dialog_retry_text",
        STR_STAY_CHECK_LAST + STR_BR + Play_StartStayTryedResult + STR_BR + STR_STAY_CHECK + STR_BR + 10
    );

    Play_StartStayTryId = Main_setTimeout(
        function() {
            Play_StartStayCheck(10);
        },
        1000,
        Play_StartStayTryId
    );
}

function Play_OpenChannel(PlayVodClip) {
    if (!Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) {
        Main_values.Main_BeforeChannel = (Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_aGame) ? Main_values.Main_BeforeAgame : Main_values.Main_Go;
        Main_values.Main_BeforeChannelisSet = true;
    }

    if (Sidepannel_isShowingSide()) {
        Sidepannel_Hide(false);
    }

    Play_PreviewVideoEnded = false;
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
    if (Sidepannel_isShowingSide()) {
        Sidepannel_Hide(false);
    }

    if (PlayVodClip === 1) {
        Play_ClearPP();
        Play_PreshutdownStream(true);
    } else if (PlayVodClip === 2) PlayVod_PreshutdownStream(true);
    else if (PlayVodClip === 3) PlayClip_PreshutdownStream(true);

    Play_PreviewVideoEnded = false;
    Main_values.Play_WasPlaying = 0;
    Main_showScene1Doc();
    Main_hideScene2Doc();
    Main_OpenSearch();
}

function Play_OpenGame(PlayVodClip) {
    if (Sidepannel_isShowingSide()) {
        Sidepannel_Hide(false);
    }

    if (Play_data.data[3] === '') {
        Play_clearHidePanel();
        Play_IsWarning = true;
        Play_showWarningDialog(STR_NO_GAME, 2000);
        return;
    }

    Play_PreviewVideoEnded = false;
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
    if (PlayExtra_PicturePicture) Play_CloseSmall();

    Play_hideChat();
}

function Play_FollowUnfollow() {
    if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
        if (AddCode_IsFollowing) AddCode_UnFollow();
        else AddCode_Follow();
    } else {
        Play_showWarningMidleDialog(STR_NOKEY_WARN, 2000);
        Play_IsWarning = true;
    }
}

function Play_CheckLiveThumb(PreventResetFeed, PreventWarn) {

    var doc = Main_getElementById(UserLiveFeed_ids[3] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]),
        error = STR_STREAM_ERROR;

    if (doc) {
        var obj = JSON.parse(doc.getAttribute(Main_DataAttribute));

        //prevent bad saved obj
        if (!obj[14]) {

            return null;

        }

        var isVodScreen = UserLiveFeed_FeedPosX >= UserLiveFeedobj_UserVodPos;

        if ((!Play_isOn && !isVodScreen) || (!PlayVod_isOn && isVodScreen)) {

            return obj;

        }

        if (isVodScreen) {

            if (!PlayVod_isOn) return obj;
            else if (Main_values.ChannelVod_vodId !== obj[7]) return obj;

            error = STR_ALREDY_PLAYING;

        } else if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].checkHistory) {

            error = STR_ALREDY_PLAYING;

            if (Main_A_includes_B(Main_getElementById(UserLiveFeed_ids[1] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]).src, 's3_vods')) {

                if (Play_MultiEnable || PlayExtra_PicturePicture) error = STR_PP_VOD;
                else return obj;

            } else if (Play_MultiEnable) {

                if (!Play_MultiIsAlredyOPen(obj[14])) return obj;

            } else if (Play_data.data[14] !== obj[14] && PlayExtra_data.data[14] !== obj[14]) return obj;

        } else {

            if (Play_MultiEnable) {

                if (!Play_MultiIsAlredyOPen(obj[14])) return obj;

            } else if (Play_data.data[14] !== obj[14] && PlayExtra_data.data[14] !== obj[14]) return obj;

            error = STR_ALREDY_PLAYING;

        }
    }

    if (!PreventWarn) Play_showWarningMidleDialog(error, 1500);

    if (!PreventResetFeed) UserLiveFeed_ResetFeedId();

    return null;
}

function Play_PlayPauseChange(State, PlayVodClip) {//called by java
    if (Play_StayDialogVisible()) return;

    if (State) {
        Main_innerHTMLWithEle(Play_BottonIcons_Pause, '<div ><i class="pause_button3d icon-pause"></i></div>');

        if (PlayVodClip === 1) {
            ChatLive_Playing = true;
            ChatLive_MessagesRunAfterPause();
        } else if (PlayClip_HasVOD) Chat_Play(Chat_Id[0]);

        if (Play_isPanelShown()) {
            if (PlayVodClip === 1) Play_hidePanel();
            else if (PlayVodClip === 2) PlayVod_hidePanel();
            else if (PlayVodClip === 3) PlayClip_hidePanel();
        }

    } else {
        Main_innerHTMLWithEle(Play_BottonIcons_Pause, '<div ><i class="pause_button3d icon-play-1"></i></div>');

        if (PlayVodClip > 1 && !Main_values.Play_ChatForceDisable) Chat_Pause();
        else ChatLive_Playing = false;
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
        if (Play_isVodDialogVisible() && (Play_ExitDialogVisible() || Settings_Obj_default("single_click_exit"))) {
            Play_HideVodDialog();
            PlayVod_PreshutdownStream(false);
            Play_exitMain();
        } else if (Play_ExitDialogVisible() || Settings_Obj_default("single_click_exit")) {
            if (Play_MultiEnable) Play_controls[Play_MultiStream].enterKey();
            else if (PlayExtra_PicturePicture) Play_CloseSmall();
            else {

                Play_CleanHideExit();
                Play_hideChat();

                if (is_vod) {
                    PlayVod_CheckPreview();
                    PlayVod_shutdownStream();
                } else {
                    Play_CheckPreview();
                    Play_shutdownStream();
                }
            }
        } else if (Play_WarningDialogVisible() || Play_WarningMidleDialogVisible()) {
            Main_clearTimeout(Play_showWarningMidleDialogId);
            Main_clearTimeout(Play_showWarningDialogId);
            Play_HideWarningDialog();
            Play_HideWarningMidleDialog();
            Play_KeyReturSetExit();
        } else Play_KeyReturSetExit();
    }
}

function Play_KeyReturSetExit() {
    var text = PlayExtra_PicturePicture ? STR_EXIT_AGAIN_PICTURE : STR_EXIT_AGAIN;
    text = Play_MultiEnable ? STR_EXIT_AGAIN_MULTI : text;
    Main_textContent("play_dialog_exit_text", text);
    Play_showExitDialog();
}

function Play_CheckPreview() {
    if (Play_isOn && !Play_isEndDialogVisible() && Play_data.data.length > 0) {
        if (!Play_StayDialogVisible()) Main_Set_history('live', Play_data.data);

        if (Play_CheckPreviewLive()) {
            Play_PreviewURL = Play_data.AutoUrl;
            Play_PreviewResponseText = Play_data.playlist;
            Play_PreviewId = Play_data.data[14];
        }
    }
}

function Play_CheckPreviewLive(SkipSidepanelFocus) {
    var restorePreview = false;

    //Side panel
    if (Settings_Obj_default('show_side_player') && Sidepannel_isShowingSide()) {

        if (UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) return false;

        //if side panel is showing, try to find if current stream is on side panel to keep player open
        if (!SkipSidepanelFocus && Sidepannel_Positions.hasOwnProperty(Play_data.data[14])) {
            Main_RemoveClass(UserLiveFeed_side_ids[0] + Sidepannel_PosFeed, 'side_panel_div_focused');
            Sidepannel_PosFeed = Sidepannel_Positions[Play_data.data[14]];
            Sidepannel_AddFocusFeed(true);
        }

        restorePreview = Sidepannel_RestoreThumb(
            Main_getElementById(UserLiveFeed_side_ids[3] + Sidepannel_PosFeed),
            Play_data
        );

        //live
    } else if (Settings_Obj_default('show_live_player') && !Sidepannel_isShowing()) {

        if (Main_values.Main_Go === Main_ChannelContent) {
            restorePreview = ChannelContent_RestoreThumb(Play_data);
        } else if (ScreenObj[Main_values.Main_Go].screenType === 0 && ScreenObj[Main_values.Main_Go].posY > -1 &&
            !Main_ThumbOpenIsNull(ScreenObj[Main_values.Main_Go].posY + '_' + ScreenObj[Main_values.Main_Go].posX, ScreenObj[Main_values.Main_Go].ids[0])) {

            restorePreview = Sidepannel_RestoreThumb(
                Main_getElementById(ScreenObj[Main_values.Main_Go].ids[3] + ScreenObj[Main_values.Main_Go].posY + '_' + ScreenObj[Main_values.Main_Go].posX),
                Play_data
            );

        }
    }

    //The content may have refreshed so re-check
    if (Play_PreviewVideoEnded) Play_PreviewVideoEnded = restorePreview;

    return restorePreview;
}

var Play_Oldaudio = 0;
var Play_AudioAll = false;
function Play_MultiKeyDownHold(preventShowWarning) {
    Play_EndUpclear = true;

    if (Play_controls[Play_controlsAudioMulti].defaultValue !== 4) {
        Play_Oldaudio = Play_controls[Play_controlsAudioMulti].defaultValue;
        Play_controls[Play_controlsAudioMulti].defaultValue = 4;
        Play_controls[Play_controlsAudioMulti].enterKey(preventShowWarning);
    } else {
        Play_controls[Play_controlsAudioMulti].defaultValue = Play_Oldaudio < 4 ? Play_Oldaudio : 0;
        Play_Oldaudio = Play_controls[Play_controlsAudioMulti].defaultValue;
        Play_controls[Play_controlsAudioMulti].enterKey(preventShowWarning);
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
    if (Play_Multi_MainBig) {
        //reset audio value if on big as it may had be changed via hold down or bootm controls
        Play_controls[Play_controlsAudioMulti].defaultValue = Play_Multi_Offset;

        OSInterface_EnableMultiStream(Play_Multi_MainBig, Play_Multi_Offset);

        Play_showWarningMidleDialog(
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
        Main_getElementById("play_chat_dialog").style.marginTop = Play_ChatSizeVal[3].dialogTop + '%';
        Play_chat_container.style.top = '0.2%';
        Play_chat_container.style.left = '67%';

        if (!Play_MultiArray[Play_Multi_Offset].data.length) Play_MultiEnableKeyRightLeft(1);
    } else {
        Play_MultiUpdateinfoMainBig('');
        Main_ShowElement('stream_info_multi');
        Main_HideElement('stream_info_multi_big');
        Play_ResStoreChatPos();
        OSInterface_EnableMultiStream(Play_Multi_MainBig, Play_Multi_Offset);
    }
    Play_SetAudioMultiIcon();
}

function Play_handleKeyUp(e) {
    //To test multi dialog
    // var mdoc = Play_CheckLiveThumb();
    // if (mdoc) Play_MultiSetUpdateDialog(mdoc);
    // return;
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
                if (Main_IsOn_OSInterface) OSInterface_mSwitchPlayer();
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
    Main_clearTimeout(Play_EndUpclearID);
    Main_removeEventListener("keyup", Play_handleKeyUp);
    Main_addEventListener("keydown", Play_EndUpclearCalback);
}

function Play_handleKeyDown(e) {
    if (Play_state !== Play_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_STOP:
                Play_Exit();
                break;
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                if (Play_ExitDialogVisible() || Settings_Obj_default("single_click_exit")) {
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
                    Play_KeyChatPosChage();
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(1, -1);
                    Play_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter--;
                    if (Play_Endcounter < 1) Play_Endcounter = 3;
                    Play_EndIconsAddFocus();
                } else if (PlayExtra_PicturePicture && Play_isFullScreen) {
                    Play_PicturePicturePos++;
                    if (Play_PicturePicturePos > 7) Play_PicturePicturePos = 0;

                    OSInterface_mSwitchPlayerPosition(Play_PicturePicturePos);
                    Main_setItem('Play_PicturePicturePos', Play_PicturePicturePos);
                } else if (PlayExtra_PicturePicture && !Play_isFullScreen) Play_AudioChangeLeft();
                else if (!PlayExtra_PicturePicture && !Play_isFullScreen) Play_ChatFullScreenKeyLeft();
                else Play_showPanel();
                break;
            case KEY_RIGHT:
                if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) UserLiveFeed_KeyRightLeft(1);
                else if (Play_MultiDialogVisible()) {
                    Play_MultiRemoveFocus();
                    Play_MultiDialogPos++;
                    if (Play_MultiDialogPos > 3) Play_MultiDialogPos = 0;
                    Play_MultiAddFocus();
                } else if (Play_MultiEnable && !Play_isPanelShown()) Play_MultiEnableKeyRightLeft(1);
                else if (Play_isFullScreen && Play_isChatShown() && !Play_isPanelShown() && !Play_isEndDialogVisible() &&
                    (!PlayExtra_PicturePicture || Play_MultiEnable)) {
                    Play_KeyChatSizeChage();
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(1, 1);
                    Play_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = 1;
                    Play_EndIconsAddFocus();
                } else if (PlayExtra_PicturePicture && Play_isFullScreen) {
                    Play_PicturePictureSize++;
                    if (Play_PicturePictureSize > 4) Play_PicturePictureSize = 0;
                    OSInterface_mSwitchPlayerSize(Play_PicturePictureSize);
                    Main_setItem('Play_PicturePictureSize', Play_PicturePictureSize);
                } else if (PlayExtra_PicturePicture && !Play_isFullScreen) Play_AudioChangeRight();
                else if (!PlayExtra_PicturePicture && !Play_isFullScreen) Play_ChatFullScreenKeyRight();
                else Play_showPanel();
                break;
            case KEY_UP:
                if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY--;
                        if (PlayVod_PanelY < 1) {
                            PlayVod_PanelY = 1;
                        } else Play_BottonIconsFocus();
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
                    Main_removeEventListener("keydown", Play_handleKeyDown);
                    Main_addEventListener("keyup", Play_handleKeyUp);
                    Play_EndUpclear = false;
                    Play_EndUpclearCalback = Play_handleKeyDown;
                    Play_EndUpclearID = Main_setTimeout(Play_keyUpEnd, Screens_KeyUptimeout, Play_EndUpclearID);
                }
                break;
            case KEY_DOWN:
                if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY++;
                        Play_BottonIconsFocus();
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
                else if (PlayExtra_PicturePicture && !Play_MultiEnable) {
                    if (Play_isFullScreen) {
                        Main_removeEventListener("keydown", Play_handleKeyDown);
                        Main_addEventListener("keyup", Play_handleKeyUp);
                        Play_EndUpclear = false;
                        Play_EndUpclearCalback = Play_handleKeyDown;
                        Play_EndUpclearID = Main_setTimeout(Play_PPKeyDownHold, Screens_KeyUptimeout, Play_EndUpclearID);
                    } else {
                        Play_PPKeyDownHold();
                    }
                } else if (Play_MultiEnable) {
                    Main_removeEventListener("keydown", Play_handleKeyDown);
                    Main_addEventListener("keyup", Play_handleKeyUp);
                    Play_EndUpclear = false;
                    Play_EndUpclearCalback = Play_handleKeyDown;
                    Play_EndUpclearID = Main_setTimeout(Play_MultiKeyDownHold, Screens_KeyUptimeout, Play_EndUpclearID);
                } else if (Play_isFullScreen) Play_controls[Play_controlsChat].enterKey(1);
                else Play_showPanel();
                break;
            case KEY_ENTER:
                //ChatLive_Playing = false;
                if (Play_isEndDialogVisible()) {
                    if (Play_EndFocus) Play_EndDialogPressed(1);
                    else {
                        if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].IsGame) UserLiveFeed_KeyEnter(UserLiveFeed_FeedPosX);
                        else if (Play_PreviewId || Play_CheckLiveThumb(true)) {
                            Play_EndDialogEnter = 1;
                            Play_EndUpclearCalback = Play_handleKeyDown;
                            Play_OpenLiveFeed();
                        }
                    }
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 1) {
                        if (Main_IsOn_OSInterface && !Play_isEndDialogVisible()) OSInterface_PlayPauseChange();
                    } else Play_BottomOptionsPressed(1);
                    Play_setHidePanel();
                } else if (Play_MultiDialogVisible()) {
                    Play_HideMultiDialog(true);
                    var pos = (Play_MultiDialogPos + Play_Multi_Offset) % 4;
                    Main_Set_history('live', Play_MultiArray[pos].data);//save before we change
                    Play_MultiStartPrestart(pos);
                } else if (UserLiveFeed_isFeedShow()) {
                    if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].IsGame) UserLiveFeed_KeyEnter(UserLiveFeed_FeedPosX);
                    else if (Play_MultiEnable) {
                        if (Play_MultiIsFull()) {
                            var obj1 = Play_CheckLiveThumb();
                            if (obj1) Play_MultiSetUpdateDialog(obj1);
                        } else Play_MultiStartPrestart();
                    } else if (Play_StayDialogVisible()) {
                        Play_OpenLiveFeedCheck();
                    } else {
                        Main_removeEventListener("keydown", Play_handleKeyDown);
                        Main_addEventListener("keyup", Play_handleKeyUp);
                        PlayExtra_clear = false;
                        UserLiveFeed_ResetFeedId();
                        PlayExtra_KeyEnterID = Main_setTimeout(PlayExtra_KeyEnter, Screens_KeyUptimeout, PlayExtra_KeyEnterID);
                    }
                } else Play_showPanel();
                break;
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                Play_KeyReturn(false);
                break;
            case KEY_STOP:
                Play_CheckPreview();
                Play_Exit();
                break;
            case KEY_PLAY:
            case KEY_KEYBOARD_SPACE:
            case KEY_PLAYPAUSE:
                if (Main_IsOn_OSInterface && !Play_isEndDialogVisible()) OSInterface_PlayPauseChange();
                break;
            case KEY_1:
                if (UserLiveFeed_isFeedShow()) {
                    if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].IsGame) UserLiveFeed_KeyEnter(UserLiveFeed_FeedPosX);
                    else if (Play_MultiEnable) {
                        if (Play_MultiIsFull()) {
                            var obj2 = Play_CheckLiveThumb();
                            if (obj2) Play_MultiSetUpdateDialog(obj2);
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
                else if (Play_isFullScreen && Play_isChatShown()) Play_KeyChatPosChage();
                else UserLiveFeed_ShowFeed();
                break;
            case KEY_PG_DOWN:
                if (UserLiveFeed_isFeedShow()) UserLiveFeed_KeyUpDown(1);
                else if (Play_isFullScreen && Play_isChatShown()) Play_KeyChatSizeChage();
                else UserLiveFeed_ShowFeed();
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
            case KEY_4:
                Play_controls[Play_controlsChatSend].enterKey();
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
var Play_controlsExternal = 6;
var Play_controlsQuality = 7;
var Play_controlsQualityMini = 8;
var Play_controlsQualityMulti = 9;
var Play_controlsLowLatency = 10;
var Play_controlsChapters = 11;
var Play_MultiStream = 12;
var Play_controlsAudio = 13;
var Play_controlsAudioMulti = 14;
var Play_controlsChat = 15;
var Play_controlsChatSend = 16;
var Play_controlsChatSide = 17;
var Play_controlsChatForceDis = 18;
var Play_controlsChatPos = 19;
var Play_controlsChatSize = 20;
var Play_controlsChatBright = 21;
var Play_controlsChatFont = 22;
var Play_controlsChatDelay = 23;

var Play_controlsDefault = Play_controlsChat;
var Play_Panelcounter = Play_controlsDefault;

function Play_MakeControls() {

    Play_controls[Play_controlsSearch] = { //Search
        icons: "search",
        string: STR_SEARCH,
        values: null,
        defaultValue: null,
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
        enterKey: function() {
            if (Play_StayDialogVisible()) return;

            Play_CurrentSpeed = this.defaultValue;
            OSInterface_setPlaybackSpeed(this.values[this.defaultValue]);
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
            Main_textContentWithEle(this.doc_name, this.values[this.defaultValue] +
                (this.values[this.defaultValue] === 1 ? 'x (' + STR_NORMAL + ')' : 'x'));
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };

    Play_controls[Play_controlsExternal] = { //quality
        icons: "external",
        string: STR_OPEN_EXTERNAL_PLAYER,
        values: ['1080p60 | Source | 10.00Mbps | avc'],
        defaultValue: 0,
        enterKey: function(PlayVodClip) {
            if (Play_StayDialogVisible()) return;

            if (PlayVodClip === 1) {
                Play_hidePanel();
            } else if (PlayVodClip === 2) {
                PlayVod_hidePanel();
            } else if (PlayVodClip === 3) {
                PlayClip_hidePanel();
            }

            OSInterface_OpenExternal(Play_ExternalUrls[Play_controls[this.position].defaultValue]);
        },
        updown: function(adder) {
            this.defaultValue += adder;
            if (this.defaultValue < 0)
                this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1))
                this.defaultValue = (this.values.length - 1);

            this.setLable();
        },
        setLable: function() {
            Main_textContentWithEle(this.doc_name,
                Play_controls[this.position].values[Play_controls[this.position].defaultValue]);
            this.bottomArrows();
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
        enterKey: function(PlayVodClip) {
            if (Play_StayDialogVisible()) return;

            var oldQuality;
            if (PlayVodClip === 1) {
                Play_hidePanel();
                oldQuality = Play_data.quality;
                Play_SetPlayQuality(Play_data.qualities[Play_data.qualityIndex].id);
                Play_SetHtmlQuality('stream_quality');

                if (oldQuality !== Play_data.quality) OSInterface_SetQuality(Play_data.qualityIndex - 1);//just quality change
                else OSInterface_RestartPlayer(1, 0, 0);//resetart the player

            } else if (PlayVodClip === 2) {
                PlayVod_hidePanel();
                oldQuality = PlayVod_quality;
                PlayVod_quality = PlayVod_qualities[PlayVod_qualityIndex].id;
                PlayVod_qualityPlaying = PlayVod_quality;
                PlayVod_SetHtmlQuality('stream_quality');

                if (oldQuality !== PlayVod_quality) OSInterface_SetQuality(PlayVod_qualityIndex - 1);//just quality change
                else OSInterface_RestartPlayer(2, OSInterface_gettime(), 0);//resetart the player

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
            Play_updownquality(adder, PlayVodClip, Play_controlsQuality);
        },
    };

    Play_controls[Play_controlsQualityMini] = { //quality for picture in picture
        icons: "videocamera",
        string: STR_PLAYER_RESYNC,
        values: [STR_PLAYER_AUTO_SMALLS, STR_PLAYER_AUTO_BIG, STR_PLAYER_AUTO_ALL],
        defaultValue: 2,
        enterKey: function() {
            if (Play_StayDialogVisible()) return;

            if (this.defaultValue === 2) {//both
                OSInterface_RestartPlayer(1, 0, 0);
                OSInterface_RestartPlayer(1, 0, 1);
            } else if (this.defaultValue) OSInterface_RestartPlayer(1, 0, 0);//main
            else OSInterface_RestartPlayer(1, 0, 1);//small

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
            Main_textContentWithEle(this.doc_name,
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
        enterKey: function() {
            if (Play_StayDialogVisible()) return;

            if (!this.defaultValue) {

                var i = 0, len = Play_MultiArray.length;
                for (i; i < len; i++) {
                    if (Play_MultiArray[i].data.length > 0) {
                        OSInterface_StartMultiStream(i, Play_MultiArray[i].AutoUrl, Play_MultiArray[i].playlist);
                    }
                }
            } else OSInterface_StartMultiStream(this.defaultValue - 1, Play_MultiArray[this.defaultValue - 1].AutoUrl, Play_MultiArray[this.defaultValue - 1].playlist);

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
            Main_textContentWithEle(this.doc_name,
                Play_controls[this.position].values[Play_controls[this.position].defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },

    };

    Play_controls[Play_controlsLowLatency] = { //quality
        icons: "history",
        string: STR_LOW_LATENCY,
        values: [STR_DISABLE, STR_LOWLATENCY_ENABLE, STR_LOWLATENCY_LOW],
        defaultValue: Play_LowLatency,
        enterKey: function() {
            if (Play_StayDialogVisible()) return;

            Play_hidePanel();

            Play_LowLatency = this.defaultValue;

            if (Main_IsOn_OSInterface) {
                OSInterface_mSetlatency(Play_LowLatency);

                if (Play_MultiEnable) {

                    var i = 0, len = Play_MultiArray.length;
                    for (i; i < len; i++) {
                        if (Play_MultiArray[i].data.length > 0) {
                            OSInterface_StartMultiStream(i, Play_MultiArray[i].AutoUrl, Play_MultiArray[i].playlist);
                        }
                    }

                } else if (PlayExtra_PicturePicture) {
                    OSInterface_StartAuto(Play_data.AutoUrl, Play_data.playlist, 1, 0, 0);
                    OSInterface_StartAuto(PlayExtra_data.AutoUrl, PlayExtra_data.playlist, 1, 0, 1);
                } else {
                    OSInterface_StartAuto(Play_data.AutoUrl, Play_data.playlist, 1, 0, 0);
                }

            }

            if (Play_LowLatency) Play_showWarningMidleDialog(STR_LOW_LATENCY_SUMMARY, 3000);

            Main_setItem('Play_LowLatency', Play_LowLatency);
            //this.setLable();
        },
        updown: function(adder) {

            this.defaultValue += adder;
            if (this.defaultValue < 0) this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);

            this.bottomArrows();
            this.setLable();
        },
        setLable: function() {
            Main_textContentWithEle(this.doc_name,
                Play_controls[this.position].values[Play_controls[this.position].defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };

    Play_controls[Play_controlsAudio] = { //Audio
        icons: "volume",
        string: STR_AUDIO_SOURCE,
        values: [STR_PLAYER_AUTO_SMALLS, STR_PLAYER_AUTO_BIG, STR_PLAYER_AUTO_ALL],
        defaultValue: Play_controlsAudioPos,
        enterKey: function() {
            if (Play_StayDialogVisible()) return;

            OSInterface_mSwitchPlayerAudio(this.defaultValue);

            Play_controlsAudioPos = this.defaultValue;

            Main_setItem('Play_controlsAudioPos', Play_controlsAudioPos);

            this.bottomArrows();
            this.setLable();
            Play_SetAudioIcon();

            var text = !this.defaultValue ? PlayExtra_data.data[1] : Play_data.data[1];

            Play_showWarningMidleDialog(STR_AUDIO_SOURCE + STR_SPACE +
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
            Main_textContentWithEle(this.doc_name,
                Play_controls[this.position].values[Play_controls[this.position].defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };

    Play_controls[Play_controlsAudioMulti] = { //Audio multi
        icons: "volume",
        string: STR_AUDIO_SOURCE,
        values: [STR_PLAYER_WINDOW + 1, STR_PLAYER_WINDOW + 2, STR_PLAYER_WINDOW + 3, STR_PLAYER_WINDOW + 4, STR_PLAYER_MULTI_ALL],
        defaultValue: 0,
        enterKey: function(preventShowWarning) {
            if (Play_StayDialogVisible()) return;

            OSInterface_mSetPlayerAudioMulti(this.defaultValue);
            Play_AudioAll = this.defaultValue === 4;

            this.bottomArrows();
            this.setLable();
            Play_SetAudioMultiIcon();

            if (!preventShowWarning) {
                Play_showWarningMidleDialog(STR_AUDIO_SOURCE + STR_SPACE +
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
            Main_textContentWithEle(this.doc_name,
                Play_controls[this.position].values[Play_controls[this.position].defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };

    Play_controls[Play_controlsChapters] = { //Audio multi
        icons: "feed",
        string: STR_CHAPTERS,
        values: [],
        defaultValue: 0,
        enterKey: function() {

            PlayVod_TimeToJump = PlayVod_ChaptersArray[this.defaultValue].posMs / 1000;
            PlayVod_jump();

        },
        updown: function(adder) {

            this.defaultValue += adder;
            if (this.defaultValue < 0) this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);

            this.bottomArrows();
            this.setLable();
        },
        setLable: function() {
            Main_textContentWithEle(this.doc_name,
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
        enterKey: function(shutdown) {
            if (!Main_IsOn_OSInterface || Play_StayDialogVisible()) return;

            Play_MultiEnable = !Play_MultiEnable;
            if (Play_MultiEnable) {
                if (OSInterface_IsMainNotMain()) {
                    if (PlayExtra_PicturePicture) {
                        OSInterface_mSwitchPlayer();
                        PlayExtra_SwitchPlayer();
                    } else {
                        OSInterface_PrepareForMulti(Play_data.AutoUrl, Play_data.playlist);
                    }
                }

                Play_hidePanel();
                Play_Multi_SetPanel();
                if (!Main_A_includes_B(Play_data.quality, 'Auto')) {
                    Play_SetPlayQuality("Auto");
                    OSInterface_SetQuality(-1);
                    Play_qualityDisplay(Play_getQualitiesCount, 0, Play_SetHtmlQuality, Play_controlsQuality);
                }

                OSInterface_EnableMultiStream(Play_Multi_MainBig, 0);

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

                Play_MultiChatBeffore = Play_isChatShown();
                if (Play_MultiChatBeffore) Play_controls[Play_controlsChat].enterKey();
                Play_SetAudioMultiIcon();

            } else {
                OSInterface_DisableMultiStream();
                Play_Multi_UnSetPanel(shutdown);
                Play_CleanHideExit();
                Play_getQualities(1, PlayExtra_PicturePicture);
            }
        }
    };

    Play_controls[Play_controlsChat] = { //chat enable disable
        icons: "chat",
        string: STR_CHAT_SHOW,
        values: null,
        defaultValue: null,
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

            if (!Play_isFullScreen && !Play_MultiEnable) {
                string = PlayExtra_PicturePicture ? STR_CHAT_5050 : STR_CHAT_SIDE;
            } else if (Play_MultiEnable && Play_Multi_MainBig) string = STR_MULTI_MAIN_WINDOW;

            Main_textContent('extra_button_' + this.position, '(' + string + ')');
        },
    };

    Play_controls[Play_controlsChatSend] = {
        icons: "keyboard",
        string: STR_CHAT_WRITE,
        values: null,
        defaultValue: null,
        enterKey: function() {
            if (Main_values.Play_ChatForceDisable) {
                Play_showWarningMidleDialog(STR_CHAT_DISABLE, 1500);
                return;
            } else if (!AddUser_UserIsSet() || !AddUser_UsernameArray[0].access_token) {
                Play_showWarningMidleDialog(STR_NOKEY_CHAT_WARN, 1500);
                return;
            }

            if (PlayExtra_PicturePicture && !Play_isFullScreen) ChatLiveControls_ShowChooseChat();
            else ChatLiveControls_Show();

        }
    };

    Play_controls[Play_controlsChatSide] = { //chat side
        icons: Play_isFullScreen ? "resize-down" : "resize-up",
        string: STR_CHAT_VIDEO_MODE,
        values: null,
        defaultValue: null,
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
        values: STR_CHAT_BASE_ARRAY,
        defaultValue: Play_ChatPositions,
        isChat: true,
        updown: function(adder) {
            if (!Play_isChatShown() || Play_Multi_MainBig || (!Play_isFullScreen && PlayExtra_PicturePicture)) return;

            this.defaultValue += adder;
            if (this.defaultValue < 0)
                this.defaultValue = (this.values.length - 1);
            else if (this.defaultValue > (this.values.length - 1))
                this.defaultValue = 0;

            if (Play_isFullScreen || Play_MultiEnable) {

                Play_ChatPositions += adder;
                Play_ChatPosition();
                this.defaultValue = Play_ChatPositions;

            } else {

                Play_FullScreenPosition = this.defaultValue;
                Play_SetChatFullScreenKeyRight();

            }

            this.setLable();
            this.bottomArrows();
        },
        setLable: function() {
            Main_textContentWithEle(this.doc_name, this.values[this.defaultValue]);
        },
        bottomArrows: function() {

            this.doc_up.classList.remove('hide');
            this.doc_down.classList.remove('hide');

            this.doc_up.style.opacity = "1";
            this.doc_down.style.opacity = "1";
        },
    };

    Play_controls[Play_controlsChatSize] = { //chat size
        icons: "chat-size",
        string: STR_CHAT_SIZE,
        values: ["12.5%", "25%", "50%", "75%", "100%"],
        defaultValue: Play_ChatSizeValue,
        isChat: true,
        updown: function(adder) {
            if (!Play_isChatShown() || Play_Multi_MainBig || (!Play_isFullScreen && PlayExtra_PicturePicture)) return;

            this.defaultValue += adder;

            if (this.defaultValue < 0)
                this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) {
                this.defaultValue = (this.values.length - 1);
                return;
            }

            this.bottomArrows();

            if (Play_isFullScreen || Play_MultiEnable) {

                Play_ChatSizeValue = this.defaultValue;

                if (Play_ChatSizeValue === (Play_MaxChatSizeValue - 1) && adder === -1) {
                    Play_ChatPositionConvert(false);
                } else if (Play_ChatSizeValue === Play_MaxChatSizeValue) Play_ChatPositionConvert(true);

                Play_ChatSize(true);

                Play_controls[Play_controlsChatPos].defaultValue = Play_ChatPositions;
            } else {

                Play_FullScreenSize = this.defaultValue;
                Play_SetChatFullScreenKeyLeft();

            }

            this.setLable();
        },
        setLable: function() {
            Main_textContentWithEle(
                Play_controls[Play_controlsChatPos].doc_name,
                Play_controls[Play_controlsChatPos].values[Play_controls[Play_controlsChatPos].defaultValue]
            );

            Main_textContentWithEle(
                this.doc_name,
                this.values[this.defaultValue]
            );
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
            Main_textContentWithEle(this.doc_name,
                this.values[this.defaultValue]);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };

    Play_controls[Play_controlsChatFont] = { //Chat font size
        icons: "chat-font",
        string: STR_CHAT_FONT,
        values: Play_ChatFontObj,
        defaultValue: Main_values.Chat_font_size_new,
        isChat: true,
        updown: function(adder) {
            if (!Play_isChatShown()) return;

            this.defaultValue += adder;
            if (this.defaultValue < 0)
                this.defaultValue = 0;
            else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);
            Main_values.Chat_font_size_new = this.defaultValue;

            Play_SetChatFont();
            this.bottomArrows();
            this.setLable();
            Main_SaveValues();
        },
        setLable: function() {
            Main_textContentWithEle(this.doc_name, this.values[this.defaultValue] + '%');
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

            Main_textContentWithEle(this.doc_name, this.values[this.defaultValue] + stringSec);
        },
        bottomArrows: function() {
            Play_BottomArrows(this.position);
        },
    };
}

function Play_IconsAddFocus() {
    Main_AddClassWitEle(Play_controls[Play_Panelcounter].button, Play_BottonIcons_Focus_Class);

    Play_controls[Play_Panelcounter].button_text.style.opacity = "1";

    if (Play_controls[Play_Panelcounter].isChat && (!Play_isChatShown() || !Play_isFullScreen)) {

        Play_controls[Play_controlsChat].button_text.style.opacity = "1";

    } else if (Play_Panelcounter !== Play_controlsChat && !Play_controls[Play_Panelcounter].isChat) {

        Play_controls[Play_controlsChat].button_text.style.opacity = "0";

    }
}

function Play_IconsRemoveFocus() {
    Main_RemoveClassWithEle(Play_controls[Play_Panelcounter].button, Play_BottonIcons_Focus_Class);
    Play_controls[Play_Panelcounter].button_text.style.opacity = "0";
    //in case chat is disable and the warning is showing because some chat option was selected
    Play_controls[Play_controlsChat].button_text.style.opacity = "0";
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

function Play_KeyChatPosChage() {
    Play_ChatPositions++;
    Play_ChatPosition();
    Play_controls[Play_controlsChatPos].defaultValue = Play_ChatPositions;
    Play_controls[Play_controlsChatPos].setLable();
}

function Play_BottomOptionsPressed(PlayVodClip) {
    if (Play_controls[Play_Panelcounter].enterKey) {
        Play_controls[Play_Panelcounter].enterKey(PlayVodClip);
    } else {
        Play_Resetpanel(PlayVodClip);
    }
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
        Play_BottonIconsFocus();
    }
}

function Play_BottomLeftRigt(PlayVodClip, adder, skipRemoveFocus) {

    if (!skipRemoveFocus) Play_IconsRemoveFocus();
    Play_Panelcounter += adder;
    if (Play_Panelcounter > Play_controlsSize) Play_Panelcounter = 0;
    else if (Play_Panelcounter < 0) Play_Panelcounter = Play_controlsSize;

    if (!Play_controls[Play_Panelcounter].visible) {
        Play_BottomLeftRigt(PlayVodClip, adder, true);
        return;
    }

    Play_IconsAddFocus();

}

function Play_BottomShow(position) {
    Play_controls[position].doc.style.display = '';
    Play_controls[position].visible = true;
}

function Play_BottomHide(position) {
    Play_controls[position].doc.style.display = 'none';
    Play_controls[position].visible = false;
}

function Play_BottomArrows(position) {
    var doc_up = Play_controls[position].doc_up,
        doc_down = Play_controls[position].doc_down;

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

    Main_textContentWithEle(Play_controls[position].doc_name, Play_controls[position].values[Play_controls[position].defaultValue]);
}

function Play_SetControls() {
    var div, doc = Main_getElementById('controls_holder');
    for (var key in Play_controls) {
        div = document.createElement('div');
        div.className = 'controls_button_holder';
        div.setAttribute('id', 'controls_' + key);

        div.innerHTML = '<div id="controls_button_' + key +
            '" class="controls_button"><div id="controls_icon_' + key +
            '"><i class="pause_button3d icon-' + Play_controls[key].icons +
            '" ></i></div></div><div id="controls_button_text_' + key +
            '" class="extra_button_text_holder" style="opacity: 0;;"><div id="extra_button_text' +
            key + '" class="extra_button_text strokedeline" >' +
            Play_controls[key].string + '</div><div id="extra_button_' + key +
            '" class="extra_button_text strokedeline" >' +
            (Play_controls[key].values ? Play_SetControlsArrows(key) : STR_SPACE) + '</div></div></div>';

        doc.appendChild(div);
        Play_controlsSize++;
        Play_controls[key].position = key;

        Play_controls[key].visible = true;
        Play_controls[key].doc = div;
        Play_controls[key].doc_name = Main_getElementById('controls_name_' + key);
        Play_controls[key].doc_up = Main_getElementById('control_arrow_up_' + key);
        Play_controls[key].doc_down = Main_getElementById('control_arrow_down' + key);
        Play_controls[key].button = Main_getElementById('controls_button_' + key);
        Play_controls[key].button_text = Main_getElementById('controls_button_text_' + key);

        if (Play_controls[key].bottomArrows) Play_BottomArrows(key);
        if (Play_controls[key].setLable) Play_controls[key].setLable();
    }
}

function Play_SetControlsArrows(key) {
    return '<div id="controls_arrows_' + key +
        '" style="font-size: 50%; display: inline-block; vertical-align: middle;"><div style="display: inline-block;"><div id="control_arrow_up_' +
        key + '" class="up"></div><div id="control_arrow_down' + key +
        '" class="down"></div></div></div>&nbsp;<div id="controls_name_' + key +
        '" class="arrows_text">' + Play_controls[key].values[Play_controls[key].defaultValue] + '</div>';
}

function Play_showVodDialog(isFromVod) {
    Main_clearTimeout(Play_HideVodDialogId);
    Main_textContent("dialog_vod_text", isFromVod ? STR_VOD_HISTORY : STR_VOD_HISTORY_FORM_LIVE);
    Main_HideElementWithEle(Play_Controls_Holder);
    PlayVod_showPanel(false);
    Main_textContent('stream_quality', '');
    Main_innerHTML("dialog_vod_saved_text", STR_FROM + Play_timeMs(PlayVod_VodOffset * 1000));
    Main_ShowElement('dialog_vod_start');
}

function Play_SetAudioIcon() {
    if (Play_controlsAudioPos === 2) {
        Main_innerHTML("chat_container_sound_icon0", '<i class="icon-volume strokicon" ></i>');
        Main_innerHTML("chat_container_sound_icon1", '<i class="icon-volume strokicon" ></i>');

        Main_innerHTML("stream_info_pp_audio_0", STR_SPACE + '<i class="icon-volume strokicon" ></i>');
        Main_innerHTML("stream_info_pp_audio_1", STR_SPACE + '<i class="icon-volume strokicon" ></i>');
    } else if (Play_controlsAudioPos === 1) {
        Main_innerHTML("chat_container_sound_icon0", '<i class="icon-volume strokicon" ></i>');
        Main_innerHTML("chat_container_sound_icon1", '<i class="icon-mute strokicon" ></i>');

        Main_innerHTML("stream_info_pp_audio_0", STR_SPACE + '<i class="icon-volume strokicon" ></i>');
        Main_innerHTML("stream_info_pp_audio_1", STR_SPACE + '<i class="icon-mute strokicon" ></i>');
    } else {
        Main_innerHTML("chat_container_sound_icon0", '<i class="icon-mute strokicon" ></i>');
        Main_innerHTML("chat_container_sound_icon1", '<i class="icon-volume strokicon" ></i>');

        Main_innerHTML("stream_info_pp_audio_0", STR_SPACE + '<i class="icon-mute strokicon" ></i>');
        Main_innerHTML("stream_info_pp_audio_1", STR_SPACE + '<i class="icon-volume strokicon" ></i>');
    }
}

function Play_SetAudioMultiIcon() {
    var extraText = Play_Multi_MainBig ? 'big' : '',
        audioPos = Play_controls[Play_controlsAudioMulti].defaultValue,
        i;

    if (audioPos === 4) {
        for (i = 0; i < 4; i++)
            Main_innerHTML("stream_info_multi_audio_" + extraText + i, STR_SPACE + '<i class="icon-volume strokicon" ></i>');
    } else {
        for (i = 0; i < 4; i++)
            Main_innerHTML("stream_info_multi_audio_" + extraText + i, STR_SPACE + '<i class="icon-mute strokicon" ></i>');

        audioPos = (audioPos + (4 - Play_Multi_Offset)) % 4;
        Main_innerHTML("stream_info_multi_audio_" + extraText + audioPos, STR_SPACE + '<i class="icon-volume strokicon" ></i>');
    }
}

var Play_BottonIcons_Pause;
var Play_BottonIcons_Next;
var Play_BottonIcons_Back;
var Play_BottonIcons_Progress;
var Play_BottonIcons_Next_Img_holder;
var Play_BottonIcons_End_img_holder;
var Play_BottonIcons_Next_img;
var Play_BottonIcons_Back_img;
var Play_BottonIcons_End_img;
var Play_BottonIcons_Progress_Steps;
var Play_BottonIcons_Progress_JumpTo;
var Play_BottonIcons_Focus_Class = 'progress_bar_div_focus';

var Play_BottonIcons_Next_name;
var Play_BottonIcons_Next_title;

var Play_BottonIcons_Back_name;
var Play_BottonIcons_Back_title;

var Play_BottonIcons_End_name;
var Play_BottonIcons_End_title;

var Play_Controls_Holder;

function Play_BottonIconsSet() {

    Play_BottonIcons_Next_img = Main_getElementById('next_button_img');
    Play_BottonIcons_Back_img = Main_getElementById('back_button_img');
    Play_BottonIcons_End_img = Main_getElementById('end_button_img');

    Play_BottonIcons_Next_name = Main_getElementById('next_button_text_name');
    Play_BottonIcons_Next_title = Main_getElementById('next_button_text_title');

    Play_BottonIcons_Back_name = Main_getElementById('back_button_text_name');
    Play_BottonIcons_Back_title = Main_getElementById('back_button_text_title');

    Play_BottonIcons_End_name = Main_getElementById('end_next_button_text_name');
    Play_BottonIcons_End_title = Main_getElementById('end_next_button_text_title');

    Play_BottonIcons_Pause = Main_getElementById('pause_button');
    Play_BottonIcons_Next = Main_getElementById('next_button');
    Play_BottonIcons_Back = Main_getElementById('back_button');
    PlayClip_HideShowNextDiv = [Play_BottonIcons_Next, Play_BottonIcons_Back];
    Play_BottonIcons_Progress = Main_getElementById('progress_bar_div');
    Play_BottonIcons_Next_Img_holder = Main_getElementById('next_button_img_holder');
    Play_BottonIcons_End_img_holder = Main_getElementById('back_button_img_holder');
    Play_BottonIcons_Progress_Steps = Main_getElementById('progress_bar_steps');
    Play_BottonIcons_Progress_JumpTo = Main_getElementById('progress_bar_jump_to');

    Play_Controls_Holder = Main_getElementById('controls_holder');
}

function Play_BottonIconsResetFocus() {
    PlayVod_PanelY = 1;
    PlayClip_EnterPos = 0;
    Play_BottonIconsFocus();
}

function Play_BottonIconsFocus() {

    if (PlayVod_PanelY < 0) {
        PlayVod_PanelY = 0;
        return;
    }

    Main_RemoveClassWithEle(Play_BottonIcons_Pause, Play_BottonIcons_Focus_Class);
    Main_RemoveClassWithEle(Play_BottonIcons_Next, Play_BottonIcons_Focus_Class);
    Main_RemoveClassWithEle(Play_BottonIcons_Back, Play_BottonIcons_Focus_Class);
    Main_RemoveClassWithEle(Play_BottonIcons_Progress, Play_BottonIcons_Focus_Class);
    Main_HideElementWithEle(Play_BottonIcons_Next_Img_holder);
    Main_HideElementWithEle(Play_BottonIcons_End_img_holder);

    if (!PlayVod_PanelY) { //progress_bar

        Main_AddClassWitEle(Play_BottonIcons_Progress, Play_BottonIcons_Focus_Class);
        Play_IconsRemoveFocus();

        if (PlayVod_addToJump) {

            PlayVod_jumpTime();
            Play_BottonIcons_Progress_Steps.style.display = 'inline-block';

        }

    } else if (PlayVod_PanelY === 1) { //pause/next/back buttons

        if (!PlayClip_EnterPos) { //pause

            Main_AddClassWitEle(Play_BottonIcons_Pause, Play_BottonIcons_Focus_Class);

        } else if (PlayClip_EnterPos === 1) { //next

            Main_ShowElementWithEle(Play_BottonIcons_Next_Img_holder);
            Main_AddClassWitEle(Play_BottonIcons_Next, Play_BottonIcons_Focus_Class);

        } else if (PlayClip_EnterPos === -1) { //back

            Main_ShowElementWithEle(Play_BottonIcons_End_img_holder);
            Main_AddClassWitEle(Play_BottonIcons_Back, Play_BottonIcons_Focus_Class);

        }

        Play_IconsRemoveFocus();
        Main_innerHTMLWithEle(Play_BottonIcons_Progress_JumpTo, STR_SPACE);
        Play_BottonIcons_Progress_Steps.style.display = 'none';

    } else if (PlayVod_PanelY === 2) { //botton icons

        Play_IconsAddFocus();
        Main_innerHTMLWithEle(Play_BottonIcons_Progress_JumpTo, STR_SPACE);
        Play_BottonIcons_Progress_Steps.style.display = 'none';

    }
}