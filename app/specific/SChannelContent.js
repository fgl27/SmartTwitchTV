/*jshint multistr: true */
//Variable initialization
function SChannelContent() {}
SChannelContent.Thumbnail = 'thumbnail_schannels_cont_';
SChannelContent.EmptyCell = 'schannels_cont_empty_';
SChannelContent.cursorY = 0;
SChannelContent.cursorX = 0;
SChannelContent.dataEnded = false;
SChannelContent.itemsCount = 0;
SChannelContent.imgMatrix = '';
SChannelContent.imgMatrixId = '';
SChannelContent.nameMatrix = [];
SChannelContent.nameMatrixCount = 0;
SChannelContent.loadingData = false;
SChannelContent.loadingDataTry = 0;
SChannelContent.loadingDataTryMax = 10;
SChannelContent.loadingDataTimeout = 3500;
SChannelContent.ItemsLimit = 96;
SChannelContent.ColoumnsCount = 6;
SChannelContent.ItemsReloadLimit = Math.floor((SChannelContent.ItemsLimit / SChannelContent.ColoumnsCount) / 2);
SChannelContent.blankCellCount = 0;
SChannelContent.itemsCountOffset = 0;
SChannelContent.LastClickFinish = true;
SChannelContent.keyClickDelayTime = 25;
SChannelContent.MaxOffset = 0;
SChannelContent.skipImg = false;

SChannelContent.ThumbnailDiv = 'schannels_cont_thumbnail_div_';
SChannelContent.DispNameDiv = 'schannels_cont_display_name_';
SChannelContent.StreamTitleDiv = 'schannels_cont_stream_title_';
SChannelContent.StreamGameDiv = 'schannels_cont_stream_game_';
SChannelContent.ViwersDiv = 'schannels_cont_stream_viwers_';
SChannelContent.QualityDiv = 'schannels_cont_stream_quality_';
SChannelContent.Cell = 'schannels_cont_cell_';
SChannelContent.status = false;
SChannelContent.lastselectedChannel = '';

//Variable initialization end

SChannelContent.init = function() {
    Main.Go = Main.SChannelContent;
    if (SChannelContent.lastselectedChannel !== Main.selectedChannel) SChannelContent.status = false;
    Main.cleanTopLabel();
    document.getElementById("top_bar_spacing").style.paddingLeft = "21.5%";
    $('.lable_user').html(Main.selectedChannelDisplayname);
    $('.lable_game').html(STR_CHANNEL + STR_CONTENT);
    $('.label_agame_name').html('');
    document.body.addEventListener("keydown", SChannelContent.handleKeyDown, false);
    if (SChannelContent.status) Main.ScrollHelper.scrollVerticalToElementById(SChannelContent.Thumbnail, SChannelContent.cursorY, SChannelContent.cursorX, Main.SChannelContent, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
    else SChannelContent.StartLoad();
};

SChannelContent.exit = function() {
    Main.RestoreTopLabel();
    document.body.removeEventListener("keydown", SChannelContent.handleKeyDown);
};

SChannelContent.StartLoad = function() {
    Main.HideWarningDialog();
    SChannelContent.lastselectedChannel = Main.selectedChannel;
    SChannelContent.status = false;
    SChannelContent.skipImg = false;
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_search_channel_a').empty();
    SChannelContent.loadingMore = false;
    SChannelContent.blankCellCount = 0;
    SChannelContent.itemsCountOffset = 0;
    SChannelContent.MaxOffset = 0;
    SChannelContent.nameMatrix = [];
    SChannelContent.nameMatrixCount = 0;
    SChannelContent.itemsCount = 0;
    SChannelContent.cursorX = 0;
    SChannelContent.cursorY = 0;
    SChannelContent.dataEnded = false;
    SChannelContent.loadData();
};

SChannelContent.loadData = function() {
    SChannelContent.imgMatrix = '';
    SChannelContent.imgMatrixId = '';
    SChannelContent.loadingData = true;
    SChannelContent.loadingDataTry = 0;
    SChannelContent.loadingDataTimeout = 3500;
    SChannelContent.loadDataRequest();
};

SChannelContent.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + encodeURIComponent(Main.selectedChannel) + '?' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SChannelContent.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        SChannelContent.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    SChannelContent.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SChannelContent.loadDataError();
    }
};

SChannelContent.loadDataError = function() {
    SChannelContent.loadingDataTry++;
    if (SChannelContent.loadingDataTry < SChannelContent.loadingDataTryMax) {
        SChannelContent.loadingDataTimeout += (SChannelContent.loadingDataTry < 5) ? 250 : 3500;
        SChannelContent.loadDataRequest();
    } else {
        SChannelContent.loadingData = false;
        SChannelContent.loadingMore = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

SChannelContent.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var row = $('<tr></tr>');
    var coloumn_id = 0;

    if (response.stream !== null) {
        var stream = response.stream;
        row.append(SChannelContent.createCell(0, coloumn_id, stream.channel.name, stream.preview.template,
            stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
            stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
            Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)));
        coloumn_id++;
    } else SChannelContent.skipImg = true;

    row.append(SChannelContent.createChannelCell(0, coloumn_id, Main.selectedChannelDisplayname, Main.selectedChannelDisplayname + STR_PAST_BROA));
    coloumn_id++;
    row.append(SChannelContent.createChannelCell(0, coloumn_id, Main.selectedChannelDisplayname, Main.selectedChannelDisplayname + STR_CLIPS));

    if (coloumn_id < 2) {
        coloumn_id++;
        row.append(SChannelContent.createCellEmpty(0, coloumn_id));
    }

    $('#stream_table_search_channel_a').append(row);

    SChannelContent.loadDataSuccessFinish();
};

SChannelContent.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="' + SChannelContent.EmptyCell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
};

SChannelContent.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "640x360");

    SChannelContent.imgMatrix = preview_thumbnail;
    SChannelContent.imgMatrixId = SChannelContent.Thumbnail + row_id + '_' + coloumn_id;

    return $('<td id="' + SChannelContent.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="' + SChannelContent.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_VIDEO + '"/> \
            <div id="' + SChannelContent.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="' + SChannelContent.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
            <div id="' + SChannelContent.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div> \
            <div id="' + SChannelContent.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div> \
            <div id="' + SChannelContent.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 64%; display: inline-block;">' +
        '<i class="fa fa-circle" style="color: red; font-size: 100%; aria-hidden="true"></i> ' + viwers + '</div> \
             <div id="' + SChannelContent.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
            </div>');
};

SChannelContent.createChannelCell = function(row_id, coloumn_id, user_name, stream_type) {
    var thumbnail = IMG_BLUR_VOD;
    if (coloumn_id == 1) thumbnail = IMG_BLUR_VIDEO2;

    return $('<td id="' + SChannelContent.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + user_name + '"></td>').html(
        '<img id="' + SChannelContent.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + thumbnail + '"/> \
            <div id="' + SChannelContent.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="' + SChannelContent.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + stream_type + '</div> \
            <div id="' + SChannelContent.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info"></div> \
            <div id="' + SChannelContent.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info"></div> \
            <div id="' + SChannelContent.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info" ></div> \
            <div id="' + SChannelContent.QualityDiv + row_id + '_' + coloumn_id + '"class="stream_info"></div> \
            </div>');
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
SChannelContent.loadDataSuccessFinish = function() {
    $('#stream_table_search_channel_a').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!SChannelContent.status) {
                Main.HideLoadDialog();
                SChannelContent.status = true;
                SChannelContent.addFocus();
                Main.ScrollHelper.scrollVerticalToElementById(SChannelContent.Thumbnail, SChannelContent.cursorY, SChannelContent.cursorX, Main.SChannelContent, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
            }

            if (!SChannelContent.skipImg) {
                var tumbImg = document.getElementById(SChannelContent.imgMatrixId);
                tumbImg.onerror = function() {
                    this.src = IMG_404_VIDEO; //img fail to load use predefined
                };
                tumbImg.src = SChannelContent.imgMatrix;
            }

            SChannelContent.loadingData = false;
        });
};

SChannelContent.addFocus = function() {
    $('#' + SChannelContent.Thumbnail + SChannelContent.cursorY + '_' + SChannelContent.cursorX).addClass('stream_thumbnail_focused');
    $('#' + SChannelContent.ThumbnailDiv + SChannelContent.cursorY + '_' + SChannelContent.cursorX).addClass('stream_text_focused');
    $('#' + SChannelContent.DispNameDiv + SChannelContent.cursorY + '_' + SChannelContent.cursorX).addClass('stream_channel_focused');
    $('#' + SChannelContent.StreamTitleDiv + SChannelContent.cursorY + '_' + SChannelContent.cursorX).addClass('stream_info_focused');
    $('#' + SChannelContent.StreamGameDiv + SChannelContent.cursorY + '_' + SChannelContent.cursorX).addClass('stream_info_focused');
    $('#' + SChannelContent.ViwersDiv + SChannelContent.cursorY + '_' + SChannelContent.cursorX).addClass('stream_info_focused');
    $('#' + SChannelContent.QualityDiv + SChannelContent.cursorY + '_' + SChannelContent.cursorX).addClass('stream_info_focused');
};

SChannelContent.removeFocus = function() {
    $('#' + SChannelContent.Thumbnail + SChannelContent.cursorY + '_' + SChannelContent.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + SChannelContent.ThumbnailDiv + SChannelContent.cursorY + '_' + SChannelContent.cursorX).removeClass('stream_text_focused');
    $('#' + SChannelContent.DispNameDiv + SChannelContent.cursorY + '_' + SChannelContent.cursorX).removeClass('stream_channel_focused');
    $('#' + SChannelContent.StreamTitleDiv + SChannelContent.cursorY + '_' + SChannelContent.cursorX).removeClass('stream_info_focused');
    $('#' + SChannelContent.StreamGameDiv + SChannelContent.cursorY + '_' + SChannelContent.cursorX).removeClass('stream_info_focused');
    $('#' + SChannelContent.ViwersDiv + SChannelContent.cursorY + '_' + SChannelContent.cursorX).removeClass('stream_info_focused');
    $('#' + SChannelContent.QualityDiv + SChannelContent.cursorY + '_' + SChannelContent.cursorX).removeClass('stream_info_focused');
};

SChannelContent.keyClickDelay = function() {
    SChannelContent.LastClickFinish = true;
};

SChannelContent.keyEnter = function() {
    document.body.removeEventListener("keydown", SChannelContent.handleKeyDown);
    var value = (!SChannelContent.skipImg ? 0 : 1);
    if (SChannelContent.cursorX === (0 - value)) {
        Play.selectedChannel = $('#' + SChannelContent.Cell + SChannelContent.cursorY + '_' + SChannelContent.cursorX).attr('data-channelname');
        Play.selectedChannelDisplayname = document.getElementById(SChannelContent.DispNameDiv + SChannelContent.cursorY + '_' + SChannelContent.cursorX).textContent;
        Main.openStream();
    } else if (SChannelContent.cursorX === (1 - value)) Svod.init();
    else if (SChannelContent.cursorX === (2 - value)) Sclip.init();
};

SChannelContent.handleKeyDown = function(event) {
    if (SChannelContent.loadingData && !SChannelContent.loadingMore) {
        event.preventDefault();
        return;
    } else if (!SChannelContent.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        SChannelContent.LastClickFinish = false;
        window.setTimeout(SChannelContent.keyClickDelay, SChannelContent.keyClickDelayTime);
    }

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                Main.Go = Main.Before;
                SChannelContent.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            SChannelContent.removeFocus();
            SChannelContent.cursorX--;
            if (SChannelContent.cursorX < 0) SChannelContent.cursorX = (!SChannelContent.skipImg ? 2 : 1);
            SChannelContent.addFocus();
            break;
        case TvKeyCode.KEY_RIGHT:
            SChannelContent.removeFocus();
            SChannelContent.cursorX++;
            if (SChannelContent.cursorX > (!SChannelContent.skipImg ? 2 : 1)) SChannelContent.cursorX = 0;
            SChannelContent.addFocus();
            break;
        case TvKeyCode.KEY_UP:
        case TvKeyCode.KEY_DOWN:
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!SChannelContent.loadingMore) SChannelContent.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
        case TvKeyCode.KEY_CHANNELDOWN:
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            SChannelContent.keyEnter();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Main.Go = Main.Live;
            SChannelContent.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.SChannelContent;
            Main.Go = Main.Search;
            Main.RestoreTopLabel();
            document.body.removeEventListener("keydown", SChannelContent.handleKeyDown);
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_VOLUMEUP:
        case TvKeyCode.KEY_VOLUMEDOWN:
        case TvKeyCode.KEY_MUTE:
            break;
        default:
            break;
    }
};
