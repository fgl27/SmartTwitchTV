/*jshint multistr: true */
//Variable initialization
function AGame() {}
AGame.Thumbnail = 'thumbnail_agame_';
AGame.EmptyCell = 'agame_empty_';
AGame.cursorY = 0;
AGame.cursorX = 0;
AGame.dataEnded = false;
AGame.itemsCount = 0;
AGame.imgMatrix = [];
AGame.imgMatrixId = [];
AGame.imgMatrixCount = 0;
AGame.nameMatrix = [];
AGame.nameMatrixCount = 0;
AGame.loadingData = false;
AGame.loadingDataTry = 0;
AGame.loadingDataTryMax = 10;
AGame.loadingDataTimeout = 3500;
AGame.isDialogOn = false;
AGame.blankCellCount = 0;
AGame.itemsCountOffset = 0;
AGame.LastClickFinish = true;
AGame.keyClickDelayTime = 25;
AGame.ReplacedataEnded = false;
AGame.MaxOffset = 0;
AGame.emptyContent = false;

AGame.ThumbnailDiv = 'agame_thumbnail_div_';
AGame.DispNameDiv = 'agame_display_name_';
AGame.StreamTitleDiv = 'agame_stream_title_';
AGame.StreamGameDiv = 'agame_stream_game_';
AGame.ViwersDiv = 'agame_viwers_';
AGame.QualityDiv = 'agame_quality_';
AGame.Cell = 'agame_cell_';
AGame.status = false;

//Variable initialization end


AGame.init = function() {
    Main.Go = Main.AGame;
    document.body.addEventListener("keydown", AGame.handleKeyDown, false);
    $('#top_bar_game').removeClass('icon_center_label');
    $('#top_bar_game').addClass('icon_center_focus');
    $('.lable_game').html(STR_AGAME);
    $('.label_agame_name').html(Main.gameSelected);
    if ((Main.OldgameSelected === Main.gameSelected)) {
        Main.ScrollHelper.scrollVerticalToElementById(AGame.Thumbnail, AGame.cursorY, AGame.cursorX, Main.AGame, Main.ScrollOffSetMinusVideo,
            Main.ScrollOffSetVideo, false);
        Main.CounterDialog(AGame.cursorX, AGame.cursorY, Main.ColoumnsCountVideo, AGame.itemsCount);
    } else AGame.StartLoad();
};

AGame.exit = function() {
    $('.label_agame_name').html('');
    $('.lable_game').html(STR_GAMES);
    document.body.removeEventListener("keydown", AGame.handleKeyDown);
    $('#top_bar_game').removeClass('icon_center_focus');
    $('#top_bar_game').addClass('icon_center_label');
};

AGame.StartLoad = function() {
    Main.HideWarningDialog();
    AGame.status = false;
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_a_game').empty();
    AGame.loadingMore = false;
    AGame.blankCellCount = 0;
    AGame.itemsCountOffset = 0;
    AGame.ReplacedataEnded = false;
    AGame.MaxOffset = 0;
    AGame.nameMatrix = [];
    AGame.nameMatrixCount = 0;
    AGame.itemsCount = 0;
    AGame.cursorX = 0;
    AGame.cursorY = 0;
    AGame.dataEnded = false;
    AGame.loadDataPrepare();
    AGame.loadDataRequest();
};

AGame.loadDataPrepare = function() {
    AGame.imgMatrix = [];
    AGame.imgMatrixId = [];
    AGame.imgMatrixCount = 0;
    AGame.loadingData = true;
    AGame.loadingDataTry = 0;
    AGame.loadingDataTimeout = 3500;
};

AGame.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = AGame.itemsCount + AGame.itemsCountOffset;
        if (offset !== 0 && offset >= (AGame.MaxOffset - Main.ItemsLimitVideo)) {
            offset = AGame.MaxOffset - Main.ItemsLimitVideo;
            AGame.dataEnded = true;
            AGame.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main.gameSelected) +
            '&limit=' + Main.ItemsLimitVideo + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = AGame.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        AGame.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    AGame.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AGame.loadDataError();
    }
};

AGame.loadDataError = function() {
    AGame.loadingDataTry++;
    if (AGame.loadingDataTry < AGame.loadingDataTryMax) {
        AGame.loadingDataTimeout += (AGame.loadingDataTry < 5) ? 250 : 3500;
        AGame.loadDataRequest();
    } else {
        AGame.loadingData = false;
        AGame.loadingMore = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

AGame.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    AGame.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitVideo) AGame.dataEnded = true;

    var offset_itemsCount = AGame.itemsCount;
    AGame.itemsCount += response_items;

    AGame.emptyContent = AGame.itemsCount === 0;

    var response_rows = response_items / Main.ColoumnsCountVideo;
    if (response_items % Main.ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, cell, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountVideo + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            if (AGame.CellExists(stream.channel.name)) coloumn_id--;
            else {
                cell = AGame.createCell(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                    stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                    stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                    Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
                row.append(cell);
            }
        }

        for (coloumn_id; coloumn_id < Main.ColoumnsCountVideo; coloumn_id++) {
            row.append(Main.createCellEmpty(row_id, coloumn_id, AGame.EmptyCell));
        }
        $('#stream_table_a_game').append(row);
    }

    AGame.loadDataSuccessFinish();
};

AGame.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main.VideoSize);

    AGame.imgMatrix[AGame.imgMatrixCount] = preview_thumbnail;
    AGame.imgMatrixId[AGame.imgMatrixCount] = AGame.Thumbnail + row_id + '_' + coloumn_id;
    AGame.imgMatrixCount++;

    if (AGame.imgMatrixCount < (Main.ColoumnsCountVideo * 5)) Main.PreLoadAImage(preview_thumbnail); //try to pre cache first 4 rows

    AGame.nameMatrix[AGame.nameMatrixCount] = channel_name;
    AGame.nameMatrixCount++;

    return $('<td id="' + AGame.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="' + AGame.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_VIDEO + '"/>' +
        '<div id="' + AGame.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + AGame.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div>' +
        '<div id="' + AGame.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + AGame.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div>' +
        '<div id="' + AGame.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
        '</div>' +
        '<div id="' + AGame.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div></div>');
};

AGame.CellExists = function(display_name) {
    for (var i = 0; i <= AGame.nameMatrixCount; i++) {
        if (display_name == AGame.nameMatrix[i]) {
            AGame.blankCellCount++;
            return true;
        }
    }
    return false;
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
AGame.loadDataSuccessFinish = function() {
    $('#stream_table_a_game').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!AGame.status) {
                Main.HideLoadDialog();
                AGame.addFocus();
                if (AGame.emptyContent) Main.showWarningDialog(STR_NO + STR_USER_CHANNEL);
                else AGame.status = true;
            }

            Main.LoadImages(AGame.imgMatrix, AGame.imgMatrixId, IMG_404_VIDEO);

            if (AGame.blankCellCount > 0 && !AGame.dataEnded) {
                AGame.loadingMore = true;
                AGame.loadDataPrepare();
                AGame.loadDataReplace();
                return;
            } else AGame.blankCellCount = 0;

            AGame.loadingData = false;
            AGame.loadingMore = false;
        });
};

AGame.loadDataReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = AGame.itemsCount + AGame.itemsCountOffset;
        if (offset !== 0 && offset >= (AGame.MaxOffset - Main.ItemsLimitVideo)) {
            offset = AGame.MaxOffset - Main.ItemsLimitVideo;
            AGame.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main.gameSelected) +
            '&limit=' + Main.ItemsLimitVideo + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = AGame.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        AGame.loadDataSuccessReplace(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AGame.loadDataErrorReplace();
    }
};

AGame.loadDataErrorReplace = function() {
    AGame.loadingDataTry++;
    if (AGame.loadingDataTry < AGame.loadingDataTryMax) {
        AGame.loadingDataTimeout += (AGame.loadingDataTry < 5) ? 250 : 3500;
        AGame.loadDataReplace();
    }
};

AGame.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    AGame.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitVideo) AGame.ReplacedataEnded = true;

    var row_id = AGame.itemsCount / Main.ColoumnsCountVideo;

    var coloumn_id, stream, mReplace = false,
        cursor = 0;

    for (cursor; cursor < response_items; cursor++) {
        stream = response.streams[cursor];
        if (AGame.CellExists(stream.channel.name)) AGame.blankCellCount--;
        else {
            mReplace = AGame.replaceCellEmpty(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
            if (mReplace) AGame.blankCellCount--;
            if (AGame.blankCellCount === 0) break;
        }
    }
    AGame.itemsCountOffset += cursor;
    if (AGame.ReplacedataEnded) AGame.blankCellCount = 0;
    AGame.loadDataSuccessFinish();
};

AGame.replaceCellEmpty = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    var my = 0,
        mx = 0;
    if (row_id < ((Main.ItemsLimitVideo / Main.ColoumnsCountVideo) - 1)) return false;
    for (my = row_id - (1 + Math.ceil(AGame.blankCellCount / Main.ColoumnsCountVideo)); my < row_id; my++) {
        for (mx = 0; mx < Main.ColoumnsCountVideo; mx++) {
            if (!Main.ThumbNull(my, mx, AGame.Thumbnail) && (Main.ThumbNull(my, mx, AGame.EmptyCell))) {
                row_id = my;
                coloumn_id = mx;
                preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main.VideoSize);

                AGame.imgMatrix[AGame.imgMatrixCount] = preview_thumbnail;
                AGame.imgMatrixId[AGame.imgMatrixCount] = AGame.Thumbnail + row_id + '_' + coloumn_id;
                AGame.imgMatrixCount++;

                AGame.nameMatrix[AGame.nameMatrixCount] = channel_name;
                AGame.nameMatrixCount++;
                document.getElementById(AGame.EmptyCell + row_id + '_' + coloumn_id).setAttribute('id', AGame.Cell + row_id + '_' + coloumn_id);
                document.getElementById(AGame.Cell + row_id + '_' + coloumn_id).setAttribute('data-channelname', channel_name);
                document.getElementById(AGame.Cell + row_id + '_' + coloumn_id).innerHTML =
                    '<img id="' + AGame.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_VIDEO + '"/>' +
                    '<div id="' + AGame.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
                    '<div id="' + AGame.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div>' +
                    '<div id="' + AGame.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div>' +
                    '<div id="' + AGame.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div>' +
                    '<div id="' + AGame.ViwersDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
                    '</div>' +
                    '<div id="' + AGame.QualityDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div></div>';
                return true;
            }
        }
    }

    return false;
};

AGame.addFocus = function() {
    if (((AGame.cursorY + Main.ItemsReloadLimitVideo) > (AGame.itemsCount / Main.ColoumnsCountVideo)) &&
        !AGame.dataEnded && !AGame.loadingMore) {
        AGame.loadingMore = true;
        AGame.loadDataPrepare();
        AGame.loadDataRequest();
    }

    Main.addFocusVideo(AGame.cursorY, AGame.cursorX, AGame.Thumbnail, AGame.ThumbnailDiv, AGame.DispNameDiv, AGame.StreamTitleDiv,
        AGame.StreamGameDiv, AGame.ViwersDiv, AGame.QualityDiv, Main.AGame, Main.ColoumnsCountVideo, AGame.itemsCount);
};

AGame.removeFocus = function() {
    Main.removeFocusVideo(AGame.cursorY, AGame.cursorX, AGame.Thumbnail, AGame.ThumbnailDiv, AGame.DispNameDiv, AGame.StreamTitleDiv,
        AGame.StreamGameDiv, AGame.ViwersDiv, AGame.QualityDiv);
};

AGame.keyClickDelay = function() {
    AGame.LastClickFinish = true;
};

AGame.handleKeyDown = function(event) {
    if (AGame.loadingData && !AGame.loadingMore) {
        event.preventDefault();
        return;
    } else if (!AGame.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        AGame.LastClickFinish = false;
        window.setTimeout(AGame.keyClickDelay, AGame.keyClickDelayTime);
    }

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                Main.OldgameSelected = Main.gameSelected;
                if (Main.Go === Main.Before) Main.Go = Main.Games;
                else Main.Go = Main.Before;
                AGame.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((AGame.cursorY), (AGame.cursorX - 1), AGame.Thumbnail)) {
                AGame.removeFocus();
                AGame.cursorX--;
                AGame.addFocus();
            } else {
                for (i = (Main.ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main.ThumbNull((AGame.cursorY - 1), i, AGame.Thumbnail)) {
                        AGame.removeFocus();
                        AGame.cursorY--;
                        AGame.cursorX = i;
                        AGame.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.ThumbNull((AGame.cursorY), (AGame.cursorX + 1), AGame.Thumbnail)) {
                AGame.removeFocus();
                AGame.cursorX++;
                AGame.addFocus();
            } else if (Main.ThumbNull((AGame.cursorY + 1), 0, AGame.Thumbnail)) {
                AGame.removeFocus();
                AGame.cursorY++;
                AGame.cursorX = 0;
                AGame.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Main.ColoumnsCountVideo; i++) {
                if (Main.ThumbNull((AGame.cursorY - 1), (AGame.cursorX - i), AGame.Thumbnail)) {
                    AGame.removeFocus();
                    AGame.cursorY--;
                    AGame.cursorX = AGame.cursorX - i;
                    AGame.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Main.ColoumnsCountVideo; i++) {
                if (Main.ThumbNull((AGame.cursorY + 1), (AGame.cursorX - i), AGame.Thumbnail)) {
                    AGame.removeFocus();
                    AGame.cursorY++;
                    AGame.cursorX = AGame.cursorX - i;
                    AGame.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!AGame.loadingMore) AGame.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            Main.Go = Main.Live;
            AGame.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = (Main.UserName !== null) ? Main.Users : Main.AddUser;
            AGame.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Play.selectedChannel = $('#' + AGame.Cell + AGame.cursorY + '_' + AGame.cursorX).attr('data-channelname');
            Play.selectedChannelDisplayname = document.getElementById(AGame.DispNameDiv + AGame.cursorY + '_' + AGame.cursorX).textContent;
            document.body.removeEventListener("keydown", AGame.handleKeyDown);
            Main.OldgameSelected = Main.gameSelected;
            Main.openStream();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Main.Go = Main.Live;
            AGame.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.AGame;
            Main.Go = Main.Search;
            Main.OldgameSelected = Main.gameSelected;
            AGame.exit();
            Main.SwitchScreen();
            break;
        default:
            break;
    }
};
