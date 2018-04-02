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
SChannelContent.UserChannels = false;
SChannelContent.TargetName = undefined;

SChannelContent.Img = 'img_schannels_cont';
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
    AddCode.PlayRequest = false;
    if (SChannelContent.status) {
        Main.ScrollHelper.scrollVerticalToElementById(SChannelContent.Thumbnail, SChannelContent.cursorY, SChannelContent.cursorX, Main.SChannelContent, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
        SChannelContent.checkUser();
    } else SChannelContent.StartLoad();
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
    SChannelContent.TargetName = undefined;
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

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + encodeURIComponent(SChannelContent.TargetName !== undefined ? SChannelContent.TargetName : Main.selectedChannel) + '?' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SChannelContent.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    if ($.parseJSON(xmlHttp.responseText).stream !== null) SChannelContent.loadDataSuccess(xmlHttp.responseText);
                    else {
                        SChannelContent.loadDataPrepare();
                        SChannelContent.loadDataCheckHost();
                    }
                    return;
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
    } else SChannelContent.loadDataSuccess(null);
};

SChannelContent.loadDataCheckHost = function() {
    try {

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'http://tmi.twitch.tv/hosts?include_logins=1&host=' + encodeURIComponent(Main.selectedChannel_id) + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SChannelContent.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    SChannelContent.CheckHost(xmlHttp.responseText);
                    return;
                } else SChannelContent.loadDataCheckHostError();
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SChannelContent.loadDataCheckHostError();
    }
};

SChannelContent.loadDataCheckHostError = function() {
    SChannelContent.loadingDataTry++;
    if (SChannelContent.loadingDataTry < SChannelContent.loadingDataTryMax) {
        SChannelContent.loadingDataTimeout += 3500;
        SChannelContent.loadDataCheckHost();
    } else SChannelContent.loadDataSuccess(null);
};

SChannelContent.CheckHost = function(responseText) {
    var response = $.parseJSON(responseText);
    SChannelContent.TargetName = response.hosts[0].target_login;
    if (SChannelContent.TargetName !== undefined) {
        SChannelContent.loadDataPrepare();
        SChannelContent.loadDataRequest();
    } else SChannelContent.loadDataSuccess(null);
};

SChannelContent.loadDataSuccess = function(responseText) {
    var row = $('<tr></tr>');
    var coloumn_id = 0;

    if (responseText !== null) {
        var response = $.parseJSON(responseText);
        if (response.stream !== null) {
            var hosting = SChannelContent.TargetName !== undefined ? Main.selectedChannelDisplayname + STR_USER_HOSTING : '';
            var stream = response.stream;
            row.append(SChannelContent.createCell(0, coloumn_id, stream.channel.name, stream.preview.template,
                stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                hosting + stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)));
            coloumn_id++;
        } else SChannelContent.skipImg = true;
    } else SChannelContent.skipImg = true;

    row.append(SChannelContent.createChannelCell(0, coloumn_id, Main.selectedChannelDisplayname, Main.selectedChannelDisplayname + STR_PAST_BROA, IMG_BLUR_VIDEO1_16));
    coloumn_id++;
    row.append(SChannelContent.createChannelCell(0, coloumn_id, Main.selectedChannelDisplayname, Main.selectedChannelDisplayname + STR_CLIPS, IMG_BLUR_VIDEO2_16));

    if (coloumn_id < 2) {
        coloumn_id++;
        row.append(Main.createCellEmpty(0, coloumn_id, SChannelContent.EmptyCell));
    }

    $('#stream_table_search_channel_a').append(row);

    row = $('<tr></tr>');
    row.append(SChannelContent.createFallow(1, 0, Main.selectedChannelDisplayname, Main.selectedChannelDisplayname, Main.selectedChannelLogo));
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
        row_id + '_' + coloumn_id + '" class="stream_img"></div>' +
        '<div id="' + SChannelContent.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + SChannelContent.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div>' +
        '<div id="' + SChannelContent.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + SChannelContent.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div>' +
        '<div id="' + SChannelContent.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 50%; display: inline-block;">' +
        '<i class="icon-circle" style="color: ' + (SChannelContent.TargetName !== undefined ? '#FED000' : 'red') + '; font-size: 100%; aria-hidden="true"></i> ' + STR_SPACE + viwers + '</div>' +
        '<div id="' + SChannelContent.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; float: right; display: inline-block;">' + quality + '</div></div>');
};

SChannelContent.createChannelCell = function(row_id, coloumn_id, user_name, stream_type, preview_thumbnail) {
    SChannelContent.imgMatrix[SChannelContent.imgMatrixCount] = preview_thumbnail;
    SChannelContent.imgMatrixId[SChannelContent.imgMatrixCount] = SChannelContent.Img + row_id + '_' + coloumn_id;
    SChannelContent.imgMatrixCount++;

    return $('<td id="' + SChannelContent.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + user_name + '"></td>').html(
        '<div id="' + SChannelContent.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_video" ><img id="' + SChannelContent.Img +
        row_id + '_' + coloumn_id + '" class="stream_img"></div>' +
        '<div id="' + SChannelContent.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + SChannelContent.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + stream_type + '</div>' +
        '<div id="' + SChannelContent.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info hide"></div>' +
        '<div id="' + SChannelContent.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info hide"></div>' +
        '<div id="' + SChannelContent.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info hide" ></div>' +
        '<div id="' + SChannelContent.QualityDiv + row_id + '_' + coloumn_id + '"class="stream_info hide"></div></div>');
};

SChannelContent.createFallow = function(row_id, coloumn_id, user_name, stream_type, preview_thumbnail) {
    SChannelContent.imgMatrix[SChannelContent.imgMatrixCount] = preview_thumbnail;
    SChannelContent.imgMatrixId[SChannelContent.imgMatrixCount] = SChannelContent.Img + row_id + '_' + coloumn_id;
    SChannelContent.imgMatrixCount++;

    return $('<td id="' + SChannelContent.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + user_name + '"></td>').html(
        '<div id="' + SChannelContent.Thumbnail + row_id + '_' + coloumn_id +
        '" class="stream_thumbnail_video" ><div id="schannel_cont_heart" style="position: absolute; top: 5%; left: 6%;"></div><img id="' +
        SChannelContent.Img + row_id + '_' + coloumn_id + '" class="stream_img_fallow"></div>' +
        '<div id="' + SChannelContent.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + SChannelContent.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + stream_type + '</div>' +
        '<div id="' + SChannelContent.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info hide"></div>' +
        '<div id="' + SChannelContent.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + Main.addCommas(Main.selectedChannelViews) +
        STR_VIEWS + '</div>' +
        '<div id="' + SChannelContent.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info" >' + Main.addCommas(Main.selectedChannelFallower) + STR_FALLOWERS + '</div>' +
        '<div id="' + SChannelContent.QualityDiv + row_id + '_' + coloumn_id + '"class="stream_info hide"></div></div>');
};

SChannelContent.setFallow = function() {
    if (AddCode.IsFallowing) {
        document.getElementById("schannel_cont_heart").innerHTML = '<i class="icon-heart" style="color: #00b300; font-size: 1200%; text-shadow: #FFFFFF 0px 0px 10px, #FFFFFF 0px 0px 10px, #FFFFFF 0px 0px 8px;"></i>';
        document.getElementById(SChannelContent.DispNameDiv + "1_0").innerHTML = Main.selectedChannelDisplayname + STR_FALLOWING;
    } else {
        document.getElementById("schannel_cont_heart").innerHTML = '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 1200%; text-shadow: #000000 0px 0px 10px, #000000 0px 0px 10px, #000000 0px 0px 8px;"></i>';
        if (Main.UserName !== '') document.getElementById(SChannelContent.DispNameDiv + "1_0").innerHTML = Main.selectedChannelDisplayname + STR_FALLOW;
        else document.getElementById(SChannelContent.DispNameDiv + "1_0").innerHTML = Main.selectedChannelDisplayname + STR_CANT_FALLOW;
    }
};

SChannelContent.loadDataSuccessFinish = function() {
    $(document).ready(function() {
        if (!SChannelContent.status) {
            Main.HideLoadDialog();
            SChannelContent.status = true;
            SChannelContent.addFocus();
            Main.ScrollHelper.scrollVerticalToElementById(SChannelContent.Thumbnail, SChannelContent.cursorY, SChannelContent.cursorX, Main.SChannelContent, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
        }
        SChannelContent.checkUser();
        Main.LoadImages(SChannelContent.imgMatrix, SChannelContent.imgMatrixId, IMG_404_VIDEO);
        SChannelContent.loadingData = false;
    });
};

SChannelContent.checkUser = function() {
    if (SChannelContent.UserChannels) SChannelContent.setFallow();
    else if (Main.UserName !== '') {
        AddCode.userChannel = Main.selectedChannel_id;
        AddCode.PlayRequest = false;
        AddCode.CheckFallow();
    } else {
        AddCode.IsFallowing = false;
        SChannelContent.setFallow();
    }
};

SChannelContent.addFocus = function() {
    Main.addFocusVideo(SChannelContent.cursorY, SChannelContent.cursorY === 0 ? SChannelContent.cursorX : 0, SChannelContent.Thumbnail, SChannelContent.ThumbnailDiv,
        SChannelContent.DispNameDiv, SChannelContent.StreamTitleDiv,
        SChannelContent.StreamGameDiv, SChannelContent.ViwersDiv, SChannelContent.QualityDiv);
};

SChannelContent.removeFocus = function() {
    Main.removeFocusVideo(SChannelContent.cursorY, SChannelContent.cursorY === 0 ? SChannelContent.cursorX : 0, SChannelContent.Thumbnail, SChannelContent.ThumbnailDiv,
        SChannelContent.DispNameDiv, SChannelContent.StreamTitleDiv,
        SChannelContent.StreamGameDiv, SChannelContent.ViwersDiv, SChannelContent.QualityDiv);
};

SChannelContent.keyClickDelay = function() {
    SChannelContent.LastClickFinish = true;
};

SChannelContent.keyEnter = function() {
    if (SChannelContent.cursorY) {
        if (AddCode.OauthToken !== '') {
            AddCode.PlayRequest = false;
            AddCode.userChannel = Main.selectedChannel_id;
            if (AddCode.IsFallowing) AddCode.UnFallow();
            else AddCode.Fallow();
        } else {
            Main.showWarningDialog(STR_NOKEY_WARN);
            window.setTimeout(Main.HideWarningDialog, 2000);
        }
    } else {
        document.body.removeEventListener("keydown", SChannelContent.handleKeyDown);
        var value = (!SChannelContent.skipImg ? 0 : 1);
        if (SChannelContent.cursorX === (0 - value)) {
            Play.selectedChannel = $('#' + SChannelContent.Cell + SChannelContent.cursorY + '_' + SChannelContent.cursorX).attr('data-channelname');
            Play.selectedChannelDisplayname = document.getElementById(SChannelContent.DispNameDiv + SChannelContent.cursorY +
                '_' + SChannelContent.cursorX).textContent;
            Main.openStream();
        } else if (SChannelContent.cursorX === (1 - value)) Svod.init();
        else if (SChannelContent.cursorX === (2 - value)) Sclip.init();
    }
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
        case TvKeyCode.KEY_UP:
        case TvKeyCode.KEY_DOWN:
            SChannelContent.removeFocus();
            SChannelContent.cursorY = SChannelContent.cursorY === 0 ? 1 : 0;
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
