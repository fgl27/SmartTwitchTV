//Variable initialization
var Vod_cursorY = 0;
var Vod_cursorX = 0;
var Vod_dataEnded = false;
var Vod_itemsCount = 0;
var Vod_nameMatrix = [];
var Vod_blankCellVector = [];
var Vod_loadingData = false;
var Vod_loadingDataTry = 0;
var Vod_loadingDataTryMax = 10;
var Vod_loadingDataTimeout = 3500;
var Vod_blankCellCount = 0;
var Vod_itemsCountOffset = 0;
var Vod_LastClickFinish = true;
var Vod_keyClickDelayTime = 25;
var Vod_ReplacedataEnded = false;
var Vod_MaxOffset = 0;
var Vod_DurationSeconds = 0;
var Vod_emptyContent = false;
var Vod_itemsCountCheck = false;
var Vod_language = '';
var Vod_game = '';
var Vod_period = 'week';
var Vod_periodNumber = 2;
var Vod_isVod = false;

var Vod_ids = ['v_thumbdiv', 'v_img', 'v_infodiv', 'v_title', 'v_streamon', 'v_duration', 'v_viwers', 'v_quality', 'v_cell', 'svempty_', 'vgame'];
var Vod_status = false;
var Vod_highlight = false;
var Vod_loadingMore = false;
//Variable initialization end

function Vod_init() {
    Main_Go = Main_Vod;
    document.getElementById('top_bar_vod').classList.add('icon_center_focus');
    document.body.addEventListener("keydown", Vod_handleKeyDown, false);

    Main_IconLoad('label_refresh', 'icon-refresh', STR_SWITCH_VOD + ' (C)');
    Main_IconLoad('label_controls', 'icon-switch', STR_SWITCH_CLIP + STR_GUIDE);

    Main_YRst(Vod_cursorY);
    if (Vod_status) {
        Main_ScrollHelper(Vod_ids[0], Vod_cursorY, Vod_cursorX, Main_Vod, Main_ScrollOffSetMinusVideo,
            Main_ScrollOffSetVideo, false);
        Main_CounterDialog(Vod_cursorX, Vod_cursorY, Main_ColoumnsCountVideo, Vod_itemsCount);
        Vod_SetPeriod();
    } else Vod_StartLoad();
}

function Vod_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", Vod_handleKeyDown);
    document.getElementById('top_bar_vod').classList.remove('icon_center_focus');
    document.getElementById('top_bar_vod').innerHTML = STR_VIDEOS;
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH);
    Main_IconLoad('label_controls', 'icon-question-circle', STR_CONTROL_KEY);
}

function Vod_StartLoad() {
    Vod_SetPeriod();
    Main_HideWarningDialog();
    Vod_status = false;
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    Main_empty('stream_table_vod');
    Vod_loadingMore = false;
    Vod_blankCellCount = 0;
    Vod_itemsCountOffset = 0;
    Vod_ReplacedataEnded = false;
    Vod_MaxOffset = 0;
    Vod_nameMatrix = [];
    Vod_blankCellVector = [];
    Vod_itemsCountCheck = false;
    Vod_itemsCount = 0;
    Vod_cursorX = 0;
    Vod_cursorY = 0;
    Vod_dataEnded = false;
    Main_CounterDialogRst();
    Vod_loadDataPrepare();
    Vod_loadDataRequest();
}

function Vod_loadDataPrepare() {
    Vod_loadingData = true;
    Vod_loadingDataTry = 0;
    Vod_loadingDataTimeout = 3500;
}

function Vod_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Vod_itemsCount + Vod_itemsCountOffset;
        if (offset && offset > (Vod_MaxOffset - 1)) {
            offset = Vod_MaxOffset - Main_ItemsLimitVideo;
            Vod_dataEnded = true;
            Vod_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/videos/top?limit=' + Main_ItemsLimitVideo +
            '&broadcast_type=' + (Vod_highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + offset +
            '&sort=views&period=' + Vod_period + '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Vod_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Vod_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    Vod_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Vod_loadDataError();
    }
}

function Vod_loadDataError() {
    Vod_loadingDataTry++;
    if (Vod_loadingDataTry < Vod_loadingDataTryMax) {
        Vod_loadingDataTimeout += (Vod_loadingDataTry < 5) ? 250 : 3500;
        Vod_loadDataRequest();
    } else {
        Vod_loadingData = false;
        Vod_loadingMore = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function Vod_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.videos.length;
    Vod_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) Vod_dataEnded = true;

    var offset_itemsCount = Vod_itemsCount;
    Vod_itemsCount += response_items;

    Vod_emptyContent = !Vod_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, video,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.videos[cursor];
            //video content can be null sometimes the preview will 404
            if ((JSON.stringify(video.preview) + '').indexOf('404_processing_320x240.png') !== -1) {
                Vod_blankCellCount++;
                coloumn_id--;
            } else if (Vod_CellExists(video._id)) coloumn_id--;
            else {
                row.appendChild(Vod_createCell(row_id, row_id + '_' + coloumn_id,
                    video._id + ',' + video.length + ',' + video.language + ',' +
                    video.game + ',' + video.channel.name, [video.preview.replace("320x240", Main_VideoSize),
                        video.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                        video.title + STR_BR + STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                        Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language),
                        STR_DURATION + Play_timeS(video.length)
                    ]));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (Vod_dataEnded && !Vod_itemsCountCheck) {
                Vod_itemsCountCheck = true;
                Vod_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(Vod_ids[9] + row_id + '_' + coloumn_id));
            Vod_blankCellVector.push(Vod_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_vod").appendChild(row);
    }

    Vod_loadDataSuccessFinish();
}

function Vod_createCell(row_id, id, video_id, valuesArray) {
    Vod_nameMatrix.push(video_id);
    if (row_id < Main_ColoumnsCountVideo) Main_PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return Vod_createCellVideo(video_id, id, valuesArray);
}

function Vod_createCellVideo(vod_id, id, valuesArray) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', Vod_ids[8] + id);
    Main_td.setAttribute(Main_DataAttribute, vod_id);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = Vod_VideoHtml(id, valuesArray);

    return Main_td;
}

function Vod_replaceVideo(id, vod_id, valuesArray) {
    splitedId = id.split(Vod_ids[9])[1];
    id = document.getElementById(id);
    id.setAttribute(Main_DataAttribute, vod_id);
    id.innerHTML = Main_VideoHtml(splitedId, valuesArray);
    id.setAttribute('id', Vod_ids[8] + splitedId);
}

function Vod_VideoHtml(id, valuesArray) {
    return '<div id="' + Vod_ids[0] + id + '" class="stream_thumbnail_video" >' +
        '<img id="' + Vod_ids[1] + id + '" class="stream_img" data-src="' + valuesArray[0] + '"></div>' +
        '<div id="' + Vod_ids[2] + id + '" class="stream_text">' +
        '<div id="' + Vod_ids[3] + id + '" class="stream_info" style="width: 72%; display: inline-block; font-size: 155%;">' + valuesArray[1] + '</div>' +
        '<div id="' + Vod_ids[7] + id + '"class="stream_info" style="width:27%; float: right; text-align: right; display: inline-block;">' +
        valuesArray[5] + '</div>' +
        '<div>' +
        '<div id="' + Vod_ids[4] + id + '"class="stream_info" style="width: 59%; display: inline-block;">' + valuesArray[2] + '</div>' +
        '<div id="' + Vod_ids[5] + id + '"class="stream_info" style="width: 39%; display: inline-block; float: right; text-align: right;">' + valuesArray[6] + '</div>' + '</div>' +
        '<div id="' + Vod_ids[10] + id + '"class="stream_info">' + valuesArray[3] + '</div>' +
        '<div id="' + Vod_ids[6] + id + '"class="stream_info">' + valuesArray[4] + '</div>' + '</div>';
}

function Vod_CellExists(video_id) {
    for (var i = 0; i < Vod_nameMatrix.length; i++) {
        if (video_id === Vod_nameMatrix[i]) {
            Vod_blankCellCount++;
            return true;
        }
    }
    return false;
}

function Vod_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!Vod_status) {
            Main_HideLoadDialog();
            if (Vod_emptyContent) Main_showWarningDialog(STR_NO + (Vod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_FOR_THIS + STR_CHANNEL);
            else {
                Vod_status = true;
                Vod_addFocus();
                Main_LazyImgStart(Vod_ids[1], 9, IMG_404_VIDEO, Main_ColoumnsCountVideo);
            }
            Vod_loadingData = false;
        } else {
            if (Vod_blankCellCount > 0 && !Vod_dataEnded) {
                Vod_loadingMore = true;
                Vod_loadDataPrepare();
                Vod_loadDataReplace();
                return;
            } else {
                Vod_blankCellCount = 0;
                Vod_blankCellVector = [];
            }

            Vod_loadingData = false;
            Vod_loadingMore = false;
        }
    });
}

function Vod_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReload(Vod_blankCellCount);

        var offset = Vod_itemsCount + Vod_itemsCountOffset;

        if (offset && offset > (Vod_MaxOffset - 1)) {
            offset = Vod_MaxOffset - Main_ItemsLimitReload;
            Vod_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/videos/top?limit=' + Main_ItemsLimitVideo +
            '&broadcast_type=' + (Vod_highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + offset +
            '&sort=views&&period=' + Vod_period + '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Vod_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Vod_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Vod_loadDataErrorReplace();
    }
}

function Vod_loadDataErrorReplace() {
    Vod_loadingDataTry++;
    if (Vod_loadingDataTry < Vod_loadingDataTryMax) {
        Vod_loadingDataTimeout += (Vod_loadingDataTry < 5) ? 250 : 3500;
        Vod_loadDataReplace();
    } else {
        Vod_ReplacedataEnded = true;
        Vod_blankCellCount = 0;
        Vod_blankCellVector = [];
        Vod_loadDataSuccessFinish();
    }
}


function Vod_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.videos.length;
    var video, index, cursor = 0;
    var tempVector = Vod_blankCellVector.slice();

    Vod_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) Vod_ReplacedataEnded = true;

    for (var i = 0; i < Vod_blankCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.videos[cursor];
        if ((JSON.stringify(video.preview) + '').indexOf('404_processing_320x240.png') !== -1) {
            i--;
        } else if (Vod_CellExists(video._id)) {
            Vod_blankCellCount--;
            i--;
        } else {
            Vod_replaceVideo(Vod_blankCellVector[i], video._id + ',' + video.length + ',' + video.language + ',' +
                video.game + ',' + video.channel.name, [video.preview.replace("320x240", Main_VideoSize),
                    video.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                    video.title + STR_BR + STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                    Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language),
                    STR_DURATION + Play_timeS(video.length)
                ]);
            Vod_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) tempVector.splice(index, 1);
        }
    }

    Vod_itemsCountOffset += cursor;
    if (Vod_ReplacedataEnded) {
        Vod_blankCellCount = 0;
        Vod_blankCellVector = [];
    } else Vod_blankCellVector = tempVector;

    Vod_loadDataSuccessFinish();
}

function Vod_addFocus() {
    document.getElementById(Vod_ids[0] + Vod_cursorY + '_' + Vod_cursorX).classList.add('stream_thumbnail_focused');
    document.getElementById(Vod_ids[2] + Vod_cursorY + '_' + Vod_cursorX).classList.add('stream_text_focused');
    document.getElementById(Vod_ids[3] + Vod_cursorY + '_' + Vod_cursorX).classList.add('stream_info_focused');
    document.getElementById(Vod_ids[4] + Vod_cursorY + '_' + Vod_cursorX).classList.add('stream_info_focused');
    document.getElementById(Vod_ids[5] + Vod_cursorY + '_' + Vod_cursorX).classList.add('stream_info_focused');
    document.getElementById(Vod_ids[6] + Vod_cursorY + '_' + Vod_cursorX).classList.add('stream_info_focused');
    document.getElementById(Vod_ids[7] + Vod_cursorY + '_' + Vod_cursorX).classList.add('stream_info_focused');
    document.getElementById(Vod_ids[10] + Vod_cursorY + '_' + Vod_cursorX).classList.add('stream_info_focused');

    window.setTimeout(function() {
        Main_ScrollHelper(Vod_ids[0], Vod_cursorY, Vod_cursorX, Main_Vod, Main_ScrollOffSetMinusVideo, Main_ScrollOffSetVideo, false);
    }, 10);

    Main_CounterDialog(Vod_cursorX, Vod_cursorY, Main_ColoumnsCountVideo, Vod_itemsCount);

    if (Vod_cursorY > 3) Main_LazyImg(Vod_ids[1], Vod_cursorY, IMG_404_VIDEO, Main_ColoumnsCountVideo, 4);

    if (((Vod_cursorY + Main_ItemsReloadLimitVideo) > (Vod_itemsCount / Main_ColoumnsCountVideo)) &&
        !Vod_dataEnded && !Vod_loadingMore) {
        Vod_loadingMore = true;
        Vod_loadDataPrepare();
        Vod_loadDataRequest();
    }
}

function Vod_removeFocus() {
    document.getElementById(Vod_ids[0] + Vod_cursorY + '_' + Vod_cursorX).classList.remove('stream_thumbnail_focused');
    document.getElementById(Vod_ids[2] + Vod_cursorY + '_' + Vod_cursorX).classList.remove('stream_text_focused');
    document.getElementById(Vod_ids[3] + Vod_cursorY + '_' + Vod_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Vod_ids[4] + Vod_cursorY + '_' + Vod_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Vod_ids[5] + Vod_cursorY + '_' + Vod_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Vod_ids[6] + Vod_cursorY + '_' + Vod_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Vod_ids[7] + Vod_cursorY + '_' + Vod_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Vod_ids[10] + Vod_cursorY + '_' + Vod_cursorX).classList.remove('stream_info_focused');
}

function Vod_keyClickDelay() {
    Vod_LastClickFinish = true;
}

function Vod_handleKeyDown(event) {
    if (Vod_loadingData && !Vod_loadingMore) {
        event.preventDefault();
        return;
    } else if (!Vod_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Vod_LastClickFinish = false;
        window.setTimeout(Vod_keyClickDelay, Vod_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Main_Go = Main_Before;
                Games_exit();
                Main_SwitchScreen();
                Vod_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((Vod_cursorY), (Vod_cursorX - 1), Vod_ids[0])) {
                Vod_removeFocus();
                Vod_cursorX--;
                Vod_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((Vod_cursorY - 1), i, Vod_ids[0])) {
                        Vod_removeFocus();
                        Vod_cursorY--;
                        Vod_cursorX = i;
                        Vod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((Vod_cursorY), (Vod_cursorX + 1), Vod_ids[0])) {
                Vod_removeFocus();
                Vod_cursorX++;
                Vod_addFocus();
            } else if (Main_ThumbNull((Vod_cursorY + 1), 0, Vod_ids[0])) {
                Vod_removeFocus();
                Vod_cursorY++;
                Vod_cursorX = 0;
                Vod_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((Vod_cursorY - 1), (Vod_cursorX - i), Vod_ids[0])) {
                    Vod_removeFocus();
                    Vod_cursorY--;
                    Vod_cursorX = Vod_cursorX - i;
                    Vod_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((Vod_cursorY + 1), (Vod_cursorX - i), Vod_ids[0])) {
                    Vod_removeFocus();
                    Vod_cursorY++;
                    Vod_cursorX = Vod_cursorX - i;
                    Vod_addFocus();
                    break;
                }
            }
            break;
        case KEY_CHANNELUP:
            Main_Before = Main_games;
            Main_Go = Main_Live;
            Vod_exit();
            Main_SwitchScreen();
            break;
        case KEY_CHANNELDOWN:
            Main_Before = Main_games;
            Main_Go = Main_games;
            Vod_exit();
            Main_SwitchScreen();
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            if (!Vod_loadingMore) {
                Vod_periodNumber++;
                if (Vod_periodNumber > 4) Vod_periodNumber = 1;
                Vod_StartLoad();
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Svod_vodId = document.getElementById(Vod_ids[8] + Vod_cursorY + '_' + Vod_cursorX).getAttribute(Main_DataAttribute).split(',');
            Svod_DurationSeconds = parseInt(Svod_vodId[1]);
            Svod_language = Svod_vodId[2];
            Svod_game = Svod_vodId[3];
            Main_selectedChannel = Svod_vodId[4];
            Svod_vodId = Svod_vodId[0].substr(1);

            Svod_title = '';
            Main_selectedChannelDisplayname = document.getElementById(Vod_ids[3] + Vod_cursorY + '_' + Vod_cursorX).textContent;
            Svod_createdAt = document.getElementById(Vod_ids[4] + Vod_cursorY + '_' + Vod_cursorX).textContent;
            Svod_Duration = document.getElementById(Vod_ids[5] + Vod_cursorY + '_' + Vod_cursorX).textContent;
            Svod_views = document.getElementById(Vod_ids[10] + Vod_cursorY + '_' + Vod_cursorX).innerHTML +
                ', ' + document.getElementById(Vod_ids[6] + Vod_cursorY + '_' + Vod_cursorX).textContent;
            Vod_openStream();
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            Vod_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            if (!Vod_loadingMore) {
                Vod_highlight = !Vod_highlight;
                localStorage.setItem('Vod_highlight', Vod_highlight ? 'true' : 'false');
                Vod_StartLoad();
            }
            break;
        case KEY_BLUE:
            if (!Search_isSearching) Main_BeforeSearch = Main_Vod;
            Main_Go = Main_Search;
            Vod_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}

function Vod_openStream() {
    document.body.addEventListener("keydown", PlayVod_handleKeyDown, false);
    document.body.removeEventListener("keydown", Vod_handleKeyDown);
    document.getElementById('scene2').classList.remove('hide');
    PlayVod_hidePanel();
    Play_hideChat();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_CleanHideExit();
    Vod_isVod = true;
    document.getElementById('scene1').classList.add('hide');
    PlayVod_Start();
}

function Vod_SetPeriod() {
    if (Vod_periodNumber === 1) {
        document.getElementById('top_bar_vod').innerHTML = STR_VIDEOS + Main_UnderCenter((Vod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_DAY);
        Vod_period = 'day';
    } else if (Vod_periodNumber === 2) {
        document.getElementById('top_bar_vod').innerHTML = STR_VIDEOS + Main_UnderCenter((Vod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_WEEK);
        Vod_period = 'week';
    } else if (Vod_periodNumber === 3) {
        document.getElementById('top_bar_vod').innerHTML = STR_VIDEOS + Main_UnderCenter((Vod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_MONTH);
        Vod_period = 'month';
    } else if (Vod_periodNumber === 4) {
        document.getElementById('top_bar_vod').innerHTML = STR_VIDEOS + Main_UnderCenter((Vod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_ALL);
        Vod_period = 'all';
    }
    localStorage.setItem('vod_periodNumber', Vod_periodNumber);
}
