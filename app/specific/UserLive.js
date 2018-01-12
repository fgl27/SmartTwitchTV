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
UserLive.loadingDataTry = 1;
UserLive.loadingDataTryMax = 10;
UserLive.loadingDataTimeout = 3500;
UserLive.isDialogOn = false;
UserLive.ItemsLimit = 99;
UserLive.ColoumnsCount = 3;
UserLive.ItemsReloadLimit = Math.floor((UserLive.ItemsLimit / UserLive.ColoumnsCount) / 2);
UserLive.newImg = new Image();
UserLive.blankCellCount = 0;
UserLive.itemsCountOffset = 0;
UserLive.LastClickFinish = true;
UserLive.keyClickDelayTime = 25;
UserLive.ReplacedataEnded = false;
UserLive.MaxOffset = 0;

UserLive.ThumbnailDiv = 'ulive_thumbnail_div_';
UserLive.DispNameDiv = 'ulive_display_name_';
UserLive.StreamTitleDiv = 'ulive_stream_title_';
UserLive.StreamGameDiv = 'ulive_stream_game_';
UserLive.ViwersDiv = 'ulive_viwers_';
UserLive.QualityDiv = 'ulive_quality_';
UserLive.Cell = 'ulive_cell_';
UserLive.status = false;
UserLive.followerChannels = '';

//Variable initialization end

UserLive.init = function() {
    Main.Go = Main.UserLive;
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    document.getElementById("id_agame_name").style.paddingLeft = "44%";
    $('.label_agame_name').html(Main.UserName + STR_LIVE_CHANNELS);
    document.body.addEventListener("keydown", UserLive.handleKeyDown, false);
    if (Main.OldUserName !== Main.UserName) UserLive.status = false;
    if (UserLive.status) UserLive.ScrollHelper.scrollVerticalToElementById(UserLive.Thumbnail + UserLive.cursorY + '_' + UserLive.cursorX);
    else UserLive.StartLoad();
};

UserLive.exit = function() {
    $('#top_bar_user').removeClass('icon_center_focus');
    $('#top_bar_user').addClass('icon_center_label');
    $('.label_agame_name').html('');
    document.getElementById("id_agame_name").style.paddingLeft = "50%";
    document.body.removeEventListener("keydown", UserLive.handleKeyDown);
    Main.SwitchScreen();
};

UserLive.StartLoad = function() {
    Main.HideWarningDialog();
    UserLive.ScrollHelper.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    UserLive.status = false;
    Main.OldUserName = Main.UserName;
    $('#stream_table_user_live').empty();
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
    UserLive.loadData();
};

UserLive.loadData = function() {
    UserLive.imgMatrix = [];
    UserLive.imgMatrixId = [];
    UserLive.imgMatrixCount = 0;
    UserLive.loadingData = true;
    UserLive.loadingDataTry = 0;
    UserLive.loadingDataTimeout = 3500;
    UserLive.loadChannels();
};

UserLive.loadChannels = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = UserLive.itemsCount + UserLive.itemsCountOffset;
        if (offset !== 0 && offset >= (UserLive.MaxOffset - UserLive.ItemsLimit)) {
            offset = UserLive.MaxOffset - UserLive.ItemsLimit;
            UserLive.dataEnded = true;
            UserLive.ReplacedataEnded = true;
        }
        // TODO revise this offset, as the value here may not always correct for this particularly function
        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(Main.UserName) + '/follows/channels?limit=' +
                UserLive.ItemsLimit + '&offset=' + offset + '&sortby=last_broadcast', true);
        xmlHttp.timeout = UserLive.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');
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
    UserLive.followerChannels = '';

    for (var x = 0; x < response_items; x++) {
        UserLive.followerChannels += response.follows[x].channel.name + ',';
    }
    UserLive.followerChannels = UserLive.followerChannels.slice(0, -1);

    UserLive.loadingData = true;
    UserLive.loadingDataTry = 0;
    UserLive.loadingDataTimeout = 3500;
    UserLive.loadChannelsLive();
};

UserLive.loadChannelsLive = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = UserLive.itemsCount + UserLive.itemsCountOffset;
        if (offset !== 0 && offset >= (UserLive.MaxOffset - UserLive.ItemsLimit)) {
            offset = UserLive.MaxOffset - UserLive.ItemsLimit;
            UserLive.dataEnded = true;
            UserLive.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(UserLive.followerChannels) + '&limit=' +
                UserLive.ItemsLimit + '&offset=' + offset, true);
        xmlHttp.timeout = UserLive.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');
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
        UserLive.loadChannelsLive();
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
            row.append(UserLive.createCellEmpty(row_id, coloumn_id));
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
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "640x360");

    UserLive.imgMatrix[UserLive.imgMatrixCount] = preview_thumbnail;
    UserLive.imgMatrixId[UserLive.imgMatrixCount] = UserLive.Thumbnail + row_id + '_' + coloumn_id;
    UserLive.imgMatrixCount++;

    if (UserLive.imgMatrixCount <= (UserLive.ColoumnsCount * 3)) UserLive.newImg.src = preview_thumbnail; //try to pre cache first 4 rows

    UserLive.nameMatrix[UserLive.nameMatrixCount] = channel_name;
    UserLive.nameMatrixCount++;

    return $('<td id="' + UserLive.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="' + UserLive.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="app/images/video.png"/> \
            <div id="' + UserLive.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="' + UserLive.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
            <div id="' + UserLive.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div> \
            <div id="' + UserLive.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div> \
            <div id="' + UserLive.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
        '</div> \
             <div id="' + UserLive.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
            </div>');
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
                UserLive.status = true;
                UserLive.addFocus();
            }

            for (var i = 0; i < UserLive.imgMatrix.length; i++) {
                var tumbImg = document.getElementById(UserLive.imgMatrixId[i]);
                tumbImg.onerror = function() {
                    this.src = 'app/images/404_video.png'; //img fail to load use predefined
                };

                tumbImg.src = UserLive.imgMatrix[i];
            }

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
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');
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

    var coloumn_id, stream, mReplace = false, cursor = 0;

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
                preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "640x360");
                UserLive.nameMatrix[UserLive.nameMatrixCount] = channel_name;
                UserLive.nameMatrixCount++;
                document.getElementById(UserLive.EmptyCell + row_id + '_' + coloumn_id).setAttribute('id', UserLive.Cell + row_id + '_' + coloumn_id);
                document.getElementById(UserLive.Cell + row_id + '_' + coloumn_id).setAttribute('data-channelname', channel_name);
                document.getElementById(UserLive.Cell + row_id + '_' + coloumn_id).innerHTML =
                    '<img id="' + UserLive.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + preview_thumbnail + '"/> \
                    <div id="' + UserLive.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
                    <div id="' + UserLive.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
                    <div id="' + UserLive.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div> \
                    <div id="' + UserLive.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div> \
                    <div id="' + UserLive.ViwersDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
                    '</div> \
                    <div id="' + UserLive.QualityDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
                    </div>';
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
        UserLive.ScrollHelper.scrollVerticalToElementById(UserLive.Thumbnail + UserLive.cursorY + '_' + UserLive.cursorX);
    }, 10);
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
            Main.Go = Main.Users;
            UserLive.exit();
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
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = Main.UserChannels;
            UserLive.exit();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Main.selectedChannel = $('#' + UserLive.Cell + UserLive.cursorY + '_' + UserLive.cursorX).attr('data-channelname');
            Main.selectedChannelDisplayname = document.getElementById(UserLive.DispNameDiv + UserLive.cursorY + '_' + UserLive.cursorX).textContent;
            document.body.removeEventListener("keydown", UserLive.handleKeyDown);
            Main.openStream();
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
            Main.OldgameSelected = Main.gameSelected;
            UserLive.exit();
            break;
        case TvKeyCode.KEY_VOLUMEUP:
        case TvKeyCode.KEY_VOLUMEDOWN:
        case TvKeyCode.KEY_MUTE:
            break;
        default:
            break;
    }
};

UserLive.ScrollHelper = {
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
        if (Main.Go === Main.UserLive) {
            if (id.indexOf(UserLive.Thumbnail + '0_') == -1) {
                $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight());
            } else {
                $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight() + 275); // check Games.ScrollHelper to understand the "275"
            }
        } else return;
    }
};
