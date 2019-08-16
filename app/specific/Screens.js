//Variable initialization
var inUseObj = {};

//Initiate all Main screens obj and they properties
function Screens_InitScreens() {
    console.log('InitScreens place holder');
}

//Initiate all Secondary screens obj and they properties
function Screens_InitSecondaryScreens() {
    //Live screens
    ScreensObj_InitLive();
    ScreensObj_InitFeatured();
    ScreensObj_InitAGame();
    //Live user screens
    ScreensObj_InitUserHost();
    ScreensObj_InitUserLive();

    //Clips screens
    ScreensObj_InitClip();
    ScreensObj_InitChannelClip();
    ScreensObj_InitAGameClip();

    //Games screens
    ScreensObj_InitGame();
    //Games user screen
    ScreensObj_InitUserGames();

    //Vod screens
    ScreensObj_InitVod();
    ScreensObj_InitAGameVod();
    ScreensObj_InitChannelVod();
    //Vod user screen
    ScreensObj_InitUserVod();

    //Channels screens
    ScreensObj_InitUserChannels();

    //Search screen
    ScreensObj_InitSearchGames();
    ScreensObj_InitSearchLive();
    ScreensObj_InitSearchChannels();
}

//TODO cleanup not used when finished migrate all
function Screens_ScreenIds(base) {
    return [base + '_thumbdiv',
        base + '_img',
        base + '_infodiv',
        base + '_title',
        base + '_createdon',
        base + '_game',
        base + '_viewers',
        base + '_duration',
        base + '_cell',
        'cpempty_',
        base + '_scroll',
        base + '_lang',
        base + '_row'
    ];
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
    Main_addFocusVideoOffset = -1;
    Main_values.Main_Go = inUseObj.screen;
    inUseObj.label_init();

    document.body.addEventListener("keydown", Screens_handleKeyDown, false);
    Main_ShowElement(inUseObj.ids[10]);

    if (inUseObj.status) {
        Main_YRst(inUseObj.posY);
        Screens_addFocus(true);
        Main_SaveValues();
    } else Screens_StartLoad();
}

function Screens_exit() {
    Main_addFocusVideoOffset = 0;
    inUseObj.label_exit();
    document.body.removeEventListener("keydown", Screens_handleKeyDown);
    Main_HideElement(inUseObj.ids[10]);
    Main_HideWarningDialog();
}

function Screens_StartLoad() {
    Main_showLoadDialog();
    Main_empty(inUseObj.table);
    Main_HideWarningDialog();
    inUseObj.cursor = null;
    inUseObj.status = false;
    inUseObj.row = document.createElement('div');
    inUseObj.MaxOffset = 0;
    inUseObj.TopRowCreated = false;
    inUseObj.offset = 0;
    inUseObj.idObject = {};
    inUseObj.Cells = [];
    inUseObj.FirstLoad = true;
    inUseObj.itemsCount = 0;
    inUseObj.posX = 0;
    inUseObj.posY = 0;
    inUseObj.row_id = 0;
    inUseObj.currY = 0;
    inUseObj.loadChannelOffsset = 0;
    inUseObj.followerChannels = '';
    inUseObj.followerChannelsDone = false;
    inUseObj.coloumn_id = 0;
    inUseObj.data = null;
    inUseObj.data_cursor = 0;
    inUseObj.dataEnded = false;
    Main_CounterDialogRst();
    Screens_loadDataRequestStart();
}

function Screens_loadDataRequestStart() {
    Screens_loadDataPrepare();
    Screens_loadDataRequest();
}

function Screens_loadDataPrepare() {
    inUseObj.loadingData = true;
    inUseObj.loadingDataTry = 0;
    inUseObj.loadingDataTimeout = 3500;
}

function Screens_loadDataRequest() {
    inUseObj.set_url();
    if (Main_IsNotBrowser && !inUseObj.itemsCount)
        BaseAndroidhttpGet(inUseObj.url, inUseObj.loadingDataTimeout, inUseObj.HeaderQuatity, inUseObj.token, Screens_concatenate, Screens_loadDataError);
    else
        BasexmlHttpGet(inUseObj.url, inUseObj.loadingDataTimeout, inUseObj.HeaderQuatity, inUseObj.token, Screens_concatenate, Screens_loadDataError, false);
}

function Screens_loadDataError() {
    inUseObj.loadingDataTry++;
    if (inUseObj.loadingDataTry < inUseObj.loadingDataTryMax) {
        inUseObj.loadingDataTimeout += 500;
        Screens_loadDataRequest();
    } else Screens_loadDatafail();
}

function Screens_loadDatafail() {
    inUseObj.loadingData = false;
    if (!inUseObj.itemsCount) {
        inUseObj.FirstLoad = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
        inUseObj.key_exit();
        Main_ShowElement('topbar');
    } else inUseObj.dataEnded = true;
}

function Screens_concatenate(responseText) {
    inUseObj.concatenate(responseText);
}

function Screens_loadDataSuccess() {
    var response_items = (inUseObj.data.length - inUseObj.data_cursor);

    //Use appendDiv only if is the intention to add on it run of loadDataSuccess to the row less content then ColoumnsCount,
    //with will make the row not be full, intentionally to add more in a new run of loadDataSuccess to that same row

    //If the intention is to load less then ColoumnsCount for it row consistently (have multiple not full rows), this function needs to be reworked appendDiv will not solve it, and that doesn't make sense for most screens.

    //appendDiv doesn't applies if the content end and we have less then ColoumnsCount to add for the last row

    //var appendDiv = !inUseObj.coloumn_id;
    if (response_items > inUseObj.ItemsLimit) response_items = inUseObj.ItemsLimit;
    else if (!inUseObj.loadingData) inUseObj.dataEnded = true;

    if (inUseObj.HasSwitches && !inUseObj.TopRowCreated) inUseObj.addSwitches();

    if (response_items) {

        if (!inUseObj.row_id) {
            inUseObj.row = document.createElement('div');
            inUseObj.row.id = this.ids[12] + inUseObj.row_id;
        }

        var response_rows = Math.ceil(response_items / inUseObj.ColoumnsCount);

        var max_row = inUseObj.row_id + response_rows;

        for (inUseObj.row_id; inUseObj.row_id < max_row;) {

            if (inUseObj.coloumn_id === inUseObj.ColoumnsCount) {
                inUseObj.row = document.createElement('div');
                inUseObj.row.id = this.ids[12] + inUseObj.row_id;
                inUseObj.coloumn_id = 0;
            }

            for (inUseObj.coloumn_id; inUseObj.coloumn_id < inUseObj.ColoumnsCount && inUseObj.data_cursor < inUseObj.data.length; inUseObj.data_cursor++) {
                //TODO understand and fix before the code reaches this point way a cell is undefined some times
                if (inUseObj.data[inUseObj.data_cursor]) inUseObj.addCell(inUseObj.data[inUseObj.data_cursor]);
            }

            //doc.appendChild(inUseObj.row);
            if (inUseObj.coloumn_id === inUseObj.ColoumnsCount) {
                inUseObj.Cells[inUseObj.row_id] = inUseObj.row;
                inUseObj.row_id++;
            } else if (inUseObj.data_cursor >= inUseObj.data.length) {
                if (inUseObj.row.innerHTML !== '') inUseObj.Cells[inUseObj.row_id] = inUseObj.row;
                break;
            }
        }
    }
    inUseObj.emptyContent = !response_items && !inUseObj.status;
    Screens_loadDataSuccessFinish();
}

function Screens_createCellBase(row_id, coloumn_id) {

    var id = row_id + '_' + coloumn_id;

    Main_td = document.createElement('div');
    Main_td.style.cssText = inUseObj.ThumbCssText;

    return id;
}

function Screens_createCellGame(row_id, coloumn_id, idArray, thumbnail, game_name, views) {

    var id = Screens_createCellBase(row_id, coloumn_id);

    Main_td.setAttribute('id', idArray[5] + id);
    Main_td.setAttribute(Main_DataAttribute, game_name);

    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_game"><div><img id="' +
        idArray[1] + id + '" class="lazy stream_img" alt="" data-src="' + thumbnail +
        '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\'"></div><div id="' +
        idArray[2] + id + '" class="stream_text2"><div id="<div id="' +
        idArray[3] + id + '" class="stream_channel">' + game_name + '</div>' +
        (views !== '' ? '<div id="' + idArray[4] + id + '"class="stream_info_games" style="width: 100%; display: inline-block;">' + views + '</div>' : '') +
        '</div></div>';

    return Main_td;
}

//TODO Reduce the number of vars here please
function Screens_createCellClip(row_id, coloumn_id, idArray, thumbnail, display_name, created_at, title_game, views, language, duration, video_id, name, logo, streamer_id, vod_id, vod_offset) {

    var id = Screens_createCellBase(row_id, coloumn_id);
    var playing = (title_game[2] !== "" ? title_game[1] + title_game[2] : "");
    Main_td.setAttribute('id', idArray[8] + id);
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
        playing
    ]));
    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_clip"><div><img id="' +
        idArray[1] + id + '" class="lazy stream_img" alt="" data-src="' + thumbnail +
        '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\'"></div><div id="' +
        idArray[2] + id + '" class="stream_text2"><div style="line-height: 12px;"><div id="' +
        idArray[3] + id + '" class="stream_channel" style="width: 72%; display: inline-block;">' +
        display_name + '</div><div id="' + idArray[7] + id +
        '"class="stream_info" style="width:27%; float: right; text-align: right; display: inline-block;">' + language +
        '</div></div><div id="' + idArray[11] + id + '"class="stream_info">' +
        title_game[0] + STR_BR + playing + '</div><div id="' + idArray[6] + id +
        '"class="stream_info">' + views + STR_VIEWS + '</div><div  style="line-height: 10px;"><div id="' +
        idArray[4] + id + '"class="stream_info" style="width: 59%; display: inline-block;">' +
        created_at[0] + created_at[1] + '</div><div id="' + idArray[5] + id +
        '"class="stream_info" style="width: 39%; display: inline-block; float: right; text-align: right;">' +
        STR_DURATION + Play_timeS(duration) + '</div></div></div></div>';

    return Main_td;
}

function Screens_createCellLive(row_id, coloumn_id, data, idArray, valuesArray) {

    var id = Screens_createCellBase(row_id, coloumn_id);

    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify(data));

    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_clip"><div><img id="' +
        idArray[1] + id + '" class="lazy stream_img" alt="" data-src="' + valuesArray[0] + Main_randomimg +
        '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\'"></div><div id="' +
        idArray[2] + id + '" class="stream_text2"><div style="line-height: 12px;"><div id="' +
        idArray[3] + id + '" class="stream_channel" style="width: 66%; display: inline-block;">' +
        '<i class="icon-' + (data[2] ? 'refresh' : 'circle') + ' live_icon" style="color: ' + (data[2] ? '#FFFFFF' : valuesArray[1].indexOf(STR_USER_HOSTING) !== -1 ? '#FED000' : 'red') +
        ';"></i> ' + valuesArray[1] + '</div><div id="' + idArray[7] + id +
        '"class="stream_info" style="width:33%; float: right; text-align: right; display: inline-block;">' +
        valuesArray[5] + '</div></div>' +
        '<div id="' + idArray[4] + id + '"class="stream_info">' + twemoji.parse(valuesArray[2]) + '</div>' +
        '<div id="' + idArray[5] + id + '"class="stream_info">' + (valuesArray[3] !== "" ? STR_PLAYING + valuesArray[3] : "") +
        '</div>' + '<div id="' + idArray[6] + id + '"class="stream_info">' + valuesArray[4] + '</div></div></div>';

    return Main_td;
}


function Screens_createCellChannel(row_id, coloumn_id, idArray, valuesArray) {

    var id = Screens_createCellBase(row_id, coloumn_id);

    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify(valuesArray));

    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_channel" ><div><img id="' + idArray[1] +
        id + '" alt="" class="lazy stream_img" data-src="' + valuesArray[2] +
        '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\'"></div>' +
        '<div id="' + idArray[2] + id + '" class="stream_text2">' +
        '<div id="' + idArray[3] + id + '" class="stream_channel">' + valuesArray[3] +
        (valuesArray[4] ? STR_SPACE + STR_SPACE + '<img style="display: inline-block; width: 2ch; vertical-align: middle;" alt="" src="' + IMG_PARTNER + '">' : "") +
        '</div></div></div>';

    return Main_td;
}

function Screens_createCellVod(row_id, coloumn_id, data, idArray, valuesArray) {

    var id = Screens_createCellBase(row_id, coloumn_id);

    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify(data));

    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_clip"' +
        (valuesArray[7] ? ' style="background-size: 0 0; background-image: url(' + valuesArray[7] + ');"' : '') +
        '><div><img id="' +
        idArray[1] + id + '" class="lazy stream_img" alt="" data-src="' + valuesArray[0] +
        '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\'"></div><div id="' +
        idArray[2] + id + '" class="stream_text2"><div style="line-height: 12px;"><div id="' +
        idArray[3] + id + '" class="stream_channel" style="width: 72%; display: inline-block;">' +
        valuesArray[1] + '</div><div id="' + idArray[7] + id +
        '"class="stream_info" style="width:27%; float: right; text-align: right; display: inline-block;">' + valuesArray[5] +
        '</div></div><div id="' + idArray[11] + id + '"class="stream_info">' +
        valuesArray[3] + '</div><div id="' + idArray[6] + id +
        '"class="stream_info">' + valuesArray[4] + '</div><div style="line-height: 10px;"><div id="' + idArray[4] + id + '"class="stream_info" style="width: 59%; display: inline-block;">' +
        valuesArray[2] + '</div><div id="' + idArray[5] + id +
        '"class="stream_info" style="width: 39%; display: inline-block; float: right; text-align: right;">' +
        valuesArray[6] + '</div></div></div></div>';

    return Main_td;
}

function Screens_loadDataSuccessFinish() {
    if (!inUseObj.status) {
        if (Main_values.Main_Go === Main_aGame) AGame_Checkfallow();
        if (inUseObj.emptyContent) Main_showWarningDialog(inUseObj.empty_str());
        else {
            inUseObj.status = true;
            var doc = document.getElementById(inUseObj.table);
            for (var i = 0; i < (inUseObj.Cells.length < inUseObj.visiblerows ? inUseObj.Cells.length : inUseObj.visiblerows); i++)
                doc.appendChild(inUseObj.Cells[i]);
        }
        inUseObj.FirstLoad = false;
        //TODO improve this check
        if (Main_FirstRun) {
            if (Settings_value.restor_playback.defaultValue && Main_values.Play_WasPlaying && inUseObj.status) {

                Main_ExitCurrent(Main_values.Main_Go);
                Main_values.Main_Go = Main_GoBefore;
                if (!Main_values.vodOffset) Main_values.vodOffset = 1;
                ChannelVod_DurationSeconds = Main_values.vodOffset + 1;

                Play_showWarningDialog(STR_RESTORE_PLAYBACK_WARN);

                Main_ready(function() {
                    if (Main_values.Play_WasPlaying === 1) Main_openStream();
                    else Main_openVod();

                    Main_SwitchScreen(true);
                    window.setTimeout(function() {
                        if (!Play_IsWarning) Play_HideWarningDialog();
                    }, 2000);
                    Screens_loadDataSuccessFinishEnd();
                });
            } else if (Main_GoBefore !== Main_Live && Main_GoBefore !== Main_addUser &&
                Main_GoBefore !== Main_Search) {
                Main_HideElement(inUseObj.ids[10]);
                Main_ready(function() {
                    Main_ExitCurrent(Main_values.Main_Go);
                    Main_values.Main_Go = Main_GoBefore;
                    Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
                    window.clearTimeout(Main_SetTopOpacityId);
                    Main_UnSetTopOpacity();
                    Main_SwitchScreenAction();
                    if (!Main_newUsercode) Screens_loadDataSuccessFinishEnd();
                    else {
                        Main_FirstRun = false;
                        Main_HideLoadDialog();
                    }
                });
            } else {
                Main_ready(function() {
                    //Values that need to be reset to prevent app odd behavier
                    Main_values.Search_isSearching = false;
                    Main_values.Main_BeforeChannelisSet = false;
                    Main_values.Main_BeforeAgameisSet = false;

                    if (Main_values.Never_run) {
                        Main_showControlsDialog();
                        document.body.removeEventListener("keydown", Screens_handleKeyDown);
                        document.body.addEventListener("keydown", Screens_handleKeyControls, false);
                    }
                    Main_values.Never_run = false;
                    Screens_addFocus(true);
                    Main_SaveValues();
                    Screens_loadDataSuccessFinishEnd();
                });
            }
        } else {
            Screens_addFocus(true);
            Main_SaveValues();
            Screens_loadDataSuccessFinishEnd();
        }
    } else {
        Main_CounterDialog(inUseObj.posX, inUseObj.posY, inUseObj.ColoumnsCount, inUseObj.itemsCount);
    }
}

function Screens_handleKeyControls(event) {
    switch (event.keyCode) {
        case KEY_ENTER:
        case KEY_RETURN:
            Main_HideControlsDialog();
            Main_HideAboutDialog();
            document.body.addEventListener("keydown", Screens_handleKeyDown, false);
            document.body.removeEventListener("keydown", Screens_handleKeyControls);
            Screens_addFocus(true);
            break;
        default:
            break;
    }
}

function Screens_loadDataSuccessFinishEnd() {
    Main_FirstRun = false;
    Main_HideLoadDialog();
    Main_ShowElement('topbar');
}

function Screens_addFocus(forceScroll) {
    if (inUseObj.emptyContent) {
        if (inUseObj.HasSwitches) inUseObj.posY = -1;
        else {
            inUseObj.key_exit();
            return;
        }
    }
    if (inUseObj.posY < 0) {
        Screens_addFocusFallow();
        if (!inUseObj.emptyContent) Main_CounterDialog(inUseObj.posX, inUseObj.posY + 1, inUseObj.ColoumnsCount, inUseObj.itemsCount);
        return;
    }

    //Load more as the data is getting used
    if ((inUseObj.posY > 2) && (inUseObj.data_cursor + Main_ItemsLimitMax) > inUseObj.data.length && !inUseObj.dataEnded && !inUseObj.loadingData) {
        Screens_loadDataRequestStart();
    } else if ((inUseObj.posY + inUseObj.ItemsReloadLimit) > (inUseObj.itemsCount / inUseObj.ColoumnsCount) && inUseObj.data_cursor < inUseObj.data.length) {
        inUseObj.loadDataSuccess();
    }

    inUseObj.addrow(forceScroll, inUseObj.posY);
    if (Main_CenterLablesInUse) Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
    lazyLoadInstance.update();
}

function Screens_ThumbNotNull(thumbnail) {
    return document.getElementById(thumbnail) !== null;
}

function Screens_addrow(forceScroll, y) {
    if (inUseObj.currY < y) { // down
        inUseObj.currY = inUseObj.posY;
        if (y > 1) Screens_addrowDown(y);
    } else if (inUseObj.currY > y) { // Up
        inUseObj.currY = inUseObj.posY;
        if (y > 0 && (inUseObj.Cells.length) > (y + 2)) {
            var doc = document.getElementById(inUseObj.table);
            doc.insertBefore(inUseObj.Cells[y - 1], doc.childNodes[inUseObj.HasSwitches ? 1 : 0]);
            if (Screens_ThumbNotNull(inUseObj.ids[12] + (y + 3)))
                document.getElementById(inUseObj.ids[12] + (y + 3)).remove();
        }
    }

    Screens_addrowEnd(forceScroll);
}

function Screens_addrowDown(y) {
    if (inUseObj.Cells[y + 2]) {
        document.getElementById(inUseObj.table).appendChild(inUseObj.Cells[y + 2]);
        if (Screens_ThumbNotNull(inUseObj.ids[12] + (y - 2)))
            document.getElementById(inUseObj.ids[12] + (y - 2)).remove();
    } else if (inUseObj.loadingData) {
        //Technically we will not get here because
        //Key down or right (inUseObj.Cells.length - 1) >= (inUseObj.posY + 3) will hold the screen
        //but this works, the issue is related to slow to load more content
        //Only happens if scroll too fast
        window.setTimeout(function() {
            Screens_addrowDown(y);
        }, 10);
    }
}

function Screens_addrowChannel(forceScroll, y) {
    if (inUseObj.currY < y) { // down
        inUseObj.currY = inUseObj.posY;
        if (y > 2) Screens_addrowChannelDown(y);
    } else if (inUseObj.currY > y) { // Up
        inUseObj.currY = inUseObj.posY;
        if (y > 1 && (inUseObj.Cells.length) > (y + 3)) {
            var doc = document.getElementById(inUseObj.table);
            doc.insertBefore(inUseObj.Cells[y - 2], doc.childNodes[inUseObj.HasSwitches ? 1 : 0]);
            if (Screens_ThumbNotNull(inUseObj.ids[12] + (y + 3)))
                document.getElementById(inUseObj.ids[12] + (y + 3)).remove();
        }
    }

    Screens_addrowEnd(forceScroll);
}

function Screens_addrowChannelDown(y) {
    if (inUseObj.Cells[y + 2]) {
        document.getElementById(inUseObj.table).appendChild(inUseObj.Cells[y + 2]);
        if (Screens_ThumbNotNull(inUseObj.ids[12] + (y - 3)))
            document.getElementById(inUseObj.ids[12] + (y - 3)).remove();
    } else if (inUseObj.loadingData) {
        //Technically we will not get here because
        //Key down or right (inUseObj.Cells.length - 1) >= (inUseObj.posY + 3) will hold the screen
        //but this works, the issue is related to slow to load more content
        //Only happens if scroll too fast
        window.setTimeout(function() {
            Screens_addrowChannelDown(y);
        }, 10);
    }
}

function Screens_addrowEnd(forceScroll) {
    Main_AddClass(inUseObj.ids[0] + inUseObj.posY + '_' + inUseObj.posX, Main_classThumb);
    Main_CounterDialog(inUseObj.posX, inUseObj.posY, inUseObj.ColoumnsCount, inUseObj.itemsCount);

    inUseObj.addFocus(inUseObj.posY, inUseObj.posX, inUseObj.ids, forceScroll);
}

function Screens_addFocusVideo(y, x, idArray, forceScroll) {
    if (Main_YchangeAddFocus(y) || forceScroll) {
        if (y > 0) {
            if (Main_ThumbNull((y + 1), 0, idArray[0])) {
                Main_ScrollTable(idArray[10],
                    (document.getElementById(idArray[0] + (y - 1) + '_' + x).offsetTop * -1) - 8 +
                    (inUseObj.HasSwitches ? 1 : 0));
            } else Main_handleKeyUp();
        } else Main_ScrollTable(idArray[10], screen.height * 0.07);

    } else Main_handleKeyUp();
}

function Screens_addFocusChannel(y, x, idArray, forceScroll) {
    if (Main_YchangeAddFocus(y) || forceScroll) {

        if (y > 1) {
            if (Main_ThumbNull((y + 1), 0, idArray[0])) {
                Main_ScrollTable(idArray[10],
                    (document.getElementById(idArray[0] + y + '_' + x).offsetTop * -1) + (screen.height * 0.41));
            } else Main_handleKeyUp();
        } else Main_ScrollTable(idArray[10], screen.height * 0.07);

    } else Main_handleKeyUp();
}

function Screens_addFocusGame(y, x, idArray, forceScroll) {
    if (Main_YchangeAddFocus(y) || forceScroll) {

        if (inUseObj.posY < (inUseObj.Cells.length - 1) || forceScroll) {
            Main_ScrollTable((idArray[10] ? idArray[10] : idArray[7]),
                (document.getElementById(idArray[5] + y + '_' + x).offsetTop * -1) + screen.height * 0.025);
        }

    } else if ((inUseObj.Cells.length - 1) === y && (Main_ThumbNull(y - 1, x, idArray[0]))) {

        Main_ScrollTable((idArray[10] ? idArray[10] : idArray[7]),
            (document.getElementById(idArray[5] + (y - 1) + '_' + x).offsetTop * -1) + screen.height * 0.025);
    } else Main_handleKeyUp();
}

function Screens_ChangeFocus(y, x) {
    Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
    if (inUseObj.HasAnimateThumb) Main_ShowElement(inUseObj.ids[1] + inUseObj.posY + '_' + inUseObj.posX);
    inUseObj.posY += y;
    inUseObj.posX = x;
    Screens_addFocus();
}

function Screens_addFocusFallow() {
    if (inUseObj.posX > inUseObj.SwitchesIcons.length - 1) inUseObj.posX = 0;
    else if (inUseObj.posX < 0) inUseObj.posX = inUseObj.SwitchesIcons.length - 1;
    Main_AddClass(inUseObj.ids[0] + 'y_' + inUseObj.posX, Main_classThumb);
}

function Screens_removeFocusFallow() {
    if (inUseObj.posX > inUseObj.SwitchesIcons.length - 1) inUseObj.posX = 0;
    else if (inUseObj.posX < 0) inUseObj.posX = inUseObj.SwitchesIcons.length - 1;
    Main_RemoveClass(inUseObj.ids[0] + 'y_' + inUseObj.posX, Main_classThumb);
}

function Screens_BasicExit(before) {
    if (Main_isControlsDialogShown()) Main_HideControlsDialog();
    else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
    else {
        if (before === inUseObj.screen) Main_values.Main_Go = Main_Live;
        else Main_values.Main_Go = before;
        Screens_exit();
    }
}

function Screens_KeyUpDown(y) {
    //TODO improve this
    if (inUseObj.HasSwitches && !inUseObj.posY && y === -1 && !inUseObj.emptyContent) {
        Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
        if (inUseObj.HasAnimateThumb) {
            window.clearInterval(this.AnimateThumbId);
            Main_ShowElement(inUseObj.ids[1] + inUseObj.posY + '_' + inUseObj.posX);
        }
        inUseObj.posY = -1;
        if (inUseObj.posX > inUseObj.SwitchesIcons.length - 1) inUseObj.posX = 1;
        Screens_addFocusFallow();
    } else if (inUseObj.HasSwitches && (inUseObj.posY) === -1 && (Main_ThumbNull(0, inUseObj.posX, inUseObj.ids[0]))) {
        inUseObj.posY = 0;
        Screens_addFocus();
        Screens_removeFocusFallow();
    } else {
        for (var i = 0; i < inUseObj.ColoumnsCount; i++) {
            if (Main_ThumbNull((inUseObj.posY + y), (inUseObj.posX - i), inUseObj.ids[0])) {
                Screens_ChangeFocus(y, inUseObj.posX - i);
                return;
            }
        }
    }
}

function Screens_KeyLeftRight(y, x) {
    if (inUseObj.HasSwitches && inUseObj.posY === -1) {
        inUseObj.posY = -1;
        Screens_removeFocusFallow();
        inUseObj.posX += (!x ? 1 : -1);
        Screens_addFocusFallow();
    } else if (Main_ThumbNull((inUseObj.posY), (inUseObj.posX + y), inUseObj.ids[0]))
        Screens_ChangeFocus(0, (inUseObj.posX + y));
    else if (Main_ThumbNull((inUseObj.posY + y), x, inUseObj.ids[0]))
        Screens_ChangeFocus(y, x);
}

function Screens_handleKeyDown(event) {
    if (inUseObj.FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    switch (event.keyCode) {
        case KEY_RETURN:
            if (!inUseObj.loadingData) inUseObj.key_exit();
            break;
        case KEY_LEFT:
            if (inUseObj.loadingData) break;
            if (!inUseObj.posX) {
                if (Main_values.Main_Go === Main_aGame) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
                inUseObj.key_exit(true);
                document.body.removeEventListener("keydown", Screens_handleKeyDown);
                Sidepannel_Start(Screens_handleKeyDown, true);
            } else Screens_KeyLeftRight(-1, inUseObj.ColoumnsCount - 1);
            break;
        case KEY_RIGHT:
            //Prevent scroll too fast out of inUseObj.Cells.length
            //here (inUseObj.posY + 3) the 3 is 1 bigger then the 2 in Screens_addrow*Down (inUseObj.Cells[y + 2])
            if (inUseObj.dataEnded ||
                inUseObj.posX < (inUseObj.ColoumnsCount - 1) ||
                (inUseObj.Cells.length - 1) >= (inUseObj.posY + 3)) Screens_KeyLeftRight(1, 0);
            else Screens_addFocus(true);
            break;
        case KEY_UP:
            if (inUseObj.HasSwitches) {
                if (inUseObj.posY === -1) inUseObj.key_exit();
                else Screens_KeyUpDown(-1);
            } else if (!inUseObj.posY) inUseObj.key_exit();
            else Screens_KeyUpDown(-1);
            break;
        case KEY_DOWN:
            //Prevent scroll too fast out of inUseObj.Cells.length
            //here (inUseObj.posY + 3) the 3 is 1 bigger then the 2 in Screens_addrow*Down (inUseObj.Cells[y + 2])
            if (inUseObj.dataEnded ||
                (inUseObj.Cells.length - 1) >= (inUseObj.posY + 3)) Screens_KeyUpDown(1);
            else Screens_addFocus(true);
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            inUseObj.key_play();
            break;
        case KEY_PG_DOWN:
        case KEY_PG_UP:
            Screens_SwitchScreen(event);
            break;
        case KEY_REFRESH:
            Main_ReloadScreen();
            break;
        default:
            break;
    }
}

function Screens_SwitchScreen(event) {
    if (Main_ForbidenScreens()) return;
    Main_keyClickDelay();
    document.body.addEventListener("keydown", Main_CenterLables, false);
    Main_CenterLables(event);
}

function AGame_headerOptions() {
    if (!inUseObj.posX) {
        Main_values.Main_Go = Main_AGameVod;
        Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
        AGame_headerOptionsExit();
        Main_SwitchScreenAction();
    } else if (inUseObj.posX === 1) {
        Main_values.Main_Go = Main_AGameClip;
        Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
        AGame_headerOptionsExit();
        Main_SwitchScreenAction();
    } else AGame_fallow();
}

function AGame_headerOptionsExit() {
    if (inUseObj.status && inUseObj.posY === -1) {
        Screens_removeFocusFallow();
        inUseObj.posY = 0;
        inUseObj.posX = 0;
        Main_AddClass(inUseObj.ids[0] + '0_' + inUseObj.posX, Main_classThumb);
    }
    document.body.removeEventListener("keydown", Screens_handleKeyDown);
    Main_HideElement(inUseObj.ids[10]);
}

function AGame_fallow() {
    if (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token) {
        if (AGame_fallowing) AddCode_UnFallowGame();
        else AddCode_FallowGame();
    } else {
        Main_showWarningDialog(STR_NOKEY_WARN);
        window.setTimeout(function() {
            if (inUseObj.emptyContent && Main_values.Main_Go === Main_aGame) Main_showWarningDialog(STR_NO + STR_LIVE_GAMES);
            else Main_HideWarningDialog();
        }, 2000);
    }
}

function AGame_Checkfallow() {
    if (AddUser_UserIsSet()) AddCode_CheckFallowGame();
    else {
        AGame_fallowing = false;
        AGame_setFallow();
    }
}

function AGame_setFallow() {
    if (AGame_fallowing) Main_innerHTML(AGame.ids[3] + "y_2", '<i class="icon-heart" style="color: #00b300; font-size: 100%;"></i>' + STR_SPACE + STR_SPACE + STR_FALLOWING);
    else Main_innerHTML(AGame.ids[3] + "y_2", '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; "></i>' + STR_SPACE + STR_SPACE + (AddUser_UserIsSet() ? STR_FALLOW : STR_NOKEY));
}
