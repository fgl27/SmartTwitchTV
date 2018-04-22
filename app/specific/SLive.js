//Variable initialization
var SLive_cursorY = 0;
var SLive_cursorX = 0;
var SLive_dataEnded = false;
var SLive_itemsCount = 0;
var SLive_nameMatrix = [];
var SLive_blankCellVector = [];
var SLive_loadingData = false;
var SLive_loadingDataTry = 0;
var SLive_loadingDataTryMax = 10;
var SLive_loadingDataTimeout = 3500;
var SLive_blankCellCount = 0;
var SLive_itemsCountOffset = 0;
var SLive_LastClickFinish = true;
var SLive_keyClickDelayTime = 25;
var SLive_ReplacedataEnded = false;
var SLive_MaxOffset = 0;
var SLive_emptyContent = false;

var SLive_Img = 'img_slive';
var SLive_Thumbnail = 'thumbnail_slive_';
var SLive_EmptyCell = 'sliveempty_';
var SLive_ThumbnailDiv = 'slive_thumbnail_div_';
var SLive_DispNameDiv = 'slive_display_name_';
var SLive_StreamTitleDiv = 'slive_stream_title_';
var SLive_StreamGameDiv = 'slive_stream_slive_';
var SLive_ViwersDiv = 'slive_viwers_';
var SLive_QualityDiv = 'slive_quality_';
var SLive_Cell = 'slive_cell_';
var SLive_Status = false;
var SLive_itemsCountCheck = false;
var SLive_lastData = '';
//Variable initialization end

function SLive_init() {
    Main_Go = Main_SLive;
    Main_cleanTopLabel();
    if (SLive_lastData !== Search_data) SLive_Status = false;
    document.getElementById('top_bar_user').innerHTML = STR_SEARCH + Main_UnderCenter(STR_LIVE + ' ' + "'" + Search_data + "'");
    document.body.addEventListener("keydown", SLive_handleKeyDown, false);
    Main_YRst(SLive_cursorY);
    if (SLive_Status) {
        Main_ScrollHelper(SLive_Thumbnail, SLive_cursorY, SLive_cursorX, Main_SLive, Main_ScrollOffSetMinusVideo,
            Main_ScrollOffSetVideo, false);
        Main_CounterDialog(SLive_cursorX, SLive_cursorY, Main_ColoumnsCountVideo, SLive_itemsCount);
    } else SLive_StartLoad();
}

function SLive_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", SLive_handleKeyDown);
}

function SLive_StartLoad() {
    SLive_lastData = Search_data;
    Main_HideWarningDialog();
    SLive_Status = false;
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    $('#stream_table_search_live').empty();
    SLive_loadingMore = false;
    SLive_blankCellCount = 0;
    SLive_itemsCountOffset = 0;
    SLive_ReplacedataEnded = false;
    SLive_MaxOffset = 0;
    SLive_nameMatrix = [];
    SLive_blankCellVector = [];
    SLive_itemsCountCheck = false;
    SLive_itemsCount = 0;
    SLive_cursorX = 0;
    SLive_cursorY = 0;
    SLive_dataEnded = false;
    Main_CounterDialogRst();
    SLive_loadDataPrepare();
    SLive_loadDataRequest();
}

function SLive_loadDataPrepare() {
    SLive_loadingData = true;
    SLive_loadingDataTry = 0;
    SLive_loadingDataTimeout = 3500;
}

function SLive_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = SLive_itemsCount + SLive_itemsCountOffset;
        if (offset && offset > (SLive_MaxOffset - 1)) {
            offset = SLive_MaxOffset - Main_ItemsLimitVideo;
            SLive_dataEnded = true;
            SLive_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/streams?query=' + encodeURIComponent(Search_data) +
            '&limit=' + Main_ItemsLimitVideo + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SLive_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    SLive_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    SLive_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SLive_loadDataError();
    }
}

function SLive_loadDataError() {
    SLive_loadingDataTry++;
    if (SLive_loadingDataTry < SLive_loadingDataTryMax) {
        SLive_loadingDataTimeout += (SLive_loadingDataTry < 5) ? 250 : 3500;
        SLive_loadDataRequest();
    } else {
        SLive_loadingData = false;
        SLive_loadingMore = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function SLive_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    SLive_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) SLive_dataEnded = true;

    var offset_itemsCount = SLive_itemsCount;
    SLive_itemsCount += response_items;

    SLive_emptyContent = !SLive_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, cell, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            if (SLive_CellExists(stream.channel.name)) coloumn_id--;
            else {
                cell = SLive_createCell(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                    stream.channel.status, stream.game, Main_is_playlist(JSON.stringify(stream.stream_type)) +
                    stream.channel.display_name, Main_addCommas(stream.viewers) + STR_VIEWER,
                    Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
                row.append(cell);
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (SLive_dataEnded && !SLive_itemsCountCheck) {
                SLive_itemsCountCheck = true;
                SLive_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.append(Main_createCellEmpty(row_id, coloumn_id, SLive_EmptyCell));
            SLive_blankCellVector.push(SLive_EmptyCell + row_id + '_' + coloumn_id);
        }
        $('#stream_table_search_live').append(row);
    }

    SLive_loadDataSuccessFinish();
}

function SLive_createCell(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    return $('<td id="' + SLive_Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        SLive_CellHtml(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality, preview_thumbnail, channel_name));
}

function SLive_CellHtml(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality, preview_thumbnail, channel_name) {

    SLive_nameMatrix.push(channel_name);

    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main_VideoSize);
    if (row_id < 3) Main_PreLoadAImage(preview_thumbnail); //try to pre cache first 3 rows

    return '<div id="' + SLive_Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_video" ><img id="' + SLive_Img + row_id + '_' +
        coloumn_id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + SLive_ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + SLive_DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div>' +
        '<div id="' + SLive_StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + SLive_StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div>' +
        '<div id="' + SLive_ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 40%; display: inline-block;">' + viwers +
        '</div>' + '<div id="' + SLive_QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; float: right; display: inline-block;">' + quality + '</div></div>';
}

function SLive_CellExists(display_name) {
    if (SLive_nameMatrix.indexOf(display_name) > -1) {
        SLive_blankCellCount++;
        return true;
    }
    return false;
}

function SLive_loadDataSuccessFinish() {
    $(document).ready(function() {
        if (!SLive_Status) {
            Main_HideLoadDialog();
            if (SLive_emptyContent) Main_showWarningDialog(STR_SEARCH_RESULT_EMPTY);
            else {
                SLive_Status = true;
                SLive_addFocus();
                Main_LazyImgStart(SLive_Img, 9, IMG_404_VIDEO, Main_ColoumnsCountVideo);
            }
            SLive_loadingData = false;
        } else {
            if (SLive_blankCellCount > 0 && !SLive_dataEnded) {
                SLive_loadingMore = true;
                SLive_loadDataPrepare();
                SLive_loadDataReplace();
                return;
            } else {
                SLive_blankCellCount = 0;
                SLive_blankCellVector = [];
            }

            SLive_loadingData = false;
            SLive_loadingMore = false;
        }
    });
}

function SLive_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReload(SLive_blankCellCount);

        var offset = SLive_itemsCount + SLive_itemsCountOffset;
        if (offset && offset > (SLive_MaxOffset - 1)) {
            offset = SLive_MaxOffset - Main_ItemsLimitReload;
            SLive_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/streams?query=' + encodeURIComponent(Search_data) +
            '&limit=' + Main_ItemsLimitReload + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SLive_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    SLive_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SLive_loadDataErrorReplace();
    }
}

function SLive_loadDataErrorReplace() {
    SLive_loadingDataTry++;
    if (SLive_loadingDataTry < SLive_loadingDataTryMax) {
        SLive_loadingDataTimeout += (SLive_loadingDataTry < 5) ? 250 : 3500;
        SLive_loadDataReplace();
    } else {
        SLive_ReplacedataEnded = true;
        SLive_blankCellCount = 0;
        SLive_blankCellVector = [];
        SLive_loadDataSuccessFinish();
    }
}

function SLive_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    var stream, index, cursor = 0;
    var tempVector = SLive_blankCellVector.slice();

    SLive_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) SLive_ReplacedataEnded = true;

    for (var i = 0; i < SLive_blankCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        if (SLive_CellExists(stream.channel.name)) {
            SLive_blankCellCount--;
            i--;
        } else {
            SLive_replaceCellEmpty(SLive_blankCellVector[i], stream.channel.name, stream.preview.template,
                stream.channel.status, stream.game, Main_is_playlist(JSON.stringify(stream.stream_type)) +
                stream.channel.display_name, Main_addCommas(stream.viewers) + STR_VIEWER,
                Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
            SLive_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    SLive_itemsCountOffset += cursor;
    if (SLive_ReplacedataEnded) {
        SLive_blankCellCount = 0;
        SLive_blankCellVector = [];
    } else SLive_blankCellVector = tempVector;

    SLive_loadDataSuccessFinish();
}

function SLive_replaceCellEmpty(id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = SLive_Cell + row_id + '_' + coloumn_id;

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', channel_name);
    document.getElementById(cell).innerHTML =
        SLive_CellHtml(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality, preview_thumbnail, channel_name);
}

function SLive_addFocus() {

    Main_addFocusVideo(SLive_cursorY, SLive_cursorX, SLive_Thumbnail, SLive_ThumbnailDiv, SLive_DispNameDiv, SLive_StreamTitleDiv,
        SLive_StreamGameDiv, SLive_ViwersDiv, SLive_QualityDiv, Main_SLive, Main_ColoumnsCountVideo, SLive_itemsCount);

    if (SLive_cursorY > 3) Main_LazyImg(SLive_Img, SLive_cursorY, IMG_404_VIDEO, Main_ColoumnsCountVideo, 4);

    if (((SLive_cursorY + Main_ItemsReloadLimitVideo) > (SLive_itemsCount / Main_ColoumnsCountVideo)) &&
        !SLive_dataEnded && !SLive_loadingMore) {
        SLive_loadingMore = true;
        SLive_loadDataPrepare();
        SLive_loadDataRequest();
    }
}

function SLive_removeFocus() {
    Main_removeFocusVideo(SLive_cursorY, SLive_cursorX, SLive_Thumbnail, SLive_ThumbnailDiv, SLive_DispNameDiv, SLive_StreamTitleDiv,
        SLive_StreamGameDiv, SLive_ViwersDiv, SLive_QualityDiv);
}

function SLive_keyClickDelay() {
    SLive_LastClickFinish = true;
}

function SLive_handleKeyDown(event) {
    if (SLive_loadingData && !SLive_loadingMore) {
        event.preventDefault();
        return;
    } else if (!SLive_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        SLive_LastClickFinish = false;
        window.setTimeout(SLive_keyClickDelay, SLive_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                if (Main_Go === Main_BeforeSearch) Main_Go = Main_Live;
                else Main_Go = Main_BeforeSearch;
                SLive_exit();
                Main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main_ThumbNull((SLive_cursorY), (SLive_cursorX - 1), SLive_Thumbnail)) {
                SLive_removeFocus();
                SLive_cursorX--;
                SLive_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((SLive_cursorY - 1), i, SLive_Thumbnail)) {
                        SLive_removeFocus();
                        SLive_cursorY--;
                        SLive_cursorX = i;
                        SLive_addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main_ThumbNull((SLive_cursorY), (SLive_cursorX + 1), SLive_Thumbnail)) {
                SLive_removeFocus();
                SLive_cursorX++;
                SLive_addFocus();
            } else if (Main_ThumbNull((SLive_cursorY + 1), 0, SLive_Thumbnail)) {
                SLive_removeFocus();
                SLive_cursorY++;
                SLive_cursorX = 0;
                SLive_addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((SLive_cursorY - 1), (SLive_cursorX - i), SLive_Thumbnail)) {
                    SLive_removeFocus();
                    SLive_cursorY--;
                    SLive_cursorX = SLive_cursorX - i;
                    SLive_addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((SLive_cursorY + 1), (SLive_cursorX - i), SLive_Thumbnail)) {
                    SLive_removeFocus();
                    SLive_cursorY++;
                    SLive_cursorX = SLive_cursorX - i;
                    SLive_addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!SLive_loadingMore) SLive_StartLoad();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Play_selectedChannel = $('#' + SLive_Cell + SLive_cursorY + '_' + SLive_cursorX).attr('data-channelname');
            Play_selectedChannelDisplayname = document.getElementById(SLive_DispNameDiv + SLive_cursorY + '_' + SLive_cursorX).textContent;
            document.body.removeEventListener("keydown", SLive_handleKeyDown);
            Main_openStream();
            break;
        case TvKeyCode.KEY_RED:
            Main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            SLive_exit();
            Main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main_BeforeSearch = Main_SLive;
            Main_Go = Main_Search;
            SLive_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}
