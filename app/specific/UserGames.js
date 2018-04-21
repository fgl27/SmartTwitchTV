//Variable initialization
var usergames_cursorY = 0;
var usergames_cursorX = 0;
var usergames_dataEnded = false;
var usergames_itemsCount = 0;
var usergames_nameMatrix = [];
var usergames_blankCellVector = [];
var usergames_loadingData = false;
var usergames_loadingDataTry = 0;
var usergames_loadingDataTryMax = 10;
var usergames_loadingDataTimeout = 3500;
var usergames_isDialogOn = false;
var usergames_blankCellCount = 0;
var usergames_itemsCountOffset = 0;
var usergames_LastClickFinish = true;
var usergames_keyClickDelayTime = 25;
var usergames_ReplacedataEnded = false;
var usergames_MaxOffset = 0;
var usergames_emptyContent = false;
var usergames_itemsCountCheck = false;
var usergames_live = true;

var usergames_Img = 'img_glive';
var usergames_Thumbnail = 'thumbnail_glive_';
var usergames_EmptyCell = 'gliveempty_';
var usergames_ThumbnailDiv = 'glive_thumbnail_div_';
var usergames_DispNameDiv = 'glive_display_name_';
var usergames_ViwersDiv = 'glive_viwers_';
var usergames_Cell = 'glive_cell_';
var usergames_Status = false;
var usergames_followerChannels = '';
var usergames_OldUserName = '';
//Variable initialization end

function usergames_init() {
    main_Go = main_usergames;
    main_IconLoad('label_refresh', 'icon-refresh', STR_USER_GAMES_CHANGE + STR_LIVE_GAMES + '/' + STR_FALLOW_GAMES + STR_GUIDE);
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    document.body.addEventListener("keydown", usergames_handleKeyDown, false);
    main_YRst(usergames_cursorY);
    if (usergames_OldUserName !== main_UserName) usergames_Status = false;
    if (usergames_Status) {
        document.getElementById('top_bar_user').innerHTML = STR_USER + main_UnderCenter(main_UserName + ' ' + (usergames_live ? STR_LIVE_GAMES : STR_FALLOW_GAMES));
        main_ScrollHelper(usergames_Thumbnail, usergames_cursorY, usergames_cursorX, main_usergames,
            main_ScrollOffSetMinusGame, main_ScrollOffSetGame, false);
        main_CounterDialog(usergames_cursorX, usergames_cursorY, main_ColoumnsCountGame, usergames_itemsCount);
    } else usergames_StartLoad();
}

function usergames_exit() {
    main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH);
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.getElementById('top_bar_user').innerHTML = STR_USER;
    document.body.removeEventListener("keydown", usergames_handleKeyDown);
}

function usergames_StartLoad() {
    main_HideWarningDialog();
    main_ScrollHelperBlank('blank_focus');
    document.getElementById('top_bar_user').innerHTML = STR_USER + main_UnderCenter(main_UserName + ' ' + (usergames_live ? STR_LIVE_GAMES : STR_FALLOW_GAMES));
    main_showLoadDialog();
    usergames_OldUserName = main_UserName;
    usergames_Status = false;
    $('#stream_table_user_games').empty();
    usergames_loadingMore = false;
    usergames_blankCellCount = 0;
    usergames_itemsCountOffset = 0;
    usergames_ReplacedataEnded = false;
    usergames_MaxOffset = 0;
    usergames_nameMatrix = [];
    usergames_blankCellVector = [];
    usergames_itemsCountCheck = false;
    usergames_itemsCount = 0;
    usergames_cursorX = 0;
    usergames_cursorY = 0;
    usergames_dataEnded = false;
    main_CounterDialogRst();
    usergames_loadDataPrepare();
    usergames_loadDataRequest();
}

function usergames_loadDataPrepare() {
    usergames_loadingData = true;
    usergames_loadingDataTry = 0;
    usergames_loadingDataTimeout = 3500;
}

function usergames_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = usergames_itemsCount + usergames_itemsCountOffset;
        if (offset && offset > (usergames_MaxOffset - 1)) {
            offset = usergames_MaxOffset - main_ItemsLimitGame;
            usergames_dataEnded = true;
            usergames_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/api/users/' + encodeURIComponent(main_UserName) + '/follows/games' + (usergames_live ? '/live' : '') +
            '?limit=' + main_ItemsLimitGame + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = usergames_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    usergames_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    usergames_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        usergames_loadDataError();
    }
}

function usergames_loadDataError() {
    usergames_loadingDataTry++;
    if (usergames_loadingDataTry < usergames_loadingDataTryMax) {
        usergames_loadingDataTimeout += (usergames_loadingDataTry < 5) ? 250 : 3500;
        usergames_loadDataRequest();
    } else {
        usergames_loadingData = false;
        usergames_loadingMore = false;
        main_HideLoadDialog();
        main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function usergames_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.follows.length;
    usergames_MaxOffset = parseInt(response._total);

    if (response_items < main_ItemsLimitGame) usergames_dataEnded = true;

    var offset_itemsCount = usergames_itemsCount;
    usergames_itemsCount += response_items;

    usergames_emptyContent = !usergames_itemsCount;

    var response_rows = response_items / main_ColoumnsCountGame;
    if (response_items % main_ColoumnsCountGame > 0) response_rows++;

    var coloumn_id, row_id, row, cell, follows,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / main_ColoumnsCountGame + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < main_ColoumnsCountGame && cursor < response_items; coloumn_id++, cursor++) {
            follows = response.follows[cursor];
            if (usergames_live) {
                if (usergames_CellExists(follows.game.name)) coloumn_id--;
                else {
                    cell = usergames_createCell(row_id, coloumn_id, follows.game.name, follows.game.box.template,
                        main_addCommas(follows.channels) + ' ' + STR_CHANNELS + STR_FOR + main_addCommas(follows.viewers) + STR_VIEWER);
                    row.append(cell);
                }
            } else {
                if (usergames_CellExists(follows.name)) coloumn_id--;
                else {
                    cell = usergames_createCell(row_id, coloumn_id, follows.name, follows.box.template, '');
                    row.append(cell);
                }
            }
        }
        for (coloumn_id; coloumn_id < main_ColoumnsCountGame; coloumn_id++) {
            if (usergames_dataEnded && !usergames_itemsCountCheck) {
                usergames_itemsCountCheck = true;
                usergames_itemsCount = (row_id * main_ColoumnsCountGame) + coloumn_id;
            }
            row.append(main_createCellEmpty(row_id, coloumn_id, usergames_EmptyCell));
            usergames_blankCellVector.push(usergames_EmptyCell + row_id + '_' + coloumn_id);
        }
        $('#stream_table_user_games').append(row);
    }

    usergames_loadDataSuccessFinish();
}

function usergames_createCell(row_id, coloumn_id, game_name, preview_thumbnail, viewers) {
    return $('<td id="' + usergames_Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + game_name + '"></td>').html(
        usergames_CellHtml(row_id, coloumn_id, game_name, preview_thumbnail, viewers));
}

function usergames_CellHtml(row_id, coloumn_id, game_name, preview_thumbnail, viewers) {

    usergames_nameMatrix.push(game_name);

    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", main_GameSize);
    if (row_id < 2) main_PreLoadAImage(preview_thumbnail); //try to pre cache first 2 rows

    return '<div id="' + usergames_Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_game" ><img id="' + usergames_Img + row_id + '_' +
        coloumn_id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + usergames_ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + usergames_DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + game_name + '</div>' +
        '<div id="' + usergames_ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 100%;">' + viewers + '</div></div>';
}

function usergames_CellExists(display_name) {
    if (usergames_nameMatrix.indexOf(display_name) > -1) {
        usergames_blankCellCount++;
        return true;
    }
    return false;
}

function usergames_loadDataSuccessFinish() {
    $(document).ready(function() {
        if (!usergames_Status) {
            main_HideLoadDialog();
            if (usergames_emptyContent) main_showWarningDialog(STR_NO + STR_LIVE_GAMES);
            else {
                usergames_Status = true;
                usergames_addFocus();
                main_LazyImgStart(usergames_Img, 7, IMG_404_GAME, main_ColoumnsCountGame);
            }
            usergames_loadingData = false;
        } else {
            if (usergames_blankCellCount > 0 && !usergames_dataEnded) {
                usergames_loadingMore = true;
                usergames_loadDataPrepare();
                usergames_loadDataReplace();
                return;
            } else {
                usergames_blankCellCount = 0;
                usergames_blankCellVector = [];
            }

            usergames_loadingData = false;
            usergames_loadingMore = false;
        }
    });
}

function usergames_loadDataRequestReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        main_SetItemsLimitReload(usergames_blankCellCount);

        var offset = usergames_itemsCount + usergames_itemsCountOffset;
        if (offset && offset > (usergames_MaxOffset - 1)) {
            offset = usergames_MaxOffset - main_ItemsLimitReload;
            usergames_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/api/users/' + encodeURIComponent(main_UserName) + '/follows/games' + (usergames_live ? '/live' : '') +
            '?limit=' + main_ItemsLimitGame + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = usergames_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    usergames_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        usergames_loadDataErrorReplace();
    }
}

function usergames_loadDataErrorReplace() {
    usergames_loadingDataTry++;
    if (usergames_loadingDataTry < usergames_loadingDataTryMax) {
        usergames_loadingDataTimeout += (usergames_loadingDataTry < 5) ? 250 : 3500;
        usergames_loadDataRequestReplace();
    } else {
        usergames_ReplacedataEnded = true;
        usergames_blankCellCount = 0;
        usergames_blankCellVector = [];
        usergames_loadDataSuccessFinish();
    }
}

function usergames_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.follows.length;
    var follows, index, cursor = 0;
    var tempVector = usergames_blankCellVector.slice();

    usergames_MaxOffset = parseInt(response._total);

    if (response_items < main_ItemsLimitGame) usergames_ReplacedataEnded = true;

    for (var i = 0; i < usergames_blankCellVector.length && cursor < response_items; i++, cursor++) {
        follows = response.follows[cursor];
        if (usergames_live) {
            if (usergames_CellExists(follows.game.name)) {
                usergames_blankCellCount--;
                i--;
            } else {
                usergames_replaceCellEmpty(usergames_blankCellVector[i], row_id, coloumn_id, follows.game.name, follows.game.box.template,
                    main_addCommas(follows.channels) + ' ' + STR_CHANNELS + STR_FOR + main_addCommas(follows.viwers) + STR_VIEWER);
                usergames_blankCellCount--;

                index = tempVector.indexOf(tempVector[i]);
                if (index > -1) {
                    tempVector.splice(index, 1);
                }
            }
        } else {
            if (usergames_CellExists(follows.name)) {
                usergames_blankCellCount--;
                i--;
            } else {
                usergames_replaceCellEmpty(usergames_blankCellVector[i], row_id, coloumn_id, follows.name, follows.box.template, '');
                usergames_blankCellCount--;

                index = tempVector.indexOf(tempVector[i]);
                if (index > -1) {
                    tempVector.splice(index, 1);
                }
            }
        }
    }

    usergames_itemsCountOffset += cursor;
    if (usergames_ReplacedataEnded) {
        usergames_blankCellCount = 0;
        usergames_blankCellVector = [];
    } else usergames_blankCellVector = tempVector;

    usergames_loadDataSuccessFinish();
}

function usergames_replaceCellEmpty(id, game_name, preview_thumbnail, viewers) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = usergames_Cell + row_id + '_' + coloumn_id;

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', game_name);
    document.getElementById(cell).innerHTML = usergames_CellHtml(row_id, coloumn_id, game_name, preview_thumbnail, viewers);
}

function usergames_addFocus() {

    main_addFocusGame(usergames_cursorY, usergames_cursorX, usergames_Thumbnail, usergames_ThumbnailDiv, usergames_DispNameDiv,
        usergames_ViwersDiv, main_usergames, main_ColoumnsCountGame, usergames_itemsCount);

    if (usergames_cursorY > 2) main_LazyImg(usergames_Img, usergames_cursorY, IMG_404_GAME, main_ColoumnsCountGame, 3);

    if (((usergames_cursorY + main_ItemsReloadLimitGame) > (usergames_itemsCount / main_ColoumnsCountGame)) &&
        !usergames_dataEnded && !usergames_loadingMore) {
        usergames_loadingMore = true;
        usergames_loadDataPrepare();
        usergames_loadDataRequest();
    }
}

function usergames_removeFocus() {
    main_removeFocusGame(usergames_cursorY, usergames_cursorX, usergames_Thumbnail, usergames_ThumbnailDiv, usergames_DispNameDiv, usergames_ViwersDiv);
}

function usergames_keyClickDelay() {
    usergames_LastClickFinish = true;
}

function usergames_handleKeyDown(event) {
    if (usergames_loadingData && !usergames_loadingMore) {
        event.preventDefault();
        return;
    } else if (!usergames_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        usergames_LastClickFinish = false;
        window.setTimeout(usergames_keyClickDelay, usergames_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (main_isAboutDialogShown()) main_HideAboutDialog();
            else if (main_isControlsDialogShown()) main_HideControlsDialog();
            else {
                main_Go = main_Users;
                usergames_exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (main_ThumbNull((usergames_cursorY), (usergames_cursorX - 1), usergames_Thumbnail)) {
                usergames_removeFocus();
                usergames_cursorX--;
                usergames_addFocus();
            } else {
                for (i = (main_ColoumnsCountGame - 1); i > -1; i--) {
                    if (main_ThumbNull((usergames_cursorY - 1), i, usergames_Thumbnail)) {
                        usergames_removeFocus();
                        usergames_cursorY--;
                        usergames_cursorX = i;
                        usergames_addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (main_ThumbNull((usergames_cursorY), (usergames_cursorX + 1), usergames_Thumbnail)) {
                usergames_removeFocus();
                usergames_cursorX++;
                usergames_addFocus();
            } else if (main_ThumbNull((usergames_cursorY + 1), 0, usergames_Thumbnail)) {
                usergames_removeFocus();
                usergames_cursorY++;
                usergames_cursorX = 0;
                usergames_addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < main_ColoumnsCountGame; i++) {
                if (main_ThumbNull((usergames_cursorY - 1), (usergames_cursorX - i), usergames_Thumbnail)) {
                    usergames_removeFocus();
                    usergames_cursorY--;
                    usergames_cursorX = usergames_cursorX - i;
                    usergames_addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < main_ColoumnsCountGame; i++) {
                if (main_ThumbNull((usergames_cursorY + 1), (usergames_cursorX - i), usergames_Thumbnail)) {
                    usergames_removeFocus();
                    usergames_cursorY++;
                    usergames_cursorX = usergames_cursorX - i;
                    usergames_addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!usergames_loadingMore) {
                usergames_live = !usergames_live;
                usergames_StartLoad();
                localStorage.setItem('user_games_live', usergames_live ? 'true' : 'false');
                Users.resetGameCell();
            }
            break;
        case TvKeyCode.KEY_CHANNELUP:
            if (!usergames_loadingMore) {
                main_Go = main_UserChannels;
                usergames_exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            main_Go = main_UserHost;
            usergames_exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            main_gameSelected = $('#' + usergames_Cell + usergames_cursorY + '_' + usergames_cursorX).attr('data-channelname');
            main_Before = main_usergames;
            main_Go = main_aGame;
            aGame_usergames_= true;
            usergames_exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_RED:
            main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            usergames_exit();
            main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            main_BeforeSearch = main_usergames;
            main_Go = main_Search;
            aGame_usergames_= false;
            usergames_exit();
            main_SwitchScreen();
            break;
        default:
            break;
    }
}
