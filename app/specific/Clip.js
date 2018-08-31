//Variable initialization
var Clip_cursorY = 0;
var Clip_cursorX = 0;
var Clip_dataEnded = false;
var Clip_itemsCount = 0;
var Clip_idObject = {};
var Clip_emptyCellVector = [];
var Clip_loadingData = false;
var Clip_loadingDataTry = 0;
var Clip_loadingDataTryMax = 5;
var Clip_loadingDataTimeout = 3500;
var Clip_MaxOffset = 0;
var Clip_emptyContent = false;

var Clip_ids = ['c_thumbdiv', 'c_img', 'c_infodiv', 'c_title', 'c_createdon', 'c_game', 'c_viwers', 'c_duration', 'c_cell', 'cpempty_', 'clip_scroll', 'c_lang'];
var Clip_status = false;
var Clip_cursor = null;
var Clip_periodNumber = 2;
var Clip_period = 'week';
var Clip_itemsCountCheck = false;
var Clip_FirstLoad = false;
//Variable initialization end

function Clip_init() {
    Main_Go = Main_Clip;
    Clip_SetPeriod();
    Main_AddClass('top_bar_clip', 'icon_center_focus');

    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    Main_IconLoad('label_controls', 'icon-history', STR_SWITCH_CLIP + ' (C)');

    document.body.addEventListener("keydown", Clip_handleKeyDown, false);
    if (Clip_status) {
        Main_YRst(Clip_cursorY);
        Main_ShowElement(Clip_ids[10]);
        Main_CounterDialog(Clip_cursorX, Clip_cursorY, Main_ColoumnsCountVideo, Clip_itemsCount);
    } else Clip_StartLoad();
}

function Clip_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", Clip_handleKeyDown);
    Main_RemoveClass('top_bar_clip', 'icon_center_focus');

    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    Main_IconLoad('label_controls', 'icon-question-circle', STR_CONTROL_KEY);
    Main_HideElement(Clip_ids[10]);
}

function Clip_StartLoad() {
    Main_HideElement(Clip_ids[10]);
    Main_HideWarningDialog();
    Main_showLoadDialog();
    Clip_cursor = null;
    Clip_status = false;
    Main_empty('stream_table_clip');
    Clip_MaxOffset = 0;
    Clip_idObject = {};
    Clip_emptyCellVector = [];
    Clip_itemsCountCheck = false;
    Clip_FirstLoad = true;
    Clip_itemsCount = 0;
    Clip_cursorX = 0;
    Clip_cursorY = 0;
    Clip_dataEnded = false;
    Main_CounterDialogRst();
    Clip_loadDataPrepare();
    Clip_loadDataRequest();
}

function Clip_loadDataPrepare() {
    Main_imgVectorRst();
    Clip_loadingData = true;
    Clip_loadingDataTry = 0;
    Clip_loadingDataTimeout = 3500;
}

function Clip_SetPeriod() {
    if (Clip_periodNumber === 1) {
        Main_innerHTML('top_bar_clip', STR_CLIPS + Main_UnderCenter(STR_CLIP_DAY));
        Clip_period = 'day';
    } else if (Clip_periodNumber === 2) {
        Main_innerHTML('top_bar_clip', STR_CLIPS + Main_UnderCenter(STR_CLIP_WEEK));
        Clip_period = 'week';
    } else if (Clip_periodNumber === 3) {
        Main_innerHTML('top_bar_clip', STR_CLIPS + Main_UnderCenter(STR_CLIP_MONTH));
        Clip_period = 'month';
    } else if (Clip_periodNumber === 4) {
        Main_innerHTML('top_bar_clip', STR_CLIPS + Main_UnderCenter(STR_CLIP_ALL));
        Clip_period = 'all';
    }
    localStorage.setItem('Clip_periodNumber', Clip_periodNumber);
}

function Clip_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?limit=' + Main_ItemsLimitVideo +
            '&period=' + encodeURIComponent(Clip_period) +
            (Clip_cursor === null ? '' : '&cursor=' + encodeURIComponent(Clip_cursor)) +
            '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Clip_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Clip_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else Clip_loadDataError();
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Clip_loadDataError();
    }
}

function Clip_loadDataError() {
    Clip_loadingDataTry++;
    if (Clip_loadingDataTry < Clip_loadingDataTryMax) {
        Clip_loadingDataTimeout += 500;
        Clip_loadDataRequest();
    } else {
        Clip_loadingData = false;
        if (!Clip_itemsCount) {
            Clip_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            Clip_dataEnded = true;
            Clip_loadDataSuccessFinish();
        }
    }
}

function Clip_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.clips.length;
    var offset_itemsCount = Clip_itemsCount;

    Clip_cursor = response._cursor;

    if (Clip_cursor === '') Clip_dataEnded = true;
    else {
        // as response_items can be lower then Main_ItemsLimitVideo by 1 and still have more to load
        if (response_items === (Main_ItemsLimitVideo - 1)) Clip_itemsCount += 1;
        else if (response_items < Main_ItemsLimitVideo) Clip_dataEnded = true;
    }
    Clip_itemsCount += response_items;

    Clip_emptyContent = !Clip_itemsCount;

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
            if (Clip_idObject[id]) coloumn_id--;
            else {
                Clip_idObject[id] = 1;
                row.appendChild(Vod_createCell(row_id, row_id + '_' + coloumn_id,
                    video.slug + ',' + video.duration + ',' + video.game + ',' + video.broadcaster.name +
                    ',' + video.broadcaster.display_name + ',' +
                    video.broadcaster.logo.replace("150x150", "300x300") +
                    ',' + video.broadcaster.id + ',' +
                    (video.vod !== null ? video.vod.id + ',' + video.vod.offset : null + ',' + null), [video.thumbnails.medium,
                        video.broadcaster.display_name,
                        STR_CREATED_AT + Main_videoCreatedAt(video.created_at),
                        video.title + STR_BR + STR_PLAYING + video.game,
                        Main_addCommas(video.views) + STR_VIEWS,
                        '[' + video.language.toUpperCase() + ']', STR_DURATION + Play_timeS(video.duration), null
                    ], Clip_ids));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (Clip_dataEnded && !Clip_itemsCountCheck) {
                Clip_itemsCountCheck = true;
                Clip_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(Clip_ids[9] + row_id + '_' + coloumn_id));
            Clip_emptyCellVector.push(Clip_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_clip").appendChild(row);
    }

    Clip_loadDataSuccessFinish();
}

function Clip_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!Clip_status) {
            Main_HideLoadDialog();
            if (Clip_emptyContent) Main_showWarningDialog(STR_NO + STR_CLIPS);
            else {
                Clip_status = true;
                Main_imgVectorLoad(IMG_404_VIDEO);
                Clip_addFocus();
            }
            Main_ShowElement(Clip_ids[10]);
            Clip_FirstLoad = false;
        } else {
            Main_imgVectorLoad(IMG_404_VIDEO);
            if (Clip_emptyCellVector.length > 0 && !Clip_dataEnded) {
                Clip_loadDataPrepare();
                Clip_loadDataReplace();
                return;
            } else Clip_emptyCellVector = [];
        }
        Clip_loadingData = false;
    });
}

function Clip_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?limit=100&period=' +
            encodeURIComponent(Clip_period) + '&cursor=' + encodeURIComponent(Clip_cursor) +
            '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Clip_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Clip_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                } else Clip_loadDataErrorReplace();
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Clip_loadDataErrorReplace();
    }
}

function Clip_loadDataErrorReplace() {
    Clip_loadingDataTry++;
    if (Clip_loadingDataTry < Clip_loadingDataTryMax) {
        Clip_loadingDataTimeout += 500;
        Clip_loadDataReplace();
    } else {
        Clip_dataEnded = true;
        Clip_itemsCount -= Clip_emptyCellVector.length;
        Clip_emptyCellVector = [];
        Clip_loadDataSuccessFinish();
    }
}

function Clip_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.clips.length,
        video, id, i = 0,
        cursor = 0,
        tempVector = [];

    if (response._cursor === '' || !response_items) Clip_dataEnded = true;

    for (i; i < Clip_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.clips[cursor];
        id = video.tracking_id;
        if (Clip_idObject[id]) i--;
        else {
            Clip_idObject[id] = 1;
            Vod_replaceVideo(Clip_emptyCellVector[i],
                video.slug + ',' + video.duration + ',' + video.game + ',' + video.broadcaster.name +
                ',' + video.broadcaster.display_name + ',' +
                video.broadcaster.logo.replace("150x150", "300x300") +
                ',' + video.broadcaster.id + ',' +
                (video.vod !== null ? video.vod.id + ',' + video.vod.offset : null + ',' + null), [video.thumbnails.medium,
                    video.broadcaster.display_name,
                    STR_CREATED_AT + Main_videoCreatedAt(video.created_at),
                    video.title + STR_BR + STR_PLAYING + video.game,
                    Main_addCommas(video.views) + STR_VIEWS,
                    '[' + video.language.toUpperCase() + ']', STR_DURATION + Play_timeS(video.duration), null
                ], Clip_ids);
            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) Clip_emptyCellVector.splice(tempVector[i], 1);

    if (Clip_emptyCellVector.length || Clip_dataEnded) {
        Clip_dataEnded = true;
        Clip_itemsCount -= Clip_emptyCellVector.length;
        Clip_emptyCellVector = [];
        Clip_loadDataSuccessFinish();
    } else {
        Clip_loadingDataTry = 0;
        Clip_loadingDataTimeout = 3500;
        Clip_SetCursor(cursor);
    }
}

function Clip_SetCursor(cursor) {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?limit=' + cursor + '&period=' +
            encodeURIComponent(Clip_period) + '&cursor=' + encodeURIComponent(Clip_cursor) +
            '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Clip_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Clip_cursor = JSON.parse(xmlHttp.responseText)._cursor;
                    if (Clip_cursor === '') Clip_dataEnded = true;
                    Clip_loadDataSuccessFinish();
                    return;
                } else Clip_SetCursorReplace(cursor);
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Clip_SetCursorReplace(cursor);
    }
}

function Clip_SetCursorReplace(cursor) {
    Clip_loadingDataTry++;
    if (Clip_loadingDataTry < 10) {
        Clip_loadingDataTimeout += 500;
        Clip_SetCursor(cursor);
    } else {
        Clip_dataEnded = true;
        Clip_itemsCount -= Clip_emptyCellVector.length;
        Clip_emptyCellVector = [];
        Clip_loadDataSuccessFinish();
    }
}

function Clip_addFocus() {
    Main_addFocusVideo(Clip_cursorY, Clip_cursorX, Clip_ids, Main_ColoumnsCountVideo, Clip_itemsCount);

    if (((Clip_cursorY + Main_ItemsReloadLimitVideo) > (Clip_itemsCount / Main_ColoumnsCountVideo)) &&
        !Clip_dataEnded && !Clip_loadingData) {
        Clip_loadDataPrepare();
        Clip_loadDataRequest();
    }
}

function Clip_removeFocus() {
    Main_removeFocus(Clip_cursorY + '_' + Clip_cursorX, Clip_ids);
}

function Clip_handleKeyDown(event) {
    if (Clip_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_Before === Main_Clip) Main_Go = Main_Live;
            else Main_Go = Main_Before;
            Clip_exit();
            Main_SwitchScreen();
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((Clip_cursorY), (Clip_cursorX - 1), Clip_ids[0])) {
                Clip_removeFocus();
                Clip_cursorX--;
                Clip_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((Clip_cursorY - 1), i, Clip_ids[0])) {
                        Clip_removeFocus();
                        Clip_cursorY--;
                        Clip_cursorX = i;
                        Clip_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((Clip_cursorY), (Clip_cursorX + 1), Clip_ids[0])) {
                Clip_removeFocus();
                Clip_cursorX++;
                Clip_addFocus();
            } else if (Main_ThumbNull((Clip_cursorY + 1), 0, Clip_ids[0])) {
                Clip_removeFocus();
                Clip_cursorY++;
                Clip_cursorX = 0;
                Clip_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((Clip_cursorY - 1), (Clip_cursorX - i), Clip_ids[0])) {
                    Clip_removeFocus();
                    Clip_cursorY--;
                    Clip_cursorX = Clip_cursorX - i;
                    Clip_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((Clip_cursorY + 1), (Clip_cursorX - i), Clip_ids[0])) {
                    Clip_removeFocus();
                    Clip_cursorY++;
                    Clip_cursorX = Clip_cursorX - i;
                    Clip_addFocus();
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            Clip_StartLoad();
            break;
        case KEY_CHANNELUP:
            Main_Before = Main_Clip;
            Main_Go = Main_Live;
            Clip_exit();
            Main_SwitchScreen();
            break;
        case KEY_CHANNELDOWN:
            Main_Before = Main_Clip;
            Main_Go = Main_Vod;
            Clip_exit();
            Main_SwitchScreen();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            ChannelClip_playUrl = document.getElementById(Clip_ids[8] + Clip_cursorY + '_' + Clip_cursorX).getAttribute(Main_DataAttribute).split(',');
            ChannelClip_DurationSeconds = parseInt(ChannelClip_playUrl[1]);
            Play_gameSelected = ChannelClip_playUrl[2];
            Main_selectedChannel = ChannelClip_playUrl[3];
            Main_selectedChannelDisplayname = ChannelClip_playUrl[4];
            Main_selectedChannelLogo = ChannelClip_playUrl[5];
            Main_selectedChannel_id = ChannelClip_playUrl[6];
            ChannelVod_vodId = ChannelClip_playUrl[7];
            ChannelVod_vodOffset = parseInt(ChannelClip_playUrl[8]);
            ChannelClip_playUrl = ChannelClip_playUrl[0];

            ChannelClip_title = '';
            ChannelClip_createdAt = document.getElementById(Clip_ids[4] + Clip_cursorY + '_' + Clip_cursorX).textContent;
            ChannelClip_Duration = document.getElementById(Clip_ids[5] + Clip_cursorY + '_' + Clip_cursorX).textContent;
            ChannelClip_views = document.getElementById(Clip_ids[6] + Clip_cursorY + '_' + Clip_cursorX).textContent;
            ChannelClip_language = document.getElementById(Clip_ids[7] + Clip_cursorY + '_' + Clip_cursorX).textContent;
            ChannelClip_game = document.getElementById(Clip_ids[11] + Clip_cursorY + '_' + Clip_cursorX).innerHTML;
            Clip_openStream();
            break;
        case KEY_RED:
            Main_showSettings();
            break;
        case KEY_GREEN:
            Clip_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Clip_periodNumber++;
            if (Clip_periodNumber > 4) Clip_periodNumber = 1;
            Clip_SetPeriod();
            Clip_StartLoad();
            break;
        case KEY_BLUE:
            if (!Search_isSearching) Main_BeforeSearch = Main_Clip;
            Main_Go = Main_Search;
            Clip_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}

function Clip_openStream() {
    document.body.addEventListener("keydown", PlayClip_handleKeyDown, false);
    document.body.removeEventListener("keydown", Clip_handleKeyDown);
    Main_ShowElement('scene2');
    Play_hideChat();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_CleanHideExit();
    Main_HideElement('scene1');

    PlayClip_Start();
}