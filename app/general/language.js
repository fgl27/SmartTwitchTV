var STR_REFRESH = "Refresh (Guide(CH Press) or Info)";
var STR_SEARCHS = "Search";
var STR_SEARCH = STR_SEARCHS + " (D)";
var STR_CONTROL = "Controls";
var STR_CONTROLS = STR_CONTROL + " (C)";
var STR_ABOUT = "About (A)";
var STR_SEARCH_EMPTY = "The text you entered is empty.";
var STR_SWITCH = "Switch (CH Up/Down)";
var STR_SWITCH_VOD = "Switch Past Broadcast and Highlight (Guide(CH Press) or Info)";
var STR_SWITCH_CLIP = "Switch Period (day, week, month, all) (CH Up/Down)";
var STR_USER = "User ";
var STR_LIVE = "Live";
var STR_GAMES = "Games";
var STR_PLAYING = "Playing ";
var STR_FOR = " for ";
var STR_WATCHING = "Watching time ";
var STR_SINCE = "Since ";
var STR_AGO = " ago";
var STR_RESUME = "Resuming after be on background, please wait!";
var STR_AGAME = "A Game";
var STR_PLACEHOLDER_SEARCH = "Enter yours search...";
var STR_PLACEHOLDER_USER = "Enter user name...";
var STR_PLACEHOLDER_PRESS = "Press enter to ";
var STR_CHANNELS = "Channels";
var STR_CHANNEL = "Channel";
var STR_LIVE_STREAMS = "Live streams";
var STR_GOBACK = "Back to previously screen (Return)";
var STR_IS_OFFLINE = "The broadcast you were watching has ended";
var STR_REFRESH_PROBLEM = "Connection failed, unable to load content hit refresh to try again";
var STR_PLAYER_PROBLEM = "Connection failed, unable to load video content exiting...";
var STR_PAST_BROA = " Past Broadcast";
var STR_PAST_HIGHL = " Highlight";
var STR_CLIPS = " Clips";
var STR_CONTENT = " Content";
var STR_STREAM_ON = "Streamed on ";
var STR_DURATION = "Duration ";
var STR_VIEWS = " Views";
var STR_BUFFERING = "Buffering ";
var STR_QUALITY = "Quality";
var STR_VIEWER = " Viewers";
var STR_EXIT = "Click again to exit!";
var STR_LIVE_CHANNELS = " Live Channels";
var STR_LIVE_HOSTS = " Live Hosts";
var STR_LIVE_GAMES = " Live Games";
var STR_USER_CHANNEL = " Followed Channels";
var STR_USER_ADD = " Add User";
var STR_USER_REMOVE = " Remove User";
var STR_USER_ERROR = "User doesn\'t exist";
var STR_USER_HOSTING = " hosting ";
var STR_USER_SET = " already set";
var STR_USER_MAKE_ONE = "Make First";
var STR_USER_NUMBER_ONE = " (First user has it\'s content on SmartHub Preview)";
var STR_CLIP_DAY = " (day)";
var STR_CLIP_WEEK = " (week)";
var STR_CLIP_MONTH = " (month)";
var STR_CLIP_ALL = " (all)";
var STR_JUMP_TIME = "Jumping ";
var STR_JUMP_T0 = " to ";
var STR_JUMP_CANCEL = "Jump Canceled";
var STR_JUMP_TIME_BIG = " , jump time bigger then duration";
var STR_SEC = " Sec";
var STR_MIN = " Min";
var STR_HR = " Hr";
var STR_CLOSE_THIS = "Press return key to close this.";
var STR_BR = "<br>"; // not translatable
var STR_DOT = '<i class="fa fa-circle"style="font-size: 50%; vertical-align: middle; font-weight: bold;"></i>' + "  "; // not translatable

// the bellow can cause display problem if translated wrong please check the application after making changes if you are translating this!
var STR_CONTROLS_MAIN = '<div class="about_text_title">' + STR_CONTROL + ':</div>' + // not translatable
    "This are the none players related controls, the player can show it's own controls." + STR_BR +
    STR_BR +
    STR_DOT + "Play a video: Navigate using Directional pad (up/down/left/right), Select or Play/Pause keys to start playing" + STR_BR +
    STR_DOT + "Refresh screen content: Guide or info (Guide is channel press key on smart remote)" + STR_BR +
    STR_DOT + "Close the application: from Live screen press return (click it twice under 3 seconds)" + STR_BR +
    STR_DOT + "Force close the application (in case it freezes or miss behave): Hold return key until it force closes (Works for any application on Samsung TV\'s)" + STR_BR +
    STR_DOT + " Switch screen: Chanel Up (Move to right screen) or Chanel Down (Move to left screen)" + STR_BR +
    "Some screen will change its internal content (channel past broadcast or clips for example) instead of changing to another screen" + STR_BR +
    STR_DOT + "Go back to Live from any screen: color button green or B" + STR_BR +
    STR_DOT + "Start a search: color button blue or D" + STR_BR +
    "After setting up the search text press return or click on DONE and use the Directional pad (left/right) to chose the type of search then press Select or Play/Pause, Directional pad (up) goes back to edit the search text" + STR_BR +
    STR_DOT + "Controls list: color button yellow or C" + STR_BR +
    STR_DOT + "About this application: color button red or A" + STR_BR +
    STR_BR + STR_CLOSE_THIS;

var STR_ABOUT_INFO = '<div class="about_text_title">Twitch.TV:</div>' + // not translatable
    "Version 4.0.0" + STR_BR +
    "This is a unofficial Twitch.Tv application develop by individuals on they free time, for TV\'s that don't have access to a official application, released for free to any one that wanna to use it" + STR_BR +
    STR_BR +
    '<div class="about_text_title">' + // not translatable
    "Developer information:" +
    '</div>' + // not translatable
    "fglfgl27@gmail.com" + STR_BR + // not translatable
    STR_BR +
    "This is an open source applicationlication check it on my github" + STR_BR +
    "github.com/bhb27/smarttv-twitch" + STR_BR +
    STR_BR +
    '<div class="about_text_title" style="text-align: left;">' + // not translatable
    "This application is licensed under the GNU General Public License v3.0, and uses following dependencies:" +
    '</div>' + // not translatable
    '<div style="text-align: left;">' + // not translatable
    STR_DOT + "imagesLoaded - JavaScript is all like \"You images done yet or what?\" by desandro (https://github.com/desandro/imagesloaded)" + STR_BR +
    STR_DOT + "Font Awesome - The iconic font and CSS toolkit by FortAwesome (https://github.com/FortAwesome/Font-Awesome)" + STR_BR +
    STR_DOT + "Video.js - HTML5 Video Player (https://github.com/videojs/video.js)" + STR_BR +
    STR_DOT + "jQuery - fast, small, and feature-rich JavaScript library (https://code.jquery.com/jquery/)" + STR_BR +
    STR_DOT + "Samsung WebApi API - this module defines the functionalities that are provides as the Samsung TV for Tizen Platform Product API (http://developer.samsung.com/tv/develop/api-references/samsung-product-api-references/webapi-api)" + STR_BR +
    STR_BR + STR_CLOSE_THIS +
    '</div>'; // not translatable

var STR_PLAYER = "Player Related:";
var STR_CHAT = "Chat Related:";
var STR_GENERAL = "General Related:";
var STR_CONTROLS_PLAY = '<div class="about_text_title">' + STR_CONTROL + ':</div>' + // not translatable
    STR_BR +

    '<div class="about_text_title">' + STR_GENERAL + '</div>' + // not translatable
    STR_DOT + "Show information panel: Select key if chat is showing or Directional pad (up/down/left/right) if not" + STR_BR +
    STR_DOT + "Close a video: press return (click it twice under 3 seconds, click tree times if information panel or controls is open)" + STR_BR +
    STR_DOT + "Controls list: color button yellow or C" +
    '</div>' + // not translatable

    '<div class="about_text_title">' + STR_PLAYER + '</div>' + // not translatable
    STR_DOT + "Play/Pause a video: Play or Pause keys" + STR_BR +
    STR_DOT + "Jump Forward/Backwards (not availably for live streams): Directional pad (right/left), multiple clicks add more time before jump" + STR_BR +
    STR_DOT + "Change video quality (not availably for clips): Open information panel, then use Directional pad (up/down) to choose the new quality after press Select key to confirm the change" + STR_BR +
    STR_DOT + "Force refresh a video (in case it freezes) (not availably for clips): press select key twice, it will change the video quality to the same you are current watching, by opening information panel (first click) after second click will start re-buffering, for clips close the clip and open it again" +
    '</div>' + // not translatable

    '<div class="about_text_title">' + STR_CHAT + '</div>' + // not translatable
    STR_DOT + "Show or hide the Chat (Only availably on live streams): Guide or info (Guide is channel press key on smart remote)" + STR_BR +
    STR_DOT + "Change Chat position (if chat it\'s showing): Chanel Up or Down" + STR_BR +
    STR_DOT + "Change Chat size (if chat it\'s showing and info panel is not): Directional pad (up/down)" + STR_BR +
    STR_DOT + "Change Chat background brightness (if chat it\'s showing): Directional pad (left/right)" +
    STR_DOT + "Force refresh the Chat (in case it freezes or doesn\'t load): Force refresh the video by pressing select key twice, it will change the video quality to the same you are current watching, by opening information panel (first click) after second click will start re-buffering and the chat will reload it self" + STR_BR +
    '</div>' + // not translatable
    STR_BR + STR_BR + STR_CLOSE_THIS;


