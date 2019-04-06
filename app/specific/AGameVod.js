//Variable initialization
var AGameVod_cursorY = 0;
var AGameVod_cursorX = 0;
var AGameVod_dataEnded = false;
var AGameVod_itemsCount = 0;
var AGameVod_idObject = {};
var AGameVod_emptyCellVector = [];
var AGameVod_loadingData = false;
var AGameVod_loadingDataTry = 0;
var AGameVod_loadingDataTryMax = 5;
var AGameVod_loadingDataTimeout = 3500;
var AGameVod_itemsCountOffset = 0;
var AGameVod_MaxOffset = 0;
var AGameVod_emptyContent = false;
var AGameVod_itemsCountCheck = false;
var AGameVod_period = 'week';
var AGameVod_periodNumber = 2;
var AGameVod_TopRowCreated = false;

var AGameVod_ids = ['agv_thumbdiv', 'agv_img', 'agv_infodiv', 'agv_title', 'agv_streamon', 'agv_duration', 'agv_viwers', 'agv_quality', 'agv_cell', 'gvempty_', 'a_games_vod_scroll', 'agv_game'];
var AGameVod_status = false;
var AGameVod_highlight = false;
var AGameVod_OldgameSelected = '';
//Variable initialization end

function AGameVod_init() {
    Main_values.Main_CenterLablesVectorPos = 3;
    Main_values.Main_Go = Main_AGameVod;
    Main_AddClass('top_bar_game', 'icon_center_focus');
    document.body.addEventListener("keydown", AGameVod_handleKeyDown, false);

    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);

    if ((AGameVod_OldgameSelected === Main_values.Main_gameSelected) && AGameVod_status) {
        Main_YRst(AGameVod_cursorY);
        Main_ShowElement(AGameVod_ids[10]);
        Main_CounterDialog(AGameVod_cursorX, AGameVod_cursorY, Main_ColoumnsCountVideo, AGameVod_itemsCount);
        AGameVod_SetPeriod();
        AGameVod_addFocus();
        Main_SaveValues();
    } else AGameVod_StartLoad();
}

function AGameVod_exit() {
    if (AGameVod_status) AGameVod_removeFocus();
    document.body.removeEventListener("keydown", AGameVod_handleKeyDown);
    Main_RemoveClass('top_bar_game', 'icon_center_focus');
    Main_innerHTML('top_bar_game', STR_GAMES);

    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
    Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
    Main_HideElement(AGameVod_ids[10]);
}

function AGameVod_StartLoad() {
    if (AGameVod_status) AGameVod_removeFocus();
    Main_empty('stream_table_a_game_vod');
    Main_HideElement(AGameVod_ids[10]);
    Main_showLoadDialog();
    AGameVod_SetPeriod();
    AGameVod_OldgameSelected = Main_values.Main_gameSelected;
    Main_HideWarningDialog();
    AGameVod_status = false;
    AGameVod_itemsCountOffset = 0;
    AGameVod_TopRowCreated = false;
    AGameVod_MaxOffset = 0;
    AGameVod_idObject = {};
    AGameVod_emptyCellVector = [];
    AGameVod_itemsCountCheck = false;
    Main_FirstLoad = true;
    AGameVod_itemsCount = 0;
    AGameVod_cursorX = 0;
    AGameVod_cursorY = 0;
    AGameVod_dataEnded = false;
    Main_CounterDialogRst();
    AGameVod_loadDataPrepare();
    AGameVod_loadDataRequest();
}

function AGameVod_loadDataPrepare() {
    Main_imgVectorRst();
    AGameVod_loadingData = true;
    AGameVod_loadingDataTry = 0;
    AGameVod_loadingDataTimeout = 3500;
}

function AGameVod_loadDataRequest() {
    var offset = AGameVod_itemsCount + AGameVod_itemsCountOffset;
    if (offset && offset > (AGameVod_MaxOffset - 1)) {
        offset = AGameVod_MaxOffset - Main_ItemsLimitVideo;
        AGameVod_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/videos/top?game=' +
        encodeURIComponent(Main_values.Main_gameSelected) + '&limit=' + Main_ItemsLimitVideo +
        '&broadcast_type=' + (AGameVod_highlight ? 'highlight' : 'archive') + '&sort=views&offset=' + offset +
        '&period=' + AGameVod_period +
        (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');

    BasehttpGet(theUrl, AGameVod_loadingDataTimeout, 2, null, AGameVod_loadDataSuccess, AGameVod_loadDataError);
}

function AGameVod_loadDataError() {
    AGameVod_loadingDataTry++;
    if (AGameVod_loadingDataTry < AGameVod_loadingDataTryMax) {
        AGameVod_loadingDataTimeout += 500;
        AGameVod_loadDataRequest();
    } else {
        AGameVod_loadingData = false;
        if (!AGameVod_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            AGameVod_dataEnded = true;
            AGameVod_loadDataSuccessFinish();
        }
    }
}

function AGameVod_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.vods.length;
    AGameVod_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) AGameVod_dataEnded = true;

    var offset_itemsCount = AGameVod_itemsCount;
    AGameVod_itemsCount += response_items;

    AGameVod_emptyContent = !AGameVod_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, video, id,
        cursor = 0,
        doc = document.getElementById("stream_table_a_game_vod");

    // Make the game video/clip/fallowing cell
    if (!AGameVod_TopRowCreated) {
        AGameVod_TopRowCreated = true;
        row = document.createElement('tr');
        var thumbfallow;
        for (i = 0; i < 2; i++) {
            if (!i) thumbfallow = '<i class="icon-movie-play stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_SWITCH_VOD;
            else thumbfallow = '<i class="icon-history stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_SWITCH_CLIP;
            Main_td = document.createElement('td');
            Main_td.setAttribute('id', AGameVod_ids[8] + 'y_' + i);
            Main_td.className = 'stream_cell';
            Main_td.innerHTML = '<div id="' + AGameVod_ids[0] +
                'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + AGameVod_ids[3] +
                'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
            row.appendChild(Main_td);
        }
        doc.appendChild(row);
    }

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.vods[cursor];
            id = video._id;
            //video content can be null sometimes the preview will 404_processing
            if ((video.preview.template + '').indexOf('404_processing') !== -1 || AGameVod_idObject[id]) coloumn_id--;
            else {
                AGameVod_idObject[id] = 1;
                row.appendChild(Vod_createCell(row_id, row_id + '_' + coloumn_id,
                    [id, video.length, video.language, video.game, video.channel.name, video.increment_view_count_url],
                    [video.preview.template.replace("{width}x{height}", Main_VideoSize),
                        video.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                        twemoji.parse(video.title) + STR_BR + STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                        Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language),
                        STR_DURATION + Play_timeS(video.length), video.animated_preview_url
                    ], AGameVod_ids));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (AGameVod_dataEnded && !AGameVod_itemsCountCheck) {
                AGameVod_itemsCountCheck = true;
                AGameVod_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(AGameVod_ids[9] + row_id + '_' + coloumn_id));
            AGameVod_emptyCellVector.push(AGameVod_ids[9] + row_id + '_' + coloumn_id);
        }
        doc.appendChild(row);
    }

    AGameVod_loadDataSuccessFinish();
}

function AGameVod_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!AGameVod_status) {
            if (AGameVod_emptyContent) Main_showWarningDialog(STR_NO + (AGameVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_FOR_THIS + STR_CHANNEL);
            else {
                AGameVod_status = true;
                Main_imgVectorLoad(IMG_404_VIDEO);
                AGameVod_addFocus();
                Main_SaveValues();
            }
            Main_ShowElement(AGameVod_ids[10]);
            Main_FirstLoad = false;
            Main_HideLoadDialog();
        } else Main_imgVectorLoad(IMG_404_VIDEO);

        if (AGameVod_emptyCellVector.length > 0 && !AGameVod_dataEnded) {
            AGameVod_loadDataPrepare();
            AGameVod_loadDataReplace();
            return;
        } else {
            Main_CounterDialog(AGameVod_cursorX, AGameVod_cursorY, Main_ColoumnsCountVideo, AGameVod_itemsCount);
            AGameVod_emptyCellVector = [];
        }

        AGameVod_loadingData = false;
    });
}

function AGameVod_loadDataReplace() {
    Main_SetItemsLimitReplace(AGameVod_emptyCellVector.length);

    var offset = AGameVod_itemsCount + AGameVod_itemsCountOffset;
    if (offset && offset > (AGameVod_MaxOffset - 1)) {
        offset = AGameVod_MaxOffset - Main_ItemsLimitReplace;
        AGameVod_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/videos/top?game=' +
        encodeURIComponent(Main_values.Main_gameSelected) + '&limit=' + Main_ItemsLimitReplace +
        '&broadcast_type=' + (AGameVod_highlight ? 'highlight' : 'archive') + '&sort=views&offset=' + offset +
        '&period=' + AGameVod_period +
        (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');

    BasehttpGet(theUrl, AGameVod_loadingDataTimeout, 2, null, AGameVod_loadDataSuccessReplace, AGameVod_loadDataErrorReplace);
}

function AGameVod_loadDataErrorReplace() {
    AGameVod_loadingDataTry++;
    if (AGameVod_loadingDataTry < AGameVod_loadingDataTryMax) {
        AGameVod_loadingDataTimeout += 500;
        AGameVod_loadDataReplace();
    } else {
        AGameVod_dataEnded = true;
        AGameVod_emptyCellVector = [];
        AGameVod_loadDataSuccessFinish();
    }
}


function AGameVod_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.vods.length,
        video, id, i = 0,
        cursor = 0,
        tempVector = [];

    AGameVod_MaxOffset = parseInt(response._total);

    for (i; i < AGameVod_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.vods[cursor];
        id = video._id;
        if ((video.preview.template + '').indexOf('404_processing') !== -1 || AGameVod_idObject[id]) i--;
        else {
            AGameVod_idObject[id] = 1;
            Vod_replaceVideo(AGameVod_emptyCellVector[i],
                [id, video.length, video.language, video.game, video.channel.name, video.increment_view_count_url],
                [video.preview.template.replace("{width}x{height}", Main_VideoSize),
                    video.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                    twemoji.parse(video.title) + STR_BR + STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                    Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language),
                    STR_DURATION + Play_timeS(video.length), video.animated_preview_url
                ], AGameVod_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) AGameVod_emptyCellVector.splice(tempVector[i], 1);

    AGameVod_itemsCountOffset += cursor;
    if (AGameVod_dataEnded) {
        AGameVod_itemsCount -= AGameVod_emptyCellVector.length;
        AGameVod_emptyCellVector = [];
    }

    AGameVod_loadDataSuccessFinish();
}

function AGameVod_addFocus() {
    if (AGameVod_cursorY < 0) {
        AGameVod_addFocusFallow();
        return;
    }
    Main_addFocusVideo(AGameVod_cursorY, AGameVod_cursorX, AGameVod_ids, Main_ColoumnsCountVideo, AGameVod_itemsCount);

    Vod_AnimateThumb(AGameVod_ids, AGameVod_cursorY + '_' + AGameVod_cursorX);

    if (((AGameVod_cursorY + Main_ItemsReloadLimitVideo) > (AGameVod_itemsCount / Main_ColoumnsCountVideo)) &&
        !AGameVod_dataEnded && !AGameVod_loadingData) {
        AGameVod_loadDataPrepare();
        AGameVod_loadDataRequest();
    }
    if (Main_CenterLablesInUse) AGameVod_removeFocus();
}

function AGameVod_removeFocus() {
    window.clearInterval(Vod_AnimateThumbId);
    if (AGameVod_cursorY > -1 && AGameVod_itemsCount) {
        Main_ShowElement(AGameVod_ids[1] + AGameVod_cursorY + '_' + AGameVod_cursorX);
        Main_removeFocus(AGameVod_cursorY + '_' + AGameVod_cursorX, AGameVod_ids);
    } else AGameVod_removeFocusFallow();
}

function AGameVod_addFocusFallow() {
    var i = AGameVod_cursorX > 1 ? 1 : AGameVod_cursorX;
    Main_AddClass(AGameVod_ids[0] + 'y_' + i, Main_classThumb);
}

function AGameVod_removeFocusFallow() {
    var i = AGameVod_cursorX > 1 ? 1 : AGameVod_cursorX;
    Main_RemoveClass(AGameVod_ids[0] + 'y_' + i, Main_classThumb);
}

function AGameVod_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                AGameVod_removeFocus();
                Main_CenterLablesStart(AGameVod_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (AGameVod_cursorY === -1) {
                AGameVod_removeFocusFallow();
                AGameVod_cursorX--;
                if (AGameVod_cursorX < 0) AGameVod_cursorX = 1;
                AGameVod_addFocusFallow();
            } else if (!AGameVod_cursorY && !AGameVod_cursorX) {
                AGameVod_removeFocus();
                AGameVod_removeFocusFallow();
                AGameVod_cursorY = -1;
                AGameVod_cursorX = 1;
                AGameVod_addFocusFallow();
            } else if (Main_ThumbNull((AGameVod_cursorY), (AGameVod_cursorX - 1), AGameVod_ids[0])) {
                AGameVod_removeFocus();
                AGameVod_cursorX--;
                AGameVod_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((AGameVod_cursorY - 1), i, AGameVod_ids[0])) {
                        AGameVod_removeFocus();
                        AGameVod_cursorY--;
                        AGameVod_cursorX = i;
                        AGameVod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (AGameVod_cursorY === -1) {
                AGameVod_removeFocusFallow();
                AGameVod_cursorX++;
                if (AGameVod_cursorX > 1) {
                    AGameVod_cursorX = 0;
                    if (!AGameVod_emptyContent) {
                        AGameVod_cursorY = 0;
                        AGameVod_addFocus();
                    } else AGameVod_addFocusFallow();
                } else AGameVod_addFocusFallow();
            } else if (Main_ThumbNull((AGameVod_cursorY), (AGameVod_cursorX + 1), AGameVod_ids[0])) {
                AGameVod_removeFocus();
                AGameVod_cursorX++;
                AGameVod_addFocus();
            } else if (Main_ThumbNull((AGameVod_cursorY + 1), 0, AGameVod_ids[0])) {
                AGameVod_removeFocus();
                AGameVod_cursorY++;
                AGameVod_cursorX = 0;
                AGameVod_addFocus();
            }
            break;
        case KEY_UP:
            if (AGameVod_cursorY === -1 && !AGameVod_emptyContent) {
                AGameVod_cursorY = 0;
                AGameVod_removeFocusFallow();
                AGameVod_addFocus();
            } else if (!AGameVod_cursorY) {
                AGameVod_removeFocus();
                AGameVod_cursorY = -1;
                AGameVod_addFocusFallow();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((AGameVod_cursorY - 1), (AGameVod_cursorX - i), AGameVod_ids[0])) {
                        AGameVod_removeFocus();
                        AGameVod_cursorY--;
                        AGameVod_cursorX = AGameVod_cursorX - i;
                        AGameVod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_DOWN:
            if (AGameVod_cursorY === -1 && !AGameVod_emptyContent) {
                AGameVod_cursorY = 0;
                AGameVod_removeFocusFallow();
                AGameVod_addFocus();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((AGameVod_cursorY + 1), (AGameVod_cursorX - i), AGameVod_ids[0])) {
                        AGameVod_removeFocus();
                        AGameVod_cursorY++;
                        AGameVod_cursorX = AGameVod_cursorX - i;
                        AGameVod_addFocus();
                        break;
                    }
                }

            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (AGameVod_cursorY === -1) {
                if (AGameVod_cursorX === 0) {
                    AGameVod_highlight = !AGameVod_highlight;
                    Main_setItem('AGameVod_highlight', AGameVod_highlight ? 'true' : 'false');
                    AGameVod_StartLoad();
                } else {
                    AGameVod_periodNumber++;
                    if (AGameVod_periodNumber > 4) AGameVod_periodNumber = 1;
                    AGameVod_StartLoad();
                }
            } else Main_OpenVod(AGameVod_cursorY + '_' + AGameVod_cursorX, AGameVod_ids, AGameVod_handleKeyDown);
            break;
        default:
            break;
    }
}

function AGameVod_SetPeriod() {
    if (AGameVod_periodNumber === 1) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter((AGameVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_DAY + ': ' + Main_values.Main_gameSelected));
        AGameVod_period = 'day';
    } else if (AGameVod_periodNumber === 2) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter((AGameVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_WEEK + ': ' + Main_values.Main_gameSelected));
        AGameVod_period = 'week';
    } else if (AGameVod_periodNumber === 3) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter((AGameVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_MONTH + ': ' + Main_values.Main_gameSelected));
        AGameVod_period = 'month';
    } else if (AGameVod_periodNumber === 4) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter((AGameVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_ALL + ': ' + Main_values.Main_gameSelected));
        AGameVod_period = 'all';
    }
    Main_setItem('AGameVod_periodNumber', AGameVod_periodNumber);
}