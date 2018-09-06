//Variable initialization
var ChannelClip_cursorY = 0;
var ChannelClip_cursorX = 0;
var ChannelClip_dataEnded = false;
var ChannelClip_itemsCount = 0;
var ChannelClip_idObject = {};
var ChannelClip_emptyCellVector = [];
var ChannelClip_loadingData = false;
var ChannelClip_loadingDataTry = 0;
var ChannelClip_loadingDataTryMax = 5;
var ChannelClip_loadingDataTimeout = 3500;
var ChannelClip_ReplacedataEnded = false;
var ChannelClip_MaxOffset = 0;
var ChannelClip_DurationSeconds = 0;
var ChannelClip_emptyContent = false;

var ChannelClip_ids = ['sp_thumbdiv', 'sp_img', 'sp_infodiv', 'sp_title', 'sp_createdon', 'sp_game', 'sp_viwers', 'sp_duration', 'sp_cell', 'spempty_', 'channel_clip_scroll', 'sp_lang'];
var ChannelClip_status = false;
var ChannelClip_cursor = null;
var ChannelClip_periodNumber = 2;
var ChannelClip_period = 'week';
var ChannelClip_Duration = 0;
var ChannelClip_game = '';
var ChannelClip_views = '';
var ChannelClip_title = '';
var ChannelClip_lastselectedChannel = '';
var ChannelClip_playUrl = '';
var ChannelClip_createdAt = '';
var ChannelClip_language = '';
var ChannelClip_itemsCountCheck = false;
var ChannelClip_FirstLoad = false;
//Variable initialization end

function ChannelClip_init() {
    Main_Go = Main_ChannelClip;
    if (Main_selectedChannel !== ChannelClip_lastselectedChannel) ChannelClip_status = false;
    Main_cleanTopLabel();
    ChannelClip_SetPeriod();
    Main_textContent('top_bar_user', Main_selectedChannelDisplayname);
    Main_IconLoad('label_switch', 'icon-history', STR_SWITCH_CLIP + STR_KEY_UP_DOWN);
    document.body.addEventListener("keydown", ChannelClip_handleKeyDown, false);
    if (ChannelClip_status) {
        Main_YRst(ChannelClip_cursorY);
        Main_ShowElement(ChannelClip_ids[10]);
        Main_CounterDialog(ChannelClip_cursorX, ChannelClip_cursorY, Main_ColoumnsCountVideo, ChannelClip_itemsCount);
    } else ChannelClip_StartLoad();
}

function ChannelClip_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", ChannelClip_handleKeyDown);
    Main_HideElement(ChannelClip_ids[10]);
}

function ChannelClip_StartLoad() {
    Main_HideElement(ChannelClip_ids[10]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    ChannelClip_lastselectedChannel = Main_selectedChannel;
    ChannelClip_cursor = null;
    ChannelClip_status = false;
    Main_empty('stream_table_channel_clip');
    ChannelClip_ReplacedataEnded = false;
    ChannelClip_MaxOffset = 0;
    ChannelClip_idObject = {};
    ChannelClip_emptyCellVector = [];
    ChannelClip_itemsCountCheck = false;
    ChannelClip_FirstLoad = true;
    ChannelClip_itemsCount = 0;
    ChannelClip_cursorX = 0;
    ChannelClip_cursorY = 0;
    ChannelClip_dataEnded = false;
    Main_CounterDialogRst();
    ChannelClip_loadDataPrepare();
    ChannelClip_loadDataRequest();
}

function ChannelClip_loadDataPrepare() {
    Main_imgVectorRst();
    ChannelClip_loadingData = true;
    ChannelClip_loadingDataTry = 0;
    ChannelClip_loadingDataTimeout = 3500;
}

function ChannelClip_SetPeriod() {
    if (ChannelClip_periodNumber === 1) {
        Main_textContent('top_bar_game', STR_CLIPS + STR_CLIP_DAY);
        ChannelClip_period = 'day';
    } else if (ChannelClip_periodNumber === 2) {
        Main_textContent('top_bar_game', STR_CLIPS + STR_CLIP_WEEK);
        ChannelClip_period = 'week';
    } else if (ChannelClip_periodNumber === 3) {
        Main_textContent('top_bar_game', STR_CLIPS + STR_CLIP_MONTH);
        ChannelClip_period = 'month';
    } else if (ChannelClip_periodNumber === 4) {
        Main_textContent('top_bar_game', STR_CLIPS + STR_CLIP_ALL);
        ChannelClip_period = 'all';
    }
    localStorage.setItem('ChannelClip_periodNumber', ChannelClip_periodNumber);
}

function ChannelClip_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?channel=' +
            encodeURIComponent(Main_selectedChannel) + '&limit=' + Main_ItemsLimitVideo + '&period=' +
            encodeURIComponent(ChannelClip_period) +
            (ChannelClip_cursor === null ? '' : '&cursor=' + encodeURIComponent(ChannelClip_cursor)) + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = ChannelClip_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    ChannelClip_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else ChannelClip_loadDataError();
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        ChannelClip_loadDataError();
    }
}

function ChannelClip_loadDataError() {
    ChannelClip_loadingDataTry++;
    if (ChannelClip_loadingDataTry < ChannelClip_loadingDataTryMax) {
        ChannelClip_loadingDataTimeout += 500;
        ChannelClip_loadDataRequest();
    } else {
        ChannelClip_loadingData = false;
        if (!ChannelClip_itemsCount) {
            ChannelClip_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            ChannelClip_dataEnded = true;
            ChannelClip_loadDataSuccessFinish();
        }
    }
}

function ChannelClip_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.clips.length;
    var offset_itemsCount = ChannelClip_itemsCount;

    ChannelClip_cursor = response._cursor;

    if (ChannelClip_cursor === '') ChannelClip_dataEnded = true;
    else {
        // as response_items can be lower then Main_ItemsLimitVideo by 1 and still have more to load
        if (response_items === (Main_ItemsLimitVideo - 1)) ChannelClip_itemsCount += 1;
        else if (response_items < Main_ItemsLimitVideo) ChannelClip_dataEnded = true;
    }

    ChannelClip_itemsCount += response_items;

    ChannelClip_emptyContent = !ChannelClip_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, video, id,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.clips[cursor];
            id = video.tracking_id;
            if (ChannelClip_idObject[id]) coloumn_id--;
            else {
                ChannelClip_idObject[id] = 1;
                row.appendChild(Vod_createCell(row_id, row_id + '_' + coloumn_id,
                    [video.slug, video.duration, video.game, video.broadcaster.name,
                        video.broadcaster.display_name, video.broadcaster.logo.replace("150x150", "300x300"),
                        video.broadcaster.id, (video.vod !== null ? video.vod.id : null),
                        (video.vod !== null ? video.vod.offset : null)
                    ],
                    [video.thumbnails.medium,
                        twemoji.parse(video.title), STR_CREATED_AT + Main_videoCreatedAt(video.created_at),
                        STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                        '[' + video.language.toUpperCase() + ']',
                        STR_DURATION + Play_timeS(video.duration), null
                    ], ChannelClip_ids));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (ChannelClip_dataEnded && !ChannelClip_itemsCountCheck) {
                ChannelClip_itemsCountCheck = true;
                ChannelClip_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(ChannelClip_ids[9] + row_id + '_' + coloumn_id));
            ChannelClip_emptyCellVector.push(ChannelClip_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_channel_clip").appendChild(row);
    }

    ChannelClip_loadDataSuccessFinish();
}

function ChannelClip_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!ChannelClip_status) {
            Main_HideLoadDialog();
            if (ChannelClip_emptyContent) Main_showWarningDialog(STR_NO + STR_CLIPS);
            else {
                ChannelClip_status = true;
                Main_imgVectorLoad(IMG_404_VIDEO);
                ChannelClip_addFocus();
            }
            Main_ShowElement(ChannelClip_ids[10]);
            ChannelClip_FirstLoad = false;
        } else {
            Main_imgVectorLoad(IMG_404_VIDEO);
            if (ChannelClip_emptyCellVector.length > 0 && !ChannelClip_dataEnded) {
                ChannelClip_loadDataPrepare();
                ChannelClip_loadDataReplace();
                return;
            } else ChannelClip_emptyCellVector = [];
        }
        ChannelClip_loadingData = false;
    });
}

function ChannelClip_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?channel=' +
            encodeURIComponent(Main_selectedChannel) + '&limit=100&period=' + ChannelClip_period +
            '&cursor=' + encodeURIComponent(ChannelClip_cursor) +
            '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = ChannelClip_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    ChannelClip_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                } else ChannelClip_loadDataErrorReplace();
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        ChannelClip_loadDataErrorReplace();
    }
}

function ChannelClip_loadDataErrorReplace() {
    ChannelClip_loadingDataTry++;
    if (ChannelClip_loadingDataTry < ChannelClip_loadingDataTryMax) {
        ChannelClip_loadingDataTimeout += 500;
        ChannelClip_loadDataReplace();
    } else {
        ChannelClip_ReplacedataEnded = true;
        ChannelClip_itemsCount -= ChannelClip_emptyCellVector.length;
        ChannelClip_emptyCellVector = [];
        ChannelClip_loadDataSuccessFinish();
    }
}

function ChannelClip_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.clips.length,
        video, id, i = 0,
        cursor = 0,
        tempVector = [];

    if (response._cursor === '' || !response_items) ChannelClip_dataEnded = true;

    for (i; i < ChannelClip_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.clips[cursor];
        id = video.tracking_id;
        if (ChannelClip_idObject[id]) i--;
        else {
            ChannelClip_idObject[id] = 1;
            Vod_replaceVideo(ChannelClip_emptyCellVector[i],
                [video.slug, video.duration, video.game, video.broadcaster.name,
                    video.broadcaster.display_name, video.broadcaster.logo.replace("150x150", "300x300"),
                    video.broadcaster.id, (video.vod !== null ? video.vod.id : null),
                    (video.vod !== null ? video.vod.offset : null)
                ],
                [video.thumbnails.medium,
                    twemoji.parse(video.title), STR_CREATED_AT + Main_videoCreatedAt(video.created_at),
                    STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                    '[' + video.language.toUpperCase() + ']',
                    STR_DURATION + Play_timeS(video.duration), null
                ], ChannelClip_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) ChannelClip_emptyCellVector.splice(tempVector[i], 1);

    if (ChannelClip_emptyCellVector.length || ChannelClip_dataEnded) {
        ChannelClip_dataEnded = true;
        ChannelClip_itemsCount -= ChannelClip_emptyCellVector.length;
        ChannelClip_emptyCellVector = [];
        ChannelClip_loadDataSuccessFinish();
    } else {
        ChannelClip_loadingDataTry = 0;
        ChannelClip_loadingDataTimeout = 3500;
        ChannelClip_SetCursor(cursor);
    }
}

function ChannelClip_SetCursor(cursor) {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?limit=' + cursor + '&period=' +
            encodeURIComponent(ChannelClip_period) + '&cursor=' + encodeURIComponent(ChannelClip_cursor) +
            '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = ChannelClip_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    ChannelClip_cursor = JSON.parse(xmlHttp.responseText)._cursor;
                    if (ChannelClip_cursor === '') ChannelClip_dataEnded = true;
                    ChannelClip_loadDataSuccessFinish();
                    return;
                } else ChannelClip_SetCursorReplace(cursor);
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        ChannelClip_SetCursorReplace(cursor);
    }
}

function ChannelClip_SetCursorReplace(cursor) {
    ChannelClip_loadingDataTry++;
    if (ChannelClip_loadingDataTry < 10) {
        ChannelClip_loadingDataTimeout += 500;
        ChannelClip_SetCursor(cursor);
    } else {
        ChannelClip_dataEnded = true;
        ChannelClip_itemsCount -= ChannelClip_emptyCellVector.length;
        ChannelClip_emptyCellVector = [];
        ChannelClip_loadDataSuccessFinish();
    }
}

function ChannelClip_addFocus() {
    Main_addFocusVideo(ChannelClip_cursorY, ChannelClip_cursorX, ChannelClip_ids, Main_ColoumnsCountVideo, ChannelClip_itemsCount);

    if (((ChannelClip_cursorY + Main_ItemsReloadLimitVideo) > (ChannelClip_itemsCount / Main_ColoumnsCountVideo)) &&
        !ChannelClip_dataEnded && !ChannelClip_loadingData) {
        ChannelClip_loadDataPrepare();
        ChannelClip_loadDataRequest();
    }
}

function ChannelClip_removeFocus() {
    Main_removeFocus(ChannelClip_cursorY + '_' + ChannelClip_cursorX, ChannelClip_ids);
}

function ChannelClip_handleKeyDown(event) {
    if (ChannelClip_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                Main_Go = Main_ChannelContent;
                ChannelClip_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((ChannelClip_cursorY), (ChannelClip_cursorX - 1), ChannelClip_ids[0])) {
                ChannelClip_removeFocus();
                ChannelClip_cursorX--;
                ChannelClip_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((ChannelClip_cursorY - 1), i, ChannelClip_ids[0])) {
                        ChannelClip_removeFocus();
                        ChannelClip_cursorY--;
                        ChannelClip_cursorX = i;
                        ChannelClip_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((ChannelClip_cursorY), (ChannelClip_cursorX + 1), ChannelClip_ids[0])) {
                ChannelClip_removeFocus();
                ChannelClip_cursorX++;
                ChannelClip_addFocus();
            } else if (Main_ThumbNull((ChannelClip_cursorY + 1), 0, ChannelClip_ids[0])) {
                ChannelClip_removeFocus();
                ChannelClip_cursorY++;
                ChannelClip_cursorX = 0;
                ChannelClip_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((ChannelClip_cursorY - 1), (ChannelClip_cursorX - i), ChannelClip_ids[0])) {
                    ChannelClip_removeFocus();
                    ChannelClip_cursorY--;
                    ChannelClip_cursorX = ChannelClip_cursorX - i;
                    ChannelClip_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((ChannelClip_cursorY + 1), (ChannelClip_cursorX - i), ChannelClip_ids[0])) {
                    ChannelClip_removeFocus();
                    ChannelClip_cursorY++;
                    ChannelClip_cursorX = ChannelClip_cursorX - i;
                    ChannelClip_addFocus();
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            ChannelClip_StartLoad();
            break;
        case KEY_CHANNELUP:
            ChannelClip_periodNumber++;
            if (ChannelClip_periodNumber > 4) ChannelClip_periodNumber = 1;
            ChannelClip_SetPeriod();
            ChannelClip_StartLoad();
            break;
        case KEY_CHANNELDOWN:
            ChannelClip_periodNumber--;
            if (ChannelClip_periodNumber < 1) ChannelClip_periodNumber = 4;
            ChannelClip_SetPeriod();
            ChannelClip_StartLoad();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            ChannelClip_playUrl = JSON.parse(document.getElementById(ChannelClip_ids[8] + ChannelClip_cursorY + '_' + ChannelClip_cursorX).getAttribute(Main_DataAttribute));
            ChannelClip_DurationSeconds = parseInt(ChannelClip_playUrl[1]);
            Play_gameSelected = ChannelClip_playUrl[2];
            Main_selectedChannel = ChannelClip_playUrl[3];
            Main_selectedChannelDisplayname = ChannelClip_playUrl[4];
            Main_selectedChannelLogo = ChannelClip_playUrl[5];
            Main_selectedChannel_id = ChannelClip_playUrl[6];
            ChannelVod_vodId = ChannelClip_playUrl[7];
            ChannelVod_vodOffset = parseInt(ChannelClip_playUrl[8]);
            ChannelClip_playUrl = ChannelClip_playUrl[0];

            ChannelClip_title = document.getElementById(ChannelClip_ids[3] + ChannelClip_cursorY + '_' + ChannelClip_cursorX).textContent;
            ChannelClip_createdAt = document.getElementById(ChannelClip_ids[4] + ChannelClip_cursorY + '_' + ChannelClip_cursorX).textContent;
            ChannelClip_Duration = document.getElementById(ChannelClip_ids[5] + ChannelClip_cursorY + '_' + ChannelClip_cursorX).textContent;
            ChannelClip_views = document.getElementById(ChannelClip_ids[6] + ChannelClip_cursorY + '_' + ChannelClip_cursorX).textContent;
            ChannelClip_language = document.getElementById(ChannelClip_ids[7] + ChannelClip_cursorY + '_' + ChannelClip_cursorX).textContent;
            ChannelClip_game = document.getElementById(ChannelClip_ids[11] + ChannelClip_cursorY + '_' + ChannelClip_cursorX).textContent;
            ChannelClip_openStream();
            break;
        case KEY_RED:
            Main_SidePannelStart(ChannelClip_handleKeyDown);
            break;
        case KEY_GREEN:
            ChannelClip_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            if (!Search_isSearching) Main_BeforeSearch = Main_ChannelClip;
            Main_Go = Main_Search;
            ChannelClip_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}

function ChannelClip_openStream() {
    document.body.addEventListener("keydown", PlayClip_handleKeyDown, false);
    document.body.removeEventListener("keydown", ChannelClip_handleKeyDown);
    Main_ShowElement('scene2');
    Play_hideChat();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_CleanHideExit();
    Main_HideElement('scene1');

    PlayClip_Start();
}