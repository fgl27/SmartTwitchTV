/* jshint undef: true, unused: true, node: true, browser: true */
/*globals Android, ReconnectingWebSocket, punycode */
/* exported Play_CheckResume */
// Keep this file named as (zero)*** so it loads first in release_maker
var STR_REFRESH;
var STR_SEARCH;
var STR_SETTINGS;
var STR_CONTROLS;
var STR_ABOUT;
var STR_HIDE;
var STR_SEARCH_EMPTY;
var STR_SEARCH_RESULT_EMPTY;
var STR_SWITCH;
var STR_SWITCH_USER;
var STR_SWITCH_VOD;
var STR_SWITCH_CLIP;
var STR_GO_TO;
var STR_USER;
var STR_LIVE;
var STR_GAMES;
var STR_PLAYING;
var STR_FOR;
var STR_WATCHING;
var STR_SINCE;
var STR_AGO;
var STR_AGAME;
var STR_PLACEHOLDER_SEARCH;
var STR_PLACEHOLDER_OAUTH;
var STR_PLACEHOLDER_USER;
var STR_PLACEHOLDER_PRESS;
var STR_CHANNELS;
var STR_CHANNEL;
var STR_GOBACK;
var STR_IS_OFFLINE;
var STR_IS_SUB_ONLY;
var STR_REFRESH_PROBLEM;
var STR_NO;
var STR_FOR_THIS;
var STR_PLAYER_PROBLEM;
var STR_PAST_BROA;
var STR_PAST_HIGHL;
var STR_CLIPS;
var STR_CONTENT;
var STR_STREAM_ON;
var STR_DURATION;
var STR_VIEWS;
var STR_VIEWER;
var STR_EXIT_AGAIN;
var STR_EXIT_MESSAGE;
var STR_EXIT;
var STR_CLOSE;
var STR_MINIMIZE;
var STR_CANCEL;
var STR_NOT_LIVE;
var STR_LIVE_CHANNELS;
var STR_LIVE_HOSTS;
var STR_LIVE_GAMES;
var STR_USER_CHANNEL;
var STR_USER_ADD;
var STR_USER_REMOVE;
var STR_USER_ERROR;
var STR_USER_HOSTING;
var STR_USER_SET;
var STR_USER_MAKE_ONE;
var STR_USER_NUMBER_ONE;
var STR_ADD_USER_SH;
var STR_CLIP_DAY;
var STR_CLIP_WEEK;
var STR_CLIP_MONTH;
var STR_CLIP_ALL;
var STR_JUMP_TIME;
var STR_JUMP_T0;
var STR_JUMP_CANCEL;
var STR_JUMP_TIME_BIG;
var STR_SEC;
var STR_MIN;
var STR_HR;
var STR_SOURCE;
var STR_VERSION;
var STR_TWITCH_TV;
var STR_CLOSE_THIS;
var STR_PLAYER;
var STR_CHAT;
var STR_GENERAL;
var STR_UPDATE;
var STR_CURRENT_VERSION;
var STR_LATEST_VERSION;
var STR_CONTROLS_MAIN_1;
var STR_CONTROLS_MAIN_2;
var STR_CONTROLS_MAIN_3;
var STR_CONTROLS_MAIN_4;
var STR_CONTROLS_MAIN_6;
var STR_CONTROLS_MAIN_7;
var STR_CONTROLS_MAIN_10;
var STR_CONTROLS_MAIN_11;
var STR_CONTROLS_MAIN_14;
var STR_ABOUT_INFO_1;
var STR_ABOUT_INFO_3;
var STR_ABOUT_INFO_4;
var STR_ABOUT_INFO_5;
var STR_ABOUT_INFO_6;
var STR_ABOUT_INFO_7;
var STR_ABOUT_INFO_8;
var STR_ABOUT_INFO_9;
var STR_ABOUT_INFO_10;
var STR_ABOUT_INFO_11;
var STR_ABOUT_INFO_12;
var STR_ABOUT_INFO_13;
var STR_ABOUT_INFO_14;
var STR_ABOUT_INFO_15;
var STR_ABOUT_INFO_16;
var STR_ABOUT_INFO_17;
var STR_CONTROLS_PLAY_1;
var STR_CONTROLS_PLAY_2;
var STR_CONTROLS_PLAY_3;
var STR_CONTROLS_PLAY_4;
var STR_CONTROLS_PLAY_5;
var STR_CONTROLS_PLAY_6;
var STR_CONTROLS_PLAY_7;
var STR_CONTROLS_PLAY_8;
var STR_CONTROLS_PLAY_9;
var STR_CONTROLS_PLAY_10;
var STR_CONTROLS_PLAY_11;
var STR_CONTROLS_PLAY_12;
var STR_CONTROLS_PLAY_14;
var STR_UPDATE_AVAILABLE;
var STR_OAUTH_IN;
var STR_OAUTH_EXPLAIN1;
var STR_OAUTH_EXPLAIN2;
var STR_OAUTH_EXPLAIN3;
var STR_OAUTH_EXPLAIN4;
var STR_OAUTH_EXPLAIN5;
var STR_OAUTH_EXPLAIN6;
var STR_USER_CODE;
var STR_USER_CODE_OK;
var STR_KEY_BAD;
var STR_KEY_OK;
var STR_OAUTH_WRONG;
var STR_OAUTH_WRONG2;
var STR_FALLOWING;
var STR_FALLOW;
var STR_IS_SUB_NOOAUTH;
var STR_IS_SUB_NOT_SUB;
var STR_IS_SUB_IS_SUB;
var STR_OAUTH_FAIL;
var STR_NOKEY;
var STR_NOKEY_WARN;
var STR_RESET;
var STR_CLIP;
var STR_CHANNEL_CONT;
var STR_NET_DOWN;
var STR_NET_UP;
var STR_FALLOWERS;
var STR_CANT_FALLOW;
var STR_GAME_CONT;
var STR_YES;
var STR_REMOVE_USER;
var STR_PLACEHOLDER_PRESS_UP;
var STR_FALLOW_GAMES;
var STR_USER_GAMES_CHANGE;
var STR_GUIDE;
var STR_MONTHS;
var STR_DAYS;
var STR_STARTED;
var STR_KEY_UP_DOWN;
var STR_VIDEOS;
var STR_VIDEO;
var STR_REPLAY;
var STR_STREAM_END;
var STR_STREAM_END_EXIT;
var STR_FEATURED;
var STR_CREATED_AT;
var STR_OPEN_BROADCAST;
var STR_NO_BROADCAST;
var STR_NO_BROADCAST_WARNING;
var STR_NO_CHAT;
var STR_IS_NOW;
var STR_OPEN_HOST;
var STR_SETTINGS_PLAYER;
var STR_SETTINGS_BUFFER_SIZE;
var STR_SETTINGS_BUFFER_SIZE_SUMMARY;
var STR_SETTINGS_BUFFER_LIVE;
var STR_SETTINGS_BUFFER_VOD;
var STR_SETTINGS_BUFFER_CLIP;
var STR_SETTINGS_GENERAL;
var STR_SETTINGS_LANG;
var STR_LOADING_CHAT;
var STR_VOD_HISTORY;
var STR_FROM;
var STR_FROM_START;
var STR_CHAT_END;
var STR_TIME;
var STR_VIWES;
var STR_NOKEY_VIDEO_WARN;
var STR_SWITCH_TYPE;
var STR_ENABLE;
var STR_DISABLE;
var STR_RESTORE_PLAYBACK;
var STR_RESTORE_PLAYBACK_SUMARRY;
var STR_CHAT_FONT;
var STR_CHAT_FONT_SUMARRY;
var STR_OAUTH_FAIL_USER;
var STR_VIDEOS_ANIMATION;
var STR_SIDE_PANEL;
var STR_SIZE;
var STR_BRIGHTNESS;
var STR_FORBIDDEN;
var STR_JUMPING_STEP;
var STR_SECONDS;
var STR_MINUTES;
var STR_RESTORE_PLAYBACK_WARN;
var STR_CLOCK_OFFSET;
var STR_APP_LANG;
var STR_CONTENT_LANG;
var STR_LANG_ALL;
var STR_NO_GAME;
var STR_ABOUT_INFO_2_SOURCE;
var STR_JUMP_BUFFER_WARNING;
var STR_CHAT_DISABLE;
var STR_CLIP_FAIL;
var STR_F_DISABLE_CHAT;
var STR_F_DISABLE_CHAT_SUMARRY;
var STR_CHAT_BRIGHTNESS;// Bellow here are the all untranslatable string,they are a combination of strings and html code use by pats of the code
var STR_ABOUT_EMAIL = "fglfgl27@gmail.com";
var STR_BR = "<br>";
var STR_DOT = '<i class="icon-circle" style="font-size: 50%; vertical-align: middle; font-weight: bold;"></i>' + "  ";
var STR_DIV_TITLE = '<div class="about_text_title">';
var STR_DIV_TITLE_LEFT = '<div class="about_text_title" style="text-align: left;">';
var STR_DIV_MIDLE_LEFT = '<div style="text-align: left;">';
var STR_CONTROL_KEY = '';
var STR_SEARCH_KEY = '';
var STR_ABOUT_KEY = '';
var STR_SETTINGS_KEY = '';
var STR_CONTROLS_MAIN_0 = '';
var STR_ABOUT_INFO_HEADER = '';
var STR_ABOUT_INFO_0 = '';
var STR_CONTROLS_PLAY_0 = '';
var STR_OAUTH_EXPLAIN = '';
var STR_SPACE = '&nbsp;';
var TWITCH_ICON = '<div style="vertical-align: middle; display: inline-block;"><i class="icon-twitch" style="color: #FFFFFF; font-size: 115%; "></i></div><div style="vertical-align: middle; display: inline-block">' + STR_SPACE;

// This function is called after the main language is loaded, the above are initialized empty so it doesn't cause loading exceptions
function DefaultLang() {
    STR_CONTROL_KEY = STR_CONTROLS + " (C)";
    STR_SEARCH_KEY = STR_SEARCH + " (D)";
    STR_SETTINGS_KEY = STR_SETTINGS + " (A)";
    STR_ABOUT_KEY = STR_ABOUT + " (A)";
    STR_SWITCH = STR_SWITCH + STR_KEY_UP_DOWN;
    STR_SWITCH_USER = STR_SWITCH_USER + STR_KEY_UP_DOWN;
    STR_CONTROLS_MAIN_3 = STR_CONTROLS_MAIN_3 + STR_GUIDE;

    STR_CONTROLS_PLAY_0 = STR_DIV_TITLE + STR_PLAYER + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_CONTROLS_PLAY_4 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_1 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_2 + STR_BR + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_CONTROLS_PLAY_3 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_5 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_6 + STR_BR + STR_BR +
        STR_DIV_TITLE + STR_CHAT + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_CONTROLS_PLAY_7 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_8 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_9 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_10 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_11;

    STR_CONTROLS_MAIN_0 = STR_DIV_TITLE + STR_CONTROLS + '</div>' +
        STR_DIV_TITLE + STR_GENERAL + '</div>' +
        STR_BR +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_CONTROLS_MAIN_2 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_3 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_4 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_6 + STR_BR +
        STR_CONTROLS_MAIN_7 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_10 + STR_BR +
        STR_SPACE + STR_SPACE + STR_SPACE + STR_CONTROLS_MAIN_11 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_14 + STR_BR + '</div>' + STR_BR +
        STR_CONTROLS_PLAY_0 + STR_BR + STR_BR +
        STR_DIV_TITLE + STR_CLOSE_THIS + '</div>';

    STR_ABOUT_INFO_HEADER = STR_DIV_TITLE + TWITCH_ICON + STR_TWITCH_TV + '</div></div>';
    STR_ABOUT_INFO_0 = STR_DIV_MIDLE_LEFT + STR_BR + STR_ABOUT_INFO_1 + STR_BR +
        (!Main_isBrowser ? '' : STR_BR + '<div style="display: inline-block; color: #FF0000; font-size: 110%; font-weight: bold;">' + STR_ABOUT_INFO_2_SOURCE + '</div>') + '</div>' +
        STR_BR +
        STR_DIV_TITLE + STR_ABOUT_INFO_3 + '</div>' +
        STR_ABOUT_EMAIL + STR_BR +
        STR_BR +
        STR_ABOUT_INFO_4 + STR_BR +
        STR_ABOUT_INFO_5 + STR_BR +
        STR_BR +
        STR_DIV_TITLE_LEFT + STR_ABOUT_INFO_6 + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_ABOUT_INFO_14 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_7 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_8 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_9 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_10 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_11 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_12 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_13 + STR_BR +
        STR_ABOUT_INFO_15 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_16 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_17 + STR_BR +
        STR_DIV_TITLE + STR_CLOSE_THIS + '</div></div>';

    STR_OAUTH_EXPLAIN = STR_OAUTH_EXPLAIN1 + STR_BR +
        STR_DOT + STR_OAUTH_EXPLAIN2.replace('link_link', '<div style="display: inline-block; color: #FF0000; font-size: 110%; font-weight: bold;">http://tiny.cc/twitchkeycode</div>') + STR_BR +
        STR_DOT + STR_OAUTH_EXPLAIN3 + STR_BR +
        STR_DOT + STR_OAUTH_EXPLAIN4 + STR_BR +
        STR_DOT + STR_OAUTH_EXPLAIN5 + STR_BR +
        STR_DOT + STR_OAUTH_EXPLAIN6;
}//Variable initialization
var AddUser_loadingDataTry = 0;
var AddUser_loadingDataTryMax = 5;
var AddUser_loadingDataTimeout = 3500;
var AddUser_UsernameArray = [];
var AddUser_Username = null;
var AddUser_loadingData = false;
var AddUser_keyBoardOn = false;
//Variable initialization end

function AddUser_init() {
    Main_values.Main_Go = Main_addUser;
    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_HideWarningDialog();
    Main_AddUserInput.placeholder = STR_PLACEHOLDER_USER;
    Main_ShowElement('add_user_scroll');
    AddUser_inputFocus();
}

function AddUser_exit() {
    AddUser_RemoveinputFocus(false);
    document.body.removeEventListener("keydown", AddUser_handleKeyDown);
    document.body.removeEventListener("keydown", AddUser_KeyboardEvent);
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_HideElement('add_user_scroll');
}

function AddUser_handleKeyDown(event) {
    if (AddUser_loadingData || AddUser_keyBoardOn || Main_values.Main_Go !== Main_addUser) return;
    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                if (AddUser_UsernameArray.length > 0 && Main_values.Main_Go !== Main_Users) Main_values.Main_Go = Main_values.Main_Before;
                else Main_values.Main_Go = Main_Live;
                AddUser_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            AddUser_inputFocus();
            break;
        default:
            break;
    }
}

function AddUser_inputFocus() {
    document.body.removeEventListener("keydown", AddUser_handleKeyDown);
    document.body.addEventListener("keydown", AddUser_KeyboardEvent, false);
    Main_AddUserInput.placeholder = STR_PLACEHOLDER_USER;

    Main_AddUserInput.focus();
    AddUser_keyBoardOn = true;
}

function AddUser_removeEventListener() {
    if (Main_AddUserInput !== null) {
        var elClone = Main_AddUserInput.cloneNode(true);
        Main_AddUserInput.parentNode.replaceChild(elClone, Main_AddUserInput);
        Main_AddUserInput = document.getElementById("user_input");
    }
}

function AddUser_RemoveinputFocus(EnaKeydown) {
    Main_AddUserInput.blur();
    AddUser_removeEventListener();
    document.body.removeEventListener("keydown", AddUser_KeyboardEvent);
    Main_AddUserInput.placeholder = STR_PLACEHOLDER_PRESS + STR_PLACEHOLDER_USER;

    if (EnaKeydown) document.body.addEventListener("keydown", AddUser_handleKeyDown, false);
    AddUser_keyBoardOn = false;
}

function AddUser_KeyboardEvent(event) {
    if (AddUser_loadingData || Main_values.Main_Go !== Main_addUser) return;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                if (AddUser_UsernameArray.length > 0 && Main_values.Main_Go !== Main_Users) Main_values.Main_Go = Main_values.Main_Before;
                else Main_values.Main_Go = Main_Live;
                AddUser_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_KEYBOARD_DELETE_ALL:
            Main_AddUserInput.value = '';
            break;
        case KEY_KEYBOARD_DONE:
        case KEY_DOWN:
            if (Main_AddUserInput.value !== '' && Main_AddUserInput.value !== null) {

                if (Main_isBrowser && !AddUser_UserIsSet()) AddUser_Username = 'testtwitch27';
                else AddUser_Username = Main_AddUserInput.value;

                if (!AddUser_UserCodeExist(AddUser_Username)) {
                    AddUser_loadingDataTry = 0;
                    AddUser_loadingDataTimeout = 3500;
                    AddUser_loadingData = true;
                    Main_HideElement('add_user_scroll');
                    Main_showLoadDialog();
                    AddUser_loadDataRequest();
                } else {
                    Main_HideLoadDialog();
                    Main_showWarningDialog(STR_USER + AddUser_Username + STR_USER_SET);
                    window.setTimeout(function() {
                        Main_HideWarningDialog();
                        AddUser_inputFocus();
                    }, 1500);
                }
            } else AddUser_inputFocus();
            break;
        case KEY_KEYBOARD_BACKSPACE:
            Main_AddUserInput.value = Main_AddUserInput.value.slice(0, -1);
            break;
        case KEY_KEYBOARD_SPACE:
            Main_AddUserInput.value += ' ';
            break;
        default:
            break;
    }
}

function AddUser_loadDataRequest() {
    var theUrl = 'https://api.twitch.tv/kraken/users?login=' + encodeURIComponent(AddUser_Username);

    BasehttpGet(theUrl, AddUser_loadingDataTimeout, 2, null, AddUser_loadDataRequestSuccess, AddUser_loadDataError);
}

function AddUser_loadDataRequestSuccess(response) {
    if (JSON.parse(response)._total) {
        Main_AddUserInput.value = '';
        document.body.removeEventListener("keydown", AddUser_handleKeyDown);
        AddUser_SaveNewUser(response);
    } else AddUser_loadDataNoUser();
}

function AddUser_loadDataError() {
    AddUser_loadingDataTry++;
    if (AddUser_loadingDataTry < AddUser_loadingDataTryMax) {
        AddUser_loadingDataTimeout += 500;
        AddUser_loadDataRequest();
    } else AddUser_loadDataNoUser();
}

function AddUser_loadDataNoUser() {
    AddUser_Username = null;
    Main_HideLoadDialog();
    Main_showWarningDialog(STR_USER_ERROR);
    window.setTimeout(function() {
        AddUser_init();
    }, 1000);
    AddUser_loadingData = false;
}

function AddUser_RestoreUsers() {
    AddUser_UsernameArray = Main_getItemJson('AddUser_UsernameArray', []);
    if (AddUser_UsernameArray.length > 0) {
        //Check and refresh all tokens at start
        for (var i = 0; i < AddUser_UsernameArray.length; i++)
            if (AddUser_UsernameArray[i].access_token) AddCode_CheckTokenStart(i);
    }
}

function AddUser_UserIsSet() {
    return AddUser_UsernameArray.length > 0;
}

function AddUser_SaveNewUser(responseText) {
    AddUser_Username = JSON.parse(responseText).users[0];
    AddUser_UsernameArray.push({
        'name': AddUser_Username.name,
        'id': AddUser_Username._id,
        'access_token': 0,
        'refresh_token': 0
    });

    AddUser_SaveUserArray();
    Users_status = false;
    AddUser_exit();
    Users_init();
    AddUser_loadingData = false;
}

function AddUser_removeUser(Position) {

    // remove the user
    var index = AddUser_UsernameArray.indexOf(AddUser_UsernameArray[Position]);
    if (index > -1) AddUser_UsernameArray.splice(index, 1);

    // restart users and smarthub
    if (AddUser_UsernameArray.length > 0) {
        Users_status = false;
        Users_init();
    } else AddUser_init();

    // reset localStorage usernames
    AddUser_SaveUserArray();
}

function AddUser_SaveUserArray() {
    Main_setItem('AddUser_UsernameArray', JSON.stringify(AddUser_UsernameArray));
}

function AddUser_UserMakeOne(Position) {
    AddUser_Username = AddUser_UsernameArray[0];
    AddUser_UsernameArray[0] = AddUser_UsernameArray[Position];
    AddUser_UsernameArray[Position] = AddUser_Username;
    Users_status = false;
    Users_init();
    AddUser_SaveUserArray();
}

function AddUser_UserCodeExist(user) {
    return AddUser_UsernameArray.indexOf(user) !== -1;
}

function AddUser_IsUserSet() {
    return AddUser_UsernameArray.length > 0;
}function en_USLang() {
    // This is a false/true var change if in yours language day comes first eg (27/12/2010) day 27 month 12 year 2010
    Main_IsDayFirst = false;

    // this is the size of side pannel a ajust may be needed here so it can fit all words in the horizontal axis
    document.getElementById("side_panel").style.width = "17%";

    //Bellow are variable to translate
    STR_REFRESH = "Refresh:";
    STR_SEARCH = "Search";
    STR_SETTINGS = "Settings";
    STR_CONTROLS = "Controls";
    STR_ABOUT = "About";
    STR_HIDE = "Hide";
    STR_SEARCH_EMPTY = "The text you entered is empty.";
    STR_SEARCH_RESULT_EMPTY = "The search result is empty.";
    STR_SWITCH = "Switch screen";
    STR_SWITCH_USER = "Switch user screen";
    STR_SWITCH_VOD = "Switch: Past Broadcast or Highlight";
    STR_SWITCH_CLIP = "Switch: Period (24h, 7d, 30d, all)";
    STR_GO_TO = "Go to ";
    STR_USER = "User ";
    STR_LIVE = "Live";
    STR_GAMES = "Games";
    STR_PLAYING = "Playing ";
    STR_FOR = " for ";
    STR_WATCHING = "Watching time ";
    STR_SINCE = "Since ";
    STR_AGO = " ago";
    STR_AGAME = "A Game";
    STR_PLACEHOLDER_SEARCH = "Type your search...";
    STR_PLACEHOLDER_OAUTH = "Type your authentication key...";
    STR_PLACEHOLDER_USER = "Type your user name...";
    STR_PLACEHOLDER_PRESS = "Press Enter or Select key to, ";
    STR_CHANNELS = "Channels";
    STR_CHANNEL = "Channel";
    STR_GOBACK = "Back to previously screen: Back key twice";
    STR_IS_OFFLINE = " has ended";
    STR_IS_SUB_ONLY = "This video is only available to subscribers.";
    STR_REFRESH_PROBLEM = "Connection failed, unable to load content hit refresh to try again";
    STR_NO = "No";
    STR_FOR_THIS = " for this ";
    STR_PLAYER_PROBLEM = "Connection failed, unable to load video content exiting...";
    STR_PAST_BROA = " Past Broadcast";
    STR_PAST_HIGHL = " Highlight";
    STR_CLIPS = " Clips";
    STR_CONTENT = " Content";
    STR_STREAM_ON = "Streamed on ";
    STR_DURATION = "Duration ";
    STR_VIEWS = " Views";
    STR_VIEWER = " Viewers";
    STR_EXIT_AGAIN = "Click again to exit!";
    STR_EXIT_MESSAGE = "Do you wanna to exit Twitch?";
    STR_EXIT = "Exit";
    STR_CLOSE = "Close";
    STR_MINIMIZE = "Minimize";
    STR_CANCEL = "Cancel";
    STR_NOT_LIVE = "Not Live | ";
    STR_LIVE_CHANNELS = " Channels Live";
    STR_LIVE_HOSTS = " Hosts Live";
    STR_LIVE_GAMES = " Games Live";
    STR_USER_CHANNEL = " Followed Channels";
    STR_USER_ADD = " Add User";
    STR_USER_REMOVE = " Remove User";
    STR_USER_ERROR = "User doesn\'t exist";
    STR_USER_HOSTING = " hosting ";
    STR_USER_SET = " already set";
    STR_USER_MAKE_ONE = "Make First";
    STR_USER_NUMBER_ONE = "First user can fallow (when providing a key) and see live channels feed outside of the user screen<br>";
    STR_ADD_USER_SH = "Add a Twitch user to display it\'s Followed Channels content here";
    STR_CLIP_DAY = " (24h)";
    STR_CLIP_WEEK = " (7d)";
    STR_CLIP_MONTH = " (30d)";
    STR_CLIP_ALL = " (all)";
    STR_JUMP_TIME = "Jumping";
    STR_JUMP_T0 = " to ";
    STR_JUMP_CANCEL = "Jump Canceled";
    STR_JUMP_TIME_BIG = " , jump time bigger then duration";
    STR_SEC = " Sec";
    STR_MIN = " Min";
    STR_HR = " Hr";
    STR_SOURCE = "Source";
    STR_VERSION = "Version: ";
    STR_TWITCH_TV = "SmartTV Twitch";
    STR_CLOSE_THIS = "Press back key to close this.";
    STR_PLAYER = "Player Related:";
    STR_CHAT = "Chat Related:";
    STR_GENERAL = "General Related:";
    STR_UPDATE = 'Update';
    STR_CURRENT_VERSION = "Current installed version ";
    STR_LATEST_VERSION = " latest available version ";
    STR_CONTROLS_MAIN_1 = "This are the none players related controls, the player can show it's own controls.";
    STR_CONTROLS_MAIN_2 = "Play a video: Navigate using Directional pad (up/down/left/right), press enter to start playing";
    STR_CONTROLS_MAIN_3 = "Refresh screen content: ";
    STR_CONTROLS_MAIN_4 = "Exit the application: from side pannel click exit";
    STR_CONTROLS_MAIN_6 = " Switch screen: Back key then D-Pad left or right";
    STR_CONTROLS_MAIN_7 = "Some screen will change its internal content (channel past broadcast or clips for example) instead of changing to another screen";
    STR_CONTROLS_MAIN_10 = "Start a search: from side pannel click search";
    STR_CONTROLS_MAIN_11 = "After writing the search text press key Enter on the virtual keyboard then choose a search option";
    STR_CONTROLS_MAIN_14 = "About this application: from side pannel click about";
    STR_ABOUT_INFO_1 = "This is a SmartTV Twitch client develop by a individual on his free time, for TV\'s that don't have access to a good official application, released for free to any one that wanna to use it.";
    STR_ABOUT_INFO_2_SOURCE = "This version of the app is for test in a browser only!";
    STR_ABOUT_INFO_3 = "Developer information:";
    STR_ABOUT_INFO_4 = "This is an open source application licensed under the GNU General Public License v3.0, check it on github";
    STR_ABOUT_INFO_5 = "github.com/fgl27/SmartTwitchTV";
    STR_ABOUT_INFO_6 = "This application uses following dependencies:";
    STR_ABOUT_INFO_7 = "Nightdev KapChat - KapChat captures Twitch chat directly into OBS or XSplit (https://www.nightdev.com/kapchat/)";
    STR_ABOUT_INFO_8 = "Fontastic - Create your customized icon fonts in seconds (http://app.fontastic.me)";
    STR_ABOUT_INFO_9 = "Twemoji - A simple library that provides standard Unicode emoji support across all platforms (https://github.com/twitter/twemoji)";
    STR_ABOUT_INFO_10 = "UglifyJS - is a JavaScript parser, minifier, compressor and beautifier toolkit (https://github.com/mishoo/UglifyJS2)";
    STR_ABOUT_INFO_11 = "JS Beautifier - Beautify, unpack or deobfuscate JavaScript and HTML, make JSON/JSONP readable, etc. (https://github.com/beautify-web/js-beautify)";
    STR_ABOUT_INFO_12 = "HTMLMinifier - A highly configurable, well-tested, JavaScript-based HTML minifier (https://github.com/kangax/html-minifier)";
    STR_ABOUT_INFO_13 = "JSHint - A Static Code Analysis Tool for JavaScript (https://github.com/jshint/jshint)";

    STR_ABOUT_INFO_14 = "Web:";
    STR_ABOUT_INFO_15 = "Android:";
    STR_ABOUT_INFO_16 = "Google: Leanback v17 (https://developer.android.com/reference/android/support/v17/leanback/package-summary)";
    STR_ABOUT_INFO_17 = "Google: ExoPlayer (https://github.com/google/ExoPlayer)";

    STR_CONTROLS_PLAY_1 = "Show information panel: Press enter key or D-pad keys if chat and live channel feed is not showing";
    STR_CONTROLS_PLAY_2 = "Close the video: press back key twice";
    STR_CONTROLS_PLAY_3 = "Play/Pause a video: open information panel and click on pause simbol (not available to Live streams)";
    STR_CONTROLS_PLAY_4 = "Show user live channels feed: D-pad up";
    STR_CONTROLS_PLAY_5 = "Change video quality: Open information panel, , navigate using use Directional pad (left/right), then use Directional pad (up/down) to choose the new quality after press Enter key to confirm the change";
    STR_CONTROLS_PLAY_6 = "Force refresh a video (in case it freezes): Change video quality to the same";
    STR_CONTROLS_PLAY_7 = "Show or hide the Chat : D-pad right";
    STR_CONTROLS_PLAY_8 = "Change Chat position : D-pad left";
    STR_CONTROLS_PLAY_9 = "Change Chat size : D-pad down";
    STR_CONTROLS_PLAY_10 = "Change Chat background brightness: Change in side panel settings";
    STR_CONTROLS_PLAY_11 = "Force refresh the Chat (in case it freezes or doesn\'t load): Change video quality to the same will reset and sync it";
    STR_CONTROLS_PLAY_12 = "Start a search: open information panel, navigate using use Directional pad (left/right) to \"Search\" and press enter";
    STR_CONTROLS_PLAY_14 = "Chat and video (Side by side): Color button red (A)";
    STR_F_DISABLE_CHAT = "Force disable the chat";
    STR_F_DISABLE_CHAT_SUMARRY = "with this the chat will not load content, this is useful on a stream with too many viewers were the chat can lag the app.";
    STR_UPDATE_AVAILABLE = "Update available, check google play store";
    STR_OAUTH_IN = 'Adding a key allows the app to fallow and access subscribed only past broadcast (for channel you are Sub to and block VOD access to none subscribers). On the authentication page if you already added a key for another user, you need to click up two to tree time and click over "not you?" to authenticate for a different users <br> <br> add key for';
    STR_OAUTH_EXPLAIN1 = " below, fallowing this steps:";
    STR_OAUTH_EXPLAIN2 = "Access the site link_link (using a computer or a smart phone)";
    STR_OAUTH_EXPLAIN3 = "Click on the \"Authorize\" button it will take you to main Twitch.TV authentication site";
    STR_OAUTH_EXPLAIN4 = "Login to Twitch.TV using the user name you are trying to add a key for";
    STR_OAUTH_EXPLAIN5 = "Click on Authorize button of Twitch.TV site if you agree with the requested permissions";
    STR_OAUTH_EXPLAIN6 = "The web page will update and show a key code, the key only has lower case letters and nubers.";
    STR_USER_CODE = " Add Authentication key";
    STR_USER_CODE_OK = "Key added OK";
    STR_KEY_BAD = "Key test fail, it\'s needed to add new one";
    STR_KEY_OK = "Key test return OK";
    STR_OAUTH_WRONG = "You try to add a key for user ";
    STR_OAUTH_WRONG2 = " but this key is for user ";
    STR_FALLOWING = " Following";
    STR_FALLOW = " Follow";
    STR_IS_SUB_NOOAUTH = " And you have not set a authentication key the app can\'t check yours sub status.";
    STR_IS_SUB_NOT_SUB = " And you are not a sub of this channel";
    STR_IS_SUB_IS_SUB = " You are a sub of this channel but the app fail to authenticate contact the developer email in about";
    STR_OAUTH_FAIL = "Fail authentication check with the provider key, please check and try again";
    STR_OAUTH_FAIL_USER = "The added key doesn't belong to the user ";
    STR_NOKEY = "No user";
    STR_NOKEY_WARN = "Set a user and a authentication key to be able to fallow/unfollow";
    STR_RESET = "Restart the";
    STR_CLIP = " Clip";
    STR_CHANNEL_CONT = "Channel content";
    STR_NET_DOWN = "Network is disconnect, the application can't work without INTERNET";
    STR_NET_UP = "Network connection reestablished";
    STR_FALLOWERS = " Followers";
    STR_CANT_FALLOW = ", Can\'t fallow or unfallow ";
    STR_GAME_CONT = "Game content";
    STR_YES = "Yes";
    STR_REMOVE_USER = "Are you sure you want to remove the user ";
    STR_PLACEHOLDER_PRESS_UP = "Press Up to ";
    STR_FALLOW_GAMES = "Followed Games";
    STR_USER_GAMES_CHANGE = "Change between";
    STR_GUIDE = " Back key then Enter";
    STR_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    STR_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    STR_STARTED = "Started ";
    STR_KEY_UP_DOWN = " (PG Up/Down)";
    STR_VIDEOS = "Videos";
    STR_VIDEO = " Video";
    STR_REPLAY = "Replay";
    STR_STREAM_END = "exiting in ";
    STR_STREAM_END_EXIT = 'press "Return" to exit';
    STR_FEATURED = 'Featured';
    STR_CREATED_AT = "Created at ";
    STR_OPEN_BROADCAST = "Open the Broadcast";
    STR_NO_BROADCAST = "No Broadcast";
    STR_NO_BROADCAST_WARNING = "There is no Past Broadcast for this clip";
    STR_NO_CHAT = "And because of that no chat";
    STR_IS_NOW = " is now";
    STR_OPEN_HOST = "Open the Hosting";
    STR_SETTINGS_PLAYER = "Player related";
    STR_SETTINGS_BUFFER_SIZE = "Buffer size:";
    STR_SETTINGS_BUFFER_SIZE_SUMMARY = "A lower value here will make the player to start playing sooner, but it may cause re-buffer with will cause the player to pause to buffer.";
    STR_SETTINGS_BUFFER_LIVE = "Live streams buffer";
    STR_SETTINGS_BUFFER_VOD = "Videos (Past Broadcast and Highlight) buffer";
    STR_SETTINGS_BUFFER_CLIP = "Clips buffer";
    STR_SETTINGS_GENERAL = "General related";
    STR_SETTINGS_LANG = "Language";
    STR_LOADING_CHAT = "Chat: Connecting to chat server..." + STR_BR + "Chat: Connected." + STR_BR + "Chat: Joined channel ";
    STR_VOD_HISTORY = "Play from the start or from where you stop watching last time?";
    STR_FROM = "From:" + STR_BR;
    STR_FROM_START = STR_FROM + "Start";
    STR_CHAT_END = "Chat: The Chat has ended!";
    STR_TIME = ": Most recent";
    STR_VIWES = ": Most views";
    STR_NOKEY_VIDEO_WARN = "Set a authentication key to be able to see fallowed videos";
    STR_SWITCH_TYPE = "Switch: Most recent or views";
    STR_ENABLE = "Enable";
    STR_DISABLE = "Disable";
    STR_RESTORE_PLAYBACK_WARN = "The app was closed willing playing, restoring playback";
    STR_RESTORE_PLAYBACK = "Restore playback";
    STR_RESTORE_PLAYBACK_SUMARRY = "When changing apps, the app may be closed by the system to free memory. In this case the app saves what it was playing and restores the playback when reopened";
    STR_CHAT_FONT = "Chat font size";
    STR_CHAT_FONT_SUMARRY = "Change the chat lines font size, applies to text and emotes";
    STR_VIDEOS_ANIMATION = "Videos animated thumbnails";
    STR_SIDE_PANEL = "Side panel: Back key twice";
    STR_SIZE = "Size ";
    STR_BRIGHTNESS = "Brightness ";
    STR_FORBIDDEN = "Forbidden content, this Live must be for Prime only subscribers or lock to Twitch official app only";
    STR_JUMPING_STEP = "Jump step ";
    STR_SECONDS = " seconds";
    STR_MINUTES = " minutes";
    STR_CLOCK_OFFSET = "Clock offset";
    STR_APP_LANG = "Application language";
    STR_CONTENT_LANG = "Content language";
    STR_LANG_ALL = "All";
    STR_NO_GAME = "Empty game fro this";
    STR_JUMP_BUFFER_WARNING = "Isn't possible to jump during a buffering";
    STR_CHAT_DISABLE = "Chat is disabled, enable in side pannel settings";
    STR_CLIP_FAIL = "This clip/video fail to load can't replay";
    STR_CHAT_BRIGHTNESS = "Chat backgroung brightness ";
}//Variable initialization
var AddCode_loadingDataTry = 0;
var AddCode_loadingDataTryMax = 5;
var AddCode_loadingDataTimeout = 10000;
var AddCode_Code = 0;
var AddCode_loadingData = false;
var AddCode_IsFallowing = false;
var AddCode_IsSub = false;
var AddCode_PlayRequest = false;
var AddCode_Channel_id = '';

var AddCode_redirect_uri = 'https://fgl27.github.io/SmartTwitchTV/release/index.min.html';
var AddCode_client_secret = "elsu5d09k0xomu7cggx3qg5ybdwu7g";
var AddCode_UrlToken = 'https://id.twitch.tv/oauth2/token?';
//Variable initialization end

function AddCode_CheckNewCode(code) {
    Main_values.Users_Position = Main_values.Users_AddcodePosition;
    AddCode_Code = code;
    AddCode_TimeoutReset10();
    Main_showLoadDialog();
    AddCode_requestTokens();
}

function AddCode_refreshTokens(position, tryes, callbackFunc, callbackFuncNOK) {
    var xmlHttp = new XMLHttpRequest();

    var url = AddCode_UrlToken + 'grant_type=refresh_token&client_id=' +
        encodeURIComponent(Main_clientId) + '&client_secret=' + encodeURIComponent(AddCode_client_secret) +
        '&refresh_token=' + encodeURIComponent(AddUser_UsernameArray[position].refresh_token) +
        '&redirect_uri=' + AddCode_redirect_uri;

    xmlHttp.open("POST", url, true);
    xmlHttp.timeout = AddCode_loadingDataTimeout;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                AddCode_refreshTokensSucess(xmlHttp.responseText, position, callbackFunc);
            } else AddCode_refreshTokensError(position, tryes, callbackFunc, callbackFuncNOK);
            return;
        }
    };

    xmlHttp.send(null);
}

function AddCode_refreshTokensError(position, tryes, callbackFuncOK, callbackFuncNOK) {
    tryes++;
    if (tryes < 10) AddCode_refreshTokens(position, tryes, callbackFuncOK);
    else if (callbackFuncNOK) callbackFuncNOK();
}

function AddCode_refreshTokensSucess(responseText, position, callbackFunc) {
    var response = JSON.parse(responseText);
    AddUser_UsernameArray[position].access_token = response.access_token;
    AddUser_UsernameArray[position].refresh_token = response.refresh_token;

    AddUser_SaveUserArray();
    if (callbackFunc) callbackFunc();
}

function AddCode_requestTokens() {
    var xmlHttp = new XMLHttpRequest();
    var url = AddCode_UrlToken + 'grant_type=authorization_code&client_id=' +
        encodeURIComponent(Main_clientId) + '&client_secret=' + encodeURIComponent(AddCode_client_secret) +
        '&code=' + encodeURIComponent(AddCode_Code) + '&redirect_uri=' + AddCode_redirect_uri;

    xmlHttp.open("POST", url, true);
    xmlHttp.timeout = AddCode_loadingDataTimeout;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                AddCode_requestTokensSucess(xmlHttp.responseText);
            } else AddCode_requestTokensError();
            return;
        }
    };

    xmlHttp.send(null);
}

function AddCode_requestTokensError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_requestTokens();
    } else AddCode_requestTokensFail();

}

function AddCode_requestTokensFail() {
    Main_HideLoadDialog();
    Main_showWarningDialog(STR_OAUTH_FAIL);
    window.setTimeout(function() {
        Main_HideWarningDialog();
        Main_newUsercode = 0;
        Main_SaveValues();
        Main_values.Main_Go = Main_Users;
        window.location = AddCode_redirect_uri;
    }, 4000);
    AddUser_UsernameArray[Main_values.Users_Position].access_token = 0;
    AddUser_UsernameArray[Main_values.Users_Position].refresh_token = 0;
}

function AddCode_requestTokensSucess(responseText) {
    var response = JSON.parse(responseText);
    AddUser_UsernameArray[Main_values.Users_Position].access_token = response.access_token;
    AddUser_UsernameArray[Main_values.Users_Position].refresh_token = response.refresh_token;
    AddCode_TimeoutReset10();
    AddCode_CheckOauthToken();
}

function AddCode_CheckOauthToken() {

    var theUrl = 'https://api.twitch.tv/kraken?oauth_token=' +
        AddUser_UsernameArray[Main_values.Users_Position].access_token;

    BasehttpGet(theUrl, AddCode_loadingDataTimeout, 0, null, AddCode_CheckOauthTokenSucess, AddCode_CheckOauthTokenError);
}

function AddCode_CheckOauthTokenSucess(response) {
    var token = JSON.parse(response).token;
    if (token.user_name &&
        token.user_name.indexOf(AddUser_UsernameArray[Main_values.Users_Position].name) !== -1) {
        AddUser_SaveUserArray();
        Main_newUsercode = 0;
        Main_HideLoadDialog();
        Users_status = false;
        AddCode_loadingData = false;
        Main_values.Main_Go = Main_Users;
        Main_SaveValues();
        Main_showWarningDialog(STR_USER_CODE_OK);
        window.setTimeout(function() {
            window.location = AddCode_redirect_uri;
        }, 3000);
    } else {
        AddUser_UsernameArray[Main_values.Users_Position].access_token = 0;
        AddUser_UsernameArray[Main_values.Users_Position].refresh_token = 0;
        AddCode_loadingData = false;
        Main_showWarningDialog(STR_OAUTH_FAIL_USER + AddUser_UsernameArray[Main_values.Users_Position].name);
        window.setTimeout(function() {
            Main_HideWarningDialog();
            Main_newUsercode = 0;
            Main_SaveValues();
            Main_values.Main_Go = Main_Users;
            window.location = AddCode_redirect_uri;
        }, 4000);
    }
    return;
}

function AddCode_CheckOauthTokenError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_CheckOauthToken();
    } else AddCode_requestTokensFail();
}

function AddCode_CheckFallow() {
    AddCode_TimeoutReset10();
    AddCode_IsFallowing = false;
    AddCode_RequestCheckFallow();
}

function AddCode_RequestCheckFallow() {
    var theUrl = 'https://api.twitch.tv/kraken/users/' + AddUser_UsernameArray[Main_values.Users_Position].id + '/follows/channels/' + AddCode_Channel_id;
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = AddCode_loadingDataTimeout;
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) { //yes
                AddCode_RequestCheckFallowOK();
            } else if (xmlHttp.status === 404) { //no
                AddCode_RequestCheckFallowNOK(xmlHttp.responseText);
            } else { // internet error
                AddCode_RequestCheckFallowError();
            }
        }
    };

    xmlHttp.send(null);
}

function AddCode_RequestCheckFallowOK() {
    AddCode_IsFallowing = true;
    AddCode_loadingData = false;
    if (AddCode_PlayRequest) Play_setFallow();
    else ChannelContent_setFallow();
}

function AddCode_RequestCheckFallowNOK(response) {
    if ((JSON.parse(response).error + '').indexOf('Not Found') !== -1) {
        AddCode_IsFallowing = false;
        AddCode_loadingData = false;
        if (AddCode_PlayRequest) Play_setFallow();
        else ChannelContent_setFallow();
    } else AddCode_RequestCheckFallowError();
}

function AddCode_RequestCheckFallowError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_RequestCheckFallow();
    } else {
        AddCode_loadingData = false;
        if (AddCode_PlayRequest) Play_setFallow();
        else ChannelContent_setFallow();
    }
}

function AddCode_Fallow() {
    AddCode_TimeoutReset10();
    AddCode_FallowRequest();
}

function AddCode_FallowRequest() {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("PUT", 'https://api.twitch.tv/kraken/users/' + AddUser_UsernameArray[Main_values.Users_Position].id + '/follows/channels/' + AddCode_Channel_id, true);
    xmlHttp.timeout = AddCode_loadingDataTimeout;
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
    xmlHttp.setRequestHeader('Authorization', 'OAuth ' + AddUser_UsernameArray[Main_values.Users_Position].access_token);
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) { //success user now is fallowing the channel
                AddCode_loadingData = false;
                AddCode_IsFallowing = true;
                if (AddCode_PlayRequest) Play_setFallow();
                else ChannelContent_setFallow();
                return;
            } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
                AddCode_refreshTokens(Main_values.Users_Position, 0, AddCode_Fallow, null);
            } else {
                AddCode_FallowRequestError();
            }
        }
    };

    xmlHttp.send(null);
}

function AddCode_FallowRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_FallowRequest();
    }
}

function AddCode_UnFallow() {
    AddCode_TimeoutReset10();
    AddCode_UnFallowRequest();
}

function AddCode_UnFallowRequest() {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("DELETE", 'https://api.twitch.tv/kraken/users/' + AddUser_UsernameArray[Main_values.Users_Position].id + '/follows/channels/' + AddCode_Channel_id, true);
    xmlHttp.timeout = AddCode_loadingDataTimeout;
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
    xmlHttp.setRequestHeader('Authorization', 'OAuth ' + AddUser_UsernameArray[Main_values.Users_Position].access_token);
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 204) { //success user is now not fallowing the channel
                AddCode_IsFallowing = false;
                AddCode_loadingData = false;
                if (AddCode_PlayRequest) Play_setFallow();
                else ChannelContent_setFallow();
                return;
            } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
                AddCode_refreshTokens(Main_values.Users_Position, 0, AddCode_UnFallow, null);
            } else {
                AddCode_UnFallowRequestError();
            }
        }
    };

    xmlHttp.send(null);
}

function AddCode_UnFallowRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_UnFallowRequest();
    }
}

function AddCode_CheckSub() {
    AddCode_TimeoutReset10();
    AddCode_IsSub = false;
    AddCode_RequestCheckSub();
}

function AddCode_TimeoutReset10() {
    AddCode_loadingDataTry = 0;
    AddCode_loadingDataTimeout = 10000;
    AddCode_loadingData = true;
}

function AddCode_RequestCheckSub() {
    var theUrl = 'https://api.twitch.tv/kraken/users/' + AddUser_UsernameArray[Main_values.Users_Position].id + '/subscriptions/' + AddCode_Channel_id;
    var xmlHttp;
    if (Main_Android) {

        xmlHttp = Android.mreadUrl(theUrl, AddCode_loadingDataTimeout, 3, AddUser_UsernameArray[Main_values.Users_Position].access_token);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            AddCode_RequestCheckSubError();
            return;
        }

        if (xmlHttp.status === 200) {
            AddCode_IsSub = true;
            AddCode_loadingData = false;
            PlayVod_isSub();
        } else if (xmlHttp.status === 422) {
            AddCode_IsSub = false;
            AddCode_loadingData = false;
            PlayVod_NotSub();
        } else if (xmlHttp.status === 404) {
            if ((JSON.parse(xmlHttp.responseText).error + '').indexOf('Not Found') !== -1) {
                AddCode_IsSub = false;
                AddCode_loadingData = false;
                PlayVod_NotSub();
                return;
            } else AddCode_RequestCheckSubError();
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) {
            AddCode_refreshTokens(Main_values.Users_Position, 0, AddCode_CheckSub, AddCode_RequestCheckSubfail);
        } else {
            AddCode_RequestCheckSubError();
        }

    } else {

        xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = AddCode_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader('Authorization', 'OAuth ' + AddUser_UsernameArray[Main_values.Users_Position].access_token);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //success yes user is a SUB
                    AddCode_IsSub = true;
                    AddCode_loadingData = false;
                    PlayVod_isSub();
                } else if (xmlHttp.status === 422) { //channel does not have a subscription program
                    AddCode_IsSub = false;
                    AddCode_loadingData = false;
                    PlayVod_NotSub();
                } else if (xmlHttp.status === 404) { //success no user is not a sub
                    if ((JSON.parse(xmlHttp.responseText).error + '').indexOf('Not Found') !== -1) {
                        AddCode_IsSub = false;
                        AddCode_loadingData = false;
                        PlayVod_NotSub();
                        return;
                    } else AddCode_RequestCheckSubError();
                } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
                    AddCode_refreshTokens(Main_values.Users_Position, 0, AddCode_CheckSub, AddCode_RequestCheckSubfail);
                } else { // internet error
                    AddCode_RequestCheckSubError();
                }
            }
        };

        xmlHttp.send(null);
    }
}

function AddCode_RequestCheckSubError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_RequestCheckSub();
    } else AddCode_RequestCheckSubfail();
}

function AddCode_RequestCheckSubfail() {
    AddCode_IsSub = false;
    AddCode_loadingData = false;
    PlayVod_NotSub();
}

function AddCode_CheckTokenStart(position) {
    AddCode_TimeoutReset10();
    AddCode_CheckToken(position, 0);
}

function AddCode_CheckToken(position, tryes) {
    var theUrl = 'https://api.twitch.tv/kraken?oauth_token=' +
        AddUser_UsernameArray[position].access_token;
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                if (!JSON.parse(xmlHttp.responseText).token.valid) {
                    AddCode_TimeoutReset10();
                    AddCode_refreshTokens(position, 0, null, null);
                } else AddCode_loadingData = false;
                return;
            } else if (xmlHttp.status === 400) {
                AddCode_TimeoutReset10();
                AddCode_refreshTokens(position, 0, null, null);
            } else AddCode_CheckTokenError(position, tryes);
        }
    };

    xmlHttp.send(null);
}

function AddCode_CheckTokenError(position, tryes) {
    tryes++;
    if (tryes < AddCode_loadingDataTryMax) AddCode_CheckToken(position, tryes);
}

function AddCode_FallowGame() {
    AddCode_TimeoutReset10();
    AddCode_RequestFallowGame();
}

function AddCode_RequestFallowGame() {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("PUT", 'https://api.twitch.tv/api/users/' + AddUser_UsernameArray[Main_values.Users_Position].name +
        '/follows/games/' + encodeURIComponent(Main_values.Main_gameSelected) +
        '?oauth_token=' + AddUser_UsernameArray[Main_values.Users_Position].access_token, true);
    xmlHttp.timeout = 10000;
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) { //success we now fallow the game
                AGame_fallowing = true;
                AGame_setFallow();
                return;
            } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
                AddCode_refreshTokens(Main_values.Users_Position, 0, AddCode_FallowGame, null);
            } else { // internet error
                AddCode_FallowGameRequestError();
            }
        }
    };

    xmlHttp.send(null);
}

function AddCode_FallowGameRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_RequestFallowGame();
    }
}

function AddCode_UnFallowGame() {
    AddCode_TimeoutReset10();
    AddCode_RequestUnFallowGame();
}

function AddCode_RequestUnFallowGame() {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("DELETE", 'https://api.twitch.tv/api/users/' + AddUser_UsernameArray[Main_values.Users_Position].name +
        '/follows/games/' + encodeURIComponent(Main_values.Main_gameSelected) + '?oauth_token=' +
        AddUser_UsernameArray[Main_values.Users_Position].access_token, true);
    xmlHttp.timeout = 10000;
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 204) { // success we now unfallow the game
                AGame_fallowing = false;
                AGame_setFallow();
                return;
            } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
                AddCode_refreshTokens(Main_values.Users_Position, 0, AddCode_UnFallowGame, null);
            } else { // internet error
                AddCode_UnFallowGameRequestError();
            }
        }
    };

    xmlHttp.send(null);
}

function AddCode_UnFallowGameRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_RequestUnFallowGame();
    }
}

function AddCode_CheckFallowGame() {
    AddCode_TimeoutReset10();
    AddCode_RequestCheckFallowGame();
}

function AddCode_RequestCheckFallowGame() {
    var theUrl = 'https://api.twitch.tv/api/users/' + AddUser_UsernameArray[Main_values.Users_Position].name + '/follows/games/' + encodeURIComponent(Main_values.Main_gameSelected);
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) { //success yes user fallows
                AGame_fallowing = true;
                AGame_setFallow();
                return;
            } else if (xmlHttp.status === 404) { //success no user doesnot fallows
                AGame_fallowing = false;
                AGame_setFallow();
                return;
            } else { // internet error
                AddCode_CheckFallowGameError();
                return;
            }
        }
    };

    xmlHttp.send(null);
}

function AddCode_CheckFallowGameError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_RequestCheckFallowGame();
    } else {
        AGame_fallowing = false;
        AGame_setFallow();
    }
}//Variable initialization
var ChannelContent_cursorY = 0;
var ChannelContent_cursorX = 0;
var ChannelContent_dataEnded = false;
var ChannelContent_itemsCount = 0;
var ChannelContent_loadingDataTry = 0;
var ChannelContent_loadingDataTryMax = 5;
var ChannelContent_loadingDataTimeout = 3500;
var ChannelContent_itemsCountOffset = 0;
var ChannelContent_skipImg = false;
var ChannelContent_UserChannels = false;
var ChannelContent_TargetId;
var ChannelContent_ids = ['cc_thumbdiv', 'cc_img', 'cc_infodiv', 'cc_name', 'cc_createdon', 'cc_game', 'cc_viwers', 'cc_duration', 'cc_cell', 'sccempty_', 'channel_content_scroll'];
var ChannelContent_status = false;
var ChannelContent_lastselectedChannel = '';
var ChannelContent_responseText = null;
var ChannelContent_selectedChannelViews = '';
var ChannelContent_selectedChannelFallower = '';
var ChannelContent_description = '';
var ChannelContent_thumbnail = '';
var ChannelContent_thumbnail_fallow = '';
var ChannelContent_ChannelValue = {};
var ChannelContent_ChannelValueIsset = false;
//Variable initialization end

function ChannelContent_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_ChannelContent;
    if (ChannelContent_ChannelValueIsset && !Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
    if (ChannelContent_lastselectedChannel !== Main_values.Main_selectedChannel) ChannelContent_status = false;
    Main_cleanTopLabel();
    Main_values.Main_selectedChannelDisplayname = Main_values.Main_selectedChannelDisplayname.replace(STR_NOT_LIVE, '');
    Main_textContent('top_bar_user', Main_values.Main_selectedChannelDisplayname);
    Main_textContent('top_bar_game', STR_CHANNEL_CONT);
    document.body.addEventListener("keydown", ChannelContent_handleKeyDown, false);
    AddCode_PlayRequest = false;
    if (ChannelContent_status) {
        Main_YRst(ChannelContent_cursorY);
        Main_ShowElement(ChannelContent_ids[10]);
        ChannelContent_checkUser();
        ChannelContent_addFocus();
        Main_SaveValues();
    } else ChannelContent_StartLoad();
}

function ChannelContent_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
    Main_HideElement(ChannelContent_ids[10]);
}

function ChannelContent_StartLoad() {
    Main_empty('stream_table_channel_content');
    Main_HideElement(ChannelContent_ids[10]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    ChannelContent_lastselectedChannel = Main_values.Main_selectedChannel;
    ChannelContent_status = false;
    ChannelContent_skipImg = false;
    ChannelContent_thumbnail = '';
    ChannelContent_itemsCountOffset = 0;
    ChannelContent_itemsCount = 0;
    ChannelContent_cursorX = 0;
    ChannelContent_cursorY = 0;
    ChannelContent_dataEnded = false;
    ChannelContent_TargetId = undefined;
    ChannelContent_loadDataPrepare();
    ChannelContent_loadDataRequest();
}

function ChannelContent_loadDataPrepare() {
    Main_FirstLoad = true;
    ChannelContent_loadingDataTry = 0;
    ChannelContent_loadingDataTimeout = 3500;
}

function ChannelContent_loadDataRequest() {
    var theUrl = 'https://api.twitch.tv/kraken/streams/' + encodeURIComponent(ChannelContent_TargetId !== undefined ? ChannelContent_TargetId : Main_values.Main_selectedChannel_id);

    BasehttpGet(theUrl, ChannelContent_loadingDataTimeout, 2, null, ChannelContent_loadDataRequestSuccess, ChannelContent_loadDataError);
}

function ChannelContent_loadDataRequestSuccess(response) {
    if (JSON.parse(response).stream !== null) {
        ChannelContent_responseText = response;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    } else if (!ChannelContent_TargetId) {
        ChannelContent_loadDataPrepare();
        ChannelContent_loadDataCheckHost();
    } else {
        ChannelContent_responseText = null;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    }
}

function ChannelContent_loadDataError() {
    ChannelContent_loadingDataTry++;
    if (ChannelContent_loadingDataTry < ChannelContent_loadingDataTryMax) {
        ChannelContent_loadingDataTimeout += 500;
        ChannelContent_loadDataRequest();
    } else {
        ChannelContent_responseText = null;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    }
}

function ChannelContent_loadDataCheckHost() {
    var theUrl = 'https://tmi.twitch.tv/hosts?include_logins=1&host=' + encodeURIComponent(Main_values.Main_selectedChannel_id);

    BasehttpGet(theUrl, ChannelContent_loadingDataTimeout, 1, null, ChannelContent_CheckHost, ChannelContent_loadDataCheckHostError, true);
}

function ChannelContent_loadDataCheckHostError() {
    ChannelContent_loadingDataTry++;
    if (ChannelContent_loadingDataTry < ChannelContent_loadingDataTryMax) {
        ChannelContent_loadingDataTimeout += 500;
        ChannelContent_loadDataCheckHost();
    } else {
        ChannelContent_responseText = null;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    }
}

function ChannelContent_CheckHost(responseText) {
    var response = JSON.parse(responseText);
    ChannelContent_TargetId = response.hosts[0].target_id;
    if (ChannelContent_TargetId !== undefined) {
        ChannelContent_loadDataPrepare();
        ChannelContent_loadDataRequest();
    } else {
        ChannelContent_responseText = null;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    }
}

function ChannelContent_GetStreamerInfo() {
    var theUrl = 'https://api.twitch.tv/kraken/channels/' + Main_values.Main_selectedChannel_id;

    BasehttpGet(theUrl, PlayVod_loadingInfoDataTimeout, 2, null, ChannelContent_GetStreamerInfoSuccess, ChannelContent_GetStreamerInfoError);
}

function ChannelContent_GetStreamerInfoSuccess(responseText) {
    var channel = JSON.parse(responseText);
    ChannelContent_selectedChannelViews = channel.views;
    ChannelContent_selectedChannelFallower = channel.followers;
    ChannelContent_description = channel.description;
    Main_values.Main_selectedChannelLogo = channel.logo;
    ChannelContent_loadDataSuccess();
    return;
}

function ChannelContent_GetStreamerInfoError() {
    ChannelContent_loadingDataTry++;
    if (ChannelContent_loadingDataTry < ChannelContent_loadingDataTryMax) {
        ChannelContent_loadingDataTimeout += 500;
        ChannelContent_GetStreamerInfo();
    } else {
        ChannelContent_selectedChannelViews = '';
        ChannelContent_selectedChannelFallower = '';
        ChannelContent_description = '';
        Main_values.Main_selectedChannelLogo = IMG_404_LOGO;
        ChannelContent_loadDataSuccess();
    }
}

function ChannelContent_loadDataSuccess() {
    var row = document.createElement('tr'),
        tbody = document.createElement('tbody'),
        coloumn_id = 0,
        doc = document.getElementById("stream_table_channel_content");

    Main_td = document.createElement('tr');
    Main_td.className = 'follower_header';
    Main_td.innerHTML = '<div class="follower_header">' + twemoji.parse(ChannelContent_description) + '</div>';

    doc.appendChild(tbody);
    doc.appendChild(Main_td);

    if (ChannelContent_responseText !== null) {
        var response = JSON.parse(ChannelContent_responseText);
        if (response.stream !== null) {
            var hosting = ChannelContent_TargetId !== undefined ? Main_values.Main_selectedChannelDisplayname +
                STR_USER_HOSTING : '';
            var stream = response.stream;
            row.appendChild(ChannelContent_createCell('0_' + coloumn_id, stream.channel.name, stream.preview.template,
                twemoji.parse(stream.channel.status), stream.game,
                Main_is_playlist(JSON.stringify(stream.stream_type)) +
                hosting + stream.channel.display_name,
                STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR +
                Main_addCommas(stream.viewers) + STR_VIEWER,
                Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.broadcaster_language)));
            coloumn_id++;
        } else ChannelContent_skipImg = true;
    } else ChannelContent_skipImg = true;

    row.appendChild(ChannelContent_createChannelCell('0_' + coloumn_id,
        Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelDisplayname + STR_PAST_BROA, 'movie-play'));
    coloumn_id++;
    row.appendChild(ChannelContent_createChannelCell('0_' + coloumn_id,
        Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelDisplayname + STR_CLIPS, 'movie'));

    if (coloumn_id < 2) {
        coloumn_id++;
        row.appendChild(Main_createEmptyCell(ChannelContent_ids[9] + '0_' + coloumn_id));
    }

    doc.appendChild(row);

    row = document.createElement('tr');
    row.appendChild(ChannelContent_createFallow('1_0',
        Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelLogo));
    doc.appendChild(row);

    ChannelContent_loadDataSuccessFinish();
}

//TODO revise this functions there is too many
function ChannelContent_createCell(id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    ChannelContent_thumbnail = preview_thumbnail.replace("{width}x{height}", Main_VideoSize);

    Main_td = document.createElement('td');
    Main_td.setAttribute('id', ChannelContent_ids[8] + id);
    Main_td.setAttribute(Main_DataAttribute, channel_name);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = '<div id="' + ChannelContent_ids[0] + id + '" class="stream_thumbnail_video" >' +
        '<img id="' + ChannelContent_ids[1] + id + '" class="stream_img"></div>' +
        '<div id="' + ChannelContent_ids[2] + id + '" class="stream_text">' +
        '<div id="' + ChannelContent_ids[3] + id + '" class="stream_channel" style="width: 66%; display: inline-block;">' +
        '<i class="icon-circle" style="color: ' +
        (ChannelContent_TargetId !== undefined ? '#FED000' : 'red') + '; font-size: 90%; aria-hidden="true"></i> ' + STR_SPACE +
        channel_display_name + '</div>' +
        '<div id="' + ChannelContent_ids[7] + id + '"class="stream_info" style="width:33%; float: right; text-align: right; display: inline-block;">' +
        quality + '</div>' +
        '<div id="' + ChannelContent_ids[4] + id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + ChannelContent_ids[5] + id + '"class="stream_info">' + STR_PLAYING + stream_game + '</div>' +
        '<div id="' + ChannelContent_ids[6] + id + '"class="stream_info">' + viwers + '</div>' + '</div>';

    return Main_td;
}

function ChannelContent_createChannelCell(id, user_name, stream_type, icons) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', ChannelContent_ids[8] + id);
    Main_td.setAttribute(Main_DataAttribute, user_name);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = '<div id="' + ChannelContent_ids[0] + id + '" class="stream_thumbnail_video" ><div id="' +
        ChannelContent_ids[1] + id +
        '" class="stream_channel_content_icon"><i class="icon-' + icons + '"></i></div></div>' +
        '<div id="' + ChannelContent_ids[2] + id + '" class="stream_text">' +
        '<div id="' + ChannelContent_ids[3] + id + '" class="stream_channel" style="text-align: center">' + stream_type +
        '</div></div>';

    return Main_td;
}

function ChannelContent_createFallow(id, user_name, stream_type, preview_thumbnail) {
    ChannelContent_thumbnail_fallow = preview_thumbnail;
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', ChannelContent_ids[8] + id);
    Main_td.setAttribute(Main_DataAttribute, user_name);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = '<div id="' + ChannelContent_ids[0] + id +
        '" class="stream_thumbnail_video" ><div id="schannel_cont_heart" style="position: absolute; top: 5%; left: 6%;"></div><img id="' +
        ChannelContent_ids[1] + id + '" class="stream_img_fallow"></div>' +
        '<div id="' + ChannelContent_ids[2] + id + '" class="stream_text">' +
        '<div id="' + ChannelContent_ids[3] + id + '" class="stream_channel">' + stream_type + '</div>' +
        '<div id="' + ChannelContent_ids[5] + id + '"class="stream_info">' + Main_addCommas(ChannelContent_selectedChannelViews) +
        STR_VIEWS + '</div>' +
        '<div id="' + ChannelContent_ids[6] + id + '"class="stream_info" >' + Main_addCommas(ChannelContent_selectedChannelFallower) +
        STR_FALLOWERS + '</div></div>';

    return Main_td;
}

function ChannelContent_setFallow() {
    if (AddCode_IsFallowing) {
        Main_innerHTML("schannel_cont_heart", '<i class="icon-heart" style="color: #00b300; font-size: 600%; text-shadow: #FFFFFF 0 0 10px, #FFFFFF 0 0 10px, #FFFFFF 0 0 8px;"></i>');
        Main_textContent(ChannelContent_ids[3] + "1_0", Main_values.Main_selectedChannelDisplayname + STR_FALLOWING);
    } else {
        Main_innerHTML("schannel_cont_heart", '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 600%; text-shadow: #000000 0 0 10px, #000000 0 0 10px, #000000 0 0 8px;"></i>');
        if (AddUser_UserIsSet()) Main_textContent(ChannelContent_ids[3] + "1_0", Main_values.Main_selectedChannelDisplayname + STR_FALLOW);
        else Main_textContent(ChannelContent_ids[3] + "1_0", Main_values.Main_selectedChannelDisplayname + STR_CANT_FALLOW);
    }
}

function ChannelContent_loadDataSuccessFinish() {
    if (!ChannelContent_status) {
        ChannelContent_status = true;
        if (ChannelContent_thumbnail !== '')
            Main_loadImg(document.getElementById(ChannelContent_ids[1] + '0_0'),
                ChannelContent_thumbnail, IMG_404_VIDEO);
        Main_loadImg(document.getElementById(ChannelContent_ids[1] + '1_0'), ChannelContent_thumbnail_fallow, IMG_404_LOGO);
        ChannelContent_addFocus();
        Main_SaveValues();
        Main_ShowElement(ChannelContent_ids[10]);
        Main_HideLoadDialog();
    }
    ChannelContent_checkUser();
    Main_FirstLoad = false;
}

function ChannelContent_checkUser() {
    if (ChannelContent_UserChannels) ChannelContent_setFallow();
    else if (AddUser_UserIsSet()) {
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
        AddCode_PlayRequest = false;
        AddCode_CheckFallow();
    } else {
        AddCode_IsFallowing = false;
        ChannelContent_setFallow();
    }
}

function ChannelContent_addFocus() {
    Main_AddClass(ChannelContent_ids[0] +
        ChannelContent_cursorY + '_' + (!ChannelContent_cursorY ? ChannelContent_cursorX : 0), Main_classThumb);
    if (Main_CenterLablesInUse) ChannelContent_removeFocus();
    Main_handleKeyUp();
}

function ChannelContent_removeFocus() {
    Main_removeFocus(ChannelContent_cursorY + '_' + (!ChannelContent_cursorY ? ChannelContent_cursorX : 0), ChannelContent_ids);
}

function ChannelContent_keyEnter() {
    if (ChannelContent_cursorY) {
        if (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token) {
            AddCode_PlayRequest = false;
            AddCode_Channel_id = Main_values.Main_selectedChannel_id;
            if (AddCode_IsFallowing) AddCode_UnFallow();
            else AddCode_Fallow();
        } else {
            Main_showWarningDialog(STR_NOKEY_WARN);
            window.setTimeout(Main_HideWarningDialog, 2000);
        }
    } else {
        document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
        Main_HideElement(ChannelContent_ids[10]);
        var value = (!ChannelContent_skipImg ? 0 : 1);
        if (ChannelContent_cursorX === (0 - value)) {

            Main_values.Play_selectedChannel = document.getElementById(ChannelContent_ids[8] + ChannelContent_cursorY +
                '_' + ChannelContent_cursorX).getAttribute(Main_DataAttribute);

            Main_values.Play_selectedChannelDisplayname = document.getElementById(ChannelContent_ids[3] + ChannelContent_cursorY +
                '_' + ChannelContent_cursorX).textContent;

            if (Main_values.Play_selectedChannelDisplayname.indexOf(STR_USER_HOSTING) !== -1) {
                Main_values.Play_isHost = true;
                Main_values.Play_DisplaynameHost = Main_values.Play_selectedChannelDisplayname;
                Main_values.Play_selectedChannelDisplayname = Main_values.Play_selectedChannelDisplayname.split(STR_USER_HOSTING)[1];
                Main_values.Play_selectedChannel_id = ChannelContent_TargetId;
            } else Main_values.Play_selectedChannel_id = Main_values.Main_selectedChannel_id;

            Main_values.Play_gameSelected = document.getElementById(ChannelContent_ids[5] + ChannelContent_cursorY + '_' + ChannelContent_cursorX).textContent.split(STR_PLAYING)[1];

            Main_ready(Main_openStream);
        } else if (ChannelContent_cursorX === (1 - value)) Main_ready(ChannelVod_init);
        else if (ChannelContent_cursorX === (2 - value)) {
            inUseObj = ChannelClip;
            Main_ready(Screens_init);
        }
    }
}

function ChannelContent_SetChannelValue() {
    ChannelContent_ChannelValue = {
        "Main_values.Main_selectedChannel_id": Main_values.Main_selectedChannel_id,
        "Main_values.Main_selectedChannelLogo": Main_values.Main_selectedChannelLogo,
        "Main_values.Main_selectedChannel": Main_values.Main_selectedChannel,
        "Main_values.Main_selectedChannelDisplayname": Main_values.Main_selectedChannelDisplayname,
        "ChannelContent_UserChannels": ChannelContent_UserChannels,
        "Main_values.Main_BeforeChannel": Main_values.Main_BeforeChannel
    };
}

function ChannelContent_RestoreChannelValue() {
    Main_values.Main_selectedChannel_id = Main_values.Main_selectedChannel_id;
    Main_values.Main_selectedChannelLogo = Main_values.Main_selectedChannelLogo;
    Main_values.Main_selectedChannel = Main_values.Main_selectedChannel;
    Main_values.Main_selectedChannelDisplayname = Main_values.Main_selectedChannelDisplayname;
    ChannelContent_UserChannels = ChannelContent_ChannelValue.ChannelContent_UserChannels;
    Main_values.Main_BeforeChannel = Main_values.Main_BeforeChannel;
    ChannelContent_ChannelValue = {};
    ChannelContent_ChannelValueIsset = false;
}

function ChannelContent_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                ChannelContent_removeFocus();
                Main_CenterLablesStart(ChannelContent_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (!ChannelContent_cursorY) {
                ChannelContent_removeFocus();
                ChannelContent_cursorX--;
                if (ChannelContent_cursorX < 0) ChannelContent_cursorX = (!ChannelContent_skipImg ? 2 : 1);
                ChannelContent_addFocus();
            }
            break;
        case KEY_RIGHT:
            if (!ChannelContent_cursorY) {
                ChannelContent_removeFocus();
                ChannelContent_cursorX++;
                if (ChannelContent_cursorX > (!ChannelContent_skipImg ? 2 : 1)) ChannelContent_cursorX = 0;
                ChannelContent_addFocus();
            }
            break;
        case KEY_UP:
        case KEY_DOWN:
            ChannelContent_removeFocus();
            ChannelContent_cursorY = !ChannelContent_cursorY ? 1 : 0;
            ChannelContent_addFocus();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            ChannelContent_keyEnter();
            break;
        default:
            break;
    }
}//Variable initialization
var ChannelVod_cursorY = 0;
var ChannelVod_cursorX = 0;
var ChannelVod_dataEnded = false;
var ChannelVod_itemsCount = 0;
var ChannelVod_idObject = {};
var ChannelVod_emptyCellVector = [];
var ChannelVod_loadingData = false;
var ChannelVod_loadingDataTry = 0;
var ChannelVod_loadingDataTryMax = 5;
var ChannelVod_loadingDataTimeout = 3500;
var ChannelVod_itemsCountOffset = 0;
var ChannelVod_MaxOffset = 0;
var ChannelVod_DurationSeconds = 0;
var ChannelVod_emptyContent = false;
var ChannelVod_itemsCountCheck = false;
var ChannelVod_language = '';
var ChannelVod_TopRowCreated = false;

var ChannelVod_ids = ['cv_thumbdiv', 'cv_img', 'cv_infodiv', 'cv_title', 'cv_streamon', 'cv_duration', 'cv_viwers', 'cv_quality', 'cv_cell', 'cvempty_', 'channel_vod_scroll', 'cv_game'];
var ChannelVod_status = false;
var ChannelVod_highlight = false;
var ChannelVod_lastselectedChannel = '';
var ChannelVod_title = '';
var ChannelVod_views = '';
var ChannelVod_createdAt = '';
var ChannelVod_Duration = '';
var ChannelVod_vodOffset = 0;
//Variable initialization end

function ChannelVod_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_ChannelVod;
    if (!Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
    if (Main_values.Main_selectedChannel !== ChannelVod_lastselectedChannel) ChannelVod_status = false;
    Main_cleanTopLabel();
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
    Main_textContent('top_bar_user', Main_values.Main_selectedChannelDisplayname);
    document.body.addEventListener("keydown", ChannelVod_handleKeyDown, false);
    if (ChannelVod_status) {
        Main_YRst(ChannelVod_cursorY);
        Main_textContent('top_bar_game', ChannelVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA);
        Main_ShowElement(ChannelVod_ids[10]);
        ChannelVod_addFocus();
        Main_SaveValues();
    } else ChannelVod_StartLoad();
}

function ChannelVod_exit() {
    if (ChannelVod_status) ChannelVod_removeFocus();
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", ChannelVod_handleKeyDown);
    Main_HideElement(ChannelVod_ids[10]);
}

function ChannelVod_StartLoad() {
    if (ChannelVod_status) ChannelVod_removeFocus();
    Main_empty('stream_table_channel_vod');
    Main_HideElement(ChannelVod_ids[10]);
    Main_textContent('top_bar_game', ChannelVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    ChannelVod_lastselectedChannel = Main_values.Main_selectedChannel;
    ChannelVod_status = false;
    ChannelVod_itemsCountOffset = 0;
    ChannelVod_MaxOffset = 0;
    ChannelVod_TopRowCreated = false;
    ChannelVod_idObject = {};
    ChannelVod_emptyCellVector = [];
    ChannelVod_itemsCountCheck = false;
    Main_FirstLoad = true;
    ChannelVod_itemsCount = 0;
    ChannelVod_cursorX = 0;
    ChannelVod_cursorY = 0;
    ChannelVod_dataEnded = false;
    Main_CounterDialogRst();
    ChannelVod_loadDataPrepare();
    ChannelVod_loadDataRequest();
}

function ChannelVod_loadDataPrepare() {
    Main_imgVectorRst();
    ChannelVod_loadingData = true;
    ChannelVod_loadingDataTry = 0;
    ChannelVod_loadingDataTimeout = 3500;
}

function ChannelVod_loadDataRequest() {

    var offset = ChannelVod_itemsCount + ChannelVod_itemsCountOffset;
    if (offset && offset > (ChannelVod_MaxOffset - 1)) {
        offset = ChannelVod_MaxOffset - Main_ItemsLimitVideo;
        ChannelVod_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/channels/' +
        encodeURIComponent(Main_values.Main_selectedChannel_id) + '/videos?limit=' + Main_ItemsLimitVideo +
        '&broadcast_type=' + (ChannelVod_highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + offset;

    BasehttpGet(theUrl, ChannelVod_loadingDataTimeout, 2, null, ChannelVod_loadDataSuccess, ChannelVod_loadDataError);
}

function ChannelVod_loadDataError() {
    ChannelVod_loadingDataTry++;
    if (ChannelVod_loadingDataTry < ChannelVod_loadingDataTryMax) {
        ChannelVod_loadingDataTimeout += 500;
        ChannelVod_loadDataRequest();
    } else {
        ChannelVod_loadingData = false;
        if (!ChannelVod_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            ChannelVod_dataEnded = true;
            ChannelVod_loadDataSuccessFinish();
        }
    }
}

function ChannelVod_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.videos.length;
    ChannelVod_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) ChannelVod_dataEnded = true;

    var offset_itemsCount = ChannelVod_itemsCount;
    ChannelVod_itemsCount += response_items;

    ChannelVod_emptyContent = !ChannelVod_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, video, id,
        cursor = 0,
        thumbnail_404, thumbnail,
        doc = document.getElementById("stream_table_channel_vod");

    // Make the game video/clip/fallowing cell
    if (!ChannelVod_TopRowCreated) {
        ChannelVod_TopRowCreated = true;
        row = document.createElement('tr');
        var thumbfallow = '<i class="icon-movie-play stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_SWITCH_VOD;
        Main_td = document.createElement('td');
        Main_td.setAttribute('id', ChannelVod_ids[8] + 'y_0');
        Main_td.className = 'stream_cell';
        Main_td.innerHTML = '<div id="' + ChannelVod_ids[0] +
            'y_0" class="stream_thumbnail_channel_vod" ><div id="' + ChannelVod_ids[3] +
            'y_0" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
        row.appendChild(Main_td);
        doc.appendChild(row);
    }

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.videos[cursor];
            id = video._id;
            thumbnail = video.preview.template;
            thumbnail_404 = (thumbnail + '').indexOf('404_processing') !== -1;

            // video content can be null sometimes, in that case the preview will be 404_processing
            // but if the video is from the stream that has not yet ended it can also be 404_processing and not be a null video
            if (!row_id && !coloumn_id && thumbnail_404) {
                thumbnail_404 = false;
                thumbnail = IMG_404_VIDEO;
            }

            if (thumbnail_404 || ChannelVod_idObject[id]) coloumn_id--;
            else {
                ChannelVod_idObject[id] = 1;
                row.appendChild(Vod_createCell(row_id, row_id + '_' + coloumn_id,
                    [id, video.length, video.channel.broadcaster_language, video.game, video.channel.name, video.increment_view_count_url],
                    [thumbnail.replace("{width}x{height}", Main_VideoSize),
                        twemoji.parse(video.title), STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                        STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                        Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.channel.broadcaster_language),
                        STR_DURATION + Play_timeS(video.length), video.animated_preview_url
                    ], ChannelVod_ids));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (ChannelVod_dataEnded && !ChannelVod_itemsCountCheck) {
                ChannelVod_itemsCountCheck = true;
                ChannelVod_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(ChannelVod_ids[9] + row_id + '_' + coloumn_id));
            ChannelVod_emptyCellVector.push(ChannelVod_ids[9] + row_id + '_' + coloumn_id);
        }
        doc.appendChild(row);
    }

    ChannelVod_loadDataSuccessFinish();
}

function ChannelVod_loadDataSuccessFinish() {
    if (!ChannelVod_status) {
        if (ChannelVod_emptyContent) Main_showWarningDialog(STR_NO + (ChannelVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_FOR_THIS + STR_CHANNEL);
        else {
            ChannelVod_status = true;
            Main_imgVectorLoad(IMG_404_VIDEO);
            ChannelVod_addFocus();
            Main_SaveValues();
        }
        Main_ShowElement(ChannelVod_ids[10]);
        Main_FirstLoad = false;
        Main_HideLoadDialog();
    } else {
        Main_CounterDialog(ChannelVod_cursorX, ChannelVod_cursorY, Main_ColoumnsCountVideo, ChannelVod_itemsCount);
        Main_imgVectorLoad(IMG_404_VIDEO);
    }

    if (ChannelVod_emptyCellVector.length > 0 && !ChannelVod_dataEnded) {
        ChannelVod_loadDataPrepare();
        ChannelVod_loadDataReplace();
        return;
    } else ChannelVod_emptyCellVector = [];

    ChannelVod_loadingData = false;
}

function ChannelVod_loadDataReplace() {
    Main_SetItemsLimitReplace(ChannelVod_emptyCellVector.length);

    var offset = ChannelVod_itemsCount + ChannelVod_itemsCountOffset;

    if (offset && offset > (ChannelVod_MaxOffset - 1)) {
        offset = ChannelVod_MaxOffset - Main_ItemsLimitReplace;
        ChannelVod_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/channels/' +
        encodeURIComponent(Main_values.Main_selectedChannel_id) + '/videos?limit=' + Main_ItemsLimitReplace + '&broadcast_type=' +
        (ChannelVod_highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + offset;

    BasehttpGet(theUrl, ChannelVod_loadingDataTimeout, 2, null, ChannelVod_loadDataSuccessReplace, ChannelVod_loadDataErrorReplace);
}

function ChannelVod_loadDataErrorReplace() {
    ChannelVod_loadingDataTry++;
    if (ChannelVod_loadingDataTry < ChannelVod_loadingDataTryMax) {
        ChannelVod_loadingDataTimeout += 500;
        ChannelVod_loadDataReplace();
    } else {
        ChannelVod_dataEnded = true;
        ChannelVod_itemsCount -= ChannelVod_emptyCellVector.length;
        ChannelVod_emptyCellVector = [];
        ChannelVod_loadDataSuccessFinish();
    }
}


function ChannelVod_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.videos.length,
        video, id, i = 0,
        cursor = 0,
        tempVector = [];

    ChannelVod_MaxOffset = parseInt(response._total);

    for (i; i < ChannelVod_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.videos[cursor];
        id = video._id;
        if ((video.preview.template + '').indexOf('404_processing') !== -1 || ChannelVod_idObject[id]) i--;
        else {
            ChannelVod_idObject[id] = 1;
            Vod_replaceVideo(ChannelVod_emptyCellVector[i],
                [id, video.length, video.channel.broadcaster_language, video.game, video.channel.name, video.increment_view_count_url],
                [video.preview.template.replace("{width}x{height}", Main_VideoSize),
                    twemoji.parse(video.title), STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                    STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                    Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.channel.broadcaster_language),
                    STR_DURATION + Play_timeS(video.length), video.animated_preview_url
                ], ChannelVod_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) ChannelVod_emptyCellVector.splice(tempVector[i], 1);

    ChannelVod_itemsCountOffset += cursor;
    if (ChannelVod_dataEnded) {
        ChannelVod_itemsCount -= ChannelVod_emptyCellVector.length;
        ChannelVod_emptyCellVector = [];
    }

    ChannelVod_loadDataSuccessFinish();
}

function ChannelVod_addFocus() {
    if (ChannelVod_cursorY < 0) {
        ChannelVod_addFocusFallow();
        return;
    }
    Main_addFocusVideo(ChannelVod_cursorY, ChannelVod_cursorX, ChannelVod_ids, Main_ColoumnsCountVideo, ChannelVod_itemsCount);

    Vod_AnimateThumb(ChannelVod_ids, ChannelVod_cursorY + '_' + ChannelVod_cursorX);

    if (((ChannelVod_cursorY + Main_ItemsReloadLimitVideo) > (ChannelVod_itemsCount / Main_ColoumnsCountVideo)) &&
        !ChannelVod_dataEnded && !ChannelVod_loadingData) {
        ChannelVod_loadDataPrepare();
        ChannelVod_loadDataRequest();
    }
    if (Main_CenterLablesInUse) ChannelVod_removeFocus();
}

function ChannelVod_removeFocus() {
    window.clearInterval(Vod_AnimateThumbId);
    if (ChannelVod_cursorY > -1 && ChannelVod_itemsCount) {
        Main_ShowElement(ChannelVod_ids[1] + ChannelVod_cursorY + '_' + ChannelVod_cursorX);
        Main_removeFocus(ChannelVod_cursorY + '_' + ChannelVod_cursorX, ChannelVod_ids);
    } else ChannelVod_removeFocusFallow();
}

function ChannelVod_addFocusFallow() {
    Main_AddClass(ChannelVod_ids[0] + 'y_0', Main_classThumb);
}

function ChannelVod_removeFocusFallow() {
    Main_RemoveClass(ChannelVod_ids[0] + 'y_0', Main_classThumb);
}

function ChannelVod_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                ChannelVod_removeFocus();
                Main_CenterLablesStart(ChannelVod_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((ChannelVod_cursorY), (ChannelVod_cursorX - 1), ChannelVod_ids[0])) {
                ChannelVod_removeFocus();
                ChannelVod_cursorX--;
                ChannelVod_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((ChannelVod_cursorY - 1), i, ChannelVod_ids[0])) {
                        ChannelVod_removeFocus();
                        ChannelVod_cursorY--;
                        ChannelVod_cursorX = i;
                        ChannelVod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((ChannelVod_cursorY), (ChannelVod_cursorX + 1), ChannelVod_ids[0])) {
                ChannelVod_removeFocus();
                ChannelVod_cursorX++;
                ChannelVod_addFocus();
            } else if (Main_ThumbNull((ChannelVod_cursorY + 1), 0, ChannelVod_ids[0])) {
                ChannelVod_removeFocus();
                ChannelVod_cursorY++;
                ChannelVod_cursorX = 0;
                ChannelVod_addFocus();
            }
            break;
        case KEY_UP:
            if (ChannelVod_cursorY === -1 && !ChannelVod_emptyContent) {
                ChannelVod_cursorY = 0;
                ChannelVod_removeFocusFallow();
                ChannelVod_addFocus();
            } else if (!ChannelVod_cursorY) {
                ChannelVod_removeFocus();
                ChannelVod_cursorY = -1;
                ChannelVod_addFocusFallow();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((ChannelVod_cursorY - 1), (ChannelVod_cursorX - i), ChannelVod_ids[0])) {
                        ChannelVod_removeFocus();
                        ChannelVod_cursorY--;
                        ChannelVod_cursorX = ChannelVod_cursorX - i;
                        ChannelVod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_DOWN:
            if (ChannelVod_cursorY === -1 && !ChannelVod_emptyContent) {
                ChannelVod_cursorY = 0;
                ChannelVod_removeFocusFallow();
                ChannelVod_addFocus();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((ChannelVod_cursorY + 1), (ChannelVod_cursorX - i), ChannelVod_ids[0])) {
                        ChannelVod_removeFocus();
                        ChannelVod_cursorY++;
                        ChannelVod_cursorX = ChannelVod_cursorX - i;
                        ChannelVod_addFocus();
                        break;
                    }
                }

            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (ChannelVod_cursorY === -1) {
                ChannelVod_highlight = !ChannelVod_highlight;
                Main_setItem('ChannelVod_highlight', ChannelVod_highlight ? 'true' : 'false');
                ChannelVod_StartLoad();
            } else Main_OpenVod(ChannelVod_cursorY + '_' + ChannelVod_cursorX, ChannelVod_ids, ChannelVod_handleKeyDown);
            break;
        default:
            break;
    }
}//Variable initialization
var Main_isReleased = false;
var Main_isBrowser = false;
var Main_isDebug = false;

var Main_cursorYAddFocus = -1;
var Main_newImg = new Image();

var Main_Live = 1;
var Main_addUser = 2;
var Main_games = 3;
var Main_aGame = 4;
var Main_UserLive = 5;
var Main_UserHost = 6;
var Main_usergames = 7;
var Main_Search = 8;
var Main_SearchGames = 9;
var Main_SearchLive = 10;
var Main_ChannelContent = 11;
var Main_ChannelVod = 12;
var Main_ChannelClip = 13;
var Main_Users = 14;
var Main_UserChannels = 15;
var Main_SearchChannels = 16;
var Main_Vod = 17;
var Main_Clip = 18;
var Main_AGameVod = 19;
var Main_AGameClip = 20;
var Main_Featured = 21;
var Main_UserVod = 22;

var Main_GoBefore = '';
var Main_values = {
    "Main_Go": 1,
    "Main_Before": 1,
    "Main_BeforeSearch": 1,
    "Main_BeforeChannel": 1,
    "Main_BeforeAgame": Main_games,
    "Main_BeforeChannelisSet": false,
    "Main_BeforeAgameisSet": false,
    "Main_selectedChannel": '',
    "Main_selectedChannelDisplayname": '',
    "Main_selectedChannelLogo": '',
    "Main_selectedChannel_id": '',
    "Main_gameSelected": '',
    "Main_OldgameSelected": null,
    "Play_isHost": false,
    "Play_DisplaynameHost": '',
    "Play_selectedChannelDisplayname": '',
    "Play_selectedChannel": '',
    "Play_gameSelected": '',
    "Users_Position": 0,
    "Users_AddcodePosition": 0,
    "Play_WasPlaying": 0,
    "ChannelVod_vodId": '',
    "vodOffset": 0,
    "Search_data": '',
    "isLastSChannels": false,
    "gameSelectedOld": '',
    "Games_return": false,
    "Search_isSearching": false,
    "Play_ChatForceDisable": false,
    "Never_run": true,
    "Main_CenterLablesVectorPos": 0
};

var Main_LastClickFinish = true;
var Main_addFocusFinish = true;
var Main_CenterLablesInUse = false;
var Main_imgVector = [];
var Main_newUsercode = 0;
var Main_ExitCursor = 0;
var Main_ExitDialogID = null;
var Main_ScrollbarIsHide = true;
var Main_td = '';
var Main_IsDayFirst = false;
var Main_ScrollbarElement;
var Main_SearchInput;
var Main_AddUserInput;
var Main_SetTopOpacityId;
var Main_updateclockId;
var Main_ContentLang = "";
var Main_OpacityDivs = ["label_side_panel", "label_refresh", "top_bar_live", "top_bar_user", "top_bar_featured", "top_bar_game", "top_bar_vod", "top_bar_clip"];
var Main_Periods = [];
var Main_addFocusVideoOffset = 0;
var Main_FirstRun = true;

var Main_SidePannelPos = 0;
var Main_SidePannelCallback;

//The values of thumbnail and related for it screen type
var Main_ReloadLimitOffsetGames = 1.35;
var Main_ReloadLimitOffsetVideos = 1.5;

var Main_ItemsLimitVideo = 45;
var Main_ColoumnsCountVideo = 3;
var Main_ItemsReloadLimitVideo = Math.floor((Main_ItemsLimitVideo / Main_ColoumnsCountVideo) / Main_ReloadLimitOffsetVideos);

var Main_ItemsLimitGame = 45;
var Main_ColoumnsCountGame = 5;
var Main_ItemsReloadLimitGame = Math.floor((Main_ItemsLimitGame / Main_ColoumnsCountGame) / Main_ReloadLimitOffsetGames);

var Main_ItemsLimitChannel = 48;
var Main_ColoumnsCountChannel = 6;
var Main_ItemsReloadLimitChannel = Math.floor((Main_ItemsLimitChannel / Main_ColoumnsCountChannel) / Main_ReloadLimitOffsetVideos);

// How many streams will be request on a reload
var Main_ItemsLimitReplace = 6;

var Main_clientId = "5seja5ptej058mxqy7gh5tcudjqtm9";
var Main_clientIdHeader = 'Client-ID';
var Main_AcceptHeader = 'Accept';
var Main_Authorization = 'Authorization';
var Main_OAuth = 'OAuth ';
var Main_TwithcV5Json = 'application/vnd.twitchtv.v5+json';
var Main_VideoSize = "528x297"; // default size 640x360
var Main_GameSize = "340x475"; // default size 272x380

var Main_classThumb = 'stream_thumbnail_focused';
var Main_DataAttribute = 'data_attribute';

var Main_stringVersion = '1.0';
var Main_stringVersion_Min = '.15';
var Main_minversion = '042919';
var Main_versionTag = Main_stringVersion + Main_stringVersion_Min + '-' + Main_minversion;
var Main_ClockOffset = 0;
var Main_Android = 0;
var Main_randomimg = '?' + Math.random();
var ASSETS = "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/";
var IMG_404_GAME = ASSETS + "404_game.png";
var IMG_404_LOGO = ASSETS + "404_logo.png";
var IMG_404_VIDEO = ASSETS + "404_video.png";
var proxyurl = "https://cors-anywhere.herokuapp.com/";
var Main_updateUserFeedId;

//function vars
var Main_loadImg = function(ImgObjet, Src, img_type) {
    ImgObjet.onerror = function() {
        this.src = img_type; //img fail to load use predefined
    };
    ImgObjet.src = Src;
};
//Variable initialization end

// this function will be called only once the first time the app startup
Main_Start();

function Main_Start() {
    Main_isDebug = Main_getItemBool('Main_isDebug', false);
    if (Main_isDebug && Main_isReleased) Main_Debug();
    else if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function() {
            Main_loadTranslations(window.navigator.userLanguage || window.navigator.language);
        });
    } else { // `DOMContentLoaded` already fired
        Main_loadTranslations(window.navigator.userLanguage || window.navigator.language);
    }
}

function Main_Debug() { // jshint ignore:line
    console.log("Debug mod start");
    var script = document.createElement('script');
    script.src = "https://fgl27.github.io/SmartTwitchTV/release/githubio/js/masterdebug.js";
    document.head.appendChild(script);
}

function Main_loadTranslations(language) {
    Main_Checktylesheet();

    Main_ready(function() {
        try {
            Main_Android = Android.getAndroid();
            if (Main_Android) {
                ASSETS = "file:///android_asset/";
                IMG_404_GAME = ASSETS + "404_game.png";
                IMG_404_LOGO = ASSETS + "404_logo.png";
                IMG_404_VIDEO = ASSETS + "404_video.png";
            }
        } catch (e) {
            Main_Android = 0;
            document.body.style.backgroundColor = "rgba(0, 0, 0, 1)";
            Main_isDebug = true;
            Main_isBrowser = true;
            console.log('Main_isReleased: ' + Main_isReleased);
            console.log('Main_isDebug: ' + Main_isDebug);
            console.log('Main_isBrowser: ' + Main_isBrowser);
        }

        Settings_SetDefautls();
        en_USLang();

        // Language is set as (LANGUAGE)_(REGION) in (ISO 639-1)_(ISO 3166-1 alpha-2) eg.; pt_BR Brazil, en_US USA
        // https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
        // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

        //var lang = language,
        //    Savedlang = Main_getItemInt('user_language', 0);

        //if (Savedlang) lang = Settings_Obj_set_values("general_lang");
        //else Settings_CheckLang(lang);

        //if (lang.indexOf('pt_') !== -1) pt_BRLang();
        //else if (lang.indexOf('it_') !== -1) it_ITLang();

        console.log("language is " + language);
        DefaultLang();

        if (window.location.href.indexOf('code') !== -1) processCode(window.location.href);

        Main_initWindows();
    });

}

function Main_initWindows() {
    Screens_InitScreens();
    Main_SetStringsMain(true);

    Main_ScrollbarElement = document.getElementById("scrollbar");
    Main_RestoreValues();
    Main_GoBefore = Main_values.Main_Go;

    Main_ready(function() {

        Chat_Preinit();
        Play_PreStart();
        AddUser_RestoreUsers();
        if (AddUser_UserIsSet()) {
            Main_updateUserFeedId = window.setInterval(Main_updateUserFeed, 600000);
            Main_updateUserFeed();
        }
        document.body.addEventListener("keyup", Main_handleKeyUp, false);
        Screens_InitSecondaryScreens();

        document.getElementById("side_panel").style.marginLeft = '';

        Main_checkVersion();

        Main_SetStringsSecondary();

        Vod_highlight = Main_getItemBool('Vod_highlight', false);
        ChannelVod_highlight = Main_getItemBool('ChannelVod_highlight', false);
        AGameVod_highlight = Main_getItemBool('AGameVod_highlight', false);
        UserVod_highlight = Main_getItemBool('UserVod_highlight', false);

        Vod_periodNumber = Main_getItemInt('vod_periodNumber', 2);
        AGameVod_periodNumber = Main_getItemInt('AGameVod_periodNumber', 2);
        UserVod_TypeNumber = Main_getItemInt('UserVod_TypeNumber', 1);

        PlayVod_RestoreVodIds();

        Main_SearchInput = document.getElementById("search_input");
        Main_AddUserInput = document.getElementById("user_input");

        // pre load All img
        Main_CacheImage(IMG_404_VIDEO);
        Main_CacheImage(IMG_404_GAME);
        Main_CacheImage(IMG_404_LOGO);

        document.addEventListener('visibilitychange', Main_Resume, false);
        Main_updateclockId = window.setInterval(Main_updateclock, 60000);

        inUseObj = Live;
        Screens_init();
        Main_SetTopOpacityId = window.setTimeout(Main_SetTopOpacity, 5000);
        Main_ShowElement('topbar');
    });
}

function Main_SetStringsMain(isStarting) {
    Main_updateclock();

    //set top bar labels
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    Main_innerHTML('label_update', '<div class="strokedextramini" style="vertical-align: middle; display: inline-block;"><i class="icon-arrow-up" style="color: #FF0000; font-size: 115%; "></i></div><div class="strokedextramini" style="vertical-align: middle; display: inline-block; color: #FF0000">' + STR_SPACE + STR_UPDATE_AVAILABLE + '</div>');

    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
    Main_IconLoad('icon_feed_refresh', 'icon-refresh', STR_REFRESH + ' Press up');

    Main_textContent('top_bar_live', STR_LIVE);
    Main_textContent('top_bar_user', isStarting ? STR_USER : STR_SETTINGS);
    Main_textContent('top_bar_featured', STR_FEATURED);
    Main_textContent('top_bar_game', STR_GAMES);
    Main_textContent('top_bar_vod', STR_VIDEOS);
    Main_textContent('top_bar_clip', STR_CLIPS);

    Main_innerHTML("scene2_search_text", STR_SPACE + STR_SEARCH);
    Main_innerHTML("scene2_channel_text", STR_SPACE + STR_CHANNEL_CONT);
    Main_innerHTML("scene2_game_text", STR_SPACE + STR_GAME_CONT);

    Main_textContent("dialog_end_replay_text", STR_REPLAY);
    Main_textContent("dialog_end_vod_text", STR_OPEN_BROADCAST);
    Main_textContent("dialog_end_channel_text", STR_CHANNEL_CONT);
    Main_textContent("dialog_end_game_text", STR_GAME_CONT);
    Main_innerHTML("dialog_about_text", STR_ABOUT_INFO_HEADER + STR_ABOUT_INFO_0);
    Main_Periods = [STR_CLIP_DAY, STR_CLIP_WEEK, STR_CLIP_MONTH, STR_CLIP_ALL];

    if (isStarting) Settings_SetSettings();
    else {
        Settings_SetStrings();
        Main_checkVersion();
    }
}

function Main_SetStringsSecondary() {
    Main_textContent("play_dialog_exit_text", STR_EXIT_AGAIN);

    Main_textContent('side_panel_search', STR_SEARCH);
    Main_textContent('side_panel_settings', STR_SETTINGS);
    Main_textContent('side_panel_about', STR_ABOUT);
    Main_textContent('side_panel_controls', STR_CONTROLS);
    Main_textContent('side_panel_exit', STR_EXIT);

    Main_textContent('side_panel_live', STR_LIVE);
    Main_textContent('side_panel_user', STR_USER);
    Main_textContent('side_panel_featured', STR_FEATURED);
    Main_textContent('side_panel_games', STR_GAMES);
    Main_textContent('side_panel_videos', STR_VIDEOS);
    Main_textContent('side_panel_clips', STR_CLIPS);
    Main_textContent('side_panel_hide', STR_HIDE);

    Main_textContent('chanel_button', STR_CHANNELS);
    Main_textContent('game_button', STR_GAMES);
    Main_textContent('live_button', STR_LIVE);
    Main_textContent('exit_app_cancel', STR_CANCEL);
    Main_textContent('exit_app_close', STR_CLOSE);
    Main_textContent('remove_cancel', STR_CANCEL);
    Main_textContent('remove_yes', STR_YES);
    Main_textContent('exit_app_minimize', STR_MINIMIZE);
    Main_textContent("main_dialog_exit_text", STR_EXIT_MESSAGE);

    Main_innerHTML("dialog_controls_text", STR_CONTROLS_MAIN_0);

    Main_textContent("dialog_vod_text", STR_VOD_HISTORY);
    Main_innerHTML("dialog_vod_start_text", STR_FROM_START);

}

function Main_IconLoad(lable, icon, string) {
    Main_innerHTML(lable, '<div class="strokedextramini" style="vertical-align: middle; display: inline-block;"><i class="' + icon + '" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedextramini" style="vertical-align: middle; display: inline-block">' + STR_SPACE + string + '</div>');
}

function Main_HideElement(element) {
    document.getElementById(element).classList.add('hide');
}

function Main_ShowElement(element) {
    document.getElementById(element).classList.remove('hide');
}

function Main_isElementShowing(element) {
    return document.getElementById(element).className.indexOf('hide') === -1;
}

function Main_AddClass(element, mclass) {
    document.getElementById(element).classList.add(mclass);
}

function Main_RemoveClass(element, mclass) {
    document.getElementById(element).classList.remove(mclass);
}

function Main_innerHTML(div, value) {
    document.getElementById(div).innerHTML = value;
}

function Main_textContent(div, value) {
    document.getElementById(div).textContent = value;
}

function Main_showLoadDialog() {
    Main_YRst(-1);
    if (Main_Android) Android.mshowLoading(true);
    else Main_ShowElement('dialog_loading');
}

function Main_HideLoadDialog() {
    if (Main_Android) Android.mshowLoading(false);
    else Main_HideElement('dialog_loading');
}

function Main_clearExitDialog() {
    window.clearTimeout(Main_ExitDialogID);
}

function Main_setExitDialog() {
    Main_ExitDialogID = window.setTimeout(Main_HideExitDialog, 6000);
}

function Main_showExitDialog() {
    Main_setExitDialog();
    Main_ShowElement('main_dialog_exit');
    document.body.addEventListener("keydown", Main_ExitDialog, false);
}

function Main_HideExitDialog() {
    document.body.removeEventListener("keydown", Main_ExitDialog, false);
    Main_CenterLablesStart(Main_SidePannelCallback);
    Main_clearExitDialog();
    Main_HideElement('main_dialog_exit');
    Main_ExitCursor = 0;
    Main_ExitCursorSet();
}

function Main_ExitCursorSet() {
    Main_RemoveClass('exit_app_cancel', 'button_search_focused');
    Main_RemoveClass('exit_app_minimize', 'button_search_focused');
    Main_RemoveClass('exit_app_close', 'button_search_focused');
    if (!Main_ExitCursor) Main_AddClass('exit_app_cancel', 'button_search_focused');
    else if (Main_ExitCursor === 1) Main_AddClass('exit_app_minimize', 'button_search_focused');
    else Main_AddClass('exit_app_close', 'button_search_focused');
}

function Main_CounterDialogRst() {
    Main_empty('dialog_counter_text');
    Main_Scrollbar(0, 0, 0);
}

function Main_CounterDialog(x, y, coloumns, total) {
    if (total > 0) {
        Main_textContent('dialog_counter_text', (y * coloumns) + (x + 1) + '/' + (total));
        Main_Scrollbar(y, coloumns, total);
    } else Main_CounterDialogRst();
}

function Main_Scrollbar(y, coloumns, total) {
    var screen_size = ((screen.height / 100) * 7);
    //if show the scroll, else reset it's position and hide by setting it's color equal to parent background
    if ((coloumns === 3 && (total > 9)) || (coloumns === 5 && (total > 10)) || (coloumns === 6 && (total > 12))) {
        // min screen_size max screen.height - (screen_size * 3)
        var needExtraSpace = (Main_values.Main_Go === Main_aGame || Main_values.Main_Go === Main_AGameVod ||
            Main_values.Main_Go === Main_AGameClip || Main_values.Main_Go === Main_ChannelVod ||
            Main_values.Main_Go === Main_UserVod || Main_values.Main_Go === Main_Vod ||
            Main_values.Main_Go === Main_Clip || Main_values.Main_Go === Main_ChannelClip);
        var nextPositon = Math.ceil((screen.height - (screen_size * 3)) / (Math.ceil(total / coloumns) - 1) * y + (screen_size * (needExtraSpace ? 1.8 : 1)));
        Main_ScrollbarElement.style.top = nextPositon + "px";

        if (Main_ScrollbarIsHide) {
            Main_ScrollbarIsHide = false;
            Main_ScrollbarElement.style.backgroundColor = "#777777";
        }
    } else {
        Main_ScrollbarElement.style.backgroundColor = "#000000";
        Main_ScrollbarElement.style.top = screen_size + "px";
        Main_ScrollbarIsHide = true;
    }
}

function Main_SetItemsLimitReplace(blankCellCount) {
    Main_ItemsLimitReplace = 12;
    if (blankCellCount > (Main_ItemsLimitReplace / 3)) Main_ItemsLimitReplace = blankCellCount * 3;
    if (Main_ItemsLimitReplace > 99) Main_ItemsLimitReplace = 99;
}

function Main_showWarningDialog(text) {
    Main_textContent('dialog_warning_text', text);
    Main_ShowElement('dialog_warning');
}

function Main_HideWarningDialog() {
    Main_HideElement('dialog_warning');
}

function Main_showAboutDialog() {
    Main_HideControlsDialog();
    Main_ShowElement('dialog_about');
}

function Main_HideAboutDialog() {
    Main_HideElement('dialog_about');
}

function Main_isAboutDialogShown() {
    return Main_isElementShowing('dialog_about');
}

function Main_showSettings() {
    Main_HideControlsDialog();
    Main_HideWarningDialog();
    Main_ExitCurrent(Main_values.Main_Go);
    Main_CounterDialogRst();
    Settings_init();
}

function Main_showControlsDialog() {
    Main_HideAboutDialog();
    Main_ShowElement('dialog_controls');
}

function Main_HideControlsDialog() {
    Main_HideElement('dialog_controls');
}

function Main_isControlsDialogShown() {
    return Main_isElementShowing('dialog_controls');
}

function Main_addCommas(value) {
    return (value + '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Main_videoqualitylang(video_height, average_fps, language) {
    video_height = video_height + ''; //stringfy doesnot work 8|
    if (!video_height.indexOf('x')) video_height = video_height.slice(-3);

    if (average_fps > 58) average_fps = 60;
    else if (average_fps < 32) average_fps = 30;
    else average_fps = Math.ceil(average_fps);

    return video_height + 'p' + average_fps + ((language !== "") ? ' [' + language.toUpperCase() + ']' : '');
}

function Main_is_playlist(content) {
    return (content.indexOf('live') !== -1) ? '' : STR_NOT_LIVE;
}

function Main_ThumbNull(y, x, thumbnail) {
    return document.getElementById(thumbnail + y + '_' + x) !== null;
}

function Main_ReStartScreens() {
    Main_updateclock();
    Main_SwitchScreen();
    document.body.addEventListener("keyup", Main_handleKeyUp, false);
}

function Main_SetTopOpacity() {
    var elem, i = 0;
    for (i; i < Main_OpacityDivs.length; i++) {
        if (i < 2) document.getElementById(Main_OpacityDivs[i]).style.opacity = '0.5';
        else {
            elem = document.getElementById(Main_OpacityDivs[i]);
            if (elem.className.indexOf('icon_center_focus') === -1) elem.style.opacity = '0.5';
        }
    }
    Main_AddClass('topbar', 'topbar_dim');
}

function Main_UnSetTopOpacity() {
    for (var i = 0; i < Main_OpacityDivs.length; i++)
        document.getElementById(Main_OpacityDivs[i]).style.opacity = '1';
    Main_RemoveClass('topbar', 'topbar_dim');
}

function Main_SwitchScreen(removekey) {
    window.clearTimeout(Main_SetTopOpacityId);
    Main_UnSetTopOpacity();

    Main_ready(function() {
        Main_SwitchScreenAction(removekey);
    });
}

function Main_SwitchScreenAction(removekey) {
    if (Main_values.Main_Go !== Main_ChannelContent) Main_values.Main_BeforeChannelisSet = false;
    if (Main_values.Main_Go !== Main_aGame) Main_values.Main_BeforeAgameisSet = false;

    Main_CounterDialogRst();
    if (Main_values.Main_Go === Main_Live) {
        inUseObj = Live;
        Screens_init();
    } else if (Main_values.Main_Go === Main_addUser) AddUser_init();
    else if (Main_values.Main_Go === Main_games) {
        inUseObj = Game;
        Screens_init();
    } else if (Main_values.Main_Go === Main_aGame) AGame_init();
    else if (Main_values.Main_Go === Main_Search) Search_init();
    else if (Main_values.Main_Go === Main_SearchGames) SearchGames_init();
    else if (Main_values.Main_Go === Main_SearchLive) SearchLive_init();
    else if (Main_values.Main_Go === Main_ChannelContent) ChannelContent_init();
    else if (Main_values.Main_Go === Main_ChannelVod) ChannelVod_init();
    else if (Main_values.Main_Go === Main_ChannelClip) {
        inUseObj = ChannelClip;
        Screens_init();
    } else if (Main_values.Main_Go === Main_Users) Users_init();
    else if (Main_values.Main_Go === Main_UserLive) UserLive_init();
    else if (Main_values.Main_Go === Main_UserHost) UserHost_init();
    else if (Main_values.Main_Go === Main_usergames) {
        inUseObj = UserGames;
        Screens_init();
    } else if (Main_values.Main_Go === Main_UserChannels) UserChannels_init();
    else if (Main_values.Main_Go === Main_SearchChannels) SearchChannels_init();
    else if (Main_values.Main_Go === Main_Vod) Vod_init();
    else if (Main_values.Main_Go === Main_Clip) {
        inUseObj = Clip;
        Screens_init();
    } else if (Main_values.Main_Go === Main_AGameVod) AGameVod_init();
    else if (Main_values.Main_Go === Main_AGameClip) {
        inUseObj = AGameClip;
        Screens_init();
    } else if (Main_values.Main_Go === Main_Featured) {
        inUseObj = Featured;
        Screens_init();
    } else if (Main_values.Main_Go === Main_UserVod) UserVod_init();

    Main_SetTopOpacityId = window.setTimeout(Main_SetTopOpacity, 3000);
    if (removekey) Main_RemoveKeys();
}

function Main_SaveValues() {
    Main_setItem('Main_values', JSON.stringify(Main_values));
}

function Main_RestoreValues() {
    Main_values = Screens_assign(Main_values, Main_getItemJson('Main_values', {}));
}

function Main_ExitCurrent(ExitCurrent) {
    if (ExitCurrent === Main_Live) Screens_exit();
    else if (ExitCurrent === Main_addUser) AddUser_exit();
    else if (ExitCurrent === Main_games) Screens_exit();
    else if (ExitCurrent === Main_aGame) AGame_exit();
    else if (ExitCurrent === Main_Search) Search_exit();
    else if (ExitCurrent === Main_SearchGames) SearchGames_exit();
    else if (ExitCurrent === Main_SearchLive) SearchLive_exit();
    else if (ExitCurrent === Main_ChannelContent) ChannelContent_exit();
    else if (ExitCurrent === Main_ChannelVod) ChannelVod_exit();
    else if (ExitCurrent === Main_ChannelClip) Screens_exit();
    else if (ExitCurrent === Main_Users) Users_exit();
    else if (ExitCurrent === Main_UserLive) UserLive_exit();
    else if (ExitCurrent === Main_UserHost) UserHost_exit();
    else if (ExitCurrent === Main_usergames) Screens_exit();
    else if (ExitCurrent === Main_UserChannels) UserChannels_exit();
    else if (ExitCurrent === Main_SearchChannels) SearchChannels_exit();
    else if (ExitCurrent === Main_Vod) Vod_exit();
    else if (ExitCurrent === Main_Clip) Screens_exit();
    else if (ExitCurrent === Main_AGameVod) AGameVod_exit();
    else if (ExitCurrent === Main_AGameClip) Screens_exit();
    else if (ExitCurrent === Main_Featured) Screens_exit();
    else if (ExitCurrent === Main_UserVod) UserVod_exit();

    if (Main_isElementShowing('settings_scroll')) Settings_exit();
}

function Main_RestoreTopLabel() {
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_textContent('top_bar_live', STR_LIVE);
    Main_textContent('top_bar_user', STR_USER);
    Main_textContent('top_bar_featured', STR_FEATURED);
    Main_textContent('top_bar_game', STR_GAMES);
    Main_textContent('top_bar_vod', STR_VIDEOS);
    Main_textContent('top_bar_clip', STR_CLIPS);
}

function Main_cleanTopLabel() {
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
    Main_empty('top_bar_live');
    Main_empty('top_bar_game');
    Main_empty('top_bar_vod');
    Main_empty('top_bar_clip');
    Main_empty('top_bar_featured');
    Main_AddClass('top_bar_user', 'icon_center_focus');
}

function Main_UnderCenter(text) {
    return '<div style="font-size: 30%; position: fixed; line-height: 0; text-shadow: #000000 0 0 5.7px, #000000 0 0 5.7px, #000000 0 0 4px">' + text + '</div>';
}

function Main_videoCreatedAt(time) { //time in '2017-10-27T13:27:27Z'
    time = new Date(time);
    if (Main_IsDayFirst) return time.getDate() + ' ' + STR_MONTHS[time.getMonth()] + ', ' + time.getFullYear();
    else return STR_MONTHS[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear();
}

function Main_checkVersion() {
    //TODO remove the try after android app update has be releaased for some time
    if (Main_Android) {
        try {
            var version = Android.getversion();
            Main_versionTag = "Android: " + version + ' Web: ' + Main_minversion;
            if (Main_needUpdate(version)) Main_ShowElement('label_update');
        } catch (e) {}
    }

    Main_innerHTML("dialog_about_text", STR_ABOUT_INFO_HEADER + STR_VERSION + Main_versionTag + STR_ABOUT_INFO_0);
}

function Main_needUpdate(version) {
    version = version.split(".");
    return (parseFloat(version[0] + '.' + version[1]) < parseFloat(Main_stringVersion)) ||
        (parseInt(version[2]) < parseInt(Main_stringVersion_Min.split(".")[1]));
}

function Main_empty(el) {
    el = document.getElementById(el);
    while (el.firstChild) el.removeChild(el.firstChild);
}

function Main_imgVectorLoad(img_type) {
    var elem;
    for (var i = 0; i < Main_imgVector.length; i++) {
        elem = document.getElementById(Main_imgVector[i].id);
        if (elem !== null) Main_loadImg(elem, Main_imgVector[i].src + Main_randomimg, img_type);
    }
}

function Main_imgVectorRst() {
    Main_imgVector = [];
}

function Main_imgVectorPush(id, src) {
    Main_imgVector.push({
        'id': id,
        'src': src
    });
}

function Main_YRst(y) {
    Main_cursorYAddFocus = y;
}

function Main_YchangeAddFocus(y) {
    var position = 0;

    if (Main_cursorYAddFocus < y) position = -1; //going down
    else if (Main_cursorYAddFocus > y) position = 1; //going up

    Main_cursorYAddFocus = y;
    return position;
}

function Main_CacheImage(link) {
    Main_newImg.src = link;
}

function Main_createEmptyCell(id) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', id);
    Main_td.className = 'stream_cell';

    return Main_td;
}

function Main_createCellChannel(id, idArray, valuesArray) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', idArray[4] + id);

    Main_td.setAttribute(Main_DataAttribute, valuesArray[0]);
    Main_td.setAttribute('data-id', valuesArray[1]);

    Main_td.className = 'stream_cell';
    Main_td.innerHTML = Main_ChannelHtml(id, idArray, valuesArray);

    return Main_td;
}

function Main_replaceChannel(id, valuesArray, ids) {
    var ele = document.getElementById(id);
    var splitedId = id.split(ids[5])[1];

    ele.setAttribute(Main_DataAttribute, valuesArray[0]);
    ele.setAttribute('data-id', valuesArray[1]);

    ele.innerHTML = Main_ChannelHtml(splitedId, ids, valuesArray);
    ele.setAttribute('id', ids[4] + splitedId);
}

function Main_ChannelHtml(id, idArray, valuesArray) {
    Main_imgVectorPush(idArray[1] + id, valuesArray[2]);
    return '<div id="' + idArray[0] + id + '" class="stream_thumbnail_channel" ><img id="' + idArray[1] +
        id + '" class="stream_img"></div>' +
        '<div id="' + idArray[2] + id + '" class="stream_text">' +
        '<div id="' + idArray[3] + id + '" class="stream_channel">' + valuesArray[3] + '</div></div>';
}

function Main_createCellVideo(row_id, id, data, idArray, valuesArray) {
    if (row_id < Main_ColoumnsCountVideo) Main_CacheImage(valuesArray[0]);

    Main_td = document.createElement('td');
    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify(data));
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = Main_VideoHtml(id, idArray, valuesArray);

    return Main_td;
}

function Main_replaceVideo(id, data, valuesArray, ids) {
    var ele = document.getElementById(id);
    var splitedId = id.split(ids[9])[1];
    ele.setAttribute(Main_DataAttribute, JSON.stringify(data));
    ele.innerHTML = Main_VideoHtml(splitedId, ids, valuesArray);
    ele.setAttribute('id', ids[8] + splitedId);
}

function Main_VideoHtml(id, idArray, valuesArray) {
    Main_imgVectorPush(idArray[1] + id, valuesArray[0]);
    return '<div id="' + idArray[0] + id + '" class="stream_thumbnail_video" >' +
        '<img id="' + idArray[1] + id + '" class="stream_img"></div>' +
        '<div id="' + idArray[2] + id + '" class="stream_text">' +
        '<div id="' + idArray[3] + id + '" class="stream_channel" style="width: 66%; display: inline-block;">' + valuesArray[1] + '</div>' +
        '<div id="' + idArray[7] + id + '"class="stream_info" style="width:33%; float: right; text-align: right; display: inline-block;">' +
        valuesArray[5] + '</div>' +
        '<div id="' + idArray[4] + id + '"class="stream_info">' + twemoji.parse(valuesArray[2]) + '</div>' +
        '<div id="' + idArray[5] + id + '"class="stream_info">' + STR_PLAYING + valuesArray[3] + '</div>' +
        '<div id="' + idArray[6] + id + '"class="stream_info">' + valuesArray[4] + '</div>' + '</div>';
}

function Main_createCellGame(id, idArray, valuesArray) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', idArray[5] + id);
    Main_td.setAttribute(Main_DataAttribute, valuesArray[0]);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = Main_GameHtml(id, idArray, valuesArray);

    return Main_td;
}

function Main_GameHtml(id, idArray, valuesArray) {
    Main_imgVectorPush(idArray[1] + id, valuesArray[1]);
    return '<div id="' + idArray[0] + id + '" class="stream_thumbnail_game" >' +
        '<img id="' + idArray[1] + id + '" class="stream_img"></div>' +
        '<div id="' + idArray[2] + id + '" class="stream_text">' +
        '<div id="' + idArray[3] + id + '" class="stream_channel">' + valuesArray[0] + '</div>' +
        '<div id="' + idArray[4] + id + '"class="stream_info_games" style="width: 100%; display: inline-block;">' +
        valuesArray[2] + '</div></div>';
}

//"handleKeyUp, keyClickDelay, keyClickDelayStart and Main_CantClick" are here to prevent races during click and hold
//That can cause visual glitches and make the user lost sense on were the focus is
//Or cause the app to keep moving up/down seconds after the key has be released
function Main_handleKeyUp() {
    Main_addFocusFinish = true;
}

function Main_keyClickDelay() {
    Main_LastClickFinish = true;
}

function Main_keyClickDelayStart() {
    Main_LastClickFinish = false;
    window.setTimeout(Main_keyClickDelay);
}

function Main_CantClick() {
    return !Main_LastClickFinish || !Main_addFocusFinish;
}

function Main_addFocusChannel(y, x, idArray, ColoumnsCount, itemsCount) {
    Main_AddClass(idArray[0] + y + '_' + x, Main_classThumb);
    Main_CounterDialog(x, y, ColoumnsCount, itemsCount);
    if (Main_YchangeAddFocus(y)) {

        if (y > 1) {
            if (Main_ThumbNull((y + 1), 0, idArray[0])) {
                Main_ScrollTable(idArray[6],
                    (document.getElementById(idArray[4] + y + '_' + x).offsetTop * -1) + (screen.height * 0.42));
            } else Main_handleKeyUp();
        } else Main_ScrollTable(idArray[6], screen.height * 0.07);

    } else Main_handleKeyUp();
}

function Main_addFocusVideo(y, x, idArray, ColoumnsCount, itemsCount) {
    Main_AddClass(idArray[0] + y + '_' + x, Main_classThumb);
    Main_CounterDialog(x, y, ColoumnsCount, itemsCount);
    if (Main_YchangeAddFocus(y)) {

        if (!y) Main_ScrollTable(idArray[10], screen.height * 0.07);
        else if (Main_ThumbNull((y + 1), 0, idArray[0])) Main_ScrollTable(idArray[10],
            document.getElementById(idArray[8] + (y - 1) + '_' + x).offsetTop * -1);

    } else Main_handleKeyUp();
}

function Main_addFocusGame(y, x, idArray, ColoumnsCount, itemsCount) {
    Main_AddClass(idArray[0] + y + '_' + x, Main_classThumb);
    Main_CounterDialog(x, y, ColoumnsCount, itemsCount);
    if (Main_YchangeAddFocus(y)) {

        if (!y) Main_ScrollTable((idArray[10] ? idArray[10] : idArray[7]),
            (document.getElementById(idArray[5] + y + '_' + x).offsetTop * -1) + screen.height * 0.025);
        else Main_ScrollTable((idArray[10] ? idArray[10] : idArray[7]),
            (document.getElementById(idArray[5] + (y - 1) + '_' + x).offsetTop * -1) + screen.height * 0.025);

    } else Main_handleKeyUp();
}

function Main_OpenLiveStream(id, idsArray, handleKeyDownFunction) {
    document.body.removeEventListener("keydown", handleKeyDownFunction);
    Main_values.Play_selectedChannel = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));
    Main_values.Play_selectedChannel_id = Main_values.Play_selectedChannel[1];
    Main_values.Play_selectedChannel = Main_values.Play_selectedChannel[0];
    if (Main_values.Main_Go === Main_UserHost) {
        Main_values.Play_DisplaynameHost = document.getElementById(idsArray[3] + id).textContent;
        Main_values.Play_selectedChannelDisplayname = Main_values.Play_DisplaynameHost.split(STR_USER_HOSTING)[1];
        Main_values.Play_isHost = true;
    } else Main_values.Play_selectedChannelDisplayname = document.getElementById(idsArray[3] + id).textContent;
    Main_values.Play_gameSelected = document.getElementById(idsArray[5] + id).textContent.split(STR_PLAYING)[1];
    if (Main_values.Main_Go === Main_aGame) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
    Main_openStream();
}

function Main_openStream() {
    document.body.addEventListener("keydown", Play_handleKeyDown, false);
    Main_HideElement('scene1');
    Main_ShowElement('scene2');
    Play_hidePanel();
    Play_hideChat();
    Play_HideEndDialog();
    if (AddUser_UserIsSet() && !UserLiveFeed_loadingData && UserLiveFeed_status) UserLiveFeed_FeedFindPos();
    Main_ready(Play_Start);
}

function Main_OpenClip(id, idsArray, handleKeyDownFunction) {
    document.body.removeEventListener("keydown", handleKeyDownFunction);
    ChannelClip_playUrl = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));

    PlayClip_DurationSeconds = parseInt(ChannelClip_playUrl[1]);
    Main_values.Play_gameSelected = ChannelClip_playUrl[2];
    Main_values.Main_selectedChannel = ChannelClip_playUrl[3];
    Main_values.Main_selectedChannelDisplayname = ChannelClip_playUrl[4];
    Main_values.Main_selectedChannelLogo = ChannelClip_playUrl[5];
    Main_values.Main_selectedChannel_id = ChannelClip_playUrl[6];
    Main_values.ChannelVod_vodId = ChannelClip_playUrl[7];
    ChannelVod_vodOffset = parseInt(ChannelClip_playUrl[8]);
    ChannelClip_title = ChannelClip_playUrl[9];
    ChannelClip_language = ChannelClip_playUrl[10];
    ChannelClip_game = ChannelClip_playUrl[11];

    ChannelClip_playUrl = ChannelClip_playUrl[0];

    ChannelClip_createdAt = document.getElementById(idsArray[4] + id).textContent;
    ChannelClip_views = document.getElementById(idsArray[6] + id).textContent;

    document.body.addEventListener("keydown", PlayClip_handleKeyDown, false);
    Main_HideElement('scene1');
    Main_ShowElement('scene2');
    Play_hideChat();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_CleanHideExit();
    if (AddUser_UserIsSet() && !UserLiveFeed_loadingData && UserLiveFeed_status) UserLiveFeed_FeedFindPos();
    Main_ready(PlayClip_Start);
}

function Main_OpenVod(id, idsArray, handleKeyDownFunction) {
    document.body.removeEventListener("keydown", handleKeyDownFunction);
    Main_values.ChannelVod_vodId = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));
    ChannelVod_DurationSeconds = parseInt(Main_values.ChannelVod_vodId[1]);
    ChannelVod_language = Main_values.ChannelVod_vodId[2];
    Main_values.Play_gameSelected = Main_values.ChannelVod_vodId[3];
    Main_values.Main_selectedChannel = Main_values.ChannelVod_vodId[4];
    Play_IncrementView = Main_values.ChannelVod_vodId[5];
    Main_values.ChannelVod_vodId = Main_values.ChannelVod_vodId[0].substr(1);

    if (Main_values.Main_Go === Main_ChannelVod) {
        ChannelVod_title = document.getElementById(idsArray[3] + id).innerHTML;
    } else {
        ChannelVod_title = '';
        Main_values.Main_selectedChannelDisplayname = document.getElementById(idsArray[3] + id).textContent;
    }

    ChannelVod_createdAt = document.getElementById(idsArray[4] + id).textContent;
    ChannelVod_Duration = document.getElementById(idsArray[5] + id).textContent;
    ChannelVod_views = document.getElementById(idsArray[11] + id).innerHTML +
        ', ' + document.getElementById(idsArray[6] + id).textContent;

    Main_openVod();
}

function Main_openVod() {
    document.body.addEventListener("keydown", PlayVod_handleKeyDown, false);
    Main_HideElement('scene1');
    Main_ShowElement('scene2');
    PlayVod_hidePanel();
    Play_hideChat();
    Play_clearPause();
    Play_CleanHideExit();
    PlayVod_HasVodInfo = false;
    if (AddUser_UserIsSet() && !UserLiveFeed_loadingData && UserLiveFeed_status) UserLiveFeed_FeedFindPos();
    Main_ready(PlayVod_Start);
}

function Main_ScrollTable(id, position) {
    document.getElementById(id).style.top = position + "px";
    window.setTimeout(Main_handleKeyUp, 10);
}

function Main_removeFocus(id, idArray) {
    Main_addFocusFinish = false;
    Main_RemoveClass(idArray[0] + id, Main_classThumb);
}

// stylesheet[i].cssRules or stylesheet[i].rules is blocked in chrome
// So in order to check if a css class is loaded one can check it's font-family
// The simple test here it to remove the <link rel="stylesheet" href="https://werevere"> from index and see if the bellow funtion loads the css for you and vice versa
function Main_Checktylesheet() {
    var span = document.createElement('span');

    span.className = 'fa';
    span.style.display = 'none';
    document.body.insertBefore(span, document.body.firstChild);

    if (window.getComputedStyle(span, null).getPropertyValue('font-family') !== 'icons') {
        if (Main_isDebug) console.log('Main_Checktylesheet reloading');
        Main_LoadStylesheet('https://fgl27.github.io/SmartTwitchTV/release/githubio/css/icons.min.css');
    } else if (Main_isDebug) console.log('Main_Checktylesheet loaded OK');

    document.body.removeChild(span);
}

function Main_LoadStylesheet(path) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = path;

    document.getElementsByTagName("head")[0].appendChild(link);
}

//adapted from https://code.jquery.com/jquery-3.3.1.js
function Main_ready(func) {
    if (document.readyState === "complete" ||
        (document.readyState !== "loading" && !document.documentElement.doScroll)) {

        // Handle it asynchronously to allow scripts the opportunity to delay ready
        window.setTimeout(func);

    } else document.addEventListener("DOMContentLoaded", func);
}

function Main_getclock() {
    var date = new Date().getTime() + Main_ClockOffset,
        dayMonth;

    date = new Date(date);

    if (Main_IsDayFirst) dayMonth = STR_DAYS[date.getDay()] + ' ' + date.getDate() + '/' + STR_MONTHS[date.getMonth()];
    else dayMonth = STR_DAYS[date.getDay()] + ' ' + STR_MONTHS[date.getMonth()] + '/' + date.getDate();

    return dayMonth + ' ' + Play_lessthanten(date.getHours()) + ':' + Play_lessthanten(date.getMinutes());
}

// right after the TV comes from standby the network can lag, delay the check
function Main_Resume() {
    if (!document.hidden) {
        Main_updateclock();
        //Update clock twice as first try clock may be out of date in the case TV was on standby
        window.setTimeout(Main_updateclock, 20000);
    }
}

function Main_updateclock() {
    if (!document.hidden) {
        Main_textContent('label_clock', Main_getclock());
        Main_randomimg = '?' + Math.random();
    }
}

function Main_updateUserFeed() {
    if (!document.hidden) {
        if (AddUser_UserIsSet()) {
            window.setTimeout(function() {
                if (!UserLiveFeed_isFeedShow() && !UserLiveFeed_loadingData) {
                    Play_FeedOldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
                    UserLiveFeed_StartLoad();
                }
            }, 5000);
        }
    }
}

function Main_SidePannelAddFocus() {
    Main_AddClass('side_panel_' + Main_SidePannelPos, 'side_panel_text_focus');
}

function Main_SidePannelRemoveFocus() {
    Main_RemoveClass('side_panel_' + Main_SidePannelPos, 'side_panel_text_focus');
}

function Main_SidePannelKeyEnter() {
    if (!Main_SidePannelPos) {
        if (Main_values.Main_Go !== Main_Search) {
            if (!Main_values.Search_isSearching &&
                (Main_values.Main_Go === Main_ChannelContent || Main_values.Main_Go === Main_ChannelClip || Main_values.Main_Go === Main_ChannelVod))
                ChannelContent_SetChannelValue();
            Main_values.Main_BeforeSearch = Main_values.Main_Go;
            Main_values.Main_Go = Main_Search;
            Main_ExitCurrent(Main_values.Main_BeforeSearch);
            Main_SwitchScreen();
        } else document.body.addEventListener("keydown", Main_SidePannelCallback, false);
    } else if (Main_SidePannelPos === 1) Main_showSettings();
    else if (Main_SidePannelPos === 2) {
        document.body.addEventListener("keydown", Main_SidePannelCallback, false);
        Main_showAboutDialog();
    } else if (Main_SidePannelPos === 3) {
        document.body.addEventListener("keydown", Main_SidePannelCallback, false);
        Main_showControlsDialog();
    } else if (Main_SidePannelPos === 4) Main_showExitDialog(Main_SidePannelCallback);
    else if (Main_SidePannelPos === 5) Main_SidePannelGo(Main_Live);
    else if (Main_SidePannelPos === 6) Main_SidePannelGo(AddUser_IsUserSet() ? Main_Users : Main_addUser);
    else if (Main_SidePannelPos === 7) Main_SidePannelGo(Main_Featured);
    else if (Main_SidePannelPos === 8) Main_SidePannelGo(Main_games);
    else if (Main_SidePannelPos === 9) Main_SidePannelGo(Main_Vod);
    else if (Main_SidePannelPos === 10) Main_SidePannelGo(Main_Clip);
    Main_SidePannelHide();
}

function Main_SidePannelGo(GoTo) {
    if (GoTo === Main_values.Main_Go) document.body.addEventListener("keydown", Main_SidePannelCallback, false);
    else {
        Main_values.Main_Before = Main_values.Main_Go;
        Main_values.Main_Go = GoTo;
        Main_ExitCurrent(Main_values.Main_Before);
        Main_SwitchScreen();
    }
}

function Main_SidePannelStart(callback) {
    Main_SidePannelCallback = callback;
    document.body.removeEventListener("keydown", Main_SidePannelCallback);
    document.body.addEventListener("keydown", Main_SidePannelhandleKeyDown, false);
    Main_RemoveClass('side_panel', 'side_panel_hide');
}

function Main_SidePannelHide() {
    document.body.removeEventListener("keydown", Main_SidePannelhandleKeyDown);
    Main_AddClass('side_panel', 'side_panel_hide');
    Main_SidePannelRemoveFocus();
    Main_SidePannelPos = 0;
    Main_SidePannelAddFocus();
}

function Main_SidePannelhandleKeyDown(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
        case KEY_LEFT:
            document.body.addEventListener("keydown", Main_SidePannelCallback, false);
            Main_SidePannelHide();
            Main_CenterLablesChange();
            break;
        case KEY_UP:
            if (Main_SidePannelPos) {
                Main_SidePannelRemoveFocus();
                Main_SidePannelPos--;
                Main_SidePannelAddFocus();
            }
            break;
        case KEY_DOWN:
            if (Main_SidePannelPos < 10) {
                Main_SidePannelRemoveFocus();
                Main_SidePannelPos++;
                Main_SidePannelAddFocus();
            }
            break;
        case KEY_ENTER:
            Main_SidePannelKeyEnter();
            break;
        default:
            break;
    }
}

function Main_ExitDialog(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
            Main_HideExitDialog();
            break;
        case KEY_RIGHT:
            Main_ExitCursor++;
            if (Main_ExitCursor > 2) Main_ExitCursor = 0;
            Main_ExitCursorSet();
            Main_clearExitDialog();
            Main_setExitDialog();
            break;
        case KEY_LEFT:
            Main_ExitCursor--;
            if (Main_ExitCursor < 0) Main_ExitCursor = 2;
            Main_ExitCursorSet();
            Main_clearExitDialog();
            Main_setExitDialog();
            break;
        case KEY_ENTER:
            if (!Main_ExitCursor) Main_HideExitDialog();
            else if (Main_Android && Main_ExitCursor === 1) Android.mclose(false);
            else if (Main_Android && Main_ExitCursor === 2) Android.mclose(true);
            break;
        default:
            break;
    }
}

var Main_CenterLablesVector = ['top_bar_live', 'top_bar_user', 'top_bar_featured', 'top_bar_game', 'top_bar_vod', 'top_bar_clip'];
var Main_CenterScreenVector = [Main_Live, Main_Users, Main_Featured, Main_games, Main_Vod, Main_Clip];
var Main_FirstLoad = false;

function Main_CenterLables(event) {
    if (Main_FirstLoad || inUseObj.FirstLoad || Main_CantClick()) return;
    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) {
                Main_CenterLablesChange();
                Main_HideControlsDialog();
            } else if (Main_isAboutDialogShown()) {
                Main_CenterLablesChange();
                Main_HideAboutDialog();
            } else {
                if (Main_values.Main_Go === Main_aGame) {
                    Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
                    if (Main_values.Games_return) {
                        Main_values.Main_Go = Main_SearchGames;
                        Main_values.Main_gameSelected = Main_values.gameSelectedOld;
                    } else {
                        Main_values.Main_Go = Main_values.Main_BeforeAgame;
                        Main_values.Main_BeforeAgame = Main_Live;
                    }
                    AGame_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreenAction();
                } else if (Main_values.Main_Go === Main_AGameClip) {
                    Screens_BasicExit(Main_aGame);
                    Main_CenterLablesClean();
                    Main_SwitchScreenAction();
                } else if (Main_values.Main_Go === Main_usergames) {
                    Screens_BasicExit(Main_Users);
                    Main_CenterLablesClean();
                    Main_SwitchScreenAction();
                } else if (Main_values.Main_Go === Main_ChannelClip) {
                    Screens_BasicExit(Main_ChannelContent);
                    Main_CenterLablesClean();
                    Main_SwitchScreenAction();
                } else if (Main_values.Main_Go === Main_AGameVod) {
                    Main_values.Main_Go = Main_aGame;
                    AGameVod_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreenAction();
                } else if (Main_values.Main_Go === Main_UserLive) {
                    Main_values.Main_Go = Main_Users;
                    UserLive_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreenAction();
                } else if (Main_values.Main_Go === Main_UserHost) {
                    Main_values.Main_Go = Main_Users;
                    UserHost_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreenAction();
                } else if (Main_values.Main_Go === Main_UserVod) {
                    Main_values.Main_Go = Main_Users;
                    UserVod_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreenAction();
                } else if (Main_values.Main_Go === Main_UserChannels) {
                    Main_values.Main_Go = Main_Users;
                    UserChannels_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreenAction();
                } else if (Main_values.Main_Go === Main_ChannelContent) {
                    Main_values.Main_Go = Main_values.Main_BeforeChannel;
                    Main_values.Main_BeforeChannel = Main_Live;
                    ChannelContent_exit();
                    Main_values.Main_selectedChannel_id = '';
                    Main_CenterLablesClean();
                    Main_SwitchScreenAction();
                } else if (Main_values.Main_Go === Main_ChannelVod) {
                    Main_values.Main_Go = Main_ChannelContent;
                    ChannelVod_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreenAction();
                } else if (Main_values.Main_Go === Main_SearchLive) {
                    if (Main_values.Main_Go === Main_values.Main_BeforeSearch) Main_values.Main_Go = Main_Live;
                    else Main_values.Main_Go = Main_values.Main_BeforeSearch;
                    SearchLive_exit();
                    Main_values.Search_isSearching = false;
                    Main_CenterLablesClean();
                    Main_SwitchScreenAction();
                } else if (Main_values.Main_Go === Main_SearchGames) {
                    if (Main_values.Main_Go === Main_values.Main_BeforeSearch) Main_values.Main_Go = Main_Live;
                    else Main_values.Main_Go = Main_values.Main_BeforeSearch;
                    Main_values.Search_isSearching = false;
                    SearchGames_exit();
                    Main_CenterLablesClean();
                    Main_SwitchScreenAction();
                } else if (Main_values.Main_Go === Main_SearchChannels) {

                    if (Main_values.Main_Go === Main_values.Main_BeforeSearch) Main_values.Main_Go = Main_Live;
                    else Main_values.Main_Go = Main_values.Main_BeforeSearch;
                    if (Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
                    SearchChannels_exit();
                    Main_values.Search_isSearching = false;
                    Main_CenterLablesClean();
                    Main_SwitchScreenAction();
                } else {
                    Main_CenterLablesClean();
                    Main_SidePannelStart(Main_CenterLables);
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_values.Search_isSearching || Main_values.Main_Go === Main_ChannelContent ||
                Main_values.Main_Go === Main_ChannelVod || Main_values.Main_Go === Main_ChannelClip ||
                Main_values.Main_Go === Main_SearchLive || Main_values.Main_Go === Main_SearchGames ||
                Main_values.Main_Go === Main_SearchChannels) break;
            Main_RemoveClass(Main_CenterLablesVector[Main_values.Main_CenterLablesVectorPos], 'icon_center_line');
            Main_values.Main_CenterLablesVectorPos++;
            if (Main_values.Main_CenterLablesVectorPos > 5) Main_values.Main_CenterLablesVectorPos = 0;
            Main_CenterLablesChange();
            Main_CenterLablesExit();
            break;
        case KEY_LEFT:
            if (Main_values.Search_isSearching || Main_values.Main_Go === Main_ChannelContent ||
                Main_values.Main_Go === Main_ChannelVod || Main_values.Main_Go === Main_ChannelClip ||
                Main_values.Main_Go === Main_SearchLive || Main_values.Main_Go === Main_SearchGames ||
                Main_values.Main_Go === Main_SearchChannels) break;
            Main_RemoveClass(Main_CenterLablesVector[Main_values.Main_CenterLablesVectorPos], 'icon_center_line');
            Main_values.Main_CenterLablesVectorPos--;
            if (Main_values.Main_CenterLablesVectorPos < 0) Main_values.Main_CenterLablesVectorPos = 5;
            Main_CenterLablesChange();
            Main_CenterLablesExit();
            break;
        case KEY_DOWN:
            Main_RemoveClass(Main_CenterLablesVector[Main_values.Main_CenterLablesVectorPos], 'icon_center_line');
            document.body.removeEventListener("keydown", Main_CenterLables);
            Main_CenterLablesInUse = false;
            Main_SwitchScreenAction();
            break;
        case KEY_ENTER:
            Main_ReloadScreen();
            break;
        default:
            break;
    }
}

function Main_CenterLablesStart(callback) {
    window.clearTimeout(Main_SetTopOpacityId);
    Main_UnSetTopOpacity();
    document.body.removeEventListener("keydown", callback);
    document.body.removeEventListener("keydown", Main_CenterLables);
    document.body.addEventListener("keydown", Main_CenterLables, false);
    Main_CenterLablesChange();
}

function Main_CenterLablesClean() {
    Main_RemoveClass(Main_CenterLablesVector[Main_values.Main_CenterLablesVectorPos], 'icon_center_line');
    document.body.removeEventListener("keydown", Main_CenterLables);
    Main_CenterLablesInUse = false;
}

function Main_CenterLablesChange() {
    Main_CenterLablesInUse = true;
    Main_AddClass(Main_CenterLablesVector[Main_values.Main_CenterLablesVectorPos], 'icon_center_line');
}

function Main_CenterLablesExit() {
    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_CenterScreenVector[Main_values.Main_CenterLablesVectorPos];
    if (Main_values.Main_Go === Main_Users && !AddUser_IsUserSet()) {
        Main_values.Main_Go = Main_addUser;
        Main_CenterLablesClean();
        Main_SwitchScreen();
    } else {
        Main_SwitchScreen(true);

    }
}

function Main_RemoveKeys() {
    if (Main_values.Main_Go === Main_Live) {
        inUseObj = Live;
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    } else if (Main_values.Main_Go === Main_Users) document.body.removeEventListener("keydown", Users_handleKeyDown);
    else if (Main_values.Main_Go === Main_aGame) document.body.removeEventListener("keydown", AGame_handleKeyDown);
    else if (Main_values.Main_Go === Main_Featured) {
        inUseObj = Featured;
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    } else if (Main_values.Main_Go === Main_SearchLive) document.body.removeEventListener("keydown", SearchLive_handleKeyDown);
    else if (Main_values.Main_Go === Main_SearchGames) document.body.removeEventListener("keydown", SearchGames_handleKeyDown);
    else if (Main_values.Main_Go === Main_SearchChannels) document.body.removeEventListener("keydown", SearchChannels_handleKeyDown);
    else if (Main_values.Main_Go === Main_ChannelVod) document.body.removeEventListener("keydown", ChannelVod_handleKeyDown);
    else if (Main_values.Main_Go === Main_ChannelContent) document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
    else if (Main_values.Main_Go === Main_UserHost) document.body.removeEventListener("keydown", UserHost_handleKeyDown);
    else if (Main_values.Main_Go === Main_UserVod) document.body.removeEventListener("keydown", UserVod_handleKeyDown);
    else if (Main_values.Main_Go === Main_UserChannels) document.body.removeEventListener("keydown", UserChannels_handleKeyDown);
    else if (Main_values.Main_Go === Main_games) {
        inUseObj = Game;
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    } else if (Main_values.Main_Go === Main_ChannelClip) {
        inUseObj = ChannelClip;
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    } else if (Main_values.Main_Go === Main_Vod) document.body.removeEventListener("keydown", Vod_handleKeyDown);
    else if (Main_values.Main_Go === Main_Clip) {
        inUseObj = Clip;
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    } else if (Main_values.Main_Go === Main_AGameClip) {
        inUseObj = AGameClip;
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    } else if (Main_values.Main_Go === Main_usergames) {
        inUseObj = UserGames;
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    } else if (Main_values.Main_Go === Main_AGameVod) document.body.removeEventListener("keydown", AGameVod_handleKeyDown);
    else if (Main_values.Main_Go === Main_UserLive) document.body.removeEventListener("keydown", UserLive_handleKeyDown);
}

function Main_ReloadScreen() {
    window.clearTimeout(Main_SetTopOpacityId);
    Main_UnSetTopOpacity();

    if (Main_values.Main_Go !== Main_ChannelContent) Main_values.Main_BeforeChannelisSet = false;
    if (Main_values.Main_Go !== Main_aGame) Main_values.Main_BeforeAgameisSet = false;

    Main_CounterDialogRst();
    if (Main_values.Main_Go === Main_Live) {
        inUseObj = Live;
        Screens_StartLoad();
    } else if (Main_values.Main_Go === Main_Users) Users_StartLoad();
    else if (Main_values.Main_Go === Main_Featured) {
        inUseObj = Featured;
        Screens_StartLoad();
    } else if (Main_values.Main_Go === Main_aGame) AGame_StartLoad();
    else if (Main_values.Main_Go === Main_UserChannels) UserChannels_StartLoad();
    else if (Main_values.Main_Go === Main_ChannelContent) ChannelContent_StartLoad();
    else if (Main_values.Main_Go === Main_ChannelVod) ChannelVod_StartLoad();
    else if (Main_values.Main_Go === Main_SearchLive) SearchLive_StartLoad();
    else if (Main_values.Main_Go === Main_SearchGames) SearchGames_StartLoad();
    else if (Main_values.Main_Go === Main_SearchChannels) SearchChannels_StartLoad();
    else if (Main_values.Main_Go === Main_games) {
        inUseObj = Game;
        Screens_StartLoad();
    } else if (Main_values.Main_Go === Main_usergames) {
        inUseObj = UserGames;
        if (!inUseObj.loadingData) inUseObj.key_refresh();
    } else if (Main_values.Main_Go === Main_Vod) Vod_StartLoad();
    else if (Main_values.Main_Go === Main_Clip) {
        inUseObj = Clip;
        Screens_StartLoad();
    } else if (Main_values.Main_Go === Main_AGameClip) {
        inUseObj = AGameClip;
        Screens_StartLoad();
    } else if (Main_values.Main_Go === Main_ChannelClip) {
        inUseObj = ChannelClip;
        Screens_StartLoad();
    } else if (Main_values.Main_Go === Main_AGameVod) AGameVod_StartLoad();
    else if (Main_values.Main_Go === Main_UserLive) UserLive_StartLoad();
    else if (Main_values.Main_Go === Main_UserHost) UserHost_StartLoad();
    else if (Main_values.Main_Go === Main_UserVod) UserVod_StartLoad();

    Main_SetTopOpacityId = window.setTimeout(Main_SetTopOpacity, 3000);
}

function Main_setItem(item, value) {
    localStorage.setItem(item, value);
}

function Main_getItemInt(item, default_value) {
    return parseInt(localStorage.getItem(item)) || default_value;
}

function Main_getItemJson(item, default_value) {
    return JSON.parse(localStorage.getItem(item)) || default_value;
}

function Main_getItemBool(item, default_value) {
    var default_string = default_value.toString();
    return (localStorage.getItem(item) || default_string) === default_string ? default_value : !default_value;
}

// use http://www.fileformat.info/info/unicode/char/16EB/index.html
// Replace "16EB" with is the char ᛫ by the result of "string.charCodeAt(i).toString(16).toUpperCase()"
// To see supported fonts and etc info about the unknown char
function Main_PrintUnicode(string) { // jshint ignore:line
    console.log(string);
    for (var i = 0; i < string.length; i++)
        console.log('Character is: ' + string.charAt(i) + " it's Unicode is: \\u" + string.charCodeAt(i).toString(16).toUpperCase());
}

function processCode(pageUrl) {
    console.log("processCode");
    var code = '';
    code = pageUrl.match(/code=(\w+)/);
    if (code) {
        code = code[1];
        console.log('if code ' + code);
        Main_newUsercode = code;
    } else {
        console.log('else code ' + code);
        Main_newUsercode = 0;
    }
}

//Basic XMLHttpRequest thatonly returns error or 200 status
function BasehttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, useProxy) {
    if (Main_Android) BaseAndroidhttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError);
    else BasexmlHttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, useProxy);
}

function BaseAndroidhttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError) {
    var xmlHttp = Android.mreadUrl(theUrl, Timeout, HeaderQuatity, access_token);

    if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
    else {
        calbackError();
        return;
    }

    if (xmlHttp.status === 200) {
        callbackSucess(xmlHttp.responseText);
    } else {
        calbackError();
    }
}

function BasexmlHttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, useProxy) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", (useProxy ? proxyurl : '') + theUrl, true);
    xmlHttp.timeout = Timeout;

    if (HeaderQuatity > 0) xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    //Header TWITHCV5 to load all screens and some stream info
    if (HeaderQuatity > 1) xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
    //Header to access User VOD screen
    if (HeaderQuatity > 2) xmlHttp.setRequestHeader(Main_Authorization, access_token);

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                callbackSucess(xmlHttp.responseText);
                return;
            } else {
                calbackError();
            }
        }
    };

    xmlHttp.send(null);
}
//Variable initialization
var AGame_cursorY = 0;
var AGame_cursorX = 0;
var AGame_dataEnded = false;
var AGame_itemsCount = 0;
var AGame_idObject = {};
var AGame_emptyCellVector = [];
var AGame_loadingData = false;
var AGame_loadingDataTry = 0;
var AGame_loadingDataTryMax = 5;
var AGame_loadingDataTimeout = 3500;
var AGame_itemsCountOffset = 0;
var AGame_MaxOffset = 0;
var AGame_emptyContent = false;

var AGame_ids = ['ag_thumbdiv', 'ag_img', 'ag_infodiv', 'ag_displayname', 'ag_streamtitle', 'ag_streamgame', 'ag_viwers', 'ag_quality', 'ag_cell', 'agempty_', 'a_games_scroll'];
var AGame_status = false;
var AGame_itemsCountCheck = false;
var AGame_fallowing = false;
var AGame_UserGames = false;
var AGame_TopRowCreated = false;
//Variable initialization end

function AGame_init() {
    Main_values.Main_CenterLablesVectorPos = 3;
    Main_values.Main_Go = Main_aGame;
    document.body.addEventListener("keydown", AGame_handleKeyDown, false);
    Main_AddClass('top_bar_game', 'icon_center_focus');
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);

    if (Main_values.Search_isSearching) { //Reset label as the app may be restoring from background
        Main_cleanTopLabel();
        Main_innerHTML('top_bar_user', STR_SEARCH + Main_UnderCenter(STR_GAMES + ' ' + "'" + Main_values.Search_data + "'"));
    }

    Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter(STR_LIVE +
        ': ' + Main_values.Main_gameSelected));
    if ((Main_values.Main_OldgameSelected === Main_values.Main_gameSelected) && AGame_status) {
        Main_YRst(AGame_cursorY);
        Main_ShowElement(AGame_ids[10]);
        AGame_addFocus();
        Main_SaveValues();
    } else AGame_StartLoad();
}

function AGame_exit() {
    if (AGame_status && AGame_cursorY === -1) {
        AGame_removeFocusFallow();
        AGame_cursorY = 0;
        AGame_cursorX = 0;
        Main_AddClass(AGame_ids[0] + '0_' + AGame_cursorX, Main_classThumb);
    }
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
    Main_innerHTML('top_bar_game', STR_GAMES);
    document.body.removeEventListener("keydown", AGame_handleKeyDown);
    Main_RemoveClass('top_bar_game', 'icon_center_focus');
    Main_HideElement(AGame_ids[10]);
}

function AGame_StartLoad() {
    if (Main_values.Main_OldgameSelected === null) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
    Main_empty('stream_table_a_game');
    Main_HideElement(AGame_ids[10]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    AGame_status = false;
    AGame_TopRowCreated = false;
    AGame_itemsCountOffset = 0;
    AGame_MaxOffset = 0;
    AGame_idObject = {};
    AGame_emptyCellVector = [];
    AGame_itemsCountCheck = false;
    AGame_itemsCount = 0;
    Main_FirstLoad = true;
    AGame_cursorX = 0;
    AGame_cursorY = 0;
    AGame_dataEnded = false;
    Main_CounterDialogRst();
    AGame_loadDataPrepare();
    AGame_loadDataRequest();
}

function AGame_loadDataPrepare() {
    Main_imgVectorRst();
    AGame_loadingData = true;
    AGame_loadingDataTry = 0;
    AGame_loadingDataTimeout = 3500;
}

function AGame_loadDataRequest() {
    var offset = AGame_itemsCount + AGame_itemsCountOffset;
    if (offset && offset > (AGame_MaxOffset - 1)) {
        offset = AGame_MaxOffset - Main_ItemsLimitVideo;
        AGame_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main_values.Main_gameSelected) +
        '&limit=' + Main_ItemsLimitVideo + '&offset=' + offset +
        (Main_ContentLang !== "" ? ('&broadcaster_language=' + Main_ContentLang) : '');

    BasehttpGet(theUrl, AGame_loadingDataTimeout, 2, null, AGame_loadDataSuccess, AGame_loadDataError);
}

function AGame_loadDataError() {
    AGame_loadingDataTry++;
    if (AGame_loadingDataTry < AGame_loadingDataTryMax) {
        AGame_loadingDataTimeout += 500;
        AGame_loadDataRequest();
    } else {
        AGame_loadingData = false;
        if (!AGame_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            AGame_dataEnded = true;
            AGame_loadDataSuccessFinish();
        }
    }
}

function AGame_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    AGame_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) AGame_dataEnded = true;

    var offset_itemsCount = AGame_itemsCount;
    AGame_itemsCount += response_items;

    AGame_emptyContent = !AGame_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, i, stream, id,
        cursor = 0,
        doc = document.getElementById("stream_table_a_game");

    // Make the game video/clip/fallowing cell
    if (!AGame_TopRowCreated) {
        AGame_TopRowCreated = true;
        row = document.createElement('tr');
        var thumbfallow;
        for (i = 0; i < 3; i++) {
            if (!i) thumbfallow = '<i class="icon-movie-play stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_VIDEOS;
            else if (i === 1) thumbfallow = '<i class="icon-movie stream_channel_fallow_icon"></i>' + STR_SPACE + STR_CLIPS;
            else thumbfallow = '';
            Main_td = document.createElement('td');
            Main_td.setAttribute('id', AGame_ids[8] + 'y_' + i);
            Main_td.className = 'stream_cell';
            Main_td.innerHTML = '<div id="' + AGame_ids[0] +
                'y_' + i + '" class="stream_thumbnail_fallow_game" ><div id="' + AGame_ids[3] +
                'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
            row.appendChild(Main_td);
        }
        doc.appendChild(row);
    }

    for (i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            id = stream.channel._id;
            if (AGame_idObject[id]) coloumn_id--;
            else {
                AGame_idObject[id] = 1;
                row.appendChild(Main_createCellVideo(row_id, row_id + '_' + coloumn_id,
                    [stream.channel.name, id], AGame_ids,
                    [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                        Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                        stream.channel.status, stream.game,
                        STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR +
                        Main_addCommas(stream.viewers) + STR_VIEWER,
                        Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.broadcaster_language)
                    ]));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (AGame_dataEnded && !AGame_itemsCountCheck) {
                AGame_itemsCountCheck = true;
                AGame_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(AGame_ids[9] + row_id + '_' + coloumn_id));
            AGame_emptyCellVector.push(AGame_ids[9] + row_id + '_' + coloumn_id);
        }
        doc.appendChild(row);
    }

    AGame_loadDataSuccessFinish();
}

function AGame_loadDataSuccessFinish() {
    if (!AGame_status) {
        AGame_Checkfallow();
        if (AGame_emptyContent) {
            Main_showWarningDialog(STR_NO + STR_LIVE_GAMES);
            AGame_cursorY = -1;
            AGame_addFocusFallow();
        } else {
            AGame_status = true;
            Main_imgVectorLoad(IMG_404_VIDEO);
            AGame_addFocus();
            Main_SaveValues();
        }
        Main_ShowElement(AGame_ids[10]);
        Main_FirstLoad = false;
        Main_HideLoadDialog();
    } else {
        Main_imgVectorLoad(IMG_404_VIDEO);
        if (AGame_emptyCellVector.length > 0 && !AGame_dataEnded) {
            AGame_loadDataPrepare();
            AGame_loadDataReplace();
            return;
        } else {
            Main_CounterDialog(AGame_cursorX, AGame_cursorY, Main_ColoumnsCountVideo, AGame_itemsCount);
            AGame_emptyCellVector = [];
        }
    }
    AGame_loadingData = false;
}

function AGame_Checkfallow() {
    if (AGame_UserGames) {
        AGame_fallowing = true;
        AGame_setFallow();
    } else if (AddUser_UserIsSet()) AddCode_CheckFallowGame();
    else {
        AGame_fallowing = false;
        AGame_setFallow();
    }
}

function AGame_setFallow() {
    if (AGame_fallowing) Main_innerHTML(AGame_ids[3] + "y_2", '<i class="icon-heart" style="color: #00b300; font-size: 100%; text-shadow: #FFFFFF 0 0 10px, #FFFFFF 0 0 10px, #FFFFFF 0 0 8px;"></i>' + STR_SPACE + STR_SPACE + STR_FALLOWING);
    else Main_innerHTML(AGame_ids[3] + "y_2", '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; text-shadow: #000000 0 0 10px, #000000 0 0 10px, #000000 0 0 8px;"></i>' + STR_SPACE + STR_SPACE + (AddUser_UserIsSet() ? STR_FALLOW : STR_NOKEY));
}

function AGame_fallow() {
    if (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token) {
        if (AGame_fallowing) AddCode_UnFallowGame();
        else AddCode_FallowGame();
    } else {
        Main_showWarningDialog(STR_NOKEY_WARN);
        window.setTimeout(function() {
            if (AGame_emptyContent && Main_values.Main_Go === Main_aGame) Main_showWarningDialog(STR_NO + STR_LIVE_GAMES);
            else Main_HideWarningDialog();
        }, 2000);
    }
}

function AGame_headerOptions() {
    if (!AGame_cursorX) {
        Main_values.Main_Go = Main_AGameVod;
        Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
        AGame_headerOptionsExit();
        Main_SwitchScreenAction();
    } else if (AGame_cursorX === 1) {
        Main_values.Main_Go = Main_AGameClip;
        Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
        AGame_headerOptionsExit();
        Main_SwitchScreenAction();
    } else AGame_fallow();
}

function AGame_headerOptionsExit() {
    if (AGame_status && AGame_cursorY === -1) {
        AGame_removeFocusFallow();
        AGame_cursorY = 0;
        AGame_cursorX = 0;
        Main_AddClass(AGame_ids[0] + '0_' + AGame_cursorX, Main_classThumb);
    }
    document.body.removeEventListener("keydown", AGame_handleKeyDown);
    Main_HideElement(AGame_ids[10]);
}

function AGame_loadDataReplace() {
    Main_SetItemsLimitReplace(AGame_emptyCellVector.length);

    var offset = AGame_itemsCount + AGame_itemsCountOffset;
    if (offset && offset > (AGame_MaxOffset - 1)) {
        offset = AGame_MaxOffset - Main_ItemsLimitReplace;
        AGame_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(Main_values.Main_gameSelected) +
        '&limit=' + Main_ItemsLimitReplace + '&offset=' + offset +
        (Main_ContentLang !== "" ? ('&broadcaster_language=' + Main_ContentLang) : '');

    BasehttpGet(theUrl, AGame_loadingDataTimeout, 2, null, AGame_loadDataSuccessReplace, AGame_loadDataErrorReplace);
}

function AGame_loadDataErrorReplace() {
    AGame_loadingDataTry++;
    if (AGame_loadingDataTry < AGame_loadingDataTryMax) {
        AGame_loadingDataTimeout += 500;
        AGame_loadDataReplace();
    } else {
        AGame_dataEnded = true;
        AGame_itemsCount -= AGame_emptyCellVector.length;
        AGame_emptyCellVector = [];
        AGame_loadDataSuccessFinish();
    }
}

function AGame_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.streams.length,
        stream, id, i = 0,
        cursor = 0,
        tempVector = [];

    AGame_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitReplace) AGame_dataEnded = true;

    for (i; i < AGame_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        id = stream.channel._id;
        if (AGame_idObject[id]) i--;
        else {
            AGame_idObject[id] = 1;
            Main_replaceVideo(AGame_emptyCellVector[i], [stream.channel.name, id],
                [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                    Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                    stream.channel.status, stream.game,
                    STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR +
                    Main_addCommas(stream.viewers) + STR_VIEWER,
                    Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.broadcaster_language)
                ], AGame_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) AGame_emptyCellVector.splice(tempVector[i], 1);

    AGame_itemsCountOffset += cursor;
    if (AGame_dataEnded) {
        AGame_itemsCount -= AGame_emptyCellVector.length;
        AGame_emptyCellVector = [];
    }

    AGame_loadDataSuccessFinish();
}

function AGame_addFocus() {
    if (AGame_cursorY < 0) {
        AGame_addFocusFallow();
        return;
    }
    Main_addFocusVideo(AGame_cursorY, AGame_cursorX, AGame_ids, Main_ColoumnsCountVideo, AGame_itemsCount);

    if (((AGame_cursorY + Main_ItemsReloadLimitVideo) > (AGame_itemsCount / Main_ColoumnsCountVideo)) &&
        !AGame_dataEnded && !AGame_loadingData) {
        AGame_loadDataPrepare();
        AGame_loadDataRequest();
    }
    if (Main_CenterLablesInUse) AGame_removeFocus();
}

function AGame_removeFocus() {
    if (AGame_cursorY > -1 && AGame_itemsCount) Main_removeFocus(AGame_cursorY + '_' + AGame_cursorX, AGame_ids);
    else AGame_removeFocusFallow();
}

function AGame_addFocusFallow() {
    Main_AddClass(AGame_ids[0] + 'y_' + AGame_cursorX, Main_classThumb);
}

function AGame_removeFocusFallow() {
    Main_RemoveClass(AGame_ids[0] + 'y_' + AGame_cursorX, Main_classThumb);
}

function AGame_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
                AGame_removeFocus();
                AGame_removeFocusFallow();
                Main_CenterLablesStart(AGame_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (AGame_cursorY === -1) {
                AGame_removeFocusFallow();
                AGame_cursorX--;
                if (AGame_cursorX < 0) AGame_cursorX = 2;
                AGame_addFocusFallow();
            } else if (!AGame_cursorY && !AGame_cursorX) {
                AGame_removeFocus();
                AGame_removeFocusFallow();
                AGame_cursorY = -1;
                AGame_cursorX = 2;
                AGame_addFocusFallow();
            } else if (Main_ThumbNull((AGame_cursorY), (AGame_cursorX - 1), AGame_ids[0])) {
                AGame_removeFocus();
                AGame_cursorX--;
                AGame_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((AGame_cursorY - 1), i, AGame_ids[0])) {
                        AGame_removeFocus();
                        AGame_cursorY--;
                        AGame_cursorX = i;
                        AGame_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (AGame_cursorY === -1) {
                AGame_removeFocusFallow();
                AGame_cursorX++;
                if (AGame_cursorX > 2) {
                    AGame_cursorX = 0;
                    if (!AGame_emptyContent) {
                        AGame_cursorY = 0;
                        AGame_addFocus();
                    } else AGame_addFocusFallow();
                } else AGame_addFocusFallow();
            } else if (Main_ThumbNull((AGame_cursorY), (AGame_cursorX + 1), AGame_ids[0])) {
                AGame_removeFocus();
                AGame_cursorX++;
                AGame_addFocus();
            } else if (Main_ThumbNull((AGame_cursorY + 1), 0, AGame_ids[0])) {
                AGame_removeFocus();
                AGame_cursorY++;
                AGame_cursorX = 0;
                AGame_addFocus();
            }
            break;
        case KEY_UP:
            if (AGame_cursorY === -1 && !AGame_emptyContent) {
                AGame_cursorY = 0;
                AGame_removeFocusFallow();
                AGame_addFocus();
            } else if (!AGame_cursorY) {
                AGame_removeFocus();
                AGame_cursorY = -1;
                AGame_addFocusFallow();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((AGame_cursorY - 1), (AGame_cursorX - i), AGame_ids[0])) {
                        AGame_removeFocus();
                        AGame_cursorY--;
                        AGame_cursorX = AGame_cursorX - i;
                        AGame_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_DOWN:
            if (AGame_cursorY === -1 && !AGame_emptyContent) {
                AGame_cursorY = 0;
                AGame_removeFocusFallow();
                AGame_addFocus();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((AGame_cursorY + 1), (AGame_cursorX - i), AGame_ids[0])) {
                        AGame_removeFocus();
                        AGame_cursorY++;
                        AGame_cursorX = AGame_cursorX - i;
                        AGame_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (AGame_cursorY !== -1) {
                Main_OpenLiveStream(AGame_cursorY + '_' + AGame_cursorX, AGame_ids, AGame_handleKeyDown);
            } else AGame_headerOptions();
            break;
        default:
            break;
    }
}//Variable initialization
var inUseObj = {};
inUseObj.FirstLoad = false;

//Initiate all Main screens obj and they properties
function Screens_InitScreens() {
    console.log('InitScreens place holder');
}

//Initiate all Secondary screens obj and they properties
function Screens_InitSecondaryScreens() {
    //Live screens
    ScreensObj_InitLive();
    ScreensObj_InitFeatured();

    //Clips screens
    ScreensObj_InitClip();
    ScreensObj_InitChannelClip();
    ScreensObj_InitAGameClip();

    //Games screens
    ScreensObj_InitGame();
    ScreensObj_InitUserGames();
}

//TODO cleanup not used when finished migrate all
function Screens_ScreenIds(base) {
    return [base + '_thumbdiv', base + '_img', base + '_infodiv', base + '_title', base + '_createdon', base + '_game', base + '_viwers', base + '_duration', base + '_cell', 'cpempty_', base + '_scroll', base + '_lang'];
}

function Screens_assign() {
    var ret = {},
        i = 0,
        j;
    for (i; i < arguments.length; i += 1) {

        var obj = arguments[i],
            keys = Object.keys(obj);

        for (j = 0; j < keys.length; j += 1)
            ret[keys[j]] = obj[keys[j]];

    }
    return ret;
}

//Variable initialization end

function Screens_init() {
    Main_addFocusVideoOffset = -1;
    Main_values.Main_Go = inUseObj.screen;
    inUseObj.label_init();

    document.body.addEventListener("keydown", Screens_handleKeyDown, false);
    if (inUseObj.status) {
        Main_ShowElement(inUseObj.ids[10]);
        Main_YRst(inUseObj.posY);
        Screens_addFocus();
        Main_SaveValues();
    } else Screens_StartLoad();
}

function Screens_exit() {
    Main_addFocusVideoOffset = 0;
    inUseObj.label_exit();
    document.body.removeEventListener("keydown", Screens_handleKeyDown);
    Main_HideElement(inUseObj.ids[10]);
}

function Screens_StartLoad() {
    Main_showLoadDialog();
    Main_empty(inUseObj.table);
    Main_HideWarningDialog();
    inUseObj.cursor = null;
    inUseObj.status = false;
    inUseObj.row = document.createElement('div');
    inUseObj.MaxOffset = 0;
    inUseObj.TopRowCreated = false;
    inUseObj.offset = 0;
    inUseObj.idObject = {};
    inUseObj.FirstLoad = true;
    inUseObj.itemsCount = 0;
    inUseObj.posX = 0;
    inUseObj.posY = 0;
    inUseObj.row_id = 0;
    inUseObj.coloumn_id = 0;
    inUseObj.data = null;
    inUseObj.data_cursor = 0;
    inUseObj.dataEnded = false;
    Main_CounterDialogRst();
    Screens_loadDataPrepare();
    Screens_loadDataRequest();
}

function Screens_loadDataPrepare() {
    inUseObj.loadingData = true;
    inUseObj.loadingDataTry = 0;
    inUseObj.loadingDataTimeout = 3500;
}

function Screens_loadDataRequest() {
    inUseObj.set_url();
    BasehttpGet(inUseObj.url, inUseObj.loadingDataTimeout, 2, null, Screens_concatenate, Screens_loadDataError);
}

function Screens_loadDataError() {
    inUseObj.loadingDataTry++;
    if (inUseObj.loadingDataTry < inUseObj.loadingDataTryMax) {
        inUseObj.loadingDataTimeout += 500;
        Screens_loadDataRequest();
    } else {
        inUseObj.loadingData = false;
        if (!inUseObj.itemsCount) {
            inUseObj.FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else inUseObj.dataEnded = true;
    }
}

function Screens_concatenate(responseText) {
    inUseObj.concatenate(responseText);
}

function Screens_loadDataSuccess() {
    var response_items = (inUseObj.data.length - inUseObj.data_cursor);

    //Use appendDiv only if is the intention to add on it run of loadDataSuccess to the row less content then ColoumnsCount,
    //with will make the row not be full, intentionally to add more in a new run of loadDataSuccess to that same row

    //If the intention is to load less then ColoumnsCount for it row consistently (have multiple not full rows), this function needs to be reworked appendDiv will not solve it, and that doesn't make sense for most screens.

    //appendDiv doesn't applies if the content end and we have less then ColoumnsCount to add for the last row

    //var appendDiv = !inUseObj.coloumn_id;
    if (response_items > inUseObj.ItemsLimit) response_items = inUseObj.ItemsLimit;
    else if (!inUseObj.loadingData) inUseObj.dataEnded = true;

    if (response_items) {
        var response_rows = Math.ceil(response_items / inUseObj.ColoumnsCount);

        var max_row = inUseObj.row_id + response_rows;

        var doc = document.getElementById(inUseObj.table);

        if (inUseObj.HasSwitches && !inUseObj.TopRowCreated) {
            inUseObj.TopRowCreated = true;
            inUseObj.row = document.createElement('div');
            var thumbfallow = '<i class="icon-history stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_SWITCH_CLIP;
            Main_td = document.createElement('div');
            Main_td.setAttribute('id', inUseObj.ids[8] + 'y_0');
            Main_td.className = 'stream_cell_period';
            Main_td.innerHTML = '<div id="' + inUseObj.ids[0] +
                'y_0" class="stream_thumbnail_channel_vod" ><div id="' + inUseObj.ids[3] +
                'y_0" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
            inUseObj.row.appendChild(Main_td);
            doc.appendChild(inUseObj.row);
        }

        for (inUseObj.row_id; inUseObj.row_id < max_row;) {

            if (inUseObj.coloumn_id === inUseObj.ColoumnsCount) {
                inUseObj.row = document.createElement('div');
                inUseObj.coloumn_id = 0;
                //appendDiv = true;
            }

            for (inUseObj.coloumn_id; inUseObj.coloumn_id < inUseObj.ColoumnsCount && inUseObj.data_cursor < inUseObj.data.length; inUseObj.data_cursor++) {
                //TODO understand and fix before the code reaches this point way a cell is undefined some times
                if (inUseObj.data[inUseObj.data_cursor]) inUseObj.addCell(inUseObj.data[inUseObj.data_cursor]);
            }

            //if (appendDiv)
            doc.appendChild(inUseObj.row);
            if (inUseObj.coloumn_id === inUseObj.ColoumnsCount) inUseObj.row_id++;
            else if (inUseObj.data_cursor >= inUseObj.data.length) break;
        }
    }
    inUseObj.emptyContent = !response_items && !inUseObj.status;
    Screens_loadDataSuccessFinish();
}

function Screens_createCellBase(row_id, coloumn_id, idArray, thumbnail) {

    var id = row_id + '_' + coloumn_id;
    Main_imgVectorPush(idArray[1] + id, thumbnail);
    if (row_id < inUseObj.ColoumnsCount) Main_CacheImage(thumbnail); //try to pre cache first 3 rows

    Main_td = document.createElement('div');
    Main_td.style.cssText = inUseObj.ThumbCssText;

    return id;
}

function Screens_createCellGame(row_id, coloumn_id, idArray, thumbnail, game_name, views) {

    var id = Screens_createCellBase(row_id, coloumn_id, idArray, thumbnail);

    Main_td.setAttribute('id', idArray[5] + id);
    Main_td.setAttribute(Main_DataAttribute, game_name);

    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_game"><div><img id="' +
        idArray[1] + id + '" class="stream_img"></div><div id="' +
        idArray[2] + id + '" class="stream_text2"><div id="<div id="' +
        idArray[3] + id + '" class="stream_channel">' + game_name + '</div>' +
        (views !== '' ? '<div id="' + idArray[4] + id + '"class="stream_info_games" style="width: 100%; display: inline-block;">' + views + '</div>' : '') +
        '</div></div>';

    return Main_td;
}

//TODO Reduce the number of vars here please
function Screens_createCellClip(row_id, coloumn_id, idArray, thumbnail, display_name, created_at, title_game, views, language, duration, video_id, name, logo, streamer_id, vod_id, vod_offset) {

    var id = Screens_createCellBase(row_id, coloumn_id, idArray, thumbnail);

    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify([video_id,
        duration,
        title_game[2],
        name,
        display_name,
        logo,
        streamer_id,
        vod_id,
        vod_offset,
        title_game[0],
        language,
        title_game[1] + title_game[2]
    ]));

    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_clip"><div><img id="' +
        idArray[1] + id + '" class="stream_img"></div><div id="' +
        idArray[2] + id + '" class="stream_text2"><div style="line-height: 14px;"><div id="' +
        idArray[3] + id + '" class="stream_info" style="width: 72%; display: inline-block; font-size: 85%;">' +
        display_name + '</div><div id="' + idArray[7] + id +
        '"class="stream_info" style="width:27%; float: right; text-align: right; display: inline-block;">' + language +
        '</div></div><div  style="line-height: 12px;"><div id="' + idArray[4] + id + '"class="stream_info" style="width: 59%; display: inline-block;">' +
        created_at[0] + created_at[1] + '</div><div id="' + idArray[5] + id +
        '"class="stream_info" style="width: 39%; display: inline-block; float: right; text-align: right;">' +
        STR_DURATION + Play_timeS(duration) + '</div></div><div id="' + idArray[11] + id + '"class="stream_info">' +
        title_game[0] + STR_BR + title_game[1] + title_game[2] + '</div><div id="' + idArray[6] + id +
        '"class="stream_info">' + views + STR_VIEWS + '</div></div></div>';

    return Main_td;
}

function Screens_createCellLive(row_id, coloumn_id, data, idArray, valuesArray) {

    var id = Screens_createCellBase(row_id, coloumn_id, idArray, valuesArray[0]);

    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify(data));

    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_clip"><div><img id="' +
        idArray[1] + id + '" class="stream_img"></div><div id="' +
        idArray[2] + id + '" class="stream_text2"><div style="line-height: 14px;"><div id="' +
        idArray[3] + id + '" class="stream_channel" style="width: 66%; display: inline-block;">' +
        valuesArray[1] + '</div><div id="' + idArray[7] + id +
        '"class="stream_info" style="width:33%; float: right; text-align: right; display: inline-block;">' +
        valuesArray[5] + '</div></div>' +
        '<div id="' + idArray[4] + id + '"class="stream_info">' + twemoji.parse(valuesArray[2]) + '</div>' +
        '<div id="' + idArray[5] + id + '"class="stream_info">' + STR_PLAYING + valuesArray[3] + '</div>' +
        '<div id="' + idArray[6] + id + '"class="stream_info">' + valuesArray[4] + '</div></div></div>';

    return Main_td;
}

function Screens_loadDataSuccessFinish() {
    if (!inUseObj.status) {
        if (inUseObj.emptyContent) Main_showWarningDialog(inUseObj.empty_str());
        else {
            inUseObj.status = true;
            Main_imgVectorLoad(inUseObj.img_404);
        }
        //TODO improve this check
        if (Main_FirstRun && inUseObj.status && Settings_value.restor_playback.defaultValue) {
            if (Main_values.Play_WasPlaying) {

                Main_ExitCurrent(Main_values.Main_Go);
                Main_values.Main_Go = Main_GoBefore;
                if (!Main_values.vodOffset) Main_values.vodOffset = 1;
                ChannelVod_DurationSeconds = Main_values.vodOffset + 1;

                Play_showWarningDialog(STR_RESTORE_PLAYBACK_WARN);

                if (Main_values.Play_WasPlaying === 1) Main_openStream();
                else Main_openVod();

                Main_SwitchScreen(true);
                window.setTimeout(function() {
                    if (!Play_IsWarning) Play_HideWarningDialog();
                }, 2000);
            } else if (Main_GoBefore !== 1) {
                Main_ExitCurrent(Main_values.Main_Go);
                Main_values.Main_Go = Main_GoBefore;
                Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
                Main_SwitchScreen();
            } else {
                if (Main_values.Never_run) Main_showControlsDialog();
                Main_values.Never_run = false;
                Screens_addFocus();
                Main_SaveValues();
            }
        } else {
            Screens_addFocus();
            Main_SaveValues();
        }
        Main_FirstRun = false;
        inUseObj.FirstLoad = false;
        Main_HideLoadDialog();
    } else {
        Main_imgVectorLoad(inUseObj.img_404);
        Main_CounterDialog(inUseObj.posX, inUseObj.posY, inUseObj.ColoumnsCount, inUseObj.itemsCount);
    }
}

function Screens_addFocus() {
    if (inUseObj.posY < 0) {
        Screens_addFocusFallow();
        return;
    }

    inUseObj.addFocus(inUseObj.posY, inUseObj.posX, inUseObj.ids, inUseObj.ColoumnsCount, inUseObj.itemsCount);

    //Load more as the data is getting used
    if ((inUseObj.posY > 2) && (inUseObj.data_cursor + Main_ItemsLimitMax) > inUseObj.data.length && !inUseObj.dataEnded && !inUseObj.loadingData) {
        Screens_loadDataPrepare();
        Screens_loadDataRequest();
    }

    if ((inUseObj.posY + inUseObj.ItemsReloadLimit) > (inUseObj.itemsCount / inUseObj.ColoumnsCount) && inUseObj.data_cursor < inUseObj.data.length) {
        Main_imgVectorRst();
        inUseObj.loadDataSuccess();
    }

    if (Main_CenterLablesInUse) Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
}

function Screens_ChangeFocus(y, x) {
    Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
    inUseObj.posY += y;
    inUseObj.posX = x;
    Screens_addFocus();
}

function Screens_addFocusFallow() {
    Main_AddClass(inUseObj.ids[0] + 'y_0', Main_classThumb);
}

function Screens_removeFocusFallow() {
    Main_RemoveClass(inUseObj.ids[0] + 'y_0', Main_classThumb);
}

function Screens_BasicExit(before) {
    if (Main_isControlsDialogShown()) Main_HideControlsDialog();
    else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
    else {
        if (before === inUseObj.screen) Main_values.Main_Go = Main_Live;
        else Main_values.Main_Go = before;
        Screens_exit();
    }
}

function Screens_KeyUpDown(y) {
    //TODO improve this
    if (inUseObj.HasSwitches && !inUseObj.posY && y === -1 && !inUseObj.emptyContent) {
        Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
        inUseObj.posY = -1;
        Screens_addFocusFallow();
    } else if (inUseObj.HasSwitches && (inUseObj.posY) === -1) {
        inUseObj.posY = 0;
        Screens_addFocus();
        Screens_removeFocusFallow();
    } else {
        for (var i = 0; i < inUseObj.ColoumnsCount; i++) {
            if (Main_ThumbNull((inUseObj.posY + y), (inUseObj.posX - i), inUseObj.ids[0])) {
                Screens_ChangeFocus(y, inUseObj.posX - i);
                return;
            }
        }
    }
}

function Screens_KeyLeftRight(y, x) {
    if (Main_ThumbNull((inUseObj.posY), (inUseObj.posX + y), inUseObj.ids[0]))
        Screens_ChangeFocus(0, (inUseObj.posX + y));
    else if (Main_ThumbNull((inUseObj.posY + y), x, inUseObj.ids[0]))
        Screens_ChangeFocus(y, x);
}

function Screens_handleKeyDown(event) {
    if (inUseObj.FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    switch (event.keyCode) {
        case KEY_RETURN:
            inUseObj.key_exit();
            break;
        case KEY_LEFT:
            Screens_KeyLeftRight(-1, inUseObj.ColoumnsCount - 1);
            break;
        case KEY_RIGHT:
            Screens_KeyLeftRight(1, 0);
            break;
        case KEY_UP:
            Screens_KeyUpDown(-1);
            break;
        case KEY_DOWN:
            Screens_KeyUpDown(1);
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            inUseObj.key_play();
            break;
        default:
            break;
    }
}//Variable initialization
var ChatLive_loadingDataTry = 0;
var ChatLive_loadingDataTryMax = 10;
var ChatLive_loadEmotesChannelId;
var ChatLive_hasEnded = false;
var ChatLive_Id = 0;
var ChatLive_loadBadgesChannelId;
var ChatLive_socket = null;
var ChatLive_loaded = false;
var ChatLive_CheckId;
var ChatLive_FixId;
var ChatLive_LineAddCounter = 0;
var extraEmotesDone = {};
var extraEmotes = {};
//Variable initialization end

function ChatLive_Init() { // jshint ignore:line
    ChatLive_Clear();
    if (!Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }
    if (!Chat_LoadGlobal) Chat_loadBadgesGlobal();

    ChatLive_loaded = false;

    Main_ready(function() {
        ChatLive_Id = (new Date()).getTime();
        ChatLive_loadBadgesChannel(ChatLive_Id);
    });

}

function ChatLive_loadBadgesChannel(id) {
    ChatLive_loadingDataTry = 0;
    ChatLive_loadBadgesChannelRequest(id);
}

function ChatLive_loadBadgesChannelRequest(id) {
    var theUrl = 'https://badges.twitch.tv/v1/badges/channels/' + Main_values.Play_selectedChannel_id + '/display';
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                if (ChatLive_Id === id) ChatLive_loadBadgesChannelSuccess(xmlHttp.responseText, id);
                return;
            } else {
                if (ChatLive_Id === id) ChatLive_loadBadgesChannelError(id);
            }
        }
    };

    xmlHttp.send(null);
}

function ChatLive_loadBadgesChannelError(id) {
    ChatLive_loadingDataTry++;
    if (ChatLive_Id === id) {
        if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadBadgesChannelRequest(id);
        else {
            ChatLive_loadBadgesChannelId = window.setTimeout(function() {
                ChatLive_loadBadgesChannelRequest(id);
            }, 1000);
        }
    }
}

function ChatLive_loadBadgesChannelSuccess(responseText, id) {
    transformBadges(JSON.parse(responseText).badge_sets).forEach(function(badge) {
        badge.versions.forEach(function(version) {
            tagCSS(badge.type, version.type, version.image_url_4x, Chat_div);
        });
    });

    if (!extraEmotesDone[Main_values.Play_selectedChannel_id]) ChatLive_loadEmotesChannel(id);
    else if (ChatLive_Id === id) ChatLive_loadChat();
}

function ChatLive_loadEmotesChannel(id) {
    ChatLive_loadingDataTry = 0;
    ChatLive_loadEmotesChannelRequest(id);
}

function ChatLive_loadEmotesChannelRequest(id) {
    var theUrl = 'https://api.betterttv.net/2/channels/' + encodeURIComponent(Main_values.Play_selectedChannel);
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                if (ChatLive_Id === id) ChatLive_loadEmotesChannelSuccess(xmlHttp.responseText, id);
            } else if (xmlHttp.status === 404) {
                extraEmotesDone[Main_values.Play_selectedChannel_id] = 1;
                if (ChatLive_Id === id) ChatLive_loadChat();
            } else {
                if (ChatLive_Id === id) ChatLive_loadEmotesChannelError(id);
            }
        }
    };

    xmlHttp.send(null);
}

function ChatLive_loadEmotesChannelError(id) {
    ChatLive_loadingDataTry++;
    if (ChatLive_Id === id) {
        if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadEmotesChannelRequest(id);
        else if (ChatLive_Id === id) ChatLive_loadChat();
    }
}

function ChatLive_loadEmotesChannelSuccess(data, id) {
    data = JSON.parse(data);
    data.emotes.forEach(function(emote) {
        extraEmotes[emote.code] = {
            restrictions: emote.restrictions,
            code: emote.code,
            source: 'bttv',
            id: emote.id,
            '1x': 'https:' + data.urlTemplate.replace('{{id}}', emote.id).replace('{{image}}', '1x'),
            '2x': 'https:' + data.urlTemplate.replace('{{id}}', emote.id).replace('{{image}}', '2x'),
            '3x': 'https:' + data.urlTemplate.replace('{{id}}', emote.id).replace('{{image}}', '3x')
        };
    });

    extraEmotesDone[Main_values.Play_selectedChannel_id] = 1;
    if (ChatLive_Id === id) ChatLive_loadChat();
}

function ChatLive_loadChat() {
    ChatLive_CheckClear();
    ChatLive_loadChatRequest();
}

function ChatLive_loadChatRequest() {

    ChatLive_socket = new ReconnectingWebSocket('wss://irc-ws.chat.twitch.tv', 'irc', {
        reconnectInterval: 3000
    });

    ChatLive_socket.onopen = function() {
        ChatLive_socket.send('PASS blah\r\n');
        ChatLive_socket.send('NICK justinfan12345\r\n');
        ChatLive_socket.send('CAP REQ :twitch.tv/commands twitch.tv/tags\r\n');
        ChatLive_socket.send('JOIN #' + Main_values.Play_selectedChannel + '\r\n');
    };

    ChatLive_socket.onclose = function() {
        ChatLive_hasEnded = true;
    };

    ChatLive_socket.onmessage = function(data) {

        var message = window.parseIRC(data.data.trim());

        if (!message.command) return;

        switch (message.command) {
            case "PING":
                ChatLive_socket.send('PONG ' + message.params[0]);
                break;
            case "JOIN":
                ChatLive_loaded = true;
                var div = '&nbsp;<span class="message">' + STR_BR + STR_LOADING_CHAT +
                    Main_values.Play_selectedChannelDisplayname + ' ' + STR_LIVE + '</span>';
                ChatLive_LineAdd(div);
                break;
            case "PRIVMSG":
                ChatLive_loadChatSuccess(message);
                break;
            default:
                break;
        }
    };

    ChatLive_CheckId = window.setTimeout(ChatLive_Check, 5000);
}

function ChatLive_Check() {
    if (!ChatLive_loaded) {
        ChatLive_socket.close(1000);
        ChatLive_loadChat();
    } else ChatLive_FixId = window.setInterval(ChatLive_ChatFixPosition, 1000);
}

function ChatLive_CheckClear() {
    window.clearTimeout(ChatLive_CheckId);
}

function ChatLive_loadChatSuccess(message) {
    var div = '',
        tags = message.tags;

    //Add badges
    if (tags.hasOwnProperty('badges')) {
        if (typeof tags.badges === 'string') {
            tags.badges.split(',').forEach(function(badge) {
                badge = badge.split('/');

                div += '<span class="' + badge[0] + '-' + badge[1] + ' tag"></span>';
            });
        }
    }

    //Add nick
    if (tags.hasOwnProperty('display-name')) {
        var nick = tags['display-name'];
        if (typeof nick === 'string')
            div += '<span class="nick" style="color: #' + defaultColors[(nick).charCodeAt(0) % defaultColorsLength] + ';">' + nick + '</span>&#58;&nbsp;';
    }

    //Add message
    var mmessage = message.params[1];
    mmessage = mmessage.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    if (/^\x01ACTION.*\x01$/.test(mmessage))
        mmessage = mmessage.replace(/^\x01ACTION/, '').replace(/\x01$/, '').trim();

    var emotes = {};

    if (tags.hasOwnProperty('emotes')) {
        if (typeof tags.emotes === 'string') {

            tags.emotes = tags.emotes.split('/');

            tags.emotes.forEach(function(emote) {
                emote = emote.split(':');

                if (!emotes[emote[0]]) emotes[emote[0]] = [];

                var replacements = emote[1].split(',');
                replacements.forEach(function(replacement) {
                    replacement = replacement.split('-');

                    emotes[emote[0]].push([parseInt(replacement[0]), parseInt(replacement[1])]);
                });
            });
        }
    }

    var tokenizedMessage = emoticonize(mmessage, emotes);

    for (var i = 0; i < tokenizedMessage.length; i++) {
        if (typeof tokenizedMessage[i] === 'string') {
            tokenizedMessage[i] = extraMessageTokenize(tags, tokenizedMessage[i]);
        } else {
            tokenizedMessage[i] = tokenizedMessage[i][0];
        }
    }

    message = tokenizedMessage.join(' ');
    message = twemoji.parse(message, true, true);

    div += '<span class="message">' + message + '</span>';

    ChatLive_LineAdd(div);
}

function ChatLive_LineAdd(message) {
    var elem = document.createElement('div');
    elem.className = 'chat_line';
    elem.innerHTML = message;

    Chat_div.appendChild(elem);
    ChatLive_ChatFixPosition();
    ChatLive_LineAddCounter++;
    if (ChatLive_LineAddCounter > 100) {
        ChatLive_LineAddCounter = 0;
        Chat_Clean();
    }
}

function ChatLive_ChatFixPosition() {
    Chat_div.scrollTop = Chat_div.scrollHeight;
}

function ChatLive_ClearIds() {
    ChatLive_CheckClear();
    window.clearTimeout(ChatLive_loadBadgesChannelId);
    window.clearTimeout(ChatLive_loadEmotesChannelId);
    window.clearInterval(ChatLive_FixId);
}

function ChatLive_Clear() {
    ChatLive_ClearIds();
    if (ChatLive_socket) ChatLive_socket.close(1000);
    ChatLive_Id = 0;
    Main_empty('chat_box');
    ChatLive_hasEnded = false;
    ChatLive_loaded = false;
}//Variable initialization
var PlayVod_quality = 'source';
var PlayVod_qualityPlaying = PlayVod_quality;

var PlayVod_state = 0;

var PlayVod_streamInfoTimerId = null;
var PlayVod_tokenResponse = 0;
var PlayVod_playlistResponse = 0;
var PlayVod_playingTry = 0;

var PlayVod_playingUrl = '';
var PlayVod_qualities = [];
var PlayVod_qualityIndex = 0;

var PlayVod_loadingDataTry = 0;
var PlayVod_loadingDataTryMax = 5;
var PlayVod_isOn = false;
var PlayVod_Buffer = 2000;

var PlayVod_loadingInfoDataTry = 0;
var PlayVod_loadingInfoDataTryMax = 5;
var PlayVod_loadingInfoDataTimeout = 10000;

var PlayVod_PlayerTime = 0;
var PlayVod_streamCheckId = null;
var PlayVod_PlayerCheckCount = 0;
var PlayVod_PlayerCheckQualityChanged = false;
var PlayVod_PlayerCheckCounter = 0;
var PlayVod_PlayerCheckRun = false;

var Play_jumping = false;
var PlayVod_SizeClearID;
var PlayVod_updateStreamInfId;
var PlayVod_addToJump = 0;
var PlayVod_IsJumping = false;
var PlayVod_jumpCount = 0;
var PlayVod_loadingDataTimeout = 2000;
var PlayVod_qualitiesFound = false;
var PlayVod_currentTime = 0;
var PlayVod_VodIds = {};
var PlayVod_VodPositions = 0;
var PlayVod_PanelY = 0;
var PlayVod_HasVodInfo = true;
var PlayVod_ProgressBaroffset = 0;
var PlayVod_StepsCount = 0;
var PlayVod_TimeToJump = 0;
var PlayVod_replay = false;
var PlayVod_jumpTimers = [0, 10, 30, 60, 120, 300, 600, 900, 1200, 1800];

var PlayVod_RefreshProgressBarrID;
var PlayVod_SaveOffsetId;
var PlayVod_WasSubChekd = false;
//Variable initialization end

function PlayVod_Start() {
    Play_showBufferDialog();
    Play_HideEndDialog();
    PlayVod_currentTime = 0;
    Main_textContent("stream_live_time", '');
    Main_textContent("stream_watching_time", '');
    Main_textContent('progress_bar_current_time', Play_timeS(0));
    Chat_title = STR_PAST_BROA + '.';
    Main_innerHTML('pause_button', '<i class="strokedbig icon-pause" style="color: #FFFFFF; font-size: 180%;"></i>');
    Main_HideElement('progress_pause_holder');
    PlayVod_StepsCount = 0;
    Play_DefaultjumpTimers = PlayVod_jumpTimers;
    PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);
    PlayVod_state = Play_STATE_LOADING_TOKEN;
    PlayClip_HasVOD = true;
    ChannelVod_vodOffset = 0;
    Main_values.Play_isHost = false;

    if (Main_values.vodOffset) { // this is a vod comming from a clip
        PlayVod_PrepareLoad();
        PlayVod_updateVodInfo();
    } else {
        if (PlayVod_HasVodInfo && Main_values.Main_selectedChannel_id !== '') {
            Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);
            if (!PlayVod_VodIds['#' + Main_values.ChannelVod_vodId]) Chat_Init();
            if (AddUser_UserIsSet()) {
                AddCode_Channel_id = Main_values.Main_selectedChannel_id;
                AddCode_PlayRequest = true;
                AddCode_CheckFallow();
            } else Play_hideFallow();
        } else {
            PlayVod_PrepareLoad();
            PlayVod_updateStreamerInfo();
        }
        Main_textContent("stream_info_name", Main_values.Main_selectedChannelDisplayname);
        Main_innerHTML("stream_info_title", ChannelVod_title);
        Main_innerHTML("stream_info_game", ChannelVod_views + ', [' + (ChannelVod_language).toUpperCase() + ']');
        Main_textContent("stream_live_icon", ChannelVod_createdAt);
    }

    if (PlayVod_VodIds['#' + Main_values.ChannelVod_vodId] && !Main_values.vodOffset) {
        Play_HideBufferDialog();
        Play_showVodDialog();
    } else {
        PlayVod_PosStart();
    }
}

function PlayVod_PosStart() {
    window.setTimeout(function() {
        Main_ShowElement('scene_channel_panel_bottom');
        Main_innerHTML('pause_button', '<i class="strokedbig icon-pause" style="color: #FFFFFF; font-size: 180%;"></i>');
        Main_ShowElement('progress_pause_holder');
    }, 1000);
    Main_textContent('progress_bar_duration', Play_timeS(ChannelVod_DurationSeconds));

    Main_values.Play_WasPlaying = 2;
    Main_SaveValues();

    PlayVod_SaveOffsetId = window.setInterval(PlayVod_SaveOffset, 60000);
    Main_CacheImage(Play_IncrementView);

    PlayVod_PlayerCheckCounter = 0;
    PlayVod_PlayerCheckCount = 0;
    window.clearInterval(PlayVod_streamCheckId);
    PlayVod_PlayerCheckRun = false;
    Play_PlayerPanelOffset = -13;
    PlayVod_qualitiesFound = false;
    Play_IsWarning = false;
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_tokenResponse = 0;
    PlayVod_playlistResponse = 0;
    PlayVod_playingTry = 0;
    document.addEventListener('visibilitychange', PlayVod_Resume, false);
    Play_jumping = false;
    PlayVod_isOn = true;
    PlayVod_WasSubChekd = false;
    PlayVod_loadData();
    Play_EndSet(2);
    document.body.removeEventListener("keyup", Main_handleKeyUp);
}

function PlayVod_PrepareLoad() {
    PlayVod_loadingInfoDataTry = 0;
    PlayVod_loadingInfoDataTryMax = 5;
    PlayVod_loadingInfoDataTimeout = 10000;
}

function PlayVod_updateStreamerInfo() {
    var theUrl = 'https://api.twitch.tv/kraken/users?login=' + encodeURIComponent(Main_values.Main_selectedChannel);
    BasexmlHttpGet(theUrl, PlayVod_loadingInfoDataTimeout, 2, null, PlayVod_updateStreamerInfoValues, PlayVod_updateStreamerInfoError, false);
}

function PlayVod_updateStreamerInfoValues(musers) {
    musers = JSON.parse(musers).users[0];
    if (musers !== undefined) {
        Main_values.Main_selectedChannelLogo = musers.logo;
        Main_values.Main_selectedChannel_id = musers._id;
        if (!PlayVod_VodIds['#' + Main_values.ChannelVod_vodId]) Chat_Init();
        if (AddUser_UserIsSet()) {
            AddCode_Channel_id = Main_values.Main_selectedChannel_id;
            AddCode_PlayRequest = true;
            AddCode_CheckFallow();
        } else Play_hideFallow();
    } else {
        Main_values.Main_selectedChannelLogo = IMG_404_LOGO;
        Main_values.Main_selectedChannel_id = '';
    }
    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);

}

function PlayVod_updateStreamerInfoError() {
    PlayVod_loadingInfoDataTry++;
    if (PlayVod_loadingInfoDataTry < PlayVod_loadingInfoDataTryMax) {
        PlayVod_loadingInfoDataTimeout += 500;
        window.setTimeout(function() {
            if (PlayVod_isOn) PlayVod_updateStreamerInfo();
        }, 750);
    } else PlayVod_updateStreamInfId = window.setTimeout(PlayVod_updateStreamerInfo, 2500);
}

function PlayVod_updateVodInfo() {
    var theUrl = 'https://api.twitch.tv/kraken/videos/' + Main_values.ChannelVod_vodId;
    BasexmlHttpGet(theUrl, PlayVod_loadingInfoDataTimeout, 2, null, PlayVod_updateVodInfoPannel, PlayVod_updateVodInfoError, false);
}

function PlayVod_updateVodInfoError() {
    PlayVod_loadingInfoDataTry++;
    if (PlayVod_loadingInfoDataTry < PlayVod_loadingInfoDataTryMax) {
        PlayVod_loadingInfoDataTimeout += 2000;
        PlayVod_updateVodInfo();
    }
}

function PlayVod_updateVodInfoPannel(response) {
    response = JSON.parse(response);

    Main_innerHTML("stream_info_title", twemoji.parse(response.title));
    Main_innerHTML("stream_info_game", STR_STARTED + STR_PLAYING + response.game +
        ', ' + Main_addCommas(response.views) + STR_VIEWS + ', [' + (response.channel.broadcaster_language).toUpperCase() + ']');
    Main_textContent("stream_live_icon", STR_STREAM_ON + Main_videoCreatedAt(response.created_at));

    ChannelVod_DurationSeconds = parseInt(response.length);
    Main_textContent('progress_bar_duration', Play_timeS(ChannelVod_DurationSeconds));

    PlayVod_currentTime = Main_values.vodOffset * 1000;
    PlayVod_ProgresBarrUpdate(Main_values.vodOffset, ChannelVod_DurationSeconds, true);

    Main_values.Main_selectedChannelDisplayname = response.channel.display_name;
    Main_textContent("stream_info_name", Main_values.Main_selectedChannelDisplayname);

    Main_values.Main_selectedChannelLogo = response.channel.logo;
    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);

    Main_values.Main_selectedChannel_id = response.channel._id;
    Main_values.Main_selectedChannel = response.channel.name;

    if (AddUser_UserIsSet()) {
        AddCode_PlayRequest = true;
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
        AddCode_CheckFallow();
    } else Play_hideFallow();
    Main_CacheImage(response.increment_view_count_url);
}

function PlayVod_Resume() {
    if (document.hidden) {
        if (Play_isEndDialogVisible()) {
            Play_CleanHideExit();
            Play_hideChat();
            PlayVod_shutdownStream();
        } else {
            PlayVod_SaveOffset();
            PlayVod_SaveVodIds();
            Chat_Pause();
            Play_ClearPlayer();
            window.clearInterval(PlayVod_streamCheckId);
            window.clearInterval(PlayVod_SaveOffsetId);
        }
    } else {
        PlayVod_isOn = true;
        Play_clearPause();
        if (PlayVod_isOn) {
            Play_showBufferDialog();
            Play_ResumeAfterOnlineCounter = 0;

            Play_ResumeAfterOnlineCounter = 0;
            if (navigator.onLine) PlayVod_onPlayer();
            else Play_ResumeAfterOnlineId = window.setInterval(PlayVod_ResumeAfterOnline, 100);

            Chat_Play(Chat_Id);
            Play_EndSet(2);
            PlayVod_SaveOffsetId = window.setInterval(PlayVod_SaveOffset, 60000);
        }
    }
}

function PlayVod_ResumeAfterOnline() {
    if (navigator.onLine || Play_ResumeAfterOnlineCounter > 200) {
        window.clearInterval(Play_ResumeAfterOnlineId);
        PlayVod_state = Play_STATE_LOADING_TOKEN;
        PlayVod_loadData();
    }
    Play_ResumeAfterOnlineCounter++;
}

function PlayVod_SaveOffset() {
    Main_values.vodOffset = Main_Android ? (parseInt(Android.gettime() / 1000)) : 0;
    Main_SaveValues();
    Main_values.vodOffset = 0;
}


function PlayVod_loadData() {
    PlayVod_loadingDataTry = 0;
    PlayVod_loadingDataTimeout = 2000;
    PlayVod_loadDataRequest();
}

function PlayVod_loadDataRequest() {
    var theUrl;

    if (PlayVod_state === Play_STATE_LOADING_TOKEN) {
        theUrl = 'https://api.twitch.tv/api/vods/' + Main_values.ChannelVod_vodId + '/access_token' +
            (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token ? '?oauth_token=' +
                AddUser_UsernameArray[Main_values.Users_Position].access_token : '');
    } else {
        theUrl = 'https://usher.ttvnw.net/vod/' + Main_values.ChannelVod_vodId +
            '.m3u8?&nauth=' + encodeURIComponent(PlayVod_tokenResponse.token) + '&nauthsig=' + PlayVod_tokenResponse.sig +
            '&allow_source=true&allow_audi_only=true&allow_spectre=false';
    }

    BasehttpGet(theUrl, Play_loadingDataTimeout, 1, null, PlayVod_loadDataSuccess, PlayVod_loadDataError, true);
}

function PlayVod_loadDataError() {
    if (PlayVod_isOn) {
        var mjson;
        if (PlayVod_tokenResponse.token) mjson = JSON.parse(PlayVod_tokenResponse.token);
        if (mjson) {
            if (JSON.parse(PlayVod_tokenResponse.token).chansub.restricted_bitrates.length !== 0) {
                PlayVod_loadDataCheckSub();
                return;
            }
        }

        PlayVod_loadingDataTry++;
        if (PlayVod_loadingDataTry < PlayVod_loadingDataTryMax) {
            PlayVod_loadingDataTimeout += 250;
            PlayVod_loadDataRequest();
        } else {
            if (!Main_isBrowser) {
                Play_HideBufferDialog();
                Play_PlayEndStart(2);
            } else PlayVod_loadDataSuccessFake();
        }
    }
}

//Browsers crash trying to get the streams link
function PlayVod_loadDataSuccessFake() {
    PlayVod_qualities = [{
        'id': '1080p60(Source)',
        'band': '(10.00Mbps)',
        'url': 'http://fake'
    }];
    PlayVod_state = Play_STATE_PLAYING;
    if (PlayVod_isOn) PlayVod_qualityChanged();
}

function PlayVod_loadDataSuccess(responseText) {
    if (PlayVod_state === Play_STATE_LOADING_TOKEN) {
        PlayVod_tokenResponse = JSON.parse(responseText);
        PlayVod_state = Play_STATE_LOADING_PLAYLIST;
        PlayVod_loadData();
    } else if (PlayVod_state === Play_STATE_LOADING_PLAYLIST) {
        PlayVod_playlistResponse = responseText;
        PlayVod_qualities = Play_extractQualities(PlayVod_playlistResponse);
        PlayVod_state = Play_STATE_PLAYING;
        if (PlayVod_isOn) PlayVod_qualityChanged();
    }
}

function PlayVod_loadDataCheckSub() {
    if (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token) {
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
        AddCode_CheckSub();
    } else {
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
    if (!PlayVod_WasSubChekd) {
        // Do one more try before failing, because the access_token may be expired on the first treys
        // the PlayVod_loadData can't check if is expired, but the AddCode_RequestCheckSub can
        // and will refresh the token if it fail, so just to be shore run the PlayVod_loadData one more time
        PlayVod_WasSubChekd = true;
        PlayVod_state = Play_STATE_LOADING_TOKEN;
        PlayVod_loadData();
    } else {
        Play_HideBufferDialog();
        Play_showWarningDialog(STR_IS_SUB_ONLY + STR_IS_SUB_IS_SUB);
        window.setTimeout(function() {
            if (PlayVod_isOn) PlayVod_shutdownStream();
        }, 4000);
    }
}

function PlayVod_qualityChanged() {
    window.clearInterval(PlayVod_streamCheckId);
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
    PlayVod_onPlayer();
}

function PlayVod_onPlayer() {
    if (Main_isDebug) console.log('PlayVod_onPlayer:', '\n' + '\n"' + PlayVod_playingUrl + '"\n');

    if (Main_values.vodOffset) {
        Chat_offset = Main_values.vodOffset;
        Chat_Init();
        if (Main_Android && PlayVod_isOn) Android.startVideoOffset(PlayVod_playingUrl, 2,
            PlayVod_replay ? -1 : (Main_values.vodOffset * 1000));
        Main_values.vodOffset = 0;
    } else if (Main_Android && PlayVod_isOn) Android.startVideoOffset(PlayVod_playingUrl, 2,
        PlayVod_replay ? -1 : Android.gettime());

    PlayVod_replay = false;
    if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();

    if (Main_Android) {
        PlayVod_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = 3 + (PlayVod_Buffer / 1000);
        PlayVod_PlayerCheckQualityChanged = false;
        window.clearInterval(PlayVod_streamCheckId);
        PlayVod_streamCheckId = window.setInterval(PlayVod_PlayerCheck, Play_PlayerCheckInterval);
    }
}

function PlayVod_PlayerCheck() {
    if (Main_Android) PlayVod_currentTime = Android.gettime();
    if (PlayVod_isOn && PlayVod_PlayerTime === PlayVod_currentTime && !Play_isNotplaying()) {
        PlayVod_PlayerCheckCount++;
        if (PlayVod_PlayerCheckCount > Play_PlayerCheckTimer) {

            //Don't change the first time only retry
            if (PlayVod_PlayerCheckQualityChanged && PlayVod_PlayerCheckRun && (PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1)) PlayVod_qualityIndex++;
            else if (!PlayVod_PlayerCheckQualityChanged && PlayVod_PlayerCheckRun) PlayVod_PlayerCheckCounter++;

            if (!navigator.onLine) Play_EndStart(false, 2);
            else if (PlayVod_PlayerCheckCounter > 1) Play_CheckConnection(PlayVod_PlayerCheckCounter, 2, PlayVod_DropOneQuality);
            else {
                PlayVod_qualityDisplay();
                PlayVod_qualityChanged();
                PlayVod_PlayerCheckRun = true;
            }

        } // else we try for too long let the listener onerror catch it
    } else {
        PlayVod_PlayerCheckCounter = 0;
        PlayVod_PlayerCheckCount = 0;
        PlayVod_PlayerCheckRun = false;
    }

    PlayVod_PlayerTime = PlayVod_currentTime;
}

function PlayVod_DropOneQuality(ConnectionDrop) {
    if (!ConnectionDrop) {
        if (PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1) PlayVod_qualityIndex++;
        else {
            Play_EndStart(false, 2);
            return;
        }
    }

    PlayVod_PlayerCheckCounter = 0;
    PlayVod_qualityDisplay();
    PlayVod_qualityChanged();
    PlayVod_PlayerCheckRun = true;
}

function PlayVod_shutdownStream() {
    if (PlayVod_isOn) {
        PlayVod_qualities = [];
        PlayVod_PreshutdownStream(true);
        Play_exitMain();
    }
}

function PlayVod_PreshutdownStream(saveOffset) {
    if (saveOffset) PlayVod_SaveVodIds();
    if (Main_Android) Android.stopVideo(2);
    PlayVod_isOn = false;
    window.clearInterval(PlayVod_SaveOffsetId);
    window.clearInterval(PlayVod_updateStreamInfId);
    Main_values.Play_WasPlaying = 0;
    PlayVod_HasVodInfo = true;
    Chat_Clear();
    UserLiveFeed_Hide();
    Play_ClearPlayer();
    PlayVod_ClearVod();
}

function PlayVod_ClearVod() {
    document.body.removeEventListener("keydown", PlayVod_handleKeyDown);
    document.removeEventListener('visibilitychange', PlayVod_Resume);
    Main_values.vodOffset = 0;
    window.clearInterval(PlayVod_streamInfoTimerId);
    window.clearInterval(PlayVod_streamCheckId);
    ChannelVod_DurationSeconds = 0;
}

function PlayVod_hidePanel() {
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_addToJump = 0;
    Play_clearHidePanel();
    document.getElementById("scene_channel_panel").style.opacity = "0";
    if (Main_Android) PlayVod_ProgresBarrUpdate((Android.gettime() / 1000), ChannelVod_DurationSeconds, true);
    Main_innerHTML('progress_bar_jump_to', STR_SPACE);
    document.getElementById('progress_bar_steps').style.display = 'none';
    PlayVod_quality = PlayVod_qualityPlaying;
    window.clearInterval(PlayVod_RefreshProgressBarrID);
}

function PlayVod_showPanel(autoHide) {
    PlayVod_RefreshProgressBarr();
    Play_clock();
    Play_CleanHideExit();
    PlayVod_RefreshProgressBarrID = window.setInterval(PlayVod_RefreshProgressBarr, 1000);
    if (autoHide) {
        PlayVod_IconsBottonResetFocus();
        PlayVod_qualityIndexReset();
        PlayVod_qualityDisplay();
        PlayVod_setHidePanel();
    }
    document.getElementById("scene_channel_panel").style.opacity = "1";
}

function PlayVod_RefreshProgressBarr() {
    if (Main_Android) PlayVod_ProgresBarrUpdate((Android.gettime() / 1000), ChannelVod_DurationSeconds, !PlayVod_IsJumping);
}

function PlayVod_IconsBottonResetFocus() {
    PlayVod_PanelY = Play_isNotplaying() ? 1 : 0;
    PlayVod_IconsBottonFocus();
}

function PlayVod_IconsBottonFocus() {
    if (!PlayVod_PanelY) { //progress_bar
        Main_RemoveClass('pause_button', 'progress_bar_div_focus');
        Main_AddClass('progress_bar_div', 'progress_bar_div_focus');
        Play_IconsRemoveFocus();
        if (PlayVod_addToJump) {
            PlayVod_jumpTime();
            document.getElementById('progress_bar_steps').style.display = 'inline-block';
        }
    } else if (PlayVod_PanelY === 1) { //pause_button
        Main_AddClass('pause_button', 'progress_bar_div_focus');
        Main_RemoveClass('progress_bar_div', 'progress_bar_div_focus');
        Play_IconsRemoveFocus();
        Main_innerHTML('progress_bar_jump_to', STR_SPACE);
        document.getElementById('progress_bar_steps').style.display = 'none';
    } else if (PlayVod_PanelY === 2) { //botton icons
        Main_RemoveClass('pause_button', 'progress_bar_div_focus');
        Main_RemoveClass('progress_bar_div', 'progress_bar_div_focus');
        Play_IconsAddFocus();
        Main_innerHTML('progress_bar_jump_to', STR_SPACE);
        document.getElementById('progress_bar_steps').style.display = 'none';
    }
}

function PlayVod_setHidePanel() {
    Play_PanelHideID = window.setTimeout(PlayVod_hidePanel, 5000 + PlayVod_ProgressBaroffset); // time in ms
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
    if (PlayVod_getQualitiesCount() === 1) {
        document.getElementById("quality_arrow_up").style.opacity = "0";
        document.getElementById("quality_arrow_down").style.opacity = "0";
    } else if (!PlayVod_qualityIndex) {
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
    if (PlayVod_quality.indexOf('source') !== -1) Main_textContent("quality_name", PlayVod_quality.replace("source", STR_SOURCE) + PlayVod_qualities[PlayVod_qualityIndex].band);
    else Main_textContent("quality_name", PlayVod_quality + PlayVod_qualities[PlayVod_qualityIndex].band);
}

function PlayVod_getQualitiesCount() {
    return PlayVod_qualities.length;
}

function PlayVod_ProgresBarrUpdate(current_time_seconds, duration_seconds, update_bar) {
    Main_textContent('progress_bar_current_time', Play_timeS(current_time_seconds));
    if (update_bar) Play_ProgresBarrElm.style.width = ((current_time_seconds / duration_seconds) * 100) + '%';
}

function PlayVod_jump() {
    Play_clearPause();
    if (!Play_isEndDialogVisible()) {

        PlayVod_PlayerCheckQualityChanged = false;
        PlayClip_PlayerCheckQualityChanged = false;

        if (PlayVod_isOn) {
            if (Main_Android) Android.startVideoOffset(PlayVod_playingUrl, 2,
                (PlayVod_TimeToJump > 0) ? (PlayVod_TimeToJump * 1000) : -1);
            Chat_offset = PlayVod_TimeToJump;
        } else {
            Chat_offset = ChannelVod_vodOffset;
            if (Main_Android) Android.startVideoOffset(PlayClip_playingUrl, 3,
                (PlayVod_TimeToJump > 0) ? (PlayVod_TimeToJump * 1000) : -1);
        }

        if (PlayClip_HasVOD) Chat_Init();
    }
    Main_innerHTML('progress_bar_jump_to', STR_SPACE);
    document.getElementById('progress_bar_steps').style.display = 'none';
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_addToJump = 0;
    PlayVod_TimeToJump = 0;
}

function PlayVod_SizeClear() {
    PlayVod_jumpCount = 0;
    PlayVod_StepsCount = 0;
    PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);
}

function PlayVod_jumpSteps(duration_seconds) {
    if (PlayVod_addToJump && !PlayVod_PanelY) document.getElementById('progress_bar_steps').style.display = 'inline-block';
    if (Math.abs(duration_seconds) > 60)
        Main_textContent('progress_bar_steps', STR_JUMPING_STEP + (duration_seconds / 60) + STR_MINUTES);
    else if (duration_seconds)
        Main_textContent('progress_bar_steps', STR_JUMPING_STEP + duration_seconds + STR_SECONDS);
    else
        Main_textContent('progress_bar_steps', STR_JUMPING_STEP + Play_DefaultjumpTimers[1] + STR_SECONDS);
}

function PlayVod_jumpTime() {
    Main_textContent('progress_bar_jump_to', STR_JUMP_TIME + ' (' + (PlayVod_addToJump < 0 ? '-' : '') + Play_timeS(Math.abs(PlayVod_addToJump)) + ')' + STR_JUMP_T0 + Play_timeS(PlayVod_TimeToJump));
}

function PlayVod_jumpStart(multiplier, duration_seconds) {
    var currentTime = Main_Android ? (Android.gettime() / 1000) : 0;

    window.clearTimeout(PlayVod_SizeClearID);
    PlayVod_IsJumping = true;

    if (PlayVod_jumpCount < (Play_DefaultjumpTimers.length - 1) && (PlayVod_StepsCount++ % 6) === 0) PlayVod_jumpCount++;

    PlayVod_addToJump += Play_DefaultjumpTimers[PlayVod_jumpCount] * multiplier;
    PlayVod_TimeToJump = currentTime + PlayVod_addToJump;

    //hls jump/seek time in avplay is "10 base", jump/seek to 1:53:53 will jump to 1:53:50, round to show then
    if (PlayVod_isOn) PlayVod_TimeToJump = Math.floor(PlayVod_TimeToJump / 10) * 10;

    if (PlayVod_TimeToJump > duration_seconds) {
        PlayVod_addToJump = duration_seconds - currentTime - Play_DefaultjumpTimers[1];
        PlayVod_TimeToJump = currentTime + PlayVod_addToJump;
        PlayVod_jumpCount = 0;
        PlayVod_StepsCount = 0;
    } else if (PlayVod_TimeToJump < 0) {
        PlayVod_addToJump = 0 - currentTime;
        PlayVod_jumpCount = 0;
        PlayVod_StepsCount = 0;
        PlayVod_TimeToJump = 0;
    }

    PlayVod_jumpTime();
    Play_ProgresBarrElm.style.width = ((PlayVod_TimeToJump / duration_seconds) * 100) + '%';
    PlayVod_jumpSteps(Play_DefaultjumpTimers[PlayVod_jumpCount] * multiplier);

    PlayVod_SizeClearID = window.setTimeout(PlayVod_SizeClear, 1000);
}

function PlayVod_SaveVodIds() {
    var time = Main_Android ? (parseInt(Android.gettime() / 1000)) : 0;

    var vod_id = '#' + Main_values.ChannelVod_vodId; // prevent only numeric key, that makes the obj be shorted

    if (time > 300 && time < (ChannelVod_DurationSeconds - 300)) { //time too small don't save

        //delete before save to add this to the end, and prevent loose it in restorevodids
        if (PlayVod_VodIds[vod_id]) delete PlayVod_VodIds[vod_id];

        PlayVod_VodIds[vod_id] = time;
        Main_setItem('PlayVod_VodIds', JSON.stringify(PlayVod_VodIds));

    } else if (time > (ChannelVod_DurationSeconds - 300) && PlayVod_VodIds[vod_id]) {

        //if ended or almost delete
        delete PlayVod_VodIds[vod_id];

        Main_setItem('PlayVod_VodIds', JSON.stringify(PlayVod_VodIds));
    }
}

function PlayVod_RestoreVodIds() {
    PlayVod_VodIds = Main_getItemJson('PlayVod_VodIds', {});

    //Prevent too big obj in storage
    var size = PlayVod_VodIdsSize();
    if (size > 250) PlayVod_CleanVodIds(size - 250);
}

function PlayVod_VodIdsSize() {
    var size = 0;
    for (var key in PlayVod_VodIds) {
        if (PlayVod_VodIds.hasOwnProperty(key)) size++;
    }
    return size;
}

function PlayVod_CleanVodIds(quantity) {
    var position = 0;
    for (var key in PlayVod_VodIds) {
        if (position < quantity) delete PlayVod_VodIds[key];
        else break;
        position++;
    }
    Main_setItem('PlayVod_VodIds', JSON.stringify(PlayVod_VodIds));
}

function Play_showVodDialog() {
    Main_HideElement('scene_channel_panel_bottom');
    PlayVod_showPanel(false);
    Main_innerHTML("dialog_vod_saved_text", STR_FROM + Play_timeMs(PlayVod_VodIds['#' + Main_values.ChannelVod_vodId] * 1000));
    Main_ShowElement('dialog_vod_start');
}

function Play_HideVodDialog() {
    PlayVod_hidePanel();
    Main_HideElement('dialog_vod_start');
    PlayVod_IconsResetFocus();
    window.setTimeout(function() {
        Main_ShowElement('scene_channel_panel_bottom');
    }, 1000);
}

function Play_isVodDialogShown() {
    return Main_isElementShowing('dialog_vod_start');
}

function PlayVod_IconsResetFocus() {
    PlayVod_IconsRemoveFocus();
    PlayVod_VodPositions = 0;
    PlayVod_IconsAddFocus();
}

function PlayVod_IconsAddFocus() {
    Main_AddClass('dialog_vod_' + PlayVod_VodPositions, 'dialog_end_icons_focus');
}

function PlayVod_IconsRemoveFocus() {
    Main_RemoveClass('dialog_vod_' + PlayVod_VodPositions, 'dialog_end_icons_focus');
}

function PlayVod_DialogPressed(fromStart) {
    Play_HideVodDialog();
    if (!fromStart) {
        Main_values.vodOffset = PlayVod_VodIds['#' + Main_values.ChannelVod_vodId];
        PlayVod_currentTime = Main_values.vodOffset * 1000;
        PlayVod_ProgresBarrUpdate(Main_values.vodOffset, ChannelVod_DurationSeconds, true);
        PlayVod_PosStart();
    } else {
        delete PlayVod_VodIds['#' + Main_values.ChannelVod_vodId];
        Main_values.vodOffset = 0;
        PlayVod_Start();
    }
}

function PlayVod_handleKeyDown(e) {
    if (PlayVod_state !== Play_STATE_PLAYING && !Play_isVodDialogShown()) {
        switch (e.keyCode) {
            case KEY_RETURN:
                if (Play_ExitDialogVisible()) {
                    Play_CleanHideExit();
                    PlayVod_shutdownStream();
                } else {
                    Play_showExitDialog();
                }
                break;
            default:
                break;
        }
    } else {
        switch (e.keyCode) {
            case KEY_LEFT:
                if (UserLiveFeed_isFeedShow()) {
                    if (Play_FeedPos && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos--;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown()) {
                    Play_ChatPositions++;
                    Play_ChatPosition();
                } else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY) {
                        Play_IconsRemoveFocus();
                        Play_Panelcounter++;
                        if (Play_Panelcounter > 5) Play_Panelcounter = 1;
                        Play_IconsAddFocus();
                    } else {
                        PlayVod_jumpStart(-1, ChannelVod_DurationSeconds);
                        PlayVod_ProgressBaroffset = 2500;
                    }
                    PlayVod_setHidePanel();
                } else if (Play_isVodDialogShown()) {
                    PlayVod_IconsRemoveFocus();
                    if (PlayVod_VodPositions) PlayVod_VodPositions--;
                    else PlayVod_VodPositions++;
                    PlayVod_IconsAddFocus();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter--;
                    if (Play_Endcounter < 0) Play_Endcounter = 3;
                    if (Play_Endcounter === 1) Play_Endcounter = 0;
                    Play_EndIconsAddFocus();
                } else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_RIGHT:
                if (UserLiveFeed_isFeedShow()) {
                    if (Play_FeedPos < (UserLiveFeed_itemsCount - 1) && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos++;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible()) {
                    if (!Play_isChatShown() && !Play_isEndDialogVisible()) {
                        Play_showChat();
                        Play_ChatEnable = true;
                    } else {
                        Play_hideChat();
                        Play_ChatEnable = false;
                    }
                    Main_setItem('ChatEnable', Play_ChatEnable ? 'true' : 'false');
                } else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY) {
                        Play_IconsRemoveFocus();
                        Play_Panelcounter--;
                        if (Play_Panelcounter < 1) Play_Panelcounter = 5;
                        Play_IconsAddFocus();
                    } else {
                        PlayVod_jumpStart(1, ChannelVod_DurationSeconds);
                        PlayVod_ProgressBaroffset = 2500;
                    }
                    PlayVod_setHidePanel();
                } else if (Play_isVodDialogShown()) {
                    PlayVod_IconsRemoveFocus();
                    if (PlayVod_VodPositions) PlayVod_VodPositions--;
                    else PlayVod_VodPositions++;
                    PlayVod_IconsAddFocus();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = 0;
                    if (Play_Endcounter === 1) Play_Endcounter = 2;
                    Play_EndIconsAddFocus();
                } else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_UP:
                if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
                    if (PlayVod_PanelY === 2 && Play_Panelcounter !== 1) {
                        PlayVod_PanelY--;
                        PlayVod_IconsBottonFocus();
                    } else if (PlayVod_PanelY === 1) {
                        PlayVod_PanelY--;
                        PlayVod_IconsBottonFocus();
                    } else if (PlayVod_qualityIndex > 0 && Play_Panelcounter === 1) {
                        PlayVod_qualityIndex--;
                        PlayVod_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    PlayVod_setHidePanel();
                } else if (!UserLiveFeed_isFeedShow()) UserLiveFeed_ShowFeed();
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedRefreshFocus();
                else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_DOWN:
                if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
                    if (!PlayVod_PanelY) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else if (PlayVod_PanelY === 1) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else if (PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1 && Play_Panelcounter === 1) {
                        PlayVod_qualityIndex++;
                        PlayVod_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    PlayVod_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
                else if (Play_isFullScreen && Play_isChatShown()) {
                    //Play_ChatBackground += 0.05;
                    //if (Play_ChatBackground > 1.05) Play_ChatBackground = 0.05;
                    //Play_ChatBackgroundChange(true);
                    Play_ChatSizeValue++;
                    if (Play_ChatSizeValue > 4) {
                        Play_ChatSizeValue = 1;
                        Play_ChatPositionConvert(false);
                    } else if (Play_ChatSizeValue === 4) Play_ChatPositionConvert(true);
                    Play_ChatSize(true);
                } else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_ENTER:
                if (Play_isVodDialogShown()) PlayVod_DialogPressed(PlayVod_VodPositions);
                else if (Play_isEndDialogVisible()) Play_EndDialogPressed(2);
                else if (Play_isPanelShown()) {
                    if (!PlayVod_PanelY) {
                        Play_clearHidePanel();
                        PlayVod_setHidePanel();
                        if (PlayVod_addToJump) PlayVod_jump();
                    } else if (PlayVod_PanelY === 1) {
                        if (Main_values.Play_ChatForceDisable) {
                            if (Play_isNotplaying()) Chat_Play(Chat_Id);
                            else Chat_Pause();
                        }
                        if (!Play_isEndDialogVisible()) Play_KeyPause(2);
                    } else Play_BottomOptionsPressed(2);
                } else if (UserLiveFeed_isFeedShow()) {
                    PlayVod_PreshutdownStream(true);
                    Main_OpenLiveStream(Play_FeedPos, UserLiveFeed_ids, Play_handleKeyDown);
                } else PlayVod_showPanel(true);
                break;
            case KEY_RETURN:
                Play_KeyReturn(true);
                break;
            case KEY_PLAY:
            case KEY_PAUSE:
            case KEY_PLAYPAUSE:
                if (Main_values.Play_ChatForceDisable) {
                    if (Play_isNotplaying()) Chat_Play(Chat_Id);
                    else Chat_Pause();
                }
                if (!Play_isEndDialogVisible()) Play_KeyPause(2);
                break;
            default:
                break;
        }
    }
}//Variable initialization
var Chat_LoadGlobal = false;
var Chat_loadingDataTry = 0;
var Chat_Messages = [];
var Chat_MessagesNext = [];
var Chat_loadingDataTryMax = 10;
var Chat_addlinesId;
var Chat_next = null;
var Chat_loadChatId;
var Chat_loadChatNextId;
var Chat_offset = 0;
var Chat_title = '';
var defaultColors = ["ff0000", "ff4000", "ff8000", "ffbf00", "ffff00", "bfff00", "80ff00", "40ff00", "00ff00", "00ff40", "00ff80", "00ffbf", "00ffff", "00bfff", "0080ff", "0040ff", "ff00ff", "ff00bf", "ff0080", "ff0040"];
var defaultColorsLength = defaultColors.length;
var Chat_div;
var Chat_Position = 0;
var Chat_hasEnded = false;
var Chat_Id = 0;
var Chat_loadBadgesChannelId;
//Variable initialization end

function Chat_Preinit() {
    Chat_div = document.getElementById('chat_box');
    Chat_loadBadgesGlobal();
}

function Chat_Init() {
    Chat_Clear();
    if (!Main_Android || !Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }
    if (!Chat_LoadGlobal) Chat_loadBadgesGlobal();

    Main_ready(function() {
        Chat_Id = (new Date()).getTime();
        Chat_loadBadgesChannel(Chat_Id);
    });

}

function Chat_loadBadgesGlobal() {
    extraEmotes = {};
    Chat_loadingDataTry = 0;
    Chat_LoadGlobal = false;
    Chat_loadBadgesGlobalRequest();
}

function Chat_loadBadgesGlobalRequest() {
    var theUrl = 'https://badges.twitch.tv/v1/badges/global/display';
    BasexmlHttpGet(theUrl, 10000, 0, null, Chat_loadBadgesGlobalSuccess, Chat_loadBadgesGlobalError, false);
}

function Chat_loadBadgesGlobalError() {
    Chat_loadingDataTry++;
    if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadBadgesGlobalRequest();
    else Chat_LoadGlobal = false;
}

function Chat_loadBadgesGlobalSuccess(responseText) {
    transformBadges(JSON.parse(responseText).badge_sets).forEach(function(badge) {
        badge.versions.forEach(function(version) {
            tagCSS(badge.type, version.type, version.image_url_4x, null);
        });
    });

    Chat_loadEmotes();
}

function Chat_loadEmotes() {
    Chat_loadingDataTry = 0;
    Chat_loadEmotesRequest();
}

function Chat_loadEmotesRequest() {
    var theUrl = 'https://api.betterttv.net/2/emotes';
    BasexmlHttpGet(theUrl, 10000, 0, null, Chat_loadEmotesSuccess, Chat_loadEmotesError, false);
}

function Chat_loadEmotesError() {
    Chat_loadingDataTry++;
    if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadEmotesRequest();
    else Chat_LoadGlobal = false;
}

function Chat_loadEmotesSuccess(data) {
    data = JSON.parse(data);
    data.emotes.forEach(function(emote) {
        extraEmotes[emote.code] = {
            restrictions: emote.restrictions,
            code: emote.code,
            source: 'bttv',
            id: emote.id,
            '1x': 'https:' + data.urlTemplate.replace('{{id}}', emote.id).replace('{{image}}', '1x'),
            '2x': 'https:' + data.urlTemplate.replace('{{id}}', emote.id).replace('{{image}}', '2x'),
            '3x': 'https:' + data.urlTemplate.replace('{{id}}', emote.id).replace('{{image}}', '3x')
        };
    });

    Chat_LoadGlobal = true;
}

function Chat_loadBadgesChannel(id) {
    Chat_loadingDataTry = 0;
    Chat_loadBadgesChannelRequest(id);
}

function Chat_loadBadgesChannelRequest(id) {
    var theUrl = 'https://badges.twitch.tv/v1/badges/channels/' + Main_values.Main_selectedChannel_id + '/display';
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                if (Chat_Id === id) Chat_loadBadgesChannelSuccess(xmlHttp.responseText, id);
                return;
            } else {
                if (Chat_Id === id) Chat_loadBadgesChannelError(id);
            }
        }
    };

    xmlHttp.send(null);
}

function Chat_loadBadgesChannelError(id) {
    Chat_loadingDataTry++;
    if (Chat_Id === id) {
        if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadBadgesChannelRequest(id);
        else {
            Chat_loadBadgesChannelId = window.setTimeout(function() {
                Chat_loadBadgesChannelRequest(id);
            }, 1000);
        }
    }
}

function Chat_loadBadgesChannelSuccess(responseText, id) {
    transformBadges(JSON.parse(responseText).badge_sets).forEach(function(badge) {
        badge.versions.forEach(function(version) {
            tagCSS(badge.type, version.type, version.image_url_4x, Chat_div);
        });
    });

    if (Chat_Id === id) Chat_loadChat(id);
}

function Chat_loadChat(id) {
    Chat_loadingDataTry = 0;
    if (Chat_Id === id) Chat_loadChatRequest(id);
}

function Chat_loadChatRequest(id) {
    var theUrl = 'https://api.twitch.tv/v5/videos/' + Main_values.ChannelVod_vodId +
        '/comments?client_id=' + Main_clientId + (Chat_offset ? '&content_offset_seconds=' + parseInt(Chat_offset) : '');
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);

    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                if (Chat_Id === id) Chat_loadChatSuccess(xmlHttp.responseText, id);
                return;
            } else {
                if (Chat_Id === id) Chat_loadChatError(id);
            }
        }
    };

    xmlHttp.send(null);
}

function Chat_loadChatError(id) {
    Chat_loadingDataTry++;
    if (Chat_Id === id) {
        if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadChatRequest(id);
        else {
            Chat_loadChatId = window.setTimeout(function() {
                Chat_loadChatRequest(id);
            }, 2500);
        }
    }
}

function Chat_loadChatSuccess(responseText, id) {
    responseText = JSON.parse(responseText);
    var div, mmessage, null_next = (Chat_next === null);

    if (null_next) {
        div = '&nbsp;';
        div += '<span class="message">';
        div += STR_BR + STR_LOADING_CHAT + Main_values.Main_selectedChannelDisplayname + ' ' + Chat_title;
        div += '</span>';
        Chat_MessageVector(div, 0);
    }
    Chat_offset = 0;
    Chat_next = responseText._next;

    responseText.comments.forEach(function(comments) {
        div = '';
        mmessage = comments.message;

        //Add badges
        if (mmessage.hasOwnProperty('user_badges')) {
            mmessage.user_badges.forEach(function(badges) {
                div += '<span class="' + badges._id + '-' + badges.version + ' tag"></span>';
            });
        }

        //Add nick
        div += '<span class="nick" style="color: #' + defaultColors[(comments.commenter.display_name).charCodeAt(0) % defaultColorsLength] + ';">' + comments.commenter.display_name + '</span>&#58;&nbsp;';

        //Add mesage
        div += '<span class="message">';
        mmessage.fragments.forEach(function(fragments) {
            if (fragments.hasOwnProperty('emoticon')) div += '<img class="emoticon" src="https://static-cdn.jtvnw.net/emoticons/v1/' + fragments.emoticon.emoticon_id + '/1.0" srcset="https://static-cdn.jtvnw.net/emoticons/v1/' + fragments.emoticon.emoticon_id + '/2.0 2x, https://static-cdn.jtvnw.net/emoticons/v1/' + fragments.emoticon.emoticon_id + '/3.0 4x">';
            else div += twemoji.parse(fragments.text, false, true);
        });

        div += '</span>';
        if (null_next) Chat_MessageVector(div, comments.content_offset_seconds);
        else if (Chat_next !== undefined) Chat_MessageVectorNext(div, comments.content_offset_seconds);
    });
    if (null_next && Chat_Id === id) {
        Chat_Play(id);
        if (Chat_next !== undefined) Chat_loadChatNext(id); //if (Chat_next === undefined) chat has ended
    }
}

function Chat_MessageVector(message, time) {
    Chat_Messages.push({
        'time': time,
        'message': message
    });
}

function Chat_MessageVectorNext(message, time) {
    Chat_MessagesNext.push({
        'time': time,
        'message': message
    });
}

function Chat_Play(id) {
    if (!Chat_hasEnded && Chat_Id === id) {
        Chat_addlinesId = window.setInterval(function() {
            Main_Addline(id);
            Chat_div.scrollTop = Chat_div.scrollHeight;
        }, 1000);
    }
}

function Chat_Pause() {
    if (!Chat_hasEnded) {
        window.clearTimeout(Chat_loadBadgesChannelId);
        window.clearTimeout(Chat_loadChatId);
        window.clearTimeout(Chat_loadChatNextId);
        window.clearInterval(Chat_addlinesId);
    }
}

function Chat_Clear() {
    // on exit cleanup the div
    Chat_Pause();
    Chat_Id = 0;
    Main_empty('chat_box');
    Chat_hasEnded = false;
    Chat_next = null;
    Chat_Messages = [];
    Chat_MessagesNext = [];
    Chat_Position = 0;
}

function Main_Addline(id) {
    var elem;
    if (Chat_Position < (Chat_Messages.length - 1)) {
        for (var i = Chat_Position; i < Chat_Messages.length; i++, Chat_Position++) {
            if (Chat_Messages[i].time < (ChannelVod_vodOffset + (Android.gettime() / 1000))) {
                elem = document.createElement('div');
                elem.className = 'chat_line';
                elem.innerHTML = Chat_Messages[i].message;

                Chat_div.appendChild(elem);
            } else {
                break;
            }
        }
    } else {
        Chat_Pause();
        if (Chat_next !== undefined) {
            Chat_Messages = Chat_MessagesNext.slice();
            Chat_Position = 0;
            Chat_Play(id);
            Chat_MessagesNext = [];

            if (Chat_Id === id) Chat_loadChatNext(id);
            Chat_Clean();
        } else { //Chat has eneded
            var div = '&nbsp;';
            div += '<span class="message">';
            div += STR_BR + STR_BR + STR_CHAT_END + STR_BR + STR_BR;
            div += '</span>';

            elem = document.createElement('div');
            elem.className = 'chat_line';
            elem.innerHTML = div;

            Chat_div.appendChild(elem);

            Chat_hasEnded = true;
            Chat_div.scrollTop = Chat_div.scrollHeight;

            //keep refreshing in case user changes chat size
            window.clearInterval(Chat_addlinesId);
            Chat_addlinesId = window.setInterval(function() {
                Chat_div.scrollTop = Chat_div.scrollHeight;
            }, 1000);
        }
    }
}

function Chat_loadChatNext(id) {
    Chat_loadingDataTry = 0;
    if (!Chat_hasEnded && Chat_Id === id) Chat_loadChatNextRequest(id);
}

function Chat_loadChatNextRequest(id) {
    var theUrl = 'https://api.twitch.tv/v5/videos/' + Main_values.ChannelVod_vodId +
        '/comments?client_id=' + Main_clientId + (Chat_next !== null ? '&cursor=' + Chat_next : '');
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);

    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                if (!Chat_hasEnded && Chat_Id === id) Chat_loadChatSuccess(xmlHttp.responseText, id);
                return;
            } else {
                if (!Chat_hasEnded && Chat_Id === id) Chat_loadChatNextError(id);
            }
        }
    };

    xmlHttp.send(null);
}

function Chat_loadChatNextError(id) {
    Chat_loadingDataTry++;
    if (Chat_Id === id) {
        if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadChatNextRequest(id);
        else {
            Chat_loadChatNextId = window.setTimeout(function() {
                Chat_loadChatNextRequest(id);
            }, 2500);
        }
    }
}

function Chat_NoVod() {
    Chat_Clear();
    Chat_SingleLine(STR_NO_BROADCAST_WARNING + STR_BR + STR_NO_CHAT);
}

function Chat_Disable() {
    Chat_Clear();
    Chat_SingleLine(STR_CHAT_DISABLE);
}

function Chat_SingleLine(Line) {
    var div = '&nbsp;';
    div += '<span class="message">';
    div += STR_BR + STR_BR + STR_BR + STR_BR + STR_BR + STR_BR + STR_BR + STR_BR + STR_BR + STR_BR;
    div += Line;
    div += '</span>';

    var elem = document.createElement('div');
    elem.className = 'chat_line';
    elem.innerHTML = div;

    Chat_div.appendChild(elem);
}

function Chat_Clean() {
    //delete old lines out of view
    var linesToDelete = document.getElementsByClassName("chat_line");
    if ((linesToDelete.length - 100) > 0) {
        for (var i = 0; i < (linesToDelete.length - 100); i++) {
            linesToDelete[0].parentNode.removeChild(linesToDelete[0]);
        }
    }
    ChatLive_ChatFixPosition();
}//Variable initialization
var AGameVod_cursorY = 0;
var AGameVod_cursorX = 0;
var AGameVod_dataEnded = false;
var AGameVod_itemsCount = 0;
var AGameVod_idObject = {};
var AGameVod_emptyCellVector = [];
var AGameVod_loadingData = false;
var AGameVod_loadingDataTry = 0;
var AGameVod_loadingDataTryMax = 5;
var AGameVod_loadingDataTimeout = 3500;
var AGameVod_itemsCountOffset = 0;
var AGameVod_MaxOffset = 0;
var AGameVod_emptyContent = false;
var AGameVod_itemsCountCheck = false;
var AGameVod_period = 'week';
var AGameVod_periodNumber = 2;
var AGameVod_TopRowCreated = false;

var AGameVod_ids = ['agv_thumbdiv', 'agv_img', 'agv_infodiv', 'agv_title', 'agv_streamon', 'agv_duration', 'agv_viwers', 'agv_quality', 'agv_cell', 'gvempty_', 'a_games_vod_scroll', 'agv_game'];
var AGameVod_status = false;
var AGameVod_highlight = false;
var AGameVod_OldgameSelected = '';
//Variable initialization end

function AGameVod_init() {
    Main_values.Main_CenterLablesVectorPos = 3;
    Main_values.Main_Go = Main_AGameVod;
    Main_AddClass('top_bar_game', 'icon_center_focus');
    document.body.addEventListener("keydown", AGameVod_handleKeyDown, false);

    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);

    if ((AGameVod_OldgameSelected === Main_values.Main_gameSelected) && AGameVod_status) {
        Main_YRst(AGameVod_cursorY);
        Main_ShowElement(AGameVod_ids[10]);
        AGameVod_SetPeriod();
        AGameVod_addFocus();
        Main_SaveValues();
    } else AGameVod_StartLoad();
}

function AGameVod_exit() {
    if (AGameVod_status) AGameVod_removeFocus();
    document.body.removeEventListener("keydown", AGameVod_handleKeyDown);
    Main_RemoveClass('top_bar_game', 'icon_center_focus');
    Main_innerHTML('top_bar_game', STR_GAMES);

    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
    Main_HideElement(AGameVod_ids[10]);
}

function AGameVod_StartLoad() {
    if (AGameVod_status) AGameVod_removeFocus();
    Main_empty('stream_table_a_game_vod');
    Main_HideElement(AGameVod_ids[10]);
    Main_showLoadDialog();
    AGameVod_SetPeriod();
    AGameVod_OldgameSelected = Main_values.Main_gameSelected;
    Main_HideWarningDialog();
    AGameVod_status = false;
    AGameVod_itemsCountOffset = 0;
    AGameVod_TopRowCreated = false;
    AGameVod_MaxOffset = 0;
    AGameVod_idObject = {};
    AGameVod_emptyCellVector = [];
    AGameVod_itemsCountCheck = false;
    Main_FirstLoad = true;
    AGameVod_itemsCount = 0;
    AGameVod_cursorX = 0;
    AGameVod_cursorY = 0;
    AGameVod_dataEnded = false;
    Main_CounterDialogRst();
    AGameVod_loadDataPrepare();
    AGameVod_loadDataRequest();
}

function AGameVod_loadDataPrepare() {
    Main_imgVectorRst();
    AGameVod_loadingData = true;
    AGameVod_loadingDataTry = 0;
    AGameVod_loadingDataTimeout = 3500;
}

function AGameVod_loadDataRequest() {
    var offset = AGameVod_itemsCount + AGameVod_itemsCountOffset;
    if (offset && offset > (AGameVod_MaxOffset - 1)) {
        offset = AGameVod_MaxOffset - Main_ItemsLimitVideo;
        AGameVod_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/videos/top?game=' +
        encodeURIComponent(Main_values.Main_gameSelected) + '&limit=' + Main_ItemsLimitVideo +
        '&broadcast_type=' + (AGameVod_highlight ? 'highlight' : 'archive') + '&sort=views&offset=' + offset +
        '&period=' + AGameVod_period +
        (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');

    BasehttpGet(theUrl, AGameVod_loadingDataTimeout, 2, null, AGameVod_loadDataSuccess, AGameVod_loadDataError);
}

function AGameVod_loadDataError() {
    AGameVod_loadingDataTry++;
    if (AGameVod_loadingDataTry < AGameVod_loadingDataTryMax) {
        AGameVod_loadingDataTimeout += 500;
        AGameVod_loadDataRequest();
    } else {
        AGameVod_loadingData = false;
        if (!AGameVod_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            AGameVod_dataEnded = true;
            AGameVod_loadDataSuccessFinish();
        }
    }
}

function AGameVod_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.vods.length;
    AGameVod_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) AGameVod_dataEnded = true;

    var offset_itemsCount = AGameVod_itemsCount;
    AGameVod_itemsCount += response_items;

    AGameVod_emptyContent = !AGameVod_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, video, id,
        cursor = 0,
        doc = document.getElementById("stream_table_a_game_vod");

    // Make the game video/clip/fallowing cell
    if (!AGameVod_TopRowCreated) {
        AGameVod_TopRowCreated = true;
        row = document.createElement('tr');
        var thumbfallow;
        for (i = 0; i < 2; i++) {
            if (!i) thumbfallow = '<i class="icon-movie-play stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_SWITCH_VOD;
            else thumbfallow = '<i class="icon-history stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_SWITCH_CLIP;
            Main_td = document.createElement('td');
            Main_td.setAttribute('id', AGameVod_ids[8] + 'y_' + i);
            Main_td.className = 'stream_cell';
            Main_td.innerHTML = '<div id="' + AGameVod_ids[0] +
                'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + AGameVod_ids[3] +
                'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
            row.appendChild(Main_td);
        }
        doc.appendChild(row);
    }

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.vods[cursor];
            id = video._id;
            //video content can be null sometimes the preview will 404_processing
            if ((video.preview.template + '').indexOf('404_processing') !== -1 || AGameVod_idObject[id]) coloumn_id--;
            else {
                AGameVod_idObject[id] = 1;
                row.appendChild(Vod_createCell(row_id, row_id + '_' + coloumn_id,
                    [id, video.length, video.channel.broadcaster_language, video.game, video.channel.name, video.increment_view_count_url],
                    [video.preview.template.replace("{width}x{height}", Main_VideoSize),
                        video.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                        twemoji.parse(video.title) + STR_BR + STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                        Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.channel.broadcaster_language),
                        STR_DURATION + Play_timeS(video.length), video.animated_preview_url
                    ], AGameVod_ids));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (AGameVod_dataEnded && !AGameVod_itemsCountCheck) {
                AGameVod_itemsCountCheck = true;
                AGameVod_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(AGameVod_ids[9] + row_id + '_' + coloumn_id));
            AGameVod_emptyCellVector.push(AGameVod_ids[9] + row_id + '_' + coloumn_id);
        }
        doc.appendChild(row);
    }

    AGameVod_loadDataSuccessFinish();
}

function AGameVod_loadDataSuccessFinish() {
    if (!AGameVod_status) {
        if (AGameVod_emptyContent) Main_showWarningDialog(STR_NO + (AGameVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_FOR_THIS + STR_CHANNEL);
        else {
            AGameVod_status = true;
            Main_imgVectorLoad(IMG_404_VIDEO);
            AGameVod_addFocus();
            Main_SaveValues();
        }
        Main_ShowElement(AGameVod_ids[10]);
        Main_FirstLoad = false;
        Main_HideLoadDialog();
    } else Main_imgVectorLoad(IMG_404_VIDEO);

    if (AGameVod_emptyCellVector.length > 0 && !AGameVod_dataEnded) {
        AGameVod_loadDataPrepare();
        AGameVod_loadDataReplace();
        return;
    } else {
        Main_CounterDialog(AGameVod_cursorX, AGameVod_cursorY, Main_ColoumnsCountVideo, AGameVod_itemsCount);
        AGameVod_emptyCellVector = [];
    }

    AGameVod_loadingData = false;
}

function AGameVod_loadDataReplace() {
    Main_SetItemsLimitReplace(AGameVod_emptyCellVector.length);

    var offset = AGameVod_itemsCount + AGameVod_itemsCountOffset;
    if (offset && offset > (AGameVod_MaxOffset - 1)) {
        offset = AGameVod_MaxOffset - Main_ItemsLimitReplace;
        AGameVod_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/videos/top?game=' +
        encodeURIComponent(Main_values.Main_gameSelected) + '&limit=' + Main_ItemsLimitReplace +
        '&broadcast_type=' + (AGameVod_highlight ? 'highlight' : 'archive') + '&sort=views&offset=' + offset +
        '&period=' + AGameVod_period +
        (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');

    BasehttpGet(theUrl, AGameVod_loadingDataTimeout, 2, null, AGameVod_loadDataSuccessReplace, AGameVod_loadDataErrorReplace);
}

function AGameVod_loadDataErrorReplace() {
    AGameVod_loadingDataTry++;
    if (AGameVod_loadingDataTry < AGameVod_loadingDataTryMax) {
        AGameVod_loadingDataTimeout += 500;
        AGameVod_loadDataReplace();
    } else {
        AGameVod_dataEnded = true;
        AGameVod_emptyCellVector = [];
        AGameVod_loadDataSuccessFinish();
    }
}


function AGameVod_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.vods.length,
        video, id, i = 0,
        cursor = 0,
        tempVector = [];

    AGameVod_MaxOffset = parseInt(response._total);

    for (i; i < AGameVod_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.vods[cursor];
        id = video._id;
        if ((video.preview.template + '').indexOf('404_processing') !== -1 || AGameVod_idObject[id]) i--;
        else {
            AGameVod_idObject[id] = 1;
            Vod_replaceVideo(AGameVod_emptyCellVector[i],
                [id, video.length, video.channel.broadcaster_language, video.game, video.channel.name, video.increment_view_count_url],
                [video.preview.template.replace("{width}x{height}", Main_VideoSize),
                    video.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                    twemoji.parse(video.title) + STR_BR + STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                    Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.channel.broadcaster_language),
                    STR_DURATION + Play_timeS(video.length), video.animated_preview_url
                ], AGameVod_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) AGameVod_emptyCellVector.splice(tempVector[i], 1);

    AGameVod_itemsCountOffset += cursor;
    if (AGameVod_dataEnded) {
        AGameVod_itemsCount -= AGameVod_emptyCellVector.length;
        AGameVod_emptyCellVector = [];
    }

    AGameVod_loadDataSuccessFinish();
}

function AGameVod_addFocus() {
    if (AGameVod_cursorY < 0) {
        AGameVod_addFocusFallow();
        return;
    }
    Main_addFocusVideo(AGameVod_cursorY, AGameVod_cursorX, AGameVod_ids, Main_ColoumnsCountVideo, AGameVod_itemsCount);

    Vod_AnimateThumb(AGameVod_ids, AGameVod_cursorY + '_' + AGameVod_cursorX);

    if (((AGameVod_cursorY + Main_ItemsReloadLimitVideo) > (AGameVod_itemsCount / Main_ColoumnsCountVideo)) &&
        !AGameVod_dataEnded && !AGameVod_loadingData) {
        AGameVod_loadDataPrepare();
        AGameVod_loadDataRequest();
    }
    if (Main_CenterLablesInUse) AGameVod_removeFocus();
}

function AGameVod_removeFocus() {
    window.clearInterval(Vod_AnimateThumbId);
    if (AGameVod_cursorY > -1 && AGameVod_itemsCount) {
        Main_ShowElement(AGameVod_ids[1] + AGameVod_cursorY + '_' + AGameVod_cursorX);
        Main_removeFocus(AGameVod_cursorY + '_' + AGameVod_cursorX, AGameVod_ids);
    } else AGameVod_removeFocusFallow();
}

function AGameVod_addFocusFallow() {
    var i = AGameVod_cursorX > 1 ? 1 : AGameVod_cursorX;
    Main_AddClass(AGameVod_ids[0] + 'y_' + i, Main_classThumb);
}

function AGameVod_removeFocusFallow() {
    var i = AGameVod_cursorX > 1 ? 1 : AGameVod_cursorX;
    Main_RemoveClass(AGameVod_ids[0] + 'y_' + i, Main_classThumb);
}

function AGameVod_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                AGameVod_removeFocus();
                Main_CenterLablesStart(AGameVod_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (AGameVod_cursorY === -1) {
                AGameVod_removeFocusFallow();
                AGameVod_cursorX--;
                if (AGameVod_cursorX < 0) AGameVod_cursorX = 1;
                AGameVod_addFocusFallow();
            } else if (!AGameVod_cursorY && !AGameVod_cursorX) {
                AGameVod_removeFocus();
                AGameVod_removeFocusFallow();
                AGameVod_cursorY = -1;
                AGameVod_cursorX = 1;
                AGameVod_addFocusFallow();
            } else if (Main_ThumbNull((AGameVod_cursorY), (AGameVod_cursorX - 1), AGameVod_ids[0])) {
                AGameVod_removeFocus();
                AGameVod_cursorX--;
                AGameVod_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((AGameVod_cursorY - 1), i, AGameVod_ids[0])) {
                        AGameVod_removeFocus();
                        AGameVod_cursorY--;
                        AGameVod_cursorX = i;
                        AGameVod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (AGameVod_cursorY === -1) {
                AGameVod_removeFocusFallow();
                AGameVod_cursorX++;
                if (AGameVod_cursorX > 1) {
                    AGameVod_cursorX = 0;
                    if (!AGameVod_emptyContent) {
                        AGameVod_cursorY = 0;
                        AGameVod_addFocus();
                    } else AGameVod_addFocusFallow();
                } else AGameVod_addFocusFallow();
            } else if (Main_ThumbNull((AGameVod_cursorY), (AGameVod_cursorX + 1), AGameVod_ids[0])) {
                AGameVod_removeFocus();
                AGameVod_cursorX++;
                AGameVod_addFocus();
            } else if (Main_ThumbNull((AGameVod_cursorY + 1), 0, AGameVod_ids[0])) {
                AGameVod_removeFocus();
                AGameVod_cursorY++;
                AGameVod_cursorX = 0;
                AGameVod_addFocus();
            }
            break;
        case KEY_UP:
            if (AGameVod_cursorY === -1 && !AGameVod_emptyContent) {
                AGameVod_cursorY = 0;
                AGameVod_removeFocusFallow();
                AGameVod_addFocus();
            } else if (!AGameVod_cursorY) {
                AGameVod_removeFocus();
                AGameVod_cursorY = -1;
                AGameVod_addFocusFallow();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((AGameVod_cursorY - 1), (AGameVod_cursorX - i), AGameVod_ids[0])) {
                        AGameVod_removeFocus();
                        AGameVod_cursorY--;
                        AGameVod_cursorX = AGameVod_cursorX - i;
                        AGameVod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_DOWN:
            if (AGameVod_cursorY === -1 && !AGameVod_emptyContent) {
                AGameVod_cursorY = 0;
                AGameVod_removeFocusFallow();
                AGameVod_addFocus();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((AGameVod_cursorY + 1), (AGameVod_cursorX - i), AGameVod_ids[0])) {
                        AGameVod_removeFocus();
                        AGameVod_cursorY++;
                        AGameVod_cursorX = AGameVod_cursorX - i;
                        AGameVod_addFocus();
                        break;
                    }
                }

            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (AGameVod_cursorY === -1) {
                if (AGameVod_cursorX === 0) {
                    AGameVod_highlight = !AGameVod_highlight;
                    Main_setItem('AGameVod_highlight', AGameVod_highlight ? 'true' : 'false');
                    AGameVod_StartLoad();
                } else {
                    AGameVod_periodNumber++;
                    if (AGameVod_periodNumber > 4) AGameVod_periodNumber = 1;
                    AGameVod_StartLoad();
                }
            } else Main_OpenVod(AGameVod_cursorY + '_' + AGameVod_cursorX, AGameVod_ids, AGameVod_handleKeyDown);
            break;
        default:
            break;
    }
}

function AGameVod_SetPeriod() {
    if (AGameVod_periodNumber === 1) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter((AGameVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_DAY + ': ' + Main_values.Main_gameSelected));
        AGameVod_period = 'day';
    } else if (AGameVod_periodNumber === 2) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter((AGameVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_WEEK + ': ' + Main_values.Main_gameSelected));
        AGameVod_period = 'week';
    } else if (AGameVod_periodNumber === 3) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter((AGameVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_MONTH + ': ' + Main_values.Main_gameSelected));
        AGameVod_period = 'month';
    } else if (AGameVod_periodNumber === 4) {
        Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter((AGameVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_ALL + ': ' + Main_values.Main_gameSelected));
        AGameVod_period = 'all';
    }
    Main_setItem('AGameVod_periodNumber', AGameVod_periodNumber);
}//Variable initialization
var PlayClip_PlayerTime = 0;
var PlayClip_streamCheckId = null;
var PlayClip_PlayerCheckCount = 0;
var PlayClip_IsJumping = false;
var PlayClip_jumpCount = 0;
var PlayClip_TimeToJump = 0;
var PlayClip_isOn = false;
var PlayClip_loadingDataTry = 0;
var PlayClip_loadingDataTimeout = 2000;
var PlayClip_loadingDataTryMax = 5;
var PlayClip_quality = 'source';
var PlayClip_qualityPlaying = PlayClip_quality;
var PlayClip_qualityIndex = 0;
var PlayClip_qualities = [];
var PlayClip_playingUrl = '';
var PlayClip_replay = false;
var PlayClip_currentTime = 0;
var PlayClip_state = 0;
var PlayClip_STATE_PLAYING = 1;
var PlayClip_HasVOD = false;
var PlayClip_PlayerCheckCounter = 0;
var PlayClip_PlayerCheckQualityChanged = false;
var PlayClip_PlayerCheckRun = false;
var PlayClip_Buffer = 2000;

var PlayClip_jumpTimers = [0, 5];
var PlayClip_DurationSeconds = 0;
//Variable initialization end

function PlayClip_Start() {
    Play_showBufferDialog();
    Play_HideEndDialog();
    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);
    Main_textContent("stream_info_name", Main_values.Main_selectedChannelDisplayname);
    Main_innerHTML("stream_info_title", ChannelClip_title);
    Main_innerHTML("stream_info_game", ChannelClip_game + ', ' + ChannelClip_views + ', ' + ChannelClip_language);
    Main_textContent("stream_live_icon", ChannelClip_createdAt);
    Main_textContent('progress_bar_duration', Play_timeS(PlayClip_DurationSeconds));
    Play_DefaultjumpTimers = PlayClip_jumpTimers;
    PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);

    Main_values.Play_isHost = false;

    Main_textContent('progress_bar_current_time', Play_timeS(0));
    Main_textContent("stream_live_time", '');
    Main_textContent("stream_watching_time", '');
    PlayClip_HasVOD = Main_values.ChannelVod_vodId !== null;
    Chat_title = STR_CLIP + '.';
    if (PlayClip_HasVOD) {
        Chat_offset = ChannelVod_vodOffset;
        Chat_Init();
    } else Chat_NoVod();
    Main_innerHTML('pause_button', '<i class="strokedbig icon-pause" style="color: #FFFFFF; font-size: 180%;"></i>');
    Main_ShowElement('progress_pause_holder');
    PlayClip_SetOpenVod();
    Main_ShowElement('scene_channel_panel_bottom');

    PlayClip_PlayerCheckCounter = 0;
    PlayClip_PlayerCheckCount = 0;
    window.clearInterval(PlayClip_streamCheckId);
    PlayClip_PlayerCheckRun = false;
    Play_PlayerPanelOffset = -13;
    PlayClip_state = 0;
    PlayClip_currentTime = 0;
    PlayClip_qualityIndex = 2;
    Play_EndSet(3);
    Play_IsWarning = false;
    Play_IconsResetFocus();

    if (AddUser_UserIsSet()) {
        AddCode_PlayRequest = true;
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
        AddCode_CheckFallow();
    } else Play_hideFallow();

    document.addEventListener('visibilitychange', PlayClip_Resume, false);
    PlayClip_IsJumping = false;
    PlayClip_jumpCount = 0;
    PlayClip_TimeToJump = 0;
    PlayClip_isOn = true;

    PlayClip_loadData();
    document.body.removeEventListener("keyup", Main_handleKeyUp);
}

function PlayClip_loadData() {
    PlayClip_loadingDataTry = 0;
    PlayClip_loadingDataTimeout = 2000;
    PlayClip_loadDataRequest();
}

function PlayClip_loadDataRequest() {
    var theUrl = 'https://clips.twitch.tv/api/v2/clips/' + ChannelClip_playUrl + '/status';

    BasehttpGet(theUrl, PlayClip_loadingDataTimeout, 1, null, PlayClip_QualityGenerate, PlayClip_loadDataError, true);
}

function PlayClip_loadDataError() {
    PlayClip_loadingDataTry++;
    if (PlayClip_loadingDataTry < PlayClip_loadingDataTryMax) {
        PlayClip_loadingDataTimeout += 250;
        PlayClip_loadDataRequest();
    } else {
        Play_HideBufferDialog();
        Play_PlayEndStart(3);
    }
}

function PlayClip_QualityGenerate(response) {
    PlayClip_qualities = [];

    response = JSON.parse(response).quality_options;

    for (var i = 0; i < response.length; i++) {

        if (!PlayClip_qualities.length) {
            PlayClip_qualities.push({
                'id': response[i].quality + 'p' + PlayClip_FrameRate(response[i].frame_rate) + ' (source)',
                'url': response[i].source
            });
        } else {
            PlayClip_qualities.push({
                'id': response[i].quality + 'p' + PlayClip_FrameRate(response[i].frame_rate),
                'url': response[i].source
            });
        }
    }

    PlayClip_state = PlayClip_STATE_PLAYING;
    PlayClip_qualityChanged();
}

function PlayClip_FrameRate(value) {
    if (value > 40) return 60;
    else return '';
}

function PlayClip_qualityChanged() {
    window.clearInterval(PlayClip_streamCheckId);
    PlayClip_qualityIndex = 0;
    PlayClip_playingUrl = PlayClip_qualities[0].url;
    if (PlayClip_quality.indexOf("source") !== -1) PlayClip_quality = "source";
    for (var i = 0; i < PlayClip_getQualitiesCount(); i++) {
        if (PlayClip_qualities[i].id === PlayClip_quality) {
            PlayClip_qualityIndex = i;
            PlayClip_playingUrl = PlayClip_qualities[i].url;
            break;
        } else if (PlayClip_qualities[i].id.indexOf(PlayClip_quality) !== -1) { //make shore to set a value before break out
            PlayClip_qualityIndex = i;
            PlayClip_playingUrl = PlayClip_qualities[i].url;
        }
    }

    PlayClip_qualityPlaying = PlayClip_quality;
    if (Main_isDebug) console.log('PlayClip_onPlayer:', '\n' + '\n"' + PlayClip_playingUrl + '"\n');
    PlayClip_state = PlayClip_STATE_PLAYING;

    if (Main_Android && PlayClip_isOn) Android.startVideoOffset(PlayClip_playingUrl, 3,
        PlayClip_replay ? -1 : Android.gettime());
    PlayClip_replay = false;
    PlayClip_onPlayer();
}

function PlayClip_onPlayer() {
    if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();

    if (Main_Android) {
        PlayClip_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = 1 + (PlayClip_Buffer / 1000);
        PlayClip_PlayerCheckQualityChanged = false;
        window.clearInterval(PlayClip_streamCheckId);
        PlayClip_streamCheckId = window.setInterval(PlayClip_PlayerCheck, Play_PlayerCheckInterval);
    }
}

function PlayClip_Resume() {
    if (document.hidden) PlayClip_shutdownStream();
}

function PlayClip_PlayerCheck() {
    if (Main_Android) PlayClip_currentTime = Android.gettime();
    if (PlayClip_isOn && PlayClip_PlayerTime === PlayClip_currentTime && !Play_isNotplaying()) {
        PlayClip_PlayerCheckCount++;
        if (PlayClip_PlayerCheckCount > Play_PlayerCheckTimer) {

            //Don't change the first time only retry
            if (PlayClip_PlayerCheckQualityChanged && PlayClip_PlayerCheckRun && (PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1)) PlayClip_qualityIndex++;
            else if (!PlayClip_PlayerCheckQualityChanged && PlayClip_PlayerCheckRun) PlayClip_PlayerCheckCounter++;

            if (!navigator.onLine) Play_EndStart(false, 3);
            else if (PlayClip_PlayerCheckCounter > 1) Play_CheckConnection(PlayClip_PlayerCheckCounter, 3, PlayClip_DropOneQuality);
            else {
                PlayClip_qualityDisplay();
                PlayClip_qualityChanged();
                PlayClip_PlayerCheckRun = true;
            }

        } // else we try for too long let the listener onerror catch it
    } else {
        PlayClip_PlayerCheckCounter = 0;
        PlayClip_PlayerCheckCount = 0;
        PlayClip_PlayerCheckRun = false;

    }

    PlayClip_PlayerTime = PlayClip_currentTime;
}

function PlayClip_DropOneQuality(ConnectionDrop) {

    if (!ConnectionDrop) {
        if (PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1) PlayClip_qualityIndex++;
        else {
            Play_EndStart(false, 3);
            return;
        }
    }

    PlayClip_PlayerCheckCounter = 0;
    PlayClip_qualityDisplay();
    PlayClip_qualityChanged();
    PlayClip_PlayerCheckRun = true;
}

function PlayClip_shutdownStream() {
    if (PlayClip_isOn) {
        PlayClip_qualities = [];
        PlayClip_PreshutdownStream();
        Play_CleanHideExit();
        Play_exitMain();
    }
}

function PlayClip_PreshutdownStream() {
    window.clearInterval(PlayClip_streamCheckId);
    if (Main_Android) Android.stopVideo(3);
    PlayClip_isOn = false;
    Chat_Clear();
    Play_ClearPlayer();
    UserLiveFeed_Hide();
    document.body.removeEventListener("keydown", PlayClip_handleKeyDown);
    document.removeEventListener('visibilitychange', PlayClip_Resume);
    PlayClip_hidePanel();
    document.getElementById('scene2_pannel_0').style.display = 'none';
    document.getElementById("scene2_pannel_1").style.width = '30%';
    document.getElementById("quality_name").style.width = '77%';
    document.getElementById("quality_name").style.fontSize = '87.5%';
    ChannelVod_vodOffset = 0;
}

function PlayClip_hidePanel() {
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_addToJump = 0;
    Play_clearHidePanel();
    PlayClip_quality = PlayClip_qualityPlaying;
    document.getElementById("scene_channel_panel").style.opacity = "0";
    if (Main_Android) PlayVod_ProgresBarrUpdate((Android.gettime() / 1000), PlayClip_DurationSeconds, true);
    Main_innerHTML('progress_bar_jump_to', STR_SPACE);
    document.getElementById('progress_bar_steps').style.display = 'none';
    window.clearInterval(PlayVod_RefreshProgressBarrID);
}

function PlayClip_showPanel() {
    PlayClip_RefreshProgressBarr();
    Play_clock();
    PlayVod_RefreshProgressBarrID = window.setInterval(PlayClip_RefreshProgressBarr, 1000);
    Play_CleanHideExit();
    PlayVod_IconsBottonResetFocus();
    PlayClip_qualityIndexReset();
    PlayClip_qualityDisplay();
    document.getElementById("scene_channel_panel").style.opacity = "1";
    PlayClip_setHidePanel();
}

function PlayClip_RefreshProgressBarr() {
    if (Main_Android) PlayVod_ProgresBarrUpdate((Android.gettime() / 1000), PlayClip_DurationSeconds, !PlayVod_IsJumping);
}

function PlayClip_qualityIndexReset() {
    PlayClip_qualityIndex = 0;
    for (var i = 0; i < PlayClip_getQualitiesCount(); i++) {
        if (PlayClip_qualities[i].id === PlayClip_quality) {
            PlayClip_qualityIndex = i;
            break;
        } else if (PlayClip_qualities[i].id.indexOf(PlayClip_quality) !== -1) { //make shore to set a value before break out
            PlayClip_qualityIndex = i;
        }
    }
}

function PlayClip_getQualitiesCount() {
    return PlayClip_qualities.length;
}

function PlayClip_qualityDisplay() {
    if (PlayClip_getQualitiesCount() === 1) {
        document.getElementById("quality_arrow_up").style.opacity = "0";
        document.getElementById("quality_arrow_down").style.opacity = "0";
    } else if (!PlayClip_qualityIndex) {
        document.getElementById("quality_arrow_up").style.opacity = "0.2";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    } else if (PlayClip_qualityIndex === PlayClip_getQualitiesCount() - 1) {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "0.2";
    } else {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    }

    PlayClip_quality = PlayClip_qualities[PlayClip_qualityIndex].id;

    if (PlayClip_quality.indexOf('source') !== -1) Main_textContent("quality_name", PlayClip_quality.replace("source", STR_SOURCE));
    else Main_textContent("quality_name", PlayClip_quality);
}

function PlayClip_setHidePanel() {
    Play_PanelHideID = window.setTimeout(PlayClip_hidePanel, 5000 + PlayVod_ProgressBaroffset); // time in ms
}

function PlayClip_SetOpenVod() {
    document.getElementById("scene2_pannel_1").style.width = '18%';
    document.getElementById("quality_name").style.width = '60%';
    document.getElementById("quality_name").style.fontSize = '72%';
    Main_textContent("open_vod_text", (PlayClip_HasVOD ? STR_OPEN_BROADCAST : STR_NO_BROADCAST));
    document.getElementById('scene2_pannel_0').style.display = 'inline-block';
}

function PlayClip_OpenVod() {
    if (PlayClip_HasVOD) {
        Main_values.vodOffset = ChannelVod_vodOffset;
        PlayClip_PreshutdownStream();
        document.body.addEventListener("keydown", PlayVod_handleKeyDown, false);
        Play_IconsResetFocus();
        Main_ready(PlayVod_Start);
    } else {
        Play_IsWarning = true;
        Play_showWarningDialog(STR_NO_BROADCAST_WARNING);
        window.setTimeout(function() {
            Play_IsWarning = false;
            Play_HideWarningDialog();
        }, 2000);
    }
}

function PlayClip_handleKeyDown(e) {
    if (PlayClip_state !== PlayClip_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_RETURN:
                if (Play_ExitDialogVisible()) {
                    Play_CleanHideExit();
                    PlayClip_shutdownStream();
                } else {
                    Play_showExitDialog();
                }
                break;
            default:
                break;
        }
    } else {
        switch (e.keyCode) {
            case KEY_LEFT:
                if (UserLiveFeed_isFeedShow()) {
                    if (Play_FeedPos && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos--;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown()) {
                    Play_ChatPositions++;
                    Play_ChatPosition();
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY) {
                        Play_IconsRemoveFocus();
                        Play_Panelcounter++;
                        if (Play_Panelcounter > 5) Play_Panelcounter = 0;
                        Play_IconsAddFocus();
                    } else {
                        PlayVod_jumpStart(-1, PlayClip_DurationSeconds);
                        PlayVod_ProgressBaroffset = 2500;
                    }
                    PlayClip_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter--;
                    if (Play_Endcounter < 0) Play_Endcounter = 3;
                    Play_EndIconsAddFocus();
                } else PlayClip_showPanel();
                break;
            case KEY_RIGHT:
                if (UserLiveFeed_isFeedShow()) {
                    if (Play_FeedPos < (UserLiveFeed_itemsCount - 1) && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos++;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible()) {
                    if (!Play_isChatShown() && !Play_isEndDialogVisible()) {
                        Play_showChat();
                        Play_ChatEnable = true;
                    } else {
                        Play_hideChat();
                        Play_ChatEnable = false;
                    }
                    Main_setItem('ChatEnable', Play_ChatEnable ? 'true' : 'false');
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY) {
                        Play_IconsRemoveFocus();
                        Play_Panelcounter--;
                        if (Play_Panelcounter < 0) Play_Panelcounter = 5;
                        Play_IconsAddFocus();
                    } else {
                        PlayVod_jumpStart(1, PlayClip_DurationSeconds);
                        PlayVod_ProgressBaroffset = 2500;
                    }
                    PlayClip_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = 0;
                    Play_EndIconsAddFocus();
                } else PlayClip_showPanel();
                break;
            case KEY_UP:
                if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (Play_isPanelShown()) {
                    if (PlayVod_PanelY === 2 && Play_Panelcounter !== 1) {
                        PlayVod_PanelY--;
                        PlayVod_IconsBottonFocus();
                    } else if (PlayVod_PanelY === 1) {
                        PlayVod_PanelY--;
                        PlayVod_IconsBottonFocus();
                    } else if (PlayClip_qualityIndex > 0 && Play_Panelcounter === 1) {
                        PlayClip_qualityIndex--;
                        PlayClip_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    PlayClip_setHidePanel();
                } else if (!UserLiveFeed_isFeedShow()) UserLiveFeed_ShowFeed();
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedRefreshFocus();
                else PlayClip_showPanel();
                break;
            case KEY_DOWN:
                if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (Play_isPanelShown()) {
                    if (!PlayVod_PanelY) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else if (PlayVod_PanelY === 1) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else if (PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1 && Play_Panelcounter === 1) {
                        PlayClip_qualityIndex++;
                        PlayClip_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    PlayClip_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
                else if (Play_isFullScreen && Play_isChatShown()) {
                    //Play_ChatBackground += 0.05;
                    //if (Play_ChatBackground > 1.05) Play_ChatBackground = 0.05;
                    //Play_ChatBackgroundChange(true);
                    Play_ChatSizeValue++;
                    if (Play_ChatSizeValue > 4) {
                        Play_ChatSizeValue = 1;
                        Play_ChatPositionConvert(false);
                    } else if (Play_ChatSizeValue === 4) Play_ChatPositionConvert(true);
                    Play_ChatSize(true);
                } else PlayClip_showPanel();
                break;
            case KEY_ENTER:
                if (Play_isEndDialogVisible()) Play_EndDialogPressed(3);
                else if (Play_isPanelShown()) {
                    if (!PlayVod_PanelY) {
                        Play_clearHidePanel();
                        PlayClip_setHidePanel();
                        if (PlayVod_addToJump) PlayVod_jump();
                    } else if (PlayVod_PanelY === 1) {
                        if (PlayClip_HasVOD && Main_values.Play_ChatForceDisable) {
                            if (Play_isNotplaying()) Chat_Play(Chat_Id);
                            else Chat_Pause();
                        }
                        if (!Play_isEndDialogVisible()) Play_KeyPause(3);
                    } else Play_BottomOptionsPressed(3);
                } else if (UserLiveFeed_isFeedShow()) {
                    PlayClip_PreshutdownStream();
                    Main_OpenLiveStream(Play_FeedPos, UserLiveFeed_ids, Play_handleKeyDown);
                } else PlayClip_showPanel();
                break;
            case KEY_RETURN:
                if (Play_isPanelShown()) PlayClip_hidePanel();
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
                else {
                    if (Play_ExitDialogVisible()) {
                        Play_CleanHideExit();
                        PlayClip_shutdownStream();
                    } else {
                        Play_showExitDialog();
                    }
                }
                break;
            case KEY_PLAY:
            case KEY_PAUSE:
            case KEY_PLAYPAUSE:
                if (PlayClip_HasVOD && !Main_values.Play_ChatForceDisable) {
                    if (Play_isNotplaying()) Chat_Play(Chat_Id);
                    else Chat_Pause();
                }
                if (!Play_isEndDialogVisible()) Play_KeyPause(3);
                break;
            default:
                break;
        }
    }
}//Variable initialization
var Play_ChatPositions = 0;
var Play_ChatPositionConvertBefore = Play_ChatPositions;
var Play_PlayerPanelOffset = -5;
var Play_ChatBackground = 0.55;
var Play_ChatSizeValue = 3;
var Play_PanelHideID = null;
var Play_quality = "source";
var Play_qualityPlaying = Play_quality;
var Play_isFullScreen = true;
var Play_ChatPositionsBF;
var Play_ChatEnableBF;
var Play_ChatSizeValueBF;
var Play_isHost = false;
var Play_FeedOldUserName = '';
var Play_FeedPos = 0;
var Play_Buffer = 2000;

var Play_STATE_LOADING_TOKEN = 0;
var Play_STATE_LOADING_PLAYLIST = 1;
var Play_STATE_PLAYING = 2;
var Play_state = 0;

var Play_streamInfoTimerId = null;
var Play_tokenResponse = 0;
var Play_playlistResponse = 0;
var Play_playingTry = 0;

var Play_playingUrl = '';
var Play_qualities = [];
var Play_qualityIndex = 0;
var Play_ChatEnable = false;
var Play_exitID = null;

var Play_pauseEndID = null;
var Play_pauseStartID = null;

var Play_created = '';

var Play_loadingDataTry = 0;
var Play_loadingDataTryMax = 5;

var Play_loadingInfoDataTry = 0;
var Play_loadingInfoDataTryMax = 5;

var Play_ResumeAfterOnlineCounter = 0;
var Play_ResumeAfterOnlineId;
var Play_isOn = false;
var Play_ChatBackgroundID = null;
var Play_qualitiesFound = false;
var Play_PlayerTime = 0;
var Play_streamCheckId = null;
var Play_PlayerCheckCount = 0;
var Play_PlayerCheckCounter = 0;
var Play_PlayerCheckQualityChanged = false;
var Play_PlayerCheckRun = false;
var Play_Playing = false;
var Play_Panelcounter = 1;
var Play_IsWarning = false;
var Play_LoadLogoSucess = false;
var Play_loadingInfoDataTimeout = 10000;
var Play_loadingDataTimeout = 2000;
var Play_Lang = '';
var Play_Endcounter = 0;
var Play_EndTextCounter = 3;
var Play_EndTextID = null;
var Play_DialogEndText = '';
var Play_currentTime = 0;
var Play_watching_time = 0;
//var Play_4K_ModeEnable = false;
var Play_TargetHost = '';
var Play_isLive = true;
var Play_RestoreFromResume = false;
var Play_ChatLoadStarted = false;
var Play_PlayerCheckTimer = 7;
var Play_PlayerCheckInterval = 1000;
var Play_updateStreamInfoErrorTry = 0;
var Play_chat_container;
var Play_IncrementView = '';
var Play_ProgresBarrElm;
var Play_DefaultjumpTimers = [];
//counterclockwise movement, Vertical/horizontal Play_ChatPositions
//sizeOffset in relation to the size
var Play_ChatPositionVal = [{
    "top": 51.8, // Bottom/right 0
    "left": 75.1,
    "sizeOffset": [31, 16, 0, 0]
}, {
    "top": 33, // Middle/right 1
    "left": 75.1,
    "sizeOffset": [12.5, 0, -6.25, 0]
}, {
    "top": 0.2, // Top/right 2
    "left": 75.1,
    "sizeOffset": [0, 0, 0, 0]
}, {
    "top": 0.2, // Top/center 3
    "left": 38.3,
    "sizeOffset": [0, 0, 0, 0]
}, {
    "top": 0.2, // Top/left 4
    "left": 0.2,
    "sizeOffset": [0, 0, 0, 0]
}, {
    "top": 33, // Middle/left 5
    "left": 0.2,
    "sizeOffset": [12.5, 0, -6.25, 0]
}, {
    "top": 51.8, // Bottom/left 6
    "left": 0.2,
    "sizeOffset": [31, 16, 0, 0]
}, {
    "top": 51.8, // Bottom/center 7
    "left": 38.3,
    "sizeOffset": [31, 16, 0, 0]
}];

//Conversion between chat at 100% and bellow 50%
var Play_ChatPositionsBefore = [0, 0, 0, 1, 2, 2, 2, 1]; //Chat positions size 50 to 100%
var Play_ChatPositionsAfter = [ //Chat positions size 100 to 50%
    [0, 1, 2, 2, 2, 1, 0, 0],
    [7, 3, 3, 3, 3, 3, 7, 7],
    [6, 5, 4, 4, 4, 5, 6, 6]
];

var Play_ChatSizeVal = [{
    "containerHeight": 17, // 12.5%
    "percentage": '12.5%',
    "dialogTop": 15
}, {
    "containerHeight": 32, // 25%
    "percentage": '25%',
    "dialogTop": 30
}, {
    "containerHeight": 48, // 50%
    "percentage": '50%',
    "dialogTop": 50
}, {
    "containerHeight": 99.6, // 100%
    "percentage": '100%',
    "dialogTop": 115
}];

var Play_ChatFont = 1;
var Play_ChatFontObj = ['chat_extra_small', 'chat_size_small', 'chat_size_default', 'chat_size_biger', 'chat_size_bigest'];
//Variable initialization end

function Play_PreStart() {
    Play_chat_container = document.getElementById("chat_container");
    Play_ProgresBarrElm = document.getElementById("inner_progress_bar");

    Play_ChatPositions = Main_getItemInt('ChatPositionsValue', 0);
    Play_ChatSizeValue = Main_getItemInt('ChatSizeValue', 3);
    Play_ChatEnable = Main_getItemBool('ChatEnable', false);
    Play_isFullScreen = Main_getItemBool('Play_isFullScreen', true);

    Play_ChatSize(false);
    Play_ChatBackgroundChange(false);
    Play_SetChatFont();
}

function Play_SetFullScreen(isfull) { // jshint ignore:line
    if (isfull) {
        if (Play_ChatPositionsBF !== undefined) {
            Play_ChatPositions = Play_ChatPositionsBF;
            Play_ChatEnable = Play_ChatEnableBF;
            Play_ChatSizeValue = Play_ChatSizeValueBF;
            if (!Play_ChatEnable) Play_hideChat();
            Play_ChatSize(false);
        }
    } else {
        Play_ChatPositionsBF = Play_ChatPositions;
        Play_ChatEnableBF = Play_ChatEnable;
        Play_ChatSizeValueBF = Play_ChatSizeValue;
        // Chat is 25% of the screen, resize to 75% and center left
        Play_ChatPositions = 0;
        Play_showChat();
        Play_ChatEnable = true;
        Play_ChatSizeValue = 4;
        Play_ChatPositionConvert(true);
        Play_ChatSize(false);
        if (Chat_div) Chat_div.scrollTop = Chat_div.scrollHeight;
    }
    Main_setItem('Play_isFullScreen', Play_isFullScreen);
}

function Play_SetChatFont() {
    Play_ChatFont = Settings_Obj_default("chat_font_size");

    for (var i = 0; i < Play_ChatFontObj.length; i++)
        Main_RemoveClass('chat_inner_container', Play_ChatFontObj[i]);

    Main_AddClass('chat_inner_container', Play_ChatFontObj[Play_ChatFont]);
}

function Play_Start() {
    Play_showBufferDialog();
    Main_innerHTML("stream_live_icon", '<div style="vertical-align: middle; display: inline-block"><i class="icon-circle" style="color: red; font-size: 105%; "></i></div><div style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_LIVE.toUpperCase() + '</div>');
    Main_empty('stream_info_title');
    Play_LoadLogoSucess = false;
    PlayClip_HasVOD = true;
    //reset channel logo to prevent another channel logo
    Play_LoadLogo(document.getElementById('stream_info_icon'), IMG_404_LOGO);
    if (Main_values.Play_isHost) Main_textContent("stream_info_name", Main_values.Play_DisplaynameHost);
    else Main_textContent("stream_info_name", Main_values.Play_selectedChannelDisplayname);

    Main_values.Play_WasPlaying = 1;
    Main_SaveValues();

    Play_isHost = Main_values.Play_isHost;
    Main_values.Play_isHost = false;
    Play_RestoreFromResume = false;
    Main_ShowElement('scene_channel_panel_bottom');

    Play_currentTime = 0;
    Play_watching_time = 0;
    Main_textContent("stream_watching_time", STR_WATCHING + Play_timeS(0));
    Play_created = Play_timeMs(0);

    Main_textContent("stream_live_time", STR_SINCE + Play_created + STR_AGO);
    Main_HideElement('progress_pause_holder');

    Play_EndSet(1);
    Play_PlayerPanelOffset = -5;
    Play_updateStreamInfoErrorTry = 0;
    Play_PlayerCheckCounter = 0;
    Play_PlayerCheckCount = 0;
    window.clearInterval(Play_streamCheckId);
    Play_PlayerCheckRun = false;
    Play_loadingInfoDataTry = 0;
    Play_loadingInfoDataTimeout = 3000;
    Play_isLive = true;
    Play_qualitiesFound = 0;
    Play_tokenResponse = 0;
    Play_playlistResponse = 0;
    Play_playingTry = 0;
    Play_state = Play_STATE_LOADING_TOKEN;
    Play_isOn = true;
    Play_Playing = false;
    document.addEventListener('visibilitychange', Play_Resume, false);
    Play_updateStreamInfoStart();
    Play_loadData();
    document.body.removeEventListener("keyup", Main_handleKeyUp);
    Play_streamInfoTimerId = window.setInterval(Play_updateStreamInfo, 60000);
}

function Play_Warn(text) { // jshint ignore:line
    Play_showWarningDialog(text);
}

function Play_CheckResume() { // jshint ignore:line
    if (Play_isOn) Play_Resume();
    if (PlayVod_isOn) PlayVod_Resume();
    if (PlayClip_isOn) {
        PlayClip_shutdownStream();
        window.clearInterval(PlayClip_streamCheckId);
    }
}

function Play_Resume() {
    if (document.hidden) {
        if (Play_isEndDialogVisible()) {
            Play_CleanHideExit();
            Play_hideChat();
            Play_shutdownStream();
        } else {
            Play_ClearPlayer();
            Play_Playing = false;
            ChatLive_Clear();
            window.clearInterval(Play_streamInfoTimerId);
        }
    } else {
        Play_isOn = true;
        Play_clearPause();
        if (Play_isOn) {
            Play_showBufferDialog();
            Play_loadingInfoDataTry = 0;
            Play_loadingInfoDataTimeout = 3000;
            Play_RestoreFromResume = true;
            if (!Play_LoadLogoSucess) Play_updateStreamInfoStart();
            else Play_updateStreamInfo();
            Play_state = Play_STATE_LOADING_TOKEN;
            Play_ResumeAfterOnlineCounter = 0;
            if (navigator.onLine) Play_loadData();
            else Play_ResumeAfterOnlineId = window.setInterval(Play_ResumeAfterOnline, 100);
            Play_streamInfoTimerId = window.setInterval(Play_updateStreamInfo, 60000);
        }
    }
}

function Play_ResumeAfterOnline() {
    if (navigator.onLine || Play_ResumeAfterOnlineCounter > 200) {
        window.clearInterval(Play_ResumeAfterOnlineId);
        Play_loadData();
    }
    Play_ResumeAfterOnlineCounter++;
}

function Play_updateStreamInfoStart() {
    var theUrl = 'https://api.twitch.tv/kraken/streams/' + Main_values.Play_selectedChannel_id;
    BasexmlHttpGet(theUrl, Play_loadingInfoDataTimeout, 2, null, Play_updateStreamInfoStartValues, Play_updateStreamInfoStartError, false);
}

function Play_updateStreamInfoStartValues(response) {
    response = JSON.parse(response);
    if (response.stream !== null) {
        if (Play_isHost) Main_textContent("stream_info_name", Main_values.Play_DisplaynameHost);
        else Main_textContent("stream_info_name", Main_values.Play_selectedChannelDisplayname);

        Main_values.Play_selectedChannel_id = response.stream.channel._id;
        Main_innerHTML("stream_info_title", twemoji.parse(response.stream.channel.status));
        Main_values.Play_gameSelected = response.stream.game;
        Play_Lang = ', [' + (response.stream.channel.broadcaster_language).toUpperCase() + ']';
        Main_textContent("stream_info_game", STR_PLAYING + Main_values.Play_gameSelected + STR_FOR +
            Main_addCommas(response.stream.viewers) + ' ' + STR_VIEWER + Play_Lang);
        Main_values.Play_selectedChannelLogo = response.stream.channel.logo;
        Play_LoadLogoSucess = true;
        Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Play_selectedChannelLogo);
        Play_created = response.stream.created_at;
        if (AddUser_UserIsSet()) {
            AddCode_PlayRequest = true;
            AddCode_Channel_id = Main_values.Play_selectedChannel_id;
            AddCode_CheckFallow();
        } else Play_hideFallow();
    }
}

function Play_updateStreamInfoStartError() {
    if (Play_loadingInfoDataTry < Play_loadingInfoDataTryMax) {
        Play_loadingInfoDataTimeout += 500;
        window.setTimeout(function() {
            if (Play_isOn) Play_updateStreamInfoStart();
        }, 750);
    }
    Play_loadingInfoDataTry++;
}

function Play_updateStreamInfo() {
    var theUrl = 'https://api.twitch.tv/kraken/streams/' + Main_values.Play_selectedChannel_id;
    BasexmlHttpGet(theUrl, 3000, 2, null, Play_updateStreamInfoValues, Play_updateStreamInfoError, false);
}

function Play_updateStreamInfoValues(response) {
    response = JSON.parse(response);
    if (response.stream !== null) {
        Main_innerHTML("stream_info_title", twemoji.parse(response.stream.channel.status));
        Main_values.Play_gameSelected = response.stream.game;
        Main_textContent("stream_info_game", STR_PLAYING + Main_values.Play_gameSelected + STR_FOR +
            Main_addCommas(response.stream.viewers) + ' ' + STR_VIEWER + Play_Lang);
        if (!Play_LoadLogoSucess) Play_LoadLogo(document.getElementById('stream_info_icon'),
            response.stream.channel.logo);
    }
}

function Play_updateStreamInfoError() {
    if (Play_updateStreamInfoErrorTry < Play_loadingInfoDataTryMax) {
        window.setTimeout(function() {
            if (Play_isOn) Play_updateStreamInfo();
            //give a second for it retry as the TV may be on coming from resume
        }, 2500);
        Play_updateStreamInfoErrorTry++;
    } else Play_updateStreamInfoErrorTry = 0;
}

function Play_LoadLogo(ImgObjet, link) {
    ImgObjet.onerror = function() {
        this.src = IMG_404_LOGO; //img fail to load a predefined logo
        Play_LoadLogoSucess = false;
    };
    ImgObjet.src = link;
}

function Play_loadData() {
    Play_loadingDataTry = 0;
    Play_loadingDataTimeout = 2000 + (Play_RestoreFromResume ? 3000 : 0);
    Play_loadDataRequest();
}

function Play_loadDataRequest() {
    var theUrl;

    if (Play_state === Play_STATE_LOADING_TOKEN) {
        theUrl = 'https://api.twitch.tv/api/channels/' + Main_values.Play_selectedChannel + '/access_token' +
            (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token ? '?oauth_token=' +
                AddUser_UsernameArray[Main_values.Users_Position].access_token : '');
    } else {
        theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + Main_values.Play_selectedChannel +
            '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
            '&allow_source=true&allow_audi_only=true&fast_bread=true&allow_spectre=false';
    }
    var xmlHttp;
    if (Main_Android) {

        xmlHttp = Android.mreadUrl(theUrl, Play_loadingDataTimeout, 1, null);
        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            Play_loadDataError();
            return;
        }
        if (xmlHttp.status === 200) {
            Play_loadingDataTry = 0;
            if (Play_isOn) Play_loadDataSuccess(xmlHttp.responseText);
        } else if (xmlHttp.status === 403) { //forbidden access
            Play_ForbiddenLive();
        } else if (xmlHttp.status === 404) { //off line
            Play_CheckHostStart();
        } else {
            Play_loadDataError();
        }

    } else {
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", proxyurl + theUrl, true);
        xmlHttp.timeout = Play_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Play_loadingDataTry = 0;
                    if (Play_isOn) Play_loadDataSuccess(xmlHttp.responseText);
                } else if (xmlHttp.status === 403) { //forbidden access
                    Play_loadDataErrorLog(xmlHttp);
                    if (!Main_isBrowser) Play_ForbiddenLive();
                    else Play_loadDataSuccessFake();
                } else if (xmlHttp.status === 404) { //off line
                    Play_loadDataErrorLog(xmlHttp);
                    if (!Main_isBrowser) Play_CheckHostStart();
                    else Play_loadDataSuccessFake();
                } else {
                    Play_loadDataErrorLog(xmlHttp);
                    Play_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    }
}

function Play_loadDataErrorLog(xmlHttp) {
    if (Main_isDebug) {
        console.log(xmlHttp.status);
        console.log(xmlHttp.responseText);
    }
}

function Play_loadDataError() {
    if (Play_isOn && Play_isLive) {
        Play_loadingDataTry++;
        if (Play_loadingDataTry < (Play_loadingDataTryMax + (Play_RestoreFromResume ? 8 : 0))) {
            Play_loadingDataTimeout += 250;
            if (Play_RestoreFromResume) window.setTimeout(Play_loadDataRequest, 500);
            else Play_loadDataRequest();
        } else {
            if (!Main_isBrowser) Play_CheckHostStart();
            else Play_loadDataSuccessFake();
        }
    }
}

function Play_ForbiddenLive() {
    Play_HideBufferDialog();
    Play_showWarningDialog(STR_FORBIDDEN);
    window.setTimeout(function() {
        if (Play_isOn) Play_CheckHostStart();
    }, 4000);
}

//Browsers crash trying to get the streams link
function Play_loadDataSuccessFake() {
    Play_qualities = [{
        'id': '1080p60(Source)',
        'band': '(10.00Mbps)',
        'url': 'http://fake'
    }];
    Play_state = Play_STATE_PLAYING;
    if (Play_isOn) Play_qualityChanged();
}

function Play_loadDataSuccess(responseText) {
    if (Play_state === Play_STATE_LOADING_TOKEN) {
        Play_tokenResponse = JSON.parse(responseText);
        Play_state = Play_STATE_LOADING_PLAYLIST;
        Play_loadData();
    } else if (Play_state === Play_STATE_LOADING_PLAYLIST) {
        Play_playlistResponse = responseText;
        Play_qualities = Play_extractQualities(Play_playlistResponse);
        Play_state = Play_STATE_PLAYING;
        if (Play_isOn) Play_qualityChanged();
    }
}

function Play_extractQualities(input) {
    var Band,
        result = [],
        TempId = '',
        tempCount = 1;

    var streams = Play_extractStreamDeclarations(input);
    for (var i = 0; i < streams.length; i++) {
        TempId = streams[i].split('NAME="')[1].split('"')[0];
        Band = Play_extractBand(streams[i].split('BANDWIDTH=')[1].split(',')[0]);
        if (!result.length) {
            if (TempId.indexOf('ource') === -1) TempId = TempId + ' (source)';
            result.push({
                'id': TempId,
                'band': Band,
                'url': streams[i].split("\n")[2]
            });
        } else if (result[i - tempCount].id !== TempId && result[i - tempCount].id !== TempId + ' (source)') {
            result.push({
                'id': TempId,
                'band': Band,
                'url': streams[i].split("\n")[2]
            });
        } else tempCount++;
    }

    return result;
}

function Play_extractBand(input) {
    input = parseInt(input);
    return input > 0 ? ' (' + parseFloat(input / 1000000).toFixed(2) + 'Mbps)' : '';
}

function Play_extractStreamDeclarations(input) {
    var result = [];

    var myRegexp = /#EXT-X-MEDIA:(.)*\n#EXT-X-STREAM-INF:(.)*\n(.)*/g;
    var marray;
    while (marray = myRegexp.exec(input)) result.push(marray[0]); // jshint ignore:line 

    return result;
}

function Play_qualityChanged() {
    window.clearInterval(Play_streamCheckId);
    Play_qualityIndex = 0;
    Play_playingUrl = Play_qualities[0].url;
    if (Play_quality.indexOf("source") !== -1) Play_quality = "source";
    for (var i = 0; i < Play_getQualitiesCount(); i++) {
        if (Play_qualities[i].id === Play_quality) {
            Play_qualityIndex = i;
            Play_playingUrl = Play_qualities[i].url;
            break;
        } else if (Play_qualities[i].id.indexOf(Play_quality) !== -1) { //make shore to set a value before break out
            Play_qualityIndex = i;
            Play_playingUrl = Play_qualities[i].url;
        }
    }

    Play_qualityPlaying = Play_quality;
    Play_state = Play_STATE_PLAYING;
    if (Main_isDebug) console.log('Play_onPlayer:', '\n' + '\n"' + Play_playingUrl + '"\n');
    if (Main_Android && Play_isOn) Android.startVideo(Play_playingUrl, 1);
    Play_onPlayer();
}

function Play_onPlayer() {
    Play_ChatLoadStarted = false;
    if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
    Play_Playing = true;
    Play_loadChat();

    if (Main_Android) {
        Play_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = 1 + (Play_Buffer / 1000);
        Play_PlayerCheckQualityChanged = false;
        window.clearInterval(Play_streamCheckId);
        Play_streamCheckId = window.setInterval(Play_PlayerCheck, Play_PlayerCheckInterval);
    }
}

function Play_loadChat() {
    if (!Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }

    ChatLive_Init();
}

function Play_PlayerCheck() {
    var updatetime = !Play_isNotplaying();
    if (Main_Android) Play_currentTime = Android.gettime();
    if (Play_isOn && Play_PlayerTime === Play_currentTime && updatetime) {
        Play_PlayerCheckCount++;
        if (Play_PlayerCheckCount > Play_PlayerCheckTimer) {

            //Don't change the first time only retry
            if (Play_PlayerCheckQualityChanged && Play_PlayerCheckRun && (Play_qualityIndex < Play_getQualitiesCount() - 1)) Play_qualityIndex++;
            else if (!Play_PlayerCheckQualityChanged && Play_PlayerCheckRun) Play_PlayerCheckCounter++;

            if (!navigator.onLine) Play_EndStart(false, 1);
            else if (Play_PlayerCheckCounter > 1) Play_CheckConnection(Play_PlayerCheckCounter, 1, Play_DropOneQuality);
            else {
                Play_qualityDisplay();
                Play_qualityChanged();
                Play_PlayerCheckRun = true;
            }

        }
    } else {
        Play_PlayerCheckCounter = 0;
        Play_PlayerCheckCount = 0;
        Play_PlayerCheckRun = false;
    }
    Play_PlayerTime = Play_currentTime;
    if (updatetime) Play_watching_time++;
}

function Play_DropOneQuality(ConnectionDrop) {

    if (!ConnectionDrop) {
        if (Play_qualityIndex < Play_getQualitiesCount() - 1) Play_qualityIndex++;
        else {
            Play_CheckHostStart();
            return;
        }
    }

    Play_PlayerCheckCounter = 0;
    Play_qualityDisplay();
    Play_qualityChanged();
    Play_PlayerCheckRun = true;
}

function Play_EndStart(hosting, PlayVodClip) {
    Main_values.Play_isHost = hosting;
    Play_EndSet(PlayVodClip);
    Play_PlayEndStart(PlayVodClip);
}

// Check if connection with twitch server is OK if not for 15s drop one quality
function Play_CheckConnection(counter, PlayVodClip, DropOneQuality) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.timeout = 1000;
    xmlHttp.open("GET", 'https://static-cdn.jtvnw.net/jtv-static/404_preview-10x10.png?' + Math.random(), true);

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                DropOneQuality(counter > 2);
            } else if (counter > 12) Play_EndStart(false, PlayVodClip);
        }
    };

    xmlHttp.send(null);
}

function Play_isNotplaying() {
    if (Main_Android) return !Android.getPlaybackState();
    else return false;
}

function Play_clock() {
    var clock = Main_getclock();
    Main_textContent("stream_clock", clock);
    Main_textContent('label_clock', clock);
}

function Play_lessthanten(time) {
    return (time < 10) ? "0" + time : time;
}

function Play_timeS(time) {
    var seconds, minutes, hours;

    seconds = Play_lessthanten(parseInt(time) % 60);

    time = Math.floor(time / 60);
    minutes = Play_lessthanten(time % 60);

    time = Math.floor(time / 60);
    hours = Play_lessthanten(time);

    //final time 00:00 or 00:00:00
    return (!time) ? (minutes + ":" + seconds) : (hours + ":" + minutes + ":" + seconds);
}

function Play_timeMs(time) {
    var seconds, minutes, hours;

    seconds = Play_lessthanten(parseInt(time / 1000) % 60);

    time = Math.floor(time / 1000 / 60);
    minutes = Play_lessthanten(time % 60);

    time = Math.floor(time / 60);
    hours = Play_lessthanten(time);

    //final time 00:00 or 00:00:00
    return (!time) ? (minutes + ":" + seconds) : (hours + ":" + minutes + ":" + seconds);
}

function Play_streamLiveAt(time) { //time in '2017-10-27T13:27:27Z'
    return Play_timeMs((new Date().getTime()) - (new Date(time).getTime()));
}

function Play_shutdownStream() {
    if (Play_isOn) {
        Play_PreshutdownStream();
        Main_values.Play_WasPlaying = 0;
        Play_exitMain();
    }
}

function Play_PreshutdownStream() {
    if (Main_Android) Android.stopVideo(1);
    Play_isOn = false;
    UserLiveFeed_Hide();
    Chat_Clear();
    Play_ClearPlayer();
    Play_ClearPlay();
    Main_values.Play_selectedChannel_id = '';
}

function Play_exitMain() {
    PlayVod_ProgresBarrUpdate(0, 0);
    Main_ShowElement('scene1');
    Main_HideElement('scene2');
    Main_ReStartScreens();
}

function Play_ClearPlayer() {
    Play_hidePanel();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_HideEndDialog();
    Play_IncrementView = '';

    if (Play_qualityIndex === (Play_getQualitiesCount() - 1)) Play_qualityPlaying = Play_qualities[0].id;
    if (PlayVod_qualityIndex === (PlayVod_getQualitiesCount() - 1)) PlayVod_qualityPlaying = PlayVod_qualities[0].id;
    if (PlayClip_qualityIndex === (PlayClip_getQualitiesCount() - 1)) PlayClip_qualityPlaying = PlayClip_qualities[0].id;

}

function Play_ClearPlay() {
    Play_Playing = false;
    document.body.removeEventListener("keydown", Play_handleKeyDown);
    document.removeEventListener('visibilitychange', Play_Resume);
    ChatLive_Clear();
    window.clearInterval(Play_streamInfoTimerId);
    window.clearInterval(Play_streamCheckId);
    Play_IsWarning = false;
}

function Play_hideFallow() {
    Main_innerHTML("fallow_text", STR_SPACE + STR_NOKEY);
    AddCode_IsFallowing = false;
}

function Play_showBufferDialog() {
    if (Main_Android) Android.mshowLoading(true);
    else Main_ShowElement('dialog_loading_play');
}

function Play_HideBufferDialog() {
    if (Main_Android) Android.mshowLoading(false);
    else Main_HideElement('dialog_loading_play');
}

function Play_showWarningDialog(text) {
    Main_textContent("dialog_warning_play_text", text);
    Main_ShowElement('dialog_warning_play');
}

function Play_HideWarningDialog() {
    Main_HideElement('dialog_warning_play');
}

function Play_WarningDialogVisible() {
    return Main_isElementShowing('dialog_warning_play');
}

function Play_showExitDialog() {
    if (!Play_ExitDialogVisible()) {
        Main_ShowElement('play_dialog_exit');
        Play_exitID = window.setTimeout(Play_showExitDialog, 3000);
    } else {
        Play_CleanHideExit();
    }
}

function Play_CleanHideExit() {
    window.clearTimeout(Play_exitID);
    Main_HideElement('play_dialog_exit');
}

function Play_ExitDialogVisible() {
    return Main_isElementShowing('play_dialog_exit');
}

// For some reason clearTimeout fail some time when two are set in a sequence on the same function
function Play_clearPauseEnd() {
    window.clearTimeout(Play_pauseEndID);
}

function Play_clearPauseStart() {
    window.clearTimeout(Play_pauseStartID);
}

function Play_clearPause() {
    Play_clearPauseEnd();
    Play_clearPauseStart();
    Main_HideElement('play_dialog_simple_pause');
}

function Play_showPauseDialog() {
    if (!Play_isNotplaying()) Play_clearPause();
    else if (!Play_isShowPauseDialogOn()) {
        Main_ShowElement('play_dialog_simple_pause');
        Play_pauseEndID = window.setTimeout(Play_showPauseDialog, 1500);
    } else {
        Main_HideElement('play_dialog_simple_pause');
        Play_pauseStartID = window.setTimeout(Play_showPauseDialog, 8000); // time in ms
    }
}

function Play_isShowPauseDialogOn() {
    return Main_isElementShowing('play_dialog_simple_pause');
}

function Play_isPanelShown() {
    return document.getElementById("scene_channel_panel").style.opacity === '1';
}

function Play_hidePanel() {
    Play_clearHidePanel();
    document.getElementById("scene_channel_panel").style.opacity = "0";
    Play_quality = Play_qualityPlaying;
    window.clearInterval(PlayVod_RefreshProgressBarrID);
}

function Play_showPanel() {
    Play_IconsResetFocus();
    Play_qualityIndexReset();
    Play_qualityDisplay();
    Play_RefreshWatchingtime();
    PlayVod_RefreshProgressBarrID = window.setInterval(Play_RefreshWatchingtime, 1000);
    Play_clock();
    Play_CleanHideExit();
    document.getElementById("scene_channel_panel").style.opacity = "1";
    Play_setHidePanel();
}

function Play_RefreshWatchingtime() {
    Main_textContent("stream_watching_time", STR_WATCHING + Play_timeS(Play_watching_time));
    Main_textContent("stream_live_time", STR_SINCE + (Play_created.indexOf('00:00') === -1 ? Play_streamLiveAt(Play_created) : Play_created) + STR_AGO);
}

function Play_clearHidePanel() {
    window.clearTimeout(Play_PanelHideID);
    PlayVod_ProgressBaroffset = 0;
}

function Play_setHidePanel() {
    Play_PanelHideID = window.setTimeout(Play_hidePanel, 5000);
}

function Play_showChat() {
    Play_ChatPosition();
    Main_ShowElement('chat_container');
}

function Play_hideChat() {
    Main_HideElement('chat_container');
}

function Play_isChatShown() {
    return Main_isElementShowing('chat_container');
}

function Play_qualityIndexReset() {
    Play_qualityIndex = 0;
    for (var i = 0; i < Play_getQualitiesCount(); i++) {
        if (Play_qualities[i].id === Play_quality) {
            Play_qualityIndex = i;
            break;
        } else if (Play_qualities[i].id.indexOf(Play_quality) !== -1) { //make shore to set a value before break out
            Play_qualityIndex = i;
        }
    }
}

function Play_qualityDisplay() {
    if (Play_getQualitiesCount() === 1) {
        document.getElementById("quality_arrow_up").style.opacity = "0";
        document.getElementById("quality_arrow_down").style.opacity = "0";
    } else if (!Play_qualityIndex) {
        document.getElementById("quality_arrow_up").style.opacity = "0.2";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    } else if (Play_qualityIndex === Play_getQualitiesCount() - 1) {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "0.2";
    } else {
        document.getElementById("quality_arrow_up").style.opacity = "1";
        document.getElementById("quality_arrow_down").style.opacity = "1";
    }

    Play_quality = Play_qualities[Play_qualityIndex].id;

    if (Play_quality.indexOf('source') !== -1) Main_textContent("quality_name", Play_quality.replace("source", STR_SOURCE) + Play_qualities[Play_qualityIndex].band);
    else Main_textContent("quality_name", Play_quality + Play_qualities[Play_qualityIndex].band);
}

function Play_getQualitiesCount() {
    return Play_qualities.length;
}

function Play_ChatSize(showDialog) {
    Play_chat_container.style.height = Play_ChatSizeVal[Play_ChatSizeValue - 1].containerHeight + '%';
    document.getElementById("play_chat_dialog").style.marginTop = Play_ChatSizeVal[Play_ChatSizeValue - 1].dialogTop + '%';
    Play_ChatPosition();
    ChatLive_ChatFixPosition();

    if (showDialog) Play_showChatBackgroundDialog(STR_SIZE + Play_ChatSizeVal[Play_ChatSizeValue - 1].percentage);

    window.setTimeout(function() {
        if (Chat_div) Chat_div.scrollTop = Chat_div.scrollHeight;
    }, 500);
    Main_setItem('ChatSizeValue', Play_ChatSizeValue);
}

function Play_ChatBackgroundChange(showDialog) {
    Play_chat_container.style.backgroundColor = "rgba(0, 0, 0, " + Play_ChatBackground + ")";
    if (showDialog) Play_showChatBackgroundDialog(STR_BRIGHTNESS + (Play_ChatBackground * 100).toFixed(0) + '%');
}

function Play_ChatPositionConvert(up) {
    if (up) {
        Play_ChatPositionConvertBefore = Play_ChatPositions;
        Play_ChatPositions = Play_ChatPositionsBefore[Play_ChatPositions];
    } else Play_ChatPositions = Play_ChatPositionsAfter[Play_ChatPositions][Play_ChatPositionConvertBefore];
}

function Play_ChatPosition() {
    var bool = (Play_ChatSizeValue === 4);

    if (Play_ChatPositions < 0) Play_ChatPositions = (bool ? 2 : 7);
    else if (Play_ChatPositions > (bool ? 2 : 7)) Play_ChatPositions = 0;

    Play_chat_container.style.top = (bool ? 0.2 : (Play_ChatPositionVal[Play_ChatPositions].top + Play_ChatPositionVal[Play_ChatPositions].sizeOffset[Play_ChatSizeValue - 1])) + '%';

    Play_chat_container.style.left =
        Play_ChatPositionVal[Play_ChatPositions + (bool ? 2 : 0)].left + '%';

    //if (Chat_div) Chat_div.scrollTop = Chat_div.scrollHeight;
    Main_setItem('ChatPositionsValue', Play_ChatPositions);
}

function Play_showChatBackgroundDialog(DialogText) {
    window.clearTimeout(Play_ChatBackgroundID);
    Main_textContent("play_chat_dialog_text", DialogText);
    Main_ShowElement('play_chat_dialog');
    Play_ChatBackgroundID = window.setTimeout(Play_hideChatBackgroundDialog, 1000);
}

function Play_hideChatBackgroundDialog() {
    Main_HideElement('play_chat_dialog');
}

function Play_KeyPause(PlayVodClip) {
    if (Play_isNotplaying()) {
        Play_clearPause();
        if (Main_Android) Android.play(true);
        Main_innerHTML('pause_button', '<i class="strokedbig icon-pause" style="color: #FFFFFF; font-size: 180%;"></i>');
        if (PlayVodClip === 1) {
            if (Play_isPanelShown()) Play_hidePanel();
            window.clearInterval(Play_streamCheckId);
            Play_streamCheckId = window.setInterval(Play_PlayerCheck, Play_PlayerCheckInterval);
        } else if (PlayVodClip === 2) {
            if (Play_isPanelShown()) PlayVod_hidePanel();
            window.clearInterval(PlayVod_streamCheckId);
            PlayVod_streamCheckId = window.setInterval(PlayVod_PlayerCheck, Play_PlayerCheckInterval);
        } else if (PlayVodClip === 3) {
            if (Play_isPanelShown()) PlayClip_hidePanel();
            window.clearInterval(PlayClip_streamCheckId);
            PlayClip_streamCheckId = window.setInterval(PlayClip_PlayerCheck, Play_PlayerCheckInterval);
        }
    } else {
        window.clearInterval(Play_streamCheckId);
        window.clearInterval(PlayVod_streamCheckId);
        window.clearInterval(PlayClip_streamCheckId);

        Main_innerHTML('pause_button', '<i class="strokedbig icon-play-1" style="color: #FFFFFF; font-size: 180%;"></i>');

        if (Main_Android) Android.play(false);
        Play_showPauseDialog();
    }
}

function Play_IconsResetFocus() {
    Play_IconsRemoveFocus();
    Play_Panelcounter = 1;
    Play_IconsAddFocus();
}

function Play_IconsAddFocus() {
    Main_AddClass('scene2_pannel_' + Play_Panelcounter, 'playbotton_focus');
}

function Play_IconsRemoveFocus() {
    Main_RemoveClass('scene2_pannel_' + Play_Panelcounter, 'playbotton_focus');
}

function Play_PrepareshowEndDialog() {
    Play_state = -1;
    PlayVod_state = -1;
    PlayClip_state = -1;
    Play_hideChat();
    Play_hidePanel();
    PlayClip_hidePanel();
    PlayVod_hidePanel();
    if (!Play_IsWarning) Play_HideWarningDialog();
    Play_HideBufferDialog();
    Play_CleanHideExit();
    Play_EndIconsAddFocus();
}

function Play_showEndDialog() {
    Main_ShowElement('dialog_end_stream');
}

function Play_HideEndDialog() {
    Main_HideElement('dialog_end_stream');
    Play_EndTextClear();
    Play_EndIconsResetFocus();
}

function Play_isEndDialogVisible() {
    return Main_isElementShowing('dialog_end_stream');
}

function Play_EndIconsResetFocus() {
    Play_EndIconsRemoveFocus();
    Play_Endcounter = 0;
    Play_EndIconsAddFocus();
}

function Play_EndIconsAddFocus() {
    Main_AddClass('dialog_end_' + Play_Endcounter, 'dialog_end_icons_focus');
}

function Play_EndIconsRemoveFocus() {
    Main_RemoveClass('dialog_end_' + Play_Endcounter, 'dialog_end_icons_focus');
}

function Play_EndText(PlayVodClip) {
    if (PlayVodClip === 1) Play_DialogEndText = Main_values.Play_selectedChannelDisplayname + ' ' + STR_LIVE;
    else if (PlayVodClip === 2) Play_DialogEndText = Main_values.Main_selectedChannelDisplayname + STR_VIDEO;
    else if (PlayVodClip === 3) Play_DialogEndText = Main_values.Main_selectedChannelDisplayname + STR_CLIP;
    Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR + STR_STREAM_END +
        Play_EndTextCounter + '...');
    if (Play_isEndDialogVisible()) {
        Play_EndTextCounter--;
        Play_state = Play_STATE_PLAYING;
        PlayVod_state = Play_STATE_PLAYING;
        PlayClip_state = PlayClip_STATE_PLAYING;

        if (Play_EndTextCounter === -1) {
            Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR + STR_STREAM_END +
                '0...');
            Play_CleanHideExit();
            Play_hideChat();

            if (PlayVodClip === 1) Play_shutdownStream();
            else if (PlayVodClip === 2) PlayVod_shutdownStream();
            else if (PlayVodClip === 3) PlayClip_shutdownStream();

        } else {
            Play_EndTextID = window.setTimeout(function() {
                Play_EndText(PlayVodClip);
            }, 1000);
        }
    } else {
        Play_EndTextID = window.setTimeout(function() {
            Play_EndText(PlayVodClip);
        }, 50);
    }
}

function Play_EndTextClear() {
    window.clearTimeout(Play_EndTextID);
    Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR + STR_STREAM_END_EXIT);
}

function Play_EndDialogPressed(PlayVodClip) {
    var canhide = true;
    if (!Play_Endcounter) {
        if (PlayVodClip === 2) {
            if (!PlayVod_qualities.length) {
                canhide = false;
                Play_showWarningDialog(STR_CLIP_FAIL);
                window.setTimeout(function() {
                    Play_HideWarningDialog();
                }, 2000);
            } else {
                PlayVod_replay = true;
                PlayVod_PlayerCheckQualityChanged = false;
                PlayVod_qualityChanged();
                Play_clearPause();
                PlayVod_currentTime = 0;
                Chat_offset = 0;
                Chat_Init();
            }
        } else if (PlayVodClip === 3) {
            if (!PlayClip_qualities.length) {
                canhide = false;
                Play_showWarningDialog(STR_CLIP_FAIL);
                window.setTimeout(function() {
                    Play_HideWarningDialog();
                }, 2000);
            } else {
                PlayClip_replay = true;
                PlayClip_PlayerCheckQualityChanged = false;
                PlayClip_qualityChanged();
                Play_clearPause();
                if (PlayClip_HasVOD) {
                    PlayVod_currentTime = 0;
                    Chat_offset = ChannelVod_vodOffset;
                    Chat_Init();
                } else Chat_NoVod();
            }
        }
    } else if (Play_Endcounter === 1) {
        if (Main_values.Play_isHost) {
            Main_values.Play_DisplaynameHost = Main_values.Play_selectedChannelDisplayname + STR_USER_HOSTING;
            Main_values.Play_selectedChannel = Play_TargetHost.target_login;
            Main_values.Play_selectedChannelDisplayname = Play_TargetHost.target_display_name;
            Main_values.Play_DisplaynameHost = Main_values.Play_DisplaynameHost + Main_values.Play_selectedChannelDisplayname;
            Play_PreshutdownStream();
            document.body.addEventListener("keydown", Play_handleKeyDown, false);

            Main_values.Play_selectedChannel_id = Play_TargetHost.target_id;
            Main_ready(Play_Start);
        } else PlayClip_OpenVod();
    } else if (Play_Endcounter === 2) Play_OpenChannel(PlayVodClip);
    else if (Play_Endcounter === 3) Play_OpenGame(PlayVodClip);

    if (Play_Endcounter !== 1)
        if (Play_Endcounter === 3 && Main_values.Play_gameSelected === '') canhide = false;

    if (canhide) Play_HideEndDialog();
}

function Play_EndSet(PlayVodClip) {
    if (!PlayVodClip) { // Play is hosting
        Play_EndIconsRemoveFocus();
        Play_Endcounter = 1;
        Play_EndIconsAddFocus();
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'inline-block';
        Main_textContent("dialog_end_vod_text", STR_OPEN_HOST);
    } else if (PlayVodClip === 1) { // play
        Play_EndIconsRemoveFocus();
        Play_Endcounter = 2;
        Play_EndIconsAddFocus();
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'none';
    } else if (PlayVodClip === 2) { // vod
        Play_EndIconsResetFocus();
        document.getElementById('dialog_end_0').style.display = 'inline-block';
        document.getElementById('dialog_end_1').style.display = 'none';
    } else if (PlayVodClip === 3) { // clip
        Play_EndIconsResetFocus();
        document.getElementById('dialog_end_0').style.display = 'inline-block';
        document.getElementById('dialog_end_1').style.display = 'inline-block';
        Main_textContent("dialog_end_vod_text", PlayClip_HasVOD ? STR_OPEN_BROADCAST : STR_NO_BROADCAST);
    }
}

function Play_OpenChannel(PlayVodClip) {
    if (!Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) {
        Main_values.Main_BeforeChannel = (Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_aGame) ? Main_values.Main_BeforeAgame : Main_values.Main_Go;
        Main_values.Main_BeforeChannelisSet = true;
    }

    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_ChannelContent;

    if (PlayVodClip === 1) {
        Main_values.Main_selectedChannel_id = Main_values.Play_selectedChannel_id;
        Main_values.Main_selectedChannel = Main_values.Play_selectedChannel;
        Main_values.Main_selectedChannelDisplayname = Main_values.Play_selectedChannelDisplayname;
        ChannelContent_UserChannels = AddCode_IsFallowing;
        Play_hideChat();
        Play_shutdownStream();
    } else if (PlayVodClip === 2) PlayVod_shutdownStream();
    else if (PlayVodClip === 3) PlayClip_shutdownStream();
}

function Play_OpenSearch(PlayVodClip) {
    if (!Main_values.Search_isSearching) Main_values.Main_BeforeSearch = Main_values.Main_Go;
    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_Search;

    if (PlayVodClip === 1) {
        Play_hideChat();
        Play_shutdownStream();
    } else if (PlayVodClip === 2) PlayVod_shutdownStream();
    else if (PlayVodClip === 3) PlayClip_shutdownStream();
}

function Play_OpenGame(PlayVodClip) {
    if (Main_values.Play_gameSelected === '') {
        Play_IsWarning = true;
        Play_showWarningDialog(STR_NO_GAME);
        window.setTimeout(function() {
            Play_IsWarning = false;
            Play_HideWarningDialog();
        }, 2000);
        return;
    }

    if (!Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_AGameVod && Main_values.Main_Go !== Main_AGameClip) {
        Main_values.Main_BeforeAgame = (Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelContent && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) ? Main_values.Main_BeforeChannel : Main_values.Main_Go;
        Main_values.Main_BeforeAgameisSet = true;
    }

    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_aGame;
    AGame_UserGames = false;

    Main_values.Main_gameSelected = Main_values.Play_gameSelected;
    Play_hideChat();
    if (PlayVodClip === 1) Play_shutdownStream();
    else if (PlayVodClip === 2) PlayVod_shutdownStream();
    else if (PlayVodClip === 3) PlayClip_shutdownStream();
}

function Play_FallowUnfallow() {
    if (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token) {
        if (AddCode_IsFallowing) AddCode_UnFallow();
        else AddCode_Fallow();
    } else {
        Play_showWarningDialog(STR_NOKEY_WARN);
        Play_IsWarning = true;
        window.setTimeout(function() {
            Play_HideWarningDialog();
            Play_IsWarning = false;
        }, 2000);
    }
}

function Play_BottomOptionsPressed(PlayVodClip) {
    if (!Play_Panelcounter) PlayClip_OpenVod();
    else if (Play_Panelcounter === 1) {
        if (PlayVodClip === 1) {
            Play_qualityChanged();
            Play_hidePanel();
        } else if (PlayVodClip === 2) {
            //if (!PlayVod_offsettime) PlayVod_offsettime = Play_videojs.currentTime();
            PlayVod_PlayerCheckQualityChanged = false;
            PlayVod_qualityChanged();
            PlayVod_hidePanel();
        } else if (PlayVodClip === 3) {
            //if (!PlayClip_offsettime) PlayClip_offsettime = Play_videojs.currentTime();
            PlayClip_PlayerCheckQualityChanged = false;
            PlayClip_qualityChanged();
            PlayClip_hidePanel();
        }
        Play_clearPause();
    } else if (Play_Panelcounter === 2) {

        AddCode_Channel_id = (PlayVodClip === 1 ? Main_values.Play_selectedChannel_id : Main_values.Main_selectedChannel_id);
        Play_FallowUnfallow();

        Play_clearHidePanel();
        if (PlayVodClip === 1) Play_setHidePanel();
        else if (PlayVodClip === 2) PlayVod_setHidePanel();
        else if (PlayVodClip === 3) PlayClip_setHidePanel();
    } else if (Play_Panelcounter === 3) Play_OpenGame(PlayVodClip);
    else if (Play_Panelcounter === 4) Play_OpenChannel(PlayVodClip);
    else if (Play_Panelcounter === 5) Play_OpenSearch(PlayVodClip);
}

//called by android PlayerActivity
function Play_PannelEndStart(PlayVodClip) { // jshint ignore:line
    if (PlayVodClip === 1) {
        window.clearInterval(Play_streamCheckId);
        Play_CheckHostStart();
    } else Play_PlayEndStart(PlayVodClip);
}

function Play_PlayEndStart(PlayVodClip) {
    window.clearInterval(Play_streamCheckId);
    window.clearInterval(PlayClip_streamCheckId);
    window.clearInterval(PlayVod_streamCheckId);

    Play_PrepareshowEndDialog();
    Play_EndTextCounter = 3;
    Play_EndText(PlayVodClip);
    Play_showEndDialog(PlayVodClip);
}

function Play_CheckHostStart() {
    Play_showBufferDialog();
    Play_state = -1;
    Play_loadingDataTry = 0;
    Play_loadingDataTimeout = 2000;
    ChatLive_Clear();
    window.clearInterval(Play_streamInfoTimerId);
    window.clearInterval(Play_streamCheckId);
    if (Main_values.Play_selectedChannel_id !== '') Play_loadDataCheckHost();
    else Play_CheckId();
}

function Play_CheckId() {
    var theUrl = 'https://api.twitch.tv/kraken/users?login=' + Main_values.Play_selectedChannel;
    BasexmlHttpGet(theUrl, Play_loadingDataTimeout, 2, null, Play_CheckIdValue, Play_CheckIdError, false);
}

function Play_CheckIdValue(musers) {
    musers = JSON.parse(musers).users[0];
    if (musers !== undefined) {
        Main_values.Play_selectedChannel_id = musers._id;
        Play_loadingDataTry = 0;
        Play_loadingDataTimeout = 2000;
        Play_loadDataCheckHost();
    } else Play_PlayEndStart(1);
}

function Play_CheckIdError() {
    Play_loadingDataTry++;
    if (Play_loadingDataTry < Play_loadingDataTryMax) {
        Play_loadingDataTimeout += 250;
        Play_CheckId();
    } else Play_EndStart(false, 1);
}

function Play_loadDataCheckHost() {
    var theUrl = 'https://tmi.twitch.tv/hosts?include_logins=1&host=' +
        encodeURIComponent(Main_values.Play_selectedChannel_id);
    BasehttpGet(theUrl, Play_loadingDataTimeout, 1, null, Play_CheckHost, Play_loadDataCheckHostError, true);
}

function Play_loadDataCheckHostError() {
    Play_loadingDataTry++;
    if (Play_loadingDataTry < Play_loadingDataTryMax) {
        Play_loadingDataTimeout += 250;
        Play_loadDataCheckHost();
    } else Play_EndStart(false, 1);
}

function Play_CheckHost(responseText) {
    Play_TargetHost = JSON.parse(responseText).hosts[0];

    if (Play_TargetHost.target_login !== undefined) {
        Play_IsWarning = true;
        Play_showWarningDialog(Main_values.Play_selectedChannelDisplayname + STR_IS_NOW + STR_USER_HOSTING + Play_TargetHost.target_display_name);
        window.setTimeout(function() {
            Play_IsWarning = false;
        }, 4000);

        Play_EndSet(0);
        Main_values.Play_isHost = true;
    } else {
        Play_EndSet(1);
        Main_values.Play_isHost = false;
    }

    Play_PlayEndStart(1);
}

function Play_setFallow() {
    if (AddCode_IsFallowing) {
        Main_innerHTML("fallow_heart", '<i class="icon-heart strokicon" style="color: #00b300; font-size: 210%;"></i>');
        Main_innerHTML("fallow_text", STR_SPACE + STR_FALLOWING);
    } else {
        Main_innerHTML("fallow_heart", '<i class="icon-heart-o strokicon" style="color: #FFFFFF; font-size: 210%;"></i>');
        Main_innerHTML("fallow_text", STR_SPACE + STR_FALLOW);
    }
}

function Play_KeyReturn(is_vod) {
    if (Play_isEndDialogVisible() && !Play_ExitDialogVisible()) {
        Play_EndTextClear();
        Play_showExitDialog();
    } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
    else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
        if (is_vod) PlayVod_hidePanel();
        else Play_hidePanel();
    } else {
        if (Play_isVodDialogShown() && Play_ExitDialogVisible()) {
            Play_HideVodDialog();
            PlayVod_PreshutdownStream(false);
            Play_exitMain();
        } else if (Play_ExitDialogVisible()) {
            Play_CleanHideExit();
            Play_hideChat();
            if (is_vod) PlayVod_shutdownStream();
            else Play_shutdownStream();
        } else if (Play_WarningDialogVisible()) {
            Play_HideWarningDialog();
            Play_showExitDialog();
        } else {
            Play_showExitDialog();
        }
    }
}

function Play_handleKeyDown(e) {
    if (Play_state !== Play_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_RETURN:
                if (Play_ExitDialogVisible()) {
                    Play_CleanHideExit();
                    Play_hideChat();
                    Play_shutdownStream();
                } else {
                    Play_showExitDialog();
                }
                break;
            default:
                break;
        }
    } else {
        switch (e.keyCode) {
            case KEY_LEFT:
                if (UserLiveFeed_isFeedShow()) {
                    if (Play_FeedPos && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos--;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown()) {
                    Play_ChatPositions++;
                    Play_ChatPosition();
                } else if (Play_isPanelShown()) {
                    Play_IconsRemoveFocus();
                    Play_Panelcounter++;
                    if (Play_Panelcounter > 5) Play_Panelcounter = 1;
                    Play_IconsAddFocus();
                    Play_clearHidePanel();
                    Play_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter--;
                    if (Play_Endcounter < (Main_values.Play_isHost ? 1 : 2)) Play_Endcounter = 3;
                    Play_EndIconsAddFocus();
                } else {
                    Play_showPanel();
                }
                break;
            case KEY_RIGHT:
                if (UserLiveFeed_isFeedShow()) {
                    if (Play_FeedPos < (UserLiveFeed_itemsCount - 1) && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos++;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible()) {
                    if (!Play_isChatShown() && !Play_isEndDialogVisible()) {
                        Play_showChat();
                        Play_ChatEnable = true;
                    } else {
                        Play_hideChat();
                        Play_ChatEnable = false;
                    }
                    Main_setItem('ChatEnable', Play_ChatEnable ? 'true' : 'false');
                } else if (Play_isPanelShown()) {
                    Play_IconsRemoveFocus();
                    Play_Panelcounter--;
                    if (Play_Panelcounter < 1) Play_Panelcounter = 5;
                    Play_IconsAddFocus();
                    Play_clearHidePanel();
                    Play_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = (Main_values.Play_isHost ? 1 : 2);
                    Play_EndIconsAddFocus();
                } else {
                    Play_showPanel();
                }
                break;
            case KEY_UP:
                if (Play_isPanelShown()) {
                    if (Play_qualityIndex > 0 && Play_Panelcounter === 1) {
                        Play_qualityIndex--;
                        Play_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    Play_setHidePanel();
                } else if (!UserLiveFeed_isFeedShow() && AddUser_UserIsSet()) UserLiveFeed_ShowFeed();
                else if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedRefreshFocus();
                break;
            case KEY_DOWN:
                if (Play_isPanelShown()) {
                    if (Play_qualityIndex < Play_getQualitiesCount() - 1 && Play_Panelcounter === 1) {
                        Play_qualityIndex++;
                        Play_qualityDisplay();
                    }
                    Play_clearHidePanel();
                    Play_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
                else if (Play_isFullScreen && Play_isChatShown()) {
                    //Play_ChatBackground += 0.05;
                    //if (Play_ChatBackground > 1.05) Play_ChatBackground = 0.05;
                    //Play_ChatBackgroundChange(true);
                    Play_ChatSizeValue++;
                    if (Play_ChatSizeValue > 4) {
                        Play_ChatSizeValue = 1;
                        Play_ChatPositionConvert(false);
                    } else if (Play_ChatSizeValue === 4) Play_ChatPositionConvert(true);
                    Play_ChatSize(true);
                } else if (Play_isEndDialogVisible()) Play_EndTextClear();
                else {
                    Play_showPanel();
                }
                break;
            case KEY_ENTER:
                if (Play_isEndDialogVisible()) Play_EndDialogPressed(1);
                else if (Play_isPanelShown()) Play_BottomOptionsPressed(1);
                else if (UserLiveFeed_isFeedShow()) {
                    if (Main_values.Play_selectedChannel !== JSON.parse(document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos).getAttribute(Main_DataAttribute))[0]) {
                        Play_PreshutdownStream();
                        Main_OpenLiveStream(Play_FeedPos, UserLiveFeed_ids, Play_handleKeyDown);
                    } else UserLiveFeed_ResetFeedId();
                } else Play_showPanel();
                break;
            case KEY_RETURN:
                Play_KeyReturn(false);
                break;
            case KEY_PLAY:
            case KEY_PAUSE:
            case KEY_PLAYPAUSE:
                if (!Play_isEndDialogVisible()) Play_KeyPause(1);
                break;
            default:
                break;
        }
    }
}//Variable initialization
var Search_cursorY = 0;
var Search_cursorX = 0;
var Search_keyBoardOn = false;
//Variable initialization end

function Search_init() {
    Main_HideWarningDialog();
    Main_HideElement('label_refresh');
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
    Main_textContent('top_bar_user', STR_SEARCH);
    document.getElementById("top_lables").style.marginLeft = '14%';
    document.getElementById('top_bar_live').style.display = 'none';
    document.getElementById('top_bar_featured').style.display = 'none';
    document.getElementById('top_bar_game').style.display = 'none';
    document.getElementById('top_bar_vod').style.display = 'none';
    document.getElementById('top_bar_clip').style.display = 'none';
    Main_SearchInput.placeholder = STR_PLACEHOLDER_SEARCH;
    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_ShowElement('search_scroll');
    Search_cursorY = 0;
    Search_cursorX = 0;
    Search_refreshInputFocusTools();
    Search_inputFocus();
}

function Search_exit() {
    Search_RemoveinputFocus(false);
    document.body.removeEventListener("keydown", Search_handleKeyDown);
    Search_refreshInputFocusTools();
    Main_values.Main_Go = Main_values.Main_BeforeSearch;
    document.getElementById("top_lables").style.marginLeft = '18.5%';
    Main_textContent('top_bar_user', STR_USER);
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
    Main_ShowElement('label_refresh');
    document.getElementById('top_bar_live').style.display = 'inline-block';
    document.getElementById('top_bar_featured').style.display = 'inline-block';
    document.getElementById('top_bar_game').style.display = 'inline-block';
    document.getElementById('top_bar_vod').style.display = 'inline-block';
    document.getElementById('top_bar_clip').style.display = 'inline-block';
    Main_SearchInput.value = '';
    Main_HideElement('search_scroll');
}

function Search_loadData() {
    Search_exit();
    Main_ready(function() {
        if (!Search_cursorX) SearchChannels_init();
        else if (Search_cursorX === 1) SearchGames_init();
        else if (Search_cursorX === 2) SearchLive_init();
    });
}

function Search_refreshInputFocusTools() {
    Main_RemoveClass('chanel_button', 'button_search_focused');
    Main_RemoveClass('game_button', 'button_search_focused');
    Main_RemoveClass('live_button', 'button_search_focused');

    if (Search_cursorY) {
        if (!Search_cursorX) Main_AddClass('chanel_button', 'button_search_focused');
        else if (Search_cursorX === 1) Main_AddClass('game_button', 'button_search_focused');
        else if (Search_cursorX === 2) Main_AddClass('live_button', 'button_search_focused');
    }
}

function Search_handleKeyDown(event) {
    if (Search_keyBoardOn) return;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                Search_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (Search_cursorY === 1) {
                Search_cursorX--;
                if (Search_cursorX < 0) Search_cursorX = 2;
                Search_refreshInputFocusTools();
            }
            break;
        case KEY_RIGHT:
            if (Search_cursorY === 1) {
                Search_cursorX++;
                if (Search_cursorX > 2) Search_cursorX = 0;
                Search_refreshInputFocusTools();
            }
            break;
        case KEY_UP:
            if (Search_cursorY === 1) {
                Search_cursorY = 0;
                Search_refreshInputFocusTools();
                Search_inputFocus();
            }
            break;
        case KEY_DOWN:
            if (!Search_cursorY) {
                Search_RemoveinputFocus(false);
                Search_cursorY = 1;
                Search_refreshInputFocusTools();
            } else if (Search_cursorY === 1) {
                Search_cursorY = 0;
                Search_refreshInputFocusTools();
                Search_inputFocus();
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (!Search_cursorY) Search_inputFocus();
            else {
                if (Main_SearchInput.value !== '' && Main_SearchInput.value !== null) {
                    Main_values.Search_data = Main_SearchInput.value;
                    Main_SearchInput.value = '';
                    Search_loadData();
                } else {
                    Main_showWarningDialog(STR_SEARCH_EMPTY);
                    window.setTimeout(function() {
                        Main_HideWarningDialog();
                    }, 1000);
                }
            }
            break;
        default:
            break;
    }
}

function Search_inputFocus() {
    document.body.removeEventListener("keydown", Search_handleKeyDown);
    document.body.addEventListener("keydown", Search_KeyboardEvent, false);
    Main_SearchInput.placeholder = STR_PLACEHOLDER_SEARCH;
    Main_SearchInput.focus();
    Search_keyBoardOn = true;
}

function Search_RemoveinputFocus(EnaKeydown) {
    Main_SearchInput.blur();
    Search_removeEventListener();
    document.body.removeEventListener("keydown", Search_KeyboardEvent);
    Main_SearchInput.placeholder = STR_PLACEHOLDER_PRESS + STR_PLACEHOLDER_SEARCH;

    if (EnaKeydown) document.body.addEventListener("keydown", Search_handleKeyDown, false);
    Search_keyBoardOn = false;
}

function Search_removeEventListener() {
    if (Main_SearchInput !== null) {
        var elClone = Main_SearchInput.cloneNode(true);
        Main_SearchInput.parentNode.replaceChild(elClone, Main_SearchInput);
        Main_SearchInput = document.getElementById("search_input");
    }
}

function Search_KeyboardEvent(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Search_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_KEYBOARD_DELETE_ALL:
            Main_SearchInput.value = '';
            break;
        case KEY_KEYBOARD_DONE:
        case KEY_DOWN:
            Search_RemoveinputFocus(true);
            Search_cursorY = 1;
            Search_refreshInputFocusTools();
            break;
        case KEY_KEYBOARD_BACKSPACE:
            Main_SearchInput.value = Main_SearchInput.value.slice(0, -1);
            break;
        case KEY_KEYBOARD_SPACE:
            Main_SearchInput.value += ' ';
            break;
        default:
            break;
    }
}var Main_ItemsLimitMax = 100;
var ChannelClip_game = '';
var ChannelClip_views = '';
var ChannelClip_title = '';
var ChannelClip_playUrl = '';
var ChannelClip_createdAt = '';
var ChannelClip_language = '';

//Screens
var Clip;
var ChannelClip;
var AGameClip;
var Game;
var UserGames;
var Live;
var Featured;

var Base_obj = {
    posX: 0,
    posY: 0,
    row_id: 0,
    coloumn_id: 0,
    dataEnded: false,
    idObject: {},
    loadingData: false,
    itemsCount: 0,
    loadingDataTryMax: 5,
    loadingDataTimeout: 3500,
    MaxOffset: 0,
    offset: 0,
    status: false,
    emptyContent: false,
    itemsCountCheck: false,
    FirstLoad: false,
    row: 0,
    data: null,
    data_cursor: 0,
    loadDataSuccess: Screens_loadDataSuccess,
    set_ThumbSize: function() {
        this.ThumbCssText = 'width: ' + this.ThumbSize + '%; display: inline-block; padding: 3px;';
    },
    key_exit: function() {
        if (Main_isControlsDialogShown()) Main_HideControlsDialog();
        else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
        else {
            if (this.itemsCount) Main_removeFocus(this.posY + '_' + this.posX, this.ids);
            Main_CenterLablesStart(Screens_handleKeyDown);
        }
    },
};

var Base_Live_obj = {
    ThumbSize: 32.65,
    ItemsLimit: Main_ItemsLimitVideo,
    ItemsReloadLimit: Main_ItemsReloadLimitVideo,
    ColoumnsCount: Main_ColoumnsCountVideo,
    addFocus: Main_addFocusVideo,
    img_404: IMG_404_VIDEO,
    empty_str: function() {
        return STR_NO + STR_LIVE_CHANNELS;
    },
    key_play: function() {
        Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
    }
};

function ScreensObj_InitLive() {
    Live = Screens_assign({
        ids: Screens_ScreenIds('Live'),
        table: 'stream_table_live',
        screen: Main_Live,
        base_url: 'https://api.twitch.tv/kraken/streams?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + '&offset=' + this.offset +
                (Main_ContentLang !== "" ? ('&broadcaster_language=' + Main_ContentLang) : '');
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 0;
            Main_AddClass('top_bar_live', 'icon_center_focus');
        },
        label_exit: function() {
            Main_RemoveClass('top_bar_live', 'icon_center_focus');
        },
        concatenate: function(responseText) {
            if (this.data) {

                var tempObj = JSON.parse(responseText);

                this.MaxOffset = tempObj._total;
                this.data = this.data.concat(tempObj.streams);

                this.offset = this.data.length;
                if (this.offset > this.MaxOffset) this.dataEnded = true;

                inUseObj.loadingData = false;
            } else {
                this.data = JSON.parse(responseText);

                this.MaxOffset = this.data._total;
                this.data = this.data.streams;

                this.offset = this.data.length;
                if (this.offset > this.MaxOffset) this.dataEnded = true;

                this.loadDataSuccess();
                inUseObj.loadingData = false;
            }
        },
        addCell: function(cell) {
            if (!inUseObj.idObject[cell.channel._id]) {

                inUseObj.itemsCount++;
                inUseObj.idObject[cell.channel._id] = 1;

                inUseObj.row.appendChild(Screens_createCellLive(
                    inUseObj.row_id,
                    inUseObj.coloumn_id,
                    [cell.channel.name, cell.channel._id, cell.channel.status], this.ids,
                    [cell.preview.template.replace("{width}x{height}", Main_VideoSize),
                        Main_is_playlist(JSON.stringify(cell.stream_type)) + cell.channel.display_name,
                        cell.channel.status, cell.game,
                        STR_SINCE + Play_streamLiveAt(cell.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(cell.viewers) + STR_VIEWER,
                        Main_videoqualitylang(cell.video_height, cell.average_fps, cell.channel.broadcaster_language)
                    ]));

                inUseObj.coloumn_id++;
            }
        },
    }, Base_obj);

    Live = Screens_assign(Live, Base_Live_obj);
    Live.set_ThumbSize();
}

function ScreensObj_InitFeatured() {
    Featured = Screens_assign({
        ids: Screens_ScreenIds('Featured'),
        table: 'stream_table_featured',
        screen: Main_Featured,
        base_url: 'https://api.twitch.tv/kraken/streams/featured?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            this.url = this.base_url + '&offset=' + this.offset +
                (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token ? '&oauth_token=' +
                    AddUser_UsernameArray[Main_values.Users_Position].access_token : '');
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 2;
            Main_AddClass('top_bar_featured', 'icon_center_focus');
        },
        label_exit: function() {
            Main_RemoveClass('top_bar_featured', 'icon_center_focus');
        },
        concatenate: function(responseText) {
            this.data = JSON.parse(responseText);
            this.data = this.data.featured;
            this.dataEnded = true;

            this.loadDataSuccess();
            inUseObj.loadingData = false;
        },
        addCell: function(cell) {
            cell = cell.stream;
            if (!inUseObj.idObject[cell.channel._id]) {

                inUseObj.itemsCount++;
                inUseObj.idObject[cell.channel._id] = 1;

                inUseObj.row.appendChild(Screens_createCellLive(
                    inUseObj.row_id,
                    inUseObj.coloumn_id,
                    [cell.channel.name, cell.channel._id, cell.channel.status], this.ids,
                    [cell.preview.template.replace("{width}x{height}", Main_VideoSize),
                        Main_is_playlist(JSON.stringify(cell.stream_type)) + cell.channel.display_name,
                        cell.channel.status, cell.game,
                        STR_SINCE + Play_streamLiveAt(cell.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(cell.viewers) + STR_VIEWER,
                        Main_videoqualitylang(cell.video_height, cell.average_fps, cell.channel.broadcaster_language)
                    ]));

                inUseObj.coloumn_id++;
            }
        },
    }, Base_obj);

    Featured = Screens_assign(Featured, Base_Live_obj);
    Featured.set_ThumbSize();
}

var Base_Clip_obj = {
    ThumbSize: 32.65,
    ItemsLimit: Main_ItemsLimitVideo,
    HasSwitches: true,
    TopRowCreated: false,
    ItemsReloadLimit: Main_ItemsReloadLimitVideo,
    ColoumnsCount: Main_ColoumnsCountVideo,
    addFocus: Main_addFocusVideo,
    cursor: null,
    period: ['day', 'week', 'month', 'all'],
    img_404: IMG_404_VIDEO,
    empty_str: function() {
        return STR_NO + STR_CLIPS;
    },
    key_play: function() {
        if (this.posY === -1) {
            if (!this.loadingData) {
                this.periodPos++;
                if (this.periodPos > 4) this.periodPos = 1;
                this.SetPeriod();
                Screens_StartLoad();
            }
        } else Main_OpenClip(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
    },
    concatenate: function(responseText) {
        if (this.data) {
            var tempObj = JSON.parse(responseText);
            this.cursor = tempObj._cursor;
            if (this.cursor === '') this.dataEnded = true;
            this.data = this.data.concat(tempObj.clips);
            inUseObj.loadingData = false;
        } else {
            this.data = JSON.parse(responseText);
            this.cursor = this.data._cursor;
            if (this.cursor === '') this.dataEnded = true;

            this.data = this.data.clips;
            this.loadDataSuccess();
            inUseObj.loadingData = false;
        }
    },
    addCell: function(cell) {
        if (!inUseObj.idObject[cell.tracking_id]) {
            inUseObj.itemsCount++;
            inUseObj.idObject[cell.tracking_id] = 1;

            inUseObj.row.appendChild(Screens_createCellClip(inUseObj.row_id,
                inUseObj.coloumn_id,
                inUseObj.ids,
                cell.thumbnails.medium,
                cell.broadcaster.display_name,
                [STR_CREATED_AT,
                    Main_videoCreatedAt(cell.created_at)
                ],
                [twemoji.parse(cell.title), STR_PLAYING, cell.game],
                Main_addCommas(cell.views),
                '[' + cell.language.toUpperCase() + ']',
                cell.duration,
                cell.slug,
                cell.broadcaster.name,
                cell.broadcaster.logo.replace("150x150", "300x300"),
                cell.broadcaster.id,
                (cell.vod !== null ? cell.vod.id : null),
                (cell.vod !== null ? cell.vod.offset : null)));

            inUseObj.coloumn_id++;
        }
    }
};

function ScreensObj_InitClip() {
    Clip = Screens_assign({
        ids: Screens_ScreenIds('Clip'),
        table: 'stream_table_clip',
        screen: Main_Clip,
        periodPos: Main_getItemInt('Clip_periodPos', 2),
        base_url: 'https://api.twitch.tv/kraken/clips/top?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            this.url = this.base_url + '&period=' + this.period[this.periodPos - 1] +
                (this.cursor ? '&cursor=' + this.cursor : '') +
                (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
        },
        SetPeriod: function() {
            Main_innerHTML('top_bar_clip', STR_CLIPS + Main_UnderCenter(Main_Periods[this.periodPos - 1]));
            Main_setItem('Clip_periodPos', this.periodPos);
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 5;
            this.SetPeriod();
            Main_AddClass('top_bar_clip', 'icon_center_focus');
            Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
        },
        label_exit: function() {
            Main_RestoreTopLabel();
            Main_RemoveClass('top_bar_clip', 'icon_center_focus');
            Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
        },
    }, Base_obj);

    Clip = Screens_assign(Clip, Base_Clip_obj);
    Clip.set_ThumbSize();
}

function ScreensObj_InitChannelClip() {
    ChannelClip = Screens_assign({
        ids: Screens_ScreenIds('ChannelClip'),
        table: 'stream_table_channel_clip',
        screen: Main_ChannelClip,
        periodPos: Main_getItemInt('ChannelClip_periodPos', 2),
        base_url: 'https://api.twitch.tv/kraken/clips/top?channel=',
        set_url: function() {
            this.url = this.base_url + encodeURIComponent(Main_values.Main_selectedChannel) +
                '&limit=' + Main_ItemsLimitMax + '&period=' +
                this.period[this.periodPos - 1] + (this.cursor ? '&cursor=' + this.cursor : '');
        },
        SetPeriod: function() {
            Main_innerHTML('top_bar_game', STR_CLIPS + Main_Periods[this.periodPos - 1]);
            Main_setItem('ChannelClip_periodPos', this.periodPos);
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 1;
            if (!Main_values.Search_isSearching && Main_values.Main_selectedChannel_id)
                ChannelContent_RestoreChannelValue();
            if (Main_values.Main_selectedChannel !== this.lastselectedChannel) this.status = false;
            Main_cleanTopLabel();
            this.SetPeriod();
            Main_textContent('top_bar_user', Main_values.Main_selectedChannelDisplayname);
            Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
            this.lastselectedChannel = Main_values.Main_selectedChannel;
        },
        label_exit: Main_RestoreTopLabel,
    }, Base_obj);

    ChannelClip = Screens_assign(ChannelClip, Base_Clip_obj);
    ChannelClip.set_ThumbSize();
}

function ScreensObj_InitAGameClip() {
    AGameClip = Screens_assign({
        ids: Screens_ScreenIds('AGameClip'),
        table: 'stream_table_a_game_clip',
        screen: Main_AGameClip,
        periodPos: Main_getItemInt('AGameClip_periodPos', 2),
        base_url: 'https://api.twitch.tv/kraken/clips/top?game=',
        set_url: function() {
            this.url = this.base_url + encodeURIComponent(Main_values.Main_gameSelected) + '&limit=' + Main_ItemsLimitMax +
                '&period=' + this.period[this.periodPos - 1] + (this.cursor ? '&cursor=' + this.cursor : '') +
                (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
        },
        SetPeriod: function() {
            Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter(STR_CLIPS +
                Main_Periods[this.periodPos - 1] + ': ' + Main_values.Main_gameSelected));
            Main_setItem('AGameClip_periodPos', this.periodPos);
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 3;
            this.SetPeriod();
            Main_AddClass('top_bar_game', 'icon_center_focus');
            Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
            if (this.gameSelected !== Main_values.Main_gameSelected) this.status = false;
            this.gameSelected = Main_values.Main_gameSelected;
        },
        label_exit: function() {
            Main_RemoveClass('top_bar_game', 'icon_center_focus');
            Main_innerHTML('top_bar_game', STR_GAMES);
            Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
        },
    }, Base_obj);

    AGameClip = Screens_assign(AGameClip, Base_Clip_obj);
    AGameClip.set_ThumbSize();
}

var Base_Game_obj = {
    ThumbSize: 19.35,
    ItemsLimit: Main_ItemsLimitGame,
    ItemsReloadLimit: Main_ItemsReloadLimitGame,
    ColoumnsCount: Main_ColoumnsCountGame,
    addFocus: Main_addFocusGame,
    img_404: IMG_404_GAME,
    empty_str: function() {
        return STR_NO + STR_LIVE_GAMES;
    },
    concatenate: function(responseText) {
        if (this.data) {
            var tempObj = JSON.parse(responseText);

            this.MaxOffset = tempObj._total;
            this.data = this.data.concat(this.screen === Main_usergames ? tempObj.follows : tempObj.top);

            this.offset = this.data.length;
            if (this.offset > this.MaxOffset) this.dataEnded = true;

            inUseObj.loadingData = false;
        } else {

            this.data = JSON.parse(responseText);

            this.MaxOffset = this.data._total;
            this.data = this.screen === Main_usergames ? this.data.follows : this.data.top;

            this.offset = this.data.length;
            if (this.isLive) this.dataEnded = true;
            else if (this.offset > this.MaxOffset) this.dataEnded = true;

            this.loadDataSuccess();
            inUseObj.loadingData = false;
        }
    },
    key_play: function() {
        Main_values.Main_gameSelected = document.getElementById(this.ids[5] + this.posY + '_' + this.posX).getAttribute(Main_DataAttribute);
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
        Main_values.Main_BeforeAgame = this.screen;
        Main_values.Main_Go = Main_aGame;
        Main_values.Main_BeforeAgameisSet = true;
        AGame_UserGames = false;

        Main_addFocusVideoOffset = 0;
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
        Main_HideElement(this.ids[10]);

        Main_SwitchScreenAction();
        Main_removeFocus(this.posY + '_' + this.posX, this.ids);
    },

    addCell: function(cell) {
        var hasLive = this.isLive || this.screen === Main_games;
        var game = hasLive ? cell.game : cell;
        if (!inUseObj.idObject[game._id]) {

            inUseObj.itemsCount++;
            inUseObj.idObject[game._id] = 1;

            inUseObj.row.appendChild(Screens_createCellGame(inUseObj.row_id,
                inUseObj.coloumn_id,
                inUseObj.ids,
                game.box.template.replace("{width}x{height}", Main_GameSize),
                game.name,
                hasLive ? Main_addCommas(cell.channels) + ' ' + STR_CHANNELS + STR_FOR + Main_addCommas(cell.viewers) + STR_VIEWER : ''));

            inUseObj.coloumn_id++;
        }
    }
};

function ScreensObj_InitGame() {
    Game = Screens_assign({
        ids: Screens_ScreenIds('Game'),
        table: 'stream_table_games',
        screen: Main_games,
        base_url: 'https://api.twitch.tv/kraken/games/top?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + '&offset=' + this.offset;
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 3;
            Main_AddClass('top_bar_game', 'icon_center_focus');
        },
        label_exit: function() {
            Main_RemoveClass('top_bar_game', 'icon_center_focus');
        },
    }, Base_obj);

    Game = Screens_assign(Game, Base_Game_obj);
    Game.set_ThumbSize();
}

function ScreensObj_InitUserGames() {
    UserGames = Screens_assign({
        ids: Screens_ScreenIds('UserGames'),
        table: 'stream_table_user_games',
        screen: Main_usergames,
        isLive: Main_getItemBool('user_Games_live', true),
        OldUserName: '',
        base_url: 'https://api.twitch.tv/api/users/',
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].name) + '/follows/games';

            if (this.isLive) this.url += '/live?limit=750';
            else this.url += '?limit=' + Main_ItemsLimitMax + '&offset=' + this.offset;
        },
        key_refresh: function() {
            this.isLive = !this.isLive;

            Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + ' ' + (this.isLive ? STR_LIVE_GAMES : STR_FALLOW_GAMES)));

            Screens_StartLoad();

            Main_setItem('user_Games_live', this.isLive ? 'true' : 'false');
            if (Users_status) Users_resetGameCell();

        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 1;
            Main_IconLoad('label_refresh', 'icon-refresh', STR_USER_GAMES_CHANGE + STR_LIVE_GAMES + '/' + STR_FALLOW_GAMES + ":" + STR_GUIDE);
            Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
            Main_AddClass('top_bar_user', 'icon_center_focus');

            if (this.OldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) this.status = false;

            this.OldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;

            Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + ' ' + (this.isLive ? STR_LIVE_GAMES : STR_FALLOW_GAMES)));
        },
        label_exit: function() {
            Main_values.Users_Position = 0;
            Main_RemoveClass('top_bar_user', 'icon_center_focus');
            Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
            Main_textContent('top_bar_user', STR_USER);
            Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
        },
    }, Base_obj);

    UserGames = Screens_assign(UserGames, Base_Game_obj);
    UserGames.set_ThumbSize();
}//Variable initialization
var UserChannels_cursorY = 0;
var UserChannels_cursorX = 0;
var UserChannels_dataEnded = false;
var UserChannels_itemsCount = 0;
var UserChannels_loadingData = false;
var UserChannels_loadingDataTry = 0;
var UserChannels_loadingDataTryMax = 5;
var UserChannels_loadingDataTimeout = 3500;
var UserChannels_List = [];
var UserChannels_loadChannelOffsset = 0;
var UserChannels_emptyContent = false;
var UserChannels_Status = false;
var UserChannels_OldUserName = '';
var UserChannels_itemsCountCheck = false;

var UserChannels_ids = ['uc_thumbdiv', 'uc_img', 'uc_infodiv', 'uc_displayname', 'uc_cell', 'ucempty_', 'user_channels_scroll'];
//Variable initialization end

function UserChannels_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_UserChannels;
    Main_values.isLastSChannels = false;
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + STR_USER_CHANNEL));
    document.body.addEventListener("keydown", UserChannels_handleKeyDown, false);
    if (UserChannels_OldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) UserChannels_Status = false;
    if (UserChannels_Status) {
        Main_YRst(UserChannels_cursorY);
        Main_ShowElement(UserChannels_ids[6]);
        UserChannels_addFocus();
        Main_SaveValues();
    } else UserChannels_StartLoad();
}

function UserChannels_exit() {
    Main_values.Users_Position = 0;
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    document.body.removeEventListener("keydown", UserChannels_handleKeyDown);
    Main_textContent('top_bar_user', STR_USER);
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
    Main_HideElement(UserChannels_ids[6]);
}

function UserChannels_StartLoad() {
    Main_empty('stream_table_user_channels');
    Main_HideElement(UserChannels_ids[6]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    UserChannels_OldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
    UserChannels_Status = false;
    UserChannels_loadChannelOffsset = 0;
    UserChannels_itemsCount = 0;
    UserChannels_cursorX = 0;
    UserChannels_cursorY = 0;
    UserChannels_dataEnded = false;
    UserChannels_itemsCountCheck = false;
    Main_FirstLoad = true;
    Main_CounterDialogRst();
    UserChannels_List = [];
    UserChannels_loadDataPrepare();
    UserChannels_loadChannels();
}

function UserChannels_loadDataPrepare() {
    Main_imgVectorRst();
    UserChannels_loadingData = true;
    UserChannels_loadingDataTry = 0;
    UserChannels_loadingDataTimeout = 3500;
}

function UserChannels_loadChannels() {
    var theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].id) + '/follows/channels?limit=100&offset=' +
        UserChannels_loadChannelOffsset + '&sortby=created_at&';

    BasehttpGet(theUrl, UserChannels_loadingDataTimeout, 2, null, UserChannels_loadChannelLive, UserChannels_loadDataError);
}

function UserChannels_loadDataError() {
    UserChannels_loadingDataTry++;
    if (UserChannels_loadingDataTry < UserChannels_loadingDataTryMax) {
        UserChannels_loadingDataTimeout += 500;
        UserChannels_loadChannels();
    } else {
        UserChannels_loadingData = false;
        if (!UserChannels_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            UserChannels_dataEnded = true;
            UserChannels_loadDataSuccessFinish();
        }
    }
}

function UserChannels_loadChannelLive(responseText) {
    var response = JSON.parse(responseText).follows,
        response_items = response.length;

    if (response_items) { // response_items here is not always 99 because banned channels, so check until it is 0
        var ChannelTemp = '',
            x = 0;

        for (x; x < response_items; x++) {
            ChannelTemp = response[x].channel.name + ',' + response[x].channel._id + ',' +
                response[x].channel.logo + ',' + response[x].channel.display_name;
            if (UserChannels_List.indexOf(ChannelTemp) === -1) UserChannels_List.push(ChannelTemp);
        }

        UserChannels_loadChannelOffsset += response_items;
        UserChannels_loadDataPrepare();
        UserChannels_loadChannels();
    } else { // end
        UserChannels_List.sort(function(a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        UserChannels_loadDataSuccess();
    }
}

function UserChannels_loadDataSuccess() {
    var response_items = Main_ItemsLimitChannel;
    var offset_itemsCount = UserChannels_itemsCount;
    var rest = UserChannels_List.length - offset_itemsCount;
    if (rest < response_items) response_items = rest;

    if (response_items < Main_ItemsLimitChannel) UserChannels_dataEnded = true;

    UserChannels_itemsCount += response_items;

    UserChannels_emptyContent = !UserChannels_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountChannel;
    if (response_items % Main_ColoumnsCountChannel > 0) response_rows++;

    var coloumn_id, row_id, row,
        cursor = offset_itemsCount,
        doc = document.getElementById('stream_table_user_channels');

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountChannel + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountChannel && cursor < UserChannels_List.length; coloumn_id++, cursor++) {
            row.appendChild(UserChannels_createCell(row_id, row_id + '_' + coloumn_id,
                UserChannels_List[cursor].split(",")));
        }
        for (coloumn_id; coloumn_id < Main_ColoumnsCountChannel; coloumn_id++) {
            if (UserChannels_dataEnded && !UserChannels_itemsCountCheck) {
                UserChannels_itemsCountCheck = true;
                UserChannels_itemsCount = (row_id * Main_ColoumnsCountChannel) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(UserChannels_ids[5] + row_id + '_' + coloumn_id));
        }
        doc.appendChild(row);
    }
    UserChannels_loadDataSuccessFinish();
}

function UserChannels_createCell(row_id, id, valuesArray) {
    if (row_id < 4) Main_CacheImage(valuesArray[2]); //try to pre cache first 4 rows
    return Main_createCellChannel(id, UserChannels_ids, valuesArray);
}

function UserChannels_loadDataSuccessFinish() {
    if (!UserChannels_Status) {
        if (UserChannels_emptyContent) Main_showWarningDialog(STR_NO + STR_USER_CHANNEL);
        else {
            UserChannels_Status = true;
            Main_imgVectorLoad(IMG_404_LOGO);
            UserChannels_addFocus();
            Main_SaveValues();
        }
        Main_ShowElement(UserChannels_ids[6]);
        Main_FirstLoad = false;
        Main_HideLoadDialog();
    } else Main_imgVectorLoad(IMG_404_LOGO);
    UserChannels_loadingData = false;
    Main_CounterDialog(UserChannels_cursorX, UserChannels_cursorY, Main_ColoumnsCountChannel, UserChannels_itemsCount);
}

function UserChannels_addFocus() {
    Main_addFocusChannel(UserChannels_cursorY, UserChannels_cursorX, UserChannels_ids, Main_ColoumnsCountChannel, UserChannels_itemsCount);

    if (((UserChannels_cursorY + Main_ItemsReloadLimitChannel) > (UserChannels_itemsCount / Main_ColoumnsCountChannel)) &&
        !UserChannels_dataEnded && !UserChannels_loadingData) {
        UserChannels_loadDataPrepare();
        UserChannels_loadChannels();
    }
    if (Main_CenterLablesInUse) UserChannels_removeFocus();
}

function UserChannels_removeFocus() {
    if (UserChannels_itemsCount) Main_removeFocus(UserChannels_cursorY + '_' + UserChannels_cursorX, UserChannels_ids);
}

function UserChannels_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                UserChannels_removeFocus();
                Main_CenterLablesStart(UserChannels_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((UserChannels_cursorY), (UserChannels_cursorX - 1), UserChannels_ids[0])) {
                UserChannels_removeFocus();
                UserChannels_cursorX--;
                UserChannels_addFocus();
            } else {
                for (i = (Main_ColoumnsCountChannel - 1); i > -1; i--) {
                    if (Main_ThumbNull((UserChannels_cursorY - 1), i, UserChannels_ids[0])) {
                        UserChannels_removeFocus();
                        UserChannels_cursorY--;
                        UserChannels_cursorX = i;
                        UserChannels_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((UserChannels_cursorY), (UserChannels_cursorX + 1), UserChannels_ids[0])) {
                UserChannels_removeFocus();
                UserChannels_cursorX++;
                UserChannels_addFocus();
            } else if (Main_ThumbNull((UserChannels_cursorY + 1), 0, UserChannels_ids[0])) {
                UserChannels_removeFocus();
                UserChannels_cursorY++;
                UserChannels_cursorX = 0;
                UserChannels_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountChannel; i++) {
                if (Main_ThumbNull((UserChannels_cursorY - 1), (UserChannels_cursorX - i), UserChannels_ids[0])) {
                    UserChannels_removeFocus();
                    UserChannels_cursorY--;
                    UserChannels_cursorX = UserChannels_cursorX - i;
                    UserChannels_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountChannel; i++) {
                if (Main_ThumbNull((UserChannels_cursorY + 1), (UserChannels_cursorX - i), UserChannels_ids[0])) {
                    UserChannels_removeFocus();
                    UserChannels_cursorY++;
                    UserChannels_cursorX = UserChannels_cursorX - i;
                    UserChannels_addFocus();
                    break;
                }
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_values.Main_selectedChannel = document.getElementById(UserChannels_ids[4] + UserChannels_cursorY + '_' + UserChannels_cursorX).getAttribute(Main_DataAttribute);
            Main_values.Main_selectedChannel_id = document.getElementById(UserChannels_ids[4] + UserChannels_cursorY + '_' + UserChannels_cursorX).getAttribute('data-id');
            Main_values.Main_selectedChannelDisplayname = document.getElementById(UserChannels_ids[3] + UserChannels_cursorY +
                '_' + UserChannels_cursorX).textContent;
            Main_values.Main_selectedChannelLogo = document.getElementById(UserChannels_ids[1] + UserChannels_cursorY + '_' + UserChannels_cursorX).src;
            document.body.removeEventListener("keydown", UserChannels_handleKeyDown);
            Main_values.Main_BeforeChannel = Main_UserChannels;
            Main_values.Main_Go = Main_ChannelContent;
            Main_values.Main_BeforeChannelisSet = true;
            AddCode_IsFallowing = true;
            ChannelContent_UserChannels = true;
            Main_HideElement(UserChannels_ids[6]);
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}// more keys at http://developer.samsung.com/tv/develop/guides/user-interaction/remote-control/
var KEY_PAUSE = 51;
var KEY_PLAY = 52;
var KEY_PLAYPAUSE = 179;

var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_ENTER = 13;

var KEY_RETURN = 49;

var KEY_KEYBOARD_BACKSPACE = 8; // http://developer.samsung.com/tv/develop/guides/user-interaction/keyboardime
var KEY_KEYBOARD_DONE = 13;
var KEY_KEYBOARD_SPACE = 32;
var KEY_KEYBOARD_DELETE_ALL = 46;//Variable initialization
var SearchChannels_cursorY = 0;
var SearchChannels_cursorX = 0;
var SearchChannels_dataEnded = false;
var SearchChannels_itemsCount = 0;
var SearchChannels_idObject = {};
var SearchChannels_emptyCellVector = [];
var SearchChannels_loadingData = false;
var SearchChannels_loadingDataTry = 0;
var SearchChannels_loadingDataTryMax = 5;
var SearchChannels_loadingDataTimeout = 3500;
var SearchChannels_itemsCountOffset = 0;
var SearchChannels_MaxOffset = 0;
var SearchChannels_emptyContent = false;
var SearchChannels_Status = false;
var SearchChannels_lastData = '';
var SearchChannels_itemsCountCheck = false;

var SearchChannels_ids = ['sc_thumbdiv', 'sc_img', 'sc_infodiv', 'sc_displayname', 'sc_cell', 'scempty_', 'search_channel_scroll'];
//Variable initialization end

function SearchChannels_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_SearchChannels;
    Main_values.isLastSChannels = true;
    Main_values.Search_isSearching = true;
    if (SearchChannels_lastData !== Main_values.Search_data) SearchChannels_Status = false;
    Main_cleanTopLabel();
    Main_innerHTML('top_bar_user', STR_SEARCH + Main_UnderCenter(STR_CHANNELS + ' ' + "'" + Main_values.Search_data + "'"));
    document.body.addEventListener("keydown", SearchChannels_handleKeyDown, false);
    if (SearchChannels_Status) {
        Main_YRst(SearchChannels_cursorY);
        Main_ShowElement(SearchChannels_ids[6]);
        SearchChannels_addFocus();
        Main_SaveValues();
    } else SearchChannels_StartLoad();
}

function SearchChannels_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", SearchChannels_handleKeyDown);
    Main_HideElement(SearchChannels_ids[6]);
}

function SearchChannels_StartLoad() {
    Main_empty('stream_table_search_channel');
    Main_HideElement(SearchChannels_ids[6]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    SearchChannels_lastData = Main_values.Search_data;
    SearchChannels_Status = false;
    SearchChannels_itemsCountOffset = 0;
    SearchChannels_MaxOffset = 0;
    SearchChannels_idObject = {};
    SearchChannels_emptyCellVector = [];
    SearchChannels_itemsCountCheck = false;
    SearchChannels_itemsCount = 0;
    Main_FirstLoad = true;
    SearchChannels_cursorX = 0;
    SearchChannels_cursorY = 0;
    SearchChannels_dataEnded = false;
    Main_CounterDialogRst();
    SearchChannels_loadDataPrepare();
    SearchChannels_loadDataRequest();
}

function SearchChannels_loadDataPrepare() {
    Main_imgVectorRst();
    SearchChannels_loadingData = true;
    SearchChannels_loadingDataTry = 0;
    SearchChannels_loadingDataTimeout = 3500;
}

function SearchChannels_loadDataRequest() {

    var offset = SearchChannels_itemsCount + SearchChannels_itemsCountOffset;
    if (offset && offset > (SearchChannels_MaxOffset - 1)) {
        offset = SearchChannels_MaxOffset - Main_ItemsLimitChannel;
        SearchChannels_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/search/channels?query=' + encodeURIComponent(Main_values.Search_data) +
        '&limit=' + Main_ItemsLimitChannel + '&offset=' + offset;

    BasehttpGet(theUrl, SearchChannels_loadingDataTimeout, 2, null, SearchChannels_loadDataSuccess, SearchChannels_loadDataError);
}

function SearchChannels_loadDataError() {
    SearchChannels_loadingDataTry++;
    if (SearchChannels_loadingDataTry < SearchChannels_loadingDataTryMax) {
        SearchChannels_loadingDataTimeout += 500;
        SearchChannels_loadDataRequest();
    } else {
        SearchChannels_loadingData = false;
        if (!SearchChannels_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            SearchChannels_dataEnded = true;
            SearchChannels_loadDataSuccessFinish();
        }
    }
}

function SearchChannels_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.channels.length;
    SearchChannels_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitChannel) SearchChannels_dataEnded = true;

    var offset_itemsCount = SearchChannels_itemsCount;
    SearchChannels_itemsCount += response_items;

    SearchChannels_emptyContent = !SearchChannels_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountChannel;
    if (response_items % Main_ColoumnsCountChannel > 0) response_rows++;

    var coloumn_id, row_id, row, channels, id,
        cursor = 0,
        doc = document.getElementById('stream_table_search_channel');

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountChannel + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountChannel && cursor < response_items; coloumn_id++, cursor++) {
            channels = response.channels[cursor];
            id = channels._id;
            if (SearchChannels_idObject[id]) coloumn_id--;
            else {
                SearchChannels_idObject[id] = 1;
                row.appendChild(SearchChannels_createCell(row_id, row_id + '_' + coloumn_id, [channels.name, id, channels.logo, channels.display_name]));
            }

        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountChannel; coloumn_id++) {
            if (SearchChannels_dataEnded && !SearchChannels_itemsCountCheck) {
                SearchChannels_itemsCountCheck = true;
                SearchChannels_itemsCount = (row_id * Main_ColoumnsCountChannel) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(SearchChannels_ids[5] + row_id + '_' + coloumn_id));
            SearchChannels_emptyCellVector.push(SearchChannels_ids[5] + row_id + '_' + coloumn_id);
        }
        doc.appendChild(row);
    }

    SearchChannels_loadDataSuccessFinish();
}


function SearchChannels_createCell(row_id, id, valuesArray) {
    if (row_id < 4) Main_CacheImage(valuesArray[2]); //try to pre cache first 4 rows
    return Main_createCellChannel(id, SearchChannels_ids, valuesArray);
}

function SearchChannels_loadDataSuccessFinish() {
    if (!SearchChannels_Status) {
        if (SearchChannels_emptyContent) Main_showWarningDialog(STR_SEARCH_RESULT_EMPTY);
        else {
            SearchChannels_Status = true;
            Main_imgVectorLoad(IMG_404_LOGO);
            SearchChannels_addFocus();
            Main_SaveValues();
        }
        Main_ShowElement(SearchChannels_ids[6]);
        Main_FirstLoad = false;
        Main_HideLoadDialog();
    } else {
        Main_imgVectorLoad(IMG_404_LOGO);
        if (SearchChannels_emptyCellVector.length > 0 && !SearchChannels_dataEnded) {
            SearchChannels_loadDataPrepare();
            SearchChannels_loadDataReplace();
            return;
        } else {
            Main_CounterDialog(SearchChannels_cursorX, SearchChannels_cursorY, Main_ColoumnsCountChannel, SearchChannels_itemsCount);
            SearchChannels_emptyCellVector = [];
        }
    }
    SearchChannels_loadingData = false;
}

function SearchChannels_loadDataReplace() {
    Main_SetItemsLimitReplace(SearchChannels_emptyCellVector.length);

    var offset = SearchChannels_itemsCount + SearchChannels_itemsCountOffset;
    if (offset && offset > (SearchChannels_MaxOffset - 1)) {
        offset = SearchChannels_MaxOffset - Main_ItemsLimitReplace;
        SearchChannels_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/search/channels?query=' + encodeURIComponent(Main_values.Search_data) +
        '&limit=' + Main_ItemsLimitReplace + '&offset=' + offset;

    BasehttpGet(theUrl, SearchChannels_loadingDataTimeout, 2, null, SearchChannels_loadDataSuccessReplace, SearchChannels_loadDataErrorReplace);
}

function SearchChannels_loadDataErrorReplace() {
    SearchChannels_loadingDataTry++;
    if (SearchChannels_loadingDataTry < SearchChannels_loadingDataTryMax) {
        SearchChannels_loadingDataTimeout += 500;
        SearchChannels_loadDataReplace();
    } else {
        SearchChannels_dataEnded = true;
        SearchChannels_itemsCount -= SearchChannels_emptyCellVector.length;
        SearchChannels_emptyCellVector = [];
        SearchChannels_loadDataSuccessFinish();
    }
}

function SearchChannels_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.channels.length,
        channels, id, i = 0,
        cursor = 0,
        tempVector = [];

    SearchChannels_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitReplace) SearchChannels_dataEnded = true;

    for (i; i < SearchChannels_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        channels = response.channels[cursor];
        id = channels._id;
        if (SearchChannels_idObject[id]) i--;
        else {
            SearchChannels_idObject[id] = 1;
            Main_replaceChannel(SearchChannels_emptyCellVector[i], [channels.name, id, channels.logo, channels.display_name], SearchChannels_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) SearchChannels_emptyCellVector.splice(tempVector[i], 1);

    SearchChannels_itemsCountOffset += cursor;
    if (SearchChannels_dataEnded) {
        SearchChannels_itemsCount -= SearchChannels_emptyCellVector.length;
        SearchChannels_emptyCellVector = [];
    }

    SearchChannels_loadDataSuccessFinish();
}

function SearchChannels_addFocus() {
    Main_addFocusChannel(SearchChannels_cursorY, SearchChannels_cursorX, SearchChannels_ids, Main_ColoumnsCountChannel, SearchChannels_itemsCount);

    if (((SearchChannels_cursorY + Main_ItemsReloadLimitChannel) > (SearchChannels_itemsCount / Main_ColoumnsCountChannel)) &&
        !SearchChannels_dataEnded && !SearchChannels_loadingData) {
        SearchChannels_loadDataPrepare();
        SearchChannels_loadDataRequest();
    }
    if (Main_CenterLablesInUse) SearchChannels_removeFocus();
}

function SearchChannels_removeFocus() {
    if (SearchChannels_itemsCount) Main_removeFocus(SearchChannels_cursorY + '_' + SearchChannels_cursorX, SearchChannels_ids);
}

function SearchChannels_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                SearchChannels_removeFocus();
                Main_CenterLablesStart(SearchChannels_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((SearchChannels_cursorY), (SearchChannels_cursorX - 1), SearchChannels_ids[0])) {
                SearchChannels_removeFocus();
                SearchChannels_cursorX--;
                SearchChannels_addFocus();
            } else {
                for (i = (Main_ColoumnsCountChannel - 1); i > -1; i--) {
                    if (Main_ThumbNull((SearchChannels_cursorY - 1), i, SearchChannels_ids[0])) {
                        SearchChannels_removeFocus();
                        SearchChannels_cursorY--;
                        SearchChannels_cursorX = i;
                        SearchChannels_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((SearchChannels_cursorY), (SearchChannels_cursorX + 1), SearchChannels_ids[0])) {
                SearchChannels_removeFocus();
                SearchChannels_cursorX++;
                SearchChannels_addFocus();
            } else if (Main_ThumbNull((SearchChannels_cursorY + 1), 0, SearchChannels_ids[0])) {
                SearchChannels_removeFocus();
                SearchChannels_cursorY++;
                SearchChannels_cursorX = 0;
                SearchChannels_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountChannel; i++) {
                if (Main_ThumbNull((SearchChannels_cursorY - 1), (SearchChannels_cursorX - i), SearchChannels_ids[0])) {
                    SearchChannels_removeFocus();
                    SearchChannels_cursorY--;
                    SearchChannels_cursorX = SearchChannels_cursorX - i;
                    SearchChannels_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountChannel; i++) {
                if (Main_ThumbNull((SearchChannels_cursorY + 1), (SearchChannels_cursorX - i), SearchChannels_ids[0])) {
                    SearchChannels_removeFocus();
                    SearchChannels_cursorY++;
                    SearchChannels_cursorX = SearchChannels_cursorX - i;
                    SearchChannels_addFocus();
                    break;
                }
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_values.Main_selectedChannel = document.getElementById(SearchChannels_ids[4] + SearchChannels_cursorY + '_' + SearchChannels_cursorX).getAttribute(Main_DataAttribute);
            Main_values.Main_selectedChannel_id = document.getElementById(SearchChannels_ids[4] + SearchChannels_cursorY + '_' + SearchChannels_cursorX).getAttribute('data-id');
            Main_values.Main_selectedChannelDisplayname = document.getElementById(SearchChannels_ids[3] + SearchChannels_cursorY + '_' + SearchChannels_cursorX).textContent;
            document.body.removeEventListener("keydown", SearchChannels_handleKeyDown);
            Main_values.Main_BeforeChannel = Main_SearchChannels;
            Main_values.Main_Go = Main_ChannelContent;
            Main_values.Main_BeforeChannelisSet = true;
            AddCode_IsFallowing = false;
            ChannelContent_UserChannels = false;
            Main_HideElement(SearchChannels_ids[6]);
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}//Variable initialization
var UserLive_cursorY = 0;
var UserLive_cursorX = 0;
var UserLive_dataEnded = false;
var UserLive_itemsCount = 0;
var UserLive_idObject = {};
var UserLive_emptyCellVector = [];
var UserLive_loadingData = false;
var UserLive_loadingDataTry = 0;
var UserLive_loadingDataTryMax = 5;
var UserLive_loadingDataTimeout = 3500;
var UserLive_itemsCountOffset = 0;
var UserLive_MaxOffset = 0;
var UserLive_loadChannelOffsset = 0;
var UserLive_emptyContent = false;

var UserLive_ids = ['ul_thumbdiv', 'ul_img', 'ul_infodiv', 'ul_displayname', 'ul_streamtitle', 'ul_streamgame', 'ul_viwers', 'ul_quality', 'ul_cell', 'ulempty_', 'user_live_scroll'];
var UserLive_status = false;
var UserLive_followerChannels = '';
var UserLive_OldUserName = '';
var UserLive_itemsCountCheck = false;
//Variable initialization end

function UserLive_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_UserLive;
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + STR_LIVE_CHANNELS));
    document.body.addEventListener("keydown", UserLive_handleKeyDown, false);
    if (UserLive_OldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) UserLive_status = false;
    if (UserLive_status) {
        Main_YRst(UserLive_cursorY);
        Main_ShowElement(UserLive_ids[10]);
        UserLive_addFocus();
        Main_SaveValues();
    } else UserLive_StartLoad();
}

function UserLive_exit() {
    Main_values.Users_Position = 0;
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    document.body.removeEventListener("keydown", UserLive_handleKeyDown);
    Main_textContent('top_bar_user', STR_USER);
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
    Main_HideElement(UserLive_ids[10]);
}

function UserLive_StartLoad() {
    Main_empty('stream_table_user_live');
    Main_HideElement(UserLive_ids[10]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    UserLive_status = false;
    UserLive_OldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
    UserLive_loadChannelOffsset = 0;
    UserLive_itemsCountOffset = 0;
    UserLive_MaxOffset = 0;
    UserLive_idObject = {};
    UserLive_emptyCellVector = [];
    UserLive_itemsCountCheck = false;
    Main_FirstLoad = true;
    UserLive_itemsCount = 0;
    UserLive_cursorX = 0;
    UserLive_cursorY = 0;
    UserLive_dataEnded = false;
    UserLive_followerChannels = '';
    Main_CounterDialogRst();
    UserLive_loadDataPrepare();
    UserLive_loadChannels();
}

function UserLive_loadDataPrepare() {
    Main_imgVectorRst();
    UserLive_loadingData = true;
    UserLive_loadingDataTry = 0;
    UserLive_loadingDataTimeout = 3500;
}

function UserLive_loadChannels() {
    var theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].id) +
        '/follows/channels?limit=100&offset=' + UserLive_loadChannelOffsset + '&sortby=created_at';
    BasehttpGet(theUrl, UserLive_loadingDataTimeout, 2, null, UserLive_loadChannelLive, UserLive_loadDataError);
}

function UserLive_loadDataError() {
    UserLive_loadingDataTry++;
    if (UserLive_loadingDataTry < UserLive_loadingDataTryMax) {
        UserLive_loadingDataTimeout += 500;
        UserLive_loadChannels();
    } else {
        UserLive_loadingData = false;
        if (!UserLive_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            UserLive_dataEnded = true;
            UserLive_loadDataSuccessFinish();
        }
    }
}

function UserLive_loadChannelLive(responseText) {
    var response = JSON.parse(responseText).follows,
        response_items = response.length;

    if (response_items) { // response_items here is not always 99 because banned channels, so check until it is 0
        var ChannelTemp = '',
            x = 0;

        for (x; x < response_items; x++) {
            ChannelTemp = response[x].channel._id + ',';
            if (UserLive_followerChannels.indexOf(ChannelTemp) === -1) UserLive_followerChannels += ChannelTemp;
        }

        UserLive_loadChannelOffsset += response_items;
        UserLive_loadDataPrepare();
        UserLive_loadChannels();
    } else { // end
        UserLive_followerChannels = UserLive_followerChannels.slice(0, -1);
        UserLive_loadDataPrepare();
        UserLive_loadChannelUserLive();
    }
}

function UserLive_loadChannelUserLive() {

    var offset = UserLive_itemsCount + UserLive_itemsCountOffset;
    if (offset && offset > (UserLive_MaxOffset - 1)) {
        offset = UserLive_MaxOffset - Main_ItemsLimitVideo;
        UserLive_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(UserLive_followerChannels) + '&limit=' +
        Main_ItemsLimitVideo + '&offset=' + offset + '&stream_type=all';

    BasehttpGet(theUrl, UserLive_loadingDataTimeout, 2, null, UserLive_loadDataSuccess, UserLive_loadDataErrorLive);
}

function UserLive_loadDataErrorLive() {
    UserLive_loadingDataTry++;
    if (UserLive_loadingDataTry < UserLive_loadingDataTryMax) {
        UserLive_loadingDataTimeout += 500;
        UserLive_loadChannelUserLive();
    } else {
        UserLive_loadingData = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    }
}

function UserLive_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    UserLive_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) UserLive_dataEnded = true;

    var offset_itemsCount = UserLive_itemsCount;
    UserLive_itemsCount += response_items;

    UserLive_emptyContent = !UserLive_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, stream, id,
        cursor = 0,
        doc = document.getElementById("stream_table_user_live");

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            id = stream.channel._id;
            if (UserLive_idObject[id]) coloumn_id--;
            else {
                UserLive_idObject[id] = 1;
                row.appendChild(Main_createCellVideo(row_id, row_id + '_' + coloumn_id,
                    [stream.channel.name, id], UserLive_ids,
                    [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                        Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                        stream.channel.status, stream.game,
                        STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' +
                        STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                        Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.broadcaster_language)
                    ]));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (UserLive_dataEnded && !UserLive_itemsCountCheck) {
                UserLive_itemsCountCheck = true;
                UserLive_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(UserLive_ids[9] + row_id + '_' + coloumn_id));
            UserLive_emptyCellVector.push(UserLive_ids[9] + row_id + '_' + coloumn_id);
        }
        doc.appendChild(row);
    }

    UserLive_loadDataSuccessFinish();
}

function UserLive_loadDataSuccessFinish() {
    if (!UserLive_status) {
        if (UserLive_emptyContent) Main_showWarningDialog(STR_NO + STR_LIVE_CHANNELS);
        else {
            UserLive_status = true;
            UserLive_addFocus();
            Main_imgVectorLoad(IMG_404_VIDEO);
            Main_SaveValues();
        }
        Main_ShowElement(UserLive_ids[10]);
        Main_FirstLoad = false;
        Main_HideLoadDialog();
    } else {
        Main_imgVectorLoad(IMG_404_VIDEO);
        if (UserLive_emptyCellVector.length > 0 && !UserLive_dataEnded) {
            UserLive_loadDataPrepare();
            UserLive_loadChannelsReplace();
            return;
        } else {
            Main_CounterDialog(UserLive_cursorX, UserLive_cursorY, Main_ColoumnsCountVideo, UserLive_itemsCount);
            UserLive_emptyCellVector = [];
        }
    }
    UserLive_loadingData = false;
}

function UserLive_loadChannelsReplace() {
    Main_SetItemsLimitReplace(UserLive_emptyCellVector.length);

    var offset = UserLive_itemsCount + UserLive_itemsCountOffset;
    if (offset && offset > (UserLive_MaxOffset - 1)) {
        offset = UserLive_MaxOffset - Main_ItemsLimitReplace;
        UserLive_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(UserLive_followerChannels) + '&limit=' +
        Main_ItemsLimitReplace + '&offset=' + offset + '&stream_type=all';

    BasehttpGet(theUrl, UserLive_loadingDataTimeout, 2, null, UserLive_loadDataSuccessReplace, UserLive_loadDataErrorReplace);
}

function UserLive_loadDataErrorReplace() {
    UserLive_loadingDataTry++;
    if (UserLive_loadingDataTry < UserLive_loadingDataTryMax) {
        UserLive_loadingDataTimeout += 500;
        UserLive_loadChannelsReplace();
    } else {
        UserLive_dataEnded = true;
        UserLive_itemsCount -= UserLive_emptyCellVector.length;
        UserLive_emptyCellVector = [];
        UserLive_loadDataSuccessFinish();
    }
}

function UserLive_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.streams.length,
        stream, id, i = 0,
        cursor = 0,
        tempVector = [];

    UserLive_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitReplace) UserLive_dataEnded = true;


    for (i; i < UserLive_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        id = stream.channel._id;
        if (UserLive_idObject[id]) i--;
        else {
            UserLive_idObject[id] = 1;
            Main_replaceVideo(UserLive_emptyCellVector[i], [stream.channel.name, id], [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                stream.channel.status, stream.game,
                STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.broadcaster_language)
            ], UserLive_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) UserLive_emptyCellVector.splice(tempVector[i], 1);

    UserLive_itemsCountOffset += cursor;
    if (UserLive_dataEnded) {
        UserLive_itemsCount -= UserLive_emptyCellVector.length;
        UserLive_emptyCellVector = [];
    }

    UserLive_loadDataSuccessFinish();
}

function UserLive_addFocus() {
    Main_addFocusVideo(UserLive_cursorY, UserLive_cursorX, UserLive_ids, Main_ColoumnsCountVideo, UserLive_itemsCount);

    if (((UserLive_cursorY + Main_ItemsReloadLimitVideo) > (UserLive_itemsCount / Main_ColoumnsCountVideo)) &&
        !UserLive_dataEnded && !UserLive_loadingData) {
        UserLive_loadDataPrepare();
        UserLive_loadChannels();
    }
    if (Main_CenterLablesInUse) UserLive_removeFocus();
}

function UserLive_removeFocus() {
    if (UserLive_itemsCount) Main_removeFocus(UserLive_cursorY + '_' + UserLive_cursorX, UserLive_ids);
}

function UserLive_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                UserLive_removeFocus();
                Main_CenterLablesStart(UserLive_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((UserLive_cursorY), (UserLive_cursorX - 1), UserLive_ids[0])) {
                UserLive_removeFocus();
                UserLive_cursorX--;
                UserLive_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((UserLive_cursorY - 1), i, UserLive_ids[0])) {
                        UserLive_removeFocus();
                        UserLive_cursorY--;
                        UserLive_cursorX = i;
                        UserLive_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((UserLive_cursorY), (UserLive_cursorX + 1), UserLive_ids[0])) {
                UserLive_removeFocus();
                UserLive_cursorX++;
                UserLive_addFocus();
            } else if (Main_ThumbNull((UserLive_cursorY + 1), 0, UserLive_ids[0])) {
                UserLive_removeFocus();
                UserLive_cursorY++;
                UserLive_cursorX = 0;
                UserLive_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((UserLive_cursorY - 1), (UserLive_cursorX - i), UserLive_ids[0])) {
                    UserLive_removeFocus();
                    UserLive_cursorY--;
                    UserLive_cursorX = UserLive_cursorX - i;
                    UserLive_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((UserLive_cursorY + 1), (UserLive_cursorX - i), UserLive_ids[0])) {
                    UserLive_removeFocus();
                    UserLive_cursorY++;
                    UserLive_cursorX = UserLive_cursorX - i;
                    UserLive_addFocus();
                    break;
                }
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_OpenLiveStream(UserLive_cursorY + '_' + UserLive_cursorX, UserLive_ids, UserLive_handleKeyDown);
            break;
        default:
            break;
    }
}//Variable initialization
var SearchGames_Status = false;
var SearchGames_cursorY = 0;
var SearchGames_cursorX = 0;
var SearchGames_itemsCount = 0;
var SearchGames_loadingDataTry = 0;
var SearchGames_loadingDataTryMax = 5;
var SearchGames_loadingDataTimeout = 3500;
var SearchGames_itemsCountOffset = 0;
var SearchGames_MaxOffset = 0;
var SearchGames_emptyContent = false;
var SearchGames_itemsCountCheck = false;
var SearchGames_lastData = '';

var SearchGames_ids = ['sgthumbdiv', 'sgimg', 'sginfodiv', 'sgdisplayname', 'sgviwers', 'sgcell', 'sgempty_', 'search_games_scroll'];
//Variable initialization end

function SearchGames_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_SearchGames;
    Main_values.Search_isSearching = true;
    Main_cleanTopLabel();
    if (SearchGames_lastData !== Main_values.Search_data) SearchGames_Status = false;
    Main_innerHTML('top_bar_user', STR_SEARCH + Main_UnderCenter(STR_GAMES + ' ' + "'" + Main_values.Search_data + "'"));
    document.body.addEventListener("keydown", SearchGames_handleKeyDown, false);
    if (SearchGames_Status) {
        Main_YRst(SearchGames_cursorY);
        Main_ShowElement(SearchGames_ids[7]);
        SearchGames_addFocus();
        Main_SaveValues();
    } else SearchGames_StartLoad();
}

function SearchGames_exit() {
    if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", SearchGames_handleKeyDown);
    Main_values.Games_return = false;
    Main_HideElement(SearchGames_ids[7]);
}

function SearchGames_StartLoad() {
    Main_empty('stream_table_search_game');
    Main_HideElement(SearchGames_ids[7]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    SearchGames_lastData = Main_values.Search_data;
    SearchGames_Status = false;
    SearchGames_itemsCountOffset = 0;
    SearchGames_itemsCountCheck = false;
    SearchGames_MaxOffset = 0;
    SearchGames_itemsCount = 0;
    SearchGames_cursorX = 0;
    SearchGames_cursorY = 0;
    Main_CounterDialogRst();
    SearchGames_loadDataPrepare();
    SearchGames_loadDataRequest();
}

function SearchGames_loadDataPrepare() {
    Main_imgVectorRst();
    Main_FirstLoad = true;
    SearchGames_loadingDataTry = 0;
    SearchGames_loadingDataTimeout = 3500;
}

function SearchGames_loadDataRequest() {
    var theUrl = 'https://api.twitch.tv/kraken/search/games?query=' + encodeURIComponent(Main_values.Search_data);

    BasehttpGet(theUrl, SearchGames_loadingDataTimeout, 2, null, SearchGames_loadDataSuccess, SearchGames_loadDataError);
}

function SearchGames_loadDataError() {
    SearchGames_loadingDataTry++;
    if (SearchGames_loadingDataTry < SearchGames_loadingDataTryMax) {
        SearchGames_loadingDataTimeout += 500;
        SearchGames_loadDataRequest();
    } else {
        Main_FirstLoad = false;
        if (!SearchGames_itemsCount) {
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else SearchGames_loadDataSuccessFinish();
    }
}

function SearchGames_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = 0;

    if (response.games !== null) response_items = response.games.length;

    var offset_itemsCount = SearchGames_itemsCount;
    SearchGames_itemsCount += response_items;

    SearchGames_emptyContent = !SearchGames_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountGame;
    if (response_items % Main_ColoumnsCountGame > 0) response_rows++;

    var coloumn_id, row_id, row, game,
        cursor = 0,
        doc = document.getElementById("stream_table_search_game");

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountGame + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountGame && cursor < response_items; coloumn_id++, cursor++) {
            game = response.games[cursor];
            row.appendChild(SearchGames_createCell(row_id, row_id + '_' + coloumn_id, [game.name, game.box.template.replace("{width}x{height}", Main_GameSize), '']));
        }
        for (coloumn_id; coloumn_id < Main_ColoumnsCountGame; coloumn_id++) {
            if (!SearchGames_itemsCountCheck) {
                SearchGames_itemsCountCheck = true;
                SearchGames_itemsCount = (row_id * Main_ColoumnsCountGame) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(SearchGames_ids[6] + row_id + '_' + coloumn_id));
        }
        doc.appendChild(row);
    }

    SearchGames_loadDataSuccessFinish();
}

function SearchGames_createCell(row_id, id, valuesArray) {
    if (row_id < 2) Main_CacheImage(valuesArray[1]); //try to pre cache first 2 rows
    return Main_createCellGame(id, SearchGames_ids, valuesArray); //[preview_thumbnail, game_name, viwers]
}

function SearchGames_loadDataSuccessFinish() {
    if (!SearchGames_Status) {
        if (SearchGames_emptyContent) Main_showWarningDialog(STR_SEARCH_RESULT_EMPTY);
        else {
            SearchGames_Status = true;
            Main_imgVectorLoad(IMG_404_VIDEO);
            SearchGames_addFocus();
            Main_SaveValues();
        }
        Main_HideLoadDialog();
    }
    Main_ShowElement(SearchGames_ids[7]);
    Main_FirstLoad = false;
    Main_CounterDialog(SearchGames_cursorX, SearchGames_cursorY, Main_ColoumnsCountGame, SearchGames_itemsCount);
}

function SearchGames_addFocus() {
    Main_addFocusGame(SearchGames_cursorY, SearchGames_cursorX, SearchGames_ids,
        Main_ColoumnsCountGame, SearchGames_itemsCount);
    if (Main_CenterLablesInUse) SearchGames_removeFocus();
}

function SearchGames_removeFocus() {
    if (SearchGames_itemsCount) Main_removeFocus(SearchGames_cursorY + '_' + SearchGames_cursorX, SearchGames_ids);
}

function SearchGames_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                SearchGames_removeFocus();
                Main_CenterLablesStart(SearchGames_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((SearchGames_cursorY), (SearchGames_cursorX - 1), SearchGames_ids[0])) {
                SearchGames_removeFocus();
                SearchGames_cursorX--;
                SearchGames_addFocus();
            } else {
                for (i = (Main_ColoumnsCountGame - 1); i > -1; i--) {
                    if (Main_ThumbNull((SearchGames_cursorY - 1), i, SearchGames_ids[0])) {
                        SearchGames_removeFocus();
                        SearchGames_cursorY--;
                        SearchGames_cursorX = i;
                        SearchGames_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((SearchGames_cursorY), (SearchGames_cursorX + 1), SearchGames_ids[0])) {
                SearchGames_removeFocus();
                SearchGames_cursorX++;
                SearchGames_addFocus();
            } else if (Main_ThumbNull((SearchGames_cursorY + 1), 0, SearchGames_ids[0])) {
                SearchGames_removeFocus();
                SearchGames_cursorY++;
                SearchGames_cursorX = 0;
                SearchGames_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountGame; i++) {
                if (Main_ThumbNull((SearchGames_cursorY - 1), (SearchGames_cursorX - i), SearchGames_ids[0])) {
                    SearchGames_removeFocus();
                    SearchGames_cursorY--;
                    SearchGames_cursorX = SearchGames_cursorX - i;
                    SearchGames_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountGame; i++) {
                if (Main_ThumbNull((SearchGames_cursorY + 1), (SearchGames_cursorX - i), SearchGames_ids[0])) {
                    SearchGames_removeFocus();
                    SearchGames_cursorY++;
                    SearchGames_cursorX = SearchGames_cursorX - i;
                    SearchGames_addFocus();
                    break;
                }
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_values.gameSelectedOld = Main_values.Main_gameSelected;
            SearchGames_exit();
            Main_values.Main_gameSelected = document.getElementById(SearchGames_ids[5] + SearchGames_cursorY + '_' + SearchGames_cursorX).getAttribute(Main_DataAttribute);
            document.body.removeEventListener("keydown", SearchGames_handleKeyDown);
            Main_values.Main_Go = Main_aGame;
            Main_values.Games_return = true;
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}// The bellow are some function or adptations of function from
// https://www.nightdev.com/kapchat/
function extraEmoticonize(sender, message, emote) {
    if (emote.restrictions) {
        if (emote.restrictions.channels && emote.restrictions.channels.length && emote.restrictions.channels.indexOf(Main_values.Play_selectedChannel) === -1) return message;

        if (emote.restrictions.games && emote.restrictions.games.length) return message;
    }

    return message.replace(emote.code, extraEmoteTemplate(emote));
}

function extraEmoteTemplate(emote) {
    return '<img class="emoticon" src="' + emote['1x'] + '" srcset="' + emote['2x'] + ' 2x, ' + emote['3x'] + ' 4x" />';
}

function emoteTemplate(id) {
    return '<img class="emoticon" src="https://static-cdn.jtvnw.net/emoticons/v1/' + id + '/1.0" srcset="https://static-cdn.jtvnw.net/emoticons/v1/' + id + '/2.0 2x, https://static-cdn.jtvnw.net/emoticons/v1/' + id + '/3.0 4x" />';
}


function mescape(message) {
    return message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function extraMessageTokenize(sender, message) {
    var tokenizedString = message.split(' ');

    for (var i = 0; i < tokenizedString.length; i++) {
        var piece = tokenizedString[i];

        var test = piece.replace(/(^[~!@#$%\^&\*\(\)]+|[~!@#$%\^&\*\(\)]+$)/g, '');
        var emote = extraEmotes[test] || extraEmotes[piece];

        if (emote) {
            piece = extraEmoticonize(sender, piece, emote);
        } else {
            piece = mescape(piece);
        }

        tokenizedString[i] = piece;
    }

    return tokenizedString.join(' ');
}

function emoticonize(message, emotes) {
    if (!emotes) return [message];

    var tokenizedMessage = [];

    var emotesList = Object.keys(emotes);

    var replacements = [];

    emotesList.forEach(function(id) {
        var emote = emotes[id];

        for (var i = emote.length - 1; i >= 0; i--) {
            replacements.push({
                id: id,
                first: emote[i][0],
                last: emote[i][1]
            });
        }
    });

    replacements.sort(function(a, b) {
        return b.first - a.first;
    });

    // Tokenizes each character into an array
    // punycode deals with unicode symbols on surrogate pairs
    // punycode is used in the replacements loop below as well
    message = punycode.ucs2.decode(message);

    replacements.forEach(function(replacement) {
        // Unshift the end of the message (that doesn't contain the emote)
        tokenizedMessage.unshift(punycode.ucs2.encode(message.slice(replacement.last + 1)));

        // Unshift the emote HTML (but not as a string to allow us to process links and escape html still)
        tokenizedMessage.unshift([emoteTemplate(replacement.id)]);

        // Splice the unparsed piece of the message
        message = message.slice(0, replacement.first);
    });

    // Unshift the remaining part of the message (that contains no emotes)
    tokenizedMessage.unshift(punycode.ucs2.encode(message));

    return tokenizedMessage;
}

function transformBadges(sets) {
    return Object.keys(sets).map(function(b) {
        var badge = sets[b];
        badge.type = b;
        badge.versions = Object.keys(sets[b].versions).map(function(v) {
            var version = sets[b].versions[v];
            version.type = v;
            return version;
        });
        return badge;
    });
}

function tagCSS(type, version, url, doc) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.' + type + '-' + version + ' { background-image: url("' + url.replace('http:', 'https:') + '"); }';
    if (doc) doc.appendChild(style);
    else document.head.appendChild(style);
}//Variable initialization
var Users_cursorY = 0;
var Users_cursorX = 0;
var Users_ColoumnsCount = 8;
var Users_RemoveCursor = 0;
var Users_RemoveDialogID = null;

var Users_ids = ['u_thumbdiv', 'u_img', 'u_infodiv', 'u_displayname', 'u_cell', 'user_scroll'];
var Users_status = false;
var Users_loadingData = true;
//Variable initialization end

function Users_init() {
    if (Main_newUsercode) {
        Users_exit();
        AddCode_CheckNewCode(Main_newUsercode);
        return;
    } else if (!AddUser_IsUserSet()) {
        Main_values.Main_Go = Main_Live;
        Users_exit();
        Main_SwitchScreen();
        return;
    }
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_Users;
    document.getElementById("screens_holder").style.top = ((screen.height / 100) * 7) + "px";
    Main_HideWarningDialog();
    Main_AddClass('top_bar_user', 'icon_center_focus');
    document.body.addEventListener("keydown", Users_handleKeyDown, false);
    if (Users_status) {
        Main_YRst(Users_cursorY);
        Main_ShowElement(Users_ids[5]);
        Users_addFocus();
        Main_SaveValues();
    } else Users_StartLoad();
}

function Users_exit() {
    Main_values.Users_Position = 0;
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    document.body.removeEventListener("keydown", Users_handleKeyDown);
    Main_HideElement(Users_ids[5]);
    document.getElementById("screens_holder").style.top = "0";
}

function Users_StartLoad() {
    Main_empty('stream_table_user');
    Main_HideElement(Users_ids[5]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    Users_status = false;
    Main_FirstLoad = true;
    Users_cursorX = 0;
    Users_cursorY = 0;
    Users_loadingData = true;
    Main_ready(function() {
        Users_loadData();
    });
}

function Users_loadData() {
    var row, coloumn_id, tbody = document.createElement('tbody'),
        color, doc = document.getElementById("stream_table_user");

    for (var x = 0; x < AddUser_UsernameArray.length; x++) {
        coloumn_id = 0;
        color = ((x % 2) ? 'B5B5B5' : 'FFFFFF');

        Main_td = document.createElement('tr');
        Main_td.className = 'follower_header';
        Main_td.innerHTML = '<div class="follower_header">' + (!x ? STR_USER_NUMBER_ONE : '') +
            AddUser_UsernameArray[x].name + STR_CONTENT + '</div>';

        doc.appendChild(tbody);
        doc.appendChild(Main_td);

        row = document.createElement('tr');

        //live
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, STR_LIVE_CHANNELS, 'play', color));

        //host
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, STR_LIVE_HOSTS, 'users', color));

        //games
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, (UserGames.isLive ? STR_LIVE_GAMES : STR_FALLOW_GAMES),
            'gamepad', color));

        //videos
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, STR_VIDEOS, 'movie-play', color));

        //channels
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, STR_USER_CHANNEL, 'filmstrip', color));

        //add or make one
        coloumn_id++;
        if (!x) row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, STR_USER_ADD, 'user-plus', color));
        else row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, STR_USER_MAKE_ONE, 'arrow-up', color));

        //remove user
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, STR_USER_REMOVE, 'user-times', color));

        //add key
        coloumn_id++;
        row.appendChild(Users_createChannelCell(x + '_' + coloumn_id, Main_values.Main_selectedChannelDisplayname, (AddUser_UsernameArray[x].access_token ? STR_USER_CODE_OK : STR_USER_CODE), 'key', color));

        doc.appendChild(row);
    }

    Users_loadDataSuccessFinish();
}

function Users_createChannelCell(id, user_name, stream_type, icons, color) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', Users_ids[4] + id);
    Main_td.setAttribute(Main_DataAttribute, user_name);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = '<div id="' + Users_ids[0] + id + '" class="stream_thumbnail_channel" ><div id="' + Users_ids[1] + id +
        '" class="stream_user_icon" style="color: #' + color + ';"><i class="icon-' + icons + '"></i></div></div>' +
        '<div id="' + Users_ids[2] + id + '" class="stream_text">' +
        '<div id="' + Users_ids[3] + id + '" class="stream_info_user" style="text-align: center;">' + stream_type + '</div></div>';

    return Main_td;
}

function Users_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!Users_status) {
            Users_status = true;
            Users_addFocus();
            Main_HideLoadDialog();
            Main_SaveValues();
        }
        Main_ShowElement(Users_ids[5]);
        Main_FirstLoad = false;
        Users_loadingData = false;
    });
}

function Users_resetGameCell() {
    for (var x = 0; x < AddUser_UsernameArray.length; x++) Main_textContent(Users_ids[3] + x + '_' + 2, (UserGames.isLive ? STR_LIVE_GAMES : STR_FALLOW_GAMES));
}

function Users_addFocus() {
    Main_AddClass(Users_ids[0] + Users_cursorY + '_' + Users_cursorX, 'stream_thumbnail_focused');
    if (Main_YchangeAddFocus(Users_cursorY)) {

        if (Users_cursorY > 1) {

            if (Main_ThumbNull((Users_cursorY + 1), 0, Users_ids[0]))
                Main_ScrollTable(Users_ids[5], (document.getElementById(Users_ids[4] + Users_cursorY + '_' + Users_cursorX).offsetTop * -1) + 500);

        } else Main_ScrollTable(Users_ids[5], ((screen.height / 100) * 7));

    } else Main_handleKeyUp();
    if (Main_CenterLablesInUse) Users_removeFocus();
}

function Users_removeFocus() {
    Main_addFocusFinish = false;
    Main_RemoveClass(Users_ids[0] + Users_cursorY + '_' + Users_cursorX, 'stream_thumbnail_focused');
}

function Users_keyEnter() {
    Main_values.Users_Position = Users_cursorY;

    if (Users_cursorX === 3 && !AddUser_UsernameArray[Main_values.Users_Position].access_token) {
        Main_showWarningDialog(STR_NOKEY_VIDEO_WARN);
        window.setTimeout(Main_HideWarningDialog, 5000);
        return;
    }

    if (Users_cursorX === 7 && AddUser_UsernameArray[Main_values.Users_Position].access_token) {
        Main_showWarningDialog(STR_USER_CODE_OK);
        window.setTimeout(Main_HideWarningDialog, 1500);
        return;
    }

    if (Users_cursorX !== 6 && Users_cursorX !== 7) {
        Main_HideElement(Users_ids[5]);
        document.body.removeEventListener("keydown", Users_handleKeyDown);
        document.getElementById("screens_holder").style.top = "0";
    }

    Main_ready(function() {
        if (!Users_cursorX) UserLive_init();
        else if (Users_cursorX === 1) UserHost_init();
        else if (Users_cursorX === 2) {
            inUseObj = UserGames;
            Screens_init();
        } else if (Users_cursorX === 3) UserVod_init();
        else if (Users_cursorX === 4) UserChannels_init();
        else if (Users_cursorX === 5) {
            if (!Users_cursorY) {
                Main_values.Main_Before = Main_Users;
                AddUser_init();
            } else AddUser_UserMakeOne(Users_cursorY);
        } else if (Users_cursorX === 6) Users_showRemoveDialog();
        else if (Users_cursorX === 7 && !AddUser_UsernameArray[Main_values.Users_Position].access_token)
            Users_showRemoveDialog();
    });
}

function Users_clearRemoveDialog() {
    window.clearTimeout(Users_RemoveDialogID);
}

function Users_setRemoveDialog() {
    Users_RemoveDialogID = window.setTimeout(Users_HideRemoveDialog, 20000);
}

function Users_showRemoveDialog() {
    Users_setRemoveDialog();
    if (Users_cursorX === 6) Main_innerHTML("main_dialog_remove", STR_REMOVE_USER + STR_BR + AddUser_UsernameArray[Main_values.Users_Position].name + '?');
    else if (Users_cursorX === 7) Main_innerHTML("main_dialog_remove", STR_OAUTH_IN + ' ' + AddUser_UsernameArray[Main_values.Users_Position].name + '?');
    Main_ShowElement('main_remove_dialog');
}

function Users_HideRemoveDialog() {
    Users_clearRemoveDialog();
    Main_HideElement('main_remove_dialog');
    Users_RemoveCursor = 0;
    Users_RemoveCursorSet();
}

function Users_isRemoveDialogShown() {
    return Main_isElementShowing('main_remove_dialog');
}

function Users_RemoveCursorSet() {
    if (!Users_RemoveCursor) {
        Main_AddClass('remove_cancel', 'button_search_focused');
        Main_RemoveClass('remove_yes', 'button_search_focused');
    } else {
        Main_RemoveClass('remove_cancel', 'button_search_focused');
        Main_AddClass('remove_yes', 'button_search_focused');
    }
}

function Users_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Users_isRemoveDialogShown()) Users_HideRemoveDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Users_removeFocus();
                Main_CenterLablesStart(Users_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (Users_isRemoveDialogShown()) {
                Users_RemoveCursor--;
                if (Users_RemoveCursor < 0) Users_RemoveCursor = 1;
                Users_RemoveCursorSet();
                Users_clearRemoveDialog();
                Users_setRemoveDialog();
            } else if (Main_ThumbNull((Users_cursorY), (Users_cursorX - 1), Users_ids[0])) {
                Users_removeFocus();
                Users_cursorX--;
                Users_addFocus();
            } else if (!Main_ThumbNull((Users_cursorY - 1), 0, Users_ids[0])) {
                Users_removeFocus();
                Users_cursorX = Users_ColoumnsCount - 1;
                Users_addFocus();
            } else {
                for (i = (Users_ColoumnsCount - 1); i > -1; i--) {
                    if (Main_ThumbNull((Users_cursorY - 1), i, Users_ids[0])) {
                        Users_removeFocus();
                        Users_cursorY--;
                        Users_cursorX = i;
                        Users_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Users_isRemoveDialogShown()) {
                Users_RemoveCursor++;
                if (Users_RemoveCursor > 1) Users_RemoveCursor = 0;
                Users_RemoveCursorSet();
                Users_clearRemoveDialog();
                Users_setRemoveDialog();
            } else if (Main_ThumbNull((Users_cursorY), (Users_cursorX + 1), Users_ids[0])) {
                Users_removeFocus();
                Users_cursorX++;
                Users_addFocus();
            } else if (Main_ThumbNull((Users_cursorY + 1), 0, Users_ids[0])) {
                Users_removeFocus();
                Users_cursorY++;
                Users_cursorX = 0;
                Users_addFocus();
            } else {
                Users_removeFocus();
                Users_cursorX = 0;
                Users_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Users_ColoumnsCount; i++) {
                if (Main_ThumbNull((Users_cursorY - 1), (Users_cursorX - i), Users_ids[0])) {
                    Users_removeFocus();
                    Users_cursorY--;
                    Users_cursorX = Users_cursorX - i;
                    Users_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Users_ColoumnsCount; i++) {
                if (Main_ThumbNull((Users_cursorY + 1), (Users_cursorX - i), Users_ids[0])) {
                    Users_removeFocus();
                    Users_cursorY++;
                    Users_cursorX = Users_cursorX - i;
                    Users_addFocus();
                    break;
                }
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (Users_isRemoveDialogShown()) {
                var temp_RemoveCursor;
                if ((Users_cursorX === 6)) {
                    // HideRemoveDialog set Users_RemoveCursor to 0, is better to hide befor remove, use temp var
                    temp_RemoveCursor = Users_RemoveCursor;
                    Users_HideRemoveDialog();
                    if (temp_RemoveCursor) {
                        document.body.removeEventListener("keydown", Users_handleKeyDown);
                        Users_exit();
                        AddUser_removeUser(Users_cursorY);
                    }
                } else {
                    temp_RemoveCursor = Users_RemoveCursor;
                    Users_HideRemoveDialog();
                    if (temp_RemoveCursor) {
                        Main_values.Users_AddcodePosition = Main_values.Users_Position;
                        Main_SaveValues();
                        var baseUrlCode = 'https://id.twitch.tv/oauth2/authorize?';
                        var type_code = 'code';
                        var client_id = Main_clientId;
                        var redirect_uri = AddCode_redirect_uri;
                        var scope = 'user_follows_edit+user_subscriptions';
                        var force_verify = 'true';
                        var url = baseUrlCode + 'response_type=' + type_code + '&client_id=' + encodeURIComponent(client_id) +
                            '&redirect_uri=' + redirect_uri + '&scope=' + scope + '&force_verify=' + force_verify;
                        window.location = url;
                    }
                }
            } else Users_keyEnter();
            break;
        default:
            break;
    }
}/*! https://mths.be/punycode v1.4.1 by @mathias */

// https://cdnjs.cloudflare.com/ajax/libs/punycode/1.4.1/punycode.js
// https://cdnjs.com/libraries/punycode

(function(root) {

    /** Detect free variables */
    var freeGlobal = typeof global === 'object' && global;
    if (
        freeGlobal.global === freeGlobal ||
        freeGlobal.window === freeGlobal ||
        freeGlobal.self === freeGlobal
    ) {
        root = freeGlobal;
    }

    /**
     * The `punycode` object.
     * @name punycode
     * @type Object
     */
    var punycode,

        /** Highest positive signed 32-bit float value */
        maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

        /** Bootstring parameters */
        base = 36,
        tMin = 1,
        tMax = 26,
        skew = 38,
        damp = 700,
        initialBias = 72,
        initialN = 128, // 0x80
        delimiter = '-', // '\x2D'

        /** Regular expressions */
        regexPunycode = /^xn--/,
        regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
        regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

        /** Error messages */
        errors = {
            'overflow': 'Overflow: input needs wider integers to process',
            'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
            'invalid-input': 'Invalid input'
        },

        /** Convenience shortcuts */
        baseMinusTMin = base - tMin,
        floor = Math.floor,
        stringFromCharCode = String.fromCharCode;

    /*--------------------------------------------------------------------------*/

    /**
     * A generic error utility function.
     * @private
     * @param {String} type The error type.
     * @returns {Error} Throws a `RangeError` with the applicable error message.
     */
    function error(type) {
        throw new RangeError(errors[type]);
    }

    /**
     * A generic `Array#map` utility function.
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} callback The function that gets called for every array
     * item.
     * @returns {Array} A new array of values returned by the callback function.
     */
    function map(array, fn) {
        var length = array.length;
        var result = [];
        while (length--) {
            result[length] = fn(array[length]);
        }
        return result;
    }

    /**
     * A simple `Array#map`-like wrapper to work with domain name strings or email
     * addresses.
     * @private
     * @param {String} domain The domain name or email address.
     * @param {Function} callback The function that gets called for every
     * character.
     * @returns {Array} A new string of characters returned by the callback
     * function.
     */
    function mapDomain(string, fn) {
        var parts = string.split('@');
        var result = '';
        if (parts.length > 1) {
            // In email addresses, only the domain name should be punycoded. Leave
            // the local part (i.e. everything up to `@`) intact.
            result = parts[0] + '@';
            string = parts[1];
        }
        // Avoid `split(regex)` for IE8 compatibility. See #17.
        string = string.replace(regexSeparators, '\x2E');
        var labels = string.split('.');
        var encoded = map(labels, fn).join('.');
        return result + encoded;
    }

    /**
     * Creates an array containing the numeric code points of each Unicode
     * character in the string. While JavaScript uses UCS-2 internally,
     * this function will convert a pair of surrogate halves (each of which
     * UCS-2 exposes as separate characters) into a single code point,
     * matching UTF-16.
     * @see `punycode.ucs2.encode`
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode.ucs2
     * @name decode
     * @param {String} string The Unicode input string (UCS-2).
     * @returns {Array} The new array of code points.
     */
    function ucs2decode(string) {
        var output = [],
            counter = 0,
            length = string.length,
            value,
            extra;
        while (counter < length) {
            value = string.charCodeAt(counter++);
            if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                // high surrogate, and there is a next character
                extra = string.charCodeAt(counter++);
                if ((extra & 0xFC00) === 0xDC00) { // low surrogate
                    output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                } else {
                    // unmatched surrogate; only append this code unit, in case the next
                    // code unit is the high surrogate of a surrogate pair
                    output.push(value);
                    counter--;
                }
            } else {
                output.push(value);
            }
        }
        return output;
    }

    /**
     * Creates a string based on an array of numeric code points.
     * @see `punycode.ucs2.decode`
     * @memberOf punycode.ucs2
     * @name encode
     * @param {Array} codePoints The array of numeric code points.
     * @returns {String} The new Unicode string (UCS-2).
     */
    function ucs2encode(array) {
        return map(array, function(value) {
            var output = '';
            if (value > 0xFFFF) {
                value -= 0x10000;
                output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                value = 0xDC00 | value & 0x3FF;
            }
            output += stringFromCharCode(value);
            return output;
        }).join('');
    }

    /**
     * Converts a basic code point into a digit/integer.
     * @see `digitToBasic()`
     * @private
     * @param {Number} codePoint The basic numeric code point value.
     * @returns {Number} The numeric value of a basic code point (for use in
     * representing integers) in the range `0` to `base - 1`, or `base` if
     * the code point does not represent a value.
     */
    function basicToDigit(codePoint) {
        if (codePoint - 48 < 10) {
            return codePoint - 22;
        }
        if (codePoint - 65 < 26) {
            return codePoint - 65;
        }
        if (codePoint - 97 < 26) {
            return codePoint - 97;
        }
        return base;
    }

    /**
     * Converts a digit/integer into a basic code point.
     * @see `basicToDigit()`
     * @private
     * @param {Number} digit The numeric value of a basic code point.
     * @returns {Number} The basic code point whose value (when used for
     * representing integers) is `digit`, which needs to be in the range
     * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
     * used; else, the lowercase form is used. The behavior is undefined
     * if `flag` is non-zero and `digit` has no uppercase form.
     */
    function digitToBasic(digit, flag) {
        //  0..25 map to ASCII a..z or A..Z
        // 26..35 map to ASCII 0..9
        return digit + 22 + 75 * (digit < 26) - ((flag !== 0) << 5);
    }

    /**
     * Bias adaptation function as per section 3.4 of RFC 3492.
     * https://tools.ietf.org/html/rfc3492#section-3.4
     * @private
     */
    function adapt(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? floor(delta / damp) : delta >> 1;
        delta += floor(delta / numPoints);
        for ( /* no initialization */ ; delta > baseMinusTMin * tMax >> 1; k += base) {
            delta = floor(delta / baseMinusTMin);
        }
        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    }

    /**
     * Converts a Punycode string of ASCII-only symbols to a string of Unicode
     * symbols.
     * @memberOf punycode
     * @param {String} input The Punycode string of ASCII-only symbols.
     * @returns {String} The resulting string of Unicode symbols.
     */
    function decode(input) {
        // Don't use UCS-2
        var output = [],
            inputLength = input.length,
            out,
            i = 0,
            n = initialN,
            bias = initialBias,
            basic,
            j,
            index,
            oldi,
            w,
            k,
            digit,
            t,
            /** Cached calculation results */
            baseMinusT;

        // Handle the basic code points: let `basic` be the number of input code
        // points before the last delimiter, or `0` if there is none, then copy
        // the first basic code points to the output.

        basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
            basic = 0;
        }

        for (j = 0; j < basic; ++j) {
            // if it's not a basic code point
            if (input.charCodeAt(j) >= 0x80) {
                error('not-basic');
            }
            output.push(input.charCodeAt(j));
        }

        // Main decoding loop: start just after the last delimiter if any basic code
        // points were copied; start at the beginning otherwise.

        for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */ ) {

            // `index` is the index of the next character to be consumed.
            // Decode a generalized variable-length integer into `delta`,
            // which gets added to `i`. The overflow checking is easier
            // if we increase `i` as we go, then subtract off its starting
            // value at the end to obtain `delta`.
            for (oldi = i, w = 1, k = base; /* no condition */ ; k += base) {

                if (index >= inputLength) {
                    error('invalid-input');
                }

                digit = basicToDigit(input.charCodeAt(index++));

                if (digit >= base || digit > floor((maxInt - i) / w)) {
                    error('overflow');
                }

                i += digit * w;
                t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

                if (digit < t) {
                    break;
                }

                baseMinusT = base - t;
                if (w > floor(maxInt / baseMinusT)) {
                    error('overflow');
                }

                w *= baseMinusT;

            }

            out = output.length + 1;
            bias = adapt(i - oldi, out, oldi === 0);

            // `i` was supposed to wrap around from `out` to `0`,
            // incrementing `n` each time, so we'll fix that now:
            if (floor(i / out) > maxInt - n) {
                error('overflow');
            }

            n += floor(i / out);
            i %= out;

            // Insert `n` at position `i` of the output
            output.splice(i++, 0, n);

        }

        return ucs2encode(output);
    }

    /**
     * Converts a string of Unicode symbols (e.g. a domain name label) to a
     * Punycode string of ASCII-only symbols.
     * @memberOf punycode
     * @param {String} input The string of Unicode symbols.
     * @returns {String} The resulting Punycode string of ASCII-only symbols.
     */
    function encode(input) {
        var n,
            delta,
            handledCPCount,
            basicLength,
            bias,
            j,
            m,
            q,
            k,
            t,
            currentValue,
            output = [],
            /** `inputLength` will hold the number of code points in `input`. */
            inputLength,
            /** Cached calculation results */
            handledCPCountPlusOne,
            baseMinusT,
            qMinusT;

        // Convert the input in UCS-2 to Unicode
        input = ucs2decode(input);

        // Cache the length
        inputLength = input.length;

        // Initialize the state
        n = initialN;
        delta = 0;
        bias = initialBias;

        // Handle the basic code points
        for (j = 0; j < inputLength; ++j) {
            currentValue = input[j];
            if (currentValue < 0x80) {
                output.push(stringFromCharCode(currentValue));
            }
        }

        handledCPCount = basicLength = output.length;

        // `handledCPCount` is the number of code points that have been handled;
        // `basicLength` is the number of basic code points.

        // Finish the basic string - if it is not empty - with a delimiter
        if (basicLength) {
            output.push(delimiter);
        }

        // Main encoding loop:
        while (handledCPCount < inputLength) {

            // All non-basic code points < n have been handled already. Find the next
            // larger one:
            for (m = maxInt, j = 0; j < inputLength; ++j) {
                currentValue = input[j];
                if (currentValue >= n && currentValue < m) {
                    m = currentValue;
                }
            }

            // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
            // but guard against overflow
            handledCPCountPlusOne = handledCPCount + 1;
            if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                error('overflow');
            }

            delta += (m - n) * handledCPCountPlusOne;
            n = m;

            for (j = 0; j < inputLength; ++j) {
                currentValue = input[j];

                if (currentValue < n && ++delta > maxInt) {
                    error('overflow');
                }

                if (currentValue === n) {
                    // Represent delta as a generalized variable-length integer
                    for (q = delta, k = base; /* no condition */ ; k += base) {
                        t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                        if (q < t) {
                            break;
                        }
                        qMinusT = q - t;
                        baseMinusT = base - t;
                        output.push(
                            stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                        );
                        q = floor(qMinusT / baseMinusT);
                    }

                    output.push(stringFromCharCode(digitToBasic(q, 0)));
                    bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
                    delta = 0;
                    ++handledCPCount;
                }
            }

            ++delta;
            ++n;

        }
        return output.join('');
    }

    /**
     * Converts a Punycode string representing a domain name or an email address
     * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
     * it doesn't matter if you call it on a string that has already been
     * converted to Unicode.
     * @memberOf punycode
     * @param {String} input The Punycoded domain name or email address to
     * convert to Unicode.
     * @returns {String} The Unicode representation of the given Punycode
     * string.
     */
    function toUnicode(input) {
        return mapDomain(input, function(string) {
            return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
        });
    }

    /**
     * Converts a Unicode string representing a domain name or an email address to
     * Punycode. Only the non-ASCII parts of the domain name will be converted,
     * i.e. it doesn't matter if you call it with a domain that's already in
     * ASCII.
     * @memberOf punycode
     * @param {String} input The domain name or email address to convert, as a
     * Unicode string.
     * @returns {String} The Punycode representation of the given domain name or
     * email address.
     */
    function toASCII(input) {
        return mapDomain(input, function(string) {
            return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
        });
    }

    /*--------------------------------------------------------------------------*/

    /** Define the public API */
    punycode = {
        /**
         * A string representing the current Punycode.js version number.
         * @memberOf punycode
         * @type String
         */
        'version': '1.4.1',
        /**
         * An object of methods to convert from JavaScript's internal character
         * representation (UCS-2) to Unicode code points, and back.
         * @see <https://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode
         * @type Object
         */
        'ucs2': {
            'decode': ucs2decode,
            'encode': ucs2encode
        },
        'decode': decode,
        'encode': encode,
        'toASCII': toASCII,
        'toUnicode': toUnicode
    };

    /** Expose `punycode` */
    root.punycode = punycode;

}(this));//Variable initialization
var UserVod_cursorY = 0;
var UserVod_cursorX = 0;
var UserVod_dataEnded = false;
var UserVod_itemsCount = 0;
var UserVod_idObject = {};
var UserVod_emptyCellVector = [];
var UserVod_loadingData = false;
var UserVod_loadingDataTry = 0;
var UserVod_loadingDataTryMax = 5;
var UserVod_loadingDataTimeout = 3500;
var UserVod_itemsCountOffset = 0;
var UserVod_MaxOffset = 0;
var UserVod_emptyContent = false;
var UserVod_itemsCountCheck = false;
var UserVod_Type = 'time';
var UserVod_TypeNumber = 2;
var UserVod_TopRowCreated = false;

var UserVod_ids = ['uv_thumbdiv', 'uv_img', 'uv_infodiv', 'uv_title', 'uv_streamon', 'uv_duration', 'uv_viwers', 'uv_quality', 'uv_cell', 'uvempty_', 'user_vod_scroll', 'uv_game'];
var UserVod_status = false;
var UserVod_highlight = false;
//Variable initialization end

function UserVod_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_UserVod;

    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);

    Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + (UserVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA)));
    document.body.addEventListener("keydown", UserVod_handleKeyDown, false);

    if (UserVod_status) {
        Main_YRst(UserVod_cursorY);
        Main_ShowElement(UserVod_ids[10]);
        UserVod_SetPeriod();
        UserVod_addFocus();
        Main_SaveValues();
    } else UserVod_StartLoad();
}

function UserVod_exit() {
    Main_values.Users_Position = 0;
    if (UserVod_status) UserVod_removeFocus();
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
    document.body.removeEventListener("keydown", UserVod_handleKeyDown);
    Main_textContent('top_bar_user', STR_USER);
    Main_HideElement(UserVod_ids[10]);
}

function UserVod_StartLoad() {
    if (UserVod_status) UserVod_removeFocus();
    Main_empty('stream_table_user_vod');
    Main_HideElement(UserVod_ids[10]);
    Main_showLoadDialog();
    UserVod_SetPeriod();
    Main_HideWarningDialog();
    UserVod_status = false;
    UserVod_itemsCountOffset = 0;
    UserVod_TopRowCreated = false;
    UserVod_MaxOffset = 0;
    UserVod_idObject = {};
    UserVod_emptyCellVector = [];
    UserVod_itemsCountCheck = false;
    Main_FirstLoad = true;
    UserVod_itemsCount = 0;
    UserVod_cursorX = 0;
    UserVod_cursorY = 0;
    UserVod_dataEnded = false;
    Main_CounterDialogRst();
    UserVod_loadDataRequestStart();
}

function UserVod_loadDataPrepare() {
    Main_imgVectorRst();
    UserVod_loadingData = true;
    UserVod_loadingDataTry = 0;
    UserVod_loadingDataTimeout = 3500;
}

function UserVod_loadDataRequestStart() {
    UserVod_loadDataPrepare();
    UserVod_loadDataRequest();
}

function UserVod_loadDataRequest() {
    var offset = UserVod_itemsCount + UserVod_itemsCountOffset;
    if (offset && offset > (UserVod_MaxOffset - 1)) {
        offset = UserVod_MaxOffset - Main_ItemsLimitVideo;
        UserVod_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/videos/followed?limit=' + Main_ItemsLimitVideo +
        '&broadcast_type=' + (UserVod_highlight ? 'highlight' : 'archive') + '&sort=' + UserVod_Type +
        '&offset=' + offset;
    var xmlHttp;

    if (Main_Android) {

        xmlHttp = Android.mreadUrl(theUrl, UserVod_loadingDataTimeout, 3,
            Main_OAuth + AddUser_UsernameArray[Main_values.Users_Position].access_token);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            UserVod_loadDataError();
            return;
        }

        if (xmlHttp.status === 200) {
            UserVod_loadDataSuccess(xmlHttp.responseText);
            return;
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(Main_values.Users_Position, 0, UserVod_loadDataRequestStart, UserVod_loadDatafail);
        } else {
            UserVod_loadDataError();
        }

    } else {

        xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);

        xmlHttp.timeout = UserVod_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_Authorization, Main_OAuth + AddUser_UsernameArray[Main_values.Users_Position].access_token);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserVod_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
                    AddCode_refreshTokens(Main_values.Users_Position, 0, UserVod_loadDataRequestStart, UserVod_loadDatafail);
                } else {
                    UserVod_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    }
}

function UserVod_loadDataError() {
    UserVod_loadingDataTry++;
    if (UserVod_loadingDataTry < UserVod_loadingDataTryMax) {
        UserVod_loadingDataTimeout += 500;
        UserVod_loadDataRequest();
    } else UserVod_loadDatafail();
}

function UserVod_loadDatafail() {
    UserVod_loadingData = false;
    if (!UserVod_itemsCount) {
        Main_FirstLoad = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
    } else {
        UserVod_dataEnded = true;
        UserVod_loadDataSuccessFinish();
    }
}

function UserVod_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.videos.length;
    UserVod_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) UserVod_dataEnded = true;

    var offset_itemsCount = UserVod_itemsCount;
    UserVod_itemsCount += response_items;

    UserVod_emptyContent = !UserVod_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, video, id,
        cursor = 0,
        doc = document.getElementById("stream_table_user_vod");

    // Make the game video/clip/fallowing cell
    if (!UserVod_TopRowCreated) {
        UserVod_TopRowCreated = true;
        row = document.createElement('tr');
        var thumbfallow;
        for (i = 0; i < 2; i++) {
            if (!i) thumbfallow = '<i class="icon-movie-play stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_SWITCH_VOD;
            else thumbfallow = '<i class="icon-history stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_SWITCH_TYPE;
            Main_td = document.createElement('td');
            Main_td.setAttribute('id', UserVod_ids[8] + 'y_' + i);
            Main_td.className = 'stream_cell';
            Main_td.innerHTML = '<div id="' + UserVod_ids[0] +
                'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + UserVod_ids[3] +
                'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
            row.appendChild(Main_td);
        }
        doc.appendChild(row);
    }

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.videos[cursor];
            id = video._id;
            //video content can be null sometimes the preview will 404
            if ((video.preview.template + '').indexOf('404_processing') !== -1 || UserVod_idObject[id]) coloumn_id--;
            else {
                UserVod_idObject[id] = 1;
                row.appendChild(Vod_createCell(row_id, row_id + '_' + coloumn_id,
                    [id, video.length, video.channel.broadcaster_language, video.game, video.channel.name, video.increment_view_count_url],
                    [video.preview.template.replace("{width}x{height}", Main_VideoSize),
                        video.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                        twemoji.parse(video.title) + STR_BR + STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                        Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.channel.broadcaster_language),
                        STR_DURATION + Play_timeS(video.length), video.animated_preview_url
                    ], UserVod_ids));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (UserVod_dataEnded && !UserVod_itemsCountCheck) {
                UserVod_itemsCountCheck = true;
                UserVod_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(UserVod_ids[9] + row_id + '_' + coloumn_id));
            UserVod_emptyCellVector.push(UserVod_ids[9] + row_id + '_' + coloumn_id);
        }
        doc.appendChild(row);
    }

    UserVod_loadDataSuccessFinish();
}

function UserVod_loadDataSuccessFinish() {
    if (!UserVod_status) {
        if (UserVod_emptyContent) Main_showWarningDialog(STR_NO + (UserVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_FOR_THIS + STR_CHANNEL);
        else {
            UserVod_status = true;
            UserVod_addFocus();
            Main_imgVectorLoad(IMG_404_VIDEO);
            Main_SaveValues();
        }
        Main_ShowElement(UserVod_ids[10]);
        Main_FirstLoad = false;
        Main_HideLoadDialog();
    } else {
        Main_imgVectorLoad(IMG_404_VIDEO);
        Main_CounterDialog(UserVod_cursorX, UserVod_cursorY, Main_ColoumnsCountVideo, UserVod_itemsCount);
    }

    if (UserVod_emptyCellVector.length > 0 && !UserVod_dataEnded) {
        UserVod_loadDataReplaceStart();
        return;
    } else UserVod_emptyCellVector = [];

    UserVod_loadingData = false;
}

function UserVod_loadDataReplaceStart() {
    UserVod_loadDataPrepare();
    UserVod_loadDataReplace();
}

function UserVod_loadDataReplace() {

    Main_SetItemsLimitReplace(UserVod_emptyCellVector.length);

    var offset = UserVod_itemsCount + UserVod_itemsCountOffset;
    if (offset && offset > (UserVod_MaxOffset - 1)) {
        offset = UserVod_MaxOffset - Main_ItemsLimitReplace;
        UserVod_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/videos/followed?limit=' + Main_ItemsLimitReplace +
        '&broadcast_type=' + (UserVod_highlight ? 'highlight' : 'archive') + '&sort=' + UserVod_Type +
        '&offset=' + offset;
    var xmlHttp;

    if (Main_Android) {

        xmlHttp = Android.mreadUrl(theUrl, UserVod_loadingDataTimeout, 3,
            Main_OAuth + AddUser_UsernameArray[Main_values.Users_Position].access_token);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            UserVod_loadDataErrorReplace();
            return;
        }

        if (xmlHttp.status === 200) {
            UserVod_loadDataSuccessReplace(xmlHttp.responseText);
            return;
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) //token expired
            AddCode_refreshTokens(Main_values.Users_Position, 0, UserVod_loadDataRequestStart, UserVod_loadDatafail);
        else UserVod_loadDataErrorReplace();

    } else {
        xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);

        xmlHttp.timeout = UserVod_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_Authorization, Main_OAuth + AddUser_UsernameArray[Main_values.Users_Position].access_token);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    UserVod_loadDataSuccessReplace(xmlHttp.responseText);
                    return;
                } else if (xmlHttp.status === 401 || xmlHttp.status === 403) //token expired
                    AddCode_refreshTokens(Main_values.Users_Position, 0, UserVod_loadDataRequestStart, UserVod_loadDatafail);
                else UserVod_loadDataErrorReplace();
            }
        };

        xmlHttp.send(null);
    }
}

function UserVod_loadDataErrorReplace() {
    UserVod_loadingDataTry++;
    if (UserVod_loadingDataTry < UserVod_loadingDataTryMax) {
        UserVod_loadingDataTimeout += 500;
        UserVod_loadDataReplace();
    } else {
        UserVod_dataEnded = true;
        UserVod_itemsCount -= UserVod_emptyCellVector.length;
        UserVod_emptyCellVector = [];
        UserVod_loadDataSuccessFinish();
    }
}


function UserVod_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.videos.length,
        video, id, i = 0,
        cursor = 0,
        tempVector = [];

    UserVod_MaxOffset = parseInt(response._total);

    for (i; i < UserVod_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.videos[cursor];
        id = video._id;
        if ((video.preview.template + '').indexOf('404_processing') !== -1 || UserVod_idObject[id]) i--;
        else {
            UserVod_idObject[id] = 1;
            Vod_replaceVideo(UserVod_emptyCellVector[i],
                [id, video.length, video.channel.broadcaster_language, video.game, video.channel.name, video.increment_view_count_url],
                [video.preview.template.replace("{width}x{height}", Main_VideoSize),
                    video.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                    twemoji.parse(video.title) + STR_BR + STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) +
                    STR_VIEWS,
                    Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.channel.broadcaster_language),
                    STR_DURATION + Play_timeS(video.length), video.animated_preview_url
                ], UserVod_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) UserVod_emptyCellVector.splice(tempVector[i], 1);

    UserVod_itemsCountOffset += cursor;
    if (UserVod_dataEnded) {
        UserVod_itemsCount -= UserVod_emptyCellVector.length;
        UserVod_emptyCellVector = [];
    }

    UserVod_loadDataSuccessFinish();
}

function UserVod_addFocus() {
    if (UserVod_cursorY < 0) {
        UserVod_addFocusFallow();
        return;
    }
    Main_addFocusVideo(UserVod_cursorY, UserVod_cursorX, UserVod_ids, Main_ColoumnsCountVideo, UserVod_itemsCount);

    Vod_AnimateThumb(UserVod_ids, UserVod_cursorY + '_' + UserVod_cursorX);

    if (((UserVod_cursorY + Main_ItemsReloadLimitVideo) > (UserVod_itemsCount / Main_ColoumnsCountVideo)) &&
        !UserVod_dataEnded && !UserVod_loadingData) {
        UserVod_loadDataRequestStart();
    }
    if (Main_CenterLablesInUse) UserVod_removeFocus();
}

function UserVod_removeFocus() {
    window.clearInterval(Vod_AnimateThumbId);
    if (UserVod_cursorY > -1 && UserVod_itemsCount) {
        Main_ShowElement(UserVod_ids[1] + UserVod_cursorY + '_' + UserVod_cursorX);
        Main_removeFocus(UserVod_cursorY + '_' + UserVod_cursorX, UserVod_ids);
    } else UserVod_removeFocusFallow();
}

function UserVod_addFocusFallow() {
    var i = UserVod_cursorX > 1 ? 1 : UserVod_cursorX;
    Main_AddClass(UserVod_ids[0] + 'y_' + i, Main_classThumb);
}

function UserVod_removeFocusFallow() {
    var i = UserVod_cursorX > 1 ? 1 : UserVod_cursorX;
    Main_RemoveClass(UserVod_ids[0] + 'y_' + i, Main_classThumb);
}

function UserVod_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                UserVod_removeFocus();
                Main_CenterLablesStart(UserVod_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (UserVod_cursorY === -1) {
                UserVod_removeFocusFallow();
                UserVod_cursorX--;
                if (UserVod_cursorX < 0) UserVod_cursorX = 1;
                UserVod_addFocusFallow();
            } else if (!UserVod_cursorY && !UserVod_cursorX) {
                UserVod_removeFocus();
                UserVod_removeFocusFallow();
                UserVod_cursorY = -1;
                UserVod_cursorX = 1;
                UserVod_addFocusFallow();
            } else if (Main_ThumbNull((UserVod_cursorY), (UserVod_cursorX - 1), UserVod_ids[0])) {
                UserVod_removeFocus();
                UserVod_cursorX--;
                UserVod_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((UserVod_cursorY - 1), i, UserVod_ids[0])) {
                        UserVod_removeFocus();
                        UserVod_cursorY--;
                        UserVod_cursorX = i;
                        UserVod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (UserVod_cursorY === -1) {
                UserVod_removeFocusFallow();
                UserVod_cursorX++;
                if (UserVod_cursorX > 1) {
                    UserVod_cursorX = 0;
                    if (!UserVod_emptyContent) {
                        UserVod_cursorY = 0;
                        UserVod_addFocus();
                    } else UserVod_addFocusFallow();
                } else UserVod_addFocusFallow();
            } else if (Main_ThumbNull((UserVod_cursorY), (UserVod_cursorX + 1), UserVod_ids[0])) {
                UserVod_removeFocus();
                UserVod_cursorX++;
                UserVod_addFocus();
            } else if (Main_ThumbNull((UserVod_cursorY + 1), 0, UserVod_ids[0])) {
                UserVod_removeFocus();
                UserVod_cursorY++;
                UserVod_cursorX = 0;
                UserVod_addFocus();
            }
            break;
        case KEY_UP:
            if (UserVod_cursorY === -1 && !UserVod_emptyContent) {
                UserVod_cursorY = 0;
                UserVod_removeFocusFallow();
                UserVod_addFocus();
            } else if (!UserVod_cursorY) {
                UserVod_removeFocus();
                UserVod_cursorY = -1;
                UserVod_addFocusFallow();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((UserVod_cursorY - 1), (UserVod_cursorX - i), UserVod_ids[0])) {
                        UserVod_removeFocus();
                        UserVod_cursorY--;
                        UserVod_cursorX = UserVod_cursorX - i;
                        UserVod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_DOWN:
            if (UserVod_cursorY === -1 && !UserVod_emptyContent) {
                UserVod_cursorY = 0;
                UserVod_removeFocusFallow();
                UserVod_addFocus();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((UserVod_cursorY + 1), (UserVod_cursorX - i), UserVod_ids[0])) {
                        UserVod_removeFocus();
                        UserVod_cursorY++;
                        UserVod_cursorX = UserVod_cursorX - i;
                        UserVod_addFocus();
                        break;
                    }
                }

            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (UserVod_cursorY === -1) {
                if (UserVod_cursorX === 0) {
                    UserVod_highlight = !UserVod_highlight;
                    Main_setItem('UserVod_highlight', UserVod_highlight ? 'true' : 'false');
                    UserVod_StartLoad();
                } else {
                    if (UserVod_TypeNumber === 1) UserVod_TypeNumber++;
                    else UserVod_TypeNumber--;
                    UserVod_StartLoad();
                }
            } else Main_OpenVod(UserVod_cursorY + '_' + UserVod_cursorX, UserVod_ids, UserVod_handleKeyDown);
            break;
        default:
            break;
    }
}

function UserVod_SetPeriod() {
    if (UserVod_TypeNumber === 1) {
        Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(
            AddUser_UsernameArray[Main_values.Users_Position].name + ' ' +
            (UserVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_TIME));
        UserVod_Type = 'time';
    } else if (UserVod_TypeNumber === 2) {
        Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(
            AddUser_UsernameArray[Main_values.Users_Position].name + ' ' +
            (UserVod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_VIWES));
        UserVod_Type = 'views';
    }
    Main_setItem('UserVod_TypeNumber', UserVod_TypeNumber);
}// https://github.com/joewalnes/reconnecting-websocket/

// MIT License:
//
// Copyright (c) 2010-2012, Joe Walnes
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * This behaves like a WebSocket in every way, except if it fails to connect,
 * or it gets disconnected, it will repeatedly poll until it successfully connects
 * again.
 *
 * It is API compatible, so when you have:
 *   ws = new WebSocket('ws://....');
 * you can replace with:
 *   ws = new ReconnectingWebSocket('ws://....');
 *
 * The event stream will typically look like:
 *  onconnecting
 *  onopen
 *  onmessage
 *  onmessage
 *  onclose // lost connection
 *  onconnecting
 *  onopen  // sometime later...
 *  onmessage
 *  onmessage
 *  etc...
 *
 * It is API compatible with the standard WebSocket API, apart from the following members:
 *
 * - `bufferedAmount`
 * - `extensions`
 * - `binaryType`
 *
 * Latest version: https://github.com/joewalnes/reconnecting-websocket/
 * - Joe Walnes
 *
 * Syntax
 * ======
 * var socket = new ReconnectingWebSocket(url, protocols, options);
 *
 * Parameters
 * ==========
 * url - The url you are connecting to.
 * protocols - Optional string or array of protocols.
 * options - See below
 *
 * Options
 * =======
 * Options can either be passed upon instantiation or set after instantiation:
 *
 * var socket = new ReconnectingWebSocket(url, null, { debug: true, reconnectInterval: 4000 });
 *
 * or
 *
 * var socket = new ReconnectingWebSocket(url);
 * socket.debug = true;
 * socket.reconnectInterval = 4000;
 *
 * debug
 * - Whether this instance should log debug messages. Accepts true or false. Default: false.
 *
 * automaticOpen
 * - Whether or not the websocket should attempt to connect immediately upon instantiation. The socket can be manually opened or closed at any time using ws.open() and ws.close().
 *
 * reconnectInterval
 * - The number of milliseconds to delay before attempting to reconnect. Accepts integer. Default: 1000.
 *
 * maxReconnectInterval
 * - The maximum number of milliseconds to delay a reconnection attempt. Accepts integer. Default: 30000.
 *
 * reconnectDecay
 * - The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. Accepts integer or float. Default: 1.5.
 *
 * timeoutInterval
 * - The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. Accepts integer. Default: 2000.
 *
 */
(function(global, factory) {
    global.ReconnectingWebSocket = factory();
})(this, function() {

    if (!('WebSocket' in window)) {
        return;
    }

    function ReconnectingWebSocket(url, protocols, options) {

        // Default settings
        var settings = {

            /** Whether this instance should log debug messages. */
            debug: false,

            /** Whether or not the websocket should attempt to connect immediately upon instantiation. */
            automaticOpen: true,

            /** The number of milliseconds to delay before attempting to reconnect. */
            reconnectInterval: 1000,
            /** The maximum number of milliseconds to delay a reconnection attempt. */
            maxReconnectInterval: 30000,
            /** The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. */
            reconnectDecay: 1.5,

            /** The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. */
            timeoutInterval: 3000,

            /** The maximum number of reconnection attempts to make. Unlimited if null. */
            maxReconnectAttempts: null,

            /** The binary type, possible values 'blob' or 'arraybuffer', default 'blob'. */
            binaryType: 'blob'
        };
        if (!options) {
            options = {};
        }

        // Overwrite and define settings with options if they exist.
        for (var key in settings) {
            if (typeof options[key] !== 'undefined') {
                this[key] = options[key];
            } else {
                this[key] = settings[key];
            }
        }

        // These should be treated as read-only properties

        /** The URL as resolved by the constructor. This is always an absolute URL. Read only. */
        this.url = url;

        /** The number of attempted reconnects since starting, or the last successful connection. Read only. */
        this.reconnectAttempts = 0;

        /**
         * The current state of the connection.
         * Can be one of: WebSocket.CONNECTING, WebSocket.OPEN, WebSocket.CLOSING, WebSocket.CLOSED
         * Read only.
         */
        this.readyState = WebSocket.CONNECTING;

        /**
         * A string indicating the name of the sub-protocol the server selected; this will be one of
         * the strings specified in the protocols parameter when creating the WebSocket object.
         * Read only.
         */
        this.protocol = null;

        // Private state variables

        var self = this;
        var ws;
        var forcedClose = false;
        var timedOut = false;
        var eventTarget = document.createElement('div');

        // Wire up "on*" properties as event handlers

        eventTarget.addEventListener('open', function(event) {
            self.onopen(event);
        });
        eventTarget.addEventListener('close', function(event) {
            self.onclose(event);
        });
        eventTarget.addEventListener('connecting', function(event) {
            self.onconnecting(event);
        });
        eventTarget.addEventListener('message', function(event) {
            self.onmessage(event);
        });
        eventTarget.addEventListener('error', function(event) {
            self.onerror(event);
        });

        // Expose the API required by EventTarget

        this.addEventListener = eventTarget.addEventListener.bind(eventTarget);
        this.removeEventListener = eventTarget.removeEventListener.bind(eventTarget);
        this.dispatchEvent = eventTarget.dispatchEvent.bind(eventTarget);

        /**
         * This function generates an event that is compatible with standard
         * compliant browsers and IE9 - IE11
         *
         * This will prevent the error:
         * Object doesn't support this action
         *
         * http://stackoverflow.com/questions/19345392/why-arent-my-parameters-getting-passed-through-to-a-dispatched-event/19345563#19345563
         * @param s String The name that the event should use
         * @param args Object an optional object that the event will use
         */
        function generateEvent(s, args) {
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(s, false, false, args);
            return evt;
        }

        this.open = function(reconnectAttempt) {
            ws = new WebSocket(self.url, protocols || []);
            ws.binaryType = this.binaryType;

            if (reconnectAttempt) {
                if (this.maxReconnectAttempts && this.reconnectAttempts > this.maxReconnectAttempts) {
                    return;
                }
            } else {
                eventTarget.dispatchEvent(generateEvent('connecting'));
                this.reconnectAttempts = 0;
            }

            if (self.debug || ReconnectingWebSocket.debugAll) {
                console.debug('ReconnectingWebSocket', 'attempt-connect', self.url);
            }

            var localWs = ws;
            var timeout = setTimeout(function() {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'connection-timeout', self.url);
                }
                timedOut = true;
                localWs.close();
                timedOut = false;
            }, self.timeoutInterval);

            ws.onopen = function() {
                clearTimeout(timeout);
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'onopen', self.url);
                }
                self.protocol = ws.protocol;
                self.readyState = WebSocket.OPEN;
                self.reconnectAttempts = 0;
                var e = generateEvent('open');
                e.isReconnect = reconnectAttempt;
                reconnectAttempt = false;
                eventTarget.dispatchEvent(e);
            };

            ws.onclose = function(event) {
                clearTimeout(timeout);
                ws = null;
                if (forcedClose) {
                    self.readyState = WebSocket.CLOSED;
                    eventTarget.dispatchEvent(generateEvent('close'));
                } else {
                    self.readyState = WebSocket.CONNECTING;
                    var e = generateEvent('connecting');
                    e.code = event.code;
                    e.reason = event.reason;
                    e.wasClean = event.wasClean;
                    eventTarget.dispatchEvent(e);
                    if (!reconnectAttempt && !timedOut) {
                        if (self.debug || ReconnectingWebSocket.debugAll) {
                            console.debug('ReconnectingWebSocket', 'onclose', self.url);
                        }
                        eventTarget.dispatchEvent(generateEvent('close'));
                    }

                    var mtimeout = self.reconnectInterval * Math.pow(self.reconnectDecay, self.reconnectAttempts);
                    setTimeout(function() {
                        self.reconnectAttempts++;
                        self.open(true);
                    }, mtimeout > self.maxReconnectInterval ? self.maxReconnectInterval : mtimeout);
                }
            };
            ws.onmessage = function(event) {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'onmessage', self.url, event.data);
                }
                var e = generateEvent('message');
                e.data = event.data;
                eventTarget.dispatchEvent(e);
            };
            ws.onerror = function(event) {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'onerror', self.url, event);
                }
                eventTarget.dispatchEvent(generateEvent('error'));
            };
        };

        // Whether or not to create a websocket upon instantiation
        if (this.automaticOpen === true) {
            this.open(false);
        }

        /**
         * Transmits data to the server over the WebSocket connection.
         *
         * @param data a text string, ArrayBuffer or Blob to send to the server.
         */
        this.send = function(data) {
            if (ws) {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'send', self.url, data);
                }
                return ws.send(data);
            } else {
                throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
            }
        };

        /**
         * Closes the WebSocket connection or connection attempt, if any.
         * If the connection is already CLOSED, this method does nothing.
         */
        this.close = function(code, reason) {
            // Default CLOSE_NORMAL code
            if (typeof code === 'undefined') {
                code = 1000;
            }
            forcedClose = true;
            if (ws) {
                ws.close(code, reason);
            }
        };

        /**
         * Additional public API method to refresh the connection if still open (close, re-open).
         * For example, if the app suspects bad data / missed heart beats, it can try to refresh.
         */
        this.refresh = function() {
            if (ws) {
                ws.close();
            }
        };
    }

    /**
     * An event listener to be called when the WebSocket connection's readyState changes to OPEN;
     * this indicates that the connection is ready to send and receive data.
     */
    ReconnectingWebSocket.prototype.onopen = function() {};
    /** An event listener to be called when the WebSocket connection's readyState changes to CLOSED. */
    ReconnectingWebSocket.prototype.onclose = function() {};
    /** An event listener to be called when a connection begins being attempted. */
    ReconnectingWebSocket.prototype.onconnecting = function() {};
    /** An event listener to be called when a message is received from the server. */
    ReconnectingWebSocket.prototype.onmessage = function() {};
    /** An event listener to be called when an error occurs. */
    ReconnectingWebSocket.prototype.onerror = function() {};

    /**
     * Whether all instances of ReconnectingWebSocket should log debug messages.
     * Setting this to true is the equivalent of setting all instances of ReconnectingWebSocket.debug to true.
     */
    ReconnectingWebSocket.debugAll = false;

    ReconnectingWebSocket.CONNECTING = WebSocket.CONNECTING;
    ReconnectingWebSocket.OPEN = WebSocket.OPEN;
    ReconnectingWebSocket.CLOSING = WebSocket.CLOSING;
    ReconnectingWebSocket.CLOSED = WebSocket.CLOSED;

    return ReconnectingWebSocket;
});var UserLiveFeed_loadingData = false;
var UserLiveFeed_loadingDataTry = 0;
var UserLiveFeed_loadingDataTimeout = 3500;
var UserLiveFeed_loadChannelOffsset = 0;
var UserLiveFeed_loadingDataTryMax = 5;
var UserLiveFeed_itemsCount = 0;
var UserLiveFeed_dataEnded = false;
var UserLiveFeed_followerChannels = '';
var UserLiveFeed_itemsCountOffset = 0;
//var UserLiveFeed_MaxOffset = 0;
var UserLiveFeed_idObject = {};
var UserLiveFeed_status = false;
var UserLiveFeed_imgVector = [];
var UserLiveFeed_LastPos = null;
var UserLiveFeed_Feedid;
var UserLiveFeed_ids = ['ulf_thumbdiv', 'ulf_img', 'ulf_infodiv', 'ulf_displayname', 'ulf_streamtitle', 'ulf_streamgame', 'ulf_viwers', 'ulf_quality', 'ulf_cell', 'ulempty_', 'user_live_scroll'];

function UserLiveFeed_StartLoad() {
    if (AddUser_UserIsSet()) {
        UserLiveFeed_clearHideFeed();

        if (UserLiveFeed_status) {
            if (UserLiveFeed_ThumbNull(Play_FeedPos, UserLiveFeed_ids[0]))
                UserLiveFeed_LastPos = JSON.parse(document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos).getAttribute(Main_DataAttribute))[0];
        } else UserLiveFeed_LastPos = null;

        Main_empty('user_feed_scroll');
        UserLiveFeed_status = false;
        document.getElementById('user_feed_scroll').style.left = "2.5px";
        document.getElementById('user_feed').style.bottom = '0.1%';
        Main_ShowElement('dialog_loading_feed');
        UserLiveFeed_loadChannelOffsset = 0;
        UserLiveFeed_itemsCount = 0;
        UserLiveFeed_followerChannels = '';
        UserLiveFeed_itemsCountOffset = 0;
        //UserLiveFeed_MaxOffset = 0;
        Play_FeedPos = 0;
        UserLiveFeed_idObject = {};
        UserLiveFeed_imgVector = [];
        Main_ready(function() {
            UserLiveFeed_loadDataPrepare();
            UserLiveFeed_loadChannels();
        });
    }
}

function UserLiveFeed_imgVectorLoad(img_type) {
    var elem;
    for (var i = 0; i < UserLiveFeed_imgVector.length; i++) {
        elem = document.getElementById(UserLiveFeed_imgVector[i].id);
        if (elem !== null) Main_loadImg(elem, UserLiveFeed_imgVector[i].src + Main_randomimg, img_type);
    }
}

function UserLiveFeed_imgVectorPush(id, src) {
    UserLiveFeed_imgVector.push({
        'id': id,
        'src': src
    });
}

function UserLiveFeed_loadDataPrepare() {
    UserLiveFeed_loadingData = true;
    UserLiveFeed_loadingDataTry = 0;
    UserLiveFeed_loadingDataTimeout = 3500;
}

function UserLiveFeed_loadChannels() {
    var theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].id) +
        '/follows/channels?limit=100&offset=' + UserLiveFeed_loadChannelOffsset + '&sortby=created_at';

    BasehttpGet(theUrl, UserLiveFeed_loadingDataTimeout, 2, null, UserLiveFeed_loadChannelLive, UserLiveFeed_loadDataError);
}

function UserLiveFeed_loadDataError() {
    UserLiveFeed_loadingDataTry++;
    if (UserLiveFeed_loadingDataTry < UserLiveFeed_loadingDataTryMax) {
        UserLiveFeed_loadingDataTimeout += 500;
        UserLiveFeed_loadChannels();
    } else {
        UserLiveFeed_loadingData = false;
        if (!UserLiveFeed_itemsCount) {
            Main_HideElement('dialog_loading_feed');

            if (UserLiveFeed_isFeedShow()) {
                Play_showWarningDialog(STR_REFRESH_PROBLEM);
                window.setTimeout(function() {
                    Play_HideWarningDialog();
                }, 2000);
            }
        } else {
            UserLiveFeed_dataEnded = true;
            UserLiveFeed_loadDataSuccessFinish();
        }
    }
}

function UserLiveFeed_loadChannelLive(responseText) {
    var response = JSON.parse(responseText).follows,
        response_items = response.length;

    if (response_items) { // response_items here is not always 99 because banned channels, so check until it is 0
        var ChannelTemp = '',
            x = 0;

        for (x; x < response_items; x++) {
            ChannelTemp = response[x].channel._id + ',';
            if (UserLiveFeed_followerChannels.indexOf(ChannelTemp) === -1) UserLiveFeed_followerChannels += ChannelTemp;
        }

        UserLiveFeed_loadChannelOffsset += response_items;
        UserLiveFeed_loadDataPrepare();
        UserLiveFeed_loadChannels();
    } else { // end
        UserLiveFeed_followerChannels = UserLiveFeed_followerChannels.slice(0, -1);
        UserLiveFeed_loadDataPrepare();
        Main_ready(UserLiveFeed_loadChannelUserLive);
    }
}

function UserLiveFeed_loadChannelUserLive() {
    var theUrl = 'https://api.twitch.tv/kraken/streams/?channel=' + encodeURIComponent(UserLiveFeed_followerChannels) + '&limit=100&offset=0&stream_type=all';

    BasehttpGet(theUrl, UserLiveFeed_loadingDataTimeout, 2, null, UserLiveFeed_loadDataSuccess, UserLiveFeed_loadDataErrorLive);
}

function UserLiveFeed_loadDataErrorLive() {
    UserLiveFeed_loadingDataTry++;
    if (UserLiveFeed_loadingDataTry < UserLiveFeed_loadingDataTryMax) {
        UserLiveFeed_loadingDataTimeout += 500;
        UserLiveFeed_loadChannelUserLive();
    } else {
        UserLiveFeed_loadingData = false;
        Main_HideElement('dialog_loading_feed');
        if (UserLiveFeed_isFeedShow()) {
            Play_showWarningDialog(STR_REFRESH_PROBLEM);
            window.setTimeout(function() {
                Play_HideWarningDialog();
            }, 2000);
        }
    }
}

function UserLiveFeed_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    //UserLiveFeed_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) UserLiveFeed_dataEnded = true;

    UserLiveFeed_itemsCount += response_items;

    var stream, id, doc = document.getElementById("user_feed_scroll");

    for (var i = 0; i < response_items; i++) {
        stream = response.streams[i];
        id = stream.channel._id;
        if (!UserLiveFeed_idObject[id]) {
            UserLiveFeed_idObject[id] = 1;
            if (UserLiveFeed_LastPos !== null && UserLiveFeed_LastPos === stream.channel.name) Play_FeedPos = i;
            doc.appendChild(UserLiveFeed_CreatFeed(i,
                [stream.channel.name, id], UserLiveFeed_ids,
                [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                    Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                    stream.channel.status, stream.game,
                    STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' +
                    STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                    Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.broadcaster_language)
                ]));
        }
    }

    UserLiveFeed_loadDataSuccessFinish();
}

function UserLiveFeed_loadDataSuccessFinish() {
    UserLiveFeed_loadingData = false;
    UserLiveFeed_status = true;
    UserLiveFeed_imgVectorLoad(IMG_404_VIDEO);
    Main_ready(function() {
        Main_HideElement('dialog_loading_feed');
        UserLiveFeed_FeedAddFocus();
    });
}

function UserLiveFeed_CreatFeed(id, data, idArray, valuesArray) {
    UserLiveFeed_imgVectorPush(idArray[1] + id, valuesArray[0]);

    Main_td = document.createElement('div');
    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify(data));
    Main_td.className = 'user_feed_thumb';
    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_clip" >' +
        '<div><img id="' + idArray[1] + id + '" class="stream_img"></div>' +
        '<div id="' + idArray[2] + id + '" class="stream_text2">' +
        '<div id="' + idArray[3] + id + '" class="stream_channel" style="width: 66%; display: inline-block;">' + valuesArray[1] + '</div>' +
        '<div id="' + idArray[5] + id + '"class="stream_info">' + STR_PLAYING + valuesArray[3] + '</div>' + '</div></div>';

    return Main_td;
}

function UserLiveFeed_isFeedShow() {
    return Main_isElementShowing('user_feed');
}

function UserLiveFeed_ShowFeed() {
    var hasuser = AddUser_UserIsSet();

    if (hasuser) {
        if (Play_FeedOldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) UserLiveFeed_status = false;
        Play_FeedOldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
    }

    if (!hasuser || !UserLiveFeed_ThumbNull(0, UserLiveFeed_ids[0])) UserLiveFeed_status = false;

    if (!UserLiveFeed_status && !UserLiveFeed_loadingData) UserLiveFeed_StartLoad();

    if (hasuser) {
        document.getElementById('user_feed').style.bottom = '0.1%';
        Main_ShowElement('user_feed');
        UserLiveFeed_FeedAddFocus();
    }
}

function UserLiveFeed_Hide() {
    Main_HideElement('user_feed');
}

function UserLiveFeed_ResetFeedId() {
    UserLiveFeed_clearHideFeed();
    UserLiveFeed_setHideFeed();
}

function UserLiveFeed_clearHideFeed() {
    window.clearTimeout(UserLiveFeed_Feedid);
}

function UserLiveFeed_setHideFeed() {
    if (UserLiveFeed_isFeedShow()) UserLiveFeed_Feedid = window.setTimeout(UserLiveFeed_Hide, 5500);
}

function UserLiveFeed_FeedRefreshFocus() {
    UserLiveFeed_clearHideFeed();
    if (!UserLiveFeed_loadingData) UserLiveFeed_StartLoad();
    else {
        window.setTimeout(function() {
            UserLiveFeed_loadingData = false;
        }, 15000);
    }
}

function UserLiveFeed_FeedAddFocus() {
    UserLiveFeed_ResetFeedId();
    if (UserLiveFeed_ThumbNull(Play_FeedPos, UserLiveFeed_ids[0]))
        Main_AddClass(UserLiveFeed_ids[0] + Play_FeedPos, 'feed_thumbnail_focused');
    else return;

    if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedSetPos();
    else if (Main_isElementShowing('scene2')) UserLiveFeed_FeedFindPos();
}

function UserLiveFeed_FeedGetPos() {
    var position = 0;

    if (Play_FeedPos < 3) position = 2.5;
    else if (UserLiveFeed_ThumbNull((Play_FeedPos + 2), UserLiveFeed_ids[0]))
        position = (document.getElementById(UserLiveFeed_ids[8] + (Play_FeedPos - 2)).offsetLeft * -1);
    else if (UserLiveFeed_ThumbNull((Play_FeedPos + 1), UserLiveFeed_ids[0]))
        position = (document.getElementById(UserLiveFeed_ids[8] + (Play_FeedPos - 3)).offsetLeft * -1);
    else position = (document.getElementById(UserLiveFeed_ids[8] + (Play_FeedPos - (Play_FeedPos > 3 ? 4 : 3))).offsetLeft * -1);

    return position;
}

function UserLiveFeed_FeedSetPos() {
    var position = UserLiveFeed_FeedGetPos();

    if (position) document.getElementById('user_feed_scroll').style.left = position + "px";
}

function UserLiveFeed_FeedFindPos() {
    //show the element outside of the screen and find the position
    document.getElementById('user_feed').style.bottom = '-1000%';
    Main_ShowElement('user_feed');

    var position = UserLiveFeed_FeedSetPos();

    if (position) document.getElementById('user_feed_scroll').style.left = position + "px";
    document.getElementById('user_feed').style.bottom = '0.1%';
    Main_HideElement('user_feed');
}

function UserLiveFeed_ThumbNull(y, thumbnail) {
    return document.getElementById(thumbnail + y) !== null;
}

function UserLiveFeed_FeedRemoveFocus() {
    if (UserLiveFeed_ThumbNull(Play_FeedPos, UserLiveFeed_ids[0]))
        Main_RemoveClass(UserLiveFeed_ids[0] + Play_FeedPos, 'feed_thumbnail_focused');
}window.parseIRC = function(data) {
    var message = {
        raw: data,
        tags: {},
        prefix: null,
        command: null,
        params: []
    };

    // position and nextspace are used by the parser as a reference.
    var position = 0;
    var nextspace = 0;

    // The first thing we check for is IRCv3.2 message tags.
    // http://ircv3.atheme.org/specification/message-tags-3.2

    if (data.charCodeAt(0) === 64) {
        nextspace = data.indexOf(' ');

        if (nextspace === -1) {
            // Malformed IRC message.
            return null;
        }

        // Tags are split by a semi colon.
        var rawTags = data.slice(1, nextspace).split(';');

        for (var i = 0; i < rawTags.length; i++) {
            // Tags delimited by an equals sign are key=value tags.
            // If there's no equals, we assign the tag a value of true.
            var tag = rawTags[i];
            var pair = tag.split('=');
            message.tags[pair[0]] = pair[1] || true;
        }

        position = nextspace + 1;
    }

    // Skip any trailing whitespace.
    while (data.charCodeAt(position) === 32) {
        position++;
    }

    // Extract the message's prefix if present. Prefixes are prepended
    // with a colon.

    if (data.charCodeAt(position) === 58) {
        nextspace = data.indexOf(' ', position);

        // If there's nothing after the prefix, deem this message to be
        // malformed.
        if (nextspace === -1) {
            // Malformed IRC message.
            return null;
        }

        message.prefix = data.slice(position + 1, nextspace);
        position = nextspace + 1;

        // Skip any trailing whitespace.
        while (data.charCodeAt(position) === 32) {
            position++;
        }
    }

    nextspace = data.indexOf(' ', position);

    // If there's no more whitespace left, extract everything from the
    // current position to the end of the string as the command.
    if (nextspace === -1) {
        if (data.length > position) {
            message.command = data.slice(position);
            return message;
        }

        return null;
    }

    // Else, the command is the current position up to the next space. After
    // that, we expect some parameters.
    message.command = data.slice(position, nextspace);

    position = nextspace + 1;

    // Skip any trailing whitespace.
    while (data.charCodeAt(position) === 32) {
        position++;
    }

    while (position < data.length) {
        nextspace = data.indexOf(' ', position);

        // If the character is a colon, we've got a trailing parameter.
        // At this point, there are no extra params, so we push everything
        // from after the colon to the end of the string, to the params array
        // and break out of the loop.
        if (data.charCodeAt(position) === 58) {
            message.params.push(data.slice(position + 1));
            break;
        }

        // If we still have some whitespace...
        if (nextspace !== -1) {
            // Push whatever's between the current position and the next
            // space to the params array.
            message.params.push(data.slice(position, nextspace));
            position = nextspace + 1;

            // Skip any trailing whitespace and continue looping.
            while (data.charCodeAt(position) === 32) {
                position++;
            }

            continue;
        }

        // If we don't have any more whitespace and the param isn't trailing,
        // push everything remaining to the params array.
        if (nextspace === -1) {
            message.params.push(data.slice(position));
            break;
        }
    }
    return message;
};//Variable initialization
var UserHost_cursorY = 0;
var UserHost_cursorX = 0;
var UserHost_dataEnded = false;
var UserHost_itemsCount = 0;
var UserHost_idObject = {};
var UserHost_emptyCellVector = [];
var UserHost_loadingData = false;
var UserHost_loadingDataTry = 0;
var UserHost_loadingDataTryMax = 5;
var UserHost_loadingDataTimeout = 3500;
var UserHost_itemsCountOffset = 0;
var UserHost_MaxOffset = 0;
var UserHost_emptyContent = false;

var UserHost_ids = ['uh_thumbdiv', 'uh_img', 'uh_infodiv', 'uh_displayname', 'uh_hosttitle', 'uh_hostgame', 'uh_viwers', 'uh_quality', 'uh_cell', 'uhempty_', 'user_host_scroll'];
var UserHost_status = false;
var UserHost_OldUserName = '';
var UserHost_itemsCountCheck = false;
//Variable initialization end

function UserHost_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_UserHost;
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + STR_LIVE_HOSTS));
    document.body.addEventListener("keydown", UserHost_handleKeyDown, false);
    if (UserHost_OldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) UserHost_status = false;
    if (UserHost_status) {
        Main_YRst(UserHost_cursorY);
        Main_ShowElement(UserHost_ids[10]);
        UserHost_addFocus();
        Main_SaveValues();
    } else UserHost_StartLoad();
}

function UserHost_exit() {
    Main_values.Users_Position = 0;
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    document.body.removeEventListener("keydown", UserHost_handleKeyDown);
    Main_textContent('top_bar_user', STR_USER);
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
    Main_HideElement(UserHost_ids[10]);
}

function UserHost_StartLoad() {
    Main_empty('stream_table_user_host');
    Main_HideElement(UserHost_ids[10]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    UserHost_OldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
    UserHost_status = false;
    UserHost_itemsCountOffset = 0;
    UserHost_MaxOffset = 0;
    UserHost_idObject = {};
    UserHost_emptyCellVector = [];
    UserHost_itemsCountCheck = false;
    UserHost_itemsCount = 0;
    Main_FirstLoad = true;
    UserHost_cursorX = 0;
    UserHost_cursorY = 0;
    UserHost_dataEnded = false;
    Main_CounterDialogRst();
    UserHost_loadDataPrepare();
    UserHost_loadChannels();
}

function UserHost_loadDataPrepare() {
    Main_imgVectorRst();
    UserHost_loadingData = true;
    UserHost_loadingDataTry = 0;
    UserHost_loadingDataTimeout = 3500;
}

function UserHost_loadChannels() {

    var offset = UserHost_itemsCount + UserHost_itemsCountOffset;
    if (offset && offset > (UserHost_MaxOffset - 1)) {
        offset = UserHost_MaxOffset - Main_ItemsLimitVideo;
        UserHost_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].name) +
        '/followed/hosting?limit=' + Main_ItemsLimitVideo + '&offset=' + offset;

    BasehttpGet(theUrl, UserHost_loadingDataTimeout, 2, null, UserHost_loadDataSuccess, UserHost_loadDataError);
}

function UserHost_loadDataError() {
    UserHost_loadingDataTry++;
    if (UserHost_loadingDataTry < UserHost_loadingDataTryMax) {
        UserHost_loadingDataTimeout += 500;
        UserHost_loadChannels();
    } else {
        UserHost_loadingData = false;
        if (!UserHost_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            UserHost_dataEnded = true;
            UserHost_loadDataSuccessFinish();
        }
    }
}

function UserHost_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.hosts.length;
    UserHost_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) UserHost_dataEnded = true;

    var offset_itemsCount = UserHost_itemsCount;
    UserHost_itemsCount += response_items;

    UserHost_emptyContent = !UserHost_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, hosts, id,
        cursor = 0,
        doc = document.getElementById("stream_table_user_host");

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            hosts = response.hosts[cursor];
            id = hosts.target._id + '' + hosts._id; //combined id host and hosted
            if (UserHost_idObject[id]) coloumn_id--;
            else {
                UserHost_idObject[id] = 1;
                row.appendChild(Main_createCellVideo(row_id, row_id + '_' + coloumn_id,
                    [hosts.target.channel.name, hosts.target._id], UserHost_ids,
                    [hosts.target.preview_urls.template.replace("{width}x{height}", Main_VideoSize),
                        hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name,
                        hosts.target.title, hosts.target.meta_game,
                        STR_FOR.charAt(1).toUpperCase() + STR_FOR.slice(2) +
                        Main_addCommas(hosts.target.viewers) + STR_VIEWER, ''
                    ]));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (UserHost_dataEnded && !UserHost_itemsCountCheck) {
                UserHost_itemsCountCheck = true;
                UserHost_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(UserHost_ids[9] + row_id + '_' + coloumn_id));
            UserHost_emptyCellVector.push(UserHost_ids[9] + row_id + '_' + coloumn_id);
        }
        doc.appendChild(row);
    }
    UserHost_loadDataSuccessFinish();
}

function UserHost_loadDataSuccessFinish() {
    if (!UserHost_status) {
        if (UserHost_emptyContent) Main_showWarningDialog(STR_NO + STR_LIVE_HOSTS);
        else {
            UserHost_status = true;
            UserHost_addFocus();
            Main_imgVectorLoad(IMG_404_VIDEO);
            Main_SaveValues();
        }
        Main_ShowElement(UserHost_ids[10]);
        Main_FirstLoad = false;
        Main_HideLoadDialog();
    } else {
        Main_imgVectorLoad(IMG_404_VIDEO);
        if (UserHost_emptyCellVector.length > 0 && !UserHost_dataEnded) {
            UserHost_loadDataPrepare();
            UserHost_loadDataReplace();
            return;
        } else {
            Main_CounterDialog(UserHost_cursorX, UserHost_cursorY, Main_ColoumnsCountVideo, UserHost_itemsCount);
            UserHost_emptyCellVector = [];
        }
    }
    UserHost_loadingData = false;
}

function UserHost_loadDataReplace() {
    Main_SetItemsLimitReplace(UserHost_emptyCellVector.length);

    var offset = UserHost_itemsCount + UserHost_itemsCountOffset;
    if (offset && offset > (UserHost_MaxOffset - 1)) {
        offset = UserHost_MaxOffset - Main_ItemsLimitReplace;
        UserHost_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].name) +
        '/followed/hosting?limit=' + Main_ItemsLimitReplace + '&offset=' + offset;

    BasehttpGet(theUrl, UserHost_loadingDataTimeout, 2, null, UserHost_loadDataSuccessReplace, UserHost_loadDataReplaceError);
}

function UserHost_loadDataReplaceError() {
    UserHost_loadingDataTry++;
    if (UserHost_loadingDataTry < UserHost_loadingDataTryMax) {
        UserHost_loadingDataTimeout += 500;
        UserHost_loadDataReplace();
    } else {
        UserHost_dataEnded = true;
        UserHost_itemsCount -= UserHost_emptyCellVector.length;
        UserHost_emptyCellVector = [];
        UserHost_loadDataSuccessFinish();
    }
}

function UserHost_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.streams.length,
        hosts, id, i = 0,
        cursor = 0,
        tempVector = [];

    UserHost_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitReplace) UserHost_dataEnded = true;

    for (i; i < UserHost_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        hosts = response.hosts[cursor];
        id = hosts.target._id + '' + hosts._id;
        if (UserHost_idObject[id]) i--;
        else {
            UserHost_idObject[id] = 1;
            Main_replaceVideo(UserHost_emptyCellVector[i], [hosts.target.channel.name, hosts.target._id],
                [hosts.target.preview_urls.template.replace("{width}x{height}", Main_VideoSize),
                    hosts.display_name + STR_USER_HOSTING + hosts.target.channel.display_name,
                    hosts.target.title, hosts.target.meta_game,
                    STR_FOR.charAt(1).toUpperCase() + STR_FOR.slice(2) +
                    Main_addCommas(hosts.target.viewers) + STR_VIEWER, ''
                ], UserHost_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) UserHost_emptyCellVector.splice(tempVector[i], 1);

    UserHost_itemsCountOffset += cursor;
    if (UserHost_dataEnded) {
        UserHost_itemsCount -= UserHost_emptyCellVector.length;
        UserHost_emptyCellVector = [];
    }

    UserHost_loadDataSuccessFinish();
}

function UserHost_addFocus() {
    Main_addFocusVideo(UserHost_cursorY, UserHost_cursorX, UserHost_ids, Main_ColoumnsCountVideo, UserHost_itemsCount);

    if (((UserHost_cursorY + Main_ItemsReloadLimitVideo) > (UserHost_itemsCount / Main_ColoumnsCountVideo)) &&
        !UserHost_dataEnded && !UserHost_loadingData) {
        UserHost_loadDataPrepare();
        UserHost_loadChannels();
    }
    if (Main_CenterLablesInUse) UserHost_removeFocus();
}

function UserHost_removeFocus() {
    if (UserHost_itemsCount) Main_removeFocus(UserHost_cursorY + '_' + UserHost_cursorX, UserHost_ids);
}

function UserHost_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                UserHost_removeFocus();
                Main_CenterLablesStart(UserHost_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((UserHost_cursorY), (UserHost_cursorX - 1), UserHost_ids[0])) {
                UserHost_removeFocus();
                UserHost_cursorX--;
                UserHost_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((UserHost_cursorY - 1), i, UserHost_ids[0])) {
                        UserHost_removeFocus();
                        UserHost_cursorY--;
                        UserHost_cursorX = i;
                        UserHost_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((UserHost_cursorY), (UserHost_cursorX + 1), UserHost_ids[0])) {
                UserHost_removeFocus();
                UserHost_cursorX++;
                UserHost_addFocus();
            } else if (Main_ThumbNull((UserHost_cursorY + 1), 0, UserHost_ids[0])) {
                UserHost_removeFocus();
                UserHost_cursorY++;
                UserHost_cursorX = 0;
                UserHost_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((UserHost_cursorY - 1), (UserHost_cursorX - i), UserHost_ids[0])) {
                    UserHost_removeFocus();
                    UserHost_cursorY--;
                    UserHost_cursorX = UserHost_cursorX - i;
                    UserHost_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((UserHost_cursorY + 1), (UserHost_cursorX - i), UserHost_ids[0])) {
                    UserHost_removeFocus();
                    UserHost_cursorY++;
                    UserHost_cursorX = UserHost_cursorX - i;
                    UserHost_addFocus();
                    break;
                }
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_OpenLiveStream(UserHost_cursorY + '_' + UserHost_cursorX, UserHost_ids, UserHost_handleKeyDown);
            break;
        default:
            break;
    }
}//Variable initialization
var Vod_cursorY = 0;
var Vod_cursorX = 0;
var Vod_dataEnded = false;
var Vod_itemsCount = 0;
var Vod_idObject = {};
var Vod_emptyCellVector = [];
var Vod_loadingData = false;
var Vod_loadingDataTry = 0;
var Vod_loadingDataTryMax = 5;
var Vod_loadingDataTimeout = 3500;
var Vod_itemsCountOffset = 0;
var Vod_MaxOffset = 0;
var Vod_emptyContent = false;
var Vod_itemsCountCheck = false;
var Vod_period = 'week';
var Vod_periodNumber = 2;
var Vod_TopRowCreated = false;

var Vod_ids = ['v_thumbdiv', 'v_img', 'v_infodiv', 'v_title', 'v_streamon', 'v_duration', 'v_viwers', 'v_quality', 'v_cell', 'vempty_', 'vod_scroll', 'v_game'];
var Vod_status = false;
var Vod_highlight = false;
var Vod_AnimateThumbId;
var Vod_DoAnimateThumb = 1;
var Vod_newImg = new Image();
//Variable initialization end

function Vod_init() {
    Main_values.Main_CenterLablesVectorPos = 4;
    Main_values.Main_Go = Main_Vod;
    Main_AddClass('top_bar_vod', 'icon_center_focus');
    document.body.addEventListener("keydown", Vod_handleKeyDown, false);

    if (Vod_status) {
        Main_YRst(Vod_cursorY);
        Main_ShowElement(Vod_ids[10]);
        Vod_SetPeriod();
        Vod_addFocus();
        Main_SaveValues();
    } else Vod_StartLoad();
}

function Vod_exit() {
    if (Vod_status) Vod_removeFocus();
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", Vod_handleKeyDown);
    Main_RemoveClass('top_bar_vod', 'icon_center_focus');
    Main_textContent('top_bar_vod', STR_VIDEOS);
    Main_HideElement(Vod_ids[10]);
}

function Vod_StartLoad() {
    if (Vod_status) Vod_removeFocus();
    Main_empty('stream_table_vod');
    Main_HideElement(Vod_ids[10]);
    Main_showLoadDialog();
    Vod_SetPeriod();
    Main_HideWarningDialog();
    Vod_status = false;
    Vod_itemsCountOffset = 0;
    Vod_TopRowCreated = false;
    Vod_MaxOffset = 0;
    Vod_idObject = {};
    Vod_emptyCellVector = [];
    Vod_itemsCountCheck = false;
    Main_FirstLoad = true;
    Vod_itemsCount = 0;
    Vod_cursorX = 0;
    Vod_cursorY = 0;
    Vod_dataEnded = false;
    Main_CounterDialogRst();
    Vod_loadDataPrepare();
    Vod_loadDataRequest();
}

function Vod_loadDataPrepare() {
    Main_imgVectorRst();
    Vod_loadingData = true;
    Vod_loadingDataTry = 0;
    Vod_loadingDataTimeout = 3500;
}

function Vod_loadDataRequest() {

    var offset = Vod_itemsCount + Vod_itemsCountOffset;
    if (offset && offset > (Vod_MaxOffset - 1)) {
        offset = Vod_MaxOffset - Main_ItemsLimitVideo;
        Vod_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/videos/top?limit=' + Main_ItemsLimitVideo +
        '&broadcast_type=' + (Vod_highlight ? 'highlight' : 'archive') + '&sort=views&offset=' + offset +
        '&period=' + Vod_period +
        (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');

    BasehttpGet(theUrl, Vod_loadingDataTimeout, 2, null, Vod_loadDataSuccess, Vod_loadDataError);
}

function Vod_loadDataError() {
    Vod_loadingDataTry++;
    if (Vod_loadingDataTry < Vod_loadingDataTryMax) {
        Vod_loadingDataTimeout += 500;
        Vod_loadDataRequest();
    } else {
        Vod_loadingData = false;
        if (!Vod_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            Vod_dataEnded = true;
            Vod_loadDataSuccessFinish();
        }
    }
}

function Vod_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.vods.length;
    Vod_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) Vod_dataEnded = true;

    var offset_itemsCount = Vod_itemsCount;
    Vod_itemsCount += response_items;

    Vod_emptyContent = !Vod_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, video, id,
        cursor = 0,
        doc = document.getElementById("stream_table_vod");

    // Make the game video/clip/fallowing cell
    if (!Vod_TopRowCreated) {
        Vod_TopRowCreated = true;
        row = document.createElement('tr');
        var thumbfallow;
        for (i = 0; i < 2; i++) {
            if (!i) thumbfallow = '<i class="icon-movie-play stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_SWITCH_VOD;
            else thumbfallow = '<i class="icon-history stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_SWITCH_CLIP;
            Main_td = document.createElement('td');
            Main_td.setAttribute('id', Vod_ids[8] + 'y_' + i);
            Main_td.className = 'stream_cell';
            Main_td.innerHTML = '<div id="' + Vod_ids[0] +
                'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + Vod_ids[3] +
                'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
            row.appendChild(Main_td);
        }
        doc.appendChild(row);
    }

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            video = response.vods[cursor];
            id = video._id;
            //video content can be null sometimes the preview will 404
            if ((video.preview.template + '').indexOf('404_processing') !== -1 || Vod_idObject[id]) coloumn_id--;
            else {
                Vod_idObject[id] = 1;
                row.appendChild(Vod_createCell(row_id, row_id + '_' + coloumn_id,
                    [id, video.length, video.channel.broadcaster_language, video.game, video.channel.name, video.increment_view_count_url],
                    [video.preview.template.replace("{width}x{height}", Main_VideoSize),
                        video.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                        twemoji.parse(video.title) + STR_BR + STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) + STR_VIEWS,
                        Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.channel.broadcaster_language),
                        STR_DURATION + Play_timeS(video.length), video.animated_preview_url
                    ], Vod_ids));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (Vod_dataEnded && !Vod_itemsCountCheck) {
                Vod_itemsCountCheck = true;
                Vod_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(Vod_ids[9] + row_id + '_' + coloumn_id));
            Vod_emptyCellVector.push(Vod_ids[9] + row_id + '_' + coloumn_id);
        }
        doc.appendChild(row);
    }

    Vod_loadDataSuccessFinish();
}

function Vod_createCell(row_id, id, vod_data, valuesArray, idArray) {
    if (row_id < Main_ColoumnsCountVideo) Main_CacheImage(valuesArray[0]); //try to pre cache first 3 rows
    return Vod_createCellVideo(vod_data, id, valuesArray, idArray);
}

function Vod_createCellVideo(vod_data, id, valuesArray, idArray) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify(vod_data));
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = Vod_VideoHtml(id, valuesArray, idArray);

    return Main_td;
}

function Vod_replaceVideo(id, vod_data, valuesArray, idArray) {
    var ele = document.getElementById(id);
    var splitedId = id.split(idArray[9])[1];
    ele.setAttribute(Main_DataAttribute, JSON.stringify(vod_data));
    ele.innerHTML = Vod_VideoHtml(splitedId, valuesArray, idArray);
    ele.setAttribute('id', idArray[8] + splitedId);
}

function Vod_VideoHtml(id, valuesArray, idArray) {
    Main_imgVectorPush(idArray[1] + id, valuesArray[0]);

    return '<div id="' + idArray[0] + id + '" class="stream_thumbnail_clip"' +
        (valuesArray[7] ? ' style="background-size: 0 0; background-image: url(' + valuesArray[7] + ');"' : '') +
        '><div><img id="' +
        idArray[1] + id + '" class="stream_img"></div><div id="' +
        idArray[2] + id + '" class="stream_text2"><div style="line-height: 14px;"><div id="' +
        idArray[3] + id + '" class="stream_info" style="width: 72%; display: inline-block; font-size: 85%;">' +
        valuesArray[1] + '</div><div id="' + idArray[7] + id +
        '"class="stream_info" style="width:27%; float: right; text-align: right; display: inline-block;">' + valuesArray[5] +
        '</div></div><div style="line-height: 12px;"><div id="' + idArray[4] + id + '"class="stream_info" style="width: 59%; display: inline-block;">' +
        valuesArray[2] + '</div><div id="' + idArray[5] + id +
        '"class="stream_info" style="width: 39%; display: inline-block; float: right; text-align: right;">' +
        valuesArray[6] + '</div></div><div id="' + idArray[11] + id + '"class="stream_info">' +
        valuesArray[3] + '</div><div id="' + idArray[6] + id +
        '"class="stream_info">' + valuesArray[4] + '</div></div></div>';
}

function Vod_loadDataSuccessFinish() {
    if (!Vod_status) {
        if (Vod_emptyContent) Main_showWarningDialog(STR_NO + (Vod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_FOR_THIS + STR_CHANNEL);
        else {
            Vod_status = true;
            Vod_addFocus();
            Main_imgVectorLoad(IMG_404_VIDEO);
            Main_SaveValues();
        }
        Main_ShowElement(Vod_ids[10]);
        Main_FirstLoad = false;
        Main_HideLoadDialog();
    } else {
        Main_imgVectorLoad(IMG_404_VIDEO);
        Main_CounterDialog(Vod_cursorX, Vod_cursorY, Main_ColoumnsCountVideo, Vod_itemsCount);
    }

    if (Vod_emptyCellVector.length > 0 && !Vod_dataEnded) {
        Vod_loadDataPrepare();
        Vod_loadDataReplace();
        return;
    } else Vod_emptyCellVector = [];

    Vod_loadingData = false;
}

function Vod_loadDataReplace() {

    Main_SetItemsLimitReplace(Vod_emptyCellVector.length);

    var offset = Vod_itemsCount + Vod_itemsCountOffset;
    if (offset && offset > (Vod_MaxOffset - 1)) {
        offset = Vod_MaxOffset - Main_ItemsLimitReplace;
        Vod_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/videos/top?limit=' + Main_ItemsLimitReplace +
        '&broadcast_type=' + (Vod_highlight ? 'highlight' : 'archive') + '&sort=views&offset=' + offset +
        '&period=' + Vod_period +
        (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');

    BasehttpGet(theUrl, Vod_loadingDataTimeout, 2, null, Vod_loadDataSuccessReplace, Vod_loadDataErrorReplace);
}

function Vod_loadDataErrorReplace() {
    Vod_loadingDataTry++;
    if (Vod_loadingDataTry < Vod_loadingDataTryMax) {
        Vod_loadingDataTimeout += 500;
        Vod_loadDataReplace();
    } else {
        Vod_dataEnded = true;
        Vod_itemsCount -= Vod_emptyCellVector.length;
        Vod_emptyCellVector = [];
        Vod_loadDataSuccessFinish();
    }
}


function Vod_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.vods.length,
        video, id, i = 0,
        cursor = 0,
        tempVector = [];

    Vod_MaxOffset = parseInt(response._total);

    for (i; i < Vod_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        video = response.vods[cursor];
        id = video._id;
        if ((video.preview.template + '').indexOf('404_processing') !== -1 || Vod_idObject[id]) i--;
        else {
            Vod_idObject[id] = 1;
            Vod_replaceVideo(Vod_emptyCellVector[i],
                [id, video.length, video.channel.broadcaster_language, video.game, video.channel.name, video.increment_view_count_url],
                [video.preview.template.replace("{width}x{height}", Main_VideoSize),
                    video.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(video.created_at),
                    twemoji.parse(video.title) + STR_BR + STR_STARTED + STR_PLAYING + video.game, Main_addCommas(video.views) +
                    STR_VIEWS,
                    Main_videoqualitylang(video.resolutions.chunked.slice(-4), (parseInt(video.fps.chunked) || 0), video.channel.broadcaster_language),
                    STR_DURATION + Play_timeS(video.length), video.animated_preview_url
                ], Vod_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) Vod_emptyCellVector.splice(tempVector[i], 1);

    Vod_itemsCountOffset += cursor;
    if (Vod_dataEnded) {
        Vod_itemsCount -= Vod_emptyCellVector.length;
        Vod_emptyCellVector = [];
    }

    Vod_loadDataSuccessFinish();
}

function Vod_addFocus() {
    if (Vod_cursorY < 0) {
        Vod_addFocusFallow();
        return;
    }
    Main_addFocusVideo(Vod_cursorY, Vod_cursorX, Vod_ids, Main_ColoumnsCountVideo, Vod_itemsCount);
    Vod_AnimateThumb(Vod_ids, Vod_cursorY + '_' + Vod_cursorX);
    if (((Vod_cursorY + Main_ItemsReloadLimitVideo) > (Vod_itemsCount / Main_ColoumnsCountVideo)) &&
        !Vod_dataEnded && !Vod_loadingData) {
        Vod_loadDataPrepare();
        Vod_loadDataRequest();
    }
    if (Main_CenterLablesInUse) Vod_removeFocus();
}

function Vod_removeFocus() {
    window.clearInterval(Vod_AnimateThumbId);
    if (Vod_cursorY > -1 && Vod_itemsCount) {
        Main_ShowElement(Vod_ids[1] + Vod_cursorY + '_' + Vod_cursorX);
        Main_removeFocus(Vod_cursorY + '_' + Vod_cursorX, Vod_ids);
    } else Vod_removeFocusFallow();
}

function Vod_addFocusFallow() {
    var i = Vod_cursorX > 1 ? 1 : Vod_cursorX;
    Main_AddClass(Vod_ids[0] + 'y_' + i, Main_classThumb);
}

function Vod_removeFocusFallow() {
    var i = Vod_cursorX > 1 ? 1 : Vod_cursorX;
    Main_RemoveClass(Vod_ids[0] + 'y_' + i, Main_classThumb);
}

function Vod_AnimateThumb(idArray, id) {
    if (!Vod_DoAnimateThumb) return;
    var div = document.getElementById(idArray[0] + id);

    // Only load the animation if it can be loaded
    // This prevent starting animating before it has loaded or animated a empty image
    Vod_newImg.onload = function() {
        Main_HideElement(idArray[1] + id);
        // background-size: 612px from  div.offsetWidth
        div.style.backgroundSize = "612px";
        var frame = 0;
        Vod_AnimateThumbId = window.setInterval(function() {
            // 10 = quantity of frames in the preview img, 344 img height from the div.offsetHeight
            // But this img real height is 180 thus the quality is affected, higher resolution aren't available
            div.style.backgroundPosition = "0px " + ((++frame % 10) * (-344)) + "px";
        }, 650);
    };

    Vod_newImg.src = div.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
}

function Vod_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                Vod_removeFocus();
                Main_CenterLablesStart(Vod_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (Vod_cursorY === -1) {
                Vod_removeFocusFallow();
                Vod_cursorX--;
                if (Vod_cursorX < 0) Vod_cursorX = 1;
                Vod_addFocusFallow();
            } else if (!Vod_cursorY && !Vod_cursorX) {
                Vod_removeFocus();
                Vod_removeFocusFallow();
                Vod_cursorY = -1;
                Vod_cursorX = 1;
                Vod_addFocusFallow();
            } else if (Main_ThumbNull((Vod_cursorY), (Vod_cursorX - 1), Vod_ids[0])) {
                Vod_removeFocus();
                Vod_cursorX--;
                Vod_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((Vod_cursorY - 1), i, Vod_ids[0])) {
                        Vod_removeFocus();
                        Vod_cursorY--;
                        Vod_cursorX = i;
                        Vod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Vod_cursorY === -1) {
                Vod_removeFocusFallow();
                Vod_cursorX++;
                if (Vod_cursorX > 1) {
                    Vod_cursorX = 0;
                    if (!Vod_emptyContent) {
                        Vod_cursorY = 0;
                        Vod_addFocus();
                    } else Vod_addFocusFallow();
                } else Vod_addFocusFallow();
            } else if (Main_ThumbNull((Vod_cursorY), (Vod_cursorX + 1), Vod_ids[0])) {
                Vod_removeFocus();
                Vod_cursorX++;
                Vod_addFocus();
            } else if (Main_ThumbNull((Vod_cursorY + 1), 0, Vod_ids[0])) {
                Vod_removeFocus();
                Vod_cursorY++;
                Vod_cursorX = 0;
                Vod_addFocus();
            }
            break;
        case KEY_UP:
            if (Vod_cursorY === -1 && !Vod_emptyContent) {
                Vod_cursorY = 0;
                Vod_removeFocusFallow();
                Vod_addFocus();
            } else if (!Vod_cursorY) {
                Vod_removeFocus();
                Vod_cursorY = -1;
                Vod_addFocusFallow();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((Vod_cursorY - 1), (Vod_cursorX - i), Vod_ids[0])) {
                        Vod_removeFocus();
                        Vod_cursorY--;
                        Vod_cursorX = Vod_cursorX - i;
                        Vod_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_DOWN:
            if (Vod_cursorY === -1 && !Vod_emptyContent) {
                Vod_cursorY = 0;
                Vod_removeFocusFallow();
                Vod_addFocus();
            } else {
                for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                    if (Main_ThumbNull((Vod_cursorY + 1), (Vod_cursorX - i), Vod_ids[0])) {
                        Vod_removeFocus();
                        Vod_cursorY++;
                        Vod_cursorX = Vod_cursorX - i;
                        Vod_addFocus();
                        break;
                    }
                }

            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (Vod_cursorY === -1) {
                if (Vod_cursorX === 0) {
                    Vod_highlight = !Vod_highlight;
                    Main_setItem('Vod_highlight', Vod_highlight ? 'true' : 'false');
                    Vod_StartLoad();
                } else {
                    Vod_periodNumber++;
                    if (Vod_periodNumber > 4) Vod_periodNumber = 1;
                    Vod_StartLoad();
                }
            } else Main_OpenVod(Vod_cursorY + '_' + Vod_cursorX, Vod_ids, Vod_handleKeyDown);
            break;
        default:
            break;
    }
}

function Vod_SetPeriod() {
    if (Vod_periodNumber === 1) {
        Main_innerHTML('top_bar_vod', STR_VIDEOS + Main_UnderCenter((Vod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_DAY));
        Vod_period = 'day';
    } else if (Vod_periodNumber === 2) {
        Main_innerHTML('top_bar_vod', STR_VIDEOS + Main_UnderCenter((Vod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_WEEK));
        Vod_period = 'week';
    } else if (Vod_periodNumber === 3) {
        Main_innerHTML('top_bar_vod', STR_VIDEOS + Main_UnderCenter((Vod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_MONTH));
        Vod_period = 'month';
    } else if (Vod_periodNumber === 4) {
        Main_innerHTML('top_bar_vod', STR_VIDEOS + Main_UnderCenter((Vod_highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_CLIP_ALL));
        Vod_period = 'all';
    }
    Main_setItem('vod_periodNumber', Vod_periodNumber);
}// https://github.com/twitter/twemoji

// This is a moded version of twemoji, I only need this from this file, check original in they github
var twemoji = (function(
    /*! Copyright Twitter Inc. and other contributors. Licensed under MIT */
    /*
        https://github.com/twitter/twemoji/blob/gh-pages/LICENSE
      */

    // WARNING:   this file is generated automatically via
    //            `node twemoji-generator.js`
    //            please update its `createTwemoji` function
    //            at the bottom of the same file instead.

) {
    var
        // the exported module object
        twemoji = {

            /**
             * Main method/logic to generate either <img> tags or HTMLImage nodes.
             *  "emojify" a generic text or DOM Element.
             *
             * @overloads
             *
             * String replacement for `innerHTML` or server side operations
             *  twemoji.parse(string);
             *  twemoji.parse(string, Function);
             *  twemoji.parse(string, Object);
             *
             * HTMLElement tree parsing for safer operations over existing DOM
             *  twemoji.parse(HTMLElement);
             *  twemoji.parse(HTMLElement, Function);
             *  twemoji.parse(HTMLElement, Object);
             *
             * @param   string|HTMLElement  the source to parse and enrich with emoji.
             *
             *          string              replace emoji matches with <img> tags.
             *                              Mainly used to inject emoji via `innerHTML`
             *                              It does **not** parse the string or validate it,
             *                              it simply replaces found emoji with a tag.
             *                              NOTE: be sure this won't affect security.
             *
             *          HTMLElement         walk through the DOM tree and find emoji
             *                              that are inside **text node only** (nodeType === 3)
             *                              Mainly used to put emoji in already generated DOM
             *                              without compromising surrounding nodes and
             *                              **avoiding** the usage of `innerHTML`.
             *                              NOTE: Using DOM elements instead of strings should
             *                              improve security without compromising too much
             *                              performance compared with a less safe `innerHTML`.
             *
             * @param   Function|Object  [optional]
             *                              either the callback that will be invoked or an object
             *                              with all properties to use per each found emoji.
             *
             *          Function            if specified, this will be invoked per each emoji
             *                              that has been found through the RegExp except
             *                              those follwed by the invariant \uFE0E ("as text").
             *                              Once invoked, parameters will be:
             *
             *                                iconId:string     the lower case HEX code point
             *                                                  i.e. "1f4a9"
             *
             *                                options:Object    all info for this parsing operation
             *
             *                                variant:char      the optional \uFE0F ("as image")
             *                                                  variant, in case this info
             *                                                  is anyhow meaningful.
             *                                                  By default this is ignored.
             *
             *                              If such callback will return a falsy value instead
             *                              of a valid `src` to use for the image, nothing will
             *                              actually change for that specific emoji.
             *
             *
             *          Object              if specified, an object containing the following properties
             *
             *            callback   Function  the callback to invoke per each found emoji.
             *            base       string    the base url, by default twemoji.base
             *            ext        string    the image extension, by default twemoji.ext
             *            size       string    the assets size, by default twemoji.size
             *
             * @example
             *
             *  twemoji.parse("I \u2764\uFE0F emoji!");
             *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/2764.gif"/> emoji!
             *
             *
             *  twemoji.parse("I \u2764\uFE0F emoji!", function(iconId, options) {
             *    return '/assets/' + iconId + '.gif';
             *  });
             *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/2764.gif"/> emoji!
             *
             *
             * twemoji.parse("I \u2764\uFE0F emoji!", {
             *   size: 72,
             *   callback: function(iconId, options) {
             *     return '/assets/' + options.size + '/' + iconId + options.ext;
             *   }
             * });
             *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/72x72/2764.png"/> emoji!
             *
             */
            parse: parse,

            /**
             * Given a string, invokes the callback argument
             *  per each emoji found in such string.
             * This is the most raw version used by
             *  the .parse(string) method itself.
             *
             * @param   string    generic string to parse
             * @param   Function  a generic callback that will be
             *                    invoked to replace the content.
             *                    This calback wil receive standard
             *                    String.prototype.replace(str, callback)
             *                    arguments such:
             *  callback(
             *    rawText,  // the emoji match
             *  );
             *
             *                    and others commonly received via replace.
             */
            replace: replace
        },

        // RegExp based on emoji's official Unicode standards
        // http://www.unicode.org/Public/UNIDATA/EmojiSources.txt
        re = /(?:\ud83d[\udc68\udc69])(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddb0-\uddb3])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f)|[\u0023\u002a\u0030-\u0039]\ufe0f?\u20e3|(?:[\u00a9\u00ae\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\uddb5\uddb6\uddb8\uddb9\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a-\udc6d\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\udeeb\udeec\udef4-\udef9]|\ud83e[\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd40-\udd45\udd47-\udd70\udd73-\udd76\udd7a\udd7c-\udda2\uddb4\uddb7\uddc0-\uddc2\uddd0\uddde-\uddff]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g,

        // avoid runtime RegExp creation for not so smart,
        // not JIT based, and old browsers / engines
        UFE0Fg = /\uFE0F/g,

        // avoid using a string literal like '\u200D' here because minifiers expand it inline
        U200D = String.fromCharCode(0x200D);

    return twemoji;


    /////////////////////////
    //  private functions  //
    //     declaration     //
    /////////////////////////

    /**
     * Used to both remove the possible variant
     *  and to convert utf16 into code points.
     *  If there is a zero-width-joiner (U+200D), leave the variants in.
     * @param   string    the raw text of the emoji match
     * @return  string    the code point
     */
    function grabTheRightIcon(rawText) {
        var unicodeSurrogates = rawText.indexOf(U200D) < 0 ? rawText.replace(UFE0Fg, '') : rawText,
            r = [],
            c = 0,
            p = 0,
            i = 0;
        while (i < unicodeSurrogates.length) {
            c = unicodeSurrogates.charCodeAt(i++);
            if (p) {
                r.push((0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00)).toString(16));
                p = 0;
            } else if (0xD800 <= c && c <= 0xDBFF) {
                p = c;
            } else {
                r.push(c.toString(16));
            }
        }
        return r.join('-');
    }

    function parse(str, dontremove, emoticon) {
        //Twitch title may contain < or > with causes html problems
        if (!dontremove) str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return replace(str, function(rawText) {
            var iconId = grabTheRightIcon(rawText);

            return iconId ? '<img class="' + (emoticon ? 'emojichat' : 'emoji') + '" src="https://twemoji.maxcdn.com/2/72x72/' + iconId + '.png"/>' : rawText;
        });
    }

    function replace(text, callback) {
        return String(text).replace(re, callback);
    }

}());//Variable initialization
var SearchLive_cursorY = 0;
var SearchLive_cursorX = 0;
var SearchLive_dataEnded = false;
var SearchLive_itemsCount = 0;
var SearchLive_idObject = {};
var SearchLive_emptyCellVector = [];
var SearchLive_loadingData = false;
var SearchLive_loadingDataTry = 0;
var SearchLive_loadingDataTryMax = 5;
var SearchLive_loadingDataTimeout = 3500;
var SearchLive_itemsCountOffset = 0;
var SearchLive_MaxOffset = 0;
var SearchLive_emptyContent = false;
var SearchLive_Status = false;
var SearchLive_itemsCountCheck = false;
var SearchLive_lastData = '';

var SearchLive_ids = ['sl_thumbdiv', 'sl_img', 'sl_infodiv', 'sl_displayname', 'sl_streamtitle', 'sl_streamgame', 'sl_viwers', 'sl_quality', 'sl_cell', 'slempty_', 'search_live_scroll'];
//Variable initialization end

function SearchLive_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_SearchLive;
    Main_values.Search_isSearching = true;
    Main_cleanTopLabel();
    if (SearchLive_lastData !== Main_values.Search_data) SearchLive_Status = false;
    Main_innerHTML('top_bar_user', STR_SEARCH + Main_UnderCenter(STR_LIVE + ' ' + "'" + Main_values.Search_data + "'"));
    document.body.addEventListener("keydown", SearchLive_handleKeyDown, false);
    if (SearchLive_Status) {
        Main_YRst(SearchLive_cursorY);
        Main_ShowElement(SearchLive_ids[10]);
        SearchLive_addFocus();
        Main_SaveValues();
    } else SearchLive_StartLoad();
}

function SearchLive_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", SearchLive_handleKeyDown);
    Main_HideElement(SearchLive_ids[10]);
}

function SearchLive_StartLoad() {
    Main_empty('stream_table_search_live');
    Main_HideElement(SearchLive_ids[10]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    SearchLive_lastData = Main_values.Search_data;
    SearchLive_Status = false;
    SearchLive_itemsCountOffset = 0;
    SearchLive_MaxOffset = 0;
    SearchLive_idObject = {};
    SearchLive_emptyCellVector = [];
    SearchLive_itemsCountCheck = false;
    Main_FirstLoad = true;
    SearchLive_itemsCount = 0;
    SearchLive_cursorX = 0;
    SearchLive_cursorY = 0;
    SearchLive_dataEnded = false;
    Main_CounterDialogRst();
    SearchLive_loadDataPrepare();
    SearchLive_loadDataRequest();
}

function SearchLive_loadDataPrepare() {
    Main_imgVectorRst();
    SearchLive_loadingData = true;
    SearchLive_loadingDataTry = 0;
    SearchLive_loadingDataTimeout = 3500;
}

function SearchLive_loadDataRequest() {

    var offset = SearchLive_itemsCount + SearchLive_itemsCountOffset;
    if (offset && offset > (SearchLive_MaxOffset - 1)) {
        offset = SearchLive_MaxOffset - Main_ItemsLimitVideo;
        SearchLive_dataEnded = true;
    }

    var theUrl = 'https://api.twitch.tv/kraken/search/streams?query=' + encodeURIComponent(Main_values.Search_data) +
        '&limit=' + Main_ItemsLimitVideo + '&offset=' + offset;

    BasehttpGet(theUrl, SearchLive_loadingDataTimeout, 2, null, SearchLive_loadDataSuccess, SearchLive_loadDataError);
}

function SearchLive_loadDataError() {
    SearchLive_loadingDataTry++;
    if (SearchLive_loadingDataTry < SearchLive_loadingDataTryMax) {
        SearchLive_loadingDataTimeout += 500;
        SearchLive_loadDataRequest();
    } else {
        SearchLive_loadingData = false;
        if (!SearchLive_itemsCount) {
            Main_FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
        } else {
            SearchLive_dataEnded = true;
            SearchLive_loadDataSuccessFinish();
        }
    }
}

function SearchLive_loadDataSuccess(responseText) {
    var response = JSON.parse(responseText);
    var response_items = response.streams.length;
    SearchLive_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitVideo) SearchLive_dataEnded = true;

    var offset_itemsCount = SearchLive_itemsCount;
    SearchLive_itemsCount += response_items;

    SearchLive_emptyContent = !SearchLive_itemsCount;

    var response_rows = response_items / Main_ColoumnsCountVideo;
    if (response_items % Main_ColoumnsCountVideo > 0) response_rows++;

    var coloumn_id, row_id, row, stream, id,
        cursor = 0,
        doc = document.getElementById("stream_table_search_live");

    for (var i = 0; i < response_rows; i++) {
        row_id = offset_itemsCount / Main_ColoumnsCountVideo + i;
        row = document.createElement('tr');

        for (coloumn_id = 0; coloumn_id < Main_ColoumnsCountVideo && cursor < response_items; coloumn_id++, cursor++) {
            stream = response.streams[cursor];
            id = stream.channel._id;
            if (SearchLive_idObject[id]) coloumn_id--;
            else {
                SearchLive_idObject[id] = 1;
                row.appendChild(Main_createCellVideo(row_id, row_id + '_' + coloumn_id,
                    [stream.channel.name, id], SearchLive_ids,
                    [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                        Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                        stream.channel.status, stream.game,
                        STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                        Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.broadcaster_language)
                    ]));
            }
        }

        for (coloumn_id; coloumn_id < Main_ColoumnsCountVideo; coloumn_id++) {
            if (SearchLive_dataEnded && !SearchLive_itemsCountCheck) {
                SearchLive_itemsCountCheck = true;
                SearchLive_itemsCount = (row_id * Main_ColoumnsCountVideo) + coloumn_id;
            }
            row.appendChild(Main_createEmptyCell(SearchLive_ids[9] + row_id + '_' + coloumn_id));
            SearchLive_emptyCellVector.push(SearchLive_ids[9] + row_id + '_' + coloumn_id);
        }
        doc.appendChild(row);
    }

    SearchLive_loadDataSuccessFinish();
}

function SearchLive_loadDataSuccessFinish() {
    if (!SearchLive_Status) {
        if (SearchLive_emptyContent) Main_showWarningDialog(STR_SEARCH_RESULT_EMPTY);
        else {
            SearchLive_Status = true;
            Main_imgVectorLoad(IMG_404_VIDEO);
            SearchLive_addFocus();
            Main_SaveValues();
        }
        Main_ShowElement(SearchLive_ids[10]);
        Main_FirstLoad = false;
        Main_HideLoadDialog();
    } else {
        Main_imgVectorLoad(IMG_404_VIDEO);
        if (SearchLive_emptyCellVector.length > 0 && !SearchLive_dataEnded) {
            SearchLive_loadDataPrepare();
            SearchLive_loadDataReplace();
            return;
        } else {
            Main_CounterDialog(SearchLive_cursorX, SearchLive_cursorY, Main_ColoumnsCountVideo, SearchLive_itemsCount);
            SearchLive_emptyCellVector = [];
        }
    }
    SearchLive_loadingData = false;
}

function SearchLive_loadDataReplace() {

    Main_SetItemsLimitReplace(SearchLive_emptyCellVector.length);

    var offset = SearchLive_itemsCount + SearchLive_itemsCountOffset;
    if (offset && offset > (SearchLive_MaxOffset - 1)) {
        offset = SearchLive_MaxOffset - Main_ItemsLimitReplace;
        SearchLive_dataEnded = true;
    }
    var theUrl = 'https://api.twitch.tv/kraken/search/streams?query=' + encodeURIComponent(Main_values.Search_data) +
        '&limit=' + Main_ItemsLimitReplace + '&offset=' + offset;

    BasehttpGet(theUrl, SearchLive_loadingDataTimeout, 2, null, SearchLive_loadDataSuccessReplace, SearchLive_loadDataErrorReplace);
}

function SearchLive_loadDataErrorReplace() {
    SearchLive_loadingDataTry++;
    if (SearchLive_loadingDataTry < SearchLive_loadingDataTryMax) {
        SearchLive_loadingDataTimeout += 500;
        SearchLive_loadDataReplace();
    } else {
        SearchLive_dataEnded = true;
        SearchLive_itemsCount -= SearchLive_emptyCellVector.length;
        SearchLive_emptyCellVector = [];
        SearchLive_loadDataSuccessFinish();
    }
}

function SearchLive_loadDataSuccessReplace(responseText) {
    var response = JSON.parse(responseText),
        response_items = response.streams.length,
        stream, id, i = 0,
        cursor = 0,
        tempVector = [];

    SearchLive_MaxOffset = parseInt(response._total);

    if (response_items < Main_ItemsLimitReplace) SearchLive_dataEnded = true;

    for (i; i < SearchLive_emptyCellVector.length && cursor < response_items; i++, cursor++) {
        stream = response.streams[cursor];
        id = stream.channel._id;
        if (SearchLive_idObject[id]) i--;
        else {
            SearchLive_idObject[id] = 1;
            Main_replaceVideo(SearchLive_emptyCellVector[i], [stream.channel.name, id],
                [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                    Main_is_playlist(JSON.stringify(stream.stream_type)) + stream.channel.display_name,
                    stream.channel.status, stream.game,
                    STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                    Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.broadcaster_language)
                ], SearchLive_ids);

            tempVector.push(i);
        }
    }

    for (i = tempVector.length - 1; i > -1; i--) SearchLive_emptyCellVector.splice(tempVector[i], 1);

    SearchLive_itemsCountOffset += cursor;
    if (SearchLive_dataEnded) {
        SearchLive_itemsCount -= SearchLive_emptyCellVector.length;
        SearchLive_emptyCellVector = [];
    }

    SearchLive_loadDataSuccessFinish();
}

function SearchLive_addFocus() {
    Main_addFocusVideo(SearchLive_cursorY, SearchLive_cursorX, SearchLive_ids, Main_ColoumnsCountVideo, SearchLive_itemsCount);

    if (((SearchLive_cursorY + Main_ItemsReloadLimitVideo) > (SearchLive_itemsCount / Main_ColoumnsCountVideo)) &&
        !SearchLive_dataEnded && !SearchLive_loadingData) {
        SearchLive_loadDataPrepare();
        SearchLive_loadDataRequest();
    }
    if (Main_CenterLablesInUse) SearchLive_removeFocus();
}

function SearchLive_removeFocus() {
    if (SearchLive_itemsCount) Main_removeFocus(SearchLive_cursorY + '_' + SearchLive_cursorX, SearchLive_ids);
}

function SearchLive_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();
    var i;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                SearchLive_removeFocus();
                Main_CenterLablesStart(SearchLive_handleKeyDown);
            }
            break;
        case KEY_LEFT:
            if (Main_ThumbNull((SearchLive_cursorY), (SearchLive_cursorX - 1), SearchLive_ids[0])) {
                SearchLive_removeFocus();
                SearchLive_cursorX--;
                SearchLive_addFocus();
            } else {
                for (i = (Main_ColoumnsCountVideo - 1); i > -1; i--) {
                    if (Main_ThumbNull((SearchLive_cursorY - 1), i, SearchLive_ids[0])) {
                        SearchLive_removeFocus();
                        SearchLive_cursorY--;
                        SearchLive_cursorX = i;
                        SearchLive_addFocus();
                        break;
                    }
                }
            }
            break;
        case KEY_RIGHT:
            if (Main_ThumbNull((SearchLive_cursorY), (SearchLive_cursorX + 1), SearchLive_ids[0])) {
                SearchLive_removeFocus();
                SearchLive_cursorX++;
                SearchLive_addFocus();
            } else if (Main_ThumbNull((SearchLive_cursorY + 1), 0, SearchLive_ids[0])) {
                SearchLive_removeFocus();
                SearchLive_cursorY++;
                SearchLive_cursorX = 0;
                SearchLive_addFocus();
            }
            break;
        case KEY_UP:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((SearchLive_cursorY - 1), (SearchLive_cursorX - i), SearchLive_ids[0])) {
                    SearchLive_removeFocus();
                    SearchLive_cursorY--;
                    SearchLive_cursorX = SearchLive_cursorX - i;
                    SearchLive_addFocus();
                    break;
                }
            }
            break;
        case KEY_DOWN:
            for (i = 0; i < Main_ColoumnsCountVideo; i++) {
                if (Main_ThumbNull((SearchLive_cursorY + 1), (SearchLive_cursorX - i), SearchLive_ids[0])) {
                    SearchLive_removeFocus();
                    SearchLive_cursorY++;
                    SearchLive_cursorX = SearchLive_cursorX - i;
                    SearchLive_addFocus();
                    break;
                }
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            Main_OpenLiveStream(SearchLive_cursorY + '_' + SearchLive_cursorX, SearchLive_ids, SearchLive_handleKeyDown);
            break;
        default:
            break;
    }
}//Variable initialization
var Settings_cursorY = 0;
var Settings_value = {
    "restor_playback": { //restor_playback
        "values": ["off", "on"],
        "defaultValue": 2
    },
    "chat_font_size": { //chat_font_size
        "values": ["60%", "80%", "100%", "120%", "140%"],
        "defaultValue": 3
    },
    "chat_brightness": { //chat_font_size
        "values": ["0%", "5%", "10%", "15%", "20%",
            "25%", "30%", "35%", "40%", "45%",
            "50%", "55%", "60%", "65%", "70%",
            "75%", "80%", "85%", "90%", "95%", "100%"
        ],
        "defaultValue": 11
    },
    "force_disable_chat": { //force disable
        "values": ["off", "on"],
        "defaultValue": 2
    },
    "buffer_live": { //buffer_live
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 4
    },
    "buffer_vod": { //buffer_vod
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 4
    },
    "buffer_clip": { //buffer_clip
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 3
    },
    "videos_animation": { //videos_animation
        "values": ["off", "on"],
        "defaultValue": 2
    },
    "clock_offset": { //clock_offset
        "values": Settings_GenerateClock(),
        "defaultValue": 49
    },
    "content_lang": { //content_lang
        "values": ["All", "Dansk [DA]", "Deutsch [DE]", "English [EN][EN-GB]", "English - USA [EN]", "English - UK [EN-GB]",
            "Español [ES][ES-MX]", "Español - España [ES]", "Español - Latinoamérica [ES-MX]", "Français [FR]", "Italiano [IT]",
            "Magyar [HU]", "Nederlands [NL]", "Norsk [NO]", "Polski [PL]", "Português [PT][PT-BR]", "Português -Portugal [PT]",
            "Português - Brasil [PT-BR]", "Slovenčina [SK]", "Suomi [FI]", "Svenska [SV]", "Tiếng Việt [VI]", "Türkçe [TR]",
            "Čeština [CS]", "Ελληνικά [EL]", "Български [BG]", "Русский [RU]", "ภาษาไทย [TH]", "中文 [ZH-ALL]",
            "中文 简体 [ZH-CN]", "中文 繁體 [ZH-TW]", "日本語 [JA]", "한국어 [KO]", "Română [RO]"
        ],
        "set_values": ["", "da", "de", "en,en-gb", "en", "en-gb", "es,es-mx", "es", "es-mx", "fr", "it", "hu", "nl", "no", "pl", "pt,pt-br", "pt", "pt-br", "sk", "fi", "sv", "vi", "tr", "cs", "el", "bg", "ru", "th", "zh-cn,zh-tw", "zh-cn", "zh-tw", "ja", "ko", "ro"],
        "defaultValue": 1
    }
};

function Settings_GenerateClock() {
    var clock = [],
        time = 43200,
        i = 0;

    for (i; i < 48; i++) {
        clock.push("-" + Play_timeS(time));
        time -= 900;
    }

    clock.push(Play_timeS(0));
    time = 900;

    for (i = 0; i < 48; i++) {
        clock.push(Play_timeS(time));
        time += 900;
    }

    return clock;
}

var Settings_value_keys = [];
var Settings_positions_length = 0;
//Variable initialization end

function Settings_init() {
    Main_UnSetTopOpacity();
    document.body.addEventListener("keydown", Settings_handleKeyDown, false);
    Main_IconLoad('label_refresh', 'icon-arrow-circle-left', STR_GOBACK);
    Main_textContent('top_bar_user', STR_SETTINGS);
    document.getElementById("top_lables").style.marginLeft = '14%';
    document.getElementById('top_bar_live').style.display = 'none';
    document.getElementById('top_bar_featured').style.display = 'none';
    document.getElementById('top_bar_game').style.display = 'none';
    document.getElementById('top_bar_vod').style.display = 'none';
    document.getElementById('top_bar_clip').style.display = 'none';
    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_ShowElement('settings_scroll');
    Settings_cursorY = 0;
    Settings_inputFocus(Settings_cursorY);
}

function Settings_exit() {
    document.body.removeEventListener("keydown", Settings_handleKeyDown);
    Settings_RemoveinputFocus();
    Main_textContent('top_bar_user', STR_USER);
    document.getElementById("top_lables").style.marginLeft = '18.5%';
    document.getElementById('top_bar_live').style.display = 'inline-block';
    document.getElementById('top_bar_featured').style.display = 'inline-block';
    document.getElementById('top_bar_game').style.display = 'inline-block';
    document.getElementById('top_bar_vod').style.display = 'inline-block';
    document.getElementById('top_bar_clip').style.display = 'inline-block';
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    Main_HideElement('settings_scroll');
}

// The order in Settings_SetSettings is the display order
function Settings_SetSettings() {
    var div = '',
        key;

    // General settings title
    div += Settings_DivTitle('general', STR_SETTINGS_GENERAL);

    // Content Language selection
    key = "content_lang";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_CONTENT_LANG);

    // Clock offset
    key = "clock_offset";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_CLOCK_OFFSET);

    //Player restore playback
    key = "restor_playback";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

    div += Settings_DivOptionWithSummary(key, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMARRY);

    // Videos
    key = "videos_animation";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

    div += Settings_DivOptionNoSummary(key, STR_VIDEOS_ANIMATION);

    // Player settings title
    div += Settings_DivTitle('play', STR_SETTINGS_PLAYER);

    // Chat size
    key = "chat_font_size";
    Settings_value_keys.push(key);

    div += Settings_DivOptionWithSummary(key, STR_CHAT_FONT, STR_CHAT_FONT_SUMARRY);

    key = "chat_brightness";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_CHAT_BRIGHTNESS);

    key = "force_disable_chat";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_YES, STR_NO];

    div += Settings_DivOptionWithSummary(key, STR_F_DISABLE_CHAT, STR_F_DISABLE_CHAT_SUMARRY);

    // Player buffer title/summary
    div += '<div id="setting_title_buffers" class="settings_title">' + STR_SETTINGS_BUFFER_SIZE + '</div>' +
        '<div id="setting_title_buffers_summary" class="settings_summary">' + STR_SETTINGS_BUFFER_SIZE_SUMMARY + '</div>';

    // Player buffer live
    key = "buffer_live";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_SETTINGS_BUFFER_LIVE);

    // Player buffer vod
    key = "buffer_vod";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_SETTINGS_BUFFER_VOD);

    // Player buffer clip
    key = "buffer_clip";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_SETTINGS_BUFFER_CLIP);

    Main_innerHTML("settings_main", div);
    Settings_positions_length = Settings_value_keys.length;
}

function Settings_DivTitle(key, string) {
    return '<div id="setting_title_' + key + '" class="settings_section">' + string + '</div>';
}

function Settings_DivOptionNoSummary(key, string) {
    return '<div id="' + key + '_div" class="settings_div"><div id="' +
        key + '_name" class="settings_name">' + string + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedextramini settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';
}

function Settings_DivOptionWithSummary(key, string_title, string_summary) {
    return '<div id="' + key + '_div" class="settings_div"><div id="' + key + '_name" class="settings_name">' +
        string_title + '<div id="' + key + '_summary" class="settings_summary" style="font-size: 65%;">' + string_summary + '</div></div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedextramini settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';
}

function Settings_DivOptionChangeLang(key, string_title, string_summary) {
    Main_innerHTML(key + '_name', string_title +
        '<div id="' + key + '_summary" class="settings_summary" style="font-size: 65%;">' + string_summary + '</div>');
}

// The order in Settings_SetStrings doesnot matter
function Settings_SetStrings() {
    var key = '';

    //General settings
    Main_textContent('setting_title_general', STR_SETTINGS_GENERAL);

    // Clock offset
    key = "clock_offset";
    Main_textContent(key + '_name', STR_CLOCK_OFFSET);

    // Content Language selection
    key = "content_lang";
    Main_textContent(key + '_name', STR_CONTENT_LANG);
    Settings_value[key].values[0] = STR_LANG_ALL;
    Main_textContent(key, Settings_Obj_values(key));

    //Player settings
    Main_textContent('setting_title_play', STR_SETTINGS_PLAYER);

    // Player buffer title/summary
    Main_textContent('setting_title_buffers', STR_SETTINGS_BUFFER_SIZE);
    Main_textContent('setting_title_buffers_summary', STR_SETTINGS_BUFFER_SIZE_SUMMARY);

    key = "buffer_live";
    Main_textContent(key + '_name', STR_SETTINGS_BUFFER_LIVE);
    key = "buffer_vod";
    Main_textContent(key + '_name', STR_SETTINGS_BUFFER_VOD);
    key = "buffer_clip";
    Main_textContent(key + '_name', STR_SETTINGS_BUFFER_CLIP);

    //Player restore
    key = "restor_playback";
    Settings_DivOptionChangeLang(key, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMARRY);
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

    //Player chat font size
    key = "chat_font_size";
    Settings_DivOptionChangeLang(key, STR_CHAT_FONT, STR_CHAT_FONT_SUMARRY);

    //Player restore
    key = "force_disable_chat";
    Settings_DivOptionChangeLang(key, STR_F_DISABLE_CHAT, STR_F_DISABLE_CHAT_SUMARRY);
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

    // Videos
    key = "videos_animation";
    Main_textContent(key + '_name', STR_VIDEOS_ANIMATION);
    Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

    key = "chat_brightness";
    Main_textContent(key + '_name', STR_CHAT_BRIGHTNESS);

    for (key in Settings_value)
        if (Settings_value.hasOwnProperty(key))
            Main_textContent(key, Settings_Obj_values(key));
}

function Settings_SetDefautls() {
    for (var key in Settings_value) {
        Settings_value[key].defaultValue = Main_getItemInt(key, Settings_value[key].defaultValue);
        Settings_value[key].defaultValue -= 1;
    }
    Settings_SetBuffers(0);
    Settings_SetClock();
    Play_ChatBackground = (Settings_Obj_default("chat_brightness") * 0.05).toFixed(2);
    Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
    Main_ContentLang = Settings_Obj_set_values("content_lang");
    Main_values.Play_ChatForceDisable = Settings_Obj_default("force_disable_chat");
}

function Settings_Obj_values(key) {
    return Settings_value[key].values[Settings_Obj_default(key)];
}

function Settings_Obj_set_values(key) {
    return Settings_value[key].set_values[Settings_Obj_default(key)];
}

function Settings_Obj_default(key) {
    return Settings_value[key].defaultValue;
}

function Settings_Obj_length(key) {
    return Settings_value[key].values.length - 1;
}

function Settings_inputFocus(position) {
    var key = Settings_value_keys[Settings_cursorY];
    Main_AddClass(key, 'settings_value_focus');
    Main_AddClass(key + '_div', 'settings_div_focus');
    Settings_Setarrows(position);
}

function Settings_RemoveinputFocus() {
    var key = Settings_value_keys[Settings_cursorY];
    document.getElementById(key + "arrow_left").style.opacity = "0";
    document.getElementById(key + "arrow_right").style.opacity = "0";
    Main_RemoveClass(key, 'settings_value_focus');
    Main_RemoveClass(key + '_div', 'settings_div_focus');
}

function Settings_ChangeSettigs(position) {
    var key = Settings_value_keys[position];
    Main_setItem(key, Settings_Obj_default(key) + 1);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_Setarrows(position);
    Settings_SetDefault(position);
}

function Settings_Setarrows(position) {
    var key = Settings_value_keys[position];

    var currentValue = Settings_Obj_default(key);
    var maxValue = Settings_Obj_length(key);

    if (currentValue > 0 && currentValue < maxValue) {
        document.getElementById(key + "arrow_left").style.opacity = "1";
        document.getElementById(key + "arrow_right").style.opacity = "1";
    } else if (currentValue === maxValue) {
        document.getElementById(key + "arrow_left").style.opacity = "1";
        document.getElementById(key + "arrow_right").style.opacity = "0.2";
    } else {
        document.getElementById(key + "arrow_left").style.opacity = "0.2";
        document.getElementById(key + "arrow_right").style.opacity = "1";
    }
}

function Settings_SetDefault(position) {
    position = Settings_value_keys[position];

    if (position === "content_lang") Main_ContentLang = Settings_Obj_set_values("content_lang");
    else if (position === "videos_animation") Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
    else if (position === "buffer_live") Settings_SetBuffers(1);
    else if (position === "buffer_vod") Settings_SetBuffers(2);
    else if (position === "buffer_clip") Settings_SetBuffers(3);
    else if (position === "chat_brightness") {
        Play_ChatBackground = (Settings_Obj_default("chat_brightness") * 0.05).toFixed(2);
        Play_ChatBackgroundChange(false);
    } else if (position === "force_disable_chat") Main_values.Play_ChatForceDisable = Settings_Obj_default("force_disable_chat");
    else if (position === "chat_font_size") Play_SetChatFont();
    else if (position === "clock_offset") {
        Settings_SetClock();
        Main_updateclock();
    }
}

function Settings_SetBuffers(whocall) {
    //TODO remove the try after android app update has be releaased for some time
    try {
        if (!whocall) {
            Play_Buffer = Settings_Obj_values("buffer_live") * 1000;
            PlayVod_Buffer = Settings_Obj_values("buffer_vod") * 1000;
            PlayClip_Buffer = Settings_Obj_values("buffer_clip") * 1000;
            if (Main_Android) {
                Android.SetBuffer(1, Play_Buffer);
                Android.SetBuffer(2, PlayVod_Buffer);
                Android.SetBuffer(3, PlayClip_Buffer);
            }
        } else if (whocall === 1) {
            Play_Buffer = Settings_Obj_values("buffer_live") * 1000;
            if (Main_Android) Android.SetBuffer(1, Play_Buffer);
        } else if (whocall === 2) {
            PlayVod_Buffer = Settings_Obj_values("buffer_vod") * 1000;
            if (Main_Android) Android.SetBuffer(2, PlayVod_Buffer);
        } else if (whocall === 3) {
            PlayClip_Buffer = Settings_Obj_values("buffer_clip") * 1000;
            if (Main_Android) Android.SetBuffer(3, PlayClip_Buffer);
        }
    } catch (e) {}
}

//function Settings_CheckLang(lang) {
//    if (lang.indexOf('en_') !== -1) Settings_value.general_lang.defaultValue = 0;
//    else if (lang.indexOf('it_') !== -1) Settings_value.general_lang.defaultValue = 1;
//    else if (lang.indexOf('pt_') !== -1) Settings_value.general_lang.defaultValue = 2;
//}

//function Settings_SetLang(lang) {
//    if (lang.indexOf('en_') !== -1) en_USLang();
//else if (lang.indexOf('it_') !== -1) it_ITLang();
//else if (lang.indexOf('pt_') !== -1) pt_BRLang();
//    DefaultLang();
//    Main_SetStringsMain(false);
//    Main_SetStringsSecondary();
//}

function Settings_SetClock() {
    var time = Settings_Obj_default("clock_offset");
    Main_ClockOffset = time < 48 ? (48 - time) * -900000 : (time - 48) * 900000;
}

function Settings_handleKeyDown(event) {
    var key;
    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Settings_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            key = Settings_value_keys[Settings_cursorY];
            if (Settings_Obj_default(key) > 0) {
                Settings_value[key].defaultValue -= 1;
                Settings_ChangeSettigs(Settings_cursorY);
            }
            break;
        case KEY_RIGHT:
            key = Settings_value_keys[Settings_cursorY];
            if (Settings_Obj_default(key) < Settings_Obj_length(key)) {
                Settings_value[key].defaultValue += 1;
                Settings_ChangeSettigs(Settings_cursorY);
            }
            break;
        case KEY_UP:
            if (Settings_cursorY > 0) {
                Settings_RemoveinputFocus();
                Settings_cursorY--;
                Settings_inputFocus(Settings_cursorY);
            }
            break;
        case KEY_DOWN:
            if (Settings_cursorY < (Settings_positions_length - 1)) {
                Settings_RemoveinputFocus();
                Settings_cursorY++;
                Settings_inputFocus(Settings_cursorY);
            }
            break;
        default:
            break;
    }
}