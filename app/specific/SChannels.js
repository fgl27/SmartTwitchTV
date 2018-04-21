/*jshint multistr: true */
//Variable initialization
function SChannels() {}
SChannels.cursorY = 0;
SChannels.cursorX = 0;
SChannels.dataEnded = false;
SChannels.itemsCount = 0;
SChannels.nameMatrix = [];
SChannels.blankCellVector = [];
SChannels.loadingData = false;
SChannels.loadingDataTry = 0;
SChannels.loadingDataTryMax = 10;
SChannels.loadingDataTimeout = 3500;
SChannels.isDialogOn = false;
SChannels.blankCellCount = 0;
SChannels.itemsCountOffset = 0;
SChannels.LastClickFinish = true;
SChannels.keyClickDelayTime = 25;
SChannels.ReplacedataEnded = false;
SChannels.MaxOffset = 0;
SChannels.emptyContent = false;

SChannels.Img = 'img_schannels';
SChannels.Thumbnail = 'thumbnail_schannels_';
SChannels.EmptyCell = 'schannelsempty_';
SChannels.ThumbnailDiv = 'schannels_thumbnail_div_';
SChannels.DispNameDiv = 'schannels_display_name_';
SChannels.StreamTitleDiv = 'schannels_stream_title_';
SChannels.Cell = 'schannels_cell_';
SChannels.Status = false;
SChannels.lastData = '';
SChannels.itemsCountCheck = false;
SChannels.isLastSChannels = false;

//Variable initialization end

SChannels.init = function() {
    main_Go = main_SChannels;
    SChannels.isLastSChannels = true;
    if (SChannels.lastData !== Search.data) SChannels.Status = false;
    main_cleanTopLabel();
    document.getElementById('top_bar_user').innerHTML = STR_SEARCH + main_UnderCenter(STR_CHANNELS + ' ' + "'" + Search.data + "'");
    document.body.addEventListener("keydown", SChannels.handleKeyDown, false);
    main_YRst(SChannels.cursorY);
    if (SChannels.Status) {
        main_ScrollHelper(SChannels.Thumbnail, SChannels.cursorY, SChannels.cursorX, main_SChannels,
            main_ScrollOffSetMinusChannels, main_ScrollOffSetVideo, true);
        main_CounterDialog(SChannels.cursorX, SChannels.cursorY, main_ColoumnsCountChannel, SChannels.itemsCount);
    } else SChannels.StartLoad();
};

SChannels.exit = function() {
    main_RestoreTopLabel();
    document.body.removeEventListener("keydown", SChannels.handleKeyDown);
};

SChannels.Postexit = function() {
    main_SwitchScreen();
};

SChannels.StartLoad = function() {
    SChannels.lastData = Search.data;
    main_HideWarningDialog();
    SChannels.Status = false;
    main_ScrollHelperBlank('blank_focus');
    main_showLoadDialog();
    $('#stream_table_search_channel').empty();
    SChannels.loadingMore = false;
    SChannels.blankCellCount = 0;
    SChannels.itemsCountOffset = 0;
    SChannels.ReplacedataEnded = false;
    SChannels.MaxOffset = 0;
    SChannels.nameMatrix = [];
    SChannels.blankCellVector = [];
    SChannels.itemsCountCheck = false;
    SChannels.itemsCount = 0;
    SChannels.cursorX = 0;
    SChannels.cursorY = 0;
    SChannels.dataEnded = false;
    main_CounterDialogRst();
    SChannels.loadDataPrepare();
    SChannels.loadDataRequest();
};

SChannels.loadDataPrepare = function() {
    SChannels.loadingData = true;
    SChannels.loadingDataTry = 0;
    SChannels.loadingDataTimeout = 3500;
};

SChannels.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = SChannels.itemsCount + SChannels.itemsCountOffset;
        if (offset && offset > (SChannels.MaxOffset - 1)) {
            offset = SChannels.MaxOffset - main_ItemsLimitChannel;
            SChannels.dataEnded = true;
            SChannels.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/channels?query=' + encodeURIComponent(Search.data) +
            '&limit=' + main_ItemsLimitChannel + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SChannels.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    SChannels.loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    SChannels.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SChannels.loadDataError();
    }
};

SChannels.loadDataError = function() {
    SChannels.loadingDataTry++;
    if (SChannels.loadingDataTry < SChannels.loadingDataTryMax) {
        SChannels.loadingDataTimeout += (SChannels.loadingDataTry < 5) ? 250 : 3500;
        SChannels.loadDataRequest();
    } else {
        SChannels.loadingData = false;
        SChannels.loadingMore = false;
        main_HideLoadDialog();
        main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

SChannels.loadDataSuccess = function(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.channels.length;
    SChannels.MaxOffset = parseInt(response._total);

    if (response_items < main_ItemsLimitChannel) SChannels.dataEnded = true;

    var offset_itemsCount = SChannels.itemsCount;
    SChannels.itemsCount += response_items;

    SChannels.emptyContent = !SChannels.itemsCount;

    var response_rows = response_items / main_ColoumnsCountChannel;
    if (response_items % main_ColoumnsCountChannel > 0) response_rows++;

    var coloumn_id, row_id, row, cell, channels,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / main_ColoumnsCountChannel + i;
        row = $('<tr></tr>');

        for (coloumn_id = 0; coloumn_id < main_ColoumnsCountChannel && cursor < response_items; coloumn_id++, cursor++) {
            channels = response.channels[cursor];
            if (SChannels.CellExists(channels.name)) coloumn_id--;
            else {
                cell = SChannels.createCell(row_id, coloumn_id, channels.name, channels._id, channels.logo, channels.display_name, channels.views, channels.followers);
                row.append(cell);
            }
        }

        for (coloumn_id; coloumn_id < main_ColoumnsCountChannel; coloumn_id++) {
            if (SChannels.dataEnded && !SChannels.itemsCountCheck) {
                SChannels.itemsCountCheck = true;
                SChannels.itemsCount = (row_id * main_ColoumnsCountChannel) + coloumn_id;
            }
            row.append(main_createCellEmpty(row_id, coloumn_id, SChannels.EmptyCell));
            SChannels.blankCellVector.push(SChannels.EmptyCell + row_id + '_' + coloumn_id);
        }
        $('#stream_table_search_channel').append(row);
    }

    SChannels.loadDataSuccessFinish();
};


SChannels.createCell = function(row_id, coloumn_id, channel_name, _id, preview_thumbnail, channel_display_name, views, followers) {
    return $('<td id="' + SChannels.Cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '" data-id="' + _id + '" data-views="' + views + '" data-followers="' + followers + '"></td>').html(
        SChannels.CellHtml(row_id, coloumn_id, channel_name, preview_thumbnail, channel_display_name));
};

SChannels.CellHtml = function(row_id, coloumn_id, channel_name, preview_thumbnail, channel_display_name) {

    SChannels.nameMatrix.push(channel_name);

    if (row_id < 5) main_PreLoadAImage(preview_thumbnail); //try to pre cache first 3 rows

    return '<div id="' + SChannels.Thumbnail + row_id + '_' + coloumn_id + '" class="stream_thumbnail_channel" ><img id="' + SChannels.Img +
        row_id + '_' + coloumn_id + '" class="stream_img" data-src="' + preview_thumbnail + '"></div>' +
        '<div id="' + SChannels.ThumbnailDiv + row_id + '_' + coloumn_id + '" class="stream_text">' +
        '<div id="' + SChannels.DispNameDiv + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div></div>';
};

SChannels.CellExists = function(display_name) {
    if (SChannels.nameMatrix.indexOf(display_name) > -1) {
        SChannels.blankCellCount++;
        return true;
    }
    return false;
};

SChannels.loadDataSuccessFinish = function() {
    $(document).ready(function() {
        if (!SChannels.Status) {
            main_HideLoadDialog();
            if (SChannels.emptyContent) main_showWarningDialog(STR_SEARCH_RESULT_EMPTY);
            else {
                SChannels.Status = true;
                SChannels.addFocus();
                main_LazyImgStart(SChannels.Img, 9, IMG_404_LOGO, main_ColoumnsCountChannel);
            }
            SChannels.loadingData = false;
        } else {
            if (SChannels.blankCellCount > 0 && !SChannels.dataEnded) {
                SChannels.loadingMore = true;
                SChannels.loadDataPrepare();
                SChannels.loadDataReplace();
                return;
            } else {
                SChannels.blankCellCount = 0;
                SChannels.blankCellVector = [];
            }

            SChannels.loadingData = false;
            SChannels.loadingMore = false;
        }
    });
};

SChannels.loadDataReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        main_SetItemsLimitReload(SChannels.blankCellCount);

        var offset = SChannels.itemsCount + SChannels.itemsCountOffset;
        if (offset && offset > (SChannels.MaxOffset - 1)) {
            offset = SChannels.MaxOffset - main_ItemsLimitReload;
            SChannels.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/search/channels?query=' + encodeURIComponent(Search.data) +
            '&limit=' + main_ItemsLimitReload + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SChannels.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    SChannels.loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SChannels.loadDataErrorReplace();
    }
};

SChannels.loadDataErrorReplace = function() {
    SChannels.loadingDataTry++;
    if (SChannels.loadingDataTry < SChannels.loadingDataTryMax) {
        SChannels.loadingDataTimeout += (SChannels.loadingDataTry < 5) ? 250 : 3500;
        SChannels.loadDataReplace();
    } else {
        SChannels.ReplacedataEnded = true;
        SChannels.blankCellCount = 0;
        SChannels.blankCellVector = [];
        SChannels.loadDataSuccessFinish();
    }
};

SChannels.loadDataSuccessReplace = function(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.channels.length;
    var channels, index, cursor = 0;
    var tempVector = SChannels.blankCellVector.slice();

    SChannels.MaxOffset = parseInt(response._total);

    if (response_items < main_ItemsLimitVideo) SChannels.ReplacedataEnded = true;

    for (var i = 0; i < SChannels.blankCellVector.length && cursor < response_items; i++, cursor++) {
        channels = response.channels[cursor];
        if (SChannels.CellExists(channels.name)) {
            SChannels.blankCellCount--;
            i--;
        } else {
            SChannels.replaceCellEmpty(SChannels.blankCellVector[i], channels.name, channels._id, channels.logo, channels.display_name);
            SChannels.blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    SChannels.itemsCountOffset += cursor;
    if (SChannels.ReplacedataEnded) {
        SChannels.blankCellCount = 0;
        SChannels.blankCellVector = [];
    } else SChannels.blankCellVector = tempVector;

    SChannels.loadDataSuccessFinish();
};

SChannels.replaceCellEmpty = function(id, channel_name, _id, preview_thumbnail, channel_display_name) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = SChannels.Cell + row_id + '_' + coloumn_id;

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', channel_name);
    document.getElementById(cell).setAttribute('data-id', _id);
    document.getElementById(cell).innerHTML =
        SChannels.CellHtml(row_id, coloumn_id, channel_name, preview_thumbnail, channel_display_name);
};

SChannels.addFocus = function() {
    document.getElementById(SChannels.Thumbnail + SChannels.cursorY + '_' + SChannels.cursorX).classList.add('stream_thumbnail_focused');
    document.getElementById(SChannels.ThumbnailDiv + SChannels.cursorY + '_' + SChannels.cursorX).classList.add('stream_text_focused');
    document.getElementById(SChannels.DispNameDiv + SChannels.cursorY + '_' + SChannels.cursorX).classList.add('stream_info_focused');
    window.setTimeout(function() {
        main_ScrollHelper(SChannels.Thumbnail, SChannels.cursorY, SChannels.cursorX, main_SChannels, main_ScrollOffSetMinusChannels, main_ScrollOffSetVideo, true);
    }, 10);

    main_CounterDialog(SChannels.cursorX, SChannels.cursorY, main_ColoumnsCountChannel, SChannels.itemsCount);

    if (SChannels.cursorY > 3) main_LazyImg(SChannels.Img, SChannels.cursorY, IMG_404_LOGO, main_ColoumnsCountChannel, 4);

    if (((SChannels.cursorY + main_ItemsReloadLimitChannel) > (SChannels.itemsCount / main_ColoumnsCountChannel)) &&
        !SChannels.dataEnded && !SChannels.loadingMore) {
        SChannels.loadingMore = true;
        SChannels.loadDataPrepare();
        SChannels.loadDataRequest();
    }
};

SChannels.removeFocus = function() {
    document.getElementById(SChannels.Thumbnail + SChannels.cursorY + '_' + SChannels.cursorX).classList.remove('stream_thumbnail_focused');
    document.getElementById(SChannels.ThumbnailDiv + SChannels.cursorY + '_' + SChannels.cursorX).classList.remove('stream_text_focused');
    document.getElementById(SChannels.DispNameDiv + SChannels.cursorY + '_' + SChannels.cursorX).classList.remove('stream_info_focused');
};

SChannels.keyClickDelay = function() {
    SChannels.LastClickFinish = true;
};

SChannels.handleKeyDown = function(event) {
    if (SChannels.loadingData && !SChannels.loadingMore) {
        event.preventDefault();
        return;
    } else if (!SChannels.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        SChannels.LastClickFinish = false;
        window.setTimeout(SChannels.keyClickDelay, SChannels.keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (main_isAboutDialogShown()) main_HideAboutDialog();
            else if (main_isControlsDialogShown()) main_HideControlsDialog();
            else {
                if (main_Go === main_Before) main_Go = main_Live;
                else main_Go = main_Before;
                SChannels.exit();
                SChannels.Postexit();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (main_ThumbNull((SChannels.cursorY), (SChannels.cursorX - 1), SChannels.Thumbnail)) {
                SChannels.removeFocus();
                SChannels.cursorX--;
                SChannels.addFocus();
            } else {
                for (i = (main_ColoumnsCountChannel - 1); i > -1; i--) {
                    if (main_ThumbNull((SChannels.cursorY - 1), i, SChannels.Thumbnail)) {
                        SChannels.removeFocus();
                        SChannels.cursorY--;
                        SChannels.cursorX = i;
                        SChannels.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (main_ThumbNull((SChannels.cursorY), (SChannels.cursorX + 1), SChannels.Thumbnail)) {
                SChannels.removeFocus();
                SChannels.cursorX++;
                SChannels.addFocus();
            } else if (main_ThumbNull((SChannels.cursorY + 1), 0, SChannels.Thumbnail)) {
                SChannels.removeFocus();
                SChannels.cursorY++;
                SChannels.cursorX = 0;
                SChannels.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < main_ColoumnsCountChannel; i++) {
                if (main_ThumbNull((SChannels.cursorY - 1), (SChannels.cursorX - i), SChannels.Thumbnail)) {
                    SChannels.removeFocus();
                    SChannels.cursorY--;
                    SChannels.cursorX = SChannels.cursorX - i;
                    SChannels.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < main_ColoumnsCountChannel; i++) {
                if (main_ThumbNull((SChannels.cursorY + 1), (SChannels.cursorX - i), SChannels.Thumbnail)) {
                    SChannels.removeFocus();
                    SChannels.cursorY++;
                    SChannels.cursorX = SChannels.cursorX - i;
                    SChannels.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!SChannels.loadingMore) SChannels.StartLoad();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (!SChannels.loadingMore) {
                main_selectedChannel = $('#' + SChannels.Cell + SChannels.cursorY + '_' + SChannels.cursorX).attr('data-channelname');
                main_selectedChannel_id = $('#' + SChannels.Cell + SChannels.cursorY + '_' + SChannels.cursorX).attr('data-id');
                main_selectedChannelDisplayname = document.getElementById(SChannels.DispNameDiv + SChannels.cursorY + '_' + SChannels.cursorX).textContent;
                main_selectedChannelLogo = document.getElementById(SChannels.Img + SChannels.cursorY + '_' + SChannels.cursorX).src;
                main_selectedChannelViews = $('#' + SChannels.Cell + SChannels.cursorY + '_' + SChannels.cursorX).attr('data-views');
                main_selectedChannelFallower = $('#' + SChannels.Cell + SChannels.cursorY + '_' + SChannels.cursorX).attr('data-followers');
                document.body.removeEventListener("keydown", SChannels.handleKeyDown);
                main_Before = main_SChannels;
                main_Go = main_SChannelContent;
                addCode_IsFallowing = false;
                SChannelContent.UserChannels = false;
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_RED:
            main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            SChannels.exit();
            main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            main_BeforeSearch = main_SChannels;
            main_Go = main_Search;
            SChannels.exit();
            SChannels.Postexit();
            break;
        default:
            break;
    }
};
