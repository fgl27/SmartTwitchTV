//Variable initialization
var Games_Status = false;
var Games_cursorY = 0;
var Games_cursorX = 0;
var Games_dataEnded = false;
var Games_itemsCount = 0;
var Games_nameMatrix = [];
var Games_loadingData = false;
var Games_loadingDataTry = 0;
var Games_loadingDataTryMax = 10;
var Games_loadingDataTimeout = 3500;
var Games_blankCellCount = 0;
var Games_blankCellVector = [];
var Games_itemsCountOffset = 0;
var Games_LastClickFinish = true;
var Games_keyClickDelayTime = 0;
var Games_ReplacedataEnded = false;
var Games_MaxOffset = 0;
var Main_ItemsLimitGameOffset = 1;
var Games_itemsCountCheck = false;
var Games_emptyContent = false;
var Games_loadingMore = false;

var Games_Img = 'img_games';
var Games_Thumbnail = 'thumbnail_Games_';
var Games_EmptyCell = 'gamesempty_';
var Games_ThumbnailDiv = 'game_thumbnail_div_';
var Games_DispNameDiv = 'game_display_name_';
var Games_ViwersDiv = 'game_viwers_';
var Games_Cell = 'game_cell_';
//Variable initialization end

function Games_init() {
    Main_Go = Main_games;
    document.body.addEventListener("keydown", Games_handleKeyDown, false);
    document.getElementById('top_bar_game').classList.add('icon_center_focus');
    Main_YRst(Games_cursorY);
    if (Games_Status) {
        Main_ScrollHelper(Games_Thumbnail, Games_cursorY, Games_cursorX, Main_games,
            Main_ScrollOffSetMinusGame, Main_ScrollOffSetGame, false);
        Main_CounterDialog(Games_cursorX, Games_cursorY, Main_ColoumnsCountGame, Games_itemsCount);
    } else Games_StartLoad();
}

function Games_exit() {
    document.body.removeEventListener("keydown", Games_handleKeyDown);
    document.getElementById('top_bar_game').classList.remove('icon_center_focus');
}

function Games_StartLoad() {
    Main_HideWarningDialog();
    Games_Status = false;
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    $('#stream_table_games').empty();
    Games_loadingMore = false;
    Games_blankCellCount = 0;
    Games_blankCellVector = [];
    Games_itemsCountOffset = 0;
    Games_ReplacedataEnded = false;
    Games_itemsCountCheck = false;
    Games_MaxOffset = 0;
    Games_nameMatrix = [];
    Games_itemsCount = 0;
    Games_cursorX = 0;
    Games_cursorY = 0;
    Games_dataEnded = false;
    Main_CounterDialogRst();
    Games_loadDataPrepare();
    Games_loadDataRequest();
}

function Games_loadDataPrepare() {
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
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
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
        Games_loadingDataTimeout += (Games_loadingDataTry < 5) ? 250 : 3500;
        Games_loadDataRequest();
    } else {
        if (!Games_loadingMore) {
            Games_loadingData = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            Games_loadingMore = false;
            Games_dataEnded = true;
            Games_ReplacedataEnded = true;
            Games_loadDataSuccessFinish();
        }
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

    var coloumn_id, row_id, row, cell, game,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountGame + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountGame && cursor < response_items; coloumn_id++, cursor++) {
            game = response.top[cursor];
            if (Games_CellExists(game.game.name)) {
                coloumn_id--;
            } else {
                cell = Games_createCell(row_id, coloumn_id, game.game.name, game.game.box.template,
                    Main_addCommas(game.channels) + ' ' + STR_CHANNELS + STR_FOR + Main_addCommas(game.viewers) + STR_VIEWER);
                row.append(cell);
            }
        }
        for (coloumn_id; coloumn_id < Main_ColoumnsCountGame; coloumn_id++) {
            if (Games_dataEnded && !Games_itemsCountCheck) {
                Games_itemsCountCheck = true;
                Games_itemsCount = (row_id * Main_ColoumnsCountGame) + coloumn_id;
            }
            row.append(Main_createCellEmpty(row_id, coloumn_id, Games_EmptyCell));
            Games_blankCellVector.push(Games_EmptyCell + row_id + '_' + coloumn_id);
        }
        $('#stream_table_games').append(row);
    }

    Games_loadDataSuccessFinish();
}

function Games_createCell(row_id, coloumn_id, game_name, preview_thumbnail, viwers) {
    return $('<td id="' + Games_Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + game_name + '"></td>').html(
        Games_CellHtml(row_id, coloumn_id, game_name, viwers, preview_thumbnail));
}

function Games_CellHtml(row_id, coloumn_id, game_name, viwers, preview_thumbnail) {

    Games_nameMatrix.push(game_name);

    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main_GameSize);
    if (row_id < 2) Main_PreLoadAImage(preview_thumbnail); //try to pre cache first 2 rows

    return '<div id="' + Games_Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_game" ><img id="' + Games_Img + row_id + '_' +
        coloumn_id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + Games_ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + Games_DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + game_name + '</div>' +
        '<div id="' + Games_ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 100%; display: inline-block;">' +
        viwers + '</div></div>';
}

function Games_CellExists(display_name) {
    for (var i = 0; i < Games_nameMatrix.length; i++) {
        if (display_name === Games_nameMatrix[i]) {
            Games_blankCellCount++;
            return true;
        }
    }
    return false;
}

function Games_loadDataSuccessFinish() {
    $(document).ready(function() {
        if (!Games_Status) {
            Main_HideLoadDialog();
            if (Games_emptyContent) Main_showWarningDialog(STR_NO + STR_LIVE_GAMES);
            else {
                Games_Status = true;
                Games_addFocus();
                Main_LazyImgStart(Games_Img, 7, IMG_404_GAME, Main_ColoumnsCountGame);
            }
            Games_loadingData = false;
        } else {
            if (Games_blankCellCount > 0 && !Games_dataEnded) {
                Games_loadingMore = true;
                Games_loadDataPrepare();
                Games_loadDataReplace();
                return;
            } else {
                Games_blankCellCount = 0;
                Games_blankCellVector = [];
            }

            Games_loadingData = false;
            Games_loadingMore = false;
        }
    });
}

function Games_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReload(Games_blankCellCount);

        var offset = Games_itemsCount + Games_itemsCountOffset;
        if (offset && offset > (Games_MaxOffset - 1)) {
            offset = Games_MaxOffset - Main_ItemsLimitReload;
            Games_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/games/top?limit=' + Main_ItemsLimitReload + '&offset=' + offset + '&' +
            Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = Games_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
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
        Games_loadingDataTimeout += (Games_loadingDataTry < 5) ? 250 : 3500;
        Games_loadDataReplace();
    } else {
        Games_ReplacedataEnded = true;
        Games_blankCellCount = 0;
        Games_blankCellVector = [];
        Games_loadDataSuccessFinish();
    }
}

function Games_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.top.length;
    var game, index, cursor = 0;
    var tempVector = Games_blankCellVector.slice();

    Games_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitGame) Games_ReplacedataEnded = true;

    for (var i = 0; i < Games_blankCellVector.length && cursor < response_items; i++, cursor++) {
        game = response.top[cursor];
        if (Games_CellExists(game.game.name)) {
            Games_blankCellCount--;
            i--;
        } else {
            Games_replaceCellEmpty(Games_blankCellVector[i], game.game.name, game.game.box.template,
                Main_addCommas(game.channels) + ' ' + STR_CHANNELS + STR_FOR + Main_addCommas(game.viewers) + STR_VIEWER);
            Games_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    Games_itemsCountOffset += cursor;
    if (Games_ReplacedataEnded) {
        Games_blankCellCount = 0;
        Games_blankCellVector = [];
    } else Games_blankCellVector = tempVector;

    Games_loadDataSuccessFinish();
}

function Games_replaceCellEmpty(id, game_name, preview_thumbnail, viwers) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = Games_Cell + row_id + '_' + coloumn_id;

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', game_name);
    document.getElementById(cell).innerHTML = Games_CellHtml(row_id, coloumn_id, game_name, viwers, preview_thumbnail);
}

function Games_addFocus() {

    Main_addFocusGame(Games_cursorY, Games_cursorX, Games_Thumbnail, Games_ThumbnailDiv, Games_DispNameDiv, Games_ViwersDiv, Main_games,
        Main_ColoumnsCountGame, Games_itemsCount);

    if (Games_cursorY > 2) Main_LazyImg(Games_Img, Games_cursorY, IMG_404_GAME, Main_ColoumnsCountGame, 3);

    if (((Games_cursorY + Main_ItemsReloadLimitGame) > (Games_itemsCount / Main_ColoumnsCountGame)) &&
        !Games_dataEnded && !Games_loadingMore) {
        Games_loadingMore = true;
        Games_loadDataPrepare();
        Games_loadDataRequest();
    }
}

function Games_removeFocus() {
    Main_removeFocusGame(Games_cursorY, Games_cursorX, Games_Thumbnail, Games_ThumbnailDiv, Games_DispNameDiv, Games_ViwersDiv);
}

function Games_keyClickDelay() {
    Games_LastClickFinish = true;
}

function Games_handleKeyDown(event) {
    if ((Games_loadingData && !Games_loadingMore) || !Games_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Games_LastClickFinish = false;
        window.setTimeout(Games_keyClickDelay, Games_keyClickDelayTime);
    }

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
            if (Main_ThumbNull((Games_cursorY), (Games_cursorX - 1), Games_Thumbnail)) {
                Games_removeFocus();
                Games_cursorX--;
                Games_addFocus();
            } else {
                for (i = (Main_ColoumnsCountGame - 1); i > -1; i--) {
                    if (Main_ThumbNull((Games_cursorY - 1), i, Games_Thumbnail)) {
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
            if (Main_ThumbNull((Games_cursorY), (Games_cursorX + 1), Games_Thumbnail)) {
                Games_removeFocus();
                Games_cursorX++;
                Games_addFocus();
            } else if (Main_ThumbNull((Games_cursorY + 1), 0, Games_Thumbnail)) {
                Games_removeFocus();
                Games_cursorY++;
                Games_cursorX = 0;
                Games_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountGame; i++) {
                if (Main_ThumbNull((Games_cursorY - 1), (Games_cursorX - i), Games_Thumbnail)) {
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
                if (Main_ThumbNull((Games_cursorY + 1), (Games_cursorX - i), Games_Thumbnail)) {
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
            if (!Games_loadingMore) Games_StartLoad();
            break;
        case KEY_CHANNELUP:
            Main_Before = Main_games;
            Main_Go = Main_Live;
            Games_exit();
            Main_SwitchScreen();
            break;
        case KEY_CHANNELDOWN:
            Main_Before = Main_games;
            Main_Go = AddUser_IsUserSet() ? Main_Users : Main_addUser;
            Games_exit();
            Main_SwitchScreen();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (!Games_loadingMore) {
                Main_gameSelected = $('#' + Games_Cell + Games_cursorY + '_' + Games_cursorX).attr('data-channelname');
                document.body.removeEventListener("keydown", Games_handleKeyDown);
                Main_BeforeAgame = Main_Go;
                Main_Go = Main_aGame;
                Main_BeforeAgameisSet = true;
                AGame_UserGames = false;
                Games_exit();
                Main_SwitchScreen();
            }
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