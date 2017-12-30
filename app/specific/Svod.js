/*jshint multistr: true */
//Variable initialization
function Svod() {}
Svod.Thumbnail = 'thumbnail_svod_';
Svod.EmptyCell = 'svod_empty_';
Svod.cursorY = 0;
Svod.cursorX = 0;
Svod.dataEnded = false;
Svod.itemsCount = 0;
Svod.imgMatrix = [];
Svod.imgMatrixId = [];
Svod.imgMatrixCount = 0;
Svod.nameMatrix = [];
Svod.nameMatrixCount = 0;
Svod.loadingData = false;
Svod.loadingDataTry = 1;
Svod.loadingDataTryMax = 10;
Svod.loadingDataTimeout = 3500;
Svod.isDialogOn = false;
Svod.ItemsLimit = 99;
Svod.ColoumnsCount = 3;
Svod.ItemsReloadLimit = Math.floor((Svod.ItemsLimit / Svod.ColoumnsCount) / 2);
Svod.newImg = new Image();
Svod.blankCellCount = 0;
Svod.itemsCountOffset = 0;
Svod.LastClickFinish = true;
Svod.keyClickDelayTime = 25;
Svod.ReplacedataEnded = false;
Svod.MaxOffset = 0;

Svod.ThumbnailDiv = 'svod_thumbnail_div_';
Svod.DispNameDiv = 'svod_display_name_';
Svod.StreamTitleDiv = 'svod_stream_title_';
Svod.StreamGameDiv = 'svod_stream_svod_';
Svod.ViwersDiv = 'svod_viwers_';
Svod.QualityDiv = 'svod_quality_';
Svod.Cell = 'svod_cell_';
Svod.status = false;
Svod.highlight = false;

//Variable initialization end

Svod.init = function() {
    Main.Go = Main.Svod;
    if (SChannelsA.lastselectedChannel !== Main.selectedChannel) Svod.status = false;
    Main.cleanTopLabel();
    $('.lable_user').html(Svod.highlight ? STR_PAST_HIGHL : STR_PAST_BROA);
    document.getElementById("top_bar_spacing").style.paddingLeft = "27.5%";
    $('.label_switch').html('<i class="fa fa-exchange" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_SWITCH_VOD);
    $('.label_agame_name').html(Main.selectedChannel);
    document.body.addEventListener("keydown", Svod.handleKeyDown, false);
    if (Svod.status) Svod.ScrollHelper.scrollVerticalToElementById(Svod.Thumbnail + Svod.cursorY + '_' + Svod.cursorX);
    else Svod.StartLoad();
};

Svod.exit = function() {
    Main.RestoreTopLabel();
    document.body.removeEventListener("keydown", Svod.handleKeyDown);
    Main.Go = Main.SChannelsA;
    Main.SwitchScreen();
};

Svod.StartLoad = function() {
    $('.lable_user').html(Svod.highlight ? STR_PAST_HIGHL : STR_PAST_BROA);
    Main.HideWarningDialog();
    Svod.status = false;
    Svod.ScrollHelper.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_search_vod').empty();
    Svod.loadingMore = false;
    Svod.blankCellCount = 0;
    Svod.itemsCountOffset = 0;
    Svod.ReplacedataEnded = false;
    Svod.MaxOffset = 0;
    Svod.nameMatrix = [];
    Svod.nameMatrixCount = 0;
    Svod.itemsCount = 0;
    Svod.cursorX = 0;
    Svod.cursorY = 0;
    Svod.dataEnded = false;
    Svod.loadData();
};

Svod.loadData = function() {
    Svod.imgMatrix = [];
    Svod.imgMatrixId = [];
    Svod.imgMatrixCount = 0;
    Svod.loadingData = true;
    Svod.loadingDataTry = 0;
    Svod.loadingDataTimeout = 3500;
    Svod.loadDataRequest();
};

Svod.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Svod.itemsCount + Svod.itemsCountOffset;
        if (offset !== 0 && offset >= (Svod.MaxOffset - Svod.ItemsLimit)) {
            offset = Svod.MaxOffset - Svod.ItemsLimit;
            Svod.dataEnded = true;
            Svod.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/channels/' + encodeURIComponent(Main.selectedChannel) + '/videos?limit=' +
            Svod.ItemsLimit + '&broadcast_type=' + (Svod.highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + offset, true);
        xmlHttp.timeout = Svod.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        Svod.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    Svod.loadDataError("HTTP Status " + xmlHttp.status + " Message: " + xmlHttp.statusText, xmlHttp.responseText);
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Svod.loadDataError(e.message, null);
    }
};

Svod.loadDataError = function(reason, responseText) {
    Svod.loadingDataTry++;
    if (Svod.loadingDataTry < Svod.loadingDataTryMax) {
        Svod.loadingDataTimeout += (Svod.loadingDataTry < 5) ? 250 : 3500;
        Svod.loadDataRequest();
    } else {
        Svod.loadingData = false;
        Svod.loadingMore = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

Svod.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.videos.length;
    Svod.MaxOffset = parseInt(response._total);

    if (response_items < Svod.ItemsLimit) Svod.dataEnded = true;

    var offset_itemsCount = Svod.itemsCount;
    Svod.itemsCount += response_items;

    var response_rows = response_items / Svod.ColoumnsCount;
    if (response_items % Svod.ColoumnsCount > 0) response_rows++;

    var coloumn_id, row_id, row, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Svod.ColoumnsCount + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Svod.ColoumnsCount && cursor < response_items; coloumn_id++, cursor++) {
            video = response.videos[cursor];
            if (((JSON.stringify(video.preview) + '').indexOf('404_processing_320x240.png') !== -1) || Svod.CellExists(video._id)) coloumn_id--;
            else {
                row.append(Svod.createCell(row_id, coloumn_id, video._id, video.preview,
                    STR_STREAM_ON + Main.videoCreatedAt(video.created_at), STR_DURATION + Play.timeMs((parseInt(video.length) / 60) * 60000),
                    video.title, Main.addCommas(video.views) + STR_VIEWS,
                    Main.videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language)));
            }
        }

        for (coloumn_id; coloumn_id < Svod.ColoumnsCount; coloumn_id++) {
            row.append(Svod.createCellEmpty(row_id, coloumn_id));
        }
        $('#stream_table_search_vod').append(row);
    }

    Svod.loadDataSuccessFinish();
};

Svod.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="' + Svod.EmptyCell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
};

Svod.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    preview_thumbnail = preview_thumbnail.replace("320x240", "640x360");

    Svod.imgMatrix[Svod.imgMatrixCount] = preview_thumbnail;
    Svod.imgMatrixId[Svod.imgMatrixCount] = Svod.Thumbnail + row_id + '_' + coloumn_id;
    Svod.imgMatrixCount++;

    if (Svod.imgMatrixCount <= (Svod.ColoumnsCount * 3)) Svod.newImg.src = preview_thumbnail; //try to pre cache first 4 rows

    Svod.nameMatrix[Svod.nameMatrixCount] = channel_name;
    Svod.nameMatrixCount++;

    return $('<td id="' + Svod.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="' + Svod.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="app/images/video.png"/> \
            <div id="' + Svod.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="' + Svod.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
            <div id="' + Svod.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div> \
            <div id="' + Svod.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div> \
            <div id="' + Svod.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
        '</div> \
             <div id="' + Svod.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
            </div>');
};

Svod.CellExists = function(display_name) {
    for (var i = 0; i <= Svod.nameMatrixCount; i++) {
        if (display_name == Svod.nameMatrix[i]) {
            Svod.blankCellCount++;
            return true;
        }
    }
    return false;
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
Svod.loadDataSuccessFinish = function() {
    $('#stream_table_search_vod').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!Svod.status) {
                Main.HideLoadDialog();
                Svod.status = true;
                Svod.addFocus();
            }

            for (var i = 0; i < Svod.imgMatrix.length; i++) {
                var tumbImg = document.getElementById(Svod.imgMatrixId[i]);
                tumbImg.onerror = function() {
                    this.src = 'app/images/404_video.png'; //img fail to load use predefined
                };

                tumbImg.src = Svod.imgMatrix[i];
            }

            if (Svod.blankCellCount > 0 && !Svod.dataEnded) {
                Svod.loadingMore = true;
                Svod.loadDataReplace();
                return;
            } else Svod.blankCellCount = 0;

            Svod.loadingData = false;
            Svod.loadingMore = false;
        });
};

Svod.loadDataReplace = function() {
    Svod.imgMatrix = [];
    Svod.imgMatrixId = [];
    Svod.imgMatrixCount = 0;
    Svod.loadingData = true;
    Svod.loadingDataTry = 0;
    Svod.loadingDataTimeout = 3500;
    Svod.loadDataRequestReplace();
};

Svod.loadDataRequestReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Svod.itemsCount + Svod.itemsCountOffset;
        if (offset !== 0 && offset >= (Svod.MaxOffset - Svod.ItemsLimit)) {
            offset = Svod.MaxOffset - Svod.ItemsLimit;
            Svod.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/channels/' + encodeURIComponent(Main.selectedChannel) + '/videos?limit=' +
            Svod.ItemsLimit + '&broadcast_type=' + (Svod.highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + offset, true);
        xmlHttp.timeout = Svod.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        Svod.loadDataSuccessReplace(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Svod.loadDataErrorReplace(e.message, null);
    }
};

Svod.loadDataErrorReplace = function(reason, responseText) {
    Svod.loadingDataTry++;
    if (Svod.loadingDataTry < Svod.loadingDataTryMax) {
        Svod.loadingDataTimeout += (Svod.loadingDataTry < 5) ? 250 : 3500;
        Svod.loadDataRequestReplace();
    }
};

Svod.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.videos.length;
    Svod.MaxOffset = parseInt(response._total);

    if (response_items < Svod.ItemsLimit) Svod.ReplacedataEnded = true;

    var row_id = Svod.itemsCount / Svod.ColoumnsCount;

    var coloumn_id, video, mReplace = false,
        cursor = 0;

    for (cursor; cursor < response_items; cursor++) {
        video = response.streams[cursor];
        if (((JSON.stringify(video.preview) + '').indexOf('404_processing_320x240.png') !== -1) || Svod.CellExists(video._id)) coloumn_id--;
        else {
            mReplace = Svod.replaceCellEmpty(Svod.createCell(row_id, coloumn_id, video._id, video.preview,
                STR_STREAM_ON + Main.videoCreatedAt(video.created_at), STR_DURATION + Play.timeMs((parseInt(video.length) / 60) * 60000),
                video.title, Main.addCommas(video.views) + STR_VIEWS,
                Main.videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language)));
            if (mReplace) Svod.blankCellCount--;
            if (Svod.blankCellCount === 0) break;
        }
    }
    Svod.itemsCountOffset += cursor;
    if (Svod.ReplacedataEnded) Svod.blankCellCount = 0;
    Svod.loadDataSuccessFinish();
};

Svod.replaceCellEmpty = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    var my = 0,
        mx = 0;
    if (row_id < ((Svod.ItemsLimit / Svod.ColoumnsCount) - 1)) return false;
    for (my = row_id - (1 + Math.ceil(Svod.blankCellCount / Svod.ColoumnsCount)); my < row_id; my++) {
        for (mx = 0; mx < Svod.ColoumnsCount; mx++) {
            if (!Main.ThumbNull(my, mx, Svod.Thumbnail) && (Main.ThumbNull(my, mx, Svod.EmptyCell))) {
                row_id = my;
                coloumn_id = mx;
                preview_thumbnail = preview_thumbnail.replace("320x240", "640x360");
                Svod.nameMatrix[Svod.nameMatrixCount] = channel_name;
                Svod.nameMatrixCount++;
                document.getElementById(Svod.EmptyCell + row_id + '_' + coloumn_id).setAttribute('id', Svod.Cell + row_id + '_' + coloumn_id);
                document.getElementById(Svod.Cell + row_id + '_' + coloumn_id).setAttribute('data-channelname', channel_name);
                document.getElementById(Svod.Cell + row_id + '_' + coloumn_id).innerHTML =
                    '<img id="' + Svod.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + preview_thumbnail + '"/> \
                    <div id="' + Svod.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
                    <div id="' + Svod.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
                    <div id="' + Svod.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div> \
                    <div id="' + Svod.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div> \
                    <div id="' + Svod.ViwersDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
                    '</div> \
                    <div id="' + Svod.QualityDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
                    </div>';
                return true;
            }
        }
    }

    return false;
};

Svod.addFocus = function() {
    if (((Svod.cursorY + Svod.ItemsReloadLimit) > (Svod.itemsCount / Svod.ColoumnsCount)) &&
        !Svod.dataEnded && !Svod.loadingMore) {
        Svod.loadingMore = true;
        Svod.loadData();
    }

    $('#' + Svod.Thumbnail + Svod.cursorY + '_' + Svod.cursorX).addClass('stream_thumbnail_focused');
    $('#' + Svod.ThumbnailDiv + Svod.cursorY + '_' + Svod.cursorX).addClass('stream_text_focused');
    $('#' + Svod.DispNameDiv + Svod.cursorY + '_' + Svod.cursorX).addClass('stream_channel_focused');
    $('#' + Svod.StreamTitleDiv + Svod.cursorY + '_' + Svod.cursorX).addClass('stream_info_focused');
    $('#' + Svod.StreamGameDiv + Svod.cursorY + '_' + Svod.cursorX).addClass('stream_info_focused');
    $('#' + Svod.ViwersDiv + Svod.cursorY + '_' + Svod.cursorX).addClass('stream_info_focused');
    $('#' + Svod.QualityDiv + Svod.cursorY + '_' + Svod.cursorX).addClass('stream_info_focused');
    window.setTimeout(function() {
        Svod.ScrollHelper.scrollVerticalToElementById(Svod.Thumbnail + Svod.cursorY + '_' + Svod.cursorX);
    }, 10);
};

Svod.removeFocus = function() {
    $('#' + Svod.Thumbnail + Svod.cursorY + '_' + Svod.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + Svod.ThumbnailDiv + Svod.cursorY + '_' + Svod.cursorX).removeClass('stream_text_focused');
    $('#' + Svod.DispNameDiv + Svod.cursorY + '_' + Svod.cursorX).removeClass('stream_channel_focused');
    $('#' + Svod.StreamTitleDiv + Svod.cursorY + '_' + Svod.cursorX).removeClass('stream_info_focused');
    $('#' + Svod.StreamGameDiv + Svod.cursorY + '_' + Svod.cursorX).removeClass('stream_info_focused');
    $('#' + Svod.ViwersDiv + Svod.cursorY + '_' + Svod.cursorX).removeClass('stream_info_focused');
    $('#' + Svod.QualityDiv + Svod.cursorY + '_' + Svod.cursorX).removeClass('stream_info_focused');
};

Svod.keyClickDelay = function() {
    Svod.LastClickFinish = true;
};

Svod.handleKeyDown = function(event) {
    if (Svod.loadingData && !Svod.loadingMore) {
        event.preventDefault();
        return;
    } else if (!Svod.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Svod.LastClickFinish = false;
        window.setTimeout(Svod.keyClickDelay, Svod.keyClickDelayTime);
    }

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            Svod.exit();
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((Svod.cursorY), (Svod.cursorX - 1), Svod.Thumbnail)) {
                Svod.removeFocus();
                Svod.cursorX--;
                Svod.addFocus();
            } else {
                for (i = (Svod.ColoumnsCount - 1); i > -1; i--) {
                    if (Main.ThumbNull((Svod.cursorY - 1), i, Svod.Thumbnail)) {
                        Svod.removeFocus();
                        Svod.cursorY--;
                        Svod.cursorX = i;
                        Svod.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.ThumbNull((Svod.cursorY), (Svod.cursorX + 1), Svod.Thumbnail)) {
                Svod.removeFocus();
                Svod.cursorX++;
                Svod.addFocus();
            } else if (Main.ThumbNull((Svod.cursorY + 1), 0, Svod.Thumbnail)) {
                Svod.removeFocus();
                Svod.cursorY++;
                Svod.cursorX = 0;
                Svod.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Svod.ColoumnsCount; i++) {
                if (Main.ThumbNull((Svod.cursorY - 1), (Svod.cursorX - i), Svod.Thumbnail)) {
                    Svod.removeFocus();
                    Svod.cursorY--;
                    Svod.cursorX = Svod.cursorX - i;
                    Svod.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Svod.ColoumnsCount; i++) {
                if (Main.ThumbNull((Svod.cursorY + 1), (Svod.cursorX - i), Svod.Thumbnail)) {
                    Svod.removeFocus();
                    Svod.cursorY++;
                    Svod.cursorX = Svod.cursorX - i;
                    Svod.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            Svod.highlight = !Svod.highlight;
            if (!Svod.loadingMore) Svod.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
        case TvKeyCode.KEY_CHANNELDOWN:
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            //Main.selectedChannel = $('#' + Svod.Cell + Svod.cursorY + '_' + Svod.cursorX).attr('data-channelname');
            //Main.selectedChannelDisplayname = document.getElementById(Svod.DispNameDiv + Svod.cursorY + '_' + Svod.cursorX).textContent;
            //document.body.removeEventListener("keydown", Svod.handleKeyDown);
            //Main.openStream();
            break;
        case TvKeyCode.KEY_RED:
            break;
        case TvKeyCode.KEY_GREEN:
            break;
        case TvKeyCode.KEY_YELLOW:
            break;
        case TvKeyCode.KEY_BLUE:
            Main.Go = Main.Search;
            Svod.exit();
            break;
        case TvKeyCode.KEY_VOLUMEUP:
        case TvKeyCode.KEY_VOLUMEDOWN:
        case TvKeyCode.KEY_MUTE:
            break;
        default:
            break;
    }
};

Svod.ScrollHelper = {
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
        if (Main.Go === Main.Svod) {
            if (id.indexOf(Svod.Thumbnail + '0_') == -1) {
                $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight());
            } else {
                $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight() + 290); // check Games.ScrollHelper to understand the "290"
            }
        } else return;
    }
};
