/*jshint multistr: true */
function Main() {}
//Variable initialization
Main.isReleased = false;
Main.Hide = '';
Main.Go = 1;
Main.Before = 1;
Main.BeforeSearch = 1;

Main.Live = 1;
Main.AddUser = 2;
Main.Games = 3;
Main.AGame = 4;
Main.UserLive = 5;
Main.UserHost = 6;
Main.UserGames = 7;
Main.UserAGames = 8;
Main.UserVod = 9;
Main.UserAVod = 10;
Main.Search = 11;
Main.SGames = 12;
Main.SLive = 13;
Main.SChannelContent = 14;
Main.Svod = 15;
Main.Sclip = 16;
Main.Users = 17;
Main.UserChannels = 18;
Main.SChannels = 19;
Main.selectedChannel = '';
Main.selectedChannelDisplayname = '';
Main.selectedChannelLogo = '';
Main.listenerID = null;
Main.ExitDialogID = null;
Main.selectedGame = '';
Main.selectedGameDisplayname = '';
Main.gameSelected = '';
Main.OldgameSelected = null;
Main.selectedChannelChannelLogo = '';
Main.OldUserName = '';
Main.SmartHubId = null;
Main.UserName = null;

Main.ScrollOffSetVideo = 275;
Main.ScrollOffSetGame = 514;

Main.ScrollOffSetMinusVideo = 0.345;
Main.ScrollOffSetMinusChannels = 0.430;
Main.ScrollOffSetMinusGame = 0.535;

tizen.tvinputdevice.registerKey("ChannelUp");
tizen.tvinputdevice.registerKey("ChannelDown");
tizen.tvinputdevice.registerKey("MediaPlayPause");
tizen.tvinputdevice.registerKey("MediaPlay");
tizen.tvinputdevice.registerKey("MediaPause");
tizen.tvinputdevice.registerKey("ColorF0Red");
tizen.tvinputdevice.registerKey("ColorF1Green");
tizen.tvinputdevice.registerKey("ColorF2Yellow");
tizen.tvinputdevice.registerKey("ColorF3Blue");
tizen.tvinputdevice.registerKey("Guide");
tizen.tvinputdevice.registerKey("Info");

var IMG_404_GAME = "https://bhb27.github.io/smarttv-twitch/images/404_game.png";
var IMG_404_LOGO = "https://bhb27.github.io/smarttv-twitch/images/404_logo.png";
var IMG_404_VIDEO = "https://bhb27.github.io/smarttv-twitch/images/404_video.png";
var IMG_BLUR_GAME = "https://bhb27.github.io/smarttv-twitch/images/blur_game.png";
var IMG_BLUR_VIDEO1 = "https://bhb27.github.io/smarttv-twitch/images/blur_video_1.png";
var IMG_BLUR_VIDEO2 = "https://bhb27.github.io/smarttv-twitch/images/blur_video_2.png";
var IMG_BLUR_VOD = "https://bhb27.github.io/smarttv-twitch/images/blur_vod.png";
var IMG_USER_MINUS = "https://bhb27.github.io/smarttv-twitch/images/user_minus.png";
var IMG_USER_PLUS = "https://bhb27.github.io/smarttv-twitch/images/user_plus.png";
var IMG_USER_UP = "https://bhb27.github.io/smarttv-twitch/images/user_up.png";
var IMG_LOD_LOGO = "https://bhb27.github.io/smarttv-twitch/images/ch_logo.png";
var IMG_LOD_GAME = "https://bhb27.github.io/smarttv-twitch/images/game.png";
var IMG_LOD_VIDEO = "https://bhb27.github.io/smarttv-twitch/images/video.png";
var TEMP_MP4 = "https://bhb27.github.io/smarttv-twitch/images/temp.mp4";
var APP_ICON = "https://bhb27.github.io/smarttv-twitch/images/app_icon.png";
//Variable initialization end


// this function will be called only once the first time the app opens
document.addEventListener("DOMContentLoaded", function() {
    if (Main.isReleased) document.body.innerHTML = STR_BODY;
    Main.initWindows();
    Live.init();
    Play.PreStart();
    AddUser.RestoreUsers();
});

Main.initWindows = function() {
    //set top bar labels
    $('.label_refresh').html('<i class="fa fa-refresh" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_REFRESH);
    $('.label_search').html('<i class="fa fa-search" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_SEARCH);
    $('.label_switch').html('<i class="fa fa-exchange" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_SWITCH);
    $('.lable_live').html(STR_LIVE);
    $('.lable_user').html(STR_USER);
    $('.lable_game').html(STR_GAMES);
    $('.label_agame').html('');
    $('.label_search_chanel').html(STR_CHANNELS);
    $('.label_search_game').html(STR_GAMES);
    $('.label_search_live').html(STR_LIVE_STREAMS);
    $("#main_dialog_exit_text").text(STR_EXIT);
    $('.label_buffering').html(STR_BUFFERING);
    $('.label_controls').html('<i class="fa fa-question-circle" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_CONTROLS);
    $('.label_about').html('<i class="fa fa-info-circle" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_ABOUT);
    document.getElementById("dialog_about_text").innerHTML = STR_ABOUT_INFO;
    document.getElementById("dialog_controls_text").innerHTML = STR_CONTROLS_MAIN;
    $("#scene2").hide();
};

Main.showLoadDialog = function() {
    Main.HideExitDialog();
    $("#dialog_loading").show();
};

Main.HideLoadDialog = function() {
    $("#dialog_loading").hide();
};

Main.showExitDialog = function() {
    Main.ExitDialogID = window.setTimeout(Main.HideExitDialog, 3000);
    $("#main_dialog_exit").show();
};

Main.HideExitDialog = function() {
    $("#main_dialog_exit").hide();
};

Main.isExitDialogShown = function() {
    return $("#main_dialog_exit").is(":visible");
};

Main.showWarningDialog = function(text) {
    $("#dialog_warning_text").text(text);
    $("#dialog_warning").show();
};

Main.HideWarningDialog = function() {
    $("#dialog_warning_text").text('');
    $("#dialog_warning").hide();
};

Main.showAboutDialog = function() {
    Main.HideExitDialog();
    Main.HideControlsDialog();
    $("#dialog_about").show();
};

Main.HideAboutDialog = function() {
    $("#dialog_about").hide();
};

Main.isAboutDialogShown = function() {
    return $("#dialog_about").is(":visible");
};

Main.showControlsDialog = function() {
    Main.HideExitDialog();
    Main.HideAboutDialog();
    $("#dialog_controls").show();
};

Main.HideControlsDialog = function() {
    $("#dialog_controls").hide();
};

Main.isControlsDialogShown = function() {
    return $("#dialog_controls").is(":visible");
};

Main.addCommas = function(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
};

Main.videoqualitylang = function(video_height, average_fps, language) {
    video_height = video_height + ''; //stringfy doesnot work 8|
    if (video_height.indexOf('x') === 0) video_height = video_height.slice(-3);

    if (average_fps > 58) average_fps = 60;
    else if (average_fps < 32) average_fps = 30;
    else average_fps = Math.ceil(average_fps);

    return video_height + 'p' + average_fps + ((language !== "") ? ' [' + language.toUpperCase() + ']' : '');
};

Main.is_playlist = function(content) {
    return (content.indexOf('watch_party') == -1) ? '' : '[VOD] ';
};

Main.ThumbNull = function(y, x, thumbnail) {
    return document.getElementById(thumbnail + y + '_' + x, 0) !== null;
};

Main.StartPlayerLive = function() {
    document.body.addEventListener("keydown", Play.handleKeyDown, false);
    Play.Start();
};

Main.ReStartScreens = function() {
    $("#play_dialog_exit").hide();
    Main.SwitchScreen();
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
};

Main.SwitchScreen = function() {
    Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
    if (Main.Go === Main.Live) Live.init();
    else if (Main.Go === Main.AddUser) AddUser.init();
    else if (Main.Go === Main.Games) Games.init();
    else if (Main.Go === Main.AGame) AGame.init();
    else if (Main.Go === Main.Search) Search.init();
    else if (Main.Go === Main.SGames) SGames.init();
    else if (Main.Go === Main.SLive) SLive.init();
    else if (Main.Go === Main.SChannelContent) SChannelContent.init();
    else if (Main.Go === Main.Svod) Svod.init();
    else if (Main.Go === Main.Sclip) Sclip.init();
    else if (Main.Go === Main.Users) Users.init();
    else if (Main.Go === Main.UserLive) UserLive.init();
    else if (Main.Go === Main.UserHost) UserHost.init();
    else if (Main.Go === Main.UserGames) UserGames.init();
    else if (Main.Go === Main.UserChannels) UserChannels.init();
    else if (Main.Go === Main.SChannels) SChannels.init();
    else Live.init();
};

Main.ExitCurrent = function(ExitCurrent) {
    if (ExitCurrent === Main.Live) Live.exit();
    else if (ExitCurrent === Main.AddUser) AddUser.exit();
    else if (ExitCurrent === Main.Games) Games.exit();
    else if (ExitCurrent === Main.AGame) AGame.exit();
    else if (ExitCurrent === Main.Search) Search.exit();
    else if (ExitCurrent === Main.SGames) SGames.exit();
    else if (ExitCurrent === Main.SLive) SLive.exit();
    else if (ExitCurrent === Main.SChannelContent) SChannelContent.exit();
    else if (ExitCurrent === Main.Svod) Svod.exit();
    else if (ExitCurrent === Main.Sclip) Sclip.exit();
    else if (ExitCurrent === Main.Users) Users.exit();
    else if (ExitCurrent === Main.UserLive) UserLive.exit();
    else if (ExitCurrent === Main.UserHost) UserHost.exit();
    else if (ExitCurrent === Main.UserGames) UserGames.exit();
    else if (ExitCurrent === Main.UserChannels) UserChannels.exit();
    else if (ExitCurrent === Main.SChannels) SChannels.exit();
};

Main.openStream = function() {
    document.body.addEventListener("keydown", Play.handleKeyDown, false);
    $("#scene2").show();
    Play.hidePanel();
    Play.hideChat();
    $("#scene1").hide();
    Play.Start();
};

Main.RestoreTopLabel = function() {
    $('.label_refresh').html('<i class="fa fa-refresh" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_REFRESH);
    $('.label_switch').html('<i class="fa fa-exchange" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_SWITCH);
    $('#top_bar_user').removeClass('icon_center_focus');
    $('#top_bar_user').addClass('icon_center_label');
    document.getElementById("top_bar_spacing").style.paddingLeft = "30%";
    document.getElementById("id_agame_name").style.paddingLeft = "50%";
    $('.lable_live').html(STR_LIVE);
    $('.lable_user').html(STR_USER);
    $('.lable_game').html(STR_GAMES);
    $('.label_agame_name').html('');
};

Main.cleanTopLabel = function() {
    $('.label_refresh').html('<i class="fa fa-arrow-circle-left" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_GOBACK);
    $('.label_switch').html('');
    $('.lable_live').html('');
    $('.lable_game').html('');
    document.getElementById("top_bar_spacing").style.paddingLeft = "34.5%";
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    document.getElementById("id_agame_name").style.paddingLeft = "43.2%";
};

Main.videoCreatedAt = function(time) { //time in '2017-10-27T13:27:27Z'
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    time = new Date(time);
    return monthNames[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear();
};

Main.NetworkStateChangeListenerStart = function() {
    var onChange = function(data) {
        if (data == 1 || data == 4) { //network connected
            console.log("conecteddata = " + data);
        } else if (data == 2 || 5) {
            console.log("conecteddata = " + data);
        } else console.log("conecteddata = " + data);
    };
    try {
        Main.listenerID = webapis.network.addNetworkStateChangeListener(onChange);
    } catch (e) {}
};

Main.NetworkStateChangeListenerStop = function() {
    try {
        webapis.network.removeNetworkStateChangeListener(Main.listenerID);
    } catch (e) {}
};

Main.Resume = function() {
    if (document.hidden) {
        window.clearInterval(Main.SmartHubId);
    } else {
        window.setTimeout(function() {
            if (AddUser.UsernameArray.length > 0) {
                if ((new Date().getTime() - 590000) > SmartHub.LastUpdate) SmartHub.Start();
                Main.SmartHubId = window.setInterval(SmartHub.Start, 600000);
            } else {
                window.clearInterval(Main.SmartHubId);
                document.removeEventListener('visibilitychange', Main.Resume);
                window.removeEventListener('appcontrol', SmartHub.EventListener);
            }
        }, 1500);
    }
};

Main.ScrollHelper = {
    documentVerticalScrollPosition: function() {
        if (self.pageYOffset) return self.pageYOffset; // Firefox, Chrome, Opera, Safari.
        if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop; // Internet Explorer 6 (standards mode).
        if (document.body.scrollTop) return document.body.scrollTop; // Internet Explorer 6, 7 and 8.
        return 0; // None of the above.
    },

    viewportHeight: function() {
        return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight;
    },

    documentHeight: function() {
        return (document.height !== undefined) ? document.height : document.body.offsetHeight;
    },

    documentMaximumScrollPosition: function() {
        return this.documentHeight() - this.viewportHeight();
    },

    elementVerticalClientPositionById: function(id) {
        return document.getElementById(id).getBoundingClientRect().top;
    },

    scrollVerticalToElementById: function(Thumbnail, cursorY, cursorX, Screen, OffsetMinus, OffsetPlus, DuploYOffsetCheck) {
        var id = Thumbnail + cursorY + '_' + cursorX;

        if (document.getElementById(id) === null) {
            if (cursorY === 0 && cursorX === 0) Main.ScrollHelperBlank.scrollVerticalToElementById('blank_focus');
            return;
        } else if (Screen == Main.UserChannels || Screen == Main.SChannels) {
            if (!Main.ThumbNull((cursorY + 1), cursorX, Thumbnail)) {
                if (cursorY > 2) id = Thumbnail + (cursorY - 1) + '_' + cursorX;
                else cursorY = 0;
            }
        } else if (cursorY > 1 && OffsetPlus !== Main.ScrollOffSetGame && !Main.ThumbNull((cursorY + 1), cursorX, Thumbnail)) {
            id = Thumbnail + (cursorY - 1) + '_' + cursorX;
        } else if (cursorY == 1 && OffsetPlus !== Main.ScrollOffSetGame && !Main.ThumbNull((cursorY + 1), cursorX, Thumbnail)) {
            id = Thumbnail + (cursorY - 1) + '_' + cursorX;
            cursorY = 0;
        }

        if (DuploYOffsetCheck) {
            DuploYOffsetCheck = (cursorY === 0 || cursorY === 1);
            if (DuploYOffsetCheck) {
                id = Thumbnail + '0_' + cursorX;
                OffsetMinus = OffsetMinus - 0.085;
            }
        } else DuploYOffsetCheck = (cursorY === 0);

        if (Main.Go === Screen) {
            $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) -
                OffsetMinus * this.viewportHeight() + (DuploYOffsetCheck ? OffsetPlus : 0));
        } else return;
    }
};


Main.ScrollHelperBlank = {
    documentVerticalScrollPosition: function() {
        if (self.pageYOffset) return self.pageYOffset; // Firefox, Chrome, Opera, Safari.
        if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop; // Internet Explorer 6 (standards mode).
        if (document.body.scrollTop) return document.body.scrollTop; // Internet Explorer 6, 7 and 8.
        return 0; // None of the above.
    },

    viewportHeight: function() {
        return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight;
    },

    documentHeight: function() {
        return (document.height !== undefined) ? document.height : document.body.offsetHeight;
    },

    documentMaximumScrollPosition: function() {
        return this.documentHeight() - this.viewportHeight();
    },

    elementVerticalClientPositionById: function(id) {
        return document.getElementById(id).getBoundingClientRect().top;
    },

    scrollVerticalToElementById: function() {
        $(window).scrollTop(this.documentVerticalScrollPosition() +
            this.elementVerticalClientPositionById('blank_focus') - 0.345 * this.viewportHeight());
    }
};
