/*jshint multistr: true */
function PlayVod() {

}
//Variable initialization
PlayVod.PanelHideID = '';
PlayVod.quality = "source";
PlayVod.qualityPlaying = PlayVod.quality;

PlayVod.STATE_LOADING_TOKEN = 0;
PlayVod.STATE_LOADING_PLAYLIST = 1;
PlayVod.STATE_PLAYING = 2;
PlayVod.state = PlayVod.STATE_LOADING_TOKEN;

PlayVod.streamInfoTimer = '';
PlayVod.tokenResponse = 0;
PlayVod.playlistResponse = 0;
PlayVod.playingTry = 0;

PlayVod.playingUrl = '';
PlayVod.qualities = [];
PlayVod.qualityIndex = '';
PlayVod.exitID = '';

PlayVod.pauseEndID = '';
PlayVod.pauseStartID = '';

PlayVod.created = '';

PlayVod.loadingDataTry = 0;
PlayVod.loadingDataTryMax = 15;
var random_int = Math.round(Math.random() * 1e7);
PlayClip.QualitChage = false;
PlayVod.JumpFBID = null;
PlayVod.JumpFowardBackwardCount = 0;

//Variable initialization end

PlayVod.Start = function() {
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);

    $('#clip_label_quality').html(STR_QUALITY);
    $("#stream_info_icon").attr("src", Main.selectedChannelChannelLogo);
    $('#stream_info_name').text(Main.selectedChannel);
    $("#stream_info_title").text(Svod.title);
    $("#stream_info_game").text(Svod.createdAt);
    $("#stream_live").text(Svod.views);
    $("#stream_info_livetime").text(Svod.Duration);

    PlayVod.tokenResponse = 0;
    PlayVod.playlistResponse = 0;
    PlayVod.playingTry = 0;
    PlayVod.state = PlayVod.STATE_LOADING_TOKEN;
    document.addEventListener('visibilitychange', PlayVod.Resume, false);
    PlayVod.loadData();
};

PlayVod.Resume = function() {
    if (document.hidden) {
        PlayClip.Play = false;
        Play.mWebapisAvplay.stop();
        document.getElementById('chat_frame').src = 'about:blank';
        PlayClip.QualitChage = true;
    } else {
        $("#scene_channel_panel").show();
        PlayClip.showWarningDialog(STR_RESUME);
        PlayClip.isReturnFromResume = true;
        window.setTimeout(function() {
            PlayClip.onPlayer();
        }, 500);
    }
};

PlayVod.loadData = function() {
    PlayVod.loadingDataTry = 0;
    PlayVod.loadingDataTimeout = 3500;
    PlayVod.loadDataRequest();
};

PlayVod.loadDataRequest = function() {
    try {
        PlayVod.showDialog();
        var xmlHttp = new XMLHttpRequest();

        var theUrl;
        if (PlayVod.state == PlayVod.STATE_LOADING_TOKEN) {
            theUrl = 'https://api.twitch.tv/api/vods/' + Svod.vodId + '/access_token';
        } else {
            theUrl = 'http://usher.twitch.tv/vod/' + Svod.vodId +
                '.m3u8?player=twitchweb&&type=any&nauthsig=' + PlayVod.tokenResponse.sig + '&nauth=' +
                escape(PlayVod.tokenResponse.token) + '&allow_source=true&allow_audi_only=true&p=' + random_int;
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = PlayVod.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        PlayVod.loadingDataTry = 0;
                        PlayVod.loadDataSuccess(xmlHttp.responseText);
                    } catch (err) {}

                } else {
                    PlayVod.loadDataError();
                }
            }
        };
        xmlHttp.send(null);
    } catch (error) {
        PlayVod.loadDataError();
    }
};

PlayVod.loadDataError = function() {
    PlayVod.loadingDataTry++;
    if (PlayVod.loadingDataTry < PlayVod.loadingDataTryMax) {
        if (PlayVod.loadingDataTry < 5) {
            PlayVod.loadingDataTimeout += 250;
        } else {
            switch (PlayVod.loadingDataTry) {
                case 5:
                    PlayVod.loadingDataTimeout = 5000;
                    break;
                case 6:
                    PlayVod.loadingDataTimeout = 6500;
                    break;
                case 7:
                    PlayVod.loadingDataTimeout = 15000;
                    break;
                case 8:
                    PlayVod.loadingDataTimeout = 30000;
                    break;
                case 9:
                    PlayVod.loadingDataTimeout = 60000;
                    break;
                default:
                    PlayVod.loadingDataTimeout = 300000;
                    break;
            }
        }
        PlayVod.loadDataRequest();
    } else {
        PlayVod.showWarningDialog(STR_IS_OFFLINE + ' loadDataError');
        window.setTimeout(PlayVod.shutdownStream, 1500);
    }
};

PlayVod.loadDataSuccess = function(responseText) {
    // log response json
    //console.log(responseText);
    if (PlayVod.state == PlayVod.STATE_LOADING_TOKEN) {
        PlayVod.tokenResponse = $.parseJSON(responseText);
        PlayVod.state = PlayVod.STATE_LOADING_PLAYLIST;
        PlayVod.loadData();
    } else if (PlayVod.state == PlayVod.STATE_LOADING_PLAYLIST) {
        PlayVod.playlistResponse = responseText;
        PlayVod.extractQualities(PlayVod.playlistResponse);
    }
};

PlayVod.extractQualities = function(input) {
    var result = [];

    var streams = extractStreamDeclarations(input);
    for (var i = 0; i < streams.length; i++) {
        result.push({
            'id': extractQualityFromStream(streams[i]),
            'url': streams[i].split("\n")[2]
        });
    }
    PlayVod.qualities = result;
    PlayVod.state = PlayVod.STATE_PLAYING;
    PlayVod.qualityChanged();
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

PlayVod.qualityChanged = function() {
    PlayVod.qualityIndex = 0;
    PlayVod.playingUrl = PlayVod.qualities[0].url;
    if (PlayVod.quality.indexOf("source") !== -1) PlayVod.quality = "source";
    for (var i = 0; i < PlayVod.getQualitiesCount(); i++) {
        if (PlayVod.qualities[i].id === PlayVod.quality) {
            PlayVod.qualityIndex = i;
            PlayVod.playingUrl = PlayVod.qualities[i].url;
            break;
        } else if (PlayVod.qualities[i].id.indexOf(PlayVod.quality) !== -1) { //make shore to set a value before break out
            PlayVod.qualityIndex = i;
            PlayVod.playingUrl = PlayVod.qualities[i].url;
        }
    }
    PlayVod.qualityPlaying = PlayVod.quality;
    PlayVod.onPlayer();
};

PlayVod.onPlayer = function() {
    try {
        Play.mWebapisAvplay.stop();
        Play.mWebapisAvplay.open(PlayVod.playingUrl);
        Play.mWebapisAvplay.setListener(PlayVod.listener);
        Play.mWebapisAvplay.setTimeoutForBuffering(20000);
        if (webapis.productinfo.isUdPanelSupported())
            Play.mWebapisAvplay.setStreamingProperty("SET_MODE_4K", "TRUE");

        Play.mWebapisAvplay.setDisplayRect(0, 0, screen.width, screen.height);
        Play.mWebapisAvplay.prepareAsync(function() {
            try {
                PlayVod.hideDialog();
                Play.mWebapisAvplay.play();
                PlayVod.HideWarningDialog();
                PlayVod.hidePanel();
                document.getElementById("buffering_bar_one").style.width = '1%';
                PlayVod.showBufferDialog();
                if (PlayVod.ChatEnable && !PlayVod.isChatShown()) PlayVod.showChat();
                PlayVod.Play = true;
                // sync chat and stream
                document.getElementById('chat_frame').src = 'https://www.nightdev.com/hosted/obschat/?theme=bttv_blackchat&channel=' +
                    Main.selectedChannel + '&fade=false&bot_activity=false&prevent_clipping=false';
            } catch (e) {}
        }, function() { //ErrorCallback try again from the top
            PlayVod.Play = false;
            window.setTimeout(PlayVod.Start, 150);
        });
        webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    } catch (e) { //ErrorCallback try again from the top
        PlayVod.Play = false;
        window.setTimeout(PlayVod.Start, 150);
    }
};

PlayVod.listener = {
    onbufferingstart: function() {
        document.getElementById("buffering_bar_one").style.width = '1%';
        PlayVod.showBufferDialog();
    },
    onbufferingprogress: function(percent) {
        document.getElementById("buffering_bar_one").style.width = (((percent + 2) <= 100) ? (percent + 2) : 100) + '%';
        if (!PlayVod.BufferDialogVisible() && (percent < 98)) PlayVod.showBufferDialog();
    },
    onbufferingcomplete: function() {
        PlayVod.HideBufferDialog();
    },
    oncurrentplaytime: function(currentTime) {
        PlayVod.updateCurrentTime(currentTime);
    },
    onerror: function(eventType) {
        if (eventType === 'PLAYER_ERROR_CONNECTION_FAILED') {
            if (!PlayVod.isReturnFromResume) PlayVod.WarnShutdownStream();
            else {
                PlayVod.RestoreFromResume = true;
                PlayVod.isReturnFromResume = false;
                PlayVod.qualityChanged();
            }
        }
    },
    onstreamcompleted: function() {
        PlayVod.WarnShutdownStream();
    }
};

PlayVod.WarnShutdownStream = function() {
    PlayVod.showWarningDialog(STR_IS_OFFLINE);
    window.setTimeout(PlayVod.shutdownStream, 1500);
};

PlayVod.updateCurrentTime = function(currentTime) {
    if (currentTime === null)
        currentTime = Play.mWebapisAvplay.getCurrentTime();

    document.getElementById("stream_info_currentime").innerHTML = STR_WATCHING + PlayVod.timeMs(currentTime);
    if (PlayVod.WarningDialogVisible()) PlayVod.HideWarningDialog();

    if (PlayVod.DialogVisible()) PlayVod.hideDialog();
    if (PlayVod.WarningDialogVisible()) PlayVod.HideWarningDialog();
    if (PlayVod.BufferDialogVisible()) {
        if (parseInt(document.getElementById("buffering_bar_one").style.width) > 99) PlayVod.HideBufferDialog();
    }
    PlayVod.isReturnFromResume = false;
};

PlayVod.clock = function(currentTime) {
    var today = (new Date()).toString().split(' ');
    var time = today[4].toString().split(':');
    document.getElementById("stream_system_time").innerHTML = today[2].toString() + '/' + today[1].toString() + ' ' + time[0] + ':' + time[1];
};

PlayVod.lessthanten = function(time) {
    return (time < 10) ? "0" + time : time;
};

PlayVod.timeMs = function(time) {
    var seconds, minutes, hours;

    time = Math.floor(time / 1000);
    seconds = PlayVod.lessthanten(time % 60);

    time = Math.floor(time / 60);
    minutes = PlayVod.lessthanten(time % 60);

    time = Math.floor(time / 60);
    hours = PlayVod.lessthanten(time);

    //final time 00:00 or 00:00:00
    return (time === 0) ? (minutes + ":" + seconds) : (hours + ":" + minutes + ":" + seconds);
};

PlayVod.streamLiveAt = function(time) { //time in '2017-10-27T13:27:27Z'
    var date2_ms = new Date().getTime();
    return PlayVod.timeMs(date2_ms - time);
};

PlayVod.shutdownStream = function() {
    Play.mWebapisAvplay.close();
    document.body.removeEventListener("keydown", PlayVod.handleKeyDown);
    document.removeEventListener('visibilitychange', PlayVod.Resume);
    PlayVod.clearPause();
    PlayVod.HideWarningDialog();
    PlayVod.HideBufferDialog();
    PlayVod.hideDialog();
    $("#scene1").show();
    $("#scene2").hide();
    Main.ReStartScreens();
    window.clearInterval(PlayVod.streamInfoTimer);
    document.getElementById("stream_live").innerHTML =
        '<i class="fa fa-circle" style="color: red; font-size: 115%; aria-hidden="true"></i> ' + STR_LIVE.toUpperCase();
};

PlayVod.showDialog = function() {
    $("#dialog_loading_play").show();
};

PlayVod.hideDialog = function() {
    $("#dialog_loading_play").hide();
};

PlayVod.showWarningDialog = function(text) {
    $("#dialog_warning_play_text").text(text);
    $("#dialog_warning_play").show();
};

PlayVod.HideWarningDialog = function() {
    $("#dialog_warning_play_text").text('');
    $("#dialog_warning_play").hide();
};

PlayVod.WarningDialogVisible = function() {
    return $("#dialog_warning_play").is(":visible");
};

PlayVod.DialogVisible = function() {
    return $("#dialog_loading_play").is(":visible");
};

PlayVod.showBufferDialog = function() {
    $("#dialog_buffering").show();
};

PlayVod.HideBufferDialog = function() {
    $("#dialog_buffering").hide();
};

PlayVod.BufferDialogVisible = function() {
    return $("#dialog_buffering").is(":visible");
};


PlayVod.showExitDialog = function() {
    if (!PlayVod.ExitDialogVisible()) {
        $("#dialog_exit").show();
        PlayVod.exitID = window.setTimeout(PlayVod.showExitDialog, 3000);
    } else {
        $("#dialog_exit").hide();
    }
};

PlayVod.ExitDialogVisible = function() {
    return $("#dialog_exit").is(":visible");
};

PlayVod.clearPause = function() {
    window.clearTimeout(PlayVod.pauseEndID);
    window.clearTimeout(PlayVod.pauseStartID);
    if (PlayVod.isShowPauseDialogOn()) {
        $("#dialog_simple_pause").hide();
    }
    if (PlayVod.isPanelShown()) {
        PlayVod.hidePanel();
    }
};

PlayVod.showPauseDialog = function() {
    if (!PlayVod.isShowPauseDialogOn()) {
        $("#dialog_simple_pause").show();
        PlayVod.pauseEndID = window.setTimeout(PlayVod.showPauseDialog, 1500);
    } else {
        $("#dialog_simple_pause").hide();
        PlayVod.pauseStartID = window.setTimeout(PlayVod.showPauseDialog, 8000); // time in ms
    }
};

PlayVod.isShowPauseDialogOn = function() {
    return $("#dialog_simple_pause").is(":visible");
};

PlayVod.isPanelShown = function() {
    return $("#scene3_channel_panel").is(":visible");
};

PlayVod.hidePanel = function() {
    PlayVod.clearHidePanel();
    $("#scene3_channel_panel").hide();
    PlayVod.quality = PlayVod.qualityPlaying;
};

PlayVod.showPanel = function() {
    PlayVod.qualityIndexReset();
    PlayVod.clock();
    PlayVod.qualityDisplay();
    $("#scene3_channel_panel").show();
    PlayVod.setHidePanel();
};

PlayVod.clearHidePanel = function() {
    window.clearTimeout(PlayVod.PanelHideID);
};

PlayVod.setHidePanel = function() {
    PlayVod.PanelHideID = window.setTimeout(PlayVod.hidePanel, 5000); // time in ms
};

PlayVod.qualityIndexReset = function() {
    PlayVod.qualityIndex = 0;
    for (var i = 0; i < PlayVod.getQualitiesCount(); i++) {
        if (PlayVod.qualities[i].id === PlayVod.quality) {
            PlayVod.qualityIndex = i;
            break;
        } else if (PlayVod.qualities[i].id.indexOf(PlayVod.quality) !== -1) { //make shore to set a value before break out
            PlayVod.qualityIndex = i;
        }
    }
};

PlayVod.qualityDisplay = function() {
    if (PlayVod.qualityIndex === 0) {
        $('#clip_quality_arrow_up').css({
            'opacity': 0.2
        });
        $('#clip_quality_arrow_down').css({
            'opacity': 1.0
        });
    } else if (PlayVod.qualityIndex == PlayVod.getQualitiesCount() - 1) {
        $('#clip_quality_arrow_up').css({
            'opacity': 1.0
        });
        $('#clip_quality_arrow_down').css({
            'opacity': 0.2
        });
    } else {
        $('#clip_quality_arrow_up').css({
            'opacity': 1.0
        });
        $('#clip_quality_arrow_down').css({
            'opacity': 1.0
        });
    }

    PlayVod.quality = PlayVod.qualities[PlayVod.qualityIndex].id;

    $('#clip_quality_name').text(PlayVod.quality);
};

PlayVod.getQualitiesCount = function() {
    return PlayVod.qualities.length;
};

PlayVod.handleKeyDown = function(e) {
    if (PlayVod.state != PlayVod.STATE_PLAYING) {
        switch (e.keyCode) {
            case TvKeyCode.KEY_RETURN:
                if (PlayVod.ExitDialogVisible()) {
                    window.clearTimeout(PlayVod.exitID);
                    $("#play_dialog_exit").hide();
                    PlayVod.hideDialog();
                    window.setTimeout(PlayVod.shutdownStream, 10);
                } else {
                    PlayVod.showExitDialog();
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
            case TvKeyCode.KEY_CHANNELUP:
            case TvKeyCode.KEY_CHANNELDOWN:
                break;
            case TvKeyCode.KEY_LEFT:
                PlayVod.JumpFowardBackwardCount--;
                if (PlayVod.JumpFowardBackwardCount < -13) PlayVod.JumpFowardBackwardCount = -13;
                PlayVod.SetJumpFowardBackward(JumpFowardBackwardCount);
                break;
            case TvKeyCode.KEY_RIGHT:
                PlayVod.JumpFowardBackwardCount++;
                if (PlayVod.JumpFowardBackwardCount > 13) PlayVod.JumpFowardBackwardCount = 13;
                PlayVod.SetJumpFowardBackward(JumpFowardBackwardCount);
                break;
            case TvKeyCode.KEY_UP:
                if (PlayVod.isPanelShown()) {
                    if (PlayVod.qualityIndex > 0) {
                        PlayVod.qualityIndex--;
                        PlayVod.qualityDisplay();
                    }
                    PlayVod.clearHidePanel();
                    PlayVod.setHidePanel();
                } else {
                    PlayVod.showPanel();
                }
                break;
            case TvKeyCode.KEY_DOWN:
                if (PlayVod.isPanelShown()) {
                    if (PlayVod.qualityIndex < PlayVod.getQualitiesCount() - 1) {
                        PlayVod.qualityIndex++;
                        PlayVod.qualityDisplay();
                    }
                    PlayVod.clearHidePanel();
                    PlayVod.setHidePanel();
                } else {
                    PlayVod.showPanel();
                }
                break;
            case TvKeyCode.KEY_ENTER:
                if (PlayVod.isPanelShown()) {
                    PlayVod.QualitChage = true;
                    PlayVod.qualityChanged();
                    PlayVod.clearPause();
                } else {
                    PlayVod.showPanel();
                }
                break;
            case TvKeyCode.KEY_RETURN:
                if (PlayVod.isPanelShown()) {
                    PlayVod.hidePanel();
                } else {
                    if (PlayVod.ExitDialogVisible()) {
                        window.clearTimeout(PlayVod.exitID);
                        PlayVod.hideDialog();
                        $("#dialog_exit").hide();
                        window.setTimeout(PlayVod.shutdownStream, 10);
                    } else if (PlayVod.WarningDialogVisible() || PlayVod.BufferDialogVisible() || PlayVod.DialogVisible()) {
                        PlayVod.hideDialog();
                        PlayVod.HideWarningDialog();
                        PlayVod.showExitDialog();
                    } else {
                        PlayVod.showExitDialog();
                    }
                }
                break;
            case TvKeyCode.KEY_PLAY:
            case TvKeyCode.KEY_PAUSE:
            case TvKeyCode.KEY_PLAYPAUSE:
                if (!PlayVod.Play) {
                    PlayVod.Play = false;
                    Play.mWebapisAvplay.pause();
                    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
                    PlayVod.showPauseDialog();
                    if (!PlayVod.isPanelShown()) {
                        PlayVod.showPanel();
                    }
                } else {
                    PlayVod.Play = true;
                    PlayVod.clearPause();
                    Play.mWebapisAvplay.play();
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

PlayVod.DoJumpFowardBackward = function() {
    if ((Play.mWebapisAvplay.getCurrentTime() + PlayVod.JumpTime) < 0) {
        PlayVod.showWarningDialog(STR_JUMP_ZERO);
        window.setTimeout(function() {
            try {
                Play.mWebapisAvplay.seekTo(0, function() { //successCallback
                    PlayVod.HideWarningDialog();
                    PlayVod.JumpFowardBackwardCount = 0;
                }, function() { //ErrorCallback
                    PlayVod.HideWarningDialog();
                    PlayVod.JumpFowardBackwardCount = 0;
                    console.error(e);
                });
            } catch (e) {
                PlayVod.HideWarningDialog();
                PlayVod.JumpFowardBackwardCount = 0;
                console.error(e);
            }
        }, 1500);
    } else if ((Play.mWebapisAvplay.getCurrentTime() + PlayVod.JumpTime) > duration) {
        PlayVod.JumpFowardBackwardCount = 0;
        PlayVod.showWarningDialog(STR_JUMP_F_CANCEL);
        window.setTimeout(PlayVod.HideWarningDialog, 2500);
    } else {
        try {
            Play.mWebapisAvplay.jumpForward(PlayVod.JumpTime, function() { //successCallback
                PlayVod.HideWarningDialog();
                PlayVod.JumpFowardBackwardCount = 0;
            }, function() { //ErrorCallback
                PlayVod.HideWarningDialog();
                PlayVod.JumpFowardBackwardCount = 0;
            });
        } catch (e) {
            PlayVod.HideWarningDialog();
            PlayVod.JumpFowardBackwardCount = 0;
            console.error(e);
        }
    }
};

PlayVod.SetJumpFowardBackward = function(value) {
    window.clearTimeout(PlayVod.JumpFBID);
    PlayVod.JumpFowardBackwardCases(value);
    PlayVod.JumpFBID = window.setTimeout(PlayVod.DoJumpFowardBackward, 1000);
};

PlayVod.JumpFowardBackwardCases = function(value) {
    if (value < 0) {
        if (value == -1) {
            PlayVod.JumpTime = -1000 * 10; //10sec
            PlayVod.showWarningDialog(STR_JUMP_B + (PlayVod.JumpTime / 1000) + STR_SEC);
        } else if (value == -2) {
            PlayVod.JumpTime = -1000 * 30; //30sec
            PlayVod.showWarningDialog(STR_JUMP_B + (PlayVod.JumpTime / 1000) + STR_SEC);
        } else if (value == -3) {
            PlayVod.JumpTime = -1000 * 60; //1min
            PlayVod.showWarningDialog(STR_JUMP_B + (PlayVod.JumpTime / 1000 / 60) + STR_MIN);
        } else if (value == -4) {
            PlayVod.JumpTime = -1000 * 60 * 2; //2min
            PlayVod.showWarningDialog(STR_JUMP_B + (PlayVod.JumpTime / 1000 / 60) + STR_MIN);
        } else if (value == -5) {
            PlayVod.JumpTime = -1000 * 60 * 5; //5min
            PlayVod.showWarningDialog(STR_JUMP_B + (PlayVod.JumpTime / 1000 / 60) + STR_MIN);
        } else if (value == -6) {
            PlayVod.JumpTime = -1000 * 60 * 10; //10min
            PlayVod.showWarningDialog(STR_JUMP_B + (PlayVod.JumpTime / 1000 / 60) + STR_MIN);
        } else if (value == -7) {
            PlayVod.JumpTime = -1000 * 60 * 15; //15min
            PlayVod.showWarningDialog(STR_JUMP_B + (PlayVod.JumpTime / 1000 / 60) + STR_MIN);
        } else if (value == -8) {
            PlayVod.JumpTime = -1000 * 60 * 30; //30min
            PlayVod.showWarningDialog(STR_JUMP_B + (PlayVod.JumpTime / 1000 / 60) + STR_MIN);
        } else if (value == -9) {
            PlayVod.JumpTime = -1000 * 60 * 60; //1hr
            PlayVod.showWarningDialog(STR_JUMP_B + (PlayVod.JumpTime / 1000 / 60 / 60) + STR_HR);
        } else if (value == -10) {
            PlayVod.JumpTime = -1000 * 60 * 60 * 2; //2hr
            PlayVod.showWarningDialog(STR_JUMP_B + (PlayVod.JumpTime / 1000 / 60 / 60) + STR_HR);
        } else if (value == -11) {
            PlayVod.JumpTime = -1000 * 60 * 60 * 3; //3hr
            PlayVod.showWarningDialog(STR_JUMP_B + (PlayVod.JumpTime / 1000 / 60 / 60) + STR_HR);
        } else if (value == -12) {
            PlayVod.JumpTime = -1000 * 60 * 60 * 6; //6hr
            PlayVod.showWarningDialog(STR_JUMP_B + (PlayVod.JumpTime / 1000 / 60 / 60) + STR_HR);
        } else if (value == -13) {
            PlayVod.JumpTime = -1000 * 60 * 60 * 12; //12hr
            PlayVod.showWarningDialog(STR_JUMP_B + (PlayVod.JumpTime / 1000 / 60 / 60) + STR_HR);
        }
    } else if (value > 0) {
        if (value == 1) {
            PlayVod.JumpTime = 1000 * 10; //10sec
            PlayVod.showWarningDialog(STR_JUMP_F + (PlayVod.JumpTime / 1000) + STR_SEC);
        } else if (value == 2) {
            PlayVod.JumpTime = 1000 * 30; //30sec
            PlayVod.showWarningDialog(STR_JUMP_F + (PlayVod.JumpTime / 1000) + STR_SEC);
        } else if (value == 3) {
            PlayVod.JumpTime = 1000 * 60; //1min
            PlayVod.showWarningDialog(STR_JUMP_F + (PlayVod.JumpTime / 1000 / 60) + STR_MIN);
        } else if (value == 4) {
            PlayVod.JumpTime = 1000 * 60 * 2; //2min
            PlayVod.showWarningDialog(STR_JUMP_F + (PlayVod.JumpTime / 1000 / 60) + STR_MIN);
        } else if (value == 5) {
            PlayVod.JumpTime = 1000 * 60 * 5; //5min
            PlayVod.showWarningDialog(STR_JUMP_F + (PlayVod.JumpTime / 1000 / 60) + STR_MIN);
        } else if (value == 6) {
            PlayVod.JumpTime = 1000 * 60 * 10; //10min
            PlayVod.showWarningDialog(STR_JUMP_F + (PlayVod.JumpTime / 1000 / 60) + STR_MIN);
        } else if (value == 7) {
            PlayVod.JumpTime = 1000 * 60 * 15; //15min
            PlayVod.showWarningDialog(STR_JUMP_F + (PlayVod.JumpTime / 1000 / 60) + STR_MIN);
        } else if (value == 8) {
            PlayVod.JumpTime = 1000 * 60 * 30; //30min
            PlayVod.showWarningDialog(STR_JUMP_F + (PlayVod.JumpTime / 1000 / 60) + STR_MIN);
        } else if (value == 9) {
            PlayVod.JumpTime = 1000 * 60 * 60; //1hr
            PlayVod.showWarningDialog(STR_JUMP_F + (PlayVod.JumpTime / 1000 / 60 / 60) + STR_HR);
        } else if (value == 10) {
            PlayVod.JumpTime = 1000 * 60 * 60 * 2; //2hr
            PlayVod.showWarningDialog(STR_JUMP_F + (PlayVod.JumpTime / 1000 / 60 / 60) + STR_HR);
        } else if (value == 11) {
            PlayVod.JumpTime = 1000 * 60 * 60 * 3; //3hr
            PlayVod.showWarningDialog(STR_JUMP_F + (PlayVod.JumpTime / 1000 / 60 / 60) + STR_HR);
        } else if (value == 12) {
            PlayVod.JumpTime = 1000 * 60 * 60 * 6; //6hr
            PlayVod.showWarningDialog(STR_JUMP_F + (PlayVod.JumpTime / 1000 / 60 / 60) + STR_HR);
        } else if (value == 13) {
            PlayVod.JumpTime = 1000 * 60 * 60 * 12; //12hr
            PlayVod.showWarningDialog(STR_JUMP_F + (PlayVod.JumpTime / 1000 / 60 / 60) + STR_HR);
        }
    } else {
        PlayVod.JumpTime = 1000 * 0; //0sec
        PlayVod.showWarningDialog(STR_JUMP_CANCEL);
    }
};
