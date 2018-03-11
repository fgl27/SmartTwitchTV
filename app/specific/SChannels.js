/*jshint multistr: true */
//Variable initialization
function SChannels() {}
SChannels.Thumbnail = 'thumbnail_schannels_';
SChannels.EmptyCell = 'schannelsempty_';
SChannels.cursorY = 0;
SChannels.cursorX = 0;
SChannels.dataEnded = false;
SChannels.itemsCount = 0;
SChannels.nameMatrix = [];
SChannels.nameMatrixCount = 0;
SChannels.blankCellVector = [];
SChannels.loadingData = false;
SChannels.loadingDataTry = 0;
SChannels.loadingDataTryMax = 10;
SChannels.loadingDataTimeout = 3500;
SChannels.isDialogOn = false;
SChannels.blankCellCount = 0;
SChannels.itemsCountOffset = 0;
SChannels.LastClickFinish = true;
SChannels.keyClickDelayTime = 25;
SChannels.ReplacedataEnded = false;
SChannels.MaxOffset = 0;
SChannels.emptyContent = false;

SChannels.ThumbnailDiv = 'schannels_thumbnail_div_';
SChannels.DispNameDiv = 'schannels_display_name_';
SChannels.StreamTitleDiv = 'schannels_stream_title_';
SChannels.Cell = 'schannels_cell_';
SChannels.Status = false;
SChannels.lastData = '';
SChannels.itemsCountCheck = false;

//Variable initialization end

SChannels.init = function() {
    Main.Go = Main.SChannels;
    if (SChannels.lastData !== Search.data) SChannels.Status = false;
    Main.cleanTopLabel();
    $('.lable_user').html(STR_SEARCH);
    $('.label_agame_name').html(STR_CHANNELS + ' ' + '\'' + Search.data + '\'');
    document.body.addEventListener("keydown", SChannels.handleKeyDown, false);
    if (SChannels.Status) {
        Main.ScrollHelper.scrollVerticalToElementById(SChannels.Thumbnail, SChannels.cursorY, SChannels.cursorX, Main.SChannels,
            Main.ScrollOffSetMinusChannels, Main.ScrollOffSetVideo, true);
        Main.CounterDialog(SChannels.cursorX, SChannels.cursorY, Main.ColoumnsCountChannel, SChannels.itemsCount);
    } else SChannels.StartLoad();
};

SChannels.exit = function() {
    Main.RestoreTopLabel();
    document.body.removeEventListener("keydown", SChannels.handleKeyDown);
};

SChannels.Postexit = function() {
    Main.SwitchScreen();
};

SChannels.StartLoad = function() {
    SChannels.lastData = Search.data;
    Main.HideWarningDialog();
    SChannels.Status = false;
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#' + Main.TempTable).empty();
    SChannels.loadingMore = false;
    SChannels.blankCellCount = 0;
    SChannels.itemsCountOffset = 0;
    SChannels.ReplacedataEnded = false;
    SChannels.MaxOffset = 0;
    SChannels.nameMatrix = [];
    SChannels.nameMatrixCount = 0;
    SChannels.blankCellVector = [];
    SChannels.itemsCountCheck = false;
    SChannels.itemsCount = 0;
    SChannels.cursorX = 0;
    SChannels.cursorY = 0;
    SChannels.dataEnded = false;
    Main.CounterDialogRst();
    SChannels.loadDataPrepare();
    SChannels.loadDataRequest();
};

SChannels.loadDataPrepare = function() {
    Main.MatrixRst();
    SChannels.loadingData = true;
    SChannels.loadingDataTry = 0;
    SChannels.loadingDataTimeout = 3500;
};

SChannels.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = SChannels.itemsCount + SChannels.itemsCountOffset;
        if (offset !== 0 && offset > (SChannels.MaxOffset - 1)) {
            offset = SChannels.MaxOffset - Main.ItemsLimitChannel;
            SChannels.dataEnded = true;
            SChannels.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/channels?query=' + encodeURIComponent(Search.data) +
            '&limit=' + Main.ItemsLimitChannel + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
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

    if (response_items < Main.ItemsLimitChannel) SChannels.dataEnded = true;

    var offset_itemsCount = SChannels.itemsCount;
    SChannels.itemsCount += response_items;

    SChannels.emptyContent = SChannels.itemsCount === 0;

    var response_rows = response_items / Main.ColoumnsCountChannel;
    if (response_items % Main.ColoumnsCountChannel > 0) response_rows++;

    var coloumn_id, row_id, row, cell, channels,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountChannel + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountChannel && cursor < response_items; coloumn_id++, cursor++) {
            channels = response.channels[cursor];
            if (SChannels.CellExists(channels.name)) coloumn_id--;
            else {
                cell = SChannels.createCell(row_id, coloumn_id, channels.name, channels.logo, channels.display_name);
                row.append(cell);
            }
        }

        for (coloumn_id; coloumn_id < Main.ColoumnsCountChannel; coloumn_id++) {
            if (SChannels.dataEnded && !SChannels.itemsCountCheck) {
                SChannels.itemsCountCheck = true;
                SChannels.itemsCount = (row_id * Main.ColoumnsCountChannel) + coloumn_id;
            }
            row.append(Main.createCellEmpty(row_id, coloumn_id, SChannels.EmptyCell));
            SChannels.blankCellVector.push(SChannels.EmptyCell + row_id + '_' + coloumn_id);
        }
        $('#' + Main.TempTable).append(row);
    }

    SChannels.loadDataSuccessFinish();
};


SChannels.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, channel_display_name) {
    SChannels.CellMatrix(channel_name, preview_thumbnail, row_id, coloumn_id);
    return $('<td id="' + SChannels.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        SChannels.CellHtml(row_id, coloumn_id, channel_name, preview_thumbnail, channel_display_name));
};

SChannels.CellMatrix = function(channel_name, preview_thumbnail, row_id, coloumn_id) {
    Main.CellMatrixChannel(preview_thumbnail, Main.ColoumnsCountChannel, SChannels.Thumbnail, row_id, coloumn_id);
    SChannels.nameMatrix[SChannels.nameMatrixCount] = channel_name;
    SChannels.nameMatrixCount++;
};

SChannels.CellHtml = function(row_id, coloumn_id, channel_name, preview_thumbnail, channel_display_name) {
    return '<img id="' + SChannels.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_LOGO + '"/>' +
        '<div id="' + SChannels.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + SChannels.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div></div>';
};

SChannels.CellExists = function(display_name) {
    if (SChannels.nameMatrix.indexOf(display_name) > -1) {
        SChannels.blankCellCount++;
        return true;
    }
    return false;
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
SChannels.loadDataSuccessFinish = function() {
    $('#' + Main.TempTable).imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!SChannels.Status) {
                if (SChannels.emptyContent) Main.showWarningDialog(STR_SEARCH_RESULT_EMPTY);
                else SChannels.Status = true;

                Main.appendTable('stream_table_search_channel');

                Main.HideLoadDialog();
                SChannels.addFocus();
                Main.LoadImagesPre(IMG_404_LOGO);

                SChannels.loadingData = false;
            } else {
                Main.appendTable('stream_table_search_channel');
                Main.LoadImagesPre(IMG_404_LOGO);

                if (SChannels.blankCellCount > 0 && !SChannels.dataEnded) {
                    SChannels.loadingMore = true;
                    SChannels.loadDataPrepare();
                    SChannels.loadDataReplace();
                    return;
                } else {
                    SChannels.blankCellCount = 0;
                    SChannels.blankCellVector = [];
                }

                SChannels.loadingData = false;
                SChannels.loadingMore = false;
            }
        });
};

SChannels.loadDataReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main.SetItemsLimitReload(SChannels.blankCellCount);

        var offset = SChannels.itemsCount + SChannels.itemsCountOffset;
        if (offset !== 0 && offset > (SChannels.MaxOffset - 1)) {
            offset = SChannels.MaxOffset - Main.ItemsLimitReload;
            SChannels.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/channels?query=' + encodeURIComponent(Search.data) +
            '&limit=' + Main.ItemsLimitReload + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
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
        SChannels.loadDataReplace();
    } else {
        SChannels.ReplacedataEnded = true;
        SChannels.blankCellCount = 0;
        SChannels.blankCellVector = [];
        SChannels.loadDataSuccessFinish();
    }
};

SChannels.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.channels.length;
    var channels, index, cursor = 0;
    var tempVector = SChannels.blankCellVector.slice();

    SChannels.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitVideo) SChannels.ReplacedataEnded = true;

    for (var i = 0; i < SChannels.blankCellVector.length && cursor < response_items; i++, cursor++) {
        channels = response.channels[cursor];
        if (SChannels.CellExists(channels.name)) {
            SChannels.blankCellCount--;
            i--;
        } else {
            SChannels.replaceCellEmpty(SChannels.blankCellVector[i], channels.name, channels.logo, channels.display_name);
            SChannels.blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    SChannels.itemsCountOffset += cursor;
    if (SChannels.ReplacedataEnded) {
        SChannels.blankCellCount = 0;
        SChannels.blankCellVector = [];
    } else SChannels.blankCellVector = tempVector;

    SChannels.loadDataSuccessFinish();
};

SChannels.replaceCellEmpty = function(id, channel_name, preview_thumbnail, channel_display_name) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = SChannels.Cell + row_id + '_' + coloumn_id;

    SChannels.CellMatrix(channel_name, preview_thumbnail, row_id, coloumn_id);

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', channel_name);
    document.getElementById(cell).innerHTML =
        SChannels.CellHtml(row_id, coloumn_id, channel_name, preview_thumbnail, channel_display_name);
};

SChannels.addFocus = function() {
    if (((SChannels.cursorY + Main.ItemsReloadLimitChannel) > (SChannels.itemsCount / Main.ColoumnsCountChannel)) &&
        !SChannels.dataEnded && !SChannels.loadingMore) {
        SChannels.loadingMore = true;
        SChannels.loadDataPrepare();
        SChannels.loadDataRequest();
    }

    $('#' + SChannels.Thumbnail + SChannels.cursorY + '_' + SChannels.cursorX).addClass('stream_thumbnail_focused');
    $('#' + SChannels.ThumbnailDiv + SChannels.cursorY + '_' + SChannels.cursorX).addClass('stream_text_focused');
    $('#' + SChannels.DispNameDiv + SChannels.cursorY + '_' + SChannels.cursorX).addClass('stream_channel_focused');
    window.setTimeout(function() {
        Main.ScrollHelper.scrollVerticalToElementById(SChannels.Thumbnail, SChannels.cursorY, SChannels.cursorX, Main.SChannels, Main.ScrollOffSetMinusChannels, Main.ScrollOffSetVideo, true);
    }, 10);

    Main.CounterDialog(SChannels.cursorX, SChannels.cursorY, Main.ColoumnsCountChannel, SChannels.itemsCount);
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

    var i;

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
                for (i = (Main.ColoumnsCountChannel - 1); i > -1; i--) {
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
            for (i = 0; i < Main.ColoumnsCountChannel; i++) {
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
            for (i = 0; i < Main.ColoumnsCountChannel; i++) {
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
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (!SChannels.loadingMore) {
                Main.selectedChannel = $('#' + SChannels.Cell + SChannels.cursorY + '_' + SChannels.cursorX).attr('data-channelname');
                Main.selectedChannelDisplayname = document.getElementById(SChannels.DispNameDiv + SChannels.cursorY + '_' + SChannels.cursorX).textContent;
                Main.selectedChannelChannelLogo = document.getElementById(SChannels.Thumbnail + SChannels.cursorY + '_' + SChannels.cursorX).src;
                document.body.removeEventListener("keydown", SChannels.handleKeyDown);
                Main.Before = Main.SChannels;
                Main.Go = Main.SChannelContent;
                Main.SwitchScreen();
            }
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
        default:
            break;
    }
};
