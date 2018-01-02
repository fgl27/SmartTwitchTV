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
PlayVod.offsettime = 0;
PlayVod.random_int = Math.round(Math.random() * 1e7);

PlayVod.qualityName = [];
PlayVod.qualityLinks = [];
PlayVod.qualityCount = 0;

//Variable initialization end

PlayVod.Start = function() {
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    $("#scene3_quality").show();
    $('#clip_label_quality').html(STR_QUALITY);
    $("#stream_clip_info_icon").attr("src", Main.selectedChannelChannelLogo);
    $('#stream_clip_info_name').text(Main.selectedChannel);
    $("#stream_clip_info_title").text(Svod.title);
    $("#stream_clip_info_game").text(Svod.createdAt);
    $("#stream_clip_live").text(Svod.views);
    $("#stream_clip_info_livetime").text(Svod.Duration);

    PlayVod.tokenResponse = 0;
    PlayVod.playlistResponse = 0;
    PlayVod.playingTry = 0;
    PlayVod.state = PlayVod.STATE_LOADING_TOKEN;
    document.addEventListener('visibilitychange', PlayVod.Resume, false);
    PlayVod.loadData();
};

PlayVod.Resume = function() {
    if (document.hidden) {
        PlayClip.videojs.pause();
    } else {
        $("#scene3").show();
        $("#scene1").hide();
        window.setTimeout(function() {
            PlayClip.videojs.play();
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
        var xmlHttp = new XMLHttpRequest();

        var theUrl;
        if (PlayVod.state == PlayVod.STATE_LOADING_TOKEN) {
            theUrl = 'https://api.twitch.tv/api/vods/' + Svod.vodId + '/access_token';
        } else {
            theUrl = 'http://usher.twitch.tv/vod/' + Svod.vodId +
                '.m3u8?player=twitchweb&&type=any&nauthsig=' + PlayVod.tokenResponse.sig + '&nauth=' +
                escape(PlayVod.tokenResponse.token) + '&allow_source=true&allow_audi_only=true&p=' + PlayVod.random_int;
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
                    if ((xmlHttp.responseText).indexOf('Bad auth token') !== -1) {
                        PlayVod.restore();
                    } else PlayVod.loadDataError();
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
                    PlayVod.loadingDataTimeout = 150000;
                    break;
            }
        }
        PlayVod.loadDataRequest();
    } else {
        PlayVod.showWarningDialog(STR_IS_OFFLINE + ' loadDataError');
        window.setTimeout(PlayVod.shutdownStream, 1500);
    }
};

PlayVod.saveQualities = function() {
    PlayVod.qualityName[PlayVod.qualityCount] = Svod.vodId;
    PlayVod.qualityLinks[PlayVod.qualityCount] = PlayVod.qualities;
    PlayVod.qualityCount++;
};

PlayVod.restore = function() {
    for (var i = 0; i < PlayVod.qualityName.length; i++) {
        if (PlayVod.qualityName[i] == Main.selectedChannel) {
            PlayVod.qualities = PlayVod.qualityLinks[i];
            PlayVod.qualitiesFound = true;
        }
    }

    if (PlayVod.qualitiesFound) {
        PlayVod.state = PlayVod.STATE_PLAYING;
        PlayVod.qualityChanged();
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
    PlayVod.saveQualities();
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
    PlayClip.videojs.src({
        type: "video/mp4",
        src: PlayVod.playingUrl
    });

    PlayVod.HideWarningDialog();
    PlayVod.hidePanel();
    PlayClip.videojs.ready(function() {
        this.isFullscreen(true);
        this.requestFullscreen();
        this.autoplay(true);

        this.on('ended', function() {
            PlayVod.shutdownStream();
        });

        this.on('timeupdate', function() {
            PlayVod.updateCurrentTime(this.currentTime());
        });

        this.on('error', function() {
            PlayVod.WarnShutdownStream();
        });

        this.on('playing', function() {
            console.log("playing");
            if (PlayVod.offsettime > 0) {
                this.currentTime(PlayVod.offsettime);
                PlayVod.offsettime = 0;
            }
        });

    });
};

PlayVod.offPlayer = function() {
    PlayClip.videojs.off('ended', null);
    PlayClip.videojs.off('timeupdate', null);
    PlayClip.videojs.off('error', null);
    PlayClip.videojs.off('playing', null);
};

PlayVod.WarnShutdownStream = function() {
    PlayVod.showWarningDialog(STR_IS_OFFLINE);
    window.setTimeout(PlayVod.shutdownStream, 1500);
};

PlayVod.updateCurrentTime = function(currentTime) {
    document.getElementById("stream_clip_info_currentime").innerHTML = STR_WATCHING + PlayClip.timeS(currentTime);
    if (PlayVod.WarningDialogVisible()) PlayVod.HideWarningDialog();
};

PlayVod.clock = function(currentTime) {
    var today = (new Date()).toString().split(' ');
    var time = today[4].toString().split(':');
    document.getElementById("stream_clip_system_time").innerHTML = today[2].toString() + '/' + today[1].toString() + ' ' + time[0] + ':' + time[1];
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
    PlayClip.videojs.pause();
    PlayClip.videojs.autoplay(false);
    PlayClip.videojs.src('app/images/temp.mp4');
    PlayVod.offPlayer();
    document.body.removeEventListener("keydown", PlayVod.handleKeyDown);
    document.removeEventListener('visibilitychange', PlayVod.Resume);
    PlayVod.clearPause();
    PlayVod.HideWarningDialog();
    $("#scene1").show();
    $("#scene2").hide();
    Main.ReStartScreens();
    PlayVod.offsettime = 0;
    window.clearInterval(PlayVod.streamInfoTimer);
};


PlayVod.showWarningDialog = function(text) {
    $("#dialog_warning_play_clip_text").text(text);
    $("#play_clip_dialog_warning_play").show();
};

PlayVod.HideWarningDialog = function() {
    $("#dialog_warning_play_clip_text").text('');
    $("#play_clip_dialog_warning_play").hide();
};

PlayVod.WarningDialogVisible = function() {
    return $("#play_clip_dialog_warning_play").is(":visible");
};

PlayVod.showExitDialog = function() {
    if (!PlayVod.ExitDialogVisible()) {
        $("#play_clip_dialog_exit").show();
        PlayVod.exitID = window.setTimeout(PlayVod.showExitDialog, 3000);
    } else {
        $("#play_clip_dialog_exit").hide();
    }
};

PlayVod.ExitDialogVisible = function() {
    return $("#play_clip_dialog_exit").is(":visible");
};

PlayVod.clearPause = function() {
    window.clearTimeout(PlayVod.pauseEndID);
    window.clearTimeout(PlayVod.pauseStartID);
    if (PlayVod.isShowPauseDialogOn()) {
        $("#play_clip_dialog_simple_pause").hide();
    }
    if (PlayVod.isPanelShown()) {
        PlayVod.hidePanel();
    }
};

PlayVod.showPauseDialog = function() {
    if (!PlayVod.isShowPauseDialogOn()) {
        $("#play_clip_dialog_simple_pause").show();
        PlayVod.pauseEndID = window.setTimeout(PlayVod.showPauseDialog, 1500);
    } else {
        $("#play_clip_dialog_simple_pause").hide();
        PlayVod.pauseStartID = window.setTimeout(PlayVod.showPauseDialog, 8000); // time in ms
    }
};

PlayVod.isShowPauseDialogOn = function() {
    return $("#play_clip_dialog_simple_pause").is(":visible");
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
                PlayClip.videojs.currentTime(PlayClip.videojs.currentTime() - 600);
                break;
            case TvKeyCode.KEY_RIGHT:
                PlayClip.videojs.currentTime(PlayClip.videojs.currentTime() + 600);
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
                    PlayVod.offsettime = PlayClip.videojs.currentTime();
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
                        $("#play_dialog_exit").hide();
                        window.setTimeout(PlayVod.shutdownStream, 10);
                    } else if (PlayVod.WarningDialogVisible()) {
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
                if (!PlayClip.videojs.paused()) {
                    PlayVod.Play = false;
                    PlayClip.videojs.pause();
                    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
                    PlayVod.showPauseDialog();
                    if (!PlayVod.isPanelShown()) {
                        PlayVod.showPanel();
                    }
                } else {
                    PlayVod.Play = true;
                    PlayVod.clearPause();
                    PlayClip.videojs.play();
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
