//Variable initialization
var Live_Status = false;
var Live_ids = ['l_thumbdiv', 'l_img', 'l_infodiv', 'l_displayname', 'l_streamtitle', 'l_streamgame', 'l_viwers', 'l_quality', 'l_cell', 'lempty_'];
var Live_cursorY = 0;
var Live_cursorX = 0;
var Live_ExitCursor = 0;
var Live_dataEnded = false;
var Live_itemsCount = 0;
var Live_nameMatrix = [];
var Live_loadingData = false;
var Live_loadingDataTry = 0;
var Live_loadingDataTryMax = 10;
var Live_loadingDataTimeout = 3500;
var Live_blankCellCount = 0;
var Live_blankCellVector = [];
var Live_itemsCountOffset = 0;
var Live_LastClickFinish = true;
var Live_keyClickDelayTime = 25;
var Live_ReplacedataEnded = false;
var Live_MaxOffset = 0;
var Live_checkVersion = false;
var Live_itemsCountCheck = false;
var Live_imgCounter = 0;
var Live_emptyContent = false;
//Variable initialization end

function Live_init() {
    Main_Go = Main_Live;
    Main_AddClass('top_bar_live', 'icon_center_focus');
    document.body.addEventListener("keydown", Live_handleKeyDown, false);
    Main_YRst(Live_cursorY);
    if (Live_Status) {
        Main_ScrollHelper(Live_ids[0], Live_cursorY, Live_cursorX, Main_Live, Main_ScrollOffSetMinusVideo, Main_ScrollOffSetVideo, false);
        Main_CounterDialog(Live_cursorX, Live_cursorY, Main_ColoumnsCountVideo, Live_itemsCount);
    } else Live_StartLoad();
}

function Live_exit() {
    document.body.removeEventListener("keydown", Live_handleKeyDown);
    Main_RemoveClass('top_bar_live', 'icon_center_focus');
    Main_HideExitDialog();
}

function Live_StartLoad() {
    Main_HideWarningDialog();
    Live_Status = false;
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    Main_empty('stream_table_live');
    Live_blankCellCount = 0;
    Live_blankCellVector = [];
    Live_itemsCountOffset = 0;
    Live_ReplacedataEnded = false;
    Live_itemsCountCheck = false;
    Live_MaxOffset = 0;
    Live_nameMatrix = [];
    Live_itemsCount = 0;
    Live_cursorX = 0;
    Live_cursorY = 0;
    Live_imgCounter = 0;
    Live_dataEnded = false;
    Main_CounterDialogRst();
    Live_loadDataPrepare();
    Live_loadDataRequest();
}

function Live_loadDataPrepare() {
    Live_loadingData = true;
    Live_loadingDataTry = 0;
    Live_loadingDataTimeout = 3500;
}

function Live_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Live_itemsCount + Live_itemsCountOffset;
        if (offset && offset > (Live_MaxOffset - 1)) {
            offset = Live_MaxOffset - Main_ItemsLimitVideo;
            Live_dataEnded = true;
            Live_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?limit=' + Main_ItemsLimitVideo + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = Live_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Live_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    Live_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Live_loadDataError();
    }
}

function Live_loadDataError() {
    Live_loadingDataTry++;
    if (Live_loadingDataTry < Live_loadingDataTryMax) {
        Live_loadingDataTimeout += (Live_loadingDataTry < 5) ? 250 : 3500;
        Live_loadDataRequest();
    } else {
        if (!Live_itemsCount) {
            Live_loadingData = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
            Main_ShowElement('topbar');
        } else {
            Live_loadingData = false;
            Live_dataEnded = true;
            Live_ReplacedataEnded = true;
            Live_loadDataSuccessFinish();
        }
    }
}

function Live_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    Live_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) Live_dataEnded = true;

    var offset_itemsCount = Live_itemsCount;
    Live_itemsCount += response_items;

    Live_emptyContent = !Live_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            if (Live_CellExists(stream.channel.name)) coloumn_id--;
            else row.appendChild(Live_createCell(row_id, row_id + '_' + coloumn_id, stream.channel.name, [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                stream.channel.status, stream.game,
                STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
            ]));
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (Live_dataEnded && !Live_itemsCountCheck) {
                Live_itemsCountCheck = true;
                Live_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(Live_ids[9] + row_id + '_' + coloumn_id));
            Live_blankCellVector.push(Live_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_live").appendChild(row);
    }
    Live_loadDataSuccessFinish();
}

function Live_createCell(row_id, id, channel_name, valuesArray) {
    Live_nameMatrix.push(channel_name);
    if (row_id < Main_ColoumnsCountVideo) Main_PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return Main_createCellVideo(channel_name, id, Live_ids, valuesArray); //[preview_thumbnail, channel_display_name, stream_title, stream_game, viwers, quality]
}

function Live_CellExists(display_name) {
    for (var i = 0; i < Live_nameMatrix.length; i++) {
        if (display_name === Live_nameMatrix[i]) {
            Live_blankCellCount++;
            return true;
        }
    }
    return false;
}

function Live_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!Live_Status) {
            Main_HideLoadDialog();
            Main_ShowElement('topbar');
            if (Live_emptyContent) Main_showWarningDialog(STR_NO + STR_LIVE_CHANNELS);
            else {
                Live_Status = true;
                Main_LazyImgStart(Live_ids[1], 7, IMG_404_VIDEO, Main_ColoumnsCountVideo);
                Live_addFocus();
            }
            if (!Live_checkVersion) {
                Live_checkVersion = true;
                if (Main_checkVersion()) Main_showUpdateDialog();

                //Hide all input element and show after html has load
                //to prevent a odd random situation were they show when the app first open
                document.getElementById('oauth').style.display = 'block';
                document.getElementById('search').style.display = 'block';
                document.getElementById('add_user').style.display = 'block';
            }
        } else {
            if (Live_blankCellCount > 0 && !Live_dataEnded) {
                Live_loadDataPrepare();
                Live_loadDataReplace();
                return;
            } else {
                Live_blankCellCount = 0;
                Live_blankCellVector = [];
            }
        }
        Live_loadingData = false;
    });
}

function Live_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReplace(Live_blankCellCount);

        var offset = Live_itemsCount + Live_itemsCountOffset;
        if (offset && offset > (Live_MaxOffset - 1)) {
            offset = Live_MaxOffset - Main_ItemsLimitReplace;
            Live_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?limit=' + Main_ItemsLimitReplace + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = Live_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Live_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Live_loadDataErrorReplace();
    }
}

function Live_loadDataErrorReplace() {
    Live_loadingDataTry++;
    if (Live_loadingDataTry < Live_loadingDataTryMax) {
        Live_loadingDataTimeout += (Live_loadingDataTry < 5) ? 250 : 3500;
        Live_loadDataReplace();
    } else {
        Live_ReplacedataEnded = true;
        Live_blankCellCount = 0;
        Live_blankCellVector = [];
        Live_loadDataSuccessFinish();
    }
}

function Live_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    var stream, index, cursor = 0;
    var tempVector = Live_blankCellVector.slice();

    Live_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) Live_ReplacedataEnded = true;

    for (var i = 0; i < Live_blankCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        if (Live_CellExists(stream.channel.name)) {
            Live_blankCellCount--;
            i--;
        } else {
            Live_nameMatrix.push(stream.channel.name);
            Main_replaceVideo(Live_blankCellVector[i], stream.channel.name, [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                stream.channel.status, stream.game,
                STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
            ], Live_ids);
            Live_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    Live_itemsCountOffset += cursor;
    if (Live_ReplacedataEnded) {
        Live_blankCellCount = 0;
        Live_blankCellVector = [];
    } else Live_blankCellVector = tempVector;

    Live_loadDataSuccessFinish();
}

function Live_addFocus() {
    Main_addFocusVideo(Live_cursorY, Live_cursorX, Live_ids, Main_Live, Main_ColoumnsCountVideo, Live_itemsCount);

    if (Live_cursorY > 2) Main_LazyImg(Live_ids[1], Live_cursorY, IMG_404_VIDEO, Main_ColoumnsCountVideo, 3);

    if (((Live_cursorY + Main_ItemsReloadLimitVideo) > (Live_itemsCount / Main_ColoumnsCountVideo)) &&
        !Live_dataEnded && !Live_loadingData) {
        Live_loadDataPrepare();
        Live_loadDataRequest();
    }
}

function Live_removeFocus() {
    Main_removeFocus(Live_cursorY + '_' + Live_cursorX, Live_ids);
}

function Live_ExitCursorSet() {
    Main_RemoveClass('exit_app_cancel', 'button_search_focused');
    Main_RemoveClass('exit_app_minimize', 'button_search_focused');
    Main_RemoveClass('exit_app_close', 'button_search_focused');
    if (!Live_ExitCursor) Main_AddClass('exit_app_cancel', 'button_search_focused');
    else if (Live_ExitCursor === 1) Main_AddClass('exit_app_minimize', 'button_search_focused');
    else Main_AddClass('exit_app_close', 'button_search_focused');
}

function Live_keyClickDelay() {
    Live_LastClickFinish = true;
}

function Live_handleKeyDown(event) {
    if (Live_loadingData || !Live_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Live_LastClickFinish = false;
        window.setTimeout(Live_keyClickDelay, Live_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isUpdateDialogShown()) Main_HideUpdateDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isExitDialogShown()) Main_HideExitDialog();
            else Main_showExitDialog();
            break;
        case KEY_LEFT:
            if (Main_isExitDialogShown()) {
                Live_ExitCursor--;
                if (Live_ExitCursor < 0) Live_ExitCursor = 2;
                Live_ExitCursorSet();
                Main_clearExitDialog();
                Main_setExitDialog();
            } else if (Main_ThumbNull((Live_cursorY), (Live_cursorX - 1), Live_ids[0])) {
                Live_removeFocus();
                Live_cursorX--;
                Live_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((Live_cursorY - 1), i, Live_ids[0])) {
                        Live_removeFocus();
                        Live_cursorY--;
                        Live_cursorX = i;
                        Live_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_isExitDialogShown()) {
                Live_ExitCursor++;
                if (Live_ExitCursor > 2) Live_ExitCursor = 0;
                Live_ExitCursorSet();
                Main_clearExitDialog();
                Main_setExitDialog();
            } else if (Main_ThumbNull((Live_cursorY), (Live_cursorX + 1), Live_ids[0])) {
                Live_removeFocus();
                Live_cursorX++;
                Live_addFocus();
            } else if (Main_ThumbNull((Live_cursorY + 1), 0, Live_ids[0])) {
                Live_removeFocus();
                Live_cursorY++;
                Live_cursorX = 0;
                Live_addFocus();
            }
            break;
        case KEY_UP:
            if (!Main_isExitDialogShown()) {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((Live_cursorY - 1), (Live_cursorX - i), Live_ids[0])) {
                        Live_removeFocus();
                        Live_cursorY--;
                        Live_cursorX = Live_cursorX - i;
                        Live_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_DOWN:
            if (!Main_isExitDialogShown()) {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((Live_cursorY + 1), (Live_cursorX - i), Live_ids[0])) {
                        Live_removeFocus();
                        Live_cursorY++;
                        Live_cursorX = Live_cursorX - i;
                        Live_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            Live_StartLoad();
            break;
        case KEY_CHANNELUP:
            Main_Before = Main_Live;
            Main_Go = AddUser_IsUserSet() ? Main_Users : Main_addUser;
            Live_exit();
            Main_SwitchScreen();
            break;
        case KEY_CHANNELDOWN:
            Main_Before = Main_Live;
            Main_Go = Main_Clip;
            Live_exit();
            Main_SwitchScreen();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (Main_isExitDialogShown()) {
                // HideExitDialog set Live_ExitCursor to 0, is better to hide befor exit, use temp var
                var temp_ExitCursor = Live_ExitCursor;
                Main_HideExitDialog();
                try {
                    if (temp_ExitCursor === 1) tizen.application.getCurrentApplication().hide();
                    else if (temp_ExitCursor === 2) tizen.application.getCurrentApplication().exit();
                } catch (e) {}
            } else {
                Play_selectedChannel = document.getElementById(Live_ids[8] + Live_cursorY + '_' + Live_cursorX).getAttribute(Main_DataAttribute);
                Play_selectedChannelDisplayname = document.getElementById(Live_ids[3] + Live_cursorY + '_' + Live_cursorX).textContent;
                document.body.removeEventListener("keydown", Live_handleKeyDown);
                Main_openStream();
            }
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_BeforeSearch = Main_Live;
            Main_Go = Main_Search;
            Live_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}