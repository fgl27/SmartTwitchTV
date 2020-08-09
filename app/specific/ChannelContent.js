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
var ChannelContent_cursorY = 0;
var ChannelContent_cursorX = 0;
var ChannelContent_dataEnded = false;
var ChannelContent_itemsCount = 0;
var ChannelContent_loadingDataTry = 0;
var ChannelContent_itemsCountOffset = 0;
var ChannelContent_isoffline = false;
var ChannelContent_UserChannels = false;
var ChannelContent_TargetId;
var ChannelContent_status = false;
var ChannelContent_lastselectedChannel = '';
var ChannelContent_responseText = null;
var ChannelContent_selectedChannelViews = '';
var ChannelContent_selectedChannelFollower = '';
var ChannelContent_description = '';
var ChannelContent_ChannelValue = {};
var ChannelContent_ChannelValueIsset = false;
var ChannelContent_offline_image = null;
var ChannelContent_profile_banner = '';
var ChannelContent_KeyEnterID;
var ChannelContent_clear = false;
//Variable initialization end

function ChannelContent_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_ChannelContent;
    if (ChannelContent_ChannelValueIsset && !Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
    if (ChannelContent_lastselectedChannel !== Main_values.Main_selectedChannel) ChannelContent_status = false;
    Main_cleanTopLabel();
    Main_innerHTML("label_last_refresh", '');
    if (Main_isScene1DocShown()) Main_addEventListener("keydown", ChannelContent_handleKeyDown);
    AddCode_PlayRequest = false;

    Main_innerHTML('top_lable', Main_values.Main_selectedChannelDisplayname);

    if (Main_values.Main_BeforeChannel === Main_UserChannels || Main_values.My_channel) {
        Sidepannel_Sidepannel_Pos = Main_values.My_channel ? 8 : 7;
        Sidepannel_SetUserLables();
        Sidepannel_SetTopOpacity(Main_values.Main_Go);
    }

    if (Main_CheckAccessibilityVisible()) Main_CheckAccessibilitySet();
    else if (ChannelContent_status) {
        Main_YRst(ChannelContent_cursorY);
        Main_ShowElement('channel_content_scroll');
        ChannelContent_checkUser();
        ChannelContent_removeAllFollowFocus();
        ChannelContent_addFocus();
        Main_SaveValues();
        Main_EventScreen('ChannelContent');
    } else ChannelContent_StartLoad();
}

function ChannelContent_exit() {
    Main_RestoreTopLabel();
    Main_removeEventListener("keydown", ChannelContent_handleKeyDown);
    Main_HideElement('channel_content_scroll');
    Main_values.My_channel = false;
    ChannelContent_removeFocus();
}

function ChannelContent_StartLoad() {
    ScreensObj_SetTopLable(Main_values.Main_selectedChannelDisplayname);
    Main_innerHTML("label_last_refresh", '');
    Main_HideElement('channel_content_scroll');
    ChannelContent_offline_image = null;
    Main_showLoadDialog();
    Main_HideWarningDialog();
    ChannelContent_lastselectedChannel = Main_values.Main_selectedChannel;
    ChannelContent_status = false;
    ChannelContent_isoffline = false;
    ChannelContent_itemsCountOffset = 0;
    ChannelContent_itemsCount = 0;
    ChannelContent_cursorX = 0;
    ChannelContent_cursorY = 0;
    ChannelContent_dataEnded = false;
    ChannelContent_TargetId = undefined;
    ChannelContent_loadDataPrepare();
    ChannelContent_loadDataRequest();
    Main_EventScreen('ChannelContent');
}

function ChannelContent_loadDataPrepare() {
    Main_FirstLoad = true;
    ChannelContent_loadingDataTry = 0;
}

function ChannelContent_loadDataRequest() {
    var theUrl = Main_kraken_api + 'streams/?stream_type=all&channel=' +
        encodeURIComponent(ChannelContent_TargetId !== undefined ? ChannelContent_TargetId : Main_values.Main_selectedChannel_id) +
        Main_TwithcV5Flag;

    BasexmlHttpGet(
        theUrl,
        (DefaultHttpGetTimeout * 2) + (ChannelContent_loadingDataTry * DefaultHttpGetTimeoutPlus),
        2,
        null,
        ChannelContent_loadDataRequestSuccess,
        ChannelContent_loadDataError
    );
}

function ChannelContent_loadDataRequestSuccess(response) {
    var obj = JSON.parse(response);
    if (obj.streams && obj.streams.length) {
        ChannelContent_responseText = obj.streams;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    } else if (Main_IsOn_OSInterface && !ChannelContent_TargetId) {
        ChannelContent_loadDataPrepare();
        ChannelContent_loadDataCheckHost();
    } else {
        ChannelContent_responseText = null;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    }
}

function ChannelContent_loadDataError() {
    ChannelContent_loadingDataTry++;
    if (ChannelContent_loadingDataTry < DefaultHttpGetReTryMax) {
        ChannelContent_loadDataRequest();
    } else {
        ChannelContent_responseText = null;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    }
}

function ChannelContent_loadDataCheckHost() {
    var theUrl = ChatLive_Base_chat_url + 'hosts?include_logins=1&host=' + encodeURIComponent(Main_values.Main_selectedChannel_id);

    //TODO replace all '[]' with null for performance after some app updates
    OSInterface_GetMethodUrlHeadersAsync(
        theUrl,//urlString
        DefaultHttpGetTimeout + (ChannelContent_loadingDataTry * DefaultHttpGetTimeoutPlus),//timeout
        null,//postMessage, null for get
        null,//Method, null for get
        '[]',//JsonString
        'ChannelContent_CheckHostResult',//callback
        0,//checkResult
        0,//key
        3//thread
    );

}

function ChannelContent_CheckHostResult(result) {
    if (result) {
        var resultObj = JSON.parse(result);
        if (resultObj.status === 200) {
            ChannelContent_CheckHost(resultObj.responseText);
        } else {
            ChannelContent_loadDataCheckHostError();
        }
    }
    else ChannelContent_loadDataCheckHostError();
}

function ChannelContent_loadDataCheckHostError() {
    ChannelContent_responseText = null;
    ChannelContent_loadDataPrepare();
    ChannelContent_GetStreamerInfo();
}

function ChannelContent_CheckHost(responseText) {
    var response = JSON.parse(responseText);
    ChannelContent_TargetId = response.hosts[0].target_id;

    if (ChannelContent_TargetId !== undefined) {
        ChannelContent_loadDataPrepare();
        ChannelContent_loadDataRequest();
    } else {
        ChannelContent_responseText = null;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    }
}

function ChannelContent_GetStreamerInfo() {
    var theUrl = Main_kraken_api + 'channels/' + Main_values.Main_selectedChannel_id + Main_TwithcV5Flag_I;

    BasexmlHttpGet(theUrl, (DefaultHttpGetTimeout * 2) + (ChannelContent_loadingDataTry * DefaultHttpGetTimeoutPlus), 2, null, ChannelContent_GetStreamerInfoSuccess, ChannelContent_GetStreamerInfoError);
}

function ChannelContent_GetStreamerInfoSuccess(responseText) {
    var channel = JSON.parse(responseText);
    ChannelContent_offline_image = channel.video_banner;
    ChannelContent_offline_image = ChannelContent_offline_image ? ChannelContent_offline_image.replace("1920x1080", Main_VideoSize) : ChannelContent_offline_image;
    ChannelContent_profile_banner = channel.profile_banner ? channel.profile_banner : IMG_404_BANNER;
    ChannelContent_selectedChannelViews = channel.views;
    ChannelContent_selectedChannelFollower = channel.followers;
    ChannelContent_description = channel.description;
    Main_values.Main_selectedChannelLogo = channel.logo;
    Main_values.Main_selectedChannelPartner = channel.partner;

    ChannelContent_loadDataSuccess();
}

function ChannelContent_GetStreamerInfoError() {
    ChannelContent_loadingDataTry++;
    if (ChannelContent_loadingDataTry < DefaultHttpGetReTryMax) {
        ChannelContent_GetStreamerInfo();
    } else {
        ChannelContent_offline_image = null;
        ChannelContent_profile_banner = IMG_404_BANNER;
        ChannelContent_selectedChannelViews = '';
        ChannelContent_selectedChannelFollower = '';
        ChannelContent_description = '';
        Main_values.Main_selectedChannelLogo = IMG_404_LOGO;
        ChannelContent_loadDataSuccess();
    }
}

function ChannelContent_setFollow() {
    if (AddCode_IsFollowing) Main_innerHTML("channel_content_titley_2", '<i class="icon-heart" style="color: #6441a4; font-size: 100%;"></i>' + STR_SPACE + STR_SPACE + STR_FOLLOWING);
    else Main_innerHTML("channel_content_titley_2", '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; "></i>' + STR_SPACE + STR_SPACE + (AddUser_UserIsSet() ? STR_FOLLOW : STR_NOKEY));
}

function ChannelContent_loadDataSuccess() {
    Main_innerHTML("channel_content_thumbdiv0_1",
        '<img class="stream_img_channel_logo" alt="" src="' +
        Main_values.Main_selectedChannelLogo.replace("300x300", '600x600') +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';">');

    Main_innerHTML("channel_content_img0_1",
        '<img class="stream_img_channel" alt="" src="' +
        ChannelContent_profile_banner +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_BANNER + '\';">');

    var streamer_bio = Main_values.Main_selectedChannelDisplayname;

    streamer_bio += (Main_values.Main_selectedChannelPartner ? STR_SPACE + STR_SPACE + '<img style="display: inline-block; width: 2ch; vertical-align: middle;" alt="" src="' + IMG_PARTNER + '">' : "");

    streamer_bio += ChannelContent_selectedChannelViews !== '' ?
        STR_BR + Main_addCommas(ChannelContent_selectedChannelViews) + STR_VIEWS : '';

    streamer_bio += ChannelContent_selectedChannelFollower !== '' ?
        STR_BR + Main_addCommas(ChannelContent_selectedChannelFollower) + STR_FOLLOWERS : '';

    streamer_bio += ChannelContent_description !== '' ?
        STR_BR + STR_BR + STR_ABOUT + ':' + STR_BR + twemoji.parse(ChannelContent_description) : '';

    Main_innerHTML("channel_content_infodiv0_1", streamer_bio);

    if (ChannelContent_responseText) {

        var stream = ChannelContent_responseText[0];

        if (ChannelContent_TargetId !== undefined) {
            stream.channel.display_name = Main_values.Main_selectedChannelDisplayname +
                STR_USER_HOSTING + stream.channel.display_name;
        }

        ChannelContent_createCell(ScreensObj_LiveCellArray(stream));

        ChannelContent_cursorX = 1;
    } else ChannelContent_createCellOffline();

    ChannelContent_loadDataSuccessFinish();
}

function ChannelContent_createCell(valuesArray) {

    var ishosting = ChannelContent_TargetId !== undefined;

    Main_getElementById('channel_content_cell0_1').setAttribute(Main_DataAttribute, JSON.stringify(valuesArray));

    Main_innerHTML("channel_content_thumbdiv0_0", '<div class="stream_thumbnail_live_img"><img id="channel_content_cell0_1_img" class="stream_img" alt="" src="' + valuesArray[0].replace("{width}x{height}", Main_VideoSize) + Main_randomimg +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_VIDEO +
        '\';"></div><div class="stream_thumbnail_live_text_holder"><div class="stream_text_holder"><div id="channel_content_cell0_3" style="line-height: 1.6ch;"><div class="stream_info_live_name" style="width:' + (ishosting ? 99 : 66) + '%; display: inline-block;">' +
        '<i class="icon-' + (valuesArray[8] ? 'refresh' : 'circle') + ' live_icon strokedeline" style="color: ' +
        (valuesArray[8] ? '#FFFFFF' : ishosting ? '#FED000' : 'red') +
        ';"></i> ' + valuesArray[1] + '</div><div class="stream_info_live" style="width:' +
        (ishosting ? 0 : 33) + '%; float: right; text-align: right; display: inline-block;">' +
        (ishosting ? '' : valuesArray[5]) + '</div></div>' +
        '<div class="stream_info_live_title">' + twemoji.parse(valuesArray[2]) + '</div>' +
        '<div id="channel_content_cell0_5" class="stream_info_live">' +
        (valuesArray[3] !== "" ? STR_PLAYING + valuesArray[3] : "") +
        '</div>' + '<div class="stream_info_live">' +
        valuesArray[11] + valuesArray[4] + '</div></div></div>');
}

function ChannelContent_createCellOffline() {
    ChannelContent_isoffline = true;
    Main_innerHTML("channel_content_thumbdiv0_0", '<div class="stream_thumbnail_live_img"><img id="channel_content_cell0_1_img" class="stream_img" alt="" src="' +
        (ChannelContent_offline_image ? (ChannelContent_offline_image + Main_randomimg) : IMG_404_VIDEO) +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_VIDEO +
        '\';"></div><div class="stream_thumbnail_live_text_holder"><div class="stream_text_holder" style="font-size: 140%;"><div style="line-height: 1.6ch;"><div class="stream_info_live_name" style="width:99%; display: inline-block;">' +
        Main_values.Main_selectedChannelDisplayname + '</div><div class="stream_info_live" style="width:0%; float: right; text-align: right; display: inline-block;"></div></div>' +
        '<div class="stream_info_live">' + STR_CH_IS_OFFLINE +
        '</div><div class="stream_info_live_title">' + STR_OPEN_CHAT + '</div></div>' +
        '</div>');
}

function ChannelContent_loadDataSuccessFinish() {
    if (!ChannelContent_status) {
        ChannelContent_status = true;
        Main_ShowElement('channel_content_scroll');
        ChannelContent_cursorY = 1;
        ChannelContent_addFocus();
        Main_HideLoadDialog();
        Main_SaveValues();
    }
    ChannelContent_checkUser();
    Main_FirstLoad = false;
    if (Main_FirstRun) Screens_loadDataSuccessFinishEnd();
}

function ChannelContent_checkUser() {
    if (ChannelContent_UserChannels) ChannelContent_setFollow();
    else if (AddUser_UserIsSet()) {
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
        AddCode_PlayRequest = false;
        AddCode_CheckFollow();
    } else {
        AddCode_IsFollowing = false;
        ChannelContent_setFollow();
    }
}

function ChannelContent_addFocus() {
    if (ChannelContent_cursorY) {
        Main_AddClass('channel_content_thumbdiv0_0', Main_classThumb);
        ChannelContent_LoadPreview();
    } else ChannelContent_addFocusFollow();
}

function ChannelContent_addFocusFollow() {
    Main_AddClass('channel_content_thumbdivy_' + ChannelContent_cursorX, 'stream_switch_focused');
}

function ChannelContent_removeFocus() {
    if (ChannelContent_cursorY) {
        Main_RemoveClass("channel_content_thumbdiv0_0", Main_classThumb);
        Sidepannel_CheckIfIsLiveSTop();
        Main_RemoveClass('channel_content_cell0_1_img', 'visibility_hidden');
    } else Main_RemoveClass('channel_content_thumbdivy_' + ChannelContent_cursorX, 'stream_switch_focused');
}

function ChannelContent_removeAllFollowFocus() {
    Main_RemoveClass('channel_content_thumbdivy_0', 'stream_switch_focused');
    Main_RemoveClass('channel_content_thumbdivy_1', 'stream_switch_focused');
    Main_RemoveClass('channel_content_thumbdivy_2', 'stream_switch_focused');
}

function ChannelContent_keyEnter() {
    if (!ChannelContent_cursorY) {
        if (!ChannelContent_cursorX) {
            Main_removeEventListener("keydown", ChannelContent_handleKeyDown);
            Main_HideElement('channel_content_scroll');
            ChannelContent_removeFocus();
            Main_ready(function() {
                Screens_init(Main_ChannelVod);
            });
        } else if (ChannelContent_cursorX === 1) {
            Main_removeEventListener("keydown", ChannelContent_handleKeyDown);
            Main_HideElement('channel_content_scroll');
            ChannelContent_removeFocus();
            Main_ready(function() {
                Screens_init(Main_ChannelClip);
            });
        } else if (ChannelContent_cursorX === 2) {
            if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
                AddCode_PlayRequest = false;
                AddCode_Channel_id = Main_values.Main_selectedChannel_id;
                if (AddCode_IsFollowing) AddCode_UnFollow();
                else AddCode_Follow();
            } else {
                Main_showWarningDialog(STR_NOKEY_WARN, 2000);
            }
        }
    } else {
        Main_removeEventListener("keydown", ChannelContent_handleKeyDown);
        Main_HideElement('channel_content_scroll');

        if (ChannelContent_isoffline) {

            Play_data.data = [
                null,//0
                Main_values.Main_selectedChannelDisplayname,//1
                STR_SPACE,//2
                '',//3
                '',//4
                '',//5
                Main_values.Main_selectedChannel,//6
                '',//7 broadcast id
                false,//8
                Main_values.Main_selectedChannelLogo,//9
                Main_values.Main_selectedChannelPartner,//10
                '',//11
                0,//12
                0,//13
                Main_values.Main_selectedChannel_id//14
            ];
            Play_data.isHost = false;
            Main_values.Play_isHost = false;

            Main_hideScene1Doc();
            Main_addEventListener("keydown", Play_handleKeyDown);
            Main_showScene2Doc();
            Play_hidePanel();
            Play_Start(true);

            Main_EventPlay(
                'offline',
                Main_values.Main_selectedChannelDisplayname,
                'offline',
                'offline',
                'ChannelContent'
            );

        } else {

            Main_values_Play_data = JSON.parse(Main_getElementById('channel_content_cell0_1').getAttribute(Main_DataAttribute));

            Play_data.data = Main_values_Play_data;
            Main_values.Play_isHost = Main_A_includes_B(Play_data.data[1], STR_USER_HOSTING);

            if (Main_values.Play_isHost) {
                Play_data.DisplaynameHost = Play_data.data[1];
                Play_data.data[1] = Play_data.DisplaynameHost.split(STR_USER_HOSTING)[1];
                Play_data.data[14] = ChannelContent_TargetId;
            } else Play_data.data[14] = Main_values.Main_selectedChannel_id;

            Main_openStream();

            Main_EventPlay(
                'live',
                Main_values_Play_data[6],
                Main_values_Play_data[3],
                Main_values_Play_data[15],
                'ChannelContent'
            );
        }
    }
}

function ChannelContent_SetChannelValue() {
    ChannelContent_ChannelValue = {
        "Main_values.Main_selectedChannel_id": Main_values.Main_selectedChannel_id,
        "Main_values.Main_selectedChannelLogo": Main_values.Main_selectedChannelLogo,
        "Main_values.Main_selectedChannel": Main_values.Main_selectedChannel,
        "Main_values.Main_selectedChannelDisplayname": Main_values.Main_selectedChannelDisplayname,
        "ChannelContent_UserChannels": ChannelContent_UserChannels,
        "Main_values.Main_BeforeChannel": Main_values.Main_BeforeChannel
    };
}

function ChannelContent_RestoreChannelValue() {
    Main_values.Main_selectedChannel_id = Main_values.Main_selectedChannel_id;
    Main_values.Main_selectedChannelLogo = Main_values.Main_selectedChannelLogo;
    Main_values.Main_selectedChannel = Main_values.Main_selectedChannel;
    Main_values.Main_selectedChannelDisplayname = Main_values.Main_selectedChannelDisplayname;
    ChannelContent_UserChannels = ChannelContent_ChannelValue.ChannelContent_UserChannels;
    Main_values.Main_BeforeChannel = Main_values.Main_BeforeChannel;
    ChannelContent_ChannelValue = {};
    ChannelContent_ChannelValueIsset = false;
}

function ChannelContent_handleKeyUp(e) {
    if (e.keyCode === KEY_ENTER) {
        ChannelContent_handleKeyUpClear();
        if (!ChannelContent_clear) ChannelContent_keyEnter();
    }
}

function ChannelContent_handleKeyUpClear() {
    Main_clearTimeout(ChannelContent_KeyEnterID);
    Main_removeEventListener("keyup", ChannelContent_handleKeyUp);
    Main_addEventListener("keydown", ChannelContent_handleKeyDown);
}

function ChannelContent_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;

    Main_keyClickDelayStart();

    switch (event.keyCode) {
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                ChannelContent_removeFocus();
                Main_removeEventListener("keydown", ChannelContent_handleKeyDown);
                Main_values.Main_Go = Main_values.Main_BeforeChannel;
                Main_values.Main_BeforeChannel = Main_Live;
                ChannelContent_exit();
                Sidepannel_SetDefaultLables();
                Main_values.Main_selectedChannel_id = '';
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (!ChannelContent_cursorY && ChannelContent_cursorX) {
                ChannelContent_removeFocus();
                ChannelContent_cursorX--;
                if (ChannelContent_cursorX < 0) ChannelContent_cursorX = 2;
                ChannelContent_addFocus();
            } else {
                ChannelContent_removeFocus();
                Sidepannel_Start(ChannelContent_handleKeyDown);
            }
            break;
        case KEY_RIGHT:
            if (!ChannelContent_cursorY) {
                ChannelContent_removeFocus();
                ChannelContent_cursorX++;
                if (ChannelContent_cursorX > 2) ChannelContent_cursorX = 0;
                ChannelContent_addFocus();
            }
            break;
        case KEY_UP:
            if (!ChannelContent_cursorY) {
                ChannelContent_removeFocus();
                ChannelContent_cursorY = 1;
                ChannelContent_addFocus();
            } else {
                ChannelContent_removeFocus();
                ChannelContent_cursorY = 0;
                ChannelContent_addFocus();
            }
            break;
        case KEY_DOWN:
            if (!ChannelContent_cursorY) {
                ChannelContent_removeFocus();
                ChannelContent_cursorY = 1;
                ChannelContent_addFocus();
            } else {
                ChannelContent_removeFocus();
                ChannelContent_cursorY = 0;
                ChannelContent_addFocus();
            }
            break;
        case KEY_PAUSE://key s
        case KEY_6:
            ChannelContent_removeFocus();
            Main_showSettings();
            break;
        case KEY_PLAY:
        case KEY_PLAYPAUSE:
        case KEY_KEYBOARD_SPACE:
            ChannelContent_keyEnter();
            break;
        case KEY_ENTER:
            Main_removeEventListener("keydown", ChannelContent_handleKeyDown);
            Main_addEventListener("keyup", ChannelContent_handleKeyUp);
            ChannelContent_clear = false;
            ChannelContent_KeyEnterID = Main_setTimeout(
                Main_ReloadScreen,
                Screens_KeyUptimeout,
                ChannelContent_KeyEnterID
            );
            break;
        case KEY_REFRESH:
            Main_ReloadScreen();
            break;
        case KEY_CHAT:
            ChannelContent_removeFocus();
            Sidepannel_Start(ChannelContent_handleKeyDown, AddUser_UserIsSet());
            if (!AddUser_UserIsSet()) {
                Main_showWarningDialog(STR_NOKUSER_WARN, 2000);
            }
            break;
        default:
            break;
    }
}


function ChannelContent_LoadPreview() {
    if (!ChannelContent_isoffline && Main_isScene1DocShown() &&
        (!Sidepannel_isShowing() && !Sidepannel_MainisShowing()) && !Settings_isVisible()) {

        if (!Main_isStoped && Settings_Obj_default('show_live_player')) {

            var doc = Main_getElementById('channel_content_cell0_1');

            if (doc) {

                var obj = JSON.parse(doc.getAttribute(Main_DataAttribute));

                if ((!Play_PreviewId || !Main_A_equals_B(obj[14], Play_PreviewId)) && !Play_PreviewVideoEnded) {

                    ChannelContent_LoadPreviewStart(obj);

                } else if (Play_PreviewId) {

                    ChannelContent_LoadPreviewRestore();

                }

                Play_PreviewVideoEnded = false;
            }

        }

    }
}

function ChannelContent_LoadPreviewRestore() {

    var img = Main_getElementById('channel_content_cell0_1_img');
    var Rect = img.parentElement.getBoundingClientRect();

    OSInterface_ScreenPlayerRestore(
        Rect.bottom,
        Rect.right,
        Rect.left,
        window.innerHeight,
        4
    );

    Main_AddClassWitEle(img, 'visibility_hidden');
}

function ChannelContent_LoadPreviewStart(obj) {
    Play_CheckIfIsLiveCleanEnd();

    if (!Main_IsOn_OSInterface) {
        return;
    }

    try {

        OSInterface_CheckIfIsLiveFeed(
            Play_live_token.replace('%x', obj[6]),
            Play_live_links.replace('%x', obj[6]),
            Settings_Obj_values("show_feed_player_delay"),
            "ChannelContent_LoadPreviewResult",
            Main_ChannelContent,
            0,
            DefaultHttpGetReTryMax,
            DefaultHttpGetTimeout
        );

    } catch (e) {
        Play_CheckIfIsLiveCleanEnd();
    }
}

function ChannelContent_LoadPreviewResult(StreamData, x) {//Called by Java

    var doc = Main_getElementById('channel_content_cell0_1');

    if (!Main_isStoped && Main_values.Main_Go === Main_ChannelContent && Main_isScene1DocShown() &&
        !Main_isElementShowing('dialog_thumb_opt') &&
        (!Sidepannel_isShowing() && !Sidepannel_MainisShowing()) && !Settings_isVisible() &&
        x === Main_values.Main_Go && doc &&
        Main_A_includes_B(Main_getElementById('channel_content_thumbdiv0_0').className, 'stream_thumbnail_focused')) {

        if (StreamData && doc) {
            StreamData = JSON.parse(StreamData);

            var StreamInfo = JSON.parse(doc.getAttribute(Main_DataAttribute));

            if (StreamData.status === 200) {

                Play_PreviewURL = StreamData.url;
                Play_PreviewResponseText = StreamData.responseText;
                Play_PreviewId = StreamInfo[14];

                var img = Main_getElementById('channel_content_cell0_1_img');
                var Rect = img.parentElement.getBoundingClientRect();

                OSInterface_StartScreensPlayer(
                    Play_PreviewURL,
                    Play_PreviewResponseText,
                    0,
                    Rect.bottom,
                    Rect.right,
                    Rect.left,
                    window.innerHeight,
                    1
                );

                Main_AddClassWitEle(img, 'visibility_hidden');

            } else {

                ChannelContent_LoadPreviewWarn(
                    ((StreamData.status === 1 || StreamData.status === 403) ? STR_FORBIDDEN : STR_LIVE + STR_IS_OFFLINE),
                    4000
                );
            }

        }
    }

}

function ChannelContent_LoadPreviewWarn(ErrorText, time) {
    Sidepannel_CheckIfIsLiveSTop();
    Main_RemoveClass('channel_content_cell0_1_img', 'visibility_hidden');
    Main_showWarningDialog(
        ErrorText,
        time
    );
}

function ChannelContent_RestoreThumb(play_data) {
    if (ChannelContent_isoffline) return false;

    var doc = Main_getElementById('channel_content_cell0_1');

    if (doc && ChannelContent_cursorY) {

        return Main_A_equals_B(
            JSON.parse(doc.getAttribute(Main_DataAttribute))[14],
            play_data.data[14]
        );
    }

    return false;
}

function ChannelContent_Isfocused() {
    return Main_getElementById('channel_content_cell0_1') &&
        Main_values.Main_Go === Main_ChannelContent &&
        ChannelContent_cursorY &&
        Main_isScene1DocShown();
}