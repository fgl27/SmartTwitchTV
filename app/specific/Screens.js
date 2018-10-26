//Variable initialization
var inUseObj;

//Initiate all Main screens obj and they properties
function Screens_InitScreens() {
    console.log('InitScreens place holder');
    Main_ThumbWidth = window.innerWidth;
    //98% of window size with is the size of screens table width
    Main_ThumbWidth = Main_ThumbWidth - ((Main_ThumbWidth * 2) / 100);
}

//Initiate all Secondary screens obj and they properties
function Screens_InitSecondaryScreens() {
    //Clips screens
    ScreensObj_InitClip();
    ScreensObj_InitChannelClip();
    ScreensObj_InitAGameClip();
}

function Screens_ScreenIds(base) {
    return [base + '_thumbdiv', base + '_img', base + '_infodiv', base + '_title', base + '_createdon', base + '_game', base + '_viwers', base + '_duration', base + '_cell', 'cpempty_', base + '_scroll', base + '_lang'];
}

function Screens_assign() {
    var ret = {},
        i = 0,
        j;
    for (i; i < arguments.length; i += 1) {

        var obj = arguments[i],
            keys = Object.keys(obj);

        for (j = 0; j < keys.length; j += 1)
            ret[keys[j]] = obj[keys[j]];

    }
    return ret;
}

//Variable initialization end

function Screens_init() {
    Main_Go = inUseObj.screen;
    inUseObj.label_init();

    document.body.addEventListener("keydown", Screens_handleKeyDown, false);
    if (inUseObj.status) {
        Main_YRst(inUseObj.posY);
        Main_ShowElement(inUseObj.ids[10]);
        Main_CounterDialog(inUseObj.posX, inUseObj.posY, inUseObj.ColoumnsCount, inUseObj.itemsCount);
    } else Screens_StartLoad();
}

function Screens_exit() {
    inUseObj.label_exit();
    document.body.removeEventListener("keydown", Screens_handleKeyDown);
    Main_HideElement(inUseObj.ids[10]);
}

function Screens_StartLoad() {
    Main_HideElement(inUseObj.ids[10]);
    Main_HideWarningDialog();
    Main_showLoadDialog();
    inUseObj.cursor = null;
    inUseObj.status = false;
    inUseObj.row = document.createElement('div');
    Main_empty(inUseObj.table);
    inUseObj.MaxOffset = 0;
    inUseObj.idObject = {};
    inUseObj.itemsCountCheck = false;
    inUseObj.FirstLoad = true;
    inUseObj.emptyContent = false;
    inUseObj.itemsCount = 0;
    inUseObj.posX = 0;
    inUseObj.posY = 0;
    inUseObj.row_id = 0;
    inUseObj.coloumn_id = 0;
    inUseObj.data = null;
    inUseObj.data_cursor = 0;
    inUseObj.dataEnded = false;
    Main_CounterDialogRst();
    Screens_loadDataPrepare();
    Screens_loadDataRequest();
}

function Screens_loadDataPrepare() {
    inUseObj.loadingData = true;
    inUseObj.loadingDataTry = 0;
    inUseObj.loadingDataTimeout = 3500;
}

function Screens_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        inUseObj.set_url();
        xmlHttp.open("GET", inUseObj.url, true);

        xmlHttp.timeout = inUseObj.loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) inUseObj.concatenate(xmlHttp.responseText);
                else Screens_loadDataError();
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        inUseObj.Screens_loadDataError();
    }
}

function Screens_loadDataError() {
    inUseObj.loadingDataTry++;
    if (inUseObj.loadingDataTry < inUseObj.loadingDataTryMax) {
        inUseObj.loadingDataTimeout += 500;
        Screens_loadDataRequest();
    } else {
        inUseObj.loadingData = false;
        if (!inUseObj.itemsCount) {
            inUseObj.FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else inUseObj.dataEnded = true;
    }
}

function Screens_loadDataSuccessClip() {
    var response_items = (inUseObj.data.length - inUseObj.data_cursor);
    var dataEnded = false;

    //Use appendDiv only if is the intention to add on it run of loadDataSuccess to the row less content then ColoumnsCount,
    //with will make the row not be full, intentionally to add more in a new run of loadDataSuccess to that same row

    //If the intention is to load less then ColoumnsCount for it row consistently (have multiple not full rows), this function needs to be reworked appendDiv will not solve it, and that doesn't make sense for most screens.

    //appendDiv doesn't applies if the content end and we have less then ColoumnsCount to add for the last row

    //var appendDiv = !inUseObj.coloumn_id;

    if (response_items > inUseObj.ItemsLimit) response_items = inUseObj.ItemsLimit;
    else dataEnded = true;

    if (response_items) {
        var response_rows = Math.ceil(response_items / inUseObj.ColoumnsCount);

        var cell,
            max_row = inUseObj.row_id + response_rows;

        for (inUseObj.row_id; inUseObj.row_id < max_row; inUseObj.row_id++) {

            if (inUseObj.coloumn_id === inUseObj.ColoumnsCount) {
                inUseObj.row = document.createElement('div');
                inUseObj.coloumn_id = 0;
                //appendDiv = true;
            }

            for (inUseObj.coloumn_id; inUseObj.coloumn_id < inUseObj.ColoumnsCount && inUseObj.data_cursor < inUseObj.data.length; inUseObj.data_cursor++) {

                cell = inUseObj.data[inUseObj.data_cursor];

                if (!inUseObj.idObject[cell.tracking_id]) {

                    inUseObj.itemsCount++;
                    inUseObj.idObject[cell.tracking_id] = 1;

                    inUseObj.row.appendChild(Screens_createCellClip(inUseObj.row_id,
                        inUseObj.coloumn_id,
                        inUseObj.ids,
                        cell.thumbnails.medium,
                        cell.broadcaster.display_name,
                        [STR_CREATED_AT,
                            Main_videoCreatedAt(cell.created_at)
                        ],
                        [twemoji.parse(cell.title), STR_PLAYING, cell.game],
                        Main_addCommas(cell.views),
                        '[' + cell.language.toUpperCase() + ']',
                        cell.duration,
                        cell.slug,
                        cell.broadcaster.name,
                        cell.broadcaster.logo.replace("150x150", "300x300"),
                        cell.broadcaster.id,
                        (cell.vod !== null ? cell.vod.id : null),
                        (cell.vod !== null ? cell.vod.offset : null)));

                    inUseObj.coloumn_id++;
                }
            }
            //if (appendDiv)
            document.getElementById(inUseObj.table).appendChild(inUseObj.row);
        }

    } else if (!inUseObj.status) inUseObj.emptyContent = true;
    Screens_loadDataSuccessFinish(IMG_404_VIDEO, STR_NO + STR_CLIPS);
}

function Screens_createCellClip(row_id, coloumn_id, idArray, thumbnail, display_name, created_at, title_game, views, language, duration, video_id, name, logo, streamer_id, vod_id, vod_offset) {

    var id = row_id + '_' + coloumn_id;

    Main_imgVectorPush(idArray[1] + id, thumbnail);
    if (row_id < inUseObj.ColoumnsCount) Main_CacheImage(thumbnail); //try to pre cache first 3 rows

    Main_td = document.createElement('div');
    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.style.cssText = inUseObj.ThumbCssText;

    Main_td.setAttribute(Main_DataAttribute, JSON.stringify([video_id,
        duration,
        title_game[2],
        name,
        display_name,
        logo,
        streamer_id,
        vod_id,
        vod_offset,
        title_game[0],
        language,
        title_game[1] + title_game[2]
    ]));

    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_video"><div><img id="' +
        idArray[1] + id + '" class="stream_img"></div><div id="' +
        idArray[2] + id + '" class="stream_text2"><div id="' +
        idArray[3] + id + '" class="stream_info" style="width: 72%; display: inline-block; font-size: 155%;">' +
        display_name + '</div><div id="' + idArray[7] + id +
        '"class="stream_info" style="width:27%; float: right; text-align: right; display: inline-block;">' + language +
        '</div><div><div id="' + idArray[4] + id + '"class="stream_info" style="width: 59%; display: inline-block;">' +
        created_at[0] + created_at[1] + '</div><div id="' + idArray[5] + id +
        '"class="stream_info" style="width: 39%; display: inline-block; float: right; text-align: right;">' +
        STR_DURATION + Play_timeS(duration) + '</div></div><div id="' + idArray[11] + id + '"class="stream_info">' +
        title_game[0] + STR_BR + title_game[1] + title_game[2] + '</div><div id="' + idArray[6] + id +
        '"class="stream_info">' + views + STR_VIEWS + '</div></div></div>';

    return Main_td;
}

function Screens_loadDataSuccessFinish(img_404, empty_str) {
    Main_ready(function() {
        if (!inUseObj.status) {
            Main_HideLoadDialog();
            if (inUseObj.emptyContent) Main_showWarningDialog(empty_str);
            else {
                inUseObj.status = true;
                Main_imgVectorLoad(img_404);
                Screens_addFocus();
            }
            Main_ShowElement(inUseObj.ids[10]);
            inUseObj.FirstLoad = false;
        } else {
            Main_imgVectorLoad(img_404);
            Main_CounterDialog(inUseObj.posX, inUseObj.posY, inUseObj.ColoumnsCount, inUseObj.itemsCount);
        }
    });
}

function Screens_addFocus() {
    Main_addFocusVideo(inUseObj.posY, inUseObj.posX, inUseObj.ids, inUseObj.ColoumnsCount, inUseObj.itemsCount);

    if ((inUseObj.posY + inUseObj.ItemsReloadLimit) > (inUseObj.itemsCount / inUseObj.ColoumnsCount) && inUseObj.data_cursor < inUseObj.data.length) {
        Main_imgVectorRst();
        inUseObj.loadDataSuccess();
    }

    //Load more as the data is getting used
    if ((inUseObj.data_cursor + (inUseObj.ItemsLimit * 2)) > inUseObj.data.length && !inUseObj.dataEnded && !inUseObj.loadingData) {
        Screens_loadDataPrepare();
        Screens_loadDataRequest();
    }
}

function Screens_removeFocus() {
    Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
}

function ChangeFocus(y, x) {
    Screens_removeFocus();
    inUseObj.posY += y;
    inUseObj.posX = x;
    Screens_addFocus();
}

function Screens_BasicExit(before) {
    if (Main_isControlsDialogShown()) Main_HideControlsDialog();
    else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
    else {
        if (before === inUseObj.screen) Main_Go = Main_Live;
        else Main_Go = before;
        Screens_exit();
        Main_SwitchScreen();
    }
}

function Screens_handleKeyDown(event) {
    if (inUseObj.FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            inUseObj.key_exit();
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((inUseObj.posY), (inUseObj.posX - 1), inUseObj.ids[0]))
                ChangeFocus(0, (inUseObj.posX - 1));
            else {
                for (i = (inUseObj.ColoumnsCount - 1); i > -1; i--) {
                    if (Main_ThumbNull((inUseObj.posY - 1), i, inUseObj.ids[0])) {
                        ChangeFocus(-1, i);
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((inUseObj.posY), (inUseObj.posX + 1), inUseObj.ids[0]))
                ChangeFocus(0, (inUseObj.posX + 1));
            else if (Main_ThumbNull((inUseObj.posY + 1), 0, inUseObj.ids[0]))
                ChangeFocus(1, 0);
            break;
        case KEY_UP:
            for (i = 0; i < inUseObj.ColoumnsCount; i++) {
                if (Main_ThumbNull((inUseObj.posY - 1), (inUseObj.posX - i), inUseObj.ids[0])) {
                    ChangeFocus(-1, inUseObj.posX - i);
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < inUseObj.ColoumnsCount; i++) {
                if (Main_ThumbNull((inUseObj.posY + 1), (inUseObj.posX - i), inUseObj.ids[0])) {
                    ChangeFocus(1, inUseObj.posX - i);
                    break;
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            if (!inUseObj.loadingData) Screens_StartLoad();
            break;
        case KEY_CHANNELUP:
            inUseObj.key_channelup();
            break;
        case KEY_CHANNELDOWN:
            inUseObj.key_channeldown();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            inUseObj.key_play();
            break;
        case KEY_RED:
            Main_SidePannelStart(Screens_handleKeyDown);
            break;
        case KEY_GREEN:
            inUseObj.key_green();
            break;
        case KEY_YELLOW:
            inUseObj.key_yellow();
            break;
        case KEY_BLUE:
            inUseObj.key_blue();
            break;
        default:
            break;
    }
}