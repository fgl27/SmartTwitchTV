//Variable initialization
var Main_isReleased = false;
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
var Main_SearchGames = 9;
var Main_SearchLive = 10;
var Main_ChannelContent = 11;
var Main_ChannelVod = 12;
var Main_ChannelClip = 13;
var Main_Users = 14;
var Main_UserChannels = 15;
var Main_SearchChannels = 16;
var Main_addCode = 17;
var Main_Vod = 18;
var Main_Clip = 19;
var Main_AGameVod = 20;
var Main_AGameClip = 21;
var Main_Featured = 22;
var Main_UserVod = 23;

var Main_GoBefore = '';
var Main_values = {
    "Main_Go": 1,
    "Main_Before": 1,
    "Main_BeforeSearch": 1,
    "Main_BeforeChannel": 1,
    "Main_BeforeAgame": Main_games,
    "Main_BeforeChannelisSet": false,
    "Main_BeforeAgameisSet": false,
    "Main_selectedChannel": '',
    "Main_selectedChannelDisplayname": '',
    "Main_selectedChannelLogo": '',
    "Main_selectedChannel_id": '',
    "Main_gameSelected": '',
    "Main_OldgameSelected": null,
    "Play_isHost": false,
    "Play_DisplaynameHost": '',
    "Play_selectedChannelDisplayname": '',
    "Play_selectedChannel": '',
    "Play_gameSelected": '',
    "Users_Position": 0,
    "Users_AddcodePosition": 0,
    "Main_WasOpen": false,
    "Play_WasPlaying": 0,
    "ChannelVod_vodId": '',
    "vodOffset": 0,
    "Search_data": '',
    "isLastSChannels": false,
    "gameSelectedOld": '',
    "Games_return": false,
    "Search_isSearching": false,
    "Play_ChatForceDisable": false,
    "Main_CenterLablesVectorPos": 0
};

var Main_LastClickFinish = true;
var Main_addFocusFinish = true;
var Main_CenterLablesInUse = false;
var Main_imgVector = [];
var Main_newUsercode = 0;

var Main_ExitDialogID = null;
var Main_ScrollbarIsHide = true;
var Main_td = '';
var Main_IsDayFirst = false;
var Main_ScrollbarElement;
var Main_SearchInput;
var Main_AddUserInput;
var Main_AddCodeInput;
var Main_SetTopOpacityId;
var Main_updateclockId;
var Main_ContentLang = "";
var Main_OpacityDivs = ["label_side_panel", "label_extra", "label_refresh", "label_switch", "top_bar_live", "top_bar_user", "top_bar_featured", "top_bar_game", "top_bar_vod", "top_bar_clip"];
var Main_Periods;
var Main_addFocusVideoOffset = 0;
var Main_Is4k = false;
var Main_FirstRun = true;

var Main_SidePannelPos = 0;
var Main_SidePannelCallback;

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

var Main_clientId = "5seja5ptej058mxqy7gh5tcudjqtm9";
var Main_clientIdHeader = 'Client-ID';
var Main_AcceptHeader = 'Accept';
var Main_Authorization = 'Authorization';
var Main_OAuth = 'OAuth ';
var Main_TwithcV5Json = 'application/vnd.twitchtv.v5+json';
var Main_VideoSize = "528x297"; // default size 640x360
var Main_GameSize = "340x475"; // default size 272x380

var Main_classThumb = 'stream_thumbnail_focused';
var Main_DataAttribute = 'data_attribute';

//var Main_version = 401;
var Main_stringVersion = '4.0.1';
//var Main_currentVersion = '';
var Main_minversion = '032519';
var Main_versionTag = Main_stringVersion + '-' + Main_minversion;
var Main_ClockOffset = 0;
var Main_Android = 0;
var Main_randomimg = '?' + Math.random();
var GIT_IO = "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/";
var IMG_404_GAME = GIT_IO + "404_game.png";
var IMG_404_LOGO = GIT_IO + "404_logo.png";
var IMG_404_VIDEO = GIT_IO + "404_video.png";
//var TEMP_MP4 = GIT_IO + "temp.mp4";
var proxyurl = "https://cors-anywhere.herokuapp.com/";

//function vars
var Main_loadImg = function(ImgObjet, Src, img_type) {
    ImgObjet.onerror = function() {
        this.src = img_type; //img fail to load use predefined
    };
    ImgObjet.src = Src;
};
//Variable initialization end

// this function will be called only once the first time the app startup
Main_Start();

function Main_Start() {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function() {
            Main_loadTranslations(window.navigator.userLanguage || window.navigator.language);
        });
    } else { // `DOMContentLoaded` already fired
        Main_loadTranslations(window.navigator.userLanguage || window.navigator.language);
    }
}

function Main_loadTranslations(language) {
    Main_Checktylesheet();

    Main_ready(function() {
        var doc = document.body;
        if (Main_isReleased) doc.innerHTML = STR_BODY;

        try {
            Main_Android = Android.getAndroid();
        } catch (e) {
            Main_Android = 0;
            doc.style.backgroundColor = "rgba(0, 0, 0, 1)";
        }

        Main_ready(function() {
            Settings_SetDefautls();
            en_USLang();

            // Language is set as (LANGUAGE)_(REGION) in (ISO 639-1)_(ISO 3166-1 alpha-2) eg.; pt_BR Brazil, en_US USA
            // https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
            // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

            var lang = language,
                Savedlang = Main_getItemInt('user_language', 0);

            if (Savedlang) lang = Settings_Obj_set_values("general_lang");
            else Settings_CheckLang(lang);

            if (lang.indexOf('pt_') !== -1) pt_BRLang();
            else if (lang.indexOf('it_') !== -1) it_ITLang();

            console.log("language is " + lang);
            DefaultLang();

            if (window.location.href.indexOf('code') !== -1) processCode(window.location.href);

            Main_initWindows();
        });
    });

}

function Main_initWindows() {
    Screens_InitScreens();
    Main_SetStringsMain(true);

    Main_ScrollbarElement = document.getElementById("scrollbar");
    Main_RestoreValues();
    Main_GoBefore = Main_values.Main_Go;

    Main_ready(function() {

        Play_PreStart();
        AddUser_RestoreUsers();
        document.body.addEventListener("keyup", Main_handleKeyUp, false);
        Screens_InitSecondaryScreens();
        Live_init();

        //keep 4k streams disable until we have 4k content from twitch
        //TV models that don't like "setStreamingProperty("SET_MODE_4K", "TRUE");" all 1080p and UNU7090
        Main_Is4k = false;
        Chat_Preinit();
        Main_SetTopOpacityId = window.setTimeout(Main_SetTopOpacity, 5000);
        document.getElementById("side_panel").style.marginLeft = '';

        Main_checkVersion();

        Main_SetStringsSecondary();

        Vod_highlight = Main_getItemBool('Vod_highlight', false);
        ChannelVod_highlight = Main_getItemBool('ChannelVod_highlight', false);
        AGameVod_highlight = Main_getItemBool('AGameVod_highlight', false);
        UserVod_highlight = Main_getItemBool('UserVod_highlight', false);

        Vod_periodNumber = Main_getItemInt('vod_periodNumber', 2);
        AGameVod_periodNumber = Main_getItemInt('AGameVod_periodNumber', 2);
        UserVod_TypeNumber = Main_getItemInt('UserVod_TypeNumber', 1);

        PlayVod_RestoreVodIds();

        Main_SearchInput = document.getElementById("search_input");
        Main_AddUserInput = document.getElementById("user_input");
        Main_AddCodeInput = document.getElementById("oauth_input");

        // pre load All img
        Main_CacheImage(IMG_404_VIDEO);
        Main_CacheImage(IMG_404_GAME);
        Main_CacheImage(IMG_404_LOGO);

        document.addEventListener('visibilitychange', Main_ResumeNetwork, false);
        Main_updateclockId = window.setInterval(Main_updateclock, 60000);
    });
}

function Main_SetStringsMain(isStarting) {
    Main_updateclock();

    //set top bar labels
    Main_IconLoad('label_refresh', isStarting ? 'icon-refresh' : 'icon-arrow-circle-left',
        isStarting ? (STR_REFRESH + STR_GUIDE) : STR_GOBACK);
    Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);

    Main_textContent('top_bar_live', STR_LIVE);
    Main_textContent('top_bar_user', isStarting ? STR_USER : STR_SETTINGS);
    Main_textContent('top_bar_featured', STR_FEATURED);
    Main_textContent('top_bar_game', STR_GAMES);
    Main_textContent('top_bar_vod', STR_VIDEOS);
    Main_textContent('top_bar_clip', STR_CLIPS);

    Main_innerHTML("scene2_search_text", STR_SPACE + STR_SEARCH);
    Main_innerHTML("scene2_channel_text", STR_SPACE + STR_CHANNEL_CONT);
    Main_innerHTML("scene2_game_text", STR_SPACE + STR_GAME_CONT);

    Main_textContent("dialog_end_replay_text", STR_REPLAY);
    Main_textContent("dialog_end_vod_text", STR_OPEN_BROADCAST);
    Main_textContent("dialog_end_channel_text", STR_CHANNEL_CONT);
    Main_textContent("dialog_end_game_text", STR_GAME_CONT);
    Main_innerHTML("dialog_about_text", STR_ABOUT_INFO_HEADER + STR_ABOUT_INFO_0);
    Main_Periods = [STR_CLIP_DAY, STR_CLIP_WEEK, STR_CLIP_MONTH, STR_CLIP_ALL];

    if (isStarting) Settings_SetSettings();
    else {
        Settings_SetStrings();
        Main_checkVersion();
    }
}

function Main_SetStringsSecondary() {
    Main_textContent("play_dialog_exit_text", STR_EXIT_AGAIN);
    Main_innerHTML("dialog_controls_play_text", STR_CONTROLS_PLAY_0);
    Main_innerHTML("stream_controls", '<div style="vertical-align: middle; display: inline-block"><i class="icon-question-circle" style="color: #FFFFFF; font-size: 105%; "></i></div><div style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_CONTROL_KEY + '</div>');

    Main_textContent('side_panel_search', STR_SEARCH);
    Main_textContent('side_panel_settings', STR_SETTINGS);
    Main_textContent('side_panel_about', STR_ABOUT);
    Main_textContent('side_panel_controls', STR_CONTROLS);

    Main_textContent('side_panel_live', STR_LIVE);
    Main_textContent('side_panel_user', STR_USER);
    Main_textContent('side_panel_featured', STR_FEATURED);
    Main_textContent('side_panel_games', STR_GAMES);
    Main_textContent('side_panel_videos', STR_VIDEOS);
    Main_textContent('side_panel_clips', STR_CLIPS);
    Main_textContent('side_panel_hide', STR_HIDE);

    Main_textContent('chanel_button', STR_CHANNELS);
    Main_textContent('game_button', STR_GAMES);
    Main_textContent('live_button', STR_LIVE);
    Main_textContent('exit_app_cancel', STR_CANCEL);
    Main_textContent('exit_app_close', STR_CLOSE);
    Main_textContent('remove_cancel', STR_CANCEL);
    Main_textContent('remove_yes', STR_YES);
    Main_textContent('exit_app_minimize', STR_MINIMIZE);
    Main_textContent("main_dialog_exit_text", STR_EXIT_MESSAGE);

    Main_innerHTML("dialog_controls_text", STR_CONTROLS_MAIN_0);

    Main_textContent("dialog_vod_text", STR_VOD_HISTORY);
    Main_innerHTML("dialog_vod_start_text", STR_FROM_START);

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
    Main_YRst(-1);
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

function Main_showExitDialog() { // jshint ignore:line
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
    var screen_size = ((screen.height / 100) * 7);
    //if show the scroll, else reset it's position and hide by setting it's color equal to parent background
    if ((coloumns === 3 && (total > 9)) || (coloumns === 5 && (total > 10)) || (coloumns === 6 && (total > 12))) {
        // min screen_size max screen.height - (screen_size * 3)
        var needExtraSpace = (Main_values.Main_Go === Main_aGame || Main_values.Main_Go === Main_AGameVod ||
            Main_values.Main_Go === Main_AGameClip || Main_values.Main_Go === Main_ChannelVod ||
            Main_values.Main_Go === Main_UserVod || Main_values.Main_Go === Main_Vod ||
            Main_values.Main_Go === Main_Clip || Main_values.Main_Go === Main_ChannelClip);
        var nextPositon = Math.ceil((screen.height - (screen_size * 3)) / (Math.ceil(total / coloumns) - 1) * y + (screen_size * (needExtraSpace ? 1.8 : 1)));
        Main_ScrollbarElement.style.top = nextPositon + "px";

        if (Main_ScrollbarIsHide) {
            Main_ScrollbarIsHide = false;
            Main_ScrollbarElement.style.backgroundColor = "#777777";
        }
    } else {
        Main_ScrollbarElement.style.backgroundColor = "#000000";
        Main_ScrollbarElement.style.top = screen_size + "px";
        Main_ScrollbarIsHide = true;
    }
}

function Main_SetItemsLimitReplace(blankCellCount) {
    Main_ItemsLimitReplace = 12;
    if (blankCellCount > (Main_ItemsLimitReplace / 3)) Main_ItemsLimitReplace = blankCellCount * 3;
    if (Main_ItemsLimitReplace > 99) Main_ItemsLimitReplace = 99;
}

function Main_showWarningDialog(text) {
    Main_textContent('dialog_warning_text', text);
    Main_ShowElement('dialog_warning');
}

function Main_HideWarningDialog() {
    Main_HideElement('dialog_warning');
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

function Main_showSettings() {
    Main_HideExitDialog();
    Main_HideControlsDialog();
    Main_HideUpdateDialog();
    Main_HideWarningDialog();
    Main_ExitCurrent(Main_values.Main_Go);
    Main_CounterDialogRst();
    Settings_init();
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

//function Main_showUpdateDialog() {
//    Main_HideExitDialog();
//    Main_HideAboutDialog();
//    Main_HideControlsDialog();
//    Main_ShowElement('dialog_update');
//}

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
    document.body.addEventListener("keyup", Main_handleKeyUp, false);
}

function Main_SetTopOpacity() {
    var elem, i = 0;
    for (i; i < Main_OpacityDivs.length; i++) {
        if (i < 4) document.getElementById(Main_OpacityDivs[i]).style.opacity = '0.5';
        else {
            elem = document.getElementById(Main_OpacityDivs[i]);
            if (elem.className.indexOf('icon_center_focus') === -1) elem.style.opacity = '0.5';
        }
    }
    Main_AddClass('topbar', 'topbar_dim');
}

function Main_UnSetTopOpacity() {
    for (var i = 0; i < Main_OpacityDivs.length; i++)
        document.getElementById(Main_OpacityDivs[i]).style.opacity = '1';
    Main_RemoveClass('topbar', 'topbar_dim');
}

function Main_SwitchScreen() {
    window.clearTimeout(Main_SetTopOpacityId);
    Main_UnSetTopOpacity();

    if (Main_values.Main_Go !== Main_ChannelContent) Main_values.Main_BeforeChannelisSet = false;
    if (Main_values.Main_Go !== Main_aGame) Main_values.Main_BeforeAgameisSet = false;

    Main_CounterDialogRst();
    if (Main_values.Main_Go === Main_Live) Live_init();
    else if (Main_values.Main_Go === Main_addUser) AddUser_init();
    else if (Main_values.Main_Go === Main_addCode) AddCode_init();
    else if (Main_values.Main_Go === Main_games) {
        inUseObj = Game;
        Screens_init();
    } else if (Main_values.Main_Go === Main_aGame) AGame_init();
    else if (Main_values.Main_Go === Main_Search) Search_init();
    else if (Main_values.Main_Go === Main_SearchGames) SearchGames_init();
    else if (Main_values.Main_Go === Main_SearchLive) SearchLive_init();
    else if (Main_values.Main_Go === Main_ChannelContent) ChannelContent_init();
    else if (Main_values.Main_Go === Main_ChannelVod) ChannelVod_init();
    else if (Main_values.Main_Go === Main_ChannelClip) {
        inUseObj = ChannelClip;
        Screens_init();
    } else if (Main_values.Main_Go === Main_Users) Users_init();
    else if (Main_values.Main_Go === Main_UserLive) UserLive_init();
    else if (Main_values.Main_Go === Main_UserHost) UserHost_init();
    else if (Main_values.Main_Go === Main_usergames) {
        inUseObj = UserGames;
        Screens_init();
    } else if (Main_values.Main_Go === Main_UserChannels) UserChannels_init();
    else if (Main_values.Main_Go === Main_SearchChannels) SearchChannels_init();
    else if (Main_values.Main_Go === Main_Vod) Vod_init();
    else if (Main_values.Main_Go === Main_Clip) {
        inUseObj = Clip;
        Screens_init();
    } else if (Main_values.Main_Go === Main_AGameVod) AGameVod_init();
    else if (Main_values.Main_Go === Main_AGameClip) {
        inUseObj = AGameClip;
        Screens_init();
    } else if (Main_values.Main_Go === Main_Featured) Featured_init();
    else if (Main_values.Main_Go === Main_UserVod) UserVod_init();
    else Live_init();

    Main_SetTopOpacityId = window.setTimeout(Main_SetTopOpacity, 3000);
}

function Main_SaveValues() {
    Main_setItem('Main_values', JSON.stringify(Main_values));
}

function Main_RestoreValues() {
    Main_values = Screens_assign(Main_values, Main_getItemJson('Main_values', {}));
}

function Main_ExitCurrent(ExitCurrent) {
    if (ExitCurrent === Main_Live) Live_exit();
    else if (ExitCurrent === Main_addUser) AddUser_exit();
    else if (ExitCurrent === Main_addCode) AddCode_exit();
    else if (ExitCurrent === Main_games) Screens_exit();
    else if (ExitCurrent === Main_aGame) AGame_exit();
    else if (ExitCurrent === Main_Search) Search_exit();
    else if (ExitCurrent === Main_SearchGames) SearchGames_exit();
    else if (ExitCurrent === Main_SearchLive) SearchLive_exit();
    else if (ExitCurrent === Main_ChannelContent) ChannelContent_exit();
    else if (ExitCurrent === Main_ChannelVod) ChannelVod_exit();
    else if (ExitCurrent === Main_ChannelClip) Screens_exit();
    else if (ExitCurrent === Main_Users) Users_exit();
    else if (ExitCurrent === Main_UserLive) UserLive_exit();
    else if (ExitCurrent === Main_UserHost) UserHost_exit();
    else if (ExitCurrent === Main_usergames) Screens_exit();
    else if (ExitCurrent === Main_UserChannels) UserChannels_exit();
    else if (ExitCurrent === Main_SearchChannels) SearchChannels_exit();
    else if (ExitCurrent === Main_Vod) Vod_exit();
    else if (ExitCurrent === Main_Clip) Screens_exit();
    else if (ExitCurrent === Main_AGameVod) AGameVod_exit();
    else if (ExitCurrent === Main_AGameClip) Screens_exit();
    else if (ExitCurrent === Main_Featured) Featured_exit();
    else if (ExitCurrent === Main_UserVod) UserVod_exit();

    if (Main_isElementShowing('settings_scroll')) Settings_exit();
}

function Main_RestoreTopLabel() {
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
    Main_HideElement('label_switch');
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_textContent('top_bar_live', STR_LIVE);
    Main_textContent('top_bar_user', STR_USER);
    Main_textContent('top_bar_featured', STR_FEATURED);
    Main_textContent('top_bar_game', STR_GAMES);
    Main_textContent('top_bar_vod', STR_VIDEOS);
    Main_textContent('top_bar_clip', STR_CLIPS);
}

function Main_cleanTopLabel() {
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
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
    if (Main_IsDayFirst) return time.getDate() + ' ' + STR_MONTHS[time.getMonth()] + ', ' + time.getFullYear();
    else return STR_MONTHS[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear();
}

function Main_checkVersion() {
    Main_innerHTML("dialog_about_text", STR_ABOUT_INFO_HEADER + Main_versionTag + STR_ABOUT_INFO_0);
}

function Main_GoLive() {
    if (!Main_isReleased) window.location.reload(true);
    else {
        Main_values.Users_Position = 0;
        Main_values.Main_Go = Main_Live;
        if (Main_values.Search_isSearching) Main_RestoreTopLabel();
        Main_values.Search_isSearching = false;
        Main_SwitchScreen();
    }
}

// right after the TV comes from standby the network can lag, delay the check
function Main_ResumeNetwork() {
    if (document.hidden) {
        window.clearInterval(Main_updateclockId);
    } else {
        Main_updateclock();
        Main_updateclockId = window.setInterval(Main_updateclock, 60000);
        window.setTimeout(function() {
            if (!document.hidden) {
                //Update clock twice as first try clock may be out of date in the case TV was on standby
                Main_updateclock();
            }
        }, 20000);
    }
}

function Main_empty(el) {
    el = document.getElementById(el);
    while (el.firstChild) el.removeChild(el.firstChild);
}

function Main_imgVectorLoad(img_type) {
    var elem;
    for (var i = 0; i < Main_imgVector.length; i++) {
        elem = document.getElementById(Main_imgVector[i].id);
        if (elem !== null) Main_loadImg(elem, Main_imgVector[i].src + Main_randomimg, img_type);
    }
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

function Main_YRst(y) {
    Main_cursorYAddFocus = y;
}

function Main_YchangeAddFocus(y) {
    var position = 0;

    if (Main_cursorYAddFocus < y) position = -1; //going down
    else if (Main_cursorYAddFocus > y) position = 1; //going up

    Main_cursorYAddFocus = y;
    return position;
}

function Main_CacheImage(link) {
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

function Main_createCellVideo(row_id, id, data, idArray, valuesArray) {
    if (row_id < Main_ColoumnsCountVideo) Main_CacheImage(valuesArray[0]);

    Main_td = document.createElement('td');
    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify(data));
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = Main_VideoHtml(id, idArray, valuesArray);

    return Main_td;
}

function Main_replaceVideo(id, data, valuesArray, ids) {
    var ele = document.getElementById(id);
    var splitedId = id.split(ids[9])[1];
    ele.setAttribute(Main_DataAttribute, JSON.stringify(data));
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
        '<div id="' + idArray[4] + id + '"class="stream_info">' + twemoji.parse(valuesArray[2]) + '</div>' +
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
        var screen_size = screen.height / 100;
        if (y > 1) {

            if (Main_ThumbNull((y + 1), 0, idArray[0])) {
                Main_ScrollTable(idArray[6],
                    (document.getElementById(idArray[4] + y + '_' + x).offsetTop * -1) + (screen_size * 42));
            } else Main_handleKeyUp();
        } else Main_ScrollTable(idArray[6], screen_size * 5);

    } else Main_handleKeyUp();
}

function Main_addFocusVideo(y, x, idArray, ColoumnsCount, itemsCount) {
    Main_AddClass(idArray[0] + y + '_' + x, Main_classThumb);
    Main_CounterDialog(x, y, ColoumnsCount, itemsCount);
    if (Main_YchangeAddFocus(y)) {
        var screen_size = screen.height / 100;

        if (!y) Main_ScrollTable(idArray[10], screen_size * 7);
        else if (Main_ThumbNull((y + 1), 0, idArray[0])) {
            Main_ScrollTable(idArray[10],
                (document.getElementById(idArray[8] + y + '_' + x).offsetTop * -1) + (screen_size * (33 + Main_addFocusVideoOffset)));
        }

    } else Main_handleKeyUp();
}

function Main_addFocusGame(y, x, idArray, ColoumnsCount, itemsCount) {
    Main_AddClass(idArray[0] + y + '_' + x, Main_classThumb);
    Main_CounterDialog(x, y, ColoumnsCount, itemsCount);
    if (Main_YchangeAddFocus(y)) {
        var screen_size = screen.height / 100;
        if (y) {
            Main_ScrollTable((idArray[10] ? idArray[10] : idArray[7]),
                (document.getElementById(idArray[5] + y + '_' + x).offsetTop * -1) + (screen_size * 51));
        } else {
            Main_ScrollTable((idArray[10] ? idArray[10] : idArray[7]), (screen_size * 3.0625));
        }


    } else Main_handleKeyUp();
}


function Main_OpenLiveStream(id, idsArray, handleKeyDownFunction) {
    Main_values.Play_selectedChannel = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));
    Main_values.Play_selectedChannel_id = Main_values.Play_selectedChannel[1];
    Main_values.Play_selectedChannel = Main_values.Play_selectedChannel[0];
    if (Main_values.Main_Go === Main_UserHost) {
        Main_values.Play_DisplaynameHost = document.getElementById(idsArray[3] + id).textContent;
        Main_values.Play_selectedChannelDisplayname = Main_values.Play_DisplaynameHost.split(STR_USER_HOSTING)[1];
        Main_values.Play_isHost = true;
    } else Main_values.Play_selectedChannelDisplayname = document.getElementById(idsArray[3] + id).textContent;
    Main_values.Play_gameSelected = document.getElementById(idsArray[5] + id).textContent.split(STR_PLAYING)[1];
    document.body.removeEventListener("keydown", handleKeyDownFunction);
    if (Main_values.Main_Go === Main_aGame) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
    Main_openStream();
}

function Main_openStream() {
    document.body.addEventListener("keydown", Play_handleKeyDown, false);
    Main_HideElement('scene1');
    Main_ShowElement('scene2');
    Play_hidePanel();
    Play_hideChat();
    Play_HideEndDialog();
    Play_Start();
}

function Main_OpenClip(id, idsArray, handleKeyDownFunction) {
    ChannelClip_playUrl = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));

    PlayClip_DurationSeconds = parseInt(ChannelClip_playUrl[1]);
    Main_values.Play_gameSelected = ChannelClip_playUrl[2];
    Main_values.Main_selectedChannel = ChannelClip_playUrl[3];
    Main_values.Main_selectedChannelDisplayname = ChannelClip_playUrl[4];
    Main_values.Main_selectedChannelLogo = ChannelClip_playUrl[5];
    Main_values.Main_selectedChannel_id = ChannelClip_playUrl[6];
    Main_values.ChannelVod_vodId = ChannelClip_playUrl[7];
    ChannelVod_vodOffset = parseInt(ChannelClip_playUrl[8]);
    ChannelClip_title = ChannelClip_playUrl[9];
    ChannelClip_language = ChannelClip_playUrl[10];
    ChannelClip_game = ChannelClip_playUrl[11];

    ChannelClip_playUrl = ChannelClip_playUrl[0];

    ChannelClip_createdAt = document.getElementById(idsArray[4] + id).textContent;
    ChannelClip_views = document.getElementById(idsArray[6] + id).textContent;

    document.body.removeEventListener("keydown", handleKeyDownFunction);
    document.body.addEventListener("keydown", PlayClip_handleKeyDown, false);
    Main_HideElement('scene1');
    Main_ShowElement('scene2');
    Play_hideChat();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_CleanHideExit();

    PlayClip_Start();
}

function Main_OpenVod(id, idsArray, handleKeyDownFunction) {
    Main_values.ChannelVod_vodId = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));
    ChannelVod_DurationSeconds = parseInt(Main_values.ChannelVod_vodId[1]);
    ChannelVod_language = Main_values.ChannelVod_vodId[2];
    Main_values.Play_gameSelected = Main_values.ChannelVod_vodId[3];
    Main_values.Main_selectedChannel = Main_values.ChannelVod_vodId[4];
    Play_IncrementView = Main_values.ChannelVod_vodId[5];
    Main_values.ChannelVod_vodId = Main_values.ChannelVod_vodId[0].substr(1);

    if (Main_values.Main_Go === Main_ChannelVod) {
        ChannelVod_title = document.getElementById(idsArray[3] + id).innerHTML;
    } else {
        ChannelVod_title = '';
        Main_values.Main_selectedChannelDisplayname = document.getElementById(idsArray[3] + id).textContent;
    }

    ChannelVod_createdAt = document.getElementById(idsArray[4] + id).textContent;
    ChannelVod_Duration = document.getElementById(idsArray[5] + id).textContent;
    ChannelVod_views = document.getElementById(idsArray[11] + id).innerHTML +
        ', ' + document.getElementById(idsArray[6] + id).textContent;
    document.body.removeEventListener("keydown", handleKeyDownFunction);

    Main_openVod();
}

function Main_openVod() {
    document.body.addEventListener("keydown", PlayVod_handleKeyDown, false);
    Main_HideElement('scene1');
    Main_ShowElement('scene2');
    PlayVod_hidePanel();
    Play_hideChat();
    Play_clearPause();
    Play_CleanHideExit();
    PlayVod_HasVodInfo = false;
    PlayVod_Start();
}

function Main_ScrollTable(id, position) {
    document.getElementById(id).style.top = position + "px";
    window.setTimeout(Main_handleKeyUp, 10);
}

function Main_removeFocus(id, idArray) {
    Main_addFocusFinish = false;
    Main_RemoveClass(idArray[0] + id, Main_classThumb);
}

function Main_Checktylesheet() {

    var stylesheet = document.styleSheets;
    for (var i = 0; i < stylesheet.length; i++) {
        if (stylesheet[i].href !== null) {
            try {
                if (!stylesheet[i].cssRules.length) Main_LoadStylesheet(stylesheet[i].href);
            } catch (e) {
                console.log('Main_Checktylesheet ' + e);
            }
        }
    }
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
    var date = new Date().getTime() + Main_ClockOffset,
        dayMonth;

    date = new Date(date);

    if (Main_IsDayFirst) dayMonth = STR_DAYS[date.getDay()] + ' ' + date.getDate() + '/' + STR_MONTHS[date.getMonth()];
    else dayMonth = STR_DAYS[date.getDay()] + ' ' + STR_MONTHS[date.getMonth()] + '/' + date.getDate();

    return dayMonth + ' ' + Play_lessthanten(date.getHours()) + ':' + Play_lessthanten(date.getMinutes());
}

function Main_updateclock() {
    Main_textContent('label_clock', Main_getclock());
    Main_randomimg = '?' + Math.random();
}

function Main_SidePannelAddFocus() {
    Main_AddClass('side_panel_' + Main_SidePannelPos, 'side_panel_text_focus');
}

function Main_SidePannelRemoveFocus() {
    Main_RemoveClass('side_panel_' + Main_SidePannelPos, 'side_panel_text_focus');
}

function Main_SidePannelKeyEnter() {
    if (!Main_SidePannelPos) {
        if (Main_values.Main_Go !== Main_Search) {
            if (!Main_values.Search_isSearching &&
                (Main_values.Main_Go === Main_ChannelContent || Main_values.Main_Go === Main_ChannelClip || Main_values.Main_Go === Main_ChannelVod))
                ChannelContent_SetChannelValue();
            Main_values.Main_BeforeSearch = Main_values.Main_Go;
            Main_values.Main_Go = Main_Search;
            Main_ExitCurrent(Main_values.Main_BeforeSearch);
            Main_SwitchScreen();
        } else document.body.addEventListener("keydown", Main_SidePannelCallback, false);
    } else if (Main_SidePannelPos === 1) Main_showSettings();
    else if (Main_SidePannelPos === 2) {
        document.body.addEventListener("keydown", Main_SidePannelCallback, false);
        Main_showAboutDialog();
    } else if (Main_SidePannelPos === 3) {
        document.body.addEventListener("keydown", Main_SidePannelCallback, false);
        Main_showControlsDialog();
    } else if (Main_SidePannelPos === 4) Main_SidePannelGo(Main_Live);
    else if (Main_SidePannelPos === 5) Main_SidePannelGo(AddUser_IsUserSet() ? Main_Users : Main_addUser);
    else if (Main_SidePannelPos === 6) Main_SidePannelGo(Main_Featured);
    else if (Main_SidePannelPos === 7) Main_SidePannelGo(Main_games);
    else if (Main_SidePannelPos === 8) Main_SidePannelGo(Main_Vod);
    else if (Main_SidePannelPos === 9) Main_SidePannelGo(Main_Clip);
    Main_SidePannelHide();
}

function Main_SidePannelGo(GoTo) {
    if (GoTo === Main_values.Main_Go) document.body.addEventListener("keydown", Main_SidePannelCallback, false);
    else {
        Main_values.Main_Before = Main_values.Main_Go;
        Main_values.Main_Go = GoTo;
        Main_ExitCurrent(Main_values.Main_Before);
        Main_SwitchScreen();
    }
}

function Main_SidePannelStart(callback) {
    Main_SidePannelCallback = callback;
    document.body.removeEventListener("keydown", Main_SidePannelCallback);
    document.body.addEventListener("keydown", Main_SidePannelhandleKeyDown, false);
    Main_RemoveClass('side_panel', 'side_panel_hide');
}

function Main_SidePannelHide() {
    document.body.removeEventListener("keydown", Main_SidePannelhandleKeyDown);
    Main_AddClass('side_panel', 'side_panel_hide');
    Main_SidePannelRemoveFocus();
    Main_SidePannelPos = 0;
    Main_SidePannelAddFocus();
}

function Main_SidePannelhandleKeyDown(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
        case KEY_LEFT:
            document.body.addEventListener("keydown", Main_SidePannelCallback, false);
            Main_SidePannelHide();
            Main_CenterLablesChange();
            break;
        case KEY_UP:
            if (Main_SidePannelPos) {
                Main_SidePannelRemoveFocus();
                Main_SidePannelPos--;
                Main_SidePannelAddFocus();
            }
            break;
        case KEY_DOWN:
            if (Main_SidePannelPos < 9) {
                Main_SidePannelRemoveFocus();
                Main_SidePannelPos++;
                Main_SidePannelAddFocus();
            }
            break;
        case KEY_ENTER:
            Main_SidePannelKeyEnter();
            break;
        default:
            break;
    }
}

var Main_CenterLablesVector = ['top_bar_live', 'top_bar_user', 'top_bar_featured', 'top_bar_game', 'top_bar_vod', 'top_bar_clip'];
var Main_CenterScreenVector = [Main_Live, Main_Users, Main_Featured, Main_games, Main_Vod, Main_Clip];
var Main_FirstLoad = false;

function Main_CenterLables(event) {
    if (Main_FirstLoad || inUseObj.FirstLoad || Main_CantClick()) return;
    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) {
                Main_CenterLablesChange();
                Main_HideControlsDialog();
            } else if (Main_isAboutDialogShown()) {
                Main_CenterLablesChange();
                Main_HideAboutDialog();
            } else {
                if (Main_values.Main_Go === Main_aGame) {
                    Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
                    if (Main_values.Games_return) {
                        Main_values.Main_Go = Main_SearchGames;
                        Main_values.Main_gameSelected = Main_values.gameSelectedOld;
                    } else {
                        Main_values.Main_Go = Main_values.Main_BeforeAgame;
                        Main_values.Main_BeforeAgame = Main_Live;
                    }
                    AGame_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreen();
                } else if (Main_values.Main_Go === Main_AGameClip) {
                    Screens_BasicExit(Main_aGame);
                    Main_CenterLablesClean();
                    Main_SwitchScreen();
                } else if (Main_values.Main_Go === Main_usergames) {
                    Screens_BasicExit(Main_Users);
                    Main_CenterLablesClean();
                    Main_SwitchScreen();
                } else if (Main_values.Main_Go === Main_ChannelClip) {
                    Screens_BasicExit(Main_ChannelContent);
                    Main_CenterLablesClean();
                    Main_SwitchScreen();
                } else if (Main_values.Main_Go === Main_AGameVod) {
                    Main_values.Main_Go = Main_aGame;
                    AGameVod_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreen();
                } else if (Main_values.Main_Go === Main_UserLive) {
                    Main_values.Main_Go = Main_Users;
                    UserLive_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreen();
                } else if (Main_values.Main_Go === Main_UserHost) {
                    Main_values.Main_Go = Main_Users;
                    UserHost_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreen();
                } else if (Main_values.Main_Go === Main_UserVod) {
                    Main_values.Main_Go = Main_Users;
                    UserVod_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreen();
                } else if (Main_values.Main_Go === Main_UserChannels) {
                    Main_values.Main_Go = Main_Users;
                    UserChannels_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreen();
                } else if (Main_values.Main_Go === Main_ChannelContent) {
                    Main_values.Main_Go = Main_values.Main_BeforeChannel;
                    Main_values.Main_BeforeChannel = Main_Live;
                    ChannelContent_exit();
                    Main_values.Main_selectedChannel_id = '';
                    Main_CenterLablesClean();
                    Main_SwitchScreen();
                } else if (Main_values.Main_Go === Main_ChannelVod) {
                    Main_values.Main_Go = Main_ChannelContent;
                    ChannelVod_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreen();
                } else if (Main_values.Main_Go === Main_SearchLive) {
                    if (Main_values.Main_Go === Main_values.Main_BeforeSearch) Main_values.Main_Go = Main_Live;
                    else Main_values.Main_Go = Main_values.Main_BeforeSearch;
                    SearchLive_exit();
                    Main_values.Search_isSearching = false;
                    Main_CenterLablesClean();
                    Main_SwitchScreen();
                } else if (Main_values.Main_Go === Main_SearchGames) {
                    if (Main_values.Main_Go === Main_values.Main_BeforeSearch) Main_values.Main_Go = Main_Live;
                    else Main_values.Main_Go = Main_values.Main_BeforeSearch;
                    Main_values.Search_isSearching = false;
                    SearchGames_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreen();
                } else if (Main_values.Main_Go === Main_SearchChannels) {

                    if (Main_values.Main_Go === Main_values.Main_BeforeSearch) Main_values.Main_Go = Main_Live;
                    else Main_values.Main_Go = Main_values.Main_BeforeSearch;
                    if (Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
                    SearchChannels_exit();
                    Main_values.Search_isSearching = false;
                    Main_CenterLablesClean();
                    Main_SwitchScreen();
                } else {
                    Main_CenterLablesClean();
                    Main_SidePannelStart(Main_CenterLables);
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_values.Search_isSearching || Main_values.Main_Go === Main_ChannelContent ||
                Main_values.Main_Go === Main_ChannelVod || Main_values.Main_Go === Main_ChannelClip ||
                Main_values.Main_Go === Main_SearchLive || Main_values.Main_Go === Main_SearchGames ||
                Main_values.Main_Go === Main_SearchChannels) break;
            Main_RemoveClass(Main_CenterLablesVector[Main_values.Main_CenterLablesVectorPos], 'icon_center_line');
            Main_values.Main_CenterLablesVectorPos++;
            if (Main_values.Main_CenterLablesVectorPos > 5) Main_values.Main_CenterLablesVectorPos = 0;
            Main_CenterLablesChange();
            Main_CenterLablesExit();
            break;
        case KEY_LEFT:
            if (Main_values.Search_isSearching || Main_values.Main_Go === Main_ChannelContent ||
                Main_values.Main_Go === Main_ChannelVod || Main_values.Main_Go === Main_ChannelClip ||
                Main_values.Main_Go === Main_SearchLive || Main_values.Main_Go === Main_SearchGames ||
                Main_values.Main_Go === Main_SearchChannels) break;
            Main_RemoveClass(Main_CenterLablesVector[Main_values.Main_CenterLablesVectorPos], 'icon_center_line');
            Main_values.Main_CenterLablesVectorPos--;
            if (Main_values.Main_CenterLablesVectorPos < 0) Main_values.Main_CenterLablesVectorPos = 5;
            Main_CenterLablesChange();
            Main_CenterLablesExit();
            break;
        case KEY_DOWN:
            Main_RemoveClass(Main_CenterLablesVector[Main_values.Main_CenterLablesVectorPos], 'icon_center_line');
            document.body.removeEventListener("keydown", Main_CenterLables);
            Main_CenterLablesInUse = false;
            Main_SwitchScreen();
            break;
        case KEY_ENTER:
            Main_ReloadScreen();
            break;
        default:
            break;
    }
}

function Main_CenterLablesStart(callback) {
    window.clearTimeout(Main_SetTopOpacityId);
    Main_UnSetTopOpacity();
    document.body.removeEventListener("keydown", callback);
    document.body.removeEventListener("keydown", Main_CenterLables);
    document.body.addEventListener("keydown", Main_CenterLables, false);
    Main_CenterLablesChange();
}

function Main_CenterLablesClean() {
    Main_RemoveClass(Main_CenterLablesVector[Main_values.Main_CenterLablesVectorPos], 'icon_center_line');
    document.body.removeEventListener("keydown", Main_CenterLables);
    Main_CenterLablesInUse = false;
}

function Main_CenterLablesChange() {
    Main_CenterLablesInUse = true;
    Main_AddClass(Main_CenterLablesVector[Main_values.Main_CenterLablesVectorPos], 'icon_center_line');
}

function Main_CenterLablesExit() {
    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_CenterScreenVector[Main_values.Main_CenterLablesVectorPos];
    if (Main_values.Main_Go === Main_Users && !AddUser_IsUserSet()) {
        Main_values.Main_Go = Main_addUser;
        Main_CenterLablesClean();
        Main_SwitchScreen();
    } else {
        Main_SwitchScreen();
        Main_RemoveKeys();
    }
}

function Main_RemoveKeys() {
    if (Main_values.Main_Go === Main_Live) document.body.removeEventListener("keydown", Live_handleKeyDown);
    else if (Main_values.Main_Go === Main_Users) document.body.removeEventListener("keydown", Users_handleKeyDown);
    else if (Main_values.Main_Go === Main_aGame) document.body.removeEventListener("keydown", AGame_handleKeyDown);
    else if (Main_values.Main_Go === Main_Featured) document.body.removeEventListener("keydown", Featured_handleKeyDown);
    else if (Main_values.Main_Go === Main_SearchLive) document.body.removeEventListener("keydown", SearchLive_handleKeyDown);
    else if (Main_values.Main_Go === Main_SearchGames) document.body.removeEventListener("keydown", SearchGames_handleKeyDown);
    else if (Main_values.Main_Go === Main_SearchChannels) document.body.removeEventListener("keydown", SearchChannels_handleKeyDown);
    else if (Main_values.Main_Go === Main_ChannelVod) document.body.removeEventListener("keydown", ChannelVod_handleKeyDown);
    else if (Main_values.Main_Go === Main_ChannelContent) document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
    else if (Main_values.Main_Go === Main_UserHost) document.body.removeEventListener("keydown", UserHost_handleKeyDown);
    else if (Main_values.Main_Go === Main_UserVod) document.body.removeEventListener("keydown", UserVod_handleKeyDown);
    else if (Main_values.Main_Go === Main_UserChannels) document.body.removeEventListener("keydown", UserChannels_handleKeyDown);
    else if (Main_values.Main_Go === Main_games) {
        inUseObj = Game;
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    } else if (Main_values.Main_Go === Main_ChannelClip) {
        inUseObj = ChannelClip;
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    } else if (Main_values.Main_Go === Main_Vod) document.body.removeEventListener("keydown", Vod_handleKeyDown);
    else if (Main_values.Main_Go === Main_Clip) {
        inUseObj = Clip;
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    } else if (Main_values.Main_Go === Main_AGameClip) {
        inUseObj = AGameClip;
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    } else if (Main_values.Main_Go === Main_usergames) {
        inUseObj = UserGames;
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    } else if (Main_values.Main_Go === Main_AGameVod) document.body.removeEventListener("keydown", AGameVod_handleKeyDown);
    else if (Main_values.Main_Go === Main_UserLive) document.body.removeEventListener("keydown", UserLive_handleKeyDown);
}

function Main_ReloadScreen() {
    window.clearTimeout(Main_SetTopOpacityId);
    Main_UnSetTopOpacity();

    if (Main_values.Main_Go !== Main_ChannelContent) Main_values.Main_BeforeChannelisSet = false;
    if (Main_values.Main_Go !== Main_aGame) Main_values.Main_BeforeAgameisSet = false;

    Main_CounterDialogRst();
    if (Main_values.Main_Go === Main_Live) Live_StartLoad();
    else if (Main_values.Main_Go === Main_Users) Users_StartLoad();
    else if (Main_values.Main_Go === Main_Featured) Featured_StartLoad();
    else if (Main_values.Main_Go === Main_aGame) AGame_StartLoad();
    else if (Main_values.Main_Go === Main_UserChannels) UserChannels_StartLoad();
    else if (Main_values.Main_Go === Main_ChannelContent) ChannelContent_StartLoad();
    else if (Main_values.Main_Go === Main_ChannelVod) ChannelVod_StartLoad();
    else if (Main_values.Main_Go === Main_SearchLive) SearchLive_StartLoad();
    else if (Main_values.Main_Go === Main_SearchGames) SearchGames_StartLoad();
    else if (Main_values.Main_Go === Main_SearchChannels) SearchChannels_StartLoad();
    else if (Main_values.Main_Go === Main_games) {
        inUseObj = Game;
        Screens_StartLoad();
    } else if (Main_values.Main_Go === Main_usergames) {
        inUseObj = UserGames;
        if (!inUseObj.loadingData) inUseObj.key_refresh();
    } else if (Main_values.Main_Go === Main_Vod) Vod_StartLoad();
    else if (Main_values.Main_Go === Main_Clip) {
        inUseObj = Clip;
        Screens_StartLoad();
    } else if (Main_values.Main_Go === Main_AGameClip) {
        inUseObj = AGameClip;
        Screens_StartLoad();
    } else if (Main_values.Main_Go === Main_ChannelClip) {
        inUseObj = ChannelClip;
        Screens_StartLoad();
    } else if (Main_values.Main_Go === Main_AGameVod) AGameVod_StartLoad();
    else if (Main_values.Main_Go === Main_UserLive) UserLive_StartLoad();
    else if (Main_values.Main_Go === Main_UserHost) UserHost_StartLoad();
    else if (Main_values.Main_Go === Main_UserVod) UserVod_StartLoad();
    else Live_StartLoad();

    Main_SetTopOpacityId = window.setTimeout(Main_SetTopOpacity, 3000);
}

function Main_setItem(item, value) {
    localStorage.setItem(item, value);
}

function Main_getItemInt(item, default_value) {
    return parseInt(localStorage.getItem(item)) || default_value;
}

function Main_getItemJson(item, default_value) {
    return JSON.parse(localStorage.getItem(item)) || default_value;
}

function Main_getItemBool(item, default_value) {
    var default_string = default_value.toString();
    return (localStorage.getItem(item) || default_string) === default_string ? default_value : !default_value;
}

// use http://www.fileformat.info/info/unicode/char/16EB/index.html
// Replace "16EB" with is the char ᛫ by the result of "string.charCodeAt(i).toString(16).toUpperCase()"
// To see supported fonts and etc info about the unknown char
function Main_PrintUnicode(string) {
    console.log(string);
    for (var i = 0; i < string.length; i++)
        console.log('Character is: ' + string.charAt(i) + " it's Unicode is: \\u" + string.charCodeAt(i).toString(16).toUpperCase());
}

function processCode(pageUrl) {
    console.log("processCode");
    var code = '';
    code = pageUrl.match(/code=(\w+)/);
    if (code) {
        code = code[1];
        console.log('if code ' + code);
        Main_newUsercode = code;
    } else {
        console.log('else code ' + code);
        Main_newUsercode = 0;
    }
}

//Basic XMLHttpRequest thatonly returns error or 200 status
function BasehttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError) {
    var xmlHttp;
    if (Main_Android) {

        xmlHttp = Android.mreadUrl(theUrl, Timeout, HeaderQuatity, access_token);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            calbackError();
            return;
        }

        if (xmlHttp.status === 200) {
            callbackSucess(xmlHttp.responseText);
        } else {
            calbackError();
        }


    } else {
        xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = Timeout;

        if (HeaderQuatity > 0) xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        //Header TWITHCV5 to load all screens and some stream info
        if (HeaderQuatity > 1) xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        //Header to access User VOD screen
        if (HeaderQuatity > 2) xmlHttp.setRequestHeader(Main_Authorization, access_token);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    callbackSucess(xmlHttp.responseText);
                    return;
                } else {
                    calbackError();
                }
            }
        };

        xmlHttp.send(null);
    }
}