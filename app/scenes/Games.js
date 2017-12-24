/*jshint multistr: true */
//Variable initialization
function Games() {}
Games.Status = false;
Games.Thumbnail = 'thumbnail_games_';
Games.EmptyCell = 'games_empty_';
Games.cursorY = 0;
Games.cursorX = 0;
Games.dataEnded = false;
Games.itemsCount = 0;
Games.imgMatrix = [];
Games.imgMatrixId = [];
Games.imgMatrixCount = 0;
Games.nameMatrix = [];
Games.nameMatrixCount = 0;
Games.loadingData = false;
Games.loadingDataTry = 1;
Games.loadingDataTryMax = 10;
Games.loadingDataTimeout = 1500;
Games.isDialogOn = false;
Games.ItemsLimit = 100;
Games.ColoumnsCount = 5;
Games.ItemsReloadLimit = Math.floor((Games.ItemsLimit / Games.ColoumnsCount) / 2);
Games.newImg = new Image();
Games.blankCellCount = 0;
Games.itemsCountOffset = 0;
Games.LastClickFinish = true;
Games.keyClickDelayTime = 25;
Games.ReplacedataEnded = false;
Games.MaxOffset = 0;

Games.ThumbnailDiv = 'game_thumbnail_div_';
Games.DispNameDiv = 'game_display_name_';
Games.StreamTitleDiv = 'game_stream_title_';
Games.StreamGameDiv = 'game_stream_game_';
Games.ViwersDiv = 'game_viwers_';
Games.QualityDiv = 'game_quality_';
Games.Cell = 'game_cell_';

//Variable initialization end


Games.init = function() {
    document.body.addEventListener("keydown", Games.handleKeyDown, false);
    $('#top_bar_game').removeClass('icon_center_label');
    $('#top_bar_game').addClass('icon_center_focus');
    if (Games.Status) Games.ScrollHelper.scrollVerticalToElementById(Games.Thumbnail + Games.cursorY + '_' + Games.cursorX);
    else Games.StartLoad();
};

Games.exit = function() {
    document.body.removeEventListener("keydown", Games.handleKeyDown);
    $('#top_bar_game').removeClass('icon_center_focus');
    $('#top_bar_game').addClass('icon_center_label');
    Main.SwitchScreen();
};

Games.StartLoad = function() {
    Games.Status = false;
    Games.ScrollHelper.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_games').empty();
    Games.loadingMore = false;
    Games.blankCellCount = 0;
    Games.itemsCountOffset = 0;
    Games.ReplacedataEnded = false;
    Games.MaxOffset = 0;
    Games.nameMatrix = [];
    Games.nameMatrixCount = 0;
    Games.itemsCount = 0;
    Games.cursorX = 0;
    Games.cursorY = 0;
    Games.dataEnded = false;
    Games.loadData();
};

Games.loadData = function() {
    Games.imgMatrix = [];
    Games.imgMatrixId = [];
    Games.imgMatrixCount = 0;
    Games.loadingData = true;
    Games.loadingDataTry = 0;
    Games.loadingDataTimeout = 1500;
    Games.loadDataRequest();
};

Games.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Games.itemsCount + Games.itemsCountOffset;
        if (offset !== 0 && offset >= (Games.MaxOffset - Games.ItemsLimit)) {
            offset = Games.MaxOffset - Games.ItemsLimit;
            Games.dataEnded = true;
            Games.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/games/top?limit=' + Games.ItemsLimit + '&offset=' + offset, true);
        xmlHttp.timeout = Games.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        Games.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    Games.loadDataError("HTTP Status " + xmlHttp.status + " Message: " + xmlHttp.statusText, xmlHttp.responseText);
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Games.loadDataError(e.message, null);
    }
};

Games.loadDataError = function(reason, responseText) {
    Games.loadingDataTry++;
    if (Games.loadingDataTry < Games.loadingDataTryMax) {
        Games.loadingDataTimeout += (Games.loadingDataTry < 5) ? 250 : 3500;
        Games.loadDataRequest();
    } else {
        Main.showWarningDialog("Unable to load Games " + " Reason: " + reason + '<br>Hit Refresh to retry');
    }
};

Games.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.top.length;
    Games.MaxOffset = parseInt(response._total);

    if (response_items < Games.ItemsLimit) Games.dataEnded = true;

    var offset_itemsCount = Games.itemsCount;
    Games.itemsCount += response_items;

    var response_rows = response_items / Games.ColoumnsCount;
    if (response_items % Games.ColoumnsCount > 0) response_rows++;

    var coloumn_id, row_id, row, cell, game,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Games.ColoumnsCount + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Games.ColoumnsCount && cursor < response_items; coloumn_id++, cursor++) {
            game = response.top[cursor];
            if (Games.CellExists(game.game.name)) coloumn_id--;
            else {
                cell = Games.createCell(row_id, coloumn_id, game.game.name, game.game.box.template,
                    '', '', game.game.name, Main.addCommas(game.channels) + STR_CHANNELS + ' for ' + Main.addCommas(game.viewers) + STR_VIEWER, '');
                row.append(cell);
            }
        }
        for (coloumn_id; coloumn_id < Games.ColoumnsCount; coloumn_id++) {
            row.append(Games.createCellEmpty(row_id, coloumn_id));
        }
        $('#stream_table_games').append(row);
    }

    Games.loadDataSuccessFinish();
};

Games.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="' + Games.EmptyCell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
};

Games.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "481x672");

    Games.imgMatrix[Games.imgMatrixCount] = preview_thumbnail;
    Games.imgMatrixId[Games.imgMatrixCount] = Games.Thumbnail + row_id + '_' + coloumn_id;
    Games.imgMatrixCount++;

    if (Games.imgMatrixCount <= (Games.ColoumnsCount * 3)) Games.newImg.src = preview_thumbnail; //try to pre cache first 4 rows

    Games.nameMatrix[Games.nameMatrixCount] = channel_name;
    Games.nameMatrixCount++;

    return $('<td id="' + Games.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="' + Games.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="images/game.png"/> \
            <div id="' + Games.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="' + Games.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
            <div id="' + Games.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div> \
            <div id="' + Games.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div> \
            <div id="' + Games.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 100%; display: inline-block;">' + viwers +
        '</div> \
             <div id="' + Games.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
            </div>');
};

Games.CellExists = function(display_name) {
    for (var i = 0; i <= Games.nameMatrixCount; i++) {
        if (display_name == Games.nameMatrix[i]) {
            Games.blankCellCount++;
            return true;
        }
    }
    return false;
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
Games.loadDataSuccessFinish = function() {
    $('#stream_table_games').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!Games.Status) {
                Main.HideLoadDialog();
                Games.Status = true;
                Games.addFocus();
            }

            for (var i = 0; i < Games.imgMatrix.length; i++) {
                var tumbImg = document.getElementById(Games.imgMatrixId[i]);
                tumbImg.onerror = function() {
                    this.src = 'images/404_game.png'; //img fail to load use predefined
                };

                tumbImg.src = Games.imgMatrix[i];
            }

            if (Games.blankCellCount > 0 && !Games.dataEnded) {
                Games.loadingMore = true;
                Games.loadDataReplace();
                return;
            } else Games.blankCellCount = 0;

            Games.loadingData = false;
            Games.loadingMore = false;
        });
};

Games.loadDataReplace = function() {
    Games.imgMatrix = [];
    Games.imgMatrixId = [];
    Games.imgMatrixCount = 0;
    Games.loadingData = true;
    Games.loadingDataTry = 0;
    Games.loadingDataTimeout = 1500;
    Games.loadDataRequestReplace();
};

Games.loadDataRequestReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Games.itemsCount + Games.itemsCountOffset;
        if (offset !== 0 && offset >= (Games.MaxOffset - Games.ItemsLimit)) {
            offset = Games.MaxOffset - Games.ItemsLimit;
            Games.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/games/top?limit=' + Games.ItemsLimit + '&offset=' + offset, true);
        xmlHttp.timeout = Games.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        Games.loadDataSuccessReplace(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {}
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Games.loadDataErrorReplace(e.message, null);
    }
};

Games.loadDataErrorReplace = function(reason, responseText) {
    Games.loadingDataTry++;
    if (Games.loadingDataTry < Games.loadingDataTryMax) {
        Games.loadingDataTimeout += (Games.loadingDataTry < 5) ? 250 : 3500;
        Games.loadDataRequestReplace();
    } else {}
};

Games.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.top.length;
    Games.MaxOffset = parseInt(response._total);

    if (response_items < Games.ItemsLimit) Games.ReplacedataEnded = true;

    var row_id = Games.itemsCount / Games.ColoumnsCount;

    var coloumn_id, game, mReplace = false;

    for (var cursor = 0; cursor < response_items; cursor++) {
        game = response.top[cursor];
        if (Games.CellExists(game.game.name)) Games.blankCellCount--;
        else {
            mReplace = Games.replaceCellEmpty(row_id, coloumn_id, game.game.name, game.game.box.template,
                '', '', game.game.name, Main.addCommas(game.channels) + STR_CHANNELS + ' for ' + Main.addCommas(game.viewers) + STR_VIEWER, '');
            if (mReplace) Games.blankCellCount--;
            if (Games.blankCellCount === 0) {
                Games.itemsCountOffset += cursor;
                break;
            }
        }
    }
    if (response_items < Games.ItemsLimit) {
        Games.blankCellCount = 0;
    }
    if (Games.ReplacedataEnded) Games.blankCellCount = 0;
    Games.loadDataSuccessFinish();
};

Games.replaceCellEmpty = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    var my = 0,
        mx = 0;
    if (row_id < ((Games.ItemsLimit / Games.ColoumnsCount) - 1)) return false;
    for (my = row_id - (1 + Math.ceil(Games.blankCellCount / Games.ColoumnsCount)); my < row_id; my++) {
        for (mx = 0; mx < Games.ColoumnsCount; mx++) {
            if (!Main.ThumbNull(my, mx, Games.Thumbnail) && (Main.ThumbNull(my, mx, Games.EmptyCell))) {
                row_id = my;
                coloumn_id = mx;
                preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "481x672");
                Games.nameMatrix[Games.nameMatrixCount] = channel_name;
                Games.nameMatrixCount++;
                document.getElementById(Games.EmptyCell + row_id + '_' + coloumn_id).setAttribute('id', Games.Cell + row_id + '_' + coloumn_id);
                document.getElementById(Games.Cell + row_id + '_' + coloumn_id).setAttribute('data-channelname', channel_name);
                document.getElementById(Games.Cell + row_id + '_' + coloumn_id).innerHTML =
                    '<img id="' + Games.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + preview_thumbnail + '"/> \
                     <div id="' + Games.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
                     <div id="' + Games.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
                     <div id="' + Games.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div> \
                     <div id="' + Games.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div> \
                     <div id="' + Games.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 100%; display: inline-block;">' +
                    viwers + '</div> \
                     <div id="' + Games.QualityDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
                     </div>';
                return true;
            }
        }
    }

    return false;
};

Games.addFocus = function() {
    if (((Games.cursorY + Games.ItemsReloadLimit) > (Games.itemsCount / Games.ColoumnsCount)) &&
        !Games.dataEnded && !Games.loadingMore) {
        Games.loadingMore = true;
        Games.loadData();
    }

    $('#' + Games.Thumbnail + Games.cursorY + '_' + Games.cursorX).addClass('stream_thumbnail_focused');
    $('#' + Games.ThumbnailDiv + Games.cursorY + '_' + Games.cursorX).addClass('stream_text_focused');
    $('#' + Games.DispNameDiv + Games.cursorY + '_' + Games.cursorX).addClass('stream_channel_focused');
    //$('#' + Games.StreamTitleDiv + Games.cursorY + '_' + Games.cursorX).addClass('stream_info_focused');
    //$('#' + Games.StreamGameDiv + Games.cursorY + '_' + Games.cursorX).addClass('stream_info_focused');
    $('#' + Games.ViwersDiv + Games.cursorY + '_' + Games.cursorX).addClass('stream_info_focused');
    //$('#' + Games.QualityDiv + Games.cursorY + '_' + Games.cursorX).addClass('stream_info_focused');
    window.setTimeout(function() {
        Games.ScrollHelper.scrollVerticalToElementById(Games.Thumbnail + Games.cursorY + '_' + Games.cursorX);
    }, 10);
};

Games.removeFocus = function() {
    $('#' + Games.Thumbnail + Games.cursorY + '_' + Games.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + Games.ThumbnailDiv + Games.cursorY + '_' + Games.cursorX).removeClass('stream_text_focused');
    $('#' + Games.DispNameDiv + Games.cursorY + '_' + Games.cursorX).removeClass('stream_channel_focused');
    //$('#' + Games.StreamTitleDiv + Games.cursorY + '_' + Games.cursorX).removeClass('stream_info_focused');
    //$('#' + Games.StreamGameDiv + Games.cursorY + '_' + Games.cursorX).removeClass('stream_info_focused');
    $('#' + Games.ViwersDiv + Games.cursorY + '_' + Games.cursorX).removeClass('stream_info_focused');
    //$('#' + Games.QualityDiv + Games.cursorY + '_' + Games.cursorX).removeClass('stream_info_focused');
};

Games.keyClickDelay = function() {
    Games.LastClickFinish = true;
};

Games.handleKeyDown = function(event) {
    if (Games.loadingData && !Games.loadingMore) {
        event.preventDefault();
        return;
    } else if (!Games.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Games.LastClickFinish = false;
        window.setTimeout(Games.keyClickDelay, Games.keyClickDelayTime);
    }

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            Main.Go = Main.Live;
            Games.exit();
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((Games.cursorY), (Games.cursorX - 1), Games.Thumbnail)) {
                Games.removeFocus();
                Games.cursorX--;
                Games.addFocus();
            } else {
                for (i = (Games.ColoumnsCount - 1); i > -1; i--) {
                    if (Main.ThumbNull((Games.cursorY - 1), i, Games.Thumbnail)) {
                        Games.removeFocus();
                        Games.cursorY--;
                        Games.cursorX = i;
                        Games.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.ThumbNull((Games.cursorY), (Games.cursorX + 1), Games.Thumbnail)) {
                Games.removeFocus();
                Games.cursorX++;
                Games.addFocus();
            } else if (Main.ThumbNull((Games.cursorY + 1), 0, Games.Thumbnail)) {
                Games.removeFocus();
                Games.cursorY++;
                Games.cursorX = 0;
                Games.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Games.ColoumnsCount; i++) {
                if (Main.ThumbNull((Games.cursorY - 1), (Games.cursorX - i), Games.Thumbnail)) {
                    Games.removeFocus();
                    Games.cursorY--;
                    Games.cursorX = Games.cursorX - i;
                    Games.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Games.ColoumnsCount; i++) {
                if (Main.ThumbNull((Games.cursorY + 1), (Games.cursorX - i), Games.Thumbnail)) {
                    Games.removeFocus();
                    Games.cursorY++;
                    Games.cursorX = Games.cursorX - i;
                    Games.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            Games.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            Main.Go = Main.Live;
            Games.exit();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = Main.Live;
            Games.exit();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Main.OldgameSelected = Main.gameSelected;
            Main.gameSelected = $('#' + Games.Cell + Games.cursorY + '_' + Games.cursorX).attr('data-channelname');
            document.body.removeEventListener("keydown", Games.handleKeyDown);
            Main.Go = Main.AGame;
            Games.exit();
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

Games.ScrollHelper = {
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
        //console.log(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.535 * this.viewportHeight());// remove to calculate off set the 514 value below do row 1 - row 0
        if (Main.Go === Main.Games) {
            if (id.indexOf(Games.Thumbnail + '0_') == -1)
                $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.535 * this.viewportHeight());
            else $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.535 * this.viewportHeight() + 514);
        } else return;
    }
};
