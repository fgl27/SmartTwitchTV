/*jshint multistr: true */
//Variable initialization
function Users() {}
Users.Thumbnail = 'thumbnail_users_';
Users.cursorY = 0;
Users.cursorX = 0;
Users.LastClickFinish = true;
Users.keyClickDelayTime = 25;
Users.ColoumnsCount = 6;

Users.ThumbnailDiv = 'users_thumbnail_div_';
Users.DispNameDiv = 'users_display_name_';
Users.Cell = 'users_cell_';
Users.status = false;
Users.loadingData = true;
Users.imgMatrix = [];
Users.imgMatrixId = [];
Users.imgMatrixCount = 0;
Users.newImg = new Image();

//Variable initialization end

Users.init = function() {
    Main.Go = Main.Users;
    Main.HideWarningDialog();
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    document.body.addEventListener("keydown", Users.handleKeyDown, false);
    if (Users.status) Main.ScrollHelper.scrollVerticalToElementById(Users.Thumbnail, Users.cursorY, Users.cursorX, Main.Users, Main.ScrollOffSetMinusChannels, 200, true);
    else Users.StartLoad();
};

Users.exit = function() {
    $('#top_bar_user').removeClass('icon_center_focus');
    $('#top_bar_user').addClass('icon_center_label');
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
            STR_CONTENT + ((x === 0) ? STR_USER_NUMBER_ONE : '') + '</div>');
        $('#stream_table_user').find('tbody').append(header);

        row = $('<tr></tr>');

        row.append(Users.createChannelCell(x, coloumn_id, Main.selectedChannelDisplayname, STR_LIVE_CHANNELS));
        coloumn_id++;
        row.append(Users.createChannelCell(x, coloumn_id, Main.selectedChannelDisplayname, STR_LIVE_HOSTS));
        coloumn_id++;
        row.append(Users.createChannelCell(x, coloumn_id, Main.selectedChannelDisplayname, STR_LIVE_GAMES));
        coloumn_id++;
        row.append(Users.createChannelCell(x, coloumn_id, Main.selectedChannelDisplayname, STR_USER_CHANNEL));
        coloumn_id++;
        row.append(Users.createChannelCell(x, coloumn_id, Main.selectedChannelDisplayname, (x === 0) ? STR_USER_ADD : STR_USER_MAKE_ONE));
        coloumn_id++;
        row.append(Users.createChannelCell(x, coloumn_id, Main.selectedChannelDisplayname, STR_USER_REMOVE));

        $('#stream_table_user').append(row);
    }

    Users.loadDataSuccessFinish();
};

Users.createChannelCell = function(row_id, coloumn_id, user_name, stream_type) {
    var thumbnail = IMG_BLUR_VIDEO1;
    if (coloumn_id === 1) thumbnail = IMG_BLUR_VIDEO2;
    if (coloumn_id === 2) thumbnail = IMG_BLUR_GAME;
    if (coloumn_id === 3) thumbnail = IMG_BLUR_VOD;
    if (coloumn_id === 4) thumbnail = (row_id === 0) ? IMG_USER_PLUS : IMG_USER_UP;
    if (coloumn_id === 5) thumbnail = IMG_USER_MINUS;

    Users.imgMatrix[Users.imgMatrixCount] = thumbnail;
    Users.imgMatrixId[Users.imgMatrixCount] = Users.Thumbnail + row_id + '_' + coloumn_id;
    Users.imgMatrixCount++;

    Users.newImg.src = thumbnail; //try to pre cache the img

    return $('<td id="' + Users.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + user_name + '"></td>').html(
        '<img id="' + Users.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_VIDEO + '"/>' +
        '<div id="' + Users.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + Users.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_user">' + stream_type + '</div></div>');
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
Users.loadDataSuccessFinish = function() {
    $('#stream_table_user').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!Users.status) {
                Main.HideLoadDialog();
                Users.status = true;
                Users.addFocus();
            }

            Main.LoadImages(Users.imgMatrix, Users.imgMatrixId, IMG_404_VIDEO);

            Users.loadingData = false;
        });
};

Users.addFocus = function() {
    $('#' + Users.Thumbnail + Users.cursorY + '_' + Users.cursorX).addClass('stream_thumbnail_focused');
    $('#' + Users.ThumbnailDiv + Users.cursorY + '_' + Users.cursorX).addClass('stream_text_focused');
    $('#' + Users.DispNameDiv + Users.cursorY + '_' + Users.cursorX).addClass('stream_user_focused');
    Main.ScrollHelper.scrollVerticalToElementById(Users.Thumbnail, Users.cursorY, Users.cursorX, Main.Users, Main.ScrollOffSetMinusChannels, 200, true);
};

Users.removeFocus = function() {
    $('#' + Users.Thumbnail + Users.cursorY + '_' + Users.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + Users.ThumbnailDiv + Users.cursorY + '_' + Users.cursorX).removeClass('stream_text_focused');
    $('#' + Users.DispNameDiv + Users.cursorY + '_' + Users.cursorX).removeClass('stream_user_focused');
};

Users.keyClickDelay = function() {
    Users.LastClickFinish = true;
};

Users.keyEnter = function() {
    document.body.removeEventListener("keydown", Users.handleKeyDown);
    Main.UserName = AddUser.UsernameArray[Users.cursorY];

    if (Users.cursorX === 0) UserLive.init();
    else if (Users.cursorX === 1) UserHost.init();
    else if (Users.cursorX === 2) UserGames.init();
    else if (Users.cursorX === 3) UserChannels.init();
    else if (Users.cursorX === 4) {
        if (Users.cursorY === 0) AddUser.init();
        else AddUser.UserMakeOne(Users.cursorY);
    } else if (Users.cursorX === 5) AddUser.removeUser(Users.cursorY);
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

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                Main.Go = Main.Live;
                Users.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((Users.cursorY), (Users.cursorX - 1), Users.Thumbnail)) {
                Users.removeFocus();
                Users.cursorX--;
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
            if (Main.ThumbNull((Users.cursorY), (Users.cursorX + 1), Users.Thumbnail)) {
                Users.removeFocus();
                Users.cursorX++;
                Users.addFocus();
            } else if (Main.ThumbNull((Users.cursorY + 1), 0, Users.Thumbnail)) {
                Users.removeFocus();
                Users.cursorY++;
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
            Users.keyEnter();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Main.Go = Main.Live;
            Users.exit();
            Main.SwitchScreen();
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
        case TvKeyCode.KEY_VOLUMEUP:
        case TvKeyCode.KEY_VOLUMEDOWN:
        case TvKeyCode.KEY_MUTE:
            break;
        default:
            break;
    }
};
