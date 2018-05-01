//Variable initialization
var UserGames_cursorY = 0;
var UserGames_cursorX = 0;
var UserGames_dataEnded = false;
var UserGames_itemsCount = 0;
var UserGames_nameMatrix = [];
var UserGames_blankCellVector = [];
var UserGames_loadingData = false;
var UserGames_loadingDataTry = 0;
var UserGames_loadingDataTryMax = 10;
var UserGames_loadingDataTimeout = 3500;
var UserGames_blankCellCount = 0;
var UserGames_itemsCountOffset = 0;
var UserGames_LastClickFinish = true;
var UserGames_keyClickDelayTime = 25;
var UserGames_ReplacedataEnded = false;
var UserGames_MaxOffset = 0;
var UserGames_emptyContent = false;
var UserGames_itemsCountCheck = false;
var UserGames_live = true;

var UserGames_Img = 'img_glive';
var UserGames_Thumbnail = 'thumbnail_glive_';
var UserGames_EmptyCell = 'gliveempty_';
var UserGames_ThumbnailDiv = 'glive_thumbnail_div_';
var UserGames_DispNameDiv = 'glive_display_name_';
var UserGames_ViwersDiv = 'glive_viwers_';
var UserGames_Cell = 'glive_cell_';
var UserGames_Status = false;
var UserGames_OldUserName = '';
var UserGames_loadingMore = false;
//Variable initialization end

function UserGames_init() {
    Main_Go = Main_usergames;
    Main_IconLoad('label_refresh', 'icon-refresh', STR_USER_GAMES_CHANGE + STR_LIVE_GAMES + '/' + STR_FALLOW_GAMES + STR_GUIDE);
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    document.body.addEventListener("keydown", UserGames_handleKeyDown, false);
    Main_YRst(UserGames_cursorY);
    if (UserGames_OldUserName !== Main_UserName) UserGames_Status = false;
    if (UserGames_Status) {
        document.getElementById('top_bar_user').innerHTML = STR_USER + Main_UnderCenter(Main_UserName + ' ' + (UserGames_live ? STR_LIVE_GAMES : STR_FALLOW_GAMES));
        Main_ScrollHelper(UserGames_Thumbnail, UserGames_cursorY, UserGames_cursorX, Main_usergames,
            Main_ScrollOffSetMinusGame, Main_ScrollOffSetGame, false);
        Main_CounterDialog(UserGames_cursorX, UserGames_cursorY, Main_ColoumnsCountGame, UserGames_itemsCount);
    } else UserGames_StartLoad();
}

function UserGames_exit() {
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH);
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.getElementById('top_bar_user').innerHTML = STR_USER;
    document.body.removeEventListener("keydown", UserGames_handleKeyDown);
}

function UserGames_StartLoad() {
    Main_HideWarningDialog();
    Main_ScrollHelperBlank('blank_focus');
    document.getElementById('top_bar_user').innerHTML = STR_USER + Main_UnderCenter(Main_UserName + ' ' + (UserGames_live ? STR_LIVE_GAMES : STR_FALLOW_GAMES));
    Main_showLoadDialog();
    UserGames_OldUserName = Main_UserName;
    UserGames_Status = false;
    $('#stream_table_user_games').empty();
    UserGames_loadingMore = false;
    UserGames_blankCellCount = 0;
    UserGames_itemsCountOffset = 0;
    UserGames_ReplacedataEnded = false;
    UserGames_MaxOffset = 0;
    UserGames_nameMatrix = [];
    UserGames_blankCellVector = [];
    UserGames_itemsCountCheck = false;
    UserGames_itemsCount = 0;
    UserGames_cursorX = 0;
    UserGames_cursorY = 0;
    UserGames_dataEnded = false;
    Main_CounterDialogRst();
    UserGames_loadDataPrepare();
    UserGames_loadDataRequest();
}

function UserGames_loadDataPrepare() {
    UserGames_loadingData = true;
    UserGames_loadingDataTry = 0;
    UserGames_loadingDataTimeout = 3500;
}

function UserGames_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = UserGames_itemsCount + UserGames_itemsCountOffset;
        if (offset && offset > (UserGames_MaxOffset - 1)) {
            offset = UserGames_MaxOffset - Main_ItemsLimitGame;
            UserGames_dataEnded = true;
            UserGames_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/api/users/' + encodeURIComponent(Main_UserName) + '/follows/games' + (UserGames_live ? '/live' : '') +
            '?limit=' + Main_ItemsLimitGame + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserGames_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserGames_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    UserGames_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserGames_loadDataError();
    }
}

function UserGames_loadDataError() {
    UserGames_loadingDataTry++;
    if (UserGames_loadingDataTry < UserGames_loadingDataTryMax) {
        UserGames_loadingDataTimeout += (UserGames_loadingDataTry < 5) ? 250 : 3500;
        UserGames_loadDataRequest();
    } else {
        UserGames_loadingData = false;
        UserGames_loadingMore = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function UserGames_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.follows.length;
    UserGames_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitGame) UserGames_dataEnded = true;

    var offset_itemsCount = UserGames_itemsCount;
    UserGames_itemsCount += response_items;

    UserGames_emptyContent = !UserGames_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountGame;
    if (response_items % Main_ColoumnsCountGame > 0) response_rows++;

    var coloumn_id, row_id, row, cell, follows,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountGame + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountGame && cursor < response_items; coloumn_id++, cursor++) {
            follows = response.follows[cursor];
            if (UserGames_live) {
                if (UserGames_CellExists(follows.game.name)) coloumn_id--;
                else {
                    cell = UserGames_createCell(row_id, coloumn_id, follows.game.name, follows.game.box.template,
                        Main_addCommas(follows.channels) + ' ' + STR_CHANNELS + STR_FOR + Main_addCommas(follows.viewers) + STR_VIEWER);
                    row.append(cell);
                }
            } else {
                if (UserGames_CellExists(follows.name)) coloumn_id--;
                else {
                    cell = UserGames_createCell(row_id, coloumn_id, follows.name, follows.box.template, '');
                    row.append(cell);
                }
            }
        }
        for (coloumn_id; coloumn_id < Main_ColoumnsCountGame; coloumn_id++) {
            if (UserGames_dataEnded && !UserGames_itemsCountCheck) {
                UserGames_itemsCountCheck = true;
                UserGames_itemsCount = (row_id * Main_ColoumnsCountGame) + coloumn_id;
            }
            row.append(Main_createCellEmpty(row_id, coloumn_id, UserGames_EmptyCell));
            UserGames_blankCellVector.push(UserGames_EmptyCell + row_id + '_' + coloumn_id);
        }
        $('#stream_table_user_games').append(row);
    }

    UserGames_loadDataSuccessFinish();
}

function UserGames_createCell(row_id, coloumn_id, game_name, preview_thumbnail, viewers) {
    return $('<td id="' + UserGames_Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + game_name + '"></td>').html(
        UserGames_CellHtml(row_id, coloumn_id, game_name, preview_thumbnail, viewers));
}

function UserGames_CellHtml(row_id, coloumn_id, game_name, preview_thumbnail, viewers) {

    UserGames_nameMatrix.push(game_name);

    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main_GameSize);
    if (row_id < 2) Main_PreLoadAImage(preview_thumbnail); //try to pre cache first 2 rows

    return '<div id="' + UserGames_Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_game" ><img id="' + UserGames_Img + row_id + '_' +
        coloumn_id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + UserGames_ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + UserGames_DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + game_name + '</div>' +
        '<div id="' + UserGames_ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 100%;">' + viewers + '</div></div>';
}

function UserGames_CellExists(display_name) {
    if (UserGames_nameMatrix.indexOf(display_name) > -1) {
        UserGames_blankCellCount++;
        return true;
    }
    return false;
}

function UserGames_loadDataSuccessFinish() {
    $(document).ready(function() {
        if (!UserGames_Status) {
            Main_HideLoadDialog();
            if (UserGames_emptyContent) Main_showWarningDialog(STR_NO + STR_LIVE_GAMES);
            else {
                UserGames_Status = true;
                UserGames_addFocus();
                Main_LazyImgStart(UserGames_Img, 7, IMG_404_GAME, Main_ColoumnsCountGame);
            }
            UserGames_loadingData = false;
        } else {
            if (UserGames_blankCellCount > 0 && !UserGames_dataEnded) {
                UserGames_loadingMore = true;
                UserGames_loadDataPrepare();
                UserGames_loadDataReplace();
                return;
            } else {
                UserGames_blankCellCount = 0;
                UserGames_blankCellVector = [];
            }

            UserGames_loadingData = false;
            UserGames_loadingMore = false;
        }
    });
}

function UserGames_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReload(UserGames_blankCellCount);

        var offset = UserGames_itemsCount + UserGames_itemsCountOffset;
        if (offset && offset > (UserGames_MaxOffset - 1)) {
            offset = UserGames_MaxOffset - Main_ItemsLimitReload;
            UserGames_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/api/users/' + encodeURIComponent(Main_UserName) + '/follows/games' + (UserGames_live ? '/live' : '') +
            '?limit=' + Main_ItemsLimitGame + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserGames_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserGames_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                } else UserGames_loadDataReplaceError();
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserGames_loadDataReplaceError();
    }
}

function UserGames_loadDataReplaceError() {
    UserGames_loadingDataTry++;
    if (UserGames_loadingDataTry < UserGames_loadingDataTryMax) {
        UserGames_loadingDataTimeout += (UserGames_loadingDataTry < 5) ? 250 : 3500;
        UserGames_loadDataReplace();
    } else {
        UserGames_ReplacedataEnded = true;
        UserGames_blankCellCount = 0;
        UserGames_blankCellVector = [];
        UserGames_loadDataSuccessFinish();
    }
}

function UserGames_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.follows.length;
    var follows, index, cursor = 0;
    var tempVector = UserGames_blankCellVector.slice();

    UserGames_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitGame) UserGames_ReplacedataEnded = true;

    for (var i = 0; i < UserGames_blankCellVector.length && cursor < response_items; i++, cursor++) {
        follows = response.follows[cursor];
        if (UserGames_live) {
            if (UserGames_CellExists(follows.game.name)) {
                UserGames_blankCellCount--;
                i--;
            } else {
                UserGames_replaceCellEmpty(UserGames_blankCellVector[i], follows.game.name, follows.game.box.template,
                    Main_addCommas(follows.channels) + ' ' + STR_CHANNELS + STR_FOR + Main_addCommas(follows.viwers) + STR_VIEWER);
                UserGames_blankCellCount--;

                index = tempVector.indexOf(tempVector[i]);
                if (index > -1) {
                    tempVector.splice(index, 1);
                }
            }
        } else {
            if (UserGames_CellExists(follows.name)) {
                UserGames_blankCellCount--;
                i--;
            } else {
                UserGames_replaceCellEmpty(UserGames_blankCellVector[i], follows.name, follows.box.template, '');
                UserGames_blankCellCount--;

                index = tempVector.indexOf(tempVector[i]);
                if (index > -1) {
                    tempVector.splice(index, 1);
                }
            }
        }
    }

    UserGames_itemsCountOffset += cursor;
    if (UserGames_ReplacedataEnded) {
        UserGames_blankCellCount = 0;
        UserGames_blankCellVector = [];
    } else UserGames_blankCellVector = tempVector;

    UserGames_loadDataSuccessFinish();
}

function UserGames_replaceCellEmpty(id, game_name, preview_thumbnail, viewers) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = UserGames_Cell + row_id + '_' + coloumn_id;

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', game_name);
    document.getElementById(cell).innerHTML = UserGames_CellHtml(row_id, coloumn_id, game_name, preview_thumbnail, viewers);
}

function UserGames_addFocus() {

    Main_addFocusGame(UserGames_cursorY, UserGames_cursorX, UserGames_Thumbnail, UserGames_ThumbnailDiv, UserGames_DispNameDiv,
        UserGames_ViwersDiv, Main_usergames, Main_ColoumnsCountGame, UserGames_itemsCount);

    if (UserGames_cursorY > 2) Main_LazyImg(UserGames_Img, UserGames_cursorY, IMG_404_GAME, Main_ColoumnsCountGame, 3);

    if (((UserGames_cursorY + Main_ItemsReloadLimitGame) > (UserGames_itemsCount / Main_ColoumnsCountGame)) &&
        !UserGames_dataEnded && !UserGames_loadingMore) {
        UserGames_loadingMore = true;
        UserGames_loadDataPrepare();
        UserGames_loadDataRequest();
    }
}

function UserGames_removeFocus() {
    Main_removeFocusGame(UserGames_cursorY, UserGames_cursorX, UserGames_Thumbnail, UserGames_ThumbnailDiv, UserGames_DispNameDiv, UserGames_ViwersDiv);
}

function UserGames_keyClickDelay() {
    UserGames_LastClickFinish = true;
}

function UserGames_handleKeyDown(event) {
    if (UserGames_loadingData && !UserGames_loadingMore) {
        event.preventDefault();
        return;
    } else if (!UserGames_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        UserGames_LastClickFinish = false;
        window.setTimeout(UserGames_keyClickDelay, UserGames_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Main_Go = Main_Users;
                UserGames_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((UserGames_cursorY), (UserGames_cursorX - 1), UserGames_Thumbnail)) {
                UserGames_removeFocus();
                UserGames_cursorX--;
                UserGames_addFocus();
            } else {
                for (i = (Main_ColoumnsCountGame - 1); i > -1; i--) {
                    if (Main_ThumbNull((UserGames_cursorY - 1), i, UserGames_Thumbnail)) {
                        UserGames_removeFocus();
                        UserGames_cursorY--;
                        UserGames_cursorX = i;
                        UserGames_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((UserGames_cursorY), (UserGames_cursorX + 1), UserGames_Thumbnail)) {
                UserGames_removeFocus();
                UserGames_cursorX++;
                UserGames_addFocus();
            } else if (Main_ThumbNull((UserGames_cursorY + 1), 0, UserGames_Thumbnail)) {
                UserGames_removeFocus();
                UserGames_cursorY++;
                UserGames_cursorX = 0;
                UserGames_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountGame; i++) {
                if (Main_ThumbNull((UserGames_cursorY - 1), (UserGames_cursorX - i), UserGames_Thumbnail)) {
                    UserGames_removeFocus();
                    UserGames_cursorY--;
                    UserGames_cursorX = UserGames_cursorX - i;
                    UserGames_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountGame; i++) {
                if (Main_ThumbNull((UserGames_cursorY + 1), (UserGames_cursorX - i), UserGames_Thumbnail)) {
                    UserGames_removeFocus();
                    UserGames_cursorY++;
                    UserGames_cursorX = UserGames_cursorX - i;
                    UserGames_addFocus();
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            if (!UserGames_loadingMore) {
                UserGames_live = !UserGames_live;
                UserGames_StartLoad();
                localStorage.setItem('user_Games_live', UserGames_live ? 'true' : 'false');
                Users_resetGameCell();
            }
            break;
        case KEY_CHANNELUP:
            if (!UserGames_loadingMore) {
                Main_Go = Main_UserChannels;
                UserGames_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_CHANNELDOWN:
            Main_Go = Main_UserHost;
            UserGames_exit();
            Main_SwitchScreen();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_gameSelected = $('#' + UserGames_Cell + UserGames_cursorY + '_' + UserGames_cursorX).attr('data-channelname');
            Main_BeforeAgame = Main_usergames;
            Main_BeforeAgameisSet = true;
            Main_Go = Main_aGame;
            AGame_UserGames = true;
            UserGames_exit();
            Main_SwitchScreen();
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            UserGames_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_BeforeSearch = Main_usergames;
            Main_Go = Main_Search;
            AGame_UserGames = false;
            UserGames_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}