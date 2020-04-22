//Variable initialization
var inUseObj = {};
var Screens_clear = false;
var Screens_KeyEnterID;
var Screens_ScrollAnimationTimeout = 300; //Same time as animate_height_transition
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
    Main_Log('Screens_init ' + inUseObj.screen);
    Main_addFocusVideoOffset = -1;
    Main_values.Main_Go = inUseObj.screen;
    inUseObj.label_init();

    document.body.addEventListener("keydown", Screens_handleKeyDown, false);
    Main_ShowElementWithEle(inUseObj.ScrollDoc);

    if (Main_CheckAccessibilityVisible()) Main_CheckAccessibilitySet();
    else if (!inUseObj.status || Screens_RefreshTimeout() || !inUseObj.offsettop || inUseObj.offsettopFontsize !== Settings_Obj_default('global_font_offset'))
        Screens_StartLoad();
    else {
        Main_YRst(inUseObj.posY);
        Screens_addFocus(true);
        Main_SaveValues();
        Screens_SetLastRefresh();
    }
}

function Screens_exit() {
    Main_Log('Screens_exit ' + inUseObj.screen);

    Main_addFocusVideoOffset = 0;
    if (inUseObj.label_exit) inUseObj.label_exit();
    document.body.removeEventListener("keydown", Screens_handleKeyDown);
    Main_HideElementWithEle(inUseObj.ScrollDoc);
    Main_HideWarningDialog();
    Screens_ClearAnimation();
}

function Screens_StartLoad() {
    Main_showLoadDialog();
    inUseObj.lastRefresh = new Date().getTime();
    Main_updateclock();
    Main_empty(inUseObj.table);
    Main_HideWarningDialog();

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
    Screens_loadDataRequestStart(inUseObj);
}

function Screens_loadDataRequestStart(obj) {
    Screens_loadDataPrepare(obj);
    Screens_loadDataRequest(obj);
}

function Screens_loadDataPrepare(obj) {
    obj.loadingData = true;
    obj.loadingDataTry = 0;
    obj.loadingDataTimeout = DefaultloadingDataTimeout;
}

function Screens_loadDataRequest(obj) {
    obj.set_url();
    if (obj.isHistory)
        obj.history_concatenate();
    else if (obj.use_hls)
        BasehttpHlsGet(obj.url, obj.loadingDataTimeout, obj.HeaderQuatity, obj.token, Screens_concatenate, Screens_loadDataError, obj);
    else if (Main_IsOnAndroid && !obj.itemsCount && Screens_ForceSync)
        BaseAndroidhttpGet(obj.url + Main_TwithcV5Flag, obj.loadingDataTimeout, obj.HeaderQuatity, obj.token, Screens_concatenate, Screens_loadDataError, obj);
    else
        BasexmlHttpGet(obj.url + Main_TwithcV5Flag, obj.loadingDataTimeout, obj.HeaderQuatity, obj.token, Screens_concatenate, Screens_loadDataError, obj);

    Screens_ForceSync = true;
}

function Screens_loadDataError(obj) {
    Main_Log('Screens_loadDataError ' + obj.screen);
    obj.loadingDataTry++;
    if (obj.loadingDataTry < obj.loadingDataTryMax) {
        obj.loadingDataTimeout += 500;
        Screens_loadDataRequest(obj);
    } else Screens_loadDatafail(obj);
}

function Screens_loadDatafail(obj) {
    obj.loadingData = false;
    obj.loadingDataTry = 0;
    if (!obj.itemsCount) {
        obj.FirstLoad = false;
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
        obj.key_exit();
        if (Main_FirstRun) Screens_loadDataSuccessFinishEnd();
        else Main_HideLoadDialog();
    } else obj.dataEnded = true;
}

function Screens_concatenate(responseText, obj) {
    obj.concatenate(responseText);
}

function Screens_loadDataSuccess(obj) {
    var response_items = (obj.data.length - obj.data_cursor);

    //Use appendDiv only if is the intention to add on it run of loadDataSuccess to the row less content then ColoumnsCount,
    //with will make the row not be full, intentionally to add more in a new run of loadDataSuccess to that same row

    //If the intention is to load less then ColoumnsCount for it row consistently (have multiple not full rows), this function needs to be reworked appendDiv will not solve it, and that doesn't make sense for most screens.

    //appendDiv doesn't applies if the content end and we have less then ColoumnsCount to add for the last row

    //var appendDiv = !obj.coloumn_id;
    if (response_items > obj.ItemsLimit) response_items = obj.ItemsLimit;
    else if (!obj.loadingData) obj.dataEnded = true;

    if (obj.HasSwitches && !obj.TopRowCreated) obj.addSwitches();

    if (response_items) {

        if (!obj.row_id) {
            obj.row = document.createElement('div');
            if (obj.rowClass) obj.row.classList.add(obj.rowClass);
            obj.row.id = obj.ids[12] + obj.row_id;
        }

        var response_rows = Math.ceil(response_items / obj.ColoumnsCount);

        var max_row = obj.row_id + response_rows;

        for (obj.row_id; obj.row_id < max_row;) {

            if (obj.coloumn_id === obj.ColoumnsCount) {
                obj.row = document.createElement('div');
                if (obj.rowClass) obj.row.classList.add(obj.rowClass);
                obj.row.id = obj.ids[12] + obj.row_id;
                obj.coloumn_id = 0;
            }

            for (obj.coloumn_id; obj.coloumn_id < obj.ColoumnsCount && obj.data_cursor < obj.data.length; obj.data_cursor++) {
                //TODO understand and fix before the code reaches this point way a cell is undefined some times
                if (obj.data[obj.data_cursor]) obj.addCell(obj.data[obj.data_cursor]);
            }

            //doc.appendChild(obj.row);
            if (obj.coloumn_id === obj.ColoumnsCount) {
                obj.Cells[obj.row_id] = obj.row;
                obj.row_id++;
            } else if (obj.data_cursor >= obj.data.length) {
                if (obj.row.innerHTML !== '') obj.Cells[obj.row_id] = obj.row;
                break;
            }
        }
    }
    obj.emptyContent = !response_items && !obj.status;
    Screens_loadDataSuccessFinish(obj);
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
        '" class="stream_thumbnail_game_text_holder"><div class="stream_text_holder"><div id="<div id="' +
        idArray[3] + id + '" class="stream_info_game_name">' + valuesArray[1] + '</div>' +
        (valuesArray[2] !== '' ? '<div id="' + idArray[4] + id +
            '"class="stream_info_live" style="width: 100%; display: inline-block;">' + valuesArray[2] +
            '</div>' : '') + '</div></div></div>');
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
        '" class="stream_thumbnail_live_text_holder"><div class="stream_text_holder"><div style="line-height: 1.6ch;"><div id="' +
        idArray[3] + id + '" class="stream_info_live_name" style="width: 72%; display: inline-block;">' +
        valuesArray[4] + '</div><div id="' + idArray[7] + id +
        '"class="stream_info_live" style="width:27%; float: right; text-align: right; display: inline-block;">' +
        valuesArray[11] + '</div></div><div id="' + idArray[11] + id + '"class="' +
        (Extra_when ? 'stream_info_live_title_single_line' : 'stream_info_live_title') + '">' +
        valuesArray[10] + '</div>' +
        '<div id="' + idArray[4] + id + '"class="stream_info_live">' + playing + '</div>' +
        '<div style="line-height: 1.3ch;"><div id="' + idArray[6] + id +
        '"class="stream_info_live" style="width: auto; display: inline-block;">' + (valuesArray[16] ? valuesArray[16] : valuesArray[12]) + ',' + STR_SPACE + //Old sorting fix
        valuesArray[14] + '</div><div id="' + idArray[5] + id +
        '"class="stream_info_live" style="width: 6ch; display: inline-block; float: right; text-align: right;">' +
        Play_timeS(valuesArray[1]) + '</div></div>' +
        (Extra_when ? ('<div class="stream_info_live">' + STR_WATCHED + Main_videoCreatedAtWithHM(Extra_when) + STR_SPACE +
            STR_UNTIL + Play_timeS(Extra_until < valuesArray[1] ? Extra_until : valuesArray[1]) + '</div>') : '') +
        '</div></div></div></div>');
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
        '" class="stream_thumbnail_live_text_holder"><div class="stream_text_holder"><div style="line-height: 1.6ch;"><div id="' +
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
        '</div></div></div>');
}

//TODO uncomplicate this ifs
function Screens_createCellLive(id, idArray, valuesArray, Extra_when, Extra_vodimg, force_VOD) {

    if (!valuesArray[1]) valuesArray[1] = valuesArray[6];

    var ishosting = Main_A_includes_B(valuesArray[1], STR_USER_HOSTING),
        image = (force_VOD ? Extra_vodimg : (valuesArray[0].replace("{width}x{height}", Main_VideoSize) + Main_randomimg));

    return Screens_createCell(
        idArray[8] + id,
        valuesArray,
        '<div id="' + idArray[0] + id + '" class="stream_thumbnail_live"><div class="stream_thumbnail_live_img"><img id="' +
        idArray[1] + id + '" class="stream_img" alt="" src="' + image +
        (Extra_vodimg ?
            ('" onerror="this.onerror=function(){this.onerror=null;this.src=\'' + inUseObj.img_404 +
                '\';};this.src=\'' + Extra_vodimg + '\';' +
                'this.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].classList.add(\'hideimp\');' +
                'this.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[2].classList.remove(\'hideimp\');" crossorigin="anonymous"></div><div id="') :
            ('" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\';"></div><div id="')) +
        idArray[2] + id +
        '" class="stream_thumbnail_live_text_holder"><div class="stream_text_holder"><div style="line-height: 1.6ch;"><div id="' +
        idArray[3] + id + '" class="stream_info_live_name" style="width:' + (ishosting ? 99 : 66) + '%; display: inline-block;">' +
        '<i class="icon-' + (valuesArray[8] ? 'refresh' : 'circle') + ' live_icon strokedeline' + (force_VOD ? ' hideimp' : '') + '" style="color: ' +
        (valuesArray[8] ? '#FFFFFF' : ishosting ? '#FED000' : 'red') + ';"></i> ' +
        (Extra_vodimg || force_VOD ?
            ('<div class="vodicon_text ' + (force_VOD ? '' : 'hideimp') + '" style="background: #00a94b;">&nbsp;&nbsp;VOD&nbsp;&nbsp;</div>&nbsp;') :
            '<span style="display: none;"></span>') + //empty span to prevent error when childNodes[2].classList.remove
        valuesArray[1] + '</div><div id="' + idArray[7] + id +
        '"class="stream_info_live" style="width:' + (ishosting ? 0 : 33) + '%; float: right; text-align: right; display: inline-block;">' +
        valuesArray[5] + '</div></div>' +
        '<div id="' + idArray[4] + id + '"class="' +
        (Extra_when ? 'stream_info_live_title_single_line' : 'stream_info_live_title') + '">' + Main_ReplaceLargeFont(twemoji.parse(valuesArray[2])) + '</div>' +
        '<div id="' + idArray[5] + id + '"class="stream_info_live">' + (valuesArray[3] !== "" ? STR_PLAYING + valuesArray[3] : "") +
        '</div><div id="' + idArray[6] + id + '"class="stream_info_live">' +
        valuesArray[11] + valuesArray[4] + '</div>' +
        (Extra_when ? ('<div class="stream_info_live">' + STR_WATCHED + Main_videoCreatedAtWithHM(Extra_when) + STR_SPACE +
            STR_UNTIL + Play_timeMs(Extra_when - (new Date(valuesArray[12]).getTime())) + '</div>') : '') +
        '</div></div></div>');
}

function Screens_loadDataSuccessFinish(obj) {
    Main_Log('Screens_loadDataSuccessFinish ' + obj.screen);
    if (!obj.status) {
        if (Main_values.Main_Go === Main_aGame) AGame_Checkfollow();

        if (obj.emptyContent) Main_showWarningDialog(obj.empty_str());
        else {
            obj.status = true;
            var i;

            for (i = 0; i < (obj.Cells.length < obj.visiblerows ? obj.Cells.length : obj.visiblerows); i++) {
                if (obj.Cells[i]) {
                    inUseObj.tableDoc.appendChild(obj.Cells[i]);
                    obj.Cells[i].style.position = '';
                    obj.Cells[i].style.transition = 'none';
                }
            }

            //Show screen offseted to calculated Screens_setOffset as display none doesn't allow calculation
            if (!Main_isScene1DocShown()) {
                Main_Scene1Doc.style.transform = 'translateY(-1000%)';
                Main_ShowElementWithEle(Main_Scene1Doc);
                Screens_setOffset(1, 0);
                Main_HideElementWithEle(Main_Scene1Doc);
                Main_Scene1Doc.style.transform = 'translateY(0px)';
            } else Screens_setOffset(1, 0);

            for (i = 0; i < (obj.Cells.length < obj.visiblerows ? obj.Cells.length : obj.visiblerows); i++) {
                if (obj.Cells[i]) {
                    obj.Cells[i].style.transform = 'translateY(' + (i * inUseObj.offsettop) + 'em)';
                }
            }

        }
        obj.FirstLoad = false;

        if (Main_FirstRun) {
            Main_Log('Main_FirstRun ' + Main_FirstRun);
            //Force reset some values as I have reset the Never_run_new value and some things may crash
            if (Main_values.Never_run_new) {
                Main_GoBefore = Main_Live;
                Main_values.Play_WasPlaying = 0;
            }
            Screens_ForceSync = false;

            if (!Main_values.Never_run_new && Main_values.warning_extra) Main_showWarningExtra(STR_WARNING_NEW);
            Main_values.warning_extra = false;

            if (Settings_value.start_user_screen.defaultValue) {

                Main_ExitCurrent(Main_values.Main_Go);
                Users_beforeUser = Main_GoBefore;
                Main_values.Main_Before = Users_beforeUser;
                Main_values.Main_Go = Main_Users;
                Main_values.Play_WasPlaying = 0;
                Main_SwitchScreen(false);
                Screens_loadDataSuccessFinishEnd();

            } else if (Settings_value.restor_playback.defaultValue && Main_values.Play_WasPlaying) {// && obj.status
                Main_Log('Play_WasPlaying');

                Main_ExitCurrent(Main_values.Main_Go);
                Main_values.Main_Go = Main_GoBefore;
                Play_showWarningDialog(STR_RESTORE_PLAYBACK_WARN, 5000);

                //History vod is so fast to load that this need to be set here to prevent a vod reset
                Main_FirstRun = false;

                if (Main_values.Play_WasPlaying === 1) {
                    if (Play_data.data.length > 0) {

                        Main_openStream();
                        Main_SwitchScreen(true);

                    } else Main_SwitchScreen(false);
                } else {
                    if (!Main_values.vodOffset) Main_values.vodOffset = 1;
                    Play_DurationSeconds = 0;
                    Main_openVod();
                    Main_SwitchScreen(true);
                }

                Screens_loadDataSuccessFinishEnd();

            } else if (Main_GoBefore !== Main_Live && Main_GoBefore !== Main_addUser &&
                Main_GoBefore !== Main_Search) {
                Main_Log('!Play_WasPlaying');

                Main_HideElementWithEle(obj.ScrollDoc);
                Main_ExitCurrent(Main_values.Main_Go);
                Main_values.Main_Go = Main_GoBefore;
                Screens_RemoveAllFocus();
                Main_SwitchScreen();
                if (!Main_newUsercode) Screens_loadDataSuccessFinishEnd();
                else {
                    Main_FirstRun = false;
                    Main_HideLoadDialog();
                }
            } else {
                Main_Log('Play_WasPlaying else');

                //Values that need to be reset to prevent app odd behavier
                Main_values.Search_isSearching = false;
                Main_values.Main_BeforeChannelisSet = false;
                Main_values.Main_BeforeAgameisSet = false;

                if (Main_values.Never_run_new)
                    Main_showControlsDialog(Screens_handleKeyDown, Screens_handleKeyControls);

                if (Main_values.Never_run_phone && !Main_isTV) {
                    Main_showphoneDialog(Main_values.Never_run_new ?
                        Screens_handleKeyControls : Screens_handleKeyDown, Screens_handleKeyControls);
                }

                if (!Main_values.Never_run_new) Screens_addFocus(true);

                Main_values.Never_run_new = false;
                Main_values.Never_run_phone = false;

                Main_SaveValues();
                Screens_loadDataSuccessFinishEnd();
            }
        } else {
            Screens_addFocus(true);
            Main_SaveValues();
            Main_HideLoadDialog();
        }
    } else if (Main_isElementShowingWithEle(obj.ScrollDoc)) {
        Main_CounterDialog(obj.posX, obj.posY, obj.ColoumnsCount, obj.itemsCount);
        Screens_addFocus(true);
    }
}

var CheckAccessibilityVWasVisible = false;
function Screens_handleKeyControls(event) {

    switch (event.keyCode) {
        case KEY_ENTER:
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            if (Main_CheckAccessibilityVisible()) {
                CheckAccessibilityVWasVisible = true;
                document.body.removeEventListener("keydown", Main_CheckAccessibilityKey, false);
                Main_HideElement('dialog_accessibility');
            } else CheckAccessibilityVWasVisible = false;

            if (Main_isphoneDialogVisible()) {
                Main_HidephoneDialog();
                break;
            }

            Main_HideControlsDialog();
            Main_HideAboutDialog();
            document.body.removeEventListener("keydown", Screens_handleKeyControls);

            if (CheckAccessibilityVWasVisible) Main_CheckAccessibilitySet();
            else {
                document.body.addEventListener("keydown", Screens_handleKeyDown, false);
                Screens_addFocus(true);
            }

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
    AddUser_UpdateSidepanelAfterShow();

    if (Main_values.Sidepannel_IsUser) Sidepannel_SetUserLables();
    else Sidepannel_SetDefaultLables();

    Sidepannel_SetTopOpacity(Main_values.Main_Go);
    Main_CheckAccessibility(true);
    //Remove the try after some app updates
    //Make sure the service is stop
    try {
        JSON.parse(Android.StopNotificationService());
    } catch (e) {}
    Main_Log('Screens_loadDataSuccessFinishEnd');
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
        Screens_addFocusFollow();

        if (!inUseObj.emptyContent)
            Main_CounterDialog(inUseObj.posX, inUseObj.posY + 1, inUseObj.ColoumnsCount, inUseObj.itemsCount);

        return;
    }

    //Load more as the data is getting used
    if (inUseObj.data) {
        if ((inUseObj.posY > 2) && (inUseObj.data_cursor + Main_ItemsLimitMax) > inUseObj.data.length && !inUseObj.dataEnded && !inUseObj.loadingData) {
            Screens_loadDataRequestStart(inUseObj);
        } else if ((inUseObj.posY + inUseObj.ItemsReloadLimit) > (inUseObj.itemsCount / inUseObj.ColoumnsCount) && inUseObj.data_cursor < inUseObj.data.length) {
            inUseObj.loadDataSuccess();
        }
    }

    inUseObj.addrow(forceScroll, inUseObj.posY);
}

function Screens_ThumbNotNull(thumbnail) {
    return document.getElementById(thumbnail) !== null;
}

function Screens_addrowAnimated(y, y_plus, y_plus_offset, for_in, for_out, for_offset, eleRemovePos, down) {
    Screens_ChangeFocusAnimationFinished = false;
    Screens_ChangeFocusAnimationFast = true;

    inUseObj.Cells[y + y_plus].style.transform = 'translateY(' + (y_plus_offset * inUseObj.offsettop) + 'em)';

    if (down) inUseObj.tableDoc.appendChild(inUseObj.Cells[y + y_plus]);
    else inUseObj.tableDoc.insertBefore(inUseObj.Cells[y + y_plus], inUseObj.tableDoc.childNodes[inUseObj.HasSwitches ? 1 : 0]);

    //Delay to make sure inUseObj.Cells[y + y_plus] is added and it's position is ready
    Main_ready(function() {
        for (var i = for_in; i < for_out; i++)
            Screens_addrowtransition(y + i, (for_offset + i) * inUseObj.offsettop, '');

        window.setTimeout(function() {
            UserLiveFeed_RemoveElement(inUseObj.Cells[y + eleRemovePos]);
            Screens_ChangeFocusAnimationFinished = true;
        }, Screens_ScrollAnimationTimeout);
    });
}

function Screens_addrowtransition(pos, offset, transition) {
    if (inUseObj.Cells[pos]) {
        inUseObj.Cells[pos].style.transition = transition;
        inUseObj.Cells[pos].style.transform = 'translateY(' + offset + 'em)';
    }
}

function Screens_addrowNotAnimated(y, y_plus, for_in, for_out, for_offset, eleRemovePos, down) {

    if (down) inUseObj.tableDoc.appendChild(inUseObj.Cells[y + y_plus]);
    else inUseObj.tableDoc.insertBefore(inUseObj.Cells[y + y_plus], inUseObj.tableDoc.childNodes[inUseObj.HasSwitches ? 1 : 0]);

    for (var i = for_in; i < for_out; i++)
        Screens_addrowtransition(y + i, (for_offset + i) * inUseObj.offsettop, 'none');

    UserLiveFeed_RemoveElement(inUseObj.Cells[y + eleRemovePos]);
}

function Screens_addrowChannel(forceScroll, y) {
    if (inUseObj.currY < y) { // down

        if (y > 2) Screens_addrowChannelDown(y);

    } else if (inUseObj.currY > y) { // Up


        if (y > 1 && (inUseObj.Cells.length) > (y + 3)) {

            if (Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
                !Screens_ChangeFocusAnimationFast) { //If with animation

                Screens_addrowAnimated(
                    y,
                    -2, //y_plus
                    -2,  //y_plus_offset
                    -2, //for_in
                    6,  //for_out
                    2,  //for_offset
                    3,  //eleRemovePos
                    0   //down?
                );

            } else {

                Screens_addrowNotAnimated(
                    y,
                    -2, //y_plus
                    -2, //for_in
                    6,  //for_out
                    2,  //for_offset
                    3,   //eleRemovePos
                    0   //down?
                );

            }
        }
    }

    inUseObj.currY = inUseObj.posY;
    Screens_addrowEnd(forceScroll);
}

function Screens_addrowChannelDown(y) {
    if (inUseObj.Cells[y + 2]) {

        if (Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
            !Screens_ChangeFocusAnimationFast) { //If with animation

            Screens_addrowAnimated(
                y,
                2,  //y_plus
                4,  //y_plus_offset
                -2, //for_in
                5,  //for_out
                2,  //for_offset
                -3, //eleRemovePos
                1   //down?
            );

        } else {

            Screens_addrowNotAnimated(
                y,
                2,  //y_plus
                -2, //for_in
                5,  //for_out
                2,  //for_offset
                -3,  //eleRemovePos
                1   //down?
            );
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
        Screens_addrowDown(y);
    } else if (inUseObj.currY > y) { // Up

        if (y && (inUseObj.Cells.length) > (y + 1) && inUseObj.Cells[y + 2]) {

            if (Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
                !Screens_ChangeFocusAnimationFast) { //If with animation

                Screens_addrowAnimated(
                    y,
                    -1, //y_plus
                    -1, //y_plus_offset
                    -1, //for_in
                    3,  //for_out
                    1,  //for_offset
                    2,  //eleRemovePos
                    0   //down?
                );

            } else {

                Screens_addrowNotAnimated(
                    y,
                    -1, //y_plus
                    -1, //for_in
                    3,  //for_out
                    1,  //for_offset
                    2,  //eleRemovePos
                    0   //down?
                );
            }

        }
    }

    inUseObj.currY = inUseObj.posY;
    Screens_addrowEnd(forceScroll);
}

function Screens_addrowDown(y) {
    if (y > 1 && inUseObj.Cells[y + 1]) {

        if (Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
            !Screens_ChangeFocusAnimationFast) { //If with animation

            Screens_addrowAnimated(
                y,
                1,  //y_plus
                3,  //y_plus_offset
                -1, //for_in
                2,  //for_out
                1,  //for_offset
                -2, //eleRemovePos
                1   //down?
            );

        } else {

            Screens_addrowNotAnimated(
                y,
                1,  //y_plus
                -1, //for_in
                2,  //for_out
                1,  //for_offset
                -2, //eleRemovePos
                1   //down?
            );

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

function Screens_addrowEnd(forceScroll) {
    Main_ready(function() {

        Main_AddClass(inUseObj.ids[0] + inUseObj.posY + '_' + inUseObj.posX, Main_classThumb);

        inUseObj.addFocus(inUseObj.posY, forceScroll);

        Main_CounterDialog(inUseObj.posX, inUseObj.posY, inUseObj.ColoumnsCount, inUseObj.itemsCount);

    });
}

function Screens_setOffset(pos, y) {
    if (!inUseObj.offsettop || inUseObj.offsettopFontsize !== Settings_Obj_default('global_font_offset')) {
        pos = !y ? (y + pos) : y;
        if (inUseObj.Cells[pos]) {
            inUseObj.offsettop = (document.getElementById(inUseObj.ids[12] + pos).offsetHeight + document.getElementById(inUseObj.ids[0] + pos + '_0').offsetTop) / BodyfontSize;
        } else inUseObj.offsettop = 1;

        inUseObj.offsettopFontsize = Settings_Obj_default('global_font_offset');
    }
}

function Screens_addFocusChannel(y, forceScroll) {

    if (Main_YchangeAddFocus(y) || forceScroll) {

        if (y > 1) {

            //Channels is a odd screen as thumb are small it need a minor workaround to get all working
            //TODO revise this for a simple implementation
            if (inUseObj.Cells.length < 6) {
                if (inUseObj.Cells[y + 1] && (y + 2) < inUseObj.Cells.length || inUseObj.Cells.length === 4)
                    inUseObj.ScrollDoc.style.transform = 'translateY(-' + inUseObj.offsettop + 'em)';
                else if (inUseObj.Cells.length > 3)
                    inUseObj.ScrollDoc.style.transform = 'translateY(-' + (inUseObj.offsettop * 2) + 'em)';
            } else {
                if (inUseObj.Cells[y + 2])
                    inUseObj.ScrollDoc.style.transform = 'translateY(-' + inUseObj.offsettop + 'em)';
                else
                    inUseObj.ScrollDoc.style.transform = 'translateY(-' + (inUseObj.offsettop * 2) + 'em)';
            }

        } else inUseObj.ScrollDoc.style.transform = '';

    }
}

function Screens_addFocusVideo(y, forceScroll) {

    if (Main_YchangeAddFocus(y) || forceScroll) {

        if (!y) inUseObj.ScrollDoc.style.transform = '';
        else if (y === 1) {

            if (inUseObj.Cells[y + 1]) //We didn't reach the bottom yet
                inUseObj.ScrollDoc.style.transform = 'translateY(-' + inUseObj.offsettop + 'em)';

        }
    }
}

function Screens_ChangeFocus(y, x) {
    if (inUseObj.posY > -1) Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
    else Screens_removeFocusFollow();

    Screens_ClearAnimation();
    inUseObj.posY += y;
    inUseObj.posX = x;

    Screens_addFocus();
}

function Screens_addFocusFollow() {
    if (inUseObj.posX > inUseObj.SwitchesIcons.length - 1) inUseObj.posX = 0;
    else if (inUseObj.posX < 0) inUseObj.posX = inUseObj.SwitchesIcons.length - 1;

    Main_AddClass(inUseObj.ids[0] + 'y_' + inUseObj.posX, 'stream_switch_focused');
}

function Screens_removeFocusFollow() {
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
        Screens_addFocusFollow();
    } else if (inUseObj.HasSwitches && (inUseObj.posY) === -1 && (Main_ThumbNull(0, inUseObj.posX, inUseObj.ids[0]))) {
        inUseObj.posY = 0;
        Screens_addFocus();
        Screens_removeFocusFollow();
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
        if (Screens_ThumbNotNull(inUseObj.ids[1] + inUseObj.posY + '_' + inUseObj.posX)) Main_ShowElement(inUseObj.ids[1] + inUseObj.posY + '_' + inUseObj.posX);
    }
}

function Screens_KeyLeftRight(y, x) {
    if (inUseObj.HasSwitches && inUseObj.posY === -1) {
        inUseObj.posY = -1;
        Screens_removeFocusFollow();
        inUseObj.posX += (!x ? 1 : -1);
        Screens_addFocusFollow();
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
        Screens_removeFocusFollow();
        inUseObj.posY = 0;
        inUseObj.posX = 0;
    }
}

var Screens_handleKeyUpIsClear = false;

function Screens_handleKeyUp(e) {
    if (e.keyCode === KEY_ENTER) {
        Screens_handleKeyUpClear();
        if (!Screens_clear) inUseObj.key_play();
    } else if (e.keyCode === KEY_LEFT) {
        window.clearTimeout(Screens_KeyEnterID);
        document.body.removeEventListener("keyup", Screens_handleKeyUp);
        if (!Screens_clear) {
            if (!inUseObj.posX) Screens_OpenSidePanel();
            else {
                Screens_KeyLeftRight(-1, inUseObj.ColoumnsCount - 1);
                document.body.addEventListener("keydown", Screens_handleKeyDown, false);
            }
        }
    }
    Screens_handleKeyUpIsClear = true;
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

function Screens_keyRight() {
    //Prevent scroll too fast out of inUseObj.Cells.length
    //here (inUseObj.posY + 3) the 3 is 1 bigger then the 2 in Screens_addrow*Down (inUseObj.Cells[y + 2])
    if (inUseObj.dataEnded ||
        inUseObj.posX < (inUseObj.ColoumnsCount - 1) ||
        (inUseObj.Cells.length - 1) >= (inUseObj.posY + 1)) {
        if (inUseObj.posX === (inUseObj.ColoumnsCount - 1)) {
            if (Screens_ChangeFocusAnimationFinished) Screens_KeyLeftRight(1, 0);
        } else Screens_KeyLeftRight(1, 0);
    } else Screens_addFocus(true);
}

function Screens_handleKeyDown(event) {
    if (inUseObj.FirstLoad || Main_CantClick()) return;

    Main_keyClickDelayStart();

    switch (event.keyCode) {
        case KEY_MEDIA_REWIND:
        case KEY_PG_UP:
            //TODO improve this pg up and down so many unnecessary ifs
            if (inUseObj.key_pgUp) {
                Screens_RemoveAllFocus();
                if (inUseObj.screen === Main_UserChannels)
                    Sidepannel_Go(!AddUser_UsernameArray[0].access_token ? inUseObj.key_pgUpNext : inUseObj.key_pgUp);
                else if (inUseObj.screen === Main_UserLive)
                    Sidepannel_Go(Main_History[Main_HistoryPos]);
                else if (inUseObj.screen === Main_aGame) {

                    if (Main_values.Main_BeforeAgame === Main_usergames) Sidepannel_Go(Main_UserHost);
                    else Sidepannel_Go(Main_Featured);

                } else Sidepannel_Go(inUseObj.key_pgUp);
            }
            break;
        case KEY_MEDIA_FAST_FORWARD:
        case KEY_PG_DOWN:
            if (inUseObj.key_pgDown) {
                Screens_RemoveAllFocus();
                if (inUseObj.screen === Main_usergames)
                    Sidepannel_Go(!AddUser_UsernameArray[0].access_token ? inUseObj.key_pgDownNext : inUseObj.key_pgDown);
                else if (inUseObj.screen === Main_UserChannels)
                    Sidepannel_Go(Main_History[Main_HistoryPos]);
                else if (inUseObj.screen === Main_aGame) {

                    if (Main_values.Main_BeforeAgame === Main_usergames) Sidepannel_Go(Main_UserVod);
                    else Sidepannel_Go(Main_Vod);

                } else Sidepannel_Go(inUseObj.key_pgDown);
            }
            break;
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            inUseObj.key_exit();
            break;
        case KEY_LEFT:
            Screens_ThumbOptionSpecial = inUseObj.histPosXName ? false : true;
            Screens_handleKeyUpIsClear = false;

            document.body.removeEventListener("keydown", Screens_handleKeyDown, false);
            document.body.addEventListener("keyup", Screens_handleKeyUp, false);
            Screens_clear = false;
            Screens_KeyEnterID = window.setTimeout(Screens_ThumbOptionStart, 500);
            break;
        case KEY_RIGHT:
            Screens_keyRight();
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
        case KEY_1:
        case KEY_PLAY:
        case KEY_PLAYPAUSE:
        case KEY_KEYBOARD_SPACE:
        case KEY_MEDIA_PREVIOUS:
            inUseObj.key_play();
            break;
        case KEY_ENTER:
            document.body.removeEventListener("keydown", Screens_handleKeyDown, false);
            document.body.addEventListener("keyup", Screens_handleKeyUp, false);
            Screens_clear = false;
            Screens_KeyEnterID = window.setTimeout(Main_ReloadScreen, 400);
            break;
        case KEY_MEDIA_NEXT:
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
            Screens_OpenSidePanel(AddUser_UserIsSet());
            if (!AddUser_UserIsSet()) {
                Main_showWarningDialog(STR_NOKUSER_WARN);
                window.setTimeout(Main_HideWarningDialog, 2000);
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
        Main_SwitchScreen();
    } else if (inUseObj.posX === 1) {
        Main_values.Main_Go = Main_AGameClip;
        Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
        AGame_headerOptionsExit();
        Main_SwitchScreen();
    } else AGame_follow();
}

function AGame_headerOptionsExit() {
    if (inUseObj.status && inUseObj.posY === -1) {
        Screens_removeFocusFollow();
        inUseObj.posY = 0;
        inUseObj.posX = 0;
        Main_AddClass(inUseObj.ids[0] + '0_' + inUseObj.posX, Main_classThumb);
    }
    document.body.removeEventListener("keydown", Screens_handleKeyDown);
    Main_HideElementWithEle(inUseObj.ScrollDoc);
}

function AGame_follow() {
    if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
        if (AGame_following) AddCode_UnFollowGame();
        else AddCode_FollowGame();
    } else {
        Main_showWarningDialog(STR_NOKEY_WARN);
        window.setTimeout(function() {
            if (inUseObj.emptyContent && Main_values.Main_Go === Main_aGame) Main_showWarningDialog(STR_NO + STR_LIVE_GAMES);
            else Main_HideWarningDialog();
        }, 2000);
    }
}

function AGame_Checkfollow() {
    if (AddUser_UserIsSet()) AddCode_CheckFollowGame();
    else {
        AGame_following = false;
        AGame_setFollow();
    }
}

function AGame_setFollow() {
    if (AGame_following) Main_innerHTML(AGame.ids[3] + "y_2", '<i class="icon-heart" style="color: #6441a4; font-size: 100%;"></i>' + STR_SPACE + STR_SPACE + STR_FOLLOWING);
    else Main_innerHTML(AGame.ids[3] + "y_2", '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; "></i>' + STR_SPACE + STR_SPACE + (AddUser_UserIsSet() ? STR_FOLLOW : STR_NOKEY));
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
var Screens_ThumbOptionSpecial;

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

var Screens_DeleteDialogAll = true;

function Screens_histDialogHide(Update) {
    Screens_histRemoveFocus(inUseObj.histPosY, 'hist');

    Screens_histAddFocus(0);
    Screens_clearhistDialogId();
    document.body.removeEventListener("keydown", Screens_histhandleKeyDown, false);
    document.body.addEventListener("keydown", Screens_handleKeyDown, false);
    Main_HideElement('dialog_hist_setting');

    if (Update) {
        if (inUseObj.histPosY === 2) {
            Screens_DeleteDialogAll = true;
            Screens_showDeleteDialog(STR_DELETE_SURE + inUseObj.history_Type() + STR_SPACE + STR_HISTORY + '?');
        } else if (inUseObj.histPosX[0] !== inUseObj.histPosXTemp[0]) {
            inUseObj.label_init();
            Main_ReloadScreen();
        }
    } else {
        inUseObj.histPosX = Main_Slice(inUseObj.histPosXTemp);
        Main_setItem(inUseObj.histPosXName, JSON.stringify(inUseObj.histPosX));
    }
    inUseObj.histPosY = 0;
}

function Screens_showDeleteDialog(text) {
    Main_innerHTML("main_dialog_remove", text);
    Main_ShowElement('main_remove_dialog');
    document.body.removeEventListener("keydown", Screens_handleKeyDown, false);
    document.body.addEventListener("keydown", Screens_histDeleteKeyDown, false);
    Screens_setRemoveDialog();
}

function Screens_setRemoveDialog() {
    Users_RemoveDialogID = window.setTimeout(Screens_HideRemoveDialog, 5000);
}

function Screens_HideRemoveDialog() {
    Users_clearRemoveDialog();
    document.body.removeEventListener("keydown", Screens_histDeleteKeyDown);
    document.body.addEventListener("keydown", Screens_handleKeyDown, false);
    Main_HideElement('main_remove_dialog');
    Users_RemoveCursor = 0;
    Users_UserCursorSet();
    Users_RemoveCursorSet();
}

function Screens_histDeleteKeyDown(event) {
    switch (event.keyCode) {
        case KEY_LEFT:
            Users_RemoveCursor--;
            if (Users_RemoveCursor < 0) Users_RemoveCursor = 1;
            Users_RemoveCursorSet();
            Users_clearRemoveDialog();
            Screens_setRemoveDialog();
            break;
        case KEY_RIGHT:
            Users_RemoveCursor++;
            if (Users_RemoveCursor > 1) Users_RemoveCursor = 0;
            Users_RemoveCursorSet();
            Users_clearRemoveDialog();
            Screens_setRemoveDialog();
            break;
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            Users_RemoveCursor = 0;
        /* falls through */
        case KEY_ENTER:
            var temp = Users_RemoveCursor;
            Screens_HideRemoveDialog();

            if (temp) Screens_histDelete();
            break;
        default:
            break;
    }
}

function Screens_histDelete() {
    if (Screens_DeleteDialogAll) {
        Main_values_History_data[AddUser_UsernameArray[0].id][inUseObj.Type] = [];
        Main_setHistoryItem();
        Main_ReloadScreen();
    } else {
        var type = 'live';

        if (inUseObj.screen === Main_HistoryVod) type = 'vod';
        else if (inUseObj.screen === Main_HistoryClip) type = 'clip';

        var index = Main_history_Exist(type, Screens_values_Play_data[7]);
        if (index > -1) {
            Main_values_History_data[AddUser_UsernameArray[0].id][type].splice(index, 1);
            Main_setHistoryItem();
        }
    }
}

function Screens_histAddFocus(divPos) {
    Main_AddClass('dialog_hist_setting_' + divPos, 'settings_div_focus');
    Main_AddClass('dialog_hist_val_' + divPos, 'settings_value_focus');
    Screens_histSetArrow();
}

function Screens_histRemoveFocus(divPos, dialog) {
    Main_RemoveClass('dialog_' + dialog + '_setting_' + divPos, 'settings_div_focus');
    Main_RemoveClass('dialog_' + dialog + '_val_' + divPos, 'settings_value_focus');
    document.getElementById('dialog_' + dialog + '_left_' + divPos).style.opacity = "0";
    document.getElementById('dialog_' + dialog + '_right_' + divPos).style.opacity = "0";
}

function Screens_histSetArrow() {
    Screens_histArrow(
        'hist',
        inUseObj.histPosX[inUseObj.histPosY],
        inUseObj.histArrays[inUseObj.histPosY].length,
        inUseObj.histArrays[inUseObj.histPosY][inUseObj.histPosX[inUseObj.histPosY]],
        inUseObj.histPosY
    );

    Main_setItem(inUseObj.histPosXName, JSON.stringify(inUseObj.histPosX));
}

function Screens_histArrow(dialog, pos, maxValue, text, divPos) {
    Main_innerHTML('dialog_' + dialog + '_val_' + divPos, text);

    if (maxValue === 1) {
        document.getElementById('dialog_' + dialog + '_left_' + divPos).style.opacity = "0";
        document.getElementById('dialog_' + dialog + '_right_' + divPos).style.opacity = "0";
    } else if (!pos) {
        document.getElementById('dialog_' + dialog + '_left_' + divPos).style.opacity = "0.2";
        document.getElementById('dialog_' + dialog + '_right_' + divPos).style.opacity = "1";
    } else if (pos === (maxValue - 1)) {
        document.getElementById('dialog_' + dialog + '_left_' + divPos).style.opacity = "1";
        document.getElementById('dialog_' + dialog + '_right_' + divPos).style.opacity = "0.2";
    } else {
        document.getElementById('dialog_' + dialog + '_left_' + divPos).style.opacity = "1";
        document.getElementById('dialog_' + dialog + '_right_' + divPos).style.opacity = "1";
    }
}

function Screens_histhandleKeyDown(event) {
    switch (event.keyCode) {
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
                Screens_histRemoveFocus(inUseObj.histPosY + 1, 'hist');
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
                Screens_histRemoveFocus(inUseObj.histPosY - 1, 'hist');
                Screens_histAddFocus(inUseObj.histPosY);
            }
            break;
        case KEY_ENTER:
            Screens_histDialogHide(true);
            break;
        default:
            break;
    }
}

var Screens_ThumbOptionPosY = 0;

function Screens_ThumbOptionStart() {
    Screens_clear = true;

    Screens_ThumbOptionSetArrowArray();

    if (Screens_ThumbOptionSpecial) {
        Screens_ThumbOptionPosY = 5;
        Main_textContent('dialog_thumb_opt_val_5', Screens_ThumbOptionScreens[0]);
        Screens_ThumbOptionAddFocus(Screens_ThumbOptionPosY);
    } else {
        Screens_ThumbOptionShowSpecial();

        Screens_ThumbOptionStringSet();
        Screens_ThumbOptionPosY = 0;
    }

    inUseObj.setTODialog();
    Screens_SeTODialogId();
    document.body.removeEventListener("keydown", Screens_handleKeyDown);
    document.body.addEventListener("keydown", Screens_ThumbOptionhandleKeyDown, false);

    Main_ShowElement('dialog_thumb_opt');
}

function Screens_ThumbOptionShowSpecial() {
    for (var i = 0; i < 5; i++)
        Main_RemoveClass('dialog_thumb_opt_setting_' + i, 'hideimp');
}

function Screens_ThumbOptionHideSpecial() {
    for (var i = -1; i < 5; i++)
        Main_AddClass('dialog_thumb_opt_setting_' + i, 'hideimp');
}

var Screens_values_Play_data;
var Screens_canFollow = false;
var Screens_isFollowing = false;

function Screens_ThumbOptionStringSet() {
    Screens_canFollow = false;
    Screens_values_Play_data = JSON.parse(document.getElementById(inUseObj.ids[8] + inUseObj.posY + '_' + inUseObj.posX).getAttribute(Main_DataAttribute));

    if (AddUser_UserIsSet()) {
        Screens_ThumbOption_CheckFollow(Screens_values_Play_data);
        Main_textContent('dialog_thumb_opt_setting_name_2', STR_CHECK_HISTORY);
    } else Main_textContent('dialog_thumb_opt_setting_name_2', STR_NOKEY + STR_CANT_FOLLOW);

    Main_textContent('dialog_thumb_opt_val_2', '...');

    if (inUseObj.screenType < 2) {
        Main_values.Play_isHost = Main_A_includes_B(Screens_values_Play_data[1], STR_USER_HOSTING);

        if (Main_values.Play_isHost) {
            Main_textContent('dialog_thumb_opt_val_0', Screens_values_Play_data[1].split(STR_USER_HOSTING)[1]);
        } else Main_textContent('dialog_thumb_opt_val_0', Screens_values_Play_data[1]);

    } else if (inUseObj.screenType === 2) {
        Main_textContent('dialog_thumb_opt_val_0', Screens_values_Play_data[4]);
    }

    Main_textContent('dialog_thumb_opt_val_1', (Screens_values_Play_data[3] !== "" ? Screens_values_Play_data[3] : ''));

    if (inUseObj.screen === Main_HistoryLive &&
        Main_A_includes_B(document.getElementById(inUseObj.ids[1] + inUseObj.posY + '_' + inUseObj.posX).src, 's3_vods')) {
        Main_textContent('dialog_thumb_opt_val_3', Screens_YesNo[Main_getItemJson(HistoryVod.histPosXName, [0, 0, 0])[1]]);
    } else Main_textContent('dialog_thumb_opt_val_3', Screens_YesNo[Screens_ThumbOptionStringGetHistory()]);

    Main_textContent('dialog_thumb_opt_val_4', Main_ContentLang === "" ? STR_LANG_ALL : Screens_ThumbOptionLanguages[Screens_ThumbOptionPosXArrays[4]]);
    Main_textContent('dialog_thumb_opt_val_5', Screens_ThumbOptionScreens[0]);
}

var Screens_ThumbOption_CheckFollow_ID;

function Screens_ThumbOption_CheckFollow(data) {
    Screens_ThumbOption_CheckFollow_ID = (new Date()).getTime();
    if (inUseObj.screenType < 2) Screens_ThumbOption_RequestCheckFollow(data[14], 0, Screens_ThumbOption_CheckFollow_ID);
    else Screens_ThumbOption_RequestCheckFollow(data[2], 0, Screens_ThumbOption_CheckFollow_ID);
}

function Screens_ThumbOption_RequestCheckFollow(channel_id, trye, ID) {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + channel_id + Main_TwithcV5Flag_I;

    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open('GET', theUrl, true);
    xmlHttp.timeout = 5000;

    for (var i = 0; i < 2; i++)
        xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (Screens_ThumbOption_CheckFollow_ID === ID) Screens_ThumbOption_RequestCheckFollowReady(xmlHttp, channel_id, trye, ID);
    };

    xmlHttp.send(null);
}

function Screens_ThumbOption_RequestCheckFollowReady(xmlHttp, channel_id, trye, ID) {
    if (xmlHttp.readyState === 4) {
        if (Screens_ThumbOption_CheckFollow_ID !== ID) return;

        if (xmlHttp.status === 200) { //yes
            Screens_canFollow = true;
            Screens_isFollowing = true;
            Main_textContent('dialog_thumb_opt_setting_name_2', STR_FOLLOWING);
            Main_textContent('dialog_thumb_opt_val_2', STR_CLICK_UNFOLLOW.replace('(', '').replace(')', ''));
        } else if (xmlHttp.status === 404) { //no
            Screens_canFollow = true;
            Screens_isFollowing = false;
            Main_textContent('dialog_thumb_opt_setting_name_2', STR_FOLLOW);
            Main_textContent('dialog_thumb_opt_val_2', STR_CLICK_FOLLOW.replace('(', '').replace(')', ''));
        } else { // internet error
            if (trye < 5) Screens_ThumbOption_RequestCheckFollow(channel_id, trye++, ID);
        }
    }
}

function Screens_ThumbOptionStringGetHistory() {
    return Main_getItemJson(inUseObj.histPosXName, [0, 0, 0])[1];
}

function Screens_ThumbOptionhandleKeyDown(event) {
    switch (event.keyCode) {
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            Screens_ThumbOptionDialogHide();
            break;
        case KEY_LEFT:
            Screens_clearTODialogId();
            Screens_SeTODialogId();
            if (Screens_ThumbOptionPosY > 2) {
                Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY]--;
                if (Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY] < 0)
                    Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY] = 0;
                else
                    Screens_ThumbOptionSetArrow(Screens_ThumbOptionArrays[Screens_ThumbOptionPosY]);
            }
            break;
        case KEY_RIGHT:
            Screens_clearTODialogId();
            Screens_SeTODialogId();
            if (!Screens_handleKeyUpIsClear) break;
            if (Screens_ThumbOptionPosY > 2) {
                Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY]++;

                if (Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY] > (Screens_ThumbOptionArrays[Screens_ThumbOptionPosY].length - 1))
                    Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY] = Screens_ThumbOptionArrays[Screens_ThumbOptionPosY].length - 1;
                else
                    Screens_ThumbOptionSetArrow(Screens_ThumbOptionArrays[Screens_ThumbOptionPosY]);
            }
            break;
        case KEY_UP:
            if (Screens_ThumbOptionSpecial) break;
            var lower = !Main_A_includes_B(document.getElementById('dialog_thumb_opt_setting_-1').className, 'hideimp') ? -1 : 0;
            Screens_clearTODialogId();
            Screens_SeTODialogId();
            Screens_ThumbOptionPosY--;
            if (Screens_ThumbOptionPosY < lower) Screens_ThumbOptionPosY = lower;
            else {
                Screens_histRemoveFocus(Screens_ThumbOptionPosY + 1, 'thumb_opt');
                Screens_ThumbOptionAddFocus(Screens_ThumbOptionPosY);
            }
            break;
        case KEY_DOWN:
            if (Screens_ThumbOptionSpecial) break;
            Screens_clearTODialogId();
            Screens_SeTODialogId();
            Screens_ThumbOptionPosY++;
            if (Screens_ThumbOptionPosY > 5)
                Screens_ThumbOptionPosY = 5;
            else {
                Screens_histRemoveFocus(Screens_ThumbOptionPosY - 1, 'thumb_opt');
                Screens_ThumbOptionAddFocus(Screens_ThumbOptionPosY);
            }
            break;
        case KEY_ENTER:
            if (Screens_ThumbOptionPosY === 2) {
                Screens_clearTODialogId();
                Screens_SeTODialogId();
                Screens_FollowUnfollow();
            } else Screens_ThumbOptionDialogHide(true);
            break;
        default:
            break;
    }
}

var Screens_ThumbOptionDialogID;

function Screens_clearTODialogId() {
    window.clearTimeout(Screens_ThumbOptionDialogID);
}

function Screens_SeTODialogId() {
    window.clearTimeout(Screens_ThumbOptionDialogID);
    Screens_ThumbOptionDialogID = window.setTimeout(Screens_ThumbOptionDialogHide, 6000);
}

function Screens_ThumbOptionDialogHide(Update) {
    Screens_histRemoveFocus(Screens_ThumbOptionPosY, 'thumb_opt');

    Screens_clearTODialogId();
    document.body.removeEventListener("keydown", Screens_ThumbOptionhandleKeyDown, false);
    document.body.addEventListener("keydown", Screens_handleKeyDown, false);
    Main_HideElement('dialog_thumb_opt');

    if (Update) {

        if (Screens_ThumbOptionPosY === -1) {
            var streamer, title;
            if (!inUseObj.screenType) {
                streamer = Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[1];
                title = Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[2];
            } else if (inUseObj.screenType === 1) {
                streamer = Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[1];
                title = Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[10];
            } else if (inUseObj.screenType === 2) {
                streamer = Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[4];
                title = Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[10];
            }

            Screens_DeleteDialogAll = false;
            Screens_showDeleteDialog(
                STR_DELETE_SURE + inUseObj.history_Type() + STR_SPACE + STR_HISTORY + STR_SPACE + STR_FOR + '?' +
                STR_BR + STR_BR + streamer + STR_BR + title + STR_BR + STR_BR +
                STR_REFRESH_DELETE);

        } else if (!Screens_ThumbOptionPosY) Screens_OpenChannel();
        else if (Screens_ThumbOptionPosY === 1) Screens_OpenGame();
        else if (Screens_ThumbOptionPosY === 3) {
            if (!inUseObj.screenType) {
                if (inUseObj.screen === Main_HistoryLive &&
                    Main_A_includes_B(document.getElementById(inUseObj.ids[1] + inUseObj.posY + '_' + inUseObj.posX).src, 's3_vods')) {
                    HistoryVod.histPosX[1] = Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY];
                    Main_setItem(HistoryVod.histPosXName, JSON.stringify(HistoryVod.histPosX));
                } else {
                    HistoryLive.histPosX[1] = Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY];
                    Main_setItem(inUseObj.histPosXName, JSON.stringify(HistoryLive.histPosX));
                }
            } else if (inUseObj.screenType === 1) {
                HistoryVod.histPosX[1] = Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY];
                Main_setItem(inUseObj.histPosXName, JSON.stringify(HistoryVod.histPosX));
            } else if (inUseObj.screenType === 2) {
                HistoryClip.histPosX[1] = Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY];
                Main_setItem(inUseObj.histPosXName, JSON.stringify(HistoryClip.histPosX));
            }

        } else if (Screens_ThumbOptionPosY === 4) Screens_SetLang();
        else if (Screens_ThumbOptionPosY === 5) Screens_OpenScreen();
    }
    Screens_ThumbOptionPosY = 0;
    Screens_ThumbOptionAddFocus(0);
}

function Screens_SetLang() {
    if (Screens_ThumbOptionPosXArrays[4]) Languages_ResetAll();

    var key = Screens_ThumbOptionLanguages[Screens_ThumbOptionPosXArrays[4]];
    Languages_value[key].defaultValue = 1;
    Main_setItem(key, Languages_Obj_default(key) + 1);
    Languages_SetLang();

    if (!Main_A_equals_B(Main_ContentLang_old, Main_ContentLang)) Main_ReloadScreen();
}

function Screens_FollowUnfollow() {
    if (Screens_canFollow && AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
        var theUrl, channel_id = inUseObj.screenType < 2 ? Screens_values_Play_data[14] : Screens_values_Play_data[2];

        if (Screens_isFollowing) {
            theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + channel_id + Main_TwithcV5Flag_I;
            AddCode_BasexmlHttpGet(theUrl, 'DELETE', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, Screens_UnFollowRequestReady);
        } else {
            theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + channel_id + Main_TwithcV5Flag_I;
            AddCode_BasexmlHttpGet(theUrl, 'PUT', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, Screens_FollowRequestReady);
        }
    } else {
        Main_showWarningDialog(STR_NOKEY_WARN);
        window.setTimeout(Main_HideWarningDialog, 2000);
    }
}

function Screens_UnFollowRequestReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 204) { //success user is now not following the channel
            Screens_canFollow = true;
            Screens_isFollowing = false;
            Main_textContent('dialog_thumb_opt_setting_name_2', STR_FOLLOW);
            Main_textContent('dialog_thumb_opt_val_2', STR_CLICK_FOLLOW.replace('(', '').replace(')', ''));
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(0, 0, Screens_FollowUnfollow, null);
        }
    }
}

function Screens_FollowRequestReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) { //success user is now following the channel
            Screens_isFollowing = true;
            Main_textContent('dialog_thumb_opt_setting_name_2', STR_FOLLOWING);
            Main_textContent('dialog_thumb_opt_val_2', STR_CLICK_UNFOLLOW.replace('(', '').replace(')', ''));
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(0, 0, Screens_FollowUnfollow, null);
        }
    }
}

function Screens_OpenScreen() {

    if (Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY] === 8 && !AddUser_UsernameArray[0].access_token) {
        Main_showWarningDialog(STR_NOKEY_VIDEO_WARN);
        window.setTimeout(Main_HideWarningDialog, 3000);
        return;
    }

    if (!Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_AGameVod && Main_values.Main_Go !== Main_AGameClip) {
        Main_values.Main_BeforeAgame = (Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelContent && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) ? Main_values.Main_BeforeChannel : Main_values.Main_Go;
        Main_values.Main_BeforeAgameisSet = true;
    }

    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Screens_ThumbOptionGOTO[Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY]];

    Main_ReStartScreens();
}

function Screens_OpenGame() {
    Play_data.data[3] = (Screens_values_Play_data[3] !== "" ? Screens_values_Play_data[3] : '');
    if (Play_data.data[3] === '') {

        Main_showWarningDialog(STR_NO_GAME);
        window.setTimeout(Main_HideWarningDialog, 2000);
        return;
    }

    if (!Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_AGameVod && Main_values.Main_Go !== Main_AGameClip) {
        Main_values.Main_BeforeAgame = (Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelContent && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) ? Main_values.Main_BeforeChannel : Main_values.Main_Go;
        Main_values.Main_BeforeAgameisSet = true;
    }

    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_aGame;

    Main_values.Main_gameSelected = Play_data.data[3];
    Main_ReStartScreens();
}

function Screens_OpenChannel() {
    if (!Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) {
        Main_values.Main_BeforeChannel = (Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_aGame) ? Main_values.Main_BeforeAgame : Main_values.Main_Go;
        Main_values.Main_BeforeChannelisSet = true;
    }

    if (inUseObj.screenType < 2) {
        Main_values.Main_selectedChannel_id = Screens_values_Play_data[14];

        Main_values.Play_isHost = Main_A_includes_B(Screens_values_Play_data[1], STR_USER_HOSTING);

        if (Main_values.Play_isHost) {
            Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[1].split(STR_USER_HOSTING)[1];
        } else Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[1];

    } else {
        Main_values.Main_selectedChannel_id = Screens_values_Play_data[2];
        Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[4];
    }
    Main_values.Main_selectedChannel = Screens_values_Play_data[6];

    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_ChannelContent;
    Main_ReStartScreens();
}

function Screens_ThumbOptionAddFocus(divPos) {
    Main_AddClass('dialog_thumb_opt_setting_' + divPos, 'settings_div_focus');
    Main_AddClass('dialog_thumb_opt_val_' + divPos, 'settings_value_focus');
    if (Screens_ThumbOptionPosY === 3) Screens_ThumbOptionSetArrow(Screens_YesNo);
    else if (Screens_ThumbOptionPosY === 4) Screens_ThumbOptionSetArrow(Screens_ThumbOptionLanguages);
    else if (Screens_ThumbOptionPosY === 5) Screens_ThumbOptionSetArrow(Screens_ThumbOptionScreens);
}

function Screens_ThumbOptionSetArrow(array) {
    Screens_histArrow(
        'thumb_opt',
        Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY],
        array.length,
        array[Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY]],
        Screens_ThumbOptionPosY
    );
}

var Screens_ThumbOptionScreens = [];
var Screens_YesNo = [];
var Screens_ThumbOptionArrays = [];
var Screens_ThumbOptionPosXArrays = [];
var Screens_ThumbOptionGOTO = [];
var Screens_ThumbOptionLanguages = [];
var Main_ContentLang_old = '';

function Screens_ThumbOptionSetArrowArray() {
    Screens_ThumbOptionScreens = [
        STR_LIVE,
        STR_FEATURED,
        STR_GAMES,
        STR_VIDEOS,
        STR_CLIP
    ];

    if (AddUser_UserIsSet()) {
        Screens_ThumbOptionScreens.push(STR_USER + STR_SPACE + STR_LIVE);
        Screens_ThumbOptionScreens.push(STR_USER + STR_SPACE + STR_LIVE_HOSTS);
        Screens_ThumbOptionScreens.push(STR_USER + STR_SPACE + STR_GAMES);
        Screens_ThumbOptionScreens.push(STR_USER + STR_SPACE + STR_VIDEOS);
        Screens_ThumbOptionScreens.push(STR_USER + STR_SPACE + STR_CHANNELS);
        Screens_ThumbOptionScreens.push(STR_USER + STR_SPACE + STR_HISTORY);
    }

    Screens_YesNo = [
        STR_YES,
        STR_NO
    ];

    var default_lang = 0;
    var isAll = Main_ContentLang === "";
    Main_ContentLang_old = Main_ContentLang;
    Screens_ThumbOptionLanguages = [];
    for (var key in Languages_value) {
        Screens_ThumbOptionLanguages.push(key);
        if (!isAll && Languages_Obj_default(key)) default_lang = Screens_ThumbOptionLanguages.length - 1;
    }

    Screens_ThumbOptionArrays = ['', '', '', Screens_YesNo, Screens_ThumbOptionLanguages, Screens_ThumbOptionScreens];

    var historyType = Screens_ThumbOptionStringGetHistory();
    if (inUseObj.screen === Main_HistoryLive &&
        Main_A_includes_B(document.getElementById(inUseObj.ids[1] + inUseObj.posY + '_' + inUseObj.posX).src, 's3_vods')) {
        historyType = Main_getItemJson(HistoryVod.histPosXName, [0, 0, 0])[1];
    }

    Screens_ThumbOptionPosXArrays = [0, 0, 0, historyType, default_lang, 0];

    Screens_ThumbOptionGOTO = [
        Main_Live,
        Main_Featured,
        Main_games,
        Main_Vod,
        Main_Clip,
        Main_UserLive,
        Main_UserHost,
        Main_usergames,
        Main_UserVod,
        Main_UserChannels,
        Main_History[Main_HistoryPos]];
}

function Screens_SetLastRefresh() {
    if (Main_values.Main_Go === Main_Users || Main_values.Main_Go === Main_ChannelContent || Main_values.Main_Go === Main_Search ||
        Main_values.Main_Go === Main_addUser || !inUseObj) return;

    Main_innerHTML("label_last_refresh", STR_SPACE + STR_LAST_REFRESH + Play_timeDay((new Date().getTime()) - inUseObj.lastRefresh) + ")");
}

function Screens_RefreshTimeout() {
    if (Main_values.Main_Go === Main_Users || Main_values.Main_Go === Main_ChannelContent || Main_values.Main_Go === Main_Search ||
        Main_values.Main_Go === Main_addUser || !inUseObj || !Settings_Obj_default("auto_refresh_screen")) return false;

    return (new Date().getTime()) > (inUseObj.lastRefresh + (Settings_Obj_values("auto_refresh_screen") * 60000));
}

function Screens_Isfocused() {
    var doc = document.getElementById(inUseObj.ids[0] + inUseObj.posY + '_' + inUseObj.posX);
    return doc ? Main_A_includes_B(doc.className, 'stream_thumbnail_focused') && Main_isScene1DocShown() : false;
}