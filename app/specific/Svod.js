//Variable initialization
var Svod_cursorY = 0;
var Svod_cursorX = 0;
var Svod_dataEnded = false;
var Svod_itemsCount = 0;
var Svod_idObject = {};
var Svod_emptyCellVector = [];
var Svod_loadingData = false;
var Svod_loadingDataTry = 0;
var Svod_loadingDataTryMax = 5;
var Svod_loadingDataTimeout = 3500;
var Svod_itemsCountOffset = 0;
var Svod_ReplacedataEnded = false;
var Svod_MaxOffset = 0;
var Svod_DurationSeconds = 0;
var Svod_emptyContent = false;
var Svod_itemsCountCheck = false;
var Svod_language = '';

var Svod_ids = ['cv_thumbdiv', 'cv_img', 'cv_infodiv', 'cv_title', 'cv_streamon', 'cv_duration', 'cv_viwers', 'cv_quality', 'cv_cell', 'svempty_', 'cvod_scroll', 'cv_game'];
var Svod_status = false;
var Svod_highlight = false;
var Svod_lastselectedChannel = '';
var Svod_vodId = '';
var Svod_title = '';
var Svod_views = '';
var Svod_createdAt = '';
var Svod_Duration = '';
var Svod_vodOffset = 0;
var Svod_FirstLoad = false;
//Variable initialization end

function Svod_init() {
    Main_Go = Main_Svod;
    if (Main_selectedChannel !== Svod_lastselectedChannel) Svod_status = false;
    Main_cleanTopLabel();
    Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH_VOD + STR_KEY_UP_DOWN);
    Main_textContent('top_bar_user', Main_selectedChannelDisplayname);
    document.body.addEventListener("keydown", Svod_handleKeyDown, false);
    Main_YRst(Svod_cursorY);
    if (Svod_status) {
        Main_textContent('top_bar_game', Svod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA);
        Main_ShowElement(Svod_ids[10]);
        Main_CounterDialog(Svod_cursorX, Svod_cursorY, Main_ColoumnsCountVideo, Svod_itemsCount);
    } else Svod_StartLoad();
}

function Svod_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", Svod_handleKeyDown);
    Main_HideElement(Svod_ids[10]);
}

function Svod_StartLoad() {
    Main_textContent('top_bar_game', Svod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA);
    Main_HideElement(Svod_ids[10]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    Svod_lastselectedChannel = Main_selectedChannel;
    Svod_status = false;
    Main_empty('stream_table_channel_vod');
    Svod_itemsCountOffset = 0;
    Svod_ReplacedataEnded = false;
    Svod_MaxOffset = 0;
    Svod_idObject = {};
    Svod_emptyCellVector = [];
    Svod_itemsCountCheck = false;
    Svod_FirstLoad = true;
    Svod_itemsCount = 0;
    Svod_cursorX = 0;
    Svod_cursorY = 0;
    Svod_dataEnded = false;
    Main_CounterDialogRst();
    Svod_loadDataPrepare();
    Svod_loadDataRequest();
}

function Svod_loadDataPrepare() {
    Main_imgVectorRst();
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

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/channels/' +
            encodeURIComponent(Main_selectedChannel) + '/videos?limit=' + Main_ItemsLimitVideo +
            '&broadcast_type=' + (Svod_highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + offset + '&' +
            Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Svod_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
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
        Svod_loadingDataTimeout += 500;
        Svod_loadDataRequest();
    } else {
        Svod_loadingData = false;
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

    var coloumn_id, row_id, row, video, id,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.videos[cursor];
            id = video._id;
            //video content can be null sometimes the preview will 404
            if ((JSON.stringify(video.preview) + '').indexOf('404_processing') !== -1 || Svod_idObject[id]) coloumn_id--;
            else {
                Svod_idObject[id] = 1;
                row.appendChild(Vod_createCell(row_id, row_id + '_' + coloumn_id,
                    id + ',' + video.length + ',' + video.language + ',' + video.game, [video.preview.replace("320x240", Main_VideoSize),
                        video.title, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                        STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                        Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language),
                        STR_DURATION + Play_timeS(video.length)
                    ], Svod_ids));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (Svod_dataEnded && !Svod_itemsCountCheck) {
                Svod_itemsCountCheck = true;
                Svod_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(Svod_ids[9] + row_id + '_' + coloumn_id));
            Svod_emptyCellVector.push(Svod_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_channel_vod").appendChild(row);
    }

    Svod_loadDataSuccessFinish();
}

function Svod_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!Svod_status) {
            Main_HideLoadDialog();
            if (Svod_emptyContent) Main_showWarningDialog(STR_NO + (Svod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_FOR_THIS + STR_CHANNEL);
            else {
                Svod_status = true;
                Main_imgVectorLoad(IMG_404_VIDEO);
                Svod_addFocus();
            }
            Main_ShowElement(Svod_ids[10]);
            Svod_FirstLoad = false;
        } else {
            Main_imgVectorLoad(IMG_404_VIDEO);
            if (Svod_emptyCellVector.length > 0 && !Svod_dataEnded) {
                Svod_loadDataPrepare();
                Svod_loadDataReplace();
                return;
            } else Svod_emptyCellVector = [];
        }
        Svod_loadingData = false;
    });
}

function Svod_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReplace(Svod_emptyCellVector.length);

        var offset = Svod_itemsCount + Svod_itemsCountOffset;

        if (offset && offset > (Svod_MaxOffset - 1)) {
            offset = Svod_MaxOffset - Main_ItemsLimitReplace;
            Svod_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/channels/' +
            encodeURIComponent(Main_selectedChannel) + '/videos?limit=' + Main_ItemsLimitReplace + '&broadcast_type=' +
            (Svod_highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + offset + '&' +
            Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Svod_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
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
        Svod_loadingDataTimeout += 500;
        Svod_loadDataReplace();
    } else {
        Svod_ReplacedataEnded = true;
        Svod_emptyCellVector = [];
        Svod_loadDataSuccessFinish();
    }
}


function Svod_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.videos.length;
    var video, index, id, cursor = 0;
    var tempVector = Svod_emptyCellVector.slice();

    Svod_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) Svod_ReplacedataEnded = true;

    for (var i = 0; i < Svod_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.videos[cursor];
        id = video._id;
        if ((JSON.stringify(video.preview) + '').indexOf('404_processing') !== -1 || Svod_idObject[id]) i--;
        else {
            Svod_idObject[id] = 1;
            Vod_replaceVideo(Svod_emptyCellVector[i], id + ',' + video.length + ',' + video.language + ',' + video.game, [video.preview.replace("320x240", Main_VideoSize),
                video.title, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language),
                STR_DURATION + Play_timeS(video.length)
            ], Svod_ids);

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) tempVector.splice(index, 1);
        }
    }

    Svod_itemsCountOffset += cursor;
    if (Svod_ReplacedataEnded) Svod_emptyCellVector = [];
    else Svod_emptyCellVector = tempVector;

    Svod_loadDataSuccessFinish();
}

function Svod_addFocus() {
    Main_addFocusVideo(Svod_cursorY, Svod_cursorX, Svod_ids, Main_ColoumnsCountVideo, Svod_itemsCount);

    if (((Svod_cursorY + Main_ItemsReloadLimitVideo) > (Svod_itemsCount / Main_ColoumnsCountVideo)) &&
        !Svod_dataEnded && !Svod_loadingData) {
        Svod_loadDataPrepare();
        Svod_loadDataRequest();
    }
}

function Svod_removeFocus() {
    Main_removeFocus(Svod_cursorY + '_' + Svod_cursorX, Svod_ids);
}

function Svod_handleKeyDown(event) {
    if (Svod_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

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
            Svod_highlight = !Svod_highlight;
            localStorage.setItem('Svod_highlight', Svod_highlight ? 'true' : 'false');
            Svod_StartLoad();
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            Svod_StartLoad();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Svod_vodId = document.getElementById(Svod_ids[8] + Svod_cursorY + '_' + Svod_cursorX).getAttribute(Main_DataAttribute).split(',');
            Svod_DurationSeconds = parseInt(Svod_vodId[1]);
            Svod_language = Svod_vodId[2];
            Play_gameSelected = Svod_vodId[3];
            Svod_vodId = Svod_vodId[0].substr(1);

            Svod_title = document.getElementById(Svod_ids[3] + Svod_cursorY + '_' + Svod_cursorX).textContent;
            Svod_createdAt = document.getElementById(Svod_ids[4] + Svod_cursorY + '_' + Svod_cursorX).textContent;
            Svod_Duration = document.getElementById(Svod_ids[5] + Svod_cursorY + '_' + Svod_cursorX).textContent;
            Svod_views = document.getElementById(Svod_ids[11] + Svod_cursorY + '_' + Svod_cursorX).textContent +
                ', ' + document.getElementById(Svod_ids[6] + Svod_cursorY + '_' + Svod_cursorX).textContent;
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
            if (!Search_isSearching) Main_BeforeSearch = Main_Svod;
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
    Main_ShowElement('scene2');
    PlayVod_hidePanel();
    Play_hideChat();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_CleanHideExit();
    Main_HideElement('scene1');
    PlayVod_Start();
}