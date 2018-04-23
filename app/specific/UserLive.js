//Variable initialization
var UserLive_cursorY = 0;
var UserLive_cursorX = 0;
var UserLive_dataEnded = false;
var UserLive_itemsCount = 0;
var UserLive_nameMatrix = [];
var UserLive_nameMatrixCount = 0;
var UserLive_blankCellVector = [];
var UserLive_loadingData = false;
var UserLive_loadingDataTry = 0;
var UserLive_loadingDataTryMax = 10;
var UserLive_loadingDataTimeout = 3500;
var UserLive_blankCellCount = 0;
var UserLive_itemsCountOffset = 0;
var UserLive_LastClickFinish = true;
var UserLive_keyClickDelayTime = 25;
var UserLive_ReplacedataEnded = false;
var UserLive_MaxOffset = 0;
var UserLive_loadChannelOffsset = 0;
var UserLive_emptyContent = false;

var UserLive_ids = ['ul_thumbdiv', 'ul_img', 'ul_infodiv', 'ul_displayname', 'ul_streamtitle', 'ul_streamgame', 'ul_viwers', 'ul_quality', 'ul_cell', 'ulempty_'];
var UserLive_status = false;
var UserLive_followerChannels = '';
var UserLive_OldUserName = '';
var UserLive_itemsCountCheck = false;
var UserLive_loadingMore = false;
//Variable initialization end

function UserLive_init() {
    Main_Go = Main_UserLive;
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    document.getElementById('top_bar_user').innerHTML = STR_USER + Main_UnderCenter(Main_UserName + STR_LIVE_CHANNELS);
    document.body.addEventListener("keydown", UserLive_handleKeyDown, false);
    if (UserLive_OldUserName !== Main_UserName) UserLive_status = false;
    if (UserLive_status) {
        Main_ScrollHelper(UserLive_ids[0], UserLive_cursorY, UserLive_cursorX, Main_UserLive, Main_ScrollOffSetMinusVideo,
            Main_ScrollOffSetVideo, false);
        Main_CounterDialog(UserLive_cursorX, UserLive_cursorY, Main_ColoumnsCountVideo, UserLive_itemsCount);
    } else UserLive_StartLoad();
}

function UserLive_exit() {
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.body.removeEventListener("keydown", UserLive_handleKeyDown);
    document.getElementById('top_bar_user').innerHTML = STR_USER;
}

function UserLive_StartLoad() {
    Main_HideWarningDialog();
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    UserLive_status = false;
    UserLive_OldUserName = Main_UserName;
    var table = document.getElementById('stream_table_user_live');
    while (table.firstChild) table.removeChild(table.firstChild);
    UserLive_loadChannelOffsset = 0;
    UserLive_loadingMore = false;
    UserLive_blankCellCount = 0;
    UserLive_itemsCountOffset = 0;
    UserLive_ReplacedataEnded = false;
    UserLive_MaxOffset = 0;
    UserLive_nameMatrix = [];
    UserLive_nameMatrixCount = 0;
    UserLive_blankCellVector = [];
    UserLive_itemsCountCheck = false;
    UserLive_itemsCount = 0;
    UserLive_cursorX = 0;
    UserLive_cursorY = 0;
    UserLive_dataEnded = false;
    UserLive_followerChannels = '';
    Main_CounterDialogRst();
    UserLive_loadDataPrepare();
    UserLive_loadChannels();
}

function UserLive_loadDataPrepare() {
    UserLive_loadingData = true;
    UserLive_loadingDataTry = 0;
    UserLive_loadingDataTimeout = 3500;
}

function UserLive_loadChannels() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(Main_UserName) +
            '/follows/channels?limit=100&offset=' + UserLive_loadChannelOffsset + '&sortby=created_at&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserLive_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserLive_loadChannelLive(xmlHttp.responseText);
                    return;
                } else {
                    UserLive_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserLive_loadDataError();
    }
}

function UserLive_loadDataError() {
    UserLive_loadingDataTry++;
    if (UserLive_loadingDataTry < UserLive_loadingDataTryMax) {
        UserLive_loadingDataTimeout += (UserLive_loadingDataTry < 5) ? 250 : 3500;
        UserLive_loadChannels();
    } else {
        UserLive_loadingData = false;
        UserLive_loadingMore = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function UserLive_loadChannelLive(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.follows.length;

    if (response_items > 0) { // response_items here is not always 99 because banned channels, so check until it is 0
        var ChannelTemp = '',
            x = 0;

        for (x; x < response_items; x++) {
            ChannelTemp = response.follows[x].channel.name + ',';
            if (UserLive_followerChannels.indexOf(ChannelTemp) === -1) UserLive_followerChannels += ChannelTemp;
        }

        UserLive_loadChannelOffsset += response_items;
        UserLive_loadDataPrepare();
        UserLive_loadChannels();
    } else { // end
        UserLive_followerChannels = UserLive_followerChannels.slice(0, -1);
        UserLive_loadDataPrepare();
        UserLive_loadChannelUserLive();
    }
}

function UserLive_loadChannelUserLive() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = UserLive_itemsCount + UserLive_itemsCountOffset;
        if (offset && offset > (UserLive_MaxOffset - 1)) {
            offset = UserLive_MaxOffset - Main_ItemsLimitVideo;
            UserLive_dataEnded = true;
            UserLive_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(UserLive_followerChannels) + '&limit=' +
            Main_ItemsLimitVideo + '&offset=' + offset + '&stream_type=all&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserLive_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserLive_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    UserLive_loadDataErrorLive();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserLive_loadDataErrorLive();
    }
}

function UserLive_loadDataErrorLive() {
    UserLive_loadingDataTry++;
    if (UserLive_loadingDataTry < UserLive_loadingDataTryMax) {
        UserLive_loadingDataTimeout += (UserLive_loadingDataTry < 5) ? 250 : 3500;
        UserLive_loadChannelUserLive();
    } else {
        UserLive_loadingData = false;
        UserLive_loadingMore = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function UserLive_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    UserLive_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) UserLive_dataEnded = true;

    var offset_itemsCount = UserLive_itemsCount;
    UserLive_itemsCount += response_items;

    UserLive_emptyContent = !UserLive_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            if (UserLive_CellExists(stream.channel.name)) coloumn_id--;
            else {
                row.appendChild(UserLive_createCell(row_id, row_id + '_' + coloumn_id, stream.channel.name, [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                    Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                    stream.channel.status, stream.game, Main_addCommas(stream.viewers) + STR_VIEWER,
                    Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
                ]));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (UserLive_dataEnded && !UserLive_itemsCountCheck) {
                UserLive_itemsCountCheck = true;
                UserLive_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(UserLive_ids[9] + row_id + '_' + coloumn_id));
            UserLive_blankCellVector.push(UserLive_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_user_live").appendChild(row);
    }

    UserLive_loadDataSuccessFinish();
}

function UserLive_createCell(row_id, id, channel_name, valuesArray) {
    UserLive_nameMatrix.push(channel_name);
    if (row_id < Main_ColoumnsCountVideo) Main_PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return Main_createCellVideo(channel_name, id, UserLive_ids, valuesArray);
}

function UserLive_CellExists(display_name) {
    if (UserLive_nameMatrix.indexOf(display_name) > -1) {
        UserLive_blankCellCount++;
        return true;
    }
    return false;
}

function UserLive_loadDataSuccessFinish() {
    $(document).ready(function() {
        if (!UserLive_status) {
            Main_HideLoadDialog();
            if (UserLive_emptyContent) Main_showWarningDialog(STR_NO + STR_LIVE_CHANNELS);
            else {
                UserLive_status = true;
                UserLive_addFocus();
                Main_LazyImgStart(UserLive_ids[1], 9, IMG_404_VIDEO, Main_ColoumnsCountVideo);
            }
            UserLive_loadingData = false;
        } else {
            if (UserLive_blankCellCount > 0 && !UserLive_dataEnded) {
                UserLive_loadingMore = true;
                UserLive_loadDataPrepare();
                UserLive_loadChannelsReplace();
                return;
            } else {
                UserLive_blankCellCount = 0;
                UserLive_blankCellVector = [];
            }

            UserLive_loadingData = false;
            UserLive_loadingMore = false;
        }
    });
}

function UserLive_loadChannelsReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReload(UserLive_blankCellCount);

        var offset = UserLive_itemsCount + UserLive_itemsCountOffset;
        if (offset && offset > (UserLive_MaxOffset - 1)) {
            offset = UserLive_MaxOffset - Main_ItemsLimitReload;
            UserLive_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main_gameSelected) +
            '&limit=' + Main_ItemsLimitReload + '&offset=' + offset, true);
        xmlHttp.timeout = UserLive_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserLive_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserLive_loadDataErrorReplace();
    }
}

function UserLive_loadDataErrorReplace() {
    UserLive_loadingDataTry++;
    if (UserLive_loadingDataTry < UserLive_loadingDataTryMax) {
        UserLive_loadingDataTimeout += (UserLive_loadingDataTry < 5) ? 250 : 3500;
        UserLive_loadChannelsReplace();
    } else {
        UserLive_ReplacedataEnded = true;
        UserLive_blankCellCount = 0;
        UserLive_blankCellVector = [];
        UserLive_loadDataSuccessFinish();
    }
}

function UserLive_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    var stream, index, cursor = 0;
    var tempVector = UserLive_blankCellVector.slice();

    UserLive_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) UserLive_ReplacedataEnded = true;


    for (var i = 0; i < UserLive_blankCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        if (UserLive_CellExists(stream.channel.name)) {
            UserLive_blankCellCount--;
            i--;
        } else {
            UserLive_nameMatrix.push(stream.channel.name);
            Main_replaceVideo(UserLive_blankCellVector[i], stream.channel.name, [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                stream.channel.status, stream.game, Main_addCommas(stream.viewers) + STR_VIEWER,
                Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
            ], UserLive_ids[8], UserLive_ids[9]);
            UserLive_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    UserLive_itemsCountOffset += cursor;
    if (UserLive_ReplacedataEnded) {
        UserLive_blankCellCount = 0;
        UserLive_blankCellVector = [];
    } else UserLive_blankCellVector = tempVector;

    UserLive_loadDataSuccessFinish();
}

function UserLive_addFocus() {
    Main_addFocusVideoArray(UserLive_cursorY, UserLive_cursorX, UserLive_ids, Main_UserLive, Main_ColoumnsCountVideo, UserLive_itemsCount);

    if (UserLive_cursorY > 3) Main_LazyImg(UserLive_ids[1], UserLive_cursorY, IMG_404_VIDEO, Main_ColoumnsCountVideo, 4);

    if (((UserLive_cursorY + Main_ItemsReloadLimitVideo) > (UserLive_itemsCount / Main_ColoumnsCountVideo)) &&
        !UserLive_dataEnded && !UserLive_loadingMore) {
        UserLive_loadingMore = true;
        UserLive_loadDataPrepare();
        UserLive_loadChannels();
    }
}

function UserLive_removeFocus() {
    Main_removeFocusVideoArray(UserLive_cursorY + '_' + UserLive_cursorX, UserLive_ids);
}

function UserLive_keyClickDelay() {
    UserLive_LastClickFinish = true;
}

function UserLive_handleKeyDown(event) {
    if (UserLive_loadingData && !UserLive_loadingMore) {
        event.preventDefault();
        return;
    } else if (!UserLive_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        UserLive_LastClickFinish = false;
        window.setTimeout(UserLive_keyClickDelay, UserLive_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Main_Go = Main_Users;
                UserLive_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((UserLive_cursorY), (UserLive_cursorX - 1), UserLive_ids[0])) {
                UserLive_removeFocus();
                UserLive_cursorX--;
                UserLive_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((UserLive_cursorY - 1), i, UserLive_ids[0])) {
                        UserLive_removeFocus();
                        UserLive_cursorY--;
                        UserLive_cursorX = i;
                        UserLive_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((UserLive_cursorY), (UserLive_cursorX + 1), UserLive_ids[0])) {
                UserLive_removeFocus();
                UserLive_cursorX++;
                UserLive_addFocus();
            } else if (Main_ThumbNull((UserLive_cursorY + 1), 0, UserLive_ids[0])) {
                UserLive_removeFocus();
                UserLive_cursorY++;
                UserLive_cursorX = 0;
                UserLive_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((UserLive_cursorY - 1), (UserLive_cursorX - i), UserLive_ids[0])) {
                    UserLive_removeFocus();
                    UserLive_cursorY--;
                    UserLive_cursorX = UserLive_cursorX - i;
                    UserLive_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((UserLive_cursorY + 1), (UserLive_cursorX - i), UserLive_ids[0])) {
                    UserLive_removeFocus();
                    UserLive_cursorY++;
                    UserLive_cursorX = UserLive_cursorX - i;
                    UserLive_addFocus();
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            if (!UserLive_loadingMore) UserLive_StartLoad();
            break;
        case KEY_CHANNELUP:
            if (!UserLive_loadingMore) {
                Main_Go = Main_UserHost;
                UserLive_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_CHANNELDOWN:
            if (!UserLive_loadingMore) {
                Main_Go = Main_UserChannels;
                UserLive_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Play_selectedChannel = document.getElementById(UserLive_ids[8] + UserLive_cursorY + '_' + UserLive_cursorX).getAttribute('data-channelname');
            Play_selectedChannelDisplayname = document.getElementById(UserLive_ids[3] + UserLive_cursorY + '_' + UserLive_cursorX).textContent;
            document.body.removeEventListener("keydown", UserLive_handleKeyDown);
            Main_openStream();
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            UserLive_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_BeforeSearch = Main_UserLive;
            Main_Go = Main_Search;
            Main_OldgameSelected = Main_gameSelected;
            UserLive_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}