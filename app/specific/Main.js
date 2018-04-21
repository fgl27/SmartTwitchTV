//Variable initialization
var main_isReleased = false;
var main_Hide = '';
var main_Go = 1;
var main_Before = 1;
var main_BeforeSearch = 1;
var main_cursorY = -1;
var main_newImg = new Image();

var main_Live = 1;
var main_addUser = 2;
var main_games = 3;
var main_aGame = 4;
var main_UserLive = 5;
var main_UserHost = 6;
var main_usergames = 7;
var main_UserVod = 8;
var main_UserAVod = 9;
var main_Search = 10;
var main_sgames = 11;
var main_SLive = 12;
var main_SChannelContent = 13;
var main_Svod = 14;
var main_Sclip = 15;
var main_Users = 16;
var main_UserChannels = 17;
var main_SChannels = 18;
var main_addCode = 19;
var main_selectedChannel = '';
var main_selectedChannelDisplayname = '';
var main_selectedChannelLogo = '';
var main_selectedChannelViews = '';
var main_selectedChannelFallower = '';
var main_listenerID = null;
var main_ExitDialogID = null;
var main_selectedGame = '';
var main_selectedGameDisplayname = '';
var main_gameSelected = '';
var main_OldgameSelected = null;
var main_OldUserName = '';
var main_SmartHubId = null;
var main_UserName = '';
var main_ScrollbarBlack = true;
var main_NetworkStateOK = true;
var main_NetworkRefresh = false;
var main_td = '';

var main_ScrollOffSetVideo = 275;
var main_ScrollOffSetGame = 523;

//Offset value in relation to height of class screen_size, to change split the below by height and multiply with the new value
var main_ScrollOffSetMinusVideo = 372;
var main_ScrollOffSetMinusChannels = 464;
var main_ScrollOffSetMinusGame = 567;
var main_ScrollOffSetMinusDuploYOffsetCheck = 92;
var main_ScrollOffSetMinusaddUser = 60;
var main_ScrollOffSetMinusSearch = 100;
var main_ScrollOffSetMinusAgame = 83;

//The values of thumbnail and related for it screen type
var main_ReloadLimitOffsetGames = 1.35;
var main_ReloadLimitOffsetVideos = 1.5;

var main_ItemsLimitVideo = 99;
var main_ColoumnsCountVideo = 3;
var main_ItemsReloadLimitVideo = Math.floor((main_ItemsLimitVideo / main_ColoumnsCountVideo) / main_ReloadLimitOffsetVideos);

var main_ItemsLimitGame = 95;
var main_ColoumnsCountGame = 5;
var main_ItemsReloadLimitGame = Math.floor((main_ItemsLimitGame / main_ColoumnsCountGame) / main_ReloadLimitOffsetGames);

var main_ItemsLimitChannel = 96;
var main_ColoumnsCountChannel = 6;
var main_ItemsReloadLimitChannel = Math.floor((main_ItemsLimitChannel / main_ColoumnsCountChannel) / main_ReloadLimitOffsetVideos);

// How many streams will be request on a reload
var main_ItemsLimitReload = 6;

var main_clientId = "ypvnuqrh98wqz1sr0ov3fgfu4jh1yx";
var main_VideoSize = "528x297"; // default size 640x360
var main_GameSize = "340x475"; // default size 272x380

var main_classThumb = 'stream_thumbnail_focused';
var main_classText = 'stream_text_focused';
var main_classInfo = 'stream_info_focused';
var main_TitleClass = 'stream_channel';

var main_version = 400;
var main_stringVersion = '4.0.0';
var main_currentVersion = '';
var main_minversion = '042118';
var main_versonTag = '';

var GIT_IO = "https://bhb27.github.io/smarttv-twitch/release/githubio/images/";
var IMG_404_GAME = GIT_IO + "404_game.png";
var IMG_404_LOGO = GIT_IO + "404_logo.png";
var IMG_404_VIDEO = GIT_IO + "404_video.png";
var IMG_BLUR_GAME = GIT_IO + "blur_game.png";
var IMG_BLUR_VIDEO1 = GIT_IO + "blur_video_1.png";
var IMG_BLUR_VIDEO2 = GIT_IO + "blur_video_2.png";
var IMG_BLUR_VIDEO1_16 = GIT_IO + "blur_video_1_16.png";
var IMG_BLUR_VIDEO2_16 = GIT_IO + "blur_video_2_16.png";
var IMG_BLUR_VOD = GIT_IO + "blur_vod.png";
var IMG_USER_MINUS = GIT_IO + "user_minus.png";
var IMG_USER_PLUS = GIT_IO + "user_plus.png";
var IMG_USER_UP = GIT_IO + "user_up.png";
var IMG_USER_CODE = GIT_IO + "user_code.png";
var IMG_LOD_LOGO = GIT_IO + "ch_logo.png";
var TEMP_MP4 = GIT_IO + "temp.mp4";
var IMG_SMART_LIVE = GIT_IO + "smart_live.png";
var IMG_SMART_GAME = GIT_IO + "smart_games.png";
var IMG_SMART_USER = GIT_IO + "smart_add_user.png";
//Variable initialization end

//Registering all used keys
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

// this function will be called only once the first time the app startup
document.addEventListener("DOMContentLoaded", function() {
    tizen.systeminfo.getPropertyValue('LOCALE', main_loadTranslations);
});

//TODO the day there is a translation add on if if the new values
function main_loadTranslations(device) {

    // Language is set as (LANGUAGE)_(REGION) in (ISO 639-1)_(ISO 3166-1 alpha-2) eg.; pt_BR Brazil, en_US USA
    // https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

    var lang = device.language.split(".")[0];
    if (lang.indexOf('pt_') !== -1) pt_BRLang();
    else console.log("language is " + lang);
    DefaultLang();
    
    if (main_isReleased) document.body.innerHTML = STR_BODY;
    else STR_CONTROLS_MAIN_0 = STR_CONTROLS_MAIN_0 + STR_BR + main_CheckMp4Html5();
    main_initWindows();
    Live.init();
    Play.PreStart();
    usergames_live = (localStorage.getItem('user_games_live') || 'true') === 'true' ? true : false;
    addUser_RestoreUsers();
    // pre load All img
    main_PreLoadAImage(IMG_404_VIDEO);
    main_PreLoadAImage(IMG_404_GAME);
    main_PreLoadAImage(IMG_404_LOGO);
    main_PreLoadAImage(IMG_BLUR_GAME);
    main_PreLoadAImage(IMG_BLUR_VIDEO1);
    main_PreLoadAImage(IMG_BLUR_VIDEO2);
    main_PreLoadAImage(IMG_BLUR_VIDEO1_16);
    main_PreLoadAImage(IMG_BLUR_VIDEO2_16);
    main_PreLoadAImage(IMG_BLUR_VOD);
    main_PreLoadAImage(IMG_USER_MINUS);
    main_PreLoadAImage(IMG_USER_PLUS);
    main_PreLoadAImage(IMG_USER_UP);
    main_PreLoadAImage(IMG_USER_CODE);
}

function main_initWindows() {
    //set top bar labels
    main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH);
    main_IconLoad('label_search', 'icon-search', STR_SEARCH_KEY);
    main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
    main_IconLoad('label_controls', 'icon-question-circle', STR_CONTROL_KEY);
    main_IconLoad('label_about', 'icon-info-circle', STR_ABOUT_KEY);
    document.getElementById('top_bar_live').innerHTML = STR_LIVE;
    document.getElementById('top_bar_user').innerHTML = STR_USER;
    document.getElementById('top_bar_game').innerHTML = STR_GAMES;
    document.getElementById('chanel_button').innerHTML = STR_CHANNELS;
    document.getElementById('game_button').innerHTML = STR_GAMES;
    document.getElementById('live_button').innerHTML = STR_LIVE;
    document.getElementById('exit_app_cancel').innerHTML = STR_CANCEL;
    document.getElementById('exit_app_close').innerHTML = STR_CLOSE;
    document.getElementById('remove_cancel').innerHTML = STR_CANCEL;
    document.getElementById('remove_yes').innerHTML = STR_YES;
    document.getElementById('exit_app_minimize').innerHTML = STR_MINIMIZE;
    document.getElementById("main_dialog_exit_text").innerHTML = STR_EXIT_MESSAGE;
    document.getElementById("dialog_about_text").innerHTML = STR_ABOUT_INFO_HEADER + STR_ABOUT_INFO_0;
    document.getElementById("dialog_controls_text").innerHTML = STR_CONTROLS_MAIN_0;
    main_NetworkStateChangeListenerStart();
}

function main_IconLoad(lable, icon, string) {
    document.getElementById(lable).innerHTML = '<div style="vertical-align: middle; display: inline-block;"><i class="' + icon +
        '" style="color: #FFFFFF; font-size: 115%; "></i></div><div style="vertical-align: middle; display: inline-block">' + STR_SPACE + string + '</div>';
}

function main_ChangeBorder(div, value) {
    document.getElementById(div).style.border = value;
}

function main_ChangebackgroundColor(div, value) {
    document.getElementById(div).style.backgroundColor = value;
}

function main_showLoadDialog() {
    main_HideExitDialog();
    document.getElementById('dialog_loading').classList.remove('hide');
}

function main_HideLoadDialog() {
    document.getElementById('dialog_loading').classList.add('hide');
}

function main_clearExitDialog() {
    window.clearTimeout(main_ExitDialogID);
}

function main_setExitDialog() {
    main_ExitDialogID = window.setTimeout(main_HideExitDialog, 6000);
}

function main_showExitDialog() {
    main_setExitDialog();
    document.getElementById('main_dialog_exit').classList.remove('hide');
}

function main_HideExitDialog() {
    main_clearExitDialog();
    document.getElementById('main_dialog_exit').classList.add('hide');
    Live.ExitCursor = 0;
    Live.ExitCursorSet();
}

function main_isExitDialogShown() {
    return document.getElementById('main_dialog_exit').className.indexOf('hide') === -1;
}

function main_CounterDialogRst() {
    document.getElementById('dialog_counter_text').innerHTML = '';
    main_Scrollbar(0, 0, 0);
}

function main_CounterDialog(x, y, coloumns, total) {
    if (total > 0) {
        document.getElementById('dialog_counter_text').innerHTML = (y * coloumns) + (x + 1) + '/' + (total);
        main_Scrollbar(y, coloumns, total);
    } else main_CounterDialogRst();
}

function main_Scrollbar(y, coloumns, total) {
    // min 100 max 1000 or the 900 + 100 below
    if ((coloumns === 3 && (total > 9)) || (coloumns === 5 && (total > 10)) || (coloumns === 6 && (total > 12))) {
        var nextPositon = Math.ceil(900 / (Math.ceil(total / coloumns) - 1) * y + 100);
        var currentPositon = document.getElementById('scrollbar').offsetTop;

        //If position are different it means previously animation did't ended, stop it and force set the value
        if (currentPositon !== main_nextScrollPositon) {
            $('#scrollbar').stop();
            document.getElementById("scrollbar").style.top = main_nextScrollPositon + "px";
        }
        main_nextScrollPositon = nextPositon;

        $('#scrollbar').animate({
            top: nextPositon + 'px'
        }, 400);

        if (main_ScrollbarBlack) {
            main_ScrollbarBlack = false;
            window.setTimeout(function() {
                document.getElementById("scrollbar").style.backgroundColor = "#777777";
            }, (nextPositon === 100 ? 0 : 800));
        }
    } else {
        $('#scrollbar').stop();
        document.getElementById("scrollbar").style.backgroundColor = "#000000";
        main_nextScrollPositon = 100;
        main_ScrollbarBlack = true;
        document.getElementById("scrollbar").style.top = "100px";
    }
}

function main_SetItemsLimitReload(blankCellCount) {
    main_ItemsLimitReload = 12;
    if (blankCellCount > (main_ItemsLimitReload / 3)) main_ItemsLimitReload = blankCellCount * 3;
    if (main_ItemsLimitReload > 99) main_ItemsLimitReload = 99;
}

function main_showWarningDialog(text) {
    if (!main_NetworkStateOK && text === STR_REFRESH_PROBLEM) main_NetworkRefresh = true;
    document.getElementById('dialog_warning_text').innerHTML = !main_NetworkStateOK ? STR_NET_DOWN : text;
    document.getElementById('dialog_warning').classList.remove('hide');
}

function main_HideWarningDialog() {
    document.getElementById('dialog_warning').classList.add('hide');
}

function main_isWarningDialogShown() {
    return document.getElementById('dialog_warning').className.indexOf('hide') === -1;
}

function main_showAboutDialog() {
    main_HideExitDialog();
    main_HideControlsDialog();
    main_HideUpdateDialog();
    document.getElementById('dialog_about').classList.remove('hide');
}

function main_HideAboutDialog() {
    document.getElementById('dialog_about').classList.add('hide');
}

function main_isAboutDialogShown() {
    return document.getElementById('dialog_about').className.indexOf('hide') === -1;
}

function main_showControlsDialog() {
    main_HideExitDialog();
    main_HideAboutDialog();
    main_HideUpdateDialog();
    document.getElementById('dialog_controls').classList.remove('hide');
}

function main_HideControlsDialog() {
    document.getElementById('dialog_controls').classList.add('hide');
}


function main_isControlsDialogShown() {
    return document.getElementById('dialog_controls').className.indexOf('hide') === -1;
}

function main_showUpdateDialog() {
    main_HideExitDialog();
    main_HideAboutDialog();
    main_HideControlsDialog();
    document.getElementById('dialog_update').classList.remove('hide');
}

function main_HideUpdateDialog() {
    document.getElementById('dialog_update').classList.add('hide');
}

function main_isUpdateDialogShown() {
    return document.getElementById('dialog_update').className.indexOf('hide') === -1;
}

function main_addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function main_videoqualitylang(video_height, average_fps, language) {
    video_height = video_height + ''; //stringfy doesnot work 8|
    if (!video_height.indexOf('x')) video_height = video_height.slice(-3);

    if (average_fps > 58) average_fps = 60;
    else if (average_fps < 32) average_fps = 30;
    else average_fps = Math.ceil(average_fps);

    return video_height + 'p' + average_fps + ((language !== "") ? ' [' + language.toUpperCase() + ']' : '');
}

function main_is_playlist(content) {
    return (content.indexOf('live') !== -1) ? '' : STR_NOT_LIVE;
}

function main_ThumbNull(y, x, thumbnail) {
    return document.getElementById(thumbnail + y + '_' + x, 0) !== null;
}

function main_StartPlayerLive() {
    document.body.addEventListener("keydown", Play.handleKeyDown, false);
    Play.Start();
}

function main_ReStartScreens() {
    document.getElementById('play_dialog_exit').classList.add('hide');
    main_SwitchScreen();
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
}

function main_SwitchScreen() {
    main_ScrollHelperBlank('blank_focus');
    if (main_NetworkStateOK) main_HideWarningDialog();
    main_CounterDialogRst();
    if (main_Go === main_Live) Live.init();
    else if (main_Go === main_addUser) addUser_init();
    else if (main_Go === main_games) games_init();
    else if (main_Go === main_aGame) aGame_init();
    else if (main_Go === main_Search) Search.init();
    else if (main_Go === main_sgames) sgames_init();
    else if (main_Go === main_SLive) SLive.init();
    else if (main_Go === main_SChannelContent) SChannelContent.init();
    else if (main_Go === main_Svod) Svod.init();
    else if (main_Go === main_Sclip) Sclip.init();
    else if (main_Go === main_Users) Users.init();
    else if (main_Go === main_UserLive) UserLive.init();
    else if (main_Go === main_UserHost) UserHost.init();
    else if (main_Go === main_usergames) usergames_init();
    else if (main_Go === main_UserChannels) UserChannels.init();
    else if (main_Go === main_SChannels) SChannels.init();
    else Live.init();
}

function main_ExitCurrent(ExitCurrent) {
    if (ExitCurrent === main_Live) Live.exit();
    else if (ExitCurrent === main_addUser) addUser_exit();
    else if (ExitCurrent === main_games) games_exit();
    else if (ExitCurrent === main_aGame) aGame_exit();
    else if (ExitCurrent === main_Search) Search.exit();
    else if (ExitCurrent === main_sgames) sgames_exit();
    else if (ExitCurrent === main_SLive) SLive.exit();
    else if (ExitCurrent === main_SChannelContent) SChannelContent.exit();
    else if (ExitCurrent === main_Svod) Svod.exit();
    else if (ExitCurrent === main_Sclip) Sclip.exit();
    else if (ExitCurrent === main_Users) Users.exit();
    else if (ExitCurrent === main_UserLive) UserLive.exit();
    else if (ExitCurrent === main_UserHost) UserHost.exit();
    else if (ExitCurrent === main_usergames) usergames_exit();
    else if (ExitCurrent === main_UserChannels) UserChannels.exit();
    else if (ExitCurrent === main_SChannels) SChannels.exit();
}

function main_openStream() {
    document.body.addEventListener("keydown", Play.handleKeyDown, false);
    document.getElementById('scene2').classList.remove('hide');
    Play.hidePanel();
    Play.hideChat();
    document.getElementById('scene1').classList.add('hide');
    Play.Start();
}

function main_RestoreTopLabel() {
    main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH);
    main_IconLoad('label_search', 'icon-search', STR_SEARCH_KEY);
    main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.getElementById('top_bar_live').innerHTML = STR_LIVE;
    document.getElementById('top_bar_user').innerHTML = STR_USER;
    document.getElementById('top_bar_game').innerHTML = STR_GAMES;
}

function main_cleanTopLabel() {
    main_IconLoad('label_refresh', 'icon-arrow-circle-left', STR_GOBACK);
    document.getElementById('label_switch').innerHTML = '';
    document.getElementById('top_bar_live').innerHTML = '';
    document.getElementById('top_bar_game').innerHTML = '';
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
}

function main_UnderCenter(text) {
    return '<div style="font-size: 30%; position: fixed; line-height: 0;">' + text + '</div>';
}

function main_videoCreatedAt(time) { //time in '2017-10-27T13:27:27Z'
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    time = new Date(time);
    return monthNames[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear();
}

function main_NetworkStateChangeListenerStart() {
    var onChange = function(data) {
        if (data === 1 || data === 4) { //network connected
            main_NetworkStateOK = true;
            if (main_isWarningDialogShown()) {
                main_showWarningDialog(STR_NET_UP);
                if (main_NetworkRefresh) main_SwitchScreen();
                main_NetworkRefresh = false;
            }
            if (Play.WarningDialogVisible()) main_showWarningDialog(STR_NET_UP);
            window.setTimeout(main_HideExitDialog, 1500);
        } else if (data === 2 || 5) { //network down
            main_NetworkStateOK = false;
            window.setTimeout(function() {
                if (!main_NetworkStateOK) {
                    main_showWarningDialog('');
                    Play.showWarningDialog(STR_NET_DOWN);
                }
            }, 5000);
        }
    };
    try {
        main_listenerID = webapis.network.addNetworkStateChangeListener(onChange);
    } catch (e) {}
}

function main_NetworkStateChangeListenerStop() {
    try {
        webapis.network.removeNetworkStateChangeListener(main_listenerID);
    } catch (e) {}
}

function main_checkVersion() {
    var version = null,
        value = 0;
    try {
        version = (tizen.application.getAppInfo().version);
    } catch (e) {}
    if (version !== null) {
        main_currentVersion = version;
        main_versonTag = STR_VERSION + version + '.' + main_minversion + STR_BR;
        version = version.split(".");
        value = parseInt(version[0] + version[1] + version[2]);
        document.getElementById("dialog_about_text").innerHTML = STR_ABOUT_INFO_HEADER + main_versonTag + STR_ABOUT_INFO_0;
        document.getElementById("dialog_update_text").innerHTML = STR_UPDATE_MAIN_HEADER + STR_CURRENT_VERSION + main_currentVersion + STR_LATEST_VERSION + main_stringVersion + STR_BR + STR_UPDATE_MAIN_0;
        return value < main_version;
    } else return false;
}

function main_GoLive() {
    addCode_SetDefaultOAuth(0);
    main_Go = main_Live;
    main_SwitchScreen();
}

function main_Resume() {
    if (document.hidden) {
        window.clearInterval(main_SmartHubId);
        main_NetworkStateChangeListenerStop();
    } else {
        window.setTimeout(function() {
            main_NetworkStateChangeListenerStart();
        }, 20000);
        window.setTimeout(function() {
            if (addUser_UsernameArray.length > 0) {
                if ((new Date().getTime() - 590000) > SmartHub.LastUpdate) SmartHub.Start();
                main_SmartHubId = window.setInterval(SmartHub.Start, 600000);
            } else {
                window.clearInterval(main_SmartHubId);
                document.removeEventListener('visibilitychange', main_Resume);
            }
        }, 1500);
    }
}

function main_LoadImages(imgVector, idVector, img_type) {
    var loadImages = function(position, ImgObjet) {
        ImgObjet.onerror = function() {
            this.src = img_type; //img fail to load use predefined
        };
        ImgObjet.src = imgVector[position];
    };

    for (var i = 0; i < imgVector.length; i++) {
        loadImages(i, document.getElementById(idVector[i]));
    }
}

function main_LazyImgStart(imgId, total, img_type, coloumns) {
    var x, y = 0,
        loadImages = function(ImgObjet) {
            ImgObjet.onerror = function() {
                this.src = img_type; //img fail to load use predefined
            };
            ImgObjet.src = ImgObjet.getAttribute('data-src');
            ImgObjet.removeAttribute('data-src');
        };
    for (y; y < total; y++) {
        for (x = 0; x < coloumns; x++) {
            elem = document.getElementById(imgId + y + '_' + x);
            if (elem !== null) loadImages(elem);
        }
    }
    main_Ychange(0);
}

function main_LazyImg(imgId, row_id, img_type, coloumns, offset) { //offset is one more then number if (cursorY > number)
    var change = main_Ychange(row_id);

    if (row_id === offset && change === 1) change = 0;

    if (change) {
        var x = 0,
            y, elem, loadImages = function(ImgLoadObjet) {
                ImgLoadObjet.onerror = function() {
                    this.src = img_type; //img fail to load use predefined
                };
                ImgLoadObjet.src = ImgLoadObjet.getAttribute('data-src');
                ImgLoadObjet.removeAttribute('data-src');
            },
            resetImages = function(ImgRstObjet) {
                ImgRstObjet.setAttribute('data-src', ImgRstObjet.getAttribute('src'));
                ImgRstObjet.removeAttribute('src');
            };

        for (x; x < coloumns; x++) {
            y = change > 0 ? row_id + offset : row_id - offset;
            elem = document.getElementById(imgId + y + '_' + x);
            if (elem !== null) loadImages(elem);

            y = change > 0 ? row_id - offset - 1 : row_id + offset + 1;
            elem = document.getElementById(imgId + y + '_' + x);
            if (elem !== null) resetImages(elem);
        }
    }
}

function main_Ychange(y) {
    var position = 0;

    if (main_cursorY < y) position = 1; //going down
    else if (main_cursorY > y) position = -1; //going up

    main_cursorY = y;
    return position;
}

function main_YRst(y) {
    main_cursorY = y;
}

function main_PreLoadAImage(link) {
    main_newImg.src = link;
}

function main_createCellEmpty(row_id, coloumn_id, cell) {
    // id here can't be equal between screen
    return $('<td id="' + cell + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname=""></td>').html('');
}

function main_createEmptyCell(id) {
    main_td = document.createElement('td');
    main_td.setAttribute('id', id);
    main_td.className = 'stream_cell';

    return main_td;
}

function main_SetStreamTitle(boolean) {
    if (boolean) main_TitleClass = 'stream_info';
    else main_TitleClass = 'stream_channel';
}

function main_createCellVideo(channel_name, id, idArray, valuesArray) {
    main_td = document.createElement('td');
    main_td.setAttribute('id', idArray[8] + id);
    main_td.setAttribute('data-channelname', channel_name);
    main_td.className = 'stream_cell';
    main_td.innerHTML = main_VideoHtml(id, idArray, valuesArray);

    return main_td;
}

function main_replaceVideo(id, channel_name, valuesArray, cell, splitedId) {
    splitedId = id.split(splitedId)[1];
    id = document.getElementById(id);
    id.setAttribute('data-channelname', channel_name);
    id.innerHTML = main_VideoHtml(splitedId, Live.ids, valuesArray);
    id.setAttribute('id', cell + splitedId);
}

function main_VideoHtml(id, idArray, valuesArray) {
    return '<div id="' + idArray[0] + id + '" class="stream_thumbnail_video" >' +
        '<img id="' + idArray[1] + id + '" class="stream_img" data-src="' + valuesArray[0] + '"></div>' +
        '<div id="' + idArray[2] + id + '" class="stream_text">' +
        '<div id="' + idArray[3] + id + '" class="' + main_TitleClass + '">' + valuesArray[1] + '</div>' +
        '<div id="' + idArray[4] + id + '"class="stream_info">' + valuesArray[2] + '</div>' +
        '<div id="' + idArray[5] + id + '"class="stream_info">' + valuesArray[3] + '</div>' +
        '<div id="' + idArray[6] + id + '"class="stream_info" style="width: 64%; display: inline-block;">' + valuesArray[4] + '</div>' +
        '<div id="' + idArray[7] + id + '"class="stream_info" style="width:35%; float: right; display: inline-block;">' + valuesArray[5] + '</div></div>';
}

function main_CheckMp4Html5() {
    var result = STR_BR + 'Html5 mp4 video support:' + STR_BR + STR_DOT;
    if (!!document.createElement('video').canPlayType) {

        var VideoTest = document.createElement("video");
        var h264Test = VideoTest.canPlayType('video/mp4; codecs="avc1.42E01E"');

        if (h264Test) {
            if (h264Test === "probably") result += " Full support for avc1.";
            else result += " Some support for avc1.(" + h264Test + ")";
        } else {
            result += "No video support for avc1.";
        }

        result += STR_BR + STR_DOT;
        h264Test = VideoTest.canPlayType('video/mp4; codecs="mp4a.40.2"');

        if (h264Test) {
            if (h264Test === "probably") result += " Full support for mp4a.";
            else result += " Some support for mp4a.(" + h264Test + ")";
        } else {
            result += " No video support for mp4a.";
        }

    } else result += "No video support at all, createElement video fail.";

    return result;
}

function main_addFocusVideo(y, x, Thumbnail, ThumbnailDiv, DispNameDiv, StreamTitleDiv, StreamGameDiv,
    ViwersDiv, QualityDiv, screen, ColoumnsCount, itemsCount) {
    document.getElementById(Thumbnail + y + '_' + x).classList.add(main_classThumb);
    document.getElementById(ThumbnailDiv + y + '_' + x).classList.add(main_classText);
    document.getElementById(DispNameDiv + y + '_' + x).classList.add(main_classInfo);
    document.getElementById(StreamTitleDiv + y + '_' + x).classList.add(main_classInfo);
    document.getElementById(StreamGameDiv + y + '_' + x).classList.add(main_classInfo);
    document.getElementById(ViwersDiv + y + '_' + x).classList.add(main_classInfo);
    document.getElementById(QualityDiv + y + '_' + x).classList.add(main_classInfo);

    window.setTimeout(function() {
        main_ScrollHelper(Thumbnail, y, x, screen, main_ScrollOffSetMinusVideo, main_ScrollOffSetVideo, false);
    }, 10);

    main_CounterDialog(x, y, ColoumnsCount, itemsCount);
}

function main_removeFocusVideo(y, x, Thumbnail, ThumbnailDiv, DispNameDiv, StreamTitleDiv, StreamGameDiv, ViwersDiv, QualityDiv) {
    document.getElementById(Thumbnail + y + '_' + x).classList.remove(main_classThumb);
    document.getElementById(ThumbnailDiv + y + '_' + x).classList.remove(main_classText);
    document.getElementById(DispNameDiv + y + '_' + x).classList.remove(main_classInfo);
    document.getElementById(StreamTitleDiv + y + '_' + x).classList.remove(main_classInfo);
    document.getElementById(StreamGameDiv + y + '_' + x).classList.remove(main_classInfo);
    document.getElementById(ViwersDiv + y + '_' + x).classList.remove(main_classInfo);
    document.getElementById(QualityDiv + y + '_' + x).classList.remove(main_classInfo);
}

function main_addFocusVideoArray(y, x, idArray, screen, ColoumnsCount, itemsCount) {
    var id = y + '_' + x;
    document.getElementById(idArray[0] + id).classList.add(main_classThumb);
    document.getElementById(idArray[2] + id).classList.add(main_classText);
    document.getElementById(idArray[3] + id).classList.add(main_classInfo);
    document.getElementById(idArray[4] + id).classList.add(main_classInfo);
    document.getElementById(idArray[5] + id).classList.add(main_classInfo);
    document.getElementById(idArray[6] + id).classList.add(main_classInfo);
    document.getElementById(idArray[7] + id).classList.add(main_classInfo);

    window.setTimeout(function() {
        main_ScrollHelper(idArray[0], y, x, screen, main_ScrollOffSetMinusVideo, main_ScrollOffSetVideo, false);
    }, 10);

    main_CounterDialog(x, y, ColoumnsCount, itemsCount);
}

function main_removeFocusVideoArray(id, idArray) {
    document.getElementById(idArray[0] + id).classList.remove(main_classThumb);
    document.getElementById(idArray[2] + id).classList.remove(main_classText);
    document.getElementById(idArray[3] + id).classList.remove(main_classInfo);
    document.getElementById(idArray[4] + id).classList.remove(main_classInfo);
    document.getElementById(idArray[5] + id).classList.remove(main_classInfo);
    document.getElementById(idArray[6] + id).classList.remove(main_classInfo);
    document.getElementById(idArray[7] + id).classList.remove(main_classInfo);
}

function main_addFocusGame(y, x, Thumbnail, ThumbnailDiv, DispNameDiv, ViwersDiv, screen, ColoumnsCount, itemsCount) {
    document.getElementById(Thumbnail + y + '_' + x).classList.add(main_classThumb);
    document.getElementById(ThumbnailDiv + y + '_' + x).classList.add(main_classText);
    document.getElementById(DispNameDiv + y + '_' + x).classList.add(main_classInfo);
    document.getElementById(ViwersDiv + y + '_' + x).classList.add(main_classInfo);

    window.setTimeout(function() {
        main_ScrollHelper(Thumbnail, y, x, screen, main_ScrollOffSetMinusGame, main_ScrollOffSetGame, false);
    }, 10);

    main_CounterDialog(x, y, ColoumnsCount, itemsCount);
}

function main_removeFocusGame(y, x, Thumbnail, ThumbnailDiv, DispNameDiv, ViwersDiv) {
    document.getElementById(Thumbnail + y + '_' + x).classList.remove(main_classThumb);
    document.getElementById(ThumbnailDiv + y + '_' + x).classList.remove(main_classText);
    document.getElementById(DispNameDiv + y + '_' + x).classList.remove(main_classInfo);
    document.getElementById(ViwersDiv + y + '_' + x).classList.remove(main_classInfo);
}

//TODO split main_ScrollHelper in main_ScrollHelperVideo/game/channel/etc
function main_ScrollHelper(Thumbnail, cursorY, cursorX, Screen, OffsetMinus, OffsetPlus, DuploYOffsetCheck) {
    var id = Thumbnail + cursorY + '_' + cursorX;

    if (document.getElementById(id) === null) {
        if (!cursorY && !cursorX) main_ScrollHelperBlank('blank_focus');
        return;
    } else if (Screen === main_UserChannels || Screen === main_SChannels) {
        if (!main_ThumbNull((cursorY + 1), 0, Thumbnail)) {
            if (cursorY > 2) id = Thumbnail + (cursorY - 1) + '_' + cursorX;
            else cursorY = 0;
        }
    } else if (cursorY > 1 && OffsetPlus !== main_ScrollOffSetGame && !main_ThumbNull((cursorY + 1), 0, Thumbnail)) {
        id = Thumbnail + (cursorY - 1) + '_' + cursorX;
    } else if (cursorY === 1 && OffsetPlus !== main_ScrollOffSetGame && !main_ThumbNull((cursorY + 1), 0, Thumbnail)) {
        id = Thumbnail + (cursorY - 1) + '_' + cursorX;
        cursorY = 0;
    }
    if (!cursorY && Screen === main_aGame) OffsetPlus = OffsetPlus - main_ScrollOffSetMinusAgame;

    if (DuploYOffsetCheck) {
        DuploYOffsetCheck = (!cursorY || cursorY === 1);
        if (DuploYOffsetCheck) {
            id = Thumbnail + '0_' + cursorX;
            OffsetMinus = OffsetMinus - main_ScrollOffSetMinusDuploYOffsetCheck;
        }
    } else DuploYOffsetCheck = (!cursorY);

    if (main_Go === Screen) {
        window.scroll(0, main_documentVerticalScrollPosition() + main_elementVerticalClientPositionById(id) - OffsetMinus + (DuploYOffsetCheck ? OffsetPlus : 0));
    } else return;
}

function main_ScrollHelperBlank(id) {
    window.scroll(0, main_documentVerticalScrollPosition() + main_elementVerticalClientPositionById(id) - main_ScrollOffSetMinusVideo);
}

function main_documentVerticalScrollPosition() {
     return document.body.scrollTop; 
}

function main_elementVerticalClientPositionById(id) {
    return document.getElementById(id).getBoundingClientRect().top;
}
