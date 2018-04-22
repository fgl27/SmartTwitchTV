/*jshint multistr: true */
//Variable initialization
function UserHost() {}
UserHost.cursorY = 0;
UserHost.cursorX = 0;
UserHost.dataEnded = false;
UserHost.itemsCount = 0;
UserHost.nameMatrix = [];
UserHost.blankCellVector = [];
UserHost.loadingData = false;
UserHost.loadingDataTry = 0;
UserHost.loadingDataTryMax = 10;
UserHost.loadingDataTimeout = 3500;
UserHost.isDialogOn = false;
UserHost.blankCellCount = 0;
UserHost.itemsCountOffset = 0;
UserHost.LastClickFinish = true;
UserHost.keyClickDelayTime = 25;
UserHost.ReplacedataEnded = false;
UserHost.MaxOffset = 0;
UserHost.emptyContent = false;

UserHost.ids = ['uh_thumbdiv', 'uh_img', 'uh_infodiv', 'uh_displayname', 'uh_hosttitle', 'uh_hostgame', 'uh_viwers', 'uh_quality', 'uh_cell', 'uhempty_'];
UserHost.status = false;
UserHost.followerChannels = '';
UserHost.OldUserName = '';
UserHost.itemsCountCheck = false;

//Variable initialization end

UserHost.init = function() {
    main_Go = main_UserHost;
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    document.getElementById('top_bar_user').innerHTML = STR_USER + main_UnderCenter(main_UserName + STR_LIVE_HOSTS);
    document.body.addEventListener("keydown", UserHost.handleKeyDown, false);
    main_YRst(UserHost.cursorY);
    if (UserHost.OldUserName !== main_UserName) UserHost.status = false;
    if (UserHost.status) {
        main_ScrollHelper(UserHost.ids[0], UserHost.cursorY, UserHost.cursorX, main_UserHost, main_ScrollOffSetMinusVideo,
            main_ScrollOffSetVideo, false);
        main_CounterDialog(UserHost.cursorX, UserHost.cursorY, main_ColoumnsCountVideo, UserHost.itemsCount);
    } else UserHost.StartLoad();
};

UserHost.exit = function() {
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.body.removeEventListener("keydown", UserHost.handleKeyDown);
    document.getElementById('top_bar_user').innerHTML = STR_USER;
};

UserHost.StartLoad = function() {
    main_HideWarningDialog();
    main_ScrollHelperBlank('blank_focus');
    main_showLoadDialog();
    UserHost.OldUserName = main_UserName;
    UserHost.status = false;
    var table = document.getElementById('stream_table_user_host');
    while (table.firstChild) table.removeChild(table.firstChild);
    UserHost.loadingMore = false;
    UserHost.blankCellCount = 0;
    UserHost.itemsCountOffset = 0;
    UserHost.ReplacedataEnded = false;
    UserHost.MaxOffset = 0;
    UserHost.nameMatrix = [];
    UserHost.blankCellVector = [];
    UserHost.itemsCountCheck = false;
    UserHost.itemsCount = 0;
    UserHost.cursorX = 0;
    UserHost.cursorY = 0;
    UserHost.dataEnded = false;
    main_CounterDialogRst();
    UserHost.loadDataPrepare();
    UserHost.loadChannels();
};

UserHost.loadDataPrepare = function() {
    UserHost.loadingData = true;
    UserHost.loadingDataTry = 0;
    UserHost.loadingDataTimeout = 3500;
};

UserHost.loadChannels = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = UserHost.itemsCount + UserHost.itemsCountOffset;
        if (offset && offset > (UserHost.MaxOffset - 1)) {
            offset = UserHost.MaxOffset - main_ItemsLimitVideo;
            UserHost.dataEnded = true;
            UserHost.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/api/users/' + encodeURIComponent(main_UserName) + '/followed/hosting?limit=' +
            main_ItemsLimitVideo + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserHost.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserHost.loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    UserHost.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserHost.loadDataError();
    }
};

UserHost.loadDataError = function() {
    UserHost.loadingDataTry++;
    if (UserHost.loadingDataTry < UserHost.loadingDataTryMax) {
        UserHost.loadingDataTimeout += (UserHost.loadingDataTry < 5) ? 250 : 3500;
        UserHost.loadChannels();
    } else {
        UserHost.loadingData = false;
        UserHost.loadingMore = false;
        main_HideLoadDialog();
        main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

UserHost.loadDataSuccess = function(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.hosts.length;
    UserHost.MaxOffset = parseInt(response._total);

    if (response_items < main_ItemsLimitVideo) UserHost.dataEnded = true;

    var offset_itemsCount = UserHost.itemsCount;
    UserHost.itemsCount += response_items;

    UserHost.emptyContent = !UserHost.itemsCount;

    var response_rows = response_items / main_ColoumnsCountVideo;
    if (response_items % main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, hosts,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            hosts = response.hosts[cursor];
            if (UserHost.CellExists(hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name)) coloumn_id--;
            else {
                row.appendChild(UserHost.createCell(row_id, row_id + '_' + coloumn_id,
                    hosts.target.channel.name, [hosts.target.preview_urls.template.replace("{width}x{height}", main_VideoSize),
                        hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name,
                        hosts.target.title, hosts.target.meta_game, main_addCommas(hosts.target.viewers) + STR_VIEWER, ''
                    ]));
            }
        }

        for (coloumn_id; coloumn_id < main_ColoumnsCountVideo; coloumn_id++) {
            if (UserHost.dataEnded && !UserHost.itemsCountCheck) {
                UserHost.itemsCountCheck = true;
                UserHost.itemsCount = (row_id * main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(main_createEmptyCell(UserHost.ids[9] + row_id + '_' + coloumn_id));
            UserHost.blankCellVector.push(UserHost.ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_user_host").appendChild(row);
    }
    UserHost.loadDataSuccessFinish();
};

UserHost.createCell = function(row_id, id, channel_name, valuesArray) {
    UserHost.nameMatrix.push(channel_name);
    if (row_id < main_ColoumnsCountVideo) main_PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return main_createCellVideo(channel_name, id, UserHost.ids, valuesArray);
};

UserHost.CellExists = function(display_name) {
    if (UserHost.nameMatrix.indexOf(display_name) > -1) {
        UserHost.blankCellCount++;
        return true;
    }
    return false;
};

UserHost.loadDataSuccessFinish = function() {
    $(document).ready(function() {
        if (!UserHost.status) {
            main_HideLoadDialog();
            if (UserHost.emptyContent) main_showWarningDialog(STR_NO + STR_LIVE_HOSTS);
            else {
                UserHost.status = true;
                UserHost.addFocus();
                main_LazyImgStart(UserHost.ids[1], 9, IMG_404_VIDEO, main_ColoumnsCountVideo);
            }
            UserHost.loadingData = false;
        } else {
            if (UserHost.blankCellCount > 0 && !UserHost.dataEnded) {
                UserHost.loadingMore = true;
                UserHost.loadDataPrepare();
                UserHost.loadDataReplace();
                return;
            } else {
                UserHost.blankCellCount = 0;
                UserHost.blankCellVector = [];
            }

            UserHost.loadingData = false;
            UserHost.loadingMore = false;
        }
    });
};

UserHost.loadChannelsReplace = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        main_SetItemsLimitReload(UserHost.blankCellCount);

        var offset = UserHost.itemsCount + UserHost.itemsCountOffset;
        if (offset && offset > (UserHost.MaxOffset - 1)) {
            offset = UserHost.MaxOffset - main_ItemsLimitReload;
            UserHost.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/hosts?game=' + encodeURIComponent(main_gameSelected) +
            '&limit=' + main_ItemsLimitReload + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserHost.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserHost.loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        UserHost.loadDataErrorReplace();
    }
};

UserHost.loadDataErrorReplace = function() {
    UserHost.loadingDataTry++;
    if (UserHost.loadingDataTry < UserHost.loadingDataTryMax) {
        UserHost.loadingDataTimeout += (UserHost.loadingDataTry < 5) ? 250 : 3500;
        UserHost.loadChannelsReplace();
    } else {
        UserHost.ReplacedataEnded = true;
        UserHost.blankCellCount = 0;
        UserHost.blankCellVector = [];
        UserHost.loadDataSuccessFinish();
    }
};

UserHost.loadDataSuccessReplace = function(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    var hosts, index, cursor = 0;
    var tempVector = UserHost.blankCellVector.slice();

    UserHost.MaxOffset = parseInt(response._total);

    if (response_items < main_ItemsLimitVideo) UserHost.ReplacedataEnded = true;

    for (var i = 0; i < UserHost.blankCellVector.length && cursor < response_items; i++, cursor++) {
        hosts = response.hosts[cursor];
        if (UserHost.CellExists(hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name)) {
            UserHost.blankCellCount--;
            i--;
        } else {
            main_replaceVideo(UserHost.blankCellVector[i],
                hosts.target.channel.name, [hosts.target.preview_urls.template.replace("{width}x{height}", main_VideoSize),
                    hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name,
                    hosts.target.title, hosts.target.meta_game, main_addCommas(hosts.target.viewers) + STR_VIEWER, ''
                ]);
            UserHost.blankCellCount--;

            index = tempVector.indexOf(tempVector[i]);
            if (index > -1) {
                tempVector.splice(index, 1);
            }
        }
    }

    UserHost.itemsCountOffset += cursor;
    if (UserHost.ReplacedataEnded) {
        UserHost.blankCellCount = 0;
        UserHost.blankCellVector = [];
    } else UserHost.blankCellVector = tempVector;

    UserHost.loadDataSuccessFinish();
};

UserHost.replaceCellEmpty = function(id, channel_name, preview_thumbnail, hosts_title, hosts_game, channel_display_name, viwers) {
    var splitedId = id.split("_");
    var row_id = splitedId[1];
    var coloumn_id = splitedId[2];
    var cell = UserHost.ids[8] + row_id + '_' + coloumn_id;

    document.getElementById(id).setAttribute('id', cell);
    document.getElementById(cell).setAttribute('data-channelname', channel_name);
    document.getElementById(cell).innerHTML =
        UserHost.CellHtml(row_id, coloumn_id, channel_display_name, hosts_title, hosts_game, viwers, preview_thumbnail, channel_name);
};

UserHost.addFocus = function() {

    main_addFocusVideoArray(UserHost.cursorY, UserHost.cursorX, UserHost.ids, main_UserHost, main_ColoumnsCountVideo, UserHost.itemsCount);

    if (UserHost.cursorY > 3) main_LazyImg(UserHost.ids[1], UserHost.cursorY, IMG_404_VIDEO, main_ColoumnsCountVideo, 4);

    if (((UserHost.cursorY + main_ItemsReloadLimitVideo) > (UserHost.itemsCount / main_ColoumnsCountVideo)) &&
        !UserHost.dataEnded && !UserHost.loadingMore) {
        UserHost.loadingMore = true;
        UserHost.loadDataPrepare();
        UserHost.loadChannels();
    }
};

UserHost.removeFocus = function() {
    main_removeFocusVideoArray(UserHost.cursorY + '_' + UserHost.cursorX, UserHost.ids);
};

UserHost.keyClickDelay = function() {
    UserHost.LastClickFinish = true;
};

UserHost.handleKeyDown = function(event) {
    if (UserHost.loadingData && !UserHost.loadingMore) {
        event.preventDefault();
        return;
    } else if (!UserHost.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        UserHost.LastClickFinish = false;
        window.setTimeout(UserHost.keyClickDelay, UserHost.keyClickDelayTime);
    }

    var i;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (main_isAboutDialogShown()) main_HideAboutDialog();
            else if (main_isControlsDialogShown()) main_HideControlsDialog();
            else {
                main_Go = main_Users;
                UserHost.exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (main_ThumbNull((UserHost.cursorY), (UserHost.cursorX - 1), UserHost.ids[0])) {
                UserHost.removeFocus();
                UserHost.cursorX--;
                UserHost.addFocus();
            } else {
                for (i = (main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (main_ThumbNull((UserHost.cursorY - 1), i, UserHost.ids[0])) {
                        UserHost.removeFocus();
                        UserHost.cursorY--;
                        UserHost.cursorX = i;
                        UserHost.addFocus();
                        break;
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (main_ThumbNull((UserHost.cursorY), (UserHost.cursorX + 1), UserHost.ids[0])) {
                UserHost.removeFocus();
                UserHost.cursorX++;
                UserHost.addFocus();
            } else if (main_ThumbNull((UserHost.cursorY + 1), 0, UserHost.ids[0])) {
                UserHost.removeFocus();
                UserHost.cursorY++;
                UserHost.cursorX = 0;
                UserHost.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < main_ColoumnsCountVideo; i++) {
                if (main_ThumbNull((UserHost.cursorY - 1), (UserHost.cursorX - i), UserHost.ids[0])) {
                    UserHost.removeFocus();
                    UserHost.cursorY--;
                    UserHost.cursorX = UserHost.cursorX - i;
                    UserHost.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < main_ColoumnsCountVideo; i++) {
                if (main_ThumbNull((UserHost.cursorY + 1), (UserHost.cursorX - i), UserHost.ids[0])) {
                    UserHost.removeFocus();
                    UserHost.cursorY++;
                    UserHost.cursorX = UserHost.cursorX - i;
                    UserHost.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (!UserHost.loadingMore) UserHost.StartLoad();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            if (!UserHost.loadingMore) {
                main_Go = main_usergames;
                UserHost.exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            main_Go = main_UserLive;
            UserHost.exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Play_selectedChannel = document.getElementById(UserHost.ids[8] + UserHost.cursorY + '_' + UserHost.cursorX).getAttribute('data-channelname');
            Play_selectedChannelDisplayname = document.getElementById(UserHost.ids[3] + UserHost.cursorY + '_' + UserHost.cursorX).textContent.split(STR_USER_HOSTING)[1];
            document.body.removeEventListener("keydown", UserHost.handleKeyDown);
            main_openStream();
            break;
        case TvKeyCode.KEY_RED:
            main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            UserHost.exit();
            main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            main_BeforeSearch = main_UserHost;
            main_Go = main_Search;
            UserHost.exit();
            main_SwitchScreen();
            break;
        default:
            break;
    }
};
