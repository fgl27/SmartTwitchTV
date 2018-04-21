/*jshint multistr: true */
//Variable initialization
function UserGames() {}
UserGames.cursorY = 0;
UserGames.cursorX = 0;
UserGames.dataEnded = false;
UserGames.itemsCount = 0;
UserGames.nameMatrix = [];
UserGames.blankCellVector = [];
UserGames.loadingData = false;
UserGames.loadingDataTry = 0;
UserGames.loadingDataTryMax = 10;
UserGames.loadingDataTimeout = 3500;
UserGames.isDialogOn = false;
UserGames.blankCellCount = 0;
UserGames.itemsCountOffset = 0;
UserGames.LastClickFinish = true;
UserGames.keyClickDelayTime = 25;
UserGames.ReplacedataEnded = false;
UserGames.MaxOffset = 0;
UserGames.emptyContent = false;
UserGames.itemsCountCheck = false;
UserGames.live = true;

UserGames.Img = 'img_glive';
UserGames.Thumbnail = 'thumbnail_glive_';
UserGames.EmptyCell = 'gliveempty_';
UserGames.ThumbnailDiv = 'glive_thumbnail_div_';
UserGames.DispNameDiv = 'glive_display_name_';
UserGames.ViwersDiv = 'glive_viwers_';
UserGames.Cell = 'glive_cell_';
UserGames.Status = false;
UserGames.followerChannels = '';
UserGames.OldUserName = '';

//Variable initialization end

UserGames.init = function() {
    Main.Go = Main.UserGames;
    Main.IconLoad('label_refresh', 'icon-refresh', STR_USER_GAMES_CHANGE + STR_LIVE_GAMES + '/' + STR_FALLOW_GAMES + STR_GUIDE);
    document.getElementById('top_bar_user').innerHTML = STR_USER + Main.UnderCenter(Main.UserName + ' ' + (UserGames.live ? STR_LIVE_GAMES : STR_FALLOW_GAMES));
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    document.body.addEventListener("keydown", UserGames.handleKeyDown, false);
    Main.YRst(UserGames.cursorY);
    if (UserGames.OldUserName !== Main.UserName) UserGames.Status = false;
    if (UserGames.Status) {
        Main.ScrollHelper.scrollVerticalToElementById(UserGames.Thumbnail, UserGames.cursorY, UserGames.cursorX, Main.UserGames,
            Main.ScrollOffSetMinusGame, Main.ScrollOffSetGame, false);
        Main.CounterDialog(UserGames.cursorX, UserGames.cursorY, Main.ColoumnsCountGame, UserGames.itemsCount);
    } else UserGames.StartLoad();
};

UserGames.exit = function() {
    Main.IconLoad('label_refresh', 'icon-refresh', STR_REFRESH);
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.getElementById('top_bar_user').innerHTML = STR_USER;
    document.body.removeEventListener("keydown", UserGames.handleKeyDown);
};

UserGames.StartLoad = function() {
    Main.HideWarningDialog();
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    UserGames.OldUserName = Main.UserName;
    UserGames.Status = false;
    $('#stream_table_user_games').empty();
    UserGames.loadingMore = false;
    UserGames.blankCellCount = 0;
    UserGames.itemsCountOffset = 0;
    UserGames.ReplacedataEnded = false;
    UserGames.MaxOffset = 0;
    UserGames.nameMatrix = [];
    UserGames.blankCellVector = [];
    UserGames.itemsCountCheck = false;
    UserGames.itemsCount = 0;
    UserGames.cursorX = 0;
    UserGames.cursorY = 0;
    UserGames.dataEnded = false;
    Main.CounterDialogRst();
    UserGames.loadDataPrepare();
    UserGames.loadDataRequest();
};

UserGames.loadDataPrepare = function() {
    UserGames.loadingData = true;
    UserGames.loadingDataTry = 0;
    UserGames.loadingDataTimeout = 3500;
};

UserGames.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = UserGames.itemsCount + UserGames.itemsCountOffset;
        if (offset && offset > (UserGames.MaxOffset - 1)) {
            offset = UserGames.MaxOffset - Main.ItemsLimitGame;
            UserGames.dataEnded = true;
            UserGames.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/api/users/' + encodeURIComponent(Main.UserName) + '/follows/games' + (UserGames.live ? '/live' : '') +
            '?limit=' + Main.ItemsLimitGame + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserGames.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserGames.loadDataSuccess(xmlHttp.responseText);
                    return;
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
        UserGames.loadDataRequest();
    } else {
        UserGames.loadingData = false;
        UserGames.loadingMore = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

UserGames.loadDataSuccess = function(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.follows.length;
    UserGames.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitGame) UserGames.dataEnded = true;

    var offset_itemsCount = UserGames.itemsCount;
    UserGames.itemsCount += response_items;

    UserGames.emptyContent = !UserGames.itemsCount;

    var response_rows = response_items / Main.ColoumnsCountGame;
    if (response_items % Main.ColoumnsCountGame > 0) response_rows++;

    var coloumn_id, row_id, row, cell, follows,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountGame + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountGame && cursor < response_items; coloumn_id++, cursor++) {
            follows = response.follows[cursor];
            if (UserGames.live) {
                if (UserGames.CellExists(follows.game.name)) coloumn_id--;
                else {
                    cell = UserGames.createCell(row_id, coloumn_id, follows.game.name, follows.game.box.template,
                        Main.addCommas(follows.channels) + ' ' + STR_CHANNELS + STR_FOR + Main.addCommas(follows.viewers) + STR_VIEWER);
                    row.append(cell);
                }
            } else {
                if (UserGames.CellExists(follows.name)) coloumn_id--;
                else {
                    cell = UserGames.createCell(row_id, coloumn_id, follows.name, follows.box.template, '');
                    row.append(cell);
                }
            }
        }
        for (coloumn_id; coloumn_id < Main.ColoumnsCountGame; coloumn_id++) {
            if (UserGames.dataEnded && !UserGames.itemsCountCheck) {
                UserGames.itemsCountCheck = true;
                UserGames.itemsCount = (row_id * Main.ColoumnsCountGame) + coloumn_id;
            }
            row.append(Main.createCellEmpty(row_id, coloumn_id, UserGames.EmptyCell));
            UserGames.blankCellVector.push(UserGames.EmptyCell + row_id + '_' + coloumn_id);
        }
        $('#stream_table_user_games').append(row);
    }

    UserGames.loadDataSuccessFinish();
};

UserGames.createCell = function(row_id, coloumn_id, game_name, preview_thumbnail, viewers) {
    return $('<td id="' + UserGames.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + game_name + '"></td>').html(
        UserGames.CellHtml(row_id, coloumn_id, game_name, preview_thumbnail, viewers));
};

UserGames.CellHtml = function(row_id, coloumn_id, game_name, preview_thumbnail, viewers) {

    UserGames.nameMatrix.push(game_name);

    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main.GameSize);
    if (row_id < 2) Main.PreLoadAImage(preview_thumbnail); //try to pre cache first 2 rows

    return '<div id="' + UserGames.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_game" ><img id="' + UserGames.Img + row_id + '_' +
        coloumn_id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + UserGames.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + UserGames.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + game_name + '</div>' +
        '<div id="' + UserGames.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 100%;">' + viewers + '</div></div>';
};

UserGames.CellExists = function(display_name) {
    if (UserGames.nameMatrix.indexOf(display_name) > -1) {
        UserGames.blankCellCount++;
        return true;
    }
    return false;
};

UserGames.loadDataSuccessFinish = function() {
    $(document).ready(function() {
        if (!UserGames.Status) {
            Main.HideLoadDialog();
            if (UserGames.emptyContent) Main.showWarningDialog(STR_NO + STR_LIVE_GAMES);
            else {
                UserGames.Status = true;
                UserGames.addFocus();
                Main.LazyImgStart(UserGames.Img, 7, IMG_404_GAME, Main.ColoumnsCountGame);
            }
            UserGames.loadingData = false;
        } else {
            if (UserGames.blankCellCount > 0 && !UserGames.dataEnded) {
                UserGames.loadingMore = true;
                UserGames.loadDataPrepare();
                UserGames.loadDataReplace();
                return;
            } else {
                UserGames.blankCellCount = 0;
                UserGames.blankCellVector = [];
            }

            UserGames.loadingData = false;
            UserGames.loadingMore = false;
        }
    });
};

UserGames.loadDataRequestReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main.SetItemsLimitReload(UserGames.blankCellCount);

        var offset = UserGames.itemsCount + UserGames.itemsCountOffset;
        if (offset && offset > (UserGames.MaxOffset - 1)) {
            offset = UserGames.MaxOffset - Main.ItemsLimitReload;
            UserGames.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/api/users/' + encodeURIComponent(Main.UserName) + '/follows/games' + (UserGames.live ? '/live' : '') +
            '?limit=' + Main.ItemsLimitGame + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserGames.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserGames.loadDataSuccessReplace(xmlHttp.responseText);
                    return;
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
        UserGames.loadDataRequestReplace();
    } else {
        UserGames.ReplacedataEnded = true;
        UserGames.blankCellCount = 0;
        UserGames.blankCellVector = [];
        UserGames.loadDataSuccessFinish();
    }
};

UserGames.loadDataSuccessReplace = function(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.follows.length;
    var follows, index, cursor = 0;
    var tempVector = UserGames.blankCellVector.slice();

    UserGames.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitGame) UserGames.ReplacedataEnded = true;

    for (var i = 0; i < UserGames.blankCellVector.length && cursor < response_items; i++, cursor++) {
        follows = response.follows[cursor];
        if (UserGames.live) {
            if (UserGames.CellExists(follows.game.name)) {
                UserGames.blankCellCount--;
                i--;
            } else {
                UserGames.replaceCellEmpty(UserGames.blankCellVector[i], row_id, coloumn_id, follows.game.name, follows.game.box.template,
                    Main.addCommas(follows.channels) + ' ' + STR_CHANNELS + STR_FOR + Main.addCommas(follows.viwers) + STR_VIEWER);
                UserGames.blankCellCount--;

                index = tempVector.indexOf(tempVector[i]);
                if (index > -1) {
                    tempVector.splice(index, 1);
                }
            }
        } else {
            if (UserGames.CellExists(follows.name)) {
                UserGames.blankCellCount--;
                i--;
            } else {
                UserGames.replaceCellEmpty(UserGames.blankCellVector[i], row_id, coloumn_id, follows.name, follows.box.template, '');
                UserGames.blankCellCount--;

                index = tempVector.indexOf(tempVector[i]);
                if (index > -1) {
                    tempVector.splice(index, 1);
                }
            }
        }
    }

    UserGames.itemsCountOffset += cursor;
    if (UserGames.ReplacedataEnded) {
        UserGames.blankCellCount = 0;
        UserGames.blankCellVector = [];
    } else UserGames.blankCellVector = tempVector;

    UserGames.loadDataSuccessFinish();
};

UserGames.replaceCellEmpty = function(id, game_name, preview_thumbnail, viewers) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = UserGames.Cell + row_id + '_' + coloumn_id;

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', game_name);
    document.getElementById(cell).innerHTML = UserGames.CellHtml(row_id, coloumn_id, game_name, preview_thumbnail, viewers);
};

UserGames.addFocus = function() {

    Main.addFocusGame(UserGames.cursorY, UserGames.cursorX, UserGames.Thumbnail, UserGames.ThumbnailDiv, UserGames.DispNameDiv,
        UserGames.ViwersDiv, Main.UserGames, Main.ColoumnsCountGame, UserGames.itemsCount);

    if (UserGames.cursorY > 2) Main.LazyImg(UserGames.Img, UserGames.cursorY, IMG_404_GAME, Main.ColoumnsCountGame, 3);

    if (((UserGames.cursorY + Main.ItemsReloadLimitGame) > (UserGames.itemsCount / Main.ColoumnsCountGame)) &&
        !UserGames.dataEnded && !UserGames.loadingMore) {
        UserGames.loadingMore = true;
        UserGames.loadDataPrepare();
        UserGames.loadDataRequest();
    }
};

UserGames.removeFocus = function() {
    Main.removeFocusGame(UserGames.cursorY, UserGames.cursorX, UserGames.Thumbnail, UserGames.ThumbnailDiv, UserGames.DispNameDiv, UserGames.ViwersDiv);
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

    var i;

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
                for (i = (Main.ColoumnsCountGame - 1); i > -1; i--) {
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
            for (i = 0; i < Main.ColoumnsCountGame; i++) {
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
            for (i = 0; i < Main.ColoumnsCountGame; i++) {
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
            if (!UserGames.loadingMore) {
                UserGames.live = !UserGames.live;
                UserGames.StartLoad();
                localStorage.setItem('user_games_live', UserGames.live ? 'true' : 'false');
                Users.resetGameCell();
            }
            break;
        case TvKeyCode.KEY_CHANNELUP:
            if (!UserGames.loadingMore) {
                Main.Go = Main.UserChannels;
                UserGames.exit();
                Main.SwitchScreen();
            }
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
            AGame.UserGames = true;
            UserGames.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            UserGames.exit();
            Main.GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.UserGames;
            Main.Go = Main.Search;
            AGame.UserGames = false;
            UserGames.exit();
            Main.SwitchScreen();
            break;
        default:
            break;
    }
};
