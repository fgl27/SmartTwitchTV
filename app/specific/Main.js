//Variable initialization
var smartTwitchTV;
var Main_isTV;
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
    "Search_data": '',
    "gameSelectedOld": null,
    "Games_return": false,
    "Search_isSearching": false,
    "Play_ChatForceDisable": false,
    "Never_run_new": true,
    "warning_extra": true,
    "Chat_font_size_new": 75,
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
    "Restore_Backup_Check": false
};

var Main_VideoSizeAll = ["384x216", "512x288", "640x360", "896x504", "1280x720"];
var Main_GameSizeAll = ["179x250", "272x380", "340x475", "476x665", "773x1080"];
var Main_SidePannelSizeAll = ["640x360", "896x504", "1280x720", "1536x864", "1920x1080"];
var Main_SidePannelSize = "1280x720";
var Main_VideoSize = "640x360";
var Main_GameSize = "340x475";

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
var Main_ChatLiveInput;
var Main_updateclockId;
var Main_ContentLang = "";
var Main_Periods = [];
var Main_addFocusVideoOffset = 0;
var Main_FirstRun = true;
var Main_FirstLoad = false;
var Main_RunningTime = 0;
var Main_Hash = "ncx6brgo";
var Main_PreventCheckResume = false;

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
var Main_DataAttribute = 'data-array';

var Main_stringVersion = '3.0';
var Main_stringVersion_Min = '.207';
var Main_version_java = 1;//Always update (+1 to current value) Main_version_java after update Main_stringVersion_Min or a major update of the apk is released
var Main_minversion = 'June 23, 2020';
var Main_version_web = 2;//Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
var Main_versionTag = Main_stringVersion + Main_stringVersion_Min + '-' + Main_minversion;
var Main_update_show_toast = false;
var Main_IsOn_OSInterfaceVersion = '';
var Main_AndroidSDK = 1000;
var Main_ClockOffset = 0;
var Main_IsOn_OSInterface = 0;
var Main_randomimg = '?' + Math.random();
var Main_Fix = "kimne78kx3";
var Main_DoRestore = true;
var Main_CanBackup = false;
var Main_UserBackupFile = 'user.json';
var Main_HistoryBackupFile = 'history.json';
var Main_Scene1Doc;
var Main_Scene2Doc;
var Main_vodOffset = 0;
var Main_body = document.body;
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
                    'Play_PlayPauseChange': Play_PlayPauseChange,
                    'PlayClip_loadDataResult': PlayClip_loadDataResult,
                    'PlayVod_loadDataResult': PlayVod_loadDataResult,
                    'PlayExtra_ResumeResult': PlayExtra_ResumeResult,
                    'Play_loadDataResult': Play_loadDataResult,
                    'PlayClip_CheckIfIsLiveResult': PlayClip_CheckIfIsLiveResult,
                    'PlayVod_CheckIfIsLiveResult': PlayVod_CheckIfIsLiveResult,
                    'Play_MultiResult': Play_MultiResult,
                    'ChannelContent_CheckHostResult': ChannelContent_CheckHostResult,
                    'Play_CheckHostResult': Play_CheckHostResult,
                    'PlayExtra_CheckHostResult': PlayExtra_CheckHostResult,
                    'Screens_LoadPreviewResult': Screens_LoadPreviewResult,
                    'ChannelContent_LoadPreviewResult': ChannelContent_LoadPreviewResult,
                    'Play_StayCheckHostResult': Play_StayCheckHostResult,
                    'Play_StayCheckLiveResult': Play_StayCheckLiveResult,
                    'Play_CheckIfIsLiveResult': Play_CheckIfIsLiveResult,
                    'Main_checkWebVersion': Main_checkWebVersion
                };
            }
            Main_IsOn_OSInterfaceVersion = OSInterface_getversion();
            Main_isDebug = OSInterface_getdebug();
            Main_IsOn_OSInterface = Main_IsOn_OSInterfaceVersion !== '';

        } catch (e) {
            Main_IsOn_OSInterfaceVersion = '1.0.0';
            Main_IsOn_OSInterface = 0;
            Main_body.style.backgroundColor = "rgba(155, 155, 155, 1)";//default rgba(0, 0, 0, 1)
            Main_isDebug = true;
            //Main_Log('Main_isReleased: ' + Main_isReleased);
            //Main_Log('Main_isDebug: ' + Main_isDebug);
            //Main_Log('Main_isBrowser: ' + !Main_IsOn_OSInterface);
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

        Main_Log("language is " + language);
        DefaultLang();

        if (Main_A_includes_B(window.location.href, 'code')) processCode(window.location.href);

        Main_SearchInput = document.getElementById("search_input");
        Main_AddUserInput = document.getElementById("user_input");
        Main_ChatLiveInput = document.getElementById("chat_send_input");
        Main_Scene1Doc = document.getElementById('scene1');
        Main_Scene2Doc = document.getElementById('scene2');

        Main_RestoreValues();

        Main_DoRestore = AddUser_RestoreUsers();

        if (!Main_values.Restore_Backup_Check) {

            try {
                OSInterface_requestWr();
                Main_HideLoadDialog();
                Main_innerHTML("main_dialog_remove", STR_BACKUP);
                Main_textContent('remove_cancel', STR_NO);
                Main_textContent('remove_yes', STR_YES);
                Main_ShowElement('main_yes_no_dialog');
                Main_values.Restore_Backup_Check = true;
                Main_PreventCheckResume = true;
                Main_addEventListener("keydown", Main_BackupDialodKeyDown);
            } catch (e) {
                Main_ready(Main_initWindows);
                return;
            }
        } else Main_ready(Main_initWindows);
    });

}

function Main_initClick() {
    if (Main_IsOn_OSInterface) {
        Main_isTV = OSInterface_deviceIsTV();
        //Only show virtual d-pad on none TV devices
        if (Main_isTV) return;
    } else return;

    Main_body.onpointerup = function() {
        OSInterface_initbodyClickSet();
    };
    OSInterface_initbodyClickSet();
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
            Main_PreventCheckResume = false;
            Main_showLoadDialog();
            Main_HideElement('main_yes_no_dialog');
            Main_removeEventListener("keydown", Main_BackupDialodKeyDown);
            if (Users_RemoveCursor && !Main_DoRestore) Main_initRestoreBackups();
            else Main_initWindows();
            break;
        default:
            break;
    }
}

function Main_initRestoreBackups() {
    try {

        if (OSInterface_HasBackupFile(Main_UserBackupFile)) {

            var tempBackup = OSInterface_RestoreBackupFile(Main_UserBackupFile);

            if (tempBackup !== null) {
                var tempBackupArray = JSON.parse(tempBackup) || [];

                if (tempBackupArray.length > 0) {
                    Main_setItem('AddUser_UsernameArray', tempBackup);

                    tempBackup = OSInterface_RestoreBackupFile(Main_HistoryBackupFile);
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
    //Main_Log('Main_initWindows');
    try {
        if (Main_IsOn_OSInterface) {
            Main_CanBackup = OSInterface_canBackupFile();

            //Backup at start as a backup may never be done yet
            if (Main_CanBackup) {
                if (AddUser_IsUserSet()) {
                    OSInterface_BackupFile(Main_UserBackupFile, JSON.stringify(AddUser_UsernameArray));
                    Main_setTimeout(
                        function() {
                            OSInterface_BackupFile(Main_HistoryBackupFile, JSON.stringify(Main_values_History_data));
                        },
                        25000
                    );
                }
            }
        } else Main_CanBackup = false;

    } catch (e) {
        Main_CanBackup = false;
    }

    Users_RemoveCursor = 0;
    Users_RemoveCursorSet();

    if (Main_IsOn_OSInterface) {

        if (!Main_values.DeviceCheckNew) {

            Main_values.DeviceCheckNew = true;
            var device = OSInterface_getDevice();
            var Manufacturer = OSInterface_getManufacturer();
            device = device ? device.toLowerCase() : "";
            Manufacturer = Manufacturer ? Manufacturer.toLowerCase() : "";

            if (Main_A_includes_B(device, 'shield android tv') ||
                Main_A_includes_B(Manufacturer, 'nvidia')) {
                //Some devices are very slow and are affected by some app default setting Nvidia shield is not

                //bitrate to max possible
                Settings_value.bitrate_min.defaultValue = 0;
                Main_setItem('bitrate_min', 1);
                OSInterface_SetSmallPlayerBandwidth(0);

                //enable small player over feed on multi
                Settings_value.disable_feed_player_multi.defaultValue = 0;
                Main_setItem('disable_feed_player_multi', 1);

                //Enable app animations
                Settings_ForceEnableAimations();
            }
        }

        //Disable googles OMX.google.h264.decoder if another codec is available
        //Check if at least one none google codec is available
        if (!Main_values.Codec_is_Check) {
            var getcodec = null;
            try {
                if (Main_IsOn_OSInterface) getcodec = JSON.parse(OSInterface_getcodecCapabilities('avc'));
            } catch (e) {}

            if (getcodec) {

                Main_values.Codec_is_Check = true;

                if (getcodec.length > 1) {
                    var codecsnames = [];

                    var i = 0, len = getcodec.length;
                    for (i; i < len; i++) {

                        if (Main_A_includes_B(getcodec[i].name ? getcodec[i].name.toLowerCase() : "", 'google'))
                            codecsnames.push(getcodec[i].name);

                    }

                    if (codecsnames.length === 1) {

                        Main_setItem(codecsnames[0], 1);
                        Main_setItem('Settings_DisableCodecsNames', JSON.stringify(codecsnames));

                        OSInterface_setBlackListMediaCodec(codecsnames.join());

                    }
                }

            }

        }

        if (Main_IsOn_OSInterface) Main_AndroidSDK = OSInterface_getSDK();
        else Main_AndroidSDK = 1000;

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

    Chat_Preinit();
    Play_PreStart();
    UserLiveFeed_Prepare();

    Screens_InitScreens();

    document.getElementById("side_panel").style.transform = '';

    Screens_init(Main_Live);

    if (AddUser_UserIsSet()) {
        Main_CheckResumeFeedId = Main_setTimeout(Main_updateUserFeed, 10000, Main_CheckResumeFeedId);
    }
    Main_updateclockId = Main_setInterval(Main_updateclock, 60000, Main_updateclockId);
    Main_StartHistoryworkerId = Main_setInterval(Main_StartHistoryworker, (1000 * 60 * 3), Main_StartHistoryworkerId);//Check it 3 min
    Main_SetHistoryworker();
    Main_CheckResumeVodsId = Main_setTimeout(Main_StartHistoryworker, 15000, Main_CheckResumeVodsId);

    Main_checkWebVersionId = Main_setInterval(Main_checkWebVersionRun, (1000 * 60 * 30), Main_checkWebVersionId);//Check it 60 min

    Main_SetStringsSecondary();
    Main_checkVersion();
}

function Main_SetStringsMain(isStarting) {
    Main_updateclock();
    Main_Setworker();

    //set top bar labels
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);

    Main_IconLoad('label_thumb', 'icon-options', STR_THUMB_OPTIONS_TOP);
    UserLiveFeed_SetFeedPicText();

    Sidepannel_SetDefaultLables();

    Main_textContent("dialog_end_next_text", STR_PLAY_NEXT);
    Main_textContent("dialog_end_replay_text", STR_REPLAY);
    Main_textContent("dialog_end_vod_text", STR_OPEN_BROADCAST);
    Main_textContent("dialog_end_channel_text", STR_CHANNEL_CONT);
    Main_textContent("dialog_end_game_text", STR_GAME_CONT);
    Main_innerHTML("dialog_about_text", STR_ABOUT_INFO_HEADER + '<div id="about_runningtime"></div>' + STR_ABOUT_INFO_0);

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

    Main_textContent("chat_send_button0", STR_OPTIONS);
    Main_textContent("chat_send_button1", STR_CHAT_DELL_ALL);
    Main_textContent("chat_send_button2", STR_CHAT_UNICODE_EMOJI);
    Main_textContent("chat_send_button3", STR_CHAT_BTTV_GLOBAL);
    Main_textContent("chat_send_button4", STR_CHAT_FFZ_GLOBAL);
    Main_textContent("chat_send_button5", STR_CHAT_SEND);
    Main_textContent("chat_send_button6", STR_CHAT_AT_STREAM);
    Main_textContent("chat_send_button7", STR_CHAT_TW_EMOTES);
    Main_textContent("chat_send_button8", STR_CHAT_BTTV_STREAM);
    Main_textContent("chat_send_button9", STR_CHAT_FFZ_STREAM);
    Main_textContent("chat_result", STR_CHAT_RESULT);
    ChatLiveControls_OptionsUpdate_defautls();
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

        var i = 0, len = emojiel.length;
        for (i; i < len; i++)
            emojiel[i].classList.add('emoticon');

        emojiel = document.getElementById(div).getElementsByClassName("emoticon");
        i = 0;
        len = emojiel.length;
        for (i; i < len; i++)
            emojiel[i].classList.remove('emoji');
    }
}

function Main_showLoadDialog() {
    Main_YRst(-1);
    if (Main_IsOn_OSInterface) OSInterface_mshowLoading(true);
    else Main_ShowElement('dialog_loading');
}

function Main_HideLoadDialog() {
    if (Main_IsOn_OSInterface) OSInterface_mshowLoading(false);
    else Main_HideElement('dialog_loading');
}

function Main_clearExitDialog() {
    Main_clearTimeout(Main_ExitDialogID);
}

function Main_setExitDialog() {
    Main_ExitDialogID = Main_setTimeout(Main_HideExitDialog, 6000, Main_ExitDialogID);
}

function Main_showExitDialog() {
    Main_setExitDialog();
    Main_ShowElement('main_dialog_exit');
    Main_addEventListener("keydown", Main_ExitDialog);
}

function Main_HideExitDialog() {
    Main_removeEventListener("keydown", Main_ExitDialog);
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

var Main_showWarningDialogId;
function Main_showWarningDialog(text, timeout, changePos) {
    var doc = document.getElementById('dialog_warning');

    if (changePos) doc.style.marginTop = '86vh';
    else doc.style.marginTop = '50vh';

    Main_innerHTML('dialog_warning_text', text);
    Main_ShowElementWithEle(doc);

    if (timeout) Main_showWarningDialogId = Main_setTimeout(Main_HideWarningDialog, timeout, Main_showWarningDialogId);
}

function Main_HideWarningDialog() {
    Main_HideElement('dialog_warning');
}

function Main_AboutDialogUpdateTime() {
    Main_innerHTML('about_runningtime', STR_RUNNINGTIME + STR_SPACE + Play_timeDay((new Date().getTime()) - Main_RunningTime));
}

function Main_showAboutDialog(removeEventListener, addEventListener) {
    Main_removeEventListener("keydown", removeEventListener);
    Main_addEventListener("keydown", addEventListener);
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
    Main_removeEventListener("keydown", removeEventListener);
    Main_addEventListener("keydown", addEventListener);
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
    Main_removeEventListener("keydown", removeEventListener);
    Main_addEventListener("keydown", addEventListener);
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

function Main_ReStartScreens() {
    Main_updateclock();
    if (Sidepannel_isShowing()) {
        Main_addEventListener("keydown", Sidepannel_handleKeyDown);
        if (!Sidepannel_PlayerViewSidePanelSet) Sidepannel_SetPlayerViewSidePanel();
        if (Play_PreviewId) OSInterface_SidePanelPlayerRestore();
        Sidepannel_AddFocusFeed(true);
        Main_SaveValues();
    } else Main_SwitchScreen();
}

function Main_SwitchScreen(removekey) {
    //Main_Log('Main_SwitchScreen removekey ' + removekey + ' Main_Go ' + Main_values.Main_Go);

    Main_HideWarningDialog();
    if (Main_values.Main_Go !== Main_ChannelContent) Main_values.Main_BeforeChannelisSet = false;
    if (Main_values.Main_Go !== Main_aGame) Main_values.Main_BeforeAgameisSet = false;

    Main_CounterDialogRst();

    if (ScreenObj[Main_values.Main_Go]) ScreenObj[Main_values.Main_Go].init_fun();
    else ScreenObj[1].init_fun();

    if (removekey) Main_removeEventListener("keydown", ScreenObj[Main_values.Main_Go].key_fun);
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
    //Main_Log('Main_ExitCurrent ' + ExitCurrent);
    if (ScreenObj[ExitCurrent].exit_fun) ScreenObj[ExitCurrent].exit_fun();
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

function Main_checkVersion() {
    if (Main_IsOn_OSInterface) {
        var device = OSInterface_getDevice();
        var Webviewversion = OSInterface_getWebviewVersion();
        Main_Log('Webviewversion ' + Webviewversion);

        Main_versionTag = "Apk: " + Main_IsOn_OSInterfaceVersion + ' Web: ' + Main_minversion +
            (Webviewversion ? (' Webview: ' + Webviewversion) : '') + ' Device: ' + device;

        if (Main_needUpdate(Main_IsOn_OSInterfaceVersion)) Main_checkWebVersionUpdate(false);
        else Main_checkWebVersionRun();
    }

    Main_innerHTML("dialog_about_text", STR_ABOUT_INFO_HEADER + Main_versionTag +
        STR_BR + '<span id="about_runningtime"></span>' + STR_ABOUT_INFO_0);

    Main_RunningTime = new Date().getTime();
}

var Main_checkWebVersionId;
var Main_checkWebVersionResumeId;
function Main_checkWebVersionRun(web) {

    if (Main_IsOn_OSInterface) {
        var baseUrl = 'https://raw.githubusercontent.com/fgl27/SmartTwitchTV/master/release/githubio/version/';

        OSInterface_GetMethodUrlHeadersAsync(
            baseUrl + (web ? 'webversion' : 'javaversion'),//urlString
            DefaultHttpGetTimeout,//timeout
            null,//postMessage, null for get
            null,//Method, null for get
            JSON.stringify([]),//JsonString
            'Main_checkWebVersion',//callback
            0,//checkResult
            web ? 1 : 0,//key
            3//thread
        );
    }
}

function Main_checkWebVersion(result, web) {
    if (result) {

        var resultObj = JSON.parse(result);

        if (resultObj.status === 200) {
            var responseInt = parseInt(resultObj.responseText);

            if (web) {

                if (responseInt > Main_version_web) Main_checkWebVersionUpdate(true);

            } else {

                if (responseInt > Main_version_java) Main_checkWebVersionUpdate(false);
                else Main_checkWebVersionRun(true);

            }
        }

    }
}

function Main_checkWebVersionUpdate(web) {
    Main_innerHTML(
        'label_update',
        '<div style="vertical-align: middle; display: inline-block;"><i class="icon-' +
        (web ? 'globe' : 'play-1') +
        '" style="color: #FF0000;"></i></div><div style="vertical-align: middle; display: inline-block; color: #FF0000">' + STR_SPACE +
        (web ? STR_WEB_UPDATE_AVAILABLE : STR_UPDATE_AVAILABLE) + '</div>'
    );

    Main_ShowElement('label_update');

    if (Main_update_show_toast) {

        OSInterface_showToast(web ? STR_WEB_UPDATE_AVAILABLE : STR_UPDATE_AVAILABLE);
        Main_update_show_toast = true;

    }
}

function Main_needUpdate(version) {
    version = version.split(".");
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
    Main_setTimeout(Main_keyClickDelay);
}

function Main_CantClick() {
    return !Main_LastClickFinish;
}

function Main_ThumbOpenIsNull(id, thumbnail) {
    return document.getElementById(thumbnail + id) === null;
}

function Main_OpenLiveStream(id, idsArray, handleKeyDownFunction, checkHistory) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    Main_removeEventListener("keydown", handleKeyDownFunction);
    Main_values_Play_data = JSON.parse(document.getElementById(idsArray[3] + id).getAttribute(Main_DataAttribute));
    Play_data.data = Main_values_Play_data;

    if (checkHistory) {

        var index = Main_history_Exist('live', Main_values_Play_data[7]);

        if (index > -1) {

            if (Main_values_History_data[AddUser_UsernameArray[0].id].live[index].forceVod ||
                Main_A_includes_B(document.getElementById(idsArray[1] + id).src, 's3_vods')) {

                Main_OPenAsVod(index);
                return;

            } else {//is live check if is the same BroadcastID

                if (!Play_PreviewId && Main_values_History_data[AddUser_UsernameArray[0].id].live[index].vodid) Main_CheckBroadcastID(index, idsArray[2] + id);
                else Main_openStream();

                return;
            }

        }
    }

    Main_values.Play_isHost = Main_A_includes_B(Play_data.data[1], STR_USER_HOSTING);

    if (Main_values.Play_isHost) {
        Play_data.DisplaynameHost = Play_data.data[1];
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
    BasexmlHttpGet(theUrl, 10000, 2, null, Main_CheckBroadcastIDStartSucess, Main_CheckBroadcastIDStartError, false);
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
    if (Main_CheckBroadcastIDErrorTry < DefaultHttpGetReTryMax) {
        Main_CheckBroadcastIDStart();
        Main_CheckBroadcastIDErrorTry++;
    } else Main_openStream();
}

function Main_showScene1Doc() {
    //Main_ShowElementWithEle(Main_Scene1Doc);
    Main_RemoveClassWithEle(Main_Scene1Doc, 'opacity_zero');
}

function Main_hideScene1Doc() {
    //Main_HideElementWithEle(Main_Scene1Doc);
    Main_AddClassWitEle(Main_Scene1Doc, 'opacity_zero');
}

function Main_isScene1DocShown() {
    //return Main_isElementShowingWithEle(Main_Scene1Doc);
    return !Main_A_includes_B(Main_Scene1Doc.className, 'opacity_zero');
}

function Main_showScene2Doc() {
    //Main_ShowElementWithEle(Main_Scene2Doc);
    Main_RemoveClassWithEle(Main_Scene2Doc, 'opacity_zero');
}

function Main_hideScene2Doc() {
    //Main_HideElementWithEle(Main_Scene2Doc);
    Main_AddClassWitEle(Main_Scene2Doc, 'opacity_zero');
}

function Main_isScene2DocShown() {
    //return Main_isElementShowingWithEle(Main_Scene2Doc);
    return !Main_A_includes_B(Main_Scene2Doc.className, 'opacity_zero');
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
    Main_vodOffset =
        ((Main_values_History_data[AddUser_UsernameArray[0].id].live[index].date - (new Date(Main_values_Play_data[12]).getTime())) / 1000);

    if (Main_vodOffset < 0) Main_vodOffset = 1;

    if (Play_isOn) {
        Main_OPenAsVod_shutdownStream();

    }
    if (!Play_PreviewId) Play_showWarningDialog(STR_LIVE_VOD + Play_timeMs(Main_vodOffset * 1000));
    Main_openVod();

    Main_setTimeout(
        function() {
            if (!Play_IsWarning) Play_HideWarningDialog();
        },
        3000
    );
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
    if (Main_IsOn_OSInterface) {
        OSInterface_mClearSmallPlayer();
        OSInterface_stopVideo(1);
    }

    Play_isOn = false;
    if (Play_MultiEnable) Play_controls[Play_MultiStream].enterKey(false);

    if (!Play_isEndDialogVisible() || true) UserLiveFeed_Hide();

    Play_ClearPlay(true);
    Play_ClearPlayer();
}

function Main_openStream() {
    //Main_Log('Main_openStream');
    Main_hideScene1Doc();
    Main_removeEventListener("keydown", Play_handleKeyDown);
    Main_addEventListener("keydown", Play_handleKeyDown);
    Main_showScene2Doc();
    Play_hidePanel();
    if (!Play_EndDialogEnter) Play_HideEndDialog();
    Play_Start();
}

function Main_OpenClip(id, idsArray, handleKeyDownFunction) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    Main_hideScene1Doc();
    Main_removeEventListener("keydown", handleKeyDownFunction);
    Main_RemoveClass(idsArray[1] + id, 'opacity_zero');

    Main_values_Play_data = JSON.parse(document.getElementById(idsArray[3] + id).getAttribute(Main_DataAttribute));

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

    Main_addEventListener("keydown", PlayClip_handleKeyDown);
    Main_showScene2Doc();
    Play_hideChat();
    Play_HideWarningDialog();
    Play_CleanHideExit();
    PlayClip_Start();
}

function Main_OpenVodStart(id, idsArray, handleKeyDownFunction) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    Main_removeEventListener("keydown", handleKeyDownFunction);
    Main_RemoveClass(idsArray[1] + id, 'opacity_zero');

    Main_values_Play_data = JSON.parse(document.getElementById(idsArray[3] + id).getAttribute(Main_DataAttribute));

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
    Main_addEventListener("keydown", PlayVod_handleKeyDown);
    Main_showScene2Doc();
    PlayVod_hidePanel();
    Play_hideChat();
    Play_CleanHideExit();
    PlayVod_Start();
}

function Main_removeFocus(id, idArray) {
    Sidepannel_CheckIfIsLiveSTop();
    Main_HideWarningDialog();
    Main_RemoveClass(idArray[1] + id, 'opacity_zero');
    Main_RemoveClass(idArray[0] + id, Main_classThumb);
}

// stylesheet[i].cssRules or stylesheet[i].rules is blocked in chrome
// So in order to check if a css class is loaded one can check it's font-family
// The simple test here it to remove the <link rel="stylesheet" href="https://werevere"> from index and see if the bellow funtion loads the css for you and vice versa
function Main_Checktylesheet() {
    var span = document.createElement('span');

    span.className = 'fa';
    span.style.display = 'none';
    Main_body.insertBefore(span, Main_body.firstChild);

    Main_ready(function() {
        if (window.getComputedStyle(span, null).getPropertyValue('font-family') !== 'icons') {
            Main_Log('Main_Checktylesheet reloading');
            Main_LoadStylesheet('https://fgl27.github.io/SmartTwitchTV/release/githubio/css/icons.min.css');
        } else Main_Log('Main_Checktylesheet loaded OK');

        Main_body.removeChild(span);
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
        Main_setTimeout(func);

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

function Main_updateclock() {
    Main_textContent('label_clock', Main_getclock());
    if (Main_RunningTime) Main_AboutDialogUpdateTime();
    Main_randomimg = '?' + parseInt(Math.random() * 100000);
    Screens_SetLastRefresh(Screens_Current_Key);
    UserLiveFeedobj_SetLastRefresh(UserLiveFeed_FeedPosX);
    Sidepannel_SetLastRefresh();
}

function Main_updateUserFeed() {
    //Main_Log('Main_updateUserFeed');

    if (AddUser_UserIsSet() && !UserLiveFeed_isFeedShow() &&
        !Sidepannel_isShowing() && !UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) {
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
            if (!Main_IsOn_OSInterface || !Main_ExitCursor) Main_HideExitDialog();
            else if (Main_ExitCursor === 1) {
                Main_HideExitDialog();
                OSInterface_mclose(false);
            } else if (Main_ExitCursor === 2) OSInterface_mclose(true);
            break;
        default:
            break;
    }
}

function Main_ReloadScreen() {
    //Main_Log('Main_ReloadScreen ' + Main_values.Main_Go);
    Screens_clear = true;
    ChannelContent_clear = true;

    if (Main_values.Main_Go !== Main_ChannelContent) Main_values.Main_BeforeChannelisSet = false;
    if (Main_values.Main_Go !== Main_aGame) Main_values.Main_BeforeAgameisSet = false;

    Main_CounterDialogRst();

    ScreenObj[Main_values.Main_Go].start_fun();
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
// function Main_PrintUnicode(string) { // jshint ignore:line
//     Main_Log(string);
//var i = 0, len = string.length;
//     for (i; i < len; i++) 
//         Main_Log('Character is: ' + string.charAt(i) + " it's Unicode is: \\u" + string.charCodeAt(i).toString(16).toUpperCase());
// }

function processCode(pageUrl) {
    //Main_Log("processCode");
    var code = '';
    code = pageUrl.match(/code=(\w+)/);
    if (code) {
        code = code[1];
        CheckPage("?code=" + code);
        //Main_Log('if code ' + code);
        Main_newUsercode = code;
    } else {
        //Main_Log('else code ' + code);
        CheckPage('');
        Main_newUsercode = 0;
    }
}

//Redirect to assets if running from it
function CheckPage(pageUrlCode) {
    if (Main_IsOn_OSInterface) {
        var PageUrl = OSInterface_mPageUrl();
        if (PageUrl) {
            if (!Main_A_includes_B(window.location.href, 'asset') && Main_A_includes_B(PageUrl, 'asset')) {
                OSInterface_mloadUrl(PageUrl + pageUrlCode);
                return;
            }
        }
    }
}

function BasexmlHttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, key) {
    BasexmlHttpGetExtra(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, Main_Headers, key);
}

function BasexmlHttpHlsGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, key) {
    BasexmlHttpGetExtra(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, Main_Headers_Back, key);
}

function BasexmlHttpGetExtra(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, HeaderArray, key) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = Timeout;

    Main_Headers[2][1] = access_token;

    for (var i = 0; i < HeaderQuatity; i++)
        xmlHttp.setRequestHeader(HeaderArray[i][0], HeaderArray[i][1]);

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                callbackSucess(xmlHttp.responseText, key);
            } else {
                calbackError(key);
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

    if (!AddUser_IsUserSet() || !Data || !Data[0] ||//Check is user is set, and data is valid
        (type === 'live' && ScreenObj[Main_HistoryLive].histPosX[1]) || //Check if the history for this type is enable
        (type === 'vod' && ScreenObj[Main_HistoryVod].histPosX[1]) ||
        (type === 'clip' && ScreenObj[Main_HistoryClip].histPosX[1])) {

        return;

    }

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

    }

    Main_setHistoryItem();

}

function Main_history_Exist(type, id) {

    var index = 0, len = Main_values_History_data[AddUser_UsernameArray[0].id][type].length;

    for (index; index < len; index++)
        if (Main_values_History_data[AddUser_UsernameArray[0].id][type][index].id === id) return index;

    return -1;
}

function Main_history_Find_Vod_In_Live(id) {
    var index = 0, len = Main_values_History_data[AddUser_UsernameArray[0].id].live.length;

    for (index; index < len; index++) {
        if (Main_values_History_data[AddUser_UsernameArray[0].id].live[index].forceVod &&
            Main_values_History_data[AddUser_UsernameArray[0].id].live[index].vodid === id) {
            return index;
        }
    }

    return -1;
}

function Main_history_UpdateLiveVod(id, vod, vod_img) {
    if (!AddUser_IsUserSet() || ScreenObj[Main_HistoryLive].histPosX[1]) return;

    var index = Main_history_Exist('live', id);

    if (index > -1) {

        var ArrayPos = Main_values_History_data[AddUser_UsernameArray[0].id].live[index];

        ArrayPos.vodid = vod;
        ArrayPos.vodimg = vod_img;

        Main_setHistoryItem();
    }
}

function Main_history_UpdateVodClip(id, time, type) {
    if (!AddUser_IsUserSet() || (type === 'vod' && ScreenObj[Main_HistoryVod].histPosX[1]) ||
        (type === 'clip' && ScreenObj[Main_HistoryClip].histPosX[1])) return;

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
    Main_setHistoryItemId = Main_setTimeout(
        Main_SaveHistoryItem,
        5000,
        Main_setHistoryItemId
    );
}

function Main_SaveHistoryItem() {
    var string = JSON.stringify(Main_values_History_data);
    Main_setItem('Main_values_History_data', string);
    if (Main_CanBackup) OSInterface_BackupFile(Main_HistoryBackupFile, string);
}

//Only works on vectors, matrixs and etc need to use JSON.parse(JSON.stringify(array)) to prevent keeping the iner obj references
function Main_Slice(arrayTocopy) {
    var array;
    //slice may crash RangeError: Maximum call stack size exceeded
    try {
        array = arrayTocopy.slice();
    } catch (e) {
        Main_Log('Main_Slice ' + e);
        array = [];
        var i = 0, len = arrayTocopy.length;
        for (i; i < len; i++) {
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
                    xmlHttp.timeout = 30000;
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
                    xmlHttp.timeout = 30000;

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
    //Main_Log('Main_StartHistoryworker');
    if (!AddUser_IsUserSet() || !BradcastCheckerWorker) return;

    var array = Main_values_History_data[AddUser_UsernameArray[0].id].live;

    var i = 0, len = array.length;
    for (i; i < len; i++) {
        if (!array[i].forceVod) {
            if (array[i].data[14] && array[i].data[14] !== '') {
                BradcastCheckerWorker.postMessage(
                    array[i]
                );
            } else {
                array.splice(i, 1);
            }
        }
    }
}

//the internet connection may be down do to standby after resume
//java will not call Main_CheckResume() until the internet connection is recognized
function Main_PreventClick(prevent) {
    if (prevent) {
        window.addEventListener("keydown", Main_PreventClickfun, true);
        window.addEventListener("keyup", Main_PreventClickfun, true);
        window.addEventListener("keypress", Main_PreventClickfun, true);
    } else {
        window.removeEventListener("keydown", Main_PreventClickfun, true);
        window.removeEventListener("keyup", Main_PreventClickfun, true);
        window.removeEventListener("keypress", Main_PreventClickfun, true);
    }
}

function Main_PreventClickfun(e) {
    e.stopPropagation();
}

function Main_CheckStop() { // Called only by JAVA
    Main_PreventClick(true);

    //Player related
    ChatLive_Clear(0);
    ChatLive_Clear(1);
    Chat_Clear();

    Main_clearInterval(Play_ResumeAfterOnlineId);
    Main_clearInterval(Play_streamInfoTimerId);
    Main_clearInterval(Play_ShowPanelStatusId);

    Main_clearInterval(PlayVod_RefreshProgressBarrID);
    Main_clearInterval(PlayVod_SaveOffsetId);

    if (PlayClip_isOn) PlayClip_Resume();
    else if (Play_isOn) {
        if (Play_MultiEnable) {
            var i = 0, len = Play_MultiArray.length;
            for (i; i < len; i++) {
                if (Play_MultiArray[i].data.length > 0) {

                    Main_Set_history('live', Play_MultiArray[i].data);

                }
            }
        } else if (PlayExtra_PicturePicture) {

            if (PlayExtra_data.data.length > 0) Main_Set_history('live', PlayExtra_data.data);
            if (Play_data.data.length > 0) Main_Set_history('live', Play_data.data);

        } else if (Play_data.data.length > 0) Main_Set_history('live', Play_data.data);
    }

    Main_SaveHistoryItem();
    //General related
    Screens_ClearAnimation(Screens_Current_Key);

    Main_clearInterval(Main_updateclockId);
    Main_clearInterval(Main_StartHistoryworkerId);
    Main_clearInterval(Main_checkWebVersionId);
    Main_clearTimeout(Main_checkWebVersionResumeId);


    if (Main_CheckAccessibilityVisible()) Main_CheckAccessibilityHide(true);

    if (Main_isElementShowing('chat_send')) ChatLiveControls_Hide();

    //Hide setting if showing
    if (Languages_isVisible()) {
        Languages_exit();
        Settings_exit();
        Main_SwitchScreen();
    } else if (Settings_isVisible()) {
        if (Settings_Codecs_isVisible()) {
            if (Settings_CodecsValue.length) Settings_RemoveinputFocusKey(Settings_CodecsValue[Settings_CodecsPos].name);
            Main_HideElement('dialog_codecs');
            Main_removeEventListener("keydown", Settings_handleKeyDownCodecs);
        } else if (Settings_Dialog_isVisible()) {
            if (SettingsColor_DialogisVisible()) SettingsColor_DialogColorsHide();
            if (Settings_DialogValue.length) Settings_DialoghandleKeyDown(Settings_DialogValue[Settings_DialogPos]);
            Main_HideElement('dialog_settings');
            Main_removeEventListener("keydown", Settings_DialoghandleKeyDown);
        }
        Settings_exit();
        Main_SwitchScreen();
    }

    //Reset Screen img if hiden
    var doc = document.getElementById(ScreenObj[Screens_Current_Key].ids[1] + ScreenObj[Screens_Current_Key].posY + '_' + ScreenObj[Screens_Current_Key].posX);
    if (doc) Main_RemoveClassWithEle(doc, 'opacity_zero');
    else if (ChannelContent_Isfocused()) {
        Main_RemoveClass('channel_content_cell0_1_img', 'opacity_zero');
    }
}

var Main_CheckResumeFeedId;
var Main_CheckResumeVodsId;
function Main_CheckResume() { // Called only by JAVA
    Main_PreventClick(false);

    //When the app first start the dialog will show on that case if the user stop the app the dialog will be there
    //but the aap is not ready for the rest of the check on this fun
    if (Main_PreventCheckResume) return;

    var UserIsSet = AddUser_UserIsSet();

    //Check on resume if token has expired and refresh
    //The token may expire while the device is on standby and on that case even if the app is running
    //the internet connection may be down (do to standby), on that case the update token fun will run and not work
    //On that case the expires_when will be less the time now and we need to update on resume
    //If the app closes next reopen the same check will happen but somewhere else
    if (UserIsSet && AddUser_UsernameArray[0].access_token &&
        (((new Date().getTime()) - AddUser_UsernameArray[0].expires_when) > 0)) {
        AddCode_refreshTokens(0, 0, null, null, null, true);
    }

    if (Main_isScene2DocShown() || Sidepannel_isShowing()) Play_CheckResume();
    else Play_CheckIfIsLiveCleanEnd();//Reset to Screens_addFocus check for live can work

    if (UserIsSet) {
        Main_CheckResumeFeedId = Main_setTimeout(Main_updateUserFeed, 5000, Main_CheckResumeFeedId);
    }

    Main_updateclockId = Main_setInterval(Main_updateclock, 60000, Main_updateclockId);
    Main_updateclock();

    Main_StartHistoryworkerId = Main_setInterval(Main_StartHistoryworker, (1000 * 60 * 3), Main_StartHistoryworkerId);//Check it 3 min

    Main_CheckResumeVodsId = Main_setTimeout(Main_StartHistoryworker, 10000, Main_CheckResumeVodsId);

    Main_checkWebVersionId = Main_setInterval(Main_checkWebVersionRun, (1000 * 60 * 30), Main_checkWebVersionId);//Check it 60 min
    Main_checkWebVersionResumeId = Main_setTimeout(Main_checkWebVersionRun, 10000, Main_checkWebVersionResumeId);

    Main_CheckAccessibility();
}

function Main_CheckAccessibility(skipRefresCheck) {
    //Main_Log('Main_CheckAccessibility');

    if (Main_IsOn_OSInterface && Settings_Obj_default("accessibility_warn")) {
        if (OSInterface_isAccessibilitySettingsOn()) Main_CheckAccessibilitySet();
        else {
            Main_CheckAccessibilityHide(false);
            //if focused and showing force a refresh check
            if ((Screens_Isfocused() || ChannelContent_Isfocused()) && !skipRefresCheck) {
                Main_removeEventListener("keydown", ScreenObj[Main_values.Main_Go].key_fun);
                Main_SwitchScreen();
            }
        }

    }
}

function Main_CheckAccessibilitySet() {
    //Main_Log('Main_CheckAccessibilitySet');

    Main_innerHTML("dialog_accessibility_text", STR_ACCESSIBILITY_WARN_TEXT);
    Main_ShowElement('dialog_accessibility');
    Main_removeEventListener("keydown", ScreenObj[Main_values.Main_Go].key_fun);
    Main_removeEventListener("keydown", Main_CheckAccessibilityKey);
    if (!Sidepannel_isShowing() && Main_isScene1DocShown()) {
        Sidepannel_Hide();
        Main_addEventListener("keydown", Main_CheckAccessibilityKey);
    }
}

function Main_CheckAccessibilityVisible() {
    return Main_isElementShowing('dialog_accessibility');
}

function Main_CheckAccessibilityHide(switchScreen) {
    Main_removeEventListener("keydown", Main_CheckAccessibilityKey);
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
    if (Main_IsOn_OSInterface) OSInterface_mloadUrl(url);
    else window.location = url;
}

function Main_Log(text) {
    if (Main_isDebug) {
        text = text + ' ' + Main_LogDate(new Date());
        console.log(text);
        OSInterface_LongLog(text);
    }
}

function Main_LogDate(date) {
    return date.toLocaleTimeString([], {hour12: false}) + '.' + date.getMilliseconds();
}

function Main_addEventListener(type, fun) {
    Main_removeEventListener(type, fun);
    Main_body.addEventListener(type, fun);
}

function Main_removeEventListener(type, fun) {
    Main_body.removeEventListener(type, fun);
}

function Main_setTimeout(fun, timeout, id) {
    Main_clearTimeout(id);
    if (timeout && timeout > 0) return window.setTimeout(fun, timeout);
    else return window.setTimeout(fun);
}

function Main_clearTimeout(id) {
    window.clearTimeout(id);
}

function Main_setInterval(fun, timeout, id) {
    Main_clearInterval(id);
    if (timeout && timeout > 0) return window.setInterval(fun, timeout);
}

function Main_clearInterval(id) {
    window.clearInterval(id);
}