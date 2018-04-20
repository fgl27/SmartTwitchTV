/*jshint multistr: true */
function Play() {

}
//Variable initialization
Play.ChatPositions = 1;
Play.ChatBackground = 0.55;
Play.ChatSizeValue = 3;
Play.PanelHideID = '';
Play.quality = "source";
Play.qualityPlaying = Play.quality;
Play.sizePanelOffset = 0;

Play.STATE_LOADING_TOKEN = 0;
Play.STATE_LOADING_PLAYLIST = 1;
Play.STATE_PLAYING = 2;
Play.state = Play.STATE_LOADING_TOKEN;

Play.streamInfoTimer = '';
Play.tokenResponse = 0;
Play.playlistResponse = 0;
Play.playingTry = 0;

Play.playingUrl = '';
Play.qualities = [];
Play.qualityIndex = 0;
Play.ChatEnable = false;
Play.exitID = '';

Play.pauseEndID = '';
Play.pauseStartID = '';

Play.sizeOffset = 0;
Play.created = '';

Play.loadingDataTry = 0;
Play.loadingDataTryMax = 10;

Play.loadingInfoDataTry = 0;
Play.loadingInfoDataTryMax = 15;

Play.isOn = false;
Play.ChatBackgroundID = null;
Play.oldcurrentTime = 0;
Play.offsettime = 0;
Play.qualityCount = 0;
Play.qualityName = [];
Play.qualityLinks = [];
Play.qualitiesFound = false;
Play.PlayerTime = 0;
Play.streamCheck = null;
Play.PlayerCheckCount = 0;
Play.RestoreFromResume = false;
Play.PlayerCheckOffset = 0;
Play.PlayerCheckQualityChanged = false;
Play.Playing = false;
Play.selectedChannel = '';
Play.selectedChannelDisplayname = '';
Play.Panelcouner = 0;
Play.IsWarning = false;
Play.selectedChannelLogo = '';
Play.gameSelected = '';

//Variable initialization end

Play.PreStart = function() {
    Play.videojs = videojs('video_live');
    Play.ClearPlayer();
    document.getElementById("scene2_search_text").innerHTML = STR_SPACE + STR_SEARCH;
    document.getElementById("scene2_channel_text").innerHTML = STR_SPACE + STR_CHANNEL_CONT;
    document.getElementById("scene2_game_text").innerHTML = STR_SPACE + STR_GAME_CONT;
    Play.ChatPositions = parseInt(localStorage.getItem('ChatPositionsValue')) || 1;
    Play.ChatBackground = parseFloat(localStorage.getItem('ChatBackgroundValue')) || 0.55;
    Play.ChatSizeValue = parseInt(localStorage.getItem('ChatSizeValue')) || 3;
    Play.ChatEnable = localStorage.getItem('ChatEnable') === 'true' ? true : false;
    document.getElementById("play_dialog_exit_text").innerHTML = STR_EXIT_AGAIN;
    document.getElementById("dialog_buffer_play_text").innerHTML = STR_BUFFERING +
        '<div style="height: 45px; vertical-align: middle; display: inline-block; "><i class="fa icon-circle-o-notch fa-spin"></i></div>';
    document.getElementById("chat_container").innerHTML = '<iframe id="chat_frame" width="100%" height="100%" frameborder="0" scrolling="no" style="position: absolute; overflow: hidden;" src="about:blank"></iframe>' +
        '<div id="scene_channel_dialog_chat" style="position: absolute; text-align: center; width: 100%; margin-top: 50%;">' +
        '<div id="scene_channel_dialog_chat_text" class="strokedbig" style="display: inline-block; font-size: 216%; color: white;"></div></div>';
    document.getElementById("dialog_controls_play_text").innerHTML = STR_CONTROLS_PLAY_0;
    document.getElementById("stream_controls").innerHTML =
        '<div style="vertical-align: middle; display: inline-block"><i class="icon-question-circle" style="color: #FFFFFF; font-size: 105%; "></i></div><div style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_CONTROL_KEY + '</div>';
};

Play.Start = function() {
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    Play.showBufferDialog();
    document.getElementById("stream_live_icon").innerHTML =
        '<div style="vertical-align: middle; display: inline-block"><i class="icon-circle" style="color: red; font-size: 105%; "></i></div><div style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_LIVE.toUpperCase() + '</div>';
    document.getElementById("stream_info_title").innerHTML = '';
    Play.LoadLogoSucess = false;
    document.getElementById('stream_info_icon').setAttribute('data-src', IMG_LOD_LOGO);
    document.getElementById("stream_info_name").innerHTML = Play.selectedChannelDisplayname;
    document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play.timeS(0);
    document.getElementById("stream_live_time").innerHTML = STR_SINCE + Play.timeS(0) + STR_AGO;
    Play.ChatSize(false);
    Play.ChatBackgroundChange(false);
    document.getElementById('scene2_game').classList.remove('hide');

    Play.IsWarning = false;
    Play.loadingInfoDataTry = 0;
    Play.loadingInfoDataTimeout = 10000;
    Play.updateStreamInfoStart();
    Play.streamInfoTimer = window.setInterval(Play.updateStreamInfo, 60000);
    Play.streamCheck = window.setInterval(Play.PlayerCheck, 500);
    Play.qualitiesFound = 0;
    Play.tokenResponse = 0;
    Play.playlistResponse = 0;
    Play.playingTry = 0;
    Play.state = Play.STATE_LOADING_TOKEN;
    Play.isOn = true;
    document.addEventListener('visibilitychange', Play.Resume, false);
    Play.Playing = false;
    Play.loadData();
};

Play.Resume = function() {
    if (document.hidden) {
        Play.ClearPlayer();
        Play.Playing = false;
        document.getElementById('chat_frame').src = 'about:blank';
        window.clearInterval(Play.streamInfoTimer);
        window.clearInterval(Play.streamCheck);
    } else {
        document.getElementById('scene2').classList.remove('hide');
        document.getElementById('scene1').classList.add('hide');
        Play.clearPause();
        Play.showBufferDialog();
        window.setTimeout(function() {
            if (!SmartHub.SmartHubResume) {
                Play.RestoreFromResume = true;
                Play.PlayerCheckOffset = 80;
                Play.PlayerCheckQualityChanged = false;
                Play.onPlayer();
                Play.loadingInfoDataTry = 0;
                Play.loadingInfoDataTimeout = 10000;
                window.setTimeout(Play.updateStreamInfoStart, 7500); //7s is average time that takes to a stream to reload after a resume, so updateStreamInfoStart only after that
                Play.streamInfoTimer = window.setInterval(Play.updateStreamInfo, 60000);
                Play.streamCheck = window.setInterval(Play.PlayerCheck, 500);
            }
        }, 500);
    }
};

Play.updateStreamInfoStart = function() {
    try {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    var response = JSON.parse(xmlHttp.responseText);
                    document.getElementById("stream_info_title").innerHTML = response.stream.channel.status;
                    Play.gameSelected = response.stream.game;
                    document.getElementById("stream_info_game").innerHTML = STR_PLAYING + Play.gameSelected + STR_FOR +
                        Main.addCommas(response.stream.viewers) + ' ' + STR_VIEWER;
                    Play.selectedChannelLogo = response.stream.channel.logo;
                    Play.LoadLogo(document.getElementById('stream_info_icon'), Play.selectedChannelLogo);
                    Play.created = new Date(response.stream.created_at).getTime();
                    Play.LoadLogoSucess = true;
                    Play.selectedChannelViews = response.stream.channel.views;
                    Play.selectedChannelFallower = response.stream.channel.followers;
                    if (Main.UserName !== '') {
                        AddCode.userChannel = response.stream.channel._id;
                        AddCode.PlayRequest = true;
                        AddCode.CheckFallow();
                        Play.showFallow();
                    } else Play.hideFallow();
                } else { // internet error
                    Play.updateStreamInfoStartError();
                }
            }
        };
        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + Play.selectedChannel + '?' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = Play.loadingInfoDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.send(null);
    } catch (e) {
        Play.updateStreamInfoStartError();
    }
};

Play.updateStreamInfoStartError = function() {
    Play.loadingInfoDataTry++;
    if (Play.loadingInfoDataTry < Play.loadingInfoDataTryMax) {
        Play.loadingInfoDataTimeout += 2000;
        Play.updateStreamInfoStart();
    }
};

Play.updateStreamInfo = function() {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                try {
                    var response = JSON.parse(xmlHttp.responseText);
                    document.getElementById("stream_info_title").innerHTML = response.stream.channel.status;
                    document.getElementById("stream_info_game").innerHTML = STR_PLAYING + response.stream.game + STR_FOR +
                        Main.addCommas(response.stream.viewers) + ' ' + STR_VIEWER;
                    if (!Play.LoadLogoSucess) Play.LoadLogo(document.getElementById('stream_info_icon'), response.stream.channel.logo);
                } catch (err) {}
            }
        }
    };
    xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + Play.selectedChannel + '?' + Math.round(Math.random() * 1e7), true);
    xmlHttp.timeout = 10000;
    xmlHttp.setRequestHeader('Client-ID', Main.clientId);
    xmlHttp.send(null);
};

Play.LoadLogo = function(ImgObjet, link) {
    ImgObjet.onerror = function() {
        this.src = IMG_404_LOGO; //img fail to load use predefined
        Play.LoadLogoSucess = false;
    };
    ImgObjet.src = link;
};

Play.loadData = function() {
    Play.loadingDataTry = 0;
    Play.loadingDataTimeout = 3500;
    Play.loadDataRequest();
};

Play.loadDataRequest = function() {
    try {
        var xmlHttp = new XMLHttpRequest();

        var theUrl;
        if (Play.state === Play.STATE_LOADING_TOKEN) {
            theUrl = 'http://api.twitch.tv/api/channels/' + Play.selectedChannel + '/access_token';
        } else {
            theUrl = 'http://usher.twitch.tv/api/channel/hls/' + Play.selectedChannel +
                '.m3u8?player=twitchweb&&type=any&sig=' + Play.tokenResponse.sig + '&token=' +
                escape(Play.tokenResponse.token) + '&allow_source=true&allow_audi_only=true&' + Math.round(Math.random() * 1e7);
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = Play.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        Play.loadingDataTry = 0;
                        if (Play.isOn) Play.loadDataSuccess(xmlHttp.responseText);
                    } catch (err) {}
                } else {
                    if ((xmlHttp.responseText).indexOf('Bad auth token') !== -1) {
                        Play.restore();
                    } else Play.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (error) {
        Play.loadDataError();
    }
};

Play.loadDataError = function() {
    if (Play.isOn) {
        Play.loadingDataTry++;
        if (Play.loadingDataTry < Play.loadingDataTryMax) {
            Play.loadingDataTimeout += (Play.loadingDataTry < 5) ? 250 : 3500;
            Play.loadDataRequest();
        } else {
            Play.HideBufferDialog();
            Play.showWarningDialog(STR_IS_OFFLINE);
            window.setTimeout(Play.shutdownStream, 2000);
        }
    }
};

Play.saveQualities = function() {
    Play.qualityName[Play.qualityCount] = Play.selectedChannel;
    Play.qualityLinks[Play.qualityCount] = Play.qualities;
    Play.qualityCount++;
};

Play.restore = function() {
    for (var i = 0; i < Play.qualityName.length; i++) {
        if (Play.qualityName[i] === Play.selectedChannel) {
            Play.qualities = Play.qualityLinks[i];
            Play.qualitiesFound = true;
        }
    }

    if (Play.qualitiesFound) {
        Play.state = Play.STATE_PLAYING;
        if (Play.isOn) Play.qualityChanged();
    } else {
        Play.HideBufferDialog();
        Play.showWarningDialog(STR_IS_OFFLINE);
        window.setTimeout(Play.shutdownStream, 1500);
    }
};

Play.loadDataSuccess = function(responseText) {
    if (Play.state === Play.STATE_LOADING_TOKEN) {
        Play.tokenResponse = JSON.parse(responseText);
        Play.state = Play.STATE_LOADING_PLAYLIST;
        Play.loadData();
    } else if (Play.state === Play.STATE_LOADING_PLAYLIST) {
        Play.playlistResponse = responseText;
        Play.qualities = Play.extractQualities(Play.playlistResponse);
        Play.state = Play.STATE_PLAYING;
        SmartHub.SmartHubResume = false;
        if (Play.isOn) Play.qualityChanged();
        Play.saveQualities();
    }
};

Play.extractQualities = function(input) {
    var Band,
        result = [],
        TempId = '',
        tempCount = 1;

    var streams = Play.extractStreamDeclarations(input);
    for (var i = 0; i < streams.length; i++) {
        TempId = streams[i].split('NAME="')[1].split('"')[0];
        Band = Play.extractBand(streams[i].split('BANDWIDTH=')[1].split(',')[0]);
        if (!result.length) {
            if (TempId.indexOf('ource') === -1) TempId = TempId + ' (source)';
            result.push({
                'id': TempId + Band,
                'url': streams[i].split("\n")[2]
            });
        } else if (result[i - tempCount].id !== TempId && result[i - tempCount].id !== TempId + ' (source)') {
            result.push({
                'id': TempId + Band,
                'url': streams[i].split("\n")[2]
            });
        } else tempCount++;
    }

    return result;
};

Play.extractBand = function(input) {
    imput = parseInt(input);
    return input > 0 ? ' (' + parseFloat(input / 1000000).toFixed(2) + 'Mbps)' : '';
};

Play.extractStreamDeclarations = function(input) {
    var result = [];

    var myRegexp = /#EXT-X-MEDIA:(.)*\n#EXT-X-STREAM-INF:(.)*\n(.)*/g;
    var marray;
    while (marray = myRegexp.exec(input)) result.push(marray[0]);

    return result;
};

Play.qualityChanged = function() {
    Play.qualityIndex = 0;
    Play.playingUrl = Play.qualities[0].url;
    if (Play.quality.indexOf("source") !== -1) Play.quality = "source";
    for (var i = 0; i < Play.getQualitiesCount(); i++) {
        if (Play.qualities[i].id === Play.quality) {
            Play.qualityIndex = i;
            Play.playingUrl = Play.qualities[i].url;
            break;
        } else if (Play.qualities[i].id.indexOf(Play.quality) !== -1) { //make shore to set a value before break out
            Play.qualityIndex = i;
            Play.playingUrl = Play.qualities[i].url;
        }
    }

    Play.qualityPlaying = Play.quality;
    if (Play.isOn) Play.onPlayer();
};

Play.onPlayer = function() {
    Play.showBufferDialog();
    Play.videojs.src({
        type: "application/x-mpegURL",
        src: Play.playingUrl
    });

    Play.offsettime = Play.oldcurrentTime;
    Play.HideWarningDialog();
    Play.hidePanel();
    if (Play.ChatEnable && !Play.isChatShown()) Play.showChat();

    if (!Play.Playing) {
        Play.videojs.ready(function() {
            this.isFullscreen(true);
            this.requestFullscreen();
            this.autoplay(true);

            this.on('ended', function() {
                Play.HideBufferDialog();
                Play.showWarningDialog(STR_IS_OFFLINE);
                window.setTimeout(Play.shutdownStream, 1500);
            });

            this.on('timeupdate', function() {
                Play.updateCurrentTime(this.currentTime());
            });

            this.on('error', function() {
                Play.HideBufferDialog();
                Play.showWarningDialog(STR_PLAYER_PROBLEM);
                window.setTimeout(Play.shutdownStream, 1500);
            });

            this.on('loadedmetadata', function() {
                // sync chat and stream
                document.getElementById('chat_frame').src = 'https://www.nightdev.com/hosted/obschat/?theme=bttv_blackchat&channel=' +
                    Play.selectedChannel + '&fade=false&bot_activity=true&prevent_clipping=false';
            });

        });
        Play.Playing = true;
    }
};

Play.PlayerCheck = function() {
    if (Play.PlayerTime === Play.videojs.currentTime() && !Play.videojs.paused()) {
        Play.PlayerCheckCount++;
        Play.showBufferDialog();
        if (Play.PlayerCheckQualityChanged && !Play.RestoreFromResume) Play.PlayerCheckOffset = -10;
        if (Play.PlayerCheckCount > (30 + Play.PlayerCheckOffset)) { //staled for 15 sec drop one quality
            Play.PlayerCheckCount = 0;
            if (Play.qualityIndex < Play.getQualitiesCount() - 1) {
                if (Play.PlayerCheckQualityChanged) Play.qualityIndex++; //Don't change first time only reload
                Play.qualityDisplay();
                Play.qualityChanged();
                Play.PlayerCheckQualityChanged = true; // -5s on next check
            } else { //staled too long close the player
                Play.HideBufferDialog();
                Play.showWarningDialog(STR_PLAYER_PROBLEM);
                window.setTimeout(Play.shutdownStream, 1500);
            }
        }
    }
    if (!Play.videojs.paused()) Play.videojs.play();
    Play.PlayerTime = Play.videojs.currentTime();
};

Play.offPlayer = function() {
    Play.videojs.off('ended', null);
    Play.videojs.off('timeupdate', null);
    Play.videojs.off('error', null);
    Play.videojs.off('loadedmetadata', null);
    Play.videojs.off('playing', null);
    Play.videojs.off('canplaythrough', null);
};

Play.updateCurrentTime = function(currentTime) {
    if (Play.WarningDialogVisible() && !Play.IsWarning) Play.HideWarningDialog();
    if (Play.BufferDialogVisible()) Play.HideBufferDialog();
    if (Play.isShowPauseDialogOn() && !Play.videojs.paused()) Play.clearPause();
    Play.PlayerCheckCount = 0;
    Play.PlayerCheckOffset = 0;
    Play.RestoreFromResume = false;
    Play.PlayerCheckQualityChanged = false;

    Play.oldcurrentTime = currentTime + Play.offsettime - 14; // 14 buffer size from twitch
    if (Play.isPanelShown()) document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play.timeS(Play.oldcurrentTime);
};

Play.clock = function(currentTime) {
    var today = (new Date()).toString().split(' ');
    var time = today[4].toString().split(':');
    document.getElementById("stream_clock").innerHTML = today[2].toString() + '/' + today[1].toString() + ' ' + time[0] + ':' + time[1];
};

Play.lessthanten = function(time) {
    return (time < 10) ? "0" + time : time;
};

Play.timeS = function(time) {
    var seconds, minutes, hours;

    seconds = Play.lessthanten(parseInt(time) % 60);

    time = Math.floor(time / 60);
    minutes = Play.lessthanten(time % 60);

    time = Math.floor(time / 60);
    hours = Play.lessthanten(time);

    //final time 00:00 or 00:00:00
    return (!time) ? (minutes + ":" + seconds) : (hours + ":" + minutes + ":" + seconds);
};

Play.timeMs = function(time) {
    var minutes, hours;

    time = Math.floor(time / 1000 / 60);
    minutes = Play.lessthanten(time % 60);

    time = Math.floor(time / 60);
    hours = Play.lessthanten(time);

    //final time 00:00 or 00:00:00
    return hours + ":" + minutes;
};

Play.streamLiveAt = function(time) { //time in '2017-10-27T13:27:27Z'
    var date2_ms = new Date().getTime();
    return Play.timeMs(date2_ms - time);
};

Play.shutdownStream = function() {
    if (Play.isOn) {
        Play.PreshutdownStream();
        Play.exitMain();
    }
};

Play.PreshutdownStream = function() {
    Play.ClearPlayer();
    Play.ClearPlay();
    Play.isOn = false;
};

Play.exitMain = function() {
    document.getElementById('scene1').classList.remove('hide');
    document.getElementById('scene2').classList.add('hide');
    Main.ReStartScreens();
};

Play.ClearPlayer = function() {
    Play.videojs.pause();
    Play.offPlayer();
    Play.videojs.autoplay(false);
    Play.videojs.src({
        type: "video/mp4",
        src: TEMP_MP4
    });
    Play.clearPause();
    Play.HideWarningDialog();
};

Play.ClearPlay = function() {
    Play.Playing = false;
    document.body.removeEventListener("keydown", Play.handleKeyDown);
    document.removeEventListener('visibilitychange', Play.Resume);
    Play.oldcurrentTime = 0;
    Play.offsettime = 0;
    document.getElementById('chat_frame').src = 'about:blank';
    window.clearInterval(Play.streamInfoTimer);
    window.clearInterval(Play.streamCheck);
    Play.PlayerCheckOffset = 0;
    Play.RestoreFromResume = false;
    Play.PlayerCheckQualityChanged = false;
    document.getElementById('scene2_game').classList.add('hide');
};

Play.hideFallow = function() {
    document.getElementById("fallow_text").innerHTML = STR_SPACE + STR_NOKEY;
    AddCode.IsFallowing = false;
};

Play.showFallow = function() {
    document.getElementById('scene2_heart').classList.remove('hide');
};

Play.showBufferDialog = function() {
    document.getElementById('dialog_buffer_play').classList.remove('hide');
};

Play.HideBufferDialog = function() {
    document.getElementById('dialog_buffer_play').classList.add('hide');
};

Play.BufferDialogVisible = function() {
    return document.getElementById('dialog_buffer_play').className.indexOf('hide') === -1;
};

Play.showWarningDialog = function(text) {
    document.getElementById("dialog_warning_play_text").innerHTML = text;
    document.getElementById('dialog_warning_play').classList.remove('hide');
};

Play.HideWarningDialog = function() {
    document.getElementById("dialog_warning_play_text").innerHTML = '';
    document.getElementById('dialog_warning_play').classList.add('hide');
};

Play.WarningDialogVisible = function() {
    return document.getElementById('dialog_warning_play').className.indexOf('hide') === -1;
};

Play.showExitDialog = function() {
    if (!Play.ExitDialogVisible()) {
        document.getElementById('play_dialog_exit').classList.remove('hide');
        Play.exitID = window.setTimeout(Play.showExitDialog, 3000);
    } else {
        document.getElementById('play_dialog_exit').classList.add('hide');
    }
};

Play.ExitDialogVisible = function() {
    return document.getElementById('play_dialog_exit').className.indexOf('hide') === -1;
};

// For some reason clearTimeout fail some time when two are set in a sequence on the same function
Play.clearPauseEnd = function() {
    window.clearTimeout(Play.pauseEndID);
};

Play.clearPauseStart = function() {
    window.clearTimeout(Play.pauseStartID);
};

Play.clearPause = function() {
    Play.clearPauseEnd();
    Play.clearPauseStart();
    document.getElementById('play_dialog_simple_pause').classList.add('hide');
};

Play.showPauseDialog = function() {
    if (!Play.videojs.paused()) Play.clearPause();
    else if (!Play.isShowPauseDialogOn()) {
        document.getElementById('play_dialog_simple_pause').classList.remove('hide');
        Play.pauseEndID = window.setTimeout(Play.showPauseDialog, 1500);
    } else {
        document.getElementById('play_dialog_simple_pause').classList.add('hide');
        Play.pauseStartID = window.setTimeout(Play.showPauseDialog, 8000); // time in ms
    }
};

Play.isShowPauseDialogOn = function() {
    return document.getElementById('play_dialog_simple_pause').className.indexOf('hide') === -1;
};

Play.isPanelShown = function() {
    return document.getElementById('scene_channel_panel').className.indexOf('hide') === -1;
};

Play.hidePanel = function() {
    Play.clearHidePanel();
    document.getElementById('scene_channel_panel').classList.add('hide');
    Play.quality = Play.qualityPlaying;
    Play.sizePanelOffset = 0;
    if (Play.ChatPositions === 1) Play.ChatPosition();
};

Play.showPanel = function() {
    Play.Panelcouner = 0;
    Play.IconsFocus();
    Play.qualityIndexReset();
    Play.qualityDisplay();
    document.getElementById("stream_live_time").innerHTML = STR_SINCE + Play.streamLiveAt(Play.created) + STR_AGO;
    document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play.timeS(Play.oldcurrentTime);
    Play.clock();
    document.getElementById('scene_channel_panel').classList.remove('hide');
    Play.setHidePanel();
    Play.sizePanelOffset = -4;
    if (Play.ChatPositions === 1) Play.ChatPosition();
};

Play.clearHidePanel = function() {
    window.clearTimeout(Play.PanelHideID);
};

Play.setHidePanel = function() {
    Play.PanelHideID = window.setTimeout(Play.hidePanel, 5000);
};

Play.showChat = function() {
    Play.ChatPosition();
    document.getElementById('chat_container').classList.remove('hide');
};

Play.hideChat = function() {
    document.getElementById('chat_container').classList.add('hide');
};

Play.isChatShown = function() {
    return document.getElementById('chat_container').className.indexOf('hide') === -1;
};

Play.showControlsDialog = function() {
    document.getElementById('play_dialog_exit').classList.add('hide');
    document.getElementById('dialog_controls_play').classList.remove('hide');
};

Play.HideControlsDialog = function() {
    document.getElementById('dialog_controls_play').classList.add('hide');
};

Play.isControlsDialogShown = function() {
    return document.getElementById('dialog_controls_play').className.indexOf('hide') === -1;
};


Play.qualityIndexReset = function() {
    Play.qualityIndex = 0;
    for (var i = 0; i < Play.getQualitiesCount(); i++) {
        if (Play.qualities[i].id === Play.quality) {
            Play.qualityIndex = i;
            break;
        } else if (Play.qualities[i].id.indexOf(Play.quality) !== -1) { //make shore to set a value before break out
            Play.qualityIndex = i;
        }
    }
};

Play.qualityDisplay = function() {
    if (!Play.qualityIndex) {
        document.getElementById("quality_arrow_up").style.opacity = "0.2";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    } else if (Play.qualityIndex === Play.getQualitiesCount() - 1) {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "0.2";
    } else {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    }

    Play.quality = Play.qualities[Play.qualityIndex].id;

    if (Play.quality.indexOf('source') !== -1) document.getElementById("quality_name").innerHTML = Play.quality.replace("source", STR_SOURCE);
    else document.getElementById("quality_name").innerHTML = Play.quality;
};

Play.getQualitiesCount = function() {
    return Play.qualities.length;
};

Play.ChatSize = function(showDialog) {
    var containerHeight = 48,
        percentage = 100,
        dialogTop = 50;
    Play.sizeOffset = 0;
    if (Play.ChatSizeValue === 2) {
        containerHeight = 32;
        percentage = 66;
        dialogTop = 25;
        Play.sizeOffset = 16;
    } else if (Play.ChatSizeValue === 1) {
        containerHeight = 17;
        percentage = 33;
        dialogTop = 12.5;
        Play.sizeOffset = 31;
    }
    document.getElementById("chat_container").style.height = containerHeight + '%';
    //window.parent.document.getElementById("chat_frame").style.height = '100%';
    document.getElementById("scene_channel_dialog_chat").style.marginTop = dialogTop + '%';
    Play.ChatPosition();
    if (showDialog) Play.showChatBackgroundDialog('Size ' + percentage + '%');

    localStorage.setItem('ChatSizeValue', Play.ChatSizeValue);
};

Play.ChatBackgroundChange = function(showDialog) {
    var chat_value = Play.ChatBackground - 0.05; //Do not save a 0 value for ChatBackgroundValue

    if (chat_value < 0.05) chat_value = 0;
    else chat_value = chat_value.toFixed(2);

    document.getElementById("chat_container").style.backgroundColor = "rgba(0, 0, 0, " + chat_value + ")";
    if (showDialog) Play.showChatBackgroundDialog('Brightness ' + (chat_value * 100).toFixed(0) + '%');

    localStorage.setItem('ChatBackgroundValue', Play.ChatBackground);
};

Play.ChatPosition = function() {
    //default
    var left = "75.3%",
        top = (51 + Play.sizeOffset + Play.sizePanelOffset) + '.5%';

    if (!Play.ChatPositions) Play.ChatPositions = 6;

    if (Play.ChatPositions < 7) {
        if (Play.ChatPositions > 1) top = "0.5%"; // top/lefth
        if (Play.ChatPositions > 2) left = "38.3%"; // top/midle
        if (Play.ChatPositions > 3) left = "0%"; // top/right

        if (Play.ChatPositions > 4) top = (51 + Play.sizeOffset) + '.5%'; // bottom/lefth
        if (Play.ChatPositions > 5) left = "38.3%"; // bottom/midle
    } else Play.ChatPositions = 1;

    document.getElementById("chat_container").style.top = top;
    document.getElementById("chat_container").style.left = left;
    localStorage.setItem('ChatPositionsValue', Play.ChatPositions);
};

Play.showChatBackgroundDialog = function(DialogText) {
    window.clearTimeout(Play.ChatBackgroundID);
    document.getElementById("scene_channel_dialog_chat_text").innerHTML = DialogText;
    document.getElementById('scene_channel_dialog_chat').classList.remove('hide');
    Play.ChatBackgroundID = window.setTimeout(Play.hideChatBackgroundDialog, 1000);
};

Play.hideChatBackgroundDialog = function() {
    document.getElementById('scene_channel_dialog_chat').classList.add('hide');
};

Play.KeyPause = function() {
    if (!Play.videojs.paused()) {
        Play.videojs.pause();
        webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
        Play.showPauseDialog();
    } else {
        Play.clearPause();
        Play.videojs.play();
        webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
        if (Play.isPanelShown()) Play.hidePanel();
    }
};

Play.IconsFocus = function() {
    Main.ChangeBorder("scene2_quality", "3.5px solid rgba(0, 0, 0, 0)");
    Main.ChangebackgroundColor("scene2_quality", "rgba(0, 0, 0, 0)");

    Main.ChangeBorder("scene2_heart", "3.5px solid rgba(0, 0, 0, 0)");
    Main.ChangebackgroundColor("scene2_heart", "rgba(0, 0, 0, 0)");

    Main.ChangeBorder("scene2_channel", "3.5px solid rgba(0, 0, 0, 0)");
    Main.ChangebackgroundColor("scene2_channel", "rgba(0, 0, 0, 0)");

    Main.ChangeBorder("scene2_game", "3.5px solid rgba(0, 0, 0, 0)");
    Main.ChangebackgroundColor("scene2_game", "rgba(0, 0, 0, 0)");

    Main.ChangeBorder("scene2_search", "3.5px solid rgba(0, 0, 0, 0)");
    Main.ChangebackgroundColor("scene2_search", "rgba(0, 0, 0, 0)");

    if (!Play.Panelcouner) {
        Main.ChangeBorder("scene2_quality", "3.5px solid #FFFFFF");
        Main.ChangebackgroundColor("scene2_quality", "rgba(0, 0, 0, 0.7)");
    } else if (Play.Panelcouner === 1) {
        Main.ChangeBorder("scene2_heart", "3.5px solid #FFFFFF");
        Main.ChangebackgroundColor("scene2_heart", "rgba(0, 0, 0, 0.7)");
    } else if (Play.Panelcouner === 2) {
        Main.ChangeBorder("scene2_game", "3.5px solid #FFFFFF");
        Main.ChangebackgroundColor("scene2_game", "rgba(0, 0, 0, 0.7)");
    } else if (Play.Panelcouner === 3) {
        Main.ChangeBorder("scene2_channel", "3.5px solid #FFFFFF");
        Main.ChangebackgroundColor("scene2_channel", "rgba(0, 0, 0, 0.7)");
    } else if (Play.Panelcouner === 4) {
        Main.ChangeBorder("scene2_search", "3.5px solid #FFFFFF");
        Main.ChangebackgroundColor("scene2_search", "rgba(0, 0, 0, 0.7)");
    }
};

Play.FallowUnfallow = function() {
    if (AddCode.OauthToken !== '') {
        if (AddCode.IsFallowing) AddCode.UnFallow();
        else AddCode.Fallow();
    } else {
        Play.showWarningDialog(STR_NOKEY_WARN);
        Play.IsWarning = true;
        window.setTimeout(function() {
            Play.HideWarningDialog();
            Play.IsWarning = false;
        }, 2000);
    }
};

Play.setFallow = function() {
    if (AddCode.IsFallowing) {
        document.getElementById("fallow_heart").innerHTML = '<i class="icon-heart" style="color: #00b300; font-size: 210%; text-shadow: #FFFFFF 0px 0px 3px, #FFFFFF 0px 0px 3px, #FFFFFF 0px 0px 2px;"></i>';
        document.getElementById("fallow_text").innerHTML = STR_SPACE + STR_FALLOWING;
    } else {
        document.getElementById("fallow_heart").innerHTML = '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 210%; text-shadow: #000000 0px 0px 3px, #000000 0px 0px 3px, #000000 0px 0px 2px;"></i>';
        document.getElementById("fallow_text").innerHTML = STR_SPACE + STR_FALLOW;
    }
};

Play.KeyReturn = function(is_vod) {
    if (Play.isControlsDialogShown()) Play.HideControlsDialog();
    else if (Play.isPanelShown()) {
        Play.hidePanel();
    } else {
        if (Play.ExitDialogVisible()) {
            window.clearTimeout(Play.exitID);
            document.getElementById('play_dialog_exit').classList.add('hide');
            Play.hideChat();
            if (is_vod) window.setTimeout(PlayVod.shutdownStream, 10);
            else window.setTimeout(Play.shutdownStream, 10);
        } else if (Play.WarningDialogVisible()) {
            Play.HideWarningDialog();
            Play.showExitDialog();
        } else {
            Play.showExitDialog();
        }
    }
};

Play.handleKeyDown = function(e) {
    if (Play.state !== Play.STATE_PLAYING) {
        switch (e.keyCode) {
            case TvKeyCode.KEY_RETURN:
                if (Play.ExitDialogVisible()) {
                    window.clearTimeout(Play.exitID);
                    document.getElementById('play_dialog_exit').classList.add('hide');
                    Play.hideChat();
                    window.setTimeout(Play.shutdownStream, 10);
                } else {
                    Play.showExitDialog();
                }
                break;
            default:
                break;
        }
    } else {
        switch (e.keyCode) {
            case TvKeyCode.KEY_INFO:
            case TvKeyCode.KEY_CHANNELGUIDE:
                if (!Play.isChatShown()) {
                    Play.showChat();
                    Play.ChatEnable = true;
                    localStorage.setItem('ChatEnable', 'true');
                } else {
                    Play.hideChat();
                    Play.ChatEnable = false;
                    localStorage.setItem('ChatEnable', 'false');
                }
                break;
            case TvKeyCode.KEY_CHANNELUP:
                if (Play.isChatShown()) {
                    Play.ChatPositions++;
                    Play.ChatPosition();
                }
                break;
            case TvKeyCode.KEY_CHANNELDOWN:
                if (Play.isChatShown()) {
                    Play.ChatPositions--;
                    Play.ChatPosition();
                }
                break;
            case TvKeyCode.KEY_LEFT:
                if (!Play.isPanelShown() && Play.isChatShown()) {
                    Play.ChatBackground -= 0.05;
                    if (Play.ChatBackground < 0.05) Play.ChatBackground = 0.05;
                    Play.ChatBackgroundChange(true);
                } else if (Play.isPanelShown()) {
                    Play.Panelcouner++;
                    if (Play.Panelcouner > 4) Play.Panelcouner = 0;
                    Play.IconsFocus();
                    Play.clearHidePanel();
                    Play.setHidePanel();
                } else {
                    Play.showPanel();
                }
                break;
            case TvKeyCode.KEY_RIGHT:
                if (!Play.isPanelShown() && Play.isChatShown()) {
                    Play.ChatBackground += 0.05;
                    if (Play.ChatBackground > 1.05) Play.ChatBackground = 1.05;
                    Play.ChatBackgroundChange(true);
                } else if (Play.isPanelShown()) {
                    Play.Panelcouner--;
                    if (Play.Panelcouner < 0) Play.Panelcouner = 4;
                    Play.IconsFocus();
                    Play.clearHidePanel();
                    Play.setHidePanel();
                } else {
                    Play.showPanel();
                }
                break;
            case TvKeyCode.KEY_UP:
                if (Play.isPanelShown()) {
                    if (Play.qualityIndex > 0 && (!Play.Panelcouner)) {
                        Play.qualityIndex--;
                        Play.qualityDisplay();
                    }
                    Play.clearHidePanel();
                    Play.setHidePanel();
                } else if (Play.isChatShown()) {
                    if (Play.ChatSizeValue < 3) {
                        Play.ChatSizeValue++;
                        Play.ChatSize(true);
                    } else Play.showChatBackgroundDialog('Size 100%');
                } else {
                    Play.showPanel();
                }
                break;
            case TvKeyCode.KEY_DOWN:
                if (Play.isPanelShown()) {
                    if (Play.qualityIndex < Play.getQualitiesCount() - 1 && (!Play.Panelcouner)) {
                        Play.qualityIndex++;
                        Play.qualityDisplay();
                    }
                    Play.clearHidePanel();
                    Play.setHidePanel();
                } else if (Play.isChatShown()) {
                    if (Play.ChatSizeValue > 1) {
                        Play.ChatSizeValue--;
                        Play.ChatSize(true);
                    } else Play.showChatBackgroundDialog('Size 33%');
                } else {
                    Play.showPanel();
                }
                break;
            case TvKeyCode.KEY_ENTER:
                if (Play.isPanelShown()) {
                    if (!Play.Panelcouner) {
                        Play.qualityChanged();
                        Play.clearPause();
                    } else if (Play.Panelcouner === 1) {
                        Play.FallowUnfallow();
                        Play.clearHidePanel();
                        Play.setHidePanel();
                    } else if (Play.Panelcouner === 2) {
                        Main.Before = Main.Go;
                        Main.ExitCurrent(Main.Before);
                        Main.Go = Main.AGame;
                        AGame.UserGames = false;
                        Main.gameSelected = Play.gameSelected;
                        window.clearTimeout(Play.exitID);
                        document.getElementById('play_dialog_exit').classList.add('hide');
                        Play.hideChat();
                        window.setTimeout(Play.shutdownStream, 10);
                    } else if (Play.Panelcouner === 3) {
                        Main.selectedChannel = Play.selectedChannel;
                        Main.selectedChannel_id = AddCode.userChannel;
                        Main.selectedChannelDisplayname = Play.selectedChannelDisplayname;
                        Main.selectedChannelLogo = Play.selectedChannelLogo;
                        Main.selectedChannelViews = Play.selectedChannelViews;
                        Main.selectedChannelFallower = Play.selectedChannelFallower;
                        if (Main.Go !== Main.Svod && Main.Go !== Main.Sclip && Main.Go !== Main.SChannelContent) Main.Before = Main.Go;
                        Main.ExitCurrent(Main.Go);
                        SChannelContent.UserChannels = AddCode.IsFallowing;
                        Main.Go = Main.SChannelContent;
                        window.clearTimeout(Play.exitID);
                        document.getElementById('play_dialog_exit').classList.add('hide');
                        Play.hideChat();
                        window.setTimeout(Play.shutdownStream, 10);
                    } else if (Play.Panelcouner === 4) {
                        Main.BeforeSearch = Main.Go;
                        Main.Go = Main.Search;
                        window.clearTimeout(Play.exitID);
                        document.getElementById('play_dialog_exit').classList.add('hide');
                        Play.hideChat();
                        window.setTimeout(Play.shutdownStream, 10);
                    }
                } else {
                    Play.showPanel();
                }
                break;
            case TvKeyCode.KEY_RETURN:
                Play.KeyReturn(false);
                break;
            case TvKeyCode.KEY_PLAY:
            case TvKeyCode.KEY_PAUSE:
            case TvKeyCode.KEY_PLAYPAUSE:
                Play.KeyPause();
                break;
            case TvKeyCode.KEY_YELLOW:
                Play.showControlsDialog();
                break;
            case TvKeyCode.KEY_BLUE:
                break;
            default:
                break;
        }
    }
};
