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
var AddUser_UsernameArray = [];
var AddUser_UsernameArrayRemoved = {};
var AddUser_Username = null;
//Variable initialization end

function AddUser_init() {
    Main_values.Main_Go = Main_addUser;
    ScreensObj_SetTopLable(STR_USER_ADD);
    Main_HideWarningDialog();
    Main_showLoadDialog();
    Main_ShowElement('add_user_scroll');
    Main_HideElement('add_user_text_holder');
    AddUser_inputFocus();
}

function AddUser_exit() {
    if (AddUser_UsernameArray.length > 0) Main_values.Main_Go = Main_values.Main_Before;
    else Main_values.Main_Go = Main_values.Main_Before !== Main_Users ? Main_values.Main_Before : Main_Live;

    AddUser_RemoveinputFocus(false);
    Main_removeEventListener('keydown', AddUser_handleKeyDown);
    Main_HideElement('add_user_scroll');
    Main_HideLoadDialog();
    Main_clearTimeout(AddUser_getCodeCheckId);
}

function AddUser_handleKeyBack() {
    if (Main_isAboutDialogVisible()) Main_HideAboutDialog();
    else if (Main_isControlsDialogVisible()) Main_HideControlsDialog();
    else {
        AddUser_exit();
        Main_SwitchScreen();
    }
}

function AddUser_handleKeyDown(event) {
    if (Main_values.Main_Go !== Main_addUser) return;

    switch (event.keyCode) {
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            AddUser_handleKeyBack();
            break;
        default:
            break;
    }
}

var AddUser_inputFocusId;
function AddUser_inputFocus() {
    Main_addEventListener('keydown', AddUser_handleKeyDown);
    AddUser_getCode();
}

function AddUser_getCode() {
    if (!AddUser_IsInUserScreen()) {
        AddUser_handleKeyBack();
        return;
    }
    AddUser_DeviceCode = null;
    var theUrl = AddCode_Url + 'device?scopes=' + encodeURIComponent(AddCode_Scopes.join(' ')) + '&client_id=' + AddCode_backup_client_id;

    FullxmlHttpGet(theUrl, null, AddUser_getCodeSuccess, AddUser_getCodeError, 0, 0, 'POST', null);
}

var AddUser_DeviceCode = null;
var AddUser_DeviceCodeTimeout = 5;
function AddUser_getCodeSuccess(resultObj) {
    if (!AddUser_IsInUserScreen()) {
        AddUser_handleKeyBack();
        return;
    }

    if (resultObj.status === 200) {
        var data = JSON.parse(resultObj.responseText);
        var codeDiv = STR_BR + STR_BR + data.user_code + STR_BR + STR_BR;

        var urlDiv;
        if (Main_IsOn_OSInterface) {
            urlDiv = '<div style="color: ' + LINK_COLOR + '; text-decoration:none;">' + data.verification_uri + '</div>';
        } else {
            urlDiv = STR_DIV_LINK + DefaultMakeLink(data.verification_uri) + '</div>';
        }

        AddUser_DeviceCode = data.device_code;

        Main_innerHTML('add_user_text', STR_ADD_USER_TEXT.replace('%site', urlDiv).replace('%code', codeDiv));
        Main_ShowElement('add_user_text_holder');
        Main_HideLoadDialog();
        AddUser_getCodeCheck(AddUser_DeviceCodeTimeout);
    } else {
        AddUser_getCodeError();
    }
}

// function AddUser_insertString(str, index, value) {
//     return str.substr(0, index) + value + str.substr(index);
// }

function AddUser_getCodeError() {
    Main_HideLoadDialog();
    Main_showWarningDialog(STR_ADD_ERROR, 7500, true);
    Main_setTimeout(function () {
        AddUser_handleKeyBack();
    }, 3000);
}

var AddUser_getCodeCheckId;
function AddUser_getCodeCheck(counter) {
    if (!AddUser_IsInUserScreen()) {
        AddUser_handleKeyBack();
        return;
    }

    if (counter) {
        Main_textContent('add_user_text_counter', STR_ADD_USER_TEXT_COUNTER.replace('%d', counter));

        AddUser_getCodeCheckId = Main_setTimeout(
            function () {
                AddUser_getCodeCheck(counter - 1);
            },
            1000,
            AddUser_getCodeCheckId
        );
    } else {
        Main_textContent('add_user_text_counter', STR_ADD_USER_TEXT_COUNTER_NOW);
        AddUser_getDeviceCode();
    }
}

function AddUser_getDeviceCode() {
    if (!AddUser_IsInUserScreen()) {
        AddUser_handleKeyBack();
        return;
    }

    AddUser_getDeviceCodeToken = null;
    var theUrl =
        AddCode_UrlToken +
        'grant_type=' +
        encodeURIComponent('urn:ietf:params:oauth:grant-type:device_code') +
        '&client_id=' +
        AddCode_backup_client_id +
        '&device_code=' +
        AddUser_DeviceCode;

    FullxmlHttpGet(theUrl, null, AddUser_getDeviceCodeSuccess, AddUser_getCodeError, 0, 0, 'POST', null);
}

var AddUser_getDeviceCodeToken;
function AddUser_getDeviceCodeSuccess(resultObj) {
    if (!AddUser_IsInUserScreen()) {
        AddUser_handleKeyBack();
        return;
    }

    var data;
    if (resultObj.status === 200) {
        data = JSON.parse(resultObj.responseText);
        AddUser_getDeviceCodeToken = data.access_token;
        AddUser_getUserToken();
    } else if (resultObj.status === 400) {
        data = JSON.parse(resultObj.responseText);
        if (Main_A_includes_B(data.message, 'authorization_pending')) {
            AddUser_getCodeCheck(AddUser_DeviceCodeTimeout);
        } else {
            AddUser_getCodeError();
        }
    } else {
        AddUser_getCodeError();
    }
}

function AddUser_getUserToken() {
    if (!AddUser_IsInUserScreen()) {
        AddUser_handleKeyBack();
        return;
    }

    var header = [
        [clientIdHeader, AddCode_backup_client_id],
        [Bearer_Header, Bearer + AddUser_getDeviceCodeToken]
    ];

    var theUrl = Main_helix_api + 'users';

    FullxmlHttpGet(theUrl, header, AddUser_getUserTokenSuccess, noop_fun, 0, 0, null, null);
}

function AddUser_getUserTokenSuccess(resultObj) {
    if (!AddUser_IsInUserScreen()) {
        AddUser_handleKeyBack();
        return;
    }

    if (resultObj.status === 200) {
        AddUser_SaveNewUser(resultObj.responseText);
    } else {
        AddUser_getCodeError();
    }
}

function AddUser_removeEventListener() {
    if (!Main_isTV && Main_IsOn_OSInterface) OSInterface_mhideSystemUI();
}

function AddUser_RemoveinputFocus(EnaKeydown) {
    Main_clearTimeout(AddUser_inputFocusId);
    AddUser_removeEventListener();

    if (EnaKeydown) Main_addEventListener('keydown', AddUser_handleKeyDown);
}

function AddUser_RestoreUsers() {
    AddUser_UsernameArray = Main_getItemJson(AddUser_UserArrayItemName, []);
    AddUser_UsernameArrayRemoved = Main_getItemJson(AddUser_UsernameArrayRemovedItemName, {});

    if (Array.isArray(AddUser_UsernameArray) && AddUser_UsernameArray.length > 0) {
        OSInterface_UpdateUserId(AddUser_UsernameArray[0]);

        AddUser_UpdateSidePanel();

        //Check and refresh all tokens at start
        var i = 0,
            len = AddUser_UsernameArray.length;

        for (i; i < len; i++) {
            AddUser_UsernameArray[i].timeout_id = null;

            //originally the user was added without a date value with is needed to backup restore and sync
            if (!AddUser_UsernameArray[i].date) {
                AddUser_UsernameArray[i].date = new Date().getTime();
            }

            //Set user history obj
            Main_values_History_data[AddUser_UsernameArray[i].id] = {
                live: [],
                vod: [],
                clip: [],
                test: [],
                deleted: {
                    live: {},
                    vod: {},
                    clip: {}
                }
            };
        }

        Main_Restore_history();
        return true;
    }

    Main_Restore_history();
    AddUser_UsernameArray = [];
    AddUser_UpdateSidePanelDefault();

    return false;
}

function AddUser_UpdateSidePanel() {
    if (AddUser_UserIsSet()) {
        AddUser_UpdateSidePanelSize(AddUser_UsernameArray[0].logo, AddUser_UsernameArray[0].display_name);
    }
}

function AddUser_UpdateSidePanelDefault() {
    AddUser_UpdateSidePanelSize(IMG_404_LOGO, STR_USER_ADD);
}

function AddUser_UpdateSidePanelAfterShow() {
    if (AddUser_IsUserSet()) AddUser_UpdateSidePanel();
    else AddUser_UpdateSidePanelDefault();
}

function AddUser_UpdateSidePanelSize(logo, username) {
    //remove transition to change size
    Sidepannel_MovelDiv.style.transition = 'none';
    var MoveldefaultWidth = Sidepannel_MoveldefaultMargin + Sidepannel_FixdefaultMargin - 1;

    Main_innerHTML(
        'icon_side_panel_imgholder_0',
        '<img id="icon_side_panel_img_0" class="side_panel_new_img" alt="" src="' +
            logo +
            '" onerror="this.onerror=null;this.src=\'' +
            IMG_404_LOGO +
            '\';">'
    );
    Sidepannel_SetUserLabel(username);

    var size = username.length;

    size = size > 9 ? size - 9 : 0;

    Sidepannel_MovelDiv.style.width = 'calc(' + MoveldefaultWidth + '% + ' + size + 'ch)';

    var pos = Sidepannel_MovelDiv.offsetWidth - Sidepannel_FixDiv.offsetWidth;

    if (pos) {
        if (!Sidepannel_isShowingMenus())
            Sidepannel_MovelDiv.style.transform = 'translateX(-' + (pos / BodyfontSize + Sidepannel_OffsetMovelTransform) + 'em)';
    } else {
        var newsize = document.body.offsetWidth;
        newsize = (newsize / 100) * (MoveldefaultWidth + size) - (newsize / 100) * 5;
        Sidepannel_MovelDiv.style.transform = 'translateX(-' + (newsize / BodyfontSize - 0.05) + 'em)';
    }

    if (Settings_Obj_default('app_animations')) {
        Main_ready(function () {
            Sidepannel_MovelDiv.style.transition = '';
        });
    }
}

function AddUser_UserIsSet() {
    return AddUser_UsernameArray.length > 0;
}

function AddUser_UserHasToken() {
    return Boolean(AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token);
}

function AddUser_UpdateUserAllUsers() {
    var i = 0,
        len = AddUser_UsernameArray.length;

    for (i; i < len; i++) {
        AddUser_UpdateUser(i);
    }
}

function AddUser_UpdateUser(position) {
    var theUrl = Main_helix_api + 'users?login=' + encodeURIComponent(AddUser_UsernameArray[position].name);

    BaseXmlHttpGet(theUrl, AddUser_UpdateUsersSuccess, noop_fun, position, null, true);
}

function AddUser_UpdateUsersSuccess(response, position) {
    var user = JSON.parse(response);

    if (user.data.length) {
        user = user.data[0];

        if (Main_A_equals_B(AddUser_UsernameArray[position].name, user.login)) {
            AddUser_UsernameArray[position].display_name = user.display_name;
            AddUser_UsernameArray[position].logo = user.profile_image_url;

            if (!position) AddUser_UpdateSidePanel();

            AddUser_SaveUserArray();
        }
    }
}

function AddUser_SaveNewUser(responseText) {
    var data = JSON.parse(responseText).data;
    if (data && data.length) {
        AddUser_Username = data[0];
        var userObj = {
            name: AddUser_Username.login,
            id: AddUser_Username.id,
            display_name: AddUser_Username.display_name,
            logo: AddUser_Username.profile_image_url,
            access_token: AddUser_getDeviceCodeToken,
            date: new Date().getTime(),
            refresh_token: 0,
            expires_in: 0,
            expires_when: 0,
            timeout_id: null
        };
        AddUser_UsernameArray.push(userObj);
        delete AddUser_UsernameArrayRemoved[userObj.id];

        if (!Main_values_History_data[userObj.id]) {
            Main_values_History_data[userObj.id] = {
                live: [],
                vod: [],
                clip: []
            };
        }

        AddUser_SaveUserArray();
        Users_status = false;
        Users_Userlastadded = AddUser_Username.login;
        Users_ShowAuthentication = false;
        AddUser_exit();
        Main_values.Main_Go = Main_Users;
        Main_HideLoadDialog();
        if (AddUser_UsernameArray.length === 1) {
            AddUser_SaveNewUserRefreshTokens(0);
        }
        Main_SwitchScreen();

        Main_Eventsimple('User_Added');
    } else {
        AddUser_getCodeError();
    }
}

function AddUser_SaveNewUserRefreshTokens(position) {
    AddUser_UpdateSidePanel();
    OSInterface_UpdateUserId(AddUser_UsernameArray[position]);
    OSInterface_mCheckRefresh();
    HttpGetSetUserHeader();
    if (Settings_notification_check_any_enable()) OSInterface_RunNotificationService();
}

function AddUser_removeUser(position, skipInitUser) {
    // remove the user
    var index = AddUser_UsernameArray.indexOf(AddUser_UsernameArray[position]);

    if (index > -1) {
        AddUser_UsernameArrayRemoved[AddUser_UsernameArray[index].id] = JSON.parse(JSON.stringify(AddUser_UsernameArray[index]));
        AddUser_UsernameArrayRemoved[AddUser_UsernameArray[index].id].date = new Date().getTime();

        Main_clearTimeout(AddUser_UsernameArray[position].timeout_id);
        AddUser_UsernameArray.splice(index, 1);
    }

    // reset localStorage usernames
    AddUser_SaveUserArray();

    // restart users and smarthub
    if (AddUser_UsernameArray.length > 0) {
        //Reset main user if user is 0
        if (!position) {
            AddUser_UpdateSidePanel();

            OSInterface_UpdateUserId(AddUser_UsernameArray[0]);
        }
        Users_status = false;
        if (!skipInitUser) {
            Users_init();
        }
    } else {
        AddUser_UpdateSidePanelDefault();
        if (!skipInitUser) {
            Users_init();
        }

        OSInterface_UpdateUserId(null);
    }

    Main_UpdateBlockedHomeScreen();
}

function AddUser_SaveUserArray() {
    if (AddUser_UsernameArray.length > 0) {
        //Remove first user alphabetical sort and add first back
        var mainUser = AddUser_UsernameArray.splice(0, 1);

        AddUser_UsernameArray.sort(function (a, b) {
            return a.display_name.toLowerCase().localeCompare(b.display_name.toLowerCase());
        });

        AddUser_UsernameArray.splice(0, 0, mainUser[0]);
    }

    var string = JSON.stringify(AddUser_UsernameArray);
    Main_setItem(AddUser_UserArrayItemName, string);

    Main_trimObject(AddUser_UsernameArrayRemoved, 100);

    string = JSON.stringify(AddUser_UsernameArrayRemoved);
    Main_setItem(AddUser_UsernameArrayRemovedItemName, string);

    AddUser_CleanUserData();

    //Main_Log('AddUser_SaveUserArray');
}

function AddUser_CleanUserData() {
    Main_removeMissingProps(Main_values_History_data, AddUser_UsernameArray);
    Main_SaveHistoryItem();
}

function AddUser_UserMakeOne(position) {
    Main_clearTimeout(Main_CheckResumeFeedId);

    var temp_Username = JSON.parse(JSON.stringify(AddUser_UsernameArray[0]));
    AddUser_UsernameArray[0] = JSON.parse(JSON.stringify(AddUser_UsernameArray[position]));
    AddUser_UsernameArray[position] = temp_Username;

    AddUser_SaveUserArray();
    Users_status = false;
    AddUser_UpdateSidePanel();
    Users_init();

    OSInterface_UpdateUserId(AddUser_UsernameArray[0]);

    //Reset history obj and check for deleted vod/clips
    Main_history_SetVod_Watched();
    Main_UpdateBlockedHomeScreen();
    Main_setTimeout(Main_RunVODWorker, 10000);
    Main_setTimeout(Main_RunClipWorker, 30000);

    //Reset user emotes on change
    userEmote = {};

    if (AddUser_UsernameArray[0].access_token) {
        HttpGetSetUserHeader();
    } else {
        Main_showWarningDialog(STR_NO_TOKEN_WARNING, 5000);
    }
}

function AddUser_UserFindpos(user) {
    return AddUser_UsernameArray.map(function (array) {
        return array.name;
    }).indexOf(user);
}

function AddUser_IsUserSet() {
    return AddUser_UsernameArray.length > 0;
}

function AddUser_IsInUserScreen() {
    return Main_values.Main_Go === Main_addUser;
}
