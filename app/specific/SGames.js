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
var SGames_MaxOffset = 0;
var SGames_emptyContent = false;
var SGames_itemsCountCheck = false;
var SGames_lastData = '';

var SGames_ids = ['sgthumbdiv', 'sgimg', 'sginfodiv', 'sgdisplayname', 'sgviwers', 'sgcell', 'sgempty_'];
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
        Main_ScrollHelper(SGames_ids[0], SGames_cursorY, SGames_cursorX, Main_sgames,
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
    Main_empty('stream_table_search_game');
    SGames_itemsCountOffset = 0;
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

    var coloumn_id, row_id, row, game,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountGame + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountGame && cursor < response_items; coloumn_id++, cursor++) {
            game = response.games[cursor];
            row.appendChild(SGames_createCell(row_id, row_id + '_' + coloumn_id, [game.name, game.box.template.replace("{width}x{height}", Main_GameSize), '']));
        }
        for (coloumn_id; coloumn_id < Main_ColoumnsCountGame; coloumn_id++) {
            if (!SGames_itemsCountCheck) {
                SGames_itemsCountCheck = true;
                SGames_itemsCount = (row_id * Main_ColoumnsCountGame) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(SGames_ids[6] + row_id + '_' + coloumn_id));
        }
        document.getElementById("stream_table_search_game").appendChild(row);
    }

    SGames_loadDataSuccessFinish();
}

function SGames_createCell(row_id, id, valuesArray) {
    if (row_id < 2) Main_PreLoadAImage(valuesArray[1]); //try to pre cache first 2 rows
    return Main_createCellGame(id, SGames_ids, valuesArray); //[preview_thumbnail, game_name, viwers]
}

function SGames_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!SGames_Status) {
            Main_HideLoadDialog();
            if (SGames_emptyContent) Main_showWarningDialog(STR_SEARCH_RESULT_EMPTY);
            else {
                SGames_Status = true;
                SGames_addFocus();
            }
        }
        Main_LazyImgStart(SGames_ids[1], 7, IMG_404_GAME, Main_ColoumnsCountGame);
        SGames_loadingData = false;
    });
}

function SGames_addFocus() {
    Main_addFocusGame(SGames_cursorY, SGames_cursorX, SGames_ids, Main_sgames,
        Main_ColoumnsCountGame, Games_itemsCount);
    if (SGames_cursorY > 2) Main_LazyImg(SGames_ids[1], SGames_cursorY, IMG_404_GAME, Main_ColoumnsCountGame, 3);

}

function SGames_removeFocus() {
    Main_removeFocus(SGames_cursorY + '_' + SGames_cursorX, SGames_ids);
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
            if (Main_ThumbNull((SGames_cursorY), (SGames_cursorX - 1), SGames_ids[0])) {
                SGames_removeFocus();
                SGames_cursorX--;
                SGames_addFocus();
            } else {
                for (i = (Main_ColoumnsCountGame - 1); i > -1; i--) {
                    if (Main_ThumbNull((SGames_cursorY - 1), i, SGames_ids[0])) {
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
            if (Main_ThumbNull((SGames_cursorY), (SGames_cursorX + 1), SGames_ids[0])) {
                SGames_removeFocus();
                SGames_cursorX++;
                SGames_addFocus();
            } else if (Main_ThumbNull((SGames_cursorY + 1), 0, SGames_ids[0])) {
                SGames_removeFocus();
                SGames_cursorY++;
                SGames_cursorX = 0;
                SGames_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountGame; i++) {
                if (Main_ThumbNull((SGames_cursorY - 1), (SGames_cursorX - i), SGames_ids[0])) {
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
                if (Main_ThumbNull((SGames_cursorY + 1), (SGames_cursorX - i), SGames_ids[0])) {
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
            Main_gameSelected = document.getElementById(SGames_ids[5] + SGames_cursorY + '_' + SGames_cursorX).getAttribute(Main_DataAttribute);
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