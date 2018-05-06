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
var Clip_LastClickFinish = true;
var Clip_keyClickDelayTime = 25;
var Clip_ReplacedataEnded = false;
var Clip_MaxOffset = 0;
var Clip_emptyContent = false;

var Clip_ids = ['c_thumbdiv', 'c_img', 'c_infodiv', 'c_title', 'c_createdon', 'c_game', 'c_viwers', 'c_duration', 'c_cell', 'cpempty_', 'c_lang'];
var Clip_status = false;
var Clip_cursor = null;
var Clip_periodNumber = 2;
var Clip_period = 'week';
var Clip_lastselectedChannel = '';
var Clip_itemsCountCheck = false;
var Clip_loadingMore = false;
//Variable initialization end

function Clip_init() {
    Main_Go = Main_Clip;
    Clip_SetPeriod();
    document.getElementById('top_bar_clip').classList.add('icon_center_focus');

    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ' (C)');
    Main_IconLoad('label_controls', 'icon-switch', STR_SWITCH_CLIP + STR_GUIDE);

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
    document.getElementById('top_bar_clip').classList.remove('icon_center_focus');

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
    Clip_loadingMore = false;
    Clip_blankCellCount = 0;
    Clip_ReplacedataEnded = false;
    Clip_MaxOffset = 0;
    Clip_nameMatrix = [];
    Clip_blankCellVector = [];
    Clip_itemsCountCheck = false;
    Clip_itemsCount = 0;
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
        document.getElementById('top_bar_clip').innerHTML = STR_CLIPS + Main_UnderCenter(STR_CLIP_DAY);
        Clip_period = 'day';
    } else if (Clip_periodNumber === 2) {
        document.getElementById('top_bar_clip').innerHTML = STR_CLIPS + Main_UnderCenter(STR_CLIP_WEEK);
        Clip_period = 'week';
    } else if (Clip_periodNumber === 3) {
        document.getElementById('top_bar_clip').innerHTML = STR_CLIPS + Main_UnderCenter(STR_CLIP_MONTH);
        Clip_period = 'month';
    } else if (Clip_periodNumber === 4) {
        document.getElementById('top_bar_clip').innerHTML = STR_CLIPS + Main_UnderCenter(STR_CLIP_ALL);
        Clip_period = 'all';
    }
    localStorage.setItem('Clip_periodNumber', Clip_periodNumber);
}

function Clip_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?limit=' + Main_ItemsLimitVideo +
            '&period=' + encodeURIComponent(Clip_period) +
            (Sclip_cursor === null ? '' : '&cursor=' + encodeURIComponent(Sclip_cursor)) +
            '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Clip_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
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
        Clip_loadingMore = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function Clip_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.clips.length;
    Clip_cursor = response._cursor;

    if (response_items < Main_ItemsLimitVideo) Clip_dataEnded = true;

    var offset_itemsCount = Clip_itemsCount;
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
            if (Clip_CellExists(video.tracking_id)) coloumn_id--;
            else {
                row.appendChild(Clip_createCell(row_id, row_id + '_' + coloumn_id,
                    video.thumbnails.medium.split('-preview')[0] + '.mp4' + ',' +
                    video.duration + ',' + video.game + ',' + video.broadcaster.name +
                    ',' + video.broadcaster.display_name + ',' +
                    video.broadcaster.logo.replace("150x150", "300x300") +
                    ',' + video.broadcaster.id, [video.thumbnails.medium, video.broadcaster.display_name,
                        STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                        video.title + STR_BR + STR_PLAYING + video.game,
                        Main_addCommas(video.views) + STR_VIEWS, STR_DURATION + Play_timeS(video.duration),
                        '[' + video.language.toUpperCase() + ']'
                    ]));
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

function Clip_createCell(row_id, id, clip_id, valuesArray) {
    Clip_nameMatrix.push(clip_id);
    if (row_id < Main_ColoumnsCountVideo) Main_PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return Clip_createCellVideo(clip_id, id, valuesArray);
}

function Clip_createCellVideo(clip_id, id, valuesArray) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', Clip_ids[8] + id);
    Main_td.setAttribute(Main_DataAttribute, clip_id);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = Clip_VideoHtml(id, Clip_ids, valuesArray);

    return Main_td;
}

function Clip_replaceVideo(id, clip_id, valuesArray) {
    var splitedId = id.split(Clip_ids[9])[1];
    id = document.getElementById(id);
    id.setAttribute(Main_DataAttribute, clip_id);
    id.innerHTML = Main_VideoHtml(splitedId, Live_ids, valuesArray);
    id.setAttribute('id', Clip_ids[8] + splitedId);
}

function Clip_VideoHtml(id, Clip_ids, valuesArray) {
    return '<div id="' + Clip_ids[0] + id + '" class="stream_thumbnail_video" >' +
        '<img id="' + Clip_ids[1] + id + '" class="stream_img" data-src="' + valuesArray[0] + '"></div>' +
        '<div id="' + Clip_ids[2] + id + '" class="stream_text">' +
        '<div id="' + Clip_ids[3] + id + '" class="stream_info" style="width: 72%; display: inline-block; font-size: 155%;">' + valuesArray[1] + '</div>' +
        '<div id="' + Clip_ids[10] + id + '"class="stream_info" style="width:27%; float: right; text-align: right; display: inline-block;">' +
        valuesArray[6] + '</div>' +
        '<div id="' + Clip_ids[4] + id + '"class="stream_info" style="width: 59%; display: inline-block;">' + valuesArray[2] + '</div>' +
        '<div id="' + Clip_ids[7] + id + '"class="stream_info" style="width:39%; float: right; text-align: right; display: inline-block;">' +
        valuesArray[5] + '</div>' +
        '<div id="' + Clip_ids[5] + id + '"class="stream_info">' + valuesArray[3] + '</div>' +
        '<div id="' + Clip_ids[6] + id + '"class="stream_info">' + valuesArray[4] + '</div>' + '</div>';
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
                Main_LazyImgStart(Clip_ids[1], 9, IMG_404_VIDEO, Main_ColoumnsCountVideo);
            }
            Clip_loadingData = false;
        } else {
            if (Clip_blankCellCount > 0 && !Clip_dataEnded) {
                Clip_loadingMore = true;
                Clip_loadDataPrepare();
                Clip_loadDataReplace();
                return;
            } else {
                Clip_blankCellCount = 0;
                Clip_blankCellVector = [];
            }

            Clip_loadingData = false;
            Clip_loadingMore = false;
        }
    });
}

function Clip_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?channel=' + encodeURIComponent(Main_selectedChannel) + '&limit=' +
            Clip_blankCellCount + '&period=' + Clip_period + (Clip_cursor === null ? '' : '&cursor=' + encodeURIComponent(Clip_cursor)) +
            '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = Clip_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
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

    if (response_items < Clip_blankCellCount) Clip_ReplacedataEnded = true;

    for (var i = 0; i < Clip_blankCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.clips[cursor];
        if (Clip_CellExists(video.tracking_id)) {
            Clip_blankCellCount--;
            i--;
        } else {
            Clip_replaceVideo(Clip_blankCellVector[i],
                video.thumbnails.medium.split('-preview')[0] + '.mp4' + ',' +
                video.duration + ',' + video.game + ',' + video.broadcaster.name +
                ',' + video.broadcaster.display_name + ',' +
                video.broadcaster.logo.replace("150x150", "300x300") +
                ',' + video.broadcaster.id, [video.thumbnails.medium, video.broadcaster.display_name,
                    STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                    video.title + STR_BR + STR_PLAYING + video.game,
                    Main_addCommas(video.views) + STR_VIEWS, STR_DURATION + Play_timeS(video.duration),
                    '[' + video.language.toUpperCase() + ']'
                ]);

            Clip_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) tempVector.splice(index, 1);
        }
    }

    if (Clip_ReplacedataEnded) {
        Clip_blankCellCount = 0;
        Clip_blankCellVector = [];
    } else Clip_blankCellVector = tempVector;

    Clip_loadDataSuccessFinish();
}

function Clip_addFocus() {
    document.getElementById(Clip_ids[0] + Clip_cursorY + '_' + Clip_cursorX).classList.add('stream_thumbnail_focused');
    document.getElementById(Clip_ids[2] + Clip_cursorY + '_' + Clip_cursorX).classList.add('stream_text_focused');
    document.getElementById(Clip_ids[3] + Clip_cursorY + '_' + Clip_cursorX).classList.add('stream_info_focused');
    document.getElementById(Clip_ids[4] + Clip_cursorY + '_' + Clip_cursorX).classList.add('stream_info_focused');
    document.getElementById(Clip_ids[5] + Clip_cursorY + '_' + Clip_cursorX).classList.add('stream_info_focused');
    document.getElementById(Clip_ids[6] + Clip_cursorY + '_' + Clip_cursorX).classList.add('stream_info_focused');
    document.getElementById(Clip_ids[7] + Clip_cursorY + '_' + Clip_cursorX).classList.add('stream_info_focused');
    document.getElementById(Clip_ids[10] + Clip_cursorY + '_' + Clip_cursorX).classList.add('stream_info_focused');

    window.setTimeout(function() {
        Main_ScrollHelper(Clip_ids[0], Clip_cursorY, Clip_cursorX, Main_Clip, Main_ScrollOffSetMinusVideo, Main_ScrollOffSetVideo, false);
    }, 10);

    Main_CounterDialog(Clip_cursorX, Clip_cursorY, Main_ColoumnsCountVideo, Clip_itemsCount);

    if (Clip_cursorY > 3) Main_LazyImg(Clip_ids[1], Clip_cursorY, IMG_404_VIDEO, Main_ColoumnsCountVideo, 4);

    if (((Clip_cursorY + Main_ItemsReloadLimitVideo) > (Clip_itemsCount / Main_ColoumnsCountVideo)) &&
        !Clip_dataEnded && !Clip_loadingMore) {
        Clip_loadingMore = true;
        Clip_loadDataPrepare();
        Clip_loadDataRequest();
    }
}

function Clip_removeFocus() {
    document.getElementById(Clip_ids[0] + Clip_cursorY + '_' + Clip_cursorX).classList.remove('stream_thumbnail_focused');
    document.getElementById(Clip_ids[2] + Clip_cursorY + '_' + Clip_cursorX).classList.remove('stream_text_focused');
    document.getElementById(Clip_ids[3] + Clip_cursorY + '_' + Clip_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Clip_ids[4] + Clip_cursorY + '_' + Clip_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Clip_ids[5] + Clip_cursorY + '_' + Clip_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Clip_ids[6] + Clip_cursorY + '_' + Clip_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Clip_ids[7] + Clip_cursorY + '_' + Clip_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Clip_ids[10] + Clip_cursorY + '_' + Clip_cursorX).classList.remove('stream_info_focused');
}

function Clip_keyClickDelay() {
    Clip_LastClickFinish = true;
}

function Clip_handleKeyDown(event) {
    if (Clip_loadingData && !Clip_loadingMore) {
        event.preventDefault();
        return;
    } else if (!Clip_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Clip_LastClickFinish = false;
        window.setTimeout(Clip_keyClickDelay, Clip_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                Main_Go = Main_Before;
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
            if (!Clip_loadingMore) {
                Clip_periodNumber++;
                if (Clip_periodNumber > 4) Clip_periodNumber = 1;
                Clip_SetPeriod();
                Clip_StartLoad();
            }
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
            Main_gameSelected = Sclip_playUrl[2];
            Main_selectedChannel = Sclip_playUrl[3];
            Main_selectedChannelDisplayname = Sclip_playUrl[4];
            Main_selectedChannelLogo = Sclip_playUrl[5];
            Main_selectedChannel_id = Sclip_playUrl[6];
            Sclip_playUrl = Sclip_playUrl[0];

            Sclip_title = '';
            Sclip_createdAt = document.getElementById(Clip_ids[4] + Clip_cursorY + '_' + Clip_cursorX).textContent;
            Sclip_game = document.getElementById(Clip_ids[5] + Clip_cursorY + '_' + Clip_cursorX).innerHTML;
            Sclip_views = document.getElementById(Clip_ids[6] + Clip_cursorY + '_' + Clip_cursorX).textContent;
            Sclip_Duration = document.getElementById(Clip_ids[7] + Clip_cursorY + '_' + Clip_cursorX).textContent;
            Sclip_language = document.getElementById(Clip_ids[10] + Clip_cursorY + '_' + Clip_cursorX).textContent;
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
    document.getElementById('scene2').classList.remove('hide');
    Play_hideChat();
    Play_clearPause();
    Play_HideWarningDialog();
    document.getElementById('scene_channel_panel').classList.add('hide');
    Play_CleanHideExit();
    document.getElementById('scene1').classList.add('hide');

    PlayClip_Start();
}