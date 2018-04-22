/*jshint multistr: true */
//Variable initialization
function SChannelContent() {}
SChannelContent.cursorY = 0;
SChannelContent.cursorX = 0;
SChannelContent.dataEnded = false;
SChannelContent.itemsCount = 0;
SChannelContent.imgMatrix = '';
SChannelContent.imgMatrixId = '';
SChannelContent.loadingData = false;
SChannelContent.loadingDataTry = 0;
SChannelContent.loadingDataTryMax = 10;
SChannelContent.loadingDataTimeout = 3500;
SChannelContent.itemsCountOffset = 0;
SChannelContent.LastClickFinish = true;
SChannelContent.keyClickDelayTime = 25;
SChannelContent.skipImg = false;
SChannelContent.UserChannels = false;
SChannelContent.TargetName = undefined;

SChannelContent.ids = ['scc_thumbdiv', 'scc_img', 'scc_infodiv', 'scc_name', 'scc_createdon', 'scc_game', 'scc_viwers', 'scc_duration', 'scc_cell', 'sccempty_'];
SChannelContent.status = false;
SChannelContent.lastselectedChannel = '';

//Variable initialization end

SChannelContent.init = function() {
    main_Go = main_SChannelContent;
    if (SChannelContent.lastselectedChannel !== main_selectedChannel) SChannelContent.status = false;
    main_cleanTopLabel();
    document.getElementById('top_bar_user').innerHTML = main_selectedChannelDisplayname;
    document.getElementById('top_bar_game').innerHTML = STR_CHANNEL_CONT;
    document.getElementById('id_agame_name').innerHTML = '';
    document.body.addEventListener("keydown", SChannelContent.handleKeyDown, false);
    addCode_PlayRequest = false;
    if (SChannelContent.status) {
        main_ScrollHelper(SChannelContent.ids[0], SChannelContent.cursorY, SChannelContent.cursorX, main_SChannelContent, main_ScrollOffSetMinusVideo, main_ScrollOffSetVideo, false);
        SChannelContent.checkUser();
    } else SChannelContent.StartLoad();
};

SChannelContent.exit = function() {
    main_RestoreTopLabel();
    document.body.removeEventListener("keydown", SChannelContent.handleKeyDown);
};

SChannelContent.StartLoad = function() {
    main_HideWarningDialog();
    SChannelContent.lastselectedChannel = main_selectedChannel;
    SChannelContent.status = false;
    SChannelContent.skipImg = false;
    main_ScrollHelperBlank('blank_focus');
    main_showLoadDialog();
    var table = document.getElementById('stream_table_search_channel_a');
    while (table.firstChild) table.removeChild(table.firstChild);
    SChannelContent.itemsCountOffset = 0;
    SChannelContent.itemsCount = 0;
    SChannelContent.cursorX = 0;
    SChannelContent.cursorY = 0;
    SChannelContent.dataEnded = false;
    SChannelContent.TargetName = undefined;
    SChannelContent.loadDataPrepare();
    SChannelContent.loadDataRequest();
};

SChannelContent.loadDataPrepare = function() {
    SChannelContent.imgMatrix = [];
    SChannelContent.imgMatrixId = [];
    SChannelContent.imgMatrixCount = 0;
    SChannelContent.loadingData = true;
    SChannelContent.loadingDataTry = 0;
    SChannelContent.loadingDataTimeout = 3500;
};

SChannelContent.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + encodeURIComponent(SChannelContent.TargetName !== undefined ? SChannelContent.TargetName : main_selectedChannel) + '?' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SChannelContent.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    if (JSON.parse(xmlHttp.responseText).stream !== null) SChannelContent.loadDataSuccess(xmlHttp.responseText);
                    else {
                        SChannelContent.loadDataPrepare();
                        SChannelContent.loadDataCheckHost();
                    }
                    return;
                } else {
                    SChannelContent.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SChannelContent.loadDataError();
    }
};

SChannelContent.loadDataError = function() {
    SChannelContent.loadingDataTry++;
    if (SChannelContent.loadingDataTry < SChannelContent.loadingDataTryMax) {
        SChannelContent.loadingDataTimeout += (SChannelContent.loadingDataTry < 5) ? 250 : 3500;
        SChannelContent.loadDataRequest();
    } else SChannelContent.loadDataSuccess(null);
};

SChannelContent.loadDataCheckHost = function() {
    try {

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'http://tmi.twitch.tv/hosts?include_logins=1&host=' + encodeURIComponent(main_selectedChannel_id) + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = SChannelContent.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    SChannelContent.CheckHost(xmlHttp.responseText);
                    return;
                } else SChannelContent.loadDataCheckHostError();
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        SChannelContent.loadDataCheckHostError();
    }
};

SChannelContent.loadDataCheckHostError = function() {
    SChannelContent.loadingDataTry++;
    if (SChannelContent.loadingDataTry < SChannelContent.loadingDataTryMax) {
        SChannelContent.loadingDataTimeout += 3500;
        SChannelContent.loadDataCheckHost();
    } else SChannelContent.loadDataSuccess(null);
};

SChannelContent.CheckHost = function(responseText) {
    var response = JSON.parse(responseText);
    SChannelContent.TargetName = response.hosts[0].target_login;
    if (SChannelContent.TargetName !== undefined) {
        SChannelContent.loadDataPrepare();
        SChannelContent.loadDataRequest();
    } else SChannelContent.loadDataSuccess(null);
};

SChannelContent.loadDataSuccess = function(responseText) {
    var row = document.createElement('tr');
    var coloumn_id = 0;

    if (responseText !== null) {
        var response = JSON.parse(responseText);
        if (response.stream !== null) {
            var hosting = SChannelContent.TargetName !== undefined ? main_selectedChannelDisplayname + STR_USER_HOSTING : '';
            var stream = response.stream;
            row.appendChild(SChannelContent.createCell('0_' + coloumn_id, stream.channel.name, stream.preview.template,
                stream.channel.status, stream.game, main_is_playlist(JSON.stringify(stream.stream_type)) +
                hosting + stream.channel.display_name, main_addCommas(stream.viewers) + STR_VIEWER,
                main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)));
            coloumn_id++;
        } else SChannelContent.skipImg = true;
    } else SChannelContent.skipImg = true;

    row.appendChild(SChannelContent.createChannelCell('0_' + coloumn_id, main_selectedChannelDisplayname, main_selectedChannelDisplayname + STR_PAST_BROA, IMG_BLUR_VIDEO1_16));
    coloumn_id++;
    row.appendChild(SChannelContent.createChannelCell('0_' + coloumn_id, main_selectedChannelDisplayname, main_selectedChannelDisplayname + STR_CLIPS, IMG_BLUR_VIDEO2_16));

    if (coloumn_id < 2) {
        coloumn_id++;
        row.appendChild(main_createEmptyCell(SChannelContent.ids[9] + '0_' + coloumn_id));
    }

    document.getElementById("stream_table_search_channel_a").appendChild(row);

    row = document.createElement('tr');
    row.appendChild(SChannelContent.createFallow('1_0', main_selectedChannelDisplayname, main_selectedChannelDisplayname, main_selectedChannelLogo));
    document.getElementById("stream_table_search_channel_a").appendChild(row);

    SChannelContent.loadDataSuccessFinish();
};

//TODO revise this functions there is too many
SChannelContent.createCell = function(id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    preview_thumbnail = preview_thumbnail.replace("{width}x{height}", main_VideoSize);

    SChannelContent.imgMatrix[SChannelContent.imgMatrixCount] = preview_thumbnail;
    SChannelContent.imgMatrixId[SChannelContent.imgMatrixCount] = SChannelContent.ids[1] + id;
    SChannelContent.imgMatrixCount++;

    main_td = document.createElement('td');
    main_td.setAttribute('id', SChannelContent.ids[8]+ id);
    main_td.setAttribute('data-channelname', channel_name);
    main_td.className = 'stream_cell';
    main_td.innerHTML = '<div id="' + SChannelContent.ids[0] + id + '" class="stream_thumbnail_video" ><img id="' +
        SChannelContent.ids[1] + id + '" class="stream_img"></div>' +
        '<div id="' + SChannelContent.ids[2] + id + '" class="stream_text">' +
        '<div id="' + SChannelContent.ids[3] + id + '" class="stream_channel">' + channel_display_name + '</div>' +
        '<div id="' + SChannelContent.ids[4] + id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + SChannelContent.ids[5] + id + '"class="stream_info">' + stream_game + '</div>' +
        '<div id="' + SChannelContent.ids[6] + id + '"class="stream_info_games" style="width: 50%; display: inline-block;">' +
        '<i class="icon-circle" style="color: ' +
        (SChannelContent.TargetName !== undefined ? '#FED000' : 'red') + '; font-size: 100%; aria-hidden="true"></i> ' + STR_SPACE + viwers + '</div>' +
        '<div id="' + SChannelContent.ids[7] + id +
        '"class="stream_info" style="width:35%; float: right; display: inline-block;">' + quality + '</div></div>';

    return main_td;
};

SChannelContent.createChannelCell = function(id, user_name, stream_type, preview_thumbnail) {
    SChannelContent.imgMatrix[SChannelContent.imgMatrixCount] = preview_thumbnail;
    SChannelContent.imgMatrixId[SChannelContent.imgMatrixCount] = SChannelContent.ids[1] + id;
    SChannelContent.imgMatrixCount++;

    main_td = document.createElement('td');
    main_td.setAttribute('id', SChannelContent.ids[8]+ id);
    main_td.setAttribute('data-channelname', user_name);
    main_td.className = 'stream_cell';
    main_td.innerHTML = '<div id="' + SChannelContent.ids[0] + id + '" class="stream_thumbnail_video" ><img id="' + SChannelContent.ids[1] +
        id + '" class="stream_img"></div>' +
        '<div id="' + SChannelContent.ids[2] + id + '" class="stream_text">' +
        '<div id="' + SChannelContent.ids[3] + id + '" class="stream_channel">' + stream_type + '</div>' +
        '<div id="' + SChannelContent.ids[4] + id + '"class="stream_info hide"></div>' +
        '<div id="' + SChannelContent.ids[5] + id + '"class="stream_info hide"></div>' +
        '<div id="' + SChannelContent.ids[6] + id + '"class="stream_info hide" ></div>' +
        '<div id="' + SChannelContent.ids[7] + id + '"class="stream_info hide"></div></div>';

    return main_td;
};

SChannelContent.createFallow = function(id, user_name, stream_type, preview_thumbnail) {
    SChannelContent.imgMatrix[SChannelContent.imgMatrixCount] = preview_thumbnail;
    SChannelContent.imgMatrixId[SChannelContent.imgMatrixCount] = SChannelContent.ids[1] + id;
    SChannelContent.imgMatrixCount++;

    main_td = document.createElement('td');
    main_td.setAttribute('id', SChannelContent.ids[8]+ id);
    main_td.setAttribute('data-channelname', user_name);
    main_td.className = 'stream_cell';
    main_td.innerHTML = '<div id="' + SChannelContent.ids[0] + id +
        '" class="stream_thumbnail_video" ><div id="schannel_cont_heart" style="position: absolute; top: 5%; left: 6%;"></div><img id="' +
        SChannelContent.ids[1] + id + '" class="stream_img_fallow"></div>' +
        '<div id="' + SChannelContent.ids[2] + id + '" class="stream_text">' +
        '<div id="' + SChannelContent.ids[3] + id + '" class="stream_channel">' + stream_type + '</div>' +
        '<div id="' + SChannelContent.ids[4] + id + '"class="stream_info hide"></div>' +
        '<div id="' + SChannelContent.ids[5] + id + '"class="stream_info">' + main_addCommas(main_selectedChannelViews) +
        STR_VIEWS + '</div>' +
        '<div id="' + SChannelContent.ids[6] + id + '"class="stream_info" >' + main_addCommas(main_selectedChannelFallower) + STR_FALLOWERS + '</div>' +
        '<div id="' + SChannelContent.ids[7] + id + '"class="stream_info hide"></div></div>';

    return main_td;
};

SChannelContent.setFallow = function() {
    if (addCode_IsFallowing) {
        document.getElementById("schannel_cont_heart").innerHTML = '<i class="icon-heart" style="color: #00b300; font-size: 1200%; text-shadow: #FFFFFF 0px 0px 10px, #FFFFFF 0px 0px 10px, #FFFFFF 0px 0px 8px;"></i>';
        document.getElementById(SChannelContent.ids[3] + "1_0").innerHTML = main_selectedChannelDisplayname + STR_FALLOWING;
    } else {
        document.getElementById("schannel_cont_heart").innerHTML = '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 1200%; text-shadow: #000000 0px 0px 10px, #000000 0px 0px 10px, #000000 0px 0px 8px;"></i>';
        if (main_UserName !== '') document.getElementById(SChannelContent.ids[3] + "1_0").innerHTML = main_selectedChannelDisplayname + STR_FALLOW;
        else document.getElementById(SChannelContent.ids[3] + "1_0").innerHTML = main_selectedChannelDisplayname + STR_CANT_FALLOW;
    }
};

SChannelContent.loadDataSuccessFinish = function() {
    $(document).ready(function() {
        if (!SChannelContent.status) {
            main_HideLoadDialog();
            SChannelContent.status = true;
            SChannelContent.addFocus();
            main_ScrollHelper(SChannelContent.ids[0], SChannelContent.cursorY, SChannelContent.cursorX, main_SChannelContent, main_ScrollOffSetMinusVideo, main_ScrollOffSetVideo, false);
        }
        SChannelContent.checkUser();
        main_LoadImages(SChannelContent.imgMatrix, SChannelContent.imgMatrixId, IMG_404_VIDEO);
        SChannelContent.loadingData = false;
    });
};

SChannelContent.checkUser = function() {
    if (SChannelContent.UserChannels) SChannelContent.setFallow();
    else if (main_UserName !== '') {
        addCode_userChannel = main_selectedChannel_id;
        addCode_PlayRequest = false;
        addCode_CheckFallow();
    } else {
        addCode_IsFallowing = false;
        SChannelContent.setFallow();
    }
};

SChannelContent.addFocus = function() {
    var id = SChannelContent.cursorY + '_' + (!SChannelContent.cursorY ? SChannelContent.cursorX : 0);
    document.getElementById(SChannelContent.ids[0] + id).classList.add(main_classThumb);
    document.getElementById(SChannelContent.ids[2] + id).classList.add(main_classText);
    document.getElementById(SChannelContent.ids[3] + id).classList.add(main_classInfo);
    document.getElementById(SChannelContent.ids[4] + id).classList.add(main_classInfo);
    document.getElementById(SChannelContent.ids[5] + id).classList.add(main_classInfo);
    document.getElementById(SChannelContent.ids[6] + id).classList.add(main_classInfo);
    document.getElementById(SChannelContent.ids[7] + id).classList.add(main_classInfo);
};

SChannelContent.removeFocus = function() {
    main_removeFocusVideoArray(SChannelContent.cursorY + '_' + (!SChannelContent.cursorY ? SChannelContent.cursorX : 0), SChannelContent.ids);
};

SChannelContent.keyClickDelay = function() {
    SChannelContent.LastClickFinish = true;
};

SChannelContent.keyEnter = function() {
    if (SChannelContent.cursorY) {
        if (addCode_OauthToken !== '') {
            addCode_PlayRequest = false;
            addCode_userChannel = main_selectedChannel_id;
            if (addCode_IsFallowing) addCode_UnFallow();
            else addCode_Fallow();
        } else {
            main_showWarningDialog(STR_NOKEY_WARN);
            window.setTimeout(main_HideWarningDialog, 2000);
        }
    } else {
        document.body.removeEventListener("keydown", SChannelContent.handleKeyDown);
        var value = (!SChannelContent.skipImg ? 0 : 1);
        if (SChannelContent.cursorX === (0 - value)) {
            Play_selectedChannel = document.getElementById(SChannelContent.ids[8]+ SChannelContent.cursorY +
                '_' + SChannelContent.cursorX).getAttribute('data-channelname');
            Play_selectedChannelDisplayname = document.getElementById(SChannelContent.ids[3] + SChannelContent.cursorY +
                '_' + SChannelContent.cursorX).textContent;
            if (Play_selectedChannelDisplayname.indexOf(STR_USER_HOSTING) !== -1) Play_selectedChannelDisplayname = Play_selectedChannelDisplayname.split(STR_USER_HOSTING)[1];
            main_openStream();
        } else if (SChannelContent.cursorX === (1 - value)) Svod.init();
        else if (SChannelContent.cursorX === (2 - value)) Sclip.init();
    }
};

SChannelContent.handleKeyDown = function(event) {
    if (SChannelContent.loadingData) {
        event.preventDefault();
        return;
    } else if (!SChannelContent.LastClickFinish) {
        event.preventDefault();
        return;
    } else {
        SChannelContent.LastClickFinish = false;
        window.setTimeout(SChannelContent.keyClickDelay, SChannelContent.keyClickDelayTime);
    }

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (main_isAboutDialogShown()) main_HideAboutDialog();
            else if (main_isControlsDialogShown()) main_HideControlsDialog();
            else {
                if (main_Before === main_Svod || main_Before === main_Sclip || main_Before === main_SChannelContent) {
                    main_Go = SChannels.isLastSChannels ? main_SChannels : main_UserChannels;
                    SChannels.isLastSChannels = false;
                } else main_Go = main_Before;
                SChannelContent.exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_LEFT:
            SChannelContent.removeFocus();
            SChannelContent.cursorX--;
            if (SChannelContent.cursorX < 0) SChannelContent.cursorX = (!SChannelContent.skipImg ? 2 : 1);
            SChannelContent.addFocus();
            break;
        case TvKeyCode.KEY_RIGHT:
            SChannelContent.removeFocus();
            SChannelContent.cursorX++;
            if (SChannelContent.cursorX > (!SChannelContent.skipImg ? 2 : 1)) SChannelContent.cursorX = 0;
            SChannelContent.addFocus();
            break;
        case TvKeyCode.KEY_UP:
        case TvKeyCode.KEY_DOWN:
            SChannelContent.removeFocus();
            SChannelContent.cursorY = !SChannelContent.cursorY ? 1 : 0;
            SChannelContent.addFocus();
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            SChannelContent.StartLoad();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            SChannelContent.keyEnter();
            break;
        case TvKeyCode.KEY_RED:
            main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            SChannelContent.exit();
            main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            main_BeforeSearch = main_SChannelContent;
            main_Go = main_Search;
            main_RestoreTopLabel();
            document.body.removeEventListener("keydown", SChannelContent.handleKeyDown);
            main_SwitchScreen();
            break;
        default:
            break;
    }
};
