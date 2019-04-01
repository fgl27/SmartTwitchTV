//Variable initialization
var ChannelVod_cursorY = 0;
var ChannelVod_cursorX = 0;
var ChannelVod_dataEnded = false;
var ChannelVod_itemsCount = 0;
var ChannelVod_idObject = {};
var ChannelVod_emptyCellVector = [];
var ChannelVod_loadingData = false;
var ChannelVod_loadingDataTry = 0;
var ChannelVod_loadingDataTryMax = 5;
var ChannelVod_loadingDataTimeout = 3500;
var ChannelVod_itemsCountOffset = 0;
var ChannelVod_MaxOffset = 0;
var ChannelVod_DurationSeconds = 0;
var ChannelVod_emptyContent = false;
var ChannelVod_itemsCountCheck = false;
var ChannelVod_language = '';
var ChannelVod_TopRowCreated = false;

var ChannelVod_ids = ['cv_thumbdiv', 'cv_img', 'cv_infodiv', 'cv_title', 'cv_streamon', 'cv_duration', 'cv_viwers', 'cv_quality', 'cv_cell', 'cvempty_', 'channel_vod_scroll', 'cv_game'];
var ChannelVod_status = false;
var ChannelVod_highlight = false;
var ChannelVod_lastselectedChannel = '';
var ChannelVod_title = '';
var ChannelVod_views = '';
var ChannelVod_createdAt = '';
var ChannelVod_Duration = '';
var ChannelVod_vodOffset = 0;
//Variable initialization end

function ChannelVod_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_ChannelVod;
    if (!Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
    if (Main_values.Main_selectedChannel !== ChannelVod_lastselectedChannel) ChannelVod_status = false;
    Main_cleanTopLabel();
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
    Main_textContent('top_bar_user', Main_values.Main_selectedChannelDisplayname);
    document.body.addEventListener("keydown", ChannelVod_handleKeyDown, false);
    if (ChannelVod_status) {
        Main_YRst(ChannelVod_cursorY);
        Main_textContent('top_bar_game', ChannelVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA);
        Main_ShowElement(ChannelVod_ids[10]);
        Main_CounterDialog(ChannelVod_cursorX, ChannelVod_cursorY, Main_ColoumnsCountVideo, ChannelVod_itemsCount);
        ChannelVod_addFocus();
        Main_SaveValues();
    } else ChannelVod_StartLoad();
}

function ChannelVod_exit() {
    if (ChannelVod_status) ChannelVod_removeFocus();
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", ChannelVod_handleKeyDown);
    Main_HideElement(ChannelVod_ids[10]);
}

function ChannelVod_StartLoad() {
    if (ChannelVod_status) ChannelVod_removeFocus();
    Main_empty('stream_table_channel_vod');
    Main_textContent('top_bar_game', ChannelVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    ChannelVod_lastselectedChannel = Main_values.Main_selectedChannel;
    ChannelVod_status = false;
    ChannelVod_itemsCountOffset = 0;
    ChannelVod_MaxOffset = 0;
    ChannelVod_TopRowCreated = false;
    ChannelVod_idObject = {};
    ChannelVod_emptyCellVector = [];
    ChannelVod_itemsCountCheck = false;
    Main_FirstLoad = true;
    ChannelVod_itemsCount = 0;
    ChannelVod_cursorX = 0;
    ChannelVod_cursorY = 0;
    ChannelVod_dataEnded = false;
    Main_CounterDialogRst();
    Main_ready(function() {
        ChannelVod_loadDataPrepare();
        ChannelVod_loadDataRequest();
    });
}

function ChannelVod_loadDataPrepare() {
    Main_imgVectorRst();
    ChannelVod_loadingData = true;
    ChannelVod_loadingDataTry = 0;
    ChannelVod_loadingDataTimeout = 3500;
}

function ChannelVod_loadDataRequest() {

    var offset = ChannelVod_itemsCount + ChannelVod_itemsCountOffset;
    if (offset && offset > (ChannelVod_MaxOffset - 1)) {
        offset = ChannelVod_MaxOffset - Main_ItemsLimitVideo;
        ChannelVod_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/channels/' +
        encodeURIComponent(Main_values.Main_selectedChannel_id) + '/videos?limit=' + Main_ItemsLimitVideo +
        '&broadcast_type=' + (ChannelVod_highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + offset;

    BasehttpGet(theUrl, ChannelVod_loadingDataTimeout, 2, null, ChannelVod_loadDataSuccess, ChannelVod_loadDataError);
}

function ChannelVod_loadDataError() {
    ChannelVod_loadingDataTry++;
    if (ChannelVod_loadingDataTry < ChannelVod_loadingDataTryMax) {
        ChannelVod_loadingDataTimeout += 500;
        ChannelVod_loadDataRequest();
    } else {
        ChannelVod_loadingData = false;
        if (!ChannelVod_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            ChannelVod_dataEnded = true;
            ChannelVod_loadDataSuccessFinish();
        }
    }
}

function ChannelVod_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.videos.length;
    ChannelVod_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) ChannelVod_dataEnded = true;

    var offset_itemsCount = ChannelVod_itemsCount;
    ChannelVod_itemsCount += response_items;

    ChannelVod_emptyContent = !ChannelVod_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, video, id,
        cursor = 0,
        thumbnail_404, thumbnail;

    // Make the game video/clip/fallowing cell
    if (!ChannelVod_TopRowCreated) {
        ChannelVod_TopRowCreated = true;
        row = document.createElement('tr');
        var thumbfallow = '<i class="icon-movie-play stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_SWITCH_VOD;
        Main_td = document.createElement('td');
        Main_td.setAttribute('id', ChannelVod_ids[8] + 'y_0');
        Main_td.className = 'stream_cell';
        Main_td.innerHTML = '<div id="' + ChannelVod_ids[0] +
            'y_0" class="stream_thumbnail_channel_vod" ><div id="' + ChannelVod_ids[3] +
            'y_0" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
        row.appendChild(Main_td);
        document.getElementById("stream_table_channel_vod").appendChild(row);
    }

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.videos[cursor];
            id = video._id;
            thumbnail = video.preview.template;
            thumbnail_404 = (thumbnail + '').indexOf('404_processing') !== -1;

            // video content can be null sometimes, in that case the preview will be 404_processing
            // but if the video is from the stream that has not yet ended it can also be 404_processing and not be a null video
            if (!row_id && !coloumn_id && thumbnail_404) {
                thumbnail_404 = false;
                thumbnail = IMG_404_VIDEO;
            }

            if (thumbnail_404 || ChannelVod_idObject[id]) coloumn_id--;
            else {
                ChannelVod_idObject[id] = 1;
                row.appendChild(Vod_createCell(row_id, row_id + '_' + coloumn_id,
                    [id, video.length, video.language, video.game, video.channel.name, video.increment_view_count_url],
                    [thumbnail.replace("{width}x{height}", Main_VideoSize),
                        twemoji.parse(video.title), STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                        STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                        Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language),
                        STR_DURATION + Play_timeS(video.length), video.animated_preview_url
                    ], ChannelVod_ids));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (ChannelVod_dataEnded && !ChannelVod_itemsCountCheck) {
                ChannelVod_itemsCountCheck = true;
                ChannelVod_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(ChannelVod_ids[9] + row_id + '_' + coloumn_id));
            ChannelVod_emptyCellVector.push(ChannelVod_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_channel_vod").appendChild(row);
    }

    ChannelVod_loadDataSuccessFinish();
}

function ChannelVod_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!ChannelVod_status) {
            Main_HideLoadDialog();
            if (ChannelVod_emptyContent) Main_showWarningDialog(STR_NO + (ChannelVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_FOR_THIS + STR_CHANNEL);
            else {
                ChannelVod_status = true;
                Main_imgVectorLoad(IMG_404_VIDEO);
                ChannelVod_addFocus();
                Main_SaveValues();
            }
            Main_ShowElement(ChannelVod_ids[10]);
            Main_FirstLoad = false;
        } else Main_imgVectorLoad(IMG_404_VIDEO);

        if (ChannelVod_emptyCellVector.length > 0 && !ChannelVod_dataEnded) {
            ChannelVod_loadDataPrepare();
            ChannelVod_loadDataReplace();
            return;
        } else {
            Main_CounterDialog(ChannelVod_cursorX, ChannelVod_cursorY, Main_ColoumnsCountVideo, ChannelVod_itemsCount);
            ChannelVod_emptyCellVector = [];
        }

        ChannelVod_loadingData = false;
    });
}

function ChannelVod_loadDataReplace() {
    Main_SetItemsLimitReplace(ChannelVod_emptyCellVector.length);

    var offset = ChannelVod_itemsCount + ChannelVod_itemsCountOffset;

    if (offset && offset > (ChannelVod_MaxOffset - 1)) {
        offset = ChannelVod_MaxOffset - Main_ItemsLimitReplace;
        ChannelVod_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/channels/' +
        encodeURIComponent(Main_values.Main_selectedChannel_id) + '/videos?limit=' + Main_ItemsLimitReplace + '&broadcast_type=' +
        (ChannelVod_highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + offset;

    BasehttpGet(theUrl, ChannelVod_loadingDataTimeout, 2, null, ChannelVod_loadDataSuccessReplace, ChannelVod_loadDataErrorReplace);
}

function ChannelVod_loadDataErrorReplace() {
    ChannelVod_loadingDataTry++;
    if (ChannelVod_loadingDataTry < ChannelVod_loadingDataTryMax) {
        ChannelVod_loadingDataTimeout += 500;
        ChannelVod_loadDataReplace();
    } else {
        ChannelVod_dataEnded = true;
        ChannelVod_itemsCount -= ChannelVod_emptyCellVector.length;
        ChannelVod_emptyCellVector = [];
        ChannelVod_loadDataSuccessFinish();
    }
}


function ChannelVod_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.videos.length,
        video, id, i = 0,
        cursor = 0,
        tempVector = [];

    ChannelVod_MaxOffset = parseInt(response._total);

    for (i; i < ChannelVod_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.videos[cursor];
        id = video._id;
        if ((video.preview.template + '').indexOf('404_processing') !== -1 || ChannelVod_idObject[id]) i--;
        else {
            ChannelVod_idObject[id] = 1;
            Vod_replaceVideo(ChannelVod_emptyCellVector[i],
                [id, video.length, video.language, video.game, video.channel.name, video.increment_view_count_url],
                [video.preview.template.replace("{width}x{height}", Main_VideoSize),
                    twemoji.parse(video.title), STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                    STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                    Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language),
                    STR_DURATION + Play_timeS(video.length), video.animated_preview_url
                ], ChannelVod_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) ChannelVod_emptyCellVector.splice(tempVector[i], 1);

    ChannelVod_itemsCountOffset += cursor;
    if (ChannelVod_dataEnded) {
        ChannelVod_itemsCount -= ChannelVod_emptyCellVector.length;
        ChannelVod_emptyCellVector = [];
    }

    ChannelVod_loadDataSuccessFinish();
}

function ChannelVod_addFocus() {
    if (ChannelVod_cursorY < 0) {
        ChannelVod_addFocusFallow();
        return;
    }
    Main_addFocusVideo(ChannelVod_cursorY, ChannelVod_cursorX, ChannelVod_ids, Main_ColoumnsCountVideo, ChannelVod_itemsCount);

    Vod_AnimateThumb(ChannelVod_ids, ChannelVod_cursorY + '_' + ChannelVod_cursorX);

    if (((ChannelVod_cursorY + Main_ItemsReloadLimitVideo) > (ChannelVod_itemsCount / Main_ColoumnsCountVideo)) &&
        !ChannelVod_dataEnded && !ChannelVod_loadingData) {
        ChannelVod_loadDataPrepare();
        ChannelVod_loadDataRequest();
    }
    if (Main_CenterLablesInUse) ChannelVod_removeFocus();
}

function ChannelVod_removeFocus() {
    window.clearInterval(Vod_AnimateThumbId);
    if (ChannelVod_cursorY > -1 && ChannelVod_itemsCount) {
        Main_ShowElement(ChannelVod_ids[1] + ChannelVod_cursorY + '_' + ChannelVod_cursorX);
        Main_removeFocus(ChannelVod_cursorY + '_' + ChannelVod_cursorX, ChannelVod_ids);
    } else ChannelVod_removeFocusFallow();
}

function ChannelVod_addFocusFallow() {
    Main_AddClass(ChannelVod_ids[0] + 'y_0', Main_classThumb);
}

function ChannelVod_removeFocusFallow() {
    Main_RemoveClass(ChannelVod_ids[0] + 'y_0', Main_classThumb);
}

function ChannelVod_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                ChannelVod_removeFocus();
                Main_CenterLablesStart(ChannelVod_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((ChannelVod_cursorY), (ChannelVod_cursorX - 1), ChannelVod_ids[0])) {
                ChannelVod_removeFocus();
                ChannelVod_cursorX--;
                ChannelVod_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((ChannelVod_cursorY - 1), i, ChannelVod_ids[0])) {
                        ChannelVod_removeFocus();
                        ChannelVod_cursorY--;
                        ChannelVod_cursorX = i;
                        ChannelVod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((ChannelVod_cursorY), (ChannelVod_cursorX + 1), ChannelVod_ids[0])) {
                ChannelVod_removeFocus();
                ChannelVod_cursorX++;
                ChannelVod_addFocus();
            } else if (Main_ThumbNull((ChannelVod_cursorY + 1), 0, ChannelVod_ids[0])) {
                ChannelVod_removeFocus();
                ChannelVod_cursorY++;
                ChannelVod_cursorX = 0;
                ChannelVod_addFocus();
            }
            break;
        case KEY_UP:
            if (ChannelVod_cursorY === -1 && !ChannelVod_emptyContent) {
                ChannelVod_cursorY = 0;
                ChannelVod_removeFocusFallow();
                ChannelVod_addFocus();
            } else if (!ChannelVod_cursorY) {
                ChannelVod_removeFocus();
                ChannelVod_cursorY = -1;
                ChannelVod_addFocusFallow();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((ChannelVod_cursorY - 1), (ChannelVod_cursorX - i), ChannelVod_ids[0])) {
                        ChannelVod_removeFocus();
                        ChannelVod_cursorY--;
                        ChannelVod_cursorX = ChannelVod_cursorX - i;
                        ChannelVod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_DOWN:
            if (ChannelVod_cursorY === -1 && !ChannelVod_emptyContent) {
                ChannelVod_cursorY = 0;
                ChannelVod_removeFocusFallow();
                ChannelVod_addFocus();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((ChannelVod_cursorY + 1), (ChannelVod_cursorX - i), ChannelVod_ids[0])) {
                        ChannelVod_removeFocus();
                        ChannelVod_cursorY++;
                        ChannelVod_cursorX = ChannelVod_cursorX - i;
                        ChannelVod_addFocus();
                        break;
                    }
                }

            }
            break;
        case KEY_CHANNELUP:
        case KEY_CHANNELDOWN:
            ChannelVod_highlight = !ChannelVod_highlight;
            Main_setItem('ChannelVod_highlight', ChannelVod_highlight ? 'true' : 'false');
            ChannelVod_StartLoad();
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            ChannelVod_StartLoad();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (ChannelVod_cursorY === -1) {
                ChannelVod_highlight = !ChannelVod_highlight;
                Main_setItem('ChannelVod_highlight', ChannelVod_highlight ? 'true' : 'false');
                ChannelVod_StartLoad();
            } else Main_OpenVod(ChannelVod_cursorY + '_' + ChannelVod_cursorX, ChannelVod_ids, ChannelVod_handleKeyDown);
            break;
        case KEY_RED:
            Main_SidePannelStart(ChannelVod_handleKeyDown);
            break;
        case KEY_GREEN:
            ChannelVod_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            if (!Main_values.Search_isSearching) {
                ChannelContent_SetChannelValue();
                Main_values.Main_BeforeSearch = Main_ChannelVod;
            }
            Main_values.Main_Go = Main_Search;
            ChannelVod_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}