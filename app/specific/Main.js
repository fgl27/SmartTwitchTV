//Variable initialization
var smartTwitchTV;
var Main_isReleased = false;
var Main_isDebug = false;

var Main_cursorYAddFocus = -1;

var Main_Search = 0;
var Main_Live = 1;
var Main_Users = 2;
var Main_Featured = 3;
var Main_games = 4;
var Main_Vod = 5;
var Main_Clip = 6;
var Main_UserLive = 7;
var Main_UserHost = 8;
var Main_usergames = 9;
var Main_UserVod = 10;
var Main_UserChannels = 11;
var Main_SearchGames = 12;
var Main_SearchLive = 13;
var Main_SearchChannels = 14;
var Main_ChannelContent = 15;
var Main_ChannelVod = 16;
var Main_ChannelClip = 17;
var Main_addUser = 18;
var Main_aGame = 19;
var Main_AGameVod = 20;
var Main_AGameClip = 21;
var Main_HistoryLive = 22;
var Main_HistoryVod = 23;
var Main_HistoryClip = 24;

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
    "Main_gameSelected_id": '',
    "Main_OldgameSelected": null,
    "Play_isHost": false,
    "Play_DisplaynameHost": '',
    "Play_selectedChannelDisplayname": '',
    "Play_selectedChannel": '',
    "Play_gameSelected": '',
    "Users_AddcodePosition": 0,
    "Play_WasPlaying": 0,
    "ChannelVod_vodId": '',
    "vodOffset": 0,
    "Search_data": '',
    "gameSelectedOld": null,
    "Games_return": false,
    "Search_isSearching": false,
    "Play_ChatForceDisable": false,
    "Never_run_new": true,
    "Chat_font_size": 3,
    "ChatBackground": 10,
    "IsRerun": false,
    "Main_selectedChannelPartner": false,
    "Sidepannel_Pos": 2,
    "Sidepannel_IsUser": false,
    "My_channel": false,
    "DeviceCheck": false,
    "Never_run_phone": true,
    "Codec_is_Check": false,
    "check_pp_workaround": true,
    "OS_is_Check": false,
};

var Main_values_Play_data;
var Main_values_History_data = {};//The obj is defined in AddUser_RestoreUsers()
var Main_Force = "4mv6wki5h1ko";
var Main_LastClickFinish = true;
var Main_addFocusFinish = true;
var Main_newUsercode = 0;
var Main_ExitCursor = 0;
var Main_ExitDialogID = null;
var Main_IsDayFirst = false;
var Main_SearchInput;
var Main_AddUserInput;
var Main_updateclockId;
var Main_ContentLang = "";
var Main_Periods = [];
var Main_addFocusVideoOffset = 0;
var Main_FirstRun = true;
var Main_FirstLoad = false;
var Main_RunningTime = 0;
var Main_Hash = "ncx6brgo";

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

var Main_kraken_api = 'https://api.twitch.tv/kraken/';
var Main_clientId = "5seja5ptej058mxqy7gh5tcudjqtm9";
var Main_clientIdHeader = 'Client-ID';
var Main_AcceptHeader = 'Accept';
var Main_Authorization = 'Authorization';
var Main_OAuth = 'OAuth ';
var Main_TwithcV5Json = 'application/vnd.twitchtv.v5+json';
var Main_TwithcV5Flag = '&api_version=5';
var Main_TwithcV5Flag_I = '?api_version=5';

var Main_classThumb = 'stream_thumbnail_focused';
var Main_DataAttribute = 'data_attribute';

var Main_stringVersion = '2.0';
var Main_stringVersion_Min = '.106';
var Main_minversion = '122919';
var Main_versionTag = Main_stringVersion + Main_stringVersion_Min + '-' + Main_minversion;
var Main_IsNotBrowserVersion = '';
var Main_AndroidSDK = 1000;
var Main_ClockOffset = 0;
var Main_IsNotBrowser = 0;
var Main_randomimg = '?' + Math.random();
var proxyurl = "https://cors-anywhere.herokuapp.com/";
var Main_updateUserFeedId;
var Main_vp9supported = false;
//var Main_SupportsAvc1High = false;
var Main_Fix = "kimne78kx3";
//Variable initialization end

// this function will be called only once the first time the app startup
if (!Main_isReleased) Main_Start();

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
        try {
            if (window.location.href.indexOf('asset') !== -1) {
                //Same as in smartTwitchTV/release/api.js
                //The app is running from assets need to expose smartTwitchTV
                smartTwitchTV = {
                    'mainstart': Main_Start,
                    'Play_PannelEndStart': Play_PannelEndStart,
                    'Play_CheckResume': Play_CheckResume,
                    'Play_PlayerCheck': Play_PlayerCheck,
                    'Play_UpdateDuration': Play_UpdateDuration,
                    'Play_CheckResumeForced': Play_CheckResumeForced,
                    'PlayExtra_End': PlayExtra_End
                };
            }
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
            //If we add the class on the android app for some reason it prevents input from release the focus
            Main_AddClass('scenefeed', 'feed_screen_input');
        }
        Main_showLoadDialog();

        if (Main_IsNotBrowser) Main_vp9supported = Android.misCodecSupported();

        Main_initClick();
        Settings_SetDefautls();
        calculateFontSize();
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

        Main_SearchInput = document.getElementById("search_input");
        Main_AddUserInput = document.getElementById("user_input");

        AddUser_RestoreUsers();
        //Allow page to proper load/resize and users 0 be restored before Main_initWindows
        window.setTimeout(Main_initWindows, 500);
    });

}

function Main_initWindows() {
    Main_RestoreValues();

    if (Main_IsNotBrowser) {

        if (!Main_values.DeviceCheck) {

            Main_values.DeviceCheck = true;

            if ((Android.getDevice()).toLowerCase().indexOf('shield android tv') !== -1 ||
                (Android.getManufacturer()).toLowerCase().indexOf('nvidia') !== -1) {
                //Some devices are very slow and are affected by some app default setting Nvidia shield is not

                //bitrate to max possible
                Settings_value.bitrate_min.defaultValue = 0;
                Main_setItem('bitrate_min', 1);
                Android.SetSmallPlayerBandwidth(0);

                //Enable app animations
                Settings_value.app_animations.defaultValue = 1;
                Main_setItem('app_animations', 2);
                Settings_SetAnimations();
            }
        }

        //Disable googles OMX.google.h264.decoder if another codec is available
        //Check if at least one none google codec is available
        if (!Main_values.Codec_is_Check) {
            var getcodec = null;
            try {
                getcodec = Android.getcodecCapabilities('avc');
            } catch (e) {
                getcodec = null;
            }

            if (getcodec !== null) {

                Main_values.Codec_is_Check = true;
                var codecs = getcodec.split('|');

                if (codecs.length > 1) {

                    var codecsValue,
                        codecsnames = [];

                    for (var i = 0; i < codecs.length; i++) {
                        codecsValue = codecs[i].split(',');
                        if (codecsValue[1].toLowerCase().indexOf('google') !== -1)
                            codecsnames.push(codecsValue[1]);
                    }

                    if (codecsnames.length < 2) {

                        Main_setItem(codecsnames[0], 1);
                        Main_setItem('Settings_DisableCodecsNames', JSON.stringify(codecsnames));

                        try {
                            Android.setBlackListMediaCodec(codecsnames.join());
                        } catch (e) {}
                    }
                }
            }

        }

        try {
            Main_AndroidSDK = Android.getSDK();
        } catch (e) {
            Main_AndroidSDK = 1000;
        }

        //Android N (sdk 25) and older don't properly support animations on surface_view
        //So enable the workaround by default
        if (!Main_values.OS_is_Check && Main_AndroidSDK < 1000) {
            if (Main_AndroidSDK < 26) {
                Settings_value.pp_workaround.defaultValue = 1;
                Main_setItem('pp_workaround', 2);
            }
            Main_values.OS_is_Check = true;
        }

        //Check for High Level 5.2 video/mp4; codecs="avc1.640034" as some devices don't support it
        //TODO add a warning when playing avc1.640034 and a setting to disable it
        //Main_SupportsAvc1High = Android.misAVC52Supported();
    }

    Main_SetStringsMain(true);

    Main_GoBefore = Main_values.Main_Go;

    Main_ready(function() {
        Chat_Preinit();
        Play_PreStart();

        if (AddUser_UserIsSet()) {
            Main_updateUserFeedId = window.setInterval(Main_updateUserFeed, 600000);
        }
        document.body.addEventListener("keyup", Main_handleKeyUp, false);
        Screens_InitScreens();

        document.getElementById("side_panel").style.marginLeft = '';
        document.getElementById("user_feed_notify").style.marginTop = '';

        Main_checkVersion();

        Main_SetStringsSecondary();

        Play_MakeControls();
        Play_SetControls();
        Play_SetFullScreen(Play_isFullScreen);

        Main_updateclockId = window.setInterval(Main_updateclock, 60000);

        inUseObj = Live;
        Main_ready(function() {
            Screens_init();
            Sidepannel_UpdateThumbDoc = document.getElementById("feed_thumb_img");
        });
    });
}

function Main_SetStringsMain(isStarting) {
    Main_updateclock();

    //set top bar labels
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);
    Main_innerHTML('label_update', '<div style="vertical-align: middle; display: inline-block;"><i class="icon-update" style="color: #FF0000;"></i></div><div style="vertical-align: middle; display: inline-block; color: #FF0000">' + STR_SPACE + STR_UPDATE_AVAILABLE + '</div>');

    Main_IconLoad('label_side_panel', 'icon-arrow-left', STR_GOBACK);
    UserLiveFeed_SetFeedPicText();

    Sidepannel_SetDefaultLables();

    Main_textContent("dialog_end_next_text", STR_PLAY_NEXT);
    Main_textContent("dialog_end_replay_text", STR_REPLAY);
    Main_textContent("dialog_end_vod_text", STR_OPEN_BROADCAST);
    Main_textContent("dialog_end_channel_text", STR_CHANNEL_CONT);
    Main_textContent("dialog_end_game_text", STR_GAME_CONT);
    Main_innerHTML("dialog_about_text", STR_ABOUT_INFO_HEADER +
        '<div id="about_runningtime"></div>' + STR_ABOUT_INFO_0);

    Main_Periods = [STR_CLIP_DAY, STR_CLIP_WEEK, STR_CLIP_MONTH, STR_CLIP_ALL];

    if (isStarting) Settings_SetSettings();
    else {
        Settings_SetStrings();
        Main_checkVersion();
    }
}

function Main_SetStringsSecondary() {
    Main_textContent("play_dialog_exit_text", STR_EXIT_AGAIN);

    Main_textContent('side_panel_feed_settings', STR_SIDE_PANEL_SETTINGS);
    Main_textContent('side_panel_feed_refresh', STR_REFRESH);
    Main_textContent('user_feed_notify_main', STR_NOW_LIVE);

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
    Main_innerHTML("dialog_phone_text", STR_ABOUT_PHONE_0);
    Main_textContent('side_panel_warn_text', STR_NO + STR_LIVE_CHANNELS);
    Main_textContent('side_panel_movel_top_text', STR_LIVE_FEED);

    Main_textContent("dialog_period_text", STR_SWITCH_CLIP);
    Main_innerHTML("dialog_period_1", Main_Periods[0]);
    Main_innerHTML("dialog_period_2", Main_Periods[1]);
    Main_innerHTML("dialog_period_3", Main_Periods[2]);
    Main_innerHTML("dialog_period_4", Main_Periods[3]);

    Main_innerHTML("main_dialog_user_first", STR_USER_MAKE_ONE);
    Main_innerHTML("main_dialog_user_remove", STR_USER_REMOVE);

    Main_innerHTML("dialog_OffSet_text", STR_SWITCH_POS + STR_BR);
    Main_textContent("dialog_OffSet_text_summary", STR_SWITCH_POS_SUMMARY);

    Main_textContent("dialog_vod_text", STR_VOD_HISTORY);
    Main_innerHTML("dialog_vod_start_text", STR_FROM_START);

    Main_innerHTML('channel_content_titley_0', '<i class="icon-movie-play stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_VIDEOS);
    Main_innerHTML('channel_content_titley_1', '<i class="icon-movie stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_CLIPS);
    Main_innerHTML('channel_content_titley_2', '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; "></i>' + STR_SPACE + STR_SPACE + STR_FALLOW);

    Main_innerHTML("dialog_os_text", STR_PP_WARNIG + STR_BR + STR_BR + STR_DIV_TITLE + STR_CLOSE_THIS2 + '</div>');

    Main_textContent("dialog_hist_setting_name_0", STR_SORTING);
    Main_textContent("dialog_hist_setting_name_1", STR_ENABLE);
    Main_textContent("dialog_hist_setting_name_2", STR_DELETE_HISTORY);
    Main_textContent('dialog_hist_val_2', STR_PRESS_ENTER_D);
    Main_textContent('dialog_hist_text_end', STR_PRESS_ENTER_APPLY);
}

var Main_initClickDoc = [
    "clickup", "clickdown", "clickleft", "clickright", "clickenter", "clickback",
    "clickpgup", "clickpgdown", "clickfeed"];
var Main_setHideButtonsId;
var Main_scenekeysDoc;
var Main_scenekeysPositionDoc;
var Main_isTV;

function Main_initClick() {
    if (Main_IsNotBrowser) {
        //TODO remove the try after some itme of the app be released
        try {
            Main_isTV = Android.deviceIsTV();
            //Only show virtual d-pad on none TV devices
            if (Main_isTV) return;
        } catch (e) {
            return;
        }
    }

    Main_ShowElement('scenekeys');
    Main_scenekeysDoc = document.getElementById('scenekeys');
    Main_scenekeysPositionDoc = document.getElementById('scenekeys_position');

    for (var i = 0; i < Main_initClickDoc.length; i++) {
        Main_initClickSet(document.getElementById(Main_initClickDoc[i]), i);
    }

    document.body.onpointerup = function() {
        Main_initbodyClickSet();
    };
    Main_initbodyClickSet();
}

function Main_initbodyClickSet() {
    //if (Main_isElementShowing('search_scroll')) Search_KeyboardDismiss();
    //else if (Main_isElementShowing('add_user_scroll')) AddUser_KeyboardDismiss();

    Settings_DpadOpacity();
    Main_clearHideButtons();
    Main_setHideButtons();
}

function Main_buttonsVisible() {
    return parseInt(Main_scenekeysDoc.style.opacity * 100) ===
        parseInt(Settings_Obj_default("dpad_opacity") * 5);
}

function Main_clearHideButtons() {
    window.clearTimeout(Main_setHideButtonsId);
}

function Main_setHideButtons() {
    Main_setHideButtonsId = window.setTimeout(Main_HideButtons, 4000);
}

function Main_HideButtons() {
    Main_scenekeysDoc.style.opacity = "0";
}

var Main_initClickSetId;
var Main_initClickTimeoutId;

function Main_initClickSet(doc, pos) {
    doc.onpointerdown = function() {
        Main_ClickonpointerdownClear();
        if (!Main_buttonsVisible()) return;

        Main_Clickonpointerdown(pos);

        Main_initClickTimeoutId = window.setTimeout(function() {
            Main_ClickonpointerdownClear();
            Main_initClickSetId = window.setInterval(function() {
                Main_Clickonpointerdown(pos);
            }, 50);
        }, 600);
    };

    doc.onpointerup = function() {
        Main_ClickonpointerdownClear();
        if (!Main_buttonsVisible()) return;

        if (Main_IsNotBrowser) Android.keyEvent(pos, 1);
        else console.log("pointerup key " + Main_initClickDoc[pos] + " even " + 1);
    };
}

function Main_ClickonpointerdownClear() {
    window.clearTimeout(Main_initClickTimeoutId);
    window.clearInterval(Main_initClickSetId);
}

function Main_Clickonpointerdown(pos) {
    if (Main_IsNotBrowser) Android.keyEvent(pos, 0);
    else console.log("pointerdown key " + Main_initClickDoc[pos] + " even " + 0);
}

function Main_IconLoad(lable, icon, string) {
    Main_innerHTML(lable, '<div style="vertical-align: middle; display: inline-block; transform: translateY(15%);"><i class="' + icon + '" style="color: #FFFFFF;"></i></div><div style="vertical-align: middle; display: inline-block;">' + STR_SPACE + string + '</div>');
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
    Main_SwitchScreenAction();
    Main_clearExitDialog();
    Main_HideElement('main_dialog_exit');
    Main_ExitCursor = 0;
    Main_ExitCursorSet();
}

function Main_ExitCursorSet() {
    Main_RemoveClass('exit_app_cancel', 'button_dialog_focused');
    Main_RemoveClass('exit_app_minimize', 'button_dialog_focused');
    Main_RemoveClass('exit_app_close', 'button_dialog_focused');
    if (!Main_ExitCursor) Main_AddClass('exit_app_cancel', 'button_dialog_focused');
    else if (Main_ExitCursor === 1) Main_AddClass('exit_app_minimize', 'button_dialog_focused');
    else Main_AddClass('exit_app_close', 'button_dialog_focused');
}

function Main_CounterDialogRst() {
    Main_empty('dialog_counter_text');
}

function Main_CounterDialog(x, y, coloumns, total) {
    if (total > 0) Main_textContent('dialog_counter_text', (y * coloumns) + (x + 1) + '/' + (total));
    else Main_CounterDialogRst();
}

function Main_showWarningDialog(text) {
    Main_innerHTML('dialog_warning_text', text);
    Main_ShowElement('dialog_warning');
}

function Main_HideWarningDialog() {
    Main_HideElement('dialog_warning');
}

function Main_AboutDialogUpdateTime() {
    Main_innerHTML('about_runningtime', STR_RUNNINGTIME + STR_SPACE + Play_timeDay(Date.now() - Main_RunningTime));
}

function Main_showAboutDialog(removeEventListener, addEventListener) {
    document.body.removeEventListener("keydown", removeEventListener);
    document.body.addEventListener("keydown", addEventListener, false);
    Main_HideControlsDialog();
    Main_AboutDialogUpdateTime();
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

function Main_showphoneDialog(removeEventListener, addEventListener) {
    document.body.removeEventListener("keydown", removeEventListener);
    document.body.addEventListener("keydown", addEventListener, false);
    Main_HideAboutDialog();
    Main_ShowElement('dialog_phone');
}

function Main_HidephoneDialog() {
    Main_HideElement('dialog_phone');
}

function Main_isphoneDialogVisible() {
    return Main_isElementShowing('dialog_phone');
}

function Main_showControlsDialog(removeEventListener, addEventListener) {
    document.body.removeEventListener("keydown", removeEventListener);
    document.body.addEventListener("keydown", addEventListener, false);
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

function Main_SwitchScreen(removekey) {
    Main_ready(function() {
        Main_SwitchScreenAction(removekey);
    });
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
        else if (Main_values.Main_Go === Main_HistoryLive) inUseObj = HistoryLive;
        else if (Main_values.Main_Go === Main_HistoryVod) inUseObj = HistoryVod;
        else if (Main_values.Main_Go === Main_HistoryClip) inUseObj = HistoryClip;

        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    }
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
Main_Switchobj[Main_HistoryLive] = function() {
    inUseObj = HistoryLive;
    Screens_init();
};
Main_Switchobj[Main_HistoryVod] = function() {
    inUseObj = HistoryVod;
    Screens_init();
};
Main_Switchobj[Main_HistoryClip] = function() {
    inUseObj = HistoryClip;
    Screens_init();
};


function Main_SwitchScreenAction(removekey) {
    Main_HideWarningDialog();
    if (Main_values.Main_Go !== Main_ChannelContent) Main_values.Main_BeforeChannelisSet = false;
    if (Main_values.Main_Go !== Main_aGame) Main_values.Main_BeforeAgameisSet = false;

    Main_CounterDialogRst();

    if (Main_Switchobj[Main_values.Main_Go]) Main_Switchobj[Main_values.Main_Go]();
    else Main_Switchobj[1]();

    if (removekey) Main_RemoveKeys();
}

function Main_OpenSearch() {
    if (!Main_values.Search_isSearching) Main_values.Main_BeforeSearch = Main_values.Main_Go;
    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_Search;
    Main_HideWarningDialog();
    Main_CounterDialogRst();
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
Main_ExitCurrentobj[Main_HistoryLive] = Screens_exit;
Main_ExitCurrentobj[Main_HistoryVod] = Screens_exit;
Main_ExitCurrentobj[Main_HistoryClip] = Screens_exit;

function Main_ExitCurrent(ExitCurrent) {
    if (Main_ExitCurrentobj[ExitCurrent]) Main_ExitCurrentobj[ExitCurrent]();
    if (Main_isElementShowing('settings_holder')) Settings_exit();
}

function Main_RestoreTopLabel() {
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);
    Main_HideElement('label_side_panel');
}

function Main_cleanTopLabel() {
    Main_ShowElement('label_side_panel');
}

function Main_videoCreatedAt(time) { //time in '2017-10-27T13:27:27Z' or ms
    time = new Date(time);
    if (Main_IsDayFirst) return time.getDate() + ' ' + STR_MONTHS[time.getMonth()] + ' ' + time.getFullYear();
    else return STR_MONTHS[time.getMonth()] + ' ' + time.getDate() + ' ' + time.getFullYear();
}

//WithHM = with hour minutes
function Main_videoCreatedAtWithHM(time) { //time in '2017-10-27T13:27:27Z' or ms
    var result = Main_videoCreatedAt(time);
    time = new Date(time);
    return result + ' ' + time.getHours() + ":" + Play_lessthanten(time.getMinutes());
}

function Main_checkVersion() {
    if (Main_IsNotBrowser) {
        var device = '';
        device = Android.getDevice();
        Main_versionTag = "Android: " + Main_IsNotBrowserVersion + ' Web: ' + Main_minversion + ' Device: ' + device;
        if (Main_needUpdate(Main_IsNotBrowserVersion)) Main_ShowElement('label_update');
    }

    Main_innerHTML("dialog_about_text", STR_ABOUT_INFO_HEADER + STR_VERSION + Main_versionTag +
        STR_BR + '<span id="about_runningtime"></span>' + STR_ABOUT_INFO_0);

    Main_RunningTime = Date.now();
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

function Main_OpenLiveStream(id, idsArray, handleKeyDownFunction, checkHistory) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    document.body.removeEventListener("keydown", handleKeyDownFunction);
    Main_values_Play_data = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));

    Main_values.Play_selectedChannel = Main_values_Play_data[6];
    Main_values.Play_selectedChannel_id = Main_values_Play_data[14];
    Main_values.IsRerun = Main_values_Play_data[8];

    if (checkHistory) {

        var index = Main_history_Exist('live', Main_values_Play_data[7]);

        if (index > -1) {

            if (document.getElementById(idsArray[1] + id).src.indexOf('s3_vods') !== -1) {
                Main_OPenAsVod(index);
                return;
            } else {//is live check is is really

                if (Main_values_History_data[AddUser_UsernameArray[0].id].live[index].vodid) Main_CheckBroadcastID(index, idsArray[3] + id);
                else Main_OPenAsLive();

                return;
            }

        }
    }

    Main_values.Play_isHost = (Main_values.Main_Go === Main_UserHost) && !Play_UserLiveFeedPressed;

    if (Main_values.Play_isHost) {
        Main_values.Play_DisplaynameHost = document.getElementById(idsArray[3] + id).textContent;
        Main_values.Play_selectedChannelDisplayname = Main_values.Play_DisplaynameHost.split(STR_USER_HOSTING)[1];
    } else Main_values.Play_selectedChannelDisplayname = Main_values_Play_data[1];

    Main_values.Play_gameSelected = (Main_values_Play_data[3] !== "" ? STR_PLAYING + Main_values_Play_data[3] : '');

    if (Main_values.Main_Go === Main_aGame) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;

    Main_openStream();
}

var Main_CheckBroadcastIDex;
var Main_CheckBroadcastIDoc;
var Main_CheckBroadcastIDErrorTry = 0;

function Main_CheckBroadcastID(index, doc) {
    Main_CheckBroadcastIDex = index;
    Main_CheckBroadcastIDoc = doc;
    Main_CheckBroadcastIDErrorTry = 0;
    Main_CheckBroadcastIDStart();
}

function Main_CheckBroadcastIDStart() {
    var theUrl = Main_kraken_api + 'streams/' + Main_values.Play_selectedChannel_id + Main_TwithcV5Flag_I;
    BasexmlHttpGet(theUrl, 3000, 2, null, Main_CheckBroadcastIDStartSucess, Main_CheckBroadcastIDStartError, false);
}

function Main_CheckBroadcastIDStartSucess(response) {
    console.log(response);
    response = JSON.parse(response);
    if (response.stream !== null) {
        if (Main_values_Play_data[7] === response.stream._id) {
            Main_OPenAsLive();
            return;
        }
    }

    //force set as vod and set the div
    Main_values_History_data[AddUser_UsernameArray[0].id].live[Main_CheckBroadcastIDex] = Screens_assign(
        Main_values_History_data[AddUser_UsernameArray[0].id].live[Main_CheckBroadcastIDex],
        {
            forceVod: true
        }
    );

    var doc = document.getElementById(Main_CheckBroadcastIDoc);
    doc.childNodes[0].classList.add('hideimp');
    doc.childNodes[2].classList.remove('hideimp');

    Main_OPenAsVod(Main_CheckBroadcastIDex);
}

function Main_CheckBroadcastIDStartError() {
    if (Main_CheckBroadcastIDErrorTry < 5) {
        Main_CheckBroadcastIDStart();
        Main_CheckBroadcastIDErrorTry++;
    } else Main_OPenAsLive();
}

function Main_OPenAsLive() {
    Main_values.Play_selectedChannelDisplayname = Main_values_Play_data[1];
    Main_values.Play_gameSelected = (Main_values_Play_data[3] !== "" ? STR_PLAYING + Main_values_Play_data[3] : '');
    Main_openStream();
}

function Main_OPenAsVod(index) {
    if (!Main_values_History_data[AddUser_UsernameArray[0].id].live[index].vodid) {
        Main_OPenAsLive();
        return;
    }

    Main_values.Main_selectedChannelDisplayname = Main_values_Play_data[1];
    Main_values.Main_selectedChannelLogo = Main_values_Play_data[9];
    Main_values.Main_selectedChannel = Main_values_Play_data[6];

    Main_values.Main_selectedChannel_id = Main_values_Play_data[14];
    Main_values.Main_selectedChannelLogo = Main_values_Play_data[9];
    Main_values.Main_selectedChannelPartner = Main_values_Play_data[10];

    Main_values.ChannelVod_vodId = Main_values_History_data[AddUser_UsernameArray[0].id].live[index].vodid;
    Main_values.vodOffset =
        ((Main_values_History_data[AddUser_UsernameArray[0].id].live[index].date - (new Date(Main_values_Play_data[12]).getTime())) / 1000);

    if (Main_values.vodOffset < 0) Main_values.vodOffset = 1;
    PlayVod_VodOffsetTemp = Main_values.vodOffset;

    Play_showWarningDialog(STR_LIVE_VOD);
    Main_openVod();

    window.setTimeout(function() {
        if (!Play_IsWarning) Play_HideWarningDialog();
    }, 3000);
}

function Main_openStream() {
    document.body.removeEventListener("keydown", Play_handleKeyDown);
    document.body.addEventListener("keydown", Play_handleKeyDown, false);
    Main_HideElement('scene1');
    Main_ShowElement('scene2');
    Play_hidePanel();
    if (!Play_EndDialogEnter) Play_HideEndDialog();
    Main_ready(Play_Start);
}

function Main_OpenClip(id, idsArray, handleKeyDownFunction) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    document.body.removeEventListener("keydown", handleKeyDownFunction);
    Main_values_Play_data = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));

    ChannelClip_playUrl = Main_values_Play_data[0];
    PlayClip_DurationSeconds = parseInt(Main_values_Play_data[1]);
    Main_values.Main_selectedChannel_id = Main_values_Play_data[2];

    Main_values.Play_gameSelected = Main_values_Play_data[3];
    if (Main_values.Play_gameSelected === null) Main_values.Play_gameSelected = "";
    ChannelClip_game = (Main_values.Play_gameSelected !== "" && Main_values.Play_gameSelected !== null ? STR_PLAYING + Main_values.Play_gameSelected : "");

    Main_values.Main_selectedChannelDisplayname = Main_values_Play_data[4];
    Main_values.Main_selectedChannelLogo = Main_values_Play_data[5];
    ChannelClip_Id = Main_values_Play_data[7];
    Main_values.Main_selectedChannel = Main_values_Play_data[6];
    Main_values.ChannelVod_vodId = Main_values_Play_data[8];
    ChannelVod_vodOffset = parseInt(Main_values_Play_data[9]);

    ChannelClip_title = Main_values_Play_data[10];
    ChannelClip_language = Main_values_Play_data[11];
    ChannelClip_createdAt = Main_values_Play_data[12];
    ChannelClip_views = Main_values_Play_data[14];
    ChannelClip_playUrl2 = Main_values_Play_data[15].split("-preview")[0] + ".mp4";

    document.body.addEventListener("keydown", PlayClip_handleKeyDown, false);
    Main_HideElement('scene1');
    Main_ShowElement('scene2');
    Play_hideChat();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_CleanHideExit();
    Main_ready(PlayClip_Start);
}

function Main_OpenVod(id, idsArray, handleKeyDownFunction) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    document.body.removeEventListener("keydown", handleKeyDownFunction);
    Main_values_Play_data = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));

    Main_values.Main_selectedChannelDisplayname = Main_values_Play_data[1];
    ChannelVod_createdAt = Main_values_Play_data[2];

    Main_values.Play_gameSelected = Main_values_Play_data[3];
    if (Main_values.Play_gameSelected === null) Main_values.Play_gameSelected = "";
    ChannelVod_game = (Main_values.Play_gameSelected !== "" && Main_values.Play_gameSelected !== null ? STR_STARTED + STR_PLAYING + Main_values.Play_gameSelected : "");

    ChannelVod_views = Main_values_Play_data[4];

    Main_values.Main_selectedChannel = Main_values_Play_data[6];
    Main_values.ChannelVod_vodId = Main_values_Play_data[7];

    ChannelVod_language = Main_values_Play_data[9];
    ChannelVod_title = Main_values_Play_data[10];
    ChannelVod_DurationSeconds = parseInt(Main_values_Play_data[11]);
    ChannelVod_Duration = STR_DURATION + Play_timeS(ChannelVod_DurationSeconds);
    Play_IncrementView = Main_values_Play_data[12];

    Main_values.Main_selectedChannel_id = Main_values_Play_data[14];
    Main_values.Main_selectedChannelLogo = Main_values_Play_data[15];
    Main_values.Main_selectedChannelPartner = Main_values_Play_data[16];

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
    Main_ready(PlayVod_Start);
}

function Main_ScrollTable(id, position) {
    document.getElementById(id).style.top = position ? (position / BodyfontSize) + "em" : "";
    window.setTimeout(Main_handleKeyUp, 10);
}

function Main_ScrollTableCalc(id, position, percentage) {
    document.getElementById(id).style.top = 'calc(' + percentage + '% + ' + (position / BodyfontSize) + 'em)';
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

    Main_ready(function() {
        if (window.getComputedStyle(span, null).getPropertyValue('font-family') !== 'icons') {
            console.log('Main_Checktylesheet reloading');
            Main_LoadStylesheet('https://fgl27.github.io/SmartTwitchTV/release/githubio/css/icons.min.css');
        } else console.log('Main_Checktylesheet loaded OK');

        document.body.removeChild(span);
    });
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
//function Main_Resume() {
//    if (!document.hidden) {
//        Main_updateclock();
//        //Update clock twice as first try clock may be out of date in the case TV was on standby
//        window.setTimeout(Main_updateclock, 20000);
//    }
//}

function Main_updateclock() {
    if (!document.hidden) {
        Main_textContent('label_clock', Main_getclock());
        if (Main_RunningTime) Main_AboutDialogUpdateTime();
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
                Play_FeedOldUserName = AddUser_UsernameArray[0].name;
                UserLiveFeed_StartLoad();
            }
        }, 15000);
    }
}

function Main_ExitDialog(event) {
    switch (event.keyCode) {
        case KEY_RETURN_Q:
        case KEY_KEYBOARD_BACKSPACE:
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

function Main_ReloadScreen() {
    Screens_clear = true;
    ChannelContent_clear = true;

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
        else if (Main_values.Main_Go === Main_HistoryLive) inUseObj = HistoryLive;
        else if (Main_values.Main_Go === Main_HistoryVod) inUseObj = HistoryVod;
        else if (Main_values.Main_Go === Main_HistoryClip) inUseObj = HistoryClip;

        Screens_StartLoad();
    }
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
        AddCode_refreshTokens(0, 0, Screens_loadDataRequestStart, Screens_loadDatafail);
    } else if (xmlHttp.status === 410 && inUseObj.screen === Main_games) {
        inUseObj.setHelix();
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
                AddCode_refreshTokens(0, 0, Screens_loadDataRequestStart, Screens_loadDatafail);
            } else if (xmlHttp.status === 410 && inUseObj.screen === Main_games) {
                inUseObj.setHelix();
            } else {
                calbackError();
            }
        }
    };

    xmlHttp.send(null);
}

function BaseAndroidHlsGet(theUrl, callbackSucess, calbackError) {
    var xmlHttp;

    try {
        xmlHttp = Android.mreadUrlHLS(theUrl);
    } catch (e) {}

    if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
    else {
        calbackError();
        return;
    }

    try {

        if (JSON.parse(xmlHttp.responseText).hasOwnProperty('status'))
            calbackError();
        else
            callbackSucess(xmlHttp.responseText);

    } catch (e) {}
}

var Main_Headers_Back = [
    [Main_clientIdHeader, Main_Fix + Main_Hash + Main_Force]
];

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

function Main_ReplaceLargeFont(text) {
    return text.replace(/[^\x00-\x7F]/g, function(match) {
        return '<span style="font-size: 0.8em;">' + match + '</span>';
    });
}

function Main_Set_history(type) {
    if (type === 'live' && HistoryLive.histPosX[1]) return;
    if (type === 'vod' && HistoryVod.histPosX[1]) return;
    if (type === 'clip' && HistoryClip.histPosX[1]) return;

    if (AddUser_IsUserSet() && Main_values_Play_data) {
        var index = Main_history_Exist(type, Main_values_Play_data[7]);

        if (index > -1) {

            //Use Screens_assign() to change only obj that has changed
            Main_values_History_data[AddUser_UsernameArray[0].id][type][index] = Screens_assign(
                Main_values_History_data[AddUser_UsernameArray[0].id][type][index],
                {
                    data: Main_values_Play_data,
                    date: new Date().getTime(),
                    game: Main_values_Play_data[3],
                    views: Main_values_Play_data[13]
                }
            );

        } else {
            //Limit size to 1000
            if (Main_values_History_data[AddUser_UsernameArray[0].id][type].length > 999)
                Main_values_History_data[AddUser_UsernameArray[0].id][type].splice(0, 1);

            Main_values_History_data[AddUser_UsernameArray[0].id][type].push(
                {
                    data: Main_values_Play_data,
                    date: new Date().getTime(),
                    name: Main_values_Play_data[6].toLowerCase(),
                    game: Main_values_Play_data[3],
                    id: Main_values_Play_data[7],
                    views: Main_values_Play_data[13],
                    watched: 0
                }
            );

            if (type === 'live') {
                //Sort live by id this allows to always show the newst first even by sorting by othrs tipe
                //this allows to get with are alredy VOD easier when there is more then one broadcast for the same streamer
                Main_values_History_data[AddUser_UsernameArray[0].id][type].sort(
                    function(a, b) {
                        return (a.id > b.id ? -1 : (a.id < b.id ? 1 : 0));
                    }
                );
            }

            Main_setItem('Main_values_History_data', JSON.stringify(Main_values_History_data));
            console.log(Main_values_History_data);
        }
    }
}

function Main_history_Exist(type, id) {

    for (var index = 0; index < Main_values_History_data[AddUser_UsernameArray[0].id][type].length; index++)
        if (Main_values_History_data[AddUser_UsernameArray[0].id][type][index].id === id) return index;

    return -1;
}

function Main_history_UpdateLive(id, game, title, views) {
    if (!AddUser_IsUserSet() || HistoryLive.histPosX[1]) return;

    var index = Main_history_Exist('live', id);

    if (index > -1) {

        //Use Screens_assign() to change only obj that has changed
        Main_values_History_data[AddUser_UsernameArray[0].id].live[index] = Screens_assign(
            Main_values_History_data[AddUser_UsernameArray[0].id].live[index],
            {
                date: new Date().getTime(),
                game: game,
                views: views,
            }
        );

        //Some values will change as the stream updates or as the streames goes offline and online again
        Main_values_History_data[AddUser_UsernameArray[0].id].live[index].data[2] = title;
        Main_values_History_data[AddUser_UsernameArray[0].id].live[index].data[3] = game;
        Main_values_History_data[AddUser_UsernameArray[0].id].live[index].data[4] = STR_FOR + Main_addCommas(views) + STR_SPACE + STR_VIEWER;
        Main_values_History_data[AddUser_UsernameArray[0].id].live[index].data[11] =
            STR_SINCE + Play_streamLiveAt(Main_values_History_data[AddUser_UsernameArray[0].id].live[index].data[12]) + STR_SPACE;

        Main_setItem('Main_values_History_data', JSON.stringify(Main_values_History_data));
        console.log(Main_values_History_data);
    }
}

function Main_history_UpdateLiveVod(id, vod, vod_img) {
    if (!AddUser_IsUserSet() || HistoryLive.histPosX[1]) return;

    var index = Main_history_Exist('live', id);

    if (index > -1) {

        //Use Screens_assign() to change only obj that has changed
        Main_values_History_data[AddUser_UsernameArray[0].id].live[index] = Screens_assign(
            Main_values_History_data[AddUser_UsernameArray[0].id].live[index],
            {
                vodid: vod,
                vodimg: vod_img,
            }
        );
        Main_setItem('Main_values_History_data', JSON.stringify(Main_values_History_data));
        console.log(Main_values_History_data);
    }
}

function Main_history_UpdateVod(id, time) {
    if (!AddUser_IsUserSet() || HistoryVod.histPosX[1]) return;

    var index = Main_history_Exist('vod', id);

    if (index > -1) {

        //Use Screens_assign() to change only obj that has changed
        Main_values_History_data[AddUser_UsernameArray[0].id].vod[index] = Screens_assign(
            Main_values_History_data[AddUser_UsernameArray[0].id].vod[index],
            {
                date: new Date().getTime(),
                watched: time
            }
        );
        Main_setItem('Main_values_History_data', JSON.stringify(Main_values_History_data));
        console.log(Main_values_History_data);
    }
}

function Main_history_UpdateClip(id, time) {
    if (!AddUser_IsUserSet() || HistoryClip.histPosX[1]) return;

    var index = Main_history_Exist('clip', id);

    if (index > -1) {

        //Use Screens_assign() to change only obj that has changed
        Main_values_History_data[AddUser_UsernameArray[0].id].clip[index] = Screens_assign(
            Main_values_History_data[AddUser_UsernameArray[0].id].clip[index],
            {
                date: new Date().getTime(),
                watched: time
            }
        );
        Main_setItem('Main_values_History_data', JSON.stringify(Main_values_History_data));
        console.log(Main_values_History_data);
    }
}

function Main_Restore_history() {
    Main_values_History_data = Screens_assign(Main_values_History_data, Main_getItemJson('Main_values_History_data', {}));
    console.log(Main_values_History_data);
}

function Main_History_Sort(array, msort, direction) {
    if (direction) {//a-z
        array.sort(
            function(a, b) {
                return (a[msort] < b[msort] ? -1 : (a[msort] > b[msort] ? 1 : 0));
            }
        );
    } else {//z-a
        array.sort(
            function(a, b) {
                return (a[msort] > b[msort] ? -1 : (a[msort] < b[msort] ? 1 : 0));
            }
        );
    }
}

function Main_Slice(arrayTocopy) {
    var array = [];
    //slice may crash RangeError: Maximum call stack size exceeded
    for (var i = 0; i < arrayTocopy.length; i++) {
        array.push(arrayTocopy[i]);
    }
    return array;
}