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

//Global
var UserLiveFeedobj_AGamesPos = 0;
var UserLiveFeedobj_GamesPos = 1;
var UserLiveFeedobj_FeaturedPos = 2;
var UserLiveFeedobj_CurrentGamePos = 3;
var UserLiveFeedobj_LivePos = 4;
//User
var UserLiveFeedobj_UserLivePos = 5;
var UserLiveFeedobj_UserHistoryPos = 6;
var UserLiveFeedobj_UserHostPos = 7;
var UserLiveFeedobj_UserGamesPos = 8;
var UserLiveFeedobj_UserAGamesPos = 9;
var UserLiveFeedobj_UserVodPos = 10;
var UserLiveFeedobj_UserVodHistoryPos = 11;

var UserLiveFeedobj_FeedSort = [
    [null, 'viewers', 0],//0
    [null, 'viewers', 1],//1
    ['channel', 'name', 1],//2
    ['channel', 'name', 0],//3
    [null, 'game', 1],//4
    [null, 'game', 0],//5
    [null, 'created_at', 0],//6
    [null, 'created_at', 1]//7
];

var UserLiveFeedobj_FeedSortGames = [
    [null, 'viewers', 0],//0
    [null, 'viewers', 1],//2
    ['game', 'name', 1],//3
    ['game', 'name', 0],//4
    [null, 'channels', 0],//5
    [null, 'channels', 1]//6
];

var UserLiveFeedobj_FeedSortHost = [
    [null, 'viewers', 0],//0
    [null, 'viewers', 1],//1
    ['channel', 'name', 1],//2
    ['channel', 'name', 0],//3
    [null, 'meta_game', 1],//4
    [null, 'meta_game', 0],//5
    [null, 'created_at', 0],//6
    [null, 'created_at', 1]//7
];

//Check bellow java before define more current max is 0 to 24, 1 is used by the side panel
//public String[][] ExtraPlayerHandlerResult = new String[25][100];

var UserLiveFeed_FeedPosX = UserLiveFeedobj_UserLivePos;//Default pos
var UserLiveFeedobj_MAX = UserLiveFeedobj_UserVodHistoryPos;
var UserLiveFeedobj_MAX_No_user = UserLiveFeedobj_LivePos;

function UserLiveFeedobj_StartDefault(pos) {
    if (UserLiveFeed_status[pos]) {
        if (UserLiveFeed_ThumbNull(pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_ids[0]))
            UserLiveFeed_LastPos[pos] =
                JSON.parse(Main_getElementById(UserLiveFeed_ids[3] + pos + '_' + UserLiveFeed_FeedPosY[pos]).getAttribute(Main_DataAttribute))[14];
    } else {
        UserLiveFeed_LastPos[pos] = null;
    }

    Main_date_Ms = new Date().getTime();
    UserLiveFeed_lastRefresh[pos] = new Date().getTime();
    UserLiveFeed_obj[pos].offsettopFontsize = Settings_Obj_default('global_font_offset');
    UserLiveFeed_cell[pos] = [];
    UserLiveFeed_idObject[pos] = {};

    UserLiveFeed_itemsCount[pos] = 0;
    Main_emptyWithEle(UserLiveFeed_obj[pos].div);
    UserLiveFeed_status[pos] = false;
    UserLiveFeed_FeedPosY[pos] = 0;
    UserLiveFeed_FeedSetPosLast[pos] = 0;
    UserLiveFeed_obj[pos].offset = 0;
    UserLiveFeed_obj[pos].loadingMore = false;
    UserLiveFeed_obj[pos].dataEnded = false;
    UserLiveFeed_obj[pos].div.style.transform = 'translateX(0px)';

    if (UserLiveFeed_isFeedShow()) {
        UserLiveFeed_obj[pos].div.classList.remove('hide');
    }
}

var UserSidePannel_LastPos;

function UserLiveFeedobj_CheckToken() {
    Main_clearTimeout(Main_CheckResumeFeedId);

    if (UserLiveFeed_status[UserLiveFeedobj_UserLivePos] && UserLiveFeed_ThumbNull(Sidepannel_PosFeed, UserLiveFeed_side_ids[0])) {
        UserSidePannel_LastPos = JSON.parse(Main_getElementById(UserLiveFeed_side_ids[3] + Sidepannel_PosFeed).getAttribute(Main_DataAttribute))[14];
    } else UserSidePannel_LastPos = null;

    Main_ShowElement('dialog_loading_side_feed');
    UserLiveFeed_PreloadImgs = [];
    Sidepannel_PosFeed = 0;
    Main_empty('side_panel_holder');
    Main_getElementById('side_panel_warn').style.display = 'none';

    UserLiveFeed_loadChannelOffsset = 0;
    UserLiveFeed_followerChannels = [];

    UserLiveFeedobj_StartDefault(UserLiveFeedobj_UserLivePos);

    UserLiveFeed_token = AddUser_UsernameArray[0].access_token;
    if (UserLiveFeed_token) {
        UserLiveFeed_token = Main_OAuth + UserLiveFeed_token;
        UserLiveFeedobj_loadChannelUserLive();
    } else {
        UserLiveFeed_token = null;
        UserLiveFeedobj_loadChannels();
    }

    //Main_Log('UserLiveFeedobj_CheckToken end');
}

function UserLiveFeedobj_loadDataPrepare(pos) {
    UserLiveFeed_loadingData[pos] = true;
    Screens_Some_Screen_Is_Refreshing = true;
    UserLiveFeed_loadingDataTry[pos] = 0;
}

function UserLiveFeedobj_BaseLoad(url, headers, callback, CheckOffset, pos) {
    //Main_Log('UserLiveFeedobj_BaseLoad');

    if (CheckOffset) UserLiveFeedobj_CheckOffset(pos);

    BasexmlHttpGet(
        url,
        DefaultHttpGetTimeout + (UserLiveFeed_loadingDataTry[pos] * DefaultHttpGetTimeoutPlus),
        headers,
        null,
        callback,
        function() {
            UserLiveFeedobj_loadDataError(pos);
        }
    );
}

function UserLiveFeedobj_loadDataError(pos) {
    //Main_Log('UserLiveFeedobj_loadChannels');
    UserLiveFeed_loadingDataTry[pos]++;
    if (UserLiveFeed_loadingDataTry[pos] < DefaultHttpGetReTryMax) {
        UserLiveFeed_obj[pos].load();
    } else {
        UserLiveFeedobj_loadDataErrorElse(pos);
    }
}

function UserLiveFeedobj_loadDataErrorElse(pos) {
    if (!UserLiveFeed_obj[pos].loadingMore) {
        UserLiveFeed_loadingDataTry[pos] = 0;
        UserLiveFeed_loadingData[pos] = false;
        Screens_Some_Screen_Is_Refreshing = false;
        UserLiveFeed_Showloading(false);
        Main_HideElement('dialog_loading_side_feed');

        if (UserLiveFeed_isFeedShow()) {
            UserLiveFeedobj_HolderDiv(pos, STR_REFRESH_PROBLEM);
        }

        if (pos === UserLiveFeedobj_UserLivePos && Sidepannel_isShowing()) {
            Main_HideWarningDialog();
            Sidepannel_showWarningDialog(STR_REFRESH_PROBLEM, 5000);
        }
    } else {
        UserLiveFeed_obj[pos].loadingMore = false;
        UserLiveFeed_obj[pos].dataEnded = true;
    }
}

function UserLiveFeedobj_Empty(pos) {
    UserLiveFeedobj_HolderDiv(pos, STR_NO_LIVE_CONTENT);
}

function UserLiveFeedobj_HolderDiv(pos, text) {
    Main_innerHTMLWithEle(UserLiveFeed_obj[pos].div,
        '<div class="strokicon" style="color: #FFFFFF;text-align: center;vertical-align: middle;transform: translateY(20vh);font-size: 150%;"> ' + text + '</div>');
}

function UserLiveFeedobj_loadChannels() {
    var theUrl = Main_kraken_api + 'users/' + encodeURIComponent(AddUser_UsernameArray[0].id) +
        '/follows/channels?limit=100&offset=' + UserLiveFeed_loadChannelOffsset + '&sortby=last_broadcast' + Main_TwithcV5Flag;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = DefaultHttpGetTimeout + (UserLiveFeed_loadingDataTry[UserLiveFeedobj_UserLivePos] * DefaultHttpGetTimeoutPlus);

    for (var i = 0; i < 2; i++)
        xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                UserLiveFeedobj_loadChannelLive(xmlHttp.responseText);
            } else {
                UserLiveFeedobj_loadChannelsError(UserLiveFeedobj_UserLivePos);
            }
        }
    };

    xmlHttp.send(null);
}

function UserLiveFeedobj_loadChannelsError(pos) {
    UserLiveFeed_loadingDataTry[pos]++;
    if (UserLiveFeed_loadingDataTry[pos] < DefaultHttpGetReTryMax) {
        UserLiveFeedobj_loadChannels();
    } else {
        if (!UserLiveFeed_followerChannels.length) UserLiveFeedobj_loadDataErrorElse(pos);
        else UserLiveFeedobj_loadChannelLiveEnd();
    }
}

function UserLiveFeedobj_loadChannelLive(responseText) {
    //Main_Log('UserLiveFeedobj_loadChannelLive');

    var response = JSON.parse(responseText).follows,
        response_items = response.length;

    if (response_items) { // response_items here is not always 99 because banned channels, so check until it is 0
        var x = 0,
            max = UserLiveFeed_followerChannels.length + response_items,
            end = false;

        if (max > UserLiveFeed_maxChannels) {
            end = true;
            response_items = Math.min(response_items, response_items - (max - UserLiveFeed_maxChannels));
        }

        for (x; x < response_items; x++) {
            UserLiveFeed_followerChannels.push(response[x].channel._id);
        }

        if (end) {
            UserLiveFeedobj_loadChannelLiveEnd();
        } else {
            UserLiveFeed_loadChannelOffsset += response_items;
            UserLiveFeedobj_loadDataPrepare(UserLiveFeedobj_UserLivePos);
            UserLiveFeedobj_loadChannels();
        }
    } else { // end
        UserLiveFeedobj_loadChannelLiveEnd();
    }
}

function UserLiveFeedobj_loadChannelLiveEnd() {
    UserLiveFeedobj_loadDataPrepare(UserLiveFeedobj_UserLivePos);
    UserLiveFeedobj_loadChannelUserLive();
}

function UserLiveFeedobj_loadChannelUserLive() {
    //Main_Log('UserLiveFeedobj_loadChannelUserLive');
    var theUrl = Main_kraken_api + 'streams/';

    if (UserLiveFeed_token) {
        theUrl += 'followed?';
    } else {
        theUrl += '?channel=' + UserLiveFeed_followerChannels.join() + '&';
    }
    theUrl += 'limit=100&offset=0&stream_type=all' + Main_TwithcV5Flag;

    UserLiveFeedobj_loadChannelUserLiveGet(theUrl);
}

function UserLiveFeedobj_loadChannelUserLiveGet(theUrl) {
    //Main_Log('UserLiveFeedobj_loadChannelUserLiveGet');
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = DefaultHttpGetTimeout + (UserLiveFeed_loadingDataTry[UserLiveFeedobj_UserLivePos] * DefaultHttpGetTimeoutPlus);

    if (UserLiveFeed_token) Main_Headers[2][1] = UserLiveFeed_token;

    for (var i = 0; i < (UserLiveFeed_token ? 3 : 2); i++)
        xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) UserLiveFeedobj_loadChannelUserLiveGetEnd(xmlHttp);
    };

    xmlHttp.send(null);
}

function UserLiveFeedobj_loadChannelUserLiveGetEnd(xmlHttp) {
    if (xmlHttp.status === 200) {
        UserLiveFeedobj_loadDataSuccess(xmlHttp.responseText);
    } else if (UserLiveFeed_token && (xmlHttp.status === 401 || xmlHttp.status === 403)) { //token expired
        //Token has change or because is new or because it is invalid because user delete in twitch settings
        // so callbackFuncOK and callbackFuncNOK must be the same to recheck the token
        AddCode_refreshTokens(0, 0, UserLiveFeedobj_CheckToken, UserLiveFeedobj_loadDataRefreshTokenError);
    } else {
        UserLiveFeedobj_loadChannelUserLiveGetEndError(UserLiveFeedobj_UserLivePos);
    }
}

function UserLiveFeedobj_loadChannelUserLiveGetEndError(pos) {
    UserLiveFeed_loadingDataTry[pos]++;
    if (UserLiveFeed_loadingDataTry[pos] < DefaultHttpGetReTryMax) {
        UserLiveFeedobj_loadChannelUserLive();
    } else {
        UserLiveFeedobj_loadDataErrorElse(pos);
    }
}

function UserLiveFeedobj_loadDataRefreshTokenError() {
    //Main_Log('UserLiveFeedobj_loadDataRefreshTokenError');

    if (!AddUser_UsernameArray[0].access_token) UserLiveFeedobj_CheckToken();
    else UserLiveFeedobj_loadDataError(UserLiveFeedobj_UserLivePos);
}

var UserLiveFeedobj_LiveFeedOldUserName = '';
function UserLiveFeedobj_ShowFeed() {
    UserLiveFeedobj_SetBottomText(4);

    if (AddUser_UserIsSet()) {
        UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_UserLivePos, (UserLiveFeedobj_LiveFeedOldUserName !== AddUser_UsernameArray[0].name));
        UserLiveFeedobj_LiveFeedOldUserName = AddUser_UsernameArray[0].name;
    }
}

function UserLiveFeedobj_ShowFeedCheck(pos, forceRefressh) {

    if (Main_isScene2DocShown() && !UserLiveFeed_isFeedShow()) UserLiveFeed_Show();

    if (forceRefressh || !UserLiveFeed_ThumbNull(pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_ids[0]) ||
        (new Date().getTime()) > (UserLiveFeed_lastRefresh[pos] + (Settings_Obj_values("auto_refresh_screen") * 60000)) ||
        UserLiveFeed_obj[pos].offsettopFontsize !== Settings_Obj_default('global_font_offset') || !UserLiveFeed_obj[pos].AddCellsize) {

        if (UserLiveFeed_loadingData[pos]) {

            if (UserLiveFeed_isFeedShow()) {
                UserLiveFeed_Showloading(true);
                UserLiveFeed_obj[pos].div.classList.remove('hide');
            }
        } else {

            UserLiveFeed_StartLoad();
        }

    } else {

        UserLiveFeed_obj[pos].div.classList.remove('hide');

        UserLiveFeed_FeedAddFocus(true, pos);
    }

    UserLiveFeedobj_SetLastRefresh(pos);

    if (UserLiveFeed_obj[pos].Screen)
        Main_EventScreen(UserLiveFeed_obj[pos].Screen);
}

function UserLiveFeedobj_SetLastRefresh(pos) {
    if (!UserLiveFeed_lastRefresh[pos]) return;

    Main_innerHTML("feed_last_refresh", STR_LAST_REFRESH + Play_timeDay((new Date().getTime()) - UserLiveFeed_lastRefresh[pos]));
}

function UserLiveFeedobj_HideFeed() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].div.classList.add('hide');
}

//Live history start
function UserLiveFeedobj_HideHistory() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_UserHistoryPos].div.classList.add('hide');
}

var UserLiveFeedobj_ShowHistoryLength = -1;
function UserLiveFeedobj_ShowHistory() {
    UserLiveFeedobj_SetBottomText(5);

    if (AddUser_UserIsSet()) {
        UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_UserHistoryPos, true);//(UserLiveFeedobj_ShowHistoryLength !== Main_values_History_data[AddUser_UsernameArray[0].id].live.length)
        UserLiveFeedobj_ShowHistoryLength = Main_values_History_data[AddUser_UsernameArray[0].id].live.length;
    }

}

function UserLiveFeedobj_History() {
    UserLiveFeedobj_StartDefault(UserLiveFeedobj_UserHistoryPos);

    var pos = UserLiveFeedobj_UserHistoryPos,
        response = JSON.parse(JSON.stringify(Main_values_History_data[AddUser_UsernameArray[0].id].live)),
        response_items,
        len = response.length,
        cell, id,
        i = 0,
        itemsCount = UserLiveFeed_itemsCount[pos],
        streamerID = {};

    response.sort(
        function(a, b) {
            return (a.date > b.date ? -1 : (a.date < b.date ? 1 : 0));
        }
    );

    response_items = Math.min(len, 100);

    if (response_items) {

        for (i; i < response_items; i++) {
            cell = response[i];
            id = cell.data[7];
            if (!cell.forceVod) {

                if (!UserLiveFeed_idObject[pos].hasOwnProperty(id) && cell.data[14] && cell.data[14] !== '') {

                    UserLiveFeed_idObject[pos][id] = itemsCount;

                    UserLiveFeed_cell[pos][itemsCount] =
                        UserLiveFeedobj_CreatFeed(
                            pos + '_' + itemsCount,
                            cell.data,
                            cell.date,
                            cell.vodimg,
                            (streamerID[cell.data[14]] && cell.vodid) || cell.forceVod
                        );

                    streamerID[cell.data[14]] = 1;
                    itemsCount++;
                }

            } else if (len > (response_items + 1)) {
                response_items++;
            }
        }

        if (!itemsCount) UserLiveFeedobj_Empty(pos);
    } else UserLiveFeedobj_Empty(pos);

    UserLiveFeed_itemsCount[pos] = itemsCount;

    UserLiveFeed_loadDataSuccessFinish(pos);
}

//Live history end

//Live Start
function UserLiveFeedobj_Live() {
    if (!UserLiveFeed_obj[UserLiveFeedobj_LivePos].loadingMore) UserLiveFeedobj_StartDefault(UserLiveFeedobj_LivePos);
    UserLiveFeedobj_loadLive();
}

function UserLiveFeedobj_loadLive() {
    UserLiveFeedobj_BaseLoad(
        Main_kraken_api + 'streams?limit=100&offset=' + UserLiveFeed_obj[UserLiveFeedobj_LivePos].offset +
        (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '') +
        Main_TwithcV5Flag,
        2,
        UserLiveFeedobj_loadDataLiveSuccess,
        true,
        UserLiveFeedobj_LivePos
    );
}

function UserLiveFeedobj_LiveCell(cell) {
    return cell;
}

function UserLiveFeedobj_loadDataLiveSuccess(responseText) {
    UserLiveFeedobj_loadDataBaseLiveSuccess(responseText, UserLiveFeedobj_LivePos);
}

function UserLiveFeedobj_ShowLive() {
    UserLiveFeedobj_SetBottomText(3);

    UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_LivePos);
}

function UserLiveFeedobj_HideLive() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].div.classList.add('hide');
}

//Live end

//Featured Start
function UserLiveFeedobj_Featured() {
    UserLiveFeedobj_StartDefault(UserLiveFeedobj_FeaturedPos);
    UserLiveFeedobj_loadFeatured();
}

function UserLiveFeedobj_loadFeatured() {
    UserLiveFeedobj_BaseLoad(
        Main_kraken_api + 'streams/featured?limit=100' + (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token ? '&oauth_token=' +
            AddUser_UsernameArray[0].access_token : '') + Main_TwithcV5Flag,
        2,
        UserLiveFeedobj_loadDataFeaturedSuccess,
        false,
        UserLiveFeedobj_FeaturedPos
    );
}

function UserLiveFeedobj_FeaturedCell(cell) {
    return cell.stream;
}

function UserLiveFeedobj_loadDataFeaturedSuccess(responseText) {
    UserLiveFeedobj_loadDataBaseLiveSuccess(responseText, UserLiveFeedobj_FeaturedPos);
}

function UserLiveFeedobj_ShowFeatured() {
    UserLiveFeedobj_SetBottomText(1);

    UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_FeaturedPos);
}

function UserLiveFeedobj_HideFeatured() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].div.classList.add('hide');
}
//Featured end

//Current game Start
function UserLiveFeedobj_CurrentGame() {
    if (!UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].loadingMore) UserLiveFeedobj_StartDefault(UserLiveFeedobj_CurrentGamePos);
    UserLiveFeedobj_loadCurrentGame();
}

function UserLiveFeedobj_loadCurrentGame() {
    UserLiveFeedobj_BaseLoad(
        Main_kraken_api + 'streams?game=' + encodeURIComponent(Play_data.data[3]) +
        '&limit=100&offset=' + UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].offset +
        (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '') + Main_TwithcV5Flag,
        2,
        UserLiveFeedobj_loadDataCurrentGameSuccess,
        true,
        UserLiveFeedobj_CurrentGamePos
    );
}

function UserLiveFeedobj_CurrentGameCell(cell) {
    return cell;
}

function UserLiveFeedobj_loadDataCurrentGameSuccess(responseText) {
    UserLiveFeedobj_loadDataBaseLiveSuccess(responseText, UserLiveFeedobj_CurrentGamePos);
}

var UserLiveFeedobj_CurrentGameName = '';
function UserLiveFeedobj_ShowCurrentGame() {
    UserLiveFeedobj_SetBottomText(2);

    UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_CurrentGamePos, (UserLiveFeedobj_CurrentGameName !== Play_data.data[3]));
    UserLiveFeedobj_CurrentGameName = Play_data.data[3];
}

function UserLiveFeedobj_HideCurrentGame() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].div.classList.add('hide');
}
//Current game end

//User Host Start
function UserLiveFeedobj_UserHost() {
    UserLiveFeedobj_StartDefault(UserLiveFeedobj_UserHostPos);
    UserLiveFeedobj_loadUserHost();
}

function UserLiveFeedobj_loadUserHost() {
    var theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(AddUser_UsernameArray[0].name) +
        '/followed/hosting?limit=100';

    BasexmlHttpHlsGet(
        theUrl,
        DefaultHttpGetTimeout + (UserLiveFeed_loadingDataTry[UserLiveFeedobj_UserHostPos] * DefaultHttpGetTimeoutPlus),
        2,
        null,
        UserLiveFeedobj_loadDataUserHostSuccess,
        function() {
            UserLiveFeedobj_loadDataError(UserLiveFeedobj_UserHostPos);
        }
    );
}

var UserLiveFeedobj_HostFeedOldUserName = '';
function UserLiveFeedobj_ShowUserHost() {
    UserLiveFeedobj_SetBottomText(6);

    if (AddUser_UserIsSet()) {
        UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_UserHostPos, (UserLiveFeedobj_HostFeedOldUserName !== AddUser_UsernameArray[0].name));
        UserLiveFeedobj_HostFeedOldUserName = AddUser_UsernameArray[0].name;
    }
}

function UserLiveFeedobj_HideUserHost() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].div.classList.add('hide');
}
//User Host end

//User Games Start
function UserLiveFeedobj_UserGames() {
    UserLiveFeedobj_StartDefault(UserLiveFeedobj_UserGamesPos);
    UserLiveFeedobj_loadUserGames();
}

function UserLiveFeedobj_loadUserGames() {
    var theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(AddUser_UsernameArray[0].name) + '/follows/games/live?limit=250';//follows

    BasexmlHttpHlsGet(
        theUrl,
        DefaultHttpGetTimeout + (UserLiveFeed_loadingDataTry[UserLiveFeedobj_UserGamesPos] * DefaultHttpGetTimeoutPlus),

        1,
        null,
        UserLiveFeedobj_loadDataUserGamesSuccess,
        function() {
            UserLiveFeedobj_loadDataError(UserLiveFeedobj_UserGamesPos);
        }
    );
}

function UserLiveFeedobj_loadDataUserGamesSuccess(responseText) {
    UserLiveFeedobj_loadDataBaseGamesSuccess(responseText, UserLiveFeedobj_UserGamesPos, 'follows');
}

var UserLiveFeedobj_GamesFeedOldUserName = '';
function UserLiveFeedobj_ShowUserGames() {
    UserLiveFeedobj_SetBottomText(7);

    if (AddUser_UserIsSet()) {
        UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_UserGamesPos, (UserLiveFeedobj_GamesFeedOldUserName !== AddUser_UsernameArray[0].name));
        UserLiveFeedobj_GamesFeedOldUserName = AddUser_UsernameArray[0].name;
    }
}

function UserLiveFeedobj_HideUserGames() {
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].div.classList.add('hide');
}
//User Games end

//Current user a game Start
var UserLiveFeedobj_CurrentUserAGameEnable = false;
function UserLiveFeedobj_CurrentUserAGame() {
    if (!UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].loadingMore) UserLiveFeedobj_StartDefault(UserLiveFeedobj_UserAGamesPos);
    UserLiveFeedobj_loadCurrentUserAGame();
}

function UserLiveFeedobj_loadCurrentUserAGame() {
    UserLiveFeedobj_BaseLoad(
        Main_kraken_api + 'streams?game=' + encodeURIComponent(UserLiveFeedobj_CurrentUserAGameNameEnter) +
        '&limit=100&offset=' + UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].offset +
        (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '') + Main_TwithcV5Flag,
        2,
        UserLiveFeedobj_loadDataCurrentUserGameSuccess,
        true,
        UserLiveFeedobj_UserAGamesPos
    );
}

function UserLiveFeedobj_CurrentUserGameCell(cell) {
    return cell;
}

function UserLiveFeedobj_loadDataCurrentUserGameSuccess(responseText) {
    UserLiveFeedobj_loadDataBaseLiveSuccess(responseText, UserLiveFeedobj_UserAGamesPos);
}

var UserLiveFeedobj_CurrentUserAGameName = '';
var UserLiveFeedobj_CurrentUserAGameNameEnter = null;
function UserLiveFeedobj_ShowCurrentUserAGame() {
    UserLiveFeedobj_SetBottomText(7);

    UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_UserAGamesPos, (UserLiveFeedobj_CurrentUserAGameName !== UserLiveFeedobj_CurrentUserAGameNameEnter));
    UserLiveFeedobj_CurrentUserAGameName = UserLiveFeedobj_CurrentUserAGameNameEnter;
    Main_IconLoad('icon_feed_back', 'icon-arrow-left', STR_BACK_USER_GAMES + STR_USER + STR_SPACE + STR_GAMES);
    Main_RemoveClass('icon_feed_back', 'visibility_hidden');
    Main_EventAgame(UserLiveFeedobj_CurrentUserAGameName);
}

function UserLiveFeedobj_HideCurrentUserAGame() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].div.classList.add('hide');
}
//Current user a game end

//Games Start
function UserLiveFeedobj_Games() {
    if (!UserLiveFeed_obj[UserLiveFeedobj_GamesPos].loadingMore) UserLiveFeedobj_StartDefault(UserLiveFeedobj_GamesPos);
    UserLiveFeedobj_loadGames();
}

function UserLiveFeedobj_loadGames() {
    UserLiveFeedobj_BaseLoad(
        Main_kraken_api + 'games/top?limit=100&offset=' + UserLiveFeed_obj[UserLiveFeedobj_GamesPos].offset,
        2,
        UserLiveFeedobj_loadDataGamesSuccess,
        false,
        UserLiveFeedobj_GamesPos
    );

    if (UserLiveFeed_obj[UserLiveFeedobj_GamesPos].offset &&
        (UserLiveFeed_obj[UserLiveFeedobj_GamesPos].offset + 100) > UserLiveFeed_obj[UserLiveFeedobj_GamesPos].MaxOffset)
        UserLiveFeed_obj[UserLiveFeedobj_GamesPos].dataEnded = true;
}

function UserLiveFeedobj_loadDataGamesSuccess(responseText) {
    UserLiveFeedobj_loadDataBaseGamesSuccess(responseText, UserLiveFeedobj_GamesPos, 'top');
}

function UserLiveFeedobj_ShowGames() {
    UserLiveFeedobj_SetBottomText(0);

    UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_GamesPos);
}

function UserLiveFeedobj_HideGames() {
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].div.classList.add('hide');
}
//Games end

//Current a game Start
var UserLiveFeedobj_CurrentAGameEnable = false;
function UserLiveFeedobj_CurrentAGame() {
    if (!UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].loadingMore) UserLiveFeedobj_StartDefault(UserLiveFeedobj_AGamesPos);
    UserLiveFeedobj_loadCurrentAGame();
}

function UserLiveFeedobj_loadCurrentAGame() {
    UserLiveFeedobj_BaseLoad(
        Main_kraken_api + 'streams?game=' + encodeURIComponent(UserLiveFeedobj_CurrentAGameNameEnter) +
        '&limit=100&offset=' + UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].offset +
        (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '') + Main_TwithcV5Flag,
        2,
        UserLiveFeedobj_loadDataCurrentAGameSuccess,
        true,
        UserLiveFeedobj_AGamesPos
    );
}

function UserLiveFeedobj_CurrentAGameCell(cell) {
    return cell;
}

function UserLiveFeedobj_loadDataCurrentAGameSuccess(responseText) {
    UserLiveFeedobj_loadDataBaseLiveSuccess(responseText, UserLiveFeedobj_AGamesPos);
}

var UserLiveFeedobj_CurrentAGameName = '';
var UserLiveFeedobj_CurrentAGameNameEnter = null;
function UserLiveFeedobj_ShowCurrentAGame() {
    UserLiveFeedobj_SetBottomText(0);

    UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_AGamesPos, (UserLiveFeedobj_CurrentAGameName !== UserLiveFeedobj_CurrentAGameNameEnter));
    UserLiveFeedobj_CurrentAGameName = UserLiveFeedobj_CurrentAGameNameEnter;
    Main_IconLoad('icon_feed_back', 'icon-arrow-left', STR_BACK_USER_GAMES + STR_GAMES);
    Main_RemoveClass('icon_feed_back', 'visibility_hidden');
    Main_EventAgame(UserLiveFeedobj_CurrentAGameName);
}

function UserLiveFeedobj_HideCurrentAGame() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].div.classList.add('hide');
}
//Current a game end

function UserLiveFeedobj_SetBottomText(pos) {
    Play_HideWarningMidleDialog();

    var i = 0, len = (UserLiveFeedobj_MAX - 1);
    for (i; i < len; i++)
        Main_RemoveClass('feed_end_' + i, 'feed_end_name_focus');

    Main_AddClass('feed_end_' + pos, 'feed_end_name_focus');

    len = (UserLiveFeedobj_MAX - 2);
    for (i = 0; i < len; i++) {
        if (i < pos) {
            Main_RemoveClass('feed_end_icon_' + i, 'feed_end_icon_up');
            Main_AddClass('feed_end_icon_' + i, 'feed_end_icon_down');

            Main_RemoveClass('feed_end_icon_' + i, 'icon-key-down');
            Main_AddClass('feed_end_icon_' + i, 'icon-key-up');
        } else {
            Main_RemoveClass('feed_end_icon_' + i, 'feed_end_icon_down');
            Main_AddClass('feed_end_icon_' + i, 'feed_end_icon_up');

            Main_RemoveClass('feed_end_icon_' + i, 'icon-key-up');
            Main_AddClass('feed_end_icon_' + i, 'icon-key-down');
        }
    }

    Main_innerHTML('feed_end_0', (UserLiveFeedobj_CurrentAGameEnable ? UserLiveFeedobj_CurrentAGameNameEnter : (STR_GAMES)));
    Main_innerHTML('feed_end_2', (Play_data.data[3] !== '' ? Play_data.data[3] : STR_NO_GAME));
    Main_innerHTML('feed_end_7', (UserLiveFeedobj_CurrentUserAGameEnable ? UserLiveFeedobj_CurrentUserAGameNameEnter : (STR_USER + STR_SPACE + STR_GAMES)));

}

function UserLiveFeedobj_CreatSideFeed(id, data) {

    var div = document.createElement('div');
    div.setAttribute('id', UserLiveFeed_side_ids[3] + id);
    div.setAttribute(Main_DataAttribute, JSON.stringify(data));
    div.className = 'side_panel_feed';

    div.innerHTML = '<div id="' + UserLiveFeed_side_ids[0] + id +
        '" class="side_panel_div"><div id="' + UserLiveFeed_side_ids[2] + id +
        '" style="width: 100%;"><div style="display: none;">' + data[1] +
        '</div><div class="side_panel_iner_div1"><img id="' + UserLiveFeed_side_ids[1] + id +
        '" alt="" class="side_panel_channel_img" src="' + data[9] +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO +
        '\';"></div><div class="side_panel_iner_div2"><div class="side_panel_new_title">' + Main_ReplaceLargeFont(data[1]) +
        '</div><div class="side_panel_new_game">' + data[3] +
        '</div></div><div class="side_panel_iner_div3"><div style="text-align: center;"><i class="icon-' +
        (!data[8] ? 'circle" style="color: red;' : 'refresh" style="') +
        ' font-size: 55%; "></i><div style="font-size: 58%;">' + Main_addCommas(data[13]) + '</div></div></div></div></div></div>';

    return div;
}

function UserLiveFeedobj_CreatFeed(id, data, Extra_when, Extra_vodimg, force_VOD) {
    if (!data[1]) data[1] = data[6];
    var div = document.createElement('div');

    div.setAttribute('id', UserLiveFeed_ids[3] + id);
    div.setAttribute(Main_DataAttribute, JSON.stringify(data));

    div.className = 'user_feed_thumb';

    var image = (force_VOD ? Extra_vodimg : (data[0].replace("{width}x{height}", Main_VideoSize) + Main_randomimg)),
        ishosting = data[16];

    div.innerHTML = '<div id="' + UserLiveFeed_ids[0] + id + '" class="stream_thumbnail_player_feed"><div class="stream_thumbnail_live_img"><img id="' +
        UserLiveFeed_ids[1] + id + '" class="stream_img" alt="" src="' + image + '" onerror="this.onerror=null;this.src=\'' + IMG_404_VOD +
        '\';" ></div><div class="stream_thumbnail_feed_text_holder"><div class="stream_text_holder"><div style="line-height: 2vh; transform: translateY(10%);"><div id="' +
        UserLiveFeed_ids[2] + id + '" class="stream_info_live_name" style="width:' +
        (ishosting ? '99%; max-height: 2.4em; white-space: normal;' : '63.5%; white-space: nowrap; text-overflow: ellipsis;') + ' display: inline-block; overflow: hidden;">' +
        '<i class="icon-' + (data[8] ? 'refresh' : 'circle') + ' live_icon strokedeline' + (force_VOD ? ' hideimp' : '') + '" style="color: ' +
        (data[8] ? '#FFFFFF' : ishosting ? '#FED000' : 'red') + ';"></i> ' +
        (Extra_vodimg || force_VOD ? ('<div class="vodicon_text ' + (force_VOD ? '' : 'hideimp') + '" style="background: #00a94b;">&nbsp;&nbsp;VOD&nbsp;&nbsp;</div>&nbsp;') :
            '<div style="display: none;"></div>') + //empty div to prevent error when childNodes[2].classList.remove
        data[1] + '</div><div class="stream_info_live" style="width:' + (ishosting ? 0 : 36) +
        '%; float: right; text-align: right; display: inline-block; font-size: 70%;">' +
        data[5] + '</div></div><div class="' + (Extra_when ? 'stream_info_live_title_single_line' : 'stream_info_live_title') +
        '">' + Main_ReplaceLargeFont(twemoji.parse(data[2])) +
        '</div><div class="stream_info_live">' + (data[3] !== "" ? STR_PLAYING + data[3] : "") +
        '</div><div class="stream_info_live">' + data[11] + data[4] + '</div>' +
        (Extra_when ? ('<div class="stream_info_live">' + STR_WATCHED + Main_videoCreatedAtWithHM(Extra_when) + STR_BR +
            STR_UNTIL + Play_timeMs(Extra_when - (new Date(data[12]).getTime())) + '</div>') : '') +
        '</div></div></div>';

    return div;
}

function UserLiveFeedobj_CreatVodFeed(id, data, Extra_when, Extra_until) {
    var div = document.createElement('div');

    div.setAttribute('id', UserLiveFeed_ids[3] + id);
    div.setAttribute(Main_DataAttribute, JSON.stringify(data));

    div.className = 'user_feed_thumb';

    div.innerHTML = '<div id="' + UserLiveFeed_ids[0] + id +
        '" class="stream_thumbnail_player_feed"><div class="stream_thumbnail_live_img"><img id="' + UserLiveFeed_ids[1] + id + '" class="stream_img" alt="" src="' + data[0] +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_VOD +
        '\';"></div><div class="stream_thumbnail_feed_text_holder"><div class="stream_text_holder"><div style="line-height: 2vh; transform: translateY(10%);"><div id="' +
        UserLiveFeed_ids[2] + id + '" class="stream_info_live_name" style="width:63.5%; white-space: nowrap; text-overflow: ellipsis; display: inline-block; overflow: hidden;">' +
        '<i class="icon-circle live_icon strokedeline" style="color: #00a94b;"></i> ' + data[1] +
        '</div><div class="stream_info_live" style="width:36%; float: right; text-align: right; display: inline-block; font-size: 70%;">' +
        data[5] + '</div></div><div class="' + (Extra_when ? 'stream_info_live_title_single_line' : 'stream_info_live_title') +
        '">' + data[10] + '</div>' + '<div class="stream_info_live">' + (data[3] !== "" && data[3] !== null ? STR_STARTED + STR_PLAYING + data[3] : "") + '</div>' +
        '<div style="line-height: 2vh;"><div class="stream_info_live" style="width: 74%; display: inline-block;">' + data[2] +
        '</div><div class="stream_info_live" style="width: 26%; display: inline-block; float: right; text-align: right;">' +
        Play_timeS(data[11]) + '</div></div><div class="stream_info_live_title" style="font-family: \'Roboto\';">' +
        data[4] + (Extra_when ? (', ' + STR_WATCHED + Main_videoCreatedAtWithHM(Extra_when) + STR_SPACE +
            STR_UNTIL + Play_timeS(Extra_until)) : '') + '</div></div></div>';

    return div;
}

function UserLiveFeedobj_CreatGameFeed(id, data) {
    var div = document.createElement('div');
    data[14] = data[2];//To make UserLiveFeed_LastPos work

    div.setAttribute('id', UserLiveFeed_ids[3] + id);
    div.setAttribute(Main_DataAttribute, JSON.stringify(data));

    div.className = 'user_feed_thumb_game';
    div.innerHTML = '<div id="' + UserLiveFeed_ids[0] + id +
        '" class="stream_thumbnail_game_feed"><div class="stream_thumbnail_feed_game"><img id="' +
        UserLiveFeed_ids[1] + id + '" class="stream_img" alt="" src="' +
        data[3].replace("{width}x{height}", Main_GameSize) + '" onerror="this.onerror=null;this.src=\'' +
        IMG_404_GAME + '\';"></div><div class="stream_thumbnail_game_feed_text_holder"><div class="stream_text_holder"><div id="' +
        UserLiveFeed_ids[2] + id + '" class="stream_info_game_name">' + data[0] + '</div>' +
        (data[1] !== '' ? '<div class="stream_info_live" style="width: 100%; display: inline-block;">' + data[1] + '</div>' : '') +
        '</div></div></div>';

    return div;
}

//Base video fun
function UserLiveFeedobj_loadDataSuccess(responseText) {
    //Main_Log('UserLiveFeedobj_loadDataSuccess');

    var response = JSON.parse(responseText),
        response_items,
        sorting = Settings_Obj_default('live_feed_sort'),
        stream, id, mArray,
        i = 0,
        itemsCount = UserLiveFeed_itemsCount[UserLiveFeedobj_UserLivePos];

    response = response.streams;
    response_items = response.length;

    if (response_items) {

        var sorting_type1 = UserLiveFeedobj_FeedSort[sorting][0],
            sorting_type2 = UserLiveFeedobj_FeedSort[sorting][1],
            sorting_direction = UserLiveFeedobj_FeedSort[sorting][2];

        if (sorting_direction) {
            //A-Z
            if (sorting_type1) {
                response.sort(function(a, b) {
                    return (a[sorting_type1][sorting_type2] < b[sorting_type1][sorting_type2] ? -1 :
                        (a[sorting_type1][sorting_type2] > b[sorting_type1][sorting_type2] ? 1 : 0));
                });
            } else {
                response.sort(function(a, b) {
                    return (a[sorting_type2] < b[sorting_type2] ? -1 :
                        (a[sorting_type2] > b[sorting_type2] ? 1 : 0));
                });
            }
        } else {
            //Z-A
            if (sorting_type1) {
                response.sort(function(a, b) {
                    return (a[sorting_type1][sorting_type2] > b[sorting_type1][sorting_type2] ? -1 :
                        (a[sorting_type1][sorting_type2] < b[sorting_type1][sorting_type2] ? 1 : 0));
                });
            } else {
                response.sort(function(a, b) {
                    return (a[sorting_type2] > b[sorting_type2] ? -1 :
                        (a[sorting_type2] < b[sorting_type2] ? 1 : 0));
                });
            }
        }

        for (i; i < response_items; i++) {
            stream = response[i];
            id = stream.channel._id;

            if (!UserLiveFeed_idObject[UserLiveFeedobj_UserLivePos].hasOwnProperty(id)) {

                UserLiveFeed_idObject[UserLiveFeedobj_UserLivePos][id] = itemsCount;
                mArray = ScreensObj_LiveCellArray(stream);
                UserLiveFeed_PreloadImgs.push(mArray[0]);

                UserLiveFeed_cell[UserLiveFeedobj_UserLivePos][itemsCount] =
                    UserLiveFeedobj_CreatFeed(
                        UserLiveFeedobj_UserLivePos + '_' + itemsCount,
                        mArray
                    );

                Sidepannel_ScroolDoc.appendChild(
                    UserLiveFeedobj_CreatSideFeed(
                        itemsCount,
                        mArray
                    )
                );

                itemsCount++;
            }
        }

    } else UserLiveFeedobj_Empty(UserLiveFeedobj_UserLivePos);

    // UserLiveFeed_cell[UserLiveFeedobj_UserLivePos][itemsCount] =
    //     UserLiveFeedobj_CreatFeed(UserLiveFeedobj_UserLivePos + '_' + itemsCount,
    //         [
    //             IMG_404_VIDEO,
    //             "offlineteste",
    //             "title",
    //             "game",
    //             "for 1000 Viewers",
    //             "1440p90 [EN]",
    //             "offlineteste",
    //             10000000000,
    //             true,
    //             IMG_404_LOGO,
    //             true,
    //             "Since 11:04:36&nbsp;",
    //             "2020-01-25T09:49:05Z",
    //             1000,
    //             35618666]
    //     );
    // itemsCount++;

    UserLiveFeed_itemsCount[UserLiveFeedobj_UserLivePos] = itemsCount;

    Main_setTimeout(
        function() {
            if (UserLiveFeed_idObject[UserLiveFeedobj_UserLivePos].hasOwnProperty(UserLiveFeed_LastPos[UserLiveFeedobj_UserLivePos]))
                UserLiveFeed_FeedPosY[UserLiveFeedobj_UserLivePos] = UserLiveFeed_idObject[UserLiveFeedobj_UserLivePos][UserLiveFeed_LastPos[UserLiveFeedobj_UserLivePos]];

            Sidepannel_Positions = JSON.parse(JSON.stringify(UserLiveFeed_idObject[UserLiveFeedobj_UserLivePos]));
            if (Sidepannel_Positions.hasOwnProperty(UserSidePannel_LastPos))
                Sidepannel_PosFeed = Sidepannel_Positions[UserSidePannel_LastPos];

            Sidepannel_PreloadImgs();
            UserLiveFeed_loadDataSuccessFinish(UserLiveFeedobj_UserLivePos);

            if (Settings_notification_check_any_enable()) OSInterface_RunNotificationService();
        },
        25
    );
}

//User VOD Start
var UserLiveFeedobj_VodFeedOldUserName = '';
function UserLiveFeedobj_ShowUserVod() {
    UserLiveFeedobj_SetBottomText(8);

    if (AddUser_UserIsSet()) {
        UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_UserVodPos, (UserLiveFeedobj_VodFeedOldUserName !== AddUser_UsernameArray[0].name));
        UserLiveFeedobj_VodFeedOldUserName = AddUser_UsernameArray[0].name;
    }
}

function UserLiveFeedobj_HideUserVod() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_UserVodPos].div.classList.add('hide');
}

function UserLiveFeedobj_UserVod() {
    if (!UserLiveFeed_obj[UserLiveFeedobj_UserVodPos].loadingMore) UserLiveFeedobj_StartDefault(UserLiveFeedobj_UserVodPos);
    UserLiveFeedobj_loadUserVod();
}

function UserLiveFeedobj_loadUserVod() {
    UserLiveFeedobj_loadUserVodGet(
        Main_kraken_api + 'videos/followed?limit=100&broadcast_type=archive&sort=time&offset=' +
        UserLiveFeed_obj[UserLiveFeedobj_UserVodPos].offset + Main_TwithcV5Flag
    );
}

function UserLiveFeedobj_loadUserVodGet(theUrl) {
    //Main_Log('UserLiveFeedobj_loadUserVodGet');
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = DefaultHttpGetTimeout + (UserLiveFeed_loadingDataTry[UserLiveFeedobj_UserVodPos] * DefaultHttpGetTimeoutPlus);

    Main_Headers[2][1] = Main_OAuth + AddUser_UsernameArray[0].access_token;

    for (var i = 0; i < 3; i++)
        xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) UserLiveFeedobj_loadUserVodGetEnd(xmlHttp);
    };

    xmlHttp.send(null);
}

function UserLiveFeedobj_loadUserVodGetEnd(xmlHttp) {
    //Main_Log('UserLiveFeedobj_loadUserVodGetEnd ' + xmlHttp.status);
    if (xmlHttp.status === 200) {
        UserLiveFeedobj_loadDataBaseVodSuccess(xmlHttp.responseText, UserLiveFeedobj_UserVodPos);
    } else if (UserLiveFeed_token && (xmlHttp.status === 401 || xmlHttp.status === 403)) { //token expired
        //Token has change or because is new or because it is invalid because user delete in twitch settings
        // so callbackFuncOK and callbackFuncNOK must be the same to recheck the token
        AddCode_refreshTokens(0, 0, UserLiveFeedobj_loadUserVod, UserLiveFeedobj_loadUserVodGetError);
    } else {
        UserLiveFeedobj_loadDataError(UserLiveFeedobj_UserVodPos);
    }
}

function UserLiveFeedobj_loadUserVodGetError() {
    //Main_Log('UserLiveFeedobj_loadDataRefreshTokenError');
    UserLiveFeedobj_loadDataError(UserLiveFeedobj_UserVodPos);
}

function UserLiveFeedobj_loadDataBaseVodSuccess(responseText, pos) {

    var response = JSON.parse(responseText),
        response_items,
        id, mArray,
        i = 0,
        itemsCount = UserLiveFeed_itemsCount[pos];

    //return;

    response = response.videos;
    response_items = response.length;

    if (response_items) {

        for (i; i < response_items; i++) {
            id = response[i]._id;

            if (!UserLiveFeed_idObject[pos].hasOwnProperty(id)) {

                UserLiveFeed_idObject[pos][id] = itemsCount;
                mArray = ScreensObj_VodCellArray(response[i]);

                // if (Main_A_includes_B(mArray[0] + '', '404_processing')) {
                //     mArray[0] = 'https://static-cdn.jtvnw.net/s3_vods/' + mArray[8].split('/')[3] +
                //         '/thumb/thumb0-' + Main_VideoSize + '.jpg'
                // }

                UserLiveFeed_cell[pos][itemsCount] =
                    UserLiveFeedobj_CreatVodFeed(
                        pos + '_' + itemsCount,
                        mArray
                    );

                itemsCount++;
            }
        }

    } else UserLiveFeedobj_Empty(pos);

    UserLiveFeed_itemsCount[pos] = itemsCount;

    if (UserLiveFeed_obj[pos].HasMore) {

        UserLiveFeed_obj[pos].offset = UserLiveFeed_cell[pos].length;

        if (!response_items || response_items < (Main_ItemsLimitMax - 5)) UserLiveFeed_obj[pos].dataEnded = true;

    }

    if (UserLiveFeed_obj[pos].loadingMore) {
        UserLiveFeed_obj[pos].loadingMore = false;
        if (pos === UserLiveFeed_FeedPosX) UserLiveFeed_CounterDialog(UserLiveFeed_FeedPosY[pos], UserLiveFeed_itemsCount[pos]);
    } else {
        Main_setTimeout(
            function() {

                if (UserLiveFeed_idObject[pos].hasOwnProperty(UserLiveFeed_LastPos[pos]))
                    UserLiveFeed_FeedPosY[pos] = UserLiveFeed_idObject[pos][UserLiveFeed_LastPos[pos]];

                UserLiveFeed_loadDataSuccessFinish(pos);
            },
            25
        );
    }
}
//User VOD end

//User VOD history
var UserLiveFeedobj_VodHistoryFeedOldUserName = '';
function UserLiveFeedobj_ShowUserVodHistory() {
    UserLiveFeedobj_SetBottomText(9);

    if (AddUser_UserIsSet()) {
        UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_UserVodHistoryPos, (UserLiveFeedobj_VodHistoryFeedOldUserName !== AddUser_UsernameArray[0].name));
        UserLiveFeedobj_VodHistoryFeedOldUserName = AddUser_UsernameArray[0].name;
    }
}

function UserLiveFeedobj_HideUserVodHistory() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_UserVodHistoryPos].div.classList.add('hide');
}

function UserLiveFeedobj_UserVodHistory() {
    UserLiveFeedobj_StartDefault(UserLiveFeedobj_UserVodHistoryPos);

    var pos = UserLiveFeedobj_UserVodHistoryPos,
        response = JSON.parse(JSON.stringify(Main_values_History_data[AddUser_UsernameArray[0].id].vod)),
        response_items,
        len = response.length,
        cell, id,
        i = 0,
        itemsCount = UserLiveFeed_itemsCount[pos];

    response.sort(
        function(a, b) {
            return (a.date > b.date ? -1 : (a.date < b.date ? 1 : 0));
        }
    );

    response_items = Math.min(len, 100);

    if (response_items) {

        for (i; i < response_items; i++) {
            cell = response[i];
            id = cell.data[7];

            if (!UserLiveFeed_idObject[pos].hasOwnProperty(id)) {

                UserLiveFeed_idObject[pos][id] = itemsCount;

                UserLiveFeed_cell[pos][itemsCount] =
                    UserLiveFeedobj_CreatVodFeed(
                        pos + '_' + itemsCount,
                        cell.data,
                        cell.date,
                        cell.watched
                    );

                itemsCount++;
            }
        }

        if (!itemsCount) UserLiveFeedobj_Empty(pos);
    } else UserLiveFeedobj_Empty(pos);

    UserLiveFeed_itemsCount[pos] = itemsCount;

    if (UserLiveFeed_idObject[pos].hasOwnProperty(UserLiveFeed_LastPos[pos]))
        UserLiveFeed_FeedPosY[pos] = UserLiveFeed_idObject[pos][UserLiveFeed_LastPos[pos]];

    UserLiveFeed_loadDataSuccessFinish(pos);
}
//User VOD history end

function UserLiveFeedobj_loadDataBaseLiveSuccess(responseText, pos) {
    var response = JSON.parse(responseText),
        total = response._total,
        response_items,
        stream, id, mArray,
        i = 0,
        itemsCount = UserLiveFeed_itemsCount[pos];

    response = response[UserLiveFeed_obj[pos].StreamType];
    response_items = response.length;

    if (response_items) {
        if (pos === UserLiveFeedobj_FeaturedPos) {
            var sorting = Settings_Obj_default('live_feed_sort');

            var sorting_type1 = UserLiveFeedobj_FeedSort[sorting][0],
                sorting_type2 = UserLiveFeedobj_FeedSort[sorting][1],
                sorting_direction = UserLiveFeedobj_FeedSort[sorting][2];

            if (sorting_direction) {
                //A-Z
                if (sorting_type1) {
                    response.sort(function(a, b) {
                        return (a.stream[sorting_type1][sorting_type2] < b.stream[sorting_type1][sorting_type2] ? -1 :
                            (a.stream[sorting_type1][sorting_type2] > b.stream[sorting_type1][sorting_type2] ? 1 : 0));
                    });
                } else {
                    response.sort(function(a, b) {
                        return (a.stream[sorting_type2] < b.stream[sorting_type2] ? -1 :
                            (a.stream[sorting_type2] > b.stream[sorting_type2] ? 1 : 0));
                    });
                }
            } else {
                //Z-A
                if (sorting_type1) {
                    response.sort(function(a, b) {
                        return (a.stream[sorting_type1][sorting_type2] > b.stream[sorting_type1][sorting_type2] ? -1 :
                            (a.stream[sorting_type1][sorting_type2] < b.stream[sorting_type1][sorting_type2] ? 1 : 0));
                    });
                } else {
                    response.sort(function(a, b) {
                        return (a.stream[sorting_type2] > b.stream[sorting_type2] ? -1 :
                            (a.stream[sorting_type2] < b.stream[sorting_type2] ? 1 : 0));
                    });
                }
            }
        }

        for (i; i < response_items; i++) {
            stream = UserLiveFeed_obj[pos].cell(response[i]);
            id = stream.channel._id;
            if (!UserLiveFeed_idObject[pos].hasOwnProperty(id)) {

                UserLiveFeed_idObject[pos][id] = itemsCount;
                mArray = ScreensObj_LiveCellArray(stream);

                UserLiveFeed_cell[pos][itemsCount] =
                    UserLiveFeedobj_CreatFeed(
                        pos + '_' + itemsCount,
                        mArray
                    );

                itemsCount++;
            }
        }

    } else UserLiveFeedobj_Empty(pos);

    UserLiveFeed_itemsCount[pos] = itemsCount;

    if (UserLiveFeed_obj[pos].HasMore) {

        UserLiveFeed_obj[pos].offset = UserLiveFeed_cell[pos].length;
        UserLiveFeed_obj[pos].MaxOffset = total;

        if (!response_items) UserLiveFeed_obj[pos].dataEnded = true;
        else if (typeof UserLiveFeed_obj[pos].MaxOffset === 'undefined') {
            if (response_items < 90) UserLiveFeed_obj[pos].dataEnded = true;
        } else {
            if (UserLiveFeed_obj[pos].offset >= total) UserLiveFeed_obj[pos].dataEnded = true;
        }
    }

    if (UserLiveFeed_obj[pos].loadingMore) {
        UserLiveFeed_obj[pos].loadingMore = false;
        if (pos === UserLiveFeed_FeedPosX) UserLiveFeed_CounterDialog(UserLiveFeed_FeedPosY[pos], UserLiveFeed_itemsCount[pos]);
    } else {
        Main_setTimeout(
            function() {

                if (UserLiveFeed_idObject[pos].hasOwnProperty(UserLiveFeed_LastPos[pos]))
                    UserLiveFeed_FeedPosY[pos] = UserLiveFeed_idObject[pos][UserLiveFeed_LastPos[pos]];

                UserLiveFeed_loadDataSuccessFinish(pos);
            },
            25
        );
    }
}

function UserLiveFeedobj_loadDataUserHostSuccess(responseText) {
    var response = JSON.parse(responseText).hosts,
        response_items = response.length,
        stream, id,
        sorting = Settings_Obj_default('live_feed_sort'),
        i = 0,
        itemsCount = UserLiveFeed_itemsCount[UserLiveFeedobj_UserHostPos];

    if (response.length) {

        var sorting_type1 = UserLiveFeedobj_FeedSortHost[sorting][0],
            sorting_type2 = UserLiveFeedobj_FeedSortHost[sorting][1],
            sorting_direction = UserLiveFeedobj_FeedSortHost[sorting][2];

        if (sorting_direction) {
            //A-Z
            if (sorting_type1) {
                response.sort(function(a, b) {
                    return (a[sorting_type2] < b[sorting_type2] ? -1 :
                        (a[sorting_type2] > b[sorting_type2] ? 1 : 0));
                });
            } else {
                response.sort(function(a, b) {
                    return (a.target[sorting_type2] < b.target[sorting_type2] ? -1 :
                        (a.target[sorting_type2] > b.target[sorting_type2] ? 1 : 0));
                });
            }
        } else {
            //Z-A
            if (sorting_type1) {
                response.sort(function(a, b) {
                    return (a[sorting_type2] > b[sorting_type2] ? -1 :
                        (a[sorting_type2] < b[sorting_type2] ? 1 : 0));
                });
            } else {
                response.sort(function(a, b) {
                    return (a.target[sorting_type2] > b.target[sorting_type2] ? -1 :
                        (a.target[sorting_type2] < b.target[sorting_type2] ? 1 : 0));
                });
            }
        }

        for (i; i < response_items; i++) {
            stream = response[i];
            id = stream.target._id;

            if (!UserLiveFeed_idObject[UserLiveFeedobj_UserHostPos].hasOwnProperty(id)) {

                UserLiveFeed_idObject[UserLiveFeedobj_UserHostPos][id] = itemsCount;

                UserLiveFeed_cell[UserLiveFeedobj_UserHostPos][itemsCount] =
                    UserLiveFeedobj_CreatFeed(
                        UserLiveFeedobj_UserHostPos + '_' + itemsCount,
                        ScreensObj_HostCellArray(stream)
                    );

                itemsCount++;
            }
        }

    } else UserLiveFeedobj_Empty(UserLiveFeedobj_UserHostPos);

    UserLiveFeed_itemsCount[UserLiveFeedobj_UserHostPos] = itemsCount;

    Main_setTimeout(
        function() {

            if (UserLiveFeed_idObject[UserLiveFeedobj_UserHostPos].hasOwnProperty(UserLiveFeed_LastPos[UserLiveFeedobj_UserHostPos]))
                UserLiveFeed_FeedPosY[UserLiveFeedobj_UserHostPos] = UserLiveFeed_idObject[UserLiveFeedobj_UserHostPos][UserLiveFeed_LastPos[UserLiveFeedobj_UserHostPos]];

            UserLiveFeed_loadDataSuccessFinish(UserLiveFeedobj_UserHostPos);
        },
        25
    );
}
//Base video fun end

//Base game fun
function UserLiveFeedobj_loadDataBaseGamesSuccess(responseText, pos, type) {
    var response = JSON.parse(responseText),
        total = response._total,
        response_items,
        cell, game,
        i = 0,
        itemsCount = UserLiveFeed_itemsCount[pos];

    response = response[type];
    response_items = response.length;

    if (response_items) {

        if (pos === UserLiveFeedobj_UserGamesPos) {
            var sorting = Settings_Obj_default('game_feed_sort');

            var sorting_type1 = UserLiveFeedobj_FeedSortGames[sorting][0],
                sorting_type2 = UserLiveFeedobj_FeedSortGames[sorting][1],
                sorting_direction = UserLiveFeedobj_FeedSortGames[sorting][2];

            if (sorting_direction) {
                //A-Z
                if (sorting_type1) {
                    response.sort(function(a, b) {
                        return (a[sorting_type1][sorting_type2] < b[sorting_type1][sorting_type2] ? -1 :
                            (a[sorting_type1][sorting_type2] > b[sorting_type1][sorting_type2] ? 1 : 0));
                    });
                } else {
                    response.sort(function(a, b) {
                        return (a[sorting_type2] < b[sorting_type2] ? -1 :
                            (a[sorting_type2] > b[sorting_type2] ? 1 : 0));
                    });
                }
            } else {
                //Z-A
                if (sorting_type1) {
                    response.sort(function(a, b) {
                        return (a[sorting_type1][sorting_type2] > b[sorting_type1][sorting_type2] ? -1 :
                            (a[sorting_type1][sorting_type2] < b[sorting_type1][sorting_type2] ? 1 : 0));
                    });
                } else {
                    response.sort(function(a, b) {
                        return (a[sorting_type2] > b[sorting_type2] ? -1 :
                            (a[sorting_type2] < b[sorting_type2] ? 1 : 0));
                    });
                }
            }
        }

        for (i; i < response_items; i++) {
            cell = response[i];
            game = cell.game;

            if (!UserLiveFeed_idObject[pos].hasOwnProperty(game._id)) {

                UserLiveFeed_idObject[pos][game._id] = itemsCount;

                UserLiveFeed_cell[pos][itemsCount] =
                    UserLiveFeedobj_CreatGameFeed(
                        pos + '_' + itemsCount,
                        [
                            game.name,//0
                            Main_addCommas(cell.channels) + STR_SPACE + STR_CHANNELS + STR_BR + STR_FOR +
                            Main_addCommas(cell.viewers) + STR_SPACE + STR_VIEWER,//1
                            game._id,//2
                            game.box.template//3
                        ]
                    );

                itemsCount++;
            }
        }
    } else UserLiveFeedobj_Empty(pos);

    UserLiveFeed_itemsCount[pos] = itemsCount;

    if (UserLiveFeed_obj[pos].HasMore) {
        UserLiveFeed_obj[pos].offset = UserLiveFeed_cell[pos].length;
        UserLiveFeed_obj[pos].MaxOffset = total;
        if (UserLiveFeed_obj[pos].offset >= total || !response_items) UserLiveFeed_obj[pos].dataEnded = true;
    }

    if (UserLiveFeed_obj[pos].loadingMore) {
        UserLiveFeed_obj[pos].loadingMore = false;
        if (pos === UserLiveFeed_FeedPosX) UserLiveFeed_CounterDialog(UserLiveFeed_FeedPosY[pos], UserLiveFeed_itemsCount[pos]);
    } else {
        Main_setTimeout(
            function() {

                if (UserLiveFeed_idObject[pos].hasOwnProperty(UserLiveFeed_LastPos[pos]))
                    UserLiveFeed_FeedPosY[pos] = UserLiveFeed_idObject[pos][UserLiveFeed_LastPos[pos]];

                UserLiveFeed_loadDataSuccessFinish(pos);
            },
            25
        );
    }
}
//Base game fun end

function UserLiveFeedobj_CheckOffset(pos) {
    if ((UserLiveFeed_obj[pos].offset >= 900) ||
        ((typeof UserLiveFeed_obj[pos].MaxOffset !== 'undefined') &&
            UserLiveFeed_obj[pos].offset &&
            (UserLiveFeed_obj[pos].offset + 100) > UserLiveFeed_obj[pos].MaxOffset))
        UserLiveFeed_obj[pos].dataEnded = true;
}