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

var SmartHub_BasePreviewData = {};
var SmartHub_BasePreviewDataNoUser = {};
//Variable initialization end

function SmartHub_Start() {
    if (!Main_TizenVersion) {
        window.clearInterval(Main_SmartHubId);
        return;
    }

    if (!AddUser_UsernameArray.length) {
        window.clearInterval(Main_SmartHubId);
        document.removeEventListener('visibilitychange', Main_ResumeSmarthub);
        SmartHub_emptyUser = true;
    } else SmartHub_emptyUser = false;

    SmartHub_cleanVector();
    SmartHub_loadDataRequestPrepare();
    SmartHub_previewData = 0;
    if (SmartHub_emptyUser) {
        try {
            webapis.preview.setPreviewData(JSON.stringify(SmartHub_BasePreviewDataNoUser));
        } catch (ex) {
            console.log(ex.message);
        }
    } else {
        SmartHub_followerUsername = AddUser_UsernameArray[0].name;
        SmartHub_loadDataRequest();
    }
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
    var xmlHttp = new XMLHttpRequest();
    var theUrl;

    if (!SmartHub_previewData) {
        theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(AddUser_UsernameArray[0].id) +
            '/follows/channels?limit=100&sortby=last_broadcast&' + Math.round(Math.random() * 1e7);
    } else if (SmartHub_previewData === 1) {
        theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(SmartHub_followerChannels) + '&limit=18&' +
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
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                Main_ready(function() {
                    SmartHub_previewDataSuccess(xmlHttp.responseText);
                });
            } else {
                SmartHub_loadDataError();
            }
        }
    };
    xmlHttp.send(null);
}

function SmartHub_loadDataError() {
    SmartHub_loadingDataTry++;
    if (SmartHub_loadingDataTry < SmartHub_loadingDataTryMax) {
        SmartHub_loadingDataTimeout += 500;
        SmartHub_loadDataRequest();
    } else SmartHub_cleanVector();
}

function SmartHub_previewDataSuccess(responseText) {
    var response = JSON.parse(responseText);

    if (!SmartHub_previewData) {
        SmartHub_followerChannels = '';

        for (var x = 0; x < response.follows.length; x++) {
            SmartHub_followerChannels += response.follows[x].channel._id + ',';
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
        Main_ready(function() {
            SmartHub_LastUpdate = new Date().getTime();
            SmartHub_msetPreviewData();
        });
    }
}

function SmartHub_msetPreviewData() {
    //first we erase all data '{}' to make shore when the new data is load it updates the imgs
    //then set a new data SmartHub_previewDataGenerator(), on sucess we SmartHub_cleanVector
    try {
        webapis.preview.setPreviewData('{}', function() {
            Main_ready(function() {
                try {
                    webapis.preview.setPreviewData(SmartHub_previewDataGenerator(), function() {
                        window.setTimeout(SmartHub_cleanVector, 1000);
                    });
                } catch (ex) {
                    console.log(ex.message);
                }
            });
        });
    } catch (ex) {
        console.log(ex.message);
    }
}

function SmartHub_StartInterval() {
    Main_SmartHubId = window.setInterval(SmartHub_Start, 600000);
    SmartHub_Start();
}

function SmartHub_previewDataGenerator() {
    var i, vectorSize, Title;
    //Re-initialize SmartHub_BasePreviewData because it may not be yet or some section have be removed
    SmartHub_SetBasePreviewData();

    //Live
    vectorSize = SmartHub_userlive.length;
    if (vectorSize) {
        SmartHub_BasePreviewData.sections[0].title = STR_LIVE_CHANNELS + ' ' + SmartHub_followerUsername;
        for (i = 0; i < vectorSize; i++) {

            Title = Main_is_playlist(JSON.stringify(SmartHub_userlive[i].stream_type)) +
                SmartHub_userlive[i].channel.display_name;

            SmartHub_BasePreviewData.sections[0].tiles[i] = SmartHub_SubTile(Title,
                STR_PLAYING + SmartHub_userlive[i].game,
                "16by9",
                (SmartHub_userlive[i].preview.template).replace("{width}x{height}", Main_VideoSize), {
                    "videoIdx": SmartHub_userlive[i].channel.name,
                    "videoTitleIdx": Title,
                    "_id": SmartHub_userlive[i].channel._id
                }
            );
        }
    } else delete SmartHub_BasePreviewData.sections[0];

    //Host
    vectorSize = SmartHub_userhost.length;
    if (vectorSize) {
        SmartHub_BasePreviewData.sections[1].title = STR_LIVE_HOSTS + ' ' + SmartHub_followerUsername;
        for (i = 0; i < vectorSize; i++) {

            Title = SmartHub_userhost[i].display_name + STR_USER_HOSTING +
                SmartHub_userhost[i].target.channel.display_name;

            SmartHub_BasePreviewData.sections[1].tiles[i] = SmartHub_SubTile(Title,
                STR_PLAYING + SmartHub_userhost[i].target.meta_game,
                "16by9",
                (SmartHub_userhost[i].target.preview_urls.template).replace("{width}x{height}", Main_VideoSize), {
                    "videoIdx": SmartHub_userhost[i].target.channel.name,
                    "videoTitleIdx": Title,
                    "_id": SmartHub_userhost[i].target._id,
                    "isHost": true
                }
            );
        }
    } else delete SmartHub_BasePreviewData.sections[1];

    //Games
    vectorSize = SmartHub_usergames.length;
    if (vectorSize) {
        SmartHub_BasePreviewData.sections[2].title = STR_LIVE_GAMES + ' ' + SmartHub_followerUsername;
        for (i = 0; i < vectorSize; i++) {

            SmartHub_BasePreviewData.sections[2].tiles[i] = SmartHub_SubTile(SmartHub_usergames[i].game.name,
                '',
                "2by3",
                (SmartHub_usergames[i].game.box.template).replace("{width}x{height}", Main_GameSize), {
                    "gameIdx": SmartHub_usergames[i].game.name
                }
            );
        }
    } else delete SmartHub_BasePreviewData.sections[2];

    //Clean up "null" section created if used "delete"
    SmartHub_BasePreviewData.sections = SmartHub_BasePreviewData.sections.filter(function(position) {
        return position !== null;
    });

    return JSON.stringify(SmartHub_BasePreviewData);
}

function SmartHub_EventListener() {
    var requestedAppControl;
    try {
        requestedAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();
    } catch (e) {}
    var appControlData, actionData, VideoIdx, GameIdx, ScreenIdx, BeforeScreen, SwitchScreen = false,
        ExitScreen = false;

    if (requestedAppControl) {
        SmartHub_SmartHubResume = true;
        appControlData = requestedAppControl.appControl.data;
        for (var i = 0; i < appControlData.length; i++) {
            if (appControlData[i].key === 'PAYLOAD') {
                actionData = JSON.parse(appControlData[i].value[0]).values;
                if (JSON.parse(actionData).videoIdx) {

                    actionData = JSON.parse(actionData);
                    VideoIdx = actionData.videoIdx;

                    if (Play_Playing && Main_values.Play_selectedChannel === VideoIdx) return;

                    Main_values.Play_selectedChannel = VideoIdx;
                    Main_values.Play_selectedChannelDisplayname = actionData.videoTitleIdx + '';

                    if (actionData.isHost) {
                        Main_values.Play_isHost = true;
                        Main_values.Play_DisplaynameHost = Main_values.Play_selectedChannelDisplayname;
                        Main_values.Play_selectedChannelDisplayname = Main_values.Play_selectedChannelDisplayname.split(STR_USER_HOSTING)[1];
                    }

                    if (Play_isOn) Play_PreshutdownStream();
                    else if (PlayVod_isOn) PlayVod_PreshutdownStream(true);
                    else if (PlayClip_isOn) PlayClip_PreshutdownStream();
                    else Main_ExitCurrent(Main_values.Main_Go);

                    Main_values.Play_selectedChannel_id = actionData._id;
                    Main_openStream();
                    break;
                } else if (JSON.parse(actionData).gameIdx) {

                    actionData = JSON.parse(actionData);

                    GameIdx = actionData.gameIdx;
                    SwitchScreen = (GameIdx !== Main_values.Main_gameSelected);
                    ExitScreen = (Main_values.Main_Go !== Main_aGame);
                    BeforeScreen = Main_values.Main_Go;
                    Main_values.Main_gameSelected = GameIdx;
                    Main_values.Main_Go = Main_aGame;

                    if (Main_values.Search_isSearching) Main_RestoreTopLabel();
                    Main_values.Search_isSearching = false;
                    Main_values.Games_return = false;

                    if (ExitScreen) {
                        Main_values.Main_Before = BeforeScreen;
                        Main_ExitCurrent(BeforeScreen);
                    }

                    if (Play_isOn) Play_shutdownStream();
                    else if (PlayVod_isOn) PlayVod_shutdownStream();
                    else if (PlayClip_isOn) PlayClip_shutdownStream();
                    else if (SwitchScreen) Main_SwitchScreen();
                    break;
                } else if (JSON.parse(actionData).screenIdx) {

                    actionData = JSON.parse(actionData);

                    ScreenIdx = actionData.screenIdx;
                    SwitchScreen = (ScreenIdx !== Main_values.Main_Go);
                    ExitScreen = Main_values.Main_Go;
                    Main_values.Main_Go = ScreenIdx;

                    if (SwitchScreen) {
                        Main_values.Main_Before = ExitScreen;
                        Main_ExitCurrent(ExitScreen);
                    }

                    if (Play_isOn) Play_shutdownStream();
                    else if (PlayVod_isOn) PlayVod_shutdownStream();
                    else if (PlayClip_isOn) PlayClip_shutdownStream();
                    else if (SwitchScreen) Main_SwitchScreen();
                    break;
                }
            }
        }
    }
}

function SmartHub_SetBasePreviewData() {
    SmartHub_BasePreviewData = {
        "sections": [{
                "title": '', //live
                "tiles": []
            }, {
                "title": '', //host
                "tiles": []
            }, {
                "title": '', //games
                "tiles": []
            },
            {},
            SmartHub_Tile(STR_USER, STR_GO_TO + STR_USER, "", "16by9", IMG_SMART_USER, {
                "screenIdx": Main_Users
            })
        ]
    };

    SmartHub_BasePreviewData.sections[3] = SmartHub_BasePreviewDataNoUser.sections[0];
    SmartHub_BasePreviewData.sections[5] = SmartHub_BasePreviewDataNoUser.sections[2];
    SmartHub_BasePreviewData.sections[6] = SmartHub_BasePreviewDataNoUser.sections[3];
    SmartHub_BasePreviewData.sections[7] = SmartHub_BasePreviewDataNoUser.sections[4];
    SmartHub_BasePreviewData.sections[8] = SmartHub_BasePreviewDataNoUser.sections[5];
}

function SmartHub_SetNoUserPreviewData() {
    SmartHub_BasePreviewDataNoUser = {
        "sections": [
            SmartHub_Tile(STR_LIVE, STR_GO_TO + STR_LIVE, "", "4by3", IMG_SMART_LIVE, {
                "screenIdx": Main_Live
            }),
            SmartHub_Tile(STR_USER_ADD, STR_GO_TO + STR_USER_ADD, STR_ADD_USER_SH, "4by3", IMG_SMART_ADD_USER, {
                "screenIdx": Main_addUser
            }),
            SmartHub_Tile(STR_FEATURED, STR_GO_TO + STR_FEATURED, "", "4by3", IMG_SMART_FEATURED, {
                "screenIdx": Main_Featured
            }),
            SmartHub_Tile(STR_GAMES, STR_GO_TO + STR_GAMES, "", "4by3", IMG_SMART_GAME, {
                "screenIdx": Main_games
            }),
            SmartHub_Tile(STR_VIDEOS, STR_GO_TO + STR_VIDEOS, "", "4by3", IMG_SMART_VIDEO, {
                "screenIdx": Main_Vod
            }),
            SmartHub_Tile(STR_CLIPS, STR_GO_TO + STR_CLIPS, "", "4by3", IMG_SMART_CLIP, {
                "screenIdx": Main_Clip
            })
        ]
    };
}

function SmartHub_Tile(title, tiles_title, subtitle, image_size, image_url, action) {
    return {
        "title": title,
        "tiles": [SmartHub_SubTile(tiles_title, subtitle, image_size, image_url, action)]
    };
}

function SmartHub_SubTile(tiles_title, subtitle, image_size, image_url, action) {
    return {
        "title": tiles_title,
        "subtitle": subtitle,
        "image_ratio": image_size,
        "image_url": image_url,
        "action_data": JSON.stringify(action),
        "is_playable": false
    };
}