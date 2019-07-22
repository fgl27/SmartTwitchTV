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
    "buffer_live": { //buffer_live
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 4
    },
    "buffer_vod": { //buffer_vod
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 4
    },
    "buffer_clip": { //buffer_clip
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 3
    },
    "end_dialog_counter": { //end_dialog_counter
        "values": ['disable', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 4
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

var Settings_value_keys = [];
var Settings_positions_length = 0;
//Variable initialization end

function Settings_init() {
    Main_UnSetTopOpacity();
    Main_HideElement('label_side_panel');
    Main_IconLoad('label_refresh', 'icon-arrow-circle-left', STR_GOBACK_START);
    document.body.addEventListener("keydown", Settings_handleKeyDown, false);
    Main_textContent('top_bar_user', STR_SETTINGS);
    document.getElementById("top_lables").style.marginLeft = '14%';
    document.getElementById('top_bar_live').style.display = 'none';
    document.getElementById('top_bar_featured').style.display = 'none';
    document.getElementById('top_bar_game').style.display = 'none';
    document.getElementById('top_bar_vod').style.display = 'none';
    document.getElementById('top_bar_clip').style.display = 'none';
    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_ShowElement('settings_scroll');
    Settings_cursorY = 0;
    Settings_inputFocus(Settings_cursorY);
    Settings_DivOptionChangeLang('content_lang', STR_CONTENT_LANG, Languages_Selected);
}

function Settings_exit() {
    document.body.removeEventListener("keydown", Settings_handleKeyDown);
    Main_ShowElement('label_side_panel');
    Settings_RemoveinputFocus();
    Main_textContent('top_bar_user', STR_USER);
    document.getElementById("top_lables").style.marginLeft = '18.5%';
    document.getElementById('top_bar_live').style.display = 'inline-block';
    document.getElementById('top_bar_featured').style.display = 'inline-block';
    document.getElementById('top_bar_game').style.display = 'inline-block';
    document.getElementById('top_bar_vod').style.display = 'inline-block';
    document.getElementById('top_bar_clip').style.display = 'inline-block';
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    Main_HideElement('settings_scroll');
}

// The order in Settings_SetSettings is the display order
function Settings_SetSettings() {
    var div = '',
        key;

    // General settings title
    div += Settings_DivTitle('general', STR_SETTINGS_GENERAL);

    // Content Language selection
    key = "content_lang";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_CONTENT_LANG_SUMARRY];

    div += Settings_DivOptionWithSummary(key, STR_CONTENT_LANG, '');

    //thumb qualityes
    key = "thumb_quality";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_VERY_LOW, STR_LOW, STR_NORMAL, STR_HIGH, STR_VERY_HIGH];

    div += Settings_DivOptionWithSummary(key, STR_THUMB_RESOLUTION, STR_THUMB_RESOLUTION_SUMARRY);

    //Player restore playback
    key = "restor_playback";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionWithSummary(key, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMARRY);

    // Videos
    key = "videos_animation";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionNoSummary(key, STR_VIDEOS_ANIMATION);

    key = "clip_auto_play_next";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionNoSummary(key, STR_AUTO_PLAY_NEXT);

    // Clock offset
    key = "clock_offset";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_CLOCK_OFFSET);

    // Player settings title
    div += Settings_DivTitle('play', STR_SETTINGS_PLAYER);

    //Player restore playback
    key = "default_quality";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_AUTO, STR_SOURCE];

    div += Settings_DivOptionWithSummary(key, STR_DEF_QUALITY, STR_DEF_QUALITY_SUMARRY);

    // Chat size
    key = "end_dialog_counter";
    Settings_value_keys.push(key);
    Settings_value[key].values[0] = STR_END_DIALOG_DISABLE;

    div += Settings_DivOptionWithSummary(key, STR_END_DIALOG_SETTINGS, STR_END_DIALOG_SETTINGS_SUMMARY);

    // Player buffer title/summary
    div += '<div id="setting_title_buffers" class="settings_title">' + STR_SETTINGS_BUFFER_SIZE + '</div>' +
        '<div id="setting_title_buffers_summary" class="settings_summary">' + STR_SETTINGS_BUFFER_SIZE_SUMMARY + '</div>';

    // Player buffer live
    key = "buffer_live";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_SETTINGS_BUFFER_LIVE);

    // Player buffer vod
    key = "buffer_vod";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_SETTINGS_BUFFER_VOD);

    // Player buffer clip
    key = "buffer_clip";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_SETTINGS_BUFFER_CLIP);

    Main_innerHTML("settings_main", div);
    Settings_positions_length = Settings_value_keys.length;
    Languages_SetSettings();
}

function Settings_DivTitle(key, string) {
    return '<div id="setting_title_' + key + '" class="settings_section">' + string + '</div>';
}

function Settings_DivOptionNoSummary(key, string) {
    return '<div id="' + key + '_div" class="settings_div"><div id="' +
        key + '_name" class="settings_name">' + string + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedextramini settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';
}

function Settings_DivOptionWithSummary(key, string_title, string_summary) {
    return '<div id="' + key + '_div" class="settings_div"><div id="' + key + '_name" class="settings_name">' +
        string_title + '<div id="' + key + '_summary" class="settings_summary" style="font-size: 65%;">' + string_summary + '</div></div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedextramini settings_value">' + Settings_Obj_values(key) + '</div>' +
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

    // Clock offset
    key = "clock_offset";
    Main_textContent(key + '_name', STR_CLOCK_OFFSET);

    // Content Language selection
    key = "content_lang";
    Main_textContent(key + '_name', STR_CONTENT_LANG);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_value[key].values = [STR_CONTENT_LANG_SUMARRY];

    //Player settings
    Main_textContent('setting_title_play', STR_SETTINGS_PLAYER);

    // Player buffer title/summary
    Main_textContent('setting_title_buffers', STR_SETTINGS_BUFFER_SIZE);
    Main_textContent('setting_title_buffers_summary', STR_SETTINGS_BUFFER_SIZE_SUMMARY);

    key = "buffer_live";
    Main_textContent(key + '_name', STR_SETTINGS_BUFFER_LIVE);
    key = "buffer_vod";
    Main_textContent(key + '_name', STR_SETTINGS_BUFFER_VOD);
    key = "buffer_clip";
    Main_textContent(key + '_name', STR_SETTINGS_BUFFER_CLIP);

    //Player restore
    key = "restor_playback";
    Settings_DivOptionChangeLang(key, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMARRY);
    Settings_value[key].values = [STR_YES, STR_NO];

    //Thumb quality
    key = "thumb_quality";
    Settings_DivOptionChangeLang(key, STR_THUMB_RESOLUTION, STR_THUMB_RESOLUTION_SUMARRY);
    Settings_value[key].values = [STR_VERY_LOW, STR_LOW, STR_NORMAL, STR_HIGH, STR_VERY_HIGH];

    //Player restore
    key = "default_quality";
    Settings_DivOptionChangeLang(key, STR_DEF_QUALITY, STR_DEF_QUALITY_SUMARRY);
    Settings_value[key].values = [STR_AUTO, STR_SOURCE];

    // Chat size
    key = "end_dialog_counter";
    Settings_DivOptionChangeLang(key, STR_END_DIALOG_SETTINGS, STR_END_DIALOG_SETTINGS_SUMMARY);
    Settings_value[key].values[0] = STR_END_DIALOG_DISABLE;

    // Videos
    key = "videos_animation";
    Main_textContent(key + '_name', STR_VIDEOS_ANIMATION);
    Settings_value[key].values = [STR_YES, STR_NO];

    key = "clip_auto_play_next";
    Main_textContent(key + '_name', STR_AUTO_PLAY_NEXT);
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
    Main_SetThumb();
    Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
    PlayClip_All_Forced = Settings_Obj_default("clip_auto_play_next");
    Play_EndSettingsCounter = Settings_Obj_default("end_dialog_counter");
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
    var key = Settings_value_keys[Settings_cursorY];
    Main_AddClass(key, 'settings_value_focus');
    Main_AddClass(key + '_div', 'settings_div_focus');
    Settings_Setarrows(position);
    Settings_ScrollTable();
}

function Settings_RemoveinputFocus() {
    var key = Settings_value_keys[Settings_cursorY];
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
    var key = Settings_value_keys[position];

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
    else if (position === "buffer_live") Settings_SetBuffers(1);
    else if (position === "buffer_vod") Settings_SetBuffers(2);
    else if (position === "buffer_clip") Settings_SetBuffers(3);
    else if (position === "end_dialog_counter") Play_EndSettingsCounter = Settings_Obj_default("end_dialog_counter");
    else if (position === "default_quality") Play_SetQuality();
    else if (position === "thumb_quality") Main_SetThumb();
    else if (position === "clock_offset") {
        Settings_SetClock();
        Main_updateclock();
    }
}

function Settings_SetBuffers(whocall) {
    //TODO remove the try after android app update has be releaased for some time
    try {
        if (!whocall) {
            Play_Buffer = Settings_Obj_values("buffer_live") * 1000;
            PlayVod_Buffer = Settings_Obj_values("buffer_vod") * 1000;
            PlayClip_Buffer = Settings_Obj_values("buffer_clip") * 1000;
            if (Main_Android) {
                Android.SetBuffer(1, Play_Buffer);
                Android.SetBuffer(2, PlayVod_Buffer);
                Android.SetBuffer(3, PlayClip_Buffer);
            }
        } else if (whocall === 1) {
            Play_Buffer = Settings_Obj_values("buffer_live") * 1000;
            if (Main_Android) Android.SetBuffer(1, Play_Buffer);
        } else if (whocall === 2) {
            PlayVod_Buffer = Settings_Obj_values("buffer_vod") * 1000;
            if (Main_Android) Android.SetBuffer(2, PlayVod_Buffer);
        } else if (whocall === 3) {
            PlayClip_Buffer = Settings_Obj_values("buffer_clip") * 1000;
            if (Main_Android) Android.SetBuffer(3, PlayClip_Buffer);
        }
    } catch (e) {}
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

function Settings_ScrollTable() { // jshint ignore:line
    var position = screen.height;

    if (Settings_cursorY > 5) {
        position = position * 0.11;
        position += document.getElementById(Settings_value_keys[1]).offsetTop * -1;
        document.getElementById('settings_scroll').style.top = position + "px";
    } else position = position * 0.077;

    document.getElementById('settings_scroll').style.top = position + "px";
}

function Settings_handleKeyDown(event) {
    var key;
    switch (event.keyCode) {
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
            break;
        default:
            break;
    }
}