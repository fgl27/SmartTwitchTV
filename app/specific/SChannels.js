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
SChannels.loadingDataTry = 1;
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

//Variable initialization end

SChannels.init = function() {
    Main.Go = Main.SChannels;
    $('.label_refresh').html('<i class="fa fa-arrow-circle-left" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_GOBACK);
    $('.label_search').html('');
    $('.label_switch').html('');
    $('.lable_live').html('');
    $('.lable_user').html(STR_SEARCHS);
    $('.lable_game').html('');
    document.getElementById("top_bar_spacing").style.paddingLeft = "40.5%";
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    document.getElementById("id_agame_name").style.paddingLeft = "45%";
    $('.label_agame_name').html(STR_CHANNELS + ' ' + '\'' + Search.data + '\'');
    document.body.addEventListener("keydown", SChannels.handleKeyDown, false);
    if (SChannels.status) SChannels.ScrollHelper.scrollVerticalToElementById(SChannels.Thumbnail + Live.cursorY + '_' + Live.cursorX);
    else SChannels.StartLoad();
};

SChannels.exit = function() {
    $('.label_refresh').html('<i class="fa fa-refresh" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_REFRESH);
    $('.label_search').html('<i class="fa fa-search" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_SEARCH);
    $('.label_switch').html('<i class="fa fa-exchange" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_SWITCH);
    $('#top_bar_user').removeClass('icon_center_focus');
    $('#top_bar_user').addClass('icon_center_label');
    document.getElementById("top_bar_spacing").style.paddingLeft = "30%";
    document.getElementById("id_agame_name").style.paddingLeft = "50%";
    $('.lable_live').html(STR_LIVE);
    $('.lable_user').html(STR_USER);
    $('.lable_game').html(STR_GAMES);
    $('.label_agame_name').html('');
    document.body.removeEventListener("keydown", SChannels.handleKeyDown);
    SChannels.status = false;
    Main.SwitchScreen();
};

SChannels.StartLoad = function() {
    Main.HideWarningDialog();
    SChannels.status = false;
    SChannels.ScrollHelper.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_search_live').empty();
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
            '&limit=' + SChannels.ItemsLimit + '&offset=' + offset, true);
        xmlHttp.timeout = SChannels.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        SChannels.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    SChannels.loadDataError("HTTP Status " + xmlHttp.status + " Message: " + xmlHttp.statusText, xmlHttp.responseText);
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SChannels.loadDataError(e.message, null);
    }
};

SChannels.loadDataError = function(reason, responseText) {
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
            row.append(SChannels.createCellEmpty(row_id, coloumn_id));
        }
        $('#stream_table_search_live').append(row);
    }

    SChannels.loadDataSuccessFinish();
};

SChannels.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="' + SChannels.EmptyCell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
};

SChannels.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, channel_display_name) {
    SChannels.imgMatrix[SChannels.imgMatrixCount] = preview_thumbnail;
    SChannels.imgMatrixId[SChannels.imgMatrixCount] = SChannels.Thumbnail + row_id + '_' + coloumn_id;
    SChannels.imgMatrixCount++;

    if (SChannels.imgMatrixCount <= (SChannels.ColoumnsCount * 3)) SChannels.newImg.src = preview_thumbnail; //try to pre cache first 4 rows

    SChannels.nameMatrix[SChannels.nameMatrixCount] = channel_name;
    SChannels.nameMatrixCount++;

    return $('<td id="' + SChannels.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="' + SChannels.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="app/images/ch_logo.png"/> \
            <div id="' + SChannels.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="' + SChannels.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
            </div>');
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
    $('#stream_table_search_live').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!SChannels.status) {
                Main.HideLoadDialog();
                SChannels.status = true;
                SChannels.addFocus();
            }

            for (var i = 0; i < SChannels.imgMatrix.length; i++) {
                var tumbImg = document.getElementById(SChannels.imgMatrixId[i]);
                tumbImg.onerror = function() {
                    this.src = 'app/images/404_logo.png'; //img fail to load use predefined
                };

                tumbImg.src = SChannels.imgMatrix[i];
            }

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
            '&limit=' + SChannels.ItemsLimit + '&offset=' + offset, true);
        xmlHttp.timeout = SChannels.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');
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
        SChannels.loadDataErrorReplace(e.message, null);
    }
};

SChannels.loadDataErrorReplace = function(reason, responseText) {
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

    var coloumn_id, channels, mReplace = false, cursor = 0;

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
                    '<img id="' + SChannels.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + preview_thumbnail + '"/> \
                    <div id="' + SChannels.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
                    <div id="' + SChannels.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
                    </div>';
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
        SChannels.ScrollHelper.scrollVerticalToElementById(SChannels.Thumbnail + SChannels.cursorY + '_' + SChannels.cursorX);
    }, 10);
};

SChannels.removeFocus = function() {
    $('#' + SChannels.Thumbnail + SChannels.cursorY + '_' + SChannels.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + SChannels.ThumbnailDiv + SChannels.cursorY + '_' + SChannels.cursorX).removeClass('stream_text_focused');
    $('#' + SChannels.DispNameDiv + SChannels.cursorY + '_' + SChannels.cursorX).removeClass('stream_channel_focuse');
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
            if (Main.Go === Main.Before) Main.Go = Main.Live;
            else Main.Go = Main.Before;
            SChannels.exit();
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
            break;
        case TvKeyCode.KEY_RED:
        case TvKeyCode.KEY_GREEN:
        case TvKeyCode.KEY_YELLOW:
            break;
        case TvKeyCode.KEY_BLUE:
            Main.Go = Main.Search;
            SChannels.exit();
            break;
        case TvKeyCode.KEY_VOLUMEUP:
        case TvKeyCode.KEY_VOLUMEDOWN:
        case TvKeyCode.KEY_MUTE:
            break;
        default:
            break;
    }
};

SChannels.ScrollHelper = {
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
        if (Main.Go === Main.SChannels) {
            if (id.indexOf(SChannels.Thumbnail + '0_') == -1) {
                $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight());
            } else {
                $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight() + 290); // check Games.ScrollHelper to understand the "290"
            }
        } else return;
    }
};
