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

//Spacing for release maker not trow errors from jshint
var Sidepannel_PosFeed = 0;
var Sidepannel_Sidepannel_Pos = 2;
var Sidepannel_Callback;
var Sidepannel_UpdateThumbDoc;
var Sidepannel_IsMain = true;

var Sidepannel_MoveldefaultMargin = 13.5;
var Sidepannel_FixdefaultMargin = 5;
var Sidepannel_MoveldefaultWidth = Sidepannel_MoveldefaultMargin + Sidepannel_FixdefaultMargin - 1;

var Sidepannel_FixDiv;
var Sidepannel_MovelDiv;
var Sidepannel_ScroolDoc;
var Sidepannel_Html;
var Sidepannel_SidepannelDoc;
var Sidepannel_SidepannelInnerDoc;
var Sidepannel_SidepannelRow_0;
var Sidepannel_ChangeFocusAnimationFinished = true;
var Sidepannel_ChangeFocusAnimationFast = false;
var Sidepannel_Positions = {};

var Sidepannel_AnimationTimeout = 200;//Same value as side_panel_holder_ani

function Sidepannel_AddFocusMain() {
    Main_AddClass('side_panel_movel_new_' + Sidepannel_Sidepannel_Pos, 'side_panel_new_icons_text');
}

function Sidepannel_RemoveFocusMain() {
    Main_RemoveClass('side_panel_movel_new_' + Sidepannel_Sidepannel_Pos, 'side_panel_new_icons_text');
}

function Sidepannel_AddFocusFeed(skipAnimation) {

    if (Sidepannel_GetSize()) {

        Main_AddClass(UserLiveFeed_side_ids[0] + Sidepannel_PosFeed, 'side_panel_div_focused');
        Sidepannel_Scroll(skipAnimation);
        Sidepannel_UpdateThumb();
        Main_values.UserSidePannel_LastPos = UserLiveFeed_DataObj[UserLiveFeedobj_UserLivePos][Sidepannel_PosFeed][14];

    } else {

        if (!UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) {

            Main_getElementById('side_panel_warn').style.display = 'inline-block';

        }

        Main_HideElement('side_panel_feed_thumb');

        if (Sidepannel_isShowing()) {

            Sidepannel_CheckIfIsLiveSTop();

        }

    }

}

function Sidepannel_RemoveFocusFeed(PreventCleanQualities) {
    Sidepannel_CheckIfIsLiveSTop(PreventCleanQualities);
    if (Sidepannel_ObjNotNull() && !UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) Main_RemoveClass(UserLiveFeed_side_ids[0] + Sidepannel_PosFeed, 'side_panel_div_focused');
}

function Sidepannel_isShowing() {
    return Sidepannel_isShowingSide() && Main_isScene1DocVisible();
}

function Sidepannel_isShowingSide() {
    return !Main_A_includes_B(Sidepannel_SidepannelDoc.className, 'side_panel_hide');
}

function Sidepannel_GetObj() {
    return Main_Slice(UserLiveFeed_DataObj[UserLiveFeedobj_UserLivePos][Sidepannel_PosFeed]);
}

function Sidepannel_ObjNotNull() {
    return Boolean(UserLiveFeed_DataObj[UserLiveFeedobj_UserLivePos][Sidepannel_PosFeed]);
}

function Sidepannel_UpdateThumbDiv() {

    if (Sidepannel_ObjNotNull()) {

        var info = Sidepannel_GetObj();

        Sidepannel_UpdateThumbDoc.onerror = function() {
            this.onerror = null;
            this.src = IMG_404_VIDEO;
        };
        Sidepannel_UpdateThumbDoc.src = info[0].replace("{width}x{height}", Main_SidePannelSize) + Main_randomimg;

        Main_innerHTML('feed_thum_name', Sidepannel_partnerIcon(Main_ReplaceLargeFont(info[1]), info[10], info[8]));
        Main_innerHTML('feed_thum_quality', info[5]);
        Main_innerHTML('feed_thum_title', Main_ReplaceLargeFont(twemoji.parse(info[2])));
        Main_innerHTML('feed_thum_game', (info[3] !== "" ? STR_PLAYING + info[3] : ""));
        Main_innerHTML('feed_thum_views', info[11] + STR_FOR + info[4] + STR_SPACE + STR_VIEWER);
    }
}

function Sidepannel_UpdateThumb() {
    Sidepannel_UpdateThumbDiv();

    if (Sidepannel_isShowing()) {
        Main_ShowElement('side_panel_feed_thumb');

        if (!Main_isStoped && Settings_Obj_default('show_side_player')) {

            if (Sidepannel_ObjNotNull()) {

                var ChannelId = UserLiveFeed_DataObj[UserLiveFeedobj_UserLivePos][Sidepannel_PosFeed][14];

                if ((!Play_PreviewId || !Main_A_equals_B(ChannelId, Play_PreviewId)) && !Play_PreviewVideoEnded) {
                    Sidepannel_CheckIfIsLiveStart();
                } else if (Play_PreviewId) {
                    Sidepannel_UpdateThumbDoc.src = IMG_404_BANNER;
                }

                Play_PreviewVideoEnded = false;
            }
        }

    }

}

function Sidepannel_CheckIfIsLiveSTop(PreventCleanQualities) {
    Main_clearTimeout(Sidepannel_CheckIfIsLiveStartId);

    if (Main_IsOn_OSInterface && Play_PreviewId && !PreventCleanQualities) {

        OSInterface_ClearSidePanelPlayer();
        Play_CheckIfIsLiveCleanEnd();

    }
    Sidepannel_HideWarningDialog();
}

var Sidepannel_CheckIfIsLiveStartId;
function Sidepannel_CheckIfIsLiveStart() {
    Sidepannel_CheckIfIsLiveStartId = Main_setTimeout(
        function() {

            Sidepannel_CheckIfIsLive();

        },
        DefaultPreviewDelay + Settings_Obj_values('show_feed_player_delay'),
        Sidepannel_CheckIfIsLiveStartId
    );
}

function Sidepannel_CheckIfIsLive() {
    Play_CheckIfIsLiveCleanEnd();

    if (!Main_IsOn_OSInterface) {
        return;
    }

    if (Sidepannel_ObjNotNull()) {

        var channel = UserLiveFeed_DataObj[UserLiveFeedobj_UserLivePos][Sidepannel_PosFeed][6];

        OSInterface_CheckIfIsLiveFeed(
            PlayClip_BaseUrl,
            Play_live_links.replace('%x', channel),
            "Sidepannel_CheckIfIsLiveResult",
            0,
            (Sidepannel_PosFeed % 100),
            DefaultHttpGetTimeout,
            false,
            Play_live_token.replace('%x', channel)
        );

    } else Play_CheckIfIsLiveCleanEnd();
}

var Sidepannel_PlayerViewSidePanelSet;
function Sidepannel_CheckIfIsLiveResult(StreamData, x, y) {//Called by Java

    if (!Main_isStoped && Sidepannel_isShowing() && x === 0 && y === (Sidepannel_PosFeed % 100)) {

        if (StreamData && Sidepannel_ObjNotNull()) {
            StreamData = JSON.parse(StreamData);

            var StreamInfo = Sidepannel_GetObj();

            if (StreamData.status === 200) {

                Play_PreviewURL = StreamData.url;
                Play_PreviewResponseText = StreamData.responseText;
                Play_PreviewId = StreamInfo[14];

                if (!Sidepannel_PlayerViewSidePanelSet) {
                    Sidepannel_SetPlayerViewSidePanel();
                }

                OSInterface_StartSidePanelPlayer(
                    Play_PreviewURL,
                    Play_PreviewResponseText
                );

                Sidepannel_UpdateThumbDoc.src = IMG_404_BANNER;

                Main_EventPreview(
                    'Preview_sidepanel',
                    StreamInfo[6],
                    StreamInfo[3],
                    StreamInfo[15],
                    'sidepanel'
                );

            } else {

                Sidepannel_CheckIfIsLiveWarn(
                    StreamInfo[1] + STR_SPACE + STR_LIVE + STR_BR + ((StreamData.status === 1 || StreamData.status === 403) ? STR_FORBIDDEN : STR_IS_OFFLINE),
                    0
                );

            }

        }
    }

}

function Sidepannel_SetPlayerViewSidePanel() {
    var Rect = Main_getElementById('feed_thumb_img').parentElement.getBoundingClientRect();
    OSInterface_SetPlayerViewSidePanel(
        Rect.bottom,
        Rect.right,
        Rect.left,
        window.innerHeight
    );
    Sidepannel_PlayerViewSidePanelSet = true;
}

function Sidepannel_CheckIfIsLiveWarn(ErroText, time) {
    OSInterface_ClearSidePanelPlayer();
    Play_CheckIfIsLiveCleanEnd();
    Sidepannel_UpdateThumbDiv();
    Sidepannel_showWarningDialog(ErroText, time);
}

var Sidepannel_showWarningDialogId;
function Sidepannel_showWarningDialog(text, timeout) {
    Main_innerHTML('sidepannel_dialog_warning_text', text);
    Main_ShowElement('sidepannel_dialog_warning');

    if (timeout) {
        Sidepannel_showWarningDialogId = Main_setTimeout(
            Sidepannel_HideWarningDialog,
            timeout,
            Sidepannel_showWarningDialogId
        );
    }
}

function Sidepannel_HideWarningDialog() {
    Main_clearTimeout(Main_setHistoryItemId);
    Main_HideElement('sidepannel_dialog_warning');
}

function Sidepannel_partnerIcon(name, partner, isrerun) {
    return '<div class="partnericon_div"> ' + name + STR_SPACE + STR_SPACE + '</div>' +
        (partner ? ('<img class="partnericon_img" alt="" src="' +
            IMG_PARTNER + '">' + STR_SPACE + STR_SPACE) : "") + '<div class="partnericon_text" style="background: #' +
        (isrerun ? 'FFFFFF; color: #000000;' : 'E21212;') + '">' + STR_SPACE + STR_SPACE +
        (isrerun ? STR_NOT_LIVE : STR_LIVE) + STR_SPACE + STR_SPACE + '</div>';
}

function Sidepannel_PreloadImgs() {
    if (!Sidepannel_isShowing()) return;

    if (UserLiveFeed_PreloadImgs[Sidepannel_PosFeed]) {
        Main_ImageLoaderWorker.postMessage(
            UserLiveFeed_PreloadImgs[Sidepannel_PosFeed].replace("{width}x{height}", Main_SidePannelSize) + Main_randomimg
        );
    }
    UserLiveFeed_PreloadImgs.splice(Sidepannel_PosFeed, 1);

    var i = 0, len = UserLiveFeed_PreloadImgs.length;
    for (i; i < len; i++) {
        Main_ImageLoaderWorker.postMessage(
            UserLiveFeed_PreloadImgs[i].replace("{width}x{height}", Main_SidePannelSize) + Main_randomimg
        );
    }
}

function Sidepannel_GetSize() {
    return Sidepannel_ScroolDoc.getElementsByClassName('side_panel_feed').length;
}

function Sidepannel_KeyEnterUser() {
    if (Sidepannel_Sidepannel_Pos === 5 && !AddUser_UsernameArray[0].access_token) {
        Main_showWarningDialog(STR_NOKEY_VIDEO_WARN, 2000);
        return;
    }

    if (Sidepannel_Sidepannel_Pos !== 2) Sidepannel_Hide();

    if (Sidepannel_Sidepannel_Pos === 2) {
        Main_values.Sidepannel_IsUser = false;
        Sidepannel_SetDefaultLables();
        Sidepannel_UnSetTopOpacity();

    } else if (Sidepannel_Sidepannel_Pos === 3) Sidepannel_Go(Main_UserLive);
    else if (Sidepannel_Sidepannel_Pos === 4) Sidepannel_Go(Main_usergames);
    else if (Sidepannel_Sidepannel_Pos === 5) Sidepannel_Go(Main_UserVod);
    else if (Sidepannel_Sidepannel_Pos === 6) Sidepannel_Go(Main_UserChannels);
    else if (Sidepannel_Sidepannel_Pos === 7) {

        Main_values.Main_selectedChannel_id = AddUser_UsernameArray[0].id;
        Main_values.Main_selectedChannelDisplayname = AddUser_UsernameArray[0].display_name ? AddUser_UsernameArray[0].display_name : AddUser_UsernameArray[0].name;
        Main_values.Main_selectedChannel = AddUser_UsernameArray[0].name;

        Main_values.Main_BeforeChannel = Main_values.Main_Go;
        Main_values.Main_Go = Main_ChannelContent;
        Main_values.Main_BeforeChannelisSet = true;
        AddCode_IsFollowing = false;
        ChannelContent_UserChannels = false;
        Main_ExitCurrent(Main_values.Main_BeforeChannel);
        Main_values.My_channel = true;
        Main_SwitchScreen();

    } else if (Sidepannel_Sidepannel_Pos === 8) Sidepannel_Go(Main_History[Main_HistoryPos]);
    else Sidepannel_KeyEnterBase();

}

function Sidepannel_KeyEnterBase() {
    if (!Sidepannel_Sidepannel_Pos) {
        Main_values.Main_Before = Main_values.Main_Go;
        Main_ExitCurrent(Main_values.Main_Go);
        if (AddUser_UserIsSet()) Users_init();
        else AddUser_init();
    } else if (Sidepannel_Sidepannel_Pos === 1) {
        if (Main_values.Main_Go !== Main_Search) {
            if (!Main_values.Search_isSearching &&
                (Main_values.Main_Go === Main_ChannelContent || Main_values.Main_Go === Main_ChannelClip || Main_values.Main_Go === Main_ChannelVod))
                ChannelContent_SetChannelValue();
            Main_OpenSearch();
        } else Main_addEventListener("keydown", Sidepannel_Callback);
    } else if (Sidepannel_Sidepannel_Pos === 9) {
        Main_showSettings();
    } else if (Sidepannel_Sidepannel_Pos === 10)
        Main_showAboutDialog(Sidepannel_Callback, ScreenObj[Main_values.Main_Go].key_controls);
    else if (Sidepannel_Sidepannel_Pos === 11)
        Main_showControlsDialog(Sidepannel_Callback, ScreenObj[Main_values.Main_Go].key_controls);
    else if (Sidepannel_Sidepannel_Pos === 12) Main_showExitDialog();
    else if (Sidepannel_Sidepannel_Pos === 13) Main_showAboutDialog(Sidepannel_Callback, ScreenObj[Main_values.Main_Go].key_controls, true);
}

function Sidepannel_KeyEnter() {
    if (Main_values.Sidepannel_IsUser) {
        Sidepannel_KeyEnterUser();
        return;
    }

    if (Sidepannel_Sidepannel_Pos !== 2) Sidepannel_Hide();

    if (Sidepannel_Sidepannel_Pos === 2) {
        if (AddUser_IsUserSet()) {
            Sidepannel_SetUserLables();
            Sidepannel_UnSetTopOpacity();

        } else {
            Main_showWarningDialog(STR_NOKUSER_WARN, 2000);
        }
    } else if (Sidepannel_Sidepannel_Pos === 3) Sidepannel_Go(Main_Live);
    else if (Sidepannel_Sidepannel_Pos === 4) Sidepannel_Go(Main_Featured);
    else if (Sidepannel_Sidepannel_Pos === 5) Sidepannel_Go(Main_games);
    else if (Sidepannel_Sidepannel_Pos === 6) Sidepannel_Go(Main_Vod);
    else if (Sidepannel_Sidepannel_Pos === 7) Sidepannel_Go(Main_Clip);
    else Sidepannel_KeyEnterBase();
}

function Sidepannel_Go(GoTo) {
    if (GoTo === Main_values.Main_Go) {
        Main_addEventListener("keydown", Sidepannel_Callback);
        Main_SwitchScreen();
    } else {
        Main_values.Main_Before = Main_values.Main_Go;
        Main_values.Main_Go = GoTo;
        Main_ExitCurrent(Main_values.Main_Before);
        Main_SwitchScreen();
    }
}

function Sidepannel_Start(callback, forceFeed) {
    Sidepannel_Callback = callback;
    Main_removeEventListener("keydown", Sidepannel_Callback);
    if (!Sidepannel_IsMain || forceFeed) {
        if (AddUser_UserIsSet()) Sidepannel_StartFeed();
        else {
            Main_showWarningDialog(STR_NOKUSER_WARN, 2000);
            Sidepannel_StartMain();
        }
    } else Sidepannel_StartMain();
}

function Sidepannel_StartFeed() {
    Sidepannel_IsMain = false;
    Main_addEventListener("keydown", Sidepannel_handleKeyDown);
    Main_RemoveClassWithEle(Sidepannel_SidepannelDoc, 'side_panel_hide');
    Main_RemoveClassWithEle(Sidepannel_SidepannelDoc, 'side_panel_hide_full');
    Main_RemoveClassWithEle(Sidepannel_SidepannelInnerDoc, 'side_panel_inner_hide');
    Main_RemoveClassWithEle(Sidepannel_SidepannelRow_0, 'opacity_zero');
    Main_RemoveClass('dialog_loading_side_feed', 'side_panel_dialog_hide');
    Sidepannel_ShowFeed();
    Sidepannel_HideMain(true);
    Sidepannel_SetLastRefresh();
}

function Sidepannel_ShowFeed() {
    var ForceRefresh = false;
    Main_AddClass('scenefeed', Screens_SettingDoAnimations ? 'scenefeed_background' : 'scenefeed_background_no_ani');

    if (UserLiveFeedobj_LiveFeedOldUserName !== AddUser_UsernameArray[0].name || !UserLiveFeed_ObjNotNull(UserLiveFeedobj_UserLivePos) ||
        (new Date().getTime()) > (UserLiveFeed_lastRefresh[UserLiveFeedobj_UserLivePos] + Settings_GetAutoRefreshTimeout())) {
        ForceRefresh = true;
    }

    UserLiveFeedobj_LiveFeedOldUserName = AddUser_UsernameArray[0].name;

    if ((ForceRefresh || !UserLiveFeed_status[UserLiveFeedobj_UserLivePos]) && !UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) {

        UserLiveFeed_RefreshLive();

    } else if (Sidepannel_ObjNotNull()) {

        Sidepannel_PreloadImgs();
        Sidepannel_AddFocusFeed(true);

    }

    Sidepannel_SetLastRefresh();
    Main_EventScreen('Side_panel_user_live');
}

function Sidepannel_SetLastRefresh() {
    if (!UserLiveFeed_lastRefresh[UserLiveFeedobj_UserLivePos]) return;

    Main_innerHTML(
        "side_panel_feed_refresh",
        STR_REFRESH + STR_SPACE + '(' + STR_LAST_REFRESH +
        Play_timeDay((new Date().getTime()) - UserLiveFeed_lastRefresh[UserLiveFeedobj_UserLivePos]) + ')'
    );
}

function Sidepannel_StartMain() {
    Main_RemoveClass('scenefeed', Screens_SettingDoAnimations ? 'scenefeed_background' : 'scenefeed_background_no_ani');
    Sidepannel_IsMain = true;
    Sidepannel_MovelDiv.style.transform = 'translateX(' + Sidepannel_FixdefaultMargin + '%)';
    Sidepannel_FixDiv.style.marginLeft = '';
    Main_addEventListener("keydown", Sidepannel_handleKeyDownMain);
    Sidepannel_AddFocusMain();
    Main_EventScreen('Side_panel_main');
}

function Sidepannel_MainisShowing() {
    return Main_A_equals_B(Sidepannel_MovelDiv.style.transform, 'translateX(' + Sidepannel_FixdefaultMargin + '%)');
}

function Sidepannel_HideMain(hideAll) {
    var size = AddUser_UsernameArray[0] ? AddUser_UsernameArray[0].display_name.length : STR_USER_ADD;
    size = (size > 11 ? size - 11 : 0);

    if (hideAll) Sidepannel_FixDiv.style.marginLeft = '-' + Sidepannel_FixdefaultMargin + '%';

    var pos = hideAll ? Sidepannel_MovelDiv.offsetWidth :
        (Sidepannel_MovelDiv.offsetWidth - Sidepannel_FixDiv.offsetWidth);

    Sidepannel_MovelDiv.style.transform = 'translateX(-' + ((pos / BodyfontSize) - 0.1) + "em)";
}

function Sidepannel_Hide(PreventCleanQualities) {

    if (!PreventCleanQualities) {
        Sidepannel_HideMain();
        Sidepannel_RemoveFocusMain();
        Sidepannel_FixDiv.style.marginLeft = '';
        Main_HideElement('side_panel_feed_thumb');
        Main_RemoveClass('scenefeed', Screens_SettingDoAnimations ? 'scenefeed_background' : 'scenefeed_background_no_ani');
    }
    Sidepannel_HideEle(PreventCleanQualities);

    Main_removeEventListener("keydown", Sidepannel_handleKeyDown);
    Main_removeEventListener("keydown", Sidepannel_handleKeyDownMain);
}

function Sidepannel_HideEle(PreventCleanQualities, full) {
    Sidepannel_RemoveFocusFeed(PreventCleanQualities);

    if (!PreventCleanQualities) {

        Main_AddClassWitEle(Sidepannel_SidepannelDoc, full ? 'side_panel_hide_full' : 'side_panel_hide');
        Main_AddClassWitEle(Sidepannel_SidepannelInnerDoc, 'side_panel_inner_hide');
        Main_AddClassWitEle(Sidepannel_SidepannelRow_0, 'opacity_zero');
        Main_AddClass('dialog_loading_side_feed', 'side_panel_dialog_hide');

    }

    Main_SaveValues();
}

function Sidepannel_SetTopOpacity(Main_Go) {
    if (Sidepannel_Pos_Screens[Main_Go]) Sidepannel_Sidepannel_Pos = Sidepannel_Pos_Screens[Main_Go];
    Sidepannel_UnSetTopOpacity();

    if (Sidepannel_Sidepannel_Pos && Sidepannel_Sidepannel_Pos < 9) Main_AddClass('side_panel_new_' + Sidepannel_Sidepannel_Pos, 'side_panel_new_icons_text');
}

var Sidepannel_Pos_Screens = [
    1, //Main_Search 0
    3, //Main_Live 1
    0, //Main_Users 2
    4, //Main_Featured 3
    5, //Main_games 4
    6, //Main_Vod 5
    7, //Main_Clip 6
    3, //Main_UserLive 7
    4, //Main_usergames 8
    5, //Main_UserVod 9
    6, //Main_UserChannels 10
    1, // Main_SearchGames 11
    1, // Main_SearchLive 12
    1, // Main_SearchChannels 13
    0, // Main_ChannelContent 14
    0, // Main_ChannelVod 15
    0, // Main_ChannelClip 16
    0, // Main_addUser 17
    0, //Main_aGame 18
    0, //Main_AGameVod 19
    0, //Main_AGameClip 20
    8, //Main_AGameClip 21
    8, //Main_AGameClip 22
    8, //Main_AGameClip 23
];

function Sidepannel_UnSetTopOpacity() {
    for (var i = 1; i < 9; i++) Main_RemoveClass('side_panel_new_' + i, 'side_panel_new_icons_text');
}

function Sidepannel_SetUserLables() {
    Main_values.Sidepannel_IsUser = true;

    Main_innerHTML('side_panel_movel_user_text', STR_SPACE + STR_USER_MENU + STR_SPACE);
    Main_ShowElement('side_panel_movel_user_text_holder');
    Main_ShowElement('side_panel_movel_new_8');
    Main_ShowElement('side_panel_new_8');

    Main_innerHTML('side_panel_movel_new_2', STR_MAIN_MENU);
    Main_innerHTML('side_panel_movel_new_4', STR_GAMES);
    Main_innerHTML('side_panel_movel_new_5', STR_VIDEOS);
    Main_innerHTML('side_panel_movel_new_6', STR_CHANNELS);
    Main_innerHTML('side_panel_movel_new_7', STR_USER_MY_CHANNEL);
    Main_innerHTML('side_panel_movel_new_8', STR_HISTORY);

    Sidepannel_SetIcons('side_panel_new_2', 'arrow-left', 'font-size: 115%; position: relative; top: 2%;');
    Sidepannel_SetIcons('side_panel_new_4', 'gamepad', 'font-size: 115%;');
    Sidepannel_SetIcons('side_panel_new_5', 'movie-play');
    Sidepannel_SetIcons('side_panel_new_6', 'filmstrip');
    Sidepannel_SetIcons('side_panel_new_7', 'user', 'font-size: 115%; position: relative; top: 2%;');

}

function Sidepannel_SetDefaultLables() {
    if (AddUser_UsernameArray[0]) Sidepannel_SetUserlable(AddUser_UsernameArray[0].display_name);
    else Sidepannel_SetUserlable(STR_USER_ADD);

    Main_HideElement('side_panel_movel_new_8');
    Main_HideElement('side_panel_new_8');

    Main_HideElement('side_panel_movel_user_text_holder');

    Main_innerHTML('side_panel_movel_new_1', STR_SEARCH);

    Main_innerHTML('side_panel_movel_new_2', STR_USER_MENU);
    Main_innerHTML('side_panel_movel_new_3', STR_LIVE);
    Main_innerHTML('side_panel_movel_new_4', STR_FEATURED);
    Main_innerHTML('side_panel_movel_new_5', STR_GAMES);
    Main_innerHTML('side_panel_movel_new_6', STR_VIDEOS);
    Main_innerHTML('side_panel_movel_new_7', STR_CLIPS);

    Main_innerHTML('side_panel_movel_new_9', STR_SPACE + STR_SETTINGS);
    Main_innerHTML('side_panel_movel_new_10', STR_SPACE + STR_ABOUT);
    Main_innerHTML('side_panel_movel_new_11', STR_SPACE + STR_CONTROLS);
    Main_innerHTML('side_panel_movel_new_12', STR_SPACE + STR_EXIT);
    Main_innerHTML('side_panel_movel_new_13', STR_SPACE + STR_CHANGELOG);

    Sidepannel_SetIcons('side_panel_new_1', 'search');
    Sidepannel_SetIcons('side_panel_new_2', 'user', 'font-size: 115%; position: relative; top: 2%;');
    Sidepannel_SetIcons('side_panel_new_4', 'star', 'font-size: 115%; position: relative; top: 2%;');
    Sidepannel_SetIcons('side_panel_new_5', 'gamepad', 'font-size: 115%;');
    Sidepannel_SetIcons('side_panel_new_6', 'movie-play');
    Sidepannel_SetIcons('side_panel_new_7', 'movie');
}

function Sidepannel_SetUserlable(text) {
    Main_innerHTML('side_panel_movel_new_0', text + STR_BR +
        '<div style="font-size: 45%;display: inline-block; transform: translateY(-80%);">' + STR_USER_EXTRAS + '</div>');
}

function Sidepannel_SetIcons(div, icon, extra_style) {
    if (icon) Main_innerHTML(div, '<i class="icon icon-' + icon + ' side_panel_new_icons_pad" ' + (extra_style ? ' style="' + extra_style + '"' : '') + '></i>');
    else Main_textContent(div, '');
}

var Sidepannel_Scroll_Offset = 0;

function Sidepannel_Scroll(skipAnimation) {
    var value = '0', //default
        center = 6;

    if (Sidepannel_PosFeed > center) { //Start scrolling in the middle
        if (Sidepannel_PosFeed < (Sidepannel_GetSize() - center)) {

            value = Main_getElementById(UserLiveFeed_side_ids[3] + (Sidepannel_PosFeed - center)).offsetTop;

        } else if (((Sidepannel_GetSize() - center) - center) > 0) { //if we are in the 7 left

            value = Main_getElementById(UserLiveFeed_side_ids[3] + (Sidepannel_GetSize() - (center * 2) - Sidepannel_Scroll_Offset)).offsetTop;

        }
    }

    if (!skipAnimation && Sidepannel_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
        !Sidepannel_ChangeFocusAnimationFast) {

        Sidepannel_ChangeFocusAnimationFinished = false;
        Sidepannel_ChangeFocusAnimationFast = true;

        Sidepannel_ScroolDoc.style.transition = '';

        Main_setTimeout(
            function() {
                Sidepannel_ChangeFocusAnimationFinished = true;
            },
            Sidepannel_AnimationTimeout //Same value as side_panel_holder_ani
        );

    } else {

        if (skipAnimation) Sidepannel_ChangeFocusAnimationFast = false;
        Sidepannel_ScroolDoc.style.transition = 'none';

    }

    Sidepannel_ScroolDoc.style.transform = 'translateY(-' + (value / BodyfontSize) + 'em)';
}

function Sidepannel_handleKeyDown(event) {
    switch (event.keyCode) {
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
        case KEY_CHAT:
            Sidepannel_Hide();
            Main_SwitchScreen();
            break;
        case KEY_RIGHT:
            Sidepannel_HideEle(false, true);
            Main_RemoveClass('scenefeed', Screens_SettingDoAnimations ? 'scenefeed_background' : 'scenefeed_background_no_ani');
            Main_HideElement('side_panel_feed_thumb');
            Main_removeEventListener("keydown", Sidepannel_handleKeyDown);
            Sidepannel_StartMain();
            break;
        case KEY_REFRESH:
        case KEY_LEFT:
            if (!UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) UserLiveFeed_RefreshLive();
            break;
        case KEY_PG_UP:
        case KEY_UP:
            if (Sidepannel_ChangeFocusAnimationFinished && Sidepannel_PosFeed && !UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) {
                Sidepannel_RemoveFocusFeed();
                Sidepannel_PosFeed--;
                Sidepannel_AddFocusFeed();
            }
            break;
        case KEY_PG_DOWN:
        case KEY_DOWN:
            if (Sidepannel_ChangeFocusAnimationFinished && Sidepannel_PosFeed < (Sidepannel_GetSize() - 1) && !UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) {
                Sidepannel_RemoveFocusFeed();
                Sidepannel_PosFeed++;
                Sidepannel_AddFocusFeed();
            }
            break;
        case KEY_1:
        case KEY_PLAY:
        case KEY_PLAYPAUSE:
        case KEY_KEYBOARD_SPACE:
        case KEY_ENTER:
            if (!UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) {
                Sidepannel_Hide(true);
                Main_values.Play_isHost = false;

                Main_OpenLiveStream(
                    Sidepannel_GetObj(),
                    Sidepannel_PosFeed,
                    UserLiveFeed_side_ids,
                    Sidepannel_handleKeyDown,
                    false,
                    'Side_Panel'
                );
            }
            break;
        case KEY_PAUSE://key s
        case KEY_6:
            Main_showSettings();
            Sidepannel_Hide();
            break;
        case KEY_A:
        case KEY_7:
            Main_showAboutDialog(Sidepannel_Callback, ScreenObj[Main_values.Main_Go].key_controls);
            Sidepannel_Hide();
            break;
        case KEY_C:
        case KEY_8:
            Main_showControlsDialog(Sidepannel_Callback, ScreenObj[Main_values.Main_Go].key_controls);
            Sidepannel_Hide();
            break;
        case KEY_E:
        case KEY_9:
            Main_showExitDialog();
            Sidepannel_Hide();
            break;
        default:
            break;
    }
}

function Sidepannel_handleKeyDownMain(event) {
    switch (event.keyCode) {
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
        case KEY_RIGHT:
            Sidepannel_Hide();
            Main_SwitchScreen();
            break;
        case KEY_CHAT:
        case KEY_LEFT:
            if (AddUser_UserIsSet()) {
                Main_removeEventListener("keydown", Sidepannel_handleKeyDownMain);
                Sidepannel_StartFeed();
            } else {
                Main_showWarningDialog(STR_NOKUSER_WARN, 2000);
            }
            break;
        case KEY_PG_UP:
        case KEY_UP:
            if (Sidepannel_Sidepannel_Pos) {
                Sidepannel_RemoveFocusMain();
                Sidepannel_Sidepannel_Pos--;
                if (!Main_values.Sidepannel_IsUser && Sidepannel_Sidepannel_Pos === 8) Sidepannel_Sidepannel_Pos -= 1;
                Sidepannel_AddFocusMain();
            }
            break;
        case KEY_PG_DOWN:
        case KEY_DOWN:
            if (Sidepannel_Sidepannel_Pos < 13) {
                Sidepannel_RemoveFocusMain();
                Sidepannel_Sidepannel_Pos++;
                if (!Main_values.Sidepannel_IsUser && Sidepannel_Sidepannel_Pos === 8) Sidepannel_Sidepannel_Pos += 1;
                Sidepannel_AddFocusMain();
            }
            break;
        case KEY_1:
        case KEY_PLAY:
        case KEY_PLAYPAUSE:
        case KEY_KEYBOARD_SPACE:
        case KEY_ENTER:
            Sidepannel_KeyEnter();
            break;
        case KEY_PAUSE://key s
        case KEY_6:
            Main_showSettings();
            Sidepannel_Hide();
            break;
        case KEY_A:
        case KEY_7:
            Main_showAboutDialog(Sidepannel_Callback, ScreenObj[Main_values.Main_Go].key_controls);
            Sidepannel_Hide();
            break;
        case KEY_C:
        case KEY_8:
            Main_showControlsDialog(Sidepannel_Callback, ScreenObj[Main_values.Main_Go].key_controls);
            Sidepannel_Hide();
            break;
        case KEY_E:
        case KEY_9:
            Main_showExitDialog();
            Sidepannel_Hide();
            break;
        default:
            break;
    }
}
