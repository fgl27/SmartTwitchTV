//Spacing for reease maker not trow erros frm jshint
var Sidepannel_Pos = 2;
var Sidepannel_PosFeed = 0;
var Sidepannel_Callback;
var Sidepannel_UpdateThumbDoc;
var Sidepannel_IsMain = true;

function Sidepannel_AddFocusMain() {
    Main_AddClass('side_panel_movel_new_' + Sidepannel_Pos, 'side_panel_new_icons_text');
}

function Sidepannel_RemoveFocusMain() {
    Main_RemoveClass('side_panel_movel_new_' + Sidepannel_Pos, 'side_panel_new_icons_text');
}

function Sidepannel_AddFocusFeed() {
    Main_AddClass(UserLiveFeed_side_ids[2] + Sidepannel_PosFeed, 'side_panel_new_icons_text');
    Sidepannel_Scroll();
    Sidepannel_UpdateThumb();
}

function Sidepannel_isShowing() {
    return document.getElementById('side_panel').className.indexOf('side_panel_hide') === -1;
}

function Sidepannel_RemoveFocusFeed() {
    Main_RemoveClass(UserLiveFeed_side_ids[2] + Sidepannel_PosFeed, 'side_panel_new_icons_text');
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

function Sidepannel_KeyEnter() {
    if (!Sidepannel_Pos) { //TODO USer
        console.log('TODO USer');
        Sidepannel_Go(Main_values.Main_Go);
    } else if (Sidepannel_Pos === 1) {
        if (Main_values.Main_Go !== Main_Search) {
            if (!Main_values.Search_isSearching &&
                (Main_values.Main_Go === Main_ChannelContent || Main_values.Main_Go === Main_ChannelClip || Main_values.Main_Go === Main_ChannelVod))
                ChannelContent_SetChannelValue();
            Main_OpenSearch();
        } else document.body.addEventListener("keydown", Sidepannel_Callback, false);
    } else if (Sidepannel_Pos === 2) Sidepannel_Go(Main_Live);
    else if (Sidepannel_Pos === 3) Sidepannel_Go(AddUser_IsUserSet() ? Main_Users : Main_addUser);
    else if (Sidepannel_Pos === 4) Sidepannel_Go(Main_Featured);
    else if (Sidepannel_Pos === 5) Sidepannel_Go(Main_games);
    else if (Sidepannel_Pos === 6) Sidepannel_Go(Main_Vod);
    else if (Sidepannel_Pos === 7) Sidepannel_Go(Main_Clip);
    else if (Sidepannel_Pos === 8) {
        Main_showSettings();
    } else if (Sidepannel_Pos === 9) {
        document.body.removeEventListener("keydown", Sidepannel_Callback, false);
        document.body.addEventListener("keydown", Screens_handleKeyControls);
        Main_showAboutDialog();
    } else if (Sidepannel_Pos === 10) {
        document.body.removeEventListener("keydown", Sidepannel_Callback, false);
        document.body.addEventListener("keydown", Screens_handleKeyControls);
        Main_showControlsDialog();
    } else if (Sidepannel_Pos === 11) Main_showExitDialog(Sidepannel_Callback);
    Sidepannel_Hide();
}

function Sidepannel_RestoreScreen() {
    Main_SwitchScreenAction();
}

function Sidepannel_Go(GoTo) {
    if (GoTo === Main_values.Main_Go) {
        document.body.addEventListener("keydown", Sidepannel_Callback, false);
        Main_ReloadScreen();
    } else {
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

    if (hideAll) document.getElementById('side_panel_fix').style.marginLeft = '-4.5ch';
    document.getElementById('side_panel_movel').style.marginLeft = -((hideAll ? 20 : 14) + size) + "ch";
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
    Sidepannel_Pos = Sidepannel_SetTopOpacityGetpos(Main_Go);

    for (var i = 1; i < 8; i++) {
        if (i !== Sidepannel_Pos) document.getElementById('side_panel_new_' + i).style.opacity = '0.5';
    }
}

function Sidepannel_SetTopOpacityGetpos(Main_Go) {
    if (Main_Go < 7) return Main_Go + 1;
    else if (Main_Go === Main_UserLive || Main_Go === Main_UserHost ||
        Main_Go === Main_usergames || Main_Go === Main_UserLive || Main_Go === Main_UserChannels ||
        Main_Go === Main_UserVod) return 3;
    else if (Main_Go === Main_SearchGames || Main_Go === Main_SearchLive ||
        Main_Go === Main_SearchChannels) return 1;
    else if (Main_Go === Main_aGame || Main_Go === Main_AGameVod || Main_Go === Main_AGameClip) return 5;

    return Sidepannel_Pos;
}

function Sidepannel_UnSetTopOpacity() {
    for (var i = 1; i < 8; i++)
        document.getElementById('side_panel_new_' + i).style.opacity = '';
}

function Sidepannel_Scroll() {
    var value = '1%', //default
        center = 7;

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
            if (Sidepannel_Pos) {
                Sidepannel_RemoveFocusMain();
                Sidepannel_Pos--;
                Sidepannel_AddFocusMain();
            }
            break;
        case KEY_DOWN:
            if (Sidepannel_Pos < 11) {
                Sidepannel_RemoveFocusMain();
                Sidepannel_Pos++;
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