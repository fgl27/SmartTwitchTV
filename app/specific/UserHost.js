/*jshint multistr: true */
//Variable initialization
function UserHost() {}
UserHost.Thumbnail = 'thumbnail_hlive_';
UserHost.EmptyCell = 'hlive_empty_';
UserHost.cursorY = 0;
UserHost.cursorX = 0;
UserHost.dataEnded = false;
UserHost.itemsCount = 0;
UserHost.imgMatrix = [];
UserHost.imgMatrixId = [];
UserHost.imgMatrixCount = 0;
UserHost.nameMatrix = [];
UserHost.nameMatrixCount = 0;
UserHost.loadingData = false;
UserHost.loadingDataTry = 0;
UserHost.loadingDataTryMax = 10;
UserHost.loadingDataTimeout = 3500;
UserHost.isDialogOn = false;
UserHost.ItemsLimit = 99;
UserHost.ColoumnsCount = 3;
UserHost.ItemsReloadLimit = Math.floor((UserHost.ItemsLimit / UserHost.ColoumnsCount) / 2);
UserHost.newImg = new Image();
UserHost.blankCellCount = 0;
UserHost.itemsCountOffset = 0;
UserHost.LastClickFinish = true;
UserHost.keyClickDelayTime = 25;
UserHost.ReplacedataEnded = false;
UserHost.MaxOffset = 0;

UserHost.ThumbnailDiv = 'hlive_thumbnail_div_';
UserHost.DispNameDiv = 'hlive_display_name_';
UserHost.hostsTitleDiv = 'hlive_hosts_title_';
UserHost.hostsGameDiv = 'hlive_hosts_game_';
UserHost.ViwersDiv = 'hlive_viwers_';
UserHost.Cell = 'hlive_cell_';
UserHost.status = false;
UserHost.followerChannels = '';
UserHost.OldUserName = '';

//Variable initialization end

UserHost.init = function() {
    Main.Go = Main.UserHost;
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    document.getElementById("id_agame_name").style.paddingLeft = "44%";
    $('.label_agame_name').html(Main.UserName + STR_LIVE_HOSTS);
    document.body.addEventListener("keydown", UserHost.handleKeyDown, false);
    if (UserHost.OldUserName !== Main.UserName) UserHost.status = false;
    if (UserHost.status) Main.ScrollHelper.scrollVerticalToElementById(UserHost.Thumbnail, UserHost.cursorY, UserHost.cursorX, Main.UserHost, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
    else UserHost.StartLoad();
};

UserHost.exit = function() {
    $('#top_bar_user').removeClass('icon_center_focus');
    $('#top_bar_user').addClass('icon_center_label');
    $('.label_agame_name').html('');
    document.getElementById("id_agame_name").style.paddingLeft = "50%";
    document.body.removeEventListener("keydown", UserHost.handleKeyDown);
};

UserHost.StartLoad = function() {
    Main.HideWarningDialog();
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    UserHost.OldUserName = Main.UserName;
    UserHost.status = false;
    $('#stream_table_user_host').empty();
    UserHost.loadingMore = false;
    UserHost.blankCellCount = 0;
    UserHost.itemsCountOffset = 0;
    UserHost.ReplacedataEnded = false;
    UserHost.MaxOffset = 0;
    UserHost.nameMatrix = [];
    UserHost.nameMatrixCount = 0;
    UserHost.itemsCount = 0;
    UserHost.cursorX = 0;
    UserHost.cursorY = 0;
    UserHost.dataEnded = false;
    UserHost.loadData();
};

UserHost.loadData = function() {
    UserHost.imgMatrix = [];
    UserHost.imgMatrixId = [];
    UserHost.imgMatrixCount = 0;
    UserHost.loadingData = true;
    UserHost.loadingDataTry = 0;
    UserHost.loadingDataTimeout = 3500;
    UserHost.loadChannels();
};

UserHost.loadChannels = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = UserHost.itemsCount + UserHost.itemsCountOffset;
        if (offset !== 0 && offset >= (UserHost.MaxOffset - UserHost.ItemsLimit)) {
            offset = UserHost.MaxOffset - UserHost.ItemsLimit;
            UserHost.dataEnded = true;
            UserHost.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/api/users/' + encodeURIComponent(Main.UserName) + '/followed/hosting?limit=' +
            UserLive.ItemsLimit + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserHost.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        UserHost.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    UserHost.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserHost.loadDataError();
    }
};

UserHost.loadDataError = function() {
    UserHost.loadingDataTry++;
    if (UserHost.loadingDataTry < UserHost.loadingDataTryMax) {
        UserHost.loadingDataTimeout += (UserHost.loadingDataTry < 5) ? 250 : 3500;
        UserHost.loadChannels();
    } else {
        UserHost.loadingData = false;
        UserHost.loadingMore = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

UserHost.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.hosts.length;
    UserHost.MaxOffset = parseInt(response._total);

    if (response_items < UserHost.ItemsLimit) UserHost.dataEnded = true;

    var offset_itemsCount = UserHost.itemsCount;
    UserHost.itemsCount += response_items;

    var response_rows = response_items / UserHost.ColoumnsCount;
    if (response_items % UserHost.ColoumnsCount > 0) response_rows++;

    var coloumn_id, row_id, row, cell, hosts,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / UserHost.ColoumnsCount + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < UserHost.ColoumnsCount && cursor < response_items; coloumn_id++, cursor++) {
            hosts = response.hosts[cursor];
            if (UserHost.CellExists(hosts.target.channel.name)) coloumn_id--;
            else {
                cell = UserHost.createCell(row_id, coloumn_id, hosts.target.channel.name, hosts.target.preview_urls.template,
                    hosts.target.title, hosts.target.meta_game, hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name,
                    Main.addCommas(hosts.target.viewers) + STR_VIEWER);
                row.append(cell);
            }
        }

        for (coloumn_id; coloumn_id < UserHost.ColoumnsCount; coloumn_id++) {
            row.append(UserHost.createCellEmpty(row_id, coloumn_id));
        }
        $('#stream_table_user_host').append(row);
    }

    UserHost.loadDataSuccessFinish();
};

UserHost.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="' + UserHost.EmptyCell + row_id + '_' + coloumn_id + '" class="hosts_cell" data-channelname=""></td>').html('');
};

UserHost.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, hosts_title, hosts_game, channel_display_name, viwers) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "640x360");

    UserHost.imgMatrix[UserHost.imgMatrixCount] = preview_thumbnail;
    UserHost.imgMatrixId[UserHost.imgMatrixCount] = UserHost.Thumbnail + row_id + '_' + coloumn_id;
    UserHost.imgMatrixCount++;

    if (UserHost.imgMatrixCount <= (UserHost.ColoumnsCount * 3)) UserHost.newImg.src = preview_thumbnail; //try to pre cache first 4 rows

    UserHost.nameMatrix[UserHost.nameMatrixCount] = channel_name;
    UserHost.nameMatrixCount++;

    return $('<td id="' + UserHost.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="' + UserHost.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="app/images/video.png"/> \
            <div id="' + UserHost.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="' + UserHost.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
            <div id="' + UserHost.hostsTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + hosts_title + '</div> \
            <div id="' + UserHost.hostsGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + hosts_game + '</div> \
            <div id="' + UserHost.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
        '</div> \
            </div>');
};

UserHost.CellExists = function(display_name) {
    for (var i = 0; i <= UserHost.nameMatrixCount; i++) {
        if (display_name == UserHost.nameMatrix[i]) {
            UserHost.blankCellCount++;
            return true;
        }
    }
    return false;
};

//prevent hosts_text/title/info from load before the thumbnail and display a odd hosts_table squashed only with names source
//https://imagesloaded.desandro.com/
UserHost.loadDataSuccessFinish = function() {
    $('#stream_table_user_host').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!UserHost.status) {
                Main.HideLoadDialog();
                UserHost.status = true;
                UserHost.addFocus();
            }

            for (var i = 0; i < UserHost.imgMatrix.length; i++) {
                var tumbImg = document.getElementById(UserHost.imgMatrixId[i]);
                tumbImg.onerror = function() {
                    this.src = IMG_404_VIDEO; //img fail to load use predefined
                };

                tumbImg.src = UserHost.imgMatrix[i];
            }

            if (UserHost.blankCellCount > 0 && !UserHost.dataEnded) {
                UserHost.loadingMore = true;
                UserHost.loadDataReplace();
                return;
            } else UserHost.blankCellCount = 0;

            UserHost.loadingData = false;
            UserHost.loadingMore = false;
        });
};

UserHost.loadDataReplace = function() {
    UserHost.imgMatrix = [];
    UserHost.imgMatrixId = [];
    UserHost.imgMatrixCount = 0;
    UserHost.loadingData = true;
    UserHost.loadingDataTry = 0;
    UserHost.loadingDataTimeout = 3500;
    UserHost.loadChannelsReplace();
};

UserHost.loadChannelsReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = UserHost.itemsCount + UserHost.itemsCountOffset;
        if (offset !== 0 && offset >= (UserHost.MaxOffset - UserHost.ItemsLimit)) {
            offset = UserHost.MaxOffset - UserHost.ItemsLimit;
            UserHost.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/hosts?game=' + encodeURIComponent(Main.gameSelected) +
            '&limit=' + UserHost.ItemsLimit + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserHost.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        UserHost.loadDataSuccessReplace(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserHost.loadDataErrorReplace();
    }
};

UserHost.loadDataErrorReplace = function() {
    UserHost.loadingDataTry++;
    if (UserHost.loadingDataTry < UserHost.loadingDataTryMax) {
        UserHost.loadingDataTimeout += (UserHost.loadingDataTry < 5) ? 250 : 3500;
        UserHost.loadChannelsReplace();
    }
};

UserHost.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.hosts.length;
    UserHost.MaxOffset = parseInt(response._total);

    if (response_items < UserHost.ItemsLimit) UserHost.ReplacedataEnded = true;

    var row_id = UserHost.itemsCount / UserHost.ColoumnsCount;

    var coloumn_id, hosts, mReplace = false,
        cursor = 0;

    for (cursor; cursor < response_items; cursor++) {
        hosts = response.hosts[cursor];
        if (UserHost.CellExists(hosts.target.channel.name)) UserHost.blankCellCount--;
        else {
            mReplace = UserHost.replaceCellEmpty(row_id, coloumn_id, hosts.target.channel.name, hosts.target.preview_urls.template,
                hosts.target.title, hosts.target.meta_game, hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name,
                Main.addCommas(hosts.target.viewers) + STR_VIEWER);
            if (mReplace) UserHost.blankCellCount--;
            if (UserHost.blankCellCount === 0) break;
        }
    }
    UserHost.itemsCountOffset += cursor;
    if (UserHost.ReplacedataEnded) UserHost.blankCellCount = 0;
    UserHost.loadDataSuccessFinish();
};

UserHost.replaceCellEmpty = function(row_id, coloumn_id, channel_name, preview_thumbnail, hosts_title, hosts_game, channel_display_name, viwers) {
    var my = 0,
        mx = 0;
    if (row_id < ((UserHost.ItemsLimit / UserHost.ColoumnsCount) - 1)) return false;
    for (my = row_id - (1 + Math.ceil(UserHost.blankCellCount / UserHost.ColoumnsCount)); my < row_id; my++) {
        for (mx = 0; mx < UserHost.ColoumnsCount; mx++) {
            if (!Main.ThumbNull(my, mx, UserHost.Thumbnail) && (Main.ThumbNull(my, mx, UserHost.EmptyCell))) {
                row_id = my;
                coloumn_id = mx;
                preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "640x360");
                UserHost.nameMatrix[UserHost.nameMatrixCount] = channel_name;
                UserHost.nameMatrixCount++;
                document.getElementById(UserHost.EmptyCell + row_id + '_' + coloumn_id).setAttribute('id', UserHost.Cell + row_id + '_' + coloumn_id);
                document.getElementById(UserHost.Cell + row_id + '_' + coloumn_id).setAttribute('data-channelname', channel_name);
                document.getElementById(UserHost.Cell + row_id + '_' + coloumn_id).innerHTML =
                    '<img id="' + UserHost.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + preview_thumbnail + '"/> \
                    <div id="' + UserHost.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
                    <div id="' + UserHost.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
                    <div id="' + UserHost.hostsTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + hosts_title + '</div> \
                    <div id="' + UserHost.hostsGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + hosts_game + '</div> \
                    <div id="' + UserHost.ViwersDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info_games" style="width: 64%; display: inline-block;">' + viwers +
                    '</div> \
                    </div>';
                return true;
            }
        }
    }

    return false;
};

UserHost.addFocus = function() {
    if (((UserHost.cursorY + UserHost.ItemsReloadLimit) > (UserHost.itemsCount / UserHost.ColoumnsCount)) &&
        !UserHost.dataEnded && !UserHost.loadingMore) {
        UserHost.loadingMore = true;
        UserHost.loadData();
    }

    $('#' + UserHost.Thumbnail + UserHost.cursorY + '_' + UserHost.cursorX).addClass('stream_thumbnail_focused');
    $('#' + UserHost.ThumbnailDiv + UserHost.cursorY + '_' + UserHost.cursorX).addClass('stream_text_focused');
    $('#' + UserHost.DispNameDiv + UserHost.cursorY + '_' + UserHost.cursorX).addClass('stream_channel_focused');
    $('#' + UserHost.hostsTitleDiv + UserHost.cursorY + '_' + UserHost.cursorX).addClass('stream_info_focused');
    $('#' + UserHost.hostsGameDiv + UserHost.cursorY + '_' + UserHost.cursorX).addClass('stream_info_focused');
    $('#' + UserHost.ViwersDiv + UserHost.cursorY + '_' + UserHost.cursorX).addClass('stream_info_focused');
    window.setTimeout(function() {
        Main.ScrollHelper.scrollVerticalToElementById(UserHost.Thumbnail, UserHost.cursorY, UserHost.cursorX, Main.UserHost, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
    }, 10);
};

UserHost.removeFocus = function() {
    $('#' + UserHost.Thumbnail + UserHost.cursorY + '_' + UserHost.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + UserHost.ThumbnailDiv + UserHost.cursorY + '_' + UserHost.cursorX).removeClass('stream_text_focused');
    $('#' + UserHost.DispNameDiv + UserHost.cursorY + '_' + UserHost.cursorX).removeClass('stream_channel_focused');
    $('#' + UserHost.hostsTitleDiv + UserHost.cursorY + '_' + UserHost.cursorX).removeClass('stream_info_focused');
    $('#' + UserHost.hostsGameDiv + UserHost.cursorY + '_' + UserHost.cursorX).removeClass('stream_info_focused');
    $('#' + UserHost.ViwersDiv + UserHost.cursorY + '_' + UserHost.cursorX).removeClass('stream_info_focused');
};

UserHost.keyClickDelay = function() {
    UserHost.LastClickFinish = true;
};

UserHost.handleKeyDown = function(event) {
    if (UserHost.loadingData && !UserHost.loadingMore) {
        event.preventDefault();
        return;
    } else if (!UserHost.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        UserHost.LastClickFinish = false;
        window.setTimeout(UserHost.keyClickDelay, UserHost.keyClickDelayTime);
    }

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                Main.Go = Main.Users;
                UserHost.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((UserHost.cursorY), (UserHost.cursorX - 1), UserHost.Thumbnail)) {
                UserHost.removeFocus();
                UserHost.cursorX--;
                UserHost.addFocus();
            } else {
                for (i = (UserHost.ColoumnsCount - 1); i > -1; i--) {
                    if (Main.ThumbNull((UserHost.cursorY - 1), i, UserHost.Thumbnail)) {
                        UserHost.removeFocus();
                        UserHost.cursorY--;
                        UserHost.cursorX = i;
                        UserHost.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.ThumbNull((UserHost.cursorY), (UserHost.cursorX + 1), UserHost.Thumbnail)) {
                UserHost.removeFocus();
                UserHost.cursorX++;
                UserHost.addFocus();
            } else if (Main.ThumbNull((UserHost.cursorY + 1), 0, UserHost.Thumbnail)) {
                UserHost.removeFocus();
                UserHost.cursorY++;
                UserHost.cursorX = 0;
                UserHost.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < UserHost.ColoumnsCount; i++) {
                if (Main.ThumbNull((UserHost.cursorY - 1), (UserHost.cursorX - i), UserHost.Thumbnail)) {
                    UserHost.removeFocus();
                    UserHost.cursorY--;
                    UserHost.cursorX = UserHost.cursorX - i;
                    UserHost.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < UserHost.ColoumnsCount; i++) {
                if (Main.ThumbNull((UserHost.cursorY + 1), (UserHost.cursorX - i), UserHost.Thumbnail)) {
                    UserHost.removeFocus();
                    UserHost.cursorY++;
                    UserHost.cursorX = UserHost.cursorX - i;
                    UserHost.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!UserHost.loadingMore) UserHost.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            Main.Go = Main.UserGames;
            UserHost.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = Main.UserLive;
            UserHost.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Play.selectedChannel = $('#' + UserHost.Cell + UserHost.cursorY + '_' + UserHost.cursorX).attr('data-channelname');
            Play.selectedChannelDisplayname = document.getElementById(UserHost.DispNameDiv + UserHost.cursorY + '_' + UserHost.cursorX).textContent;
            document.body.removeEventListener("keydown", UserHost.handleKeyDown);
            Main.openStream();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Main.Go = Main.Live;
            UserHost.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.UserHost;
            Main.Go = Main.Search;
            UserHost.exit();
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
