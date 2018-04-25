//Variable initialization
var UserChannels_cursorY = 0;
var UserChannels_cursorX = 0;
var UserChannels_dataEnded = false;
var UserChannels_itemsCount = 0;
var UserChannels_loadingData = false;
var UserChannels_loadingDataTry = 0;
var UserChannels_loadingDataTryMax = 10;
var UserChannels_loadingDataTimeout = 3500;
var UserChannels_LastClickFinish = true;
var UserChannels_keyClickDelayTime = 25;
var UserChannels_UserChannelsList = [];
var UserChannels_loadChannelOffsset = 0;
var UserChannels_emptyContent = false;

var UserChannels_Img = 'img_uchannel';
var UserChannels_Thumbnail = 'thumbnail_uchannel_';
var UserChannels_EmptyCell = 'uchannelempty_';
var UserChannels_ThumbnailDiv = 'uchannel_thumbnail_div_';
var UserChannels_DispNameDiv = 'uchannel_display_name_';
var UserChannels_Cell = 'uchannel_cell_';
var UserChannels_Status = false;
var UserChannels_OldUserName = '';
var UserChannels_itemsCountCheck = false;
var UserChannels_loadingMore = false;
//Variable initialization end

function UserChannels_init() {
    Main_Go = Main_UserChannels;
    SChannels_isLastSChannels = false;
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    document.getElementById('top_bar_user').innerHTML = STR_USER + Main_UnderCenter(Main_UserName + STR_USER_CHANNEL);
    document.body.addEventListener("keydown", UserChannels_handleKeyDown, false);
    Main_YRst(UserChannels_cursorY);
    if (UserChannels_OldUserName !== Main_UserName) UserChannels_Status = false;
    if (UserChannels_Status) {
        Main_ScrollHelper(UserChannels_Thumbnail, UserChannels_cursorY, UserChannels_cursorX, Main_UserChannels,
            Main_ScrollOffSetMinusChannels, Main_ScrollOffSetVideo, true);
        Main_CounterDialog(UserChannels_cursorX, UserChannels_cursorY, Main_ColoumnsCountChannel, UserChannels_itemsCount);
    } else UserChannels_StartLoad();
}

function UserChannels_exit() {
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.body.removeEventListener("keydown", UserChannels_handleKeyDown);
    document.getElementById('top_bar_user').innerHTML = STR_USER;
}

function UserChannels_StartLoad() {
    Main_HideWarningDialog();
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    UserChannels_OldUserName = Main_UserName;
    UserChannels_Status = false;
    var table = document.getElementById('stream_table_user_channels');
    while (table.firstChild) table.removeChild(table.firstChild);
    UserChannels_loadingMore = false;
    UserChannels_loadChannelOffsset = 0;
    UserChannels_itemsCount = 0;
    UserChannels_cursorX = 0;
    UserChannels_cursorY = 0;
    UserChannels_dataEnded = false;
    UserChannels_itemsCountCheck = false;
    Main_CounterDialogRst();
    UserChannels_UserChannelsList = [];
    UserChannels_loadDataPrepare();
    UserChannels_loadChannels();
}

function UserChannels_loadDataPrepare() {
    UserChannels_loadingData = true;
    UserChannels_loadingDataTry = 0;
    UserChannels_loadingDataTimeout = 3500;
}

function UserChannels_loadChannels() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(Main_UserName) + '/follows/channels?limit=100&offset=' +
            UserChannels_loadChannelOffsset + '&sortby=created_at&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserChannels_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserChannels_loadChannelLive(xmlHttp.responseText);
                    return;
                } else {
                    UserChannels_loadDataError();
                }
            }
        };
        xmlHttp.send(null);
    } catch (e) {
        UserChannels_loadDataError();
    }
}

function UserChannels_loadDataError() {
    UserChannels_loadingDataTry++;
    if (UserChannels_loadingDataTry < UserChannels_loadingDataTryMax) {
        UserChannels_loadingDataTimeout += (UserChannels_loadingDataTry < 5) ? 250 : 3500;
        UserChannels_loadChannels();
    } else {
        UserChannels_loadingData = false;
        UserChannels_loadingMore = false;
        UserChannels_Status = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function UserChannels_loadChannelLive(responseText) {
    var response = JSON.parse(responseText).follows,
        response_items = response.length;

    if (response_items) { // response_items here is not always 99 because banned channels, so check until it is 0
        var ChannelTemp = '',
            x = 0;

        for (x; x < response_items; x++) {
            ChannelTemp = response[x].channel.display_name + ',' + response[x].channel._id + ',' + response[x].channel.name +
                ',' + response[x].channel.logo + ',' + response[x].channel.views + ',' + response[x].channel.followers;
            if (UserChannels_UserChannelsList.indexOf(ChannelTemp) === -1) UserChannels_UserChannelsList.push(ChannelTemp);
        }

        UserChannels_loadChannelOffsset += response_items;
        UserChannels_loadDataPrepare();
        UserChannels_loadChannels();
    } else { // end
        UserChannels_UserChannelsList.sort(function(a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        UserChannels_loadDataSuccess();
    }
}

function UserChannels_loadDataSuccess() {
    var response_items = Main_ItemsLimitChannel;
    var offset_itemsCount = UserChannels_itemsCount;
    var rest = UserChannels_UserChannelsList.length - offset_itemsCount;
    if (rest < response_items) response_items = rest;

    if (response_items < Main_ItemsLimitChannel) UserChannels_dataEnded = true;

    UserChannels_itemsCount += response_items;

    UserChannels_emptyContent = !UserChannels_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountChannel;
    if (response_items % Main_ColoumnsCountChannel > 0) response_rows++;

    var coloumn_id, row_id, row, channel,
        cursor = offset_itemsCount;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountChannel + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountChannel && cursor < UserChannels_UserChannelsList.length; coloumn_id++, cursor++) {
            channel = UserChannels_UserChannelsList[cursor].split(",");
            row.appendChild(UserChannels_createCell(row_id, row_id + '_' + coloumn_id,
                channel[0], channel[1], channel[2], channel[3], channel[4], channel[5]));
        }
        for (coloumn_id; coloumn_id < Main_ColoumnsCountChannel; coloumn_id++) {
            if (UserChannels_dataEnded && !UserChannels_itemsCountCheck) {
                UserChannels_itemsCountCheck = true;
                UserChannels_itemsCount = (row_id * Main_ColoumnsCountChannel) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(UserChannels_EmptyCell + row_id + '_' + coloumn_id));
        }
        document.getElementById('stream_table_user_channels').appendChild(row);
    }
    UserChannels_loadDataSuccessFinish();
}

function UserChannels_createCell(row_id, id, channel_display_name, _id, channel_name, preview_thumbnail, views, followers) {

    if (row_id < 4) Main_PreLoadAImage(preview_thumbnail); //try to pre cache first 4 rows

    Main_td = document.createElement('td');

    Main_td.setAttribute('id', UserChannels_Cell + id);
    Main_td.setAttribute('data-channelname', channel_name);
    Main_td.setAttribute('data-id', _id);
    Main_td.setAttribute('data-views', views);
    Main_td.setAttribute('data-followers', followers);

    Main_td.className = 'stream_cell';

    Main_td.innerHTML = '<div id="' + UserChannels_Thumbnail + id + '" class="stream_thumbnail_channel" ><img id="' + UserChannels_Img +
        id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + UserChannels_ThumbnailDiv + id + '" class="stream_text">' +
        '<div id="' + UserChannels_DispNameDiv + id + '" class="stream_channel">' + channel_display_name + '</div></div>';

    return Main_td;
}

function UserChannels_loadDataSuccessFinish() {
    $(document).ready(function() {
        if (!UserChannels_Status) {
            Main_HideLoadDialog();
            if (UserChannels_emptyContent) Main_showWarningDialog(STR_NO + STR_USER_CHANNEL);
            else {
                UserChannels_Status = true;
                UserChannels_addFocus();
                Main_LazyImgStart(UserChannels_Img, 9, IMG_404_LOGO, Main_ColoumnsCountChannel);
            }
            UserChannels_loadingData = false;
        } else {
            UserChannels_loadingData = false;
            UserChannels_loadingMore = false;
        }
    });
}

function UserChannels_addFocus() {
    document.getElementById(UserChannels_Thumbnail + UserChannels_cursorY + '_' + UserChannels_cursorX).classList.add('stream_thumbnail_focused');
    document.getElementById(UserChannels_ThumbnailDiv + UserChannels_cursorY + '_' + UserChannels_cursorX).classList.add('stream_text_focused');
    document.getElementById(UserChannels_DispNameDiv + UserChannels_cursorY + '_' + UserChannels_cursorX).classList.add('stream_info_focused');
    window.setTimeout(function() {
        Main_ScrollHelper(UserChannels_Thumbnail, UserChannels_cursorY, UserChannels_cursorX, Main_UserChannels, Main_ScrollOffSetMinusChannels, Main_ScrollOffSetVideo, true);
    }, 10);

    Main_CounterDialog(UserChannels_cursorX, UserChannels_cursorY, Main_ColoumnsCountChannel, UserChannels_itemsCount);

    if (UserChannels_cursorY > 3) Main_LazyImg(UserChannels_Img, UserChannels_cursorY, IMG_404_LOGO, Main_ColoumnsCountChannel, 4);

    if (((UserChannels_cursorY + Main_ItemsReloadLimitChannel) > (UserChannels_itemsCount / Main_ColoumnsCountChannel)) &&
        !UserChannels_dataEnded && !UserChannels_loadingMore) {
        UserChannels_loadingMore = true;
        UserChannels_loadDataPrepare();
        UserChannels_loadChannels();
    }
}

function UserChannels_removeFocus() {
    document.getElementById(UserChannels_Thumbnail + UserChannels_cursorY + '_' + UserChannels_cursorX).classList.remove('stream_thumbnail_focused');
    document.getElementById(UserChannels_ThumbnailDiv + UserChannels_cursorY + '_' + UserChannels_cursorX).classList.remove('stream_text_focused');
    document.getElementById(UserChannels_DispNameDiv + UserChannels_cursorY + '_' + UserChannels_cursorX).classList.remove('stream_info_focused');
}

function UserChannels_keyClickDelay() {
    UserChannels_LastClickFinish = true;
}

function UserChannels_handleKeyDown(event) {
    if ((UserChannels_loadingData && !UserChannels_loadingMore) || !UserChannels_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        UserChannels_LastClickFinish = false;
        window.setTimeout(UserChannels_keyClickDelay, UserChannels_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (!UserChannels_loadingMore) {
                Main_Go = Main_Users;
                UserChannels_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((UserChannels_cursorY), (UserChannels_cursorX - 1), UserChannels_Thumbnail)) {
                UserChannels_removeFocus();
                UserChannels_cursorX--;
                UserChannels_addFocus();
            } else {
                for (i = (Main_ColoumnsCountChannel - 1); i > -1; i--) {
                    if (Main_ThumbNull((UserChannels_cursorY - 1), i, UserChannels_Thumbnail)) {
                        UserChannels_removeFocus();
                        UserChannels_cursorY--;
                        UserChannels_cursorX = i;
                        UserChannels_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((UserChannels_cursorY), (UserChannels_cursorX + 1), UserChannels_Thumbnail)) {
                UserChannels_removeFocus();
                UserChannels_cursorX++;
                UserChannels_addFocus();
            } else if (Main_ThumbNull((UserChannels_cursorY + 1), 0, UserChannels_Thumbnail)) {
                UserChannels_removeFocus();
                UserChannels_cursorY++;
                UserChannels_cursorX = 0;
                UserChannels_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountChannel; i++) {
                if (Main_ThumbNull((UserChannels_cursorY - 1), (UserChannels_cursorX - i), UserChannels_Thumbnail)) {
                    UserChannels_removeFocus();
                    UserChannels_cursorY--;
                    UserChannels_cursorX = UserChannels_cursorX - i;
                    UserChannels_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountChannel; i++) {
                if (Main_ThumbNull((UserChannels_cursorY + 1), (UserChannels_cursorX - i), UserChannels_Thumbnail)) {
                    UserChannels_removeFocus();
                    UserChannels_cursorY++;
                    UserChannels_cursorX = UserChannels_cursorX - i;
                    UserChannels_addFocus();
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            if (!UserChannels_loadingMore) UserChannels_StartLoad();
            break;
        case KEY_CHANNELUP:
            Main_Go = Main_UserLive;
            UserChannels_exit();
            Main_SwitchScreen();
            break;
        case KEY_CHANNELDOWN:
            Main_Go = Main_usergames;
            UserChannels_exit();
            Main_SwitchScreen();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (!UserChannels_loadingMore) {
                Main_selectedChannel = document.getElementById(UserChannels_Cell + UserChannels_cursorY + '_' + UserChannels_cursorX).getAttribute('data-channelname');
                Main_selectedChannel_id = document.getElementById(UserChannels_Cell + UserChannels_cursorY + '_' + UserChannels_cursorX).getAttribute('data-id');
                Main_selectedChannelViews = document.getElementById(UserChannels_Cell + UserChannels_cursorY + '_' + UserChannels_cursorX).getAttribute('data-views');
                Main_selectedChannelFallower = document.getElementById(UserChannels_Cell + UserChannels_cursorY + '_' + UserChannels_cursorX).getAttribute('data-followers');
                Main_selectedChannelDisplayname = document.getElementById(UserChannels_DispNameDiv + UserChannels_cursorY +
                    '_' + UserChannels_cursorX).textContent;
                Main_selectedChannelLogo = document.getElementById(UserChannels_Img + UserChannels_cursorY + '_' + UserChannels_cursorX).src;
                document.body.removeEventListener("keydown", UserChannels_handleKeyDown);
                Main_Before = Main_UserChannels;
                Main_Go = Main_SChannelContent;
                AddCode_IsFallowing = true;
                SChannelContent_UserChannels = true;
                Main_SwitchScreen();
            }
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            UserChannels_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_BeforeSearch = Main_UserChannels;
            Main_Go = Main_Search;
            UserChannels_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}