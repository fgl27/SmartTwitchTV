/*jshint multistr: true */
//Variable initialization
function Live() {}
Live.Status = false;
Live.Img = 'img_live';
Live.Thumbnail = 'thumbnail_live';
Live.ThumbnailDiv = 'live_thumbnail_div_';
Live.DispNameDiv = 'live_display_name_';
Live.StreamTitleDiv = 'live_stream_title_';
Live.StreamGameDiv = 'live_stream_game_';
Live.ViwersDiv = 'live_viwers_';
Live.QualityDiv = 'live_quality_';
Live.Cell = 'live_cell_';
Live.EmptyCell = 'liveempty_';
Live.cursorY = 0;
Live.cursorX = 0;
Live.ExitCursor = 0;
Live.dataEnded = false;
Live.itemsCount = 0;
Live.nameMatrix = [];
Live.loadingData = false;
Live.loadingDataTry = 0;
Live.loadingDataTryMax = 10;
Live.loadingDataTimeout = 3500;
Live.isDialogOn = false;
Live.blankCellCount = 0;
Live.blankCellVector = [];
Live.itemsCountOffset = 0;
Live.LastClickFinish = true;
Live.keyClickDelayTime = 25;
Live.ReplacedataEnded = false;
Live.MaxOffset = 0;
Live.checkVersion = false;
Live.itemsCountCheck = false;

//Variable initialization end

Live.init = function() {
    Main.Go = Main.Live;
    document.body.addEventListener("keydown", Live.handleKeyDown, false);
    $('#top_bar_live').removeClass('icon_center_label');
    $('#top_bar_live').addClass('icon_center_focus');
    Main.YRst(Live.cursorY);
    if (Live.Status) {
        Main.ScrollHelper.scrollVerticalToElementById(Live.Thumbnail, Live.cursorY, Live.cursorX, Main.Live, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
        Main.CounterDialog(Live.cursorX, Live.cursorY, Main.ColoumnsCountVideo, Live.itemsCount);
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
    $('#' + Main.TempTable).empty();
    Live.loadingMore = false;
    Live.blankCellCount = 0;
    Live.blankCellVector = [];
    Live.itemsCountOffset = 0;
    Live.ReplacedataEnded = false;
    Live.itemsCountCheck = false;
    Live.MaxOffset = 0;
    Live.nameMatrix = [];
    Live.itemsCount = 0;
    Live.cursorX = 0;
    Live.cursorY = 0;
    Live.dataEnded = false;
    Main.CounterDialogRst();
    Live.loadDataPrepare();
    Live.loadDataRequest();
};

Live.loadDataPrepare = function() {
    Live.loadingData = true;
    Live.loadingDataTry = 0;
    Live.loadingDataTimeout = 3500;
};

Live.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Live.itemsCount + Live.itemsCountOffset;
        if (offset !== 0 && offset > (Live.MaxOffset - 1)) {
            offset = Live.MaxOffset - Main.ItemsLimitVideo;
            Live.dataEnded = true;
            Live.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?limit=' + Main.ItemsLimitVideo + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
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
        if (!Live.loadingMore) {
            Live.loadingData = false;
            Main.HideLoadDialog();
            Main.showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            Live.loadingMore = false;
            Live.dataEnded = true;
            Live.ReplacedataEnded = true;
            Live.loadDataSuccessFinish();
        }
    }
};

Live.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    Live.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitVideo) Live.dataEnded = true;

    var offset_itemsCount = Live.itemsCount;
    Live.itemsCount += response_items;

    var response_rows = response_items / Main.ColoumnsCountVideo;
    if (response_items % Main.ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, cell, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountVideo + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            if (Live.CellExists(stream.channel.name)) {
                coloumn_id--;
            } else {
                cell = Live.createCell(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                    stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                    stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                    Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
                row.append(cell);
            }
        }

        for (coloumn_id; coloumn_id < Main.ColoumnsCountVideo; coloumn_id++) {
            if (Live.dataEnded && !Live.itemsCountCheck) {
                Live.itemsCountCheck = true;
                Live.itemsCount = (row_id * Main.ColoumnsCountVideo) + coloumn_id;
            }
            row.append(Main.createCellEmpty(row_id, coloumn_id, Live.EmptyCell));
            Live.blankCellVector.push(Live.EmptyCell + row_id + '_' + coloumn_id);
        }
        $('#' + Main.TempTable).append(row);
    }

    Live.loadDataSuccessFinish();
};

Live.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    return $('<td id="' + Live.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        Live.CellHtml(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality, preview_thumbnail, channel_name));
};

Live.CellHtml = function(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality, preview_thumbnail, channel_name) {

    Live.nameMatrix.push(channel_name);

    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main.VideoSize);
    if (row_id < 3) Main.PreLoadAImage(preview_thumbnail); //try to pre cache first 3 rows

    return '<div id="' + Live.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_video" ><img id="' + Live.Img + row_id + '_' +
        coloumn_id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + Live.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + Live.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div>' +
        '<div id="' + Live.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + Live.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div>' +
        '<div id="' + Live.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info" style="width: 64%; display: inline-block;">' + viwers + '</div>' +
        '<div id="' + Live.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; float: right; display: inline-block;">' + quality + '</div></div>';
};

Live.CellExists = function(display_name) {
    if (Live.nameMatrix.indexOf(display_name) > -1) {
        Live.blankCellCount++;
        return true;
    }
    return false;
};

Live.loadDataSuccessFinish = function() {
    if (!Live.Status) {
        Live.Status = true;

        Main.ReplaceTable('stream_table_live');
        $(document).ready(function() {
            Main.HideLoadDialog();
            Live.addFocus();
            $('#toolbar').show();
            Main.LazyImgStart(Live.Img, 9, IMG_404_VIDEO, Main.ColoumnsCountVideo);

            Live.loadingData = false;
        });
        if (!Live.checkVersion) {
            Live.checkVersion = true;
            if (Main.checkVersion()) Main.showUpdateDialog();
        }
    } else {
        Main.appendTable('stream_table_live');
        $(document).ready(function() {
            if (Live.blankCellCount > 0 && !Live.dataEnded) {
                Live.loadingMore = true;
                Live.loadDataPrepare();
                Live.loadDataReplace();
                return;
            } else {
                Live.blankCellCount = 0;
                Live.blankCellVector = [];
            }

            Live.loadingData = false;
            Live.loadingMore = false;
        });
    }
};

Live.loadDataReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main.SetItemsLimitReload(Live.blankCellCount);

        var offset = Live.itemsCount + Live.itemsCountOffset;
        if (offset !== 0 && offset > (Live.MaxOffset - 1)) {
            offset = Live.MaxOffset - Main.ItemsLimitReload;
            Live.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?limit=' + Main.ItemsLimitReload + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
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
        Live.loadDataReplace();
    } else {
        Live.ReplacedataEnded = true;
        Live.blankCellCount = 0;
        Live.blankCellVector = [];
        Live.loadDataSuccessFinish();
    }
};

Live.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    var stream, index, cursor = 0;
    var tempVector = Live.blankCellVector.slice();

    Live.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitVideo) Live.ReplacedataEnded = true;

    for (var i = 0; i < Live.blankCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        if (Live.CellExists(stream.channel.name)) {
            Live.blankCellCount--;
            i--;
        } else {
            Live.replaceCellEmpty(Live.blankCellVector[i], stream.channel.name, stream.preview.template,
                stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
            Live.blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    Live.itemsCountOffset += cursor;
    if (Live.ReplacedataEnded) {
        Live.blankCellCount = 0;
        Live.blankCellVector = [];
    } else Live.blankCellVector = tempVector;

    Live.loadDataSuccessFinish();
};

Live.replaceCellEmpty = function(id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = Live.Cell + row_id + '_' + coloumn_id;

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', channel_name);
    document.getElementById(cell).innerHTML =
        Live.CellHtml(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality, preview_thumbnail, channel_name);
};

Live.addFocus = function() {
    Main.addFocusVideo(Live.cursorY, Live.cursorX, Live.Thumbnail, Live.ThumbnailDiv, Live.DispNameDiv, Live.StreamTitleDiv,
        Live.StreamGameDiv, Live.ViwersDiv, Live.QualityDiv, Main.Live, Main.ColoumnsCountVideo, Live.itemsCount);

    if (Live.cursorY > 3) Main.LazyImg(Live.Img, Live.cursorY, IMG_404_VIDEO, Main.ColoumnsCountVideo, 4);

    if (((Live.cursorY + Main.ItemsReloadLimitVideo) > (Live.itemsCount / Main.ColoumnsCountVideo)) &&
        !Live.dataEnded && !Live.loadingMore) {
        Live.loadingMore = true;
        Live.loadDataPrepare();
        Live.loadDataRequest();
    }
};

Live.removeFocus = function() {
    Main.removeFocusVideo(Live.cursorY, Live.cursorX, Live.Thumbnail, Live.ThumbnailDiv, Live.DispNameDiv, Live.StreamTitleDiv,
        Live.StreamGameDiv, Live.ViwersDiv, Live.QualityDiv);
};

Live.ExitCursorSet = function() {
    if (Live.ExitCursor === 0) {
        $('#exit_app_cancel').addClass('button_search_focused');
        $('#exit_app_minimize').removeClass('button_search_focused');
        $('#exit_app_close').removeClass('button_search_focused');
    } else if (Live.ExitCursor == 1) {
        $('#exit_app_cancel').removeClass('button_search_focused');
        $('#exit_app_minimize').addClass('button_search_focused');
        $('#exit_app_close').removeClass('button_search_focused');
    } else {
        $('#exit_app_cancel').removeClass('button_search_focused');
        $('#exit_app_minimize').removeClass('button_search_focused');
        $('#exit_app_close').addClass('button_search_focused');
    }
};

Live.keyClickDelay = function() {
    Live.LastClickFinish = true;
};

Live.handleKeyDown = function(event) {
    if ((Live.loadingData && !Live.loadingMore) || !Live.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Live.LastClickFinish = false;
        window.setTimeout(Live.keyClickDelay, Live.keyClickDelayTime);
    }

    var i;

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
                Live.ExitCursor--;
                if (Live.ExitCursor < 0) Live.ExitCursor = 2;
                Live.ExitCursorSet();
                Main.clearExitDialog();
                Main.setExitDialog();
            } else if (Main.ThumbNull((Live.cursorY), (Live.cursorX - 1), Live.Thumbnail)) {
                Live.removeFocus();
                Live.cursorX--;
                Live.addFocus();
            } else {
                for (i = (Main.ColoumnsCountVideo - 1); i > -1; i--) {
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
                Live.ExitCursor++;
                if (Live.ExitCursor > 2) Live.ExitCursor = 0;
                Live.ExitCursorSet();
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
            if (!Main.isExitDialogShown()) {
                for (i = 0; i < Main.ColoumnsCountVideo; i++) {
                    if (Main.ThumbNull((Live.cursorY - 1), (Live.cursorX - i), Live.Thumbnail)) {
                        Live.removeFocus();
                        Live.cursorY--;
                        Live.cursorX = Live.cursorX - i;
                        Live.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            if (!Main.isExitDialogShown()) {
                for (i = 0; i < Main.ColoumnsCountVideo; i++) {
                    if (Main.ThumbNull((Live.cursorY + 1), (Live.cursorX - i), Live.Thumbnail)) {
                        Live.removeFocus();
                        Live.cursorY++;
                        Live.cursorX = Live.cursorX - i;
                        Live.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!Live.loadingMore) Live.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            if (!Live.loadingMore) {
                Main.Before = Main.Live;
                Main.Go = (AddUser.IsUserSet()) ? Main.Users : Main.AddUser;
                Live.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            if (!Live.loadingMore) {
                Main.Before = Main.Live;
                Main.Go = Main.Games;
                Live.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (Main.isExitDialogShown()) {
                // HideExitDialog set Live.ExitCursor to 0, is better to hide befor exit, use temp var
                var temp_ExitCursor = Live.ExitCursor;
                Main.HideExitDialog();
                try {
                    if (temp_ExitCursor == 1) tizen.application.getCurrentApplication().hide();
                    else if (temp_ExitCursor == 2) tizen.application.getCurrentApplication().exit();
                } catch (e) {}
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
