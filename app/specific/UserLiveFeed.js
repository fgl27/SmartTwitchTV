var UserLiveFeed_loadingData;
var UserLiveFeed_loadingDataTry;
var UserLiveFeed_loadingDataTimeout;
var UserLiveFeed_loadChannelOffsset = 0;
var UserLiveFeed_loadingDataTryMax = 5;
var UserLiveFeed_itemsCount = 0;
var UserLiveFeed_dataEnded = false;
var UserLiveFeed_followerChannels = '';
var UserLiveFeed_itemsCountOffset = 0;
var UserLiveFeed_MaxOffset = 0;
var UserLiveFeed_idObject = {};
var UserLiveFeed_status = false;
var UserLiveFeed_imgVector = [];
var UserLiveFeed_LastPos = null;

var UserLiveFeed_ids = ['ulf_thumbdiv', 'ulf_img', 'ulf_infodiv', 'ulf_displayname', 'ulf_streamtitle', 'ulf_streamgame', 'ulf_viwers', 'ulf_quality', 'ulf_cell', 'ulempty_', 'user_live_scroll'];

function UserLiveFeed_StartLoad() {
    if (AddUser_UserIsSet()) {

        if (UserLiveFeed_status) UserLiveFeed_LastPos = JSON.parse(document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos).getAttribute(Main_DataAttribute))[0];
        else UserLiveFeed_LastPos = null;

        Main_empty('user_feed_scroll');
        Main_HideElement('user_feed_scroll');
        UserLiveFeed_loadingData = true;
        Main_ShowElement('dialog_loading_feed');
        UserLiveFeed_loadChannelOffsset = 0;
        UserLiveFeed_itemsCount = 0;
        UserLiveFeed_followerChannels = '';
        UserLiveFeed_itemsCountOffset = 0;
        UserLiveFeed_MaxOffset = 0;
        Play_FeedPos = 0;
        UserLiveFeed_idObject = {};
        UserLiveFeed_imgVector = [];
        Main_ready(function() {
            UserLiveFeed_loadDataPrepare();
            UserLiveFeed_loadChannels();
        });
    }
}

function UserLiveFeed_imgVectorLoad(img_type) {
    var elem;
    for (var i = 0; i < UserLiveFeed_imgVector.length; i++) {
        elem = document.getElementById(UserLiveFeed_imgVector[i].id);
        if (elem !== null) Main_loadImg(elem, UserLiveFeed_imgVector[i].src + Main_randomimg, img_type);
    }
}

function UserLiveFeed_imgVectorPush(id, src) {
    UserLiveFeed_imgVector.push({
        'id': id,
        'src': src
    });
}

function UserLiveFeed_loadDataPrepare() {
    UserLiveFeed_loadingDataTry = 0;
    UserLiveFeed_loadingDataTimeout = 3500;
}

function UserLiveFeed_loadChannels() {
    var theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].id) +
        '/follows/channels?limit=100&offset=' + UserLiveFeed_loadChannelOffsset + '&sortby=created_at';
    var xmlHttp;
    if (Main_Android) {

        xmlHttp = Android.mreadUrl(theUrl, UserLiveFeed_loadingDataTimeout, 2, null);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            UserLiveFeed_loadDataError();
            return;
        }

        if (xmlHttp.status === 200) {
            UserLiveFeed_loadChannelLive(xmlHttp.responseText);
        } else {
            UserLiveFeed_loadDataError();
        }


    } else {

        xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = UserLiveFeed_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserLiveFeed_loadChannelLive(xmlHttp.responseText);
                    return;
                } else {
                    UserLiveFeed_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    }
}

function UserLiveFeed_loadDataError() {
    UserLiveFeed_loadingDataTry++;
    if (UserLiveFeed_loadingDataTry < UserLiveFeed_loadingDataTryMax) {
        UserLiveFeed_loadingDataTimeout += 500;
        UserLiveFeed_loadChannels();
    } else {
        UserLiveFeed_loadingData = false;
        if (!UserLiveFeed_itemsCount) {
            Main_HideElement('dialog_loading_feed');
            Play_showWarningDialog(STR_REFRESH_PROBLEM);
            window.setTimeout(function() {
                Play_HideWarningDialog();
            }, 2000);
        } else {
            UserLiveFeed_dataEnded = true;
            UserLiveFeed_loadDataSuccessFinish();
        }
    }
}

function UserLiveFeed_loadChannelLive(responseText) {
    var response = JSON.parse(responseText).follows,
        response_items = response.length;

    if (response_items) { // response_items here is not always 99 because banned channels, so check until it is 0
        var ChannelTemp = '',
            x = 0;

        for (x; x < response_items; x++) {
            ChannelTemp = response[x].channel._id + ',';
            if (UserLiveFeed_followerChannels.indexOf(ChannelTemp) === -1) UserLiveFeed_followerChannels += ChannelTemp;
        }

        UserLiveFeed_loadChannelOffsset += response_items;
        UserLiveFeed_loadDataPrepare();
        UserLiveFeed_loadChannels();
    } else { // end
        UserLiveFeed_followerChannels = UserLiveFeed_followerChannels.slice(0, -1);
        UserLiveFeed_loadDataPrepare();
        Main_ready(UserLiveFeed_loadChannelUserLive);
    }
}

function UserLiveFeed_loadChannelUserLive() {

    var offset = UserLiveFeed_itemsCount + UserLiveFeed_itemsCountOffset;
    if (offset && offset > (UserLiveFeed_MaxOffset - 1)) {
        offset = UserLiveFeed_MaxOffset - Main_ItemsLimitVideo;
        UserLiveFeed_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(UserLiveFeed_followerChannels) + '&limit=100&offset=' + offset + '&stream_type=all';

    var xmlHttp;
    if (Main_Android) {

        xmlHttp = Android.mreadUrl(theUrl, UserLiveFeed_loadingDataTimeout, 2, null);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            UserLiveFeed_loadDataErrorLive();
            return;
        }

        if (xmlHttp.status === 200) {
            UserLiveFeed_loadDataSuccess(xmlHttp.responseText);
        } else {
            UserLiveFeed_loadDataErrorLive();
        }


    } else {
        xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = UserLiveFeed_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserLiveFeed_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    UserLiveFeed_loadDataErrorLive();
                }
            }
        };

        xmlHttp.send(null);
    }
}

function UserLiveFeed_loadDataErrorLive() {
    UserLiveFeed_loadingDataTry++;
    if (UserLiveFeed_loadingDataTry < UserLiveFeed_loadingDataTryMax) {
        UserLiveFeed_loadingDataTimeout += 500;
        UserLiveFeed_loadChannelUserLive();
    } else {
        UserLiveFeed_loadingData = false;
        Main_HideElement('dialog_loading_feed');
        Play_showWarningDialog(STR_REFRESH_PROBLEM);
        window.setTimeout(function() {
            Play_HideWarningDialog();
        }, 2000);
    }
}

function UserLiveFeed_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    UserLiveFeed_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) UserLiveFeed_dataEnded = true;

    UserLiveFeed_itemsCount += response_items;

    var stream, id, doc = document.getElementById("user_feed_scroll");

    for (var i = 0; i < response_items; i++) {
        stream = response.streams[i];
        id = stream.channel._id;
        if (!UserLiveFeed_idObject[id]) {
            UserLiveFeed_idObject[id] = 1;
            if (UserLiveFeed_LastPos !== null && UserLiveFeed_LastPos === stream.channel.name) Play_FeedPos = i;
            doc.appendChild(UserLiveFeed_CreatFeed(i,
                [stream.channel.name, id], UserLiveFeed_ids,
                [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                    Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                    stream.channel.status, stream.game,
                    STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' +
                    STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                    Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)
                ]));
        }
    }

    UserLiveFeed_loadDataSuccessFinish();
}

function UserLiveFeed_loadDataSuccessFinish() {
    Main_ready(function() {
        UserLiveFeed_imgVectorLoad(IMG_404_VIDEO);
        Play_FeedAddFocus();
        UserLiveFeed_loadingData = false;
        UserLiveFeed_status = true;
        Main_HideElement('dialog_loading_feed');
        Main_ShowElement('user_feed_scroll');
        Play_ResetFeedId();
    });
}

function UserLiveFeed_CreatFeed(id, data, idArray, valuesArray) {
    UserLiveFeed_imgVectorPush(idArray[1] + id, valuesArray[0]);

    Main_td = document.createElement('div');
    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify(data));
    Main_td.className = 'user_feed_thumb';
    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_clip" >' +
        '<div><img id="' + idArray[1] + id + '" class="stream_img"></div>' +
        '<div id="' + idArray[2] + id + '" class="stream_text2">' +
        '<div id="' + idArray[3] + id + '" class="stream_channel" style="width: 66%; display: inline-block;">' + valuesArray[1] + '</div>' +
        '<div id="' + idArray[5] + id + '"class="stream_info">' + STR_PLAYING + valuesArray[3] + '</div>' + '</div></div>';

    return Main_td;
}