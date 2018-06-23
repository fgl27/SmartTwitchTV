//Variable initialization
var Main_isReleased = false;
var Main_cursorY = -1;
var Main_cursorYAddFocus = -1;
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
var Main_ChannelContent = 11;
var Main_Svod = 12;
var Main_Sclip = 13;
var Main_Users = 14;
var Main_UserChannels = 15;
var Main_SChannels = 16;
var Main_addCode = 17;
var Main_Vod = 18;
var Main_Clip = 19;
var Main_AGameVod = 20;
var Main_AGameClip = 21;
var Main_Featured = 22;

var Main_Go = 1;
var Main_Before = 1;
var Main_BeforeSearch = 1;
var Main_BeforeChannel = 1;
var Main_BeforeAgame = 1;

var Main_BeforeChannelisSet = false;
var Main_BeforeAgameisSet = false;

var Main_LastClickFinish = true;
var Main_addFocusFinish = true;

var Main_imgVector = [];

var Main_selectedChannel = '';
var Main_selectedChannelDisplayname = '';
var Main_selectedChannelLogo = '';
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
var Main_IsDayFirst = false;
var Main_ScrollbarElement;
var Main_SearchInput;
var Main_AddUserInput;
var Main_AddCodeInput;

//Buffer size in second is not how much time will take to buffer
//it's how much longer the buffer will be in seconds
var Main_BufferSizeInSeconds = 4;
var Main_ResumeBufferSizeInSeconds = 4;
var Main_Is4k = false;

//The values of thumbnail and related for it screen type
var Main_ReloadLimitOffsetGames = 1.35;
var Main_ReloadLimitOffsetVideos = 1.5;

var Main_ItemsLimitVideo = 45;
var Main_ColoumnsCountVideo = 3;
var Main_ItemsReloadLimitVideo = Math.floor((Main_ItemsLimitVideo / Main_ColoumnsCountVideo) / Main_ReloadLimitOffsetVideos);

var Main_ItemsLimitGame = 45;
var Main_ColoumnsCountGame = 5;
var Main_ItemsReloadLimitGame = Math.floor((Main_ItemsLimitGame / Main_ColoumnsCountGame) / Main_ReloadLimitOffsetGames);

var Main_ItemsLimitChannel = 48;
var Main_ColoumnsCountChannel = 6;
var Main_ItemsReloadLimitChannel = Math.floor((Main_ItemsLimitChannel / Main_ColoumnsCountChannel) / Main_ReloadLimitOffsetVideos);

// How many streams will be request on a reload
var Main_ItemsLimitReplace = 6;

var Main_clientId = "ypvnuqrh98wqz1sr0ov3fgfu4jh1yx";
var Main_clientIdHeader = 'Client-ID';
var Main_AcceptHeader = 'Accept';
var Main_TwithcV5Json = 'application/vnd.twitchtv.v5+json';
var Main_VideoSize = "528x297"; // default size 640x360
var Main_GameSize = "340x475"; // default size 272x380

var Main_classThumb = 'stream_thumbnail_focused';
var Main_DataAttribute = 'data_attribute';

var Main_version = 400;
var Main_stringVersion = '4.0.0';
var Main_currentVersion = '';
var Main_minversion = '062018';
var Main_versonTag = '';
var Main_TizenVersion;

var GIT_IO = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/";
var IMG_404_GAME = GIT_IO + "404_game.png";
var IMG_404_LOGO = GIT_IO + "404_logo.png";
var IMG_404_VIDEO = GIT_IO + "404_video.png";
var IMG_SMART_LIVE = GIT_IO + "smart_live.png";
var IMG_SMART_GAME = GIT_IO + "smart_games.png";
var IMG_SMART_USER = GIT_IO + "smart_users.png";
var IMG_SMART_FEATURED = GIT_IO + "smart_featured.png";
var IMG_SMART_VIDEO = GIT_IO + "smart_videos.png";
var IMG_SMART_CLIP = GIT_IO + "smart_cips.png";
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
        Main_ready(Main_initWindows);
    });
}

function Main_initWindows() {
    //set top bar labels
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    Main_IconLoad('label_search', 'icon-search', STR_SEARCH_KEY);
    Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
    Main_IconLoad('label_controls', 'icon-question-circle', STR_CONTROL_KEY);
    Main_IconLoad('label_about', 'icon-info-circle', STR_ABOUT_KEY);
    Main_updateclock();
    window.setInterval(Main_updateclock, 60000);

    Main_textContent('top_bar_live', STR_LIVE);
    Main_textContent('top_bar_user', STR_USER);
    Main_textContent('top_bar_featured', STR_FEATURED);
    Main_textContent('top_bar_game', STR_GAMES);
    Main_textContent('top_bar_vod', STR_VIDEOS);
    Main_textContent('top_bar_clip', STR_CLIPS);
    Main_textContent('chanel_button', STR_CHANNELS);
    Main_textContent('game_button', STR_GAMES);
    Main_textContent('live_button', STR_LIVE);
    Main_textContent('exit_app_cancel', STR_CANCEL);
    Main_textContent('exit_app_close', STR_CLOSE);
    Main_textContent('remove_cancel', STR_CANCEL);
    Main_textContent('remove_yes', STR_YES);
    Main_textContent('exit_app_minimize', STR_MINIMIZE);
    Main_textContent("main_dialog_exit_text", STR_EXIT_MESSAGE);

    Main_innerHTML("dialog_about_text", STR_ABOUT_INFO_HEADER + STR_ABOUT_INFO_0);
    Main_innerHTML("dialog_controls_text", STR_CONTROLS_MAIN_0);
    Main_ScrollbarElement = document.getElementById("scrollbar");
    Main_SearchInput = document.getElementById("search_input");
    Main_AddUserInput = document.getElementById("user_input");
    Main_AddCodeInput = document.getElementById("oauth_input");

    UserGames_live = (localStorage.getItem('user_Games_live') || 'true') === 'true' ? true : false;
    Vod_highlight = (localStorage.getItem('Vod_highlight') || 'false') === 'true' ? true : false;
    Svod_highlight = (localStorage.getItem('Svod_highlight') || 'false') === 'true' ? true : false;
    AGameVod_highlight = (localStorage.getItem('AGameVod_highlight') || 'false') === 'true' ? true : false;

    Vod_periodNumber = parseInt(localStorage.getItem('vod_periodNumber')) || 2;
    Sclip_periodNumber = parseInt(localStorage.getItem('sclip_periodNumber')) || 2;
    Clip_periodNumber = parseInt(localStorage.getItem('Clip_periodNumber')) || 2;
    AGameClip_periodNumber = parseInt(localStorage.getItem('AGameClip_periodNumber')) || 2;
    AGameVod_periodNumber = parseInt(localStorage.getItem('AGameVod_periodNumber')) || 2;

    Main_ready(function() {

        Play_PreStart();
        Main_Is4k = webapis.productinfo.isUdPanelSupported();
        SmartHub_SetNoUserPreviewData();
        AddUser_RestoreUsers();
        Live_init();
        document.body.addEventListener("keyup", Main_handleKeyUp, false);

        // pre load All img
        Main_PreLoadAImage(IMG_404_VIDEO);
        Main_PreLoadAImage(IMG_404_GAME);
        Main_PreLoadAImage(IMG_404_LOGO);

        window.setTimeout(Main_NetworkStateChangeListenerStart, 5000);
        document.addEventListener('visibilitychange', Main_ResumeNetwork, false);
    });
}

function Main_IconLoad(lable, icon, string) {
    Main_innerHTML(lable, '<div style="vertical-align: middle; display: inline-block;"><i class="' + icon +
        '" style="color: #FFFFFF; font-size: 115%; "></i></div><div style="vertical-align: middle; display: inline-block">' + STR_SPACE + string + '</div>');
}

function Main_HideElement(element) {
    document.getElementById(element).classList.add('hide');
}

function Main_ShowElement(element) {
    document.getElementById(element).classList.remove('hide');
}

function Main_isElementShowing(element) {
    return document.getElementById(element).className.indexOf('hide') === -1;
}

function Main_AddClass(element, mclass) {
    document.getElementById(element).classList.add(mclass);
}

function Main_RemoveClass(element, mclass) {
    document.getElementById(element).classList.remove(mclass);
}

function Main_innerHTML(div, value) {
    document.getElementById(div).innerHTML = value;
}

function Main_textContent(div, value) {
    document.getElementById(div).textContent = value;
}

function Main_showLoadDialog() {
    Main_HideExitDialog();
    Main_ShowElement('dialog_loading');
}

function Main_HideLoadDialog() {
    Main_HideElement('dialog_loading');
}

function Main_clearExitDialog() {
    window.clearTimeout(Main_ExitDialogID);
}

function Main_setExitDialog() {
    Main_ExitDialogID = window.setTimeout(Main_HideExitDialog, 6000);
}

function Main_showExitDialog() {
    Main_setExitDialog();
    Main_ShowElement('main_dialog_exit');
}

function Main_HideExitDialog() {
    Main_clearExitDialog();
    Main_HideElement('main_dialog_exit');
    Live_ExitCursor = 0;
    Live_ExitCursorSet();
}

function Main_isExitDialogShown() {
    return Main_isElementShowing('main_dialog_exit');
}

function Main_CounterDialogRst() {
    Main_empty('dialog_counter_text');
    Main_Scrollbar(0, 0, 0);
}

function Main_CounterDialog(x, y, coloumns, total) {
    if (total > 0) {
        Main_textContent('dialog_counter_text', (y * coloumns) + (x + 1) + '/' + (total));
        Main_Scrollbar(y, coloumns, total);
    } else Main_CounterDialogRst();
}

function Main_Scrollbar(y, coloumns, total) {
    //if show the scroll, else reset it's position and hide by setting it's color equal to parent background
    if ((coloumns === 3 && (total > 9)) || (coloumns === 5 && (total > 10)) || (coloumns === 6 && (total > 12))) {

        // min 100 max 1000 or the 900 + 100 below
        var nextPositon = Math.ceil(900 / (Math.ceil(total / coloumns) - 1) * y + 100);
        Main_ScrollbarElement.style.top = nextPositon + "px";

        if (Main_ScrollbarIsHide) {
            Main_ScrollbarIsHide = false;
            Main_ScrollbarElement.style.backgroundColor = "#777777";
        }
    } else {
        Main_ScrollbarElement.style.backgroundColor = "#000000";
        Main_ScrollbarElement.style.top = "100px";
        Main_ScrollbarIsHide = true;
    }
}

function Main_SetItemsLimitReplace(blankCellCount) {
    Main_ItemsLimitReplace = 12;
    if (blankCellCount > (Main_ItemsLimitReplace / 3)) Main_ItemsLimitReplace = blankCellCount * 3;
    if (Main_ItemsLimitReplace > 99) Main_ItemsLimitReplace = 99;
}

function Main_showWarningDialog(text) {
    if (!Main_NetworkStateOK && text === STR_REFRESH_PROBLEM) Main_NetworkRefresh = true;
    Main_textContent('dialog_warning_text', !Main_NetworkStateOK ? STR_NET_DOWN : text);
    Main_ShowElement('dialog_warning');
}

function Main_HideWarningDialog() {
    Main_HideElement('dialog_warning');
}

function Main_isWarningDialogShown() {
    return Main_isElementShowing('dialog_warning');
}

function Main_showAboutDialog() {
    Main_HideExitDialog();
    Main_HideControlsDialog();
    Main_HideUpdateDialog();
    Main_ShowElement('dialog_about');
}

function Main_HideAboutDialog() {
    Main_HideElement('dialog_about');
}

function Main_isAboutDialogShown() {
    return Main_isElementShowing('dialog_about');
}

function Main_showControlsDialog() {
    Main_HideExitDialog();
    Main_HideAboutDialog();
    Main_HideUpdateDialog();
    Main_ShowElement('dialog_controls');
}

function Main_HideControlsDialog() {
    Main_HideElement('dialog_controls');
}


function Main_isControlsDialogShown() {
    return Main_isElementShowing('dialog_controls');
}

function Main_showUpdateDialog() {
    Main_HideExitDialog();
    Main_HideAboutDialog();
    Main_HideControlsDialog();
    Main_ShowElement('dialog_update');
}

function Main_HideUpdateDialog() {
    Main_HideElement('dialog_update');
}

function Main_isUpdateDialogShown() {
    return Main_isElementShowing('dialog_update');
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
    Main_updateclock();
    Main_SwitchScreen();
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
    document.body.addEventListener("keyup", Main_handleKeyUp, false);
}

function Main_SwitchScreen() {
    if (Main_NetworkStateOK) Main_HideWarningDialog();

    if (Main_Go !== Main_ChannelContent && Main_Go !== Main_aGame) {
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
    else if (Main_Go === Main_ChannelContent) ChannelContent_init();
    else if (Main_Go === Main_Svod) Svod_init();
    else if (Main_Go === Main_Sclip) Sclip_init();
    else if (Main_Go === Main_Users) Users_init();
    else if (Main_Go === Main_UserLive) UserLive_init();
    else if (Main_Go === Main_UserHost) UserHost_init();
    else if (Main_Go === Main_usergames) UserGames_init();
    else if (Main_Go === Main_UserChannels) UserChannels_init();
    else if (Main_Go === Main_SChannels) SChannels_init();
    else if (Main_Go === Main_Vod) Vod_init();
    else if (Main_Go === Main_Clip) Clip_init();
    else if (Main_Go === Main_AGameVod) AGameVod_init();
    else if (Main_Go === Main_AGameClip) AGameClip_init();
    else if (Main_Go === Main_Featured) Featured_init();
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
    else if (ExitCurrent === Main_ChannelContent) ChannelContent_exit();
    else if (ExitCurrent === Main_Svod) Svod_exit();
    else if (ExitCurrent === Main_Sclip) Sclip_exit();
    else if (ExitCurrent === Main_Users) Users_exit();
    else if (ExitCurrent === Main_UserLive) UserLive_exit();
    else if (ExitCurrent === Main_UserHost) UserHost_exit();
    else if (ExitCurrent === Main_usergames) UserGames_exit();
    else if (ExitCurrent === Main_UserChannels) UserChannels_exit();
    else if (ExitCurrent === Main_SChannels) SChannels_exit();
    else if (ExitCurrent === Main_Vod) Vod_exit();
    else if (ExitCurrent === Main_Clip) Clip_exit();
    else if (ExitCurrent === Main_AGameVod) AGameVod_exit();
    else if (ExitCurrent === Main_AGameClip) AGameClip_exit();
    else if (ExitCurrent === Main_Featured) Featured_exit();
}

function Main_openStream() {
    document.body.addEventListener("keydown", Play_handleKeyDown, false);
    Main_ShowElement('scene2');
    Play_hidePanel();
    Play_hideChat();
    Main_HideElement('scene1');
    Play_Start();
}

function Main_RestoreTopLabel() {
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    Main_IconLoad('label_search', 'icon-search', STR_SEARCH_KEY);
    Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
    Main_IconLoad('label_controls', 'icon-question-circle', STR_CONTROL_KEY);
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_textContent('top_bar_live', STR_LIVE);
    Main_textContent('top_bar_user', STR_USER);
    Main_textContent('top_bar_featured', STR_FEATURED);
    Main_textContent('top_bar_game', STR_GAMES);
    Main_textContent('top_bar_vod', STR_VIDEOS);
    Main_textContent('top_bar_clip', STR_CLIPS);
}

function Main_cleanTopLabel() {
    Main_IconLoad('label_controls', 'icon-arrow-circle-left', STR_GOBACK);
    Main_empty('label_switch');
    Main_empty('top_bar_live');
    Main_empty('top_bar_game');
    Main_empty('top_bar_vod');
    Main_empty('top_bar_clip');
    Main_empty('top_bar_featured');
    Main_AddClass('top_bar_user', 'icon_center_focus');
}

function Main_UnderCenter(text) {
    return '<div style="font-size: 30%; position: fixed; line-height: 0; text-shadow: #000000 0 0 5.7px, #000000 0 0 5.7px, #000000 0 0 4px">' + text + '</div>';
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
            window.setTimeout(Main_HideWarningDialog, 1500);
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
    var Appversion = null,
        TizenVersion = null,
        tvModel = null,
        fw = null,
        value = 0;

    try {
        Appversion = tizen.application.getAppInfo().version;
        // Retrieving Platform Information https://developer.samsung.com/tv/develop/guides/fundamentals/retrieving-platform-information
        TizenVersion = tizen.systeminfo.getCapability("http://tizen.org/feature/platform.version");
        fw = webapis.productinfo.getFirmware();
        tvModel = webapis.productinfo.getModel();
    } catch (e) {}

    if (Appversion !== null && TizenVersion !== null && tvModel !== null && fw !== null) {
        Main_currentVersion = Appversion;

        Main_versonTag = 'APP ' + STR_VERSION + Appversion + '.' + Main_minversion + STR_BR + 'Tizen ' + STR_VERSION +
            TizenVersion + STR_SPACE + STR_SPACE + '|' + STR_SPACE + STR_SPACE + 'TV: ' + tvModel + STR_SPACE + STR_SPACE + '|' +
            STR_SPACE + STR_SPACE + 'FW: ' + fw + STR_BR;
        Appversion = Appversion.split(".");
        value = parseInt(Appversion[0] + Appversion[1] + Appversion[2]);
        Main_innerHTML("dialog_about_text", STR_ABOUT_INFO_HEADER + Main_versonTag + STR_ABOUT_INFO_0);
        Main_innerHTML("dialog_update_text", STR_UPDATE_MAIN_HEADER + STR_CURRENT_VERSION + Main_currentVersion + STR_LATEST_VERSION + Main_stringVersion + STR_BR + STR_UPDATE_MAIN_0);
        return value < Main_version;
    } else return false;
}

function Main_GoLive() {
    AddCode_SetDefaultOAuth(0);
    Main_Go = Main_Live;
    Main_SwitchScreen();
}

// right after the TV comes from standby the network can lag, delay the check
function Main_ResumeNetwork() {
    if (document.hidden) Main_NetworkStateChangeListenerStop();
    else {
        Main_updateclock();
        window.setTimeout(function() {
            Main_NetworkStateChangeListenerStart();
        }, 20000);
    }
}

function Main_ResumeSmarthub() {
    if (document.hidden) window.clearInterval(Main_SmartHubId);
    else {
        window.setTimeout(function() {
            if (AddUser_UsernameArray.length > 0) {
                var timeDiff = (new Date().getTime() - 590000);

                if (timeDiff > SmartHub_LastUpdate) SmartHub_StartInterval();
                else window.setTimeout(SmartHub_StartInterval, (SmartHub_LastUpdate - timeDiff));

            } else {
                window.clearInterval(Main_SmartHubId);
                document.removeEventListener('visibilitychange', Main_ResumeSmarthub);
            }
        }, 10000);
    }
}

function Main_empty(el) {
    el = document.getElementById(el);
    while (el.firstChild) el.removeChild(el.firstChild);
}

function Main_imgVectorLoad(img_type) {
    for (var i = 0; i < Main_imgVector.length; i++) Main_loadImg(document.getElementById(Main_imgVector[i].id), Main_imgVector[i].src, img_type);
}

function Main_imgVectorRst() {
    Main_imgVector = [];
}

function Main_imgVectorPush(id, src) {
    Main_imgVector.push({
        'id': id,
        'src': src
    });
}

function Main_LazyImg(imgId, row_id, img_type, coloumns, offset) { //offset is one more then number if (cursorY > number)
    var change = Main_Ychange(row_id);
    if (row_id === offset && change === 1) change = 0;

    if (change) {
        var x = 0,
            mbool = change > 0,
            y, elem;

        for (x; x < coloumns; x++) {
            y = mbool ? row_id + offset : row_id - offset;
            elem = document.getElementById(imgId + y + '_' + x);
            if (elem !== null) Main_lazyLoad(elem, img_type);

            y = mbool ? row_id - offset - 1 : row_id + offset + 1;
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
    Main_cursorYAddFocus = y;
}

function Main_YchangeAddFocus(y) {
    var position = 0;

    if (Main_cursorYAddFocus < y) position = -1; //going down
    else if (Main_cursorYAddFocus > y) position = 1; //going up

    Main_cursorYAddFocus = y;
    return position;
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

    Main_td.className = 'stream_cell';
    Main_td.innerHTML = Main_ChannelHtml(id, idArray, valuesArray);

    return Main_td;
}

function Main_replaceChannel(id, valuesArray, ids) {
    var ele = document.getElementById(id);
    var splitedId = id.split(ids[5])[1];

    ele.setAttribute(Main_DataAttribute, valuesArray[0]);
    ele.setAttribute('data-id', valuesArray[1]);

    ele.innerHTML = Main_ChannelHtml(splitedId, ids, valuesArray);
    ele.setAttribute('id', ids[4] + splitedId);
}

function Main_ChannelHtml(id, idArray, valuesArray) {
    Main_imgVectorPush(idArray[1] + id, valuesArray[2]);
    return '<div id="' + idArray[0] + id + '" class="stream_thumbnail_channel" ><img id="' + idArray[1] +
        id + '" class="stream_img"></div>' +
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
    var ele = document.getElementById(id);
    var splitedId = id.split(ids[9])[1];
    ele.setAttribute(Main_DataAttribute, channel_name);
    ele.innerHTML = Main_VideoHtml(splitedId, ids, valuesArray);
    ele.setAttribute('id', ids[8] + splitedId);
}

function Main_VideoHtml(id, idArray, valuesArray) {
    Main_imgVectorPush(idArray[1] + id, valuesArray[0]);
    return '<div id="' + idArray[0] + id + '" class="stream_thumbnail_video" >' +
        '<img id="' + idArray[1] + id + '" class="stream_img"></div>' +
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
    var ele = document.getElementById(id);
    var splitedId = id.split(ids[6])[1];
    ele.setAttribute(Main_DataAttribute, valuesArray[0]);
    ele.innerHTML = Main_GameHtml(splitedId, ids, valuesArray);
    ele.setAttribute('id', ids[5] + splitedId);
}

function Main_GameHtml(id, idArray, valuesArray) {
    Main_imgVectorPush(idArray[1] + id, valuesArray[1]);
    return '<div id="' + idArray[0] + id + '" class="stream_thumbnail_game" >' +
        '<img id="' + idArray[1] + id + '" class="stream_img"></div>' +
        '<div id="' + idArray[2] + id + '" class="stream_text">' +
        '<div id="' + idArray[3] + id + '" class="stream_channel">' + valuesArray[0] + '</div>' +
        '<div id="' + idArray[4] + id + '"class="stream_info_games" style="width: 100%; display: inline-block;">' +
        valuesArray[2] + '</div></div>';
}

//"handleKeyUp, keyClickDelay, keyClickDelayStart and Main_CantClick" are here to prevent races during click and hold
//That can cause visual glitches and make the user lost sense on were the focus is
//Or cause the app to keep moving up/down seconds after the key has be released
function Main_handleKeyUp() {
    Main_addFocusFinish = true;
}

function Main_keyClickDelay() {
    Main_LastClickFinish = true;
}

function Main_keyClickDelayStart() {
    Main_LastClickFinish = false;
    window.setTimeout(Main_keyClickDelay);
}

function Main_CantClick() {
    return !Main_LastClickFinish || !Main_addFocusFinish;
}

function Main_addFocusChannel(y, x, idArray, ColoumnsCount, itemsCount) {
    Main_AddClass(idArray[0] + y + '_' + x, Main_classThumb);
    Main_CounterDialog(x, y, ColoumnsCount, itemsCount);
    if (Main_YchangeAddFocus(y)) {

        if (y > 1) {

            if (Main_ThumbNull((y + 1), 0, idArray[0]))
                Main_ScrollTable(idArray[6],
                    (document.getElementById(idArray[4] + y + '_' + x).offsetTop * -1) + 450);

        } else Main_ScrollTable(idArray[6], 100);

    } else Main_handleKeyUp();
}

function Main_addFocusVideo(y, x, idArray, ColoumnsCount, itemsCount) {
    Main_AddClass(idArray[0] + y + '_' + x, Main_classThumb);
    Main_CounterDialog(x, y, ColoumnsCount, itemsCount);
    if (Main_YchangeAddFocus(y)) {

        if (Main_ThumbNull((y + 1), 0, idArray[0]))
            Main_ScrollTable(idArray[10],
                (y ? (document.getElementById(idArray[8] + y + '_' + x).offsetTop * -1) + 358 : 100));

    } else Main_handleKeyUp();
}

function Main_addFocusGame(y, x, idArray, ColoumnsCount, itemsCount) {
    Main_AddClass(idArray[0] + y + '_' + x, Main_classThumb);
    Main_CounterDialog(x, y, ColoumnsCount, itemsCount);
    if (Main_YchangeAddFocus(y)) {

        if (Main_ThumbNull((y + 1), 0, idArray[0]))
            Main_ScrollTable(idArray[7],
                (y ? (document.getElementById(idArray[5] + y + '_' + x).offsetTop * -1) + 555 : 33));

    } else Main_handleKeyUp();
}

function Main_ScrollTable(id, position) {
    document.getElementById(id).style.top = position + "px";

    Main_ready(function() {
        window.setTimeout(Main_handleKeyUp, 10);
    });
}

function Main_removeFocus(id, idArray) {
    Main_addFocusFinish = false;
    Main_RemoveClass(idArray[0] + id, Main_classThumb);
}

function Main_Checktylesheet() {
    var stylesheet = document.styleSheets;
    for (var i = 0; i < stylesheet.length; i++)
        if (stylesheet[i].href !== null && stylesheet[i].href.indexOf('video-js') === -1)
            if (!stylesheet[i].cssRules.length) Main_LoadStylesheet(stylesheet[i].href);

    // video-js is a old stylesheet present on old releases no need to try to reload it as is empty
}

function Main_LoadStylesheet(path) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = path;

    document.getElementsByTagName("head")[0].appendChild(link);
}

//adapted from https://code.jquery.com/jquery-3.3.1.js
function Main_ready(func) {
    if (document.readyState === "complete" ||
        (document.readyState !== "loading" && !document.documentElement.doScroll)) {

        // Handle it asynchronously to allow scripts the opportunity to delay ready
        window.setTimeout(func);

    } else document.addEventListener("DOMContentLoaded", func);
}

function Main_getclock() {
    var date = new Date(),
        dayMonth;

    if (Main_IsDayFirst) dayMonth = date.getDate() + '/' + monthNames[date.getMonth()];
    else dayMonth = monthNames[date.getMonth()] + '/' + date.getDate();

    return dayMonth + ' ' + Play_lessthanten(date.getHours()) + ':' + Play_lessthanten(date.getMinutes());
}

function Main_updateclock() {
    Main_textContent('label_clock', Main_getclock());
}