/*jshint multistr: true */
//Variable initialization
function SChannels() {}
SChannels.Thumbnail = 'thumbnail_schannels_';
SChannels.EmptyCell = 'schannels_empty_';
SChannels.cursorY = 0;
SChannels.cursorX = 0;
SChannels.dataEnded = false;
SChannels.itemsCount = 0;
SChannels.imgMatrix = [];
SChannels.imgMatrixId = [];
SChannels.imgMatrixCount = 0;
SChannels.nameMatrix = [];
SChannels.nameMatrixCount = 0;
SChannels.loadingData = false;
SChannels.loadingDataTry = 0;
SChannels.loadingDataTryMax = 10;
SChannels.loadingDataTimeout = 3500;
SChannels.isDialogOn = false;
SChannels.ItemsLimit = 96;
SChannels.ColoumnsCount = 6;
SChannels.ItemsReloadLimit = Math.floor((SChannels.ItemsLimit / SChannels.ColoumnsCount) / 2);
SChannels.newImg = new Image();
SChannels.blankCellCount = 0;
SChannels.itemsCountOffset = 0;
SChannels.LastClickFinish = true;
SChannels.keyClickDelayTime = 25;
SChannels.ReplacedataEnded = false;
SChannels.MaxOffset = 0;

SChannels.ThumbnailDiv = 'schannels_thumbnail_div_';
SChannels.DispNameDiv = 'schannels_display_name_';
SChannels.StreamTitleDiv = 'schannels_stream_title_';
SChannels.Cell = 'schannels_cell_';
SChannels.status = false;
SChannels.lastData = '';

//Variable initialization end

SChannels.init = function() {
    Main.Go = Main.SChannels;
    if (SChannels.lastData !== Search.data) SChannels.status = false;
    Main.cleanTopLabel();
    $('.lable_user').html(STR_SEARCH);
    $('.label_agame_name').html(STR_CHANNELS + ' ' + '\'' + Search.data + '\'');
    document.body.addEventListener("keydown", SChannels.handleKeyDown, false);
    if (SChannels.status) Main.ScrollHelper.scrollVerticalToElementById(SChannels.Thumbnail, SChannels.cursorY, SChannels.cursorX, Main.SChannels, Main.ScrollOffSetMinusChannels, Main.ScrollOffSetVideo, true);
    else SChannels.StartLoad();
};

SChannels.exit = function() {
    Main.RestoreTopLabel();
    document.body.removeEventListener("keydown", SChannels.handleKeyDown);
    SChannels.status = false;
};

SChannels.Postexit = function() {
    Main.SwitchScreen();
};

SChannels.StartLoad = function() {
    SChannels.lastData = Search.data;
    Main.HideWarningDialog();
    SChannels.status = false;
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_search_channel').empty();
    SChannels.loadingMore = false;
    SChannels.blankCellCount = 0;
    SChannels.itemsCountOffset = 0;
    SChannels.ReplacedataEnded = false;
    SChannels.MaxOffset = 0;
    SChannels.nameMatrix = [];
    SChannels.nameMatrixCount = 0;
    SChannels.itemsCount = 0;
    SChannels.cursorX = 0;
    SChannels.cursorY = 0;
    SChannels.dataEnded = false;
    SChannels.loadData();
};

SChannels.loadData = function() {
    SChannels.imgMatrix = [];
    SChannels.imgMatrixId = [];
    SChannels.imgMatrixCount = 0;
    SChannels.loadingData = true;
    SChannels.loadingDataTry = 0;
    SChannels.loadingDataTimeout = 3500;
    SChannels.loadDataRequest();
};

SChannels.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = SChannels.itemsCount + SChannels.itemsCountOffset;
        if (offset !== 0 && offset >= (SChannels.MaxOffset - SChannels.ItemsLimit)) {
            offset = SChannels.MaxOffset - SChannels.ItemsLimit;
            SChannels.dataEnded = true;
            SChannels.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/channels?query=' + encodeURIComponent(Search.data) +
            '&limit=' + SChannels.ItemsLimit + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SChannels.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        SChannels.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    SChannels.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SChannels.loadDataError();
    }
};

SChannels.loadDataError = function() {
    SChannels.loadingDataTry++;
    if (SChannels.loadingDataTry < SChannels.loadingDataTryMax) {
        SChannels.loadingDataTimeout += (SChannels.loadingDataTry < 5) ? 250 : 3500;
        SChannels.loadDataRequest();
    } else {
        SChannels.loadingData = false;
        SChannels.loadingMore = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

SChannels.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.channels.length;
    SChannels.MaxOffset = parseInt(response._total);

    if (response_items < SChannels.ItemsLimit) SChannels.dataEnded = true;

    var offset_itemsCount = SChannels.itemsCount;
    SChannels.itemsCount += response_items;

    var response_rows = response_items / SChannels.ColoumnsCount;
    if (response_items % SChannels.ColoumnsCount > 0) response_rows++;

    var coloumn_id, row_id, row, cell, channels,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / SChannels.ColoumnsCount + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < SChannels.ColoumnsCount && cursor < response_items; coloumn_id++, cursor++) {
            channels = response.channels[cursor];
            if (SChannels.CellExists(channels.name)) coloumn_id--;
            else {
                cell = SChannels.createCell(row_id, coloumn_id, channels.name, channels.logo, channels.display_name);
                row.append(cell);
            }
        }

        for (coloumn_id; coloumn_id < SChannels.ColoumnsCount; coloumn_id++) {
            row.append(Main.createCellEmpty(row_id, coloumn_id, SChannels.EmptyCell));
        }
        $('#stream_table_search_channel').append(row);
    }

    SChannels.loadDataSuccessFinish();
};

SChannels.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, channel_display_name) {
    SChannels.imgMatrix[SChannels.imgMatrixCount] = preview_thumbnail;
    SChannels.imgMatrixId[SChannels.imgMatrixCount] = SChannels.Thumbnail + row_id + '_' + coloumn_id;
    SChannels.imgMatrixCount++;

    if (SChannels.imgMatrixCount <= (SChannels.ColoumnsCount * 3)) SChannels.newImg.src = preview_thumbnail; //try to pre cache first 4 rows

    SChannels.nameMatrix[SChannels.nameMatrixCount] = channel_name;
    SChannels.nameMatrixCount++;

    return $('<td id="' + SChannels.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="' + SChannels.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_LOGO + '"/>' +
        '<div id="' + SChannels.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + SChannels.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div></div>');
};

SChannels.CellExists = function(display_name) {
    for (var i = 0; i <= SChannels.nameMatrixCount; i++) {
        if (display_name == SChannels.nameMatrix[i]) {
            SChannels.blankCellCount++;
            return true;
        }
    }
    return false;
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
SChannels.loadDataSuccessFinish = function() {
    $('#stream_table_search_channel').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!SChannels.status) {
                Main.HideLoadDialog();
                SChannels.status = true;
                SChannels.addFocus();
            }

            Main.LoadImages(SChannels.imgMatrix, SChannels.imgMatrixId, IMG_404_LOGO);

            if (SChannels.blankCellCount > 0 && !SChannels.dataEnded) {
                SChannels.loadingMore = true;
                SChannels.loadDataReplace();
                return;
            } else SChannels.blankCellCount = 0;

            SChannels.loadingData = false;
            SChannels.loadingMore = false;
        });
};

SChannels.loadDataReplace = function() {
    SChannels.imgMatrix = [];
    SChannels.imgMatrixId = [];
    SChannels.imgMatrixCount = 0;
    SChannels.loadingData = true;
    SChannels.loadingDataTry = 0;
    SChannels.loadingDataTimeout = 3500;
    SChannels.loadDataRequestReplace();
};

SChannels.loadDataRequestReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = SChannels.itemsCount + SChannels.itemsCountOffset;
        if (offset !== 0 && offset >= (SChannels.MaxOffset - SChannels.ItemsLimit)) {
            offset = SChannels.MaxOffset - SChannels.ItemsLimit;
            SChannels.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/channels?query=' + encodeURIComponent(Search.data) +
            '&limit=' + SChannels.ItemsLimit + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SChannels.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        SChannels.loadDataSuccessReplace(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SChannels.loadDataErrorReplace();
    }
};

SChannels.loadDataErrorReplace = function() {
    SChannels.loadingDataTry++;
    if (SChannels.loadingDataTry < SChannels.loadingDataTryMax) {
        SChannels.loadingDataTimeout += (SChannels.loadingDataTry < 5) ? 250 : 3500;
        SChannels.loadDataRequestReplace();
    }
};

SChannels.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.channels.length;
    SChannels.MaxOffset = parseInt(response._total);

    if (response_items < SChannels.ItemsLimit) SChannels.ReplacedataEnded = true;

    var row_id = SChannels.itemsCount / SChannels.ColoumnsCount;

    var coloumn_id, channels, mReplace = false,
        cursor = 0;

    for (cursor; cursor < response_items; cursor++) {
        channels = response.channels[cursor];
        if (SChannels.CellExists(channels.name)) SChannels.blankCellCount--;
        else {
            mReplace = SChannels.replaceCellEmpty(row_id, coloumn_id, channels.name, channels.logo, channels.display_name);
            if (mReplace) SChannels.blankCellCount--;
            if (SChannels.blankCellCount === 0) break;
        }
    }
    SChannels.itemsCountOffset += cursor;
    if (SChannels.ReplacedataEnded) SChannels.blankCellCount = 0;
    SChannels.loadDataSuccessFinish();
};

SChannels.replaceCellEmpty = function(row_id, coloumn_id, channel_name, preview_thumbnail, channel_display_name) {
    var my = 0,
        mx = 0;
    if (row_id < ((SChannels.ItemsLimit / SChannels.ColoumnsCount) - 1)) return false;
    for (my = row_id - (1 + Math.ceil(SChannels.blankCellCount / SChannels.ColoumnsCount)); my < row_id; my++) {
        for (mx = 0; mx < SChannels.ColoumnsCount; mx++) {
            if (!Main.ThumbNull(my, mx, SChannels.Thumbnail) && (Main.ThumbNull(my, mx, SChannels.EmptyCell))) {
                row_id = my;
                coloumn_id = mx;
                SChannels.nameMatrix[SChannels.nameMatrixCount] = channel_name;
                SChannels.nameMatrixCount++;
                document.getElementById(SChannels.EmptyCell + row_id + '_' + coloumn_id).setAttribute('id', SChannels.Cell + row_id + '_' + coloumn_id);
                document.getElementById(SChannels.Cell + row_id + '_' + coloumn_id).setAttribute('data-channelname', channel_name);
                document.getElementById(SChannels.Cell + row_id + '_' + coloumn_id).innerHTML =
                    '<img id="' + SChannels.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + preview_thumbnail + '"/>' +
                    '<div id="' + SChannels.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
                    '<div id="' + SChannels.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div></div>';
                return true;
            }
        }
    }

    return false;
};

SChannels.addFocus = function() {
    if (((SChannels.cursorY + SChannels.ItemsReloadLimit) > (SChannels.itemsCount / SChannels.ColoumnsCount)) &&
        !SChannels.dataEnded && !SChannels.loadingMore) {
        SChannels.loadingMore = true;
        SChannels.loadData();
    }

    $('#' + SChannels.Thumbnail + SChannels.cursorY + '_' + SChannels.cursorX).addClass('stream_thumbnail_focused');
    $('#' + SChannels.ThumbnailDiv + SChannels.cursorY + '_' + SChannels.cursorX).addClass('stream_text_focused');
    $('#' + SChannels.DispNameDiv + SChannels.cursorY + '_' + SChannels.cursorX).addClass('stream_channel_focused');
    window.setTimeout(function() {
        Main.ScrollHelper.scrollVerticalToElementById(SChannels.Thumbnail, SChannels.cursorY, SChannels.cursorX, Main.SChannels, Main.ScrollOffSetMinusChannels, Main.ScrollOffSetVideo, true);
    }, 10);
};

SChannels.removeFocus = function() {
    $('#' + SChannels.Thumbnail + SChannels.cursorY + '_' + SChannels.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + SChannels.ThumbnailDiv + SChannels.cursorY + '_' + SChannels.cursorX).removeClass('stream_text_focused');
    $('#' + SChannels.DispNameDiv + SChannels.cursorY + '_' + SChannels.cursorX).removeClass('stream_channel_focused');
};

SChannels.keyClickDelay = function() {
    SChannels.LastClickFinish = true;
};

SChannels.handleKeyDown = function(event) {
    if (SChannels.loadingData && !SChannels.loadingMore) {
        event.preventDefault();
        return;
    } else if (!SChannels.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        SChannels.LastClickFinish = false;
        window.setTimeout(SChannels.keyClickDelay, SChannels.keyClickDelayTime);
    }

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                if (Main.Go === Main.Before) Main.Go = Main.Live;
                else Main.Go = Main.Before;
                SChannels.exit();
                SChannels.Postexit();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((SChannels.cursorY), (SChannels.cursorX - 1), SChannels.Thumbnail)) {
                SChannels.removeFocus();
                SChannels.cursorX--;
                SChannels.addFocus();
            } else {
                for (i = (SChannels.ColoumnsCount - 1); i > -1; i--) {
                    if (Main.ThumbNull((SChannels.cursorY - 1), i, SChannels.Thumbnail)) {
                        SChannels.removeFocus();
                        SChannels.cursorY--;
                        SChannels.cursorX = i;
                        SChannels.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.ThumbNull((SChannels.cursorY), (SChannels.cursorX + 1), SChannels.Thumbnail)) {
                SChannels.removeFocus();
                SChannels.cursorX++;
                SChannels.addFocus();
            } else if (Main.ThumbNull((SChannels.cursorY + 1), 0, SChannels.Thumbnail)) {
                SChannels.removeFocus();
                SChannels.cursorY++;
                SChannels.cursorX = 0;
                SChannels.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < SChannels.ColoumnsCount; i++) {
                if (Main.ThumbNull((SChannels.cursorY - 1), (SChannels.cursorX - i), SChannels.Thumbnail)) {
                    SChannels.removeFocus();
                    SChannels.cursorY--;
                    SChannels.cursorX = SChannels.cursorX - i;
                    SChannels.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < SChannels.ColoumnsCount; i++) {
                if (Main.ThumbNull((SChannels.cursorY + 1), (SChannels.cursorX - i), SChannels.Thumbnail)) {
                    SChannels.removeFocus();
                    SChannels.cursorY++;
                    SChannels.cursorX = SChannels.cursorX - i;
                    SChannels.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!SChannels.loadingMore) SChannels.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
        case TvKeyCode.KEY_CHANNELDOWN:
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Main.selectedChannel = $('#' + SChannels.Cell + SChannels.cursorY + '_' + SChannels.cursorX).attr('data-channelname');
            Main.selectedChannelDisplayname = document.getElementById(SChannels.DispNameDiv + SChannels.cursorY + '_' + SChannels.cursorX).textContent;
            Main.selectedChannelChannelLogo = document.getElementById(SChannels.Thumbnail + SChannels.cursorY + '_' + SChannels.cursorX).src;
            document.body.removeEventListener("keydown", SChannels.handleKeyDown);
            Main.Before = Main.SChannels;
            SChannelContent.init();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Main.Go = Main.Live;
            SChannels.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.SChannels;
            Main.Go = Main.Search;
            SChannels.exit();
            SChannels.Postexit();
            break;
        case TvKeyCode.KEY_VOLUMEUP:
        case TvKeyCode.KEY_VOLUMEDOWN:
        case TvKeyCode.KEY_MUTE:
            break;
        default:
            break;
    }
};
