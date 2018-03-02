/*jshint multistr: true */
//Variable initialization
function Live() {}
Live.Status = false;
Live.Thumbnail = 'thumbnail_live';
Live.ThumbnailDiv = 'live_thumbnail_div_';
Live.DispNameDiv = 'live_display_name_';
Live.StreamTitleDiv = 'live_stream_title_';
Live.StreamGameDiv = 'live_stream_game_';
Live.ViwersDiv = 'live_viwers_';
Live.QualityDiv = 'live_quality_';
Live.Cell = 'live_cell_';
Live.EmptyCell = 'live_empty_';
Live.cursorY = 0;
Live.cursorX = 0;
Live.Exitcursor = 0;
Live.dataEnded = false;
Live.itemsCount = 0;
Live.imgMatrix = [];
Live.imgMatrixId = [];
Live.imgMatrixCount = 0;
Live.nameMatrix = [];
Live.nameMatrixCount = 0;
Live.loadingData = false;
Live.loadingDataTry = 0;
Live.loadingDataTryMax = 10;
Live.loadingDataTimeout = 3500;
Live.isDialogOn = false;
Live.ItemsLimit = 99;
Live.ColoumnsCount = 3;
Live.ItemsReloadLimit = 0;
Live.blankCellCount = 0;
Live.itemsCountOffset = 0;
Live.LastClickFinish = true;
Live.keyClickDelayTime = 25;
Live.ReplacedataEnded = false;
Live.MaxOffset = 0;
Live.checkVersion = false;

//Variable initialization end

Live.init = function() {
    Main.Go = Main.Live;
    document.body.addEventListener("keydown", Live.handleKeyDown, false);
    $('#top_bar_live').removeClass('icon_center_label');
    $('#top_bar_live').addClass('icon_center_focus');
    if (Live.Status) {
        Main.ScrollHelper.scrollVerticalToElementById(Live.Thumbnail, Live.cursorY, Live.cursorX, Main.Live, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
        Main.CounterDialog(Live.cursorX, Live.cursorY, Live.ColoumnsCount, Live.itemsCount);
    } else Live.StartLoad();
};

Live.exit = function() {
    document.body.removeEventListener("keydown", Live.handleKeyDown);
    $('#top_bar_live').removeClass('icon_center_focus');
    $('#top_bar_live').addClass('icon_center_label');
    Main.HideExitDialog();
};

Live.StartLoad = function() {
    Main.HideWarningDialog();
    Live.Status = false;
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_live').empty();
    Live.loadingMore = false;
    Live.blankCellCount = 0;
    Live.itemsCountOffset = 0;
    Live.ReplacedataEnded = false;
    Live.MaxOffset = 0;
    Live.nameMatrix = [];
    Live.nameMatrixCount = 0;
    Live.itemsCount = 0;
    Live.cursorX = 0;
    Live.cursorY = 0;
    Live.dataEnded = false;
    Live.loadDataPrepare();
    Live.loadDataRequest();
};

Live.loadDataPrepare = function() {
    Live.imgMatrix = [];
    Live.imgMatrixId = [];
    Live.imgMatrixCount = 0;
    Live.loadingData = true;
    Live.loadingDataTry = 0;
    Live.loadingDataTimeout = 3500;
};

Live.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Live.itemsCount + Live.itemsCountOffset;
        if (offset !== 0 && offset >= (Live.MaxOffset - Live.ItemsLimit)) {
            offset = Live.MaxOffset - Live.ItemsLimit;
            Live.dataEnded = true;
            Live.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?limit=' + Live.ItemsLimit + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = Live.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        Live.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    Live.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Live.loadDataError();
    }
};

Live.loadDataError = function() {
    Live.loadingDataTry++;
    if (Live.loadingDataTry < Live.loadingDataTryMax) {
        Live.loadingDataTimeout += (Live.loadingDataTry < 5) ? 250 : 3500;
        Live.loadDataRequest();
    } else {
        Live.loadingData = false;
        Live.loadingMore = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

Live.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    Live.MaxOffset = parseInt(response._total);

    if (response_items < Live.ItemsLimit) Live.dataEnded = true;

    var offset_itemsCount = Live.itemsCount;
    Live.itemsCount += response_items;

    var response_rows = response_items / Live.ColoumnsCount;
    if (response_items % Live.ColoumnsCount > 0) response_rows++;

    var coloumn_id, row_id, row, cell, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Live.ColoumnsCount + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Live.ColoumnsCount && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            if (Live.CellExists(stream.channel.name)) coloumn_id--;
            else {
                cell = Live.createCell(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                    stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                    stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                    Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
                row.append(cell);
            }
        }

        for (coloumn_id; coloumn_id < Live.ColoumnsCount; coloumn_id++) {
            row.append(Main.createCellEmpty(row_id, coloumn_id, Live.EmptyCell));
        }
        $('#stream_table_live').append(row);
    }

    Live.loadDataSuccessFinish();
};

Live.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    Live.CellMatrix(channel_name, preview_thumbnail, row_id, coloumn_id);
    return $('<td id="' + Live.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        Live.CellHtml(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality));
};

Live.CellMatrix = function(channel_name, preview_thumbnail, row_id, coloumn_id) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main.VideoSize);
    Live.imgMatrix[Live.imgMatrixCount] = preview_thumbnail;
    Live.imgMatrixId[Live.imgMatrixCount] = Live.Thumbnail + row_id + '_' + coloumn_id;
    Live.imgMatrixCount++;

    if (Live.imgMatrixCount < (Live.ColoumnsCount * 5)) Main.PreLoadAImage(preview_thumbnail); //try to pre cache first 4 rows

    Live.nameMatrix[Live.nameMatrixCount] = channel_name;
    Live.nameMatrixCount++;
};

Live.CellHtml = function(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality) {
    return '<img id="' + Live.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_VIDEO + '"/>' +
        '<div id="' + Live.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + Live.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div>' +
        '<div id="' + Live.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + Live.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div>' +
        '<div id="' + Live.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info" style="width: 64%; display: inline-block;">' + viwers + '</div>' +
        '<div id="' + Live.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div></div>';
};

Live.CellExists = function(display_name) {
    for (var i = 0; i <= Live.nameMatrixCount; i++) {
        if (display_name == Live.nameMatrix[i]) {
            Live.blankCellCount++;
            return true;
        }
    }
    return false;
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
Live.loadDataSuccessFinish = function() {
    $('#stream_table_live').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!Live.Status) {
                Main.HideLoadDialog();
                Live.Status = true;
                Live.addFocus();
            }

            Main.LoadImages(Live.imgMatrix, Live.imgMatrixId, IMG_404_VIDEO);

            if (Live.blankCellCount > 0 && !Live.dataEnded) {
                Live.loadingMore = true;
                Live.loadDataPrepare();
                Live.loadDataRequestReplace();
                return;
            } else Live.blankCellCount = 0;

            Live.loadingData = false;
            Live.loadingMore = false;

            if (!Live.checkVersion) {
                Live.checkVersion = true;
                if (Main.checkVersion()) Main.showUpdateDialog();
            }
            //Main.ScrollSize('stream_table_live', Live.itemsCount, Live.ColoumnsCount);
        });
};

Live.loadDataRequestReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Live.itemsCount + Live.itemsCountOffset;
        if (offset !== 0 && offset >= (Live.MaxOffset - Live.ItemsLimit)) {
            offset = Live.MaxOffset - Live.ItemsLimit;
            Live.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?limit=' + Live.ItemsLimit + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = Live.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        Live.loadDataSuccessReplace(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Live.loadDataErrorReplace();
    }
};

Live.loadDataErrorReplace = function() {
    Live.loadingDataTry++;
    if (Live.loadingDataTry < Live.loadingDataTryMax) {
        Live.loadingDataTimeout += (Live.loadingDataTry < 5) ? 250 : 3500;
        Live.loadDataRequestReplace();
    }
};

Live.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;

    Live.MaxOffset = parseInt(response._total);

    if (response_items < Live.ItemsLimit) Live.ReplacedataEnded = true;

    var row_id = Live.itemsCount / Live.ColoumnsCount;

    var coloumn_id, stream, mReplace = false,
        cursor = 0;

    for (cursor; cursor < response_items; cursor++) {
        stream = response.streams[cursor];
        if (Live.CellExists(stream.channel.name)) Games.blankCellCount--;
        else {
            mReplace = Live.replaceCellEmpty(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
            if (mReplace) Live.blankCellCount--;
            if (Live.blankCellCount === 0) break;
        }
    }
    Live.itemsCountOffset += cursor;
    if (Live.ReplacedataEnded) Live.blankCellCount = 0;
    Live.loadDataSuccessFinish();
};

Live.replaceCellEmpty = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    var my = 0,
        mx = 0;
    if (row_id < ((Live.ItemsLimit / Live.ColoumnsCount) - 1)) return false;
    for (my = row_id - (1 + Math.ceil(Live.blankCellCount / Live.ColoumnsCount)); my < row_id; my++) {
        for (mx = 0; mx < Live.ColoumnsCount; mx++) {
            if (!Main.ThumbNull(my, mx, Live.Thumbnail) && (Main.ThumbNull(my, mx, Live.EmptyCell))) {
                row_id = my;
                coloumn_id = mx;

                Live.CellMatrix(channel_name, preview_thumbnail, row_id, coloumn_id);

                document.getElementById(Live.EmptyCell + row_id + '_' + coloumn_id).setAttribute('id', Live.Cell + row_id + '_' + coloumn_id);
                document.getElementById(Live.Cell + row_id + '_' + coloumn_id).setAttribute('data-channelname', channel_name);
                document.getElementById(Live.Cell + row_id + '_' + coloumn_id).innerHTML =
                    Live.CellHtml(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality);
                return true;
            }
        }
    }

    return false;
};

Live.addFocus = function() {
    if (((Live.cursorY + Live.ItemsReloadLimit) > (Live.itemsCount / Live.ColoumnsCount)) &&
        !Live.dataEnded && !Live.loadingMore) {
        Live.loadingMore = true;
        Live.loadDataPrepare();
        Live.loadDataRequest();
    }

    Main.addFocusVideo(Live.cursorY, Live.cursorX, Live.Thumbnail, Live.ThumbnailDiv, Live.DispNameDiv, Live.StreamTitleDiv,
        Live.StreamGameDiv, Live.ViwersDiv, Live.QualityDiv);

    window.setTimeout(function() {
        Main.ScrollHelper.scrollVerticalToElementById(Live.Thumbnail, Live.cursorY, Live.cursorX, Main.Live, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
    }, 10);

    Main.CounterDialog(Live.cursorX, Live.cursorY, Live.ColoumnsCount, Live.itemsCount);
};

Live.removeFocus = function() {
    Main.removeFocusVideo(Live.cursorY, Live.cursorX, Live.Thumbnail, Live.ThumbnailDiv, Live.DispNameDiv, Live.StreamTitleDiv,
        Live.StreamGameDiv, Live.ViwersDiv, Live.QualityDiv);
};

Live.ExitCursorSet = function(value) {
    Live.Exitcursor = value;
    if (value) {
        $('#exit_app_cancel').removeClass('button_search_focused');
        $('#exit_app_exit').addClass('button_search_focused');
    } else {
        $('#exit_app_exit').removeClass('button_search_focused');
        $('#exit_app_cancel').addClass('button_search_focused');
    }
};

Live.keyClickDelay = function() {
    Live.LastClickFinish = true;
};

Live.handleKeyDown = function(event) {
    if (Live.loadingData && !Live.loadingMore) {
        event.preventDefault();
        return;
    } else if (!Live.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Live.LastClickFinish = false;
        window.setTimeout(Live.keyClickDelay, Live.keyClickDelayTime);
    }

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isUpdateDialogShown()) Main.HideUpdateDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else if (Main.isExitDialogShown()) Main.HideExitDialog();
            else Main.showExitDialog();
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.isExitDialogShown()) {
                Live.ExitCursorSet(0);
                Main.clearExitDialog();
                Main.setExitDialog();
            } else if (Main.ThumbNull((Live.cursorY), (Live.cursorX - 1), Live.Thumbnail)) {
                Live.removeFocus();
                Live.cursorX--;
                Live.addFocus();
            } else {
                for (i = (Live.ColoumnsCount - 1); i > -1; i--) {
                    if (Main.ThumbNull((Live.cursorY - 1), i, Live.Thumbnail)) {
                        Live.removeFocus();
                        Live.cursorY--;
                        Live.cursorX = i;
                        Live.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.isExitDialogShown()) {
                Live.ExitCursorSet(1);
                Main.clearExitDialog();
                Main.setExitDialog();
            } else if (Main.ThumbNull((Live.cursorY), (Live.cursorX + 1), Live.Thumbnail)) {
                Live.removeFocus();
                Live.cursorX++;
                Live.addFocus();
            } else if (Main.ThumbNull((Live.cursorY + 1), 0, Live.Thumbnail)) {
                Live.removeFocus();
                Live.cursorY++;
                Live.cursorX = 0;
                Live.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Live.ColoumnsCount; i++) {
                if (Main.ThumbNull((Live.cursorY - 1), (Live.cursorX - i), Live.Thumbnail)) {
                    Live.removeFocus();
                    Live.cursorY--;
                    Live.cursorX = Live.cursorX - i;
                    Live.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Live.ColoumnsCount; i++) {
                if (Main.ThumbNull((Live.cursorY + 1), (Live.cursorX - i), Live.Thumbnail)) {
                    Live.removeFocus();
                    Live.cursorY++;
                    Live.cursorX = Live.cursorX - i;
                    Live.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!Live.loadingMore) Live.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            Main.Before = Main.Live;
            Main.Go = (AddUser.IsUserSet()) ? Main.Users : Main.AddUser;
            Live.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Before = Main.Live;
            Main.Go = Main.Games;
            Live.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (Main.isExitDialogShown()) {
                if (Live.Exitcursor) {
                    try {
                        tizen.application.getCurrentApplication().hide();
                    } catch (e) {}
                    Main.HideExitDialog();
                } else Main.HideExitDialog();
            } else {
                Play.selectedChannel = $('#' + Live.Cell + Live.cursorY + '_' + Live.cursorX).attr('data-channelname');
                Play.selectedChannelDisplayname = document.getElementById('' + Live.DispNameDiv + Live.cursorY + '_' + Live.cursorX).textContent;
                document.body.removeEventListener("keydown", Live.handleKeyDown);
                Main.openStream();
            }
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.Live;
            Main.Go = Main.Search;
            Live.exit();
            Main.SwitchScreen();
            break;
        default:
            break;
    }
};
