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
    "Chat_font_size": 2,
    "ChatBackground": 12,
    "IsRerun": false,
    "Main_selectedChannelPartner": false,
    "Sidepannel_Pos": 2,
    "Sidepannel_IsUser": false,
    "My_channel": false,
    "DeviceCheckNew": false,
    "Never_run_phone": true,
    "Codec_is_Check": false,
    "check_pp_workaround": true,
    "OS_is_Check": false,
    "Restore_Backup_Check": false,
};

var Main_values_Play_data;
var Main_values_History_data = {};//The obj is defined in AddUser_RestoreUsers()
var Main_Force = "4mv6wki5h1ko";
var Main_LastClickFinish = true;
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

var Main_stringVersion = '3.0';
var Main_stringVersion_Min = '.167';
var Main_minversion = 'April 7, 2020';
var Main_versionTag = Main_stringVersion + Main_stringVersion_Min + '-' + Main_minversion;
var Main_IsOnAndroidVersion = '';
var Main_AndroidSDK = 1000;
var Main_ClockOffset = 0;
var Main_IsOnAndroid = 0;
var Main_randomimg = '?' + Math.random();
var Main_updateUserFeedId;
var Main_Fix = "kimne78kx3";
var Main_DoRestore = true;
var Main_CanBackup = false;
var Main_UserBackupFile = 'user.json';
var Main_HistoryBackupFile = 'history.json';
var Main_Scene1Doc;
var Main_Scene2Doc;
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
            if (Main_A_includes_B(window.location.href, 'asset')) {
                //Same as in smartTwitchTV/release/api.js
                //The app is running from assets need to expose smartTwitchTV
                smartTwitchTV = {
                    'mainstart': Main_Start,
                    'Play_PannelEndStart': Play_PannelEndStart,
                    'Play_PlayerCheck': Play_PlayerCheck,
                    'Play_UpdateDuration': Play_UpdateDuration,
                    'PlayExtra_End': PlayExtra_End,
                    'Play_MultiEnd': Play_MultiEnd,
                    'Play_CheckIfIsLiveClean': Play_CheckIfIsLiveClean,
                    'UserLiveFeed_CheckIfIsLiveResult': UserLiveFeed_CheckIfIsLiveResult,
                    'Sidepannel_CheckIfIsLiveResult': Sidepannel_CheckIfIsLiveResult,
                    'Main_CheckStop': Main_CheckStop,
                    'Main_CheckResume': Main_CheckResume,
                    'Play_getQualities': Play_getQualities,
                    'Play_ShowVideoStatus': Play_ShowVideoStatus,
                    'Play_ShowVideoQuality': Play_ShowVideoQuality,
                    'PlayVod_previews_success': PlayVod_previews_success,
                    'Play_PlayPauseChange': Play_PlayPauseChange
                };
            }
            Main_IsOnAndroid = Android.getAndroid();
            Main_IsOnAndroidVersion = Android.getversion();
        } catch (e) {
            Main_IsOnAndroidVersion = '1.0.0';
            Main_IsOnAndroid = 0;
            document.body.style.backgroundColor = "rgba(0, 0, 0, 1)";
            Main_isDebug = true;
            console.log('Main_isReleased: ' + Main_isReleased);
            console.log('Main_isDebug: ' + Main_isDebug);
            console.log('Main_isBrowser: ' + !Main_IsOnAndroid);
            //If we add the class on the android app for some reason it prevents input from release the focus
            Main_AddClass('scenefeed', 'feed_screen_input');
            //When esc is clicked from android app a duple KEYCODE_BACK is send... prevent it
            KEY_RETURN = 27;
        }
        Main_showLoadDialog();

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

        //if (Main_A_includes_B(lang, 'pt_')) pt_BRLang();
        //else if (Main_A_includes_B(lang, 'it_')) it_ITLang();

        console.log("language is " + language);
        DefaultLang();

        if (Main_A_includes_B(window.location.href, 'code')) processCode(window.location.href);

        Main_SearchInput = document.getElementById("search_input");
        Main_AddUserInput = document.getElementById("user_input");
        Main_Scene1Doc = document.getElementById('scene1');
        Main_Scene2Doc = document.getElementById('scene2');

        Main_RestoreValues();

        Main_DoRestore = AddUser_RestoreUsers();

        if (!Main_values.Restore_Backup_Check) {

            try {
                Android.requestWr();
                Main_HideLoadDialog();
                Main_innerHTML("main_dialog_remove", STR_BACKUP);
                Main_textContent('remove_cancel', STR_NO);
                Main_textContent('remove_yes', STR_YES);
                Main_ShowElement('main_remove_dialog');
                Main_values.Restore_Backup_Check = true;
                document.body.addEventListener("keydown", Main_BackupDialodKeyDown, false);
            } catch (e) {
                window.setTimeout(Main_initWindows, 500);
                return;
            }
        } else window.setTimeout(Main_initWindows, 500);

    });

}

function Main_BackupDialodKeyDown(event) {
    switch (event.keyCode) {
        case KEY_LEFT:
            Users_RemoveCursor--;
            if (Users_RemoveCursor < 0) Users_RemoveCursor = 1;
            Users_RemoveCursorSet();
            break;
        case KEY_RIGHT:
            Users_RemoveCursor++;
            if (Users_RemoveCursor > 1) Users_RemoveCursor = 0;
            Users_RemoveCursorSet();
            break;
        case KEY_ENTER:
            Main_showLoadDialog();
            Main_HideElement('main_remove_dialog');
            document.body.removeEventListener("keydown", Main_BackupDialodKeyDown);
            if (Users_RemoveCursor && !Main_DoRestore) Main_initRestoreBackups();
            else Main_initWindows();
            break;
        default:
            break;
    }
}

function Main_initRestoreBackups() {
    try {

        if (Android.HasBackupFile(Main_UserBackupFile)) {

            var tempBackup = Android.RestoreBackupFile(Main_UserBackupFile);

            if (tempBackup !== null) {
                var tempBackupArray = JSON.parse(tempBackup) || [];

                if (tempBackupArray.length > 0) {
                    Main_setItem('AddUser_UsernameArray', tempBackup);

                    tempBackup = Android.RestoreBackupFile(Main_HistoryBackupFile);
                    if (tempBackup !== null) Main_setItem('Main_values_History_data', tempBackup);

                    AddUser_RestoreUsers();
                }
            }

        }

        Main_initWindows();
    } catch (e) {
        Main_initWindows();
    }
}

function Main_initWindows() {
    try {
        Main_CanBackup = Android.canBackupFile();

        //Backup at start as a backup may never be done yet
        if (Main_CanBackup) {
            Android.BackupFile(Main_UserBackupFile, JSON.stringify(AddUser_UsernameArray));
            window.setTimeout(function() {
                Android.BackupFile(Main_HistoryBackupFile, JSON.stringify(Main_values_History_data));
            }, 10000);
        }

    } catch (e) {
        Main_CanBackup = false;
    }

    Users_RemoveCursor = 0;
    Users_RemoveCursorSet();

    if (Main_IsOnAndroid) {

        if (!Main_values.DeviceCheckNew) {

            Main_values.DeviceCheckNew = true;
            var device = Android.getDevice();
            var Manufacturer = Android.getManufacturer();
            device = device ? device.toLowerCase() : "";
            Manufacturer = Manufacturer ? Manufacturer.toLowerCase() : "";

            if (Main_A_includes_B(device, 'shield android tv') ||
                Main_A_includes_B(Manufacturer, 'nvidia')) {
                //Some devices are very slow and are affected by some app default setting Nvidia shield is not

                //bitrate to max possible
                Settings_value.bitrate_min.defaultValue = 0;
                Main_setItem('bitrate_min', 1);
                Android.SetSmallPlayerBandwidth(0);

                //enable small player over feed on multi
                Settings_value.disable_feed_player_multi.defaultValue = 0;
                Main_setItem('disable_feed_player_multi', 1);
                UserLiveFeed_DisableSmallPlayerMulti = 0;

                //Enable app animations
                Settings_ForceEnableAimations();
            }
        }

        //Disable googles OMX.google.h264.decoder if another codec is available
        //Check if at least one none google codec is available
        if (!Main_values.Codec_is_Check) {
            var getcodec = null;
            try {
                getcodec = JSON.parse(Android.getcodecCapabilities('avc'));
            } catch (e) {}

            if (getcodec) {

                Main_values.Codec_is_Check = true;

                if (getcodec.length > 1) {
                    var codecsnames = [];

                    for (var i = 0; i < getcodec.length; i++) {

                        if (Main_A_includes_B(getcodec[i].name ? getcodec[i].name.toLowerCase() : "", 'google'))
                            codecsnames.push(getcodec[i].name);

                    }

                    if (codecsnames.length === 1) {

                        Main_setItem(codecsnames[0], 1);
                        Main_setItem('Settings_DisableCodecsNames', JSON.stringify(codecsnames));

                        Android.setBlackListMediaCodec(codecsnames.join());

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

    } else Settings_ForceEnableAimations();

    Main_SetStringsMain(true);

    Main_GoBefore = Main_values.Main_Go;

    Main_ready(function() {
        Chat_Preinit();
        Play_PreStart();
        UserLiveFeed_Prepare();

        if (AddUser_UserIsSet()) {
            Main_updateUserFeedId = window.setInterval(Main_updateUserFeed, 600000);
        }
        Screens_InitScreens();

        document.getElementById("side_panel").style.transform = '';
        document.getElementById("user_feed_notify").style.transform = '';

        Main_checkVersion();

        Main_SetStringsSecondary();

        Play_MakeControls();
        Play_SetControls();
        Play_SetFullScreen(Play_isFullScreen);

        Main_updateclockId = window.setInterval(Main_updateclock, 60000);
        Main_StartHistoryworkerId = window.setInterval(Main_StartHistoryworker, 1000 * 60 * 10);//Check it 30min
        Main_CheckResumeVodsId = window.setTimeout(Main_StartHistoryworker, 12000);
        Main_CheckResumeFeedId = window.setTimeout(Main_updateUserFeed, 10000);

        inUseObj = Live;
        Main_ready(function() {
            Screens_init();
            Sidepannel_UpdateThumbDoc = document.getElementById("feed_thumb_img");
        });
    });
}

function Main_SetStringsMain(isStarting) {
    Main_updateclock();
    Main_Setworker();
    Main_SetHistoryworker();

    //set top bar labels
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);
    Main_innerHTML('label_update', '<div style="vertical-align: middle; display: inline-block;"><i class="icon-update" style="color: #FF0000;"></i></div><div style="vertical-align: middle; display: inline-block; color: #FF0000">' + STR_SPACE + STR_UPDATE_AVAILABLE + '</div>');

    Main_IconLoad('label_thumb', 'icon-options', STR_THUMB_OPTIONS_TOP);
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

    Main_innerHTML('channel_content_titley_0', '<i class="icon-movie-play stream_channel_follow_icon"></i>' + STR_SPACE + STR_SPACE + STR_VIDEOS);
    Main_innerHTML('channel_content_titley_1', '<i class="icon-movie stream_channel_follow_icon"></i>' + STR_SPACE + STR_SPACE + STR_CLIPS);
    Main_innerHTML('channel_content_titley_2', '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; "></i>' + STR_SPACE + STR_SPACE + STR_FOLLOW);

    Main_innerHTML("dialog_os_text", STR_PP_WARNIG + STR_BR + STR_BR + STR_DIV_TITLE + STR_CLOSE_THIS2 + '</div>');

    Main_textContent("dialog_hist_setting_name_0", STR_SORTING);
    Main_textContent("dialog_hist_setting_name_1", STR_ENABLE);
    Main_textContent("dialog_hist_setting_name_2", STR_DELETE_HISTORY);
    Main_textContent('dialog_hist_val_2', STR_PRESS_ENTER_D);
    Main_textContent('dialog_hist_text_end', STR_PRESS_ENTER_APPLY);

    Main_textContent('dialog_opt_text', STR_THUMB_OPTIONS);
    Main_textContent('dialog_opt_text_end', STR_THUMB_OPTIONS_KEY);

    Main_textContent('dialog_thumb_opt_setting_name_-1', STR_DELETE_FROM_HISTORY);
    Main_textContent('dialog_thumb_opt_val_-1', STR_PRESS_ENTER_D);

    Main_textContent('dialog_thumb_opt_setting_name_0', STR_OPEN_CHANNEL);
    Main_textContent('dialog_thumb_opt_setting_name_1', STR_OPEN_GAME);
    Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_LIVE_DIS);
    Main_textContent('dialog_thumb_opt_setting_name_4', STR_CONTENT_LANG);
    Main_textContent('dialog_thumb_opt_setting_name_5', STR_GO_TO);

    Main_innerHTML("dialog_multi_help_text", STR_CONTROLS_MULTI);
}

var Main_initClickDoc = [
    "clickup", "clickdown", "clickleft", "clickright", "clickenter", "clickback",
    "clickpgup", "clickpgdown", "clickfeed"];
var Main_setHideButtonsId;
var Main_scenekeysDoc;
var Main_scenekeysPositionDoc;
var Main_isTV;

function Main_initClick() {
    if (Main_IsOnAndroid) {
        Main_isTV = Android.deviceIsTV();
        //Only show virtual d-pad on none TV devices
        if (Main_isTV) return;
    } else return;

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

        if (Main_IsOnAndroid) Android.keyEvent(pos, 1);
        else console.log("pointerup key " + Main_initClickDoc[pos] + " even " + 1);
    };
}

function Main_ClickonpointerdownClear() {
    window.clearTimeout(Main_initClickTimeoutId);
    window.clearInterval(Main_initClickSetId);
}

function Main_Clickonpointerdown(pos) {
    if (Main_IsOnAndroid) Android.keyEvent(pos, 0);
    else console.log("pointerdown key " + Main_initClickDoc[pos] + " even " + 0);
}

function Main_IconLoad(lable, icon, string) {
    Main_innerHTML(lable, '<div style="vertical-align: middle; display: inline-block; transform: translateY(15%);"><i class="' + icon + '" style="color: #FFFFFF;"></i></div><div style="vertical-align: middle; display: inline-block; transform: translateY(10%);">' + STR_SPACE + string + '</div>');
}

function Main_HideElement(element) {
    Main_HideElementWithEle(document.getElementById(element));
}

function Main_HideElementWithEle(element) {
    element.classList.add('hide');
}

function Main_ShowElement(element) {
    Main_ShowElementWithEle(document.getElementById(element));
}

function Main_ShowElementWithEle(element) {
    element.classList.remove('hide');
}

function Main_isElementShowing(element) {
    return Main_isElementShowingWithEle(document.getElementById(element));
}

function Main_isElementShowingWithEle(element) {
    return !Main_A_includes_B(element.className, 'hide');
}

function Main_AddClass(element, mclass) {
    Main_AddClassWitEle(document.getElementById(element), mclass);
}

function Main_AddClassWitEle(element, mclass) {
    element.classList.add(mclass);
}

function Main_RemoveClass(element, mclass) {
    Main_RemoveClassWithEle(document.getElementById(element), mclass);
}

function Main_RemoveClassWithEle(element, mclass) {
    element.classList.remove(mclass);
}

function Main_innerHTML(div, value) {
    Main_innerHTMLWithEle(document.getElementById(div), value);
}

function Main_innerHTMLWithEle(ele, value) {
    ele.innerHTML = value;
}

function Main_textContent(div, value) {
    Main_textContentWithEle(document.getElementById(div), value);
}

function Main_textContentWithEle(ele, value) {
    ele.textContent = value;
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
    if (Main_IsOnAndroid) Android.mshowLoading(true);
    else Main_ShowElement('dialog_loading');
}

function Main_HideLoadDialog() {
    if (Main_IsOnAndroid) Android.mshowLoading(false);
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
    Main_SwitchScreen();
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
    Main_innerHTML('about_runningtime', STR_RUNNINGTIME + STR_SPACE + Play_timeDay((new Date().getTime()) - Main_RunningTime));
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
    if (!value) return value;
    return (value + '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Main_videoqualitylang(video_height, average_fps, language) {
    video_height = video_height + ''; //stringfy doesnot work 8|
    if (!video_height.indexOf('x')) video_height = video_height.slice(-3);

    average_fps = Main_Calculatefps(average_fps);

    return video_height + 'p' + average_fps + ((language !== "") ? ' [' + language.toUpperCase() + ']' : '');
}

function Main_Calculatefps(fps) {
    if (fps > 58) return 60;
    else if (fps < 32) return 30;

    return Math.ceil(fps);
}

function Main_is_rerun(content) {
    return !Main_A_includes_B(content + '', 'live');
}

function Main_ThumbNull(y, x, thumbnail) {
    return document.getElementById(thumbnail + y + '_' + x) !== null;
}

var Main_Switchobj = {
    // way not?... 'computed property names' is only available in ES6 (use 'esversion: 6').
    //    [Main_Users]: Users_init
};

Main_Switchobj[Main_Users] = {
    obj: function() {},
    start_fun: Users_StartLoad,
    init_fun: Users_init,
    key_fun: Users_handleKeyDown,
    exit_fun: Users_exit
};
Main_Switchobj[Main_ChannelContent] = {
    obj: function() {},
    start_fun: ChannelContent_StartLoad,
    init_fun: ChannelContent_init,
    key_fun: ChannelContent_handleKeyDown,
    exit_fun: ChannelContent_exit
};

Main_Switchobj[Main_SearchChannels] = {
    obj: function() {
        inUseObj = SearchChannels;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_SearchLive] = {
    obj: function() {
        inUseObj = SearchLive;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_SearchGames] = {
    obj: function() {
        inUseObj = SearchGames;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_UserChannels] = {
    obj: function() {
        inUseObj = UserChannels;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_UserLive] = {
    obj: function() {
        inUseObj = UserLive;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_UserHost] = {
    obj: function() {
        inUseObj = UserHost;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_usergames] = {
    obj: function() {
        inUseObj = UserGames;
    },
    start_fun: function() {
        this.obj();
        if (!UserGames.loadingData) UserGames.key_refresh();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_ChannelVod] = {
    obj: function() {
        inUseObj = ChannelVod;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_UserVod] = {
    obj: function() {
        inUseObj = UserVod;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_Live] = {
    obj: function() {
        inUseObj = Live;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_Featured] = {
    obj: function() {
        inUseObj = Featured;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_AGameClip] = {
    obj: function() {
        inUseObj = AGameClip;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_AGameVod] = {
    obj: function() {
        inUseObj = AGameVod;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_Clip] = {
    obj: function() {
        inUseObj = Clip;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_Vod] = {
    obj: function() {
        inUseObj = Vod;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_ChannelClip] = {
    obj: function() {
        inUseObj = ChannelClip;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_aGame] = {
    obj: function() {
        inUseObj = AGame;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_games] = {
    obj: function() {
        inUseObj = Game;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_HistoryLive] = {
    obj: function() {
        inUseObj = HistoryLive;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_HistoryVod] = {
    obj: function() {
        inUseObj = HistoryVod;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit
};
Main_Switchobj[Main_HistoryClip] = {
    obj: function() {
        inUseObj = HistoryClip;
    },
    start_fun: function() {
        this.obj();
        Screens_StartLoad();
    },
    init_fun: Screens_init,
    key_fun: Screens_handleKeyDown,
    exit_fun: Screens_exit,
};

function Main_ReStartScreens() {
    Main_updateclock();
    Main_SwitchScreen();
}

function Main_SwitchScreen(removekey) {
    Main_HideWarningDialog();
    if (Main_values.Main_Go !== Main_ChannelContent) Main_values.Main_BeforeChannelisSet = false;
    if (Main_values.Main_Go !== Main_aGame) Main_values.Main_BeforeAgameisSet = false;

    Main_CounterDialogRst();

    if (Main_Switchobj[Main_values.Main_Go]) {
        Main_Switchobj[Main_values.Main_Go].obj();
        Main_Switchobj[Main_values.Main_Go].init_fun();
    } else {
        Main_Switchobj[1].obj();
        Main_Switchobj[1].init_fun();
    }

    if (removekey) document.body.removeEventListener("keydown", Main_Switchobj[Main_values.Main_Go].key_fun);
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
    Main_setItem('Play_data', JSON.stringify(Play_data));
}

function Main_RestoreValues() {
    Main_values = Screens_assign(Main_values, Main_getItemJson('Main_values', {}));
    Play_data = Screens_assign(Play_data, Main_getItemJson('Play_data', {}));
}

function Main_ExitCurrent(ExitCurrent) {
    if (Main_Switchobj[ExitCurrent].exit_fun) Main_Switchobj[ExitCurrent].exit_fun();
    if (Main_isElementShowing('settings_holder')) Settings_exit();
}

function Main_RestoreTopLabel() {
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);
    Main_IconLoad('label_thumb', 'icon-options', STR_THUMB_OPTIONS_TOP);
}

function Main_cleanTopLabel() {
    Main_IconLoad('label_thumb', 'icon-return', STR_GOBACK);
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

//TODO remove this check after some app updates
var Main_oldReturnCheck;
function Main_checkVersion() {
    if (Main_IsOnAndroid) {
        var device = Android.getDevice();
        var Webviewversion = Android.getWebviewVersion();
        console.log('Webviewversion ' + Webviewversion);

        Main_versionTag = "Apk: " + Main_IsOnAndroidVersion + ' Web: ' + Main_minversion +
            (Webviewversion ? (' Webview: ' + Webviewversion) : '') + ' Device: ' + device;

        if (Main_needUpdate(Main_IsOnAndroidVersion)) {
            //Temp to support old app version that used number 1 key as back key
            if (Main_oldReturnCheck) KEY_RETURN = 49;
            Main_ShowElement('label_update');
        }
    }

    Main_innerHTML("dialog_about_text", STR_ABOUT_INFO_HEADER + Main_versionTag +
        STR_BR + '<span id="about_runningtime"></span>' + STR_ABOUT_INFO_0);

    Main_RunningTime = new Date().getTime();
}

function Main_needUpdate(version) {
    version = version.split(".");
    Main_oldReturnCheck = parseInt(version[2]) < 118;
    return (parseFloat(version[0] + '.' + version[1]) < parseFloat(Main_stringVersion)) ||
        (parseInt(version[2]) < parseInt(Main_stringVersion_Min.split(".")[1]));
}

function Main_empty(el) {
    Main_emptyWithEle(document.getElementById(el));
}

function Main_emptyWithEle(el) {
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

//"keyClickDelay, keyClickDelayStart and Main_CantClick" are here to prevent races during click and hold
//That can cause visual glitches and make the user lost sense on were the focus is
//Or cause the app to keep moving up/down seconds after the key has be released
function Main_keyClickDelay() {
    Main_LastClickFinish = true;
}

function Main_keyClickDelayStart() {
    Main_LastClickFinish = false;
    window.setTimeout(Main_keyClickDelay);
}

function Main_CantClick() {
    return !Main_LastClickFinish;
}

function Main_ThumbOpenIsNull(id, thumbnail) {
    return document.getElementById(thumbnail + id) === null;
}

function Main_OpenLiveStream(id, idsArray, handleKeyDownFunction, checkHistory) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    document.body.removeEventListener("keydown", handleKeyDownFunction);
    Main_values_Play_data = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));
    Play_data.data = Main_values_Play_data;

    if (checkHistory) {

        var index = Main_history_Exist('live', Main_values_Play_data[7]);

        if (index > -1) {

            if (Main_values_History_data[AddUser_UsernameArray[0].id].live[index].forceVod) {

                Main_OPenAsVod(index);
                return;

            } else if (Main_A_includes_B(document.getElementById(idsArray[1] + id).src, 's3_vods')) {

                Main_CheckBroadcastID(index, idsArray[3] + id);
                return;

            } else {//is live check is is really

                if (Main_values_History_data[AddUser_UsernameArray[0].id].live[index].vodid) Main_CheckBroadcastID(index, idsArray[3] + id);
                else Main_openStream();

                return;
            }

        }
    }

    Main_values.Play_isHost = Main_A_includes_B(Play_data.data[1], STR_USER_HOSTING);

    if (Main_values.Play_isHost) {
        Play_data.DisplaynameHost = document.getElementById(idsArray[3] + id).textContent;
        Play_data.data[1] = Play_data.DisplaynameHost.split(STR_USER_HOSTING)[1];
    }

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
    var theUrl = Main_kraken_api + 'streams/' + Play_data.data[14] + Main_TwithcV5Flag_I;
    BasexmlHttpGet(theUrl, 3000, 2, null, Main_CheckBroadcastIDStartSucess, Main_CheckBroadcastIDStartError, false);
}

function Main_CheckBroadcastIDStartSucess(response) {
    response = JSON.parse(response);
    if (response.stream !== null) {
        if (Main_values_Play_data[7] === response.stream._id) {
            Main_openStream();
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
    } else Main_openStream();
}

function Main_showScene1Doc() {
    Main_ShowElementWithEle(Main_Scene1Doc);
}

function Main_hideScene1Doc() {
    Main_HideElementWithEle(Main_Scene1Doc);
}

function Main_isScene1DocShown() {
    return Main_isElementShowingWithEle(Main_Scene1Doc);
}

function Main_showScene2Doc() {
    Main_ShowElementWithEle(Main_Scene2Doc);
}

function Main_hideScene2Doc() {
    Main_HideElementWithEle(Main_Scene2Doc);
}

function Main_isScene2DocShown() {
    return Main_isElementShowingWithEle(Main_Scene2Doc);
}

function Main_OPenAsVod(index) {
    if (!Main_values_History_data[AddUser_UsernameArray[0].id].live[index].vodid) {
        Main_openStream();
        return;
    }

    Main_values.Main_selectedChannelDisplayname = Main_values_Play_data[1];
    Main_values.Main_selectedChannel = Main_values_Play_data[6];
    Main_values.Main_selectedChannelLogo = Main_values_Play_data[9];
    Main_values.Main_selectedChannelPartner = Main_values_Play_data[10];
    Main_values.Main_selectedChannel_id = Main_values_Play_data[14];
    Play_DurationSeconds = 0;

    Main_values.ChannelVod_vodId = Main_values_History_data[AddUser_UsernameArray[0].id].live[index].vodid;
    Main_values.vodOffset =
        ((Main_values_History_data[AddUser_UsernameArray[0].id].live[index].date - (new Date(Main_values_Play_data[12]).getTime())) / 1000);

    if (Main_values.vodOffset < 0) Main_values.vodOffset = 1;

    if (Play_isOn) {
        Main_OPenAsVod_shutdownStream();

    }
    Play_showWarningDialog(STR_LIVE_VOD);
    Main_openVod();

    window.setTimeout(function() {
        if (!Play_IsWarning) Play_HideWarningDialog();
    }, 3000);
}

function Main_OPenAsVod_shutdownStream() {
    Main_OPenAsVod_PreshutdownStream(true);
    Play_data.qualities = [];
    Main_values.Play_WasPlaying = 0;

    if (AddUser_UserIsSet()) {
        AddCode_IsFollowing = false;
        Play_setFollow();
    } else Play_hideFollow();

    PlayExtra_HideChat();
    UserLiveFeed_PreventHide = false;
    PlayVod_ProgresBarrUpdate(0, 0);
}

function Main_OPenAsVod_PreshutdownStream() {
    if (Main_IsOnAndroid) {
        //We are closing the player on error or on end
        Android.mClearSmallPlayer();
        Android.stopVideo(1);
    }

    Play_isOn = false;
    if (Play_MultiEnable) Play_controls[Play_MultiStream].enterKey(false);

    if (!Play_isEndDialogVisible() || true) UserLiveFeed_Hide();

    Play_ClearPlay(true);
    Play_ClearPlayer();
}

function Main_openStream() {
    Main_hideScene1Doc();
    document.body.removeEventListener("keydown", Play_handleKeyDown);
    document.body.addEventListener("keydown", Play_handleKeyDown, false);
    Main_showScene2Doc();
    Play_hidePanel();
    if (!Play_EndDialogEnter) Play_HideEndDialog();
    window.setTimeout(Play_Start, 25);
}

function Main_OpenClip(id, idsArray, handleKeyDownFunction) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    Main_hideScene1Doc();
    document.body.removeEventListener("keydown", handleKeyDownFunction);
    Main_values_Play_data = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));

    ChannelClip_playUrl = Main_values_Play_data[0];
    Play_DurationSeconds = parseInt(Main_values_Play_data[1]);
    Main_values.Main_selectedChannel_id = Main_values_Play_data[2];

    Play_data.data[3] = Main_values_Play_data[3];
    if (Play_data.data[3] === null) Play_data.data[3] = "";
    ChannelClip_game = (Play_data.data[3] !== "" && Play_data.data[3] !== null ? STR_PLAYING + Play_data.data[3] : "");

    Main_values.Main_selectedChannelDisplayname = Main_values_Play_data[4];
    Main_values.Main_selectedChannelLogo = Main_values_Play_data[5];
    ChannelClip_Id = Main_values_Play_data[7];
    Main_values.Main_selectedChannel = Main_values_Play_data[6];
    Main_values.ChannelVod_vodId = Main_values_Play_data[8];
    ChannelVod_vodOffset = parseInt(Main_values_Play_data[9]);

    ChannelClip_title = Main_values_Play_data[10];
    ChannelClip_language = Main_values_Play_data[11];
    ChannelClip_createdAt = (Main_values_Play_data[16] ? Main_values_Play_data[16] : Main_values_Play_data[12]);//Old sorting fix
    ChannelClip_views = Main_values_Play_data[14];
    ChannelClip_playUrl2 = Main_values_Play_data[15].split("-preview")[0] + ".mp4";

    document.body.addEventListener("keydown", PlayClip_handleKeyDown, false);
    Main_showScene2Doc();
    Play_hideChat();
    Play_HideWarningDialog();
    Play_CleanHideExit();
    window.setTimeout(PlayClip_Start, 25);
}

function Main_OpenVodStart(id, idsArray, handleKeyDownFunction) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    document.body.removeEventListener("keydown", handleKeyDownFunction);
    Main_values_Play_data = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));

    Main_values.Main_selectedChannelDisplayname = Main_values_Play_data[1];
    ChannelVod_createdAt = Main_values_Play_data[2];

    Play_data.data[3] = Main_values_Play_data[3];
    if (Play_data.data[3] === null) Play_data.data[3] = "";
    ChannelVod_game = (Play_data.data[3] !== "" && Play_data.data[3] !== null ? STR_STARTED + STR_PLAYING + Play_data.data[3] : "");

    ChannelVod_views = Main_values_Play_data[4];

    Main_values.Main_selectedChannel = Main_values_Play_data[6];
    Main_values.ChannelVod_vodId = Main_values_Play_data[7];

    ChannelVod_language = Main_values_Play_data[9];
    ChannelVod_title = Main_values_Play_data[10];
    Play_DurationSeconds = parseInt(Main_values_Play_data[11]);

    Main_values.Main_selectedChannel_id = Main_values_Play_data[14];
    Main_values.Main_selectedChannelLogo = Main_values_Play_data[15];
    Main_values.Main_selectedChannelPartner = Main_values_Play_data[16];

    Main_openVod();
}

function Main_openVod() {
    Main_hideScene1Doc();
    document.body.addEventListener("keydown", PlayVod_handleKeyDown, false);
    Main_showScene2Doc();
    PlayVod_hidePanel();
    Play_hideChat();
    Play_CleanHideExit();
    window.setTimeout(PlayVod_Start, 25);
}

function Main_removeFocus(id, idArray) {
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
        Main_randomimg = '?' + parseInt(Math.random() * 100000);
        Screens_SetLastRefresh();
    }
}

function Main_updateUserFeed() {
    if (!document.hidden && AddUser_UserIsSet() && !UserLiveFeed_isFeedShow() &&
        !Sidepannel_isShowing() && !UserLiveFeed_loadingData) {
        UserLiveFeed_RefreshLive();
        UserLiveFeedobj_LiveFeedOldUserName = AddUser_UsernameArray[0].name;
    }
}

function Main_ExitDialog(event) {
    switch (event.keyCode) {
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
            if (!Main_IsOnAndroid || !Main_ExitCursor) Main_HideExitDialog();
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

    Main_Switchobj[Main_values.Main_Go].start_fun();
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
        CheckPage("?code=" + code);
        console.log('if code ' + code);
        Main_newUsercode = code;
    } else {
        console.log('else code ' + code);
        CheckPage('');
        Main_newUsercode = 0;
    }
}

//Redirect to assets if running from it
function CheckPage(pageUrlCode) {
    if (Main_IsOnAndroid) {
        var PageUrl = Android.mPageUrl();
        if (PageUrl) {
            if (!Main_A_includes_B(window.location.href, 'asset') && Main_A_includes_B(PageUrl, 'asset')) {
                Android.mloadUrl(PageUrl + pageUrlCode);
                return;
            }
        }
    }
}

function BasehttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, obj) {
    if (Main_IsOnAndroid) BaseAndroidhttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, obj);
    else BasexmlHttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, obj);
}

function BasehttpHlsGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, obj) {
    if (Main_IsOnAndroid) BaseAndroidhttpGet(theUrl, Timeout, 0, access_token, callbackSucess, calbackError, obj);
    else BasexmlHttpHlsGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, obj);
}

function BaseAndroidhttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, obj) {
    var xmlHttp = Android.mreadUrl(theUrl, Timeout, HeaderQuatity, access_token);

    if (xmlHttp) {

        xmlHttp = JSON.parse(xmlHttp);

        if (xmlHttp.status === 200) {
            callbackSucess(xmlHttp.responseText, obj);
        } else if (HeaderQuatity > 2 && (xmlHttp.status === 401 || xmlHttp.status === 403)) { //token expired
            AddCode_refreshTokens(0, 0, Screens_loadDataRequestStart, Screens_loadDatafail, obj);
        } else if (xmlHttp.status === 500 && Main_isScene1DocShown() && obj.screen === Main_usergames) {
            obj.key_refresh();
        } else {
            calbackError(obj);
        }

    } else {
        calbackError(obj);
    }

}

function BasexmlHttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, obj) {
    BasexmlHttpGetExtra(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, Main_Headers, obj);
}

function BasexmlHttpHlsGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, obj) {
    BasexmlHttpGetExtra(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, Main_Headers_Back, obj);
}

function BasexmlHttpGetExtra(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, HeaderArray, obj) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = Timeout;

    Main_Headers[2][1] = access_token;

    for (var i = 0; i < HeaderQuatity; i++)
        xmlHttp.setRequestHeader(HeaderArray[i][0], HeaderArray[i][1]);

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                callbackSucess(xmlHttp.responseText, obj);
            } else if (HeaderQuatity > 2 && (xmlHttp.status === 401 || xmlHttp.status === 403)) { //token expired
                AddCode_refreshTokens(0, 0, Screens_loadDataRequestStart, Screens_loadDatafail, obj);
            } else if (xmlHttp.status === 500) {
                if (Main_isScene1DocShown() && obj.screen === Main_usergames)
                    obj.key_refresh();
                else calbackError(obj);
            } else {
                calbackError(obj);
            }
        }
    };

    xmlHttp.send(null);
}

var Main_Headers = [
    [Main_clientIdHeader, Main_clientId],
    [Main_AcceptHeader, Main_TwithcV5Json],
    [Main_Authorization, null]
];

var Main_Headers_Back = [
    [Main_clientIdHeader, Main_Fix + Main_Hash + Main_Force],
    [Main_AcceptHeader, Main_TwithcV5Json],
    [Main_Authorization, null]
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
    if (!text) return '';

    return text.replace(/[^\x00-\x7F]/g, function(match) {
        return '<span style="font-size: 0.8em;">' + match + '</span>';
    });
}

function Main_Set_history(type, Data, skipUpdateDate) {

    if (!AddUser_IsUserSet() || !Data || (type === 'live' && HistoryLive.histPosX[1]) ||
        (type === 'vod' && HistoryVod.histPosX[1]) || (type === 'clip' && HistoryClip.histPosX[1])) return;

    var index = Main_history_Exist(type, Data[7]);

    if (index > -1) {

        var ArrayPos = Main_values_History_data[AddUser_UsernameArray[0].id][type][index];

        ArrayPos.data = Main_Slice(Data);
        ArrayPos.date = !skipUpdateDate ? new Date().getTime() : ArrayPos.date;
        ArrayPos.game = Data[3];
        ArrayPos.views = Data[13];

    } else {
        //Limit size to 1500
        if (Main_values_History_data[AddUser_UsernameArray[0].id][type].length > 1499) {

            //Sort by oldest first to delete the oldest
            Main_values_History_data[AddUser_UsernameArray[0].id][type].sort(
                function(a, b) {
                    return (a.date < b.date ? -1 : (a.date > b.date ? 1 : 0));
                }
            );

            Main_values_History_data[AddUser_UsernameArray[0].id][type].shift();
        }

        Main_values_History_data[AddUser_UsernameArray[0].id][type].push(
            {
                data: Main_Slice(Data),
                date: new Date().getTime(),
                name: Data[6] ? Data[6].toLowerCase() : "",
                game: Data[3],
                id: Data[7],
                views: Data[13],
                created_at: new Date(Data[12]).getTime(),
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

        Main_setHistoryItem();
    }

}

function Main_history_Exist(type, id) {

    for (var index = 0; index < Main_values_History_data[AddUser_UsernameArray[0].id][type].length; index++)
        if (Main_values_History_data[AddUser_UsernameArray[0].id][type][index].id === id) return index;

    return -1;
}

function Main_history_UpdateLiveVod(id, vod, vod_img) {
    if (!AddUser_IsUserSet() || HistoryLive.histPosX[1]) return;

    var index = Main_history_Exist('live', id);

    if (index > -1) {

        var ArrayPos = Main_values_History_data[AddUser_UsernameArray[0].id].live[index];

        ArrayPos.vodid = vod;
        ArrayPos.vodimg = vod_img;

        Main_setHistoryItem();
    }
}

function Main_history_UpdateVodClip(id, time, type) {
    if (!AddUser_IsUserSet() || (type === 'vod' && HistoryVod.histPosX[1]) ||
        (type === 'clip' && HistoryClip.histPosX[1])) return;

    var index = Main_history_Exist(type, id);

    if (index > -1) {

        var ArrayPos = Main_values_History_data[AddUser_UsernameArray[0].id][type][index];

        ArrayPos.date = new Date().getTime();
        ArrayPos.watched = time;

        Main_setHistoryItem();
    }
}

function Main_Restore_history() {
    Main_values_History_data = Screens_assign(Main_values_History_data, Main_getItemJson('Main_values_History_data', {}));
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

var Main_setHistoryItemId;
function Main_setHistoryItem() {
    window.clearTimeout(Main_setHistoryItemId);
    Main_setHistoryItemId = window.setTimeout(function() {

        var string = JSON.stringify(Main_values_History_data);
        Main_setItem('Main_values_History_data', string);
        if (Main_CanBackup) Android.BackupFile(Main_HistoryBackupFile, string);

    }, 5000);
}

//Only works on vectors, matrixs and etc need to use JSON.parse(JSON.stringify(array)) to prevent keeping the iner obj references
function Main_Slice(arrayTocopy) {
    var array;
    //slice may crash RangeError: Maximum call stack size exceeded
    try {
        array = arrayTocopy.slice();
    } catch (e) {
        array = [];
        for (var i = 0; i < arrayTocopy.length; i++) {
            array.push(arrayTocopy[i]);
        }
    }
    return array;
}

var Main_ImageLoaderWorker;
function Main_Setworker() {
    var blobURL = URL.createObjectURL(new Blob(['(',

        function() {
            this.addEventListener('message',
                function(event) {
                    var xmlHttp = new XMLHttpRequest();
                    xmlHttp.responseType = 'blob';
                    xmlHttp.open('GET', event.data, true);
                    xmlHttp.timeout = 3000;
                    xmlHttp.ontimeout = function() {};
                    xmlHttp.send();
                }
            );

        }.toString(),

        ')()'], {type: 'application/javascript'}));

    Main_ImageLoaderWorker = new Worker(blobURL);
}

function Main_A_includes_B(A, B) {
    return A ? A.includes(B) : false;
}

function Main_A_equals_B(A, B) {// jshint ignore:line
    return A === B;
}

function Main_A_equals_B_No_Case(A, B) {// jshint ignore:line
    return (A ? A.toLowerCase() : null) === (B ? B.toLowerCase() : null);
}

var BradcastCheckerWorker;
function Main_SetHistoryworker() {

    var blobURL2 = URL.createObjectURL(new Blob(['(',

        function() {
            this.addEventListener('message',
                function(event) {
                    var theUrl = 'https://api.twitch.tv/kraken/streams/' + event.data.data[14] + '?api_version=5';

                    var onload = function(obj) {

                        if (obj.status === 200) {
                            var response = JSON.parse(obj.responseText);

                            if (response.stream !== null) {
                                if (!Array.isArray(response.stream)) {

                                    if (obj.mData.data[7] !== response.stream._id) {
                                        this.postMessage(
                                            {
                                                data: obj.mData.data[7],
                                                ended: true
                                            }
                                        );
                                    } else {
                                        this.postMessage(
                                            {
                                                data: response.stream,
                                                ended: false
                                            }
                                        );
                                    }

                                }
                            } else {
                                this.postMessage(
                                    {
                                        data: obj.mData.data[7],
                                        ended: true
                                    }
                                );
                            }
                        }

                    };

                    var xmlHttp = new XMLHttpRequest();
                    xmlHttp.mData = event.data;

                    xmlHttp.open("GET", theUrl, true);
                    xmlHttp.timeout = 3000;

                    xmlHttp.setRequestHeader('Client-ID', '5seja5ptej058mxqy7gh5tcudjqtm9');
                    xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');

                    xmlHttp.onreadystatechange = function() {
                        if (xmlHttp.readyState === 4) onload(xmlHttp);
                    };

                    xmlHttp.send(null);

                }
            );

        }.toString(),

        ')()'], {type: 'application/javascript'}));

    BradcastCheckerWorker = new Worker(blobURL2);

    BradcastCheckerWorker.addEventListener('message',
        function(event) {
            if (event.data.ended) {
                var index = Main_history_Exist('live', event.data.data);

                if (index > -1) {

                    if (Main_values_History_data[AddUser_UsernameArray[0].id].live[index].vodid) {
                        Main_values_History_data[AddUser_UsernameArray[0].id].live[index] = Screens_assign(
                            Main_values_History_data[AddUser_UsernameArray[0].id].live[index],
                            {
                                forceVod: true
                            }
                        );
                    } else Main_values_History_data[AddUser_UsernameArray[0].id].live.splice(index, 1);//delete the live entry as it doesn'ot have a VOD
                }
            } else {
                Main_Set_history('live', ScreensObj_LiveCellArray(event.data.data), true);
            }
        }
    );
}

var Main_StartHistoryworkerId;
function Main_StartHistoryworker() {
    if (!AddUser_IsUserSet()) return;

    var array = Main_values_History_data[AddUser_UsernameArray[0].id].live;

    for (var i = 0; i < array.length; i++) {
        if (!array[i].forceVod) {
            if (array[i].data[14] !== '') {
                BradcastCheckerWorker.postMessage(
                    array[i]
                );
            }
        }
    }
}

function Main_CheckStop() { // Called only by JAVA
    //Player related
    ChatLive_Clear(0);
    ChatLive_Clear(1);
    Chat_Clear();

    window.clearInterval(Play_ResumeAfterOnlineId);
    window.clearInterval(Play_streamInfoTimerId);
    window.clearInterval(Play_ShowPanelStatusId);

    window.clearInterval(PlayVod_RefreshProgressBarrID);
    window.clearInterval(PlayVod_SaveOffsetId);

    if (PlayClip_isOn) PlayClip_Resume();

    //General related
    Screens_ClearAnimation();

    window.clearInterval(Main_updateUserFeedId);
    window.clearInterval(Main_updateclockId);
    window.clearInterval(Main_StartHistoryworkerId);

    if (Main_CheckAccessibilityVisible()) Main_CheckAccessibilityHide(true);

    //Hide setting if showing
    if (Languages_isVisible()) {
        Languages_exit();
        Settings_exit();
        Main_SwitchScreen();
    } else if (Settings_isVisible()) {
        if (Settings_Codecs_isVisible()) {
            if (Settings_CodecsValue.length) Settings_RemoveinputFocusKey(Settings_CodecsValue[Settings_CodecsPos].name);
            Main_HideElement('dialog_codecs');
            document.body.removeEventListener("keydown", Settings_handleKeyDownCodecs);
        }
        Settings_exit();
        Main_SwitchScreen();
    }
}

var Main_CheckResumeFeedId;
var Main_CheckResumeVodsId;
function Main_CheckResume() { // Called only by JAVA
    if (Main_isElementShowing('main_remove_dialog')) return;

    if (Main_isScene2DocShown() || Sidepannel_isShowing()) Play_CheckResume();

    if (AddUser_UserIsSet()) {
        window.clearInterval(Main_updateUserFeedId);
        Main_updateUserFeedId = window.setInterval(Main_updateUserFeed, 600000);

        window.clearTimeout(Main_CheckResumeFeedId);
        Main_CheckResumeFeedId = window.setTimeout(Main_updateUserFeed, 5000);
    }
    window.clearInterval(Main_updateclockId);
    Main_updateclockId = window.setInterval(Main_updateclock, 60000);
    Main_updateclock();

    window.clearInterval(Main_StartHistoryworkerId);
    Main_StartHistoryworkerId = window.setInterval(Main_StartHistoryworker, 1000 * 60 * 10);//Check it 30min

    window.clearTimeout(Main_CheckResumeVodsId);
    Main_CheckResumeVodsId = window.setTimeout(Main_StartHistoryworker, 10000);

    Main_CheckAccessibility();

    //Restore UserLiveFeed_WasLiveidObject array from java if it exist
    if (UserLiveFeed_Notify_Background && UserLiveFeed_Notify) {

        var oldLive = null;
        //TODO remove this try after some app updates
        try {
            oldLive = Android.GetNotificationOld();
        } catch (e) {}

        if (oldLive) {

            oldLive = JSON.parse(oldLive);

            if (oldLive.length > 0) {

                UserLiveFeed_WasLiveidObject[AddUser_UsernameArray[0].name] = {};

                for (var i = 0; i < oldLive.length; i++) {
                    UserLiveFeed_WasLiveidObject[AddUser_UsernameArray[0].name][oldLive[i]] = 1;
                }

            }
        }
    }
}

function Main_CheckAccessibility(skipRefresCheck) {
    if (Main_IsOnAndroid && Settings_Obj_default("accessibility_warn")) {
        var isenable;

        isenable = Android.isAccessibilitySettingsOn();

        if (isenable) Main_CheckAccessibilitySet();
        else {
            Main_CheckAccessibilityHide(false);
            //if focused and showing force a refresh check
            if (Screens_Isfocused() && !skipRefresCheck) {
                document.body.removeEventListener("keydown", Main_Switchobj[Main_values.Main_Go].key_fun);
                Main_SwitchScreen();
            }
        }

    }
}

function Main_CheckAccessibilitySet() {
    Main_innerHTML("dialog_accessibility_text", STR_ACCESSIBILITY_WARN_TEXT);
    Main_ShowElement('dialog_accessibility');
    document.body.removeEventListener("keydown", Main_Switchobj[Main_values.Main_Go].key_fun);
    document.body.removeEventListener("keydown", Main_CheckAccessibilityKey, false);
    if (!Sidepannel_isShowing() && Main_isScene1DocShown()) {
        Sidepannel_Hide();
        document.body.addEventListener("keydown", Main_CheckAccessibilityKey, false);
    }
}

function Main_CheckAccessibilityVisible() {
    return Main_isElementShowing('dialog_accessibility');
}

function Main_CheckAccessibilityHide(switchScreen) {
    document.body.removeEventListener("keydown", Main_CheckAccessibilityKey, false);
    Main_HideElement('dialog_accessibility');
    if (switchScreen) Main_SwitchScreen();
}

function Main_CheckAccessibilityKey(event) {
    switch (event.keyCode) {
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
        case KEY_ENTER:
            if (!Main_isControlsDialogShown() && !Main_isphoneDialogVisible() && Main_isScene1DocShown()) {
                Main_CheckAccessibilityHide(true);
            }
            break;
        default:
            break;
    }
}

function Main_LoadUrl(url) {
    if (Main_IsOnAndroid) Android.mloadUrl(url);
    else window.location = url;
}