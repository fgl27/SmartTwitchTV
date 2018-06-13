//Variable initialization
var SmartHub_loadingDataTry = 0;
var SmartHub_loadingDataTryMax = 5;
var SmartHub_loadingDataTimeout = 3500;

var SmartHub_userlive = [];
var SmartHub_usergames = [];
var SmartHub_userhost = [];

var SmartHub_followerChannels = '';
var SmartHub_LastUpdate = 0;
var SmartHub_emptyUser = false;
var SmartHub_SmartHubResume = false;
var SmartHub_followerUsername = '';
var SmartHub_previewData = 0;
//Variable initialization end

function SmartHub_Start() {
    if (!AddUser_UsernameArray.length) {
        window.clearInterval(Main_SmartHubId);
        document.removeEventListener('visibilitychange', Main_ResumeSmarthub);
        SmartHub_emptyUser = true;
    } else SmartHub_emptyUser = false;

    SmartHub_followerUsername = AddUser_UsernameArray[0];
    SmartHub_cleanVector();
    SmartHub_loadDataRequestPrepare();
    SmartHub_previewData = 0;
    if (SmartHub_emptyUser) {
        try {
            webapis.preview.setPreviewData(previewDataGeneratorEmpty());
        } catch (ex) {
            console.log(ex.message);
        }
    } else SmartHub_loadDataRequest();
}

function SmartHub_cleanVector() {
    SmartHub_userlive = [];
    SmartHub_usergames = [];
    SmartHub_userhost = [];
}

function SmartHub_loadDataRequestPrepare() {
    SmartHub_loadingDataTry = 0;
    SmartHub_loadingDataTryMax = 5;
    SmartHub_loadingDataTimeout = 10000;
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
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);

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
        SmartHub_loadingDataTimeout += 1000;
        SmartHub_loadDataRequest();
    } else SmartHub_cleanVector();
}

function SmartHub_previewDataSuccess(responseText) {
    var response = JSON.parse(responseText);

    if (!SmartHub_previewData) {
        SmartHub_followerChannels = '';

        for (var x = 0; x < response.follows.length; x++) {
            SmartHub_followerChannels += response.follows[x].channel.name + ',';
        }

        SmartHub_followerChannels = SmartHub_followerChannels.slice(0, -1);
    } else if (SmartHub_previewData === 1) SmartHub_userlive = response.streams;
    else if (SmartHub_previewData === 2) SmartHub_usergames = response.follows;
    else if (SmartHub_previewData === 3) SmartHub_userhost = response.hosts;

    if (SmartHub_previewData < 3) {
        SmartHub_previewData++;
        SmartHub_loadDataRequestPrepare();
        SmartHub_loadDataRequest();
    } else {
        SmartHub_LastUpdate = new Date().getTime();
        msetPreviewData();
    }
}

function msetPreviewData() {
    //first we erase all data '{}' to make shore when the new data is load it updates the imgs
    //then set a new data previewDataGenerator(), on sucess we SmartHub_cleanVector
    try {
        webapis.preview.setPreviewData('{}', function() {
            try {
                webapis.preview.setPreviewData(previewDataGenerator(), function() {
                    window.setTimeout(SmartHub_cleanVector, 1000);
                });
            } catch (ex) {
                console.log(ex.message);
            }
        });
    } catch (ex) {
        console.log(ex.message);
    }
}

function SmartHub_StartInterval() {
    SmartHub_Start();
    Main_SmartHubId = window.setInterval(SmartHub_Start, 600000);
}

function previewDataGeneratorEmpty() {
    return '{"sections":[' + previewDataGeneratorEnd(true);
}

function previewDataGenerator() {
    var data = '{"sections":[',
        i, vectorSize, LiveTitle, HostTitle;

    // new lines separates it blocks to make easier to add new blocks, just copy/paste a block

    vectorSize = SmartHub_userlive.length;
    if (vectorSize) {
        data += '{"title":"' + STR_LIVE_CHANNELS + ' ' + SmartHub_followerUsername + '","tiles":[';
        for (i = 0; i < vectorSize; i++) {

            LiveTitle = Main_is_playlist(JSON.stringify(SmartHub_userlive[i].stream_type)) +
                SmartHub_userlive[i].channel.display_name;

            data += (!i ? '' : ',') + '{"title":"' + LiveTitle + '","subtitle":"' + STR_PLAYING +
                SmartHub_userlive[i].game + '","image_ratio":"16by9","image_url":"' +
                (SmartHub_userlive[i].preview.template).replace("{width}x{height}", Main_VideoSize) +
                '","action_data":"{\\\"videoIdx\\\": \\\"' + SmartHub_userlive[i].channel.name +
                '\\\",\\\"videoTitleIdx\\\": \\\"' + LiveTitle + '\\\",\\\"_id\\\": \\\"' +
                SmartHub_userlive[i].channel._id + '\\\"}","is_playable":true}';

        }
        data += ']},';
    }

    vectorSize = SmartHub_userhost.length;
    if (vectorSize) {
        data += '{"title":"' + STR_LIVE_HOSTS + ' ' + SmartHub_followerUsername + '","tiles":[';
        for (i = 0; i < vectorSize; i++) {
            HostTitle = SmartHub_userhost[i].display_name + STR_USER_HOSTING +
                SmartHub_userhost[i].target.channel.display_name;

            data += (!i ? '' : ',') + '{"title":"' + HostTitle + '","subtitle":"' + STR_PLAYING +
                SmartHub_userhost[i].target.meta_game + '","image_ratio":"16by9","image_url":"' +
                (SmartHub_userhost[i].target.preview_urls.template).replace("{width}x{height}", Main_VideoSize) +
                '","action_data":"{\\\"videoIdx\\\": \\\"' + SmartHub_userhost[i].target.channel.name +
                '\\\",\\\"videoTitleIdx\\\": \\\"' + HostTitle +
                '\\\",\\\"_id\\\": \\\"' + SmartHub_userhost[i].target._id +
                '\\\",\\\"isHost\\\": \\\"true\\\"}","is_playable":true}';
        }
        data += ']},';
    }

    vectorSize = SmartHub_usergames.length;
    if (vectorSize) {
        data += '{"title":"' + STR_LIVE_GAMES + ' ' + SmartHub_followerUsername + '","tiles":[';
        for (i = 0; i < vectorSize; i++) {
            data += (!i ? '' : ',') + '{"title":"' + SmartHub_usergames[i].game.name +
                '","image_ratio":"2by3","image_url":"' +
                (SmartHub_usergames[i].game.box.template).replace("{width}x{height}", Main_GameSize) +
                '","action_data":"{\\\"gameIdx\\\": \\\"' + SmartHub_usergames[i].game.name +
                '\\\"}","is_playable":false}';
        }
        data += ']},';
    }

    return data + previewDataGeneratorEnd(false);
}

function previewDataGeneratorEnd(IsAddUser) {
    var UserThumb = '';

    if (IsAddUser) {
        UserThumb = '{"title":"' + STR_USER_ADD + '","tiles":[' +
            '{"title":"' + STR_GO_TO + STR_USER_ADD + '","subtitle":"' + STR_ADD_USER_SH + '","image_ratio":"16by9","image_url":"' +
            IMG_SMART_ADD_USER + '","action_data":"{\\\"screenIdx\\\": ' + Main_addUser + '}","is_playable":false}' +
            ']},';
    } else {
        UserThumb = '{"title":"' + STR_USER + '","tiles":[' +
            '{"title":"' + STR_GO_TO + STR_USER + '","image_ratio":"16by9","image_url":"' + IMG_SMART_USER +
            '","action_data":"{\\\"screenIdx\\\": ' + Main_Users + '}","is_playable":false}' +
            ']},';
    }

    // new lines separates it blocks to make easier to add new blocks, just copy/paste a block

    return '{"title":"' + STR_LIVE + '","tiles":[' +
        '{"title":"' + STR_GO_TO + STR_LIVE + '","image_ratio":"16by9","image_url":"' + IMG_SMART_LIVE +
        '","action_data":"{\\\"screenIdx\\\": ' + Main_Live + '}","is_playable":false}' +
        ']},' +

        UserThumb +

        '{"title":"' + STR_GAMES + '","tiles":[' +
        '{"title":"' + STR_GO_TO + STR_GAMES + '","image_ratio":"16by9","image_url":"' + IMG_SMART_GAME +
        '","action_data":"{\\\"screenIdx\\\": ' + Main_games + '}","is_playable":false}' +
        ']}' +

        ']}';
}

function SmartHub_EventListener() {
    var requestedAppControl;
    try {
        requestedAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();
    } catch (e) {}
    var appControlData, actionData, VideoIdx, GameIdx, ScreenIdx, ExitScreen, ExitToMain = false;

    if (requestedAppControl) {
        SmartHub_SmartHubResume = true;
        appControlData = requestedAppControl.appControl.data;
        for (var i = 0; i < appControlData.length; i++) {
            if (appControlData[i].key === 'PAYLOAD') {
                actionData = JSON.parse(appControlData[i].value[0]).values;
                if (JSON.parse(actionData).videoIdx) {

                    actionData = JSON.parse(actionData);
                    VideoIdx = actionData.videoIdx;

                    if (Play_Playing && Play_selectedChannel === VideoIdx) return;

                    Play_selectedChannel = VideoIdx;
                    Play_selectedChannelDisplayname = actionData.videoTitleIdx + '';
                    Main_selectedChannel_id = actionData._id;

                    if (actionData.isHost) {
                        Play_isHost = true;
                        Play_DisplaynameHost = Play_selectedChannelDisplayname;
                        Play_selectedChannelDisplayname = Play_selectedChannelDisplayname.split(STR_USER_HOSTING)[1];
                    }

                    if (Play_isOn) Play_PreshutdownStream();
                    else if (PlayVod_isOn) PlayVod_PreshutdownStream();
                    else if (PlayClip_isOn) PlayClip_PreshutdownStream();
                    else Main_ExitCurrent(Main_Go);

                    window.setTimeout(Main_openStream, 10);
                } else if (JSON.parse(actionData).gameIdx) {

                    actionData = JSON.parse(actionData);

                    GameIdx = actionData.gameIdx;
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

                    actionData = JSON.parse(actionData);

                    ScreenIdx = actionData.screenIdx;
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