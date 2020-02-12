//Spacing for reease maker not trow erros frm jshint
var UserLiveFeed_loadingData = false;
var UserLiveFeed_loadingDataId;
var UserLiveFeed_loadingDataTry = 0;
var UserLiveFeed_loadingDataTimeout = 3500;
var UserLiveFeed_loadChannelOffsset = 0;
var UserLiveFeed_loadingDataTryMax = 5;
var UserLiveFeed_followerChannels = '';
var UserLiveFeed_idObject = [];
var UserLiveFeed_status = [];
var UserLiveFeed_LastPos = [];
var UserSidePannel_LastPos = [];
var UserLiveFeed_token = null;
var UserLiveFeed_Feedid;
var UserLiveFeed_FocusClass = 'feed_thumbnail_focused';
var UserLiveFeed_PreventHide = false;

var UserLiveFeed_CheckNotifycation = false;
var UserLiveFeed_WasLiveidObject = {};
var UserLiveFeed_NotifyLiveidObject = [];
var UserLiveFeed_PreloadImgs = [];
var UserLiveFeed_Notify = true;
var UserLiveFeed_NotifyRunning = false;
var UserLiveFeed_NotifyTimeout = 3000;
var UserLiveFeed_FeedHolderDocId;

var UserLiveFeed_FeedPosY = [];
var UserLiveFeed_itemsCount = [];
var UserLiveFeed_obj = {};
var ImageLoaderWorker;
var UserLiveFeed_ImgObj = [];

var UserLiveFeed_ids = ['ulf_thumbdiv', 'ulf_img', 'ulf_infodiv', 'ulf_displayname', 'ulf_streamtitle', 'ulf_streamgame', 'ulf_viwers', 'ulf_quality', 'ulf_cell', 'ulempty_', 'user_live_scroll'];

var UserLiveFeed_side_ids = ['usf_thumbdiv', 'usf_img', 'usf_infodiv', 'usf_displayname', 'usf_streamtitle', 'usf_streamgame', 'usf_viwers', 'usf_quality', 'usf_cell', 'ulempty_', 'user_live_scroll'];

function UserLiveFeed_StartLoad() {
    UserLiveFeed_StartLoadPos(UserLiveFeed_FeedPosX);
}

function UserLiveFeed_StartLoadPos(pos) {
    UserLiveFeed_clearHideFeed();

    UserLiveFeed_CounterDialogRst();
    UserLiveFeed_Showloading(true);
    UserLiveFeedobj_loadDataPrepare();
    UserLiveFeed_obj[pos].load();
}

function UserLiveFeed_Prepare() {
    //User live
    UserLiveFeed_obj[UserLiveFeedobj_UserLivePos] = {};
    UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].load = UserLiveFeedobj_CheckToken;
    UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].show = UserLiveFeedobj_ShowFeed;
    UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].hide = UserLiveFeedobj_HideFeed;
    UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].div = document.getElementById('user_feed_scroll');

    //User Host
    UserLiveFeed_obj[UserLiveFeedobj_UserHostPos] = {};
    UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].load = UserLiveFeedobj_UserHost;
    UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].show = UserLiveFeedobj_ShowUserHost;
    UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].hide = UserLiveFeedobj_HideUserHost;
    UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].div = document.getElementById('user_host_scroll');

    //User a game
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos] = {};
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].load = UserLiveFeedobj_CurrentUserAGame;
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].show = UserLiveFeedobj_ShowCurrentUserAGame;
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].hide = UserLiveFeedobj_HideCurrentUserAGame;
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].div = document.getElementById('user_agames_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].StreamType = 'streams';
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].cell = UserLiveFeedobj_CurrentAGameCell;

    //a game
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos] = {};
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].load = UserLiveFeedobj_CurrentAGame;
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].show = UserLiveFeedobj_ShowCurrentAGame;
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].hide = UserLiveFeedobj_HideCurrentAGame;
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].div = document.getElementById('agame_feed_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].StreamType = 'streams';
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].cell = UserLiveFeedobj_CurrentUserGameCell;

    //User Games
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos] = {};
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].load = UserLiveFeedobj_UserGames;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].show = UserLiveFeedobj_ShowUserGames;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].hide = UserLiveFeedobj_HideUserGames;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].div = document.getElementById('user_games_scroll');

    //Games
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos] = {};
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].load = UserLiveFeedobj_Games;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].show = UserLiveFeedobj_ShowGames;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].hide = UserLiveFeedobj_HideGames;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].div = document.getElementById('games_scroll');

    //Live
    UserLiveFeed_obj[UserLiveFeedobj_LivePos] = {};
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].load = UserLiveFeedobj_Live;
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].show = UserLiveFeedobj_ShowLive;
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].hide = UserLiveFeedobj_HideLive;
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].div = document.getElementById('live_feed_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].StreamType = 'streams';
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].cell = UserLiveFeedobj_LiveCell;

    //Current Game
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos] = {};
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].load = UserLiveFeedobj_CurrentGame;
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].show = UserLiveFeedobj_ShowCurrentGame;
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].hide = UserLiveFeedobj_HideCurrentGame;
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].div = document.getElementById('current_game_feed_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].StreamType = 'streams';
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].cell = UserLiveFeedobj_CurrentGameCell;

    //Featured
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos] = {};
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].load = UserLiveFeedobj_Featured;
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].show = UserLiveFeedobj_ShowFeatured;
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].hide = UserLiveFeedobj_HideFeatured;
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].div = document.getElementById('featured_feed_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].StreamType = 'featured';
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].cell = UserLiveFeedobj_FeaturedCell;

    if (!AddUser_UserIsSet()) UserLiveFeed_FeedPosX = UserLiveFeedobj_LivePos;

    UserLiveFeed_Setworker();
    Main_innerHTML('feed_end_1', STR_SPACE + STR_FEATURED + STR_SPACE);
    Main_innerHTML('feed_end_3', STR_SPACE + STR_LIVE + STR_SPACE);
    Main_innerHTML('feed_end_4', STR_SPACE + STR_USER + STR_SPACE + STR_LIVE + STR_SPACE);
    Main_innerHTML('feed_end_5', STR_SPACE + STR_USER + STR_SPACE + STR_LIVE_HOSTS + STR_SPACE);

    Sidepannel_ScroolDoc = document.getElementById('side_panel_holder');
    Sidepannel_SidepannelDoc = document.getElementById('side_panel');
    Sidepannel_Notify_img = document.getElementById('user_feed_notify_img');
    UserLiveFeed_FeedHolderDocId = document.getElementById('user_feed');
}

function UserLiveFeed_Setworker() {
    //Adapted from https://dev.to/trezy/loading-images-with-web-workers-49ap
    var blobURL = URL.createObjectURL(new Blob(['(',

        function() {
            this.addEventListener('message',
                function(event) {
                    var onload = function(obj) {
                        if (obj.status !== 200) obj.response = null;

                        this.postMessage({
                            url: obj.mData.url,
                            blob: obj.response,
                            id: obj.mData.id,
                        });
                    };

                    var xmlHttp = new XMLHttpRequest();
                    xmlHttp.responseType = 'blob';
                    xmlHttp.mData = event.data;

                    xmlHttp.onreadystatechange = function() {
                        if (xmlHttp.readyState === 4) {
                            onload(xmlHttp);
                        }
                    };

                    xmlHttp.open('GET', xmlHttp.mData.url, true);
                    xmlHttp.timeout = 3000;
                    xmlHttp.ontimeout = function() {};
                    xmlHttp.send();
                }
            );

        }.toString(),

        ')()'], {type: 'application/javascript'}));

    ImageLoaderWorker = new Worker(blobURL);

    ImageLoaderWorker.addEventListener('message',
        function(event) {
            Main_ready(function() {
                var imageData = event.data,
                    imageElement = document.getElementById(imageData.id),
                    objectURL = imageData.blob ? URL.createObjectURL(imageData.blob) : imageData.url;

                if (imageElement) {
                    imageElement.onload = function() {
                        this.onload = null;
                        URL.revokeObjectURL(objectURL);
                    };
                    imageElement.setAttribute('src', objectURL);
                }
            });
        }
    );
}

function UserLiveFeed_LoadImg(pos) {
    for (var i = 0; i < UserLiveFeed_ImgObj[pos].length; i++) {
        ImageLoaderWorker.postMessage(UserLiveFeed_ImgObj[pos][i]);
    }
}

function UserLiveFeed_LoadImgPush(pos, url, id) {
    UserLiveFeed_ImgObj[pos].push({
        id: UserLiveFeed_ids[1] + id,
        url: url.replace("{width}x{height}", Main_VideoSize) + Main_randomimg
    });
}

function UserLiveFeed_LoadImgPushGame(pos, url, id) {
    UserLiveFeed_ImgObj[pos].push({
        id: UserLiveFeed_ids[1] + id,
        url: url.replace("{width}x{height}", Main_GameSize)
    });
}

var UserLiveFeed_ImgSideObj = [];
function UserLiveFeed_LoadImgSidePush(url, id) {
    UserLiveFeed_ImgSideObj.push({
        id: id,
        url: url
    });
}

function UserLiveFeed_LoadImgSide() {
    for (var i = 0; i < UserLiveFeed_ImgSideObj.length; i++) {
        ImageLoaderWorker.postMessage(UserLiveFeed_ImgSideObj[i]);
    }
}

function UserLiveFeed_RefreshLive() {
    if (AddUser_UserIsSet()) {
        UserLiveFeedobj_loadDataPrepare();
        UserLiveFeedobj_CheckToken();
    }
}

function UserLiveFeed_CounterDialogRst() {
    Main_empty('feed_counter');
}

function UserLiveFeed_CounterDialog(pos, total) {
    if (total > 0) Main_textContent('feed_counter', (pos + 1) + '/' + (total));
    else UserLiveFeed_CounterDialogRst();
}

function UserLiveFeed_loadDataSuccessFinish(ShowNotifications, pos) {
    UserLiveFeed_loadingData = false;
    UserLiveFeed_status[pos] = true;

    UserLiveFeed_Showloading(false);
    Main_HideElement('dialog_loading_side_feed');
    Sidepannel_AddFocusFeed(true);
    UserLiveFeed_FeedAddFocus(true, pos);

    if (ShowNotifications) {
        //The app just started or user change don't nottify
        if (UserLiveFeed_CheckNotifycation) UserLiveFeedobj_LiveNotification();
        else {
            UserLiveFeed_NotifyLiveidObject = [];
            UserLiveFeed_CheckNotifycation = true;
        }
    }
}

function UserLiveFeed_GetSize(pos) {
    return UserLiveFeed_itemsCount[pos];
}

function UserLiveFeed_CreatFeed(id, data, ishosting) {
    if (!data[1]) data[1] = data[6];
    var div = document.createElement('div');

    div.setAttribute('id', UserLiveFeed_ids[8] + id);
    div.setAttribute(Main_DataAttribute, JSON.stringify(data));

    div.className = 'user_feed_thumb';
    div.innerHTML = '<div id="' + UserLiveFeed_ids[0] + id + '" class="stream_thumbnail_player_feed" >' +
        '<div class="stream_thumbnail_live_img"><img id="' + UserLiveFeed_ids[1] + id +
        '" alt="" class="stream_img" onerror="this.onerror=null;this.src=\'' + IMG_404_VIDEO + '\';"></div>' +
        '<div id="' + UserLiveFeed_ids[2] + id + '" class="player_live_feed_text"><span class="stream_spam_text_holder">' +
        '<div id="' + UserLiveFeed_ids[3] + id + '" class="stream_info_live_name"' +
        (ishosting ? ' style="max-height: 2.4em; overflow: hidden; white-space: normal;' : '') + '">' + Main_ReplaceLargeFont(data[1]) + '</div>' +
        '<div id="' + UserLiveFeed_ids[4] + id + '"class="stream_info_live_title" ' + (ishosting ? 'style="max-height: 1.2em;"' : '') +
        '>' + Main_ReplaceLargeFont(twemoji.parse(data[2])) + '</div><div style="line-height: 1.6ch;"><div id="' +
        UserLiveFeed_ids[5] + id + '"class="stream_info_live" style="width: 70.75%; display: inline-block;">' + data[3] +
        '</div><div "class="stream_info_live " style="width:29%; float: right; text-align: right; display: inline-block; font-size: 75%; ">' +
        '<i class="icon-' + (!data[8] ? 'circle" style="color: ' + (ishosting ? '#FED000' : 'red') + ';' : 'refresh" style="') + ' font-size: 75%; "></i>' +
        STR_SPACE + Main_addCommas(data[13]) + '</div></div></span></div></div>';

    return div;
}

function UserLiveFeed_isFeedShow() {
    return !Main_A_includes_B(UserLiveFeed_FeedHolderDocId.className, 'user_feed_hide');
}

function UserLiveFeed_ShowFeed() {
    UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();
}

function UserLiveFeed_Show() {
    if (!Main_isElementShowingWithEle(UserLiveFeed_FeedHolderDocId)) Main_ShowElementWithEle(UserLiveFeed_FeedHolderDocId);
    Main_RemoveClassWithEle(UserLiveFeed_FeedHolderDocId, 'user_feed_hide');
}

function UserLiveFeed_Hide() {
    Main_AddClassWitEle(UserLiveFeed_FeedHolderDocId, 'user_feed_hide');
}

function UserLiveFeed_ResetFeedId() {
    UserLiveFeed_clearHideFeed();
    if (!UserLiveFeed_PreventHide) UserLiveFeed_setHideFeed();
}

function UserLiveFeed_clearHideFeed() {
    window.clearTimeout(UserLiveFeed_Feedid);
}

function UserLiveFeed_setHideFeed() {
    if (UserLiveFeed_isFeedShow()) UserLiveFeed_Feedid = window.setTimeout(UserLiveFeed_Hide, 10000);
}

function UserLiveFeed_FeedRefresh() {
    UserLiveFeed_clearHideFeed();
    if (!UserLiveFeed_loadingData) UserLiveFeed_StartLoad();
    else {
        window.clearTimeout(UserLiveFeed_loadingDataId);
        UserLiveFeed_loadingDataId = window.setTimeout(function() {
            UserLiveFeed_loadingData = false;
        }, 15000);
    }
}

function UserLiveFeed_FeedAddFocus(skipAnimation, pos) {
    if (!UserLiveFeed_ThumbNull(pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_ids[0])) return;

    if (!Play_isEndDialogVisible() || !Play_EndFocus)
        Main_AddClass(UserLiveFeed_ids[0] + pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_FocusClass);

    UserLiveFeed_FeedSetPos(skipAnimation, pos);
    UserLiveFeed_CounterDialog(UserLiveFeed_FeedPosY[pos], UserLiveFeed_itemsCount[pos]);
    UserLiveFeed_ResetFeedId();
}

function UserLiveFeed_FeedRemoveFocus(pos) {
    if (UserLiveFeed_ThumbNull(pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_ids[0]))
        Main_RemoveClass(UserLiveFeed_ids[0] + pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_FocusClass);
}

function UserLiveFeed_FeedGetPos(pos) {
    if (UserLiveFeed_FeedPosX === UserLiveFeedobj_UserGamesPos ||
        UserLiveFeed_FeedPosX === UserLiveFeedobj_GamesPos) return UserLiveFeed_FeedGetPosGame(pos);
    var position = 0;

    if (UserLiveFeed_FeedPosY[pos] < 3) position = 2.5;
    else if (UserLiveFeed_ThumbNull((pos + '_' + (UserLiveFeed_FeedPosY[pos] + 2)), UserLiveFeed_ids[0]))
        position = (document.getElementById(UserLiveFeed_ids[8] + pos + '_' + (UserLiveFeed_FeedPosY[pos] - 2)).offsetLeft * -1);
    else if (UserLiveFeed_ThumbNull(pos + '_' + (UserLiveFeed_FeedPosY[pos] + 1), UserLiveFeed_ids[0]))
        position = (document.getElementById(UserLiveFeed_ids[8] + pos + '_' + (UserLiveFeed_FeedPosY[pos] - 3)).offsetLeft * -1);
    else position = (document.getElementById(UserLiveFeed_ids[8] + pos + '_' + (UserLiveFeed_FeedPosY[pos] - (UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX] > 3 ? 4 : 3))).offsetLeft * -1);

    return position;
}

function UserLiveFeed_FeedGetPosGame(pos) {
    var position = 0;

    if (UserLiveFeed_FeedPosY[pos] < 5)
        position = 0;
    else if (UserLiveFeed_ThumbNull((pos + '_' + (UserLiveFeed_FeedPosY[pos] + 4)), UserLiveFeed_ids[0]))
        position = (document.getElementById(UserLiveFeed_ids[8] + pos + '_' + (UserLiveFeed_FeedPosY[pos] - 4)).offsetLeft * -1);
    else if (UserLiveFeed_ThumbNull(pos + '_' + (UserLiveFeed_FeedPosY[pos] + 3), UserLiveFeed_ids[0]))
        position = (document.getElementById(UserLiveFeed_ids[8] + pos + '_' + (UserLiveFeed_FeedPosY[pos] - 4)).offsetLeft * -1);
    else {
        var lessPos = 5;
        var total = UserLiveFeed_GetSize(UserLiveFeed_FeedPosX);

        if (total < 8) {
            lessPos = UserLiveFeed_FeedPosY[pos];
        } else if (UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX] > 5) {
            lessPos = lessPos + (3 - (total - UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]));
        }
        position = (document.getElementById(UserLiveFeed_ids[8] + pos + '_' + (UserLiveFeed_FeedPosY[pos] - lessPos)).offsetLeft * -1);
    }

    return position + 2.5;
}

function UserLiveFeed_FeedSetPos(skipAnimation, pos) {
    var position = UserLiveFeed_FeedGetPos(pos);

    if (!skipAnimation && Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
        !Screens_ChangeFocusAnimationFast) {
        Screens_ChangeFocusAnimationFinished = false;
        Screens_ChangeFocusAnimationFast = true;

        UserLiveFeed_obj[pos].div.style.transition = '';

        window.setTimeout(function() {
            Screens_ChangeFocusAnimationFinished = true;
        }, 200); //Same value as user_feed_scroll
    } else {
        if (skipAnimation) Screens_ChangeFocusAnimationFast = false;
        UserLiveFeed_obj[pos].div.style.transition = 'none';
    }

    if (position) UserLiveFeed_obj[pos].div.style.transform = 'translateX(' + (position / BodyfontSize) + "em)";
}

function UserLiveFeed_ThumbNull(y, thumbnail) {
    return document.getElementById(thumbnail + y) !== null;
}

function UserLiveFeed_SetFeedPicText() {
    Main_innerHTML('icon_feed_refresh', '<div class="strokedelinebig" style="vertical-align: middle; display: inline-block;"><i class="icon-refresh" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_REFRESH + ':' + STR_HOLD_UP + STR_SPACE + STR_SPACE + '</div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block;"><i class="icon-pp" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_PICTURE_LIVE_FEED + '</div>');
}

function UserLiveFeed_Unset() {
    Main_IconLoad('icon_feed_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_HOLD_UP);
}

function UserLiveFeed_SetMulti() {
    Main_IconLoad('icon_feed_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_HOLD_UP + STR_MULTI_TITLE);
}

function UserLiveFeed_SetHoldUp() {
    Main_IconLoad('icon_feed_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_HOLD_UP + STR_FEED_END_DIALOG);
}

function UserLiveFeed_KeyRightLeft(Adder) {
    UserLiveFeed_ResetFeedId();
    if (Screens_ChangeFocusAnimationFinished && !UserLiveFeed_loadingData) {
        var NextPos = UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX] + Adder;
        if (NextPos > (UserLiveFeed_GetSize(UserLiveFeed_FeedPosX) - 1) || NextPos < 0) return;

        UserLiveFeed_FeedRemoveFocus(UserLiveFeed_FeedPosX);
        UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX] = NextPos;
        UserLiveFeed_FeedAddFocus(false, UserLiveFeed_FeedPosX);
    }
}

function UserLiveFeed_KeyUpDown(Adder) {
    UserLiveFeed_ResetFeedId();
    if (Screens_ChangeFocusAnimationFinished && !UserLiveFeed_loadingData) {

        var NextPos = UserLiveFeed_FeedPosX + Adder,
            userSet = AddUser_UserIsSet();

        if (NextPos > (userSet ? (UserLiveFeedobj_CurrentUserAGameEnable ? (UserLiveFeedobj_MAX + 1) : UserLiveFeedobj_MAX) : UserLiveFeedobj_MAX_No_user)) {
            NextPos = UserLiveFeedobj_CurrentAGameEnable ? 0 : 1;
            if (!userSet) Play_showWarningDialog(STR_NOKUSER_WARN, 1000);
        } else if (NextPos < (UserLiveFeedobj_CurrentAGameEnable ? 0 : 1)) {
            NextPos = userSet ? (UserLiveFeedobj_CurrentUserAGameEnable ? (UserLiveFeedobj_MAX + 1) : UserLiveFeedobj_MAX) : UserLiveFeedobj_MAX_No_user;
            if (!userSet) Play_showWarningDialog(STR_NOKUSER_WARN, 1000);
        }

        if (NextPos === UserLiveFeedobj_CurrentGamePos && Play_data.data[3] === '') {
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
            UserLiveFeed_FeedPosX = NextPos;
            UserLiveFeed_KeyUpDown(Adder);
            return;
        }

        if (UserLiveFeed_FeedPosX === UserLiveFeedobj_UserAGamesPos && Adder === -1) {
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
            UserLiveFeed_FeedPosX = NextPos;
            UserLiveFeed_KeyUpDown(Adder);
            return;
        }

        if (UserLiveFeed_FeedPosX === UserLiveFeedobj_AGamesPos && Adder === 1) {
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
            UserLiveFeed_FeedPosX = NextPos;
            UserLiveFeed_KeyUpDown(Adder);
            return;
        }

        UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
        UserLiveFeed_FeedPosX = NextPos;

        if (UserLiveFeed_FeedPosX === UserLiveFeedobj_UserGamesPos && UserLiveFeedobj_CurrentUserAGameEnable) {
            UserLiveFeed_FeedPosX = UserLiveFeedobj_UserAGamesPos;
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();
            return;
        } else if (UserLiveFeed_FeedPosX === UserLiveFeedobj_GamesPos && UserLiveFeedobj_CurrentAGameEnable) {
            UserLiveFeed_FeedPosX = UserLiveFeedobj_AGamesPos;
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();
            return;
        }

        Main_HideElement('icon_feed_back');
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();
    }
}

function UserLiveFeed_KeyEnter(pos) {
    var doc;
    if (pos === UserLiveFeedobj_UserGamesPos) {
        doc = document.getElementById(UserLiveFeed_ids[8] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]);
        if (doc !== null) UserLiveFeedobj_CurrentUserAGameNameEnter = JSON.parse(doc.getAttribute(Main_DataAttribute))[0];

        if (doc === null || Main_A_equals_B(UserLiveFeedobj_CurrentUserAGameNameEnter, '')) {
            Play_showWarningDialog(STR_NO_GAME, 1000);
            return;
        }
        UserLiveFeedobj_CurrentUserAGameEnable = true;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
        UserLiveFeed_FeedPosX = UserLiveFeedobj_UserAGamesPos;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();

    } else if (pos === UserLiveFeedobj_UserAGamesPos) {

        Main_HideElement('icon_feed_back');
        UserLiveFeedobj_CurrentUserAGameEnable = false;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
        UserLiveFeed_FeedPosX = UserLiveFeedobj_UserGamesPos;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();

    } else if (pos === UserLiveFeedobj_GamesPos) {
        doc = document.getElementById(UserLiveFeed_ids[8] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]);
        if (doc !== null) UserLiveFeedobj_CurrentAGameNameEnter = JSON.parse(doc.getAttribute(Main_DataAttribute))[0];

        if (doc === null || Main_A_equals_B(UserLiveFeedobj_CurrentAGameNameEnter, '')) {
            Play_showWarningDialog(STR_NO_GAME, 1000);
            return;
        }

        UserLiveFeedobj_CurrentAGameEnable = true;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
        UserLiveFeed_FeedPosX = UserLiveFeedobj_AGamesPos;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();

    } else if (pos === UserLiveFeedobj_AGamesPos) {

        Main_HideElement('icon_feed_back');
        UserLiveFeedobj_CurrentAGameEnable = false;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
        UserLiveFeed_FeedPosX = UserLiveFeedobj_GamesPos;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();

    }
    UserLiveFeed_ResetFeedId();
}

function UserLiveFeed_Showloading(show) {
    if (Main_IsNotBrowser) {
        try {
            Android.mshowLoadingBotton(show);
        } catch (e) {
            if (show) Main_ShowElement('dialog_loading_feed');
            else Main_HideElement('dialog_loading_feed');
        }
    } else {
        if (show) Main_ShowElement('dialog_loading_feed');
        else Main_HideElement('dialog_loading_feed');
    }
}
