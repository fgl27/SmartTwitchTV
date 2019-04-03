//Variable initialization
var Settings_cursorY = 0;
var Settings_value = {
    "restor_playback": { //restor_playback
        "values": ["off", "on"],
        "defaultValue": 2
    },
    "chat_font_size": { //chat_font_size
        "values": ["60%", "80%", "100%", "120%", "140%"],
        "defaultValue": 3
    },
    "force_disable_chat": { //force disable
        "values": ["off", "on"],
        "defaultValue": 2
    },
    "videos_animation": { //videos_animation
        "values": ["off", "on"],
        "defaultValue": 2
    },
    "clock_offset": { //clock_offset
        "values": Settings_GenerateClock(),
        "defaultValue": 49
    },
    "content_lang": { //content_lang
        "values": ["All", "Dansk [DA]", "Deutsch [DE]", "English [EN][EN-GB]", "English - USA [EN]", "English - UK [EN-GB]",
            "Español [ES][ES-MX]", "Español - España [ES]", "Español - Latinoamérica [ES-MX]", "Français [FR]", "Italiano [IT]",
            "Magyar [HU]", "Nederlands [NL]", "Norsk [NO]", "Polski [PL]", "Português [PT][PT-BR]", "Português -Portugal [PT]",
            "Português - Brasil [PT-BR]", "Slovenčina [SK]", "Suomi [FI]", "Svenska [SV]", "Tiếng Việt [VI]", "Türkçe [TR]",
            "Čeština [CS]", "Ελληνικά [EL]", "Български [BG]", "Русский [RU]", "ภาษาไทย [TH]", "中文 [ZH-ALL]",
            "中文 简体 [ZH-CN]", "中文 繁體 [ZH-TW]", "日本語 [JA]", "한국어 [KO]", "Română [RO]"
        ],
        "set_values": ["", "da", "de", "en,en-gb", "en", "en-gb", "es,es-mx", "es", "es-mx", "fr", "it", "hu", "nl", "no", "pl", "pt,pt-br", "pt", "pt-br", "sk", "fi", "sv", "vi", "tr", "cs", "el", "bg", "ru", "th", "zh-cn,zh-tw", "zh-cn", "zh-tw", "ja", "ko", "ro"],
        "defaultValue": 1
    }
};

function Settings_GenerateClock() {
    var clock = [],
        time = 43200,
        i = 0;
    Play_offsettimeMinus = 0;

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
    document.body.addEventListener("keydown", Settings_handleKeyDown, false);
    Main_IconLoad('label_refresh', 'icon-arrow-circle-left', STR_GOBACK);
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
}

function Settings_exit() {
    document.body.removeEventListener("keydown", Settings_handleKeyDown);
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

    // Clock offset
    key = "clock_offset";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_CLOCK_OFFSET);

    // Content Language selection
    key = "content_lang";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_CONTENT_LANG);

    //Player restore playback
    key = "restor_playback";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

    div += Settings_DivOptionWithSummary(key, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMARRY);

    // Videos
    key = "videos_animation";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

    div += Settings_DivOptionNoSummary(key, STR_VIDEOS_ANIMATION);

    // Player settings title
    div += Settings_DivTitle('play', STR_SETTINGS_PLAYER);

    // Chat size
    key = "chat_font_size";
    Settings_value_keys.push(key);

    div += Settings_DivOptionWithSummary(key, STR_CHAT_FONT, STR_CHAT_FONT_SUMARRY);

    key = "force_disable_chat";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

    div += Settings_DivOptionWithSummary(key, STR_F_DISABLE_CHAT, STR_F_DISABLE_CHAT_SUMARRY);

    Main_innerHTML("settings_main", div);
    Settings_positions_length = Settings_value_keys.length;
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
    Settings_value[key].values[0] = STR_LANG_ALL;
    Main_textContent(key, Settings_Obj_values(key));

    //Player settings
    Main_textContent('setting_title_play', STR_SETTINGS_PLAYER);

    //Player restore
    key = "restor_playback";
    Settings_DivOptionChangeLang(key, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMARRY);
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

    //Player chat font size
    key = "chat_font_size";
    Settings_DivOptionChangeLang(key, STR_CHAT_FONT, STR_CHAT_FONT_SUMARRY);

    //Player restore
    key = "force_disable_chat";
    Settings_DivOptionChangeLang(key, STR_F_DISABLE_CHAT, STR_F_DISABLE_CHAT_SUMARRY);
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

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
        Settings_value[key].defaultValue = Main_getItemInt(key, Settings_value[key].defaultValue);
        Settings_value[key].defaultValue -= 1;
    }
    Settings_SetClock();
    Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
    Main_ContentLang = Settings_Obj_set_values("content_lang");
    Main_values.Play_ChatForceDisable = Settings_Obj_default("force_disable_chat");
}

function Settings_Obj_values(key) {
    return Settings_value[key].values[Settings_Obj_default(key)];
}

function Settings_Obj_set_values(key) {
    return Settings_value[key].set_values[Settings_Obj_default(key)];
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
    Main_setItem(key, Settings_Obj_default(key) + 1);
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

    if (position === "content_lang") Main_ContentLang = Settings_Obj_set_values("content_lang");
    else if (position === "videos_animation") Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
    else if (position === "force_disable_chat") Main_values.Play_ChatForceDisable = Settings_Obj_default("force_disable_chat");
    else if (position === "chat_font_size") Play_SetChatFont();
    else if (position === "clock_offset") {
        Settings_SetClock();
        Main_updateclock();
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
            Main_values.Main_BeforeSearch = Main_values.Main_Go;
            Main_values.Main_Go = Main_Search;
            Settings_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}
