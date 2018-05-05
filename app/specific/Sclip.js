//Variable initialization
var Sclip_cursorY = 0;
var Sclip_cursorX = 0;
var Sclip_dataEnded = false;
var Sclip_itemsCount = 0;
var Sclip_nameMatrix = [];
var Sclip_blankCellVector = [];
var Sclip_loadingData = false;
var Sclip_loadingDataTry = 0;
var Sclip_loadingDataTryMax = 10;
var Sclip_loadingDataTimeout = 3500;
var Sclip_blankCellCount = 0;
var Sclip_LastClickFinish = true;
var Sclip_keyClickDelayTime = 25;
var Sclip_ReplacedataEnded = false;
var Sclip_MaxOffset = 0;
var Sclip_DurationSeconds = 0;
var Sclip_emptyContent = false;

var Sclip_ids = ['sp_thumbdiv', 'sp_img', 'sp_infodiv', 'sp_title', 'sp_createdon', 'sp_game', 'sp_viwers', 'sp_duration', 'sp_cell', 'spempty_'];
var Sclip_status = false;
var Sclip_cursor = null;
var Sclip_periodNumber = 2;
var Sclip_period = 'week';
var Sclip_Duration = 0;
var Sclip_game = '';
var Sclip_views = '';
var Sclip_title = '';
var Sclip_lastselectedChannel = '';
var Sclip_playUrl = '';
var Sclip_createdAt = '';
var Sclip_itemsCountCheck = false;
var Sclip_loadingMore = false;
//Variable initialization end

function Sclip_init() {
    Main_Go = Main_Sclip;
    if (Main_selectedChannel !== Sclip_lastselectedChannel) Sclip_status = false;
    Main_cleanTopLabel();
    Sclip_SetPeriod();
    document.getElementById('top_bar_user').innerHTML = Main_selectedChannelDisplayname;
    Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH_CLIP + STR_KEY_UP_DOWN);
    document.body.addEventListener("keydown", Sclip_handleKeyDown, false);
    Main_YRst(Sclip_cursorY);
    if (Sclip_status) {
        Main_ScrollHelper(Sclip_ids[0], Sclip_cursorY, Sclip_cursorX, Main_Sclip, Main_ScrollOffSetMinusVideo,
            Main_ScrollOffSetVideo, false);
        Main_CounterDialog(Sclip_cursorX, Sclip_cursorY, Main_ColoumnsCountVideo, Sclip_itemsCount);
    } else Sclip_StartLoad();
}

function Sclip_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", Sclip_handleKeyDown);
}

function Sclip_StartLoad() {
    Main_HideWarningDialog();
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    Sclip_lastselectedChannel = Main_selectedChannel;
    Sclip_cursor = null;
    Sclip_status = false;
    Main_empty('stream_table_search_clip');
    Sclip_loadingMore = false;
    Sclip_blankCellCount = 0;
    Sclip_ReplacedataEnded = false;
    Sclip_MaxOffset = 0;
    Sclip_nameMatrix = [];
    Sclip_blankCellVector = [];
    Sclip_itemsCountCheck = false;
    Sclip_itemsCount = 0;
    Sclip_cursorX = 0;
    Sclip_cursorY = 0;
    Sclip_dataEnded = false;
    Main_CounterDialogRst();
    Sclip_loadDataPrepare();
    Sclip_loadDataRequest();
}

function Sclip_loadDataPrepare() {
    Sclip_loadingData = true;
    Sclip_loadingDataTry = 0;
    Sclip_loadingDataTimeout = 3500;
}

function Sclip_SetPeriod() {
    if (Sclip_periodNumber === 1) {
        document.getElementById('top_bar_game').innerHTML = STR_CLIPS + STR_CLIP_DAY;
        Sclip_period = 'day';
    } else if (Sclip_periodNumber === 2) {
        document.getElementById('top_bar_game').innerHTML = STR_CLIPS + STR_CLIP_WEEK;
        Sclip_period = 'week';
    } else if (Sclip_periodNumber === 3) {
        document.getElementById('top_bar_game').innerHTML = STR_CLIPS + STR_CLIP_MONTH;
        Sclip_period = 'month';
    } else if (Sclip_periodNumber === 4) {
        document.getElementById('top_bar_game').innerHTML = STR_CLIPS + STR_CLIP_ALL;
        Sclip_period = 'all';
    }
    localStorage.setItem('sclip_periodNumber', Sclip_periodNumber);
}

function Sclip_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?channel=' + encodeURIComponent(Main_selectedChannel) + '&limit=' +
            Main_ItemsLimitVideo + '&period=' + encodeURIComponent(Sclip_period) +
            (Sclip_cursor === null ? '' : '&cursor=' + encodeURIComponent(Sclip_cursor)) + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = Sclip_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Sclip_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    Sclip_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Sclip_loadDataError();
    }
}

function Sclip_loadDataError() {
    Sclip_loadingDataTry++;
    if (Sclip_loadingDataTry < Sclip_loadingDataTryMax) {
        Sclip_loadingDataTimeout += (Sclip_loadingDataTry < 5) ? 250 : 3500;
        Sclip_loadDataRequest();
    } else {
        Sclip_loadingData = false;
        Sclip_loadingMore = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function Sclip_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.clips.length;
    Sclip_cursor = response._cursor;

    if (response_items < Main_ItemsLimitVideo) Sclip_dataEnded = true;

    var offset_itemsCount = Sclip_itemsCount;
    Sclip_itemsCount += response_items;

    Sclip_emptyContent = !Sclip_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, video,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.clips[cursor];
            if (Sclip_CellExists(video.tracking_id)) coloumn_id--;
            else {
                row.appendChild(Sclip_createCell(row_id, row_id + '_' + coloumn_id,
                    video.thumbnails.medium.split('-preview')[0] + '.mp4' + video.duration, [video.thumbnails.medium,
                        video.title, STR_STREAM_ON + Main_videoCreatedAt(video.created_at), video.game,
                        Main_addCommas(video.views) + STR_VIEWS, STR_DURATION + Play_timeS(video.duration)
                    ]));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (Sclip_dataEnded && !Sclip_itemsCountCheck) {
                Sclip_itemsCountCheck = true;
                Sclip_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(Sclip_ids[9] + row_id + '_' + coloumn_id));
            Sclip_blankCellVector.push(Sclip_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_search_clip").appendChild(row);
    }

    Sclip_loadDataSuccessFinish();
}

function Sclip_createCell(row_id, id, clip_id, valuesArray) {
    Sclip_nameMatrix.push(clip_id);
    if (row_id < Main_ColoumnsCountVideo) Main_PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return Sclip_createCellVideo(clip_id, id, valuesArray);
}

function Sclip_createCellVideo(clip_id, id, valuesArray) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', Sclip_ids[8] + id);
    Main_td.setAttribute(Main_DataAttribute, clip_id);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = Sclip_VideoHtml(id, Sclip_ids, valuesArray);

    return Main_td;
}

function Sclip_replaceVideo(id, clip_id, valuesArray) {
    var splitedId = id.split(Sclip_ids[9])[1];
    id = document.getElementById(id);
    id.setAttribute(Main_DataAttribute, clip_id);
    id.innerHTML = Main_VideoHtml(splitedId, Live_ids, valuesArray);
    id.setAttribute('id', Sclip_ids[8] + splitedId);
}

function Sclip_VideoHtml(id, Sclip_ids, valuesArray) {
    return '<div id="' + Sclip_ids[0] + id + '" class="stream_thumbnail_video" >' +
        '<img id="' + Sclip_ids[1] + id + '" class="stream_img" data-src="' + valuesArray[0] + '"></div>' +
        '<div id="' + Sclip_ids[2] + id + '" class="stream_text">' +
        '<div id="' + Sclip_ids[3] + id + '" class="stream_info" style="font-size: 155%;">' + valuesArray[1] + '</div>' +
        '<div id="' + Sclip_ids[4] + id + '"class="stream_info" style="width: 59%; display: inline-block;">' + valuesArray[2] + '</div>' +
        '<div id="' + Sclip_ids[7] + id + '"class="stream_info" style="width:39%; float: right; text-align: right; display: inline-block;">' +
        valuesArray[5] + '</div>' +
        '<div id="' + Sclip_ids[5] + id + '"class="stream_info">' + STR_PLAYING + valuesArray[3] + '</div>' +
        '<div id="' + Sclip_ids[6] + id + '"class="stream_info">' + valuesArray[4] + '</div>' + '</div>';
}

function Sclip_CellExists(display_name) {
    for (var i = 0; i < Sclip_nameMatrix.length; i++) {
        if (display_name === Sclip_nameMatrix[i]) {
            Sclip_blankCellCount++;
            return true;
        }
    }
    return false;
}

function Sclip_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!Sclip_status) {
            Main_HideLoadDialog();
            if (Sclip_emptyContent) Main_showWarningDialog(STR_NO + STR_CLIPS);
            else {
                Sclip_status = true;
                Sclip_addFocus();
                Main_LazyImgStart(Sclip_ids[1], 9, IMG_404_VIDEO, Main_ColoumnsCountVideo);
            }
            Sclip_loadingData = false;
        } else {
            if (Sclip_blankCellCount > 0 && !Sclip_dataEnded) {
                Sclip_loadingMore = true;
                Sclip_loadDataPrepare();
                Sclip_loadDataReplace();
                return;
            } else {
                Sclip_blankCellCount = 0;
                Sclip_blankCellVector = [];
            }

            Sclip_loadingData = false;
            Sclip_loadingMore = false;
        }
    });
}

function Sclip_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?channel=' + encodeURIComponent(Main_selectedChannel) + '&limit=' +
            Sclip_blankCellCount + '&period=' + Sclip_period + (Sclip_cursor === null ? '' : '&cursor=' + encodeURIComponent(Sclip_cursor)) +
            '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = Sclip_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Sclip_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Sclip_loadDataErrorReplace();
    }
}

function Sclip_loadDataErrorReplace() {
    Sclip_loadingDataTry++;
    if (Sclip_loadingDataTry < Sclip_loadingDataTryMax) {
        Sclip_loadingDataTimeout += (Sclip_loadingDataTry < 5) ? 250 : 3500;
        Sclip_loadDataReplace();
    } else {
        Sclip_ReplacedataEnded = true;
        Sclip_blankCellCount = 0;
        Sclip_blankCellVector = [];
        Sclip_loadDataSuccessFinish();
    }
}

function Sclip_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.clips.length;
    var video, index, cursor = 0;
    var tempVector = Sclip_blankCellVector.slice();

    Sclip_cursor = response._cursor;

    if (response_items < Sclip_blankCellCount) Sclip_ReplacedataEnded = true;

    for (var i = 0; i < Sclip_blankCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.clips[cursor];
        if (Sclip_CellExists(video.tracking_id)) {
            Sclip_blankCellCount--;
            i--;
        } else {
            Sclip_replaceVideo(Sclip_blankCellVector[i], video.thumbnails.medium.split('-preview')[0] + '.mp4', [video.thumbnails.medium,
                video.title, video.game, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                Main_addCommas(video.views) + STR_VIEWER, STR_DURATION + Play_timeS(video.duration)
            ]);

            Sclip_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) tempVector.splice(index, 1);
        }
    }

    if (Sclip_ReplacedataEnded) {
        Sclip_blankCellCount = 0;
        Sclip_blankCellVector = [];
    } else Sclip_blankCellVector = tempVector;

    Sclip_loadDataSuccessFinish();
}

function Sclip_addFocus() {
    document.getElementById(Sclip_ids[0] + Sclip_cursorY + '_' + Sclip_cursorX).classList.add('stream_thumbnail_focused');
    document.getElementById(Sclip_ids[2] + Sclip_cursorY + '_' + Sclip_cursorX).classList.add('stream_text_focused');
    document.getElementById(Sclip_ids[3] + Sclip_cursorY + '_' + Sclip_cursorX).classList.add('stream_info_focused');
    document.getElementById(Sclip_ids[4] + Sclip_cursorY + '_' + Sclip_cursorX).classList.add('stream_info_focused');
    document.getElementById(Sclip_ids[5] + Sclip_cursorY + '_' + Sclip_cursorX).classList.add('stream_info_focused');
    document.getElementById(Sclip_ids[6] + Sclip_cursorY + '_' + Sclip_cursorX).classList.add('stream_info_focused');
    document.getElementById(Sclip_ids[7] + Sclip_cursorY + '_' + Sclip_cursorX).classList.add('stream_info_focused');

    window.setTimeout(function() {
        Main_ScrollHelper(Sclip_ids[0], Sclip_cursorY, Sclip_cursorX, Main_Sclip, Main_ScrollOffSetMinusVideo, Main_ScrollOffSetVideo, false);
    }, 10);

    Main_CounterDialog(Sclip_cursorX, Sclip_cursorY, Main_ColoumnsCountVideo, Sclip_itemsCount);

    if (Sclip_cursorY > 3) Main_LazyImg(Sclip_ids[1], Sclip_cursorY, IMG_404_VIDEO, Main_ColoumnsCountVideo, 4);

    if (((Sclip_cursorY + Main_ItemsReloadLimitVideo) > (Sclip_itemsCount / Main_ColoumnsCountVideo)) &&
        !Sclip_dataEnded && !Sclip_loadingMore) {
        Sclip_loadingMore = true;
        Sclip_loadDataPrepare();
        Sclip_loadDataRequest();
    }
}

function Sclip_removeFocus() {
    document.getElementById(Sclip_ids[0] + Sclip_cursorY + '_' + Sclip_cursorX).classList.remove('stream_thumbnail_focused');
    document.getElementById(Sclip_ids[2] + Sclip_cursorY + '_' + Sclip_cursorX).classList.remove('stream_text_focused');
    document.getElementById(Sclip_ids[3] + Sclip_cursorY + '_' + Sclip_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Sclip_ids[4] + Sclip_cursorY + '_' + Sclip_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Sclip_ids[5] + Sclip_cursorY + '_' + Sclip_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Sclip_ids[6] + Sclip_cursorY + '_' + Sclip_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Sclip_ids[7] + Sclip_cursorY + '_' + Sclip_cursorX).classList.remove('stream_info_focused');
}

function Sclip_keyClickDelay() {
    Sclip_LastClickFinish = true;
}

function Sclip_handleKeyDown(event) {
    if (Sclip_loadingData && !Sclip_loadingMore) {
        event.preventDefault();
        return;
    } else if (!Sclip_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Sclip_LastClickFinish = false;
        window.setTimeout(Sclip_keyClickDelay, Sclip_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Main_Go = Main_SChannelContent;
                Sclip_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((Sclip_cursorY), (Sclip_cursorX - 1), Sclip_ids[0])) {
                Sclip_removeFocus();
                Sclip_cursorX--;
                Sclip_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((Sclip_cursorY - 1), i, Sclip_ids[0])) {
                        Sclip_removeFocus();
                        Sclip_cursorY--;
                        Sclip_cursorX = i;
                        Sclip_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((Sclip_cursorY), (Sclip_cursorX + 1), Sclip_ids[0])) {
                Sclip_removeFocus();
                Sclip_cursorX++;
                Sclip_addFocus();
            } else if (Main_ThumbNull((Sclip_cursorY + 1), 0, Sclip_ids[0])) {
                Sclip_removeFocus();
                Sclip_cursorY++;
                Sclip_cursorX = 0;
                Sclip_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((Sclip_cursorY - 1), (Sclip_cursorX - i), Sclip_ids[0])) {
                    Sclip_removeFocus();
                    Sclip_cursorY--;
                    Sclip_cursorX = Sclip_cursorX - i;
                    Sclip_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((Sclip_cursorY + 1), (Sclip_cursorX - i), Sclip_ids[0])) {
                    Sclip_removeFocus();
                    Sclip_cursorY++;
                    Sclip_cursorX = Sclip_cursorX - i;
                    Sclip_addFocus();
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
        case KEY_CHANNELUP:
            if (!Sclip_loadingMore) {
                Sclip_periodNumber++;
                if (Sclip_periodNumber > 4) Sclip_periodNumber = 1;
                Sclip_SetPeriod();
                Sclip_StartLoad();
            }
            break;
        case KEY_CHANNELDOWN:
            if (!Sclip_loadingMore) {
                Sclip_periodNumber--;
                if (Sclip_periodNumber < 1) Sclip_periodNumber = 4;
                Sclip_SetPeriod();
                Sclip_StartLoad();
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Sclip_playUrl = document.getElementById(Sclip_ids[8] + Sclip_cursorY + '_' + Sclip_cursorX).getAttribute(Main_DataAttribute).split('.mp4');
            Sclip_DurationSeconds = parseInt(Sclip_playUrl[1]);
            Sclip_playUrl = Sclip_playUrl[0] + '.mp4';

            Sclip_Duration = document.getElementById(Sclip_ids[7] + Sclip_cursorY + '_' + Sclip_cursorX).textContent;
            Sclip_views = document.getElementById(Sclip_ids[6] + Sclip_cursorY + '_' + Sclip_cursorX).textContent;
            Sclip_title = document.getElementById(Sclip_ids[3] + Sclip_cursorY + '_' + Sclip_cursorX).textContent;
            Sclip_createdAt = document.getElementById(Sclip_ids[4] + Sclip_cursorY + '_' + Sclip_cursorX).textContent;
            Sclip_game = document.getElementById(Sclip_ids[5] + Sclip_cursorY + '_' + Sclip_cursorX).textContent;
            Sclip_openStream();
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            Sclip_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            if (!Search_isSearching) Main_BeforeSearch = Main_Sclip;
            Main_Go = Main_Search;
            Sclip_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}

function Sclip_openStream() {
    document.body.addEventListener("keydown", PlayClip_handleKeyDown, false);
    document.body.removeEventListener("keydown", Sclip_handleKeyDown);
    document.getElementById('scene2').classList.remove('hide');
    Play_hideChat();
    Play_clearPause();
    Play_HideWarningDialog();
    document.getElementById('scene_channel_panel').classList.add('hide');
    Play_CleanHideExit();
    document.getElementById('scene1').classList.add('hide');

    PlayClip_Start();
}