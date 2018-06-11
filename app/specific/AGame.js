//Variable initialization
var AGame_cursorY = 0;
var AGame_cursorX = 0;
var AGame_dataEnded = false;
var AGame_itemsCount = 0;
var AGame_nameMatrix = [];
var AGame_blankCellVector = [];
var AGame_loadingData = false;
var AGame_loadingDataTry = 0;
var AGame_loadingDataTryMax = 10;
var AGame_loadingDataTimeout = 3500;
var AGame_blankCellCount = 0;
var AGame_itemsCountOffset = 0;
var AGame_ReplacedataEnded = false;
var AGame_MaxOffset = 0;
var AGame_emptyContent = false;

var AGame_ids = ['ag_thumbdiv', 'ag_img', 'ag_infodiv', 'ag_displayname', 'ag_streamtitle', 'ag_streamgame', 'ag_viwers', 'ag_quality', 'ag_cell', 'agempty_'];
var AGame_status = false;
var AGame_itemsCountCheck = false;
var AGame_fallowing = false;
var AGame_UserGames = false;
//Variable initialization end

function AGame_init() {
    Main_Go = Main_aGame;
    document.body.addEventListener("keydown", AGame_handleKeyDown, false);
    if (Search_isSearching) Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_AddClass('top_bar_game', 'icon_center_focus');
    Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter(STR_LIVE +
        ': ' + Main_gameSelected));
    Main_YRst(AGame_cursorY);
    if ((Main_OldgameSelected === Main_gameSelected) && AGame_status) {
        Main_ScrollHelperVideo(AGame_ids[0], AGame_cursorY, AGame_cursorX);
        Main_CounterDialog(AGame_cursorX, AGame_cursorY, Main_ColoumnsCountVideo, AGame_itemsCount);
    } else AGame_StartLoad();
}

function AGame_exit() {
    if (AGame_status && AGame_cursorY === -1) {
        AGame_cursorY = 0;
        AGame_removeFocusFallow();
        Main_AddClass(AGame_ids[0] + '0_' + AGame_cursorX, Main_classThumb);
    }
    Main_innerHTML('top_bar_game', STR_GAMES);
    document.body.removeEventListener("keydown", AGame_handleKeyDown);
    Main_RemoveClass('top_bar_game', 'icon_center_focus');
}

function AGame_StartLoad() {
    Main_HideWarningDialog();
    AGame_status = false;
    Main_ScrollHelperBlank('blank_focus');
    Main_showLoadDialog();
    Main_empty('stream_table_a_game');
    AGame_blankCellCount = 0;
    AGame_itemsCountOffset = 0;
    AGame_ReplacedataEnded = false;
    AGame_MaxOffset = 0;
    AGame_nameMatrix = [];
    AGame_blankCellVector = [];
    AGame_itemsCountCheck = false;
    AGame_itemsCount = 0;
    AGame_cursorX = 0;
    AGame_cursorY = 0;
    AGame_dataEnded = false;
    Main_CounterDialogRst();
    AGame_loadDataPrepare();
    AGame_loadDataRequest();
}

function AGame_loadDataPrepare() {
    AGame_loadingData = true;
    AGame_loadingDataTry = 0;
    AGame_loadingDataTimeout = 3500;
}

function AGame_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = AGame_itemsCount + AGame_itemsCountOffset;
        if (offset && offset > (AGame_MaxOffset - 1)) {
            offset = AGame_MaxOffset - Main_ItemsLimitVideo;
            AGame_dataEnded = true;
            AGame_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main_gameSelected) +
            '&limit=' + Main_ItemsLimitVideo + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = AGame_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    AGame_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    AGame_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AGame_loadDataError();
    }
}

function AGame_loadDataError() {
    AGame_loadingDataTry++;
    if (AGame_loadingDataTry < AGame_loadingDataTryMax) {
        AGame_loadingDataTimeout += (AGame_loadingDataTry < 5) ? 250 : 3500;
        AGame_loadDataRequest();
    } else {
        AGame_loadingData = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function AGame_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    AGame_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) AGame_dataEnded = true;

    var offset_itemsCount = AGame_itemsCount;
    AGame_itemsCount += response_items;

    AGame_emptyContent = !AGame_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row = document.createElement('tr'),
        stream,
        cursor = 0;

    // Make the game video/clip/fallowing cell
    var thumbfallow, i = 0;
    for (i; i < 3; i++) {
        if (!i) thumbfallow = '<i class="icon-movie-play" style="color: #FFFFFF; font-size: 100%"></i>' + STR_SPACE + STR_SPACE + STR_VIDEOS;
        else if (i === 1) thumbfallow = '<i class="icon-movie" style="color: #FFFFFF"></i>' + STR_SPACE + STR_CLIPS;
        else thumbfallow = '';
        Main_td = document.createElement('td');
        Main_td.setAttribute('id', AGame_ids[8] + 'y_' + i);
        Main_td.className = 'stream_cell';
        Main_td.innerHTML = '<div id="' + AGame_ids[0] +
            'y_' + i + '" class="stream_thumbnail_fallow_game" ><div id="' + AGame_ids[3] +
            'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
        row.appendChild(Main_td);
    }
    document.getElementById("stream_table_a_game").appendChild(row);

    for (i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            if (AGame_CellExists(stream.channel.name)) coloumn_id--;
            else {
                row.appendChild(AGame_createCell(row_id, row_id + '_' + coloumn_id, stream.channel.name, [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                    Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                    stream.channel.status, stream.game,
                    STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                    Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
                ]));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (AGame_dataEnded && !AGame_itemsCountCheck) {
                AGame_itemsCountCheck = true;
                AGame_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(AGame_ids[9] + row_id + '_' + coloumn_id));
            AGame_blankCellVector.push(AGame_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_a_game").appendChild(row);
    }

    AGame_loadDataSuccessFinish();
}

function AGame_createCell(row_id, id, channel_name, valuesArray) {
    AGame_nameMatrix.push(channel_name);
    if (row_id < Main_ColoumnsCountVideo) Main_PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return Main_createCellVideo(channel_name, id, AGame_ids, valuesArray);
}

function AGame_CellExists(display_name) {
    for (var i = 0; i < AGame_nameMatrix.length; i++) {
        if (display_name === AGame_nameMatrix[i]) {
            AGame_blankCellCount++;
            return true;
        }
    }
    return false;
}

function AGame_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!AGame_status) {
            Main_HideLoadDialog();
            AGame_Checkfallow();
            if (AGame_emptyContent) {
                Main_showWarningDialog(STR_NO + STR_LIVE_GAMES);
                AGame_cursorY = -1;
                Main_ScrollHelper(AGame_ids[0], 'y', 0, Main_aGame, 135, 0, false);
                AGame_addFocusFallow();
            } else {
                AGame_status = true;
                AGame_addFocus();
                Main_LazyImgStart(AGame_ids[1], 7, IMG_404_VIDEO, Main_ColoumnsCountVideo);
            }
        } else {
            if (AGame_blankCellCount > 0 && !AGame_dataEnded) {
                AGame_loadDataPrepare();
                AGame_loadDataReplace();
                return;
            } else AGame_blankCellCount = 0;
        }
        AGame_loadingData = false;
    });
}

function AGame_Checkfallow() {
    if (AGame_UserGames) {
        AGame_fallowing = true;
        AGame_setFallow();
    } else if (Main_UserName !== '') AddCode_CheckFallowGame();
    else {
        AGame_fallowing = false;
        AGame_setFallow();
    }
}

function AGame_setFallow() {
    if (AGame_fallowing) Main_innerHTML(AGame_ids[3] + "y_2", '<i class="icon-heart" style="color: #00b300; font-size: 100%; text-shadow: #FFFFFF 0 0 10px, #FFFFFF 0 0 10px, #FFFFFF 0 0 8px;"></i>' + STR_SPACE + STR_SPACE + STR_FALLOWING);
    else Main_innerHTML(AGame_ids[3] + "y_2", '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; text-shadow: #000000 0 0 10px, #000000 0 0 10px, #000000 0 0 8px;"></i>' + STR_SPACE + STR_SPACE + (Main_UserName !== '' ? STR_FALLOW : STR_NOKEY));
}

function AGame_fallow() {
    if (AddCode_OauthToken !== '') {
        if (AGame_fallowing) AddCode_UnFallowGame();
        else AddCode_FallowGame();
    } else {
        Main_showWarningDialog(STR_NOKEY_WARN);
        window.setTimeout(function() {
            if (AGame_emptyContent && Main_Go === Main_aGame) Main_showWarningDialog(STR_NO + STR_LIVE_GAMES);
            else Main_HideWarningDialog();
        }, 2000);
    }
}

function AGame_headerOptions() {
    if (!AGame_cursorX) {
        Main_Go = Main_Gvod;
        Main_OldgameSelected = Main_gameSelected;
        AGame_exit();
        Main_SwitchScreen();
    } else if (AGame_cursorX === 1) {
        Main_Go = Main_Gclip;
        Main_OldgameSelected = Main_gameSelected;
        AGame_exit();
        Main_SwitchScreen();
    } else AGame_fallow();

}

function AGame_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main_SetItemsLimitReplace(AGame_blankCellCount);

        var offset = AGame_itemsCount + AGame_itemsCountOffset;
        if (offset && offset > (AGame_MaxOffset - 1)) {
            offset = AGame_MaxOffset - Main_ItemsLimitReplace;
            AGame_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main_gameSelected) +
            '&limit=' + Main_ItemsLimitReplace + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = AGame_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    AGame_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AGame_loadDataErrorReplace();
    }
}

function AGame_loadDataErrorReplace() {
    AGame_loadingDataTry++;
    if (AGame_loadingDataTry < AGame_loadingDataTryMax) {
        AGame_loadingDataTimeout += (AGame_loadingDataTry < 5) ? 250 : 3500;
        AGame_loadDataReplace();
    } else {
        AGame_ReplacedataEnded = true;
        AGame_blankCellCount = 0;
        AGame_blankCellVector = [];
        AGame_loadDataSuccessFinish();
    }
}

function AGame_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    var stream, index, cursor = 0;
    var tempVector = AGame_blankCellVector.slice();

    AGame_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) AGame_ReplacedataEnded = true;


    for (var i = 0; i < AGame_blankCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        if (AGame_CellExists(stream.channel.name)) {
            AGame_blankCellCount--;
            i--;
        } else {
            AGame_nameMatrix.push(stream.channel.name);
            Main_replaceVideo(AGame_blankCellVector[i],
                stream.channel.name, [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                    Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                    stream.channel.status, stream.game,
                    STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                    Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
                ], AGame_ids);
            AGame_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    AGame_itemsCountOffset += cursor;
    if (AGame_ReplacedataEnded) {
        AGame_blankCellCount = 0;
        AGame_blankCellVector = [];
    } else AGame_blankCellVector = tempVector;

    AGame_loadDataSuccessFinish();
}

function AGame_addFocus() {

    Main_addFocusVideo(AGame_cursorY, AGame_cursorX, AGame_ids, Main_ColoumnsCountVideo, AGame_itemsCount);

    if (AGame_cursorY > 2) Main_LazyImg(AGame_ids[1], AGame_cursorY, IMG_404_VIDEO, Main_ColoumnsCountVideo, 3);

    if (((AGame_cursorY + Main_ItemsReloadLimitVideo) > (AGame_itemsCount / Main_ColoumnsCountVideo)) &&
        !AGame_dataEnded && !AGame_loadingData) {
        AGame_loadDataPrepare();
        AGame_loadDataRequest();
    }
}

function AGame_removeFocus() {
    Main_removeFocus(AGame_cursorY + '_' + AGame_cursorX, AGame_ids);
}

function AGame_addFocusFallow() {
    Main_AddClass(AGame_ids[0] + 'y_' + AGame_cursorX, Main_classThumb);
}

function AGame_removeFocusFallow() {
    Main_RemoveClass(AGame_ids[0] + 'y_' + AGame_cursorX, Main_classThumb);
}

function AGame_handleKeyDown(event) {
    if (AGame_loadingData || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Main_OldgameSelected = Main_gameSelected;
                if (!SGames_return) Main_Go = Main_BeforeAgame;
                else Main_Go = Main_sgames;
                AGame_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (AGame_cursorY === -1) {
                AGame_removeFocusFallow();
                AGame_cursorX--;
                if (AGame_cursorX < 0) AGame_cursorX = 2;
                AGame_addFocusFallow();
            } else if (!AGame_cursorY && !AGame_cursorX) {
                AGame_removeFocus();
                AGame_removeFocusFallow();
                AGame_cursorY = -1;
                AGame_cursorX = 2;
                AGame_addFocusFallow();
            } else if (Main_ThumbNull((AGame_cursorY), (AGame_cursorX - 1), AGame_ids[0])) {
                AGame_removeFocus();
                AGame_cursorX--;
                AGame_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((AGame_cursorY - 1), i, AGame_ids[0])) {
                        AGame_removeFocus();
                        AGame_cursorY--;
                        AGame_cursorX = i;
                        AGame_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (AGame_cursorY === -1) {
                AGame_removeFocusFallow();
                AGame_cursorX++;
                if (AGame_cursorX > 2) {
                    AGame_cursorX = 0;
                    if (!AGame_emptyContent) {
                        AGame_cursorY = 0;
                        AGame_addFocus();
                    } else AGame_addFocusFallow();
                } else AGame_addFocusFallow();
            } else if (Main_ThumbNull((AGame_cursorY), (AGame_cursorX + 1), AGame_ids[0])) {
                AGame_removeFocus();
                AGame_cursorX++;
                AGame_addFocus();
            } else if (Main_ThumbNull((AGame_cursorY + 1), 0, AGame_ids[0])) {
                AGame_removeFocus();
                AGame_cursorY++;
                AGame_cursorX = 0;
                AGame_addFocus();
            }
            break;
        case KEY_UP:
            if (AGame_cursorY === -1 && !AGame_emptyContent) {
                AGame_cursorY = 0;
                AGame_removeFocusFallow();
                AGame_addFocus();
            } else if (!AGame_cursorY) {
                AGame_removeFocus();
                AGame_cursorY = -1;
                AGame_addFocusFallow();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((AGame_cursorY - 1), (AGame_cursorX - i), AGame_ids[0])) {
                        AGame_removeFocus();
                        AGame_cursorY--;
                        AGame_cursorX = AGame_cursorX - i;
                        AGame_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_DOWN:
            if (AGame_cursorY === -1 && !AGame_emptyContent) {
                AGame_cursorY = 0;
                AGame_removeFocusFallow();
                AGame_addFocus();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((AGame_cursorY + 1), (AGame_cursorX - i), AGame_ids[0])) {
                        AGame_removeFocus();
                        AGame_cursorY++;
                        AGame_cursorX = AGame_cursorX - i;
                        AGame_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            AGame_StartLoad();
            break;
        case KEY_CHANNELUP:
            if (!Search_isSearching) {
                Main_Before = Main_aGame;
                Main_Go = Main_Vod;
                Main_OldgameSelected = Main_gameSelected;
                AGame_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_CHANNELDOWN:
            if (!Search_isSearching) {
                Main_Before = Main_aGame;
                Main_Go = Main_Featured;
                AGame_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (AGame_cursorY !== -1) {
                Play_selectedChannel = document.getElementById(AGame_ids[8] + AGame_cursorY + '_' + AGame_cursorX).getAttribute(Main_DataAttribute);
                Play_selectedChannelDisplayname = document.getElementById(AGame_ids[3] + AGame_cursorY + '_' + AGame_cursorX).textContent;
                document.body.removeEventListener("keydown", AGame_handleKeyDown);
                Main_OldgameSelected = Main_gameSelected;
                Main_openStream();
            } else AGame_headerOptions();
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            AGame_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_BeforeSearch = Main_aGame;
            Main_Go = Main_Search;
            Main_OldgameSelected = Main_gameSelected;
            AGame_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}