/*jshint multistr: true */
//Variable initialization
function SLive() {}
SLive.Thumbnail = 'thumbnail_slive_';
SLive.EmptyCell = 'sliveempty_';
SLive.cursorY = 0;
SLive.cursorX = 0;
SLive.dataEnded = false;
SLive.itemsCount = 0;
SLive.nameMatrix = [];
SLive.nameMatrixCount = 0;
SLive.blankCellVector = [];
SLive.loadingData = false;
SLive.loadingDataTry = 0;
SLive.loadingDataTryMax = 10;
SLive.loadingDataTimeout = 3500;
SLive.isDialogOn = false;
SLive.blankCellCount = 0;
SLive.itemsCountOffset = 0;
SLive.LastClickFinish = true;
SLive.keyClickDelayTime = 25;
SLive.ReplacedataEnded = false;
SLive.MaxOffset = 0;
SLive.emptyContent = false;

SLive.ThumbnailDiv = 'slive_thumbnail_div_';
SLive.DispNameDiv = 'slive_display_name_';
SLive.StreamTitleDiv = 'slive_stream_title_';
SLive.StreamGameDiv = 'slive_stream_slive_';
SLive.ViwersDiv = 'slive_viwers_';
SLive.QualityDiv = 'slive_quality_';
SLive.Cell = 'slive_cell_';
SLive.Status = false;
SLive.itemsCountCheck = false;
SLive.lastData = '';

//Variable initialization end

SLive.init = function() {
    Main.Go = Main.SLive;
    Main.cleanTopLabel();
    if (SLive.lastData !== Search.data) SLive.Status = false;
    $('.lable_user').html(STR_SEARCH);
    $('.label_agame_name').html(STR_LIVE + ' ' + '\'' + Search.data + '\'');
    document.body.addEventListener("keydown", SLive.handleKeyDown, false);
    if (SLive.Status) {
        Main.ScrollHelper.scrollVerticalToElementById(SLive.Thumbnail, SLive.cursorY, SLive.cursorX, Main.SLive, Main.ScrollOffSetMinusVideo,
            Main.ScrollOffSetVideo, false);
        Main.CounterDialog(SLive.cursorX, SLive.cursorY, Main.ColoumnsCountVideo, SLive.itemsCount);
    } else SLive.StartLoad();
};

SLive.exit = function() {
    Main.RestoreTopLabel();
    document.body.removeEventListener("keydown", SLive.handleKeyDown);
};

SLive.StartLoad = function() {
    SLive.lastData = Search.data;
    Main.HideWarningDialog();
    SLive.Status = false;
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#' + Main.TempTable).empty();
    SLive.loadingMore = false;
    SLive.blankCellCount = 0;
    SLive.itemsCountOffset = 0;
    SLive.ReplacedataEnded = false;
    SLive.MaxOffset = 0;
    SLive.nameMatrix = [];
    SLive.blankCellVector = [];
    SLive.itemsCountCheck = false;
    SLive.nameMatrixCount = 0;
    SLive.itemsCount = 0;
    SLive.cursorX = 0;
    SLive.cursorY = 0;
    SLive.dataEnded = false;
    Main.CounterDialogRst();
    SLive.loadDataPrepare();
    SLive.loadDataRequest();
};

SLive.loadDataPrepare = function() {
    Main.MatrixRst();
    SLive.loadingData = true;
    SLive.loadingDataTry = 0;
    SLive.loadingDataTimeout = 3500;
};

SLive.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = SLive.itemsCount + SLive.itemsCountOffset;
        if (offset !== 0 && offset > (SLive.MaxOffset - 1)) {
            offset = SLive.MaxOffset - Main.ItemsLimitVideo;
            SLive.dataEnded = true;
            SLive.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/streams?query=' + encodeURIComponent(Search.data) +
            '&limit=' + Main.ItemsLimitVideo + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SLive.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        SLive.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    SLive.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SLive.loadDataError();
    }
};

SLive.loadDataError = function() {
    SLive.loadingDataTry++;
    if (SLive.loadingDataTry < SLive.loadingDataTryMax) {
        SLive.loadingDataTimeout += (SLive.loadingDataTry < 5) ? 250 : 3500;
        SLive.loadDataRequest();
    } else {
        SLive.loadingData = false;
        SLive.loadingMore = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

SLive.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    SLive.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitVideo) SLive.dataEnded = true;

    var offset_itemsCount = SLive.itemsCount;
    SLive.itemsCount += response_items;

    SLive.emptyContent = SLive.itemsCount === 0;

    var response_rows = response_items / Main.ColoumnsCountVideo;
    if (response_items % Main.ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, cell, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountVideo + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            if (SLive.CellExists(stream.channel.name)) coloumn_id--;
            else {
                cell = SLive.createCell(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                    stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                    stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                    Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
                row.append(cell);
            }
        }

        for (coloumn_id; coloumn_id < Main.ColoumnsCountVideo; coloumn_id++) {
            if (SLive.dataEnded && !SLive.itemsCountCheck) {
                SLive.itemsCountCheck = true;
                SLive.itemsCount = (row_id * Main.ColoumnsCountVideo) + coloumn_id;
            }
            row.append(Main.createCellEmpty(row_id, coloumn_id, SLive.EmptyCell));
            SLive.blankCellVector.push(SLive.EmptyCell + row_id + '_' + coloumn_id);
        }
        $('#' + Main.TempTable).append(row);
    }

    SLive.loadDataSuccessFinish();
};

SLive.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    SLive.CellMatrix(channel_name, preview_thumbnail, row_id, coloumn_id);
    return $('<td id="' + SLive.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        SLive.CellHtml(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality));
};

SLive.CellMatrix = function(channel_name, preview_thumbnail, row_id, coloumn_id) {
    Main.CellMatrix(preview_thumbnail, Main.ColoumnsCountVideo, SLive.Thumbnail, row_id, coloumn_id, Main.VideoSize);
    SLive.nameMatrix[SLive.nameMatrixCount] = channel_name;
    SLive.nameMatrixCount++;
};

SLive.CellHtml = function(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality) {
    return '<img id="' + SLive.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_VIDEO + '"/>' +
        '<div id="' + SLive.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + SLive.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div>' +
        '<div id="' + SLive.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + SLive.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div>' +
        '<div id="' + SLive.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 40%; display: inline-block;">' + viwers +
        '</div>' + '<div id="' + SLive.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; float: right; display: inline-block;">' + quality + '</div></div>';
};

SLive.CellExists = function(display_name) {
    if (SLive.nameMatrix.indexOf(display_name) > -1) {
        SLive.blankCellCount++;
        return true;
    }
    return false;
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
SLive.loadDataSuccessFinish = function() {

    $('#' + Main.TempTable).imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!SLive.Status) {
                if (SLive.emptyContent) Main.showWarningDialog(STR_SEARCH_RESULT_EMPTY);
                else SLive.Status = true;

                Main.ReplaceTable('stream_table_search_live');

                Main.HideLoadDialog();
                SLive.addFocus();
                Main.LoadImagesPre(IMG_404_VIDEO);

                SLive.loadingData = false;
            } else {
                Main.appendTable('stream_table_search_live');
                Main.LoadImagesPre(IMG_404_VIDEO);

                if (SLive.blankCellCount > 0 && !SLive.dataEnded) {
                    SLive.loadingMore = true;
                    SLive.loadDataPrepare();
                    SLive.loadDataReplace();
                    return;
                } else {
                    SLive.blankCellCount = 0;
                    SLive.blankCellVector = [];
                }

                SLive.loadingData = false;
                SLive.loadingMore = false;
            }
        });
};

SLive.loadDataReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main.SetItemsLimitReload(SLive.blankCellCount);

        var offset = SLive.itemsCount + SLive.itemsCountOffset;
        if (offset !== 0 && offset > (SLive.MaxOffset - 1)) {
            offset = SLive.MaxOffset - Main.ItemsLimitReload;
            SLive.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/streams?query=' + encodeURIComponent(Search.data) +
            '&limit=' + Main.ItemsLimitReload + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SLive.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        SLive.loadDataSuccessReplace(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SLive.loadDataErrorReplace();
    }
};

SLive.loadDataErrorReplace = function() {
    SLive.loadingDataTry++;
    if (SLive.loadingDataTry < SLive.loadingDataTryMax) {
        SLive.loadingDataTimeout += (SLive.loadingDataTry < 5) ? 250 : 3500;
        SLive.loadDataReplace();
    } else {
        SLive.ReplacedataEnded = true;
        SLive.blankCellCount = 0;
        SLive.blankCellVector = [];
        SLive.loadDataSuccessFinish();
    }
};

SLive.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    var stream, index, cursor = 0;
    var tempVector = SLive.blankCellVector.slice();

    SLive.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitVideo) SLive.ReplacedataEnded = true;

    for (var i = 0; i < SLive.blankCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        if (SLive.CellExists(stream.channel.name)) {
            SLive.blankCellCount--;
            i--;
        } else {
            SLive.replaceCellEmpty(SLive.blankCellVector[i], stream.channel.name, stream.preview.template,
                stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
            SLive.blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    SLive.itemsCountOffset += cursor;
    if (SLive.ReplacedataEnded) {
        SLive.blankCellCount = 0;
        SLive.blankCellVector = [];
    } else SLive.blankCellVector = tempVector;

    SLive.loadDataSuccessFinish();
};

SLive.replaceCellEmpty = function(id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = SLive.Cell + row_id + '_' + coloumn_id;

    SLive.CellMatrix(channel_name, preview_thumbnail, row_id, coloumn_id);

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', channel_name);
    document.getElementById(cell).innerHTML =
        SLive.CellHtml(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality);
};

SLive.addFocus = function() {
    if (((SLive.cursorY + Main.ItemsReloadLimitVideo) > (SLive.itemsCount / Main.ColoumnsCountVideo)) &&
        !SLive.dataEnded && !SLive.loadingMore) {
        SLive.loadingMore = true;
        SLive.loadDataPrepare();
        SLive.loadDataRequest();
    }

    Main.addFocusVideo(SLive.cursorY, SLive.cursorX, SLive.Thumbnail, SLive.ThumbnailDiv, SLive.DispNameDiv, SLive.StreamTitleDiv,
        SLive.StreamGameDiv, SLive.ViwersDiv, SLive.QualityDiv, Main.SLive, Main.ColoumnsCountVideo, SLive.itemsCount);
};

SLive.removeFocus = function() {
    Main.removeFocusVideo(SLive.cursorY, SLive.cursorX, SLive.Thumbnail, SLive.ThumbnailDiv, SLive.DispNameDiv, SLive.StreamTitleDiv,
        SLive.StreamGameDiv, SLive.ViwersDiv, SLive.QualityDiv);
};

SLive.keyClickDelay = function() {
    SLive.LastClickFinish = true;
};

SLive.handleKeyDown = function(event) {
    if (SLive.loadingData && !SLive.loadingMore) {
        event.preventDefault();
        return;
    } else if (!SLive.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        SLive.LastClickFinish = false;
        window.setTimeout(SLive.keyClickDelay, SLive.keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                if (Main.Go === Main.BeforeSearch) Main.Go = Main.Live;
                else Main.Go = Main.BeforeSearch;
                SLive.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((SLive.cursorY), (SLive.cursorX - 1), SLive.Thumbnail)) {
                SLive.removeFocus();
                SLive.cursorX--;
                SLive.addFocus();
            } else {
                for (i = (Main.ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main.ThumbNull((SLive.cursorY - 1), i, SLive.Thumbnail)) {
                        SLive.removeFocus();
                        SLive.cursorY--;
                        SLive.cursorX = i;
                        SLive.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.ThumbNull((SLive.cursorY), (SLive.cursorX + 1), SLive.Thumbnail)) {
                SLive.removeFocus();
                SLive.cursorX++;
                SLive.addFocus();
            } else if (Main.ThumbNull((SLive.cursorY + 1), 0, SLive.Thumbnail)) {
                SLive.removeFocus();
                SLive.cursorY++;
                SLive.cursorX = 0;
                SLive.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Main.ColoumnsCountVideo; i++) {
                if (Main.ThumbNull((SLive.cursorY - 1), (SLive.cursorX - i), SLive.Thumbnail)) {
                    SLive.removeFocus();
                    SLive.cursorY--;
                    SLive.cursorX = SLive.cursorX - i;
                    SLive.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Main.ColoumnsCountVideo; i++) {
                if (Main.ThumbNull((SLive.cursorY + 1), (SLive.cursorX - i), SLive.Thumbnail)) {
                    SLive.removeFocus();
                    SLive.cursorY++;
                    SLive.cursorX = SLive.cursorX - i;
                    SLive.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!SLive.loadingMore) SLive.StartLoad();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Play.selectedChannel = $('#' + SLive.Cell + SLive.cursorY + '_' + SLive.cursorX).attr('data-channelname');
            Play.selectedChannelDisplayname = document.getElementById(SLive.DispNameDiv + SLive.cursorY + '_' + SLive.cursorX).textContent;
            document.body.removeEventListener("keydown", SLive.handleKeyDown);
            Main.openStream();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            SLive.exit();
            Main.GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.SLive;
            Main.Go = Main.Search;
            SLive.exit();
            Main.SwitchScreen();
            break;
        default:
            break;
    }
};
