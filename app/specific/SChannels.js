//Variable initialization
var SChannels_cursorY = 0;
var SChannels_cursorX = 0;
var SChannels_dataEnded = false;
var SChannels_itemsCount = 0;
var SChannels_nameMatrix = [];
var SChannels_blankCellVector = [];
var SChannels_loadingData = false;
var SChannels_loadingDataTry = 0;
var SChannels_loadingDataTryMax = 10;
var SChannels_loadingDataTimeout = 3500;
var SChannels_blankCellCount = 0;
var SChannels_itemsCountOffset = 0;
var SChannels_LastClickFinish = true;
var SChannels_keyClickDelayTime = 25;
var SChannels_ReplacedataEnded = false;
var SChannels_MaxOffset = 0;
var SChannels_emptyContent = false;
var SChannels_Status = false;
var SChannels_lastData = '';
var SChannels_itemsCountCheck = false;
var SChannels_isLastSChannels = false;
var SChannels_loadingMore = false;

var SChannels_ids = ['sc_thumbdiv', 'sc_img', 'sc_infodiv', 'sc_displayname', 'sc_cell', 'scempty_'];
//Variable initialization end

function SChannels_init() {
    Main_Go = Main_SChannels;
    SChannels_isLastSChannels = true;
    Search_isSearching = true;
    if (SChannels_lastData !== Search_data) SChannels_Status = false;
    Main_cleanTopLabel();
    document.getElementById('top_bar_user').innerHTML = STR_SEARCH + Main_UnderCenter(STR_CHANNELS + ' ' + "'" + Search_data + "'");
    document.body.addEventListener("keydown", SChannels_handleKeyDown, false);
    Main_YRst(SChannels_cursorY);
    if (SChannels_Status) {
        Main_ScrollHelper(SChannels_ids[0], SChannels_cursorY, SChannels_cursorX, Main_SChannels,
            Main_ScrollOffSetMinusChannels, Main_ScrollOffSetVideo, true);
        Main_CounterDialog(SChannels_cursorX, SChannels_cursorY, Main_ColoumnsCountChannel, SChannels_itemsCount);
    } else SChannels_StartLoad();
}

function SChannels_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", SChannels_handleKeyDown);
}

function SChannels_Postexit() {
    Main_SwitchScreen();
}

function SChannels_StartLoad() {
    SChannels_lastData = Search_data;
    Main_HideWarningDialog();
    SChannels_Status = false;
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    Main_empty('stream_table_search_channel');
    SChannels_loadingMore = false;
    SChannels_blankCellCount = 0;
    SChannels_itemsCountOffset = 0;
    SChannels_ReplacedataEnded = false;
    SChannels_MaxOffset = 0;
    SChannels_nameMatrix = [];
    SChannels_blankCellVector = [];
    SChannels_itemsCountCheck = false;
    SChannels_itemsCount = 0;
    SChannels_cursorX = 0;
    SChannels_cursorY = 0;
    SChannels_dataEnded = false;
    Main_CounterDialogRst();
    SChannels_loadDataPrepare();
    SChannels_loadDataRequest();
}

function SChannels_loadDataPrepare() {
    SChannels_loadingData = true;
    SChannels_loadingDataTry = 0;
    SChannels_loadingDataTimeout = 3500;
}

function SChannels_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = SChannels_itemsCount + SChannels_itemsCountOffset;
        if (offset && offset > (SChannels_MaxOffset - 1)) {
            offset = SChannels_MaxOffset - Main_ItemsLimitChannel;
            SChannels_dataEnded = true;
            SChannels_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/channels?query=' + encodeURIComponent(Search_data) +
            '&limit=' + Main_ItemsLimitChannel + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SChannels_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    SChannels_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    SChannels_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SChannels_loadDataError();
    }
}

function SChannels_loadDataError() {
    SChannels_loadingDataTry++;
    if (SChannels_loadingDataTry < SChannels_loadingDataTryMax) {
        SChannels_loadingDataTimeout += (SChannels_loadingDataTry < 5) ? 250 : 3500;
        SChannels_loadDataRequest();
    } else {
        SChannels_loadingData = false;
        SChannels_loadingMore = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function SChannels_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.channels.length;
    SChannels_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitChannel) SChannels_dataEnded = true;

    var offset_itemsCount = SChannels_itemsCount;
    SChannels_itemsCount += response_items;

    SChannels_emptyContent = !SChannels_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountChannel;
    if (response_items % Main_ColoumnsCountChannel > 0) response_rows++;

    var coloumn_id, row_id, row, channels,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountChannel + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountChannel && cursor < response_items; coloumn_id++, cursor++) {
            channels = response.channels[cursor];
            if (SChannels_CellExists(channels.name)) coloumn_id--;
            else row.appendChild(SChannels_createCell(row_id, row_id + '_' + coloumn_id, [channels.name, channels._id, channels.logo, channels.display_name, channels.views, channels.followers]));
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountChannel; coloumn_id++) {
            if (SChannels_dataEnded && !SChannels_itemsCountCheck) {
                SChannels_itemsCountCheck = true;
                SChannels_itemsCount = (row_id * Main_ColoumnsCountChannel) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(SChannels_ids[5] + row_id + '_' + coloumn_id));
            SChannels_blankCellVector.push(SChannels_ids[5] + row_id + '_' + coloumn_id);
        }
        document.getElementById('stream_table_search_channel').appendChild(row);
    }

    SChannels_loadDataSuccessFinish();
}


function SChannels_createCell(row_id, id, valuesArray) {
    SChannels_nameMatrix.push(valuesArray[1]);
    if (row_id < 4) Main_PreLoadAImage(valuesArray[2]); //try to pre cache first 4 rows
    return Main_createCellChannel(id, SChannels_ids, valuesArray);
}

function SChannels_CellExists(display_name) {
    for (var i = 0; i < SChannels_nameMatrix.length; i++) {
        if (display_name === SChannels_nameMatrix[i]) {
            SChannels_blankCellCount++;
            return true;
        }
    }

    return false;
}

function SChannels_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!SChannels_Status) {
            Main_HideLoadDialog();
            if (SChannels_emptyContent) Main_showWarningDialog(STR_SEARCH_RESULT_EMPTY);
            else {
                SChannels_Status = true;
                SChannels_addFocus();
                Main_LazyImgStart(SChannels_ids[1], 9, IMG_404_LOGO, Main_ColoumnsCountChannel);
            }
            SChannels_loadingData = false;
        } else {
            if (SChannels_blankCellCount > 0 && !SChannels_dataEnded) {
                SChannels_loadingMore = true;
                SChannels_loadDataPrepare();
                SChannels_loadDataReplace();
                return;
            } else {
                SChannels_blankCellCount = 0;
                SChannels_blankCellVector = [];
            }

            SChannels_loadingData = false;
            SChannels_loadingMore = false;
        }
    });
}

function SChannels_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReload(SChannels_blankCellCount);

        var offset = SChannels_itemsCount + SChannels_itemsCountOffset;
        if (offset && offset > (SChannels_MaxOffset - 1)) {
            offset = SChannels_MaxOffset - Main_ItemsLimitReload;
            SChannels_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/channels?query=' + encodeURIComponent(Search_data) +
            '&limit=' + Main_ItemsLimitReload + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SChannels_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    SChannels_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SChannels_loadDataErrorReplace();
    }
}

function SChannels_loadDataErrorReplace() {
    SChannels_loadingDataTry++;
    if (SChannels_loadingDataTry < SChannels_loadingDataTryMax) {
        SChannels_loadingDataTimeout += (SChannels_loadingDataTry < 5) ? 250 : 3500;
        SChannels_loadDataReplace();
    } else {
        SChannels_ReplacedataEnded = true;
        SChannels_blankCellCount = 0;
        SChannels_blankCellVector = [];
        SChannels_loadDataSuccessFinish();
    }
}

function SChannels_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.channels.length;
    var channels, index, cursor = 0;
    var tempVector = SChannels_blankCellVector.slice();

    SChannels_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) SChannels_ReplacedataEnded = true;

    for (var i = 0; i < SChannels_blankCellVector.length && cursor < response_items; i++, cursor++) {
        channels = response.channels[cursor];
        if (SChannels_CellExists(channels.name)) {
            SChannels_blankCellCount--;
            i--;
        } else {
            SChannels_replaceCellEmpty(SChannels_blankCellVector[i], [channels.name, channels._id, channels.logo, channels.display_name, channels.views, channels.followers], SChannels_ids);
            SChannels_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    SChannels_itemsCountOffset += cursor;
    if (SChannels_ReplacedataEnded) {
        SChannels_blankCellCount = 0;
        SChannels_blankCellVector = [];
    } else SChannels_blankCellVector = tempVector;

    SChannels_loadDataSuccessFinish();
}

function SChannels_addFocus() {
    Main_addFocusChannel(SChannels_cursorY, SChannels_cursorX, SChannels_ids, Main_SChannels, Main_ColoumnsCountChannel, SChannels_itemsCount);

    if (SChannels_cursorY > 3) Main_LazyImg(SChannels_ids[1], SChannels_cursorY, IMG_404_LOGO, Main_ColoumnsCountChannel, 4);

    if (((SChannels_cursorY + Main_ItemsReloadLimitChannel) > (SChannels_itemsCount / Main_ColoumnsCountChannel)) &&
        !SChannels_dataEnded && !SChannels_loadingMore) {
        SChannels_loadingMore = true;
        SChannels_loadDataPrepare();
        SChannels_loadDataRequest();
    }
}

function SChannels_removeFocus() {
    Main_removeFocusChannel(SChannels_cursorY + '_' + SChannels_cursorX, SChannels_ids);
}

function SChannels_keyClickDelay() {
    SChannels_LastClickFinish = true;
}

function SChannels_handleKeyDown(event) {
    if (SChannels_loadingData && !SChannels_loadingMore) {
        event.preventDefault();
        return;
    } else if (!SChannels_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        SChannels_LastClickFinish = false;
        window.setTimeout(SChannels_keyClickDelay, SChannels_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                if (Main_Go === Main_BeforeSearch) Main_Go = Main_Live;
                else Main_Go = Main_BeforeSearch;
                SChannels_exit();
                Search_isSearching = false;
                SChannels_Postexit();
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((SChannels_cursorY), (SChannels_cursorX - 1), SChannels_ids[0])) {
                SChannels_removeFocus();
                SChannels_cursorX--;
                SChannels_addFocus();
            } else {
                for (i = (Main_ColoumnsCountChannel - 1); i > -1; i--) {
                    if (Main_ThumbNull((SChannels_cursorY - 1), i, SChannels_ids[0])) {
                        SChannels_removeFocus();
                        SChannels_cursorY--;
                        SChannels_cursorX = i;
                        SChannels_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((SChannels_cursorY), (SChannels_cursorX + 1), SChannels_ids[0])) {
                SChannels_removeFocus();
                SChannels_cursorX++;
                SChannels_addFocus();
            } else if (Main_ThumbNull((SChannels_cursorY + 1), 0, SChannels_ids[0])) {
                SChannels_removeFocus();
                SChannels_cursorY++;
                SChannels_cursorX = 0;
                SChannels_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountChannel; i++) {
                if (Main_ThumbNull((SChannels_cursorY - 1), (SChannels_cursorX - i), SChannels_ids[0])) {
                    SChannels_removeFocus();
                    SChannels_cursorY--;
                    SChannels_cursorX = SChannels_cursorX - i;
                    SChannels_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountChannel; i++) {
                if (Main_ThumbNull((SChannels_cursorY + 1), (SChannels_cursorX - i), SChannels_ids[0])) {
                    SChannels_removeFocus();
                    SChannels_cursorY++;
                    SChannels_cursorX = SChannels_cursorX - i;
                    SChannels_addFocus();
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            if (!SChannels_loadingMore) SChannels_StartLoad();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (!SChannels_loadingMore) {
                Main_selectedChannel = document.getElementById(SChannels_ids[4] + SChannels_cursorY + '_' + SChannels_cursorX).getAttribute(Main_DataAttribute);
                Main_selectedChannel_id = document.getElementById(SChannels_ids[4] + SChannels_cursorY + '_' + SChannels_cursorX).getAttribute('data-id');
                Main_selectedChannelDisplayname = document.getElementById(SChannels_ids[3] + SChannels_cursorY + '_' + SChannels_cursorX).textContent;
                Main_selectedChannelLogo = document.getElementById(SChannels_ids[1] + SChannels_cursorY + '_' + SChannels_cursorX).src;
                Main_selectedChannelViews = document.getElementById(SChannels_ids[4] + SChannels_cursorY + '_' + SChannels_cursorX).getAttribute('data-views');
                Main_selectedChannelFallower = document.getElementById(SChannels_ids[4] + SChannels_cursorY + '_' + SChannels_cursorX).getAttribute('data-followers');
                document.body.removeEventListener("keydown", SChannels_handleKeyDown);
                Main_BeforeChannel = Main_SChannels;
                Main_Go = Main_SChannelContent;
                Main_BeforeChannelisSet = true;
                AddCode_IsFallowing = false;
                SChannelContent_UserChannels = false;
                Main_SwitchScreen();
            }
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            SChannels_exit();
            Search_isSearching = false;
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_Go = Main_Search;
            SChannels_exit();
            SChannels_Postexit();
            break;
        default:
            break;
    }
}