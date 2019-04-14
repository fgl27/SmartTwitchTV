var UserLiveFeed_loadingData = false;
var UserLiveFeed_loadingDataTry = 0;
var UserLiveFeed_loadingDataTimeout = 3500;
var UserLiveFeed_loadChannelOffsset = 0;
var UserLiveFeed_loadingDataTryMax = 5;
var UserLiveFeed_itemsCount = 0;
var UserLiveFeed_dataEnded = false;
var UserLiveFeed_followerChannels = '';
var UserLiveFeed_itemsCountOffset = 0;
//var UserLiveFeed_MaxOffset = 0;
var UserLiveFeed_idObject = {};
var UserLiveFeed_status = false;
var UserLiveFeed_imgVector = [];
var UserLiveFeed_LastPos = null;
var UserLiveFeed_Feedid;
var UserLiveFeed_ids = ['ulf_thumbdiv', 'ulf_img', 'ulf_infodiv', 'ulf_displayname', 'ulf_streamtitle', 'ulf_streamgame', 'ulf_viwers', 'ulf_quality', 'ulf_cell', 'ulempty_', 'user_live_scroll'];

function UserLiveFeed_StartLoad() {
    if (AddUser_UserIsSet()) {
        window.clearTimeout(UserLiveFeed_Feedid);

        if (UserLiveFeed_status) {
            if (UserLiveFeed_ThumbNull(Play_FeedPos, UserLiveFeed_ids[0]))
                UserLiveFeed_LastPos = JSON.parse(document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos).getAttribute(Main_DataAttribute))[0];
        } else UserLiveFeed_LastPos = null;

        Main_empty('user_feed_scroll');
        UserLiveFeed_status = false;
        document.getElementById('user_feed_scroll').style.left = "2.5px";
        document.getElementById('user_feed').style.bottom = '0.1%';
        Main_ShowElement('dialog_loading_feed');
        UserLiveFeed_loadChannelOffsset = 0;
        UserLiveFeed_itemsCount = 0;
        UserLiveFeed_followerChannels = '';
        UserLiveFeed_itemsCountOffset = 0;
        //UserLiveFeed_MaxOffset = 0;
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
    UserLiveFeed_loadingData = true;
    UserLiveFeed_loadingDataTry = 0;
    UserLiveFeed_loadingDataTimeout = 3500;
}

function UserLiveFeed_loadChannels() {
    var theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].id) +
        '/follows/channels?limit=100&offset=' + UserLiveFeed_loadChannelOffsset + '&sortby=created_at';

    BasehttpGet(theUrl, UserLiveFeed_loadingDataTimeout, 2, null, UserLiveFeed_loadChannelLive, UserLiveFeed_loadDataError);
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

            if (UserLiveFeed_isFeedShow()) {
                Play_showWarningDialog(STR_REFRESH_PROBLEM);
                window.setTimeout(function() {
                    Play_HideWarningDialog();
                }, 2000);
            }
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
    var theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(UserLiveFeed_followerChannels) + '&limit=100&offset=0&stream_type=all';

    BasehttpGet(theUrl, UserLiveFeed_loadingDataTimeout, 2, null, UserLiveFeed_loadDataSuccess, UserLiveFeed_loadDataErrorLive);
}

function UserLiveFeed_loadDataErrorLive() {
    UserLiveFeed_loadingDataTry++;
    if (UserLiveFeed_loadingDataTry < UserLiveFeed_loadingDataTryMax) {
        UserLiveFeed_loadingDataTimeout += 500;
        UserLiveFeed_loadChannelUserLive();
    } else {
        UserLiveFeed_loadingData = false;
        Main_HideElement('dialog_loading_feed');
        if (UserLiveFeed_isFeedShow()) {
            Play_showWarningDialog(STR_REFRESH_PROBLEM);
            window.setTimeout(function() {
                Play_HideWarningDialog();
            }, 2000);
        }
    }
}

function UserLiveFeed_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    //UserLiveFeed_MaxOffset = parseInt(response._total);

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
    UserLiveFeed_loadingData = false;
    UserLiveFeed_status = true;
    UserLiveFeed_imgVectorLoad(IMG_404_VIDEO);
    Main_ready(function() {
        Main_HideElement('dialog_loading_feed');
        UserLiveFeed_FeedAddFocus();
        UserLiveFeed_ResetFeedId();
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

function UserLiveFeed_isFeedShow() {
    return Main_isElementShowing('user_feed');
}

function UserLiveFeed_ShowFeed() {
    var hasuser = AddUser_UserIsSet();

    if (hasuser) {
        if (Play_FeedOldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) UserLiveFeed_status = false;
        Play_FeedOldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
    }

    if (!hasuser || !UserLiveFeed_ThumbNull(0, UserLiveFeed_ids[0])) UserLiveFeed_status = false;

    if (!UserLiveFeed_status && !UserLiveFeed_loadingData) UserLiveFeed_StartLoad();

    if (hasuser) {
        document.getElementById('user_feed').style.bottom = '0.1%';
        Main_ShowElement('user_feed');
        UserLiveFeed_FeedAddFocus();
        UserLiveFeed_Feedid = window.setTimeout(UserLiveFeed_Hide, 7000);
    }
}

function UserLiveFeed_Hide() {
    Main_HideElement('user_feed');
    window.clearTimeout(UserLiveFeed_Feedid);
}

function UserLiveFeed_ResetFeedId() {
    window.clearTimeout(UserLiveFeed_Feedid);
    if (UserLiveFeed_isFeedShow()) UserLiveFeed_Feedid = window.setTimeout(UserLiveFeed_Hide, 7000);
}

function UserLiveFeed_FeedRefreshFocus() {
    window.clearTimeout(UserLiveFeed_Feedid);
    if (!UserLiveFeed_loadingData) UserLiveFeed_StartLoad();
    else {
        window.setTimeout(function() {
            UserLiveFeed_loadingData = false;
        }, 15000);
    }
}

function UserLiveFeed_FeedAddFocus() {
    UserLiveFeed_ResetFeedId();
    if (UserLiveFeed_ThumbNull(Play_FeedPos, UserLiveFeed_ids[0]))
        Main_AddClass(UserLiveFeed_ids[0] + Play_FeedPos, 'feed_thumbnail_focused');
    else return;

    if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedSetPos();
    else if (Main_isElementShowing('scene2')) UserLiveFeed_FeedFindPos();
}

function UserLiveFeed_FeedGetPos() {
    var position = 0;

    if (Play_FeedPos < 3) position = 2.5;
    else if (UserLiveFeed_ThumbNull((Play_FeedPos + 2), UserLiveFeed_ids[0]))
        position = (document.getElementById(UserLiveFeed_ids[8] + (Play_FeedPos - 2)).offsetLeft * -1);
    else if (UserLiveFeed_ThumbNull((Play_FeedPos + 1), UserLiveFeed_ids[0]))
        position = (document.getElementById(UserLiveFeed_ids[8] + (Play_FeedPos - 3)).offsetLeft * -1);
    else position = (document.getElementById(UserLiveFeed_ids[8] + (Play_FeedPos - (Play_FeedPos > 3 ? 4 : 3))).offsetLeft * -1);

    return position;
}

function UserLiveFeed_FeedSetPos() {
    var position = UserLiveFeed_FeedGetPos();

    if (position) document.getElementById('user_feed_scroll').style.left = position + "px";
}

function UserLiveFeed_FeedFindPos() {
    //show the element outside of the screen and find the position
    document.getElementById('user_feed').style.bottom = '-1000%';
    Main_ShowElement('user_feed');

    var position = UserLiveFeed_FeedSetPos();

    if (position) document.getElementById('user_feed_scroll').style.left = position + "px";
    document.getElementById('user_feed').style.bottom = '0.1%';
    Main_HideElement('user_feed');
}

function UserLiveFeed_ThumbNull(y, thumbnail) {
    return document.getElementById(thumbnail + y) !== null;
}

function UserLiveFeed_FeedRemoveFocus() {
    if (UserLiveFeed_ThumbNull(Play_FeedPos, UserLiveFeed_ids[0]))
        Main_RemoveClass(UserLiveFeed_ids[0] + Play_FeedPos, 'feed_thumbnail_focused');
}