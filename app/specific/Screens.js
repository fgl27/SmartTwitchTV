//Variable initialization
var inUseObj = {};
var Screens_clear = false;
var Screens_KeyEnterID;
var Screens_ScrollAnimationTimeout = 350; //Same time as animate_height_transition
var Screens_ChangeFocusAnimationFinished = true;
var Screens_ChangeFocusAnimationFast = false;
var Screens_SettingDoAnimations = true;
//Start the app in async mode by default
var Screens_ForceSync = false;

//Initiate all Secondary screens obj and they properties
function Screens_InitScreens() {
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

    //History screen
    ScreensObj_HistoryLive();
    ScreensObj_HistoryVod();
    ScreensObj_HistoryClip();
}

//TODO cleanup not used when finished migrate all
function Screens_ScreenIds(base) {
    return [
        base + '_thumbdiv',//0
        base + '_img',//1
        base + '_infodiv',//2
        base + '_title',//3
        base + '_createdon',//4
        base + '_game',//5
        base + '_viewers',//6
        base + '_duration',//7
        base + '_cell',//8
        'cpempty_',//9
        base + '_scroll',//10
        base + '_lang',//11
        base + '_row'//12
    ];
}

function Screens_assign() {
    var ret = {},
        i = 0,
        j;
    for (i; i < arguments.length; i++) {

        var obj = arguments[i],
            keys = Object.keys(obj);

        for (j = 0; j < keys.length; j++)
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
    if (inUseObj.label_exit) inUseObj.label_exit();
    document.body.removeEventListener("keydown", Screens_handleKeyDown);
    Main_HideElement(inUseObj.ids[10]);
    Main_HideWarningDialog();
    Screens_ClearAnimation();
}

function Screens_StartLoad() {
    Main_showLoadDialog();
    Main_updateclock();
    Main_empty(inUseObj.table);
    Main_HideWarningDialog();

    //After one refresh reset helix
    if (inUseObj.useHelix) {
        if (inUseObj.forceResetHelix) inUseObj.resetHelix();
        else inUseObj.forceResetHelix = true;
    }

    inUseObj.cursor = null;
    inUseObj.after = '';
    inUseObj.status = false;
    inUseObj.TopRowCreated = false;
    inUseObj.offset = 0;
    inUseObj.offsettop = 0;
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
    if (inUseObj.isHistory)
        inUseObj.history_concatenate();
    else if (Main_IsNotBrowser && inUseObj.use_hls)
        BaseAndroidHlsGet(inUseObj.url + Main_TwithcV5Flag, Screens_concatenate, Screens_loadDataError);
    else if (Main_IsNotBrowser && !inUseObj.itemsCount && Screens_ForceSync)
        BaseAndroidhttpGet(inUseObj.url + Main_TwithcV5Flag, inUseObj.loadingDataTimeout, inUseObj.HeaderQuatity, inUseObj.token, Screens_concatenate, Screens_loadDataError);
    else
        BasexmlHttpGet(inUseObj.url + Main_TwithcV5Flag, inUseObj.loadingDataTimeout, inUseObj.HeaderQuatity, inUseObj.token, Screens_concatenate, Screens_loadDataError, false);

    Screens_ForceSync = true;
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
        Sidepannel_SetTopOpacity(Main_values.Main_Go);
        inUseObj.FirstLoad = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
        inUseObj.key_exit();
        Main_ShowElement('topbar');
        Main_ShowElement('side_panel_new_holder');
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
            if (inUseObj.rowClass) inUseObj.row.classList.add(inUseObj.rowClass);
            inUseObj.row.id = inUseObj.ids[12] + inUseObj.row_id;
        }

        var response_rows = Math.ceil(response_items / inUseObj.ColoumnsCount);

        var max_row = inUseObj.row_id + response_rows;

        for (inUseObj.row_id; inUseObj.row_id < max_row;) {

            if (inUseObj.coloumn_id === inUseObj.ColoumnsCount) {
                inUseObj.row = document.createElement('div');
                if (inUseObj.rowClass) inUseObj.row.classList.add(inUseObj.rowClass);
                inUseObj.row.id = inUseObj.ids[12] + inUseObj.row_id;
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

function Screens_createCell(id_attribute, Data_content, html_content) {
    var div = document.createElement('div');

    div.setAttribute('id', id_attribute);
    div.setAttribute(Main_DataAttribute, JSON.stringify(Data_content));
    div.classList.add(inUseObj.thumbclass);

    div.innerHTML = html_content;

    return div;
}

function Screens_createCellChannel(id, idArray, valuesArray) {
    return Screens_createCell(
        idArray[8] + id,
        valuesArray,
        '<div id="' + idArray[0] + id + '" class="stream_thumbnail_channel" ><div class="stream_thumbnail_channel_img"><img id="' + idArray[1] +
        id + '" alt="" class="stream_img" src="' + valuesArray[2] +
        '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\';"></div>' +
        '<div id="' + idArray[2] + id + '" class="stream_thumbnail_channel_text_holder">' +
        '<div id="' + idArray[3] + id + '" class="stream_info_channel_name">' + valuesArray[3] +
        (valuesArray[4] ? STR_SPACE + STR_SPACE +
            '</div><div class="stream_info_channel_partner_icon"><img style="width: 2ch;" alt="" src="' +
            IMG_PARTNER + '">' : "") + '</div></div></div>');
}

function Screens_createCellGame(id, idArray, valuesArray) {
    return Screens_createCell(
        idArray[5] + id,
        valuesArray,
        '<div id="' + idArray[0] + id + '" class="stream_thumbnail_game"><div class="stream_thumbnail_live_game"><img id="' +
        idArray[1] + id + '" class="stream_img" alt="" src="' + valuesArray[0] +
        '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\';"></div><div id="' +
        idArray[2] + id +
        '" class="stream_thumbnail_game_text_holder"><span class="stream_spam_text_holder"><div id="<div id="' +
        idArray[3] + id + '" class="stream_info_game_name">' + valuesArray[1] + '</div>' +
        (valuesArray[2] !== '' ? '<div id="' + idArray[4] + id +
            '"class="stream_info_live" style="width: 100%; display: inline-block;">' + valuesArray[2] +
            '</div>' : '') + '</div></span></div>');
}

function Screens_createCellClip(id, idArray, valuesArray, Extra_when, Extra_until) {
    var playing = (valuesArray[3] !== "" ? STR_PLAYING + valuesArray[3] : "");

    return Screens_createCell(
        idArray[8] + id,
        valuesArray,
        '<div id="' + idArray[0] + id + '" class="stream_thumbnail_live"><div class="stream_thumbnail_live_img"><img id="' +
        idArray[1] + id + '" class="stream_img" alt="" src="' + valuesArray[15] +
        '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\';"></div><div id="' +
        idArray[2] + id +
        '" class="stream_thumbnail_live_text_holder"><span class="stream_spam_text_holder"><div style="line-height: 1.6ch;"><div id="' +
        idArray[3] + id + '" class="stream_info_live_name" style="width: 72%; display: inline-block;">' +
        valuesArray[4] + '</div><div id="' + idArray[7] + id +
        '"class="stream_info_live" style="width:27%; float: right; text-align: right; display: inline-block;">' +
        valuesArray[11] + '</div></div><div id="' + idArray[11] + id + '"class="' +
        (Extra_when ? 'stream_info_live_title_single_line' : 'stream_info_live_title') + '">' +
        valuesArray[10] + '</div>' +
        '<div id="' + idArray[4] + id + '"class="stream_info_live">' + playing + '</div>' +
        '<div style="line-height: 1.3ch;"><div id="' + idArray[6] + id +
        '"class="stream_info_live" style="width: auto; display: inline-block;">' + valuesArray[12] + ',' + STR_SPACE +
        valuesArray[14] + '</div><div id="' + idArray[5] + id +
        '"class="stream_info_live" style="width: 6ch; display: inline-block; float: right; text-align: right;">' +
        Play_timeS(valuesArray[1]) + '</div></div>' +
        (Extra_when ? ('<div class="stream_info_live">' + STR_WATCHED + Main_videoCreatedAtWithHM(Extra_when) + STR_SPACE +
            STR_UNTIL + Play_timeS(Extra_until < valuesArray[1] ? Extra_until : valuesArray[1]) + '</div>') : '') +
        '</div></span></div></div>');
}

function Screens_createCellVod(id, idArray, valuesArray, Extra_when, Extra_until) {
    return Screens_createCell(
        idArray[8] + id,
        valuesArray,
        '<div id="' + idArray[0] + id + '" class="stream_thumbnail_live"><div id="' + idArray[6] + id + '" class="stream_thumbnail_live_img" ' +
        (valuesArray[8] ? ' style="width: 100%; padding-bottom: 56.25%; background-size: 0 0; background-image: url(' + valuesArray[8] + ');"' : '') +
        '><img id="' + idArray[1] + id + '" class="stream_img" alt="" src="' + valuesArray[0] +
        '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\';"></div><div id="' +
        idArray[2] + id +
        '" class="stream_thumbnail_live_text_holder"><span class="stream_spam_text_holder"><div style="line-height: 1.6ch;"><div id="' +
        idArray[3] + id + '" class="stream_info_live_name" style="width: 72%; display: inline-block;">' +
        valuesArray[1] + '</div><div id="' + idArray[7] + id +
        '"class="stream_info_live" style="width:27%; float: right; text-align: right; display: inline-block;">' + valuesArray[5] +
        '</div></div><div id="' + idArray[11] + id +
        '"class="' + (Extra_when ? 'stream_info_live_title_single_line' : 'stream_info_live_title') + '">' + valuesArray[10] + '</div>' +
        '<div id="' + idArray[9] + id + '"class="stream_info_live">' +
        (valuesArray[3] !== "" && valuesArray[3] !== null ? STR_STARTED + STR_PLAYING + valuesArray[3] : "") + '</div>' +
        '<div style="line-height: 1.3ch;"><div id="' + idArray[4] + id + '"class="stream_info_live" style="width: auto; display: inline-block;">' +
        valuesArray[2] + ',' + STR_SPACE + valuesArray[4] + '</div><div id="' + idArray[5] + id +
        '"class="stream_info_live" style="width: 9ch; display: inline-block; float: right; text-align: right;">' +
        Play_timeS(valuesArray[11]) + '</div></div>' +
        (Extra_when ? ('<div class="stream_info_live">' + STR_WATCHED + Main_videoCreatedAtWithHM(Extra_when) + STR_SPACE +
            STR_UNTIL + Play_timeS(Extra_until) + '</div>') : '') +
        '</span></div></div>');
}

function Screens_createCellLive(id, idArray, valuesArray, Extra_when) {
    var ishosting = valuesArray[1].indexOf(STR_USER_HOSTING) !== -1;

    return Screens_createCell(
        idArray[8] + id,
        valuesArray,
        '<div id="' + idArray[0] + id + '" class="stream_thumbnail_live"><div class="stream_thumbnail_live_img"><img id="' +
        idArray[1] + id + '" class="stream_img" alt="" src="' + valuesArray[0].replace("{width}x{height}", Main_VideoSize) + Main_randomimg +
        '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\';"></div><div id="' +
        idArray[2] + id +
        '" class="stream_thumbnail_live_text_holder"><span class="stream_spam_text_holder"><div style="line-height: 1.6ch;"><div id="' +
        idArray[3] + id + '" class="stream_info_live_name" style="width:' + (ishosting ? 99 : 66) + '%; display: inline-block;">' +
        '<i class="icon-' + (valuesArray[8] ? 'refresh' : 'circle') + ' live_icon strokedeline" style="color: ' +
        (valuesArray[8] ? '#FFFFFF' : ishosting ? '#FED000' : 'red') +
        ';"></i> ' + valuesArray[1] + '</div><div id="' + idArray[7] + id +
        '"class="stream_info_live" style="width:' + (ishosting ? 0 : 33) + '%; float: right; text-align: right; display: inline-block;">' +
        valuesArray[5] + '</div></div>' +
        '<div id="' + idArray[4] + id + '"class="' +
        (Extra_when ? 'stream_info_live_title_single_line' : 'stream_info_live_title') + '">' + twemoji.parse(valuesArray[2]) + '</div>' +
        '<div id="' + idArray[5] + id + '"class="stream_info_live">' + (valuesArray[3] !== "" ? STR_PLAYING + valuesArray[3] : "") +
        '</div><div id="' + idArray[6] + id + '"class="stream_info_live">' +
        valuesArray[11] + STR_FOR + valuesArray[4] + STR_SPACE + STR_VIEWER + '</div>' +
        (Extra_when ? ('<div class="stream_info_live">' + STR_WATCHED + Main_videoCreatedAtWithHM(Extra_when) + STR_SPACE +
            STR_UNTIL + Play_timeMs(Extra_when - (new Date(valuesArray[12]).getTime())) + '</div>') : '') +
        '</span></div></div>');
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
            //Force reset some values as I have reset the Never_run_new value and some things may crash
            if (Main_values.Never_run_new) {
                Main_GoBefore = Main_Live;
                Main_values.Play_WasPlaying = 0;
            }
            Screens_ForceSync = false;

            if (Settings_value.restor_playback.defaultValue && Main_values.Play_WasPlaying && inUseObj.status) {

                Main_ExitCurrent(Main_values.Main_Go);
                Main_values.Main_Go = Main_GoBefore;

                Play_showWarningDialog(STR_RESTORE_PLAYBACK_WARN);

                Main_ready(function() {
                    if (Main_values.Play_WasPlaying === 1) Main_openStream();
                    else {
                        if (!Main_values.vodOffset) Main_values.vodOffset = 1;
                        ChannelVod_DurationSeconds = Main_values.vodOffset + 1;

                        Main_openVod();
                    }

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
                    Screens_RemoveAllFocus();
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

                    if (Main_values.Never_run_new)
                        Main_showControlsDialog(Screens_handleKeyDown, Screens_handleKeyControls);

                    if (Main_values.Never_run_phone && !Main_isTV) {
                        Main_showphoneDialog(Main_values.Never_run_new ?
                            Screens_handleKeyControls : Screens_handleKeyDown, Screens_handleKeyControls);
                        Settings_value.global_font_offset.defaultValue = 6;
                        Main_setItem('global_font_offset', 7);
                        Main_textContent('global_font_offset', Settings_Obj_values('global_font_offset'));
                        calculateFontSize();
                        Main_values.Never_run_phone = false;
                    }

                    Main_values.Never_run_new = false;

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
        case KEY_RETURN_Q:
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            if (Main_isphoneDialogVisible()) {
                Main_HidephoneDialog();
                break;
            }
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
    Main_ShowElement('side_panel_new_holder');

    if (Main_values.Sidepannel_IsUser) Sidepannel_SetUserLables();
    else Sidepannel_SetDefaultLables();

    Sidepannel_SetTopOpacity(Main_values.Main_Go);
}

function Screens_addFocus(forceScroll) {

    if (inUseObj.emptyContent) {
        if (inUseObj.HasSwitches) inUseObj.posY = -1;
        else {
            inUseObj.key_exit(inUseObj.emptyContent);
            return;
        }
    }
    if (inUseObj.posY < 0) {
        Screens_addFocusFallow();
        //Reset screen position
        document.getElementById(inUseObj.ids[10]).style.top = '';
        if (!inUseObj.emptyContent)
            Main_CounterDialog(inUseObj.posX, inUseObj.posY + 1, inUseObj.ColoumnsCount, inUseObj.itemsCount);

        return;
    }

    //Load more as the data is getting used
    if ((inUseObj.posY > 2) && (inUseObj.data_cursor + Main_ItemsLimitMax) > inUseObj.data.length && !inUseObj.dataEnded && !inUseObj.loadingData) {
        Screens_loadDataRequestStart();
    } else if ((inUseObj.posY + inUseObj.ItemsReloadLimit) > (inUseObj.itemsCount / inUseObj.ColoumnsCount) && inUseObj.data_cursor < inUseObj.data.length) {
        inUseObj.loadDataSuccess();
    }

    inUseObj.addrow(forceScroll, inUseObj.posY);
}

function Screens_ThumbNotNull(thumbnail) {
    return document.getElementById(thumbnail) !== null;
}


function Screens_addrowChannel(forceScroll, y) {
    if (inUseObj.currY < y) { // down
        inUseObj.currY = inUseObj.posY;
        if (y > 2) Screens_addrowChannelDown(y);
    } else if (inUseObj.currY > y) { // Up
        inUseObj.currY = inUseObj.posY;
        if (y > 1 && (inUseObj.Cells.length) > (y + 3)) {
            var doc = document.getElementById(inUseObj.table);
            doc.insertBefore(inUseObj.Cells[y - 2], doc.childNodes[0]);
            document.getElementById(inUseObj.ids[12] + (y - 2)).classList.add('animate_height');

            if (Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
                !Screens_ChangeFocusAnimationFast) { //If with animation
                Screens_ChangeFocusAnimationFinished = false;
                Screens_ChangeFocusAnimationFast = true;

                Main_ready(function() {
                    document.getElementById(inUseObj.ids[12] + (y - 2)).classList.remove('animate_height');
                });

                window.setTimeout(function() {
                    Screens_RemoveElement(inUseObj.ids[12] + (y + 3));
                    Screens_ChangeFocusAnimationFinished = true;

                }, Screens_ScrollAnimationTimeout);
            } else {
                document.getElementById(inUseObj.ids[12] + (y - 2)).classList.remove('animate_height');
                Screens_RemoveElement(inUseObj.ids[12] + (y + 3));
            }
        }
    }

    Screens_addrowEnd(forceScroll);
}

function Screens_addrowChannelDown(y) {
    if (inUseObj.Cells[y + 2]) {
        document.getElementById(inUseObj.table).appendChild(inUseObj.Cells[y + 2]);

        if (Screens_ThumbNotNull(inUseObj.ids[12] + (y - 3))) {
            if (Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
                !Screens_ChangeFocusAnimationFast) { //If with animation
                Screens_ChangeFocusAnimationFinished = false;
                Screens_ChangeFocusAnimationFast = true;

                document.getElementById(inUseObj.ids[12] + (y - 3)).classList.add('animate_height');

                window.setTimeout(function() {
                    Screens_RemoveElement(inUseObj.ids[12] + (y - 3));
                    Screens_ChangeFocusAnimationFinished = true;
                }, Screens_ScrollAnimationTimeout);

            } else Screens_RemoveElement(inUseObj.ids[12] + (y - 3));
        }

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

function Screens_addrow(forceScroll, y) {
    if (inUseObj.currY < y) { // down
        inUseObj.currY = inUseObj.posY;
        Screens_addrowDown(y);
    } else if (inUseObj.currY > y) { // Up
        inUseObj.currY = inUseObj.posY;
        if (y && (inUseObj.Cells.length) > (y + 1) && inUseObj.Cells[y + 2]) {
            var doc = document.getElementById(inUseObj.table);
            doc.insertBefore(inUseObj.Cells[y - 1], doc.childNodes[inUseObj.HasSwitches ? 1 : 0]);
            document.getElementById(inUseObj.ids[12] + (y - 1)).classList.add('animate_height');

            if (Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
                !Screens_ChangeFocusAnimationFast) { //If with animation
                Screens_ChangeFocusAnimationFinished = false;
                Screens_ChangeFocusAnimationFast = true;

                Main_ready(function() {
                    document.getElementById(inUseObj.ids[12] + (y - 1)).classList.remove('animate_height');
                });

                window.setTimeout(function() {
                    Screens_RemoveElement(inUseObj.ids[12] + (y + 2));
                    Screens_ChangeFocusAnimationFinished = true;

                }, Screens_ScrollAnimationTimeout);
            } else {
                document.getElementById(inUseObj.ids[12] + (y - 1)).classList.remove('animate_height');
                Screens_RemoveElement(inUseObj.ids[12] + (y + 2));
            }

        }
    }
    Screens_addrowEnd(forceScroll);
}

function Screens_addrowDown(y) {
    if (inUseObj.Cells[y + 1]) {
        document.getElementById(inUseObj.table).appendChild(inUseObj.Cells[y + 1]);

        if (Screens_ThumbNotNull(inUseObj.ids[12] + (y - 2))) {
            if (Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
                !Screens_ChangeFocusAnimationFast) { //If with animation
                Screens_ChangeFocusAnimationFinished = false;
                Screens_ChangeFocusAnimationFast = true;

                document.getElementById(inUseObj.ids[12] + (y - 2)).classList.add('animate_height');

                window.setTimeout(function() {
                    Screens_RemoveElement(inUseObj.ids[12] + (y - 2));
                    Screens_ChangeFocusAnimationFinished = true;
                }, Screens_ScrollAnimationTimeout);

            } else Screens_RemoveElement(inUseObj.ids[12] + (y - 2));
        }
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

function Screens_RemoveElement(id) {
    var ele = document.getElementById(id);
    if (ele) ele.remove();
}

function Screens_addrowEnd(forceScroll) {
    Main_AddClass(inUseObj.ids[0] + inUseObj.posY + '_' + inUseObj.posX, Main_classThumb);
    Main_CounterDialog(inUseObj.posX, inUseObj.posY, inUseObj.ColoumnsCount, inUseObj.itemsCount);

    inUseObj.addFocus(inUseObj.posY, inUseObj.ids, forceScroll);
}

function Screens_setOffset(pos, y) {
    if (!inUseObj.offsettop || inUseObj.offsettopFontsize !== Settings_Obj_default('global_font_offset')) {
        pos = !y ? (y + pos) : y;
        if (inUseObj.Cells[pos]) {
            inUseObj.offsettop = document.getElementById(inUseObj.ids[0] + pos + '_0').offsetTop / BodyfontSize;
            inUseObj.offsettopFontsize = Settings_Obj_default('global_font_offset');
        }
    }
}

function Screens_addFocusChannel(y, idArray, forceScroll) {
    Screens_setOffset(2, y);

    if (Main_YchangeAddFocus(y) || forceScroll) {

        if (y > 1) {

            //Channels is a odd screen as thumb are small it need a minor workaround to get all working
            //TODO revise this for a simple implementeation
            if (inUseObj.Cells.length < 6) {
                if (inUseObj.Cells[y + 1] && (y + 2) < inUseObj.Cells.length || inUseObj.Cells.length === 4)
                    document.getElementById(idArray[10]).style.top = 'calc(39% - ' + inUseObj.offsettop + 'em)';
                else if (inUseObj.Cells.length > 3)
                    document.getElementById(idArray[10]).style.top = 'calc(39% - ' + (inUseObj.offsettop * 3 / 2) + 'em)';
            } else {
                if (inUseObj.Cells[y + 2])
                    document.getElementById(idArray[10]).style.top = 'calc(39% - ' + inUseObj.offsettop + 'em)';
                else
                    document.getElementById(idArray[10]).style.top = 'calc(39% - ' + (inUseObj.offsettop * 3 / 2) + 'em)';
            }

        } else document.getElementById(idArray[10]).style.top = '';

    }
    Main_handleKeyUp();
}

function Screens_addFocusVideo(y, idArray, forceScroll) {
    Screens_setOffset(1, y);

    if (Main_YchangeAddFocus(y) || forceScroll) {
        if (y > 0) {

            if (Main_ThumbNull((y + 1), 0, idArray[0])) //We didn't reach the bottom yet
                document.getElementById(idArray[10]).style.top = 'calc(7.65% - ' + inUseObj.offsettop + 'em)';

        } else document.getElementById(idArray[10]).style.top = '';
    }

    Main_handleKeyUp();
}

function Screens_addFocusGame(y, idArray, forceScroll) {
    Screens_setOffset(1, y);

    if (Main_YchangeAddFocus(y) || forceScroll) {
        if (y > 0) {

            if (Main_ThumbNull((y + 1), 0, idArray[0])) //We didn't reach the bottom yet
                document.getElementById(idArray[10]).style.top = 'calc(4.5% - ' + inUseObj.offsettop + 'em)';

        } else document.getElementById(idArray[10]).style.top = '';
    }

    Main_handleKeyUp();
}

function Screens_ChangeFocus(y, x) {
    Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
    Screens_ClearAnimation();
    inUseObj.posY += y;
    inUseObj.posX = x;
    Screens_addFocus();
}

function Screens_addFocusFallow() {
    if (inUseObj.posX > inUseObj.SwitchesIcons.length - 1) inUseObj.posX = 0;
    else if (inUseObj.posX < 0) inUseObj.posX = inUseObj.SwitchesIcons.length - 1;

    Main_AddClass(inUseObj.ids[0] + 'y_' + inUseObj.posX, 'stream_switch_focused');
}

function Screens_removeFocusFallow() {
    if (inUseObj.posX > inUseObj.SwitchesIcons.length - 1) inUseObj.posX = 0;
    else if (inUseObj.posX < 0) inUseObj.posX = inUseObj.SwitchesIcons.length - 1;

    Main_RemoveClass(inUseObj.ids[0] + 'y_' + inUseObj.posX, 'stream_switch_focused');
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
        Screens_ClearAnimation();
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

function Screens_ClearAnimation() {
    if (inUseObj.HasAnimateThumb) {
        window.clearInterval(inUseObj.AnimateThumbId);
        if (Screens_ThumbNotNull(inUseObj.ids[6] + inUseObj.posY + '_' + inUseObj.posX)) Main_ShowElement(inUseObj.ids[6] + inUseObj.posY + '_' + inUseObj.posX);
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

function Screens_OpenSidePanel(forceFeed) {
    Screens_RemoveAllFocus();
    if (Main_values.Main_Go === Main_aGame) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
    Screens_ClearAnimation();
    document.body.removeEventListener("keydown", Screens_handleKeyDown);
    Sidepannel_Start(Screens_handleKeyDown, forceFeed);
}

function Screens_RemoveAllFocus() {
    if (Main_ThumbNull(inUseObj.posY, inUseObj.posX, inUseObj.ids[0])) {
        Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
    } else if (inUseObj.posY < 0) {
        Screens_removeFocusFallow();
        inUseObj.posY = 0;
        inUseObj.posX = 0;
    }
}

function Screens_handleKeyUp(e) {
    if (e.keyCode === KEY_ENTER) {
        Screens_handleKeyUpClear();
        if (!Screens_clear) inUseObj.key_play();
    }
}

function Screens_handleKeyUpClear() {
    window.clearTimeout(Screens_KeyEnterID);
    document.body.removeEventListener("keyup", Screens_handleKeyUp);
    document.body.addEventListener("keydown", Screens_handleKeyDown, false);
}

document.body.addEventListener("keyup", Screens_handleKeyUpAnimationFast);

function Screens_handleKeyUpAnimationFast() {
    Screens_ChangeFocusAnimationFast = false;
}

function Screens_handleKeyDown(event) {
    if (inUseObj.FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    switch (event.keyCode) {
        case KEY_PG_UP:
            if (!inUseObj.loadingData && inUseObj.key_pgUp) {
                Screens_RemoveAllFocus();
                if (inUseObj.screen === Main_UserChannels)
                    Sidepannel_Go(!AddUser_UsernameArray[0].access_token ? inUseObj.key_pgUpNext : inUseObj.key_pgUp);
                else if (inUseObj.screen === Main_UserLive)
                    Sidepannel_Go(Main_History[Main_HistoryPos]);
                else Sidepannel_Go(inUseObj.key_pgUp);
            }
            break;
        case KEY_PG_DOWN:
            if (!inUseObj.loadingData && inUseObj.key_pgDown) {
                Screens_RemoveAllFocus();
                if (inUseObj.screen === Main_usergames)
                    Sidepannel_Go(!AddUser_UsernameArray[0].access_token ? inUseObj.key_pgDownNext : inUseObj.key_pgDown);
                else if (inUseObj.screen === Main_UserChannels)
                    Sidepannel_Go(Main_History[Main_HistoryPos]);
                else Sidepannel_Go(inUseObj.key_pgDown);
            }
            break;
        case KEY_RETURN_Q:
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            if (!inUseObj.loadingData) inUseObj.key_exit();
            break;
        case KEY_LEFT:
            //Main_History_Sort('live', 'name', 1);
            if (inUseObj.loadingData) break;
            if (!inUseObj.posX) Screens_OpenSidePanel();
            else Screens_KeyLeftRight(-1, inUseObj.ColoumnsCount - 1);
            break;
        case KEY_RIGHT:
            //Prevent scroll too fast out of inUseObj.Cells.length
            //here (inUseObj.posY + 3) the 3 is 1 bigger then the 2 in Screens_addrow*Down (inUseObj.Cells[y + 2])
            if (inUseObj.dataEnded ||
                inUseObj.posX < (inUseObj.ColoumnsCount - 1) ||
                (inUseObj.Cells.length - 1) >= (inUseObj.posY + 1)) {
                if (inUseObj.posX === (inUseObj.ColoumnsCount - 1)) {
                    if (Screens_ChangeFocusAnimationFinished) Screens_KeyLeftRight(1, 0);
                } else Screens_KeyLeftRight(1, 0);
            } else Screens_addFocus(true);
            break;
        case KEY_UP:
            if (Screens_ChangeFocusAnimationFinished) Screens_KeyUpDown(-1);
            break;
        case KEY_DOWN:
            //Prevent scroll too fast out of inUseObj.Cells.length
            //here (inUseObj.posY + 3) the 3 is 1 bigger then the 2 in Screens_addrow*Down (inUseObj.Cells[y + 2])
            if (inUseObj.dataEnded ||
                (inUseObj.Cells.length - 1) >= (inUseObj.posY + 1)) {
                if (Screens_ChangeFocusAnimationFinished) Screens_KeyUpDown(1);
            } else {
                Screens_addFocus(true);
            }
            break;
        case KEY_PLAY:
        case KEY_PLAYPAUSE:
        case KEY_KEYBOARD_SPACE:
            inUseObj.key_play();
            break;
        case KEY_ENTER:
            document.body.removeEventListener("keydown", Screens_handleKeyDown, false);
            document.body.addEventListener("keyup", Screens_handleKeyUp, false);
            Screens_clear = false;
            Screens_KeyEnterID = window.setTimeout(Main_ReloadScreen, 400);
            break;
        case KEY_REFRESH:
            Main_ReloadScreen();
            break;
        case KEY_PAUSE://key s
        case KEY_6:
            Main_showSettings();
            break;
        case KEY_A:
        case KEY_7:
            Main_showAboutDialog(Screens_handleKeyDown, Screens_handleKeyControls);
            break;
        case KEY_C:
        case KEY_8:
            Main_showControlsDialog(Screens_handleKeyDown, Screens_handleKeyControls);
            break;
        case KEY_E:
        case KEY_9:
            document.body.removeEventListener("keydown", Screens_handleKeyDown);
            Main_showExitDialog();
            break;
        case KEY_CHAT:
            if (!inUseObj.loadingData) {
                Screens_OpenSidePanel(AddUser_UserIsSet());
                if (!AddUser_UserIsSet()) {
                    Main_showWarningDialog(STR_NOKUSER_WARN);
                    window.setTimeout(Main_HideWarningDialog, 2000);
                }
            }
            break;
        default:
            break;
    }
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
    if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
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
    if (AGame_fallowing) Main_innerHTML(AGame.ids[3] + "y_2", '<i class="icon-heart" style="color: #6441a4; font-size: 100%;"></i>' + STR_SPACE + STR_SPACE + STR_FALLOWING);
    else Main_innerHTML(AGame.ids[3] + "y_2", '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; "></i>' + STR_SPACE + STR_SPACE + (AddUser_UserIsSet() ? STR_FALLOW : STR_NOKEY));
}

var Screens_PeriodDialogID;
var Screens_PeriodDialogPos = 0;

function Screens_PeriodStart() {
    Screens_setPeriodDialog();
    Main_ShowElement('dialog_period');
    document.body.removeEventListener("keydown", Screens_handleKeyDown);
    document.body.addEventListener("keydown", Screens_PeriodhandleKeyDown, false);
}

function Screens_clearPeriodDialogId() {
    window.clearTimeout(Screens_PeriodDialogID);
}

function Screens_SetPeriodDialogId() {
    window.clearTimeout(Screens_PeriodDialogID);
    Screens_PeriodDialogID = window.setTimeout(Screens_PeriodDialogHide, 6000);
}

function Screens_setPeriodDialog() {
    Screens_PeriodDialogPos = inUseObj.periodPos;
    Screens_PeriodAddFocus(Screens_PeriodDialogPos);
    Screens_SetPeriodDialogId();
}

function Screens_PeriodDialogHide() {
    Screens_clearPeriodDialogId();
    Screens_PeriodRemoveFocus(Screens_PeriodDialogPos);
    document.body.removeEventListener("keydown", Screens_PeriodhandleKeyDown, false);
    document.body.addEventListener("keydown", Screens_handleKeyDown, false);
    Main_HideElement('dialog_period');
}

function Screens_PeriodAddFocus(pos) {
    Main_AddClass('dialog_period_' + pos, 'button_dialog_focused');
}

function Screens_PeriodRemoveFocus(pos) {
    Main_RemoveClass('dialog_period_' + pos, 'button_dialog_focused');
}

function Screens_PeriodhandleKeyDown(event) {
    switch (event.keyCode) {
        case KEY_RETURN_Q:
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            Screens_PeriodRemoveFocus(Screens_PeriodDialogPos);
            Screens_PeriodDialogHide();
            break;
        case KEY_LEFT:
            Screens_clearPeriodDialogId();
            Screens_SetPeriodDialogId();
            Screens_PeriodRemoveFocus(Screens_PeriodDialogPos);
            Screens_PeriodDialogPos--;
            if (Screens_PeriodDialogPos < 1) Screens_PeriodDialogPos = 4;
            Screens_PeriodAddFocus(Screens_PeriodDialogPos);
            break;
        case KEY_RIGHT:
            Screens_clearPeriodDialogId();
            Screens_SetPeriodDialogId();
            Screens_PeriodRemoveFocus(Screens_PeriodDialogPos);
            Screens_PeriodDialogPos++;
            if (Screens_PeriodDialogPos > 4) Screens_PeriodDialogPos = 1;
            Screens_PeriodAddFocus(Screens_PeriodDialogPos);
            break;
        case KEY_PLAY:
        case KEY_PLAYPAUSE:
        case KEY_KEYBOARD_SPACE:
        case KEY_ENTER:
            Screens_PeriodDialogHide();
            if (inUseObj.periodPos !== Screens_PeriodDialogPos) {
                inUseObj.periodPos = Screens_PeriodDialogPos;
                inUseObj.SetPeriod();
                Screens_StartLoad();
            }
            break;
        default:
            break;
    }
}

var Screens_OffSetDialogID;

function Screens_OffSetStart() {
    inUseObj.OffSetPos = inUseObj.extraoffset / 100;
    Screens_setOffSetDialog();
    Main_ShowElement('dialog_OffSet');
    document.body.removeEventListener("keydown", Screens_handleKeyDown);
    document.body.addEventListener("keydown", Screens_OffSethandleKeyDown, false);
}

function Screens_clearOffSetDialogId() {
    window.clearTimeout(Screens_OffSetDialogID);
}

function Screens_SetOffSetDialogId() {
    window.clearTimeout(Screens_OffSetDialogID);
    Screens_OffSetDialogID = window.setTimeout(Screens_OffSetDialogHide, 6000);
}

function Screens_setOffSetDialog() {
    Screens_OffSetAddFocus(inUseObj.OffSetPos * 100);
    Screens_SetOffSetDialogId();
}

function Screens_OffSetDialogHide() {
    Screens_clearOffSetDialogId();
    document.body.removeEventListener("keydown", Screens_OffSethandleKeyDown, false);
    document.body.addEventListener("keydown", Screens_handleKeyDown, false);
    Main_HideElement('dialog_OffSet');
}

function Screens_OffSetAddFocus(pos) {
    Main_textContent("dialog_OffSet_val", pos);
    var maxValue = 5000;

    if (pos > 0 && pos < maxValue) {
        document.getElementById("dialog_OffSet_left").style.opacity = "1";
        document.getElementById("dialog_OffSet_right").style.opacity = "1";
    } else if (pos === maxValue) {
        document.getElementById("dialog_OffSet_left").style.opacity = "1";
        document.getElementById("dialog_OffSet_right").style.opacity = "0.2";
    } else {
        document.getElementById("dialog_OffSet_left").style.opacity = "0.2";
        document.getElementById("dialog_OffSet_right").style.opacity = "1";
    }
}

function Screens_OffSethandleKeyDown(event) {
    switch (event.keyCode) {
        case KEY_RETURN_Q:
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            Screens_OffSetDialogHide();
            break;
        case KEY_LEFT:
            Screens_clearOffSetDialogId();
            Screens_SetOffSetDialogId();
            inUseObj.OffSetPos--;
            if (inUseObj.OffSetPos < 0) inUseObj.OffSetPos = 0;
            Screens_OffSetAddFocus(inUseObj.OffSetPos * 100);
            break;
        case KEY_RIGHT:
            Screens_clearOffSetDialogId();
            Screens_SetOffSetDialogId();
            inUseObj.OffSetPos++;
            if (inUseObj.OffSetPos > 50) inUseObj.OffSetPos = 50;
            Screens_OffSetAddFocus(inUseObj.OffSetPos * 100);
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_KEYBOARD_SPACE:
        case KEY_ENTER:
            Screens_OffSetDialogHide();
            if (inUseObj.extraoffset !== inUseObj.OffSetPos) {
                inUseObj.extraoffset = inUseObj.OffSetPos * 100;
                inUseObj.SetPeriod();
                Screens_StartLoad();
            }
            break;
        default:
            break;
    }
}

var Screens_histDialogID;

function Screens_histStart() {
    inUseObj.sethistDialog();
    Main_ShowElement('dialog_hist_setting');
    document.body.removeEventListener("keydown", Screens_handleKeyDown);
    document.body.addEventListener("keydown", Screens_histhandleKeyDown, false);
}

function Screens_clearhistDialogId() {
    window.clearTimeout(Screens_histDialogID);
}

function Screens_SethistDialogId() {
    window.clearTimeout(Screens_histDialogID);
    Screens_histDialogID = window.setTimeout(Screens_histDialogHide, 6000);
}

function Screens_histDialogHide() {
    Screens_histRemoveFocus(inUseObj.histPosY);
    inUseObj.histPosY = 0;
    Screens_histAddFocus(0);
    Screens_clearhistDialogId();
    document.body.removeEventListener("keydown", Screens_histhandleKeyDown, false);
    document.body.addEventListener("keydown", Screens_handleKeyDown, false);
    Main_HideElement('dialog_hist_setting');
}

function Screens_histAddFocus(divPos) {
    Main_AddClass('dialog_hist_setting_' + divPos, 'settings_div_focus');
    Main_AddClass('dialog_hist_val_' + divPos, 'settings_value_focus');
    Screens_histSetArrow();
}

function Screens_histRemoveFocus(divPos) {
    Main_RemoveClass('dialog_hist_setting_' + divPos, 'settings_div_focus');
    Main_RemoveClass('dialog_hist_val_' + divPos, 'settings_value_focus');
    document.getElementById("dialog_hist_left_" + divPos).style.opacity = "0";
    document.getElementById("dialog_hist_right_" + divPos).style.opacity = "0";
}

function Screens_histSetArrow() {
    Screens_histArrow(
        inUseObj.histPosX[inUseObj.histPosY],
        inUseObj.histArrays[inUseObj.histPosY].length,
        inUseObj.histArrays[inUseObj.histPosY][inUseObj.histPosX[inUseObj.histPosY]],
        inUseObj.histPosY
    );

    Main_setItem(inUseObj.histPosXName, JSON.stringify(inUseObj.histPosX));
}

function Screens_histArrow(pos, maxValue, text, divPos) {
    Main_textContent('dialog_hist_val_' + divPos, text);

    if (maxValue === 1) {
        document.getElementById("dialog_hist_left_" + divPos).style.opacity = "0";
        document.getElementById("dialog_hist_right_" + divPos).style.opacity = "0";
    } else if (!pos) {
        document.getElementById("dialog_hist_left_" + divPos).style.opacity = "0.2";
        document.getElementById("dialog_hist_right_" + divPos).style.opacity = "1";
    } else if (pos === (maxValue - 1)) {
        document.getElementById("dialog_hist_left_" + divPos).style.opacity = "1";
        document.getElementById("dialog_hist_right_" + divPos).style.opacity = "0.2";
    } else {
        document.getElementById("dialog_hist_left_" + divPos).style.opacity = "1";
        document.getElementById("dialog_hist_right_" + divPos).style.opacity = "1";
    }
}

function Screens_histhandleKeyDown(event) {
    switch (event.keyCode) {
        case KEY_RETURN_Q:
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            Screens_histDialogHide();
            break;
        case KEY_LEFT:
            Screens_clearhistDialogId();
            Screens_SethistDialogId();
            inUseObj.histPosX[inUseObj.histPosY]--;
            if (inUseObj.histPosX[inUseObj.histPosY] < 0) inUseObj.histPosX[inUseObj.histPosY] = 0;
            else Screens_histSetArrow();
            break;
        case KEY_RIGHT:
            Screens_clearhistDialogId();
            Screens_SethistDialogId();
            inUseObj.histPosX[inUseObj.histPosY]++;
            if (inUseObj.histPosX[inUseObj.histPosY] > (inUseObj.histArrays[inUseObj.histPosY].length - 1))
                inUseObj.histPosX[inUseObj.histPosY] = inUseObj.histArrays[inUseObj.histPosY].length - 1;
            else Screens_histSetArrow();
            break;
        case KEY_UP:
            Screens_clearhistDialogId();
            Screens_SethistDialogId();
            inUseObj.histPosY--;
            if (inUseObj.histPosY < 0) inUseObj.histPosY = 0;
            else {
                Screens_histRemoveFocus(inUseObj.histPosY + 1);
                Screens_histAddFocus(inUseObj.histPosY);
            }
            break;
        case KEY_DOWN:
            Screens_clearhistDialogId();
            Screens_SethistDialogId();
            inUseObj.histPosY++;
            if (inUseObj.histPosY > (inUseObj.histArrays.length - 1))
                inUseObj.histPosY = inUseObj.histArrays.length - 1;
            else {
                Screens_histRemoveFocus(inUseObj.histPosY - 1);
                Screens_histAddFocus(inUseObj.histPosY);
            }
            break;
        case KEY_ENTER:
            console.log('KEY_ENTER');
            break;
        default:
            break;
    }
}
