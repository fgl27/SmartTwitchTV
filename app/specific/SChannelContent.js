/*jshint multistr: true */
//Variable initialization
function SChannelContent() {}
SChannelContent.cursorY = 0;
SChannelContent.cursorX = 0;
SChannelContent.dataEnded = false;
SChannelContent.itemsCount = 0;
SChannelContent.imgMatrix = '';
SChannelContent.imgMatrixId = '';
SChannelContent.loadingData = false;
SChannelContent.loadingDataTry = 0;
SChannelContent.loadingDataTryMax = 10;
SChannelContent.loadingDataTimeout = 3500;
SChannelContent.itemsCountOffset = 0;
SChannelContent.LastClickFinish = true;
SChannelContent.keyClickDelayTime = 25;
SChannelContent.skipImg = false;

SChannelContent.Img = 'img_schannels';
SChannelContent.Thumbnail = 'thumbnail_schannels_cont_';
SChannelContent.EmptyCell = 'schannels_cont_empty_';
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
    document.getElementById("top_bar_spacing").style.paddingLeft = Main.TopSpacingSearchUnder + "%";
    $('.lable_user').html(Main.selectedChannelDisplayname);
    $('.lable_game').html(STR_CHANNEL_CONT);
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
    SChannelContent.itemsCountOffset = 0;
    SChannelContent.itemsCount = 0;
    SChannelContent.cursorX = 0;
    SChannelContent.cursorY = 0;
    SChannelContent.dataEnded = false;
    SChannelContent.loadDataPrepare();
    SChannelContent.loadDataRequest();
};

SChannelContent.loadDataPrepare = function() {
    SChannelContent.imgMatrix = [];
    SChannelContent.imgMatrixId = [];
    SChannelContent.imgMatrixCount = 0;
    SChannelContent.loadingData = true;
    SChannelContent.loadingDataTry = 0;
    SChannelContent.loadingDataTimeout = 3500;
};

SChannelContent.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + encodeURIComponent(Main.selectedChannel) + '?' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SChannelContent.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
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

    row.append(SChannelContent.createChannelCell(0, coloumn_id, Main.selectedChannelDisplayname, Main.selectedChannelDisplayname + STR_PAST_BROA, IMG_BLUR_VIDEO1_16));
    coloumn_id++;
    row.append(SChannelContent.createChannelCell(0, coloumn_id, Main.selectedChannelDisplayname, Main.selectedChannelDisplayname + STR_CLIPS, IMG_BLUR_VIDEO2_16));

    if (coloumn_id < 2) {
        coloumn_id++;
        row.append(Main.createCellEmpty(0, coloumn_id, SChannelContent.EmptyCell));
    }

    $('#stream_table_search_channel_a').append(row);

    SChannelContent.loadDataSuccessFinish();
};

SChannelContent.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main.VideoSize);

    SChannelContent.imgMatrix[SChannelContent.imgMatrixCount] = preview_thumbnail;
    SChannelContent.imgMatrixId[SChannelContent.imgMatrixCount] = SChannelContent.Img + row_id + '_' + coloumn_id;
    SChannelContent.imgMatrixCount++;

    return $('<td id="' + SChannelContent.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<div id="' + SChannelContent.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_video" ><img id="' + SChannelContent.Img +
        row_id + '_' + coloumn_id + '" class="stream_img" src="//:0"/></div>' +
        '<div id="' + SChannelContent.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + SChannelContent.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div>' +
        '<div id="' + SChannelContent.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + SChannelContent.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div>' +
        '<div id="' + SChannelContent.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 50%; display: inline-block;">' +
        '<i class="icon-circle" style="color: red; font-size: 100%; aria-hidden="true"></i> ' + STR_SPACE + viwers + '</div>' +
        '<div id="' + SChannelContent.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; float: right; display: inline-block;">' + quality + '</div></div>');
};

SChannelContent.createChannelCell = function(row_id, coloumn_id, user_name, stream_type, preview_thumbnail) {
    SChannelContent.imgMatrix[SChannelContent.imgMatrixCount] = preview_thumbnail;
    SChannelContent.imgMatrixId[SChannelContent.imgMatrixCount] = SChannelContent.Img + row_id + '_' + coloumn_id;
    SChannelContent.imgMatrixCount++;

    return $('<td id="' + SChannelContent.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + user_name + '"></td>').html(
        '<div id="' + SChannelContent.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_video" ><img id="' + SChannelContent.Img +
        row_id + '_' + coloumn_id + '" class="stream_img" src="//:0"/></div>' +
        '<div id="' + SChannelContent.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + SChannelContent.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + stream_type + '</div>' +
        '<div id="' + SChannelContent.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info"></div>' +
        '<div id="' + SChannelContent.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info"></div>' +
        '<div id="' + SChannelContent.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info" ></div>' +
        '<div id="' + SChannelContent.QualityDiv + row_id + '_' + coloumn_id + '"class="stream_info"></div></div>');
};

SChannelContent.loadDataSuccessFinish = function() {
    $(document).ready(function() {
        if (!SChannelContent.status) {
            Main.HideLoadDialog();
            SChannelContent.status = true;
            SChannelContent.addFocus();
            Main.ScrollHelper.scrollVerticalToElementById(SChannelContent.Thumbnail, SChannelContent.cursorY, SChannelContent.cursorX, Main.SChannelContent, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
        }
        Main.LoadImages(SChannelContent.imgMatrix, SChannelContent.imgMatrixId, IMG_404_VIDEO);
        SChannelContent.loadingData = false;
    });
};

SChannelContent.addFocus = function() {
    Main.addFocusVideo(SChannelContent.cursorY, SChannelContent.cursorX, SChannelContent.Thumbnail, SChannelContent.ThumbnailDiv,
        SChannelContent.DispNameDiv, SChannelContent.StreamTitleDiv,
        SChannelContent.StreamGameDiv, SChannelContent.ViwersDiv, SChannelContent.QualityDiv);
};

SChannelContent.removeFocus = function() {
    Main.removeFocusVideo(SChannelContent.cursorY, SChannelContent.cursorX, SChannelContent.Thumbnail, SChannelContent.ThumbnailDiv,
        SChannelContent.DispNameDiv, SChannelContent.StreamTitleDiv,
        SChannelContent.StreamGameDiv, SChannelContent.ViwersDiv, SChannelContent.QualityDiv);
};

SChannelContent.keyClickDelay = function() {
    SChannelContent.LastClickFinish = true;
};

SChannelContent.keyEnter = function() {
    document.body.removeEventListener("keydown", SChannelContent.handleKeyDown);
    var value = (!SChannelContent.skipImg ? 0 : 1);
    if (SChannelContent.cursorX === (0 - value)) {
        Play.selectedChannel = $('#' + SChannelContent.Cell + SChannelContent.cursorY + '_' + SChannelContent.cursorX).attr('data-channelname');
        Play.selectedChannelDisplayname = document.getElementById(SChannelContent.DispNameDiv + SChannelContent.cursorY +
            '_' + SChannelContent.cursorX).textContent;
        Main.openStream();
    } else if (SChannelContent.cursorX === (1 - value)) Svod.init();
    else if (SChannelContent.cursorX === (2 - value)) Sclip.init();
};

SChannelContent.handleKeyDown = function(event) {
    if (SChannelContent.loadingData) {
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
                if (Main.Before == Main.Svod || Main.Before == Main.Sclip || Main.Before == Main.SChannelContent) {
                    Main.Go = SChannels.isLastSChannels ? Main.SChannels : Main.UserChannels;
                    SChannels.isLastSChannels = false;
                } else Main.Go = Main.Before;
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
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            SChannelContent.StartLoad();
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
            SChannelContent.exit();
            Main.GoLive();
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
        default:
            break;
    }
};
