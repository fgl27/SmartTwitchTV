/*jshint multistr: true */
//Variable initialization
function Users() {}
Users.cursorY = 0;
Users.cursorX = 0;
Users.LastClickFinish = true;
Users.keyClickDelayTime = 25;
Users.ColoumnsCount = 7;
Users.RemoveCursor = 0;
Users.RemoveDialogID = null;

Users.ids = ['u_thumbdiv', 'u_img', 'u_infodiv', 'u_displayname', 'u_cell'];
Users.status = false;
Users.loadingData = true;
Users.imgMatrix = [];
Users.imgMatrixId = [];
Users.imgMatrixCount = 0;

//Variable initialization end

Users.init = function() {
    main_Go = main_Users;
    main_HideWarningDialog();
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    document.body.addEventListener("keydown", Users.handleKeyDown, false);
    if (Users.status) main_ScrollHelper(Users.ids[0], Users.cursorY, Users.cursorX, main_Users, main_ScrollOffSetMinusChannels, 160, true);
    else Users.StartLoad();
};

Users.exit = function() {
    addCode_SetDefaultOAuth(0);
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.body.removeEventListener("keydown", Users.handleKeyDown);
};

Users.StartLoad = function() {
    main_HideWarningDialog();
    Users.status = false;
    main_ScrollHelperBlank('blank_focus');
    main_showLoadDialog();
    var table = document.getElementById('stream_table_user');
    while (table.firstChild) table.removeChild(table.firstChild);
    Users.imgMatrix = [];
    Users.imgMatrixId = [];
    Users.imgMatrixCount = 0;
    Users.cursorX = 0;
    Users.cursorY = 0;
    Users.loadingData = true;
    Users.loadData();
};

Users.loadData = function() {
    var row, coloumn_id, tbody = document.createElement('tbody');

    for (var x = 0; x < addUser_UsernameArray.length; x++) {
        coloumn_id = 0;
        main_UserName = addUser_UsernameArray[x];

        main_td = document.createElement('tr');
        main_td.className = 'follower_header';
        main_td.innerHTML = '<div class="follower_header">' + main_UserName +
            STR_CONTENT + (!x ? STR_USER_NUMBER_ONE : '') + '</div>';

        document.getElementById("stream_table_user").appendChild(tbody);
        document.getElementById("stream_table_user").appendChild(main_td);

        row = document.createElement('tr');

        row.appendChild(Users.createChannelCell(x + '_' + coloumn_id, main_selectedChannelDisplayname, STR_LIVE_CHANNELS, IMG_BLUR_VIDEO1));
        coloumn_id++;
        row.appendChild(Users.createChannelCell(x + '_' + coloumn_id, main_selectedChannelDisplayname, STR_LIVE_HOSTS, IMG_BLUR_VIDEO2));
        coloumn_id++;
        row.appendChild(Users.createChannelCell(x + '_' + coloumn_id, main_selectedChannelDisplayname, (usergames_live ? STR_LIVE_GAMES : STR_FALLOW_GAMES),
            IMG_BLUR_GAME));
        coloumn_id++;
        row.appendChild(Users.createChannelCell(x + '_' + coloumn_id, main_selectedChannelDisplayname, STR_USER_CHANNEL, IMG_BLUR_VOD));
        coloumn_id++;
        if (!x) row.appendChild(Users.createChannelCell(x + '_' + coloumn_id, main_selectedChannelDisplayname, STR_USER_ADD, IMG_USER_PLUS));
        else row.appendChild(Users.createChannelCell(x + '_' + coloumn_id, main_selectedChannelDisplayname, STR_USER_MAKE_ONE, IMG_USER_UP));
        coloumn_id++;
        row.appendChild(Users.createChannelCell(x + '_' + coloumn_id, main_selectedChannelDisplayname, STR_USER_REMOVE, IMG_USER_MINUS));
        coloumn_id++;
        row.appendChild(Users.createChannelCell(x + '_' + coloumn_id, main_selectedChannelDisplayname, (addCode_UserCodeExist(main_UserName) > -1 ? STR_USER_CODE_OK : STR_USER_CODE), IMG_USER_CODE));

        document.getElementById("stream_table_user").appendChild(row);
    }

    Users.loadDataSuccessFinish();
};

Users.createChannelCell = function(id, user_name, stream_type, preview_thumbnail) {
    Users.imgMatrix[Users.imgMatrixCount] = preview_thumbnail;
    Users.imgMatrixId[Users.imgMatrixCount] = Users.ids[1] + id;
    Users.imgMatrixCount++;

    main_PreLoadAImage(preview_thumbnail);

    main_td = document.createElement('td');
    main_td.setAttribute('id', Users.ids[4] + id);
    main_td.setAttribute('data-channelname', user_name);
    main_td.className = 'stream_cell';
    main_td.innerHTML = '<div id="' + Users.ids[0] + id + '" class="stream_thumbnail_channel" ><img id="' + Users.ids[1] + id + '" class="stream_img"></div>' +
        '<div id="' + Users.ids[2] + id + '" class="stream_text">' +
        '<div id="' + Users.ids[3] + id + '" class="stream_info_user">' + stream_type + '</div></div>';

    return main_td;
};

Users.loadDataSuccessFinish = function() {
    $(document).ready(function() {
        if (!Users.status) {
            main_HideLoadDialog();
            Users.status = true;
            if (addCode_UsercodeArray.length > 0) Users.checkTitleStart();
            Users.addFocus();
        }

        main_LoadImages(Users.imgMatrix, Users.imgMatrixId, IMG_404_VIDEO);

        Users.loadingData = false;
    });
};

Users.resetGameCell = function() {
    for (var x = 0; x < addUser_UsernameArray.length; x++) document.getElementById(Users.ids[3] + x + '_' + 2).innerHTML = (usergames_live ? STR_LIVE_GAMES : STR_FALLOW_GAMES);
};

Users.checkTitleStart = function() {
    for (var x = 0; x < addUser_UsernameArray.length; x++) Users.checkTitleRun(x);
};

Users.checkTitleRun = function(position) {
    addCode_loadingDataTry = 0;
    addCode_loadingDataTimeout = 10000;
    addCode_CheckTokenStart(position);
};

Users.SetKeyTitleStart = function(bool, position) {
    document.getElementById(Users.ids[3] + position + '_' + 6).innerHTML = bool ? STR_USER_CODE_OK : STR_USER_CODE;
    if (!bool) {
        var user = addCode_UserCodeExist(addUser_UsernameArray[position]);
        if (user > -1) addCode_removeUser(user);
    }
};

Users.addFocus = function() {
    document.getElementById(Users.ids[0] + Users.cursorY + '_' + Users.cursorX).classList.add('stream_thumbnail_focused');
    document.getElementById(Users.ids[2] + Users.cursorY + '_' + Users.cursorX).classList.add('stream_text_focused');
    document.getElementById(Users.ids[3] + Users.cursorY + '_' + Users.cursorX).classList.add('stream_info_focused');
    main_ScrollHelper(Users.ids[0], Users.cursorY, Users.cursorX, main_Users, main_ScrollOffSetMinusChannels, 160, true);
};

Users.removeFocus = function() {
    document.getElementById(Users.ids[0] + Users.cursorY + '_' + Users.cursorX).classList.remove('stream_thumbnail_focused');
    document.getElementById(Users.ids[2] + Users.cursorY + '_' + Users.cursorX).classList.remove('stream_text_focused');
    document.getElementById(Users.ids[3] + Users.cursorY + '_' + Users.cursorX).classList.remove('stream_info_focused');
};

Users.keyClickDelay = function() {
    Users.LastClickFinish = true;
};

Users.keyEnter = function() {
    if (Users.cursorX !== 5) document.body.removeEventListener("keydown", Users.handleKeyDown);
    main_UserName = addUser_UsernameArray[Users.cursorY];
    addCode_SetDefaultOAuth(Users.cursorY);

    if (!Users.cursorX) UserLive.init();
    else if (Users.cursorX === 1) UserHost.init();
    else if (Users.cursorX === 2) usergames_init();
    else if (Users.cursorX === 3) UserChannels.init();
    else if (Users.cursorX === 4) {
        if (!Users.cursorY) {
            main_Before = main_Users;
            addUser_init();
        } else addUser_UserMakeOne(Users.cursorY);
    } else if (Users.cursorX === 5) Users.showRemoveDialog();
    else if (Users.cursorX === 6) addCode_init();
};

Users.checkKey = function(responseText) {
    var json = JSON.parse(responseText);
    var scopes = json.token.authorization.scopes;
    var scopesToTest = '';
    for (var i = 0; i < scopes.length; i++) {
        scopesToTest += scopes[i];
    }
    return scopesToTest.indexOf('user_follows_edit') !== -1 && scopesToTest.indexOf('user_subscriptions') !== -1 && json.token.user_name + '' === main_UserName && json.token.valid + '' === 'true';
};

Users.SetKeyTitle = function(bool) {
    document.getElementById(Users.ids[3] + Users.cursorY + '_' + Users.cursorX).innerHTML = bool ? STR_USER_CODE_OK : STR_USER_CODE;
    if (!bool) {
        var user = addCode_UserCodeExist(addUser_UsernameArray[Users.cursorY]);
        if (user > -1) addCode_removeUser(user);
    }
};

Users.clearRemoveDialog = function() {
    window.clearTimeout(Users.RemoveDialogID);
};

Users.setRemoveDialog = function() {
    Users.RemoveDialogID = window.setTimeout(Users.HideRemoveDialog, 6000);
};

Users.showRemoveDialog = function() {
    Users.setRemoveDialog();
    document.getElementById("main_dialog_remove").innerHTML = STR_REMOVE_USER + STR_BR + main_UserName + '?';
    document.getElementById('main_remove_dialog').classList.remove('hide');
};

Users.HideRemoveDialog = function() {
    Users.clearRemoveDialog();
    document.getElementById('main_remove_dialog').classList.add('hide');
    Users.RemoveCursor = 0;
    Users.RemoveCursorSet();
};

Users.isRemoveDialogShown = function() {
    return document.getElementById('main_remove_dialog').className.indexOf('hide') === -1;
};

Users.RemoveCursorSet = function() {
    if (!Users.RemoveCursor) {
        document.getElementById('remove_cancel').classList.add('button_search_focused');
        document.getElementById('remove_yes').classList.remove('button_search_focused');
    } else {
        document.getElementById('remove_cancel').classList.remove('button_search_focused');
        document.getElementById('remove_yes').classList.add('button_search_focused');
    }
};

Users.handleKeyDown = function(event) {
    if (Users.loadingData && !Users.loadingMore) {
        event.preventDefault();
        return;
    } else if (!Users.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Users.LastClickFinish = false;
        window.setTimeout(Users.keyClickDelay, Users.keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Users.isRemoveDialogShown()) {
                Users.HideRemoveDialog();
            } else if (main_isAboutDialogShown()) main_HideAboutDialog();
            else if (main_isControlsDialogShown()) main_HideControlsDialog();
            else {
                main_Go = main_Live;
                Users.exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Users.isRemoveDialogShown()) {
                Users.RemoveCursor--;
                if (Users.RemoveCursor < 0) Users.RemoveCursor = 1;
                Users.RemoveCursorSet();
                Users.clearRemoveDialog();
                Users.setRemoveDialog();
            } else if (main_ThumbNull((Users.cursorY), (Users.cursorX - 1), Users.ids[0])) {
                Users.removeFocus();
                Users.cursorX--;
                Users.addFocus();
            } else if (!main_ThumbNull((Users.cursorY - 1), 0, Users.ids[0])) {
                Users.removeFocus();
                Users.cursorX = Users.ColoumnsCount - 1;
                Users.addFocus();
            } else {
                for (i = (Users.ColoumnsCount - 1); i > -1; i--) {
                    if (main_ThumbNull((Users.cursorY - 1), i, Users.ids[0])) {
                        Users.removeFocus();
                        Users.cursorY--;
                        Users.cursorX = i;
                        Users.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Users.isRemoveDialogShown()) {
                Users.RemoveCursor++;
                if (Users.RemoveCursor > 1) Users.RemoveCursor = 0;
                Users.RemoveCursorSet();
                Users.clearRemoveDialog();
                Users.setRemoveDialog();
            } else if (main_ThumbNull((Users.cursorY), (Users.cursorX + 1), Users.ids[0])) {
                Users.removeFocus();
                Users.cursorX++;
                Users.addFocus();
            } else if (main_ThumbNull((Users.cursorY + 1), 0, Users.ids[0])) {
                Users.removeFocus();
                Users.cursorY++;
                Users.cursorX = 0;
                Users.addFocus();
            } else {
                Users.removeFocus();
                Users.cursorX = 0;
                Users.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Users.ColoumnsCount; i++) {
                if (main_ThumbNull((Users.cursorY - 1), (Users.cursorX - i), Users.ids[0])) {
                    Users.removeFocus();
                    Users.cursorY--;
                    Users.cursorX = Users.cursorX - i;
                    Users.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Users.ColoumnsCount; i++) {
                if (main_ThumbNull((Users.cursorY + 1), (Users.cursorX - i), Users.ids[0])) {
                    Users.removeFocus();
                    Users.cursorY++;
                    Users.cursorX = Users.cursorX - i;
                    Users.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            Users.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            main_Before = main_Users;
            main_Go = main_games;
            Users.exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            main_Before = main_Users;
            main_Go = main_Live;
            Users.exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (Users.isRemoveDialogShown()) {
                // HideRemoveDialog set Users.RemoveCursor to 0, is better to hide befor remove, use temp var
                var temp_RemoveCursor = Users.RemoveCursor;
                Users.HideRemoveDialog();
                if (temp_RemoveCursor) {
                    document.body.removeEventListener("keydown", Users.handleKeyDown);
                    addUser_removeUser(Users.cursorY);
                }
            } else Users.keyEnter();
            break;
        case TvKeyCode.KEY_RED:
            main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Users.exit();
            main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            main_BeforeSearch = main_Users;
            main_Go = main_Search;
            Users.exit();
            main_SwitchScreen();
            break;
        default:
            break;
    }
};
