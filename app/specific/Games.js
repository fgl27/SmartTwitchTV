//Variable initialization
var games_Status = false;
var games_cursorY = 0;
var games_cursorX = 0;
var games_dataEnded = false;
var games_itemsCount = 0;
var games_nameMatrix = [];
var games_loadingData = false;
var games_loadingDataTry = 0;
var games_loadingDataTryMax = 10;
var games_loadingDataTimeout = 3500;
var games_isDialogOn = false;
var games_blankCellCount = 0;
var games_blankCellVector = [];
var games_itemsCountOffset = 0;
var games_LastClickFinish = true;
var games_keyClickDelayTime = 0;
var games_ReplacedataEnded = false;
var games_MaxOffset = 0;
main_ItemsLimitGameOffset = 1;
var games_itemsCountCheck = false;
var games_emptyContent = false;

var games_Img = 'img_games';
var games_Thumbnail = 'thumbnail_games_';
var games_EmptyCell = 'gamesempty_';
var games_ThumbnailDiv = 'game_thumbnail_div_';
var games_DispNameDiv = 'game_display_name_';
var games_ViwersDiv = 'game_viwers_';
var games_Cell = 'game_cell_';
//Variable initialization end

function games_init() {
    main_Go = main_games;
    document.body.addEventListener("keydown", games_handleKeyDown, false);
    document.getElementById('top_bar_game').classList.add('icon_center_focus');
    main_YRst(games_cursorY);
    if (games_Status) {
        main_ScrollHelper(games_Thumbnail, games_cursorY, games_cursorX, main_games,
            main_ScrollOffSetMinusGame, main_ScrollOffSetGame, false);
        main_CounterDialog(games_cursorX, games_cursorY, main_ColoumnsCountGame, games_itemsCount);
    } else games_StartLoad();
}

function games_exit() {
    document.body.removeEventListener("keydown", games_handleKeyDown);
    document.getElementById('top_bar_game').classList.remove('icon_center_focus');
}

function games_StartLoad() {
    main_HideWarningDialog();
    games_Status = false;
    main_ScrollHelperBlank('blank_focus');
    main_showLoadDialog();
    $('#stream_table_games').empty();
    games_loadingMore = false;
    games_blankCellCount = 0;
    games_blankCellVector = [];
    games_itemsCountOffset = 0;
    games_ReplacedataEnded = false;
    games_itemsCountCheck = false;
    games_MaxOffset = 0;
    games_nameMatrix = [];
    games_itemsCount = 0;
    games_cursorX = 0;
    games_cursorY = 0;
    games_dataEnded = false;
    main_CounterDialogRst();
    games_loadDataPrepare();
    games_loadDataRequest();
}

function games_loadDataPrepare() {
    games_loadingData = true;
    games_loadingDataTry = 0;
    games_loadingDataTimeout = 3500;
}

function games_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = games_itemsCount + games_itemsCountOffset;
        if (offset && offset > (games_MaxOffset - 1)) {
            offset = games_MaxOffset - main_ItemsLimitGame;
            games_dataEnded = true;
            games_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/games/top?limit=' + (main_ItemsLimitGame + (!offset ? main_ItemsLimitGameOffset : 0)) +
            '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = games_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    games_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    games_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        games_loadDataError();
    }
}

function games_loadDataError() {
    games_loadingDataTry++;
    if (games_loadingDataTry < games_loadingDataTryMax) {
        games_loadingDataTimeout += (games_loadingDataTry < 5) ? 250 : 3500;
        games_loadDataRequest();
    } else {
        if (!games_loadingMore) {
            games_loadingData = false;
            main_HideLoadDialog();
            main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            games_loadingMore = false;
            games_dataEnded = true;
            games_ReplacedataEnded = true;
            games_loadDataSuccessFinish();
        }
    }
}

function games_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.top.length;
    games_MaxOffset = parseInt(response._total);

    if (response_items > main_ItemsLimitGame) {
        main_ItemsLimitGameOffset = 0;
        games_loadDataPrepare();
        games_loadDataRequest();
        return;
    } else if (response_items < main_ItemsLimitGame) games_dataEnded = true;

    var offset_itemsCount = games_itemsCount;
    games_itemsCount += response_items;

    games_emptyContent = !games_itemsCount;

    var response_rows = response_items / main_ColoumnsCountGame;
    if (response_items % main_ColoumnsCountGame > 0) response_rows++;

    var coloumn_id, row_id, row, cell, game,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / main_ColoumnsCountGame + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < main_ColoumnsCountGame && cursor < response_items; coloumn_id++, cursor++) {
            game = response.top[cursor];
            if (games_CellExists(game.game.name)) {
                coloumn_id--;
            } else {
                cell = games_createCell(row_id, coloumn_id, game.game.name, game.game.box.template,
                    main_addCommas(game.channels) + ' ' + STR_CHANNELS + STR_FOR + main_addCommas(game.viewers) + STR_VIEWER);
                row.append(cell);
            }
        }
        for (coloumn_id; coloumn_id < main_ColoumnsCountGame; coloumn_id++) {
            if (games_dataEnded && !games_itemsCountCheck) {
                games_itemsCountCheck = true;
                games_itemsCount = (row_id * main_ColoumnsCountGame) + coloumn_id;
            }
            row.append(main_createCellEmpty(row_id, coloumn_id, games_EmptyCell));
            games_blankCellVector.push(games_EmptyCell + row_id + '_' + coloumn_id);
        }
        $('#stream_table_games').append(row);
    }

    games_loadDataSuccessFinish();
}

function games_createCell(row_id, coloumn_id, game_name, preview_thumbnail, viwers) {
    return $('<td id="' + games_Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + game_name + '"></td>').html(
        games_CellHtml(row_id, coloumn_id, game_name, viwers, preview_thumbnail));
}

function games_CellHtml(row_id, coloumn_id, game_name, viwers, preview_thumbnail) {

    games_nameMatrix.push(game_name);

    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", main_GameSize);
    if (row_id < 2) main_PreLoadAImage(preview_thumbnail); //try to pre cache first 2 rows

    return '<div id="' + games_Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_game" ><img id="' + games_Img + row_id + '_' +
        coloumn_id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + games_ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + games_DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + game_name + '</div>' +
        '<div id="' + games_ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 100%; display: inline-block;">' +
        viwers + '</div></div>';
}

function games_CellExists(display_name) {
    if (games_nameMatrix.indexOf(display_name) > -1) {
        games_blankCellCount++;
        return true;
    }
    return false;
}

function games_loadDataSuccessFinish() {
    $(document).ready(function() {
        if (!games_Status) {
            main_HideLoadDialog();
            if (games_emptyContent) main_showWarningDialog(STR_NO + STR_LIVE_GAMES);
            else {
                games_Status = true;
                games_addFocus();
                main_LazyImgStart(games_Img, 7, IMG_404_GAME, main_ColoumnsCountGame);
            }
            games_loadingData = false;
        } else {
            if (games_blankCellCount > 0 && !games_dataEnded) {
                games_loadingMore = true;
                games_loadDataPrepare();
                games_loadDataReplace();
                return;
            } else {
                games_blankCellCount = 0;
                games_blankCellVector = [];
            }

            games_loadingData = false;
            games_loadingMore = false;
        }
    });
}

function games_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        main_SetItemsLimitReload(games_blankCellCount);

        var offset = games_itemsCount + games_itemsCountOffset;
        if (offset && offset > (games_MaxOffset - 1)) {
            offset = games_MaxOffset - main_ItemsLimitReload;
            games_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/games/top?limit=' + main_ItemsLimitReload + '&offset=' + offset + '&' +
            Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = games_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    games_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        games_loadDataErrorReplace();
    }
}

function games_loadDataErrorReplace() {
    games_loadingDataTry++;
    if (games_loadingDataTry < games_loadingDataTryMax) {
        games_loadingDataTimeout += (games_loadingDataTry < 5) ? 250 : 3500;
        games_loadDataReplace();
    } else {
        games_ReplacedataEnded = true;
        games_blankCellCount = 0;
        games_blankCellVector = [];
        games_loadDataSuccessFinish();
    }
}

function games_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.top.length;
    var game, index, cursor = 0;
    var tempVector = games_blankCellVector.slice();

    games_MaxOffset = parseInt(response._total);

    if (response_items < main_ItemsLimitGame) games_ReplacedataEnded = true;

    for (var i = 0; i < games_blankCellVector.length && cursor < response_items; i++, cursor++) {
        game = response.top[cursor];
        if (games_CellExists(game.game.name)) {
            games_blankCellCount--;
            i--;
        } else {
            games_replaceCellEmpty(games_blankCellVector[i], game.game.name, game.game.box.template,
                main_addCommas(game.channels) + ' ' + STR_CHANNELS + STR_FOR + main_addCommas(game.viewers) + STR_VIEWER);
            games_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    games_itemsCountOffset += cursor;
    if (games_ReplacedataEnded) {
        games_blankCellCount = 0;
        games_blankCellVector = [];
    } else games_blankCellVector = tempVector;

    games_loadDataSuccessFinish();
}

function games_replaceCellEmpty(id, game_name, preview_thumbnail, viwers) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = games_Cell + row_id + '_' + coloumn_id;

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', game_name);
    document.getElementById(cell).innerHTML = games_CellHtml(row_id, coloumn_id, game_name, viwers, preview_thumbnail);
}

function games_addFocus() {

    main_addFocusGame(games_cursorY, games_cursorX, games_Thumbnail, games_ThumbnailDiv, games_DispNameDiv, games_ViwersDiv, main_games,
        main_ColoumnsCountGame, games_itemsCount);

    if (games_cursorY > 2) main_LazyImg(games_Img, games_cursorY, IMG_404_GAME, main_ColoumnsCountGame, 3);

    if (((games_cursorY + main_ItemsReloadLimitGame) > (games_itemsCount / main_ColoumnsCountGame)) &&
        !games_dataEnded && !games_loadingMore) {
        games_loadingMore = true;
        games_loadDataPrepare();
        games_loadDataRequest();
    }
}

function games_removeFocus() {
    main_removeFocusGame(games_cursorY, games_cursorX, games_Thumbnail, games_ThumbnailDiv, games_DispNameDiv, games_ViwersDiv);
}

function games_keyClickDelay() {
    games_LastClickFinish = true;
}

function games_handleKeyDown(event) {
    if ((games_loadingData && !games_loadingMore) || !games_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        games_LastClickFinish = false;
        window.setTimeout(games_keyClickDelay, games_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (main_isAboutDialogShown()) main_HideAboutDialog();
            else if (main_isControlsDialogShown()) main_HideControlsDialog();
            else {
                if (main_Go === main_Before || main_Before === main_aGame || main_Before === main_Search) main_Go = main_Live;
                else main_Go = main_Before;
                games_exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (main_ThumbNull((games_cursorY), (games_cursorX - 1), games_Thumbnail)) {
                games_removeFocus();
                games_cursorX--;
                games_addFocus();
            } else {
                for (i = (main_ColoumnsCountGame - 1); i > -1; i--) {
                    if (main_ThumbNull((games_cursorY - 1), i, games_Thumbnail)) {
                        games_removeFocus();
                        games_cursorY--;
                        games_cursorX = i;
                        games_addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (main_ThumbNull((games_cursorY), (games_cursorX + 1), games_Thumbnail)) {
                games_removeFocus();
                games_cursorX++;
                games_addFocus();
            } else if (main_ThumbNull((games_cursorY + 1), 0, games_Thumbnail)) {
                games_removeFocus();
                games_cursorY++;
                games_cursorX = 0;
                games_addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < main_ColoumnsCountGame; i++) {
                if (main_ThumbNull((games_cursorY - 1), (games_cursorX - i), games_Thumbnail)) {
                    games_removeFocus();
                    games_cursorY--;
                    games_cursorX = games_cursorX - i;
                    games_addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < main_ColoumnsCountGame; i++) {
                if (main_ThumbNull((games_cursorY + 1), (games_cursorX - i), games_Thumbnail)) {
                    games_removeFocus();
                    games_cursorY++;
                    games_cursorX = games_cursorX - i;
                    games_addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!games_loadingMore) games_StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            main_Before = main_games;
            main_Go = main_Live;
            games_exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            main_Before = main_games;
            main_Go = addUser_IsUserSet() ? main_Users : main_addUser;
            games_exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (!games_loadingMore) {
                main_gameSelected = $('#' + games_Cell + games_cursorY + '_' + games_cursorX).attr('data-channelname');
                document.body.removeEventListener("keydown", games_handleKeyDown);
                main_Before = main_Go;
                main_Go = main_aGame;
                aGame_Usergames = false;
                games_exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_RED:
            main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            games_exit();
            main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            main_BeforeSearch = main_games;
            main_Go = main_Search;
            games_exit();
            main_SwitchScreen();
            break;
        default:
            break;
    }
}
