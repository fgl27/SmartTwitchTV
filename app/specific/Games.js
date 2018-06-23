//Variable initialization
var Games_Status = false;
var Games_cursorY = 0;
var Games_cursorX = 0;
var Games_dataEnded = false;
var Games_itemsCount = 0;
var Games_idObject = {};
var Games_loadingData = false;
var Games_loadingDataTry = 0;
var Games_loadingDataTryMax = 5;
var Games_loadingDataTimeout = 3500;
var Games_emptyCellVector = [];
var Games_itemsCountOffset = 0;
var Games_ReplacedataEnded = false;
var Games_MaxOffset = 0;
var Main_ItemsLimitGameOffset = 1;
var Games_itemsCountCheck = false;
var Games_emptyContent = false;
var Games_FirstLoad = false;

var Games_ids = ['g_thumbdiv', 'g_img', 'g_infodiv', 'g_displayname', 'g_viwers', 'g_cell', 'gempty_', 'games_scroll'];
//Variable initialization end

function Games_init() {
    Main_Go = Main_games;
    document.body.addEventListener("keydown", Games_handleKeyDown, false);
    Main_AddClass('top_bar_game', 'icon_center_focus');
    Main_YRst(Games_cursorY);
    if (Games_Status) {
        Main_ShowElement(Games_ids[7]);
        Main_ScrollHelperGames(Games_ids[0], Games_cursorY, Games_cursorX);
        Main_CounterDialog(Games_cursorX, Games_cursorY, Main_ColoumnsCountGame, Games_itemsCount);
    } else Games_StartLoad();
}

function Games_exit() {
    document.body.removeEventListener("keydown", Games_handleKeyDown);
    Main_RemoveClass('top_bar_game', 'icon_center_focus');
    Main_HideElement(Games_ids[7]);

}

function Games_StartLoad() {
    Main_HideElement(Games_ids[7]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    Games_Status = false;
    Main_empty('stream_table_games');
    Games_emptyCellVector = [];
    Games_itemsCountOffset = 0;
    Games_ReplacedataEnded = false;
    Games_itemsCountCheck = false;
    Games_MaxOffset = 0;
    Games_idObject = {};
    Games_itemsCount = 0;
    Games_FirstLoad = true;
    Games_cursorX = 0;
    Games_cursorY = 0;
    Games_dataEnded = false;
    Main_CounterDialogRst();
    Games_loadDataPrepare();
    Games_loadDataRequest();
}

function Games_loadDataPrepare() {
    Main_imgVectorRst();
    Games_loadingData = true;
    Games_loadingDataTry = 0;
    Games_loadingDataTimeout = 3500;
}

function Games_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Games_itemsCount + Games_itemsCountOffset;
        if (offset && offset > (Games_MaxOffset - 1)) {
            offset = Games_MaxOffset - Main_ItemsLimitGame;
            Games_dataEnded = true;
            Games_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/games/top?limit=' + (Main_ItemsLimitGame + (!offset ? Main_ItemsLimitGameOffset : 0)) +
            '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Games_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Games_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    Games_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Games_loadDataError();
    }
}

function Games_loadDataError() {
    Games_loadingDataTry++;
    if (Games_loadingDataTry < Games_loadingDataTryMax) {
        Games_loadingDataTimeout += 500;
        Games_loadDataRequest();
    } else {
        if (!Games_itemsCount) {
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            Games_dataEnded = true;
            Games_ReplacedataEnded = true;
            Games_loadDataSuccessFinish();
        }
        Games_loadingData = false;
    }
}

function Games_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.top.length;
    Games_MaxOffset = parseInt(response._total);

    if (response_items > Main_ItemsLimitGame) {
        Main_ItemsLimitGameOffset = 0;
        Games_loadDataPrepare();
        Games_loadDataRequest();
        return;
    } else if (response_items < Main_ItemsLimitGame) Games_dataEnded = true;

    var offset_itemsCount = Games_itemsCount;
    Games_itemsCount += response_items;

    Games_emptyContent = !Games_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountGame;
    if (response_items % Main_ColoumnsCountGame > 0) response_rows++;

    var coloumn_id, row_id, row, game, id,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountGame + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountGame && cursor < response_items; coloumn_id++, cursor++) {
            game = response.top[cursor];
            id = game.game._id;
            if (Games_idObject[id]) coloumn_id--;
            else {
                Games_idObject[id] = 1;
                row.appendChild(Games_createCell(row_id, row_id + '_' + coloumn_id, [game.game.name, game.game.box.template.replace("{width}x{height}", Main_GameSize),
                    Main_addCommas(game.channels) + ' ' + STR_CHANNELS + STR_FOR + Main_addCommas(game.viewers) + STR_VIEWER
                ]));
            }
        }
        for (coloumn_id; coloumn_id < Main_ColoumnsCountGame; coloumn_id++) {
            if (Games_dataEnded && !Games_itemsCountCheck) {
                Games_itemsCountCheck = true;
                Games_itemsCount = (row_id * Main_ColoumnsCountGame) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(Games_ids[6] + row_id + '_' + coloumn_id));
            Games_emptyCellVector.push(Games_ids[6] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_games").appendChild(row);
    }

    Games_loadDataSuccessFinish();
}

function Games_createCell(row_id, id, valuesArray) {
    if (row_id < 2) Main_PreLoadAImage(valuesArray[1]); //try to pre cache first 2 rows
    return Main_createCellGame(id, Games_ids, valuesArray); //[preview_thumbnail, game_name, viwers]
}

function Games_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!Games_Status) {
            Main_HideLoadDialog();
            if (Games_emptyContent) Main_showWarningDialog(STR_NO + STR_LIVE_GAMES);
            else {
                Games_Status = true;
                Main_imgVectorLoad(IMG_404_GAME);
                Games_addFocus();
            }
            Main_ShowElement(Games_ids[7]);
            Games_FirstLoad = false;
        } else {
            Main_imgVectorLoad(IMG_404_GAME);
            if (Games_emptyCellVector.length > 0 && !Games_dataEnded) {
                Games_loadDataPrepare();
                Games_loadDataReplace();
                return;
            } else Games_emptyCellVector = [];
        }
        Games_loadingData = false;
    });
}

function Games_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReplace(Games_emptyCellVector.length);

        var offset = Games_itemsCount + Games_itemsCountOffset;
        if (offset && offset > (Games_MaxOffset - 1)) {
            offset = Games_MaxOffset - Main_ItemsLimitReplace;
            Games_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/games/top?limit=' + Main_ItemsLimitReplace + '&offset=' + offset + '&' +
            Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = Games_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Games_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Games_loadDataErrorReplace();
    }
}

function Games_loadDataErrorReplace() {
    Games_loadingDataTry++;
    if (Games_loadingDataTry < Games_loadingDataTryMax) {
        Games_loadingDataTimeout += 500;
        Games_loadDataReplace();
    } else {
        Games_ReplacedataEnded = true;
        Games_emptyCellVector = [];
        Games_loadDataSuccessFinish();
    }
}

function Games_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.top.length;
    var game, index, id, cursor = 0;
    var tempVector = Games_emptyCellVector.slice();

    Games_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitGame) Games_ReplacedataEnded = true;

    for (var i = 0; i < Games_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        game = response.top[cursor];
        id = game.game._id;
        if (Games_idObject[id]) i--;
        else {
            Games_idObject[id] = 1;
            Main_replaceGame(Games_emptyCellVector[i], [game.game.name,
                game.game.box.template.replace("{width}x{height}", Main_GameSize),
                Main_addCommas(game.channels) + ' ' + STR_CHANNELS + STR_FOR + Main_addCommas(game.viewers) + STR_VIEWER
            ], Games_ids);

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) tempVector.splice(index, 1);
        }
    }

    Games_itemsCountOffset += cursor;
    if (Games_ReplacedataEnded) Games_emptyCellVector = [];
    else Games_emptyCellVector = tempVector;

    Games_loadDataSuccessFinish();
}

function Games_addFocus() {
    Main_addFocusGame(Games_cursorY, Games_cursorX, Games_ids,
        Main_ColoumnsCountGame, Games_itemsCount);

    if (((Games_cursorY + Main_ItemsReloadLimitGame) > (Games_itemsCount / Main_ColoumnsCountGame)) &&
        !Games_dataEnded && !Games_loadingData) {
        Games_loadDataPrepare();
        Games_loadDataRequest();
    }
}

function Games_removeFocus() {
    Main_removeFocus(Games_cursorY + '_' + Games_cursorX, Games_ids);
}

function Games_handleKeyDown(event) {
    if (Games_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                if (Main_Go === Main_Before || Main_Before === Main_aGame || Main_Before === Main_Search) Main_Go = Main_Live;
                else Main_Go = Main_Before;
                Games_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((Games_cursorY), (Games_cursorX - 1), Games_ids[0])) {
                Games_removeFocus();
                Games_cursorX--;
                Games_addFocus();
            } else {
                for (i = (Main_ColoumnsCountGame - 1); i > -1; i--) {
                    if (Main_ThumbNull((Games_cursorY - 1), i, Games_ids[0])) {
                        Games_removeFocus();
                        Games_cursorY--;
                        Games_cursorX = i;
                        Games_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((Games_cursorY), (Games_cursorX + 1), Games_ids[0])) {
                Games_removeFocus();
                Games_cursorX++;
                Games_addFocus();
            } else if (Main_ThumbNull((Games_cursorY + 1), 0, Games_ids[0])) {
                Games_removeFocus();
                Games_cursorY++;
                Games_cursorX = 0;
                Games_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountGame; i++) {
                if (Main_ThumbNull((Games_cursorY - 1), (Games_cursorX - i), Games_ids[0])) {
                    Games_removeFocus();
                    Games_cursorY--;
                    Games_cursorX = Games_cursorX - i;
                    Games_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountGame; i++) {
                if (Main_ThumbNull((Games_cursorY + 1), (Games_cursorX - i), Games_ids[0])) {
                    Games_removeFocus();
                    Games_cursorY++;
                    Games_cursorX = Games_cursorX - i;
                    Games_addFocus();
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            Games_StartLoad();
            break;
        case KEY_CHANNELUP:
            Main_Before = Main_games;
            Main_Go = Main_Vod;
            Games_exit();
            Main_SwitchScreen();
            break;
        case KEY_CHANNELDOWN:
            Main_Before = Main_games;
            Main_Go = Main_Featured;
            Games_exit();
            Main_SwitchScreen();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_gameSelected = document.getElementById(Games_ids[5] + Games_cursorY + '_' + Games_cursorX).getAttribute(Main_DataAttribute);
            document.body.removeEventListener("keydown", Games_handleKeyDown);
            Main_BeforeAgame = Main_Go;
            Main_Go = Main_aGame;
            Main_BeforeAgameisSet = true;
            AGame_UserGames = false;
            Games_exit();
            Main_SwitchScreen();
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            Games_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_BeforeSearch = Main_games;
            Main_Go = Main_Search;
            Games_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}