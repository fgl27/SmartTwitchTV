//Variable initialization
var Featured_Status = false;
var Featured_ids = ['f_thumbdiv', 'f_img', 'f_infodiv', 'f_displayname', 'f_streamtitle', 'f_streamgame', 'f_viwers', 'f_quality', 'f_cell', 'fempty_'];
var Featured_cursorY = 0;
var Featured_cursorX = 0;
var Featured_dataEnded = false;
var Featured_itemsCount = 0;
var Featured_nameMatrix = [];
var Featured_loadingData = false;
var Featured_loadingDataTry = 0;
var Featured_loadingDataTryMax = 10;
var Featured_loadingDataTimeout = 3500;
var Featured_blankCellCount = 0;
var Featured_blankCellVector = [];
var Featured_itemsCountOffset = 0;
var Featured_LastClickFinish = true;
var Featured_keyClickDelayTime = 25;
var Featured_ReplacedataEnded = false;
var Featured_MaxOffset = 0;
var Featured_itemsCountCheck = false;
var Featured_imgCounter = 0;
var Featured_emptyContent = false;
//Variable initialization end

function Featured_init() {
    Main_Go = Main_Featured;
    Main_AddClass('top_bar_featured', 'icon_center_focus');
    document.body.addEventListener("keydown", Featured_handleKeyDown, false);
    Main_YRst(Featured_cursorY);
    if (Featured_Status) {
        Main_ScrollHelper(Featured_ids[0], Featured_cursorY, Featured_cursorX, Main_Featured, Main_ScrollOffSetMinusVideo, Main_ScrollOffSetVideo, false);
        Main_CounterDialog(Featured_cursorX, Featured_cursorY, Main_ColoumnsCountVideo, Featured_itemsCount);
    } else Featured_StartLoad();
}

function Featured_exit() {
    document.body.removeEventListener("keydown", Featured_handleKeyDown);
    Main_RemoveClass('top_bar_featured', 'icon_center_focus');
}

function Featured_StartLoad() {
    Main_HideWarningDialog();
    Featured_Status = false;
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    Main_empty('stream_table_featured');
    Featured_blankCellCount = 0;
    Featured_blankCellVector = [];
    Featured_itemsCountOffset = 0;
    Featured_ReplacedataEnded = false;
    Featured_itemsCountCheck = false;
    Featured_MaxOffset = 0;
    Featured_nameMatrix = [];
    Featured_itemsCount = 0;
    Featured_cursorX = 0;
    Featured_cursorY = 0;
    Featured_imgCounter = 0;
    Featured_dataEnded = false;
    Main_CounterDialogRst();
    Featured_loadDataPrepare();
    Featured_loadDataRequest();
}

function Featured_loadDataPrepare() {
    Featured_loadingData = true;
    Featured_loadingDataTry = 0;
    Featured_loadingDataTimeout = 3500;
}

function Featured_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Featured_itemsCount + Featured_itemsCountOffset;

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/featured?limit=' + Main_ItemsLimitVideo +
            '&offset=' + offset + (AddCode_OauthToken !== '' ? '&oauth_token=' + AddCode_OauthToken : '') +
            '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Featured_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Featured_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    Featured_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Featured_loadDataError();
    }
}

function Featured_loadDataError() {
    Featured_loadingDataTry++;
    if (Featured_loadingDataTry < Featured_loadingDataTryMax) {
        Featured_loadingDataTimeout += (Featured_loadingDataTry < 5) ? 250 : 3500;
        Featured_loadDataRequest();
    } else {
        if (!Featured_itemsCount) {
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            Featured_dataEnded = true;
            Featured_ReplacedataEnded = true;
            Featured_loadDataSuccessFinish();
        }
        Featured_loadingData = false;
    }
}

function Featured_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.featured.length;
    Featured_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) Featured_dataEnded = true;

    var offset_itemsCount = Featured_itemsCount;
    Featured_itemsCount += response_items;

    Featured_emptyContent = !Featured_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.featured[cursor].stream;
            if (Featured_CellExists(stream.channel.name)) coloumn_id--;
            else row.appendChild(Featured_createCell(row_id, row_id + '_' + coloumn_id, stream.channel.name, [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                stream.channel.status, stream.game,
                STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
            ]));
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (Featured_dataEnded && !Featured_itemsCountCheck) {
                Featured_itemsCountCheck = true;
                Featured_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(Featured_ids[9] + row_id + '_' + coloumn_id));
            Featured_blankCellVector.push(Featured_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_featured").appendChild(row);
    }
    Featured_loadDataSuccessFinish();
}

function Featured_createCell(row_id, id, channef_name, valuesArray) {
    Featured_nameMatrix.push(channef_name);
    if (row_id < Main_ColoumnsCountVideo) Main_PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return Main_createCellVideo(channef_name, id, Featured_ids, valuesArray); //[preview_thumbnail, channef_display_name, stream_title, stream_game, viwers, quality]
}

function Featured_CellExists(display_name) {
    for (var i = 0; i < Featured_nameMatrix.length; i++) {
        if (display_name === Featured_nameMatrix[i]) {
            Featured_blankCellCount++;
            return true;
        }
    }
    return false;
}

function Featured_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!Featured_Status) {
            Main_HideLoadDialog();
            if (Featured_emptyContent) Main_showWarningDialog(STR_NO + STR_LIVE_CHANNELS);
            else {
                Featured_Status = true;
                Main_LazyImgStart(Featured_ids[1], 7, IMG_404_VIDEO, Main_ColoumnsCountVideo);
                Featured_addFocus();
            }
        } else {
            if (Featured_blankCellCount > 0 && !Featured_dataEnded) {
                Featured_loadDataPrepare();
                Featured_loadDataReplace();
                return;
            } else {
                Featured_blankCellCount = 0;
                Featured_blankCellVector = [];
            }
        }
        Featured_loadingData = false;
    });
}

function Featured_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReplace(Featured_blankCellCount);

        var offset = Featured_itemsCount + Featured_itemsCountOffset;

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/featured?limit=' + Main_ItemsLimitReplace +
            '&offset=' + offset + (AddCode_OauthToken !== '' ? '&oauth_token=' + AddCode_OauthToken : '') +
            '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Featured_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Featured_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Featured_loadDataErrorReplace();
    }
}

function Featured_loadDataErrorReplace() {
    Featured_loadingDataTry++;
    if (Featured_loadingDataTry < Featured_loadingDataTryMax) {
        Featured_loadingDataTimeout += (Featured_loadingDataTry < 5) ? 250 : 3500;
        Featured_loadDataReplace();
    } else {
        Featured_ReplacedataEnded = true;
        Featured_blankCellCount = 0;
        Featured_blankCellVector = [];
        Featured_loadDataSuccessFinish();
    }
}

function Featured_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.featured.length;
    var stream, index, cursor = 0;
    var tempVector = Featured_blankCellVector.slice();

    if (response_items < Main_ItemsLimitVideo) Featured_ReplacedataEnded = true;

    for (var i = 0; i < Featured_blankCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.featured[cursor].stream;
        if (Featured_CellExists(stream.channel.name)) {
            Featured_blankCellCount--;
            i--;
        } else {
            Featured_nameMatrix.push(stream.channel.name);
            Main_replaceVideo(Featured_blankCellVector[i], stream.channel.name, [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                stream.channel.status, stream.game,
                STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
            ], Featured_ids);
            Featured_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) tempVector.splice(index, 1);
        }
    }

    Featured_itemsCountOffset += cursor;
    if (Featured_ReplacedataEnded) {
        Featured_blankCellCount = 0;
        Featured_blankCellVector = [];
    } else Featured_blankCellVector = tempVector;

    Featured_loadDataSuccessFinish();
}

function Featured_addFocus() {
    Main_addFocusVideo(Featured_cursorY, Featured_cursorX, Featured_ids, Main_Featured, Main_ColoumnsCountVideo, Featured_itemsCount);

    if (Featured_cursorY > 2) Main_LazyImg(Featured_ids[1], Featured_cursorY, IMG_404_VIDEO, Main_ColoumnsCountVideo, 3);

    if (((Featured_cursorY + Main_ItemsReloadLimitVideo) > (Featured_itemsCount / Main_ColoumnsCountVideo)) &&
        !Featured_dataEnded && !Featured_loadingData) {
        Featured_loadDataPrepare();
        Featured_loadDataRequest();
    }
}

function Featured_removeFocus() {
    Main_removeFocus(Featured_cursorY + '_' + Featured_cursorX, Featured_ids);
}

function Featured_keyClickDelay() {
    Featured_LastClickFinish = true;
}

function Featured_handleKeyDown(event) {
    if (Featured_loadingData || !Featured_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Featured_LastClickFinish = false;
        window.setTimeout(Featured_keyClickDelay, Featured_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                if (Main_Before === Main_Featured) Main_Go = Main_Live;
                else Main_Go = Main_Before;
                Featured_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((Featured_cursorY), (Featured_cursorX - 1), Featured_ids[0])) {
                Featured_removeFocus();
                Featured_cursorX--;
                Featured_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((Featured_cursorY - 1), i, Featured_ids[0])) {
                        Featured_removeFocus();
                        Featured_cursorY--;
                        Featured_cursorX = i;
                        Featured_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((Featured_cursorY), (Featured_cursorX + 1), Featured_ids[0])) {
                Featured_removeFocus();
                Featured_cursorX++;
                Featured_addFocus();
            } else if (Main_ThumbNull((Featured_cursorY + 1), 0, Featured_ids[0])) {
                Featured_removeFocus();
                Featured_cursorY++;
                Featured_cursorX = 0;
                Featured_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((Featured_cursorY - 1), (Featured_cursorX - i), Featured_ids[0])) {
                    Featured_removeFocus();
                    Featured_cursorY--;
                    Featured_cursorX = Featured_cursorX - i;
                    Featured_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((Featured_cursorY + 1), (Featured_cursorX - i), Featured_ids[0])) {
                    Featured_removeFocus();
                    Featured_cursorY++;
                    Featured_cursorX = Featured_cursorX - i;
                    Featured_addFocus();
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            Featured_StartLoad();
            break;
        case KEY_CHANNELUP:
            Main_Before = Main_Users;
            Main_Go = Main_games;
            Featured_exit();
            Main_SwitchScreen();
            break;
        case KEY_CHANNELDOWN:
            Main_Before = Main_Featured;
            Main_Go = AddUser_IsUserSet() ? Main_Users : Main_addUser;
            Featured_exit();
            Main_SwitchScreen();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Play_selectedChannel = document.getElementById(Featured_ids[8] + Featured_cursorY + '_' + Featured_cursorX).getAttribute(Main_DataAttribute);
            Play_selectedChannelDisplayname = document.getElementById(Featured_ids[3] + Featured_cursorY + '_' + Featured_cursorX).textContent;
            document.body.removeEventListener("keydown", Featured_handleKeyDown);
            Main_openStream();
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            Featured_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_BeforeSearch = Main_Featured;
            Main_Go = Main_Search;
            Featured_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}