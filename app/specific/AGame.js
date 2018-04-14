/*jshint multistr: true */
//Variable initialization
function AGame() {}
AGame.cursorY = 0;
AGame.cursorX = 0;
AGame.dataEnded = false;
AGame.itemsCount = 0;
AGame.nameMatrix = [];
AGame.blankCellVector = [];
AGame.loadingData = false;
AGame.loadingDataTry = 0;
AGame.loadingDataTryMax = 10;
AGame.loadingDataTimeout = 3500;
AGame.isDialogOn = false;
AGame.blankCellCount = 0;
AGame.itemsCountOffset = 0;
AGame.LastClickFinish = true;
AGame.keyClickDelayTime = 25;
AGame.ReplacedataEnded = false;
AGame.MaxOffset = 0;
AGame.emptyContent = false;

AGame.Img = 'img_agame';
AGame.Thumbnail = 'thumbnail_agame_';
AGame.EmptyCell = 'agameempty_';
AGame.ThumbnailDiv = 'agame_thumbnail_div_';
AGame.DispNameDiv = 'agame_display_name_';
AGame.StreamTitleDiv = 'agame_stream_title_';
AGame.StreamGameDiv = 'agame_stream_game_';
AGame.ViwersDiv = 'agame_viwers_';
AGame.QualityDiv = 'agame_quality_';
AGame.Cell = 'agame_cell_';
AGame.status = false;
AGame.itemsCountCheck = false;
AGame.fallowing = false;
AGame.UserGames = false;

//Variable initialization end


AGame.init = function() {
    Main.Go = Main.AGame;
    document.body.addEventListener("keydown", AGame.handleKeyDown, false);
    $('#top_bar_game').addClass('icon_center_focus');
    $('.lable_game').html(STR_AGAME);
    $('.label_agame_name').html(Main.gameSelected);
    Main.YRst(AGame.cursorY);
    if ((Main.OldgameSelected === Main.gameSelected) && AGame.status) {
        Main.ScrollHelper.scrollVerticalToElementById(AGame.Thumbnail, AGame.cursorY, AGame.cursorX, Main.AGame, Main.ScrollOffSetMinusVideo,
            Main.ScrollOffSetVideo, false);
        Main.CounterDialog(AGame.cursorX, AGame.cursorY, Main.ColoumnsCountVideo, AGame.itemsCount);
    } else AGame.StartLoad();
};

AGame.exit = function() {
    if (AGame.cursorY == -1) AGame.cursorY = 0;
    AGame.removeFocusFallow();
    AGame.addFocus();
    $('.label_agame_name').html('');
    $('.lable_game').html(STR_GAMES);
    document.body.removeEventListener("keydown", AGame.handleKeyDown);
    $('#top_bar_game').removeClass('icon_center_focus');
};

AGame.StartLoad = function() {
    Main.HideWarningDialog();
    AGame.status = false;
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    $('#stream_table_a_game').empty();
    AGame.loadingMore = false;
    AGame.blankCellCount = 0;
    AGame.itemsCountOffset = 0;
    AGame.ReplacedataEnded = false;
    AGame.MaxOffset = 0;
    AGame.nameMatrix = [];
    AGame.blankCellVector = [];
    AGame.itemsCountCheck = false;
    AGame.itemsCount = 0;
    AGame.cursorX = 0;
    AGame.cursorY = 0;
    AGame.dataEnded = false;
    Main.CounterDialogRst();
    AGame.loadDataPrepare();
    AGame.loadDataRequest();
};

AGame.loadDataPrepare = function() {
    AGame.loadingData = true;
    AGame.loadingDataTry = 0;
    AGame.loadingDataTimeout = 3500;
};

AGame.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = AGame.itemsCount + AGame.itemsCountOffset;
        if (offset && offset > (AGame.MaxOffset - 1)) {
            offset = AGame.MaxOffset - Main.ItemsLimitVideo;
            AGame.dataEnded = true;
            AGame.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main.gameSelected) +
            '&limit=' + Main.ItemsLimitVideo + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = AGame.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    AGame.loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    AGame.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AGame.loadDataError();
    }
};

AGame.loadDataError = function() {
    AGame.loadingDataTry++;
    if (AGame.loadingDataTry < AGame.loadingDataTryMax) {
        AGame.loadingDataTimeout += (AGame.loadingDataTry < 5) ? 250 : 3500;
        AGame.loadDataRequest();
    } else {
        AGame.loadingData = false;
        AGame.loadingMore = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

AGame.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    AGame.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitVideo) AGame.dataEnded = true;

    var offset_itemsCount = AGame.itemsCount;
    AGame.itemsCount += response_items;

    AGame.emptyContent = !AGame.itemsCount;

    var response_rows = response_items / Main.ColoumnsCountVideo;
    if (response_items % Main.ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row = $('<tr></tr>'),
        cell, stream,
        cursor = 0;

    row.append(Main.createCellEmpty('x', 0, AGame.EmptyCell));
    row.append(Main.createCellEmpty('x', 1, AGame.EmptyCell));
    row.append($('<td id="' + AGame.Cell + 'x_2" class="stream_cell" ></td>').html('<div id="' + AGame.Thumbnail +
        'x_2" class="stream_thumbnail_fallow_game" ><div id="' + AGame.DispNameDiv +
        'x_2" class="stream_channel_fallow_game"></div></div>'));
    $('#stream_table_a_game').append(row);

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountVideo + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            if (AGame.CellExists(stream.channel.name)) coloumn_id--;
            else {
                cell = AGame.createCell(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                    stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                    stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                    Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
                row.append(cell);
            }
        }

        for (coloumn_id; coloumn_id < Main.ColoumnsCountVideo; coloumn_id++) {
            if (AGame.dataEnded && !AGame.itemsCountCheck) {
                AGame.itemsCountCheck = true;
                AGame.itemsCount = (row_id * Main.ColoumnsCountVideo) + coloumn_id;
            }
            row.append(Main.createCellEmpty(row_id, coloumn_id, AGame.EmptyCell));
            AGame.blankCellVector.push(AGame.EmptyCell + row_id + '_' + coloumn_id);
        }
        $('#stream_table_a_game').append(row);
    }

    AGame.loadDataSuccessFinish();
};

AGame.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    return $('<td id="' + AGame.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        AGame.CellHtml(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality, preview_thumbnail, channel_name));
};

AGame.CellHtml = function(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality, preview_thumbnail, channel_name) {

    AGame.nameMatrix.push(channel_name);

    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", Main.VideoSize);
    if (row_id < 3) Main.PreLoadAImage(preview_thumbnail); //try to pre cache first 3 rows

    return '<div id="' + AGame.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_video" ><img id="' + AGame.Img + row_id + '_' +
        coloumn_id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + AGame.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + AGame.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div>' +
        '<div id="' + AGame.StreamTitleDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + AGame.StreamGameDiv + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div>' +
        '<div id="' + AGame.ViwersDiv + row_id + '_' + coloumn_id + '"class="stream_info" style="width: 40%; display: inline-block;">' + viwers + '</div>' +
        '<div id="' + AGame.QualityDiv + row_id + '_' + coloumn_id +
        '"class="stream_info" style="width:35%; float: right; display: inline-block;">' + quality + '</div></div>';
};

AGame.CellExists = function(display_name) {
    if (AGame.nameMatrix.indexOf(display_name) > -1) {
        AGame.blankCellCount++;
        return true;
    }
    return false;
};

AGame.loadDataSuccessFinish = function() {
    $(document).ready(function() {
        if (!AGame.status) {
            if (AGame.emptyContent) Main.showWarningDialog(STR_NO + STR_LIVE_GAMES);
            else AGame.status = true;
            AGame.Checkfallow();
            Main.HideLoadDialog();
            AGame.addFocus();
            Main.LazyImgStart(AGame.Img, 9, IMG_404_VIDEO, Main.ColoumnsCountVideo);
            AGame.loadingData = false;
        } else {
            if (AGame.blankCellCount > 0 && !AGame.dataEnded) {
                AGame.loadingMore = true;
                AGame.loadDataPrepare();
                AGame.loadDataReplace();
                return;
            } else AGame.blankCellCount = 0;

            AGame.loadingData = false;
            AGame.loadingMore = false;
        }
    });
};

AGame.Checkfallow = function() {
    if (AGame.UserGames) {
        AGame.fallowing = true;
        AGame.setFallow();
    } else if (Main.UserName !== '') AddCode.CheckFallowGame();
    else {
        AGame.fallowing = false;
        AGame.setFallow();
    }
};

AGame.setFallow = function() {
    if (AGame.fallowing) document.getElementById(AGame.DispNameDiv + "x_2").innerHTML = '<i class="icon-heart" style="color: #00b300; font-size: 100%; text-shadow: #FFFFFF 0px 0px 10px, #FFFFFF 0px 0px 10px, #FFFFFF 0px 0px 8px;"></i>' + STR_SPACE + STR_FALLOWING;
    else document.getElementById(AGame.DispNameDiv + "x_2").innerHTML = '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; text-shadow: #000000 0px 0px 10px, #000000 0px 0px 10px, #000000 0px 0px 8px;"></i>' + STR_SPACE + (Main.UserName !== '' ? STR_FALLOW : STR_NOKEY);
};

AGame.fallow = function() {
    if (AddCode.OauthToken !== '') {
        if (AGame.fallowing) AddCode.UnFallowGame();
        else AddCode.FallowGame();
    } else {
        Main.showWarningDialog(STR_NOKEY_WARN);
        window.setTimeout(Main.HideWarningDialog, 2000);
    }
};

AGame.loadDataReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main.SetItemsLimitReload(AGame.blankCellCount);

        var offset = AGame.itemsCount + AGame.itemsCountOffset;
        if (offset && offset > (AGame.MaxOffset - 1)) {
            offset = AGame.MaxOffset - Main.ItemsLimitReload;
            AGame.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main.gameSelected) +
            '&limit=' + Main.ItemsLimitReload + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = AGame.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    AGame.loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AGame.loadDataErrorReplace();
    }
};

AGame.loadDataErrorReplace = function() {
    AGame.loadingDataTry++;
    if (AGame.loadingDataTry < AGame.loadingDataTryMax) {
        AGame.loadingDataTimeout += (AGame.loadingDataTry < 5) ? 250 : 3500;
        AGame.loadDataReplace();
    } else {
        AGame.ReplacedataEnded = true;
        AGame.blankCellCount = 0;
        AGame.blankCellVector = [];
        AGame.loadDataSuccessFinish();
    }
};

AGame.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    var stream, index, cursor = 0;
    var tempVector = AGame.blankCellVector.slice();

    AGame.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitVideo) AGame.ReplacedataEnded = true;


    for (var i = 0; i < AGame.blankCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        if (AGame.CellExists(stream.channel.name)) {
            AGame.blankCellCount--;
            i--;
        } else {
            AGame.replaceCellEmpty(AGame.blankCellVector[i], stream.channel.name, stream.preview.template,
                stream.channel.status, stream.game, Main.is_playlist(JSON.stringify(stream.stream_type)) +
                stream.channel.display_name, Main.addCommas(stream.viewers) + STR_VIEWER,
                Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language));
            AGame.blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    AGame.itemsCountOffset += cursor;
    if (AGame.ReplacedataEnded) {
        AGame.blankCellCount = 0;
        AGame.blankCellVector = [];
    } else AGame.blankCellVector = tempVector;

    AGame.loadDataSuccessFinish();
};

AGame.replaceCellEmpty = function(id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = AGame.Cell + row_id + '_' + coloumn_id;

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', channel_name);
    document.getElementById(cell).innerHTML =
        AGame.CellHtml(row_id, coloumn_id, channel_display_name, stream_title, stream_game, viwers, quality, preview_thumbnail, channel_name);
};

AGame.addFocus = function() {

    Main.addFocusVideo(AGame.cursorY, AGame.cursorX, AGame.Thumbnail, AGame.ThumbnailDiv, AGame.DispNameDiv, AGame.StreamTitleDiv,
        AGame.StreamGameDiv, AGame.ViwersDiv, AGame.QualityDiv, Main.AGame, Main.ColoumnsCountVideo, AGame.itemsCount);

    if (AGame.cursorY > 3) Main.LazyImg(AGame.Img, AGame.cursorY, IMG_404_VIDEO, Main.ColoumnsCountVideo, 4);

    if (((AGame.cursorY + Main.ItemsReloadLimitVideo) > (AGame.itemsCount / Main.ColoumnsCountVideo)) &&
        !AGame.dataEnded && !AGame.loadingMore) {
        AGame.loadingMore = true;
        AGame.loadDataPrepare();
        AGame.loadDataRequest();
    }
};

AGame.removeFocus = function() {
    Main.removeFocusVideo(AGame.cursorY, AGame.cursorX, AGame.Thumbnail, AGame.ThumbnailDiv, AGame.DispNameDiv, AGame.StreamTitleDiv,
        AGame.StreamGameDiv, AGame.ViwersDiv, AGame.QualityDiv);
};


AGame.addFocusFallow = function() {
    $('#' + AGame.Thumbnail + 'x_2').addClass(Main.classThumb);
};

AGame.removeFocusFallow = function() {
    $('#' + AGame.Thumbnail + 'x_2').removeClass(Main.classThumb);
};

AGame.keyClickDelay = function() {
    AGame.LastClickFinish = true;
};

AGame.handleKeyDown = function(event) {
    if ((AGame.loadingData && !AGame.loadingMore) || !AGame.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        AGame.LastClickFinish = false;
        window.setTimeout(AGame.keyClickDelay, AGame.keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else if (!AGame.loadingMore) {
                Main.OldgameSelected = Main.gameSelected;
                if (Main.Go === Main.Before) Main.Go = Main.Games;
                else Main.Go = Main.Before;
                AGame.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (!AGame.cursorY && !AGame.cursorX) {
                AGame.removeFocus();
                AGame.cursorY = -1;
                AGame.addFocusFallow();
            } else if (AGame.cursorY == -1) {
                AGame.cursorY = 0;
                AGame.removeFocusFallow();
                AGame.addFocus();
            } else if (Main.ThumbNull((AGame.cursorY), (AGame.cursorX - 1), AGame.Thumbnail)) {
                AGame.removeFocus();
                AGame.cursorX--;
                AGame.addFocus();
            } else {
                for (i = (Main.ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main.ThumbNull((AGame.cursorY - 1), i, AGame.Thumbnail)) {
                        AGame.removeFocus();
                        AGame.cursorY--;
                        AGame.cursorX = i;
                        AGame.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (AGame.cursorY == -1) {
                AGame.cursorY = 0;
                AGame.removeFocusFallow();
                AGame.addFocus();
            } else if (Main.ThumbNull((AGame.cursorY), (AGame.cursorX + 1), AGame.Thumbnail)) {
                AGame.removeFocus();
                AGame.cursorX++;
                AGame.addFocus();
            } else if (Main.ThumbNull((AGame.cursorY + 1), 0, AGame.Thumbnail)) {
                AGame.removeFocus();
                AGame.cursorY++;
                AGame.cursorX = 0;
                AGame.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            if (!AGame.cursorY) {
                AGame.removeFocus();
                AGame.cursorY = -1;
                AGame.addFocusFallow();
            } else {
                for (i = 0; i < Main.ColoumnsCountVideo; i++) {
                    if (Main.ThumbNull((AGame.cursorY - 1), (AGame.cursorX - i), AGame.Thumbnail)) {
                        AGame.removeFocus();
                        AGame.cursorY--;
                        AGame.cursorX = AGame.cursorX - i;
                        AGame.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            if (AGame.cursorY == -1) {
                AGame.cursorY = 0;
                AGame.removeFocusFallow();
                AGame.addFocus();
            } else {
                for (i = 0; i < Main.ColoumnsCountVideo; i++) {
                    if (Main.ThumbNull((AGame.cursorY + 1), (AGame.cursorX - i), AGame.Thumbnail)) {
                        AGame.removeFocus();
                        AGame.cursorY++;
                        AGame.cursorX = AGame.cursorX - i;
                        AGame.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!AGame.loadingMore) AGame.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            Main.Go = Main.Live;
            AGame.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = AddUser.IsUserSet() ? Main.Users : Main.AddUser;
            AGame.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (AGame.cursorY !== -1) {
                Play.selectedChannel = $('#' + AGame.Cell + AGame.cursorY + '_' + AGame.cursorX).attr('data-channelname');
                Play.selectedChannelDisplayname = document.getElementById(AGame.DispNameDiv + AGame.cursorY + '_' + AGame.cursorX).textContent;
                document.body.removeEventListener("keydown", AGame.handleKeyDown);
                Main.OldgameSelected = Main.gameSelected;
                Main.openStream();
            } else AGame.fallow();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            AGame.exit();
            Main.GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.AGame;
            Main.Go = Main.Search;
            Main.OldgameSelected = Main.gameSelected;
            AGame.exit();
            Main.SwitchScreen();
            break;
        default:
            break;
    }
};
