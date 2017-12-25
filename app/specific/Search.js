/*jshint multistr: true */
//Variable initialization
function Search() {}
Search.Thumbnail = 'thumbnail_Search_';
Search.EmptyCell = 'Search_empty_';
Search.cursorY = 0;
Search.cursorX = 0;
Search.dataEnded = false;
Search.itemsCount = 0;
Search.imgMatrix = [];
Search.imgMatrixId = [];
Search.imgMatrixCount = 0;
Search.nameMatrix = [];
Search.nameMatrixCount = 0;
Search.loadingData = false;
Search.loadingDataTry = 1;
Search.loadingDataTryMax = 10;
Search.loadingDataTimeout = 1500;
Search.isDialogOn = false;
Search.ItemsLimit = 99;
Search.ColoumnsCount = 3;
Search.ItemsReloadLimit = Math.floor((Search.ItemsLimit / Search.ColoumnsCount) / 2);
Search.newImg = new Image();
Search.blankCellCount = 0;
Search.itemsCountOffset = 0;
Search.LastClickFinish = true;
Search.keyClickDelayTime = 25;
Search.ReplacedataEnded = false;
Search.MaxOffset = 0;

Search.ThumbnailDiv = 'Search_thumbnail_div_';
Search.DispNameDiv = 'Search_display_name_';
Search.StreamTitleDiv = 'Search_stream_title_';
Search.StreamGameDiv = 'Search_stream_Search_';
Search.ViwersDiv = 'Search_viwers_';
Search.QualityDiv = 'Search_quality_';
Search.Cell = 'Search_cell_';
Search.Playing = false;
Search.status = false;

//Variable initialization end


Search.init = function() {
    $('.label_refresh').html('<i class="fa fa-arrow-circle-left" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_GOBACK);
    $('.label_search').html('');
    $('.label_switch').html('');
    $('.lable_live').html('');
    $('.lable_user').html(STR_SEARCHS);
    $('.lable_game').html('');
    document.getElementById("top_bar_spacing").style.paddingLeft = "40.5%";
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    document.body.addEventListener("keydown", Search.handleKeyDown, false);
    Search.ScrollHelper.scrollVerticalToElementById('search_input');
};

Search.exit = function() {
    $('.label_refresh').html('<i class="fa fa-refresh" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_REFRESH);
    $('.label_search').html('<i class="fa fa-search" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_SEARCH);
    $('.label_switch').html('<i class="fa fa-exchange" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_SWITCH);
    $('#top_bar_user').removeClass('icon_center_focus');
    $('#top_bar_user').addClass('icon_center_label');
    document.getElementById("top_bar_spacing").style.paddingLeft = "30%";
    $('.lable_live').html(STR_LIVE);
    $('.lable_user').html(STR_USER);
    $('.lable_game').html(STR_GAMES);
    document.body.removeEventListener("keydown", Search.handleKeyDown);
    Main.SwitchScreen();
};

Search.StartLoad = function() {
    Search.status = false;
    Search.ScrollHelper.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_a_game').empty();
    Search.loadingMore = false;
    Search.blankCellCount = 0;
    Search.itemsCountOffset = 0;
    Search.ReplacedataEnded = false;
    Search.MaxOffset = 0;
    Search.nameMatrix = [];
    Search.nameMatrixCount = 0;
    Search.itemsCount = 0;
    Search.cursorX = 0;
    Search.cursorY = 0;
    Search.dataEnded = false;
    Search.loadData();
};

Search.loadData = function() {
    Search.imgMatrix = [];
    Search.imgMatrixId = [];
    Search.imgMatrixCount = 0;
    Search.loadingData = true;
    Search.loadingDataTry = 0;
    Search.loadingDataTimeout = 1500;
    Search.loadDataRequest();
};

Search.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Search.itemsCount + Search.itemsCountOffset;
        if (offset !== 0 && offset >= (Search.MaxOffset - Search.ItemsLimit)) {
            offset = Search.MaxOffset - Search.ItemsLimit;
            Search.dataEnded = true;
            Search.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main.gameSelected) +
            '&limit=' + Search.ItemsLimit + '&offset=' + offset, true);
        xmlHttp.timeout = Search.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        Search.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    Search.loadDataError("HTTP Status " + xmlHttp.status + " Message: " + xmlHttp.statusText, xmlHttp.responseText);
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Search.loadDataError(e.message, null);
    }
};

Search.loadDataError = function(reason, responseText) {
    Search.loadingDataTry++;
    if (Search.loadingDataTry < Search.loadingDataTryMax) {
        Search.loadingDataTimeout += (Search.loadingDataTry < 5) ? 250 : 3500;
        Search.loadDataRequest();
    } else {
        Main.showWarningDialog("Unable to load Search " + " Reason: " + reason + '<br>Hit Refresh to retry');
    }
};

Search.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    Search.MaxOffset = parseInt(response._total);

    if (response_items < Search.ItemsLimit) Search.dataEnded = true;

    var offset_itemsCount = Search.itemsCount;
    Search.itemsCount += response_items;

    var response_rows = response_items / Search.ColoumnsCount;
    if (response_items % Search.ColoumnsCount > 0) response_rows++;

    var coloumn_id, row_id, row, cell, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Search.ColoumnsCount + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Search.ColoumnsCount && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            if (Search.CellExists(stream.channel.name)) coloumn_id--;
            else {
                cell = Search.createCell(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                    stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                    stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                    Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
                row.append(cell);
            }
        }

        for (coloumn_id; coloumn_id < Search.ColoumnsCount; coloumn_id++) {
            row.append(Search.createCellEmpty(row_id, coloumn_id));
        }
        $('#stream_table_a_game').append(row);
    }

    Search.loadDataSuccessFinish();
};

Search.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="' + Search.EmptyCell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
};

Search.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "640x360");

    Search.imgMatrix[Search.imgMatrixCount] = preview_thumbnail;
    Search.imgMatrixId[Search.imgMatrixCount] = Search.Thumbnail + row_id + '_' + coloumn_id;
    Search.imgMatrixCount++;

    if (Search.imgMatrixCount <= (Search.ColoumnsCount * 3)) Search.newImg.src = preview_thumbnail; //try to pre cache first 4 rows

    Search.nameMatrix[Search.nameMatrixCount] = channel_name;
    Search.nameMatrixCount++;

    return $('<td id="' + Search.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="' + Search.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="app/images/video.png"/> \
            <div id="' + Search.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="' + Search.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
            <div id="' + Search.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div> \
            <div id="' + Search.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div> \
            <div id="' + Search.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
        '</div> \
             <div id="' + Search.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
            </div>');
};

Search.CellExists = function(display_name) {
    for (var i = 0; i <= Search.nameMatrixCount; i++) {
        if (display_name == Search.nameMatrix[i]) {
            Search.blankCellCount++;
            return true;
        }
    }
    return false;
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
Search.loadDataSuccessFinish = function() {
    $('#stream_table_a_game').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!Search.status) {
                Main.HideLoadDialog();
                Search.status = true;
                Search.addFocus();
            }

            for (var i = 0; i < Search.imgMatrix.length; i++) {
                var tumbImg = document.getElementById(Search.imgMatrixId[i]);
                tumbImg.onerror = function() {
                    this.src = 'app/images/404_video.png'; //img fail to load use predefined
                };

                tumbImg.src = Search.imgMatrix[i];
            }

            if (Search.blankCellCount > 0 && !Search.dataEnded) {
                Search.loadingMore = true;
                Search.loadDataReplace();
                return;
            } else Search.blankCellCount = 0;

            Search.loadingData = false;
            Search.loadingMore = false;
        });
};

Search.loadDataReplace = function() {
    Search.imgMatrix = [];
    Search.imgMatrixId = [];
    Search.imgMatrixCount = 0;
    Search.loadingData = true;
    Search.loadingDataTry = 0;
    Search.loadingDataTimeout = 1500;
    Search.loadDataRequestReplace();
};

Search.loadDataRequestReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Search.itemsCount + Search.itemsCountOffset;
        if (offset !== 0 && offset >= (Search.MaxOffset - Search.ItemsLimit)) {
            offset = Search.MaxOffset - Search.ItemsLimit;
            Search.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main.gameSelected) +
            '&limit=' + Search.ItemsLimit + '&offset=' + offset, true);
        xmlHttp.timeout = Search.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        Search.loadDataSuccessReplace(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Search.loadDataErrorReplace(e.message, null);
    }
};

Search.loadDataErrorReplace = function(reason, responseText) {
    Search.loadingDataTry++;
    if (Search.loadingDataTry < Search.loadingDataTryMax) {
        Search.loadingDataTimeout += (Search.loadingDataTry < 5) ? 250 : 3500;
        Search.loadDataRequestReplace();
    }
};

Search.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    Search.MaxOffset = parseInt(response._total);

    if (response_items < Search.ItemsLimit) Search.ReplacedataEnded = true;

    var row_id = Search.itemsCount / Search.ColoumnsCount;

    var coloumn_id, stream, mReplace = false, cursor = 0;

    for (cursor; cursor < response_items; cursor++) {
        stream = response.streams[cursor];
        if (Search.CellExists(stream.channel.name)) Search.blankCellCount--;
        else {
            mReplace = Search.replaceCellEmpty(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
            if (mReplace) Search.blankCellCount--;
            if (Search.blankCellCount === 0) break;
        }
    }
    Search.itemsCountOffset += cursor;
    if (Search.ReplacedataEnded) Search.blankCellCount = 0;
    Search.loadDataSuccessFinish();
};

Search.replaceCellEmpty = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    var my = 0,
        mx = 0;
    if (row_id < ((Search.ItemsLimit / Search.ColoumnsCount) - 1)) return false;
    for (my = row_id - (1 + Math.ceil(Search.blankCellCount / Search.ColoumnsCount)); my < row_id; my++) {
        for (mx = 0; mx < Search.ColoumnsCount; mx++) {
            if (!Main.ThumbNull(my, mx, Search.Thumbnail) && (Main.ThumbNull(my, mx, Search.EmptyCell))) {
                row_id = my;
                coloumn_id = mx;
                preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "640x360");
                Search.nameMatrix[Search.nameMatrixCount] = channel_name;
                Search.nameMatrixCount++;
                document.getElementById(Search.EmptyCell + row_id + '_' + coloumn_id).setAttribute('id', Search.Cell + row_id + '_' + coloumn_id);
                document.getElementById(Search.Cell + row_id + '_' + coloumn_id).setAttribute('data-channelname', channel_name);
                document.getElementById(Search.Cell + row_id + '_' + coloumn_id).innerHTML =
                    '<img id="' + Search.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + preview_thumbnail + '"/> \
                    <div id="' + Search.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
                    <div id="' + Search.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
                    <div id="' + Search.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div> \
                    <div id="' + Search.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div> \
                    <div id="' + Search.ViwersDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
                    '</div> \
                    <div id="' + Search.QualityDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
                    </div>';
                return true;
            }
        }
    }

    return false;
};

Search.addFocus = function() {
    if (((Search.cursorY + Search.ItemsReloadLimit) > (Search.itemsCount / Search.ColoumnsCount)) &&
        !Search.dataEnded && !Search.loadingMore) {
        Search.loadingMore = true;
        Search.loadData();
    }

    $('#' + Search.Thumbnail + Search.cursorY + '_' + Search.cursorX).addClass('stream_thumbnail_focused');
    $('#' + Search.ThumbnailDiv + Search.cursorY + '_' + Search.cursorX).addClass('stream_text_focused');
    $('#' + Search.DispNameDiv + Search.cursorY + '_' + Search.cursorX).addClass('stream_channel_focused');
    $('#' + Search.StreamTitleDiv + Search.cursorY + '_' + Search.cursorX).addClass('stream_info_focused');
    $('#' + Search.StreamGameDiv + Search.cursorY + '_' + Search.cursorX).addClass('stream_info_focused');
    $('#' + Search.ViwersDiv + Search.cursorY + '_' + Search.cursorX).addClass('stream_info_focused');
    $('#' + Search.QualityDiv + Search.cursorY + '_' + Search.cursorX).addClass('stream_info_focused');
    window.setTimeout(function() {
        Search.ScrollHelper.scrollVerticalToElementById(Search.Thumbnail + Search.cursorY + '_' + Search.cursorX);
    }, 10);
};

Search.removeFocus = function() {
    $('#' + Search.Thumbnail + Search.cursorY + '_' + Search.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + Search.ThumbnailDiv + Search.cursorY + '_' + Search.cursorX).removeClass('stream_text_focused');
    $('#' + Search.DispNameDiv + Search.cursorY + '_' + Search.cursorX).removeClass('stream_channel_focused');
    $('#' + Search.StreamTitleDiv + Search.cursorY + '_' + Search.cursorX).removeClass('stream_info_focused');
    $('#' + Search.StreamGameDiv + Search.cursorY + '_' + Search.cursorX).removeClass('stream_info_focused');
    $('#' + Search.ViwersDiv + Search.cursorY + '_' + Search.cursorX).removeClass('stream_info_focused');
    $('#' + Search.QualityDiv + Search.cursorY + '_' + Search.cursorX).removeClass('stream_info_focused');
};

Search.keyClickDelay = function() {
    Search.LastClickFinish = true;
};

Search.handleKeyDown = function(event) {
    if (Search.loadingData && !Search.loadingMore) {
        event.preventDefault();
        return;
    } else if (!Search.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Search.LastClickFinish = false;
        window.setTimeout(Search.keyClickDelay, Search.keyClickDelayTime);
    }

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            Main.Go = Main.Before;
            Search.exit();
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((Search.cursorY), (Search.cursorX - 1), Search.Thumbnail)) {
                Search.removeFocus();
                Search.cursorX--;
                Search.addFocus();
            } else {
                for (i = (Search.ColoumnsCount - 1); i > -1; i--) {
                    if (Main.ThumbNull((Search.cursorY - 1), i, Search.Thumbnail)) {
                        Search.removeFocus();
                        Search.cursorY--;
                        Search.cursorX = i;
                        Search.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.ThumbNull((Search.cursorY), (Search.cursorX + 1), Search.Thumbnail)) {
                Search.removeFocus();
                Search.cursorX++;
                Search.addFocus();
            } else if (Main.ThumbNull((Search.cursorY + 1), 0, Search.Thumbnail)) {
                Search.removeFocus();
                Search.cursorY++;
                Search.cursorX = 0;
                Search.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Search.ColoumnsCount; i++) {
                if (Main.ThumbNull((Search.cursorY - 1), (Search.cursorX - i), Search.Thumbnail)) {
                    Search.removeFocus();
                    Search.cursorY--;
                    Search.cursorX = Search.cursorX - i;
                    Search.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Search.ColoumnsCount; i++) {
                if (Main.ThumbNull((Search.cursorY + 1), (Search.cursorX - i), Search.Thumbnail)) {
                    Search.removeFocus();
                    Search.cursorY++;
                    Search.cursorX = Search.cursorX - i;
                    Search.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            Search.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            Main.Go = Main.Live;
            Search.exit();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = Main.Live;
            Search.exit();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            break;
        case TvKeyCode.KEY_RED:
            break;
        case TvKeyCode.KEY_GREEN:
            break;
        case TvKeyCode.KEY_YELLOW:
            break;
        case TvKeyCode.KEY_BLUE:
            break;
        case TvKeyCode.KEY_VOLUMEUP:
        case TvKeyCode.KEY_VOLUMEDOWN:
        case TvKeyCode.KEY_MUTE:
            break;
        default:
            break;
    }
};

Search.ScrollHelper = {
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
        $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight());
    }
};
