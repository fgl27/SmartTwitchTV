//Variable initialization
var Clip_cursorY = 0;
var Clip_cursorX = 0;
var Clip_dataEnded = false;
var Clip_itemsCount = 0;
var Clip_nameMatrix = [];
var Clip_blankCellVector = [];
var Clip_loadingData = false;
var Clip_loadingDataTry = 0;
var Clip_loadingDataTryMax = 10;
var Clip_loadingDataTimeout = 3500;
var Clip_blankCellCount = 0;
var Clip_ReplacedataEnded = false;
var Clip_MaxOffset = 0;
var Clip_emptyContent = false;
var Clip_ReplacedataTry = 0;

var Clip_ids = ['c_thumbdiv', 'c_img', 'c_infodiv', 'c_title', 'c_createdon', 'c_game', 'c_viwers', 'c_duration', 'c_cell', 'cpempty_', 'c_lang'];
var Clip_status = false;
var Clip_cursor = null;
var Clip_periodNumber = 2;
var Clip_period = 'week';
var Clip_itemsCountCheck = false;
//Variable initialization end

function Clip_init() {
    Main_Go = Main_Clip;
    Clip_SetPeriod();
    Main_AddClass('top_bar_clip', 'icon_center_focus');

    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    Main_IconLoad('label_controls', 'icon-calendar', STR_SWITCH_CLIP + ' (C)');

    document.body.addEventListener("keydown", Clip_handleKeyDown, false);
    Main_YRst(Clip_cursorY);
    if (Clip_status) {
        Main_ScrollHelper(Clip_ids[0], Clip_cursorY, Clip_cursorX, Main_Clip, Main_ScrollOffSetMinusVideo,
            Main_ScrollOffSetVideo, false);
        Main_CounterDialog(Clip_cursorX, Clip_cursorY, Main_ColoumnsCountVideo, Clip_itemsCount);
    } else Clip_StartLoad();
}

function Clip_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", Clip_handleKeyDown);
    Main_RemoveClass('top_bar_clip', 'icon_center_focus');

    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    Main_IconLoad('label_controls', 'icon-question-circle', STR_CONTROL_KEY);
}

function Clip_StartLoad() {
    Main_HideWarningDialog();
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    Clip_cursor = null;
    Clip_status = false;
    Main_empty('stream_table_clip');
    Clip_blankCellCount = 0;
    Clip_ReplacedataEnded = false;
    Clip_MaxOffset = 0;
    Clip_nameMatrix = [];
    Clip_blankCellVector = [];
    Clip_itemsCountCheck = false;
    Clip_itemsCount = 0;
    Clip_ReplacedataTry = 0;
    Clip_cursorX = 0;
    Clip_cursorY = 0;
    Clip_dataEnded = false;
    Main_CounterDialogRst();
    Clip_loadDataPrepare();
    Clip_loadDataRequest();
}

function Clip_loadDataPrepare() {
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
                } else {
                    Clip_loadDataError();
                }
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
        Clip_loadingDataTimeout += (Clip_loadingDataTry < 5) ? 250 : 3500;
        Clip_loadDataRequest();
    } else {
        Clip_loadingData = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function Clip_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.clips.length;
    var offset_itemsCount = Clip_itemsCount;

    Clip_cursor = response._cursor;

    // as response_items can be lower then Main_ItemsLimitVideo by 1 and still have more to load
    if (response_items === (Main_ItemsLimitVideo - 1)) {
        Clip_blankCellCount += 1;
        Clip_itemsCount += 1;
    } else if (response_items < Main_ItemsLimitVideo) Clip_dataEnded = true;

    Clip_itemsCount += response_items;

    Clip_emptyContent = !Clip_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, video,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.clips[cursor];
            if (Clip_CellExists(video.slug)) coloumn_id--;
            else {
                Clip_nameMatrix.push(video.slug);
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
                        '[' + video.language.toUpperCase() + ']', STR_DURATION + Play_timeS(video.duration)
                    ], Clip_ids));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (Clip_dataEnded && !Clip_itemsCountCheck) {
                Clip_itemsCountCheck = true;
                Clip_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(Clip_ids[9] + row_id + '_' + coloumn_id));
            Clip_blankCellVector.push(Clip_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_clip").appendChild(row);
    }

    Clip_loadDataSuccessFinish();
}

function Clip_CellExists(display_name) {
    for (var i = 0; i < Clip_nameMatrix.length; i++) {
        if (display_name === Clip_nameMatrix[i]) {
            Clip_blankCellCount++;
            return true;
        }
    }
    return false;
}

function Clip_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!Clip_status) {
            Main_HideLoadDialog();
            if (Clip_emptyContent) Main_showWarningDialog(STR_NO + STR_CLIPS);
            else {
                Clip_status = true;
                Clip_addFocus();
                Main_LazyImgStart(Clip_ids[1], 7, IMG_404_VIDEO, Main_ColoumnsCountVideo);
            }
        } else {
            if (Clip_blankCellCount > 0 && !Clip_dataEnded) {
                Clip_loadDataPrepare();
                Clip_loadDataReplace();
                return;
            } else {
                Clip_ReplacedataTry = 0;
                Clip_blankCellCount = 0;
                Clip_blankCellVector = [];
            }
        }
        Clip_loadingData = false;
    });
}

function Clip_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?limit=' + Clip_blankCellCount +
            '&period=' + encodeURIComponent(Clip_period) + '&cursor=' + encodeURIComponent(Clip_cursor) +
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
                }
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
        Clip_loadingDataTimeout += (Clip_loadingDataTry < 5) ? 250 : 3500;
        Clip_loadDataReplace();
    } else {
        Clip_ReplacedataEnded = true;
        Clip_blankCellCount = 0;
        Clip_blankCellVector = [];
        Clip_loadDataSuccessFinish();
    }
}

function Clip_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.clips.length;
    var video, index, cursor = 0;
    var tempVector = Clip_blankCellVector.slice();

    Clip_cursor = response._cursor;

    Clip_ReplacedataEnded = !response_items;

    for (var i = 0; i < Clip_blankCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.clips[cursor];
        if (Clip_CellExists(video.slug)) {
            Clip_blankCellCount--;
            i--;
        } else if (document.getElementById(Clip_blankCellVector[i]) !== null) {
            Clip_nameMatrix.push(video.slug);
            Vod_replaceVideo(Clip_blankCellVector[i],
                video.slug + ',' + video.duration + ',' + video.game + ',' + video.broadcaster.name +
                ',' + video.broadcaster.display_name + ',' +
                video.broadcaster.logo.replace("150x150", "300x300") +
                ',' + video.broadcaster.id + ',' +
                (video.vod !== null ? video.vod.id + ',' + video.vod.offset : null + ',' + null), [video.thumbnails.medium,
                    video.broadcaster.display_name,
                    STR_CREATED_AT + Main_videoCreatedAt(video.created_at),
                    video.title + STR_BR + STR_PLAYING + video.game,
                    Main_addCommas(video.views) + STR_VIEWS,
                    '[' + video.language.toUpperCase() + ']', STR_DURATION + Play_timeS(video.duration)
                ], Clip_ids);

            Clip_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) tempVector.splice(index, 1);
        }
    }

    if (Clip_ReplacedataTry > 1) {
        Clip_itemsCount -= Clip_blankCellCount;
        Clip_blankCellCount = 0;
        Clip_blankCellVector = [];
        Clip_ReplacedataEnded = true;
        Clip_dataEnded = true;
    } else Clip_ReplacedataTry++;

    if (Clip_ReplacedataEnded) {
        Clip_ReplacedataTry = 0;
        Clip_blankCellCount = 0;
        Clip_blankCellVector = [];
    } else Clip_blankCellVector = tempVector;

    Clip_loadDataSuccessFinish();
}

function Clip_addFocus() {
    Main_addFocusVideo(Clip_cursorY, Clip_cursorX, Clip_ids, Main_Clip, Main_ColoumnsCountVideo, Clip_itemsCount);

    if (Clip_cursorY > 2) Main_LazyImg(Clip_ids[1], Clip_cursorY, IMG_404_VIDEO, Main_ColoumnsCountVideo, 3);

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
    if (Clip_loadingData || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                if (Main_Before === Main_Clip) Main_Go = Main_Live;
                else Main_Go = Main_Before;
                Clip_exit();
                Main_SwitchScreen();
            }
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
            Sclip_playUrl = document.getElementById(Clip_ids[8] + Clip_cursorY + '_' + Clip_cursorX).getAttribute(Main_DataAttribute).split(',');
            Sclip_DurationSeconds = parseInt(Sclip_playUrl[1]);
            Play_gameSelected = Sclip_playUrl[2];
            Main_selectedChannel = Sclip_playUrl[3];
            Main_selectedChannelDisplayname = Sclip_playUrl[4];
            Main_selectedChannelLogo = Sclip_playUrl[5];
            Main_selectedChannel_id = Sclip_playUrl[6];
            Svod_vodId = Sclip_playUrl[7];
            Svod_vodOffset = parseInt(Sclip_playUrl[8]);
            Sclip_playUrl = Sclip_playUrl[0];

            Sclip_title = '';
            Sclip_createdAt = document.getElementById(Clip_ids[4] + Clip_cursorY + '_' + Clip_cursorX).textContent;
            Sclip_Duration = document.getElementById(Clip_ids[5] + Clip_cursorY + '_' + Clip_cursorX).textContent;
            Sclip_views = document.getElementById(Clip_ids[6] + Clip_cursorY + '_' + Clip_cursorX).textContent;
            Sclip_language = document.getElementById(Clip_ids[7] + Clip_cursorY + '_' + Clip_cursorX).textContent;
            Sclip_game = document.getElementById(Clip_ids[10] + Clip_cursorY + '_' + Clip_cursorX).innerHTML;
            Clip_openStream();
            break;
        case KEY_RED:
            Main_showAboutDialog();
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