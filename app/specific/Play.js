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
Play.qualityIndex = '';
Play.ChatEnable = false;
Play.exitID = '';

Play.pauseEndID = '';
Play.pauseStartID = '';

Play.sizeOffset = 0;
Play.created = '';

Play.loadingDataTry = 0;
Play.loadingDataTryMax = 15;
Play.ChatBackgroundID = null;
Play.oldcurrentTime = 0;
Play.offsettime = 0;
Play.random_int = Math.round(Math.random() * 1e7);
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

//Variable initialization end

Play.PreStart = function() {
    Play.videojs = videojs('video_live');
    $('#label_quality').html(STR_QUALITY);
    Play.ChatPositions = parseInt(localStorage.getItem('ChatPositionsValue')) || 1;
    Play.ChatBackground = parseFloat(localStorage.getItem('ChatBackgroundValue')) || 0.5;
    Play.ChatSizeValue = parseInt(localStorage.getItem('ChatSizeValue')) || 3;
    Play.ChatEnable = localStorage.getItem('ChatEnable') === 'true' ? true : false;
    document.getElementById("stream_live").innerHTML =
        '<i class="fa fa-circle" style="color: red; font-size: 115%;"></i> ' + STR_LIVE.toUpperCase();
    $("#play_dialog_exit_text").text(STR_EXIT);
    document.getElementById("dialog_buffer_play_text").innerHTML = STR_BUFFERING +
        '<div style="height: 45px; vertical-align: middle; display: inline-block;"><i class="fa fa-spinner fa-spin"></i></div>';
    $("#chat_container").html(
        '<iframe id="chat_frame" width="100%" height="100%" frameborder="0" scrolling="no" style="position: absolute;" src="about:blank"></iframe> \
        <div id="scene_channel_dialog_chat" style="position: absolute; text-align: center; width: 100%; margin-top: 50%;"> \
        <div id="scene_channel_dialog_chat_text" class="strokedbig" style="display: inline-block; font-size: 216%; color: white;"></div> \
        </div>');
};

Play.Start = function() {
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    $("#dialog_buffer_play").show();
    $('#stream_info_name').text(Main.selectedChannel);
    $("#stream_info_title").text("");
    $("#stream_info_icon").attr("src", "");
    $("#stream_info_name").text(Main.selectedChannelDisplayname);
    document.getElementById("stream_info_currentime").innerHTML = STR_WATCHING + PlayClip.timeS(0);
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
    Play.loadData();
};

Play.Resume = function() {
    if (document.hidden) {
        Play.videojs.pause();
        Play.offPlayer();
        document.getElementById('chat_frame').src = 'about:blank';
        window.clearInterval(Play.streamInfoTimer);
        window.clearInterval(Play.streamCheck);
    } else {
        $("#scene2").show();
        $("#scene1").hide();
        Play.streamInfoTimer = window.setInterval(Play.updateStreamInfo, 60000);
        window.setTimeout(function() {
            Play.RestoreFromResume = true;
            Play.PlayerCheckOffset = 60;
            Play.onPlayer();
            Play.streamCheck = window.setInterval(Play.PlayerCheck, 500);
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
    xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + Main.selectedChannel, true);
    xmlHttp.timeout = 10000;
    xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');
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
            theUrl = 'http://api.twitch.tv/api/channels/' + Main.selectedChannel + '/access_token';
        } else {
            theUrl = 'http://usher.twitch.tv/api/channel/hls/' + Main.selectedChannel +
                '.m3u8?player=twitchweb&&type=any&sig=' + Play.tokenResponse.sig + '&token=' +
                escape(Play.tokenResponse.token) + '&allow_source=true&allow_audi_only=true&p=' + Play.random_int;
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = Play.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');

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
        if (Play.loadingDataTry < 5) {
            Play.loadingDataTimeout += 250;
        } else {
            switch (Play.loadingDataTry) {
                case 5:
                    Play.loadingDataTimeout = 5000;
                    break;
                case 6:
                    Play.loadingDataTimeout = 6500;
                    break;
                case 7:
                    Play.loadingDataTimeout = 15000;
                    break;
                case 8:
                    Play.loadingDataTimeout = 30000;
                    break;
                case 9:
                    Play.loadingDataTimeout = 60000;
                    break;
                default:
                    Play.loadingDataTimeout = 150000;
                    break;
            }
        }
        Play.loadDataRequest();
    } else {
        Play.showWarningDialog(STR_IS_OFFLINE + STR_IS_OFFLINE_L_E);
        window.setTimeout(Play.shutdownStream, 1500);
    }
};

Play.saveQualities = function() {
    Play.qualityName[Play.qualityCount] = Main.selectedChannel;
    Play.qualityLinks[Play.qualityCount] = Play.qualities;
    Play.qualityCount++;
};

Play.restore = function() {
    for (var i = 0; i < Play.qualityName.length; i++) {
        if (Play.qualityName[i] == Main.selectedChannel) {
            Play.qualities = Play.qualityLinks[i];
            Play.qualitiesFound = true;
            console.log("qualitiesFound");
        }
    }

    if (Play.qualitiesFound) {
        Play.state = Play.STATE_PLAYING;
        Play.qualityChanged();
    } else {
        Play.showWarningDialog(STR_IS_OFFLINE + STR_IS_OFFLINE_L_E_R);
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
    var result = [];

    var streams = extractStreamDeclarations(input);
    for (var i = 0; i < streams.length; i++) {
        result.push({
            'id': extractQualityFromStream(streams[i]),
            'url': streams[i].split("\n")[2]
        });
    }
    Play.qualities = result;
    Play.state = Play.STATE_PLAYING;
    Play.qualityChanged();
    Play.saveQualities();
};

function extractStreamDeclarations(input) {
    var result = [];

    var myRegexp = /#EXT-X-MEDIA:(.)*\n#EXT-X-STREAM-INF:(.)*\n(.)*/g;
    var match;
    while (match = myRegexp.exec(input)) result.push(match[0]);

    return result;
}

function extractQualityFromStream(input) {
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
}

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
    $("#dialog_buffer_play").show();
    Play.videojs.src({
        type: "video/mp4",
        src: Play.playingUrl
    });

    Play.offsettime = Play.oldcurrentTime;
    Play.HideWarningDialog();
    Play.hidePanel();
    if (Play.ChatEnable && !Play.isChatShown()) Play.showChat();

    // sync chat and stream
    document.getElementById('chat_frame').src = 'https://www.nightdev.com/hosted/obschat/?theme=bttv_blackchat&channel=' +
        Main.selectedChannel + '&fade=false&bot_activity=false&prevent_clipping=false';

    Play.videojs.ready(function() {
        this.isFullscreen(true);
        this.requestFullscreen();
        this.autoplay(true);

        this.on('ended', function() {
            Play.shutdownStream();
        });

        this.on('timeupdate', function() {
            Play.updateCurrentTime(this.currentTime());
        });

        this.on('error', function() {
            Play.showWarningDialog(STR_IS_OFFLINE + STR_IS_OFFLINE_P_E);
            window.setTimeout(Play.shutdownStream, 1500);
        });

    });

};

Play.PlayerCheck = function() {
    if (Play.PlayerTime == Play.videojs.currentTime() && !Play.videojs.paused()) {
        Play.PlayerCheckCount++;
        $("#dialog_buffer_play").show();
        if (Play.PlayerCheckQualityChanged && !Play.RestoreFromResume) Play.PlayerCheckOffset = -30;
        if (Play.PlayerCheckCount > (60 + Play.PlayerCheckOffset)) { //staled for 30 sec drop one quality
            Play.PlayerCheckCount = 0;
            if (Play.qualityIndex < Play.getQualitiesCount() - 1) {
                Play.qualityIndex++;
                Play.qualityDisplay();
                Play.qualityChanged();
                Play.PlayerCheckQualityChanged = true; // half time on next check
            } else { //staled too long drop the player
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
};

Play.updateCurrentTime = function(currentTime) {
    if (Play.WarningDialogVisible()) Play.HideWarningDialog();
    if ($("#dialog_buffer_play").is(":visible")) $("#dialog_buffer_play").hide();
    Play.PlayerCheckCount = 0;
    Play.PlayerCheckOffset = 0;
    Play.RestoreFromResume = false;
    Play.PlayerCheckQualityChanged = false;

    Play.oldcurrentTime = currentTime + Play.offsettime;
    document.getElementById("stream_info_currentime").innerHTML = STR_WATCHING + PlayClip.timeS(Play.oldcurrentTime);
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
    Play.videojs.pause();
    Play.videojs.autoplay(false);
    Play.videojs.src('app/images/temp.mp4');
    Play.offPlayer();
    document.body.removeEventListener("keydown", Play.handleKeyDown);
    document.removeEventListener('visibilitychange', Play.Resume);
    Play.clearPause();
    Play.HideWarningDialog();
    $("#scene1").show();
    $("#scene2").hide();
    Main.ReStartScreens();

    Play.oldcurrentTime = 0;
    Play.offsettime = 0;
    document.getElementById('chat_frame').src = 'about:blank';
    window.clearInterval(Play.streamInfoTimer);
    window.clearInterval(Play.streamCheck);
};

Play.showWarningDialog = function(text) {
    $("#dialog_buffer_play").hide()
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
    if (Play.isShowPauseDialogOn()) {
        $("#play_dialog_simple_pause").hide();
    }
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
            case TvKeyCode.KEY_VOLUMEUP:
                break;
            case TvKeyCode.KEY_VOLUMEDOWN:
                break;
            case TvKeyCode.KEY_MUTE:
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
                if (Play.isPanelShown()) {
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
            case TvKeyCode.KEY_VOLUMEUP:
            case TvKeyCode.KEY_VOLUMEDOWN:
            case TvKeyCode.KEY_MUTE:
            case TvKeyCode.KEY_RED:
            case TvKeyCode.KEY_GREEN:
            case TvKeyCode.KEY_YELLOW:
            case TvKeyCode.KEY_BLUE:
                break;
            default:
                break;
        }
    }
};
