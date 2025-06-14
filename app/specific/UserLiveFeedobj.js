/*
 * Copyright (c) 2017–present Felipe de Leon <fglfgl27@gmail.com>
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
var UserLiveFeedobj_UserGamesPos = 7;
var UserLiveFeedobj_UserAGamesPos = 8;
var UserLiveFeedobj_UserVodPos = 9;
var UserLiveFeedobj_UserVodHistoryPos = 10;

var UserLiveFeedobj_FeedSort = [
    [null, 'viewersCount', 0], //0
    [null, 'viewersCount', 1], //1
    ['broadcaster', 'login', 1], //2
    ['broadcaster', 'login', 0], //3
    ['game', 'displayName', 1], //4
    ['game', 'displayName', 0], //5
    [null, 'createdAt', 0], //6
    [null, 'createdAt', 1] //7
];

var UserLiveFeedobj_FeedFeatureSort = [
    [null, 'viewersCount', 0], //0
    [null, 'viewersCount', 1], //1
    ['broadcaster', 'login', 1], //2
    ['broadcaster', 'login', 0], //3
    ['game', 'displayName', 1], //4
    ['game', 'displayName', 0], //5
    [null, 'createdAt', 0], //6
    [null, 'createdAt', 1] //7
];

// var UserLiveFeedobj_FeedSortGames = [
//     [null, 'viewers', 0],//0
//     [null, 'viewers', 1],//2
//     ['game', 'name', 1],//3
//     ['game', 'name', 0],//4
//     [null, 'channels', 0],//5
//     [null, 'channels', 1]//6
// ];

// var UserLiveFeedobj_FeedSortHost = [
//     [null, 'viewers', 0],//0
//     [null, 'viewers', 1],//1
//     ['channel', 'name', 1],//2
//     ['channel', 'name', 0],//3
//     [null, 'meta_game', 1],//4
//     [null, 'meta_game', 0],//5
//     [null, 'created_at', 0],//6
//     [null, 'created_at', 1]//7
// ];

//Check bellow java before define more current max is 0 to 24, 1 is used by the side panel
//public String[][] ExtraPlayerHandlerResult = new String[25][100];

var UserLiveFeed_FeedPosX = UserLiveFeedobj_UserLivePos; //Default pos
var UserLiveFeedobj_MAX = UserLiveFeedobj_UserVodHistoryPos;
var UserLiveFeedobj_MAX_No_user = UserLiveFeedobj_LivePos;

function UserLiveFeedobj_StartDefault(pos) {
    if (UserLiveFeed_status[pos]) {
        if (UserLiveFeed_ObjNotNull(pos)) {
            Main_values.UserLiveFeed_LastPositionId[pos] =
                UserLiveFeed_DataObj[pos][UserLiveFeed_FeedPosY[pos]][UserLiveFeed_FeedPosX >= UserLiveFeedobj_UserVodPos ? 7 : 14];

            if (!UserLiveFeed_obj[pos].Game_changed) {
                Main_values.UserLiveFeed_LastPosition[pos] = UserLiveFeed_FeedPosY[pos] < 100 ? UserLiveFeed_FeedPosY[pos] : 0;
            }
        }
    }

    Main_date_Ms = new Date().getTime();
    UserLiveFeed_lastRefresh[pos] = new Date().getTime();
    UserLiveFeed_obj[pos].offsettopFontsize = Settings_Obj_default('global_font_offset');
    UserLiveFeed_cell[pos] = [];
    UserLiveFeed_idObject[pos] = {};
    UserLiveFeed_DataObj[pos] = {};

    UserLiveFeed_itemsCount[pos] = 0;
    Main_emptyWithEle(UserLiveFeed_obj[pos].div);
    UserLiveFeed_status[pos] = false;
    UserLiveFeed_FeedPosY[pos] = 0;
    UserLiveFeed_FeedSetPosLast[pos] = 0;
    UserLiveFeed_obj[pos].offset = 0;
    UserLiveFeed_obj[pos].loadingMore = false;
    UserLiveFeed_obj[pos].cursor = null;
    UserLiveFeed_obj[pos].dataEnded = false;
    UserLiveFeed_obj[pos].div.style.transform = 'translateX(0px)';

    UserLiveFeed_obj[pos].sorting = Settings_value.live_feed_sort.defaultValue;
    UserLiveFeed_obj[pos].ContentLang = Main_ContentLang;
    UserLiveFeed_obj[pos].Lang = Settings_AppLang;
    UserLiveFeed_obj[pos].enable_mature = Settings_value.enable_mature.defaultValue;

    if (UserLiveFeed_isPreviewShowing()) {
        UserLiveFeed_obj[pos].div.classList.remove('hide');
    }
}

function UserLiveFeedobj_CheckToken() {
    Main_clearTimeout(Main_CheckResumeFeedId);

    if (UserLiveFeed_status[UserLiveFeedobj_UserLivePos] && Sidepannel_ObjNotNull(UserLiveFeedobj_UserLivePos)) {
        Main_values.UserSidePannel_LastPositionId = UserLiveFeed_DataObj[UserLiveFeedobj_UserLivePos][Sidepannel_PosFeed][14];
        Main_values.UserSidePannel_LastPosition = Sidepannel_PosFeed;
    }

    Main_ShowElementWithEle(Sidepannel_SidepannelLoadingDialog);
    UserLiveFeed_PreloadImgs = [];
    Sidepannel_PosFeed = 0;
    Main_emptyWithEle(Sidepannel_ScroolDoc);
    Main_textContentWithEle(Sidepannel_PosCounter, '');
    Sidepannel_Html = '';
    Main_getElementById('side_panel_warn').style.display = 'none';

    UserLiveFeed_loadChannelOffsset = 0;
    UserLiveFeed_followerChannels = [];

    UserLiveFeedobj_StartDefault(UserLiveFeedobj_UserLivePos);

    UserLiveFeed_token = AddUser_UsernameArray[0].access_token;

    UserLiveFeed_token = Bearer + UserLiveFeed_token;
    UserLiveFeedobj_loadChannelUserLive();

    //Main_Log('UserLiveFeedobj_CheckToken end');
}

function UserLiveFeedobj_loadDataPrepare(pos) {
    UserLiveFeed_loadingData[pos] = true;
    Screens_Some_Screen_Is_Refreshing = true;
}

function UserLiveFeedobj_BaseLoad(url, callback, CheckOffset, pos) {
    if (CheckOffset) UserLiveFeedobj_CheckOffset(pos);

    BaseXmlHttpGet(url, callback, UserLiveFeedobj_loadDataError, pos, null, UserLiveFeed_obj[pos].useHelix);
}

function UserLiveFeedobj_loadDataError(pos) {
    if (!UserLiveFeed_obj[pos].loadingMore) {
        UserLiveFeed_loadingData[pos] = false;
        Screens_Some_Screen_Is_Refreshing = false;
        UserLiveFeed_Showloading(false);
        Main_HideElementWithEle(Sidepannel_SidepannelLoadingDialog);

        if (UserLiveFeed_isPreviewShowing() && pos === UserLiveFeed_FeedPosX) {
            if (pos === UserLiveFeedobj_UserLivePos && (!AddUser_UserIsSet() || !AddUser_UsernameArray[0].access_token)) {
                UserLiveFeedobj_HolderDiv(pos, STR_NOKUSER_WARNING);
            } else {
                UserLiveFeedobj_HolderDiv(pos, STR_REFRESH_PROBLEM);
            }
        }

        if (pos === UserLiveFeedobj_UserLivePos && Sidepannel_isShowingUserLive()) {
            Main_HideWarningDialog();
            Sidepannel_showWarningDialog(STR_REFRESH_PROBLEM, 5000);
        }
    } else {
        UserLiveFeed_obj[pos].loadingMore = false;
        UserLiveFeed_obj[pos].dataEnded = true;
    }
}

function UserLiveFeedobj_Empty(pos) {
    UserLiveFeedobj_HolderDiv(
        pos,
        pos === UserLiveFeedobj_UserVodHistoryPos || pos === UserLiveFeedobj_UserHistoryPos ? STR_HISTORY_EMPTY_CONTENT : STR_REFRESH_PROBLEM
    );
}

function UserLiveFeedobj_HolderDiv(pos, text) {
    Main_innerHTMLWithEle(
        UserLiveFeed_obj[pos].div,
        '<div class="strokicon" style="max-width: 100%;word-wrap: break-word;white-space: normal;color: #FFFFFF;text-align: center;vertical-align: middle;transform: translateY(20vh);font-size: 150%;"> ' +
            text +
            '</div>'
    );
}

var UserLiveFeedobj_LiveFeedOldUserName = '';
function UserLiveFeedobj_ShowFeed() {
    UserLiveFeedobj_SetBottomText(UserLiveFeedobj_UserLivePos - 1);

    if (AddUser_UserIsSet()) {
        UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_UserLivePos, UserLiveFeedobj_LiveFeedOldUserName !== AddUser_UsernameArray[0].name);
        UserLiveFeedobj_LiveFeedOldUserName = AddUser_UsernameArray[0].name;
    }
}

function UserLiveFeedobj_ShowFeedCheck(pos, forceRefressh) {
    if (Main_isScene2DocVisible() && !UserLiveFeed_isPreviewShowing()) {
        UserLiveFeed_Show();
    }

    if (
        forceRefressh ||
        !UserLiveFeed_ObjNotNull(pos) ||
        new Date().getTime() > UserLiveFeed_lastRefresh[pos] + Settings_GetAutoRefreshTimeout() ||
        UserLiveFeed_obj[pos].offsettopFontsize !== Settings_Obj_default('global_font_offset') ||
        !UserLiveFeed_obj[pos].AddCellsize ||
        (UserLiveFeed_obj[pos].CheckContentLang && !Main_A_equals_B(UserLiveFeed_obj[pos].ContentLang, Main_ContentLang)) ||
        (UserLiveFeed_obj[pos].CheckSort && !Main_A_equals_B(UserLiveFeed_obj[pos].sorting, Settings_value.live_feed_sort.defaultValue)) ||
        UserLiveFeed_obj[pos].enable_mature !== Settings_value.enable_mature.defaultValue ||
        !Main_A_equals_B(UserLiveFeed_obj[pos].Lang, Settings_AppLang)
    ) {
        if (UserLiveFeed_loadingData[pos]) {
            if (UserLiveFeed_isPreviewShowing()) {
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

    if (UserLiveFeed_obj[pos].Screen) {
        Main_EventScreen(UserLiveFeed_obj[pos].Screen);
    }
}

function UserLiveFeedobj_SetLastRefresh(pos) {
    if (!UserLiveFeed_lastRefresh[pos]) return;

    Main_innerHTML('feed_last_refresh', STR_LAST_REFRESH + Play_timeDay(new Date().getTime() - UserLiveFeed_lastRefresh[pos]));
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

function UserLiveFeedobj_ShowHistory() {
    UserLiveFeedobj_SetBottomText(UserLiveFeedobj_UserHistoryPos - 1);

    if (AddUser_UserIsSet()) {
        UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_UserHistoryPos);
    }
}

function UserLiveFeedobj_History() {
    var array = Main_values_History_data[AddUser_UsernameArray[0].id].live,
        pos = UserLiveFeedobj_UserHistoryPos,
        i = 0,
        len = array.length,
        idsObj = {},
        objArray = [],
        idsArray = [];

    UserLiveFeedobj_StartDefault(pos);

    // Sort by date descending
    array.sort(function (a, b) {
        return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    });

    // Get unique items by ID (up to 100)
    for (i; i < len; i++) {
        //keep original if exist as it has lower date
        idsObj[array[i].data[14]] = idsObj[array[i].data[14]] ? idsObj[array[i].data[14]] : array[i];

        if (Object.keys(idsObj).length === 100) {
            break;
        }
    }

    // Convert object to array
    for (var key in idsObj) {
        if (idsObj.hasOwnProperty(key)) {
            objArray.push(idsObj[key]);
        }
    }

    // Sort array by date descending
    objArray.sort(function (a, b) {
        return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    });

    // Extract IDs into array (ES5 compatible)
    for (i = 0; i < objArray.length; i++) {
        idsArray.push(objArray[i].data[14]);
    }

    var ids = JSON.stringify(idsArray).replace(/"/g, '\\"');

    if (idsArray.length) {
        UserLiveFeedobj_HistoryGetLives(ids, pos);
        return;
    }

    UserLiveFeedobj_Empty(pos);

    UserLiveFeed_itemsCount[pos] = 0;

    UserLiveFeedobj_SetLastPosition(pos);

    UserLiveFeed_loadDataSuccessFinish(pos);
}

function UserLiveFeedobj_HistoryGetLives(ids, pos) {
    FullxmlHttpGet(
        PlayClip_BaseUrl,
        Main_OAuth_User_Headers,
        UserLiveFeedobj_HistoryGetLivesEnd,
        noop_fun,
        pos,
        pos, //checkResult
        'POST', //Method, null for get
        userLiveByIdsQuery.replace('%a', ids)
    );
}

function UserLiveFeedobj_HistoryGetLivesEnd(resultObj) {
    if (resultObj.status === 200) {
        UserLiveFeedobj_HistoryGetLiveSuccess(resultObj.responseText);
    } else {
        UserLiveFeedobj_loadDataError(UserLiveFeedobj_UserHistoryPos);
    }
}

function UserLiveFeedobj_HistoryGetLiveSuccess(responseText) {
    var pos = UserLiveFeedobj_UserHistoryPos,
        responseObj = JSON.parse(responseText),
        response = [],
        hasData = responseObj.data && responseObj.data.users;

    if (hasData) {
        UserLiveFeed_obj[pos].dataEnded = true;

        var i = 0,
            len = responseObj.data.users.length;

        for (i; i < len; i++) {
            if (responseObj.data.users[i] && responseObj.data.users[i].stream) {
                response.push(responseObj.data.users[i]);
            }
        }
    } else {
        UserLiveFeed_obj[pos].dataEnded = true;
        UserLiveFeed_obj[pos].cursor = null;
    }

    UserLiveFeed_itemsCount[pos] = 0;

    UserLiveFeedobj_loadDataBaseLiveSuccessEnd(response, response.length, pos, UserLiveFeed_itemsCount[pos]);
}

//Live history end

//Live Start
function UserLiveFeedobj_Live() {
    if (!UserLiveFeed_obj[UserLiveFeedobj_LivePos].loadingMore) UserLiveFeedobj_StartDefault(UserLiveFeedobj_LivePos);
    UserLiveFeedobj_loadLive();
}

function UserLiveFeedobj_loadLive() {
    var key = Main_Live,
        pos = UserLiveFeedobj_LivePos;

    if (
        UserLiveFeed_obj[pos].neverLoaded &&
        ScreenObj[key].data &&
        UserLiveFeed_obj[pos].CheckContentLang &&
        !Main_A_equals_B(UserLiveFeed_obj[pos].ContentLang, Main_ContentLang)
    ) {
        UserLiveFeedobj_loadDataBaseLiveSuccessEnd(ScreenObj[key].data.slice(0, 100), null, pos, UserLiveFeed_itemsCount[pos]);
    } else {
        UserLiveFeedobj_BaseLoad(
            Main_helix_api +
                'streams?first=' +
                Main_ItemsLimitMax +
                (UserLiveFeed_obj[pos].cursor ? '&after=' + UserLiveFeed_obj[pos].cursor : '') +
                (Main_ContentLang !== '' ? '&language=' + Main_ContentLang : ''),
            UserLiveFeedobj_loadDataLiveSuccess,
            true,
            pos
        );
    }
    UserLiveFeed_obj[pos].neverLoaded = false;
}

function UserLiveFeedobj_LiveCell(cell) {
    return cell;
}

function UserLiveFeedobj_loadDataLiveSuccess(responseText) {
    UserLiveFeedobj_loadDataBaseLiveSuccess(responseText, UserLiveFeedobj_LivePos);
}

function UserLiveFeedobj_ShowLive() {
    UserLiveFeedobj_SetBottomText(UserLiveFeedobj_LivePos - 1);

    UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_LivePos);
}

function UserLiveFeedobj_HideLive() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].div.classList.add('hide');
}

//Live end

//Featured Start
function UserLiveFeedobj_Featured(LoadAllLangForced) {
    UserLiveFeedobj_StartDefault(UserLiveFeedobj_FeaturedPos);
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].LoadAllLangForced = LoadAllLangForced;

    UserLiveFeedobj_loadFeatured();
}

function UserLiveFeedobj_loadFeatured() {
    var key = Main_Featured,
        pos = UserLiveFeedobj_FeaturedPos;

    if (
        UserLiveFeed_obj[pos].neverLoaded &&
        ScreenObj[key].data &&
        UserLiveFeed_obj[pos].CheckContentLang &&
        !Main_A_equals_B(UserLiveFeed_obj[pos].ContentLang, Main_ContentLang)
    ) {
        UserLiveFeedobj_loadDataBaseLiveSuccessEnd(ScreenObj[key].data.slice(0, 100), null, pos, UserLiveFeed_itemsCount[pos]);
    } else {
        var lang = Main_ContentLang !== '' && !UserLiveFeed_obj[pos].LoadAllLangForced ? ',language:\\"' + Main_ContentLang + '\\"' : '';

        FullxmlHttpGet(
            PlayClip_BaseUrl,
            Play_base_backup_headers_Array,
            UserLiveFeedobj_loadDataFeaturedSuccess,
            noop_fun,
            UserLiveFeedobj_FeaturedPos,
            UserLiveFeedobj_FeaturedPos, //checkResult
            'POST', //Method, null for get
            featuredQuery.replace('%m', Settings_value.enable_mature.defaultValue ? 'true' : 'false').replace('%x', lang)
        );
    }

    UserLiveFeed_obj[pos].neverLoaded = false;
}

function UserLiveFeedobj_FeaturedCell(cell) {
    return cell.stream;
}

function UserLiveFeedobj_loadDataFeaturedSuccess(resultObj) {
    if (resultObj.status === 200) {
        UserLiveFeedobj_loadDataBaseLiveSuccess(resultObj.responseText, UserLiveFeedobj_FeaturedPos, 'data');
    } else {
        UserLiveFeedobj_loadDataError(UserLiveFeedobj_FeaturedPos);
    }
}

function UserLiveFeedobj_ShowFeatured() {
    UserLiveFeedobj_SetBottomText(UserLiveFeedobj_FeaturedPos - 1);

    UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_FeaturedPos);
}

function UserLiveFeedobj_HideFeatured() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].div.classList.add('hide');
}
//Featured end

//Current game Start
function UserLiveFeedobj_CurrentGame(LoadAllLangForced) {
    if (!UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].loadingMore) {
        UserLiveFeedobj_StartDefault(UserLiveFeedobj_CurrentGamePos);
    }
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].LoadAllLangForced = LoadAllLangForced;

    UserLiveFeedobj_loadCurrentGame();
}

function UserLiveFeedobj_loadCurrentGame() {
    UserLiveFeedobj_CurrentGameName = Play_data.data[18];

    var game = UserLiveFeedobj_CurrentGameName,
        pos = UserLiveFeedobj_CurrentGamePos;

    if (
        game &&
        !UserLiveFeed_itemsCount[pos] &&
        !UserLiveFeed_obj[pos].isReloadScreen &&
        !UserLiveFeed_obj[pos].LoadAllLangForced &&
        UserLiveFeedobj_CheckBackupData(pos, game)
    ) {
        UserLiveFeedobj_oldGameDataLoad(pos, game);
    } else {
        if (!UserLiveFeed_itemsCount[pos] || UserLiveFeed_obj[pos].isReloadScreen) {
            UserLiveFeedobj_backupStartObj(pos, game);

            UserLiveFeed_obj[pos].data[game] = null;
            UserLiveFeed_obj[pos].backup[game].cell = null;
        }

        if (Play_data.data[18]) {
            UserLiveFeedobj_loadCurrentGameGetGames();
        } else {
            UserLiveFeedobj_loadCurrentGameGetGameId();
        }
    }

    UserLiveFeed_obj[pos].isReloadScreen = false;
}

function UserLiveFeedobj_CheckBackupData(pos, game) {
    return (
        UserLiveFeed_obj[pos] &&
        UserLiveFeed_obj[pos].backup[game] &&
        UserLiveFeed_obj[pos].backup[game].data &&
        UserLiveFeed_obj[pos].backup[game].data.length &&
        UserLiveFeed_obj[pos].backup[game].ContentLang === Main_ContentLang &&
        (!Settings_Obj_default('auto_refresh_screen') ||
            new Date().getTime() < UserLiveFeed_obj[pos].backup[game].lastRefresh + Settings_GetAutoRefreshTimeout())
    );
}

function UserLiveFeedobj_loadCurrentGameGetGames() {
    var pos = UserLiveFeedobj_CurrentGamePos;

    var lang = Main_ContentLang !== '' && !UserLiveFeed_obj[pos].LoadAllLangForced ? '&language=' + Main_ContentLang : '';

    UserLiveFeedobj_BaseLoad(
        Main_helix_api +
            'streams?game_id=' +
            Play_data.data[18] +
            '&first=' +
            Main_ItemsLimitMax +
            (UserLiveFeed_obj[pos].cursor ? '&after=' + UserLiveFeed_obj[pos].cursor : '') +
            lang,
        UserLiveFeedobj_loadDataCurrentGameSuccess,
        true,
        pos
    );
}

function UserLiveFeedobj_loadCurrentGameGetGameId() {
    var theUrl = Main_helix_api + 'games?name=' + Play_data.data[3];

    UserLiveFeedobj_BaseLoad(theUrl, UserLiveFeedobj_loadCurrentGameGetGamesSuccess, true, UserLiveFeedobj_CurrentGamePos);
}

function UserLiveFeedobj_loadCurrentGameGetGamesSuccess(responseText) {
    var response = JSON.parse(responseText);

    if (response.data && response.data.length) {
        Play_data.data[18] = response.data[0].id;
        UserLiveFeedobj_loadCurrentGameGetGames();
    } else {
        UserLiveFeedobj_loadDataError(UserLiveFeedobj_CurrentGamePos);
    }
}

function UserLiveFeedobj_oldGameDataLoad(pos, game) {
    UserLiveFeed_lastRefresh[pos] = UserLiveFeed_obj[pos].backup[game].lastRefresh;
    UserLiveFeed_obj[pos].data[game] = JSON.parse(JSON.stringify(UserLiveFeed_obj[pos].backup[game].data));

    if (UserLiveFeed_obj[pos].LastPositionGame[game]) {
        Main_values.UserLiveFeed_LastPosition[pos] = UserLiveFeed_obj[pos].LastPositionGame[game];
    }

    if (UserLiveFeed_obj[pos].backup[game].cell) {
        UserLiveFeed_idObject[pos] = JSON.parse(JSON.stringify(UserLiveFeed_obj[pos].backup[game].idObject));
        UserLiveFeed_DataObj[pos] = JSON.parse(JSON.stringify(UserLiveFeed_obj[pos].backup[game].DataObj));
        UserLiveFeed_cell[pos] = Main_Slice(UserLiveFeed_obj[pos].backup[game].cell);

        UserLiveFeed_itemsCount[pos] = UserLiveFeed_cell[pos].length;

        UserLiveFeedobj_loadDataBaseLiveSuccessFinish(pos, null, UserLiveFeed_itemsCount[pos]);
    } else {
        UserLiveFeedobj_loadDataBaseLiveSuccessEnd(UserLiveFeed_obj[pos].data[game], null, pos, UserLiveFeed_itemsCount[pos], game);
    }
}

function UserLiveFeedobj_CurrentGameCell(cell) {
    return cell;
}

function UserLiveFeedobj_loadDataCurrentGameSuccess(responseText) {
    UserLiveFeedobj_loadDataBaseLiveSuccess(responseText, UserLiveFeedobj_CurrentGamePos, UserLiveFeedobj_CurrentGameName);
}

var UserLiveFeedobj_CurrentGameName = '';
function UserLiveFeedobj_ShowCurrentGame() {
    UserLiveFeedobj_SetBottomText(UserLiveFeedobj_CurrentGamePos - 1);

    UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_CurrentGamePos, !Main_A_equals_B_No_Case(UserLiveFeedobj_CurrentGameName, Play_data.data[18]));
}

function UserLiveFeedobj_HideCurrentGame() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].div.classList.add('hide');

    UserLiveFeedobj_CurrentGameUpdateLastPositionGame();
}

function UserLiveFeedobj_CurrentGameUpdateLastPositionGame() {
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].LastPositionGame[Play_data.data[18]] = UserLiveFeed_FeedPosY[UserLiveFeedobj_CurrentGamePos];
}
//Current game end

//User Games Start
function UserLiveFeedobj_UserGames() {
    if (!UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].loadingMore) UserLiveFeedobj_StartDefault(UserLiveFeedobj_UserGamesPos);
    UserLiveFeedobj_loadUserGames();
}

function UserLiveFeedobj_loadUserGames() {
    UserLiveFeedobj_GamesFeedOldUserName = AddUser_UsernameArray[0].name;

    FullxmlHttpGet(
        PlayClip_BaseUrl,
        Play_base_backup_headers_Array,
        UserLiveFeedobj_loadDataUserGamesSuccess,
        noop_fun,
        UserLiveFeedobj_UserGamesPos,
        UserLiveFeedobj_UserGamesPos, //checkResult
        'POST', //Method, null for get
        userGameQuery.replace('%x', AddUser_UsernameArray[0].id) //postMessage, null for get
    );
}

function UserLiveFeedobj_loadDataUserGamesSuccess(resultObj) {
    if (resultObj.status === 200) {
        UserLiveFeedobj_loadDataBaseGamesSuccess(resultObj.responseText, UserLiveFeedobj_UserGamesPos, 'data');
    } else {
        UserLiveFeedobj_loadDataError(UserLiveFeedobj_UserGamesPos);
    }
}

var UserLiveFeedobj_GamesFeedOldUserName = '';
function UserLiveFeedobj_ShowUserGames() {
    UserLiveFeedobj_SetBottomText(UserLiveFeedobj_UserGamesPos - 1);

    if (AddUser_UserIsSet()) {
        UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_UserGamesPos, UserLiveFeedobj_GamesFeedOldUserName !== AddUser_UsernameArray[0].name);
    }
}

function UserLiveFeedobj_HideUserGames() {
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].div.classList.add('hide');
}
//User Games end

//Current user a game Start
var UserLiveFeedobj_CurrentUserAGameEnable = false;
function UserLiveFeedobj_CurrentUserAGame(LoadAllLangForced) {
    if (!UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].loadingMore) UserLiveFeedobj_StartDefault(UserLiveFeedobj_UserAGamesPos);
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].LoadAllLangForced = LoadAllLangForced;

    UserLiveFeedobj_loadCurrentUserAGame();
}

function UserLiveFeedobj_loadCurrentUserAGame() {
    UserLiveFeedobj_CurrentUserAGameName = UserLiveFeedobj_CurrentUserAGameIdEnter;

    var game = UserLiveFeedobj_CurrentUserAGameIdEnter,
        pos = UserLiveFeedobj_UserAGamesPos;

    if (
        game &&
        !UserLiveFeed_itemsCount[pos] &&
        !UserLiveFeed_obj[pos].isReloadScreen &&
        !UserLiveFeed_obj[pos].LoadAllLangForced &&
        UserLiveFeedobj_CheckBackupData(pos, game)
    ) {
        UserLiveFeedobj_oldGameDataLoad(pos, game);
    } else {
        if (!UserLiveFeed_itemsCount[pos] || UserLiveFeed_obj[pos].isReloadScreen) {
            UserLiveFeedobj_backupStartObj(pos, game);

            UserLiveFeed_obj[pos].data[game] = null;
            UserLiveFeed_obj[pos].backup[game].cell = null;
        }
        var lang = Main_ContentLang !== '' && !UserLiveFeed_obj[pos].LoadAllLangForced ? '&language=' + Main_ContentLang : '';

        var URL =
            Main_helix_api +
            'streams?game_id=' +
            UserLiveFeedobj_CurrentUserAGameIdEnter +
            '&first=' +
            Main_ItemsLimitMax +
            (UserLiveFeed_obj[pos].cursor ? '&after=' + UserLiveFeed_obj[pos].cursor : '') +
            lang;

        UserLiveFeedobj_BaseLoad(URL, UserLiveFeedobj_loadDataCurrentUserGameSuccess, true, pos);
    }

    UserLiveFeed_obj[pos].isReloadScreen = false;
}

function UserLiveFeedobj_CurrentUserGameCell(cell) {
    return cell;
}

function UserLiveFeedobj_loadDataCurrentUserGameSuccess(responseText) {
    UserLiveFeedobj_loadDataBaseLiveSuccess(responseText, UserLiveFeedobj_UserAGamesPos, UserLiveFeedobj_CurrentUserAGameName);
}

var UserLiveFeedobj_CurrentUserAGameName = '';
var UserLiveFeedobj_CurrentUserAGameNameEnter = null;
var UserLiveFeedobj_CurrentUserAGameIdEnter = null;
function UserLiveFeedobj_ShowCurrentUserAGame() {
    UserLiveFeedobj_SetBottomText(UserLiveFeedobj_UserGamesPos - 1);

    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].Game_changed = !Main_A_equals_B_No_Case(
        UserLiveFeedobj_CurrentUserAGameName,
        UserLiveFeedobj_CurrentUserAGameIdEnter
    );

    if (UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].Game_changed || !UserLiveFeedobj_CurrentUserAGameIdEnter) {
        Main_values.UserLiveFeed_LastPosition[UserLiveFeedobj_UserAGamesPos] = 0;
    }

    UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_UserAGamesPos, UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].Game_changed);
    Main_IconLoad('icon_feed_back', 'icon-arrow-left', STR_BACK_USER_GAMES + STR_USER + STR_SPACE_HTML + STR_GAMES);
    if (!Settings_Obj_default('hide_etc_help_text')) Main_RemoveClass('icon_feed_back', 'opacity_zero');
    Main_EventAgame(UserLiveFeedobj_CurrentUserAGameName);
}

function UserLiveFeedobj_HideCurrentUserAGame() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].div.classList.add('hide');

    UserLiveFeedobj_CurrentUserAGameUpdateLastPositionGame();
}

function UserLiveFeedobj_CurrentUserAGameUpdateLastPositionGame() {
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].LastPositionGame[UserLiveFeedobj_CurrentUserAGameIdEnter] =
        UserLiveFeed_FeedPosY[UserLiveFeedobj_UserAGamesPos];
}

//Current user a game end

//Games Start
function UserLiveFeedobj_Games() {
    if (!UserLiveFeed_obj[UserLiveFeedobj_GamesPos].loadingMore) UserLiveFeedobj_StartDefault(UserLiveFeedobj_GamesPos);
    UserLiveFeedobj_loadGames();
}

function UserLiveFeedobj_loadGames() {
    var key = Main_games,
        pos = UserLiveFeedobj_GamesPos;

    if (UserLiveFeed_obj[pos].neverLoaded && ScreenObj[key].data) {
        UserLiveFeed_obj[UserLiveFeedobj_GamesPos].cursor = ScreenObj[key].cursor;
        UserLiveFeed_obj[UserLiveFeedobj_GamesPos].dataEnded = ScreenObj[key].dataEnded;

        UserLiveFeedobj_loadDataGamesSuccessEnd(ScreenObj[key].data.slice(0, 100), ScreenObj[key].MaxOffset, pos, UserLiveFeed_itemsCount[pos]);
    } else {
        FullxmlHttpGet(
            PlayClip_BaseUrl,
            Play_base_backup_headers_Array,
            UserLiveFeedobj_loadDataGamesSuccess,
            noop_fun,
            UserLiveFeedobj_GamesPos,
            UserLiveFeedobj_GamesPos, //checkResult
            'POST', //Method, null for get
            gamesQuery.replace(
                '%y',
                UserLiveFeed_obj[UserLiveFeedobj_GamesPos].cursor ? ', after: \\"' + UserLiveFeed_obj[UserLiveFeedobj_GamesPos].cursor + '\\"' : ''
            )
        );
    }
    UserLiveFeed_obj[pos].neverLoaded = false;
}

function UserLiveFeedobj_loadDataGamesSuccess(resultObj) {
    if (resultObj.status === 200) {
        UserLiveFeedobj_loadDataBaseGamesSuccess(resultObj.responseText, UserLiveFeedobj_GamesPos, 'data');
    } else {
        UserLiveFeedobj_loadDataError(UserLiveFeedobj_GamesPos);
    }
}

function UserLiveFeedobj_ShowGames() {
    UserLiveFeedobj_SetBottomText(UserLiveFeedobj_AGamesPos);

    UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_GamesPos);
}

function UserLiveFeedobj_HideGames() {
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].div.classList.add('hide');
}
//Games end

//Current a game Start
var UserLiveFeedobj_CurrentAGameEnable = false;
function UserLiveFeedobj_CurrentAGame(LoadAllLangForced) {
    if (!UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].loadingMore) UserLiveFeedobj_StartDefault(UserLiveFeedobj_AGamesPos);
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].LoadAllLangForced = LoadAllLangForced;

    UserLiveFeedobj_loadCurrentAGame();
}

function UserLiveFeedobj_loadCurrentAGame() {
    var game = UserLiveFeedobj_CurrentAGameIdEnter,
        pos = UserLiveFeedobj_AGamesPos;

    if (
        game &&
        !UserLiveFeed_itemsCount[pos] &&
        !UserLiveFeed_obj[pos].isReloadScreen &&
        !UserLiveFeed_obj[pos].LoadAllLangForced &&
        UserLiveFeedobj_CheckBackupData(pos, game)
    ) {
        UserLiveFeedobj_oldGameDataLoad(pos, game);
    } else {
        if (!UserLiveFeed_itemsCount[pos] || UserLiveFeed_obj[pos].isReloadScreen) {
            UserLiveFeedobj_backupStartObj(pos, game);

            UserLiveFeed_obj[pos].data[game] = null;
            UserLiveFeed_obj[pos].backup[game].cell = null;
        }

        if (UserLiveFeedobj_CurrentAGameIdEnter) {
            UserLiveFeedobj_loadCurrentAGameGetGames();
        } else {
            UserLiveFeedobj_loadCurrentAGameGetGameId();
        }
    }

    UserLiveFeed_obj[pos].isReloadScreen = false;
}

function UserLiveFeedobj_loadCurrentAGameGetGames() {
    var pos = UserLiveFeedobj_AGamesPos;

    var lang = Main_ContentLang !== '' && !UserLiveFeed_obj[pos].LoadAllLangForced ? '&language=' + Main_ContentLang : '';

    var URL =
        Main_helix_api +
        'streams?game_id=' +
        UserLiveFeedobj_CurrentAGameIdEnter +
        '&first=' +
        Main_ItemsLimitMax +
        (UserLiveFeed_obj[pos].cursor ? '&after=' + UserLiveFeed_obj[pos].cursor : '') +
        lang;

    UserLiveFeedobj_BaseLoad(URL, UserLiveFeedobj_loadDataCurrentAGameSuccess, true, pos);
}

function UserLiveFeedobj_loadCurrentAGameGetGameId() {
    var theUrl = Main_helix_api + 'games?name=' + UserLiveFeedobj_CurrentAGameNameEnter;

    UserLiveFeedobj_BaseLoad(theUrl, UserLiveFeedobj_loadCurrentAGameGetGameIdSuccess, true, UserLiveFeedobj_AGamesPos);
}

function UserLiveFeedobj_loadCurrentAGameGetGameIdSuccess(responseText) {
    var response = JSON.parse(responseText);

    if (response.data && response.data.length) {
        UserLiveFeedobj_CurrentAGameIdEnter = response.data[0].id;
        UserLiveFeedobj_loadCurrentAGameGetGames();
    } else {
        UserLiveFeedobj_loadDataError(UserLiveFeedobj_AGamesPos);
    }
}

function UserLiveFeedobj_CurrentAGameCell(cell) {
    return cell;
}

function UserLiveFeedobj_loadDataCurrentAGameSuccess(responseText) {
    UserLiveFeedobj_loadDataBaseLiveSuccess(responseText, UserLiveFeedobj_AGamesPos, UserLiveFeedobj_CurrentAGameIdEnter);
}

var UserLiveFeedobj_CurrentAGameName = '';
var UserLiveFeedobj_CurrentAGameNameEnter = null;
var UserLiveFeedobj_CurrentAGameIdEnter = null;
function UserLiveFeedobj_ShowCurrentAGame() {
    UserLiveFeedobj_SetBottomText(UserLiveFeedobj_AGamesPos);

    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].Game_changed = !Main_A_equals_B_No_Case(
        UserLiveFeedobj_CurrentAGameName,
        UserLiveFeedobj_CurrentAGameNameEnter
    );

    if (UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].Game_changed || !UserLiveFeedobj_CurrentAGameNameEnter) {
        Main_values.UserLiveFeed_LastPosition[UserLiveFeedobj_AGamesPos] = 0;
    }

    UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_AGamesPos, UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].Game_changed);

    UserLiveFeedobj_CurrentAGameName = UserLiveFeedobj_CurrentAGameNameEnter;
    Main_IconLoad('icon_feed_back', 'icon-arrow-left', STR_BACK_USER_GAMES + STR_GAMES);
    if (!Settings_Obj_default('hide_etc_help_text')) Main_RemoveClass('icon_feed_back', 'opacity_zero');
    Main_EventAgame(UserLiveFeedobj_CurrentAGameName);
}

function UserLiveFeedobj_HideCurrentAGame() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].div.classList.add('hide');

    UserLiveFeedobj_CurrentAGameUpdateLastPositionGame();
}

function UserLiveFeedobj_CurrentAGameUpdateLastPositionGame() {
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].LastPositionGame[UserLiveFeedobj_CurrentAGameIdEnter] =
        UserLiveFeed_FeedPosY[UserLiveFeedobj_AGamesPos];
}
//Current a game end

var UserLiveFeedobj_SetBottomTextId;
function UserLiveFeedobj_SetBottomText(pos) {
    Play_HideWarningMidleDialog();

    var i = 0,
        len = UserLiveFeedobj_MAX - 1;
    for (i; i < len; i++) {
        Main_RemoveClass('feed_end_' + i, 'feed_end_name_focus');
    }

    Main_AddClass('feed_end_' + pos, 'feed_end_name_focus');

    len = UserLiveFeedobj_MAX - 2;

    Main_innerHTML('feed_end_0', UserLiveFeedobj_CurrentAGameEnable ? UserLiveFeedobj_CurrentAGameNameEnter : STR_GAMES);
    Main_innerHTML('feed_end_2', Play_data.data[3] !== '' ? Play_data.data[3] : STR_NO_GAME);
    Main_innerHTML(
        'feed_end_6',
        UserLiveFeedobj_CurrentUserAGameEnable ? UserLiveFeedobj_CurrentUserAGameNameEnter : STR_USER + STR_SPACE_HTML + STR_GAMES
    );

    if (Settings_Obj_default('hide_etc_help_text') === 1) {
        Main_RemoveClass('feed_end', 'opacity_zero');

        UserLiveFeedobj_SetBottomTextId = Main_setTimeout(
            function () {
                Main_AddClass('feed_end', 'opacity_zero');
            },
            1500,
            UserLiveFeedobj_SetBottomTextId
        );
    }
}

function UserLiveFeedobj_CreateSideFeed(id, data) {
    return (
        '<div id="' +
        UserLiveFeed_side_ids[3] +
        id +
        '" class="side_panel_feed"><div id="' +
        UserLiveFeed_side_ids[0] +
        id +
        '" class="side_panel_div"><div id="' +
        UserLiveFeed_side_ids[2] +
        id +
        '" style="width: 100%;"><div id="' +
        UserLiveFeed_side_ids[4] +
        id +
        '" style="display: none;">' +
        data[1] +
        '</div><div id="' +
        UserLiveFeed_side_ids[5] +
        id +
        '" class="side_panel_iner_div1"><img id="' +
        UserLiveFeed_side_ids[1] +
        id +
        '" alt="" class="side_panel_channel_img" src="' +
        data[9] +
        '" onerror="this.onerror=null;this.src=\'' +
        IMG_404_LOGO +
        '\';"></div><div id="' +
        UserLiveFeed_side_ids[6] +
        id +
        '" class="side_panel_iner_div2"><div id="' +
        UserLiveFeed_side_ids[7] +
        id +
        '" class="side_panel_new_title">' +
        Main_ReplaceLargeFont(data[1]) +
        '</div><div id="' +
        UserLiveFeed_side_ids[8] +
        id +
        '" class="side_panel_new_game">' +
        data[3] +
        '</div></div><div id="' +
        UserLiveFeed_side_ids[9] +
        id +
        '" class="side_panel_iner_div3"><div id="' +
        UserLiveFeed_side_ids[10] +
        id +
        '" style="text-align: center;"><i id="' +
        UserLiveFeed_side_ids[11] +
        id +
        '" class="icon-' +
        (!data[8] ? 'circle" style="color: red;' : 'refresh" style="') +
        ' font-size: 55%; "></i><div id="' +
        UserLiveFeed_side_ids[12] +
        id +
        '" style="font-size: 58%;">' +
        data[4] +
        '</div></div></div></div></div></div></div>'
    );
}

function UserLiveFeedobj_CreatFeed(pos, y, id, data, Extra_when, Extra_vodimg, force_VOD) {
    if (!data[1]) data[1] = data[6];
    var div = document.createElement('div');

    div.setAttribute('id', UserLiveFeed_ids[3] + id);
    UserLiveFeed_DataObj[pos][y] = data;

    div.className = 'user_feed_thumb';

    var image = '';

    if (force_VOD) {
        image = Extra_vodimg + Main_randomImg;
    } else {
        image = data[0] ? data[0].replace('{width}x{height}', Main_VideoSize) + Main_randomImg : '';
    }

    div.innerHTML =
        '<div id="' +
        UserLiveFeed_ids[0] +
        id +
        '" class="stream_thumbnail_player_feed"><div class="stream_thumbnail_live_img"><img id="' +
        UserLiveFeed_ids[1] +
        id +
        '" class="stream_img" alt="" src="' +
        image +
        '" onerror="this.onerror=null;this.src=\'' +
        IMG_404_VIDEO +
        '\';" ></div><div class="stream_thumbnail_feed_text_holder"><div class="stream_text_holder"><div style="line-height: 2vh; transform: translateY(10%);"><div id="' +
        UserLiveFeed_ids[2] +
        id +
        '" class="stream_info_live_name" style="width:63.5%; white-space: nowrap; text-overflow: ellipsis; display: inline-block; overflow: hidden;">' +
        '<i class="icon-' +
        (data[8] ? 'refresh' : 'circle') +
        ' live_icon strokedeline' +
        (force_VOD ? ' hideimp' : '') +
        '" style="color: ' +
        (data[8] ? '#FFFFFF' : 'red') +
        ';"></i> ' +
        (Extra_vodimg || force_VOD
            ? '<div class="vodicon_text ' + (force_VOD ? '' : 'hideimp') + '" style="background: #00a94b;">&nbsp;&nbsp;VOD&nbsp;&nbsp;</div>&nbsp;'
            : '<div style="display: none;"></div>') + //empty div to prevent error when childNodes[2].classList.remove
        data[1] +
        '</div><div class="stream_info_live" style="width: 36%; float: right; text-align: right; display: inline-block; font-size: 70%;">' +
        data[5] +
        '</div></div><div class="' +
        (Extra_when ? 'stream_info_live_title_single_line' : 'stream_info_live_title') +
        '" id="' +
        UserLiveFeed_ids[7] +
        id +
        '" >' +
        Main_ReplaceLargeFont(twemoji.parse(data[2])) +
        '</div><div class="stream_info_live" id="' +
        UserLiveFeed_ids[8] +
        id +
        '" >' +
        (data[3] !== '' ? STR_PLAYING + data[3] : '') +
        '</div><div id="' +
        UserLiveFeed_ids[4] +
        id +
        '" class="stream_info_live"><span id="' +
        UserLiveFeed_ids[5] +
        id +
        '" >' +
        STR_SINCE +
        data[11] +
        '</span><span id="' +
        UserLiveFeed_ids[6] +
        id +
        '" >' +
        STR_SPACE_HTML +
        STR_FOR +
        data[4] +
        STR_SPACE_HTML +
        Main_GetViewerStrings(data[13]) +
        '</span></div>' +
        (Extra_when
            ? '<div class="stream_info_live">' +
              STR_WATCHED +
              Main_videoCreatedAtWithHM(Extra_when) +
              STR_BR +
              STR_UNTIL +
              Play_timeMs(Extra_when - (data[12] ? new Date(data[12]).getTime() : 0)) +
              '</div>'
            : '') +
        '</div></div></div>';

    return div;
}

// function UserLiveFeedobj_CreatBanner(pos, y, id, obj) {
//     var div = document.createElement('div');

//     div.setAttribute('id', UserLiveFeed_ids[3] + id);
//     UserLiveFeed_DataObj[pos][y] = obj;

//     div.className = 'user_feed_thumb';

//     var image = obj.image;

//     div.innerHTML = '<div id="' + UserLiveFeed_ids[0] + id + '" class="stream_thumbnail_player_feed"><div class="stream_thumbnail_live_img"><img id="' +
//         UserLiveFeed_ids[1] + id + '" class="banner_16by9_img" alt="" src="' + image + '" onerror="this.onerror=null;this.src=\'' + IMG_AFFILIATED_16by9 +
//         '\';" ></div><div class="stream_thumbnail_feed_text_holder"><div class="stream_text_holder"><div style="line-height: 2vh; transform: translateY(10%);"><div id="' + UserLiveFeed_ids[2] + id +
//         '" class="stream_info_live_name" style="width:99%; text-align: center; white-space: nowrap; text-overflow: ellipsis; display: inline-block; overflow: hidden;"><br><br></div></div><div class="stream_info_live_title" style="max-height: 4em;">' + obj.text +
//         '</div></div></div></div></div>';

//     return div;
// }

function UserLiveFeedobj_CreateVodFeed(pos, x, id, data, Extra_when, Extra_until) {
    var div = document.createElement('div');

    div.setAttribute('id', UserLiveFeed_ids[3] + id);
    UserLiveFeed_DataObj[pos][x] = data;

    div.className = 'user_feed_thumb';

    div.innerHTML =
        '<div id="' +
        UserLiveFeed_ids[0] +
        id +
        '" class="stream_thumbnail_player_feed"><div class="stream_thumbnail_live_img"><img id="' +
        UserLiveFeed_ids[1] +
        id +
        '" class="stream_img" alt="" src="' +
        data[0] +
        '" onerror="this.onerror=null;this.src=\'' +
        IMG_404_VOD +
        '\';"><div id="' +
        UserLiveFeed_ids[4] +
        id +
        '" class="vod_watched" style="width: ' +
        (Main_history_Watched_Obj[data[7]] ? Main_history_Watched_Obj[data[7]] : 0) +
        '%;"></div></div><div class="stream_thumbnail_feed_text_holder"><div class="stream_text_holder"><div style="line-height: 2vh; transform: translateY(10%);"><div id="' +
        UserLiveFeed_ids[2] +
        id +
        '" class="stream_info_live_name" style="width:63.5%; white-space: nowrap; text-overflow: ellipsis; display: inline-block; overflow: hidden;">' +
        '<i class="icon-circle live_icon strokedeline" style="color: #00a94b;"></i> ' +
        data[1] +
        '</div><div class="stream_info_live" style="width:36%; float: right; text-align: right; display: inline-block; font-size: 70%;">' +
        data[5] +
        '</div></div><div class="' +
        (Extra_when ? 'stream_info_live_title_single_line' : 'stream_info_live_title') +
        '">' +
        data[10] +
        '</div>' +
        '<div class="stream_info_live">' +
        (data[3] !== '' && data[3] !== null ? STR_STARTED + STR_PLAYING + data[3] : '') +
        '</div>' +
        '<div style="line-height: 2vh;"><div class="stream_info_live" style="width: 74%; display: inline-block;">' +
        STR_STREAM_ON +
        data[2] +
        '</div><div class="stream_info_live" style="width: 26%; display: inline-block; float: right; text-align: right;">' +
        Play_timeS(data[11]) +
        '</div></div><div class="stream_info_live_title" style="font-family: \'Roboto\';">' +
        data[4] +
        Main_GetViewsStrings(data[13]) +
        (Extra_when ? ', ' + STR_WATCHED + Main_videoCreatedAtWithHM(Extra_when) + STR_SPACE_HTML + STR_UNTIL + Play_timeS(Extra_until) : '') +
        '</div></div></div>';

    return div;
}

function UserLiveFeedobj_CreatGameFeed(pos, x, id, data) {
    var div = document.createElement('div');
    data[14] = data[2]; //To make Main_values.UserLiveFeed_LastPositionId work

    div.setAttribute('id', UserLiveFeed_ids[3] + id);
    UserLiveFeed_DataObj[pos][x] = data;

    div.className = 'user_feed_thumb_game';

    var boxArtURL = data[3] ? data[3].replace('{width}x{height}', Main_GameSize) : '';

    div.innerHTML =
        '<div id="' +
        UserLiveFeed_ids[0] +
        id +
        '" class="stream_thumbnail_game_feed"><div class="stream_thumbnail_feed_game"><img id="' +
        UserLiveFeed_ids[1] +
        id +
        '" class="stream_img" alt="" src="' +
        boxArtURL +
        '" onerror="this.onerror=null;this.src=\'' +
        IMG_404_GAME +
        '\';"></div><div class="stream_thumbnail_game_feed_text_holder"><div class="stream_text_holder"><div id="' +
        UserLiveFeed_ids[2] +
        id +
        '" class="stream_info_game_name">' +
        data[0] +
        '</div>' +
        (data[1] !== '' ? '<div class="stream_info_live" style="width: 100%; display: inline-block;">' + data[1] + '</div>' : '') +
        '</div></div></div>';

    return div;
}

function UserLiveFeedobj_loadChannelUserLive() {
    FullxmlHttpGet(
        PlayClip_BaseUrl,
        Main_OAuth_User_Headers,
        UserLiveFeedobj_loadChannelUserLiveGetEnd,
        noop_fun,
        UserLiveFeedobj_UserLivePos,
        UserLiveFeedobj_UserLivePos, //checkResult
        'POST', //Method, null for get
        userLiveQuery.replace(
            '%y',
            UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].cursor ? ', after: \\"' + UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].cursor + '\\"' : ''
        )
    );
}

function UserLiveFeedobj_loadChannelUserLiveGetEnd(resultObj) {
    if (resultObj.status === 200) {
        UserLiveFeedobj_loadDataSuccess(resultObj.responseText);
    } else {
        UserLiveFeedobj_loadDataError(UserLiveFeedobj_UserLivePos);
    }
}

// function UserLiveFeedobj_loadDataRefreshTokenError() {
//     //Main_Log('UserLiveFeedobj_loadDataRefreshTokenError');

//     if (!AddUser_UsernameArray[0].access_token) UserLiveFeedobj_CheckToken();
//     else UserLiveFeedobj_loadDataError(UserLiveFeedobj_UserLivePos);
// }

function UserLiveFeedobj_loadDataSuccess(responseText) {
    var pos = UserLiveFeedobj_UserLivePos,
        responseObj = JSON.parse(responseText),
        response = [],
        hasData =
            responseObj.data &&
            responseObj.data.currentUser &&
            responseObj.data.currentUser.followedLiveUsers &&
            responseObj.data.currentUser.followedLiveUsers.edges;

    if (hasData) {
        UserLiveFeed_obj[pos].dataEnded = !responseObj.data.currentUser.followedLiveUsers.pageInfo.hasNextPage;

        response = responseObj.data.currentUser.followedLiveUsers.edges;

        UserLiveFeed_obj[pos].cursor = response && response && response.length ? response[response.length - 1].cursor : null;

        var i = 0,
            len = response.length;

        for (i; i < len; i++) {
            response[i] = response[i].node;
        }
    } else {
        UserLiveFeed_obj[pos].dataEnded = true;
        UserLiveFeed_obj[pos].cursor = null;
    }

    UserLiveFeed_loadDataSuccessEnd(response);
}

function UserLiveFeed_loadDataSuccessEnd(response) {
    //Main_Log('UserLiveFeedobj_loadDataSuccess');

    var response_items,
        sorting = Settings_Obj_default('live_feed_sort'),
        stream,
        id,
        mArray,
        i = 0,
        itemsCount = UserLiveFeed_itemsCount[UserLiveFeedobj_UserLivePos];

    response_items = response.length;

    if (response_items) {
        var sorting_type1 = UserLiveFeedobj_FeedSort[sorting][0],
            sorting_type2 = UserLiveFeedobj_FeedSort[sorting][1],
            sorting_direction = UserLiveFeedobj_FeedSort[sorting][2];

        if (sorting_direction) {
            //A-Z
            if (sorting_type1) {
                response.sort(function (a, b) {
                    return a.stream[sorting_type1][sorting_type2] < b.stream[sorting_type1][sorting_type2]
                        ? -1
                        : a.stream[sorting_type1][sorting_type2] > b.stream[sorting_type1][sorting_type2]
                          ? 1
                          : 0;
                });
            } else {
                //views
                response.sort(function (a, b) {
                    return a.stream[sorting_type2] < b.stream[sorting_type2] ? -1 : a.stream[sorting_type2] > b.stream[sorting_type2] ? 1 : 0;
                });
            }
        } else {
            //Z-A
            if (sorting_type1) {
                response.sort(function (a, b) {
                    return a.stream[sorting_type1][sorting_type2] > b.stream[sorting_type1][sorting_type2]
                        ? -1
                        : a.stream[sorting_type1][sorting_type2] < b.stream[sorting_type1][sorting_type2]
                          ? 1
                          : 0;
                });
            } else {
                response.sort(function (a, b) {
                    return a.stream[sorting_type2] > b.stream[sorting_type2] ? -1 : a.stream[sorting_type2] < b.stream[sorting_type2] ? 1 : 0;
                });
            }
        }

        for (i; i < response_items; i++) {
            stream = response[i];
            if (!stream || !stream.stream) {
                continue;
            }
            id = stream.stream.broadcaster ? stream.stream.broadcaster.id : null;

            if (id && !UserLiveFeed_idObject[UserLiveFeedobj_UserLivePos].hasOwnProperty(id) && ScreensObj_CheckIsMature(stream.stream)) {
                UserLiveFeed_idObject[UserLiveFeedobj_UserLivePos][id] = itemsCount;

                mArray = ScreensObj_LiveQueryCellArray(stream);

                UserLiveFeed_PreloadImgs.push(mArray[0]);

                UserLiveFeed_cell[UserLiveFeedobj_UserLivePos][itemsCount] = UserLiveFeedobj_CreatFeed(
                    UserLiveFeedobj_UserLivePos,
                    itemsCount,
                    UserLiveFeedobj_UserLivePos + '_' + itemsCount,
                    mArray
                );

                Sidepannel_Html += UserLiveFeedobj_CreateSideFeed(itemsCount, mArray);

                itemsCount++;
            }
        }
    }

    Main_innerHTMLWithEle(Sidepannel_ScroolDoc, Sidepannel_Html);

    UserLiveFeed_itemsCount[UserLiveFeedobj_UserLivePos] = itemsCount;

    Main_setTimeout(function () {
        UserLiveFeedobj_AddBanner(UserLiveFeedobj_UserLivePos);

        if (!UserLiveFeed_itemsCount[UserLiveFeedobj_UserLivePos]) {
            if (AddUser_UserHasToken()) {
                UserLiveFeedobj_Empty(UserLiveFeedobj_UserLivePos);
            } else {
                UserLiveFeedobj_HolderDiv(UserLiveFeedobj_UserLivePos, STR_NOKUSER_WARNING);
            }
        }

        UserLiveFeedobj_SetLastPosition(UserLiveFeedobj_UserLivePos);

        Sidepannel_Positions = JSON.parse(JSON.stringify(UserLiveFeed_idObject[UserLiveFeedobj_UserLivePos]));
        if (Sidepannel_Positions.hasOwnProperty(Main_values.UserSidePannel_LastPositionId)) {
            Sidepannel_PosFeed = Sidepannel_Positions[Main_values.UserSidePannel_LastPositionId];
        } else {
            Sidepannel_FindClosest();
        }

        Sidepannel_PreloadImgs();
        UserLiveFeed_loadDataSuccessFinish(UserLiveFeedobj_UserLivePos);

        if (Settings_notification_check_any_enable()) OSInterface_RunNotificationService();
    }, 25);
}

function UserLiveFeedobj_SetLastPosition(pos) {
    var total = UserLiveFeed_GetSize(pos);

    if (UserLiveFeed_idObject[pos].hasOwnProperty(Main_values.UserLiveFeed_LastPositionId[pos])) {
        UserLiveFeed_FeedPosY[pos] = UserLiveFeed_idObject[pos][Main_values.UserLiveFeed_LastPositionId[pos]];
    } else if (Main_values.UserLiveFeed_LastPosition[pos] && total) {
        var i = Main_values.UserLiveFeed_LastPosition[pos];

        for (i; i >= 0; i--) {
            if (UserLiveFeed_cell[pos][i]) {
                UserLiveFeed_FeedPosY[pos] = i;
                break;
            }
        }
    }

    //There is max total loaded positions, the scroll function only works well if there is at least 4 ahead
    //Give 5 to make things work
    if (UserLiveFeed_obj[pos].HasMore && UserLiveFeed_FeedPosY[pos] > total - 5 && total - 5 >= 0) {
        UserLiveFeed_FeedPosY[pos] = total - 5;
    }
}

//User VOD Start
var UserLiveFeedobj_VodFeedOldUserName = '';
function UserLiveFeedobj_ShowUserVod() {
    UserLiveFeedobj_SetBottomText(UserLiveFeedobj_UserVodPos - 2);

    if (AddUser_UserIsSet()) {
        UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_UserVodPos, UserLiveFeedobj_VodFeedOldUserName !== AddUser_UsernameArray[0].name);
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
    UserLiveFeedobj_loadUserVodGet();
}

function UserLiveFeedobj_loadUserVodGet() {
    FullxmlHttpGet(
        PlayClip_BaseUrl,
        Main_OAuth_User_Headers,
        UserLiveFeedobj_loadUserVodGetEnd,
        noop_fun,
        UserLiveFeedobj_UserVodPos,
        UserLiveFeedobj_UserVodPos, //checkResult
        'POST', //Method, null for get
        userVodQuery
            .replace('%x', 'ARCHIVE')
            .replace('%t', 'TIME')
            .replace(
                '%y',
                UserLiveFeed_obj[UserLiveFeedobj_UserVodPos].cursor ? 'after: \\"' + UserLiveFeed_obj[UserLiveFeedobj_UserVodPos].cursor + '\\",' : ''
            )
    );
}

function UserLiveFeedobj_loadUserVodGetEnd(xmlHttp) {
    //Main_Log('UserLiveFeedobj_loadUserVodGetEnd ' + xmlHttp.status);
    if (xmlHttp.status === 200) {
        UserLiveFeedobj_loadDataBaseVodSuccess(xmlHttp.responseText, UserLiveFeedobj_UserVodPos);
    } else if (UserLiveFeed_token && (xmlHttp.status === 401 || xmlHttp.status === 403)) {
        //token expired
        //Token has change or because is new or because it is invalid because user delete in twitch settings
        // so callbackFuncOK and callbackFuncNOK must be the same to recheck the token

        if (AddUser_UserHasToken()) {
            AddCode_validateToken(0);
        }

        UserLiveFeedobj_loadDataError(UserLiveFeedobj_UserVodPos);
    } else {
        UserLiveFeedobj_loadDataError(UserLiveFeedobj_UserVodPos);
    }
}

function UserLiveFeedobj_loadDataBaseVodSuccess(responseText, pos) {
    var response = JSON.parse(responseText),
        response_items,
        id,
        mArray,
        i = 0,
        itemsCount = UserLiveFeed_itemsCount[pos],
        hasData =
            response.data && response.data.currentUser && response.data.currentUser.followedVideos && response.data.currentUser.followedVideos.edges;

    if (hasData) {
        if (UserLiveFeed_obj[pos].HasMore) {
            UserLiveFeed_obj[pos].dataEnded = !response.data.currentUser.followedVideos.pageInfo.hasNextPage;
        }

        response = response.data.currentUser.followedVideos.edges;
        response_items = response.length;

        UserLiveFeed_obj[pos].cursor = response && response && response.length ? response[response.length - 1].cursor : null;

        for (i; i < response_items; i++) {
            mArray = ScreensObj_VodCellArray(response[i].node, true);
            id = mArray[7];

            if (!UserLiveFeed_idObject[pos].hasOwnProperty(id)) {
                UserLiveFeed_idObject[pos][id] = itemsCount;

                UserLiveFeed_cell[pos][itemsCount] = UserLiveFeedobj_CreateVodFeed(pos, itemsCount, pos + '_' + itemsCount, mArray);

                itemsCount++;
            }
        }
    } else UserLiveFeedobj_Empty(pos);

    UserLiveFeed_itemsCount[pos] = itemsCount;

    if (UserLiveFeed_obj[pos].loadingMore) {
        UserLiveFeed_obj[pos].loadingMore = false;
        if (pos === UserLiveFeed_FeedPosX) UserLiveFeed_CounterDialog(UserLiveFeed_FeedPosY[pos], UserLiveFeed_itemsCount[pos]);
    } else {
        Main_setTimeout(function () {
            UserLiveFeedobj_SetLastPosition(pos);

            UserLiveFeed_loadDataSuccessFinish(pos);
        }, 25);
    }
}
//User VOD end

//User VOD history
function UserLiveFeedobj_ShowUserVodHistory() {
    UserLiveFeedobj_SetBottomText(UserLiveFeedobj_UserVodHistoryPos - 2);

    if (AddUser_UserIsSet()) {
        UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_UserVodHistoryPos, true);
    }
}

function UserLiveFeedobj_HideUserVodHistory() {
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_obj[UserLiveFeedobj_UserVodHistoryPos].div.classList.add('hide');
}

function UserLiveFeedobj_UserVodHistory() {
    UserLiveFeedobj_StartDefault(UserLiveFeedobj_UserVodHistoryPos);

    var array = Main_values_History_data[AddUser_UsernameArray[0].id].vod;

    array.sort(function (a, b) {
        return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    });

    var pos = UserLiveFeedobj_UserVodHistoryPos,
        response = JSON.parse(JSON.stringify(array.slice(0, 100))), // first 100 only
        len = response.length,
        response_items = Math.min(len, 100),
        cell,
        id,
        i = 0,
        itemsCount = UserLiveFeed_itemsCount[pos];

    if (response_items) {
        for (i; i < response_items; i++) {
            cell = response[i];
            id = cell.data[7];

            if (!UserLiveFeed_idObject[pos].hasOwnProperty(id)) {
                UserLiveFeed_idObject[pos][id] = itemsCount;

                UserLiveFeed_cell[pos][itemsCount] = UserLiveFeedobj_CreateVodFeed(
                    pos,
                    itemsCount,
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

    UserLiveFeedobj_SetLastPosition(pos);

    UserLiveFeed_loadDataSuccessFinish(pos);
}
//User VOD history end

function UserLiveFeedobj_loadDataBaseLiveSuccess(responseText, pos, game) {
    var responseObj = JSON.parse(responseText),
        itemsCount = UserLiveFeed_itemsCount[pos],
        response = responseObj[UserLiveFeed_obj[pos].StreamType],
        total;

    if (pos === UserLiveFeedobj_FeaturedPos) {
        var hasData = responseObj.data && responseObj.data.featuredStreams;

        response = hasData ? responseObj.data.featuredStreams : [];
    } else if (UserLiveFeed_obj[pos].useHelix) {
        UserLiveFeed_obj[pos].cursor = responseObj.pagination.cursor;

        if (!UserLiveFeed_obj[pos].cursor || UserLiveFeed_obj[pos].cursor === '') {
            UserLiveFeed_obj[pos].dataEnded = true;
        }
    } else {
        total = responseObj._total;
    }

    if (game) {
        if (UserLiveFeed_obj[pos].data[game]) {
            UserLiveFeed_obj[pos].data[game].push.apply(UserLiveFeed_obj[pos].data[game], response);
        } else {
            UserLiveFeedobj_backupStartObj(pos, game);

            UserLiveFeed_obj[pos].data[game] = response;
            UserLiveFeed_obj[pos].backup[game].lastRefresh = new Date().getTime();
            UserLiveFeed_obj[pos].backup[game].ContentLang = Main_ContentLang;
        }

        UserLiveFeed_obj[pos].backup[game].data = JSON.parse(JSON.stringify(UserLiveFeed_obj[pos].data[game]));
    }

    UserLiveFeedobj_loadDataBaseLiveSuccessEnd(response, total, pos, itemsCount, game);
}

function UserLiveFeedobj_loadDataBaseLiveSuccessEnd(response, total, pos, itemsCount, game) {
    var response_items = response.length,
        stream,
        id,
        mArray,
        i = 0,
        isHistory = pos === UserLiveFeedobj_UserHistoryPos,
        isFeatured = pos === UserLiveFeedobj_FeaturedPos;

    if (response_items) {
        if (isFeatured) {
            var sorting = Settings_Obj_default('live_feed_sort');

            var sorting_type1 = UserLiveFeedobj_FeedFeatureSort[sorting][0],
                sorting_type2 = UserLiveFeedobj_FeedFeatureSort[sorting][1],
                sorting_direction = UserLiveFeedobj_FeedFeatureSort[sorting][2];

            if (sorting_direction) {
                //A-Z
                if (sorting_type1) {
                    response.sort(function (a, b) {
                        //a or b stream may be null
                        if (!a || !b || !a.stream || !b.stream || !a.stream[sorting_type1] || b.stream[sorting_type1]) {
                            return 0;
                        }
                        if (a.stream[sorting_type1][sorting_type2] < b.stream[sorting_type1][sorting_type2]) {
                            return -1;
                        }
                        if (a.stream[sorting_type1][sorting_type2] > b.stream[sorting_type1][sorting_type2]) {
                            return 1;
                        }
                        return 0;
                    });
                } else {
                    response.sort(function (a, b) {
                        //a or b stream may be null
                        if (!a || !b || !a.stream || !b.stream) {
                            return 0;
                        }
                        if (a.stream[sorting_type2] < b.stream[sorting_type2]) {
                            return -1;
                        }
                        if (a.stream[sorting_type2] > b.stream[sorting_type2]) {
                            return 1;
                        }
                        return 0;
                    });
                }
            } else {
                //Z-A
                if (sorting_type1) {
                    response.sort(function (a, b) {
                        //a or b stream may be null
                        if (!a || !b || !a.stream || !b.stream || !a.stream[sorting_type1] || b.stream[sorting_type1]) {
                            return 0;
                        }
                        if (a.stream[sorting_type1][sorting_type2] > b.stream[sorting_type1][sorting_type2]) {
                            return -1;
                        }
                        if (a.stream[sorting_type1][sorting_type2] < b.stream[sorting_type1][sorting_type2]) {
                            return 1;
                        }

                        return 0;
                    });
                } else {
                    response.sort(function (a, b) {
                        //a or b stream may be null
                        if (!a || !b || !a.stream || !b.stream) {
                            return 0;
                        }
                        if (a.stream[sorting_type2] > b.stream[sorting_type2]) {
                            return -1;
                        }
                        if (a.stream[sorting_type2] < b.stream[sorting_type2]) {
                            return 1;
                        }
                        return 0;
                    });
                }
            }
        }
        var useHelix = UserLiveFeed_obj[pos].useHelix;

        for (i; i < response_items; i++) {
            if (isFeatured || isHistory) {
                stream = response[i];

                //stream or stream.stream may be null
                if (!stream || !stream.stream || !stream.stream.broadcaster) {
                    continue;
                }

                id = stream.stream.broadcaster.id;
            } else {
                stream = UserLiveFeed_obj[pos].cell(response[i]);
                id = useHelix ? stream.user_id : stream.channel._id;
            }

            if (!UserLiveFeed_idObject[pos][id] && (isFeatured || isHistory || ScreensObj_CheckIsMature(stream))) {
                mArray = isFeatured || isHistory ? ScreensObj_LiveQueryCellArray(stream) : ScreensObj_LiveCellArray(stream);

                if (
                    isHistory ||
                    Screens_isNotBlocked(
                        mArray[14],
                        pos === UserLiveFeedobj_CurrentGamePos ? null : mArray[18],
                        pos === UserLiveFeedobj_UserAGamesPos
                    )
                ) {
                    UserLiveFeed_idObject[pos][id] = itemsCount;
                    UserLiveFeed_cell[pos][itemsCount] = UserLiveFeedobj_CreatFeed(pos, itemsCount, pos + '_' + itemsCount, mArray);
                    itemsCount++;
                }
            }
        }
    }

    UserLiveFeed_itemsCount[pos] = itemsCount;

    UserLiveFeedobj_loadDataBaseLiveSuccessFinish(pos, total, response_items);

    if (response_items && game) {
        UserLiveFeedobj_loadDataBaseLiveBackup(pos, game);
    }
}

function UserLiveFeedobj_backupStartObj(pos, game) {
    if (!UserLiveFeed_obj[pos].backup[game]) {
        UserLiveFeed_obj[pos].backup[game] = {};
    }
}

function UserLiveFeedobj_loadDataBaseLiveBackup(pos, game) {
    UserLiveFeedobj_backupStartObj(pos, game);

    UserLiveFeed_obj[pos].backup[game].idObject = JSON.parse(JSON.stringify(UserLiveFeed_idObject[pos]));
    UserLiveFeed_obj[pos].backup[game].DataObj = JSON.parse(JSON.stringify(UserLiveFeed_DataObj[pos]));
    UserLiveFeed_obj[pos].backup[game].cell = Main_Slice(UserLiveFeed_cell[pos]);
}

function UserLiveFeedobj_loadDataBaseLiveSuccessFinish(pos, total, response_items) {
    if (UserLiveFeed_obj[pos].HasMore) {
        UserLiveFeed_obj[pos].offset = UserLiveFeed_cell[pos].length;
        UserLiveFeed_obj[pos].MaxOffset = total;

        if (!response_items) {
            UserLiveFeed_obj[pos].dataEnded = true;
        } else if (UserLiveFeed_obj[pos].MaxOffset === null || typeof UserLiveFeed_obj[pos].MaxOffset === 'undefined') {
            if (response_items < 90) {
                UserLiveFeed_obj[pos].dataEnded = true;
            }
        } else {
            if (UserLiveFeed_obj[pos].offset >= total) UserLiveFeed_obj[pos].dataEnded = true;
        }
    } else {
        UserLiveFeedobj_AddBanner(pos);
    }

    if (!UserLiveFeed_itemsCount[pos]) {
        if (
            Settings_Obj_default('loadAll_lang') &&
            UserLiveFeed_obj[pos].hasAllLang &&
            !UserLiveFeed_obj[pos].LoadAllLangForced &&
            Main_ContentLang !== ''
        ) {
            UserLiveFeed_obj[pos].cursor = null;
            UserLiveFeed_obj[pos].load(true);
            return;
        } else {
            UserLiveFeedobj_Empty(pos);
        }
    }

    if (UserLiveFeed_obj[pos].loadingMore) {
        UserLiveFeed_obj[pos].loadingMore = false;

        if (pos === UserLiveFeed_FeedPosX) {
            UserLiveFeed_CounterDialog(UserLiveFeed_FeedPosY[pos], UserLiveFeed_itemsCount[pos]);
        }
    } else {
        Main_setTimeout(function () {
            UserLiveFeedobj_SetLastPosition(pos);

            UserLiveFeed_loadDataSuccessFinish(pos);
        }, 25);
    }

    if (UserLiveFeed_obj[pos].LoadAllLangForced && UserLiveFeed_isPreviewShowing() && pos === UserLiveFeed_FeedPosX) {
        Play_showWarningMiddleDialog(STR_LOAD_ALL_LANG_WARNING, 3000);
    }
}
function UserLiveFeedobj_AddBanner() {
    return null;
}
//Base video fun end

//Base game fun
function UserLiveFeedobj_loadDataBaseGamesSuccess(responseText, pos, type) {
    var responseObj = JSON.parse(responseText),
        itemsCount = UserLiveFeed_itemsCount[pos],
        response = responseObj[type],
        total,
        hasData;

    if (pos === UserLiveFeedobj_UserGamesPos) {
        hasData = responseObj.data && responseObj.data.user && responseObj.data.user.followedGames && responseObj.data.user.followedGames.nodes;

        response = hasData ? response.user.followedGames.nodes : [];
    } else if (UserLiveFeed_obj[pos].isQuery) {
        hasData = responseObj.data && responseObj.data.games && responseObj.data.games.edges;

        if (hasData) {
            UserLiveFeed_obj[pos].dataEnded = !responseObj.data.games.pageInfo.hasNextPage;

            response = responseObj.data.games.edges;

            UserLiveFeed_obj[pos].cursor = response && response && response.length ? response[response.length - 1].cursor : null;

            var i = 0,
                len = response.length;

            for (i; i < len; i++) {
                response[i] = response[i].node;
            }
        } else {
            UserLiveFeed_obj[pos].dataEnded = true;
            UserLiveFeed_obj[pos].cursor = null;
        }
    }

    UserLiveFeedobj_loadDataGamesSuccessEnd(response, total, pos, itemsCount);
}

function UserLiveFeedobj_loadDataGamesSuccessEnd(response, total, pos, itemsCount) {
    var response_items = response.length,
        cell,
        game,
        i = 0,
        isUserGames = pos === UserLiveFeedobj_UserGamesPos;

    if (response_items) {
        if (isUserGames) {
            response.sort(function (a, b) {
                if (!a || !b) {
                    return 0;
                }
                if (a.displayName < b.displayName) {
                    return -1;
                }
                if (a.displayName > b.displayName) {
                    return 1;
                }
                return 0;
            });
        }

        for (i; i < response_items; i++) {
            cell = response[i];
            game = cell;
            if (!game) {
                continue;
            }
            var id_cell = game.id;
            var isNotBlocked = Screens_isNotBlocked(null, id_cell, isUserGames);

            if (!UserLiveFeed_idObject[pos].hasOwnProperty(id_cell) && isNotBlocked) {
                UserLiveFeed_idObject[pos][id_cell] = itemsCount;

                UserLiveFeed_cell[pos][itemsCount] = UserLiveFeedobj_CreatGameFeed(pos, itemsCount, pos + '_' + itemsCount, [
                    game.displayName, //0
                    (cell.channelsCount ? Main_addCommas(cell.channelsCount) : 0) +
                        STR_SPACE_HTML +
                        STR_CHANNELS +
                        STR_BR +
                        STR_FOR +
                        (cell.viewersCount ? Main_addCommas(cell.viewersCount) : 0) +
                        STR_SPACE_HTML +
                        Main_GetViewerStrings(cell.viewersCount ? cell.viewersCount : 0), //1
                    id_cell, //2
                    game.boxArtURL //3
                ]);

                itemsCount++;
            }
        }
    } else UserLiveFeedobj_Empty(pos);

    UserLiveFeed_itemsCount[pos] = itemsCount;

    if (UserLiveFeed_obj[pos].loadingMore) {
        UserLiveFeed_obj[pos].loadingMore = false;
        if (pos === UserLiveFeed_FeedPosX) UserLiveFeed_CounterDialog(UserLiveFeed_FeedPosY[pos], UserLiveFeed_itemsCount[pos]);
    } else {
        Main_setTimeout(function () {
            UserLiveFeedobj_SetLastPosition(pos);

            UserLiveFeed_loadDataSuccessFinish(pos);
        }, 25);
    }
}
//Base game fun end

function UserLiveFeedobj_CheckOffset(pos) {
    if (
        UserLiveFeed_obj[pos].offset >= 900 ||
        (UserLiveFeed_obj[pos].MaxOffset !== null &&
            typeof UserLiveFeed_obj[pos].MaxOffset !== 'undefined' &&
            UserLiveFeed_obj[pos].offset &&
            UserLiveFeed_obj[pos].offset + 100 > UserLiveFeed_obj[pos].MaxOffset)
    ) {
        UserLiveFeed_obj[pos].dataEnded = true;
    }
}
