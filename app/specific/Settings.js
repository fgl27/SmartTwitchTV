//Variable initialization
var Settings_cursorY = 0;
var Settings_value = {
    "general_lang": { //general_lang
        "values": ["en_US", "pt_BR"],
        "defaultValue": 1
    },
    "restor_playback": { //restor_playback
        "values": ["off", "on"],
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
        "defaultValue": 4
    },
    "chat_font_size": { //chat_font_size
        "values": ["85%", "100%", "130%", "160%"],
        "defaultValue": 2
    },
    "videos_animation": { //videos_animation
        "values": ["off", "on"],
        "defaultValue": 2
    }
};
var Settings_value_keys = [];
var Settings_positions_length = 0;
//Variable initialization end

function Settings_init() {
    document.body.addEventListener("keydown", Settings_handleKeyDown, false);
    Main_IconLoad('label_refresh', 'icon-arrow-circle-left', STR_GOBACK);
    Main_textContent('top_bar_user', STR_SETTINGS);
    document.getElementById("top_lables").style.marginLeft = '14%';
    document.getElementById('label_switch').style.display = 'none';
    document.getElementById('top_bar_live').style.display = 'none';
    document.getElementById('top_bar_featured').style.display = 'none';
    document.getElementById('top_bar_game').style.display = 'none';
    document.getElementById('top_bar_vod').style.display = 'none';
    document.getElementById('top_bar_clip').style.display = 'none';
    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_ShowElement('settings_scroll');
    Settings_cursorY = 0;
    Settings_inputFocus(Settings_cursorY);
}

function Settings_exit() {
    document.body.removeEventListener("keydown", Settings_handleKeyDown);
    Settings_RemoveinputFocus();
    Main_textContent('top_bar_user', STR_USER);
    document.getElementById("top_lables").style.marginLeft = '18.5%';
    document.getElementById('label_switch').style.display = 'inline-block';
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
    div += '<div id="setting_title_general" class="settings_section">' + STR_SETTINGS_GENERAL + '</div>';

    // Language selection
    key = "general_lang";
    Settings_value_keys.push(key);

    div += '<div id="' + key + '_div" class="settings_div"><div id="' + key + '_name" class="settings_name">' + STR_SETTINGS_LANG + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedextramini settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';

    //Player restore playback
    key = "restor_playback";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

    div += '<div id="' + key + '_div" class="settings_div"><div id="' + key + '_name" class="settings_name">' + STR_RESTORE_PLAYBACK + ':<div id="' + key + '_summary" class="settings_summary" style="font-size: 55%;">' + STR_RESTORE_PLAYBACK_SUMARRY + '</div></div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedextramini settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';

    // Videos
    key = "videos_animation";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

    div += '<div id="' + key + '_div" class="settings_div"><div id="' + key + '_name" class="settings_name">' + STR_VIDEOS_ANIMATION + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedextramini settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';

    // Player settings title
    div += '<div id="setting_title_play" class="settings_section">' + STR_SETTINGS_PLAYER + '</div>';

    // Player buffer title/summary
    div += '<div id="setting_title_buffers" class="settings_title">' + STR_SETTINGS_BUFFER_SIZE + '</div>' +
        '<div id="setting_title_buffers_summary" class="settings_summary">' + STR_SETTINGS_BUFFER_SIZE_SUMMARY + '</div>';

    // Player buffer live
    key = "buffer_live";
    Settings_value_keys.push(key);

    div += '<div id="' + key + '_div" class="settings_div"><div id="' + key + '_name" class="settings_name">' + STR_SETTINGS_BUFFER_LIVE + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedextramini settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';

    // Player buffer vod
    key = "buffer_vod";
    Settings_value_keys.push(key);

    div += '<div id="' + key + '_div" class="settings_div"><div id="' + key + '_name" class="settings_name">' + STR_SETTINGS_BUFFER_VOD + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedextramini settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';

    // Player buffer clip
    key = "buffer_clip";
    Settings_value_keys.push(key);

    div += '<div id="' + key + '_div" class="settings_div"><div id="' + key + '_name" class="settings_name">' + STR_SETTINGS_BUFFER_CLIP + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedextramini settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';

    // Player buffer title/summary
    div += '<div id="chat_font_size_title" class="settings_title">' + STR_CHAT_FONT + '</div>';

    // Player buffer live
    key = "chat_font_size";
    Settings_value_keys.push(key);

    div += '<div id="' + key + '_div" class="settings_div"><div id="' + key + '_name" class="settings_name">' + STR_CHAT_FONT_SUMARRY + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedextramini settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';

    Main_innerHTML("settings_main", div);
    Settings_positions_length = Settings_value_keys.length;
}

// The order in Settings_SetStrings doesnot matter
function Settings_SetStrings() {
    var key = '';

    //General settings
    Main_textContent('setting_title_general', STR_SETTINGS_GENERAL);

    // Language selection
    key = "general_lang";
    Main_textContent(key + '_name', STR_SETTINGS_LANG);

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
    Main_innerHTML(key + '_name', STR_RESTORE_PLAYBACK +
        '<div id="' + key + '_summary" class="settings_summary" style="font-size: 55%;">' + STR_RESTORE_PLAYBACK_SUMARRY + '</div>');
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

    //Player chat font size
    key = "chat_font_size";
    Main_textContent('chat_font_size_title', STR_CHAT_FONT);
    Main_textContent(key + '_name', STR_CHAT_FONT_SUMARRY);

    // Videos
    key = "videos_animation";
    Main_textContent(key + '_name', STR_VIDEOS_ANIMATION);
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

    for (key in Settings_value)
        if (Settings_value.hasOwnProperty(key))
            Main_textContent(key, Settings_Obj_values(key));
}

function Settings_SetDefautls() {
    for (var key in Settings_value) {
        Settings_value[key].defaultValue = parseInt(localStorage.getItem(key)) || Settings_value[key].defaultValue;
        Settings_value[key].defaultValue -= 1;
    }
    Play_SetBuffers();
    Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
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
    var key = Settings_value_keys[Settings_cursorY];
    Main_AddClass(key, 'settings_value_focus');
    Main_AddClass(key + '_div', 'settings_div_focus');
    Settings_Setarrows(position);
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
    localStorage.setItem(key, Settings_Obj_default(key) + 1);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_Setarrows(position);
    Settings_SetDefault(position);
}

function Settings_Setarrows(position) {
    var key = Settings_value_keys[position];

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

    if (position === "general_lang") {
        localStorage.setItem('user_language', 1);
        Settings_SetLang(Settings_Obj_values("general_lang"));
    } else if (position === "videos_animation") Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
    else if (position === "buffer_live") Play_Buffer = Settings_Obj_values("buffer_live");
    else if (position === "buffer_vod") PlayVod_Buffer = Settings_Obj_values("buffer_vod");
    else if (position === "buffer_clip") PlayClip_Buffer = Settings_Obj_values("buffer_clip");
    else if (position === "chat_font_size") Play_SetChatFont();
}

function Settings_CheckLang(lang) {
    if (lang.indexOf('en_') !== -1) Settings_value.general_lang.defaultValue = 0;
    else if (lang.indexOf('pt_') !== -1) Settings_value.general_lang.defaultValue = 1;
}

function Settings_SetLang(lang) {
    if (lang.indexOf('en_') !== -1) en_USLang();
    else if (lang.indexOf('pt_') !== -1) pt_BRLang();
    DefaultLang();
    Main_SetStrings(false);
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
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
        case KEY_CHANNELUP:
        case KEY_CHANNELDOWN:
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            break;
        case KEY_RED:
            Main_SidePannelStart(Settings_handleKeyDown);
            break;
        case KEY_GREEN:
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_BeforeSearch = Main_Go;
            Main_Go = Main_Search;
            Settings_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}