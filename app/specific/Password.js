/*
 * Copyright (c) 2017–present Felipe de Leon <fglfgl27@gmail.com>
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
var Password_cursorY = 0;
var Password_cursorX = 0;
var Password_keyBoardOn = false;
//Variable initialization end

function Password_init() {
    Settings_setMature(!Settings_enable_matureBackup);

    Main_HideWarningDialog();
    Main_HideElement('label_refresh');
    Main_IconLoad('label_thumb', 'icon-return', STR_GOBACK);

    Main_textContent('password_help', Settings_enable_matureBackup ? STR_MATURE_HELP_CHECK_PASS : STR_MATURE_HELP_SET_PASS);

    Main_innerHTML('label_last_refresh', '');
    Main_PasswordInput = Main_getElementById('password_input');
    Main_PasswordInput.placeholder = STR_PLACEHOLDER_PASS;
    Main_ShowElement('password_scroll');
    Password_cursorY = 0;
    Password_cursorX = 0;
    Password_refreshInputFocusTools();
    Password_inputFocus();
}

function Password_exitWarning() {
    Password_exit();

    Password_showWarning(STR_MATURE_NO_CHANGES, 2000);
}

function Password_exit() {
    Password_RemoveInputFocus(false);
    Main_removeEventListener('keydown', Password_handleKeyDown);
    Password_refreshInputFocusTools();
    Main_values.Main_Go = Main_values.Main_BeforePassword;
    Main_IconLoad('label_thumb', 'icon-options', STR_THUMB_OPTIONS_TOP);
    Main_ShowElement('label_refresh');
    Main_PasswordInput.value = '';
    Main_HideElement('password_scroll');
    Main_PasswordInput.type = 'password';

    Main_showSettings();
    Settings_RemoveInputFocus();
    Settings_cursorY = Settings_cursorYBackup;
    Settings_inputFocus(Settings_cursorY);
}

function Password_refreshInputFocusTools() {
    Main_RemoveClass('password_view', 'button_search_focused');
    Main_RemoveClass('password_save', 'button_search_focused');

    if (Password_cursorY) {
        if (!Password_cursorX) {
            Main_AddClass('password_view', 'button_search_focused');
        } else if (Password_cursorX === 1) {
            Main_AddClass('password_save', 'button_search_focused');
        }
    }
}

function Password_handleKeyDown(event) {
    if (Password_keyBoardOn) return;

    switch (event.keyCode) {
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            if (Main_isControlsDialogVisible()) Main_HideControlsDialog();
            else if (Main_isAboutDialogVisible()) Main_HideAboutDialog();
            else {
                Password_exitWarning();
            }
            break;
        case KEY_LEFT:
            if (Password_cursorY === 1) {
                Password_cursorX--;
                if (Password_cursorX < 0) Password_cursorX = 1;
                Password_refreshInputFocusTools();
            }
            break;
        case KEY_RIGHT:
            if (Password_cursorY === 1) {
                Password_cursorX++;
                if (Password_cursorX > 1) Password_cursorX = 0;
                Password_refreshInputFocusTools();
            }
            break;
        case KEY_UP:
            if (Password_cursorY === 1) {
                Password_cursorY = 0;
                Password_refreshInputFocusTools();
                Password_inputFocus();
            }
            break;
        case KEY_DOWN:
            if (!Password_cursorY) {
                Password_RemoveInputFocus(false);
                Password_cursorY = 1;
                Password_refreshInputFocusTools();
            } else if (Password_cursorY === 1) {
                Password_cursorY = 0;
                Password_refreshInputFocusTools();
                Password_inputFocus();
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Password_KeyEnter();
            break;
        default:
            break;
    }
}

function Password_KeyEnter() {
    if (!Password_cursorY) {
        Password_inputFocus();
    } else {
        if (!Password_cursorX) {
            Main_PasswordInput.type = Main_PasswordInput.type === 'password' ? 'text' : 'password';
        } else {
            if (Main_PasswordInput.value !== '' && Main_PasswordInput.value !== null) {
                var showRemoveWarn = false;
                if (Settings_enable_matureBackup) {
                    //password enabled

                    if (Main_values.Password_data !== Main_PasswordInput.value) {
                        Password_showWarning(STR_WRONG_PASS, 1500);

                        return;
                    }

                    Main_values.Password_data = null;
                    showRemoveWarn = true;
                } else {
                    //password disabled

                    if (!Password_CheckIfStrong(Main_PasswordInput.value)) {
                        return;
                    }

                    Main_values.Password_data = Main_PasswordInput.value;
                    Main_PasswordInput.value = '';
                }

                Settings_setMature(Settings_enable_matureBackup);
                Password_exit();
                Main_SaveValues();

                if (showRemoveWarn) {
                    //Password_exit will hide the warning show after exit
                    Password_showWarning(STR_PASS_MATURE_ENABLED, 5000);
                }
            } else {
                Password_showWarning(STR_SEARCH_EMPTY, 1000);
            }
        }
    }
}

function Password_showWarning(warning, time) {
    Main_showWarningDialog(warning);

    Main_setTimeout(function () {
        Main_HideWarningDialog();
    }, time);
}

function Password_CheckIfStrong(password) {
    var warning = '';
    if (!password.match(/[0-9]+/)) {
        warning += 'password must contain at least one number' + STR_BR;
    }

    if (!password.match(/[A-Z]+/)) {
        warning += 'password must contain at least one capital letter' + STR_BR;
    }

    if (password.length < 6) {
        warning += 'password minimum number of characters is 6';
    }

    if (warning) {
        Password_showWarning(warning, 2000);

        return false;
    }

    return true;
}

var Password_inputFocusId;
function Password_inputFocus() {
    Main_AddClass('scene_keys', 'avoidclicks');
    OSInterface_AvoidClicks(true);
    Main_AddClass('scenefeed', 'avoidclicks');
    Main_removeEventListener('keydown', Password_handleKeyDown);
    Main_addEventListener('keydown', Password_KeyboardEvent);
    Main_PasswordInput.placeholder = STR_PLACEHOLDER_PASS;

    Password_inputFocusId = Main_setTimeout(
        function () {
            Main_PasswordInput.focus();
            Password_keyBoardOn = true;
        },
        500,
        Password_inputFocusId
    );
}

function Password_RemoveInputFocus(EnaKeydown) {
    Main_clearTimeout(Password_inputFocusId);
    if (!Main_isTV && Main_IsOn_OSInterface) OSInterface_mhideSystemUI();

    Main_RemoveClass('scenefeed', 'avoidclicks');
    Main_RemoveClass('scene_keys', 'avoidclicks');
    OSInterface_AvoidClicks(false);
    Main_PasswordInput.blur();
    Password_removeEventListener();
    Main_removeEventListener('keydown', Password_KeyboardEvent);

    if (EnaKeydown) Main_addEventListener('keydown', Password_handleKeyDown);
    Password_keyBoardOn = false;
}

function Password_removeEventListener() {
    if (Main_PasswordInput !== null) {
        var elClone = Main_PasswordInput.cloneNode(true);
        Main_PasswordInput.parentNode.replaceChild(elClone, Main_PasswordInput);
        Main_PasswordInput = Main_getElementById('password_input');
    }
}

function Password_KeyboardEvent(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogVisible()) Main_HideAboutDialog();
            else if (Main_isControlsDialogVisible()) Main_HideControlsDialog();
            else {
                Password_exitWarning();
            }
            break;
        case KEY_KEYBOARD_DONE:
        case KEY_DOWN:
            Password_KeyboardDismiss();
            break;
        default:
            break;
    }
}

function Password_KeyboardDismiss() {
    Main_clearTimeout(Password_inputFocusId);
    Password_RemoveInputFocus(true);
    Password_cursorY = 1;
    Password_refreshInputFocusTools();
}
