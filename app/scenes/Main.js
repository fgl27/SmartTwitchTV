/*jshint multistr: true */
function Main() {

}

//Variable initialization
Main.Hide = '';
Main.Show = '';
Main.Go = 1;

Main.Live = 1;
Main.User = 2;
Main.Games = 3;
Main.AGames = 4;
Main.UserLive = 5;
Main.UserHost = 6;
Main.UserGames = 7;
Main.UserAGames = 8;
Main.UserVod = 9;
Main.UserAVod = 10;
Main.selectedChannel = '';
Main.selectedChannelDisplayname = '';
Main.listenerID = null;
Main.ExitDialogID = null;
Main.selectedGame = '';
Main.selectedGameDisplayname = '';

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
//Variable initialization end


// this function will be called only once
document.addEventListener("DOMContentLoaded", function() {
    Main.initWindows();
    Main.Show = Main.Live;
    Live.init();
    Play.PreStart();
});

Main.initWindows = function() {
    //set top bar labels
    $('.label_refresh').html('<i class="fa fa-refresh" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_REFRESH);
    $('.label_search').html('<i class="fa fa-search" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_SEARCH);
    $('.label_switch').html('<i class="fa fa-exchange" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_SWITCH);
    $('.lable_live').html(STR_LIVE);
    $('.lable_user').html(STR_USER);
    $('.lable_game').html(STR_GAMES);
    $("#main_dialog_exit_text").text(STR_EXIT);

    $('.label_buffering').html(STR_BUFFERING);
    //hide all but Live
    Main.HideExitDialog();
    $("#scene2").hide();
    $("#stream_table_user").hide();
    $("#stream_table_user_live").hide();
    $("#stream_table_user_host").hide();
    $("#stream_table_user_games").hide();
    $("#stream_table_user_a_games").hide();
    $("#stream_table_user_vod").hide();
    $("#stream_table_user_a_vod").hide();
    $("#stream_table_games").hide();
    $("#stream_table_a_game").hide();
};

Main.showLoadDialog = function() {
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
    $("#dialog_warning_text").text(title);
    $("#dialog_warning").show();
};

Main.HideWarningDialog = function() {
    $("#dialog_warning_text").text('');
    $("#dialog_warning").hide();
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

    scrollVerticalToElementById: function(id) {
        if (document.getElementById(id) === null) {
            return;
        }

        $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight());
    }
};

Main.StartPlayerLive = function() {
    document.body.addEventListener("keydown", Play.handleKeyDown, false);
    Play.Start();
};

Main.ReStartScreens = function() {
    Main.SwitchScreen();
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
};

Main.SwitchScreen = function() {
    if (Main.Go === Main.Live) Live.init();
    else if (Main.Go === Main.Games) Games.init();
};

Main.openStream = function() {
    document.body.addEventListener("keydown", Play.handleKeyDown, false);

    $("#scene2").show();
    Play.hidePanel();
    Play.hideChat();
    window.setTimeout(function() {
        $("#scene1").hide();
        Play.Start();
    }, 15);
};

//TODO re check way a div with all does't work
Main.HideAllScreen = function() {
    $('#stream_table_live').hide();
    $('#stream_table_user').hide();
    $('#stream_table_user_live').hide();
    $('#stream_table_user_host').hide();
    $('#stream_table_user_games').hide();
    $('#stream_table_user_a_game').hide();
    $('#stream_table_user_vod').hide();
    $('#stream_table_user_a_vod').hide();
    $('#stream_table_a_game').hide();
    $('#stream_table_games').hide();
};

Main.ShowAllScreen = function() {
    $('#stream_table_live').show();
    $('#stream_table_user').show();
    $('#stream_table_user_live').show();
    $('#stream_table_user_host').show();
    $('#stream_table_user_games').show();
    $('#stream_table_user_a_game').show();
    $('#stream_table_user_vod').show();
    $('#stream_table_user_a_vod').show();
    $('#stream_table_a_game').show();
    $('#stream_table_games').show();
};

Main.NetworkStateChangeListener = function() {
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
