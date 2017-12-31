/*jshint multistr: true */
function PlayClip() {}

PlayClip.videoElement = '';
Sclip.playUrl = '';
PlayClip.Play = false;
//Variable initialization


//Variable initialization end

PlayClip.Start = function() {
    PlayClip.Play = false;
    console.log("PlayClip.Start " + Sclip.playUrl);
    PlayClip.videoElement = document.getElementById('video_clip');
    PlayClip.videoElement.src = Sclip.playUrl;
    PlayClip.Events();
    PlayClip.videoElement.load();
};

PlayClip.Events = function() {

    PlayClip.videoElement.addEventListener('waiting', function() {
        console.log('waiting');
    });

    PlayClip.videoElement.addEventListener('progress', function() {
        console.log('progress ' + Math.round(PlayClip.videoElement.buffered.end(0) / Sclip.Duration * 100));
    });

    PlayClip.videoElement.addEventListener('playing', function() {
        console.log('playing');
    });

    PlayClip.videoElement.addEventListener('canplaythrough', function() {
        console.log('canplaythrough');
        PlayClip.Play = true;
    });

    PlayClip.videoElement.addEventListener('canplay', function() {
        console.log('canplay');
    });

    PlayClip.videoElement.addEventListener('ended', function() {
        PlayClip.Exit();
    });

};

PlayClip.Exit = function() {
    PlayClip.videoElement.src = '';
    PlayClip.videoElement.load();
    document.body.removeEventListener("keydown", PlayClip.handleKeyDown);
    $("#scene1").show();
    $("#scene3").hide();
    Main.ReStartScreens();
};

PlayClip.handleKeyDown = function(e) {
    switch (e.keyCode) {
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
        case TvKeyCode.KEY_CHANNELUP:
        case TvKeyCode.KEY_CHANNELDOWN:
        case TvKeyCode.KEY_LEFT:
        case TvKeyCode.KEY_RIGHT:
        case TvKeyCode.KEY_UP:
        case TvKeyCode.KEY_DOWN:
        case TvKeyCode.KEY_ENTER:
            break;
        case TvKeyCode.KEY_RETURN:
            PlayClip.Exit();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
            if (PlayClip.Play) {
                PlayClip.Play = false;
                PlayClip.videoElement.pause();
                webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
            } else {
                PlayClip.Play = true;
                PlayClip.videoElement.play();
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
};
