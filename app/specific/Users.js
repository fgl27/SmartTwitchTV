//Variable initialization
var Users_cursorY = 0;
var Users_cursorX = 0;
var Users_ColoumnsCount = 8;
var Users_RemoveCursor = 0;
var Users_RemoveDialogID = null;

var Users_ids = ['u_thumbdiv', 'u_img', 'u_infodiv', 'u_displayname', 'u_cell', 'user_scroll'];
var Users_status = false;
var Users_loadingData = true;
var Users_FirstLoad = false;
//Variable initialization end

function Users_init() {
    Main_values.Main_Go = Main_Users;
    document.getElementById("screens_holder").style.top = ((screen.height / 100) * 7) + "px";
    Main_HideWarningDialog();
    Main_AddClass('top_bar_user', 'icon_center_focus');
    document.body.addEventListener("keydown", Users_handleKeyDown, false);
    if (Users_status) {
        Main_YRst(Users_cursorY);
        Main_ShowElement(Users_ids[5]);
        Main_SaveValues();
    } else Users_StartLoad();
}

function Users_exit() {
    Main_values.Users_Position = 0;
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    document.body.removeEventListener("keydown", Users_handleKeyDown);
    Main_HideElement(Users_ids[5]);
    document.getElementById("screens_holder").style.top = "0";
}

function Users_StartLoad() {
    Main_HideElement(Users_ids[5]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    Users_status = false;
    Users_FirstLoad = true;
    Main_empty('stream_table_user');
    Users_cursorX = 0;
    Users_cursorY = 0;
    Users_loadingData = true;
    Users_loadData();
}

function Users_loadData() {
    var row, coloumn_id, tbody = document.createElement('tbody'),
        color;

    for (var x = 0; x < AddUser_UsernameArray.length; x++) {
        coloumn_id = 0;
        color = ((x % 2) ? 'B5B5B5' : 'FFFFFF');

        Main_td = document.createElement('tr');
        Main_td.className = 'follower_header';
        Main_td.innerHTML = '<div class="follower_header">' + AddUser_UsernameArray[x].name +
            STR_CONTENT + (!x ? STR_USER_NUMBER_ONE : '') + '</div>';

        document.getElementById("stream_table_user").appendChild(tbody);
        document.getElementById("stream_table_user").appendChild(Main_td);

        row = document.createElement('tr');

        //live
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, STR_LIVE_CHANNELS, 'play', color));

        //host
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, STR_LIVE_HOSTS, 'users', color));

        //games
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, (UserGames.isLive ? STR_LIVE_GAMES : STR_FALLOW_GAMES),
            'gamepad', color));

        //videos
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, STR_VIDEOS, 'movie-play', color));

        //channels
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, STR_USER_CHANNEL, 'filmstrip', color));

        //add or make one
        coloumn_id++;
        if (!x) row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, STR_USER_ADD, 'user-plus', color));
        else row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, STR_USER_MAKE_ONE, 'arrow-up', color));

        //remove user
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, STR_USER_REMOVE, 'user-times', color));

        //add key
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, (AddUser_UsernameArray[x].access_token ? STR_USER_CODE_OK : STR_USER_CODE), 'key', color));

        document.getElementById("stream_table_user").appendChild(row);
    }

    Users_loadDataSuccessFinish();
}

function Users_createChannelCell(id, user_name, stream_type, icons, color) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', Users_ids[4] + id);
    Main_td.setAttribute(Main_DataAttribute, user_name);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = '<div id="' + Users_ids[0] + id + '" class="stream_thumbnail_channel" ><div id="' + Users_ids[1] + id +
        '" class="stream_user_icon" style="color: #' + color + ';"><i class="icon-' + icons + '"></i></div></div>' +
        '<div id="' + Users_ids[2] + id + '" class="stream_text">' +
        '<div id="' + Users_ids[3] + id + '" class="stream_info_user" style="text-align: center;">' + stream_type + '</div></div>';

    return Main_td;
}

function Users_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!Users_status) {
            Main_HideLoadDialog();
            Users_status = true;
            Users_addFocus();
            Main_SaveValues();
        }
        Main_ShowElement(Users_ids[5]);
        Users_FirstLoad = false;
        Users_loadingData = false;
    });
}

function Users_resetGameCell() {
    for (var x = 0; x < AddUser_UsernameArray.length; x++) Main_textContent(Users_ids[3] + x + '_' + 2, (UserGames.isLive ? STR_LIVE_GAMES : STR_FALLOW_GAMES));
}

function Users_addFocus() {
    Main_AddClass(Users_ids[0] + Users_cursorY + '_' + Users_cursorX, 'stream_thumbnail_focused');
    if (Main_YchangeAddFocus(Users_cursorY)) {

        if (Users_cursorY > 1) {

            if (Main_ThumbNull((Users_cursorY + 1), 0, Users_ids[0]))
                Main_ScrollTable(Users_ids[5], (document.getElementById(Users_ids[4] + Users_cursorY + '_' + Users_cursorX).offsetTop * -1) + 500);

        } else Main_ScrollTable(Users_ids[5], ((screen.height / 100) * 7));

    } else Main_handleKeyUp();
}

function Users_removeFocus() {
    Main_addFocusFinish = false;
    Main_RemoveClass(Users_ids[0] + Users_cursorY + '_' + Users_cursorX, 'stream_thumbnail_focused');
}

function Users_keyEnter() {
    Main_values.Users_Position = Users_cursorY;

    if (Users_cursorX === 3 && !AddUser_UsernameArray[Main_values.Users_Position].access_token) {
        Main_showWarningDialog(STR_NOKEY_VIDEO_WARN);
        window.setTimeout(Main_HideWarningDialog, 5000);
        return;
    }

    if (Users_cursorX === 7 && AddUser_UsernameArray[Main_values.Users_Position].access_token) {
        Main_showWarningDialog(STR_USER_CODE_OK);
        window.setTimeout(Main_HideWarningDialog, 1500);
        return;
    }

    if (Users_cursorX !== 6) {
        Main_HideElement(Users_ids[5]);
        document.body.removeEventListener("keydown", Users_handleKeyDown);
        document.getElementById("screens_holder").style.top = "0";
    }

    if (!Users_cursorX) UserLive_init();
    else if (Users_cursorX === 1) UserHost_init();
    else if (Users_cursorX === 2) {
        inUseObj = UserGames;
        Screens_init();
    } else if (Users_cursorX === 3) UserVod_init();
    else if (Users_cursorX === 4) UserChannels_init();
    else if (Users_cursorX === 5) {
        if (!Users_cursorY) {
            Main_values.Main_Before = Main_Users;
            AddUser_init();
        } else AddUser_UserMakeOne(Users_cursorY);
    } else if (Users_cursorX === 6) Users_showRemoveDialog();
    else if (Users_cursorX === 7 && !AddUser_UsernameArray[Main_values.Users_Position].access_token) AddCode_init();
}

function Users_clearRemoveDialog() {
    window.clearTimeout(Users_RemoveDialogID);
}

function Users_setRemoveDialog() {
    Users_RemoveDialogID = window.setTimeout(Users_HideRemoveDialog, 6000);
}

function Users_showRemoveDialog() {
    Users_setRemoveDialog();
    Main_innerHTML("main_dialog_remove", STR_REMOVE_USER + STR_BR + AddUser_UsernameArray[Main_values.Users_Position].name + '?');
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
        Main_AddClass('remove_cancel', 'button_search_focused');
        Main_RemoveClass('remove_yes', 'button_search_focused');
    } else {
        Main_RemoveClass('remove_cancel', 'button_search_focused');
        Main_AddClass('remove_yes', 'button_search_focused');
    }
}

function Users_handleKeyDown(event) {
    if (Users_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Users_isRemoveDialogShown()) Users_HideRemoveDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                if (Main_values.Main_Before === Main_Users || Main_values.Main_Before === Main_UserChannels || Main_values.Main_Before === Main_UserLive || Main_values.Main_Before === Main_UserHost || Main_values.Main_Before === Main_usergames) Main_values.Main_Go = Main_Live;
                else Main_values.Main_Go = Main_values.Main_Before;
                Users_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
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
        case KEY_RIGHT:
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
        case KEY_UP:
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
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            Users_StartLoad();
            break;
        case KEY_CHANNELUP:
            Main_values.Main_Before = Main_Users;
            Main_values.Main_Go = Main_Featured;
            Users_exit();
            Main_SwitchScreen();
            break;
        case KEY_CHANNELDOWN:
            Main_values.Main_Before = Main_Users;
            Main_values.Main_Go = Main_Live;
            Users_exit();
            Main_SwitchScreen();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (Users_isRemoveDialogShown()) {
                // HideRemoveDialog set Users_RemoveCursor to 0, is better to hide befor remove, use temp var
                var temp_RemoveCursor = Users_RemoveCursor;
                Users_HideRemoveDialog();
                if (temp_RemoveCursor) {
                    document.body.removeEventListener("keydown", Users_handleKeyDown);
                    Users_exit();
                    AddUser_removeUser(Users_cursorY);
                }
            } else Users_keyEnter();
            break;
        case KEY_RED:
            Main_SidePannelStart(Users_handleKeyDown);
            break;
        case KEY_GREEN:
            Users_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_values.Main_BeforeSearch = Main_Users;
            Main_values.Main_Go = Main_Search;
            Users_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}