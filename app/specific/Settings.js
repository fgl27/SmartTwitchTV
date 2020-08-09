/*
 * Copyright (c) 2017-2020 Felipe de Leon <fglfgl27@gmail.com>
 *
 * This file is part of SmartTwitchTV <https://github.com/fgl27/SmartTwitchTV>
 *
 * SmartTwitchTV is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SmartTwitchTV is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SmartTwitchTV.  If not, see <https://github.com/fgl27/SmartTwitchTV/blob/master/LICENSE>.
 *
 */

//Variable initialization
var Settings_cursorY = 0;
var Settings_jumpTimers = [5, 10, 30, 60, 120, 300, 600, 900, 1200, 1800, 3600];
var Settings_jumpTimers_String = [
    '5 seconds', '10 seconds', '30 seconds', '1 minute', '2 minutes',
    '5 minutes', '10 minutes', '15 minutes', '20 minutes', '30 minutes', '1 hour',
];
var Settings_Time = [250, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
var Settings_Time_String = [
    '250 milliseconds', '500 milliseconds', '1 second', '2 seconds', '3 seconds', '4 seconds', '5 seconds',
    '6 seconds', '7 seconds', '8 seconds', '9 seconds', '10 seconds'
];

var Settings_value = {
    "restor_playback": {
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "clip_auto_play_next": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "pp_workaround": {
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "keep_panel_info_visible": {
        "values": ["with panel", "yes", "never"],
        "defaultValue": 1
    },
    "single_click_exit": {
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "accessibility_warn": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "ping_warn": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "app_animations": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "show_screen_counter": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "show_feed_player": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "preview_others_volume": {//Migrated to dialog
        "values": Settings_GetVolumes(),
        "defaultValue": 26
    },
    "preview_volume": {//Migrated to dialog
        "values": Settings_GetVolumes(),
        "defaultValue": 101
    },
    "preview_sizes": {//Migrated to dialog
        "values": ['s', 'm', 'l', 'xl'],
        "defaultValue": 2
    },
    "preview_screen_sizes": {//Migrated to dialog
        "values": ['n', 'l'],
        "defaultValue": 1
    },
    "show_live_player": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "show_vod_player": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "show_clip_player": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "auto_clip_preview": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "show_side_player": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "disable_feed_player_multi": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "start_user_screen": {
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "vod_dialog": {
        "values": ["last", "ask", "start"],
        "defaultValue": 1
    },
    "auto_refresh_screen": {//Migrated to dialog
        "values": [
            'disable', 5, 10, 15, 30, 60, 90, 180, 360, 720, 1440
        ],
        "defaultValue": 1
    },
    "auto_refresh_background": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "show_feed_player_delay": {//Migrated to dialog
        "values": [
            0, 100, 200, 300, 400, 500, 600,
            700, 800, 900, 1000, 1100, 1200,
            1300, 1400, 1500, 1600, 1700, 1800,
            1900, 2000],
        "defaultValue": 1
    },
    "key_up_timeout": {//Migrated to dialog
        "values": [
            100, 150, 200, 250, 300, 350, 400,
            450, 500, 550, 600, 650, 700, 750,
            800, 900, 1000, 1100, 1200, 1300,
            1400, 1500, 1600, 1700, 1800, 1900, 2000
        ],
        "defaultValue": 6
    },
    "live_feed_sort": {//Migrated to dialog
        "values": [
            "views_more",
            "views_less",
            "name_a-z",
            "name_z-a",
            "game_a-z",
            "game_z-a",
            "uptime_new",
            "uptime_old",
        ],
        "defaultValue": 1
    },
    "game_feed_sort": {//Migrated to dialog
        "values": [
            "views_more",
            "views_less",
            "name_a-z",
            "name_z-a",
            "channel_more",
            "channel_less"
        ],
        "defaultValue": 1
    },
    "open_host": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "play_stay": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "live_notification": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "title_notification": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "game_notification": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "game_live_notification": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "live_notification_background": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "live_notification_position": {//Migrated to dialog
        "values": [0, 1, 2, 3, 4, 5],
        "defaultValue": 2
    },
    "repeat_notification": {//Migrated to dialog
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "defaultValue": 1
    },
    "since_notification": {//Migrated to dialog
        "values": Settings_GetnotificationTime(),
        "defaultValue": 1
    },
    "global_font_offset": {//Migrated to dialog
        "values": [-3, -2, -1, 0, 1, 2, 3],
        "defaultValue": 4
    },
    "buffer_live": {//Migrated to dialog
        "values": [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 2
    },
    "buffer_vod": {//Migrated to dialog
        "values": [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 2
    },
    "buffer_clip": {//Migrated to dialog
        "values": [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 2
    },
    "end_dialog_counter": {//Migrated to dialog
        "values": ['disable', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 4
    },
    "bitrate_main": {//Migrated to dialog
        "values": ['disable', 11, 10.5, 10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1],
        "defaultValue": 1
    },
    "bitrate_min": {//Migrated to dialog
        "values": ['disable', 11, 10.5, 10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1],
        "defaultValue": 18
    },
    "videos_animation": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "thumb_quality": {//Migrated to dialog
        "values": ["very-low", "low", "normal", "high", "very-high"],
        "defaultValue": 3
    },
    "default_quality": {
        "values": ["Auto", "source"],
        "defaultValue": 1
    },
    "check_source": {
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "clock_offset": {//Migrated to dialog
        "values": Settings_GenerateClock(),
        "defaultValue": 49
    },
    "thumb_background": {//Migrated to dialog
        "values": ["None"],
        "set_values": [""],
        "defaultValue": 1
    },
    "content_lang": {
        "values": ["All"],
        "set_values": [""],
        "defaultValue": 1
    },
    "ui_opt": {
        "values": ["None"],
        "set_values": [""],
        "defaultValue": 1
    },
    "custom_opt": {
        "values": ["None"],
        "set_values": [""],
        "defaultValue": 1
    },
    "live_notification_opt": {
        "values": ["None"],
        "set_values": [""],
        "defaultValue": 1
    },
    "blocked_codecs": {
        "values": ["None"],
        "set_values": [""],
        "defaultValue": 1
    },
    "player_buffers": {
        "values": ["None"],
        "set_values": [""],
        "defaultValue": 1
    },
    "player_end_opt": {
        "values": ["None"],
        "set_values": [""],
        "defaultValue": 1
    },
    "small_feed_player": {
        "values": ["None"],
        "set_values": [""],
        "defaultValue": 1
    },
    "player_bitrate": {
        "values": ["None"],
        "set_values": [""],
        "defaultValue": 1
    },
    "dpad_opt": {
        "values": ["None"],
        "set_values": [""],
        "defaultValue": 1
    },
    "chat_opt": {
        "values": ["None"],
        "set_values": [""],
        "defaultValue": 1
    },
    "warnings_opt": {
        "values": ["None"],
        "set_values": [""],
        "defaultValue": 1
    },
    "vod_seek": {
        "values": ["None"],
        "set_values": [""],
        "defaultValue": 1
    },
    "vod_seek_min": {//Migrated to dialog
        "values": Settings_jumpTimers_String,
        "defaultValue": 1
    },
    "vod_seek_max": {//Migrated to dialog
        "values": Settings_jumpTimers_String,
        "defaultValue": 11
    },
    "vod_seek_time": {//Migrated to dialog
        "values": Settings_Time_String,
        "defaultValue": 3
    },
    "dpad_position": {//Migrated to dialog
        "values": ["Right-Bottom", "Right-Top", "Left-Top", "Left-Bottom"],
        "defaultValue": 1
    },
    "dpad_opacity": {//Migrated to dialog
        "values": [
            "0%", "5%", "10%", "15%", "20%", "25%", "30%", "35%", "40%", "45%", "50%",
            "55%", "60%", "65%", "70%", "75%", "80%", "85%", "90%", "95%", "100%"],
        "defaultValue": 12
    },
    "highlight_rewards": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "highlight_atstreamer": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "highlight_atuser": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "highlight_user_send": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "show_sub": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "highlight_bits": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "show_actions": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "clear_chat": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "show_chatters": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "individual_lines": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "chat_individual_background": {//Migrated to dialog
        "values": ["disabled", "enabled", "bright", "dark"],
        "defaultValue": 1
    },
    "chat_logging": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "chat_nickcolor": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "chat_timestamp": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    }
};

function Settings_GenerateClock() {
    var clock = [],
        time = 43200,
        i = 0;

    for (i; i < 48; i++) {
        clock.push("-" + Play_timeS(time));
        time -= 900;
    }

    clock.push(Play_timeS(0));
    time = 900;

    for (i = 0; i < 48; i++) {
        clock.push(Play_timeS(time));
        time += 900;
    }

    return clock;
}

function Settings_GetVolumes() {
    var array = [],
        i = 0;

    for (i = 0; i < 101; i++) {
        array.push(i + '%');
    }

    return array;
}

function Settings_GetnotificationTime() {
    var array = [0, '10 min', '20 min', '30 min', '45 min', '1 Hour'],
        i = 0;

    for (i = 2; i < 25; i++) {
        array.push(i + ' Hours');
    }

    return array;
}

var Settings_value_keys = [];
var Settings_positions_length = 0;
//Variable initialization end

function Settings_init() {
    Main_addEventListener("keydown", Settings_handleKeyDown);
    ScreensObj_SetTopLable(STR_SETTINGS);
    Main_ShowElement('settings_holder');
    Main_IconLoad('label_thumb', 'icon-return', STR_GOBACK);
    Main_HideElement('label_refresh');
    Settings_cursorY = 0;
    Settings_inputFocus(Settings_cursorY);
    Settings_DivOptionChangeLang('content_lang', STR_CONTENT_LANG, Languages_Selected);
    Main_EventScreen('Settings');
}

function Settings_exit() {
    Settings_ScrollTableReset();
    Main_removeEventListener("keydown", Settings_handleKeyDown);
    Main_IconLoad('label_thumb', 'icon-options', STR_THUMB_OPTIONS_TOP);
    Main_ShowElement('label_refresh');
    Settings_RemoveinputFocus();
    Main_HideElement('settings_holder');
}

function Settings_isVisible() {
    return Main_isElementShowing('settings_holder');
}

// The order in Settings_SetSettings is the display order
function Settings_SetSettings() {
    var div = '',
        key,
        array_no_yes = [STR_NO, STR_YES];

    // General settings title
    //div += Settings_DivTitle('general', STR_SETTINGS_GENERAL);

    //Dialog settings
    div += Settings_Content('content_lang', [STR_CONTENT_LANG_SUMMARY], STR_CONTENT_LANG, '');
    div += Settings_Content('chat_opt', [STR_CONTENT_LANG_SUMMARY], STR_CHAT_OPTIONS, null);
    div += Settings_Content('ui_opt', [STR_CONTENT_LANG_SUMMARY], STR_UI_SETTINGS, null);
    div += Settings_Content('custom_opt', [STR_CONTENT_LANG_SUMMARY], STR_GENERAL_CUSTOM, null);
    div += Settings_Content('live_notification_opt', [STR_CONTENT_LANG_SUMMARY], STR_NOTIFICATION_OPT, null);
    div += Settings_Content('warnings_opt', [STR_CONTENT_LANG_SUMMARY], STR_WARNINGS, null);

    if (!Main_isTV || !Main_IsOn_OSInterface) {
        div += Settings_Content('dpad_opt', [STR_CONTENT_LANG_SUMMARY], STR_DPAD_OPT, null);
    }

    //Individual settings
    div += Settings_Content('start_user_screen', array_no_yes, STR_START_AT_USER, STR_START_AT_USER_SUMMARY);

    // Player settings title
    div += Settings_DivTitle('play', STR_SETTINGS_PLAYER);

    div += Settings_Content('restor_playback', array_no_yes, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMMARY);

    div += Settings_Content('keep_panel_info_visible', STR_PLAYER_INFO_VISIBILITY_ARRAY, STR_PLAYER_INFO_VISIBILITY, STR_PLAYER_INFO_VISIBILITY_SUMMARY);

    div += Settings_Content('single_click_exit', array_no_yes, STR_SINGLE_EXIT, STR_SINGLE_EXIT_SUMMARY);

    div += Settings_Content('pp_workaround', [STR_DISABLE, STR_ENABLE], STR_PP_WORKAROUND, STR_PP_WORKAROUND_SUMMARY);

    div += Settings_Content('vod_dialog', [STR_VOD_DIALOG_LAST, STR_VOD_DIALOG_SHOW, STR_VOD_DIALOG_START], STR_VOD_DIALOG, STR_VOD_DIALOG_SUMMARY);

    div += Settings_Content('check_source', array_no_yes, STR_SOURCE_CHECK, STR_SOURCE_CHECK_SUMMARY);

    div += Settings_Content('default_quality', [STR_AUTO, STR_SOURCE], STR_DEF_QUALITY, STR_DEF_QUALITY_SUMMARY);

    //Dialog settings
    div += Settings_Content('vod_seek', [STR_CONTENT_LANG_SUMMARY], STR_VOD_SEEK, null);
    div += Settings_Content('player_bitrate', [STR_CONTENT_LANG_SUMMARY], STR_PLAYER_BITRATE, STR_PLAYER_BITRATE_SUMMARY);
    div += Settings_Content('player_end_opt', [STR_CONTENT_LANG_SUMMARY], STR_END_DIALOG_OPT, null);
    div += Settings_Content('small_feed_player', [STR_CONTENT_LANG_SUMMARY], STR_SIDE_PANEL_PLAYER, null);
    div += Settings_Content('blocked_codecs', [STR_CONTENT_LANG_SUMMARY], STR_BLOCKED_CODEC, STR_BLOCKED_CODEC_SUMMARY);
    div += Settings_Content('player_buffers', [STR_CONTENT_LANG_SUMMARY], STR_SETTINGS_BUFFER_SIZE, STR_SETTINGS_BUFFER_SIZE_SUMMARY);

    // Prepare the bitrates
    key = "bitrate_main";
    var i = 1, len = Settings_value[key].values.length;
    for (i; i < len; i++) {
        Settings_value[key].values[i] = Settings_value[key].values[i] + " Mbps";
    }
    Settings_value[key].values[0] = STR_PLAYER_BITRATE_UNLIMITED;
    Settings_value.bitrate_min.values = Settings_value[key].values;
    Settings_SetBitRate(0);

    Main_innerHTML("settings_main", div);
    Settings_positions_length = Settings_value_keys.length;
    Languages_SetSettings();
}

function Settings_Content(key, valuesArray, STR, STR_SUMMARY) {
    Settings_value_keys.push(key);
    if (valuesArray) Settings_value[key].values = valuesArray;

    return (STR_SUMMARY ? Settings_DivOptionWithSummary(key, STR, STR_SUMMARY) : Settings_DivOptionNoSummary(key, STR));
}

function Settings_DivTitle(key, string) {
    return '<div id="setting_title_' + key + '" class="settings_section">' + string + '</div>';
}

function Settings_DivOptionNoSummary(key, string) {
    return '<div id="' + key + '_div" class="settings_div"><div id="' +
        key + '_name" class="settings_name">' + string + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedeline settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';
}

function Settings_DivOptionWithSummary(key, string_title, string_summary, fontSize) {
    return '<div id="' + key + '_div" class="settings_div"><div id="' + key + '_name" class="settings_name">' +
        string_title + '<div id="' + key + '_summary" class="settings_summary" style="font-size: ' + (fontSize ? fontSize : 64) + '%;">' + string_summary + '</div></div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedeline settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';
}

function Settings_DivOptionChangeLang(key, string_title, string_summary) {
    Main_innerHTML(key + '_name', string_title +
        '<div id="' + key + '_summary" class="settings_summary" style="font-size: 65%;">' + string_summary + '</div>');
}

// The order in Settings_SetStrings doesnot matter
function Settings_SetStrings() {
    var key = '';

    //General settings
    //Main_textContent('setting_title_general', STR_SETTINGS_GENERAL);

    // Content Language selection
    key = "content_lang";
    Main_textContent(key + '_name', STR_CONTENT_LANG);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_value[key].values = [STR_CONTENT_LANG_SUMMARY];

    //Player settings
    Main_textContent('setting_title_play', STR_SETTINGS_PLAYER);

    // Player buffer title/summary
    Main_textContent('setting_title_buffers', STR_SETTINGS_BUFFER_SIZE);
    Main_textContent('setting_title_buffers_summary', STR_SETTINGS_BUFFER_SIZE_SUMMARY);

    key = "vod_dialog";
    Settings_DivOptionChangeLang(key, STR_VOD_DIALOG, STR_VOD_DIALOG_SUMMARY);
    Settings_value[key].values = [STR_VOD_DIALOG_LAST, STR_VOD_DIALOG_SHOW, STR_VOD_DIALOG_START];

    key = "start_user_screen";
    Settings_DivOptionChangeLang(key, STR_START_AT_USER, STR_START_AT_USER_SUMMARY);
    Settings_value[key].values = [STR_YES, STR_NO];

    key = "restor_playback";
    Settings_DivOptionChangeLang(key, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMMARY);
    Settings_value[key].values = [STR_YES, STR_NO];

    key = "default_quality";
    Settings_DivOptionChangeLang(key, STR_DEF_QUALITY, STR_DEF_QUALITY_SUMMARY);
    Settings_value[key].values = [STR_AUTO, STR_SOURCE];

    key = "check_source";
    Settings_DivOptionChangeLang(key, STR_SOURCE_CHECK, STR_SOURCE_CHECK_SUMMARY);
    Settings_value[key].values = [STR_YES, STR_NO];

    key = "pp_workaround";
    Settings_DivOptionChangeLang(key, STR_PP_WORKAROUND, STR_PP_WORKAROUND_SUMMARY);
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

    key = "keep_panel_info_visible";
    Settings_DivOptionChangeLang(key, STR_PLAYER_INFO_VISIBILITY, STR_PLAYER_INFO_VISIBILITY_SUMMARY);
    Settings_value[key].values = STR_PLAYER_INFO_VISIBILITY_ARRAY;

    key = "single_click_exit";
    Settings_DivOptionChangeLang(key, STR_SINGLE_EXIT, STR_SINGLE_EXIT_SUMMARY);
    Settings_value[key].values = [STR_NO, STR_YES];

    for (key in Settings_value)
        if (Settings_value.hasOwnProperty(key))
            Main_textContent(key, Settings_Obj_values(key));

    Languages_SetLang();
}

function Settings_SetDefautls() {

    for (var key in Settings_value) {
        Settings_value[key].defaultValue = Main_getItemInt(key, Settings_value[key].defaultValue);
        Settings_value[key].defaultValue -= 1;
        if (Settings_value[key].defaultValue > Settings_Obj_length(key)) Settings_value[key].defaultValue = 0;
    }

    Settings_SetBuffers(0);
    Settings_SetClock();
    if (!Main_isTV) {
        Settings_DpadOpacity();
        Settings_DpadPOsition();
    }
    Main_SetThumb();
    if (!Settings_Obj_default("app_animations")) Settings_SetAnimations();
    Settings_notification_background();
    Settings_notification_position();
    Settings_notification_repeat();
    Settings_notification_sicetime();
    Play_EndSettingsCounter = Settings_Obj_default("end_dialog_counter");
    Settings_ShowCounter(Settings_Obj_default("show_screen_counter"));
    Settings_DisableCodecsNames = Main_getItemJson('Settings_DisableCodecsNames', []);
    Screens_KeyUptimeout = Settings_Obj_values("key_up_timeout");
    Settings_CodecsSet();
    OSInterface_SetPreviewOthersAudio(Settings_Obj_default("preview_others_volume"));
    OSInterface_SetPreviewAudio(Settings_Obj_default("preview_volume"));
    OSInterface_SetPreviewSize(Settings_Obj_default("preview_sizes"));
    OSInterface_SetCheckSource(Settings_Obj_default("check_source") === 1);
    Settings_SetPingWarning();
    SettingsColor_SetAnimationStyleRestore();
    Settings_set_all_notification();
}

function Settings_Obj_values(key) {
    return Settings_value[key].values[Settings_Obj_default(key)];
}

function Settings_Obj_default(key) {
    return Settings_value[key].defaultValue;
}

function Settings_Obj_length(key) {
    return Settings_value[key].values.length - 1;
}

function Settings_inputFocus(position) {
    var key = Settings_value_keys[position];
    Main_AddClass(key, 'settings_value_focus');
    Main_AddClass(key + '_div', 'settings_div_focus');
    Settings_Setarrows(position);
    Settings_ScrollTable();
}

function Settings_RemoveinputFocus() {
    Settings_RemoveinputFocusKey(Settings_value_keys[Settings_cursorY]);
}

function Settings_RemoveinputFocusKey(key) {
    Main_getElementById(key + "arrow_left").style.opacity = "0";
    Main_getElementById(key + "arrow_right").style.opacity = "0";
    Main_RemoveClass(key, 'settings_value_focus');
    Main_RemoveClass(key + '_div', 'settings_div_focus');
}

function Settings_ChangeSettigs(position) {
    var key = Settings_value_keys[position];
    Main_setItem(key, Settings_Obj_default(key) + 1);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_Setarrows(position);
    Settings_SetDefault(key);
}

function Settings_Setarrows(position) {
    Settings_SetarrowsKey(Settings_value_keys[position]);
}

function Settings_SetarrowsKey(key) {
    if (!Settings_Obj_length(key)) return;

    var currentValue = Settings_Obj_default(key);
    var maxValue = Settings_Obj_length(key);

    if (currentValue > 0 && currentValue < maxValue) {
        Main_getElementById(key + "arrow_left").style.opacity = "1";
        Main_getElementById(key + "arrow_right").style.opacity = "1";
    } else if (currentValue === maxValue) {
        Main_getElementById(key + "arrow_left").style.opacity = "1";
        Main_getElementById(key + "arrow_right").style.opacity = "0.2";
    } else {
        Main_getElementById(key + "arrow_left").style.opacity = "0.2";
        Main_getElementById(key + "arrow_right").style.opacity = "1";
    }
}

function Settings_SetDefault(position) {

    if (position === "live_notification") Settings_notification();
    else if (position === "title_notification") Settings_notification_title();
    else if (position === "game_notification") Settings_notification_game();
    else if (position === "game_live_notification") Settings_notification_game_live();
    else if (position === "live_notification_background") Settings_notification_background();
    else if (position === "live_notification_position") Settings_notification_position();
    else if (position === "repeat_notification") Settings_notification_repeat();
    else if (position === "since_notification") Settings_notification_sicetime();
    else if (position === "ping_warn") Settings_SetPingWarning();
    else if (position === "app_animations") Settings_SetAnimations();
    else if (position === "buffer_live") Settings_SetBuffers(1);
    else if (position === "key_up_timeout") Screens_KeyUptimeout = Settings_Obj_values("key_up_timeout");
    else if (position === "buffer_vod") Settings_SetBuffers(2);
    else if (position === "buffer_clip") Settings_SetBuffers(3);
    else if (position === "end_dialog_counter") Play_EndSettingsCounter = Settings_Obj_default("end_dialog_counter");
    else if (position === "default_quality") Play_SetQuality();
    else if (position === "check_source") OSInterface_SetCheckSource(Settings_Obj_default("check_source") === 1);
    else if (position === "thumb_quality") Main_SetThumb();
    else if (position === "preview_others_volume") OSInterface_SetPreviewOthersAudio(Settings_Obj_default("preview_others_volume"));
    else if (position === "preview_volume") OSInterface_SetPreviewAudio(Settings_Obj_default("preview_volume"));
    else if (position === "preview_sizes") OSInterface_SetPreviewSize(Settings_Obj_default("preview_sizes"));
    else if (position === "global_font_offset") {
        calculateFontSize();
        AddUser_UpdateSidepanelAfterShow();
        UserLiveFeed_ResetAddCellsize();
    }
    else if (position === "show_screen_counter") Settings_ShowCounter(Settings_Obj_default("show_screen_counter"));
    else if (position === "clock_offset") {
        Settings_SetClock();
        Main_updateclock();
    } else if (position === "bitrate_main") Settings_SetBitRate(1);
    else if (position === "bitrate_min") Settings_SetBitRate(2);
    else if (position === "dpad_opacity") Settings_DpadOpacity();
    else if (position === "dpad_position") Settings_DpadPOsition();
    else if (position === "pp_workaround") Settings_PP_Workaround();
    else if (position === "vod_seek_min") Settings_check_min_seek();
    else if (position === "vod_seek_max") Settings_check_max_seek();
}

function Settings_check_min_seek() {
    if (Settings_value.vod_seek_min.defaultValue >= Settings_value.vod_seek_max.defaultValue) {
        Settings_value.vod_seek_min.defaultValue = Settings_value.vod_seek_max.defaultValue;

        var key = 'vod_seek_min';
        Main_setItem(key, Settings_Obj_default(key) + 1);
        Main_textContent(key, Settings_Obj_values(key));
        Main_getElementById(key + "arrow_right").style.opacity = "0.2";
    }
}

function Settings_check_max_seek() {
    if (Settings_value.vod_seek_max.defaultValue <= Settings_value.vod_seek_min.defaultValue) {
        Settings_value.vod_seek_max.defaultValue = Settings_value.vod_seek_min.defaultValue;

        var key = 'vod_seek_max';
        Main_setItem(key, Settings_Obj_default(key) + 1);
        Main_textContent(key, Settings_Obj_values(key));
        Main_getElementById(key + "arrow_left").style.opacity = "0.2";
    }

}

function Settings_notification_check_any_enable() {

    if (!Settings_Obj_default("live_notification") &&
        !Settings_Obj_default("title_notification") &&
        !Settings_Obj_default("game_notification") &&
        !Settings_Obj_default("game_live_notification")) {
        OSInterface_StopNotificationService();
        return false;
    }

    return true;
}

function Settings_set_all_notification() {
    OSInterface_SetNotificationLive(Settings_Obj_default("live_notification") === 1);
    OSInterface_SetNotificationTitle(Settings_Obj_default("title_notification") === 1);
    OSInterface_SetNotificationTitle(Settings_Obj_default("title_notification") === 1);
    OSInterface_SetNotificationGame(Settings_Obj_default("game_notification") === 1);
}

function Settings_notification() {
    OSInterface_SetNotificationLive(Settings_Obj_default("live_notification") === 1);
    Settings_notification_background();
}

function Settings_notification_title() {
    OSInterface_SetNotificationTitle(Settings_Obj_default("title_notification") === 1);
    Settings_notification_background();
}

function Settings_notification_game() {
    OSInterface_SetNotificationGame(Settings_Obj_default("game_notification") === 1);
    Settings_notification_background();
}

function Settings_notification_game_live() {
    OSInterface_SetNotificationGameLive(Settings_Obj_default("game_live_notification") === 1);
    Settings_notification_background();
}

function Settings_notification_background() {
    OSInterface_upNotificationState(Settings_Obj_default("live_notification_background") === 1 && Settings_notification_check_any_enable());
}

function Settings_notification_position() {
    OSInterface_SetNotificationPosition(Settings_Obj_default("live_notification_position"));
}

function Settings_notification_repeat() {
    OSInterface_SetNotificationRepeat(Settings_Obj_values("repeat_notification"));
}

function Settings_notification_sicetime() {
    var time = Settings_Obj_default("since_notification");

    if (time) {
        var value = Settings_Obj_values("since_notification").split(' ');

        if (Main_A_includes_B(value[1], 'min')) {
            time = parseInt(value[0]) * 60 * 1000;
        } else {
            time = parseInt(value[0]) * 60 * 60 * 1000;
        }
    }

    OSInterface_SetNotificationSinceTime(time);
}

function Settings_SetPingWarning() {
    OSInterface_Settings_SetPingWarning(Settings_value.ping_warn.defaultValue === 1);
}

function Settings_PP_Workaround() {
    OSInterface_msetPlayer(!Settings_Obj_default("pp_workaround"), Play_isFullScreen);
}

function Settings_DpadOpacity() {
    OSInterface_SetKeysOpacity(Settings_Obj_default("dpad_opacity"));
}

function Settings_DpadPOsition() {
    OSInterface_SetKeysPosition(Settings_Obj_default("dpad_position"));
}

function Settings_SetAnimations() {
    var i, array, len,
        classes = ['screen_holder',
            'screen_holder_channel',
            'screen_holder_switch',
            'screen_holder_user',
            'screen_holder_games',
            'animate_height_transition_channel',
            'animate_height_transition_games',
            'animate_height_transition',
            'side_panel_holder_ani',
            'scenefeed_background',
            'side_panel_fix',
            'side_panel_movel',
            'side_panel'
        ],
        animate = Settings_Obj_default("app_animations"),
        mtransition = animate ? '' : 'none';

    classes.forEach(
        function(classe) {
            array = document.getElementsByClassName(classe);
            i = 0;
            len = array.length;
            for (i; i < len; i++)
                array[i].style.transition = mtransition;
        }
    );

    UserLiveFeed_FeedRemoveFocus(UserLiveFeed_FeedPosX);

    array = document.getElementsByClassName(Main_classThumb);

    try {
        //Array.prototype maybe not supported by all browsers
        Array.prototype.forEach.call(array,
            function(el) {
                el.classList.remove(Main_classThumb);
            }
        );
    } catch (e) {
        Main_Log('Settings_SetAnimations Array.prototype crash ' + e);
    }

    Main_classThumb = animate ? 'stream_thumbnail_focused' : 'stream_thumbnail_focused_no_ani';
    UserLiveFeed_FocusClass = animate ? 'feed_thumbnail_focused' : 'feed_thumbnail_focused_no_ani';
    Screens_SettingDoAnimations = animate;
}

function Settings_ShowCounter(show) {
    if (show) {
        Main_ShowElement('dialog_counter_text');
        Main_ShowElement('feed_counter');
    } else {
        Main_HideElement('dialog_counter_text');
        Main_HideElement('feed_counter');
    }
}

function Settings_SetBitRate(whocall) {
    if (Main_IsOn_OSInterface) {
        if (!whocall) {
            Settings_SetBitRateMain();
            Settings_SetBitRateMin();
        } else if (whocall === 1) Settings_SetBitRateMain();
        else if (whocall === 2) Settings_SetBitRateMin();
    }
}

function Settings_SetBitRateMain() {
    var value;

    if (Settings_Obj_default("bitrate_main") > 0)
        value = parseInt(Settings_Obj_values("bitrate_main").split(" ")[0] * 1000000);
    else value = 0;

    OSInterface_SetMainPlayerBitrate(value);
}

function Settings_SetBitRateMin() {
    var value;

    if (Settings_Obj_default("bitrate_min") > 0)
        value = parseInt(Settings_Obj_values("bitrate_min").split(" ")[0] * 1000000);
    else value = 0;

    OSInterface_SetSmallPlayerBitrate(value);
}

function Settings_SetBuffers(whocall) {
    if (!whocall) {
        Play_Buffer = Settings_Obj_values("buffer_live") * 1000;
        PlayVod_Buffer = Settings_Obj_values("buffer_vod") * 1000;
        PlayClip_Buffer = Settings_Obj_values("buffer_clip") * 1000;
        OSInterface_SetBuffer(1, Play_Buffer);
        OSInterface_SetBuffer(2, PlayVod_Buffer);
        OSInterface_SetBuffer(3, PlayClip_Buffer);
    } else if (whocall === 1) {
        Play_Buffer = Settings_Obj_values("buffer_live") * 1000;
        OSInterface_SetBuffer(1, Play_Buffer);
    } else if (whocall === 2) {
        PlayVod_Buffer = Settings_Obj_values("buffer_vod") * 1000;
        OSInterface_SetBuffer(2, PlayVod_Buffer);
    } else if (whocall === 3) {
        PlayClip_Buffer = Settings_Obj_values("buffer_clip") * 1000;
        OSInterface_SetBuffer(3, PlayClip_Buffer);
    }
}

//function Settings_CheckLang(lang) {
//    if (Main_A_includes_B(lang, 'en_')) Settings_value.general_lang.defaultValue = 0;
//    else if (Main_A_includes_B(lang, 'it_')) Settings_value.general_lang.defaultValue = 1;
//    else if (Main_A_includes_B(lang, 'pt_')) Settings_value.general_lang.defaultValue = 2;
//}

//function Settings_SetLang(lang) {
//    if (Main_A_includes_B(lang, 'en_')) en_USLang();
//else if (Main_A_includes_B(lang, 'it_')) it_ITLang();
//else if (Main_A_includes_B(lang, 'pt_')) pt_BRLang();
//    DefaultLang();
//    Main_SetStringsMain(false);
//    Main_SetStringsSecondary();
//}

function Settings_SetClock() {
    var time = Settings_Obj_default("clock_offset");
    Main_ClockOffset = time < 48 ? (48 - time) * -900000 : (time - 48) * 900000;
}

var Settings_CurY = 0;

function Settings_ScrollTable() {
    var doc,
        offset = (!Main_isTV || !Main_IsOn_OSInterface) ? 1 : 0;

    if (Settings_CurY < Settings_cursorY && Settings_cursorY === (12 + offset)) {
        doc = Main_getElementById('settings_scroll');
        doc.scrollTop = doc.scrollHeight;
        if (Settings_Obj_default("app_animations")) {
            var position = doc.scrollTop;
            doc.scrollTop = 0;
            scrollTo(doc, position, 200);
        }
    } else if (Settings_CurY > Settings_cursorY && Settings_cursorY === (11 + offset)) {
        doc = Main_getElementById('settings_scroll');
        if (Settings_Obj_default("app_animations")) scrollTo(doc, 0, 200);
        else doc.scrollTop = 0;
    }

    Settings_CurY = Settings_cursorY;
}

function Settings_ScrollTableReset() {
    Main_getElementById('settings_scroll').scrollTop = 0;
    Settings_CurY = 0;
}

function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 3;

    var animateScroll = function() {
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

function Settings_handleKeyDown(event) {
    var key;
    switch (event.keyCode) {
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Settings_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            key = Settings_value_keys[Settings_cursorY];
            if (Settings_Obj_default(key) > 0) {
                Settings_value[key].defaultValue -= 1;
                Settings_ChangeSettigs(Settings_cursorY);
            }
            break;
        case KEY_RIGHT:
            key = Settings_value_keys[Settings_cursorY];
            if (Settings_Obj_default(key) < Settings_Obj_length(key)) {
                Settings_value[key].defaultValue += 1;
                Settings_ChangeSettigs(Settings_cursorY);
            }
            break;
        case KEY_UP:
            if (Settings_cursorY > 0) {
                Settings_RemoveinputFocus();
                Settings_cursorY--;
                Settings_inputFocus(Settings_cursorY);
            }
            break;
        case KEY_DOWN:
            if (Settings_cursorY < (Settings_positions_length - 1)) {
                Settings_RemoveinputFocus();
                Settings_cursorY++;
                Settings_inputFocus(Settings_cursorY);
            }
            break;
        case KEY_ENTER:
            if (!Settings_cursorY) Languages_init();
            else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'player_end_opt')) Settings_PlayerEnd();
            else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'blocked_codecs')) Settings_CodecsShow();
            else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'player_buffers')) Settings_DialogShowBuffer();
            else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'player_bitrate')) Settings_DialogShowBitrate();
            else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'vod_seek')) Settings_vod_seek();
            else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'small_feed_player')) Settings_DialogShowSmallPayer();
            else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'live_notification_opt')) Settings_DialogShowNotification();
            else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'dpad_opt')) Settings_DialogShowDpad();
            else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'ui_opt')) Settings_DialogShowUIOpt();
            else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'custom_opt')) Settings_DialogShowCustomOpt();
            else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'warnings_opt')) Settings_DialogShowWarnings();
            else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'chat_opt')) Settings_DialogShowChat();
            break;
        default:
            break;
    }
}

var Settings_CodecsValue = [];
var Settings_CodecsPos;
var Settings_DisableCodecsNames = [];

function Settings_CodecsShow() {
    Main_removeEventListener("keydown", Settings_handleKeyDown);

    if (!Settings_CodecsValue.length) {

        if (!Main_IsOn_OSInterface) Settings_CodecsValue = [{"instances": 32, "maxbitrate": "120 Mbps", "maxlevel": "5.2", "maxresolution": "3840x2176", "name": "OMX.Nvidia.h264.decode", "resolutions": "160p : 960 fps | 360p : 960 fps | 480p : 960 fps | 720p : 555 fps | 1080p : 245 fps | 1440p : 138 fps | 2160p : 61 fps", "type": "video/avc"}, {"instances": 32, "maxbitrate": "48 Mbps", "maxlevel": "5.2", "maxresolution": "4080x4080", "name": "OMX.google.h264.decoder", "resolutions": "160p : 960 fps | 360p : 960 fps | 480p : 960 fps | 720p : 546 fps | 1080p : 240 fps | 1440p : 136 fps | 2160p : 60 fps", "type": "video/avc"}, {"instances": -1, "maxbitrate": "48 Mbps", "maxlevel": "5.2", "maxresolution": "4080x4080", "name": "OMX.chico.h264.decoder", "resolutions": "160p : 960 fps | 360p : 960 fps | 480p : 960 fps | 720p : 546 fps | 1080p : 240 fps | 1440p : 136 fps | 2160p : 60 fps", "type": "video/avc"}];
        else {
            try {
                Settings_CodecsValue = JSON.parse(OSInterface_getcodecCapabilities('avc'));
            } catch (e) {
                Settings_CodecsValue = [];
            }
        }

        if (Settings_CodecsValue.length) {
            var dialogContent = '',
                DivContent,
                spacer = " | ";

            dialogContent += STR_CODEC_DIALOG_TITLE + STR_BR +
                STR_DIV_TITLE + STR_SUPPORTED_CODEC + '</div>' + STR_BR;

            var i = 0, len = Settings_CodecsValue.length;
            for (i; i < len; i++) {

                Settings_value[Settings_CodecsValue[i].name] = {
                    "values": [STR_ENABLE, STR_DISABLE],
                    "defaultValue": Main_getItemInt(Settings_CodecsValue[i].name, 0)
                };

                DivContent = "";
                DivContent += STR_MAX_RES + Settings_CodecsValue[i].maxresolution + spacer;
                DivContent += STR_MAX_BIT + Settings_CodecsValue[i].maxbitrate + spacer;
                DivContent += STR_MAX_LEVEL + Settings_CodecsValue[i].maxlevel + spacer;
                DivContent += STR_MAX_INSTANCES + ((Settings_CodecsValue[i].instances > -1) ? Settings_CodecsValue[i].instances : STR_UNKNOWN) + STR_BR;
                DivContent += Settings_CodecsValue[i].resolutions;

                dialogContent += Settings_DivOptionWithSummary(Settings_CodecsValue[i].name, Settings_CodecsValue[i].name, DivContent + STR_BR + STR_BR, 73);
            }

            Main_innerHTML("dialog_codecs_text", dialogContent + STR_DIV_TITLE + STR_CLOSE_THIS + '</div>');
        }

    }

    if (Settings_CodecsValue.length) {
        Settings_CodecsPos = 0;
        Main_AddClass(Settings_CodecsValue[Settings_CodecsPos].name, 'settings_value_focus');
        Main_AddClass(Settings_CodecsValue[Settings_CodecsPos].name + '_div', 'settings_div_focus');
        Settings_SetarrowsKey(Settings_CodecsValue[Settings_CodecsPos].name);
    }

    Main_ShowElement('dialog_codecs');
    Main_addEventListener("keydown", Settings_handleKeyDownCodecs);
}

function Settings_handleKeyDownCodecs(event) {
    var key;
    switch (event.keyCode) {
        case KEY_ENTER:
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            Settings_RemoveinputFocusKey(Settings_CodecsValue[Settings_CodecsPos].name);
            Main_HideElement('dialog_codecs');
            Main_removeEventListener("keydown", Settings_handleKeyDownCodecs);
            Main_addEventListener("keydown", Settings_handleKeyDown);
            break;
        case KEY_LEFT:
            key = Settings_CodecsValue[Settings_CodecsPos].name;
            if (Settings_Obj_default(key) > 0) Settings_CodecsRigthLeft(-1);
            break;
        case KEY_RIGHT:
            key = Settings_CodecsValue[Settings_CodecsPos].name;
            if (Settings_Obj_default(key) < Settings_Obj_length(key)) Settings_CodecsRigthLeft(1);
            break;
        case KEY_UP:
            if (Settings_CodecsPos > 0) Settings_CodecsUpDown(-1);
            break;
        case KEY_DOWN:
            if (Settings_CodecsPos < (Settings_CodecsValue.length - 1)) Settings_CodecsUpDown(1);
            break;
        default:
            break;
    }
}

function Settings_Codecs_isVisible() {
    return Main_isElementShowing('dialog_codecs');
}

function Settings_CodecsUpDown(offset) {
    Settings_RemoveinputFocusKey(Settings_CodecsValue[Settings_CodecsPos].name);
    Settings_CodecsPos += offset;

    var key = Settings_CodecsValue[Settings_CodecsPos].name;
    Main_AddClass(key, 'settings_value_focus');
    Main_AddClass(key + '_div', 'settings_div_focus');
    Settings_SetarrowsKey(key);
}

function Settings_CodecsRigthLeft(offset) {

    if (Settings_CodecsValue.length < 2) {
        Main_showWarningDialog(STR_ONE_CODEC_ENA, 2000);
        return;
    }

    var key = Settings_CodecsValue[Settings_CodecsPos].name,
        index;

    Settings_value[key].defaultValue += offset;

    Main_setItem(key, Settings_Obj_default(key));
    Main_textContent(key, Settings_Obj_values(key));
    Settings_SetarrowsKey(key);

    if (Settings_value[key].defaultValue) {
        Settings_DisableCodecsNames.push(Settings_CodecsValue[Settings_CodecsPos].name);

        //Make sure at least one is enable
        var oneEnable = false,
            i = 0,
            len = Settings_CodecsValue.length;

        for (i; i < len; i++) {
            if (!Settings_value[Settings_CodecsValue[i].name].defaultValue) {
                oneEnable = true;
                break;
            }
        }

        if (!oneEnable) {
            Main_showWarningDialog(STR_ONE_CODEC_ENA, 2000);

            i = 0;
            len = Settings_CodecsValue.length;
            for (i; i < len; i++) {
                if (Settings_CodecsPos !== i) {
                    key = Settings_CodecsValue[i].name;
                    Settings_value[key].defaultValue += -1;
                    Main_setItem(key, Settings_Obj_default(key));
                    Main_textContent(key, Settings_Obj_values(key));
                    index = Settings_DisableCodecsNames.indexOf(Settings_CodecsValue[i].name);
                    if (index > -1) Settings_DisableCodecsNames.splice(index, 1);

                    break;
                }
            }
        }
    } else {
        index = Settings_DisableCodecsNames.indexOf(Settings_CodecsValue[Settings_CodecsPos].name);
        if (index > -1) Settings_DisableCodecsNames.splice(index, 1);
    }

    Main_setItem('Settings_DisableCodecsNames', JSON.stringify(Settings_DisableCodecsNames));
    Settings_CodecsSet();
}

function Settings_CodecsSet() {
    if (Main_IsOn_OSInterface) OSInterface_setBlackListMediaCodec(Settings_DisableCodecsNames.join());
}

function Settings_ForceEnableAimations() {
    Settings_value.app_animations.defaultValue = 1;
    Main_setItem('app_animations', 2);
    Settings_SetAnimations();
}

function Settings_DialogShowBuffer() {
    var obj = {
        buffer_live: {
            defaultValue: Settings_value.buffer_live.defaultValue,
            values: Settings_value.buffer_live.values,
            title: STR_SETTINGS_BUFFER_LIVE,
            summary: null
        },
        buffer_vod: {
            defaultValue: Settings_value.buffer_vod.defaultValue,
            values: Settings_value.buffer_vod.values,
            title: STR_SETTINGS_BUFFER_VOD,
            summary: null
        },
        buffer_clip: {
            defaultValue: Settings_value.buffer_clip.defaultValue,
            values: Settings_value.buffer_clip.values,
            title: STR_SETTINGS_BUFFER_CLIP,
            summary: null
        },
    };

    Settings_DialogShow(obj, STR_SETTINGS_BUFFER_SIZE + STR_BR + STR_SETTINGS_BUFFER_SIZE_SUMMARY);
}

function Settings_DialogShowBitrate() {
    var obj = {
        bitrate_main: {
            defaultValue: Settings_value.bitrate_main.defaultValue,
            values: Settings_value.bitrate_main.values,
            title: STR_PLAYER_BITRATE_MAIN,
            summary: null
        },
        bitrate_min: {
            defaultValue: Settings_value.bitrate_min.defaultValue,
            values: Settings_value.bitrate_min.values,
            title: STR_PLAYER_BITRATE_SMALL,
            summary: STR_PLAYER_BITRATE_SMALL_SUMMARY
        }
    };

    Settings_DialogShow(obj, STR_PLAYER_BITRATE + STR_BR + STR_PLAYER_BITRATE_SUMMARY);
}

function Settings_vod_seek() {
    var obj = {
        vod_seek_min: {
            defaultValue: Settings_value.vod_seek_min.defaultValue,
            values: Settings_value.vod_seek_min.values,
            title: STR_VOD_SEEK_MIN,
            summary: null
        },
        vod_seek_max: {
            defaultValue: Settings_value.vod_seek_max.defaultValue,
            values: Settings_value.vod_seek_max.values,
            title: STR_VOD_SEEK_MAX,
            summary: null
        },
        vod_seek_time: {
            defaultValue: Settings_value.vod_seek_time.defaultValue,
            values: Settings_value.vod_seek_time.values,
            title: STR_VOD_SEEK_TIME,
            summary: null
        },
    };

    Settings_DialogShow(obj, STR_VOD_SEEK + STR_BR + STR_BR + STR_VOD_SEEK_SUMMARY);
}

function Settings_DialogShowSmallPayer() {
    var array_no_yes = [STR_NO, STR_YES];
    Settings_value.show_feed_player.values = array_no_yes;
    Settings_value.disable_feed_player_multi.values = array_no_yes;
    Settings_value.show_side_player.values = array_no_yes;
    Settings_value.show_live_player.values = array_no_yes;
    Settings_value.show_vod_player.values = array_no_yes;
    Settings_value.show_clip_player.values = array_no_yes;
    Settings_value.auto_clip_preview.values = array_no_yes;

    Settings_value.preview_screen_sizes.values = STR_PREVIEW_SIZE_SCREEN_ARRAY;
    Settings_value.preview_sizes.values = STR_PREVIEW_SIZE_ARRAY;

    var obj = {
        show_live_player: {
            defaultValue: Settings_value.show_live_player.defaultValue,
            values: Settings_value.show_live_player.values,
            title: STR_SHOW_LIVE_PLAYER,
            summary: null
        },
        show_vod_player: {
            defaultValue: Settings_value.show_vod_player.defaultValue,
            values: Settings_value.show_vod_player.values,
            title: STR_SHOW_VOD_PLAYER,
            summary: null
        },
        show_clip_player: {
            defaultValue: Settings_value.show_clip_player.defaultValue,
            values: Settings_value.show_clip_player.values,
            title: STR_SHOW_CLIP_PLAYER,
            summary: null
        },
        auto_clip_preview: {
            defaultValue: Settings_value.auto_clip_preview.defaultValue,
            values: Settings_value.auto_clip_preview.values,
            title: STR_AUTO_PLAY_NEXT,
            summary: STR_PREVIEW_CLIP_NEXT
        },
        show_side_player: {
            defaultValue: Settings_value.show_side_player.defaultValue,
            values: Settings_value.show_side_player.values,
            title: STR_SHOW_SIDE_PLAYER,
            summary: null
        },
        show_feed_player: {
            defaultValue: Settings_value.show_feed_player.defaultValue,
            values: Settings_value.show_feed_player.values,
            title: STR_SHOW_FEED_PLAYER,
            summary: STR_SHOW_FEED_PLAYER_SUMMARY
        },
        disable_feed_player_multi: {
            defaultValue: Settings_value.disable_feed_player_multi.defaultValue,
            values: Settings_value.disable_feed_player_multi.values,
            title: STR_DISABLE_FEED_PLAYER_MULTI,
            summary: STR_DISABLE_FEED_PLAYER_MULTI_SUMMARY
        },
        preview_screen_sizes: {
            defaultValue: Settings_value.preview_screen_sizes.defaultValue,
            values: Settings_value.preview_screen_sizes.values,
            title: STR_PREVIEW_SIZE_SCREEN,
            summary: STR_PREVIEW_SIZE_SCREEN_SUMMARY
        },
        preview_sizes: {
            defaultValue: Settings_value.preview_sizes.defaultValue,
            values: Settings_value.preview_sizes.values,
            title: STR_PREVIEW_SIZE,
            summary: STR_PREVIEW_SIZE_SUMMARY
        },
        preview_volume: {
            defaultValue: Settings_value.preview_volume.defaultValue,
            values: Settings_value.preview_volume.values,
            title: STR_PREVIEW_VOLUME,
            summary: STR_PREVIEW_VOLUME_SUMMARY
        },
        preview_others_volume: {
            defaultValue: Settings_value.preview_others_volume.defaultValue,
            values: Settings_value.preview_others_volume.values,
            title: STR_PREVIEW_OTHERS_VOLUME,
            summary: STR_PREVIEW_OTHERS_VOLUME_SUMMARY
        },
        show_feed_player_delay: {
            defaultValue: Settings_value.show_feed_player_delay.defaultValue,
            values: Settings_value.show_feed_player_delay.values,
            title: STR_SIDE_PANEL_PLAYER_DELAY,
            summary: STR_SIDE_PANEL_PLAYER_DELAY_SUMMARY
        }
    };

    Settings_DialogShow(obj, STR_SIDE_PANEL_PLAYER);
}

function Settings_DialogShowNotification() {
    Settings_value.live_notification.values = [STR_NO, STR_YES];
    Settings_value.live_notification_background.values = [STR_NO, STR_YES];
    Settings_value.title_notification.values = [STR_NO, STR_YES];
    Settings_value.game_notification.values = [STR_NO, STR_YES];
    Settings_value.game_live_notification.values = [STR_NO, STR_YES];
    Settings_value.live_notification_position.values = STR_NOTIFICATION_POS_ARRAY;
    Settings_value.since_notification.values[0] = STR_DISABLE;

    var obj = {
        live_notification: {
            defaultValue: Settings_value.live_notification.defaultValue,
            values: Settings_value.live_notification.values,
            title: STR_NOW_LIVE_SHOW,
            summary: null
        },
        title_notification: {
            defaultValue: Settings_value.title_notification.defaultValue,
            values: Settings_value.title_notification.values,
            title: STR_TITLE_CHANGE_SHOW,
            summary: null
        },
        game_notification: {
            defaultValue: Settings_value.game_notification.defaultValue,
            values: Settings_value.game_notification.values,
            title: STR_GAME_CHANGE_SHOW,
            summary: null
        },
        game_live_notification: {
            defaultValue: Settings_value.game_live_notification.defaultValue,
            values: Settings_value.game_live_notification.values,
            title: STR_NOW_LIVE_GAME_SHOW,
            summary: null
        },
        live_notification_background: {
            defaultValue: Settings_value.live_notification_background.defaultValue,
            values: Settings_value.live_notification_background.values,
            title: STR_NOW_BACKGROUND,
            summary: STR_NOW_BACKGROUND_SUMMARY
        },
        live_notification_position: {
            defaultValue: Settings_value.live_notification_position.defaultValue,
            values: Settings_value.live_notification_position.values,
            title: STR_NOTIFICATION_POS,
            summary: null
        },
        repeat_notification: {
            defaultValue: Settings_value.repeat_notification.defaultValue,
            values: Settings_value.repeat_notification.values,
            title: STR_NOTIFICATION_REPEAT,
            summary: STR_NOTIFICATION_REPEAT_SUMMARY
        },
        since_notification: {
            defaultValue: Settings_value.since_notification.defaultValue,
            values: Settings_value.since_notification.values,
            title: STR_NOTIFICATION_SINCE,
            summary: STR_NOTIFICATION_SINCE_SUMMARY
        }
    };


    Settings_DialogShow(obj, STR_NOTIFICATION_OPT);
}

function Settings_DialogShowDpad() {

    var obj = {
        dpad_position: {
            defaultValue: Settings_value.dpad_position.defaultValue,
            values: Settings_value.dpad_position.values,
            title: STR_DPAD_POSTION,
            summary: null
        },
        dpad_opacity: {
            defaultValue: Settings_value.dpad_opacity.defaultValue,
            values: Settings_value.dpad_opacity.values,
            title: STR_DPAD_OPACITY,
            summary: null
        }
    };

    Settings_DialogShow(obj, STR_DPAD_OPT);
}

function Settings_DialogShowUIOpt() {
    Settings_value.app_animations.values = [STR_NO, STR_YES];
    Settings_value.videos_animation.values = [STR_NO, STR_YES];
    Settings_value.show_screen_counter.values = [STR_NO, STR_YES];
    Settings_value.thumb_quality.values = [STR_VERY_LOW, STR_LOW, STR_NORMAL, STR_HIGH, STR_VERY_HIGH];

    var obj = {
        thumb_background: {
            defaultValue: Settings_value.thumb_background.defaultValue,
            values: Settings_value.thumb_background.values,
            title: STR_THUMB_STYLE,
            summary: null,
            keyenter: true
        },
        thumb_quality: {
            defaultValue: Settings_value.thumb_quality.defaultValue,
            values: Settings_value.thumb_quality.values,
            title: STR_THUMB_RESOLUTION,
            summary: STR_THUMB_RESOLUTION_SUMMARY
        },
        app_animations: {
            defaultValue: Settings_value.app_animations.defaultValue,
            values: Settings_value.app_animations.values,
            title: STR_APP_ANIMATIONS,
            summary: STR_APP_ANIMATIONS_SUMMARY
        },
        videos_animation: {
            defaultValue: Settings_value.videos_animation.defaultValue,
            values: Settings_value.videos_animation.values,
            title: STR_VIDEOS_ANIMATION,
            summary: STR_VIDEOS_ANIMATION_SUMMARY
        },
        global_font_offset: {
            defaultValue: Settings_value.global_font_offset.defaultValue,
            values: Settings_value.global_font_offset.values,
            title: STR_GLOBAL_FONT,
            summary: STR_GLOBAL_FONT_SUMMARY
        },
        show_screen_counter: {
            defaultValue: Settings_value.show_screen_counter.defaultValue,
            values: Settings_value.show_screen_counter.values,
            title: STR_SCREEN_COUNTER,
            summary: STR_SCREEN_COUNTER_SUMMARY
        },
        clock_offset: {
            defaultValue: Settings_value.clock_offset.defaultValue,
            values: Settings_value.clock_offset.values,
            title: STR_CLOCK_OFFSET,
            summary: STR_CLOCK_OFFSET_SUMMARY
        },
    };

    Settings_DialogShow(obj, STR_UI_SETTINGS);
}

function Settings_DialogShowCustomOpt() {
    Settings_value.auto_refresh_background.values = [STR_NO, STR_YES];
    Settings_value.auto_refresh_screen.values[0] = STR_DISABLE;

    Settings_value.live_feed_sort.values = [
        STR_VIWES_MOST,
        STR_VIWES_LOWEST,
        STR_NAME_A_Z,
        STR_NAME_Z_A,
        STR_GAME_A_Z,
        STR_GAME_Z_A,
        STR_CREATED_NEWEST,
        STR_CREATED_OLDEST
    ];

    Settings_value.game_feed_sort.values = [
        STR_VIWES_MOST,
        STR_VIWES_LOWEST,
        STR_NAME_A_Z,
        STR_NAME_Z_A,
        STR_CHANNELS_MOST,
        STR_CHANNELS_LOWEST
    ];

    var obj = {
        live_feed_sort: {
            defaultValue: Settings_value.live_feed_sort.defaultValue,
            values: Settings_value.live_feed_sort.values,
            title: STR_LIVE_FEED_SORT,
            summary: STR_LIVE_FEED_SORT_SUMMARY
        },
        game_feed_sort: {
            defaultValue: Settings_value.game_feed_sort.defaultValue,
            values: Settings_value.game_feed_sort.values,
            title: STR_GAME_SORT,
            summary: null
        },
        auto_refresh_screen: {
            defaultValue: Settings_value.auto_refresh_screen.defaultValue,
            values: Settings_value.auto_refresh_screen.values,
            title: STR_AUTO_REFRESH,
            summary: STR_AUTO_REFRESH_SUMMARY
        },
        auto_refresh_background: {
            defaultValue: Settings_value.auto_refresh_background.defaultValue,
            values: Settings_value.auto_refresh_background.values,
            title: STR_AUTO_REFRESH_BACKGROUND,
            summary: STR_AUTO_REFRESH_BACKGROUND_SUMMARY
        },
        key_up_timeout: {
            defaultValue: Settings_value.key_up_timeout.defaultValue,
            values: Settings_value.key_up_timeout.values,
            title: STR_KEY_UP_TIMEOUT,
            summary: STR_KEY_UP_TIMEOUT_SUMMARY
        }
    };

    Settings_DialogShow(obj, STR_GENERAL_CUSTOM);
}

function Settings_DialogShowWarnings() {
    Settings_value.accessibility_warn.values = [STR_NO, STR_YES];
    Settings_value.ping_warn.values = [STR_NO, STR_YES];

    var obj = {
        accessibility_warn: {
            defaultValue: Settings_value.accessibility_warn.defaultValue,
            values: Settings_value.accessibility_warn.values,
            title: STR_SETTINGS_ACCESSIBILITY,
            summary: STR_SETTINGS_ACCESSIBILITY_SUMMARY + STR_SPACE + STR_ACCESSIBILITY_WARN_EXTRA + STR_SPACE + STR_APP_LAG
        },
        ping_warn: {
            defaultValue: Settings_value.ping_warn.defaultValue,
            values: Settings_value.ping_warn.values,
            title: STR_PING_WARNING,
            summary: STR_PING_WARNING_SUMMARY
        }
    };

    Settings_DialogShow(obj, STR_WARNINGS);
}

function Settings_PlayerEnd() {
    var yes_no = [STR_NO, STR_YES];
    Settings_value.open_host.values = yes_no;
    Settings_value.play_stay.values = yes_no;
    Settings_value.clip_auto_play_next.values = yes_no;
    Settings_value.end_dialog_counter.values[0] = STR_END_DIALOG_DISABLE;

    var obj = {
        open_host: {
            defaultValue: Settings_value.open_host.defaultValue,
            values: Settings_value.open_host.values,
            title: STR_OPEN_HOST_SETTINGS,
            summary: null
        },
        play_stay: {
            defaultValue: Settings_value.play_stay.defaultValue,
            values: Settings_value.play_stay.values,
            title: STR_ALWAYS_STAY,
            summary: null
        },
        clip_auto_play_next: {
            defaultValue: Settings_value.clip_auto_play_next.defaultValue,
            values: Settings_value.clip_auto_play_next.values,
            title: STR_AUTO_PLAY_NEXT,
            summary: null
        },
        end_dialog_counter: {
            defaultValue: Settings_value.end_dialog_counter.defaultValue,
            values: Settings_value.end_dialog_counter.values,
            title: STR_END_DIALOG_SETTINGS,
            summary: STR_END_DIALOG_SETTINGS_SUMMARY
        },
    };
    Settings_DialogShow(obj, STR_END_DIALOG_OPT);
}

function Settings_DialogShowChat() {
    var yes_no = [STR_NO, STR_YES];
    Settings_value.highlight_rewards.values = yes_no;
    Settings_value.highlight_atstreamer.values = yes_no;
    Settings_value.highlight_atuser.values = yes_no;
    Settings_value.highlight_user_send.values = yes_no;
    Settings_value.show_sub.values = yes_no;
    Settings_value.highlight_bits.values = yes_no;
    Settings_value.show_actions.values = yes_no;
    Settings_value.chat_individual_background.values = [STR_DISABLE, STR_ENABLE, STR_BRIGHT_MODE, STR_DARK_MODE];
    Settings_value.chat_logging.values = yes_no;
    Settings_value.individual_lines.values = yes_no;
    Settings_value.chat_nickcolor.values = yes_no;
    Settings_value.chat_timestamp.values = yes_no;
    Settings_value.clear_chat.values = yes_no;
    Settings_value.show_chatters.values = yes_no;

    var obj = {
        chat_logging: {
            defaultValue: Settings_value.chat_logging.defaultValue,
            values: Settings_value.chat_logging.values,
            title: STR_CHAT_LOGGING,
            summary: STR_CHAT_LOGGING_SUMMARY
        },
        individual_lines: {
            defaultValue: Settings_value.individual_lines.defaultValue,
            values: Settings_value.individual_lines.values,
            title: STR_CHAT_INDIVIDUAL_LINE,
            summary: null
        },
        chat_individual_background: {
            defaultValue: Settings_value.chat_individual_background.defaultValue,
            values: Settings_value.chat_individual_background.values,
            title: STR_CHAT_INDIVIDUAL_BACKGROUND,
            summary: STR_CHAT_INDIVIDUAL_BACKGROUND_SUMMARY
        },
        chat_timestamp: {
            defaultValue: Settings_value.chat_timestamp.defaultValue,
            values: Settings_value.chat_timestamp.values,
            title: STR_CHAT_TIMESTAMP,
            summary: null
        },
        show_chatters: {
            defaultValue: Settings_value.chat_timestamp.defaultValue,
            values: Settings_value.chat_timestamp.values,
            title: STR_SHOW_IN_CHAT,
            summary: STR_SHOW_IN_CHAT_SUMMARY
        },
        chat_nickcolor: {
            defaultValue: Settings_value.chat_nickcolor.defaultValue,
            values: Settings_value.chat_nickcolor.values,
            title: STR_CHAT_NICK_COLOR,
            summary: STR_CHAT_NICK_COLOR_SUMMARY
        },
        highlight_rewards: {
            defaultValue: Settings_value.highlight_rewards.defaultValue,
            values: Settings_value.highlight_rewards.values,
            title: STR_CHAT_HIGHLIGHT_REDEEMED,
            summary: null
        },
        highlight_atstreamer: {
            defaultValue: Settings_value.highlight_atstreamer.defaultValue,
            values: Settings_value.highlight_atstreamer.values,
            title: STR_CHAT_HIGHLIGHT_STREAMER,
            summary: null
        },
        highlight_atuser: {
            defaultValue: Settings_value.highlight_atuser.defaultValue,
            values: Settings_value.highlight_atuser.values,
            title: STR_CHAT_HIGHLIGHT_USER,
            summary: null
        },
        highlight_user_send: {
            defaultValue: Settings_value.highlight_user_send.defaultValue,
            values: Settings_value.highlight_user_send.values,
            title: STR_CHAT_HIGHLIGHT_USER_SEND,
            summary: null
        },
        show_sub: {
            defaultValue: Settings_value.show_sub.defaultValue,
            values: Settings_value.show_sub.values,
            title: STR_CHAT_SHOW_SUB,
            summary: null
        },
        highlight_bits: {
            defaultValue: Settings_value.highlight_bits.defaultValue,
            values: Settings_value.highlight_bits.values,
            title: STR_CHAT_HIGHLIGHT_BIT,
            summary: null
        },
        clear_chat: {
            defaultValue: Settings_value.clear_chat.defaultValue,
            values: Settings_value.clear_chat.values,
            title: STR_CHAT_CLEAR_MSG,
            summary: STR_CHAT_CLEAR_MSG_SUMMARY
        },
        show_actions: {
            defaultValue: Settings_value.show_actions.defaultValue,
            values: Settings_value.show_actions.values,
            title: STR_CHAT_HIGHLIGHT_ACTIONS,
            summary: STR_CHAT_HIGHLIGHT_ACTIONS_SUMMARY
        },
    };

    Settings_DialogShow(obj, STR_CHAT_OPTIONS);
}

function Settings_Dialog_isVisible() {
    return Main_isElementShowing('dialog_settings');
}

var Settings_DialogValue = [];
var Settings_DialogPos = 0;

function Settings_DialogShow(obj, title) {
    Main_removeEventListener("keydown", Settings_handleKeyDown);

    var dialogContent = title + STR_BR + STR_BR;
    Settings_DialogValue = [];

    for (var property in obj) {
        Settings_DialogValue.push(property);
        if (obj[property].keyenter) {
            dialogContent += Settings_Content(property, [STR_CONTENT_LANG_SUMMARY], obj[property].title, null);
        } else {
            dialogContent += obj[property].summary ?
                Settings_DivOptionWithSummary(property, obj[property].title, obj[property].summary, 73) :
                Settings_DivOptionNoSummary(property, obj[property].title);
        }
    }

    Main_innerHTML("dialog_settings_text", dialogContent + STR_DIV_TITLE + STR_CLOSE_THIS + '</div>');

    Settings_DialogPos = 0;
    Main_AddClass(Settings_DialogValue[0], 'settings_value_focus');
    Main_AddClass(Settings_DialogValue[0] + '_div', 'settings_div_focus');
    Settings_SetarrowsKey(Settings_DialogValue[0]);

    Main_ShowElement('dialog_settings');
    Main_addEventListener("keydown", Settings_DialoghandleKeyDown);
}

function Settings_DialoghandleKeyDown(event) {
    var key;
    switch (event.keyCode) {
        case KEY_ENTER:
            if ((Main_A_includes_B(Settings_DialogValue[Settings_DialogPos], 'thumb_background'))) {
                SettingsColor_DialogColorsShow();
                break;
            }
        /* falls through */
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            Settings_RemoveinputFocusKey(Settings_DialogValue[Settings_DialogPos]);
            Main_HideElement('dialog_settings');
            Main_removeEventListener("keydown", Settings_DialoghandleKeyDown);
            Main_addEventListener("keydown", Settings_handleKeyDown);
            break;
        case KEY_LEFT:
            key = Settings_DialogValue[Settings_DialogPos];
            if (Settings_Obj_default(key) > 0) Settings_DialogRigthLeft(-1);
            break;
        case KEY_RIGHT:
            key = Settings_DialogValue[Settings_DialogPos];
            if (Settings_Obj_default(key) < Settings_Obj_length(key)) Settings_DialogRigthLeft(1);
            break;
        case KEY_UP:
            if (Settings_DialogPos > 0) Settings_DialogUpDown(-1);
            break;
        case KEY_DOWN:
            if (Settings_DialogPos < (Settings_DialogValue.length - 1)) Settings_DialogUpDown(1);
            break;
        default:
            break;
    }
}

function Settings_DialogUpDown(offset) {
    Settings_RemoveinputFocusKey(Settings_DialogValue[Settings_DialogPos]);
    Settings_DialogPos += offset;

    var key = Settings_DialogValue[Settings_DialogPos];
    Main_AddClass(key, 'settings_value_focus');
    Main_AddClass(key + '_div', 'settings_div_focus');
    Settings_SetarrowsKey(key);
}

function Settings_DialogRigthLeft(offset) {
    var key = Settings_DialogValue[Settings_DialogPos];

    Settings_value[key].defaultValue += offset;

    Main_setItem(key, Settings_Obj_default(key) + 1);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_SetarrowsKey(key);
    Settings_SetDefault(key);
}