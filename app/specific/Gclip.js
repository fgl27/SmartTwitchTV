//Variable initialization
var Gclip_cursorY = 0;
var Gclip_cursorX = 0;
var Gclip_dataEnded = false;
var Gclip_itemsCount = 0;
var Gclip_nameMatrix = [];
var Gclip_blankCellVector = [];
var Gclip_loadingData = false;
var Gclip_loadingDataTry = 0;
var Gclip_loadingDataTryMax = 10;
var Gclip_loadingDataTimeout = 3500;
var Gclip_blankCellCount = 0;
var Gclip_LastClickFinish = true;
var Gclip_keyClickDelayTime = 25;
var Gclip_ReplacedataEnded = false;
var Gclip_MaxOffset = 0;
var Gclip_emptyContent = false;

var Gclip_ids = ['gc_thumbdiv', 'gc_img', 'gc_infodiv', 'gc_title', 'gc_createdon', 'gc_game', 'gc_viwers', 'gc_duration', 'gc_cell', 'gcpempty_', 'gc_lang'];
var Gclip_status = false;
var Gclip_cursor = null;
var Gclip_periodNumber = 2;
var Gclip_period = 'week';
var Gclip_itemsCountCheck = false;
var Gclip_loadingMore = false;
var Gclip_OldgameSelected = '';
//Variable initialization end

function Gclip_init() {
    Main_Go = Main_Gclip;
    Gclip_SetPeriod();
    Main_AddClass('top_bar_game', 'icon_center_focus');

    Main_IconLoad('label_controls', 'icon-arrow-circle-left', STR_GOBACK);
    Main_IconLoad('label_switch', 'icon-calendar', STR_SWITCH_CLIP + STR_KEY_UP_DOWN);

    document.body.addEventListener("keydown", Gclip_handleKeyDown, false);
    Main_YRst(Gclip_cursorY);

    if (Gclip_OldgameSelected === Main_gameSelected && Gclip_status) {
        Main_ScrollHelper(Gclip_ids[0], Gclip_cursorY, Gclip_cursorX, Main_Gclip, Main_ScrollOffSetMinusVideo,
            Main_ScrollOffSetVideo, false);
        Main_CounterDialog(Gclip_cursorX, Gclip_cursorY, Main_ColoumnsCountVideo, Gclip_itemsCount);
    } else Gclip_StartLoad();
}

function Gclip_exit() {
    document.body.removeEventListener("keydown", Gclip_handleKeyDown);
    Main_RemoveClass('top_bar_game', 'icon_center_focus');
    document.getElementById('top_bar_game').innerHTML = STR_GAMES;

    Main_IconLoad('label_controls', 'icon-question-circle', STR_CONTROL_KEY);
    Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
}

function Gclip_StartLoad() {
    Gclip_OldgameSelected = Main_gameSelected;
    Main_HideWarningDialog();
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    Gclip_cursor = null;
    Gclip_status = false;
    Main_empty('stream_table_gclip');
    Gclip_loadingMore = false;
    Gclip_blankCellCount = 0;
    Gclip_ReplacedataEnded = false;
    Gclip_MaxOffset = 0;
    Gclip_nameMatrix = [];
    Gclip_blankCellVector = [];
    Gclip_itemsCountCheck = false;
    Gclip_itemsCount = 0;
    Gclip_cursorX = 0;
    Gclip_cursorY = 0;
    Gclip_dataEnded = false;
    Main_CounterDialogRst();
    Gclip_loadDataPrepare();
    Gclip_loadDataRequest();
}

function Gclip_loadDataPrepare() {
    Gclip_loadingData = true;
    Gclip_loadingDataTry = 0;
    Gclip_loadingDataTimeout = 3500;
}

function Gclip_SetPeriod() {
    if (Gclip_periodNumber === 1) {
        document.getElementById('top_bar_game').innerHTML = STR_AGAME + Main_UnderCenter(STR_CLIPS +
            STR_CLIP_DAY + ': ' + Main_gameSelected);
        Gclip_period = 'day';
    } else if (Gclip_periodNumber === 2) {
        document.getElementById('top_bar_game').innerHTML = STR_AGAME + Main_UnderCenter(STR_CLIPS +
            STR_CLIP_WEEK + ': ' + Main_gameSelected);
        Gclip_period = 'week';
    } else if (Gclip_periodNumber === 3) {
        document.getElementById('top_bar_game').innerHTML = STR_AGAME + Main_UnderCenter(STR_CLIPS +
            STR_CLIP_MONTH + ': ' + Main_gameSelected);
        Gclip_period = 'month';
    } else if (Gclip_periodNumber === 4) {
        document.getElementById('top_bar_game').innerHTML = STR_AGAME + Main_UnderCenter(STR_CLIPS +
            STR_CLIP_ALL + ': ' + Main_gameSelected);
        Gclip_period = 'all';
    }
    localStorage.setItem('Gclip_periodNumber', Gclip_periodNumber);
}

function Gclip_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?game=' +
            encodeURIComponent(Main_gameSelected) + '&limit=' + Main_ItemsLimitVideo +
            '&period=' + encodeURIComponent(Gclip_period) +
            (Gclip_cursor === null ? '' : '&cursor=' + encodeURIComponent(Gclip_cursor)) + '&' +
            Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Gclip_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Gclip_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    Gclip_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Gclip_loadDataError();
    }
}

function Gclip_loadDataError() {
    Gclip_loadingDataTry++;
    if (Gclip_loadingDataTry < Gclip_loadingDataTryMax) {
        Gclip_loadingDataTimeout += (Gclip_loadingDataTry < 5) ? 250 : 3500;
        Gclip_loadDataRequest();
    } else {
        Gclip_loadingData = false;
        Gclip_loadingMore = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function Gclip_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.clips.length;
    Gclip_cursor = response._cursor;

    if (response_items < Main_ItemsLimitVideo) Gclip_dataEnded = true;

    var offset_itemsCount = Gclip_itemsCount;
    Gclip_itemsCount += response_items;

    Gclip_emptyContent = !Gclip_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, video,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.clips[cursor];
            if (Gclip_CellExists(video.slug)) coloumn_id--;
            else {
                Gclip_nameMatrix.push(video.slug);
                row.appendChild(Vod_createCell(row_id, row_id + '_' + coloumn_id,
                    video.slug + ',' +
                    video.duration + ',' + video.game + ',' + video.broadcaster.name +
                    ',' + video.broadcaster.display_name + ',' +
                    video.broadcaster.logo.replace("150x150", "300x300") +
                    ',' + video.broadcaster.id, [video.thumbnails.medium, video.broadcaster.display_name,
                        STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                        video.title + STR_BR + STR_PLAYING + video.game,
                        Main_addCommas(video.views) + STR_VIEWS,
                        '[' + video.language.toUpperCase() + ']', STR_DURATION + Play_timeS(video.duration)
                    ], Gclip_ids));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (Gclip_dataEnded && !Gclip_itemsCountCheck) {
                Gclip_itemsCountCheck = true;
                Gclip_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(Gclip_ids[9] + row_id + '_' + coloumn_id));
            Gclip_blankCellVector.push(Gclip_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_gclip").appendChild(row);
    }

    Gclip_loadDataSuccessFinish();
}

function Gclip_CellExists(display_name) {
    for (var i = 0; i < Gclip_nameMatrix.length; i++) {
        if (display_name === Gclip_nameMatrix[i]) {
            Gclip_blankCellCount++;
            return true;
        }
    }
    return false;
}

function Gclip_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!Gclip_status) {
            Main_HideLoadDialog();
            if (Gclip_emptyContent) Main_showWarningDialog(STR_NO + STR_CLIPS);
            else {
                Gclip_status = true;
                Gclip_addFocus();
                Main_LazyImgStart(Gclip_ids[1], 9, IMG_404_VIDEO, Main_ColoumnsCountVideo);
            }
            Gclip_loadingData = false;
        } else {
            if (Gclip_blankCellCount > 0 && !Gclip_dataEnded) {
                Gclip_loadingMore = true;
                Gclip_loadDataPrepare();
                Gclip_loadDataReplace();
                return;
            } else {
                Gclip_blankCellCount = 0;
                Gclip_blankCellVector = [];
            }

            Gclip_loadingData = false;
            Gclip_loadingMore = false;
        }
    });
}

function Gclip_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?game=' +
            encodeURIComponent(Main_gameSelected) + '&limit=' + Main_ItemsLimitVideo +
            '&period=' + encodeURIComponent(Gclip_period) +
            (Gclip_cursor === null ? '' : '&cursor=' + encodeURIComponent(Gclip_cursor)) + '&' +
            Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Gclip_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Gclip_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Gclip_loadDataErrorReplace();
    }
}

function Gclip_loadDataErrorReplace() {
    Gclip_loadingDataTry++;
    if (Gclip_loadingDataTry < Gclip_loadingDataTryMax) {
        Gclip_loadingDataTimeout += (Gclip_loadingDataTry < 5) ? 250 : 3500;
        Gclip_loadDataReplace();
    } else {
        Gclip_ReplacedataEnded = true;
        Gclip_blankCellCount = 0;
        Gclip_blankCellVector = [];
        Gclip_loadDataSuccessFinish();
    }
}

function Gclip_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.clips.length;
    var video, index, cursor = 0;
    var tempVector = Gclip_blankCellVector.slice();

    Gclip_cursor = response._cursor;

    if (response_items < Gclip_blankCellCount) Gclip_ReplacedataEnded = true;

    for (var i = 0; i < Gclip_blankCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.clips[cursor];
        if (Gclip_CellExists(video.slug)) {
            Gclip_blankCellCount--;
            i--;
        } else {
            Gclip_nameMatrix.push(video.slug);
            Vod_replaceVideo(Gclip_blankCellVector[i],
                video.slug + ',' +
                video.duration + ',' + video.game + ',' + video.broadcaster.name +
                ',' + video.broadcaster.display_name + ',' +
                video.broadcaster.logo.replace("150x150", "300x300") +
                ',' + video.broadcaster.id, [video.thumbnails.medium, video.broadcaster.display_name,
                    STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                    video.title + STR_BR + STR_PLAYING + video.game,
                    Main_addCommas(video.views) + STR_VIEWS,
                    '[' + video.language.toUpperCase() + ']', STR_DURATION + Play_timeS(video.duration)
                ], Gclip_ids);

            Gclip_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) tempVector.splice(index, 1);
        }
    }

    if (Gclip_ReplacedataEnded) {
        Gclip_blankCellCount = 0;
        Gclip_blankCellVector = [];
    } else Gclip_blankCellVector = tempVector;

    Gclip_loadDataSuccessFinish();
}

function Gclip_addFocus() {
    Main_addFocusVideo(Gclip_cursorY, Gclip_cursorX, Gclip_ids, Main_Gclip, Main_ColoumnsCountVideo, Gclip_itemsCount);

    if (Gclip_cursorY > 3) Main_LazyImg(Gclip_ids[1], Gclip_cursorY, IMG_404_VIDEO, Main_ColoumnsCountVideo, 4);

    if (((Gclip_cursorY + Main_ItemsReloadLimitVideo) > (Gclip_itemsCount / Main_ColoumnsCountVideo)) &&
        !Gclip_dataEnded && !Gclip_loadingMore) {
        Gclip_loadingMore = true;
        Gclip_loadDataPrepare();
        Gclip_loadDataRequest();
    }
}

function Gclip_removeFocus() {
    Main_removeFocus(Gclip_cursorY + '_' + Gclip_cursorX, Gclip_ids);
}

function Gclip_keyClickDelay() {
    Gclip_LastClickFinish = true;
}

function Gclip_handleKeyDown(event) {
    if (Gclip_loadingData && !Gclip_loadingMore) {
        event.preventDefault();
        return;
    } else if (!Gclip_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Gclip_LastClickFinish = false;
        window.setTimeout(Gclip_keyClickDelay, Gclip_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Main_Go = Main_aGame;
                Gclip_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((Gclip_cursorY), (Gclip_cursorX - 1), Gclip_ids[0])) {
                Gclip_removeFocus();
                Gclip_cursorX--;
                Gclip_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((Gclip_cursorY - 1), i, Gclip_ids[0])) {
                        Gclip_removeFocus();
                        Gclip_cursorY--;
                        Gclip_cursorX = i;
                        Gclip_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((Gclip_cursorY), (Gclip_cursorX + 1), Gclip_ids[0])) {
                Gclip_removeFocus();
                Gclip_cursorX++;
                Gclip_addFocus();
            } else if (Main_ThumbNull((Gclip_cursorY + 1), 0, Gclip_ids[0])) {
                Gclip_removeFocus();
                Gclip_cursorY++;
                Gclip_cursorX = 0;
                Gclip_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((Gclip_cursorY - 1), (Gclip_cursorX - i), Gclip_ids[0])) {
                    Gclip_removeFocus();
                    Gclip_cursorY--;
                    Gclip_cursorX = Gclip_cursorX - i;
                    Gclip_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((Gclip_cursorY + 1), (Gclip_cursorX - i), Gclip_ids[0])) {
                    Gclip_removeFocus();
                    Gclip_cursorY++;
                    Gclip_cursorX = Gclip_cursorX - i;
                    Gclip_addFocus();
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            Gclip_StartLoad();
            break;
        case KEY_CHANNELUP:
            if (!Gclip_loadingMore) {
                Gclip_periodNumber++;
                if (Gclip_periodNumber > 4) Gclip_periodNumber = 1;
                Gclip_SetPeriod();
                Gclip_StartLoad();
            }
            break;
        case KEY_CHANNELDOWN:
            if (!Gclip_loadingMore) {
                Gclip_periodNumber--;
                if (Gclip_periodNumber < 1) Gclip_periodNumber = 4;
                Gclip_SetPeriod();
                Gclip_StartLoad();
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Sclip_playUrl = document.getElementById(Gclip_ids[8] + Gclip_cursorY + '_' + Gclip_cursorX).getAttribute(Main_DataAttribute).split(',');
            SGclip_DurationSeconds = parseInt(Sclip_playUrl[1]);
            Main_gameSelected = Sclip_playUrl[2];
            Main_selectedChannel = Sclip_playUrl[3];
            Main_selectedChannelDisplayname = Sclip_playUrl[4];
            Main_selectedChannelLogo = Sclip_playUrl[5];
            Main_selectedChannel_id = Sclip_playUrl[6];
            Sclip_playUrl = Sclip_playUrl[0];

            Sclip_title = '';
            Sclip_createdAt = document.getElementById(Gclip_ids[4] + Gclip_cursorY + '_' + Gclip_cursorX).textContent;
            Sclip_Duration = document.getElementById(Gclip_ids[5] + Gclip_cursorY + '_' + Gclip_cursorX).textContent;
            Sclip_views = document.getElementById(Gclip_ids[6] + Gclip_cursorY + '_' + Gclip_cursorX).textContent;
            Sclip_language = document.getElementById(Gclip_ids[7] + Gclip_cursorY + '_' + Gclip_cursorX).textContent;
            Sclip_game = document.getElementById(Gclip_ids[10] + Gclip_cursorY + '_' + Gclip_cursorX).innerHTML;
            Gclip_openStream();
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            Gclip_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            if (!Search_isSearching) Main_BeforeSearch = Main_Gclip;
            Main_Go = Main_Search;
            Gclip_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}

function Gclip_openStream() {
    document.body.addEventListener("keydown", PlayClip_handleKeyDown, false);
    document.body.removeEventListener("keydown", Gclip_handleKeyDown);
    Main_ShowElement('scene2');
    Play_hideChat();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_CleanHideExit();
    Main_HideElement('scene1');

    PlayClip_Start();
}