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

AGame.ids = ['ag_thumbdiv', 'ag_img', 'ag_infodiv', 'ag_displayname', 'ag_streamtitle', 'ag_streamgame', 'ag_viwers', 'ag_quality', 'ag_cell', 'agempty_'];
AGame.status = false;
AGame.itemsCountCheck = false;
AGame.fallowing = false;
AGame.UserGames = false;

//Variable initialization end


AGame.init = function() {
    Main.Go = Main.AGame;
    document.body.addEventListener("keydown", AGame.handleKeyDown, false);
    document.getElementById('top_bar_game').classList.add('icon_center_focus');
    document.getElementById('top_bar_game').innerHTML = STR_AGAME;
    document.getElementById('id_agame_name').innerHTML = Main.gameSelected;
    Main.YRst(AGame.cursorY);
    if ((Main.OldgameSelected === Main.gameSelected) && AGame.status) {
        Main.ScrollHelper.scrollVerticalToElementById(AGame.ids[0], AGame.cursorY, AGame.cursorX, Main.AGame, Main.ScrollOffSetMinusVideo,
            Main.ScrollOffSetVideo, false);
        Main.CounterDialog(AGame.cursorX, AGame.cursorY, Main.ColoumnsCountVideo, AGame.itemsCount);
    } else AGame.StartLoad();
};

AGame.exit = function() {
    if (AGame.cursorY === -1) AGame.cursorY = 0;
    AGame.removeFocusFallow();
    AGame.addFocus();
    document.getElementById('id_agame_name').innerHTML = '';
    document.getElementById('top_bar_game').innerHTML = STR_GAMES;
    document.body.removeEventListener("keydown", AGame.handleKeyDown);
    document.getElementById('top_bar_game').classList.remove('icon_center_focus');
};

AGame.StartLoad = function() {
    Main.HideWarningDialog();
    AGame.status = false;
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    var table = document.getElementById('stream_table_a_game');
    while (table.firstChild) table.removeChild(table.firstChild);
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
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    AGame.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitVideo) AGame.dataEnded = true;

    var offset_itemsCount = AGame.itemsCount;
    AGame.itemsCount += response_items;

    AGame.emptyContent = !AGame.itemsCount;

    var response_rows = response_items / Main.ColoumnsCountVideo;
    if (response_items % Main.ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row = document.createElement('tr'),
        stream,
        cursor = 0;

    // Make the game fallowing cell
    row.appendChild(Main.createEmptyCell('x', 0, AGame.ids[9]));
    row.appendChild(Main.createEmptyCell('x', 1, AGame.ids[9]));
    Main.td = document.createElement('td');
    Main.td.setAttribute('id', AGame.ids[8] + 'x_2');
    Main.td.className = 'stream_cell';
    Main.td.innerHTML = '<div id="' + AGame.ids[0] +
        'x_2" class="stream_thumbnail_fallow_game" ><div id="' + AGame.ids[3] +
        'x_2" class="stream_channel_fallow_game"></div></div>';
    row.appendChild(Main.td);
    document.getElementById("stream_table_a_game").appendChild(row);

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            if (AGame.CellExists(stream.channel.name)) coloumn_id--;
            else {
                row.appendChild(AGame.createCell(row_id, row_id + '_' + coloumn_id, stream.channel.name, [stream.preview.template.replace("{width}x{height}", Main.VideoSize),
                    Main.is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                    stream.channel.status, stream.game, Main.addCommas(stream.viewers) + STR_VIEWER,
                    Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
                ]));
            }
        }

        for (coloumn_id; coloumn_id < Main.ColoumnsCountVideo; coloumn_id++) {
            if (AGame.dataEnded && !AGame.itemsCountCheck) {
                AGame.itemsCountCheck = true;
                AGame.itemsCount = (row_id * Main.ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main.createEmptyCell(AGame.ids[9] + row_id + '_' + coloumn_id));
            AGame.blankCellVector.push(AGame.ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_a_game").appendChild(row);
    }

    AGame.loadDataSuccessFinish();
};

AGame.createCell = function(row_id, id, channel_name, valuesArray) {
    AGame.nameMatrix.push(channel_name);
    if (row_id < Main.ColoumnsCountVideo) Main.PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return Main.createCellVideo(channel_name, id, AGame.ids, valuesArray);
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
            Main.HideLoadDialog();
            if (AGame.emptyContent) Main.showWarningDialog(STR_NO + STR_LIVE_GAMES);
            else {
                AGame.status = true;
                AGame.Checkfallow();
                AGame.addFocus();
                Main.LazyImgStart(AGame.ids[1], 9, IMG_404_VIDEO, Main.ColoumnsCountVideo);
            }
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
    if (AGame.fallowing) document.getElementById(AGame.ids[3] + "x_2").innerHTML = '<i class="icon-heart" style="color: #00b300; font-size: 100%; text-shadow: #FFFFFF 0px 0px 10px, #FFFFFF 0px 0px 10px, #FFFFFF 0px 0px 8px;"></i>' + STR_SPACE + STR_FALLOWING;
    else document.getElementById(AGame.ids[3] + "x_2").innerHTML = '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; text-shadow: #000000 0px 0px 10px, #000000 0px 0px 10px, #000000 0px 0px 8px;"></i>' + STR_SPACE + (Main.UserName !== '' ? STR_FALLOW : STR_NOKEY);
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
    var response = JSON.parse(responseText);
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
            Main.replaceVideo(AGame.blankCellVector[i],
                stream.channel.name, [stream.preview.template.replace("{width}x{height}", Main.VideoSize),
                    Main.is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                    stream.channel.status, stream.game, Main.addCommas(stream.viewers) + STR_VIEWER,
                    Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
                ], AGame.ids[8], AGame.ids[9]);
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

AGame.addFocus = function() {

    Main.addFocusVideoArray(AGame.cursorY, AGame.cursorX, AGame.ids, Main.AGame, Main.ColoumnsCountVideo, AGame.itemsCount);

    if (AGame.cursorY > 3) Main.LazyImg(AGame.ids[1], AGame.cursorY, IMG_404_VIDEO, Main.ColoumnsCountVideo, 4);

    if (((AGame.cursorY + Main.ItemsReloadLimitVideo) > (AGame.itemsCount / Main.ColoumnsCountVideo)) &&
        !AGame.dataEnded && !AGame.loadingMore) {
        AGame.loadingMore = true;
        AGame.loadDataPrepare();
        AGame.loadDataRequest();
    }
};

AGame.removeFocus = function() {
    Main.removeFocusVideoArray(AGame.cursorY + '_' + AGame.cursorX, AGame.ids);
};

AGame.addFocusFallow = function() {
    document.getElementById(AGame.ids[0] + 'x_2').classList.add(Main.classThumb);
};

AGame.removeFocusFallow = function() {
    document.getElementById(AGame.ids[0] + 'x_2').classList.remove(Main.classThumb);
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
            } else if (AGame.cursorY === -1) {
                AGame.cursorY = 0;
                AGame.removeFocusFallow();
                AGame.addFocus();
            } else if (Main.ThumbNull((AGame.cursorY), (AGame.cursorX - 1), AGame.ids[0])) {
                AGame.removeFocus();
                AGame.cursorX--;
                AGame.addFocus();
            } else {
                for (i = (Main.ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main.ThumbNull((AGame.cursorY - 1), i, AGame.ids[0])) {
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
            if (AGame.cursorY === -1) {
                AGame.cursorY = 0;
                AGame.removeFocusFallow();
                AGame.addFocus();
            } else if (Main.ThumbNull((AGame.cursorY), (AGame.cursorX + 1), AGame.ids[0])) {
                AGame.removeFocus();
                AGame.cursorX++;
                AGame.addFocus();
            } else if (Main.ThumbNull((AGame.cursorY + 1), 0, AGame.ids[0])) {
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
                    if (Main.ThumbNull((AGame.cursorY - 1), (AGame.cursorX - i), AGame.ids[0])) {
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
            if (AGame.cursorY === -1) {
                AGame.cursorY = 0;
                AGame.removeFocusFallow();
                AGame.addFocus();
            } else {
                for (i = 0; i < Main.ColoumnsCountVideo; i++) {
                    if (Main.ThumbNull((AGame.cursorY + 1), (AGame.cursorX - i), AGame.ids[0])) {
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
                Play.selectedChannel = document.getElementById(AGame.ids[8] + AGame.cursorY + '_' + AGame.cursorX).getAttribute('data-channelname');
                Play.selectedChannelDisplayname = document.getElementById(AGame.ids[3] + AGame.cursorY + '_' + AGame.cursorX).textContent;
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
