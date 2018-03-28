/*jshint multistr: true */
//Variable initialization
function UserLive() {}
UserLive.cursorY = 0;
UserLive.cursorX = 0;
UserLive.dataEnded = false;
UserLive.itemsCount = 0;
UserLive.nameMatrix = [];
UserLive.nameMatrixCount = 0;
UserLive.blankCellVector = [];
UserLive.loadingData = false;
UserLive.loadingDataTry = 0;
UserLive.loadingDataTryMax = 10;
UserLive.loadingDataTimeout = 3500;
UserLive.isDialogOn = false;
UserLive.blankCellCount = 0;
UserLive.itemsCountOffset = 0;
UserLive.LastClickFinish = true;
UserLive.keyClickDelayTime = 25;
UserLive.ReplacedataEnded = false;
UserLive.MaxOffset = 0;
UserLive.loadChannelOffsset = 0;
UserLive.emptyContent = false;

UserLive.Img = 'img_ulive';
UserLive.Thumbnail = 'thumbnail_ulive_';
UserLive.EmptyCell = 'uliveempty_';
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
UserLive.itemsCountCheck = false;

//Variable initialization end

UserLive.init = function() {
    Main.Go = Main.UserLive;
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    document.getElementById("id_agame_name").style.paddingLeft = Main.TopAgameDefaultUser + "%";
    $('.label_agame_name').html(Main.UserName + STR_LIVE_CHANNELS);
    document.body.addEventListener("keydown", UserLive.handleKeyDown, false);
    if (UserLive.OldUserName !== Main.UserName) UserLive.status = false;
    if (UserLive.status) {
        Main.ScrollHelper.scrollVerticalToElementById(UserLive.Thumbnail, UserLive.cursorY, UserLive.cursorX, Main.UserLive, Main.ScrollOffSetMinusVideo,
            Main.ScrollOffSetVideo, false);
        Main.CounterDialog(UserLive.cursorX, UserLive.cursorY, Main.ColoumnsCountVideo, UserLive.itemsCount);
    } else UserLive.StartLoad();
};

UserLive.exit = function() {
    $('#top_bar_user').removeClass('icon_center_focus');
    $('#top_bar_user').addClass('icon_center_label');
    $('.label_agame_name').html('');
    document.getElementById("id_agame_name").style.paddingLeft = Main.TopAgameDefault + "%";
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
    UserLive.blankCellVector = [];
    UserLive.itemsCountCheck = false;
    UserLive.itemsCount = 0;
    UserLive.cursorX = 0;
    UserLive.cursorY = 0;
    UserLive.dataEnded = false;
    UserLive.followerChannels = '';
    Main.CounterDialogRst();
    UserLive.loadDataPrepare();
    UserLive.loadChannels();
};

UserLive.loadDataPrepare = function() {
    UserLive.loadingData = true;
    UserLive.loadingDataTry = 0;
    UserLive.loadingDataTimeout = 3500;
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

    for (var x = 0; x < response_items; x++)
        if (UserLive.followerChannels.indexOf(response.follows[x].channel.name + ',') === -1)
            UserLive.followerChannels += response.follows[x].channel.name + ',';

    if (response_items > 0) { // response_items here is not always 99 so check until it is 0
        UserLive.loadChannelOffsset += response_items;
        UserLive.loadDataPrepare();
        UserLive.loadChannels();
    } else { // end
        UserLive.followerChannels = UserLive.followerChannels.slice(0, -1);
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
        if (offset !== 0 && offset > (UserLive.MaxOffset - 1)) {
            offset = UserLive.MaxOffset - Main.ItemsLimitVideo;
            UserLive.dataEnded = true;
            UserLive.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(UserLive.followerChannels) + '&limit=' +
            Main.ItemsLimitVideo + '&offset=' + offset + '&stream_type=all&' + Math.round(Math.random() * 1e7), true);
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

    if (response_items < Main.ItemsLimitVideo) UserLive.dataEnded = true;

    var offset_itemsCount = UserLive.itemsCount;
    UserLive.itemsCount += response_items;

    UserLive.emptyContent = UserLive.itemsCount === 0;

    var response_rows = response_items / Main.ColoumnsCountVideo;
    if (response_items % Main.ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, cell, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountVideo + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
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

        for (coloumn_id; coloumn_id < Main.ColoumnsCountVideo; coloumn_id++) {
            if (UserLive.dataEnded && !UserLive.itemsCountCheck) {
                UserLive.itemsCountCheck = true;
                UserLive.itemsCount = (row_id * Main.ColoumnsCountVideo) + coloumn_id;
            }
            row.append(Main.createCellEmpty(row_id, coloumn_id, UserLive.EmptyCell));
            UserLive.blankCellVector.push(UserLive.EmptyCell + row_id + '_' + coloumn_id);
        }
        $('#stream_table_user_live').append(row);
    }

    UserLive.loadDataSuccessFinish();
};

UserLive.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    return $('<td id="' + UserLive.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        UserLive.CellHtml(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality, preview_thumbnail, channel_name));
};

UserLive.CellMatrix = function(channel_name, preview_thumbnail, row_id, coloumn_id) {
    UserLive.nameMatrix[UserLive.nameMatrixCount] = channel_name;
    UserLive.nameMatrixCount++;
};

UserLive.CellHtml = function(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality, preview_thumbnail, channel_name) {

    UserLive.nameMatrix.push(channel_name);

    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main.VideoSize);
    if (row_id < 3) Main.PreLoadAImage(preview_thumbnail); //try to pre cache first 3 rows

    return '<div id="' + UserLive.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_video" ><img id="' + UserLive.Img + row_id + '_' +
        coloumn_id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + UserLive.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + UserLive.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div>' +
        '<div id="' + UserLive.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + UserLive.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div>' +
        '<div id="' + UserLive.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info" style="width: 40%; display: inline-block;">' + viwers + '</div>' +
        '<div id="' + UserLive.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; float: right; display: inline-block;">' + quality + '</div></div>';
};

UserLive.CellExists = function(display_name) {
    if (UserLive.nameMatrix.indexOf(display_name) > -1) {
        UserLive.blankCellCount++;
        return true;
    }
    return false;
};

UserLive.loadDataSuccessFinish = function() {
    $(document).ready(function() {
        if (!UserLive.status) {
            if (UserLive.emptyContent) Main.showWarningDialog(STR_NO + STR_LIVE_CHANNELS);
            else UserLive.status = true;

            Main.HideLoadDialog();
            UserLive.addFocus();
            Main.LazyImgStart(UserLive.Img, 9, IMG_404_VIDEO, Main.ColoumnsCountVideo);

            UserLive.loadingData = false;
        } else {
            if (UserLive.blankCellCount > 0 && !UserLive.dataEnded) {
                UserLive.loadingMore = true;
                UserLive.loadDataPrepare();
                UserLive.loadChannelsReplace();
                return;
            } else {
                UserLive.blankCellCount = 0;
                UserLive.blankCellVector = [];
            }

            UserLive.loadingData = false;
            UserLive.loadingMore = false;
        }
    });
};

UserLive.loadChannelsReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main.SetItemsLimitReload(UserLive.blankCellCount);

        var offset = UserLive.itemsCount + UserLive.itemsCountOffset;
        if (offset !== 0 && offset > (UserLive.MaxOffset - 1)) {
            offset = UserLive.MaxOffset - Main.ItemsLimitReload;
            UserLive.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main.gameSelected) +
            '&limit=' + Main.ItemsLimitReload + '&offset=' + offset, true);
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
    } else {
        UserLive.ReplacedataEnded = true;
        UserLive.blankCellCount = 0;
        UserLive.blankCellVector = [];
        UserLive.loadDataSuccessFinish();
    }
};

UserLive.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    var stream, index, cursor = 0;
    var tempVector = UserLive.blankCellVector.slice();

    UserLive.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitVideo) UserLive.ReplacedataEnded = true;


    for (var i = 0; i < UserLive.blankCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        if (UserLive.CellExists(stream.channel.name)) {
            UserLive.blankCellCount--;
            i--;
        } else {
            UserLive.replaceCellEmpty(UserLive.blankCellVector[i], stream.channel.name, stream.preview.template,
                stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
            UserLive.blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    UserLive.itemsCountOffset += cursor;
    if (UserLive.ReplacedataEnded) {
        UserLive.blankCellCount = 0;
        UserLive.blankCellVector = [];
    } else UserLive.blankCellVector = tempVector;

    UserLive.loadDataSuccessFinish();
};

UserLive.replaceCellEmpty = function(id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = UserLive.Cell + row_id + '_' + coloumn_id;

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', channel_name);
    document.getElementById(cell).innerHTML =
        UserLive.CellHtml(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality, preview_thumbnail, channel_name);
};

UserLive.addFocus = function() {
    Main.addFocusVideo(UserLive.cursorY, UserLive.cursorX, UserLive.Thumbnail, UserLive.ThumbnailDiv, UserLive.DispNameDiv, UserLive.StreamTitleDiv,
        UserLive.StreamGameDiv, UserLive.ViwersDiv, UserLive.QualityDiv, Main.UserLive, Main.ColoumnsCountVideo, UserLive.itemsCount);

    if (UserLive.cursorY > 3) Main.LazyImg(UserLive.Img, UserLive.cursorY, IMG_404_VIDEO, Main.ColoumnsCountVideo, 4);

    if (((UserLive.cursorY + Main.ItemsReloadLimitVideo) > (UserLive.itemsCount / Main.ColoumnsCountVideo)) &&
        !UserLive.dataEnded && !UserLive.loadingMore) {
        UserLive.loadingMore = true;
        UserLive.loadDataPrepare();
        UserLive.loadChannels();
    }
};

UserLive.removeFocus = function() {
    Main.removeFocusVideo(UserLive.cursorY, UserLive.cursorX, UserLive.Thumbnail, UserLive.ThumbnailDiv, UserLive.DispNameDiv, UserLive.StreamTitleDiv,
        UserLive.StreamGameDiv, UserLive.ViwersDiv, UserLive.QualityDiv);
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

    var i;

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
                for (i = (Main.ColoumnsCountVideo - 1); i > -1; i--) {
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
            for (i = 0; i < Main.ColoumnsCountVideo; i++) {
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
            for (i = 0; i < Main.ColoumnsCountVideo; i++) {
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
            if (!UserLive.loadingMore) {
                Main.Go = Main.UserHost;
                UserLive.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            if (!UserLive.loadingMore) {
                Main.Go = Main.UserChannels;
                UserLive.exit();
                Main.SwitchScreen();
            }
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
            UserLive.exit();
            Main.GoLive();
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
