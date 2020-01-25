//Variable initialization
var Settings_cursorY = 0;
var Settings_value = {
    "restor_playback": { //restor_playback
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "clip_auto_play_next": { //clip_auto_play_next
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "pp_workaround": { //pp_workaround
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "keep_panel_info_visible": { //clip_auto_play_next
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "single_click_exit": { //single_click_exit
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "app_animations": { //app_animations
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "show_screen_counter": { //show_screen_counter
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "live_feed_sort": { //show_screen_counter
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
    "live_notification": { //buffer_live
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "global_font_offset": { //live notification
        "values": [-3, -2, -1, 0, 1, 2, 3],
        "defaultValue": 4
    },
    "live_notification_time": { //live notification
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "defaultValue": 4
    },
    "buffer_live": { //buffer_live
        "values": [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 5
    },
    "buffer_vod": { //buffer_vod
        "values": [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 8
    },
    "buffer_clip": { //buffer_clip
        "values": [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 5
    },
    "end_dialog_counter": { //end_dialog_counter
        "values": ['disable', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 4
    },
    "bitrate_main": { //bitrate_main
        "values": ['disable', 11, 10.5, 10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1],
        "defaultValue": 1
    },
    "bitrate_min": { //bitrate_min
        "values": ['disable', 11, 10.5, 10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1],
        "defaultValue": 18
    },
    "videos_animation": { //videos_animation
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "thumb_quality": { //thumbnail quality
        "values": ["very-low", "low", "normal", "high", "very-high"],
        "defaultValue": 3
    },
    "default_quality": { //default player quality Auto or source
        "values": ["Auto", "source"],
        "defaultValue": 1
    },
    "clock_offset": { //clock_offset
        "values": Settings_GenerateClock(),
        "defaultValue": 49
    },
    "content_lang": { //content_lang
        "values": ["All"],
        "set_values": [""],
        "defaultValue": 1
    },
    "blocked_codecs": { //blocked_codecs
        "values": ["None"],
        "set_values": [""],
        "defaultValue": 1
    },
    "dpad_position": { //dpad postion
        "values": ["Right-Bottom", "Right-Top", "Left-Top", "Left-Bottom"],
        "defaultValue": 1
    },
    "dpad_opacity": { //dpad opacity
        "values": [
            "0%", "5%", "10%", "15%", "20%", "25%", "30%", "35%", "40%", "45%", "50%",
            "55%", "60%", "65%", "70%", "75%", "80%", "85%", "90%", "95%", "100%"],
        "defaultValue": 12
    }
};

var Settings_FeedSort = [
    [null, 'viewers', 0],
    [null, 'viewers', 1],
    ['channel', 'name', 1],
    ['channel', 'name', 0],
    [null, 'game', 1],
    [null, 'game', 0],
    [null, 'created_at', 0],
    [null, 'created_at', 1]
];

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

var Settings_value_keys = [];
var Settings_positions_length = 0;
//Variable initialization end

function Settings_init() {
    document.body.addEventListener("keydown", Settings_handleKeyDown, false);
    ScreensObj_SetTopLable(STR_SETTINGS);
    Main_ShowElement('settings_holder');
    Main_IconLoad('label_side_panel', 'icon-arrow-left', STR_GOBACK);
    Main_HideElement('label_refresh');
    Settings_cursorY = 0;
    Settings_inputFocus(Settings_cursorY);
    Settings_DivOptionChangeLang('content_lang', STR_CONTENT_LANG, Languages_Selected);
}

function Settings_exit() {
    Settings_ScrollTableReset();
    document.body.removeEventListener("keydown", Settings_handleKeyDown);
    Main_IconLoad('label_side_panel', 'icon-arrow-right', STR_THUMB_OPTIONS_TOP);
    Main_ShowElement('label_refresh');
    Settings_RemoveinputFocus();
    Main_HideElement('settings_holder');
}

// The order in Settings_SetSettings is the display order
function Settings_SetSettings() {
    var div = '',
        key,
        array_no_yes = [STR_NO, STR_YES];

    // General settings title
    div += Settings_DivTitle('general', STR_SETTINGS_GENERAL);

    div += Settings_Content('content_lang', [STR_CONTENT_LANG_SUMMARY], STR_CONTENT_LANG, '');

    div += Settings_Content('live_feed_sort',
        [
            STR_VIWES_MOST,
            STR_VIWES_LOWEST,
            STR_NAME_A_Z,
            STR_NAME_Z_A,
            STR_GAME_A_Z,
            STR_GAME_Z_A,
            STR_CREATED_NEWEST,
            STR_CREATED_OLDEST
        ],
        STR_LIVE_FEED_SORT,
        STR_LIVE_FEED_SORT_SUMMARY
    );

    div += Settings_Content('thumb_quality',
        [STR_VERY_LOW, STR_LOW, STR_NORMAL, STR_HIGH, STR_VERY_HIGH],
        STR_THUMB_RESOLUTION, STR_THUMB_RESOLUTION_SUMMARY);

    div += Settings_Content('global_font_offset', null, STR_GLOBAL_FONT, STR_GLOBAL_FONT_SUMMARY);

    div += Settings_Content('restor_playback', array_no_yes, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMMARY);

    div += Settings_Content('videos_animation', array_no_yes, STR_VIDEOS_ANIMATION, null);

    div += Settings_Content('app_animations', array_no_yes, STR_APP_ANIMATIONS, null);

    div += Settings_Content('clip_auto_play_next', array_no_yes, STR_AUTO_PLAY_NEXT, null);

    div += Settings_Content('live_notification', array_no_yes, STR_NOW_LIVE_SHOW, null);

    div += Settings_Content('live_notification_time', null, STR_NOW_DURATION, null);

    div += Settings_Content('clock_offset', null, STR_CLOCK_OFFSET, null);

    div += Settings_Content('show_screen_counter', array_no_yes, STR_SCREEN_COUNTER, null);


    if (!Main_isTV || !Main_IsNotBrowser) {
        div += Settings_Content('dpad_position', null, STR_DPAD_POSTION, null);

        div += Settings_Content('dpad_opacity', null, STR_DPAD_OPACITY, null);
    }

    // Player settings title
    div += Settings_DivTitle('play', STR_SETTINGS_PLAYER);

    div += Settings_Content('keep_panel_info_visible', array_no_yes, STR_KEEP_INFO_VISIBLE, null);

    div += Settings_Content('single_click_exit', array_no_yes, STR_SINGLE_EXIT, STR_SINGLE_EXIT_SUMMARY);

    div += Settings_Content('end_dialog_counter', null, STR_END_DIALOG_SETTINGS, STR_END_DIALOG_SETTINGS_SUMMARY);
    Settings_value.end_dialog_counter.values[0] = STR_END_DIALOG_DISABLE;

    div += Settings_Content('default_quality', [STR_AUTO, STR_SOURCE], STR_DEF_QUALITY, STR_DEF_QUALITY_SUMMARY);

    div += Settings_Content('blocked_codecs', [STR_CONTENT_LANG_SUMMARY], STR_BLOCKED_CODEC, STR_BLOCKED_CODEC_SUMMARY);

    div += Settings_Content('pp_workaround', [STR_DISABLE, STR_ENABLE], STR_PP_WORKAROUND, STR_PP_WORKAROUND_SUMMARY);

    // Player buffer title/summary
    div += '<div id="setting_title_bandwidth" class="settings_title">' + STR_PLAYER_BITRATE + '</div>' +
        '<div id="setting_title_bandwidth_summary" class="settings_summary">' + STR_PLAYER_BITRATE_SUMMARY + '</div>';

    // Player buffer live
    key = "bitrate_main";
    Settings_value_keys.push(key);

    for (var i = 1; i < Settings_value[key].values.length; i++) {
        Settings_value[key].values[i] = Settings_value[key].values[i] + " Mbps";
    }
    Settings_value[key].values[0] = STR_PLAYER_BITRATE_UNLIMITED;

    div += Settings_DivOptionNoSummary(key, STR_PLAYER_BITRATE_MAIN);

    div += Settings_Content('bitrate_min',
        Settings_value.bitrate_main.values, STR_PLAYER_BITRATE_SMALL, STR_PLAYER_BITRATE_SMALL_SUMMARY);
    Settings_value.bitrate_min.values[0] = STR_PLAYER_BITRATE_UNLIMITED;
    Settings_SetBitRate(0);

    // Player buffer title/summary
    div += '<div id="setting_title_buffers" class="settings_title">' + STR_SETTINGS_BUFFER_SIZE + '</div>' +
        '<div id="setting_title_buffers_summary" class="settings_summary">' + STR_SETTINGS_BUFFER_SIZE_SUMMARY + '</div>';


    div += Settings_Content('buffer_live', null, STR_SETTINGS_BUFFER_LIVE, null);

    div += Settings_Content('buffer_vod', null, STR_SETTINGS_BUFFER_VOD, null);

    div += Settings_Content('buffer_clip', null, STR_SETTINGS_BUFFER_CLIP, null);

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

function Settings_DivOptionWithSummary(key, string_title, string_summary) {
    return '<div id="' + key + '_div" class="settings_div"><div id="' + key + '_name" class="settings_name">' +
        string_title + '<div id="' + key + '_summary" class="settings_summary" style="font-size: 65%;">' + string_summary + '</div></div>' +
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
    Main_textContent('setting_title_general', STR_SETTINGS_GENERAL);

    Main_textContent('clock_offset_name', STR_CLOCK_OFFSET);

    Main_textContent('show_screen_counter_name', STR_SCREEN_COUNTER);

    Main_textContent('dpad_position_name', STR_DPAD_POSTION);

    Main_textContent('dpad_opacity_name', STR_DPAD_OPACITY);

    // Content Language selection
    key = "content_lang";
    Main_textContent(key + '_name', STR_CONTENT_LANG);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_value[key].values = [STR_CONTENT_LANG_SUMMARY];

    key = "live_feed_sort";
    Settings_DivOptionChangeLang(key, STR_LIVE_FEED_SORT, STR_LIVE_FEED_SORT_SUMMARY);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_value[key].values = [
        STR_VIWES_MOST,
        STR_VIWES_LOWEST,
        STR_NAME_A_Z,
        STR_NAME_Z_A,
        STR_GAME_A_Z,
        STR_GAME_Z_A,
        STR_CREATED_NEWEST,
        STR_CREATED_OLDEST
    ];

    //Player settings
    Main_textContent('setting_title_play', STR_SETTINGS_PLAYER);

    // Player buffer title/summary
    Main_textContent('setting_title_bandwidth', STR_PLAYER_BITRATE);
    Main_textContent('setting_title_bandwidth_summary', STR_PLAYER_BITRATE_SUMMARY);

    key = "bitrate_main";
    Main_textContent(key + '_name', STR_PLAYER_BITRATE_MAIN);
    Settings_value[key].values[0] = STR_DISABLE;

    key = "bitrate_min";
    Settings_DivOptionChangeLang(key, STR_PLAYER_BITRATE_SMALL, STR_PLAYER_BITRATE_SMALL_SUMMARY);
    Settings_value[key].values[0] = STR_DISABLE;

    // Player buffer title/summary
    Main_textContent('setting_title_buffers', STR_SETTINGS_BUFFER_SIZE);
    Main_textContent('setting_title_buffers_summary', STR_SETTINGS_BUFFER_SIZE_SUMMARY);

    Main_textContent('buffer_live_name', STR_SETTINGS_BUFFER_LIVE);
    Main_textContent('buffer_vod_name', STR_SETTINGS_BUFFER_VOD);
    Main_textContent('buffer_clip_name', STR_SETTINGS_BUFFER_CLIP);

    //Player restore
    key = "restor_playback";
    Settings_DivOptionChangeLang(key, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMMARY);
    Settings_value[key].values = [STR_YES, STR_NO];

    //Thumb quality
    key = "thumb_quality";
    Settings_DivOptionChangeLang(key, STR_THUMB_RESOLUTION, STR_THUMB_RESOLUTION_SUMMARY);
    Settings_value[key].values = [STR_VERY_LOW, STR_LOW, STR_NORMAL, STR_HIGH, STR_VERY_HIGH];

    Settings_DivOptionChangeLang('global_font_offset', STR_GLOBAL_FONT, STR_GLOBAL_FONT_SUMMARY);

    //Player restore
    key = "default_quality";
    Settings_DivOptionChangeLang(key, STR_DEF_QUALITY, STR_DEF_QUALITY_SUMMARY);
    Settings_value[key].values = [STR_AUTO, STR_SOURCE];

    // Chat size
    key = "end_dialog_counter";
    Settings_DivOptionChangeLang(key, STR_END_DIALOG_SETTINGS, STR_END_DIALOG_SETTINGS_SUMMARY);
    Settings_value[key].values[0] = STR_END_DIALOG_DISABLE;

    // Videos
    key = "videos_animation";
    Main_textContent(key + '_name', STR_VIDEOS_ANIMATION);
    Settings_value[key].values = [STR_YES, STR_NO];

    key = "pp_workaround";
    Settings_DivOptionChangeLang(key, STR_PP_WORKAROUND, STR_PP_WORKAROUND_SUMMARY);
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

    key = "clip_auto_play_next";
    Main_textContent(key + '_name', STR_AUTO_PLAY_NEXT);
    Settings_value[key].values = [STR_NO, STR_YES];

    key = "live_notification";
    Main_textContent(key + '_name', STR_NOW_LIVE_SHOW);
    Settings_value[key].values = [STR_NO, STR_YES];

    Main_textContent('live_notification_time_name', STR_NOW_DURATION);

    key = "keep_panel_info_visible";
    Main_textContent(key + '_name', STR_KEEP_INFO_VISIBLE);
    Settings_value[key].values = [STR_NO, STR_YES];

    key = "single_click_exit";
    Settings_DivOptionChangeLang(key, STR_SINGLE_EXIT, STR_SINGLE_EXIT_SUMMARY);
    Settings_value[key].values = [STR_NO, STR_YES];

    key = "app_animations";
    Main_textContent(key + '_name', STR_APP_ANIMATIONS);
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
    Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
    PlayClip_All_Forced = Settings_Obj_default("clip_auto_play_next");
    UserLiveFeed_Notify = Settings_Obj_default("live_notification");
    UserLiveFeed_NotifyTimeout = Settings_Obj_values("live_notification_time") * 1000;
    Play_Status_Always_On = Settings_Obj_default("keep_panel_info_visible");
    Play_SingleClickExit = Settings_Obj_default("single_click_exit");
    Play_EndSettingsCounter = Settings_Obj_default("end_dialog_counter");
    Settings_ShowCounter(Settings_Obj_default("show_screen_counter"));
    Settings_DisableCodecsNames = Main_getItemJson('Settings_DisableCodecsNames', []);
    Settings_CodecsSet();
}

function Settings_Obj_values(key) {
    return Settings_value[key].values[Settings_Obj_default(key)];
}

//function Settings_Obj_set_values(key) {
//    return Settings_value[key].set_values[Settings_Obj_default(key)];
//}

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
    document.getElementById(key + "arrow_left").style.opacity = "0";
    document.getElementById(key + "arrow_right").style.opacity = "0";
    Main_RemoveClass(key, 'settings_value_focus');
    Main_RemoveClass(key + '_div', 'settings_div_focus');
}

function Settings_ChangeSettigs(position) {
    var key = Settings_value_keys[position];
    Main_setItem(key, Settings_Obj_default(key) + 1);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_Setarrows(position);
    Settings_SetDefault(position);
}

function Settings_Setarrows(position) {
    Settings_SetarrowsKey(Settings_value_keys[position]);
}

function Settings_SetarrowsKey(key) {
    if (!Settings_Obj_length(key)) return;

    var currentValue = Settings_Obj_default(key);
    var maxValue = Settings_Obj_length(key);

    if (currentValue > 0 && currentValue < maxValue) {
        document.getElementById(key + "arrow_left").style.opacity = "1";
        document.getElementById(key + "arrow_right").style.opacity = "1";
    } else if (currentValue === maxValue) {
        document.getElementById(key + "arrow_left").style.opacity = "1";
        document.getElementById(key + "arrow_right").style.opacity = "0.2";
    } else {
        document.getElementById(key + "arrow_left").style.opacity = "0.2";
        document.getElementById(key + "arrow_right").style.opacity = "1";
    }
}

function Settings_SetDefault(position) {
    position = Settings_value_keys[position];

    if (position === "videos_animation") Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
    else if (position === "clip_auto_play_next") PlayClip_All_Forced = Settings_Obj_default("clip_auto_play_next");
    else if (position === "live_notification") UserLiveFeed_Notify = Settings_Obj_default("live_notification");
    else if (position === "live_notification_time") UserLiveFeed_NotifyTimeout = Settings_Obj_values("live_notification_time") * 1000;
    else if (position === "keep_panel_info_visible") Play_Status_Always_On = Settings_Obj_default("keep_panel_info_visible");
    else if (position === "single_click_exit") Play_SingleClickExit = Settings_Obj_default("single_click_exit");
    else if (position === "app_animations") Settings_SetAnimations();
    else if (position === "buffer_live") Settings_SetBuffers(1);
    else if (position === "buffer_vod") Settings_SetBuffers(2);
    else if (position === "buffer_clip") Settings_SetBuffers(3);
    else if (position === "end_dialog_counter") Play_EndSettingsCounter = Settings_Obj_default("end_dialog_counter");
    else if (position === "default_quality") Play_SetQuality();
    else if (position === "thumb_quality") Main_SetThumb();
    else if (position === "global_font_offset") calculateFontSize();
    else if (position === "show_screen_counter") Settings_ShowCounter(Settings_Obj_default("show_screen_counter"));
    else if (position === "clock_offset") {
        Settings_SetClock();
        Main_updateclock();
    } else if (position === "bitrate_main") Settings_SetBitRate(1);
    else if (position === "bitrate_min") Settings_SetBitRate(2);
    else if (position === "dpad_opacity") Settings_DpadOpacity();
    else if (position === "dpad_position") Settings_DpadPOsition();
    else if (position === "pp_workaround") Settings_PP_Workaround();
}

function Settings_PP_Workaround() {
    //TODO remove the try after some itme of the app be released
    try {
        Android.msetPlayer(!Settings_Obj_default("pp_workaround"), Play_isFullScreen);
    } catch (e) {}
}

function Settings_DpadOpacity() {
    Main_clearHideButtons();
    Main_setHideButtons();
    Main_scenekeysDoc.style.opacity = Settings_Obj_default("dpad_opacity") * 0.05;
}

var Settings_DpadPOsitions = [
    [6, 0],
    [6, 44],
    [63, 44],
    [63, 0]
];

function Settings_DpadPOsition() {
    Settings_DpadOpacity();
    Main_clearHideButtons();
    Main_setHideButtons();
    Main_scenekeysPositionDoc.style.right = Settings_DpadPOsitions[Settings_Obj_default("dpad_position")][0] + "%";
    Main_scenekeysPositionDoc.style.bottom = Settings_DpadPOsitions[Settings_Obj_default("dpad_position")][1] + "%";
}

function Settings_SetAnimations() {
    var i, array,
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
            'user_feed_notify',
            'user_feed_scroll_ani',
            'side_panel_fix',
            'side_panel_movel',
            'side_panel',
            'user_feed'
        ],
        animate = Settings_Obj_default("app_animations"),
        mtransition = animate ? '' : 'none';

    classes.forEach(
        function(classe) {
            array = document.getElementsByClassName(classe);
            for (i = 0; i < array.length; i++)
                array[i].style.transition = mtransition;
        }
    );

    UserLiveFeed_FeedRemoveFocus();

    array = document.getElementsByClassName(Main_classThumb);

    try {
        //Array.prototype maybe not supported by all browsers
        Array.prototype.forEach.call(array,
            function(el) {
                el.classList.remove(Main_classThumb);
            }
        );
    } catch (e) {}

    Main_classThumb = animate ? 'stream_thumbnail_focused' : 'stream_thumbnail_focused_no_ani';
    UserLiveFeed_FocusClass = animate ? 'feed_thumbnail_focused' : 'feed_thumbnail_focused_no_ani';
    Screens_SettingDoAnimations = animate;
}

function Settings_ShowCounter(show) {
    if (show) Main_ShowElement('dialog_counter_text');
    else Main_HideElement('dialog_counter_text');
}

function Settings_SetBitRate(whocall) {
    if (Main_IsNotBrowser) {
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

    Android.SetMainPlayerBandwidth(value);
}

function Settings_SetBitRateMin() {
    var value;

    if (Settings_Obj_default("bitrate_min") > 0)
        value = parseInt(Settings_Obj_values("bitrate_min").split(" ")[0] * 1000000);
    else value = 0;

    Android.SetSmallPlayerBandwidth(value);
}

function Settings_SetBuffers(whocall) {
    if (!whocall) {
        Play_Buffer = Settings_Obj_values("buffer_live") * 1000;
        PlayVod_Buffer = Settings_Obj_values("buffer_vod") * 1000;
        PlayClip_Buffer = Settings_Obj_values("buffer_clip") * 1000;
        if (Main_IsNotBrowser) {
            Android.SetBuffer(1, Play_Buffer);
            Android.SetBuffer(2, PlayVod_Buffer);
            Android.SetBuffer(3, PlayClip_Buffer);
        }
    } else if (whocall === 1) {
        Play_Buffer = Settings_Obj_values("buffer_live") * 1000;
        if (Main_IsNotBrowser) Android.SetBuffer(1, Play_Buffer);
    } else if (whocall === 2) {
        PlayVod_Buffer = Settings_Obj_values("buffer_vod") * 1000;
        if (Main_IsNotBrowser) Android.SetBuffer(2, PlayVod_Buffer);
    } else if (whocall === 3) {
        PlayClip_Buffer = Settings_Obj_values("buffer_clip") * 1000;
        if (Main_IsNotBrowser) Android.SetBuffer(3, PlayClip_Buffer);
    }
}

//function Settings_CheckLang(lang) {
//    if (lang.indexOf('en_') !== -1) Settings_value.general_lang.defaultValue = 0;
//    else if (lang.indexOf('it_') !== -1) Settings_value.general_lang.defaultValue = 1;
//    else if (lang.indexOf('pt_') !== -1) Settings_value.general_lang.defaultValue = 2;
//}

//function Settings_SetLang(lang) {
//    if (lang.indexOf('en_') !== -1) en_USLang();
//else if (lang.indexOf('it_') !== -1) it_ITLang();
//else if (lang.indexOf('pt_') !== -1) pt_BRLang();
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
        offset = (!Main_isTV || !Main_IsNotBrowser) ? 2 : 0;

    if (Settings_CurY < Settings_cursorY && Settings_cursorY === (12 + offset)) {
        doc = document.getElementById('settings_scroll');
        doc.scrollTop = doc.scrollHeight;
        if (Settings_Obj_default("app_animations")) {
            var position = doc.scrollTop;
            doc.scrollTop = 0;
            scrollTo(doc, position, 450);
        }
    } else if (Settings_CurY > Settings_cursorY && Settings_cursorY === (11 + offset)) {
        doc = document.getElementById('settings_scroll');
        if (Settings_Obj_default("app_animations")) scrollTo(doc, 0, 450);
        else doc.scrollTop = 0;
    }

    Settings_CurY = Settings_cursorY;
}

function Settings_ScrollTableReset() {
    document.getElementById('settings_scroll').scrollTop = 0;
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
        case KEY_RETURN_Q:
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
            else if (Settings_value_keys[Settings_cursorY].indexOf('blocked_codecs') !== -1) Settings_CodecsShow();
            break;
        default:
            break;
    }
}

var Settings_CodecsValue;
var Settings_CodecsTotal;
var Settings_CodecsPos;
var Settings_CodecsNames = [];
var Settings_DisableCodecsNames = [];

function Settings_CodecsShow() {
    document.body.removeEventListener("keydown", Settings_handleKeyDown);

    if (!Settings_CodecsValue) {
        //TODO remove the try after some itme of the app be released
        try {
            Settings_CodecsValue = '';
            Settings_CodecsValue = Android.getcodecCapabilities('avc');
        } catch (e) {
            if (Main_IsNotBrowser) {
                document.body.addEventListener("keydown", Settings_handleKeyDownCodecs, false);
                return;
            }
        }

        if (!Main_IsNotBrowser) Settings_CodecsValue = "video/avc,OMX.Nvidia.h264.decode,3840x2176,120 Mbps,524288,5.2,32,160p : 960.00,360p : 960.00,480p : 960.00,720p : 555.56,1080p : 245.10,1440p : 138.89,4k : 61.73|video/avc,OMX.google.h264.decoder,4080x4080,48 Mbps,8,5.2,32,-1,160p : 960.00,360p : 960.00,480p : 960.00,720p : 546.13,1080p : 240.94,1440p : 136.53,4k : 60.68|video/avc,OMX.chico.h264.decoder,4080x4080,48 Mbps,8,5.2,-1,160p : 960.00,360p : 960.00,480p : 960.00,720p : 546.13,1080p : 240.94,1440p : 136.53,4k : 60.68";

        var dialogContent = '',
            codecs = Settings_CodecsValue.split('|'),
            codecsValue,
            i = 0,
            j,
            temptitlecontent,
            key,
            spacer = " | ";

        Settings_CodecsTotal = codecs.length;
        Settings_CodecsNames = [];

        dialogContent += STR_CODEC_DIALOG_TITLE + STR_BR +
            STR_DIV_TITLE + STR_SUPPORTED_CODEC + '</div>' + STR_BR;

        for (i; i < Settings_CodecsTotal; i++) {
            codecsValue = codecs[i].split(',');

            key = codecsValue[1];
            Settings_value[key] = {
                "values": [STR_ENABLE, STR_DISABLE],
                "defaultValue": Main_getItemInt(key, 0)
            };

            Settings_CodecsNames.push(key);

            temptitlecontent = "";
            temptitlecontent += STR_MAX_RES + codecsValue[2] + spacer;
            temptitlecontent += STR_MAX_BIT + codecsValue[3] + spacer;
            temptitlecontent += STR_MAX_LEVEL + codecsValue[5] + spacer;
            temptitlecontent += STR_MAX_INSTANCES + ((codecsValue[6] > -1) ? codecsValue[6] : STR_MAX_INSTANCES_NOT) + STR_BR;
            for (j = 7; j < codecsValue.length; j++) {
                temptitlecontent += (parseFloat(codecsValue[j].split(': ')[1]) > 0) ? codecsValue[j] + " fps" + spacer : "";
            }

            temptitlecontent = temptitlecontent.substring(0, temptitlecontent.length - 3);

            dialogContent += Settings_DivOptionWithSummary(key, codecsValue[1], temptitlecontent + STR_BR + STR_BR);
        }

        Main_innerHTML("dialog_codecs_text", dialogContent + STR_DIV_TITLE + STR_CLOSE_THIS + '</div>');

    }

    if (Settings_CodecsTotal > 0) {
        Settings_CodecsPos = 0;
        Main_AddClass(Settings_CodecsNames[Settings_CodecsPos], 'settings_value_focus');
        Main_AddClass(Settings_CodecsNames[Settings_CodecsPos] + '_div', 'settings_div_focus');
        Settings_SetarrowsKey(Settings_CodecsNames[Settings_CodecsPos]);
    }

    Main_ShowElement('dialog_codecs');
    document.body.addEventListener("keydown", Settings_handleKeyDownCodecs, false);
}

function Settings_handleKeyDownCodecs(event) {
    var key;
    switch (event.keyCode) {
        case KEY_ENTER:
        case KEY_RETURN_Q:
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            Settings_RemoveinputFocusKey(Settings_CodecsNames[Settings_CodecsPos]);
            Main_HideElement('dialog_codecs');
            document.body.removeEventListener("keydown", Settings_handleKeyDownCodecs);
            document.body.addEventListener("keydown", Settings_handleKeyDown, false);
            break;
        case KEY_LEFT:
            key = Settings_CodecsNames[Settings_CodecsPos];
            if (Settings_Obj_default(key) > 0) Settings_CodecsRigthLeft(-1);
            break;
        case KEY_RIGHT:
            key = Settings_CodecsNames[Settings_CodecsPos];
            if (Settings_Obj_default(key) < Settings_Obj_length(key)) Settings_CodecsRigthLeft(1);
            break;
        case KEY_UP:
            if (Settings_CodecsPos > 0) Settings_CodecsUpDown(-1);
            break;
        case KEY_DOWN:
            if (Settings_CodecsPos < (Settings_CodecsTotal - 1)) Settings_CodecsUpDown(1);
            break;
        default:
            break;
    }
}

function Settings_CodecsUpDown(offset) {
    Settings_RemoveinputFocusKey(Settings_CodecsNames[Settings_CodecsPos]);
    Settings_CodecsPos += offset;

    var key = Settings_CodecsNames[Settings_CodecsPos];
    Main_AddClass(key, 'settings_value_focus');
    Main_AddClass(key + '_div', 'settings_div_focus');
    Settings_SetarrowsKey(key);
}

function Settings_CodecsRigthLeft(offset) {

    if (Settings_CodecsTotal < 2) {
        Main_showWarningDialog(STR_ONE_CODEC_ENA);
        window.setTimeout(Main_HideWarningDialog, 2000);
        return;
    }

    var key = Settings_CodecsNames[Settings_CodecsPos],
        index;

    Settings_value[key].defaultValue += offset;

    Main_setItem(key, Settings_Obj_default(key));
    Main_textContent(key, Settings_Obj_values(key));
    Settings_SetarrowsKey(key);

    if (Settings_value[key].defaultValue) {
        Settings_DisableCodecsNames.push(Settings_CodecsNames[Settings_CodecsPos]);

        //Make sure at least one is enable
        var oneEnable = false,
            i = 0;

        for (i; i < Settings_CodecsTotal; i++) {
            if (!Settings_value[Settings_CodecsNames[i]].defaultValue) {
                oneEnable = true;
                break;
            }
        }
        if (!oneEnable) {
            Main_showWarningDialog(STR_ONE_CODEC_ENA);
            window.setTimeout(Main_HideWarningDialog, 2000);
            for (i = 0; i < Settings_CodecsTotal; i++) {
                if (Settings_CodecsPos !== i) {
                    key = Settings_CodecsNames[i];
                    Settings_value[key].defaultValue += -1;
                    Main_setItem(key, Settings_Obj_default(key));
                    Main_textContent(key, Settings_Obj_values(key));
                    index = Settings_DisableCodecsNames.indexOf(Settings_CodecsNames[i]);
                    if (index > -1) Settings_DisableCodecsNames.splice(index, 1);

                    break;
                }
            }
        }
    } else {
        index = Settings_DisableCodecsNames.indexOf(Settings_CodecsNames[Settings_CodecsPos]);
        if (index > -1) Settings_DisableCodecsNames.splice(index, 1);
    }

    Main_setItem('Settings_DisableCodecsNames', JSON.stringify(Settings_DisableCodecsNames));
    Settings_CodecsSet();
}

function Settings_CodecsSet() {
    //TODO remove the try after some itme of the app be released
    try {
        Android.setBlackListMediaCodec(Settings_DisableCodecsNames.join());
    } catch (e) {}
}
