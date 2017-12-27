/*jshint multistr: true */
//Variable initialization
function SGames() {}
SGames.Status = false;
SGames.Thumbnail = 'thumbnail_sgames_';
SGames.EmptyCell = 'sgames_empty_';
SGames.cursorY = 0;
SGames.cursorX = 0;
SGames.dataEnded = false;
SGames.itemsCount = 0;
SGames.imgMatrix = [];
SGames.imgMatrixId = [];
SGames.imgMatrixCount = 0;
SGames.nameMatrix = [];
SGames.nameMatrixCount = 0;
SGames.loadingData = false;
SGames.loadingDataTry = 1;
SGames.loadingDataTryMax = 10;
SGames.loadingDataTimeout = 1500;
SGames.isDialogOn = false;
SGames.ItemsLimit = 100;
SGames.ColoumnsCount = 5;
SGames.ItemsReloadLimit = Math.floor((SGames.ItemsLimit / SGames.ColoumnsCount) / 2);
SGames.newImg = new Image();
SGames.blankCellCount = 0;
SGames.itemsCountOffset = 0;
SGames.LastClickFinish = true;
SGames.keyClickDelayTime = 25;
SGames.ReplacedataEnded = false;
SGames.MaxOffset = 0;

SGames.ThumbnailDiv = 'sgame_thumbnail_div_';
SGames.DispNameDiv = 'sgame_display_name_';
SGames.ViwersDiv = 'sgame_viwers_';
SGames.Cell = 'sgame_cell_';

//Variable initialization end


SGames.init = function() {
    Main.Go = Main.SGames;
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
    $('.label_agame_name').html(STR_GAMES + ' ' + '\'' + Search.data + '\'');
    document.body.addEventListener("keydown", SGames.handleKeyDown, false);
    if (SGames.status) SGames.ScrollHelper.scrollVerticalToElementById(SLive.Thumbnail + Live.cursorY + '_' + Live.cursorX);
    else SGames.StartLoad();
};

SGames.exit = function() {
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
    SGames.Status = false;
    document.body.removeEventListener("keydown", SGames.handleKeyDown);
    Main.SwitchScreen();
};

SGames.StartLoad = function() {
    SGames.Status = false;
    SGames.ScrollHelper.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_search_game').empty();
    SGames.loadingMore = false;
    SGames.blankCellCount = 0;
    SGames.itemsCountOffset = 0;
    SGames.ReplacedataEnded = false;
    SGames.MaxOffset = 0;
    SGames.nameMatrix = [];
    SGames.nameMatrixCount = 0;
    SGames.itemsCount = 0;
    SGames.cursorX = 0;
    SGames.cursorY = 0;
    SGames.dataEnded = false;
    SGames.loadData();
};

SGames.loadData = function() {
    SGames.imgMatrix = [];
    SGames.imgMatrixId = [];
    SGames.imgMatrixCount = 0;
    SGames.loadingData = true;
    SGames.loadingDataTry = 0;
    SGames.loadingDataTimeout = 1500;
    SGames.loadDataRequest();
};

SGames.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = SGames.itemsCount + SGames.itemsCountOffset;
        if (offset !== 0 && offset >= (SGames.MaxOffset - SGames.ItemsLimit)) {
            offset = SGames.MaxOffset - SGames.ItemsLimit;
            SGames.dataEnded = true;
            SGames.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/games?query=' + encodeURIComponent(Search.data), true);
        xmlHttp.timeout = SGames.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        SGames.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    SGames.loadDataError("HTTP Status " + xmlHttp.status + " Message: " + xmlHttp.statusText, xmlHttp.responseText);
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SGames.loadDataError(e.message, null);
    }
};

SGames.loadDataError = function(reason, responseText) {
    SGames.loadingDataTry++;
    if (SGames.loadingDataTry < SGames.loadingDataTryMax) {
        SGames.loadingDataTimeout += (SGames.loadingDataTry < 5) ? 250 : 3500;
        SGames.loadDataRequest();
    } else {
        Main.showWarningDialog("Unable to load the Search " + " Reason: " + reason + '<br>Hit Refresh to retry');
    }
};

SGames.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items;

    if (response.games !== null) response_items = response.games.length;
    else response_items = 0;

    if (response_items < SGames.ItemsLimit) SGames.dataEnded = true;

    var offset_itemsCount = SGames.itemsCount;
    SGames.itemsCount += response_items;

    var response_rows = response_items / SGames.ColoumnsCount;
    if (response_items % SGames.ColoumnsCount > 0) response_rows++;

    var coloumn_id, row_id, row, cell, game,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / SGames.ColoumnsCount + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < SGames.ColoumnsCount && cursor < response_items; coloumn_id++, cursor++) {
            game = response.games[cursor];
            if (SGames.CellExists(game.name)) coloumn_id--;
            else {
                cell = SGames.createCell(row_id, coloumn_id, game.name, game.box.template, '', '', game.name, '', '');
                row.append(cell);
            }
        }
        for (coloumn_id; coloumn_id < SGames.ColoumnsCount; coloumn_id++) {
            row.append(SGames.createCellEmpty(row_id, coloumn_id));
        }
        $('#stream_table_search_game').append(row);
    }

    SGames.loadDataSuccessFinish();
};

SGames.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="' + SGames.EmptyCell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
};

SGames.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "481x672");

    SGames.imgMatrix[SGames.imgMatrixCount] = preview_thumbnail;
    SGames.imgMatrixId[SGames.imgMatrixCount] = SGames.Thumbnail + row_id + '_' + coloumn_id;
    SGames.imgMatrixCount++;

    if (SGames.imgMatrixCount <= (SGames.ColoumnsCount * 3)) SGames.newImg.src = preview_thumbnail; //try to pre cache first 4 rows

    SGames.nameMatrix[SGames.nameMatrixCount] = channel_name;
    SGames.nameMatrixCount++;

    return $('<td id="' + SGames.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="' + SGames.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="app/images/game.png"/> \
            <div id="' + SGames.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="' + SGames.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
            <div id="' + SGames.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_SGames" style="width: 100%; display: inline-block;">' + viwers +
            '</div> \
            </div>');
};

SGames.CellExists = function(display_name) {
    for (var i = 0; i <= SGames.nameMatrixCount; i++) {
        if (display_name == SGames.nameMatrix[i]) {
            SGames.blankCellCount++;
            return true;
        }
    }
    return false;
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
SGames.loadDataSuccessFinish = function() {
    $('#stream_table_search_game').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!SGames.Status) {
                Main.HideLoadDialog();
                SGames.Status = true;
                SGames.addFocus();
            }

            for (var i = 0; i < SGames.imgMatrix.length; i++) {
                var tumbImg = document.getElementById(SGames.imgMatrixId[i]);
                tumbImg.onerror = function() {
                    this.src = 'app/images/404_game.png'; //img fail to load use predefined
                };

                tumbImg.src = SGames.imgMatrix[i];
            }

            if (SGames.blankCellCount > 0 && !SGames.dataEnded) {
                SGames.loadingMore = true;
                SGames.loadDataReplace();
                return;
            } else SGames.blankCellCount = 0;

            SGames.loadingData = false;
            SGames.loadingMore = false;
        });
};

SGames.loadDataReplace = function() {
    SGames.imgMatrix = [];
    SGames.imgMatrixId = [];
    SGames.imgMatrixCount = 0;
    SGames.loadingData = true;
    SGames.loadingDataTry = 0;
    SGames.loadingDataTimeout = 1500;
    SGames.loadDataRequestReplace();
};

SGames.loadDataRequestReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = SGames.itemsCount + SGames.itemsCountOffset;
        if (offset !== 0 && offset >= (SGames.MaxOffset - SGames.ItemsLimit)) {
            offset = SGames.MaxOffset - SGames.ItemsLimit;
            SGames.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/games?query=' + encodeURIComponent(Search.data), true);
        xmlHttp.timeout = SGames.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        SGames.loadDataSuccessReplace(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SGames.loadDataErrorReplace(e.message, null);
    }
};

SGames.loadDataErrorReplace = function(reason, responseText) {
    SGames.loadingDataTry++;
    if (SGames.loadingDataTry < SGames.loadingDataTryMax) {
        SGames.loadingDataTimeout += (SGames.loadingDataTry < 5) ? 250 : 3500;
        SGames.loadDataRequestReplace();
    }
};

SGames.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items;

    if (response.games !== null) response_items = response.games.length;
    else response_items = 0;

    if (response_items < SGames.ItemsLimit) SGames.ReplacedataEnded = true;

    var row_id = SGames.itemsCount / SGames.ColoumnsCount;

    var coloumn_id, game, mReplace = false, cursor = 0;

    for (cursor; cursor < response_items; cursor++) {
        game = response.top[cursor];
        if (SGames.CellExists(game.name)) SGames.blankCellCount--;
        else {
            mReplace = SGames.replaceCellEmpty(row_id, coloumn_id, game.name, game.box.template, '', '', game.name, '', '');
            if (mReplace) SGames.blankCellCount--;
            if (SGames.blankCellCount === 0) break;
        }
    }
    SGames.itemsCountOffset += cursor;
    if (SGames.ReplacedataEnded) SGames.blankCellCount = 0;
    SGames.loadDataSuccessFinish();
};

SGames.replaceCellEmpty = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    var my = 0,
        mx = 0;
    if (row_id < ((SGames.ItemsLimit / SGames.ColoumnsCount) - 1)) return false;
    for (my = row_id - (1 + Math.ceil(SGames.blankCellCount / SGames.ColoumnsCount)); my < row_id; my++) {
        for (mx = 0; mx < SGames.ColoumnsCount; mx++) {
            if (!Main.ThumbNull(my, mx, SGames.Thumbnail) && (Main.ThumbNull(my, mx, SGames.EmptyCell))) {
                row_id = my;
                coloumn_id = mx;
                preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "481x672");
                SGames.nameMatrix[SGames.nameMatrixCount] = channel_name;
                SGames.nameMatrixCount++;
                document.getElementById(SGames.EmptyCell + row_id + '_' + coloumn_id).setAttribute('id', SGames.Cell + row_id + '_' + coloumn_id);
                document.getElementById(SGames.Cell + row_id + '_' + coloumn_id).setAttribute('data-channelname', channel_name);
                document.getElementById(SGames.Cell + row_id + '_' + coloumn_id).innerHTML =
                    '<img id="' + SGames.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + preview_thumbnail + '"/> \
                     <div id="' + SGames.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
                     <div id="' + SGames.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
                     <div id="' + SGames.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_SGames" style="width: 100%; display: inline-block;">' +
                    viwers + '</div> \
                     </div>';
                return true;
            }
        }
    }

    return false;
};

SGames.addFocus = function() {
    if (((SGames.cursorY + SGames.ItemsReloadLimit) > (SGames.itemsCount / SGames.ColoumnsCount)) &&
        !SGames.dataEnded && !SGames.loadingMore) {
        SGames.loadingMore = true;
        SGames.loadData();
    }

    $('#' + SGames.Thumbnail + SGames.cursorY + '_' + SGames.cursorX).addClass('stream_thumbnail_focused');
    $('#' + SGames.ThumbnailDiv + SGames.cursorY + '_' + SGames.cursorX).addClass('stream_text_focused');
    $('#' + SGames.DispNameDiv + SGames.cursorY + '_' + SGames.cursorX).addClass('stream_channel_focused');
    $('#' + SGames.ViwersDiv + SGames.cursorY + '_' + SGames.cursorX).addClass('stream_info_focused');
    window.setTimeout(function() {
        SGames.ScrollHelper.scrollVerticalToElementById(SGames.Thumbnail + SGames.cursorY + '_' + SGames.cursorX);
    }, 10);
};

SGames.removeFocus = function() {
    $('#' + SGames.Thumbnail + SGames.cursorY + '_' + SGames.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + SGames.ThumbnailDiv + SGames.cursorY + '_' + SGames.cursorX).removeClass('stream_text_focused');
    $('#' + SGames.DispNameDiv + SGames.cursorY + '_' + SGames.cursorX).removeClass('stream_channel_focused');
    $('#' + SGames.ViwersDiv + SGames.cursorY + '_' + SGames.cursorX).removeClass('stream_info_focused');
};

SGames.keyClickDelay = function() {
    SGames.LastClickFinish = true;
};

SGames.handleKeyDown = function(event) {
    if (SGames.loadingData && !SGames.loadingMore) {
        event.preventDefault();
        return;
    } else if (!SGames.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        SGames.LastClickFinish = false;
        window.setTimeout(SGames.keyClickDelay, SGames.keyClickDelayTime);
    }

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            Main.Go = Main.Before;
            SGames.exit();
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((SGames.cursorY), (SGames.cursorX - 1), SGames.Thumbnail)) {
                SGames.removeFocus();
                SGames.cursorX--;
                SGames.addFocus();
            } else {
                for (i = (SGames.ColoumnsCount - 1); i > -1; i--) {
                    if (Main.ThumbNull((SGames.cursorY - 1), i, SGames.Thumbnail)) {
                        SGames.removeFocus();
                        SGames.cursorY--;
                        SGames.cursorX = i;
                        SGames.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.ThumbNull((SGames.cursorY), (SGames.cursorX + 1), SGames.Thumbnail)) {
                SGames.removeFocus();
                SGames.cursorX++;
                SGames.addFocus();
            } else if (Main.ThumbNull((SGames.cursorY + 1), 0, SGames.Thumbnail)) {
                SGames.removeFocus();
                SGames.cursorY++;
                SGames.cursorX = 0;
                SGames.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < SGames.ColoumnsCount; i++) {
                if (Main.ThumbNull((SGames.cursorY - 1), (SGames.cursorX - i), SGames.Thumbnail)) {
                    SGames.removeFocus();
                    SGames.cursorY--;
                    SGames.cursorX = SGames.cursorX - i;
                    SGames.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < SGames.ColoumnsCount; i++) {
                if (Main.ThumbNull((SGames.cursorY + 1), (SGames.cursorX - i), SGames.Thumbnail)) {
                    SGames.removeFocus();
                    SGames.cursorY++;
                    SGames.cursorX = SGames.cursorX - i;
                    SGames.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            SGames.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
        case TvKeyCode.KEY_CHANNELDOWN:
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Main.gameSelected = $('#' + SGames.Cell + SGames.cursorY + '_' + SGames.cursorX).attr('data-channelname');
            document.body.removeEventListener("keydown", SGames.handleKeyDown);
            Main.Go = Main.AGame;
            SGames.exit();
            break;
        case TvKeyCode.KEY_RED:
            break;
        case TvKeyCode.KEY_GREEN:
            break;
        case TvKeyCode.KEY_YELLOW:
            break;
        case TvKeyCode.KEY_BLUE:
            Main.Before = Main.Go;
            Main.Go = Main.Search;
            SGames.exit();
            break;
        case TvKeyCode.KEY_VOLUMEUP:
        case TvKeyCode.KEY_VOLUMEDOWN:
        case TvKeyCode.KEY_MUTE:
            break;
        default:
            break;
    }
};

SGames.ScrollHelper = {
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
        if (Main.Go === Main.SGames) {
            if (id.indexOf(SGames.Thumbnail + '0_') == -1)
                $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.535 * this.viewportHeight());
            else $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.535 * this.viewportHeight() + 514);
            // check Games.ScrollHelper to understand the "514"
        } else return;
    }
};
