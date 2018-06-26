//Variable initialization
var UserGames_cursorY = 0;
var UserGames_cursorX = 0;
var UserGames_dataEnded = false;
var UserGames_itemsCount = 0;
var UserGames_idObject = {};
var UserGames_emptyCellVector = [];
var UserGames_loadingData = false;
var UserGames_loadingDataTry = 0;
var UserGames_loadingDataTryMax = 5;
var UserGames_loadingDataTimeout = 3500;
var UserGames_itemsCountOffset = 0;
var UserGames_MaxOffset = 0;
var UserGames_emptyContent = false;
var UserGames_itemsCountCheck = false;
var UserGames_live = true;
var UserGames_Status = false;
var UserGames_OldUserName = '';
var UserGames_FirstLoad = false;

var UserGames_ids = ['ug_thumbdiv', 'ug_img', 'ug_infodiv', 'ug_displayname', 'ug_viwers', 'ug_cell', 'ugempty_', 'user_games_scroll'];
//Variable initialization end

function UserGames_init() {
    Main_Go = Main_usergames;
    Main_IconLoad('label_refresh', 'icon-refresh', STR_USER_GAMES_CHANGE + STR_LIVE_GAMES + '/' + STR_FALLOW_GAMES + STR_GUIDE);
    Main_AddClass('top_bar_user', 'icon_center_focus');
    document.body.addEventListener("keydown", UserGames_handleKeyDown, false);
    if (UserGames_OldUserName !== Main_UserName) UserGames_Status = false;
    if (UserGames_Status) {
        Main_YRst(UserGames_cursorY);
        Main_ShowElement(UserGames_ids[7]);
        Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(Main_UserName + ' ' + (UserGames_live ? STR_LIVE_GAMES : STR_FALLOW_GAMES)));
        Main_CounterDialog(UserGames_cursorX, UserGames_cursorY, Main_ColoumnsCountGame, UserGames_itemsCount);
    } else UserGames_StartLoad();
}

function UserGames_exit() {
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_textContent('top_bar_user', STR_USER);
    document.body.removeEventListener("keydown", UserGames_handleKeyDown);
    Main_HideElement(UserGames_ids[7]);
}

function UserGames_StartLoad() {
    Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(Main_UserName + ' ' + (UserGames_live ? STR_LIVE_GAMES : STR_FALLOW_GAMES)));
    Main_HideElement(UserGames_ids[7]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    UserGames_OldUserName = Main_UserName;
    UserGames_Status = false;
    Main_empty('stream_table_user_games');
    UserGames_itemsCountOffset = 0;
    UserGames_MaxOffset = 0;
    UserGames_FirstLoad = true;
    UserGames_idObject = {};
    UserGames_emptyCellVector = [];
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
    Main_imgVectorRst();
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
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/api/users/' + encodeURIComponent(Main_UserName) + '/follows/games' + (UserGames_live ? '/live' : '') +
            '?limit=' + Main_ItemsLimitGame + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserGames_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
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
        UserGames_loadingDataTimeout += 500;
        UserGames_loadDataRequest();
    } else {
        UserGames_loadingData = false;
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

    var coloumn_id, row_id, row, follows, id,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountGame + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountGame && cursor < response_items; coloumn_id++, cursor++) {
            follows = response.follows[cursor];
            if (UserGames_live) {
                id = follows.game._id;
                if (UserGames_idObject[id]) coloumn_id--;
                else {
                    UserGames_idObject[id] = 1;
                    row.appendChild(UserGames_createCell(row_id, row_id + '_' + coloumn_id, [follows.game.name, follows.game.box.template.replace("{width}x{height}", Main_GameSize),
                        Main_addCommas(follows.channels) + ' ' + STR_CHANNELS + STR_FOR +
                        Main_addCommas(follows.viewers) + STR_VIEWER
                    ]));
                }
            } else {
                id = follows._id;
                if (UserGames_idObject[id]) coloumn_id--;
                else {
                    UserGames_idObject[id] = 1;
                    row.appendChild(UserGames_createCell(row_id, row_id + '_' + coloumn_id, [follows.name, follows.box.template.replace("{width}x{height}", Main_GameSize), '']));
                }
            }
        }
        for (coloumn_id; coloumn_id < Main_ColoumnsCountGame; coloumn_id++) {
            if (UserGames_dataEnded && !UserGames_itemsCountCheck) {
                UserGames_itemsCountCheck = true;
                UserGames_itemsCount = (row_id * Main_ColoumnsCountGame) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(UserGames_ids[6] + row_id + '_' + coloumn_id));
            UserGames_emptyCellVector.push(UserGames_ids[6] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_user_games").appendChild(row);
    }

    UserGames_loadDataSuccessFinish();
}

function UserGames_createCell(row_id, id, valuesArray) {
    if (row_id < 2) Main_PreLoadAImage(valuesArray[1]); //try to pre cache first 2 rows
    return Main_createCellGame(id, UserGames_ids, valuesArray); //[preview_thumbnail, game_name, viwers]
}

function UserGames_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!UserGames_Status) {
            Main_HideLoadDialog();
            if (UserGames_emptyContent) Main_showWarningDialog(STR_NO + STR_LIVE_GAMES);
            else {
                UserGames_Status = true;
                Main_imgVectorLoad(IMG_404_GAME);
                UserGames_addFocus();
            }
            Main_ShowElement(UserGames_ids[7]);
            UserGames_FirstLoad = false;
        } else {
            Main_imgVectorLoad(IMG_404_GAME);
            if (UserGames_emptyCellVector.length > 0 && !UserGames_dataEnded) {
                UserGames_loadDataPrepare();
                UserGames_loadDataReplace();
                return;
            } else UserGames_emptyCellVector = [];

        }
        UserGames_loadingData = false;
    });
}

function UserGames_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReplace(UserGames_emptyCellVector.length);

        var offset = UserGames_itemsCount + UserGames_itemsCountOffset;
        if (offset && offset > (UserGames_MaxOffset - 1)) {
            offset = UserGames_MaxOffset - Main_ItemsLimitReplace;
            UserGames_dataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/api/users/' + encodeURIComponent(Main_UserName) + '/follows/games' + (UserGames_live ? '/live' : '') +
            '?limit=' + Main_ItemsLimitReplace + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserGames_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
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
        UserGames_loadingDataTimeout += 500;
        UserGames_loadDataReplace();
    } else {
        UserGames_dataEnded = true;
        UserGames_itemsCount -= UserGames_emptyCellVector.length;
        UserGames_emptyCellVector = [];
        UserGames_loadDataSuccessFinish();
    }
}

function UserGames_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.follows.length,
        follows, id, i = 0,
        cursor = 0,
        tempVector = [];

    UserGames_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitReplace) UserGames_dataEnded = true;

    for (i; i < UserGames_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        follows = response.follows[cursor];
        if (UserGames_live) {
            id = follows.game._id;
            if (UserGames_idObject[id]) i--;
            else {
                UserGames_idObject[id] = 1;
                Main_replaceGame(UserGames_emptyCellVector[i], [follows.game.name,
                    follows.game.box.template.replace("{width}x{height}", Main_GameSize),
                    Main_addCommas(follows.channels) + ' ' + STR_CHANNELS + STR_FOR +
                    Main_addCommas(follows.viewers) + STR_VIEWER
                ], UserGames_ids);
            }
        } else {
            id = follows._id;
            if (UserGames_idObject[id]) i--;
            else {
                UserGames_idObject[id] = 1;
                Main_replaceGame(UserGames_emptyCellVector[i], [follows.name,
                    follows.box.template.replace("{width}x{height}", Main_GameSize), ''
                ], UserGames_ids);
            }
        }
        tempVector.push(i);
    }

    for (i = tempVector.length - 1; i > -1; i--) UserGames_emptyCellVector.splice(tempVector[i], 1);

    UserGames_itemsCountOffset += cursor;
    if (UserGames_dataEnded) {
        UserGames_itemsCount -= UserGames_emptyCellVector.length;
        UserGames_emptyCellVector = [];
    }

    UserGames_loadDataSuccessFinish();
}

function UserGames_addFocus() {
    Main_addFocusGame(UserGames_cursorY, UserGames_cursorX, UserGames_ids, Main_ColoumnsCountGame, UserGames_itemsCount);

    if (((UserGames_cursorY + Main_ItemsReloadLimitGame) > (UserGames_itemsCount / Main_ColoumnsCountGame)) &&
        !UserGames_dataEnded && !UserGames_loadingData) {
        UserGames_loadDataPrepare();
        UserGames_loadDataRequest();
    }
}

function UserGames_removeFocus() {
    Main_removeFocus(UserGames_cursorY + '_' + UserGames_cursorX, UserGames_ids);
}

function UserGames_handleKeyDown(event) {
    if (UserGames_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

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
            if (Main_ThumbNull((UserGames_cursorY), (UserGames_cursorX - 1), UserGames_ids[0])) {
                UserGames_removeFocus();
                UserGames_cursorX--;
                UserGames_addFocus();
            } else {
                for (i = (Main_ColoumnsCountGame - 1); i > -1; i--) {
                    if (Main_ThumbNull((UserGames_cursorY - 1), i, UserGames_ids[0])) {
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
            if (Main_ThumbNull((UserGames_cursorY), (UserGames_cursorX + 1), UserGames_ids[0])) {
                UserGames_removeFocus();
                UserGames_cursorX++;
                UserGames_addFocus();
            } else if (Main_ThumbNull((UserGames_cursorY + 1), 0, UserGames_ids[0])) {
                UserGames_removeFocus();
                UserGames_cursorY++;
                UserGames_cursorX = 0;
                UserGames_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountGame; i++) {
                if (Main_ThumbNull((UserGames_cursorY - 1), (UserGames_cursorX - i), UserGames_ids[0])) {
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
                if (Main_ThumbNull((UserGames_cursorY + 1), (UserGames_cursorX - i), UserGames_ids[0])) {
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
            UserGames_live = !UserGames_live;
            UserGames_StartLoad();
            localStorage.setItem('user_Games_live', UserGames_live ? 'true' : 'false');
            Users_resetGameCell();
            break;
        case KEY_CHANNELUP:
            Main_Go = Main_UserChannels;
            UserGames_exit();
            Main_SwitchScreen();
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
            Main_gameSelected = document.getElementById(UserGames_ids[5] + UserGames_cursorY + '_' + UserGames_cursorX).getAttribute(Main_DataAttribute);
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