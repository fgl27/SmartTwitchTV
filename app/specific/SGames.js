//Variable initialization
var sgames_Status = false;
var sgames_cursorY = 0;
var sgames_cursorX = 0;
var sgames_itemsCount = 0;
var sgames_loadingData = false;
var sgames_loadingDataTry = 0;
var sgames_loadingDataTryMax = 10;
var sgames_loadingDataTimeout = 3500;
var sgames_isDialogOn = false;
var sgames_itemsCountOffset = 0;
var sgames_LastClickFinish = true;
var sgames_keyClickDelayTime = 25;
var sgames_ReplacedataEnded = false;
var sgames_MaxOffset = 0;
var sgames_emptyContent = false;
var sgames_itemsCountCheck = false;
var sgames_lastData = '';

var sgames_Img = 'img_sgames';
var sgames_Thumbnail = 'thumbnail_sgames_';
var sgames_EmptyCell = 'sgamesempty_';
var sgames_ThumbnailDiv = 'sgame_thumbnail_div_';
var sgames_DispNameDiv = 'sgame_display_name_';
var sgames_Cell = 'sgame_cell_';
//Variable initialization end


function sgames_init() {
    main_Go = main_sgames;
    main_cleanTopLabel();
    if (sgames_lastData !== Search.data) sgames_Status = false;
    document.getElementById('top_bar_user').innerHTML = STR_SEARCH + main_UnderCenter(STR_GAMES + ' ' + "'" + Search.data + "'");
    document.body.addEventListener("keydown", sgames_handleKeyDown, false);
    main_YRst(sgames_cursorY);
    if (sgames_Status) {
        main_ScrollHelper(sgames_Thumbnail, sgames_cursorY, sgames_cursorX, main_sgames,
            main_ScrollOffSetMinusGame, main_ScrollOffSetGame, false);
        main_CounterDialog(sgames_cursorX, sgames_cursorY, main_ColoumnsCountGame, sgames_itemsCount);
    } else sgames_StartLoad();
}

function sgames_exit() {
    main_RestoreTopLabel();
    document.body.removeEventListener("keydown", sgames_handleKeyDown);
}

function sgames_StartLoad() {
    sgames_lastData = Search.data;
    main_HideWarningDialog();
    sgames_Status = false;
    main_ScrollHelperBlank('blank_focus');
    main_showLoadDialog();
    $('#stream_table_search_game').empty();
    sgames_itemsCountOffset = 0;
    sgames_ReplacedataEnded = false;
    sgames_itemsCountCheck = false;
    sgames_MaxOffset = 0;
    sgames_itemsCount = 0;
    sgames_cursorX = 0;
    sgames_cursorY = 0;
    main_CounterDialogRst();
    sgames_loadDataPrepare();
    sgames_loadDataRequest();
}

function sgames_loadDataPrepare() {
    sgames_loadingData = true;
    sgames_loadingDataTry = 0;
    sgames_loadingDataTimeout = 3500;
}

function sgames_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/games?query=' + encodeURIComponent(Search.data) + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = sgames_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    sgames_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    sgames_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        sgames_loadDataError();
    }
}

function sgames_loadDataError() {
    sgames_loadingDataTry++;
    if (sgames_loadingDataTry < sgames_loadingDataTryMax) {
        sgames_loadingDataTimeout += (sgames_loadingDataTry < 5) ? 250 : 3500;
        sgames_loadDataRequest();
    } else {
        sgames_loadingData = false;
        main_HideLoadDialog();
        main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function sgames_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = 0;

    if (response.games !== null) response_items = response.games.length;

    var offset_itemsCount = sgames_itemsCount;
    sgames_itemsCount += response_items;

    sgames_emptyContent = !sgames_itemsCount;

    var response_rows = response_items / main_ColoumnsCountGame;
    if (response_items % main_ColoumnsCountGame > 0) response_rows++;

    var coloumn_id, row_id, row, cell, game,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / main_ColoumnsCountGame + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < main_ColoumnsCountGame && cursor < response_items; coloumn_id++, cursor++) {
            game = response.games[cursor];
            cell = sgames_createCell(row_id, coloumn_id, game.name, game.box.template);
            row.append(cell);
        }
        for (coloumn_id; coloumn_id < main_ColoumnsCountGame; coloumn_id++) {
            if (!sgames_itemsCountCheck) {
                sgames_itemsCountCheck = true;
                sgames_itemsCount = (row_id * main_ColoumnsCountGame) + coloumn_id;
            }
            row.append(main_createCellEmpty(row_id, coloumn_id, sgames_EmptyCell));
        }
        $('#stream_table_search_game').append(row);
    }

    sgames_loadDataSuccessFinish();
}

function sgames_createCell(row_id, coloumn_id, game_name, preview_thumbnail) {

    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", main_GameSize);
    if (row_id < 2) main_PreLoadAImage(preview_thumbnail); //try to pre cache first 2 rows

    return $('<td id="' + sgames_Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + game_name + '"></td>').html(
        '<div id="' + sgames_Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_game" ><img id="' + sgames_Img + row_id + '_' +
        coloumn_id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + sgames_ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + sgames_DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + game_name + '</div></div>');
}

function sgames_loadDataSuccessFinish() {
    $(document).ready(function() {
        if (!sgames_Status) {
            main_HideLoadDialog();
            if (sgames_emptyContent) main_showWarningDialog(STR_SEARCH_RESULT_EMPTY);
            else {
                sgames_Status = true;
                sgames_addFocus();
            }
        }
        main_LazyImgStart(sgames_Img, 7, IMG_404_GAME, main_ColoumnsCountGame);
        sgames_loadingData = false;
    });
}

function sgames_addFocus() {
    document.getElementById(sgames_Thumbnail + sgames_cursorY + '_' + sgames_cursorX).classList.add('stream_thumbnail_focused');
    document.getElementById(sgames_ThumbnailDiv + sgames_cursorY + '_' + sgames_cursorX).classList.add('stream_text_focused');
    document.getElementById(sgames_DispNameDiv + sgames_cursorY + '_' + sgames_cursorX).classList.add('stream_info_focused');
    window.setTimeout(function() {
        main_ScrollHelper(sgames_Thumbnail, sgames_cursorY, sgames_cursorX, main_sgames, main_ScrollOffSetMinusGame, main_ScrollOffSetGame, false);
    }, 10);

    main_CounterDialog(sgames_cursorX, sgames_cursorY, main_ColoumnsCountGame, sgames_itemsCount);

    if (sgames_cursorY > 2) main_LazyImg(sgames_Img, sgames_cursorY, IMG_404_GAME, main_ColoumnsCountGame, 3);

}

function sgames_removeFocus() {
    document.getElementById(sgames_Thumbnail + sgames_cursorY + '_' + sgames_cursorX).classList.remove('stream_thumbnail_focused');
    document.getElementById(sgames_ThumbnailDiv + sgames_cursorY + '_' + sgames_cursorX).classList.remove('stream_text_focused');
    document.getElementById(sgames_DispNameDiv + sgames_cursorY + '_' + sgames_cursorX).classList.remove('stream_info_focused');
}

function sgames_keyClickDelay() {
    sgames_LastClickFinish = true;
}

function sgames_handleKeyDown(event) {
    if (sgames_loadingData) {
        event.preventDefault();
        return;
    } else if (!sgames_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        sgames_LastClickFinish = false;
        window.setTimeout(sgames_keyClickDelay, sgames_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (main_isAboutDialogShown()) main_HideAboutDialog();
            else if (main_isControlsDialogShown()) main_HideControlsDialog();
            else {
                if (main_Go === main_BeforeSearch) main_Go = main_Live;
                else main_Go = main_BeforeSearch;
                sgames_exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (main_ThumbNull((sgames_cursorY), (sgames_cursorX - 1), sgames_Thumbnail)) {
                sgames_removeFocus();
                sgames_cursorX--;
                sgames_addFocus();
            } else {
                for (i = (main_ColoumnsCountGame - 1); i > -1; i--) {
                    if (main_ThumbNull((sgames_cursorY - 1), i, sgames_Thumbnail)) {
                        sgames_removeFocus();
                        sgames_cursorY--;
                        sgames_cursorX = i;
                        sgames_addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (main_ThumbNull((sgames_cursorY), (sgames_cursorX + 1), sgames_Thumbnail)) {
                sgames_removeFocus();
                sgames_cursorX++;
                sgames_addFocus();
            } else if (main_ThumbNull((sgames_cursorY + 1), 0, sgames_Thumbnail)) {
                sgames_removeFocus();
                sgames_cursorY++;
                sgames_cursorX = 0;
                sgames_addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < main_ColoumnsCountGame; i++) {
                if (main_ThumbNull((sgames_cursorY - 1), (sgames_cursorX - i), sgames_Thumbnail)) {
                    sgames_removeFocus();
                    sgames_cursorY--;
                    sgames_cursorX = sgames_cursorX - i;
                    sgames_addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < main_ColoumnsCountGame; i++) {
                if (main_ThumbNull((sgames_cursorY + 1), (sgames_cursorX - i), sgames_Thumbnail)) {
                    sgames_removeFocus();
                    sgames_cursorY++;
                    sgames_cursorX = sgames_cursorX - i;
                    sgames_addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            sgames_StartLoad();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            main_gameSelected = $('#' + sgames_Cell + sgames_cursorY + '_' + sgames_cursorX).attr('data-channelname');
            document.body.removeEventListener("keydown", sgames_handleKeyDown);
            main_Before = main_Go;
            main_Go = main_aGame;
            sgames_exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_RED:
            main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            sgames_exit();
            main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            main_BeforeSearch = main_sgames;
            main_Go = main_Search;
            sgames_exit();
            main_SwitchScreen();
            break;
        default:
            break;
    }
}
