//Variable initialization
var AGameClip_cursorY = 0;
var AGameClip_cursorX = 0;
var AGameClip_dataEnded = false;
var AGameClip_itemsCount = 0;
var AGameClip_idObject = {};
var AGameClip_emptyCellVector = [];
var AGameClip_loadingData = false;
var AGameClip_loadingDataTry = 0;
var AGameClip_loadingDataTryMax = 5;
var AGameClip_loadingDataTimeout = 3500;
var AGameClip_ReplacedataEnded = false;
var AGameClip_MaxOffset = 0;
var AGameClip_emptyContent = false;

var AGameClip_ids = ['agc_thumbdiv', 'agc_img', 'agc_infodiv', 'agc_title', 'agc_createdon', 'agc_game', 'agc_viwers', 'agc_duration', 'agc_cell', 'gcpempty_', 'a_game_clip_scroll', 'agc_lang'];
var AGameClip_status = false;
var AGameClip_cursor = null;
var AGameClip_periodNumber = 2;
var AGameClip_period = 'week';
var AGameClip_itemsCountCheck = false;
var AGameClip_OldgameSelected = '';
var AGameClip_FirstLoad = false;
//Variable initialization end

function AGameClip_init() {
    Main_Go = Main_AGameClip;
    AGameClip_SetPeriod();
    Main_AddClass('top_bar_game', 'icon_center_focus');

    Main_IconLoad('label_extra', 'icon-arrow-circle-left', STR_GOBACK);
    Main_ShowElement('label_extra');

    Main_IconLoad('label_switch', 'icon-history', STR_SWITCH_CLIP + STR_KEY_UP_DOWN);

    document.body.addEventListener("keydown", AGameClip_handleKeyDown, false);
    Main_YRst(AGameClip_cursorY);

    if (AGameClip_OldgameSelected === Main_gameSelected && AGameClip_status) {
        Main_YRst(AGameClip_cursorY);
        Main_ShowElement(AGameClip_ids[10]);
        Main_CounterDialog(AGameClip_cursorX, AGameClip_cursorY, Main_ColoumnsCountVideo, AGameClip_itemsCount);
    } else AGameClip_StartLoad();
}

function AGameClip_exit() {
    document.body.removeEventListener("keydown", AGameClip_handleKeyDown);
    Main_RemoveClass('top_bar_game', 'icon_center_focus');
    Main_innerHTML('top_bar_game', STR_GAMES);

    Main_HideElement('label_extra');
    Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
    Main_HideElement(AGameClip_ids[10]);
}

function AGameClip_StartLoad() {
    Main_HideElement(AGameClip_ids[10]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    AGameClip_OldgameSelected = Main_gameSelected;
    AGameClip_cursor = null;
    AGameClip_status = false;
    Main_empty('stream_table_a_game_clip');
    AGameClip_ReplacedataEnded = false;
    AGameClip_MaxOffset = 0;
    AGameClip_idObject = {};
    AGameClip_emptyCellVector = [];
    AGameClip_itemsCountCheck = false;
    AGameClip_FirstLoad = true;
    AGameClip_itemsCount = 0;
    AGameClip_cursorX = 0;
    AGameClip_cursorY = 0;
    AGameClip_dataEnded = false;
    Main_CounterDialogRst();
    AGameClip_loadDataPrepare();
    AGameClip_loadDataRequest();
}

function AGameClip_loadDataPrepare() {
    Main_imgVectorRst();
    AGameClip_loadingData = true;
    AGameClip_loadingDataTry = 0;
    AGameClip_loadingDataTimeout = 3500;
}

function AGameClip_SetPeriod() {
    if (AGameClip_periodNumber === 1) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter(STR_CLIPS +
            STR_CLIP_DAY + ': ' + Main_gameSelected));
        AGameClip_period = 'day';
    } else if (AGameClip_periodNumber === 2) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter(STR_CLIPS +
            STR_CLIP_WEEK + ': ' + Main_gameSelected));
        AGameClip_period = 'week';
    } else if (AGameClip_periodNumber === 3) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter(STR_CLIPS +
            STR_CLIP_MONTH + ': ' + Main_gameSelected));
        AGameClip_period = 'month';
    } else if (AGameClip_periodNumber === 4) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter(STR_CLIPS +
            STR_CLIP_ALL + ': ' + Main_gameSelected));
        AGameClip_period = 'all';
    }
    localStorage.setItem('AGameClip_periodNumber', AGameClip_periodNumber);
}

function AGameClip_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?game=' +
            encodeURIComponent(Main_gameSelected) + '&limit=' + Main_ItemsLimitVideo +
            '&period=' + encodeURIComponent(AGameClip_period) +
            (AGameClip_cursor === null ? '' : '&cursor=' + encodeURIComponent(AGameClip_cursor)) + '&' +
            Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = AGameClip_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    AGameClip_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else AGameClip_loadDataError();
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AGameClip_loadDataError();
    }
}

function AGameClip_loadDataError() {
    AGameClip_loadingDataTry++;
    if (AGameClip_loadingDataTry < AGameClip_loadingDataTryMax) {
        AGameClip_loadingDataTimeout += 500;
        AGameClip_loadDataRequest();
    } else {
        AGameClip_loadingData = false;
        if (!AGameClip_itemsCount) {
            AGameClip_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            AGameClip_dataEnded = true;
            AGameClip_loadDataSuccessFinish();
        }
    }
}

function AGameClip_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.clips.length;
    var offset_itemsCount = AGameClip_itemsCount;
    AGameClip_cursor = response._cursor;

    if (AGameClip_cursor === '') AGameClip_dataEnded = true;
    else {
        // as response_items can be lower then Main_ItemsLimitVideo by 1 and still have more to load
        if (response_items === (Main_ItemsLimitVideo - 1)) AGameClip_itemsCount += 1;
        else if (response_items < Main_ItemsLimitVideo) AGameClip_dataEnded = true;
    }

    AGameClip_itemsCount += response_items;

    AGameClip_emptyContent = !AGameClip_itemsCount;

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
            if (AGameClip_idObject[id]) coloumn_id--;
            else {
                AGameClip_idObject[id] = 1;
                row.appendChild(Vod_createCell(row_id, row_id + '_' + coloumn_id,
                    [video.slug, video.duration, video.game, video.broadcaster.name,
                        video.broadcaster.display_name, video.broadcaster.logo.replace("150x150", "300x300"),
                        video.broadcaster.id, (video.vod !== null ? video.vod.id : null),
                        (video.vod !== null ? video.vod.offset : null)
                    ],
                    [video.thumbnails.medium, video.broadcaster.display_name,
                        STR_CREATED_AT + Main_videoCreatedAt(video.created_at),
                        twemoji.parse(twemoji.parse(video.title)) + STR_BR + STR_PLAYING + video.game,
                        Main_addCommas(video.views) + STR_VIEWS,
                        '[' + video.language.toUpperCase() + ']', STR_DURATION + Play_timeS(video.duration), null
                    ], AGameClip_ids));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (AGameClip_dataEnded && !AGameClip_itemsCountCheck) {
                AGameClip_itemsCountCheck = true;
                AGameClip_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(AGameClip_ids[9] + row_id + '_' + coloumn_id));
            AGameClip_emptyCellVector.push(AGameClip_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_a_game_clip").appendChild(row);
    }

    AGameClip_loadDataSuccessFinish();
}

function AGameClip_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!AGameClip_status) {
            Main_HideLoadDialog();
            if (AGameClip_emptyContent) Main_showWarningDialog(STR_NO + STR_CLIPS);
            else {
                AGameClip_status = true;
                Main_imgVectorLoad(IMG_404_VIDEO);
                AGameClip_addFocus();
            }
            Main_ShowElement(AGameClip_ids[10]);
            AGameClip_FirstLoad = false;
        } else {
            Main_imgVectorLoad(IMG_404_VIDEO);
            if (AGameClip_emptyCellVector.length > 0 && !AGameClip_dataEnded) {
                AGameClip_loadDataPrepare();
                AGameClip_loadDataReplace();
                return;
            } else AGameClip_emptyCellVector = [];

        }
        AGameClip_loadingData = false;
    });
}

function AGameClip_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?game=' +
            encodeURIComponent(Main_gameSelected) + '&limit=100&period=' + encodeURIComponent(AGameClip_period) + '&cursor=' +
            encodeURIComponent(AGameClip_cursor) +
            '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = AGameClip_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    AGameClip_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                } else AGameClip_loadDataErrorReplace();
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AGameClip_loadDataErrorReplace();
    }
}

function AGameClip_loadDataErrorReplace() {
    AGameClip_loadingDataTry++;
    if (AGameClip_loadingDataTry < AGameClip_loadingDataTryMax) {
        AGameClip_loadingDataTimeout += 500;
        AGameClip_loadDataReplace();
    } else {
        AGameClip_ReplacedataEnded = true;
        AGameClip_itemsCount -= AGameClip_emptyCellVector.length;
        AGameClip_emptyCellVector = [];
        AGameClip_loadDataSuccessFinish();
    }
}

function AGameClip_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.clips.length,
        video, id, i = 0,
        cursor = 0,
        tempVector = [];

    if (response._cursor === '' || !response_items) AGameClip_dataEnded = true;

    for (i; i < AGameClip_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.clips[cursor];
        id = video.tracking_id;
        if (AGameClip_idObject[id]) i--;
        else {
            AGameClip_idObject[id] = 1;
            Vod_replaceVideo(AGameClip_emptyCellVector[i],
                [video.slug, video.duration, video.game, video.broadcaster.name,
                    video.broadcaster.display_name, video.broadcaster.logo.replace("150x150", "300x300"),
                    video.broadcaster.id, (video.vod !== null ? video.vod.id : null),
                    (video.vod !== null ? video.vod.offset : null)
                ],
                [video.thumbnails.medium,
                    video.broadcaster.display_name,
                    STR_CREATED_AT + Main_videoCreatedAt(video.created_at),
                    twemoji.parse(twemoji.parse(video.title)) + STR_BR + STR_PLAYING + video.game,
                    Main_addCommas(video.views) + STR_VIEWS,
                    '[' + video.language.toUpperCase() + ']', STR_DURATION + Play_timeS(video.duration), null
                ], AGameClip_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) AGameClip_emptyCellVector.splice(tempVector[i], 1);

    if (AGameClip_emptyCellVector.length || AGameClip_dataEnded) {
        AGameClip_dataEnded = true;
        AGameClip_itemsCount -= AGameClip_emptyCellVector.length;
        AGameClip_emptyCellVector = [];
        AGameClip_loadDataSuccessFinish();
    } else {
        AGameClip_loadingDataTry = 0;
        AGameClip_loadingDataTimeout = 3500;
        AGameClip_SetCursor(cursor);
    }
}

function AGameClip_SetCursor(cursor) {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?limit=' + cursor + '&period=' +
            encodeURIComponent(AGameClip_period) + '&cursor=' + encodeURIComponent(AGameClip_cursor) +
            '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = AGameClip_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    AGameClip_cursor = JSON.parse(xmlHttp.responseText)._cursor;
                    if (AGameClip_cursor === '') AGameClip_dataEnded = true;
                    AGameClip_loadDataSuccessFinish();
                    return;
                } else AGameClip_SetCursorReplace(cursor);
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AGameClip_SetCursorReplace(cursor);
    }
}

function AGameClip_SetCursorReplace(cursor) {
    AGameClip_loadingDataTry++;
    if (AGameClip_loadingDataTry < 10) {
        AGameClip_loadingDataTimeout += 500;
        AGameClip_SetCursor(cursor);
    } else {
        AGameClip_dataEnded = true;
        AGameClip_itemsCount -= AGameClip_emptyCellVector.length;
        AGameClip_emptyCellVector = [];
        AGameClip_loadDataSuccessFinish();
    }
}

function AGameClip_addFocus() {
    Main_addFocusVideo(AGameClip_cursorY, AGameClip_cursorX, AGameClip_ids, Main_ColoumnsCountVideo, AGameClip_itemsCount);

    if (((AGameClip_cursorY + Main_ItemsReloadLimitVideo) > (AGameClip_itemsCount / Main_ColoumnsCountVideo)) &&
        !AGameClip_dataEnded && !AGameClip_loadingData) {
        AGameClip_loadDataPrepare();
        AGameClip_loadDataRequest();
    }
}

function AGameClip_removeFocus() {
    Main_removeFocus(AGameClip_cursorY + '_' + AGameClip_cursorX, AGameClip_ids);
}

function AGameClip_handleKeyDown(event) {
    if (AGameClip_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                Main_Go = Main_aGame;
                AGameClip_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((AGameClip_cursorY), (AGameClip_cursorX - 1), AGameClip_ids[0])) {
                AGameClip_removeFocus();
                AGameClip_cursorX--;
                AGameClip_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((AGameClip_cursorY - 1), i, AGameClip_ids[0])) {
                        AGameClip_removeFocus();
                        AGameClip_cursorY--;
                        AGameClip_cursorX = i;
                        AGameClip_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((AGameClip_cursorY), (AGameClip_cursorX + 1), AGameClip_ids[0])) {
                AGameClip_removeFocus();
                AGameClip_cursorX++;
                AGameClip_addFocus();
            } else if (Main_ThumbNull((AGameClip_cursorY + 1), 0, AGameClip_ids[0])) {
                AGameClip_removeFocus();
                AGameClip_cursorY++;
                AGameClip_cursorX = 0;
                AGameClip_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((AGameClip_cursorY - 1), (AGameClip_cursorX - i), AGameClip_ids[0])) {
                    AGameClip_removeFocus();
                    AGameClip_cursorY--;
                    AGameClip_cursorX = AGameClip_cursorX - i;
                    AGameClip_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((AGameClip_cursorY + 1), (AGameClip_cursorX - i), AGameClip_ids[0])) {
                    AGameClip_removeFocus();
                    AGameClip_cursorY++;
                    AGameClip_cursorX = AGameClip_cursorX - i;
                    AGameClip_addFocus();
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            AGameClip_StartLoad();
            break;
        case KEY_CHANNELUP:
            AGameClip_periodNumber++;
            if (AGameClip_periodNumber > 4) AGameClip_periodNumber = 1;
            AGameClip_SetPeriod();
            AGameClip_StartLoad();
            break;
        case KEY_CHANNELDOWN:
            AGameClip_periodNumber--;
            if (AGameClip_periodNumber < 1) AGameClip_periodNumber = 4;
            AGameClip_SetPeriod();
            AGameClip_StartLoad();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            ChannelClip_playUrl = JSON.parse(document.getElementById(AGameClip_ids[8] + AGameClip_cursorY + '_' + AGameClip_cursorX).getAttribute(Main_DataAttribute));
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
            ChannelClip_createdAt = document.getElementById(AGameClip_ids[4] + AGameClip_cursorY + '_' + AGameClip_cursorX).textContent;
            ChannelClip_Duration = document.getElementById(AGameClip_ids[5] + AGameClip_cursorY + '_' + AGameClip_cursorX).textContent;
            ChannelClip_views = document.getElementById(AGameClip_ids[6] + AGameClip_cursorY + '_' + AGameClip_cursorX).textContent;
            ChannelClip_language = document.getElementById(AGameClip_ids[7] + AGameClip_cursorY + '_' + AGameClip_cursorX).textContent;
            ChannelClip_game = document.getElementById(AGameClip_ids[11] + AGameClip_cursorY + '_' + AGameClip_cursorX).innerHTML;
            AGameClip_openStream();
            break;
        case KEY_RED:
            Main_SidePannelStart(AGameClip_handleKeyDown);
            break;
        case KEY_GREEN:
            AGameClip_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            if (!Search_isSearching) Main_BeforeSearch = Main_AGameClip;
            Main_Go = Main_Search;
            AGameClip_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}

function AGameClip_openStream() {
    document.body.addEventListener("keydown", PlayClip_handleKeyDown, false);
    document.body.removeEventListener("keydown", AGameClip_handleKeyDown);
    Main_ShowElement('scene2');
    Play_hideChat();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_CleanHideExit();
    Main_HideElement('scene1');

    PlayClip_Start();
}