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

var SChannels_Img = 'img_schannels';
var SChannels_Thumbnail = 'thumbnail_schannels_';
var SChannels_EmptyCell = 'schannelsempty_';
var SChannels_ThumbnailDiv = 'schannels_thumbnail_div_';
var SChannels_DispNameDiv = 'schannels_display_name_';
var SChannels_Cell = 'schannels_cell_';
var SChannels_Status = false;
var SChannels_lastData = '';
var SChannels_itemsCountCheck = false;
var SChannels_isLastSChannels = false;
//Variable initialization end

function SChannels_init() {
    Main_Go = Main_SChannels;
    SChannels_isLastSChannels = true;
    if (SChannels_lastData !== Search_data) SChannels_Status = false;
    Main_cleanTopLabel();
    document.getElementById('top_bar_user').innerHTML = STR_SEARCH + Main_UnderCenter(STR_CHANNELS + ' ' + "'" + Search_data + "'");
    document.body.addEventListener("keydown", SChannels_handleKeyDown, false);
    Main_YRst(SChannels_cursorY);
    if (SChannels_Status) {
        Main_ScrollHelper(SChannels_Thumbnail, SChannels_cursorY, SChannels_cursorX, Main_SChannels,
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
    $('#stream_table_search_channel').empty();
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

    var coloumn_id, row_id, row, cell, channels,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountChannel + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountChannel && cursor < response_items; coloumn_id++, cursor++) {
            channels = response.channels[cursor];
            if (SChannels_CellExists(channels.name)) coloumn_id--;
            else {
                cell = SChannels_createCell(row_id, coloumn_id, channels.name, channels._id, channels.logo, channels.display_name, channels.views, channels.followers);
                row.append(cell);
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountChannel; coloumn_id++) {
            if (SChannels_dataEnded && !SChannels_itemsCountCheck) {
                SChannels_itemsCountCheck = true;
                SChannels_itemsCount = (row_id * Main_ColoumnsCountChannel) + coloumn_id;
            }
            row.append(Main_createCellEmpty(row_id, coloumn_id, SChannels_EmptyCell));
            SChannels_blankCellVector.push(SChannels_EmptyCell + row_id + '_' + coloumn_id);
        }
        $('#stream_table_search_channel').append(row);
    }

    SChannels_loadDataSuccessFinish();
}


function SChannels_createCell(row_id, coloumn_id, channel_name, _id, preview_thumbnail, channel_display_name, views, followers) {
    return $('<td id="' + SChannels_Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '" data-id="' + _id + '" data-views="' + views + '" data-followers="' + followers + '"></td>').html(
        SChannels_CellHtml(row_id, coloumn_id, channel_name, preview_thumbnail, channel_display_name));
}

function SChannels_CellHtml(row_id, coloumn_id, channel_name, preview_thumbnail, channel_display_name) {

    SChannels_nameMatrix.push(channel_name);

    if (row_id < 5) Main_PreLoadAImage(preview_thumbnail); //try to pre cache first 3 rows

    return '<div id="' + SChannels_Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_channel" ><img id="' + SChannels_Img +
        row_id + '_' + coloumn_id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + SChannels_ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + SChannels_DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div></div>';
}

function SChannels_CellExists(display_name) {
    if (SChannels_nameMatrix.indexOf(display_name) > -1) {
        SChannels_blankCellCount++;
        return true;
    }
    return false;
}

function SChannels_loadDataSuccessFinish() {
    $(document).ready(function() {
        if (!SChannels_Status) {
            Main_HideLoadDialog();
            if (SChannels_emptyContent) Main_showWarningDialog(STR_SEARCH_RESULT_EMPTY);
            else {
                SChannels_Status = true;
                SChannels_addFocus();
                Main_LazyImgStart(SChannels_Img, 9, IMG_404_LOGO, Main_ColoumnsCountChannel);
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
            SChannels_replaceCellEmpty(SChannels_blankCellVector[i], channels.name, channels._id, channels.logo, channels.display_name);
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

function SChannels_replaceCellEmpty(id, channel_name, _id, preview_thumbnail, channel_display_name) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = SChannels_Cell + row_id + '_' + coloumn_id;

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', channel_name);
    document.getElementById(cell).setAttribute('data-id', _id);
    document.getElementById(cell).innerHTML =
        SChannels_CellHtml(row_id, coloumn_id, channel_name, preview_thumbnail, channel_display_name);
}

function SChannels_addFocus() {
    document.getElementById(SChannels_Thumbnail + SChannels_cursorY + '_' + SChannels_cursorX).classList.add('stream_thumbnail_focused');
    document.getElementById(SChannels_ThumbnailDiv + SChannels_cursorY + '_' + SChannels_cursorX).classList.add('stream_text_focused');
    document.getElementById(SChannels_DispNameDiv + SChannels_cursorY + '_' + SChannels_cursorX).classList.add('stream_info_focused');
    window.setTimeout(function() {
        Main_ScrollHelper(SChannels_Thumbnail, SChannels_cursorY, SChannels_cursorX, Main_SChannels, Main_ScrollOffSetMinusChannels, Main_ScrollOffSetVideo, true);
    }, 10);

    Main_CounterDialog(SChannels_cursorX, SChannels_cursorY, Main_ColoumnsCountChannel, SChannels_itemsCount);

    if (SChannels_cursorY > 3) Main_LazyImg(SChannels_Img, SChannels_cursorY, IMG_404_LOGO, Main_ColoumnsCountChannel, 4);

    if (((SChannels_cursorY + Main_ItemsReloadLimitChannel) > (SChannels_itemsCount / Main_ColoumnsCountChannel)) &&
        !SChannels_dataEnded && !SChannels_loadingMore) {
        SChannels_loadingMore = true;
        SChannels_loadDataPrepare();
        SChannels_loadDataRequest();
    }
}

function SChannels_removeFocus() {
    document.getElementById(SChannels_Thumbnail + SChannels_cursorY + '_' + SChannels_cursorX).classList.remove('stream_thumbnail_focused');
    document.getElementById(SChannels_ThumbnailDiv + SChannels_cursorY + '_' + SChannels_cursorX).classList.remove('stream_text_focused');
    document.getElementById(SChannels_DispNameDiv + SChannels_cursorY + '_' + SChannels_cursorX).classList.remove('stream_info_focused');
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
        case TvKeyCode.KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                if (Main_Go === Main_Before) Main_Go = Main_Live;
                else Main_Go = Main_Before;
                SChannels_exit();
                SChannels_Postexit();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main_ThumbNull((SChannels_cursorY), (SChannels_cursorX - 1), SChannels_Thumbnail)) {
                SChannels_removeFocus();
                SChannels_cursorX--;
                SChannels_addFocus();
            } else {
                for (i = (Main_ColoumnsCountChannel - 1); i > -1; i--) {
                    if (Main_ThumbNull((SChannels_cursorY - 1), i, SChannels_Thumbnail)) {
                        SChannels_removeFocus();
                        SChannels_cursorY--;
                        SChannels_cursorX = i;
                        SChannels_addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main_ThumbNull((SChannels_cursorY), (SChannels_cursorX + 1), SChannels_Thumbnail)) {
                SChannels_removeFocus();
                SChannels_cursorX++;
                SChannels_addFocus();
            } else if (Main_ThumbNull((SChannels_cursorY + 1), 0, SChannels_Thumbnail)) {
                SChannels_removeFocus();
                SChannels_cursorY++;
                SChannels_cursorX = 0;
                SChannels_addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Main_ColoumnsCountChannel; i++) {
                if (Main_ThumbNull((SChannels_cursorY - 1), (SChannels_cursorX - i), SChannels_Thumbnail)) {
                    SChannels_removeFocus();
                    SChannels_cursorY--;
                    SChannels_cursorX = SChannels_cursorX - i;
                    SChannels_addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountChannel; i++) {
                if (Main_ThumbNull((SChannels_cursorY + 1), (SChannels_cursorX - i), SChannels_Thumbnail)) {
                    SChannels_removeFocus();
                    SChannels_cursorY++;
                    SChannels_cursorX = SChannels_cursorX - i;
                    SChannels_addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!SChannels_loadingMore) SChannels_StartLoad();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (!SChannels_loadingMore) {
                Main_selectedChannel = $('#' + SChannels_Cell + SChannels_cursorY + '_' + SChannels_cursorX).attr('data-channelname');
                Main_selectedChannel_id = $('#' + SChannels_Cell + SChannels_cursorY + '_' + SChannels_cursorX).attr('data-id');
                Main_selectedChannelDisplayname = document.getElementById(SChannels_DispNameDiv + SChannels_cursorY + '_' + SChannels_cursorX).textContent;
                Main_selectedChannelLogo = document.getElementById(SChannels_Img + SChannels_cursorY + '_' + SChannels_cursorX).src;
                Main_selectedChannelViews = $('#' + SChannels_Cell + SChannels_cursorY + '_' + SChannels_cursorX).attr('data-views');
                Main_selectedChannelFallower = $('#' + SChannels_Cell + SChannels_cursorY + '_' + SChannels_cursorX).attr('data-followers');
                document.body.removeEventListener("keydown", SChannels_handleKeyDown);
                Main_Before = Main_SChannels;
                Main_Go = Main_SChannelContent;
                AddCode_IsFallowing = false;
                SChannelContent_UserChannels = false;
                Main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_RED:
            Main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            SChannels_exit();
            Main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main_BeforeSearch = Main_SChannels;
            Main_Go = Main_Search;
            SChannels_exit();
            SChannels_Postexit();
            break;
        default:
            break;
    }
}
