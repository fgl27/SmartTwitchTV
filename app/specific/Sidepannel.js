var Sidepannel_Isscreen = false;
var Sidepannel_Pos = 0;
var Sidepannel_PosFeed = 0;
var Sidepannel_Callback;
var Sidepannel_UpdateThumbDoc;
var Sidepannel_ScrollPos = 0;

function Sidepannel_AddFocusEtc() {
    Main_AddClass('side_panel_' + Sidepannel_Pos, 'side_panel_text_focus');
}

function Sidepannel_RemoveFocusEtc() {
    Main_RemoveClass('side_panel_' + Sidepannel_Pos, 'side_panel_text_focus');
}

function Sidepannel_AddFocusFeed() {
    Main_AddClass(UserLiveFeed_side_ids[2] + Sidepannel_PosFeed, 'side_panel_feed_text_focus');
    Sidepannel_Scroll();
    Sidepannel_UpdateThumb();
}

function Sidepannel_isShowing() {
    return document.getElementById('side_panel').className.indexOf('side_panel_hide') === -1;
}

function Sidepannel_RemoveFocusFeed() {
    Main_RemoveClass(UserLiveFeed_side_ids[2] + Sidepannel_PosFeed, 'side_panel_feed_text_focus');
}

function Sidepannel_UpdateThumb() {
    var info = JSON.parse(document.getElementById(UserLiveFeed_side_ids[8] + Sidepannel_PosFeed).getAttribute(Main_DataAttribute));

    Sidepannel_UpdateThumbDoc.onerror = function() {
        this.onerror = null;
        this.src = IMG_404_VIDEO;
    };
    Sidepannel_UpdateThumbDoc.src = info[2] + Main_randomimg;

    Main_innerHTML('feed_thum_name', info[3]);
    Main_innerHTML('feed_thum_quality', info[7]);
    Main_innerHTML('feed_thum_title', twemoji.parse(info[4]));
    Main_innerHTML('feed_thum_game', (info[5] !== "" ? STR_PLAYING + info[5] : ""));
    Main_innerHTML('feed_thum_views', info[6]);

    if (Main_isElementShowing('side_panel_feed_holder') && Sidepannel_isShowing()) Main_ShowElement('side_panel_feed_thumb');
}

function Sidepannel_PreloadImgs() {
    var doc;
    for (var i = 0; i < Sidepannel_GetSize(); i++) {
        doc = document.getElementById(UserLiveFeed_side_ids[8] + i);
        if (doc !== null) {
            new Image().src = JSON.parse(doc.getAttribute(Main_DataAttribute))[2] + Main_randomimg;
        }
    }
}

function Sidepannel_GetSize() {
    return document.getElementById('side_panel_feed_scroll').getElementsByClassName('side_panel_feed').length;
}

function Sidepannel_KeyEnter() {
    if (!Sidepannel_Pos) {
        Sidepannel_Isscreen = false;
        if (Main_values.Main_Go !== Main_Search) {
            if (!Main_values.Search_isSearching &&
                (Main_values.Main_Go === Main_ChannelContent || Main_values.Main_Go === Main_ChannelClip || Main_values.Main_Go === Main_ChannelVod))
                ChannelContent_SetChannelValue();
            if (!Main_values.Search_isSearching) Main_values.Main_BeforeSearch = Main_values.Main_Go;
            Main_ExitCurrent(Main_values.Main_Go);
            Main_values.Main_Go = Main_Search;
            Main_SwitchScreen();
        } else document.body.addEventListener("keydown", Sidepannel_Callback, false);
    } else if (Sidepannel_Pos === 1) {
        Sidepannel_Isscreen = false;
        Main_showSettings();
    } else if (Sidepannel_Pos === 2) {
        document.body.addEventListener("keydown", Sidepannel_Callback, false);
        Main_showAboutDialog();
    } else if (Sidepannel_Pos === 3) {
        document.body.addEventListener("keydown", Sidepannel_Callback, false);
        Main_showControlsDialog();
    } else if (Sidepannel_Pos === 4) Main_showExitDialog(Sidepannel_Callback);
    else if (Sidepannel_Pos === 5) Sidepannel_Go(Main_Live);
    else if (Sidepannel_Pos === 6) Sidepannel_Go(AddUser_IsUserSet() ? Main_Users : Main_addUser);
    else if (Sidepannel_Pos === 7) Sidepannel_Go(Main_Featured);
    else if (Sidepannel_Pos === 8) Sidepannel_Go(Main_games);
    else if (Sidepannel_Pos === 9) Sidepannel_Go(Main_Vod);
    else if (Sidepannel_Pos === 10) Sidepannel_Go(Main_Clip);
    Sidepannel_Hide();
}

function Sidepannel_RestoreScreen() {
    if (Sidepannel_Isscreen) {
        Sidepannel_Isscreen = false;
        Main_SwitchScreenAction();
    }
}

function Sidepannel_Go(GoTo) {
    Sidepannel_Isscreen = false;
    if (GoTo === Main_values.Main_Go) document.body.addEventListener("keydown", Sidepannel_Callback, false);
    else {
        Main_values.Main_Before = Main_values.Main_Go;
        Main_values.Main_Go = GoTo;
        Main_ExitCurrent(Main_values.Main_Before);
        Main_SwitchScreen();
    }
}

function Sidepannel_Start(callback, Isscreen) {
    Main_RemoveClass('side_panel', 'side_panel_hide');
    Sidepannel_Callback = callback;
    Sidepannel_Isscreen = Isscreen;
    document.body.removeEventListener("keydown", Sidepannel_Callback);
    Sidepannel_ShowFeed();
}


function Sidepannel_ShowFeed() {
    var hasuser = AddUser_UserIsSet();

    if (hasuser) {
        if (Play_FeedOldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) UserLiveFeed_status = false;
        Play_FeedOldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
    }

    if (!hasuser || !UserLiveFeed_ThumbNull(0, UserLiveFeed_ids[0])) UserLiveFeed_status = false;

    if (!UserLiveFeed_status && !UserLiveFeed_loadingData) UserLiveFeed_StartLoad();

    if (hasuser) {
        if (Main_isElementShowing('side_panel_feed_holder')) {
            document.body.addEventListener("keydown", Sidepannel_handleKeyDown, false);
            if (document.getElementById(UserLiveFeed_side_ids[2] + Sidepannel_PosFeed) !== null) {
                Sidepannel_PreloadImgs();
                Sidepannel_AddFocusFeed();
            }
        } else {
            document.body.addEventListener("keydown", Sidepannel_handleKeyDownEtc, false);
        }
    } else {
        Main_HideElement('side_panel_feed_holder');
        Main_ShowElement('side_panel_etc');
        document.body.addEventListener("keydown", Sidepannel_handleKeyDownEtc, false);
    }
}

function Sidepannel_Hide() {
    Main_AddClass('side_panel', 'side_panel_hide');
    Main_HideElement('side_panel_feed_thumb');
    Sidepannel_RemoveFocusEtc();
    Sidepannel_Pos = 0;
    Sidepannel_AddFocusEtc();
    document.body.removeEventListener("keydown", Sidepannel_handleKeyDown);
    document.body.removeEventListener("keydown", Sidepannel_handleKeyDownEtc);
}

function Sidepannel_Scroll() {
    var size = Sidepannel_GetSize();
    if (Sidepannel_PosFeed > 4) {
        var position;
        if (Sidepannel_PosFeed < (size - 6)) {
            position = (document.getElementById(UserLiveFeed_side_ids[8] + (Sidepannel_PosFeed - 4)).offsetTop * -1);
            position += document.getElementById(UserLiveFeed_side_ids[8] + 0).offsetTop;
        } else if (size > 11) {
            position = (document.getElementById(UserLiveFeed_side_ids[8] + (size - 11)).offsetTop * -1);
            position += document.getElementById(UserLiveFeed_side_ids[8] + 0).offsetTop;
        }

        //Prevent flickering when not change position as we are at the botton but the position value changes by 1px
        if (position > (Sidepannel_ScrollPos + 5) || position < (Sidepannel_ScrollPos - 5)) {
            Sidepannel_ScrollPos = position;
        }

        document.getElementById('side_panel_feed_scroll').style.marginTop = Sidepannel_ScrollPos + "px";

    } else document.getElementById('side_panel_feed_scroll').style.marginTop = 0;
}

function Sidepannel_handleKeyDown(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
            Sidepannel_Hide();
            if (Sidepannel_Isscreen) {
                Sidepannel_Isscreen = false;
                Main_SwitchScreenAction();
            } else {
                document.body.addEventListener("keydown", Sidepannel_Callback, false);
                Main_CenterLablesChange();
            }
            break;
        case KEY_LEFT:
            document.body.removeEventListener("keydown", Sidepannel_handleKeyDown);
            document.body.addEventListener("keydown", Sidepannel_handleKeyDownEtc, false);
            Main_HideElement('side_panel_feed_thumb');
            Main_HideElement('side_panel_feed_holder');
            Main_ShowElement('side_panel_etc');
            break;
        case KEY_RIGHT:
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
            Sidepannel_Isscreen = false;
            Main_ready(function() {
                Main_OpenLiveStream(Sidepannel_PosFeed, UserLiveFeed_side_ids, Sidepannel_handleKeyDown);
                doc.style.transition = '';
            });
            break;
        default:
            break;
    }
}

function Sidepannel_handleKeyDownEtc(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
        case KEY_LEFT:
            Sidepannel_Hide();
            if (Sidepannel_Isscreen) {
                Sidepannel_Isscreen = false;
                Main_SwitchScreenAction();
            } else {
                document.body.addEventListener("keydown", Sidepannel_Callback, false);
                Main_CenterLablesChange();
            }
            break;
        case KEY_RIGHT:
            if (AddUser_UserIsSet()) {
                document.body.removeEventListener("keydown", Sidepannel_handleKeyDownEtc);
                document.body.addEventListener("keydown", Sidepannel_handleKeyDown, false);
                Main_HideElement('side_panel_etc');
                Main_ShowElement('side_panel_feed_holder');
                Main_ShowElement('side_panel_feed_thumb');
            } else {
                Main_showWarningDialog(STR_NOKUSER_WARN);
                window.setTimeout(Main_HideWarningDialog, 2000);
            }
            break;
        case KEY_UP:
            if (Sidepannel_Pos) {
                Sidepannel_RemoveFocusEtc();
                Sidepannel_Pos--;
                Sidepannel_AddFocusEtc();
            }
            break;
        case KEY_DOWN:
            if (Sidepannel_Pos < 10) {
                Sidepannel_RemoveFocusEtc();
                Sidepannel_Pos++;
                Sidepannel_AddFocusEtc();
            }
            break;
        case KEY_ENTER:
            Sidepannel_KeyEnter();
            break;
        default:
            break;
    }
}
