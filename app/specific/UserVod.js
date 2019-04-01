//Variable initialization
var UserVod_cursorY = 0;
var UserVod_cursorX = 0;
var UserVod_dataEnded = false;
var UserVod_itemsCount = 0;
var UserVod_idObject = {};
var UserVod_emptyCellVector = [];
var UserVod_loadingData = false;
var UserVod_loadingDataTry = 0;
var UserVod_loadingDataTryMax = 5;
var UserVod_loadingDataTimeout = 3500;
var UserVod_itemsCountOffset = 0;
var UserVod_MaxOffset = 0;
var UserVod_emptyContent = false;
var UserVod_itemsCountCheck = false;
var UserVod_Type = 'time';
var UserVod_TypeNumber = 2;
var UserVod_TopRowCreated = false;

var UserVod_ids = ['uv_thumbdiv', 'uv_img', 'uv_infodiv', 'uv_title', 'uv_streamon', 'uv_duration', 'uv_viwers', 'uv_quality', 'uv_cell', 'uvempty_', 'user_vod_scroll', 'uv_game'];
var UserVod_status = false;
var UserVod_highlight = false;
//Variable initialization end

function UserVod_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_UserVod;

    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);

    Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + (UserVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA)));
    document.body.addEventListener("keydown", UserVod_handleKeyDown, false);

    if (UserVod_status) {
        Main_YRst(UserVod_cursorY);
        Main_ShowElement(UserVod_ids[10]);
        Main_CounterDialog(UserVod_cursorX, UserVod_cursorY, Main_ColoumnsCountVideo, UserVod_itemsCount);
        UserVod_SetPeriod();
        UserVod_addFocus();
        Main_SaveValues();
    } else UserVod_StartLoad();
}

function UserVod_exit() {
    if (UserVod_status) UserVod_removeFocus();
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
    document.body.removeEventListener("keydown", UserVod_handleKeyDown);
    Main_textContent('top_bar_user', STR_USER);
    Main_HideElement(UserVod_ids[10]);
}

function UserVod_StartLoad() {
    if (UserVod_status) UserVod_removeFocus();
    Main_empty('stream_table_user_vod');
    Main_HideElement(UserVod_ids[10]);
    Main_showLoadDialog();
    UserVod_SetPeriod();
    Main_HideWarningDialog();
    UserVod_status = false;
    UserVod_itemsCountOffset = 0;
    UserVod_TopRowCreated = false;
    UserVod_MaxOffset = 0;
    UserVod_idObject = {};
    UserVod_emptyCellVector = [];
    UserVod_itemsCountCheck = false;
    Main_FirstLoad = true;
    UserVod_itemsCount = 0;
    UserVod_cursorX = 0;
    UserVod_cursorY = 0;
    UserVod_dataEnded = false;
    Main_ready(function() {
        Main_CounterDialogRst();
        UserVod_loadDataRequestStart();
    });
}

function UserVod_loadDataPrepare() {
    Main_imgVectorRst();
    UserVod_loadingData = true;
    UserVod_loadingDataTry = 0;
    UserVod_loadingDataTimeout = 3500;
}

function UserVod_loadDataRequestStart() {
    UserVod_loadDataPrepare();
    UserVod_loadDataRequest();
}

function UserVod_loadDataRequest() {
    var offset = UserVod_itemsCount + UserVod_itemsCountOffset;
    if (offset && offset > (UserVod_MaxOffset - 1)) {
        offset = UserVod_MaxOffset - Main_ItemsLimitVideo;
        UserVod_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/videos/followed?limit=' + Main_ItemsLimitVideo +
        '&broadcast_type=' + (UserVod_highlight ? 'highlight' : 'archive') + '&sort=' + UserVod_Type +
        '&offset=' + offset;
    var xmlHttp;

    if (Main_Android) {

        xmlHttp = Android.mreadUrl(theUrl, UserVod_loadingDataTimeout, 3,
            Main_OAuth + AddUser_UsernameArray[Main_values.Users_Position].access_token);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            UserVod_loadDataError();
            return;
        }

        if (xmlHttp.status === 200) {
            UserVod_loadDataSuccess(xmlHttp.responseText);
            return;
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(Main_values.Users_Position, 0, UserVod_loadDataRequestStart, UserVod_loadDatafail);
        } else {
            UserVod_loadDataError();
        }

    } else {

        xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);

        xmlHttp.timeout = UserVod_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_Authorization, Main_OAuth + AddUser_UsernameArray[Main_values.Users_Position].access_token);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserVod_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
                    AddCode_refreshTokens(Main_values.Users_Position, 0, UserVod_loadDataRequestStart, UserVod_loadDatafail);
                } else {
                    UserVod_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    }
}

function UserVod_loadDataError() {
    UserVod_loadingDataTry++;
    if (UserVod_loadingDataTry < UserVod_loadingDataTryMax) {
        UserVod_loadingDataTimeout += 500;
        UserVod_loadDataRequest();
    } else UserVod_loadDatafail();
}

function UserVod_loadDatafail() {
    UserVod_loadingData = false;
    if (!UserVod_itemsCount) {
        Main_FirstLoad = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    } else {
        UserVod_dataEnded = true;
        UserVod_loadDataSuccessFinish();
    }
}

function UserVod_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.videos.length;
    UserVod_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) UserVod_dataEnded = true;

    var offset_itemsCount = UserVod_itemsCount;
    UserVod_itemsCount += response_items;

    UserVod_emptyContent = !UserVod_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, video, id,
        cursor = 0;

    // Make the game video/clip/fallowing cell
    if (!UserVod_TopRowCreated) {
        UserVod_TopRowCreated = true;
        row = document.createElement('tr');
        var thumbfallow;
        for (i = 0; i < 2; i++) {
            if (!i) thumbfallow = '<i class="icon-movie-play stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_SWITCH_VOD;
            else thumbfallow = '<i class="icon-history stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_SWITCH_TYPE;
            Main_td = document.createElement('td');
            Main_td.setAttribute('id', UserVod_ids[8] + 'y_' + i);
            Main_td.className = 'stream_cell';
            Main_td.innerHTML = '<div id="' + UserVod_ids[0] +
                'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + UserVod_ids[3] +
                'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
            row.appendChild(Main_td);
        }
        document.getElementById("stream_table_user_vod").appendChild(row);
    }

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.videos[cursor];
            id = video._id;
            //video content can be null sometimes the preview will 404
            if ((video.preview.template + '').indexOf('404_processing') !== -1 || UserVod_idObject[id]) coloumn_id--;
            else {
                UserVod_idObject[id] = 1;
                row.appendChild(Vod_createCell(row_id, row_id + '_' + coloumn_id,
                    [id, video.length, video.language, video.game, video.channel.name, video.increment_view_count_url],
                    [video.preview.template.replace("{width}x{height}", Main_VideoSize),
                        video.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                        twemoji.parse(video.title) + STR_BR + STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                        Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language),
                        STR_DURATION + Play_timeS(video.length), video.animated_preview_url
                    ], UserVod_ids));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (UserVod_dataEnded && !UserVod_itemsCountCheck) {
                UserVod_itemsCountCheck = true;
                UserVod_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(UserVod_ids[9] + row_id + '_' + coloumn_id));
            UserVod_emptyCellVector.push(UserVod_ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_user_vod").appendChild(row);
    }

    UserVod_loadDataSuccessFinish();
}

function UserVod_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!UserVod_status) {
            Main_HideLoadDialog();
            if (UserVod_emptyContent) Main_showWarningDialog(STR_NO + (UserVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_FOR_THIS + STR_CHANNEL);
            else {
                UserVod_status = true;
                UserVod_addFocus();
                Main_imgVectorLoad(IMG_404_VIDEO);
                Main_SaveValues();
            }
            Main_ShowElement(UserVod_ids[10]);
            Main_FirstLoad = false;
        } else Main_imgVectorLoad(IMG_404_VIDEO);

        if (UserVod_emptyCellVector.length > 0 && !UserVod_dataEnded) {
            UserVod_loadDataReplaceStart();
            return;
        } else {
            Main_CounterDialog(UserVod_cursorX, UserVod_cursorY, Main_ColoumnsCountVideo, UserVod_itemsCount);
            UserVod_emptyCellVector = [];
        }

        UserVod_loadingData = false;
    });
}

function UserVod_loadDataReplaceStart() {
    UserVod_loadDataPrepare();
    UserVod_loadDataReplace();
}

function UserVod_loadDataReplace() {

    Main_SetItemsLimitReplace(UserVod_emptyCellVector.length);

    var offset = UserVod_itemsCount + UserVod_itemsCountOffset;
    if (offset && offset > (UserVod_MaxOffset - 1)) {
        offset = UserVod_MaxOffset - Main_ItemsLimitReplace;
        UserVod_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/videos/followed?limit=' + Main_ItemsLimitReplace +
        '&broadcast_type=' + (UserVod_highlight ? 'highlight' : 'archive') + '&sort=' + UserVod_Type +
        '&offset=' + offset;
    var xmlHttp;

    if (Main_Android) {

        xmlHttp = Android.mreadUrl(theUrl, UserVod_loadingDataTimeout, 3,
            Main_OAuth + AddUser_UsernameArray[Main_values.Users_Position].access_token);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            UserVod_loadDataErrorReplace();
            return;
        }

        if (xmlHttp.status === 200) {
            UserVod_loadDataSuccessReplace(xmlHttp.responseText);
            return;
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) //token expired
            AddCode_refreshTokens(Main_values.Users_Position, 0, UserVod_loadDataRequestStart, UserVod_loadDatafail);
        else UserVod_loadDataErrorReplace();

    } else {
        xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);

        xmlHttp.timeout = UserVod_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_Authorization, Main_OAuth + AddUser_UsernameArray[Main_values.Users_Position].access_token);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserVod_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                } else if (xmlHttp.status === 401 || xmlHttp.status === 403) //token expired
                    AddCode_refreshTokens(Main_values.Users_Position, 0, UserVod_loadDataRequestStart, UserVod_loadDatafail);
                else UserVod_loadDataErrorReplace();
            }
        };

        xmlHttp.send(null);
    }
}

function UserVod_loadDataErrorReplace() {
    UserVod_loadingDataTry++;
    if (UserVod_loadingDataTry < UserVod_loadingDataTryMax) {
        UserVod_loadingDataTimeout += 500;
        UserVod_loadDataReplace();
    } else {
        UserVod_dataEnded = true;
        UserVod_itemsCount -= UserVod_emptyCellVector.length;
        UserVod_emptyCellVector = [];
        UserVod_loadDataSuccessFinish();
    }
}


function UserVod_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.videos.length,
        video, id, i = 0,
        cursor = 0,
        tempVector = [];

    UserVod_MaxOffset = parseInt(response._total);

    for (i; i < UserVod_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.videos[cursor];
        id = video._id;
        if ((video.preview.template + '').indexOf('404_processing') !== -1 || UserVod_idObject[id]) i--;
        else {
            UserVod_idObject[id] = 1;
            Vod_replaceVideo(UserVod_emptyCellVector[i],
                [id, video.length, video.language, video.game, video.channel.name, video.increment_view_count_url],
                [video.preview.template.replace("{width}x{height}", Main_VideoSize),
                    video.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                    twemoji.parse(video.title) + STR_BR + STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) +
                    STR_VIEWS,
                    Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language),
                    STR_DURATION + Play_timeS(video.length), video.animated_preview_url
                ], UserVod_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) UserVod_emptyCellVector.splice(tempVector[i], 1);

    UserVod_itemsCountOffset += cursor;
    if (UserVod_dataEnded) {
        UserVod_itemsCount -= UserVod_emptyCellVector.length;
        UserVod_emptyCellVector = [];
    }

    UserVod_loadDataSuccessFinish();
}

function UserVod_addFocus() {
    if (UserVod_cursorY < 0) {
        UserVod_addFocusFallow();
        return;
    }
    Main_addFocusVideo(UserVod_cursorY, UserVod_cursorX, UserVod_ids, Main_ColoumnsCountVideo, UserVod_itemsCount);

    Vod_AnimateThumb(UserVod_ids, UserVod_cursorY + '_' + UserVod_cursorX);

    if (((UserVod_cursorY + Main_ItemsReloadLimitVideo) > (UserVod_itemsCount / Main_ColoumnsCountVideo)) &&
        !UserVod_dataEnded && !UserVod_loadingData) {
        UserVod_loadDataRequestStart();
    }
    if (Main_CenterLablesInUse) UserVod_removeFocus();
}

function UserVod_removeFocus() {
    window.clearInterval(Vod_AnimateThumbId);
    if (UserVod_cursorY > -1 && UserVod_itemsCount) {
        Main_ShowElement(UserVod_ids[1] + UserVod_cursorY + '_' + UserVod_cursorX);
        Main_removeFocus(UserVod_cursorY + '_' + UserVod_cursorX, UserVod_ids);
    } else UserVod_removeFocusFallow();
}

function UserVod_addFocusFallow() {
    var i = UserVod_cursorX > 1 ? 1 : UserVod_cursorX;
    Main_AddClass(UserVod_ids[0] + 'y_' + i, Main_classThumb);
}

function UserVod_removeFocusFallow() {
    var i = UserVod_cursorX > 1 ? 1 : UserVod_cursorX;
    Main_RemoveClass(UserVod_ids[0] + 'y_' + i, Main_classThumb);
}

function UserVod_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                UserVod_removeFocus();
                Main_CenterLablesStart(UserVod_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (UserVod_cursorY === -1) {
                UserVod_removeFocusFallow();
                UserVod_cursorX--;
                if (UserVod_cursorX < 0) UserVod_cursorX = 1;
                UserVod_addFocusFallow();
            } else if (!UserVod_cursorY && !UserVod_cursorX) {
                UserVod_removeFocus();
                UserVod_removeFocusFallow();
                UserVod_cursorY = -1;
                UserVod_cursorX = 1;
                UserVod_addFocusFallow();
            } else if (Main_ThumbNull((UserVod_cursorY), (UserVod_cursorX - 1), UserVod_ids[0])) {
                UserVod_removeFocus();
                UserVod_cursorX--;
                UserVod_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((UserVod_cursorY - 1), i, UserVod_ids[0])) {
                        UserVod_removeFocus();
                        UserVod_cursorY--;
                        UserVod_cursorX = i;
                        UserVod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (UserVod_cursorY === -1) {
                UserVod_removeFocusFallow();
                UserVod_cursorX++;
                if (UserVod_cursorX > 1) {
                    UserVod_cursorX = 0;
                    if (!UserVod_emptyContent) {
                        UserVod_cursorY = 0;
                        UserVod_addFocus();
                    } else UserVod_addFocusFallow();
                } else UserVod_addFocusFallow();
            } else if (Main_ThumbNull((UserVod_cursorY), (UserVod_cursorX + 1), UserVod_ids[0])) {
                UserVod_removeFocus();
                UserVod_cursorX++;
                UserVod_addFocus();
            } else if (Main_ThumbNull((UserVod_cursorY + 1), 0, UserVod_ids[0])) {
                UserVod_removeFocus();
                UserVod_cursorY++;
                UserVod_cursorX = 0;
                UserVod_addFocus();
            }
            break;
        case KEY_UP:
            if (UserVod_cursorY === -1 && !UserVod_emptyContent) {
                UserVod_cursorY = 0;
                UserVod_removeFocusFallow();
                UserVod_addFocus();
            } else if (!UserVod_cursorY) {
                UserVod_removeFocus();
                UserVod_cursorY = -1;
                UserVod_addFocusFallow();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((UserVod_cursorY - 1), (UserVod_cursorX - i), UserVod_ids[0])) {
                        UserVod_removeFocus();
                        UserVod_cursorY--;
                        UserVod_cursorX = UserVod_cursorX - i;
                        UserVod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_DOWN:
            if (UserVod_cursorY === -1 && !UserVod_emptyContent) {
                UserVod_cursorY = 0;
                UserVod_removeFocusFallow();
                UserVod_addFocus();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((UserVod_cursorY + 1), (UserVod_cursorX - i), UserVod_ids[0])) {
                        UserVod_removeFocus();
                        UserVod_cursorY++;
                        UserVod_cursorX = UserVod_cursorX - i;
                        UserVod_addFocus();
                        break;
                    }
                }

            }
            break;
        case KEY_CHANNELUP:
            Main_values.Main_Go = Main_UserChannels;
            UserVod_exit();
            Main_SwitchScreen();
            break;
        case KEY_CHANNELDOWN:
            Main_values.Main_Go = Main_usergames;
            UserVod_exit();
            Main_SwitchScreen();
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            UserVod_highlight = !UserVod_highlight;
            Main_setItem('UserVod_highlight', UserVod_highlight ? 'true' : 'false');
            UserVod_StartLoad();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (UserVod_cursorY === -1) {
                if (UserVod_cursorX === 0) {
                    UserVod_highlight = !UserVod_highlight;
                    Main_setItem('UserVod_highlight', UserVod_highlight ? 'true' : 'false');
                    UserVod_StartLoad();
                } else {
                    if (UserVod_TypeNumber === 1) UserVod_TypeNumber++;
                    else UserVod_TypeNumber--;
                    UserVod_StartLoad();
                }
            } else Main_OpenVod(UserVod_cursorY + '_' + UserVod_cursorX, UserVod_ids, UserVod_handleKeyDown);
            break;
        case KEY_RED:
            Main_SidePannelStart(UserVod_handleKeyDown);
            break;
        case KEY_GREEN:
            UserVod_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            if (UserVod_TypeNumber === 1) UserVod_TypeNumber++;
            else UserVod_TypeNumber--;
            UserVod_StartLoad();
            break;
        case KEY_BLUE:
            if (!Main_values.Search_isSearching) Main_values.Main_BeforeSearch = Main_UserVod;
            Main_values.Main_Go = Main_Search;
            UserVod_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}

function UserVod_SetPeriod() {
    if (UserVod_TypeNumber === 1) {
        Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(
            AddUser_UsernameArray[Main_values.Users_Position].name + ' ' +
            (UserVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_TIME));
        UserVod_Type = 'time';
    } else if (UserVod_TypeNumber === 2) {
        Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(
            AddUser_UsernameArray[Main_values.Users_Position].name + ' ' +
            (UserVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_VIWES));
        UserVod_Type = 'views';
    }
    Main_setItem('UserVod_TypeNumber', UserVod_TypeNumber);
}