/* jshint eqeqeq: true, undef: true, unused: true, node: true, browser: true */
//teste();

function teste() {
    var Main_selectedChannel = 'msmister';
    var Main_ItemsLimitVideo = 45;

    var Base_obj = {
        posX: 0,
        posY: 0,
        dataEnded: false,
        idObject: {},
        emptyCellVector: [],
        loadingData: false,
        itemsCount: 0,
        loadingDataTryMax: 5,
        loadingDataTimeout: 3500,
        MaxOffset: 0,
        emptyContent: false,
        itemsCountCheck: false,
        FirstLoad: false
    };

    var Base_clip_obj = {
        cursor: null,
        periodNumber: 5,
        period: 'week',
        type: 1 //2 = clip, 0 = live, 1 = vod
    };

    var Clip = assign({
        ids: ['c_thumbdiv', 'c_img', 'c_infodiv', 'c_title', 'c_createdon', 'c_game', 'c_viwers', 'c_duration', 'c_cell', 'cpempty_', 'clip_scroll', 'c_lang'],
        table: 'stream_table_clip',
        base_url: 'https://api.twitch.tv/kraken/clips/top?limit='
    }, Base_obj);

    Clip = assign(Clip, Base_clip_obj);

    var ChannelClip = assign({
        ids: ['sp_thumbdiv', 'sp_img', 'sp_infodiv', 'sp_title', 'sp_createdon', 'sp_game', 'sp_viwers', 'sp_duration', 'sp_cell', 'spempty_', 'channel_clip_scroll', 'sp_lang'],
        table: 'stream_table_channel_clip',
        base_url: 'https://api.twitch.tv/kraken/clips/top?channel=',
        set_url: function() {
            this.url = this.base_url + encodeURIComponent(Main_selectedChannel) + '&limit=' + Main_ItemsLimitVideo + '&period=' +
                encodeURIComponent(this.period) + (this.cursor === null ? '' : '&cursor=' + encodeURIComponent(this.cursor)) +
                '&' + Math.round(Math.random() * 1e7);
        }
    }, Base_obj);


    ChannelClip = assign(ChannelClip, Base_clip_obj);

    console.log(Clip.type);
    console.log(Clip.base_url);

    console.log(ChannelClip.type);
    console.log(ChannelClip.url);
    ChannelClip.set_url();
    console.log(ChannelClip.url);

    Main_selectedChannel = 'notstreamer';
    Main_ItemsLimitVideo = 90;

    ChannelClip.set_url();
    console.log(ChannelClip.url);

    var inUseObj = ChannelClip;

    inUseObj.type = 2;
    console.log(ChannelClip.type);

    inUseObj.type = 45;
    console.log(ChannelClip.type);
}

function assign() {
    var retObj = {};
    for (var i = 0; i < arguments.length; i += 1) {

        var obj = arguments[i],
            keys = Object.keys(obj);

        for (var j = 0; j < keys.length; j += 1)
            retObj[keys[j]] = obj[keys[j]];

    }
    return retObj;
}

var Clip_cursor = null;
var Main_clientId = "ypvnuqrh98wqz1sr0ov3fgfu4jh1yx";
var Main_clientIdHeader = 'Client-ID';
var Main_AcceptHeader = 'Accept';
var Main_TwithcV5Json = 'application/vnd.twitchtv.v5+json';
var obj = null;

Clip_loadDataRequest();

function Clip_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/clips/top?limit=5&period=week' +
            (Clip_cursor ? '&cursor=' + encodeURIComponent(Clip_cursor) : ''), true);

        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Clip_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else console.log('error');
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        console.log('catch ' + e);
    }
}

function Clip_loadDataSuccess(responseText) {
    console.log(responseText);
    if (obj){
        obj = obj.clips.concat(JSON.parse(responseText).clips); 
        console.log('if');
        console.log(obj);
        logss(obj);
    } else {
        obj = JSON.parse(responseText);
        Clip_cursor = obj._cursor;
        console.log('else');
        console.log(obj);
        Clip_loadDataRequest();
    }
}

function logss(obj) {
        for (var i = 0; i < obj.length; i++)
            console.log(obj[i].tracking_id);

    obj = null;
}
