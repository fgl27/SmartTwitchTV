//Variable initialization
var UserChannels_cursorY = 0;
var UserChannels_cursorX = 0;
var UserChannels_dataEnded = false;
var UserChannels_itemsCount = 0;
var UserChannels_loadingData = false;
var UserChannels_loadingDataTry = 0;
var UserChannels_loadingDataTryMax = 5;
var UserChannels_loadingDataTimeout = 3500;
var UserChannels_List = [];
var UserChannels_loadChannelOffsset = 0;
var UserChannels_emptyContent = false;
var UserChannels_Status = false;
var UserChannels_OldUserName = '';
var UserChannels_itemsCountCheck = false;
var UserChannels_FirstLoad = false;

var UserChannels_ids = ['uc_thumbdiv', 'uc_img', 'uc_infodiv', 'uc_displayname', 'uc_cell', 'ucempty_', 'user_channels_scroll'];
//Variable initialization end

function UserChannels_init() {
    Main_Go = Main_UserChannels;
    SearchChannels_isLastSChannels = false;
    Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH_USER);
    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Users_Position].name + STR_USER_CHANNEL));
    document.body.addEventListener("keydown", UserChannels_handleKeyDown, false);
    if (UserChannels_OldUserName !== AddUser_UsernameArray[Users_Position].name) UserChannels_Status = false;
    if (UserChannels_Status) {
        Main_YRst(UserChannels_cursorY);
        Main_ShowElement(UserChannels_ids[6]);
        Main_CounterDialog(UserChannels_cursorX, UserChannels_cursorY, Main_ColoumnsCountChannel, UserChannels_itemsCount);
    } else UserChannels_StartLoad();
}

function UserChannels_exit() {
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    document.body.removeEventListener("keydown", UserChannels_handleKeyDown);
    Main_textContent('top_bar_user', STR_USER);
    Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
    Main_HideElement(UserChannels_ids[6]);
}

function UserChannels_StartLoad() {
    Main_HideElement(UserChannels_ids[6]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    UserChannels_OldUserName = AddUser_UsernameArray[Users_Position].name;
    UserChannels_Status = false;
    Main_empty('stream_table_user_channels');
    UserChannels_loadChannelOffsset = 0;
    UserChannels_itemsCount = 0;
    UserChannels_cursorX = 0;
    UserChannels_cursorY = 0;
    UserChannels_dataEnded = false;
    UserChannels_itemsCountCheck = false;
    UserChannels_FirstLoad = true;
    Main_CounterDialogRst();
    UserChannels_List = [];
    UserChannels_loadDataPrepare();
    UserChannels_loadChannels();
}

function UserChannels_loadDataPrepare() {
    Main_imgVectorRst();
    UserChannels_loadingData = true;
    UserChannels_loadingDataTry = 0;
    UserChannels_loadingDataTimeout = 3500;
}

function UserChannels_loadChannels() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(AddUser_UsernameArray[Users_Position].id) + '/follows/channels?limit=100&offset=' +
            UserChannels_loadChannelOffsset + '&sortby=created_at&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserChannels_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
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
        UserChannels_loadingDataTimeout += 500;
        UserChannels_loadChannels();
    } else {
        UserChannels_loadingData = false;
        if (!UserChannels_itemsCount) {
            UserChannels_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            UserChannels_dataEnded = true;
            UserChannels_loadDataSuccessFinish();
        }
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
    if (row_id < 4) Main_CacheImage(valuesArray[2]); //try to pre cache first 4 rows
    return Main_createCellChannel(id, UserChannels_ids, valuesArray);
}

function UserChannels_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!UserChannels_Status) {
            Main_HideLoadDialog();
            if (UserChannels_emptyContent) Main_showWarningDialog(STR_NO + STR_USER_CHANNEL);
            else {
                UserChannels_Status = true;
                Main_imgVectorLoad(IMG_404_LOGO);
                UserChannels_addFocus();
            }
            Main_ShowElement(UserChannels_ids[6]);
            UserChannels_FirstLoad = false;
        } else Main_imgVectorLoad(IMG_404_LOGO);
        UserChannels_loadingData = false;
        Main_SetWasopen();
    });
}

function UserChannels_addFocus() {
    Main_addFocusChannel(UserChannels_cursorY, UserChannels_cursorX, UserChannels_ids, Main_ColoumnsCountChannel, UserChannels_itemsCount);

    if (((UserChannels_cursorY + Main_ItemsReloadLimitChannel) > (UserChannels_itemsCount / Main_ColoumnsCountChannel)) &&
        !UserChannels_dataEnded && !UserChannels_loadingData) {
        UserChannels_loadDataPrepare();
        UserChannels_loadChannels();
    }
}

function UserChannels_removeFocus() {
    Main_removeFocus(UserChannels_cursorY + '_' + UserChannels_cursorX, UserChannels_ids);
}

function UserChannels_handleKeyDown(event) {
    if (UserChannels_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
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
            UserChannels_StartLoad();
            break;
        case KEY_CHANNELUP:
            Main_Go = Main_UserLive;
            UserChannels_exit();
            Main_SwitchScreen();
            break;
        case KEY_CHANNELDOWN:
            if (AddUser_UserIsSet() && AddUser_UsernameArray[Users_Position].access_token) Main_Go = Main_UserVod;
            else Main_Go = Main_usergames;
            UserChannels_exit();
            Main_SwitchScreen();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_selectedChannel = document.getElementById(UserChannels_ids[4] + UserChannels_cursorY + '_' + UserChannels_cursorX).getAttribute(Main_DataAttribute);
            Main_selectedChannel_id = document.getElementById(UserChannels_ids[4] + UserChannels_cursorY + '_' + UserChannels_cursorX).getAttribute('data-id');
            Main_selectedChannelDisplayname = document.getElementById(UserChannels_ids[3] + UserChannels_cursorY +
                '_' + UserChannels_cursorX).textContent;
            Main_selectedChannelLogo = document.getElementById(UserChannels_ids[1] + UserChannels_cursorY + '_' + UserChannels_cursorX).src;
            document.body.removeEventListener("keydown", UserChannels_handleKeyDown);
            Main_BeforeChannel = Main_UserChannels;
            Main_Go = Main_ChannelContent;
            Main_BeforeChannelisSet = true;
            AddCode_IsFallowing = true;
            ChannelContent_UserChannels = true;
            Main_HideElement(UserChannels_ids[6]);
            Main_SwitchScreen();
            break;
        case KEY_RED:
            Main_SidePannelStart(UserChannels_handleKeyDown);
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