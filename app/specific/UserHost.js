//Variable initialization
var UserHost_cursorY = 0;
var UserHost_cursorX = 0;
var UserHost_dataEnded = false;
var UserHost_itemsCount = 0;
var UserHost_nameMatrix = [];
var UserHost_blankCellVector = [];
var UserHost_loadingData = false;
var UserHost_loadingDataTry = 0;
var UserHost_loadingDataTryMax = 10;
var UserHost_loadingDataTimeout = 3500;
var UserHost_blankCellCount = 0;
var UserHost_itemsCountOffset = 0;
var UserHost_LastClickFinish = true;
var UserHost_keyClickDelayTime = 25;
var UserHost_ReplacedataEnded = false;
var UserHost_MaxOffset = 0;
var UserHost_emptyContent = false;

var UserHost_ids = ['uh_thumbdiv', 'uh_img', 'uh_infodiv', 'uh_displayname', 'uh_hosttitle', 'uh_hostgame', 'uh_viwers', 'uh_quality', 'uh_cell', 'uhempty_'];
var UserHost_status = false;
var UserHost_OldUserName = '';
var UserHost_itemsCountCheck = false;
var UserHost_loadingMore = false;
//Variable initialization end

function UserHost_init() {
    Main_Go = Main_UserHost;
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    document.getElementById('top_bar_user').innerHTML = STR_USER + Main_UnderCenter(Main_UserName + STR_LIVE_HOSTS);
    document.body.addEventListener("keydown", UserHost_handleKeyDown, false);
    Main_YRst(UserHost_cursorY);
    if (UserHost_OldUserName !== Main_UserName) UserHost_status = false;
    if (UserHost_status) {
        Main_ScrollHelper(UserHost_ids[0], UserHost_cursorY, UserHost_cursorX, Main_UserHost, Main_ScrollOffSetMinusVideo,
            Main_ScrollOffSetVideo, false);
        Main_CounterDialog(UserHost_cursorX, UserHost_cursorY, Main_ColoumnsCountVideo, UserHost_itemsCount);
    } else UserHost_StartLoad();
}

function UserHost_exit() {
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.body.removeEventListener("keydown", UserHost_handleKeyDown);
    document.getElementById('top_bar_user').innerHTML = STR_USER;
}

function UserHost_StartLoad() {
    Main_HideWarningDialog();
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    UserHost_OldUserName = Main_UserName;
    UserHost_status = false;
    var table = document.getElementById('stream_table_user_host');
    while (table.firstChild) table.removeChild(table.firstChild);
    UserHost_loadingMore = false;
    UserHost_blankCellCount = 0;
    UserHost_itemsCountOffset = 0;
    UserHost_ReplacedataEnded = false;
    UserHost_MaxOffset = 0;
    UserHost_nameMatrix = [];
    UserHost_blankCellVector = [];
    UserHost_itemsCountCheck = false;
    UserHost_itemsCount = 0;
    UserHost_cursorX = 0;
    UserHost_cursorY = 0;
    UserHost_dataEnded = false;
    Main_CounterDialogRst();
    UserHost_loadDataPrepare();
    UserHost_loadChannels();
}

function UserHost_loadDataPrepare() {
    UserHost_loadingData = true;
    UserHost_loadingDataTry = 0;
    UserHost_loadingDataTimeout = 3500;
}

function UserHost_loadChannels() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = UserHost_itemsCount + UserHost_itemsCountOffset;
        if (offset && offset > (UserHost_MaxOffset - 1)) {
            offset = UserHost_MaxOffset - Main_ItemsLimitVideo;
            UserHost_dataEnded = true;
            UserHost_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/api/users/' + encodeURIComponent(Main_UserName) + '/followed/hosting?limit=' +
            Main_ItemsLimitVideo + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserHost_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserHost_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    UserHost_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserHost_loadDataError();
    }
}

function UserHost_loadDataError() {
    UserHost_loadingDataTry++;
    if (UserHost_loadingDataTry < UserHost_loadingDataTryMax) {
        UserHost_loadingDataTimeout += (UserHost_loadingDataTry < 5) ? 250 : 3500;
        UserHost_loadChannels();
    } else {
        UserHost_loadingData = false;
        UserHost_loadingMore = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
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

    var coloumn_id, row_id, row, hosts,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            hosts = response.hosts[cursor];
            if (UserHost_CellExists(hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name)) coloumn_id--;
            else {
                row.appendChild(UserHost_createCell(row_id, row_id + '_' + coloumn_id,
                    hosts.target.channel.name, [hosts.target.preview_urls.template.replace("{width}x{height}", Main_VideoSize),
                        hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name,
                        hosts.target.title, hosts.target.meta_game, Main_addCommas(hosts.target.viewers) + STR_VIEWER, ''
                    ]));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (UserHost_dataEnded && !UserHost_itemsCountCheck) {
                UserHost_itemsCountCheck = true;
                UserHost_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(UserHost_ids[9] + row_id + '_' + coloumn_id));
            UserHost_blankCellVector.push(UserHost_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_user_host").appendChild(row);
    }
    UserHost_loadDataSuccessFinish();
}

function UserHost_createCell(row_id, id, channel_name, valuesArray) {
    UserHost_nameMatrix.push(channel_name);
    if (row_id < Main_ColoumnsCountVideo) Main_PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return Main_createCellVideo(channel_name, id, UserHost_ids, valuesArray);
}

function UserHost_CellExists(display_name) {
    if (UserHost_nameMatrix.indexOf(display_name) > -1) {
        UserHost_blankCellCount++;
        return true;
    }
    return false;
}

function UserHost_loadDataSuccessFinish() {
    $(document).ready(function() {
        if (!UserHost_status) {
            Main_HideLoadDialog();
            if (UserHost_emptyContent) Main_showWarningDialog(STR_NO + STR_LIVE_HOSTS);
            else {
                UserHost_status = true;
                UserHost_addFocus();
                Main_LazyImgStart(UserHost_ids[1], 9, IMG_404_VIDEO, Main_ColoumnsCountVideo);
            }
            UserHost_loadingData = false;
        } else {
            if (UserHost_blankCellCount > 0 && !UserHost_dataEnded) {
                UserHost_loadingMore = true;
                UserHost_loadDataPrepare();
                UserHost_loadDataReplace();
                return;
            } else {
                UserHost_blankCellCount = 0;
                UserHost_blankCellVector = [];
            }

            UserHost_loadingData = false;
            UserHost_loadingMore = false;
        }
    });
}

function UserHost_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReload(UserHost_blankCellCount);

        var offset = UserHost_itemsCount + UserHost_itemsCountOffset;
        if (offset && offset > (UserHost_MaxOffset - 1)) {
            offset = UserHost_MaxOffset - Main_ItemsLimitReload;
            UserHost_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/hosts?game=' + encodeURIComponent(Main_gameSelected) +
            '&limit=' + Main_ItemsLimitReload + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserHost_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserHost_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                } else UserHost_loadDataReplaceError();
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserHost_loadDataReplaceError();
    }
}

function UserHost_loadDataReplaceError() {
    UserHost_loadingDataTry++;
    if (UserHost_loadingDataTry < UserHost_loadingDataTryMax) {
        UserHost_loadingDataTimeout += (UserHost_loadingDataTry < 5) ? 250 : 3500;
        UserHost_loadDataReplace();
    } else {
        UserHost_ReplacedataEnded = true;
        UserHost_blankCellCount = 0;
        UserHost_blankCellVector = [];
        UserHost_loadDataSuccessFinish();
    }
}

function UserHost_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    var hosts, index, cursor = 0;
    var tempVector = UserHost_blankCellVector.slice();

    UserHost_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) UserHost_ReplacedataEnded = true;

    for (var i = 0; i < UserHost_blankCellVector.length && cursor < response_items; i++, cursor++) {
        hosts = response.hosts[cursor];
        if (UserHost_CellExists(hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name)) {
            UserHost_blankCellCount--;
            i--;
        } else {
            Main_replaceVideo(UserHost_blankCellVector[i],
                hosts.target.channel.name, [hosts.target.preview_urls.template.replace("{width}x{height}", Main_VideoSize),
                    hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name,
                    hosts.target.title, hosts.target.meta_game, Main_addCommas(hosts.target.viewers) + STR_VIEWER, ''
                ]);
            UserHost_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    UserHost_itemsCountOffset += cursor;
    if (UserHost_ReplacedataEnded) {
        UserHost_blankCellCount = 0;
        UserHost_blankCellVector = [];
    } else UserHost_blankCellVector = tempVector;

    UserHost_loadDataSuccessFinish();
}

function UserHost_addFocus() {

    Main_addFocusVideoArray(UserHost_cursorY, UserHost_cursorX, UserHost_ids, Main_UserHost, Main_ColoumnsCountVideo, UserHost_itemsCount);

    if (UserHost_cursorY > 3) Main_LazyImg(UserHost_ids[1], UserHost_cursorY, IMG_404_VIDEO, Main_ColoumnsCountVideo, 4);

    if (((UserHost_cursorY + Main_ItemsReloadLimitVideo) > (UserHost_itemsCount / Main_ColoumnsCountVideo)) &&
        !UserHost_dataEnded && !UserHost_loadingMore) {
        UserHost_loadingMore = true;
        UserHost_loadDataPrepare();
        UserHost_loadChannels();
    }
}

function UserHost_removeFocus() {
    Main_removeFocusVideoArray(UserHost_cursorY + '_' + UserHost_cursorX, UserHost_ids);
}

function UserHost_keyClickDelay() {
    UserHost_LastClickFinish = true;
}

function UserHost_handleKeyDown(event) {
    if (UserHost_loadingData && !UserHost_loadingMore) {
        event.preventDefault();
        return;
    } else if (!UserHost_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        UserHost_LastClickFinish = false;
        window.setTimeout(UserHost_keyClickDelay, UserHost_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Main_Go = Main_Users;
                UserHost_exit();
                Main_SwitchScreen();
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
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            if (!UserHost_loadingMore) UserHost_StartLoad();
            break;
        case KEY_CHANNELUP:
            if (!UserHost_loadingMore) {
                Main_Go = Main_usergames;
                UserHost_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_CHANNELDOWN:
            Main_Go = Main_UserLive;
            UserHost_exit();
            Main_SwitchScreen();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Play_selectedChannel = document.getElementById(UserHost_ids[8] + UserHost_cursorY + '_' + UserHost_cursorX).getAttribute('data-channelname');
            Play_selectedChannelDisplayname = document.getElementById(UserHost_ids[3] + UserHost_cursorY + '_' + UserHost_cursorX).textContent.split(STR_USER_HOSTING)[1];
            document.body.removeEventListener("keydown", UserHost_handleKeyDown);
            Main_openStream();
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            UserHost_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_BeforeSearch = Main_UserHost;
            Main_Go = Main_Search;
            UserHost_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}
