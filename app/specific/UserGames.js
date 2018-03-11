/*jshint multistr: true */
//Variable initialization
function UserGames() {}
UserGames.Thumbnail = 'thumbnail_glive_';
UserGames.EmptyCell = 'gliveempty_';
UserGames.cursorY = 0;
UserGames.cursorX = 0;
UserGames.dataEnded = false;
UserGames.itemsCount = 0;
UserGames.nameMatrix = [];
UserGames.nameMatrixCount = 0;
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
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    document.getElementById("id_agame_name").style.paddingLeft = "44%";
    $('.label_agame_name').html(Main.UserName + STR_LIVE_GAMES);
    document.body.addEventListener("keydown", UserGames.handleKeyDown, false);
    if (UserGames.OldUserName !== Main.UserName) UserGames.Status = false;
    if (UserGames.Status) {
        Main.ScrollHelper.scrollVerticalToElementById(UserGames.Thumbnail, UserGames.cursorY, UserGames.cursorX, Main.UserGames,
            Main.ScrollOffSetMinusGame, Main.ScrollOffSetGame, false);
        Main.CounterDialog(UserGames.cursorX, UserGames.cursorY, Main.ColoumnsCountGame, UserGames.itemsCount);
    } else UserGames.StartLoad();
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
    UserGames.Status = false;
    $('#' + Main.TempTable).empty();
    UserGames.loadingMore = false;
    UserGames.blankCellCount = 0;
    UserGames.itemsCountOffset = 0;
    UserGames.ReplacedataEnded = false;
    UserGames.MaxOffset = 0;
    UserGames.nameMatrix = [];
    UserGames.blankCellVector = [];
    UserGames.itemsCountCheck = false;
    UserGames.nameMatrixCount = 0;
    UserGames.itemsCount = 0;
    UserGames.cursorX = 0;
    UserGames.cursorY = 0;
    UserGames.dataEnded = false;
    Main.CounterDialogRst();
    UserGames.loadDataPrepare();
    UserGames.loadDataRequest();
};

UserGames.loadDataPrepare = function() {
    Main.MatrixRst();
    UserGames.loadingData = true;
    UserGames.loadingDataTry = 0;
    UserGames.loadingDataTimeout = 3500;
};

UserGames.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = UserGames.itemsCount + UserGames.itemsCountOffset;
        if (offset !== 0 && offset > (UserGames.MaxOffset - 1)) {
            offset = UserGames.MaxOffset - Main.ItemsLimitGame;
            UserGames.dataEnded = true;
            UserGames.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/api/users/' + encodeURIComponent(Main.UserName) + '/follows/games/live?limit=' +
            Main.ItemsLimitGame + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
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
        UserGames.loadDataRequest();
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

    if (response_items < Main.ItemsLimitGame) UserGames.dataEnded = true;

    var offset_itemsCount = UserGames.itemsCount;
    UserGames.itemsCount += response_items;

    UserGames.emptyContent = UserGames.itemsCount === 0;

    var response_rows = response_items / Main.ColoumnsCountGame;
    if (response_items % Main.ColoumnsCountGame > 0) response_rows++;

    var coloumn_id, row_id, row, cell, follows,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountGame + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountGame && cursor < response_items; coloumn_id++, cursor++) {
            follows = response.follows[cursor];
            if (UserGames.CellExists(follows.game.name)) coloumn_id--;
            else {
                cell = UserGames.createCell(row_id, coloumn_id, follows.game.name, follows.game.box.template,
                    Main.addCommas(follows.channels) + ' ' + STR_CHANNELS + ' for ' + Main.addCommas(follows.viewers) + STR_VIEWER);
                row.append(cell);
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
        $('#' + Main.TempTable).append(row);
    }

    UserGames.loadDataSuccessFinish();
};

UserGames.createCell = function(row_id, coloumn_id, game_name, preview_thumbnail, viwers) {
    UserGames.CellMatrix(game_name, preview_thumbnail, row_id, coloumn_id);
    return $('<td id="' + UserGames.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + game_name + '"></td>').html(
        UserGames.CellHtml(row_id, coloumn_id, game_name, viwers));
};

UserGames.CellMatrix = function(game_name, preview_thumbnail, row_id, coloumn_id) {
    Main.CellMatrix(preview_thumbnail, Main.ColoumnsCountGame, UserGames.Thumbnail, row_id, coloumn_id, Main.GameSize);
    UserGames.nameMatrix[UserGames.nameMatrixCount] = game_name;
    UserGames.nameMatrixCount++;
};

UserGames.CellHtml = function(row_id, coloumn_id, game_name, viwers) {
    return '<img id="' + UserGames.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_GAME + '"/>' +
        '<div id="' + UserGames.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + UserGames.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + game_name + '</div>' +
        '<div id="' + UserGames.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 100%; display: inline-block;">' +
        viwers + '</div></div>';
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
    $('#' + Main.TempTable).imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!UserGames.Status) {
                if (UserGames.emptyContent) Main.showWarningDialog(STR_NO + STR_LIVE_GAMES);
                else UserGames.Status = true;

                Main.ReplaceTable('stream_table_user_games');

                Main.HideLoadDialog();
                UserGames.addFocus();
                Main.LoadImagesPre(IMG_404_GAME);

                UserGames.loadingData = false;
            } else {
                Main.AddTable('stream_table_user_games');
                Main.LoadImagesPre(IMG_404_GAME);

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
        if (offset !== 0 && offset > (UserGames.MaxOffset - 1)) {
            offset = UserGames.MaxOffset - Main.ItemsLimitReload;
            UserGames.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/follows?game=' + encodeURIComponent(Main.gameSelected) +
            '&limit=' + Main.ItemsLimitReload + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
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
        UserGames.loadDataRequestReplace();
    } else {
        UserGames.ReplacedataEnded = true;
        UserGames.blankCellCount = 0;
        UserGames.blankCellVector = [];
        UserGames.loadDataSuccessFinish();
    }
};

UserGames.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.follows.length;
    var follows, index, cursor = 0;
    var tempVector = UserGames.blankCellVector.slice();

    UserGames.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitGame) UserGames.ReplacedataEnded = true;

    for (var i = 0; i < UserGames.blankCellVector.length && cursor < response_items; i++, cursor++) {
        follows = response.follows[cursor];
        if (UserGames.CellExists(follows.game.name)) {
            UserGames.blankCellCount--;
            i--;
        } else {
            UserGames.replaceCellEmpty(UserGames.blankCellVector[i], follows.game.name, follows.game.box.template,
                Main.addCommas(follows.channels) + ' ' + STR_CHANNELS + ' for ' + Main.addCommas(follows.viewers) + STR_VIEWER);
            UserGames.blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
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

UserGames.replaceCellEmpty = function(id, game_name, preview_thumbnail, viwers) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = UserGames.Cell + row_id + '_' + coloumn_id;

    UserGames.CellMatrix(game_name, preview_thumbnail, row_id, coloumn_id);

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', game_name);
    document.getElementById(cell).innerHTML = UserGames.CellHtml(row_id, coloumn_id, game_name, viwers);
};

UserGames.addFocus = function() {
    if (((UserGames.cursorY + Main.ItemsReloadLimitGame) > (UserGames.itemsCount / Main.ColoumnsCountGame)) &&
        !UserGames.dataEnded && !UserGames.loadingMore) {
        UserGames.loadingMore = true;
        UserGames.loadDataPrepare();
        UserGames.loadDataRequest();
    }

    Main.addFocusGame(UserGames.cursorY, UserGames.cursorX, UserGames.Thumbnail, UserGames.ThumbnailDiv, UserGames.DispNameDiv,
        UserGames.ViwersDiv, Main.UserGames, Main.ColoumnsCountGame, UserGames.itemsCount);
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
        default:
            break;
    }
};
