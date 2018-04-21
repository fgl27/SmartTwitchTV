//Variable initialization
var aGame_cursorY = 0;
var aGame_cursorX = 0;
var aGame_dataEnded = false;
var aGame_itemsCount = 0;
var aGame_nameMatrix = [];
var aGame_blankCellVector = [];
var aGame_loadingData = false;
var aGame_loadingDataTry = 0;
var aGame_loadingDataTryMax = 10;
var aGame_loadingDataTimeout = 3500;
var aGame_isDialogOn = false;
var aGame_blankCellCount = 0;
var aGame_itemsCountOffset = 0;
var aGame_LastClickFinish = true;
var aGame_keyClickDelayTime = 25;
var aGame_ReplacedataEnded = false;
var aGame_MaxOffset = 0;
var aGame_emptyContent = false;

var aGame_ids = ['ag_thumbdiv', 'ag_img', 'ag_infodiv', 'ag_displayname', 'ag_streamtitle', 'ag_streamgame', 'ag_viwers', 'ag_quality', 'ag_cell', 'agempty_'];
var aGame_status = false;
var aGame_itemsCountCheck = false;
var aGame_fallowing = false;
var aGame_Usergames = false;
//Variable initialization end

function aGame_init() {
    main_Go = main_aGame;
    document.body.addEventListener("keydown", aGame_handleKeyDown, false);
    document.getElementById('top_bar_game').classList.add('icon_center_focus');
    document.getElementById('top_bar_game').innerHTML = STR_AGAME + main_UnderCenter(main_gameSelected);
    main_YRst(aGame_cursorY);
    if ((main_OldgameSelected === main_gameSelected) && aGame_status) {
        main_ScrollHelper(aGame_ids[0], aGame_cursorY, aGame_cursorX, main_aGame, main_ScrollOffSetMinusVideo,
            main_ScrollOffSetVideo, false);
        main_CounterDialog(aGame_cursorX, aGame_cursorY, main_ColoumnsCountVideo, aGame_itemsCount);
    } else aGame_StartLoad();
}

function aGame_exit() {
    if (aGame_status) {
        if (aGame_cursorY === -1) aGame_cursorY = 0;
        aGame_removeFocusFallow();
        aGame_addFocus();
    }
    document.getElementById('top_bar_game').innerHTML = STR_GAMES;
    document.body.removeEventListener("keydown", aGame_handleKeyDown);
    document.getElementById('top_bar_game').classList.remove('icon_center_focus');
}

function aGame_StartLoad() {
    main_HideWarningDialog();
    aGame_status = false;
    main_ScrollHelperBlank('blank_focus');
    main_showLoadDialog();
    var table = document.getElementById('stream_table_a_game');
    while (table.firstChild) table.removeChild(table.firstChild);
    aGame_loadingMore = false;
    aGame_blankCellCount = 0;
    aGame_itemsCountOffset = 0;
    aGame_ReplacedataEnded = false;
    aGame_MaxOffset = 0;
    aGame_nameMatrix = [];
    aGame_blankCellVector = [];
    aGame_itemsCountCheck = false;
    aGame_itemsCount = 0;
    aGame_cursorX = 0;
    aGame_cursorY = 0;
    aGame_dataEnded = false;
    main_CounterDialogRst();
    aGame_loadDataPrepare();
    aGame_loadDataRequest();
}

function aGame_loadDataPrepare() {
    aGame_loadingData = true;
    aGame_loadingDataTry = 0;
    aGame_loadingDataTimeout = 3500;
}

function aGame_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = aGame_itemsCount + aGame_itemsCountOffset;
        if (offset && offset > (aGame_MaxOffset - 1)) {
            offset = aGame_MaxOffset - main_ItemsLimitVideo;
            aGame_dataEnded = true;
            aGame_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(main_gameSelected) +
            '&limit=' + main_ItemsLimitVideo + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = aGame_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    aGame_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    aGame_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        aGame_loadDataError();
    }
}

function aGame_loadDataError() {
    aGame_loadingDataTry++;
    if (aGame_loadingDataTry < aGame_loadingDataTryMax) {
        aGame_loadingDataTimeout += (aGame_loadingDataTry < 5) ? 250 : 3500;
        aGame_loadDataRequest();
    } else {
        aGame_loadingData = false;
        aGame_loadingMore = false;
        main_HideLoadDialog();
        main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function aGame_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    aGame_MaxOffset = parseInt(response._total);

    if (response_items < main_ItemsLimitVideo) aGame_dataEnded = true;

    var offset_itemsCount = aGame_itemsCount;
    aGame_itemsCount += response_items;

    aGame_emptyContent = !aGame_itemsCount;

    var response_rows = response_items / main_ColoumnsCountVideo;
    if (response_items % main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row = document.createElement('tr'),
        stream,
        cursor = 0;

    // Make the game fallowing cell
    row.appendChild(main_createEmptyCell('x', 0, aGame_ids[9]));
    row.appendChild(main_createEmptyCell('x', 1, aGame_ids[9]));
    main_td = document.createElement('td');
    main_td.setAttribute('id', aGame_ids[8] + 'x_2');
    main_td.className = 'stream_cell';
    main_td.innerHTML = '<div id="' + aGame_ids[0] +
        'x_2" class="stream_thumbnail_fallow_game" ><div id="' + aGame_ids[3] +
        'x_2" class="stream_channel_fallow_game"></div></div>';
    row.appendChild(main_td);
    document.getElementById("stream_table_a_game").appendChild(row);

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            if (aGame_CellExists(stream.channel.name)) coloumn_id--;
            else {
                row.appendChild(aGame_createCell(row_id, row_id + '_' + coloumn_id, stream.channel.name, [stream.preview.template.replace("{width}x{height}", main_VideoSize),
                    main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                    stream.channel.status, stream.game, main_addCommas(stream.viewers) + STR_VIEWER,
                    main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
                ]));
            }
        }

        for (coloumn_id; coloumn_id < main_ColoumnsCountVideo; coloumn_id++) {
            if (aGame_dataEnded && !aGame_itemsCountCheck) {
                aGame_itemsCountCheck = true;
                aGame_itemsCount = (row_id * main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(main_createEmptyCell(aGame_ids[9] + row_id + '_' + coloumn_id));
            aGame_blankCellVector.push(aGame_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_a_game").appendChild(row);
    }

    aGame_loadDataSuccessFinish();
}

function aGame_createCell(row_id, id, channel_name, valuesArray) {
    aGame_nameMatrix.push(channel_name);
    if (row_id < main_ColoumnsCountVideo) main_PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return main_createCellVideo(channel_name, id, aGame_ids, valuesArray);
}

function aGame_CellExists(display_name) {
    if (aGame_nameMatrix.indexOf(display_name) > -1) {
        aGame_blankCellCount++;
        return true;
    }
    return false;
}

function aGame_loadDataSuccessFinish() {
    $(document).ready(function() {
        if (!aGame_status) {
            main_HideLoadDialog();
            aGame_Checkfallow();
            if (aGame_emptyContent) {
                main_showWarningDialog(STR_NO + STR_LIVE_GAMES);
                aGame_cursorY = -1;
                main_ScrollHelper(aGame_ids[0], 'x', 2, main_aGame, 135, 0, false);
                aGame_addFocusFallow();
            } else {
                aGame_status = true;
                aGame_addFocus();
                main_LazyImgStart(aGame_ids[1], 9, IMG_404_VIDEO, main_ColoumnsCountVideo);
            }
            aGame_loadingData = false;
        } else {
            if (aGame_blankCellCount > 0 && !aGame_dataEnded) {
                aGame_loadingMore = true;
                aGame_loadDataPrepare();
                aGame_loadDataReplace();
                return;
            } else aGame_blankCellCount = 0;

            aGame_loadingData = false;
            aGame_loadingMore = false;
        }
    });
}

function aGame_Checkfallow() {
    if (aGame_Usergames) {
        aGame_fallowing = true;
        aGame_setFallow();
    } else if (main_UserName !== '') addCode_CheckFallowGame();
    else {
        aGame_fallowing = false;
        aGame_setFallow();
    }
}

function aGame_setFallow() {
    if (aGame_fallowing) document.getElementById(aGame_ids[3] + "x_2").innerHTML = '<i class="icon-heart" style="color: #00b300; font-size: 100%; text-shadow: #FFFFFF 0px 0px 10px, #FFFFFF 0px 0px 10px, #FFFFFF 0px 0px 8px;"></i>' + STR_SPACE + STR_FALLOWING;
    else document.getElementById(aGame_ids[3] + "x_2").innerHTML = '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; text-shadow: #000000 0px 0px 10px, #000000 0px 0px 10px, #000000 0px 0px 8px;"></i>' + STR_SPACE + (main_UserName !== '' ? STR_FALLOW : STR_NOKEY);
}

function aGame_fallow() {
    if (addCode_OauthToken !== '') {
        if (aGame_fallowing) addCode_UnFallowGame();
        else addCode_FallowGame();
    } else {
        main_showWarningDialog(STR_NOKEY_WARN);
        window.setTimeout(function() {
            if (aGame_emptyContent && main_Go === main_aGame) main_showWarningDialog(STR_NO + STR_LIVE_GAMES);
            else main_HideWarningDialog();
        }, 2000);
    }
}

function aGame_loadDataReplace() {
    try {

        var xmlHttp = new XMLHttpRequest();

        main_SetItemsLimitReload(aGame_blankCellCount);

        var offset = aGame_itemsCount + aGame_itemsCountOffset;
        if (offset && offset > (aGame_MaxOffset - 1)) {
            offset = aGame_MaxOffset - main_ItemsLimitReload;
            aGame_ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(main_gameSelected) +
            '&limit=' + main_ItemsLimitReload + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = aGame_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    aGame_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        aGame_loadDataErrorReplace();
    }
}

function aGame_loadDataErrorReplace() {
    aGame_loadingDataTry++;
    if (aGame_loadingDataTry < aGame_loadingDataTryMax) {
        aGame_loadingDataTimeout += (aGame_loadingDataTry < 5) ? 250 : 3500;
        aGame_loadDataReplace();
    } else {
        aGame_ReplacedataEnded = true;
        aGame_blankCellCount = 0;
        aGame_blankCellVector = [];
        aGame_loadDataSuccessFinish();
    }
}

function aGame_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    var stream, index, cursor = 0;
    var tempVector = aGame_blankCellVector.slice();

    aGame_MaxOffset = parseInt(response._total);

    if (response_items < main_ItemsLimitVideo) aGame_ReplacedataEnded = true;


    for (var i = 0; i < aGame_blankCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        if (aGame_CellExists(stream.channel.name)) {
            aGame_blankCellCount--;
            i--;
        } else {
            main_replaceVideo(aGame_blankCellVector[i],
                stream.channel.name, [stream.preview.template.replace("{width}x{height}", main_VideoSize),
                    main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                    stream.channel.status, stream.game, main_addCommas(stream.viewers) + STR_VIEWER,
                    main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
                ], aGame_ids[8], aGame_ids[9]);
            aGame_blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    aGame_itemsCountOffset += cursor;
    if (aGame_ReplacedataEnded) {
        aGame_blankCellCount = 0;
        aGame_blankCellVector = [];
    } else aGame_blankCellVector = tempVector;

    aGame_loadDataSuccessFinish();
}

function aGame_addFocus() {

    main_addFocusVideoArray(aGame_cursorY, aGame_cursorX, aGame_ids, main_aGame, main_ColoumnsCountVideo, aGame_itemsCount);

    if (aGame_cursorY > 3) main_LazyImg(aGame_ids[1], aGame_cursorY, IMG_404_VIDEO, main_ColoumnsCountVideo, 4);

    if (((aGame_cursorY + main_ItemsReloadLimitVideo) > (aGame_itemsCount / main_ColoumnsCountVideo)) &&
        !aGame_dataEnded && !aGame_loadingMore) {
        aGame_loadingMore = true;
        aGame_loadDataPrepare();
        aGame_loadDataRequest();
    }
}

function aGame_removeFocus() {
    main_removeFocusVideoArray(aGame_cursorY + '_' + aGame_cursorX, aGame_ids);
}

function aGame_addFocusFallow() {
    document.getElementById(aGame_ids[0] + 'x_2').classList.add(main_classThumb);
}

function aGame_removeFocusFallow() {
    document.getElementById(aGame_ids[0] + 'x_2').classList.remove(main_classThumb);
}

function aGame_keyClickDelay() {
    aGame_LastClickFinish = true;
}

function aGame_handleKeyDown(event) {
    if ((aGame_loadingData && !aGame_loadingMore) || !aGame_LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        aGame_LastClickFinish = false;
        window.setTimeout(aGame_keyClickDelay, aGame_keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (main_isAboutDialogShown()) main_HideAboutDialog();
            else if (main_isControlsDialogShown()) main_HideControlsDialog();
            else if (!aGame_loadingMore) {
                main_OldgameSelected = main_gameSelected;
                if (main_Go === main_Before) main_Go = main_games;
                else main_Go = main_Before;
                aGame_exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (!aGame_cursorY && !aGame_cursorX) {
                aGame_removeFocus();
                aGame_cursorY = -1;
                aGame_addFocusFallow();
            } else if (aGame_cursorY === -1 && !aGame_emptyContent) {
                aGame_cursorY = 0;
                aGame_removeFocusFallow();
                aGame_addFocus();
            } else if (main_ThumbNull((aGame_cursorY), (aGame_cursorX - 1), aGame_ids[0])) {
                aGame_removeFocus();
                aGame_cursorX--;
                aGame_addFocus();
            } else {
                for (i = (main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (main_ThumbNull((aGame_cursorY - 1), i, aGame_ids[0])) {
                        aGame_removeFocus();
                        aGame_cursorY--;
                        aGame_cursorX = i;
                        aGame_addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (aGame_cursorY === -1 && !aGame_emptyContent) {
                aGame_cursorY = 0;
                aGame_removeFocusFallow();
                aGame_addFocus();
            } else if (main_ThumbNull((aGame_cursorY), (aGame_cursorX + 1), aGame_ids[0])) {
                aGame_removeFocus();
                aGame_cursorX++;
                aGame_addFocus();
            } else if (main_ThumbNull((aGame_cursorY + 1), 0, aGame_ids[0])) {
                aGame_removeFocus();
                aGame_cursorY++;
                aGame_cursorX = 0;
                aGame_addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            if (aGame_cursorY === -1 && !aGame_emptyContent) {
                aGame_cursorY = 0;
                aGame_removeFocusFallow();
                aGame_addFocus();
            } else if (!aGame_cursorY) {
                aGame_removeFocus();
                aGame_cursorY = -1;
                aGame_addFocusFallow();
            } else {
                for (i = 0; i < main_ColoumnsCountVideo; i++) {
                    if (main_ThumbNull((aGame_cursorY - 1), (aGame_cursorX - i), aGame_ids[0])) {
                        aGame_removeFocus();
                        aGame_cursorY--;
                        aGame_cursorX = aGame_cursorX - i;
                        aGame_addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            if (aGame_cursorY === -1 && !aGame_emptyContent) {
                aGame_cursorY = 0;
                aGame_removeFocusFallow();
                aGame_addFocus();
            } else {
                for (i = 0; i < main_ColoumnsCountVideo; i++) {
                    if (main_ThumbNull((aGame_cursorY + 1), (aGame_cursorX - i), aGame_ids[0])) {
                        aGame_removeFocus();
                        aGame_cursorY++;
                        aGame_cursorX = aGame_cursorX - i;
                        aGame_addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!aGame_loadingMore) aGame_StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            main_Go = main_Live;
            aGame_exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            main_Go = addUser_IsUserSet() ? main_Users : main_addUser;
            aGame_exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (aGame_cursorY !== -1) {
                Play.selectedChannel = document.getElementById(aGame_ids[8] + aGame_cursorY + '_' + aGame_cursorX).getAttribute('data-channelname');
                Play.selectedChannelDisplayname = document.getElementById(aGame_ids[3] + aGame_cursorY + '_' + aGame_cursorX).textContent;
                document.body.removeEventListener("keydown", aGame_handleKeyDown);
                main_OldgameSelected = main_gameSelected;
                main_openStream();
            } else aGame_fallow();
            break;
        case TvKeyCode.KEY_RED:
            main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            aGame_exit();
            main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            main_BeforeSearch = main_aGame;
            main_Go = main_Search;
            main_OldgameSelected = main_gameSelected;
            aGame_exit();
            main_SwitchScreen();
            break;
        default:
            break;
    }
}
