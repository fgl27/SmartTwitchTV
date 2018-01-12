/*jshint multistr: true */
function PlayVod() {

}
//Variable initialization
PlayVod.PanelHideID = '';
PlayVod.quality = 'source';
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
PlayVod.qualityIndex = 0;

PlayVod.created = '';

PlayVod.loadingDataTry = 0;
PlayVod.loadingDataTryMax = 10;
PlayVod.offsettime = 0;
PlayVod.random_int = Math.round(Math.random() * 1e7);

PlayVod.qualityName = [];
PlayVod.qualityLinks = [];
PlayVod.qualityCount = 0;

PlayVod.PlayerTime = 0;
PlayVod.streamCheck = null;
PlayVod.PlayerCheckCount = 0;
PlayVod.RestoreFromResume = false;
PlayVod.PlayerCheckOffset = 0;
PlayVod.PlayerCheckQualityChanged = false;
PlayVod.Canjump = false;
PlayVod.Playing = false;

//Variable initialization end

PlayVod.Start = function() {
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    Play.showBufferDialog();
    $("#scene2_quality").show();
    $('#clip_label_quality').html(STR_QUALITY);
    $("#stream_info_icon").attr("src", Main.selectedChannelChannelLogo);
    $('#stream_info_name').text(Main.selectedChannelDisplayname);
    $("#stream_info_title").text(Svod.title);
    $("#stream_info_game").text(Svod.views);
    $("#stream_live").text(Svod.createdAt);
    $("#stream_info_livetime").text(Svod.Duration);
    document.getElementById("stream_info_currentime").innerHTML = STR_WATCHING + Play.timeS(0);

    PlayVod.tokenResponse = 0;
    PlayVod.playlistResponse = 0;
    PlayVod.playingTry = 0;
    PlayVod.state = PlayVod.STATE_LOADING_TOKEN;
    document.addEventListener('visibilitychange', PlayVod.Resume, false);
    PlayVod.streamCheck = window.setInterval(PlayVod.PlayerCheck, 500);
    PlayVod.Canjump = false;
    PlayVod.Playing = false;
    PlayVod.loadData();
};

PlayVod.Resume = function() {
    if (document.hidden) {
        Play.videojs.pause();
        window.clearInterval(PlayVod.streamCheck);
    } else {
        $("#scene2").show();
        $("#scene1").hide();
        window.setTimeout(function() {
            Play.videojs.play();
            PlayVod.streamCheck = window.setInterval(PlayVod.PlayerCheck, 500);
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
        PlayVod.loadingDataTimeout += (PlayVod.loadingDataTry < 5) ? 250 : 3500;
        PlayVod.loadDataRequest();
    } else {
        Play.showWarningDialog(STR_IS_OFFLINE);
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
        Play.showWarningDialog(STR_IS_OFFLINE);
        window.setTimeout(PlayVod.shutdownStream, 1500);
    }
};

PlayVod.loadDataSuccess = function(responseText) {
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
    var result = [],
        TempId = '',
        TempId2 = '',
        tempCount = 1;
    var streams = Play.extractStreamDeclarations(input);

    for (var i = 0; i < streams.length; i++) {
        TempId = Play.extractQualityFromStream(streams[i]);
        if (result.length === 0) {
            result.push({
                'id': TempId + ' (source)',
                'url': streams[i].split("\n")[2]
            });
        } else if (result[i - tempCount].id !== TempId){
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
    PlayVod.qualities = result;
    PlayVod.state = Play.STATE_PLAYING;
    PlayVod.qualityChanged();
    PlayVod.saveQualities();
};

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
    Play.showBufferDialog();
    Play.videojs.src({
        type: "video/mp4",
        src: PlayVod.playingUrl
    });

    Play.HideWarningDialog();
    PlayVod.hidePanel();

    if (!PlayVod.Playing) {
        Play.videojs.ready(function() {
            this.isFullscreen(true);
            this.requestFullscreen();
            this.autoplay(true);

            this.on('ended', function() {
                Play.showWarningDialog(STR_IS_OFFLINE);
                window.setTimeout(PlayVod.shutdownStream, 1500);
            });

            this.on('timeupdate', function() {
                PlayVod.updateCurrentTime(this.currentTime());
            });

            this.on('error', function() {
                Play.showWarningDialog(STR_PLAYER_PROBLEM);
                window.setTimeout(PlayVod.shutdownStream, 1500);
            });

            this.on('playing', function() { // reset position after quality change
                if (PlayVod.offsettime > 0) {
                    this.currentTime(PlayVod.offsettime);
                    PlayVod.offsettime = 0;
                }
            });

        });
        PlayVod.Playing = true;
    }
};

PlayVod.PlayerCheck = function() {
    if (PlayVod.PlayerTime == Play.videojs.currentTime() && !Play.videojs.paused()) {
        PlayVod.PlayerCheckCount++;
        Play.showBufferDialog();
        if (PlayVod.PlayerCheckQualityChanged && !PlayVod.RestoreFromResume) PlayVod.PlayerCheckOffset = -30;
        if (PlayVod.PlayerCheckCount > (60 + PlayVod.PlayerCheckOffset)) { //staled for 30 sec drop one quality
            PlayVod.PlayerCheckCount = 0;
            if (PlayVod.qualityIndex < PlayVod.getQualitiesCount() - 1) {
                PlayVod.qualityIndex++;
                PlayVod.qualityDisplay();
                PlayVod.offsettime = Play.videojs.currentTime();
                PlayVod.qualityChanged();
                PlayVod.PlayerCheckQualityChanged = true; // half time on next check
            } else { //staled too long drop the player
                Play.showWarningDialog(STR_PLAYER_PROBLEM);
                window.setTimeout(PlayVod.shutdownStream, 1500);
            }
        }
    }
    if (!Play.videojs.paused()) Play.videojs.play();
    PlayVod.PlayerTime = Play.videojs.currentTime();
};

PlayVod.offPlayer = function() {
    Play.videojs.off('ended', null);
    Play.videojs.off('timeupdate', null);
    Play.videojs.off('error', null);
    Play.videojs.off('playing', null);
};

PlayVod.updateCurrentTime = function(currentTime) {
    if (Play.WarningDialogVisible()) Play.HideWarningDialog();
    if (Play.BufferDialogVisible()) Play.HideBufferDialog();
    PlayVod.PlayerCheckCount = 0;
    PlayVod.PlayerCheckOffset = 0;
    PlayVod.RestoreFromResume = false;
    PlayVod.PlayerCheckQualityChanged = false;
    PlayVod.Canjump = true;

    document.getElementById("stream_info_currentime").innerHTML = STR_WATCHING + Play.timeS(currentTime);
};

PlayVod.shutdownStream = function() {
    Play.videojs.pause();
    Play.videojs.autoplay(false);
    Play.videojs.src('app/images/temp.mp4');
    PlayVod.offPlayer();
    document.body.removeEventListener("keydown", PlayVod.handleKeyDown);
    document.removeEventListener('visibilitychange', PlayVod.Resume);
    Play.clearPause();
    Play.HideWarningDialog();
    $("#scene1").show();
    $("#scene2").hide();
    Main.ReStartScreens();
    PlayVod.offsettime = 0;
    window.clearInterval(PlayVod.streamInfoTimer);
    window.clearInterval(PlayVod.streamCheck);
};

PlayVod.hidePanel = function() {
    PlayVod.clearHidePanel();
    $("#scene_channel_panel").hide();
    PlayVod.quality = PlayVod.qualityPlaying;
};

PlayVod.showPanel = function() {
    PlayVod.qualityIndexReset();
    Play.clock();
    PlayVod.qualityDisplay();
    $("#scene_channel_panel").show();
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
        $('#quality_arrow_up').css({
            'opacity': 0.2
        });
        $('#quality_arrow_down').css({
            'opacity': 1.0
        });
    } else if (PlayVod.qualityIndex == PlayVod.getQualitiesCount() - 1) {
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

    PlayVod.quality = PlayVod.qualities[PlayVod.qualityIndex].id;
    $('#quality_name').text(PlayVod.quality);
};

PlayVod.getQualitiesCount = function() {
    return PlayVod.qualities.length;
};

PlayVod.handleKeyDown = function(e) {
    if (PlayVod.state != PlayVod.STATE_PLAYING) {
        switch (e.keyCode) {
            case TvKeyCode.KEY_RETURN:
                if (Play.ExitDialogVisible()) {
                    window.clearTimeout(Play.exitID);
                    $("#play_dialog_exit").hide();
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
            case TvKeyCode.KEY_CHANNELUP:
            case TvKeyCode.KEY_CHANNELDOWN:
                break;
            case TvKeyCode.KEY_LEFT:
                if (PlayVod.Canjump) //TODO prevent consecutive jump as it can breack the app time counter
                    Play.videojs.currentTime(Play.videojs.currentTime() - 600);
                break;
            case TvKeyCode.KEY_RIGHT:
                if (PlayVod.Canjump)
                    Play.videojs.currentTime(Play.videojs.currentTime() + 600);
                break;
            case TvKeyCode.KEY_UP:
                if (Play.isPanelShown()) {
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
                if (Play.isPanelShown()) {
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
                if (Play.isPanelShown()) {
                    PlayVod.offsettime = Play.videojs.currentTime();
                    PlayVod.qualityChanged();
                    Play.clearPause();
                } else {
                    PlayVod.showPanel();
                }
                break;
            case TvKeyCode.KEY_RETURN:
                if (Play.isPanelShown()) {
                    PlayVod.hidePanel();
                } else {
                    if (Play.ExitDialogVisible()) {
                        window.clearTimeout(Play.exitID);
                        $("#play_dialog_exit").hide();
                        window.setTimeout(PlayVod.shutdownStream, 10);
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
                    PlayVod.Play = false;
                    Play.videojs.pause();
                    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
                    Play.showPauseDialog();
                    if (!Play.isPanelShown()) {
                        PlayVod.showPanel();
                    }
                } else {
                    PlayVod.Play = true;
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
