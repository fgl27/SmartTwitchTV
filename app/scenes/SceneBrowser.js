SceneSceneBrowser.selectedChannel;
var exitID;

SceneSceneBrowser.browser = true;
SceneSceneBrowser.noNetwork = false;
SceneSceneBrowser.errorNetwork = false;
SceneSceneBrowser.keyReturnPressed = false;

SceneSceneBrowser.isShowExitDialogOn = false;

SceneSceneBrowser.ItemsLimit = 100;
SceneSceneBrowser.ColoumnsCount = 4;

SceneSceneBrowser.MODE_NONE = -1;
SceneSceneBrowser.MODE_ALL = 0;
SceneSceneBrowser.MODE_GAMES = 1;
SceneSceneBrowser.MODE_GAMES_STREAMS = 2;
SceneSceneBrowser.MODE_GO = 3;
SceneSceneBrowser.MODE_TOOLS = 4;
SceneSceneBrowser.MODE_FOLLOWER = 5;
SceneSceneBrowser.mode = SceneSceneBrowser.MODE_NONE;
SceneSceneBrowser.modeReturn = SceneSceneBrowser.MODE_NONE;

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
SceneSceneBrowser.itemsCountFollowerChannels = 0
SceneSceneBrowser.itemsCountFollowerLiveHosts = 0
SceneSceneBrowser.itemsCountFollowerGames = 0
SceneSceneBrowser.rowsCountFollower = 0;

SceneSceneBrowser.cursorX = 0;
SceneSceneBrowser.cursorY = 0;

SceneSceneBrowser.ime = null;
SceneSceneBrowser.ime2 = null;

SceneSceneBrowser.loadingData = false;
SceneSceneBrowser.loadingDataTryMax = 12;
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
    scrollVerticalToElementById: function(id, padding) {
        var element = document.getElementById(id);
        if (element == null) {
            console.warn('Cannot find element with id \'' + id + '\'.');
            return;
        }

        var targetPosition = this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.25 * this.viewportHeight() - padding;

        $(window).scrollTop(targetPosition);
    }
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

function sleep(millis, callback) {
    setTimeout(function() {
        callback();
    }, millis);
}

SceneSceneBrowser.createCell = function(row_id, coloumn_id, data_name, thumbnail, title, info, info2, info_fill) {
    var infostyle;

    if (info_fill) {
        infostyle = 'style="right: 0;"';
    } else {
        infostyle = 'style="right: 10%;"';
    }

    return $('<td id="cell_' + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + data_name + '"></td>').html(
        '<img id="thumbnail_' + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + thumbnail + '"/> \
			<div class="stream_text" ' + infostyle + '> \
			<div class="stream_title">' + title + '</div> \
			<div class="stream_info">' + info + '</div> \
            <div class="stream_info">' + info2 + '</div> \
            </div>');
};

SceneSceneBrowser.createCellEmpty = function() {
    return $('<td class="stream_cell"></td>').html('');
};

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
                SceneSceneBrowser.showDialog(STR_USERNAME + " '" + SceneSceneBrowser.followerUsername + "' " + STR_DOES_NOT_EXIST);
            }
            //some names return requests error 422 (This is a Justin.tv channel. It cannot be viewed on Twitch.) Maybe its from old accounts. Example: https://api.twitch.tv/kraken/streams/phoxx
            else if ((response.message === "Channel '" + SceneSceneBrowser.selectedChannel + "' does not exist") || (response.message === "Channel '" + SceneSceneBrowser.selectedChannel + "' is unavailable")) {
                //console.log("response.message3=" + response.message);
                //console.log("'Channel ''+SceneSceneBrowser.followerUsername+'' does not exist");
                calling = true;
                SceneSceneBrowser.loadingData = false;
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
            if (SceneSceneBrowser.loadingDataTry < 6) {
                SceneSceneBrowser.loadingDataTimeout += 250;
            } else {
                switch (SceneSceneBrowser.loadingDataTry) {
                    case 6:
                        SceneSceneBrowser.loadingDataTimeout = 2400;
                        break;
                    case 7:
                        SceneSceneBrowser.loadingDataTimeout = 5000;
                        break;
                    case 8:
                        SceneSceneBrowser.loadingDataTimeout = 15000;
                        break;
                    case 9:
                        SceneSceneBrowser.loadingDataTimeout = 30000;
                        break;
                    case 10:
                        SceneSceneBrowser.loadingDataTimeout = 45000;
                        break;
                    default:
                        SceneSceneBrowser.loadingDataTimeout = 150000;
                        break;
                }
            }
            if (!SceneSceneBrowser.keyReturnPressed) SceneSceneBrowser.loadDataRequest();
            else SceneSceneBrowser.loadingData = false, SceneSceneBrowser.mhandleKeyReturn();
        } else {
            reason = (typeof reason === "undefined") ? "Unknown" : reason;
            SceneSceneBrowser.loadingData = false;
            SceneSceneBrowser.showDialog("Unable to load stream data after " + SceneSceneBrowser.loadingDataTry + STR_ATTEMPT + ")" + " Reason: " + reason);
        }
    }
};

SceneSceneBrowser.loadDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items;

    //Check if is follower mode and if its in first stage, where it only load a list of channels games, then loadDataRequest() to load info about this channels
    if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST) {
        response_items = response.follows.length;

        var x;
        var ar = [];
        SceneSceneBrowser.followerChannels = '';
        for (x = 0; x < response_items; x++) {
            var channel = response.follows[x];
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
            SceneSceneBrowser.showDialog(STR_CHANNEL + " '" + SceneSceneBrowser.selectedChannel + "' " + STR_IS_OFFLINE);
        } else {
            //console.log("Opening stream from loaddatasuccess GO");
            SceneSceneBrowser.openStream();
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

        var offset = SceneSceneBrowser.itemsCount;
        SceneSceneBrowser.itemsCount += response_items;
        var response_rows = response_items / SceneSceneBrowser.ColoumnsCount;
        if (response_items % SceneSceneBrowser.ColoumnsCount > 0) {
            response_rows++;
        }

        var cursor = 0;

        //Build header for Live Channels, Live Hosts, Live Games
        if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER) {

            if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
                var tbody = $('<tbody></tbody>');
                $('#stream_table').append(tbody);
                $('#stream_table').css("padding-top", "0%");
                var header = $('<tr class="follower_header"></tr>').html('<div class="follower_header"> ' + response_items + ' ' + STR_LIVE_CHANNELS +
                    SceneSceneBrowser.followerUsername + STR_CHANGE_USER + ')</div>');
            } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
                var header = $('<tr class="follower_header"></tr>').html('<div class="follower_header"> ' + response_items + ' ' + STR_LIVE_HOSTS +
                    SceneSceneBrowser.followerUsername + ')</div>');
            } else if (SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {
                var header = $('<tr class="follower_header"></tr>').html('<div class="follower_header"> ' + response_items + ' ' + STR_LIVE_GAMES +
                    SceneSceneBrowser.followerUsername + ')</div>');
            }

            $('#stream_table').find('tbody').append(header);

        }

        var t;
        for (var i = 0; i < response_rows; i++) {

            if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER) {
                var row_id = SceneSceneBrowser.rowsCountFollower + i; //SceneSceneBrowser.rowsCountFollower + i; // use SceneSceneBrowser.followerMatrix.length -1)
            } else {
                var row_id = offset / SceneSceneBrowser.ColoumnsCount + i;
            }
            var row = $('<tr></tr>');
            var matrix = [];

            for (t = 0; t < SceneSceneBrowser.ColoumnsCount && cursor < response_items; t++, cursor++) {
                var cell;

                if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GAMES) {
                    var game = response.top[cursor];

                    cell = SceneSceneBrowser.createCell(row_id, t, game.game.name, game.game.box.large, game.game.name, addCommas(game.viewers) + STR_VIEWER, '', true);
                } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {

                    var hosts = response.hosts[cursor];
                    matrix[t] = [hosts.target.channel.name, 'stream'];
                    cell = SceneSceneBrowser.createCell(row_id, t, hosts.target.channel.name, hosts.target.preview, hosts.display_name + ' Hosting ' + hosts.target.channel.display_name, hosts.target.title, addCommas(hosts.target.viewers) + STR_VIEWER, false); //hosts.target.meta_game

                } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {

                    var game = response.follows[cursor];
                    matrix[t] = [game.game.name, 'game'];
                    cell = SceneSceneBrowser.createCell(row_id, t, game.game.name, game.game.box.large, game.game.name, addCommas(game.viewers) + STR_VIEWER, '', true);

                } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {

                    var stream = response.streams[cursor];
                    matrix[t] = [stream.channel.name, 'stream'];
                    cell = SceneSceneBrowser.createCell(row_id, t, stream.channel.name, stream.preview.large, stream.channel.status, stream.channel.display_name, addCommas(stream.viewers) + STR_VIEWER, false);

                } else {
                    var stream = response.streams[cursor];
                    cell = SceneSceneBrowser.createCell(row_id, t, stream.channel.name, stream.preview.large, stream.channel.status, stream.channel.display_name, addCommas(stream.viewers) + STR_VIEWER, false);
                }

                row.append(cell);

            }

            for (; t < SceneSceneBrowser.ColoumnsCount; t++) {
                row.append(SceneSceneBrowser.createCellEmpty());
            }
            SceneSceneBrowser.followerMatrix[row_id] = matrix;
            $('#stream_table').append(row);
        }

        sleep(2000, function() {
            SceneSceneBrowser.showTable();
            SceneSceneBrowser.addFocus();
            //check state of follower load, and call next stage
            if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
                SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST;
                SceneSceneBrowser.itemsCountFollowerChannels = SceneSceneBrowser.itemsCount;
                SceneSceneBrowser.rowsCountFollower += Math.ceil(SceneSceneBrowser.itemsCount / SceneSceneBrowser.ColoumnsCount);
                SceneSceneBrowser.itemsCount = 0;
                SceneSceneBrowser.loadDataRequest();
            } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
                SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO;
                SceneSceneBrowser.itemsCountFollowerLiveHosts = SceneSceneBrowser.itemsCount;
                SceneSceneBrowser.rowsCountFollower += Math.ceil(SceneSceneBrowser.itemsCount / SceneSceneBrowser.ColoumnsCount);
                SceneSceneBrowser.itemsCount = 0;
                SceneSceneBrowser.loadDataRequest();
            } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {
                SceneSceneBrowser.state_follower = SceneSceneBrowser.STATE_FOLLOWER_NONE;
                SceneSceneBrowser.itemsCountFollowerGames = SceneSceneBrowser.itemsCount;
                SceneSceneBrowser.rowsCountFollower += Math.ceil(SceneSceneBrowser.itemsCount / SceneSceneBrowser.ColoumnsCount);
                SceneSceneBrowser.loadingData = false;
            } else {
                SceneSceneBrowser.loadingData = false;
            }
        });
    }
};

SceneSceneBrowser.loadDataRequest = function() {
    try {
        var dialog_title = "";
        if (SceneSceneBrowser.loadingDataTry > 0) {
            dialog_title = STR_RETRYING + " (" + (SceneSceneBrowser.loadingDataTry + 1) + STR_ATTEMPT + ")";
        } else dialog_title = STR_RETRYING + " (" + (1) + STR_ATTEMPT + ")";

        SceneSceneBrowser.showDialog(dialog_title);

        var xmlHttp = new XMLHttpRequest();
        var theUrl;

        var offset = SceneSceneBrowser.itemsCount;
        if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES) {
            theUrl = 'https://api.twitch.tv/kraken/games/top?limit=' + SceneSceneBrowser.ItemsLimit + '&offset=' + offset;
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES_STREAMS) {
            theUrl = 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(SceneSceneBrowser.gameSelected) + '&limit=' + SceneSceneBrowser.ItemsLimit + '&offset=' + offset;
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_NAME_LIST) {
            theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(SceneSceneBrowser.followerUsername) + '/follows/channels?limit=' + SceneSceneBrowser.ItemsLimit + '&offset=' + offset;
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_CHANNELS_INFO) {
            theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(SceneSceneBrowser.followerChannels) + '&limit=' + SceneSceneBrowser.ItemsLimit + '&offset=' + offset;
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_GAMES_INFO) {
            theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(SceneSceneBrowser.followerUsername) + '/follows/games/live?limit=' + SceneSceneBrowser.ItemsLimit; // + '&offset=' + offset; removed offset for now, need fix latter
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_FOLLOWER && SceneSceneBrowser.state_follower === SceneSceneBrowser.STATE_FOLLOWER_LIVE_HOST) {
            theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(SceneSceneBrowser.followerUsername) + '/followed/hosting?limit=' + SceneSceneBrowser.ItemsLimit; // + '&offset=' + offset; removed offset for now, need fix latter
        } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GO) {
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
                        SceneSceneBrowser.loadDataSuccess(xmlHttp.responseText);
                    } catch (err) {
                        SceneSceneBrowser.showDialog("loadDataSuccess() exception: " + err.name + ' ' + err.message);
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

    SceneSceneBrowser.loadingData = true;
    SceneSceneBrowser.keyReturnPressed = false;
    SceneSceneBrowser.loadingDataTry = 0;
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

    ScrollHelper.scrollVerticalToElementById('thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX, 0);
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
            SceneSceneBrowser.refresh();
        } else if (mode == SceneSceneBrowser.MODE_GAMES) {
            $("#tip_icon_games").addClass('tip_icon_active');
            SceneSceneBrowser.refresh();
        } else if (mode == SceneSceneBrowser.MODE_GAMES_STREAMS) {
            $("#tip_icon_games").addClass('tip_icon_active');
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

        SceneSceneBrowser.loadData();
    }
};


SceneSceneBrowser.removeFocus = function() {
    $('#thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).removeClass('stream_thumbnail_focused');
};

SceneSceneBrowser.addFocus = function() {
    if (SceneSceneBrowser.cursorY + 5 > SceneSceneBrowser.itemsCount / SceneSceneBrowser.ColoumnsCount &&
        !SceneSceneBrowser.dataEnded) {
        SceneSceneBrowser.loadData();
    }

    $('#thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).addClass('stream_thumbnail_focused');

    ScrollHelper.scrollVerticalToElementById('thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX, 0);
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

function SceneSceneBrowser() {

};

SceneSceneBrowser.initLanguage = function() {
    //set correct labels
    $('.label_icon_updown').html(STR_CH_UPDOWN);
    $('.label_updown').html(STR_UPDOWN);
    $('.label_channels').html(STR_CHANNELS);
    $('.label_user').html(STR_USER);
    $('.label_games').html(STR_GAMES);
    $('.label_open_channel').html(STR_OPEN_CHANNEL);
    $('.label_open').html(STR_OPEN);
    $('.label_placeholder_open').attr("placeholder", STR_PLACEHOLDER_OPEN);
    $('.label_placeholder_tools').attr("placeholder", STR_PLACEHOLDER_TOOLS);
};

document.addEventListener("DOMContentLoaded", function(event) { //window.load
    // this function will be called only once
    SceneSceneBrowser.initLanguage();
    $("#scene2").hide();
    SceneSceneBrowser.loadingData = false;
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

SceneSceneBrowser.prototype.handleShow = function(data) {
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
};

SceneSceneBrowser.prototype.handleBlur = function() {
    //console.log("SceneSceneBrowser.handleBlur()");
    // this function will be called when the scene manager move focus to another scene from this scene
};

SceneSceneBrowser.prototype.handleKeyDown = function(e) {

    if (SceneSceneBrowser.loadingData || SceneSceneBrowser.noNetwork) {
        if (e.keyCode == TvKeyCode.KEY_RETURN) SceneSceneBrowser.keyReturnPressed = true;
        return;
    }

    switch (e.keyCode) {
        case TvKeyCode.KEY_RETURN:
            e.preventDefault(); //prevent key to do default
            if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES_STREAMS) {
                if (SceneSceneBrowser.returnToGames) {
                    e.preventDefault(); //prevent key to do default
                    SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_GAMES);
                } else {
                    e.preventDefault(); //prevent key to do default
                    SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_FOLLOWER);
                }
                return;
            } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_ALL) {
                if (SceneSceneBrowser.isShowExitDialogOn) {
                    window.clearTimeout(exitID);
                    tizen.application.getCurrentApplication().exit();
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
            } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES || SceneSceneBrowser.mode === SceneSceneBrowser.MODE_TOOLS) {
                SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_ALL);
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO && SceneSceneBrowser.mode != SceneSceneBrowser.MODE_TOOLS) {
                if (SceneSceneBrowser.cursorX > 0) {
                    SceneSceneBrowser.removeFocus();
                    SceneSceneBrowser.cursorX--;
                    SceneSceneBrowser.addFocus();
                }
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER) {
                if (typeof SceneSceneBrowser.followerMatrix[SceneSceneBrowser.cursorY][SceneSceneBrowser.cursorX + 1] !== 'undefined') {
                    e.preventDefault();
                    SceneSceneBrowser.removeFocus();
                    SceneSceneBrowser.cursorX++;
                    SceneSceneBrowser.addFocus();
                }
            } else if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO && SceneSceneBrowser.mode != SceneSceneBrowser.MODE_TOOLS) {
                if (SceneSceneBrowser.cursorX < SceneSceneBrowser.getCellsCount(SceneSceneBrowser.cursorY) - 1) {
                    SceneSceneBrowser.removeFocus();
                    SceneSceneBrowser.cursorX++;
                    SceneSceneBrowser.addFocus();
                }
            }
            break;
        case TvKeyCode.KEY_UP:
            if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER) {
                if (SceneSceneBrowser.cursorY > 0) {
                    if (typeof SceneSceneBrowser.followerMatrix[SceneSceneBrowser.cursorY - 1][SceneSceneBrowser.cursorX] !== 'undefined') {
                        e.preventDefault();
                        SceneSceneBrowser.removeFocus();
                        SceneSceneBrowser.cursorY--;
                        SceneSceneBrowser.addFocus();
                    } else {
                        e.preventDefault();
                        SceneSceneBrowser.removeFocus();
                        SceneSceneBrowser.cursorY--;
                        SceneSceneBrowser.cursorX = SceneSceneBrowser.followerMatrix[SceneSceneBrowser.cursorY].length - 1;
                        SceneSceneBrowser.addFocus();
                    }
                }
            } else if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO && SceneSceneBrowser.mode != SceneSceneBrowser.MODE_TOOLS) {
                //console.log("keyup != mode GO");
                if (SceneSceneBrowser.cursorY > 0) {
                    e.preventDefault();
                    SceneSceneBrowser.removeFocus();
                    SceneSceneBrowser.cursorY--;
                    SceneSceneBrowser.addFocus();
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
            if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER) {
                if (SceneSceneBrowser.cursorY < SceneSceneBrowser.followerMatrix.length - 1) {
                    if (typeof SceneSceneBrowser.followerMatrix[SceneSceneBrowser.cursorY + 1][SceneSceneBrowser.cursorX] !== 'undefined') {
                        //console.log("Key_DOWN - HAVE DOWN");
                        e.preventDefault();
                        SceneSceneBrowser.removeFocus();
                        SceneSceneBrowser.cursorY++;
                        SceneSceneBrowser.addFocus();
                    } else {
                        e.preventDefault();
                        SceneSceneBrowser.removeFocus();
                        SceneSceneBrowser.cursorY++;
                        SceneSceneBrowser.cursorX = SceneSceneBrowser.followerMatrix[SceneSceneBrowser.cursorY].length - 1;
                        SceneSceneBrowser.addFocus();
                    }
                }
            } else if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO && SceneSceneBrowser.mode != SceneSceneBrowser.MODE_TOOLS) {
                if (SceneSceneBrowser.cursorY < SceneSceneBrowser.getRowsCount() - 1 &&
                    SceneSceneBrowser.cursorX < SceneSceneBrowser.getCellsCount(SceneSceneBrowser.cursorY + 1)) {
                    e.preventDefault();
                    SceneSceneBrowser.removeFocus();
                    SceneSceneBrowser.cursorY++;
                    SceneSceneBrowser.addFocus();
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
            if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_TOOLS && SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO) SceneSceneBrowser.refresh();
            break;
        case TvKeyCode.KEY_0:
            SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_FOLLOWER);
            break;
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_FOLLOWER) {
                if (SceneSceneBrowser.followerMatrix[SceneSceneBrowser.cursorY][SceneSceneBrowser.cursorX][1] == 'stream') {
                    SceneSceneBrowser.selectedChannel = $('#cell_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).attr('data-channelname');
                    SceneSceneBrowser.openStream();
                } else if (SceneSceneBrowser.followerMatrix[SceneSceneBrowser.cursorY][SceneSceneBrowser.cursorX][1] == 'game') {
                    SceneSceneBrowser.gameSelected = $('#cell_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).attr('data-channelname');
                    SceneSceneBrowser.mode = SceneSceneBrowser.MODE_GAMES_STREAMS;
                    SceneSceneBrowser.returnToGames = false;
                    SceneSceneBrowser.refresh();
                }
            } else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GO) {
                if (SceneSceneBrowser.cursorY == 0) {
                    SceneSceneBrowser.ime = document.querySelector('#streamname_input');;
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
                SceneSceneBrowser.refresh();
            } else {
                SceneSceneBrowser.selectedChannel = $('#cell_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).attr('data-channelname');
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

SceneSceneBrowser.mhandleKeyReturn = function() {
    if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES_STREAMS) {
        if (SceneSceneBrowser.returnToGames) {
            e.preventDefault(); //prevent key to do default
            SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_GAMES);
        } else {
            e.preventDefault(); //prevent key to do default
            SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_FOLLOWER);
        }
        return;
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
    } else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES || SceneSceneBrowser.mode === SceneSceneBrowser.MODE_TOOLS) {
        SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_ALL);
    }
};

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
    }
    try {
        SceneSceneBrowser.listenerID = webapis.network.addNetworkStateChangeListener(onChange);
    } catch (e) {
        //console.log("addNetworkStateChangeListener exception [" + e.code + "] name: " + e.name + " message: " + e.message);
    }
    //if (SceneSceneBrowser.listenerID > -1) {
    //    console.log("addNetworkStateChangeListener success listener ID [" + SceneSceneBrowser.listenerID + "] ");
    //}
}
