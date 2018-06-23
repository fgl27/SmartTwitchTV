//Variable initialization
var Gvod_cursorY = 0;
var Gvod_cursorX = 0;
var Gvod_dataEnded = false;
var Gvod_itemsCount = 0;
var Gvod_idObject = {};
var Gvod_emptyCellVector = [];
var Gvod_loadingData = false;
var Gvod_loadingDataTry = 0;
var Gvod_loadingDataTryMax = 5;
var Gvod_loadingDataTimeout = 3500;
var Gvod_itemsCountOffset = 0;
var Gvod_ReplacedataEnded = false;
var Gvod_MaxOffset = 0;
var Gvod_emptyContent = false;
var Gvod_itemsCountCheck = false;
var Gvod_period = 'week';
var Gvod_periodNumber = 2;
var Gvod_FirstLoad = false;

var Gvod_ids = ['gv_thumbdiv', 'gv_img', 'gv_infodiv', 'gv_title', 'gv_streamon', 'gv_duration', 'gv_viwers', 'gv_quality', 'gv_cell', 'gsvempty_', 'gvod_scroll', 'gv_game'];
var Gvod_status = false;
var Gvod_highlight = false;
var Gvod_OldgameSelected = '';
//Variable initialization end

function Gvod_init() {
    Main_Go = Main_Gvod;
    Main_AddClass('top_bar_game', 'icon_center_focus');
    document.body.addEventListener("keydown", Gvod_handleKeyDown, false);

    Main_IconLoad('label_controls', 'icon-arrow-circle-left', STR_GOBACK);
    Main_IconLoad('label_refresh', 'icon-refresh', STR_SWITCH_VOD + STR_GUIDE);
    Main_IconLoad('label_switch', 'icon-calendar', STR_SWITCH_CLIP + STR_KEY_UP_DOWN);

    Main_YRst(Gvod_cursorY);
    if ((Gvod_OldgameSelected === Main_gameSelected) && Gvod_status) {
        Main_ShowElement(Gvod_ids[10]);
        Main_CounterDialog(Gvod_cursorX, Gvod_cursorY, Main_ColoumnsCountVideo, Gvod_itemsCount);
        Gvod_SetPeriod();
    } else Gvod_StartLoad();
}

function Gvod_exit() {
    document.body.removeEventListener("keydown", Gvod_handleKeyDown);
    Main_RemoveClass('top_bar_game', 'icon_center_focus');
    Main_innerHTML('top_bar_game', STR_GAMES);

    Main_IconLoad('label_controls', 'icon-question-circle', STR_CONTROL_KEY);
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
    Main_HideElement(Gvod_ids[10]);
}

function Gvod_StartLoad() {
    Main_HideElement(Gvod_ids[10]);
    Main_showLoadDialog();
    Gvod_SetPeriod();
    Gvod_OldgameSelected = Main_gameSelected;
    Main_HideWarningDialog();
    Gvod_status = false;
    Main_empty('stream_table_gvod');
    Gvod_itemsCountOffset = 0;
    Gvod_ReplacedataEnded = false;
    Gvod_MaxOffset = 0;
    Gvod_idObject = {};
    Gvod_emptyCellVector = [];
    Gvod_itemsCountCheck = false;
    Gvod_FirstLoad = true;
    Gvod_itemsCount = 0;
    Gvod_cursorX = 0;
    Gvod_cursorY = 0;
    Gvod_dataEnded = false;
    Main_CounterDialogRst();
    Gvod_loadDataPrepare();
    Gvod_loadDataRequest();
}

function Gvod_loadDataPrepare() {
    Main_imgVectorRst();
    Gvod_loadingData = true;
    Gvod_loadingDataTry = 0;
    Gvod_loadingDataTimeout = 3500;
}

function Gvod_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Gvod_itemsCount + Gvod_itemsCountOffset;
        if (offset && offset > (Gvod_MaxOffset - 1)) {
            offset = Gvod_MaxOffset - Main_ItemsLimitVideo;
            Gvod_dataEnded = true;
            Gvod_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/videos/top?game=' +
            encodeURIComponent(Main_gameSelected) + '&limit=' + Main_ItemsLimitVideo +
            '&broadcast_type=' + (Gvod_highlight ? 'highlight' : 'archive') + '&sort=views&offset=' + offset +
            '&period=' + Gvod_period + '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Gvod_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Gvod_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    Gvod_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Gvod_loadDataError();
    }
}

function Gvod_loadDataError() {
    Gvod_loadingDataTry++;
    if (Gvod_loadingDataTry < Gvod_loadingDataTryMax) {
        Gvod_loadingDataTimeout += 500;
        Gvod_loadDataRequest();
    } else {
        Gvod_loadingData = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function Gvod_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.videos.length;
    Gvod_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) Gvod_dataEnded = true;

    var offset_itemsCount = Gvod_itemsCount;
    Gvod_itemsCount += response_items;

    Gvod_emptyContent = !Gvod_itemsCount;

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
            //video content can be null sometimes the preview will 404_processing
            if ((JSON.stringify(video.preview) + '').indexOf('404_processing') !== -1 || Gvod_idObject[id]) coloumn_id--;
            else {
                Gvod_idObject[id] = 1;
                row.appendChild(Vod_createCell(row_id, row_id + '_' + coloumn_id,
                    id + ',' + video.length + ',' + video.language + ',' +
                    video.game + ',' + video.channel.name, [video.preview.replace("320x240", Main_VideoSize),
                        video.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                        video.title + STR_BR + STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                        Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language),
                        STR_DURATION + Play_timeS(video.length)
                    ], Gvod_ids));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (Gvod_dataEnded && !Gvod_itemsCountCheck) {
                Gvod_itemsCountCheck = true;
                Gvod_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(Gvod_ids[9] + row_id + '_' + coloumn_id));
            Gvod_emptyCellVector.push(Gvod_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_gvod").appendChild(row);
    }

    Gvod_loadDataSuccessFinish();
}

function Gvod_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!Gvod_status) {
            Main_HideLoadDialog();
            if (Gvod_emptyContent) Main_showWarningDialog(STR_NO + (Gvod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_FOR_THIS + STR_CHANNEL);
            else {
                Gvod_status = true;
                Main_imgVectorLoad(IMG_404_VIDEO);
                Gvod_addFocus();
            }
            Main_ShowElement(Gvod_ids[10]);
            Gvod_FirstLoad = false;
        } else {
            Main_imgVectorLoad(IMG_404_VIDEO);
            if (Gvod_emptyCellVector.length > 0 && !Gvod_dataEnded) {
                Gvod_loadDataPrepare();
                Gvod_loadDataReplace();
                return;
            } else Gvod_emptyCellVector = [];
        }
        Gvod_loadingData = false;
    });
}

function Gvod_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReplace(Gvod_emptyCellVector.length);

        var offset = Gvod_itemsCount + Gvod_itemsCountOffset;
        if (offset && offset > (Gvod_MaxOffset - 1)) {
            offset = Gvod_MaxOffset - Main_ItemsLimitReplace;
            Gvod_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/videos/top?game=' +
            encodeURIComponent(Main_gameSelected) + '&limit=' + Main_ItemsLimitReplace +
            '&broadcast_type=' + (Gvod_highlight ? 'highlight' : 'archive') + '&sort=views&offset=' + offset +
            '&period=' + Gvod_period + '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Gvod_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Gvod_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Gvod_loadDataErrorReplace();
    }
}

function Gvod_loadDataErrorReplace() {
    Gvod_loadingDataTry++;
    if (Gvod_loadingDataTry < Gvod_loadingDataTryMax) {
        Gvod_loadingDataTimeout += 500;
        Gvod_loadDataReplace();
    } else {
        Gvod_ReplacedataEnded = true;
        Gvod_emptyCellVector = [];
        Gvod_loadDataSuccessFinish();
    }
}


function Gvod_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.videos.length;
    var video, index, id, cursor = 0;
    var tempVector = Gvod_emptyCellVector.slice();

    Gvod_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) Gvod_ReplacedataEnded = true;

    for (var i = 0; i < Gvod_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.videos[cursor];
        id = video._id;
        if ((JSON.stringify(video.preview) + '').indexOf('404_processing') !== -1 || Gvod_idObject[id]) i--;
        else {
            Gvod_idObject[id] = 1;
            Vod_replaceVideo(Gvod_emptyCellVector[i],
                id + ',' + video.length + ',' + video.language + ',' +
                video.game + ',' + video.channel.name, [video.preview.replace("320x240", Main_VideoSize),
                    video.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                    video.title + STR_BR + STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                    Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language),
                    STR_DURATION + Play_timeS(video.length)
                ], Gvod_ids);

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) tempVector.splice(index, 1);
        }
    }

    Gvod_itemsCountOffset += cursor;
    if (Gvod_ReplacedataEnded) Gvod_emptyCellVector = [];
    else Gvod_emptyCellVector = tempVector;

    Gvod_loadDataSuccessFinish();
}

function Gvod_addFocus() {
    Main_addFocusVideo(Gvod_cursorY, Gvod_cursorX, Gvod_ids, Main_ColoumnsCountVideo, Gvod_itemsCount);

    if (((Gvod_cursorY + Main_ItemsReloadLimitVideo) > (Gvod_itemsCount / Main_ColoumnsCountVideo)) &&
        !Gvod_dataEnded && !Gvod_loadingData) {
        Gvod_loadDataPrepare();
        Gvod_loadDataRequest();
    }
}

function Gvod_removeFocus() {
    Main_removeFocus(Gvod_cursorY + '_' + Gvod_cursorX, Gvod_ids);
}

function Gvod_handleKeyDown(event) {
    if (Gvod_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Main_Go = Main_aGame;
                Gvod_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((Gvod_cursorY), (Gvod_cursorX - 1), Gvod_ids[0])) {
                Gvod_removeFocus();
                Gvod_cursorX--;
                Gvod_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((Gvod_cursorY - 1), i, Gvod_ids[0])) {
                        Gvod_removeFocus();
                        Gvod_cursorY--;
                        Gvod_cursorX = i;
                        Gvod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((Gvod_cursorY), (Gvod_cursorX + 1), Gvod_ids[0])) {
                Gvod_removeFocus();
                Gvod_cursorX++;
                Gvod_addFocus();
            } else if (Main_ThumbNull((Gvod_cursorY + 1), 0, Gvod_ids[0])) {
                Gvod_removeFocus();
                Gvod_cursorY++;
                Gvod_cursorX = 0;
                Gvod_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((Gvod_cursorY - 1), (Gvod_cursorX - i), Gvod_ids[0])) {
                    Gvod_removeFocus();
                    Gvod_cursorY--;
                    Gvod_cursorX = Gvod_cursorX - i;
                    Gvod_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((Gvod_cursorY + 1), (Gvod_cursorX - i), Gvod_ids[0])) {
                    Gvod_removeFocus();
                    Gvod_cursorY++;
                    Gvod_cursorX = Gvod_cursorX - i;
                    Gvod_addFocus();
                    break;
                }
            }
            break;
        case KEY_CHANNELUP:
            Gvod_periodNumber++;
            if (Gvod_periodNumber > 4) Gvod_periodNumber = 1;
            Gvod_StartLoad();
            break;
        case KEY_CHANNELDOWN:
            Gvod_periodNumber--;
            if (Gvod_periodNumber < 1) Gvod_periodNumber = 4;
            Gvod_StartLoad();
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            Gvod_highlight = !Gvod_highlight;
            localStorage.setItem('Gvod_highlight', Gvod_highlight ? 'true' : 'false');
            Gvod_StartLoad();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Svod_vodId = document.getElementById(Gvod_ids[8] + Gvod_cursorY + '_' + Gvod_cursorX).getAttribute(Main_DataAttribute).split(',');
            Svod_DurationSeconds = parseInt(Svod_vodId[1]);
            Svod_language = Svod_vodId[2];
            Play_gameSelected = Svod_vodId[3];
            Main_selectedChannel = Svod_vodId[4];
            Svod_vodId = Svod_vodId[0].substr(1);

            Svod_title = '';
            Main_selectedChannelDisplayname = document.getElementById(Gvod_ids[3] + Gvod_cursorY + '_' + Gvod_cursorX).textContent;
            Svod_createdAt = document.getElementById(Gvod_ids[4] + Gvod_cursorY + '_' + Gvod_cursorX).textContent;
            Svod_Duration = document.getElementById(Gvod_ids[5] + Gvod_cursorY + '_' + Gvod_cursorX).textContent;
            Svod_views = document.getElementById(Gvod_ids[11] + Gvod_cursorY + '_' + Gvod_cursorX).innerHTML +
                ', ' + document.getElementById(Gvod_ids[6] + Gvod_cursorY + '_' + Gvod_cursorX).textContent;
            Gvod_openStream();
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            Gvod_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            if (!Search_isSearching) Main_BeforeSearch = Main_Gvod;
            Main_Go = Main_Search;
            Gvod_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}

function Gvod_openStream() {
    document.body.addEventListener("keydown", PlayVod_handleKeyDown, false);
    document.body.removeEventListener("keydown", Gvod_handleKeyDown);
    Main_ShowElement('scene2');
    PlayVod_hidePanel();
    Play_hideChat();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_CleanHideExit();
    Vod_isVod = true;
    Main_HideElement('scene1');
    PlayVod_Start();
}

function Gvod_SetPeriod() {
    if (Gvod_periodNumber === 1) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter((Gvod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_DAY + ': ' + Main_gameSelected));
        Gvod_period = 'day';
    } else if (Gvod_periodNumber === 2) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter((Gvod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_WEEK + ': ' + Main_gameSelected));
        Gvod_period = 'week';
    } else if (Gvod_periodNumber === 3) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter((Gvod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_MONTH + ': ' + Main_gameSelected));
        Gvod_period = 'month';
    } else if (Gvod_periodNumber === 4) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter((Gvod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_ALL + ': ' + Main_gameSelected));
        Gvod_period = 'all';
    }
    localStorage.setItem('Gvod_periodNumber', Gvod_periodNumber);
}