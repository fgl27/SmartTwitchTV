/*jshint multistr: true */
//Variable initialization
function SGames() {}
SGames.Status = false;
SGames.Thumbnail = 'thumbnail_sgames_';
SGames.EmptyCell = 'sgames_empty_';
SGames.cursorY = 0;
SGames.cursorX = 0;
SGames.itemsCount = 0;
SGames.imgMatrix = [];
SGames.imgMatrixId = [];
SGames.imgMatrixCount = 0;
SGames.nameMatrix = [];
SGames.nameMatrixCount = 0;
SGames.loadingData = false;
SGames.loadingDataTry = 0;
SGames.loadingDataTryMax = 10;
SGames.loadingDataTimeout = 3500;
SGames.isDialogOn = false;
SGames.blankCellCount = 0;
SGames.itemsCountOffset = 0;
SGames.LastClickFinish = true;
SGames.keyClickDelayTime = 25;
SGames.ReplacedataEnded = false;
SGames.MaxOffset = 0;
SGames.emptyContent = false;

SGames.ThumbnailDiv = 'sgame_thumbnail_div_';
SGames.DispNameDiv = 'sgame_display_name_';
SGames.Cell = 'sgame_cell_';

//Variable initialization end


SGames.init = function() {
    Main.Go = Main.SGames;
    Main.cleanTopLabel();
    $('.lable_user').html(STR_SEARCH);
    $('.label_agame_name').html(STR_GAMES + ' ' + '\'' + Search.data + '\'');
    document.body.addEventListener("keydown", SGames.handleKeyDown, false);
    if (SGames.status) {
        Main.ScrollHelper.scrollVerticalToElementById(SGames.Thumbnail, SGames.cursorY, SGames.cursorX, Main.SGames,
            Main.ScrollOffSetMinusGame, Main.ScrollOffSetGame, false);
        Main.CounterDialog(SGames.cursorX, SGames.cursorY, Main.ColoumnsCountGame, SGames.itemsCount);
    } else SGames.StartLoad();
};

SGames.exit = function() {
    Main.RestoreTopLabel();
    SGames.Status = false;
    document.body.removeEventListener("keydown", SGames.handleKeyDown);
};

SGames.StartLoad = function() {
    Main.HideWarningDialog();
    SGames.Status = false;
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_search_game').empty();
    SGames.blankCellCount = 0;
    SGames.itemsCountOffset = 0;
    SGames.ReplacedataEnded = false;
    SGames.MaxOffset = 0;
    SGames.itemsCount = 0;
    SGames.cursorX = 0;
    SGames.cursorY = 0;
    SGames.loadDataPrepare();
    SGames.loadDataRequest();
};

SGames.loadDataPrepare = function() {
    SGames.imgMatrix = [];
    SGames.imgMatrixId = [];
    SGames.imgMatrixCount = 0;
    SGames.loadingData = true;
    SGames.loadingDataTry = 0;
    SGames.loadingDataTimeout = 3500;
};

SGames.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/games?query=' + encodeURIComponent(Search.data) + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SGames.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        SGames.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else {
                    SGames.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SGames.loadDataError();
    }
};

SGames.loadDataError = function() {
    SGames.loadingDataTry++;
    if (SGames.loadingDataTry < SGames.loadingDataTryMax) {
        SGames.loadingDataTimeout += (SGames.loadingDataTry < 5) ? 250 : 3500;
        SGames.loadDataRequest();
    } else {
        SGames.loadingData = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

SGames.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = 0;

    if (response.games !== null) response_items = response.games.length;

    var offset_itemsCount = SGames.itemsCount;
    SGames.itemsCount += response_items;

    SGames.emptyContent = SGames.itemsCount === 0;

    var response_rows = response_items / Main.ColoumnsCountGame;
    if (response_items % Main.ColoumnsCountGame > 0) response_rows++;

    var coloumn_id, row_id, row, cell, game,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountGame + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountGame && cursor < response_items; coloumn_id++, cursor++) {
            game = response.games[cursor];
            cell = SGames.createCell(row_id, coloumn_id, game.name, game.box.template);
            row.append(cell);
        }
        for (coloumn_id; coloumn_id < Main.ColoumnsCountGame; coloumn_id++) {
            row.append(Main.createCellEmpty(row_id, coloumn_id, SGames.EmptyCell));
        }
        $('#stream_table_search_game').append(row);
    }

    SGames.loadDataSuccessFinish();
};

SGames.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="' + SGames.EmptyCell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
};

SGames.createCell = function(row_id, coloumn_id, game_name, preview_thumbnail) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main.GameSize);

    SGames.imgMatrix[SGames.imgMatrixCount] = preview_thumbnail;
    SGames.imgMatrixId[SGames.imgMatrixCount] = SGames.Thumbnail + row_id + '_' + coloumn_id;
    SGames.imgMatrixCount++;

    if (SGames.imgMatrixCount < (Main.ColoumnsCountGame * 4)) Main.PreLoadAImage(preview_thumbnail); //try to pre cache first 4 rows

    return $('<td id="' + SGames.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + game_name + '"></td>').html(
        '<img id="' + SGames.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + IMG_LOD_GAME + '"/>' +
        '<div id="' + SGames.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + SGames.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + game_name + '</div></div>');
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
SGames.loadDataSuccessFinish = function() {
    $('#stream_table_search_game').imagesLoaded()
        .always({
            background: false
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!SGames.Status) {
                Main.HideLoadDialog();
                SGames.addFocus();
                if (SGames.emptyContent) Main.showWarningDialog(STR_SEARCH_RESULT_EMPTY);
                else SGames.status = true;
            }

            Main.LoadImages(SGames.imgMatrix, SGames.imgMatrixId, IMG_404_GAME);

            SGames.loadingData = false;
        });
};

SGames.addFocus = function() {
    $('#' + SGames.Thumbnail + SGames.cursorY + '_' + SGames.cursorX).addClass('stream_thumbnail_focused');
    $('#' + SGames.ThumbnailDiv + SGames.cursorY + '_' + SGames.cursorX).addClass('stream_text_focused');
    $('#' + SGames.DispNameDiv + SGames.cursorY + '_' + SGames.cursorX).addClass('stream_channel_focused');
    window.setTimeout(function() {
        Main.ScrollHelper.scrollVerticalToElementById(SGames.Thumbnail, SGames.cursorY, SGames.cursorX, Main.SGames, Main.ScrollOffSetMinusGame, Main.ScrollOffSetGame, false);
    }, 10);

    Main.CounterDialog(SGames.cursorX, SGames.cursorY, Main.ColoumnsCountGame, SGames.itemsCount);
};

SGames.removeFocus = function() {
    $('#' + SGames.Thumbnail + SGames.cursorY + '_' + SGames.cursorX).removeClass('stream_thumbnail_focused');
    $('#' + SGames.ThumbnailDiv + SGames.cursorY + '_' + SGames.cursorX).removeClass('stream_text_focused');
    $('#' + SGames.DispNameDiv + SGames.cursorY + '_' + SGames.cursorX).removeClass('stream_channel_focused');
};

SGames.keyClickDelay = function() {
    SGames.LastClickFinish = true;
};

SGames.handleKeyDown = function(event) {
    if (SGames.loadingData) {
        event.preventDefault();
        return;
    } else if (!SGames.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        SGames.LastClickFinish = false;
        window.setTimeout(SGames.keyClickDelay, SGames.keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                if (Main.Go === Main.BeforeSearch) Main.Go = Main.Live;
                else Main.Go = Main.BeforeSearch;
                SGames.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((SGames.cursorY), (SGames.cursorX - 1), SGames.Thumbnail)) {
                SGames.removeFocus();
                SGames.cursorX--;
                SGames.addFocus();
            } else {
                for (i = (Main.ColoumnsCountGame - 1); i > -1; i--) {
                    if (Main.ThumbNull((SGames.cursorY - 1), i, SGames.Thumbnail)) {
                        SGames.removeFocus();
                        SGames.cursorY--;
                        SGames.cursorX = i;
                        SGames.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.ThumbNull((SGames.cursorY), (SGames.cursorX + 1), SGames.Thumbnail)) {
                SGames.removeFocus();
                SGames.cursorX++;
                SGames.addFocus();
            } else if (Main.ThumbNull((SGames.cursorY + 1), 0, SGames.Thumbnail)) {
                SGames.removeFocus();
                SGames.cursorY++;
                SGames.cursorX = 0;
                SGames.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Main.ColoumnsCountGame; i++) {
                if (Main.ThumbNull((SGames.cursorY - 1), (SGames.cursorX - i), SGames.Thumbnail)) {
                    SGames.removeFocus();
                    SGames.cursorY--;
                    SGames.cursorX = SGames.cursorX - i;
                    SGames.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Main.ColoumnsCountGame; i++) {
                if (Main.ThumbNull((SGames.cursorY + 1), (SGames.cursorX - i), SGames.Thumbnail)) {
                    SGames.removeFocus();
                    SGames.cursorY++;
                    SGames.cursorX = SGames.cursorX - i;
                    SGames.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            SGames.StartLoad();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Main.gameSelected = $('#' + SGames.Cell + SGames.cursorY + '_' + SGames.cursorX).attr('data-channelname');
            document.body.removeEventListener("keydown", SGames.handleKeyDown);
            Main.Before = Main.Go;
            Main.Go = Main.AGame;
            SGames.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Main.Go = Main.Live;
            SGames.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.SGames;
            Main.Go = Main.Search;
            SGames.exit();
            Main.SwitchScreen();
            break;
        default:
            break;
    }
};
