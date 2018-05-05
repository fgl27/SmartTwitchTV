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
var UserChannels_List = [];
var UserChannels_loadChannelOffsset = 0;
var UserChannels_emptyContent = false;
var UserChannels_Status = false;
var UserChannels_OldUserName = '';
var UserChannels_itemsCountCheck = false;
var UserChannels_loadingMore = false;

var UserChannels_ids = ['uc_thumbdiv', 'uc_img', 'uc_infodiv', 'uc_displayname', 'uc_cell', 'ucempty_'];
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
        Main_ScrollHelper(UserChannels_ids[0], UserChannels_cursorY, UserChannels_cursorX, Main_UserChannels,
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
    Main_empty('stream_table_user_channels');
    UserChannels_loadingMore = false;
    UserChannels_loadChannelOffsset = 0;
    UserChannels_itemsCount = 0;
    UserChannels_cursorX = 0;
    UserChannels_cursorY = 0;
    UserChannels_dataEnded = false;
    UserChannels_itemsCountCheck = false;
    Main_CounterDialogRst();
    UserChannels_List = [];
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
            ChannelTemp = response[x].channel.name + ',' + response[x].channel._id + ',' +
                response[x].channel.logo + ',' + response[x].channel.display_name;
            if (UserChannels_List.indexOf(ChannelTemp) === -1) UserChannels_List.push(ChannelTemp);
        }

        UserChannels_loadChannelOffsset += response_items;
        UserChannels_loadDataPrepare();
        UserChannels_loadChannels();
    } else { // end
        UserChannels_List.sort(function(a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        UserChannels_loadDataSuccess();
    }
}

function UserChannels_loadDataSuccess() {
    var response_items = Main_ItemsLimitChannel;
    var offset_itemsCount = UserChannels_itemsCount;
    var rest = UserChannels_List.length - offset_itemsCount;
    if (rest < response_items) response_items = rest;

    if (response_items < Main_ItemsLimitChannel) UserChannels_dataEnded = true;

    UserChannels_itemsCount += response_items;

    UserChannels_emptyContent = !UserChannels_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountChannel;
    if (response_items % Main_ColoumnsCountChannel > 0) response_rows++;

    var coloumn_id, row_id, row,
        cursor = offset_itemsCount;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountChannel + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountChannel && cursor < UserChannels_List.length; coloumn_id++, cursor++) {
            row.appendChild(UserChannels_createCell(row_id, row_id + '_' + coloumn_id,
                UserChannels_List[cursor].split(",")));
        }
        for (coloumn_id; coloumn_id < Main_ColoumnsCountChannel; coloumn_id++) {
            if (UserChannels_dataEnded && !UserChannels_itemsCountCheck) {
                UserChannels_itemsCountCheck = true;
                UserChannels_itemsCount = (row_id * Main_ColoumnsCountChannel) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(UserChannels_ids[5] + row_id + '_' + coloumn_id));
        }
        document.getElementById('stream_table_user_channels').appendChild(row);
    }
    UserChannels_loadDataSuccessFinish();
}

function UserChannels_createCell(row_id, id, valuesArray) {
    if (row_id < 4) Main_PreLoadAImage(valuesArray[2]); //try to pre cache first 4 rows
    return Main_createCellChannel(id, UserChannels_ids, valuesArray);
}

function UserChannels_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!UserChannels_Status) {
            Main_HideLoadDialog();
            if (UserChannels_emptyContent) Main_showWarningDialog(STR_NO + STR_USER_CHANNEL);
            else {
                UserChannels_Status = true;
                UserChannels_addFocus();
                Main_LazyImgStart(UserChannels_ids[1], 9, IMG_404_LOGO, Main_ColoumnsCountChannel);
            }
            UserChannels_loadingData = false;
        } else {
            UserChannels_loadingData = false;
            UserChannels_loadingMore = false;
        }
    });
}

function UserChannels_addFocus() {
    Main_addFocusChannel(UserChannels_cursorY, UserChannels_cursorX, UserChannels_ids, Main_UserChannels, Main_ColoumnsCountChannel, UserChannels_itemsCount);

    if (UserChannels_cursorY > 3) Main_LazyImg(UserChannels_ids[1], UserChannels_cursorY, IMG_404_LOGO, Main_ColoumnsCountChannel, 4);

    if (((UserChannels_cursorY + Main_ItemsReloadLimitChannel) > (UserChannels_itemsCount / Main_ColoumnsCountChannel)) &&
        !UserChannels_dataEnded && !UserChannels_loadingMore) {
        UserChannels_loadingMore = true;
        UserChannels_loadDataPrepare();
        UserChannels_loadChannels();
    }
}

function UserChannels_removeFocus() {
    Main_removeFocusChannel(UserChannels_cursorY + '_' + UserChannels_cursorX, UserChannels_ids);
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
            if (Main_ThumbNull((UserChannels_cursorY), (UserChannels_cursorX - 1), UserChannels_ids[0])) {
                UserChannels_removeFocus();
                UserChannels_cursorX--;
                UserChannels_addFocus();
            } else {
                for (i = (Main_ColoumnsCountChannel - 1); i > -1; i--) {
                    if (Main_ThumbNull((UserChannels_cursorY - 1), i, UserChannels_ids[0])) {
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
            if (Main_ThumbNull((UserChannels_cursorY), (UserChannels_cursorX + 1), UserChannels_ids[0])) {
                UserChannels_removeFocus();
                UserChannels_cursorX++;
                UserChannels_addFocus();
            } else if (Main_ThumbNull((UserChannels_cursorY + 1), 0, UserChannels_ids[0])) {
                UserChannels_removeFocus();
                UserChannels_cursorY++;
                UserChannels_cursorX = 0;
                UserChannels_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountChannel; i++) {
                if (Main_ThumbNull((UserChannels_cursorY - 1), (UserChannels_cursorX - i), UserChannels_ids[0])) {
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
                if (Main_ThumbNull((UserChannels_cursorY + 1), (UserChannels_cursorX - i), UserChannels_ids[0])) {
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
                Main_selectedChannel = document.getElementById(UserChannels_ids[4] + UserChannels_cursorY + '_' + UserChannels_cursorX).getAttribute(Main_DataAttribute);
                Main_selectedChannel_id = document.getElementById(UserChannels_ids[4] + UserChannels_cursorY + '_' + UserChannels_cursorX).getAttribute('data-id');
                Main_selectedChannelDisplayname = document.getElementById(UserChannels_ids[3] + UserChannels_cursorY +
                    '_' + UserChannels_cursorX).textContent;
                Main_selectedChannelLogo = document.getElementById(UserChannels_ids[1] + UserChannels_cursorY + '_' + UserChannels_cursorX).src;
                document.body.removeEventListener("keydown", UserChannels_handleKeyDown);
                Main_BeforeChannel = Main_UserChannels;
                Main_Go = Main_SChannelContent;
                Main_BeforeChannelisSet = true;
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