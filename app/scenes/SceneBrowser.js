/*jshint multistr: true */
function SceneSceneBrowser() {

}

SceneSceneBrowser.selectedChannel;
SceneSceneBrowser.selectedChannelDisplayname;
var exitID,
    Scenemode = STR_LIVE,
    blankCellCount = 0,
    newImg = new Image,
    loadingReplace = false,
    imgMatrix = [],
    imgMatrixId = [],
    imgMatrixCount = 0,
    nameMatrix = [],
    userlive = [],
    userlivesubtitle = [],
    usergames = [],
    userhostlive = [],
    userhostlivesubtitle = [],
    userlivetitle = [],
    userliveimg = [],
    usergamesimg = [],
    userhosttitle = [],
    userhostimg = [],
    canPreviewData = false,
    previewDataInfo = "",
    userliveold = 0,
    usergamesold = 0,
    userhostliveold = 0,
    LastUpdate = 0,
    UpdatePreview = 0,
    nameMatrixCount = 0,
    loadingMore = false,
    previewData = "",
    keyClickDelayTime = 25, // Delay between accept a click to prevent screen stall
    videoImgSize = "640x360", // preview.large = 640x360 forcing here just in case it changes
    gameImgSize = "612x855"; // preview.large = 272x380 using a preview.large * 2,25 = 612x855

SceneSceneBrowser.forcehandleFocus = false;
SceneSceneBrowser.previewDataItemsLimit = 10;
SceneSceneBrowser.previewData = 0;

SceneSceneBrowser.itemsCountOffset = 0;
SceneSceneBrowser.LastClickFinish = true;
SceneSceneBrowser.browser = true;
SceneSceneBrowser.noNetwork = false;
SceneSceneBrowser.errorNetwork = false;
SceneSceneBrowser.keyReturnPressed = false;

SceneSceneBrowser.isShowExitDialogOn = false;

SceneSceneBrowser.ItemsLimit = 99; // max 100 use a value here that is a multiplier of SceneSceneBrowser.ColoumnsCount
SceneSceneBrowser.ColoumnsCount = 3; // offset in ScrollHelper() need to be revised if change this value
SceneSceneBrowser.ItemsReloadLimit = Math.ceil((SceneSceneBrowser.ItemsLimit / SceneSceneBrowser.ColoumnsCount) / 2);

SceneSceneBrowser.MODE_NONE = -1;
SceneSceneBrowser.MODE_ALL = 0;
SceneSceneBrowser.MODE_GAMES = 1;
SceneSceneBrowser.MODE_GAMES_STREAMS = 2;
SceneSceneBrowser.MODE_GO = 3;
SceneSceneBrowser.MODE_TOOLS = 4;
SceneSceneBrowser.MODE_FOLLOWER = 5;
SceneSceneBrowser.mode = SceneSceneBrowser.MODE_NONE;
SceneSceneBrowser.modeReturn = SceneSceneBrowser.MODE_NONE;
SceneSceneBrowser.refreshClick = false;

SceneSceneBrowser.STATE_FOLLOWER_NONE = -1;
SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST = 0; //Loading channels name list
SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO = 1; //Loading channels info
SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO = 2; //Loading games info
SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST = 3; //Loading live hosts info
SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_NONE;

SceneSceneBrowser.followerMatrix = [];
SceneSceneBrowser.isShowDialogOn = false;
SceneSceneBrowser.returnToGames = true;
SceneSceneBrowser.gameSelected = null;
SceneSceneBrowser.followerChannels;
SceneSceneBrowser.loadingFollower = false;
SceneSceneBrowser.itemsCount = 0;
SceneSceneBrowser.itemsCountFollowerChannels = 0;
SceneSceneBrowser.itemsCountFollowerLiveHosts = 0;
SceneSceneBrowser.itemsCountFollowerGames = 0;
SceneSceneBrowser.rowsCountFollower = 0;

SceneSceneBrowser.cursorX = 0;
SceneSceneBrowser.cursorY = 0;

SceneSceneBrowser.ime = null;
SceneSceneBrowser.ime2 = null;

SceneSceneBrowser.loadingData = false;
SceneSceneBrowser.loadingDataTryMax = 13;
SceneSceneBrowser.loadingDataTry;
SceneSceneBrowser.loadingDataTimeout;
SceneSceneBrowser.loadingDataTimeoutStart = false;
SceneSceneBrowser.dataEnded = false;
SceneSceneBrowser.listenerID;

tizen.tvinputdevice.registerKey("ChannelUp");
tizen.tvinputdevice.registerKey("ChannelDown");
tizen.tvinputdevice.registerKey("MediaPlayPause");
tizen.tvinputdevice.registerKey("ColorF0Red");
tizen.tvinputdevice.registerKey("ColorF1Green");
tizen.tvinputdevice.registerKey("ColorF2Yellow");
tizen.tvinputdevice.registerKey("ColorF3Blue");
var ScrollHelper = {
    documentVerticalScrollPosition: function() {
        if (self.pageYOffset) return self.pageYOffset; // Firefox, Chrome, Opera, Safari.
        if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop; // Internet Explorer 6 (standards mode).
        if (document.body.scrollTop) return document.body.scrollTop; // Internet Explorer 6, 7 and 8.
        return 0; // None of the above.
    },

    viewportHeight: function() {
        return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight;
    },

    documentHeight: function() {
        return (document.height !== undefined) ? document.height : document.body.offsetHeight;
    },

    documentMaximumScrollPosition: function() {
        return this.documentHeight() - this.viewportHeight();
    },

    elementVerticalClientPositionById: function(id) {
        var element = document.getElementById(id);
        var rectangle = element.getBoundingClientRect();
        return rectangle.top;
    },

    /**
     * For public use.
     *
     * @param id The id of the element to scroll to.
     * @param padding Top padding to apply above element.
     */
    scrollVerticalToElementById: function(id) {
        var offset = 0.345;
        if (document.getElementById(id) == null) {
            console.warn('Cannot find element with id \'' + id + '\'.');
            return;
        }

        //offset center the page when scrolling to focus
        if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GAMES || SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER) offset = 0.205;
        var targetPosition = this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - offset * this.viewportHeight();

        $(window).scrollTop(targetPosition);
    }
};

SceneSceneBrowser.loadpreviewDataError = function(reason) {
    SceneSceneBrowser.loadingDataTry++;
    if (SceneSceneBrowser.loadingDataTry < SceneSceneBrowser.loadingDataTryMax) {
        if (SceneSceneBrowser.loadingDataTry < 5) {
            SceneSceneBrowser.loadingDataTimeout += 250;
        } else {
            switch (SceneSceneBrowser.loadingDataTry) {
                case 5:
                    SceneSceneBrowser.loadingDataTimeout = 2400;
                    break;
                case 6:
                    SceneSceneBrowser.loadingDataTimeout = 5000;
                    break;
                case 7:
                    SceneSceneBrowser.loadingDataTimeout = 15000;
                    break;
                case 8:
                    SceneSceneBrowser.loadingDataTimeout = 30000;
                    break;
                case 9:
                    SceneSceneBrowser.loadingDataTimeout = 45000;
                    break;
                default:
                    SceneSceneBrowser.loadingDataTimeout = 150000;
                    break;
            }
        }
        SceneSceneBrowser.loadDataRequest();
    } else {
        reason = (typeof reason === "undefined") ? "Unknown" : reason;
        SceneSceneBrowser.loadingData = false;
        SceneSceneBrowser.showDialog("Unable to load stream data after " + SceneSceneBrowser.loadingDataTry + STR_ATTEMPT + ")" + " Reason: " + reason);
    }
};

SceneSceneBrowser.loadpreviewDataRequest = function() {
    try {
        var xmlHttp = new XMLHttpRequest();
        var theUrl;

        var offset = 0;
        if (SceneSceneBrowser.previewData === SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST) {
            theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(SceneSceneBrowser.followerUsername) + '/follows/channels?limit=' +
                SceneSceneBrowser.previewDataItemsLimit + '&offset=' + offset;
        } else if (SceneSceneBrowser.previewData === SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
            theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(SceneSceneBrowser.followerChannels) + '&limit=' +
                SceneSceneBrowser.previewDataItemsLimit + '&offset=' + offset;
        } else if (SceneSceneBrowser.previewData === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) { // user games
            theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(SceneSceneBrowser.followerUsername) + '/follows/games/live?limit=' +
                SceneSceneBrowser.previewDataItemsLimit;
        } else if (SceneSceneBrowser.previewData === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) { //user live host
            theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(SceneSceneBrowser.followerUsername) + '/followed/hosting?limit=' +
                SceneSceneBrowser.previewDataItemsLimit;
        } else {
            theUrl = 'https://api.twitch.tv/kraken/streams?limit=' + SceneSceneBrowser.previewDataItemsLimit + '&offset=' +
                offset;
        }

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = SceneSceneBrowser.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');

        xmlHttp.ontimeout = function() {

        };
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        SceneSceneBrowser.previewDataSuccess(xmlHttp.responseText);
                    } catch (err) {
                        console.log("loadpreviewDataRequest() exception: " + err.name + ' ' + err.message);
                    }

                } else {
                    SceneSceneBrowser.loadpreviewDataError("HTTP Status " + xmlHttp.status + " Message: " + xmlHttp.statusText, xmlHttp.responseText);
                }
            }
        };

        xmlHttp.send(null);
    } catch (error) {
        SceneSceneBrowser.loadpreviewDataError(error.message);
    }

};

SceneSceneBrowser.previewDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items, cursor = 0,
        game, stream, hosts;

    if (SceneSceneBrowser.previewData === SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST) {
        response_items = response.follows.length;

        var channel, x, ar = [];
        for (x = 0; x < response_items; x++) {
            channel = response.follows[x];
            ar.push(channel.channel.name);
        }
        SceneSceneBrowser.followerChannels = ar.join();
    } else if (SceneSceneBrowser.previewData === SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
        response_items = response.streams.length;
        for (cursor = 0; cursor < response_items; cursor++) {
            stream = response.streams[cursor];
            userlive[cursor] = stream.channel.name;
            userlivetitle[cursor] = stream.channel.display_name;
            userlivesubtitle[cursor] = stream.game;
            userliveimg[cursor] = (stream.preview.template).replace("{width}x{height}", videoImgSize);
        }
    } else if (SceneSceneBrowser.previewData === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {
        response_items = response.follows.length;
        for (cursor = 0; cursor < response_items; cursor++) {
            game = response.follows[cursor];
            usergames[cursor] = game.game.name;
            usergamesimg[cursor] = (game.game.box.template).replace("{width}x{height}", gameImgSize);
        }
    } else if (SceneSceneBrowser.previewData === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
        response_items = response.hosts.length;
        for (cursor = 0; cursor < response_items; cursor++) {
            hosts = response.hosts[cursor];
            userhostlive[cursor] = hosts.target.channel.name;
            userhosttitle[cursor] = hosts.display_name + ' Hosting ' + hosts.target.channel.display_name;
            userhostlivesubtitle[cursor] = hosts.target.meta_game;
            userhostimg[cursor] = (hosts.target.preview_urls.template).replace("{width}x{height}", videoImgSize);
        }
    }
    if (SceneSceneBrowser.previewData < SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
        SceneSceneBrowser.previewData++;
        SceneSceneBrowser.loadpreviewDataRequest();
    } else {
        UpdatePreview = new Date().getTime() - 590000;// if last was 9 min 50 sec ago update
        if ((UpdatePreview > LastUpdate) || userliveold != userlive.length || usergamesold != usergames.length || userhostliveold != userhostlive.length) {
            LastUpdate = new Date().getTime();
            previewDataInfo = previewDataGenerator();
            webapis.preview.setPreviewData(previewDataInfo);
        }
    }
};

SceneSceneBrowser.previewDataStart = function() {
    UpdatePreview = new Date().getTime() - 590000;// if last was 9 min 50 sec ago update
    if ((UpdatePreview < LastUpdate) || SceneSceneBrowser.followerUsername == null) return;

    userliveold = userlive.length, usergamesold = usergames.length, userhostliveold = userhostlive.length;

    userlive = [], userlivetitle = [], userlivesubtitle = [], userliveimg = [];
    usergamesimg = [], usergames = [];
    userhostlive = [], userhosttitle = [], userhostlivesubtitle = [], userhostimg = [];

    SceneSceneBrowser.previewData = 0;
    SceneSceneBrowser.loadpreviewDataRequest();
};

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

SceneSceneBrowser.loadDataError = function(reason, responseText) {
    var calling = false;
    if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER || SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GO) {
        try {
            //console.log(responseText);
            var response = $.parseJSON(responseText);
            //console.log("response.message0=" + response.message);
            //console.log("response.message1=" + "User '" + SceneSceneBrowser.followerUsername + "' does not exist");
            if (response.message === "User '" + SceneSceneBrowser.followerUsername + "' does not exist") {
                //console.log("response.message2=" + response.message);
                //console.log("Call loadDataError(true) from howDialog");
                calling = true;
                SceneSceneBrowser.loadingData = false;
                SceneSceneBrowser.refreshClick = false;
                SceneSceneBrowser.showDialog(STR_USERNAME + " '" + SceneSceneBrowser.followerUsername + "' " + STR_DOES_NOT_EXIST);
            }
            //some names return requests error 422 (This is a Justin.tv channel. It cannot be viewed on Twitch.) Maybe its from old accounts. Example: https://api.twitch.tv/kraken/streams/phoxx
            else if ((response.message === "Channel '" + SceneSceneBrowser.selectedChannel + "' does not exist") || (response.message === "Channel '" + SceneSceneBrowser.selectedChannel + "' is unavailable")) {
                //console.log("response.message3=" + response.message);
                //console.log("'Channel ''+SceneSceneBrowser.followerUsername+'' does not exist");
                calling = true;
                SceneSceneBrowser.loadingData = false;
                SceneSceneBrowser.refreshClick = false;
                SceneSceneBrowser.showDialog(STR_CHANNEL + " '" + SceneSceneBrowser.selectedChannel + "' " + STR_DOES_NOT_EXIST);
            }
        } catch (e) {
            //console.log("$.parseJSON(xmlHttp.responseText); exception [" + e.code +
            //    "] name: " + e.name + " message: " + e.message);
        }
    }
    if (!calling) {
        SceneSceneBrowser.loadingDataTry++;
        if (SceneSceneBrowser.loadingDataTry < SceneSceneBrowser.loadingDataTryMax) {
            if (SceneSceneBrowser.loadingDataTry < 5) {
                SceneSceneBrowser.loadingDataTimeout += 250;
            } else {
                switch (SceneSceneBrowser.loadingDataTry) {
                    case 5:
                        SceneSceneBrowser.loadingDataTimeout = 2400;
                        break;
                    case 6:
                        SceneSceneBrowser.loadingDataTimeout = 5000;
                        break;
                    case 7:
                        SceneSceneBrowser.loadingDataTimeout = 15000;
                        break;
                    case 8:
                        SceneSceneBrowser.loadingDataTimeout = 30000;
                        break;
                    case 9:
                        SceneSceneBrowser.loadingDataTimeout = 45000;
                        break;
                    default:
                        SceneSceneBrowser.loadingDataTimeout = 150000;
                        break;
                }
            }
            SceneSceneBrowser.loadDataRequest();
        } else {
            reason = (typeof reason === "undefined") ? "Unknown" : reason;
            SceneSceneBrowser.loadingData = false;
            SceneSceneBrowser.showDialog("Unable to load stream data after " + SceneSceneBrowser.loadingDataTry + STR_ATTEMPT + ")" + " Reason: " + reason);
        }
    }
};

SceneSceneBrowser.loadDataSuccessReplace = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items;
    // log response json
    //console.log(JSON.stringify(response));

    if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES) {
        response_items = response.top.length;
    } else {
        response_items = response.streams.length;
    }

    var row_id = SceneSceneBrowser.itemsCount / SceneSceneBrowser.ColoumnsCount;

    var coloumn_id, row, cell, game, stream, mCellExists = false,
        mReplace = false;

    for (var cursor = 0; cursor < response_items; cursor++) {
        if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES) {
            game = response.top[cursor];
            mCellExists = SceneSceneBrowser.CellExists(game.game.name);
            if (mCellExists) blankCellCount--;

            if (!mCellExists) {
                mReplace = SceneSceneBrowser.replaceCellEmpty(row_id, coloumn_id, game.game.name, game.game.box.template,
                    '', '', game.game.name, addCommas(game.channels) + STR_CHANNELS + ' for ' + addCommas(game.viewers) + STR_VIEWER, '', true);
                if (mReplace) blankCellCount--;
                if (blankCellCount == 0) break;
            }
        } else {
            stream = response.streams[cursor];
            mCellExists = SceneSceneBrowser.CellExists(stream.channel.name);
            if (mCellExists) blankCellCount--;

            if (!mCellExists) {
                mReplace = SceneSceneBrowser.replaceCellEmpty(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                    stream.channel.status, stream.game, stream.channel.display_name,
                    addCommas(stream.viewers) + STR_VIEWER, videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language), false);
                if (mReplace) blankCellCount--;
                if (blankCellCount == 0) break;
            }
        }
    }
    if (response_items < SceneSceneBrowser.ItemsLimit) {
        blankCellCount = 0;
    }
    SceneSceneBrowser.loadDataSuccessFinish();
};

SceneSceneBrowser.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items;

    //Check if is follower mode and if its in first stage, where it only load a list of channels games, then loadDataRequest() to load info about this channels
    if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST) {
        response_items = response.follows.length;

        var channel, x, ar = [];
        for (x = 0; x < response_items; x++) {
            channel = response.follows[x];
            ar.push(channel.channel.name);
        }
        SceneSceneBrowser.followerChannels = ar.join();

        SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO;
        SceneSceneBrowser.loadDataRequest();
    } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GO) {
        //console.log("response=" + response);
        //console.log("responseText=" + responseText);
        if (response.stream === null) {
            //console.log("response.stream === 'null'=");
            //console.log("+response.stream=" + response.stream);
            SceneSceneBrowser.loadingData = false;
            SceneSceneBrowser.refreshClick = false;
            SceneSceneBrowser.showDialog(STR_CHANNEL + " '" + SceneSceneBrowser.selectedChannelDisplayname +
                "' " + STR_IS_OFFLINE + " " + STR_ERROR_CONNECTION_FAIL);
        } else {
            //console.log("Opening stream from loaddatasuccess GO");
            SceneSceneBrowser.openStream();
            SceneSceneChannel.Play = true;
        }
    } else {

        if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES) {
            response_items = response.top.length;
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {
            response_items = response.follows.length;
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
            response_items = response.hosts.length;
        } else {
            response_items = response.streams.length;
        }

        if (response_items < SceneSceneBrowser.ItemsLimit) {
            SceneSceneBrowser.dataEnded = true;
        }

        var offset_itemsCount = SceneSceneBrowser.itemsCount;
        SceneSceneBrowser.itemsCount += response_items;
        var response_rows = response_items / SceneSceneBrowser.ColoumnsCount;
        if (response_items % SceneSceneBrowser.ColoumnsCount > 0) {
            response_rows++;
        }

        //Build header for Live Channels, Live Hosts, Live Games
        if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER) {
            var header;
            if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
                var tbody = $('<tbody></tbody>');
                $('#stream_table').append(tbody);
                header = $('<tr class="follower_header"></tr>').html('<div class="follower_header"> ' + STR_LIVE_CHANNELS + ' ' +
                    SceneSceneBrowser.followerUsername + STR_CHANGE_USER + '</div>');
            } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
                header = $('<tr class="follower_header"></tr>').html('<div class="follower_header"> ' + STR_LIVE_HOSTS + ' ' +
                    SceneSceneBrowser.followerUsername + '</div>');
            } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {
                header = $('<tr class="follower_header"></tr>').html('<div class="follower_header"> ' + STR_LIVE_GAMES + ' ' +
                    SceneSceneBrowser.followerUsername + '</div>');
            }

            $('#stream_table').find('tbody').append(header);

        }

        var coloumn_id, row_id, row, cell, game, stream, mCellExists = false,
            mReplace = false,
            matrix = [],
            cursor = 0;
        for (var i = 0; i < response_rows; i++) {
            if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER) {
                row_id = SceneSceneBrowser.rowsCountFollower + i; //SceneSceneBrowser.rowsCountFollower + i; // use SceneSceneBrowser.followerMatrix.length -1)
            } else {
                row_id = offset_itemsCount / SceneSceneBrowser.ColoumnsCount + i;
            }
            row = $('<tr></tr>');
            matrix = [];

            for (coloumn_id = 0; coloumn_id < SceneSceneBrowser.ColoumnsCount && cursor < response_items; coloumn_id++, cursor++) {
                mCellExists = false;
                mReplace = false;
                if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GAMES) {
                    game = response.top[cursor];
                    mCellExists = SceneSceneBrowser.CellExists(game.game.name);
                    if (!mCellExists) cell = SceneSceneBrowser.createCell(row_id, coloumn_id, game.game.name, game.game.box.template,
                        '', '', game.game.name, addCommas(game.channels) + STR_CHANNELS + ' for ' + addCommas(game.viewers) + STR_VIEWER, '', true);

                } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER &&
                    SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
                    var hosts = response.hosts[cursor];
                    matrix[coloumn_id] = [hosts.target.channel.name, 'stream'];
                    cell = SceneSceneBrowser.createCell(row_id, coloumn_id, hosts.target.channel.name, hosts.target.preview_urls.template, hosts.target.title,
                        hosts.target.meta_game, hosts.display_name + ' Hosting ' + hosts.target.channel.display_name,
                        addCommas(hosts.target.viewers) + STR_VIEWER, '', false);
                } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER &&
                    SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {
                    game = response.follows[cursor];
                    matrix[coloumn_id] = [game.game.name, 'game'];
                    cell = SceneSceneBrowser.createCell(row_id, coloumn_id, game.game.name, game.game.box.template, '', '', game.game.name,
                        addCommas(game.channels) + STR_CHANNELS + ' for ' + addCommas(game.viewers) + STR_VIEWER, '', true);
                } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER &&
                    SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
                    stream = response.streams[cursor];
                    matrix[coloumn_id] = [stream.channel.name, 'stream'];
                    cell = SceneSceneBrowser.createCell(row_id, coloumn_id, stream.channel.name, stream.preview.template, stream.channel.status,
                        stream.game, stream.channel.display_name, addCommas(stream.viewers) + STR_VIEWER,
                        videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language), false);

                } else {
                    stream = response.streams[cursor];
                    mCellExists = SceneSceneBrowser.CellExists(stream.channel.name);
                    if (!mCellExists) cell = SceneSceneBrowser.createCell(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                        stream.channel.status, stream.game, stream.channel.display_name, addCommas(stream.viewers) + STR_VIEWER,
                        videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language), false);
                }
                if (!mCellExists) row.append(cell);
                else coloumn_id--;
            }

            for (coloumn_id; coloumn_id < SceneSceneBrowser.ColoumnsCount; coloumn_id++) {
                row.append(SceneSceneBrowser.createCellEmpty(row_id, coloumn_id));
            }
            SceneSceneBrowser.followerMatrix[row_id] = matrix;
            $('#stream_table').append(row);
        }

        SceneSceneBrowser.loadDataSuccessFinish();
    }
};

function videoqualitylang(video_height, average_fps, language) {
    if (average_fps > 55) average_fps = 60;
    else if (average_fps < 35) average_fps = 30;
    else average_fps = Math.ceil(average_fps);
    return video_height + 'p' + average_fps + ' [' + language.toUpperCase() + ']';
}

SceneSceneBrowser.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality, isGame) {
    var blank_thumbnail, viwers_width = 64;
    if (isGame) {
        viwers_width = 100;
        blank_thumbnail = 'images/game.png';
        preview_thumbnail = preview_thumbnail.replace("{width}x{height}", gameImgSize);
    } else {
        blank_thumbnail = 'images/video.png';
        preview_thumbnail = preview_thumbnail.replace("{width}x{height}", videoImgSize);
    }

    imgMatrix[imgMatrixCount] = preview_thumbnail;
    imgMatrixId[imgMatrixCount] = 'thumbnail_' + row_id + '_' + coloumn_id;
    imgMatrixCount++;

    if (imgMatrixCount <= (SceneSceneBrowser.ColoumnsCount * 4)) //preload first 4 rows
        newImg.src = preview_thumbnail;

    nameMatrix[nameMatrixCount] = channel_name;
    nameMatrixCount++;

    return $('<td id="cell_' + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="thumbnail_' + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + blank_thumbnail + '"/> \
            <div class="stream_text" ' + 'style="right: 0;"' + '> \
            <div id="display_name_' + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
            <div class="stream_info">' + stream_title + '</div> \
            <div class="stream_info">' + stream_game + '</div> \
            <div class="stream_info" style="width: ' + viwers_width + '%; display: inline-block;">' + viwers + '</div> \
            <div class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
            </div>');
};

SceneSceneBrowser.createCellEmpty = function(row_id, coloumn_id) {
    // id here can't be cell_ or it will conflict when loading anything below row 0 in MODE_FOLLOWER
    return $('<td id="empty_' + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
};

/* 
 * CellExists and replaceCellEmpty check for duplicated streams/games that are created randomly when offset in loadDataRequest is bigger then 0
 * CellExists force remove a duplicated but it will cause a blank cell via createCellEmpty
 * replaceCellEmpty will replace those blank cell with new cell before allowing a new refresh
 * as you click down and more and more streams are showed, theoretically the code can handle it as it grows but 1000+ videos can slowdown the app
 */
SceneSceneBrowser.CellExists = function(display_name) {
    for (var i = 0; i <= nameMatrixCount; i++) {
        if (display_name == nameMatrix[i]) {
            blankCellCount++;
            return true;
        }
    }
    return false;
};

SceneSceneBrowser.replaceCellEmpty = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality, isGame) {
    var my = 0,
        mx = 0;
    if (row_id < ((SceneSceneBrowser.ItemsLimit / SceneSceneBrowser.ColoumnsCount) - 1)) return false;
    for (my = row_id - (1 + Math.ceil(blankCellCount / SceneSceneBrowser.ColoumnsCount)); my < row_id; my++) {
        for (mx = 0; mx < SceneSceneBrowser.ColoumnsCount; mx++) {
            if (!ThumbNull(my, mx)) {
                row_id = my;
                coloumn_id = mx;
                if (isGame)
                    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", gameImgSize); // preview.large = 272x380 using a larg * 2,25
                else
                    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", videoImgSize); // preview.large = 640x360 forcing here just in case it changes

                nameMatrix[nameMatrixCount] = channel_name;
                nameMatrixCount++;

                document.getElementById('empty_' + row_id + '_' + coloumn_id).setAttribute('id', 'cell_' + row_id + '_' + coloumn_id);
                document.getElementById('cell_' + row_id + '_' + coloumn_id).setAttribute('data-channelname', channel_name);
                document.getElementById('cell_' + row_id + '_' + coloumn_id).innerHTML =
                    '<img id="thumbnail_' + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + preview_thumbnail + '"/> \
                    <div class="stream_text" ' + 'style="right: 0;"' + '> \
                    <div id="display_name_' + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
                    <div class="stream_info">' + stream_title + '</div> \
                    <div class="stream_info">' + stream_game + '</div> \
                    <div class="stream_info" style="width:25%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
                    </div>';
                return true;
            }
        }
    }

    return false;
};

//prevent stream_text/title/info from load before the thumbnail and display a odd stream_table squashed only with names source
//https://imagesloaded.desandro.com/
SceneSceneBrowser.loadDataSuccessFinish = function() {
    $('#stream_table').imagesLoaded()
        .always({
            background: true
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            if (!loadingMore) {
                SceneSceneBrowser.showTable();
                SceneSceneBrowser.addFocus();
            }
            canPreviewData = false;
            //check state of follower load, and call next stage
            if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER &&
                SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
                SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST;
                SceneSceneBrowser.itemsCountFollowerChannels = SceneSceneBrowser.itemsCount;
                SceneSceneBrowser.rowsCountFollower += Math.ceil(SceneSceneBrowser.itemsCount / SceneSceneBrowser.ColoumnsCount);
                SceneSceneBrowser.itemsCount = 0;
                SceneSceneBrowser.loadDataRequest();
            } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER &&
                SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
                SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO;
                SceneSceneBrowser.itemsCountFollowerLiveHosts = SceneSceneBrowser.itemsCount;
                SceneSceneBrowser.rowsCountFollower += Math.ceil(SceneSceneBrowser.itemsCount / SceneSceneBrowser.ColoumnsCount);
                SceneSceneBrowser.itemsCount = 0;
                SceneSceneBrowser.loadDataRequest();
            } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER &&
                SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {
                SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_NONE;
                SceneSceneBrowser.itemsCountFollowerGames = SceneSceneBrowser.itemsCount;
                SceneSceneBrowser.rowsCountFollower += Math.ceil(SceneSceneBrowser.itemsCount / SceneSceneBrowser.ColoumnsCount);
                SceneSceneBrowser.loadingData = false;
                SceneSceneBrowser.refreshClick = false;
                canPreviewData = true;
            } else {
                SceneSceneBrowser.loadingData = false;
                SceneSceneBrowser.refreshClick = false;
                canPreviewData = true;
            }
            loadingMore = false;
            for (var i = 0; i < imgMatrix.length; i++) {
                var tumbImg = document.getElementById(imgMatrixId[i]);

                tumbImg.onerror = function() {
                    this.src = (this.src.indexOf(gameImgSize) == -1) ? 'images/404_video.jpg' : 'images/404_game.jpg'; //img fail to load use predefined
                };

                tumbImg.src = imgMatrix[i];
            }
            if (blankCellCount > 0) {
                if (blankCellCount > (SceneSceneBrowser.ItemsLimit / 2))
                    SceneSceneBrowser.itemsCountOffset += blankCellCount;
                else if (blankCellCount < (SceneSceneBrowser.ItemsLimit / 2))
                    SceneSceneBrowser.itemsCountOffset = 0;
                loadingMore = true;
                loadingReplace = true;
                SceneSceneBrowser.loadData();
            } else {
                loadingReplace = false;
                SceneSceneBrowser.itemsCountOffset = 0;
            }
            if (!loadingMore && canPreviewData) SceneSceneBrowser.previewDataStart();
        });
};

SceneSceneBrowser.loadDataRequest = function() {
    try {
        if (!loadingMore) {
            var dialog_title = (SceneSceneBrowser.refreshClick ? STR_REFRESH : STR_RETRYING) + " " +
                Scenemode + " (" + SceneSceneBrowser.loadingDataTry + STR_ATTEMPT + ")";
            SceneSceneBrowser.showDialog(dialog_title);
        }

        var xmlHttp = new XMLHttpRequest();
        var theUrl;

        var offset = SceneSceneBrowser.itemsCount + SceneSceneBrowser.itemsCountOffset;
        if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES) {
            theUrl = 'https://api.twitch.tv/kraken/games/top?limit=' + SceneSceneBrowser.ItemsLimit +
                '&offset=' + offset;
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES_STREAMS) {
            theUrl = 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(SceneSceneBrowser.gameSelected) + '&limit=' +
                SceneSceneBrowser.ItemsLimit + '&offset=' + offset;
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER &&
            SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST) {
            theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(SceneSceneBrowser.followerUsername) + '/follows/channels?limit=' +
                SceneSceneBrowser.ItemsLimit + '&offset=' + offset;
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER &&
            SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
            theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(SceneSceneBrowser.followerChannels) + '&limit=' +
                SceneSceneBrowser.ItemsLimit + '&offset=' + offset;
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER &&
            SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {
            theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(SceneSceneBrowser.followerUsername) + '/follows/games/live?limit=' +
                SceneSceneBrowser.ItemsLimit; // + '&offset=' + offset; removed offset for now, need fix latter
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER &&
            SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
            theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(SceneSceneBrowser.followerUsername) + '/followed/hosting?limit=' +
                SceneSceneBrowser.ItemsLimit; // + '&offset=' + offset; removed offset for now, need fix latter
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GO) {
            theUrl = 'https://api.twitch.tv/kraken/streams/' + encodeURIComponent(SceneSceneBrowser.selectedChannel);
        } else {
            theUrl = 'https://api.twitch.tv/kraken/streams?limit=' + SceneSceneBrowser.ItemsLimit + '&offset=' +
                offset;
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = SceneSceneBrowser.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');

        //console.log("theURL: " + theUrl);
        xmlHttp.ontimeout = function() {

        };
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        if (loadingReplace) SceneSceneBrowser.loadDataSuccessReplace(xmlHttp.responseText);
                        else SceneSceneBrowser.loadDataSuccess(xmlHttp.responseText);
                    } catch (err) {
                        console.log("loadDataSuccess() exception: " + err.name + ' ' + err.message);
                    }

                } else {
                    SceneSceneBrowser.loadDataError("HTTP Status " + xmlHttp.status + " Message: " + xmlHttp.statusText, xmlHttp.responseText);
                }
            }
        };

        xmlHttp.send(null);
    } catch (error) {
        SceneSceneBrowser.loadDataError(error.message, null);
    }

};

SceneSceneBrowser.loadData = function() {
    // Even though loading data after end is safe it is pointless and causes lag
    if ((SceneSceneBrowser.itemsCount % SceneSceneBrowser.ColoumnsCount != 0) || SceneSceneBrowser.loadingData) {
        return;
    }

    imgMatrix = [];
    imgMatrixId = [];
    imgMatrixCount = 0;
    SceneSceneBrowser.loadingData = true;
    SceneSceneBrowser.keyReturnPressed = false;
    SceneSceneBrowser.loadingDataTry = 1;
    SceneSceneBrowser.loadingDataTimeout = 1500;
    if (!SceneSceneBrowser.loadingDataTimeoutStart)
        SceneSceneBrowser.loadingDataTimeout += 3500;

    SceneSceneBrowser.loadingDataTimeoutStart = true;
    SceneSceneBrowser.loadDataRequest();
};

SceneSceneBrowser.showExitDialog = function() {
    if (SceneSceneBrowser.isShowDialogOn) {
        $("#dialog_loading").hide();
        SceneSceneBrowser.isShowDialogOn = false;
    }
    $("#dialog_exit_text").text(STR_EXIT);
    if (!SceneSceneBrowser.isShowExitDialogOn) {
        $("#dialog_exit").show();
        SceneSceneBrowser.isShowExitDialogOn = true;
        exitID = window.setTimeout(SceneSceneBrowser.showExitDialog, 3000);
    } else {
        $("#dialog_exit").hide();
        SceneSceneBrowser.isShowExitDialogOn = false;
    }
};

SceneSceneBrowser.showDialog = function(title) {
    $("#dialog_loading_text").text(title);
    if (!SceneSceneChannel.isShowDialogOn) {
        SceneSceneBrowser.isShowDialogOn = true;
        $("#streamname_frame").hide();
        $("#stream_table").hide();
        $("#username_frame").hide();
        $("#dialog_loading").show();
    }
};

SceneSceneBrowser.showTable = function() {
    SceneSceneBrowser.isShowDialogOn = false;
    $("#dialog_loading").hide();
    $("#dialog_exit").hide();
    $("#streamname_frame").hide();
    $("#username_frame").hide();
    $("#stream_table").show();

    ScrollHelper.scrollVerticalToElementById('thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX);
};

SceneSceneBrowser.showInput = function() {
    SceneSceneBrowser.isShowDialogOn = false;
    $("#dialog_loading").hide();
    $("#dialog_exit").hide();
    $("#stream_table").hide();
    $("#streamname_frame").show();
    $("#username_frame").hide();
};

SceneSceneBrowser.showInputTools = function() {
    SceneSceneBrowser.isShowDialogOn = false;
    $("#dialog_loading").hide();
    $("#dialog_exit").hide();
    $("#stream_table").hide();
    $("#streamname_frame").hide();
    $("#username_frame").show();
};

SceneSceneBrowser.switchMode = function(mode) {
    if (mode != SceneSceneBrowser.mode) {
        SceneSceneBrowser.modeReturn = SceneSceneBrowser.mode;
        SceneSceneBrowser.mode = mode;

        $("#tip_icon_channels").removeClass('tip_icon_active');
        $("#tip_icon_user").removeClass('tip_icon_active');
        $("#tip_icon_games").removeClass('tip_icon_active');
        $("#tip_icon_open").removeClass('tip_icon_active');

        if (mode == SceneSceneBrowser.MODE_ALL) {
            $("#tip_icon_channels").addClass('tip_icon_active');
            Scenemode = STR_LIVE;
            SceneSceneBrowser.refresh();
        } else if (mode == SceneSceneBrowser.MODE_GAMES) {
            $("#tip_icon_games").addClass('tip_icon_active');
            Scenemode = STR_GAMES;
            SceneSceneBrowser.refresh();
        } else if (mode == SceneSceneBrowser.MODE_GAMES_STREAMS) {
            $("#tip_icon_games").addClass('tip_icon_active');
            Scenemode = SceneSceneBrowser.gameSelected;
            SceneSceneBrowser.refresh();
        } else if (mode == SceneSceneBrowser.MODE_GO) {
            $("#tip_icon_open").addClass('tip_icon_active');
            SceneSceneBrowser.clean();
            SceneSceneBrowser.showInput();
            SceneSceneBrowser.refreshInputFocus();
        } else if (mode == SceneSceneBrowser.MODE_TOOLS) {
            //console.log("Enter MODE_TOOLS")
            $("#tip_icon_user").addClass('tip_icon_active');
            SceneSceneBrowser.clean();
            SceneSceneBrowser.showInputTools();
            SceneSceneBrowser.refreshInputFocusTools();
        } else if (mode == SceneSceneBrowser.MODE_FOLLOWER) {
            if (SceneSceneBrowser.followerUsername != null && !SceneSceneBrowser.isShowDialogOn) {
                //console.log("Enter MODE_FOLLOWER")
                $("#tip_icon_user").addClass('tip_icon_active');
                SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST;
                Scenemode = STR_USER + ' ' + SceneSceneBrowser.followerUsername;
                SceneSceneBrowser.refresh();
            } else {
                SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_TOOLS);
            }

        }
    }
};

SceneSceneBrowser.clean = function() {
    $('#stream_table').empty();
    SceneSceneBrowser.itemsCount = 0;
    SceneSceneBrowser.rowsCountFollower = 0;
    SceneSceneBrowser.followerMatrix = [];
    SceneSceneBrowser.cursorX = 0;
    SceneSceneBrowser.cursorY = 0;
    SceneSceneBrowser.dataEnded = false;
};

SceneSceneBrowser.refresh = function() {
    if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO) {
        if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER) {
            SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST;
        }
        SceneSceneBrowser.clean();
        loadingReplace = false;
        blankCellCount = 0;
        nameMatrix = [];
        nameMatrixCount = 0;
        loadingMore = false;
        SceneSceneBrowser.loadData();
    }
};


SceneSceneBrowser.removeFocus = function() {
    $('#thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).removeClass('stream_thumbnail_focused');
};

SceneSceneBrowser.addFocus = function() {
    if (((SceneSceneBrowser.cursorY + SceneSceneBrowser.ItemsReloadLimit) > (SceneSceneBrowser.itemsCount / SceneSceneBrowser.ColoumnsCount)) &&
        !SceneSceneBrowser.dataEnded) {
        loadingMore = true;
        SceneSceneBrowser.loadData();
    }

    $('#thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).addClass('stream_thumbnail_focused');
    ScrollHelper.scrollVerticalToElementById('thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX);
};

SceneSceneBrowser.getCellsCount = function(posY) {
    return Math.min(
        SceneSceneBrowser.ColoumnsCount,
        SceneSceneBrowser.itemsCount - posY * SceneSceneBrowser.ColoumnsCount);
};

SceneSceneBrowser.getRowsCount = function() {
    var count = SceneSceneBrowser.itemsCount / SceneSceneBrowser.ColoumnsCount;
    if (SceneSceneBrowser.itemsCount % SceneSceneBrowser.ColoumnsCount > 0) {
        count++;
    }

    return count;
};

SceneSceneBrowser.getRowsCountFollower = function() {
    var count = [Math.ceil(SceneSceneBrowser.itemsCountFollowerChannels / SceneSceneBrowser.ColoumnsCount),
        Math.ceil(SceneSceneBrowser.itemsCountFollowerGames / SceneSceneBrowser.ColoumnsCount),
        Math.ceil(SceneSceneBrowser.itemsCountFollowerLiveHosts / SceneSceneBrowser.ColoumnsCount)
    ];
    return count;
};

SceneSceneBrowser.refreshInputFocus = function() {
    $('#streamname_input').removeClass('channelname');
    $('#streamname_input').removeClass('channelname_focused');
    $('#streamname_button').removeClass('button_go');
    $('#streamname_button').removeClass('button_go_focused');

    if (SceneSceneBrowser.cursorY == 0) {
        $('#streamname_input').addClass('channelname_focused');
        $('#streamname_button').addClass('button_go');
    } else {
        $('#streamname_input').addClass('channelname');
        $('#streamname_button').addClass('button_go_focused');
    }
};

SceneSceneBrowser.refreshInputFocusTools = function() {
    $('#username_input').removeClass('channelname');
    $('#username_input').removeClass('channelname_focused');
    $('#username_button').removeClass('button_go');
    $('#username_button').removeClass('button_go_focused');

    if (SceneSceneBrowser.cursorY == 0) {
        $('#username_input').addClass('channelname_focused');
        $('#username_button').addClass('button_go');
    } else {
        $('#username_input').addClass('channelname');
        $('#username_button').addClass('button_go_focused');
    }
};

SceneSceneBrowser.openStream = function() {
    document.body.removeEventListener("keydown", SceneSceneBrowser.prototype.handleKeyDown);
    document.body.addEventListener("keydown", SceneSceneChannel.prototype.handleKeyDown, false);
    SceneSceneBrowser.browser = false;

    $("#scene1").hide();
    $("#scene2").show();
    $("#scene2").focus();
    SceneSceneChannel.prototype.handleFocus();
};

SceneSceneBrowser.initLanguage = function() {
    //set correct labels
    $('.label_icon_updown').html(STR_CH_UPDOWN);
    $('.label_updown').html(STR_UPDOWN);
    $('.label_channels').html(STR_LIVE);
    $('.label_user').html(STR_USER);
    $('.label_games').html(STR_GAMES);
    $('.label_open_channel').html(STR_OPEN_CHANNEL);
    $('.label_open').html(STR_OPEN);
    $('.label_placeholder_open').attr("placeholder", STR_PLACEHOLDER_OPEN);
    $('.label_placeholder_tools').attr("placeholder", STR_PLACEHOLDER_TOOLS);
};

document.addEventListener("DOMContentLoaded", function() { //window.load
    // this function will be called only once
    window.addEventListener('appcontrol', SmartHubEventListener);
    SceneSceneBrowser.initLanguage();
    $("#scene2").hide();
    SceneSceneBrowser.loadingData = false;
    SceneSceneBrowser.refreshClick = false;
    var followerU = localStorage.getItem('followerUsername');
    $('#username_input').val(followerU);
    SceneSceneBrowser.followerUsername = followerU;
    var dq = localStorage.getItem('defaultQuality');
    if (dq !== null) {
        SceneSceneChannel.quality = dq;
        SceneSceneChannel.qualityPlaying = dq;
    }
    document.body.addEventListener("keydown", SceneSceneBrowser.prototype.handleKeyDown, false);
    SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_ALL);
    SceneSceneChannel.prototype.initialize();
    SceneSceneBrowser.addNetworkStateChangeListener();

});

function SmartHubEventListener() {
    var requestedAppControl;
    try {
        requestedAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();
    } catch (e) {}
    var appControlData, actionData, videoIdx, screenIdx, gameIdx, videoTitleIdx;;

    if (requestedAppControl) {
        appControlData = requestedAppControl.appControl.data;
        for (var i = 0; i < appControlData.length; i++) {
            if (appControlData[i].key == 'PAYLOAD') {
                actionData = JSON.parse(appControlData[i].value[0]).values;
                if (JSON.parse(actionData).videoIdx) {
                    videoIdx = JSON.parse(actionData).videoIdx;
                    videoTitleIdx = JSON.parse(actionData).videoTitleIdx;
                    SceneSceneBrowser.selectedChannel = videoIdx;
                    SceneSceneBrowser.selectedChannelDisplayname = videoTitleIdx;
                    SceneSceneBrowser.openStream();
                    SceneSceneChannel.Play = true;
                } else if (JSON.parse(actionData).gameIdx) {
                    gameIdx = JSON.parse(actionData).gameIdx;
                    SceneSceneBrowser.gameSelected = gameIdx;
                    $("#tip_icon_channels").removeClass('tip_icon_active');
                    $("#tip_icon_user").removeClass('tip_icon_active');
                    $("#tip_icon_open").removeClass('tip_icon_active');
                    $("#tip_icon_games").addClass('tip_icon_active');
                    SceneSceneBrowser.mode = SceneSceneBrowser.MODE_GAMES_STREAMS;
                    Scenemode = SceneSceneBrowser.gameSelected;
                    SceneSceneBrowser.returnToGames = true;
                    if (SceneSceneChannel.Play) {
                        SceneSceneBrowser.forcehandleFocus = true;
                        window.setTimeout(SceneSceneChannel.shutdownStream, 10);
                    } else SceneSceneBrowser.refresh();
                } else if (JSON.parse(actionData).screenIdx) {
                    screenIdx = JSON.parse(actionData).screenIdx;
                    SceneSceneBrowser.gameSelected = screenIdx;
                    $("#tip_icon_channels").removeClass('tip_icon_active');
                    $("#tip_icon_user").removeClass('tip_icon_active');
                    $("#tip_icon_open").removeClass('tip_icon_active');
                    $("#tip_icon_games").removeClass('tip_icon_active');
                    if (screenIdx === 1) {
                        SceneSceneBrowser.mode = SceneSceneBrowser.MODE_ALL;
                        Scenemode = STR_LIVE;
                        $("#tip_icon_channels").addClass('tip_icon_active');
                    } else {
                        SceneSceneBrowser.mode = SceneSceneBrowser.MODE_GAMES;
                        Scenemode = STR_GAMES;
                        $("#tip_icon_games").addClass('tip_icon_active');
                    }
                    SceneSceneBrowser.returnToGames = false;
                    if (SceneSceneChannel.Play) {
                        SceneSceneBrowser.forcehandleFocus = true;
                        window.setTimeout(SceneSceneChannel.shutdownStream, 10);
                    } else SceneSceneBrowser.refresh();
                }
            }
        }
    }
}

function previewDataGenerator() {
    var data = '{"sections":[';

    if (userlive.length > 0) data += '{"title":"' + STR_LIVE_CHANNELS + SceneSceneBrowser.followerUsername + '","tiles":[';
    for (var i = 0; i < userlive.length; i++) {
        if (i < 1) {
            data += '{"title":"' + userlivetitle[i] + '","subtitle":"' + userlivesubtitle[i] + '","image_ratio":"16by9","image_url":"' + userliveimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' + userlive[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + userlivetitle[i] + '\\\"}","is_playable":true}';
        } else {
            data += ',{"title":"' + userlivetitle[i] + '","subtitle":"' + userlivesubtitle[i] + '","image_ratio":"16by9","image_url":"' + userliveimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' + userlive[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + userlivetitle[i] + '\\\"}","is_playable":true}';
        }
    }
    if (userlive.length > 0) data += ']},';

    if (userhostlive.length > 0) data += '{"title":"' + STR_LIVE_HOSTS + ' ' + SceneSceneBrowser.followerUsername + '","tiles":[';
    for (var i = 0; i < userhostlive.length; i++) {
        if (i < 1) {
            data += '{"title":"' + userhosttitle[i] + '","subtitle":"' + userhostlivesubtitle[i] + '","image_ratio":"16by9","image_url":"' + userhostimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' + userhostlive[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + userhosttitle[i] + '\\\"}","is_playable":true}';
        } else {
            data += ',{"title":"' + userhosttitle[i] + '","subtitle":"' + userhostlivesubtitle[i] + '","image_ratio":"16by9","image_url":"' + userhostimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' + userhostlive[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + userhosttitle[i] + '\\\"}","is_playable":true}';
        }
    }
    if (userhostlive.length > 0) data += ']},';

    if (usergames.length > 0) data += '{"title":"' + STR_LIVE_GAMES + ' ' + SceneSceneBrowser.followerUsername + '","tiles":[';
    for (var i = 0; i < usergames.length; i++) {
        if (i < 1) {
            data += '{"title":"' + usergames[i] + '","image_ratio":"16by9","image_url":"' + usergamesimg[i] + '","action_data":"{\\\"gameIdx\\\": \\\"' + usergames[i] + '\\\"}","is_playable":false}';
        } else {
            data += ',{"title":"' + usergames[i] + '","image_ratio":"16by9","image_url":"' + usergamesimg[i] + '","action_data":"{\\\"gameIdx\\\": \\\"' + usergames[i] + '\\\"}","is_playable":false}';
        }
    }
    if (usergames.length > 0) data += ']},';

    data += '{"title":"' + STR_LIVE + '","tiles":[';
    data += '{"title":"Go to ' + STR_LIVE + '","image_ratio":"2by3","image_url":"https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/screenshot/smarthubreference/live.png","action_data":"{\\\"screenIdx\\\": 1}","is_playable":false}';
    data += ']},';

    data += '{"title":"' + STR_GAMES + '","tiles":[';
    data += '{"title":"Go to ' + STR_GAMES + '","image_ratio":"2by3","image_url":"https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/screenshot/smarthubreference/games.png","action_data":"{\\\"screenIdx\\\": 2}","is_playable":false}';
    data += ']}';

    data += ']}';
    return data;
}

SceneSceneBrowser.prototype.handleShow = function() {
    //console.log("SceneSceneBrowser.handleShow()");
    // this function will be called when the scene manager show this scene
    SceneSceneBrowser.removeFocus();
    SceneSceneBrowser.addFocus();
};

SceneSceneBrowser.prototype.handleHide = function() {
    //console.log("SceneSceneBrowser.handleHide()");
    // this function will be called when the scene manager hide this scene
    SceneSceneBrowser.clean();
};

SceneSceneBrowser.prototype.handleFocus = function() {
    //console.log("SceneSceneBrowser.handleFocus()");
    // this function will be called when the scene manager focus this scene
    SceneSceneBrowser.refresh();
    SceneSceneBrowser.forcehandleFocus = false;
};

SceneSceneBrowser.prototype.handleBlur = function() {
    //console.log("SceneSceneBrowser.handleBlur()");
    // this function will be called when the scene manager move focus to another scene from this scene
};

SceneSceneBrowser.prototype.handleKeyDown = function(e) {

    if ((SceneSceneBrowser.loadingData && !loadingMore) || SceneSceneBrowser.noNetwork) {
        e.preventDefault();
        return;
    } else if (!SceneSceneBrowser.LastClickFinish) {
        e.preventDefault();
        return;
    } else {
        SceneSceneBrowser.LastClickFinish = false;
        window.setTimeout(keyClickDelay, keyClickDelayTime);
    }


    switch (e.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES_STREAMS) {
                if (SceneSceneBrowser.returnToGames) {
                    SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_GAMES);
                } else {
                    SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_FOLLOWER);
                }
            } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_ALL) {
                if (SceneSceneBrowser.isShowExitDialogOn) {
                    window.clearTimeout(exitID);
                    try {
                        tizen.application.getCurrentApplication().exit();
                    } catch (e) {}
                }
                SceneSceneBrowser.showExitDialog();
            } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GO) {
                if (SceneSceneBrowser.isShowDialogOn) {
                    SceneSceneBrowser.clean();
                    SceneSceneBrowser.showInput();
                    SceneSceneBrowser.refreshInputFocus();
                } else {
                    SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_ALL);
                }
            } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER) {
                if (SceneSceneBrowser.isShowDialogOn && SceneSceneBrowser.modeReturn === SceneSceneBrowser.MODE_TOOLS) {
                    SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_TOOLS);
                } else {
                    SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_ALL);
                }
            } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES) {
                SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_FOLLOWER);
            } else {
                SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_ALL);
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO && SceneSceneBrowser.mode != SceneSceneBrowser.MODE_TOOLS) {
                if (ThumbNull((SceneSceneBrowser.cursorY), (SceneSceneBrowser.cursorX - 1))) {
                    SceneSceneBrowser.removeFocus();
                    SceneSceneBrowser.cursorX--;
                    SceneSceneBrowser.addFocus();
                } else {
                    for (i = (SceneSceneBrowser.ColoumnsCount - 1); i > -1; i--) {
                        if (ThumbNull((SceneSceneBrowser.cursorY - 1), i)) {
                            SceneSceneBrowser.removeFocus();
                            SceneSceneBrowser.cursorY--;
                            SceneSceneBrowser.cursorX = i;
                            SceneSceneBrowser.addFocus();
                            break;
                        }
                    }
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO && SceneSceneBrowser.mode != SceneSceneBrowser.MODE_TOOLS) {
                if (ThumbNull((SceneSceneBrowser.cursorY), (SceneSceneBrowser.cursorX + 1))) {
                    SceneSceneBrowser.removeFocus();
                    SceneSceneBrowser.cursorX++;
                    SceneSceneBrowser.addFocus();
                } else if (ThumbNull((SceneSceneBrowser.cursorY + 1), 0)) {
                    SceneSceneBrowser.removeFocus();
                    SceneSceneBrowser.cursorY++;
                    SceneSceneBrowser.cursorX = 0;
                    SceneSceneBrowser.addFocus();
                }
            }
            break;
        case TvKeyCode.KEY_UP:
            if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO && SceneSceneBrowser.mode != SceneSceneBrowser.MODE_TOOLS) {
                for (i = 0; i < SceneSceneBrowser.ColoumnsCount; i++) {
                    if (ThumbNull((SceneSceneBrowser.cursorY - 1), (SceneSceneBrowser.cursorX - i))) {
                        SceneSceneBrowser.removeFocus();
                        SceneSceneBrowser.cursorY--;
                        SceneSceneBrowser.cursorX = SceneSceneBrowser.cursorX - i;
                        SceneSceneBrowser.addFocus();
                        break;
                    }
                }
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GO) {
                //console.log("keyup SceneSceneBrowser.MODE_GO");
                SceneSceneBrowser.cursorY = 0;
                SceneSceneBrowser.refreshInputFocus();
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_TOOLS) {
                //console.log("key UP on TOOLS");
                SceneSceneBrowser.cursorY = 0;
                SceneSceneBrowser.refreshInputFocusTools();
            }
            break;
        case TvKeyCode.KEY_DOWN:
            if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO && SceneSceneBrowser.mode != SceneSceneBrowser.MODE_TOOLS) {
                for (i = 0; i < SceneSceneBrowser.ColoumnsCount; i++) {
                    if (ThumbNull((SceneSceneBrowser.cursorY + 1), (SceneSceneBrowser.cursorX - i))) {
                        SceneSceneBrowser.removeFocus();
                        SceneSceneBrowser.cursorY++;
                        SceneSceneBrowser.cursorX = SceneSceneBrowser.cursorX - i;
                        SceneSceneBrowser.addFocus();
                        break;
                    }
                }
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GO) {
                SceneSceneBrowser.cursorY = 1;
                SceneSceneBrowser.refreshInputFocus();
                SceneSceneBrowser.ime.blur();
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_TOOLS) {
                //console.log("key down on TOOLS");
                SceneSceneBrowser.cursorY = 1;
                SceneSceneBrowser.refreshInputFocusTools();
                SceneSceneBrowser.ime2.blur();
            }
            break;
        case TvKeyCode.KEY_CHANNELUP:
            if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GAMES_STREAMS || SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GAMES) {
                SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_ALL);
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER || SceneSceneBrowser.mode == SceneSceneBrowser.MODE_TOOLS) {
                SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_GAMES);
            } else {
                SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_FOLLOWER);
            }
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_TOOLS && SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO) {
                SceneSceneBrowser.refreshClick = true;
                SceneSceneBrowser.refresh();
            }
            break;
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER) {
                if (SceneSceneBrowser.followerMatrix[SceneSceneBrowser.cursorY][SceneSceneBrowser.cursorX][1] == 'stream') {
                    SceneSceneBrowser.selectedChannel = $('#cell_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).attr('data-channelname');
                    SceneSceneBrowser.selectedChannelDisplayname = document.getElementById('display_name_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).textContent;
                    SceneSceneBrowser.openStream();
                    SceneSceneChannel.Play = true;
                } else if (SceneSceneBrowser.followerMatrix[SceneSceneBrowser.cursorY][SceneSceneBrowser.cursorX][1] == 'game') {
                    SceneSceneBrowser.gameSelected = $('#cell_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).attr('data-channelname');
                    SceneSceneBrowser.mode = SceneSceneBrowser.MODE_GAMES_STREAMS;
                    SceneSceneBrowser.returnToGames = false;
                    Scenemode = SceneSceneBrowser.gameSelected;
                    SceneSceneBrowser.refresh();
                }
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GO) {
                if (SceneSceneBrowser.cursorY == 0) {
                    SceneSceneBrowser.ime = document.querySelector('#streamname_input');
                    //This is how we handle input from IME
                    SceneSceneBrowser.ime.addEventListener('input');

                    //This is how we handle end of IME composition
                    SceneSceneBrowser.ime.addEventListener('compositionend', function() {
                        //console.log('compositionend');
                    });

                    SceneSceneBrowser.ime.focus();
                    //SceneSceneBrowser.isImeFocused = true;
                } else {
                    SceneSceneBrowser.selectedChannel = $('#streamname_input').val();
                    if (SceneSceneBrowser.selectedChannel == '') {
                        //console.log("SceneSceneBrowser.selectedChannel == null       =" + SceneSceneBrowser.selectedChannel);
                    } else {
                        //console.log("NOT NULL       =" + SceneSceneBrowser.selectedChannel);
                        SceneSceneBrowser.loadData();
                    }

                }
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_TOOLS) {
                if (SceneSceneBrowser.cursorY == 0) {
                    SceneSceneBrowser.ime2 = document.querySelector('#username_input');
                    //This is how we handle input from IME
                    SceneSceneBrowser.ime2.addEventListener('input');

                    //This is how we handle end of IME composition
                    SceneSceneBrowser.ime2.addEventListener('compositionend', function() {
                        //console.log('compositionend');
                    });

                    SceneSceneBrowser.ime2.focus();
                    //SceneSceneBrowser.isIme2Focused = true;
                } else {
                    SceneSceneBrowser.followerUsername = $('#username_input').val();
                    localStorage.setItem('followerUsername', $('#username_input').val());
                    if (SceneSceneBrowser.followerUsername == '') {
                        //console.log("SceneSceneBrowser.followerUsername == null     = " + SceneSceneBrowser.followerUsername);
                    } else {
                        //console.log("NOT NULL     = " + SceneSceneBrowser.followerUsername);
                        SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_FOLLOWER);
                    }

                }
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GAMES) {
                SceneSceneBrowser.gameSelected = $('#cell_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).attr('data-channelname');
                SceneSceneBrowser.mode = SceneSceneBrowser.MODE_GAMES_STREAMS;
                SceneSceneBrowser.returnToGames = true;
                Scenemode = SceneSceneBrowser.gameSelected;
                SceneSceneBrowser.refresh();
            } else {
                SceneSceneBrowser.selectedChannel = $('#cell_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).attr('data-channelname');
                SceneSceneBrowser.selectedChannelDisplayname = document.getElementById('display_name_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).textContent;
                SceneSceneBrowser.openStream();
                SceneSceneChannel.Play = true;
            }
            break;
        case TvKeyCode.KEY_VOLUMEUP:
            break;
        case TvKeyCode.KEY_VOLUMEDOWN:
            break;
        case TvKeyCode.KEY_MUTE:
            break;
        case TvKeyCode.KEY_RED:
            SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_ALL);
            break;
        case TvKeyCode.KEY_GREEN:
            SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_TOOLS);
            break;
        case TvKeyCode.KEY_YELLOW:
            SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_GAMES);
            break;
        case TvKeyCode.KEY_BLUE:
            SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_GO);
            break;
            //case TvKeyCode.KEY_TOOLS:
            //    SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_TOOLS);
            //    break;
            //case TvKeyCode.KEY_INFO:
            //    SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_FOLLOWER);
            //    break;
        default:
            //console.log("handle default key event, key code(" + e.keyCode + ")");
            break;
    }
};

function ThumbNull(y, x) {
    return document.getElementById('thumbnail_' + y + '_' + x, 0) != null;
}

function keyClickDelay() {
    SceneSceneBrowser.LastClickFinish = true;
}

SceneSceneBrowser.addNetworkStateChangeListener = function() {
    var onChange = function(data) {
        //console.log("[NetworkStateChangedCallback] DATA=" + data);
        if (data == 1 || data == 4) { //network connected
            //console.log("[NetworkStateChangedCallback] network cable conecteddata= " + data);
            SceneSceneBrowser.noNetwork = false;
            if (SceneSceneBrowser.browser) {
                if (SceneSceneBrowser.errorNetwork) {
                    SceneSceneBrowser.errorNetwork = false;
                    SceneSceneBrowser.showTable();
                    SceneSceneBrowser.openStream();
                    SceneSceneChannel.Play = true;
                } else {
                    SceneSceneBrowser.refresh();
                }
            } else {
                SceneSceneChannel.showPlayer();
            }
        } else if (data == 2 || 5) {
            //console.log("[NetworkStateChangedCallback] network cable disconnected data= " + data);
            if (SceneSceneBrowser.browser) {
                SceneSceneBrowser.noNetwork = true;
                SceneSceneBrowser.showDialog(STR_ERROR_NETWORK_DISCONNECT);
            } else {
                SceneSceneChannel.showDialog(STR_ERROR_NETWORK_DISCONNECT);
            }
        }
    };
    try {
        SceneSceneBrowser.listenerID = webapis.network.addNetworkStateChangeListener(onChange);
    } catch (e) {
        //console.log("addNetworkStateChangeListener exception [" + e.code + "] name: " + e.name + " message: " + e.message);
    }
    //if (SceneSceneBrowser.listenerID > -1) {
    //    console.log("addNetworkStateChangeListener success listener ID [" + SceneSceneBrowser.listenerID + "] ");
    //}
};
