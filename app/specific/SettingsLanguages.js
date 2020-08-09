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
var Languages_cursorY = 0;
var Languages_Selected = '';
var Languages_value = {
    "All": {
        "values": ["off", "on"],
        "defaultValue": 2,
        "set_values": "",
        "title": "All"
    },
    "bg": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "bg",
        "title": "Bulgarian [BG]"
    },
    "cs": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "cs",
        "title": "Čeština [CS]"
    },
    "da": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "da",
        "title": "Dansk [DA]"
    },
    "de": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "de",
        "title": "Deutsch [DE]"
    },
    "el": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "el",
        "title": "Ελληνικά [EL]"
    },
    "en": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "en",
        "title": "English [EN]"
    },
    "es": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "es",
        "title": "Español [ES]"
    },
    "fi": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "fi",
        "title": "Suomi [FI]"
    },
    "fr": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "fr",
        "title": "Français [FR]"
    },
    "it": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "it",
        "title": "Italiano [IT]"
    },
    "hu": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "hu",
        "title": "Magyar [HU]"
    },
    "ja": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "ja",
        "title": "日本語 [JA]"
    },
    "ko": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "ko",
        "title": "한국어 [KO]"
    },
    "nl": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "nl",
        "title": "Nederlands [NL]"
    },
    "no": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "no",
        "title": "Norsk [NO]"
    },
    "pl": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "pl",
        "title": "Polski [PL]"
    },
    "pt": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "pt",
        "title": "Português [PT]"
    },
    "ro": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "ro",
        "title": "Română [RO]"
    },
    "ru": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "ru",
        "title": "Русский [RU]"
    },
    "sk": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "sk",
        "title": "Slovenčina [SK]"
    },
    "sv": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "sv",
        "title": "Svenska [SV]"
    },
    "th": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "th",
        "title": "ภาษาไทย [TH]"
    },
    "tr": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "tr",
        "title": "Türkçe [TR]"
    },
    "vi": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "vi",
        "title": "Tiếng Việt [VI]"
    },
    "zh": {
        "values": ["off", "on"],
        "defaultValue": 1,
        "set_values": "zh",
        "title": "中文 [ZH]"
    }
};

//For clips the api accept a coma and extra languages
var Languages_Extra = {
    "en": "en,en-gb",
    "es": "es,es-mx",
    "pt": "pt,pt-br"
};

var Languages_value_keys = [];
var Languages_positions_length = 0;
//Variable initialization end

function Languages_init() {
    Main_removeEventListener("keydown", Settings_handleKeyDown);
    Main_HideElement('settings_main');
    Main_ShowElement('settings_lang');
    Languages_HideShowAll();
    ScreensObj_SetTopLable(STR_SETTINGS + STR_SPACE + STR_CONTENT_LANG);
    Main_addEventListener("keydown", Languages_handleKeyDown);
    Languages_cursorY = 0;
    Languages_inputFocus(Languages_cursorY);
    Languages_ResetLang();
}

function Languages_exit() {
    Main_removeEventListener("keydown", Languages_handleKeyDown);
    Main_addEventListener("keydown", Settings_handleKeyDown);
    ScreensObj_SetTopLable(STR_SETTINGS);
    Settings_ScrollTableReset();
    Main_ShowElement('settings_main');
    Main_HideElement('settings_lang');
    Languages_RemoveinputFocus();
    Languages_SetLang();
    Languages_ResetLang();
}

function Languages_isVisible() {
    return Main_isElementShowing('settings_lang');
}

function Languages_ResetLang() {
    if (Main_ContentLang === "") {
        Languages_Selected = STR_LANG_ALL;
        Languages_value.All.defaultValue = 1;
        Languages_ChangeSettigs(0);
        Main_AddClass(Languages_value_keys[0], 'red_text');
        Languages_HideShowAll();
    } else {
        Main_textContent(Main_ContentLang, Languages_Obj_values(Main_ContentLang));
        Main_AddClass(Main_ContentLang, 'red_text');
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
        //the app allowed more then one language but twitch api blocks it now for all api minus clips one
        if (Main_A_includes_B(Main_ContentLang, ',')) {
            Languages_ResetAll();
            Main_ContentLang = "";
        }
    }

    if (Main_ContentLang === "") {
        Languages_Selected = STR_LANG_ALL;
        OSInterface_upDateLang(null);
    } else {
        Languages_Selected = Main_ContentLang.toUpperCase();
        OSInterface_upDateLang(Main_ContentLang);
    }
}

// The order in Languages_SetSettings is the display order
function Languages_SetSettings() {
    var div = '';

    for (var key in Languages_value) {
        Languages_value_keys.push(key);
        Languages_value[key].values = [STR_NO, STR_YES];
        div += Languages_DivOptionNoSummary(key, Languages_value[key].title);
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
    Main_getElementById(key + "arrow_left").style.opacity = "0";
    Main_getElementById(key + "arrow_right").style.opacity = "0";
    Main_RemoveClass(key, 'settings_value_focus');
    Main_RemoveClass(key + '_div', 'settings_div_focus');
}

function Languages_ScrollTable() {

    Main_getElementById('settings_scroll').scrollTop =
        (Languages_cursorY > 7) ? Main_getElementById(Languages_value_keys[Languages_cursorY - 7]).offsetTop : 0;
}

function Languages_ChangeSettigs(position) {
    Languages_ChangeSettigsEnd(position);
}

function Languages_ResetAll() {
    for (var key in Languages_value) {
        if (Languages_Obj_default(key)) {
            Languages_value[key].defaultValue -= 1;
            Main_setItem(key, Languages_Obj_default(key) + 1);
            Main_textContent(key, Languages_Obj_values(key));
            Main_RemoveClass(key, 'red_text');
        }
    }
}

function Languages_ChangeSettigsEnd(position) {
    Languages_ChangeSettigsEndKey(Languages_value_keys[position]);
}

function Languages_ChangeSettigsEndKey(key) {
    Main_setItem(key, Languages_Obj_default(key) + 1);
    Main_textContent(key, Languages_Obj_values(key));
    Languages_SetarrowsKey(key);
}

function Languages_Setarrows(position) {
    Languages_SetarrowsKey(Languages_value_keys[position]);
}

function Languages_SetarrowsKey(key) {
    var currentValue = Languages_Obj_default(key);
    var maxValue = Languages_Obj_length(key);

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

function Languages_HideShowAll() {
    for (var key in Languages_value) {
        if (!Main_A_includes_B(key, 'All')) {
            Main_getElementById(key + '_div').style.display = Languages_Obj_default('All') ? 'none' : 'inline-block';
        }
    }
}

function Languages_handleKeyDown(event) {
    var key;
    switch (event.keyCode) {
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
                if (Main_A_includes_B(key, 'All')) Languages_HideShowAll();
            }
            break;
        case KEY_RIGHT:
            key = Languages_value_keys[Languages_cursorY];
            if (Languages_Obj_default(key) < Languages_Obj_length(key)) {
                if (!Main_A_includes_B(key, 'All')) Languages_ResetAll();
                Languages_value[key].defaultValue += 1;
                Languages_ChangeSettigs(Languages_cursorY);
                Main_AddClass(Languages_value_keys[Languages_cursorY], 'red_text');
                if (Main_A_includes_B(key, 'All')) Languages_HideShowAll();
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