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
var Sidepannel_IsMain = true;

var Sidepannel_OffsetMovelTransform = 1;
var Sidepannel_FixdefaultMargin = 5;
//See en_USLang() for this values
var Sidepannel_MoveldefaultMargin;

var Sidepannel_FixDiv;
var Sidepannel_MovelDiv;
var Sidepannel_ScroolDoc;
var Sidepannel_Html;

var Sidepannel_Opt_holder;
var Sidepannel_scenefeed;
var Sidepannel_SidepannelDoc;
var Sidepannel_SidepannelInnerDoc;
var Sidepannel_SidepannelRow_0;
var Sidepannel_SidepannelLoadingDialog;
var Sidepannel_UpdateThumbDoc;
var Sidepannel_ThumbDoc;
var Sidepannel_LastRefreshDiv;
var Sidepannel_PosCounter;

var Sidepannel_ChangeFocusAnimationFinished = true;
var Sidepannel_ChangeFocusAnimationFast = false;
var Sidepannel_Positions = {};

var Sidepannel_AnimationTimeout = 200; //Same value as side_panel_holder_ani

function Sidepannel_AddFocusMain() {
    Main_AddClass(
        'side_panel_movel_new_' + Sidepannel_Sidepannel_Pos,
        Sidepannel_Sidepannel_Pos < 8 ? 'side_panel_new_icons_text' : 'side_panel_new_icons_text_botton'
    );
}

function Sidepannel_RemoveFocusMain() {
    Main_RemoveClass(
        'side_panel_movel_new_' + Sidepannel_Sidepannel_Pos,
        Sidepannel_Sidepannel_Pos < 8 ? 'side_panel_new_icons_text' : 'side_panel_new_icons_text_botton'
    );
}

function Sidepannel_AddFocusLiveFeed(skipAnimation) {
    var size = Sidepannel_GetSize();

    if (size) {
        Main_AddClass(UserLiveFeed_side_ids[0] + Sidepannel_PosFeed, 'side_panel_div_focused');
        Sidepannel_Scroll(skipAnimation);
        Sidepannel_UpdateThumb();
        Main_values.UserSidePannel_LastPositionId = UserLiveFeed_DataObj[UserLiveFeedobj_UserLivePos][Sidepannel_PosFeed][14];

        var pos = Sidepannel_PosFeed + 1;

        if (pos < 10) pos = STR_SPACE_HTML + STR_SPACE_HTML + STR_SPACE_HTML + STR_SPACE_HTML + pos;
        else if (pos < 100) pos = STR_SPACE_HTML + STR_SPACE_HTML + pos;

        Main_innerHTMLWithEle(Sidepannel_PosCounter, pos + '/' + size);
    } else {
        if (!UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) {
            Main_getElementById('side_panel_warn').style.display = 'inline-block';
        }

        Main_AddClassWitEle(Sidepannel_ThumbDoc, 'opacity_zero');

        if (Sidepannel_isShowingUserLive()) {
            Sidepannel_CheckIfIsLiveSTop();
        }

        Main_textContentWithEle(Sidepannel_PosCounter, '');
    }

    Main_SaveValuesWithTimeout();
}

function Sidepannel_RemoveFocusFeed(PreventCleanQualities) {
    Sidepannel_CheckIfIsLiveSTop(PreventCleanQualities);

    if (Sidepannel_ObjNotNull() && !UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) {
        Main_RemoveClass(UserLiveFeed_side_ids[0] + Sidepannel_PosFeed, 'side_panel_div_focused');
    }
}

function Sidepannel_FindClosest() {
    if (UserLiveFeed_DataObj[UserLiveFeedobj_UserLivePos][Main_values.UserSidePannel_LastPosition]) {
        Sidepannel_PosFeed = Main_values.UserSidePannel_LastPosition;
    } else if (Sidepannel_GetSize()) {
        var i = Main_values.UserSidePannel_LastPosition;

        for (i; i >= 0; i--) {
            if (UserLiveFeed_DataObj[UserLiveFeedobj_UserLivePos][i]) {
                Sidepannel_PosFeed = i;
                break;
            }
        }
    }
}

function Sidepannel_isShowingUserLive() {
    return Sidepannel_isShowingUserLiveSide() && Main_isScene1DocVisible();
}

function Sidepannel_isShowingUserLiveSide() {
    return !Main_A_includes_B(Sidepannel_SidepannelDoc.className, 'side_panel_hide');
}

function Sidepannel_GetObj() {
    return Main_Slice(UserLiveFeed_DataObj[UserLiveFeedobj_UserLivePos][Sidepannel_PosFeed]);
}

function Sidepannel_ObjNotNull() {
    return Boolean(
        UserLiveFeed_DataObj[UserLiveFeedobj_UserLivePos][Sidepannel_PosFeed] && !UserLiveFeed_DataObj[UserLiveFeedobj_UserLivePos][0].image
    );
}

var Sidepannel_UpdateThumbDivName;
var Sidepannel_UpdateThumbDivQuality;
var Sidepannel_UpdateThumbDivTitle;
var Sidepannel_UpdateThumbDivGame;
var Sidepannel_UpdateThumbDivViews;
var Sidepannel_UpdateThumbDivSince;
var Sidepannel_UpdateThumbDivThumb;

function Sidepannel_UpdateThumbDiv() {
    if (Sidepannel_ObjNotNull()) {
        var info = Sidepannel_GetObj();

        Sidepannel_UpdateThumbDoc.onerror = function () {
            this.onerror = null;
            this.src = IMG_404_VIDEO;
        };
        Sidepannel_UpdateThumbDoc.src = info[0].replace('{width}x{height}', Main_SidePannelSize) + Main_randomImg;

        Main_innerHTMLWithEle(Sidepannel_UpdateThumbDivName, Sidepannel_partnerIcon(Main_ReplaceLargeFont(info[1]), info[10], info[8]));
        Main_innerHTMLWithEle(Sidepannel_UpdateThumbDivQuality, info[5]);
        Main_innerHTMLWithEle(Sidepannel_UpdateThumbDivTitle, Main_ReplaceLargeFont(twemoji.parse(info[2])));
        Main_innerHTMLWithEle(Sidepannel_UpdateThumbDivGame, info[3] !== '' ? STR_PLAYING + info[3] : '');
        Main_innerHTMLWithEle(Sidepannel_UpdateThumbDivViews, STR_FOR + info[4] + STR_SPACE_HTML + Main_GetViewerStrings(info[13]));
        Play_LoadLogo(Sidepannel_UpdateThumbDivThumb, info[9]);
        Sidepannel_UpdateSince();
    }
}

var Sidepannel_UpdateSinceId;
function Sidepannel_UpdateSince() {
    if (!Sidepannel_isShowingUserLive() || Main_isStopped) return;

    if (Sidepannel_ObjNotNull() && !UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) {
        var info = Sidepannel_GetObj();

        Main_innerHTMLWithEle(Sidepannel_UpdateThumbDivSince, STR_SINCE + Play_streamLiveAtWitDate(new Date().getTime(), info[12]));
    }

    Sidepannel_UpdateSinceId = Main_setTimeout(Sidepannel_UpdateSince, 1000, Sidepannel_UpdateSinceId);
}

function Sidepannel_UpdateThumb() {
    Sidepannel_UpdateThumbDiv();

    if (Sidepannel_isShowingUserLive()) {
        Main_RemoveClassWithEle(Sidepannel_ThumbDoc, 'opacity_zero');

        if (!Main_isStopped && Settings_Obj_default('show_side_player')) {
            if (Sidepannel_ObjNotNull()) {
                var ChannelId = UserLiveFeed_DataObj[UserLiveFeedobj_UserLivePos][Sidepannel_PosFeed][14];

                if ((!Play_PreviewId || !Main_A_equals_B(ChannelId, Play_PreviewId)) && !Play_PreviewVideoEnded) {
                    Sidepannel_CheckIfIsLiveStart();
                } else if (Play_PreviewId && Main_IsOn_OSInterface) {
                    Sidepannel_UpdateThumbDoc.src = IMG_404_BANNER;
                }

                Play_PreviewVideoEnded = false;
            }
        }
    }
}

function Sidepannel_CheckIfIsLiveSTop(PreventCleanQualities) {
    Main_clearTimeout(Sidepannel_CheckIfIsLiveStartId);
    Main_clearTimeout(Sidepannel_UpdateSinceId);

    if (Main_IsOn_OSInterface && !PreventCleanQualities) {
        OSInterface_ClearSidePanelPlayer();
        Play_CheckIfIsLiveCleanEnd();
    }
    Sidepannel_HideWarningDialog();
}

var Sidepannel_CheckIfIsLiveStartId;
function Sidepannel_CheckIfIsLiveStart() {
    Sidepannel_CheckIfIsLiveStartId = Main_setTimeout(
        function () {
            Sidepannel_CheckIfIsLive();
        },
        DefaultPreviewDelay + Settings_PreviewDelay[Settings_Obj_default('show_feed_player_delay')],
        Sidepannel_CheckIfIsLiveStartId
    );
}

function Sidepannel_CheckIfIsLive() {
    Play_CheckIfIsLiveCleanEnd();

    if (!Main_IsOn_OSInterface) {
        return;
    }

    if (!Main_isStopped && Sidepannel_ObjNotNull() && Sidepannel_isShowingUserLive()) {
        var channel = UserLiveFeed_DataObj[UserLiveFeedobj_UserLivePos][Sidepannel_PosFeed][6];

        PlayHLS_GetPlayListAsync(true, channel, Sidepannel_PosFeed % 100, 0, Sidepannel_CheckIfIsLiveResult);
    }
}

var Sidepannel_PlayerViewSidePanelSet;
function Sidepannel_CheckIfIsLiveResult(StreamData, x, y) {
    //Called by Java

    if (
        !Main_isStopped &&
        Sidepannel_isShowingUserLive() &&
        x === 0 &&
        y === Sidepannel_PosFeed % 100 &&
        !Main_isUpdateDialogVisible() &&
        !Main_isChangeDialogVisible()
    ) {
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

                OSInterface_StartSidePanelPlayer(Play_PreviewURL, Play_PreviewResponseText);

                Sidepannel_UpdateThumbDoc.src = IMG_404_BANNER;

                Main_EventPreview('Preview_sidepanel', StreamInfo[6], StreamInfo[3], StreamInfo[15], 'sidepanel');
            } else {
                Sidepannel_CheckIfIsLiveWarn(
                    StreamInfo[1] +
                        STR_SPACE_HTML +
                        STR_LIVE +
                        STR_BR +
                        (StreamData.status === 1 || StreamData.status === 403 ? STR_FORBIDDEN : STR_IS_OFFLINE),
                    0
                );
            }
        }
    }
}

function Sidepannel_SetPlayerViewSidePanel() {
    var Rect = Sidepannel_UpdateThumbDoc.parentElement.getBoundingClientRect();
    OSInterface_SetPlayerViewSidePanel(Rect.bottom, Rect.right, Rect.left, window.innerHeight);
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
        Sidepannel_showWarningDialogId = Main_setTimeout(Sidepannel_HideWarningDialog, timeout, Sidepannel_showWarningDialogId);
    }
}

function Sidepannel_HideWarningDialog() {
    Main_clearTimeout(Main_setHistoryItemId);
    Main_HideElement('sidepannel_dialog_warning');
}

function Sidepannel_partnerIcon(name, partner, isrerun) {
    return (
        '<div id="feed_thumb_partnericon" class="partnericon_div"> ' +
        name +
        STR_SPACE_HTML +
        STR_SPACE_HTML +
        '</div>' +
        (partner
            ? '<img id="feed_thumb_partnerimg" class="partnericon_img" alt="" src="' + IMG_PARTNER + '">' + STR_SPACE_HTML + STR_SPACE_HTML
            : '') +
        '<div id="feed_thumb_partnertext" class="partnericon_text" style="background: #' +
        (isrerun ? 'FFFFFF; color: #000000;' : 'E21212;') +
        '">' +
        STR_SPACE_HTML +
        STR_SPACE_HTML +
        (isrerun ? STR_RERUN : STR_LIVE) +
        STR_SPACE_HTML +
        STR_SPACE_HTML +
        '</div>'
    );
}

function Sidepannel_PreloadImgs() {
    if (!Sidepannel_isShowingUserLive()) return;

    if (UserLiveFeed_PreloadImgs[Sidepannel_PosFeed]) {
        Main_ImageLoaderWorker.postMessage(
            UserLiveFeed_PreloadImgs[Sidepannel_PosFeed].replace('{width}x{height}', Main_SidePannelSize) + Main_randomImg
        );
    }
    UserLiveFeed_PreloadImgs.splice(Sidepannel_PosFeed, 1);

    var i = 0,
        len = UserLiveFeed_PreloadImgs.length;
    for (i; i < len; i++) {
        Main_ImageLoaderWorker.postMessage(UserLiveFeed_PreloadImgs[i].replace('{width}x{height}', Main_SidePannelSize) + Main_randomImg);
    }
}

function Sidepannel_GetSize() {
    return Sidepannel_ScroolDoc.getElementsByClassName('side_panel_feed').length;
}

function Sidepannel_KeyEnterUser() {
    if (Sidepannel_Sidepannel_Pos >= 3 && Sidepannel_Sidepannel_Pos <= 6 && !AddUser_UsernameArray[0].access_token) {
        Sidepannel_ShowNoUserWarning();
        return;
    }

    if (Sidepannel_Sidepannel_Pos !== 2 && Sidepannel_Sidepannel_Pos !== 13) Sidepannel_Hide();

    if (Sidepannel_Sidepannel_Pos === 2) {
        Main_values.Sidepannel_IsUser = false;
        Sidepannel_SetDefaultLabels();
        Sidepannel_UnSetTopOpacity();
    } else if (Sidepannel_Sidepannel_Pos === 3) Sidepannel_Go(Main_UserLive);
    else if (Sidepannel_Sidepannel_Pos === 4) Sidepannel_Go(Main_usergames);
    else if (Sidepannel_Sidepannel_Pos === 5) Sidepannel_Go(Main_UserVod);
    else if (Sidepannel_Sidepannel_Pos === 6) Sidepannel_Go(Main_UserChannels);
    else if (Sidepannel_Sidepannel_Pos === 7) {
        Main_values.Main_selectedChannel_id = AddUser_UsernameArray[0].id;
        Main_values.Main_selectedChannelDisplayname = AddUser_UsernameArray[0].display_name
            ? AddUser_UsernameArray[0].display_name
            : AddUser_UsernameArray[0].name;
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
            if (
                !Main_values.Search_isSearching &&
                (Main_values.Main_Go === Main_ChannelContent || Main_values.Main_Go === Main_ChannelClip || Main_values.Main_Go === Main_ChannelVod)
            ) {
                ChannelContent_SetChannelValue();
            }

            Main_OpenSearch();
        } else {
            Main_addEventListener('keydown', Sidepannel_Callback);
        }
    } else if (Sidepannel_Sidepannel_Pos === 9) {
        Main_showSettings();
    } else if (Sidepannel_Sidepannel_Pos === 10) {
        Main_showAboutDialog(Sidepannel_Callback, ScreenObj[Main_values.Main_Go].key_controls);
    } else if (Sidepannel_Sidepannel_Pos === 11) {
        Main_showControlsDialog(Sidepannel_Callback, ScreenObj[Main_values.Main_Go].key_controls);
    } else if (Sidepannel_Sidepannel_Pos === 12) {
        Main_showExitDialog();
    } else if (Sidepannel_Sidepannel_Pos === 13) {
        Main_UpdateDialogShowCheck();
    }
}

function Sidepannel_KeyEnter() {
    if (Main_values.Sidepannel_IsUser) {
        Sidepannel_KeyEnterUser();
        return;
    }

    if (Sidepannel_Sidepannel_Pos !== 2 && Sidepannel_Sidepannel_Pos !== 13) Sidepannel_Hide();

    if (Sidepannel_Sidepannel_Pos === 2) {
        if (AddUser_IsUserSet()) {
            Sidepannel_SetUserLabels();
            Sidepannel_UnSetTopOpacity();
        } else {
            Sidepannel_ShowNoUserWarning();
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
        Main_addEventListener('keydown', Sidepannel_Callback);
        Main_SwitchScreen();
    } else {
        Main_values.Main_Before = Main_values.Main_Go;
        Main_values.Main_Go = GoTo;
        Main_ExitCurrent(Main_values.Main_Before);
        Main_SwitchScreen();
    }
}

function Sidepannel_Start(callback, forceFeed) {
    if (Settings_Obj_default('fade_sidepannel')) {
        Sidepannel_UnFade();
    }

    Sidepannel_Callback = callback;
    Main_removeEventListener('keydown', Sidepannel_Callback);
    if (!Sidepannel_IsMain || forceFeed) {
        if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) Sidepannel_StartFeed();
        else {
            Sidepannel_ShowNoUserWarning();
            Sidepannel_StartMain();
        }
    } else Sidepannel_StartMain();
}

function Sidepannel_StartFeed() {
    Sidepannel_IsMain = false;
    Main_addEventListener('keydown', Sidepannel_handleKeyDown);

    Main_RemoveClassWithEle(Sidepannel_SidepannelDoc, 'side_panel_hide');
    Main_RemoveClassWithEle(Sidepannel_SidepannelDoc, 'side_panel_hide_full');
    Main_RemoveClassWithEle(Sidepannel_SidepannelInnerDoc, 'side_panel_inner_hide');
    Main_RemoveClassWithEle(Sidepannel_SidepannelRow_0, 'opacity_zero');
    Main_RemoveClassWithEle(Sidepannel_SidepannelLoadingDialog, 'side_panel_dialog_hide');

    Sidepannel_ShowFeed();
    Sidepannel_HideMain(true);
}

function Sidepannel_ShowFeed() {
    var ForceRefresh = false;

    Sidepannel_Showscenefeed();

    if (
        UserLiveFeedobj_LiveFeedOldUserName !== AddUser_UsernameArray[0].name ||
        !UserLiveFeed_ObjNotNull(UserLiveFeedobj_UserLivePos) ||
        UserLiveFeed_DataObj[UserLiveFeedobj_UserLivePos][0].image ||
        new Date().getTime() > UserLiveFeed_lastRefresh[UserLiveFeedobj_UserLivePos] + Settings_GetAutoRefreshTimeout() ||
        !Main_A_equals_B(UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].sorting, Settings_value.live_feed_sort.defaultValue) ||
        UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].enable_mature !== Settings_value.enable_mature.defaultValue ||
        !Main_A_equals_B(UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].Lang, Settings_AppLang)
    ) {
        ForceRefresh = true;
    }

    UserLiveFeedobj_LiveFeedOldUserName = AddUser_UsernameArray[0].name;

    if ((ForceRefresh || !UserLiveFeed_status[UserLiveFeedobj_UserLivePos]) && !UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) {
        UserLiveFeed_RefreshLive();
    } else if (Sidepannel_ObjNotNull()) {
        Sidepannel_PreloadImgs();
        Sidepannel_AddFocusLiveFeed(true);
        Sidepannel_SetLastRefresh();
    }

    Main_EventScreen('Side_panel_user_live');
}

function Sidepannel_Showscenefeed() {
    Main_AddClassWitEle(Sidepannel_scenefeed, Screens_SettingDoAnimations ? 'scenefeed_background' : 'scenefeed_background_no_ani');
    Main_RemoveClassWithEle(Sidepannel_scenefeed, 'feed_screen_input');
}

function Sidepannel_Hidecenefeed() {
    Main_RemoveClassWithEle(Sidepannel_scenefeed, Screens_SettingDoAnimations ? 'scenefeed_background' : 'scenefeed_background_no_ani');
    Main_AddClassWitEle(Sidepannel_scenefeed, 'feed_screen_input');
}

function Sidepannel_SetLastRefresh() {
    if (!UserLiveFeed_lastRefresh[UserLiveFeedobj_UserLivePos]) return;

    Sidepannel_SetLastRefreshUpDiv(new Date().getTime() - UserLiveFeed_lastRefresh[UserLiveFeedobj_UserLivePos]);
}

function Sidepannel_SetLastRefreshUpDiv(date) {
    Main_innerHTMLWithEle(Sidepannel_LastRefreshDiv, STR_REFRESH + STR_SPACE_HTML + '(' + STR_LAST_REFRESH + Play_timeDay(date) + ')');
}

function Sidepannel_StartMain() {
    Sidepannel_Hidecenefeed();
    Sidepannel_IsMain = true;
    Sidepannel_MovelDiv.style.transform = 'translateX(' + Sidepannel_FixdefaultMargin + '%)';
    Sidepannel_FixDiv.style.marginLeft = '';
    Main_addEventListener('keydown', Sidepannel_handleKeyDownMain);
    Sidepannel_AddFocusMain();
    Main_EventScreen('Side_panel_main');
}

function Sidepannel_isShowingMenus() {
    return Main_A_equals_B(Sidepannel_MovelDiv.style.transform, 'translateX(' + Sidepannel_FixdefaultMargin + '%)');
}

function Sidepannel_HideMain(hideAll) {
    var size = AddUser_UsernameArray[0] ? AddUser_UsernameArray[0].display_name.length : STR_USER_ADD;
    size = size > 11 ? size - 11 : 0;

    if (hideAll) Sidepannel_FixDiv.style.marginLeft = '-' + Sidepannel_FixdefaultMargin + '%';

    var pos = hideAll ? Sidepannel_MovelDiv.offsetWidth : Sidepannel_MovelDiv.offsetWidth - Sidepannel_FixDiv.offsetWidth;

    Sidepannel_MovelDiv.style.transform = 'translateX(-' + (pos / BodyfontSize + Sidepannel_OffsetMovelTransform) + 'em)';
}

function Sidepannel_Hide(PreventCleanQualities) {
    if (!PreventCleanQualities) {
        Sidepannel_HideMain();
        Sidepannel_RemoveFocusMain();
        Sidepannel_FixDiv.style.marginLeft = '';
        Main_AddClassWitEle(Sidepannel_ThumbDoc, 'opacity_zero');
        Sidepannel_Hidecenefeed();
    }
    Sidepannel_HideEle(PreventCleanQualities);

    Main_removeEventListener('keydown', Sidepannel_handleKeyDown);
    Main_removeEventListener('keydown', Sidepannel_handleKeyDownMain);

    if (Settings_Obj_default('fade_sidepannel')) {
        Sidepannel_FadeStart();
    }
}

var Sidepannel_FadeStartID;
function Sidepannel_FadeStart() {
    Main_setTimeout(Sidepannel_Fade, 5000);
}

function Sidepannel_Fade() {
    Sidepannel_Opt_holder.style.transition = Sidepannel_IsMain ? '' : 'none';
    Sidepannel_scenefeed.style.transition = '';

    Sidepannel_Opt_holder.style.opacity = 0;
    Sidepannel_scenefeed.style.opacity = 0;
}

function Sidepannel_UnFade() {
    Main_clearTimeout(Sidepannel_FadeStartID);

    Sidepannel_Opt_holder.style.transition = 'none';
    Sidepannel_scenefeed.style.transition = 'none';

    Sidepannel_Opt_holder.style.opacity = '';
    Sidepannel_scenefeed.style.opacity = '';
}

function Sidepannel_HideEle(PreventCleanQualities, full) {
    Sidepannel_RemoveFocusFeed(PreventCleanQualities);

    if (!PreventCleanQualities) {
        Main_AddClassWitEle(Sidepannel_SidepannelDoc, full ? 'side_panel_hide_full' : 'side_panel_hide');
        Main_AddClassWitEle(Sidepannel_SidepannelInnerDoc, 'side_panel_inner_hide');
        Main_AddClassWitEle(Sidepannel_SidepannelRow_0, 'opacity_zero');
        Main_AddClassWitEle(Sidepannel_SidepannelLoadingDialog, 'side_panel_dialog_hide');
    }
}

function Sidepannel_SetTopOpacity(Main_Go) {
    if (Sidepannel_Pos_Screens[Main_Go]) {
        Sidepannel_Sidepannel_Pos = Sidepannel_Pos_Screens[Main_Go];
    }

    Sidepannel_UnSetTopOpacity();

    if (Sidepannel_Sidepannel_Pos && Sidepannel_Sidepannel_Pos < 9) {
        Main_AddClass('side_panel_new_' + Sidepannel_Sidepannel_Pos, 'side_panel_new_icons_start');
    }
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
    8 //Main_AGameClip 23
];

function Sidepannel_UnSetTopOpacity() {
    for (var i = 1; i < 9; i++) Main_RemoveClass('side_panel_new_' + i, 'side_panel_new_icons_start');
}

function Sidepannel_SetUserLabels() {
    Main_values.Sidepannel_IsUser = true;

    //No longer supported
    Main_HideElement('side_panel_movel_new_5');
    Main_HideElement('side_panel_new_5');

    Main_innerHTML('side_panel_movel_user_text', STR_SPACE_HTML + STR_USER_MENU + STR_SPACE_HTML);
    Main_ShowElement('side_panel_movel_user_text_holder');
    Main_ShowElement('side_panel_movel_new_8');
    Main_ShowElement('side_panel_new_8');

    Main_ShowElement('side_panel_movel_new_6');
    Main_ShowElement('side_panel_new_6');
    Main_ShowElement('side_panel_movel_new_7');
    Main_ShowElement('side_panel_new_7');

    Main_innerHTML('side_panel_movel_new_2', STR_MAIN_MENU);
    Main_innerHTML('side_panel_movel_new_4', STR_GAMES);
    //Main_innerHTML('side_panel_movel_new_5', STR_VIDEOS);
    Main_innerHTML('side_panel_movel_new_6', STR_CHANNELS);
    Main_innerHTML('side_panel_movel_new_7', STR_USER_MY_CHANNEL);
    Main_innerHTML('side_panel_movel_new_8', STR_HISTORY);

    Sidepannel_SetIcons('side_panel_new_2', 'arrow-left', 'font-size: 115%; position: relative; top: 2%;');
    Sidepannel_SetIcons('side_panel_new_4', 'gamepad', 'font-size: 115%;');
    Sidepannel_SetIcons('side_panel_new_5', 'movie-play');
    Sidepannel_SetIcons('side_panel_new_6', 'filmstrip');
    Sidepannel_SetIcons('side_panel_new_7', 'user', 'font-size: 115%; position: relative; top: 2%;');
}

function Sidepannel_SetDefaultLabels() {
    if (AddUser_UsernameArray[0]) Sidepannel_SetUserLabel(AddUser_UsernameArray[0].display_name);
    else Sidepannel_SetUserLabel(STR_USER_ADD);

    Main_HideElement('side_panel_movel_new_8');
    Main_HideElement('side_panel_new_8');
    Main_ShowElement('side_panel_movel_new_5');
    Main_ShowElement('side_panel_new_5');

    Main_HideElement('side_panel_movel_user_text_holder');

    Main_innerHTML('side_panel_movel_new_1', STR_SEARCH);

    Main_innerHTML('side_panel_movel_new_2', STR_USER_MENU);
    Main_innerHTML('side_panel_movel_new_3', STR_LIVE);
    Main_innerHTML('side_panel_movel_new_4', STR_FEATURED);
    Main_innerHTML('side_panel_movel_new_5', STR_GAMES);
    Main_innerHTML('side_panel_movel_new_6', STR_VIDEOS);
    Main_innerHTML('side_panel_movel_new_7', STR_CLIPS);

    Main_innerHTML('side_panel_movel_new_9', STR_SPACE_HTML + STR_SETTINGS);
    Main_innerHTML('side_panel_movel_new_10', STR_SPACE_HTML + STR_ABOUT);
    Main_innerHTML('side_panel_movel_new_11', STR_SPACE_HTML + STR_CONTROLS);
    Main_innerHTML('side_panel_movel_new_12', STR_SPACE_HTML + STR_EXIT);
    Main_innerHTML('side_panel_movel_new_13', STR_SPACE_HTML + STR_UPDATE_CHANGELOG);

    Sidepannel_SetIcons('side_panel_new_1', 'search');
    Sidepannel_SetIcons('side_panel_new_2', 'user', 'font-size: 115%; position: relative; top: 2%;');
    Sidepannel_SetIcons('side_panel_new_4', 'star', 'font-size: 115%; position: relative; top: 2%;');
    Sidepannel_SetIcons('side_panel_new_5', 'gamepad', 'font-size: 115%;');
    Sidepannel_SetIcons('side_panel_new_6', 'movie-play');
    Sidepannel_SetIcons('side_panel_new_7', 'movie');
}

function Sidepannel_SetUserLabel(text) {
    Main_innerHTML(
        'side_panel_movel_new_0',
        text + STR_BR + '<div style="font-size: 45%;display: inline-block; transform: translateY(-80%);">' + STR_USER_EXTRAS + '</div>'
    );
}

function Sidepannel_SetIcons(div, icon, extra_style) {
    if (icon)
        Main_innerHTML(
            div,
            '<i id="icon_' +
                div +
                '" class="icon icon-' +
                icon +
                ' side_panel_new_icons_pad" ' +
                (extra_style ? ' style="' + extra_style + '"' : '') +
                '></i>'
        );
    else Main_textContent(div, '');
}

var Sidepannel_Scroll_Offset = 0;

function Sidepannel_Scroll(skipAnimation) {
    var value = '0', //default
        center = 6;

    if (Sidepannel_PosFeed > center) {
        //Start scrolling in the middle
        if (Sidepannel_PosFeed < Sidepannel_GetSize() - center) {
            value = Main_getElementById(UserLiveFeed_side_ids[3] + (Sidepannel_PosFeed - center)).offsetTop;
        } else if (Sidepannel_GetSize() - center - center > 0) {
            //if we are in the 7 left

            value = Main_getElementById(UserLiveFeed_side_ids[3] + (Sidepannel_GetSize() - center * 2 - Sidepannel_Scroll_Offset)).offsetTop;
        }
    }

    if (!skipAnimation && Sidepannel_ChangeFocusAnimationFinished && Screens_SettingDoAnimations && !Sidepannel_ChangeFocusAnimationFast) {
        Sidepannel_ChangeFocusAnimationFinished = false;
        Sidepannel_ChangeFocusAnimationFast = true;

        Sidepannel_ScroolDoc.style.transition = '';

        Main_setTimeout(
            function () {
                Sidepannel_ChangeFocusAnimationFinished = true;
            },
            Sidepannel_AnimationTimeout //Same value as side_panel_holder_ani
        );
    } else {
        if (skipAnimation) Sidepannel_ChangeFocusAnimationFast = false;
        Sidepannel_ScroolDoc.style.transition = 'none';
    }

    Sidepannel_ScroolDoc.style.transform = 'translateY(-' + value / BodyfontSize + 'em)';
}

function Sidepannel_userLiveKeyRight() {
    Sidepannel_HideEle(false, true);
    Sidepannel_Hidecenefeed();
    Main_AddClassWitEle(Sidepannel_ThumbDoc, 'opacity_zero');
    Main_removeEventListener('keydown', Sidepannel_handleKeyDown);
    Sidepannel_StartMain();
}

function Sidepannel_userLiveKeyEnter() {
    if (!UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos] && Sidepannel_ObjNotNull()) {
        Sidepannel_Hide(true);
        Main_values.Play_isHost = false;

        Main_OpenLiveStream(Sidepannel_GetObj(), Sidepannel_PosFeed, UserLiveFeed_side_ids, Sidepannel_handleKeyDown, false, 'Side_Panel');
    }
}

function Sidepannel_handleKeyDown(event) {
    switch (event.keyCode) {
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
        case KEY_3:
            Sidepannel_Hide();
            Main_SwitchScreen();
            break;
        case KEY_RIGHT:
            Sidepannel_userLiveKeyRight();
            break;
        case KEY_2:
        case KEY_LEFT:
            if (!UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) UserLiveFeed_RefreshLive();
            break;
        case KEY_PG_UP:
        case KEY_UP:
            if (Sidepannel_ChangeFocusAnimationFinished && Sidepannel_PosFeed && !UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) {
                Sidepannel_RemoveFocusFeed();
                Sidepannel_PosFeed--;
                Sidepannel_AddFocusLiveFeed();
            }
            break;
        case KEY_PG_DOWN:
        case KEY_DOWN:
            if (
                Sidepannel_ChangeFocusAnimationFinished &&
                Sidepannel_PosFeed < Sidepannel_GetSize() - 1 &&
                !UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]
            ) {
                Sidepannel_RemoveFocusFeed();
                Sidepannel_PosFeed++;
                Sidepannel_AddFocusLiveFeed();
            }
            break;
        case KEY_1:
        case KEY_PLAY:
        case KEY_PLAYPAUSE:
        case KEY_KEYBOARD_SPACE:
        case KEY_ENTER:
            Sidepannel_userLiveKeyEnter();
            break;
        case KEY_PAUSE: //key s
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
        case KEY_0:
        case KEY_U:
            Main_UpdateDialogShowCheck();
            break;
        default:
            break;
    }
}

function Sidepannel_MainKeyLeft() {
    if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
        Main_removeEventListener('keydown', Sidepannel_handleKeyDownMain);
        Sidepannel_StartFeed();
    } else {
        Sidepannel_ShowNoUserWarning();
    }
}

function Sidepannel_ShowNoUserWarning() {
    Main_showWarningDialog(STR_NOKUSER_WARNING, 5000);
}

function Sidepannel_handleMainKey(Down) {
    if (Main_values.Sidepannel_IsUser) {
        if (Sidepannel_Sidepannel_Pos === 5) {
            Sidepannel_Sidepannel_Pos = Down ? 6 : 4;
        }
    } else {
        if (Sidepannel_Sidepannel_Pos === 8) {
            Sidepannel_Sidepannel_Pos += Down ? 1 : -1;
        }
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
        case KEY_3:
        case KEY_LEFT:
            Sidepannel_MainKeyLeft();
            break;
        case KEY_PG_UP:
        case KEY_UP:
            if (Sidepannel_Sidepannel_Pos) {
                Sidepannel_RemoveFocusMain();
                Sidepannel_Sidepannel_Pos--;
                Sidepannel_handleMainKey(false);
                Sidepannel_AddFocusMain();
            }
            break;
        case KEY_PG_DOWN:
        case KEY_DOWN:
            if (Sidepannel_Sidepannel_Pos < 13) {
                Sidepannel_RemoveFocusMain();
                Sidepannel_Sidepannel_Pos++;
                Sidepannel_handleMainKey(true);
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
        case KEY_PAUSE: //key s
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
