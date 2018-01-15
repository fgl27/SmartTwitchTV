/*jshint multistr: true */
//Variable initialization
function SmartHub() {}
SmartHub.loadingDataTry = 1;
SmartHub.loadingDataTryMax = 10;
SmartHub.loadingDataTimeout = 3500;
SmartHub.user = [];
SmartHub.usertitle = [];
SmartHub.usersubtitle = [];
SmartHub.userimg = [];

SmartHub.usergamesimg = [];
SmartHub.usergames = [];

SmartHub.userhost = [];
SmartHub.userhosttitle = [];
SmartHub.userhostsubtitle = [];
SmartHub.userhostimg = [];
SmartHub.followerChannels = '';
SmartHub.LastUpdate = 0;
//Variable initialization end

SmartHub.Start = function() {
    if (AddUser.UsernameArray.length === 0) {
        window.clearInterval(Main.SmartHubId);
        document.removeEventListener('visibilitychange', Main.Resume);
        window.removeEventListener('appcontrol', SmartHub.EventListener);
        return;
    }

    SmartHub.followerUsername = AddUser.UsernameArray[0];
    SmartHub.userold = SmartHub.user.length;
    SmartHub.usergamesold = SmartHub.usergames.length;
    SmartHub.userhostold = SmartHub.userhost.length;

    SmartHub.user = [];
    SmartHub.usertitle = [];
    SmartHub.usersubtitle = [];
    SmartHub.userimg = [];

    SmartHub.usergamesimg = [];
    SmartHub.usergames = [];

    SmartHub.userhost = [];
    SmartHub.userhosttitle = [];
    SmartHub.userhostsubtitle = [];
    SmartHub.userhostimg = [];

    SmartHub.loadingDataTry = 1;
    SmartHub.loadingDataTryMax = 10;
    SmartHub.loadingDataTimeout = 3500;
    SmartHub.previewData = 0;
    SmartHub.loadDataRequest();
};

SmartHub.loadDataRequest = function() {
    try {
        var xmlHttp = new XMLHttpRequest();
        var theUrl;

        if (SmartHub.previewData === 0) {
            theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(SmartHub.followerUsername) +
                '/follows/channels?limit=100&sortby=last_broadcast';
        } else if (SmartHub.previewData === 1) {
            theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(SmartHub.followerChannels) + '&limit=22';
        } else if (SmartHub.previewData === 2) { // user games
            theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(SmartHub.followerUsername) + '/follows/games/live?limit=6';
        } else if (SmartHub.previewData === 3) { //user SmartHub host
            theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(SmartHub.followerUsername) + '/followed/hosting?limit=10';
        }

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = SmartHub.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');

        xmlHttp.ontimeout = function() {

        };
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        SmartHub.previewDataSuccess(xmlHttp.responseText);
                    } catch (err) {}
                } else {
                    SmartHub.loadDataError();
                }
            }
        };
        xmlHttp.send(null);
    } catch (error) {
        SmartHub.loadDataError();
    }
};

SmartHub.loadDataError = function() {
    SmartHub.loadingDataTry++;
    if (SmartHub.loadingDataTry < SmartHub.loadingDataTryMax) {
        SmartHub.loadingDataTimeout += (SmartHub.loadingDataTry < 5) ? 250 : 3500;
        SmartHub.loadDataRequest();
    } else {
        SmartHub.loadingData = false;
    }
};

SmartHub.previewDataSuccess = function(responseText) {
    var response = $.parseJSON(responseText);
    var response_items, cursor = 0,
        game, stream, hosts;

    if (SmartHub.previewData === 0) {
        response_items = response.follows.length;
        SmartHub.followerChannels = '';

        for (var x = 0; x < response_items; x++) {
            SmartHub.followerChannels += response.follows[x].channel.name + ',';

        }
        SmartHub.followerChannels = SmartHub.followerChannels.slice(0, -1);
    } else if (SmartHub.previewData === 1) {
        response_items = response.streams.length;
        for (cursor = 0; cursor < response_items; cursor++) {
            stream = response.streams[cursor];
            SmartHub.user[cursor] = stream.channel.name;
            SmartHub.usertitle[cursor] = Main.is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name;
            SmartHub.usersubtitle[cursor] = stream.game;
            SmartHub.userimg[cursor] = (stream.preview.template).replace("{width}x{height}", "640x360");
        }
    } else if (SmartHub.previewData === 2) {
        response_items = response.follows.length;
        for (cursor = 0; cursor < response_items; cursor++) {
            game = response.follows[cursor];
            SmartHub.usergames[cursor] = game.game.name;
            SmartHub.usergamesimg[cursor] = (game.game.box.template).replace("{width}x{height}", "481x672");
        }
    } else if (SmartHub.previewData === 3) {
        response_items = response.hosts.length;
        for (cursor = 0; cursor < response_items; cursor++) {
            hosts = response.hosts[cursor];
            SmartHub.userhost[cursor] = hosts.target.channel.name;
            SmartHub.userhosttitle[cursor] = hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name;
            SmartHub.userhostsubtitle[cursor] = hosts.target.meta_game;
            SmartHub.userhostimg[cursor] = (hosts.target.preview_urls.template).replace("{width}x{height}", "640x360");
        }
    }
    if (SmartHub.previewData < 3) {
        SmartHub.previewData++;
        SmartHub.loadingDataTry = 1;
        SmartHub.loadingDataTryMax = 10;
        SmartHub.loadingDataTimeout = 3500;
        SmartHub.loadDataRequest();
    } else {
        SmartHub.LastUpdate = new Date().getTime();
        webapis.preview.setPreviewData(previewDataGenerator());
    }
};

function previewDataGenerator() {
    var data = '{"sections":[';
    var i = 0;

    if (SmartHub.user.length > 0) data += '{"title":"' + STR_LIVE_CHANNELS + SmartHub.followerUsername + '","tiles":[';
    for (i = 0; i < SmartHub.user.length; i++) {
        if (i < 1) {
            data += '{"title":"' + SmartHub.usertitle[i] + '","subtitle":"' + SmartHub.usersubtitle[i] + '","image_ratio":"16by9","image_url":"' + SmartHub.userimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' + SmartHub.user[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + SmartHub.usertitle[i] + '\\\"}","is_playable":true}';
        } else {
            data += ',{"title":"' + SmartHub.usertitle[i] + '","subtitle":"' + SmartHub.usersubtitle[i] + '","image_ratio":"16by9","image_url":"' + SmartHub.userimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' + SmartHub.user[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + SmartHub.usertitle[i] + '\\\"}","is_playable":true}';
        }
    }
    if (SmartHub.user.length > 0) data += ']},';

    if (SmartHub.userhost.length > 0) data += '{"title":"' + STR_LIVE_HOSTS + ' ' + SmartHub.followerUsername + '","tiles":[';
    for (i = 0; i < SmartHub.userhost.length; i++) {
        if (i < 1) {
            data += '{"title":"' + SmartHub.userhosttitle[i] + '","subtitle":"' + SmartHub.userhostsubtitle[i] + '","image_ratio":"16by9","image_url":"' + SmartHub.userhostimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' + SmartHub.userhost[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + SmartHub.userhosttitle[i] + '\\\"}","is_playable":true}';
        } else {
            data += ',{"title":"' + SmartHub.userhosttitle[i] + '","subtitle":"' + SmartHub.userhostsubtitle[i] + '","image_ratio":"16by9","image_url":"' + SmartHub.userhostimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' + SmartHub.userhost[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + SmartHub.userhosttitle[i] + '\\\"}","is_playable":true}';
        }
    }
    if (SmartHub.userhost.length > 0) data += ']},';

    if (SmartHub.usergames.length > 0) data += '{"title":"' + STR_LIVE_GAMES + ' ' + SmartHub.followerUsername + '","tiles":[';
    for (i = 0; i < SmartHub.usergames.length; i++) {
        if (i < 1) {
            data += '{"title":"' + SmartHub.usergames[i] + '","image_ratio":"16by9","image_url":"' + SmartHub.usergamesimg[i] + '","action_data":"{\\\"gameIdx\\\": \\\"' + SmartHub.usergames[i] + '\\\"}","is_playable":false}';
        } else {
            data += ',{"title":"' + SmartHub.usergames[i] + '","image_ratio":"16by9","image_url":"' + SmartHub.usergamesimg[i] + '","action_data":"{\\\"gameIdx\\\": \\\"' + SmartHub.usergames[i] + '\\\"}","is_playable":false}';
        }
    }
    if (SmartHub.usergames.length > 0) data += ']},';

    data += '{"title":"' + STR_LIVE + '","tiles":[';
    data += '{"title":"Go to ' + STR_LIVE + '","image_ratio":"2by3","image_url":"https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/screenshot/smarthubreference/live.png","action_data":"{\\\"screenIdx\\\": 1}","is_playable":false}';
    data += ']},';

    data += '{"title":"' + STR_GAMES + '","tiles":[';
    data += '{"title":"Go to ' + STR_GAMES + '","image_ratio":"2by3","image_url":"https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/screenshot/smarthubreference/games.png","action_data":"{\\\"screenIdx\\\": 2}","is_playable":false}';
    data += ']}';

    data += ']}';
    return data;
}

SmartHub.EventListener = function() {
    var requestedAppControl;
    try {
        requestedAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();
    } catch (e) {}
    var appControlData, actionData, videoIdx, videoTitleIdx;

    if (requestedAppControl) {
        SmartHub.SmartHubResume = true;
        appControlData = requestedAppControl.appControl.data;
        for (var i = 0; i < appControlData.length; i++) {
            if (appControlData[i].key == 'PAYLOAD') {
                actionData = JSON.parse(appControlData[i].value[0]).values;
                if (JSON.parse(actionData).videoIdx) {
                    videoIdx = JSON.parse(actionData).videoIdx;
                    videoTitleIdx = JSON.parse(actionData).videoTitleIdx;
                    if (Play.Playing && Play.selectedChannel == videoIdx) {
                        return;
                    }
                    Play.selectedChannel = videoIdx;
                    Play.selectedChannelDisplayname = videoTitleIdx;
                    Main.ExitCurrent();
                    if (Play.Playing) {
                        Play.PartiallyshutdownStream();
                        window.setTimeout(Main.openStream, 10);
                    } else if (PlayVod.Playing) {
                        PlayVod.PartiallyshutdownStream();
                        window.setTimeout(Main.openStream, 10);
                    } else window.setTimeout(Main.openStream, 10);

                } else if (JSON.parse(actionData).gameIdx) {
                    Main.ExitCurrent();
                    Main.gameSelected = JSON.parse(actionData).gameIdx;
                    Main.Go = Main.AGame;

                    if (Play.Playing) window.setTimeout(Play.shutdownStream, 10);
                    else if (PlayVod.Playing) window.setTimeout(PlayVod.shutdownStream, 10);
                    else Main.SwitchScreen();

                } else if (JSON.parse(actionData).screenIdx) {
                    Main.ExitCurrent();
                    if (JSON.parse(actionData).screenIdx === 1) Main.Go = Main.Live;
                    else Main.Go = Main.Games;

                    if (Play.Playing) window.setTimeout(Play.shutdownStream, 10);
                    else if (PlayVod.Playing) window.setTimeout(PlayVod.shutdownStream, 10);
                    else Main.SwitchScreen();

                }
            }
        }
    }
};
