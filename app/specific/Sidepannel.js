//Spacing for reease maker not trow erros frm jshint
var Sidepannel_PosFeed = 0;
var Sidepannel_Callback;
var Sidepannel_UpdateThumbDoc;
var Sidepannel_IsMain = true;

function Sidepannel_AddFocusMain() {
    Main_AddClass('side_panel_movel_new_' + Main_values.Sidepannel_Pos, 'side_panel_new_icons_text');
}

function Sidepannel_RemoveFocusMain() {
    Main_RemoveClass('side_panel_movel_new_' + Main_values.Sidepannel_Pos, 'side_panel_new_icons_text');
}

function Sidepannel_AddFocusFeed() {
    //Main_AddClass(UserLiveFeed_side_ids[2] + Sidepannel_PosFeed, 'side_panel_new_icons_text');
    Main_AddClass(UserLiveFeed_side_ids[1] + Sidepannel_PosFeed, 'side_panel_feed_img_focus');
    Sidepannel_Scroll();
    Sidepannel_UpdateThumb();
}

function Sidepannel_isShowing() {
    return document.getElementById('side_panel').className.indexOf('side_panel_hide') === -1;
}

function Sidepannel_RemoveFocusFeed() {
    Main_RemoveClass(UserLiveFeed_side_ids[1] + Sidepannel_PosFeed, 'side_panel_feed_img_focus');
}

function Sidepannel_UpdateThumb() {
    var info = JSON.parse(document.getElementById(UserLiveFeed_side_ids[8] + Sidepannel_PosFeed).getAttribute('side_panel_data'));

    Sidepannel_UpdateThumbDoc.onerror = function() {
        this.onerror = null;
        this.src = IMG_404_VIDEO;
    };
    Sidepannel_UpdateThumbDoc.src = info[2] + Main_randomimg;

    Main_innerHTML('feed_thum_name', Sidepannel_partnerIcon(info[3], info[9], info[8]));
    Main_innerHTML('feed_thum_quality', info[7]);
    Main_innerHTML('feed_thum_title', twemoji.parse(info[4]));
    Main_innerHTML('feed_thum_game', (info[5] !== "" ? STR_PLAYING + info[5] : ""));
    Main_innerHTML('feed_thum_views', info[6]);

    if (Main_isElementShowing('side_panel_feed_holder') && Sidepannel_isShowing())
        Main_ShowElement('side_panel_feed_thumb');
}

function Sidepannel_partnerIcon(name, partner, isrerun) {
    return '<div class="partnericon_div"> ' + name + STR_SPACE + STR_SPACE + '</div>' +
        (partner ? ('<img class="partnericon_img" alt="" src="' +
            IMG_PARTNER + '">' + STR_SPACE + STR_SPACE) : "") + '<div class="partnericon_text" style="background: #' +
        (isrerun ? 'FFFFFF; color: #000000;' : 'E21212;') + '">' + STR_SPACE + STR_SPACE +
        (isrerun ? STR_NOT_LIVE : STR_LIVE) + STR_SPACE + STR_SPACE + '</div>';
}

function Sidepannel_PreloadImgs() {
    var doc;
    for (var i = 0; i < Sidepannel_GetSize(); i++) {
        doc = document.getElementById(UserLiveFeed_side_ids[8] + i);
        if (doc !== null) {
            new Image().src = JSON.parse(doc.getAttribute('side_panel_data'))[2] + Main_randomimg;
        }
    }
}

function Sidepannel_GetSize() {
    return document.getElementById('side_panel_holder').getElementsByClassName('side_panel_feed').length;
}

function Sidepannel_KeyEnterUser() {

    if (Main_values.Sidepannel_Pos === 6 && !AddUser_UsernameArray[0].access_token) {
        Main_showWarningDialog(STR_NOKEY_VIDEO_WARN);
        window.setTimeout(Main_HideWarningDialog, 5000);
        return;
    }

    if (Main_values.Sidepannel_Pos === 2) {
        Main_values.Sidepannel_IsUser = false;
        Sidepannel_SetDefaultLables();
    } else if (Main_values.Sidepannel_Pos === 3) Sidepannel_Go(Main_UserLive);
    else if (Main_values.Sidepannel_Pos === 4) Sidepannel_Go(Main_UserHost);
    else if (Main_values.Sidepannel_Pos === 5) Sidepannel_Go(Main_usergames);
    else if (Main_values.Sidepannel_Pos === 6) Sidepannel_Go(Main_UserVod);
    else if (Main_values.Sidepannel_Pos === 7) Sidepannel_Go(Main_UserChannels);
    else if (Main_values.Sidepannel_Pos === 8) {
        Main_values.Main_selectedChannel_id = AddUser_UsernameArray[Main_values.Users_Position].id;
        Main_values.Main_selectedChannelDisplayname = AddUser_UsernameArray[Main_values.Users_Position].display_name ? AddUser_UsernameArray[Main_values.Users_Position].display_name : AddUser_UsernameArray[Main_values.Users_Position].name;
        Main_values.Main_selectedChannel = AddUser_UsernameArray[Main_values.Users_Position].name;

        Main_values.Main_BeforeChannel = Main_values.Main_Go;
        Main_values.Main_Go = Main_ChannelContent;
        Main_values.Main_BeforeChannelisSet = true;
        AddCode_IsFallowing = false;
        ChannelContent_UserChannels = false;
        Main_ExitCurrent(Main_values.Main_BeforeChannel);
        Main_values.My_channel = true;
        Main_SwitchScreen();
    } else Sidepannel_KeyEnterBase();

    if (Main_values.Sidepannel_Pos !== 2) Sidepannel_Hide();
    else {
        Sidepannel_RemoveFocusMain();
        Main_values.Sidepannel_Pos++;
        Sidepannel_AddFocusMain();
    }
}

function Sidepannel_KeyEnterBase() {
    if (!Main_values.Sidepannel_Pos) { //TODO USer
        console.log('TODO USer add switch etc');
        Sidepannel_Go(Main_values.Main_Go);
    } else if (Main_values.Sidepannel_Pos === 1) {
        if (Main_values.Main_Go !== Main_Search) {
            if (!Main_values.Search_isSearching &&
                (Main_values.Main_Go === Main_ChannelContent || Main_values.Main_Go === Main_ChannelClip || Main_values.Main_Go === Main_ChannelVod))
                ChannelContent_SetChannelValue();
            Main_OpenSearch();
        } else document.body.addEventListener("keydown", Sidepannel_Callback, false);
    } else if (Main_values.Sidepannel_Pos === 9) {
        Main_showSettings();
    } else if (Main_values.Sidepannel_Pos === 10) {
        document.body.removeEventListener("keydown", Sidepannel_Callback, false);
        document.body.addEventListener("keydown", Screens_handleKeyControls);
        Main_showAboutDialog();
    } else if (Main_values.Sidepannel_Pos === 11) {
        document.body.removeEventListener("keydown", Sidepannel_Callback, false);
        document.body.addEventListener("keydown", Screens_handleKeyControls);
        Main_showControlsDialog();
    } else if (Main_values.Sidepannel_Pos === 12) Main_showExitDialog(Sidepannel_Callback);

}

function Sidepannel_KeyEnter() {
    if (Main_values.Sidepannel_IsUser) {
        Sidepannel_KeyEnterUser();
        return;
    }

    if (Main_values.Sidepannel_Pos === 3) Sidepannel_Go(Main_Live);
    else if (Main_values.Sidepannel_Pos === 4) {
        //TODO add a proper add user thing
        Sidepannel_SetUserLables();
    } else if (Main_values.Sidepannel_Pos === 5) Sidepannel_Go(Main_Featured);
    else if (Main_values.Sidepannel_Pos === 6) Sidepannel_Go(Main_games);
    else if (Main_values.Sidepannel_Pos === 7) Sidepannel_Go(Main_Vod);
    else if (Main_values.Sidepannel_Pos === 8) Sidepannel_Go(Main_Clip);
    else Sidepannel_KeyEnterBase();

    if (Main_values.Sidepannel_Pos !== 4) Sidepannel_Hide();
    else {
        Sidepannel_RemoveFocusMain();
        Main_values.Sidepannel_Pos--;
        Sidepannel_AddFocusMain();
    }
}

function Sidepannel_RestoreScreen() {
    Main_SwitchScreenAction();
}

function Sidepannel_Go(GoTo) {
    if (GoTo === Main_values.Main_Go) document.body.addEventListener("keydown", Sidepannel_Callback, false);
    else {
        Main_values.Main_Before = Main_values.Main_Go;
        Main_values.Main_Go = GoTo;
        Main_ExitCurrent(Main_values.Main_Before);
        Main_SwitchScreen();
    }
}

function Sidepannel_Start(callback) {
    Sidepannel_Callback = callback;
    document.body.removeEventListener("keydown", Sidepannel_Callback);
    if (!Sidepannel_IsMain && AddUser_UserIsSet()) Sidepannel_StartFeed();
    else Sidepannel_StartMain();
}

function Sidepannel_StartMain() {
    Sidepannel_IsMain = true;
    Main_ShowElement('side_panel_fix');
    document.getElementById('side_panel_movel').style.marginLeft = '';
    document.getElementById('side_panel_fix').style.marginLeft = '';
    document.body.addEventListener("keydown", Sidepannel_handleKeyDownMain, false);
    Sidepannel_AddFocusMain();
    Sidepannel_UnSetTopOpacity();
}

function Sidepannel_StartFeed() {
    Sidepannel_IsMain = false;
    document.body.addEventListener("keydown", Sidepannel_handleKeyDown, false);
    Main_RemoveClass('side_panel', 'side_panel_hide');
    Sidepannel_ShowFeed();
    Sidepannel_HideMain(true);
}

function Sidepannel_ShowFeed() {
    if (Play_FeedOldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) UserLiveFeed_status = false;
    Play_FeedOldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;

    if (!UserLiveFeed_ThumbNull(0, UserLiveFeed_ids[0])) UserLiveFeed_status = false;

    if (!UserLiveFeed_status && !UserLiveFeed_loadingData) UserLiveFeed_StartLoad();

    if (document.getElementById(UserLiveFeed_side_ids[0] + Sidepannel_PosFeed) !== null) {
        Sidepannel_AddFocusFeed();
        window.setTimeout(Sidepannel_PreloadImgs, 600);
    }
}

function Sidepannel_HideMain(hideAll) {
    var size = AddUser_UsernameArray[0].display_name.length;
    size = (size > 8 ? size - 8 : 0);

    if (hideAll) document.getElementById('side_panel_fix').style.marginLeft = '-4%';
    document.getElementById('side_panel_movel').style.marginLeft = 'calc(-' + (hideAll ? 17.5 : 13) + '% - ' + size + 'ch)';
}

function Sidepannel_Hide() {
    Sidepannel_HideMain();
    Sidepannel_RemoveFocusMain();
    Sidepannel_SetTopOpacity(Main_values.Main_Go);
    Main_ShowElement('side_panel_fix');
    document.getElementById('side_panel_fix').style.marginLeft = '';
    Main_AddClass('side_panel', 'side_panel_hide');
    Main_HideElement('side_panel_feed_thumb');
    document.body.removeEventListener("keydown", Sidepannel_handleKeyDown);
    document.body.removeEventListener("keydown", Sidepannel_handleKeyDownMain);
}

function Sidepannel_SetTopOpacity(Main_Go) {
    if (Sidepannel_Pos_Screens[Main_Go]) Main_values.Sidepannel_Pos = Sidepannel_Pos_Screens[Main_Go];

    for (var i = 1; i < 9; i++) {
        if (i !== Main_values.Sidepannel_Pos) document.getElementById('side_panel_new_' + i).style.opacity = '0.5';
        else document.getElementById('side_panel_new_' + i).style.opacity = '';
    }
}

var Sidepannel_Pos_Screens = [
    1, //Main_Search 0
    3, //Main_Live 1
    4, //Main_Users 2
    5, //Main_Featured 3
    6, //Main_games 4
    7, //Main_Vod 5
    8, //Main_Clip 6
    3, //Main_UserLive 7
    4, //Main_UserHost 8
    5, //Main_usergames 9
    6, //Main_UserVod 10
    7, //Main_UserChannels 11
    3, // 12
    3, // 13
    3, // 14
    0, // 15
    0, // 16
    0, // 17
    0, // 18
    6, //Main_aGame 19
    6, //Main_AGameVod 20
    6, //Main_AGameClip 21
];

function Sidepannel_UnSetTopOpacity() {
    for (var i = 1; i < 9; i++)
        document.getElementById('side_panel_new_' + i).style.opacity = '';
}

function Sidepannel_SetUserLables() {
    //Sidepannel_Go(AddUser_IsUserSet() ? Main_Users : Main_addUser);
    Main_values.Sidepannel_IsUser = true;

    Main_innerHTML('side_panel_movel_user_text', STR_SPACE + STR_USER_MENU + STR_SPACE);
    Main_ShowElement('side_panel_movel_user_text_holder');
    Main_ShowElement('side_panel_movel_new_back');
    Main_ShowElement('side_panel_new_2');

    Main_innerHTML('side_panel_movel_new_2', STR_SPACE + STR_GO_BACK);
    Main_innerHTML('side_panel_movel_new_4', STR_SPACE + STR_LIVE_HOSTS);
    Main_innerHTML('side_panel_movel_new_5', STR_SPACE + STR_GAMES);
    Main_innerHTML('side_panel_movel_new_6', STR_SPACE + STR_VIDEOS);
    Main_innerHTML('side_panel_movel_new_7', STR_SPACE + STR_CHANNELS);
    Main_innerHTML('side_panel_movel_new_8', STR_SPACE + STR_USER_MY_CHANNEL);


    Sidepannel_SetIcons('side_panel_new_5', 'gamepad');
    Sidepannel_SetIcons('side_panel_new_6', 'movie-play');
    Sidepannel_SetIcons('side_panel_new_7', 'filmstrip');
    Sidepannel_SetIcons('side_panel_new_8', 'user');

}

function Sidepannel_SetDefaultLables() {
    //Main_values.Sidepannel_IsUser = false;
    Main_textContent('side_panel_movel_top_text', STR_LIVE_FEED);

    if (AddUser_UsernameArray[0]) Main_innerHTML('side_panel_movel_new_0', STR_SPACE + (AddUser_UsernameArray[0].display_name ? AddUser_UsernameArray[0].display_name : STR_USER_ADD));
    else Main_innerHTML('side_panel_movel_new_0', STR_SPACE + STR_USER_ADD);

    Main_HideElement('side_panel_movel_new_back');
    Main_HideElement('side_panel_new_2');
    Main_HideElement('side_panel_movel_user_text_holder');

    Main_innerHTML('side_panel_movel_new_1', STR_SPACE + STR_SEARCH);

    Main_innerHTML('side_panel_movel_new_2', STR_SPACE + STR_GO_BACK);
    Main_innerHTML('side_panel_movel_new_3', STR_SPACE + STR_LIVE);
    Main_innerHTML('side_panel_movel_new_4', STR_SPACE + STR_USER);
    Main_innerHTML('side_panel_movel_new_5', STR_SPACE + STR_FEATURED);
    Main_innerHTML('side_panel_movel_new_6', STR_SPACE + STR_GAMES);
    Main_innerHTML('side_panel_movel_new_7', STR_SPACE + STR_VIDEOS);
    Main_innerHTML('side_panel_movel_new_8', STR_SPACE + STR_CLIPS);

    Main_innerHTML('side_panel_movel_new_9', STR_SPACE + STR_SETTINGS);
    Main_innerHTML('side_panel_movel_new_10', STR_SPACE + STR_ABOUT);
    Main_innerHTML('side_panel_movel_new_11', STR_SPACE + STR_CONTROLS);
    Main_innerHTML('side_panel_movel_new_12', STR_SPACE + STR_EXIT);

    Sidepannel_SetIcons('side_panel_new_1', 'search');
    Sidepannel_SetIcons('side_panel_new_2', 'arrow-circle-left');
    Sidepannel_SetIcons('side_panel_new_3', 'play');
    Sidepannel_SetIcons('side_panel_new_4', 'users');
    Sidepannel_SetIcons('side_panel_new_5', 'star');
    Sidepannel_SetIcons('side_panel_new_6', 'gamepad');
    Sidepannel_SetIcons('side_panel_new_7', 'movie-play');
    Sidepannel_SetIcons('side_panel_new_8', 'movie');

}

function Sidepannel_SetIcons(div, icon) {
    if (icon) Main_innerHTML(div, '<i class="icon icon-' + icon + ' side_panel_new_icons_pad"></i>');
    else Main_textContent(div, '');
}

function Sidepannel_Scroll() {
    var value = '1%', //default
        center = 6;

    if (Sidepannel_PosFeed > center) { //Start scrolling in the middle
        if (Sidepannel_PosFeed < (Sidepannel_GetSize() - center))
            value = 'calc(-18.1% *' + (Sidepannel_PosFeed - center) + ')';
        else if (((Sidepannel_GetSize() - center) - center) > 0) //if we are in the 7 left
            value = 'calc(-18.1% *' + ((Sidepannel_GetSize() - center) - center) + ')';
    }

    document.getElementById('side_panel_holder').style.marginTop = value;
}

function Sidepannel_handleKeyDown(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
            Sidepannel_Hide();
            Main_SwitchScreenAction();
            break;
        case KEY_RIGHT:
            Main_AddClass('side_panel', 'side_panel_hide');
            Main_HideElement('side_panel_feed_thumb');
            document.body.removeEventListener("keydown", Sidepannel_handleKeyDown);
            Sidepannel_StartMain();
            break;
        case KEY_LEFT:
            UserLiveFeed_FeedRefreshFocus();
            break;
        case KEY_UP:
            if (Sidepannel_PosFeed && !UserLiveFeed_loadingData) {
                Sidepannel_RemoveFocusFeed();
                Sidepannel_PosFeed--;
                Sidepannel_AddFocusFeed();
            }
            break;
        case KEY_DOWN:
            if (Sidepannel_PosFeed < (Sidepannel_GetSize() - 1) && !UserLiveFeed_loadingData) {
                Sidepannel_RemoveFocusFeed();
                Sidepannel_PosFeed++;
                Sidepannel_AddFocusFeed();
            }
            break;
        case KEY_ENTER:
            var doc = document.getElementById("side_panel");
            doc.style.transition = 'none';
            Sidepannel_Hide();
            Main_values.Play_isHost = false;
            Play_UserLiveFeedPressed = true;
            Main_ready(function() {
                Main_OpenLiveStream(Sidepannel_PosFeed, UserLiveFeed_side_ids, Sidepannel_handleKeyDown);
                doc.style.transition = '';
            });
            break;
        default:
            break;
    }
}

function Sidepannel_handleKeyDownMain(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
        case KEY_RIGHT:
            Sidepannel_Hide();
            Main_SwitchScreenAction();
            break;
        case KEY_LEFT:
            if (AddUser_UserIsSet()) {
                document.body.removeEventListener("keydown", Sidepannel_handleKeyDownMain);
                Main_ShowElement('side_panel_feed_thumb'); //TODO check if this is needed
                Sidepannel_StartFeed();
            } else {
                Main_showWarningDialog(STR_NOKUSER_WARN);
                window.setTimeout(Main_HideWarningDialog, 2000);
            }
            break;
        case KEY_UP:
            if (Main_values.Sidepannel_Pos) {
                Sidepannel_RemoveFocusMain();
                Main_values.Sidepannel_Pos--;
                if (!Main_values.Sidepannel_IsUser && Main_values.Sidepannel_Pos === 2) Main_values.Sidepannel_Pos--;
                Sidepannel_AddFocusMain();
            }
            break;
        case KEY_DOWN:
            if (Main_values.Sidepannel_Pos < 12) {
                Sidepannel_RemoveFocusMain();
                Main_values.Sidepannel_Pos++;
                if (!Main_values.Sidepannel_IsUser && Main_values.Sidepannel_Pos === 2) Main_values.Sidepannel_Pos++;
                Sidepannel_AddFocusMain();
            }
            break;
        case KEY_ENTER:
            Sidepannel_KeyEnter();
            break;
        default:
            break;
    }
}