/*jshint multistr: true */
//Variable initialization
function Sclip() {}
Sclip.Thumbnail = 'thumbnail_sclip_';
Sclip.EmptyCell = 'sclip_empty_';
Sclip.cursorY = 0;
Sclip.cursorX = 0;
Sclip.dataEnded = false;
Sclip.itemsCount = 0;
Sclip.imgMatrix = [];
Sclip.imgMatrixId = [];
Sclip.imgMatrixCount = 0;
Sclip.nameMatrix = [];
Sclip.nameMatrixCount = 0;
Sclip.loadingData = false;
Sclip.loadingDataTry = 1;
Sclip.loadingDataTryMax = 10;
Sclip.loadingDataTimeout = 3500;
Sclip.isDialogOn = false;
Sclip.ItemsLimit = 99;
Sclip.ColoumnsCount = 3;
Sclip.ItemsReloadLimit = Math.floor((Sclip.ItemsLimit / Sclip.ColoumnsCount) / 2);
Sclip.newImg = new Image();
Sclip.blankCellCount = 0;
Sclip.LastClickFinish = true;
Sclip.keyClickDelayTime = 25;
Sclip.ReplacedataEnded = false;
Sclip.MaxOffset = 0;
Sclip.loadingReplace = false;
Sclip.DurationSeconds = 0;

Sclip.ThumbnailDiv = 'sclip_thumbnail_div_';
Sclip.DispNameDiv = 'sclip_display_name_';
Sclip.StreamTitleDiv = 'sclip_video_created_at_';
Sclip.StreamGameDiv = 'sclip_stream_sclip_';
Sclip.viewsDiv = 'sclip_views_';
Sclip.DurationDiv = 'sclip_duration_';
Sclip.Cell = 'sclip_cell_';
Sclip.status = false;
Sclip.highlight = false;
Sclip.cursor = null;
Sclip.periodNumber = 1;
Sclip.period = 'week';
Sclip.Duration = 0;
Sclip.game = '';
Sclip.views = '';
Sclip.title = '';
Sclip.lastselectedChannel = '';
Sclip.playUrl = '';

//Variable initialization end

Sclip.init = function() {
    Main.Go = Main.Sclip;
    if (Main.selectedChannel !== Sclip.lastselectedChannel) Sclip.status = false;
    Main.cleanTopLabel();
    Sclip.SetPeriod();
    $('.lable_user').html(Main.selectedChannelDisplayname);
    document.getElementById("top_bar_spacing").style.paddingLeft = "21.5%";
    $('.label_switch').html('<i class="fa fa-exchange" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_SWITCH_CLIP);
    document.body.addEventListener("keydown", Sclip.handleKeyDown, false);
    if (Sclip.status) Main.ScrollHelper.scrollVerticalToElementById(Sclip.Thumbnail, Sclip.cursorY, Sclip.cursorX, Main.Sclip, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
    else Sclip.StartLoad();
};

Sclip.exit = function() {
    Main.RestoreTopLabel();
    document.body.removeEventListener("keydown", Sclip.handleKeyDown);
};

Sclip.StartLoad = function() {
    Main.HideWarningDialog();
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    Sclip.lastselectedChannel = Main.selectedChannel;
    Sclip.loadingReplace = false;
    Sclip.cursor = null;
    Sclip.status = false;
    $('#stream_table_search_clip').empty();
    Sclip.loadingMore = false;
    Sclip.blankCellCount = 0;
    Sclip.ReplacedataEnded = false;
    Sclip.MaxOffset = 0;
    Sclip.nameMatrix = [];
    Sclip.nameMatrixCount = 0;
    Sclip.itemsCount = 0;
    Sclip.cursorX = 0;
    Sclip.cursorY = 0;
    Sclip.dataEnded = false;
    Sclip.loadData();
};

Sclip.loadData = function() {
    Sclip.imgMatrix = [];
    Sclip.imgMatrixId = [];
    Sclip.imgMatrixCount = 0;
    Sclip.loadingData = true;
    Sclip.loadingDataTry = 0;
    Sclip.loadingDataTimeout = 3500;
    Sclip.loadDataRequest();
};

Sclip.SetPeriod = function() {
    if (Sclip.periodNumber === 0) {
        $('.lable_game').html(STR_CLIPS + STR_CLIP_DAY);
        Sclip.period = 'day';
    } else if (Sclip.periodNumber === 1) {
        $('.lable_game').html(STR_CLIPS + STR_CLIP_WEEK);
        Sclip.period = 'week';
    } else if (Sclip.periodNumber === 2) {
        $('.lable_game').html(STR_CLIPS + STR_CLIP_MONTH);
        Sclip.period = 'month';
    } else if (Sclip.periodNumber === 3) {
        $('.lable_game').html(STR_CLIPS + STR_CLIP_ALL);
        Sclip.period = 'all';
    }
};

Sclip.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?channel=' + encodeURIComponent(Main.selectedChannel) + '&limit=' +
            Sclip.ItemsLimit + '&period=' + encodeURIComponent(Sclip.period) +
            (Sclip.cursor === null ? '' : '&cursor=' + encodeURIComponent(Sclip.cursor)), true);
        xmlHttp.timeout = Sclip.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        Sclip.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    Sclip.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Sclip.loadDataError();
    }
};

Sclip.loadDataError = function() {
    Sclip.loadingDataTry++;
    if (Sclip.loadingDataTry < Sclip.loadingDataTryMax) {
        Sclip.loadingDataTimeout += (Sclip.loadingDataTry < 5) ? 250 : 3500;
        Sclip.loadDataRequest();
    } else {
        Sclip.loadingData = false;
        Sclip.loadingMore = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

Sclip.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.clips.length;
    Sclip.cursor = response._cursor;

    if (response_items < Sclip.ItemsLimit) Sclip.dataEnded = true;

    var offset_itemsCount = Sclip.itemsCount;
    Sclip.itemsCount += response_items;

    var response_rows = response_items / Sclip.ColoumnsCount;
    if (response_items % Sclip.ColoumnsCount > 0) response_rows++;

    var coloumn_id, row_id, row, stream, vod_id, vod_offset,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Sclip.ColoumnsCount + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Sclip.ColoumnsCount && cursor < response_items; coloumn_id++, cursor++) {
            video = response.clips[cursor];
            vod_id = video.thumbnails.medium.split('-preview')[0] + '.mp4';
            if (Sclip.CellExists(video.tracking_id)) coloumn_id--;
            else {
                row.append(Sclip.createCell(row_id, coloumn_id, vod_id, video.thumbnails.medium, STR_STREAM_ON + Main.videoCreatedAt(video.created_at),
                    video.duration, video.title, Main.addCommas(video.views) + STR_VIEWS, video.game));
            }
        }

        for (coloumn_id; coloumn_id < Sclip.ColoumnsCount; coloumn_id++) {
            row.append(Sclip.createCellEmpty(row_id, coloumn_id));
        }
        $('#stream_table_search_clip').append(row);
    }

    Sclip.loadDataSuccessFinish();
};

Sclip.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="' + Sclip.EmptyCell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
};

Sclip.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, video_created_at, video_duration, video_title, views, game) {
    //preview_thumbnail = preview_thumbnail.replace("480x272", "640x360");

    Sclip.imgMatrix[Sclip.imgMatrixCount] = preview_thumbnail;
    Sclip.imgMatrixId[Sclip.imgMatrixCount] = Sclip.Thumbnail + row_id + '_' + coloumn_id;
    Sclip.imgMatrixCount++;

    if (Sclip.imgMatrixCount <= (Sclip.ColoumnsCount * 3)) Sclip.newImg.src = preview_thumbnail; //try to pre cache first 4 rows

    Sclip.nameMatrix[Sclip.nameMatrixCount] = channel_name;
    Sclip.nameMatrixCount++;

    return $('<td id="' + Sclip.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name +
        '" data-durationseconds=" ' + video_duration + '"></td>').html(
        '<img id="' + Sclip.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="app/images/video.png"/> \
            <div id="' + Sclip.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="' + Sclip.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_info">' + video_title + '</div> \
            <div id="' + Sclip.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + game + '</div> \
            <div id="' + Sclip.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + video_created_at + '</div> \
            <div id="' + Sclip.viewsDiv + row_id + '_' + coloumn_id +
        '"class="stream_info_games" style="width: 48%; display: inline-block;">' + views + '</div> \
            <div id="' + Sclip.DurationDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:48%; text-align: right; float: right; display: inline-block;">' + STR_DURATION + Play.timeS(video_duration) + '</div> \
            </div>');
};

Sclip.CellExists = function(display_name) {
    for (var i = 0; i <= Sclip.nameMatrixCount; i++) {
        if (display_name == Sclip.nameMatrix[i]) {
            Sclip.blankCellCount++;
            return true;
        }
    }
    return false;
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
Sclip.loadDataSuccessFinish = function() {
    $('#stream_table_search_clip').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!Sclip.status) {
                Main.HideLoadDialog();
                Sclip.status = true;
                Sclip.addFocus();
            }
            if (!Sclip.loadingReplace) {
                for (var i = 0; i < Sclip.imgMatrix.length; i++) {
                    var tumbImg = document.getElementById(Sclip.imgMatrixId[i]);
                    tumbImg.onerror = function() {
                        this.src = 'app/images/404_video.png'; //img fail to load use predefined
                    };
                    tumbImg.src = Sclip.imgMatrix[i];
                }
            }
            if (Sclip.blankCellCount > 0 && !Sclip.dataEnded) {
                Sclip.loadingMore = true;
                Sclip.loadingReplace = true;
                Sclip.loadDataReplace();
                return;
            } else Sclip.blankCellCount = 0;

            Sclip.loadingReplace = false;
            Sclip.loadingData = false;
            Sclip.loadingMore = false;
        });
};

Sclip.loadDataReplace = function() {
    Sclip.loadingData = true;
    Sclip.loadingDataTry = 0;
    Sclip.loadingDataTimeout = 3500;
    Sclip.loadDataRequestReplace();
};

Sclip.loadDataRequestReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?channel=' + encodeURIComponent(Main.selectedChannel) + '&limit=' +
            Sclip.blankCellCount + '&period=' + Sclip.period + (Sclip.cursor === null ? '' : '&cursor=' + encodeURIComponent(Sclip.cursor)), true);
        xmlHttp.timeout = Sclip.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        Sclip.loadDataSuccessReplace(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Sclip.loadDataErrorReplace();
    }
};

Sclip.loadDataErrorReplace = function() {
    Sclip.loadingDataTry++;
    if (Sclip.loadingDataTry < Sclip.loadingDataTryMax) {
        Sclip.loadingDataTimeout += (Sclip.loadingDataTry < 5) ? 250 : 3500;
        Sclip.loadDataRequestReplace();
    }
};

Sclip.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.clips.length;
    Sclip.cursor = response._cursor;

    if (response_items < Sclip.blankCellCount) Sclip.ReplacedataEnded = true;

    var row_id = Sclip.itemsCount / Sclip.ColoumnsCount;

    var coloumn_id, video, vod_id, mReplace = false,
        cursor = 0;
    for (cursor; cursor < response_items; cursor++) {
        video = response.clips[cursor];
        vod_id = video.thumbnails.medium.split('-preview')[0] + '.mp4';
        if (Sclip.CellExists(video.tracking_id)) Sclip.blankCellCount--;
        else {
            mReplace = Sclip.replaceCellEmpty(row_id, coloumn_id, vod_id, video.thumbnails.medium,
                STR_STREAM_ON + Main.videoCreatedAt(video.created_at), video.duration, video.title, Main.addCommas(video.views) + STR_VIEWS, video.game);
            if (mReplace) Sclip.blankCellCount--;
            if (Sclip.blankCellCount === 0) break;
        }
    }
    if (Sclip.ReplacedataEnded) Sclip.blankCellCount = 0;
    Sclip.loadDataSuccessFinish();
};

Sclip.replaceCellEmpty = function(row_id, coloumn_id, channel_name, preview_thumbnail, video_created_at, video_duration, video_title, views, game) {
    var my = 0,
        mx = 0;
    for (my = row_id - (1 + Math.ceil(Sclip.blankCellCount / Sclip.ColoumnsCount)); my < row_id; my++) {
        for (mx = 0; mx < Sclip.ColoumnsCount; mx++) {
            if (!Main.ThumbNull(my, mx, Sclip.Thumbnail) && (Main.ThumbNull(my, mx, Sclip.EmptyCell))) {
                row_id = my;
                coloumn_id = mx;
                Sclip.nameMatrix[Sclip.nameMatrixCount] = channel_name;
                Sclip.nameMatrixCount++;

                document.getElementById(Sclip.EmptyCell + row_id + '_' + coloumn_id).setAttribute('id', Sclip.Cell + row_id + '_' + coloumn_id);
                document.getElementById(Sclip.Cell + row_id + '_' + coloumn_id).setAttribute('data-channelname', channel_name);
                document.getElementById(Sclip.Cell + row_id + '_' + coloumn_id).setAttribute('data-durationseconds', video_duration);
                document.getElementById(Sclip.Cell + row_id + '_' + coloumn_id).innerHTML =
                    '<img id="' + Sclip.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + preview_thumbnail + '"/> \
                    <div id="' + Sclip.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
                    <div id="' + Sclip.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_info">' + video_title + '</div> \
                    <div id="' + Sclip.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + game + '</div> \
                    <div id="' + Sclip.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + video_created_at + '</div> \
                    <div id="' + Sclip.viewsDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info_games" style="width: 48%; display: inline-block;">' + views + '</div> \
                    <div id="' + Sclip.DurationDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info" style="width:48%; text-align: right; float: right; display: inline-block;">' + STR_DURATION +
                    Play.timeS(video_duration) + '</div> \
                    </div>';
                return true;
            }
        }
    }

    return false;
};

Sclip.addFocus = function() {
    if (((Sclip.cursorY + Sclip.ItemsReloadLimit) > (Sclip.itemsCount / Sclip.ColoumnsCount)) &&
        !Sclip.dataEnded && !Sclip.loadingMore) {
        Sclip.loadingMore = true;
        Sclip.loadData();
    }

    $('#' + Sclip.Thumbnail + Sclip.cursorY + '_' + Sclip.cursorX).addClass('stream_thumbnail_focused');
    $('#' + Sclip.ThumbnailDiv + Sclip.cursorY + '_' + Sclip.cursorX).addClass('stream_text_focused');
    $('#' + Sclip.DispNameDiv + Sclip.cursorY + '_' + Sclip.cursorX).addClass('stream_info_focused');
    $('#' + Sclip.StreamTitleDiv + Sclip.cursorY + '_' + Sclip.cursorX).addClass('stream_info_focused');
    $('#' + Sclip.StreamGameDiv + Sclip.cursorY + '_' + Sclip.cursorX).addClass('stream_info_focused');
    $('#' + Sclip.viewsDiv + Sclip.cursorY + '_' + Sclip.cursorX).addClass('stream_info_focused');
    $('#' + Sclip.DurationDiv + Sclip.cursorY + '_' + Sclip.cursorX).addClass('stream_info_focused');

    window.setTimeout(function() {
        Main.ScrollHelper.scrollVerticalToElementById(Sclip.Thumbnail, Sclip.cursorY, Sclip.cursorX, Main.Sclip, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
    }, 10);
};

Sclip.removeFocus = function() {
    $('#' + Sclip.Thumbnail + Sclip.cursorY + '_' + Sclip.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + Sclip.ThumbnailDiv + Sclip.cursorY + '_' + Sclip.cursorX).removeClass('stream_text_focused');
    $('#' + Sclip.DispNameDiv + Sclip.cursorY + '_' + Sclip.cursorX).removeClass('stream_info_focused');
    $('#' + Sclip.StreamTitleDiv + Sclip.cursorY + '_' + Sclip.cursorX).removeClass('stream_info_focused');
    $('#' + Sclip.StreamGameDiv + Sclip.cursorY + '_' + Sclip.cursorX).removeClass('stream_info_focused');
    $('#' + Sclip.viewsDiv + Sclip.cursorY + '_' + Sclip.cursorX).removeClass('stream_info_focused');
    $('#' + Sclip.DurationDiv + Sclip.cursorY + '_' + Sclip.cursorX).removeClass('stream_info_focused');
};

Sclip.keyClickDelay = function() {
    Sclip.LastClickFinish = true;
};

Sclip.handleKeyDown = function(event) {
    if (Sclip.loadingData && !Sclip.loadingMore) {
        event.preventDefault();
        return;
    } else if (!Sclip.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Sclip.LastClickFinish = false;
        window.setTimeout(Sclip.keyClickDelay, Sclip.keyClickDelayTime);
    }

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                Main.Go = Main.SChannelContent;
                Sclip.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((Sclip.cursorY), (Sclip.cursorX - 1), Sclip.Thumbnail)) {
                Sclip.removeFocus();
                Sclip.cursorX--;
                Sclip.addFocus();
            } else {
                for (i = (Sclip.ColoumnsCount - 1); i > -1; i--) {
                    if (Main.ThumbNull((Sclip.cursorY - 1), i, Sclip.Thumbnail)) {
                        Sclip.removeFocus();
                        Sclip.cursorY--;
                        Sclip.cursorX = i;
                        Sclip.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.ThumbNull((Sclip.cursorY), (Sclip.cursorX + 1), Sclip.Thumbnail)) {
                Sclip.removeFocus();
                Sclip.cursorX++;
                Sclip.addFocus();
            } else if (Main.ThumbNull((Sclip.cursorY + 1), 0, Sclip.Thumbnail)) {
                Sclip.removeFocus();
                Sclip.cursorY++;
                Sclip.cursorX = 0;
                Sclip.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Sclip.ColoumnsCount; i++) {
                if (Main.ThumbNull((Sclip.cursorY - 1), (Sclip.cursorX - i), Sclip.Thumbnail)) {
                    Sclip.removeFocus();
                    Sclip.cursorY--;
                    Sclip.cursorX = Sclip.cursorX - i;
                    Sclip.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Sclip.ColoumnsCount; i++) {
                if (Main.ThumbNull((Sclip.cursorY + 1), (Sclip.cursorX - i), Sclip.Thumbnail)) {
                    Sclip.removeFocus();
                    Sclip.cursorY++;
                    Sclip.cursorX = Sclip.cursorX - i;
                    Sclip.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            break;
        case TvKeyCode.KEY_CHANNELUP:
            if (!Sclip.loadingMore) {
                Sclip.periodNumber++;
                if (Sclip.periodNumber > 3) Sclip.periodNumber = 0;
                Sclip.SetPeriod();
                Sclip.StartLoad();
            }
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            if (!Sclip.loadingMore) {
                Sclip.periodNumber--;
                if (Sclip.periodNumber < 0) Sclip.periodNumber = 3;
                Sclip.SetPeriod();
                Sclip.StartLoad();
            }
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Sclip.playUrl = $('#' + Sclip.Cell + Sclip.cursorY + '_' + Sclip.cursorX).attr('data-channelname');
            Sclip.DurationSeconds = parseInt($('#' + Sclip.Cell + Sclip.cursorY + '_' + Sclip.cursorX).attr('data-durationseconds'));
            Sclip.Duration = document.getElementById(Sclip.DurationDiv + Sclip.cursorY + '_' + Sclip.cursorX).textContent;
            Sclip.views = document.getElementById(Sclip.viewsDiv + Sclip.cursorY + '_' + Sclip.cursorX).textContent;
            Sclip.title = document.getElementById(Sclip.DispNameDiv + Sclip.cursorY + '_' + Sclip.cursorX).textContent;
            Sclip.createdAt = document.getElementById(Sclip.StreamTitleDiv + Sclip.cursorY + '_' + Sclip.cursorX).textContent;
            Sclip.game = document.getElementById(Sclip.StreamGameDiv + Sclip.cursorY + '_' + Sclip.cursorX).textContent;
            Sclip.openStream();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Main.Go = Main.Live;
            Sclip.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.Sclip;
            Main.Go = Main.Search;
            Sclip.exit();
            Main.SwitchScreen();
            break;
        default:
            break;
    }
};

Sclip.openStream = function() {
    document.body.addEventListener("keydown", PlayClip.handleKeyDown, false);
    document.body.removeEventListener("keydown", Sclip.handleKeyDown);
    $("#scene2").show();
    PlayClip.hidePanel();
    $("#play_clip_dialog_simple_pause").hide();
    $("#play_clip_dialog_exit").hide();
    $("#dialog_warning_play").hide();
    $("#scene1").hide();
    PlayClip.Start();
};
