//Variable initialization
var SearchGames_Status = false;
var SearchGames_cursorY = 0;
var SearchGames_cursorX = 0;
var SearchGames_itemsCount = 0;
var SearchGames_loadingDataTry = 0;
var SearchGames_loadingDataTryMax = 5;
var SearchGames_loadingDataTimeout = 3500;
var SearchGames_itemsCountOffset = 0;
var SearchGames_MaxOffset = 0;
var SearchGames_emptyContent = false;
var SearchGames_itemsCountCheck = false;
var SearchGames_lastData = '';

var SearchGames_ids = ['sgthumbdiv', 'sgimg', 'sginfodiv', 'sgdisplayname', 'sgviwers', 'sgcell', 'sgempty_', 'search_games_scroll'];
//Variable initialization end

function SearchGames_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_SearchGames;
    Main_values.Search_isSearching = true;
    Main_cleanTopLabel();
    if (SearchGames_lastData !== Main_values.Search_data) SearchGames_Status = false;
    Main_innerHTML('top_bar_user', STR_SEARCH + Main_UnderCenter(STR_GAMES + ' ' + "'" + Main_values.Search_data + "'"));
    document.body.addEventListener("keydown", SearchGames_handleKeyDown, false);
    if (SearchGames_Status) {
        Main_YRst(SearchGames_cursorY);
        Main_ShowElement(SearchGames_ids[7]);
        Main_CounterDialog(SearchGames_cursorX, SearchGames_cursorY, Main_ColoumnsCountGame, SearchGames_itemsCount);
        SearchGames_addFocus();
        Main_SaveValues();
    } else SearchGames_StartLoad();
}

function SearchGames_exit() {
    if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", SearchGames_handleKeyDown);
    Main_values.Games_return = false;
    Main_HideElement(SearchGames_ids[7]);
}

function SearchGames_StartLoad() {
    Main_HideElement(SearchGames_ids[7]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    SearchGames_lastData = Main_values.Search_data;
    SearchGames_Status = false;
    Main_empty('stream_table_search_game');
    SearchGames_itemsCountOffset = 0;
    SearchGames_itemsCountCheck = false;
    SearchGames_MaxOffset = 0;
    SearchGames_itemsCount = 0;
    SearchGames_cursorX = 0;
    SearchGames_cursorY = 0;
    Main_CounterDialogRst();
    SearchGames_loadDataPrepare();
    SearchGames_loadDataRequest();
}

function SearchGames_loadDataPrepare() {
    Main_imgVectorRst();
    Main_FirstLoad = true;
    SearchGames_loadingDataTry = 0;
    SearchGames_loadingDataTimeout = 3500;
}

function SearchGames_loadDataRequest() {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/games?query=' + encodeURIComponent(Main_values.Search_data) + '&' + Math.round(Math.random() * 1e7), true);
    xmlHttp.timeout = SearchGames_loadingDataTimeout;
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                SearchGames_loadDataSuccess(xmlHttp.responseText);
                return;
            } else {
                SearchGames_loadDataError();
            }
        }
    };

    xmlHttp.send(null);
}

function SearchGames_loadDataError() {
    SearchGames_loadingDataTry++;
    if (SearchGames_loadingDataTry < SearchGames_loadingDataTryMax) {
        SearchGames_loadingDataTimeout += 500;
        SearchGames_loadDataRequest();
    } else {
        Main_FirstLoad = false;
        if (!SearchGames_itemsCount) {
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else SearchGames_loadDataSuccessFinish();
    }
}

function SearchGames_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = 0;

    if (response.games !== null) response_items = response.games.length;

    var offset_itemsCount = SearchGames_itemsCount;
    SearchGames_itemsCount += response_items;

    SearchGames_emptyContent = !SearchGames_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountGame;
    if (response_items % Main_ColoumnsCountGame > 0) response_rows++;

    var coloumn_id, row_id, row, game,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountGame + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountGame && cursor < response_items; coloumn_id++, cursor++) {
            game = response.games[cursor];
            row.appendChild(SearchGames_createCell(row_id, row_id + '_' + coloumn_id, [game.name, game.box.template.replace("{width}x{height}", Main_GameSize), '']));
        }
        for (coloumn_id; coloumn_id < Main_ColoumnsCountGame; coloumn_id++) {
            if (!SearchGames_itemsCountCheck) {
                SearchGames_itemsCountCheck = true;
                SearchGames_itemsCount = (row_id * Main_ColoumnsCountGame) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(SearchGames_ids[6] + row_id + '_' + coloumn_id));
        }
        document.getElementById("stream_table_search_game").appendChild(row);
    }

    SearchGames_loadDataSuccessFinish();
}

function SearchGames_createCell(row_id, id, valuesArray) {
    if (row_id < 2) Main_CacheImage(valuesArray[1]); //try to pre cache first 2 rows
    return Main_createCellGame(id, SearchGames_ids, valuesArray); //[preview_thumbnail, game_name, viwers]
}

function SearchGames_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!SearchGames_Status) {
            Main_HideLoadDialog();
            if (SearchGames_emptyContent) Main_showWarningDialog(STR_SEARCH_RESULT_EMPTY);
            else {
                SearchGames_Status = true;
                Main_imgVectorLoad(IMG_404_VIDEO);
                SearchGames_addFocus();
                Main_SaveValues();
            }
        }
        Main_ShowElement(SearchGames_ids[7]);
        Main_FirstLoad = false;
        Main_CounterDialog(SearchGames_cursorX, SearchGames_cursorY, Main_ColoumnsCountGame, SearchGames_itemsCount);
    });
}

function SearchGames_addFocus() {
    Main_addFocusGame(SearchGames_cursorY, SearchGames_cursorX, SearchGames_ids,
        Main_ColoumnsCountGame, SearchGames_itemsCount);
    if (Main_CenterLablesInUse) SearchGames_removeFocus();
}

function SearchGames_removeFocus() {
    Main_removeFocus(SearchGames_cursorY + '_' + SearchGames_cursorX, SearchGames_ids);
}

function SearchGames_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                SearchGames_removeFocus();
                Main_CenterLablesStart(SearchGames_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((SearchGames_cursorY), (SearchGames_cursorX - 1), SearchGames_ids[0])) {
                SearchGames_removeFocus();
                SearchGames_cursorX--;
                SearchGames_addFocus();
            } else {
                for (i = (Main_ColoumnsCountGame - 1); i > -1; i--) {
                    if (Main_ThumbNull((SearchGames_cursorY - 1), i, SearchGames_ids[0])) {
                        SearchGames_removeFocus();
                        SearchGames_cursorY--;
                        SearchGames_cursorX = i;
                        SearchGames_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((SearchGames_cursorY), (SearchGames_cursorX + 1), SearchGames_ids[0])) {
                SearchGames_removeFocus();
                SearchGames_cursorX++;
                SearchGames_addFocus();
            } else if (Main_ThumbNull((SearchGames_cursorY + 1), 0, SearchGames_ids[0])) {
                SearchGames_removeFocus();
                SearchGames_cursorY++;
                SearchGames_cursorX = 0;
                SearchGames_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountGame; i++) {
                if (Main_ThumbNull((SearchGames_cursorY - 1), (SearchGames_cursorX - i), SearchGames_ids[0])) {
                    SearchGames_removeFocus();
                    SearchGames_cursorY--;
                    SearchGames_cursorX = SearchGames_cursorX - i;
                    SearchGames_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountGame; i++) {
                if (Main_ThumbNull((SearchGames_cursorY + 1), (SearchGames_cursorX - i), SearchGames_ids[0])) {
                    SearchGames_removeFocus();
                    SearchGames_cursorY++;
                    SearchGames_cursorX = SearchGames_cursorX - i;
                    SearchGames_addFocus();
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            SearchGames_StartLoad();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_values.gameSelectedOld = Main_values.Main_gameSelected;
            SearchGames_exit();
            Main_values.Main_gameSelected = document.getElementById(SearchGames_ids[5] + SearchGames_cursorY + '_' + SearchGames_cursorX).getAttribute(Main_DataAttribute);
            document.body.removeEventListener("keydown", SearchGames_handleKeyDown);
            Main_values.Main_Go = Main_aGame;
            Main_values.Games_return = true;
            Main_SwitchScreen();
            break;
        case KEY_RED:
            Main_SidePannelStart(SearchGames_handleKeyDown);
            break;
        case KEY_GREEN:
            Main_values.Search_isSearching = false;
            SearchGames_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_values.Main_Go = Main_Search;
            SearchGames_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}