/*jshint multistr: true */
//Variable initialization
function SLive() {}
SLive.Thumbnail = 'thumbnail_slive_';
SLive.EmptyCell = 'slive_empty_';
SLive.cursorY = 0;
SLive.cursorX = 0;
SLive.dataEnded = false;
SLive.itemsCount = 0;
SLive.imgMatrix = [];
SLive.imgMatrixId = [];
SLive.imgMatrixCount = 0;
SLive.nameMatrix = [];
SLive.nameMatrixCount = 0;
SLive.loadingData = false;
SLive.loadingDataTry = 0;
SLive.loadingDataTryMax = 10;
SLive.loadingDataTimeout = 3500;
SLive.isDialogOn = false;
SLive.ItemsLimit = 99;
SLive.ColoumnsCount = 3;
SLive.ItemsReloadLimit = Math.floor((SLive.ItemsLimit / SLive.ColoumnsCount) / 2);
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
SLive.status = false;

//Variable initialization end

SLive.init = function() {
    Main.Go = Main.SLive;
    Main.cleanTopLabel();
    $('.lable_user').html(STR_SEARCH);
    $('.label_agame_name').html(STR_LIVE_STREAMS + ' ' + '\'' + Search.data + '\'');
    document.body.addEventListener("keydown", SLive.handleKeyDown, false);
    if (SLive.status) Main.ScrollHelper.scrollVerticalToElementById(SLive.Thumbnail, SLive.cursorY, SLive.cursorX, Main.SLive, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
    else SLive.StartLoad();
};

SLive.exit = function() {
    Main.RestoreTopLabel();
    document.body.removeEventListener("keydown", SLive.handleKeyDown);
    SLive.status = false;
};

SLive.StartLoad = function() {
    Main.HideWarningDialog();
    SLive.status = false;
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_search_live').empty();
    SLive.loadingMore = false;
    SLive.blankCellCount = 0;
    SLive.itemsCountOffset = 0;
    SLive.ReplacedataEnded = false;
    SLive.MaxOffset = 0;
    SLive.nameMatrix = [];
    SLive.nameMatrixCount = 0;
    SLive.itemsCount = 0;
    SLive.cursorX = 0;
    SLive.cursorY = 0;
    SLive.dataEnded = false;
    SLive.loadData();
};

SLive.loadData = function() {
    SLive.imgMatrix = [];
    SLive.imgMatrixId = [];
    SLive.imgMatrixCount = 0;
    SLive.loadingData = true;
    SLive.loadingDataTry = 0;
    SLive.loadingDataTimeout = 3500;
    SLive.loadDataRequest();
};

SLive.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = SLive.itemsCount + SLive.itemsCountOffset;
        if (offset !== 0 && offset >= (SLive.MaxOffset - SLive.ItemsLimit)) {
            offset = SLive.MaxOffset - SLive.ItemsLimit;
            SLive.dataEnded = true;
            SLive.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/streams?query=' + encodeURIComponent(Search.data) +
            '&limit=' + SLive.ItemsLimit + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
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

    if (response_items < SLive.ItemsLimit) SLive.dataEnded = true;

    var offset_itemsCount = SLive.itemsCount;
    SLive.itemsCount += response_items;

    SLive.emptyContent = SLive.itemsCount === 0;

    var response_rows = response_items / SLive.ColoumnsCount;
    if (response_items % SLive.ColoumnsCount > 0) response_rows++;

    var coloumn_id, row_id, row, cell, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / SLive.ColoumnsCount + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < SLive.ColoumnsCount && cursor < response_items; coloumn_id++, cursor++) {
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

        for (coloumn_id; coloumn_id < SLive.ColoumnsCount; coloumn_id++) {
            row.append(Main.createCellEmpty(row_id, coloumn_id, SLive.EmptyCell));
        }
        $('#stream_table_search_live').append(row);
    }

    SLive.loadDataSuccessFinish();
};

SLive.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="' + SLive.EmptyCell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
};

SLive.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main.VideoSize);

    SLive.imgMatrix[SLive.imgMatrixCount] = preview_thumbnail;
    SLive.imgMatrixId[SLive.imgMatrixCount] = SLive.Thumbnail + row_id + '_' + coloumn_id;
    SLive.imgMatrixCount++;

    SLive.nameMatrix[SLive.nameMatrixCount] = channel_name;
    SLive.nameMatrixCount++;

    return $('<td id="' + SLive.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="' + SLive.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_VIDEO + '"/>' +
        '<div id="' + SLive.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + SLive.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div>' +
        '<div id="' + SLive.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + SLive.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div>' +
        '<div id="' + SLive.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
        '</div>' +
        '<div id="' + SLive.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div></div>');
};

SLive.CellExists = function(display_name) {
    for (var i = 0; i <= SLive.nameMatrixCount; i++) {
        if (display_name == SLive.nameMatrix[i]) {
            SLive.blankCellCount++;
            return true;
        }
    }
    return false;
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
SLive.loadDataSuccessFinish = function() {
    $('#stream_table_search_live').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!SLive.status) {
                Main.HideLoadDialog();
                SLive.addFocus();
                if (SLive.emptyContent) Main.showWarningDialog(STR_SEARCH_RESULT_EMPTY);
                else SLive.status = true;
            }

            Main.LoadImages(SLive.imgMatrix, SLive.imgMatrixId, IMG_404_VIDEO);

            if (SLive.blankCellCount > 0 && !SLive.dataEnded) {
                SLive.loadingMore = true;
                SLive.loadDataReplace();
                return;
            } else SLive.blankCellCount = 0;

            SLive.loadingData = false;
            SLive.loadingMore = false;
        });
};

SLive.loadDataReplace = function() {
    SLive.imgMatrix = [];
    SLive.imgMatrixId = [];
    SLive.imgMatrixCount = 0;
    SLive.loadingData = true;
    SLive.loadingDataTry = 0;
    SLive.loadingDataTimeout = 3500;
    SLive.loadDataRequestReplace();
};

SLive.loadDataRequestReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = SLive.itemsCount + SLive.itemsCountOffset;
        if (offset !== 0 && offset >= (SLive.MaxOffset - SLive.ItemsLimit)) {
            offset = SLive.MaxOffset - SLive.ItemsLimit;
            SLive.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/streams?query=' + encodeURIComponent(Search.data) +
            '&limit=' + SLive.ItemsLimit + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
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
        SLive.loadDataRequestReplace();
    }
};

SLive.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    SLive.MaxOffset = parseInt(response._total);

    if (response_items < SLive.ItemsLimit) SLive.ReplacedataEnded = true;

    var row_id = SLive.itemsCount / SLive.ColoumnsCount;

    var coloumn_id, stream, mReplace = false,
        cursor = 0;

    for (cursor; cursor < response_items; cursor++) {
        stream = response.streams[cursor];
        if (SLive.CellExists(stream.channel.name)) SLive.blankCellCount--;
        else {
            mReplace = SLive.replaceCellEmpty(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
            if (mReplace) SLive.blankCellCount--;
            if (SLive.blankCellCount === 0) break;
        }
    }
    SLive.itemsCountOffset += cursor;
    if (SLive.ReplacedataEnded) SLive.blankCellCount = 0;
    SLive.loadDataSuccessFinish();
};

SLive.replaceCellEmpty = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    var my = 0,
        mx = 0;
    if (row_id < ((SLive.ItemsLimit / SLive.ColoumnsCount) - 1)) return false;
    for (my = row_id - (1 + Math.ceil(SLive.blankCellCount / SLive.ColoumnsCount)); my < row_id; my++) {
        for (mx = 0; mx < SLive.ColoumnsCount; mx++) {
            if (!Main.ThumbNull(my, mx, SLive.Thumbnail) && (Main.ThumbNull(my, mx, SLive.EmptyCell))) {
                row_id = my;
                coloumn_id = mx;
                preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main.VideoSize);
                SLive.nameMatrix[SLive.nameMatrixCount] = channel_name;
                SLive.nameMatrixCount++;
                document.getElementById(SLive.EmptyCell + row_id + '_' + coloumn_id).setAttribute('id', SLive.Cell + row_id + '_' + coloumn_id);
                document.getElementById(SLive.Cell + row_id + '_' + coloumn_id).setAttribute('data-channelname', channel_name);
                document.getElementById(SLive.Cell + row_id + '_' + coloumn_id).innerHTML =
                    '<img id="' + SLive.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + preview_thumbnail + '"/>' +
                    '<div id="' + SLive.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
                    '<div id="' + SLive.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div>' +
                    '<div id="' + SLive.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div>' +
                    '<div id="' + SLive.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div>' +
                    '<div id="' + SLive.ViwersDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
                    '</div>' +
                    '<div id="' + SLive.QualityDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div></div>';
                return true;
            }
        }
    }

    return false;
};

SLive.addFocus = function() {
    if (((SLive.cursorY + SLive.ItemsReloadLimit) > (SLive.itemsCount / SLive.ColoumnsCount)) &&
        !SLive.dataEnded && !SLive.loadingMore) {
        SLive.loadingMore = true;
        SLive.loadData();
    }

    $('#' + SLive.Thumbnail + SLive.cursorY + '_' + SLive.cursorX).addClass('stream_thumbnail_focused');
    $('#' + SLive.ThumbnailDiv + SLive.cursorY + '_' + SLive.cursorX).addClass('stream_text_focused');
    $('#' + SLive.DispNameDiv + SLive.cursorY + '_' + SLive.cursorX).addClass('stream_channel_focused');
    $('#' + SLive.StreamTitleDiv + SLive.cursorY + '_' + SLive.cursorX).addClass('stream_info_focused');
    $('#' + SLive.StreamGameDiv + SLive.cursorY + '_' + SLive.cursorX).addClass('stream_info_focused');
    $('#' + SLive.ViwersDiv + SLive.cursorY + '_' + SLive.cursorX).addClass('stream_info_focused');
    $('#' + SLive.QualityDiv + SLive.cursorY + '_' + SLive.cursorX).addClass('stream_info_focused');
    window.setTimeout(function() {
        Main.ScrollHelper.scrollVerticalToElementById(SLive.Thumbnail, SLive.cursorY, SLive.cursorX, Main.SLive, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
    }, 10);
};

SLive.removeFocus = function() {
    $('#' + SLive.Thumbnail + SLive.cursorY + '_' + SLive.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + SLive.ThumbnailDiv + SLive.cursorY + '_' + SLive.cursorX).removeClass('stream_text_focused');
    $('#' + SLive.DispNameDiv + SLive.cursorY + '_' + SLive.cursorX).removeClass('stream_channel_focused');
    $('#' + SLive.StreamTitleDiv + SLive.cursorY + '_' + SLive.cursorX).removeClass('stream_info_focused');
    $('#' + SLive.StreamGameDiv + SLive.cursorY + '_' + SLive.cursorX).removeClass('stream_info_focused');
    $('#' + SLive.ViwersDiv + SLive.cursorY + '_' + SLive.cursorX).removeClass('stream_info_focused');
    $('#' + SLive.QualityDiv + SLive.cursorY + '_' + SLive.cursorX).removeClass('stream_info_focused');
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

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                if (Main.Go === Main.Before) Main.Go = Main.Live;
                else Main.Go = Main.Before;
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
                for (i = (SLive.ColoumnsCount - 1); i > -1; i--) {
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
            for (i = 0; i < SLive.ColoumnsCount; i++) {
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
            for (i = 0; i < SLive.ColoumnsCount; i++) {
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
            Main.Go = Main.Live;
            SLive.exit();
            Main.SwitchScreen();
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
