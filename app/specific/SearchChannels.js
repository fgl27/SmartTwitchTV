//Variable initialization
var SearchChannels_cursorY = 0;
var SearchChannels_cursorX = 0;
var SearchChannels_dataEnded = false;
var SearchChannels_itemsCount = 0;
var SearchChannels_idObject = {};
var SearchChannels_emptyCellVector = [];
var SearchChannels_loadingData = false;
var SearchChannels_loadingDataTry = 0;
var SearchChannels_loadingDataTryMax = 5;
var SearchChannels_loadingDataTimeout = 3500;
var SearchChannels_itemsCountOffset = 0;
var SearchChannels_MaxOffset = 0;
var SearchChannels_emptyContent = false;
var SearchChannels_Status = false;
var SearchChannels_lastData = '';
var SearchChannels_itemsCountCheck = false;
var SearchChannels_isLastSChannels = false;
var SearchChannels_FirstLoad = false;

var SearchChannels_ids = ['sc_thumbdiv', 'sc_img', 'sc_infodiv', 'sc_displayname', 'sc_cell', 'scempty_', 'search_channel_scroll'];
//Variable initialization end

function SearchChannels_init() {
    Main_Go = Main_SearchChannels;
    SearchChannels_isLastSChannels = true;
    Search_isSearching = true;
    if (SearchChannels_lastData !== Search_data) SearchChannels_Status = false;
    Main_cleanTopLabel();
    Main_innerHTML('top_bar_user', STR_SEARCH + Main_UnderCenter(STR_CHANNELS + ' ' + "'" + Search_data + "'"));
    document.body.addEventListener("keydown", SearchChannels_handleKeyDown, false);
    if (SearchChannels_Status) {
        Main_YRst(SearchChannels_cursorY);
        Main_ShowElement(SearchChannels_ids[6]);
        Main_CounterDialog(SearchChannels_cursorX, SearchChannels_cursorY, Main_ColoumnsCountChannel, SearchChannels_itemsCount);
    } else SearchChannels_StartLoad();
}

function SearchChannels_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", SearchChannels_handleKeyDown);
    Main_HideElement(SearchChannels_ids[6]);
}

function SearchChannels_Postexit() {
    Main_SwitchScreen();
}

function SearchChannels_StartLoad() {
    Main_HideElement(SearchChannels_ids[6]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    SearchChannels_lastData = Search_data;
    SearchChannels_Status = false;
    Main_empty('stream_table_search_channel');
    SearchChannels_itemsCountOffset = 0;
    SearchChannels_MaxOffset = 0;
    SearchChannels_idObject = {};
    SearchChannels_emptyCellVector = [];
    SearchChannels_itemsCountCheck = false;
    SearchChannels_itemsCount = 0;
    SearchChannels_FirstLoad = true;
    SearchChannels_cursorX = 0;
    SearchChannels_cursorY = 0;
    SearchChannels_dataEnded = false;
    Main_CounterDialogRst();
    SearchChannels_loadDataPrepare();
    SearchChannels_loadDataRequest();
}

function SearchChannels_loadDataPrepare() {
    Main_imgVectorRst();
    SearchChannels_loadingData = true;
    SearchChannels_loadingDataTry = 0;
    SearchChannels_loadingDataTimeout = 3500;
}

function SearchChannels_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = SearchChannels_itemsCount + SearchChannels_itemsCountOffset;
        if (offset && offset > (SearchChannels_MaxOffset - 1)) {
            offset = SearchChannels_MaxOffset - Main_ItemsLimitChannel;
            SearchChannels_dataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/channels?query=' + encodeURIComponent(Search_data) +
            '&limit=' + Main_ItemsLimitChannel + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SearchChannels_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    SearchChannels_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    SearchChannels_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SearchChannels_loadDataError();
    }
}

function SearchChannels_loadDataError() {
    SearchChannels_loadingDataTry++;
    if (SearchChannels_loadingDataTry < SearchChannels_loadingDataTryMax) {
        SearchChannels_loadingDataTimeout += 500;
        SearchChannels_loadDataRequest();
    } else {
        SearchChannels_loadingData = false;
        if (!SearchChannels_itemsCount) {
            SearchChannels_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            SearchChannels_dataEnded = true;
            SearchChannels_loadDataSuccessFinish();
        }
    }
}

function SearchChannels_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.channels.length;
    SearchChannels_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitChannel) SearchChannels_dataEnded = true;

    var offset_itemsCount = SearchChannels_itemsCount;
    SearchChannels_itemsCount += response_items;

    SearchChannels_emptyContent = !SearchChannels_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountChannel;
    if (response_items % Main_ColoumnsCountChannel > 0) response_rows++;

    var coloumn_id, row_id, row, channels, id,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountChannel + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountChannel && cursor < response_items; coloumn_id++, cursor++) {
            channels = response.channels[cursor];
            id = channels._id;
            if (SearchChannels_idObject[id]) coloumn_id--;
            else {
                SearchChannels_idObject[id] = 1;
                row.appendChild(SearchChannels_createCell(row_id, row_id + '_' + coloumn_id, [channels.name, id, channels.logo, channels.display_name]));
            }

        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountChannel; coloumn_id++) {
            if (SearchChannels_dataEnded && !SearchChannels_itemsCountCheck) {
                SearchChannels_itemsCountCheck = true;
                SearchChannels_itemsCount = (row_id * Main_ColoumnsCountChannel) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(SearchChannels_ids[5] + row_id + '_' + coloumn_id));
            SearchChannels_emptyCellVector.push(SearchChannels_ids[5] + row_id + '_' + coloumn_id);
        }
        document.getElementById('stream_table_search_channel').appendChild(row);
    }

    SearchChannels_loadDataSuccessFinish();
}


function SearchChannels_createCell(row_id, id, valuesArray) {
    if (row_id < 4) Main_CacheImage(valuesArray[2]); //try to pre cache first 4 rows
    return Main_createCellChannel(id, SearchChannels_ids, valuesArray);
}

function SearchChannels_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!SearchChannels_Status) {
            Main_HideLoadDialog();
            if (SearchChannels_emptyContent) Main_showWarningDialog(STR_SEARCH_RESULT_EMPTY);
            else {
                SearchChannels_Status = true;
                Main_imgVectorLoad(IMG_404_LOGO);
                SearchChannels_addFocus();
            }
            Main_ShowElement(SearchChannels_ids[6]);
            SearchChannels_FirstLoad = false;
        } else {
            Main_imgVectorLoad(IMG_404_LOGO);
            if (SearchChannels_emptyCellVector.length > 0 && !SearchChannels_dataEnded) {
                SearchChannels_loadDataPrepare();
                SearchChannels_loadDataReplace();
                return;
            } else SearchChannels_emptyCellVector = [];
        }
        SearchChannels_loadingData = false;
    });
}

function SearchChannels_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReplace(SearchChannels_emptyCellVector.length);

        var offset = SearchChannels_itemsCount + SearchChannels_itemsCountOffset;
        if (offset && offset > (SearchChannels_MaxOffset - 1)) {
            offset = SearchChannels_MaxOffset - Main_ItemsLimitReplace;
            SearchChannels_dataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/channels?query=' + encodeURIComponent(Search_data) +
            '&limit=' + Main_ItemsLimitReplace + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SearchChannels_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    SearchChannels_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                } else SearchChannels_loadDataErrorReplace();
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SearchChannels_loadDataErrorReplace();
    }
}

function SearchChannels_loadDataErrorReplace() {
    SearchChannels_loadingDataTry++;
    if (SearchChannels_loadingDataTry < SearchChannels_loadingDataTryMax) {
        SearchChannels_loadingDataTimeout += 500;
        SearchChannels_loadDataReplace();
    } else {
        SearchChannels_dataEnded = true;
        SearchChannels_itemsCount -= SearchChannels_emptyCellVector.length;
        SearchChannels_emptyCellVector = [];
        SearchChannels_loadDataSuccessFinish();
    }
}

function SearchChannels_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.channels.length,
        channels, id, i = 0,
        cursor = 0,
        tempVector = [];

    SearchChannels_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitReplace) SearchChannels_dataEnded = true;

    for (i; i < SearchChannels_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        channels = response.channels[cursor];
        id = channels._id;
        if (SearchChannels_idObject[id]) i--;
        else {
            SearchChannels_idObject[id] = 1;
            Main_replaceChannel(SearchChannels_emptyCellVector[i], [channels.name, id, channels.logo, channels.display_name], SearchChannels_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) SearchChannels_emptyCellVector.splice(tempVector[i], 1);

    SearchChannels_itemsCountOffset += cursor;
    if (SearchChannels_dataEnded) {
        SearchChannels_itemsCount -= SearchChannels_emptyCellVector.length;
        SearchChannels_emptyCellVector = [];
    }

    SearchChannels_loadDataSuccessFinish();
}

function SearchChannels_addFocus() {
    Main_addFocusChannel(SearchChannels_cursorY, SearchChannels_cursorX, SearchChannels_ids, Main_ColoumnsCountChannel, SearchChannels_itemsCount);

    if (((SearchChannels_cursorY + Main_ItemsReloadLimitChannel) > (SearchChannels_itemsCount / Main_ColoumnsCountChannel)) &&
        !SearchChannels_dataEnded && !SearchChannels_loadingData) {
        SearchChannels_loadDataPrepare();
        SearchChannels_loadDataRequest();
    }
}

function SearchChannels_removeFocus() {
    Main_removeFocus(SearchChannels_cursorY + '_' + SearchChannels_cursorX, SearchChannels_ids);
}

function SearchChannels_handleKeyDown(event) {
    if (SearchChannels_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                if (Main_Go === Main_BeforeSearch) Main_Go = Main_Live;
                else Main_Go = Main_BeforeSearch;
                if (ChannelContent_ChannelValue.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
                SearchChannels_exit();
                Search_isSearching = false;
                SearchChannels_Postexit();
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((SearchChannels_cursorY), (SearchChannels_cursorX - 1), SearchChannels_ids[0])) {
                SearchChannels_removeFocus();
                SearchChannels_cursorX--;
                SearchChannels_addFocus();
            } else {
                for (i = (Main_ColoumnsCountChannel - 1); i > -1; i--) {
                    if (Main_ThumbNull((SearchChannels_cursorY - 1), i, SearchChannels_ids[0])) {
                        SearchChannels_removeFocus();
                        SearchChannels_cursorY--;
                        SearchChannels_cursorX = i;
                        SearchChannels_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((SearchChannels_cursorY), (SearchChannels_cursorX + 1), SearchChannels_ids[0])) {
                SearchChannels_removeFocus();
                SearchChannels_cursorX++;
                SearchChannels_addFocus();
            } else if (Main_ThumbNull((SearchChannels_cursorY + 1), 0, SearchChannels_ids[0])) {
                SearchChannels_removeFocus();
                SearchChannels_cursorY++;
                SearchChannels_cursorX = 0;
                SearchChannels_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountChannel; i++) {
                if (Main_ThumbNull((SearchChannels_cursorY - 1), (SearchChannels_cursorX - i), SearchChannels_ids[0])) {
                    SearchChannels_removeFocus();
                    SearchChannels_cursorY--;
                    SearchChannels_cursorX = SearchChannels_cursorX - i;
                    SearchChannels_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountChannel; i++) {
                if (Main_ThumbNull((SearchChannels_cursorY + 1), (SearchChannels_cursorX - i), SearchChannels_ids[0])) {
                    SearchChannels_removeFocus();
                    SearchChannels_cursorY++;
                    SearchChannels_cursorX = SearchChannels_cursorX - i;
                    SearchChannels_addFocus();
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            SearchChannels_StartLoad();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_selectedChannel = document.getElementById(SearchChannels_ids[4] + SearchChannels_cursorY + '_' + SearchChannels_cursorX).getAttribute(Main_DataAttribute);
            Main_selectedChannel_id = document.getElementById(SearchChannels_ids[4] + SearchChannels_cursorY + '_' + SearchChannels_cursorX).getAttribute('data-id');
            Main_selectedChannelDisplayname = document.getElementById(SearchChannels_ids[3] + SearchChannels_cursorY + '_' + SearchChannels_cursorX).textContent;
            document.body.removeEventListener("keydown", SearchChannels_handleKeyDown);
            Main_BeforeChannel = Main_SearchChannels;
            Main_Go = Main_ChannelContent;
            Main_BeforeChannelisSet = true;
            AddCode_IsFallowing = false;
            ChannelContent_UserChannels = false;
            Main_HideElement(SearchChannels_ids[6]);
            Main_SwitchScreen();
            break;
        case KEY_RED:
            Main_SidePannelStart(SearchChannels_handleKeyDown);
            break;
        case KEY_GREEN:
            SearchChannels_exit();
            Search_isSearching = false;
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_Go = Main_Search;
            SearchChannels_exit();
            SearchChannels_Postexit();
            break;
        default:
            break;
    }
}