/*jshint multistr: true */
//Variable initialization
function UserLive() {}
UserLive.cursorY = 0;
UserLive.cursorX = 0;
UserLive.dataEnded = false;
UserLive.itemsCount = 0;
UserLive.nameMatrix = [];
UserLive.nameMatrixCount = 0;
UserLive.blankCellVector = [];
UserLive.loadingData = false;
UserLive.loadingDataTry = 0;
UserLive.loadingDataTryMax = 10;
UserLive.loadingDataTimeout = 3500;
UserLive.isDialogOn = false;
UserLive.blankCellCount = 0;
UserLive.itemsCountOffset = 0;
UserLive.LastClickFinish = true;
UserLive.keyClickDelayTime = 25;
UserLive.ReplacedataEnded = false;
UserLive.MaxOffset = 0;
UserLive.loadChannelOffsset = 0;
UserLive.emptyContent = false;

UserLive.ids = ['ul_thumbdiv', 'ul_img', 'ul_infodiv', 'ul_displayname', 'ul_streamtitle', 'ul_streamgame', 'ul_viwers', 'ul_quality', 'ul_cell', 'ulempty_'];
UserLive.status = false;
UserLive.followerChannels = '';
UserLive.OldUserName = '';
UserLive.itemsCountCheck = false;

//Variable initialization end

UserLive.init = function() {
    main_Go = main_UserLive;
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    document.getElementById('top_bar_user').innerHTML = STR_USER + main_UnderCenter(main_UserName + STR_LIVE_CHANNELS);
    document.body.addEventListener("keydown", UserLive.handleKeyDown, false);
    if (UserLive.OldUserName !== main_UserName) UserLive.status = false;
    if (UserLive.status) {
        main_ScrollHelper(UserLive.ids[0], UserLive.cursorY, UserLive.cursorX, main_UserLive, main_ScrollOffSetMinusVideo,
            main_ScrollOffSetVideo, false);
        main_CounterDialog(UserLive.cursorX, UserLive.cursorY, main_ColoumnsCountVideo, UserLive.itemsCount);
    } else UserLive.StartLoad();
};

UserLive.exit = function() {
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.body.removeEventListener("keydown", UserLive.handleKeyDown);
    document.getElementById('top_bar_user').innerHTML = STR_USER;
};

UserLive.StartLoad = function() {
    main_HideWarningDialog();
    main_ScrollHelperBlank('blank_focus');
    main_showLoadDialog();
    UserLive.status = false;
    UserLive.OldUserName = main_UserName;
    var table = document.getElementById('stream_table_user_live');
    while (table.firstChild) table.removeChild(table.firstChild);
    UserLive.loadChannelOffsset = 0;
    UserLive.loadingMore = false;
    UserLive.blankCellCount = 0;
    UserLive.itemsCountOffset = 0;
    UserLive.ReplacedataEnded = false;
    UserLive.MaxOffset = 0;
    UserLive.nameMatrix = [];
    UserLive.nameMatrixCount = 0;
    UserLive.blankCellVector = [];
    UserLive.itemsCountCheck = false;
    UserLive.itemsCount = 0;
    UserLive.cursorX = 0;
    UserLive.cursorY = 0;
    UserLive.dataEnded = false;
    UserLive.followerChannels = '';
    main_CounterDialogRst();
    UserLive.loadDataPrepare();
    UserLive.loadChannels();
};

UserLive.loadDataPrepare = function() {
    UserLive.loadingData = true;
    UserLive.loadingDataTry = 0;
    UserLive.loadingDataTimeout = 3500;
};

UserLive.loadChannels = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(main_UserName) +
            '/follows/channels?limit=100&offset=' + UserLive.loadChannelOffsset + '&sortby=created_at&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserLive.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserLive.loadChannelLive(xmlHttp.responseText);
                    return;
                } else {
                    UserLive.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserLive.loadDataError();
    }
};

UserLive.loadDataError = function() {
    UserLive.loadingDataTry++;
    if (UserLive.loadingDataTry < UserLive.loadingDataTryMax) {
        UserLive.loadingDataTimeout += (UserLive.loadingDataTry < 5) ? 250 : 3500;
        UserLive.loadChannels();
    } else {
        UserLive.loadingData = false;
        UserLive.loadingMore = false;
        main_HideLoadDialog();
        main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

UserLive.loadChannelLive = function(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.follows.length;

    if (response_items > 0) { // response_items here is not always 99 because banned channels, so check until it is 0
        var ChannelTemp = '',
            x = 0;

        for (x; x < response_items; x++) {
            ChannelTemp = response.follows[x].channel.name + ',';
            if (UserLive.followerChannels.indexOf(ChannelTemp) === -1) UserLive.followerChannels += ChannelTemp;
        }

        UserLive.loadChannelOffsset += response_items;
        UserLive.loadDataPrepare();
        UserLive.loadChannels();
    } else { // end
        UserLive.followerChannels = UserLive.followerChannels.slice(0, -1);
        UserLive.loadDataPrepare();
        UserLive.loadChannelUserLive();
    }
};
UserLive.loadChannelUserLive = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = UserLive.itemsCount + UserLive.itemsCountOffset;
        if (offset && offset > (UserLive.MaxOffset - 1)) {
            offset = UserLive.MaxOffset - main_ItemsLimitVideo;
            UserLive.dataEnded = true;
            UserLive.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(UserLive.followerChannels) + '&limit=' +
            main_ItemsLimitVideo + '&offset=' + offset + '&stream_type=all&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserLive.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserLive.loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    UserLive.loadDataErrorLive();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserLive.loadDataErrorLive();
    }
};

UserLive.loadDataErrorLive = function() {
    UserLive.loadingDataTry++;
    if (UserLive.loadingDataTry < UserLive.loadingDataTryMax) {
        UserLive.loadingDataTimeout += (UserLive.loadingDataTry < 5) ? 250 : 3500;
        UserLive.loadChannelUserLive();
    } else {
        UserLive.loadingData = false;
        UserLive.loadingMore = false;
        main_HideLoadDialog();
        main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

UserLive.loadDataSuccess = function(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    UserLive.MaxOffset = parseInt(response._total);

    if (response_items < main_ItemsLimitVideo) UserLive.dataEnded = true;

    var offset_itemsCount = UserLive.itemsCount;
    UserLive.itemsCount += response_items;

    UserLive.emptyContent = !UserLive.itemsCount;

    var response_rows = response_items / main_ColoumnsCountVideo;
    if (response_items % main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            if (UserLive.CellExists(stream.channel.name)) coloumn_id--;
            else {
                row.appendChild(UserLive.createCell(row_id, row_id + '_' + coloumn_id, stream.channel.name, [stream.preview.template.replace("{width}x{height}", main_VideoSize),
                    main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                    stream.channel.status, stream.game, main_addCommas(stream.viewers) + STR_VIEWER,
                    main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
                ]));
            }
        }

        for (coloumn_id; coloumn_id < main_ColoumnsCountVideo; coloumn_id++) {
            if (UserLive.dataEnded && !UserLive.itemsCountCheck) {
                UserLive.itemsCountCheck = true;
                UserLive.itemsCount = (row_id * main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(main_createEmptyCell(UserLive.ids[9] + row_id + '_' + coloumn_id));
            UserLive.blankCellVector.push(UserLive.ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_user_live").appendChild(row);
    }

    UserLive.loadDataSuccessFinish();
};

UserLive.createCell = function(row_id, id, channel_name, valuesArray) {
    UserLive.nameMatrix.push(channel_name);
    if (row_id < main_ColoumnsCountVideo) main_PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return main_createCellVideo(channel_name, id, UserLive.ids, valuesArray);
};

UserLive.CellExists = function(display_name) {
    if (UserLive.nameMatrix.indexOf(display_name) > -1) {
        UserLive.blankCellCount++;
        return true;
    }
    return false;
};

UserLive.loadDataSuccessFinish = function() {
    $(document).ready(function() {
        if (!UserLive.status) {
            main_HideLoadDialog();
            if (UserLive.emptyContent) main_showWarningDialog(STR_NO + STR_LIVE_CHANNELS);
            else {
                UserLive.status = true;
                UserLive.addFocus();
                main_LazyImgStart(UserLive.ids[1], 9, IMG_404_VIDEO, main_ColoumnsCountVideo);
            }
            UserLive.loadingData = false;
        } else {
            if (UserLive.blankCellCount > 0 && !UserLive.dataEnded) {
                UserLive.loadingMore = true;
                UserLive.loadDataPrepare();
                UserLive.loadChannelsReplace();
                return;
            } else {
                UserLive.blankCellCount = 0;
                UserLive.blankCellVector = [];
            }

            UserLive.loadingData = false;
            UserLive.loadingMore = false;
        }
    });
};

UserLive.loadChannelsReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        main_SetItemsLimitReload(UserLive.blankCellCount);

        var offset = UserLive.itemsCount + UserLive.itemsCountOffset;
        if (offset && offset > (UserLive.MaxOffset - 1)) {
            offset = UserLive.MaxOffset - main_ItemsLimitReload;
            UserLive.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(main_gameSelected) +
            '&limit=' + main_ItemsLimitReload + '&offset=' + offset, true);
        xmlHttp.timeout = UserLive.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserLive.loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserLive.loadDataErrorReplace();
    }
};

UserLive.loadDataErrorReplace = function() {
    UserLive.loadingDataTry++;
    if (UserLive.loadingDataTry < UserLive.loadingDataTryMax) {
        UserLive.loadingDataTimeout += (UserLive.loadingDataTry < 5) ? 250 : 3500;
        UserLive.loadChannelsReplace();
    } else {
        UserLive.ReplacedataEnded = true;
        UserLive.blankCellCount = 0;
        UserLive.blankCellVector = [];
        UserLive.loadDataSuccessFinish();
    }
};

UserLive.loadDataSuccessReplace = function(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    var stream, index, cursor = 0;
    var tempVector = UserLive.blankCellVector.slice();

    UserLive.MaxOffset = parseInt(response._total);

    if (response_items < main_ItemsLimitVideo) UserLive.ReplacedataEnded = true;


    for (var i = 0; i < UserLive.blankCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        if (UserLive.CellExists(stream.channel.name)) {
            UserLive.blankCellCount--;
            i--;
        } else {
            UserLive.nameMatrix.push(stream.channel.name);
            main_replaceVideo(UserLive.blankCellVector[i], stream.channel.name, [stream.preview.template.replace("{width}x{height}", main_VideoSize),
                main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                stream.channel.status, stream.game, main_addCommas(stream.viewers) + STR_VIEWER,
                main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
            ], UserLive.ids[8], UserLive.ids[9]);
            UserLive.blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    UserLive.itemsCountOffset += cursor;
    if (UserLive.ReplacedataEnded) {
        UserLive.blankCellCount = 0;
        UserLive.blankCellVector = [];
    } else UserLive.blankCellVector = tempVector;

    UserLive.loadDataSuccessFinish();
};

UserLive.addFocus = function() {
    main_addFocusVideoArray(UserLive.cursorY, UserLive.cursorX, UserLive.ids, main_UserLive, main_ColoumnsCountVideo, UserLive.itemsCount);

    if (UserLive.cursorY > 3) main_LazyImg(UserLive.ids[1], UserLive.cursorY, IMG_404_VIDEO, main_ColoumnsCountVideo, 4);

    if (((UserLive.cursorY + main_ItemsReloadLimitVideo) > (UserLive.itemsCount / main_ColoumnsCountVideo)) &&
        !UserLive.dataEnded && !UserLive.loadingMore) {
        UserLive.loadingMore = true;
        UserLive.loadDataPrepare();
        UserLive.loadChannels();
    }
};

UserLive.removeFocus = function() {
    main_removeFocusVideoArray(UserLive.cursorY + '_' + UserLive.cursorX, UserLive.ids);
};

UserLive.keyClickDelay = function() {
    UserLive.LastClickFinish = true;
};

UserLive.handleKeyDown = function(event) {
    if (UserLive.loadingData && !UserLive.loadingMore) {
        event.preventDefault();
        return;
    } else if (!UserLive.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        UserLive.LastClickFinish = false;
        window.setTimeout(UserLive.keyClickDelay, UserLive.keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (main_isAboutDialogShown()) main_HideAboutDialog();
            else if (main_isControlsDialogShown()) main_HideControlsDialog();
            else {
                main_Go = main_Users;
                UserLive.exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (main_ThumbNull((UserLive.cursorY), (UserLive.cursorX - 1), UserLive.ids[0])) {
                UserLive.removeFocus();
                UserLive.cursorX--;
                UserLive.addFocus();
            } else {
                for (i = (main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (main_ThumbNull((UserLive.cursorY - 1), i, UserLive.ids[0])) {
                        UserLive.removeFocus();
                        UserLive.cursorY--;
                        UserLive.cursorX = i;
                        UserLive.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (main_ThumbNull((UserLive.cursorY), (UserLive.cursorX + 1), UserLive.ids[0])) {
                UserLive.removeFocus();
                UserLive.cursorX++;
                UserLive.addFocus();
            } else if (main_ThumbNull((UserLive.cursorY + 1), 0, UserLive.ids[0])) {
                UserLive.removeFocus();
                UserLive.cursorY++;
                UserLive.cursorX = 0;
                UserLive.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < main_ColoumnsCountVideo; i++) {
                if (main_ThumbNull((UserLive.cursorY - 1), (UserLive.cursorX - i), UserLive.ids[0])) {
                    UserLive.removeFocus();
                    UserLive.cursorY--;
                    UserLive.cursorX = UserLive.cursorX - i;
                    UserLive.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < main_ColoumnsCountVideo; i++) {
                if (main_ThumbNull((UserLive.cursorY + 1), (UserLive.cursorX - i), UserLive.ids[0])) {
                    UserLive.removeFocus();
                    UserLive.cursorY++;
                    UserLive.cursorX = UserLive.cursorX - i;
                    UserLive.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!UserLive.loadingMore) UserLive.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            if (!UserLive.loadingMore) {
                main_Go = main_UserHost;
                UserLive.exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            if (!UserLive.loadingMore) {
                main_Go = main_UserChannels;
                UserLive.exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Play.selectedChannel = document.getElementById(UserLive.ids[8] + UserLive.cursorY + '_' + UserLive.cursorX).getAttribute('data-channelname');
            Play.selectedChannelDisplayname = document.getElementById(UserLive.ids[3] + UserLive.cursorY + '_' + UserLive.cursorX).textContent;
            document.body.removeEventListener("keydown", UserLive.handleKeyDown);
            main_openStream();
            break;
        case TvKeyCode.KEY_RED:
            main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            UserLive.exit();
            main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            main_BeforeSearch = main_UserLive;
            main_Go = main_Search;
            main_OldgameSelected = main_gameSelected;
            UserLive.exit();
            main_SwitchScreen();
            break;
        default:
            break;
    }
};
