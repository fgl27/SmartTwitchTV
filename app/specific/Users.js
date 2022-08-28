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
var Users_cursorY = 0;
var Users_cursorX = 0;
var Users_ColoumnsCount = 8;
var Users_RemoveCursor = 0;
var Users_RemoveDialogID = null;
var Users_beforeUser = 1;
var Users_UserDialogID = null;
var Users_Isautentication = true;
var Users_ShowAutetication = false;
var Users_Userlastadded = '';

var Users_ids;
var Users_status = false;
var Users_loadingData = true;
var Users_Lang = '';
//Variable initialization end

function Users_init() {
    if (!Users_ids) {
        Users_ids = [
            Main_Users + '_thumbdiv_', //0
            Main_Users + '_img_', //1
            Main_Users + '_infodiv_', //2
            Main_Users + '_displayname_', //3
            Main_Users + '_cell_', //4
            'user_scroll', //5
            Main_Users + '_row_', //6
            Main_Users + '_imgholder_', //7
            Main_Users + '_title_' //8
        ];
    }

    if (Main_newUsercode) {
        Main_HideElement('topbar');
        Main_HideElement('clock_holder');
        Main_HideElement('side_panel_new_holder');
        Users_exit();
        AddCode_CheckNewCode(Main_newUsercode);
        return;
    } else if (!AddUser_IsUserSet()) {
        Main_values.Main_Go = Main_Live;
        Users_exit();
        Main_SwitchScreen();
        return;
    }

    //Main_Log('Users_init');

    if (Main_values.Main_Before !== Main_Users) Users_beforeUser = Main_values.Main_Before;
    Main_IconLoad('label_thumb', 'icon-return', STR_GOBACK);
    Main_IconLoad('label_refresh', 'icon-user', STR_USER_TOP_LABLE);
    Main_innerHTML('label_last_refresh', '');

    Main_values.Main_Go = Main_Users;
    Main_HideWarningDialog();
    ScreensObj_SetTopLable(STR_USER, STR_MAIN_USER + ' ' + AddUser_UsernameArray[0].display_name);
    Main_addEventListener('keydown', Users_handleKeyDown);

    if (Main_CheckAccessibilityVisible()) Main_CheckAccessibilitySet();
    else if (Users_status && Main_A_equals_B(Users_Lang, Settings_AppLang)) {
        Main_YRst(Users_cursorY);
        Main_ShowElement(Users_ids[5]);
        Users_addFocus();
        Main_SaveValues();
    } else Users_StartLoad();

    Main_EventScreen('Users');
}

function Users_exit() {
    //Main_Log('Users_exit');

    Main_IconLoad('label_thumb', 'icon-options', STR_THUMB_OPTIONS_TOP);
    Main_removeEventListener('keydown', Users_handleKeyDown);
    Main_HideElement(Users_ids[5]);
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_GUIDE);
}

function Users_StartLoad() {
    //Main_Log('Users_StartLoad');
    Main_empty('stream_table_user');
    Main_HideElement(Users_ids[5]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    Users_status = false;
    Main_FirstLoad = true;
    Users_Lang = Settings_AppLang;
    Users_cursorX = 0;
    Users_cursorY = 0;
    Users_loadingData = true;
    Main_CounterDialogRst();
    Main_ready(Users_loadData);
    Main_EventScreen('Users');
}

function Users_loadData() {
    var row = document.createElement('div'),
        doc = Main_getElementById('stream_table_user'),
        x = 1, // 1 as first is used by add user
        y = 0,
        div = document.createElement('div');

    div.setAttribute('id', Users_ids[4] + '0_0');
    div.classList.add('stream_thumbnail_user_icon_holder');
    row.setAttribute('id', Users_ids[6] + '0');

    div.innerHTML =
        '<div id="' +
        Users_ids[0] +
        '0_0' +
        '" class="stream_thumbnail_user" ><div id="' +
        Users_ids[1] +
        '0_0' +
        '" class="stream_thumbnail_channel_img"></div>' +
        '<div id="' +
        Users_ids[2] +
        '0_0' +
        '" class="stream_thumbnail_user_text_holder">' +
        '<div id="' +
        Users_ids[3] +
        '0_0' +
        '" class="stream_info_user_name">' +
        STR_USER_ADD +
        '</div><div id="' +
        Users_ids[6] +
        '0_0' +
        '"style="color:#FFFFFF;font-size: 17vh; text-align: center; transform: translateY(-24.5vh);"><i id="' +
        Users_ids[7] +
        '0_0' +
        '" class="icon-user-plus" ></i></div></div></div>';

    row.appendChild(div);

    for (var user = 0; user < AddUser_UsernameArray.length; user++) {
        row.appendChild(Users_createCell(y + '_' + x, user));
        x++;
        if (x > 5) {
            y++;
            doc.appendChild(row);
            row = document.createElement('div');
            row.setAttribute('id', Users_ids[6] + y);
            x = 0;
        }
    }

    if (x <= 5) doc.appendChild(row);

    Users_loadDataSuccessFinish();
}

function Users_createCell(id, pos) {
    var div = document.createElement('div');

    div.setAttribute('id', Users_ids[4] + id);
    div.setAttribute(Main_DataAttribute, pos);
    div.classList.add('stream_thumbnail_user_icon_holder');

    div.innerHTML =
        '<div id="' +
        Users_ids[0] +
        id +
        '" class="stream_thumbnail_user" ><div  id="' +
        Users_ids[2] +
        id +
        '" class="stream_thumbnail_channel_img"><img id="' +
        Users_ids[1] +
        id +
        '" alt="" class="stream_img_channels" src="' +
        AddUser_UsernameArray[pos].logo +
        '" onerror="this.onerror=null;this.src=\'' +
        IMG_404_LOGO +
        '\';"></div>' +
        '<div id="' +
        Users_ids[3] +
        id +
        '" class="stream_thumbnail_user_text_holder">' +
        '<div id="' +
        Users_ids[7] +
        id +
        '" class="stream_info_user_name">' +
        AddUser_UsernameArray[pos].display_name +
        '</div><div id="' +
        Users_ids[8] +
        id +
        '" class="stream_info_user_title">' +
        (AddUser_UsernameArray[pos].access_token ? STR_USER_CODE_OK : STR_USER_CODE) +
        '</div></div></div>';

    return div;
}

function Users_loadDataSuccessFinish() {
    Main_ready(function () {
        //Main_Log('Users_loadDataSuccessFinish');
        if (!Users_status) {
            Users_status = true;
            Users_addFocus();
            Main_HideLoadDialog();
            Main_SaveValues();
        }
        Main_ShowElement(Users_ids[5]);
        Main_FirstLoad = false;
        Users_loadingData = false;
        if (Users_ShowAutetication) {
            Users_ShowAutetication = false;
            Users_showUserDialogPos = AddUser_UserFindpos(Users_Userlastadded);
            Users_Isautentication = true;
            Users_showRemoveDialog();
        }

        if (Main_FirstRun) Screens_loadDataSuccessFinishEnd();
    });
}

function Users_addFocus(forceScroll) {
    Main_AddClass(Users_ids[0] + Users_cursorY + '_' + Users_cursorX, Main_classThumb);

    Main_CounterDialog(Users_cursorX, Users_cursorY, Main_ColoumnsCountChannel, AddUser_UsernameArray.length + 1);

    if (Main_YchangeAddFocus(Users_cursorY) || forceScroll) {
        if (Users_cursorY > 1) {
            if (Main_ThumbNull(Users_cursorY + 1, 0, Users_ids[0])) {
                Main_getElementById(Users_ids[5]).style.transform =
                    'translateY(' +
                    (Main_getElementById(Users_ids[6] + Users_cursorY).offsetHeight -
                        Main_getElementById(Users_ids[4] + Users_cursorY + '_0').offsetTop) /
                        BodyfontSize +
                    'em)';
            }
        } else Main_getElementById(Users_ids[5]).style.transform = '';
    }
}

function Users_removeFocus() {
    Main_RemoveClass(Users_ids[0] + Users_cursorY + '_' + Users_cursorX, Main_classThumb);
}

//TODO add a temp user for when going back and for from user to games or etc
function Users_keyEnter() {
    if (!Users_cursorX && !Users_cursorY) {
        Main_values.Main_Before = Main_values.Main_Go;
        Main_HideElement(Users_ids[5]);
        Main_removeEventListener('keydown', Users_handleKeyDown);
        AddUser_init();
    } else Users_showUserDialog();
}

function Users_clearUserDialog() {
    Main_clearTimeout(Users_UserDialogID);
}

function Users_setUserDialog() {
    Users_UserDialogID = Main_setTimeout(Users_HideUserDialog, 20000, Users_UserDialogID);
}

var Users_showUserDialogPos = 0;

function Users_showUserDialog() {
    Users_RemoveCursor = 0;
    Users_setUserDialog();
    Users_showUserDialogPos = parseInt(Main_getElementById(Users_ids[4] + Users_cursorY + '_' + Users_cursorX).getAttribute(Main_DataAttribute));

    Main_innerHTML('main_dialog_user_text', STR_USER_OPTION + ' ' + AddUser_UsernameArray[Users_showUserDialogPos].display_name);
    Main_innerHTML('main_dialog_user_key', AddUser_UsernameArray[Users_showUserDialogPos].access_token ? STR_USER_CODE_OK : STR_USER_CODE);

    Main_ShowElement('main_dialog_user');
}

function Users_HideUserDialog() {
    Users_clearUserDialog();
    Main_HideElement('main_dialog_user');
    Users_RemoveCursor = 0;
    Users_UserCursorSet();
}

function Users_isUserDialogShown() {
    return Main_isElementShowing('main_dialog_user');
}

function Users_UserCursorSet() {
    Main_RemoveClass('main_dialog_user_first', 'button_dialog_focused');
    Main_RemoveClass('main_dialog_user_key', 'button_dialog_focused');
    Main_RemoveClass('main_dialog_user_remove', 'button_dialog_focused');

    if (!Users_RemoveCursor) Main_AddClass('main_dialog_user_first', 'button_dialog_focused');
    else if (Users_RemoveCursor === 1) Main_AddClass('main_dialog_user_key', 'button_dialog_focused');
    else if (Users_RemoveCursor) Main_AddClass('main_dialog_user_remove', 'button_dialog_focused');
}

function Users_clearRemoveDialog() {
    Main_clearTimeout(Users_RemoveDialogID);
}

function Users_setRemoveDialog() {
    Users_RemoveDialogID = Main_setTimeout(Users_HideRemoveDialog, 30000, Users_RemoveDialogID);
}

function Users_showRemoveDialog() {
    Users_setRemoveDialog();
    if (!Users_Isautentication)
        Main_innerHTML('main_dialog_remove', STR_REMOVE_USER + STR_BR + AddUser_UsernameArray[Users_showUserDialogPos].name + '?');
    else Main_innerHTML('main_dialog_remove', STR_OAUTH_IN + ' ' + AddUser_UsernameArray[Users_showUserDialogPos].name + '?');
    Main_ShowElement('yes_no_dialog');
}

function Users_HideRemoveDialog() {
    Users_clearRemoveDialog();
    Main_HideElement('yes_no_dialog');
    Users_RemoveCursor = 0;
    Users_RemoveCursorSet();
}

function Users_isRemoveDialogShown() {
    return Main_isElementShowing('yes_no_dialog');
}

function Users_RemoveCursorSet() {
    if (!Users_RemoveCursor) {
        Main_AddClass('yes_no_dialog_button_no', 'button_dialog_focused');
        Main_RemoveClass('yes_no_dialog_button_yes', 'button_dialog_focused');
    } else {
        Main_RemoveClass('yes_no_dialog_button_no', 'button_dialog_focused');
        Main_AddClass('yes_no_dialog_button_yes', 'button_dialog_focused');
    }
}

function Users_handleKeyBack() {
    if (Users_isRemoveDialogShown()) Users_HideRemoveDialog();
    else if (Users_isUserDialogShown()) Users_HideUserDialog();
    else if (Main_isAboutDialogVisible()) Main_HideAboutDialog();
    else if (Main_isControlsDialogVisible()) Main_HideControlsDialog();
    else {
        Users_exit();
        Sidepannel_RemoveFocusMain();
        Main_values.Main_Go = Users_beforeUser;
        Sidepannel_SetTopOpacity(Main_values.Main_Go);
        Main_SwitchScreen();
    }
}

function Users_handleKeyEnter() {
    var i;
    // HideRemoveDialog set Users_RemoveCursor to 0, is better to hide befor remove, use temp var
    var temp_RemoveCursor = Users_RemoveCursor;
    if (Users_isRemoveDialogShown()) {
        Users_HideRemoveDialog();
        if (!Users_Isautentication) {
            if (temp_RemoveCursor) {
                Main_removeEventListener('keydown', Users_handleKeyDown);
                Users_exit();
                AddUser_removeUser(Users_showUserDialogPos);
            }
        } else {
            if (temp_RemoveCursor) {
                Main_values.Users_AddcodePosition = Users_showUserDialogPos;
                Main_SaveValues();
                var baseUrlCode = 'https://id.twitch.tv/oauth2/authorize?',
                    type_code = 'code',
                    client_id = AddCode_clientId,
                    redirect_uri = AddCode_redirect_uri,
                    scope = '',
                    len = AddCode_Scopes.length;

                i = 0;
                for (i; i < len; i++) {
                    scope += AddCode_Scopes[i] + '+';
                }
                scope = scope.slice(0, -1);

                var force_verify = 'true';
                var url =
                    baseUrlCode +
                    'response_type=' +
                    type_code +
                    '&client_id=' +
                    encodeURIComponent(client_id) +
                    '&redirect_uri=' +
                    redirect_uri +
                    '&scope=' +
                    scope +
                    '&force_verify=' +
                    force_verify;
                OSInterface_AvoidClicks(true);
                Main_LoadUrl(url);
            }
        }
    } else if (Users_isUserDialogShown()) {
        Users_HideUserDialog();
        if (!temp_RemoveCursor) {
            AddUser_UserMakeOne(Users_showUserDialogPos);
        } else if (temp_RemoveCursor === 1) {
            if (AddUser_UsernameArray[Users_showUserDialogPos].access_token) {
                Main_showWarningDialog(STR_USER_CODE_OK, 2000);
            } else {
                Users_Isautentication = true;
                Users_showRemoveDialog();
            }
        } else {
            Users_Isautentication = false;
            Users_showRemoveDialog();
        }
    } else Users_keyEnter();
}

function Users_handleKeyDown(event) {
    //Main_Log('Users_handleKeyDown ' + event.keyCode);

    if (Main_FirstLoad || Main_CantClick()) return;

    Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            Users_handleKeyBack();
            break;
        case KEY_LEFT:
            if (Users_isRemoveDialogShown()) {
                Users_RemoveCursor--;
                if (Users_RemoveCursor < 0) Users_RemoveCursor = 1;
                Users_RemoveCursorSet();
                Users_setRemoveDialog();
            } else if (Users_isUserDialogShown()) {
                Users_RemoveCursor--;
                if (Users_RemoveCursor < 0) Users_RemoveCursor = 2;
                Users_UserCursorSet();
                Users_setUserDialog();
            } else if (!Users_cursorX) {
                Users_removeFocus();
                Sidepannel_Start(Users_handleKeyDown);
            } else if (Main_ThumbNull(Users_cursorY, Users_cursorX - 1, Users_ids[0])) {
                Users_removeFocus();
                Users_cursorX--;
                Users_addFocus();
            } else if (!Main_ThumbNull(Users_cursorY - 1, 0, Users_ids[0])) {
                Users_removeFocus();
                Users_cursorX = Users_ColoumnsCount - 1;
                Users_addFocus();
            } else {
                for (i = Users_ColoumnsCount - 1; i > -1; i--) {
                    if (Main_ThumbNull(Users_cursorY - 1, i, Users_ids[0])) {
                        Users_removeFocus();
                        Users_cursorY--;
                        Users_cursorX = i;
                        Users_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Users_isRemoveDialogShown()) {
                Users_RemoveCursor++;
                if (Users_RemoveCursor > 1) Users_RemoveCursor = 0;
                Users_RemoveCursorSet();
                Users_setRemoveDialog();
            } else if (Users_isUserDialogShown()) {
                Users_RemoveCursor++;
                if (Users_RemoveCursor > 2) Users_RemoveCursor = 0;
                Users_UserCursorSet();
                Users_setUserDialog();
            } else if (Main_ThumbNull(Users_cursorY, Users_cursorX + 1, Users_ids[0])) {
                Users_removeFocus();
                Users_cursorX++;
                Users_addFocus();
            } else if (Main_ThumbNull(Users_cursorY + 1, 0, Users_ids[0])) {
                Users_removeFocus();
                Users_cursorY++;
                Users_cursorX = 0;
                Users_addFocus();
            } else {
                Users_removeFocus();
                Users_cursorX = 0;
                Users_addFocus();
            }
            break;
        case KEY_UP:
            if (Users_isRemoveDialogShown() || Users_isUserDialogShown()) break;
            if (Users_cursorY) {
                for (i = 0; i < Users_ColoumnsCount; i++) {
                    if (Main_ThumbNull(Users_cursorY - 1, Users_cursorX - i, Users_ids[0])) {
                        Users_removeFocus();
                        Users_cursorY--;
                        Users_cursorX = Users_cursorX - i;
                        Users_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_DOWN:
            if (Users_isRemoveDialogShown() || Users_isUserDialogShown()) break;
            for (i = 0; i < Users_ColoumnsCount; i++) {
                if (Main_ThumbNull(Users_cursorY + 1, Users_cursorX - i, Users_ids[0])) {
                    Users_removeFocus();
                    Users_cursorY++;
                    Users_cursorX = Users_cursorX - i;
                    Users_addFocus();
                    break;
                }
            }
            break;
        case KEY_PAUSE: //key s
        case KEY_6:
            Main_showSettings();
            break;
        case KEY_PLAY:
        case KEY_PLAYPAUSE:
        case KEY_KEYBOARD_SPACE:
        case KEY_ENTER:
            Users_handleKeyEnter();
            break;
        case KEY_2:
            Main_ReloadScreen();
            break;
        case KEY_3:
            Users_removeFocus();
            Sidepannel_Start(Users_handleKeyDown, AddUser_UserIsSet());
            if (!AddUser_UserIsSet()) {
                Main_showWarningDialog(STR_NOKUSER_WARNING, 2000);
            }
            break;
        default:
            break;
    }
}
