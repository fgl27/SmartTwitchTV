/*jshint multistr: true */
//Variable initialization
function UserLive() {}
UserLive.Thumbnail = 'thumbnail_ulive_';
UserLive.EmptyCell = 'ulive_empty_';
UserLive.cursorY = 0;
UserLive.cursorX = 0;
UserLive.dataEnded = false;
UserLive.itemsCount = 0;
UserLive.imgMatrix = [];
UserLive.imgMatrixId = [];
UserLive.imgMatrixCount = 0;
UserLive.nameMatrix = [];
UserLive.nameMatrixCount = 0;
UserLive.loadingData = false;
UserLive.loadingDataTry = 0;
UserLive.loadingDataTryMax = 10;
UserLive.loadingDataTimeout = 3500;
UserLive.isDialogOn = false;
UserLive.ItemsLimit = 99;
UserLive.ColoumnsCount = 3;
UserLive.ItemsReloadLimit = 0;
UserLive.blankCellCount = 0;
UserLive.itemsCountOffset = 0;
UserLive.LastClickFinish = true;
UserLive.keyClickDelayTime = 25;
UserLive.ReplacedataEnded = false;
UserLive.MaxOffset = 0;
UserLive.loadChannelOffsset = 0;
UserLive.emptyContent = false;

UserLive.ThumbnailDiv = 'ulive_thumbnail_div_';
UserLive.DispNameDiv = 'ulive_display_name_';
UserLive.StreamTitleDiv = 'ulive_stream_title_';
UserLive.StreamGameDiv = 'ulive_stream_game_';
UserLive.ViwersDiv = 'ulive_viwers_';
UserLive.QualityDiv = 'ulive_quality_';
UserLive.Cell = 'ulive_cell_';
UserLive.status = false;
UserLive.followerChannels = '';
UserLive.OldUserName = '';

//Variable initialization end

UserLive.init = function() {
    Main.Go = Main.UserLive;
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    document.getElementById("id_agame_name").style.paddingLeft = "44%";
    $('.label_agame_name').html(Main.UserName + STR_LIVE_CHANNELS);
    document.body.addEventListener("keydown", UserLive.handleKeyDown, false);
    if (UserLive.OldUserName !== Main.UserName) UserLive.status = false;
    if (UserLive.status) {
        Main.ScrollHelper.scrollVerticalToElementById(UserLive.Thumbnail, UserLive.cursorY, UserLive.cursorX, Main.UserLive, Main.ScrollOffSetMinusVideo,
            Main.ScrollOffSetVideo, false);
        Main.CounterDialog(UserLive.cursorX, UserLive.cursorY, UserLive.ColoumnsCount, UserLive.itemsCount);
    } else UserLive.StartLoad();
};

UserLive.exit = function() {
    $('#top_bar_user').removeClass('icon_center_focus');
    $('#top_bar_user').addClass('icon_center_label');
    $('.label_agame_name').html('');
    document.getElementById("id_agame_name").style.paddingLeft = "50%";
    document.body.removeEventListener("keydown", UserLive.handleKeyDown);
};

UserLive.StartLoad = function() {
    Main.HideWarningDialog();
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    UserLive.status = false;
    UserLive.OldUserName = Main.UserName;
    $('#stream_table_user_live').empty();
    UserLive.loadChannelOffsset = 0;
    UserLive.loadingMore = false;
    UserLive.blankCellCount = 0;
    UserLive.itemsCountOffset = 0;
    UserLive.ReplacedataEnded = false;
    UserLive.MaxOffset = 0;
    UserLive.nameMatrix = [];
    UserLive.nameMatrixCount = 0;
    UserLive.itemsCount = 0;
    UserLive.cursorX = 0;
    UserLive.cursorY = 0;
    UserLive.dataEnded = false;
    UserLive.followerChannels = '';
    UserLive.loadData();
};

UserLive.loadData = function() {
    UserLive.loadingData = true;
    UserLive.loadingDataTry = 0;
    UserLive.loadingDataTimeout = 3500;
    UserLive.loadChannels();
};

UserLive.loadChannels = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(Main.UserName) +
            '/follows/channels?limit=100&offset=' + UserLive.loadChannelOffsset + '&sortby=created_at&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserLive.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        UserLive.loadChannelLive(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    UserLive.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserLive.loadDataError();
    }
};

UserLive.loadDataError = function() {
    UserLive.loadingDataTry++;
    if (UserLive.loadingDataTry < UserLive.loadingDataTryMax) {
        UserLive.loadingDataTimeout += (UserLive.loadingDataTry < 5) ? 250 : 3500;
        UserLive.loadChannels();
    } else {
        UserLive.loadingData = false;
        UserLive.loadingMore = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};


UserLive.loadChannelLive = function(responseText) {
    var response = $.parseJSON(responseText);

    var response_items = response.follows.length;

    for (var x = 0; x < response_items; x++) UserLive.followerChannels += response.follows[x].channel.name + ',';



    if (response_items > 0) { // response_items here is not always 99 so check until it is 0
        UserLive.loadChannelOffsset += response_items;
        UserLive.loadData();
    } else { // end
        UserLive.followerChannels = UserLive.followerChannels.slice(0, -1);
        UserLive.imgMatrix = [];
        UserLive.imgMatrixId = [];
        UserLive.imgMatrixCount = 0;
        UserLive.loadingData = true;
        UserLive.loadingDataTry = 0;
        UserLive.loadingDataTimeout = 3500;
        UserLive.loadChannelUserLive();
    }
};

UserLive.loadChannelUserLive = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = UserLive.itemsCount + UserLive.itemsCountOffset;
        if (offset !== 0 && offset >= (UserLive.MaxOffset - UserLive.ItemsLimit)) {
            offset = UserLive.MaxOffset - UserLive.ItemsLimit;
            UserLive.dataEnded = true;
            UserLive.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(UserLive.followerChannels) + '&limit=' +
            UserLive.ItemsLimit + '&offset=' + offset + '&stream_type=all&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserLive.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        UserLive.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    UserLive.loadDataErrorLive();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserLive.loadDataErrorLive();
    }
};

UserLive.loadDataErrorLive = function() {
    UserLive.loadingDataTry++;
    if (UserLive.loadingDataTry < UserLive.loadingDataTryMax) {
        UserLive.loadingDataTimeout += (UserLive.loadingDataTry < 5) ? 250 : 3500;
        UserLive.loadChannelUserLive();
    } else {
        UserLive.loadingData = false;
        UserLive.loadingMore = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

UserLive.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    UserLive.MaxOffset = parseInt(response._total);

    if (response_items < UserLive.ItemsLimit) UserLive.dataEnded = true;

    var offset_itemsCount = UserLive.itemsCount;
    UserLive.itemsCount += response_items;

    UserLive.emptyContent = UserLive.itemsCount === 0;

    var response_rows = response_items / UserLive.ColoumnsCount;
    if (response_items % UserLive.ColoumnsCount > 0) response_rows++;

    var coloumn_id, row_id, row, cell, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / UserLive.ColoumnsCount + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < UserLive.ColoumnsCount && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            if (UserLive.CellExists(stream.channel.name)) coloumn_id--;
            else {
                cell = UserLive.createCell(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                    stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                    stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                    Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
                row.append(cell);
            }
        }

        for (coloumn_id; coloumn_id < UserLive.ColoumnsCount; coloumn_id++) {
            row.append(Main.createCellEmpty(row_id, coloumn_id, UserLive.EmptyCell));
        }
        $('#stream_table_user_live').append(row);
    }

    UserLive.loadDataSuccessFinish();
};

UserLive.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="' + UserLive.EmptyCell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
};

UserLive.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main.VideoSize);

    UserLive.imgMatrix[UserLive.imgMatrixCount] = preview_thumbnail;
    UserLive.imgMatrixId[UserLive.imgMatrixCount] = UserLive.Thumbnail + row_id + '_' + coloumn_id;
    UserLive.imgMatrixCount++;

    if (UserLive.imgMatrixCount < (UserLive.ColoumnsCount * 5)) Main.PreLoadAImage(preview_thumbnail); //try to pre cache first 4 rows

    UserLive.nameMatrix[UserLive.nameMatrixCount] = channel_name;
    UserLive.nameMatrixCount++;

    return $('<td id="' + UserLive.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="' + UserLive.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_VIDEO + '"/>' +
        '<div id="' + UserLive.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + UserLive.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div>' +
        '<div id="' + UserLive.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + UserLive.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div>' +
        '<div id="' + UserLive.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
        '</div>' +
        '<div id="' + UserLive.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div></div>');
};

UserLive.CellExists = function(display_name) {
    for (var i = 0; i <= UserLive.nameMatrixCount; i++) {
        if (display_name == UserLive.nameMatrix[i]) {
            UserLive.blankCellCount++;
            return true;
        }
    }
    return false;
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
UserLive.loadDataSuccessFinish = function() {
    $('#stream_table_user_live').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!UserLive.status) {
                Main.HideLoadDialog();
                UserLive.addFocus();
                if (UserLive.emptyContent) Main.showWarningDialog(STR_NO + STR_LIVE_CHANNELS);
                else UserLive.status = true;
            }

            Main.LoadImages(UserLive.imgMatrix, UserLive.imgMatrixId, IMG_404_VIDEO);

            if (UserLive.blankCellCount > 0 && !UserLive.dataEnded) {
                UserLive.loadingMore = true;
                UserLive.loadDataReplace();
                return;
            } else UserLive.blankCellCount = 0;

            UserLive.loadingData = false;
            UserLive.loadingMore = false;
        });
};

UserLive.loadDataReplace = function() {
    UserLive.imgMatrix = [];
    UserLive.imgMatrixId = [];
    UserLive.imgMatrixCount = 0;
    UserLive.loadingData = true;
    UserLive.loadingDataTry = 0;
    UserLive.loadingDataTimeout = 3500;
    UserLive.loadChannelsReplace();
};

UserLive.loadChannelsReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = UserLive.itemsCount + UserLive.itemsCountOffset;
        if (offset !== 0 && offset >= (UserLive.MaxOffset - UserLive.ItemsLimit)) {
            offset = UserLive.MaxOffset - UserLive.ItemsLimit;
            UserLive.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main.gameSelected) +
            '&limit=' + UserLive.ItemsLimit + '&offset=' + offset, true);
        xmlHttp.timeout = UserLive.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        UserLive.loadDataSuccessReplace(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserLive.loadDataErrorReplace();
    }
};

UserLive.loadDataErrorReplace = function() {
    UserLive.loadingDataTry++;
    if (UserLive.loadingDataTry < UserLive.loadingDataTryMax) {
        UserLive.loadingDataTimeout += (UserLive.loadingDataTry < 5) ? 250 : 3500;
        UserLive.loadChannelsReplace();
    }
};

UserLive.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    UserLive.MaxOffset = parseInt(response._total);

    if (response_items < UserLive.ItemsLimit) UserLive.ReplacedataEnded = true;

    var row_id = UserLive.itemsCount / UserLive.ColoumnsCount;

    var coloumn_id, stream, mReplace = false,
        cursor = 0;

    for (cursor; cursor < response_items; cursor++) {
        stream = response.streams[cursor];
        if (UserLive.CellExists(stream.channel.name)) UserLive.blankCellCount--;
        else {
            mReplace = UserLive.replaceCellEmpty(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
            if (mReplace) UserLive.blankCellCount--;
            if (UserLive.blankCellCount === 0) break;
        }
    }
    UserLive.itemsCountOffset += cursor;
    if (UserLive.ReplacedataEnded) UserLive.blankCellCount = 0;
    UserLive.loadDataSuccessFinish();
};

UserLive.replaceCellEmpty = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    var my = 0,
        mx = 0;
    if (row_id < ((UserLive.ItemsLimit / UserLive.ColoumnsCount) - 1)) return false;
    for (my = row_id - (1 + Math.ceil(UserLive.blankCellCount / UserLive.ColoumnsCount)); my < row_id; my++) {
        for (mx = 0; mx < UserLive.ColoumnsCount; mx++) {
            if (!Main.ThumbNull(my, mx, UserLive.Thumbnail) && (Main.ThumbNull(my, mx, UserLive.EmptyCell))) {
                row_id = my;
                coloumn_id = mx;
                preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main.VideoSize);

                UserLive.imgMatrix[UserLive.imgMatrixCount] = preview_thumbnail;
                UserLive.imgMatrixId[UserLive.imgMatrixCount] = UserLive.Thumbnail + row_id + '_' + coloumn_id;
                UserLive.imgMatrixCount++;

                UserLive.nameMatrix[UserLive.nameMatrixCount] = channel_name;
                UserLive.nameMatrixCount++;
                document.getElementById(UserLive.EmptyCell + row_id + '_' + coloumn_id).setAttribute('id', UserLive.Cell + row_id + '_' + coloumn_id);
                document.getElementById(UserLive.Cell + row_id + '_' + coloumn_id).setAttribute('data-channelname', channel_name);
                document.getElementById(UserLive.Cell + row_id + '_' + coloumn_id).innerHTML =
                    '<img id="' + UserLive.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_VIDEO + '"/>' +
                    '<div id="' + UserLive.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
                    '<div id="' + UserLive.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div>' +
                    '<div id="' + UserLive.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div>' +
                    '<div id="' + UserLive.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div>' +
                    '<div id="' + UserLive.ViwersDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
                    '</div>' +
                    '<div id="' + UserLive.QualityDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div></div>';
                return true;
            }
        }
    }

    return false;
};

UserLive.addFocus = function() {
    if (((UserLive.cursorY + UserLive.ItemsReloadLimit) > (UserLive.itemsCount / UserLive.ColoumnsCount)) &&
        !UserLive.dataEnded && !UserLive.loadingMore) {
        UserLive.loadingMore = true;
        UserLive.loadData();
    }

    $('#' + UserLive.Thumbnail + UserLive.cursorY + '_' + UserLive.cursorX).addClass('stream_thumbnail_focused');
    $('#' + UserLive.ThumbnailDiv + UserLive.cursorY + '_' + UserLive.cursorX).addClass('stream_text_focused');
    $('#' + UserLive.DispNameDiv + UserLive.cursorY + '_' + UserLive.cursorX).addClass('stream_channel_focused');
    $('#' + UserLive.StreamTitleDiv + UserLive.cursorY + '_' + UserLive.cursorX).addClass('stream_info_focused');
    $('#' + UserLive.StreamGameDiv + UserLive.cursorY + '_' + UserLive.cursorX).addClass('stream_info_focused');
    $('#' + UserLive.ViwersDiv + UserLive.cursorY + '_' + UserLive.cursorX).addClass('stream_info_focused');
    $('#' + UserLive.QualityDiv + UserLive.cursorY + '_' + UserLive.cursorX).addClass('stream_info_focused');
    window.setTimeout(function() {
        Main.ScrollHelper.scrollVerticalToElementById(UserLive.Thumbnail, UserLive.cursorY, UserLive.cursorX, Main.UserLive, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
    }, 10);

    Main.CounterDialog(UserLive.cursorX, UserLive.cursorY, UserLive.ColoumnsCount, UserLive.itemsCount);
};

UserLive.removeFocus = function() {
    $('#' + UserLive.Thumbnail + UserLive.cursorY + '_' + UserLive.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + UserLive.ThumbnailDiv + UserLive.cursorY + '_' + UserLive.cursorX).removeClass('stream_text_focused');
    $('#' + UserLive.DispNameDiv + UserLive.cursorY + '_' + UserLive.cursorX).removeClass('stream_channel_focused');
    $('#' + UserLive.StreamTitleDiv + UserLive.cursorY + '_' + UserLive.cursorX).removeClass('stream_info_focused');
    $('#' + UserLive.StreamGameDiv + UserLive.cursorY + '_' + UserLive.cursorX).removeClass('stream_info_focused');
    $('#' + UserLive.ViwersDiv + UserLive.cursorY + '_' + UserLive.cursorX).removeClass('stream_info_focused');
    $('#' + UserLive.QualityDiv + UserLive.cursorY + '_' + UserLive.cursorX).removeClass('stream_info_focused');
};

UserLive.keyClickDelay = function() {
    UserLive.LastClickFinish = true;
};

UserLive.handleKeyDown = function(event) {
    if (UserLive.loadingData && !UserLive.loadingMore) {
        event.preventDefault();
        return;
    } else if (!UserLive.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        UserLive.LastClickFinish = false;
        window.setTimeout(UserLive.keyClickDelay, UserLive.keyClickDelayTime);
    }

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                Main.Go = Main.Users;
                UserLive.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((UserLive.cursorY), (UserLive.cursorX - 1), UserLive.Thumbnail)) {
                UserLive.removeFocus();
                UserLive.cursorX--;
                UserLive.addFocus();
            } else {
                for (i = (UserLive.ColoumnsCount - 1); i > -1; i--) {
                    if (Main.ThumbNull((UserLive.cursorY - 1), i, UserLive.Thumbnail)) {
                        UserLive.removeFocus();
                        UserLive.cursorY--;
                        UserLive.cursorX = i;
                        UserLive.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.ThumbNull((UserLive.cursorY), (UserLive.cursorX + 1), UserLive.Thumbnail)) {
                UserLive.removeFocus();
                UserLive.cursorX++;
                UserLive.addFocus();
            } else if (Main.ThumbNull((UserLive.cursorY + 1), 0, UserLive.Thumbnail)) {
                UserLive.removeFocus();
                UserLive.cursorY++;
                UserLive.cursorX = 0;
                UserLive.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < UserLive.ColoumnsCount; i++) {
                if (Main.ThumbNull((UserLive.cursorY - 1), (UserLive.cursorX - i), UserLive.Thumbnail)) {
                    UserLive.removeFocus();
                    UserLive.cursorY--;
                    UserLive.cursorX = UserLive.cursorX - i;
                    UserLive.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < UserLive.ColoumnsCount; i++) {
                if (Main.ThumbNull((UserLive.cursorY + 1), (UserLive.cursorX - i), UserLive.Thumbnail)) {
                    UserLive.removeFocus();
                    UserLive.cursorY++;
                    UserLive.cursorX = UserLive.cursorX - i;
                    UserLive.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!UserLive.loadingMore) UserLive.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            Main.Go = Main.UserHost;
            UserLive.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = Main.UserChannels;
            UserLive.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Play.selectedChannel = $('#' + UserLive.Cell + UserLive.cursorY + '_' + UserLive.cursorX).attr('data-channelname');
            Play.selectedChannelDisplayname = document.getElementById(UserLive.DispNameDiv + UserLive.cursorY + '_' + UserLive.cursorX).textContent;
            document.body.removeEventListener("keydown", UserLive.handleKeyDown);
            Main.openStream();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Main.Go = Main.Live;
            UserLive.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.UserLive;
            Main.Go = Main.Search;
            Main.OldgameSelected = Main.gameSelected;
            UserLive.exit();
            Main.SwitchScreen();
            break;
        default:
            break;
    }
};
