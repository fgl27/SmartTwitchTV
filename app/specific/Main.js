//Variable initialization
var Main_isReleased = false;
var Main_cursorY = -1;
var Main_newImg = new Image();

var Main_Live = 1;
var Main_addUser = 2;
var Main_games = 3;
var Main_aGame = 4;
var Main_UserLive = 5;
var Main_UserHost = 6;
var Main_usergames = 7;
var Main_Search = 8;
var Main_sgames = 9;
var Main_SLive = 10;
var Main_SChannelContent = 11;
var Main_Svod = 12;
var Main_Sclip = 13;
var Main_Users = 14;
var Main_UserChannels = 15;
var Main_SChannels = 16;
var Main_addCode = 17;

var Main_Go = 1;
var Main_Before = 1;
var Main_BeforeSearch = 1;
var Main_BeforeChannel = 1;
var Main_BeforeAgame = 1;

var Main_BeforeChannelisSet = false;
var Main_BeforeAgameisSet = false;

var Main_selectedChannel = '';
var Main_selectedChannelDisplayname = '';
var Main_selectedChannelLogo = '';
var Main_selectedChannelViews = '';
var Main_selectedChannelFallower = '';
var Main_listenerID = null;
var Main_ExitDialogID = null;
var Main_gameSelected = '';
var Main_selectedChannel_id = '';
var Main_OldgameSelected = null;
var Main_SmartHubId = null;
var Main_UserName = '';
var Main_ScrollbarIsHide = true;
var Main_NetworkStateOK = true;
var Main_NetworkRefresh = false;
var Main_td = '';
var Main_nextScrollPositon = '';
var Main_IsDayFirst = false;
var Main_ScrollbarElement;
var Main_SearchInput;
var Main_SearchInput;
var Main_AddUserInput;
var Main_AddCodeInput;

var Main_ScrollOffSetVideo = 275;
var Main_ScrollOffSetGame = 523;

//Offset value in relation to height of class screen_size, to change split the below by height and multiply with the new value
var Main_ScrollOffSetMinusVideo = 372;
var Main_ScrollOffSetMinusChannels = 464;
var Main_ScrollOffSetMinusGame = 567;
var Main_ScrollOffSetMinusDuploYOffsetCheck = 92;
var Main_ScrollOffSetMinusaddUser = 60;
var Main_ScrollOffSetMinusSearch = 100;
var Main_ScrollOffSetMinusAgame = 83;

//The values of thumbnail and related for it screen type
var Main_ReloadLimitOffsetGames = 1.35;
var Main_ReloadLimitOffsetVideos = 1.5;

var Main_ItemsLimitVideo = 99;
var Main_ColoumnsCountVideo = 3;
var Main_ItemsReloadLimitVideo = Math.floor((Main_ItemsLimitVideo / Main_ColoumnsCountVideo) / Main_ReloadLimitOffsetVideos);

var Main_ItemsLimitGame = 95;
var Main_ColoumnsCountGame = 5;
var Main_ItemsReloadLimitGame = Math.floor((Main_ItemsLimitGame / Main_ColoumnsCountGame) / Main_ReloadLimitOffsetGames);

var Main_ItemsLimitChannel = 96;
var Main_ColoumnsCountChannel = 6;
var Main_ItemsReloadLimitChannel = Math.floor((Main_ItemsLimitChannel / Main_ColoumnsCountChannel) / Main_ReloadLimitOffsetVideos);

// How many streams will be request on a reload
var Main_ItemsLimitReload = 6;

var Main_clientId = "ypvnuqrh98wqz1sr0ov3fgfu4jh1yx";
var Main_VideoSize = "528x297"; // default size 640x360
var Main_GameSize = "340x475"; // default size 272x380

var Main_classThumb = 'stream_thumbnail_focused';
var Main_classText = 'stream_text_focused';
var Main_classInfo = 'stream_info_focused';
var Main_DataAttribute = 'data_attribute';

var Main_version = 400;
var Main_stringVersion = '4.0.0';
var Main_currentVersion = '';
var Main_minversion = '050418';
var Main_versonTag = '';

var GIT_IO = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/";
var IMG_404_GAME = GIT_IO + "404_game.png";
var IMG_404_LOGO = GIT_IO + "404_logo.png";
var IMG_404_VIDEO = GIT_IO + "404_video.png";
var IMG_BLUR_GAME = GIT_IO + "blur_game.png";
var IMG_BLUR_VIDEO1 = GIT_IO + "blur_video_1.png";
var IMG_BLUR_VIDEO2 = GIT_IO + "blur_video_2.png";
var IMG_BLUR_VIDEO1_16 = GIT_IO + "blur_video_1_16.png";
var IMG_BLUR_VIDEO2_16 = GIT_IO + "blur_video_2_16.png";
var IMG_BLUR_VOD = GIT_IO + "blur_vod.png";
var IMG_USER_MINUS = GIT_IO + "user_minus.png";
var IMG_USER_PLUS = GIT_IO + "user_plus.png";
var IMG_USER_UP = GIT_IO + "user_up.png";
var IMG_USER_CODE = GIT_IO + "user_code.png";
var IMG_LOD_LOGO = GIT_IO + "ch_logo.png";
var TEMP_MP4 = GIT_IO + "temp.mp4";
var IMG_SMART_LIVE = GIT_IO + "smart_live.png";
var IMG_SMART_GAME = GIT_IO + "smart_games.png";
var IMG_SMART_USER = GIT_IO + "smart_users.png";
var IMG_SMART_ADD_USER = GIT_IO + "smart_add_user.png";

//function vars
var Main_loadImg = function(ImgObjet, Src, img_type) {
    ImgObjet.onerror = function() {
        this.src = img_type; //img fail to load use predefined
    };
    ImgObjet.src = Src;
};

var Main_lazyLoad = function(ImgObjet, img_type) {
    ImgObjet.onerror = function() {
        this.src = img_type; //img fail to load use predefined
    };
    ImgObjet.src = ImgObjet.getAttribute('data-src');
    ImgObjet.removeAttribute('data-src');
};

var Main_lazyUnLoad = function(ImgRstObjet) {
    ImgRstObjet.setAttribute('data-src', ImgRstObjet.getAttribute('src'));
    ImgRstObjet.removeAttribute('src');
};
//Variable initialization end

//Registering all used keys
tizen.tvinputdevice.registerKey("ChannelUp");
tizen.tvinputdevice.registerKey("ChannelDown");
tizen.tvinputdevice.registerKey("MediaPlayPause");
tizen.tvinputdevice.registerKey("MediaPlay");
tizen.tvinputdevice.registerKey("MediaPause");
tizen.tvinputdevice.registerKey("ColorF0Red");
tizen.tvinputdevice.registerKey("ColorF1Green");
tizen.tvinputdevice.registerKey("ColorF2Yellow");
tizen.tvinputdevice.registerKey("ColorF3Blue");
tizen.tvinputdevice.registerKey("Guide");
tizen.tvinputdevice.registerKey("Info");

// this function will be called only once the first time the app startup
document.addEventListener("DOMContentLoaded", function() {
    tizen.systeminfo.getPropertyValue('LOCALE', Main_loadTranslations);
});

function Main_loadTranslations(device) {

    // Language is set as (LANGUAGE)_(REGION) in (ISO 639-1)_(ISO 3166-1 alpha-2) eg.; pt_BR Brazil, en_US USA
    // https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

    var lang = device.language.split(".")[0];
    if (lang.indexOf('pt_') !== -1) {
        pt_BRLang();
        Main_IsDayFirst = true;
    } else console.log("language is " + lang);
    DefaultLang();

    Main_Checktylesheet();
    Main_ready(function() {
        if (Main_isReleased) document.body.innerHTML = STR_BODY;
        else STR_CONTROLS_MAIN_0 = STR_CONTROLS_MAIN_0 + STR_BR + Main_CheckMp4Html5();

        Main_ready(Main_initWindows);
    });
}

function Main_initWindows() {
    //set top bar labels
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH);
    Main_IconLoad('label_search', 'icon-search', STR_SEARCH_KEY);
    Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
    Main_IconLoad('label_controls', 'icon-question-circle', STR_CONTROL_KEY);
    Main_IconLoad('label_about', 'icon-info-circle', STR_ABOUT_KEY);
    document.getElementById('top_bar_live').innerHTML = STR_LIVE;
    document.getElementById('top_bar_user').innerHTML = STR_USER;
    document.getElementById('top_bar_game').innerHTML = STR_GAMES;
    document.getElementById('chanel_button').innerHTML = STR_CHANNELS;
    document.getElementById('game_button').innerHTML = STR_GAMES;
    document.getElementById('live_button').innerHTML = STR_LIVE;
    document.getElementById('exit_app_cancel').innerHTML = STR_CANCEL;
    document.getElementById('exit_app_close').innerHTML = STR_CLOSE;
    document.getElementById('remove_cancel').innerHTML = STR_CANCEL;
    document.getElementById('remove_yes').innerHTML = STR_YES;
    document.getElementById('exit_app_minimize').innerHTML = STR_MINIMIZE;
    document.getElementById("main_dialog_exit_text").innerHTML = STR_EXIT_MESSAGE;
    document.getElementById("dialog_about_text").innerHTML = STR_ABOUT_INFO_HEADER + STR_ABOUT_INFO_0;
    document.getElementById("dialog_controls_text").innerHTML = STR_CONTROLS_MAIN_0;
    Main_ScrollbarElement = document.getElementById("scrollbar");
    Main_SearchInput = document.getElementById("search_input");
    Main_AddUserInput = document.getElementById("user_input");
    Main_AddCodeInput = document.getElementById("oauth_input");

    UserGames_live = (localStorage.getItem('user_Games_live') || 'true') === 'true' ? true : false;
    Main_ready(function() {

        Play_PreStart();
        AddUser_RestoreUsers();
        Live_init();

        // pre load All img
        Main_PreLoadAImage(IMG_404_VIDEO);
        Main_PreLoadAImage(IMG_404_GAME);
        Main_PreLoadAImage(IMG_404_LOGO);
        Main_PreLoadAImage(IMG_BLUR_GAME);
        Main_PreLoadAImage(IMG_BLUR_VIDEO1);
        Main_PreLoadAImage(IMG_BLUR_VIDEO2);
        Main_PreLoadAImage(IMG_BLUR_VIDEO1_16);
        Main_PreLoadAImage(IMG_BLUR_VIDEO2_16);
        Main_PreLoadAImage(IMG_BLUR_VOD);
        Main_PreLoadAImage(IMG_USER_MINUS);
        Main_PreLoadAImage(IMG_USER_PLUS);
        Main_PreLoadAImage(IMG_USER_UP);
        Main_PreLoadAImage(IMG_USER_CODE);

        window.setTimeout(Main_NetworkStateChangeListenerStart, 5000);
    });
}

function Main_IconLoad(lable, icon, string) {
    document.getElementById(lable).innerHTML = '<div style="vertical-align: middle; display: inline-block;"><i class="' + icon +
        '" style="color: #FFFFFF; font-size: 115%; "></i></div><div style="vertical-align: middle; display: inline-block">' + STR_SPACE + string + '</div>';
}

function Main_ChangeBorder(div, value) {
    document.getElementById(div).style.border = value;
}

function Main_ChangebackgroundColor(div, value) {
    document.getElementById(div).style.backgroundColor = value;
}

function Main_showLoadDialog() {
    Main_HideExitDialog();
    document.getElementById('dialog_loading').classList.remove('hide');
}

function Main_HideLoadDialog() {
    document.getElementById('dialog_loading').classList.add('hide');
}

function Main_clearExitDialog() {
    window.clearTimeout(Main_ExitDialogID);
}

function Main_setExitDialog() {
    Main_ExitDialogID = window.setTimeout(Main_HideExitDialog, 6000);
}

function Main_showExitDialog() {
    Main_setExitDialog();
    document.getElementById('main_dialog_exit').classList.remove('hide');
}

function Main_HideExitDialog() {
    Main_clearExitDialog();
    document.getElementById('main_dialog_exit').classList.add('hide');
    Live_ExitCursor = 0;
    Live_ExitCursorSet();
}

function Main_isExitDialogShown() {
    return document.getElementById('main_dialog_exit').className.indexOf('hide') === -1;
}

function Main_CounterDialogRst() {
    Main_empty('dialog_counter_text');
    Main_Scrollbar(0, 0, 0);
}

function Main_CounterDialog(x, y, coloumns, total) {
    if (total > 0) {
        document.getElementById('dialog_counter_text').innerHTML = (y * coloumns) + (x + 1) + '/' + (total);
        Main_Scrollbar(y, coloumns, total);
    } else Main_CounterDialogRst();
}

function Main_Scrollbar(y, coloumns, total) {
    //if show the scroll, else reset it's position and hide by setting it's color equal to parent background
    if ((coloumns === 3 && (total > 9)) || (coloumns === 5 && (total > 10)) || (coloumns === 6 && (total > 12))) {

        // min 100 max 1000 or the 900 + 100 below
        var nextPositon = Math.ceil(900 / (Math.ceil(total / coloumns) - 1) * y + 100);
        var currentPositon = Main_ScrollbarElement.offsetTop;

        //If position are different it means previously animation didn't ended yet, stop it and force set the value
        if (currentPositon !== Main_nextScrollPositon) {
            Main_ScrollbarElement.classList.remove('scrolltransition');
            Main_ScrollbarElement.style.top = Main_nextScrollPositon + "px";
            Main_ScrollbarElement.classList.add('scrolltransition');
        }
        Main_nextScrollPositon = nextPositon;

        Main_ScrollbarElement.style.top = Main_nextScrollPositon + "px";

        if (Main_ScrollbarIsHide) {
            Main_ScrollbarIsHide = false;
            Main_ScrollbarElement.style.backgroundColor = "#777777";
        }
    } else {
        Main_ScrollbarElement.style.backgroundColor = "#000000";
        Main_nextScrollPositon = 100;
        Main_ScrollbarIsHide = true;
        //Prevent to show the move during the hide transition
        window.setTimeout(function() {
            Main_ScrollbarElement.style.top = Main_nextScrollPositon + "px";
        }, 400);
    }
}

function Main_SetItemsLimitReload(blankCellCount) {
    Main_ItemsLimitReload = 12;
    if (blankCellCount > (Main_ItemsLimitReload / 3)) Main_ItemsLimitReload = blankCellCount * 3;
    if (Main_ItemsLimitReload > 99) Main_ItemsLimitReload = 99;
}

function Main_showWarningDialog(text) {
    if (!Main_NetworkStateOK && text === STR_REFRESH_PROBLEM) Main_NetworkRefresh = true;
    document.getElementById('dialog_warning_text').innerHTML = !Main_NetworkStateOK ? STR_NET_DOWN : text;
    document.getElementById('dialog_warning').classList.remove('hide');
}

function Main_HideWarningDialog() {
    document.getElementById('dialog_warning').classList.add('hide');
}

function Main_isWarningDialogShown() {
    return document.getElementById('dialog_warning').className.indexOf('hide') === -1;
}

function Main_showAboutDialog() {
    Main_HideExitDialog();
    Main_HideControlsDialog();
    Main_HideUpdateDialog();
    document.getElementById('dialog_about').classList.remove('hide');
}

function Main_HideAboutDialog() {
    document.getElementById('dialog_about').classList.add('hide');
}

function Main_isAboutDialogShown() {
    return document.getElementById('dialog_about').className.indexOf('hide') === -1;
}

function Main_showControlsDialog() {
    Main_HideExitDialog();
    Main_HideAboutDialog();
    Main_HideUpdateDialog();
    document.getElementById('dialog_controls').classList.remove('hide');
}

function Main_HideControlsDialog() {
    document.getElementById('dialog_controls').classList.add('hide');
}


function Main_isControlsDialogShown() {
    return document.getElementById('dialog_controls').className.indexOf('hide') === -1;
}

function Main_showUpdateDialog() {
    Main_HideExitDialog();
    Main_HideAboutDialog();
    Main_HideControlsDialog();
    document.getElementById('dialog_update').classList.remove('hide');
}

function Main_HideUpdateDialog() {
    document.getElementById('dialog_update').classList.add('hide');
}

function Main_isUpdateDialogShown() {
    return document.getElementById('dialog_update').className.indexOf('hide') === -1;
}

function Main_addCommas(value) {
    return (value + '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Main_videoqualitylang(video_height, average_fps, language) {
    video_height = video_height + ''; //stringfy doesnot work 8|
    if (!video_height.indexOf('x')) video_height = video_height.slice(-3);

    if (average_fps > 58) average_fps = 60;
    else if (average_fps < 32) average_fps = 30;
    else average_fps = Math.ceil(average_fps);

    return video_height + 'p' + average_fps + ((language !== "") ? ' [' + language.toUpperCase() + ']' : '');
}

function Main_is_playlist(content) {
    return (content.indexOf('live') !== -1) ? '' : STR_NOT_LIVE;
}

function Main_ThumbNull(y, x, thumbnail) {
    return document.getElementById(thumbnail + y + '_' + x, 0) !== null;
}

function Main_ReStartScreens() {
    Play_isPanelShown();
    Main_SwitchScreen();
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
}

function Main_SwitchScreen() {
    Main_ScrollHelperBlank('blank_focus');
    if (Main_NetworkStateOK) Main_HideWarningDialog();

    if (Main_Go !== Main_SChannelContent && Main_Go !== Main_aGame) {
        Main_BeforeAgameisSet = false;
        Main_BeforeChannelisSet = false;
    }

    Main_CounterDialogRst();
    if (Main_Go === Main_Live) Live_init();
    else if (Main_Go === Main_addUser) AddUser_init();
    else if (Main_Go === Main_games) Games_init();
    else if (Main_Go === Main_aGame) AGame_init();
    else if (Main_Go === Main_Search) Search_init();
    else if (Main_Go === Main_sgames) SGames_init();
    else if (Main_Go === Main_SLive) SLive_init();
    else if (Main_Go === Main_SChannelContent) SChannelContent_init();
    else if (Main_Go === Main_Svod) Svod_init();
    else if (Main_Go === Main_Sclip) Sclip_init();
    else if (Main_Go === Main_Users) Users_init();
    else if (Main_Go === Main_UserLive) UserLive_init();
    else if (Main_Go === Main_UserHost) UserHost_init();
    else if (Main_Go === Main_usergames) UserGames_init();
    else if (Main_Go === Main_UserChannels) UserChannels_init();
    else if (Main_Go === Main_SChannels) SChannels_init();
    else Live_init();
}

function Main_ExitCurrent(ExitCurrent) {
    if (ExitCurrent === Main_Live) Live_exit();
    else if (ExitCurrent === Main_addUser) AddUser_exit();
    else if (ExitCurrent === Main_games) Games_exit();
    else if (ExitCurrent === Main_aGame) AGame_exit();
    else if (ExitCurrent === Main_Search) Search_exit();
    else if (ExitCurrent === Main_sgames) SGames_exit();
    else if (ExitCurrent === Main_SLive) SLive_exit();
    else if (ExitCurrent === Main_SChannelContent) SChannelContent_exit();
    else if (ExitCurrent === Main_Svod) Svod_exit();
    else if (ExitCurrent === Main_Sclip) Sclip_exit();
    else if (ExitCurrent === Main_Users) Users_exit();
    else if (ExitCurrent === Main_UserLive) UserLive_exit();
    else if (ExitCurrent === Main_UserHost) UserHost_exit();
    else if (ExitCurrent === Main_usergames) UserGames_exit();
    else if (ExitCurrent === Main_UserChannels) UserChannels_exit();
    else if (ExitCurrent === Main_SChannels) SChannels_exit();
}

function Main_openStream() {
    document.body.addEventListener("keydown", Play_handleKeyDown, false);
    document.getElementById('scene2').classList.remove('hide');
    Play_hidePanel();
    Play_hideChat();
    document.getElementById('scene1').classList.add('hide');
    Play_Start();
}

function Main_RestoreTopLabel() {
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH);
    Main_IconLoad('label_search', 'icon-search', STR_SEARCH_KEY);
    Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.getElementById('top_bar_live').innerHTML = STR_LIVE;
    document.getElementById('top_bar_user').innerHTML = STR_USER;
    document.getElementById('top_bar_game').innerHTML = STR_GAMES;
}

function Main_cleanTopLabel() {
    Main_IconLoad('label_refresh', 'icon-arrow-circle-left', STR_GOBACK);
    Main_empty('label_switch');
    Main_empty('top_bar_live');
    Main_empty('top_bar_game');
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
}

function Main_UnderCenter(text) {
    return '<div style="font-size: 30%; position: fixed; line-height: 0; text-shadow: #000000 0px 0px 5.7px, #000000 0px 0px 5.7px, #000000 0px 0px 4px">' + text + '</div>';
}

function Main_videoCreatedAt(time) { //time in '2017-10-27T13:27:27Z'
    time = new Date(time);
    if (Main_IsDayFirst) return time.getDate() + ' ' + monthNames[time.getMonth()] + ', ' + time.getFullYear();
    else return monthNames[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear();
}

function Main_NetworkStateChangeListenerStart() {
    var onChange = function(data) {
        if (data === 1 || data === 4) { //network connected
            Main_NetworkStateOK = true;
            if (Main_isWarningDialogShown()) {
                Main_showWarningDialog(STR_NET_UP);
                if (Main_NetworkRefresh) Main_SwitchScreen();
                Main_NetworkRefresh = false;
            }
            if (Play_WarningDialogVisible()) Main_showWarningDialog(STR_NET_UP);
            window.setTimeout(Main_HideExitDialog, 1500);
        } else if (data === 2 || 5) { //network down
            Main_NetworkStateOK = false;
            window.setTimeout(function() {
                if (!Main_NetworkStateOK) {
                    Main_showWarningDialog('');
                    Play_showWarningDialog(STR_NET_DOWN);
                }
            }, 5000);
        }
    };
    try {
        Main_listenerID = webapis.network.addNetworkStateChangeListener(onChange);
    } catch (e) {}
}

function Main_NetworkStateChangeListenerStop() {
    try {
        webapis.network.removeNetworkStateChangeListener(Main_listenerID);
    } catch (e) {}
}

function Main_checkVersion() {
    var version = null,
        value = 0;
    try {
        version = (tizen.application.getAppInfo().version);
    } catch (e) {}
    if (version !== null) {
        Main_currentVersion = version;
        Main_versonTag = STR_VERSION + version + '.' + Main_minversion + STR_BR;
        version = version.split(".");
        value = parseInt(version[0] + version[1] + version[2]);
        document.getElementById("dialog_about_text").innerHTML = STR_ABOUT_INFO_HEADER + Main_versonTag + STR_ABOUT_INFO_0;
        document.getElementById("dialog_update_text").innerHTML = STR_UPDATE_MAIN_HEADER + STR_CURRENT_VERSION + Main_currentVersion + STR_LATEST_VERSION + Main_stringVersion + STR_BR + STR_UPDATE_MAIN_0;
        return value < Main_version;
    } else return false;
}

function Main_GoLive() {
    AddCode_SetDefaultOAuth(0);
    Main_Go = Main_Live;
    Main_SwitchScreen();
}

function Main_Resume() {
    if (document.hidden) {
        window.clearInterval(Main_SmartHubId);
        Main_NetworkStateChangeListenerStop();
    } else {
        window.setTimeout(function() {
            Main_NetworkStateChangeListenerStart();
        }, 20000);
        window.setTimeout(function() {
            if (AddUser_UsernameArray.length > 0) {
                if ((new Date().getTime() - 590000) > SmartHub_LastUpdate) SmartHub_Start();
                Main_SmartHubId = window.setInterval(SmartHub_Start, 600000);
            } else {
                window.clearInterval(Main_SmartHubId);
                document.removeEventListener('visibilitychange', Main_Resume);
            }
        }, 1500);
    }
}

function Main_empty(el) {
    el = document.getElementById(el);
    while (el.firstChild) el.removeChild(el.firstChild);
}

function Main_blankCellCount() {
    this.val = 0;
}

function Main_CellExists(name, vector, counter) {
    for (var i = 0; i < vector.length; i++) {
        if (name === vector[i]) {
            counter.val++;
            return true;
        }
    }
    return false;
}

function Main_LoadImages(imgVector, idVector, img_type) {
    for (var i = 0; i < imgVector.length; i++) Main_loadImg(document.getElementById(idVector[i]), imgVector[i], img_type);
}

function Main_LazyImgStart(imgId, total, img_type, coloumns) {
    var x, y = 0,
        elem;
    for (y; y < total; y++) {
        for (x = 0; x < coloumns; x++) {
            elem = document.getElementById(imgId + y + '_' + x);
            if (elem !== null) Main_lazyLoad(elem, img_type);
        }
    }
    Main_Ychange(0);
}

function Main_LazyImg(imgId, row_id, img_type, coloumns, offset) { //offset is one more then number if (cursorY > number)
    var change = Main_Ychange(row_id);
    if (row_id === offset && change === 1) change = 0;

    if (change) {
        var x = 0,
            y, elem;

        for (x; x < coloumns; x++) {
            y = change > 0 ? row_id + offset : row_id - offset;
            elem = document.getElementById(imgId + y + '_' + x);
            if (elem !== null) Main_lazyLoad(elem);

            y = change > 0 ? row_id - offset - 1 : row_id + offset + 1;
            elem = document.getElementById(imgId + y + '_' + x);
            if (elem !== null) Main_lazyUnLoad(elem);
        }
    }
}

function Main_Ychange(y) {
    var position = 0;

    if (Main_cursorY < y) position = 1; //going down
    else if (Main_cursorY > y) position = -1; //going up

    Main_cursorY = y;
    return position;
}

function Main_YRst(y) {
    Main_cursorY = y;
}

function Main_PreLoadAImage(link) {
    Main_newImg.src = link;
}

function Main_createEmptyCell(id) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', id);
    Main_td.className = 'stream_cell';

    return Main_td;
}

function Main_createCellChannel(id, idArray, valuesArray) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', idArray[4] + id);

    Main_td.setAttribute(Main_DataAttribute, valuesArray[0]);
    Main_td.setAttribute('data-id', valuesArray[1]);
    Main_td.setAttribute('data-views', valuesArray[4]);
    Main_td.setAttribute('data-followers', valuesArray[5]);

    Main_td.className = 'stream_cell';
    Main_td.innerHTML = Main_ChannelHtml(id, idArray, valuesArray);

    return Main_td;
}

function Main_replaceChannel(id, valuesArray, ids) {
    var splitedId = id.split(ids[5])[1];
    id = document.getElementById(id);

    id.setAttribute(Main_DataAttribute, valuesArray[0]);
    id.setAttribute('data-id', valuesArray[1]);
    id.setAttribute('data-views', valuesArray[4]);
    id.setAttribute('data-followers', valuesArray[5]);

    id.innerHTML = Main_ChannelHtml(splitedId, ids, valuesArray);
    id.setAttribute('id', ids[4] + splitedId);
}

function Main_ChannelHtml(id, idArray, valuesArray) {
    return '<div id="' + idArray[0] + id + '" class="stream_thumbnail_channel" ><img id="' + idArray[1] +
        id + '" class="stream_img" data-src="' + valuesArray[2] + '"></div>' +
        '<div id="' + idArray[2] + id + '" class="stream_text">' +
        '<div id="' + idArray[3] + id + '" class="stream_channel">' + valuesArray[3] + '</div></div>';
}

function Main_createCellVideo(channel_name, id, idArray, valuesArray) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.setAttribute(Main_DataAttribute, channel_name);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = Main_VideoHtml(id, idArray, valuesArray);

    return Main_td;
}

function Main_replaceVideo(id, channel_name, valuesArray, ids) {
    var splitedId = id.split(ids[9])[1];
    id = document.getElementById(id);
    id.setAttribute(Main_DataAttribute, channel_name);
    id.innerHTML = Main_VideoHtml(splitedId, ids, valuesArray);
    id.setAttribute('id', ids[8] + splitedId);
}

function Main_VideoHtml(id, idArray, valuesArray) {
    return '<div id="' + idArray[0] + id + '" class="stream_thumbnail_video" >' +
        '<img id="' + idArray[1] + id + '" class="stream_img" data-src="' + valuesArray[0] + '"></div>' +
        '<div id="' + idArray[2] + id + '" class="stream_text">' +
        '<div id="' + idArray[3] + id + '" class="stream_channel" style="width: 66%; display: inline-block;">' + valuesArray[1] + '</div>' +
        '<div id="' + idArray[7] + id + '"class="stream_info" style="width:33%; float: right; text-align: right; display: inline-block;">' +
        valuesArray[5] + '</div>' +
        '<div id="' + idArray[4] + id + '"class="stream_info">' + valuesArray[2] + '</div>' +
        '<div id="' + idArray[5] + id + '"class="stream_info">' + STR_PLAYING + valuesArray[3] + '</div>' +
        '<div id="' + idArray[6] + id + '"class="stream_info">' + valuesArray[4] + '</div>' + '</div>';
}

function Main_createCellGame(id, idArray, valuesArray) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', idArray[5] + id);
    Main_td.setAttribute(Main_DataAttribute, valuesArray[0]);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = Main_GameHtml(id, idArray, valuesArray);

    return Main_td;
}

function Main_replaceGame(id, valuesArray, ids) {
    var splitedId = id.split(ids[6])[1];
    id = document.getElementById(id);
    id.setAttribute(Main_DataAttribute, valuesArray[0]);
    id.innerHTML = Main_GameHtml(splitedId, ids, valuesArray);
    id.setAttribute('id', ids[5] + splitedId);
}

function Main_GameHtml(id, idArray, valuesArray) {
    return '<div id="' + idArray[0] + id + '" class="stream_thumbnail_game" >' +
        '<img id="' + idArray[1] + id + '" class="stream_img" data-src="' + valuesArray[1] + '"></div>' +
        '<div id="' + idArray[2] + id + '" class="stream_text">' +
        '<div id="' + idArray[3] + id + '" class="stream_channel">' + valuesArray[0] + '</div>' +
        '<div id="' + idArray[4] + id + '"class="stream_info_games" style="width: 100%; display: inline-block;">' +
        valuesArray[2] + '</div></div>';
}

function Main_CheckMp4Html5() {
    var result = STR_BR + 'Html5 mp4 video support:' + STR_BR + STR_DOT;
    if (document.createElement('video').canPlayType) {

        var VideoTest = document.createElement("video");
        var h264Test = VideoTest.canPlayType('video/mp4; codecs="avc1.42E01E"');

        if (h264Test) {
            if (h264Test === "probably") result += " Full support for avc1.";
            else result += " Some support for avc1.(" + h264Test + ")";
        } else {
            result += "No video support for avc1.";
        }

        result += STR_BR + STR_DOT;
        h264Test = VideoTest.canPlayType('video/mp4; codecs="mp4a.40.2"');

        if (h264Test) {
            if (h264Test === "probably") result += " Full support for mp4a.";
            else result += " Some support for mp4a.(" + h264Test + ")";
        } else {
            result += " No video support for mp4a.";
        }

    } else result += "No video support at all, createElement video fail.";

    return result;
}

function Main_addFocusChannel(y, x, idArray, screen, ColoumnsCount, itemsCount) {
    var id = y + '_' + x;
    document.getElementById(idArray[0] + id).classList.add(Main_classThumb);
    document.getElementById(idArray[2] + id).classList.add(Main_classText);
    document.getElementById(idArray[3] + id).classList.add(Main_classInfo);

    Main_ready(function() {
        Main_ScrollHelper(idArray[0], y, x, screen, Main_ScrollOffSetMinusChannels, Main_ScrollOffSetVideo, true);
    });

    Main_CounterDialog(x, y, ColoumnsCount, itemsCount);
}

function Main_removeFocusChannel(id, idArray) {
    document.getElementById(idArray[0] + id).classList.remove(Main_classThumb);
    document.getElementById(idArray[2] + id).classList.remove(Main_classText);
    document.getElementById(idArray[3] + id).classList.remove(Main_classInfo);
}

function Main_addFocusVideo(y, x, idArray, screen, ColoumnsCount, itemsCount) {
    var id = y + '_' + x;
    document.getElementById(idArray[0] + id).classList.add(Main_classThumb);
    document.getElementById(idArray[2] + id).classList.add(Main_classText);
    document.getElementById(idArray[3] + id).classList.add(Main_classInfo);
    document.getElementById(idArray[4] + id).classList.add(Main_classInfo);
    document.getElementById(idArray[5] + id).classList.add(Main_classInfo);
    document.getElementById(idArray[6] + id).classList.add(Main_classInfo);
    document.getElementById(idArray[7] + id).classList.add(Main_classInfo);

    Main_ready(function() {
        Main_ScrollHelper(idArray[0], y, x, screen, Main_ScrollOffSetMinusVideo, Main_ScrollOffSetVideo, false);
    });

    Main_CounterDialog(x, y, ColoumnsCount, itemsCount);
}

function Main_removeFocusVideo(id, idArray) {
    document.getElementById(idArray[0] + id).classList.remove(Main_classThumb);
    document.getElementById(idArray[2] + id).classList.remove(Main_classText);
    document.getElementById(idArray[3] + id).classList.remove(Main_classInfo);
    document.getElementById(idArray[4] + id).classList.remove(Main_classInfo);
    document.getElementById(idArray[5] + id).classList.remove(Main_classInfo);
    document.getElementById(idArray[6] + id).classList.remove(Main_classInfo);
    document.getElementById(idArray[7] + id).classList.remove(Main_classInfo);
}

function Main_addFocusGame(y, x, idArray, screen, ColoumnsCount, itemsCount) {
    var id = y + '_' + x;
    document.getElementById(idArray[0] + id).classList.add(Main_classThumb);
    document.getElementById(idArray[2] + id).classList.add(Main_classText);
    document.getElementById(idArray[3] + id).classList.add(Main_classInfo);
    document.getElementById(idArray[4] + id).classList.add(Main_classInfo);

    Main_ready(function() {
        Main_ScrollHelper(idArray[0], y, x, screen, Main_ScrollOffSetMinusGame, Main_ScrollOffSetGame, false);
    });

    Main_CounterDialog(x, y, ColoumnsCount, itemsCount);
}

function Main_removeFocusGame(id, idArray) {
    document.getElementById(idArray[0] + id).classList.remove(Main_classThumb);
    document.getElementById(idArray[2] + id).classList.remove(Main_classText);
    document.getElementById(idArray[3] + id).classList.remove(Main_classInfo);
    document.getElementById(idArray[4] + id).classList.remove(Main_classInfo);
}

//TODO split Main_ScrollHelper in Main_ScrollHelperVideo/game/channel/etc
function Main_ScrollHelper(Thumbnail, cursorY, cursorX, Screen, OffsetMinus, OffsetPlus, DuploYOffsetCheck) {
    var id = Thumbnail + cursorY + '_' + cursorX;

    if (document.getElementById(id) === null) {
        if (!cursorY && !cursorX) Main_ScrollHelperBlank('blank_focus');
        return;
    } else if (Screen === Main_UserChannels || Screen === Main_SChannels) {
        if (!Main_ThumbNull((cursorY + 1), 0, Thumbnail)) {
            if (cursorY > 2) id = Thumbnail + (cursorY - 1) + '_' + cursorX;
            else cursorY = 0;
        }
    } else if (cursorY > 1 && OffsetPlus !== Main_ScrollOffSetGame && !Main_ThumbNull((cursorY + 1), 0, Thumbnail)) {
        id = Thumbnail + (cursorY - 1) + '_' + cursorX;
    } else if (cursorY === 1 && OffsetPlus !== Main_ScrollOffSetGame && !Main_ThumbNull((cursorY + 1), 0, Thumbnail)) {
        id = Thumbnail + (cursorY - 1) + '_' + cursorX;
        cursorY = 0;
    }
    if (!cursorY && Screen === Main_aGame) OffsetPlus = OffsetPlus - Main_ScrollOffSetMinusAgame;

    if (DuploYOffsetCheck) {
        DuploYOffsetCheck = (!cursorY || cursorY === 1);
        if (DuploYOffsetCheck) {
            id = Thumbnail + '0_' + cursorX;
            OffsetMinus = OffsetMinus - Main_ScrollOffSetMinusDuploYOffsetCheck;
        }
    } else DuploYOffsetCheck = (!cursorY);

    if (Main_Go === Screen) {
        window.scroll(0, Main_documentVerticalScrollPosition() + Main_elementVerticalClientPositionById(id) - OffsetMinus + (DuploYOffsetCheck ? OffsetPlus : 0));
    } else return;
}

function Main_ScrollHelperBlank(id) {
    window.scroll(0, Main_documentVerticalScrollPosition() + Main_elementVerticalClientPositionById(id) - Main_ScrollOffSetMinusVideo);
}

function Main_documentVerticalScrollPosition() {
    return document.body.scrollTop;
}

function Main_elementVerticalClientPositionById(id) {
    return document.getElementById(id).getBoundingClientRect().top;
}

function Main_Checktylesheet() {
    var stylesheet = document.styleSheets;
    for (var i = 0; i < stylesheet.length; i++)
        if (stylesheet[i].href !== null)
            if (!stylesheet[i].cssRules.length) Main_LoadStylesheet(stylesheet[i].href);
}

function Main_LoadStylesheet(path) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = path;

    document.getElementsByTagName("head")[0].appendChild(link);
}

//adapted from https://code.jquery.com/jquery-3.3.1.js
function Main_ready(func) {
    if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {

        // Handle it asynchronously to allow scripts the opportunity to delay ready
        window.setTimeout(func);

    } else document.addEventListener("DOMContentLoaded", func);
}