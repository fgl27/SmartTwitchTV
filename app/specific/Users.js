//Variable initialization
var Users_cursorY = 0;
var Users_cursorX = 0;
var Users_LastClickFinish = true;
var Users_keyClickDelayTime = 25;
var Users_ColoumnsCount = 7;
var Users_RemoveCursor = 0;
var Users_RemoveDialogID = null;

var Users_ids = ['u_thumbdiv', 'u_img', 'u_infodiv', 'u_displayname', 'u_cell'];
var Users_status = false;
var Users_loadingData = true;
var Users_imgMatrix = [];
var Users_imgMatrixId = [];
var Users_imgMatrixCount = 0;
//Variable initialization end

function Users_init() {
    Main_Go = Main_Users;
    Main_HideWarningDialog();
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    document.body.addEventListener("keydown", Users_handleKeyDown, false);
    if (Users_status) Main_ScrollHelper(Users_ids[0], Users_cursorY, Users_cursorX, Main_Users, Main_ScrollOffSetMinusChannels, 160, true);
    else Users_StartLoad();
}

function Users_exit() {
    AddCode_SetDefaultOAuth(0);
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.body.removeEventListener("keydown", Users_handleKeyDown);
}

function Users_StartLoad() {
    Main_HideWarningDialog();
    Users_status = false;
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    var table = document.getElementById('stream_table_user');
    while (table.firstChild) table.removeChild(table.firstChild);
    Users_imgMatrix = [];
    Users_imgMatrixId = [];
    Users_imgMatrixCount = 0;
    Users_cursorX = 0;
    Users_cursorY = 0;
    Users_loadingData = true;
    Users_loadData();
}

function Users_loadData() {
    var row, coloumn_id, tbody = document.createElement('tbody');

    for (var x = 0; x < AddUser_UsernameArray.length; x++) {
        coloumn_id = 0;
        Main_UserName = AddUser_UsernameArray[x];

        Main_td = document.createElement('tr');
        Main_td.className = 'follower_header';
        Main_td.innerHTML = '<div class="follower_header">' + Main_UserName +
            STR_CONTENT + (!x ? STR_USER_NUMBER_ONE : '') + '</div>';

        document.getElementById("stream_table_user").appendChild(tbody);
        document.getElementById("stream_table_user").appendChild(Main_td);

        row = document.createElement('tr');

        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_selectedChannelDisplayname, STR_LIVE_CHANNELS, IMG_BLUR_VIDEO1));
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_selectedChannelDisplayname, STR_LIVE_HOSTS, IMG_BLUR_VIDEO2));
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_selectedChannelDisplayname, (UserGames_live ? STR_LIVE_GAMES : STR_FALLOW_GAMES),
            IMG_BLUR_GAME));
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_selectedChannelDisplayname, STR_USER_CHANNEL, IMG_BLUR_VOD));
        coloumn_id++;
        if (!x) row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_selectedChannelDisplayname, STR_USER_ADD, IMG_USER_PLUS));
        else row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_selectedChannelDisplayname, STR_USER_MAKE_ONE, IMG_USER_UP));
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_selectedChannelDisplayname, STR_USER_REMOVE, IMG_USER_MINUS));
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_selectedChannelDisplayname, (AddCode_UserCodeExist(Main_UserName) > -1 ? STR_USER_CODE_OK : STR_USER_CODE), IMG_USER_CODE));

        document.getElementById("stream_table_user").appendChild(row);
    }

    Users_loadDataSuccessFinish();
}

function Users_createChannelCell(id, user_name, stream_type, preview_thumbnail) {
    Users_imgMatrix[Users_imgMatrixCount] = preview_thumbnail;
    Users_imgMatrixId[Users_imgMatrixCount] = Users_ids[1] + id;
    Users_imgMatrixCount++;

    Main_PreLoadAImage(preview_thumbnail);

    Main_td = document.createElement('td');
    Main_td.setAttribute('id', Users_ids[4] + id);
    Main_td.setAttribute('data-channelname', user_name);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = '<div id="' + Users_ids[0] + id + '" class="stream_thumbnail_channel" ><img id="' + Users_ids[1] + id + '" class="stream_img"></div>' +
        '<div id="' + Users_ids[2] + id + '" class="stream_text">' +
        '<div id="' + Users_ids[3] + id + '" class="stream_info_user">' + stream_type + '</div></div>';

    return Main_td;
}

function Users_loadDataSuccessFinish() {
    $(document).ready(function() {
        if (!Users_status) {
            Main_HideLoadDialog();
            Users_status = true;
            if (AddCode_UsercodeArray.length > 0) Users_checkTitleStart();
            Users_addFocus();
        }

        Main_LoadImages(Users_imgMatrix, Users_imgMatrixId, IMG_404_VIDEO);

        Users_loadingData = false;
    });
}

function Users_resetGameCell() {
    for (var x = 0; x < AddUser_UsernameArray.length; x++) document.getElementById(Users_ids[3] + x + '_' + 2).innerHTML = (UserGames_live ? STR_LIVE_GAMES : STR_FALLOW_GAMES);
}

function Users_checkTitleStart() {
    for (var x = 0; x < AddUser_UsernameArray.length; x++) Users_checkTitleRun(x);
}

function Users_checkTitleRun(position) {
    AddCode_loadingDataTry = 0;
    AddCode_loadingDataTimeout = 10000;
    AddCode_CheckTokenStart(position);
}

function Users_SetKeyTitleStart(bool, position) {
    document.getElementById(Users_ids[3] + position + '_' + 6).innerHTML = bool ? STR_USER_CODE_OK : STR_USER_CODE;
    if (!bool) {
        var user = AddCode_UserCodeExist(AddUser_UsernameArray[position]);
        if (user > -1) AddCode_removeUser(user);
    }
}

function Users_addFocus() {
    document.getElementById(Users_ids[0] + Users_cursorY + '_' + Users_cursorX).classList.add('stream_thumbnail_focused');
    document.getElementById(Users_ids[2] + Users_cursorY + '_' + Users_cursorX).classList.add('stream_text_focused');
    document.getElementById(Users_ids[3] + Users_cursorY + '_' + Users_cursorX).classList.add('stream_info_focused');
    Main_ScrollHelper(Users_ids[0], Users_cursorY, Users_cursorX, Main_Users, Main_ScrollOffSetMinusChannels, 160, true);
}

function Users_removeFocus() {
    document.getElementById(Users_ids[0] + Users_cursorY + '_' + Users_cursorX).classList.remove('stream_thumbnail_focused');
    document.getElementById(Users_ids[2] + Users_cursorY + '_' + Users_cursorX).classList.remove('stream_text_focused');
    document.getElementById(Users_ids[3] + Users_cursorY + '_' + Users_cursorX).classList.remove('stream_info_focused');
}

function Users_keyClickDelay() {
    Users_LastClickFinish = true;
}

function Users_keyEnter() {
    if (Users_cursorX !== 5) document.body.removeEventListener("keydown", Users_handleKeyDown);
    Main_UserName = AddUser_UsernameArray[Users_cursorY];
    AddCode_SetDefaultOAuth(Users_cursorY);

    if (!Users_cursorX) UserLive_init();
    else if (Users_cursorX === 1) UserHost_init();
    else if (Users_cursorX === 2) UserGames_init();
    else if (Users_cursorX === 3) UserChannels_init();
    else if (Users_cursorX === 4) {
        if (!Users_cursorY) {
            Main_Before = Main_Users;
            AddUser_init();
        } else AddUser_UserMakeOne(Users_cursorY);
    } else if (Users_cursorX === 5) Users_showRemoveDialog();
    else if (Users_cursorX === 6) AddCode_init();
}

function Users_checkKey(responseText) {
    var json = JSON.parse(responseText);
    var scopes = json.token.authorization.scopes;
    var scopesToTest = '';
    for (var i = 0; i < scopes.length; i++) {
        scopesToTest += scopes[i];
    }
    return scopesToTest.indexOf('user_follows_edit') !== -1 && scopesToTest.indexOf('user_subscriptions') !== -1 && json.token.user_name + '' === Main_UserName && json.token.valid + '' === 'true';
}

function Users_SetKeyTitle(bool) {
    document.getElementById(Users_ids[3] + Users_cursorY + '_' + Users_cursorX).innerHTML = bool ? STR_USER_CODE_OK : STR_USER_CODE;
    if (!bool) {
        var user = AddCode_UserCodeExist(AddUser_UsernameArray[Users_cursorY]);
        if (user > -1) AddCode_removeUser(user);
    }
}

function Users_clearRemoveDialog() {
    window.clearTimeout(Users_RemoveDialogID);
}

function Users_setRemoveDialog() {
    Users_RemoveDialogID = window.setTimeout(Users_HideRemoveDialog, 6000);
}

function Users_showRemoveDialog() {
    Users_setRemoveDialog();
    document.getElementById("main_dialog_remove").innerHTML = STR_REMOVE_USER + STR_BR + Main_UserName + '?';
    document.getElementById('main_remove_dialog').classList.remove('hide');
}

function Users_HideRemoveDialog() {
    Users_clearRemoveDialog();
    document.getElementById('main_remove_dialog').classList.add('hide');
    Users_RemoveCursor = 0;
    Users_RemoveCursorSet();
}

function Users_isRemoveDialogShown() {
    return document.getElementById('main_remove_dialog').className.indexOf('hide') === -1;
}

function Users_RemoveCursorSet() {
    if (!Users_RemoveCursor) {
        document.getElementById('remove_cancel').classList.add('button_search_focused');
        document.getElementById('remove_yes').classList.remove('button_search_focused');
    } else {
        document.getElementById('remove_cancel').classList.remove('button_search_focused');
        document.getElementById('remove_yes').classList.add('button_search_focused');
    }
}

function Users_handleKeyDown(event) {
    if (Users_loadingData && !Users_loadingMore) {
        event.preventDefault();
        return;
    } else if (!Users_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Users_LastClickFinish = false;
        window.setTimeout(Users_keyClickDelay, Users_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Users_isRemoveDialogShown()) {
                Users_HideRemoveDialog();
            } else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Main_Go = Main_Live;
                Users_exit();
                Main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Users_isRemoveDialogShown()) {
                Users_RemoveCursor--;
                if (Users_RemoveCursor < 0) Users_RemoveCursor = 1;
                Users_RemoveCursorSet();
                Users_clearRemoveDialog();
                Users_setRemoveDialog();
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
        case TvKeyCode.KEY_RIGHT:
            if (Users_isRemoveDialogShown()) {
                Users_RemoveCursor++;
                if (Users_RemoveCursor > 1) Users_RemoveCursor = 0;
                Users_RemoveCursorSet();
                Users_clearRemoveDialog();
                Users_setRemoveDialog();
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
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Users_ColoumnsCount; i++) {
                if (Main_ThumbNull((Users_cursorY - 1), (Users_cursorX - i), Users_ids[0])) {
                    Users_removeFocus();
                    Users_cursorY--;
                    Users_cursorX = Users_cursorX - i;
                    Users_addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
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
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            Users_StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            Main_Before = Main_Users;
            Main_Go = Main_games;
            Users_exit();
            Main_SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main_Before = Main_Users;
            Main_Go = Main_Live;
            Users_exit();
            Main_SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (Users_isRemoveDialogShown()) {
                // HideRemoveDialog set Users_RemoveCursor to 0, is better to hide befor remove, use temp var
                var temp_RemoveCursor = Users_RemoveCursor;
                Users_HideRemoveDialog();
                if (temp_RemoveCursor) {
                    document.body.removeEventListener("keydown", Users_handleKeyDown);
                    AddUser_removeUser(Users_cursorY);
                }
            } else Users_keyEnter();
            break;
        case TvKeyCode.KEY_RED:
            Main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Users_exit();
            Main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main_BeforeSearch = Main_Users;
            Main_Go = Main_Search;
            Users_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}
