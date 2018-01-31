/*jshint multistr: true */
//Variable initialization
function UserGames() {}
UserGames.Thumbnail = 'thumbnail_glive_';
UserGames.EmptyCell = 'glive_empty_';
UserGames.cursorY = 0;
UserGames.cursorX = 0;
UserGames.dataEnded = false;
UserGames.itemsCount = 0;
UserGames.imgMatrix = [];
UserGames.imgMatrixId = [];
UserGames.imgMatrixCount = 0;
UserGames.nameMatrix = [];
UserGames.nameMatrixCount = 0;
UserGames.loadingData = false;
UserGames.loadingDataTry = 0;
UserGames.loadingDataTryMax = 10;
UserGames.loadingDataTimeout = 3500;
UserGames.isDialogOn = false;
UserGames.ItemsLimit = 100;
UserGames.ColoumnsCount = 5;
UserGames.ItemsReloadLimit = Math.floor((UserGames.ItemsLimit / UserGames.ColoumnsCount) / 2);
UserGames.newImg = new Image();
UserGames.blankCellCount = 0;
UserGames.itemsCountOffset = 0;
UserGames.LastClickFinish = true;
UserGames.keyClickDelayTime = 25;
UserGames.ReplacedataEnded = false;
UserGames.MaxOffset = 0;

UserGames.ThumbnailDiv = 'glive_thumbnail_div_';
UserGames.DispNameDiv = 'glive_display_name_';
UserGames.ViwersDiv = 'glive_viwers_';
UserGames.Cell = 'glive_cell_';
UserGames.status = false;
UserGames.followerChannels = '';
UserGames.OldUserName = '';

//Variable initialization end

UserGames.init = function() {
    Main.Go = Main.UserGames;
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    document.getElementById("id_agame_name").style.paddingLeft = "44%";
    $('.label_agame_name').html(Main.UserName + STR_LIVE_GAMES);
    document.body.addEventListener("keydown", UserGames.handleKeyDown, false);
    if (UserGames.OldUserName !== Main.UserName) UserGames.status = false;
    if (UserGames.status) Main.ScrollHelper.scrollVerticalToElementById(UserGames.Thumbnail, UserGames.cursorY, UserGames.cursorX, Main.UserGames, Main.ScrollOffSetMinusGame, Main.ScrollOffSetGame, false);
    else UserGames.StartLoad();
};

UserGames.exit = function() {
    $('#top_bar_user').removeClass('icon_center_focus');
    $('#top_bar_user').addClass('icon_center_label');
    $('.label_agame_name').html('');
    document.getElementById("id_agame_name").style.paddingLeft = "50%";
    document.body.removeEventListener("keydown", UserGames.handleKeyDown);
};

UserGames.StartLoad = function() {
    Main.HideWarningDialog();
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    UserGames.OldUserName = Main.UserName;
    UserGames.status = false;
    $('#stream_table_user_games').empty();
    UserGames.loadingMore = false;
    UserGames.blankCellCount = 0;
    UserGames.itemsCountOffset = 0;
    UserGames.ReplacedataEnded = false;
    UserGames.MaxOffset = 0;
    UserGames.nameMatrix = [];
    UserGames.nameMatrixCount = 0;
    UserGames.itemsCount = 0;
    UserGames.cursorX = 0;
    UserGames.cursorY = 0;
    UserGames.dataEnded = false;
    UserGames.loadData();
};

UserGames.loadData = function() {
    UserGames.imgMatrix = [];
    UserGames.imgMatrixId = [];
    UserGames.imgMatrixCount = 0;
    UserGames.loadingData = true;
    UserGames.loadingDataTry = 0;
    UserGames.loadingDataTimeout = 3500;
    UserGames.loadChannels();
};

UserGames.loadChannels = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = UserGames.itemsCount + UserGames.itemsCountOffset;
        if (offset !== 0 && offset >= (UserGames.MaxOffset - UserGames.ItemsLimit)) {
            offset = UserGames.MaxOffset - UserGames.ItemsLimit;
            UserGames.dataEnded = true;
            UserGames.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/api/users/' + encodeURIComponent(Main.UserName) + '/follows/games/live?limit=' +
            UserLive.ItemsLimit + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserGames.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        UserGames.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    UserGames.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserGames.loadDataError();
    }
};

UserGames.loadDataError = function() {
    UserGames.loadingDataTry++;
    if (UserGames.loadingDataTry < UserGames.loadingDataTryMax) {
        UserGames.loadingDataTimeout += (UserGames.loadingDataTry < 5) ? 250 : 3500;
        UserGames.loadChannels();
    } else {
        UserGames.loadingData = false;
        UserGames.loadingMore = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

UserGames.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.follows.length;
    UserGames.MaxOffset = parseInt(response._total);

    if (response_items < UserGames.ItemsLimit) UserGames.dataEnded = true;

    var offset_itemsCount = UserGames.itemsCount;
    UserGames.itemsCount += response_items;

    var response_rows = response_items / UserGames.ColoumnsCount;
    if (response_items % UserGames.ColoumnsCount > 0) response_rows++;

    var coloumn_id, row_id, row, cell, follows,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / UserGames.ColoumnsCount + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < UserGames.ColoumnsCount && cursor < response_items; coloumn_id++, cursor++) {
            follows = response.follows[cursor];
            if (UserGames.CellExists(follows.game.name)) coloumn_id--;
            else {
                cell = UserGames.createCell(row_id, coloumn_id, follows.game.name, follows.game.box.template,
                    Main.addCommas(follows.channels) + ' ' + STR_CHANNELS + ' for ' + Main.addCommas(follows.viewers) + STR_VIEWER);
                row.append(cell);
            }
        }
        for (coloumn_id; coloumn_id < UserGames.ColoumnsCount; coloumn_id++) {
            row.append(UserGames.createCellEmpty(row_id, coloumn_id));
        }
        $('#stream_table_user_games').append(row);
    }

    UserGames.loadDataSuccessFinish();
};

UserGames.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="' + UserGames.EmptyCell + row_id + '_' + coloumn_id + '" class="follows_cell" data-channelname=""></td>').html('');
};

UserGames.createCell = function(row_id, coloumn_id, game_name, preview_thumbnail, viwers) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "481x672");

    UserGames.imgMatrix[UserGames.imgMatrixCount] = preview_thumbnail;
    UserGames.imgMatrixId[UserGames.imgMatrixCount] = UserGames.Thumbnail + row_id + '_' + coloumn_id;
    UserGames.imgMatrixCount++;

    if (UserGames.imgMatrixCount <= (UserGames.ColoumnsCount * 3)) UserGames.newImg.src = preview_thumbnail; //try to pre cache first 4 rows

    UserGames.nameMatrix[UserGames.nameMatrixCount] = game_name;
    UserGames.nameMatrixCount++;

    return $('<td id="' + UserGames.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + game_name + '"></td>').html(
        '<img id="' + UserGames.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_GAME + '"/>' +
        '<div id="' + UserGames.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + UserGames.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + game_name + '</div>' +
        '<div id="' + UserGames.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 100%; display: inline-block;">' +
        viwers + '</div></div>');
};

UserGames.CellExists = function(display_name) {
    for (var i = 0; i <= UserGames.nameMatrixCount; i++) {
        if (display_name == UserGames.nameMatrix[i]) {
            UserGames.blankCellCount++;
            return true;
        }
    }
    return false;
};

//prevent follows_text/title/info from load before the thumbnail and display a odd follows_table squashed only with names source
//https://imagesloaded.desandro.com/
UserGames.loadDataSuccessFinish = function() {
    $('#stream_table_user_games').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!UserGames.status) {
                Main.HideLoadDialog();
                UserGames.status = true;
                UserGames.addFocus();
            }

            Main.LoadImages(UserGames.imgMatrix, UserGames.imgMatrixId, IMG_404_GAME);

            if (UserGames.blankCellCount > 0 && !UserGames.dataEnded) {
                UserGames.loadingMore = true;
                UserGames.loadDataReplace();
                return;
            } else UserGames.blankCellCount = 0;

            UserGames.loadingData = false;
            UserGames.loadingMore = false;
        });
};

UserGames.loadDataReplace = function() {
    UserGames.imgMatrix = [];
    UserGames.imgMatrixId = [];
    UserGames.imgMatrixCount = 0;
    UserGames.loadingData = true;
    UserGames.loadingDataTry = 0;
    UserGames.loadingDataTimeout = 3500;
    UserGames.loadChannelsReplace();
};

UserGames.loadChannelsReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = UserGames.itemsCount + UserGames.itemsCountOffset;
        if (offset !== 0 && offset >= (UserGames.MaxOffset - UserGames.ItemsLimit)) {
            offset = UserGames.MaxOffset - UserGames.ItemsLimit;
            UserGames.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/follows?game=' + encodeURIComponent(Main.gameSelected) +
            '&limit=' + UserGames.ItemsLimit + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserGames.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        UserGames.loadDataSuccessReplace(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserGames.loadDataErrorReplace();
    }
};

UserGames.loadDataErrorReplace = function() {
    UserGames.loadingDataTry++;
    if (UserGames.loadingDataTry < UserGames.loadingDataTryMax) {
        UserGames.loadingDataTimeout += (UserGames.loadingDataTry < 5) ? 250 : 3500;
        UserGames.loadChannelsReplace();
    }
};

UserGames.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.follows.length;
    UserGames.MaxOffset = parseInt(response._total);

    if (response_items < UserGames.ItemsLimit) UserGames.ReplacedataEnded = true;

    var row_id = UserGames.itemsCount / UserGames.ColoumnsCount;

    var coloumn_id, follows, mReplace = false,
        cursor = 0;

    for (cursor; cursor < response_items; cursor++) {
        follows = response.follows[cursor];
        if (UserGames.CellExists(follows.game.name)) UserGames.blankCellCount--;
        else {
            mReplace = UserGames.replaceCellEmpty(row_id, coloumn_id, follows.game.name, follows.game.box.template,
                Main.addCommas(follows.channels) + ' ' + STR_CHANNELS + ' for ' + Main.addCommas(follows.viewers) + STR_VIEWER);
            if (mReplace) UserGames.blankCellCount--;
            if (UserGames.blankCellCount === 0) break;
        }
    }
    UserGames.itemsCountOffset += cursor;
    if (UserGames.ReplacedataEnded) UserGames.blankCellCount = 0;
    UserGames.loadDataSuccessFinish();
};

UserGames.replaceCellEmpty = function(row_id, coloumn_id, game_name, preview_thumbnail, viwers) {
    var my = 0,
        mx = 0;
    if (row_id < ((UserGames.ItemsLimit / UserGames.ColoumnsCount) - 1)) return false;
    for (my = row_id - (1 + Math.ceil(UserGames.blankCellCount / UserGames.ColoumnsCount)); my < row_id; my++) {
        for (mx = 0; mx < UserGames.ColoumnsCount; mx++) {
            if (!Main.ThumbNull(my, mx, UserGames.Thumbnail) && (Main.ThumbNull(my, mx, UserGames.EmptyCell))) {
                row_id = my;
                coloumn_id = mx;
                preview_thumbnail = preview_thumbnail.replace("{width}x{height}", "481x672");
                UserGames.nameMatrix[UserGames.nameMatrixCount] = game_name;
                UserGames.nameMatrixCount++;
                document.getElementById(UserGames.EmptyCell + row_id + '_' + coloumn_id).setAttribute('id', UserGames.Cell + row_id + '_' + coloumn_id);
                document.getElementById(UserGames.Cell + row_id + '_' + coloumn_id).setAttribute('data-channelname', game_name);
                document.getElementById(UserGames.Cell + row_id + '_' + coloumn_id).innerHTML =
                    '<img id="' + UserGames.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + preview_thumbnail + '"/>' +
                    '<div id="' + UserGames.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
                    '<div id="' + UserGames.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + game_name + '</div>' +
                    '<div id="' + UserGames.followsTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + follows_title + '</div>' +
                    '<div id="' + UserGames.followsGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + follows_game + '</div>' +
                    '<div id="' + UserGames.ViwersDiv + row_id + '_' + coloumn_id +
                    '"class="stream_info_games" style="width: 100%; display: inline-block;">' + viwers +
                    '</div></div>';
                return true;
            }
        }
    }

    return false;
};

UserGames.addFocus = function() {
    if (((UserGames.cursorY + UserGames.ItemsReloadLimit) > (UserGames.itemsCount / UserGames.ColoumnsCount)) &&
        !UserGames.dataEnded && !UserGames.loadingMore) {
        UserGames.loadingMore = true;
        UserGames.loadData();
    }

    $('#' + UserGames.Thumbnail + UserGames.cursorY + '_' + UserGames.cursorX).addClass('stream_thumbnail_focused');
    $('#' + UserGames.ThumbnailDiv + UserGames.cursorY + '_' + UserGames.cursorX).addClass('stream_text_focused');
    $('#' + UserGames.DispNameDiv + UserGames.cursorY + '_' + UserGames.cursorX).addClass('stream_channel_focused');
    $('#' + UserGames.ViwersDiv + UserGames.cursorY + '_' + UserGames.cursorX).addClass('stream_info_focused');
    window.setTimeout(function() {
        Main.ScrollHelper.scrollVerticalToElementById(UserGames.Thumbnail, UserGames.cursorY, UserGames.cursorX, Main.UserGames, Main.ScrollOffSetMinusGame, Main.ScrollOffSetGame, false);
    }, 10);
};

UserGames.removeFocus = function() {
    $('#' + UserGames.Thumbnail + UserGames.cursorY + '_' + UserGames.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + UserGames.ThumbnailDiv + UserGames.cursorY + '_' + UserGames.cursorX).removeClass('stream_text_focused');
    $('#' + UserGames.DispNameDiv + UserGames.cursorY + '_' + UserGames.cursorX).removeClass('stream_channel_focused');
    $('#' + UserGames.ViwersDiv + UserGames.cursorY + '_' + UserGames.cursorX).removeClass('stream_info_focused');
};

UserGames.keyClickDelay = function() {
    UserGames.LastClickFinish = true;
};

UserGames.handleKeyDown = function(event) {
    if (UserGames.loadingData && !UserGames.loadingMore) {
        event.preventDefault();
        return;
    } else if (!UserGames.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        UserGames.LastClickFinish = false;
        window.setTimeout(UserGames.keyClickDelay, UserGames.keyClickDelayTime);
    }

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                Main.Go = Main.Users;
                UserGames.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((UserGames.cursorY), (UserGames.cursorX - 1), UserGames.Thumbnail)) {
                UserGames.removeFocus();
                UserGames.cursorX--;
                UserGames.addFocus();
            } else {
                for (i = (UserGames.ColoumnsCount - 1); i > -1; i--) {
                    if (Main.ThumbNull((UserGames.cursorY - 1), i, UserGames.Thumbnail)) {
                        UserGames.removeFocus();
                        UserGames.cursorY--;
                        UserGames.cursorX = i;
                        UserGames.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.ThumbNull((UserGames.cursorY), (UserGames.cursorX + 1), UserGames.Thumbnail)) {
                UserGames.removeFocus();
                UserGames.cursorX++;
                UserGames.addFocus();
            } else if (Main.ThumbNull((UserGames.cursorY + 1), 0, UserGames.Thumbnail)) {
                UserGames.removeFocus();
                UserGames.cursorY++;
                UserGames.cursorX = 0;
                UserGames.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < UserGames.ColoumnsCount; i++) {
                if (Main.ThumbNull((UserGames.cursorY - 1), (UserGames.cursorX - i), UserGames.Thumbnail)) {
                    UserGames.removeFocus();
                    UserGames.cursorY--;
                    UserGames.cursorX = UserGames.cursorX - i;
                    UserGames.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < UserGames.ColoumnsCount; i++) {
                if (Main.ThumbNull((UserGames.cursorY + 1), (UserGames.cursorX - i), UserGames.Thumbnail)) {
                    UserGames.removeFocus();
                    UserGames.cursorY++;
                    UserGames.cursorX = UserGames.cursorX - i;
                    UserGames.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!UserGames.loadingMore) UserGames.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            Main.Go = Main.UserChannels;
            UserGames.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = Main.UserHost;
            UserGames.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Main.gameSelected = $('#' + UserGames.Cell + UserGames.cursorY + '_' + UserGames.cursorX).attr('data-channelname');
            Main.Before = Main.UserGames;
            Main.Go = Main.AGame;
            UserGames.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Main.Go = Main.Live;
            UserGames.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.UserGames;
            Main.Go = Main.Search;
            UserGames.exit();
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
