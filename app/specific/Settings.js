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
var Settings_PreviewDelay = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
var Settings_jumpTimers = [5, 10, 30, 60, 120, 300, 600, 900, 1200, 1800, 3600];
var Settings_Seek_Time = [250, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
var bitrate_values = ['disable', 11, 10.5, 10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1];
var res_values = ['disable', '2160p', '1600p', '1440p', '1080p', '720p', '480p', '360p', '160p'];
var buffer_values = [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
//For clips the api accept a coma and extra languages
// var Languages_Extra = {
//     en: 'en,en-gb',
//     es: 'es,es-mx',
//     pt: 'pt,pt-br'
// };
var Settings_VolumeScale = 5;

var Settings_AV1Supported = 0;
var Settings_HEVCSupported = 0;

var Settings_value = {
    content_lang: {
        values: [
            'All',
            'American Sign Language [ASL]',
            'العربية - Al Arabiya [AR]',
            'Bahasa Indonesia [ID]',
            'Български - Bulgarian [BG]',
            'Català - Catalan [CA]',
            'Čeština - Czech [CS]',
            'Dansk - Danish [DA]',
            'Deutsch [DE]',
            'Ελληνικά - Griechisch [EL]',
            'English [EN]',
            'Español - Spanish [ES]',
            'Suomi - Finnish [FI]',
            'Français - French [FR]',
            'Italiano - Italian [IT]',
            'मानक हिन्दी - Hindi [HI]',
            'Magyar - Hungarian [HU]',
            '日本語 - Japanese [JA]',
            '한국어 - Korean [KO]',
            'بهاس ملايو - Malay [MS]',
            'Nederlands - Dutch [NL]',
            'Norsk - Norwegian [NO]',
            'Polski - Polish [PL]',
            'Português - Portuguese [PT]',
            'Română - Romanian  [RO]',
            'Русский - Russian [RU]',
            'Slovenčina - Slovak [SK]',
            'Svenska - Swedish [SV]',
            'ภาษาไทย - Tai [TH]',
            'Türkçe - Turkish [TR]',
            'Tiếng Việt - Vietnamese [VI]',
            'Tagalog [TL]',
            'Українська - Ukrainian [UK]',
            '中文 - Chinese [ZH]',
            'Other'
        ],
        apply_values: [
            '',
            'asl',
            'ar',
            'id',
            'bg',
            'ca',
            'cs',
            'da',
            'de',
            'el',
            'en',
            'es',
            'fi',
            'fr',
            'it',
            'hi',
            'hu',
            'ja',
            'ko',
            'ms',
            'nl',
            'no',
            'pl',
            'pt',
            'ro',
            'ru',
            'sk',
            'sv',
            'th',
            'tr',
            'vi',
            'tl',
            'uk',
            'zh',
            'other'
        ],
        defaultValue: 1
    },
    app_lang: {
        values: ['English [EN]', 'Español [ES]', 'Português [PT-BR]', 'Русский [RU]'],
        apply_values: ['en_US', 'es_Us', 'pt_BR', 'ru_RU'],
        defaultValue: 1
    },
    loadAll_lang: {
        values: ['no', 'yes'],
        defaultValue: 2
    },
    show_banner: {
        values: ['no', 'yes'],
        defaultValue: 2
    },
    av1_codec: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    hevc_codec: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    speed_adjust: {
        values: ['no', 'yes'],
        defaultValue: 1
    },
    ttv_lolProxy: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    proxy_timeout: {
        //Migrated to dialog
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30],
        defaultValue: 10
    },
    T1080: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    k_twitch: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    restor_playback: {
        values: ['no', 'yes'],
        defaultValue: 2
    },
    clip_autoPlayNext: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    seek_preview: {
        values: ['Disabled', 'Single preview', 'Carousel'],
        defaultValue: 3
    },
    PP_workaround: {
        values: ['no', 'yes'],
        defaultValue: 1
    },
    single_clickExit: {
        values: ['no', 'yes'],
        defaultValue: 1
    },
    accessibility_warn: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    ping_warn: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    live_warn: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    app_animations: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    show_feed_player: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    preview_others_volume_new: {
        //Migrated to dialog
        values: Settings_GetVolumes(),
        defaultValue: 6
    },
    preview_volume_new: {
        //Migrated to dialog
        values: Settings_GetVolumes(),
        defaultValue: 21
    },
    screen_preview_volume: {
        //Migrated to dialog
        values: Settings_GetVolumes(),
        defaultValue: 21
    },
    preview_sizes: {
        //Migrated to dialog
        values: ['s', 'm', 'l', 'xl'],
        defaultValue: 2
    },
    preview_screen_sizes: {
        //Migrated to dialog
        values: ['n', 'l'],
        defaultValue: 1
    },
    show_live_player: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    show_vod_player: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    show_clip_player: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    auto_clip_preview: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    show_side_player: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    disable_feed_player_multi: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    start_user_screen: {
        values: ['no', 'yes'],
        defaultValue: 1
    },
    vod_dialog: {
        values: ['last', 'ask', 'start'],
        defaultValue: 1
    },
    auto_refresh_screen: {
        //Migrated to dialog
        values: Settings_GetnotificationTime('m', 'h', 'hs'),
        defaultValue: 6
    },
    auto_minimize_inactive: {
        //Migrated to dialog
        values: Settings_GetnotificationTime('m', 'h', 'hs'),
        defaultValue: 1
    },
    auto_refresh_background: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    show_feed_player_delay: {
        //Migrated to dialog
        values: Settings_GetPreviewDelay('ms', 'sec'),
        defaultValue: 1
    },
    key_up_timeout: {
        //Migrated to dialog
        values: [
            100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800,
            1900, 2000
        ],
        defaultValue: 6
    },
    live_feed_sort: {
        //Migrated to dialog
        values: ['views_more', 'views_less', 'name_a-z', 'name_z-a', 'game_a-z', 'game_z-a', 'uptime_new', 'uptime_old'],
        defaultValue: 1
    },
    burn_in_protection: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    open_host: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    play_stay: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    live_notification: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    title_notification: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    game_notification: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    live_notification_background: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    live_notification_position: {
        //Migrated to dialog
        values: [0, 1, 2, 3, 4, 5],
        defaultValue: 2
    },
    repeat_notification: {
        //Migrated to dialog
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        defaultValue: 1
    },
    since_notification: {
        //Migrated to dialog
        values: Settings_GetnotificationTime('m', 'h', 'hs'),
        defaultValue: 7
    },
    global_font_offset: {
        //Migrated to dialog
        values: [-3, -2, -1, 0, 1, 2, 3],
        defaultValue: 4
    },
    buffer_live: {
        //Migrated to dialog
        values: buffer_values,
        defaultValue: 2
    },
    buffer_vod: {
        //Migrated to dialog
        values: buffer_values,
        defaultValue: 2
    },
    buffer_clip: {
        //Migrated to dialog
        values: buffer_values,
        defaultValue: 2
    },
    end_dialog_counter: {
        //Migrated to dialog
        values: ['disable', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        defaultValue: 7
    },
    res_max: {
        //Migrated to dialog
        values: res_values,
        defaultValue: 1
    },
    res_min: {
        //Migrated to dialog
        values: res_values,
        defaultValue: 6 // 720p
    },
    bitrate_main: {
        //Migrated to dialog
        values: Settings_GetBitrates(bitrate_values),
        defaultValue: 1
    },
    bitrate_min: {
        //Migrated to dialog
        values: Settings_GetBitrates(bitrate_values),
        defaultValue: 18 //3 Mbps
    },
    videos_animation: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    thumb_quality: {
        //Migrated to dialog
        values: ['very-low', 'low', 'normal', 'high', 'very-high'],
        defaultValue: 3
    },
    default_quality: {
        values: ['Auto', 'source', '2160p60', '1440p60', '1080p60', '1080p30', '720p60', '720p30', '480p30', '360p30', '160p30'],
        defaultValue: 1
    },
    check_source: {
        values: ['no', 'yes'],
        defaultValue: 2
    },
    enable_mature: {
        values: ['no', 'yes'],
        defaultValue: 2
    },
    enable_embed: {
        values: ['no', 'yes'],
        defaultValue: 2
    },
    clock_offset: {
        //Migrated to dialog
        values: Settings_GenerateClock(),
        defaultValue: 49
    },
    clock_style: {
        //Migrated to dialog
        values: ['24h', '12H AM PM', '12h'],
        defaultValue: 1
    },
    thumb_background: {
        //Migrated to dialog
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    ui_opt: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    custom_opt: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    livenotification_opt: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    blocked_codecs: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    player_buffers: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    playerend_opt: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    preview_settings: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    update_settings: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    proxy_settings: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    player_extracodecs: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    player_bitrate: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    dpad_opt: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    chat_opt: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    backup_sync: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    warnings_opt: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    vod_seek: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    block_qualities: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    },
    vod_seek_min: {
        //Migrated to dialog
        values: JSON.parse(JSON.stringify(Settings_jumpTimers)),
        defaultValue: 1
    },
    vod_seek_max: {
        //Migrated to dialog
        values: JSON.parse(JSON.stringify(Settings_jumpTimers)),
        defaultValue: 11
    },
    vod_seek_time: {
        //Migrated to dialog
        values: JSON.parse(JSON.stringify(Settings_Seek_Time)),
        defaultValue: 3
    },
    dpad_position: {
        //Migrated to dialog
        values: ['Right-Bottom', 'Right-Top', 'Left-Top', 'Left-Bottom'],
        defaultValue: 1
    },
    dpad_opacity: {
        //Migrated to dialog
        values: [
            '0%',
            '5%',
            '10%',
            '15%',
            '20%',
            '25%',
            '30%',
            '35%',
            '40%',
            '45%',
            '50%',
            '55%',
            '60%',
            '65%',
            '70%',
            '75%',
            '80%',
            '85%',
            '90%',
            '95%',
            '100%'
        ],
        defaultValue: 12
    },
    highlight_rewards: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    highlight_first: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    highlight_streamer: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    highlight_mod: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    highlight_atstreamer: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    highlight_atuser: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    highlight_user_send: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    show_sub: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    highlight_bits: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    chat_bot: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    show_actions: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    clear_chat: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    show_chatters: {
        //Migrated to dialog
        values: ['no', 'chatters', 'viewers'],
        defaultValue: 2
    },
    chat_line_animation: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    individual_lines: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    chat_individual_background: {
        //Migrated to dialog
        values: ['disabled', 'enabled', 'bright', 'dark'],
        defaultValue: 1
    },
    disabled_shared: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    chat_logging: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    chat_nickcolor: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    chat_timestamp: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    block_qualities_43: {
        //Migrated to dialog
        values: ['enabled', 'disabled'],
        defaultValue: 1
    },
    block_qualities_21: {
        //Migrated to dialog
        values: ['enabled', 'disabled'],
        defaultValue: 1
    },
    block_qualities_16: {
        //Migrated to dialog
        values: ['enabled', 'disabled'],
        defaultValue: 1
    },
    block_qualities_14: {
        //Migrated to dialog
        values: ['enabled', 'disabled'],
        defaultValue: 1
    },
    block_qualities_10: {
        //Migrated to dialog
        values: ['enabled', 'disabled'],
        defaultValue: 1
    },
    block_qualities_9: {
        //Migrated to dialog
        values: ['enabled', 'disabled'],
        defaultValue: 1
    },
    block_qualities_7: {
        //Migrated to dialog
        values: ['enabled', 'disabled'],
        defaultValue: 1
    },
    block_qualities_4: {
        //Migrated to dialog
        values: ['enabled', 'disabled'],
        defaultValue: 1
    },
    block_qualities_3: {
        //Migrated to dialog
        values: ['enabled', 'disabled'],
        defaultValue: 1
    },
    hide_main_clock: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    hide_player_clock: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    hide_main_screen_title: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    hide_etc_help_text: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    hide_screen_counter: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 1
    },
    round_images: {
        //Migrated to dialog
        values: ['no', 'yes'],
        defaultValue: 2
    },
    update_background: {
        values: ['yes', 'no'],
        set_values: [''],
        defaultValue: 1
    },
    update_show: {
        values: ['yes', 'toast', 'no'],
        set_values: [''],
        defaultValue: 1
    },
    chat_show_badges: {
        values: ['no', 'yes'],
        defaultValue: 2
    },
    chat_show_badges_mod: {
        values: ['no', 'yes'],
        defaultValue: 2
    },
    chat_show_badges_vip: {
        values: ['no', 'yes'],
        defaultValue: 2
    },
    chat_show_badges_shared: {
        values: ['no', 'yes'],
        defaultValue: 2
    },
    backup_enabled: {
        values: ['no', 'yes'],
        defaultValue: 2
    },
    sync_enabled: {
        values: ['no', 'yes'],
        defaultValue: 2
    },
    sync_users: {
        values: ['no', 'yes'],
        defaultValue: 2
    },
    sync_history: {
        values: ['no', 'yes'],
        defaultValue: 2
    },
    sync_settings: {
        values: ['no', 'yes'],
        defaultValue: 2
    },
    backup_account: {
        values: ['None'],
        set_values: [''],
        defaultValue: 1
    }
};

function Settings_GenerateClock() {
    var clock = [],
        time = 43200,
        i = 0;

    for (i; i < 48; i++) {
        clock.push('-' + Play_timeS(time));
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

    for (i = 0; i < 101; i += Settings_VolumeScale) {
        array.push(i + '%');
    }

    return array;
}

var Settings_GetnotificationTimeMs = [
    0, 600000, 1200000, 1800000, 2700000, 3600000, 7200000, 10800000, 14400000, 18000000, 21600000, 25200000, 28800000, 32400000, 36000000, 39600000,
    43200000, 46800000, 50400000, 54000000, 57600000, 61200000, 64800000, 68400000, 72000000, 75600000, 79200000, 82800000, 86400000
];

function Settings_GetnotificationTime(min, hour, hours) {
    var array = [0, '10 ' + min, '20 ' + min, '30 ' + min, '45 ' + min, '1 ' + hour],
        i = 0;

    for (i = 2; i < 25; i++) {
        array.push(i + hours);
    }

    return array;
}

function Settings_GetPreviewDelay(ms, sec) {
    var i = 0,
        len = Settings_PreviewDelay.length,
        array = [],
        time;

    for (i; i < len; i++) {
        if (Settings_PreviewDelay[i] < 1000) time = Settings_PreviewDelay[i] + ms;
        else time = Settings_PreviewDelay[i] / 1000 + sec;

        array.push(time);
    }

    return array;
}

function Settings_GetBitrates(values) {
    var i = 0,
        len = values.length,
        array = [];

    for (i; i < len; i++) {
        array.push(values[i] + ' Mbps');
    }

    return array;
}

var Settings_value_keys = [];
var Settings_positions_length = 0;
//Variable initialization end

function Settings_init() {
    Main_addEventListener('keydown', Settings_handleKeyDown);
    ScreensObj_SetTopLable(STR_SETTINGS);
    Main_ShowElement('settings_holder');
    Main_IconLoad('label_thumb', 'icon-return', STR_GOBACK);
    Main_HideElement('label_refresh');
    Settings_cursorY = 0;
    Settings_inputFocus(Settings_cursorY);
    Main_EventScreen('Settings');
}

function Settings_exit() {
    Settings_ScrollTableReset();
    Main_removeEventListener('keydown', Settings_handleKeyDown);
    Main_IconLoad('label_thumb', 'icon-options', STR_THUMB_OPTIONS_TOP);
    Main_ShowElement('label_refresh');
    Settings_RemoveInputFocus();
    Main_HideElement('settings_holder');
}

function Settings_isVisible() {
    return Main_isElementShowing('settings_holder');
}

// The order in Settings_SetSettings is the display order
function Settings_SetSettings() {
    var div = '',
        key,
        array_no_yes = [STR_NO, STR_YES],
        dis_ena = [STR_DISABLED, STR_ENABLED];

    Settings_value_keys = [];

    //Individual settings
    Settings_value.content_lang.values[0] = STR_LANG_ALL;
    key = 'content_lang';
    div += Settings_Content(key, Settings_value[key].values, STR_CONTENT_LANG, STR_CONTENT_LANG_SUMMARY);

    key = 'loadAll_lang';
    div += Settings_Content(key, array_no_yes, STR_LOAD_ALL_LANG, STR_LOAD_ALL_LANG_SUMMARY);

    key = 'app_lang';
    div += Settings_Content(key, Settings_value[key].values, STR_APP_LANG, STR_APP_LANG_SUMMARY);

    //Dialog settings
    div += Settings_Content('backup_sync', [STR_ENTER_TO_OPEN], STR_BACKUP_SYNC, null);
    div += Settings_Content('chat_opt', [STR_ENTER_TO_OPEN], STR_CHAT_OPTIONS, null);
    div += Settings_Content('ui_opt', [STR_ENTER_TO_OPEN], STR_UI_SETTINGS, null);
    div += Settings_Content('custom_opt', [STR_ENTER_TO_OPEN], STR_GENERAL_CUSTOM, null);
    div += Settings_Content('livenotification_opt', [STR_ENTER_TO_OPEN], STR_NOTIFICATION_OPT, null);
    div += Settings_Content('update_settings', [STR_ENTER_TO_OPEN], STR_UPDATE_OPT, null);
    div += Settings_Content('warnings_opt', [STR_ENTER_TO_OPEN], STR_WARNINGS, null);

    if (!Main_isTV || !Main_IsOn_OSInterface) {
        div += Settings_Content('dpad_opt', [STR_ENTER_TO_OPEN], STR_DPAD_OPT, null);
    }

    div += Settings_Content('enable_mature', dis_ena, STR_ENABLE_MATURE, STR_ENABLE_MATURE_SUMMARY);

    if (!Main_IsOn_OSInterface) {
        div += Settings_Content('enable_embed', array_no_yes, STR_DISABLE_EMBED, STR_DISABLE_EMBED_SUMMARY);
    }

    //Individual settings
    div += Settings_Content('start_user_screen', array_no_yes, STR_START_AT_USER, STR_START_AT_USER_SUMMARY);

    // Player settings title
    div += Settings_DivTitle('play', STR_SETTINGS_PLAYER);

    div += Settings_Content('restor_playback', array_no_yes, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMMARY);

    div += Settings_Content('single_clickExit', array_no_yes, STR_SINGLE_EXIT, STR_SINGLE_EXIT_SUMMARY);

    div += Settings_Content('PP_workaround', dis_ena, STR_PP_WORKAROUND, STR_PP_WORKAROUND_SUMMARY);

    div += Settings_Content('vod_dialog', [STR_VOD_DIALOG_LAST, STR_VOD_DIALOG_SHOW, STR_VOD_DIALOG_START], STR_VOD_DIALOG, STR_VOD_DIALOG_SUMMARY);

    div += Settings_Content('check_source', array_no_yes, STR_SOURCE_CHECK, STR_SOURCE_CHECK_SUMMARY);

    div += Settings_Content('seek_preview', SEEK_PREVIEW_ARRAY, SEEK_PREVIEW, SEEK_PREVIEW_SUMMARY);

    key = 'default_quality';
    Settings_value[key].values[0] = STR_AUTO;
    Settings_value[key].values[1] = STR_SOURCE;
    div += Settings_Content('default_quality', Settings_value[key].values, STR_DEF_QUALITY, STR_DEF_QUALITY_SUMMARY);

    key = 'speed_adjust';
    Settings_value[key].values[0] = STR_AUTO;
    Settings_value[key].values[1] = STR_SOURCE;
    div += Settings_Content('speed_adjust', dis_ena, STR_SPEED_ADJUST, STR_SPEED_ADJUST_SUMMARY);

    //Dialog settings
    //div += Settings_Content('proxy_settings', [STR_ENTER_TO_OPEN], PROXY_SETTINGS, null);
    div += Settings_Content('player_extracodecs', [STR_ENTER_TO_OPEN], STR_PLAYER_EXTRA_CODEC, STR_PLAYER_EXTRA_CODEC_SUMMARY);
    div += Settings_Content('blocked_codecs', [STR_ENTER_TO_OPEN], STR_BLOCKED_CODEC, STR_BLOCKED_CODEC_SUMMARY);

    div += Settings_Content('block_qualities', [STR_ENTER_TO_OPEN], STR_BLOCK_RES, STR_BLOCK_RES_SHORT_SUMMARY);
    div += Settings_Content('player_bitrate', [STR_ENTER_TO_OPEN], STR_PLAYER_BITRATE, STR_PLAYER_BITRATE_SHORT_SUMMARY);

    div += Settings_Content('preview_settings', [STR_ENTER_TO_OPEN], STR_SIDE_PANEL_PLAYER, null);
    div += Settings_Content('vod_seek', [STR_ENTER_TO_OPEN], STR_VOD_SEEK, null);
    div += Settings_Content('playerend_opt', [STR_ENTER_TO_OPEN], STR_END_DIALOG_OPT, null);
    div += Settings_Content('player_buffers', [STR_ENTER_TO_OPEN], STR_SETTINGS_BUFFER_SIZE, STR_SETTINGS_BUFFER_SIZE_SHORT_SUMMARY);

    Main_innerHTML('settings_main', div);
    Settings_positions_length = Settings_value_keys.length;

    //Update array that are base on strings
    var i = 0,
        len = Settings_Seek_Time.length,
        time;

    for (i; i < len; i++) {
        if (Settings_Seek_Time[i] >= 1000) {
            time = Settings_Seek_Time[i] / 1000;

            Settings_value.vod_seek_time.values[i] = time + (time > 1 ? STR_SECONDS : STR_SECOND);
        } else {
            Settings_value.vod_seek_time.values[i] = Settings_Seek_Time[i] + STR_MILLISECONDS;
        }
    }

    i = 0;
    len = Settings_jumpTimers.length;
    for (i; i < len; i++) {
        if (Settings_jumpTimers[i] >= 3600) {
            time = Settings_jumpTimers[i] / 3600;

            Settings_value.vod_seek_min.values[i] = time + STR_HOUR;
        } else if (Settings_jumpTimers[i] >= 60) {
            time = Settings_jumpTimers[i] / 60;

            Settings_value.vod_seek_min.values[i] = time + (time > 1 ? STR_MINUTES : STR_MINUTE);
        } else {
            time = Settings_jumpTimers[i];

            Settings_value.vod_seek_min.values[i] = time + (time > 1 ? STR_SECONDS : STR_SECOND);
        }
    }

    Settings_value.vod_seek_max.values = Settings_value.vod_seek_min.values;

    Settings_value.show_feed_player_delay.values = Settings_GetPreviewDelay(STR_MS, STR_SEC);
    Settings_value.auto_refresh_screen.values = Settings_GetnotificationTime(STR_MINUTES, STR_HOUR, STR_HOURS);
    Settings_value.since_notification.values = Settings_value.auto_refresh_screen.values;
    Settings_value.auto_minimize_inactive.values = Settings_value.auto_refresh_screen.values;
    Settings_value.auto_refresh_background.values = Settings_value.auto_refresh_screen.values;

    Settings_value.dpad_position.values = [
        STR_RIGHT + '-' + STR_BOTTOM,
        STR_RIGHT + '-' + STR_TOP,
        STR_LEFT + '-' + STR_BOTTOM,
        STR_LEFT + '-' + STR_TOP
    ];
}

function Settings_Content(key, valuesArray, STR, STR_SUMMARY) {
    Settings_value_keys.push(key);
    if (valuesArray) Settings_value[key].values = valuesArray;

    return STR_SUMMARY ? Settings_DivOptionWithSummary(key, STR, STR_SUMMARY) : Settings_DivOptionNoSummary(key, STR);
}

function Settings_DivTitle(key, string) {
    return '<div id="setting_title_' + key + '" class="settings_section">' + string + '</div>';
}

function Settings_DivOptionNoSummary(key, string) {
    return (
        '<div id="' +
        key +
        '_div" class="settings_div"><div id="' +
        key +
        '_name" class="settings_name">' +
        string +
        '</div>' +
        '<div class="settings_arraw_div"><div id="' +
        key +
        '_arrow_left" class="left"></div></div>' +
        '<div id="' +
        key +
        '" class="strokedeline settings_value">' +
        Settings_Obj_values(key) +
        '</div>' +
        '<div class="settings_arraw_div"><div id="' +
        key +
        '_arrow_right" class="right"></div></div></div>'
    );
}

function Settings_DivOptionWithSummary(key, string_title, string_summary, fontSize) {
    return (
        '<div id="' +
        key +
        '_div" class="settings_div"><div id="' +
        key +
        '_name" class="settings_name">' +
        string_title +
        '<div id="' +
        key +
        '_summary" class="settings_summary" style="font-size: ' +
        (fontSize ? fontSize : 64) +
        '%;">' +
        string_summary +
        '</div></div>' +
        '<div class="settings_arraw_div"><div id="' +
        key +
        '_arrow_left" class="left"></div></div>' +
        '<div id="' +
        key +
        '" class="strokedeline settings_value">' +
        Settings_Obj_values(key) +
        '</div>' +
        '<div class="settings_arraw_div"><div id="' +
        key +
        '_arrow_right" class="right"></div></div></div>'
    );
}

function Settings_SetDefaults() {
    //Settings animation will call user live that will call play warning middle and the div need to be initiated first
    Play_BottomIconsSet();

    for (var key in Settings_value) {
        Settings_value[key].defaultValue = Main_getItemInt(key, Settings_value[key].defaultValue);
        Settings_value[key].defaultValue -= 1;
        if (Settings_value[key].defaultValue > Settings_Obj_length(key)) Settings_value[key].defaultValue = 0;
    }

    Settings_SetBuffers(0);
    Settings_ExtraCodecs(false);
    Settings_SetClock();
    Settings_HideMainClock();
    Settings_HidePlayerClock();
    Settings_HideScreenTitle();
    Settings_SetAutoMinimizeTimeout();
    Settings_HideEtcHelp();
    Main_SetThumb();
    if (!Settings_Obj_default('app_animations')) Settings_SetAnimations();
    Settings_notification_background();
    Settings_notification_position();
    Settings_notification_repeat();
    Settings_notification_sicetime();
    Play_EndSettingsCounter = Settings_Obj_default('end_dialog_counter');
    Settings_ShowCounter();
    Settings_UpdateRoundImages();
    Settings_DisableCodecs = Main_getItemJson('Settings_DisableCodecs', []);
    Settings_CodecsSet();

    Settings_QualitiesCheck();

    Screens_KeyUptimeout = Settings_Obj_values('key_up_timeout');
    OSInterface_SetPreviewOthersAudio(Settings_Obj_default('preview_others_volume_new'));
    Play_AudioReset(0, true);
    OSInterface_SetPreviewAudio(Settings_Obj_default('preview_volume_new'));
    OSInterface_SetPreviewSize(Settings_Obj_default('preview_sizes'));
    OSInterface_SetCheckSource(Settings_Obj_default('check_source') === 1);
    Settings_SetPingWarning();
    SettingsColor_SetAnimationStyleRestore();
    //Settings_proxy_set_start();
    Settings_set_proxy_timeout();
    Settings_set_all_notification();
    Settings_SetLang();
    Settings_SetSpeed_adjust();

    Settings_SetResBitRate(0);

    if (!Main_isTV) {
        //Do it again after a delay to make sure the view is ready to receive the update
        Main_setTimeout(Settings_SetDpad, 2500);
    }

    Settings_burn_in_protection_start();

    PlayVod_SetPreviewType();
}

var Languages_Selected;

function Settings_SetLang() {
    Main_ContentLang = Settings_value.content_lang.apply_values[Settings_Obj_default('content_lang')];

    if (Main_ContentLang === '') {
        Languages_Selected = STR_LANG_ALL;
        OSInterface_upDateLang(null);
    } else {
        Languages_Selected = Main_ContentLang.toUpperCase();
        OSInterface_upDateLang(Main_ContentLang);
    }
}

function Settings_RestoreAppLang() {
    var lang = Main_getItemString('app_lang_string', Settings_value.app_lang.apply_values[Settings_Obj_default('app_lang')]),
        i = 0,
        array = Settings_value.app_lang.apply_values,
        len = array.length;

    for (i; i < len; i++) {
        if (Main_A_equals_B(array[i], lang)) {
            var key = 'app_lang';
            Settings_value[key].defaultValue = i;
            Main_setItem(key, Settings_Obj_default(key) + 1);

            break;
        }
    }

    Settings_SetAppLang();
}

var Settings_AppLang = '';
function Settings_SetAppLang() {
    // Language is set as (LANGUAGE)_(REGION) in (ISO 639-1)_(ISO 3166-1 alpha-2) eg.; pt_BR Brazil, en_US USA
    // https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

    var app_lang = Settings_value.app_lang.apply_values[Settings_Obj_default('app_lang')];

    if (!Main_values.WasLangChanged) {
        app_lang = Settings_CheckPageLang(app_lang);
    }

    en_USLang();

    if (Main_A_includes_B(app_lang, 'pt_')) pt_BRLang();
    else if (Main_A_includes_B(app_lang, 'ru_')) ru_RULang();
    else if (Main_A_includes_B(app_lang, 'es_')) es_ESLang();

    OSInterface_SetLanguage(app_lang);

    Settings_AppLang = app_lang;

    Main_setItem('app_lang_string', app_lang);
}

function Settings_UpdateString() {
    Main_values.WasLangChanged = true;
    Settings_SetAppLang();
    DefaultLang();

    Main_SetStringsMain();
    Main_SetStringsSecondary();
    Play_MakeControls();
    Play_MultiSetPanelInfo();
    Settings_inputFocus(Settings_cursorY);
    ScreensObj_SetTopLable(STR_SETTINGS);
    Main_updateClock();
    Main_checkVersion(true);
    AddUser_UpdateSidePanelAfterShow();
    BrowserTestSetStrings();

    Main_SaveValues();
}

function Settings_CheckPageLang(app_lang) {
    var device_lang = app_lang;

    device_lang = window.navigator.userLanguage || window.navigator.language;

    if (device_lang) device_lang = device_lang.replace('-', '_');
    else return device_lang;

    if (Main_A_includes_B(Settings_value.app_lang.apply_values, device_lang)) {
        var index = 0,
            len = Settings_value.app_lang.apply_values.length;

        for (index; index < len; index++) {
            if (Settings_value.app_lang.apply_values[index] === device_lang) break;
        }

        Settings_value.app_lang.defaultValue = index;
        Main_setItem('app_lang', Settings_Obj_default('app_lang') + 1);

        device_lang = device_lang;
    }

    return device_lang;
}

var Settings_burn_in_protectionId;
function Settings_burn_in_protection_start() {
    if (!Settings_Obj_default('burn_in_protection')) {
        Main_clearInterval(Settings_burn_in_protectionId);
        return;
    }

    Settings_burn_in_protectionId = Main_setInterval(Settings_burn_in_protection, 20 * 60 * 1000, Settings_burn_in_protectionId);
}

function Settings_burn_in_protection() {
    if (Play_ScreeIsOff) {
        return;
    }
    Settings_ScreenOff();

    Main_setTimeout(function () {
        Settings_ScreenOn();
    }, 50); //show for a few frames to refresh the OLED screen
}

function Settings_ScreenOff() {
    Main_ShowElement('burn_in_protection');
}

function Settings_ScreenOn() {
    Main_HideElement('burn_in_protection');
}

function Settings_SetDpad() {
    Settings_DpadOpacity();
    //prevent call OSInterface simultaneously, as the last may not work
    Main_setTimeout(function () {
        Settings_DpadPOsition();
    }, 100);
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

function Settings_RemoveInputFocus() {
    Settings_RemoveInputFocusKey(Settings_value_keys[Settings_cursorY]);
}

function Settings_RemoveInputFocusKey(key) {
    Main_getElementById(key + '_arrow_left').style.opacity = '0';
    Main_getElementById(key + '_arrow_right').style.opacity = '0';
    Main_RemoveClass(key, 'settings_value_focus');
    Main_RemoveClass(key + '_div', 'settings_div_focus');
}

function Settings_ChangeSettings(position, skipDefault) {
    var key = Settings_value_keys[position];
    Main_setItem(key, Settings_Obj_default(key) + 1);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_Setarrows(position);
    if (!skipDefault) {
        Settings_SetDefault(key);
    }
}

function Settings_Setarrows(position) {
    Settings_SetarrowsKey(Settings_value_keys[position]);
}

function Settings_SetarrowsKey(key) {
    if (!Settings_Obj_length(key)) return;

    var currentValue = Settings_Obj_default(key);
    var maxValue = Settings_Obj_length(key);

    if (currentValue > 0 && currentValue < maxValue) {
        Main_getElementById(key + '_arrow_left').style.opacity = '1';
        Main_getElementById(key + '_arrow_right').style.opacity = '1';
    } else if (currentValue === maxValue) {
        Main_getElementById(key + '_arrow_left').style.opacity = '1';
        Main_getElementById(key + '_arrow_right').style.opacity = '0.2';
    } else {
        Main_getElementById(key + '_arrow_left').style.opacity = '0.2';
        Main_getElementById(key + '_arrow_right').style.opacity = '1';
    }
}

function Settings_SetDefault(position) {
    if (position === 'content_lang') Settings_SetLang();
    else if (position === 'app_lang') Settings_UpdateString();
    else if (position === 'live_notification') Settings_notification();
    else if (position === 'title_notification') Settings_notification_title();
    else if (position === 'game_notification') Settings_notification_game();
    else if (position === 'live_notification_background') Settings_notification_background();
    else if (position === 'live_notification_position') Settings_notification_position();
    else if (position === 'repeat_notification') Settings_notification_repeat();
    else if (position === 'since_notification') Settings_notification_sicetime();
    else if (position === 'ping_warn') Settings_SetPingWarning();
    else if (position === 'app_animations') Settings_SetAnimations();
    else if (position === 'buffer_live') Settings_SetBuffers(1);
    else if (position === 'key_up_timeout') Screens_KeyUptimeout = Settings_Obj_values('key_up_timeout');
    else if (position === 'buffer_vod') Settings_SetBuffers(2);
    else if (position === 'buffer_clip') Settings_SetBuffers(3);
    else if (position === 'av1_codec' || position === 'hevc_codec') Settings_ExtraCodecs(true);
    else if (position === 'end_dialog_counter') Play_EndSettingsCounter = Settings_Obj_default('end_dialog_counter');
    else if (position === 'default_quality') Play_SetQuality();
    else if (position === 'speed_adjust') Settings_SetSpeed_adjust();
    else if (position === 'seek_preview') PlayVod_SetPreviewType();
    else if (position === 'check_source') OSInterface_SetCheckSource(Settings_Obj_default('check_source') === 1);
    else if (position === 'thumb_quality') Main_SetThumb();
    else if (position === 'preview_others_volume_new') OSInterface_SetPreviewOthersAudio(Settings_Obj_default('preview_others_volume_new'));
    else if (position === 'preview_volume_new') OSInterface_SetPreviewAudio(Settings_Obj_default('preview_volume_new'));
    else if (position === 'screen_preview_volume') Play_AudioReset(0, true);
    else if (position === 'preview_sizes') OSInterface_SetPreviewSize(Settings_Obj_default('preview_sizes'));
    else if (position === 'enable_embed') enable_embed = Settings_value.enable_embed.defaultValue;
    else if (position === 'enable_mature') Settings_checkMature();
    else if (position === 'global_font_offset') {
        calculateFontSize();
        AddUser_UpdateSidePanelAfterShow();
        UserLiveFeed_ResetAddCellsize();
        Sidepannel_Scroll(true);
    } else if (position === 'hide_screen_counter') Settings_ShowCounter();
    else if (position === 'round_images') Settings_UpdateRoundImages();
    else if (position === 'hide_main_clock') Settings_HideMainClock();
    else if (position === 'hide_player_clock') Settings_HidePlayerClock();
    else if (position === 'burn_in_protection') Settings_burn_in_protection_start();
    else if (position === 'hide_main_screen_title') Settings_HideScreenTitle();
    else if (position === 'hide_etc_help_text') Settings_HideEtcHelp();
    else if (position === 'clock_offset' || position === 'clock_style') {
        Settings_SetClock();
        Main_updateClock();
    } else if (position === 'bitrate_main') Settings_SetResBitRate(1);
    else if (position === 'bitrate_min') Settings_SetResBitRate(2);
    else if (position === 'res_max') Settings_SetResBitRate(1);
    else if (position === 'res_min') Settings_SetResBitRate(2);
    else if (position === 'dpad_opacity') Settings_DpadOpacity();
    else if (position === 'dpad_position') Settings_DpadPOsition();
    else if (position === 'PP_workaround') Settings_PP_Workaround();
    else if (position === 'proxy_timeout') Settings_set_proxy_timeout();
    else if (position === 'ttv_lolProxy') Settings_set_all_proxy('ttv_lolProxy');
    else if (position === 'k_twitch') Settings_set_all_proxy('k_twitch');
    else if (position === 'T1080') Settings_set_all_proxy('T1080');
    else if (position === 'vod_seek_min') Settings_check_min_seek();
    else if (position === 'vod_seek_max') Settings_check_max_seek();
    else if (position === 'auto_minimize_inactive') Settings_SetAutoMinimizeTimeout();
    else if (position === 'sync_enabled') Settings_DialogBackupSyncRefresh();
    else if (
        position === 'block_qualities_43' ||
        position === 'block_qualities_21' ||
        position === 'block_qualities_16' ||
        position === 'block_qualities_14' ||
        position === 'block_qualities_10' ||
        position === 'block_qualities_9' ||
        position === 'block_qualities_7' ||
        position === 'block_qualities_4' ||
        position === 'block_qualities_3'
    ) {
        Settings_QualitiesCheck();
    }
}

var Settings_cursorYBackup;
var Settings_enable_matureBackup;
var Settings_isMature;
function Settings_checkMature() {
    var enabled = Settings_value.enable_mature.defaultValue;
    Settings_enable_matureBackup = enabled;

    if (enabled) {
        if (Main_values.Password_data) {
            Main_OpenPassword();
        }
    } else if (!Main_values.Password_data) {
        Users_RemoveCursor = 0;
        Settings_isMature = true;
        Users_RemoveCursorSet();
        Main_innerHTML('main_dialog_remove', STR_MATURE_PROTECT);
        Main_textContent('yes_no_dialog_button_no', STR_NO);
        Main_textContent('yes_no_dialog_button_yes', STR_YES);
        Main_ShowElement('yes_no_dialog');
        Main_removeEventListener('keydown', Settings_handleKeyDown);
        Main_addEventListener('keydown', Settings_checkMatureKeyDown);
    }
}

function Settings_setMature(enabled) {
    var enabledInt = enabled ? 1 : 0;
    Settings_value.enable_mature.defaultValue = enabledInt;
    Settings_ChangeSettings(Settings_cursorYBackup, true);
}

function Settings_checkMatureKeyDown(event) {
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
            Settings_checkMatureKeyEnter();
            break;
        default:
            break;
    }
}

function Settings_checkMatureKeyEnter() {
    Main_removeEventListener('keydown', Settings_checkMatureKeyDown);
    Main_HideElement('yes_no_dialog');

    if (Users_RemoveCursor) {
        Main_OpenPassword();
    } else {
        Main_addEventListener('keydown', Settings_handleKeyDown);
    }
}

var proxyArray = ['k_twitch', 'ttv_lolProxy', 'T1080'];
var proxyArrayFull = ['k_twitch', 'ttv_lolProxy', 'T1080', 'disabled'];
var proxyType = 'disabled';

function Settings_set_all_proxy(current) {
    var currentEnable = Settings_Obj_default(current) === 1;

    use_proxy = currentEnable;

    if (currentEnable) {
        Settings_proxy_set_current(current);

        var i = 0,
            len = proxyArray.length;
        for (i; i < len; i++) {
            if (proxyArray[i] !== current && Settings_Obj_default(proxyArray[i]) === 1) {
                Settings_DialogRightLeftAfter(proxyArray[i], -1, true);
            }
        }
    }
    Settings_proxy_set_Type();
}

// function Settings_proxy_set_start() {
//     var i = 0,
//         len = proxyArray.length;
//     for (i; i < len; i++) {
//         if (Settings_Obj_default(proxyArray[i]) === 1) {
//             use_proxy = true;
//             Settings_proxy_set_current(proxyArray[i]);
//             break;
//         }
//     }
//     Settings_proxy_set_Type();
// }

function Settings_proxy_set_Type() {
    proxyType = proxyArrayFull[Settings_get_enabled_Proxy()];
}

function Settings_proxy_set_current(current) {
    if (current === 'T1080') {
        proxy_url = T1080_proxy;
        proxy_headers = null;
        proxy_has_parameter = true;
        proxy_has_token = true;
    } else if (current === 'k_twitch') {
        proxy_url = ktwitch_proxy;
        proxy_headers = null;
        proxy_has_parameter = true;
        proxy_has_token = true;
    } else {
        proxy_url = Play_live_ttv_lol_links;
        proxy_headers = ttv_lol_headers;
        proxy_has_parameter = true;
        proxy_has_token = false;
    }
}

function Settings_set_proxy_timeout() {
    proxy_timeout = Settings_Obj_values('proxy_timeout') * 1000;
}

function Settings_get_enabled_Proxy() {
    if (Settings_Obj_default('k_twitch') === 1) {
        return 0;
    }
    if (Settings_Obj_default('ttv_lolProxy') === 1) {
        return 1;
    }
    if (Settings_Obj_default('T1080') === 1) {
        return 2;
    }

    return 3;
}

function Settings_check_min_seek() {
    if (Settings_value.vod_seek_min.defaultValue >= Settings_value.vod_seek_max.defaultValue) {
        Settings_value.vod_seek_min.defaultValue = Settings_value.vod_seek_max.defaultValue;

        var key = 'vod_seek_min';
        Main_setItem(key, Settings_Obj_default(key) + 1);
        Main_textContent(key, Settings_Obj_values(key));
        Main_getElementById(key + '_arrow_right').style.opacity = '0.2';
    }
}

function Settings_check_max_seek() {
    if (Settings_value.vod_seek_max.defaultValue <= Settings_value.vod_seek_min.defaultValue) {
        Settings_value.vod_seek_max.defaultValue = Settings_value.vod_seek_min.defaultValue;

        var key = 'vod_seek_max';
        Main_setItem(key, Settings_Obj_default(key) + 1);
        Main_textContent(key, Settings_Obj_values(key));
        Main_getElementById(key + '_arrow_left').style.opacity = '0.2';
    }
}

function Settings_notification_check_any_enable() {
    if (!Settings_Obj_default('live_notification') && !Settings_Obj_default('title_notification') && !Settings_Obj_default('game_notification')) {
        OSInterface_StopNotificationService();
        return false;
    }

    return true;
}

function Settings_set_all_notification() {
    OSInterface_SetNotificationLive(Settings_Obj_default('live_notification') === 1);
    OSInterface_SetNotificationTitle(Settings_Obj_default('title_notification') === 1);
    OSInterface_SetNotificationTitle(Settings_Obj_default('title_notification') === 1);
    OSInterface_SetNotificationGame(Settings_Obj_default('game_notification') === 1);
}

function Settings_notification() {
    OSInterface_SetNotificationLive(Settings_Obj_default('live_notification') === 1);
    Settings_notification_background();
}

function Settings_notification_title() {
    OSInterface_SetNotificationTitle(Settings_Obj_default('title_notification') === 1);
    Settings_notification_background();
}

function Settings_notification_game() {
    OSInterface_SetNotificationGame(Settings_Obj_default('game_notification') === 1);
    Settings_notification_background();
}

function Settings_notification_background() {
    var enabled = Settings_Obj_default('live_notification_background') === 1 && Settings_notification_check_any_enable();

    OSInterface_upNotificationState(enabled);

    if (enabled && !OSInterface_hasNotificationPermission()) {
        OSInterface_showToast(STR_NOTIFICATION_BACKGROUND_WARNING);
    }
}

function Settings_notification_position() {
    OSInterface_SetNotificationPosition(Settings_Obj_default('live_notification_position'));
}

function Settings_notification_repeat() {
    OSInterface_SetNotificationRepeat(Settings_Obj_values('repeat_notification'));
}

function Settings_notification_sicetime() {
    OSInterface_SetNotificationSinceTime(Settings_GetnotificationTimeMs[Settings_Obj_default('since_notification')]);
}

function Settings_SetPingWarning() {
    OSInterface_Settings_SetPingWarning(Settings_value.ping_warn.defaultValue === 1);
}

function Settings_PP_Workaround() {
    OSInterface_msetPlayer(!Settings_Obj_default('PP_workaround'), Play_isFullScreen);
}

function Settings_DpadOpacity() {
    OSInterface_SetKeysOpacity(Settings_Obj_default('dpad_opacity'));
}

function Settings_DpadPOsition() {
    OSInterface_SetKeysPosition(Settings_Obj_default('dpad_position'));
}

function Settings_GetAutoRefreshTimeout() {
    return Settings_GetnotificationTimeMs[Settings_Obj_default('auto_refresh_screen')];
}

function Settings_GetAutoMinimizeTimeout() {
    return Settings_GetnotificationTimeMs[Settings_Obj_default('auto_minimize_inactive')];
}

function Settings_SetAutoMinimizeTimeout() {
    var timeout = Settings_GetAutoMinimizeTimeout();

    if (timeout) {
        Settings_SetWarningAutoMinimize();
        Main_addEventListener('keyup', Settings_SetWarningAutoMinimize);
    } else {
        Settings_DisableAutoMinimizeTimeout();
    }
}

var Settings_AutoMinimizeTime = 15;
var Settings_AutoMinimizeId;
var Settings_AutoMinimizeWarningId;

function Settings_SetWarningAutoMinimize() {
    Settings_AutoMinimizeId = Main_setTimeout(Settings_StartWarningAutoMinimize, Settings_GetAutoMinimizeTimeout(), Settings_AutoMinimizeId);
}

function Settings_StartWarningAutoMinimize() {
    Settings_DisableAutoMinimizeTimeout();
    Main_removeEventListener('keyup', Settings_SetWarningAutoMinimize);

    window.addEventListener('keydown', Settings_MinimizePreventClickfun, true);
    window.addEventListener('keyup', Settings_MinimizePreventClickfun, true);
    window.addEventListener('keypress', Settings_MinimizePreventClickfun, true);

    Settings_AutoMinimizeTime = 15;

    Settings_CheckAutoMinimizeEnd();
    Main_ShowElement('minimize_warning');
}

function Settings_CheckAutoMinimizeEnd() {
    if (Settings_AutoMinimizeTime > 0) {
        Settings_AutoMinimizeWarningId = Main_setTimeout(Settings_CheckAutoMinimizeEnd, 1000, Settings_AutoMinimizeWarningId);

        Main_innerHTML(
            'minimize_warning',
            STR_INACTIVE_WARNING.replace('%x', Settings_AutoMinimizeTime + (Settings_AutoMinimizeTime > 1 ? STR_SECONDS : STR_SECOND))
        );
    } else {
        Settings_DisableAutoMinimizeTimeout();

        if (Main_IsOn_OSInterface) OSInterface_mclose(false);
    }

    Settings_AutoMinimizeTime--;
}

function Settings_MinimizePreventClickfun(e) {
    e.stopPropagation();
    Settings_DisableAutoMinimizeTimeout();
    Settings_SetAutoMinimizeTimeout();
}

function Settings_DisableAutoMinimizeTimeout() {
    Main_clearTimeout(Settings_AutoMinimizeId);
    Main_clearTimeout(Settings_AutoMinimizeWarningId);
    Main_HideElement('minimize_warning');

    Main_removeEventListener('keyup', Settings_SetWarningAutoMinimize);

    window.removeEventListener('keydown', Settings_MinimizePreventClickfun, true);
    window.removeEventListener('keyup', Settings_MinimizePreventClickfun, true);
    window.removeEventListener('keypress', Settings_MinimizePreventClickfun, true);
}

function Settings_SetAnimations() {
    var i,
        array,
        len,
        classes = [
            'screen_holder',
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
            'side_panel',
            'side_panel_inner',
            'side_panel_feed_thumb',
            'user_feed',
            'inner_progress_bar',
            'inner_progress_bar_muted'
        ],
        animate = Settings_Obj_default('app_animations'),
        mtransition = animate ? '' : 'none';

    SettingsColor_SetAnimationStyle(Main_getItemInt('SettingsColor_ColorsObj' + SettingsColor_ColorsObjStyles, 0));

    classes.forEach(function (classe) {
        array = document.getElementsByClassName(classe);
        i = 0;
        len = array.length;
        for (i; i < len; i++) array[i].style.transition = mtransition;
    });

    if (UserLiveFeed_DataObj.length) UserLiveFeed_FeedRemoveFocus(UserLiveFeed_FeedPosX);

    array = document.getElementsByClassName(Main_classThumb);

    try {
        //Array.prototype maybe not supported by all browsers
        Array.prototype.forEach.call(array, function (el) {
            el.classList.remove(Main_classThumb);
        });
    } catch (e) {
        Main_Log('Settings_SetAnimations Array.prototype crash ' + e);
    }

    Main_classThumb = animate ? 'stream_thumbnail_focused' : 'stream_thumbnail_focused_no_ani';
    UserLiveFeed_FocusClass = animate ? 'feed_thumbnail_focused' : 'feed_thumbnail_focused_no_ani';
    Screens_SettingDoAnimations = animate;
}

function Settings_SetResBitRate(whocall) {
    if (Main_IsOn_OSInterface) {
        if (!whocall) {
            Settings_SetResBitRateMain();
            Settings_SetResBitRateMin();
        } else if (whocall === 1) Settings_SetResBitRateMain();
        else if (whocall === 2) Settings_SetResBitRateMin();
    }
}

function Settings_SetResBitRateMain() {
    var resolution = 0,
        bitrate = 0;

    if (Settings_Obj_default('bitrate_main') > 0) bitrate = parseInt(Settings_Obj_values('bitrate_main').split(' ')[0] * 1000000);

    if (Settings_Obj_default('res_max') > 0) resolution = parseInt(Settings_Obj_values('res_max').split('p')[0]);

    OSInterface_SetMainPlayerBitrate(bitrate, resolution);
}

function Settings_SetResBitRateMin() {
    var resolution = 0,
        bitrate = 0;

    if (Settings_Obj_default('bitrate_min') > 0) bitrate = parseInt(Settings_Obj_values('bitrate_min').split(' ')[0] * 1000000);

    if (Settings_Obj_default('res_min') > 0) resolution = parseInt(Settings_Obj_values('res_min').split('p')[0]);

    OSInterface_SetSmallPlayerBitrate(bitrate, resolution);
}

function Settings_SetSpeed_adjust() {
    OSInterface_setSpeedAdjustment(Settings_Obj_default('speed_adjust'));
}

function Settings_ExtraCodecs(showWarning) {
    var ExtraCodecsValuesArray = [],
        av1Enabled = Settings_Obj_default('av1_codec'),
        hevcEnabled = Settings_Obj_default('hevc_codec');

    if (av1Enabled) {
        ExtraCodecsValuesArray.push('av1');

        if (!Settings_AV1Supported && showWarning) {
            Main_showWarningDialog(STR_PLAYER_CODEC_NOT_SUPPORTED, 3000);
        }
    }

    if (hevcEnabled) {
        ExtraCodecsValuesArray.push('h265');

        if (!Settings_HEVCSupported && showWarning) {
            Main_showWarningDialog(STR_PLAYER_CODEC_NOT_SUPPORTED, 3000);
        }
    }

    ExtraCodecsValuesArray.push('h264');

    play_ExtraCodecsValues = ExtraCodecsValuesArray.join(',');
}

function Settings_SetBuffers(whocall) {
    if (!whocall) {
        Play_Buffer = Settings_Obj_values('buffer_live') * 1000;
        PlayVod_Buffer = Settings_Obj_values('buffer_vod') * 1000;
        PlayClip_Buffer = Settings_Obj_values('buffer_clip') * 1000;
        OSInterface_SetBuffer(1, Play_Buffer);
        OSInterface_SetBuffer(2, PlayVod_Buffer);
        OSInterface_SetBuffer(3, PlayClip_Buffer);
    } else if (whocall === 1) {
        Play_Buffer = Settings_Obj_values('buffer_live') * 1000;
        OSInterface_SetBuffer(1, Play_Buffer);
    } else if (whocall === 2) {
        PlayVod_Buffer = Settings_Obj_values('buffer_vod') * 1000;
        OSInterface_SetBuffer(2, PlayVod_Buffer);
    } else if (whocall === 3) {
        PlayClip_Buffer = Settings_Obj_values('buffer_clip') * 1000;
        OSInterface_SetBuffer(3, PlayClip_Buffer);
    }
}

function Settings_SetClock() {
    var time = Settings_Obj_default('clock_offset');
    Main_ClockOffset = time < 48 ? (48 - time) * -900000 : (time - 48) * 900000;
}

function Settings_HideMainClock() {
    Settings_HideElem('clock_holder', Settings_Obj_default('hide_main_clock') === 1);
}

function Settings_HidePlayerClock() {
    Settings_HideElem('stream_clock', Settings_Obj_default('hide_player_clock') === 1);
}

function Settings_HideScreenTitle() {
    Settings_HideElem('top_lable', Settings_Obj_default('hide_main_screen_title') === 1);
}

function Settings_HideEtcHelp() {
    var hide = Settings_Obj_default('hide_etc_help_text') === 1;
    var eleArray = ['top_lable_etc', 'label_thumb', 'icon_feed_refresh', 'feed_last_refresh', 'feed_end', 'icon_feed_back', 'side_panel_top_text'];
    var i = 0,
        len = eleArray.length;

    for (i; i < len; i++) {
        Settings_HideElem(eleArray[i], hide);
    }

    if (hide) Main_AddClass('side_panel_row_0', 'hide');
    else Main_RemoveClass('side_panel_row_0', 'hide');

    Sidepannel_Scroll_Offset = hide ? 1 : 0;
}

function Settings_ShowCounter() {
    var hide = Settings_Obj_default('hide_screen_counter') === 1;

    Settings_HideElem('dialog_counter_text', hide);
    Settings_HideElem('feed_counter', hide);
    Settings_HideElem('sidepannel_counter', hide);
}

function Settings_UpdateRoundImages() {
    Main_innerHTML(
        'round_images_css',
        Settings_Obj_default('round_images')
            ? 'img.side_panel_channel_img {border-radius: 50%;}' +
                  'img.stream_img_channels {border-radius: 50%;}' +
                  'img.stream_info_icon {border-radius: 50%;}' +
                  'img.thumb_info_icon {border-radius: 50%;}' +
                  'img.panel_pp_img {border-radius: 50%;}' +
                  'img.multi_info_img {border-radius: 50%;}' +
                  'img.multi_info_img_big {border-radius: 50%;}' +
                  //'img.stream_img_channel_logo {border-radius: 50%;}' +//Let this square so we an have a reference of what is square or not by default
                  'img.side_panel_new_img {border-radius: 50%;}'
            : ''
    );
}

function Settings_HideElem(elem, hide) {
    if (hide) Main_AddClass(elem, 'opacity_zero');
    else Main_RemoveClass(elem, 'opacity_zero');
}

var Settings_CurY = 0;

function Settings_ScrollDown() {
    Settings_Do_ScrollDown('settings_scroll');
}

function Settings_ScrollUp() {
    Settings_Do_ScrollUp('settings_scroll');
}

function Settings_Do_ScrollDown(docId) {
    var doc = Main_getElementById(docId);
    doc.scrollTop = doc.scrollHeight;
    if (Settings_Obj_default('app_animations')) {
        var position = doc.scrollTop;
        doc.scrollTop = 0;
        scrollTo(doc, position, 200);
    }
}

function Settings_Do_ScrollUp(docId) {
    var doc = Main_getElementById(docId);
    if (Settings_Obj_default('app_animations')) scrollTo(doc, 0, 200);
    else doc.scrollTop = 0;
}

function Settings_ScrollTable() {
    var scrolPos = 14,
        offset = 1; //!Main_isTV || !Main_IsOn_OSInterface ? 1 : 0;

    if (Settings_CurY < Settings_cursorY && Settings_cursorY === scrolPos + offset) {
        Settings_ScrollDown();
    } else if (Settings_CurY > Settings_cursorY && Settings_cursorY === scrolPos - 1 + offset) {
        Settings_ScrollUp();
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

    var animateScroll = function () {
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
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
};

function Settings_handleKeyLeft(key) {
    if (Settings_Obj_default(key) > 0) {
        Settings_value[key].defaultValue -= 1;
        Settings_ChangeSettings(Settings_cursorY);
    }
}

function Settings_handleKeyRight(key) {
    if (Settings_Obj_default(key) < Settings_Obj_length(key)) {
        Settings_value[key].defaultValue += 1;
        Settings_ChangeSettings(Settings_cursorY);
    }
}

function Settings_handleKeyDown(event) {
    console.log('Settings_handleKeyDown');

    switch (event.keyCode) {
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            if (Main_isAboutDialogVisible()) Main_HideAboutDialog();
            else if (Main_isControlsDialogVisible()) Main_HideControlsDialog();
            else {
                Settings_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            Settings_handleKeyLeft(Settings_value_keys[Settings_cursorY]);
            break;
        case KEY_RIGHT:
            Settings_handleKeyRight(Settings_value_keys[Settings_cursorY]);
            break;
        case KEY_UP:
            if (Settings_cursorY > 0) {
                Settings_RemoveInputFocus();
                Settings_cursorY--;
                Settings_inputFocus(Settings_cursorY);
            }
            break;
        case KEY_DOWN:
            if (Settings_cursorY < Settings_positions_length - 1) {
                Settings_RemoveInputFocus();
                Settings_cursorY++;
                Settings_inputFocus(Settings_cursorY);
            }
            break;
        case KEY_ENTER:
            Settings_KeyEnter();
            break;
        default:
            break;
    }
}

function Settings_KeyEnter(click) {
    console.log('Settings_handleKeyDown', Settings_value_keys[Settings_cursorY]);

    if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'playerend_opt')) Settings_PlayerEnd(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'blocked_codecs')) Settings_CodecsShow(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'player_buffers')) Settings_DialogShowBuffer(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'player_extracodecs')) Settings_DialogShowExtraCodecs(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'player_bitrate')) Settings_DialogShowBitrate(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'proxy_settings')) Settings_DialogShowProxy(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'vod_seek')) Settings_vod_seek(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'block_qualities')) Settings_block_qualities(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'preview_settings')) Settings_DialogShowSmallPayer(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'livenotification_opt')) Settings_DialogShowNotification(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'dpad_opt')) Settings_DialogShowDpad(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'ui_opt')) Settings_DialogShowUIOpt(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'custom_opt')) Settings_DialogShowCustomOpt(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'warnings_opt')) Settings_DialogShowWarnings(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'update_settings')) Settings_UpdateSettings(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'chat_opt')) Settings_DialogShowChat(click);
    else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'backup_sync')) Settings_DialogBackupSync(click);
}

var Settings_CodecsValue = [];
var Settings_CodecsPos;
var Settings_DisableCodecs = [];
var Settings_DisableQualities = [];
var Settings_DisableQualitiesLen = 0;
var Settings_CodecsDialogSet = false;

function Settings_CodecsShow(click) {
    Main_removeEventListener('keydown', Settings_handleKeyDown);

    if (!Settings_CodecsDialogSet) {
        Settings_SetCodecsValue();

        if (Settings_CodecsValue.length) {
            var dialogContent = '',
                DivContent,
                spacer = ' | ';

            dialogContent +=
                STR_DIV_TITLE +
                STR_BLOCKED_CODEC +
                '</div>' +
                STR_BR +
                STR_CODEC_DIALOG_SUMMARY_1 +
                STR_BR +
                STR_BR +
                STR_CODEC_DIALOG_SUMMARY_2 +
                STR_BR +
                STR_BR +
                STR_CODEC_DIALOG_SUMMARY_3 +
                STR_BR +
                STR_BR;

            var i = 0,
                len = Settings_CodecsValue.length;

            dialogContent +=
                '<div id="settings_codec_container" class="settings_codec_container"><div id="settings_codec_container_scroll" class="side_panel_holder_ani">';
            for (i; i < len; i++) {
                Settings_value[Settings_CodecsValue[i].nameType] = {
                    values: [STR_ENABLED, STR_DISABLED],
                    defaultValue: Main_getItemInt(Settings_CodecsValue[i].nameType, 0)
                };

                DivContent = '';
                DivContent += STR_MAX_RES + Settings_CodecsValue[i].maxresolution + spacer;
                DivContent += STR_MAX_BIT + Settings_CodecsValue[i].maxbitrate + spacer;
                DivContent += STR_MAX_LEVEL + Settings_CodecsValue[i].maxlevel + spacer;
                DivContent += STR_MAX_INSTANCES + (Settings_CodecsValue[i].instances > -1 ? Settings_CodecsValue[i].instances : STR_UNKNOWN) + STR_BR;
                DivContent += Settings_CodecsValue[i].resolutions;

                dialogContent += Settings_DivOptionWithSummary(
                    Settings_CodecsValue[i].nameType,
                    Settings_CodecsValue[i].name +
                        Settings_decoderType(Settings_CodecsValue[i].type) +
                        Settings_decoderGetIsSW(Settings_CodecsValue[i]),
                    DivContent + STR_BR + STR_BR,
                    73
                );
            }
            dialogContent += '</div></div>';

            Main_innerHTML('dialog_codecs_text', dialogContent + STR_DIV_TITLE + (click ? STR_CLOSE_THIS_BROWSER : STR_CLOSE_THIS) + '</div>');

            Settings_CodecsDialogSet = true;
        }
    }

    if (Settings_CodecsValue.length) {
        Settings_CodecsPos = 0;
        Main_AddClass(Settings_CodecsValue[Settings_CodecsPos].nameType, 'settings_value_focus');
        Main_AddClass(Settings_CodecsValue[Settings_CodecsPos].nameType + '_div', 'settings_div_focus');
        Settings_SetarrowsKey(Settings_CodecsValue[Settings_CodecsPos].nameType);
    }

    Main_ShowElement('dialog_codecs');
    Main_addEventListener('keydown', Settings_handleKeyDownCodecs);
}

function Settings_decoderGetIsSW(codec) {
    if (codec.supportsIsHw) {
        return codec.isSoftwareOnly || !codec.isHardwareAccelerated ? ' - ' + STR_SW_CODEC : ' - ' + STR_HW_CODEC;
    }

    return '';
}

function Settings_decoderType(codec) {
    if (Main_A_includes_B(codec, 'avc')) return ' - AVC H.264';
    else if (Main_A_includes_B(codec, 'hevc')) return ' - HEVC H.265';
    else if (Main_A_includes_B(codec, 'av01')) return ' - AV1';

    return '';
}

function Settings_handleKeyDownReturn() {
    Settings_RemoveInputFocusKey(Settings_CodecsValue[Settings_CodecsPos].nameType);
    Main_HideElement('dialog_codecs');
    Main_removeEventListener('keydown', Settings_handleKeyDownCodecs);
    Main_addEventListener('keydown', Settings_handleKeyDown);
    Main_getElementById('settings_codec_container_scroll').style.transform = '';
}

function Settings_handleKeyDownCodecsLeft() {
    var key = Settings_CodecsValue[Settings_CodecsPos].nameType;

    if (Settings_Obj_default(key) > 0) {
        Settings_CodecsRightLeft(-1);
    }
}

function Settings_handleKeyDownCodecsRight() {
    var key = Settings_CodecsValue[Settings_CodecsPos].nameType;

    if (Settings_Obj_default(key) < Settings_Obj_length(key)) {
        Settings_CodecsRightLeft(1);
    }
}

function Settings_handleKeyDownCodecs(event) {
    //console.log('event.keyCode ' + event.keyCode);
    switch (event.keyCode) {
        case KEY_ENTER:
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            Settings_handleKeyDownReturn();
            break;
        case KEY_LEFT:
            Settings_handleKeyDownCodecsLeft();
            break;
        case KEY_RIGHT:
            Settings_handleKeyDownCodecsRight();
            break;
        case KEY_UP:
            if (Settings_CodecsPos > 0) {
                Settings_CodecsUpDown(-1);

                Settings_ScrollCodecs(Settings_CodecsPos);
            }
            break;
        case KEY_DOWN:
            if (Settings_CodecsPos < Settings_CodecsValue.length - 1) {
                Settings_CodecsUpDown(1);

                Settings_ScrollCodecs(Settings_CodecsPos);
            }
            break;
        default:
            break;
    }
}

function Settings_ScrollCodecs(pos) {
    var center = 3,
        doc = Main_getElementById('settings_codec_container_scroll'),
        value = 0,
        offset = 0;

    if (pos > center) {
        value = Main_getElementById(Settings_CodecsValue[pos - center - offset].nameType).offsetTop;
    }

    doc.style.transform = 'translateY(-' + value / BodyfontSize + 'em)';
}

function Settings_Codecs_isVisible() {
    return Main_isElementShowing('dialog_codecs');
}

function Settings_CodecsUpDown(offset) {
    Settings_RemoveInputFocusKey(Settings_CodecsValue[Settings_CodecsPos].nameType);
    Settings_CodecsPos += offset;
    Settings_CodecsUpDownAfter(Settings_CodecsValue[Settings_CodecsPos].nameType);
}

function Settings_CodecsUpDownAfter(key) {
    Main_AddClass(key, 'settings_value_focus');
    Main_AddClass(key + '_div', 'settings_div_focus');
    Settings_SetarrowsKey(key);
}

function Settings_CodecsRightLeft(offset) {
    if (Settings_CodecsValue.length === 1) {
        Main_showWarningDialog(STR_CODEC_DIALOG_SUMMARY_3, 2000);
        return;
    }

    var key = Settings_CodecsValue[Settings_CodecsPos].nameType,
        type = Settings_CodecsValue[Settings_CodecsPos].type,
        index;

    Settings_value[key].defaultValue += offset;

    if (Settings_value[key].defaultValue) {
        Settings_DisableCodecs.push(key);

        //Make sure at least one is enable
        var oneEnable = false,
            i = 0,
            len = Settings_CodecsValue.length;

        for (i; i < len; i++) {
            if (type === Settings_CodecsValue[i].type && !Settings_value[Settings_CodecsValue[i].nameType].defaultValue) {
                oneEnable = true;
                break;
            }
        }

        if (!oneEnable) {
            Main_showWarningDialog(STR_CODEC_DIALOG_SUMMARY_3, 2000);

            key = Settings_CodecsValue[Settings_CodecsPos].nameType;
            Settings_value[key].defaultValue += -1;
            index = Settings_DisableCodecs.indexOf(Settings_CodecsValue[Settings_CodecsPos].nameType);

            if (index > -1) {
                Settings_DisableCodecs.splice(index, 1);
            }
        }
    } else {
        index = Settings_DisableCodecs.indexOf(key);

        if (index > -1) {
            Settings_DisableCodecs.splice(index, 1);
        }
    }

    Main_setItem(key, Settings_Obj_default(key));
    Main_textContent(key, Settings_Obj_values(key));
    Settings_SetarrowsKey(key);

    Main_setItem('Settings_DisableCodecs', JSON.stringify(Settings_DisableCodecs));
    Settings_CodecsSet();
}

function Settings_CodecsSet() {
    if (Main_IsOn_OSInterface) {
        OSInterface_setBlackListMediaCodec(Settings_DisableCodecs.join());
    }

    Settings_SetMaxInstances();
}

function Settings_SetMaxInstances() {
    if (!Settings_CodecsValue.length) {
        Settings_SetCodecsValue();
    }

    Play_MaxInstances = 0;

    var i = 0,
        len = Settings_CodecsValue.length;
    for (i; i < len; i++) {
        if (
            !Settings_DisableCodecs.includes(Settings_CodecsValue[i].nameType) &&
            !Main_A_includes_B(Settings_CodecsValue[i].nameType ? Settings_CodecsValue[i].nameType.toLowerCase() : '', 'google')
        ) {
            Play_MaxInstances = Settings_CodecsValue[i].instances > -1 ? Settings_CodecsValue[i].instances : 10;

            break;
        }
    }

    if (!Play_MaxInstances && len) {
        Play_MaxInstances = Settings_CodecsValue[0].instances > -1 ? Settings_CodecsValue[0].instances : 10;
    }
}

function Settings_SetCodecsValue() {
    if (Settings_CodecsValue.length) {
        return;
    }

    if (!Main_IsOn_OSInterface) {
        // Settings_CodecsValue = [
        //     {
        //         CanonicalName: 'c2.goldfish.h264.decoder',
        //         instances: 32,
        //         isHardwareAccelerated: true,
        //         isSoftwareOnly: false,
        //         maxbitrate: '120 Mbps',
        //         maxlevel: '5.2',
        //         maxresolution: '4096x4096',
        //         name: 'c2.goldfish.h264.decoder',
        //         nameType: 'c2.goldfish.h264.decodervideo/avc',
        //         resolutions:
        //             '160p : 480 fps | 360p : 480 fps | 480p : 480 fps | 720p : 480 fps | 900p : 364 fps | 1080p : 254 fps | 1440p : 144 fps | 4k : 64 fps',
        //         supportsIsHw: true,
        //         type: 'video/avc'
        //     },
        //     {
        //         CanonicalName: 'c2.android.avc.decoder',
        //         instances: 32,
        //         isHardwareAccelerated: false,
        //         isSoftwareOnly: true,
        //         maxbitrate: '48 Mbps',
        //         maxlevel: '5.2',
        //         maxresolution: '4080x4080',
        //         name: 'c2.android.avc.decoder',
        //         nameType: 'c2.android.avc.decodervideo/avc',
        //         resolutions:
        //             '160p : 960 fps | 360p : 960 fps | 480p : 960 fps | 720p : 546 fps | 900p : 345 fps | 1080p : 241 fps | 1440p : 137 fps | 4k : 61 fps',
        //         supportsIsHw: true,
        //         type: 'video/avc'
        //     },
        //     {
        //         CanonicalName: 'c2.android.avc.decoder',
        //         instances: 32,
        //         isHardwareAccelerated: false,
        //         isSoftwareOnly: true,
        //         maxbitrate: '48 Mbps',
        //         maxlevel: '5.2',
        //         maxresolution: '4080x4080',
        //         name: 'OMX.google.h264.decoder',
        //         nameType: 'OMX.google.h264.decodervideo/avc',
        //         resolutions:
        //             '160p : 960 fps | 360p : 960 fps | 480p : 960 fps | 720p : 546 fps | 900p : 345 fps | 1080p : 241 fps | 1440p : 137 fps | 4k : 61 fps',
        //         supportsIsHw: true,
        //         type: 'video/avc'
        //     },
        //     {
        //         CanonicalName: 'c2.goldfish.hevc.decoder',
        //         instances: 32,
        //         isHardwareAccelerated: true,
        //         isSoftwareOnly: false,
        //         maxbitrate: '120 Mbps',
        //         maxlevel: 'High 5.2',
        //         maxresolution: '4096x4096',
        //         name: 'c2.goldfish.hevc.decoder',
        //         nameType: 'c2.goldfish.hevc.decodervideo/hevc',
        //         resolutions:
        //             '160p : 480 fps | 360p : 480 fps | 480p : 480 fps | 720p : 480 fps | 900p : 364 fps | 1080p : 254 fps | 1440p : 144 fps | 4k : 64 fps',
        //         supportsIsHw: true,
        //         type: 'video/hevc'
        //     },
        //     {
        //         CanonicalName: 'c2.android.hevc.decoder',
        //         instances: 32,
        //         isHardwareAccelerated: false,
        //         isSoftwareOnly: true,
        //         maxbitrate: '10 Mbps',
        //         maxlevel: 'High 5.2',
        //         maxresolution: '4096x4096',
        //         name: 'c2.android.hevc.decoder',
        //         nameType: 'c2.android.hevc.decodervideo/hevc',
        //         resolutions:
        //             '160p : 960 fps | 360p : 741 fps | 480p : 417 fps | 720p : 139 fps | 900p : 88 fps | 1080p : 62 fps | 1440p : 35 fps | 4k : 15 fps',
        //         supportsIsHw: true,
        //         type: 'video/hevc'
        //     },
        //     {
        //         CanonicalName: 'c2.android.hevc.decoder',
        //         instances: 32,
        //         isHardwareAccelerated: false,
        //         isSoftwareOnly: true,
        //         maxbitrate: '10 Mbps',
        //         maxlevel: 'High 5.2',
        //         maxresolution: '4096x4096',
        //         name: 'OMX.google.hevc.decoder',
        //         nameType: 'OMX.google.hevc.decodervideo/hevc',
        //         resolutions:
        //             '160p : 960 fps | 360p : 741 fps | 480p : 417 fps | 720p : 139 fps | 900p : 88 fps | 1080p : 62 fps | 1440p : 35 fps | 4k : 15 fps',
        //         supportsIsHw: true,
        //         type: 'video/hevc'
        //     },
        //     {
        //         CanonicalName: 'c2.android.av1.decoder',
        //         instances: 32,
        //         isHardwareAccelerated: false,
        //         isSoftwareOnly: true,
        //         maxbitrate: '40 Mbps',
        //         maxlevel: '5.3',
        //         maxresolution: '2048x2048',
        //         name: 'c2.android.av1.decoder',
        //         nameType: 'c2.android.av1.decodervideo/av01',
        //         resolutions: '160p : 960 fps | 360p : 356 fps | 480p : 205 fps | 720p : 68 fps | 900p : 43 fps | 1080p : 30 fps',
        //         supportsIsHw: true,
        //         type: 'video/av01'
        //     },
        //     {
        //         CanonicalName: 'c2.android-test.decoder',
        //         instances: 32,
        //         isHardwareAccelerated: false,
        //         isSoftwareOnly: true,
        //         maxbitrate: '40 Mbps',
        //         maxlevel: '5.3',
        //         maxresolution: '2048x2048',
        //         name: 'c2.android.av1.decoder',
        //         nameType: 'c2.android-test.decodervideo/av01',
        //         resolutions: '160p : 960 fps | 360p : 356 fps | 480p : 205 fps | 720p : 68 fps | 900p : 43 fps | 1080p : 30 fps',
        //         supportsIsHw: true,
        //         type: 'video/av01'
        //     },
        //     {
        //         CanonicalName: 'c2.android-test.decoder',
        //         instances: 32,
        //         isHardwareAccelerated: false,
        //         isSoftwareOnly: true,
        //         maxbitrate: '40 Mbps',
        //         maxlevel: '5.3',
        //         maxresolution: '2048x2048',
        //         name: 'c2.android.av1.decoder',
        //         nameType: 'c2.android-test.decodervideo/avc',
        //         resolutions: '160p : 960 fps | 360p : 356 fps | 480p : 205 fps | 720p : 68 fps | 900p : 43 fps | 1080p : 30 fps',
        //         supportsIsHw: true,
        //         type: 'video/avc'
        //     },
        //     {
        //         CanonicalName: 'c2.android-test.decoder',
        //         instances: 32,
        //         isHardwareAccelerated: false,
        //         isSoftwareOnly: true,
        //         maxbitrate: '40 Mbps',
        //         maxlevel: '5.3',
        //         maxresolution: '2048x2048',
        //         name: 'c2.android.av1.decoder',
        //         nameType: 'c2.android-test.decodervideo/hevc',
        //         resolutions: '160p : 960 fps | 360p : 356 fps | 480p : 205 fps | 720p : 68 fps | 900p : 43 fps | 1080p : 30 fps',
        //         supportsIsHw: true,
        //         type: 'video/hevc'
        //     }
        // ];

        Settings_CodecsValue = JSON.parse(
            '[{"CanonicalName":"c2.goldfish.h264.decoder","instances":32,"isHardwareAccelerated":true,"isSoftwareOnly":false,"maxbitrate":"120 Mbps","maxlevel":"5.2","maxresolution":"4096x4096","name":"c2.goldfish.h264.decoder","nameType":"c2.goldfish.h264.decodervideo/avc","resolutions":"160p : 480 fps | 360p : 480 fps | 480p : 480 fps | 720p : 480 fps | 900p : 364 fps | 1080p : 254 fps | 1440p : 144 fps | 4k : 64 fps","supportsIsHw":true,"type":"video/avc"},{"CanonicalName":"c2.android.avc.decoder","instances":32,"isHardwareAccelerated":false,"isSoftwareOnly":true,"maxbitrate":"48 Mbps","maxlevel":"5.2","maxresolution":"4080x4080","name":"c2.android.avc.decoder","nameType":"c2.android.avc.decodervideo/avc","resolutions":"160p : 960 fps | 360p : 960 fps | 480p : 960 fps | 720p : 546 fps | 900p : 345 fps | 1080p : 241 fps | 1440p : 137 fps | 4k : 61 fps","supportsIsHw":true,"type":"video/avc"},{"CanonicalName":"c2.android.avc.decoder","instances":32,"isHardwareAccelerated":false,"isSoftwareOnly":true,"maxbitrate":"48 Mbps","maxlevel":"5.2","maxresolution":"4080x4080","name":"OMX.google.h264.decoder","nameType":"OMX.google.h264.decodervideo/avc","resolutions":"160p : 960 fps | 360p : 960 fps | 480p : 960 fps | 720p : 546 fps | 900p : 345 fps | 1080p : 241 fps | 1440p : 137 fps | 4k : 61 fps","supportsIsHw":true,"type":"video/avc"},{"CanonicalName":"c2.goldfish.hevc.decoder","instances":32,"isHardwareAccelerated":true,"isSoftwareOnly":false,"maxbitrate":"120 Mbps","maxlevel":"High 5.2","maxresolution":"4096x4096","name":"c2.goldfish.hevc.decoder","nameType":"c2.goldfish.hevc.decodervideo/hevc","resolutions":"160p : 480 fps | 360p : 480 fps | 480p : 480 fps | 720p : 480 fps | 900p : 364 fps | 1080p : 254 fps | 1440p : 144 fps | 4k : 64 fps","supportsIsHw":true,"type":"video/hevc"},{"CanonicalName":"c2.android.hevc.decoder","instances":32,"isHardwareAccelerated":false,"isSoftwareOnly":true,"maxbitrate":"10 Mbps","maxlevel":"High 5.2","maxresolution":"4096x4096","name":"c2.android.hevc.decoder","nameType":"c2.android.hevc.decodervideo/hevc","resolutions":"160p : 960 fps | 360p : 741 fps | 480p : 417 fps | 720p : 139 fps | 900p : 88 fps | 1080p : 62 fps | 1440p : 35 fps | 4k : 15 fps","supportsIsHw":true,"type":"video/hevc"},{"CanonicalName":"c2.android.hevc.decoder","instances":32,"isHardwareAccelerated":false,"isSoftwareOnly":true,"maxbitrate":"10 Mbps","maxlevel":"High 5.2","maxresolution":"4096x4096","name":"OMX.google.hevc.decoder","nameType":"OMX.google.hevc.decodervideo/hevc","resolutions":"160p : 960 fps | 360p : 741 fps | 480p : 417 fps | 720p : 139 fps | 900p : 88 fps | 1080p : 62 fps | 1440p : 35 fps | 4k : 15 fps","supportsIsHw":true,"type":"video/hevc"},{"CanonicalName":"c2.android.av1.decoder","instances":32,"isHardwareAccelerated":false,"isSoftwareOnly":true,"maxbitrate":"40 Mbps","maxlevel":"5.3","maxresolution":"2048x2048","name":"c2.android.av1.decoder","nameType":"c2.android.av1.decodervideo/av01","resolutions":"160p : 960 fps | 360p : 356 fps | 480p : 205 fps | 720p : 68 fps | 900p : 43 fps | 1080p : 30 fps","supportsIsHw":true,"type":"video/av01"},{"CanonicalName":"c2.android-test.decoder","instances":32,"isHardwareAccelerated":false,"isSoftwareOnly":true,"maxbitrate":"40 Mbps","maxlevel":"5.3","maxresolution":"2048x2048","name":"c2.android.av1.decoder","nameType":"c2.android-test.decodervideo/av01","resolutions":"160p : 960 fps | 360p : 356 fps | 480p : 205 fps | 720p : 68 fps | 900p : 43 fps | 1080p : 30 fps","supportsIsHw":true,"type":"video/av01"},{"CanonicalName":"c2.android-test.decoder","instances":32,"isHardwareAccelerated":false,"isSoftwareOnly":true,"maxbitrate":"40 Mbps","maxlevel":"5.3","maxresolution":"2048x2048","name":"c2.android.av1.decoder","nameType":"c2.android-test.decodervideo/avc","resolutions":"160p : 960 fps | 360p : 356 fps | 480p : 205 fps | 720p : 68 fps | 900p : 43 fps | 1080p : 30 fps","supportsIsHw":true,"type":"video/avc"},{"CanonicalName":"c2.android-test.decoder","instances":32,"isHardwareAccelerated":false,"isSoftwareOnly":true,"maxbitrate":"40 Mbps","maxlevel":"5.3","maxresolution":"2048x2048","name":"c2.android.av1.decoder","nameType":"c2.android-test.decodervideo/hevc","resolutions":"160p : 960 fps | 360p : 356 fps | 480p : 205 fps | 720p : 68 fps | 900p : 43 fps | 1080p : 30 fps","supportsIsHw":true,"type":"video/hevc"}]'
        );
    } else {
        try {
            Settings_CodecsValue = JSON.parse(OSInterface_getcodecCapabilities('avc'));

            Settings_CodecsValue.push.apply(Settings_CodecsValue, JSON.parse(OSInterface_getcodecCapabilities('hevc')));
            Settings_CodecsValue.push.apply(Settings_CodecsValue, JSON.parse(OSInterface_getcodecCapabilities('av01')));
        } catch (e) {
            Settings_CodecsValue = [];
        }
    }

    try {
        //keep inside a try to avoid any device issues crashing the app
        Settings_SetSuportedCodecs(Settings_CodecsValue);
    } catch (e) {
        Settings_CodecsValue = [];
    }
}

function Settings_SetSuportedCodecs(codecs) {
    var i = 0,
        len = codecs.length;

    for (i; i < len; i++) {
        if (Main_A_includes_B(codecs[i].type, 'hevc')) {
            Settings_HEVCSupported = true;
        }

        if (Main_A_includes_B(codecs[i].type, 'av01')) {
            Settings_AV1Supported = true;
        }

        if (Settings_HEVCSupported && Settings_AV1Supported) {
            break;
        }
    }

    if (!Main_values.checkedEnhancedStream) {
        Main_values.checkedEnhancedStream = true;

        Settings_value.hevc_codec.defaultValue = Settings_HEVCSupported ? 1 : 0;
        Settings_value.av1_codec.defaultValue = Settings_AV1Supported ? 1 : 0;

        Main_setItem('hevc_codec', Settings_value.hevc_codec.defaultValue + 1);
        Main_setItem('av1_codec', Settings_value.av1_codec.defaultValue + 1);
    }
}

function Settings_QualitiesCheck() {
    Settings_DisableQualities = [];
    var array_values = ['43', '21', '16', '14', '10', '9', '7', '4', '3'],
        array_blocked_values = ['4200-4600', '1700-2200', '1500-1700', '1400-1500', '1000-1100', '900-1000', '700-800', '400-500', '300-400'],
        i = 0,
        len = array_values.length;

    for (i; i < len; i++) {
        if (Settings_Obj_default('block_qualities_' + array_values[i])) {
            Settings_DisableQualities.push(array_blocked_values[i]);
        }
    }

    Settings_DisableQualitiesLen = Settings_DisableQualities.length;
    //reset clip source on change
    PlayClip_quality = 'source';
    PlayClip_qualityPlaying = PlayClip_quality;

    Main_setItem('Settings_DisableQualities', JSON.stringify(Settings_DisableQualities));
    Settings_Qualities();
}

function Settings_Qualities() {
    if (Main_IsOn_OSInterface) {
        OSInterface_setBlackListQualities(Settings_DisableQualities.join());
    }
}

function Settings_ForceEnableAnimations() {
    Settings_value.app_animations.defaultValue = 1;
    Main_setItem('app_animations', 2);
    Settings_SetAnimations();
}

function Settings_DialogShowBuffer(ckick) {
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
        }
    };

    Settings_DialogShow(obj, STR_SETTINGS_BUFFER_SIZE + STR_BR + STR_SETTINGS_BUFFER_SIZE_SUMMARY, ckick);
}

function Settings_DialogShowProxy(click) {
    var array_no_yes = [STR_NO, STR_YES];
    Settings_value.ttv_lolProxy.values = array_no_yes;
    Settings_value.k_twitch.values = array_no_yes;
    Settings_value.T1080.values = array_no_yes;

    var obj = {
        proxy_timeout: {
            defaultValue: Settings_value.k_twitch.defaultValue,
            values: Settings_value.k_twitch.values,
            title: STR_PROXY_TIMEOUT,
            summary: STR_PROXY_TIMEOUT_SUMMARY
        },
        T1080: {
            defaultValue: Settings_value.ttv_lolProxy.defaultValue,
            values: Settings_value.ttv_lolProxy.values,
            title: STR_T1080,
            summary: STR_T1080_SUMMARY
        },
        ttv_lolProxy: {
            defaultValue: Settings_value.k_twitch.defaultValue,
            values: Settings_value.k_twitch.values,
            title: STR_TTV_LOL,
            summary: STR_TTV_LOL_SUMMARY
        },
        k_twitch: {
            defaultValue: Settings_value.ttv_lolProxy.defaultValue,
            values: Settings_value.ttv_lolProxy.values,
            title: STR_K_TWITCH,
            summary: STR_K_TWITCH_SUMMARY
        }
    };

    Settings_DialogShow(obj, PROXY_SETTINGS + STR_BR + STR_BR + PROXY_SETTINGS_SUMMARY, click);
}

function Settings_DialogShowExtraCodecs(click) {
    var dis_ena = [STR_DISABLED, STR_ENABLED];
    Settings_value.av1_codec.values = dis_ena;
    Settings_value.hevc_codec.values = dis_ena;

    var obj = {
        hevc_codec: {
            defaultValue: Settings_value.hevc_codec.defaultValue,
            values: Settings_value.hevc_codec.values,
            title: STR_SPACE_HTML + STR_SPACE_HTML + STR_SPACE_HTML + STR_SPACE_HTML + STR_PLAYER_CODEC_HEVC
        },

        av1_codec: {
            defaultValue: Settings_value.av1_codec.defaultValue,
            values: Settings_value.av1_codec.values,
            title: STR_SPACE_HTML + STR_SPACE_HTML + STR_SPACE_HTML + STR_SPACE_HTML + STR_PLAYER_CODEC_AV1
        }
    };

    var red = '#ec0000',
        green = '#00c900';

    Settings_DialogShow(
        obj,
        STR_DIV_TITLE +
            STR_PLAYER_EXTRA_CODEC +
            '</div>' +
            STR_BR +
            STR_PLAYER_EXTRA_CODEC_SUMMARY +
            STR_BR +
            STR_BR +
            STR_PLAYER_EXTRA_CODEC_SUMMARY_EXTRA +
            STR_BR +
            STR_BR +
            STR_PLAYER_EXTRA_CODEC_SUMMARY_EXTRA3 +
            STR_BR +
            STR_BR +
            STR_PLAYER_EXTRA_CODEC_SUMMARY_EXTRA2 +
            STR_BR +
            STR_BR +
            '<div class="about_text_title" ' +
            '<span style="color: ' +
            (Settings_HEVCSupported ? green : red) +
            ';"> HEVC -' +
            STR_SPACE_HTML +
            (Settings_HEVCSupported ? STR_PLAYER_CODEC_SUPPORTED : STR_PLAYER_CODEC_NOT_SUPPORTED) +
            STR_BR +
            STR_BR +
            '</span><span style="color: ' +
            (Settings_AV1Supported ? green : red) +
            ';"> AV1 -' +
            STR_SPACE_HTML +
            (Settings_AV1Supported ? STR_PLAYER_CODEC_SUPPORTED : STR_PLAYER_CODEC_NOT_SUPPORTED) +
            '</span></div>',
        click
    );
}

function Settings_DialogShowBitrate(click) {
    Settings_value.res_max.values[0] = STR_PLAYER_BITRATE_UNLIMITED;
    Settings_value.res_min.values[0] = STR_PLAYER_BITRATE_UNLIMITED;

    Settings_value.bitrate_main.values[0] = STR_PLAYER_BITRATE_UNLIMITED;
    Settings_value.bitrate_min.values[0] = STR_PLAYER_BITRATE_UNLIMITED;

    var obj = {
        res_max: {
            defaultValue: Settings_value.res_max.defaultValue,
            values: Settings_value.res_max.values,
            title: STR_PLAYER_RES_MAIN,
            summary: null
        },
        res_min: {
            defaultValue: Settings_value.res_min.defaultValue,
            values: Settings_value.res_min.values,
            title: STR_PLAYER_RES_SMALL,
            summary: null
        },
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
            summary: null
        }
    };

    Settings_DialogShow(
        obj,
        STR_PLAYER_BITRATE + STR_BR + STR_BR + STR_PLAYER_BITRATE_SUMMARY + STR_BR + STR_BR + STR_PLAYER_BITRATE_SUMMARY_ETC,
        click
    );
}

function Settings_vod_seek(click) {
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
        }
    };

    Settings_DialogShow(obj, STR_VOD_SEEK + STR_BR + STR_BR + STR_VOD_SEEK_SUMMARY, click);
}

function Settings_DialogShowSmallPayer(click) {
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
        show_feed_player: {
            defaultValue: Settings_value.show_feed_player.defaultValue,
            values: Settings_value.show_feed_player.values,
            title: STR_SHOW_FEED_PLAYER,
            summary: STR_SHOW_FEED_PLAYER_SUMMARY
        },
        show_side_player: {
            defaultValue: Settings_value.show_side_player.defaultValue,
            values: Settings_value.show_side_player.values,
            title: STR_SHOW_SIDE_PLAYER,
            summary: null
        },
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
        screen_preview_volume: {
            defaultValue: Settings_value.screen_preview_volume.defaultValue,
            values: Settings_value.screen_preview_volume.values,
            title: STR_PREVIEW_VOLUME_SCREEN,
            summary: STR_PREVIEW_VOLUME_SCREEN_SUMMARY
        },
        preview_volume_new: {
            defaultValue: Settings_value.preview_volume_new.defaultValue,
            values: Settings_value.preview_volume_new.values,
            title: STR_PREVIEW_VOLUME,
            summary: STR_PREVIEW_VOLUME_SUMMARY
        },
        preview_others_volume_new: {
            defaultValue: Settings_value.preview_others_volume_new.defaultValue,
            values: Settings_value.preview_others_volume_new.values,
            title: STR_PREVIEW_OTHERS_VOLUME,
            summary: STR_PREVIEW_OTHERS_VOLUME_SUMMARY
        },
        show_feed_player_delay: {
            defaultValue: Settings_value.show_feed_player_delay.defaultValue,
            values: Settings_value.show_feed_player_delay.values,
            title: STR_SIDE_PANEL_PLAYER_DELAY,
            summary: STR_SIDE_PANEL_PLAYER_DELAY_SUMMARY
        },
        disable_feed_player_multi: {
            defaultValue: Settings_value.disable_feed_player_multi.defaultValue,
            values: Settings_value.disable_feed_player_multi.values,
            title: STR_DISABLED_FEED_PLAYER_MULTI,
            summary: STR_DISABLED_FEED_PLAYER_MULTI_SUMMARY
        },
        auto_clip_preview: {
            defaultValue: Settings_value.auto_clip_preview.defaultValue,
            values: Settings_value.auto_clip_preview.values,
            title: STR_AUTO_PLAY_NEXT,
            summary: STR_PREVIEW_CLIP_NEXT
        }
    };

    Settings_DialogShow(obj, STR_SIDE_PANEL_PLAYER, click);
}

function Settings_DialogShowNotification(click) {
    Settings_value.live_notification.values = [STR_NO, STR_YES];
    Settings_value.live_notification_background.values = [STR_NO, STR_YES];
    Settings_value.title_notification.values = [STR_NO, STR_YES];
    Settings_value.game_notification.values = [STR_NO, STR_YES];
    Settings_value.live_notification_position.values = STR_NOTIFICATION_POS_ARRAY;
    Settings_value.since_notification.values[0] = STR_DISABLED;

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
        },
        live_notification_background: {
            defaultValue: Settings_value.live_notification_background.defaultValue,
            values: Settings_value.live_notification_background.values,
            title: STR_NOTIFICATION_BACKGROUND,
            summary: STR_NOTIFICATION_BACKGROUND_SUMMARY
        }
    };

    Settings_DialogShow(obj, STR_NOTIFICATION_OPT, click);
}

function Settings_DialogShowDpad(click) {
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

    Settings_DialogShow(obj, STR_DPAD_OPT, click);
}

function Settings_DialogShowUIOpt(click) {
    Settings_value.app_animations.values = [STR_NO, STR_YES];
    Settings_value.videos_animation.values = [STR_NO, STR_YES];
    Settings_value.hide_screen_counter.values = [STR_NO, STR_YES];
    Settings_value.burn_in_protection.values = [STR_NO, STR_YES];
    Settings_value.hide_main_clock.values = [STR_NO, STR_YES];
    Settings_value.hide_player_clock.values = [STR_NO, STR_YES];
    Settings_value.hide_main_screen_title.values = [STR_NO, STR_YES];
    Settings_value.hide_etc_help_text.values = [STR_NO, STR_YES];
    Settings_value.round_images.values = [STR_NO, STR_YES];

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
        round_images: {
            defaultValue: Settings_value.round_images.defaultValue,
            values: Settings_value.round_images.values,
            title: STR_ROUND_IMAGES,
            summary: STR_ROUND_IMAGES_SUMMARY
        },
        clock_offset: {
            defaultValue: Settings_value.clock_offset.defaultValue,
            values: Settings_value.clock_offset.values,
            title: STR_CLOCK_OFFSET,
            summary: STR_CLOCK_OFFSET_SUMMARY
        },
        clock_style: {
            defaultValue: Settings_value.clock_style.defaultValue,
            values: Settings_value.clock_style.values,
            title: STR_CLOCK_AM_PM,
            summary: STR_CLOCK_AM_PM_SUMMARY
        },
        hide_main_clock: {
            defaultValue: Settings_value.hide_main_clock.defaultValue,
            values: Settings_value.hide_main_clock.values,
            title: STR_HIDE_MAIN_CLOCK,
            summary: null
        },
        hide_screen_counter: {
            defaultValue: Settings_value.hide_screen_counter.defaultValue,
            values: Settings_value.hide_screen_counter.values,
            title: STR_SCREEN_COUNTER,
            summary: STR_SCREEN_COUNTER_SUMMARY
        },
        hide_player_clock: {
            defaultValue: Settings_value.hide_player_clock.defaultValue,
            values: Settings_value.hide_player_clock.values,
            title: STR_HIDE_PLAYER_CLOCK,
            summary: null
        },
        hide_main_screen_title: {
            defaultValue: Settings_value.hide_main_screen_title.defaultValue,
            values: Settings_value.hide_main_screen_title.values,
            title: STR_HIDE_MAIN_SCREEN_TITLE,
            summary: STR_HIDE_MAIN_SCREEN_TITLE_SUMMARY
        },
        hide_etc_help_text: {
            defaultValue: Settings_value.hide_etc_help_text.defaultValue,
            values: Settings_value.hide_etc_help_text.values,
            title: STR_HIDE_ETC_HELP_INFO,
            summary: STR_HIDE_ETC_HELP_INFO_SUMMARY
        },
        burn_in_protection: {
            defaultValue: Settings_value.burn_in_protection.defaultValue,
            values: Settings_value.burn_in_protection.values,
            title: STR_OLED_BURN_IN,
            summary: STR_OLED_BURN_IN_SUMMARY
        }
    };

    Settings_DialogShow(obj, STR_UI_SETTINGS, click);
}

function Settings_DialogShowCustomOpt(click) {
    Settings_value.auto_refresh_background.values = [STR_NO, STR_YES];
    Settings_value.auto_refresh_screen.values[0] = STR_DISABLED;
    Settings_value.auto_minimize_inactive.values[0] = STR_DISABLED;

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

    var obj = {
        live_feed_sort: {
            defaultValue: Settings_value.live_feed_sort.defaultValue,
            values: Settings_value.live_feed_sort.values,
            title: STR_LIVE_FEED_SORT,
            summary: STR_LIVE_FEED_SORT_SUMMARY
        },
        auto_minimize_inactive: {
            defaultValue: Settings_value.auto_minimize_inactive.defaultValue,
            values: Settings_value.auto_minimize_inactive.values,
            title: STR_INACTIVE_SETTINGS,
            summary: STR_INACTIVE_SETTINGS_SUMMARY
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

    Settings_DialogShow(obj, STR_GENERAL_CUSTOM, click);
}

function Settings_DialogShowWarnings(click) {
    Settings_value.accessibility_warn.values = [STR_NO, STR_YES];
    Settings_value.ping_warn.values = [STR_NO, STR_YES];
    Settings_value.live_warn.values = [STR_NO, STR_YES];

    var obj = {
        accessibility_warn: {
            defaultValue: Settings_value.accessibility_warn.defaultValue,
            values: Settings_value.accessibility_warn.values,
            title: STR_SETTINGS_ACCESSIBILITY,
            summary: STR_SETTINGS_ACCESSIBILITY_SUMMARY + STR_SPACE_HTML + STR_ACCESSIBILITY_WARN_EXTRA + STR_SPACE_HTML + STR_APP_LAG
        },
        ping_warn: {
            defaultValue: Settings_value.ping_warn.defaultValue,
            values: Settings_value.ping_warn.values,
            title: STR_PING_WARNING,
            summary: STR_PING_WARNING_SUMMARY
        },
        live_warn: {
            defaultValue: Settings_value.live_warn.defaultValue,
            values: Settings_value.live_warn.values,
            title: STR_SHOW_ISLIVE_WARNING,
            summary: STR_SHOW_ISLIVE_WARNING_SUMMARY
        }
    };

    Settings_DialogShow(obj, STR_WARNINGS, click);
}

function Settings_UpdateSettings(click) {
    Settings_value.update_background.values = [STR_YES, STR_NO];
    Settings_value.update_show.values = STR_UPDATE_SHOW_ARRAY;

    var obj = {
        update_background: {
            defaultValue: Settings_value.update_background.defaultValue,
            values: Settings_value.update_background.values,
            title: STR_UPDATE_CHECK_FOR,
            summary: null
        },
        update_show: {
            defaultValue: Settings_value.update_show.defaultValue,
            values: Settings_value.update_show.values,
            title: STR_UPDATE_SHOW,
            summary: null
        }
    };

    Settings_DialogShow(obj, STR_UPDATE_OPT, click);
}

function Settings_PlayerEnd(click) {
    var yes_no = [STR_NO, STR_YES];
    Settings_value.open_host.values = yes_no;
    Settings_value.play_stay.values = yes_no;
    Settings_value.clip_autoPlayNext.values = yes_no;
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
        clip_autoPlayNext: {
            defaultValue: Settings_value.clip_autoPlayNext.defaultValue,
            values: Settings_value.clip_autoPlayNext.values,
            title: STR_AUTO_PLAY_NEXT,
            summary: null
        },
        end_dialog_counter: {
            defaultValue: Settings_value.end_dialog_counter.defaultValue,
            values: Settings_value.end_dialog_counter.values,
            title: STR_END_DIALOG_SETTINGS,
            summary: STR_END_DIALOG_SETTINGS_SUMMARY
        }
    };
    Settings_DialogShow(obj, STR_END_DIALOG_OPT, click);
}

function Settings_DialogBackupSyncRefresh() {
    var divArray = ['sync_users' + '_div', 'sync_history' + '_div', 'sync_settings' + '_div'];

    for (var i = 0; i < divArray.length; i++) {
        if (Settings_value.sync_enabled.defaultValue) {
            Main_RemoveClass(divArray[i], 'hideimp');
        } else {
            Main_AddClass(divArray[i], 'hideimp');
        }
    }
}

function Settings_DialogBackupSync(click) {
    var yes_no = [STR_NO, STR_YES];
    Settings_value.backup_enabled.values = yes_no;
    Settings_value.sync_enabled.values = yes_no;
    Settings_value.sync_users.values = yes_no;
    Settings_value.sync_history.values = yes_no;
    Settings_value.sync_settings.values = yes_no;

    var obj = {
        backup_account: {
            defaultValue: Settings_value.backup_account.defaultValue,
            values: Settings_value.backup_account.values,
            title: GDriveAccessToken ? STR_BACKUP_ACCOUNT_REMOVE : STR_BACKUP_ACCOUNT_ADD,
            keyenter: true
        },
        backup_enabled: {
            defaultValue: Settings_value.backup_enabled.defaultValue,
            values: Settings_value.backup_enabled.values,
            title: STR_BACKUP_ENABLE,
            summary: STR_BACKUP_ENABLE_SUMMARY
        },
        sync_enabled: {
            defaultValue: Settings_value.sync_enabled.defaultValue,
            values: Settings_value.sync_enabled.values,
            title: STR_BACKUP_SYNC_ENABLE,
            summary: STR_BACKUP_SYNC_ENABLE_SUMMARY
        },
        sync_users: {
            defaultValue: Settings_value.sync_users.defaultValue,
            values: Settings_value.sync_users.values,
            title: STR_BACKUP_SYNC_USER,
            summary: null
        },
        sync_history: {
            defaultValue: Settings_value.sync_history.defaultValue,
            values: Settings_value.sync_history.values,
            title: STR_BACKUP_SYNC_HISTORY,
            summary: null
        },
        sync_settings: {
            defaultValue: Settings_value.sync_settings.defaultValue,
            values: Settings_value.sync_settings.values,
            title: STR_BACKUP_SYNC_SETTINGS,
            summary: null
        }
    };

    Settings_DialogShow(
        obj,
        STR_BACKUP_SYNC +
            STR_BR +
            STR_BR +
            STR_BACKUP_SYNC_SUMMARY +
            STR_BR +
            STR_BR +
            (GDriveBackupSize ? STR_BACKUP_SIZE + STR_SPACE + GDriveBackupSize : ''),
        click
    );

    Settings_DialogBackupSyncRefresh();
}

var Settings_RemoveBackupPos = 0;

function Settings_RemoveBackupAccount() {
    Main_innerHTML('main_dialog_remove', STR_DIV_TITLE + STR_BACKUP_ACCOUNT_REMOVE + '</div>');

    Main_textContent('yes_no_dialog_button_no', STR_NO);
    Main_textContent('yes_no_dialog_button_yes', STR_YES);
    Settings_DialoghandleKeyReturnAfter();
    Settings_RemoveBackupPos = 0;

    Main_ShowElement('yes_no_dialog');

    Main_addEventListener('keydown', Settings_handleRemoveDrive);
}

function Settings_RemoveBackupAccountDone() {
    Main_HideElement('yes_no_dialog');
    Main_removeEventListener('keydown', Settings_handleRemoveDrive);
    Main_addEventListener('keydown', Settings_handleKeyDown);
}

function Settings_handleRemoveDrive(event) {
    switch (event.keyCode) {
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            Settings_RemoveBackupAccountDone();
            break;
        case KEY_LEFT:
            Main_AddClass('yes_no_dialog_button_no', 'button_dialog_focused');
            Main_RemoveClass('yes_no_dialog_button_yes', 'button_dialog_focused');
            Settings_RemoveBackupPos = 0;
            break;
        case KEY_RIGHT:
            Main_RemoveClass('yes_no_dialog_button_no', 'button_dialog_focused');
            Main_AddClass('yes_no_dialog_button_yes', 'button_dialog_focused');
            Settings_RemoveBackupPos = 1;
            break;
        case KEY_ENTER:
            Settings_RemoveBackupAccountDone();
            if (Settings_RemoveBackupPos) {
                GDriveClean();
            }
            break;
        default:
            break;
    }
}

function Settings_DialogAddBackupAccount() {
    Main_innerHTML('backup_dialog_text', STR_BACKUP_ACCOUNT_MAIN_0);

    Main_ShowElement('backup_dialog');
    GDriveStart();
}

function Settings_DialogShowChat(click) {
    var yes_no = [STR_NO, STR_YES];
    Settings_value.highlight_rewards.values = yes_no;
    Settings_value.highlight_first.values = yes_no;
    Settings_value.chat_show_badges.values = yes_no;
    Settings_value.chat_show_badges_mod.values = yes_no;
    Settings_value.chat_show_badges_vip.values = yes_no;
    Settings_value.chat_show_badges_shared.values = yes_no;
    Settings_value.highlight_atstreamer.values = yes_no;
    Settings_value.highlight_streamer.values = yes_no;
    Settings_value.highlight_mod.values = yes_no;
    Settings_value.highlight_atuser.values = yes_no;
    Settings_value.highlight_user_send.values = yes_no;
    Settings_value.show_sub.values = yes_no;
    Settings_value.highlight_bits.values = yes_no;
    Settings_value.show_actions.values = yes_no;
    Settings_value.chat_bot.values = yes_no;
    Settings_value.chat_individual_background.values = [STR_DISABLED, STR_ENABLED, STR_BRIGHT_MODE, STR_DARK_MODE];
    Settings_value.chat_logging.values = yes_no;
    Settings_value.disabled_shared.values = yes_no;

    Settings_value.individual_lines.values = yes_no;
    Settings_value.chat_nickcolor.values = yes_no;
    Settings_value.chat_line_animation.values = yes_no;
    Settings_value.chat_timestamp.values = yes_no;
    Settings_value.clear_chat.values = yes_no;
    Settings_value.show_chatters.values = [STR_DISABLED, STR_SHOW_IN_CHAT_CHATTERS, STR_SHOW_IN_CHAT_VIEWERS];

    var obj = {
        chat_logging: {
            defaultValue: Settings_value.chat_logging.defaultValue,
            values: Settings_value.chat_logging.values,
            title: STR_CHAT_LOGGING,
            summary: STR_CHAT_LOGGING_SUMMARY
        },
        disabled_shared: {
            defaultValue: Settings_value.disabled_shared.defaultValue,
            values: Settings_value.disabled_shared.values,
            title: STR_DISABLE_SHARED_CHAT,
            summary: STR_DISABLE_SHARED_CHAT_SUMMARY
        },
        chat_line_animation: {
            defaultValue: Settings_value.chat_line_animation.defaultValue,
            values: Settings_value.chat_line_animation.values,
            title: STR_CHAT_LINE_ANIMATION,
            summary: null
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
        highlight_first: {
            defaultValue: Settings_value.highlight_first.defaultValue,
            values: Settings_value.highlight_first.values,
            title: STR_CHAT_HIGHLIGHT_FIRST,
            summary: null
        },
        highlight_mod: {
            defaultValue: Settings_value.highlight_mod.defaultValue,
            values: Settings_value.highlight_mod.values,
            title: STR_CHAT_HIGHLIGHT_MOD_MSG,
            summary: null
        },
        highlight_streamer: {
            defaultValue: Settings_value.highlight_streamer.defaultValue,
            values: Settings_value.highlight_streamer.values,
            title: STR_CHAT_HIGHLIGHT_STREAMER_MSG,
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
        chat_bot: {
            defaultValue: Settings_value.chat_bot.defaultValue,
            values: Settings_value.chat_bot.values,
            title: STR_CHAT_BOTS,
            summary: null
        },
        chat_show_badges: {
            defaultValue: Settings_value.chat_show_badges.defaultValue,
            values: Settings_value.chat_show_badges.values,
            title: STR_CHAT_SHOW_BADGES,
            summary: null
        },
        chat_show_badges_mod: {
            defaultValue: Settings_value.chat_show_badges_mod.defaultValue,
            values: Settings_value.chat_show_badges_mod.values,
            title: STR_CHAT_SHOW_BADGES_MOD,
            summary: null
        },
        chat_show_badges_vip: {
            defaultValue: Settings_value.chat_show_badges_vip.defaultValue,
            values: Settings_value.chat_show_badges_vip.values,
            title: STR_CHAT_SHOW_BADGES_VIP,
            summary: null
        },
        chat_show_badges_shared: {
            defaultValue: Settings_value.chat_show_badges_shared.defaultValue,
            values: Settings_value.chat_show_badges_shared.values,
            title: STR_CHAT_SHOW_BADGES_SHARED,
            summary: null
        }
    };

    //Use off set if there is too many options
    //Ajust the value as per setting option by trying diff Global app font size offset
    var fontOffset = Settings_Obj_default('global_font_offset') + 3,
        offset = Object.keys(obj).length - fontOffset;

    Settings_DialogShow(obj, STR_CHAT_OPTIONS, click, offset);
}

function Settings_block_qualities(click) {
    var array_ena_dis = [STR_BLOCKED_NOT, STR_BLOCKED];
    Settings_value.block_qualities_43.values = array_ena_dis;
    Settings_value.block_qualities_21.values = array_ena_dis;
    Settings_value.block_qualities_16.values = array_ena_dis;
    Settings_value.block_qualities_14.values = array_ena_dis;
    Settings_value.block_qualities_10.values = array_ena_dis;
    Settings_value.block_qualities_9.values = array_ena_dis;
    Settings_value.block_qualities_7.values = array_ena_dis;
    Settings_value.block_qualities_4.values = array_ena_dis;
    Settings_value.block_qualities_3.values = array_ena_dis;

    var obj = {
        block_qualities_43: {
            defaultValue: Settings_value.block_qualities_43.defaultValue,
            values: Settings_value.block_qualities_43.values,
            title: '42XXp to 46XXp 8k',
            summary: null
        },
        block_qualities_21: {
            defaultValue: Settings_value.block_qualities_21.defaultValue,
            values: Settings_value.block_qualities_21.values,
            title: '17XXp to 22XXp 4k',
            summary: null
        },
        block_qualities_16: {
            defaultValue: Settings_value.block_qualities_16.defaultValue,
            values: Settings_value.block_qualities_16.values,
            title: '15XXp to 17XXp 2.5k',
            summary: null
        },
        block_qualities_14: {
            defaultValue: Settings_value.block_qualities_14.defaultValue,
            values: Settings_value.block_qualities_14.values,
            title: '14XXp 2k',
            summary: null
        },
        block_qualities_10: {
            defaultValue: Settings_value.block_qualities_10.defaultValue,
            values: Settings_value.block_qualities_10.values,
            title: '10XXp',
            summary: null
        },
        block_qualities_9: {
            defaultValue: Settings_value.block_qualities_9.defaultValue,
            values: Settings_value.block_qualities_9.values,
            title: '9XXp',
            summary: null
        },
        block_qualities_7: {
            defaultValue: Settings_value.block_qualities_7.defaultValue,
            values: Settings_value.block_qualities_7.values,
            title: '7XXp',
            summary: null
        },
        block_qualities_4: {
            defaultValue: Settings_value.block_qualities_4.defaultValue,
            values: Settings_value.block_qualities_4.values,
            title: '4XXp',
            summary: null
        },
        block_qualities_3: {
            defaultValue: Settings_value.block_qualities_3.defaultValue,
            values: Settings_value.block_qualities_3.values,
            title: '3XXp',
            summary: null
        }
    };

    Settings_DialogShow(obj, STR_BLOCK_RES + STR_BR + STR_BR + STR_BLOCK_RES_SUMMARY + STR_BR + STR_BR + STR_BLOCK_RES_SUMMARY_EXTRA, click);
}

function Settings_Dialog_isVisible() {
    return Main_isElementShowing('dialog_settings');
}

var Settings_DialogValue = [];
var Settings_DialogPos = 0;
var Settings_DialogScrollCenter = 0;

function Settings_DialogShow(obj, title, click, scroll) {
    Main_removeEventListener('keydown', Settings_handleKeyDown);

    var dialogContent = title + STR_BR,
        dialogScroollHolder =
            '<div id="settings_scroll_container" class="' +
            (scroll ? 'settings_scroll_container' : '') +
            '"><div id="settings_scroll_container_scroll" class="side_panel_holder_ani">';

    Settings_DialogValue = [];

    for (var property in obj) {
        Settings_DialogValue.push(property);
        if (obj[property].keyenter) {
            dialogScroollHolder += Settings_Content(property, [STR_ENTER_TO_OPEN], obj[property].title, null);
        } else {
            dialogScroollHolder += obj[property].summary
                ? Settings_DivOptionWithSummary(property, obj[property].title, obj[property].summary, 73)
                : Settings_DivOptionNoSummary(property, obj[property].title);
        }
    }

    dialogScroollHolder += '</div></div>';

    Main_innerHTML(
        'dialog_settings_text',
        dialogContent +
            dialogScroollHolder +
            '<div id="dialog_setting_close_text" class="about_text_title">' +
            (click ? STR_CLOSE_THIS_BROWSER : STR_CLOSE_THIS) +
            '</div>'
    );

    Settings_DialogScrollCenter = scroll ? scroll : 0;
    Settings_DialogPos = 0;
    Main_AddClass(Settings_DialogValue[0], 'settings_value_focus');
    Main_AddClass(Settings_DialogValue[0] + '_div', 'settings_div_focus');
    Settings_SetarrowsKey(Settings_DialogValue[0]);

    Main_ShowElement('dialog_settings');
    Main_addEventListener('keydown', Settings_DialoghandleKeyDown);
}

function Settings_DialoghandleKeyReturn() {
    Settings_DialoghandleKeyReturnAfter();
    Main_addEventListener('keydown', Settings_handleKeyDown);
}

function Settings_DialoghandleKeyReturnAfter() {
    Settings_RemoveInputFocusKey(Settings_DialogValue[Settings_DialogPos]);
    Main_HideElement('dialog_settings');
    Main_removeEventListener('keydown', Settings_DialoghandleKeyDown);
}

function Settings_DialoghandleKeyLeft() {
    var key = Settings_DialogValue[Settings_DialogPos];
    if (Settings_Obj_default(key) > 0) Settings_DialogRightLeft(-1);
}

function Settings_DialoghandleKeyRight() {
    var key = Settings_DialogValue[Settings_DialogPos];
    if (Settings_Obj_default(key) < Settings_Obj_length(key)) Settings_DialogRightLeft(1);
}

function Settings_BackupDialogExit(event) {
    console.log('Settings_BackupDialogExit');

    if (Main_isElementShowing('backup_dialog')) {
        if (event.keyCode === KEY_ENTER || event.keyCode === KEY_RETURN || event.keyCode === KEY_KEYBOARD_BACKSPACE) {
            Main_HideElement('backup_dialog');
            return true;
        }
    }
    return false;
}

function Settings_DialoghandleKeyDown(event) {
    if (Settings_BackupDialogExit(event)) {
        return;
    }

    switch (event.keyCode) {
        case KEY_ENTER:
            if (Main_A_includes_B(Settings_DialogValue[Settings_DialogPos], 'thumb_background')) {
                SettingsColor_DialogColorsShow();
                break;
            }
            if (Main_A_includes_B(Settings_DialogValue[Settings_DialogPos], 'backup_account')) {
                if (GDriveAccessToken) {
                    Settings_RemoveBackupAccount();
                } else {
                    Settings_DialogAddBackupAccount();
                }

                break;
            }
            if (Settings_DialogRestoreBackupShowing) {
                Settings_DialogRestoreBackupShowing = false;
                GDriveBackupAndSyncRunRestore();
            }

        /* falls through */
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            Settings_DialoghandleKeyReturn();
            break;
        case KEY_LEFT:
            Settings_DialoghandleKeyLeft();
            break;
        case KEY_RIGHT:
            Settings_DialoghandleKeyRight();
            break;
        case KEY_UP:
            if (Settings_DialogPos > 0) {
                Settings_DialogUpDown(-1);

                Settings_ScrollConatiner('settings_scroll_container_scroll', Settings_DialogPos);
            }
            break;
        case KEY_DOWN:
            if (Settings_DialogPos < Settings_DialogValue.length - 1) {
                Settings_DialogUpDown(1);

                Settings_ScrollConatiner('settings_scroll_container_scroll', Settings_DialogPos);
            }
            break;
        default:
            break;
    }
}

function Settings_ScrollConatiner(div, pos) {
    if (!Settings_DialogScrollCenter) {
        return;
    }

    var center = Settings_DialogScrollCenter,
        doc = Main_getElementById(div),
        value = 0,
        offset = 0;

    if (pos > center) {
        value = Main_getElementById(Settings_DialogValue[pos - center - offset] + '_div').offsetTop;
    }

    doc.style.transform = 'translateY(-' + value / BodyfontSize + 'em)';
}

function Settings_DialogUpDown(offset) {
    Settings_RemoveInputFocusKey(Settings_DialogValue[Settings_DialogPos]);
    Settings_DialogPos += offset;
    Settings_DialogUpDownAfter();
}

function Settings_DialogUpDownAfter() {
    var key = Settings_DialogValue[Settings_DialogPos];
    Main_AddClass(key, 'settings_value_focus');
    Main_AddClass(key + '_div', 'settings_div_focus');
    Settings_SetarrowsKey(key);
}

function Settings_DialogRightLeft(offset) {
    var key = Settings_DialogValue[Settings_DialogPos];
    Settings_DialogRightLeftAfter(key, offset);
}

function Settings_DialogRightLeftAfter(key, offset, skipDefault) {
    Settings_value[key].defaultValue += offset;

    Main_setItem(key, Settings_Obj_default(key) + 1);
    Main_textContent(key, Settings_Obj_values(key));

    if (!skipDefault) {
        Settings_SetarrowsKey(key);
        Settings_SetDefault(key);
    }
}

var Settings_DialogRestoreBackupShowing = false;
function Settings_DialogShowRestoreBackup(click) {
    Settings_DialogRestoreBackupShowing = true;

    var yes_no = [STR_NO, STR_YES];
    Settings_value.sync_history.values = yes_no;
    Settings_value.sync_settings.values = yes_no;
    Settings_value.sync_users.values = yes_no;

    var obj = {
        sync_users: {
            defaultValue: Settings_value.sync_users.defaultValue,
            values: Settings_value.sync_users.values,
            title: STR_BACKUP_SYNC_USER,
            summary: null
        },
        sync_history: {
            defaultValue: Settings_value.sync_history.defaultValue,
            values: Settings_value.sync_history.values,
            title: STR_BACKUP_SYNC_HISTORY,
            summary: null
        },
        sync_settings: {
            defaultValue: Settings_value.sync_settings.defaultValue,
            values: Settings_value.sync_settings.values,
            title: STR_BACKUP_SYNC_SETTINGS,
            summary: null
        }
    };

    Settings_DialogShow(obj, STR_BACKUP_SYNC_RESTORE + STR_BR + STR_BR + STR_BACKUP_SYNC_RESTORE_SUMMARY + STR_BR + STR_BR, click);
    Main_textContent('dialog_setting_close_text', '');
}
