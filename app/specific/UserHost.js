//Variable initialization
var UserHost_cursorY = 0;
var UserHost_cursorX = 0;
var UserHost_dataEnded = false;
var UserHost_itemsCount = 0;
var UserHost_idObject = {};
var UserHost_emptyCellVector = [];
var UserHost_loadingData = false;
var UserHost_loadingDataTry = 0;
var UserHost_loadingDataTryMax = 5;
var UserHost_loadingDataTimeout = 3500;
var UserHost_itemsCountOffset = 0;
var UserHost_MaxOffset = 0;
var UserHost_emptyContent = false;

var UserHost_ids = ['uh_thumbdiv', 'uh_img', 'uh_infodiv', 'uh_displayname', 'uh_hosttitle', 'uh_hostgame', 'uh_viwers', 'uh_quality', 'uh_cell', 'uhempty_', 'user_host_scroll'];
var UserHost_status = false;
var UserHost_OldUserName = '';
var UserHost_itemsCountCheck = false;
//Variable initialization end

function UserHost_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_UserHost;
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + STR_LIVE_HOSTS));
    document.body.addEventListener("keydown", UserHost_handleKeyDown, false);
    if (UserHost_OldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) UserHost_status = false;
    if (UserHost_status) {
        Main_YRst(UserHost_cursorY);
        Main_ShowElement(UserHost_ids[10]);
        Main_CounterDialog(UserHost_cursorX, UserHost_cursorY, Main_ColoumnsCountVideo, UserHost_itemsCount);
        UserHost_addFocus();
        Main_SaveValues();
    } else UserHost_StartLoad();
}

function UserHost_exit() {
    Main_values.Users_Position = 0;
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    document.body.removeEventListener("keydown", UserHost_handleKeyDown);
    Main_textContent('top_bar_user', STR_USER);
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
    Main_HideElement(UserHost_ids[10]);
}

function UserHost_StartLoad() {
    Main_empty('stream_table_user_host');
    Main_HideElement(UserHost_ids[10]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    UserHost_OldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
    UserHost_status = false;
    UserHost_itemsCountOffset = 0;
    UserHost_MaxOffset = 0;
    UserHost_idObject = {};
    UserHost_emptyCellVector = [];
    UserHost_itemsCountCheck = false;
    UserHost_itemsCount = 0;
    Main_FirstLoad = true;
    UserHost_cursorX = 0;
    UserHost_cursorY = 0;
    UserHost_dataEnded = false;
    Main_CounterDialogRst();
    UserHost_loadDataPrepare();
    UserHost_loadChannels();
}

function UserHost_loadDataPrepare() {
    Main_imgVectorRst();
    UserHost_loadingData = true;
    UserHost_loadingDataTry = 0;
    UserHost_loadingDataTimeout = 3500;
}

function UserHost_loadChannels() {

    var offset = UserHost_itemsCount + UserHost_itemsCountOffset;
    if (offset && offset > (UserHost_MaxOffset - 1)) {
        offset = UserHost_MaxOffset - Main_ItemsLimitVideo;
        UserHost_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].name) +
        '/followed/hosting?limit=' + Main_ItemsLimitVideo + '&offset=' + offset;

    BasehttpGet(theUrl, UserHost_loadingDataTimeout, 2, null, UserHost_loadDataSuccess, UserHost_loadDataError);
}

function UserHost_loadDataError() {
    UserHost_loadingDataTry++;
    if (UserHost_loadingDataTry < UserHost_loadingDataTryMax) {
        UserHost_loadingDataTimeout += 500;
        UserHost_loadChannels();
    } else {
        UserHost_loadingData = false;
        if (!UserHost_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            UserHost_dataEnded = true;
            UserHost_loadDataSuccessFinish();
        }
    }
}

function UserHost_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.hosts.length;
    UserHost_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) UserHost_dataEnded = true;

    var offset_itemsCount = UserHost_itemsCount;
    UserHost_itemsCount += response_items;

    UserHost_emptyContent = !UserHost_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, hosts, id,
        cursor = 0,
        doc = document.getElementById("stream_table_user_host");

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            hosts = response.hosts[cursor];
            id = hosts.target._id + '' + hosts._id; //combined id host and hosted
            if (UserHost_idObject[id]) coloumn_id--;
            else {
                UserHost_idObject[id] = 1;
                row.appendChild(Main_createCellVideo(row_id, row_id + '_' + coloumn_id,
                    [hosts.target.channel.name, hosts.target._id], UserHost_ids,
                    [hosts.target.preview_urls.template.replace("{width}x{height}", Main_VideoSize),
                        hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name,
                        hosts.target.title, hosts.target.meta_game,
                        STR_FOR.charAt(1).toUpperCase() + STR_FOR.slice(2) +
                        Main_addCommas(hosts.target.viewers) + STR_VIEWER, ''
                    ]));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (UserHost_dataEnded && !UserHost_itemsCountCheck) {
                UserHost_itemsCountCheck = true;
                UserHost_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(UserHost_ids[9] + row_id + '_' + coloumn_id));
            UserHost_emptyCellVector.push(UserHost_ids[9] + row_id + '_' + coloumn_id);
        }
        doc.appendChild(row);
    }
    UserHost_loadDataSuccessFinish();
}

function UserHost_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!UserHost_status) {
            if (UserHost_emptyContent) Main_showWarningDialog(STR_NO + STR_LIVE_HOSTS);
            else {
                UserHost_status = true;
                UserHost_addFocus();
                Main_imgVectorLoad(IMG_404_VIDEO);
                Main_SaveValues();
            }
            Main_ShowElement(UserHost_ids[10]);
            Main_FirstLoad = false;
            Main_HideLoadDialog();
        } else {
            Main_imgVectorLoad(IMG_404_VIDEO);
            if (UserHost_emptyCellVector.length > 0 && !UserHost_dataEnded) {
                UserHost_loadDataPrepare();
                UserHost_loadDataReplace();
                return;
            } else {
                Main_CounterDialog(UserHost_cursorX, UserHost_cursorY, Main_ColoumnsCountVideo, UserHost_itemsCount);
                UserHost_emptyCellVector = [];
            }
        }
        UserHost_loadingData = false;
    });
}

function UserHost_loadDataReplace() {
    Main_SetItemsLimitReplace(UserHost_emptyCellVector.length);

    var offset = UserHost_itemsCount + UserHost_itemsCountOffset;
    if (offset && offset > (UserHost_MaxOffset - 1)) {
        offset = UserHost_MaxOffset - Main_ItemsLimitReplace;
        UserHost_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].name) +
        '/followed/hosting?limit=' + Main_ItemsLimitReplace + '&offset=' + offset;

    BasehttpGet(theUrl, UserHost_loadingDataTimeout, 2, null, UserHost_loadDataSuccessReplace, UserHost_loadDataReplaceError);
}

function UserHost_loadDataReplaceError() {
    UserHost_loadingDataTry++;
    if (UserHost_loadingDataTry < UserHost_loadingDataTryMax) {
        UserHost_loadingDataTimeout += 500;
        UserHost_loadDataReplace();
    } else {
        UserHost_dataEnded = true;
        UserHost_itemsCount -= UserHost_emptyCellVector.length;
        UserHost_emptyCellVector = [];
        UserHost_loadDataSuccessFinish();
    }
}

function UserHost_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.streams.length,
        hosts, id, i = 0,
        cursor = 0,
        tempVector = [];

    UserHost_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitReplace) UserHost_dataEnded = true;

    for (i; i < UserHost_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        hosts = response.hosts[cursor];
        id = hosts.target._id + '' + hosts._id;
        if (UserHost_idObject[id]) i--;
        else {
            UserHost_idObject[id] = 1;
            Main_replaceVideo(UserHost_emptyCellVector[i], [hosts.target.channel.name, hosts.target._id],
                [hosts.target.preview_urls.template.replace("{width}x{height}", Main_VideoSize),
                    hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name,
                    hosts.target.title, hosts.target.meta_game,
                    STR_FOR.charAt(1).toUpperCase() + STR_FOR.slice(2) +
                    Main_addCommas(hosts.target.viewers) + STR_VIEWER, ''
                ], UserHost_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) UserHost_emptyCellVector.splice(tempVector[i], 1);

    UserHost_itemsCountOffset += cursor;
    if (UserHost_dataEnded) {
        UserHost_itemsCount -= UserHost_emptyCellVector.length;
        UserHost_emptyCellVector = [];
    }

    UserHost_loadDataSuccessFinish();
}

function UserHost_addFocus() {
    Main_addFocusVideo(UserHost_cursorY, UserHost_cursorX, UserHost_ids, Main_ColoumnsCountVideo, UserHost_itemsCount);

    if (((UserHost_cursorY + Main_ItemsReloadLimitVideo) > (UserHost_itemsCount / Main_ColoumnsCountVideo)) &&
        !UserHost_dataEnded && !UserHost_loadingData) {
        UserHost_loadDataPrepare();
        UserHost_loadChannels();
    }
    if (Main_CenterLablesInUse) UserHost_removeFocus();
}

function UserHost_removeFocus() {
    if (UserHost_itemsCount) Main_removeFocus(UserHost_cursorY + '_' + UserHost_cursorX, UserHost_ids);
}

function UserHost_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                UserHost_removeFocus();
                Main_CenterLablesStart(UserHost_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((UserHost_cursorY), (UserHost_cursorX - 1), UserHost_ids[0])) {
                UserHost_removeFocus();
                UserHost_cursorX--;
                UserHost_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((UserHost_cursorY - 1), i, UserHost_ids[0])) {
                        UserHost_removeFocus();
                        UserHost_cursorY--;
                        UserHost_cursorX = i;
                        UserHost_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((UserHost_cursorY), (UserHost_cursorX + 1), UserHost_ids[0])) {
                UserHost_removeFocus();
                UserHost_cursorX++;
                UserHost_addFocus();
            } else if (Main_ThumbNull((UserHost_cursorY + 1), 0, UserHost_ids[0])) {
                UserHost_removeFocus();
                UserHost_cursorY++;
                UserHost_cursorX = 0;
                UserHost_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((UserHost_cursorY - 1), (UserHost_cursorX - i), UserHost_ids[0])) {
                    UserHost_removeFocus();
                    UserHost_cursorY--;
                    UserHost_cursorX = UserHost_cursorX - i;
                    UserHost_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((UserHost_cursorY + 1), (UserHost_cursorX - i), UserHost_ids[0])) {
                    UserHost_removeFocus();
                    UserHost_cursorY++;
                    UserHost_cursorX = UserHost_cursorX - i;
                    UserHost_addFocus();
                    break;
                }
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_OpenLiveStream(UserHost_cursorY + '_' + UserHost_cursorX, UserHost_ids, UserHost_handleKeyDown);
            break;
        default:
            break;
    }
}