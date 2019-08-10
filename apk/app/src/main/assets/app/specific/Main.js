//Variable initialization
var Main_isReleased = false;
var Main_isDebug = false;

var Main_cursorYAddFocus = -1;

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
var Main_Vod = 17;
var Main_Clip = 18;
var Main_AGameVod = 19;
var Main_AGameClip = 20;
var Main_Featured = 21;
var Main_UserVod = 22;

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
    "Play_WasPlaying": 0,
    "ChannelVod_vodId": '',
    "vodOffset": 0,
    "Search_data": '',
    "gameSelectedOld": null,
    "Games_return": false,
    "Search_isSearching": false,
    "Play_ChatForceDisable": false,
    "Never_run": true,
    "Main_CenterLablesVectorPos": 0,
    "Chat_font_size": 3,
    "ChatBackground": 10,
    "IsRerun": false,
    "Main_selectedChannelPartner": false,
};

var Main_LastClickFinish = true;
var Main_addFocusFinish = true;
var Main_CenterLablesInUse = false;
var Main_newUsercode = 0;
var Main_ExitCursor = 0;
var Main_ExitDialogID = null;
var Main_ScrollbarIsHide = true;
var Main_td = '';
var Main_IsDayFirst = false;
var Main_ScrollbarElement;
var Main_SearchInput;
var Main_AddUserInput;
var Main_SetTopOpacityId;
var Main_updateclockId;
var Main_ContentLang = "";
var Main_OpacityDivs = ["label_side_panel", "label_refresh", "top_bar_live", "top_bar_user", "top_bar_featured", "top_bar_game", "top_bar_vod", "top_bar_clip"];
var Main_Periods = [];
var Main_addFocusVideoOffset = 0;
var Main_FirstRun = true;

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

var Main_clientId = "5seja5ptej058mxqy7gh5tcudjqtm9";
var Main_clientIdHeader = 'Client-ID';
var Main_AcceptHeader = 'Accept';
var Main_Authorization = 'Authorization';
var Main_OAuth = 'OAuth ';
var Main_TwithcV5Json = 'application/vnd.twitchtv.v5+json';

var Main_classThumb = 'stream_thumbnail_focused';
var Main_DataAttribute = 'data_attribute';

var Main_stringVersion = '1.0';
var Main_stringVersion_Min = '.45';
var Main_minversion = '080619';
var Main_versionTag = Main_stringVersion + Main_stringVersion_Min + '-' + Main_minversion;
var Main_IsNotBrowserVersion = '';
var Main_ClockOffset = 0;
var Main_IsNotBrowser = 0;
var Main_randomimg = '?' + Math.random();
var proxyurl = "https://cors-anywhere.herokuapp.com/";
var Main_updateUserFeedId;
var Main_vp9supported = false;
var lazyLoadInstance;
//Variable initialization end

// this function will be called only once the first time the app startup
Main_Start();

function Main_Start() {
    Main_isDebug = Main_getItemBool('Main_isDebug', false);
    if (Main_isDebug && Main_isReleased) Main_Debug();
    else if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function() {
            Main_loadTranslations(window.navigator.userLanguage || window.navigator.language);
        });
    } else { // `DOMContentLoaded` already fired
        Main_loadTranslations(window.navigator.userLanguage || window.navigator.language);
    }
}

function Main_Debug() { // jshint ignore:line
    console.log("Debug mod start");
    var script = document.createElement('script');
    script.src = "https://fgl27.github.io/SmartTwitchTV/release/githubio/js/masterdebug.js";
    document.head.appendChild(script);
}

function Main_loadTranslations(language) {
    Main_Checktylesheet();

    Main_ready(function() {
        try {
            Main_IsNotBrowser = Android.getAndroid();
            Main_IsNotBrowserVersion = Android.getversion();
        } catch (e) {
            Main_IsNotBrowserVersion = '1.0.0';
            Main_IsNotBrowser = 0;
            document.body.style.backgroundColor = "rgba(0, 0, 0, 1)";
            Main_isDebug = true;
            console.log('Main_isReleased: ' + Main_isReleased);
            console.log('Main_isDebug: ' + Main_isDebug);
            console.log('Main_isBrowser: ' + !Main_IsNotBrowser);
        }
        Main_showLoadDialog();

        if (Main_IsNotBrowser) Main_vp9supported = Android.misCodecSupported();

        Settings_SetDefautls();
        en_USLang();
        Languages_SetDefautls();

        // Language is set as (LANGUAGE)_(REGION) in (ISO 639-1)_(ISO 3166-1 alpha-2) eg.; pt_BR Brazil, en_US USA
        // https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
        // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

        //var lang = language,
        //    Savedlang = Main_getItemInt('user_language', 0);

        //if (Savedlang) lang = Settings_Obj_set_values("general_lang");
        //else Settings_CheckLang(lang);

        //if (lang.indexOf('pt_') !== -1) pt_BRLang();
        //else if (lang.indexOf('it_') !== -1) it_ITLang();

        console.log("language is " + language);
        DefaultLang();

        if (window.location.href.indexOf('code') !== -1) processCode(window.location.href);

        Main_initWindows();
    });

}

function Main_initWindows() {
    lazyLoadInstance = new LazyLoad();

    Screens_InitScreens();
    Main_SetStringsMain(true);

    Main_ScrollbarElement = document.getElementById("scrollbar");
    Main_RestoreValues();
    Main_GoBefore = Main_values.Main_Go;

    Main_ready(function() {

        Chat_Preinit();
        Play_PreStart();
        AddUser_RestoreUsers();

        if (AddUser_UserIsSet()) {
            Main_updateUserFeedId = window.setInterval(Main_updateUserFeed, 600000);
        }
        document.body.addEventListener("keyup", Main_handleKeyUp, false);
        Screens_InitSecondaryScreens();

        document.getElementById("side_panel").style.marginLeft = '';

        Main_checkVersion();

        Main_SetStringsSecondary();

        Play_MakeControls();
        Play_SetControls();
        Play_SetFullScreen(Play_isFullScreen);

        PlayVod_RestoreVodIds();

        Main_SearchInput = document.getElementById("search_input");
        Main_AddUserInput = document.getElementById("user_input");

        document.addEventListener('visibilitychange', Main_Resume, false);
        Main_updateclockId = window.setInterval(Main_updateclock, 60000);

        inUseObj = Live;
        //Minor delay to let all properly load before starting to show the app
        window.setTimeout(function() {
            Main_ready(function() {
                Screens_init();
                Main_SetTopOpacityId = window.setTimeout(Main_SetTopOpacity, 5000);
                Sidepannel_UpdateThumbDoc = document.getElementById("feed_thumb_img");
            });
        }, (Main_IsNotBrowser && Settings_value.restor_playback.defaultValue && !Main_values.Play_WasPlaying) ? 1000 : 0);
    });
}

function Main_SetStringsMain(isStarting) {
    Main_updateclock();

    //set top bar labels
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);
    Main_innerHTML('label_update', '<div class="strokedeline" style="vertical-align: middle; display: inline-block;"><i class="icon-arrow-up" style="color: #FF0000; font-size: 115%; "></i></div><div class="strokedeline" style="vertical-align: middle; display: inline-block; color: #FF0000">' + STR_SPACE + STR_UPDATE_AVAILABLE + '</div>');

    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);

    Main_innerHTML('icon_feed_refresh', '<div class="strokedelinebig" style="vertical-align: middle; display: inline-block;"><i class="icon-refresh" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_REFRESH + ':' + STR_UP + STR_SPACE + STR_SPACE + '</div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block;"><i class="icon-pp" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_PICTURE_LIVE_FEED + '</div>');


    Main_textContent('top_bar_live', STR_LIVE);
    Main_textContent('top_bar_user', isStarting ? STR_USER : STR_SETTINGS);
    Main_textContent('top_bar_featured', STR_FEATURED);
    Main_textContent('top_bar_game', STR_GAMES);
    Main_textContent('top_bar_vod', STR_VIDEOS);
    Main_textContent('top_bar_clip', STR_CLIPS);

    Main_textContent("dialog_end_next_text", STR_PLAY_NEXT);
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

    Main_textContent('side_panel_search', STR_SEARCH);
    Main_textContent('side_panel_settings', STR_SETTINGS);
    Main_textContent('side_panel_about', STR_ABOUT);
    Main_textContent('side_panel_controls', STR_CONTROLS);
    Main_textContent('side_panel_exit', STR_EXIT);

    Main_textContent('side_panel_feed_settings', STR_SIDE_PANEL_SETTINGS);
    Main_textContent('side_panel_feed_refresh', STR_REFRESH);

    Main_textContent('side_panel_live', STR_LIVE);
    Main_textContent('side_panel_user', STR_USER);
    Main_textContent('side_panel_featured', STR_FEATURED);
    Main_textContent('side_panel_games', STR_GAMES);
    Main_textContent('side_panel_videos', STR_VIDEOS);
    Main_textContent('side_panel_clips', STR_CLIPS);
    Main_textContent('side_panel_hide', STR_HIDE);
    Main_textContent('side_panel_back', STR_LIVE_FEED);

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
    Main_innerHTML(lable, '<div class="strokedeline" style="vertical-align: middle; display: inline-block;"><i class="' + icon + '" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedeline" style="vertical-align: middle; display: inline-block">' + STR_SPACE + string + '</div>');
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

function Main_replaceClassEmoji(div) {
    var emojiel = document.getElementById(div).getElementsByClassName("emoji");
    if (emojiel) {
        var i = 0;
        for (i; i < emojiel.length; i++)
            emojiel[i].classList.add('emoticon');

        emojiel = document.getElementById(div).getElementsByClassName("emoticon");
        for (i = 0; i < emojiel.length; i++)
            emojiel[i].classList.remove('emoji');
    }
}

function Main_showLoadDialog() {
    Main_YRst(-1);
    if (Main_IsNotBrowser) Android.mshowLoading(true);
    else Main_ShowElement('dialog_loading');
}

function Main_HideLoadDialog() {
    if (Main_IsNotBrowser) Android.mshowLoading(false);
    else Main_HideElement('dialog_loading');
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
    document.body.addEventListener("keydown", Main_ExitDialog, false);
}

function Main_HideExitDialog() {
    document.body.removeEventListener("keydown", Main_ExitDialog, false);
    if (Sidepannel_Isscreen) {
        Sidepannel_Isscreen = false;
        Main_SwitchScreenAction();
    } else Main_CenterLablesStart(Sidepannel_Callback);
    Main_clearExitDialog();
    Main_HideElement('main_dialog_exit');
    Main_ExitCursor = 0;
    Main_ExitCursorSet();
}

function Main_ExitCursorSet() {
    Main_RemoveClass('exit_app_cancel', 'button_search_focused');
    Main_RemoveClass('exit_app_minimize', 'button_search_focused');
    Main_RemoveClass('exit_app_close', 'button_search_focused');
    if (!Main_ExitCursor) Main_AddClass('exit_app_cancel', 'button_search_focused');
    else if (Main_ExitCursor === 1) Main_AddClass('exit_app_minimize', 'button_search_focused');
    else Main_AddClass('exit_app_close', 'button_search_focused');
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

function Main_showWarningDialog(text) {
    Main_textContent('dialog_warning_text', text);
    Main_ShowElement('dialog_warning');
}

function Main_HideWarningDialog() {
    Main_HideElement('dialog_warning');
}

function Main_showAboutDialog() {
    Main_HideControlsDialog();
    Main_ShowElement('dialog_about');
}

function Main_HideAboutDialog() {
    Main_HideElement('dialog_about');
}

function Main_isAboutDialogShown() {
    return Main_isElementShowing('dialog_about');
}

function Main_showSettings() {
    Main_HideControlsDialog();
    Main_HideWarningDialog();
    Main_ExitCurrent(Main_values.Main_Go);
    Main_CounterDialogRst();
    Settings_init();
}

function Main_showControlsDialog() {
    Main_HideAboutDialog();
    Main_ShowElement('dialog_controls');
}

function Main_HideControlsDialog() {
    Main_HideElement('dialog_controls');
}

function Main_isControlsDialogShown() {
    return Main_isElementShowing('dialog_controls');
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

function Main_is_rerun(content) {
    return ((content + '').indexOf('live') === -1);
}

function Main_ThumbNull(y, x, thumbnail) {
    return document.getElementById(thumbnail + y + '_' + x) !== null;
}

function Main_ReStartScreens() {
    Main_updateclock();
    Main_SwitchScreen();
    document.body.addEventListener("keyup", Main_handleKeyUp, false);
}

function Main_SetTopOpacity() {
    var elem, i = 0;
    for (i; i < Main_OpacityDivs.length; i++) {
        if (i < 2) document.getElementById(Main_OpacityDivs[i]).style.opacity = '0.5';
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

function Main_SwitchScreen(removekey) {
    window.clearTimeout(Main_SetTopOpacityId);
    Main_UnSetTopOpacity();

    Main_ready(function() {
        Main_SwitchScreenAction(removekey);
    });
}

var Main_Switchobj = {
    // way not?... 'computed property names' is only available in ES6 (use 'esversion: 6').
    //    [Main_Users]: Users_init
};

Main_Switchobj[Main_Users] = Users_init;
Main_Switchobj[Main_ChannelContent] = ChannelContent_init;

Main_Switchobj[Main_SearchChannels] = function() {
    inUseObj = SearchChannels;
    Screens_init();
};

Main_Switchobj[Main_SearchLive] = function() {
    inUseObj = SearchLive;
    Screens_init();
};

Main_Switchobj[Main_SearchGames] = function() {
    inUseObj = SearchGames;
    Screens_init();
};

Main_Switchobj[Main_UserChannels] = function() {
    inUseObj = UserChannels;
    Screens_init();
};

Main_Switchobj[Main_UserLive] = function() {
    inUseObj = UserLive;
    Screens_init();
};

Main_Switchobj[Main_UserHost] = function() {
    inUseObj = UserHost;
    Screens_init();
};

Main_Switchobj[Main_usergames] = function() {
    inUseObj = UserGames;
    Screens_init();
};

Main_Switchobj[Main_ChannelVod] = function() {
    inUseObj = ChannelVod;
    Screens_init();
};
Main_Switchobj[Main_UserVod] = function() {
    inUseObj = UserVod;
    Screens_init();
};
Main_Switchobj[Main_Live] = function() {
    inUseObj = Live;
    Screens_init();
};
Main_Switchobj[Main_Featured] = function() {
    inUseObj = Featured;
    Screens_init();
};
Main_Switchobj[Main_AGameClip] = function() {
    inUseObj = AGameClip;
    Screens_init();
};
Main_Switchobj[Main_AGameVod] = function() {
    inUseObj = AGameVod;
    Screens_init();
};
Main_Switchobj[Main_Clip] = function() {
    inUseObj = Clip;
    Screens_init();
};
Main_Switchobj[Main_Vod] = function() {
    inUseObj = Vod;
    Screens_init();
};
Main_Switchobj[Main_ChannelClip] = function() {
    inUseObj = ChannelClip;
    Screens_init();
};
Main_Switchobj[Main_aGame] = function() {
    inUseObj = AGame;
    Screens_init();
};
Main_Switchobj[Main_games] = function() {
    inUseObj = Game;
    Screens_init();
};

function Main_SwitchScreenAction(removekey) {
    Main_HideWarningDialog();
    if (Main_values.Main_Go !== Main_ChannelContent) Main_values.Main_BeforeChannelisSet = false;
    if (Main_values.Main_Go !== Main_aGame) Main_values.Main_BeforeAgameisSet = false;

    Main_CounterDialogRst();

    if (Main_Switchobj[Main_values.Main_Go]) Main_Switchobj[Main_values.Main_Go]();
    else Main_Switchobj[1]();

    Main_SetTopOpacityId = window.setTimeout(Main_SetTopOpacity, 3000);
    if (removekey) Main_RemoveKeys();
}

function Main_OpenSearch() {
    if (!Main_values.Search_isSearching) Main_values.Main_BeforeSearch = Main_values.Main_Go;
    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_Search;
    Main_HideWarningDialog();
    Main_CounterDialogRst();
    window.clearTimeout(Main_SetTopOpacityId);
    Main_UnSetTopOpacity();
    Search_init();
}

function Main_SaveValues() {
    Main_setItem('Main_values', JSON.stringify(Main_values));
}

function Main_RestoreValues() {
    Main_values = Screens_assign(Main_values, Main_getItemJson('Main_values', {}));
}

var Main_ExitCurrentobj = {
    // way not?... 'computed property names' is only available in ES6 (use 'esversion: 6').
    //    [Main_Users]: Users_exit
};
Main_ExitCurrentobj[Main_Users] = Users_exit;
Main_ExitCurrentobj[Main_ChannelContent] = ChannelContent_exit;

Main_ExitCurrentobj[Main_SearchChannels] = Screens_exit;
Main_ExitCurrentobj[Main_SearchLive] = Screens_exit;
Main_ExitCurrentobj[Main_SearchGames] = Screens_exit;
Main_ExitCurrentobj[Main_UserChannels] = Screens_exit;
Main_ExitCurrentobj[Main_UserLive] = Screens_exit;
Main_ExitCurrentobj[Main_UserHost] = Screens_exit;
Main_ExitCurrentobj[Main_usergames] = Screens_exit;
Main_ExitCurrentobj[Main_ChannelVod] = Screens_exit;
Main_ExitCurrentobj[Main_UserVod] = Screens_exit;
Main_ExitCurrentobj[Main_Live] = Screens_exit;
Main_ExitCurrentobj[Main_Featured] = Screens_exit;
Main_ExitCurrentobj[Main_AGameClip] = Screens_exit;
Main_ExitCurrentobj[Main_AGameVod] = Screens_exit;
Main_ExitCurrentobj[Main_Clip] = Screens_exit;
Main_ExitCurrentobj[Main_Vod] = Screens_exit;
Main_ExitCurrentobj[Main_ChannelClip] = Screens_exit;
Main_ExitCurrentobj[Main_aGame] = Screens_exit;
Main_ExitCurrentobj[Main_games] = Screens_exit;

function Main_ExitCurrent(ExitCurrent) {
    if (Main_ExitCurrentobj[ExitCurrent]) Main_ExitCurrentobj[ExitCurrent]();
    if (Main_isElementShowing('settings_scroll')) Settings_exit();
}

function Main_RestoreTopLabel() {
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
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
    if (Main_IsDayFirst) return time.getDate() + ' ' + STR_MONTHS[time.getMonth()] + ' ' + time.getFullYear();
    else return STR_MONTHS[time.getMonth()] + ' ' + time.getDate() + ' ' + time.getFullYear();
}

function Main_checkVersion() {
    //TODO remove the try after android app update has be releaased for some time
    if (Main_IsNotBrowser) {
        Main_versionTag = "Android: " + Main_IsNotBrowserVersion + ' Web: ' + Main_minversion;
        if (Main_needUpdate(Main_IsNotBrowserVersion)) Main_ShowElement('label_update');
    }

    Main_innerHTML("dialog_about_text", STR_ABOUT_INFO_HEADER + STR_VERSION + Main_versionTag + STR_ABOUT_INFO_0);
}

function Main_needUpdate(version) {
    version = version.split(".");
    return (parseFloat(version[0] + '.' + version[1]) < parseFloat(Main_stringVersion)) ||
        (parseInt(version[2]) < parseInt(Main_stringVersion_Min.split(".")[1]));
}

function Main_empty(el) {
    el = document.getElementById(el);
    while (el.firstChild) el.removeChild(el.firstChild);
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

function Main_createEmptyCell(id) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', id);
    Main_td.className = 'stream_cell';

    return Main_td;
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

function Main_ThumbOpenIsNull(id, thumbnail) {
    return document.getElementById(thumbnail + id) === null;
}

function Main_OpenLiveStream(id, idsArray, handleKeyDownFunction) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    document.body.removeEventListener("keydown", handleKeyDownFunction);
    Main_values.Play_selectedChannel = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));

    Main_values.Play_selectedChannel_id = Main_values.Play_selectedChannel[1];
    Main_values.IsRerun = Main_values.Play_selectedChannel[2];
    Main_values.Play_selectedChannel = Main_values.Play_selectedChannel[0];

    Main_values.Play_isHost = (Main_values.Main_Go === Main_UserHost) && !Play_UserLiveFeedPressed;

    if (Main_values.Play_isHost) {
        Main_values.Play_DisplaynameHost = document.getElementById(idsArray[3] + id).textContent;
        Main_values.Play_selectedChannelDisplayname = Main_values.Play_DisplaynameHost.split(STR_USER_HOSTING)[1];
    } else Main_values.Play_selectedChannelDisplayname = document.getElementById(idsArray[3] + id).textContent;

    var playing = document.getElementById(idsArray[5] + id).textContent;
    Main_values.Play_gameSelected = playing.indexOf(STR_PLAYING) !== -1 ? playing.split(STR_PLAYING)[1] : "";

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
    if (AddUser_UserIsSet() && !UserLiveFeed_loadingData && UserLiveFeed_status) UserLiveFeed_FeedFindPos();
    Main_ready(Play_Start);
}

function Main_OpenClip(id, idsArray, handleKeyDownFunction) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    document.body.removeEventListener("keydown", handleKeyDownFunction);
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

    document.body.addEventListener("keydown", PlayClip_handleKeyDown, false);
    Main_HideElement('scene1');
    Main_ShowElement('scene2');
    Play_hideChat();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_CleanHideExit();
    if (AddUser_UserIsSet() && !UserLiveFeed_loadingData && UserLiveFeed_status) UserLiveFeed_FeedFindPos();
    Main_ready(PlayClip_Start);
}

function Main_OpenVod(id, idsArray, handleKeyDownFunction) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    document.body.removeEventListener("keydown", handleKeyDownFunction);
    Main_values.ChannelVod_vodId = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));
    ChannelVod_DurationSeconds = parseInt(Main_values.ChannelVod_vodId[1]);
    ChannelVod_language = Main_values.ChannelVod_vodId[2];
    Main_values.Play_gameSelected = Main_values.ChannelVod_vodId[3];

    if (Main_values.Play_gameSelected === null) Main_values.Play_gameSelected = "";

    Main_values.Main_selectedChannel_id = Main_values.ChannelVod_vodId[6];
    Main_values.Main_selectedChannelLogo = Main_values.ChannelVod_vodId[7];
    Main_values.Main_selectedChannelPartner = Main_values.ChannelVod_vodId[8];

    Main_values.Main_selectedChannel = Main_values.ChannelVod_vodId[4];
    Play_IncrementView = Main_values.ChannelVod_vodId[5];
    Main_values.ChannelVod_vodId = Main_values.ChannelVod_vodId[0].substr(1);
    Main_values.Main_selectedChannelDisplayname = document.getElementById(idsArray[3] + id).textContent;

    ChannelVod_createdAt = document.getElementById(idsArray[4] + id).textContent;
    ChannelVod_Duration = document.getElementById(idsArray[5] + id).textContent;
    ChannelVod_views = document.getElementById(idsArray[11] + id).innerHTML +
        ' ' + document.getElementById(idsArray[6] + id).textContent;

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
    if (AddUser_UserIsSet() && !UserLiveFeed_loadingData && UserLiveFeed_status) UserLiveFeed_FeedFindPos();
    Main_ready(PlayVod_Start);
}

function Main_ScrollTable(id, position) {
    document.getElementById(id).style.top = position + "px";
    window.setTimeout(Main_handleKeyUp, 10);
}

function Main_removeFocus(id, idArray) {
    Main_addFocusFinish = false;
    Main_RemoveClass(idArray[0] + id, Main_classThumb);
}

// stylesheet[i].cssRules or stylesheet[i].rules is blocked in chrome
// So in order to check if a css class is loaded one can check it's font-family
// The simple test here it to remove the <link rel="stylesheet" href="https://werevere"> from index and see if the bellow funtion loads the css for you and vice versa
function Main_Checktylesheet() {
    var span = document.createElement('span');

    span.className = 'fa';
    span.style.display = 'none';
    document.body.insertBefore(span, document.body.firstChild);

    if (window.getComputedStyle(span, null).getPropertyValue('font-family') !== 'icons') {
        if (Main_isDebug) console.log('Main_Checktylesheet reloading');
        Main_LoadStylesheet('https://fgl27.github.io/SmartTwitchTV/release/githubio/css/icons.min.css');
    } else if (Main_isDebug) console.log('Main_Checktylesheet loaded OK');

    document.body.removeChild(span);
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

    if (Main_IsDayFirst) dayMonth = STR_DAYS[date.getDay()] + ' ' + date.getDate() + ' ' + STR_MONTHS[date.getMonth()];
    else dayMonth = STR_DAYS[date.getDay()] + ' ' + STR_MONTHS[date.getMonth()] + ' ' + date.getDate();

    return dayMonth + ' ' + Play_lessthanten(date.getHours()) + ':' + Play_lessthanten(date.getMinutes());
}

// right after the TV comes from standby the network can lag, delay the check
function Main_Resume() {
    if (!document.hidden) {
        Main_updateclock();
        //Update clock twice as first try clock may be out of date in the case TV was on standby
        window.setTimeout(Main_updateclock, 20000);
    }
}

function Main_updateclock() {
    if (!document.hidden) {
        Main_textContent('label_clock', Main_getclock());
        Main_randomimg = '?' + Math.random();
    }
}

function Main_RandomInt() {
    return parseInt(Math.random() * 1000000000);
}

function Main_updateUserFeed() {
    if (AddUser_UserIsSet()) {
        window.setTimeout(function() {
            if (!document.hidden && !UserLiveFeed_isFeedShow() && !Sidepannel_isShowing() && !UserLiveFeed_loadingData) {
                Play_FeedOldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
                UserLiveFeed_StartLoad();
            }
        }, 15000);
    }
}

function Main_ExitDialog(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
            Main_HideExitDialog();
            break;
        case KEY_RIGHT:
            Main_ExitCursor++;
            if (Main_ExitCursor > 2) Main_ExitCursor = 0;
            Main_ExitCursorSet();
            Main_clearExitDialog();
            Main_setExitDialog();
            break;
        case KEY_LEFT:
            Main_ExitCursor--;
            if (Main_ExitCursor < 0) Main_ExitCursor = 2;
            Main_ExitCursorSet();
            Main_clearExitDialog();
            Main_setExitDialog();
            break;
        case KEY_ENTER:
            if (!Main_IsNotBrowser || !Main_ExitCursor) Main_HideExitDialog();
            else if (Main_ExitCursor === 1) {
                Main_HideExitDialog();
                Android.mclose(false);
            } else if (Main_ExitCursor === 2) Android.mclose(true);
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
                    if (Main_values.Games_return) {
                        Main_values.Main_Go = Main_SearchGames;
                        Main_values.Main_gameSelected = Main_values.gameSelectedOld;
                        Main_values.gameSelectedOld = null;
                    } else {
                        Main_values.Main_Go = Main_values.Main_BeforeAgame;
                        Main_values.Main_BeforeAgame = Main_games;
                    }
                    Main_CenterLablesCleanSwitchScreen(Main_values.Main_Go);
                } else if (Main_values.Main_Go === Main_AGameClip) {
                    Main_CenterLablesCleanSwitchScreen(Main_aGame);
                } else if (Main_values.Main_Go === Main_usergames ||
                    Main_values.Main_Go === Main_UserHost || Main_values.Main_Go === Main_UserVod ||
                    Main_values.Main_Go === Main_UserLive || Main_values.Main_Go === Main_UserChannels) {
                    Main_CenterLablesCleanSwitchScreen(Main_Users);
                } else if (Main_values.Main_Go === Main_ChannelClip) {
                    Main_CenterLablesCleanSwitchScreen(Main_ChannelContent);
                } else if (Main_values.Main_Go === Main_AGameVod) {
                    Main_CenterLablesCleanSwitchScreen(Main_aGame);
                } else if (Main_values.Main_Go === Main_ChannelContent) {
                    Main_values.Main_Go = Main_values.Main_BeforeChannel;
                    Main_values.Main_BeforeChannel = Main_Live;
                    ChannelContent_exit();
                    Main_values.Main_selectedChannel_id = '';
                    Main_CenterLablesCleanSwitch();
                } else if (Main_values.Main_Go === Main_ChannelVod) {
                    Main_CenterLablesCleanSwitchScreen(Main_ChannelContent);
                } else if (Main_values.Main_Go === Main_SearchLive) {
                    if (Main_values.Main_Go === Main_values.Main_BeforeSearch) Main_values.Main_Go = Main_Live;
                    else Main_values.Main_Go = Main_values.Main_BeforeSearch;
                    Main_values.Search_isSearching = false;
                    Main_CenterLablesCleanSwitchScreen(Main_values.Main_Go);
                } else if (Main_values.Main_Go === Main_SearchGames) {
                    if (Main_values.Main_Go === Main_values.Main_BeforeSearch) Main_values.Main_Go = Main_Live;
                    else Main_values.Main_Go = Main_values.Main_BeforeSearch;
                    Main_values.Search_isSearching = false;
                    Main_CenterLablesCleanSwitchScreen(Main_values.Main_Go);
                } else if (Main_values.Main_Go === Main_SearchChannels) {
                    if (Main_values.Main_Go === Main_values.Main_BeforeSearch) Main_values.Main_Go = Main_Live;
                    else Main_values.Main_Go = Main_values.Main_BeforeSearch;
                    if (Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
                    Main_values.Search_isSearching = false;
                    Main_CenterLablesCleanSwitchScreen(Main_values.Main_Go);
                } else {
                    Main_CenterLablesClean();
                    Sidepannel_Start(Main_CenterLables);
                }
            }
            break;
        case KEY_PG_UP:
        case KEY_RIGHT:
            if (Main_ForbidenScreens()) break;
            Main_RemoveClass(Main_CenterLablesVector[Main_values.Main_CenterLablesVectorPos], 'icon_center_line');
            Main_values.Main_CenterLablesVectorPos++;
            if (Main_values.Main_CenterLablesVectorPos > 5) Main_values.Main_CenterLablesVectorPos = 0;
            Main_CenterLablesChange();
            Main_CenterLablesExit();
            break;
        case KEY_PG_DOWN:
        case KEY_LEFT:
            if (Main_ForbidenScreens()) break;
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
            Main_SwitchScreenAction();
            break;
        case KEY_ENTER:
        case KEY_REFRESH:
            Main_ReloadScreen();
            break;
        default:
            break;
    }
}

function Main_ForbidenScreens() {
    return Main_values.Search_isSearching || Main_values.Main_Go === Main_ChannelContent ||
        Main_values.Main_Go === Main_ChannelVod || Main_values.Main_Go === Main_ChannelClip ||
        Main_values.Main_Go === Main_SearchLive || Main_values.Main_Go === Main_SearchGames ||
        Main_values.Main_Go === Main_SearchChannels;
}

function Main_CenterLablesCleanSwitchScreen(screen) {
    Screens_BasicExit(screen);
    Main_CenterLablesCleanSwitch();
}

function Main_CenterLablesCleanSwitch() {
    Main_CenterLablesClean();
    Main_SwitchScreenAction();
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
        AddUser_init();
    } else Main_SwitchScreen(true);
}

function Main_RemoveKeys() {

    if (Main_values.Main_Go === Main_ChannelContent) document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
    else if (Main_values.Main_Go === Main_Users) document.body.removeEventListener("keydown", Users_handleKeyDown);
    else {
        if (Main_values.Main_Go === Main_Live) inUseObj = Live;
        else if (Main_values.Main_Go === Main_aGame) inUseObj = AGame;
        else if (Main_values.Main_Go === Main_Featured) inUseObj = Featured;
        else if (Main_values.Main_Go === Main_games) inUseObj = Game;
        else if (Main_values.Main_Go === Main_ChannelClip) inUseObj = ChannelClip;
        else if (Main_values.Main_Go === Main_Vod) inUseObj = Vod;
        else if (Main_values.Main_Go === Main_Clip) inUseObj = Clip;
        else if (Main_values.Main_Go === Main_AGameClip) inUseObj = AGameClip;
        else if (Main_values.Main_Go === Main_usergames) inUseObj = UserGames;
        else if (Main_values.Main_Go === Main_AGameVod) inUseObj = AGameVod;
        else if (Main_values.Main_Go === Main_UserVod) inUseObj = UserVod;
        else if (Main_values.Main_Go === Main_ChannelVod) inUseObj = ChannelVod;
        else if (Main_values.Main_Go === Main_UserHost) inUseObj = UserHost;
        else if (Main_values.Main_Go === Main_UserLive) inUseObj = UserLive;
        else if (Main_values.Main_Go === Main_UserChannels) inUseObj = UserChannels;
        else if (Main_values.Main_Go === Main_SearchGames) inUseObj = SearchGames;
        else if (Main_values.Main_Go === Main_SearchLive) inUseObj = SearchLive;
        else if (Main_values.Main_Go === Main_SearchChannels) inUseObj = SearchChannels;

        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    }
}

function Main_ReloadScreen() {
    window.clearTimeout(Main_SetTopOpacityId);
    Main_UnSetTopOpacity();

    if (Main_values.Main_Go !== Main_ChannelContent) Main_values.Main_BeforeChannelisSet = false;
    if (Main_values.Main_Go !== Main_aGame) Main_values.Main_BeforeAgameisSet = false;

    Main_CounterDialogRst();

    if (Main_values.Main_Go === Main_ChannelContent) ChannelContent_StartLoad();
    else if (Main_values.Main_Go === Main_Users) Users_StartLoad();
    else if (Main_values.Main_Go === Main_usergames) {
        inUseObj = UserGames;
        if (!inUseObj.loadingData) inUseObj.key_refresh();
    } else {
        if (Main_values.Main_Go === Main_Live) inUseObj = Live;
        else if (Main_values.Main_Go === Main_Featured) inUseObj = Featured;
        else if (Main_values.Main_Go === Main_aGame) inUseObj = AGame;
        else if (Main_values.Main_Go === Main_games) inUseObj = Game;
        else if (Main_values.Main_Go === Main_Vod) inUseObj = Vod;
        else if (Main_values.Main_Go === Main_Clip) inUseObj = Clip;
        else if (Main_values.Main_Go === Main_AGameClip) inUseObj = AGameClip;
        else if (Main_values.Main_Go === Main_ChannelClip) inUseObj = ChannelClip;
        else if (Main_values.Main_Go === Main_AGameVod) inUseObj = AGameVod;
        else if (Main_values.Main_Go === Main_UserVod) inUseObj = UserVod;
        else if (Main_values.Main_Go === Main_ChannelVod) inUseObj = ChannelVod;
        else if (Main_values.Main_Go === Main_UserHost) inUseObj = UserHost;
        else if (Main_values.Main_Go === Main_UserLive) inUseObj = UserLive;
        else if (Main_values.Main_Go === Main_UserChannels) inUseObj = UserChannels;
        else if (Main_values.Main_Go === Main_SearchGames) inUseObj = SearchGames;
        else if (Main_values.Main_Go === Main_SearchLive) inUseObj = SearchLive;
        else if (Main_values.Main_Go === Main_SearchChannels) inUseObj = SearchChannels;

        Screens_StartLoad();
    }

    Main_SetTopOpacityId = window.setTimeout(Main_SetTopOpacity, 3000);
}

function Main_setItem(item, value) {
    localStorage.setItem(item, value);
}

function Main_getItemInt(item, default_value) {
    var value = parseInt(localStorage.getItem(item));
    if (value || value === 0) return value;
    return default_value;
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
function Main_PrintUnicode(string) { // jshint ignore:line
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
function BasehttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, useProxy) {
    if (Main_IsNotBrowser) BaseAndroidhttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError);
    else BasexmlHttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, useProxy);
}

function BaseAndroidhttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError) {
    var xmlHttp = Android.mreadUrl(theUrl, Timeout, HeaderQuatity, access_token);

    if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
    else {
        calbackError();
        return;
    }

    if (xmlHttp.status === 200) {
        callbackSucess(xmlHttp.responseText);
    } else if (HeaderQuatity > 2 && (xmlHttp.status === 401 || xmlHttp.status === 403)) { //token expired
        AddCode_refreshTokens(Main_values.Users_Position, 0, Screens_loadDataRequestStart, Screens_loadDatafail);
    } else {
        calbackError();
    }
}

var Main_Headers = [
    [Main_clientIdHeader, Main_clientId],
    [Main_AcceptHeader, Main_TwithcV5Json],
    [Main_Authorization, null]
];

function BasexmlHttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, useProxy) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", (useProxy ? proxyurl : '') + theUrl, true);
    xmlHttp.timeout = Timeout;

    Main_Headers[2][1] = access_token;

    for (var i = 0; i < HeaderQuatity; i++)
        xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                callbackSucess(xmlHttp.responseText);
            } else if (HeaderQuatity > 2 && (xmlHttp.status === 401 || xmlHttp.status === 403)) { //token expired
                AddCode_refreshTokens(Main_values.Users_Position, 0, Screens_loadDataRequestStart, Screens_loadDatafail);
            } else {
                calbackError();
            }
        }
    };

    xmlHttp.send(null);
}

//Duplicated (BasehttpPost === BasehttpGet minus the post part ) as the android side may not be there and is not needed yet
//function BasehttpPost(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, useProxy) { // jshint ignore:line
//    if (Main_IsNotBrowser) BasexmlHttpPost(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError);
//    else BasexmlHttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, useProxy);
//}

//function BasexmlHttpPost(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError) {
//    var xmlHttp = Android.mreadUrl(theUrl, Timeout, HeaderQuatity, access_token, true);

//    if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
//    else {
//        calbackError();
//        return;
//    }

//    if (xmlHttp.status === 200) {
//        callbackSucess(xmlHttp.responseText);
//    } else {
//        calbackError();
//    }
//}

//function BasexmlHttpPost(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, useProxy) {
//    var xmlHttp = new XMLHttpRequest();

//    xmlHttp.open("POST", (useProxy ? proxyurl : '') + theUrl, true);
//    xmlHttp.timeout = Timeout;

//    Main_Headers[2][1] = access_token;

//    for (var i = 0; i < HeaderQuatity; i++)
//       xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

//    xmlHttp.ontimeout = function() {};

//    xmlHttp.onreadystatechange = function() {
//        if (xmlHttp.readyState === 4) {
//            if (xmlHttp.status === 200) {
//                callbackSucess(xmlHttp.responseText);
//                return;
//            } else {
//                calbackError();
//            }
//        }
//    };

//    xmlHttp.send(null);
//}

var Main_VideoSizeAll = ["384x216", "512x288", "640x360", "896x504", "1280x720"];
var Main_GameSizeAll = ["179x250", "272x380", "340x475", "476x665", "773x1080"];
var Main_SidePannelSizeAll = ["640x360", "896x504", "1280x720", "1536x864", "1920x1080"];
var Main_SidePannelSize = "1280x720";
var Main_VideoSize = "640x360";
var Main_GameSize = "340x475";

function Main_SetThumb() {
    Main_VideoSize = Main_VideoSizeAll[Settings_value.thumb_quality.defaultValue];
    Main_GameSize = Main_GameSizeAll[Settings_value.thumb_quality.defaultValue];
    Main_SidePannelSize = Main_SidePannelSizeAll[Settings_value.thumb_quality.defaultValue];
}
