/*jshint multistr: true */
function Play() {

}
//Variable initialization
Play.ChatPositions = 1;
Play.ChatBackground = 0.5;
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

//Variable initialization end

Play.PreStart = function() {
    Play.videojs = videojs('video_live');
    $('#label_quality').html(STR_QUALITY);
    Play.ChatPositions = parseInt(localStorage.getItem('ChatPositionsValue')) || 1;
    Play.ChatBackground = parseFloat(localStorage.getItem('ChatBackgroundValue')) || 0.5;
    Play.ChatSizeValue = parseInt(localStorage.getItem('ChatSizeValue')) || 3;
    Play.ChatEnable = localStorage.getItem('ChatEnable') === 'true' ? true : false;
    $("#play_dialog_exit_text").text(STR_EXIT);
    document.getElementById("dialog_buffer_play_text").innerHTML = STR_BUFFERING +
        '<div style="height: 45px; vertical-align: middle; display: inline-block;"><i class="fa fa-circle-o-notch fa-spin"></i></div>';
    $("#chat_container").html(
        '<iframe id="chat_frame" width="100%" height="100%" frameborder="0" scrolling="no" style="position: absolute;" src="about:blank"></iframe>' +
        '<div id="scene_channel_dialog_chat" style="position: absolute; text-align: center; width: 100%; margin-top: 50%;">' +
        '<div id="scene_channel_dialog_chat_text" class="strokedbig" style="display: inline-block; font-size: 216%; color: white;"></div></div>');
    document.getElementById("dialog_controls_play_text").innerHTML = STR_CONTROLS_PLAY_0;
    document.getElementById("stream_controls").innerHTML =
        '<i class="fa fa-question-circle" style="color: #FFFFFF; font-size: 115%;"></i> ' + STR_CONTROL_KEY;
};

Play.Start = function() {
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    Play.showBufferDialog();
    document.getElementById("stream_live").innerHTML =
        '<i class="fa fa-circle" style="color: red; font-size: 115%;"></i> ' + STR_LIVE.toUpperCase();
    $("#stream_info_title").text("");
    $("#stream_info_icon").attr("src", "");
    $("#stream_info_name").text(Play.selectedChannelDisplayname);
    document.getElementById("stream_info_currentime").innerHTML = STR_WATCHING + Play.timeS(0);
    document.getElementById("stream_info_livetime").innerHTML = STR_SINCE + Play.timeS(0) + STR_AGO;
    Play.ChatSize(false);
    Play.ChatBackgroundChange(false);
    Play.updateStreamInfo();
    Play.streamInfoTimer = window.setInterval(Play.updateStreamInfo, 60000);
    Play.streamCheck = window.setInterval(Play.PlayerCheck, 500);
    Play.qualitiesFound = 0;
    Play.tokenResponse = 0;
    Play.playlistResponse = 0;
    Play.playingTry = 0;
    Play.state = Play.STATE_LOADING_TOKEN;
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
        $("#scene2").show();
        $("#scene1").hide();
        Play.showBufferDialog();
        window.setTimeout(function() {
            if (!SmartHub.SmartHubResume) {
                Play.RestoreFromResume = true;
                Play.PlayerCheckOffset = 60;
                Play.onPlayer();
                Play.updateStreamInfo();
                Play.streamInfoTimer = window.setInterval(Play.updateStreamInfo, 60000);
                Play.streamCheck = window.setInterval(Play.PlayerCheck, 500);
            }
        }, 500);
    }
};

Play.updateStreamInfo = function() {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                try {
                    var response = $.parseJSON(xmlHttp.responseText);
                    // log response json
                    //console.log(response);
                    $("#stream_info_title").text(response.stream.channel.status);
                    $("#stream_info_game").text(STR_PLAYING + response.stream.game + STR_FOR + Main.addCommas(response.stream.viewers) + ' ' + STR_VIEWER);
                    $("#stream_info_icon").attr("src", response.stream.channel.logo);
                    Play.created = new Date(response.stream.created_at).getTime();
                } catch (err) {}
            }
        }
    };
    xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + Play.selectedChannel + '?' + Math.round(Math.random() * 1e7), true);
    xmlHttp.timeout = 10000;
    xmlHttp.setRequestHeader('Client-ID', Main.clientId);
    xmlHttp.send(null);
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
        if (Play.state == Play.STATE_LOADING_TOKEN) {
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
                        Play.loadDataSuccess(xmlHttp.responseText);
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
    Play.loadingDataTry++;
    if (Play.loadingDataTry < Play.loadingDataTryMax) {
        Play.loadingDataTimeout += (Play.loadingDataTry < 5) ? 250 : 3500;
        Play.loadDataRequest();
    } else {
        Play.HideBufferDialog();
        Play.showWarningDialog(STR_IS_OFFLINE);
        window.setTimeout(Play.shutdownStream, 1500);
    }
};

Play.saveQualities = function() {
    Play.qualityName[Play.qualityCount] = Play.selectedChannel;
    Play.qualityLinks[Play.qualityCount] = Play.qualities;
    Play.qualityCount++;
};

Play.restore = function() {
    for (var i = 0; i < Play.qualityName.length; i++) {
        if (Play.qualityName[i] == Play.selectedChannel) {
            Play.qualities = Play.qualityLinks[i];
            Play.qualitiesFound = true;
        }
    }

    if (Play.qualitiesFound) {
        Play.state = Play.STATE_PLAYING;
        Play.qualityChanged();
    } else {
        Play.HideBufferDialog();
        Play.showWarningDialog(STR_IS_OFFLINE);
        window.setTimeout(Play.shutdownStream, 1500);
    }
};

Play.loadDataSuccess = function(responseText) {
    // log response json
    //console.log(JSON.stringify(responseText));
    if (Play.state == Play.STATE_LOADING_TOKEN) {
        Play.tokenResponse = $.parseJSON(responseText);
        Play.state = Play.STATE_LOADING_PLAYLIST;
        Play.loadData();
    } else if (Play.state == Play.STATE_LOADING_PLAYLIST) {
        Play.playlistResponse = responseText;
        Play.extractQualities(Play.playlistResponse);
    }
};

Play.extractQualities = function(input) {
    var result = [],
        TempId = '',
        TempId2 = '',
        tempCount = 1;

    var streams = Play.extractStreamDeclarations(input);
    for (var i = 0; i < streams.length; i++) {
        TempId = Play.extractQualityFromStream(streams[i]);
        if (result.length === 0) {
            result.push({
                'id': TempId,
                'url': streams[i].split("\n")[2]
            });
        } else if (result[i - tempCount].id !== TempId) {
            TempId2 = result[i - tempCount].id;
            if (TempId2.indexOf('ource') === -1) {
                result.push({
                    'id': TempId,
                    'url': streams[i].split("\n")[2]
                });
            } else {
                TempId2 = TempId2.split(" ")[0];
                if (TempId2 !== TempId) {
                    result.push({
                        'id': TempId,
                        'url': streams[i].split("\n")[2]
                    });
                } else tempCount++;
            }
        } else tempCount++;
    }
    Play.qualities = result;
    Play.state = Play.STATE_PLAYING;
    SmartHub.SmartHubResume = false;
    Play.qualityChanged();
    Play.saveQualities();
};

Play.extractStreamDeclarations = function(input) {
    var result = [];

    var myRegexp = /#EXT-X-MEDIA:(.)*\n#EXT-X-STREAM-INF:(.)*\n(.)*/g;
    var match;
    while (match = myRegexp.exec(input)) result.push(match[0]);

    return result;
};

Play.extractQualityFromStream = function(input) {
    var myRegexp = /#EXT-X-MEDIA:.*NAME=\"(\w+)\".*/g;
    var match = myRegexp.exec(input);

    var quality;
    if (match !== null) quality = match[1];
    else {
        var values = input.split("\n")[0].split(":")[1].split(",");

        var value, set = {};
        for (var i = 0; i < values.length; i++) {
            value = values[i].split("=");
            set[value[0]] = value[1].replace(/"/g, '');
        }
        quality = set.NAME;
    }
    return quality;
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
    Play.onPlayer();

};

Play.onPlayer = function() {
    Play.showBufferDialog();
    Play.videojs.src({
        type: "video/mp4",
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
                    Play.selectedChannel + '&fade=false&bot_activity=false&prevent_clipping=false';
            });

        });
        Play.Playing = true;
    }
};

Play.PlayerCheck = function() {
    if (Play.PlayerTime == Play.videojs.currentTime() && !Play.videojs.paused()) {
        Play.PlayerCheckCount++;
        Play.showBufferDialog();
        if (Play.PlayerCheckQualityChanged && !Play.RestoreFromResume) Play.PlayerCheckOffset = -30;
        if (Play.PlayerCheckCount > (60 + Play.PlayerCheckOffset)) { //staled for 30 sec drop one quality
            Play.PlayerCheckCount = 0;
            if (Play.qualityIndex < Play.getQualitiesCount() - 1) {
                Play.qualityIndex++;
                Play.qualityDisplay();
                Play.qualityChanged();
                Play.PlayerCheckQualityChanged = true; // half time on next check
            } else { //staled too long drop the player
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
};

Play.updateCurrentTime = function(currentTime) {
    if (Play.WarningDialogVisible()) Play.HideWarningDialog();
    if (Play.BufferDialogVisible()) Play.HideBufferDialog();
    Play.PlayerCheckCount = 0;
    Play.PlayerCheckOffset = 0;
    Play.RestoreFromResume = false;
    Play.PlayerCheckQualityChanged = false;

    Play.oldcurrentTime = currentTime + Play.offsettime - 14; // 14 buffer size from twitch
    document.getElementById("stream_info_currentime").innerHTML = STR_WATCHING + Play.timeS(Play.oldcurrentTime);
    document.getElementById("stream_info_livetime").innerHTML = STR_SINCE + Play.streamLiveAt(Play.created) + STR_AGO;
};

Play.clock = function(currentTime) {
    var today = (new Date()).toString().split(' ');
    var time = today[4].toString().split(':');
    document.getElementById("stream_system_time").innerHTML = today[2].toString() + '/' + today[1].toString() + ' ' + time[0] + ':' + time[1];
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
    return (time === 0) ? (minutes + ":" + seconds) : (hours + ":" + minutes + ":" + seconds);
};

Play.timeMs = function(time) {
    var seconds, minutes, hours;

    time = Math.floor(time / 1000);
    seconds = Play.lessthanten(time % 60);

    time = Math.floor(time / 60);
    minutes = Play.lessthanten(time % 60);

    time = Math.floor(time / 60);
    hours = Play.lessthanten(time);

    //final time 00:00 or 00:00:00
    return (time === 0) ? (minutes + ":" + seconds) : (hours + ":" + minutes + ":" + seconds);
};

Play.streamLiveAt = function(time) { //time in '2017-10-27T13:27:27Z'
    var date2_ms = new Date().getTime();
    return Play.timeMs(date2_ms - time);
};

Play.shutdownStream = function() {
    Play.PreshutdownStream();
    Play.exitMain();
};

Play.PreshutdownStream = function() {
    Play.ClearPlayer();
    Play.ClearPlay();
};

Play.exitMain = function() {
    $("#scene1").show();
    $("#scene2").hide();
    Main.ReStartScreens();
};

Play.ClearPlayer = function() {
    Play.videojs.pause();
    Play.offPlayer();
    Play.videojs.autoplay(false);
    Play.videojs.src(TEMP_MP4);
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
};

Play.showBufferDialog = function() {
    $("#dialog_buffer_play").show();
};

Play.HideBufferDialog = function() {
    $("#dialog_buffer_play").hide();
};

Play.BufferDialogVisible = function() {
    return $("#dialog_buffer_play").is(":visible");
};

Play.showWarningDialog = function(text) {
    $("#dialog_warning_play_text").text(text);
    $("#dialog_warning_play").show();
};

Play.HideWarningDialog = function() {
    $("#dialog_warning_play_text").text('');
    $("#dialog_warning_play").hide();
};

Play.WarningDialogVisible = function() {
    return $("#dialog_warning_play").is(":visible");
};

Play.showExitDialog = function() {
    if (!Play.ExitDialogVisible()) {
        $("#play_dialog_exit").show();
        Play.exitID = window.setTimeout(Play.showExitDialog, 3000);
    } else {
        $("#play_dialog_exit").hide();
    }
};

Play.ExitDialogVisible = function() {
    return $("#play_dialog_exit").is(":visible");
};

Play.clearPause = function() {
    window.clearTimeout(Play.pauseEndID);
    window.clearTimeout(Play.pauseStartID);
    $("#play_dialog_simple_pause").hide();
    if (Play.isPanelShown()) {
        Play.hidePanel();
    }
};

Play.showPauseDialog = function() {
    if (!Play.isShowPauseDialogOn()) {
        $("#play_dialog_simple_pause").show();
        Play.pauseEndID = window.setTimeout(Play.showPauseDialog, 1500);
    } else {
        $("#play_dialog_simple_pause").hide();
        Play.pauseStartID = window.setTimeout(Play.showPauseDialog, 8000); // time in ms
    }
};

Play.isShowPauseDialogOn = function() {
    return $("#play_dialog_simple_pause").is(":visible");
};

Play.isPanelShown = function() {
    return $("#scene_channel_panel").is(":visible");
};

Play.hidePanel = function() {
    Play.clearHidePanel();
    $("#scene_channel_panel").hide();
    Play.quality = Play.qualityPlaying;
    Play.sizePanelOffset = 0;
    if (Play.ChatPositions === 1) Play.ChatPosition();
};

Play.showPanel = function() {
    Play.qualityIndexReset();
    Play.qualityDisplay();
    Play.clock();
    $("#scene_channel_panel").show();
    Play.setHidePanel();
    Play.sizePanelOffset = -4;
    if (Play.ChatPositions === 1) Play.ChatPosition();
};

Play.HideAllOthersDialogs = function(dialogs) {
    for (var i = 0; i < dialogs.length; i++) {
        while ($("#" + dialogs[i]).is(":visible")) $("#" + dialogs[i]).hide();
    }
};

Play.clearHidePanel = function() {
    window.clearTimeout(Play.PanelHideID);
};

Play.setHidePanel = function() {
    Play.PanelHideID = window.setTimeout(Play.hidePanel, 5000); // time in ms
};

Play.showChat = function() {
    Play.ChatPosition();
    $("#chat_container").show();
};

Play.hideChat = function() {
    $("#chat_container").hide();
};

Play.isChatShown = function() {
    return $("#chat_container").is(":visible");
};

Play.showControlsDialog = function() {
    $("#play_dialog_exit").hide();
    $("#dialog_controls_play").show();
};

Play.HideControlsDialog = function() {
    $("#dialog_controls_play").hide();
};

Play.isControlsDialogShown = function() {
    return $("#dialog_controls_play").is(":visible");
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
    if (Play.qualityIndex === 0) {
        $('#quality_arrow_up').css({
            'opacity': 0.2
        });
        $('#quality_arrow_down').css({
            'opacity': 1.0
        });
    } else if (Play.qualityIndex == Play.getQualitiesCount() - 1) {
        $('#quality_arrow_up').css({
            'opacity': 1.0
        });
        $('#quality_arrow_down').css({
            'opacity': 0.2
        });
    } else {
        $('#quality_arrow_up').css({
            'opacity': 1.0
        });
        $('#quality_arrow_down').css({
            'opacity': 1.0
        });
    }

    Play.quality = Play.qualities[Play.qualityIndex].id;

    $('#quality_name').text(Play.quality);
};

Play.getQualitiesCount = function() {
    return Play.qualities.length;
};

Play.ChatSize = function(showDialog) {
    var containerHeight = 48,
        percentage = 100,
        dialogTop = 50;
    Play.sizeOffset = 0;
    if (Play.ChatSizeValue == 2) {
        containerHeight = 32;
        percentage = 66;
        dialogTop = 25;
        Play.sizeOffset = 16;
    } else if (Play.ChatSizeValue == 1) {
        containerHeight = 16;
        percentage = 33;
        dialogTop = 12.5;
        Play.sizeOffset = 32;
    }
    document.getElementById("chat_container").style.height = containerHeight + '%';
    window.parent.document.getElementById("chat_frame").style.height = '100%'; // this value must equal to "Play.prototype.handleFocus" value
    document.getElementById("scene_channel_dialog_chat").style.marginTop = dialogTop + '%';
    Play.ChatPosition();
    localStorage.setItem('ChatSizeValue', Play.ChatSizeValue);
    if (showDialog)
        Play.showChatBackgroundDialog('Size ' + percentage + '%');
};

Play.ChatBackgroundChange = function(showDialog) {
    document.getElementById("chat_container").style.backgroundColor = "rgba(0, 0, 0, " + Play.ChatBackground + ")";
    localStorage.setItem('ChatBackgroundValue', Play.ChatBackground);
    if (showDialog)
        Play.showChatBackgroundDialog('Brightness ' + (Play.ChatBackground.toFixed(2) * 100).toFixed(0) + '%');
};

Play.ChatPosition = function() {
    //default
    var left = "75.3%",
        top = (51 + Play.sizeOffset + Play.sizePanelOffset) + '.5%';

    if (Play.ChatPositions === 0) Play.ChatPositions = 6;

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
    $("#scene_channel_dialog_chat_text").text(DialogText);
    $("#scene_channel_dialog_chat").show();
    Play.ChatBackgroundID = window.setTimeout(Play.hideChatBackgroundDialog, 1000);
};

Play.hideChatBackgroundDialog = function() {
    $("#scene_channel_dialog_chat").hide();
};

Play.handleKeyDown = function(e) {
    if (Play.state != Play.STATE_PLAYING) {
        switch (e.keyCode) {
            case TvKeyCode.KEY_RETURN:
                if (Play.ExitDialogVisible()) {
                    window.clearTimeout(Play.exitID);
                    $("#play_dialog_exit").hide();
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
                if (Play.isChatShown()) {
                    Play.ChatBackground -= 0.05;
                    if (Play.ChatBackground < 0) Play.ChatBackground = 0;
                    Play.ChatBackgroundChange(true);
                } else {
                    Play.showPanel();
                }
                break;
            case TvKeyCode.KEY_RIGHT:
                if (Play.isChatShown()) {
                    Play.ChatBackground += 0.05;
                    if (Play.ChatBackground > 1) Play.ChatBackground = 1;
                    Play.ChatBackgroundChange(true);
                } else {
                    Play.showPanel();
                }
                break;
            case TvKeyCode.KEY_UP:
                if (Play.isPanelShown()) {
                    if (Play.qualityIndex > 0) {
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
                    if (Play.qualityIndex < Play.getQualitiesCount() - 1) {
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
                    Play.qualityChanged();
                    Play.clearPause();
                } else {
                    Play.showPanel();
                }
                break;
            case TvKeyCode.KEY_RETURN:
                if (Play.isControlsDialogShown()) Play.HideControlsDialog();
                else if (Play.isPanelShown()) {
                    Play.hidePanel();
                } else {
                    if (Play.ExitDialogVisible()) {
                        window.clearTimeout(Play.exitID);
                        $("#play_dialog_exit").hide();
                        Play.hideChat();
                        window.setTimeout(Play.shutdownStream, 10);
                    } else if (Play.WarningDialogVisible()) {
                        Play.HideWarningDialog();
                        Play.showExitDialog();
                    } else {
                        Play.showExitDialog();
                    }
                }
                break;
            case TvKeyCode.KEY_PLAY:
            case TvKeyCode.KEY_PAUSE:
            case TvKeyCode.KEY_PLAYPAUSE:
                if (!Play.videojs.paused()) {
                    Play.Play = false;
                    Play.videojs.pause();
                    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
                    Play.showPauseDialog();
                    if (!Play.isPanelShown()) {
                        Play.showPanel();
                    }
                } else {
                    Play.Play = true;
                    Play.clearPause();
                    Play.videojs.play();
                    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
                }
                break;
            case TvKeyCode.KEY_RED:
            case TvKeyCode.KEY_GREEN:
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
