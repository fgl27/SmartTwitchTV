//Spacing for reease maker not trow erros frm jshint
var UserLiveFeed_loadingData = false;
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
var UserLiveFeed_ShowSmallPlayer = true;
var UserLiveFeed_DisableSmallPlayerMulti = false;

var UserLiveFeed_CheckNotifycation = false;
var UserLiveFeed_WasLiveidObject = {};
var UserLiveFeed_NotifyLiveidObject = [];
var UserLiveFeed_PreloadImgs = [];
var UserLiveFeed_Notify = true;
var UserLiveFeed_NotifyRunning = false;
var UserLiveFeed_NotifyTimeout = 3000;
var UserLiveFeed_FeedHolderDocId;
var UserLiveFeed_AnimationTimeout = 200;//Same value as user_feed_scroll

var UserLiveFeed_FeedPosY = [];
var UserLiveFeed_itemsCount = [];
var UserLiveFeed_obj = {};
var UserLiveFeed_cell = [];
var UserLiveFeed_cellVisible = [];
var UserLiveFeed_FeedSetPosLast = [];

var UserLiveFeed_ids = [
    'ulf_thumbdiv',//0
    'ulf_img',//1
    'ulf_infodiv',//2
    'ulf_displayname',//3
    'ulf_streamtitle',//4
    'ulf_streamgame',//5
    'ulf_viwers',//6
    'ulf_quality',//7
    'ulf_cell',//8
    'ulempty_',//9
    'user_live_scroll'//10
];

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

    for (var i = 0; i < (UserLiveFeedobj_UserAGamesPos + 1); i++) {
        UserLiveFeed_obj[i] = {};
        UserLiveFeed_idObject[i] = {};
        UserLiveFeed_itemsCount[i] = 0;
        UserLiveFeed_cell[i] = [];
        UserLiveFeed_cellVisible[i] = 7;
        UserLiveFeed_obj[i].AddCell = UserLiveFeed_FeedAddCellVideo;
        UserLiveFeed_obj[i].before = 3;
        UserLiveFeed_obj[i].IsGame = false;
        UserLiveFeed_obj[i].AddCellsize = 0;
        UserLiveFeed_obj[i].offset = 0;
        UserLiveFeed_obj[i].loadingMore = false;
        UserLiveFeed_obj[i].dataEnded = false;
        UserLiveFeed_obj[i].MaxOffset = 0;
        UserLiveFeed_FeedSetPosLast[i] = 0;
        UserLiveFeed_obj[i].offsettopFontsize = 0;
    }

    //User live
    UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].load = UserLiveFeedobj_CheckToken;
    UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].show = UserLiveFeedobj_ShowFeed;
    UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].hide = UserLiveFeedobj_HideFeed;
    UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].div = document.getElementById('user_feed_scroll');

    //User history
    UserLiveFeed_obj[UserLiveFeedobj_UserHistoryPos].load = UserLiveFeedobj_History;
    UserLiveFeed_obj[UserLiveFeedobj_UserHistoryPos].show = UserLiveFeedobj_ShowHistory;
    UserLiveFeed_obj[UserLiveFeedobj_UserHistoryPos].hide = UserLiveFeedobj_HideHistory;
    UserLiveFeed_obj[UserLiveFeedobj_UserHistoryPos].checkHistory = true;
    UserLiveFeed_obj[UserLiveFeedobj_UserHistoryPos].div = document.getElementById('user_history_scroll');

    //User Host
    UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].load = UserLiveFeedobj_UserHost;
    UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].show = UserLiveFeedobj_ShowUserHost;
    UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].hide = UserLiveFeedobj_HideUserHost;
    UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].div = document.getElementById('user_host_scroll');

    //User a game
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].load = UserLiveFeedobj_CurrentUserAGame;
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].show = UserLiveFeedobj_ShowCurrentUserAGame;
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].hide = UserLiveFeedobj_HideCurrentUserAGame;
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].div = document.getElementById('user_agames_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].StreamType = 'streams';
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].cell = UserLiveFeedobj_CurrentAGameCell;
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].HasMore = true;

    //a game
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].load = UserLiveFeedobj_CurrentAGame;
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].show = UserLiveFeedobj_ShowCurrentAGame;
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].hide = UserLiveFeedobj_HideCurrentAGame;
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].div = document.getElementById('agame_feed_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].StreamType = 'streams';
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].cell = UserLiveFeedobj_CurrentUserGameCell;
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].HasMore = true;

    //User Games
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].load = UserLiveFeedobj_UserGames;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].show = UserLiveFeedobj_ShowUserGames;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].hide = UserLiveFeedobj_HideUserGames;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].div = document.getElementById('user_games_scroll');
    UserLiveFeed_cellVisible[UserLiveFeedobj_UserGamesPos] = 10;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].before = 5;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].AddCell = UserLiveFeed_FeedAddCellGame;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].IsGame = true;

    //Games
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].load = UserLiveFeedobj_Games;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].show = UserLiveFeedobj_ShowGames;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].hide = UserLiveFeedobj_HideGames;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].div = document.getElementById('games_scroll');
    UserLiveFeed_cellVisible[UserLiveFeedobj_GamesPos] = 10;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].before = 5;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].AddCell = UserLiveFeed_FeedAddCellGame;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].IsGame = true;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].HasMore = true;

    //Live
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].load = UserLiveFeedobj_Live;
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].show = UserLiveFeedobj_ShowLive;
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].hide = UserLiveFeedobj_HideLive;
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].div = document.getElementById('live_feed_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].StreamType = 'streams';
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].cell = UserLiveFeedobj_LiveCell;
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].HasMore = true;

    //Current Game
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].load = UserLiveFeedobj_CurrentGame;
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].show = UserLiveFeedobj_ShowCurrentGame;
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].hide = UserLiveFeedobj_HideCurrentGame;
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].div = document.getElementById('current_game_feed_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].StreamType = 'streams';
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].cell = UserLiveFeedobj_CurrentGameCell;
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].HasMore = true;

    //Featured
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].load = UserLiveFeedobj_Featured;
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].show = UserLiveFeedobj_ShowFeatured;
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].hide = UserLiveFeedobj_HideFeatured;
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].div = document.getElementById('featured_feed_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].StreamType = 'featured';
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].cell = UserLiveFeedobj_FeaturedCell;

    if (!AddUser_UserIsSet()) UserLiveFeed_FeedPosX = UserLiveFeedobj_LivePos;

    Main_innerHTML('feed_end_1', STR_FEATURED);
    Main_innerHTML('feed_end_3', STR_LIVE);
    Main_innerHTML('feed_end_4', STR_USER + STR_SPACE + STR_LIVE);
    Main_innerHTML('feed_end_5', STR_USER + STR_SPACE + STR_HISTORY);
    Main_innerHTML('feed_end_6', STR_USER + STR_SPACE + STR_LIVE_HOSTS);

    Sidepannel_ScroolDoc = document.getElementById('side_panel_holder');
    Sidepannel_SidepannelDoc = document.getElementById('side_panel');
    Sidepannel_Notify_img = document.getElementById('user_feed_notify_img');
    UserLiveFeed_FeedHolderDocId = document.getElementById('user_feed');
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

    var len = UserLiveFeed_cell[pos].length;
    if (len) {
        //Start checking from left to right
        var min = Math.max(0, UserLiveFeed_FeedPosY[pos] - UserLiveFeed_obj[pos].before),
            max = Math.min(len, min + UserLiveFeed_cellVisible[pos]),
            i, j = 0;

        // if less then UserLiveFeed_cellVisible check right to left
        if ((max - min) < UserLiveFeed_cellVisible[pos]) {
            max = len;
            min = Math.max(0, max - UserLiveFeed_cellVisible[pos]);
        }

        for (i = min; i < max; i++) {
            if (UserLiveFeed_cell[pos][i]) {
                UserLiveFeed_obj[pos].div.appendChild(UserLiveFeed_cell[pos][i]);
                UserLiveFeed_cell[pos][i].style.position = '';
                UserLiveFeed_cell[pos][i].style.transition = 'none';
            }
        }

        if (!UserLiveFeed_obj[pos].AddCellsize) {
            var temp = Main_isElementShowingWithEle(UserLiveFeed_obj[pos].div);
            if (!temp) UserLiveFeed_obj[pos].div.classList.remove('hide');

            //Show screen offseted to calculated Screens_setOffset as display none doesn't allow calculation
            if (!Main_isScene2DocShown()) {
                Main_Scene2Doc.style.transform = 'translateY(-1000%)';
                Main_ShowElementWithEle(Main_Scene2Doc);

                UserLiveFeed_obj[pos].AddCellsize =
                    UserLiveFeed_cell[pos][UserLiveFeed_FeedPosY[pos]].offsetWidth / BodyfontSize;

                Main_HideElementWithEle(Main_Scene2Doc);
                Main_Scene2Doc.style.transform = 'translateY(0px)';
            } else UserLiveFeed_obj[pos].AddCellsize =
                UserLiveFeed_cell[pos][UserLiveFeed_FeedPosY[pos]].offsetWidth / BodyfontSize;

            if (!temp) UserLiveFeed_obj[pos].div.classList.add('hide');
        }

        for (i = min; i < max; i++ , j++) {
            if (UserLiveFeed_cell[pos][i]) {
                UserLiveFeed_cell[pos][i].style.transform = 'translate(' + (j * UserLiveFeed_obj[pos].AddCellsize) + 'em, -103%)';
                UserLiveFeed_cell[pos][i].style.position = 'absolute';
            }
        }
    }

    Main_HideElement('dialog_loading_side_feed');
    Sidepannel_AddFocusFeed(true);
    UserLiveFeed_FeedAddFocus(true, pos, 1);
    UserLiveFeed_Showloading(false);

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

function UserLiveFeed_isFeedShow() {
    return !Main_A_includes_B(UserLiveFeed_FeedHolderDocId.className, 'opacity_zero');
}

function UserLiveFeed_ShowFeed() {
    UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();
}

function UserLiveFeed_Show() {
    Main_RemoveClassWithEle(UserLiveFeed_FeedHolderDocId, 'opacity_zero');
}

function UserLiveFeed_Hide() {
    //return;
    UserLiveFeed_CheckIfIsLiveSTop();
    UserLiveFeed_Showloading(false);
    Main_AddClassWitEle(UserLiveFeed_FeedHolderDocId, 'opacity_zero');
}

function UserLiveFeed_ResetFeedId() {
    UserLiveFeed_clearHideFeed();
    if (!UserLiveFeed_PreventHide && !UserLiveFeed_ShowSmallPlayer) UserLiveFeed_setHideFeed();
}

function UserLiveFeed_clearHideFeed() {
    window.clearTimeout(UserLiveFeed_Feedid);
}

function UserLiveFeed_setHideFeed() {
    if (UserLiveFeed_isFeedShow()) UserLiveFeed_Feedid = window.setTimeout(UserLiveFeed_Hide, 10000);
}

function UserLiveFeed_FeedRefresh() {
    if (!UserLiveFeed_loadingData) {
        if (!UserLiveFeed_obj[UserLiveFeed_FeedPosX].loadingMore) {
            UserLiveFeed_clearHideFeed();
            UserLiveFeed_StartLoad();
        }
    }
}

function UserLiveFeed_FeedSetPos(skipAnimation, pos, position) {
    if (UserLiveFeed_FeedSetPosLast[pos] === position) return;

    if (!Play_MultiEnable && !skipAnimation &&
        Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
        !Screens_ChangeFocusAnimationFast) {
        Screens_ChangeFocusAnimationFinished = false;
        Screens_ChangeFocusAnimationFast = true;

        UserLiveFeed_obj[pos].div.style.transition = '';

        window.setTimeout(function() {
            Screens_ChangeFocusAnimationFinished = true;
        }, UserLiveFeed_AnimationTimeout);
    } else {
        UserLiveFeed_obj[pos].div.style.transition = 'none';
    }

    UserLiveFeed_obj[pos].div.style.transform = 'translateX(' + position + "em)";
    UserLiveFeed_FeedSetPosLast[pos] = position;
}

function UserLiveFeed_ResetAddCellsize() {
    for (var i = 0; i < (UserLiveFeedobj_UserAGamesPos + 1); i++) {
        UserLiveFeed_obj[i].AddCellsize = 0;
    }
}

function UserLiveFeed_FeedAddFocus(skipAnimation, pos, Adder) {
    var total = UserLiveFeed_GetSize(pos);
    if (!total || !UserLiveFeed_ThumbNull(pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_ids[0])) {
        if (!total && UserLiveFeed_isFeedShow()) UserLiveFeed_CheckIfIsLiveSTop();
        return;
    }

    var add_focus = !Play_isEndDialogVisible() || !Play_EndFocus;
    if (add_focus)
        Main_AddClass(UserLiveFeed_ids[0] + pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_FocusClass);

    if (!UserLiveFeed_obj[pos].AddCellsize) {
        UserLiveFeed_obj[pos].AddCellsize =
            (document.getElementById(UserLiveFeed_ids[8] + pos + '_' + UserLiveFeed_FeedPosY[pos]).offsetWidth) / BodyfontSize;
    }

    if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].IsGame) {

        if (UserLiveFeed_FeedPosY[pos] < 5 || total < 9) {
            UserLiveFeed_FeedSetPos((Adder < 0) ? (skipAnimation || UserLiveFeed_FeedPosY[pos] !== 4) : true, pos, 0);
        } else if (UserLiveFeed_FeedPosY[pos] < (total - 4) || total < UserLiveFeed_cellVisible[pos]) {
            UserLiveFeed_FeedSetPos((Adder > 0) ? (skipAnimation || UserLiveFeed_FeedPosY[pos] !== 5) : (true && (total - UserLiveFeed_FeedPosY[pos]) !== 5), pos, -1 * UserLiveFeed_obj[pos].AddCellsize);
        } else {
            UserLiveFeed_FeedSetPos(skipAnimation, pos, -2 * UserLiveFeed_obj[pos].AddCellsize);
        }

    } else {

        if (UserLiveFeed_FeedPosY[pos] < 3 || total < 6) {
            UserLiveFeed_FeedSetPos((Adder < 0) ? (skipAnimation || UserLiveFeed_FeedPosY[pos] !== 2) : true, pos, 0);
        } else if (UserLiveFeed_FeedPosY[pos] < (total - 3) || total < UserLiveFeed_cellVisible[pos]) {
            UserLiveFeed_FeedSetPos((Adder > 0) ? (skipAnimation || UserLiveFeed_FeedPosY[pos] !== 3) : (true && (total - UserLiveFeed_FeedPosY[pos]) !== 4), pos, -1 * UserLiveFeed_obj[pos].AddCellsize);
        } else {
            UserLiveFeed_FeedSetPos(skipAnimation, pos, -2 * UserLiveFeed_obj[pos].AddCellsize);
        }

    }

    if (UserLiveFeed_obj[pos].HasMore) {
        //Load more as the data is getting used
        if (!UserLiveFeed_obj[pos].loadingMore && !UserLiveFeed_obj[pos].dataEnded && ((total - UserLiveFeed_FeedPosY[pos]) < 80)) {
            UserLiveFeed_obj[pos].loadingMore = true;
            UserLiveFeed_obj[pos].load();
        }
    }

    if (add_focus && UserLiveFeed_ShowSmallPlayer && UserLiveFeed_isFeedShow() && UserLiveFeed_CheckVod()) {
        if (!Play_MultiEnable || !UserLiveFeed_DisableSmallPlayerMulti) {

            var Channel = JSON.parse(document.getElementById(UserLiveFeed_ids[8] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]).getAttribute(Main_DataAttribute))[6];

            if (!Play_CheckIfIsLiveQualities.length || !Main_A_equals_B(Channel, Play_CheckIfIsLiveChannel)) {
                UserLiveFeed_CheckIfIsLiveStart();
            } else if (Play_CheckIfIsLiveQualities.length) {
                try {
                    Android.SetFeedPosition(UserLiveFeed_CheckIfIsLiveGetPos(UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]));
                } catch (e) {}
            }

        }
    }

    UserLiveFeed_CounterDialog(UserLiveFeed_FeedPosY[pos], UserLiveFeed_itemsCount[pos]);
    UserLiveFeed_ResetFeedId();
}

function UserLiveFeed_CheckVod() {
    if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].checkHistory) {

        var data = JSON.parse(document.getElementById(UserLiveFeed_ids[8] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]).getAttribute(Main_DataAttribute));
        var index = Main_history_Exist('live', data[7]);

        if (index > -1) {

            if (Main_A_includes_B(document.getElementById(UserLiveFeed_ids[1] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]).src, 's3_vods')) {
                return false;
            }

        }
    }
    return true;
}

function UserLiveFeed_CheckIfIsLiveGetPos(position) {
    if (position > 2) {
        var size = UserLiveFeed_GetSize(UserLiveFeed_FeedPosX) - 1;
        if (size > 4) {
            position = position < (size - 2) ? 2 : (4 - (size - position));
        } else if (size > 3) {
            position = position < (size - 1) ? 2 : (4 - (size - position));
        } else if (size > 2) {
            position = position < size ? 2 : 3;
        }
    }
    return position;
}

function UserLiveFeed_CheckIfIsLiveSTop() {
    if (!Main_IsNotBrowser) return;

    Android.ClearFeedPlayer();
    Play_CheckIfIsLiveCleanEnd();
    Sidepannel_CheckIfIsLiveCleanTimeouts();
}

function UserLiveFeed_CheckIfIsLiveResult(StreamData, x, y) {//Called by Java

    if (UserLiveFeed_isFeedShow() && UserLiveFeed_FeedPosX === x && (UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX] % 100) === y) {

        if (StreamData) {
            StreamData = JSON.parse(StreamData);

            if (StreamData.status === 200) {

                Play_CheckIfIsLiveURL = StreamData.url;
                Play_CheckIfIsLiveQualities = StreamData.responseText;
                Play_CheckIfIsLiveChannel = JSON.parse(document.getElementById(UserLiveFeed_ids[8] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]).getAttribute(Main_DataAttribute))[6];

                Android.StartFeedPlayer(
                    Play_CheckIfIsLiveURL,
                    UserLiveFeed_CheckIfIsLiveGetPos(UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]),
                    false
                );

                Sidepannel_CheckIfIsLiveRefreshSet();
            } else if (StreamData.status === 1 || StreamData.status === 403) {

                UserLiveFeed_CheckIfIsLiveWarn((document.getElementById(UserLiveFeed_ids[3] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]).textContent) +
                    ' ' + STR_LIVE + STR_BR + STR_FORBIDDEN);

            } else {
                UserLiveFeed_CheckIfIsLiveWarn((document.getElementById(UserLiveFeed_ids[3] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]).textContent) +
                    ' ' + STR_LIVE + STR_BR + STR_IS_OFFLINE);
            }
        }

    }

}

function UserLiveFeed_CheckIfIsLiveWarn(text) {
    UserLiveFeed_CheckIfIsLiveSTop();
    Play_showWarningDialog(text, 2000);
}

var UserLiveFeed_CheckIfIsLiveDelay = 0;
function UserLiveFeed_CheckIfIsLiveStart() {

    Sidepannel_CheckIfIsLiveCleanTimeouts();
    Play_CheckIfIsLiveCleanEnd();

    if (!Main_IsNotBrowser) return;

    var doc = Play_CheckLiveThumb(false, true);

    if (!Play_isOn || doc) {

        try {
            Android.CheckIfIsLiveFeed(
                doc ? doc[6] : JSON.parse(document.getElementById(UserLiveFeed_ids[8] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]).getAttribute(Main_DataAttribute))[6],
                UserLiveFeed_CheckIfIsLiveDelay,
                "UserLiveFeed_CheckIfIsLiveResult",
                UserLiveFeed_FeedPosX,
                (UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX] % 100)
            );
        } catch (e) {
            Play_CheckIfIsLiveCleanEnd();
        }

    } else UserLiveFeed_CheckIfIsLiveSTop();
}

function UserLiveFeed_FeedAddCellAnimated(pos, x, x_plus, x_plus_offset, for_in, for_out, for_offset, eleRemovePos) {
    var i;

    Screens_ChangeFocusAnimationFinished = false;
    Screens_ChangeFocusAnimationFast = true;

    UserLiveFeed_obj[pos].div.appendChild(UserLiveFeed_cell[pos][x + x_plus]);
    UserLiveFeed_cell[pos][x + x_plus].style.transform = 'translate(' + (x_plus_offset * UserLiveFeed_obj[pos].AddCellsize) + 'em, -103%)';
    UserLiveFeed_cell[pos][x + x_plus].style.position = 'absolute';

    for (i = for_in; i < for_out; i++) {
        if (UserLiveFeed_cell[pos][x + i]) UserLiveFeed_cell[pos][x + i].style.transition = '';
    }

    Main_ready(function() {
        for (i = for_in; i < for_out; i++) {
            if (UserLiveFeed_cell[pos][x + i]) UserLiveFeed_cell[pos][x + i].style.transform = 'translate(' + (UserLiveFeed_obj[pos].AddCellsize * (for_offset + i)) + 'em, -103%)';
        }

        window.setTimeout(function() {
            UserLiveFeed_RemoveElement(UserLiveFeed_cell[pos][x + eleRemovePos]);
            Screens_ChangeFocusAnimationFinished = true;
        }, Screens_ScrollAnimationTimeout);
    });
}

function UserLiveFeed_FeedAddCellNotAnimated(pos, x, x_plus, for_in, for_out, for_offset, eleRemovePos) {
    UserLiveFeed_obj[pos].div.appendChild(UserLiveFeed_cell[pos][x + x_plus]);
    UserLiveFeed_cell[pos][x + x_plus].style.position = 'absolute';

    for (var i = for_in; i < for_out; i++) {
        if (UserLiveFeed_cell[pos][x + i]) {
            UserLiveFeed_cell[pos][x + i].style.transition = 'none';
            UserLiveFeed_cell[pos][x + i].style.transform = 'translate(' + (UserLiveFeed_obj[pos].AddCellsize * (for_offset + i)) + 'em, -103%)';
        }
    }

    UserLiveFeed_RemoveElement(UserLiveFeed_cell[pos][x + eleRemovePos]);
}

function UserLiveFeed_RemoveElement(ele) {
    if (ele) ele.remove();
}

function UserLiveFeed_FeedAddCellVideo(Adder, pos, x) {
    if (Adder > 0) { // right
        if (x > 3 && UserLiveFeed_cell[pos][x + 3]) {

            if (!Play_MultiEnable && Screens_ChangeFocusAnimationFinished &&
                Screens_SettingDoAnimations && !Screens_ChangeFocusAnimationFast) { //If with animation

                UserLiveFeed_FeedAddCellAnimated(pos, x, 3, 6, -3, 3, 3, -4);

            } else {

                UserLiveFeed_FeedAddCellNotAnimated(pos, x, 3, -3, 4, 3, -4);

            }
        }

    } else { // Left
        if (x > 2 && UserLiveFeed_cell[pos].length > (x + 3)) {

            if (!Play_MultiEnable && Screens_ChangeFocusAnimationFinished &&
                Screens_SettingDoAnimations && !Screens_ChangeFocusAnimationFast) { //If with animation

                UserLiveFeed_FeedAddCellAnimated(pos, x, -3, -6, -3, 4, 3, 4);

            } else {

                UserLiveFeed_FeedAddCellNotAnimated(pos, x, -3, -3, 4, 3, 4);

            }
        }
    }

}

function UserLiveFeed_FeedAddCellGame(Adder, pos, x) {
    if (Adder > 0) { // right
        if (x > 5 && UserLiveFeed_cell[pos][x + 4]) {

            if (!Play_MultiEnable && Screens_ChangeFocusAnimationFinished &&
                Screens_SettingDoAnimations && !Screens_ChangeFocusAnimationFast) { //If with animation

                UserLiveFeed_FeedAddCellAnimated(pos, x, 4, 9, -5, 6, 5, -6);

            } else {

                UserLiveFeed_FeedAddCellNotAnimated(pos, x, 4, -5, 7, 5, -6);

            }
        }
    } else { // Left
        if (x > 4 && UserLiveFeed_cell[pos].length > (x + 4)) {

            if (!Play_MultiEnable && Screens_ChangeFocusAnimationFinished &&
                Screens_SettingDoAnimations && !Screens_ChangeFocusAnimationFast) { //If with animation

                UserLiveFeed_FeedAddCellAnimated(pos, x, -5, 9, -5, 7, 5, 5);

            } else {

                UserLiveFeed_FeedAddCellNotAnimated(pos, x, -5, -5, 7, 5, 5);

            }
        }
    }

}

function UserLiveFeed_FeedRemoveFocus(pos) {
    UserLiveFeed_CheckIfIsLiveSTop();

    if (UserLiveFeed_ThumbNull(pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_ids[0]))
        Main_RemoveClass(UserLiveFeed_ids[0] + pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_FocusClass);
}

function UserLiveFeed_ThumbNull(y, thumbnail) {
    return document.getElementById(thumbnail + y) !== null;
}

function UserLiveFeed_SetFeedPicText() {
    Main_innerHTML('icon_feed_refresh', '<div class="strokedelinebig" style="vertical-align: middle; display: inline-block;"><i class="icon-refresh" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_REFRESH + ':' + STR_HOLD_UP + STR_SPACE + STR_SPACE + '</div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block;"><i class="icon-pp" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block;">' + STR_SPACE + STR_PICTURE_LIVE_FEED + '</div>');
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
        UserLiveFeed_FeedAddFocus(false, UserLiveFeed_FeedPosX, Adder);

        UserLiveFeed_obj[UserLiveFeed_FeedPosX].AddCell(Adder, UserLiveFeed_FeedPosX, NextPos);
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
