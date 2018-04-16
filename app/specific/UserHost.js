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
    Main.Go = Main.UserHost;
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    document.getElementById("id_agame_name").style.paddingLeft = Main.TopAgameDefaultUser + "%";
    $('.label_agame_name').html(Main.UserName + STR_LIVE_HOSTS);
    document.body.addEventListener("keydown", UserHost.handleKeyDown, false);
    Main.YRst(UserHost.cursorY);
    if (UserHost.OldUserName !== Main.UserName) UserHost.status = false;
    if (UserHost.status) {
        Main.ScrollHelper.scrollVerticalToElementById(UserHost.ids[0], UserHost.cursorY, UserHost.cursorX, Main.UserHost, Main.ScrollOffSetMinusVideo,
            Main.ScrollOffSetVideo, false);
        Main.CounterDialog(UserHost.cursorX, UserHost.cursorY, Main.ColoumnsCountVideo, UserHost.itemsCount);
    } else UserHost.StartLoad();
};

UserHost.exit = function() {
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    $('.label_agame_name').html('');
    document.getElementById("id_agame_name").style.paddingLeft = Main.TopAgameDefault + "%";
    document.body.removeEventListener("keydown", UserHost.handleKeyDown);
};

UserHost.StartLoad = function() {
    Main.HideWarningDialog();
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    Main.showLoadDialog();
    UserHost.OldUserName = Main.UserName;
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
    Main.CounterDialogRst();
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
            offset = UserHost.MaxOffset - Main.ItemsLimitVideo;
            UserHost.dataEnded = true;
            UserHost.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/api/users/' + encodeURIComponent(Main.UserName) + '/followed/hosting?limit=' +
            Main.ItemsLimitVideo + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserHost.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
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
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_REFRESH_PROBLEM);
    }
};

UserHost.loadDataSuccess = function(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.hosts.length;
    UserHost.MaxOffset = parseInt(response._total);

    if (response_items < Main.ItemsLimitVideo) UserHost.dataEnded = true;

    var offset_itemsCount = UserHost.itemsCount;
    UserHost.itemsCount += response_items;

    UserHost.emptyContent = !UserHost.itemsCount;

    var response_rows = response_items / Main.ColoumnsCountVideo;
    if (response_items % Main.ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, hosts,
        cursor = 0;

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main.ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main.ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            hosts = response.hosts[cursor];
            if (UserHost.CellExists(hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name)) coloumn_id--;
            else {
                row.appendChild(UserHost.createCell(row_id, row_id + '_' + coloumn_id,
                    hosts.target.channel.name, [hosts.target.preview_urls.template.replace("{width}x{height}", Main.VideoSize),
                        hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name,
                        hosts.target.title, hosts.target.meta_game, Main.addCommas(hosts.target.viewers) + STR_VIEWER, ''
                    ]));
            }
        }

        for (coloumn_id; coloumn_id < Main.ColoumnsCountVideo; coloumn_id++) {
            if (UserHost.dataEnded && !UserHost.itemsCountCheck) {
                UserHost.itemsCountCheck = true;
                UserHost.itemsCount = (row_id * Main.ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main.createEmptyCell(UserHost.ids[9] + row_id + '_' + coloumn_id));
            UserHost.blankCellVector.push(UserHost.ids[9] + row_id + '_' + coloumn_id);
        }
        document.getElementById("stream_table_user_host").appendChild(row);
    }
    UserHost.loadDataSuccessFinish();
};

UserHost.createCell = function(row_id, id, channel_name, valuesArray) {
    UserHost.nameMatrix.push(channel_name);
    if (row_id < Main.ColoumnsCountVideo) Main.PreLoadAImage(valuesArray[0]); //try to pre cache first 3 rows
    return Main.createCellVideo(channel_name, id, UserHost.ids, valuesArray);
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
            if (UserHost.emptyContent) Main.showWarningDialog(STR_NO + STR_LIVE_HOSTS);
            else UserHost.status = true;
            Main.HideLoadDialog();
            UserHost.addFocus();
            Main.LazyImgStart(UserHost.ids[1], 9, IMG_404_VIDEO, Main.ColoumnsCountVideo);

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

        Main.SetItemsLimitReload(UserHost.blankCellCount);

        var offset = UserHost.itemsCount + UserHost.itemsCountOffset;
        if (offset && offset > (UserHost.MaxOffset - 1)) {
            offset = UserHost.MaxOffset - Main.ItemsLimitReload;
            UserHost.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/hosts?game=' + encodeURIComponent(Main.gameSelected) +
            '&limit=' + Main.ItemsLimitReload + '&offset=' + offset + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = UserHost.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
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

    if (response_items < Main.ItemsLimitVideo) UserHost.ReplacedataEnded = true;

    for (var i = 0; i < UserHost.blankCellVector.length && cursor < response_items; i++, cursor++) {
        hosts = response.hosts[cursor];
        if (UserHost.CellExists(hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name)) {
            UserHost.blankCellCount--;
            i--;
        } else {
            Main.replaceVideo(UserHost.blankCellVector[i],
                hosts.target.channel.name, [hosts.target.preview_urls.template.replace("{width}x{height}", Main.VideoSize),
                    hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name,
                    hosts.target.title, hosts.target.meta_game, Main.addCommas(hosts.target.viewers) + STR_VIEWER, ''
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

    Main.addFocusVideoArray(UserHost.cursorY, UserHost.cursorX, UserHost.ids, Main.UserHost, Main.ColoumnsCountVideo, UserHost.itemsCount);

    if (UserHost.cursorY > 3) Main.LazyImg(UserHost.ids[1], UserHost.cursorY, IMG_404_VIDEO, Main.ColoumnsCountVideo, 4);

    if (((UserHost.cursorY + Main.ItemsReloadLimitVideo) > (UserHost.itemsCount / Main.ColoumnsCountVideo)) &&
        !UserHost.dataEnded && !UserHost.loadingMore) {
        UserHost.loadingMore = true;
        UserHost.loadDataPrepare();
        UserHost.loadChannels();
    }
};

UserHost.removeFocus = function() {
    Main.removeFocusVideoArray(UserHost.cursorY + '_' + UserHost.cursorX, UserHost.ids);
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
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                Main.Go = Main.Users;
                UserHost.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (Main.ThumbNull((UserHost.cursorY), (UserHost.cursorX - 1), UserHost.ids[0])) {
                UserHost.removeFocus();
                UserHost.cursorX--;
                UserHost.addFocus();
            } else {
                for (i = (Main.ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main.ThumbNull((UserHost.cursorY - 1), i, UserHost.ids[0])) {
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
            if (Main.ThumbNull((UserHost.cursorY), (UserHost.cursorX + 1), UserHost.ids[0])) {
                UserHost.removeFocus();
                UserHost.cursorX++;
                UserHost.addFocus();
            } else if (Main.ThumbNull((UserHost.cursorY + 1), 0, UserHost.ids[0])) {
                UserHost.removeFocus();
                UserHost.cursorY++;
                UserHost.cursorX = 0;
                UserHost.addFocus();
            }
            break;
        case TvKeyCode.KEY_UP:
            for (i = 0; i < Main.ColoumnsCountVideo; i++) {
                if (Main.ThumbNull((UserHost.cursorY - 1), (UserHost.cursorX - i), UserHost.ids[0])) {
                    UserHost.removeFocus();
                    UserHost.cursorY--;
                    UserHost.cursorX = UserHost.cursorX - i;
                    UserHost.addFocus();
                    break;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            for (i = 0; i < Main.ColoumnsCountVideo; i++) {
                if (Main.ThumbNull((UserHost.cursorY + 1), (UserHost.cursorX - i), UserHost.ids[0])) {
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
                Main.Go = Main.UserGames;
                UserHost.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = Main.UserLive;
            UserHost.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            Play.selectedChannel = document.getElementById(UserHost.ids[8] + UserHost.cursorY + '_' + UserHost.cursorX).getAttribute('data-channelname');
            Play.selectedChannelDisplayname = document.getElementById(UserHost.ids[3] + UserHost.cursorY + '_' + UserHost.cursorX).textContent.split(STR_USER_HOSTING)[1];
            document.body.removeEventListener("keydown", UserHost.handleKeyDown);
            Main.openStream();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            UserHost.exit();
            Main.GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.UserHost;
            Main.Go = Main.Search;
            UserHost.exit();
            Main.SwitchScreen();
            break;
        default:
            break;
    }
};
