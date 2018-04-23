//Variable initialization
var SmartHub_loadingDataTry = 0;
var SmartHub_loadingDataTryMax = 10;
var SmartHub_loadingDataTimeout = 3500;
var SmartHub_user = [];
var SmartHub_usertitle = [];
var SmartHub_usersubtitle = [];
var SmartHub_userimg = [];

var SmartHub_usergamesimg = [];
var SmartHub_usergames = [];

var SmartHub_userhost = [];
var SmartHub_userhosttitle = [];
var SmartHub_userhostsubtitle = [];
var SmartHub_userhostimg = [];
var SmartHub_followerChannels = '';
var SmartHub_LastUpdate = 0;
var SmartHub_emptyUser = false;
var SmartHub_SmartHubResume = false;
var SmartHub_followerUsername = '';
var SmartHub_userold = 0;
var SmartHub_usergamesold = 0;
var SmartHub_userhostold = 0;
var SmartHub_previewData = 0;
//Variable initialization end

function SmartHub_Start() {
    if (!AddUser_UsernameArray.length) {
        window.clearInterval(Main_SmartHubId);
        document.removeEventListener('visibilitychange', Main_Resume);
        SmartHub_emptyUser = true;
    } else SmartHub_emptyUser = false;

    SmartHub_followerUsername = AddUser_UsernameArray[0];
    SmartHub_userold = SmartHub_user.length;
    SmartHub_usergamesold = SmartHub_usergames.length;
    SmartHub_userhostold = SmartHub_userhost.length;

    SmartHub_user = [];
    SmartHub_usertitle = [];
    SmartHub_usersubtitle = [];
    SmartHub_userimg = [];

    SmartHub_usergamesimg = [];
    SmartHub_usergames = [];

    SmartHub_userhost = [];
    SmartHub_userhosttitle = [];
    SmartHub_userhostsubtitle = [];
    SmartHub_userhostimg = [];

    SmartHub_loadingDataTry = 0;
    SmartHub_loadingDataTryMax = 10;
    SmartHub_loadingDataTimeout = 3500;
    SmartHub_previewData = 0;
    if (SmartHub_emptyUser) webapis.preview.setPreviewData(previewDataGeneratorEmpty());
    else SmartHub_loadDataRequest();
}

function SmartHub_loadDataRequest() {
    try {
        var xmlHttp = new XMLHttpRequest();
        var theUrl;

        if (!SmartHub_previewData) {
            theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(SmartHub_followerUsername) +
                '/follows/channels?limit=100&sortby=last_broadcast&' + Math.round(Math.random() * 1e7);
        } else if (SmartHub_previewData === 1) {
            theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(SmartHub_followerChannels) + '&limit=21&' +
                Math.round(Math.random() * 1e7);
        } else if (SmartHub_previewData === 2) { // user games
            theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(SmartHub_followerUsername) + '/follows/games/live?limit=6&' +
                Math.round(Math.random() * 1e7);
        } else if (SmartHub_previewData === 3) { //user SmartHub host
            theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(SmartHub_followerUsername) + '/followed/hosting?limit=10&' +
                Math.round(Math.random() * 1e7);
        }

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = SmartHub_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        SmartHub_previewDataSuccess(xmlHttp.responseText);
                    } catch (err) {}
                } else {
                    SmartHub_loadDataError();
                }
            }
        };
        xmlHttp.send(null);
    } catch (error) {
        SmartHub_loadDataError();
    }
}

function SmartHub_loadDataError() {
    SmartHub_loadingDataTry++;
    if (SmartHub_loadingDataTry < SmartHub_loadingDataTryMax) {
        SmartHub_loadingDataTimeout += (SmartHub_loadingDataTry < 5) ? 250 : 3500;
        SmartHub_loadDataRequest();
    }
}

function SmartHub_previewDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items, cursor = 0,
        game, stream, hosts;

    if (!SmartHub_previewData) {
        response_items = response.follows.length;
        SmartHub_followerChannels = '';

        for (var x = 0; x < response_items; x++) {
            SmartHub_followerChannels += response.follows[x].channel.name + ',';

        }
        SmartHub_followerChannels = SmartHub_followerChannels.slice(0, -1);
    } else if (SmartHub_previewData === 1) {
        response_items = response.streams.length;
        for (cursor = 0; cursor < response_items; cursor++) {
            stream = response.streams[cursor];
            SmartHub_user[cursor] = stream.channel.name;
            SmartHub_usertitle[cursor] = Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name;
            SmartHub_usersubtitle[cursor] = STR_PLAYING + stream.game;
            SmartHub_userimg[cursor] = (stream.preview.template).replace("{width}x{height}", Main_VideoSize);
        }
    } else if (SmartHub_previewData === 2) {
        response_items = response.follows.length;
        for (cursor = 0; cursor < response_items; cursor++) {
            game = response.follows[cursor];
            SmartHub_usergames[cursor] = game.game.name;
            SmartHub_usergamesimg[cursor] = (game.game.box.template).replace("{width}x{height}", Main_GameSize);
        }
    } else if (SmartHub_previewData === 3) {
        response_items = response.hosts.length;
        for (cursor = 0; cursor < response_items; cursor++) {
            hosts = response.hosts[cursor];
            SmartHub_userhost[cursor] = hosts.target.channel.name;
            SmartHub_userhosttitle[cursor] = hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name;
            SmartHub_userhostsubtitle[cursor] = STR_PLAYING + hosts.target.meta_game;
            SmartHub_userhostimg[cursor] = (hosts.target.preview_urls.template).replace("{width}x{height}", Main_VideoSize);
        }
    }
    if (SmartHub_previewData < 3) {
        SmartHub_previewData++;
        SmartHub_loadingDataTry = 0;
        SmartHub_loadingDataTryMax = 10;
        SmartHub_loadingDataTimeout = 3500;
        SmartHub_loadDataRequest();
    } else {
        SmartHub_LastUpdate = new Date().getTime();
        webapis.preview.setPreviewData(previewDataGenerator());
    }
}

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

    if (SmartHub_user.length > 0) data += '{"title":"' + STR_LIVE_CHANNELS + ' ' + SmartHub_followerUsername + '","tiles":[';
    for (i = 0; i < SmartHub_user.length; i++) {
        if (i < 1) {
            data += '{"title":"' + SmartHub_usertitle[i] + '","subtitle":"' + SmartHub_usersubtitle[i] +
                '","image_ratio":"16by9","image_url":"' + SmartHub_userimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' +
                SmartHub_user[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + SmartHub_usertitle[i] + '\\\"}","is_playable":true}';
        } else {
            data += ',{"title":"' + SmartHub_usertitle[i] + '","subtitle":"' + SmartHub_usersubtitle[i] +
                '","image_ratio":"16by9","image_url":"' + SmartHub_userimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' +
                SmartHub_user[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + SmartHub_usertitle[i] + '\\\"}","is_playable":true}';
        }
    }
    if (SmartHub_user.length > 0) data += ']},';

    if (SmartHub_userhost.length > 0) data += '{"title":"' + STR_LIVE_HOSTS + ' ' + SmartHub_followerUsername + '","tiles":[';
    for (i = 0; i < SmartHub_userhost.length; i++) {
        if (i < 1) {
            data += '{"title":"' + SmartHub_userhosttitle[i] + '","subtitle":"' + SmartHub_userhostsubtitle[i] +
                '","image_ratio":"16by9","image_url":"' + SmartHub_userhostimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' +
                SmartHub_userhost[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + SmartHub_userhosttitle[i] + '\\\"}","is_playable":true}';
        } else {
            data += ',{"title":"' + SmartHub_userhosttitle[i] + '","subtitle":"' + SmartHub_userhostsubtitle[i] +
                '","image_ratio":"16by9","image_url":"' + SmartHub_userhostimg[i] + '","action_data":"{\\\"videoIdx\\\": \\\"' +
                SmartHub_userhost[i] + '\\\",\\\"videoTitleIdx\\\": \\\"' + SmartHub_userhosttitle[i] + '\\\"}","is_playable":true}';
        }
    }
    if (SmartHub_userhost.length > 0) data += ']},';

    if (SmartHub_usergames.length > 0) data += '{"title":"' + STR_LIVE_GAMES + ' ' + SmartHub_followerUsername + '","tiles":[';
    for (i = 0; i < SmartHub_usergames.length; i++) {
        if (i < 1) {
            data += '{"title":"' + SmartHub_usergames[i] + '","image_ratio":"2by3","image_url":"' + SmartHub_usergamesimg[i] +
                '","action_data":"{\\\"gameIdx\\\": \\\"' + SmartHub_usergames[i] + '\\\"}","is_playable":false}';
        } else {
            data += ',{"title":"' + SmartHub_usergames[i] + '","image_ratio":"2by3","image_url":"' + SmartHub_usergamesimg[i] +
                '","action_data":"{\\\"gameIdx\\\": \\\"' + SmartHub_usergames[i] + '\\\"}","is_playable":false}';
        }
    }
    if (SmartHub_usergames.length > 0) data += ']},';

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

function SmartHub_EventListener() {
    var requestedAppControl;
    try {
        requestedAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();
    } catch (e) {}
    var appControlData, actionData, VideoIdx, VideoTitleIdx, GameIdx, ScreenIdx, ExitScreen, ExitToMain = false;

    if (requestedAppControl) {
        SmartHub_SmartHubResume = true;
        appControlData = requestedAppControl.appControl.data;
        for (var i = 0; i < appControlData.length; i++) {
            if (appControlData[i].key === 'PAYLOAD') {
                actionData = JSON.parse(appControlData[i].value[0]).values;
                if (JSON.parse(actionData).videoIdx) {
                    VideoIdx = JSON.parse(actionData).videoIdx;
                    VideoTitleIdx = JSON.parse(actionData).videoTitleIdx;
                    if (Play_Playing && Play_selectedChannel === VideoIdx) {
                        return;
                    }
                    Play_selectedChannel = VideoIdx;
                    Play_selectedChannelDisplayname = VideoTitleIdx;
                    if (Play_isOn) {
                        Play_PreshutdownStream();
                        window.setTimeout(Main_openStream, 10);
                    } else if (PlayVod_isOn) {
                        PlayVod_PreshutdownStream();
                        window.setTimeout(Main_openStream, 10);
                    } else if (PlayClip_isOn) {
                        PlayClip_PreshutdownStream();
                        window.setTimeout(Main_openStream, 10);
                    } else {
                        Main_ExitCurrent(Main_Go);
                        window.setTimeout(Main_openStream, 10);
                    }

                } else if (JSON.parse(actionData).gameIdx) {
                    GameIdx = JSON.parse(actionData).gameIdx;
                    ExitToMain = (GameIdx !== Main_gameSelected);
                    ExitScreen = Main_Go;
                    Main_gameSelected = GameIdx;
                    Main_Go = Main_aGame;

                    Main_ExitCurrent(ExitScreen);
                    if (Play_isOn) window.setTimeout(Play_shutdownStream, 10);
                    else if (PlayVod_isOn) window.setTimeout(PlayVod_shutdownStream, 10);
                    else if (PlayClip_isOn) window.setTimeout(PlayClip_shutdownStream, 10);
                    else if (ExitToMain) Main_SwitchScreen();

                } else if (JSON.parse(actionData).screenIdx) {
                    ScreenIdx = JSON.parse(actionData).screenIdx;
                    ExitToMain = (ScreenIdx !== Main_Go);
                    ExitScreen = Main_Go;
                    Main_Go = ScreenIdx;

                    Main_ExitCurrent(ExitScreen);
                    if (Play_isOn) window.setTimeout(Play_shutdownStream, 10);
                    else if (PlayVod_isOn) window.setTimeout(PlayVod_shutdownStream, 10);
                    else if (PlayClip_isOn) window.setTimeout(PlayClip_shutdownStream, 10);
                    else if (ExitToMain) Main_SwitchScreen();
                }
            }
        }
    }
}