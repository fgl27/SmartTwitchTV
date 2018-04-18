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
    Main.Go = Main.UserLive;
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    document.getElementById("id_agame_name").style.paddingLeft = Main.TopAgameDefaultUser + "%";
    document.getElementById('id_agame_name').innerHTML = Main.UserName + STR_LIVE_CHANNELS;
    document.body.addEventListener("keydown", UserLive.handleKeyDown, false);
    if (UserLive.OldUserName !== Main.UserName) UserLive.status = false;
    if (UserLive.status) {
        Main.ScrollHelper.scrollVerticalToElementById(UserLive.ids[0], UserLive.cursorY, UserLive.cursorX, Main.UserLive, Main.ScrollOffSetMinusVideo,
            Main.ScrollOffSetVideo, false);
        Main.CounterDialog(UserLive.cursorX, UserLive.cursorY, Main.ColoumnsCountVideo, UserLive.itemsCount);
    } else UserLive.StartLoad();
};

UserLive.exit = function() {
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.getElementById('id_agame_name').innerHTML = '';
    document.getElementById("id_agame_name").style.paddingLeft = Main.TopAgameDefault + "%";
    document.body.removeEventListener("keydown", UserLive.handleKeyDown);
};

UserLive.StartLoad = function() {
    Main.HideWarningDialog();
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    UserLive.status = false;
    UserLive.OldUserName = Main.UserName;
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
    Main.CounterDialogRst();
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

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(Main.UserName) +
            '/follows/channels?limit=100&offset=' + UserLive.loadChannelOffsset + '&sortby=created_at&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserLive.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
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
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
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
            offset = UserLive.MaxOffset - Main.ItemsLimitVideo;
            UserLive.dataEnded = true;
            UserLive.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(UserLive.followerChannels) + '&limit=' +
            Main.ItemsLimitVideo + '&offset=' + offset + '&stream_type=all&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserLive.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
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
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

UserLive.loadDataSuccess = function(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    UserLive.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitVideo) UserLive.dataEnded = true;

    var offset_itemsCount = UserLive.itemsCount;
    UserLive.itemsCount += response_items;

    UserLive.emptyContent = !UserLive.itemsCount;

    var response_rows = response_items / Main.ColoumnsCountVideo;
    if (response_items % Main.ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, stream,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            if (UserLive.CellExists(stream.channel.name)) coloumn_id--;
            else {
                row.appendChild(UserLive.createCell(row_id, row_id + '_' + coloumn_id, stream.channel.name, [stream.preview.template.replace("{width}x{height}", Main.VideoSize),
                    Main.is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                    stream.channel.status, stream.game, Main.addCommas(stream.viewers) + STR_VIEWER,
                    Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
                ]));
            }
        }

        for (coloumn_id; coloumn_id < Main.ColoumnsCountVideo; coloumn_id++) {
            if (UserLive.dataEnded && !UserLive.itemsCountCheck) {
                UserLive.itemsCountCheck = true;
                UserLive.itemsCount = (row_id * Main.ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main.createEmptyCell(UserLive.ids[9] + row_id + '_' + coloumn_id));
            UserLive.blankCellVector.push(UserLive.ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_user_live").appendChild(row);
    }

    UserLive.loadDataSuccessFinish();
};

UserLive.createCell = function(row_id, id, channel_name, valuesArray) {
    UserLive.nameMatrix.push(channel_name);
    if (row_id < Main.ColoumnsCountVideo) Main.PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return Main.createCellVideo(channel_name, id, UserLive.ids, valuesArray);
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
            Main.HideLoadDialog();
            if (UserLive.emptyContent) Main.showWarningDialog(STR_NO + STR_LIVE_CHANNELS);
            else {
                UserLive.status = true;
                UserLive.addFocus();
                Main.LazyImgStart(UserLive.ids[1], 9, IMG_404_VIDEO, Main.ColoumnsCountVideo);
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

        Main.SetItemsLimitReload(UserLive.blankCellCount);

        var offset = UserLive.itemsCount + UserLive.itemsCountOffset;
        if (offset && offset > (UserLive.MaxOffset - 1)) {
            offset = UserLive.MaxOffset - Main.ItemsLimitReload;
            UserLive.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main.gameSelected) +
            '&limit=' + Main.ItemsLimitReload + '&offset=' + offset, true);
        xmlHttp.timeout = UserLive.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
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

    if (response_items < Main.ItemsLimitVideo) UserLive.ReplacedataEnded = true;


    for (var i = 0; i < UserLive.blankCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        if (UserLive.CellExists(stream.channel.name)) {
            UserLive.blankCellCount--;
            i--;
        } else {
            UserLive.nameMatrix.push(stream.channel.name);
            Main.replaceVideo(UserLive.blankCellVector[i], stream.channel.name, [stream.preview.template.replace("{width}x{height}", Main.VideoSize),
                Main.is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                stream.channel.status, stream.game, Main.addCommas(stream.viewers) + STR_VIEWER,
                Main.videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
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
    Main.addFocusVideoArray(UserLive.cursorY, UserLive.cursorX, UserLive.ids, Main.UserLive, Main.ColoumnsCountVideo, UserLive.itemsCount);

    if (UserLive.cursorY > 3) Main.LazyImg(UserLive.ids[1], UserLive.cursorY, IMG_404_VIDEO, Main.ColoumnsCountVideo, 4);

    if (((UserLive.cursorY + Main.ItemsReloadLimitVideo) > (UserLive.itemsCount / Main.ColoumnsCountVideo)) &&
        !UserLive.dataEnded && !UserLive.loadingMore) {
        UserLive.loadingMore = true;
        UserLive.loadDataPrepare();
        UserLive.loadChannels();
    }
};

UserLive.removeFocus = function() {
    Main.removeFocusVideoArray(UserLive.cursorY + '_' + UserLive.cursorX, UserLive.ids);
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
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                Main.Go = Main.Users;
                UserLive.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((UserLive.cursorY), (UserLive.cursorX - 1), UserLive.ids[0])) {
                UserLive.removeFocus();
                UserLive.cursorX--;
                UserLive.addFocus();
            } else {
                for (i = (Main.ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main.ThumbNull((UserLive.cursorY - 1), i, UserLive.ids[0])) {
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
            if (Main.ThumbNull((UserLive.cursorY), (UserLive.cursorX + 1), UserLive.ids[0])) {
                UserLive.removeFocus();
                UserLive.cursorX++;
                UserLive.addFocus();
            } else if (Main.ThumbNull((UserLive.cursorY + 1), 0, UserLive.ids[0])) {
                UserLive.removeFocus();
                UserLive.cursorY++;
                UserLive.cursorX = 0;
                UserLive.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Main.ColoumnsCountVideo; i++) {
                if (Main.ThumbNull((UserLive.cursorY - 1), (UserLive.cursorX - i), UserLive.ids[0])) {
                    UserLive.removeFocus();
                    UserLive.cursorY--;
                    UserLive.cursorX = UserLive.cursorX - i;
                    UserLive.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Main.ColoumnsCountVideo; i++) {
                if (Main.ThumbNull((UserLive.cursorY + 1), (UserLive.cursorX - i), UserLive.ids[0])) {
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
                Main.Go = Main.UserHost;
                UserLive.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            if (!UserLive.loadingMore) {
                Main.Go = Main.UserChannels;
                UserLive.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Play.selectedChannel = document.getElementById(UserLive.ids[8] + UserLive.cursorY + '_' + UserLive.cursorX).getAttribute('data-channelname');
            Play.selectedChannelDisplayname = document.getElementById(UserLive.ids[3] + UserLive.cursorY + '_' + UserLive.cursorX).textContent;
            document.body.removeEventListener("keydown", UserLive.handleKeyDown);
            Main.openStream();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            UserLive.exit();
            Main.GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.UserLive;
            Main.Go = Main.Search;
            Main.OldgameSelected = Main.gameSelected;
            UserLive.exit();
            Main.SwitchScreen();
            break;
        default:
            break;
    }
};
