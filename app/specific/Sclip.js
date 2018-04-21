/*jshint multistr: true */
//Variable initialization
function Sclip() {}
Sclip.cursorY = 0;
Sclip.cursorX = 0;
Sclip.dataEnded = false;
Sclip.itemsCount = 0;
Sclip.nameMatrix = [];
Sclip.blankCellVector = [];
Sclip.loadingData = false;
Sclip.loadingDataTry = 0;
Sclip.loadingDataTryMax = 10;
Sclip.loadingDataTimeout = 3500;
Sclip.isDialogOn = false;
Sclip.blankCellCount = 0;
Sclip.LastClickFinish = true;
Sclip.keyClickDelayTime = 25;
Sclip.ReplacedataEnded = false;
Sclip.MaxOffset = 0;
Sclip.DurationSeconds = 0;
Sclip.emptyContent = false;

Sclip.ids = ['sc_thumbdiv', 'sc_img', 'sc_infodiv', 'sc_title', 'sc_createdon', 'sc_game', 'sc_viwers', 'sc_duration', 'sc_cell', 'scempty_'];
Sclip.status = false;
Sclip.highlight = false;
Sclip.cursor = null;
Sclip.periodNumber = 1;
Sclip.period = 'week';
Sclip.Duration = 0;
Sclip.game = '';
Sclip.views = '';
Sclip.title = '';
Sclip.lastselectedChannel = '';
Sclip.playUrl = '';
Sclip.itemsCountCheck = false;

//Variable initialization end

Sclip.init = function() {
    main_Go = main_Sclip;
    main_SetStreamTitle(true);
    if (main_selectedChannel !== Sclip.lastselectedChannel) Sclip.status = false;
    main_cleanTopLabel();
    Sclip.SetPeriod();
    document.getElementById('top_bar_user').innerHTML = main_selectedChannelDisplayname;
    main_IconLoad('label_switch', 'icon-switch', STR_SWITCH_CLIP);
    document.body.addEventListener("keydown", Sclip.handleKeyDown, false);
    main_YRst(Sclip.cursorY);
    if (Sclip.status) {
        main_ScrollHelper(Sclip.ids[0], Sclip.cursorY, Sclip.cursorX, main_Sclip, main_ScrollOffSetMinusVideo,
            main_ScrollOffSetVideo, false);
        main_CounterDialog(Sclip.cursorX, Sclip.cursorY, main_ColoumnsCountVideo, Sclip.itemsCount);
    } else Sclip.StartLoad();
};

Sclip.exit = function() {
    main_RestoreTopLabel();
    document.body.removeEventListener("keydown", Sclip.handleKeyDown);
    main_SetStreamTitle(false);
};

Sclip.StartLoad = function() {
    main_HideWarningDialog();
    main_ScrollHelperBlank('blank_focus');
    main_showLoadDialog();
    Sclip.lastselectedChannel = main_selectedChannel;
    Sclip.cursor = null;
    Sclip.status = false;
    var table = document.getElementById('stream_table_search_clip');
    while (table.firstChild) table.removeChild(table.firstChild);
    Sclip.loadingMore = false;
    Sclip.blankCellCount = 0;
    Sclip.ReplacedataEnded = false;
    Sclip.MaxOffset = 0;
    Sclip.nameMatrix = [];
    Sclip.blankCellVector = [];
    Sclip.itemsCountCheck = false;
    Sclip.itemsCount = 0;
    Sclip.cursorX = 0;
    Sclip.cursorY = 0;
    Sclip.dataEnded = false;
    main_CounterDialogRst();
    Sclip.loadDataPrepare();
    Sclip.loadDataRequest();
};

Sclip.loadDataPrepare = function() {
    Sclip.loadingData = true;
    Sclip.loadingDataTry = 0;
    Sclip.loadingDataTimeout = 3500;
};

Sclip.SetPeriod = function() {
    if (!Sclip.periodNumber) {
        document.getElementById('top_bar_game').innerHTML = STR_CLIPS + STR_CLIP_DAY;
        Sclip.period = 'day';
    } else if (Sclip.periodNumber === 1) {
        document.getElementById('top_bar_game').innerHTML = STR_CLIPS + STR_CLIP_WEEK;
        Sclip.period = 'week';
    } else if (Sclip.periodNumber === 2) {
        document.getElementById('top_bar_game').innerHTML = STR_CLIPS + STR_CLIP_MONTH;
        Sclip.period = 'month';
    } else if (Sclip.periodNumber === 3) {
        document.getElementById('top_bar_game').innerHTML = STR_CLIPS + STR_CLIP_ALL;
        Sclip.period = 'all';
    }
};

Sclip.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?channel=' + encodeURIComponent(main_selectedChannel) + '&limit=' +
            main_ItemsLimitVideo + '&period=' + encodeURIComponent(Sclip.period) +
            (Sclip.cursor === null ? '' : '&cursor=' + encodeURIComponent(Sclip.cursor)) + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = Sclip.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Sclip.loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    Sclip.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Sclip.loadDataError();
    }
};

Sclip.loadDataError = function() {
    Sclip.loadingDataTry++;
    if (Sclip.loadingDataTry < Sclip.loadingDataTryMax) {
        Sclip.loadingDataTimeout += (Sclip.loadingDataTry < 5) ? 250 : 3500;
        Sclip.loadDataRequest();
    } else {
        Sclip.loadingData = false;
        Sclip.loadingMore = false;
        main_HideLoadDialog();
        main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

Sclip.loadDataSuccess = function(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.clips.length;
    Sclip.cursor = response._cursor;

    if (response_items < main_ItemsLimitVideo) Sclip.dataEnded = true;

    var offset_itemsCount = Sclip.itemsCount;
    Sclip.itemsCount += response_items;

    Sclip.emptyContent = !Sclip.itemsCount;

    var response_rows = response_items / main_ColoumnsCountVideo;
    if (response_items % main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, video,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.clips[cursor];
            if (Sclip.CellExists(video.tracking_id)) coloumn_id--;
            else {
                row.appendChild(Sclip.createCell(row_id, row_id + '_' + coloumn_id,
                    video.thumbnails.medium.split('-preview')[0] + '.mp4' + video.duration, [video.thumbnails.medium,
                    video.title, video.game, STR_STREAM_ON + main_videoCreatedAt(video.created_at),
                    main_addCommas(video.views) + STR_VIEWER, STR_DURATION + Play.timeS(video.duration)
                ]));
            }
        }

        for (coloumn_id; coloumn_id < main_ColoumnsCountVideo; coloumn_id++) {
            if (Sclip.dataEnded && !Sclip.itemsCountCheck) {
                Sclip.itemsCountCheck = true;
                Sclip.itemsCount = (row_id * main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(main_createEmptyCell(Sclip.ids[9] + row_id + '_' + coloumn_id));
            Sclip.blankCellVector.push(Sclip.ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_search_clip").appendChild(row);
    }

    Sclip.loadDataSuccessFinish();
};

Sclip.createCell = function(row_id, id, clip_id, valuesArray) {
    Sclip.nameMatrix.push(clip_id);
    if (row_id < main_ColoumnsCountVideo) main_PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return main_createCellVideo(clip_id, id, Sclip.ids, valuesArray);
};

Sclip.CellExists = function(display_name) {
    if (Sclip.nameMatrix.indexOf(display_name) > -1) {
        Sclip.blankCellCount++;
        return true;
    }
    return false;
};

Sclip.loadDataSuccessFinish = function() {
    $(document).ready(function() {
        if (!Sclip.status) {
            main_HideLoadDialog();
            if (Sclip.emptyContent) main_showWarningDialog(STR_NO + STR_CLIPS);
            else {
                Sclip.status = true;
                Sclip.addFocus();
                main_LazyImgStart(Sclip.ids[1], 9, IMG_404_VIDEO, main_ColoumnsCountVideo);
            }
            Sclip.loadingData = false;
        } else {
            if (Sclip.blankCellCount > 0 && !Sclip.dataEnded) {
                Sclip.loadingMore = true;
                Sclip.loadDataPrepare();
                Sclip.loadDataReplace();
                return;
            } else {
                Sclip.blankCellCount = 0;
                Sclip.blankCellVector = [];
            }

            Sclip.loadingData = false;
            Sclip.loadingMore = false;
        }
    });
};

Sclip.loadDataReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?channel=' + encodeURIComponent(main_selectedChannel) + '&limit=' +
            Sclip.blankCellCount + '&period=' + Sclip.period + (Sclip.cursor === null ? '' : '&cursor=' + encodeURIComponent(Sclip.cursor)) +
            '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = Sclip.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Sclip.loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Sclip.loadDataErrorReplace();
    }
};

Sclip.loadDataErrorReplace = function() {
    Sclip.loadingDataTry++;
    if (Sclip.loadingDataTry < Sclip.loadingDataTryMax) {
        Sclip.loadingDataTimeout += (Sclip.loadingDataTry < 5) ? 250 : 3500;
        Sclip.loadDataReplace();
    } else {
        Sclip.ReplacedataEnded = true;
        Sclip.blankCellCount = 0;
        Sclip.blankCellVector = [];
        Sclip.loadDataSuccessFinish();
    }
};

Sclip.loadDataSuccessReplace = function(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.clips.length;
    var video, index, cursor = 0;
    var tempVector = Sclip.blankCellVector.slice();

    Sclip.cursor = response._cursor;

    if (response_items < Sclip.blankCellCount) Sclip.ReplacedataEnded = true;

    for (var i = 0; i < Sclip.blankCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.clips[cursor];
        if (Sclip.CellExists(video.tracking_id)) {
            Sclip.blankCellCount--;
            i--;
        } else {
            main_replaceVideo(Svod.blankCellVector[i], video.thumbnails.medium.split('-preview')[0] + '.mp4', [video.thumbnails.medium,
                    video.title, video.game, STR_STREAM_ON + main_videoCreatedAt(video.created_at),
                    main_addCommas(video.views) + STR_VIEWER, STR_DURATION + Play.timeS(video.duration)
                ]);

            Sclip.blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) tempVector.splice(index, 1);
        }
    }

    Sclip.itemsCountOffset += cursor;
    if (Sclip.ReplacedataEnded) {
        Sclip.blankCellCount = 0;
        Sclip.blankCellVector = [];
    } else Sclip.blankCellVector = tempVector;

    Sclip.loadDataSuccessFinish();
};

Sclip.addFocus = function() {
    document.getElementById(Sclip.ids[0] + Sclip.cursorY + '_' + Sclip.cursorX).classList.add('stream_thumbnail_focused');
    document.getElementById(Sclip.ids[2] + Sclip.cursorY + '_' + Sclip.cursorX).classList.add('stream_text_focused');
    document.getElementById(Sclip.ids[3] + Sclip.cursorY + '_' + Sclip.cursorX).classList.add('stream_info_focused');
    document.getElementById(Sclip.ids[4] + Sclip.cursorY + '_' + Sclip.cursorX).classList.add('stream_info_focused');
    document.getElementById(Sclip.ids[5] + Sclip.cursorY + '_' + Sclip.cursorX).classList.add('stream_info_focused');
    document.getElementById(Sclip.ids[6] + Sclip.cursorY + '_' + Sclip.cursorX).classList.add('stream_info_focused');
    document.getElementById(Sclip.ids[7] + Sclip.cursorY + '_' + Sclip.cursorX).classList.add('stream_info_focused');

    window.setTimeout(function() {
        main_ScrollHelper(Sclip.ids[0], Sclip.cursorY, Sclip.cursorX, main_Sclip, main_ScrollOffSetMinusVideo, main_ScrollOffSetVideo, false);
    }, 10);

    main_CounterDialog(Sclip.cursorX, Sclip.cursorY, main_ColoumnsCountVideo, Sclip.itemsCount);

    if (Sclip.cursorY > 3) main_LazyImg(Sclip.ids[1], Sclip.cursorY, IMG_404_VIDEO, main_ColoumnsCountVideo, 4);

    if (((Sclip.cursorY + main_ItemsReloadLimitVideo) > (Sclip.itemsCount / main_ColoumnsCountVideo)) &&
        !Sclip.dataEnded && !Sclip.loadingMore) {
        Sclip.loadingMore = true;
        Sclip.loadDataPrepare();
        Sclip.loadDataRequest();
    }
};

Sclip.removeFocus = function() {
    document.getElementById(Sclip.ids[0] + Sclip.cursorY + '_' + Sclip.cursorX).classList.remove('stream_thumbnail_focused');
    document.getElementById(Sclip.ids[2] + Sclip.cursorY + '_' + Sclip.cursorX).classList.remove('stream_text_focused');
    document.getElementById(Sclip.ids[3] + Sclip.cursorY + '_' + Sclip.cursorX).classList.remove('stream_info_focused');
    document.getElementById(Sclip.ids[4] + Sclip.cursorY + '_' + Sclip.cursorX).classList.remove('stream_info_focused');
    document.getElementById(Sclip.ids[5] + Sclip.cursorY + '_' + Sclip.cursorX).classList.remove('stream_info_focused');
    document.getElementById(Sclip.ids[6] + Sclip.cursorY + '_' + Sclip.cursorX).classList.remove('stream_info_focused');
    document.getElementById(Sclip.ids[7] + Sclip.cursorY + '_' + Sclip.cursorX).classList.remove('stream_info_focused');
};

Sclip.keyClickDelay = function() {
    Sclip.LastClickFinish = true;
};

Sclip.handleKeyDown = function(event) {
    if (Sclip.loadingData && !Sclip.loadingMore) {
        event.preventDefault();
        return;
    } else if (!Sclip.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Sclip.LastClickFinish = false;
        window.setTimeout(Sclip.keyClickDelay, Sclip.keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (main_isAboutDialogShown()) main_HideAboutDialog();
            else if (main_isControlsDialogShown()) main_HideControlsDialog();
            else {
                main_Go = main_SChannelContent;
                Sclip.exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (main_ThumbNull((Sclip.cursorY), (Sclip.cursorX - 1), Sclip.ids[0])) {
                Sclip.removeFocus();
                Sclip.cursorX--;
                Sclip.addFocus();
            } else {
                for (i = (main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (main_ThumbNull((Sclip.cursorY - 1), i, Sclip.ids[0])) {
                        Sclip.removeFocus();
                        Sclip.cursorY--;
                        Sclip.cursorX = i;
                        Sclip.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (main_ThumbNull((Sclip.cursorY), (Sclip.cursorX + 1), Sclip.ids[0])) {
                Sclip.removeFocus();
                Sclip.cursorX++;
                Sclip.addFocus();
            } else if (main_ThumbNull((Sclip.cursorY + 1), 0, Sclip.ids[0])) {
                Sclip.removeFocus();
                Sclip.cursorY++;
                Sclip.cursorX = 0;
                Sclip.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < main_ColoumnsCountVideo; i++) {
                if (main_ThumbNull((Sclip.cursorY - 1), (Sclip.cursorX - i), Sclip.ids[0])) {
                    Sclip.removeFocus();
                    Sclip.cursorY--;
                    Sclip.cursorX = Sclip.cursorX - i;
                    Sclip.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < main_ColoumnsCountVideo; i++) {
                if (main_ThumbNull((Sclip.cursorY + 1), (Sclip.cursorX - i), Sclip.ids[0])) {
                    Sclip.removeFocus();
                    Sclip.cursorY++;
                    Sclip.cursorX = Sclip.cursorX - i;
                    Sclip.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
        case TvKeyCode.KEY_CHANNELUP:
            if (!Sclip.loadingMore) {
                Sclip.periodNumber++;
                if (Sclip.periodNumber > 3) Sclip.periodNumber = 0;
                Sclip.SetPeriod();
                Sclip.StartLoad();
            }
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            if (!Sclip.loadingMore) {
                Sclip.periodNumber--;
                if (Sclip.periodNumber < 0) Sclip.periodNumber = 3;
                Sclip.SetPeriod();
                Sclip.StartLoad();
            }
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Sclip.playUrl = document.getElementById(Sclip.ids[8] + Sclip.cursorY + '_' + Sclip.cursorX).getAttribute('data-channelname').split('.mp4');
            Sclip.DurationSeconds = parseInt(Sclip.playUrl[1]);
            Sclip.playUrl = Sclip.playUrl[0] + '.mp4';
            Sclip.Duration = document.getElementById(Sclip.ids[7] + Sclip.cursorY + '_' + Sclip.cursorX).textContent;
            Sclip.views = document.getElementById(Sclip.ids[6] + Sclip.cursorY + '_' + Sclip.cursorX).textContent;
            Sclip.title = document.getElementById(Sclip.ids[3] + Sclip.cursorY + '_' + Sclip.cursorX).textContent;
            Sclip.createdAt = document.getElementById(Sclip.ids[4] + Sclip.cursorY + '_' + Sclip.cursorX).textContent;
            Sclip.game = document.getElementById(Sclip.ids[5] + Sclip.cursorY + '_' + Sclip.cursorX).textContent;
            Sclip.openStream();
            break;
        case TvKeyCode.KEY_RED:
            main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Sclip.exit();
            main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            main_BeforeSearch = main_Sclip;
            main_Go = main_Search;
            Sclip.exit();
            main_SwitchScreen();
            break;
        default:
            break;
    }
};

Sclip.openStream = function() {
    document.body.addEventListener("keydown", PlayClip.handleKeyDown, false);
    document.body.removeEventListener("keydown", Sclip.handleKeyDown);
    document.getElementById('scene2').classList.remove('hide');
    Play.hideChat();
    Play.clearPause();
    Play.HideWarningDialog();
    document.getElementById('scene_channel_panel').classList.add('hide');
    document.getElementById('play_dialog_exit').classList.add('hide');
    document.getElementById('scene1').classList.add('hide');

    PlayClip.Start();
};
