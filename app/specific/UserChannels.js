/*jshint multistr: true */
//Variable initialization
function UserChannels() {}
UserChannels.cursorY = 0;
UserChannels.cursorX = 0;
UserChannels.dataEnded = false;
UserChannels.itemsCount = 0;
UserChannels.loadingData = false;
UserChannels.loadingDataTry = 0;
UserChannels.loadingDataTryMax = 10;
UserChannels.loadingDataTimeout = 3500;
UserChannels.LastClickFinish = true;
UserChannels.keyClickDelayTime = 25;
UserChannels.UserChannelsList = [];
UserChannels.loadChannelOffsset = 0;
UserChannels.emptyContent = false;

UserChannels.Img = 'img_uchannel';
UserChannels.Thumbnail = 'thumbnail_uchannel_';
UserChannels.EmptyCell = 'uchannelempty_';
UserChannels.ThumbnailDiv = 'uchannel_thumbnail_div_';
UserChannels.DispNameDiv = 'uchannel_display_name_';
UserChannels.Cell = 'uchannel_cell_';
UserChannels.Status = false;
UserChannels.OldUserName = '';
UserChannels.itemsCountCheck = false;

//Variable initialization end

UserChannels.init = function() {
    Main.Go = Main.UserChannels;
    SChannels.isLastSChannels = false;
    $('#top_bar_user').addClass('icon_center_focus');
    document.getElementById("id_agame_name").style.paddingLeft = Main.TopAgameDefaultUser + "%";
    $('.label_agame_name').html(Main.UserName + STR_USER_CHANNEL);
    document.body.addEventListener("keydown", UserChannels.handleKeyDown, false);
    Main.YRst(UserChannels.cursorY);
    if (UserChannels.OldUserName !== Main.UserName) UserChannels.Status = false;
    if (UserChannels.Status) {
        Main.ScrollHelper.scrollVerticalToElementById(UserChannels.Thumbnail, UserChannels.cursorY, UserChannels.cursorX, Main.UserChannels,
            Main.ScrollOffSetMinusChannels, Main.ScrollOffSetVideo, true);
        Main.CounterDialog(UserChannels.cursorX, UserChannels.cursorY, Main.ColoumnsCountChannel, UserChannels.itemsCount);
    } else UserChannels.StartLoad();
};

UserChannels.exit = function() {
    $('#top_bar_user').removeClass('icon_center_focus');
    $('.label_agame_name').html('');
    document.getElementById("id_agame_name").style.paddingLeft = Main.TopAgameDefault + "%";
    document.body.removeEventListener("keydown", UserChannels.handleKeyDown);
};

UserChannels.StartLoad = function() {
    Main.HideWarningDialog();
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    UserChannels.OldUserName = Main.UserName;
    UserChannels.Status = false;
    $('#stream_table_user_channels').empty();
    UserChannels.loadingMore = false;
    UserChannels.loadChannelOffsset = 0;
    UserChannels.itemsCount = 0;
    UserChannels.cursorX = 0;
    UserChannels.cursorY = 0;
    UserChannels.dataEnded = false;
    UserChannels.itemsCountCheck = false;
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
                    UserChannels.loadChannelLive(xmlHttp.responseText);
                    return;
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
    var response = JSON.parse(responseText),
        response_items = response.follows.length;

    if (response_items > 0) { // response_items here is not always 99 because banned channels, so check until it is 0
        var ChannelTemp = '';
        x = 0;

        for (x; x < response_items; x++) {
            ChannelTemp = response.follows[x].channel.display_name + ',' + response.follows[x].channel._id + ',' + response.follows[x].channel.name +
                ',' + response.follows[x].channel.logo + ',' + response.follows[x].channel.views + ',' + response.follows[x].channel.followers;
            if (UserChannels.UserChannelsList.indexOf(ChannelTemp) === -1) UserChannels.UserChannelsList.push(ChannelTemp);
        }

        UserChannels.loadChannelOffsset += response_items;
        UserChannels.loadDataPrepare();
        UserChannels.loadChannels();
    } else { // end
        UserChannels.UserChannelsList.sort(function(a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
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

    UserChannels.emptyContent = !UserChannels.itemsCount;

    var response_rows = response_items / Main.ColoumnsCountChannel;
    if (response_items % Main.ColoumnsCountChannel > 0) response_rows++;

    var coloumn_id, row_id, row, channel,
        cursor = offset_itemsCount;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountChannel + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountChannel && cursor < UserChannels.UserChannelsList.length; coloumn_id++, cursor++) {
            channel = UserChannels.UserChannelsList[cursor].split(",");
            row.append(UserChannels.createCell(row_id, coloumn_id, channel[0], channel[1], channel[2], channel[3], channel[4], channel[5]));
        }
        for (coloumn_id; coloumn_id < Main.ColoumnsCountChannel; coloumn_id++) {
            if (UserChannels.dataEnded && !UserChannels.itemsCountCheck) {
                UserChannels.itemsCountCheck = true;
                UserChannels.itemsCount = (row_id * Main.ColoumnsCountChannel) + coloumn_id;
            }
            row.append(Main.createCellEmpty(row_id, coloumn_id, UserChannels.EmptyCell));
        }
        $('#stream_table_user_channels').append(row);
    }
    UserChannels.loadDataSuccessFinish();
};

UserChannels.createCell = function(row_id, coloumn_id, channel_display_name, _id, channel_name, preview_thumbnail, views, followers) {

    if (row_id < 5) Main.PreLoadAImage(preview_thumbnail); //try to pre cache first 2 rows

    return $('<td id="' + UserChannels.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '" data-id="' + _id + '" data-views="' + views + '" data-followers="' + followers + '"></td>').html('<div id="' + UserChannels.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_channel" ><img id="' + UserChannels.Img +
        row_id + '_' + coloumn_id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + UserChannels.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + UserChannels.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div></div>');
};

UserChannels.loadDataSuccessFinish = function() {
    $(document).ready(function() {
        if (!UserChannels.Status) {
            Main.HideLoadDialog();
            if (UserChannels.emptyContent) Main.showWarningDialog(STR_NO + STR_USER_CHANNEL);
            else {
                UserChannels.Status = true;
                UserChannels.addFocus();
                Main.LazyImgStart(UserChannels.Img, 9, IMG_404_LOGO, Main.ColoumnsCountChannel);
            }
            UserChannels.loadingData = false;
        } else {
            UserChannels.loadingData = false;
            UserChannels.loadingMore = false;
        }
    });
};

UserChannels.addFocus = function() {

    $('#' + UserChannels.Thumbnail + UserChannels.cursorY + '_' + UserChannels.cursorX).addClass('stream_thumbnail_focused');
    $('#' + UserChannels.ThumbnailDiv + UserChannels.cursorY + '_' + UserChannels.cursorX).addClass('stream_text_focused');
    $('#' + UserChannels.DispNameDiv + UserChannels.cursorY + '_' + UserChannels.cursorX).addClass('stream_info_focused');
    window.setTimeout(function() {
        Main.ScrollHelper.scrollVerticalToElementById(UserChannels.Thumbnail, UserChannels.cursorY, UserChannels.cursorX, Main.UserChannels, Main.ScrollOffSetMinusChannels, Main.ScrollOffSetVideo, true);
    }, 10);

    Main.CounterDialog(UserChannels.cursorX, UserChannels.cursorY, Main.ColoumnsCountChannel, UserChannels.itemsCount);

    if (UserChannels.cursorY > 3) Main.LazyImg(UserChannels.Img, UserChannels.cursorY, IMG_404_LOGO, Main.ColoumnsCountChannel, 4);

    if (((UserChannels.cursorY + Main.ItemsReloadLimitChannel) > (UserChannels.itemsCount / Main.ColoumnsCountChannel)) &&
        !UserChannels.dataEnded && !UserChannels.loadingMore) {
        UserChannels.loadingMore = true;
        UserChannels.loadDataPrepare();
        UserChannels.loadChannels();
    }
};

UserChannels.removeFocus = function() {
    $('#' + UserChannels.Thumbnail + UserChannels.cursorY + '_' + UserChannels.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + UserChannels.ThumbnailDiv + UserChannels.cursorY + '_' + UserChannels.cursorX).removeClass('stream_text_focused');
    $('#' + UserChannels.DispNameDiv + UserChannels.cursorY + '_' + UserChannels.cursorX).removeClass('stream_info_focused');
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
            Main.Go = Main.UserLive;
            UserChannels.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = Main.UserGames;
            UserChannels.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (!UserChannels.loadingMore) {
                Main.selectedChannel = $('#' + UserChannels.Cell + UserChannels.cursorY + '_' + UserChannels.cursorX).attr('data-channelname');
                Main.selectedChannel_id = $('#' + UserChannels.Cell + UserChannels.cursorY + '_' + UserChannels.cursorX).attr('data-id');
                Main.selectedChannelViews = $('#' + UserChannels.Cell + UserChannels.cursorY + '_' + UserChannels.cursorX).attr('data-views');
                Main.selectedChannelFallower = $('#' + UserChannels.Cell + UserChannels.cursorY + '_' + UserChannels.cursorX).attr('data-followers');
                Main.selectedChannelDisplayname = document.getElementById(UserChannels.DispNameDiv + UserChannels.cursorY +
                    '_' + UserChannels.cursorX).textContent;
                Main.selectedChannelLogo = document.getElementById(UserChannels.Img + UserChannels.cursorY + '_' + UserChannels.cursorX).src;
                document.body.removeEventListener("keydown", UserChannels.handleKeyDown);
                Main.Before = Main.UserChannels;
                Main.Go = Main.SChannelContent;
                AddCode.IsFallowing = true;
                SChannelContent.UserChannels = true;
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            UserChannels.exit();
            Main.GoLive();
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
