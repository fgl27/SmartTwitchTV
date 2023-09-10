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
var AddUser_Username = null;
//Variable initialization end

function AddUser_init() {
    Main_values.Main_Go = Main_addUser;
    ScreensObj_SetTopLable(STR_USER_ADD);
    Main_HideWarningDialog();
    Main_showLoadDialog();
    Main_ShowElement('add_user_scroll');
    Main_HideElementWithEle(Main_AddUserTextHolder);
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
    Main_AddClass('scenefeed', 'avoidclicks');
    Main_AddClass('scene_keys', 'avoidclicks');
    OSInterface_AvoidClicks(true);
    Main_addEventListener('keydown', AddUser_handleKeyDown);
    AddUser_getCode();
    //
}

function AddUser_getCode() {
    AddUser_DeviceCode = null;
    var theUrl = AddCode_Url + 'device?scopes=' + encodeURIComponent(AddCode_Scopes.join(' ')) + '&client_id=' + AddCode_backup_client_id;

    FullxmlHttpGet(theUrl, null, AddUser_getCodeSuccess, AddUser_getCodeError, 0, 0, 'POST', null);
}

var AddUser_DeviceCode = null;
var AddUser_DeviceCodeTimeout = 5;
function AddUser_getCodeSuccess(resultObj) {
    if (resultObj.status === 200) {
        var data = JSON.parse(resultObj.responseText);
        var codeDiv = STR_BR + STR_BR + AddUser_insertString(data.user_code, data.user_code.length / 2, '-') + STR_BR + STR_BR;

        var urlDiv = STR_DIV_LINK + DefaultMakeLink(data.verification_uri) + '</div>';
        AddUser_DeviceCode = data.device_code;

        Main_innerHTMLWithEle(Main_AddUserText, STR_ADD_USER_TEXT.replace('%site', urlDiv).replace('%code', codeDiv));
        Main_ShowElementWithEle(Main_AddUserTextHolder);
        Main_HideLoadDialog();
        AddUser_getCodeCheck(AddUser_DeviceCodeTimeout);
    } else {
        AddUser_getCodeError();
    }
}

function AddUser_insertString(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}

function AddUser_getCodeError() {
    Main_HideLoadDialog();
    Main_showWarningDialog(STR_ADD_ERROR);
    Main_setTimeout(function () {
        AddUser_handleKeyBack();
    }, 3000);
}

var AddUser_getCodeCheckId;
function AddUser_getCodeCheck(counter) {
    if (counter) {
        Main_textContentWithEle(Main_AddUserTextCounter, STR_ADD_USER_TEXT_COUNTER.replace('%d', counter));

        AddUser_getCodeCheckId = Main_setTimeout(
            function () {
                AddUser_getCodeCheck(counter - 1);
            },
            1000,
            AddUser_getCodeCheckId
        );
    } else {
        Main_textContentWithEle(Main_AddUserTextCounter, STR_ADD_USER_TEXT_COUNTER_NOW);
        AddUser_getDeviceCode();
    }
}

function AddUser_getDeviceCode() {
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
    var header = [
        [clientIdHeader, AddCode_backup_client_id],
        [Bearer_Header, Bearer + AddUser_getDeviceCodeToken]
    ];

    var theUrl = Main_helix_api + 'users';

    FullxmlHttpGet(theUrl, header, AddUser_getUserTokenSuccess, noop_fun, 0, 0, null, null);
}

function AddUser_getUserTokenSuccess(resultObj) {
    if (resultObj.status === 200) {
        AddUser_SaveNewUser(resultObj.responseText);
    } else {
        AddUser_getCodeError();
    }
}

function AddUser_removeEventListener() {
    if (!Main_isTV && Main_IsOn_OSInterface) OSInterface_mhideSystemUI();

    Main_RemoveClass('scenefeed', 'avoidclicks');
    Main_RemoveClass('scene_keys', 'avoidclicks');
    OSInterface_AvoidClicks(false);
}

function AddUser_RemoveinputFocus(EnaKeydown) {
    Main_clearTimeout(AddUser_inputFocusId);
    AddUser_removeEventListener();

    if (EnaKeydown) Main_addEventListener('keydown', AddUser_handleKeyDown);
}

// function AddUser_loadDataRequest() {
//     var theUrl = Main_helix_api + 'users?login=' + encodeURIComponent(AddUser_Username);

//     BaseXmlHttpGet(theUrl, AddUser_loadDataRequestSuccess, AddUser_loadDataNoUser, null, null, true);
// }

// function AddUser_loadDataRequestSuccess(response) {
//     if (JSON.parse(response).data.length) {
//         Main_removeEventListener('keydown', AddUser_handleKeyDown);
//         AddUser_SaveNewUser(response);
//     } else AddUser_loadDataNoUser();
// }

// function AddUser_loadDataNoUser() {
//     AddUser_Username = null;
//     Main_HideLoadDialog();
//     Main_showWarningDialog(STR_USER_ERROR);
//     Main_setTimeout(function () {
//         AddUser_init();
//     }, 1000);
// }

function AddUser_RestoreUsers() {
    AddUser_UsernameArray = Main_getItemJson('AddUser_UsernameArray', []);

    if (Array.isArray(AddUser_UsernameArray) && AddUser_UsernameArray.length > 0) {
        OSInterface_UpdateUserId(AddUser_UsernameArray[0]);

        AddUser_UpdateSidepanel();

        //Check and refresh all tokens at start
        var i = 0,
            len = AddUser_UsernameArray.length;

        for (i; i < len; i++) {
            AddUser_UsernameArray[i].timeout_id = null;

            if (AddUser_UsernameArray[i].access_token) {
                AddCode_CheckTokenStart(i);
            } else if (!i) {
                Main_showWarningDialog(STR_NO_TOKEN_WARNING, 5000);
            }

            //Set user history obj
            Main_values_History_data[AddUser_UsernameArray[i].id] = {
                live: [],
                vod: [],
                clip: []
            };
        }

        Main_Restore_history();
        return true;
    } else {
        AddUser_UsernameArray = [];
        AddUser_UpdateSidepanelDefault();
        return false;
    }
}

function AddUser_UpdateSidepanel() {
    AddUser_UpdateSidepanelSize(AddUser_UsernameArray[0].logo, AddUser_UsernameArray[0].display_name);
}

function AddUser_UpdateSidepanelDefault() {
    AddUser_UpdateSidepanelSize(IMG_404_LOGO, STR_USER_ADD);
}

function AddUser_UpdateSidepanelAfterShow() {
    if (AddUser_IsUserSet()) AddUser_UpdateSidepanel();
    else AddUser_UpdateSidepanelDefault();
}

function AddUser_UpdateSidepanelSize(logo, username) {
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
    return AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token;
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

    BaseXmlHttpGet(theUrl, AddUser_UpdateUsertSuccess, noop_fun, position, null, true);
}

function AddUser_UpdateUsertSuccess(response, position) {
    var user = JSON.parse(response);

    if (user.data.length) {
        user = user.data[0];

        if (Main_A_equals_B(AddUser_UsernameArray[position].name, user.login)) {
            AddUser_UsernameArray[position].display_name = user.display_name;
            AddUser_UsernameArray[position].logo = user.profile_image_url;

            if (!position) AddUser_UpdateSidepanel();

            AddUser_SaveUserArray();
        }
    }
}

function AddUser_SaveNewUser(responseText) {
    var data = JSON.parse(responseText).data;
    if (data && data.length) {
        AddUser_Username = data[0];
        AddUser_UsernameArray.push({
            name: AddUser_Username.login,
            id: AddUser_Username.id,
            display_name: AddUser_Username.display_name,
            logo: AddUser_Username.profile_image_url,
            access_token: AddUser_getDeviceCodeToken,
            refresh_token: 0,
            expires_in: 0,
            expires_when: 0,
            timeout_id: null
        });

        Main_values_History_data[AddUser_UsernameArray[AddUser_UserFindpos(AddUser_Username.login)].id] = {
            live: [],
            vod: [],
            clip: []
        };

        AddUser_SaveUserArray();
        Users_status = false;
        Users_Userlastadded = AddUser_Username.login;
        Users_ShowAuthentication = false;
        AddUser_exit();
        Main_values.Main_Go = Main_Users;
        Main_HideLoadDialog();
        if (AddUser_UsernameArray.length === 1) {
            AddUser_UpdateSidepanel();
            OSInterface_UpdateUserId(AddUser_UsernameArray[0]);
            OSInterface_mCheckRefresh();
            HttpGetSetUserHeader();
            if (Settings_notification_check_any_enable()) OSInterface_RunNotificationService();
        }
        Main_SwitchScreen();

        Main_Eventsimple('New_User_Added');
    } else {
        AddUser_getCodeError();
    }
}

function AddUser_removeUser(position) {
    // remove the user
    var index = AddUser_UsernameArray.indexOf(AddUser_UsernameArray[position]);
    if (index > -1) {
        Main_clearTimeout(AddUser_UsernameArray[position].timeout_id);
        AddUser_UsernameArray.splice(index, 1);
    }

    // reset localStorage usernames
    AddUser_SaveUserArray();

    // restart users and smarthub
    if (AddUser_UsernameArray.length > 0) {
        //Reset main user if user is 0
        if (!position) {
            AddUser_UpdateSidepanel();

            OSInterface_UpdateUserId(AddUser_UsernameArray[0]);
        }
        Users_status = false;
        Users_init();
    } else {
        AddUser_UpdateSidepanelDefault();
        AddUser_init();

        OSInterface_UpdateUserId(null);
    }
}

function AddUser_SaveUserArray() {
    if (AddUser_UsernameArray.length > 0) {
        //Remove first user alphabetical sort and add first back
        var mainuser = AddUser_UsernameArray.splice(0, 1);
        AddUser_UsernameArray.sort(function (a, b) {
            return a.display_name.toLowerCase().localeCompare(b.display_name.toLowerCase());
        });
        AddUser_UsernameArray.splice(0, 0, mainuser[0]);
    }

    var string = JSON.stringify(AddUser_UsernameArray);
    Main_setItem('AddUser_UsernameArray', string);

    if (Main_CanBackup) OSInterface_BackupFile(Main_UserBackupFile, string);

    //Main_Log('AddUser_SaveUserArray');
}

function AddUser_UserMakeOne(position) {
    Main_clearTimeout(Main_CheckResumeFeedId);

    var temp_Username = JSON.parse(JSON.stringify(AddUser_UsernameArray[0]));
    AddUser_UsernameArray[0] = JSON.parse(JSON.stringify(AddUser_UsernameArray[position]));
    AddUser_UsernameArray[position] = temp_Username;

    // AddCode_Refreshtimeout(0);
    // AddCode_Refreshtimeout(position);

    AddUser_SaveUserArray();
    Users_status = false;
    AddUser_UpdateSidepanel();
    Users_init();

    OSInterface_UpdateUserId(AddUser_UsernameArray[0]);

    //Reset history obj and check for deleted vod/clips
    Main_history_SetVod_Watched();
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

// function AddUser_UserCodeExist(user) {
//     return (
//         AddUser_UsernameArray.filter(function (array) {
//             return array.name === user;
//         }).length > 0
//     );
// }

function AddUser_UserFindpos(user) {
    return AddUser_UsernameArray.map(function (array) {
        return array.name;
    }).indexOf(user);
}

function AddUser_IsUserSet() {
    return AddUser_UsernameArray.length > 0;
}
