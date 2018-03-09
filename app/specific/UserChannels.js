/*jshint multistr: true */
//Variable initialization
function UserChannels() {}
UserChannels.Thumbnail = 'thumbnail_uchannel_';
UserChannels.EmptyCell = 'uchannel_empty_';
UserChannels.cursorY = 0;
UserChannels.cursorX = 0;
UserChannels.dataEnded = false;
UserChannels.itemsCount = 0;
UserChannels.imgMatrix = [];
UserChannels.imgMatrixId = [];
UserChannels.imgMatrixCount = 0;
UserChannels.nameMatrix = [];
UserChannels.nameMatrixCount = 0;
UserChannels.loadingData = false;
UserChannels.loadingDataTry = 0;
UserChannels.loadingDataTryMax = 10;
UserChannels.loadingDataTimeout = 3500;
UserChannels.LastClickFinish = true;
UserChannels.keyClickDelayTime = 25;
UserChannels.UserChannelsList = [];
UserChannels.loadChannelOffsset = 0;
UserChannels.emptyContent = false;

UserChannels.ThumbnailDiv = 'uchannel_thumbnail_div_';
UserChannels.DispNameDiv = 'uchannel_display_name_';
UserChannels.Cell = 'uchannel_cell_';
UserChannels.Status = false;
UserChannels.OldUserName = '';

//Variable initialization end

UserChannels.init = function() {
    Main.Go = Main.UserChannels;
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    document.getElementById("id_agame_name").style.paddingLeft = "44%";
    $('.label_agame_name').html(Main.UserName + STR_USER_CHANNEL);
    document.body.addEventListener("keydown", UserChannels.handleKeyDown, false);
    if (UserChannels.OldUserName !== Main.UserName) UserChannels.Status = false;
    if (UserChannels.Status) {
        Main.ScrollHelper.scrollVerticalToElementById(UserChannels.Thumbnail, UserChannels.cursorY, UserChannels.cursorX, Main.UserChannels,
            Main.ScrollOffSetMinusChannels, Main.ScrollOffSetVideo, true);
        Main.CounterDialog(UserChannels.cursorX, UserChannels.cursorY, Main.ColoumnsCountChannel, UserChannels.itemsCount);
    } else UserChannels.StartLoad();
};

UserChannels.exit = function() {
    $('#top_bar_user').removeClass('icon_center_focus');
    $('#top_bar_user').addClass('icon_center_label');
    $('.label_agame_name').html('');
    document.getElementById("id_agame_name").style.paddingLeft = "50%";
    document.body.removeEventListener("keydown", UserChannels.handleKeyDown);
};

UserChannels.StartLoad = function() {
    Main.HideWarningDialog();
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    UserChannels.OldUserName = Main.UserName;
    UserChannels.Status = false;
    $('#' + Main.TempTable).empty();
    UserChannels.loadingMore = false;
    UserChannels.loadChannelOffsset = 0;
    UserChannels.itemsCount = 0;
    UserChannels.cursorX = 0;
    UserChannels.cursorY = 0;
    UserChannels.dataEnded = false;
    Main.CounterDialogRst();
    UserChannels.UserChannelsList = [];
    UserChannels.loadDataPrepare();
    UserChannels.loadChannels();
};

UserChannels.loadDataPrepare = function() {
    UserChannels.loadingData = true;
    UserChannels.loadingDataTry = 0;
    UserChannels.loadingDataTimeout = 3500;
};

UserChannels.loadChannels = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(Main.UserName) + '/follows/channels?limit=100&offset=' +
            UserChannels.loadChannelOffsset + '&sortby=created_at&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserChannels.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        UserChannels.loadChannelLive(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    UserChannels.loadDataError();
                }
            }
        };
        xmlHttp.send(null);
    } catch (e) {
        UserChannels.loadDataError();
    }
};

UserChannels.loadDataError = function() {
    UserChannels.loadingDataTry++;
    if (UserChannels.loadingDataTry < UserChannels.loadingDataTryMax) {
        UserChannels.loadingDataTimeout += (UserChannels.loadingDataTry < 5) ? 250 : 3500;
        UserChannels.loadChannels();
    } else {
        UserChannels.loadingData = false;
        UserChannels.loadingMore = false;
        UserChannels.Status = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

UserChannels.loadChannelLive = function(responseText) {
    var response = $.parseJSON(responseText);

    var response_items = response.follows.length;
    var TempCount = UserChannels.UserChannelsList.length;
    var ChannelTemp = '';
    var existCount = 0;

    for (var x = TempCount; x < (TempCount + response_items); x++) {
        ChannelTemp = response.follows[x - TempCount].channel.display_name + ',' +
            response.follows[x - TempCount].channel.name + ',' + response.follows[x - TempCount].channel.logo;
        if (UserChannels.UserChannelsList.indexOf(ChannelTemp) === -1) UserChannels.UserChannelsList[x - existCount] = ChannelTemp;
        else existCount++;
    }

    if (response_items > 0) { // response_items here is not always 99 so check until it is 0
        UserChannels.loadChannelOffsset += response_items;
        UserChannels.loadDataPrepare();
        UserChannels.loadChannels();
    } else { // end
        UserChannels.UserChannelsList.sort(function(a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        UserChannels.imgMatrix = [];
        UserChannels.imgMatrixId = [];
        UserChannels.imgMatrixCount = 0;
        UserChannels.loadDataSuccess();
    }
};

UserChannels.loadDataSuccess = function() {
    var response_items = Main.ItemsLimitChannel;
    var offset_itemsCount = UserChannels.itemsCount;
    var rest = UserChannels.UserChannelsList.length - offset_itemsCount;
    if (rest < response_items) response_items = rest;

    if (response_items < Main.ItemsLimitChannel) UserChannels.dataEnded = true;

    UserChannels.itemsCount += response_items;

    UserChannels.emptyContent = UserChannels.itemsCount === 0;

    var response_rows = response_items / Main.ColoumnsCountChannel;
    if (response_items % Main.ColoumnsCountChannel > 0) response_rows++;

    var coloumn_id, row_id, row, channel,
        cursor = offset_itemsCount;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountChannel + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountChannel && cursor < UserChannels.UserChannelsList.length; coloumn_id++, cursor++) {
            channel = UserChannels.UserChannelsList[cursor].split(",");
            row.append(UserChannels.createCell(row_id, coloumn_id, channel[0], channel[1], channel[2]));
        }

        for (coloumn_id; coloumn_id < Main.ColoumnsCountChannel; coloumn_id++) {
            row.append(Main.createCellEmpty(row_id, coloumn_id, UserChannels.EmptyCell));
        }
        $('#' + Main.TempTable).append(row);
    }

    UserChannels.loadDataSuccessFinish();
};

UserChannels.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="' + UserChannels.EmptyCell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
};

UserChannels.createCell = function(row_id, coloumn_id, channel_display_name, channel_name, preview_thumbnail) {
    UserChannels.imgMatrix[UserChannels.imgMatrixCount] = preview_thumbnail;
    UserChannels.imgMatrixId[UserChannels.imgMatrixCount] = UserChannels.Thumbnail + row_id + '_' + coloumn_id;
    UserChannels.imgMatrixCount++;

    if (UserChannels.imgMatrixCount < (Main.ColoumnsCountChannel * 6)) Main.PreLoadAImage(preview_thumbnail); //try to pre cache first 4 rows

    UserChannels.nameMatrix[UserChannels.nameMatrixCount] = channel_name;
    UserChannels.nameMatrixCount++;

    return $('<td id="' + UserChannels.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="' + UserChannels.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_LOGO + '"/>' +
        '<div id="' + UserChannels.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + UserChannels.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div></div>');
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
UserChannels.loadDataSuccessFinish = function() {
    $('#' + Main.TempTable).imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!UserChannels.Status) {
                if (UserChannels.emptyContent) Main.showWarningDialog(STR_NO + STR_USER_CHANNEL);
                else UserChannels.Status = true;

                Main.ReplaceTable('stream_table_user_channels');

                Main.HideLoadDialog();
                UserChannels.addFocus();
                Main.LoadImages(UserChannels.imgMatrix, UserChannels.imgMatrixId, IMG_404_LOGO);

                UserChannels.loadingData = false;
            } else {
                Main.AddTable('stream_table_user_channels');
                Main.LoadImages(UserChannels.imgMatrix, UserChannels.imgMatrixId, IMG_404_LOGO);

                UserChannels.loadingData = false;
                UserChannels.loadingMore = false;

            }
        });
};

UserChannels.addFocus = function() {
    if (((UserChannels.cursorY + Main.ItemsReloadLimitChannel) > (UserChannels.itemsCount / Main.ColoumnsCountChannel)) &&
        !UserChannels.dataEnded && !UserChannels.loadingMore) {
        UserChannels.loadingMore = true;
        UserChannels.loadDataPrepare();
        UserChannels.loadChannels();
    }

    $('#' + UserChannels.Thumbnail + UserChannels.cursorY + '_' + UserChannels.cursorX).addClass('stream_thumbnail_focused');
    $('#' + UserChannels.ThumbnailDiv + UserChannels.cursorY + '_' + UserChannels.cursorX).addClass('stream_text_focused');
    $('#' + UserChannels.DispNameDiv + UserChannels.cursorY + '_' + UserChannels.cursorX).addClass('stream_channel_focused');
    window.setTimeout(function() {
        Main.ScrollHelper.scrollVerticalToElementById(UserChannels.Thumbnail, UserChannels.cursorY, UserChannels.cursorX, Main.UserChannels, Main.ScrollOffSetMinusChannels, Main.ScrollOffSetVideo, true);
    }, 10);

    Main.CounterDialog(UserChannels.cursorX, UserChannels.cursorY, Main.ColoumnsCountChannel, UserChannels.itemsCount);
};

UserChannels.removeFocus = function() {
    $('#' + UserChannels.Thumbnail + UserChannels.cursorY + '_' + UserChannels.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + UserChannels.ThumbnailDiv + UserChannels.cursorY + '_' + UserChannels.cursorX).removeClass('stream_text_focused');
    $('#' + UserChannels.DispNameDiv + UserChannels.cursorY + '_' + UserChannels.cursorX).removeClass('stream_channel_focused');
};

UserChannels.keyClickDelay = function() {
    UserChannels.LastClickFinish = true;
};

UserChannels.handleKeyDown = function(event) {
    if ((UserChannels.loadingData && !UserChannels.loadingMore) || !UserChannels.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        UserChannels.LastClickFinish = false;
        window.setTimeout(UserChannels.keyClickDelay, UserChannels.keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else if (!UserChannels.loadingMore) {
                Main.Go = Main.Users;
                UserChannels.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((UserChannels.cursorY), (UserChannels.cursorX - 1), UserChannels.Thumbnail)) {
                UserChannels.removeFocus();
                UserChannels.cursorX--;
                UserChannels.addFocus();
            } else {
                for (i = (Main.ColoumnsCountChannel - 1); i > -1; i--) {
                    if (Main.ThumbNull((UserChannels.cursorY - 1), i, UserChannels.Thumbnail)) {
                        UserChannels.removeFocus();
                        UserChannels.cursorY--;
                        UserChannels.cursorX = i;
                        UserChannels.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.ThumbNull((UserChannels.cursorY), (UserChannels.cursorX + 1), UserChannels.Thumbnail)) {
                UserChannels.removeFocus();
                UserChannels.cursorX++;
                UserChannels.addFocus();
            } else if (Main.ThumbNull((UserChannels.cursorY + 1), 0, UserChannels.Thumbnail)) {
                UserChannels.removeFocus();
                UserChannels.cursorY++;
                UserChannels.cursorX = 0;
                UserChannels.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Main.ColoumnsCountChannel; i++) {
                if (Main.ThumbNull((UserChannels.cursorY - 1), (UserChannels.cursorX - i), UserChannels.Thumbnail)) {
                    UserChannels.removeFocus();
                    UserChannels.cursorY--;
                    UserChannels.cursorX = UserChannels.cursorX - i;
                    UserChannels.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Main.ColoumnsCountChannel; i++) {
                if (Main.ThumbNull((UserChannels.cursorY + 1), (UserChannels.cursorX - i), UserChannels.Thumbnail)) {
                    UserChannels.removeFocus();
                    UserChannels.cursorY++;
                    UserChannels.cursorX = UserChannels.cursorX - i;
                    UserChannels.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!UserChannels.loadingMore) UserChannels.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            if (!UserChannels.loadingMore) {
                Main.Go = Main.UserLive;
                UserChannels.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            if (!UserChannels.loadingMore) {
                Main.Go = Main.UserGames;
                UserChannels.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Main.selectedChannel = $('#' + UserChannels.Cell + UserChannels.cursorY + '_' + UserChannels.cursorX).attr('data-channelname');
            Main.selectedChannelDisplayname = document.getElementById(UserChannels.DispNameDiv + UserChannels.cursorY + '_' + UserChannels.cursorX).textContent;
            Main.selectedChannelChannelLogo = document.getElementById(UserChannels.Thumbnail + UserChannels.cursorY + '_' + UserChannels.cursorX).src;
            document.body.removeEventListener("keydown", UserChannels.handleKeyDown);
            Main.Before = Main.UserChannels;
            Main.Go = Main.SChannelContent;
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Main.Go = Main.Live;
            UserChannels.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.UserChannels;
            Main.Go = Main.Search;
            UserChannels.exit();
            Main.SwitchScreen();
            break;
        default:
            break;
    }
};
