/*jshint multistr: true */
//Variable initialization
function Users() {}
Users.Thumbnail = 'thumbnail_users_';
Users.cursorY = 0;
Users.cursorX = 0;
Users.LastClickFinish = true;
Users.keyClickDelayTime = 25;

Users.ThumbnailDiv = 'users_thumbnail_div_';
Users.DispNameDiv = 'users_display_name_';
Users.Cell = 'users_cell_';
Users.status = false;
Users.loadingData = true;

//Variable initialization end

Users.init = function() {
    Main.Go = Main.Users;
    Main.HideWarningDialog();
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    document.body.addEventListener("keydown", Users.handleKeyDown, false);
    if (Users.status) Users.ScrollHelper.scrollVerticalToElementById(Users.Thumbnail + Users.cursorY + '_' + Users.cursorX);
    else Users.StartLoad();
};

Users.exit = function() {
    $('#top_bar_user').removeClass('icon_center_focus');
    $('#top_bar_user').addClass('icon_center_label');
    document.body.removeEventListener("keydown", Users.handleKeyDown);
    Main.SwitchScreen();
};

Users.StartLoad = function() {
    Main.HideWarningDialog();
    Users.status = false;
    Users.ScrollHelper.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_user').empty();
    Users.cursorX = 0;
    Users.cursorY = 0;
    Users.loadingData = true;
    Users.loadData();
};

Users.loadData = function() {
    var row = $('<tr></tr>');
    var coloumn_id = 0;

    row.append(Users.createChannelCell(0, coloumn_id, Main.selectedChannelDisplayname, Main.UserName + STR_LIVE_CHANNELS));
    coloumn_id++;
    row.append(Users.createChannelCell(0, coloumn_id, Main.selectedChannelDisplayname, Main.UserName + STR_LIVE_HOSTS));
    coloumn_id++;
    row.append(Users.createChannelCell(0, coloumn_id, Main.selectedChannelDisplayname, Main.UserName + STR_LIVE_GAMES));
    coloumn_id++;
    row.append(Users.createChannelCell(0, coloumn_id, Main.selectedChannelDisplayname, Main.UserName + STR_USER_CHANNEL));
    coloumn_id++;
    row.append(Users.createChannelCell(0, coloumn_id, Main.selectedChannelDisplayname, STR_USER_ADD));
    coloumn_id++;
    row.append(Users.createChannelCell(0, coloumn_id, Main.selectedChannelDisplayname, STR_USER_REMOVE));

    $('#stream_table_user').append(row);

    Users.loadDataSuccessFinish();
};

Users.createChannelCell = function(row_id, coloumn_id, user_name, stream_type) {
    var thumbnail = 'app/images/blur_video_1.png';
    if (coloumn_id === 1) thumbnail = 'app/images/blur_video_2.png';
    if (coloumn_id === 2) thumbnail = 'app/images/blur_game.png';
    if (coloumn_id === 3) thumbnail = 'app/images/blur_vod.png';
    if (coloumn_id === 4) thumbnail = 'app/images/user_plus.png';
    if (coloumn_id === 5) thumbnail = 'app/images/user_minus.png';

    return $('<td id="' + Users.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + user_name + '"></td>').html(
        '<img id="' + Users.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + thumbnail + '"/> \
            <div id="' + Users.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="' + Users.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_user">' + stream_type + '</div> \
            </div>');
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
                Users.ScrollHelper.scrollVerticalToElementById(Users.Thumbnail + Users.cursorY + '_' + Users.cursorX);
            }

            Users.loadingData = false;
        });
};

Users.addFocus = function() {
    $('#' + Users.Thumbnail + Users.cursorY + '_' + Users.cursorX).addClass('stream_thumbnail_focused');
    $('#' + Users.ThumbnailDiv + Users.cursorY + '_' + Users.cursorX).addClass('stream_text_focused');
    $('#' + Users.DispNameDiv + Users.cursorY + '_' + Users.cursorX).addClass('stream_user_focused');
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

    if (Users.cursorX === 0) UserLive.init();
    else if (Users.cursorX === 1) UserHost.init();
    else if (Users.cursorX === 2) UserGames.init();
    else if (Users.cursorX === 3) UserChannels.init();
    else if (Users.cursorX === 5) AddUser.removeUser();
//    else if (Users.cursorX === 4) UserAdd.init();
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
            Main.Go = Main.Live;
            Users.exit();
            break;
        case TvKeyCode.KEY_LEFT:
            Users.removeFocus();
            Users.cursorX--;
            if (Users.cursorX < 0) Users.cursorX = 5;
            Users.addFocus();
            break;
        case TvKeyCode.KEY_RIGHT:
            Users.removeFocus();
            Users.cursorX++;
            if (Users.cursorX > 5) Users.cursorX = 0;
            Users.addFocus();
            break;
        case TvKeyCode.KEY_UP:
        case TvKeyCode.KEY_DOWN:
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
        case TvKeyCode.KEY_CHANNELUP:
            Main.Before = Main.Users;
            Main.Go = Main.Games;
            Users.exit();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Before = Main.Users;
            Main.Go = Main.Live;
            Users.exit();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Users.keyEnter();
            break;
        case TvKeyCode.KEY_RED:
        case TvKeyCode.KEY_GREEN:
        case TvKeyCode.KEY_YELLOW:
            break;
        case TvKeyCode.KEY_BLUE:
            Main.Go = Main.Search;
            Main.RestoreTopLabel();
            document.body.removeEventListener("keydown", Users.handleKeyDown);
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

Users.ScrollHelper = {
    documentVerticalScrollPosition: function() {
        if (self.pageYOffset) return self.pageYOffset; // Firefox, Chrome, Opera, Safari.
        if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop; // Internet Explorer 6 (standards mode).
        if (document.body.scrollTop) return document.body.scrollTop; // Internet Explorer 6, 7 and 8.
        return 0; // None of the above.
    },

    viewportHeight: function() {
        return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight;
    },

    documentHeight: function() {
        return (document.height !== undefined) ? document.height : document.body.offsetHeight;
    },

    documentMaximumScrollPosition: function() {
        return this.documentHeight() - this.viewportHeight();
    },

    elementVerticalClientPositionById: function(id) {
        return document.getElementById(id).getBoundingClientRect().top;
    },

    scrollVerticalToElementById: function(id) {
        if (document.getElementById(id) === null) {
            return;
        }
        if (Main.Go === Main.Users) {
            $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight() + 270);
        } else return;
    }
};
