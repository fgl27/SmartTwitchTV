//Variable initialization
var Languages_cursorY = 0;
var Languages_Selected = '';
var Languages_value = {
    "All": {
        "values": ["off", "on"],
        "defaultValue": 2,
        "set_values": ""
    },
    "Bulgarian [BG]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "bg"
    },
    "Dansk [DA]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "da"
    },
    "Deutsch [DE]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "de"
    },
    "English [EN]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "en,en-gb"
    },
    "Español [ES]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "es,es-mx"
    },
    "Français [FR]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "fr"
    },
    "Italiano [IT]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "it"
    },
    "Magyar [HU]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "hu"
    },
    "Nederlands [NL]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "nl"
    },
    "Norsk [NO]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "no"
    },
    "Polski [PL]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "pl"
    },
    "Português [PT]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "pt,pt-br"
    },
    "Slovenčina [SK]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "sk"
    },
    "Suomi [FI]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "fi"
    },
    "Svenska [SV]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "sv"
    },
    "Tiếng Việt [VI]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "vi"
    },
    "Türkçe [TR]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "tr"
    },
    "Čeština [CS]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "cs"
    },
    "Ελληνικά [EL]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "el"
    },
    "Русский [RU]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "ru"
    },
    "ภาษาไทย [TH]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "th"
    },
    "中文 [ZH]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "zh"
    },
    "日本語 [JA]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "ja"
    },
    "한국어 [KO]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "ko"
    },
    "Română [RO]": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "ro"
    }
};

var Languages_value_keys = [];
var Languages_positions_length = 0;
//Variable initialization end

function Languages_init() {
    document.body.removeEventListener("keydown", Settings_handleKeyDown);
    Main_HideElement('settings_main');
    Main_ShowElement('settings_lang');
    Languages_HideShowAll();
    ScreensObj_SetTopLable(STR_SETTINGS + STR_SPACE + STR_CONTENT_LANG);
    document.body.addEventListener("keydown", Languages_handleKeyDown, false);
    Languages_cursorY = 0;
    Languages_inputFocus(Languages_cursorY);
    Languages_ResetLang();
}

function Languages_exit() {
    document.body.removeEventListener("keydown", Languages_handleKeyDown);
    document.body.addEventListener("keydown", Settings_handleKeyDown, false);
    Settings_ScrollTable();
    Main_ShowElement('settings_main');
    Main_HideElement('settings_lang');
    Languages_RemoveinputFocus();
    Languages_SetLang();
    Languages_ResetLang();
}

function Languages_ResetLang() {
    if (Main_ContentLang === "") {
        Languages_Selected = STR_LANG_ALL;
        Languages_value.All.defaultValue = 1;
        Languages_ChangeSettigs(0);
        Main_AddClass(Languages_value_keys[0], 'red_text');
        Languages_HideShowAll();
    }
    Settings_DivOptionChangeLang('content_lang', STR_CONTENT_LANG, Languages_Selected);
}

function Languages_SetLang() {
    Main_ContentLang = "";
    if (!Languages_Obj_default('All')) {
        for (var key in Languages_value) {
            if (Languages_Obj_default(key)) Main_ContentLang += ',' + Languages_value[key].set_values;
        }
        Main_ContentLang = Main_ContentLang.slice(1);
    }
    if (Main_ContentLang === "") Languages_Selected = STR_LANG_ALL;
    else Languages_Selected = Main_ContentLang.toUpperCase();
}

// The order in Languages_SetSettings is the display order
function Languages_SetSettings() {
    var div = '';

    for (var key in Languages_value) {
        Languages_value_keys.push(key);
        Languages_value[key].values = [STR_NO, STR_YES];
        div += Languages_DivOptionNoSummary(key, key);
    }

    Main_innerHTML("settings_lang", div);
    Languages_positions_length = Languages_value_keys.length;
}

function Languages_DivOptionNoSummary(key, string) {
    return '<div id="' + key + '_div" class="settings_div"><div id="' +
        key + '_name" class="settings_name">' + string + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="' + (Languages_Obj_default(key) ? 'red_text ' : '') + 'strokedeline settings_value">' + Languages_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';
}

function Languages_SetDefautls() {
    for (var key in Languages_value) {
        Languages_value[key].defaultValue = Main_getItemInt(key, Languages_value[key].defaultValue);
        Languages_value[key].defaultValue -= 1;
    }
    Languages_SetLang();
}

function Languages_Obj_values(key) {
    return Languages_value[key].values[Languages_Obj_default(key)];
}

//function Languages_Obj_set_values(key) {
//    return Languages_value[key].set_values[Languages_Obj_default(key)];
//}

function Languages_Obj_default(key) {
    return Languages_value[key].defaultValue;
}

function Languages_Obj_length(key) {
    return Languages_value[key].values.length - 1;
}

function Languages_inputFocus(position) {
    var key = Languages_value_keys[Languages_cursorY];
    Main_AddClass(key, 'settings_value_focus');
    Main_AddClass(key + '_div', 'settings_div_focus');
    Languages_Setarrows(position);
    Languages_ScrollTable(key);
}

function Languages_RemoveinputFocus() {
    var key = Languages_value_keys[Languages_cursorY];
    document.getElementById(key + "arrow_left").style.opacity = "0";
    document.getElementById(key + "arrow_right").style.opacity = "0";
    Main_RemoveClass(key, 'settings_value_focus');
    Main_RemoveClass(key + '_div', 'settings_div_focus');
}

function Languages_ScrollTable() {

    document.getElementById('settings_scroll').scrollTop =
        (Languages_cursorY > 7) ? document.getElementById(Languages_value_keys[Languages_cursorY - 7]).offsetTop : 0;
}

function Languages_ChangeSettigs(position) {
    var key = Languages_value_keys[position];
    Main_setItem(key, Languages_Obj_default(key) + 1);
    Main_textContent(key, Languages_Obj_values(key));
    Languages_Setarrows(position);
}

function Languages_Setarrows(position) {
    var key = Languages_value_keys[position];

    var currentValue = Languages_Obj_default(key);
    var maxValue = Languages_Obj_length(key);

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

function Languages_HideShowAll() {
    for (var key in Languages_value) {
        if (key.indexOf('All') === -1) {
            document.getElementById(key + '_div').style.display = Languages_Obj_default('All') ? 'none' : 'inline-block';
        }
    }
}

function Languages_handleKeyDown(event) {
    var key;
    switch (event.keyCode) {
        case KEY_RETURN_Q:
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            Languages_exit();
            break;
        case KEY_LEFT:
            key = Languages_value_keys[Languages_cursorY];
            if (Languages_Obj_default(key) > 0) {
                Languages_value[key].defaultValue -= 1;
                Languages_ChangeSettigs(Languages_cursorY);
                Main_RemoveClass(Languages_value_keys[Languages_cursorY], 'red_text');
                if (key.indexOf('All') !== -1) Languages_HideShowAll();
            }
            break;
        case KEY_RIGHT:
            key = Languages_value_keys[Languages_cursorY];
            if (Languages_Obj_default(key) < Languages_Obj_length(key)) {
                Languages_value[key].defaultValue += 1;
                Languages_ChangeSettigs(Languages_cursorY);
                Main_AddClass(Languages_value_keys[Languages_cursorY], 'red_text');
                if (key.indexOf('All') !== -1) Languages_HideShowAll();
            }
            break;
        case KEY_UP:
            if (Languages_cursorY > 0) {
                Languages_RemoveinputFocus();
                Languages_cursorY--;
                Languages_inputFocus(Languages_cursorY);
            }
            break;
        case KEY_DOWN:
            if (!Languages_Obj_default('All') && Languages_cursorY < (Languages_positions_length - 1)) {
                Languages_RemoveinputFocus();
                Languages_cursorY++;
                Languages_inputFocus(Languages_cursorY);
            }
            break;
        default:
            break;
    }
}