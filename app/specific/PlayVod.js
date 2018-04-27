//Variable initialization
var PlayVod_PanelHideID = '';
var PlayVod_quality = 'source';
var PlayVod_qualityPlaying = PlayVod_quality;

var PlayVod_STATE_LOADING_TOKEN = 0;
var PlayVod_STATE_LOADING_PLAYLIST = 1;
var PlayVod_STATE_PLAYING = 2;
var PlayVod_state = PlayVod_STATE_LOADING_TOKEN;

var PlayVod_streamInfoTimer = '';
var PlayVod_tokenResponse = 0;
var PlayVod_playlistResponse = 0;
var PlayVod_playingTry = 0;

var PlayVod_playingUrl = '';
var PlayVod_qualities = [];
var PlayVod_qualityIndex = 0;

var PlayVod_loadingDataTry = 0;
var PlayVod_loadingDataTryMax = 10;
var PlayVod_isOn = false;
var PlayVod_offsettime = 0;

var PlayVod_qualityName = [];
var PlayVod_qualityLinks = [];
var PlayVod_qualityCount = 0;

var PlayVod_PlayerTime = 0;
var PlayVod_streamCheck = null;
var PlayVod_PlayerCheckCount = 0;
var PlayVod_RestoreFromResume = false;
var PlayVod_PlayerCheckOffset = 0;
var PlayVod_PlayerCheckQualityChanged = false;
var PlayVod_Canjump = false;
var PlayVod_Playing = false;
var Play_jumping = false;
var PlayVod_JumpID = null;
var PlayVod_TimeToJump = 0;
var PlayVod_IsJumping = false;
var PlayVod_jumpCount = 0;
var PlayVod_jumpCountMin = -16;
var PlayVod_jumpCountMax = 16;
var PlayVod_loadingDataTimeout = 3500;
var PlayVod_qualitiesFound = false;
//Variable initialization end

function PlayVod_Start() {
    webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
    Play_showBufferDialog();
    Play_hideChat();
    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_selectedChannelLogo);
    document.getElementById("stream_info_name").innerHTML = Main_selectedChannelDisplayname;
    document.getElementById("stream_info_title").innerHTML = Svod_title;
    document.getElementById("stream_info_game").innerHTML = Svod_views + ', [' + (Svod_language).toUpperCase() + ']';
    document.getElementById("stream_live_icon").innerHTML = Svod_createdAt;
    document.getElementById("stream_live_time").innerHTML = Svod_Duration;
    document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play_timeS(0);
    if (Main_UserName !== '') {
        AddCode_userChannel = Main_selectedChannel_id;
        AddCode_PlayRequest = true;
        AddCode_CheckFallow();
        Play_showFallow();
    } else Play_hideFallow();
    document.getElementById('scene2_game').classList.remove('hide');

    PlayVod_qualitiesFound = false;
    Play_IsWarning = false;
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_tokenResponse = 0;
    PlayVod_playlistResponse = 0;
    PlayVod_playingTry = 0;
    PlayVod_jumpCountMin = -16;
    PlayVod_jumpCountMax = 16;
    PlayVod_state = PlayVod_STATE_LOADING_TOKEN;
    document.addEventListener('visibilitychange', PlayVod_Resume, false);
    PlayVod_streamCheck = window.setInterval(PlayVod_PlayerCheck, 500);
    PlayVod_Canjump = false;
    PlayVod_Playing = false;
    Play_jumping = false;
    PlayVod_isOn = true;
    PlayVod_loadData();
}

function PlayVod_Resume() {
    if (document.hidden) {
        Play_videojs.pause();
        PlayVod_offsettime = Play_videojs.currentTime();
        Play_ClearPlayer();
        window.clearInterval(PlayVod_streamCheck);
        Play_clearPause();
    } else {
        document.getElementById('scene2').classList.remove('hide');
        document.getElementById('scene1').classList.add('hide');
        Play_clearPause();
        Play_showBufferDialog();
        window.setTimeout(function() {
            PlayVod_Playing = false;
            PlayVod_onPlayer();
            PlayVod_PlayerCheckOffset = 80;
            PlayVod_RestoreFromResume = true;
            PlayVod_PlayerCheckQualityChanged = false;
            PlayVod_streamCheck = window.setInterval(PlayVod_PlayerCheck, 500);
        }, 500);
    }
}

function PlayVod_loadData() {
    PlayVod_loadingDataTry = 0;
    PlayVod_loadingDataTimeout = 3500;
    PlayVod_loadDataRequest();
}

function PlayVod_loadDataRequest() {
    try {
        var xmlHttp = new XMLHttpRequest();

        var theUrl;
        if (PlayVod_state === PlayVod_STATE_LOADING_TOKEN) {
            theUrl = 'https://api.twitch.tv/api/vods/' + Svod_vodId + '/access_token' + (AddCode_OauthToken !== 0 ? '?oauth_token=' + AddCode_OauthToken : '');
        } else {
            theUrl = 'http://usher.twitch.tv/vod/' + Svod_vodId +
                '.m3u8?player=twitchweb&&type=any&nauthsig=' + PlayVod_tokenResponse.sig + '&nauth=' +
                escape(PlayVod_tokenResponse.token) + '&allow_source=true&allow_audi_only=true&' + Math.round(Math.random() * 1e7);
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = PlayVod_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main_clientId);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        PlayVod_loadingDataTry = 0;
                        if (PlayVod_isOn) PlayVod_loadDataSuccess(xmlHttp.responseText);
                    } catch (err) {}

                } else {
                    if ((xmlHttp.responseText).indexOf('Bad auth token') !== -1) {
                        PlayVod_restore();
                    } else PlayVod_loadDataError();
                }
            }
        };
        xmlHttp.send(null);
    } catch (error) {
        PlayVod_loadDataError();
    }
}

function PlayVod_loadDataError() {
    if (PlayVod_isOn) {
        if (JSON.parse(PlayVod_tokenResponse.token).chansub.restricted_bitrates.length !== 0) {
            PlayVod_loadDataCheckSub();
            return;
        }

        PlayVod_loadingDataTry++;
        if (PlayVod_loadingDataTry < PlayVod_loadingDataTryMax) {
            PlayVod_loadingDataTimeout += (PlayVod_loadingDataTry < 5) ? 250 : 3500;
            PlayVod_loadDataRequest();
        } else {
            Play_HideBufferDialog();
            Play_showWarningDialog(STR_IS_OFFLINE);
            window.setTimeout(PlayVod_shutdownStream, 2000);
        }
    }
}

function PlayVod_saveQualities() {
    PlayVod_qualityName[PlayVod_qualityCount] = Svod_vodId;
    PlayVod_qualityLinks[PlayVod_qualityCount] = PlayVod_qualities;
    PlayVod_qualityCount++;
}

function PlayVod_restore() {
    for (var i = 0; i < PlayVod_qualityName.length; i++) {
        if (PlayVod_qualityName[i] === Main_selectedChannel) {
            PlayVod_qualities = PlayVod_qualityLinks[i];
            PlayVod_qualitiesFound = true;
        }
    }

    if (PlayVod_qualitiesFound) {
        PlayVod_state = PlayVod_STATE_PLAYING;
        if (PlayVod_isOn) PlayVod_qualityChanged();
    } else {
        Play_HideBufferDialog();
        Play_showWarningDialog(STR_IS_OFFLINE);
        window.setTimeout(PlayVod_shutdownStream, 1500);
    }
}

function PlayVod_loadDataSuccess(responseText) {
    if (PlayVod_state === PlayVod_STATE_LOADING_TOKEN) {
        PlayVod_tokenResponse = JSON.parse(responseText);
        PlayVod_state = PlayVod_STATE_LOADING_PLAYLIST;
        PlayVod_loadData();
    } else if (PlayVod_state === PlayVod_STATE_LOADING_PLAYLIST) {
        PlayVod_playlistResponse = responseText;
        PlayVod_qualities = Play_extractQualities(PlayVod_playlistResponse);
        PlayVod_state = Play_STATE_PLAYING;
        if (PlayVod_isOn) PlayVod_qualityChanged();
        PlayVod_saveQualities();
    }
}

function PlayVod_loadDataCheckSub() {
    if (AddCode_OauthToken !== '') AddCode_CheckSub();
    else {
        Play_HideBufferDialog();
        Play_showWarningDialog(STR_IS_SUB_ONLY + STR_IS_SUB_NOOAUTH);
        window.setTimeout(function() {
            if (PlayVod_isOn) PlayVod_shutdownStream();
        }, 4000);
    }
}

function PlayVod_NotSub() {
    Play_HideBufferDialog();
    Play_showWarningDialog(STR_IS_SUB_ONLY + STR_IS_SUB_NOT_SUB);
    window.setTimeout(function() {
        if (PlayVod_isOn) PlayVod_shutdownStream();
    }, 4000);
}

function PlayVod_isSub() {
    Play_HideBufferDialog();
    Play_showWarningDialog(STR_IS_SUB_ONLY + STR_IS_SUB_IS_SUB);
    window.setTimeout(function() {
        if (PlayVod_isOn) PlayVod_shutdownStream();
    }, 4000);
}

function PlayVod_qualityChanged() {
    PlayVod_qualityIndex = 0;
    PlayVod_playingUrl = PlayVod_qualities[0].url;
    if (PlayVod_quality.indexOf("source") !== -1) PlayVod_quality = "source";
    for (var i = 0; i < PlayVod_getQualitiesCount(); i++) {
        if (PlayVod_qualities[i].id === PlayVod_quality) {
            PlayVod_qualityIndex = i;
            PlayVod_playingUrl = PlayVod_qualities[i].url;
            break;
        } else if (PlayVod_qualities[i].id.indexOf(PlayVod_quality) !== -1) { //make shore to set a value before break out
            PlayVod_qualityIndex = i;
            PlayVod_playingUrl = PlayVod_qualities[i].url;
        }
    }

    PlayVod_qualityPlaying = PlayVod_quality;
    if (PlayVod_isOn) PlayVod_onPlayer();
}

function PlayVod_onPlayer() {
    Play_showBufferDialog();
    Play_videojs.src({
        type: "application/x-mpegURL",
        src: PlayVod_playingUrl
    });
    PlayVod_Canjump = false;
    Play_HideWarningDialog();
    PlayVod_hidePanel();

    if (!PlayVod_Playing) {
        Play_videojs.ready(function() {
            this.isFullscreen(true);
            this.requestFullscreen();
            this.autoplay(false);

            this.on('ended', function() {
                Play_HideBufferDialog();
                Play_showWarningDialog(STR_IS_OFFLINE);
                window.setTimeout(PlayVod_shutdownStream, 1500);
            });

            this.on('timeupdate', function() {
                PlayVod_updateCurrentTime(this.currentTime());
            });

            this.on('error', function() {
                Play_HideBufferDialog();
                Play_showWarningDialog(STR_PLAYER_PROBLEM);
                window.setTimeout(PlayVod_shutdownStream, 1500);
            });

            this.on('loadedmetadata', function() { // reset position after quality change or back from resume
                if (PlayVod_offsettime > 0 && PlayVod_offsettime !== this.currentTime()) {
                    Play_jumping = true;
                    this.currentTime(PlayVod_offsettime);
                    Play_showBufferDialog();
                    Play_clearPause();
                } else this.autoplay(true);
                PlayVod_Canjump = true;
            });

            this.on('playing', function() {
                if (PlayVod_offsettime > 0) PlayVod_offsettime = 0;
            });

            this.on('canplaythrough', function() {
                if (Play_jumping) {
                    Play_jumping = false;
                    this.play();
                }
            });

        });
        PlayVod_Playing = true;
    }
}

function PlayVod_PlayerCheck() {
    if (!Play_videojs.paused() && PlayVod_PlayerTime === Play_videojs.currentTime()) {
        PlayVod_PlayerCheckCount++;
        Play_showBufferDialog();
        if (PlayVod_PlayerCheckQualityChanged && !PlayVod_RestoreFromResume) PlayVod_PlayerCheckOffset = -10;
        if (PlayVod_PlayerCheckCount > (30 + PlayVod_PlayerCheckOffset)) { //staled for 15 sec drop one quality
            PlayVod_PlayerCheckCount = 0;
            if (PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1) {
                if (PlayVod_PlayerCheckQualityChanged) PlayVod_qualityIndex++; //Don't change first time only reload
                PlayVod_qualityDisplay();
                if (!PlayVod_offsettime) PlayVod_offsettime = Play_videojs.currentTime();
                PlayVod_qualityChanged();
                PlayVod_PlayerCheckQualityChanged = true; // -5s on next check
            } else { //staled too long close the player
                Play_HideBufferDialog();
                Play_showWarningDialog(STR_PLAYER_PROBLEM);
                window.setTimeout(PlayVod_shutdownStream, 1500);
            }
        }
    }
    if (!Play_videojs.paused()) Play_videojs.play();
    PlayVod_PlayerTime = Play_videojs.currentTime();
}

function PlayVod_updateCurrentTime(currentTime) {
    if (Play_WarningDialogVisible() && !PlayVod_IsJumping && !Play_IsWarning) Play_HideWarningDialog();
    if (Play_BufferDialogVisible() && !Play_jumping) Play_HideBufferDialog();
    if (Play_isShowPauseDialogOn() && !Play_videojs.paused()) Play_clearPause();
    PlayVod_PlayerCheckCount = 0;
    PlayVod_PlayerCheckOffset = 0;
    PlayVod_RestoreFromResume = false;
    PlayVod_PlayerCheckQualityChanged = false;
    PlayVod_Canjump = true;

    if (Play_isPanelShown()) document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play_timeS(currentTime);
}

function PlayVod_shutdownStream() {
    if (PlayVod_isOn) {
        PlayVod_PreshutdownStream();
        Play_exitMain();
    }
}

function PlayVod_PreshutdownStream() {
    Play_ClearPlayer();
    PlayVod_ClearVod();
    PlayVod_isOn = false;
}

function PlayVod_ClearVod() {
    PlayVod_Playing = false;
    document.body.removeEventListener("keydown", PlayVod_handleKeyDown);
    document.removeEventListener('visibilitychange', PlayVod_Resume);
    PlayVod_offsettime = 0;
    window.clearInterval(PlayVod_streamInfoTimer);
    window.clearInterval(PlayVod_streamCheck);
    PlayVod_PlayerCheckOffset = 0;
    PlayVod_RestoreFromResume = false;
    PlayVod_PlayerCheckQualityChanged = false;
    document.getElementById('scene2_game').classList.add('hide');
}

function PlayVod_hidePanel() {
    PlayVod_clearHidePanel();
    document.getElementById('scene_channel_panel').classList.add('hide');
    PlayVod_quality = PlayVod_qualityPlaying;
}

function PlayVod_showPanel() {
    Play_Panelcouner = 0;
    Play_IconsFocus();
    PlayVod_qualityIndexReset();
    Play_clock();
    document.getElementById("stream_watching_time").innerHTML = STR_WATCHING + Play_timeS(Play_videojs.currentTime());
    PlayVod_qualityDisplay();
    document.getElementById('scene_channel_panel').classList.remove('hide');
    PlayVod_setHidePanel();
}

function PlayVod_clearHidePanel() {
    window.clearTimeout(PlayVod_PanelHideID);
}

function PlayVod_setHidePanel() {
    PlayVod_PanelHideID = window.setTimeout(PlayVod_hidePanel, 5000); // time in ms
}

function PlayVod_qualityIndexReset() {
    PlayVod_qualityIndex = 0;
    for (var i = 0; i < PlayVod_getQualitiesCount(); i++) {
        if (PlayVod_qualities[i].id === PlayVod_quality) {
            PlayVod_qualityIndex = i;
            break;
        } else if (PlayVod_qualities[i].id.indexOf(PlayVod_quality) !== -1) { //make shore to set a value before break out
            PlayVod_qualityIndex = i;
        }
    }
}

function PlayVod_qualityDisplay() {
    if (!PlayVod_qualityIndex) {
        document.getElementById("quality_arrow_up").style.opacity = "0.2";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    } else if (PlayVod_qualityIndex === PlayVod_getQualitiesCount() - 1) {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "0.2";
    } else {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    }

    PlayVod_quality = PlayVod_qualities[PlayVod_qualityIndex].id;
    if (PlayVod_quality.indexOf('source') !== -1) document.getElementById("quality_name").innerHTML = PlayVod_quality.replace("source", STR_SOURCE);
    else document.getElementById("quality_name").innerHTML = PlayVod_quality;
}

function PlayVod_getQualitiesCount() {
    return PlayVod_qualities.length;
}

function PlayVod_jump() {
    if (!Play_videojs.paused()) Play_videojs.pause();
    Play_videojs.currentTime(PlayVod_TimeToJump);
    PlayVod_jumpCount = 0;
    PlayVod_jumpCountMin = -16;
    PlayVod_jumpCountMax = 16;
    PlayVod_IsJumping = false;
    PlayVod_Canjump = false;
    Play_videojs.play();
    Play_clearPause();
}

function PlayVod_jumpStart() {
    window.clearTimeout(PlayVod_JumpID);
    PlayVod_IsJumping = true;
    var time = '',
        jumpTotime = '';

    if (!PlayVod_jumpCount) {
        PlayVod_TimeToJump = 0;
        PlayVod_jumpCountMin = -16;
        PlayVod_jumpCountMax = 16;
        Play_showWarningDialog(STR_JUMP_CANCEL);
        PlayVod_JumpID = window.setTimeout(function() {
            PlayVod_IsJumping = false;
        }, 1500);
        return;
    } else if (PlayVod_jumpCount < 0) {
        if (PlayVod_jumpCount === -1) PlayVod_TimeToJump = -5;
        else if (PlayVod_jumpCount === -2) PlayVod_TimeToJump = -10;
        else if (PlayVod_jumpCount === -3) PlayVod_TimeToJump = -15;
        else if (PlayVod_jumpCount === -4) PlayVod_TimeToJump = -30;
        else if (PlayVod_jumpCount === -5) PlayVod_TimeToJump = -60;
        else if (PlayVod_jumpCount === -6) PlayVod_TimeToJump = -120;
        else if (PlayVod_jumpCount === -7) PlayVod_TimeToJump = -300;
        else if (PlayVod_jumpCount === -8) PlayVod_TimeToJump = -600;
        else if (PlayVod_jumpCount === -9) PlayVod_TimeToJump = -900;
        else if (PlayVod_jumpCount === -10) PlayVod_TimeToJump = -1800;
        else if (PlayVod_jumpCount === -11) PlayVod_TimeToJump = -3600;
        else if (PlayVod_jumpCount === -12) PlayVod_TimeToJump = -7200;
        else if (PlayVod_jumpCount === -13) PlayVod_TimeToJump = -10800;
        else if (PlayVod_jumpCount === -14) PlayVod_TimeToJump = -14400;
        else if (PlayVod_jumpCount === -15) PlayVod_TimeToJump = -18000;
        else PlayVod_TimeToJump = -36000;

        time = PlayVod_TimeToJump + STR_SEC;
        if (PlayVod_TimeToJump < -30) time = (PlayVod_TimeToJump / 60) + STR_MIN;
        if (PlayVod_TimeToJump < -1800) time = ((PlayVod_TimeToJump / 60) / 60) + STR_HR;

        jumpTotime = Play_videojs.currentTime() + PlayVod_TimeToJump;
        if (jumpTotime < 0) {
            PlayVod_jumpCountMin = PlayVod_jumpCount;
            jumpTotime = 0;
        }
        PlayVod_TimeToJump = jumpTotime;
        jumpTotime = Play_timeS(jumpTotime);
    } else {
        if (PlayVod_jumpCount === 1) PlayVod_TimeToJump = 5;
        else if (PlayVod_jumpCount === 2) PlayVod_TimeToJump = 10;
        else if (PlayVod_jumpCount === 3) PlayVod_TimeToJump = 15;
        else if (PlayVod_jumpCount === 4) PlayVod_TimeToJump = 30;
        else if (PlayVod_jumpCount === 5) PlayVod_TimeToJump = 60;
        else if (PlayVod_jumpCount === 6) PlayVod_TimeToJump = 120;
        else if (PlayVod_jumpCount === 7) PlayVod_TimeToJump = 300;
        else if (PlayVod_jumpCount === 8) PlayVod_TimeToJump = 600;
        else if (PlayVod_jumpCount === 9) PlayVod_TimeToJump = 900;
        else if (PlayVod_jumpCount === 10) PlayVod_TimeToJump = 1800;
        else if (PlayVod_jumpCount === 11) PlayVod_TimeToJump = 3600;
        else if (PlayVod_jumpCount === 12) PlayVod_TimeToJump = 7200;
        else if (PlayVod_jumpCount === 13) PlayVod_TimeToJump = 10800;
        else if (PlayVod_jumpCount === 14) PlayVod_TimeToJump = 14400;
        else if (PlayVod_jumpCount === 15) PlayVod_TimeToJump = 18000;
        else PlayVod_TimeToJump = 36000;

        time = PlayVod_TimeToJump + STR_SEC;
        if (PlayVod_TimeToJump > 30) time = (PlayVod_TimeToJump / 60) + STR_MIN;
        if (PlayVod_TimeToJump > 1800) time = ((PlayVod_TimeToJump / 60) / 60) + STR_HR;

        jumpTotime = Play_videojs.currentTime() + PlayVod_TimeToJump;
        if (jumpTotime > Svod_DurationSeconds) {
            PlayVod_TimeToJump = 0;
            PlayVod_jumpCountMax = PlayVod_jumpCount;
            Play_showWarningDialog(STR_JUMP_CANCEL + STR_JUMP_TIME_BIG);
            PlayVod_JumpID = window.setTimeout(function() {
                PlayVod_jumpCountMax = 16;
                PlayVod_jumpCount = 0;
                PlayVod_IsJumping = false;
            }, 1500);
            return;
        } else {
            PlayVod_TimeToJump = jumpTotime;
            jumpTotime = Play_timeS(jumpTotime);
        }

    }

    Play_showWarningDialog(STR_JUMP_TIME + time + STR_JUMP_T0 + jumpTotime);
    PlayVod_JumpID = window.setTimeout(PlayVod_jump, 1500);
}

function PlayVod_handleKeyDown(e) {
    if (PlayVod_state !== PlayVod_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_RETURN:
                if (Play_ExitDialogVisible()) {
                    window.clearTimeout(Play_exitID);
                    document.getElementById('play_dialog_exit').classList.add('hide');
                    window.setTimeout(PlayVod_shutdownStream, 10);
                } else {
                    Play_showExitDialog();
                }
                break;
            default:
                break;
        }
    } else {
        switch (e.keyCode) {
            case KEY_INFO:
            case KEY_CHANNELGUIDE:
                Play_hideChat();
                Play_ChatEnable = false;
                localStorage.setItem('ChatEnable', 'false');
                break;
            case KEY_LEFT:
                if (Play_isPanelShown()) {
                    Play_Panelcouner++;
                    if (Play_Panelcouner > 4) Play_Panelcouner = 0;
                    Play_IconsFocus();
                    PlayVod_clearHidePanel();
                    PlayVod_setHidePanel();
                } else if (PlayVod_Canjump) {
                    if (PlayVod_jumpCount > PlayVod_jumpCountMin) PlayVod_jumpCount--;
                    PlayVod_jumpStart();
                }
                break;
            case KEY_RIGHT:
                if (Play_isPanelShown()) {
                    Play_Panelcouner--;
                    if (Play_Panelcouner < 0) Play_Panelcouner = 4;
                    Play_IconsFocus();
                    PlayVod_clearHidePanel();
                    PlayVod_setHidePanel();
                } else if (PlayVod_Canjump) {
                    if (PlayVod_jumpCount < PlayVod_jumpCountMax) PlayVod_jumpCount++;
                    PlayVod_jumpStart();
                }
                break;
            case KEY_UP:
                if (Play_isPanelShown()) {
                    if (PlayVod_qualityIndex > 0 && (!Play_Panelcouner)) {
                        PlayVod_qualityIndex--;
                        PlayVod_qualityDisplay();
                    }
                    PlayVod_clearHidePanel();
                    PlayVod_setHidePanel();
                } else {
                    PlayVod_showPanel();
                }
                break;
            case KEY_DOWN:
                if (Play_isPanelShown()) {
                    if (PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1 && (!Play_Panelcouner)) {
                        PlayVod_qualityIndex++;
                        PlayVod_qualityDisplay();
                    }
                    PlayVod_clearHidePanel();
                    PlayVod_setHidePanel();
                } else {
                    PlayVod_showPanel();
                }
                break;
            case KEY_ENTER:
                if (Play_isPanelShown()) {
                    if (!Play_Panelcouner) {
                        if (!PlayVod_offsettime) PlayVod_offsettime = Play_videojs.currentTime();
                        PlayVod_qualityChanged();
                        Play_clearPause();
                    } else if (Play_Panelcouner === 1) {
                        Play_FallowUnfallow();
                        PlayVod_clearHidePanel();
                        PlayVod_setHidePanel();
                    } else if (Play_Panelcouner === 2) {
                        if (Main_Go !== Main_aGame) {
                            Main_BeforeAgame = Main_Go;
                            if (Main_Go !== Main_Svod && Main_Go !== Main_Sclip && Main_Go !== Main_SChannelContent) Main_BeforeAgame2 = Main_Go;
                            else Main_BeforeAgame2 = Main_BeforeChannel2;
                        }
                        Main_ExitCurrent(Main_Go);
                        Main_Go = Main_aGame;
                        AGame_UserGames = false;
                        Main_gameSelected = Svod_game;
                        window.clearTimeout(Play_exitID);
                        document.getElementById('play_dialog_exit').classList.add('hide');
                        window.setTimeout(PlayVod_shutdownStream, 10);
                    } else if (Play_Panelcouner === 3) {
                        if (Main_Go !== Main_Svod && Main_Go !== Main_Sclip && Main_Go !== Main_SChannelContent) {
                            Main_BeforeChannel = Main_Go;
                            if (Main_Go !== Main_aGame) Main_BeforeChannel2 = Main_Go;
                            else Main_BeforeChannel2 = Main_BeforeAgame2;
                        }
                        Main_ExitCurrent(Main_Go);
                        Main_Go = Main_SChannelContent;
                        window.clearTimeout(Play_exitID);
                        document.getElementById('play_dialog_exit').classList.add('hide');
                        window.setTimeout(PlayVod_shutdownStream, 10);
                    } else if (Play_Panelcouner === 3) {
                        if (!Search_isSearching) Main_BeforeSearch = Main_Go;
                        Main_ExitCurrent(Main_Go);
                        Main_Go = Main_Search;
                        window.clearTimeout(Play_exitID);
                        document.getElementById('play_dialog_exit').classList.add('hide');
                        window.setTimeout(PlayVod_shutdownStream, 10);
                    }
                } else {
                    PlayVod_showPanel();
                }
                break;
            case KEY_RETURN:
                Play_KeyReturn(true);
                break;
            case KEY_PLAY:
            case KEY_PAUSE:
            case KEY_PLAYPAUSE:
                Play_KeyPause();
                break;
            case KEY_YELLOW:
                Play_showControlsDialog();
                break;
            case KEY_BLUE:
                break;
            default:
                break;
        }
    }
}
