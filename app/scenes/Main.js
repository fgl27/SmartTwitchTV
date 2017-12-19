/*jshint multistr: true */
function Main() {

}

//Variable initialization
tizen.tvinputdevice.registerKey("ChannelUp");
tizen.tvinputdevice.registerKey("ChannelDown");
tizen.tvinputdevice.registerKey("MediaPlayPause");
tizen.tvinputdevice.registerKey("MediaPlay");
tizen.tvinputdevice.registerKey("MediaPause");
tizen.tvinputdevice.registerKey("ColorF0Red");
tizen.tvinputdevice.registerKey("ColorF1Green");
tizen.tvinputdevice.registerKey("ColorF2Yellow");
tizen.tvinputdevice.registerKey("ColorF3Blue");
tizen.tvinputdevice.registerKey("Guide");
tizen.tvinputdevice.registerKey("Info");
//Variable initialization end


document.addEventListener("DOMContentLoaded", function() {
    // this function will be called only once
    Main.initLanguage();
    Main.initWindows();
    document.body.addEventListener("keydown", Main.handleKeyDown, false);
//    SceneSceneChannel.prototype.initialize();
});

Main.initLanguage = function() {
    //set top bar labels
    $(".label_icon_updown").html(STR_CH_UPDOWN);
};

Main.initWindows = function() {
    //hide all but Live
    $("#scene2").hide();
};

Main.handleKeyDown = function(event) {

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            break;
        case TvKeyCode.KEY_LEFT:
            break;
        case TvKeyCode.KEY_RIGHT:
            break;
        case TvKeyCode.KEY_UP:
            break;
        case TvKeyCode.KEY_DOWN:
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            console.log("KEY_CHANNELGUIDE");
            break;
        case TvKeyCode.KEY_CHANNELUP:
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            break;
        case TvKeyCode.KEY_RED:
            break;
        case TvKeyCode.KEY_GREEN:
            break;
        case TvKeyCode.KEY_YELLOW:
            break;
        case TvKeyCode.KEY_BLUE:
            break;
        case TvKeyCode.KEY_VOLUMEUP:
        case TvKeyCode.KEY_VOLUMEDOWN:
        case TvKeyCode.KEY_MUTE:
        default:
            break;
    }
};
