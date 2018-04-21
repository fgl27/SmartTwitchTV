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
    main_Go = main_UserChannels;
    SChannels.isLastSChannels = false;
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    document.getElementById('top_bar_user').innerHTML = STR_USER + main_UnderCenter(main_UserName + STR_USER_CHANNEL);
    document.body.addEventListener("keydown", UserChannels.handleKeyDown, false);
    main_YRst(UserChannels.cursorY);
    if (UserChannels.OldUserName !== main_UserName) UserChannels.Status = false;
    if (UserChannels.Status) {
        main_ScrollHelper(UserChannels.Thumbnail, UserChannels.cursorY, UserChannels.cursorX, main_UserChannels,
            main_ScrollOffSetMinusChannels, main_ScrollOffSetVideo, true);
        main_CounterDialog(UserChannels.cursorX, UserChannels.cursorY, main_ColoumnsCountChannel, UserChannels.itemsCount);
    } else UserChannels.StartLoad();
};

UserChannels.exit = function() {
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.body.removeEventListener("keydown", UserChannels.handleKeyDown);
    document.getElementById('top_bar_user').innerHTML = STR_USER;
};

UserChannels.StartLoad = function() {
    main_HideWarningDialog();
    main_ScrollHelperBlank('blank_focus');
    main_showLoadDialog();
    UserChannels.OldUserName = main_UserName;
    UserChannels.Status = false;
    $('#stream_table_user_channels').empty();
    UserChannels.loadingMore = false;
    UserChannels.loadChannelOffsset = 0;
    UserChannels.itemsCount = 0;
    UserChannels.cursorX = 0;
    UserChannels.cursorY = 0;
    UserChannels.dataEnded = false;
    UserChannels.itemsCountCheck = false;
    main_CounterDialogRst();
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

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(main_UserName) + '/follows/channels?limit=100&offset=' +
            UserChannels.loadChannelOffsset + '&sortby=created_at&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserChannels.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
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
        main_HideLoadDialog();
        main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

UserChannels.loadChannelLive = function(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.follows.length;

    if (response_items > 0) { // response_items here is not always 99 because banned channels, so check until it is 0
        var ChannelTemp = '',
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
    var response_items = main_ItemsLimitChannel;
    var offset_itemsCount = UserChannels.itemsCount;
    var rest = UserChannels.UserChannelsList.length - offset_itemsCount;
    if (rest < response_items) response_items = rest;

    if (response_items < main_ItemsLimitChannel) UserChannels.dataEnded = true;

    UserChannels.itemsCount += response_items;

    UserChannels.emptyContent = !UserChannels.itemsCount;

    var response_rows = response_items / main_ColoumnsCountChannel;
    if (response_items % main_ColoumnsCountChannel > 0) response_rows++;

    var coloumn_id, row_id, row, channel,
        cursor = offset_itemsCount;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / main_ColoumnsCountChannel + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < main_ColoumnsCountChannel && cursor < UserChannels.UserChannelsList.length; coloumn_id++, cursor++) {
            channel = UserChannels.UserChannelsList[cursor].split(",");
            row.append(UserChannels.createCell(row_id, coloumn_id, channel[0], channel[1], channel[2], channel[3], channel[4], channel[5]));
        }
        for (coloumn_id; coloumn_id < main_ColoumnsCountChannel; coloumn_id++) {
            if (UserChannels.dataEnded && !UserChannels.itemsCountCheck) {
                UserChannels.itemsCountCheck = true;
                UserChannels.itemsCount = (row_id * main_ColoumnsCountChannel) + coloumn_id;
            }
            row.append(main_createCellEmpty(row_id, coloumn_id, UserChannels.EmptyCell));
        }
        $('#stream_table_user_channels').append(row);
    }
    UserChannels.loadDataSuccessFinish();
};

UserChannels.createCell = function(row_id, coloumn_id, channel_display_name, _id, channel_name, preview_thumbnail, views, followers) {

    if (row_id < 5) main_PreLoadAImage(preview_thumbnail); //try to pre cache first 2 rows

    return $('<td id="' + UserChannels.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '" data-id="' + _id + '" data-views="' + views + '" data-followers="' + followers + '"></td>').html('<div id="' + UserChannels.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_channel" ><img id="' + UserChannels.Img +
        row_id + '_' + coloumn_id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + UserChannels.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + UserChannels.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div></div>');
};

UserChannels.loadDataSuccessFinish = function() {
    $(document).ready(function() {
        if (!UserChannels.Status) {
            main_HideLoadDialog();
            if (UserChannels.emptyContent) main_showWarningDialog(STR_NO + STR_USER_CHANNEL);
            else {
                UserChannels.Status = true;
                UserChannels.addFocus();
                main_LazyImgStart(UserChannels.Img, 9, IMG_404_LOGO, main_ColoumnsCountChannel);
            }
            UserChannels.loadingData = false;
        } else {
            UserChannels.loadingData = false;
            UserChannels.loadingMore = false;
        }
    });
};

UserChannels.addFocus = function() {
    document.getElementById(UserChannels.Thumbnail + UserChannels.cursorY + '_' + UserChannels.cursorX).classList.add('stream_thumbnail_focused');
    document.getElementById(UserChannels.ThumbnailDiv + UserChannels.cursorY + '_' + UserChannels.cursorX).classList.add('stream_text_focused');
    document.getElementById(UserChannels.DispNameDiv + UserChannels.cursorY + '_' + UserChannels.cursorX).classList.add('stream_info_focused');
    window.setTimeout(function() {
        main_ScrollHelper(UserChannels.Thumbnail, UserChannels.cursorY, UserChannels.cursorX, main_UserChannels, main_ScrollOffSetMinusChannels, main_ScrollOffSetVideo, true);
    }, 10);

    main_CounterDialog(UserChannels.cursorX, UserChannels.cursorY, main_ColoumnsCountChannel, UserChannels.itemsCount);

    if (UserChannels.cursorY > 3) main_LazyImg(UserChannels.Img, UserChannels.cursorY, IMG_404_LOGO, main_ColoumnsCountChannel, 4);

    if (((UserChannels.cursorY + main_ItemsReloadLimitChannel) > (UserChannels.itemsCount / main_ColoumnsCountChannel)) &&
        !UserChannels.dataEnded && !UserChannels.loadingMore) {
        UserChannels.loadingMore = true;
        UserChannels.loadDataPrepare();
        UserChannels.loadChannels();
    }
};

UserChannels.removeFocus = function() {
    document.getElementById(UserChannels.Thumbnail + UserChannels.cursorY + '_' + UserChannels.cursorX).classList.remove('stream_thumbnail_focused');
    document.getElementById(UserChannels.ThumbnailDiv + UserChannels.cursorY + '_' + UserChannels.cursorX).classList.remove('stream_text_focused');
    document.getElementById(UserChannels.DispNameDiv + UserChannels.cursorY + '_' + UserChannels.cursorX).classList.remove('stream_info_focused');
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
            if (main_isAboutDialogShown()) main_HideAboutDialog();
            else if (main_isControlsDialogShown()) main_HideControlsDialog();
            else if (!UserChannels.loadingMore) {
                main_Go = main_Users;
                UserChannels.exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (main_ThumbNull((UserChannels.cursorY), (UserChannels.cursorX - 1), UserChannels.Thumbnail)) {
                UserChannels.removeFocus();
                UserChannels.cursorX--;
                UserChannels.addFocus();
            } else {
                for (i = (main_ColoumnsCountChannel - 1); i > -1; i--) {
                    if (main_ThumbNull((UserChannels.cursorY - 1), i, UserChannels.Thumbnail)) {
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
            if (main_ThumbNull((UserChannels.cursorY), (UserChannels.cursorX + 1), UserChannels.Thumbnail)) {
                UserChannels.removeFocus();
                UserChannels.cursorX++;
                UserChannels.addFocus();
            } else if (main_ThumbNull((UserChannels.cursorY + 1), 0, UserChannels.Thumbnail)) {
                UserChannels.removeFocus();
                UserChannels.cursorY++;
                UserChannels.cursorX = 0;
                UserChannels.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < main_ColoumnsCountChannel; i++) {
                if (main_ThumbNull((UserChannels.cursorY - 1), (UserChannels.cursorX - i), UserChannels.Thumbnail)) {
                    UserChannels.removeFocus();
                    UserChannels.cursorY--;
                    UserChannels.cursorX = UserChannels.cursorX - i;
                    UserChannels.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < main_ColoumnsCountChannel; i++) {
                if (main_ThumbNull((UserChannels.cursorY + 1), (UserChannels.cursorX - i), UserChannels.Thumbnail)) {
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
            main_Go = main_UserLive;
            UserChannels.exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            main_Go = main_usergames;
            UserChannels.exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (!UserChannels.loadingMore) {
                main_selectedChannel = $('#' + UserChannels.Cell + UserChannels.cursorY + '_' + UserChannels.cursorX).attr('data-channelname');
                main_selectedChannel_id = $('#' + UserChannels.Cell + UserChannels.cursorY + '_' + UserChannels.cursorX).attr('data-id');
                main_selectedChannelViews = $('#' + UserChannels.Cell + UserChannels.cursorY + '_' + UserChannels.cursorX).attr('data-views');
                main_selectedChannelFallower = $('#' + UserChannels.Cell + UserChannels.cursorY + '_' + UserChannels.cursorX).attr('data-followers');
                main_selectedChannelDisplayname = document.getElementById(UserChannels.DispNameDiv + UserChannels.cursorY +
                    '_' + UserChannels.cursorX).textContent;
                main_selectedChannelLogo = document.getElementById(UserChannels.Img + UserChannels.cursorY + '_' + UserChannels.cursorX).src;
                document.body.removeEventListener("keydown", UserChannels.handleKeyDown);
                main_Before = main_UserChannels;
                main_Go = main_SChannelContent;
                addCode_IsFallowing = true;
                SChannelContent.UserChannels = true;
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_RED:
            main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            UserChannels.exit();
            main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            main_BeforeSearch = main_UserChannels;
            main_Go = main_Search;
            UserChannels.exit();
            main_SwitchScreen();
            break;
        default:
            break;
    }
};
