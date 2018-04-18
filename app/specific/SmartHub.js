/*jshint multistr: true */
//Variable initialization
function SmartHub() {}
SmartHub.loadingDataTry = 0;
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
SmartHub.emptyUser = false;

//Variable initialization end

SmartHub.Start = function() {
    if (!AddUser.UsernameArray.length) {
        window.clearInterval(Main.SmartHubId);
        document.removeEventListener('visibilitychange', Main.Resume);
        SmartHub.emptyUser = true;
    } else SmartHub.emptyUser = false;

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

    SmartHub.loadingDataTry = 0;
    SmartHub.loadingDataTryMax = 10;
    SmartHub.loadingDataTimeout = 3500;
    SmartHub.previewData = 0;
    if (SmartHub.emptyUser) webapis.preview.setPreviewData(previewDataGeneratorEmpty());
    else SmartHub.loadDataRequest();
};

SmartHub.loadDataRequest = function() {
    try {
        var xmlHttp = new XMLHttpRequest();
        var theUrl;

        if (!SmartHub.previewData) {
            theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(SmartHub.followerUsername) +
                '/follows/channels?limit=100&sortby=last_broadcast&' + Math.round(Math.random() * 1e7);
        } else if (SmartHub.previewData === 1) {
            theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(SmartHub.followerChannels) + '&limit=21&' +
                Math.round(Math.random() * 1e7);
        } else if (SmartHub.previewData === 2) { // user games
            theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(SmartHub.followerUsername) + '/follows/games/live?limit=6&' +
                Math.round(Math.random() * 1e7);
        } else if (SmartHub.previewData === 3) { //user SmartHub host
            theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(SmartHub.followerUsername) + '/followed/hosting?limit=10&' +
                Math.round(Math.random() * 1e7);
        }

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = SmartHub.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);

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
    var response = JSON.parse(responseText);
    var response_items, cursor = 0,
        game, stream, hosts;

    if (!SmartHub.previewData) {
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
            SmartHub.usersubtitle[cursor] = STR_PLAYING + stream.game;
            SmartHub.userimg[cursor] = (stream.preview.template).replace("{width}x{height}", Main.VideoSize);
        }
    } else if (SmartHub.previewData === 2) {
        response_items = response.follows.length;
        for (cursor = 0; cursor < response_items; cursor++) {
            game = response.follows[cursor];
            SmartHub.usergames[cursor] = game.game.name;
            SmartHub.usergamesimg[cursor] = (game.game.box.template).replace("{width}x{height}", Main.GameSize);
        }
    } else if (SmartHub.previewData === 3) {
        response_items = response.hosts.length;
        for (cursor = 0; cursor < response_items; cursor++) {
            hosts = response.hosts[cursor];
            SmartHub.userhost[cursor] = hosts.target.channel.name;
            SmartHub.userhosttitle[cursor] = hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name;
            SmartHub.userhostsubtitle[cursor] = STR_PLAYING + hosts.target.meta_game;
            SmartHub.userhostimg[cursor] = (hosts.target.preview_urls.template).replace("{width}x{height}", Main.VideoSize);
        }
    }
    if (SmartHub.previewData < 3) {
        SmartHub.previewData++;
        SmartHub.loadingDataTry = 0;
        SmartHub.loadingDataTryMax = 10;
        SmartHub.loadingDataTimeout = 3500;
        SmartHub.loadDataRequest();
    } else {
        SmartHub.LastUpdate = new Date().getTime();
        webapis.preview.setPreviewData(previewDataGenerator());
    }
};

function previewDataGeneratorEmpty() {
    var data = '{"sections":[';

    data += '{"title":"' + STR_LIVE + '","tiles":[';
    data += '{"title":"' + STR_GO_TO + STR_LIVE + '","image_ratio":"16by9","image_url":"' + IMG_SMART_LIVE +
    '","action_data":"{\\\"screenIdx\\\": 1}","is_playable":false}';
    data += ']},';

    data += '{"title":"' + STR_USER_ADD + '","tiles":[';
    data += '{"title":"' + STR_GO_TO + STR_USER_ADD + '","subtitle":"' + STR_ADD_USER_SH + '","image_ratio":"16by9","image_url":"' +
    IMG_SMART_USER + '","action_data":"{\\\"screenIdx\\\": 2}","is_playable":false}';
    data += ']},';

    data += '{"title":"' + STR_GAMES + '","tiles":[';
    data += '{"title":"' + STR_GO_TO + STR_GAMES + '","image_ratio":"16by9","image_url":"' + IMG_SMART_GAME +
    '","action_data":"{\\\"screenIdx\\\": 3}","is_playable":false}';
    data += ']}';

    data += ']}';
    return data;
}

function previewDataGenerator() {
    var data = '{"sections":[';
    var i = 0;

    if (SmartHub.user.length > 0) data += '{"title":"' + STR_LIVE_CHANNELS + ' ' + SmartHub.followerUsername + '","tiles":[';
    for (i = 0; i < SmartHub.user.length; i++) {
        if (i < 1) {
            data += '{"title":"' + SmartHub.usertitle[i] + '","subtitle":"' + SmartHub.usersubtitle[i] +
                '","image_ratio":"16by9","image_url":"' + SmartHub.userimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' +
                SmartHub.user[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + SmartHub.usertitle[i] + '\\\"}","is_playable":true}';
        } else {
            data += ',{"title":"' + SmartHub.usertitle[i] + '","subtitle":"' + SmartHub.usersubtitle[i] +
                '","image_ratio":"16by9","image_url":"' + SmartHub.userimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' +
                SmartHub.user[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + SmartHub.usertitle[i] + '\\\"}","is_playable":true}';
        }
    }
    if (SmartHub.user.length > 0) data += ']},';

    if (SmartHub.userhost.length > 0) data += '{"title":"' + STR_LIVE_HOSTS + ' ' + SmartHub.followerUsername + '","tiles":[';
    for (i = 0; i < SmartHub.userhost.length; i++) {
        if (i < 1) {
            data += '{"title":"' + SmartHub.userhosttitle[i] + '","subtitle":"' + SmartHub.userhostsubtitle[i] +
                '","image_ratio":"16by9","image_url":"' + SmartHub.userhostimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' +
                SmartHub.userhost[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + SmartHub.userhosttitle[i] + '\\\"}","is_playable":true}';
        } else {
            data += ',{"title":"' + SmartHub.userhosttitle[i] + '","subtitle":"' + SmartHub.userhostsubtitle[i] +
                '","image_ratio":"16by9","image_url":"' + SmartHub.userhostimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' +
                SmartHub.userhost[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + SmartHub.userhosttitle[i] + '\\\"}","is_playable":true}';
        }
    }
    if (SmartHub.userhost.length > 0) data += ']},';

    if (SmartHub.usergames.length > 0) data += '{"title":"' + STR_FALLOW_GAMES + ' ' + SmartHub.followerUsername + '","tiles":[';
    for (i = 0; i < SmartHub.usergames.length; i++) {
        if (i < 1) {
            data += '{"title":"' + SmartHub.usergames[i] + '","image_ratio":"2by3","image_url":"' + SmartHub.usergamesimg[i] +
                '","action_data":"{\\\"gameIdx\\\": \\\"' + SmartHub.usergames[i] + '\\\"}","is_playable":false}';
        } else {
            data += ',{"title":"' + SmartHub.usergames[i] + '","image_ratio":"2by3","image_url":"' + SmartHub.usergamesimg[i] +
                '","action_data":"{\\\"gameIdx\\\": \\\"' + SmartHub.usergames[i] + '\\\"}","is_playable":false}';
        }
    }
    if (SmartHub.usergames.length > 0) data += ']},';

    data += '{"title":"' + STR_LIVE + '","tiles":[';
    data += '{"title":"' + STR_GO_TO + STR_LIVE + '","image_ratio":"16by9","image_url":"' + IMG_SMART_LIVE +
    '","action_data":"{\\\"screenIdx\\\": 1}","is_playable":false}';
    data += ']},';

    data += '{"title":"' + STR_USER + '","tiles":[';
    data += '{"title":"' + STR_GO_TO + STR_USER + '","image_ratio":"16by9","image_url":"' + GIT_IO +
    'smart_users.png","action_data":"{\\\"screenIdx\\\": 17}","is_playable":false}';
    data += ']},';

    data += '{"title":"' + STR_GAMES + '","tiles":[';
    data += '{"title":"' + STR_GO_TO + STR_GAMES + '","image_ratio":"16by9","image_url":"' + IMG_SMART_GAME +
    '","action_data":"{\\\"screenIdx\\\": 3}","is_playable":false}';
    data += ']}';

    data += ']}';
    return data;
}

SmartHub.EventListener = function() {
    var requestedAppControl;
    try {
        requestedAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();
    } catch (e) {}
    var appControlData, actionData, VideoIdx, VideoTitleIdx, GameIdx, ScreenIdx, ExitScreen, ExitToMain = false;

    if (requestedAppControl) {
        SmartHub.SmartHubResume = true;
        appControlData = requestedAppControl.appControl.data;
        for (var i = 0; i < appControlData.length; i++) {
            if (appControlData[i].key === 'PAYLOAD') {
                actionData = JSON.parse(appControlData[i].value[0]).values;
                if (JSON.parse(actionData).videoIdx) {
                    VideoIdx = JSON.parse(actionData).videoIdx;
                    VideoTitleIdx = JSON.parse(actionData).videoTitleIdx;
                    if (Play.Playing && Play.selectedChannel === VideoIdx) {
                        return;
                    }
                    Play.selectedChannel = VideoIdx;
                    Play.selectedChannelDisplayname = VideoTitleIdx;
                    if (Play.isOn) {
                        Play.PreshutdownStream();
                        window.setTimeout(Main.openStream, 10);
                    } else if (PlayVod.isOn) {
                        PlayVod.PreshutdownStream();
                        window.setTimeout(Main.openStream, 10);
                    } else if (PlayClip.isOn) {
                        PlayClip.PreshutdownStream();
                        window.setTimeout(Main.openStream, 10);
                    } else {
                        Main.ExitCurrent(Main.Go);
                        window.setTimeout(Main.openStream, 10);
                    }

                } else if (JSON.parse(actionData).gameIdx) {
                    GameIdx = JSON.parse(actionData).gameIdx;
                    ExitToMain = (GameIdx !== Main.gameSelected);
                    ExitScreen = Main.Go;
                    Main.gameSelected = GameIdx;
                    Main.Go = Main.AGame;

                    Main.ExitCurrent(ExitScreen);
                    if (Play.isOn) window.setTimeout(Play.shutdownStream, 10);
                    else if (PlayVod.isOn) window.setTimeout(PlayVod.shutdownStream, 10);
                    else if (PlayClip.isOn) window.setTimeout(PlayClip.shutdownStream, 10);
                    else if (ExitToMain) Main.SwitchScreen();

                } else if (JSON.parse(actionData).screenIdx) {
                    ScreenIdx = JSON.parse(actionData).screenIdx;
                    ExitToMain = (ScreenIdx !== Main.Go);
                    ExitScreen = Main.Go;
                    Main.Go = ScreenIdx;

                    Main.ExitCurrent(ExitScreen);
                    if (Play.isOn) window.setTimeout(Play.shutdownStream, 10);
                    else if (PlayVod.isOn) window.setTimeout(PlayVod.shutdownStream, 10);
                    else if (PlayClip.isOn) window.setTimeout(PlayClip.shutdownStream, 10);
                    else if (ExitToMain) Main.SwitchScreen();
                }
            }
        }
    }
};
