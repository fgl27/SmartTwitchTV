//Variable initialization
var SearchLive_cursorY = 0;
var SearchLive_cursorX = 0;
var SearchLive_dataEnded = false;
var SearchLive_itemsCount = 0;
var SearchLive_idObject = {};
var SearchLive_emptyCellVector = [];
var SearchLive_loadingData = false;
var SearchLive_loadingDataTry = 0;
var SearchLive_loadingDataTryMax = 5;
var SearchLive_loadingDataTimeout = 3500;
var SearchLive_itemsCountOffset = 0;
var SearchLive_MaxOffset = 0;
var SearchLive_emptyContent = false;
var SearchLive_Status = false;
var SearchLive_itemsCountCheck = false;
var SearchLive_lastData = '';

var SearchLive_ids = ['sl_thumbdiv', 'sl_img', 'sl_infodiv', 'sl_displayname', 'sl_streamtitle', 'sl_streamgame', 'sl_viwers', 'sl_quality', 'sl_cell', 'slempty_', 'search_live_scroll'];
//Variable initialization end

function SearchLive_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_SearchLive;
    Main_values.Search_isSearching = true;
    Main_cleanTopLabel();
    if (SearchLive_lastData !== Main_values.Search_data) SearchLive_Status = false;
    Main_innerHTML('top_bar_user', STR_SEARCH + Main_UnderCenter(STR_LIVE + ' ' + "'" + Main_values.Search_data + "'"));
    document.body.addEventListener("keydown", SearchLive_handleKeyDown, false);
    if (SearchLive_Status) {
        Main_YRst(SearchLive_cursorY);
        Main_ShowElement(SearchLive_ids[10]);
        Main_CounterDialog(SearchLive_cursorX, SearchLive_cursorY, Main_ColoumnsCountVideo, SearchLive_itemsCount);
        SearchLive_addFocus();
        Main_SaveValues();
    } else SearchLive_StartLoad();
}

function SearchLive_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", SearchLive_handleKeyDown);
    Main_HideElement(SearchLive_ids[10]);
}

function SearchLive_StartLoad() {
    Main_empty('stream_table_search_live');
    Main_showLoadDialog();
    Main_HideWarningDialog();
    SearchLive_lastData = Main_values.Search_data;
    SearchLive_Status = false;
    SearchLive_itemsCountOffset = 0;
    SearchLive_MaxOffset = 0;
    SearchLive_idObject = {};
    SearchLive_emptyCellVector = [];
    SearchLive_itemsCountCheck = false;
    Main_FirstLoad = true;
    SearchLive_itemsCount = 0;
    SearchLive_cursorX = 0;
    SearchLive_cursorY = 0;
    SearchLive_dataEnded = false;
    Main_CounterDialogRst();
    Main_ready(function() {
        SearchLive_loadDataPrepare();
        SearchLive_loadDataRequest();
    });
}

function SearchLive_loadDataPrepare() {
    Main_imgVectorRst();
    SearchLive_loadingData = true;
    SearchLive_loadingDataTry = 0;
    SearchLive_loadingDataTimeout = 3500;
}

function SearchLive_loadDataRequest() {

    var offset = SearchLive_itemsCount + SearchLive_itemsCountOffset;
    if (offset && offset > (SearchLive_MaxOffset - 1)) {
        offset = SearchLive_MaxOffset - Main_ItemsLimitVideo;
        SearchLive_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/search/streams?query=' + encodeURIComponent(Main_values.Search_data) +
        '&limit=' + Main_ItemsLimitVideo + '&offset=' + offset;

    BasehttpGet(theUrl, SearchLive_loadingDataTimeout, 2, null, SearchLive_loadDataSuccess, SearchLive_loadDataError);
}

function SearchLive_loadDataError() {
    SearchLive_loadingDataTry++;
    if (SearchLive_loadingDataTry < SearchLive_loadingDataTryMax) {
        SearchLive_loadingDataTimeout += 500;
        SearchLive_loadDataRequest();
    } else {
        SearchLive_loadingData = false;
        if (!SearchLive_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            SearchLive_dataEnded = true;
            SearchLive_loadDataSuccessFinish();
        }
    }
}

function SearchLive_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    SearchLive_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) SearchLive_dataEnded = true;

    var offset_itemsCount = SearchLive_itemsCount;
    SearchLive_itemsCount += response_items;

    SearchLive_emptyContent = !SearchLive_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, stream, id,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            id = stream.channel._id;
            if (SearchLive_idObject[id]) coloumn_id--;
            else {
                SearchLive_idObject[id] = 1;
                row.appendChild(Main_createCellVideo(row_id, row_id + '_' + coloumn_id,
                    [stream.channel.name, id], SearchLive_ids,
                    [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                        Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                        stream.channel.status, stream.game,
                        STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                        Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
                    ]));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (SearchLive_dataEnded && !SearchLive_itemsCountCheck) {
                SearchLive_itemsCountCheck = true;
                SearchLive_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(SearchLive_ids[9] + row_id + '_' + coloumn_id));
            SearchLive_emptyCellVector.push(SearchLive_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_search_live").appendChild(row);
    }

    SearchLive_loadDataSuccessFinish();
}

function SearchLive_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!SearchLive_Status) {
            Main_HideLoadDialog();
            if (SearchLive_emptyContent) Main_showWarningDialog(STR_SEARCH_RESULT_EMPTY);
            else {
                SearchLive_Status = true;
                Main_imgVectorLoad(IMG_404_VIDEO);
                SearchLive_addFocus();
                Main_SaveValues();
            }
            Main_ShowElement(SearchLive_ids[10]);
            Main_FirstLoad = false;
        } else {
            Main_imgVectorLoad(IMG_404_VIDEO);
            if (SearchLive_emptyCellVector.length > 0 && !SearchLive_dataEnded) {
                SearchLive_loadDataPrepare();
                SearchLive_loadDataReplace();
                return;
            } else {
                Main_CounterDialog(SearchLive_cursorX, SearchLive_cursorY, Main_ColoumnsCountVideo, SearchLive_itemsCount);
                SearchLive_emptyCellVector = [];
            }
        }
        SearchLive_loadingData = false;
    });
}

function SearchLive_loadDataReplace() {

    Main_SetItemsLimitReplace(SearchLive_emptyCellVector.length);

    var offset = SearchLive_itemsCount + SearchLive_itemsCountOffset;
    if (offset && offset > (SearchLive_MaxOffset - 1)) {
        offset = SearchLive_MaxOffset - Main_ItemsLimitReplace;
        SearchLive_dataEnded = true;
    }
    var theUrl = 'https://api.twitch.tv/kraken/search/streams?query=' + encodeURIComponent(Main_values.Search_data) +
        '&limit=' + Main_ItemsLimitReplace + '&offset=' + offset;

    BasehttpGet(theUrl, SearchLive_loadingDataTimeout, 2, null, SearchLive_loadDataSuccessReplace, SearchLive_loadDataErrorReplace);
}

function SearchLive_loadDataErrorReplace() {
    SearchLive_loadingDataTry++;
    if (SearchLive_loadingDataTry < SearchLive_loadingDataTryMax) {
        SearchLive_loadingDataTimeout += 500;
        SearchLive_loadDataReplace();
    } else {
        SearchLive_dataEnded = true;
        SearchLive_itemsCount -= SearchLive_emptyCellVector.length;
        SearchLive_emptyCellVector = [];
        SearchLive_loadDataSuccessFinish();
    }
}

function SearchLive_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.streams.length,
        stream, id, i = 0,
        cursor = 0,
        tempVector = [];

    SearchLive_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitReplace) SearchLive_dataEnded = true;

    for (i; i < SearchLive_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        id = stream.channel._id;
        if (SearchLive_idObject[id]) i--;
        else {
            SearchLive_idObject[id] = 1;
            Main_replaceVideo(SearchLive_emptyCellVector[i], [stream.channel.name, id],
                [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                    Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                    stream.channel.status, stream.game,
                    STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                    Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
                ], SearchLive_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) SearchLive_emptyCellVector.splice(tempVector[i], 1);

    SearchLive_itemsCountOffset += cursor;
    if (SearchLive_dataEnded) {
        SearchLive_itemsCount -= SearchLive_emptyCellVector.length;
        SearchLive_emptyCellVector = [];
    }

    SearchLive_loadDataSuccessFinish();
}

function SearchLive_addFocus() {
    Main_addFocusVideo(SearchLive_cursorY, SearchLive_cursorX, SearchLive_ids, Main_ColoumnsCountVideo, SearchLive_itemsCount);

    if (((SearchLive_cursorY + Main_ItemsReloadLimitVideo) > (SearchLive_itemsCount / Main_ColoumnsCountVideo)) &&
        !SearchLive_dataEnded && !SearchLive_loadingData) {
        SearchLive_loadDataPrepare();
        SearchLive_loadDataRequest();
    }
    if (Main_CenterLablesInUse) SearchLive_removeFocus();
}

function SearchLive_removeFocus() {
    if (SearchLive_itemsCount) Main_removeFocus(SearchLive_cursorY + '_' + SearchLive_cursorX, SearchLive_ids);
}

function SearchLive_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();
    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                SearchLive_removeFocus();
                Main_CenterLablesStart(SearchLive_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((SearchLive_cursorY), (SearchLive_cursorX - 1), SearchLive_ids[0])) {
                SearchLive_removeFocus();
                SearchLive_cursorX--;
                SearchLive_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((SearchLive_cursorY - 1), i, SearchLive_ids[0])) {
                        SearchLive_removeFocus();
                        SearchLive_cursorY--;
                        SearchLive_cursorX = i;
                        SearchLive_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((SearchLive_cursorY), (SearchLive_cursorX + 1), SearchLive_ids[0])) {
                SearchLive_removeFocus();
                SearchLive_cursorX++;
                SearchLive_addFocus();
            } else if (Main_ThumbNull((SearchLive_cursorY + 1), 0, SearchLive_ids[0])) {
                SearchLive_removeFocus();
                SearchLive_cursorY++;
                SearchLive_cursorX = 0;
                SearchLive_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((SearchLive_cursorY - 1), (SearchLive_cursorX - i), SearchLive_ids[0])) {
                    SearchLive_removeFocus();
                    SearchLive_cursorY--;
                    SearchLive_cursorX = SearchLive_cursorX - i;
                    SearchLive_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((SearchLive_cursorY + 1), (SearchLive_cursorX - i), SearchLive_ids[0])) {
                    SearchLive_removeFocus();
                    SearchLive_cursorY++;
                    SearchLive_cursorX = SearchLive_cursorX - i;
                    SearchLive_addFocus();
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            SearchLive_StartLoad();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_OpenLiveStream(SearchLive_cursorY + '_' + SearchLive_cursorX, SearchLive_ids, SearchLive_handleKeyDown);
            break;
        case KEY_RED:
            Main_SidePannelStart(SearchLive_handleKeyDown);
            break;
        case KEY_GREEN:
            SearchLive_exit();
            Main_values.Search_isSearching = false;
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_values.Main_Go = Main_Search;
            SearchLive_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}