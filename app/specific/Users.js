//Variable initialization
var Users_cursorY = 0;
var Users_cursorX = 0;
var Users_ColoumnsCount = 8;
var Users_RemoveCursor = 0;
var Users_RemoveDialogID = null;
var Users_beforeUser = 1;
var Users_UserDialogID = null;
var Users_Isautentication = true;

var Users_ids = ['u_thumbdiv', 'u_img', 'u_infodiv', 'u_displayname', 'u_cell', 'user_scroll'];
var Users_status = false;
var Users_loadingData = true;
//Variable initialization end

function Users_init() {
    if (Main_newUsercode) {
        Main_HideElement('topbar');
        Main_HideElement('side_panel_new_holder');
        Main_ready(function() {
            Users_exit();
            AddCode_CheckNewCode(Main_newUsercode);
        });
        return;
    } else if (!AddUser_IsUserSet()) {
        Main_values.Main_Go = Main_Live;
        Users_exit();
        Main_SwitchScreen();
        return;
    }

    if (Main_values.Main_Before !== Main_Users) Users_beforeUser = Main_values.Main_Before;
    Main_ShowElement('label_side_panel');
    Main_IconLoad('label_refresh', 'icon-user', STR_USER_TOP_LABLE);

    Main_values.Main_Go = Main_Users;
    Main_HideWarningDialog();
    ScreensObj_SetTopLable(STR_USER, STR_MAIN_USER + " " + AddUser_UsernameArray[0].display_name);
    document.body.addEventListener("keydown", Users_handleKeyDown, false);
    if (Users_status) {
        Main_YRst(Users_cursorY);
        Main_ShowElement(Users_ids[5]);
        Users_addFocus();
        Main_SaveValues();
    } else Users_StartLoad();
}

function Users_exit() {
    Main_HideElement('label_side_panel');
    document.body.removeEventListener("keydown", Users_handleKeyDown);
    Main_HideElement(Users_ids[5]);
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);
}

function Users_StartLoad() {
    Main_empty('stream_table_user');
    Main_HideElement(Users_ids[5]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    Users_status = false;
    Main_FirstLoad = true;
    Users_cursorX = 0;
    Users_cursorY = 0;
    Users_loadingData = true;
    Main_CounterDialogRst();
    Main_ready(function() {
        Users_loadData();
    });
}

function Users_loadData() {
    var row = document.createElement('div');
    var doc = document.getElementById('stream_table_user');
    var x = 1; // 1 as first is used by add user
    var y = 0;

    var div = document.createElement('div');

    div.setAttribute('id', Users_ids[4] + '0_0');
    div.classList.add('stream_thumbnail_user_icon_holder');

    div.innerHTML = '<div id="' + Users_ids[0] + '0_0' +
        '" class="stream_thumbnail_user" ><div class="stream_thumbnail_channel_img"></div>' +
        '<div  class="stream_thumbnail_user_text_holder">' +
        '<div class="stream_info_user_name">' + STR_USER_ADD +
        '</div><div style="color:#FFFFFF;font-size: 8em; transform: translate(9%, -100%); float: left;"><i class="icon-user-plus" ></i></div></div></div>';

    row.appendChild(div);

    for (var user = 0; user < AddUser_UsernameArray.length; user++) {

        row.appendChild(Users_createCell(y + '_' + x, user));
        x++;
        if (x > 5) {
            doc.appendChild(row);
            row = document.createElement('div');
            y++;
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

    div.innerHTML = '<div id="' + Users_ids[0] + id +
        '" class="stream_thumbnail_user" ><div class="stream_thumbnail_channel_img"><img id="' + Users_ids[1] +
        id + '" alt="" class="lazy stream_img" data-src="' + AddUser_UsernameArray[pos].logo +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\'"></div>' +
        '<div  class="stream_thumbnail_user_text_holder">' +
        '<div class="stream_info_user_name">' + AddUser_UsernameArray[pos].display_name +
        '</div><div class="stream_info_user_name">' +
        (AddUser_UsernameArray[pos].access_token ? STR_USER_CODE_OK : STR_USER_CODE) +
        '</div></div></div>';

    return div;
}

function Users_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!Users_status) {
            Users_status = true;
            Users_addFocus();
            Main_HideLoadDialog();
            Main_SaveValues();
        }
        Main_ShowElement(Users_ids[5]);
        Main_FirstLoad = false;
        Users_loadingData = false;
        lazyLoadInstance.update();
    });
}

function Users_resetGameCell() {
    for (var x = 0; x < AddUser_UsernameArray.length; x++) Main_textContent(Users_ids[3] + x + '_' + 2, (UserGames.isLive ? STR_LIVE_GAMES : STR_FALLOW_GAMES));
}

function Users_addFocus(forceScroll) {
    Main_AddClass(Users_ids[0] + Users_cursorY + '_' + Users_cursorX, 'stream_thumbnail_focused');

    Main_CounterDialog(Users_cursorX, Users_cursorY, Main_ColoumnsCountChannel, AddUser_UsernameArray.length + 1);

    if (Main_YchangeAddFocus(Users_cursorY) || forceScroll) {

        if (Users_cursorY > 1) {

            if (Main_ThumbNull((Users_cursorY + 1), 0, Users_ids[0]))
                Main_ScrollTableCalc(Users_ids[5], (document.getElementById(Users_ids[4] + Users_cursorY + '_' + Users_cursorX).offsetTop * -1), 39);
        } else Main_ScrollTable(Users_ids[5], 0);

    } else Main_handleKeyUp();
}

function Users_removeFocus() {
    Main_addFocusFinish = false;
    Main_RemoveClass(Users_ids[0] + Users_cursorY + '_' + Users_cursorX, 'stream_thumbnail_focused');
}

//TODO add a temp user for when going back and for from user to games or etc
function Users_keyEnter() {
    if (!Users_cursorX && !Users_cursorY) {
        Main_values.Main_Before = Main_values.Main_Go;
        Main_HideElement(Users_ids[5]);
        document.body.removeEventListener("keydown", Users_handleKeyDown);
        AddUser_init();
    } else Users_showUserDialog();
}

function Users_clearUserDialog() {
    window.clearTimeout(Users_UserDialogID);
}

function Users_setUserDialog() {
    Users_UserDialogID = window.setTimeout(Users_HideUserDialog, 20000);
}

var Users_showUserDialogPos = 0;

function Users_showUserDialog() {
    Users_RemoveCursor = 0;
    Users_setUserDialog();
    Users_showUserDialogPos = document.getElementById(Users_ids[4] + Users_cursorY + '_' + Users_cursorX).getAttribute(Main_DataAttribute);

    Main_innerHTML("main_dialog_user_text", STR_USER_OPTION + " " + AddUser_UsernameArray[Users_showUserDialogPos].display_name);
    Main_innerHTML("main_dialog_user_key", (AddUser_UsernameArray[Users_showUserDialogPos].access_token ? STR_USER_CODE_OK : STR_USER_CODE));

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
    window.clearTimeout(Users_RemoveDialogID);
}

function Users_setRemoveDialog() {
    Users_RemoveDialogID = window.setTimeout(Users_HideRemoveDialog, 20000);
}

function Users_showRemoveDialog() {
    Users_setRemoveDialog();
    if (!Users_Isautentication) Main_innerHTML("main_dialog_remove", STR_REMOVE_USER + STR_BR + AddUser_UsernameArray[Users_showUserDialogPos].name + '?');
    else Main_innerHTML("main_dialog_remove", STR_OAUTH_IN + ' ' + AddUser_UsernameArray[Users_showUserDialogPos].name + '?');
    Main_ShowElement('main_remove_dialog');
}

function Users_HideRemoveDialog() {
    Users_clearRemoveDialog();
    Main_HideElement('main_remove_dialog');
    Users_RemoveCursor = 0;
    Users_RemoveCursorSet();
}

function Users_isRemoveDialogShown() {
    return Main_isElementShowing('main_remove_dialog');
}

function Users_RemoveCursorSet() {
    if (!Users_RemoveCursor) {
        Main_AddClass('remove_cancel', 'button_dialog_focused');
        Main_RemoveClass('remove_yes', 'button_dialog_focused');
    } else {
        Main_RemoveClass('remove_cancel', 'button_dialog_focused');
        Main_AddClass('remove_yes', 'button_dialog_focused');
    }
}

function Users_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Users_isRemoveDialogShown()) Users_HideRemoveDialog();
            else if (Users_isUserDialogShown()) Users_HideUserDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Users_exit();
                Main_values.Main_Go = Users_beforeUser;
                Main_SwitchScreenAction();
            }
            break;
        case KEY_LEFT:
            if (Users_isRemoveDialogShown()) {
                Users_RemoveCursor--;
                if (Users_RemoveCursor < 0) Users_RemoveCursor = 1;
                Users_RemoveCursorSet();
                Users_clearRemoveDialog();
                Users_setRemoveDialog();
            } else if (Users_isUserDialogShown()) {
                Users_RemoveCursor--;
                if (Users_RemoveCursor < 0) Users_RemoveCursor = 2;
                Users_UserCursorSet();
                Users_clearUserDialog();
                Users_setUserDialog();
            } else if (!Users_cursorX) {
                Users_removeFocus();
                Sidepannel_Start(Users_handleKeyDown);
            } else if (Main_ThumbNull((Users_cursorY), (Users_cursorX - 1), Users_ids[0])) {
                Users_removeFocus();
                Users_cursorX--;
                Users_addFocus();
            } else if (!Main_ThumbNull((Users_cursorY - 1), 0, Users_ids[0])) {
                Users_removeFocus();
                Users_cursorX = Users_ColoumnsCount - 1;
                Users_addFocus();
            } else {
                for (i = (Users_ColoumnsCount - 1); i > -1; i--) {
                    if (Main_ThumbNull((Users_cursorY - 1), i, Users_ids[0])) {
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
                Users_clearRemoveDialog();
                Users_setRemoveDialog();
            } else if (Users_isUserDialogShown()) {
                Users_RemoveCursor++;
                if (Users_RemoveCursor > 2) Users_RemoveCursor = 0;
                Users_UserCursorSet();
                Users_clearUserDialog();
                Users_setUserDialog();
            } else if (Main_ThumbNull((Users_cursorY), (Users_cursorX + 1), Users_ids[0])) {
                Users_removeFocus();
                Users_cursorX++;
                Users_addFocus();
            } else if (Main_ThumbNull((Users_cursorY + 1), 0, Users_ids[0])) {
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
            if (Users_cursorY) {
                for (i = 0; i < Users_ColoumnsCount; i++) {
                    if (Main_ThumbNull((Users_cursorY - 1), (Users_cursorX - i), Users_ids[0])) {
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
            for (i = 0; i < Users_ColoumnsCount; i++) {
                if (Main_ThumbNull((Users_cursorY + 1), (Users_cursorX - i), Users_ids[0])) {
                    Users_removeFocus();
                    Users_cursorY++;
                    Users_cursorX = Users_cursorX - i;
                    Users_addFocus();
                    break;
                }
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            // HideRemoveDialog set Users_RemoveCursor to 0, is better to hide befor remove, use temp var
            var temp_RemoveCursor = Users_RemoveCursor;
            if (Users_isRemoveDialogShown()) {
                Users_HideRemoveDialog();
                if (!Users_Isautentication) {
                    if (temp_RemoveCursor) {
                        document.body.removeEventListener("keydown", Users_handleKeyDown);
                        Users_exit();
                        AddUser_removeUser(Users_showUserDialogPos);
                    }
                } else {
                    if (temp_RemoveCursor) {
                        Main_values.Users_AddcodePosition = Users_showUserDialogPos;
                        Main_SaveValues();
                        var baseUrlCode = 'https://id.twitch.tv/oauth2/authorize?';
                        var type_code = 'code';
                        var client_id = Main_clientId;
                        var redirect_uri = AddCode_redirect_uri;
                        var scope = 'user_read+user_follows_edit+user_subscriptions';
                        var force_verify = 'true';
                        var url = baseUrlCode + 'response_type=' + type_code + '&client_id=' +
                            encodeURIComponent(client_id) + '&redirect_uri=' + redirect_uri + '&scope=' + scope +
                            '&force_verify=' + force_verify;
                        window.location = url;
                    }
                }
            } else if (Users_isUserDialogShown()) {
                Users_HideUserDialog();
                if (!temp_RemoveCursor) {
                    AddUser_UserMakeOne(Users_showUserDialogPos);
                } else if (temp_RemoveCursor === 1) {
                    if (AddUser_UsernameArray[Users_showUserDialogPos].access_token) {
                        Main_showWarningDialog(STR_USER_CODE_OK);
                        window.setTimeout(Main_HideWarningDialog, 1500);
                    } else {
                        Users_Isautentication = true;
                        Users_showRemoveDialog();
                    }
                } else {
                    Users_Isautentication = false;
                    Users_showRemoveDialog();
                }
            } else Users_keyEnter();
            break;
        case KEY_REFRESH:
            Main_ReloadScreen();
            break;
        default:
            break;
    }
}
