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
var UserChannels_itemsCountOffset = 0;
var UserChannels_emptyContent = false;
var UserChannels_Status = false;
var UserChannels_OldUserName = '';
var UserChannels_itemsCountCheck = false;
var UserChannels_idObject = {};
var UserChannels_emptyCellVector = [];
var UserChannels_MaxOffset = 0;

var UserChannels_ids = ['uc_thumbdiv', 'uc_img', 'uc_infodiv', 'uc_displayname', 'uc_cell', 'ucempty_', 'user_channels_scroll'];
//Variable initialization end

function UserChannels_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_UserChannels;
    Main_values.isLastSChannels = false;
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + STR_USER_CHANNEL));
    document.body.addEventListener("keydown", UserChannels_handleKeyDown, false);
    if (UserChannels_OldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) UserChannels_Status = false;
    if (UserChannels_Status) {
        Main_YRst(UserChannels_cursorY);
        Main_ShowElement(UserChannels_ids[6]);
        UserChannels_addFocus();
        Main_SaveValues();
    } else UserChannels_StartLoad();
}

function UserChannels_exit() {
    Main_values.Users_Position = 0;
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    document.body.removeEventListener("keydown", UserChannels_handleKeyDown);
    Main_textContent('top_bar_user', STR_USER);
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
    Main_HideElement(UserChannels_ids[6]);
}

function UserChannels_StartLoad() {
    Main_empty('stream_table_user_channels');
    Main_HideElement(UserChannels_ids[6]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    UserChannels_OldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
    UserChannels_Status = false;
    UserChannels_idObject = {};
    UserChannels_emptyCellVector = [];
    UserChannels_itemsCountOffset = 0;
    UserChannels_loadChannelOffsset = 0;
    UserChannels_MaxOffset = 0;
    UserChannels_itemsCount = 0;
    UserChannels_cursorX = 0;
    UserChannels_cursorY = 0;
    UserChannels_dataEnded = false;
    UserChannels_itemsCountCheck = false;
    Main_FirstLoad = true;
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
    var offset = UserChannels_itemsCount + UserChannels_itemsCountOffset;
    if (offset && offset > (UserChannels_MaxOffset - 1)) {
        offset = UserChannels_MaxOffset - Main_ItemsLimitChannel;
        UserChannels_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/users/' +
        encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].id) +
        '/follows/channels?limit=' + Main_ItemsLimitChannel + '&offset=' +
        offset + '&sortby=login&direction=asc';

    if (Main_Android && !UserChannels_itemsCount)
        BaseAndroidhttpGet(theUrl, UserChannels_loadingDataTimeout, 2, null, UserChannels_loadDataSuccess, UserChannels_loadDataError);
    else
        BasexmlHttpGet(theUrl, UserChannels_loadingDataTimeout, 2, null, UserChannels_loadDataSuccess, UserChannels_loadDataError, false);

}

function UserChannels_loadDataError() {
    UserChannels_loadingDataTry++;
    if (UserChannels_loadingDataTry < UserChannels_loadingDataTryMax) {
        UserChannels_loadingDataTimeout += 500;
        UserChannels_loadChannels();
    } else {
        UserChannels_loadingData = false;
        if (!UserChannels_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
            Main_CenterLablesStart(UserChannels_handleKeyDown);
        } else {
            UserChannels_dataEnded = true;
            UserChannels_loadDataSuccessFinish();
        }
    }
}

function UserChannels_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.follows.length;
    UserChannels_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitChannel) UserChannels_dataEnded = true;

    var offset_itemsCount = UserChannels_itemsCount;
    UserChannels_itemsCount += response_items;

    UserChannels_emptyContent = !UserChannels_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountChannel;
    if (response_items % Main_ColoumnsCountChannel > 0) response_rows++;

    var coloumn_id, row_id, row, channels, id,
        cursor = 0,
        doc = document.getElementById('stream_table_user_channels');

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountChannel + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountChannel && cursor < response_items; coloumn_id++, cursor++) {
            channels = response.follows[cursor].channel;
            id = channels._id;
            if (UserChannels_idObject[id]) coloumn_id--;
            else {
                UserChannels_idObject[id] = 1;
                row.appendChild(UserChannels_createCell(row_id, row_id + '_' + coloumn_id, [channels.name, id, channels.logo, channels.display_name]));
            }

        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountChannel; coloumn_id++) {
            if (UserChannels_dataEnded && !UserChannels_itemsCountCheck) {
                UserChannels_itemsCountCheck = true;
                UserChannels_itemsCount = (row_id * Main_ColoumnsCountChannel) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(UserChannels_ids[5] + row_id + '_' + coloumn_id));
            UserChannels_emptyCellVector.push(UserChannels_ids[5] + row_id + '_' + coloumn_id);
        }
        doc.appendChild(row);
    }

    UserChannels_loadDataSuccessFinish();
}

function UserChannels_createCell(row_id, id, valuesArray) {
    return Main_createCellChannel(id, UserChannels_ids, valuesArray);
}

function UserChannels_loadDataSuccessFinish() {
    if (!UserChannels_Status) {
        if (UserChannels_emptyContent) {
            Main_showWarningDialog(STR_NO + STR_USER_CHANNEL);
            Main_CenterLablesStart(UserChannels_handleKeyDown);
        } else {
            UserChannels_Status = true;
            UserChannels_addFocus();
            Main_SaveValues();
        }
        Main_ShowElement(UserChannels_ids[6]);
        Main_FirstLoad = false;
        Main_HideLoadDialog();
    } else {
        if (UserChannels_emptyCellVector.length > 0 && !UserChannels_dataEnded) {
            UserChannels_loadDataPrepare();
            UserChannels_loadDataReplace();
            return;
        } else {
            UserChannels_addFocus(true);
            UserChannels_emptyCellVector = [];
        }
    }
    UserChannels_loadingData = false;

}

function UserChannels_loadDataReplace() {
    Main_SetItemsLimitReplace(UserChannels_emptyCellVector.length);

    var offset = UserChannels_itemsCount + UserChannels_itemsCountOffset;
    if (offset && offset > (UserChannels_MaxOffset - 1)) {
        offset = UserChannels_MaxOffset - Main_ItemsLimitReplace;
        UserChannels_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/users/' +
        encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].id) +
        '/follows/channels?limit=' + Main_ItemsLimitReplace + '&offset=' +
        UserChannels_loadChannelOffsset + '&sortby=login&direction=asc';

    BasehttpGet(theUrl, UserChannels_loadingDataTimeout, 2, null, UserChannels_loadDataSuccessReplace, UserChannels_loadDataErrorReplace);
}

function UserChannels_loadDataErrorReplace() {
    UserChannels_loadingDataTry++;
    if (UserChannels_loadingDataTry < UserChannels_loadingDataTryMax) {
        UserChannels_loadingDataTimeout += 500;
        UserChannels_loadDataReplace();
    } else {
        UserChannels_dataEnded = true;
        UserChannels_itemsCount -= UserChannels_emptyCellVector.length;
        UserChannels_emptyCellVector = [];
        UserChannels_loadDataSuccessFinish();
    }
}

function UserChannels_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.follows.length,
        channels, id, i = 0,
        cursor = 0,
        tempVector = [];

    UserChannels_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitReplace) UserChannels_dataEnded = true;

    for (i; i < UserChannels_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        channels = response.follows[cursor].channel;
        id = channels._id;
        if (UserChannels_idObject[id]) i--;
        else {
            UserChannels_idObject[id] = 1;
            Main_replaceChannel(UserChannels_emptyCellVector[i], [channels.name, id, channels.logo, channels.display_name], UserChannels_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) UserChannels_emptyCellVector.splice(tempVector[i], 1);

    UserChannels_itemsCountOffset += cursor;
    if (UserChannels_dataEnded) {
        UserChannels_itemsCount -= UserChannels_emptyCellVector.length;
        UserChannels_emptyCellVector = [];
    }

    UserChannels_loadDataSuccessFinish();
}

function UserChannels_addFocus(forceScroll) {
    Main_addFocusChannel(UserChannels_cursorY, UserChannels_cursorX, UserChannels_ids, Main_ColoumnsCountChannel, UserChannels_itemsCount, forceScroll);

    if (((UserChannels_cursorY + Main_ItemsReloadLimitChannel) > (UserChannels_itemsCount / Main_ColoumnsCountChannel)) &&
        !UserChannels_dataEnded && !UserChannels_loadingData) {
        UserChannels_loadDataPrepare();
        UserChannels_loadChannels();
    }
    if (Main_CenterLablesInUse) UserChannels_removeFocus();
}

function UserChannels_removeFocus() {
    if (UserChannels_itemsCount) Main_removeFocus(UserChannels_cursorY + '_' + UserChannels_cursorX, UserChannels_ids);
}

function UserChannels_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                UserChannels_removeFocus();
                Main_CenterLablesStart(UserChannels_handleKeyDown);
            }
            Sidepannel_RestoreScreen();
            break;
        case KEY_LEFT:
            if (!UserChannels_cursorX) {
                UserChannels_removeFocus();
                Sidepannel_Start(UserChannels_handleKeyDown, true);
            } else if (Main_ThumbNull((UserChannels_cursorY), (UserChannels_cursorX - 1), UserChannels_ids[0])) {
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
            if (!UserChannels_cursorY) {
                UserChannels_removeFocus();
                Main_CenterLablesStart(UserChannels_handleKeyDown);
            } else {
                for (i = 0; i < Main_ColoumnsCountChannel; i++) {
                    if (Main_ThumbNull((UserChannels_cursorY - 1), (UserChannels_cursorX - i), UserChannels_ids[0])) {
                        UserChannels_removeFocus();
                        UserChannels_cursorY--;
                        UserChannels_cursorX = UserChannels_cursorX - i;
                        UserChannels_addFocus();
                        break;
                    }
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
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (Main_ThumbOpenIsNull(UserChannels_cursorY + '_' + UserChannels_cursorX, UserChannels_ids[0])) return;
            Main_values.Main_selectedChannel = document.getElementById(UserChannels_ids[4] + UserChannels_cursorY + '_' + UserChannels_cursorX).getAttribute(Main_DataAttribute);
            Main_values.Main_selectedChannel_id = document.getElementById(UserChannels_ids[4] + UserChannels_cursorY + '_' + UserChannels_cursorX).getAttribute('data-id');
            Main_values.Main_selectedChannelDisplayname = document.getElementById(UserChannels_ids[3] + UserChannels_cursorY +
                '_' + UserChannels_cursorX).textContent;
            Main_values.Main_selectedChannelLogo = document.getElementById(UserChannels_ids[1] + UserChannels_cursorY + '_' + UserChannels_cursorX).src;
            document.body.removeEventListener("keydown", UserChannels_handleKeyDown);
            Main_values.Main_BeforeChannel = Main_UserChannels;
            Main_values.Main_Go = Main_ChannelContent;
            Main_values.Main_BeforeChannelisSet = true;
            AddCode_IsFallowing = true;
            ChannelContent_UserChannels = true;
            Main_HideElement(UserChannels_ids[6]);
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}