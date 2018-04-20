/*jshint multistr: true */
//Variable initialization
function Svod() {}
Svod.cursorY = 0;
Svod.cursorX = 0;
Svod.dataEnded = false;
Svod.itemsCount = 0;
Svod.nameMatrix = [];
Svod.blankCellVector = [];
Svod.loadingData = false;
Svod.loadingDataTry = 0;
Svod.loadingDataTryMax = 10;
Svod.loadingDataTimeout = 3500;
Svod.isDialogOn = false;
Svod.blankCellCount = 0;
Svod.itemsCountOffset = 0;
Svod.LastClickFinish = true;
Svod.keyClickDelayTime = 25;
Svod.ReplacedataEnded = false;
Svod.MaxOffset = 0;
Svod.DurationSeconds = 0;
Svod.emptyContent = false;
Svod.itemsCountCheck = false;

Svod.ids = ['sv_thumbdiv', 'sv_img', 'sv_infodiv', 'sv_title', 'sv_streamon', 'sv_duration', 'sv_viwers', 'sv_quality', 'sv_cell', 'svempty_'];
Svod.status = false;
Svod.highlight = false;
Svod.lastselectedChannel = '';
Svod.vodId = '';

//Variable initialization end

Svod.init = function() {
    Main.Go = Main.Svod;
    if (Main.selectedChannel !== Svod.lastselectedChannel) Svod.status = false;
    Main.cleanTopLabel();
    document.getElementById("top_bar_spacing").style.paddingLeft = Main.TopSpacingSearchUnder + "%";
    Main.IconLoad('label_switch', 'icon-switch', STR_SWITCH_VOD);
    document.getElementById('top_bar_user').innerHTML = Main.selectedChannelDisplayname;
    document.getElementById('top_bar_game').innerHTML = Svod.highlight ? STR_PAST_HIGHL : STR_PAST_BROA;
    document.body.addEventListener("keydown", Svod.handleKeyDown, false);
    Main.YRst(Svod.cursorY);
    if (Svod.status) {
        Main.ScrollHelper.scrollVerticalToElementById(Svod.ids[0], Svod.cursorY, Svod.cursorX, Main.Svod, Main.ScrollOffSetMinusVideo,
            Main.ScrollOffSetVideo, false);
        Main.CounterDialog(Svod.cursorX, Svod.cursorY, Main.ColoumnsCountVideo, Svod.itemsCount);
    } else Svod.StartLoad();
};

Svod.exit = function() {
    Main.RestoreTopLabel();
    document.body.removeEventListener("keydown", Svod.handleKeyDown);
};

Svod.StartLoad = function() {
    document.getElementById('top_bar_game').innerHTML = Svod.highlight ? STR_PAST_HIGHL : STR_PAST_BROA;
    Main.HideWarningDialog();
    Svod.lastselectedChannel = Main.selectedChannel;
    Svod.status = false;
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    var table = document.getElementById('stream_table_search_vod');
    while (table.firstChild) table.removeChild(table.firstChild);
    Svod.loadingMore = false;
    Svod.blankCellCount = 0;
    Svod.itemsCountOffset = 0;
    Svod.ReplacedataEnded = false;
    Svod.MaxOffset = 0;
    Svod.nameMatrix = [];
    Svod.blankCellVector = [];
    Svod.itemsCountCheck = false;
    Svod.itemsCount = 0;
    Svod.cursorX = 0;
    Svod.cursorY = 0;
    Svod.dataEnded = false;
    Main.CounterDialogRst();
    Svod.loadDataPrepare();
    Svod.loadDataRequest();
};

Svod.loadDataPrepare = function() {
    Svod.loadingData = true;
    Svod.loadingDataTry = 0;
    Svod.loadingDataTimeout = 3500;
};

Svod.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = Svod.itemsCount + Svod.itemsCountOffset;
        if (offset && offset > (Svod.MaxOffset - 1)) {
            offset = Svod.MaxOffset - Main.ItemsLimitVideo;
            Svod.dataEnded = true;
            Svod.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/channels/' + encodeURIComponent(Main.selectedChannel) + '/videos?limit=' +
            Main.ItemsLimitVideo + '&broadcast_type=' + (Svod.highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + offset + '&' +
            Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Svod.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Svod.loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    Svod.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Svod.loadDataError();
    }
};

Svod.loadDataError = function() {
    Svod.loadingDataTry++;
    if (Svod.loadingDataTry < Svod.loadingDataTryMax) {
        Svod.loadingDataTimeout += (Svod.loadingDataTry < 5) ? 250 : 3500;
        Svod.loadDataRequest();
    } else {
        Svod.loadingData = false;
        Svod.loadingMore = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

Svod.loadDataSuccess = function(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.videos.length;
    Svod.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitVideo) Svod.dataEnded = true;

    var offset_itemsCount = Svod.itemsCount;
    Svod.itemsCount += response_items;

    Svod.emptyContent = !Svod.itemsCount;

    var response_rows = response_items / Main.ColoumnsCountVideo;
    if (response_items % Main.ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, video,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.videos[cursor];
            if ((JSON.stringify(video.preview) + '').indexOf('404_processing_320x240.png') !== -1) { //video content can be null sometimes the preview will 404
                Svod.blankCellCount++;
                coloumn_id--;
            } else if (Svod.CellExists(video._id)) coloumn_id--;
            else {
                row.appendChild(Svod.createCell(row_id, row_id + '_' + coloumn_id, video._id, [video.preview.replace("320x240", Main.VideoSize),
                    video.title, STR_STREAM_ON + Main.videoCreatedAt(video.created_at), STR_DURATION + Play.timeS(video.length),
                    Main.addCommas(video.views) + STR_VIEWER,
                    Main.videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language)
                ]));
            }
        }

        for (coloumn_id; coloumn_id < Main.ColoumnsCountVideo; coloumn_id++) {
            if (Svod.dataEnded && !Svod.itemsCountCheck) {
                Svod.itemsCountCheck = true;
                Svod.itemsCount = (row_id * Main.ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main.createEmptyCell(Svod.ids[9] + row_id + '_' + coloumn_id));
            Svod.blankCellVector.push(Svod.ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_search_vod").appendChild(row);
    }

    Svod.loadDataSuccessFinish();
};

Svod.createCell = function(row_id, id, video_id, valuesArray) {
    Svod.nameMatrix.push(video_id);
    if (row_id < Main.ColoumnsCountVideo) Main.PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return Main.createCellVideo(video_id, id, Svod.ids, valuesArray);
};

Svod.CellExists = function(video_id) {
    if (Svod.nameMatrix.indexOf(video_id) > -1) {
        Svod.blankCellCount++;
        return true;
    }
    return false;
};

Svod.loadDataSuccessFinish = function() {
    $(document).ready(function() {
        if (!Svod.status) {
            Main.HideLoadDialog();
            if (Svod.emptyContent) Main.showWarningDialog(STR_NO + (Svod.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_FOR_THIS + STR_CHANNEL);
            else {
                Svod.status = true;
                Svod.addFocus();
                Main.LazyImgStart(Svod.ids[1], 9, IMG_404_VIDEO, Main.ColoumnsCountVideo);
            }
            Svod.loadingData = false;
        } else {
            if (Svod.blankCellCount > 0 && !Svod.dataEnded) {
                Svod.loadingMore = true;
                Svod.loadDataPrepare();
                Svod.loadDataReplace();
                return;
            } else {
                Svod.blankCellCount = 0;
                Svod.blankCellVector = [];
            }

            Svod.loadingData = false;
            Svod.loadingMore = false;
        }
    });
};

Svod.loadDataReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        Main.SetItemsLimitReload(Svod.blankCellCount);

        var offset = Svod.itemsCount + Svod.itemsCountOffset;

        if (offset && offset > (Svod.MaxOffset - 1)) {
            offset = Svod.MaxOffset - Main.ItemsLimitReload;
            Svod.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/channels/' + encodeURIComponent(Main.selectedChannel) + '/videos?limit=' +
            Main.ItemsLimitReload + '&broadcast_type=' + (Svod.highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + offset + '&' +
            Math.round(Math.random() * 1e7), true);

        xmlHttp.timeout = Svod.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Svod.loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Svod.loadDataErrorReplace();
    }
};

Svod.loadDataErrorReplace = function() {
    Svod.loadingDataTry++;
    if (Svod.loadingDataTry < Svod.loadingDataTryMax) {
        Svod.loadingDataTimeout += (Svod.loadingDataTry < 5) ? 250 : 3500;
        Svod.loadDataReplace();
    } else {
        Svod.ReplacedataEnded = true;
        Svod.blankCellCount = 0;
        Svod.blankCellVector = [];
        Svod.loadDataSuccessFinish();
    }
};


Svod.loadDataSuccessReplace = function(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.videos.length;
    var video, index, cursor = 0;
    var tempVector = Svod.blankCellVector.slice();

    Svod.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitVideo) Svod.ReplacedataEnded = true;

    for (var i = 0; i < Svod.blankCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.videos[cursor];
        if ((JSON.stringify(video.preview) + '').indexOf('404_processing_320x240.png') !== -1) {
            i--;
        } else if (Svod.CellExists(video._id)) {
            Svod.blankCellCount--;
            i--;
        } else {
            Main.replaceVideo(Svod.blankCellVector[i], video._id, [video.preview.replace("320x240", Main.VideoSize),
                video.title, STR_STREAM_ON + Main.videoCreatedAt(video.created_at), STR_DURATION + Play.timeS(video.length),
                Main.addCommas(video.views) + STR_VIEWER,
                Main.videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language)
            ]);
            Svod.blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) tempVector.splice(index, 1);
        }
    }

    Svod.itemsCountOffset += cursor;
    if (Svod.ReplacedataEnded) {
        Svod.blankCellCount = 0;
        Svod.blankCellVector = [];
    } else Svod.blankCellVector = tempVector;

    Svod.loadDataSuccessFinish();
};

Svod.addFocus = function() {
    document.getElementById(Svod.ids[0] + Svod.cursorY + '_' + Svod.cursorX).classList.add('stream_thumbnail_focused');
    document.getElementById(Svod.ids[2] + Svod.cursorY + '_' + Svod.cursorX).classList.add('stream_text_focused');
    document.getElementById(Svod.ids[3] + Svod.cursorY + '_' + Svod.cursorX).classList.add('stream_info_focused');
    document.getElementById(Svod.ids[4] + Svod.cursorY + '_' + Svod.cursorX).classList.add('stream_info_focused');
    document.getElementById(Svod.ids[5] + Svod.cursorY + '_' + Svod.cursorX).classList.add('stream_info_focused');
    document.getElementById(Svod.ids[6] + Svod.cursorY + '_' + Svod.cursorX).classList.add('stream_info_focused');
    document.getElementById(Svod.ids[7] + Svod.cursorY + '_' + Svod.cursorX).classList.add('stream_info_focused');

    window.setTimeout(function() {
        Main.ScrollHelper.scrollVerticalToElementById(Svod.ids[0], Svod.cursorY, Svod.cursorX, Main.Svod, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
    }, 10);

    Main.CounterDialog(Svod.cursorX, Svod.cursorY, Main.ColoumnsCountVideo, Svod.itemsCount);

    if (Svod.cursorY > 3) Main.LazyImg(Svod.ids[1], Svod.cursorY, IMG_404_VIDEO, Main.ColoumnsCountVideo, 4);

    if (((Svod.cursorY + Main.ItemsReloadLimitVideo) > (Svod.itemsCount / Main.ColoumnsCountVideo)) &&
        !Svod.dataEnded && !Svod.loadingMore) {
        Svod.loadingMore = true;
        Svod.loadDataPrepare();
        Svod.loadDataRequest();
    }
};

Svod.removeFocus = function() {
    document.getElementById(Svod.ids[0] + Svod.cursorY + '_' + Svod.cursorX).classList.remove('stream_thumbnail_focused');
    document.getElementById(Svod.ids[2] + Svod.cursorY + '_' + Svod.cursorX).classList.remove('stream_text_focused');
    document.getElementById(Svod.ids[3] + Svod.cursorY + '_' + Svod.cursorX).classList.remove('stream_info_focused');
    document.getElementById(Svod.ids[4] + Svod.cursorY + '_' + Svod.cursorX).classList.remove('stream_info_focused');
    document.getElementById(Svod.ids[5] + Svod.cursorY + '_' + Svod.cursorX).classList.remove('stream_info_focused');
    document.getElementById(Svod.ids[6] + Svod.cursorY + '_' + Svod.cursorX).classList.remove('stream_info_focused');
    document.getElementById(Svod.ids[7] + Svod.cursorY + '_' + Svod.cursorX).classList.remove('stream_info_focused');
};

Svod.keyClickDelay = function() {
    Svod.LastClickFinish = true;
};

Svod.handleKeyDown = function(event) {
    if (Svod.loadingData && !Svod.loadingMore) {
        event.preventDefault();
        return;
    } else if (!Svod.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        Svod.LastClickFinish = false;
        window.setTimeout(Svod.keyClickDelay, Svod.keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                Main.Go = Main.SChannelContent;
                Svod.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((Svod.cursorY), (Svod.cursorX - 1), Svod.ids[0])) {
                Svod.removeFocus();
                Svod.cursorX--;
                Svod.addFocus();
            } else {
                for (i = (Main.ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main.ThumbNull((Svod.cursorY - 1), i, Svod.ids[0])) {
                        Svod.removeFocus();
                        Svod.cursorY--;
                        Svod.cursorX = i;
                        Svod.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Main.ThumbNull((Svod.cursorY), (Svod.cursorX + 1), Svod.ids[0])) {
                Svod.removeFocus();
                Svod.cursorX++;
                Svod.addFocus();
            } else if (Main.ThumbNull((Svod.cursorY + 1), 0, Svod.ids[0])) {
                Svod.removeFocus();
                Svod.cursorY++;
                Svod.cursorX = 0;
                Svod.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Main.ColoumnsCountVideo; i++) {
                if (Main.ThumbNull((Svod.cursorY - 1), (Svod.cursorX - i), Svod.ids[0])) {
                    Svod.removeFocus();
                    Svod.cursorY--;
                    Svod.cursorX = Svod.cursorX - i;
                    Svod.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Main.ColoumnsCountVideo; i++) {
                if (Main.ThumbNull((Svod.cursorY + 1), (Svod.cursorX - i), Svod.ids[0])) {
                    Svod.removeFocus();
                    Svod.cursorY++;
                    Svod.cursorX = Svod.cursorX - i;
                    Svod.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_CHANNELUP:
        case TvKeyCode.KEY_CHANNELDOWN:
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!Svod.loadingMore) {
                Svod.highlight = !Svod.highlight;
                Svod.StartLoad();
            }
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Svod.vodId = document.getElementById(Svod.ids[8] + Svod.cursorY + '_' + Svod.cursorX).getAttribute('data-channelname').substr(1);
            Svod.DurationSeconds = parseInt(document.getElementById(Svod.ids[8] + Svod.cursorY + '_' + Svod.cursorX).getAttribute('data-durationseconds'));
            Svod.Duration = document.getElementById(Svod.ids[5] + Svod.cursorY + '_' + Svod.cursorX).textContent;
            Svod.views = document.getElementById(Svod.ids[6] + Svod.cursorY + '_' + Svod.cursorX).textContent;
            Svod.title = document.getElementById(Svod.ids[3] + Svod.cursorY + '_' + Svod.cursorX).textContent;
            Svod.createdAt = document.getElementById(Svod.ids[4] + Svod.cursorY + '_' + Svod.cursorX).textContent;
            Svod.openStream();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Svod.exit();
            Main.GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.Svod;
            Main.Go = Main.Search;
            Svod.exit();
            Main.SwitchScreen();
            break;
        default:
            break;
    }
};

Svod.openStream = function() {
    document.body.addEventListener("keydown", PlayVod.handleKeyDown, false);
    document.body.removeEventListener("keydown", Svod.handleKeyDown);
    document.getElementById('scene2').classList.remove('hide');
    PlayVod.hidePanel();
    Play.hideChat();
    Play.clearPause();
    Play.HideWarningDialog();
    document.getElementById('play_dialog_exit').classList.add('hide');
    document.getElementById('scene1').classList.add('hide');
    PlayVod.Start();
};
