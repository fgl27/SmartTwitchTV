/*jshint multistr: true */
//Variable initialization
function Games() {}
Games.Status = false;
Games.Thumbnail = 'thumbnail_games_';
Games.EmptyCell = 'gamesempty_';
Games.cursorY = 0;
Games.cursorX = 0;
Games.dataEnded = false;
Games.itemsCount = 0;
Games.nameMatrix = [];
Games.nameMatrixCount = 0;
Games.loadingData = false;
Games.loadingDataTry = 0;
Games.loadingDataTryMax = 10;
Games.loadingDataTimeout = 3500;
Games.isDialogOn = false;
Games.blankCellCount = 0;
Games.blankCellVector = [];
Games.itemsCountOffset = 0;
Games.LastClickFinish = true;
Games.keyClickDelayTime = 25;
Games.ReplacedataEnded = false;
Games.MaxOffset = 0;
Main.ItemsLimitGameOffset = 1;
Games.itemsCountCheck = false;

Games.ThumbnailDiv = 'game_thumbnail_div_';
Games.DispNameDiv = 'game_display_name_';
Games.ViwersDiv = 'game_viwers_';
Games.Cell = 'game_cell_';

//Variable initialization end

Games.init = function() {
    Main.Go = Main.Games;
    document.body.addEventListener("keydown", Games.handleKeyDown, false);
    $('#top_bar_game').removeClass('icon_center_label');
    $('#top_bar_game').addClass('icon_center_focus');
    if (Games.Status) {
        Main.ScrollHelper.scrollVerticalToElementById(Games.Thumbnail, Games.cursorY, Games.cursorX, Main.Games,
            Main.ScrollOffSetMinusGame, Main.ScrollOffSetGame, false);
        Main.CounterDialog(Games.cursorX, Games.cursorY, Main.ColoumnsCountGame, Games.itemsCount);
    } else Games.StartLoad();
};

Games.exit = function() {
    document.body.removeEventListener("keydown", Games.handleKeyDown);
    $('#top_bar_game').removeClass('icon_center_focus');
    $('#top_bar_game').addClass('icon_center_label');
};

Games.StartLoad = function() {
    Main.HideWarningDialog();
    Games.Status = false;
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_games').empty();
    Games.loadingMore = false;
    Games.blankCellCount = 0;
    Games.blankCellVector = [];
    Games.itemsCountOffset = 0;
    Games.ReplacedataEnded = false;
    Games.itemsCountCheck = false;
    Games.MaxOffset = 0;
    Games.nameMatrix = [];
    Games.nameMatrixCount = 0;
    Games.itemsCount = 0;
    Games.cursorX = 0;
    Games.cursorY = 0;
    Games.dataEnded = false;
    Main.CounterDialogRst();
    Games.loadDataPrepare();
    Games.loadDataRequest();
};

Games.loadDataPrepare = function() {
    Main.MatrixRst();
    Games.loadingData = true;
    Games.loadingDataTry = 0;
    Games.loadingDataTimeout = 3500;
};

Games.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Games.itemsCount + Games.itemsCountOffset;
        if (offset !== 0 && offset >= (Games.MaxOffset - Main.ItemsLimitGame)) {
            offset = Games.MaxOffset - Main.ItemsLimitGame;
            Games.dataEnded = true;
            Games.ReplacedataEnded = true;
        }

        //TODO re check Main.ItemsLimitGameOffset workaround on the future "for some reason if offset=0 the response_items is one less then response_items"
        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/games/top?limit=' + (Main.ItemsLimitGame + (offset === 0 ? Main.ItemsLimitGameOffset : 0)) + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Games.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        Games.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    Games.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Games.loadDataError();
    }
};

Games.loadDataError = function() {
    Games.loadingDataTry++;
    if (Games.loadingDataTry < Games.loadingDataTryMax) {
        Games.loadingDataTimeout += (Games.loadingDataTry < 5) ? 250 : 3500;
        Games.loadDataRequest();
    } else {
        if (!Games.loadingMore) {
            Games.loadingData = false;
            Main.HideLoadDialog();
            Main.showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            Games.loadingMore = false;
            Games.dataEnded = true;
            Games.ReplacedataEnded = true;
            Games.loadDataSuccessFinish();
        }
    }
};

Games.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.top.length;
    Games.MaxOffset = parseInt(response._total);

    if (response_items > Main.ItemsLimitGame) {
        Main.ItemsLimitGameOffset = 0;
        Games.loadDataPrepare();
        Games.loadDataRequest();
        return;
    } else if (response_items < Main.ItemsLimitGame) Games.dataEnded = true;

    var offset_itemsCount = Games.itemsCount;
    Games.itemsCount += response_items;

    var response_rows = response_items / Main.ColoumnsCountGame;
    if (response_items % Main.ColoumnsCountGame > 0) response_rows++;

    var coloumn_id, row_id, row, cell, game,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountGame + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountGame && cursor < response_items; coloumn_id++, cursor++) {
            game = response.top[cursor];
            if (Games.CellExists(game.game.name)) {
                coloumn_id--;
            } else {
                cell = Games.createCell(row_id, coloumn_id, game.game.name, game.game.box.template,
                    Main.addCommas(game.channels) + ' ' + STR_CHANNELS + ' for ' + Main.addCommas(game.viewers) + STR_VIEWER);
                row.append(cell);
            }
        }
        for (coloumn_id; coloumn_id < Main.ColoumnsCountGame; coloumn_id++) {
            if (Games.dataEnded && !Games.itemsCountCheck) {
                Games.itemsCountCheck = true;
                Games.itemsCount = (row_id * Main.ColoumnsCountGame) + coloumn_id;
            }
            row.append(Main.createCellEmpty(row_id, coloumn_id, Games.EmptyCell));
            Games.blankCellVector.push(Games.EmptyCell + row_id + '_' + coloumn_id);
        }
        $('#stream_table_games').append(row);
    }

    Games.loadDataSuccessFinish();
};

Games.createCell = function(row_id, coloumn_id, game_name, preview_thumbnail, viwers) {
    Games.CellMatrix(game_name, preview_thumbnail, row_id, coloumn_id);
    return $('<td id="' + Games.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + game_name + '"></td>').html(
        Games.CellHtml(row_id, coloumn_id, game_name, viwers));
};

Games.CellMatrix = function(game_name, preview_thumbnail, row_id, coloumn_id) {
    Main.CellMatrix(preview_thumbnail, Main.ColoumnsCountGame, Games.Thumbnail, row_id, coloumn_id, Main.GameSize);
    Games.nameMatrix[Games.nameMatrixCount] = game_name;
    Games.nameMatrixCount++;
};

Games.CellHtml = function(row_id, coloumn_id, game_name, viwers) {
    return '<img id="' + Games.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_GAME + '"/>' +
        '<div id="' + Games.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + Games.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + game_name + '</div>' +
        '<div id="' + Games.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info_games" style="width: 100%; display: inline-block;">' + viwers +
        '</div></div>';
};

Games.CellExists = function(display_name) {
    for (var i = 0; i <= Games.nameMatrixCount; i++) {
        if (display_name == Games.nameMatrix[i]) {
            Games.blankCellCount++;
            return true;
        }
    }
    return false;
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
Games.loadDataSuccessFinish = function() {
    if (!Games.Status) {
        $('#stream_table_games').imagesLoaded()
            .always({
                background: false
            }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
                Main.HideLoadDialog();
                Games.Status = true;
                Games.addFocus();

                Main.LoadImagesPre(IMG_404_GAME);

                Games.loadingData = false;
            });
    } else Games.loadDataSuccessFinishRun();
};

Games.loadDataSuccessFinishRun = function() {
    Main.LoadImagesPre(IMG_404_GAME);

    if (Games.blankCellCount > 0 && !Games.dataEnded) {
        Games.loadingMore = true;
        Games.loadDataPrepare();
        Games.loadDataReplace();
        return;
    } else {
        Games.blankCellCount = 0;
        Games.blankCellVector = [];
    }

    Games.loadingData = false;

    window.setTimeout(function() {
        Games.loadingMore = false;
    }, 500);
};

Games.loadDataReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main.SetItemsLimitReload(Games.blankCellCount);

        var offset = Games.itemsCount + Games.itemsCountOffset;
        if (offset !== 0 && offset >= (Games.MaxOffset - Main.ItemsLimitGame)) {
            offset = Games.MaxOffset - Main.ItemsLimitGame;
            Games.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/games/top?limit=' + Main.ItemsLimitReload + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = Games.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        Games.loadDataSuccessReplace(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Games.loadDataErrorReplace();
    }
};

Games.loadDataErrorReplace = function() {
    Games.loadingDataTry++;
    if (Games.loadingDataTry < Games.loadingDataTryMax) {
        Games.loadingDataTimeout += (Games.loadingDataTry < 5) ? 250 : 3500;
        Games.loadDataReplace();
    } else {
        Games.ReplacedataEnded = true;
        Games.blankCellCount = 0;
        Games.blankCellVector = [];
        Games.loadDataSuccessFinish();
    }
};

Games.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.top.length;
    var game, index, cursor = 0;
    var tempVector = Games.blankCellVector.slice();

    Games.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitGame) Games.ReplacedataEnded = true;

    for (var i = 0; i < Games.blankCellVector.length && cursor < response_items; i++, cursor++) {
        game = response.top[cursor];
        if (Games.CellExists(game.game.name)) {
            Games.blankCellCount--;
            i--;
        } else {
            Games.replaceCellEmpty(Games.blankCellVector[i], game.game.name, game.game.box.template,
                Main.addCommas(game.channels) + ' ' + STR_CHANNELS + ' for ' + Main.addCommas(game.viewers) + STR_VIEWER);
            Games.blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    Games.itemsCountOffset += cursor;
    if (Games.ReplacedataEnded) {
        Games.blankCellCount = 0;
        Games.blankCellVector = [];
    } else Games.blankCellVector = tempVector;

    Games.loadDataSuccessFinish();
};

Games.replaceCellEmpty = function(id, game_name, preview_thumbnail, viwers) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = Games.Cell + row_id + '_' + coloumn_id;

    Games.CellMatrix(game_name, preview_thumbnail, row_id, coloumn_id);

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', game_name);
    document.getElementById(cell).innerHTML = Games.CellHtml(row_id, coloumn_id, game_name, viwers);
};

Games.addFocus = function() {
    if (((Games.cursorY + Main.ItemsReloadLimitGame) > (Games.itemsCount / Main.ColoumnsCountGame)) &&
        !Games.dataEnded && !Games.loadingMore) {
        Games.loadingMore = true;
        Games.loadDataPrepare();
        Games.loadDataRequest();
    }

    Main.addFocusGame(Games.cursorY, Games.cursorX, Games.Thumbnail, Games.ThumbnailDiv, Games.DispNameDiv, Games.ViwersDiv, Main.Games,
        Main.ColoumnsCountGame, Games.itemsCount);
};

Games.removeFocus = function() {
    Main.removeFocusGame(Games.cursorY, Games.cursorX, Games.Thumbnail, Games.ThumbnailDiv, Games.DispNameDiv, Games.ViwersDiv);
};

Games.keyClickDelay = function() {
    Games.LastClickFinish = true;
};

Games.handleKeyDown = function(event) {
    if ((Games.loadingData && !Games.loadingMore) || !Games.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Games.LastClickFinish = false;
        window.setTimeout(Games.keyClickDelay, Games.keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else if (!Games.loadingMore) {
                if (Main.Go === Main.Before) Main.Go = Main.Live;
                else Main.Go = Main.Before;
                Games.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((Games.cursorY), (Games.cursorX - 1), Games.Thumbnail)) {
                Games.removeFocus();
                Games.cursorX--;
                Games.addFocus();
            } else {
                for (i = (Main.ColoumnsCountGame - 1); i > -1; i--) {
                    if (Main.ThumbNull((Games.cursorY - 1), i, Games.Thumbnail)) {
                        Games.removeFocus();
                        Games.cursorY--;
                        Games.cursorX = i;
                        Games.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.ThumbNull((Games.cursorY), (Games.cursorX + 1), Games.Thumbnail)) {
                Games.removeFocus();
                Games.cursorX++;
                Games.addFocus();
            } else if (Main.ThumbNull((Games.cursorY + 1), 0, Games.Thumbnail)) {
                Games.removeFocus();
                Games.cursorY++;
                Games.cursorX = 0;
                Games.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Main.ColoumnsCountGame; i++) {
                if (Main.ThumbNull((Games.cursorY - 1), (Games.cursorX - i), Games.Thumbnail)) {
                    Games.removeFocus();
                    Games.cursorY--;
                    Games.cursorX = Games.cursorX - i;
                    Games.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Main.ColoumnsCountGame; i++) {
                if (Main.ThumbNull((Games.cursorY + 1), (Games.cursorX - i), Games.Thumbnail)) {
                    Games.removeFocus();
                    Games.cursorY++;
                    Games.cursorX = Games.cursorX - i;
                    Games.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!Games.loadingMore) Games.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            if (!Games.loadingMore) {
                Main.Before = Main.Games;
                Main.Go = Main.Live;
                Games.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            if (!Games.loadingMore) {
                Main.Before = Main.Games;
                Main.Go = (AddUser.IsUserSet()) ? Main.Users : Main.AddUser;
                Games.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Main.gameSelected = $('#' + Games.Cell + Games.cursorY + '_' + Games.cursorX).attr('data-channelname');
            document.body.removeEventListener("keydown", Games.handleKeyDown);
            Main.Before = Main.Go;
            Main.Go = Main.AGame;
            Games.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Main.Go = Main.Live;
            Games.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.Games;
            Main.Go = Main.Search;
            Games.exit();
            Main.SwitchScreen();
            break;
        default:
            break;
    }
};
