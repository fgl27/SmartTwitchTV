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

Users.Img = 'img_users';
Users.Thumbnail = 'thumbnail_users_';
Users.ThumbnailDiv = 'users_thumbnail_div_';
Users.DispNameDiv = 'users_display_name_';
Users.Cell = 'users_cell_';
Users.status = false;
Users.loadingData = true;
Users.imgMatrix = [];
Users.imgMatrixId = [];
Users.imgMatrixCount = 0;

//Variable initialization end

Users.init = function() {
    Main.Go = Main.Users;
    Main.HideWarningDialog();
    $('#top_bar_user').addClass('icon_center_focus');
    document.body.addEventListener("keydown", Users.handleKeyDown, false);
    if (Users.status) Main.ScrollHelper.scrollVerticalToElementById(Users.Thumbnail, Users.cursorY, Users.cursorX, Main.Users, Main.ScrollOffSetMinusChannels, 160, true);
    else Users.StartLoad();
};

Users.exit = function() {
    AddCode.SetDefaultOAuth(0);
    $('#top_bar_user').removeClass('icon_center_focus');
    document.body.removeEventListener("keydown", Users.handleKeyDown);
};

Users.StartLoad = function() {
    Main.HideWarningDialog();
    Users.status = false;
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_user').empty();
    Users.imgMatrix = [];
    Users.imgMatrixId = [];
    Users.imgMatrixCount = 0;
    Users.cursorX = 0;
    Users.cursorY = 0;
    Users.loadingData = true;
    Users.loadData();
};

Users.loadData = function() {
    var row, coloumn_id, tbody = $('<tbody></tbody>'),
        header;
    $('#stream_table_user').append(tbody);

    for (var x = 0; x < AddUser.UsernameArray.length; x++) {
        coloumn_id = 0;
        Main.UserName = AddUser.UsernameArray[x];

        header = $('<tr class="follower_header"></tr>').html('<div class="follower_header">' + Main.UserName +
            STR_CONTENT + (!x ? STR_USER_NUMBER_ONE : '') + '</div>');
        $('#stream_table_user').find('tbody').append(header);

        row = $('<tr></tr>');

        row.append(Users.createChannelCell(x, coloumn_id, Main.selectedChannelDisplayname, STR_LIVE_CHANNELS, IMG_BLUR_VIDEO1));
        coloumn_id++;
        row.append(Users.createChannelCell(x, coloumn_id, Main.selectedChannelDisplayname, STR_LIVE_HOSTS, IMG_BLUR_VIDEO2));
        coloumn_id++;
        row.append(Users.createChannelCell(x, coloumn_id, Main.selectedChannelDisplayname, STR_LIVE_GAMES, IMG_BLUR_GAME));
        coloumn_id++;
        row.append(Users.createChannelCell(x, coloumn_id, Main.selectedChannelDisplayname, STR_USER_CHANNEL, IMG_BLUR_VOD));
        coloumn_id++;
        if (!x) row.append(Users.createChannelCell(x, coloumn_id, Main.selectedChannelDisplayname, STR_USER_ADD, IMG_USER_PLUS));
        else row.append(Users.createChannelCell(x, coloumn_id, Main.selectedChannelDisplayname, STR_USER_MAKE_ONE, IMG_USER_UP));
        coloumn_id++;
        row.append(Users.createChannelCell(x, coloumn_id, Main.selectedChannelDisplayname, STR_USER_REMOVE, IMG_USER_MINUS));
        coloumn_id++;
        row.append(Users.createChannelCell(x, coloumn_id, Main.selectedChannelDisplayname, (AddCode.UserCodeExist(Main.UserName) > -1 ? STR_USER_CODE_OK : STR_USER_CODE), IMG_USER_CODE));

        $('#stream_table_user').append(row);
    }

    Users.loadDataSuccessFinish();
};

Users.createChannelCell = function(row_id, coloumn_id, user_name, stream_type, preview_thumbnail) {
    Users.imgMatrix[Users.imgMatrixCount] = preview_thumbnail;
    Users.imgMatrixId[Users.imgMatrixCount] = Users.Img + row_id + '_' + coloumn_id;
    Users.imgMatrixCount++;

    Main.PreLoadAImage(preview_thumbnail);

    return $('<td id="' + Users.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + user_name + '"></td>').html(
        '<div id="' + Users.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_channel" ><img id="' + Users.Img + row_id + '_' +
        coloumn_id + '" class="stream_img"></div>' +
        '<div id="' + Users.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + Users.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_info_user">' + stream_type + '</div></div>');
};

Users.loadDataSuccessFinish = function() {
    $(document).ready(function() {
        if (!Users.status) {
            Main.HideLoadDialog();
            Users.status = true;
            if (AddCode.UsercodeArray.length > 0) Users.checkTitleStart();
            Users.addFocus();
        }

        Main.LoadImages(Users.imgMatrix, Users.imgMatrixId, IMG_404_VIDEO);

        Users.loadingData = false;
    });
};

Users.checkTitleStart = function() {
    for (var x = 0; x < AddUser.UsernameArray.length; x++) Users.checkTitleRun(x);
};

Users.checkTitleRun = function(position) {
    AddCode.loadingDataTry = 0;
    AddCode.loadingDataTimeout = 10000;
    AddCode.CheckTokenStart(position);
};

Users.SetKeyTitleStart = function(bool, position) {
    document.getElementById(Users.DispNameDiv + position + '_' + 6).innerHTML = bool ? STR_USER_CODE_OK : STR_USER_CODE;
    if (!bool) {
        var user = AddCode.UserCodeExist(AddUser.UsernameArray[position]);
        if (user > -1) AddCode.removeUser(user);
    }
};

Users.addFocus = function() {
    $('#' + Users.Thumbnail + Users.cursorY + '_' + Users.cursorX).addClass('stream_thumbnail_focused');
    $('#' + Users.ThumbnailDiv + Users.cursorY + '_' + Users.cursorX).addClass('stream_text_focused');
    $('#' + Users.DispNameDiv + Users.cursorY + '_' + Users.cursorX).addClass('stream_info_focused');
    Main.ScrollHelper.scrollVerticalToElementById(Users.Thumbnail, Users.cursorY, Users.cursorX, Main.Users, Main.ScrollOffSetMinusChannels, 160, true);
};

Users.removeFocus = function() {
    $('#' + Users.Thumbnail + Users.cursorY + '_' + Users.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + Users.ThumbnailDiv + Users.cursorY + '_' + Users.cursorX).removeClass('stream_text_focused');
    $('#' + Users.DispNameDiv + Users.cursorY + '_' + Users.cursorX).removeClass('stream_info_focused');
};

Users.keyClickDelay = function() {
    Users.LastClickFinish = true;
};

Users.keyEnter = function() {
    if (Users.cursorX !== 5) document.body.removeEventListener("keydown", Users.handleKeyDown);
    Main.UserName = AddUser.UsernameArray[Users.cursorY];
    AddCode.SetDefaultOAuth(Users.cursorY);

    if (!Users.cursorX) UserLive.init();
    else if (Users.cursorX === 1) UserHost.init();
    else if (Users.cursorX === 2) UserGames.init();
    else if (Users.cursorX === 3) UserChannels.init();
    else if (Users.cursorX === 4) {
        if (!Users.cursorY) AddUser.init();
        else AddUser.UserMakeOne(Users.cursorY);
    } else if (Users.cursorX === 5) Users.showRemoveDialog();
    else if (Users.cursorX === 6) AddCode.init();
};

Users.checkKey = function(responseText) {
    var json = JSON.parse(responseText);
    var scopes = json.token.authorization.scopes;
    var scopesToTest = '';
    for (var i = 0; i < scopes.length; i++) {
        scopesToTest += scopes[i];
    }
    return scopesToTest.indexOf('user_follows_edit') !== -1 && scopesToTest.indexOf('user_subscriptions') !== -1 && json.token.user_name + '' === Main.UserName && json.token.valid + '' === 'true';
};

Users.SetKeyTitle = function(bool) {
    document.getElementById(Users.DispNameDiv + Users.cursorY + '_' + Users.cursorX).innerHTML = bool ? STR_USER_CODE_OK : STR_USER_CODE;
    if (!bool) {
        var user = AddCode.UserCodeExist(AddUser.UsernameArray[Users.cursorY]);
        if (user > -1) AddCode.removeUser(user);
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
    document.getElementById("main_dialog_remove").innerHTML = STR_REMOVE_USER + STR_BR + Main.UserName + '?';
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
        $('#remove_cancel').addClass('button_search_focused');
        $('#remove_yes').removeClass('button_search_focused');
    } else {
        $('#remove_cancel').removeClass('button_search_focused');
        $('#remove_yes').addClass('button_search_focused');
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
            } else if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                Main.Go = Main.Live;
                Users.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Users.isRemoveDialogShown()) {
                Users.RemoveCursor--;
                if (Users.RemoveCursor < 0) Users.RemoveCursor = 1;
                Users.RemoveCursorSet();
                Users.clearRemoveDialog();
                Users.setRemoveDialog();
            } else if (Main.ThumbNull((Users.cursorY), (Users.cursorX - 1), Users.Thumbnail)) {
                Users.removeFocus();
                Users.cursorX--;
                Users.addFocus();
            } else if (!Main.ThumbNull((Users.cursorY - 1), 0, Users.Thumbnail)) {
                Users.removeFocus();
                Users.cursorX = Users.ColoumnsCount - 1;
                Users.addFocus();
            } else {
                for (i = (Users.ColoumnsCount - 1); i > -1; i--) {
                    if (Main.ThumbNull((Users.cursorY - 1), i, Users.Thumbnail)) {
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
            } else if (Main.ThumbNull((Users.cursorY), (Users.cursorX + 1), Users.Thumbnail)) {
                Users.removeFocus();
                Users.cursorX++;
                Users.addFocus();
            } else if (Main.ThumbNull((Users.cursorY + 1), 0, Users.Thumbnail)) {
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
                if (Main.ThumbNull((Users.cursorY - 1), (Users.cursorX - i), Users.Thumbnail)) {
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
                if (Main.ThumbNull((Users.cursorY + 1), (Users.cursorX - i), Users.Thumbnail)) {
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
            Main.Before = Main.Users;
            Main.Go = Main.Games;
            Users.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Before = Main.Users;
            Main.Go = Main.Live;
            Users.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
        console.log("KEY_ENTER");
            if (Users.isRemoveDialogShown()) {
                console.log("if");
                // HideRemoveDialog set Users.RemoveCursor to 0, is better to hide befor remove, use temp var
                var temp_RemoveCursor = Users.RemoveCursor;
                Users.HideRemoveDialog();
                if (temp_RemoveCursor) {
                    document.body.removeEventListener("keydown", Users.handleKeyDown);
                    AddUser.removeUser(Users.cursorY);
                }
            } else Users.keyEnter();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Users.exit();
            Main.GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.Users;
            Main.Go = Main.Search;
            Users.exit();
            Main.SwitchScreen();
            break;
        default:
            break;
    }
};
