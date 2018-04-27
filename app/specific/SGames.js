//Variable initialization
var SGames_Status = false;
var SGames_cursorY = 0;
var SGames_cursorX = 0;
var SGames_itemsCount = 0;
var SGames_loadingData = false;
var SGames_loadingDataTry = 0;
var SGames_loadingDataTryMax = 10;
var SGames_loadingDataTimeout = 3500;
var SGames_itemsCountOffset = 0;
var SGames_LastClickFinish = true;
var SGames_keyClickDelayTime = 25;
var SGames_ReplacedataEnded = false;
var SGames_MaxOffset = 0;
var SGames_emptyContent = false;
var SGames_itemsCountCheck = false;
var SGames_lastData = '';

var SGames_Img = 'img_sgames';
var SGames_Thumbnail = 'thumbnail_SGames_';
var SGames_EmptyCell = 'sgamesempty_';
var SGames_ThumbnailDiv = 'sgame_thumbnail_div_';
var SGames_DispNameDiv = 'sgame_display_name_';
var SGames_Cell = 'sgame_cell_';
//Variable initialization end


function SGames_init() {
    Main_Go = Main_sgames;
    Search_isSearching = true;
    Main_cleanTopLabel();
    if (SGames_lastData !== Search_data) SGames_Status = false;
    document.getElementById('top_bar_user').innerHTML = STR_SEARCH + Main_UnderCenter(STR_GAMES + ' ' + "'" + Search_data + "'");
    document.body.addEventListener("keydown", SGames_handleKeyDown, false);
    Main_YRst(SGames_cursorY);
    if (SGames_Status) {
        Main_ScrollHelper(SGames_Thumbnail, SGames_cursorY, SGames_cursorX, Main_sgames,
            Main_ScrollOffSetMinusGame, Main_ScrollOffSetGame, false);
        Main_CounterDialog(SGames_cursorX, SGames_cursorY, Main_ColoumnsCountGame, SGames_itemsCount);
    } else SGames_StartLoad();
}

function SGames_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", SGames_handleKeyDown);
}

function SGames_StartLoad() {
    SGames_lastData = Search_data;
    Main_HideWarningDialog();
    SGames_Status = false;
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    $('#stream_table_search_game').empty();
    SGames_itemsCountOffset = 0;
    SGames_ReplacedataEnded = false;
    SGames_itemsCountCheck = false;
    SGames_MaxOffset = 0;
    SGames_itemsCount = 0;
    SGames_cursorX = 0;
    SGames_cursorY = 0;
    Main_CounterDialogRst();
    SGames_loadDataPrepare();
    SGames_loadDataRequest();
}

function SGames_loadDataPrepare() {
    SGames_loadingData = true;
    SGames_loadingDataTry = 0;
    SGames_loadingDataTimeout = 3500;
}

function SGames_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/games?query=' + encodeURIComponent(Search_data) + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SGames_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    SGames_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    SGames_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SGames_loadDataError();
    }
}

function SGames_loadDataError() {
    SGames_loadingDataTry++;
    if (SGames_loadingDataTry < SGames_loadingDataTryMax) {
        SGames_loadingDataTimeout += (SGames_loadingDataTry < 5) ? 250 : 3500;
        SGames_loadDataRequest();
    } else {
        SGames_loadingData = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function SGames_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = 0;

    if (response.games !== null) response_items = response.games.length;

    var offset_itemsCount = SGames_itemsCount;
    SGames_itemsCount += response_items;

    SGames_emptyContent = !SGames_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountGame;
    if (response_items % Main_ColoumnsCountGame > 0) response_rows++;

    var coloumn_id, row_id, row, cell, game,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountGame + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountGame && cursor < response_items; coloumn_id++, cursor++) {
            game = response.games[cursor];
            cell = SGames_createCell(row_id, coloumn_id, game.name, game.box.template);
            row.append(cell);
        }
        for (coloumn_id; coloumn_id < Main_ColoumnsCountGame; coloumn_id++) {
            if (!SGames_itemsCountCheck) {
                SGames_itemsCountCheck = true;
                SGames_itemsCount = (row_id * Main_ColoumnsCountGame) + coloumn_id;
            }
            row.append(Main_createCellEmpty(row_id, coloumn_id, SGames_EmptyCell));
        }
        $('#stream_table_search_game').append(row);
    }

    SGames_loadDataSuccessFinish();
}

function SGames_createCell(row_id, coloumn_id, game_name, preview_thumbnail) {

    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main_GameSize);
    if (row_id < 2) Main_PreLoadAImage(preview_thumbnail); //try to pre cache first 2 rows

    return $('<td id="' + SGames_Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + game_name + '"></td>').html(
        '<div id="' + SGames_Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_game" ><img id="' + SGames_Img + row_id + '_' +
        coloumn_id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + SGames_ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + SGames_DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + game_name + '</div></div>');
}

function SGames_loadDataSuccessFinish() {
    $(document).ready(function() {
        if (!SGames_Status) {
            Main_HideLoadDialog();
            if (SGames_emptyContent) Main_showWarningDialog(STR_SEARCH_RESULT_EMPTY);
            else {
                SGames_Status = true;
                SGames_addFocus();
            }
        }
        Main_LazyImgStart(SGames_Img, 7, IMG_404_GAME, Main_ColoumnsCountGame);
        SGames_loadingData = false;
    });
}

function SGames_addFocus() {
    document.getElementById(SGames_Thumbnail + SGames_cursorY + '_' + SGames_cursorX).classList.add('stream_thumbnail_focused');
    document.getElementById(SGames_ThumbnailDiv + SGames_cursorY + '_' + SGames_cursorX).classList.add('stream_text_focused');
    document.getElementById(SGames_DispNameDiv + SGames_cursorY + '_' + SGames_cursorX).classList.add('stream_info_focused');
    window.setTimeout(function() {
        Main_ScrollHelper(SGames_Thumbnail, SGames_cursorY, SGames_cursorX, Main_sgames, Main_ScrollOffSetMinusGame, Main_ScrollOffSetGame, false);
    }, 10);

    Main_CounterDialog(SGames_cursorX, SGames_cursorY, Main_ColoumnsCountGame, SGames_itemsCount);

    if (SGames_cursorY > 2) Main_LazyImg(SGames_Img, SGames_cursorY, IMG_404_GAME, Main_ColoumnsCountGame, 3);

}

function SGames_removeFocus() {
    document.getElementById(SGames_Thumbnail + SGames_cursorY + '_' + SGames_cursorX).classList.remove('stream_thumbnail_focused');
    document.getElementById(SGames_ThumbnailDiv + SGames_cursorY + '_' + SGames_cursorX).classList.remove('stream_text_focused');
    document.getElementById(SGames_DispNameDiv + SGames_cursorY + '_' + SGames_cursorX).classList.remove('stream_info_focused');
}

function SGames_keyClickDelay() {
    SGames_LastClickFinish = true;
}

function SGames_handleKeyDown(event) {
    if (SGames_loadingData) {
        event.preventDefault();
        return;
    } else if (!SGames_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        SGames_LastClickFinish = false;
        window.setTimeout(SGames_keyClickDelay, SGames_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                if (Main_Go === Main_BeforeSearch) Main_Go = Main_Live;
                else Main_Go = Main_BeforeSearch;
                SGames_exit();
                Search_isSearching = false;
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((SGames_cursorY), (SGames_cursorX - 1), SGames_Thumbnail)) {
                SGames_removeFocus();
                SGames_cursorX--;
                SGames_addFocus();
            } else {
                for (i = (Main_ColoumnsCountGame - 1); i > -1; i--) {
                    if (Main_ThumbNull((SGames_cursorY - 1), i, SGames_Thumbnail)) {
                        SGames_removeFocus();
                        SGames_cursorY--;
                        SGames_cursorX = i;
                        SGames_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((SGames_cursorY), (SGames_cursorX + 1), SGames_Thumbnail)) {
                SGames_removeFocus();
                SGames_cursorX++;
                SGames_addFocus();
            } else if (Main_ThumbNull((SGames_cursorY + 1), 0, SGames_Thumbnail)) {
                SGames_removeFocus();
                SGames_cursorY++;
                SGames_cursorX = 0;
                SGames_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountGame; i++) {
                if (Main_ThumbNull((SGames_cursorY - 1), (SGames_cursorX - i), SGames_Thumbnail)) {
                    SGames_removeFocus();
                    SGames_cursorY--;
                    SGames_cursorX = SGames_cursorX - i;
                    SGames_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountGame; i++) {
                if (Main_ThumbNull((SGames_cursorY + 1), (SGames_cursorX - i), SGames_Thumbnail)) {
                    SGames_removeFocus();
                    SGames_cursorY++;
                    SGames_cursorX = SGames_cursorX - i;
                    SGames_addFocus();
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            SGames_StartLoad();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_gameSelected = $('#' + SGames_Cell + SGames_cursorY + '_' + SGames_cursorX).attr('data-channelname');
            document.body.removeEventListener("keydown", SGames_handleKeyDown);
            Main_BeforeAgame = Main_Go;
            Main_Go = Main_aGame;
            Main_BeforeAgameisSet = true;
            SGames_exit();
            Search_isSearching = false;
            Main_SwitchScreen();
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            SGames_exit();
            Search_isSearching = false;
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_Go = Main_Search;
            SGames_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}