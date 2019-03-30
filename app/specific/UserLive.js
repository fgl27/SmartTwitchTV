//Variable initialization
var UserLive_cursorY = 0;
var UserLive_cursorX = 0;
var UserLive_dataEnded = false;
var UserLive_itemsCount = 0;
var UserLive_idObject = {};
var UserLive_emptyCellVector = [];
var UserLive_loadingData = false;
var UserLive_loadingDataTry = 0;
var UserLive_loadingDataTryMax = 5;
var UserLive_loadingDataTimeout = 3500;
var UserLive_itemsCountOffset = 0;
var UserLive_MaxOffset = 0;
var UserLive_loadChannelOffsset = 0;
var UserLive_emptyContent = false;

var UserLive_ids = ['ul_thumbdiv', 'ul_img', 'ul_infodiv', 'ul_displayname', 'ul_streamtitle', 'ul_streamgame', 'ul_viwers', 'ul_quality', 'ul_cell', 'ulempty_', 'user_live_scroll'];
var UserLive_status = false;
var UserLive_followerChannels = '';
var UserLive_OldUserName = '';
var UserLive_itemsCountCheck = false;
//Variable initialization end

function UserLive_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_UserLive;
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + STR_LIVE_CHANNELS));
    document.body.addEventListener("keydown", UserLive_handleKeyDown, false);
    if (UserLive_OldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) UserLive_status = false;
    if (UserLive_status) {
        Main_YRst(UserLive_cursorY);
        Main_ShowElement(UserLive_ids[10]);
        Main_CounterDialog(UserLive_cursorX, UserLive_cursorY, Main_ColoumnsCountVideo, UserLive_itemsCount);
        UserLive_addFocus();
        Main_SaveValues();
    } else UserLive_StartLoad();
}

function UserLive_exit() {
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    document.body.removeEventListener("keydown", UserLive_handleKeyDown);
    Main_textContent('top_bar_user', STR_USER);
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
    Main_HideElement(UserLive_ids[10]);
}

function UserLive_StartLoad() {
    Main_HideElement(UserLive_ids[10]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    UserLive_status = false;
    UserLive_OldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
    Main_empty('stream_table_user_live');
    UserLive_loadChannelOffsset = 0;
    UserLive_itemsCountOffset = 0;
    UserLive_MaxOffset = 0;
    UserLive_idObject = {};
    UserLive_emptyCellVector = [];
    UserLive_itemsCountCheck = false;
    Main_FirstLoad = true;
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
    Main_imgVectorRst();
    UserLive_loadingData = true;
    UserLive_loadingDataTry = 0;
    UserLive_loadingDataTimeout = 3500;
}

function UserLive_loadChannels() {
    var theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].id) +
        '/follows/channels?limit=100&offset=' + UserLive_loadChannelOffsset + '&sortby=created_at';

    if (Main_Android) {

        var jsonOb = Android.mreadUrl(theUrl, UserLive_loadingDataTimeout, true, false, null);

        if (jsonOb) jsonOb = JSON.parse(jsonOb);
        else {
            UserLive_loadDataError();
            return;
        }

        if (jsonOb.result === 200) {
            UserLive_loadChannelLive(jsonOb.value);
        } else {
            UserLive_loadDataError();
        }


    } else {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = UserLive_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
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
    }
}

function UserLive_loadDataError() {
    UserLive_loadingDataTry++;
    if (UserLive_loadingDataTry < UserLive_loadingDataTryMax) {
        UserLive_loadingDataTimeout += 500;
        UserLive_loadChannels();
    } else {
        UserLive_loadingData = false;
        if (!UserLive_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            UserLive_dataEnded = true;
            UserLive_loadDataSuccessFinish();
        }
    }
}

function UserLive_loadChannelLive(responseText) {
    var response = JSON.parse(responseText).follows,
        response_items = response.length;

    if (response_items) { // response_items here is not always 99 because banned channels, so check until it is 0
        var ChannelTemp = '',
            x = 0;

        for (x; x < response_items; x++) {
            ChannelTemp = response[x].channel._id + ',';
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

    var offset = UserLive_itemsCount + UserLive_itemsCountOffset;
    if (offset && offset > (UserLive_MaxOffset - 1)) {
        offset = UserLive_MaxOffset - Main_ItemsLimitVideo;
        UserLive_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(UserLive_followerChannels) + '&limit=' +
        Main_ItemsLimitVideo + '&offset=' + offset + '&stream_type=all';

    if (Main_Android) {

        var jsonOb = Android.mreadUrl(theUrl, UserLive_loadingDataTimeout, true, false, null);

        if (jsonOb) jsonOb = JSON.parse(jsonOb);
        else {
            UserLive_loadDataErrorLive();
            return;
        }

        if (jsonOb.result === 200) {
            UserLive_loadDataSuccess(jsonOb.value);
        } else {
            UserLive_loadDataErrorLive();
        }


    } else {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = UserLive_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
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
    }
}

function UserLive_loadDataErrorLive() {
    UserLive_loadingDataTry++;
    if (UserLive_loadingDataTry < UserLive_loadingDataTryMax) {
        UserLive_loadingDataTimeout += 500;
        UserLive_loadChannelUserLive();
    } else {
        UserLive_loadingData = false;
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

    var coloumn_id, row_id, row, stream, id,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            id = stream.channel._id;
            if (UserLive_idObject[id]) coloumn_id--;
            else {
                UserLive_idObject[id] = 1;
                row.appendChild(Main_createCellVideo(row_id, row_id + '_' + coloumn_id,
                    [stream.channel.name, id], UserLive_ids,
                    [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                        Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                        stream.channel.status, stream.game,
                        STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' +
                        STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
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
            UserLive_emptyCellVector.push(UserLive_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_user_live").appendChild(row);
    }

    UserLive_loadDataSuccessFinish();
}

function UserLive_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!UserLive_status) {
            Main_HideLoadDialog();
            if (UserLive_emptyContent) Main_showWarningDialog(STR_NO + STR_LIVE_CHANNELS);
            else {
                UserLive_status = true;
                UserLive_addFocus();
                Main_imgVectorLoad(IMG_404_VIDEO);
                Main_SaveValues();
            }
            Main_ShowElement(UserLive_ids[10]);
            Main_FirstLoad = false;
        } else {
            Main_imgVectorLoad(IMG_404_VIDEO);
            if (UserLive_emptyCellVector.length > 0 && !UserLive_dataEnded) {
                UserLive_loadDataPrepare();
                UserLive_loadChannelsReplace();
                return;
            } else {
                Main_CounterDialog(UserLive_cursorX, UserLive_cursorY, Main_ColoumnsCountVideo, UserLive_itemsCount);
                UserLive_emptyCellVector = [];
            }
        }
        UserLive_loadingData = false;
    });
}

function UserLive_loadChannelsReplace() {
    Main_SetItemsLimitReplace(UserLive_emptyCellVector.length);

    var offset = UserLive_itemsCount + UserLive_itemsCountOffset;
    if (offset && offset > (UserLive_MaxOffset - 1)) {
        offset = UserLive_MaxOffset - Main_ItemsLimitReplace;
        UserLive_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(UserLive_followerChannels) + '&limit=' +
        Main_ItemsLimitReplace + '&offset=' + offset + '&stream_type=all';

    if (Main_Android) {

        var jsonOb = Android.mreadUrl(theUrl, UserLive_loadingDataTimeout, true, false, null);

        if (jsonOb) jsonOb = JSON.parse(jsonOb);
        else {
            UserLive_loadDataErrorReplace();
            return;
        }

        if (jsonOb.result === 200) {
            UserLive_loadDataSuccessReplace(jsonOb.value);
        } else {
            UserLive_loadDataErrorReplace();
        }


    } else {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", +Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserLive_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserLive_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                } else UserLive_loadDataErrorReplace();
            }
        };

        xmlHttp.send(null);
    }
}

function UserLive_loadDataErrorReplace() {
    UserLive_loadingDataTry++;
    if (UserLive_loadingDataTry < UserLive_loadingDataTryMax) {
        UserLive_loadingDataTimeout += 500;
        UserLive_loadChannelsReplace();
    } else {
        UserLive_dataEnded = true;
        UserLive_itemsCount -= UserLive_emptyCellVector.length;
        UserLive_emptyCellVector = [];
        UserLive_loadDataSuccessFinish();
    }
}

function UserLive_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.streams.length,
        stream, id, i = 0,
        cursor = 0,
        tempVector = [];

    UserLive_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitReplace) UserLive_dataEnded = true;


    for (i; i < UserLive_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        id = stream.channel._id;
        if (UserLive_idObject[id]) i--;
        else {
            UserLive_idObject[id] = 1;
            Main_replaceVideo(UserLive_emptyCellVector[i], [stream.channel.name, id], [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                stream.channel.status, stream.game,
                STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
            ], UserLive_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) UserLive_emptyCellVector.splice(tempVector[i], 1);

    UserLive_itemsCountOffset += cursor;
    if (UserLive_dataEnded) {
        UserLive_itemsCount -= UserLive_emptyCellVector.length;
        UserLive_emptyCellVector = [];
    }

    UserLive_loadDataSuccessFinish();
}

function UserLive_addFocus() {
    Main_addFocusVideo(UserLive_cursorY, UserLive_cursorX, UserLive_ids, Main_ColoumnsCountVideo, UserLive_itemsCount);

    if (((UserLive_cursorY + Main_ItemsReloadLimitVideo) > (UserLive_itemsCount / Main_ColoumnsCountVideo)) &&
        !UserLive_dataEnded && !UserLive_loadingData) {
        UserLive_loadDataPrepare();
        UserLive_loadChannels();
    }
    if (Main_CenterLablesInUse) UserLive_removeFocus();
}

function UserLive_removeFocus() {
    Main_removeFocus(UserLive_cursorY + '_' + UserLive_cursorX, UserLive_ids);
}

function UserLive_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                UserLive_removeFocus();
                Main_CenterLablesStart(UserLive_handleKeyDown);
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
            UserLive_StartLoad();
            break;
        case KEY_CHANNELUP:
            Main_values.Main_Go = Main_UserHost;
            UserLive_exit();
            Main_SwitchScreen();
            break;
        case KEY_CHANNELDOWN:
            Main_values.Main_Go = Main_UserChannels;
            UserLive_exit();
            Main_SwitchScreen();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_OpenLiveStream(UserLive_cursorY + '_' + UserLive_cursorX, UserLive_ids, UserLive_handleKeyDown);
            break;
        case KEY_RED:
            Main_SidePannelStart(UserLive_handleKeyDown);
            break;
        case KEY_GREEN:
            UserLive_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_values.Main_BeforeSearch = Main_UserLive;
            Main_values.Main_Go = Main_Search;
            UserLive_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}