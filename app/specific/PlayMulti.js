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

//All multistream related fun are placed here
var Play_MultiArray_length = 4;

function Play_updateStreamInfoMulti(pos) {

    BasexmlHttpGet(
        Main_kraken_api + 'streams/?stream_type=all&channel=' + Play_MultiArray[pos].data[14] + Main_TwithcV5Flag,
        (DefaultHttpGetTimeout * 2),
        2,
        null,
        Play_updateStreamInfoMultiValues,
        Play_updateStreamInfoMultiError,
        pos
    );

}

function Play_updateStreamInfoMultiValues(response, pos) {
    var obj = JSON.parse(response);

    if (obj.streams && obj.streams.length) {

        var tempData = ScreensObj_LiveCellArray(obj.streams[0]);

        //Prevent save the wrong stream data
        if (Play_MultiArray[pos].data.length > 0 && Main_A_equals_B(tempData[14], Play_MultiArray[pos].data[14])) {
            Play_MultiArray[pos].data = tempData;

            if (!pos) {
                Play_controls[Play_controlsChanelCont].setLable(Play_MultiArray[pos].data[1]);
                Play_controls[Play_controlsGameCont].setLable(Play_MultiArray[pos].data[3]);
            }

            Play_MultiUpdateinfo(
                pos,
                obj.streams[0].game,
                obj.streams[0].viewers,
                twemoji.parse(obj.streams[0].channel.status, false, true),
                (Play_Multi_MainBig ? '_big' : '')
            );

            Main_Set_history('live', Play_MultiArray[pos].data);
        }

    }
}

function Play_updateStreamInfoMultiError(pos) {

    if (Play_isOn && Play_MultiEnable && Play_MultiArray[pos].data.length > 0) {

        //we fail but we still watching so update the time
        Main_Set_history('live', Play_MultiArray[pos].data);

    }
}

function Play_Multi_SetPanel() {
    Play_BottomShow(Play_controlsQualityMulti);
    Play_BottomShow(Play_controlsAudioMulti);

    Play_BottomHide(Play_controlsChatSide);
    Play_BottomHide(Play_controlsQuality);
    Play_BottomHide(Play_controlsQualityMini);
    Play_BottomHide(Play_controlsAudio);

    UserLiveFeed_SetMulti();
    ChatLive_Clear(1);
    PlayExtra_HideChat();
    Play_IconsRemoveFocus();
    Play_Panelcounter = Play_MultiStream;
    if (Play_isPanelShowing() && PlayVod_PanelY === 2) Play_IconsAddFocus();
    Main_HideElement('stream_info_pp');
    Main_HideElement('stream_info');
    Main_ShowElement('dialog_multi_help');
    Main_ShowElement('stream_info_multi');
    if (!Play_isFullScreen) Play_ResStoreChatFullScreen();
}

function Play_Multi_UnSetPanelDivs(checkChat) {
    Play_BottomShow(Play_controlsChatSide);
    Play_BottomShow(Play_controlsQuality);

    Play_BottomHide(Play_controlsAudioMulti);
    Play_BottomHide(Play_controlsAudio);
    Play_BottomHide(Play_controlsQualityMini);
    Play_BottomHide(Play_controlsQualityMulti);

    UserLiveFeed_SetFeedPicText();
    Main_ShowElement('stream_info');
    Main_HideElement('stream_info_multi');
    Main_HideElement('stream_info_multi_big');
    Main_HideElement('dialog_multi_help');
    if (checkChat) Play_Multi_UnSetPanelDivsCheckChat();
    Main_SaveValues();
    Play_IconsRemoveFocus();
    Play_Panelcounter = Play_MultiStream;
    if (Play_isPanelShowing() && PlayVod_PanelY === 2) Play_IconsAddFocus();
    if (Play_Multi_MainBig) {
        Play_ResStoreChatPos();
        Play_Multi_MainBig = false;
    }
    Play_controls[Play_controlsQualityMulti].values = STR_QUALITY_MULTI;
    Play_controls[Play_controlsAudioMulti].values = STR_AUDIO_MULTI;
}

function Play_Multi_UnSetPanelDivsCheckChat() {
    if (!Play_isFullScreen) {
        Play_controls[Play_controlsChat].enterKey();
        Play_SetChatSideBySide();
    } else {
        if (!Play_MultiChatBeffore) Play_hideChat();
        else Play_showChat();
    }
}

function Play_Multi_UnSetPanel(shutdown) {

    Play_Multi_UnSetPanelDivs();

    for (var i = 0; i < 4; i++) {

        if (Play_MultiArray[i].data.length > 0) {

            Main_Set_history('live', Play_MultiArray[i].data);

        }

        Play_MultiInfoReset(i);
    }

    if (Play_MultiArray[0].data.length > 0 && Play_MultiArray[1].data.length > 0) {

        if (PlayExtra_PicturePicture) {

            PlayExtra_data = JSON.parse(JSON.stringify(Play_MultiArray[1]));
            PlayExtra_SetPanel();
            OSInterface_mSwitchPlayerAudio(Play_controls[Play_controlsAudio].defaultValue);

            if (!Play_isFullScreen) {
                Main_innerHTML('chat_container_name_text1', STR_SPACE + PlayExtra_data.data[1] + STR_SPACE);
                ChatLive_Init(1);
                PlayExtra_ShowChat();
            }

        }

    } else {

        Play_Multi_UnSetPanelDivsCheckChat();
        if (PlayExtra_PicturePicture) PlayExtra_UnSetPanel();
        PlayExtra_PicturePicture = false;

    }

    Play_Multi_UnSetPanelDivsCheckChat();

    //Check if main player is open if not check if one is so it can be main
    var First = Play_MultiFirstAvailable();

    if (First !== null) {

        var name = Play_data.data[14];
        Play_data = JSON.parse(JSON.stringify(Play_MultiArray[First]));
        var nameChanged = name !== Play_data.data[14];

        if (nameChanged && First) {

            OSInterface_StartAuto(Play_data.AutoUrl, Play_data.playlist, 1, 0, 0);
            Play_UpdateMainStream(true, true);
            Play_MultiUpdateMain();

        } else {

            Play_UpdateMainStream(nameChanged, nameChanged);

        }

    } else if (shutdown) {

        Play_shutdownStream();

    }

    Play_OldAudio = Play_controls[Play_controlsAudio].defaultValue;
}

function Play_MultiFirstAvailable() {
    var i = 0;

    for (i; i < Play_MultiArray_length; i++) {

        if (Play_MultiArray[i].data.length > 0) return i;
    }

    return null;
}

function Play_MultiEnd(position, fail_type) {
    var reason = Play_MultiArray[position].data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE;
    if (fail_type === 1) reason = STR_PLAYER_ERROR + STR_BR + STR_PLAYER_ERROR_MULTI;
    if (fail_type === 2) reason = STR_PLAYER_LAG_ERRO + STR_BR + STR_PLAYER_ERROR_MULTI;

    Play_showWarningMidleDialog(reason, 5000);

    Play_MultiArray[position] = JSON.parse(JSON.stringify(Play_data_base));
    Play_MultiInfoReset(position);

    if (!Play_MultiHasOne()) {

        Play_MultiEnable = false;
        OSInterface_DisableMultiStream();
        Play_Multi_UnSetPanelDivs(true);
        PlayExtra_ClearExtra();
        Play_CheckHostStart();

    } else {

        if (Play_Multi_MainBig && !position) {//If main ended find a new main

            var tempAudio = Play_DefaultAudio_Multi === 4;
            Play_MultiEnableKeyRightLeft(1);
            if (tempAudio) Play_MultiKeyDownHold();

        } else if (Play_DefaultAudio_Multi !== 4 && position === Play_DefaultAudio_Multi) {

            if (Play_MultiArray[0].data.length) {//Set audio to main video if available

                Play_DefaultAudio_Multi = 0;
                Play_controls[Play_controlsAudioMulti].defaultValue = Play_DefaultAudio_Multi;
                Play_controls[Play_controlsAudioMulti].enterKey(false, true);

            } else Play_MultiEnableKeyRightLeft(1);//else find one

        }

    }
}

function Play_MultiFirstClear() {
    var i = 0;

    for (i; i < Play_MultiArray_length; i++) {

        if (Play_MultiArray[i].data.length < 1) return i;

    }
    return 0;
}

function Play_MultiIsAlredyOPen(Id) {
    var i = 0;

    for (i; i < Play_MultiArray_length; i++) {

        if (Play_MultiArray[i].data.length > 0 && Play_MultiArray[i].data[14] === Id) {

            UserLiveFeed_ResetFeedId();
            return true;

        }

    }

    return false;
}

function Play_MultiIsFull() {
    return (Play_MultiArray[0].data.length > 0) &&
        (Play_MultiArray[1].data.length > 0) &&
        (Play_MultiArray[2].data.length > 0) &&
        (Play_MultiArray[3].data.length > 0);
}

function Play_MultiHasOne() {
    return (Play_MultiArray[0].data.length > 0) ||
        (Play_MultiArray[1].data.length > 0) ||
        (Play_MultiArray[2].data.length > 0) ||
        (Play_MultiArray[3].data.length > 0);
}

function Play_MultiStartPrestart(position) {
    var obj = Play_CheckLiveThumb();

    if (obj) {

        position = ((position || position === 0) ? position : Play_MultiFirstClear());

        if (!Play_MultiIsFull()) {

            if (position > 2) Main_HideElement('dialog_multi_help');

        } else {

            Main_HideElement('dialog_multi_help');
            Play_data_old = JSON.parse(JSON.stringify(Play_MultiArray[position]));

        }

        Play_MultiArray[position] = JSON.parse(JSON.stringify(Play_data_base));
        Play_MultiArray[position].data = obj;

        Play_MultiStart(position);

        Main_EventPlay(
            'live',
            Play_MultiArray[position].data[6],
            Play_MultiArray[position].data[3],
            !Main_A_includes_B(Play_MultiArray[position].data[1], STR_USER_HOSTING) ? Play_MultiArray[position].data[15] : 'HOSTING',
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].Screen,
            'MULTI'
        );
    }
}

function Play_MultiStart(pos) {

    if (Play_PreviewId) {

        Play_MultiStartQualitySuccess(
            pos,
            Play_PreviewURL,
            Play_PreviewResponseText,
            true
        );

        return;

    }

    Play_MultiArray[pos].resultId = (new Date().getTime());

    OSInterface_getStreamDataAsync(
        PlayClip_BaseUrl,
        Play_live_links.replace('%x', Play_MultiArray[pos].data[6]),
        'Play_MultiResult',
        Play_MultiArray[pos].resultId,
        pos,
        DefaultHttpGetTimeout,
        false,
        Play_live_token.replace('%x', Play_MultiArray[pos].data[6])
    );

}

function Play_MultiResult(response, pos) {

    if (Play_MultiEnable && Play_isOn && response) {

        var responseObj = JSON.parse(response);

        if (responseObj.checkResult > 0 && responseObj.checkResult === Play_MultiArray[pos].resultId) {

            if (responseObj.status === 200) {

                Play_MultiStartQualitySuccess(pos, responseObj.url, responseObj.responseText);
                return;

            } else if (responseObj.status === 1 || responseObj.status === 403) {

                Play_MultiStartFail(pos, Play_MultiArray[pos].data[1], STR_FORBIDDEN);
                return;

            } else if (responseObj.status === 404) {

                Play_MultiStartFail(pos, Play_MultiArray[pos].data[1]);
                return;

            }

            Play_MultiStartFail(pos, Play_MultiArray[pos].data[1]);
        }

    }
}

function Play_MultiStartFail(pos, display_name, string_fail_reason) {

    Play_showWarningMidleDialog(string_fail_reason ? string_fail_reason : (display_name + ' ' + STR_LIVE + STR_IS_OFFLINE), 2000);
    Play_HideBufferDialog();

    if (Play_OlddataSet()) {
        Play_MultiArray[pos] = JSON.parse(JSON.stringify(Play_data_old));
        Play_data_old = JSON.parse(JSON.stringify(Play_data_base));

    } else {
        Play_MultiArray[pos] = JSON.parse(JSON.stringify(Play_data_base));
        Play_MultiInfoReset(pos);
        if (!Play_MultiHasOne()) {
            Play_MultiEnable = false;
            OSInterface_DisableMultiStream();
            Play_Multi_UnSetPanelDivs(true);
            PlayExtra_ClearExtra();
            Play_CheckHostStart();
        }
    }
}

function Play_MultiStartQualitySuccess(pos, theUrl, playlist, PreventCleanQualities) {

    Play_MultiArray[pos].AutoUrl = theUrl;

    if (Play_MultiIsFull()) {
        UserLiveFeed_Hide(PreventCleanQualities);

        //delay the call to prevent multiple OSInterface call that end in java in a MainThreadHandler.post call
        Main_setTimeout(
            function() {
                if (Play_MultiArray[pos].data.length > 0 && !Main_isStoped && Play_isOn && Play_MultiEnable) OSInterface_StartMultiStream(pos, theUrl, playlist);
            },
            25
        );

    } else OSInterface_StartMultiStream(pos, theUrl, playlist);

    Play_MultiArray[pos].playlist = playlist;

    Play_MultiSetinfo(
        pos,
        Play_MultiArray[pos].data[3],
        Play_MultiArray[pos].data[13],
        Play_MultiArray[pos].data[1],
        Play_MultiArray[pos].data[8],
        Play_MultiArray[pos].data[9],
        twemoji.parse(Play_MultiArray[pos].data[2])
    );

    Play_MultiArray[pos].watching_time = new Date().getTime();
    Main_Set_history('live', Play_MultiArray[pos].data);

    //reset chat and follow icon if pos 0 changed
    if (!pos && Play_data.data[14] !== Play_MultiArray[pos].data[14]) {

        Play_data = JSON.parse(JSON.stringify(Play_MultiArray[pos]));
        Play_MultiUpdateMain();
        Play_SetExternalQualities(Play_extractQualities(Play_data.playlist), 0, Play_data.data[1]);

    }

    Play_updateVodInfo(Play_MultiArray[pos].data[14], Play_MultiArray[pos].data[7], 0);
    Play_data_old = JSON.parse(JSON.stringify(Play_data_base));

    Play_updateStreamInfoMulti(pos);
}

function Play_MultiUpdateMain() {
    ChatLive_Init(0);
    Play_controls[Play_controlsChanelCont].setLable(Play_data.data[1]);
    Play_controls[Play_controlsGameCont].setLable(Play_data.data[3]);
    Play_CheckFollow(Play_data.data[14]);
    Main_SaveValues();
}

var Play_MultiEnableKeyRightLeft_Offset = 0;

function Play_MultiEnableKeyRightLeft(adder) {

    if (Play_Multi_MainBig) {

        Play_SetMultiStreamMainBig(adder);
        Play_MultiEnableKeyRightLeft_Offset += adder;

        if (Play_MultiArray[0].data.length) {

            // === 4 noting changed
            if (Math.abs(Play_MultiEnableKeyRightLeft_Offset) === 4) {
                Play_MultiEnableKeyRightLeft_Offset = 0;

                return;
            }

            if (Play_DefaultAudio_Multi !== 4) Play_DefaultAudio_Multi = 0;
            OSInterface_mSetPlayerAudioMulti(Play_DefaultAudio_Multi);
            Play_ResetAudio();
            Play_SetAudioMultiIcon();

            OSInterface_EnableMultiStream(Play_Multi_MainBig, Play_MultiEnableKeyRightLeft_Offset);

            Play_showWarningMidleDialog(
                STR_MAIN_WINDOW + STR_SPACE + Play_MultiArray[0].data[1],
                2000
            );
            Play_data = JSON.parse(JSON.stringify(Play_MultiArray[0]));
            Play_SetExternalQualities(Play_extractQualities(Play_data.playlist), 0, Play_data.data[1]);
            Play_MultiUpdateinfoMainBig('_big');
            Play_MultiUpdateMain();

        } else {

            Play_MultiEnableKeyRightLeft(adder);

            return;
        }

        Play_MultiEnableKeyRightLeft_Offset = 0;

    } else {

        Play_DefaultAudio_Multi += adder;

        if (Play_DefaultAudio_Multi > (Play_controls[Play_controlsAudioMulti].values.length - 2)) {

            Play_DefaultAudio_Multi = 0;

        } else if (Play_DefaultAudio_Multi < 0) {

            Play_DefaultAudio_Multi = Play_controls[Play_controlsAudioMulti].values.length - 2;

        }

        if (!Play_MultiArray[Play_DefaultAudio_Multi].data.length) {

            Play_MultiEnableKeyRightLeft(adder);
            return;
        }

        Play_controls[Play_controlsAudioMulti].defaultValue = Play_DefaultAudio_Multi;
        Play_controls[Play_controlsAudioMulti].enterKey(false, true);

    }

}

//mirror function to Java SetMultiStreamMainBig
function Play_SetMultiStreamMainBig(offset) {

    if (!offset) return;

    var tempPosition,
        len = Math.abs(offset),
        i, j, j_len = Play_MultiArray_length - 1,
        left = offset > 0;

    for (i = 0; i < len; i++) {

        //https://www.javatpoint.com/java-program-to-left-rotate-the-elements-of-an-array
        if (left) {//if offset = 1 result 1 2 3 0

            //Stores the first element of the array
            tempPosition = Play_MultiArray[0];

            for (j = 0; j < j_len; j++) {
                //Shift element of array by one
                Play_MultiArray[j] = Play_MultiArray[j + 1];
            }
            //First element of array will be added to the end
            Play_MultiArray[j] = tempPosition;

            //https://www.javatpoint.com/java-program-to-right-rotate-the-elements-of-an-array
        } else {// else if offset -1 result 3 0 1 2

            //Stores the last element of array
            tempPosition = Play_MultiArray[3];

            for (j = j_len; j > 0; j--) {
                //Shift element of array by one
                Play_MultiArray[j] = Play_MultiArray[j - 1];
            }
            //Last element of array will be added to the start of array.
            Play_MultiArray[0] = tempPosition;

        }

    }

}

var Play_OldAudio = 0;
var Play_AudioAll = false;
function Play_MultiKeyDownHold(preventShowWarning) {
    Play_EndUpclear = true;

    if (Play_DefaultAudio_Multi !== 4) {
        Play_OldAudio = Play_DefaultAudio_Multi;
        Play_DefaultAudio_Multi = 4;
        Play_controls[Play_controlsAudioMulti].defaultValue = Play_DefaultAudio_Multi;
        Play_controls[Play_controlsAudioMulti].enterKey(preventShowWarning, true);
    } else {
        Play_DefaultAudio_Multi = Play_OldAudio < 4 ? Play_OldAudio : 0;
        Play_OldAudio = Play_DefaultAudio_Multi;
        Play_controls[Play_controlsAudioMulti].defaultValue = Play_DefaultAudio_Multi;
        Play_controls[Play_controlsAudioMulti].enterKey(preventShowWarning, true);
    }
}


function Play_MultiUpdateinfoMainBig(extraText) {
    var i = 0;

    for (i; i < Play_MultiArray_length; i++) {

        if (Play_MultiArray[i].data.length > 0) {

            Main_innerHTML(
                'stream_info_multi_name' + extraText + i,
                Play_partnerIcon(
                    Play_MultiArray[i].data[1],
                    Play_MultiArray[i].data[10],
                    0,
                    Play_MultiArray[i].data[5] ? Play_MultiArray[i].data[5].split(' ')[1] : '',
                    Play_MultiArray[i].data[8]
                )
            );

            Main_getElementById('stream_info_multiimg' + extraText + i).src = Play_MultiArray[i].data[9];

            Play_MultiUpdateinfo(
                i,
                Play_MultiArray[i].data[3],
                Play_MultiArray[i].data[13],
                twemoji.parse(Play_MultiArray[i].data[2]),
                extraText
            );

        } else Play_MultiInfoReset(i);
    }
}

function Play_MultiInfoReset(pos) {
    Play_MultiSetinfo(
        pos,
        '',
        -1,
        '',
        false,
        IMG_404_LOGO,
        STR_MULTI_EMPTY
    );
}

function Play_MultiSetinfo(pos, game, views, displayname, is_rerun, logo, title) {

    Play_MultiArray[pos].isHost = Main_A_includes_B(displayname, STR_USER_HOSTING);

    if (Play_MultiArray[pos].isHost) {
        Play_MultiArray[pos].DisplaynameHost = displayname;
        Play_MultiArray[pos].data[1] = displayname.split(STR_USER_HOSTING)[1];
        displayname = Play_MultiArray[pos].data[1];
    }

    var partner = Play_MultiArray[pos].data[10];
    var lang = Play_MultiArray[pos].data[5] ? Play_MultiArray[pos].data[5].split(' ')[1] : '';

    var extraText = Play_Multi_MainBig ? '_big' : '';
    Main_getElementById('stream_info_multiimg' + extraText + pos).src = logo;

    Main_innerHTML(
        'stream_info_multi_name' + extraText + pos,
        displayname === '' ? STR_SPACE :
            Play_partnerIcon(
                displayname,
                partner,
                0,
                lang,
                is_rerun
            )
    );
    Play_MultiUpdateinfo(pos, game, views, title, extraText);
}

function Play_MultiUpdateinfo(pos, game, views, title, extraText) {
    Main_innerHTML('stream_info_multi_title' + extraText + pos, title);
    Main_innerHTML('stream_info_multi_game' + extraText + pos, game === '' ? STR_SPACE : STR_PLAYING + game);
    Main_innerHTML('stream_info_multi_views' + extraText + pos, (views > 0) ? (STR_SPACE + STR_FOR + Main_addCommas(views) + STR_SPACE + STR_VIEWER) : STR_SPACE);
}

function Play_MultiSetpannelInfo() {
    Main_textContent('stream_dialog_multi_title', STR_REPLACE_MULTI);
    Main_textContent('stream_dialog_multi_end', STR_REPLACE_MULTI_ENTER);
    for (var i = 0; i < 4; i++) {
        Main_innerHTML("stream_info_multiimgholder" + i,
            '<img id="stream_info_multiimg' + i + '" alt="" class="multi_info_img" src="' + IMG_404_BANNER + '"' +
            'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');

        Main_innerHTML("stream_info_multiimgholder_big" + i,
            '<img id="stream_info_multiimg_big' + i + '" alt="" class="multi_info_img_big" src="' + IMG_404_BANNER + '"' +
            'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');

        Main_innerHTML("stream_dialog_multiimgholder_big" + i,
            '<img id="stream_dialog_multiimg_big' + i + '" alt="" class="side_panel_channel_img" src="' + IMG_404_BANNER + '"' +
            'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');

        Main_innerHTML("stream_dialog_multiimgholder" + i,
            '<img id="stream_dialog_multiimg' + i + '" alt="" class="side_panel_channel_img" src="' + IMG_404_BANNER + '"' +
            'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');
    }

    var doc = Main_getElementById('stream_info_multiimg_big0');
    doc.style.width = '16.5%';
    doc.style.marginTop = '-0.5%';

    Main_innerHTML("stream_dialog_multiimgholder-1",
        '<img id="stream_dialog_multiimg-1" alt="" class="side_panel_channel_img" src="' + IMG_404_BANNER + '"' +
        'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');

    Main_innerHTML("stream_info_ppimgholder0",
        '<img id="stream_info_ppimg0" alt="" class="panel_pp_img" src="' + IMG_404_BANNER + '"' +
        'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');

    Main_innerHTML("stream_info_ppimgholder1",
        '<img id="stream_info_ppimg1" alt="" class="panel_pp_img" src="' + IMG_404_BANNER + '"' +
        'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');
}

var Play_MultiDialogPos = 0;
function Play_MultiSetUpdateDialog(obj) {

    var extraText = Play_Multi_MainBig ? '_big' : '';

    for (var i = 0; i < 4; i++) {

        Main_textContent('stream_dialog_multi_name' + extraText + i, Play_MultiArray[i].data[1]);
        Main_getElementById('stream_dialog_multiimg' + extraText + i).src = Play_MultiArray[i].data[9];
        Main_innerHTML('stream_dialog_multi_game' + extraText + i, Play_MultiArray[i].data[3] === '' ? STR_SPACE : Play_MultiArray[i].data[3]);
        Main_innerHTML('stream_dialog_multi_title' + extraText + i, twemoji.parse(Play_MultiArray[i].data[2]));

    }

    Main_textContent('stream_dialog_multi_name-1', (Main_A_includes_B(obj[1], STR_USER_HOSTING) ? obj[1].split(STR_USER_HOSTING)[1] : obj[1]));
    Main_getElementById('stream_dialog_multiimg-1').src = obj[9];
    Main_innerHTML('stream_dialog_multi_game-1', obj[3] === '' ? STR_SPACE : obj[3]);
    Main_innerHTML('stream_dialog_multi_title-1', twemoji.parse(obj[2]));

    UserLiveFeed_Hide(Play_PreviewId);
    Play_MultiDialogPos = 0;
    Play_MultiAddFocus();
    Play_ShowMultiDialog();

}

function Play_MultiAddFocus() {
    Main_AddClass('stream_dialog_multi_div' + (Play_Multi_MainBig ? '_big' : '') + Play_MultiDialogPos, 'side_panel_div_focused');
    Play_setHideMultiDialog();
}

function Play_MultiRemoveFocus() {
    Main_RemoveClass('stream_dialog_multi_div' + (Play_Multi_MainBig ? '_big' : '') + Play_MultiDialogPos, 'side_panel_div_focused');
}

function Play_ShowMultiDialog() {

    if (Play_Multi_MainBig) {
        Main_HideElement('stream_dialog_multi_4');
        Main_ShowElement('stream_dialog_multi_big');
        //doc.style.width = '97%';
        Play_MultiDialogElem.style.setProperty('width', '97%', 'important');
        Play_MultiDialogElem.style.left = '1.5%';
    } else {
        Main_HideElement('stream_dialog_multi_big');
        Main_ShowElement('stream_dialog_multi_4');
        Play_MultiDialogElem.style.width = '';
        Play_MultiDialogElem.style.left = '';
    }

    Main_ShowElementWithEle(Play_MultiDialogElem);
}

function Play_HideMultiDialog(PreventCleanQualities) {
    //return;
    Main_HideElementWithEle(Play_MultiDialogElem);
    Play_clearHideMultiDialog();
    Play_MultiRemoveFocus();
    UserLiveFeed_CheckIfIsLiveSTop(PreventCleanQualities);
}

function Play_MultiDialogVisible() {
    return Main_isElementShowingWithEle(Play_MultiDialogElem);
}

function Play_clearHideMultiDialog() {
    Main_clearTimeout(Play_HideMultiDialogID);
}

var Play_HideMultiDialogID;
function Play_setHideMultiDialog() {
    Play_clearHideMultiDialog();
    Play_HideMultiDialogID = Main_setTimeout(Play_HideMultiDialog, 10000, Play_HideMultiDialogID);
}