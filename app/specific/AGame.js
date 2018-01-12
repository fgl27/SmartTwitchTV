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
AGame.loadingDataTry = 1;
AGame.loadingDataTryMax = 10;
AGame.loadingDataTimeout = 3500;
AGame.isDialogOn = false;
AGame.ItemsLimit = 99;
AGame.ColoumnsCount = 3;
AGame.ItemsReloadLimit = Math.floor((AGame.ItemsLimit / AGame.ColoumnsCount) / 2);
AGame.newImg = new Image();
AGame.blankCellCount = 0;
AGame.itemsCountOffset = 0;
AGame.LastClickFinish = true;
AGame.keyClickDelayTime = 25;
AGame.ReplacedataEnded = false;
AGame.MaxOffset = 0;

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
    document.body.addEventListener("keydown", AGame.handleKeyDown, false);
    $('#top_bar_game').removeClass('icon_center_label');
    $('#top_bar_game').addClass('icon_center_focus');
    $('.lable_game').html(STR_AGAME);
    $('.label_agame_name').html(Main.gameSelected);
    if ((Main.OldgameSelected === Main.gameSelected)) AGame.ScrollHelper.scrollVerticalToElementById(AGame.Thumbnail + AGame.cursorY + '_' + AGame.cursorX);
    else AGame.StartLoad();
};

AGame.exit = function() {
    $('.label_agame_name').html('');
    $('.lable_game').html(STR_GAMES);
    document.body.removeEventListener("keydown", AGame.handleKeyDown);
    $('#top_bar_game').removeClass('icon_center_focus');
    $('#top_bar_game').addClass('icon_center_label');
    Main.SwitchScreen();
};

AGame.StartLoad = function() {
    Main.HideWarningDialog();
    AGame.status = false;
    AGame.ScrollHelper.scrollVerticalToElementById('blank_focus');
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
    AGame.loadData();
};

AGame.loadData = function() {
    AGame.imgMatrix = [];
    AGame.imgMatrixId = [];
    AGame.imgMatrixCount = 0;
    AGame.loadingData = true;
    AGame.loadingDataTry = 0;
    AGame.loadingDataTimeout = 3500;
    AGame.loadDataRequest();
};

AGame.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = AGame.itemsCount + AGame.itemsCountOffset;
        if (offset !== 0 && offset >= (AGame.MaxOffset - AGame.ItemsLimit)) {
            offset = AGame.MaxOffset - AGame.ItemsLimit;
            AGame.dataEnded = true;
            AGame.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main.gameSelected) +
            '&limit=' + AGame.ItemsLimit + '&offset=' + offset, true);
        xmlHttp.timeout = AGame.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');
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

    if (response_items < AGame.ItemsLimit) AGame.dataEnded = true;

    var offset_itemsCount = AGame.itemsCount;
    AGame.itemsCount += response_items;

    var response_rows = response_items / AGame.ColoumnsCount;
    if (response_items % AGame.ColoumnsCount > 0) response_rows++;

    var coloumn_id, row_id, row, cell, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / AGame.ColoumnsCount + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < AGame.ColoumnsCount && cursor < response_items; coloumn_id++, cursor++) {
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

        for (coloumn_id; coloumn_id < AGame.ColoumnsCount; coloumn_id++) {
            row.append(AGame.createCellEmpty(row_id, coloumn_id));
        }
        $('#stream_table_a_game').append(row);
    }

    AGame.loadDataSuccessFinish();
};

AGame.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="' + AGame.EmptyCell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
};

AGame.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "640x360");

    AGame.imgMatrix[AGame.imgMatrixCount] = preview_thumbnail;
    AGame.imgMatrixId[AGame.imgMatrixCount] = AGame.Thumbnail + row_id + '_' + coloumn_id;
    AGame.imgMatrixCount++;

    if (AGame.imgMatrixCount <= (AGame.ColoumnsCount * 3)) AGame.newImg.src = preview_thumbnail; //try to pre cache first 4 rows

    AGame.nameMatrix[AGame.nameMatrixCount] = channel_name;
    AGame.nameMatrixCount++;

    return $('<td id="' + AGame.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="' + AGame.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="app/images/video.png"/> \
            <div id="' + AGame.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="' + AGame.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
            <div id="' + AGame.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div> \
            <div id="' + AGame.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div> \
            <div id="' + AGame.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
            '</div> \
            <div id="' + AGame.QualityDiv + row_id + '_' + coloumn_id +
            '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
            </div>');
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
                AGame.status = true;
                AGame.addFocus();
            }

            for (var i = 0; i < AGame.imgMatrix.length; i++) {
                var tumbImg = document.getElementById(AGame.imgMatrixId[i]);
                tumbImg.onerror = function() {
                    this.src = 'app/images/404_video.png'; //img fail to load use predefined
                };

                tumbImg.src = AGame.imgMatrix[i];
            }

            if (AGame.blankCellCount > 0 && !AGame.dataEnded) {
                AGame.loadingMore = true;
                AGame.loadDataReplace();
                return;
            } else AGame.blankCellCount = 0;

            AGame.loadingData = false;
            AGame.loadingMore = false;
        });
};

AGame.loadDataReplace = function() {
    AGame.imgMatrix = [];
    AGame.imgMatrixId = [];
    AGame.imgMatrixCount = 0;
    AGame.loadingData = true;
    AGame.loadingDataTry = 0;
    AGame.loadingDataTimeout = 3500;
    AGame.loadDataRequestReplace();
};

AGame.loadDataRequestReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = AGame.itemsCount + AGame.itemsCountOffset;
        if (offset !== 0 && offset >= (AGame.MaxOffset - AGame.ItemsLimit)) {
            offset = AGame.MaxOffset - AGame.ItemsLimit;
            AGame.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main.gameSelected) +
            '&limit=' + AGame.ItemsLimit + '&offset=' + offset, true);
        xmlHttp.timeout = AGame.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');
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
        AGame.loadDataRequestReplace();
    }
};

AGame.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    AGame.MaxOffset = parseInt(response._total);

    if (response_items < AGame.ItemsLimit) AGame.ReplacedataEnded = true;

    var row_id = AGame.itemsCount / AGame.ColoumnsCount;

    var coloumn_id, stream, mReplace = false, cursor = 0;

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
    if (row_id < ((AGame.ItemsLimit / AGame.ColoumnsCount) - 1)) return false;
    for (my = row_id - (1 + Math.ceil(AGame.blankCellCount / AGame.ColoumnsCount)); my < row_id; my++) {
        for (mx = 0; mx < AGame.ColoumnsCount; mx++) {
            if (!Main.ThumbNull(my, mx, AGame.Thumbnail) && (Main.ThumbNull(my, mx, AGame.EmptyCell))) {
                row_id = my;
                coloumn_id = mx;
                preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "640x360");
                AGame.nameMatrix[AGame.nameMatrixCount] = channel_name;
                AGame.nameMatrixCount++;
                document.getElementById(AGame.EmptyCell + row_id + '_' + coloumn_id).setAttribute('id', AGame.Cell + row_id + '_' + coloumn_id);
                document.getElementById(AGame.Cell + row_id + '_' + coloumn_id).setAttribute('data-channelname', channel_name);
                document.getElementById(AGame.Cell + row_id + '_' + coloumn_id).innerHTML =
                    '<img id="' + AGame.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + preview_thumbnail + '"/> \
                    <div id="' + AGame.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
                    <div id="' + AGame.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
                    <div id="' + AGame.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div> \
                    <div id="' + AGame.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div> \
                    <div id="' + AGame.ViwersDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
                    '</div> \
                    <div id="' + AGame.QualityDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
                    </div>';
                return true;
            }
        }
    }

    return false;
};

AGame.addFocus = function() {
    if (((AGame.cursorY + AGame.ItemsReloadLimit) > (AGame.itemsCount / AGame.ColoumnsCount)) &&
        !AGame.dataEnded && !AGame.loadingMore) {
        AGame.loadingMore = true;
        AGame.loadData();
    }

    $('#' + AGame.Thumbnail + AGame.cursorY + '_' + AGame.cursorX).addClass('stream_thumbnail_focused');
    $('#' + AGame.ThumbnailDiv + AGame.cursorY + '_' + AGame.cursorX).addClass('stream_text_focused');
    $('#' + AGame.DispNameDiv + AGame.cursorY + '_' + AGame.cursorX).addClass('stream_channel_focused');
    $('#' + AGame.StreamTitleDiv + AGame.cursorY + '_' + AGame.cursorX).addClass('stream_info_focused');
    $('#' + AGame.StreamGameDiv + AGame.cursorY + '_' + AGame.cursorX).addClass('stream_info_focused');
    $('#' + AGame.ViwersDiv + AGame.cursorY + '_' + AGame.cursorX).addClass('stream_info_focused');
    $('#' + AGame.QualityDiv + AGame.cursorY + '_' + AGame.cursorX).addClass('stream_info_focused');
    window.setTimeout(function() {
        AGame.ScrollHelper.scrollVerticalToElementById(AGame.Thumbnail + AGame.cursorY + '_' + AGame.cursorX);
    }, 10);
};

AGame.removeFocus = function() {
    $('#' + AGame.Thumbnail + AGame.cursorY + '_' + AGame.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + AGame.ThumbnailDiv + AGame.cursorY + '_' + AGame.cursorX).removeClass('stream_text_focused');
    $('#' + AGame.DispNameDiv + AGame.cursorY + '_' + AGame.cursorX).removeClass('stream_channel_focused');
    $('#' + AGame.StreamTitleDiv + AGame.cursorY + '_' + AGame.cursorX).removeClass('stream_info_focused');
    $('#' + AGame.StreamGameDiv + AGame.cursorY + '_' + AGame.cursorX).removeClass('stream_info_focused');
    $('#' + AGame.ViwersDiv + AGame.cursorY + '_' + AGame.cursorX).removeClass('stream_info_focused');
    $('#' + AGame.QualityDiv + AGame.cursorY + '_' + AGame.cursorX).removeClass('stream_info_focused');
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
            Main.OldgameSelected = Main.gameSelected;
            if (Main.Go === Main.Before) Main.Go = Main.Games;
            else Main.Go = Main.Before;
            AGame.exit();
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((AGame.cursorY), (AGame.cursorX - 1), AGame.Thumbnail)) {
                AGame.removeFocus();
                AGame.cursorX--;
                AGame.addFocus();
            } else {
                for (i = (AGame.ColoumnsCount - 1); i > -1; i--) {
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
            for (i = 0; i < AGame.ColoumnsCount; i++) {
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
            for (i = 0; i < AGame.ColoumnsCount; i++) {
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
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = (Main.UserName !== null) ? Main.Users : Main.AddUser;
            AGame.exit();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Main.selectedChannel = $('#' + AGame.Cell + AGame.cursorY + '_' + AGame.cursorX).attr('data-channelname');
            Main.selectedChannelDisplayname = document.getElementById(AGame.DispNameDiv + AGame.cursorY + '_' + AGame.cursorX).textContent;
            document.body.removeEventListener("keydown", AGame.handleKeyDown);
            Main.OldgameSelected = Main.gameSelected;
            Main.openStream();
            break;
        case TvKeyCode.KEY_RED:
            break;
        case TvKeyCode.KEY_GREEN:
            break;
        case TvKeyCode.KEY_YELLOW:
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.AGame;
            Main.Go = Main.Search;
            Main.OldgameSelected = Main.gameSelected;
            AGame.exit();
            break;
        case TvKeyCode.KEY_VOLUMEUP:
        case TvKeyCode.KEY_VOLUMEDOWN:
        case TvKeyCode.KEY_MUTE:
            break;
        default:
            break;
    }
};

AGame.ScrollHelper = {
    documentVerticalScrollPosition: function() {
        if (self.pageYOffset) return self.pageYOffset; // Firefox, Chrome, Opera, Safari.
        if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop; // Internet Explorer 6 (standards mode).
        if (document.body.scrollTop) return document.body.scrollTop; // Internet Explorer 6, 7 and 8.
        return 0; // None of the above.
    },

    viewportHeight: function() {
        return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight;
    },

    documentHeight: function() {
        return (document.height !== undefined) ? document.height : document.body.offsetHeight;
    },

    documentMaximumScrollPosition: function() {
        return this.documentHeight() - this.viewportHeight();
    },

    elementVerticalClientPositionById: function(id) {
        return document.getElementById(id).getBoundingClientRect().top;
    },

    scrollVerticalToElementById: function(id) {
        if (document.getElementById(id) === null) {
            return;
        }
        if (Main.Go === Main.AGame) {
            if (id.indexOf(AGame.Thumbnail + '0_') == -1) {
                $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight());
            } else {
                $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight() + 290); // check Games.ScrollHelper to understand the "290"
            }
        } else return;
    }
};
