//Variable initialization
var Settings_cursorY = 0;
var Settings_value = {
    "positions": [{
        "name": "general_lang",
        "values": ["en_US", "pt_BR"],
        "defaultValue": 1
    }, {
        "name": "buffer_live",
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 4
    }, {
        "name": "buffer_vod",
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 4
    }, {
        "name": "buffer_clip",
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 4
    }, {
        "name": "restor_playback",
        "values": ["on", "off"],
        "defaultValue": 1
    }, {
        "name": "chat_font_size",
        "values": ["85%", "100%", "130%", "160%"],
        "defaultValue": 2
    }]
};

var Settings_positions_length = Settings_value.positions.length;
//Variable initialization end

function Settings_init() {
    Main_AddClass('top_bar_live', 'icon_center_focus');
    document.body.addEventListener("keydown", Settings_handleKeyDown, false);
    Main_IconLoad('label_refresh', 'icon-arrow-circle-left', STR_GOBACK);
    Main_IconLoad('label_about', 'icon-info-circle', STR_ABOUT_KEY);
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
    Main_IconLoad('label_about', 'icon-settings', STR_SETTINGS_KEY);
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

function Settings_SetStrings() {
    //General settings
    Main_textContent('setting_title_general', STR_SETTINGS_GENERAL);

    Main_textContent('setting_name_0', STR_SETTINGS_LANG);

    //Player settings
    Main_textContent('setting_title_play', STR_SETTINGS_PLAYER);

    Main_textContent('setting_tile_1', STR_SETTINGS_BUFFER_SIZE);
    Main_textContent('setting_summary_1', STR_SETTINGS_BUFFER_SIZE_SUMMARY);

    Main_textContent('setting_name_1', STR_SETTINGS_BUFFER_LIVE);
    Main_textContent('setting_name_2', STR_SETTINGS_BUFFER_VOD);
    Main_textContent('setting_name_3', STR_SETTINGS_BUFFER_CLIP);

    //Player restore
    Main_textContent('setting_tile_2', STR_RESTORE_PLAYBACK);
    Main_textContent('setting_name_4', STR_RESTORE_PLAYBACK_SUMARRY);
    Settings_value.positions[4].values = [STR_ENABLE, STR_DISABLE];

    //Player chat font size
    Main_textContent('setting_tile_3', STR_CHAT_FONT);
    Main_textContent('setting_name_5', STR_CHAT_FONT_SUMARRY);

    for (var i = 0; i < Settings_positions_length; i++) {
        Main_textContent('settings_value_' + i, Settings_Obj_values(i));
    }
}

function Settings_SetDefautls() {
    for (var i = 0; i < Settings_positions_length; i++) {
        Settings_value.positions[i].defaultValue = parseInt(localStorage.getItem('settings_value_deafult_' + i)) || Settings_value.positions[i].defaultValue;
        Settings_value.positions[i].defaultValue -= 1; // workaround to java 0 = false, save the value with a +1
    }
    Play_SetBuffers();
    Play_SetChatFont();
}

function Settings_Obj_values(position) {
    return Settings_value.positions[position].values[Settings_Obj_default(position)];
}

function Settings_Obj_default(position) {
    return Settings_value.positions[position].defaultValue;
}

function Settings_Obj_length(position) {
    return Settings_value.positions[position].values.length - 1;
}


function Settings_inputFocus(position) {
    Main_AddClass('settings_value_' + position, 'settings_value_focus');
    Settings_Setarrows(position);
}

function Settings_RemoveinputFocus() {
    document.getElementById("settings_arrow_left_" + Settings_cursorY).style.opacity = "0";
    document.getElementById("settings_arrow_right_" + Settings_cursorY).style.opacity = "0";
    Main_RemoveClass('settings_value_' + Settings_cursorY, 'settings_value_focus');
}

function Settings_ChangeSettigs(position) {
    localStorage.setItem('settings_value_deafult_' + position, Settings_Obj_default(position) + 1);
    Main_textContent('settings_value_' + position, Settings_Obj_values(position));
    Settings_Setarrows(position);
    Settings_SetDefault(position);
}

function Settings_Setarrows(position) {
    var currentValue = Settings_Obj_default(position);
    var maxValue = Settings_Obj_length(position);

    if (currentValue > 0 && currentValue < maxValue) {
        document.getElementById('settings_arrow_left_' + position).style.opacity = "1";
        document.getElementById('settings_arrow_right_' + position).style.opacity = "1";
    } else if (currentValue === maxValue) {
        document.getElementById('settings_arrow_left_' + position).style.opacity = "1";
        document.getElementById('settings_arrow_right_' + position).style.opacity = "0.2";
    } else {
        document.getElementById('settings_arrow_left_' + position).style.opacity = "0.2";
        document.getElementById('settings_arrow_right_' + position).style.opacity = "1";
    }
}

function Settings_SetDefault(position) {
    if (position === 0) {
        localStorage.setItem('user_language', 1);
        Settings_SetLang(Settings_Obj_values(0));
    } else if (position === 1) Play_Buffer = Settings_Obj_values(1);
    else if (position === 2) PlayVod_Buffer = Settings_Obj_values(2);
    else if (position === 3) PlayClip_Buffer = Settings_Obj_values(3);
    else if (position === 5) Play_SetChatFont();
}

function Settings_CheckLang(lang) {
    if (lang.indexOf('en_') !== -1) Settings_value.positions[0].defaultValue = 0;
    else if (lang.indexOf('pt_') !== -1) Settings_value.positions[0].defaultValue = 1;
}

function Settings_SetLang(lang) {
    if (lang.indexOf('en_') !== -1) en_USLang();
    else if (lang.indexOf('pt_') !== -1) pt_BRLang();
    DefaultLang();
    Main_SetStrings(false);
}

function Settings_handleKeyDown(event) {
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
            if (Settings_Obj_default(Settings_cursorY) > 0) {
                Settings_value.positions[Settings_cursorY].defaultValue -= 1;
                Settings_ChangeSettigs(Settings_cursorY);
            }
            break;
        case KEY_RIGHT:
            if (Settings_Obj_default(Settings_cursorY) < Settings_Obj_length(Settings_cursorY)) {
                Settings_value.positions[Settings_cursorY].defaultValue += 1;
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
            Main_showAboutDialog();
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