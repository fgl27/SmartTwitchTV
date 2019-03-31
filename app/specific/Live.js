//Variable initialization
var Live_Status = false;
var Live_ids = ['l_thumbdiv', 'l_img', 'l_infodiv', 'l_displayname', 'l_streamtitle', 'l_streamgame', 'l_viwers', 'l_quality', 'l_cell', 'lempty_', 'live_scroll'];
var Live_cursorY = 0;
var Live_cursorX = 0;
var Live_ExitCursor = 0;
var Live_dataEnded = false;
var Live_itemsCount = 0;
var Live_idObject = {};
var Live_loadingData = false;
var Live_loadingDataTry = 0;
var Live_loadingDataTryMax = 5;
var Live_loadingDataTimeout = 3500;
var Live_emptyCellVector = [];
var Live_itemsCountOffset = 0;
var Live_MaxOffset = 0;
var Live_itemsCountCheck = false;
var Live_imgCounter = 0;
//Variable initialization end

function Live_init() {
    Main_values.Main_CenterLablesVectorPos = 0;
    Main_values.Main_Go = Main_Live;
    Main_AddClass('top_bar_live', 'icon_center_focus');
    document.body.addEventListener("keydown", Live_handleKeyDown, false);
    if (Live_Status) {
        Main_YRst(Live_cursorY);
        Main_ShowElement(Live_ids[10]);
        Main_CounterDialog(Live_cursorX, Live_cursorY, Main_ColoumnsCountVideo, Live_itemsCount);
        Live_addFocus();
        Main_SaveValues();
    } else Live_StartLoad();
}

function Live_exit() {
    document.body.removeEventListener("keydown", Live_handleKeyDown);
    Main_RemoveClass('top_bar_live', 'icon_center_focus');
    Main_HideElement(Live_ids[10]);
}

function Live_StartLoad() {
    Main_HideElement(Live_ids[10]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    Live_Status = false;
    Main_empty('stream_table_live');
    Live_emptyCellVector = [];
    Live_itemsCountOffset = 0;
    Live_itemsCountCheck = false;
    Main_FirstLoad = true;
    Live_MaxOffset = 0;
    Live_idObject = {};
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
    Main_imgVectorRst();
    Live_loadingData = true;
    Live_loadingDataTry = 0;
    Live_loadingDataTimeout = 3500;
}

function Live_loadDataRequest() {

    var offset = Live_itemsCount + Live_itemsCountOffset;
    if (offset && offset > (Live_MaxOffset - 1)) {
        offset = Live_MaxOffset - Main_ItemsLimitVideo;
        Live_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/streams?limit=' + Main_ItemsLimitVideo + '&offset=' + offset +
        (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');

    BasehttpGet(theUrl, Live_loadingDataTimeout, 2, null, Live_loadDataSuccess, Live_loadDataError);
}

function Live_loadDataError() {
    Live_loadingDataTry++;
    if (Live_loadingDataTry < Live_loadingDataTryMax) {
        Live_loadingDataTimeout += 500;
        Live_loadDataRequest();
    } else {
        Live_loadingData = false;
        if (!Live_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
            Main_ShowElement('topbar');
        } else {
            Live_dataEnded = true;
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
            if (Live_idObject[id]) coloumn_id--;
            else {
                Live_idObject[id] = 1;
                row.appendChild(Main_createCellVideo(row_id, row_id + '_' + coloumn_id,
                    [stream.channel.name, id, stream.channel.status], Live_ids,
                    [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                        Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                        stream.channel.status, stream.game,
                        STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                        Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
                    ]));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (Live_dataEnded && !Live_itemsCountCheck) {
                Live_itemsCountCheck = true;
                Live_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(Live_ids[9] + row_id + '_' + coloumn_id));
            Live_emptyCellVector.push(Live_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_live").appendChild(row);
    }
    Live_loadDataSuccessFinish();
}

function Live_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!Live_Status) {
            Main_HideLoadDialog();
            Main_ShowElement('topbar');
            if (!Live_itemsCount) Main_showWarningDialog(STR_NO + STR_LIVE_CHANNELS);
            else {
                Live_Status = true;
                Main_imgVectorLoad(IMG_404_VIDEO);
                Live_addFocus();
            }
            if (Main_FirstRun && Live_Status &&
                (Settings_value.restor_playback.defaultValue) && (Main_values.Play_WasPlaying || Main_values.Main_WasOpen)) {
                if (Main_values.Play_WasPlaying) {

                    Main_ExitCurrent(Main_values.Main_Go);
                    Main_values.Main_Go = Main_GoBefore;
                    if (!Main_values.vodOffset) Main_values.vodOffset = 1;
                    ChannelVod_DurationSeconds = Main_values.vodOffset + 1;

                    Play_showWarningDialog(STR_RESTORE_PLAYBACK_WARN);

                    if (Main_values.Play_WasPlaying === 1) Main_openStream();
                    else Main_openVod();

                    Main_SwitchScreen();
                    Main_ExitCurrent(Main_values.Main_Go);
                    window.setTimeout(function() {
                        Play_HideWarningDialog();
                    }, 2000);
                } else if (Main_GoBefore !== 1) {
                    Main_ExitCurrent(Main_values.Main_Go);
                    Main_values.Main_Go = Main_GoBefore;
                    Live_removeFocus();
                    Main_SwitchScreen();
                } else Main_ShowElement(Live_ids[10]);
            } else {
                if (Main_values.Never_run) Main_showControlsDialog();
                Main_values.Never_run = false;
                Main_ShowElement(Live_ids[10]);
                Main_SaveValues();
            }
            Main_FirstRun = false;
            Main_FirstLoad = false;
        } else {
            Main_imgVectorLoad(IMG_404_VIDEO);
            if (Live_emptyCellVector.length > 0 && !Live_dataEnded) {
                Live_loadDataPrepare();
                Live_loadDataReplace();
                return;
            } else {
                Main_CounterDialog(Live_cursorX, Live_cursorY, Main_ColoumnsCountVideo, Live_itemsCount);
                Live_emptyCellVector = [];
            }
        }
        Live_loadingData = false;
    });
}

function Live_loadDataReplace() {

    Main_SetItemsLimitReplace(Live_emptyCellVector.length);

    var offset = Live_itemsCount + Live_itemsCountOffset;
    if (offset && offset > (Live_MaxOffset - 1)) {
        offset = Live_MaxOffset - Main_ItemsLimitReplace;
        Live_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/streams?limit=' + Main_ItemsLimitReplace + '&offset=' + offset +
        (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');

    BasehttpGet(theUrl, Live_loadingDataTimeout, 2, null, Live_loadDataSuccessReplace, Live_loadDataErrorReplace);
    //XMLHttpRequest
}

function Live_loadDataErrorReplace() {
    Live_loadingDataTry++;
    if (Live_loadingDataTry < Live_loadingDataTryMax) {
        Live_loadingDataTimeout += 500;
        Live_loadDataReplace();
    } else {
        Live_dataEnded = true;
        Live_itemsCount -= Live_emptyCellVector.length;
        Live_emptyCellVector = [];
        Live_loadDataSuccessFinish();
    }
}

function Live_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.streams.length,
        stream, id, i = 0,
        cursor = 0,
        tempVector = [];

    Live_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitReplace) Live_dataEnded = true;

    for (i; i < Live_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        id = stream.channel._id;
        if (Live_idObject[id]) i--;
        else {
            Live_idObject[id] = 1;
            Main_replaceVideo(Live_emptyCellVector[i], [stream.channel.name, id], [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                stream.channel.status, stream.game,
                STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR +
                Main_addCommas(stream.viewers) + STR_VIEWER,
                Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
            ], Live_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) Live_emptyCellVector.splice(tempVector[i], 1);

    Live_itemsCountOffset += cursor;
    if (Live_dataEnded) {
        Live_itemsCount -= Live_emptyCellVector.length;
        Live_emptyCellVector = [];
    }

    Live_loadDataSuccessFinish();
}

function Live_addFocus() {
    Main_addFocusVideo(Live_cursorY, Live_cursorX, Live_ids, Main_ColoumnsCountVideo, Live_itemsCount);

    if (((Live_cursorY + Main_ItemsReloadLimitVideo) > (Live_itemsCount / Main_ColoumnsCountVideo)) &&
        !Live_dataEnded && !Live_loadingData) {
        Live_loadDataPrepare();
        Live_loadDataRequest();
    }
    if (Main_CenterLablesInUse) Live_removeFocus();
}

function Live_removeFocus() {
    if (Live_itemsCount) Main_removeFocus(Live_cursorY + '_' + Live_cursorX, Live_ids);
}

function Live_ExitCursorSet() {
    Main_RemoveClass('exit_app_cancel', 'button_search_focused');
    Main_RemoveClass('exit_app_minimize', 'button_search_focused');
    Main_RemoveClass('exit_app_close', 'button_search_focused');
    if (!Live_ExitCursor) Main_AddClass('exit_app_cancel', 'button_search_focused');
    else if (Live_ExitCursor === 1) Main_AddClass('exit_app_minimize', 'button_search_focused');
    else Main_AddClass('exit_app_close', 'button_search_focused');
}

function Live_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isUpdateDialogShown()) Main_HideUpdateDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Live_removeFocus();
                Main_CenterLablesStart(Live_handleKeyDown);
            }
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
            Main_values.Main_Before = Main_Live;
            Main_values.Main_Go = AddUser_IsUserSet() ? Main_Users : Main_addUser;
            Live_exit();
            Main_SwitchScreen();
            break;
        case KEY_CHANNELDOWN:
            Main_values.Main_Before = Main_Live;
            Main_values.Main_Go = Main_Clip;
            Live_exit();
            Main_SwitchScreen();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_OpenLiveStream(Live_cursorY + '_' + Live_cursorX, Live_ids, Live_handleKeyDown);
            break;
        case KEY_RED:
            Main_SidePannelStart(Live_handleKeyDown);
            break;
        case KEY_GREEN:
            if (!Main_isReleased) {
                Main_PrintUnicode('Reloading');
                window.location.reload(true); // refresh the app from live
            }
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_values.Main_BeforeSearch = Main_Live;
            Main_values.Main_Go = Main_Search;
            Live_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}