/*jshint multistr: true */
function SceneSceneBrowser() {

}

SceneSceneBrowser.selectedChannel;
SceneSceneBrowser.selectedChannelDisplayname;
var exitID,
    networkID,
    Scenemode = STR_LIVE,
    blankCellCount = 0,
    newImg = new Image(),
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

SceneSceneBrowser.highlight = false;
SceneSceneBrowser.selectedChannelDisplaynameOld = '';
SceneSceneBrowser.selectedChannelDisplayname = '';
SceneSceneBrowser.returnToVods = false;
SceneSceneBrowser.UserFallowingNameTemp = [];
SceneSceneBrowser.UserFallowingDisplayNameTemp = [];
SceneSceneBrowser.UserFallowingLogoTemp = [];
SceneSceneBrowser.LoadFallowingOnly = false;
SceneSceneBrowser.followerUsernameArraySize = 0;
SceneSceneBrowser.followerUsernameArray = [];
SceneSceneBrowser.Followercount = 0;
SceneSceneBrowser.generateUserLiveCount = 0;
SceneSceneBrowser.getAllUserPreFallowingLiveCount = 0;
SceneSceneBrowser.DogetAllUserFallowing = false;
SceneSceneBrowser.UserFallowingName = [];
SceneSceneBrowser.UserFallowingLive = [];
SceneSceneBrowser.returntoFollowerListOffsset = 0;
SceneSceneBrowser.followerChannelsTemp = '';
SceneSceneBrowser.returntoFollowerList = false;
SceneSceneBrowser.returnToFallower = false;
SceneSceneBrowser.SmartHubResume = false;
SceneSceneBrowser.forcehandleFocus = false;
SceneSceneBrowser.previewDataItemsLimit = 12; //Maximum 40 tiles we have User Live, host and game = 12 + 2 (All live and all games) total max possible = 38
SceneSceneBrowser.previewData = 0;

SceneSceneBrowser.itemsCountOffset = 0;
SceneSceneBrowser.LastClickFinish = true;
SceneSceneBrowser.browser = true;
SceneSceneBrowser.noNetwork = false;
SceneSceneBrowser.errorNetwork = false;
SceneSceneBrowser.keyReturnPressed = false;

SceneSceneBrowser.isShowExitDialogOn = false;

SceneSceneBrowser.ItemsLimit = 99; // min 25 max 100 use a value here that is divisible by SceneSceneBrowser.ColoumnsCount
SceneSceneBrowser.ColoumnsCount = 3; // offset in ScrollHelper() need to be revised if change this value
SceneSceneBrowser.ItemsReloadLimit = Math.ceil((SceneSceneBrowser.ItemsLimit / SceneSceneBrowser.ColoumnsCount) / 2);
SceneSceneBrowser.ItemsReloadLimitVod = SceneSceneBrowser.ItemsReloadLimit;
SceneSceneBrowser.ColoumnsCountVod = SceneSceneBrowser.ColoumnsCount;
SceneSceneBrowser.ItemsLimitVod = 96;

SceneSceneBrowser.MODE_NONE = -1;
SceneSceneBrowser.MODE_ALL = 0;
SceneSceneBrowser.MODE_GAMES = 1;
SceneSceneBrowser.MODE_GAMES_STREAMS = 2;
SceneSceneBrowser.MODE_OPEN = 3;
SceneSceneBrowser.MODE_USERS = 4;
SceneSceneBrowser.MODE_FOLLOWER = 5;
SceneSceneBrowser.mode = SceneSceneBrowser.MODE_NONE;
SceneSceneBrowser.modeReturn = SceneSceneBrowser.MODE_NONE;
SceneSceneBrowser.refreshClick = false;

SceneSceneBrowser.STATE_FOLLOWER_NONE = -1;
SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST = 0; //Loading channels name list
SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO = 1; //Loading channels info
SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO = 2; //Loading games info
SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST = 3; //Loading live hosts info
SceneSceneBrowser.STATE_FOLLOWER_VOD = 4; //Loading vod info
SceneSceneBrowser.STATE_FOLLOWER_VOD_VIDEOS = 5; //Loading vod videos
SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_NONE;

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
SceneSceneBrowser.loadingDataTry = 1;
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
tizen.tvinputdevice.registerKey("Guide");
tizen.tvinputdevice.registerKey("Info");
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
            //console.warn('Cannot find element with id \'' + id + '\'.');
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
                    SceneSceneBrowser.loadingDataTimeout = 5000;
                    break;
                case 6:
                    SceneSceneBrowser.loadingDataTimeout = 6500;
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
    }
};

SceneSceneBrowser.loadpreviewDataRequest = function() {
    try {
        var xmlHttp = new XMLHttpRequest();
        var theUrl;

        var offset = 0;
        if (SceneSceneBrowser.previewData === SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST) {
            theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(SceneSceneBrowser.followerUsername) + '/follows/channels?limit=' +
                (SceneSceneBrowser.previewDataItemsLimit + 2) + '&offset=' + offset + '&sortby=last_broadcast';
        } else if (SceneSceneBrowser.previewData === SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
            theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(SceneSceneBrowser.followerChannels) + '&limit=' +
                (SceneSceneBrowser.previewDataItemsLimit + 2) + '&offset=' + offset;
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
                        //console.log("loadpreviewDataRequest() exception: " + err.name + ' ' + err.message);
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
            userlivetitle[cursor] = SceneSceneBrowser.is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name;
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
        UpdatePreview = new Date().getTime() - 590000; // if last was 9 min 50 sec ago update
        if ((UpdatePreview > LastUpdate) || userliveold != userlive.length || usergamesold != usergames.length || userhostliveold != userhostlive.length) {
            LastUpdate = new Date().getTime();
            previewDataInfo = previewDataGenerator();
            webapis.preview.setPreviewData(previewDataInfo);
        }
    }
};

SceneSceneBrowser.previewDataStart = function() {
    UpdatePreview = new Date().getTime() - 590000; // if last was 9 min 50 sec ago update
    if ((UpdatePreview < LastUpdate) || (SceneSceneBrowser.followerUsernameArray.length == 0)) return;

    SceneSceneBrowser.followerUsername = SceneSceneBrowser.followerUsernameArray[0];
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
    if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER || SceneSceneBrowser.mode === SceneSceneBrowser.MODE_OPEN) {
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
            if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER) {
                SceneSceneBrowser.showDialog("Unable to open user " + SceneSceneBrowser.followerUsername + "Reason: " + reason);
                SceneSceneBrowser.isPreUser = false;
                SceneSceneBrowser.removeUser(SceneSceneBrowser.followerUsernameArraySize - 1);
                SceneSceneBrowser.state_follower = null;
                window.setTimeout(function() {
                    SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_USERS);
                }, 2000);
                return;
            } else {
                SceneSceneBrowser.showDialog("Unable to load stream after " + SceneSceneBrowser.loadingDataTry + STR_ATTEMPT + ")" + " Reason: " + reason);
            }
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

    var coloumn_id, game, stream, mCellExists = false,
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
                    stream.channel.status, stream.game, SceneSceneBrowser.is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
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
    var response;
    if (responseText != null)
        response = $.parseJSON(responseText);
    var response_items;
    var values_splited;

    if (responseText == null) {
        SceneSceneBrowser.ColoumnsCount = SceneSceneBrowser.ColoumnsCountVod * 2;
        SceneSceneBrowser.ItemsLimit = SceneSceneBrowser.ItemsLimitVod;
        if (!loadingMore) {
            SceneSceneBrowser.UserFallowingNameTemp = [];
            SceneSceneBrowser.UserFallowingDisplayNameTemp = [];
            SceneSceneBrowser.UserFallowingLogoTemp = [];


            for (var y = 0; y < SceneSceneBrowser.ItemsLimit; y++) {
                if (y < SceneSceneBrowser.UserFallowingName.length) {
                    values_splited = SceneSceneBrowser.UserFallowingName[y].split(",");
                    SceneSceneBrowser.UserFallowingNameTemp[y] = values_splited[0];
                    SceneSceneBrowser.UserFallowingDisplayNameTemp[y] = values_splited[1];
                    SceneSceneBrowser.UserFallowingLogoTemp[y] = values_splited[2];
                } else {
                    break;
                }
            }

            SceneSceneBrowser.UserFallowingVod = 0;
        } else {
            SceneSceneBrowser.UserFallowingVod++;
            SceneSceneBrowser.UserFallowingNameTemp = [];
            SceneSceneBrowser.UserFallowingDisplayNameTemp = [];
            SceneSceneBrowser.UserFallowingLogoTemp = [];

            for (var y = 0; y < SceneSceneBrowser.ItemsLimit; y++) {
                if (((SceneSceneBrowser.UserFallowingVod * (SceneSceneBrowser.ItemsLimit)) + y) < SceneSceneBrowser.UserFallowingName.length) {
                    values_splited = SceneSceneBrowser.UserFallowingName[y + (SceneSceneBrowser.UserFallowingVod * SceneSceneBrowser.ItemsLimit)].split(",");
                    SceneSceneBrowser.UserFallowingNameTemp[y] = values_splited[0];
                    SceneSceneBrowser.UserFallowingDisplayNameTemp[y] = values_splited[1];
                    SceneSceneBrowser.UserFallowingLogoTemp[y] = values_splited[2];
                } else {
                    break;
                }
            }
        }
    } else {
        SceneSceneBrowser.ColoumnsCount = SceneSceneBrowser.ColoumnsCountVod;
        SceneSceneBrowser.ItemsReloadLimit = SceneSceneBrowser.ItemsReloadLimitVod * 2;
    }

    if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_OPEN && responseText != null) {
        if (response.stream === null) {
            SceneSceneBrowser.loadingData = false;
            SceneSceneBrowser.refreshClick = false;
            SceneSceneBrowser.showDialog(STR_CHANNEL + " '" + SceneSceneBrowser.selectedChannelDisplayname +
                "' " + STR_IS_OFFLINE + " or " + STR_ERROR_CONNECTION_FAIL);
        } else {
            SceneSceneChannel.RestoreFromResume = false;
            SceneSceneBrowser.forcehandleFocus = true;
            SceneSceneBrowser.openStream();
        }
        SceneSceneBrowser.loadingData = false;
        SceneSceneBrowser.refreshClick = false;
        SceneSceneBrowser.SmartHubResume = false;
        return;
    } else {

        if (responseText == null) {
            response_items = SceneSceneBrowser.UserFallowingNameTemp.length;
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES) {
            response_items = response.top.length;
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER) {
            if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {
                response_items = response.follows.length;
            } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
                response_items = response.hosts.length;
            } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_VOD_VIDEOS) {
                response_items = response.videos.length;
            } else {
                response_items = response.streams.length;
            }
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
        if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER && !loadingMore) {
            var header;
            var tbody = $('<tbody></tbody>');
            $('#stream_table').append(tbody);
            //console.log(JSON.stringify(response));
            if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
                header = $('<tr class="follower_header"></tr>').html('<div class="follower_header"> LIVE CHANNELS ' +
                    SceneSceneBrowser.followerUsername + '<br>CH Up/Down will change between this user LIVE CHANNELS/HOSTS/GAMES/VOD</div>');
            } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
                header = $('<tr class="follower_header"></tr>').html('<div class="follower_header"> LIVE HOSTS ' +
                    SceneSceneBrowser.followerUsername + '<br>CH Up/Down will change between this user LIVE CHANNELS/HOSTS/GAMES/VOD</div>');
            } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {
                header = $('<tr class="follower_header"></tr>').html('<div class="follower_header"> LIVE GAMES ' +
                    SceneSceneBrowser.followerUsername + '<br>CH Up/Down will change between this user LIVE CHANNELS/HOSTS/GAMES/VOD</div>');
            } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_VOD) {
                header = $('<tr class="follower_header"></tr>').html('<div class="follower_header">' +
                    SceneSceneBrowser.followerUsername + ' Fallowing Channels (' + SceneSceneBrowser.UserFallowingName.length + ') select one to list VODs<br>CH Up/Down will change between this user LIVE CHANNELS/HOSTS/GAMES/VOD</div>');
            } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_VOD_VIDEOS) {
                header = $('<tr class="follower_header"></tr>').html('<div class="follower_header">' + SceneSceneBrowser.selectedChannelDisplayname + ' ' + (SceneSceneBrowser.highlight ? ' Highlight ' : ' Past Broadcast' ) + '<br>CH Press(Guide) will change between Highlight and Past Broadcast</div>');
            }
            $('#stream_table').find('tbody').append(header);

        }

        var temp, coloumn_id, row_id, row, cell, game, video, stream, mCellExists = false,
            mReplace = false,
            cursor = 0;
        for (var i = 0; i < response_rows; i++) {
            row_id = offset_itemsCount / SceneSceneBrowser.ColoumnsCount + i;
            row = $('<tr></tr>');

            for (coloumn_id = 0; coloumn_id < SceneSceneBrowser.ColoumnsCount && cursor < response_items; coloumn_id++, cursor++) {
                mCellExists = false;
                mReplace = false;
                if (responseText == null) {
                    cell = SceneSceneBrowser.createCell(row_id, coloumn_id, SceneSceneBrowser.UserFallowingNameTemp[cursor],
                        SceneSceneBrowser.UserFallowingLogoTemp[cursor], '', '', SceneSceneBrowser.UserFallowingDisplayNameTemp[cursor], '', '', 4);
                } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GAMES) {
                    game = response.top[cursor];
                    mCellExists = SceneSceneBrowser.CellExists(game.game.name);
                    if (!mCellExists) cell = SceneSceneBrowser.createCell(row_id, coloumn_id, game.game.name, game.game.box.template,
                        '', '', game.game.name, addCommas(game.channels) + STR_CHANNELS + ' for ' + addCommas(game.viewers) + STR_VIEWER, '', 1);
                } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER) {
                    if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
                        var hosts = response.hosts[cursor];
                        cell = SceneSceneBrowser.createCell(row_id, coloumn_id, hosts.target.channel.name,
                            hosts.target.preview_urls.template, hosts.target.title,
                            hosts.target.meta_game, hosts.display_name + ' Hosting ' + hosts.target.channel.display_name,
                            addCommas(hosts.target.viewers) + STR_VIEWER, '', 2);
                    } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {
                        game = response.follows[cursor];
                        cell = SceneSceneBrowser.createCell(row_id, coloumn_id, game.game.name, game.game.box.template, '', '', game.game.name,
                            addCommas(game.channels) + STR_CHANNELS + ' for ' + addCommas(game.viewers) + STR_VIEWER, '', 1);
                    } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
                        stream = response.streams[cursor];
                        cell = SceneSceneBrowser.createCell(row_id, coloumn_id, stream.channel.name, stream.preview.template, stream.channel.status,
                            stream.game, SceneSceneBrowser.is_playlist(JSON.stringify(stream.stream_type)) +
                            stream.channel.display_name, addCommas(stream.viewers) + STR_VIEWER,
                            videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language), 2);
                    } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_VOD_VIDEOS) {
                        video = response.videos[cursor];
                        temp = JSON.stringify(video.preview) + '';
                        if (temp.indexOf('404_processing_320x240.png') == -1) {
                            cell = SceneSceneBrowser.createCell(row_id, coloumn_id, video._id, video.preview,
                                'Streamed on ' + SceneSceneChannel.videoCreatedAt(video.created_at),
                                'Duration ' + SceneSceneChannel.timeMs((parseInt(video.length) / 60) * 60000), video.title,
                                addCommas(video.views) +
                                ' Views', videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.language), 3);
                        } else {
                            cell = SceneSceneBrowser.createCell(row_id, coloumn_id, '', 'images/404_processing.png', '', '', '', '404 Video can\'t be played', '', '', '', null);
                        }
                    }
                } else {
                    stream = response.streams[cursor];
                    mCellExists = SceneSceneBrowser.CellExists(stream.channel.name);
                    if (!mCellExists) cell = SceneSceneBrowser.createCell(row_id, coloumn_id, stream.channel.name, stream.preview.template,
                        stream.channel.status, stream.game, SceneSceneBrowser.is_playlist(JSON.stringify(stream.stream_type)) +
                        stream.channel.display_name, addCommas(stream.viewers) + STR_VIEWER,
                        videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language), 2);
                }
                if (!mCellExists) row.append(cell);
                else coloumn_id--;
            }

            for (coloumn_id; coloumn_id < SceneSceneBrowser.ColoumnsCount; coloumn_id++) {
                row.append(SceneSceneBrowser.createCellEmpty(row_id, coloumn_id));
            }
            $('#stream_table').append(row);
        }

        SceneSceneBrowser.loadDataSuccessFinish();
    }
};

SceneSceneBrowser.is_playlist = function(content) {
    return (content.indexOf('watch_party') == -1) ? '' : '[VOD] ';
}

function videoqualitylang(video_height, average_fps, language) {
    video_height = video_height + ''; //stringfy doesnot work 8|
    if (video_height.indexOf('x') == 0) video_height = video_height.slice(-3);
    if (average_fps > 58) average_fps = 60;
    else if (average_fps < 32) average_fps = 30;
    else average_fps = Math.ceil(average_fps);
    return video_height + 'p' + average_fps + ((language != "") ? ' [' + language.toUpperCase() + ']' : '');
}

SceneSceneBrowser.createCell = function(row_id, coloumn_id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality, thumb_type) {
    var blank_thumbnail, viwers_width = 64;
    if (thumb_type != null) {
        if (thumb_type == 1) {
            viwers_width = 100;
            blank_thumbnail = 'images/game.png';
            preview_thumbnail = preview_thumbnail.replace("{width}x{height}", gameImgSize);
        } else if (thumb_type == 2) {
            blank_thumbnail = 'images/video.png';
            preview_thumbnail = preview_thumbnail.replace("{width}x{height}", videoImgSize);
        } else if (thumb_type == 3) {
            blank_thumbnail = 'images/video.png';
            preview_thumbnail = preview_thumbnail.replace("320x240", videoImgSize);
        } else {
            blank_thumbnail = 'images/ch_logo.png';
        }
    } else {
        blank_thumbnail = preview_thumbnail;
    }

    imgMatrix[imgMatrixCount] = preview_thumbnail;
    imgMatrixId[imgMatrixCount] = 'thumbnail_' + row_id + '_' + coloumn_id;
    imgMatrixCount++;

    if (imgMatrixCount <= (SceneSceneBrowser.ColoumnsCount * 4)) //pre cache first 4 rows
        newImg.src = preview_thumbnail;

    nameMatrix[nameMatrixCount] = channel_name;
    nameMatrixCount++;

    return $('<td id="cell_' + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + channel_name + '"></td>').html(
        '<img id="thumbnail_' + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + blank_thumbnail + '"/> \
            <div id="thumbnail_div_' + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="display_name_' + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
            <div id="stream_title_' + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div> \
            <div id="stream_game_' + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div> \
            <div id="viwers_' + row_id + '_' + coloumn_id + '"class="stream_info" style="width: ' + viwers_width + '%; display: inline-block;">' + viwers + '</div> \
            <div id="quality_' + row_id + '_' + coloumn_id + '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
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
        mx = 0,
        viwers_width = 64;
    if (row_id < ((SceneSceneBrowser.ItemsLimit / SceneSceneBrowser.ColoumnsCount) - 1)) return false;
    for (my = row_id - (1 + Math.ceil(blankCellCount / SceneSceneBrowser.ColoumnsCount)); my < row_id; my++) {
        for (mx = 0; mx < SceneSceneBrowser.ColoumnsCount; mx++) {
            if (!ThumbNull(my, mx) && (document.getElementById('empty_' + my + '_' + mx, 0) != null)) {
                row_id = my;
                coloumn_id = mx;
                if (isGame) {
                    viwers_width = 100;
                    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", gameImgSize);
                } else
                    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", videoImgSize);

                nameMatrix[nameMatrixCount] = channel_name;
                nameMatrixCount++;

                document.getElementById('empty_' + row_id + '_' + coloumn_id).setAttribute('id', 'cell_' + row_id + '_' + coloumn_id);
                document.getElementById('cell_' + row_id + '_' + coloumn_id).setAttribute('data-channelname', channel_name);
                document.getElementById('cell_' + row_id + '_' + coloumn_id).innerHTML =
                    '<img id="thumbnail_' + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + preview_thumbnail + '"/> \
                    <div id="thumbnail_div_' + row_id + '_' + coloumn_id + '" class="stream_text"> \
                    <div id="display_name_' + row_id + '_' + coloumn_id + '" class="stream_channel">' + channel_display_name + '</div> \
                    <div id="stream_title_' + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_title + '</div> \
                    <div id="stream_game_' + row_id + '_' + coloumn_id + '"class="stream_info">' + stream_game + '</div> \
                    <div id="viwers_' + row_id + '_' + coloumn_id + '"class="stream_info" style="width: ' + viwers_width + '%; display: inline-block;">' + viwers + '</div> \
                    <div id="quality_' + row_id + '_' + coloumn_id + '"class="stream_info" style="width:35%; text-align: right; float: right; display: inline-block;">' + quality + '</div> \
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
            //check state of follower load, and call next stage
            SceneSceneBrowser.loadingData = false;
            SceneSceneBrowser.refreshClick = false;
            SceneSceneBrowser.SmartHubResume = false;
            loadingMore = false;
            SceneSceneBrowser.ColoumnsCount = SceneSceneBrowser.ColoumnsCountVod;
            SceneSceneBrowser.ItemsLimit = SceneSceneBrowser.ItemsLimitVod + SceneSceneBrowser.ColoumnsCount;
            for (var i = 0; i < imgMatrix.length; i++) {
                var tumbImg = document.getElementById(imgMatrixId[i]);

                tumbImg.onerror = function() {
                    this.src = (this.src.indexOf(gameImgSize) > -1) ? 'images/404_game.png' :
                        (this.src.indexOf(videoImgSize) > -1) ? 'images/404_video.png)' : 'images/404_logo.png)'; //img fail to load use predefined
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
            if (!loadingMore) SceneSceneBrowser.previewDataStart();
        });
};

SceneSceneBrowser.loadDataRequest = function() {
    try {
        if (!loadingMore && SceneSceneBrowser.mode !== SceneSceneBrowser.MODE_OPEN) {
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
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER) {
            if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST) {
                theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(SceneSceneBrowser.followerUsername) + '/follows/channels?limit=' +
                    SceneSceneBrowser.ItemsLimit + '&offset=' + SceneSceneBrowser.returntoFollowerListOffsset + '&sortby=created_at';
            } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
                theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(SceneSceneBrowser.followerChannels) + '&limit=' +
                    SceneSceneBrowser.ItemsLimit + '&stream_type=all';
            } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {
                theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(SceneSceneBrowser.followerUsername) + '/follows/games/live?limit=' +
                    SceneSceneBrowser.ItemsLimit + '&offset=' + offset;
            } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
                theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(SceneSceneBrowser.followerUsername) + '/followed/hosting?limit=' +
                    SceneSceneBrowser.ItemsLimit + '&offset=' + offset;
            } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_VOD_VIDEOS) {
                theUrl = 'https://api.twitch.tv/kraken/channels/' + encodeURIComponent(SceneSceneBrowser.selectedChannel) + '/videos?limit=' + SceneSceneBrowser.ItemsLimit + '&broadcast_type=' + (SceneSceneBrowser.highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + offset;
            }
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_OPEN) {
            theUrl = 'https://api.twitch.tv/kraken/streams/' + encodeURIComponent(SceneSceneBrowser.selectedChannel);
        } else {
            theUrl = 'https://api.twitch.tv/kraken/streams?limit=' + SceneSceneBrowser.ItemsLimit + '&offset=' + offset;
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
                        SceneSceneBrowser.loadingDataTry = 1;
                        if (loadingReplace) SceneSceneBrowser.loadDataSuccessReplace(xmlHttp.responseText);
                        else if (SceneSceneBrowser.DogetAllUserFallowing) SceneSceneBrowser.getAllUserFallowingInline(xmlHttp.responseText);
                        else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.isPreUser)
                            SceneSceneBrowser.loadDataSuccessPreUser(xmlHttp.responseText);
                        else SceneSceneBrowser.loadDataSuccess(xmlHttp.responseText);
                        return;
                    } catch (err) {
                        //console.log("loadDataSuccess() exception: " + err.name + ' ' + err.message);
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
    if (mode != SceneSceneBrowser.mode || SceneSceneBrowser.returnToFallower) {
        SceneSceneBrowser.modeReturn = SceneSceneBrowser.mode;
        SceneSceneBrowser.mode = mode;
        SceneSceneBrowser.returnToFallower = false;
        SceneSceneBrowser.LoadFallowingOnly = false;

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
        } else if (mode == SceneSceneBrowser.MODE_OPEN) {
            $("#tip_icon_open").addClass('tip_icon_active');
            SceneSceneBrowser.clean();
            SceneSceneBrowser.showInput();
            SceneSceneBrowser.refreshInputFocus();
        } else if (mode == SceneSceneBrowser.MODE_USERS) {
            //console.log("Enter MODE_USERS")
            $("#tip_icon_user").addClass('tip_icon_active');
            SceneSceneBrowser.clean();
            SceneSceneBrowser.showInputTools();
            SceneSceneBrowser.refreshInputFocusTools();
        } else if (mode == SceneSceneBrowser.MODE_FOLLOWER) {
            SceneSceneBrowser.Followercount = 0;
            if (SceneSceneBrowser.followerUsernameArray.length > 0)
                SceneSceneBrowser.followerUsername = SceneSceneBrowser.followerUsernameArray[SceneSceneBrowser.Followercount];
            else SceneSceneBrowser.followerUsername = null;
            if (SceneSceneBrowser.followerUsername != null && !SceneSceneBrowser.isShowDialogOn) {
                $("#tip_icon_user").addClass('tip_icon_active');
                Scenemode = STR_USER + 's';
                SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_NONE;
                SceneSceneBrowser.isPreUser = true;
                SceneSceneBrowser.refresh();
            } else {
                SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_USERS);
            }

        }
    }
};

SceneSceneBrowser.clean = function() {
    $('#stream_table').empty();
    SceneSceneBrowser.itemsCount = 0;
    SceneSceneBrowser.rowsCountFollower = 0;
    SceneSceneBrowser.cursorX = 0;
    SceneSceneBrowser.cursorY = 0;
    SceneSceneBrowser.dataEnded = false;
};

SceneSceneBrowser.refresh = function() {
    if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER &&
        SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
        SceneSceneBrowser.getAllUserPreFallowingLive(false);
        return;
    } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER &&
        SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_VOD) {
        SceneSceneBrowser.LoadFallowingOnly = true;
        SceneSceneBrowser.getAllUserPreFallowingLive(false);
        return;
    } else if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_OPEN) {
        if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.isPreUser) {
            SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST;
        }
        SceneSceneBrowser.clean();
        loadingReplace = false;
        blankCellCount = 0;
        nameMatrix = [];
        nameMatrixCount = 0;
        loadingMore = false;
        SceneSceneBrowser.followerChannelsTemp = '';
        SceneSceneBrowser.returntoFollowerList = false;
        SceneSceneBrowser.loadData();
    }
};

SceneSceneBrowser.removeFocus = function() {
    $('#thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).removeClass('stream_thumbnail_focused');
    $('#thumbnail_div_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).removeClass('stream_text_focused');
    $('#display_name_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).removeClass('stream_channel_focused');
    $('#stream_title_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).removeClass('stream_info_focused');
    $('#stream_game_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).removeClass('stream_info_focused');
    $('#viwers_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).removeClass('stream_info_focused');
    $('#quality_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).removeClass('stream_info_focused');
};

SceneSceneBrowser.addFocus = function() {
    if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_VOD) {
        SceneSceneBrowser.ColoumnsCount = SceneSceneBrowser.ColoumnsCountVod * 2;
        SceneSceneBrowser.ItemsReloadLimit = SceneSceneBrowser.ItemsReloadLimitVod / 2;
    } else {
        SceneSceneBrowser.ColoumnsCount = SceneSceneBrowser.ColoumnsCountVod;
        SceneSceneBrowser.ItemsReloadLimit = SceneSceneBrowser.ItemsReloadLimitVod * 2;
    }

    if (((SceneSceneBrowser.cursorY + SceneSceneBrowser.ItemsReloadLimit) > (SceneSceneBrowser.itemsCount / SceneSceneBrowser.ColoumnsCount)) &&
        !SceneSceneBrowser.dataEnded) {
        if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_VOD) {
            loadingMore = true;
            SceneSceneBrowser.loadDataSuccess(null);
        } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST) {
            SceneSceneBrowser.generateUserLive();
        } else if (SceneSceneBrowser.state_follower !== SceneSceneBrowser.STATE_FOLLOWER_NONE) {
            loadingMore = true;
            SceneSceneBrowser.loadData();
        }
    }

    $('#thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).addClass('stream_thumbnail_focused');
    $('#thumbnail_div_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).addClass('stream_text_focused');
    $('#display_name_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).addClass('stream_channel_focused');
    $('#stream_title_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).addClass('stream_info_focused');
    $('#stream_game_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).addClass('stream_info_focused');
    $('#viwers_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).addClass('stream_info_focused');
    $('#quality_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).addClass('stream_info_focused');
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

    $("#scene2").show();
    SceneSceneChannel.hidePanel();
    SceneSceneChannel.hideChat();
    window.setTimeout(function() {
        $("#scene1").hide();
        $("#scene2").focus();
        SceneSceneChannel.prototype.handleFocus();
    }, 15);
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

SceneSceneBrowser.RestoreUsers = function() {
    SceneSceneBrowser.followerUsernameArray = [];
    SceneSceneBrowser.followerUsernameArraySize = parseInt(localStorage.getItem('followerUsernameArraySize')) || 0;
    if (SceneSceneBrowser.followerUsernameArraySize > 0) {
        for (var x = 0; x < SceneSceneBrowser.followerUsernameArraySize; x++) {
            SceneSceneBrowser.followerUsernameArray[x] = localStorage.getItem('followerUsernameArray' + x);
        }
    } else {
        //SceneSceneBrowser.followerUsernameArray[0] = 'fglfgl27'; // hardcoded user
        //SceneSceneBrowser.followerUsernameArraySize++;
    }
};

SceneSceneBrowser.removeUser = function(Position) {
    if (SceneSceneBrowser.cursorY == 0) LastUpdate = 0;
    SceneSceneBrowser.followerUsernameArraySize--;
    localStorage.setItem('followerUsernameArraySize', SceneSceneBrowser.followerUsernameArraySize);

    var index = SceneSceneBrowser.followerUsernameArray.indexOf(SceneSceneBrowser.followerUsernameArray[Position]);
    if (index > -1) {
        SceneSceneBrowser.followerUsernameArray.splice(index, 1);
    }

    for (var x = 0; x < SceneSceneBrowser.followerUsernameArray.length; x++) {
        localStorage.setItem('followerUsernameArray' + x, SceneSceneBrowser.followerUsernameArray[x]);
    }
    if (SceneSceneBrowser.followerUsernameArray.length > 0) {
        SceneSceneBrowser.followerUsername = SceneSceneBrowser.followerUsernameArray[0];
        SceneSceneBrowser.refresh();
    } else SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_USERS);
};

SceneSceneBrowser.SaveNewUser = function() {
    if (!SceneSceneBrowser.UserExist(SceneSceneBrowser.followerUsername)) {
        SceneSceneBrowser.followerUsernameArray[SceneSceneBrowser.followerUsernameArraySize] = SceneSceneBrowser.followerUsername;
        localStorage.setItem('followerUsernameArray' + SceneSceneBrowser.followerUsernameArraySize, SceneSceneBrowser.followerUsername);

        SceneSceneBrowser.followerUsernameArraySize++;
        localStorage.setItem('followerUsernameArraySize', SceneSceneBrowser.followerUsernameArraySize);
        SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_FOLLOWER);
    } else {
        SceneSceneBrowser.showDialog("User " + SceneSceneBrowser.followerUsername + " Already set");
        window.setTimeout(function() {
            SceneSceneBrowser.showTable();
            SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_FOLLOWER);
        }, 2000);

    }
};

SceneSceneBrowser.UserMakeOne = function(Position) {
    SceneSceneBrowser.followerUsername = SceneSceneBrowser.followerUsernameArray[0];
    SceneSceneBrowser.followerUsernameArray[0] = SceneSceneBrowser.followerUsernameArray[Position];
    SceneSceneBrowser.followerUsernameArray[Position] = SceneSceneBrowser.followerUsername;
    LastUpdate = 0;
    SceneSceneBrowser.followerUsername = SceneSceneBrowser.followerUsernameArray[0];
    SceneSceneBrowser.refresh();
};

SceneSceneBrowser.UserExist = function(user) {
    return SceneSceneBrowser.followerUsernameArray.indexOf(user) != -1
};

document.addEventListener("DOMContentLoaded", function() { //window.load
    // this function will be called only once
    window.addEventListener('appcontrol', SmartHubEventListener);
    SceneSceneBrowser.initLanguage();
    $("#scene2").hide();
    SceneSceneBrowser.loadingData = false;
    SceneSceneBrowser.refreshClick = false;
    SceneSceneBrowser.RestoreUsers();
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
        SceneSceneBrowser.SmartHubResume = true;
        appControlData = requestedAppControl.appControl.data;
        for (var i = 0; i < appControlData.length; i++) {
            if (appControlData[i].key == 'PAYLOAD') {
                actionData = JSON.parse(appControlData[i].value[0]).values;
                if (JSON.parse(actionData).videoIdx) {
                    videoIdx = JSON.parse(actionData).videoIdx;
                    videoTitleIdx = JSON.parse(actionData).videoTitleIdx;
                    if (SceneSceneChannel.Play && SceneSceneBrowser.selectedChannel == videoIdx) {
                        SceneSceneBrowser.SmartHubResume = SceneSceneBrowser.SmartHubResume;
                        return;
                    }
                    SceneSceneBrowser.selectedChannel = videoIdx;
                    SceneSceneBrowser.selectedChannelDisplayname = videoTitleIdx;
                    SceneSceneChannel.RestoreFromResume = false;
                    SceneSceneChannel.Vod = false;
                    SceneSceneBrowser.SmartHubResumePlay = true;
                    SceneSceneBrowser.openStream();
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
    if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_OPEN) SceneSceneBrowser.refresh();
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
                    SceneSceneBrowser.mode = SceneSceneBrowser.MODE_FOLLOWER;
                    SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO;
                    Scenemode = STR_USER + ' ' + SceneSceneBrowser.followerUsername + ' LIVE GAMES';
                    SceneSceneBrowser.isPreUser = false;
                    SceneSceneBrowser.returnToFallower = true;
                    SceneSceneBrowser.refresh();
                }
            } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_ALL) {
                if (SceneSceneBrowser.isShowExitDialogOn) {
                    window.clearTimeout(exitID);
                    try {
                        tizen.application.getCurrentApplication().exit();
                    } catch (e) {}
                }
                SceneSceneBrowser.showExitDialog();
            } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_OPEN) {
                if (SceneSceneBrowser.isShowDialogOn) {
                    SceneSceneBrowser.clean();
                    SceneSceneBrowser.showInput();
                    SceneSceneBrowser.refreshInputFocus();
                } else {
                    SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_ALL);
                }
            } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER) {
                if (SceneSceneBrowser.returnToFallower) {
                    SceneSceneBrowser.LoadFallowingOnly = false;
                    SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_FOLLOWER);
                } else if (SceneSceneBrowser.returnToVods) {
                    loadingMore = false;
                    Scenemode = STR_USER + ' ' + SceneSceneBrowser.followerUsername + ' PAST VOD';
                    SceneSceneBrowser.LoadFallowingOnly = true;
                    SceneSceneBrowser.returnToFallower = true;
                    SceneSceneBrowser.returnToVods = false;
                    SceneSceneBrowser.getAllUserPreFallowingLive(false)
                } else if (SceneSceneBrowser.isShowDialogOn && SceneSceneBrowser.modeReturn === SceneSceneBrowser.MODE_USERS) {
                    SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_USERS);
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
            if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_OPEN && SceneSceneBrowser.mode != SceneSceneBrowser.MODE_USERS) {
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
            if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_OPEN && SceneSceneBrowser.mode != SceneSceneBrowser.MODE_USERS) {
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
            if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_OPEN && SceneSceneBrowser.mode != SceneSceneBrowser.MODE_USERS) {
                for (i = 0; i < SceneSceneBrowser.ColoumnsCount; i++) {
                    if (ThumbNull((SceneSceneBrowser.cursorY - 1), (SceneSceneBrowser.cursorX - i))) {
                        SceneSceneBrowser.removeFocus();
                        SceneSceneBrowser.cursorY--;
                        SceneSceneBrowser.cursorX = SceneSceneBrowser.cursorX - i;
                        SceneSceneBrowser.addFocus();
                        break;
                    }
                }
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_OPEN) {
                //console.log("keyup SceneSceneBrowser.MODE_OPEN");
                SceneSceneBrowser.cursorY = 0;
                SceneSceneBrowser.refreshInputFocus();
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_USERS) {
                //console.log("key UP on TOOLS");
                SceneSceneBrowser.cursorY = 0;
                SceneSceneBrowser.refreshInputFocusTools();
            }
            break;
        case TvKeyCode.KEY_DOWN:
            if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_OPEN && SceneSceneBrowser.mode != SceneSceneBrowser.MODE_USERS) {
                for (i = 0; i < SceneSceneBrowser.ColoumnsCount; i++) {
                    if (ThumbNull((SceneSceneBrowser.cursorY + 1), (SceneSceneBrowser.cursorX - i))) {
                        SceneSceneBrowser.removeFocus();
                        SceneSceneBrowser.cursorY++;
                        SceneSceneBrowser.cursorX = SceneSceneBrowser.cursorX - i;
                        SceneSceneBrowser.addFocus();
                        break;
                    }
                }
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_OPEN) {
                SceneSceneBrowser.cursorY = 1;
                SceneSceneBrowser.refreshInputFocus();
                SceneSceneBrowser.ime.blur();
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_USERS) {
                SceneSceneBrowser.cursorY = 1;
                SceneSceneBrowser.refreshInputFocusTools();
                SceneSceneBrowser.ime2.blur();
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_USERS && SceneSceneBrowser.mode != SceneSceneBrowser.MODE_OPEN) {
                SceneSceneBrowser.refreshClick = true;
            if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_VOD_VIDEOS) SceneSceneBrowser.highlight = !SceneSceneBrowser.highlight;
                SceneSceneBrowser.refresh();
            }
            break;
        case TvKeyCode.KEY_CHANNELUP:
            if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER) {
                if (SceneSceneBrowser.state_follower == SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
                    loadingMore = false;
                    SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST;
                    Scenemode = STR_USER + ' ' + SceneSceneBrowser.followerUsername + ' LIVE HOSTS';
                    SceneSceneBrowser.returnToFallower = true;
                    SceneSceneBrowser.refresh();
                } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
                    loadingMore = false;
                    SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO;
                    Scenemode = STR_USER + ' ' + SceneSceneBrowser.followerUsername + ' LIVE GAMES';
                    SceneSceneBrowser.returnToFallower = true;
                    SceneSceneBrowser.refresh();
                } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {
                    loadingMore = false;
                    Scenemode = STR_USER + ' ' + SceneSceneBrowser.followerUsername + ' PAST VOD';
                    SceneSceneBrowser.LoadFallowingOnly = true;
                    SceneSceneBrowser.returnToFallower = true;
                    SceneSceneBrowser.getAllUserPreFallowingLive(false)
                } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_VOD) {
                    loadingMore = false;
                    SceneSceneBrowser.LoadFallowingOnly = false;
                    SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO;
                    Scenemode = STR_USER + ' ' + SceneSceneBrowser.followerUsername + ' LIVE CHANNELS';
                    SceneSceneBrowser.returnToFallower = true;
                    SceneSceneBrowser.refresh();
                }
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GAMES_STREAMS || SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GAMES ||
                SceneSceneBrowser.mode == SceneSceneBrowser.MODE_OPEN) {
                SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_ALL);
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER || SceneSceneBrowser.mode == SceneSceneBrowser.MODE_USERS) {
                SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_GAMES);
            } else {
                SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_FOLLOWER);
            }
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER) {
                if (SceneSceneBrowser.state_follower == SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
                    loadingMore = false;
                    Scenemode = STR_USER + ' ' + SceneSceneBrowser.followerUsername + ' PAST VOD';
                    SceneSceneBrowser.LoadFallowingOnly = true;
                    SceneSceneBrowser.returnToFallower = true;
                    SceneSceneBrowser.getAllUserPreFallowingLive(false)
                } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
                    loadingMore = false;
                    SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO;
                    Scenemode = STR_USER + ' ' + SceneSceneBrowser.followerUsername + ' LIVE CHANNELS';
                    SceneSceneBrowser.returnToFallower = true;
                    SceneSceneBrowser.refresh();
                } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {
                    loadingMore = false;
                    SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST;
                    Scenemode = STR_USER + ' ' + SceneSceneBrowser.followerUsername + ' LIVE HOSTS';
                    SceneSceneBrowser.returnToFallower = true;
                    SceneSceneBrowser.refresh();
                } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_VOD) {
                    loadingMore = false;
                    SceneSceneBrowser.LoadFallowingOnly = false;
                    SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO;
                    Scenemode = STR_USER + ' ' + SceneSceneBrowser.followerUsername + ' LIVE GAMES';
                    SceneSceneBrowser.returnToFallower = true;
                    SceneSceneBrowser.refresh();
                }
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GAMES_STREAMS || SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GAMES) {
                SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_FOLLOWER);
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER || SceneSceneBrowser.mode == SceneSceneBrowser.MODE_USERS) {
                SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_ALL);
            } else {
                SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_GAMES);
            }
            break;
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER) {
                if (SceneSceneBrowser.state_follower == SceneSceneBrowser.STATE_FOLLOWER_NONE) {
                    SceneSceneBrowser.followerUsername = SceneSceneBrowser.followerUsernameArray[SceneSceneBrowser.cursorY];
                    if (SceneSceneBrowser.cursorX == 0) { // live
                        loadingMore = false;
                        SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO;
                        Scenemode = STR_USER + ' ' + SceneSceneBrowser.followerUsername + ' LIVE CHANNELS';
                        SceneSceneBrowser.refresh();
                    } else if (SceneSceneBrowser.cursorX == 1) { // host
                        SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST;
                        Scenemode = STR_USER + ' ' + SceneSceneBrowser.followerUsername + ' LIVE HOSTS';
                        SceneSceneBrowser.isPreUser = false;
                        SceneSceneBrowser.returnToFallower = true;
                        SceneSceneBrowser.refresh();
                    } else if (SceneSceneBrowser.cursorX == 2) { // games
                        SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO;
                        Scenemode = STR_USER + ' ' + SceneSceneBrowser.followerUsername + ' LIVE GAMES';
                        SceneSceneBrowser.isPreUser = false;
                        SceneSceneBrowser.returnToFallower = true;
                        SceneSceneBrowser.refresh();
                    } else if (SceneSceneBrowser.cursorX == 3) { // vod
                        Scenemode = STR_USER + ' ' + SceneSceneBrowser.followerUsername + ' PAST VOD';
                        SceneSceneBrowser.LoadFallowingOnly = true;
                        SceneSceneBrowser.returnToFallower = true;
                        SceneSceneBrowser.getAllUserPreFallowingLive(false);
                    } else if (SceneSceneBrowser.cursorX == 4 && SceneSceneBrowser.cursorY == 0) { // add
                        SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_USERS);
                    } else if (SceneSceneBrowser.cursorX == 4 && SceneSceneBrowser.cursorY > 0) { // up
                        SceneSceneBrowser.UserMakeOne(SceneSceneBrowser.cursorY);
                    } else if (SceneSceneBrowser.cursorX == 5) { // remove
                        SceneSceneBrowser.removeUser(SceneSceneBrowser.cursorY);
                    }
                } else if (SceneSceneBrowser.state_follower == SceneSceneBrowser.STATE_FOLLOWER_VOD) {
                    SceneSceneBrowser.selectedChannel = $('#cell_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).attr('data-channelname');
                    SceneSceneBrowser.selectedChannelDisplayname = document.getElementById('display_name_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).textContent;
                    SceneSceneBrowser.selectedChannelChannelLogo = document.getElementById('thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).src;
                    SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_VOD_VIDEOS;
                    SceneSceneBrowser.returnToVods = true;
                    SceneSceneBrowser.returnToFallower = false;
                    SceneSceneBrowser.refresh();
                } else if (SceneSceneBrowser.state_follower == SceneSceneBrowser.STATE_FOLLOWER_VOD_VIDEOS) {
                    SceneSceneBrowser.selectedChannelDisplaynameOld = SceneSceneBrowser.selectedChannelDisplayname;
                    SceneSceneBrowser.selectedChannel = $('#cell_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).attr('data-channelname').substr(1);
                    SceneSceneBrowser.selectedChannelDisplayname = document.getElementById('display_name_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).textContent;
                    SceneSceneChannel.Vod = true;
                    SceneSceneChannel.QualitChage = false;
                    SceneSceneChannel.RestoreFromResume = false;
                    if (SceneSceneBrowser.selectedChannel != '')
                        SceneSceneBrowser.openStream();
                } else if (SceneSceneBrowser.state_follower == SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO ||
                    SceneSceneBrowser.state_follower == SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
                    SceneSceneBrowser.selectedChannel = $('#cell_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).attr('data-channelname');
                    SceneSceneBrowser.selectedChannelDisplayname = document.getElementById('display_name_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).textContent;
                    SceneSceneChannel.RestoreFromResume = false;
                    SceneSceneBrowser.openStream();
                } else {
                    SceneSceneBrowser.gameSelected = $('#cell_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).attr('data-channelname');
                    SceneSceneBrowser.mode = SceneSceneBrowser.MODE_GAMES_STREAMS;
                    SceneSceneBrowser.returnToGames = false;
                    Scenemode = SceneSceneBrowser.gameSelected;
                    SceneSceneBrowser.refresh();
                }
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_OPEN) { //open a channel
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
                    if ($('#streamname_input').val() != '' && $('#streamname_input').val() != null) {
                        SceneSceneBrowser.selectedChannel = $('#streamname_input').val();
                        document.getElementById("streamname_input").value = '';
                        SceneSceneBrowser.selectedChannelDisplayname = SceneSceneBrowser.selectedChannel;
                        SceneSceneBrowser.loadData();
                    }
                }
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_USERS) { //open a user
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
                    if ($('#username_input').val() != '' && $('#username_input').val() != null) {
                        SceneSceneBrowser.followerUsername = $('#username_input').val();
                        document.getElementById("username_input").value = '';
                        SceneSceneBrowser.SaveNewUser();
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
                SceneSceneChannel.RestoreFromResume = false;
                SceneSceneBrowser.openStream();
            }
            SceneSceneBrowser.SmartHubResumePlay = false;
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
            SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_FOLLOWER);
            break;
        case TvKeyCode.KEY_YELLOW:
            SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_GAMES);
            break;
        case TvKeyCode.KEY_BLUE:
            SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_OPEN);
            break;
            //case TvKeyCode.KEY_TOOLS:
            //    SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_USERS);
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
            window.clearTimeout(networkID);
            SceneSceneBrowser.noNetwork = false;
            if (SceneSceneBrowser.browser) {
                if (SceneSceneBrowser.errorNetwork) {
                    SceneSceneBrowser.errorNetwork = false;
                    SceneSceneBrowser.openStream();
                }
            } else {
                SceneSceneChannel.showPlayer();
            }
        } else if (data == 2 || 5) {
            //console.log("[NetworkStateChangedCallback] network cable disconnected data= " + data);
            if (SceneSceneBrowser.browser) {
                SceneSceneBrowser.noNetwork = true;
                networkID = window.setTimeout(function() {
                    SceneSceneBrowser.showDialog(STR_ERROR_NETWORK_DISCONNECT);
                }, 10000);
            } else {
                networkID = window.setTimeout(function() {
                    SceneSceneBrowser.showDialog(STR_ERROR_NETWORK_DISCONNECT);
                }, 10000);
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

SceneSceneBrowser.loadDataSuccessPreUser = function(responseText) {
    var response = $.parseJSON(responseText);
    var cell, total;
    if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER) {
        if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST) {
            total = parseInt(response._total);
            total = (response._total < 98) ? response._total : '99+';
            if (SceneSceneBrowser.Followercount == 0) {
                var tbody = $('<tbody></tbody>');
                $('#stream_table').append(tbody);
                var header = $('<tr class="follower_header"></tr>').html('<div class="follower_header">#1 - ' + SceneSceneBrowser.followerUsername +
                    ' Fallowing ' + total + ' Channels (#1 Has it\'s content on SmartHub Preview)</div>');
            } else {
                var header = $('<tr class="follower_header"></tr>').html('<div class="follower_header"> ' + SceneSceneBrowser.followerUsername +
                    ' Fallowing ' + total + ' Channels</div>');
            }
            $('#stream_table').find('tbody').append(header);
            row = $('<tr></tr>');
            cell = SceneSceneBrowser.createUserCell(SceneSceneBrowser.Followercount, 0, SceneSceneBrowser.followerUsername, 'LIVE CHANNELS');
            row.append(cell);
            cell = SceneSceneBrowser.createUserCell(SceneSceneBrowser.Followercount, 1, SceneSceneBrowser.followerUsername, 'LIVE HOSTS');
            row.append(cell);
            cell = SceneSceneBrowser.createUserCell(SceneSceneBrowser.Followercount, 2, SceneSceneBrowser.followerUsername, 'LIVE GAMES');
            row.append(cell);
            cell = SceneSceneBrowser.createUserCell(SceneSceneBrowser.Followercount, 3, SceneSceneBrowser.followerUsername, 'PAST VOD');
            row.append(cell);
            if (SceneSceneBrowser.Followercount == 0)
                cell = SceneSceneBrowser.createUserCell(SceneSceneBrowser.Followercount, 4, SceneSceneBrowser.followerUsername, 'ADD USER');
            else
                cell = SceneSceneBrowser.createUserCell(SceneSceneBrowser.Followercount, 4, SceneSceneBrowser.followerUsername, 'MAKE 1#');
            row.append(cell);
            cell = SceneSceneBrowser.createUserCell(SceneSceneBrowser.Followercount, 5, SceneSceneBrowser.followerUsername, 'REMOVE USER');
            row.append(cell);
            $('#stream_table').append(row);

            SceneSceneBrowser.mode = SceneSceneBrowser.MODE_FOLLOWER;
            SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST;

            SceneSceneBrowser.Followercount++;
            if (SceneSceneBrowser.Followercount < SceneSceneBrowser.followerUsernameArray.length) {
                SceneSceneBrowser.followerUsername = SceneSceneBrowser.followerUsernameArray[SceneSceneBrowser.Followercount];
                SceneSceneBrowser.loadingDataTry = 1;
                SceneSceneBrowser.loadingDataTimeout = 1500;
                if (!SceneSceneBrowser.loadingDataTimeoutStart)
                    SceneSceneBrowser.loadingDataTimeout += 3500;
                SceneSceneBrowser.loadDataRequest();
            } else {
                SceneSceneBrowser.Followercount = 0;
                SceneSceneBrowser.followerUsername = SceneSceneBrowser.followerUsernameArray[SceneSceneBrowser.Followercount];
                SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_NONE;
                SceneSceneBrowser.loadDataSuccessFinishPreUser();
            }
        }
    }

};

SceneSceneBrowser.createUserCell = function(row_id, coloumn_id, user_name, stream_type) {
    var thumbnail = 'images/blur_video_1.png';
    if (coloumn_id == 1) thumbnail = 'images/blur_video_2.png';
    else if (coloumn_id == 2) thumbnail = 'images/blur_game.png';
    else if (coloumn_id == 3) thumbnail = 'images/blur_vod.png';
    else if (coloumn_id == 4) thumbnail = (SceneSceneBrowser.Followercount == 0) ? 'images/user_plus.png' : 'images/user_up.png';
    else if (coloumn_id == 5) thumbnail = 'images/user_minus.png';

    return $('<td id="cell_' + row_id + '_' + coloumn_id + '" class="stream_cell_small" data-channelname="' + user_name + '"></td>').html(
        '<img id="thumbnail_' + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + thumbnail + '"/> \
            <div id="thumbnail_div_' + row_id + '_' + coloumn_id + '" class="stream_text"> \
            <div id="display_name_' + row_id + '_' + coloumn_id + '" class="stream_channel">' + stream_type + '</div> \
            <div id="stream_title_' + row_id + '_' + coloumn_id + '"class="stream_info"></div> \
            <div id="stream_game_' + row_id + '_' + coloumn_id + '"class="stream_info"></div> \
            <div id="viwers_' + row_id + '_' + coloumn_id + '"class="stream_info" ></div> \
            <div id="quality_' + row_id + '_' + coloumn_id + '"class="stream_info"></div> \
            </div>');
};

SceneSceneBrowser.getAllUserFallowingInline = function(responseText) {
    SceneSceneBrowser.mode = SceneSceneBrowser.MODE_FOLLOWER;
    SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST;
    if (responseText != null) {
        var response = $.parseJSON(responseText);

        var response_items = response.follows.length;
        var temp = SceneSceneBrowser.UserFallowingName.length;

        for (var x = temp; x < (temp + response_items); x++) {
            SceneSceneBrowser.UserFallowingName[x] = response.follows[x - temp].channel.name + ',' +
                response.follows[x - temp].channel.display_name + ',' + response.follows[x - temp].channel.logo;
        }
        if (response_items > 0) { // response_items here is not always 99 so check until it is 0
            SceneSceneBrowser.returntoFollowerListOffsset += SceneSceneBrowser.ItemsLimit;
            SceneSceneBrowser.loadDataRequest();
        } else { // end
            SceneSceneBrowser.DogetAllUserFallowing = false;
            if (SceneSceneBrowser.LoadFallowingOnly) {
                SceneSceneBrowser.UserFallowingName.sort();
                SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_VOD;
                SceneSceneBrowser.loadDataSuccess(null);
                return;
            } else SceneSceneBrowser.getAllUserPreFallowingLive(true);
        }
    } else { // start
        SceneSceneBrowser.DogetAllUserFallowing = true;
        SceneSceneBrowser.returntoFollowerListOffsset = 0;
        SceneSceneBrowser.UserFallowingName = [];
        SceneSceneBrowser.loadDataRequest();
    }
};

SceneSceneBrowser.generateUserLive = function() {
    if (!loadingMore) {
        SceneSceneBrowser.generateUserLiveCount = 0;
        var total = SceneSceneBrowser.UserFallowingLive.length;
        var times = Math.ceil(total / SceneSceneBrowser.ItemsLimit);
        SceneSceneBrowser.followerChannels = '';

        for (var y = 0; y < SceneSceneBrowser.ItemsLimit; y++) {
            if (((SceneSceneBrowser.generateUserLiveCount * (SceneSceneBrowser.ItemsLimit)) + y) < SceneSceneBrowser.UserFallowingLive.length) {
                SceneSceneBrowser.followerChannels += SceneSceneBrowser.UserFallowingLive[(SceneSceneBrowser.generateUserLiveCount * SceneSceneBrowser.ItemsLimit) + y] + ',';
            }
        }
        SceneSceneBrowser.mode = SceneSceneBrowser.MODE_FOLLOWER;
        SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO;
        SceneSceneBrowser.loadDataRequest();
    } else {
        SceneSceneBrowser.generateUserLiveCount++;
        for (var y = 0; y < SceneSceneBrowser.ItemsLimit; y++) {
            if (((SceneSceneBrowser.generateUserLiveCount * (SceneSceneBrowser.ItemsLimit)) + y) < SceneSceneBrowser.UserFallowingLive.length) {
                SceneSceneBrowser.followerChannels += SceneSceneBrowser.UserFallowingLive[(SceneSceneBrowser.generateUserLiveCount * SceneSceneBrowser.ItemsLimit) + y] + ',';
            }
        }
        SceneSceneBrowser.mode = SceneSceneBrowser.MODE_FOLLOWER;
        SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO;
        SceneSceneBrowser.loadDataRequest();
    }
};

SceneSceneBrowser.getAllUserPreFallowingLive = function(response) {
    if (!response) {
        SceneSceneBrowser.getAllUserPreFallowingLiveCount = 0;
        SceneSceneBrowser.UserFallowingLive = [];
        SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST;
        SceneSceneBrowser.isPreUser = false;
        SceneSceneBrowser.returnToFallower = true;
        SceneSceneBrowser.clean();
        loadingReplace = false;
        blankCellCount = 0;
        nameMatrix = [];
        nameMatrixCount = 0;
        SceneSceneBrowser.followerChannelsTemp = '';
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

        if (!loadingMore && SceneSceneBrowser.mode !== SceneSceneBrowser.MODE_OPEN) {
            var dialog_title = (SceneSceneBrowser.refreshClick ? STR_REFRESH : STR_RETRYING) + " " +
                Scenemode + " (" + SceneSceneBrowser.loadingDataTry + STR_ATTEMPT + ")";
            SceneSceneBrowser.showDialog(dialog_title);
        }
        SceneSceneBrowser.getAllUserFallowingInline(null);
    } else {
        var total = SceneSceneBrowser.UserFallowingName.length;
        var times = Math.ceil(total / SceneSceneBrowser.ItemsLimit);

        SceneSceneBrowser.returntoFollowerListOffsset = 0;
        if (SceneSceneBrowser.getAllUserPreFallowingLiveCount < times) {
            SceneSceneBrowser.followerChannels = '';
            var values_splited;
            for (var y = 0; y < SceneSceneBrowser.ItemsLimit; y++) {
                if (((SceneSceneBrowser.getAllUserPreFallowingLiveCount * (SceneSceneBrowser.ItemsLimit)) + y) < SceneSceneBrowser.UserFallowingName.length) {
                    values_splited = SceneSceneBrowser.UserFallowingName[(SceneSceneBrowser.getAllUserPreFallowingLiveCount * SceneSceneBrowser.ItemsLimit) + y].split(",");
                    SceneSceneBrowser.followerChannels += values_splited[0] + ',';
                } else {
                    break;
                }
            }
            SceneSceneBrowser.mode = SceneSceneBrowser.MODE_FOLLOWER;
            SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO;
            SceneSceneBrowser.loadDataRequestUser();
        } else {
            SceneSceneBrowser.getAllUserPreFallowingLiveCount = 0;
            SceneSceneBrowser.generateUserLive();
        }
    }
};

SceneSceneBrowser.loadDataRequestUser = function() {
    try {
        var xmlHttp = new XMLHttpRequest();
        var theUrl;

        theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(SceneSceneBrowser.followerChannels) + '&limit=' +
            SceneSceneBrowser.ItemsLimit + '&stream_type=all';

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
                        SceneSceneBrowser.getAllUserFallowingLive(xmlHttp.responseText);
                        return;
                    } catch (err) {
                        //console.log("loadDataSuccess() exception: " + err.name + ' ' + err.message);
                    }

                } else {
                    SceneSceneBrowser.loadDataError("HTTP Status " + xmlHttp.status + " Message: " + xmlHttp.statusText, xmlHttp.responseText);
                }
            }
        };
        xmlHttp.send(null);
    } catch (error) {
        SceneSceneBrowser.loadDataErrorUser(error.message, null);
    }

};

SceneSceneBrowser.loadDataErrorUser = function(reason, responseText) {
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
        SceneSceneBrowser.loadDataRequestUser();
    } else {
        reason = (typeof reason === "undefined") ? "Unknown" : reason;
        SceneSceneBrowser.loadingData = false;
        SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_FOLLOWER);
    }
};

SceneSceneBrowser.getAllUserFallowingLive = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items = response.streams.length;
    var temp = SceneSceneBrowser.UserFallowingLive.length;

    for (var x = temp; x < (temp + response_items); x++) {
        SceneSceneBrowser.UserFallowingLive[x] = response.streams[x - temp].channel.name;
    }

    SceneSceneBrowser.getAllUserPreFallowingLiveCount++;
    SceneSceneBrowser.getAllUserPreFallowingLive(true)
};

SceneSceneBrowser.loadDataSuccessFinishPreUser = function() {
    $('#stream_table').imagesLoaded()
        .always({
            background: true
        }, function() { //all images successfully loaded at least one is broken not a problem as the for "imgMatrix.length" will fix it all
            SceneSceneBrowser.showTable();
            SceneSceneBrowser.addFocus();
            SceneSceneBrowser.dataEnded = true;
            SceneSceneBrowser.loadingData = false;
            SceneSceneBrowser.refreshClick = false;
            SceneSceneBrowser.SmartHubResume = false;
            SceneSceneBrowser.returnToFallower = false;
            SceneSceneBrowser.previewDataStart();
        });
};
