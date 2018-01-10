/*jshint multistr: true */
//Variable initialization
function SChannelsA() {}
SChannelsA.Thumbnail = 'thumbnail_schannels_a_';
SChannelsA.EmptyCell = 'schannels_a_empty_';
SChannelsA.cursorY = 0;
SChannelsA.cursorX = 0;
SChannelsA.dataEnded = false;
SChannelsA.itemsCount = 0;
SChannelsA.imgMatrix = '';
SChannelsA.imgMatrixId = '';
SChannelsA.nameMatrix = [];
SChannelsA.nameMatrixCount = 0;
SChannelsA.loadingData = false;
SChannelsA.loadingDataTry = 1;
SChannelsA.loadingDataTryMax = 10;
SChannelsA.loadingDataTimeout = 3500;
SChannelsA.isDialogOn = false;
SChannelsA.ItemsLimit = 96;
SChannelsA.ColoumnsCount = 6;
SChannelsA.ItemsReloadLimit = Math.floor((SChannelsA.ItemsLimit / SChannelsA.ColoumnsCount) / 2);
SChannelsA.blankCellCount = 0;
SChannelsA.itemsCountOffset = 0;
SChannelsA.LastClickFinish = true;
SChannelsA.keyClickDelayTime = 25;
SChannelsA.MaxOffset = 0;
SChannelsA.skipImg = false;

SChannelsA.ThumbnailDiv = 'schannels_a_thumbnail_div_';
SChannelsA.DispNameDiv = 'schannels_a_display_name_';
SChannelsA.StreamTitleDiv = 'schannels_a_stream_title_';
SChannelsA.StreamGameDiv = 'schannels_a_stream_game_';
SChannelsA.ViwersDiv = 'schannels_a_stream_viwers_';
SChannelsA.QualityDiv = 'schannels_a_stream_quality_';
SChannelsA.Cell = 'schannels_a_cell_';
SChannelsA.status = false;
SChannelsA.lastselectedChannel = '';

//Variable initialization end

SChannelsA.init = function() {
    Main.Go = Main.SChannelsA;
    if (SChannelsA.lastselectedChannel !== Main.selectedChannel) SChannelsA.status = false;
    Main.cleanTopLabel();
    document.getElementById("top_bar_spacing").style.paddingLeft = "25.5%";
    $('.lable_user').html(STR_CHANNEL);
    $('.lable_game').html(Main.selectedChannelDisplayname);
    $('.label_agame_name').html('');
    document.body.addEventListener("keydown", SChannelsA.handleKeyDown, false);
    if (SChannelsA.status) SChannelsA.ScrollHelper.scrollVerticalToElementById(SChannelsA.Thumbnail + SChannelsA.cursorY + '_' + SChannelsA.cursorX);
    else SChannelsA.StartLoad();
};

SChannelsA.exit = function() {
    Main.RestoreTopLabel();
    document.body.removeEventListener("keydown", SChannelsA.handleKeyDown);
    SChannels.init();
};

SChannelsA.StartLoad = function() {
    Main.HideWarningDialog();
    SChannelsA.lastselectedChannel = Main.selectedChannel;
    SChannelsA.status = false;
    SChannelsA.skipImg = false;
    SChannelsA.ScrollHelper.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_search_channel_a').empty();
    SChannelsA.loadingMore = false;
    SChannelsA.blankCellCount = 0;
    SChannelsA.itemsCountOffset = 0;
    SChannelsA.MaxOffset = 0;
    SChannelsA.nameMatrix = [];
    SChannelsA.nameMatrixCount = 0;
    SChannelsA.itemsCount = 0;
    SChannelsA.cursorX = 0;
    SChannelsA.cursorY = 0;
    SChannelsA.dataEnded = false;
    SChannelsA.loadData();
};

SChannelsA.loadData = function() {
    SChannelsA.imgMatrix = '';
    SChannelsA.imgMatrixId = '';
    SChannelsA.loadingData = true;
    SChannelsA.loadingDataTry = 0;
    SChannelsA.loadingDataTimeout = 3500;
    SChannelsA.loadDataRequest();
};

SChannelsA.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + encodeURIComponent(Main.selectedChannel), true);
        xmlHttp.timeout = SChannelsA.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        SChannelsA.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    SChannelsA.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SChannelsA.loadDataError();
    }
};

SChannelsA.loadDataError = function() {
    SChannelsA.loadingDataTry++;
    if (SChannelsA.loadingDataTry < SChannelsA.loadingDataTryMax) {
        SChannelsA.loadingDataTimeout += (SChannelsA.loadingDataTry < 5) ? 250 : 3500;
        SChannelsA.loadDataRequest();
    } else {
        SChannelsA.loadingData = false;
        SChannelsA.loadingMore = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

SChannelsA.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var row = $('<tr></tr>');
    var coloumn_id = 0;

    if (response.stream !== null) {
        var stream = response.stream;
        row.append(SChannelsA.createCell(0, coloumn_id, stream.channel.name, stream.preview.template,
            stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
            stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
            Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)));
        coloumn_id++;
    } else SChannelsA.skipImg = true;

    row.append(SChannelsA.createChannelCell(0, coloumn_id, Main.selectedChannelDisplayname, Main.selectedChannelDisplayname + STR_PAST_BROA));
    coloumn_id++;
    row.append(SChannelsA.createChannelCell(0, coloumn_id, Main.selectedChannelDisplayname, Main.selectedChannelDisplayname + STR_CLIPS));

    if (coloumn_id < 2) {
        coloumn_id++;
        row.append(SChannelsA.createCellEmpty(0, coloumn_id));
    }

    $('#stream_table_search_channel_a').append(row);

    SChannelsA.loadDataSuccessFinish();
};

SChannelsA.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="' + SChannelsA.EmptyCell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
};

SChannelsA.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "640x360");

    SChannelsA.imgMatrix = preview_thumbnail;
    SChannelsA.imgMatrixId = SChannelsA.Thumbnail + row_id + '_' + coloumn_id;

    return $('<td id="' + SChannelsA.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="' + SChannelsA.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="app/images/video.png"/> \
            <div id="' + SChannelsA.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="' + SChannelsA.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
            <div id="' + SChannelsA.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div> \
            <div id="' + SChannelsA.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div> \
            <div id="' + SChannelsA.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 64%; display: inline-block;">' +
        '<i class="fa fa-circle" style="color: red; font-size: 100%; aria-hidden="true"></i> ' + viwers + '</div> \
             <div id="' + SChannelsA.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
            </div>');
};

SChannelsA.createChannelCell = function(row_id, coloumn_id, user_name, stream_type) {
    var thumbnail = 'app/images/blur_vod.png';
    if (coloumn_id == 1) thumbnail = 'app/images/blur_video_2.png';

    cur_thumbnail = 'thumbnail_';
    if (SChannelsA.state_follower == SChannelsA.STATE_FOLLOWER_VOD) cur_thumbnail = 'thumbnail_vod_';

    return $('<td id="' + SChannelsA.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + user_name + '"></td>').html(
        '<img id="' + SChannelsA.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + thumbnail + '"/> \
            <div id="' + SChannelsA.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="' + SChannelsA.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + stream_type + '</div> \
            <div id="' + SChannelsA.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info"></div> \
            <div id="' + SChannelsA.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info"></div> \
            <div id="' + SChannelsA.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info" ></div> \
            <div id="' + SChannelsA.QualityDiv + row_id + '_' + coloumn_id + '"class="stream_info"></div> \
            </div>');
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
SChannelsA.loadDataSuccessFinish = function() {
    $('#stream_table_search_channel_a').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!SChannelsA.status) {
                Main.HideLoadDialog();
                SChannelsA.status = true;
                SChannelsA.addFocus();
                SChannelsA.ScrollHelper.scrollVerticalToElementById(SChannelsA.Thumbnail + SChannelsA.cursorY + '_' + SChannelsA.cursorX);
            }

            if (!SChannelsA.skipImg) {
                var tumbImg = document.getElementById(SChannelsA.imgMatrixId);
                tumbImg.onerror = function() {
                    this.src = 'app/images/404_video.png'; //img fail to load use predefined
                };
                tumbImg.src = SChannelsA.imgMatrix;
            }

            SChannelsA.loadingData = false;
        });
};

SChannelsA.addFocus = function() {
    $('#' + SChannelsA.Thumbnail + SChannelsA.cursorY + '_' + SChannelsA.cursorX).addClass('stream_thumbnail_focused');
    $('#' + SChannelsA.ThumbnailDiv + SChannelsA.cursorY + '_' + SChannelsA.cursorX).addClass('stream_text_focused');
    $('#' + SChannelsA.DispNameDiv + SChannelsA.cursorY + '_' + SChannelsA.cursorX).addClass('stream_channel_focused');
    $('#' + SChannelsA.StreamTitleDiv + SChannelsA.cursorY + '_' + SChannelsA.cursorX).addClass('stream_info_focused');
    $('#' + SChannelsA.StreamGameDiv + SChannelsA.cursorY + '_' + SChannelsA.cursorX).addClass('stream_info_focused');
    $('#' + SChannelsA.ViwersDiv + SChannelsA.cursorY + '_' + SChannelsA.cursorX).addClass('stream_info_focused');
    $('#' + SChannelsA.QualityDiv + SChannelsA.cursorY + '_' + SChannelsA.cursorX).addClass('stream_info_focused');
};

SChannelsA.removeFocus = function() {
    $('#' + SChannelsA.Thumbnail + SChannelsA.cursorY + '_' + SChannelsA.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + SChannelsA.ThumbnailDiv + SChannelsA.cursorY + '_' + SChannelsA.cursorX).removeClass('stream_text_focused');
    $('#' + SChannelsA.DispNameDiv + SChannelsA.cursorY + '_' + SChannelsA.cursorX).removeClass('stream_channel_focused');
    $('#' + SChannelsA.StreamTitleDiv + SChannelsA.cursorY + '_' + SChannelsA.cursorX).removeClass('stream_info_focused');
    $('#' + SChannelsA.StreamGameDiv + SChannelsA.cursorY + '_' + SChannelsA.cursorX).removeClass('stream_info_focused');
    $('#' + SChannelsA.ViwersDiv + SChannelsA.cursorY + '_' + SChannelsA.cursorX).removeClass('stream_info_focused');
    $('#' + SChannelsA.QualityDiv + SChannelsA.cursorY + '_' + SChannelsA.cursorX).removeClass('stream_info_focused');
};

SChannelsA.keyClickDelay = function() {
    SChannelsA.LastClickFinish = true;
};

SChannelsA.keyEnter = function() {
    document.body.removeEventListener("keydown", SChannelsA.handleKeyDown);
    var value = (!SChannelsA.skipImg ? 0 : 1);
    if (SChannelsA.cursorX === (0 - value)) {
        Main.selectedChannel = $('#' + SChannelsA.Cell + SChannelsA.cursorY + '_' + SChannelsA.cursorX).attr('data-channelname');
        Main.selectedChannelDisplayname = document.getElementById(SChannelsA.DispNameDiv + SChannelsA.cursorY + '_' + SChannelsA.cursorX).textContent;
        Main.openStream();
    } else if (SChannelsA.cursorX === (1 - value)) Svod.init();
    else if (SChannelsA.cursorX === (2 - value)) Sclip.init();
};

SChannelsA.handleKeyDown = function(event) {
    if (SChannelsA.loadingData && !SChannelsA.loadingMore) {
        event.preventDefault();
        return;
    } else if (!SChannelsA.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        SChannelsA.LastClickFinish = false;
        window.setTimeout(SChannelsA.keyClickDelay, SChannelsA.keyClickDelayTime);
    }

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            Main.Go = Main.SChannels;
            SChannelsA.exit();
            break;
        case TvKeyCode.KEY_LEFT:
            SChannelsA.removeFocus();
            SChannelsA.cursorX--;
            if (SChannelsA.cursorX < 0) SChannelsA.cursorX = (!SChannelsA.skipImg ? 2 : 1);
            SChannelsA.addFocus();
            break;
        case TvKeyCode.KEY_RIGHT:
            SChannelsA.removeFocus();
            SChannelsA.cursorX++;
            if (SChannelsA.cursorX > (!SChannelsA.skipImg ? 2 : 1)) SChannelsA.cursorX = 0;
            SChannelsA.addFocus();
            break;
        case TvKeyCode.KEY_UP:
        case TvKeyCode.KEY_DOWN:
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!SChannelsA.loadingMore) SChannelsA.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
        case TvKeyCode.KEY_CHANNELDOWN:
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            SChannelsA.keyEnter();
            break;
        case TvKeyCode.KEY_RED:
        case TvKeyCode.KEY_GREEN:
        case TvKeyCode.KEY_YELLOW:
            break;
        case TvKeyCode.KEY_BLUE:
            Main.Go = Main.Search;
            Main.RestoreTopLabel();
            document.body.removeEventListener("keydown", SChannelsA.handleKeyDown);
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

SChannelsA.ScrollHelper = {
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
        if (Main.Go === Main.SChannelsA) {
            $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight() + 270);
        } else return;
    }
};
