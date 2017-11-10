/*jshint multistr: true */
function SceneSceneChannel() {

}

var random_int = Math.round(Math.random() * 1e7),
    exitID,
    timeoutID,
    pauseEndID,
    chatBID,
    sizeOffset = 0,
    sizePanelOffset = 0,
    pauseStartID,
    ChatBackground = null,
    ChatSizeValue = null,
    ChatPositions = null,
    sysTime,
    today,
    created,
    oldcurrentTime = 0
offsettime = 0;

SceneSceneChannel.Player = null;
SceneSceneChannel.Play;
SceneSceneChannel.ChatEnable = false;
SceneSceneChannel.isShowExitDialogOn = false;

SceneSceneChannel.loadingDataTryMax = 13;
SceneSceneChannel.loadingDataTry;
SceneSceneChannel.loadingDataTimeout;

SceneSceneChannel.playingTryMax = 10;
SceneSceneChannel.playingTry;
SceneSceneChannel.playingUrl;

SceneSceneChannel.STATE_LOADING_TOKEN = 0;
SceneSceneChannel.STATE_LOADING_PLAYLIST = 1;
SceneSceneChannel.STATE_PLAYING = 2;
SceneSceneChannel.state = SceneSceneChannel.STATE_LOADING_TOKEN;
SceneSceneChannel.isShowDialogOn = false;
SceneSceneChannel.isShowPauseDialogOn = false;

SceneSceneChannel.QualityAuto = "Auto";
SceneSceneChannel.quality = "Source";
SceneSceneChannel.qualityPlaying = SceneSceneChannel.quality;
SceneSceneChannel.qualityPlayingIndex = 2;
SceneSceneChannel.qualityIndex;
SceneSceneChannel.qualities;

SceneSceneChannel.tokenResponse;
SceneSceneChannel.playlistResponse;

SceneSceneChannel.streamInfoTimer = null;

function extractStreamDeclarations(input) {
    var result = [];

    var myRegexp = /#EXT-X-MEDIA:(.)*\n#EXT-X-STREAM-INF:(.)*\n(.)*/g;
    var match;
    while (match = myRegexp.exec(input)) {
        result.push(match[0]);
    }

    return result;
}

function extractQualityFromStream(input) {
    var myRegexp = /#EXT-X-MEDIA:.*NAME=\"(\w+)\".*/g;
    var match = myRegexp.exec(input);

    var quality;
    if (match !== null) {
        quality = match[1];
    } else {
        var values = input.split("\n");
        values = values[0].split(":");
        values = values[1].split(",");

        var set = {};
        for (var i = 0; i < values.length; i++) {
            var value = values[i].split("=");
            set[value[0]] = value[1].replace(/"/g, '');
        }
        quality = set.NAME;
    }
    return quality;
}

function extractUrlFromStream(input) {
    return input.split("\n")[2];
}

function extractQualities(input) {
    var result = [];

    var streams = extractStreamDeclarations(input);
    for (var i = 0; i < streams.length; i++) {
        result.push({
            'id': extractQualityFromStream(streams[i]),
            'url': extractUrlFromStream(streams[i])
        });
    }

    return result;
}

SceneSceneChannel.shutdownStream = function() {
    document.body.removeEventListener("keydown", SceneSceneChannel.prototype.handleKeyDown);
    document.body.addEventListener("keydown", SceneSceneBrowser.prototype.handleKeyDown, false);
    SceneSceneBrowser.browser = true;
    SceneSceneChannel.Play = false;
    webapis.avplay.close();
    $("#scene1").show();
    $("#scene2").hide();
    $("#scene1").focus();
    ChatPositions -= 1;
    var OutsysTime = new Date().getTime() - 300000; // 300000 current time minus 5 min
    oldcurrentTime = 0;
    offsettime = 0;
    if (OutsysTime > sysTime) SceneSceneBrowser.prototype.handleFocus();
    else SceneSceneBrowser.prototype.handleShow();
};

SceneSceneChannel.getQualitiesCount = function() {
    return SceneSceneChannel.qualities.length;
};

SceneSceneChannel.qualityDisplay = function() {
    if (SceneSceneChannel.qualityIndex == 0) {
        $('#quality_arrow_up').css({
            'opacity': 0.2
        });
        $('#quality_arrow_down').css({
            'opacity': 1.0
        });
    } else if (SceneSceneChannel.qualityIndex == SceneSceneChannel.getQualitiesCount() - 1) {
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


    SceneSceneChannel.quality = SceneSceneChannel.qualities[SceneSceneChannel.qualityIndex].id;


    $('#quality_name').text(SceneSceneChannel.quality);
};

SceneSceneChannel.initLanguage = function() {
    $('#label_quality').html(STR_QUALITY);
    document.getElementById("stream_live").innerHTML = '<i class="fa fa-circle" style="color: red; font-size: 80%; aria-hidden="true"></i> ' + STR_CHANNELS.toUpperCase();
};

var listener = {
    onbufferingstart: function() {
        //console.log("Buffering start.");
        SceneSceneChannel.onBufferingStart();
        SceneSceneChannel.ChatPosition();
        SceneSceneChannel.ChatSize();
        if (SceneSceneChannel.ChatEnable && !SceneSceneChannel.isChatShown()) {
            ChatPositions += 1;
            SceneSceneChannel.ChatPosition();
            SceneSceneChannel.showChat();
        }
    },
    onbufferingprogress: function(percent) {
        //console.log("Buffering progress data : " + percent);
        SceneSceneChannel.onBufferingProgress(percent);
    },
    onbufferingcomplete: function() {
        //console.log("Buffering complete.");
        SceneSceneChannel.onBufferingComplete();
    },
    oncurrentplaytime: function(currentTime) {
        //console.log("Current Playtime : " + currentTime);
        updateCurrentTime(currentTime);
    },
    //onevent: function(eventType, eventData) {
    //console.log("event type error : " + eventType + ", data: " + eventData);
    //if (eventType == 'PLAYER_MSG_RESOLUTION_CHANGED') {
    //console.log("Mudou de Qualidade");
    //}
    //},
    onerror: function(eventType) {
        //console.log("event type error : " + eventType);
        if (eventType == 'PLAYER_ERROR_CONNECTION_FAILED') {
            //console.log("Closing stream from eventType == 'PLAYER_ERROR_CONNECTION_FAILED'");
            SceneSceneBrowser.errorNetwork = true;
            SceneSceneChannel.shutdownStream();
        }
    },
    //onsubtitlechange: function(duration, text, data3, data4) {
    //console.log("Subtitle Changed.");
    //},
    //ondrmevent: function(drmEvent, drmData) {
    //console.log("DRM callback: " + drmEvent + ", data: " + drmData);
    //},
    onstreamcompleted: function() {
        //console.log("Stream Completed");
        SceneSceneChannel.onRenderingComplete();
    }
};

var updateCurrentTime = function(currentTime) {

    //current time is given in millisecond
    if (currentTime == null)
        currentTime = webapis.avplay.getCurrentTime();

    oldcurrentTime = currentTime + offsettime;
    document.getElementById("stream_info_currentime").innerHTML = 'Playing for ' + timeMs(oldcurrentTime);

    document.getElementById("stream_info_livetime").innerHTML = 'Since ' + streamLiveAt(created) + ' ago';

    today = (new Date()).toString().split(' ');
    document.getElementById("stream_system_time").innerHTML = today[2].toString() + '/' + today[1].toString() + ' ' + today[4].toString();
};

function lessthanten(time) {
    return (time < 10) ? "0" + time : time;
}

function timeMs(time) {
    var seconds, minutes, hours;

    time = Math.floor(time / 1000);
    seconds = lessthanten(time % 60);

    time = Math.floor(time / 60);
    minutes = lessthanten(time % 60);

    time = Math.floor(time / 60) % 24;
    hours = lessthanten(time);

    //final time 00:00 or 00:00:00
    return (time == 0) ? (minutes + ":" + seconds) : (hours + ":" + minutes + ":" + seconds);
}

function streamLiveAt(time) { //time in '2017-10-27T13:27:27Z'
    var date2_ms = new Date().getTime();
    return timeMs(date2_ms - time);
}

SceneSceneChannel.prototype.initialize = function() {
    SceneSceneChannel.initLanguage();
    SceneSceneChannel.Player = document.getElementById('av-player');

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            webapis.avplay.suspend(); //Mandatory. You should call it, if you use avplay.
            // Something you want to do when hide.
        } else {
            if (!SceneSceneBrowser.browser) {
                webapis.avplay.restore();
            } else {
                SceneSceneBrowser.refresh();
            }
            // Something you want to do when resume.
        }
    });
    $("#scene_channel_dialog_simple_pause").hide();
    $("#scene_channel_dialog_exit").hide();
    $("#scene_channel_dialog_chat").hide();
    SceneSceneChannel.isShowPauseDialogOn = false;
    SceneSceneChannel.isShowExitDialogOn = false;
};

SceneSceneChannel.prototype.handleShow = function() {
    //console.log("SceneSceneChannel.handleShow()");
};

SceneSceneChannel.prototype.handleHide = function() {
    //console.log("SceneSceneChannel.handleHide()");
    window.clearInterval(SceneSceneChannel.streamInfoTimer);
};

SceneSceneChannel.prototype.handleFocus = function() {
    //console.log("SceneSceneChannel.handleFocus()");
    sysTime = new Date().getTime();
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF); //screensaver off

    //SceneSceneChannel.Player.OnConnectionFailed = 'SceneSceneChannel.onConnectionFailed';          Not implemented
    //SceneSceneChannel.Player.OnAuthenticationFailed = 'SceneSceneChannel.onAuthenticationFailed';  Not implemented
    //SceneSceneChannel.Player.OnStreamNotFound = 'SceneSceneChannel.onStreamNotFound';              Not implemented
    //SceneSceneChannel.Player.OnNetworkDisconnected = 'SceneSceneChannel.onNetworkDisconnected';    Not implemented
    //SceneSceneChannel.Player.OnRenderError = 'SceneSceneChannel.onRenderError';                    Not implemented
    //http://107.22.233.36/guide_static/tizenguide/_downloads/Tizen_AppConverting_Guide_1_10.pdf page 14 example to solve

    if (ChatPositions == null)
        ChatPositions = parseInt(localStorage.getItem('ChatPositionsValue')) || 0;
    if (ChatBackground == null)
        ChatBackground = parseInt(localStorage.getItem('ChatBackground')) || 0.5;
    if (ChatSizeValue == null)
        ChatSizeValue = parseInt(localStorage.getItem('ChatSizeValue')) || 2;
    SceneSceneChannel.ChatEnable = localStorage.getItem('ChatEnable') == 'true' ? true : false;
    SceneSceneChannel.hidePanel();
    SceneSceneChannel.hideChat();
    $('#stream_info_name').text(SceneSceneBrowser.selectedChannel);
    $("#stream_info_title").text("");
    $("#stream_info_icon").attr("src", "");

    SceneSceneChannel.updateStreamInfo();
    SceneSceneChannel.streamInfoTimer = window.setInterval(SceneSceneChannel.updateStreamInfo, 10000);
    $("#chat_container").html(
        '<iframe id="chat_frame" width="100%" height="100%" frameborder="0" scrolling="no" style="position: absolute;" src="https://www.nightdev.com/hosted/obschat/?theme=transparent&channel=' + SceneSceneBrowser.selectedChannel + '&bot_activity=false&prevent_clipping=false"></iframe> \
        <div id="scene_channel_dialog_chat" style="position: absolute; text-align: center; width: 100%; margin-top: 50%;"> \
        <div id="scene_channel_dialog_chat_text" class="strokedbig" style="display: inline-block; font-size: 150%; color: white;"></div> \
        </div>');
    SceneSceneChannel.tokenResponse = 0;
    SceneSceneChannel.playlistResponse = 0;
    SceneSceneChannel.playingTry = 0;
    SceneSceneChannel.state = SceneSceneChannel.STATE_LOADING_TOKEN;
    SceneSceneChannel.loadData();
};

SceneSceneChannel.prototype.handleBlur = function() {
    //console.log("SceneSceneChannel.handleBlur()");
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON); //make screen saver on, when go back for SceneBrowser
};

SceneSceneChannel.prototype.handleKeyDown = function(e) {
    //console.log("SceneSceneChannel.handleKeyDown(" + e.keyCode + ")");
    if (SceneSceneChannel.state != SceneSceneChannel.STATE_PLAYING) {
        switch (e.keyCode) {
            case TvKeyCode.KEY_RETURN:
                //console.log("KEY_RETURN");
                e.preventDefault(); //prevent key to do default
                if (SceneSceneChannel.isShowExitDialogOn) {
                    SceneSceneChannel.shutdownStream();
                    window.clearTimeout(exitID);
                }
                SceneSceneChannel.showExitDialog();
                break;
            case TvKeyCode.KEY_VOLUMEUP:
                //console.log("KEY_VOLUMEUP");
                break;
            case TvKeyCode.KEY_VOLUMEDOWN:
                //console.log("KEY_VOLUMEDOWN");
                break;
            case TvKeyCode.KEY_MUTE:
                //console.log("KEY_MUTE");
                break;
        }
    } else {
        switch (e.keyCode) {
            case TvKeyCode.KEY_CHANNELUP:
                ChatPositions += 1;
                if (!SceneSceneChannel.isChatShown()) {
                    SceneSceneChannel.showChat();
                    SceneSceneChannel.ChatEnable = true;
                    localStorage.setItem('ChatEnable', 'true');
                }
                SceneSceneChannel.ChatPosition();
                break;
            case TvKeyCode.KEY_CHANNELDOWN:
                if (SceneSceneChannel.isChatShown()) {
                    ChatPositions -= 1;
                    SceneSceneChannel.hideChat();
                    SceneSceneChannel.ChatEnable = false;
                    localStorage.setItem('ChatEnable', 'false');
                    localStorage.setItem('ChatPositionsValue', parseInt(ChatPositions));
                }
                break;
            case TvKeyCode.KEY_LEFT:
                //console.log("KEY_LEFT");
                if (SceneSceneChannel.isChatShown()) {
                    ChatBackground -= 0.05;
                    if (ChatBackground < 0) ChatBackground = 0;
                    SceneSceneChannel.ChatBackground();
                }
                break;
            case TvKeyCode.KEY_RIGHT:
                //console.log("KEY_RIGHT");
                if (SceneSceneChannel.isChatShown()) {
                    ChatBackground += 0.05;
                    if (ChatBackground > 1) ChatBackground = 1;
                    SceneSceneChannel.ChatBackground();
                }
                break;
            case TvKeyCode.KEY_UP:
                if (SceneSceneChannel.isPanelShown()) {
                    if (SceneSceneChannel.qualityIndex > 0) {
                        //console.log("KEY_CHANNELDOWN or KEY_4");
                        SceneSceneChannel.qualityIndex--;
                        SceneSceneChannel.qualityDisplay();
                    }
                    clearHide();
                    setHide();
                } else if (SceneSceneChannel.isChatShown()) {
                    if (ChatSizeValue > 0) {
                        ChatSizeValue--;
                        SceneSceneChannel.ChatSize();
                    }
                    SceneSceneChannel.showChatBackgroundDialog('Size 33%');
                }
                break;
            case TvKeyCode.KEY_DOWN:
                if (SceneSceneChannel.isPanelShown()) {
                    if (SceneSceneChannel.qualityIndex < SceneSceneChannel.getQualitiesCount() - 1) {
                        //console.log("KEY_CHANNELDOWN or KEY_4");
                        SceneSceneChannel.qualityIndex++;
                        SceneSceneChannel.qualityDisplay();
                    }
                    clearHide();
                    setHide();
                } else if (SceneSceneChannel.isChatShown()) {
                    if (ChatSizeValue < 2) {
                        ChatSizeValue++;
                        SceneSceneChannel.ChatSize();
                    } else SceneSceneChannel.showChatBackgroundDialog('Size 100%');
                }
                break;
            case TvKeyCode.KEY_ENTER:
                //console.log("KEY_ENTER");
                if (SceneSceneChannel.isPanelShown()) {
                    clearPause();
                    SceneSceneChannel.qualityChanged();
                } else {
                    SceneSceneChannel.showPanel();
                }
                break;
            case TvKeyCode.KEY_RETURN:
                e.preventDefault(); //prevent key to do default
                if (SceneSceneChannel.isPanelShown()) {
                    SceneSceneChannel.hidePanel();
                } else {
                    if (SceneSceneChannel.isShowExitDialogOn) {
                        SceneSceneChannel.hideChat();
                        SceneSceneChannel.shutdownStream();
                        window.clearTimeout(exitID);
                    }
                    SceneSceneChannel.showExitDialog();
                }
                break;
            case TvKeyCode.KEY_PLAYPAUSE:
                if (SceneSceneChannel.Play) {
                    SceneSceneChannel.Play = false;
                    webapis.avplay.pause();
                    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
                    SceneSceneChannel.showPauseDialog();
                    if (!SceneSceneChannel.isPanelShown()) {
                        SceneSceneChannel.showPanel();
                    }
                } else {
                    clearPause();
                    webapis.avplay.play();
                    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
                }
                break;
            case TvKeyCode.KEY_VOLUMEUP:
            case TvKeyCode.KEY_VOLUMEDOWN:
                break;
            case TvKeyCode.KEY_MUTE:
                break;
            case TvKeyCode.KEY_RED:
                break;
            case TvKeyCode.KEY_GREEN:
                break;
            case TvKeyCode.KEY_YELLOW:
                break;
            case TvKeyCode.KEY_BLUE:
                break;
            default:
                //console.log("handle default key event, key code(" + keyCode + ")");
                break;
        }
    }
};


SceneSceneChannel.onConnectionFailed = function() {
    if (SceneSceneChannel.playingTry++ < SceneSceneChannel.playingTryMax) {
        SceneSceneChannel.showDialog(STR_RETRYING + " (" + SceneSceneChannel.playingTry + STR_ATTEMPT + ")");
        SceneSceneChannel.Player.Play(SceneSceneChannel.playingUrl);
    } else {
        SceneSceneChannel.showDialog(STR_ERROR_CONNECTION_FAIL);
    }
};

SceneSceneChannel.onAuthenticationFailed = function() {
    SceneSceneChannel.showDialog(STR_ERROR_AUTHENTICATION_FAIL);
};

SceneSceneChannel.onStreamNotFound = function() {
    SceneSceneChannel.showDialog(STR_ERROR_STREAM_NOT_FOUND);
};

SceneSceneChannel.onNetworkDisconnected = function() {
    SceneSceneChannel.showDialog(STR_ERROR_NETWORK_DISCONNECT);
    SceneSceneChannel.shutdownStream();
};

SceneSceneChannel.onRenderError = function() {
    if (SceneSceneChannel.quality == "High" ||
        SceneSceneChannel.quality == "Medium" ||
        SceneSceneChannel.quality == "Low") {
        SceneSceneChannel.showDialog(STR_ERROR_RENDER_FIXED);
    } else {
        SceneSceneChannel.showDialog(STR_ERROR_RENDER_SOURCE);
    }
};

SceneSceneChannel.onRenderingComplete = function() {
    SceneSceneChannel.shutdownStream();
};

SceneSceneChannel.onBufferingStart = function() {
    //console.log("onBufferingStart");
    SceneSceneChannel.showDialog(STR_BUFFERING);
};

SceneSceneChannel.onBufferingProgress = function(percent) {
    SceneSceneChannel.showDialog(STR_BUFFERING + ": " + percent + "%");
};

SceneSceneChannel.onBufferingComplete = function() {
    SceneSceneChannel.showPlayer();
};


SceneSceneChannel.qualityChanged = function() {
    SceneSceneChannel.showDialog("");
    SceneSceneChannel.playingUrl = SceneSceneChannel.qualities[0].url;
    SceneSceneChannel.qualityIndex = 0;
    //console.log("SceneSceneChannel.playingUrl = " + SceneSceneChannel.playingUrl);
    for (var i = 0; i < SceneSceneChannel.qualities.length; i++) {
        if (SceneSceneChannel.qualities[i].id === SceneSceneChannel.quality) {
            SceneSceneChannel.qualityIndex = i;
            SceneSceneChannel.playingUrl = SceneSceneChannel.qualities[i].url;
            break;
        }
    }

    SceneSceneChannel.qualityPlaying = SceneSceneChannel.quality;
    SceneSceneChannel.qualityPlayingIndex = SceneSceneChannel.qualityIndex;

    try {
        offsettime = oldcurrentTime;
        webapis.avplay.stop();
        webapis.avplay.open(SceneSceneChannel.playingUrl);
        webapis.avplay.setListener(listener);
        webapis.avplay.setDisplayRect(0, 0, 3840, 2160);
        webapis.avplay.setStreamingProperty("SET_MODE_4K", "TRUE");
        webapis.avplay.prepare();
        webapis.avplay.play();
        webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    } catch (e) {
        console.error(e);
    }
};

SceneSceneChannel.showExitDialog = function() {
    if (SceneSceneChannel.isShowDialogOn) {
        $("#scene_channel_dialog_loading").hide();
        SceneSceneChannel.isShowDialogOn = false;
    }
    $("#scene_channel_dialog_exit_text").text(STR_EXIT);
    if (!SceneSceneChannel.isShowExitDialogOn) {
        $("#scene_channel_dialog_exit").show();
        SceneSceneChannel.isShowExitDialogOn = true;
        exitID = window.setTimeout(SceneSceneChannel.showExitDialog, 3000);
    } else {
        $("#scene_channel_dialog_exit").hide();
        SceneSceneChannel.isShowExitDialogOn = false;
    }
};

SceneSceneChannel.showPauseDialog = function() {
    if (SceneSceneChannel.isShowDialogOn) {
        $("#scene_channel_dialog_loading").hide();
        SceneSceneChannel.isShowDialogOn = false;
    }

    if (!SceneSceneChannel.isShowPauseDialogOn) {
        $("#scene_channel_dialog_simple_pause").show();
        SceneSceneChannel.isShowPauseDialogOn = true;
        pauseEndID = window.setTimeout(SceneSceneChannel.showPauseDialog, 1500);
    } else {
        $("#scene_channel_dialog_simple_pause").hide();
        SceneSceneChannel.isShowPauseDialogOn = false;
        pauseStartID = window.setTimeout(SceneSceneChannel.showPauseDialog, 8000); // time in ms
    }
};

SceneSceneChannel.showDialog = function(title) {
    $("#scene_channel_dialog_loading_text").text(title);
    if (!SceneSceneChannel.isShowDialogOn) {
        $("#scene_channel_dialog_loading").show();
        SceneSceneChannel.isShowDialogOn = true;
    }
};

SceneSceneChannel.showPlayer = function() {
    $("#scene_channel_dialog_loading").hide();
    $("scene_channel_panel").hide();
    SceneSceneChannel.isShowDialogOn = false;
};

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

SceneSceneChannel.updateStreamInfo = function() {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.ontimeout = function() {

    };
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                try {
                    var response = $.parseJSON(xmlHttp.responseText);
                    $("#stream_info_name").text(response.stream.channel.display_name);
                    $("#stream_info_title").text(response.stream.channel.status);
                    $("#stream_info_game").text('playing ' + response.stream.game + ' for ' + addCommas(response.stream.viewers) + ' ' + STR_VIEWER);
                    $("#stream_info_icon").attr("src", response.stream.channel.logo);
                    created = new Date(response.stream.created_at).getTime();
                } catch (err) {

                }

            } else {}
        }
    };
    xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + SceneSceneBrowser.selectedChannel, true);
    xmlHttp.timeout = 10000;
    xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');
    xmlHttp.send(null);
};

SceneSceneChannel.showPanel = function() {
    SceneSceneChannel.qualityDisplay();
    $("#scene_channel_panel").show();
    setHide();
    sizePanelOffset = -4;
    if (SceneSceneChannel.isChatShown() && (ChatPositions < 2)) SceneSceneChannel.ChatPosition();
};

SceneSceneChannel.hidePanel = function() {
    clearHide();
    $("#scene_channel_panel").hide();
    SceneSceneChannel.quality = SceneSceneChannel.qualityPlaying;
    sizePanelOffset = 0;
    if (SceneSceneChannel.isChatShown() && (ChatPositions < 2)) SceneSceneChannel.ChatPosition();
};

SceneSceneChannel.ChatPosition = function() {
    //default
    var left = "75.3%",
        top = (51 + sizeOffset + sizePanelOffset) + '.5%';

    if (ChatPositions < 7) {
        if (ChatPositions > 1) top = "0.5%"; // top/lefth
        if (ChatPositions > 2) left = "38.3%"; // top/midle
        if (ChatPositions > 3) left = "0%"; // top/right

        if (ChatPositions > 4) top = (51 + sizeOffset) + '.5%'; // bottom/lefth
        if (ChatPositions > 5) left = "38.3%"; // bottom/midle
    } else ChatPositions = 1;

    document.getElementById("chat_container").style.top = top;
    document.getElementById("chat_container").style.left = left;
    localStorage.setItem('ChatPositionsValue', parseInt(ChatPositions));
};

SceneSceneChannel.ChatSize = function() {
    var containerHeight = 48,
        percentage = 100,
        dialogTop = 50;
    sizeOffset = 0;
    if (ChatSizeValue == 1) {
        containerHeight = 32;
        percentage = 66;
        dialogTop = 25;
        sizeOffset = 16;
    } else if (ChatSizeValue == 0) {
        containerHeight = 16;
        percentage = 33;
        dialogTop = 12.5;
        sizeOffset = 32;
    }
    document.getElementById("chat_container").style.height = containerHeight + '%';
    window.parent.document.getElementById("chat_frame").style.height = '100%';
    document.getElementById("scene_channel_dialog_chat").style.marginTop = dialogTop + '%';
    SceneSceneChannel.ChatPosition();
    localStorage.setItem('ChatSizeValue', parseInt(ChatSizeValue));
    SceneSceneChannel.showChatBackgroundDialog('Size ' + percentage + '%');
};

SceneSceneChannel.ChatBackground = function() {
    document.getElementById("chat_container").style.backgroundColor = "rgba(0, 0, 0, " + ChatBackground + ")";
    localStorage.setItem('ChatBackgroundValue', parseInt(ChatBackground));
    SceneSceneChannel.showChatBackgroundDialog('Brightness ' + (ChatBackground.toFixed(2) * 100).toFixed(0) + '%');
};

SceneSceneChannel.showChatBackgroundDialog = function(DialogText) {
    window.clearTimeout(chatBID);
    $("#scene_channel_dialog_chat_text").text(DialogText);
    $("#scene_channel_dialog_chat").show();
    chatBID = window.setTimeout(SceneSceneChannel.hideChatBackgroundDialog, 1000);
};

SceneSceneChannel.hideChatBackgroundDialog = function() {
    $("#scene_channel_dialog_chat").hide();
};

SceneSceneChannel.showChat = function() {
    $("#chat_container").show();
};

SceneSceneChannel.hideChat = function() {
    $("#chat_container").hide();
};

SceneSceneChannel.isChatShown = function() {
    return $("#chat_container").is(":visible");
};

function clearPause() {
    window.clearTimeout(pauseEndID);
    window.clearTimeout(pauseStartID);
    SceneSceneChannel.Play = true;
    if (SceneSceneChannel.isShowPauseDialogOn) {
        $("#scene_channel_dialog_simple_pause").hide();
        SceneSceneChannel.isShowPauseDialogOn = false;
    }
    if (SceneSceneChannel.isPanelShown()) {
        SceneSceneChannel.hidePanel();
    }
}

function setHide() {
    timeoutID = window.setTimeout(SceneSceneChannel.hidePanel, 5000); // time in ms
}

function clearHide() {
    window.clearTimeout(timeoutID);
}

SceneSceneChannel.isPanelShown = function() {
    return $("#scene_channel_panel").is(":visible");
};

SceneSceneChannel.loadDataError = function() {
    SceneSceneChannel.loadingDataTry++;
    if (SceneSceneChannel.loadingDataTry < SceneSceneChannel.loadingDataTryMax) {
        if (SceneSceneChannel.loadingDataTry < 5) {
            SceneSceneChannel.loadingDataTimeout += 250;
        } else {
            switch (SceneSceneChannel.loadingDataTry) {
                case 5:
                    SceneSceneChannel.loadingDataTimeout = 2400;
                    break;
                case 6:
                    SceneSceneChannel.loadingDataTimeout = 5000;
                    break;
                case 7:
                    SceneSceneChannel.loadingDataTimeout = 15000;
                    break;
                case 8:
                    SceneSceneChannel.loadingDataTimeout = 30000;
                    break;
                case 9:
                    SceneSceneChannel.loadingDataTimeout = 45000;
                    break;
                default:
                    SceneSceneChannel.loadingDataTimeout = 150000;
                    break;
            }
        }
        SceneSceneChannel.loadDataRequest();
    } else {
        SceneSceneChannel.showDialog("Error: Unable to retrieve access token.");
    }
};

SceneSceneChannel.loadDataSuccess = function(responseText) {
    //SceneSceneChannel.showDialog("");
    if (SceneSceneChannel.state == SceneSceneChannel.STATE_LOADING_TOKEN) {
        SceneSceneChannel.tokenResponse = $.parseJSON(responseText);
        SceneSceneChannel.state = SceneSceneChannel.STATE_LOADING_PLAYLIST;
        SceneSceneChannel.loadData();
    } else if (SceneSceneChannel.state == SceneSceneChannel.STATE_LOADING_PLAYLIST) {
        SceneSceneChannel.playlistResponse = responseText;
        SceneSceneChannel.qualities = extractQualities(SceneSceneChannel.playlistResponse);
        SceneSceneChannel.state = SceneSceneChannel.STATE_PLAYING;
        SceneSceneChannel.qualityChanged();
    }
};

SceneSceneChannel.loadDataRequest = function() {
    try {
        var dialog_title = (SceneSceneBrowser.refreshClick ? STR_REFRESH : STR_RETRYING) + " " + SceneSceneBrowser.selectedChannelDisplayname + " (" + SceneSceneBrowser.loadingDataTry + STR_ATTEMPT + ")";

        SceneSceneChannel.showDialog(dialog_title);
        var xmlHttp = new XMLHttpRequest();

        var theUrl;
        if (SceneSceneChannel.state == SceneSceneChannel.STATE_LOADING_TOKEN) {
            theUrl = 'http://api.twitch.tv/api/channels/' + SceneSceneBrowser.selectedChannel + '/access_token';
        } else {
            theUrl = 'http://usher.twitch.tv/api/channel/hls/' + SceneSceneBrowser.selectedChannel + '.m3u8?player=twitchweb&&type=any&sig=' + SceneSceneChannel.tokenResponse.sig + '&token=' + escape(SceneSceneChannel.tokenResponse.token) + '&allow_source=true&allow_audi_only=true&p=' + random_int;
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = SceneSceneChannel.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');

        //console.log("theURL: " + theUrl);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        SceneSceneChannel.loadDataSuccess(xmlHttp.responseText);
                    } catch (err) {
                        //console.log("loadDataSuccess() exception: " + err.name + ' ' + err.message);
                        SceneSceneChannel.showDialog("loadDataSuccess() exception: " + err.name + ' ' + err.message);
                    }

                } else {
                    SceneSceneChannel.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (error) {
        SceneSceneChannel.loadDataError();
    }
};

SceneSceneChannel.loadData = function() {
    SceneSceneChannel.loadingDataTry = 1;
    SceneSceneChannel.loadingDataTimeout = 1500;
    SceneSceneChannel.loadDataRequest();
};
