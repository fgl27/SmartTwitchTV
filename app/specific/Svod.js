//Variable initialization
var Svod_cursorY = 0;
var Svod_cursorX = 0;
var Svod_dataEnded = false;
var Svod_itemsCount = 0;
var Svod_nameMatrix = [];
var Svod_blankCellVector = [];
var Svod_loadingData = false;
var Svod_loadingDataTry = 0;
var Svod_loadingDataTryMax = 10;
var Svod_loadingDataTimeout = 3500;
var Svod_blankCellCount = 0;
var Svod_itemsCountOffset = 0;
var Svod_LastClickFinish = true;
var Svod_keyClickDelayTime = 25;
var Svod_ReplacedataEnded = false;
var Svod_MaxOffset = 0;
var Svod_DurationSeconds = 0;
var Svod_emptyContent = false;
var Svod_itemsCountCheck = false;

var Svod_ids = ['sv_thumbdiv', 'sv_img', 'sv_infodiv', 'sv_title', 'sv_streamon', 'sv_duration', 'sv_viwers', 'sv_quality', 'sv_cell', 'svempty_'];
var Svod_status = false;
var Svod_highlight = false;
var Svod_lastselectedChannel = '';
var Svod_vodId = '';
var Svod_title = '';
var Svod_views = '';
var Svod_createdAt = '';
var Svod_Duration = '';
var Svod_loadingMore = false;
//Variable initialization end

function Svod_init() {
    Main_Go = Main_Svod;
    Main_SetStreamTitle(true);
    if (Main_selectedChannel !== Svod_lastselectedChannel) Svod_status = false;
    Main_cleanTopLabel();
    Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH_VOD);
    document.getElementById('top_bar_user').innerHTML = Main_selectedChannelDisplayname;
    document.body.addEventListener("keydown", Svod_handleKeyDown, false);
    Main_YRst(Svod_cursorY);
    if (Svod_status) {
        document.getElementById('top_bar_game').innerHTML = Svod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA;
        Main_ScrollHelper(Svod_ids[0], Svod_cursorY, Svod_cursorX, Main_Svod, Main_ScrollOffSetMinusVideo,
            Main_ScrollOffSetVideo, false);
        Main_CounterDialog(Svod_cursorX, Svod_cursorY, Main_ColoumnsCountVideo, Svod_itemsCount);
    } else Svod_StartLoad();
}

function Svod_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", Svod_handleKeyDown);
    Main_SetStreamTitle(false);
}

function Svod_StartLoad() {
    document.getElementById('top_bar_game').innerHTML = Svod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA;
    Main_HideWarningDialog();
    Svod_lastselectedChannel = Main_selectedChannel;
    Svod_status = false;
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    var table = document.getElementById('stream_table_search_vod');
    while (table.firstChild) table.removeChild(table.firstChild);
    Svod_loadingMore = false;
    Svod_blankCellCount = 0;
    Svod_itemsCountOffset = 0;
    Svod_ReplacedataEnded = false;
    Svod_MaxOffset = 0;
    Svod_nameMatrix = [];
    Svod_blankCellVector = [];
    Svod_itemsCountCheck = false;
    Svod_itemsCount = 0;
    Svod_cursorX = 0;
    Svod_cursorY = 0;
    Svod_dataEnded = false;
    Main_CounterDialogRst();
    Svod_loadDataPrepare();
    Svod_loadDataRequest();
}

function Svod_loadDataPrepare() {
    Svod_loadingData = true;
    Svod_loadingDataTry = 0;
    Svod_loadingDataTimeout = 3500;
}

function Svod_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Svod_itemsCount + Svod_itemsCountOffset;
        if (offset && offset > (Svod_MaxOffset - 1)) {
            offset = Svod_MaxOffset - Main_ItemsLimitVideo;
            Svod_dataEnded = true;
            Svod_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/channels/' + encodeURIComponent(Main_selectedChannel) + '/videos?limit=' +
            Main_ItemsLimitVideo + '&broadcast_type=' + (Svod_highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + offset + '&' +
            Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Svod_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Svod_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    Svod_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Svod_loadDataError();
    }
}

function Svod_loadDataError() {
    Svod_loadingDataTry++;
    if (Svod_loadingDataTry < Svod_loadingDataTryMax) {
        Svod_loadingDataTimeout += (Svod_loadingDataTry < 5) ? 250 : 3500;
        Svod_loadDataRequest();
    } else {
        Svod_loadingData = false;
        Svod_loadingMore = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function Svod_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.videos.length;
    Svod_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) Svod_dataEnded = true;

    var offset_itemsCount = Svod_itemsCount;
    Svod_itemsCount += response_items;

    Svod_emptyContent = !Svod_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, video,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.videos[cursor];
            if ((JSON.stringify(video.preview) + '').indexOf('404_processing_320x240.png') !== -1) { //video content can be null sometimes the preview will 404
                Svod_blankCellCount++;
                coloumn_id--;
            } else if (Svod_CellExists(video._id)) coloumn_id--;
            else {
                row.appendChild(Svod_createCell(row_id, row_id + '_' + coloumn_id, video._id + '._.' + video.length, [video.preview.replace("320x240", Main_VideoSize),
                    video.title, STR_STREAM_ON + Main_videoCreatedAt(video.created_at), STR_DURATION + Play_timeS(video.length),
                    Main_addCommas(video.views) + STR_VIEWER,
                    Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language)
                ]));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (Svod_dataEnded && !Svod_itemsCountCheck) {
                Svod_itemsCountCheck = true;
                Svod_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(Svod_ids[9] + row_id + '_' + coloumn_id));
            Svod_blankCellVector.push(Svod_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_search_vod").appendChild(row);
    }

    Svod_loadDataSuccessFinish();
}

function Svod_createCell(row_id, id, video_id, valuesArray) {
    Svod_nameMatrix.push(video_id);
    if (row_id < Main_ColoumnsCountVideo) Main_PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return Main_createCellVideo(video_id, id, Svod_ids, valuesArray);
}

function Svod_CellExists(video_id) {
    if (Svod_nameMatrix.indexOf(video_id) > -1) {
        Svod_blankCellCount++;
        return true;
    }
    return false;
}

function Svod_loadDataSuccessFinish() {
    $(document).ready(function() {
        if (!Svod_status) {
            Main_HideLoadDialog();
            if (Svod_emptyContent) Main_showWarningDialog(STR_NO + (Svod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_FOR_THIS + STR_CHANNEL);
            else {
                Svod_status = true;
                Svod_addFocus();
                Main_LazyImgStart(Svod_ids[1], 9, IMG_404_VIDEO, Main_ColoumnsCountVideo);
            }
            Svod_loadingData = false;
        } else {
            if (Svod_blankCellCount > 0 && !Svod_dataEnded) {
                Svod_loadingMore = true;
                Svod_loadDataPrepare();
                Svod_loadDataReplace();
                return;
            } else {
                Svod_blankCellCount = 0;
                Svod_blankCellVector = [];
            }

            Svod_loadingData = false;
            Svod_loadingMore = false;
        }
    });
}

function Svod_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReload(Svod_blankCellCount);

        var offset = Svod_itemsCount + Svod_itemsCountOffset;

        if (offset && offset > (Svod_MaxOffset - 1)) {
            offset = Svod_MaxOffset - Main_ItemsLimitReload;
            Svod_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/channels/' + encodeURIComponent(Main_selectedChannel) + '/videos?limit=' +
            Main_ItemsLimitReload + '&broadcast_type=' + (Svod_highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + offset + '&' +
            Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Svod_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Svod_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Svod_loadDataErrorReplace();
    }
}

function Svod_loadDataErrorReplace() {
    Svod_loadingDataTry++;
    if (Svod_loadingDataTry < Svod_loadingDataTryMax) {
        Svod_loadingDataTimeout += (Svod_loadingDataTry < 5) ? 250 : 3500;
        Svod_loadDataReplace();
    } else {
        Svod_ReplacedataEnded = true;
        Svod_blankCellCount = 0;
        Svod_blankCellVector = [];
        Svod_loadDataSuccessFinish();
    }
}


function Svod_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.videos.length;
    var video, index, cursor = 0;
    var tempVector = Svod_blankCellVector.slice();

    Svod_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) Svod_ReplacedataEnded = true;

    for (var i = 0; i < Svod_blankCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.videos[cursor];
        if ((JSON.stringify(video.preview) + '').indexOf('404_processing_320x240.png') !== -1) {
            i--;
        } else if (Svod_CellExists(video._id)) {
            Svod_blankCellCount--;
            i--;
        } else {
            Main_replaceVideo(Svod_blankCellVector[i], video._id + '._.' + video.length, [video.preview.replace("320x240", Main_VideoSize),
                video.title, STR_STREAM_ON + Main_videoCreatedAt(video.created_at), STR_DURATION + Play_timeS(video.length),
                Main_addCommas(video.views) + STR_VIEWER,
                Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language)
            ]);
            Svod_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) tempVector.splice(index, 1);
        }
    }

    Svod_itemsCountOffset += cursor;
    if (Svod_ReplacedataEnded) {
        Svod_blankCellCount = 0;
        Svod_blankCellVector = [];
    } else Svod_blankCellVector = tempVector;

    Svod_loadDataSuccessFinish();
}

function Svod_addFocus() {
    document.getElementById(Svod_ids[0] + Svod_cursorY + '_' + Svod_cursorX).classList.add('stream_thumbnail_focused');
    document.getElementById(Svod_ids[2] + Svod_cursorY + '_' + Svod_cursorX).classList.add('stream_text_focused');
    document.getElementById(Svod_ids[3] + Svod_cursorY + '_' + Svod_cursorX).classList.add('stream_info_focused');
    document.getElementById(Svod_ids[4] + Svod_cursorY + '_' + Svod_cursorX).classList.add('stream_info_focused');
    document.getElementById(Svod_ids[5] + Svod_cursorY + '_' + Svod_cursorX).classList.add('stream_info_focused');
    document.getElementById(Svod_ids[6] + Svod_cursorY + '_' + Svod_cursorX).classList.add('stream_info_focused');
    document.getElementById(Svod_ids[7] + Svod_cursorY + '_' + Svod_cursorX).classList.add('stream_info_focused');

    window.setTimeout(function() {
        Main_ScrollHelper(Svod_ids[0], Svod_cursorY, Svod_cursorX, Main_Svod, Main_ScrollOffSetMinusVideo, Main_ScrollOffSetVideo, false);
    }, 10);

    Main_CounterDialog(Svod_cursorX, Svod_cursorY, Main_ColoumnsCountVideo, Svod_itemsCount);

    if (Svod_cursorY > 3) Main_LazyImg(Svod_ids[1], Svod_cursorY, IMG_404_VIDEO, Main_ColoumnsCountVideo, 4);

    if (((Svod_cursorY + Main_ItemsReloadLimitVideo) > (Svod_itemsCount / Main_ColoumnsCountVideo)) &&
        !Svod_dataEnded && !Svod_loadingMore) {
        Svod_loadingMore = true;
        Svod_loadDataPrepare();
        Svod_loadDataRequest();
    }
}

function Svod_removeFocus() {
    document.getElementById(Svod_ids[0] + Svod_cursorY + '_' + Svod_cursorX).classList.remove('stream_thumbnail_focused');
    document.getElementById(Svod_ids[2] + Svod_cursorY + '_' + Svod_cursorX).classList.remove('stream_text_focused');
    document.getElementById(Svod_ids[3] + Svod_cursorY + '_' + Svod_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Svod_ids[4] + Svod_cursorY + '_' + Svod_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Svod_ids[5] + Svod_cursorY + '_' + Svod_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Svod_ids[6] + Svod_cursorY + '_' + Svod_cursorX).classList.remove('stream_info_focused');
    document.getElementById(Svod_ids[7] + Svod_cursorY + '_' + Svod_cursorX).classList.remove('stream_info_focused');
}

function Svod_keyClickDelay() {
    Svod_LastClickFinish = true;
}

function Svod_handleKeyDown(event) {
    if (Svod_loadingData && !Svod_loadingMore) {
        event.preventDefault();
        return;
    } else if (!Svod_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Svod_LastClickFinish = false;
        window.setTimeout(Svod_keyClickDelay, Svod_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Main_Go = Main_SChannelContent;
                Svod_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((Svod_cursorY), (Svod_cursorX - 1), Svod_ids[0])) {
                Svod_removeFocus();
                Svod_cursorX--;
                Svod_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((Svod_cursorY - 1), i, Svod_ids[0])) {
                        Svod_removeFocus();
                        Svod_cursorY--;
                        Svod_cursorX = i;
                        Svod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((Svod_cursorY), (Svod_cursorX + 1), Svod_ids[0])) {
                Svod_removeFocus();
                Svod_cursorX++;
                Svod_addFocus();
            } else if (Main_ThumbNull((Svod_cursorY + 1), 0, Svod_ids[0])) {
                Svod_removeFocus();
                Svod_cursorY++;
                Svod_cursorX = 0;
                Svod_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((Svod_cursorY - 1), (Svod_cursorX - i), Svod_ids[0])) {
                    Svod_removeFocus();
                    Svod_cursorY--;
                    Svod_cursorX = Svod_cursorX - i;
                    Svod_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((Svod_cursorY + 1), (Svod_cursorX - i), Svod_ids[0])) {
                    Svod_removeFocus();
                    Svod_cursorY++;
                    Svod_cursorX = Svod_cursorX - i;
                    Svod_addFocus();
                    break;
                }
            }
            break;
        case KEY_CHANNELUP:
        case KEY_CHANNELDOWN:
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            if (!Svod_loadingMore) {
                Svod_highlight = !Svod_highlight;
                Svod_StartLoad();
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Svod_vodId = document.getElementById(Svod_ids[8] + Svod_cursorY + '_' + Svod_cursorX).getAttribute('data-channelname').split('._.');
            Svod_DurationSeconds = parseInt(Svod_vodId[1]);
            Svod_vodId = Svod_vodId[0].substr(1);
            Svod_Duration = document.getElementById(Svod_ids[5] + Svod_cursorY + '_' + Svod_cursorX).textContent;
            Svod_views = document.getElementById(Svod_ids[6] + Svod_cursorY + '_' + Svod_cursorX).textContent;
            Svod_title = document.getElementById(Svod_ids[3] + Svod_cursorY + '_' + Svod_cursorX).textContent;
            Svod_createdAt = document.getElementById(Svod_ids[4] + Svod_cursorY + '_' + Svod_cursorX).textContent;
            Svod_openStream();
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            Svod_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_BeforeSearch = Main_Svod;
            Main_Go = Main_Search;
            Svod_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}

function Svod_openStream() {
    document.body.addEventListener("keydown", PlayVod_handleKeyDown, false);
    document.body.removeEventListener("keydown", Svod_handleKeyDown);
    document.getElementById('scene2').classList.remove('hide');
    PlayVod_hidePanel();
    Play_hideChat();
    Play_clearPause();
    Play_HideWarningDialog();
    document.getElementById('play_dialog_exit').classList.add('hide');
    document.getElementById('scene1').classList.add('hide');
    PlayVod_Start();
}