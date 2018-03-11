/*jshint multistr: true */
function Main() {}
//Variable initialization
Main.isReleased = false;
Main.Hide = '';
Main.Go = 1;
Main.Before = 1;
Main.BeforeSearch = 1;
Main.newImg = new Image();

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
Main.imgMatrix = [];
Main.imgMatrixId = [];
Main.imgMatrixCount = 0;
Main.ScrollbarBlack = true;

Main.ScrollOffSetVideo = 275;
Main.ScrollOffSetGame = 514;

Main.ScrollOffSetMinusVideo = 0.345;
Main.ScrollOffSetMinusChannels = 0.430;
Main.ScrollOffSetMinusGame = 0.535;

Main.ReloadLimitOffsetGames = 1.35;
Main.ReloadLimitOffsetVideos = 1.5;

Main.ItemsLimitVideo = 99;
Main.ColoumnsCountVideo = 3;
Main.ItemsReloadLimitVideo = Math.floor((Main.ItemsLimitVideo / Main.ColoumnsCountVideo) / Main.ReloadLimitOffsetVideos);

Main.ItemsLimitGame = 95;
Main.ColoumnsCountGame = 5;
Main.ItemsReloadLimitGame = Math.floor((Main.ItemsLimitGame / Main.ColoumnsCountGame) / Main.ReloadLimitOffsetGames);

Main.ItemsLimitChannel = 96;
Main.ColoumnsCountChannel = 6;
Main.ItemsReloadLimitChannel = Math.floor((Main.ItemsLimitChannel / Main.ColoumnsCountChannel) / Main.ReloadLimitOffsetVideos);

Main.ItemsLimitReload = 6;

Main.TempTable = "stream_table_temp";

Main.TopSpacingDefault = 30;
Main.TopSpacingCleanTop = 34.5;
Main.TopSpacingSearchLable = 40.5;
Main.TopSpacingSearchUnder = 21.5;

Main.TopAgameDefault = 50;
Main.TopAgameDefaultCleanTop = 43.2;
Main.TopAgameDefaultUser = 44;

Main.clientId = "ypvnuqrh98wqz1sr0ov3fgfu4jh1yx";
Main.VideoSize = "528x297"; // default size 640x360
Main.GameSize = "340x475"; // default size 272x380

Main.classThumb = 'stream_thumbnail_focused';
Main.classText = 'stream_text_focused';
Main.classChannel = 'stream_channel_focused';
Main.classInfo = 'stream_info_focused';

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

var IMG_404_GAME = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/404_game.png";
var IMG_404_LOGO = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/404_logo.png";
var IMG_404_VIDEO = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/404_video.png";
var IMG_BLUR_GAME = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/blur_game.png";
var IMG_BLUR_VIDEO1 = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/blur_video_1.png";
var IMG_BLUR_VIDEO2 = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/blur_video_2.png";
var IMG_BLUR_VOD = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/blur_vod.png";
var IMG_USER_MINUS = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/user_minus.png";
var IMG_USER_PLUS = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/user_plus.png";
var IMG_USER_UP = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/user_up.png";
var IMG_LOD_LOGO = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/ch_logo.png";
var IMG_LOD_GAME = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/game.png";
var IMG_LOD_VIDEO = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/video.png";
var TEMP_MP4 = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/temp.mp4";

Main.version = 400;
Main.stringVersion = '4.0.0';
Main.currentVersion = '';
Main.minversion = '031118';
Main.versonTag = '';
//Variable initialization end

// this function will be called only once the first time the app opens
document.addEventListener("DOMContentLoaded", function() {
    tizen.systeminfo.getPropertyValue('LOCALE', Main.loadTranslations);
});

//TODO the day there is a translation add on if if the new values
Main.loadTranslations = function(device) {

    // Language is set as (LANGUAGE)_(REGION) in (ISO 639-1)_(ISO 3166-1 alpha-2) eg.; pt_BR Brazil, en_US USA
    // https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

    var lang = device.language.split(".")[0];

    if (lang.indexOf('pt_') !== -1) {
        pt_BRLang();
        Main.TopSpacingDefault = 25;

        Main.TopSpacingSearchLable = 38.5;
        Main.TopSpacingSearchUnder = 21.5;

        Main.TopAgameDefault = 55;

        Main.TopSpacingCleanTop = 32.5;
        Main.TopAgameDefaultCleanTop = 43.2;

        Main.TopAgameDefaultUser = 44;

        document.getElementById("top_bar_spacing").style.paddingLeft = Main.TopSpacingDefault + "%";
        document.getElementById("id_agame_name").style.paddingLeft = Main.TopAgameDefault + "%";
    } else console.log("language is " + lang);
    DefaultLang();

    if (Main.isReleased) document.body.innerHTML = STR_BODY;
    else STR_CONTROLS_MAIN_0 = STR_CONTROLS_MAIN_0 + STR_BR + Main.CheckMp4Html5();
    // pre load LOD img
    Main.PreLoadAImage(IMG_LOD_LOGO);
    Main.PreLoadAImage(IMG_LOD_GAME);
    Main.PreLoadAImage(IMG_LOD_VIDEO);
    Main.initWindows();
    Live.init();
    Play.PreStart();
    AddUser.RestoreUsers();
    // pre load All img
    Main.PreLoadAImage(IMG_404_VIDEO);
    Main.PreLoadAImage(IMG_404_GAME);
    Main.PreLoadAImage(IMG_404_LOGO);
    Main.PreLoadAImage(IMG_BLUR_GAME);
    Main.PreLoadAImage(IMG_BLUR_VIDEO1);
    Main.PreLoadAImage(IMG_BLUR_VIDEO2);
    Main.PreLoadAImage(IMG_BLUR_VOD);
    Main.PreLoadAImage(IMG_USER_MINUS);
    Main.PreLoadAImage(IMG_USER_PLUS);
    Main.PreLoadAImage(IMG_USER_UP);
};

Main.initWindows = function() {
    //set top bar labels
    $('.label_refresh').html('<i class="fa fa-refresh" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_REFRESH);
    $('.label_search').html('<i class="fa fa-search" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_SEARCH_KEY);
    $('.label_switch').html('<i class="fa fa-exchange" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_SWITCH);
    $('.lable_live').html(STR_LIVE);
    $('.lable_user').html(STR_USER);
    $('.lable_game').html(STR_GAMES);
    $('.label_agame').html('');
    $('.label_search_chanel').html(STR_CHANNELS);
    $('.label_search_game').html(STR_GAMES);
    $('.label_search_live').html(STR_LIVE);
    $('.label_exit_cancel').html(STR_CANCEL);
    $('.label_exit_close').html(STR_CLOSE);
    $('.label_exit_minimize').html(STR_MINIMIZE);
    document.getElementById("main_dialog_exit_text").innerHTML = STR_EXIT_MESSAGE;
    $('.label_buffering').html(STR_BUFFERING);
    $('.label_controls').html('<i class="fa fa-question-circle" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_CONTROL_KEY);
    $('.label_about').html('<i class="fa fa-info-circle" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_ABOUT_KEY);
    document.getElementById("dialog_about_text").innerHTML = STR_ABOUT_INFO_HEADER + STR_ABOUT_INFO_0;
    document.getElementById("dialog_controls_text").innerHTML = STR_CONTROLS_MAIN_0;
    $("#scene2").hide();
};

Main.showLoadDialog = function() {
    Main.HideExitDialog();
    $("#dialog_loading").show();
};

Main.HideLoadDialog = function() {
    $("#dialog_loading").hide();
};

Main.clearExitDialog = function() {
    window.clearTimeout(Main.ExitDialogID);
};

Main.setExitDialog = function() {
    Main.ExitDialogID = window.setTimeout(Main.HideExitDialog, 6000);
};

Main.showExitDialog = function() {
    Main.setExitDialog();
    $("#main_dialog_exit").show();
};

Main.HideExitDialog = function() {
    Main.clearExitDialog();
    $("#main_dialog_exit").hide();
    Live.ExitCursor = 0;
    Live.ExitCursorSet();
};

Main.isExitDialogShown = function() {
    return $("#main_dialog_exit").is(":visible");
};

Main.CounterDialogRst = function() {
    $("#dialog_counter_text").text('');
    Main.Scrollbar(0, 0, 0);
};

Main.CounterDialog = function(x, y, coloumns, total) {
    if (total > 0) {
        $("#dialog_counter_text").text((y * coloumns) + (x + 1) + '/' + (total));
        Main.Scrollbar(y, coloumns, total);
    } else Main.CounterDialogRst();
};

Main.Scrollbar = function(y, coloumns, total) {
    // min 100 max 1000 or the 900 + 100 below
    if ((coloumns == 3 && (total > 9)) || (coloumns == 5 && (total > 10)) || (coloumns == 6 && (total > 12))) {
        var nextPositon = Math.ceil(900 / (Math.ceil(total / coloumns) - 1) * y + 100);
        var currentPositon = document.getElementById('scrollbar').offsetTop;

        //If position are different it means previously animation did't ended, stop it and force set the value
        if (currentPositon != Main.nextScrollPositon) {
            $('#scrollbar').stop();
            document.getElementById("scrollbar").style.top = Main.nextScrollPositon + "px";
        }
        Main.nextScrollPositon = nextPositon;

        $('#scrollbar').animate({
            top: nextPositon + 'px'
        }, 800);

        if (Main.ScrollbarBlack) {
            Main.ScrollbarBlack = false;
            window.setTimeout(function() {
                document.getElementById("scrollbar").style.backgroundColor = "#777777";
            }, (nextPositon == 100 ? 0 : 800));
        }
    } else {
        $('#scrollbar').stop();
        document.getElementById("scrollbar").style.backgroundColor = "#000000";
        Main.nextScrollPositon = 100;
        Main.ScrollbarBlack = true;
        document.getElementById("scrollbar").style.top = "100px";
    }
};

Main.SetItemsLimitReload = function(blankCellCount) {
    Main.ItemsLimitReload = 12;
    if (blankCellCount > (Main.ItemsLimitReload / 3)) Main.ItemsLimitReload = blankCellCount * 3;
    if (Main.ItemsLimitReload > 99) Main.ItemsLimitReload = 99;
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
    Main.HideUpdateDialog();
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
    Main.HideUpdateDialog();
    $("#dialog_controls").show();
};

Main.HideControlsDialog = function() {
    $("#dialog_controls").hide();
};


Main.isControlsDialogShown = function() {
    return $("#dialog_controls").is(":visible");
};

Main.showUpdateDialog = function() {
    Main.HideExitDialog();
    Main.HideAboutDialog();
    Main.HideControlsDialog();
    $("#dialog_update").show();
};

Main.HideUpdateDialog = function() {
    $("#dialog_update").hide();
};

Main.isUpdateDialogShown = function() {
    return $("#dialog_update").is(":visible");
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
    return (content.indexOf('live') !== -1) ? '' : STR_NOT_LIVE;
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
    Main.HideWarningDialog();
    Main.CounterDialogRst();
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
    document.getElementById("top_bar_spacing").style.paddingLeft = Main.TopSpacingDefault + "%";
    document.getElementById("id_agame_name").style.paddingLeft = Main.TopAgameDefault + "%";
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
    document.getElementById("top_bar_spacing").style.paddingLeft = Main.TopSpacingCleanTop + "%";
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    document.getElementById("id_agame_name").style.paddingLeft = Main.TopAgameDefaultCleanTop + "%";
};

Main.videoCreatedAt = function(time) { //time in '2017-10-27T13:27:27Z'
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    time = new Date(time);
    return monthNames[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear();
};

Main.ReplaceTable = function(table) {
    document.getElementById(table).innerHTML = document.getElementById(Main.TempTable).innerHTML;
    $('#' + Main.TempTable).empty();
};

Main.AddTable = function(table) {
    document.getElementById(table).innerHTML += document.getElementById(Main.TempTable).innerHTML;
    $('#' + Main.TempTable).empty();
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

Main.checkVersion = function() {
    var version = null,
        value = 0;
    try {
        version = (tizen.application.getAppInfo().version);
    } catch (e) {}
    if (version !== null) {
        Main.currentVersion = version;
        Main.versonTag = STR_VERSION + version + '.' + Main.minversion + STR_BR;
        version = version.split(".");
        value = parseInt(version[0] + version[1] + version[2]);
        document.getElementById("dialog_about_text").innerHTML = STR_ABOUT_INFO_HEADER + Main.versonTag + STR_ABOUT_INFO_0;
        document.getElementById("dialog_update_text").innerHTML = STR_UPDATE_MAIN_HEADER + STR_CURRENT_VERSION + Main.currentVersion + STR_LATEST_VERSION + Main.stringVersion + STR_BR + STR_UPDATE_MAIN_0;
        return value < Main.version;
    } else return false;
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


Main.LoadImagesPre = function(img_type) {
    Main.LoadImages(Main.imgMatrix, Main.imgMatrixId, img_type);
};

Main.LoadImages = function(imgVector, idVector, img_type) {
    var loadImages = function(position, ImgObjet) {
        ImgObjet.onerror = function() {
            this.src = img_type; //img fail to load use predefined
        };
        ImgObjet.src = imgVector[position];
    };

    for (var i = 0; i < imgVector.length; i++) {
        loadImages(i, document.getElementById(idVector[i]));
    }
};

Main.PreLoadAImage = function(link) {
    Main.newImg.src = link;
};

Main.createCellEmpty = function(row_id, coloumn_id, cell) {
    // id here can't be equal between screen
    return $('<td id="' + cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
};

Main.CheckMp4Html5 = function() {
    var result = STR_BR + 'Html5 mp4 video support:' + STR_BR + STR_DOT;
    if (!!document.createElement('video').canPlayType) {

        var VideoTest = document.createElement("video");
        var h264Test = VideoTest.canPlayType('video/mp4; codecs="avc1.42E01E"');

        if (h264Test) {
            if (h264Test == "probably") result += " Full support for avc1.";
            else result += " Some support for avc1.(" + h264Test + ")";
        } else {
            result += "No video support for avc1.";
        }

        result += STR_BR + STR_DOT;
        h264Test = VideoTest.canPlayType('video/mp4; codecs="mp4a.40.2"');

        if (h264Test) {
            if (h264Test == "probably") result += " Full support for mp4a.";
            else result += " Some support for mp4a.(" + h264Test + ")";
        } else {
            result += " No video support for mp4a.";
        }

    } else result += "No video support at all, createElement video fail.";

    return result;
};

Main.addFocusVideo = function(y, x, Thumbnail, ThumbnailDiv, DispNameDiv, StreamTitleDiv, StreamGameDiv,
    ViwersDiv, QualityDiv, screen, ColoumnsCount, itemsCount) {
    $('#' + Thumbnail + y + '_' + x).addClass(Main.classThumb);
    $('#' + ThumbnailDiv + y + '_' + x).addClass(Main.classText);
    $('#' + DispNameDiv + y + '_' + x).addClass(Main.classChannel);
    $('#' + StreamTitleDiv + y + '_' + x).addClass(Main.classInfo);
    $('#' + StreamGameDiv + y + '_' + x).addClass(Main.classInfo);
    $('#' + ViwersDiv + y + '_' + x).addClass(Main.classInfo);
    $('#' + QualityDiv + y + '_' + x).addClass(Main.classInfo);

    window.setTimeout(function() {
        Main.ScrollHelper.scrollVerticalToElementById(Thumbnail, y, x, screen, Main.ScrollOffSetMinusVideo, Main.ScrollOffSetVideo, false);
    }, 10);

    Main.CounterDialog(x, y, ColoumnsCount, itemsCount);
};

Main.removeFocusVideo = function(y, x, Thumbnail, ThumbnailDiv, DispNameDiv, StreamTitleDiv, StreamGameDiv, ViwersDiv, QualityDiv) {
    $('#' + Thumbnail + y + '_' + x).removeClass(Main.classThumb);
    $('#' + ThumbnailDiv + y + '_' + x).removeClass(Main.classText);
    $('#' + DispNameDiv + y + '_' + x).removeClass(Main.classChannel);
    $('#' + StreamTitleDiv + y + '_' + x).removeClass(Main.classInfo);
    $('#' + StreamGameDiv + y + '_' + x).removeClass(Main.classInfo);
    $('#' + ViwersDiv + y + '_' + x).removeClass(Main.classInfo);
    $('#' + QualityDiv + y + '_' + x).removeClass(Main.classInfo);
};

Main.addFocusGame = function(y, x, Thumbnail, ThumbnailDiv, DispNameDiv, ViwersDiv, screen, ColoumnsCount, itemsCount) {
    $('#' + Thumbnail + y + '_' + x).addClass(Main.classThumb);
    $('#' + ThumbnailDiv + y + '_' + x).addClass(Main.classText);
    $('#' + DispNameDiv + y + '_' + x).addClass(Main.classChannel);
    $('#' + ViwersDiv + y + '_' + x).addClass(Main.classInfo);

    window.setTimeout(function() {
        Main.ScrollHelper.scrollVerticalToElementById(Thumbnail, y, x, screen, Main.ScrollOffSetMinusGame, Main.ScrollOffSetGame, false);
    }, 10);

    Main.CounterDialog(x, y, ColoumnsCount, itemsCount);
};

Main.removeFocusGame = function(y, x, Thumbnail, ThumbnailDiv, DispNameDiv, ViwersDiv) {
    $('#' + Thumbnail + y + '_' + x).removeClass(Main.classThumb);
    $('#' + ThumbnailDiv + y + '_' + x).removeClass(Main.classText);
    $('#' + DispNameDiv + y + '_' + x).removeClass(Main.classChannel);
    $('#' + ViwersDiv + y + '_' + x).removeClass(Main.classInfo);
};

Main.MatrixRst = function() {
    Main.imgMatrix = [];
    Main.imgMatrixId = [];
    Main.imgMatrixCount = 0;
};

Main.CellMatrixVod = function(preview_thumbnail, ColoumnsCount, Thumbnail, row_id, coloumn_id, VideoSize) {
    preview_thumbnail = preview_thumbnail.replace("320x240", VideoSize);
    Main.imgMatrix[Main.imgMatrixCount] = preview_thumbnail;
    Main.imgMatrixId[Main.imgMatrixCount] = Thumbnail + row_id + '_' + coloumn_id;
    Main.imgMatrixCount++;

    if (Main.imgMatrixCount < (ColoumnsCount * 4)) Main.PreLoadAImage(preview_thumbnail); //try to pre cache first 3 rows
};

Main.CellMatrixChannel = function(preview_thumbnail, ColoumnsCount, Thumbnail, row_id, coloumn_id) {
    Main.imgMatrix[Main.imgMatrixCount] = preview_thumbnail;
    Main.imgMatrixId[Main.imgMatrixCount] = Thumbnail + row_id + '_' + coloumn_id;
    Main.imgMatrixCount++;

    if (Main.imgMatrixCount < (ColoumnsCount * 5)) Main.PreLoadAImage(preview_thumbnail); //try to pre cache first 3 rows
};

Main.CellMatrix = function(preview_thumbnail, ColoumnsCount, Thumbnail, row_id, coloumn_id, VideoSize) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", VideoSize);
    Main.imgMatrix[Main.imgMatrixCount] = preview_thumbnail;
    Main.imgMatrixId[Main.imgMatrixCount] = Thumbnail + row_id + '_' + coloumn_id;
    Main.imgMatrixCount++;

    if (Main.imgMatrixCount < (ColoumnsCount * 4)) Main.PreLoadAImage(preview_thumbnail); //try to pre cache first 3 rows
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
            if (!Main.ThumbNull((cursorY + 1), 0, Thumbnail)) {
                if (cursorY > 2) id = Thumbnail + (cursorY - 1) + '_' + cursorX;
                else cursorY = 0;
            }
        } else if (cursorY > 1 && OffsetPlus !== Main.ScrollOffSetGame && !Main.ThumbNull((cursorY + 1), 0, Thumbnail)) {
            id = Thumbnail + (cursorY - 1) + '_' + cursorX;
        } else if (cursorY == 1 && OffsetPlus !== Main.ScrollOffSetGame && !Main.ThumbNull((cursorY + 1), 0, Thumbnail)) {
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

    scrollVerticalToElementById: function(id) {
        $(window).scrollTop(this.documentVerticalScrollPosition() +
            this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight());
    }
};
