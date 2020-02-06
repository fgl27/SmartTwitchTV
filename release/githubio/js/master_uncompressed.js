/* jshint undef: true, unused: true, node: true, browser: true */
/*globals Android, ReconnectingWebSocket, punycode, smartTwitchTV */
/* exported Play_CheckResume */
(function(root) {

    /** Detect free variables */
    var smartTwitchTVGlobal = typeof global === 'object' && global;
    if (smartTwitchTVGlobal.global === smartTwitchTVGlobal ||
        smartTwitchTVGlobal.window === smartTwitchTVGlobal ||
        smartTwitchTVGlobal.self === smartTwitchTVGlobal) {

        root = smartTwitchTVGlobal;

    }
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
    var STR_CONTROLS_MAIN_2;
    var STR_CONTROLS_MAIN_3;
    var STR_CONTROLS_MAIN_4;
    var STR_CONTROLS_MAIN_6;
    var STR_CONTROLS_MAIN_10;
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
    var STR_ABOUT_INFO_12;
    var STR_ABOUT_INFO_13;
    var STR_ABOUT_INFO_14;
    var STR_ABOUT_INFO_15;
    var STR_ABOUT_INFO_16;
    var STR_ABOUT_INFO_17;
    var STR_ABOUT_INFO_18;
    var STR_ABOUT_INFO_19;
    var STR_ABOUT_INFO_20;
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
    var STR_RESTORE_PLAYBACK_SUMMARY;
    var STR_CHAT_FONT;
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
    var STR_CONTENT_LANG_SUMMARY;
    var STR_LANG_ALL;
    var STR_NO_GAME;
    var STR_ABOUT_INFO_2_SOURCE;
    var STR_JUMP_BUFFER_WARNING;
    var STR_CHAT_DISABLE;
    var STR_CLIP_FAIL;
    var STR_F_DISABLE_CHAT;
    var STR_CHAT_BRIGHTNESS;
    var STR_GOBACK_START;
    var STR_PLAY_NEXT;
    var STR_PLAY_ALL;
    var STR_PLAY_NEXT_IN;
    var STR_AUTO_PLAY_NEXT;
    var STR_CONTROLS_MAIN_5;
    var STR_SIDE_PANEL_SETTINGS;
    var STR_UP;
    var STR_LIVE_FEED;
    var STR_NOKUSER_WARN;
    var STR_END_DIALOG_SETTINGS;
    var STR_END_DIALOG_SETTINGS_SUMMARY;
    var STR_END_DIALOG_DISABLE;
    var STR_CHAT_SIZE;
    var STR_CHAT_POS;
    var STR_CHAT_SIDE_FULL;
    var STR_CHAT_SIDE;
    var STR_SPEED;
    var STR_QUALITY;
    var STR_CHAT_VIDEO_MODE;
    var STR_NORMAL;
    var STR_AUTO;
    var STR_DEF_QUALITY;
    var STR_DEF_QUALITY_SUMMARY;
    var STR_VERY_LOW;
    var STR_LOW;
    var STR_HIGH;
    var STR_VERY_HIGH;
    var STR_THUMB_RESOLUTION;
    var STR_THUMB_RESOLUTION_SUMMARY;
    var STR_PAYPAL_SUMMARY;
    var STR_CHAT_DELAY;
    var STR_SECOND;
    var STR_GUIDE_EXTRA;
    var STR_PLAYER_PROBLEM_2;
    var STR_EXIT_AGAIN_PICTURE;
    var STR_PLAYER_AUTO_BIG;
    var STR_PLAYER_AUTO_SMALLS;
    var STR_PLAYER_RESYNC;
    var STR_PLAYER_AUTO_ALL;
    var STR_PLAYER_BITRATE;
    var STR_PLAYER_BITRATE_SUMMARY;
    var STR_PLAYER_BITRATE_MAIN;
    var STR_PLAYER_BITRATE_SMALL;
    var STR_PLAYER_BITRATE_SMALL_SUMMARY;
    var STR_PLAYER_BITRATE_UNLIMITED;
    var STR_PICTURE_LIVE_FEED;
    var STR_AUDIO_SOURCE;
    var STR_PICTURE_PICTURE;
    var STR_PICTURE_CONTROLS1;
    var STR_PICTURE_CONTROLS2;
    var STR_PICTURE_CONTROLS3;
    var STR_PICTURE_CONTROLS4;
    var STR_PICTURE_CONTROLS5;
    var STR_PICTURE_CONTROLS6;
    var STR_PICTURE_CONTROLS7;
    var STR_PICTURE_CONTROLS8;
    var STR_PICTURE_CONTROLS9;
    var STR_PICTURE_CONTROLS10;
    var STR_KEEP_INFO_VISIBLE;
    var STR_PICTURE_CONTROLS11;
    var STR_CHAT_5050;
    var STR_CHAT_PP_SIDE_FULL;
    var STR_PICTURE_CONTROLS12;
    var STR_SINGLE_EXIT;
    var STR_SINGLE_EXIT_SUMMARY;
    var STR_USER_MY_CHANNEL;
    var STR_NOW_LIVE;
    var STR_NOW_LIVE_SHOW;
    var STR_NOW_DURATION;
    var STR_GLOBAL_FONT;
    var STR_GLOBAL_FONT_SUMMARY;
    var STR_MAIN_MENU;
    var STR_USER_MENU;
    var STR_CH_IS_OFFLINE;
    var STR_SCREEN_COUNTER;
    var STR_SWITCH_POS;
    var STR_SWITCH_POS_SUMMARY;
    var STR_MAIN_USER;
    var STR_USER_OPTION;
    var STR_USER_TOP_LABLE;
    var STR_USER_EXTRAS;
    var STR_LOW_LATENCY;
    var STR_LIVE_FEED_SORT;
    var STR_LIVE_FEED_SORT_SUMMARY;
    var STR_A_Z;
    var STR_Z_A;
    var STR_APP_ANIMATIONS;
    var STR_LOW_LATENCY_SUMMARY;
    var STR_CONTROLS_PLAY_13;
    var STR_RUNNINGTIME;
    var STR_410_ERROR;
    var STR_410_FEATURING;
    var STR_CLICK_UNFALLOW;
    var STR_CLICK_FALLOW;
    var STR_HOLD_UP;
    var STR_TODAY;
    var STR_DROOPED_FRAMES;
    var STR_BUFFER_HEALT;
    var STR_AVGMB;
    var STR_NET_SPEED;
    var STR_NET_ACT;
    var STR_LATENCY;
    var STR_WARNING;
    var STR_ABOUT_PHONE;
    var STR_CHAT_SHOW;
    var STR_DPAD_POSTION;
    var STR_DPAD_OPACITY;
    var STR_BLOCKED_CODEC;
    var STR_BLOCKED_CODEC_SUMMARY;
    var STR_CODEC_DIALOG_TITLE;
    var STR_SUPPORTED_CODEC;
    var STR_MAX_RES;
    var STR_MAX_BIT;
    var STR_MAX_LEVEL;
    var STR_MAX_FPS;
    var STR_ONE_CODEC_ENA;
    var STR_USER_LIVE;
    var STR_PP_WORKAROUND;
    var STR_PP_WORKAROUND_SUMMARY;
    var STR_PP_WARNIG;
    var STR_CLOSE_THIS2;
    var STR_HISTORY;
    var STR_WATCHED;
    var STR_UNTIL;
    var STR_SORTING;
    var STR_DELETE_HISTORY;
    var STR_NAME_A_Z;
    var STR_NAME_Z_A;
    var STR_GAME_A_Z;
    var STR_GAME_Z_A;
    var STR_VIWES_MOST;
    var STR_VIWES_LOWEST;
    var STR_NEWEST;
    var STR_OLDEST;
    var STR_PRESS_ENTER_D;
    var STR_PRESS_ENTER_APPLY;
    var STR_LIVE_VOD;
    var STR_BACKUP;
    var STR_DELETE_SURE;
    var STR_CREATED_NEWEST;
    var STR_CREATED_OLDEST;
    var STR_THUMB_OPTIONS;
    var STR_HISTORY_LIVE_DIS;
    var STR_HISTORY_VOD_DIS;
    var STR_HISTORY_CLIP_DIS;
    var STR_OPEN_GAME;
    var STR_OPEN_CHANNEL;
    var STR_THUMB_OPTIONS_KEY;
    var STR_CHECK_HISTORY;
    var STR_DELETE_FROM_HISTORY;
    var STR_REFRESH_DELETE;
    var STR_THUMB_OPTIONS_TOP;
    var STR_MAX_INSTANCES;
    var STR_UNKNOWN;
    var STR_PLAYER_MULTI_ALL;
    var STR_PLAYER_WINDOW;
    var STR_REPLACE_MULTI;
    var STR_REPLACE_MULTI_ENTER;
    var STR_ALREDY_PLAYING;
    var STR_STREAM_ERROR;
    var STR_EXIT_AGAIN_MULTI;
    var STR_MULTI_EMPTY;
    var STR_4_WAY_MULTI;
    var STR_CONTROLS_MULTI;
    var STR_CONTROLS_MULTI_0;
    var STR_CONTROLS_MULTI_1;
    var STR_CONTROLS_MULTI_2;
    var STR_CONTROLS_MULTI_3;
    var STR_CONTROLS_MULTI_4;
    var STR_CONTROLS_MULTI_5;
    var STR_CONTROLS_MULTI_6;
    var STR_FEED_END_DIALOG;
    var STR_MULTI_TITLE; // Bellow here are the all untranslatable string,they are a combination of strings and html code use by pats of the code
    var STR_ABOUT_EMAIL = "fglfgl27@gmail.com";
    var STR_BR = "<br>";
    var STR_DOT = '<i  class="icon-circle class_bold" style="font-size: 50%; vertical-align: middle;"></i>' + "  ";
    var STR_DIV_TITLE = '<div class="about_text_title">';
    var STR_DIV_TITLE_LEFT = '<div class="about_text_title" style="text-align: left;">';
    var STR_DIV_MIDLE_LEFT = '<div style="text-align: left;">';
    var STR_DIV_LINK = '<div style="text-align: center; width: 100%; display: inline-block; color: #0366d6;">';
    var STR_CONTROL_KEY = '';
    var STR_SEARCH_KEY = '';
    var STR_ABOUT_KEY = '';
    var STR_SETTINGS_KEY = '';
    var STR_CONTROLS_MAIN_0 = '';
    var STR_ABOUT_PHONE_0 = '';
    var STR_ABOUT_INFO_HEADER = '';
    var STR_ABOUT_INFO_0 = '';
    var STR_CONTROLS_PLAY_0 = '';
    var STR_SPACE = '&nbsp;';
    var STR_PAYPAL;

    // This function is called after the main language is loaded, the above are initialized empty so it doesn't cause loading exceptions
    function DefaultLang() {
        STR_CONTROL_KEY = STR_CONTROLS + " (C)";
        STR_SEARCH_KEY = STR_SEARCH + " (D)";
        STR_SETTINGS_KEY = STR_SETTINGS + " (A)";
        STR_ABOUT_KEY = STR_ABOUT + " (A)";
        STR_SWITCH = STR_SWITCH + STR_KEY_UP_DOWN;
        STR_SWITCH_USER = STR_SWITCH_USER + STR_KEY_UP_DOWN;
        STR_CONTROLS_MAIN_3 = STR_CONTROLS_MAIN_3 + STR_GUIDE + STR_GUIDE_EXTRA;
        STR_GOBACK = STR_GOBACK_START;
        STR_PAYPAL = '<div style="vertical-align: middle;"><img style="vertical-align: middle; display: inline-block; width: 4%;" alt="" src="https://fgl27.github.io/SmartTwitchTV/release/githubio/images/paypal.png"><div style="vertical-align: middle; display: inline-block;">' + STR_PAYPAL_SUMMARY + '</div></div>';

        STR_CONTROLS_PLAY_0 = STR_DIV_TITLE + STR_PLAYER + '</div>' +
            STR_DIV_MIDLE_LEFT +
            STR_DOT + STR_CONTROLS_PLAY_4 + STR_BR +
            STR_DOT + STR_CONTROLS_PLAY_1 + STR_BR +
            STR_DOT + STR_CONTROLS_PLAY_2 + STR_BR + '</div>' +
            STR_DIV_MIDLE_LEFT +
            STR_DOT + STR_CONTROLS_PLAY_3 + STR_BR +
            STR_DOT + STR_CONTROLS_PLAY_5 + STR_BR +
            STR_DOT + STR_CONTROLS_PLAY_6 + STR_BR +
            STR_DOT + STR_CONTROLS_PLAY_13 + STR_BR +

            STR_DIV_TITLE + STR_CHAT + '</div>' +
            STR_DIV_MIDLE_LEFT +
            STR_DOT + STR_CONTROLS_PLAY_7 + STR_BR +
            STR_DOT + STR_CONTROLS_PLAY_8 + STR_BR +
            STR_DOT + STR_CONTROLS_PLAY_9 + STR_BR +
            STR_DOT + STR_CONTROLS_PLAY_10 + STR_BR +
            STR_DOT + STR_CONTROLS_PLAY_11 + STR_BR +

            STR_DIV_TITLE + STR_PICTURE_PICTURE + '</div>' +
            STR_DIV_MIDLE_LEFT +
            STR_DOT + STR_PICTURE_CONTROLS1 + STR_BR +
            STR_DOT + STR_PICTURE_CONTROLS12 + STR_BR +
            STR_DOT + STR_PICTURE_CONTROLS2 + STR_BR +
            STR_DOT + STR_PICTURE_CONTROLS3 + STR_BR +
            STR_DOT + STR_PICTURE_CONTROLS4 + STR_BR +
            STR_DOT + STR_PICTURE_CONTROLS5 + STR_BR +
            STR_DOT + STR_PICTURE_CONTROLS6 + STR_BR +
            STR_DOT + STR_PICTURE_CONTROLS7 + STR_BR +
            STR_DOT + STR_PICTURE_CONTROLS8 + STR_BR +
            STR_DOT + STR_PICTURE_CONTROLS9 + STR_BR +
            STR_DOT + STR_PICTURE_CONTROLS10 + STR_BR +
            STR_DOT + STR_PICTURE_CONTROLS11;

        STR_CONTROLS_MULTI = STR_DIV_TITLE + STR_CONTROLS_MULTI_0 + '</div>' +
            STR_DIV_MIDLE_LEFT +
            STR_DOT + STR_CONTROLS_MULTI_1 + STR_BR +
            STR_DOT + STR_CONTROLS_MULTI_2 + STR_BR +
            STR_DOT + STR_CONTROLS_MULTI_3 + STR_BR +
            STR_DOT + STR_CONTROLS_MULTI_4 + STR_BR +
            STR_DOT + STR_CONTROLS_MULTI_5 + STR_BR + '</div>' +
            STR_DIV_TITLE + STR_CONTROLS_MULTI_6 + '</div>';

        STR_CONTROLS_MAIN_0 = STR_DIV_TITLE + STR_CONTROLS + '</div>' +
            STR_DIV_TITLE + STR_GENERAL + '</div>' +
            STR_DIV_MIDLE_LEFT +
            STR_DOT + STR_SIDE_PANEL + STR_BR +
            STR_DOT + STR_USER_LIVE + STR_BR +
            STR_DOT + STR_CONTROLS_MAIN_2 + STR_BR +
            STR_DOT + STR_CONTROLS_MAIN_3 + STR_BR +
            STR_DOT + STR_CONTROLS_MAIN_4 + STR_BR +
            STR_DOT + STR_CONTROLS_MAIN_5 + STR_BR +
            STR_DOT + STR_CONTROLS_MAIN_6 + STR_BR +
            STR_DOT + STR_CONTROLS_MAIN_10 + STR_BR +
            STR_DOT + STR_CONTROLS_MAIN_14 + STR_BR + '</div>' +
            STR_CONTROLS_PLAY_0 + STR_BR +
            STR_DIV_TITLE + STR_CLOSE_THIS + '</div>';

        STR_ABOUT_PHONE_0 = STR_DIV_TITLE + STR_WARNING + '</div>' + STR_BR +
            STR_ABOUT_PHONE + STR_BR + STR_BR +
            STR_DIV_TITLE + STR_CLOSE_THIS + '</div>';

        STR_ABOUT_INFO_HEADER = STR_DIV_TITLE + STR_TWITCH_TV + '</div></div>';
        STR_ABOUT_INFO_0 = STR_DIV_MIDLE_LEFT + STR_BR + STR_ABOUT_INFO_1 +
            (Main_IsNotBrowser ? '' : STR_BR + '<div class="class_bold" style="text-align: center; width: 100%; display: inline-block; color: #FF0000; font-size: 110%;">' + STR_ABOUT_INFO_2_SOURCE + '</div>') + '</div>' +

            STR_DIV_TITLE + STR_ABOUT_INFO_18 + '</div>' +
            STR_ABOUT_INFO_19 + STR_BR +
            STR_DIV_LINK + STR_ABOUT_INFO_20 + '</div>' + STR_BR +
            STR_DIV_TITLE + STR_ABOUT_INFO_3 + '</div>' +
            STR_DIV_LINK + STR_ABOUT_EMAIL + '</div>' + STR_BR +
            STR_PAYPAL +
            STR_ABOUT_INFO_4 + STR_BR +
            STR_DIV_LINK + STR_ABOUT_INFO_5 + '</div>' + STR_BR +
            STR_BR +
            STR_DIV_TITLE_LEFT + STR_ABOUT_INFO_6 + '</div>' +
            STR_DIV_MIDLE_LEFT +
            STR_ABOUT_INFO_14 + STR_BR +
            STR_DOT + STR_ABOUT_INFO_7 + STR_BR +
            STR_DOT + STR_ABOUT_INFO_8 + STR_BR +
            STR_DOT + STR_ABOUT_INFO_9 + STR_BR +
            STR_DOT + STR_ABOUT_INFO_10 + STR_BR +
            STR_DOT + STR_ABOUT_INFO_12 + STR_BR +
            STR_DOT + STR_ABOUT_INFO_13 + STR_BR +
            STR_ABOUT_INFO_15 + STR_BR +
            STR_DOT + STR_ABOUT_INFO_16 + STR_BR +
            STR_DOT + STR_ABOUT_INFO_17 + STR_BR +
            STR_DIV_TITLE + STR_CLOSE_THIS + '</div></div>';
    }
    //Spacing for reease maker not trow erros frm jshint
    function en_USLang() {
        // This is a false/true var change if day comes first in your language eg (27/12/2010) day 27 month 12 year 2010
        Main_IsDayFirst = false;

        // This is the size of side pannel a adjustments may be needed here so it can fit all words in the horizontal axis
        //document.getElementById("side_panel").style.width = "25%";

        //Below are variables to translate
        STR_KEY_UP_DOWN = " PG Up/Down";
        STR_GUIDE_EXTRA = STR_SPACE + "or key number 2";
        STR_REFRESH = "Refresh";
        STR_SEARCH = "Search";
        STR_SETTINGS = "Settings";
        STR_CONTROLS = "Controls";
        STR_ABOUT = "About";
        STR_HIDE = "Hide";
        STR_SEARCH_EMPTY = "The text you entered is empty.";
        STR_SEARCH_RESULT_EMPTY = "The search result is empty.";
        STR_SWITCH = "Switch screen";
        STR_SWITCH_USER = "Switch user screen";
        STR_SWITCH_VOD = "Switch: Past Broadcasts or Highlights";
        STR_SWITCH_CLIP = "Switch: Period (24h, 7d, 30d, all)";
        STR_GO_TO = "Go to ";
        STR_USER = "User";
        STR_LIVE = "Live";
        STR_GAMES = "Games";
        STR_PLAYING = "Playing ";
        STR_FOR = "for ";
        STR_WATCHING = "Watch time ";
        STR_SINCE = "Since ";
        STR_AGAME = "A Game";
        STR_PLACEHOLDER_SEARCH = "Type your search...";
        STR_PLACEHOLDER_OAUTH = "Type your authentication key...";
        STR_PLACEHOLDER_USER = "Type your username...";
        STR_PLACEHOLDER_PRESS = "Press Enter or Select key to, ";
        STR_CHANNELS = "Channels";
        STR_CHANNEL = "Channel";
        STR_GOBACK_START = "Back to previous screen: Back key";
        STR_IS_OFFLINE = " has ended";
        STR_IS_SUB_ONLY = "This video is only available to subscribers.";
        STR_REFRESH_PROBLEM = "Connection failed, unable to load content. Hit refresh to try again";
        STR_NO = "No";
        STR_FOR_THIS = " for this ";
        STR_PLAYER_PROBLEM = "Connection failed, unable to load video content exiting...";
        STR_PAST_BROA = " Past Broadcasts";
        STR_PAST_HIGHL = " Highlights";
        STR_CLIPS = "Clips";
        STR_CONTENT = " Content";
        STR_STREAM_ON = "Streamed ";
        STR_DURATION = "Duration ";
        STR_VIEWS = " Views";
        STR_VIEWER = "Viewers";
        STR_EXIT_AGAIN = "Click again to exit!";
        STR_EXIT_AGAIN_PICTURE = "Click again to exit Picture in Picture!";
        STR_EXIT_AGAIN_MULTI = "Click again to exit MultiStream!";
        STR_EXIT_MESSAGE = "Do you want to exit SmartTV Client for Twitch?";
        STR_EXIT = "Exit";
        STR_CLOSE = "Close";
        STR_MINIMIZE = "Minimize";
        STR_CANCEL = "Cancel";
        STR_NOT_LIVE = "Rerun";
        STR_LIVE_CHANNELS = " Channels Live";
        STR_LIVE_HOSTS = "Hosts";
        STR_LIVE_GAMES = " Games Live";
        STR_USER_CHANNEL = " Followed Channels";
        STR_USER_MY_CHANNEL = "My Channel";
        STR_USER_ADD = "Add User";
        STR_USER_REMOVE = " Remove User";
        STR_USER_ERROR = "User doesn\'t exist";
        STR_USER_HOSTING = " hosting ";
        STR_USER_SET = " already set";
        STR_USER_MAKE_ONE = "Switch to";
        STR_USER_NUMBER_ONE = "First user can follow (when providing a key) and see live channels feed outside of the user screen<br>";
        STR_ADD_USER_SH = "Add a Twitch user to display it\'s Followed Channels content here";
        STR_CLIP_DAY = "24h";
        STR_CLIP_WEEK = "7d";
        STR_CLIP_MONTH = "30d";
        STR_CLIP_ALL = "all";
        STR_JUMP_TIME = "Jumping";
        STR_JUMP_T0 = " to ";
        STR_JUMP_CANCEL = "Jump Canceled";
        STR_JUMP_TIME_BIG = " , jump time bigger then duration";
        STR_SEC = " Sec";
        STR_MIN = " Min";
        STR_HR = " Hr";
        STR_SOURCE = "Source";
        STR_VERSION = "Version: ";
        STR_TWITCH_TV = "SmartTV Client for Twitch";
        STR_CLOSE_THIS = "Press back or enter key to close this.";
        STR_CLOSE_THIS2 = "Press back to close this.";
        STR_PLAYER = "Player Related:";
        STR_CHAT = "Chat Related:";
        STR_CHAT_SHOW = "Chat show";
        STR_GENERAL = "General Related:";
        STR_UPDATE = 'Update';
        STR_CURRENT_VERSION = "Current installed version ";
        STR_LATEST_VERSION = " latest available version ";
        STR_CONTROLS_MAIN_2 = "Play a video: Navigate using Directional pad (up/down/left/right), press enter or play play/pause media";
        STR_CONTROLS_MAIN_3 = "Refresh screen content: ";
        STR_CONTROLS_MAIN_4 = "Exit the application: from side panel click exit";
        STR_CONTROLS_MAIN_5 = "Force close the application: Hold the back key until it auto force close";
        STR_CONTROLS_MAIN_6 = " Switch screen: Back key then D-Pad up/Down or" + STR_KEY_UP_DOWN;
        STR_CONTROLS_MAIN_10 = "Start a search: from side panel click search, writing the search press the Enter key on the virtual keyboard and choose a search option";
        STR_CONTROLS_MAIN_14 = "About this application: from side panel click about";
        STR_ABOUT_INFO_1 = "This is a SmartTV Client for Twitch developed by a individual on his free time, for TVs that don't have access to a good official application, released for free to anyone who wants to use it.";
        STR_ABOUT_INFO_2_SOURCE = "This version of the app is for test in browser only!";
        STR_ABOUT_INFO_3 = "Developer information:";
        STR_ABOUT_INFO_4 = "This is an open source application licensed under the GNU General Public License v3.0, check it on github";
        STR_ABOUT_INFO_5 = "https://github.com/fgl27/SmartTwitchTV";
        STR_ABOUT_INFO_6 = "This application uses following dependencies:";
        STR_ABOUT_INFO_7 = "Nightdev KapChat - KapChat captures Twitch chat directly into OBS or XSplit (https://www.nightdev.com/kapchat/)";
        STR_ABOUT_INFO_8 = "Fontastic - Create your customized icon fonts in seconds (http://app.fontastic.me)";
        STR_ABOUT_INFO_9 = "Twemoji - A simple library that provides standard Unicode emoji support across all platforms (https://github.com/twitter/twemoji)";
        STR_ABOUT_INFO_10 = "UglifyJS - is a JavaScript parser, minifier, compressor and beautifier toolkit (https://github.com/mishoo/UglifyJS2)";
        STR_ABOUT_INFO_12 = "HTMLMinifier - A highly configurable, well-tested, JavaScript-based HTML minifier (https://github.com/kangax/html-minifier)";
        STR_ABOUT_INFO_13 = "JSHint - A Static Code Analysis Tool for JavaScript (https://github.com/jshint/jshint)";

        STR_ABOUT_INFO_14 = "Web:";
        STR_ABOUT_INFO_15 = "Android:";
        STR_ABOUT_INFO_16 = "Google: Leanback v17 (https://developer.android.com/reference/android/support/v17/leanback/package-summary)";
        STR_ABOUT_INFO_17 = "Google: ExoPlayer (https://github.com/google/ExoPlayer)";
        STR_ABOUT_INFO_18 = "Phones and Tablets support:";
        STR_ABOUT_INFO_19 = "Yes is possible to use this app on phones and tablets, but this app is design to be used mainly on TVs, the support for other device is limited and because of that not released on play store, use the bellow link to download latest APK and manually install it";
        STR_ABOUT_INFO_20 = "https://github.com/fgl27/SmartTwitchTV/releases";

        STR_CONTROLS_PLAY_0 = STR_SPACE + "or in player bottom controls";
        STR_CONTROLS_PLAY_1 = "Show information panel: Press enter key or D-pad keys if chat and live channel feed is not showing";
        STR_CONTROLS_PLAY_2 = "Close the video: press back key twice or media key Stop";
        STR_CONTROLS_PLAY_3 = "Play/Pause a video: open information panel and click on pause symbol";
        STR_CONTROLS_PLAY_4 = "Show user live channels feed: D-pad up";
        STR_CONTROLS_PLAY_5 = "Change video quality: use the player bottom controls Quality";
        STR_CONTROLS_PLAY_6 = "Force refresh a video (in case it freezes): Change video quality to the same";
        STR_CONTROLS_PLAY_7 = "Show or hide the Chat : D-pad right or key number 3" + STR_CONTROLS_PLAY_0;
        STR_CONTROLS_PLAY_8 = "Change Chat position : D-pad left or " + STR_KEY_UP_DOWN + STR_CONTROLS_PLAY_0;
        STR_CONTROLS_PLAY_9 = "Change Chat size : D-pad down" + STR_CONTROLS_PLAY_0;
        STR_CONTROLS_PLAY_10 = "Change Chat background brightness: change in player bottom controls";
        STR_CONTROLS_PLAY_11 = "Force refresh the Chat in Live streams (in case it freezes or doesn\'t load): use the player bottom controls Chat force disable (click twice)";
        STR_CONTROLS_PLAY_12 = "Start a search: open information panel, navigate using use Directional pad (left/right) to \"Search\" and press enter";
        STR_CONTROLS_PLAY_13 = "All media keys are supported (play, pause, stop, next track, fast forward, etc...)";
        STR_CONTROLS_PLAY_14 = "Chat and video (Side by side): Color button red (A)";
        STR_F_DISABLE_CHAT = "Chat force disable";
        STR_UPDATE_AVAILABLE = "Update available, check google play store";
        STR_OAUTH_IN = 'Adding a key allows the app to access live user content faster, follow/unfollow channels/games and access subscribed only past broadcast (for channel you are Sub to and block VOD access to none subscribers) <br> <br> Add a key is not demanding and can be done at any point later <br> <br> In doubt read this link <br> <br> https://github.com/fgl27/SmartTwitchTV#authentication <br> <br> For some devices is necessary a mouse to complete the authentication action.<br> <br>add key for';
        STR_USER_CODE = "Add Authentication key";
        STR_USER_CODE_OK = "Key added OK";
        STR_KEY_BAD = "Key test failed, new one needs to be added";
        STR_KEY_OK = "Key test return OK";
        STR_OAUTH_WRONG = "You try to add a key for user ";
        STR_OAUTH_WRONG2 = " but this key is for user ";
        STR_FALLOWING = " Following";
        STR_FALLOW = " Follow";
        STR_IS_SUB_NOOAUTH = " And you have not set a authentication key the app can\'t check yours sub status.";
        STR_IS_SUB_NOT_SUB = " And you are not a sub of this channel";
        STR_IS_SUB_IS_SUB = " You are a sub of this channel but ";
        STR_OAUTH_FAIL = "Fail authentication check with the provider key, please check and try again";
        STR_OAUTH_FAIL_USER = "The added key doesn\'t belong to the user ";
        STR_NOKEY = "No user";
        STR_NOKEY_WARN = "Set user and an authentication key to be able to follow/unfollow";
        STR_NOKUSER_WARN = "Set a user first";
        STR_RESET = "Restart the";
        STR_CLIP = " Clip";
        STR_CHANNEL_CONT = "Channel content";
        STR_NET_DOWN = "Network is disconnected, the application can\'t work without INTERNET";
        STR_NET_UP = "Network connection reestablished";
        STR_FALLOWERS = " Followers";
        STR_CANT_FALLOW = ", Can\'t fallow or unfallow ";
        STR_GAME_CONT = "Game content";
        STR_YES = "Yes";
        STR_REMOVE_USER = "Are you sure you want to remove the user ";
        STR_PLACEHOLDER_PRESS_UP = "Press Up to ";
        STR_FALLOW_GAMES = "Followed Games";
        STR_USER_GAMES_CHANGE = "Change between";
        STR_GUIDE = " Hold enter";
        STR_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        STR_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        STR_STARTED = "Started ";
        STR_VIDEOS = "Videos";
        STR_VIDEO = " Video";
        STR_REPLAY = "Replay";
        STR_STREAM_END = "exiting in ";
        STR_STREAM_END_EXIT = 'press "Return" to exit';
        STR_FEATURED = 'Featured';
        STR_CREATED_AT = "Created ";
        STR_OPEN_BROADCAST = "Open the Broadcast";
        STR_NO_BROADCAST = "No Broadcast";
        STR_NO_BROADCAST_WARNING = "There are no Past Broadcasts for this clip";
        STR_NO_CHAT = "And because of that no chat";
        STR_IS_NOW = " is now";
        STR_OPEN_HOST = "Open the Hosting";
        STR_SETTINGS_PLAYER = "Player related";
        STR_SETTINGS_BUFFER_SIZE = "Start Buffer size:";
        STR_SETTINGS_BUFFER_SIZE_SUMMARY = "How much is needed to buffer before starting the playback, this is not related to maximum size the buffer can be, a lower value here will make the player start playing sooner, but it may cause re-buffering which will cause the player to pause to buffer.";
        STR_SETTINGS_BUFFER_LIVE = "Live streams Start buffer";
        STR_SETTINGS_BUFFER_VOD = "Videos (Past Broadcast and Highlight) Start buffer";
        STR_SETTINGS_BUFFER_CLIP = "Clips Start buffer";
        STR_SETTINGS_GENERAL = "General";
        STR_SETTINGS_LANG = "Language";
        STR_LOADING_CHAT = "Chat: Connecting to chat server..." + STR_BR + "Chat: Connected." + STR_BR + "Chat: Joined channel ";
        STR_VOD_HISTORY = "Play from the start or from where you stopped watching last time?";
        STR_FROM = "From:" + STR_BR;
        STR_FROM_START = STR_FROM + "Start";
        STR_CHAT_END = "Chat: The Chat has ended!";
        STR_TIME = ", Most recent";
        STR_VIWES = ", Most views";
        STR_NOKEY_VIDEO_WARN = "Set an user authentication key to be able to see followed videos";
        STR_SWITCH_TYPE = "Switch: Most recent or views";
        STR_ENABLE = "Enable";
        STR_DISABLE = "Disable";
        STR_RESTORE_PLAYBACK_WARN = "The app was closed while playing, restoring playback";
        STR_RESTORE_PLAYBACK = "Restore playback";
        STR_RESTORE_PLAYBACK_SUMMARY = "The app saves what was playing in case it gets close unintentionally (changing apps the system may run out of memory and close it) or force closed by the user, the app then can restore what was previously playing on next start";
        STR_CHAT_FONT = "Chat font size";
        STR_VIDEOS_ANIMATION = "Video\'s animated thumbnails";
        STR_SIDE_PANEL = "Side panel: D-pad left or Back key";
        STR_SIZE = "Size ";
        STR_BRIGHTNESS = "Brightness ";
        STR_FORBIDDEN = "Forbidden content, this is restricted in yours region or is restrained to the official Twitch app only";
        STR_JUMPING_STEP = "Jump step ";
        STR_SECOND = " second";
        STR_SECONDS = STR_SECOND + "s";
        STR_MINUTES = " minutes";
        STR_CLOCK_OFFSET = "Clock offset";
        STR_APP_LANG = "Application language";
        STR_CONTENT_LANG = "Content language";
        STR_CONTENT_LANG_SUMMARY = "Press enter to change";
        STR_LANG_ALL = "All";
        STR_NO_GAME = "No game from this";
        STR_JUMP_BUFFER_WARNING = "Isn't possible to jump during buffering";
        STR_CHAT_DISABLE = "Chat is force disabled, enable it in player bottom controls Chat force disable";
        STR_CLIP_FAIL = "This clip/video failed to load. Can't replay";
        STR_CHAT_BRIGHTNESS = "Chat background brightness";
        STR_PLAY_NEXT = "Play Next";
        STR_PLAY_NEXT_IN = "Playing next in ";
        STR_PLAY_ALL = "Play All";
        STR_AUTO_PLAY_NEXT = "Auto Play next clip";
        STR_SIDE_PANEL_SETTINGS = "Back to Main menu";
        STR_UP = " Press up";
        STR_HOLD_UP = " Hold up";
        STR_LIVE_FEED = "Live Feed";
        STR_END_DIALOG_SETTINGS = "End dialog";
        STR_END_DIALOG_SETTINGS_SUMMARY = "Set the time that it will take for the stream/video/clip to end dialog taking action";
        STR_END_DIALOG_DISABLE = "Disable the timer";
        STR_CHAT_SIZE = "Chat size";
        STR_CHAT_POS = "Chat position";
        STR_CHAT_VIDEO_MODE = "Video mode";
        STR_CHAT_SIDE_FULL = "Full screen";
        STR_CHAT_PP_SIDE_FULL = "Big plus small screen";
        STR_CHAT_SIDE = "Smaller screen and chat";
        STR_CHAT_5050 = "50/50 and chats";
        STR_CHAT_DELAY = "Chat delay";
        STR_SPEED = "Speed";
        STR_QUALITY = "Quality";
        STR_NORMAL = "Normal";
        STR_AUTO = "Auto";
        STR_DEF_QUALITY = "Default player start quality";
        STR_DEF_QUALITY_SUMMARY = "Used when the app is first opened, after the user change the quality that becomes default for that section, a section ends when the apps is closed";
        STR_VERY_LOW = "Very low";
        STR_LOW = "Low";
        STR_HIGH = "High";
        STR_VERY_HIGH = "Very high";
        STR_THUMB_RESOLUTION = "Thumbnails quality";
        STR_THUMB_RESOLUTION_SUMMARY = "Default thumbnails resolution for live, videos and games (can't be applied for clips) a lower value will help the app load faster but the thumbnail may look blurry";
        STR_PAYPAL_SUMMARY = "Donations use above Email.";
        STR_PLAYER_PROBLEM_2 = "Connection failed, unable to load second stream info";
        STR_PLAYER_RESYNC = "Player Auto Sync";
        STR_PLAYER_AUTO_BIG = "Main window";
        STR_PLAYER_AUTO_SMALLS = "Small window";
        STR_PLAYER_AUTO_ALL = "Both windows";
        STR_PLAYER_MULTI_ALL = "All windows";
        STR_PLAYER_WINDOW = "Window ";
        STR_PLAYER_BITRATE_UNLIMITED = "Unlimited";
        STR_PLAYER_BITRATE = "Auto quality Bitrate limit:";
        STR_PLAYER_BITRATE_SUMMARY = "The maximum allowed bitrate for the auto quality, this is used to prevent lags on low end devices when playing a vod or live stream (very useful in picture and picture mode), also helps to limit internet bandwidth use, the recommended is 3Mbps for small and unlimited for main for most devices.";
        STR_PLAYER_BITRATE_MAIN = "Main player bitrate";
        STR_PLAYER_BITRATE_SMALL = "Small player bitrate (for Picture in Picture mode and Multistream)";
        STR_PLAYER_BITRATE_SMALL_SUMMARY = "Different values for Main and small player bitrate may cause a short buffering when changing video source, to prevent this set both values the same at the cost of possible lag, the best indicative of too high bitrate is a constant accumulation of skipped frames or a constant buffering of the stream.";
        STR_PICTURE_LIVE_FEED = 'Hold enter or press 2 to start "Picture in Picture", then use D-Pad left to move, right to resize or down to change videos';
        STR_AUDIO_SOURCE = "Audio source";
        STR_PICTURE_PICTURE = "Picture in Picture or 50/50 (For Live streams only, add a user to use it):";
        STR_PICTURE_CONTROLS1 = "Enable picture in Picture mode: Playing a video press up to show live feed choose a stream then hold key enter or press key 2 to start";
        STR_PICTURE_CONTROLS2 = "Change small window content: Same as before, hold key enter or press key 2 after selecting a stream from live feed";
        STR_PICTURE_CONTROLS3 = "Change big window content: simple key enter click after selecting a stream from live feed";
        STR_PICTURE_CONTROLS4 = "Change content between windows: D-pad down big becomes small and vice versa";
        STR_PICTURE_CONTROLS5 = "Change small window position: D-pad left";
        STR_PICTURE_CONTROLS6 = "Change small window size: D-pad right";
        STR_PICTURE_CONTROLS7 = "Change audio source: use the player bottom controls Audio source, if in 50/50 mode use d-pad down";
        STR_PICTURE_CONTROLS8 = "Auto Sync playback: use the player bottom controls Player Sync";
        STR_PICTURE_CONTROLS9 = "Manually Sync playback: Is a workaround use the player bottom control Speed to slowdown the stream that is in front or vice versa";
        STR_PICTURE_CONTROLS10 = "Picture in Picture video quality: Check in app settings Auto quality Bitrate limit";
        STR_PICTURE_CONTROLS11 = "Close small window: back key twice";
        STR_PICTURE_CONTROLS12 = "Enable 50/50 mode (Two stream two chats): If already in picture in picture mode use bottom controls Video Mode or when in video mode smaller screen plus chat hold key enter to start from live feed";
        STR_KEEP_INFO_VISIBLE = "Keep player status always visible";
        STR_SINGLE_EXIT = "Single return key press";
        STR_SINGLE_EXIT_SUMMARY = "Exit the player or exit picture in picture or exit 50/50 mode with a single key return click";
        STR_NOW_LIVE = "Now Live";
        STR_NOW_LIVE_SHOW = "Show Now Live notification";
        STR_NOW_DURATION = "Now Live notification duration in seconds";
        STR_GLOBAL_FONT = "Global app font size offset";
        STR_GLOBAL_FONT_SUMMARY = "This will change the size of all text and most icons in the app (minus chat font size, because it has its own control), too small value may not be visible too big value will overflow the text box holder, that is way this value is limited";
        STR_MAIN_MENU = "Main Menu";
        STR_USER_MENU = "User Menu";
        STR_CH_IS_OFFLINE = "Is offline";
        STR_SCREEN_COUNTER = "Show screen position counter";
        STR_SWITCH_POS = "Switch: Starting Position offset";
        STR_SWITCH_POS_SUMMARY = "Instead of starting on the first possible video, start a a lower position on the list, prevents having to go down and down to find a older video";
        STR_USER_OPTION = "Choose a option for user";
        STR_MAIN_USER = "Main user";
        STR_USER_TOP_LABLE = "Click on a user to see options";
        STR_USER_EXTRAS = "User: Switch, add, key";
        STR_LOW_LATENCY = "Low Latency";
        STR_LOW_LATENCY_SUMMARY = "If start getting buffers issue disable " + STR_LOW_LATENCY +
            "<br>Use " + STR_SETTINGS_BUFFER_LIVE + " equal or bellow to 1 for this to have effect";
        STR_LIVE_FEED_SORT = "Live feed sort";
        STR_LIVE_FEED_SORT_SUMMARY = "Sorts side panel live feed and player live feed";
        STR_A_Z = "Alphabetical A - Z";
        STR_Z_A = "Alphabetical Z - A";
        STR_APP_ANIMATIONS = "Enable app animations";
        STR_RUNNINGTIME = "App running for:";
        STR_410_ERROR = "Unable to get stream link issue";
        STR_410_FEATURING = "Third party app are current without access for this featuring.";
        STR_CLICK_UNFALLOW = "(Press enter to unfallow)";
        STR_CLICK_FALLOW = "(Press enter to fallow)";
        STR_TODAY = " Today)";
        STR_DROOPED_FRAMES = "Skipped Frames: ";
        STR_BUFFER_HEALT = " Buffer Size: ";
        STR_AVGMB = " Avg) Mb";
        STR_NET_ACT = "Net Activity: ";
        STR_NET_SPEED = "Net Speed:";
        STR_LATENCY = "Latency To Broadcaster: ";
        STR_WARNING = "Warning";
        STR_ABOUT_PHONE = "This app is design to be used mainly on TVs, the support for other device is limited and may never receive a better support, if you don't have a keyboard or a D-pad + enter key controller use the on screen virtual D-pad + back key to navigate, in settings you can change position and opacity of the virtual D-pad, click anywhere on the screen to show the virtual D-pad when it is hidden it doesn't work.";
        STR_DPAD_POSTION = "D-pad screen position";
        STR_DPAD_OPACITY = "D-pad opacity";
        STR_BLOCKED_CODEC = "Blocked Codecs";
        STR_BLOCKED_CODEC_SUMMARY = "List used codecs capabilities and allow to block a codec from be used";
        STR_CODEC_DIALOG_TITLE = 'Software codecs (OMX.google) usually have a worst performance but on some device they may have precedence over hardware codecs, using this one can block it and see if the performance of the app improves, <span style="color: #FF0000;">by default OMX.google decoder is disabled</span> a constant accumulation of skipped frames is a indicative of a codec issue.<br>The app content only uses avc/h264 decoders no other is listed.';
        STR_SUPPORTED_CODEC = "Supported codecs:";
        STR_MAX_RES = "Max resolution: ";
        STR_MAX_BIT = "Max bitrate: ";
        STR_MAX_LEVEL = "Max level: ";
        STR_MAX_FPS = "Max fps per resolution:";
        STR_MAX_INSTANCES = "Max instances: ";
        STR_UNKNOWN = "Unknown";
        STR_ONE_CODEC_ENA = "At least one codec must be enable all the time";
        STR_USER_LIVE = "User Live side pannel: from side panel D-pad left or from anywhere key 3";
        STR_PP_WORKAROUND = "Picture in Picture old OS workaround";
        STR_PP_WORKAROUND_SUMMARY = "On some devices running android N or older, is need to enable this, to have PP mode working, don't enable this on a device that doesn't need it as it will result is a lower image quality";
        STR_PP_WARNIG = 'For some devices most running android N or older, is needed to enable in setings "<div class="class_bold" style="display: inline-block">' +
            STR_PP_WORKAROUND + '</div>" to have Picture in Picture properly working, if you can\'t see the small screen exit the player and enable that on settings';
        STR_HISTORY = "History";
        STR_WATCHED = "Watched on ";
        STR_UNTIL = "until ";
        STR_SORTING = "Sorting";
        STR_DELETE_HISTORY = "Delete this history";
        STR_NAME_A_Z = "Name A - Z";
        STR_NAME_Z_A = "Name Z - A";
        STR_GAME_A_Z = "Game A - Z";
        STR_GAME_Z_A = "Game Z - A";
        STR_VIWES_MOST = "Views highest";
        STR_VIWES_LOWEST = "Views lowest";
        STR_NEWEST = "Watched newest";
        STR_OLDEST = "Watched Oldest";
        STR_PRESS_ENTER_D = "Press enter to delete";
        STR_PRESS_ENTER_APPLY = "Press enter apply the changes, back to exit without applying";
        STR_LIVE_VOD = "This Live stream is now a VOD<br>opening the VOD from where you last stop watching the Live";
        STR_BACKUP = "Allow the app to make and restore backups?<br>(Users and they history will be backup)" + "<br><br>" +
            "Click Yes the app will save backups for future use, and restore a saved backup if app data is empty." +
            "Is necessary to give the app storage permission for this, so give before click yes." + "<br><br>" +
            "If you don't give storage permission no backups will be ever made." + "<br><br>" +
            "The Backup folder is Main_Storage/data/com.fgl27.twitch/Backup";
        STR_DELETE_SURE = "Are you sure you wanna to delete ";
        STR_CREATED_NEWEST = "Created / Uptime newest";
        STR_CREATED_OLDEST = "Created / Uptime Oldest";
        STR_THUMB_OPTIONS = "Thumbnail Options";
        STR_HISTORY_LIVE_DIS = "Live history enable";
        STR_HISTORY_VOD_DIS = "VOD history enable";
        STR_HISTORY_CLIP_DIS = "Clip history enable";
        STR_OPEN_GAME = "Open the game";
        STR_OPEN_CHANNEL = "Open the channel";
        STR_THUMB_OPTIONS_KEY = "Press enter above a action (to open or apply it), back to exit without applying";
        STR_DELETE_FROM_HISTORY = "Delete this from history";
        STR_CHECK_HISTORY = "Checking fallow status";
        STR_REFRESH_DELETE = "Refresh the screen after delete to see the change.";
        STR_THUMB_OPTIONS_TOP = "Hold right for thumbnail options";
        STR_REPLACE_MULTI = "Choose with to replace by the above?";
        STR_REPLACE_MULTI_ENTER = "Press enter to replace or back to exit without.";
        STR_ALREDY_PLAYING = "Already playing this";
        STR_STREAM_ERROR = "Stream error";
        STR_MULTI_EMPTY = "Ended and/or empty";
        STR_4_WAY_MULTI = "4 way multistream";
        STR_CONTROLS_MULTI_0 = "Multistream help:";
        STR_CONTROLS_MULTI_1 = 'If you are having lag issues after enable multistream, try to lower the value of "Small player bitrate" in settings, accumulation of skipped frames or constant buffering is a indication of too high bitrate or slow internet';
        STR_CONTROLS_MULTI_2 = "Add streams: open live feed key up and click on a live stream";
        STR_CONTROLS_MULTI_3 = "Replace streams: after multistream is full choose one from live feed and chose one to replace from the dialog";
        STR_CONTROLS_MULTI_4 = "Change audio source: D-pad right or left";
        STR_CONTROLS_MULTI_5 = "Exit multistream: from player bottom control or Back key twice";
        STR_CONTROLS_MULTI_6 = "To close this open 4 live streams";
        STR_PICTURE_LIVE_FEED = 'Hold enter or press 2 to start "Picture in Picture", then use D-Pad left to move, right to resize or down to change videos';
        STR_MULTI_TITLE = ", Click on a thumbnail to open or replace a stream, use D-pad left/right to change audio source";
        STR_FEED_END_DIALOG = ', Press back to go back to top menu';
    }
    //Spacing for release maker not trow erros from jshint
    var IMG_404_GAME = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVQAAAHbCAMAAACjqpKKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABjUExURQAAAFNTX1paYlBQWwAAAv7+/v///VJSXv///1FRXUtLU0VETQkIDFVVX05OWO/v8FJSWxYWGEJCRCkoLX5+gaurrjIyNru7u+fn6dLS152coXZ1e8TEyGhobPf3+d7e34uLj6Msg3EAABAXSURBVHja7N2HgqIwFAVQICA9Iih29P+/chNCExJs6IT1Pt2doo7MmZdCSMBwEZOHAQKgAhWoCKACFagIoAIVqAigAhWoCKACFagIoAIVqAigAhWoCKACFagIoAIVqAigAhWoQEUAFahARQAVqEBFABWoQEUAFahARQAVqEBFABWoQEUAFahARQAVqEBFABWoQAUqAqhABSoCqEAFKgKoQAUqAqhABSoCqEAFKgKoQAUqAqhABSoCqEAFKgKoQAUqUBFABSpQEUAFKlARQAUqUBFABSpQEUAFKlARQAUqUBFABSpQEUAFKlARQAUqUIGKACpQgYr4GVRTfPDLkDxefc80gTo9av0soE6KqnwKUF9FLR8nhAAVqCj+aKiA+iBqgi7VJEGI8DSpbyWUxEkV9eOUmIRYpk+thLgEqE+hxj5J2C2gvSDsFgTUZ9z8CUB9BpXVA5QkNOxHkLL/0jBIEkKSxDeB+gQqNVkxT2KriXN1s8p/cUzLTEamPoXquwml58NGHmsrYKQmUJ9C5T37IFjvi14seRS7jRWydoq1ZkB9BpU18EFw3Tn98BzP85ztmaFSoD5fpzLUi8cJxa2MxaJYOF6xOaeM9H9FFfs0vLU2zfqrd6LpkbKuP0Pde71YsPAchhpSXv7frlTNKvREdb+Cuuih+kB9BXUxjBrVnABV7+Ivdtu/ger8DKrfDoZ8tE4V7VaJmvz/qP40Q0fPocZA1RG13tXQGNWcEtX9WdQhCiHl+JHYYvLOXyuU9lMb1Em6VG73KEO5vc8T/weo0/ZTZ4FabxQyFajzQhUb+GwLxp6vQO00VL+M+kq3AKgfQFUX/8lRy5b1V1CJn3wDNdEZlZjsbhLXZNvlU/aVK47XkwrVfzDc6hg/nycV0CEqH6wuUVPiBnF78OXVMMsuYB2vDV98DNWP2T02Y5Y7cczSrDJlm8yUE25c3h5InEqVvUq2R1Wi1iP/cWv6aqLyPrXJPohR1dd6K58r/rHPCiMlfL4DqWc+BJRPfHgt2OvSdL2XFH6Po1ppmATJqz98GLwO4M2jXqisgJuE+kEQhBNFmktQeZ7yY1RxnoaTRUDLwu+/OCT0ueLPCk/sutaUkcSShqrgrsX2nCSTvlXCqlPWrJq6ZSorssRaXw+qCRDPx+G0k6GyXN1vpovDYX1OKPVfnpn5QVRWk5LzenO67HbLyWIx2E0VqNO9Q7Hc7TfXc8xZXxy6/GSXyrSY6X4npju8Hbzy5CNSfVRHVABOXb2++zbsXly21+PZZB1BU4+GqplPGruBdT1dlkXheN40rsLts8HfgCXrZXOk1PTLHsDTXYCPoRJiWscNn6Uz6a/8cVSvnEnkFCdWA8S8wOmESql1PJyKZjtng1q9x257ZRWAq1emBsGZtdVFPeXJmQ+qyIIlq1fNkJhaoNa7iUHACn8hEJwZFX+nep+i2GuIGh5PRWPgzKmhEuXKuVzjwNUP1Wn+7rMq/tXmXg5x6GuHuheFacoOwLeKP/+4Y6hUD9R6MZnI1BmHszskfOBbJAoB6vSovk6oizl6ljvDLaqvCyoRqIv/ANUH6hSkYiqRQH3l4AxQH0HVo/VP/itUd26oi4V28DeoRAfUes2jCnXBdqurXQKxtkyshSj3EPiX8v3Guk8unjkWj+4wdRcMFovbP634knf+iU8I+fuG6i6qaFqbHZfm9ymH7eWok47JyH6+EtWfB6pXJ0gdizbHut/u5l4nsSYP8aaep0T1fe1RHWe3P+0VcdoqYv/hWHo3uyldVC1a/3uZutyuj2tpXI9WmEqDntefjONhL2upWlTdGyrWptI0DPgkEBrQoA7+GU1Xtm0bkojyzlMnjzA9n24buB6qq33rvzsEOUMVc4GC5saVR1HFk8V97HZnPk//M/aSlKOqM1WHQ9T3Ud2QuOXK9c5MBT5HyAqySI66SvmBzfJp9Vm9VP/M0XCrOdl+/XP4G9PgOIJaP21qVLMzWd9vGQRg0kyRrGZ0VuOPHNVToFK/Ra1/2xFUm6Fa1a/nq/+Q4rPu9/ofZWXZdGl4vJ+p30Gte3CDJ1dKZaay/tIQlR+kcAdJRJKRTM2T2Jwo+kN5WqFWieqSXpTYfNbzaKaS5mQzzQzm8eJvNc8kNze/fr/OW0u2pn1I60zldZN0I0U6JEGqQmU7f5JMdU2GaqtR3Tvp51YVyk312flYRzU7Pm7rDt2KvySa0x2lZfGXoCYhn/jhN0kmco6SeLT4Vwt/E/JmDOpVnVD55rE/eNyrS5tE4ZvqKVAJXwtQN6gVVmxZNIsMRUNlWapzm3S+pX6ws2FxHItFWc0vEuiDKrY1jlVTkWm4lhb/5cEKFC/iqIYKdargqPX6DNFtCfQq/uX6hl7U+0mhvPiXe1Ty/aMkzKSFnxd/mky1/1Qtkvhz1Juy1bTWlMZxmGfqCLZeMRzf3K3Vr1DuUa2ysTcaf3Dw5DwNErb1bswzhLTFvx3++xpqbwIKT9QkyLNVpIx8IxkFdS7nKLIVr7AlqOw77Bbxm+p1tvIHymK1ylLq8lOt8tOH+u0Mhb9CvVmKR8N8VTrcRsORHZybmelibPRytkdjgGrcNF72+8HynlVApugOmn+OemNKwmzM1DZYpnZH7Ksx4WdR+64SpGdRoyjLA5N14vhSr79Gvdm9I0G+GkfpFf/HUFfDiOxuriqlVtKXKp7NagBKk4TySuAPUeuatP46TLPoKdSm+I9lVjYYjj4eU957vZd96bE39F1+GaxUfztWAyQxS1by96id3dJUFH5DHQy1GDZV/Uy9fU24Gaxr2l1Xxt2Izpfdkq/X2jWxZLdrJqlLRL2ah3FMdUPN75ka0tZ/DJV9Hu+Hh+YYqm2o34krGdG6qA/ItksBHW+TyRo+Q1QAVsxrgL9v/Utd0yex5eaR/QiqLFPVL7HpadgJeyhTjzvJ2SoXh0z1RnYW8ssGkP8ctfx2MEQtPoTKM5Ukv4nqFGXxH8lufmeoTnVe5e5M9hHUFUMtr7WgEWqSR+Okc0BNXB32qD6JaowU/4lRy04VQ+Vj1rqhGnNHFUcvdUQd7/xPjqro/KtQpfsmLaqudeqkqOH2W6isSyVOtqod6gStf/lDbLv6JBzLVP6sSFn8vf67jTRUOmYqnRCVHyxpY3A2H8dZbpK0mbiWTYNq/OeodmRtOnMml8M5uZfODMt1BtSHUJmHM3auhWpWbvn/NgXqI8U/Wi87Tczg+UX9nfIkF0B9FHXniMv2qNZIVydJ458A9UHUsvg7qvMC8FNOtqPcmxyoj6JWiSpfhVKedbJ6HKjPZOojS3OUqLy1Wzpe7+Atu8tQbaDeRy2ZRGvXq5Ud77C6s+8PVCmqOH4tMtXrL5A6KLq1yNSHUJONbP3VNZGtIMojoN4t/pw1y2V8Rzl1BtSHUKtJV7fjWcb5Ils3yTq7QL2PKpl0Vcb5IvtJ2xyo9+pUu+0o3Uy64qh7R7LemKFG6PyPdv7HwtrL/jibHLupd3ZTn0X1fgL1zQGVsTj/Lup7Q3/I1A8MUgN1gGrfO5zi3TucAlTZIerRA3/e3QN/qFOfP0Tt3DtEjUz9wLQfoI6i2kCdA+oZqCj+k6O+OukXqEDVAvWxhRSoUz+w5Oe1TE1+IFN5638ZnpPy8FLxt9l+gn2+DE5nybS2qR3pt5DiU10q2w63g1WUl/XKMJ5nLV9gnQZXwtstd5vctn8DVRwKyazhOSPD6JWSX25cLj2dpbX6LVTZAvPIeK3150tWV8oF6z9S/G3b+FL8EqrU1TZe7qUa0i0UZ7KIfqWhmj4j1Yn6M62/NCtte9qawRbL/W1k6ofq1PI0SkAFKlCBClSgAhWoQH0ftTl9sgSVzAU1Mt7Y85xMtRr5Z2jtSWnrXC2v8SVO9EzmgWrZXxw6Uauu8vp0w+1lPlpUb5aotgaotH9Bmtmi7q6K6yN9OeJje97Lw37mmVrst1rEqX+Rr97FaGeF2l567o/Dc5pLMvYnG88Pddpr079zvcT6vvDmjiqm9RfO36MunEV1L3qsM0TV6Tq+bXQrKH511upitMl3Lpz436N6QJ2Gtf8IUF9WbW4eUL+Qwx5QP4DqAfV/QCVA/SDqaGQHp7kkhTMbXN5L5cE7/1ZIxBmWv4h6Z3QtPxTNLv6s8lRMDRYj/7FuqNedU+iyq/9UspaZ6lz4bqqlF6qRXS9F9zwIMxGtKtViebryK7xqhro6bi9LnQu/pNvfDk8u95t1HGhWp/KrEx23y5GTI+ixmyo/uwirUbfXf+3dAVPaMBiAYWPwcmmbmNLZUxD1///KJU2rE+nqmMAXfd/bbYNznDxLWoRAdsZbYSN1tWriUTU/ySdQ9fBP/dMQuHl6fNk546VN/7SCv9o8Pt8+iX465eDsv71/uNtW2nkv7Zia3hZRb++ex1cshJVZbw5O/5s497c7pUP4uIH5xUdq2pt3t3l4TtvE3Qpr/hu6v3+Ix9O0AWDQ0lDTMpCrVduH7S+JvWzu5tpsXnbKp+NphBWGmj8ZZdpWV1pd9dd9wFXaad0eN1BP+JDq3Rt5Lr/Q5+NDk6qerfJ62CZSKSVtpOa3gVx+OdrhZT9rF9Km7/5Dw2bw+ckpFbzAE9Ufh1dxqNdOG7s/v+O5KaixiKrPjro4//N7luSN03Gkpv2o1Ove2mMu6OkK7825pr/SyoZrv/wkteTySLUma6bf7bvdy/+vo1A1qKCCCiqooIIKKqjHoI6Pgu3nV6iUgWpOEKiggloAqgEV1BJQlTGgfnNU/R1Qg1KXQZ0wpzdpqfgXrZxeXp8qmHR8OUUb66WhXpXbMFKDDkaD+tWvUVmjmP5fZ5pRtQX1C02HF/7ivRKG2q6KVU2oXURVpzmkHosaH1K1hQ7V4dNTm6ar5aHadds0JY7V0bTtK6cuNv3nWvddsypQdZU/57evK+VURH39oUYCqq2Go2ppqtk0Tn6v44nq7fQvA9XpustHgOJq2jj54zgdlkqKQtXW133XNiWadn3t81J+JWz6K5VVi6vt1j6k5fw2rT8ThZpOnb6Op6vC6vt+7Z3TaXFfvAtaFKqJB6Sgp8/Lq6Y/xTcs6w3DutN4D6wVNlLjL+XcdWHFbzie9cNwWtDayDqmjgX3j03LlJcu718/dztLt7d/vQnm5F2ZM/d65xYu718/dztLt7d0vUhUW1hFoB77n7B0eQlh7uvm/t23Rv0JnX36f3bELt3+Z2fAOUcoqBxTOaZyTIUAVFBBJVBBBZVABRVUAhVUUAlUUEElUEEFlUAFFVQCFVRQCVRQQSVQQQUVVAIVVFAJVFBBJVBBBZVABRVUAhVUUAlUUEElUEEFlUAFFVQCFVRQQSVQQQWVQAUVVAIVVFAJVFBBJVBBBZVABRVUAhVUUAlUUEElUEEFFVQCFVRQCVRQQSVQQQWVQAUVVAIVVFAJVFBBJVBBBZVABRVUAhVUUEElUEEFlUAFFVQCFVRQCVRQQSVQQQWVQAUVVAIVVFAJVFBBJVBBBZVABRXUH9tvlWLdWXsgA/8AAAAASUVORK5CYII=";

    var IMG_404_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAASFBMVEVHcEw1NTXb29swMDB9fX1DQ0NeXl5RUVFtbW3m5ubT09Pg4ODKyso7Ozufn5+9vb2urq62traQkJClpaWJiYmYmJjCwsLq6uo9xg8yAAAAF3RSTlMACeoDbBxBLlX54PHUEZnCrbiFonuQyd/Z9QoAAAhdSURBVHgB7MGBAAAAAICg/akXqQIAAAAAYO7qJdtSEIbC8AKREB4icI57/jOtzm1Ur1ZdFRO/GfxxqzdbTFnJex9+eO9pLWZ5fbgpFFwf7cg2MeNvnGw+2uguUDFvfOaFQt+zZfwT27z3QOU9ezDkvtUy/gvb4+vIvCF+RMYvcRyqj7CGLTNO4ryFVWM9uZZwkdQcqatnXIqrnhusP/VX4+YUvAuL3yxuYze/CH/4FTergmdAPWKC2Enk9mkkTJKGF9fvd8ZEvHth+ZhO0AloQr7gE9BgPIQHPZ5fPhYPsp/ybH/IeFgOT66/QYBGD+UvLkEE+1me6PcVYlQ/Pd90hiDczdx+qhCm0sx+lyBOctPy1x0i7eucfh8hVPRT5s8Qi93t+WWDaFu5t58OCHeQ3Ndf/4cgJCiQwl39Dkp8bslfvlDju1zfbwYUGeby/h2q7BdfoDQo08ql/RXq1CK6f4Kj6N+/jA2YBqWa0f/9F/AvGFBsnO/vUK2f7XdQzp3rDwzlOJzpJwv1Ev2+f424EScb83HkaNOf9u5Ex3EQCQPwjznA+D7sev83XWnVGu1oZ9Jp8pcTNP4eIN2xOaqgCK0oyh6F7CJKunPbU/SDMdYaM/iY9u3sPi4cOERFHpO3ACx+Y30as6g4UCSJgnwEg78y4ciiIKFA7IRucgO+MbjpIwZCa3phW8Lbas76AT81CtmU8LQ0Cdn47gEgpzcXH6X3RgCbxw/5Tagajx+wM/v1F0hZmJb3pUCLRxG/vCktsr75jF0Ke7ypE8wfs2XvWuGZ+TOA/k5laq6fCYYsNF3Ai0J3eV44ftL3hw3dxeFQbLXa//urEtqI7y3vX43SW5dbLh0BHUjcheMgMQncQLMJS28ue9inAY2ZriqfGZrr465rY9NmwCM7v7NxpGv2ingPegbZfEnTXN/fAfTfzXrFH0mgS0LSef0GMEHBJCSrfhYUoCCoTwSOPAJ+7DjolIPANkJFbHXDwcSPgclG3TF6+vAGQGwCk8X/i0KyQM0iJEG/fWmwSUhGxTSoN1Bjer2Z0AnJDkW7kLjKhkD+MKj2ySdUTUIStdKAHap2pYTAfnoUyI8GrU6icVqosqeQBJ0ecEDZISSrSg+QBGVJZYE86O89scRWow+s7MdaQTAoq8bsukHdprBu5zshcVDnFBZHk7AkaLMa/+wmLBHqYkvvrybzWxUfv79mw14LkmygzmR6e3XCMuECi7A4elXUjAvM7Jopyy4K0Q8EuBmhb9mPVNcoLK1nl0UduMAhNIl9OniFPv7/OwvNjgvs5PJp29f3AKjJq+/q6wLUyDXIvzsISiAfjxlrewCO/HnXBELkJjuLVJwLEKaBU8ijqjLbC88J2Cw8zQBt1jTCkw11FpT2ohUhZjYQhSlBXRKmiCBMDuqcMCXyAz2g7hCmRH6gE9RN5Ca7C1PnocsOjTDtOIQqQFkQqgOzUO1QtgvVjEnqGgQW9v97ClUb1feFqHr0UlUfSMLVI0tVfWATroxGauoDvhGuBo2QOShyQtaglZr6wCRkLYStDaqpMBtaYZuhZhS2Fp2wtVExCGDr0AjdBiWr0DXIUk0T8I3QZWThG6tpAJLRC1/nwWd9J3w9JlGwKUXBfBNm0ZBAl0TDjFE05AFkQxYNI1ZRMYJsFBUrnOgIGh2Az6l9cj8odAA+hyBKNoUOwJcQW1Gy1nDPXcTQiRYHktCKktZz6wN0VgZiI1oaAyyipokg8FnU9BYYRU/v8TLfi54FwC6K+sj8/nwjf4Ql3wEbe/VbiIKo6tIn3/ObHqy0srSOess9f+3KZFG2WhSxqyjLBgBm0TZFFIiLaFsKSg6KNA4/5hpRdxRkmoWWSHj9dKlgu6FUe3g8zR+tFChdvz/lEt0R8ZR4NHKJbIqS7XLdGPGtOHZykfn6WyXbxXk84N3cymV2pU3ndhoffGIzJ2/xB9a7uZErBf6BdJFucfG7SxG6c3TBG4sv1vjgxrOTB9p979XW7md+C49ZvtH05zKP6zpuy9Q3zyRVJqy9TiGDE4pzj/hirT+F6Pz6ZBPGRlgctfKkGYPF/xpGodkG/DK4paX/4MkpLzqd17sjqHMqgUJvaBXISzJF8Wx5KuX3TD3cEeUFc8Df2L2TF7W7xZ8M7iTuYNue/vW/xFntmk6bet4G9qp3jWg6pVif8HcWxvWsrbsgJc6EJxiXpUh2Bt8Y9obQAwqDwewsnjOUvKneeTwhboQeUJQRjh7PM2n6aeMyeFI4GRUcidL6H7BhzD+4nNvieaZkrgmv/VDjOuDnhrQ18q1mTgN+KE4lm4K/c5ds9/i0Tg9eVzcdyaOA2dtXixd8V3CJcOlD2Kbcym/a5tzW5C1Khf7Vat6xYKenmB1icm5fj3E81t25FAeL1/j5xZL+oNz89e3ytFR8HOX0+Fg2dT9LBAuGwc1An/5m8l5aizfiw8X+lavgDvXCN33+lO8dhWeydnw+O5zynS6W1WOuqII/y2tYY/e43dTB9+VHmo4Hj82iFj7LI3PRsZzFoB6hK2gAj5tA9qiJK65i941q1e9ljoIp4NHqqENl7FQ6lv+xCSyoTuxK7wPeH7ea2oeBveR0jkOF7FL6i4/pwf2UFXgc2KeSI6oBdRpLBzPfPA6cauGb0sHMPQ6camH30nTWTg8Cp4qbwGlKxo+Aeo3F4eyqf3/g9RPBUXSjmUPNluLDzKG94JeS9bnyfG6vcg58sN+3l93m41C3pTyc9VkvCLi+DzSx7Mj2icpF+a82FT69EZUbmld2NGZxqN3ySjTrc0Ltjq8QuEz0qJ17aUXbonY2SRvwL0vi8E8LB/5txuKX2+12u91ut9vtdrvdbrfb7Xa7/Qf0wSAxhEqDGQAAAABJRU5ErkJggg==";

    var IMG_404_VIDEO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAFoCAMAAADw7LpjAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA/UExURVJSXlZVYDEyN0pKUlJSWlJRX09PWgAAAP///////vr7/JiYn0BAQ/T09by7wWlpaszMzYKChBAQEaGhpyIhJ3+BVNkAAAmaSURBVHja7d0PV9o6GAfgxoaMRqqCfv/PepMWQQSd22g5lz4P2zw67+i5/fnmT5O2aQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgJ9ITSi/p3+TMH5spn8z/j+GWIQQ0sSa9/TVN5NBPtam93xMG/Swf7vyXsH/dd6DMRTBGQvSWA5FkEMgmhDmCd6+Epa8JwHk0AdMabb3CmPeky4ge+04BE6zDEJq6UuzDLr5X4gxbrePs3ouCYwCuGSrQY1AbLdP67k9bdsY03AM9Sfg8tEdOV93GsCh8X1+Wa+78uvo+oH79M92637bhiCASw9gGQk0abuePoCf5PX6tS1v/VUAWU4THMJjycPMAey6/inFFARw6QFMTVsCuD5LXnf6+nMn//2FCpifNk0QwMU3wU0NYH8WwO7KLgcwaYI1wSEeK+CnMcOEAVzXJjh8PQpmKQEMMcbSBzyLydT5KxWwTfqApmHK2a8VcP2ekpxP8nfNYW9tdz984amNzZcVMDahicNcdSofBXQ5ARxDmK833B0HIef/4PcBDHFcHdGWDNYrNc7XkgI41cxfzv17+/67AO6XR7ShJLGm0flaTgBzfnmawsvHDubvAlha3/2S6eia8dIqYH59rmf/qkor+tofWvbfBzAMC3Ni07bDGh3rBu9Gen99NQgpv19De+1lWDG1r39SAdtUQtvG8PpcSmHUBC+qCS4BLIFYfXz9tWMF3LwehyI/qYBtG7ZPL/mxrQsHW+frLpye6FCnOoqPAcyHAIbhdfrdP3/VXNXX4Z1D+3g6Fv4ygPWQYpueX1/68v2PddVW0AT/34VynktDWHKwedh8VD572H5IRteVAG6uaGhL6xW/19NFWTWAcRhupGHAOwaxfpJK+7t92g+YawDF7y4a3Dq51r7tfp2on+6eT+ZL+rz99E3/YLd7KxGsI4mLAYxpnG4psRt+QEpJbsfi16273I0BHH56uIcAbt4upuT5WACHk37FANYMboZ5vMsVcJ++sN+kVCvgvvgN35cF8F4CGFalAX64HJHnT3PG16yA5fdDrH3KSwFsxg3qdcK5dv5K01uK3/DT0OU8LuMSwLupgKXQ/CCAXSmC162Av97aryrguB253jCmztOk58cy7jheB+yyAN5RANOPAjic9KsHcJjZuxjA/fbMuji6NL2H1Qo5D32BrAm+nwDWq1rzN8FjAEP4pgke7oj03vTWtncM3zobhCwngB+X4k8QwPR1E1xnXcJjLX613nXDcrAy/s37QxHA+wlg/HoQ0p0un7p+H/DCIGT9NFzmbeOh+H1ciHj4XAAFcJoA1hXRbVvHHesPl0g6ARTAOQI4bEqq447+8hYAAby3ADa3DWA8r4Avr+OMc+315U4A7953AexmD2DO4xrpcbT79e4lARTAKQKY3xfpv1/2EEABnLUCHj72ff7ujiACKIBXCWD4HMCxDe6Ge9LkLIAGIRMGsBxA+Lgk/2zr5tcE0DTMvwewvPt3AVwLoADesgIK4EICGASQhVbAKIACKIAsNICHaRgB1Ae8UQCjAArg7SpgGu+MsO4EUABv1wT/zW0HBVAAr7AnpLTAD9s83G5fAPUB5w5gaX8f3sbt7wKoAs4fwIfhhiDP47pTARTAmQN42HuXBVAAbxXAXa2AnQDqA96wAmqCVcCbBrAzES2AAogACqA+oACiAgqgAAogAiiA+oACyLIqYF6v+3GFYHdYJ+jWHAI4UwDz8ElX7wrd1yS6M4IAzlsBu9x/uDNlXn+1VEsA9QGnCGCpfa8P21oA87rPJ/foF0AVcI4+YP+4+7V73t+j8n2Zgj6gAM4UwNw/Dqu0NtuXnPv3p4QJoADOFcD8+L5SsH0aRiJrAdQHnHEU3D8e/+phWx+P+dU8YBRAFXCKPuDJgun26TgWyd3xyeqP7fnj1BHAawewVMHhkSH7rcN9zt341EIBFMCZAhjbuH0dZqaP0zK9AOoDzhTAtxRjiuH45CQVUAWctwKmqh0fnHm4QmIQIoBzBTCGMDw8eHiAXDYNI4Bz9wFTfXR1fbJr25Yy2GdPTNcHnDGAoRxgamoA62Nt2vokQwFcXAUcVulNtjF9nb9tgstRrsasxVoKS1P81D+WKK7a4AwupQmus8DT3Rtm/YMADglMZUAcaxl8jmmVkgAupgLWjEwUwH69/lEAawTD0BbXQXH5Y7VKzuBi+oB1gd7LJEpx7b8N4CGB+4MOVVPyt0o6gQupgN3YT/ub7UPf6odFf7+pgLE5NMLtahgR10FxGYKsggAuaBom5/MnmP+r/QqD/NMAhjBkL9R2eFU+COBSKmA+7tG4przfgvSTAA6tb6l6dU46hJUALqoPOIbl6k1wd7bf41IA4yGAZeRbGuGhDtb4yd/dV8Dcvff/rh29Cxsuyxfy5QAOR3p+9E7gfQdwuP4xmfpE9POv/UkAufMA5nFTbtdNUf/WlwYlfZdfBVAfcLh7+PgEj9xd2pZ7jfFHzpcekXR5ECKAS6yA7fq9BF6/An45Ku4/XW85HQWzlADu6q/X3A/lL6+vPf+XL46Aq5ew2QmgAI4prKvv+knUfzbnPn/SP203z3HzsNtdCqBV+MuaBxzuUNBuJtKG7bnn1Ia2LoHevO0EcPEVcFpv7blYU1YfYx1D+/A2Lkg9XogTQAG8agDrA6tP1WOqH0NsU2xLU/zroU3NKgigAE4RwPMFpat9AmsIQ0ztpi3xSyrgUvuA0wYwNGcFcFx5H1NTFz6nUBJa/tAEq4DTVMAvjyvsdyGlkNJxPbQACuBVA9h8G8Aw7AcOzb4FFkABvHYAV2eOx1UX3NfFp23pAgYB1Ae8QQDrmvuavjTWQAG8Q6Hutb1VBUzhx7vaXIe7U7Wr39yuCbavlzoVcqsA2lhOGWOmm/UB7SvXBKcm3WwQogDS1BBEAeRmPcAQYjysfZrTrt771BlYfAUcLrZudrsb5C/IH1WMMW0e5rVpY2NamcGqrr9LdW3e2fq8a0vDa/9GCiAfWuJ63X/q/MVj37MmvjEK4cOMTBEnfx1pgTm2wvtL/7OOwINGmEP5269Gma0J3t/2Hmr9G+56O8s9l/frrIa1fnAIRUrz3H3guNJvvxYH9tGw6g4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4G/9B+UgH74Lo01vAAAAAElFTkSuQmCC";

    var IMG_404_VOD = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAFoCAYAAADHMkpRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAlPSURBVHgB7dxBi53lHYfhp+HE0VlMVqkpRBDqooR2IXQx1EXQQMC1LgouLLOoH6+FCC1CAy6s2RRnIdmUgDQDbcwqE8zMZAZs3lHBhWJizknOOfd1wSH7rG7+z7y/X7zzzvtfDwAAKr4+MwAASBGAAAAxAhAAIEYAAgDECEAAgBgBCAAQIwABAGIEIABAjAAEAIgRgAAAMQIQACBGAAIAxAhAAIAYAQgAECMAAQBiBCAAQIwABACIEYAAADECEAAgRgACAMQIQACAGAEIABAjAAEAYgQgAECMAAQAiBGAAAAxAhAAIEYAAgDECEAAgBgBCAAQIwABAGIEIABAjAAEAIgRgAAAMQIQACBGAAIAxAhAAIAYAQgAECMAAQBiBCAAQIwABACIEYAAADECEAAgRgACAMQIQACAGAEIABAjAAEAYgQgAECMAAQAiBGAAAAxAhAAIEYAAgDECEAAgBgBCAAQIwABAGIEIABAjAAEAIgRgAAAMQIQACBGAAIAxAhAAIAYAQgAECMAAQBiBCAAQIwABACIEYAAADECEAAgRgACAMQIQACAGAEIABAjAAEAYgQgAECMAAQAiBGAAAAxAhAAIEYAAgDECEAAgBgBCAAQIwABAGIEIABAjAAEAIgRgAAAMQIQACBGAAIAxAhAAIAYAQgAECMAAQBiBCAAQIwABACIEYAAADGzAaS89NLmuHLlyliEvb3bY3d3d7Ba3nrrytjc3ByL8OGH1wawfFwAAQBiBCAAQIwABACIEYAAADECEAAgRgACAMQIQACAGAEIABAjAAEAYgQgAECMAAQAiBGAAAAxAhAAIEYAAgDECEAAgBgBCAAQIwABAGIEIABAjAAEAIgRgAAAMQIQACBmNoCldHJyPBbh5OThWJTZ7OzY3NwcACw3AQhL6osvbo1F2No6NxblwoULpz8AlpsnYACAGAEIABAjAAEAYgQgAECMAAQAiBGAAAAxAhAAIEYAAgDECEAAgBgBCAAQIwABAGIEIABAjAAEAIgRgAAAMbMBMCfHx8djf//eYP6m/9uTk5OxCOfPnx8bGy8OoEMAAnNz587/xu7u7mD+7tz577h/fzFxvbPzgQCEGE/AAAAxAhAAIEYAAgDECEAAgBgBCAAQ4ytgYG4ePjxe2JeqdScnxwNgXgQgMDeHhw9O50oAWG6egAEAYgQgAECMAAQAiBGAAAAxAhAAIEYAAgDECEAAgBgBCAAQIwABAGIEIABAjAAE0ra3/zC2trYGQIkABNIuXfrdePfdPz7697cDoEIAAnlbW+fG1atvn/42NjYGwLoTgADfmq6A7733/rh48ZUBsM4EIMD3TNfA6Ul4e/uNAbCuBCDAD5g+DtnZ+bMPRIC1JAABfsR0DdzZ+cA1EFg7AhDgJ0zXwOlvA10DgXUhAAEew/nzv3wUgX8ar7/++wGw6gQgwGOaJmIuX37zdC7GNRBYZbMBwBOZ5mKmqZgbN/45bt78fACsGhdAgJ/BeDSwygQgwFMwHg2sIgEI8JSMRwOrRgACzInxaGBVCECAOTIeDawCAQiwAMajgWUmAAEWxHg0sKwEIMACGY8GlpEhaIBnwHg0sExcAAGeke/Go6cYBHieBCDAM3TjxicugMBz5wkY4BnY3783rl3767h798sB8LwJQIAF++yzf51e/o6OjgbAMhCAAAsyXf0++uhvY2/v9gBYJgIQYAGmv/P7+OPrrn7AUhKAAHN0dHT46Or393Hr1r8HwLISgABzsrf3n9P4m55+AZaZAAR4StPVbxp4nj72AFgFAhDgKbj6AatIAAL8TNO0y3T5A1g1AhDgCRl1BladAAR4AkadgXUgAAEeg1FnYJ0IQICfYNQZWDcCEOBHGHUG1pUABPgB5l2AdSYAAb7HqDNQIAABvuXqB1QIQIBh1BloEYBA2jejzn8x6gykCEAgbYo/8y5AzZkBECb+gCIBCAAQIwABAGIEIABAjAAEAIgRgAAAMQIQACBGAAIAxAhAAIAYAQgAECMAAQBiBCAAQIwABACIEYAAADECEAAgRgACAMQIQACAmNkAmJOLF18ZV6++PVgtGxsvDKBFAAJzs7V1bly6dG4AsNw8AQMAxAhAAIAYAQgAECMAAQBiBCAAQIwABACIEYAAADECEAAgRgACAMQIQACAGAEIABAjAAEAYgQgAECMAAQAiJkNgDnZ27s9bt78fLBaLl9+c2xsvDiADgEIzM3+/j0BuIK2t98QgBDjCRgAIEYAAgDECEAAgBgBCAAQIwABAGIEIABAjAAEAIgRgAAAMQIQACBGAAIAxAhAAIAYAQgAECMAAQBiBCAAQIwABACIEYAAADECEAAgRgACAMQIQACAGAEIABAjAAEAYmYDSDk4eDCuX//HWITDw8Px6qu/Hszf3btfjq++uj8W4dNPPxlnz74wgA4BCEEPHjwYizKbnR3M35kzi3uwOTg4GMfHJwPo8AQMABAjAAEAYgQgAECMAAQAiBGAAAAxAhAAIEYAAgDECEAAgBgBCAAQIwABAGIEIABAjAAEAIgRgAAAMQIQACBGAAIAxAhAAIAYAQgAECMAAQBiBCAAQIwABACIEYAAADGzASyl1177zYDvvPzyr05/APPgAggAECMAAQBiBCAAQIwABACIEYAAADECEAAgRgACAMQIQACAGAEIABAjAAEAYgQgAECMAAQAiBGAAAAxAhAAIEYAAgDECEAAgBgBCAAQIwABAGIEIABAjAAEAIgRgAAAMQIQACBGAAIAxAhAAIAYAQgAECMAAQBiBCAAQIwABACIEYAAADECEAAgRgACAMQIQACAGAEIABAjAAEAYgQgAECMAAQAiBGAAAAxAhAAIEYAAgDECEAAgBgBCAAQIwABAGIEIABAjAAEAIgRgAAAMQIQACBGAAIAxAhAAIAYAQgAECMAAQBiBCAAQIwABACIEYAAADECEAAgRgACAMQIQACAGAEIABAjAAEAYgQgAECMAAQAiBGAAAAxAhAAIEYAAgDECEAAgBgBCAAQIwABAGIEIABAjAAEAIgRgAAAMQIQACBGAAIAxAhAAIAYAQgAECMAAQBiBCAAQIwABACIEYAAADECEAAgRgACAMQIQACAGAEIABAjAAEAYgQgAECMAAQAiBGAAAAxAhAAIEYAAgDECEAAgBgBCAAQIwABAGL+D+8NLbaNWLjjAAAAAElFTkSuQmCC";

    var IMG_404_BANNER = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

    var IMG_404_LOGO_TEMP = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAABHNCSVQICAgIfAhkiAAAAXRJREFUeJztwTEBAAAAwqD1T20MH6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gZ/twABJJA/XAAAAABJRU5ErkJggg==";

    var IMG_PARTNER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAADJCAYAAACJxhYFAAAOyUlEQVR42uydX4hcZxnG3+/bnYU2yia21F60ZBtLLUJJtqLEWpyuBtoI2qG5UFzqzCbVm1w4BWOuGpf2xkQh48WCmCYzQ1lJLwq7elEDLckUjQslmqVeaElilhXUQt1dadowszlHzuxsmJ3Mn/PnO9/f57lMk92ZM++v7/eced73cIIgqK8ACQQBErN0KPvaU7gKeonhEqhXPlseG6aRAuNUIKKdRLTke1RZp3qlWpu6jisESBzvGqzAOMv3+ju+51eJ/Mrp2vMXcMUAiStdY/sQjeQ4p+lW1wirJfL8UoMaQXdZxZUEJBbCMbtnmPwi4yxHRKMJftSa7/lz68RK1drkZVxZQGK8DmZnm16DEWVF/2yfqBZ4lzO1yQquNCAx1YgXE3aNCN2FSjD6gMQII844D8B4VuHLmPc9LzD6c/hEAIk2RjxDmQJxVoxoxNMWjD4g0caI53V/rb7nV2H0AYlkI86KjPzdpr12n9ii7/mlW1SfQ3cBJGkY8WLrG/FRC97SWusb/RKMPiBJasRzxHkxjdu3+nQXqpHnlWD0AUkkI97WNXY69NaRFwMkA7vGwByVK0JeDJBs6RpDNJIz1YjL6C6eR9OuG33mrhHPTAvIUbmiVl6sMe3iUcwpSNLMUTlzFHMwL8bc6BpbBpogYd3FjbwYs9mIa5CjckXz/sZt5AuAxAAjrmmOyhmjb2NejNkBh7CBJkiUd7EoL8bMN+K4fau30d/Ii5ls9JmhRtymHJVLRt/IvBgzyIjnGOcFGHFrjL4xg2EMRhxSafTbussqIInWNZCjctDo65oXYzp1DeSoIB0HwxiMOKSv0dcjL8bUHqtmS4zTj1APUP+jGP3ydG2y6BwkTVPOR66je0Bh1PDqO1Qdv5Q9eiHwHwAECqvmXU5FUgZJa2E0BIUsGFZ0CpLWg2rwvQcURTtVPeBIUSdhBXzmUOSq2Rh9sN+457PlsQwf+Qc+ciimgX9I9i1h6Z1kmEbQRSCj6ofLb5kESKAk9VO0GpKD2VnMmUNJNdqqIzshQReBTKwjBsMOmWngaVzWaDCXaLiK+GghcfXkF63qJMhpQSloreHVx2TkuaR0EuS0oDQMfKuu7DhuMYW5G8heycr/pQ5Jc5MiJg2hdCQlzyWhkyCnBZldX0yCYV/BBwmlqbTzXKl2EpWDMpA7SjvPle5xC4YdknHgSvkbeJ6iYc8hpwVJNPA54yBprSSFIDlKcSCLpWTYkdOCrDHwPCUjBS8CqTDwRWOOW4jEQ6oMfD5b3q49JK2BGOS0IBVKJc/FxdOM276Qym4ivv64WMM+uwc5LUgpJOTvFp3n4mKNk48uYrgefHgHfffwF01HpSAWPGFdBINVNgBy5OQ+umtbhi6eu0bl4wvGvheRC7aFdZJWTguAWABIoCee3kXHTu2nuz81YuT7EZkbFHfcgmE3VgEIh1/52m1AboPzuR3045PfMBMUgfUoBBIswDYbkACEez67rXuHMRcUYXkuIZCoWmQMiQEkAKHvUcxQUETlB5kAw46clsWAtGv56grNvPQOffjvGyYZ+MR5rsSdBAuw3QBks6P89NQ3mybfFInIc/HkLQ05LdP0ncOPRwZkU4G5P3JynzGgiKjPRJBgAbZ5mjq6t3l7N4kMAyXxgm2OLgJAbAclaZ0yGHYAkkSf3GjQ2ZlLdPH31zQ38PEXbPP4hiiDp+c6DshmR5n6yV564pldmhv4+LlCHrOLbGec5VB++iso3rQA2QKi5qAE9Rp3ICsWJFiAbQ4gQfFK61h6gzIaN88VCxJZi4ohcwDZ1L4Dn9f3osTMc0WGBDktANLPxM+89I7OlybWgu0YnQQLsHXW+JMPKAPk5y++ZUBkJXr9sqiGHQuw9VXnTIhsQJavmFEaUfNckToJ9mkBENMBoRh5w0iQ4Bt2AGI6IHHqmEcw7FiADUC26OzMJeMA2TTwUfJc4TsJBqu00z33b1MGSPnEgvZRFFHdhIc07GOMKIuy1Ee95tIBSEhIiLJBXQuDBIZdP0DiDE0BkM66Dpc/5DDsAMRFQChCnmsgJFiADUACXTx3zSpAWgq1YJuHoA1HLU0UeBBVgJi8zTFpffP+hh0LsHXR1NG99Mju+wCIcAM/eME2729ssABbF0BkzIS4BkgbKoX+IPXsIshpAZAFZ65zvwXbPTuJyIXDkFmALF9doddn/uzUte73NUfv4xYMu1J9O/+YMkB+8eLb9PFHdaeud7+vObpCgsEqtXrimV30rfxjAESuei7Y5t2pQk5LJSAqhqYcB2Sz7guhjDv2abkHyIf/uUEv/+BNpwFpM/B3DGTxLgYGht0hQDbn0gFIbwPPuxgYp45aOqzpDF6Dyrl0Q2dCpBn4LZC4ltMaf/IBOvbr/c1brSoBOXJyHwDRR3cs2OaDKLK5g0wd/crGUefpXUpAwditrt1k69cfvMPF73EFkM7iDEAJ/kzWI89Ujt0CkAGQkD/WExLf8+dcBGRTj+y+T8qzAVUCUj6xAEAGqJODLZCsU2PaVUBu/52UH6KJsVv9tU6s1BOSam3quk9Us/GNB8UZ+I4wxZkWKIMeBw1ANOgiRLXO55jwO1sNVWwEJOpEX/B3j53aL+wWMcZuTTlq3Vn/XaPyL0zMXrclu5W0OEXcCVIJyO+q79Fvq++h+sNp7dXzk3fMvPOwNLkICAl4NqDquXQAEqmLlLr9Oe9uXOpWQBJ4EBHFmQSUJI+DTgqIS0NTYgx797of6vaHi0vzq48/dGCciB41GZAvTYg7MWZGhujLXx+jtZWboY9emCo0SvPlC9//VehOstF6vJLJgKRRnFEeoglATDtqeT1PT32fT2KigZdVnP3uGKkC5P3FD5o3GaDIWnr1/GTPlaf99255vlHdRObIa6+OonIuXfNHsemrAXXeF5IGNYIWtGbC+1Qx8hqA0h6MlPU46G6AuD5VmEStOu+poX7/cXFp/ub4zuceZYxpHXx88OEdVPzZhLLffe/92+juT49g7NZIL+JXy7X82didhLrkWHTU8pWVpkdQ1sWexly6qQpT3wMhqdYmL5uQ5wpMtEpQZOuTGw0AkrSLEFvszGnFgoQM+gbeFVA2ozIAJPFRK9QpKRQkZ2qTxhh420HBVKEwrd2i+pwwSMiwPFcAyss/fLNZUAAE6lXPvXb/xoZknepGfWcSFFJQULaAAkBEG/bw9RwaktbCrnmAokbl438CIMIMO9U6F9AJgYQG5FsASoqAnFigv/zhn6huUYqYS2RRf76pA1kq5zqSAoKpQqHqm9NK3Ek2KPSNTAd//FG9+b3C8tUVAOK4YY/6byJDMijnAlAAiC2GPTYk1drUqu/5VdNBeX/xA21f49tv/B2ApNJF/GrY277Jjlsbv87o8d4AlMDMXzynXyEGr+nszCVUdDqYxKpbFvfXHZr4zWUbHl+tav6jFyCYKtTHsCfsJOFzL9qf/Y8vaNFRAEi68jyKvZ00NiSt3MuaLaAEPgCAWKvQOa1uGor7DzcGsg7czxjtteEq/vXdfzUfizb+1Qek/t7lqyt06pWL1KjfQimnZ9hfHzRYlUonIQPzXAP/jy45QYyhKTlKugg+ESQ2LtiWBQoAkdRFIua0hEPSckQl2y7sJihp5b0AiMyjVvIRDybihdi0YLtdaTxsB4DINezdFmDL7ySWPq6BUkgQBz+nfHwBgMjrIkJOOVyMMapXbL3QokDB0JQKwy6mLodE/JDFpfnV8Z3PPaT7fq64+t9/bzZvEe/6wr00+pm7AIgZ6rkAW0knaTW3is1XPCjwOAliAKLqqCXuhhIT+cJsNfDtijK8BUCUKXZOK+VOkiwfY4qizKScnbkEQFRIcK5QKCQ25bnCgHL5j73nzjE0pU6iBwOHRP4wUxZsC/kg6rfo3fNLzWXZnY+JAyAqvcjgBdhKOwkZsmBbpDqj9gBErdKoP5bGCz00MXuBEWVd+nCmju6l5Sur9NYbf0OlquoixBZPn/+e8FPMcDotjyqMuwUJ5kG0OGqlcophab3gFyZmV4loFB8dJElCclpSPElbNynhc4PkdZH08oM8PQNVr+Cjg+QZ9vQGAFODxMQF25Cxmk86WKUEEhKcn4GgPnWW6qmFpf0GXMhzQUolNKclvZM0Zcl+Lsg9wy4NEpMXbENuG3ZpkJi+YBvSuYvEW4Ct33HLwTwXJA0TKacUJuvt2LJgG9IEj5RyWso6CVm0YBvS5qglrZ6kQXKmNllxYSALkqJEC7C1hYQs3s8FSe8iczIMuxJIbFuwDalR0gXYWkNi44JtSLZhT74AW2tImkKeCzLsyM5UvFHkuaCYSj2npUcngYGHDKsbrsZ4wcBDserGHUiQ54Kid5FmTuu6M5C03jaOXJAR9cJUvm3kuSCdDbsGnYRo3fMLmIOHBmi+4VFO5QtgOlyFfLY8NkwjBcapiF1dEBGt+R5V1qleUuVDtIOkXQezswEsBdfWpEIb36YHcLTCsNqI6XrB8tnZPcPkFxlnOXQX27uGP7dOrFStTV7W8QUy3a9gPlvePkQjOc6bDwjCt/QWmXHy/FKDGhWZiV4rIWnXoexrTxGxAuMsjxoz14j7nlc6XXv+gikvmJl4lduMfgHdxYyu0TLiFR2MuBOQwOjDiAOS+N2l2OouMPrKjXhj2sSuYTUknUafcVbEt/kyuwZb9D2/dIvqc7obcechgdGXDEczqOpXTDLigKRHd8lQpkCcFWH0hRrxkm1dw1lIOrpLjnEe+JZnUevRjTht3L6dc+l9M1c/cBj9KEZcnxwVIFGkjdvIMPrdjLjpt28BifDugrxYYMR1zlEBEhh9ZUbclBwVINHT6D/FOC9aavSNy1EBEv2Nvg15scCIl0zNUQESo4y+WXkxW3JUgMTI7pKZ1tjoW5ejAiQGG33NBsOWPI+mbcxRARJLjL6qvJgLOSpAYll3aftGP83uYvRAEyCBNrtLjjgvijT6ruaoAIkTRj9RXsz5HBUgcUhR8mI2DzQBEihEd7mdF8t3M+LIUQESqM3oZyhT8DnLMc+fQ44KgiBjxHEJIAiQQFAi/T8AAP//NojMSb2rf6kAAAAASUVORK5CYII=";
    //empty
    // Adapted from:
    // https://developer.tizen.org/community/tip-tech/using-css3-units-support-low-and-high-density-screens

    // BodyfontSize is used for px to em calculation used by scroll functions
    var BodyfontSize;

    function calculateFontSize() {

        var offset = 0;
        //Prevent crash in case Settings_value is not yet loaded
        try {
            offset = Settings_value.global_font_offset.values[Main_getItemInt('global_font_offset', Settings_value.global_font_offset.defaultValue) - 1];
        } catch (e) {
            offset = 0;
        }

        // Initial sizes.
        var initialFontSize = 29 + offset,
            initialWidth = 1920,
            initialHeight = 1080,

            currentHeight,
            scaleFactor,
            scaledWidth;

        // Get current client/screen height.
        currentHeight = window.innerHeight;

        // Calculate scale factor and scaled font size.
        scaleFactor = currentHeight / initialHeight;
        BodyfontSize = initialFontSize * scaleFactor;

        // Calculate scaled body/divs size.
        scaledWidth = initialWidth * scaleFactor;

        //Set new body width/height recalculated to 16 by 9 and scaled fontSize 
        document.body.style.width = scaledWidth + 'px';
        document.body.style.height = currentHeight + 'px';
        document.body.style.fontSize = BodyfontSize + 'px';
    }

    //Do the calculation and changes on proper events call
    window.addEventListener('resize', calculateFontSizeTizen, false);

    function calculateFontSizeTizen() {
        if (!Main_IsNotBrowser) calculateFontSize();
    }
    //https://developer.android.com/reference/android/view/KeyEvent
    //overwrite from java dispatchKeyEvent()
    var KEY_PAUSE = 83; //overwrite key S = stop because p = play
    var KEY_PLAY = 80; //overwrite key P = play

    var KEY_STOP = 178;
    var KEY_PLAYPAUSE = 179;

    var KEY_LEFT = 37;
    var KEY_UP = 38;
    var KEY_RIGHT = 39;
    var KEY_DOWN = 40;
    var KEY_ENTER = 13;

    var KEY_PG_DOWN = 34;
    var KEY_PG_UP = 33;
    var KEY_REFRESH = 50; //key #2
    var KEY_CHAT = 51; //key #3

    var KEY_RETURN = 49; //key #1
    var KEY_RETURN_Q = 81; //key q

    var KEY_KEYBOARD_BACKSPACE = 8; // http://developer.samsung.com/tv/develop/guides/user-interaction/keyboardime
    var KEY_KEYBOARD_DONE = 13;
    var KEY_KEYBOARD_SPACE = 32;
    var KEY_KEYBOARD_DELETE_ALL = 46;

    var KEY_MEDIA_NEXT = 176;
    var KEY_MEDIA_PREVIOUS = 177;

    var KEY_MEDIA_FAST_FORWARD = 228;
    var KEY_MEDIA_REWIND = 227;

    //var KEY_4 = 52;
    //var KEY_5 = 53;
    var KEY_6 = 54;
    var KEY_7 = 55;
    var KEY_8 = 56;
    var KEY_9 = 57;

    var KEY_A = 65;
    var KEY_C = 67;
    var KEY_E = 69;
    //Variable initialization
    var AddCode_loadingDataTry = 0;
    var AddCode_loadingDataTryMax = 5;
    var AddCode_loadingDataTimeout = 10000;
    var AddCode_Code = 0;
    var AddCode_IsFallowing = false;
    var AddCode_IsSub = false;
    var AddCode_PlayRequest = false;
    var AddCode_Channel_id = '';

    var AddCode_redirect_uri = 'https://fgl27.github.io/SmartTwitchTV/release/index.min.html';
    var AddCode_client_secret = "elsu5d09k0xomu7cggx3qg5ybdwu7g";
    var AddCode_UrlToken = 'https://id.twitch.tv/oauth2/token?';
    //Variable initialization end

    function AddCode_CheckNewCode(code) {
        AddCode_Code = code;
        AddCode_loadingDataTry = 0;
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
                } else {
                    var response = JSON.parse(xmlHttp.responseText);
                    if (response.message) {
                        if (response.message.indexOf('Invalid refresh token') !== -1) {
                            AddCode_requestTokensFailRunning(position);
                            if (callbackFuncNOK) callbackFuncNOK();
                        } else AddCode_refreshTokensError(position, tryes, callbackFunc, callbackFuncNOK);
                    } else AddCode_refreshTokensError(position, tryes, callbackFunc, callbackFuncNOK);
                }
            }
        };

        xmlHttp.send(null);
    }

    function AddCode_refreshTokensError(position, tryes, callbackFuncOK, callbackFuncNOK) {
        if (tryes < 5) AddCode_refreshTokens(position, tryes + 1, callbackFuncOK, callbackFuncNOK);
        else if (callbackFuncNOK) callbackFuncNOK();
    }

    function AddCode_refreshTokensSucess(responseText, position, callbackFunc) {
        var response = JSON.parse(responseText);
        if (AddCode_TokensCheckScope(response.scope)) {
            AddUser_UsernameArray[position].access_token = response.access_token;
            AddUser_UsernameArray[position].refresh_token = response.refresh_token;

            AddUser_SaveUserArray();

            AddCode_Refreshtimeout(position, response.expires_in);

        } else AddCode_requestTokensFailRunning(position);

        if (callbackFunc) callbackFunc();
    }

    //Check if has all scopes, in canse they change
    function AddCode_TokensCheckScope(scope) {
        if (scope.indexOf("user_read") === -1) return false;
        if (scope.indexOf("user_follows_edit") === -1) return false;
        if (scope.indexOf("user_subscriptions") === -1) return false;

        return true;
    }

    function AddCode_requestTokens() {
        var theUrl = AddCode_UrlToken + 'grant_type=authorization_code&client_id=' +
            encodeURIComponent(Main_clientId) + '&client_secret=' + encodeURIComponent(AddCode_client_secret) +
            '&code=' + encodeURIComponent(AddCode_Code) + '&redirect_uri=' + AddCode_redirect_uri;

        AddCode_BasexmlHttpGet(theUrl, 'POST', 0, null, AddCode_requestTokensReady);
    }

    function AddCode_requestTokensReady(xmlHttp) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                AddCode_requestTokensSucess(xmlHttp.responseText);
            } else AddCode_requestTokensError();
            return;
        }
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
            try {
                Android.mloadUrl(Android.mPageUrl());
            } catch (e) {
                window.location = AddCode_redirect_uri;
            }
        }, 4000);
        AddUser_UsernameArray[Main_values.Users_AddcodePosition].access_token = 0;
        AddUser_UsernameArray[Main_values.Users_AddcodePosition].refresh_token = 0;
        AddUser_SaveUserArray();
    }

    function AddCode_requestTokensFailRunning(position) {
        //Token fail remove it and warn
        Users_status = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_OAUTH_FAIL);
        AddUser_UsernameArray[position].access_token = 0;
        AddUser_UsernameArray[position].refresh_token = 0;
        AddUser_SaveUserArray();
        Main_SaveValues();
        window.setTimeout(Main_HideWarningDialog, 4000);
    }

    function AddCode_requestTokensSucess(responseText) {
        var response = JSON.parse(responseText);
        AddUser_UsernameArray[Main_values.Users_AddcodePosition].access_token = response.access_token;
        AddUser_UsernameArray[Main_values.Users_AddcodePosition].refresh_token = response.refresh_token;
        AddCode_loadingDataTry = 0;
        AddCode_CheckOauthToken();
    }

    function AddCode_CheckOauthToken() {
        AddCode_BasexmlHttpGetValidate(AddCode_CheckOauthTokenReady, Main_values.Users_AddcodePosition, 0);
    }

    function AddCode_CheckOauthTokenReady(xmlHttp) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) AddCode_CheckOauthTokenSucess(xmlHttp.responseText);
            else AddCode_CheckOauthTokenError();
        }
    }

    function AddCode_CheckOauthTokenSucess(response) {
        var token = JSON.parse(response);
        if (token.login &&
            token.login.indexOf(AddUser_UsernameArray[Main_values.Users_AddcodePosition].name) !== -1) {
            AddUser_SaveUserArray();
            Main_newUsercode = 0;
            Main_HideLoadDialog();
            Users_status = false;
            Main_values.Main_Go = Main_Users;
            Main_SaveValues();
            Main_showWarningDialog(STR_USER_CODE_OK);
            if (Main_IsNotBrowser) Android.clearCookie();
            window.setTimeout(function() {
                try {
                    Android.mloadUrl(Android.mPageUrl());
                } catch (e) {
                    window.location = AddCode_redirect_uri;
                }
            }, 3000);
        } else {
            AddUser_UsernameArray[Main_values.Users_AddcodePosition].access_token = 0;
            AddUser_UsernameArray[Main_values.Users_AddcodePosition].refresh_token = 0;
            Main_showWarningDialog(STR_OAUTH_FAIL_USER + AddUser_UsernameArray[Main_values.Users_AddcodePosition].name);
            window.setTimeout(function() {
                Main_HideWarningDialog();
                Main_newUsercode = 0;
                Main_SaveValues();
                Main_values.Main_Go = Main_Users;
                try {
                    Android.mloadUrl(Android.mPageUrl());
                } catch (e) {
                    window.location = AddCode_redirect_uri;
                }
            }, 4000);
        }
        return;
    }

    function AddCode_CheckOauthTokenError() {
        AddCode_loadingDataTry++;
        if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_CheckOauthToken();
        else AddCode_requestTokensFail();
    }

    function AddCode_CheckTokenStart(position) {
        AddCode_CheckToken(position, 0);
    }

    function AddCode_CheckToken(position, tryes) {
        AddCode_BasexmlHttpGetValidate(AddCode_CheckTokenReady, position, tryes);
    }

    function AddCode_CheckTokenReady(xmlHttp, position, tryes) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) AddCode_CheckTokenSuccess(xmlHttp.responseText, position);
            else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
                AddCode_loadingDataTry = 0;
                AddCode_refreshTokens(position, 0, null, null);
            } else AddCode_CheckTokenError(position, tryes);
        }
    }

    function AddCode_CheckTokenSuccess(responseText, position) {
        var token = JSON.parse(responseText);
        if (token.scopes && !AddCode_TokensCheckScope(token.scopes)) AddCode_requestTokensFailRunning(position);
        else if (token.expires_in) AddCode_Refreshtimeout(position, token.expires_in);
    }

    function AddCode_Refreshtimeout(position, time) {
        window.setTimeout(function() {
            AddCode_loadingDataTry = 0;
            AddCode_refreshTokens(position, 0, null, null);
        }, (time - 60) * 1000);
    }

    function AddCode_CheckTokenError(position, tryes) {
        if (tryes < AddCode_loadingDataTryMax) AddCode_CheckToken(position, tryes + 1);
    }

    function AddCode_CheckFallow() {
        AddCode_loadingDataTry = 0;
        AddCode_IsFallowing = false;
        AddCode_RequestCheckFallow();
    }

    function AddCode_RequestCheckFallow() {
        var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

        AddCode_BasexmlHttpGet(theUrl, 'GET', 2, null, AddCode_RequestCheckFallowReady);
    }

    function AddCode_RequestCheckFallowReady(xmlHttp) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) { //yes
                AddCode_RequestCheckFallowOK();
            } else if (xmlHttp.status === 404) { //no
                AddCode_RequestCheckFallowNOK(xmlHttp.responseText);
            } else { // internet error
                AddCode_RequestCheckFallowError();
            }
        }
    }

    function AddCode_RequestCheckFallowOK() {
        AddCode_IsFallowing = true;
        if (AddCode_PlayRequest) Play_setFallow();
        else ChannelContent_setFallow();
    }

    function AddCode_RequestCheckFallowNOK(response) {
        response = JSON.parse(response);
        if (response.error) {
            if ((response.error + '').indexOf('Not Found') !== -1) {
                AddCode_IsFallowing = false;
                if (AddCode_PlayRequest) Play_setFallow();
                else ChannelContent_setFallow();
            } else AddCode_RequestCheckFallowError();
        } else AddCode_RequestCheckFallowError();
    }

    function AddCode_RequestCheckFallowError() {
        AddCode_loadingDataTry++;
        if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_RequestCheckFallow();
        else {
            if (AddCode_PlayRequest) Play_setFallow();
            else ChannelContent_setFallow();
        }
    }

    function AddCode_Fallow() {
        AddCode_loadingDataTry = 0;
        AddCode_FallowRequest();
    }

    function AddCode_FallowRequest() {
        var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

        AddCode_BasexmlHttpGet(theUrl, 'PUT', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_FallowRequestReady);
    }

    function AddCode_FallowRequestReady(xmlHttp) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) { //success user now is fallowing the channel
                AddCode_IsFallowing = true;
                if (AddCode_PlayRequest) Play_setFallow();
                else ChannelContent_setFallow();
                return;
            } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
                AddCode_refreshTokens(0, 0, AddCode_Fallow, null);
            } else {
                AddCode_FallowRequestError();
            }
        }
    }

    function AddCode_FallowRequestError() {
        AddCode_loadingDataTry++;
        if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_FallowRequest();
    }

    function AddCode_UnFallow() {
        AddCode_loadingDataTry = 0;
        AddCode_UnFallowRequest();
    }

    function AddCode_UnFallowRequest() {
        var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

        AddCode_BasexmlHttpGet(theUrl, 'DELETE', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_UnFallowRequestReady);
    }

    function AddCode_UnFallowRequestReady(xmlHttp) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 204) { //success user is now not fallowing the channel
                AddCode_IsFallowing = false;
                if (AddCode_PlayRequest) Play_setFallow();
                else ChannelContent_setFallow();
                return;
            } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
                AddCode_refreshTokens(0, 0, AddCode_UnFallow, null);
            } else {
                AddCode_UnFallowRequestError();
            }
        }
    }

    function AddCode_UnFallowRequestError() {
        AddCode_loadingDataTry++;
        if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_UnFallowRequest();
    }

    function AddCode_CheckSub() {
        AddCode_loadingDataTry = 0;
        AddCode_IsSub = false;
        AddCode_RequestCheckSub();
    }

    function AddCode_RequestCheckSub() {
        var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/subscriptions/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

        AddCode_BasexmlHttpGet(theUrl, 'GET', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_RequestCheckSubReady);
    }

    function AddCode_RequestCheckSubReady(xmlHttp) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) { //success yes user is a SUB
                AddCode_IsSub = true;
                PlayVod_isSub();
            } else if (xmlHttp.status === 422) { //channel does not have a subscription program
                AddCode_RequestCheckSubfail();
            } else if (xmlHttp.status === 404) { //success no user is not a sub
                var response = JSON.parse(xmlHttp.responseText);
                if (response.error) {
                    if ((response.error + '').indexOf('Not Found') !== -1) {
                        AddCode_RequestCheckSubfail();
                    } else AddCode_RequestCheckSubError();
                } else AddCode_RequestCheckSubError();
            } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
                AddCode_refreshTokens(0, 0, AddCode_CheckSub, AddCode_RequestCheckSubfail);
            } else { // internet error
                AddCode_RequestCheckSubError();
            }
        }
    }

    function AddCode_RequestCheckSubError() {
        AddCode_loadingDataTry++;
        if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_RequestCheckSub();
        else AddCode_RequestCheckSubfail();
    }

    function AddCode_RequestCheckSubfail() {
        AddCode_IsSub = false;
        PlayVod_NotSub();
    }

    function AddCode_FallowGame() {
        AddCode_loadingDataTry = 0;
        AddCode_RequestFallowGame();
    }

    function AddCode_RequestFallowGame() {
        var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/games/' +
            Main_values.Main_gameSelected_id + Main_TwithcV5Flag_I;

        AddCode_BasexmlHttpGet(theUrl, 'PUT', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_RequestFallowGameReady);
    }

    function AddCode_RequestFallowGameReady(xmlHttp) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) { //success we now fallow the game
                AGame_fallowing = true;
                AGame_setFallow();
                return;
            } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
                AddCode_refreshTokens(0, 0, AddCode_FallowGame, null);
            } else { // internet error
                AddCode_FallowGameRequestError();
            }
        }
    }

    function AddCode_FallowGameRequestError() {
        AddCode_loadingDataTry++;
        if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_RequestFallowGame();
    }

    function AddCode_UnFallowGame() {
        AddCode_loadingDataTry = 0;
        AddCode_RequestUnFallowGame();
    }

    function AddCode_RequestUnFallowGame() {
        var theUrl = 'https://api.twitch.tv/api/users/' + AddUser_UsernameArray[0].name +
            '/follows/games/' + encodeURIComponent(Main_values.Main_gameSelected) + '?oauth_token=' +
            AddUser_UsernameArray[0].access_token + Main_TwithcV5Flag;

        if (Main_IsNotBrowser)
            AddCode_BasereadwritedUrl(theUrl, 'DELETE', 2, null, AddCode_UnFallowGameAndroid);
        else
            AddCode_BasexmlHttpGet(theUrl, 'DELETE', 2, null, AddCode_UnFallowGameJs);
    }

    function AddCode_UnFallowGameAndroid(xmlHttp) {
        if (xmlHttp !== null) AddCode_UnFallowGameEnd(xmlHttp);
        else AddCode_UnFallowGameRequestError();
    }

    function AddCode_UnFallowGameJs(xmlHttp) {
        if (xmlHttp.readyState === 4) AddCode_UnFallowGameEnd(xmlHttp);
    }

    function AddCode_UnFallowGameEnd(xmlHttp) {
        if (xmlHttp.status === 404 || xmlHttp.status === 204) { // success we now unfallow the game
            if (xmlHttp.status === 204) { // success we now unfallow the game
                AGame_fallowing = false;
                AGame_setFallow();
            } else if (JSON.parse(xmlHttp.responseText).message.indexOf('does not follow') !== -1) {
                AGame_fallowing = false;
                AGame_setFallow();
            } else AddCode_UnFallowGameRequestError();
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(0, 0, AddCode_UnFallowGame, null);
        } else { // internet error
            AddCode_UnFallowGameRequestError();
        }
    }

    function AddCode_UnFallowGameRequestError() {
        AddCode_loadingDataTry++;
        if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_RequestUnFallowGame();
        else {
            Main_showWarningDialog(STR_410_FEATURING);
            window.setTimeout(Main_HideWarningDialog, 2000);
        }
    }

    function AddCode_CheckFallowGame() {
        AddCode_loadingDataTry = 0;
        AddCode_RequestCheckFallowGame();
    }

    function AddCode_RequestCheckFallowGame() {
        var theUrl = 'https://api.twitch.tv/api/users/' + AddUser_UsernameArray[0].name + '/follows/games/' +
            encodeURIComponent(Main_values.Main_gameSelected) + Main_TwithcV5Flag_I;

        AddCode_BasexmlHttpGetBack(theUrl, 'GET', 2, null, AddCode_CheckFallowGameReady);
    }

    function AddCode_CheckFallowGameReady(xmlHttp) {
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
    }

    function AddCode_CheckFallowGameError() {
        AddCode_loadingDataTry++;
        if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_RequestCheckFallowGame();
        else {
            AGame_fallowing = false;
            AGame_setFallow();
        }
    }

    function AddCode_BasexmlHttpGet(theUrl, Method, HeaderQuatity, access_token, callbackready) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open(Method, theUrl, true);
        xmlHttp.timeout = AddCode_loadingDataTimeout;

        Main_Headers[2][1] = access_token;

        for (var i = 0; i < HeaderQuatity; i++)
            xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            callbackready(xmlHttp);
        };

        xmlHttp.send(null);
    }

    function AddCode_BasexmlHttpGetValidate(callbackready, position, tryes) {
        var theUrl = 'https://id.twitch.tv/oauth2/validate';

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.setRequestHeader(Main_Authorization, Main_OAuth + AddUser_UsernameArray[position].access_token);

        xmlHttp.timeout = 10000;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            callbackready(xmlHttp, position, tryes);
        };

        xmlHttp.send(null);
    }

    function AddCode_BasereadwritedUrl(theUrl, Method, HeaderQuatity, access_token, callbackready) {
        var xmlHttp = Android.mMethodUrl(theUrl, 5000, HeaderQuatity, access_token, null, null, Method);

        if (xmlHttp) callbackready(JSON.parse(xmlHttp));
        else callbackready(xmlHttp);

    }

    function AddCode_BasexmlHttpGetBack(theUrl, type, HeaderQuatity, access_token, callbackready) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open(type, theUrl, true);
        xmlHttp.timeout = AddCode_loadingDataTimeout;

        Main_Headers_Back[2][1] = access_token;

        for (var i = 0; i < HeaderQuatity; i++)
            xmlHttp.setRequestHeader(Main_Headers_Back[i][0], Main_Headers_Back[i][1]);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            callbackready(xmlHttp);
        };

        xmlHttp.send(null);
    } //Variable initialization
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
        ScreensObj_SetTopLable(STR_USER_ADD);
        Main_HideWarningDialog();
        Main_AddUserInput.placeholder = STR_PLACEHOLDER_USER;
        Main_ShowElement('add_user_scroll');
        AddUser_inputFocus();
    }

    function AddUser_exit() {
        AddUser_RemoveinputFocus(false);
        document.body.removeEventListener("keydown", AddUser_handleKeyDown);
        document.body.removeEventListener("keydown", AddUser_KeyboardEvent);
        Main_HideElement('add_user_scroll');
    }

    function AddUser_handleKeyDown(event) {
        if (AddUser_loadingData || AddUser_keyBoardOn || Main_values.Main_Go !== Main_addUser) return;
        switch (event.keyCode) {
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
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
            case KEY_KEYBOARD_SPACE:
            case KEY_ENTER:
                AddUser_inputFocus();
                break;
            default:
                break;
        }
    }

    function AddUser_inputFocus() {
        //Main_AddClass('scenekeys', 'avoidclicks');
        Main_AddClass('scenefeed', 'avoidclicks');
        document.body.removeEventListener("keydown", AddUser_handleKeyDown);
        document.body.addEventListener("keydown", AddUser_KeyboardEvent, false);
        Main_AddUserInput.placeholder = STR_PLACEHOLDER_USER;

        Main_AddUserInput.focus();
        AddUser_keyBoardOn = true;
    }

    function AddUser_removeEventListener() {
        if (!Main_isTV && Main_IsNotBrowser) Android.mhideSystemUI();

        Main_RemoveClass('scenefeed', 'avoidclicks');
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
            case KEY_RETURN_Q:
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
                AddUser_KeyboardDismiss();
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

    function AddUser_KeyboardDismiss() {
        if (Main_AddUserInput.value !== '' && Main_AddUserInput.value !== null) {

            AddUser_Username = Main_AddUserInput.value;

            if (!AddUser_UserCodeExist(AddUser_Username)) {
                AddUser_loadingDataTry = 0;
                AddUser_loadingDataTimeout = 3500;
                AddUser_loadingData = true;
                Main_HideElement('add_user_scroll');
                Main_showLoadDialog();
                AddUser_loadDataRequest();
            } else {
                Main_HideLoadDialog();
                Main_showWarningDialog(STR_USER + " " + AddUser_Username + STR_USER_SET);
                window.setTimeout(function() {
                    Main_HideWarningDialog();
                    AddUser_inputFocus();
                }, 1500);
            }
        } else AddUser_inputFocus();
    }

    function AddUser_loadDataRequest() {
        var theUrl = Main_kraken_api + 'users?login=' + encodeURIComponent(AddUser_Username) + Main_TwithcV5Flag;

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
            for (var i = 0; i < AddUser_UsernameArray.length; i++) {
                if (AddUser_UsernameArray[i].access_token) AddCode_CheckTokenStart(i);

                if (!AddUser_UsernameArray[i].logo) AddUser_UpdateUser(i, 0);
                else if (!i) AddUser_UpdateSidepanel();

                //Set user history obj
                Main_values_History_data[AddUser_UsernameArray[i].id] = {
                    live: [],
                    vod: [],
                    clip: []
                };
            }

            Main_Restore_history();
            return true;
        } else {
            AddUser_UpdateSidepanelDefault();
            return false;
        }
    }

    function AddUser_UpdateSidepanel() {
        AddUser_UpdateSidepanelSize(AddUser_UsernameArray[0].logo, AddUser_UsernameArray[0].display_name);
    }

    function AddUser_UpdateSidepanelDefault() {
        AddUser_UpdateSidepanelSize(IMG_404_LOGO, STR_USER_ADD);
    }

    function AddUser_UpdateSidepanelSize(logo, username) {
        Main_innerHTML("side_panel_new_0_img",
            '<img class="side_panel_new_img" alt="" src="' +
            logo + '" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';">');
        Sidepannel_SetUserlable(username);

        var size = username.length,
            doc = document.getElementById('side_panel_movel');

        size = (size > 11 ? size - 11 : 0);

        doc.style.marginLeft = 'calc(-' + Sidepannel_MoveldefaultMargin + '% - ' + size + 'ch)';
        doc.style.width = 'calc(' + Sidepannel_MoveldefaultWidth + '% + ' + size + 'ch)';
    }

    function AddUser_UserIsSet() {
        return AddUser_UsernameArray.length > 0;
    }

    function AddUser_UpdateUser(position, tryes) {
        var theUrl = Main_kraken_api + 'users?login=' + encodeURIComponent(AddUser_UsernameArray[position].name) + Main_TwithcV5Flag;
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = 10000;

        for (var i = 0; i < 2; i++)
            xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) AddUser_UpdateUsertSuccess(xmlHttp.responseText, position);
                else AddUser_UpdateUserError(position, tryes);
            }
        };

        xmlHttp.send(null);
    }

    function AddUser_UpdateUsertSuccess(response, position) {
        var user = JSON.parse(response);
        if (user._total) {
            document.body.removeEventListener("keydown", AddUser_handleKeyDown);
            user = user.users[0];
            AddUser_UsernameArray[position].display_name = user.display_name;
            AddUser_UsernameArray[position].logo = user.logo;
            if (!position) AddUser_UpdateSidepanel();
        }
        AddUser_SaveUserArray();
    }

    function AddUser_UpdateUserError(position, tryes) {
        tryes++;
        if (tryes < AddUser_loadingDataTryMax) AddUser_UpdateUser(position, tryes);
    }

    function AddUser_SaveNewUser(responseText) {
        AddUser_Username = JSON.parse(responseText).users[0];
        AddUser_UsernameArray.push({
            name: AddUser_Username.name,
            id: AddUser_Username._id,
            display_name: AddUser_Username.display_name,
            logo: AddUser_Username.logo,
            access_token: 0,
            refresh_token: 0
        });

        Main_values_History_data[AddUser_UsernameArray[AddUser_UserFindpos(AddUser_Username.name)].id] = {
            live: [],
            vod: [],
            clip: []
        };

        AddUser_SaveUserArray();
        Users_status = false;
        Users_Userlastadded = AddUser_Username.name;
        Users_ShowAutetication = true;
        AddUser_exit();
        Main_values.Main_Go = Main_Users;
        Main_HideLoadDialog();
        if (AddUser_UsernameArray.length === 1) AddUser_UpdateSidepanel();
        Main_SwitchScreenAction();
        AddUser_loadingData = false;
    }

    function AddUser_removeUser(Position) {
        // remove the user
        var index = AddUser_UsernameArray.indexOf(AddUser_UsernameArray[Position]);
        if (index > -1) AddUser_UsernameArray.splice(index, 1);

        // reset localStorage usernames
        AddUser_SaveUserArray();

        // restart users and smarthub
        if (AddUser_UsernameArray.length > 0) {
            //Reset main user if user is 0
            if (!Position) AddUser_UpdateSidepanel();
            Users_status = false;
            Users_init();
        } else {
            AddUser_UpdateSidepanelDefault();
            AddUser_init();
        }
    }

    function AddUser_SaveUserArray() {
        if (AddUser_UsernameArray.length > 0) {
            //Remove first user alphabetical sort and add first back
            var mainuser = AddUser_UsernameArray.splice(0, 1);
            AddUser_UsernameArray.sort(function(a, b) {
                return (a.display_name).toLowerCase().localeCompare((b.display_name).toLowerCase());
            });
            AddUser_UsernameArray.splice(0, 0, mainuser[0]);
        }
        var string = JSON.stringify(AddUser_UsernameArray);
        Main_setItem('AddUser_UsernameArray', string);

        if (Main_CanBackup) Android.BackupFile(Main_UserBackupFile, string);
    }

    function AddUser_UserMakeOne(Position) {
        AddUser_Username = AddUser_UsernameArray[0];
        AddUser_UsernameArray[0] = AddUser_UsernameArray[Position];
        AddUser_UsernameArray[Position] = AddUser_Username;
        AddUser_SaveUserArray();
        Users_status = false;
        AddUser_UpdateSidepanel();
        Users_init();
    }

    function AddUser_UserCodeExist(user) {
        return AddUser_UsernameArray.filter(function(array) {
            return array.name === user;
        }).length > 0;
    }

    function AddUser_UserFindpos(user) {
        return AddUser_UsernameArray.map(function(array) {
            return array.name;
        }).indexOf(user);
    }

    function AddUser_IsUserSet() {
        return AddUser_UsernameArray.length > 0;
    }
    //Variable initialization
    var ChannelContent_cursorY = 0;
    var ChannelContent_cursorX = 0;
    var ChannelContent_dataEnded = false;
    var ChannelContent_itemsCount = 0;
    var ChannelContent_loadingDataTry = 0;
    var ChannelContent_loadingDataTryMax = 5;
    var ChannelContent_loadingDataTimeout = 3500;
    var ChannelContent_itemsCountOffset = 0;
    var ChannelContent_isoffline = false;
    var ChannelContent_UserChannels = false;
    var ChannelContent_TargetId;
    var ChannelContent_ids = ['cc_thumbdiv', 'cc_img', 'cc_infodiv', 'cc_name', 'cc_createdon', 'cc_game', 'cc_viwers', 'cc_duration', 'cc_cell', 'sccempty_', 'channel_content_scroll'];
    var ChannelContent_status = false;
    var ChannelContent_lastselectedChannel = '';
    var ChannelContent_responseText = null;
    var ChannelContent_selectedChannelViews = '';
    var ChannelContent_selectedChannelFallower = '';
    var ChannelContent_description = '';
    var ChannelContent_ChannelValue = {};
    var ChannelContent_ChannelValueIsset = false;
    var ChannelContent_offline_image = null;
    var ChannelContent_profile_banner = '';
    var ChannelContent_KeyEnterID;
    var ChannelContent_clear = false;
    //Variable initialization end

    function ChannelContent_init() {
        Main_values.Main_CenterLablesVectorPos = 1;
        Main_values.Main_Go = Main_ChannelContent;
        if (ChannelContent_ChannelValueIsset && !Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
        if (ChannelContent_lastselectedChannel !== Main_values.Main_selectedChannel) ChannelContent_status = false;
        Main_cleanTopLabel();
        document.body.addEventListener("keydown", ChannelContent_handleKeyDown, false);
        AddCode_PlayRequest = false;

        Main_innerHTML('top_lable', Main_values.Main_selectedChannelDisplayname);

        if (Main_values.Main_BeforeChannel === Main_UserChannels || Main_values.My_channel) {
            Main_values.Sidepannel_Pos = Main_values.My_channel ? 8 : 7;
            Sidepannel_SetUserLables();
            Sidepannel_SetTopOpacity(Main_values.Main_Go);
        }

        if (ChannelContent_status) {
            Main_YRst(ChannelContent_cursorY);
            Main_ShowElement(ChannelContent_ids[10]);
            ChannelContent_checkUser();
            ChannelContent_removeAllFallowFocus();
            ChannelContent_addFocus();
            Main_SaveValues();
        } else ChannelContent_StartLoad();
    }

    function ChannelContent_exit() {
        Main_RestoreTopLabel();
        document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
        Main_HideElement(ChannelContent_ids[10]);
        Main_values.My_channel = false;
        ChannelContent_removeFocus();
    }

    function ChannelContent_StartLoad() {
        ScreensObj_SetTopLable(Main_values.Main_selectedChannelDisplayname);
        Main_updateclock();
        ChannelContent_isoffline = false;
        Main_HideElement(ChannelContent_ids[10]);
        ChannelContent_offline_image = null;
        Main_showLoadDialog();
        Main_HideWarningDialog();
        ChannelContent_lastselectedChannel = Main_values.Main_selectedChannel;
        ChannelContent_status = false;
        ChannelContent_isoffline = false;
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
        var theUrl = Main_kraken_api + 'streams/' +
            encodeURIComponent(ChannelContent_TargetId !== undefined ? ChannelContent_TargetId : Main_values.Main_selectedChannel_id) +
            Main_TwithcV5Flag_I;

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

        BasehttpGet(theUrl, ChannelContent_loadingDataTimeout, 1, null, ChannelContent_CheckHost, ChannelContent_loadDataCheckHostError);
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
        var theUrl = Main_kraken_api + 'channels/' + Main_values.Main_selectedChannel_id + Main_TwithcV5Flag_I;

        BasehttpGet(theUrl, PlayVod_loadingInfoDataTimeout, 2, null, ChannelContent_GetStreamerInfoSuccess, ChannelContent_GetStreamerInfoError);
    }

    function ChannelContent_GetStreamerInfoSuccess(responseText) {
        var channel = JSON.parse(responseText);
        ChannelContent_offline_image = channel.video_banner;
        ChannelContent_offline_image = ChannelContent_offline_image ? ChannelContent_offline_image.replace("1920x1080", Main_VideoSize) : ChannelContent_offline_image;
        ChannelContent_profile_banner = channel.profile_banner;
        ChannelContent_selectedChannelViews = channel.views;
        ChannelContent_selectedChannelFallower = channel.followers;
        ChannelContent_description = channel.description;
        Main_values.Main_selectedChannelLogo = channel.logo;
        Main_values.Main_selectedChannelPartner = channel.partner;

        ChannelContent_loadDataSuccess();
    }

    function ChannelContent_GetStreamerInfoError() {
        ChannelContent_loadingDataTry++;
        if (ChannelContent_loadingDataTry < ChannelContent_loadingDataTryMax) {
            ChannelContent_loadingDataTimeout += 500;
            ChannelContent_GetStreamerInfo();
        } else {
            ChannelContent_offline_image = null;
            ChannelContent_profile_banner = IMG_404_BANNER;
            ChannelContent_selectedChannelViews = '';
            ChannelContent_selectedChannelFallower = '';
            ChannelContent_description = '';
            Main_values.Main_selectedChannelLogo = IMG_404_LOGO;
            ChannelContent_loadDataSuccess();
        }
    }

    function ChannelContent_setFallow() {
        if (AddCode_IsFallowing) Main_innerHTML("channel_content_titley_2", '<i class="icon-heart" style="color: #6441a4; font-size: 100%;"></i>' + STR_SPACE + STR_SPACE + STR_FALLOWING);
        else Main_innerHTML("channel_content_titley_2", '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; "></i>' + STR_SPACE + STR_SPACE + (AddUser_UserIsSet() ? STR_FALLOW : STR_NOKEY));
    }

    function ChannelContent_loadDataSuccess() {
        Main_innerHTML("channel_content_thumbdiv0_1",
            '<img class="stream_img_channel_logo" alt="" src="' +
            Main_values.Main_selectedChannelLogo.replace("300x300", '600x600') +
            '" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';">');

        Main_innerHTML("channel_content_img0_1",
            '<img class="stream_img_channel" alt="" src="' +
            ChannelContent_profile_banner +
            '" onerror="this.onerror=null;this.src=\'' + IMG_404_BANNER + '\';">');

        var streamer_bio = Main_values.Main_selectedChannelDisplayname;

        streamer_bio += (Main_values.Main_selectedChannelPartner ? STR_SPACE + STR_SPACE + '<img style="display: inline-block; width: 2ch; vertical-align: middle;" alt="" src="' + IMG_PARTNER + '">' : "");

        streamer_bio += ChannelContent_selectedChannelViews !== '' ?
            STR_BR + Main_addCommas(ChannelContent_selectedChannelViews) + STR_VIEWS : '';

        streamer_bio += ChannelContent_selectedChannelFallower !== '' ?
            STR_BR + Main_addCommas(ChannelContent_selectedChannelFallower) + STR_FALLOWERS : '';

        streamer_bio += ChannelContent_description !== '' ?
            STR_BR + STR_BR + STR_ABOUT + ':' + STR_BR + twemoji.parse(ChannelContent_description) : '';

        Main_innerHTML("channel_content_infodiv0_1", streamer_bio);

        if (ChannelContent_responseText !== null) {
            var response = JSON.parse(ChannelContent_responseText);
            if (response.stream !== null) {

                var stream = response.stream;

                if (ChannelContent_TargetId !== undefined) {
                    stream.channel.display_name = Main_values.Main_selectedChannelDisplayname +
                        STR_USER_HOSTING + stream.channel.display_name;
                }

                ChannelContent_createCell(ScreensObj_LiveCellArray(stream));

                ChannelContent_cursorX = 1;
            } else ChannelContent_createCellOffline();
        } else ChannelContent_createCellOffline();

        ChannelContent_loadDataSuccessFinish();
    }

    function ChannelContent_createCell(valuesArray) {

        var ishosting = ChannelContent_TargetId !== undefined;

        document.getElementById('channel_content_cell0_1').setAttribute(Main_DataAttribute, JSON.stringify(valuesArray));

        Main_innerHTML("channel_content_thumbdiv0_0", '<div class="stream_thumbnail_live_img"><img class="stream_img" alt="" src="' + valuesArray[0].replace("{width}x{height}", Main_VideoSize) + Main_randomimg +
            '" onerror="this.onerror=null;this.src=\'' + IMG_404_VIDEO +
            '\';"></div><div class="stream_thumbnail_live_text_holder"><span class="stream_spam_text_holder"><div id="channel_content_cell0_3" style="line-height: 1.6ch;"><div class="stream_info_live_name" style="width:' + (ishosting ? 99 : 66) + '%; display: inline-block;">' +
            '<i class="icon-' + (valuesArray[8] ? 'refresh' : 'circle') + ' live_icon strokedeline" style="color: ' +
            (valuesArray[8] ? '#FFFFFF' : ishosting ? '#FED000' : 'red') +
            ';"></i> ' + valuesArray[1] + '</div><div class="stream_info_live" style="width:' +
            (ishosting ? 0 : 33) + '%; float: right; text-align: right; display: inline-block;">' +
            (ishosting ? '' : valuesArray[5]) + '</div></div>' +
            '<div class="stream_info_live_title">' + twemoji.parse(valuesArray[2]) + '</div>' +
            '<div id="channel_content_cell0_5" class="stream_info_live">' +
            (valuesArray[3] !== "" ? STR_PLAYING + valuesArray[3] : "") +
            '</div>' + '<div class="stream_info_live">' +
            valuesArray[11] + STR_FOR + valuesArray[4] + STR_SPACE + STR_VIEWER + '</div></span></div>');
    }

    function ChannelContent_createCellOffline() {
        ChannelContent_isoffline = true;
        Main_innerHTML("channel_content_thumbdiv0_0", '<div class="stream_thumbnail_live_img"><img class="stream_img" alt="" src="' + ChannelContent_offline_image + Main_randomimg +
            '" onerror="this.onerror=null;this.src=\'' + IMG_404_VIDEO +
            '\';"></div><div class="stream_thumbnail_live_text_holder"><span class="stream_spam_text_holder" style="font-size: 150%;"><div style="line-height: 1.6ch;"><div class="stream_info_live_name" style="width:99%; display: inline-block;">' +
            Main_values.Main_selectedChannelDisplayname + '</div><div class="stream_info_live" style="width:0%; float: right; text-align: right; display: inline-block;"></div></div>' +
            '<div class="stream_info_live">' + STR_CH_IS_OFFLINE + '</div></span>' +
            '</div>');
    }

    function ChannelContent_loadDataSuccessFinish() {
        if (!ChannelContent_status) {
            ChannelContent_status = true;
            if (!ChannelContent_isoffline) ChannelContent_cursorY = 1;
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
        if (ChannelContent_cursorY) Main_AddClass('channel_content_thumbdiv0_0', Main_classThumb);
        else ChannelContent_addFocusFallow();

        Main_handleKeyUp();
    }

    function ChannelContent_addFocusFallow() {
        Main_AddClass('channel_content_thumbdivy_' + ChannelContent_cursorX, 'stream_switch_focused');
    }

    function ChannelContent_removeFocus() {
        if (ChannelContent_cursorY) Main_RemoveClass("channel_content_thumbdiv0_0", Main_classThumb);
        else Main_RemoveClass('channel_content_thumbdivy_' + ChannelContent_cursorX, 'stream_switch_focused');
    }

    function ChannelContent_removeAllFallowFocus() {
        Main_RemoveClass('channel_content_thumbdivy_0', 'stream_switch_focused');
        Main_RemoveClass('channel_content_thumbdivy_1', 'stream_switch_focused');
        Main_RemoveClass('channel_content_thumbdivy_2', 'stream_switch_focused');
    }

    function ChannelContent_keyEnter() {
        if (!ChannelContent_cursorY) {
            if (!ChannelContent_cursorX) {
                document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
                Main_HideElement(ChannelContent_ids[10]);
                ChannelContent_removeFocus();
                Main_ready(function() {
                    inUseObj = ChannelVod;
                    Screens_init();
                });
            } else if (ChannelContent_cursorX === 1) {
                document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
                Main_HideElement(ChannelContent_ids[10]);
                ChannelContent_removeFocus();
                Main_ready(function() {
                    inUseObj = ChannelClip;
                    Screens_init();
                });
            } else if (ChannelContent_cursorX === 2) {
                if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
                    AddCode_PlayRequest = false;
                    AddCode_Channel_id = Main_values.Main_selectedChannel_id;
                    if (AddCode_IsFallowing) AddCode_UnFallow();
                    else AddCode_Fallow();
                } else {
                    Main_showWarningDialog(STR_NOKEY_WARN);
                    window.setTimeout(Main_HideWarningDialog, 2000);
                }
            }
        } else {
            document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
            Main_HideElement(ChannelContent_ids[10]);

            Main_values_Play_data = JSON.parse(document.getElementById('channel_content_cell0_1')
                .getAttribute(Main_DataAttribute));

            Play_data.data = Main_values_Play_data;

            if (Play_data.data[1].indexOf(STR_USER_HOSTING) !== -1) {
                Main_values.Play_isHost = true;
                Play_data.DisplaynameHost = Play_data.data[1];
                Play_data.data[1] = Play_data.data[1].split(STR_USER_HOSTING)[1];
                Play_data.data[14] = ChannelContent_TargetId;
            } else Play_data.data[14] = Main_values.Main_selectedChannel_id;

            Main_ready(Main_openStream);
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

    function ChannelContent_handleKeyUp(e) {
        if (e.keyCode === KEY_ENTER) {
            ChannelContent_handleKeyUpClear();
            if (!ChannelContent_clear) ChannelContent_keyEnter();
        }
    }

    function ChannelContent_handleKeyUpClear() {
        window.clearTimeout(ChannelContent_KeyEnterID);
        document.body.removeEventListener("keyup", ChannelContent_handleKeyUp);
        document.body.addEventListener("keydown", ChannelContent_handleKeyDown, false);
    }

    function ChannelContent_handleKeyDown(event) {
        if (Main_FirstLoad || Main_CantClick()) return;
        else Main_keyClickDelayStart();

        switch (event.keyCode) {
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                if (Main_isControlsDialogShown()) Main_HideControlsDialog();
                else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
                else {
                    ChannelContent_removeFocus();
                    document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
                    Main_values.Main_Go = Main_values.Main_BeforeChannel;
                    Main_values.Main_BeforeChannel = Main_Live;
                    ChannelContent_exit();
                    Sidepannel_SetDefaultLables();
                    Main_values.Main_selectedChannel_id = '';
                    Main_SwitchScreenAction();
                }
                break;
            case KEY_LEFT:
                if (!ChannelContent_cursorY && ChannelContent_cursorX) {
                    ChannelContent_removeFocus();
                    ChannelContent_cursorX--;
                    if (ChannelContent_cursorX < 0) ChannelContent_cursorX = 2;
                    ChannelContent_addFocus();
                } else {
                    ChannelContent_removeFocus();
                    Sidepannel_Start(ChannelContent_handleKeyDown);
                }
                break;
            case KEY_RIGHT:
                if (!ChannelContent_cursorY) {
                    ChannelContent_removeFocus();
                    ChannelContent_cursorX++;
                    if (ChannelContent_cursorX > 2) ChannelContent_cursorX = 0;
                    ChannelContent_addFocus();
                }
                break;
            case KEY_UP:
                if (!ChannelContent_cursorY && !ChannelContent_isoffline) {
                    ChannelContent_removeFocus();
                    ChannelContent_cursorY = 1;
                    ChannelContent_addFocus();
                } else {
                    ChannelContent_removeFocus();
                    ChannelContent_cursorY = 0;
                    ChannelContent_addFocus();
                }
                break;
            case KEY_DOWN:
                if (!ChannelContent_cursorY && !ChannelContent_isoffline) {
                    ChannelContent_removeFocus();
                    ChannelContent_cursorY = 1;
                    ChannelContent_addFocus();
                } else {
                    ChannelContent_removeFocus();
                    ChannelContent_cursorY = 0;
                    ChannelContent_addFocus();
                }
                break;
            case KEY_PLAY:
            case KEY_PAUSE:
            case KEY_PLAYPAUSE:
            case KEY_KEYBOARD_SPACE:
                ChannelContent_keyEnter();
                break;
            case KEY_ENTER:
                document.body.removeEventListener("keydown", ChannelContent_handleKeyDown, false);
                document.body.addEventListener("keyup", ChannelContent_handleKeyUp, false);
                ChannelContent_clear = false;
                ChannelContent_KeyEnterID = window.setTimeout(Main_ReloadScreen, 500);
                break;
            case KEY_REFRESH:
                Main_ReloadScreen();
                break;
            case KEY_CHAT:
                ChannelContent_removeFocus();
                Sidepannel_Start(ChannelContent_handleKeyDown, AddUser_UserIsSet());
                if (!AddUser_UserIsSet()) {
                    Main_showWarningDialog(STR_NOKUSER_WARN);
                    window.setTimeout(Main_HideWarningDialog, 2000);
                }
                break;
            default:
                break;
        }
    }
    //Variable initialization
    var ChatLive_loadingDataTry = 0;
    var ChatLive_loadingDataTryMax = 10;
    var ChatLive_Id = [];
    var ChatLive_loadBadgesChannelId;
    var ChatLive_socket = [];
    var ChatLive_loaded = [];
    var ChatLive_CheckId = [];
    var ChatLive_LineAddCounter = [];
    var ChatLive_Messages = [];
    var ChatLive_Playing = true;
    var extraEmotesDone = {
        bbtv: {},
        ffz: {},
        cheers: {}
    };
    var extraEmotes = {};
    var cheers = {};

    var ChatLive_selectedChannel_id = [];
    var ChatLive_selectedChannel = [];

    //Variable initialization end

    function ChatLive_Init(chat_number) {
        ChatLive_Clear(chat_number);
        if (Main_values.Play_ChatForceDisable) {
            Chat_Disable();
            return;
        }
        if (!Chat_LoadGlobal) Chat_loadBadgesGlobal();

        ChatLive_loaded[chat_number] = false;


        ChatLive_Id[chat_number] = (new Date()).getTime();
        ChatLive_selectedChannel_id[chat_number] = !chat_number ? Play_data.data[14] : PlayExtra_data.data[14];
        ChatLive_selectedChannel[chat_number] = !chat_number ? Play_data.data[6] : PlayExtra_data.data[6];
        ChatLive_loadBadgesChannel(ChatLive_Id[chat_number], ChatLive_loadBadgesChannelSuccess, chat_number);

    }

    function ChatLive_loadBadgesChannel(id, callbackSucess, chat_number) {
        ChatLive_loadingDataTry = 0;
        ChatLive_loadBadgesChannelRequest(id, callbackSucess, chat_number);
    }

    function ChatLive_loadBadgesChannelRequest(id, callbackSucess, chat_number) {
        var theUrl = 'https://badges.twitch.tv/v1/badges/channels/' + ChatLive_selectedChannel_id[chat_number] + '/display';
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = 10000;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    callbackSucess(xmlHttp.responseText, id, chat_number);
                    return;
                } else {
                    ChatLive_loadBadgesChannelError(id, callbackSucess, chat_number);
                }
            }
        };

        xmlHttp.send(null);
    }

    function ChatLive_loadBadgesChannelError(id, callbackSucess, chat_number) {
        ChatLive_loadingDataTry++;
        if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadBadgesChannelRequest(id, callbackSucess, chat_number);
        else {
            if (ChatLive_Id[chat_number] === id) {
                window.clearTimeout(ChatLive_loadBadgesChannelId);
                ChatLive_loadBadgesChannelId = window.setTimeout(function() {
                    ChatLive_loadBadgesChannelRequest(id, callbackSucess, chat_number);
                }, 500);
            }
        }
    }

    function ChatLive_loadBadgesChannelSuccess(responseText, id, chat_number) {
        Chat_loadBadgesTransform(responseText, chat_number);

        ChatLive_loadEmotesChannel(chat_number);
        ChatLive_loadCheersChannel(chat_number);
        ChatLive_loadEmotesChannelffz(chat_number);
        if (ChatLive_Id[chat_number] === id) ChatLive_loadChat(chat_number);
    }

    function ChatLive_loadEmotesChannel(chat_number) {
        if (!extraEmotesDone.bbtv[ChatLive_selectedChannel_id[chat_number]]) {
            ChatLive_loadingDataTry = 0;
            ChatLive_loadEmotesChannelRequest(chat_number);
        }
    }

    function ChatLive_loadEmotesChannelRequest(chat_number) {
        var theUrl = 'https://api.betterttv.net/2/channels/' + encodeURIComponent(ChatLive_selectedChannel[chat_number]);
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = 10000;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    ChatLive_loadEmotesChannelSuccess(xmlHttp.responseText, chat_number);
                } else if (xmlHttp.status === 404) { //not supported by this channel
                    extraEmotesDone.bbtv[ChatLive_selectedChannel_id[chat_number]] = 1;
                } else {
                    ChatLive_loadEmotesChannelError(chat_number);
                }
            }
        };

        xmlHttp.send(null);
    }

    function ChatLive_loadEmotesChannelError(chat_number) {
        ChatLive_loadingDataTry++;
        if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadEmotesChannelRequest(chat_number);
    }

    function ChatLive_loadEmotesChannelSuccess(data, chat_number) {
        ChatLive_loadEmotesbbtv(JSON.parse(data));
        extraEmotesDone.bbtv[ChatLive_selectedChannel_id[chat_number]] = 1;
    }

    function ChatLive_loadCheersChannel(chat_number) {
        if (!extraEmotesDone.cheers[ChatLive_selectedChannel_id[chat_number]]) {
            ChatLive_loadingDataTry = 0;
            ChatLive_loadCheersChannelRequest(chat_number);
        }
    }

    function ChatLive_loadCheersChannelRequest(chat_number) {
        var theUrl = 'https://api.twitch.tv/v5/bits/actions?channel_id=' + encodeURIComponent(ChatLive_selectedChannel_id[chat_number]);
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = 10000;
        xmlHttp.ontimeout = function() {};
        xmlHttp.setRequestHeader(Main_Headers[0][0], Main_Headers[0][1]);

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    ChatLive_loadCheersChannelSuccess(JSON.parse(xmlHttp.responseText), chat_number);
                } else {
                    ChatLive_loadCheersChannelError(chat_number);
                }
            }
        };

        xmlHttp.send(null);
    }

    function ChatLive_loadCheersChannelError(chat_number) {
        ChatLive_loadingDataTry++;
        if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadCheersChannelRequest(chat_number);
    }

    function ChatLive_loadCheersChannelSuccess(data, chat_number) {
        cheers[ChatLive_selectedChannel_id[chat_number]] = {};

        try {
            data.actions.forEach(
                function(action) {

                    cheers[ChatLive_selectedChannel_id[chat_number]][action.prefix] = {};

                    action.tiers.forEach(
                        function(tier) {
                            cheers[ChatLive_selectedChannel_id[chat_number]][action.prefix][tier.min_bits] = tier.images.light.animated['4'];
                        }
                    );
                }
            );

            extraEmotesDone.cheers[ChatLive_selectedChannel_id[chat_number]] = 1;
        } catch (e) {}

    }

    function ChatLive_loadEmotesChannelffz(chat_number) {
        if (!extraEmotesDone.ffz[ChatLive_selectedChannel_id[chat_number]]) {
            ChatLive_loadingDataTry = 0;
            ChatLive_loadEmotesChannelffzRequest(chat_number);
        }
    }

    function ChatLive_loadEmotesChannelffzRequest(chat_number) {
        var theUrl = 'https://api.frankerfacez.com/v1/room/' + encodeURIComponent(ChatLive_selectedChannel[chat_number]);
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = 10000;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    ChatLive_loadEmotesChannelffzSuccess(xmlHttp.responseText, chat_number);
                } else if (xmlHttp.status === 404) { //not supported by this channel
                    extraEmotesDone.ffz[ChatLive_selectedChannel_id[chat_number]] = 1;
                } else {
                    ChatLive_loadEmotesChannelffzError(chat_number);
                }
            }
        };

        xmlHttp.send(null);
    }

    function ChatLive_loadEmotesChannelffzError(chat_number) {
        ChatLive_loadingDataTry++;
        if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadEmotesChannelffzRequest(chat_number);
    }

    function ChatLive_loadEmotesChannelffzSuccess(data, chat_number) {
        ChatLive_loadEmotesffz(JSON.parse(data));
        extraEmotesDone.ffz[ChatLive_selectedChannel_id[chat_number]] = 1;
    }

    function ChatLive_loadEmotesbbtv(data) {
        data.emotes.forEach(function(emote) {
            if (data.urlTemplate) {
                extraEmotes[emote.code] = {
                    code: emote.code,
                    id: emote.id,
                    '4x': 'https:' + data.urlTemplate.replace('{{id}}', emote.id).replace('{{image}}', '3x')
                };
            }
        });
    }

    function ChatLive_loadEmotesffz(data) {
        Object.keys(data.sets).forEach(function(set) {
            set = data.sets[set];
            if (set.emoticons || Array.isArray(set.emoticons)) {

                set.emoticons.forEach(function(emoticon) {

                    if (!emoticon.name || !emoticon.id) return;
                    if (typeof emoticon.name !== 'string' || typeof emoticon.id !== 'number') return;

                    if (extraEmotes[emoticon.name]) return;

                    if (!emoticon.urls || typeof emoticon.urls !== 'object') return;

                    if (typeof emoticon.urls[1] !== 'string') return;
                    if (emoticon.urls[2] && typeof emoticon.urls[2] !== 'string') return;
                    extraEmotes[emoticon.name] = {
                        code: emoticon.name,
                        id: emoticon.id,
                        '4x': 'https:' + (emoticon.urls[4] || emoticon.urls[2] || emoticon.urls[1])
                    };

                });
            }
        });
    }

    function ChatLive_loadChat(chat_number) {
        ChatLive_CheckClear(chat_number);
        ChatLive_loadChatRequest(chat_number);
    }

    function ChatLive_loadChatRequest(chat_number) {
        ChatLive_socket[chat_number] = new ReconnectingWebSocket('wss://irc-ws.chat.twitch.tv', 'irc', {
            reconnectInterval: 3000
        });

        ChatLive_socket[chat_number].onopen = function() {
            ChatLive_socket[chat_number].send('PASS blah\r\n');
            ChatLive_socket[chat_number].send('NICK justinfan12345\r\n');
            ChatLive_socket[chat_number].send('CAP REQ :twitch.tv/commands twitch.tv/tags\r\n');
            ChatLive_socket[chat_number].send('JOIN #' + ChatLive_selectedChannel[chat_number] + '\r\n');
        };

        ChatLive_socket[chat_number].onmessage = function(data) {

            var message = window.parseIRC(data.data.trim());

            if (!message.command) return;

            switch (message.command) {
                case "PING":
                    ChatLive_socket[chat_number].send('PONG ' + message.params[0]);
                    break;
                case "JOIN":
                    ChatLive_loaded[chat_number] = true;
                    var div = '&nbsp;<span class="message">' + STR_BR + STR_LOADING_CHAT +
                        (!chat_number ? Play_data.data[1] : PlayExtra_data.data[1]) + ' ' + STR_LIVE + '</span>';

                    if (Play_ChatDelayPosition) {
                        var stringSec = STR_SECOND;
                        if (Play_controls[Play_controlsChatDelay].defaultValue > 1) stringSec = STR_SECONDS;

                        div += '&nbsp;<span class="message">' + STR_BR + STR_BR + STR_CHAT_DELAY + ' ' +
                            Play_controls[Play_controlsChatDelay].values[Play_controls[Play_controlsChatDelay].defaultValue] +
                            stringSec + '</span>';
                    }

                    ChatLive_LineAdd(div, chat_number);
                    break;
                case "PRIVMSG":
                    ChatLive_loadChatSuccess(message, chat_number);
                    break;
                default:
                    break;
            }
        };

        ChatLive_CheckId[chat_number] = window.setTimeout(function() {
            ChatLive_Check(chat_number);
        }, 5000);
    }

    function ChatLive_Check(chat_number) {
        if (!ChatLive_loaded[chat_number]) {
            ChatLive_socket[chat_number].close(1000);
            ChatLive_loadChat(chat_number);
        }
    }

    function ChatLive_CheckClear(chat_number) {
        window.clearTimeout(ChatLive_CheckId[chat_number]);
    }

    function ChatLive_loadChatSuccess(message, chat_number) {
        var div = '',
            tags = message.tags,
            nick,
            nickColor,
            action,
            emotes = {};

        if (!tags || !tags.hasOwnProperty('display-name')) return; //bad formatted message

        //Add badges
        if (tags.hasOwnProperty('badges')) {
            if (typeof tags.badges === 'string') {
                tags.badges.split(',').forEach(function(badge) {
                    badge = badge.split('/');

                    div += '<span class="' + badge[0] + (badge[0].indexOf('subscriber') !== -1 ? chat_number : "") + '-' + badge[1] + ' tag"></span>';
                });
            }
        }

        //Add message
        var mmessage = message.params[1];
        //For some bug on the chat implementation some message comes with the raw message of the next message
        //Remove the next to fix current... next will be lost as is not correctly formated
        if (mmessage.indexOf('PRIVMSG') !== -1) mmessage = mmessage.split('@badge-info=')[0];

        if (/^\x01ACTION.*\x01$/.test(mmessage)) {
            action = true;
            mmessage = mmessage.replace(/^\x01ACTION/, '').replace(/\x01$/, '').trim();
        }

        //Add nick
        nick = tags['display-name'];
        nickColor = (typeof tags.color !== "boolean") ? tags.color :
            (defaultColors[(nick).charCodeAt(0) % defaultColorsLength]);

        nickColor = 'style="color: ' + calculateColorReplacement(nickColor) + ';"';

        div += '<span ' + (action ? ('class="class_bold" ' + nickColor) : '') +
            nickColor + '>' + nick + '</span>' +
            (action ? '' : '&#58;') + '&nbsp;';

        //Add default emotes
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

        div += '<span class="message' + (action ? (' class_bold" ' + nickColor) : '"') + '>' +
            ChatLive_extraMessageTokenize(
                emoticonize(mmessage, emotes),
                chat_number,
                ((tags.hasOwnProperty('bits') && cheers.hasOwnProperty(ChatLive_selectedChannel_id[chat_number])) ? parseInt(tags.bits) : 0)
            ) + '</span>';

        if (!Play_ChatDelayPosition) ChatLive_LineAdd(div, chat_number);
        else {
            var id = ChatLive_Id[chat_number];
            window.setTimeout(function() {
                if (id === ChatLive_Id[chat_number]) ChatLive_LineAdd(div, chat_number);
            }, (Play_controls[Play_controlsChatDelay].values[Play_controls[Play_controlsChatDelay].defaultValue] * 1000));
        }
    }

    function ChatLive_extraMessageTokenize(tokenizedMessage, chat_number, tags) {

        for (var i = 0; i < tokenizedMessage.length; i++) {
            if (typeof tokenizedMessage[i] === 'string') {
                tokenizedMessage[i] = extraMessageTokenize(tokenizedMessage[i], chat_number, tags);
            } else {
                tokenizedMessage[i] = tokenizedMessage[i][0];
            }
        }

        return twemoji.parse(tokenizedMessage.join(' '), true, true);
    }

    function ChatLive_LineAdd(message, chat_number) {
        if (ChatLive_Playing) {
            var elem = document.createElement('div');
            elem.className = 'chat_line';
            elem.innerHTML = message;

            Chat_div[chat_number].appendChild(elem);

            ChatLive_LineAddCounter[chat_number]++;
            if (ChatLive_LineAddCounter[chat_number] > Chat_CleanMax) {
                ChatLive_LineAddCounter[chat_number] = 0;
                Chat_Clean(chat_number);
            }
        } else {
            ChatLive_Messages[chat_number].push(message);
        }
    }

    function ChatLive_MessagesRunAfterPause() {
        var i, j,
            Temp_Messages = [];

        Temp_Messages[0] = Main_Slice(ChatLive_Messages[0]);
        ChatLive_Messages[0] = [];

        Temp_Messages[1] = Main_Slice(ChatLive_Messages[1]);
        ChatLive_Messages[1] = [];

        for (i = 0; i < 2; i++) {
            for (j = 0; j < Temp_Messages[i].length; j++) {
                ChatLive_LineAdd(Temp_Messages[i][j], i);
            }
        }
    }

    function ChatLive_ClearIds(chat_number) {
        ChatLive_CheckClear(chat_number);
        window.clearTimeout(ChatLive_loadBadgesChannelId);
    }

    function ChatLive_Clear(chat_number) {
        ChatLive_ClearIds(chat_number);
        if (ChatLive_socket[chat_number]) ChatLive_socket[chat_number].close(1000);
        ChatLive_Id[chat_number] = 0;
        ChatLive_LineAddCounter[chat_number] = 0;
        ChatLive_Messages[chat_number] = [];

        if (!chat_number) Main_empty('chat_box');
        else Main_empty('chat_box2');

        ChatLive_loaded[chat_number] = false;
    }
    //Variable initialization
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
    var defaultColors = [
        "#fe2424", "#fc5a24", "#ff9020", "#fEc723", "#ffff1d",
        "#bfff00", "#c3ff12", "#56fe1d", "#1eff1e", "#16ff51",
        "#00ff80", "#00ffbf", "#00ffff", "#1dc6ff", "#158aff",
        "#3367ff", "#ff4dff", "#ff4ad2", "#ff62b1", "#ff4272"
    ];
    var defaultColorsLength = defaultColors.length;
    var Chat_div = [];
    var Chat_Position = 0;
    var Chat_hasEnded = false;
    var Chat_Id = 0;
    var Chat_CleanMax = 60;
    var Chat_JustStarted = true;
    //Variable initialization end

    function Chat_Preinit() {
        Chat_div[0] = document.getElementById('chat_box');
        Chat_div[1] = document.getElementById('chat_box2');
        ChatLive_LineAddCounter[0] = 0;
        ChatLive_LineAddCounter[1] = 0;
        ChatLive_Messages[0] = [];
        ChatLive_Messages[1] = [];
        Chat_loadBadgesGlobal();
    }

    function Chat_Init() {
        Chat_JustStarted = true;
        Chat_Clear();
        if (!Main_IsNotBrowser || Main_values.Play_ChatForceDisable) {
            Chat_Disable();
            return;
        }
        if (!Chat_LoadGlobal) Chat_loadBadgesGlobal();

        Chat_Id = (new Date()).getTime();
        ChatLive_selectedChannel_id[0] = Main_values.Main_selectedChannel_id;
        ChatLive_selectedChannel[0] = Main_values.Main_selectedChannel;
        ChatLive_loadBadgesChannel(Chat_Id, Chat_loadBadgesChannelSuccess, 0);
    }

    function Chat_loadBadgesGlobal() {
        extraEmotes = {};
        Chat_loadingDataTry = 0;
        Chat_LoadGlobal = false;
        Chat_loadBadgesGlobalRequest();
    }

    function Chat_loadBadgesGlobalRequest() {
        var theUrl = 'https://badges.twitch.tv/v1/badges/global/display';
        BasexmlHttpGet(theUrl, 10000, 0, null, Chat_loadBadgesGlobalSuccess, Chat_loadBadgesGlobalError);
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
        BasexmlHttpGet(theUrl, 10000, 0, null, Chat_loadEmotesSuccess, Chat_loadEmotesError);
    }

    function Chat_loadEmotesError() {
        Chat_loadingDataTry++;
        if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadEmotesRequest();
        else Chat_LoadGlobal = false;
    }

    function Chat_loadEmotesSuccess(data) {
        ChatLive_loadEmotesbbtv(JSON.parse(data));
        Chat_loadEmotesffz();
    }

    function Chat_loadEmotesffz() {
        Chat_loadingDataTry = 0;
        Chat_loadEmotesRequestffz();
    }

    function Chat_loadEmotesRequestffz() {
        var theUrl = 'https://api.frankerfacez.com/v1/set/global';
        BasexmlHttpGet(theUrl, 10000, 0, null, Chat_loadEmotesSuccessffz, Chat_loadEmotesErrorffz);
    }

    function Chat_loadEmotesErrorffz() {
        Chat_loadingDataTry++;
        if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadEmotesRequestffz();
        else Chat_LoadGlobal = false;
    }

    function Chat_loadEmotesSuccessffz(data) {
        ChatLive_loadEmotesffz(JSON.parse(data));

        Chat_LoadGlobal = true;
    }

    function Chat_loadBadgesTransform(responseText, chat_number) {
        transformBadges(JSON.parse(responseText).badge_sets).forEach(function(badge) {
            badge.versions.forEach(function(version) {
                tagCSS(badge.type + chat_number, version.type, version.image_url_4x, Chat_div[chat_number]);
            });
        });
    }

    function Chat_loadBadgesChannelSuccess(responseText, id) {
        Chat_loadBadgesTransform(responseText, 0);

        ChatLive_loadEmotesChannel(0);
        ChatLive_loadCheersChannel(0);
        ChatLive_loadEmotesChannelffz(0);
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
                window.clearTimeout(Chat_loadChatId);
                Chat_loadChatId = window.setTimeout(function() {
                    Chat_loadChatRequest(id);
                }, 2500);
            }
        }
    }

    function Chat_loadChatSuccess(responseText, id) {
        responseText = JSON.parse(responseText);
        var div,
            mmessage, null_next = (Chat_next === null),
            nickColor;

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
                    div += '<span class="' + badges._id + (badges._id.indexOf('subscriber') !== -1 ? "0-" : "-") + badges.version + ' tag"></span>';
                });
            }

            //Add nick
            nickColor = mmessage.hasOwnProperty('user_color') ? mmessage.user_color :
                defaultColors[(comments.commenter.display_name).charCodeAt(0) % defaultColorsLength];

            nickColor = 'style="color: ' + calculateColorReplacement(nickColor) + ';"';

            div += '<span ' + (mmessage.is_action ? ('class="class_bold" ' + nickColor) : '') +
                nickColor + '>' + comments.commenter.display_name + '</span>' +
                (mmessage.is_action ? '' : '&#58;') + '&nbsp;';

            //Add mesage
            div += '<span class="message' + (mmessage.is_action ? (' class_bold" ' + nickColor) : '"') + '>';
            mmessage.fragments.forEach(function(fragments) {
                if (fragments.hasOwnProperty('emoticon')) div += emoteTemplate(emoteURL(fragments.emoticon.emoticon_id));
                else div +=
                    ChatLive_extraMessageTokenize(
                        [fragments.text],
                        0,
                        ((mmessage.hasOwnProperty('bits_spent') && cheers.hasOwnProperty(ChatLive_selectedChannel_id[0])) ? mmessage.bits_spent : 0)
                    );
            });

            div += '</span>';
            if (null_next) Chat_MessageVector(div, comments.content_offset_seconds);
            else if (Chat_next !== undefined) Chat_MessageVectorNext(div, comments.content_offset_seconds);
        });
        if (null_next && Chat_Id === id) {
            Chat_JustStarted = false;
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
        if (!Chat_JustStarted && !Chat_hasEnded && Chat_Id === id && !Main_values.Play_ChatForceDisable) {
            Main_Addline(id);
            window.clearInterval(Chat_addlinesId);
            Chat_addlinesId = window.setInterval(function() {
                Main_Addline(id);
            }, 1000);
        }
    }

    function Chat_Pause() {
        window.clearTimeout(Chat_loadChatId);
        window.clearTimeout(Chat_loadChatNextId);
        window.clearInterval(Chat_addlinesId);
    }

    function Chat_Clear() {
        // on exit cleanup the div
        Chat_hasEnded = false;
        Chat_Pause();
        Chat_Id = 0;
        Main_empty('chat_box');
        Main_empty('chat_box2');
        Chat_next = null;
        Chat_Messages = [];
        Chat_MessagesNext = [];
        Chat_Position = 0;
    }

    function Main_Addline(id) {
        var elem, i;
        if (Chat_Position < (Chat_Messages.length - 1)) {
            for (i = Chat_Position; i < Chat_Messages.length; i++, Chat_Position++) {
                if (Chat_Messages[i].time < (ChannelVod_vodOffset + (Android.gettime() / 1000))) {
                    elem = document.createElement('div');
                    elem.className = 'chat_line';
                    elem.innerHTML = Chat_Messages[i].message;

                    Chat_div[0].appendChild(elem);
                } else {
                    break;
                }
            }
        } else {
            Chat_Pause();
            if (Chat_next !== undefined) {
                //array.slice() may crash RangeError: Maximum call stack size exceeded
                Chat_Messages = Main_Slice(Chat_MessagesNext);

                Chat_Position = 0;
                Chat_Play(id);
                Chat_MessagesNext = [];

                if (Chat_Id === id) Chat_loadChatNext(id);
                Chat_Clean(0);
            } else { //Chat has eneded
                var div = '&nbsp;';
                div += '<span class="message">';
                div += STR_BR + STR_BR + STR_CHAT_END + STR_BR + STR_BR;
                div += '</span>';

                elem = document.createElement('div');
                elem.className = 'chat_line';
                elem.innerHTML = div;

                if (!Chat_hasEnded) Chat_div[0].appendChild(elem);

                Chat_hasEnded = true;
                window.clearInterval(Chat_addlinesId);
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
                window.clearTimeout(Chat_loadChatNextId);
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
        div += Line;
        div += '</span>';

        var elem = document.createElement('div');
        elem.className = 'chat_line';
        elem.innerHTML = div;

        Chat_div[0].appendChild(elem);
        Chat_div[1].appendChild(elem.cloneNode(true));
    }

    function Chat_Clean(chat_number) {
        //delete old lines out of view
        var linesToDelete = Chat_div[chat_number].getElementsByClassName("chat_line");
        if ((linesToDelete.length - Chat_CleanMax) > 0) {
            for (var i = 0; i < (linesToDelete.length - Chat_CleanMax); i++) {
                Chat_div[chat_number].removeChild(linesToDelete[0]);
            }
        }
    }
    //Variable initialization
    var smartTwitchTV;
    var Main_isReleased = false;
    var Main_isDebug = false;

    var Main_cursorYAddFocus = -1;

    var Main_Search = 0;
    var Main_Live = 1;
    var Main_Users = 2;
    var Main_Featured = 3;
    var Main_games = 4;
    var Main_Vod = 5;
    var Main_Clip = 6;
    var Main_UserLive = 7;
    var Main_UserHost = 8;
    var Main_usergames = 9;
    var Main_UserVod = 10;
    var Main_UserChannels = 11;
    var Main_SearchGames = 12;
    var Main_SearchLive = 13;
    var Main_SearchChannels = 14;
    var Main_ChannelContent = 15;
    var Main_ChannelVod = 16;
    var Main_ChannelClip = 17;
    var Main_addUser = 18;
    var Main_aGame = 19;
    var Main_AGameVod = 20;
    var Main_AGameClip = 21;
    var Main_HistoryLive = 22;
    var Main_HistoryVod = 23;
    var Main_HistoryClip = 24;

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
        "Main_gameSelected_id": '',
        "Main_OldgameSelected": null,
        "Play_isHost": false,
        "Users_AddcodePosition": 0,
        "Play_WasPlaying": 0,
        "ChannelVod_vodId": '',
        "vodOffset": 0,
        "Search_data": '',
        "gameSelectedOld": null,
        "Games_return": false,
        "Search_isSearching": false,
        "Play_ChatForceDisable": false,
        "Never_run_new": true,
        "Chat_font_size": 3,
        "ChatBackground": 10,
        "IsRerun": false,
        "Main_selectedChannelPartner": false,
        "Sidepannel_Pos": 2,
        "Sidepannel_IsUser": false,
        "My_channel": false,
        "DeviceCheck": false,
        "Never_run_phone": true,
        "Codec_is_Check": false,
        "check_pp_workaround": true,
        "OS_is_Check": false,
        "Restore_Backup_Check": false,
        "Restore_Created_at_fix": false,
    };

    var Main_values_Play_data;
    var Main_values_History_data = {}; //The obj is defined in AddUser_RestoreUsers()
    var Main_Force = "4mv6wki5h1ko";
    var Main_LastClickFinish = true;
    var Main_addFocusFinish = true;
    var Main_newUsercode = 0;
    var Main_ExitCursor = 0;
    var Main_ExitDialogID = null;
    var Main_IsDayFirst = false;
    var Main_SearchInput;
    var Main_AddUserInput;
    var Main_updateclockId;
    var Main_ContentLang = "";
    var Main_Periods = [];
    var Main_addFocusVideoOffset = 0;
    var Main_FirstRun = true;
    var Main_FirstLoad = false;
    var Main_RunningTime = 0;
    var Main_Hash = "ncx6brgo";

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

    var Main_kraken_api = 'https://api.twitch.tv/kraken/';
    var Main_clientId = "5seja5ptej058mxqy7gh5tcudjqtm9";
    var Main_clientIdHeader = 'Client-ID';
    var Main_AcceptHeader = 'Accept';
    var Main_Authorization = 'Authorization';
    var Main_OAuth = 'OAuth ';
    var Main_TwithcV5Json = 'application/vnd.twitchtv.v5+json';
    var Main_TwithcV5Flag = '&api_version=5';
    var Main_TwithcV5Flag_I = '?api_version=5';

    var Main_classThumb = 'stream_thumbnail_focused';
    var Main_DataAttribute = 'data_attribute';

    var Main_stringVersion = '3.0';
    var Main_stringVersion_Min = '.110';
    var Main_minversion = '020520';
    var Main_versionTag = Main_stringVersion + Main_stringVersion_Min + '-' + Main_minversion;
    var Main_IsNotBrowserVersion = '';
    var Main_AndroidSDK = 1000;
    var Main_ClockOffset = 0;
    var Main_IsNotBrowser = 0;
    var Main_randomimg = '?' + Math.random();
    var Main_updateUserFeedId;
    var Main_vp9supported = false;
    //var Main_SupportsAvc1High = false;
    var Main_Fix = "kimne78kx3";
    var Main_DoRestore = true;
    var Main_CanBackup = false;
    var Main_UserBackupFile = 'user.json';
    var Main_HistoryBackupFile = 'history.json';
    //Variable initialization end

    // this function will be called only once the first time the app startup
    if (!Main_isReleased) Main_Start();

    function Main_Start() {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", function() {
                Main_loadTranslations(window.navigator.userLanguage || window.navigator.language);
            });
        } else { // `DOMContentLoaded` already fired
            Main_loadTranslations(window.navigator.userLanguage || window.navigator.language);
        }
    }

    function Main_loadTranslations(language) {
        Main_Checktylesheet();

        Main_ready(function() {
            try {
                if (window.location.href.indexOf('asset') !== -1) {
                    //Same as in smartTwitchTV/release/api.js
                    //The app is running from assets need to expose smartTwitchTV
                    smartTwitchTV = {
                        'mainstart': Main_Start,
                        'Play_PannelEndStart': Play_PannelEndStart,
                        'Play_CheckResume': Play_CheckResume,
                        'Play_PlayerCheck': Play_PlayerCheck,
                        'Play_UpdateDuration': Play_UpdateDuration,
                        'Play_CheckResumeForced': Play_CheckResumeForced,
                        'PlayExtra_End': PlayExtra_End,
                        'Play_MultiEnd': Play_MultiEnd
                    };
                }
                Main_IsNotBrowser = Android.getAndroid();
                Main_IsNotBrowserVersion = Android.getversion();
            } catch (e) {
                Main_IsNotBrowserVersion = '1.0.0';
                Main_IsNotBrowser = 0;
                document.body.style.backgroundColor = "rgba(0, 0, 0, 1)";
                Main_isDebug = true;
                console.log('Main_isReleased: ' + Main_isReleased);
                console.log('Main_isDebug: ' + Main_isDebug);
                console.log('Main_isBrowser: ' + !Main_IsNotBrowser);
                //If we add the class on the android app for some reason it prevents input from release the focus
                Main_AddClass('scenefeed', 'feed_screen_input');
            }
            Main_showLoadDialog();

            if (Main_IsNotBrowser) Main_vp9supported = Android.misCodecSupported();

            Main_initClick();
            Settings_SetDefautls();
            calculateFontSize();
            en_USLang();
            Languages_SetDefautls();

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

            Main_SearchInput = document.getElementById("search_input");
            Main_AddUserInput = document.getElementById("user_input");

            Main_RestoreValues();

            Main_DoRestore = AddUser_RestoreUsers();

            if (!Main_values.Restore_Backup_Check) {

                try {
                    if (Main_IsNotBrowser) Android.requestWr();
                    Main_HideLoadDialog();
                    Main_innerHTML("main_dialog_remove", STR_BACKUP);
                    Main_textContent('remove_cancel', STR_NO);
                    Main_textContent('remove_yes', STR_YES);
                    Main_ShowElement('main_remove_dialog');
                    Main_values.Restore_Backup_Check = true;
                    document.body.addEventListener("keydown", Main_BackupDialodKeyDown, false);
                } catch (e) {
                    window.setTimeout(Main_initWindows, 500);
                    return;
                }
            } else window.setTimeout(Main_initWindows, 500);

        });

    }

    function Main_BackupDialodKeyDown(event) {
        switch (event.keyCode) {
            case KEY_LEFT:
                Users_RemoveCursor--;
                if (Users_RemoveCursor < 0) Users_RemoveCursor = 1;
                Users_RemoveCursorSet();
                break;
            case KEY_RIGHT:
                Users_RemoveCursor++;
                if (Users_RemoveCursor > 1) Users_RemoveCursor = 0;
                Users_RemoveCursorSet();
                break;
            case KEY_ENTER:
                Main_showLoadDialog();
                Main_HideElement('main_remove_dialog');
                document.body.removeEventListener("keydown", Main_BackupDialodKeyDown);
                if (Users_RemoveCursor && !Main_DoRestore) Main_initRestoreBackups();
                else Main_initWindows();
                break;
            default:
                break;
        }
    }

    function Main_initRestoreBackups() {
        try {

            if (Android.HasBackupFile(Main_UserBackupFile)) {

                var tempBackup = Android.RestoreBackupFile(Main_UserBackupFile);

                if (tempBackup !== null) {
                    var tempBackupArray = JSON.parse(tempBackup) || [];

                    if (tempBackupArray.length > 0) {
                        Main_setItem('AddUser_UsernameArray', tempBackup);

                        tempBackup = Android.RestoreBackupFile(Main_HistoryBackupFile);
                        if (tempBackup !== null) Main_setItem('Main_values_History_data', tempBackup);

                        AddUser_RestoreUsers();
                    }
                }

            }

            Main_initWindows();
        } catch (e) {
            Main_initWindows();
        }
    }

    function Main_initWindows() {
        try {
            Main_CanBackup = Android.canBackupFile();

            //Backup at start as a backup may never be done yet
            if (Main_CanBackup) {
                Android.BackupFile(Main_UserBackupFile, JSON.stringify(AddUser_UsernameArray));
                Android.BackupFile(Main_HistoryBackupFile, JSON.stringify(Main_values_History_data));
            }

        } catch (e) {
            Main_CanBackup = false;
        }

        Users_RemoveCursor = 0;
        Users_RemoveCursorSet();

        if (Main_IsNotBrowser) {

            if (!Main_values.DeviceCheck) {

                Main_values.DeviceCheck = true;

                if ((Android.getDevice()).toLowerCase().indexOf('shield android tv') !== -1 ||
                    (Android.getManufacturer()).toLowerCase().indexOf('nvidia') !== -1) {
                    //Some devices are very slow and are affected by some app default setting Nvidia shield is not

                    //bitrate to max possible
                    Settings_value.bitrate_min.defaultValue = 0;
                    Main_setItem('bitrate_min', 1);
                    Android.SetSmallPlayerBandwidth(0);

                    //Enable app animations
                    Settings_value.app_animations.defaultValue = 1;
                    Main_setItem('app_animations', 2);
                    Settings_SetAnimations();
                }
            }

            //Disable googles OMX.google.h264.decoder if another codec is available
            //Check if at least one none google codec is available
            if (!Main_values.Codec_is_Check) {
                var getcodec = Android.getcodecCapabilities('avc');

                if (getcodec !== null) {

                    Main_values.Codec_is_Check = true;
                    var codecs = getcodec.split('|');

                    if (codecs.length > 1) {

                        var codecsValue,
                            codecsnames = [];

                        for (var i = 0; i < codecs.length; i++) {
                            codecsValue = codecs[i].split(',');
                            if (codecsValue[1].toLowerCase().indexOf('google') !== -1)
                                codecsnames.push(codecsValue[1]);
                        }

                        if (codecsnames.length < 2) {

                            Main_setItem(codecsnames[0], 1);
                            Main_setItem('Settings_DisableCodecsNames', JSON.stringify(codecsnames));

                            Android.setBlackListMediaCodec(codecsnames.join());
                        }
                    }
                }

            }

            try {
                Main_AndroidSDK = Android.getSDK();
            } catch (e) {
                Main_AndroidSDK = 1000;
            }

            //Android N (sdk 25) and older don't properly support animations on surface_view
            //So enable the workaround by default
            if (!Main_values.OS_is_Check && Main_AndroidSDK < 1000) {
                if (Main_AndroidSDK < 26) {
                    Settings_value.pp_workaround.defaultValue = 1;
                    Main_setItem('pp_workaround', 2);
                }
                Main_values.OS_is_Check = true;
            }

            //Check for High Level 5.2 video/mp4; codecs="avc1.640034" as some devices don't support it
            //TODO add a warning when playing avc1.640034 and a setting to disable it
            //Main_SupportsAvc1High = Android.misAVC52Supported();
        }

        Main_SetStringsMain(true);

        Main_GoBefore = Main_values.Main_Go;

        Main_ready(function() {
            Chat_Preinit();
            Play_PreStart();

            if (AddUser_UserIsSet()) {
                Main_updateUserFeedId = window.setInterval(Main_updateUserFeed, 600000);
            }
            document.body.addEventListener("keyup", Main_handleKeyUp, false);
            Screens_InitScreens();

            document.getElementById("side_panel").style.marginLeft = '';
            document.getElementById("user_feed_notify").style.marginTop = '';

            Main_checkVersion();

            Main_SetStringsSecondary();

            Play_MakeControls();
            Play_SetControls();
            Play_SetFullScreen(Play_isFullScreen);

            Main_updateclockId = window.setInterval(Main_updateclock, 60000);

            inUseObj = Live;
            Main_ready(function() {
                Screens_init();
                Sidepannel_UpdateThumbDoc = document.getElementById("feed_thumb_img");
            });
        });
    }

    function Main_SetStringsMain(isStarting) {
        Main_updateclock();
        UserLiveFeed_Prepare();

        //set top bar labels
        Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);
        Main_innerHTML('label_update', '<div style="vertical-align: middle; display: inline-block;"><i class="icon-update" style="color: #FF0000;"></i></div><div style="vertical-align: middle; display: inline-block; color: #FF0000">' + STR_SPACE + STR_UPDATE_AVAILABLE + '</div>');

        Main_IconLoad('label_side_panel', 'icon-arrow-right', STR_THUMB_OPTIONS_TOP);
        UserLiveFeed_SetFeedPicText();

        Sidepannel_SetDefaultLables();

        Main_textContent("dialog_end_next_text", STR_PLAY_NEXT);
        Main_textContent("dialog_end_replay_text", STR_REPLAY);
        Main_textContent("dialog_end_vod_text", STR_OPEN_BROADCAST);
        Main_textContent("dialog_end_channel_text", STR_CHANNEL_CONT);
        Main_textContent("dialog_end_game_text", STR_GAME_CONT);
        Main_innerHTML("dialog_about_text", STR_ABOUT_INFO_HEADER +
            '<div id="about_runningtime"></div>' + STR_ABOUT_INFO_0);

        Main_Periods = [STR_CLIP_DAY, STR_CLIP_WEEK, STR_CLIP_MONTH, STR_CLIP_ALL];

        if (isStarting) Settings_SetSettings();
        else {
            Settings_SetStrings();
            Main_checkVersion();
        }
    }

    function Main_SetStringsSecondary() {
        Main_textContent("play_dialog_exit_text", STR_EXIT_AGAIN);

        Main_textContent('side_panel_feed_settings', STR_SIDE_PANEL_SETTINGS);
        Main_textContent('side_panel_feed_refresh', STR_REFRESH);
        Main_textContent('user_feed_notify_main', STR_NOW_LIVE);

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
        Main_innerHTML("dialog_phone_text", STR_ABOUT_PHONE_0);
        Main_textContent('side_panel_warn_text', STR_NO + STR_LIVE_CHANNELS);
        Main_textContent('side_panel_movel_top_text', STR_LIVE_FEED);

        Main_textContent("dialog_period_text", STR_SWITCH_CLIP);
        Main_innerHTML("dialog_period_1", Main_Periods[0]);
        Main_innerHTML("dialog_period_2", Main_Periods[1]);
        Main_innerHTML("dialog_period_3", Main_Periods[2]);
        Main_innerHTML("dialog_period_4", Main_Periods[3]);

        Main_innerHTML("main_dialog_user_first", STR_USER_MAKE_ONE);
        Main_innerHTML("main_dialog_user_remove", STR_USER_REMOVE);

        Main_innerHTML("dialog_OffSet_text", STR_SWITCH_POS + STR_BR);
        Main_textContent("dialog_OffSet_text_summary", STR_SWITCH_POS_SUMMARY);

        Main_textContent("dialog_vod_text", STR_VOD_HISTORY);
        Main_innerHTML("dialog_vod_start_text", STR_FROM_START);

        Main_innerHTML('channel_content_titley_0', '<i class="icon-movie-play stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_VIDEOS);
        Main_innerHTML('channel_content_titley_1', '<i class="icon-movie stream_channel_fallow_icon"></i>' + STR_SPACE + STR_SPACE + STR_CLIPS);
        Main_innerHTML('channel_content_titley_2', '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; "></i>' + STR_SPACE + STR_SPACE + STR_FALLOW);

        Main_innerHTML("dialog_os_text", STR_PP_WARNIG + STR_BR + STR_BR + STR_DIV_TITLE + STR_CLOSE_THIS2 + '</div>');

        Main_textContent("dialog_hist_setting_name_0", STR_SORTING);
        Main_textContent("dialog_hist_setting_name_1", STR_ENABLE);
        Main_textContent("dialog_hist_setting_name_2", STR_DELETE_HISTORY);
        Main_textContent('dialog_hist_val_2', STR_PRESS_ENTER_D);
        Main_textContent('dialog_hist_text_end', STR_PRESS_ENTER_APPLY);

        Main_textContent('dialog_opt_text', STR_THUMB_OPTIONS);
        Main_textContent('dialog_opt_text_end', STR_THUMB_OPTIONS_KEY);

        Main_textContent('dialog_thumb_opt_setting_name_-1', STR_DELETE_FROM_HISTORY);
        Main_textContent('dialog_thumb_opt_val_-1', STR_PRESS_ENTER_D);

        Main_textContent('dialog_thumb_opt_setting_name_0', STR_OPEN_CHANNEL);
        Main_textContent('dialog_thumb_opt_setting_name_1', STR_OPEN_GAME);
        Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_LIVE_DIS);
        Main_textContent('dialog_thumb_opt_setting_name_4', STR_GO_TO);

        Main_innerHTML("dialog_multi_help_text", STR_CONTROLS_MULTI);
    }

    var Main_initClickDoc = [
        "clickup", "clickdown", "clickleft", "clickright", "clickenter", "clickback",
        "clickpgup", "clickpgdown", "clickfeed"
    ];
    var Main_setHideButtonsId;
    var Main_scenekeysDoc;
    var Main_scenekeysPositionDoc;
    var Main_isTV;

    function Main_initClick() {
        if (Main_IsNotBrowser) {
            //TODO remove the try after some itme of the app be released
            try {
                Main_isTV = Android.deviceIsTV();
                //Only show virtual d-pad on none TV devices
                if (Main_isTV) return;
            } catch (e) {
                return;
            }
        }

        Main_ShowElement('scenekeys');
        Main_scenekeysDoc = document.getElementById('scenekeys');
        Main_scenekeysPositionDoc = document.getElementById('scenekeys_position');

        for (var i = 0; i < Main_initClickDoc.length; i++) {
            Main_initClickSet(document.getElementById(Main_initClickDoc[i]), i);
        }

        document.body.onpointerup = function() {
            Main_initbodyClickSet();
        };
        Main_initbodyClickSet();
    }

    function Main_initbodyClickSet() {
        //if (Main_isElementShowing('search_scroll')) Search_KeyboardDismiss();
        //else if (Main_isElementShowing('add_user_scroll')) AddUser_KeyboardDismiss();

        Settings_DpadOpacity();
        Main_clearHideButtons();
        Main_setHideButtons();
    }

    function Main_buttonsVisible() {
        return parseInt(Main_scenekeysDoc.style.opacity * 100) ===
            parseInt(Settings_Obj_default("dpad_opacity") * 5);
    }

    function Main_clearHideButtons() {
        window.clearTimeout(Main_setHideButtonsId);
    }

    function Main_setHideButtons() {
        Main_setHideButtonsId = window.setTimeout(Main_HideButtons, 4000);
    }

    function Main_HideButtons() {
        Main_scenekeysDoc.style.opacity = "0";
    }

    var Main_initClickSetId;
    var Main_initClickTimeoutId;

    function Main_initClickSet(doc, pos) {
        doc.onpointerdown = function() {
            Main_ClickonpointerdownClear();
            if (!Main_buttonsVisible()) return;

            Main_Clickonpointerdown(pos);

            Main_initClickTimeoutId = window.setTimeout(function() {
                Main_ClickonpointerdownClear();
                Main_initClickSetId = window.setInterval(function() {
                    Main_Clickonpointerdown(pos);
                }, 50);
            }, 600);
        };

        doc.onpointerup = function() {
            Main_ClickonpointerdownClear();
            if (!Main_buttonsVisible()) return;

            if (Main_IsNotBrowser) Android.keyEvent(pos, 1);
            else console.log("pointerup key " + Main_initClickDoc[pos] + " even " + 1);
        };
    }

    function Main_ClickonpointerdownClear() {
        window.clearTimeout(Main_initClickTimeoutId);
        window.clearInterval(Main_initClickSetId);
    }

    function Main_Clickonpointerdown(pos) {
        if (Main_IsNotBrowser) Android.keyEvent(pos, 0);
        else console.log("pointerdown key " + Main_initClickDoc[pos] + " even " + 0);
    }

    function Main_IconLoad(lable, icon, string) {
        Main_innerHTML(lable, '<div style="vertical-align: middle; display: inline-block; transform: translateY(15%);"><i class="' + icon + '" style="color: #FFFFFF;"></i></div><div style="vertical-align: middle; display: inline-block;">' + STR_SPACE + string + '</div>');
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

    function Main_replaceClassEmoji(div) {
        var emojiel = document.getElementById(div).getElementsByClassName("emoji");
        if (emojiel) {
            var i = 0;
            for (i; i < emojiel.length; i++)
                emojiel[i].classList.add('emoticon');

            emojiel = document.getElementById(div).getElementsByClassName("emoticon");
            for (i = 0; i < emojiel.length; i++)
                emojiel[i].classList.remove('emoji');
        }
    }

    function Main_showLoadDialog() {
        Main_YRst(-1);
        if (Main_IsNotBrowser) Android.mshowLoading(true);
        else Main_ShowElement('dialog_loading');
    }

    function Main_HideLoadDialog() {
        if (Main_IsNotBrowser) Android.mshowLoading(false);
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
        Main_SwitchScreenAction();
        Main_clearExitDialog();
        Main_HideElement('main_dialog_exit');
        Main_ExitCursor = 0;
        Main_ExitCursorSet();
    }

    function Main_ExitCursorSet() {
        Main_RemoveClass('exit_app_cancel', 'button_dialog_focused');
        Main_RemoveClass('exit_app_minimize', 'button_dialog_focused');
        Main_RemoveClass('exit_app_close', 'button_dialog_focused');
        if (!Main_ExitCursor) Main_AddClass('exit_app_cancel', 'button_dialog_focused');
        else if (Main_ExitCursor === 1) Main_AddClass('exit_app_minimize', 'button_dialog_focused');
        else Main_AddClass('exit_app_close', 'button_dialog_focused');
    }

    function Main_CounterDialogRst() {
        Main_empty('dialog_counter_text');
    }

    function Main_CounterDialog(x, y, coloumns, total) {
        if (total > 0) Main_textContent('dialog_counter_text', (y * coloumns) + (x + 1) + '/' + (total));
        else Main_CounterDialogRst();
    }

    function Main_showWarningDialog(text) {
        Main_innerHTML('dialog_warning_text', text);
        Main_ShowElement('dialog_warning');
    }

    function Main_HideWarningDialog() {
        Main_HideElement('dialog_warning');
    }

    function Main_AboutDialogUpdateTime() {
        Main_innerHTML('about_runningtime', STR_RUNNINGTIME + STR_SPACE + Play_timeDay(Date.now() - Main_RunningTime));
    }

    function Main_showAboutDialog(removeEventListener, addEventListener) {
        document.body.removeEventListener("keydown", removeEventListener);
        document.body.addEventListener("keydown", addEventListener, false);
        Main_HideControlsDialog();
        Main_AboutDialogUpdateTime();
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

    function Main_showphoneDialog(removeEventListener, addEventListener) {
        document.body.removeEventListener("keydown", removeEventListener);
        document.body.addEventListener("keydown", addEventListener, false);
        Main_HideAboutDialog();
        Main_ShowElement('dialog_phone');
    }

    function Main_HidephoneDialog() {
        Main_HideElement('dialog_phone');
    }

    function Main_isphoneDialogVisible() {
        return Main_isElementShowing('dialog_phone');
    }

    function Main_showControlsDialog(removeEventListener, addEventListener) {
        document.body.removeEventListener("keydown", removeEventListener);
        document.body.addEventListener("keydown", addEventListener, false);
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
        if (!value) return value;
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

    function Main_is_rerun(content) {
        return ((content + '').indexOf('live') === -1);
    }

    function Main_ThumbNull(y, x, thumbnail) {
        return document.getElementById(thumbnail + y + '_' + x) !== null;
    }

    function Main_ReStartScreens() {
        Main_updateclock();
        Main_SwitchScreen();
        document.body.addEventListener("keyup", Main_handleKeyUp, false);
    }

    function Main_SwitchScreen(removekey) {
        Main_ready(function() {
            Main_SwitchScreenAction(removekey);
        });
    }

    function Main_RemoveKeys() {

        if (Main_values.Main_Go === Main_ChannelContent) document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
        else if (Main_values.Main_Go === Main_Users) document.body.removeEventListener("keydown", Users_handleKeyDown);
        else {
            if (Main_values.Main_Go === Main_Live) inUseObj = Live;
            else if (Main_values.Main_Go === Main_aGame) inUseObj = AGame;
            else if (Main_values.Main_Go === Main_Featured) inUseObj = Featured;
            else if (Main_values.Main_Go === Main_games) inUseObj = Game;
            else if (Main_values.Main_Go === Main_ChannelClip) inUseObj = ChannelClip;
            else if (Main_values.Main_Go === Main_Vod) inUseObj = Vod;
            else if (Main_values.Main_Go === Main_Clip) inUseObj = Clip;
            else if (Main_values.Main_Go === Main_AGameClip) inUseObj = AGameClip;
            else if (Main_values.Main_Go === Main_usergames) inUseObj = UserGames;
            else if (Main_values.Main_Go === Main_AGameVod) inUseObj = AGameVod;
            else if (Main_values.Main_Go === Main_UserVod) inUseObj = UserVod;
            else if (Main_values.Main_Go === Main_ChannelVod) inUseObj = ChannelVod;
            else if (Main_values.Main_Go === Main_UserHost) inUseObj = UserHost;
            else if (Main_values.Main_Go === Main_UserLive) inUseObj = UserLive;
            else if (Main_values.Main_Go === Main_UserChannels) inUseObj = UserChannels;
            else if (Main_values.Main_Go === Main_SearchGames) inUseObj = SearchGames;
            else if (Main_values.Main_Go === Main_SearchLive) inUseObj = SearchLive;
            else if (Main_values.Main_Go === Main_SearchChannels) inUseObj = SearchChannels;
            else if (Main_values.Main_Go === Main_HistoryLive) inUseObj = HistoryLive;
            else if (Main_values.Main_Go === Main_HistoryVod) inUseObj = HistoryVod;
            else if (Main_values.Main_Go === Main_HistoryClip) inUseObj = HistoryClip;

            document.body.removeEventListener("keydown", Screens_handleKeyDown);
        }
    }

    var Main_Switchobj = {
        // way not?... 'computed property names' is only available in ES6 (use 'esversion: 6').
        //    [Main_Users]: Users_init
    };

    Main_Switchobj[Main_Users] = Users_init;
    Main_Switchobj[Main_ChannelContent] = ChannelContent_init;

    Main_Switchobj[Main_SearchChannels] = function() {
        inUseObj = SearchChannels;
        Screens_init();
    };

    Main_Switchobj[Main_SearchLive] = function() {
        inUseObj = SearchLive;
        Screens_init();
    };

    Main_Switchobj[Main_SearchGames] = function() {
        inUseObj = SearchGames;
        Screens_init();
    };

    Main_Switchobj[Main_UserChannels] = function() {
        inUseObj = UserChannels;
        Screens_init();
    };

    Main_Switchobj[Main_UserLive] = function() {
        inUseObj = UserLive;
        Screens_init();
    };

    Main_Switchobj[Main_UserHost] = function() {
        inUseObj = UserHost;
        Screens_init();
    };

    Main_Switchobj[Main_usergames] = function() {
        inUseObj = UserGames;
        Screens_init();
    };

    Main_Switchobj[Main_ChannelVod] = function() {
        inUseObj = ChannelVod;
        Screens_init();
    };
    Main_Switchobj[Main_UserVod] = function() {
        inUseObj = UserVod;
        Screens_init();
    };
    Main_Switchobj[Main_Live] = function() {
        inUseObj = Live;
        Screens_init();
    };
    Main_Switchobj[Main_Featured] = function() {
        inUseObj = Featured;
        Screens_init();
    };
    Main_Switchobj[Main_AGameClip] = function() {
        inUseObj = AGameClip;
        Screens_init();
    };
    Main_Switchobj[Main_AGameVod] = function() {
        inUseObj = AGameVod;
        Screens_init();
    };
    Main_Switchobj[Main_Clip] = function() {
        inUseObj = Clip;
        Screens_init();
    };
    Main_Switchobj[Main_Vod] = function() {
        inUseObj = Vod;
        Screens_init();
    };
    Main_Switchobj[Main_ChannelClip] = function() {
        inUseObj = ChannelClip;
        Screens_init();
    };
    Main_Switchobj[Main_aGame] = function() {
        inUseObj = AGame;
        Screens_init();
    };
    Main_Switchobj[Main_games] = function() {
        inUseObj = Game;
        Screens_init();
    };
    Main_Switchobj[Main_HistoryLive] = function() {
        inUseObj = HistoryLive;
        Screens_init();
    };
    Main_Switchobj[Main_HistoryVod] = function() {
        inUseObj = HistoryVod;
        Screens_init();
    };
    Main_Switchobj[Main_HistoryClip] = function() {
        inUseObj = HistoryClip;
        Screens_init();
    };


    function Main_SwitchScreenAction(removekey) {
        Main_HideWarningDialog();
        if (Main_values.Main_Go !== Main_ChannelContent) Main_values.Main_BeforeChannelisSet = false;
        if (Main_values.Main_Go !== Main_aGame) Main_values.Main_BeforeAgameisSet = false;

        Main_CounterDialogRst();

        if (Main_Switchobj[Main_values.Main_Go]) Main_Switchobj[Main_values.Main_Go]();
        else Main_Switchobj[1]();

        if (removekey) Main_RemoveKeys();
    }

    function Main_OpenSearch() {
        if (!Main_values.Search_isSearching) Main_values.Main_BeforeSearch = Main_values.Main_Go;
        Main_ExitCurrent(Main_values.Main_Go);
        Main_values.Main_Go = Main_Search;
        Main_HideWarningDialog();
        Main_CounterDialogRst();
        Search_init();
    }

    function Main_SaveValues() {
        Main_setItem('Main_values', JSON.stringify(Main_values));
        Main_setItem('Play_data', JSON.stringify(Play_data));
    }

    function Main_RestoreValues() {
        Main_values = Screens_assign(Main_values, Main_getItemJson('Main_values', {}));
        Play_data = Screens_assign(Play_data, Main_getItemJson('Play_data', {}));
    }

    var Main_ExitCurrentobj = {
        // way not?... 'computed property names' is only available in ES6 (use 'esversion: 6').
        //    [Main_Users]: Users_exit
    };
    Main_ExitCurrentobj[Main_Users] = Users_exit;
    Main_ExitCurrentobj[Main_ChannelContent] = ChannelContent_exit;

    Main_ExitCurrentobj[Main_SearchChannels] = Screens_exit;
    Main_ExitCurrentobj[Main_SearchLive] = Screens_exit;
    Main_ExitCurrentobj[Main_SearchGames] = Screens_exit;
    Main_ExitCurrentobj[Main_UserChannels] = Screens_exit;
    Main_ExitCurrentobj[Main_UserLive] = Screens_exit;
    Main_ExitCurrentobj[Main_UserHost] = Screens_exit;
    Main_ExitCurrentobj[Main_usergames] = Screens_exit;
    Main_ExitCurrentobj[Main_ChannelVod] = Screens_exit;
    Main_ExitCurrentobj[Main_UserVod] = Screens_exit;
    Main_ExitCurrentobj[Main_Live] = Screens_exit;
    Main_ExitCurrentobj[Main_Featured] = Screens_exit;
    Main_ExitCurrentobj[Main_AGameClip] = Screens_exit;
    Main_ExitCurrentobj[Main_AGameVod] = Screens_exit;
    Main_ExitCurrentobj[Main_Clip] = Screens_exit;
    Main_ExitCurrentobj[Main_Vod] = Screens_exit;
    Main_ExitCurrentobj[Main_ChannelClip] = Screens_exit;
    Main_ExitCurrentobj[Main_aGame] = Screens_exit;
    Main_ExitCurrentobj[Main_games] = Screens_exit;
    Main_ExitCurrentobj[Main_HistoryLive] = Screens_exit;
    Main_ExitCurrentobj[Main_HistoryVod] = Screens_exit;
    Main_ExitCurrentobj[Main_HistoryClip] = Screens_exit;

    function Main_ExitCurrent(ExitCurrent) {
        if (Main_ExitCurrentobj[ExitCurrent]) Main_ExitCurrentobj[ExitCurrent]();
        if (Main_isElementShowing('settings_holder')) Settings_exit();
    }

    function Main_RestoreTopLabel() {
        Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);
        Main_IconLoad('label_side_panel', 'icon-arrow-right', STR_THUMB_OPTIONS_TOP);
    }

    function Main_cleanTopLabel() {
        Main_IconLoad('label_side_panel', 'icon-arrow-left', STR_GOBACK);
    }

    function Main_videoCreatedAt(time) { //time in '2017-10-27T13:27:27Z' or ms
        time = new Date(time);
        if (Main_IsDayFirst) return time.getDate() + ' ' + STR_MONTHS[time.getMonth()] + ' ' + time.getFullYear();
        else return STR_MONTHS[time.getMonth()] + ' ' + time.getDate() + ' ' + time.getFullYear();
    }

    //WithHM = with hour minutes
    function Main_videoCreatedAtWithHM(time) { //time in '2017-10-27T13:27:27Z' or ms
        var result = Main_videoCreatedAt(time);
        time = new Date(time);
        return result + ' ' + time.getHours() + ":" + Play_lessthanten(time.getMinutes());
    }

    function Main_checkVersion() {
        if (Main_IsNotBrowser) {
            var device = '';
            device = Android.getDevice();
            Main_versionTag = "Android: " + Main_IsNotBrowserVersion + ' Web: ' + Main_minversion + ' Device: ' + device;
            if (Main_needUpdate(Main_IsNotBrowserVersion)) Main_ShowElement('label_update');
        }

        Main_innerHTML("dialog_about_text", STR_ABOUT_INFO_HEADER + STR_VERSION + Main_versionTag +
            STR_BR + '<span id="about_runningtime"></span>' + STR_ABOUT_INFO_0);

        Main_RunningTime = Date.now();
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

    function Main_ThumbOpenIsNull(id, thumbnail) {
        return document.getElementById(thumbnail + id) === null;
    }

    function Main_OpenLiveStream(id, idsArray, handleKeyDownFunction, checkHistory) {
        if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
        document.body.removeEventListener("keydown", handleKeyDownFunction);
        Main_values_Play_data = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));
        Play_data.data = Main_values_Play_data;

        if (checkHistory) {

            var index = Main_history_Exist('live', Main_values_Play_data[7]);

            if (index > -1) {

                if (document.getElementById(idsArray[1] + id).src.indexOf('s3_vods') !== -1) {
                    Main_OPenAsVod(index);
                    return;
                } else { //is live check is is really

                    if (Main_values_History_data[AddUser_UsernameArray[0].id].live[index].vodid) Main_CheckBroadcastID(index, idsArray[3] + id);
                    else Main_openStream();

                    return;
                }

            }
        }

        Main_values.Play_isHost = ((Main_values.Main_Go === Main_UserHost) && !Play_UserLiveFeedPressed) ||
            ((UserLiveFeed_FeedPosX === UserLiveFeedobj_UserHostPos) && Play_UserLiveFeedPressed);

        if (Main_values.Play_isHost) {
            Play_data.DisplaynameHost = document.getElementById(idsArray[3] + id).textContent;
            Play_data.data[1] = Play_data.DisplaynameHost.split(STR_USER_HOSTING)[1];
        }

        if (Main_values.Main_Go === Main_aGame) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;

        Main_openStream();
    }

    var Main_CheckBroadcastIDex;
    var Main_CheckBroadcastIDoc;
    var Main_CheckBroadcastIDErrorTry = 0;

    function Main_CheckBroadcastID(index, doc) {
        Main_CheckBroadcastIDex = index;
        Main_CheckBroadcastIDoc = doc;
        Main_CheckBroadcastIDErrorTry = 0;
        Main_CheckBroadcastIDStart();
    }

    function Main_CheckBroadcastIDStart() {
        var theUrl = Main_kraken_api + 'streams/' + Play_data.data[14] + Main_TwithcV5Flag_I;
        BasexmlHttpGet(theUrl, 3000, 2, null, Main_CheckBroadcastIDStartSucess, Main_CheckBroadcastIDStartError, false);
    }

    function Main_CheckBroadcastIDStartSucess(response) {
        response = JSON.parse(response);
        if (response.stream !== null) {
            if (Main_values_Play_data[7] === response.stream._id) {
                Main_openStream();
                return;
            }
        }

        //force set as vod and set the div
        Main_values_History_data[AddUser_UsernameArray[0].id].live[Main_CheckBroadcastIDex] = Screens_assign(
            Main_values_History_data[AddUser_UsernameArray[0].id].live[Main_CheckBroadcastIDex], {
                forceVod: true
            }
        );

        var doc = document.getElementById(Main_CheckBroadcastIDoc);
        doc.childNodes[0].classList.add('hideimp');
        doc.childNodes[2].classList.remove('hideimp');

        Main_OPenAsVod(Main_CheckBroadcastIDex);
    }

    function Main_CheckBroadcastIDStartError() {
        if (Main_CheckBroadcastIDErrorTry < 5) {
            Main_CheckBroadcastIDStart();
            Main_CheckBroadcastIDErrorTry++;
        } else Main_openStream();
    }

    function Main_OPenAsVod(index) {
        if (!Main_values_History_data[AddUser_UsernameArray[0].id].live[index].vodid) {
            Main_openStream();
            return;
        }

        Main_values.Main_selectedChannelDisplayname = Main_values_Play_data[1];
        Main_values.Main_selectedChannelLogo = Main_values_Play_data[9];
        Main_values.Main_selectedChannel = Main_values_Play_data[6];

        Main_values.Main_selectedChannel_id = Main_values_Play_data[14];
        Main_values.Main_selectedChannelLogo = Main_values_Play_data[9];
        Main_values.Main_selectedChannelPartner = Main_values_Play_data[10];

        Main_values.ChannelVod_vodId = Main_values_History_data[AddUser_UsernameArray[0].id].live[index].vodid;
        Main_values.vodOffset =
            ((Main_values_History_data[AddUser_UsernameArray[0].id].live[index].date - (new Date(Main_values_Play_data[12]).getTime())) / 1000);

        if (Main_values.vodOffset < 0) Main_values.vodOffset = 1;
        PlayVod_VodOffsetTemp = Main_values.vodOffset;

        Play_showWarningDialog(STR_LIVE_VOD);
        Main_openVod();

        window.setTimeout(function() {
            if (!Play_IsWarning) Play_HideWarningDialog();
        }, 3000);
    }

    function Main_openStream() {
        document.body.removeEventListener("keydown", Play_handleKeyDown);
        document.body.addEventListener("keydown", Play_handleKeyDown, false);
        Main_HideElement('scene1');
        Main_ShowElement('scene2');
        Play_hidePanel();
        if (!Play_EndDialogEnter) Play_HideEndDialog();
        Main_ready(Play_Start);
    }

    function Main_OpenClip(id, idsArray, handleKeyDownFunction) {
        if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
        document.body.removeEventListener("keydown", handleKeyDownFunction);
        Main_values_Play_data = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));

        ChannelClip_playUrl = Main_values_Play_data[0];
        PlayClip_DurationSeconds = parseInt(Main_values_Play_data[1]);
        Main_values.Main_selectedChannel_id = Main_values_Play_data[2];

        Play_data.data[3] = Main_values_Play_data[3];
        if (Play_data.data[3] === null) Play_data.data[3] = "";
        ChannelClip_game = (Play_data.data[3] !== "" && Play_data.data[3] !== null ? STR_PLAYING + Play_data.data[3] : "");

        Main_values.Main_selectedChannelDisplayname = Main_values_Play_data[4];
        Main_values.Main_selectedChannelLogo = Main_values_Play_data[5];
        ChannelClip_Id = Main_values_Play_data[7];
        Main_values.Main_selectedChannel = Main_values_Play_data[6];
        Main_values.ChannelVod_vodId = Main_values_Play_data[8];
        ChannelVod_vodOffset = parseInt(Main_values_Play_data[9]);

        ChannelClip_title = Main_values_Play_data[10];
        ChannelClip_language = Main_values_Play_data[11];
        ChannelClip_createdAt = (Main_values_Play_data[16] ? Main_values_Play_data[16] : Main_values_Play_data[12]); //Old sorting fix
        ChannelClip_views = Main_values_Play_data[14];
        ChannelClip_playUrl2 = Main_values_Play_data[15].split("-preview")[0] + ".mp4";

        document.body.addEventListener("keydown", PlayClip_handleKeyDown, false);
        Main_HideElement('scene1');
        Main_ShowElement('scene2');
        Play_hideChat();
        Play_HideWarningDialog();
        Play_CleanHideExit();
        Main_ready(PlayClip_Start);
    }

    function Main_OpenVod(id, idsArray, handleKeyDownFunction) {
        if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
        document.body.removeEventListener("keydown", handleKeyDownFunction);
        Main_values_Play_data = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));

        Main_values.Main_selectedChannelDisplayname = Main_values_Play_data[1];
        ChannelVod_createdAt = Main_values_Play_data[2];

        Play_data.data[3] = Main_values_Play_data[3];
        if (Play_data.data[3] === null) Play_data.data[3] = "";
        ChannelVod_game = (Play_data.data[3] !== "" && Play_data.data[3] !== null ? STR_STARTED + STR_PLAYING + Play_data.data[3] : "");

        ChannelVod_views = Main_values_Play_data[4];

        Main_values.Main_selectedChannel = Main_values_Play_data[6];
        Main_values.ChannelVod_vodId = Main_values_Play_data[7];

        ChannelVod_language = Main_values_Play_data[9];
        ChannelVod_title = Main_values_Play_data[10];
        ChannelVod_DurationSeconds = parseInt(Main_values_Play_data[11]);
        ChannelVod_Duration = STR_DURATION + Play_timeS(ChannelVod_DurationSeconds);
        Play_IncrementView = Main_values_Play_data[17];

        Main_values.Main_selectedChannel_id = Main_values_Play_data[14];
        Main_values.Main_selectedChannelLogo = Main_values_Play_data[15];
        Main_values.Main_selectedChannelPartner = Main_values_Play_data[16];

        Main_openVod();
    }

    function Main_openVod() {
        document.body.addEventListener("keydown", PlayVod_handleKeyDown, false);
        Main_HideElement('scene1');
        Main_ShowElement('scene2');
        PlayVod_hidePanel();
        Play_hideChat();
        Play_CleanHideExit();
        Main_ready(PlayVod_Start);
    }

    function Main_ScrollTable(id, position) {
        document.getElementById(id).style.top = position ? (position / BodyfontSize) + "em" : "";
        window.setTimeout(Main_handleKeyUp, 10);
    }

    function Main_ScrollTableCalc(id, position, percentage) {
        document.getElementById(id).style.top = 'calc(' + percentage + '% + ' + (position / BodyfontSize) + 'em)';
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

        Main_ready(function() {
            if (window.getComputedStyle(span, null).getPropertyValue('font-family') !== 'icons') {
                console.log('Main_Checktylesheet reloading');
                Main_LoadStylesheet('https://fgl27.github.io/SmartTwitchTV/release/githubio/css/icons.min.css');
            } else console.log('Main_Checktylesheet loaded OK');

            document.body.removeChild(span);
        });
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

        if (Main_IsDayFirst) dayMonth = STR_DAYS[date.getDay()] + ' ' + date.getDate() + ' ' + STR_MONTHS[date.getMonth()];
        else dayMonth = STR_DAYS[date.getDay()] + ' ' + STR_MONTHS[date.getMonth()] + ' ' + date.getDate();

        return dayMonth + ' ' + Play_lessthanten(date.getHours()) + ':' + Play_lessthanten(date.getMinutes());
    }

    // right after the TV comes from standby the network can lag, delay the check
    //function Main_Resume() {
    //    if (!document.hidden) {
    //        Main_updateclock();
    //        //Update clock twice as first try clock may be out of date in the case TV was on standby
    //        window.setTimeout(Main_updateclock, 20000);
    //    }
    //}

    function Main_updateclock() {
        if (!document.hidden) {
            Main_textContent('label_clock', Main_getclock());
            if (Main_RunningTime) Main_AboutDialogUpdateTime();
            Main_randomimg = '?' + Math.random();
        }
    }

    function Main_RandomInt() {
        return parseInt(Math.random() * 1000000000);
    }

    function Main_updateUserFeed() {
        if (AddUser_UserIsSet()) {
            window.setTimeout(function() {
                if (!document.hidden && !UserLiveFeed_isFeedShow() && !Sidepannel_isShowing() && !UserLiveFeed_loadingData) {
                    UserLiveFeed_RefreshLive();
                }
            }, 15000);
        }
    }

    function Main_ExitDialog(event) {
        switch (event.keyCode) {
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
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
                if (!Main_IsNotBrowser || !Main_ExitCursor) Main_HideExitDialog();
                else if (Main_ExitCursor === 1) {
                    Main_HideExitDialog();
                    Android.mclose(false);
                } else if (Main_ExitCursor === 2) Android.mclose(true);
                break;
            default:
                break;
        }
    }

    function Main_ReloadScreen() {
        Screens_clear = true;
        ChannelContent_clear = true;

        if (Main_values.Main_Go !== Main_ChannelContent) Main_values.Main_BeforeChannelisSet = false;
        if (Main_values.Main_Go !== Main_aGame) Main_values.Main_BeforeAgameisSet = false;

        Main_CounterDialogRst();

        if (Main_values.Main_Go === Main_ChannelContent) ChannelContent_StartLoad();
        else if (Main_values.Main_Go === Main_Users) Users_StartLoad();
        else if (Main_values.Main_Go === Main_usergames) {
            inUseObj = UserGames;
            if (!inUseObj.loadingData) inUseObj.key_refresh();
        } else {
            if (Main_values.Main_Go === Main_Live) inUseObj = Live;
            else if (Main_values.Main_Go === Main_Featured) inUseObj = Featured;
            else if (Main_values.Main_Go === Main_aGame) inUseObj = AGame;
            else if (Main_values.Main_Go === Main_games) inUseObj = Game;
            else if (Main_values.Main_Go === Main_Vod) inUseObj = Vod;
            else if (Main_values.Main_Go === Main_Clip) inUseObj = Clip;
            else if (Main_values.Main_Go === Main_AGameClip) inUseObj = AGameClip;
            else if (Main_values.Main_Go === Main_ChannelClip) inUseObj = ChannelClip;
            else if (Main_values.Main_Go === Main_AGameVod) inUseObj = AGameVod;
            else if (Main_values.Main_Go === Main_UserVod) inUseObj = UserVod;
            else if (Main_values.Main_Go === Main_ChannelVod) inUseObj = ChannelVod;
            else if (Main_values.Main_Go === Main_UserHost) inUseObj = UserHost;
            else if (Main_values.Main_Go === Main_UserLive) inUseObj = UserLive;
            else if (Main_values.Main_Go === Main_UserChannels) inUseObj = UserChannels;
            else if (Main_values.Main_Go === Main_SearchGames) inUseObj = SearchGames;
            else if (Main_values.Main_Go === Main_SearchLive) inUseObj = SearchLive;
            else if (Main_values.Main_Go === Main_SearchChannels) inUseObj = SearchChannels;
            else if (Main_values.Main_Go === Main_HistoryLive) inUseObj = HistoryLive;
            else if (Main_values.Main_Go === Main_HistoryVod) inUseObj = HistoryVod;
            else if (Main_values.Main_Go === Main_HistoryClip) inUseObj = HistoryClip;

            Screens_StartLoad();
        }
    }

    function Main_setItem(item, value) {
        localStorage.setItem(item, value);
    }

    function Main_getItemInt(item, default_value) {
        var value = parseInt(localStorage.getItem(item));
        if (value || value === 0) return value;
        return default_value;
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
            CheckPage("?code=" + code);
            console.log('if code ' + code);
            Main_newUsercode = code;
        } else {
            console.log('else code ' + code);
            CheckPage('');
            Main_newUsercode = 0;
        }
    }

    //Redirect to assets if running from it
    function CheckPage(pageUrlCode) {
        var PageUrl = null;
        try {
            PageUrl = Android.mPageUrl();
        } catch (e) {}
        if (PageUrl) {
            if (window.location.href.indexOf('asset') === -1 && PageUrl.indexOf('asset') !== -1) {
                try {
                    Android.mloadUrl(PageUrl + pageUrlCode);
                } catch (e) {}
                return;
            }
        }
    }

    //Basic XMLHttpRequest thatonly returns error or 200 status
    function BasehttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError) {
        if (Main_IsNotBrowser) BaseAndroidhttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError);
        else BasexmlHttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError);
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
        } else if (HeaderQuatity > 2 && (xmlHttp.status === 401 || xmlHttp.status === 403)) { //token expired
            AddCode_refreshTokens(0, 0, Screens_loadDataRequestStart, Screens_loadDatafail);
        } else if (xmlHttp.status === 410 && inUseObj.screen === Main_games) {
            inUseObj.setHelix();
        } else {
            calbackError();
        }
    }

    var Main_Headers = [
        [Main_clientIdHeader, Main_clientId],
        [Main_AcceptHeader, Main_TwithcV5Json],
        [Main_Authorization, null]
    ];

    function BasexmlHttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError) {
        BasexmlHttpGetExtra(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, Main_Headers);
    }

    function BasehttpHlsGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError) {
        if (Main_IsNotBrowser) BaseAndroidHlsGet(theUrl, callbackSucess, calbackError);
        else BasexmlHttpHlsGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError);
    }

    function BaseAndroidHlsGet(theUrl, callbackSucess, calbackError) {
        var xmlHttp = Android.mreadUrlHLS(theUrl);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            calbackError();
            return;
        }

        if (JSON.parse(xmlHttp.responseText).hasOwnProperty('status'))
            calbackError();
        else
            callbackSucess(xmlHttp.responseText);
    }

    function BasexmlHttpHlsGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError) {
        BasexmlHttpGetExtra(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, Main_Headers_Back);
    }

    function BasexmlHttpGetExtra(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, HeaderArray) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = Timeout;

        Main_Headers[2][1] = access_token;

        for (var i = 0; i < HeaderQuatity; i++)
            xmlHttp.setRequestHeader(HeaderArray[i][0], HeaderArray[i][1]);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    callbackSucess(xmlHttp.responseText);
                } else if (HeaderQuatity > 2 && (xmlHttp.status === 401 || xmlHttp.status === 403)) { //token expired
                    AddCode_refreshTokens(0, 0, Screens_loadDataRequestStart, Screens_loadDatafail);
                } else if (xmlHttp.status === 410 && inUseObj.screen === Main_games) {
                    inUseObj.setHelix();
                } else {
                    calbackError();
                }
            }
        };

        xmlHttp.send(null);
    }

    var Main_Headers_Back = [
        [Main_clientIdHeader, Main_Fix + Main_Hash + Main_Force],
        [Main_AcceptHeader, Main_TwithcV5Json],
        [Main_Authorization, null]
    ];

    var Main_VideoSizeLiveFeed = "352x198";

    var Main_VideoSizeAll = ["384x216", "512x288", "640x360", "896x504", "1280x720"];
    var Main_GameSizeAll = ["179x250", "272x380", "340x475", "476x665", "773x1080"];
    var Main_SidePannelSizeAll = ["640x360", "896x504", "1280x720", "1536x864", "1920x1080"];
    var Main_SidePannelSize = "1280x720";
    var Main_VideoSize = "640x360";
    var Main_GameSize = "340x475";

    function Main_SetThumb() {
        Main_VideoSize = Main_VideoSizeAll[Settings_value.thumb_quality.defaultValue];
        Main_GameSize = Main_GameSizeAll[Settings_value.thumb_quality.defaultValue];
        Main_SidePannelSize = Main_SidePannelSizeAll[Settings_value.thumb_quality.defaultValue];
    }

    function Main_ReplaceLargeFont(text) {
        if (!text) return '';

        return text.replace(/[^\x00-\x7F]/g, function(match) {
            return '<span style="font-size: 0.8em;">' + match + '</span>';
        });
    }

    function Main_Set_history(type, Data) {
        if (type === 'live' && HistoryLive.histPosX[1]) return;
        if (type === 'vod' && HistoryVod.histPosX[1]) return;
        if (type === 'clip' && HistoryClip.histPosX[1]) return;

        if (AddUser_IsUserSet() && Data) {
            var index = Main_history_Exist(type, Data[7]);

            if (index > -1) {

                //Use Screens_assign() to change only obj that has changed
                Main_values_History_data[AddUser_UsernameArray[0].id][type][index] = Screens_assign(
                    Main_values_History_data[AddUser_UsernameArray[0].id][type][index], {
                        data: Main_Slice(Data),
                        date: new Date().getTime(),
                        game: Data[3],
                        views: Data[13],
                    }
                );

            } else {
                //Limit size to 1500
                if (Main_values_History_data[AddUser_UsernameArray[0].id][type].length > 1499) {

                    //Sort by oldest first to delete the oldest
                    Main_values_History_data[AddUser_UsernameArray[0].id][type].sort(
                        function(a, b) {
                            return (a.date < b.date ? -1 : (a.date > b.date ? 1 : 0));
                        }
                    );

                    Main_values_History_data[AddUser_UsernameArray[0].id][type].shift();
                }

                Main_values_History_data[AddUser_UsernameArray[0].id][type].push({
                    data: Main_Slice(Data),
                    date: new Date().getTime(),
                    name: Data[6].toLowerCase(),
                    game: Data[3],
                    id: Data[7],
                    views: Data[13],
                    created_at: new Date(Data[12]).getTime(),
                    watched: 0
                });

                if (type === 'live') {
                    //Sort live by id this allows to always show the newst first even by sorting by othrs tipe
                    //this allows to get with are alredy VOD easier when there is more then one broadcast for the same streamer
                    Main_values_History_data[AddUser_UsernameArray[0].id][type].sort(
                        function(a, b) {
                            return (a.id > b.id ? -1 : (a.id < b.id ? 1 : 0));
                        }
                    );
                }

                Main_setHistoryItem();
            }
        }
    }

    function Main_history_Exist(type, id) {

        for (var index = 0; index < Main_values_History_data[AddUser_UsernameArray[0].id][type].length; index++)
            if (Main_values_History_data[AddUser_UsernameArray[0].id][type][index].id === id) return index;

        return -1;
    }

    function Main_history_UpdateLive(id, game, title, views) {
        if (!AddUser_IsUserSet() || HistoryLive.histPosX[1]) return;

        var index = Main_history_Exist('live', id);

        if (index > -1) {

            //Use Screens_assign() to change only obj that has changed
            Main_values_History_data[AddUser_UsernameArray[0].id].live[index] = Screens_assign(
                Main_values_History_data[AddUser_UsernameArray[0].id].live[index], {
                    date: new Date().getTime(),
                    game: game,
                    views: views,
                }
            );

            //Some values will change as the stream updates or as the streames goes offline and online again
            Main_values_History_data[AddUser_UsernameArray[0].id].live[index].data[2] = title;
            Main_values_History_data[AddUser_UsernameArray[0].id].live[index].data[3] = game;
            Main_values_History_data[AddUser_UsernameArray[0].id].live[index].data[4] = STR_FOR + Main_addCommas(views) + STR_SPACE + STR_VIEWER;
            Main_values_History_data[AddUser_UsernameArray[0].id].live[index].data[11] =
                STR_SINCE + Play_streamLiveAt(Main_values_History_data[AddUser_UsernameArray[0].id].live[index].data[12]) + STR_SPACE;

            Main_setHistoryItem();
        }
    }

    function Main_history_UpdateLiveVod(id, vod, vod_img) {
        if (!AddUser_IsUserSet() || HistoryLive.histPosX[1]) return;

        var index = Main_history_Exist('live', id);

        if (index > -1) {

            //Use Screens_assign() to change only obj that has changed
            Main_values_History_data[AddUser_UsernameArray[0].id].live[index] = Screens_assign(
                Main_values_History_data[AddUser_UsernameArray[0].id].live[index], {
                    vodid: vod,
                    vodimg: vod_img,
                }
            );
            Main_setHistoryItem();
        }
    }

    function Main_history_UpdateVod(id, time) {
        if (!AddUser_IsUserSet() || HistoryVod.histPosX[1]) return;

        var index = Main_history_Exist('vod', id);

        if (index > -1) {

            //Use Screens_assign() to change only obj that has changed
            Main_values_History_data[AddUser_UsernameArray[0].id].vod[index] = Screens_assign(
                Main_values_History_data[AddUser_UsernameArray[0].id].vod[index], {
                    date: new Date().getTime(),
                    watched: time
                }
            );
            Main_setHistoryItem();
        }
    }

    function Main_history_UpdateClip(id, time) {
        if (!AddUser_IsUserSet() || HistoryClip.histPosX[1]) return;

        var index = Main_history_Exist('clip', id);

        if (index > -1) {

            //Use Screens_assign() to change only obj that has changed
            Main_values_History_data[AddUser_UsernameArray[0].id].clip[index] = Screens_assign(
                Main_values_History_data[AddUser_UsernameArray[0].id].clip[index], {
                    date: new Date().getTime(),
                    watched: time
                }
            );
            Main_setHistoryItem();
        }
    }

    function Main_Restore_history() {
        Main_values_History_data = Screens_assign(Main_values_History_data, Main_getItemJson('Main_values_History_data', {}));

        //Temp fix as creadt at was added to sorting after
        if (!Main_values.Restore_Created_at_fix) {

            Main_values.Restore_Created_at_fix = true;

            var i = 0,
                j;

            for (i = 0; i < AddUser_UsernameArray.length; i++) {

                for (j = 0; j < Main_values_History_data[AddUser_UsernameArray[i].id].live.length; j++) {

                    Main_values_History_data[AddUser_UsernameArray[i].id].live[j].created_at =
                        new Date(Main_values_History_data[AddUser_UsernameArray[i].id].live[j].data[12]).getTime();

                }

            }
        }
    }

    function Main_History_Sort(array, msort, direction) {

        if (direction) { //a-z
            array.sort(
                function(a, b) {
                    return (a[msort] < b[msort] ? -1 : (a[msort] > b[msort] ? 1 : 0));
                }
            );
        } else { //z-a
            array.sort(
                function(a, b) {
                    return (a[msort] > b[msort] ? -1 : (a[msort] < b[msort] ? 1 : 0));
                }
            );
        }
    }

    function Main_setHistoryItem() {
        var string = JSON.stringify(Main_values_History_data);
        Main_setItem('Main_values_History_data', string);
        if (Main_CanBackup) Android.BackupFile(Main_HistoryBackupFile, string);
    }

    function Main_Slice(arrayTocopy) {
        var array;
        //slice may crash RangeError: Maximum call stack size exceeded
        try {
            array = arrayTocopy.slice();
        } catch (e) {
            array = [];
            for (var i = 0; i < arrayTocopy.length; i++) {
                array.push(arrayTocopy[i]);
            }
        }
        return array;
    }
    //Variable initialization
    var PlayClip_IsJumping = false;
    var PlayClip_jumpCount = 0;
    var PlayClip_TimeToJump = 0;
    var PlayClip_isOn = false;
    var PlayClip_loadingDataTry = 0;
    var PlayClip_loadingDataTimeout = 2000;
    var PlayClip_loadingDataTryMax = 3;
    var PlayClip_quality = 'source';
    var PlayClip_qualityPlaying = PlayClip_quality;
    var PlayClip_qualityIndex = 0;
    var PlayClip_qualities = [];
    var PlayClip_playingUrl = '';
    var PlayClip_replayOrNext = false;
    var PlayClip_replay = false;
    var PlayClip_currentTime = 0;
    var PlayClip_state = 0;
    var PlayClip_STATE_PLAYING = 1;
    var PlayClip_HasVOD = false;
    var PlayClip_Buffer = 2000;
    var PlayClip_loadData410 = false;

    var PlayClip_jumpTimers = [0, 5];
    var PlayClip_DurationSeconds = 0;

    var PlayClip_HasNext = false;
    var PlayClip_HasBack = false;
    var PlayClip_HideShowNextDiv = ['next_button', 'back_button'];
    var PlayClip_EnterPos = 0;
    var PlayClip_All = false;
    var PlayClip_All_Forced = true;
    var PlayClip_loadingtreamerInfoTry = 0;
    //Variable initialization end

    function PlayClip_Start() {
        Play_showBufferDialog();
        Play_HideEndDialog();

        PlayClip_HasVOD = Main_values.ChannelVod_vodId !== null;
        Chat_title = STR_CLIP + '.';
        if (PlayClip_HasVOD) {
            Chat_offset = ChannelVod_vodOffset;
            Chat_Init();
        } else Chat_NoVod();

        Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);
        Main_textContent("stream_info_name", Main_values.Main_selectedChannelDisplayname);
        Main_innerHTML("stream_info_title", ChannelClip_title);
        Main_innerHTML("stream_info_game", ChannelClip_game);

        Main_innerHTML("stream_live_time", ChannelClip_createdAt + ',' + STR_SPACE + ChannelClip_views);
        Main_textContent("stream_live_viewers", '');
        Main_textContent("stream_watching_time", '');

        Main_textContent('progress_bar_duration', Play_timeS(PlayClip_DurationSeconds));
        Play_DefaultjumpTimers = PlayClip_jumpTimers;
        PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);
        Main_replaceClassEmoji('stream_info_title');

        Main_values.Play_isHost = false;
        PlayClip_SetOpenVod();
        document.getElementById('controls_' + Play_controlsChatDelay).style.display = 'none';
        document.getElementById('controls_' + Play_controlsLowLatency).style.display = 'none';
        document.getElementById('controls_' + Play_MultiStream).style.display = 'none';
        PlayExtra_UnSetPanel();
        Play_CurrentSpeed = 3;
        Play_IconsResetFocus();

        Play_ShowPanelStatus(3);

        Main_textContent('progress_bar_current_time', Play_timeS(0));

        Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i> </div>');
        Main_ShowElement('progress_bar_div');
        Main_ShowElement('controls_holder');

        Play_PlayerPanelOffset = -13;
        PlayClip_state = 0;
        PlayClip_currentTime = 0;
        PlayClip_qualityIndex = 2;
        UserLiveFeed_PreventHide = false;
        PlayClip_UpdateNext();
        Play_EndSet(3);
        UserLiveFeed_Unset();
        Play_IsWarning = false;

        if (AddUser_UserIsSet()) {
            AddCode_PlayRequest = true;
            AddCode_Channel_id = Main_values.Main_selectedChannel_id;
            AddCode_CheckFallow();
        } else Play_hideFallow();

        PlayClip_IsJumping = false;
        PlayClip_jumpCount = 0;
        PlayClip_TimeToJump = 0;
        PlayClip_isOn = true;

        if (!PlayClip_replay) PlayClip_loadData(); //Play_PlayEndStart(3);
        else PlayClip_qualityChanged();
        PlayClip_replay = false;

        document.body.removeEventListener("keyup", Main_handleKeyUp);

        PlayClip_loadingtreamerInfoTry = 0;
        PlayClip_GetStreamerInfo();
        PlayVod_loadingInfoDataTry = 0;
        if (PlayClip_HasVOD) PlayClip_updateVodInfo();
        else {
            Main_textContent("end_vod_name_text", '');
            Main_innerHTML("end_vod_title_text", '');
            Play_controls[Play_controlsOpenVod].setLable('');
        }
        Play_controls[Play_controlsChanelCont].setLable(Main_values.Main_selectedChannelDisplayname);
        Play_controls[Play_controlsGameCont].setLable(Play_data.data[3]);
    }

    function PlayClip_updateVodInfo() {
        var theUrl = Main_kraken_api + 'videos/' + Main_values.ChannelVod_vodId + Main_TwithcV5Flag_I;
        BasexmlHttpGet(theUrl, PlayVod_loadingInfoDataTimeout, 2, null, PlayClip_updateVodInfoSucess, PlayClip_updateVodInfoError, false);
    }

    function PlayClip_updateVodInfoSucess(response) {
        ChannelVod_title = twemoji.parse(JSON.parse(response).title, false, false);
        Main_innerHTML("end_vod_title_text", ChannelVod_title);
        Play_controls[Play_controlsOpenVod].setLable(ChannelVod_title);
    }

    function PlayClip_updateVodInfoError() {
        PlayVod_loadingInfoDataTry++;
        if (PlayVod_loadingInfoDataTry < PlayVod_loadingInfoDataTryMax) PlayClip_updateVodInfo();
    }

    function PlayClip_GetStreamerInfo() {
        var theUrl = Main_kraken_api + 'channels/' + Main_values.Main_selectedChannel_id + Main_TwithcV5Flag_I;

        BasehttpGet(theUrl, 10000, 2, null, PlayClip_GetStreamerInfoSuccess, PlayClip_GetStreamerInfoSuccessError);
    }

    function PlayClip_GetStreamerInfoSuccessError() {
        PlayClip_loadingtreamerInfoTry++;
        if (PlayClip_loadingtreamerInfoTry < PlayClip_loadingDataTryMax) PlayClip_GetStreamerInfo();
    }

    function PlayClip_GetStreamerInfoSuccess(response) {
        Main_values.Main_selectedChannelPartner = JSON.parse(response).partner;
        Play_partnerIcon(Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelPartner, false, ChannelClip_language);
    }

    function PlayClip_loadData() {
        if (PlayClip_loadData410 || !Main_IsNotBrowser) {
            PlayClip_loadDataSuccess410();
            return;
        }
        PlayClip_loadingDataTry = 0;
        PlayClip_loadingDataTimeout = 2000;
        PlayClip_loadDataRequest();
    }

    function PlayClip_loadDataRequest() {
        var theUrl = 'https://gql.twitch.tv/gql',
            postMessage = '{"query":"\\n {\\n clip(slug: \\"' + ChannelClip_playUrl +
            '\\") {\\n videoQualities {\\n frameRate\\n quality\\n sourceURL\\n }\\n }\\n }\\n"}';

        var xmlHttp = Android.mMethodUrl(theUrl, PlayClip_loadingDataTimeout, 1, null, Main_Headers_Back[0][1], postMessage, 'POST');

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            PlayClip_loadDataError();
            return;
        }

        if (xmlHttp.status === 200) {
            PlayClip_QualityGenerate(xmlHttp.responseText);
        } else if (xmlHttp.status === 410) { //Workaround for future 410 issue
            PlayClip_loadData410 = true;
            window.setTimeout(function() {
                PlayClip_loadData410 = false;
            }, 60 * 60 * 1000); //try again after 1h
            PlayClip_loadDataSuccess410();
        } else {
            PlayClip_loadDataError();
        }
    }

    function PlayClip_loadDataError() {
        PlayClip_loadingDataTry++;
        if (PlayClip_loadingDataTry < PlayClip_loadingDataTryMax) {
            PlayClip_loadingDataTimeout += 250;
            PlayClip_loadDataRequest();
        } else {
            if (Main_IsNotBrowser) {
                Play_HideBufferDialog();
                Play_PlayEndStart(3);
            } else PlayClip_loadDataSuccessFake();
        }
    }

    function PlayClip_loadDataSuccessFake() {
        PlayClip_qualities = [{
                'id': 'Auto',
                'url': ''
            },
            {
                'id': '1080p60 | source | mp4',
                'url': 'https://fake'
            },
        ];
        PlayClip_state = PlayClip_STATE_PLAYING;
        PlayClip_qualityChanged();
        Main_Set_history('clip', Main_values_Play_data);
    }

    function PlayClip_loadDataSuccess410() {
        PlayClip_qualities = [];
        PlayClip_qualities.push({
            'id': 'Auto',
            'url': ChannelClip_playUrl2
        });

        PlayClip_state = PlayClip_STATE_PLAYING;
        PlayClip_qualityChanged();
        Main_Set_history('clip', Main_values_Play_data);
    }

    function PlayClip_QualityGenerate(response) {
        PlayClip_qualities = [];

        response = JSON.parse(response);

        if (response && response.hasOwnProperty('data') && response.data.hasOwnProperty('clip')) {
            response = response.data.clip.videoQualities;
            for (var i = 0; i < response.length; i++) {

                if (!PlayClip_qualities.length) {
                    PlayClip_qualities.push({
                        'id': response[i].quality + 'p' + PlayClip_FrameRate(response[i].frameRate) + ' | source | mp4',
                        'url': response[i].sourceURL
                    });
                } else {
                    PlayClip_qualities.push({
                        'id': response[i].quality + 'p' + PlayClip_FrameRate(response[i].frameRate) + ' | mp4',
                        'url': response[i].sourceURL
                    });
                }
            }
        }

        PlayClip_state = PlayClip_STATE_PLAYING;
        PlayClip_qualityChanged();
        Main_Set_history('clip', Main_values_Play_data);
    }

    function PlayClip_FrameRate(value) {
        if (value > 40) return 60;
        else return '';
    }

    function PlayClip_qualityChanged() {
        PlayClip_qualityIndex = 0;
        PlayClip_playingUrl = PlayClip_qualities[0].url;

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

        PlayClip_state = PlayClip_STATE_PLAYING;

        PlayClip_quality = PlayClip_qualities[PlayClip_qualityIndex].id;
        PlayClip_qualityPlaying = PlayClip_quality;
        PlayClip_SetHtmlQuality('stream_quality');
        PlayClip_onPlayer();
        //Play_PannelEndStart(3);
    }

    function PlayClip_onPlayer() {
        if (Main_isDebug) console.log('PlayClip_onPlayer:', '\n' + '\n"' + PlayClip_playingUrl + '"\n');
        if (Main_IsNotBrowser && PlayClip_isOn) Android.startVideoOffset(PlayClip_playingUrl, 3,
            PlayClip_replayOrNext ? -1 : Android.gettime());
        PlayClip_replayOrNext = false;

        if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
        Play_SetFullScreen(Play_isFullScreen);
    }

    function PlayClip_UpdateDuration(duration) {
        PlayClip_DurationSeconds = duration / 1000;
        Main_textContent('progress_bar_duration', Play_timeS(PlayClip_DurationSeconds));
        PlayClip_RefreshProgressBarr();
    }

    function PlayClip_Resume() {
        //return;
        window.clearInterval(Play_ShowPanelStatusId);
        PlayClip_shutdownStream();
    }

    function PlayClip_shutdownStream() {
        if (PlayClip_isOn) {
            PlayClip_All = false;
            PlayClip_PreshutdownStream(true);
            Play_CleanHideExit();
            Play_exitMain();
        }
    }

    function PlayClip_PreshutdownStream(closePlayer) {
        Main_history_UpdateClip(ChannelClip_Id, Main_IsNotBrowser ? (parseInt(Android.gettime() / 1000)) : 0);
        PlayClip_hidePanel();
        if (Main_IsNotBrowser) {
            if (closePlayer) Android.stopVideo(3);
            else Android.play(false);
        }
        if (closePlayer) PlayClip_isOn = false;
        Chat_Clear();
        Play_ClearPlayer();
        UserLiveFeed_Hide();
        PlayClip_qualities = [];
        document.body.removeEventListener("keydown", PlayClip_handleKeyDown);
        ChannelVod_vodOffset = 0;
    }

    function PlayClip_UpdateNext() {
        var nextid = PlayClip_getIdNext(1, 0);
        var backid = PlayClip_getIdNext(-1, inUseObj.ColoumnsCount - 1);
        var text;

        PlayClip_HasNext = false;
        PlayClip_HasBack = false;

        if (nextid) {
            PlayClip_HasNext = true;
            text = JSON.parse(document.getElementById(inUseObj.ids[8] + nextid).getAttribute(Main_DataAttribute));
            Main_textContent("next_button_text_name", text[4]);
            Main_innerHTML("next_button_text_title", text[10]);

            Main_textContent("end_next_button_text_name", text[4]);
            Main_innerHTML("end_next_button_text_title", text[10]);

            PlayClip_HideShowNext(0, 1);
        } else PlayClip_HideShowNext(0, 0);

        if (backid) {
            PlayClip_HasBack = true;
            text = JSON.parse(document.getElementById(inUseObj.ids[8] + backid).getAttribute(Main_DataAttribute));
            Main_textContent("back_button_text_name", text[4]);
            Main_innerHTML("back_button_text_title", text[10]);
            PlayClip_HideShowNext(1, 1);
        } else PlayClip_HideShowNext(1, 0);
    }

    function PlayClip_getIdNext(y, x) {
        if (Main_ThumbNull((inUseObj.posY), (inUseObj.posX + y), inUseObj.ids[0]))
            return inUseObj.posY + '_' + (inUseObj.posX + y);
        else if (Main_ThumbNull((inUseObj.posY + y), x, inUseObj.ids[0]))
            return (inUseObj.posY + y) + '_' + x;

        return null;
    }

    function PlayClip_HideShowNext(which, val) {
        document.getElementById(PlayClip_HideShowNextDiv[which]).style.opacity = val;
    }

    function PlayClip_Enter() {
        if (!PlayClip_EnterPos) {
            if (PlayClip_HasVOD && !Main_values.Play_ChatForceDisable) {
                if (Play_isNotplaying()) Chat_Play(Chat_Id);
                else Chat_Pause();
            }
            if (!Play_isEndDialogVisible()) Play_KeyPause(3);
        } else if (PlayClip_EnterPos === 1) PlayClip_PlayNext();
        else if (PlayClip_EnterPos === -1) PlayClip_PlayPreviously();
    }

    function PlayClip_PlayNext() {
        Screens_KeyLeftRight(1, 0);
        PlayClip_PlayNextPreviously();
    }

    function PlayClip_PlayPreviously() {
        Screens_KeyLeftRight(-1, inUseObj.ColoumnsCount - 1);
        PlayClip_PlayNextPreviously();
    }

    function PlayClip_PlayNextPreviously() {
        Play_ForceHidePannel();
        Main_ready(function() {
            PlayClip_replayOrNext = true;
            PlayClip_PreshutdownStream(false);
            Main_OpenClip(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids, Screens_handleKeyDown);
        });
    }

    function PlayClip_hidePanel() {
        //return;//return;
        PlayVod_jumpCount = 0;
        PlayVod_IsJumping = false;
        PlayVod_addToJump = 0;
        Play_clearHidePanel();
        PlayClip_quality = PlayClip_qualityPlaying;
        Play_ForceHidePannel();
        if (Main_IsNotBrowser) PlayVod_ProgresBarrUpdate((Android.gettime() / 1000), PlayClip_DurationSeconds, true);
        Main_innerHTML('progress_bar_jump_to', STR_SPACE);
        document.getElementById('progress_bar_steps').style.display = 'none';
        window.clearInterval(PlayVod_RefreshProgressBarrID);
    }

    function PlayClip_showPanel() {
        PlayClip_RefreshProgressBarr();
        Play_clock();
        window.clearInterval(PlayVod_RefreshProgressBarrID);
        PlayVod_RefreshProgressBarrID = window.setInterval(PlayClip_RefreshProgressBarr, 1000);
        Play_CleanHideExit();
        PlayVod_IconsBottonResetFocus();
        PlayClip_qualityIndexReset();
        PlayExtra_ResetSpeed();
        Play_qualityDisplay(PlayClip_getQualitiesCount, PlayClip_qualityIndex, PlayClip_SetHtmlQuality);
        Play_ForceShowPannel();
        Play_clearHidePanel();
        PlayClip_setHidePanel();
    }

    function PlayClip_RefreshProgressBarr() {
        if (Main_IsNotBrowser) PlayVod_ProgresBarrUpdate((Android.gettime() / 1000), PlayClip_DurationSeconds, !PlayVod_IsJumping);

        if (!Play_Status_Always_On) {
            if (Main_IsNotBrowser) {
                Play_VideoStatus(false);

                var value = Android.getVideoQuality();

                if (PlayClip_quality.indexOf("Auto") !== -1 && value !== null && value !== undefined) {
                    value = value.split(',');

                    for (var i = 0; i < 2; i++) {
                        value[i] = (value[i] !== null && value[i] !== 'null' && value[i] !== undefined) ? value[i] : '';
                    }

                    Main_textContent('stream_quality', value[0] + value[1] + " | Auto | mp4");
                }

            } else Play_VideoStatusTest();
        }
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

    function PlayClip_SetHtmlQuality(element) {
        if (!PlayClip_qualities[PlayClip_qualityIndex].hasOwnProperty('id')) return;

        PlayClip_quality = PlayClip_qualities[PlayClip_qualityIndex].id;

        var quality_string = PlayClip_quality;
        if (PlayClip_quality.indexOf('source') !== -1) quality_string = quality_string.replace("source", STR_SOURCE);

        Main_textContent(element, PlayClip_quality);
    }

    function PlayClip_setHidePanel() {
        Play_PanelHideID = window.setTimeout(PlayClip_hidePanel, 5000 + PlayVod_ProgressBaroffset); // time in ms
    }

    function PlayClip_SetOpenVod() {
        document.getElementById('controls_' + Play_controlsOpenVod).style.display = PlayClip_HasVOD ? 'inline-block' : 'none';
    }

    function PlayClip_OpenVod() {
        if (PlayClip_HasVOD) {
            Main_values.vodOffset = ChannelVod_vodOffset;
            PlayClip_PreshutdownStream(true);
            document.body.addEventListener("keydown", PlayVod_handleKeyDown, false);
            Play_IconsResetFocus();
            Main_ready(PlayVod_Start);
        } else {
            Play_clearHidePanel();
            Play_IsWarning = true;
            Play_showWarningDialog(STR_NO_BROADCAST_WARNING, 2000);
        }
    }

    function PlayClip_OpenLiveStream() {
        PlayClip_PreshutdownStream(true);
        Main_OpenLiveStream(UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX], UserLiveFeed_ids, PlayClip_handleKeyDown);
    }

    function PlayClip_handleKeyDown(e) {
        if (PlayClip_state !== PlayClip_STATE_PLAYING) {
            switch (e.keyCode) {
                case KEY_STOP:
                    Play_CleanHideExit();
                    PlayClip_shutdownStream();
                    break;
                case KEY_RETURN_Q:
                case KEY_KEYBOARD_BACKSPACE:
                case KEY_RETURN:
                    if (Play_ExitDialogVisible() || Play_SingleClickExit) {
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
                    if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) UserLiveFeed_KeyRightLeft(-1);
                    else if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown()) {
                        Play_ChatPositions++;
                        Play_ChatPosition();
                        Play_controls[Play_controlsChatPos].defaultValue = Play_ChatPositions;
                        Play_controls[Play_controlsChatPos].setLable();
                    } else if (Play_isPanelShown()) {
                        Play_clearHidePanel();
                        if (PlayVod_PanelY === 2) Play_BottomLeftRigt(3, -1);
                        else if (!PlayVod_PanelY) {
                            PlayVod_jumpStart(-1, PlayClip_DurationSeconds);
                            PlayVod_ProgressBaroffset = 2500;
                        } else if (PlayVod_PanelY === 1) {
                            if (PlayClip_EnterPos > -1) {
                                PlayClip_EnterPos--;
                                if (PlayClip_HasBack || !PlayClip_EnterPos) PlayVod_IconsBottonFocus();
                                else PlayClip_EnterPos++;
                            }
                        }
                        PlayClip_setHidePanel();
                    } else if (Play_isEndDialogVisible()) {
                        Play_EndTextClear();
                        Play_EndIconsRemoveFocus();
                        Play_Endcounter--;
                        if (Play_Endcounter < (PlayClip_HasNext ? -1 : 0)) Play_Endcounter = 3;
                        Play_EndIconsAddFocus();
                    } else PlayClip_showPanel();
                    break;
                case KEY_RIGHT:
                    if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) UserLiveFeed_KeyRightLeft(1);
                    else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible()) {
                        Play_controls[Play_controlsChat].enterKey(3);
                    } else if (Play_isPanelShown()) {
                        Play_clearHidePanel();
                        if (PlayVod_PanelY === 2) Play_BottomLeftRigt(3, 1);
                        else if (!PlayVod_PanelY) {
                            PlayVod_jumpStart(1, PlayClip_DurationSeconds);
                            PlayVod_ProgressBaroffset = 2500;
                        } else if (PlayVod_PanelY === 1) {
                            if (PlayClip_EnterPos < 1) {
                                PlayClip_EnterPos++;
                                if (PlayClip_HasNext || !PlayClip_EnterPos) PlayVod_IconsBottonFocus();
                                else PlayClip_EnterPos--;
                            }
                        }
                        PlayClip_setHidePanel();
                    } else if (Play_isEndDialogVisible()) {
                        Play_EndTextClear();
                        Play_EndIconsRemoveFocus();
                        Play_Endcounter++;
                        if (Play_Endcounter > 3) Play_Endcounter = PlayClip_HasNext ? -1 : 0;
                        Play_EndIconsAddFocus();
                    } else PlayClip_showPanel();
                    break;
                case KEY_UP:
                    if (Play_isEndDialogVisible() || UserLiveFeed_isFeedShow()) {
                        Play_EndTextClear();
                        document.body.removeEventListener("keydown", PlayClip_handleKeyDown, false);
                        document.body.addEventListener("keyup", Play_handleKeyUp, false);
                        Play_EndUpclear = false;
                        Play_EndUpclearCalback = PlayClip_handleKeyDown;
                        Play_EndUpclearID = window.setTimeout(Play_keyUpEnd, 250);
                    } else if (Play_isPanelShown()) {
                        Play_clearHidePanel();
                        if (PlayVod_PanelY < 2) {
                            PlayVod_PanelY--;
                            PlayVod_IconsBottonFocus();
                        } else Play_BottomUpDown(3, 1);
                        PlayClip_setHidePanel();
                    } else if (!UserLiveFeed_isFeedShow()) UserLiveFeed_ShowFeed();
                    else PlayClip_showPanel();
                    break;
                case KEY_DOWN:
                    if (Play_isEndDialogVisible()) Play_EndDialogUpDown(1);
                    else if (Play_isPanelShown()) {
                        Play_clearHidePanel();
                        if (PlayVod_PanelY < 2) {
                            PlayVod_PanelY++;
                            PlayVod_IconsBottonFocus();
                        } else Play_BottomUpDown(3, -1);
                        PlayClip_setHidePanel();
                    } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_KeyUpDown(1);
                    else if (Play_isFullScreen && Play_isChatShown()) {
                        Play_KeyChatSizeChage();
                    } else PlayClip_showPanel();
                    break;
                case KEY_ENTER:
                    if (Play_isEndDialogVisible()) {
                        if (Play_EndFocus) Play_EndDialogPressed(3);
                        else {
                            Play_EndDialogEnter = 3;
                            Play_EndUpclearCalback = PlayClip_handleKeyDown;
                            Play_SavePlayData();
                            Main_OpenLiveStream(UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX], UserLiveFeed_ids, Play_handleKeyDown);
                        }
                    } else if (Play_isPanelShown()) {
                        Play_clearHidePanel();
                        if (!PlayVod_PanelY) {
                            if (PlayVod_addToJump) PlayVod_jump();
                        } else if (PlayVod_PanelY === 1) PlayClip_Enter();
                        else Play_BottomOptionsPressed(3);
                        PlayClip_setHidePanel();
                    } else if (UserLiveFeed_isFeedShow()) Play_CheckIfIsLiveStart(PlayClip_OpenLiveStream);
                    else PlayClip_showPanel();
                    break;
                case KEY_STOP:
                    Play_CleanHideExit();
                    PlayClip_shutdownStream();
                    break;
                case KEY_RETURN_Q:
                case KEY_KEYBOARD_BACKSPACE:
                case KEY_RETURN:
                    if (Play_isEndDialogVisible()) Play_EndTextClear();

                    if (Play_isEndDialogVisible() && !Play_EndFocus) {
                        Play_EndFocus = true;
                        UserLiveFeed_FeedRemoveFocus(UserLiveFeed_FeedPosX);
                        Play_EndIconsAddFocus();
                    } else if (Play_isPanelShown()) PlayClip_hidePanel();
                    else if (UserLiveFeed_isFeedShow() && !Play_isEndDialogVisible()) UserLiveFeed_Hide();
                    else {
                        if (Play_ExitDialogVisible() || Play_SingleClickExit) {
                            Play_CleanHideExit();
                            PlayClip_shutdownStream();
                        } else {
                            Play_showExitDialog();
                        }
                    }
                    break;
                case KEY_PLAY:
                    if (!Play_isEndDialogVisible() && Play_isNotplaying()) {
                        Play_KeyPause(2);
                        if (!Main_values.Play_ChatForceDisable) Chat_Play(Chat_Id);
                    }
                    break;
                case KEY_PAUSE:
                    if (!Play_isEndDialogVisible() && !Play_isNotplaying()) {
                        Play_KeyPause(2);
                        if (!Main_values.Play_ChatForceDisable) Chat_Pause();
                    }
                    break;
                case KEY_PLAYPAUSE:
                case KEY_KEYBOARD_SPACE:
                    if (PlayClip_HasVOD && !Main_values.Play_ChatForceDisable) {
                        if (Play_isNotplaying()) Chat_Play(Chat_Id);
                        else Chat_Pause();
                    }
                    if (!Play_isEndDialogVisible()) Play_KeyPause(3);
                    break;
                case KEY_REFRESH:
                    if (UserLiveFeed_isFeedShow()) Play_CheckIfIsLiveStart(PlayVod_OpenLiveStream);
                    break;
                case KEY_CHAT:
                    Play_controls[Play_controlsChat].enterKey(3);
                    break;
                case KEY_PG_UP:
                    Play_Panelcounter = Play_controlsChatPos;
                    Play_BottomUpDown(3, 1);
                    Play_Panelcounter = Play_controlsDefault;
                    break;
                case KEY_PG_DOWN:
                    Play_Panelcounter = Play_controlsChatPos;
                    Play_BottomUpDown(3, -1);
                    Play_Panelcounter = Play_controlsDefault;
                    break;
                case KEY_MEDIA_FAST_FORWARD:
                    if (!Play_isEndDialogVisible()) PlayClip_FastBackForward(1);
                    break;
                case KEY_MEDIA_REWIND:
                    if (!Play_isEndDialogVisible()) PlayClip_FastBackForward(-1);
                    break;
                case KEY_MEDIA_NEXT:
                    PlayClip_PlayNext();
                    break;
                case KEY_MEDIA_PREVIOUS:
                    PlayClip_PlayPreviously();
                    break;
                default:
                    break;
            }
        }
    }

    function PlayClip_FastBackForward(position) {
        if (!Play_isPanelShown()) PlayClip_showPanel();
        Play_clearHidePanel();
        PlayVod_PanelY = 0;
        PlayVod_IconsBottonFocus();

        PlayVod_jumpStart(position, PlayClip_DurationSeconds);
        PlayVod_ProgressBaroffset = 2500;
        PlayClip_setHidePanel();
    }
    //Variable initialization
    var PlayExtra_KeyEnterID;
    var PlayExtra_clear = false;
    var PlayExtra_loadingDataTry = 0;
    var PlayExtra_state = Play_STATE_LOADING_TOKEN;
    var PlayExtra_PicturePicture = false;
    var PlayExtra_RefreshAutoTry = 0;

    var PlayExtra_WasPicturePicture = false;

    function PlayExtra_ResetSpeed() {
        Play_controls[Play_controlsSpeed].defaultValue = Play_CurrentSpeed;
        Play_controls[Play_controlsSpeed].bottomArrows();
        Play_controls[Play_controlsSpeed].setLable();
    }

    function PlayExtra_ResetAudio() {
        //After setting we only reset this if the app is close/re opened
        Play_controls[Play_controlsAudio].defaultValue = Play_controlsAudioPos;
        Play_controls[Play_controlsAudio].bottomArrows();
        Play_controls[Play_controlsAudio].setLable();
    }

    function PlayExtra_KeyEnter() {
        PlayExtra_clear = true;

        var doc = Play_CheckLiveThumb();
        if (doc) {

            PlayExtra_WasPicturePicture = PlayExtra_PicturePicture;

            if (PlayExtra_WasPicturePicture) {
                //PlayExtra_PicturePicture was alredy enable so save data and update live historyinfo
                PlayExtra_SavePlayData();
            } else PlayExtra_Save_data = JSON.parse(JSON.stringify(Play_data_base));

            PlayExtra_data.data = doc;
            PlayExtra_data.watching_time = new Date().getTime();

            PlayExtra_PicturePicture = true;
            Play_UserLiveFeedPressed = true;

            Main_innerHTML('chat_container2_name_text', STR_SPACE + PlayExtra_data.data[1] + STR_SPACE);

            if (Main_IsNotBrowser) {
                //Not on auto mode for change to auto before start picture in picture
                if (Play_data.quality.indexOf("Auto") === -1) Android.StartAuto(1, 0);

                Play_data.quality = "Auto";
                Play_data.qualityPlaying = Play_data.quality;
                PlayExtra_data.quality = "Auto";
                PlayExtra_data.qualityPlaying = PlayExtra_data.quality;
            }
            PlayExtra_Resume();

        }
    }

    function PlayExtra_Resume() {
        // restart audio source position to where ther user has left it
        if (Main_IsNotBrowser) Android.mSwitchPlayerAudio(Play_controlsAudioPos);
        PlayExtra_data.watching_time = new Date().getTime();
        Play_SetAudioIcon();
        PlayExtra_state = Play_STATE_LOADING_TOKEN;
        PlayExtra_loadingDataTry = 0;
        PlayExtra_loadDataRequest();
    }

    function PlayExtra_SavePlayData() {
        PlayExtra_Save_data = JSON.parse(JSON.stringify(PlayExtra_data));
    }

    function PlayExtra_RestorePlayData() {
        Play_showWarningDialog(PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE, 2000);

        PlayExtra_data = JSON.parse(JSON.stringify(PlayExtra_Save_data));
        PlayExtra_Save_data = JSON.parse(JSON.stringify(Play_data_base));
    }

    function PlayExtra_SwitchPlayerStoreOld() {
        PlayExtra_data_old = JSON.parse(JSON.stringify(Play_data));
    }

    function PlayExtra_SwitchPlayerResStoreOld() {
        PlayExtra_data = JSON.parse(JSON.stringify(PlayExtra_data_old));
    }

    function PlayExtra_SwitchPlayer() {
        PlayExtra_SwitchPlayerStoreOld();
        Play_data = JSON.parse(JSON.stringify(PlayExtra_data));

        if (Main_values.Main_Go === Main_aGame) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
        Play_loadingInfoDataTry = 0;

        Play_UpdateMainStream();

        PlayExtra_SwitchPlayerResStoreOld();
        Main_SaveValues();

        Main_innerHTML('chat_container2_name_text', STR_SPACE + PlayExtra_data.data[1] + STR_SPACE);
        Main_innerHTML('chat_container_name_text', STR_SPACE + Play_data.data[1] + STR_SPACE);
    }

    function PlayExtra_ShowChat() {
        Main_ShowElement('chat_container2');
        Main_ShowElement('chat_container_name');
        Main_ShowElement('chat_container2_name');
    }

    function PlayExtra_HideChat() {
        Main_HideElement('chat_container2');
        Main_HideElement('chat_container_name');
        Main_HideElement('chat_container2_name');
    }

    function PlayExtra_End(doSwitch) { // Called only by JAVA
        //Some player ended switch and warn
        if (doSwitch) PlayExtra_SwitchPlayer();

        //If in 50/50 fix postion
        if (!Play_isFullScreen) {
            Play_isFullScreen = !Play_isFullScreen;
            Play_SetFullScreen(Play_isFullScreen);
        } // else if (doSwitch) Android.mSwitchPlayer(); // else if doSwitch switch small to big

        PlayExtra_PicturePicture = false;
        PlayExtra_UnSetPanel();

        Play_showWarningDialog(PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE, 2500);
    }

    function PlayExtra_loadDataSuccess(responseText) {
        if (PlayExtra_state === Play_STATE_LOADING_TOKEN) {
            Play_tokenResponse = JSON.parse(responseText);
            PlayExtra_state = Play_STATE_LOADING_PLAYLIST;
            PlayExtra_loadingDataTry = 0;
            PlayExtra_loadDataRequest();
        } else if (PlayExtra_state === Play_STATE_LOADING_PLAYLIST) {

            //Low end device will not support High Level 5.2 video/mp4; codecs="avc1.640034"
            //        if (!Main_SupportsAvc1High && PlayExtra_SupportsSource && responseText.indexOf('avc1.640034') !== -1) {
            //            PlayExtra_SupportsSource = false;
            //            PlayExtra_loadingDataTry = 0;
            //            PlayExtra_loadDataRequest();
            //            return;
            //        }
            UserLiveFeed_Hide();
            Android.SetAuto2(PlayExtra_data.AutoUrl);
            PlayExtra_data.qualities = Play_extractQualities(responseText);
            PlayExtra_state = Play_STATE_PLAYING;
            PlayExtra_SetPanel();
            if (Play_isOn) PlayExtra_qualityChanged();
            PlayExtra_Save_data = JSON.parse(JSON.stringify(Play_data_base));
            PlayExtra_updateStreamInfo();
            ChatLive_Playing = true;

            if (!Play_isFullScreen) {
                Android.mupdatesizePP(!Play_isFullScreen);
                ChatLive_Init(1);
                PlayExtra_ShowChat();
            }
            Main_Set_history('live', PlayExtra_data.data);
            Play_loadingInfoDataTry = 0;
            Play_updateVodInfo(PlayExtra_data.data[14], PlayExtra_data.data[7], 0);
        }
    }

    function PlayExtra_SetPanel() {
        Play_controls[Play_controlsChatSide].setLable();
        Play_controls[Play_controlsChatSide].setIcon();
        document.getElementById('controls_' + Play_controlsQuality).style.display = 'none';
        document.getElementById('controls_' + Play_controlsAudio).style.display = '';
        document.getElementById('controls_' + Play_controlsQualityMini).style.display = '';
        Play_IconsResetFocus();
    }

    function PlayExtra_UnSetPanel() {
        PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
        Play_controls[Play_controlsChatSide].setLable();
        Play_controls[Play_controlsChatSide].setIcon();
        document.getElementById('controls_' + Play_controlsQuality).style.display = '';
        document.getElementById('controls_' + Play_controlsAudio).style.display = 'none';
        document.getElementById('controls_' + Play_controlsQualityMini).style.display = 'none';
        document.getElementById('controls_' + Play_controlsQualityMulti).style.display = 'none';
        document.getElementById('controls_' + Play_controlsQualityMulti).style.display = 'none';
        document.getElementById('controls_' + Play_controlsAudioMulti).style.display = 'none';
        Play_IconsResetFocus();
        ChatLive_Clear(1);
        PlayExtra_HideChat();
    }

    function PlayExtra_qualityChanged() {
        if (Main_IsNotBrowser && Play_isOn) Android.initializePlayer2Auto();

        if (Main_AndroidSDK < 26 && Main_values.check_pp_workaround && !Settings_Obj_default("pp_workaround")) {

            Main_ShowElement('dialog_os');
            document.body.removeEventListener("keydown", Play_handleKeyDown, false);
            document.body.addEventListener("keydown", PlayExtra_handleKeyDown, false);

            Main_values.check_pp_workaround = false;
            Main_SaveValues();
        }

        if (Main_isDebug) console.log('PlayExtra_onPlayer: Auto');
    }

    function PlayExtra_handleKeyDown(e) {
        if (e.keyCode === KEY_RETURN || e.keyCode === KEY_RETURN_Q || e.keyCode === KEY_KEYBOARD_BACKSPACE) {

            document.body.removeEventListener("keydown", PlayExtra_handleKeyDown, false);
            document.body.addEventListener("keydown", Play_handleKeyDown, false);
            Main_HideElement('dialog_os');

        }
    }

    function PlayExtra_loadDataRequest() {
        var theUrl, state = PlayExtra_state === Play_STATE_LOADING_TOKEN;

        if (state) {
            theUrl = 'https://api.twitch.tv/api/channels/' + PlayExtra_data.data[6] + '/access_token?platform=_';
        } else {
            theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + PlayExtra_data.data[6] +
                '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
                '&reassignments_supported=true&playlist_include_framerate=true&fast_bread=true&allow_source=true' +
                (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();

            //(PlayExtra_SupportsSource ? "&allow_source=true" : '') +
            //(Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();

            PlayExtra_data.AutoUrl = theUrl;
        }

        var xmlHttp;
        if (Main_IsNotBrowser) {
            if (state) xmlHttp = Android.mreadUrlHLS(theUrl);
            else xmlHttp = Android.mreadUrl(theUrl, 3000, 0, null);

            if (xmlHttp) {
                PlayExtra_loadDataSuccessreadyState(JSON.parse(xmlHttp));
            } else Play_loadDataError();

        } else {
            xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.timeout = Play_loadingDataTimeout;
            xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);

            xmlHttp.ontimeout = function() {};

            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState === 4) PlayExtra_loadDataSuccessreadyState(xmlHttp);
            };

            xmlHttp.send(null);
        }
    }

    function PlayExtra_loadDataSuccessreadyState(xmlHttp) {
        if (xmlHttp.status === 200) {

            if (xmlHttp.responseText.indexOf('"status":410') !== -1) PlayExtra_loadDataError();
            else {
                Play_loadingDataTry = 0;
                PlayExtra_loadDataSuccess(xmlHttp.responseText);
            }

        } else if (xmlHttp.status === 403) { //forbidden access
            PlayExtra_loadDataFail(STR_FORBIDDEN);
        } else if (xmlHttp.status === 404) { //off line
            PlayExtra_loadDataFail(PlayExtra_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE);
        } else PlayExtra_loadDataError();
    }

    function PlayExtra_loadDataError() {
        if (Play_isOn && Play_isLive) {
            PlayExtra_loadingDataTry++;
            if (PlayExtra_loadingDataTry < Play_loadingDataTryMax) PlayExtra_loadDataRequest();
            else PlayExtra_loadDataFail(STR_PLAYER_PROBLEM_2);
        }
    }

    function PlayExtra_loadDataFail(Reason) {
        if (Play_data_old.data.length < 0) {

            PlayExtra_PicturePicture = false;
            PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
            ChatLive_Clear(1);
            Main_HideElement('chat_container2');
            if (Main_IsNotBrowser && !Play_isFullScreen) Android.mupdatesize(!Play_isFullScreen);

            Play_HideBufferDialog();
            Play_showWarningDialog(Reason, 2500);
        } else PlayExtra_RestorePlayData();
    }

    function PlayExtra_RefreshAutoRequest(UseAndroid) {
        var theUrl = 'https://api.twitch.tv/api/channels/' + PlayExtra_data.data[6] + '/access_token?platform=_';

        var xmlHttp = Android.mreadUrlHLS(theUrl);

        if (xmlHttp) PlayExtra_RefreshAutoRequestSucess(JSON.parse(xmlHttp), UseAndroid);
        else PlayExtra_RefreshAutoError(UseAndroid);
    }

    function PlayExtra_RefreshAutoRequestSucess(xmlHttp, UseAndroid) {
        if (xmlHttp.status === 200) {

            Play_tokenResponse = JSON.parse(xmlHttp.responseText);
            //410 error
            if (!Play_tokenResponse.hasOwnProperty('token') || !Play_tokenResponse.hasOwnProperty('sig') ||
                xmlHttp.responseText.indexOf('"status":410') !== -1) {
                PlayExtra_RefreshAutoError(UseAndroid);
                return;
            }

            var theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + PlayExtra_data.data[6] +
                '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
                '&reassignments_supported=true&playlist_include_framerate=true&fast_bread=true' +
                '&reassignments_supported=true&playlist_include_framerate=true&fast_bread=true&allow_source=true' +
                (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();

            //(PlayExtra_SupportsSource ? "&allow_source=true" : '') +
            //(Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();

            PlayExtra_data.AutoUrl = theUrl;

            if (UseAndroid) Android.ResStartAuto2(theUrl);
            else Android.SetAuto2(theUrl);

        } else PlayExtra_RefreshAutoError(UseAndroid);
    }

    function PlayExtra_RefreshAutoError(UseAndroid) {
        if (Play_isOn) {
            PlayExtra_RefreshAutoTry++;
            if (PlayExtra_RefreshAutoTry < 5) PlayExtra_RefreshAutoRequest(UseAndroid);
            else if (UseAndroid) PlayExtra_loadDataFail(STR_PLAYER_PROBLEM_2);
        }
    }

    function PlayExtra_updateStreamInfo() {
        var theUrl = Main_kraken_api + 'streams/' + PlayExtra_data.data[14] + Main_TwithcV5Flag_I;
        BasexmlHttpGet(theUrl, 3000, 2, null, PlayExtra_updateStreamInfoValues, PlayExtra_updateStreamInfoError);
    }

    function PlayExtra_updateStreamInfoValues(response) {
        response = JSON.parse(response);
        if (response.stream !== null) {
            Main_history_UpdateLive(
                response.stream._id,
                response.stream.game,
                response.stream.channel.status,
                response.stream.viewers
            );
        }
    }

    function PlayExtra_updateStreamInfoError() {
        if (Play_updateStreamInfoErrorTry < Play_loadingInfoDataTryMax) {
            window.setTimeout(function() {
                if (Play_isOn) PlayExtra_updateStreamInfo();
                //give a second for it retry as the TV may be on coming from resume
            }, 2500);
            Play_updateStreamInfoErrorTry++;
        } else Play_updateStreamInfoErrorTry = 0;
    }
    //Variable initialization
    var Play_ChatPositions = 0;
    var Play_ChatPositionConvertBefore = Play_ChatPositions;
    var Play_PlayerPanelOffset = -5;
    var Play_ChatBackground = 0.55;
    var Play_ChatSizeValue = 2;
    var Play_MaxChatSizeValue = 4;
    var Play_PanelHideID = null;
    var Play_isFullScreen = true;
    var Play_ChatPositionsBF;
    var Play_ChatEnableBF;
    var Play_ChatSizeValueBF;
    var Play_Buffer = 2000;
    var Play_CurrentSpeed = 3;
    var Play_PicturePicturePos = 4;
    var Play_PicturePictureSize = 3;
    var Play_controlsAudioPos = 1;
    var Play_STATE_LOADING_TOKEN = 0;
    var Play_STATE_LOADING_PLAYLIST = 1;
    var Play_STATE_PLAYING = 2;
    var Play_state = 0;
    var Play_Status_Always_On = false;
    var Play_RefreshAutoTry = 0;
    var Play_SingleClickExit = 0;
    var Play_MultiEnable = false;
    var Play_MultiArray = [];
    //var Play_SupportsSource = true;
    var Play_LowLatency = false;
    var Play_EndUpclear = false;
    var Play_EndUpclearID;
    var Play_EndUpclearCalback;
    var Play_EndDialogEnter = 0;

    var Play_streamInfoTimerId = null;
    var Play_tokenResponse = 0;
    var Play_playingTry = 0;

    var Play_playingUrl = '';
    var Play_ChatEnable = false;
    var Play_exitID = null;

    var Play_created = '';

    var Play_loadingDataTry = 0;
    var Play_loadingDataTryMax = 5;

    var Play_loadingInfoDataTry = 0;
    var Play_loadingInfoDataTryMax = 5;

    var Play_ResumeAfterOnlineCounter = 0;
    var Play_ResumeAfterOnlineId;
    var Play_isOn = false;
    var Play_ChatBackgroundID = null;
    var Play_Playing = false;
    var Play_IsWarning = false;
    var Play_LoadLogoSucess = false;
    var Play_loadingInfoDataTimeout = 10000;
    var Play_loadingDataTimeout = 2000;
    var Play_Lang = '';
    var Play_Endcounter = 0;
    var Play_EndTextCounter = 3;
    var Play_EndSettingsCounter = 3;
    var Play_EndTextID = null;
    var Play_EndFocus = false;
    var Play_DialogEndText = '';
    var Play_currentTime = 0;
    var Play_ChatDelayPosition = 0;
    var Play_Temp_selectedChannelDisplayname = '';
    //var Play_4K_ModeEnable = false;
    var Play_TargetHost = '';
    var Play_isLive = true;
    var Play_RestoreFromResume = false;
    var Play_updateStreamInfoErrorTry = 0;
    var Play_chat_container;
    var Play_IncrementView = '';
    var Play_ProgresBarrElm;
    var Play_DefaultjumpTimers = [];
    var Play_UserLiveFeedPressed = false;
    //counterclockwise movement, Vertical/horizontal Play_ChatPositions
    //sizeOffset in relation to the size
    var Play_ChatPositionVal = [{
        "top": 51.8, // Bottom/right 0
        "left": 75.1,
        "sizeOffset": [31, 16, 0, -25.2, 0] // top - sizeOffset is the defaul top for it chat position
    }, {
        "top": 33, // Middle/right 1
        "left": 75.1,
        "sizeOffset": [12.5, 0, -6.25, -19.5, 0]
    }, {
        "top": 0.2, // Top/right 2
        "left": 75.1,
        "sizeOffset": [0, 0, 0, 0, 0]
    }, {
        "top": 0.2, // Top/center 3
        "left": 38.3,
        "sizeOffset": [0, 0, 0, 0, 0]
    }, {
        "top": 0.2, // Top/left 4
        "left": 0.2,
        "sizeOffset": [0, 0, 0, 0, 0]
    }, {
        "top": 33, // Middle/left 5
        "left": 0.2,
        "sizeOffset": [12.5, 0, -6.25, -19.5, 0]
    }, {
        "top": 51.8, // Bottom/left 6
        "left": 0.2,
        "sizeOffset": [31, 16, 0, -25.2, 0]
    }, {
        "top": 51.8, // Bottom/center 7
        "left": 38.3,
        "sizeOffset": [31, 16, 0, -25.2, 0]
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
        "dialogTop": -25
    }, {
        "containerHeight": 32, // 25%
        "percentage": '25%',
        "dialogTop": -40
    }, {
        "containerHeight": 48, // 50%
        "percentage": '50%',
        "dialogTop": -60
    }, {
        "containerHeight": 73, // 75%
        "percentage": '75%',
        "dialogTop": -80
    }, {
        "containerHeight": 99.6, // 100%
        "percentage": '100%',
        "dialogTop": -120
    }];

    var Play_ChatFontObj = ['chat_extra_small', 'chat_size_small', 'chat_size_default', 'chat_size_biger', 'chat_size_bigest'];

    var Play_data_base = {
        data: [],
        isHost: false,
        DisplaynameHost: '',
        watching_time: 0,
        qualities: [],
        qualityPlaying: "Auto",
        quality: "Auto",
        AutoUrl: ''
    };

    var Play_data = JSON.parse(JSON.stringify(Play_data_base));
    var PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));

    var Play_data_old = JSON.parse(JSON.stringify(Play_data_base));
    var PlayExtra_Save_data = JSON.parse(JSON.stringify(Play_data_base));
    var PlayExtra_data_old = JSON.parse(JSON.stringify(Play_data_base));

    //Variable initialization end

    function Play_PreStart() {
        Play_chat_container = document.getElementById("chat_container");
        Play_ProgresBarrElm = document.getElementById("inner_progress_bar");

        Play_ChatPositions = Main_getItemInt('ChatPositionsValue', 0);
        Play_ChatSizeValue = Main_getItemInt('ChatSizeValue', 2);
        Play_ChatEnable = Main_getItemBool('ChatEnable', false);
        Play_isFullScreen = Main_getItemBool('Play_isFullScreen', true);
        Play_ChatBackground = (Main_values.ChatBackground * 0.05).toFixed(2);
        Play_ChatDelayPosition = Main_getItemInt('Play_ChatDelayPosition', 0);
        Play_PicturePicturePos = Main_getItemInt('Play_PicturePicturePos', 4);
        Play_PicturePictureSize = Main_getItemInt('Play_PicturePictureSize', 3);
        Play_controlsAudioPos = Main_getItemInt('Play_controlsAudioPos', 1);

        Play_LowLatency = Main_getItemBool('Play_LowLatency', false);

        if (Main_IsNotBrowser) {
            Android.mSetPlayerPosition(Play_PicturePicturePos);
            Android.mSetPlayerSize(Play_PicturePictureSize);
            Android.mSetlatency(Play_LowLatency);
            Settings_PP_Workaround();
        }

        Play_SetQuality();

        Play_ChatSize(false);
        Play_ChatBackgroundChange(false);
        Play_SetChatFont();
        Play_SetAudioIcon();

        Main_innerHTML('user_feed_notify_img_holder',
            '<img id="user_feed_notify_img" alt="" class="notify_img" src="' + IMG_404_LOGO +
            '" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';" >');
        Play_MultiSetpannelInfo();
    }

    function Play_SetQuality() {
        Play_data.quality = Settings_Obj_values('default_quality').replace(STR_SOURCE, "source");
        Play_data.qualityPlaying = Play_data.quality;

        PlayVod_quality = Play_data.quality;
        PlayVod_qualityPlaying = Play_data.quality;
    }

    var Play_isFullScreenold = true;

    function Play_SetFullScreen(isfull) {
        if (Play_isFullScreenold === Play_isFullScreen) return;
        Play_isFullScreenold = Play_isFullScreen;

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
            Play_ChatPositions = 0;
            Play_showChat();
            Play_ChatEnable = true;
            Play_ChatSizeValue = Play_MaxChatSizeValue;
            Play_ChatPositionConvert(true);
            Play_ChatSize(false);
            if (Chat_div[0]) Chat_div[0].scrollTop = Chat_div[0].scrollHeight;
        }

        if (PlayExtra_PicturePicture) {
            if (Main_IsNotBrowser) Android.mupdatesizePP(!Play_isFullScreen);
            if (!Play_isFullScreen) {
                ChatLive_Init(1);
                PlayExtra_ShowChat();
            } else {
                ChatLive_Clear(1);
                PlayExtra_HideChat();
            }
        } else if (Main_IsNotBrowser) Android.mupdatesize(!Play_isFullScreen);

        Main_setItem('Play_isFullScreen', Play_isFullScreen);
    }

    function Play_SetChatFont() {
        for (var i = 0; i < Play_ChatFontObj.length; i++) {
            Main_RemoveClass('chat_inner_container', Play_ChatFontObj[i]);
            Main_RemoveClass('chat_inner_container2', Play_ChatFontObj[i]);
        }

        Main_AddClass('chat_inner_container', Play_ChatFontObj[Main_values.Chat_font_size]);
        Main_AddClass('chat_inner_container2', Play_ChatFontObj[Main_values.Chat_font_size]);
    }

    function Play_Start() {
        Play_showBufferDialog();
        //Play_SupportsSource = true;

        Main_empty('stream_info_title');
        Play_LoadLogoSucess = false;
        PlayClip_HasVOD = true;
        //reset channel logo to prevent another channel logo
        Play_LoadLogo(document.getElementById('stream_info_icon'), IMG_404_LOGO_TEMP);

        document.getElementById('controls_' + Play_MultiStream).style.display = '';
        document.getElementById('controls_' + Play_controlsOpenVod).style.display = 'none';
        document.getElementById('controls_' + Play_controlsChatDelay).style.display = '';
        document.getElementById('controls_' + Play_controlsLowLatency).style.display = '';

        if (!PlayExtra_PicturePicture) PlayExtra_UnSetPanel();
        Play_CurrentSpeed = 3;
        Play_RefreshAutoTry = 0;

        Play_ShowPanelStatus(1);

        Play_IconsResetFocus();

        PlayClip_HideShowNext(0, 0);
        PlayClip_HideShowNext(1, 0);

        Main_values.Play_WasPlaying = 1;
        Main_SaveValues();

        Play_data.isHost = Main_values.Play_isHost;
        Main_values.Play_isHost = false;
        Play_RestoreFromResume = false;
        Main_ShowElement('controls_holder');

        Play_currentTime = 0;
        Play_data.watching_time = new Date().getTime();
        Main_innerHTML("stream_watching_time", "," + STR_SPACE + STR_WATCHING + Play_timeS(0));
        Main_innerHTML('chat_container_name_text', STR_SPACE + Play_data.data[1] + STR_SPACE);
        Play_created = Play_timeMs(0);

        Main_textContent("stream_live_time", Play_created);
        Main_HideElement('progress_bar_div');

        Play_UserLiveFeedPressed = false;
        if (!Play_EndDialogEnter) {
            Play_EndSet(1);
            UserLiveFeed_SetFeedPicText();
        }
        Play_PlayerPanelOffset = -5;
        Play_updateStreamInfoErrorTry = 0;
        Play_loadingInfoDataTimeout = 3000;
        Play_isLive = true;
        Play_tokenResponse = 0;
        Play_playingTry = 0;
        Play_isOn = true;
        Play_Playing = false;
        Play_state = Play_STATE_LOADING_TOKEN;

        Play_loadData();
        Play_UpdateMainStream(true);
        document.body.removeEventListener("keyup", Main_handleKeyUp);

        window.clearInterval(Play_streamInfoTimerId);
        Play_streamInfoTimerId = window.setInterval(Play_updateStreamInfo, 300000);
    }

    // To Force a warn, not used regularly so keep commented out
    //function Play_Warn(text) {
    //    Play_showWarningDialog(text);
    //}

    var Play_CheckIfIsLiveStartCounter = 0;
    var Play_CheckIfIsLiveStartChannel = 0;
    var Play_CheckIfIsLiveStartCallback = 0;

    function Play_CheckIfIsLiveStart(callback) {
        if (Main_ThumbOpenIsNull(UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX], UserLiveFeed_ids[0])) return;
        else if (!Main_IsNotBrowser) {
            callback();
            return;
        }
        Play_showBufferDialog();

        Play_CheckIfIsLiveStartCounter = 0;
        Play_CheckIfIsLiveStartCallback = callback;
        Play_CheckIfIsLiveStartChannel = JSON.parse(document.getElementById(UserLiveFeed_ids[8] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]).getAttribute(Main_DataAttribute))[6];

        Play_Temp_selectedChannelDisplayname = document.getElementById(UserLiveFeed_ids[3] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]).textContent;

        Play_CheckIfIsLive();
    }


    function Play_CheckIfIsLive() {
        var theUrl = 'https://api.twitch.tv/api/channels/' + Play_CheckIfIsLiveStartChannel + '/access_token';

        var xmlHttp = Android.mreadUrlHLS(theUrl);

        if (xmlHttp) {
            xmlHttp = JSON.parse(xmlHttp);

            if (xmlHttp.status === 200) {
                Play_tokenResponse = JSON.parse(xmlHttp.responseText);

                if (!Play_tokenResponse.hasOwnProperty('token') || !Play_tokenResponse.hasOwnProperty('sig')) Play_CheckIfIsLiveError();
                else {
                    Play_CheckIfIsLiveStartCounter = 0;
                    Play_CheckIfIsLiveLink();
                }
            }

        } else Play_CheckIfIsLiveError();
    }

    function Play_CheckIfIsLiveError() {
        if (Play_CheckIfIsLiveStartCounter < 3) {
            Play_CheckIfIsLiveStartCounter++;
            Play_CheckIfIsLive();
        } else Play_CheckIfIsLiveWarn();
    }

    function Play_CheckIfIsLiveWarn() {
        Play_HideBufferDialog();
        Play_showWarningDialog(Play_Temp_selectedChannelDisplayname + ' ' + STR_LIVE + STR_IS_OFFLINE, 2000);
    }

    function Play_CheckIfIsLiveLinkError() {
        if (Play_CheckIfIsLiveStartCounter < 3) {
            Play_CheckIfIsLiveStartCounter++;
            Play_CheckIfIsLiveLink();
        } else Play_CheckIfIsLiveWarn();
    }

    function Play_CheckIfIsLiveLink() {
        var theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + Play_CheckIfIsLiveStartChannel +
            '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
            '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&p=' +
            Main_RandomInt();

        var xmlHttp = Android.mreadUrl(theUrl, Play_loadingDataTimeout, 0, null);

        if (!xmlHttp) {
            Play_CheckIfIsLiveLinkError();
            return;
        }

        if (JSON.parse(xmlHttp).status === 200) Play_CheckIfIsLiveStartCallback();
        else Play_CheckIfIsLiveLinkError();
    }

    function Play_CheckResume() { // Called only by JAVAPlay_CheckIfIsLiveStartCallback
        if (Play_isOn) Play_Resume();
        else if (PlayVod_isOn) PlayVod_Resume();
        else if (PlayClip_isOn) PlayClip_Resume();
    }

    function Play_CheckResumeForced(isPicturePicture, isMulti, position) { // Called only by JAVA

        if (isMulti) {
            Play_MultiStart(
                position,
                Play_MultiArray[position].data[6],
                Play_MultiArray[position].data[1],
                0
            );
            return;
        }

        Play_RefreshAutoTry = 0;
        PlayExtra_RefreshAutoTry = 0;

        if (isPicturePicture) PlayExtra_RefreshAutoRequest(true);
        else if (Main_IsNotBrowser) Play_RefreshAutoRequest(true);
    }

    function Play_RefreshAutoRequest(UseAndroid) {
        var theUrl = 'https://api.twitch.tv/api/channels/' + Play_data.data[6] +
            '/access_token?platform=_';

        var xmlHttp = Android.mreadUrlHLS(theUrl);

        if (xmlHttp) Play_RefreshAutoRequestSucess(JSON.parse(xmlHttp), UseAndroid);
        else Play_RefreshAutoError(UseAndroid);
    }

    function Play_RefreshAutoRequestSucess(xmlHttp, UseAndroid) {
        if (xmlHttp.status === 200) {

            Play_tokenResponse = JSON.parse(xmlHttp.responseText);
            //410 error
            if (!Play_tokenResponse.hasOwnProperty('token') || !Play_tokenResponse.hasOwnProperty('sig') ||
                xmlHttp.responseText.indexOf('"status":410') !== -1) {
                Play_RefreshAutoError(UseAndroid);
                return;
            }

            var theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + Play_data.data[6] +
                '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
                '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true' +
                (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&cdm=wv&p=' + Main_RandomInt();
            //(Play_SupportsSource ? "&allow_source=true" : '') +
            //'&fast_bread=true' +
            //(Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&cdm=wv&p=' + Main_RandomInt();

            Play_data.AutoUrl = theUrl;

            if (UseAndroid) Android.ResStartAuto(theUrl, 1, 0);
            else Android.SetAuto(theUrl);

        } else Play_RefreshAutoError(UseAndroid);
    }

    function Play_RefreshAutoError(UseAndroid) {
        if (Play_isOn) {
            Play_RefreshAutoTry++;
            if (Play_RefreshAutoTry < 5) Play_RefreshAutoRequest(UseAndroid);
            else if (UseAndroid) Play_CheckHostStart();
        }
    }

    function Play_Resume() {
        UserLiveFeed_Hide();
        Play_data.watching_time = new Date().getTime();
        Play_isOn = true;
        ChatLive_Playing = true;
        Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i></div>');
        Play_showBufferDialog();
        Play_RefreshAutoTry = 0;
        Play_loadingInfoDataTimeout = 3000;
        Play_RestoreFromResume = true;
        Play_ResumeAfterOnlineCounter = 0;

        window.clearInterval(Play_ResumeAfterOnlineId);
        if (navigator.onLine) Play_ResumeAfterOnline();
        else Play_ResumeAfterOnlineId = window.setInterval(Play_ResumeAfterOnline, 100);

        Play_UpdateMainStream(true);
        window.clearInterval(Play_streamInfoTimerId);
        Play_streamInfoTimerId = window.setInterval(Play_updateStreamInfo, 300000);
        Play_ShowPanelStatus(1);
    }

    function Play_ResumeAfterOnline() {
        if (navigator.onLine || Play_ResumeAfterOnlineCounter > 200) {
            window.clearInterval(Play_ResumeAfterOnlineId);
            if (Play_MultiEnable) {
                Play_data = JSON.parse(JSON.stringify(Play_MultiArray[Play_MultiFirstAvaileble()]));
                for (var i = 0; i < Play_MultiArray.length; i++) {
                    if (Play_MultiArray[i].data.length > 0) {
                        Play_MultiStart(
                            i,
                            Play_MultiArray[i].data[6],
                            Play_MultiArray[i].data[1],
                            0
                        );
                    }
                }

            } else {
                Play_state = Play_STATE_LOADING_TOKEN;
                if (PlayExtra_PicturePicture) PlayExtra_Resume();
                Play_loadData();
            }
        }
        Play_ResumeAfterOnlineCounter++;
    }

    function Play_updateStreamInfoStart() {
        var theUrl = Main_kraken_api + 'streams/' + Play_data.data[14] + Main_TwithcV5Flag_I;
        BasexmlHttpGet(theUrl, Play_loadingInfoDataTimeout, 2, null, Play_updateStreamInfoStartValues, Play_updateStreamInfoStartError);
    }

    function Play_partnerIcon(name, partner, islive, lang) {
        var div = '<div class="partnericon_div"> ' + name + STR_SPACE + STR_SPACE + '</div>' +
            (partner ? ('<img class="partnericon_img" alt="" src="' +
                IMG_PARTNER + '">') : "");

        if (islive) {
            div += STR_SPACE + STR_SPACE + '<div class="partnericon_text" style="background: #' +
                (Play_data.data[8] ? 'FFFFFF; color: #000000;' : 'E21212;') + '">' +
                STR_SPACE + STR_SPACE + (Play_data.data[8] ? STR_NOT_LIVE : STR_LIVE) + STR_SPACE + STR_SPACE + '</div>';
        }

        div += '<div class="lang_text" ">' + STR_SPACE + STR_SPACE + lang + '</div>';

        Main_innerHTML("stream_info_name", div);
    }

    function Play_updateStreamInfoStartValues(response) {
        if (AddUser_UserIsSet()) {
            AddCode_PlayRequest = true;
            AddCode_Channel_id = Play_data.data[14];
            AddCode_CheckFallow();
        } else Play_hideFallow();

        response = JSON.parse(response);
        if (response.stream !== null) {
            Play_data.data[8] = Main_is_rerun(response.stream.broadcast_platform);
            Play_data.data[7] = response.stream._id;

            Main_innerHTML("stream_info_title", twemoji.parse(response.stream.channel.status, false, true));
            Play_data.data[3] = response.stream.game;
            Play_Lang = ' [' + (response.stream.channel.broadcaster_language).toUpperCase() + ']';

            Play_partnerIcon(Play_data.isHost ? Play_data.DisplaynameHost : Play_data.data[1], response.stream.channel.partner, true, Play_Lang);

            var playing = (Play_data.data[3] !== "" ? STR_PLAYING + Play_data.data[3] : "");
            Main_textContent("stream_info_game", playing);

            Main_innerHTML("stream_live_viewers", STR_SPACE + STR_FOR + Main_addCommas(response.stream.viewers) + STR_SPACE + STR_VIEWER);
            Play_data.data[9] = response.stream.channel.logo;
            Play_LoadLogoSucess = true;
            Play_LoadLogo(document.getElementById('stream_info_icon'), Play_data.data[9]);
            Play_created = response.stream.created_at;

            Play_controls[Play_controlsChanelCont].setLable(Play_data.data[1]);
            Play_controls[Play_controlsGameCont].setLable(Play_data.data[3]);

            if (Play_data.isHost && Main_history_Exist('live', Play_data.data[14]) < 0) {
                Main_Set_history('live', ScreensObj_LiveCellArray(response.stream));
            } else {
                Main_history_UpdateLive(
                    Play_data.data[7],
                    Play_data.data[3],
                    response.stream.channel.status,
                    response.stream.viewers
                );
            }
            Play_loadingInfoDataTry = 0;
            Play_updateVodInfo(response.stream.channel._id, response.stream._id, 0);
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

    function Play_updateVodInfo(Channel_id, BroadcastID, tryes) {
        var theUrl = Main_kraken_api + 'channels/' + Channel_id + '/videos?limit=100&broadcast_type=archive&sort=time',
            xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = 10000;

        for (var i = 0; i < 2; i++)
            xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) Play_updateVodInfoSuccess(xmlHttp.responseText, BroadcastID);
                else Play_updateVodInfoError(Channel_id, BroadcastID, tryes);
            }
        };

        xmlHttp.send(null);
    }

    function Play_updateVodInfoError(Channel_id, BroadcastID, tryes) {
        if (tryes < 10) {
            window.setTimeout(function() {
                if (Play_isOn) Play_updateVodInfo(Channel_id, BroadcastID, tryes + 1);
            }, 500);
        }
    }

    function Play_updateVodInfoSuccess(response, BroadcastID) {
        response = JSON.parse(response).videos;

        for (var i = 0; i < response.length; i++) {
            if (response[i].status.indexOf('recording') !== -1) {

                Main_history_UpdateLiveVod(
                    BroadcastID,
                    response[i]._id.substr(1),
                    'https://static-cdn.jtvnw.net/s3_vods/' + response[i].animated_preview_url.split('/')[3] +
                    '/thumb/thumb0-' + Main_VideoSize + '.jpg'
                );

                break;
            }
        }
    }

    function Play_RefreshMultiRequest(pos, streamer, id, tryes) {
        var theUrl = 'https://api.twitch.tv/api/channels/' + streamer + '/access_token?platform=_';

        var xmlHttp = Android.mreadUrlHLS(theUrl);

        if (xmlHttp) Play_RefreshMultiRequestSucess(JSON.parse(xmlHttp), pos, streamer, id, tryes);
        else Play_RefreshMultiError(pos, streamer, id, tryes);
    }

    function Play_RefreshMultiRequestSucess(xmlHttp, pos, streamer, id, tryes) {
        if (xmlHttp.status === 200) {

            Play_tokenResponse = JSON.parse(xmlHttp.responseText);
            //410 error
            if (!Play_tokenResponse.hasOwnProperty('token') || !Play_tokenResponse.hasOwnProperty('sig') ||
                xmlHttp.responseText.indexOf('"status":410') !== -1) {
                Play_RefreshMultiError(pos, streamer, id, tryes);
                return;
            }

            var theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + streamer +
                '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
                '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true' +
                (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&cdm=wv&p=' + Main_RandomInt();

            Play_MultiArray[pos].AutoUrl = theUrl;

            try {
                Android.SetAutoMulti(pos, theUrl);
            } catch (e) {}

            theUrl = Main_kraken_api + 'streams/' + id + Main_TwithcV5Flag_I;
            Play_RefreshMultiGet(theUrl, 0, pos);

        } else Play_RefreshMultiError(pos, streamer, id, tryes);
    }

    function Play_RefreshMultiError(pos, streamer, id, tryes) {
        if (Play_isOn && tryes < 5 && Play_MultiArray[pos].data.length > 0)
            Play_RefreshMultiRequest(pos, streamer, id, tryes + 1);
    }

    function Play_RefreshMultiGet(theUrl, tryes, pos) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = 5000;

        for (var i = 0; i < 2; i++)
            xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Play_updateStreamInfoMultiValues(xmlHttp.responseText, pos);
                } else {
                    Play_updateStreamInfoMultiError(theUrl, tryes, pos);
                }
            }
        };

        xmlHttp.send(null);
    }

    function Play_updateStreamInfoMultiValues(response, pos) {
        response = JSON.parse(response);
        if (response.stream !== null) {
            Play_MultiArray[pos].data[3] = response.stream.game;

            if (!pos) {
                Play_controls[Play_controlsChanelCont].setLable(Play_MultiArray[pos].data[1]);
                Play_controls[Play_controlsGameCont].setLable(Play_MultiArray[pos].data[3]);
            }

            Play_MultiUpdateinfo(
                pos,
                response.stream.game,
                response.stream.viewers,
                Main_is_rerun(response.stream.broadcast_platform),
                twemoji.parse(response.stream.channel.status, false, true)
            );

            Main_history_UpdateLive(
                response.stream._id,
                response.stream.game,
                response.stream.channel.status,
                response.stream.viewers
            );

        }
    }

    function Play_updateStreamInfoMultiError(theUrl, tryes, pos) {
        if (tryes < Play_loadingInfoDataTryMax) {
            window.setTimeout(function() {
                if (Play_isOn) Play_RefreshMultiGet(theUrl, tryes + 1, pos);
                //give a second for it retry as the TV may be on coming from resume
            }, 2500);
        }
    }

    //When update this also update PlayExtra_updateStreamInfo
    function Play_updateStreamInfo() {
        if (Play_MultiEnable) {
            for (var i = 0; i < Play_MultiArray.length; i++) {
                if (Play_MultiArray[i].data.length > 0) {
                    Play_RefreshMultiRequest(
                        i,
                        Play_MultiArray[i].data[6],
                        Play_MultiArray[i].data[14],
                        0
                    );
                }
            }

            return;
        }

        Play_RefreshAutoTry = 0;
        if (Main_IsNotBrowser) Play_RefreshAutoRequest(false);

        if (PlayExtra_PicturePicture) {
            PlayExtra_RefreshAutoTry = 0;
            PlayExtra_RefreshAutoRequest(false);
        }

        var theUrl = Main_kraken_api + 'streams/' + Play_data.data[14] + Main_TwithcV5Flag_I;
        BasexmlHttpGet(theUrl, 3000, 2, null, Play_updateStreamInfoValues, Play_updateStreamInfoError);
    }

    function Play_updateStreamInfoValues(response) {
        response = JSON.parse(response);
        if (response.stream !== null) {
            Play_data.data[3] = response.stream.game;

            Main_innerHTML("stream_info_title", twemoji.parse(response.stream.channel.status, false, true));
            Main_textContent("stream_info_game", STR_PLAYING + Play_data.data[3]);

            Main_innerHTML("stream_live_viewers", STR_SPACE + STR_FOR + Main_addCommas(response.stream.viewers) +
                STR_SPACE + STR_VIEWER);

            if (!Play_LoadLogoSucess) Play_LoadLogo(document.getElementById('stream_info_icon'),
                response.stream.channel.logo);

            Play_controls[Play_controlsChanelCont].setLable(Play_data.data[1]);
            Play_controls[Play_controlsGameCont].setLable(Play_data.data[3]);

            Main_history_UpdateLive(
                response.stream._id,
                Play_data.data[3],
                response.stream.channel.status,
                response.stream.viewers
            );
            if (PlayExtra_PicturePicture) {
                Play_updateStreamInfoErrorTry = 0;
                PlayExtra_updateStreamInfo();
            }
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
            this.onerror = null;
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

    //Some times the server is returning {"error":"Gone","status":410,"message":"this API has been removed."}
    //On those case we can't use user oauth_token to prevent the 410 error
    //var Play_410ERROR = false;

    function Play_loadDataRequest() {
        var theUrl, state = Play_state === Play_STATE_LOADING_TOKEN;

        if (state) {
            theUrl = 'https://api.twitch.tv/api/channels/' + Play_data.data[6] +
                '/access_token?platform=_';
        } else {
            if (!Play_tokenResponse.hasOwnProperty('token') || !Play_tokenResponse.hasOwnProperty('sig')) {
                Play_loadDataError();
                return;
            }

            theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + Play_data.data[6] +
                '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
                '&reassignments_supported=true&playlist_include_framerate=true' +
                '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true' +
                (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&cdm=wv&p=' + Main_RandomInt();
            //(Play_SupportsSource ? "&allow_source=true" : '') +
            //'&fast_bread=true' +
            //(Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();

            Play_data.AutoUrl = theUrl;
        }

        if (Main_IsNotBrowser) {
            var xmlHttp;

            if (state) xmlHttp = Android.mreadUrlHLS(theUrl);
            else xmlHttp = Android.mreadUrl(theUrl, Play_loadingDataTimeout, 0, null);

            if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
            else {
                Play_loadDataError();
                return;
            }

            if (xmlHttp.status === 200) {
                Play_loadingDataTry = 0;

                if (xmlHttp.responseText.indexOf('"status":410') !== -1) Play_loadDataError();
                else Play_loadDataSuccess(xmlHttp.responseText);

            } else if (xmlHttp.status === 403 || xmlHttp.status === 404 ||
                xmlHttp.status === 410) { //forbidden access
                //404 = off line
                //403 = forbidden access
                //410 = api v3 is gone use v5 bug
                Play_loadDataErrorFinish(xmlHttp.status === 410, xmlHttp.status === 403);
            } else {
                Play_loadDataError();
            }

        } else Play_loadDataSuccessFake();
    }

    function Play_loadDataError() {
        if (Play_isOn && Play_isLive) {
            Play_loadingDataTry++;
            if (Play_loadingDataTry < (Play_loadingDataTryMax + (Play_RestoreFromResume ? 7 : 0))) {
                Play_loadingDataTimeout += 250;
                if (Play_RestoreFromResume) window.setTimeout(Play_loadDataRequest, 500);
                else Play_loadDataRequest();
            } else {
                if (Main_IsNotBrowser) Play_loadDataErrorFinish();
                else Play_loadDataSuccessFake();
            }
        }
    }

    function Play_loadDataErrorFinish(error_410, Isforbiden) {
        if (Play_EndDialogEnter) {
            Play_EndDialogEnter = 0;
            Play_HideBufferDialog();

            document.body.removeEventListener("keydown", Play_handleKeyDown);
            document.body.addEventListener("keydown", Play_EndUpclearCalback, false);
            Play_state = Play_STATE_PLAYING;

            Play_showWarningDialog(error_410 ? STR_410_ERROR :
                Play_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE,
                2000);

            Play_RestorePlayDataValues();
            Main_values.Play_WasPlaying = 0;
            Main_SaveValues();
        } else if (Play_OlddataSet()) Play_RestorePlayData(error_410);
        else if (!PlayExtra_PicturePicture) {

            if (Isforbiden) Play_ForbiddenLive();
            else Play_CheckHostStart(error_410);

        } else Play_CloseBigAndSwich(error_410);
    }

    function Play_OlddataSet() {
        return Play_data_old.data.length > 0;
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
        Play_data.qualities = [{
                'id': 'Auto',
                'band': 0,
                'codec': 'avc',
                'url': 'https://auto'
            },
            {
                'id': '1080p60 | source ',
                'band': '| 10.00Mbps',
                'codec': ' | avc',
                'url': 'https://souce'
            },
            {
                'id': '720p60',
                'band': ' | 5.00Mbps',
                'codec': ' | avc',
                'url': 'https://720p60'
            },
            {
                'id': '720p',
                'band': ' | 2.50Mbps',
                'codec': ' | avc',
                'url': 'https://720'
            },
            {
                'id': '480p',
                'band': ' | 2.50Mbps',
                'codec': ' | avc',
                'url': 'https://480'
            },
            {
                'id': '320p',
                'band': ' | 2.50Mbps',
                'codec': ' | avc',
                'url': 'https://320'
            },
        ];
        Play_state = Play_STATE_PLAYING;
        if (Play_isOn) Play_qualityChanged();
        Main_Set_history('live', Play_data.data);
    }

    function Play_loadDataSuccess(responseText) {
        if (Play_state === Play_STATE_LOADING_TOKEN) {
            Play_tokenResponse = JSON.parse(responseText);
            Play_state = Play_STATE_LOADING_PLAYLIST;
            Play_loadData();
        } else if (Play_state === Play_STATE_LOADING_PLAYLIST) {

            UserLiveFeed_Hide();

            if (Play_EndDialogEnter === 2) PlayVod_PreshutdownStream(true);
            else if (Play_EndDialogEnter === 3) PlayClip_PreshutdownStream(false);

            Play_EndDialogEnter = 0;

            Play_EndSet(1);
            UserLiveFeed_SetFeedPicText();
            Play_HideEndDialog();

            //Low end device will not support High Level 5.2 video/mp4; codecs="avc1.640034"
            //        if (!Main_SupportsAvc1High && Play_SupportsSource && responseText.indexOf('avc1.640034') !== -1) {
            //            Play_SupportsSource = false;
            //            Play_loadData();
            //            return;
            //        }

            Play_data.qualities = Play_extractQualities(responseText);
            Play_state = Play_STATE_PLAYING;
            if (Main_IsNotBrowser) Android.SetAuto(Play_data.AutoUrl);
            Play_data_old = JSON.parse(JSON.stringify(Play_data_base));
            if (Play_isOn) Play_qualityChanged();
            UserLiveFeed_PreventHide = false;
            ChatLive_Playing = true;

            if (!Play_data.isHost) Main_Set_history('live', Play_data.data);
        }
    }

    function Play_extractQualities(input) {
        var Band,
            codec,
            result = [],
            TempId = '',
            tempCount = 1;

        var streams = Play_extractStreamDeclarations(input);
        for (var i = 0; i < streams.length; i++) {
            TempId = streams[i].split('NAME="')[1].split('"')[0];
            Band = Play_extractBand(streams[i].split('BANDWIDTH=')[1].split(',')[0]);
            codec = Play_extractCodec(streams[i].split('CODECS="')[1].split('.')[0]);
            if (!result.length) {
                result.push({
                    'id': 'Auto',
                    'band': 0,
                    'codec': 'avc',
                    'url': 'Auto_url'
                });
                if (TempId.indexOf('ource') === -1) TempId = TempId + ' | source';
                else if (TempId) TempId = TempId.replace('(', ' | ').replace(')', '');
                result.push({
                    'id': TempId,
                    'band': Band,
                    'codec': codec,
                    'url': streams[i].split("\n")[2]
                });
            } else if (result[i - tempCount].id !== TempId && result[i - tempCount].id !== TempId + ' | source') {
                result.push({
                    'id': TempId,
                    'band': Band,
                    'codec': codec,
                    'url': streams[i].split("\n")[2]
                });
            } else tempCount++;
        }

        return result;
    }

    function Play_extractBand(input) {
        input = parseInt(input);
        return input > 0 ? ' | ' + parseFloat(input / 1000000).toFixed(2) + 'Mbps' : '';
    }

    function Play_extractCodec(input) {
        if (input.indexOf('avc') !== -1) return ' | avc';
        else if (input.indexOf('vp9') !== -1) return ' | vp9';
        else if (input.indexOf('mp4') !== -1) return ' | mp4';
        return '';
    }

    function Play_extractStreamDeclarations(input) {
        var result = [];

        var myRegexp = /#EXT-X-MEDIA:(.)*\n#EXT-X-STREAM-INF:(.)*\n(.)*/g;
        var marray;
        while ((marray = myRegexp.exec(input))) result.push(marray[0]);

        return result;
    }

    function Play_qualityChanged() {
        Play_data.qualityIndex = 1;
        Play_playingUrl = Play_data.qualities[1].url;

        for (var i = 0; i < Play_getQualitiesCount(); i++) {
            if (Play_data.qualities[i].id === Play_data.quality) {
                Play_data.qualityIndex = i;
                Play_playingUrl = Play_data.qualities[i].url;
                break;
            } else if (Play_data.qualities[i].id.indexOf(Play_data.quality) !== -1) { //make shore to set a value before break out
                Play_data.qualityIndex = i;
                Play_playingUrl = Play_data.qualities[i].url;
            }
        }

        Play_data.quality = Play_data.qualities[Play_data.qualityIndex].id;
        Play_data.qualityPlaying = Play_data.quality;

        Play_SetHtmlQuality('stream_quality');

        Play_state = Play_STATE_PLAYING;
        Play_onPlayer();
        //Play_PannelEndStart(1);
    }

    function Play_onPlayer() {
        if (Main_isDebug) console.log('Play_onPlayer:', '\n' + '\n"' + Play_playingUrl + '"\n');

        if (Main_IsNotBrowser && Play_isOn) {
            if (Play_data.quality.indexOf("Auto") !== -1 || PlayExtra_PicturePicture) Android.StartAuto(1, 0);
            else Android.startVideo(Play_playingUrl, 1);
        }

        if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
        Play_SetFullScreen(Play_isFullScreen);
        Play_Playing = true;
        ChatLive_Init(0);
    }

    function Play_SetHtmlQuality(element) {
        if (!Play_data.qualities[Play_data.qualityIndex] || !Play_data.qualities[Play_data.qualityIndex].hasOwnProperty('id')) return;

        Play_data.quality = Play_data.qualities[Play_data.qualityIndex].id;

        var quality_string = '';

        if (Play_data.quality.indexOf('source') !== -1) quality_string = Play_data.quality.replace("source", STR_SOURCE);
        else quality_string = Play_data.quality;

        quality_string += Play_data.quality.indexOf('Auto') === -1 ? Play_data.qualities[Play_data.qualityIndex].band + Play_data.qualities[Play_data.qualityIndex].codec : "";

        Main_innerHTML(element, quality_string);
    }

    //called by android PlayerActivity
    function Play_PlayerCheck(mwhocall) { // Called only by JAVA
        if (document.hidden || !navigator.onLine) Play_EndStart(false, mwhocall);
        else if (mwhocall === 1) {

            if ((Play_data.qualityIndex < Play_getQualitiesCount() - 1)) {
                Play_data.qualityIndex++;
                Play_qualityDisplay(Play_getQualitiesCount, Play_data.qualityIndex, Play_SetHtmlQuality);
                Play_qualityChanged();
            } else Play_EndStart(false, 1);

        } else if (mwhocall === 2) {

            if ((PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1)) {
                PlayVod_qualityIndex++;
                Main_values.vodOffset = Android.getsavedtime() / 1000;
                Play_qualityDisplay(PlayVod_getQualitiesCount, PlayVod_qualityIndex, PlayVod_SetHtmlQuality);
                PlayVod_qualityChanged();
            } else Play_EndStart(false, 2);

        } else if (mwhocall === 3) {

            if ((PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1)) {
                PlayClip_qualityIndex++;
                Play_qualityDisplay(PlayClip_getQualitiesCount, PlayClip_qualityIndex, PlayClip_SetHtmlQuality);
                PlayClip_qualityChanged();
            } else Play_EndStart(false, 3);

        }
    }

    function Play_EndStart(hosting, PlayVodClip) {
        Main_values.Play_isHost = hosting;
        Play_EndSet(PlayVodClip);
        Play_PlayEndStart(PlayVodClip);
    }

    function Play_isNotplaying() {
        if (Main_IsNotBrowser) return !Android.getPlaybackState();
        return false;
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
        time = Math.round(time);

        seconds = Play_lessthanten(parseInt(time) % 60);

        time = Math.floor(time / 60);
        minutes = Play_lessthanten(time % 60);

        time = Math.floor(time / 60);
        hours = Play_lessthanten(time);

        //final time 00:00 or 00:00:00
        return (!time) ? (minutes + ":" + seconds) : (hours + ":" + minutes + ":" + seconds);
    }

    function Play_timeMs(time) {
        return Play_timeS(parseInt(time / 1000));
    }

    function Play_streamLiveAt(time) { //time in '2017-10-27T13:27:27Z'
        return Play_timeMs((new Date().getTime()) - (new Date(time).getTime()));
    }

    function Play_timeDay(time) {
        var minutes, hours, days;

        time = Math.floor(parseInt(time / 1000) / 60);
        minutes = time % 60;

        time = Math.floor(time / 60);
        hours = time % 24;

        days = Math.floor(time / 24);

        //final time 0m or 23h 59m or 1d 23h 59m
        return (days ? days + 'd ' : '') + (hours ? hours + 'h ' : '') + minutes + "m";
    }

    function Play_shutdownStream() {
        if (Play_isOn) {
            Play_PreshutdownStream(true);
            Play_data.qualities = [];
            Main_values.Play_WasPlaying = 0;
            Play_exitMain();
        }
    }

    function Play_PreshutdownStream(closePlayer) {
        if (Main_IsNotBrowser) {
            if (closePlayer) {
                //We are closing the player on error or on end
                Android.mClearSmallPlayer();
                Android.stopVideo(1);
            }
        }

        if (closePlayer) {
            Play_isOn = false;
            if (Play_MultiEnable) Play_controls[Play_MultiStream].enterKey(false);
        }

        if (!Play_isEndDialogVisible() || closePlayer) UserLiveFeed_Hide();

        Play_ClearPlay(closePlayer);
        Play_ClearPlayer();
    }

    function Play_exitMain() {

        if (AddUser_UserIsSet()) {
            AddCode_IsFallowing = false;
            Play_setFallow();
        } else Play_hideFallow();

        PlayExtra_HideChat();
        UserLiveFeed_PreventHide = false;
        PlayVod_ProgresBarrUpdate(0, 0);
        Main_ShowElement('scene1');
        Main_HideElement('scene2');
        Main_ReStartScreens();
    }

    function Play_ClearPlayer() {
        window.clearInterval(Play_ShowPanelStatusId);
        Play_hidePanel();
        Play_HideWarningDialog();
        if (!Play_EndDialogEnter) Play_HideEndDialog();
        Main_updateclock();
        Play_IncrementView = '';

        if (Play_data.qualities[1] && Play_data.qualityIndex === (Play_getQualitiesCount() - 1)) {
            if (Play_data.qualities[1].hasOwnProperty('id')) {
                Play_data.quality = Play_data.qualities[1].id;
                Play_data.qualityPlaying = Play_data.quality;
            }
        }

        if (PlayVod_qualities[1] && PlayVod_qualityIndex === (PlayVod_getQualitiesCount() - 1)) {
            if (PlayVod_qualities[1].hasOwnProperty('id')) {
                PlayVod_quality = PlayVod_qualities[1].id;
                PlayVod_qualityPlaying = PlayVod_quality;
            }
        }

        if (PlayClip_qualities[0] && PlayClip_qualityIndex === (PlayClip_getQualitiesCount() - 1)) {
            if (PlayClip_qualities[0].hasOwnProperty('id')) {
                PlayClip_quality = PlayClip_qualities[0].id;
                PlayClip_qualityPlaying = PlayClip_quality;
            }
        }

    }

    function Play_ClearPlay(clearChat) {
        Play_Playing = false;
        document.body.removeEventListener("keydown", Play_handleKeyDown);
        if (clearChat) ChatLive_Clear(0);
        window.clearInterval(Play_streamInfoTimerId);
        Play_IsWarning = false;
    }

    function Play_hideFallow() {
        Play_controls[Play_controlsFallow].setLable(STR_NOKEY);
        AddCode_IsFallowing = false;
    }

    function Play_showBufferDialog() {
        if (Main_IsNotBrowser) Android.mshowLoading(true);
        else Main_ShowElement('dialog_loading_play');
    }

    function Play_HideBufferDialog() {
        if (Main_IsNotBrowser) Android.mshowLoading(false);
        else Main_HideElement('dialog_loading_play');
    }

    var Play_showWarningDialogId;

    function Play_showWarningDialog(text, timeout) {
        Main_innerHTML("dialog_warning_play_text", text);
        Main_ShowElement('dialog_warning_play');

        window.clearTimeout(Play_showWarningDialogId);
        if (timeout) {
            Play_showWarningDialogId = window.setTimeout(function() {
                Play_IsWarning = false;
                Play_HideWarningDialog();
            }, timeout);
        }
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

    function Play_isPanelShown() {
        return document.getElementById("scene_channel_panel").style.opacity === '1';
    }

    function Play_hidePanel() {
        //return;//return;
        Play_clearHidePanel();
        Play_ForceHidePannel();
        Play_data.quality = Play_data.qualityPlaying;
        window.clearInterval(PlayVod_RefreshProgressBarrID);
    }

    function Play_ForceShowPannel() {
        document.getElementById("scene_channel_panel").style.opacity = "1";
        if (!Play_Status_Always_On) Main_ShowElement('playsideinfo');
        else Main_RemoveClass('playsideinfo', 'playsideinfofocus');
    }

    function Play_ForceHidePannel() {
        document.getElementById("scene_channel_panel").style.opacity = "0";
        if (!Play_Status_Always_On) Main_HideElement('playsideinfo');
        else Main_AddClass('playsideinfo', 'playsideinfofocus');
    }

    var Play_ShowPanelStatusId;

    function Play_ShowPanelStatus(mwhocall) {
        window.clearInterval(Play_ShowPanelStatusId);
        if (Play_Status_Always_On) {

            if (Main_IsNotBrowser) {
                Play_ShowPanelStatusId = window.setInterval(function() {
                    Play_UpdateStatus(mwhocall);
                }, 1000);
            } else Play_VideoStatusTest();

            Main_ShowElement('playsideinfo');
            Main_AddClass('playsideinfo', 'playsideinfofocus');
        } else {
            Main_HideElement('playsideinfo');
            Main_RemoveClass('playsideinfo', 'playsideinfofocus');
        }
    }

    function Play_UpdateStatus(mwhocall) {
        var isLive = mwhocall === 1;

        if (isLive && Play_data.qualityPlaying.indexOf("Auto") !== -1) Play_getVideoQuality(false, Play_SetHtmlQuality);
        else if (mwhocall === 2 && PlayVod_qualityPlaying.indexOf("Auto") !== -1) Play_getVideoQuality(false, PlayVod_SetHtmlQuality);

        Play_VideoStatus(isLive);
    }

    function Play_showPanel() {
        PlayVod_IconsBottonResetFocus();
        Play_qualityIndexReset();
        Play_qualityDisplay(Play_getQualitiesCount, Play_data.qualityIndex, Play_SetHtmlQuality);
        PlayExtra_ResetSpeed();
        PlayExtra_ResetAudio();
        if (Play_data.qualityPlaying.indexOf("Auto") === -1) Play_SetHtmlQuality('stream_quality');
        Play_RefreshWatchingtime();
        window.clearInterval(PlayVod_RefreshProgressBarrID);
        PlayVod_RefreshProgressBarrID = window.setInterval(Play_RefreshWatchingtime, 1000);
        Play_clock();
        Play_CleanHideExit();
        Play_ForceShowPannel();
        Play_clearHidePanel();
        Play_setHidePanel();
    }

    function Play_RefreshWatchingtime() {
        Main_innerHTML("stream_watching_time", "," + STR_SPACE + STR_SPACE +
            STR_WATCHING + Play_timeMs((new Date().getTime()) - (Play_data.watching_time)));

        Main_innerHTML("stream_live_time", STR_SINCE +
            (('00:00').indexOf(Play_created) !== -1 ? '00:00' : Play_streamLiveAt(Play_created)));

        if (!Play_Status_Always_On) {
            if (Main_IsNotBrowser) {
                if (Play_data.qualityPlaying.indexOf("Auto") !== -1) Play_getVideoQuality(false, Play_SetHtmlQuality);
                Play_VideoStatus(true);
            } else Play_VideoStatusTest();
        }
    }

    function Play_VideoStatusTest() {
        Main_innerHTML("stream_status", STR_NET_SPEED + STR_SPACE + STR_SPACE + STR_SPACE + Play_getMbps(101 * 1000000) + ' (150.00 Avg) Mbps' +
            STR_BR + STR_NET_ACT + Play_getMbps(45 * 1000000) + ' (150.00 Avg) Mbps' + STR_BR + STR_DROOPED_FRAMES + '1000 (1000 Today)' +
            STR_BR + STR_BUFFER_HEALT + Play_getBuffer(100.37 * 1000) +
            STR_BR + STR_LATENCY + Play_getBuffer(100.37 * 1000));
    }

    function Play_VideoStatus(showLatency) {
        var value = Android.getVideoStatus().split(',');

        Main_innerHTML("stream_status", STR_NET_SPEED + STR_SPACE + STR_SPACE + STR_SPACE + Play_getMbps(value[2]) +
            " (" + value[3] + STR_AVGMB + STR_BR + STR_NET_ACT + Play_getMbps(value[4]) + " (" +
            value[5] + STR_AVGMB + STR_BR + STR_DROOPED_FRAMES + value[0] + " (" + value[1] + STR_TODAY +
            STR_BR + STR_BUFFER_HEALT + Play_getBuffer(value[6]) +
            (showLatency ? (STR_BR + STR_LATENCY + Play_getBuffer(value[7])) : '') +
            (Play_MultiEnable ? (STR_BR + STR_WATCHING + Play_timeMs((new Date().getTime()) - (Play_data.watching_time))) : ''));
    }

    function Play_getMbps(value) {
        value = (parseInt(value) / 1000000).toFixed(2);

        return (parseInt(value) < 10 ? (STR_SPACE + STR_SPACE + value) : value);
    }

    function Play_getBuffer(value) {
        value = (value > 0 ? (value / 1000).toFixed(2) : 0);

        return (parseInt(value) < 10 ? (STR_SPACE + value) : value) + " s";
    }

    function Play_getVideoQuality(forceCallback, callback) {
        var value = Android.getVideoQuality();

        if (value === null || value === undefined || forceCallback) {
            callback('stream_quality');
            return;
        }

        value = value.split(',');

        for (var i = 0; i < value.length; i++) {
            value[i] = (value[i] !== null && value[i] !== 'null' && value[i] !== undefined) ? value[i] : '';
        }

        Main_innerHTML("stream_quality", value[0] + value[1] + " | Auto" + Play_extractBand(value[2]) + " | " + value[3]);
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
        Play_ChatBackgroundChange(false);
        Main_ShowElement('chat_container');

        Play_controls[Play_controlsChat].setLable();
    }

    function Play_hideChat() {
        Main_HideElement('chat_container');
        Play_controls[Play_controlsChat].setLable();
    }

    function Play_isChatShown() {
        return Main_isElementShowing('chat_container');
    }

    function Play_getQualitiesCount() {
        return Play_data.qualities.length;
    }

    function Play_ChatSize(showDialog) {
        if (Play_ChatSizeValue > Play_MaxChatSizeValue) Play_ChatSizeValue = Play_MaxChatSizeValue;
        Play_chat_container.style.height = Play_ChatSizeVal[Play_ChatSizeValue].containerHeight + '%';
        document.getElementById("play_chat_dialog").style.marginTop = Play_ChatSizeVal[Play_ChatSizeValue].dialogTop + '%';
        Play_ChatPosition();

        if (showDialog) Play_showChatBackgroundDialog(STR_SIZE + Play_ChatSizeVal[Play_ChatSizeValue].percentage);

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
        var bool = (Play_ChatSizeValue === Play_MaxChatSizeValue);

        if (Play_ChatPositions < 0) Play_ChatPositions = (bool ? 2 : 7);
        else if (Play_ChatPositions > (bool ? 2 : 7)) Play_ChatPositions = 0;

        Play_chat_container.style.top = (bool ? 0.2 : (Play_ChatPositionVal[Play_ChatPositions].top + Play_ChatPositionVal[Play_ChatPositions].sizeOffset[Play_ChatSizeValue])) + '%';

        Play_chat_container.style.left =
            Play_ChatPositionVal[Play_ChatPositions + (bool ? 2 : 0)].left + '%';

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
            ChatLive_Playing = true;
            ChatLive_MessagesRunAfterPause();
            Play_HideBufferDialog();

            Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i></div>');

            if (Play_isPanelShown()) {
                if (PlayVodClip === 1) Play_hidePanel();
                else if (PlayVodClip === 2) PlayVod_hidePanel();
                else if (PlayVodClip === 3) PlayClip_hidePanel();
            }

            if (Main_IsNotBrowser) Android.play(true);
        } else {
            ChatLive_Playing = false;
            Play_HideBufferDialog();

            Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-play-1"></i></div>');

            if (Main_IsNotBrowser) Android.play(false);
        }
    }

    function Play_IconsResetFocus() {
        Play_IconsRemoveFocus();
        Play_Panelcounter = Play_controlsDefault;
        Play_IconsAddFocus();
    }

    function Play_PrepareshowEndDialog(PlayVodClip) {
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
        if (PlayVodClip === 3 && PlayClip_HasNext && (PlayClip_All || PlayClip_All_Forced)) {
            Play_EndIconsRemoveFocus();
            Play_Endcounter = -1;
        }
        Play_EndIconsAddFocus();
    }

    function Play_showEndDialog() {
        Main_ShowElement('dialog_end_stream');
        UserLiveFeed_SetHoldUp();
        Play_EndFocus = true;
        UserLiveFeed_PreventHide = true;
        UserLiveFeed_clearHideFeed();
        UserLiveFeed_ShowFeed();
        Main_values.Play_WasPlaying = 0;
        UserLiveFeed_FeedRemoveFocus(UserLiveFeed_FeedPosX);
        Main_SaveValues();
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
        if (PlayVodClip === 1) Play_DialogEndText = Play_data.data[1] + ' ' + STR_LIVE;
        else if (PlayVodClip === 2) Play_DialogEndText = Main_values.Main_selectedChannelDisplayname + STR_VIDEO;
        else if (PlayVodClip === 3) Play_DialogEndText = Main_values.Main_selectedChannelDisplayname + STR_CLIP;

        if (Play_EndTextCounter === -2) { //disable
            Play_state = Play_STATE_PLAYING;
            PlayVod_state = Play_STATE_PLAYING;
            PlayClip_state = PlayClip_STATE_PLAYING;
            Play_EndTextClear();
            return;
        }

        Main_innerHTML("dialog_end_stream_text", Play_DialogEndText + STR_IS_OFFLINE + STR_BR +
            ((PlayVodClip === 3 && PlayClip_HasNext && (PlayClip_All || PlayClip_All_Forced)) ? STR_PLAY_NEXT_IN : STR_STREAM_END) + Play_EndTextCounter + '...');

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

                if (PlayVodClip === 1) {
                    PlayExtra_PicturePicture = false;
                    PlayExtra_data.data[6] = '';
                    Play_shutdownStream();
                } else if (PlayVodClip === 2) PlayVod_shutdownStream();
                else if (PlayVodClip === 3) {
                    if (PlayClip_HasNext && (PlayClip_All || PlayClip_All_Forced) && !document.hidden) PlayClip_PlayNext();
                    else PlayClip_shutdownStream();
                }

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
        if (Play_Endcounter === -1 && PlayClip_HasNext) PlayClip_PlayNext();
        else if (!Play_Endcounter) {
            if (PlayVodClip === 2) {
                if (!PlayVod_qualities.length) {
                    canhide = false;
                    Play_showWarningDialog(STR_CLIP_FAIL, 2000);
                } else {
                    PlayVod_replay = true;
                    PlayVod_Start();
                    PlayVod_currentTime = 0;
                    Chat_offset = 0;
                    Chat_Init();
                }
            } else if (PlayVodClip === 3) {
                if (!PlayClip_qualities.length) {
                    canhide = false;
                    Play_showWarningDialog(STR_CLIP_FAIL, 2000);
                } else {
                    PlayClip_replayOrNext = true;
                    PlayClip_replay = true;
                    PlayClip_Start();
                }
            }
        } else if (Play_Endcounter === 1) {
            if (Main_values.Play_isHost) {
                Play_data.DisplaynameHost = Play_data.data[1] + STR_USER_HOSTING;
                Play_data.data[6] = Play_TargetHost.target_login;
                Play_data.data[1] = Play_TargetHost.target_display_name;
                Play_data.DisplaynameHost = Play_data.DisplaynameHost + Play_data.data[1];
                Android.play(false);
                Play_PreshutdownStream(false);

                document.body.addEventListener("keydown", Play_handleKeyDown, false);

                Play_data.data[14] = Play_TargetHost.target_id;
                Main_ready(Play_Start);
            } else {
                PlayClip_OpenVod();
                if (!PlayClip_HasVOD) canhide = false;
            }
        } else if (Play_Endcounter === 2) Play_OpenChannel(PlayVodClip);
        else if (Play_Endcounter === 3) {
            Play_OpenGame(PlayVodClip);
            if (Play_data.data[3] === '') canhide = false;
        }

        if (canhide) {
            Play_HideEndDialog();
            UserLiveFeed_Hide();
            UserLiveFeed_PreventHide = false;
        }
        Play_EndDialogEnter = 0;
    }

    function Play_EndSet(PlayVodClip) {
        if (!PlayVodClip) { // Play is hosting
            Play_EndIconsRemoveFocus();
            Play_Endcounter = 1;
            Play_EndIconsAddFocus();
            document.getElementById('dialog_end_-1').style.display = 'none';
            document.getElementById('dialog_end_0').style.display = 'none';
            document.getElementById('dialog_end_1').style.display = 'inline-block';
            Main_textContent("dialog_end_vod_text", STR_OPEN_HOST);

            Play_EndTextsReset();
            Main_innerHTML("end_channel_name_text", Play_data.data[1]);
            Main_innerHTML("end_vod_title_text", Play_data.data[1] + STR_IS_NOW + STR_USER_HOSTING + Play_TargetHost.target_display_name);
        } else if (PlayVodClip === 1) { // play
            Play_EndIconsRemoveFocus();
            Play_Endcounter = 2;
            Play_EndIconsAddFocus();
            document.getElementById('dialog_end_-1').style.display = 'none';
            document.getElementById('dialog_end_0').style.display = 'none';
            document.getElementById('dialog_end_1').style.display = 'none';

            Play_EndTextsReset();
            Main_innerHTML("end_channel_name_text", Play_data.data[1]);
        } else if (PlayVodClip === 2) { // vod
            Play_EndIconsResetFocus();
            document.getElementById('dialog_end_-1').style.display = 'none';
            document.getElementById('dialog_end_0').style.display = 'inline-block';
            document.getElementById('dialog_end_1').style.display = 'none';

            Main_innerHTML("end_replay_name_text", Main_values.Main_selectedChannelDisplayname);
            Main_innerHTML("end_replay_title_text", ChannelVod_title);

            Main_textContent("end_vod_name_text", '');
            Main_textContent("end_vod_title_text", '');

            Main_innerHTML("end_channel_name_text", Main_values.Main_selectedChannelDisplayname);
        } else if (PlayVodClip === 3) { // clip
            Play_EndIconsResetFocus();
            document.getElementById('dialog_end_-1').style.display = PlayClip_HasNext ? 'inline-block' : 'none';
            document.getElementById('dialog_end_0').style.display = 'inline-block';
            document.getElementById('dialog_end_1').style.display = 'inline-block';
            Main_textContent("dialog_end_vod_text", PlayClip_HasVOD ? STR_OPEN_BROADCAST : STR_NO_BROADCAST);

            Main_innerHTML("end_replay_name_text", Main_values.Main_selectedChannelDisplayname);
            Main_innerHTML("end_replay_title_text", ChannelClip_title);

            Main_innerHTML("end_vod_name_text", Main_values.Main_selectedChannelDisplayname);

            Main_innerHTML("end_channel_name_text", Main_values.Main_selectedChannelDisplayname);
        }
        Main_textContent("end_game_name_text", Play_data.data[3]);
    }

    function Play_EndTextsReset() {
        Main_textContent("end_replay_name_text", '');
        Main_textContent("end_replay_title_text", '');
        Main_textContent("end_vod_name_text", '');
        Main_textContent("end_vod_title_text", '');
    }

    function Play_OpenChannel(PlayVodClip) {
        if (!Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) {
            Main_values.Main_BeforeChannel = (Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_aGame) ? Main_values.Main_BeforeAgame : Main_values.Main_Go;
            Main_values.Main_BeforeChannelisSet = true;
        }

        Main_ExitCurrent(Main_values.Main_Go);
        Main_values.Main_Go = Main_ChannelContent;

        if (PlayVodClip === 1) {
            if (Play_MultiEnable) {
                Play_data = JSON.parse(JSON.stringify(Play_MultiArray[Play_MultiFirstAvaileble()]));
            }
            Play_ClearPP();
            Main_values.Main_selectedChannel_id = Play_data.data[14];
            Main_values.Main_selectedChannel = Play_data.data[6];
            Main_values.Main_selectedChannelDisplayname = Play_data.data[1];
            ChannelContent_UserChannels = AddCode_IsFallowing;
            Play_shutdownStream();
        } else if (PlayVodClip === 2) PlayVod_shutdownStream();
        else if (PlayVodClip === 3) PlayClip_shutdownStream();
    }

    function Play_OpenSearch(PlayVodClip) {
        if (PlayVodClip === 1) {
            Play_ClearPP();
            Play_PreshutdownStream(true);
        } else if (PlayVodClip === 2) PlayVod_PreshutdownStream(true);
        else if (PlayVodClip === 3) PlayClip_PreshutdownStream();

        Main_values.Play_WasPlaying = 0;
        PlayVod_ProgresBarrUpdate(0, 0);
        Main_ShowElement('scene1');
        Main_HideElement('scene2');
        document.body.addEventListener("keyup", Main_handleKeyUp, false);
        Main_OpenSearch();
    }

    function Play_OpenGame(PlayVodClip) {
        if (Play_data.data[3] === '') {
            Play_clearHidePanel();
            Play_IsWarning = true;
            Play_showWarningDialog(STR_NO_GAME, 2000);
            return;
        }

        if (!Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_AGameVod && Main_values.Main_Go !== Main_AGameClip) {
            Main_values.Main_BeforeAgame = (Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelContent && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) ? Main_values.Main_BeforeChannel : Main_values.Main_Go;
            Main_values.Main_BeforeAgameisSet = true;
        }

        Main_ExitCurrent(Main_values.Main_Go);
        Main_values.Main_Go = Main_aGame;

        if (Play_MultiEnable) {
            Play_data = JSON.parse(JSON.stringify(Play_MultiArray[Play_MultiFirstAvaileble()]));
        }
        Main_values.Main_gameSelected = Play_data.data[3];

        Play_hideChat();
        if (PlayVodClip === 1) {
            Play_ClearPP();
            Play_shutdownStream();
        } else if (PlayVodClip === 2) PlayVod_shutdownStream();
        else if (PlayVodClip === 3) PlayClip_shutdownStream();
    }

    function Play_ClearPP() {
        if (Main_IsNotBrowser) {
            if (!Play_isFullScreen) {
                Play_isFullScreen = !Play_isFullScreen;
                Play_SetFullScreen(Play_isFullScreen);
            }
        }

        PlayExtra_PicturePicture = false;
        PlayExtra_data.data[6] = '';
        Play_hideChat();
    }

    function Play_FallowUnfallow() {
        if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
            if (AddCode_IsFallowing) AddCode_UnFallow();
            else AddCode_Fallow();
        } else {
            Play_showWarningDialog(STR_NOKEY_WARN, 2000);
            Play_IsWarning = true;
        }
    }

    function Play_qualityDisplay(getQualitiesCount, qualityIndex, callback) {
        var doc_up = document.getElementById("control_arrow_up_" + Play_controlsQuality),
            doc_down = document.getElementById("control_arrow_down" + Play_controlsQuality);

        if (getQualitiesCount() === 1) {
            doc_up.classList.add('hide');
            doc_down.classList.add('hide');
        } else if (!qualityIndex) {
            doc_up.classList.remove('hide');
            doc_down.classList.remove('hide');

            doc_up.style.opacity = "0.2";
            doc_down.style.opacity = "1";
        } else if (qualityIndex === getQualitiesCount() - 1) {
            doc_up.classList.remove('hide');
            doc_down.classList.remove('hide');

            doc_up.style.opacity = "1";
            doc_down.style.opacity = "0.2";
        } else {
            doc_up.classList.remove('hide');
            doc_down.classList.remove('hide');

            doc_up.style.opacity = "1";
            doc_down.style.opacity = "1";
        }

        callback('controls_name_' + Play_controlsQuality);
    }

    function Play_qualityIndexReset() {
        Play_data.qualityIndex = 0;
        for (var i = 0; i < Play_getQualitiesCount(); i++) {
            if (Play_data.qualities[i].id === Play_data.quality) {
                Play_data.qualityIndex = i;
                break;
            } else if (Play_data.qualities[i].id.indexOf(Play_data.quality) !== -1) { //make shore to set a value before break out
                Play_data.qualityIndex = i;
            }
        }
    }

    //called by android PlayerActivity
    function Play_PannelEndStart(PlayVodClip) { // Called only by JAVA
        if (PlayVodClip === 1) { //live
            PlayExtra_PicturePicture = false;
            PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
            Play_CheckHostStart();
        } else {
            Play_PlayEndStart(PlayVodClip);
        }
    }

    function Play_PlayEndStart(PlayVodClip) {
        Play_PrepareshowEndDialog(PlayVodClip);
        Play_EndTextCounter = (!Play_EndSettingsCounter ? -2 : Play_EndSettingsCounter);

        Play_EndText(PlayVodClip);
        Play_showEndDialog();
    }

    function Play_CheckHostStart(error_410) {
        if (error_410) {
            Play_IsWarning = true;
            Play_showWarningDialog(STR_410_ERROR);
        }

        Play_showBufferDialog();
        Play_state = -1;
        Play_loadingDataTry = 0;
        Play_loadingDataTimeout = 2000;
        ChatLive_Clear(0);
        ChatLive_Clear(1);
        window.clearInterval(Play_streamInfoTimerId);
        Play_loadDataCheckHost();
    }

    function Play_loadDataCheckHost() {
        var theUrl = 'https://tmi.twitch.tv/hosts?include_logins=1&host=' +
            encodeURIComponent(Play_data.data[14]);
        BasehttpGet(theUrl, Play_loadingDataTimeout, 1, null, Play_CheckHost, Play_loadDataCheckHostError);
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
            Play_showWarningDialog(Play_data.data[1] + STR_IS_NOW + STR_USER_HOSTING + Play_TargetHost.target_display_name, 4000);

            Play_EndSet(0);
            Main_values.Play_isHost = true;
        } else {
            Play_EndSet(1);
            Main_values.Play_isHost = false;
        }

        Play_PlayEndStart(1);
    }

    function Play_UpdateDuration(mwhocall, duration) { // Called only by JAVA
        if (duration > 0) {
            if (mwhocall === 2) PlayVod_UpdateDuration(duration);
            else if (mwhocall === 3) PlayClip_UpdateDuration(duration);
        }
    }

    function Play_setFallow() {
        Play_controls[Play_controlsFallow].setLable(AddCode_IsFallowing ? STR_FALLOWING : STR_FALLOW, AddCode_IsFallowing);
    }

    function Play_KeyReturn(is_vod) {
        if (Play_isEndDialogVisible()) Play_EndTextClear();

        if (Play_isEndDialogVisible() && !Play_EndFocus) {
            Play_EndFocus = true;
            UserLiveFeed_FeedRemoveFocus(UserLiveFeed_FeedPosX);
            Play_EndIconsAddFocus();
        } else if (Play_isEndDialogVisible() && !Play_ExitDialogVisible() && !Play_SingleClickExit) Play_showExitDialog();
        else if (Play_MultiDialogVisible()) Play_HideMultiDialog();
        else if (UserLiveFeed_isFeedShow() && !Play_isEndDialogVisible()) UserLiveFeed_Hide();
        else if (Play_isPanelShown() && !Play_isVodDialogVisible()) {
            if (is_vod) PlayVod_hidePanel();
            else Play_hidePanel();
        } else {
            if (Play_isVodDialogVisible() && Play_ExitDialogVisible()) {
                Play_HideVodDialog();
                PlayVod_PreshutdownStream(false);
                Play_exitMain();
            } else if (Play_ExitDialogVisible() || Play_SingleClickExit) {
                if (Play_MultiEnable) Play_controls[Play_MultiStream].enterKey();
                else if (PlayExtra_PicturePicture) Play_CloseSmall();
                else {
                    Play_CleanHideExit();
                    Play_hideChat();
                    if (is_vod) PlayVod_shutdownStream();
                    else Play_shutdownStream();
                }
            } else if (Play_WarningDialogVisible()) {
                Play_HideWarningDialog();
                Play_showExitDialog();
            } else {
                var text = PlayExtra_PicturePicture ? STR_EXIT_AGAIN_PICTURE : STR_EXIT_AGAIN;
                text = Play_MultiEnable ? STR_EXIT_AGAIN_MULTI : text;
                Main_textContent("play_dialog_exit_text", text);
                Play_showExitDialog();
            }
        }
    }

    function Play_CloseBigAndSwich(error_410) {
        Play_HideBufferDialog();
        Play_state = Play_STATE_PLAYING;

        if (!Play_isFullScreen) {
            Play_isFullScreen = !Play_isFullScreen;
            Play_SetFullScreen(Play_isFullScreen);
        }

        Play_showWarningDialog(error_410 ? STR_410_ERROR :
            Play_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE,
            2500);

        PlayExtra_PicturePicture = false;
        if (PlayExtra_data.data.length > 0) {
            if (Main_IsNotBrowser) Android.mSwitchPlayer();
            PlayExtra_SwitchPlayer();
            if (Main_IsNotBrowser) Android.mClearSmallPlayer();

            Play_CleanHideExit();
        } else {
            if (Main_IsNotBrowser) Android.mClearSmallPlayer();
            Play_CheckHostStart(error_410);
        }
        PlayExtra_UnSetPanel();
    }

    function Play_CloseSmall() {
        if (Main_IsNotBrowser) {
            Android.mClearSmallPlayer();
            if (!Play_isFullScreen) {
                Play_isFullScreen = !Play_isFullScreen;
                Play_SetFullScreen(Play_isFullScreen);
            }
        }
        PlayExtra_updateStreamInfo();
        PlayExtra_PicturePicture = false;
        PlayExtra_data.data[6] = '';
        PlayExtra_UnSetPanel();
        Play_CleanHideExit();
    }

    function Play_handleKeyUp(e) {
        if (e.keyCode === KEY_ENTER) {
            Play_handleKeyUpClear();
            if (!PlayExtra_clear) Play_OpenLiveFeedCheck();
        } else if (e.keyCode === KEY_UP) {
            Play_handleKeyUpEndClear();
            if (!Play_EndUpclear) {
                if (Play_isEndDialogVisible()) Play_EndDialogUpDown(-1);
                else UserLiveFeed_KeyUpDown(-1);
            }
        }
    }

    function Play_EndDialogUpDown(adder) {

        Play_EndTextClear();
        if (UserLiveFeed_loadingData) return;

        if (Play_EndFocus) {
            Play_EndFocus = false;
            Play_EndIconsRemoveFocus();
            UserLiveFeed_FeedAddFocus(false, UserLiveFeed_FeedPosX);
        } else UserLiveFeed_KeyUpDown(adder);
    }

    function Play_OpenLiveFeedCheck() {
        if (Play_CheckLiveThumb()) Play_OpenLiveFeed();
    }

    function Play_OpenLiveFeed() {
        Play_SavePlayData();
        Play_PreshutdownStream(false);

        Main_values.Play_isHost = false;
        Play_UserLiveFeedPressed = true;
        Main_OpenLiveStream(UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX], UserLiveFeed_ids, Play_handleKeyDown);
    }

    function Play_keyUpEnd() {
        Play_EndUpclear = true;
        UserLiveFeed_FeedRefresh(Play_EndFocus);
    }

    function Play_handleKeyUpEndClear() {
        window.clearTimeout(Play_EndUpclearID);
        document.body.removeEventListener("keyup", Play_handleKeyUp);
        document.body.addEventListener("keydown", Play_EndUpclearCalback, false);
    }

    function Play_RestorePlayData(error_410) {
        Play_HideBufferDialog();
        Play_state = Play_STATE_PLAYING;

        Play_showWarningDialog(error_410 ? STR_410_ERROR :
            Play_data.data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE,
            2000);

        Play_RestorePlayDataValues();

        Main_SaveValues();
        Play_UpdateMainStream(true);
    }

    function Play_SavePlayData() {
        Play_data_old = JSON.parse(JSON.stringify(Play_data));
    }

    function Play_RestorePlayDataValues() {
        Play_data = JSON.parse(JSON.stringify(Play_data_old));
        Play_data_old = JSON.parse(JSON.stringify(Play_data_base));
    }

    function Play_handleKeyUpClear() {
        window.clearTimeout(PlayExtra_KeyEnterID);
        document.body.removeEventListener("keyup", Play_handleKeyUp);
        if (!Main_isElementShowing('dialog_os')) document.body.addEventListener("keydown", Play_handleKeyDown, false);
    }

    function Play_Exit() {
        Play_CleanHideExit();
        Play_hideChat();
        PlayExtra_PicturePicture = false;
        PlayExtra_PicturePicture = false;
        PlayExtra_data.data[6] = '';
        Play_shutdownStream();
    }

    function Play_Multi_SetPanel() {
        document.getElementById('controls_' + Play_controlsChatSide).style.display = 'none';
        document.getElementById('controls_' + Play_controlsQuality).style.display = 'none';
        document.getElementById('controls_' + Play_controlsQualityMini).style.display = 'none';
        document.getElementById('controls_' + Play_controlsAudio).style.display = 'none';
        document.getElementById('controls_' + Play_controlsQualityMulti).style.display = '';
        document.getElementById('controls_' + Play_controlsAudioMulti).style.display = '';
        UserLiveFeed_SetMulti();
        ChatLive_Clear(1);
        PlayExtra_HideChat();
        Main_HideElement('stream_info');
        Main_ShowElement('dialog_multi_help');
        Main_ShowElement('stream_info_multi');
    }

    function Play_Multi_UnSetPanel(shutdown) {
        document.getElementById('controls_' + Play_controlsAudioMulti).style.display = 'none';
        document.getElementById('controls_' + Play_controlsChatSide).style.display = '';
        document.getElementById('controls_' + Play_controlsQuality).style.display = '';
        document.getElementById('controls_' + Play_controlsAudio).style.display = 'none';
        document.getElementById('controls_' + Play_controlsQualityMini).style.display = 'none';
        document.getElementById('controls_' + Play_controlsQualityMulti).style.display = 'none';
        UserLiveFeed_SetFeedPicText();
        Main_ShowElement('stream_info');
        Main_HideElement('stream_info_multi');
        Main_HideElement('dialog_multi_help');

        for (var i = 0; i < 4; i++) Play_MultiInfoReset(i);

        if (Play_MultiArray[0].data.length > 0 && Play_MultiArray[1].data.length > 0) {
            if (PlayExtra_PicturePicture) {
                PlayExtra_data = JSON.parse(JSON.stringify(Play_MultiArray[1]));
                PlayExtra_SetPanel();
                Android.mSwitchPlayerAudio(Play_controls[Play_controlsAudio].defaultValue);
                if (!Play_isFullScreen) {
                    Main_innerHTML('chat_container2_name_text', STR_SPACE + PlayExtra_data.data[1] + STR_SPACE);
                    ChatLive_Init(1);
                    PlayExtra_ShowChat();
                    if (!Play_isChatShown()) {
                        Play_controls[Play_controlsChat].enterKey();
                        Play_showChat();
                        Play_ChatEnable = true;
                        Play_controls[Play_controlsChat].setLable();
                    }
                }
            }
        } else {
            if (!Play_isFullScreen) {
                Play_controls[Play_controlsChat].enterKey();
                Play_showChat();
                Play_ChatEnable = true;
                Play_controls[Play_controlsChat].setLable();
            }
            PlayExtra_PicturePicture = false;
        }

        //Check if main player is open if not check if one is so it can be main
        var First = Play_MultiFirstAvaileble();
        if (First !== null) {
            var name = Play_data.data[14];
            Play_data = JSON.parse(JSON.stringify(Play_MultiArray[First]));

            if (name !== Play_data.data[14] && First) {
                Play_Start();
                return;
            }

            Play_UpdateMainStream();

        } else if (shutdown) Play_shutdownStream();
    }

    function Play_MultiFirstAvaileble() {
        for (var i = 0; i < Play_MultiArray.length; i++) {
            if (Play_MultiArray[i].data.length > 0) return i;
        }
        return null;
    }

    function Play_UpdateMainStream(startChat) {
        if (!startChat) ChatLive_Init(0);

        //Restore info panel
        Main_innerHTML("stream_info_title", twemoji.parse(Play_data.data[2], false, true));
        Play_partnerIcon(Play_data.isHost ? Play_data.DisplaynameHost : Play_data.data[1], Play_data.data[10], true, Play_Lang);
        Main_textContent("stream_info_game", (Play_data.data[3] !== "" ? STR_PLAYING + Play_data.data[3] : ""));
        Main_innerHTML("stream_live_viewers", STR_SPACE + STR_FOR + Main_addCommas(Play_data.data[13]) + STR_SPACE + STR_VIEWER);
        Play_LoadLogo(document.getElementById('stream_info_icon'), IMG_404_BANNER);
        Play_LoadLogoSucess = true;
        Play_LoadLogo(document.getElementById('stream_info_icon'), Play_data.data[9]);
        Play_created = Play_data.data[12];
        Play_controls[Play_controlsChanelCont].setLable(Play_data.data[1]);
        Play_controls[Play_controlsGameCont].setLable(Play_data.data[3]);
        Main_innerHTML('chat_container_name_text', STR_SPACE + Play_data.data[1] + STR_SPACE);

        //Restore info panel from web
        Play_loadingInfoDataTry = 0;
        Play_updateStreamInfoStart();
    }

    function Play_MultiEnd(position) {
        Play_showWarningDialog(Play_MultiArray[position].data[1] + ' ' + STR_LIVE + STR_IS_OFFLINE, 2000);

        Play_MultiArray[position] = JSON.parse(JSON.stringify(Play_data_base));
        Play_MultiInfoReset(position);
        if (!Play_MultiHasOne()) {
            PlayExtra_PicturePicture = false;
            PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
            Play_CheckHostStart();
        }
    }

    function Play_MultiFirstClear() {
        for (var i = 0; i < Play_MultiArray.length; i++) {
            if (Play_MultiArray[i].data.length < 1) return i;
        }
        return 0;
    }

    function Play_MultiIsAlredyOPen(Id) {
        for (var i = 0; i < Play_MultiArray.length; i++) {
            if (Play_MultiArray[i].data.length > 0 && Play_MultiArray[i].data[14] === Id) {
                UserLiveFeed_ResetFeedId();
                return true;
            }
        }

        return false;
    }

    function Play_MultiIsFull() {
        return (Play_MultiArray[0].data.length > 0) &&
            (Play_MultiArray[1].data.length > 0) &&
            (Play_MultiArray[2].data.length > 0) &&
            (Play_MultiArray[3].data.length > 0);
    }

    function Play_MultiHasOne() {
        return (Play_MultiArray[0].data.length > 0) ||
            (Play_MultiArray[1].data.length > 0) ||
            (Play_MultiArray[2].data.length > 0) ||
            (Play_MultiArray[3].data.length > 0);
    }

    function Play_MultiStartPrestart(position) {
        var doc = Play_CheckLiveThumb();
        if (doc) {
            position = ((position || position === 0) ? position : Play_MultiFirstClear());
            if (!Play_MultiIsFull()) {
                if (position > 2) Main_HideElement('dialog_multi_help');
            } else {
                Main_HideElement('dialog_multi_help');
                Play_data_old = JSON.parse(JSON.stringify(Play_MultiArray[position]));
            }
            Play_MultiArray[position] = JSON.parse(JSON.stringify(Play_data_base));
            Play_MultiArray[position].data = doc;
            Play_MultiStart(
                position,
                Play_MultiArray[position].data[6],
                Play_MultiArray[position].data[1],
                0
            );
        }
    }

    function Play_MultiStart(pos, streamer, display_name, tryes) {
        var theUrl = 'https://api.twitch.tv/api/channels/' + streamer + '/access_token?platform=_';

        var xmlHttp = Android.mreadUrlHLS(theUrl);

        if (xmlHttp) Play_MultiStartSucessToken(JSON.parse(xmlHttp), pos, streamer, display_name, tryes);
        else Play_MultiStartErro(pos, streamer, display_name, tryes);
    }

    function Play_MultiStartErro(pos, streamer, display_name, tryes) {
        if (Play_isOn) {
            if (tryes < 5) Play_MultiStart(pos, streamer, display_name, tryes + 1);
            else Play_MultiStartFail(pos, display_name);
        }
    }

    function Play_MultiStartFail(pos, display_name, string_fail_reason) {
        Play_showWarningDialog(string_fail_reason ? string_fail_reason : (display_name + ' ' + STR_LIVE + STR_IS_OFFLINE), 2000);

        if (Play_OlddataSet()) {

            Play_MultiArray[pos] = JSON.parse(JSON.stringify(Play_data_old));
            Play_data_old = JSON.parse(JSON.stringify(Play_data_base));

        } else {
            Play_MultiArray[pos] = JSON.parse(JSON.stringify(Play_data_base));
            Play_MultiInfoReset(pos);
            if (!Play_MultiHasOne()) {
                PlayExtra_PicturePicture = false;
                PlayExtra_data = JSON.parse(JSON.stringify(Play_data_base));
                Play_CheckHostStart();
            }
        }
    }

    function Play_MultiStartSucessToken(xmlHttp, pos, streamer, display_name, tryes) {
        if (xmlHttp.status === 200) {
            var tokenResponse = JSON.parse(xmlHttp.responseText);
            //410 error
            if (!tokenResponse.hasOwnProperty('token') || !tokenResponse.hasOwnProperty('sig') ||
                xmlHttp.responseText.indexOf('"status":410') !== -1) {
                Play_MultiStartErro(pos, streamer, display_name, tryes);
                return;
            }

            var theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + streamer +
                '.m3u8?&token=' + encodeURIComponent(tokenResponse.token) + '&sig=' + tokenResponse.sig +
                '&reassignments_supported=true&playlist_include_framerate=true&fast_bread=true' +
                '&reassignments_supported=true&playlist_include_framerate=true&fast_bread=true&allow_source=true' +
                (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();

            Play_MultiStartQuality(pos, theUrl, display_name, 0);

        } else if (xmlHttp.status === 403) { //forbidden access
            Play_MultiStartFail(pos, display_name, STR_FORBIDDEN);
        } else if (xmlHttp.status === 404) { //off line
            Play_MultiStartFail(pos, display_name);
        } else Play_MultiStartErro(pos, streamer, display_name, tryes);
    }

    function Play_MultiStartQuality(pos, theUrl, display_name, tryes) {
        var xmlHttp = Android.mreadUrl(theUrl, 3000, 0, null);

        if (xmlHttp) {
            xmlHttp = JSON.parse(xmlHttp);

            if (xmlHttp.status === 200) {

                Play_MultiArray[pos].AutoUrl = theUrl;
                if (Play_MultiIsFull()) UserLiveFeed_Hide();

                try {
                    Android.StartMultiStream(pos, theUrl);
                } catch (e) {}

                Play_MultiArray[pos].qualities = Play_extractQualities(xmlHttp.responseText);

                Play_MultiSetinfo(
                    pos,
                    Play_MultiArray[pos].data[3],
                    Play_MultiArray[pos].data[13],
                    Play_MultiArray[pos].data[1],
                    Play_MultiArray[pos].data[8],
                    Play_MultiArray[pos].data[9],
                    twemoji.parse(Play_MultiArray[pos].data[2])
                );

                Play_MultiArray[pos].watching_time = new Date().getTime();
                Main_Set_history('live', Play_MultiArray[pos].data);

                //reset chat and fallow icon if pos 0 changed
                if (!pos && Play_data.data[14] !== Play_MultiArray[pos].data[14]) {
                    Play_data = JSON.parse(JSON.stringify(Play_MultiArray[pos]));
                    ChatLive_Init(0);
                    Play_controls[Play_controlsChanelCont].setLable(Play_data.data[1]);
                    Play_controls[Play_controlsGameCont].setLable(Play_data.data[3]);
                    if (AddUser_UserIsSet()) {
                        AddCode_PlayRequest = true;
                        AddCode_Channel_id = Play_data.data[14];
                        AddCode_CheckFallow();
                    }
                }
                Play_updateVodInfo(Play_MultiArray[pos].data[14], Play_MultiArray[pos].data[7], 0);
            } else if (xmlHttp.status === 403) { //forbidden access
                Play_MultiStartFail(pos, display_name, STR_FORBIDDEN);
            } else if (xmlHttp.status === 404) { //off line
                Play_MultiStartFail(pos, display_name);
            } else Play_MultiStartQualityError(pos, theUrl, display_name, tryes);

        } else Play_MultiStartQualityError(pos, theUrl, display_name, tryes);
    }

    function Play_MultiStartQualityError(pos, theUrl, display_name, tryes) {
        if (Play_isOn) {
            if (tryes < 5) Play_MultiStartQuality(pos, theUrl, display_name, tryes + 1);
            else Play_MultiStartFail(pos, display_name);
        }
    }

    function Play_MultiEnableKeyRightLeft(adder) {
        Play_controls[Play_controlsAudioMulti].defaultValue += adder;

        if (Play_controls[Play_controlsAudioMulti].defaultValue > (Play_controls[Play_controlsAudioMulti].values.length - 1))
            Play_controls[Play_controlsAudioMulti].defaultValue = 0;
        else if (Play_controls[Play_controlsAudioMulti].defaultValue < 0)
            Play_controls[Play_controlsAudioMulti].defaultValue = (Play_controls[Play_controlsAudioMulti].values.length - 1);

        if (Play_controls[Play_controlsAudioMulti].defaultValue < 4 &&
            Play_MultiArray[Play_controls[Play_controlsAudioMulti].defaultValue].data.length < 1) {

            Play_MultiEnableKeyRightLeft(adder);
            return;
        }

        Play_controls[Play_controlsAudioMulti].enterKey();

        Play_showWarningDialog(STR_AUDIO_SOURCE + STR_SPACE +
            Play_controls[Play_controlsAudioMulti].values[Play_controls[Play_controlsAudioMulti].defaultValue] +
            ((Play_controls[Play_controlsAudioMulti].defaultValue < 4) ?
                (STR_SPACE + Play_MultiArray[Play_controls[Play_controlsAudioMulti].defaultValue].data[1]) : ''),
            1500);
    }

    function Play_MultiInfoReset(pos) {
        Play_MultiSetinfo(
            pos,
            STR_SPACE,
            -1,
            STR_SPACE,
            false,
            IMG_404_LOGO,
            STR_MULTI_EMPTY
        );
    }

    function Play_MultiSetinfo(pos, game, views, displayname, is_rerun, logo, title) {

        Play_MultiArray[pos].isHost = displayname.indexOf(STR_USER_HOSTING) !== -1;

        if (Play_MultiArray[pos].isHost) {
            Play_MultiArray[pos].DisplaynameHost = displayname;
            Play_MultiArray[pos].data[1] = displayname.split(STR_USER_HOSTING)[1];
            displayname = Play_MultiArray[pos].data[1];
        }

        Main_innerHTML('stream_info_multi_name' + pos, displayname);
        document.getElementById('stream_info_multiimg' + pos).src = logo;
        Play_MultiUpdateinfo(pos, game, views, is_rerun, title);
    }

    function Play_MultiUpdateinfo(pos, game, views, is_rerun, title) {
        Main_innerHTML('stream_info_multi_title' + pos, title);
        Main_innerHTML('stream_info_multi_game' + pos, game === '' ? STR_SPACE : game);
        if (views < 0) Main_textContent("stream_info_multi_views" + pos, '');
        else {
            Main_innerHTML("stream_info_multi_views" + pos,
                '<i class="icon-' + (!is_rerun ? 'circle" style="color: red;' : 'refresh" style="') +
                ' font-size: 55%; "></i><div style="font-size: 58%;">' + Main_addCommas(views));
        }
    }

    function Play_MultiSetpannelInfo() {
        Main_textContent('stream_dialog_multi_title', STR_REPLACE_MULTI);
        Main_textContent('stream_dialog_multi_end', STR_REPLACE_MULTI_ENTER);
        for (var i = 0; i < 4; i++) {
            Main_innerHTML("stream_info_multiimgholder" + i,
                '<img id="stream_info_multiimg' + i + '" class="side_panel_channel_img" src="' + IMG_404_BANNER + '"' +
                'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');

            Main_innerHTML("stream_dialog_multiimgholder" + i,
                '<img id="stream_dialog_multiimg' + i + '" class="side_panel_channel_img" src="' + IMG_404_BANNER + '"' +
                'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');
        }
        Main_innerHTML("stream_dialog_multiimgholder-1",
            '<img id="stream_dialog_multiimg-1" class="side_panel_channel_img" src="' + IMG_404_BANNER + '"' +
            'onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></img>');
    }

    var Play_MultiDialogPos = 0;

    function Play_MultiSetUpdateDialog(doc) {
        for (var i = 0; i < 4; i++) {
            Main_textContent('stream_dialog_multi_name' + i, Play_MultiArray[i].data[1]);
            document.getElementById('stream_dialog_multiimg' + i).src = Play_MultiArray[i].data[9];
            Main_innerHTML('stream_dialog_multi_game' + i, Play_MultiArray[i].data[3] === '' ? STR_SPACE : Play_MultiArray[i].data[3]);
            Main_innerHTML('stream_dialog_multi_title' + i, twemoji.parse(Play_MultiArray[i].data[2]));
        }

        Main_textContent('stream_dialog_multi_name-1', (doc[1].indexOf(STR_USER_HOSTING) !== -1 ? doc[1].split(STR_USER_HOSTING)[1] : doc[1]));
        document.getElementById('stream_dialog_multiimg-1').src = doc[9];
        Main_innerHTML('stream_dialog_multi_game-1', doc[3] === '' ? STR_SPACE : doc[3]);
        Main_innerHTML('stream_dialog_multi_title-1', twemoji.parse(doc[2]));

        UserLiveFeed_Hide();
        Play_MultiDialogPos = 0;
        Play_MultiAddFocus();
        Play_ShowMultiDialog();
    }

    function Play_MultiAddFocus() {
        Main_AddClass('stream_dialog_multi_div' + Play_MultiDialogPos, 'side_panel_div_focused');
        Play_setHideMultiDialog();
    }

    function Play_MultiRemoveFocus() {
        Main_RemoveClass('stream_dialog_multi_div' + Play_MultiDialogPos, 'side_panel_div_focused');
    }

    function Play_ShowMultiDialog() {
        Main_ShowElement('dialog_multi');
    }

    function Play_HideMultiDialog() {
        Main_HideElement('dialog_multi');
        Play_clearHideMultiDialog();
        Play_MultiRemoveFocus();
    }

    function Play_MultiDialogVisible() {
        return Main_isElementShowing('dialog_multi');
    }

    function Play_clearHideMultiDialog() {
        window.clearTimeout(Play_HideMultiDialogID);
    }

    var Play_HideMultiDialogID;

    function Play_setHideMultiDialog() {
        Play_clearHideMultiDialog();
        Play_HideMultiDialogID = window.setTimeout(Play_HideMultiDialog, 10000);
    }

    function Play_CheckLiveThumb(PreventResetFeed) {

        var doc = document.getElementById(UserLiveFeed_ids[8] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]),
            error = STR_STREAM_ERROR;

        if (doc !== null) {
            doc = JSON.parse(doc.getAttribute(Main_DataAttribute));

            if (Play_MultiEnable) {
                if (!Play_MultiIsAlredyOPen(doc[14])) return doc;
            } else if (Play_data.data[14] !== doc[14] && PlayExtra_data.data[14] !== doc[14]) return doc;

            error = STR_ALREDY_PLAYING;
        }

        Play_showWarningDialog(error, 1500);

        if (!PreventResetFeed) UserLiveFeed_ResetFeedId();
        return null;
    }

    function Play_handleKeyDown(e) {
        if (Play_state !== Play_STATE_PLAYING) {
            switch (e.keyCode) {
                case KEY_STOP:
                    Play_Exit();
                    break;
                case KEY_RETURN_Q:
                case KEY_KEYBOARD_BACKSPACE:
                case KEY_RETURN:
                    if (Play_ExitDialogVisible() || Play_SingleClickExit) {
                        Play_Exit();
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
                    if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) UserLiveFeed_KeyRightLeft(-1);
                    else if (Play_MultiDialogVisible()) {
                        Play_MultiRemoveFocus();
                        Play_MultiDialogPos--;
                        if (Play_MultiDialogPos < 0) Play_MultiDialogPos = 3;
                        Play_MultiAddFocus();
                    } else if (Play_MultiEnable && !Play_isPanelShown()) Play_MultiEnableKeyRightLeft(-1);
                    else if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown() &&
                        !PlayExtra_PicturePicture) {
                        Play_ChatPositions++;
                        Play_ChatPosition();
                        Play_controls[Play_controlsChatPos].defaultValue = Play_ChatPositions;
                        Play_controls[Play_controlsChatPos].setLable();
                    } else if (Play_isPanelShown()) {
                        Play_clearHidePanel();
                        if (PlayVod_PanelY === 2) Play_BottomLeftRigt(1, -1);
                        Play_setHidePanel();
                    } else if (Play_isEndDialogVisible()) {
                        Play_EndTextClear();
                        Play_EndIconsRemoveFocus();
                        Play_Endcounter--;
                        if (Play_Endcounter < (Main_values.Play_isHost ? 1 : 2)) Play_Endcounter = 3;
                        Play_EndIconsAddFocus();
                    } else if (PlayExtra_PicturePicture && Play_isFullScreen) {
                        Play_PicturePicturePos++;
                        if (Play_PicturePicturePos > 7) Play_PicturePicturePos = 0;

                        Android.mSwitchPlayerPosition(Play_PicturePicturePos);
                        Main_setItem('Play_PicturePicturePos', Play_PicturePicturePos);
                    } else {
                        Play_showPanel();
                    }
                    break;
                case KEY_RIGHT:
                    if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) UserLiveFeed_KeyRightLeft(1);
                    else if (Play_MultiDialogVisible()) {
                        Play_MultiRemoveFocus();
                        Play_MultiDialogPos++;
                        if (Play_MultiDialogPos > 3) Play_MultiDialogPos = 0;
                        Play_MultiAddFocus();
                    } else if (Play_MultiEnable && !Play_isPanelShown()) Play_MultiEnableKeyRightLeft(1);
                    else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible() &&
                        (!PlayExtra_PicturePicture || Play_MultiEnable)) {
                        Play_controls[Play_controlsChat].enterKey(1);
                    } else if (Play_isPanelShown()) {
                        Play_clearHidePanel();
                        if (PlayVod_PanelY === 2) Play_BottomLeftRigt(1, 1);
                        Play_setHidePanel();
                    } else if (Play_isEndDialogVisible()) {
                        Play_EndTextClear();
                        Play_EndIconsRemoveFocus();
                        Play_Endcounter++;
                        if (Play_Endcounter > 3) Play_Endcounter = (Main_values.Play_isHost ? 1 : 2);
                        Play_EndIconsAddFocus();
                    } else if (PlayExtra_PicturePicture && Play_isFullScreen) {
                        Play_PicturePictureSize++;
                        if (Play_PicturePictureSize > 4) Play_PicturePictureSize = 2;
                        Android.mSwitchPlayerSize(Play_PicturePictureSize);
                        Main_setItem('Play_PicturePictureSize', Play_PicturePictureSize);
                    } else {
                        Play_showPanel();
                    }
                    break;
                case KEY_UP:
                    if (Play_isPanelShown()) {
                        Play_clearHidePanel();
                        if (PlayVod_PanelY < 2) {
                            PlayVod_PanelY--;
                            if (PlayVod_PanelY < 1) {
                                PlayVod_PanelY = 1;
                            } else PlayVod_IconsBottonFocus();
                        } else Play_BottomUpDown(1, 1);
                        Play_setHidePanel();
                    } else if (Play_MultiDialogVisible()) {
                        Play_MultiRemoveFocus();
                        Play_MultiDialogPos -= 2;
                        if (Play_MultiDialogPos < 0) Play_MultiDialogPos += 4;
                        Play_MultiAddFocus();
                    } else if (!UserLiveFeed_isFeedShow()) UserLiveFeed_ShowFeed();
                    else if (Play_isEndDialogVisible() || UserLiveFeed_isFeedShow()) {
                        Play_EndTextClear();
                        document.body.removeEventListener("keydown", Play_handleKeyDown, false);
                        document.body.addEventListener("keyup", Play_handleKeyUp, false);
                        Play_EndUpclear = false;
                        Play_EndUpclearCalback = Play_handleKeyDown;
                        Play_EndUpclearID = window.setTimeout(Play_keyUpEnd, 250);
                    }
                    break;
                case KEY_DOWN:
                    if (Play_isPanelShown()) {
                        Play_clearHidePanel();
                        if (PlayVod_PanelY < 2) {
                            PlayVod_PanelY++;
                            PlayVod_IconsBottonFocus();
                        } else Play_BottomUpDown(1, -1);
                        Play_setHidePanel();
                    } else if (Play_MultiDialogVisible()) {
                        Play_MultiRemoveFocus();
                        Play_MultiDialogPos += 2;
                        if (Play_MultiDialogPos > 3) Play_MultiDialogPos -= 4;
                        Play_MultiAddFocus();
                    } else if (Play_isEndDialogVisible()) Play_EndDialogUpDown(1);
                    else if (UserLiveFeed_isFeedShow()) UserLiveFeed_KeyUpDown(1);
                    else if ((Play_isFullScreen || Play_MultiEnable) && Play_isChatShown() && (!PlayExtra_PicturePicture || Play_MultiEnable)) {
                        Play_KeyChatSizeChage();
                    } else if (PlayExtra_PicturePicture && !Play_MultiEnable) {
                        if (Play_isFullScreen) {
                            if (Main_IsNotBrowser) Android.mSwitchPlayer();
                            PlayExtra_SwitchPlayer();
                        } else {
                            Play_controls[Play_controlsAudio].defaultValue++;

                            if (Play_controls[Play_controlsAudio].defaultValue > (Play_controls[Play_controlsAudio].values.length - 1)) Play_controls[Play_controlsAudio].defaultValue = 0;

                            Play_controls[Play_controlsAudio].enterKey();
                        }
                    } else Play_showPanel();
                    break;
                case KEY_ENTER:
                    if (Play_isEndDialogVisible()) {
                        if (Play_EndFocus) Play_EndDialogPressed(1);
                        else {
                            if (Play_CheckLiveThumb(true)) {
                                Play_EndDialogEnter = 1;
                                Play_EndUpclearCalback = Play_handleKeyDown;
                                Play_OpenLiveFeed();
                            }
                        }
                    } else if (Play_isPanelShown()) {
                        Play_clearHidePanel();
                        if (PlayVod_PanelY === 1) {
                            if (!Play_isEndDialogVisible()) Play_KeyPause(1);
                        } else Play_BottomOptionsPressed(1);
                        Play_setHidePanel();
                    } else if (Play_MultiDialogVisible()) {
                        Play_HideMultiDialog();
                        Play_MultiStartPrestart(Play_MultiDialogPos);
                    } else if (UserLiveFeed_isFeedShow()) {
                        if (Play_MultiEnable) {
                            if (Play_MultiIsFull()) {
                                var mdoc = Play_CheckLiveThumb();
                                if (mdoc) Play_MultiSetUpdateDialog(mdoc);
                            } else Play_MultiStartPrestart();
                        } else {
                            document.body.removeEventListener("keydown", Play_handleKeyDown, false);
                            document.body.addEventListener("keyup", Play_handleKeyUp, false);
                            PlayExtra_clear = false;
                            UserLiveFeed_ResetFeedId();
                            PlayExtra_KeyEnterID = window.setTimeout(PlayExtra_KeyEnter, 250);
                        }
                    } else Play_showPanel();
                    break;
                case KEY_RETURN_Q:
                case KEY_KEYBOARD_BACKSPACE:
                case KEY_RETURN:
                    Play_KeyReturn(false);
                    break;
                case KEY_STOP:
                    Play_Exit();
                    break;
                case KEY_PLAY:
                    if (!Play_isEndDialogVisible() && Play_isNotplaying()) Play_KeyPause(1);
                    break;
                case KEY_PAUSE:
                    if (!Play_isEndDialogVisible() && !Play_isNotplaying()) Play_KeyPause(1);
                    break;
                case KEY_KEYBOARD_SPACE:
                case KEY_PLAYPAUSE:
                    if (!Play_isEndDialogVisible()) Play_KeyPause(1);
                    break;
                case KEY_REFRESH:
                    if (UserLiveFeed_isFeedShow()) PlayExtra_KeyEnter();
                    break;
                case KEY_CHAT:
                    Play_controls[Play_controlsChat].enterKey(1);
                    break;
                case KEY_PG_UP:
                    Play_Panelcounter = Play_controlsChatPos;
                    Play_BottomUpDown(1, 1);
                    Play_Panelcounter = Play_controlsDefault;
                    break;
                case KEY_PG_DOWN:
                    Play_Panelcounter = Play_controlsChatPos;
                    Play_BottomUpDown(1, -1);
                    Play_Panelcounter = Play_controlsDefault;
                    break;
                default:
                    break;
            }
        }
    }

    var Play_controls = {};
    var Play_controlsSize = -1;

    var Play_controlsSearch = 0;
    var Play_controlsChanelCont = 1;
    var Play_controlsGameCont = 2;
    var Play_controlsOpenVod = 3;
    var Play_controlsFallow = 4;
    var Play_controlsSpeed = 5;
    var Play_controlsQuality = 6;
    var Play_controlsQualityMini = 7;
    var Play_controlsQualityMulti = 8;
    var Play_controlsLowLatency = 9;
    var Play_MultiStream = 10;
    var Play_controlsAudio = 11;
    var Play_controlsAudioMulti = 12;
    var Play_controlsChat = 13;
    var Play_controlsChatSide = 14;
    var Play_controlsChatForceDis = 15;
    var Play_controlsChatPos = 16;
    var Play_controlsChatSize = 17;
    var Play_controlsChatBright = 18;
    var Play_controlsChatFont = 19;
    var Play_controlsChatDelay = 20;

    var Play_controlsDefault = Play_controlsChat;
    var Play_Panelcounter = Play_controlsDefault;

    function Play_MakeControls() {

        Play_controls[Play_controlsSearch] = { //Search
            icons: "search",
            string: STR_SEARCH,
            values: null,
            defaultValue: null,
            opacity: 0,
            enterKey: function(PlayVodClip) {
                Play_ForceHidePannel();
                Play_OpenSearch(PlayVodClip);
            },
        };

        Play_controls[Play_controlsChanelCont] = { //channel content
            icons: "filmstrip",
            string: STR_CHANNEL_CONT,
            values: '',
            defaultValue: null,
            opacity: 0,
            enterKey: function(PlayVodClip) {
                Play_ForceHidePannel();
                Play_OpenChannel(PlayVodClip);
            },
            setLable: function(title) {
                Main_innerHTML('extra_button_' + this.position,
                    '<div style="max-width: 27%; text-overflow: ellipsis; overflow: hidden; transform: translate(135.5%, 0);">' +
                    title + '</div>');
            },
        };

        Play_controls[Play_controlsGameCont] = { //game content
            icons: "gamepad",
            string: STR_GAME_CONT,
            values: '',
            defaultValue: null,
            opacity: 0,
            enterKey: function(PlayVodClip) {
                Play_ForceHidePannel();
                Play_OpenGame(PlayVodClip);
            },
            setLable: function(title) {
                Main_innerHTML('extra_button_' + this.position,
                    '<div style="max-width: 40%; text-overflow: ellipsis; overflow: hidden; transform: translate(75%, 0);">' +
                    title + '</div>');
            },
        };

        Play_controls[Play_controlsOpenVod] = { //open vod
            icons: "movie-play",
            string: STR_OPEN_BROADCAST,
            values: '',
            defaultValue: null,
            opacity: 0,
            enterKey: function() {
                Play_ForceHidePannel();
                PlayClip_OpenVod();
            },
            setLable: function(title) {
                Main_innerHTML('extra_button_' + this.position,
                    '<div style="max-width: 60%; text-overflow: ellipsis; overflow: hidden; transform: translate(33%, 0);">' +
                    title + '</div>');
            },
        };


        Play_controls[Play_controlsFallow] = { //fallowing
            icons: "heart-o",
            string: STR_FALLOW,
            values: '',
            defaultValue: null,
            opacity: 0,
            enterKey: function(PlayVodClip) {

                AddCode_Channel_id = (PlayVodClip === 1 ? Play_data.data[14] : Main_values.Main_selectedChannel_id);
                Play_FallowUnfallow();

                Play_Resetpanel(PlayVodClip);
            },
            setLable: function(string, AddCode_IsFallowing) {
                Main_textContent('extra_button_text' + this.position, string);
                this.setIcon(AddCode_IsFallowing);
                Main_textContent('extra_button_' + this.position, AddCode_IsFallowing ? STR_CLICK_UNFALLOW : STR_CLICK_FALLOW);
            },
            setIcon: function(AddCode_IsFallowing) {
                Main_innerHTML('controls_icon_' + this.position, '<i class="pause_button3d icon-' +
                    (AddCode_IsFallowing ? "heart" : "heart-o") +
                    '" style="color: #' + (AddCode_IsFallowing ? "6441a4" : "FFFFFF") + ';" ></i>');
            },
        };

        Play_controls[Play_controlsSpeed] = { //speed
            icons: "speedometer",
            string: STR_SPEED,
            values: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
            defaultValue: 3,
            opacity: 0,
            enterKey: function() {
                Play_CurrentSpeed = this.defaultValue;
                Android.setPlaybackSpeed(this.values[this.defaultValue]);
            },
            updown: function(adder) {
                this.defaultValue += adder;
                if (this.defaultValue < 0)
                    this.defaultValue = 0;
                else if (this.defaultValue > (this.values.length - 1))
                    this.defaultValue = (this.values.length - 1);
                this.bottomArrows();
                this.setLable();
            },
            setLable: function() {
                Main_textContent('controls_name_' + this.position, this.values[this.defaultValue] +
                    (this.values[this.defaultValue] === 1 ? 'x (' + STR_NORMAL + ')' : 'x'));
            },
            bottomArrows: function() {
                Play_BottomArrows(this.position);
            },
        };

        Play_controls[Play_controlsQuality] = { //quality
            icons: "videocamera",
            string: STR_QUALITY,
            values: ['1080p60 | Source | 10.00Mbps | avc'],
            defaultValue: 0,
            opacity: 0,
            enterKey: function(PlayVodClip) {

                if (PlayVodClip === 1) {
                    Play_hidePanel();
                    Play_data.quality = Play_data.qualities[Play_data.qualityIndex].id;
                    Play_data.qualityPlaying = Play_data.quality;
                    Play_playingUrl = Play_data.qualities[Play_data.qualityIndex].url;
                    Play_SetHtmlQuality('stream_quality');
                    Play_onPlayer();
                } else if (PlayVodClip === 2) {
                    PlayVod_hidePanel();
                    PlayVod_quality = PlayVod_qualities[PlayVod_qualityIndex].id;
                    PlayVod_qualityPlaying = PlayVod_quality;
                    PlayVod_playingUrl = PlayVod_qualities[PlayVod_qualityIndex].url;
                    PlayVod_SetHtmlQuality('stream_quality');
                    PlayVod_onPlayer();
                } else if (PlayVodClip === 3) {
                    PlayClip_hidePanel();
                    PlayClip_quality = PlayClip_qualities[PlayClip_qualityIndex].id;
                    PlayClip_qualityPlaying = PlayClip_quality;
                    PlayClip_playingUrl = PlayClip_qualities[PlayClip_qualityIndex].url;
                    PlayClip_SetHtmlQuality('stream_quality');
                    PlayClip_onPlayer();
                }
            },
            updown: function(adder, PlayVodClip) {

                if (PlayVodClip === 1) {
                    //TODO fix this reversed logic
                    Play_data.qualityIndex += adder * -1;

                    if (Play_data.qualityIndex > (Play_getQualitiesCount() - 1))
                        Play_data.qualityIndex = (Play_getQualitiesCount() - 1);
                    else if (Play_data.qualityIndex < 0)
                        Play_data.qualityIndex = 0;

                    Play_qualityDisplay(Play_getQualitiesCount, Play_data.qualityIndex, Play_SetHtmlQuality);
                } else if (PlayVodClip === 2) {
                    //TODO fix this reversed logic
                    PlayVod_qualityIndex += adder * -1;

                    if (PlayVod_qualityIndex > (PlayVod_getQualitiesCount() - 1))
                        PlayVod_qualityIndex = (PlayVod_getQualitiesCount() - 1);
                    else if (PlayVod_qualityIndex < 0)
                        PlayVod_qualityIndex = 0;

                    Play_qualityDisplay(PlayVod_getQualitiesCount, PlayVod_qualityIndex, PlayVod_SetHtmlQuality);
                } else if (PlayVodClip === 3) {
                    //TODO fix this reversed logic
                    PlayClip_qualityIndex += adder * -1;

                    if (PlayClip_qualityIndex > (PlayClip_getQualitiesCount() - 1))
                        PlayClip_qualityIndex = (PlayClip_getQualitiesCount() - 1);
                    else if (PlayClip_qualityIndex < 0)
                        PlayClip_qualityIndex = 0;

                    Play_qualityDisplay(PlayClip_getQualitiesCount, PlayClip_qualityIndex, PlayClip_SetHtmlQuality);
                }

            },
        };

        Play_controls[Play_controlsQualityMini] = { //quality for picture in picture
            icons: "videocamera",
            string: STR_PLAYER_RESYNC,
            values: [STR_PLAYER_AUTO_SMALLS, STR_PLAYER_AUTO_BIG, STR_PLAYER_AUTO_ALL],
            defaultValue: 2,
            opacity: 0,
            enterKey: function() {

                if (this.defaultValue === 2) {
                    Android.StartAuto(1, 0);
                    Android.initializePlayer2Auto();
                } else if (this.defaultValue) Android.StartAuto(1, 0);
                else Android.initializePlayer2Auto();

                Play_hidePanel();
                this.defaultValue = 2;
                this.bottomArrows();
                this.setLable();
            },
            updown: function(adder) {

                this.defaultValue += adder;
                if (this.defaultValue < 0) this.defaultValue = 0;
                else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);

                this.bottomArrows();
                this.setLable();
            },
            setLable: function() {
                Main_textContent('controls_name_' + this.position,
                    Play_controls[this.position].values[Play_controls[this.position].defaultValue]);
            },
            bottomArrows: function() {
                Play_BottomArrows(this.position);
            },

        };

        Play_controls[Play_controlsQualityMulti] = { //quality for Multi
            icons: "videocamera",
            string: STR_PLAYER_RESYNC,
            values: [STR_PLAYER_MULTI_ALL, STR_PLAYER_WINDOW + 1, STR_PLAYER_WINDOW + 2, STR_PLAYER_WINDOW + 3, STR_PLAYER_WINDOW + 4],
            defaultValue: 0,
            opacity: 0,
            enterKey: function() {

                if (!this.defaultValue) {

                    for (var i = 0; i < Play_MultiArray.length; i++) {
                        if (Play_MultiArray[i].data.length > 0) {
                            try {
                                Android.StartMultiStream(i, Play_MultiArray[i].AutoUrl);
                            } catch (e) {}
                        }
                    }
                } else Android.StartMultiStream(this.defaultValue - 1, Play_MultiArray[this.defaultValue - 1].AutoUrl);

                Play_hidePanel();
                this.defaultValue = 0;
                this.bottomArrows();
                this.setLable();
            },
            updown: function(adder) {

                this.defaultValue += adder;
                if (this.defaultValue < 0) this.defaultValue = 0;
                else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);

                this.bottomArrows();
                this.setLable();
            },
            setLable: function() {
                Main_textContent('controls_name_' + this.position,
                    Play_controls[this.position].values[Play_controls[this.position].defaultValue]);
            },
            bottomArrows: function() {
                Play_BottomArrows(this.position);
            },

        };

        Play_controls[Play_controlsLowLatency] = { //quality
            icons: "history",
            string: STR_LOW_LATENCY,
            values: null,
            defaultValue: 0,
            opacity: 0,
            enterKey: function() {
                Play_hidePanel();

                Play_LowLatency = !Play_LowLatency;

                if (Main_IsNotBrowser) {
                    Android.mSetlatency(Play_LowLatency);

                    if (Play_MultiEnable) {

                        for (var i = 0; i < Play_MultiArray.length; i++) {
                            if (Play_MultiArray[i].data.length > 0) {
                                try {
                                    Android.StartMultiStream(i, Play_MultiArray[i].AutoUrl);
                                } catch (e) {}
                            }
                        }

                    } else if (PlayExtra_PicturePicture) {
                        Android.ResStartAuto(Play_data.AutoUrl, 1, 0);
                        Android.ResStartAuto2(PlayExtra_data.AutoUrl);
                    } else {
                        if (Play_data.quality.indexOf("Auto") !== -1) Android.SetAuto(Play_data.AutoUrl);
                        Play_onPlayer();
                    }

                }

                if (Play_LowLatency) Play_showWarningDialog(STR_LOW_LATENCY_SUMMARY, 3000);

                Main_setItem('Play_LowLatency', Play_LowLatency);
                this.setLable();
            },
            setLable: function() {
                Main_textContent('extra_button_' + this.position, "(" + (Play_LowLatency ? STR_ENABLE : STR_DISABLE) + ")");
            },
        };

        Play_controls[Play_controlsAudio] = { //Audio
            icons: "sound",
            string: STR_AUDIO_SOURCE,
            values: [STR_PLAYER_AUTO_SMALLS, STR_PLAYER_AUTO_BIG, STR_PLAYER_AUTO_ALL],
            defaultValue: Play_controlsAudioPos,
            opacity: 0,
            enterKey: function() {

                Android.mSwitchPlayerAudio(this.defaultValue);

                Play_hidePanel();
                Play_controlsAudioPos = this.defaultValue;

                Main_setItem('Play_controlsAudioPos', Play_controlsAudioPos);

                this.bottomArrows();
                this.setLable();
                Play_SetAudioIcon();
            },
            updown: function(adder) {

                this.defaultValue += adder;
                if (this.defaultValue < 0) this.defaultValue = 0;
                else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);

                this.bottomArrows();
                this.setLable();
            },
            setLable: function() {
                Main_textContent('controls_name_' + this.position,
                    Play_controls[this.position].values[Play_controls[this.position].defaultValue]);
            },
            bottomArrows: function() {
                Play_BottomArrows(this.position);
            },
        };

        Play_controls[Play_controlsAudioMulti] = { //Audio multi
            icons: "sound",
            string: STR_AUDIO_SOURCE,
            values: [STR_PLAYER_WINDOW + 1, STR_PLAYER_WINDOW + 2, STR_PLAYER_WINDOW + 3, STR_PLAYER_WINDOW + 4, STR_PLAYER_MULTI_ALL],
            defaultValue: 0,
            opacity: 0,
            enterKey: function() {

                try {
                    Android.mSetPlayerAudioMulti(this.defaultValue);
                } catch (e) {}

                Play_hidePanel();

                this.bottomArrows();
                this.setLable();
            },
            updown: function(adder) {

                this.defaultValue += adder;
                if (this.defaultValue < 0) this.defaultValue = 0;
                else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);

                this.bottomArrows();
                this.setLable();
            },
            setLable: function() {
                Main_textContent('controls_name_' + this.position,
                    Play_controls[this.position].values[Play_controls[this.position].defaultValue]);
            },
            bottomArrows: function() {
                Play_BottomArrows(this.position);
            },
        };

        Play_controls[Play_MultiStream] = { //multi
            icons: "multi",
            string: STR_4_WAY_MULTI,
            values: null,
            opacity: 0,
            enterKey: function(shutdown) {
                Play_MultiEnable = !Play_MultiEnable;
                if (Play_MultiEnable) {
                    try {
                        Android.EnableMultiStream();
                        Play_hidePanel();
                    } catch (e) {}

                    Play_Multi_SetPanel();
                    if (Play_data.quality.indexOf("Auto") === -1) {
                        Play_data.quality = "Auto";
                        Play_data.qualityPlaying = Play_data.quality;
                        Android.StartAuto(1, 0);
                    }

                    Play_controls[Play_controlsAudioMulti].enterKey();

                    var i = 0;
                    for (i; i < 4; i++) {
                        Play_MultiArray[i] = JSON.parse(JSON.stringify(Play_data_base));
                    }

                    Play_MultiArray[0] = JSON.parse(JSON.stringify(Play_data));
                    Play_MultiSetinfo(
                        0,
                        Play_MultiArray[0].data[3],
                        Play_MultiArray[0].data[13],
                        Play_MultiArray[0].data[1],
                        Play_MultiArray[0].data[8],
                        Play_MultiArray[0].data[9],
                        twemoji.parse(Play_MultiArray[0].data[2])
                    );

                    if (PlayExtra_PicturePicture) {
                        Play_MultiArray[1] = JSON.parse(JSON.stringify(PlayExtra_data));
                        Play_MultiSetinfo(
                            1,
                            Play_MultiArray[1].data[3],
                            Play_MultiArray[1].data[13],
                            Play_MultiArray[1].data[1],
                            Play_MultiArray[1].data[8],
                            Play_MultiArray[1].data[9],
                            twemoji.parse(Play_MultiArray[1].data[2])
                        );
                    }

                    for (i = PlayExtra_PicturePicture ? 2 : 1; i < 4; i++) {
                        Play_MultiInfoReset(i);
                    }

                    if (Play_isChatShown()) Play_controls[Play_controlsChat].enterKey();

                } else {
                    try {
                        Android.DisableMultiStream();
                    } catch (e) {}

                    Play_Multi_UnSetPanel(shutdown);
                }
            }
        };

        Play_controls[Play_controlsChat] = { //chat enable disable
            icons: "chat",
            string: STR_CHAT_SHOW,
            values: null,
            defaultValue: null,
            opacity: 0,
            enterKey: function() {
                if (!Play_isFullScreen && !Play_MultiEnable) return;
                if (!Play_isChatShown() && !Play_isEndDialogVisible()) {
                    Play_showChat();
                    Play_ChatEnable = true;
                } else {
                    Play_hideChat();
                    Play_ChatEnable = false;
                }
                Main_setItem('ChatEnable', Play_ChatEnable ? 'true' : 'false');
                this.setLable();
            },
            setLable: function() {
                var string = (Play_isChatShown() ? STR_YES : STR_NO);
                if (!Play_isFullScreen) string = Play_isFullScreen ? STR_CHAT_SIDE : STR_CHAT_5050;

                Main_textContent('extra_button_' + this.position, '(' + string + ')');
            },
        };

        Play_controls[Play_controlsChatSide] = { //chat side
            icons: Play_isFullScreen ? "resize-down" : "resize-up",
            string: STR_CHAT_VIDEO_MODE,
            values: null,
            defaultValue: null,
            opacity: 0,
            enterKey: function() {
                Play_isFullScreen = !Play_isFullScreen;
                Play_SetFullScreen(Play_isFullScreen);

                this.setLable();
                this.setIcon();
            },
            setLable: function() {
                var title = Play_isFullScreen ? STR_CHAT_SIDE_FULL : STR_CHAT_SIDE;
                if (PlayExtra_PicturePicture) title = Play_isFullScreen ? STR_CHAT_PP_SIDE_FULL : STR_CHAT_5050;

                Main_textContent('extra_button_' + this.position, '(' + title + ')');

                Play_controls[Play_controlsChat].setLable();
            },
            setIcon: function() {
                var icon = (Play_isFullScreen ? "resize-down" : "resize-up");
                if (PlayExtra_PicturePicture) icon = 'pp';

                Main_innerHTML('controls_icon_' + this.position, '<i class="pause_button3d icon-' +
                    icon + '" ></i>');
            },
        };

        Play_controls[Play_controlsChatForceDis] = { //force disable chat
            icons: "chat-stop",
            string: STR_F_DISABLE_CHAT,
            values: null,
            defaultValue: null,
            opacity: 0,
            enterKey: function(PlayVodClip) {
                Main_values.Play_ChatForceDisable = !Main_values.Play_ChatForceDisable;

                if (PlayVodClip === 1) {
                    ChatLive_Init(0);
                    if (PlayExtra_PicturePicture && !Play_isFullScreen && !Play_MultiEnable) ChatLive_Init(1);
                } else Chat_Init();

                this.setLable();
                Main_SaveValues();
            },
            setLable: function() {
                Main_textContent('extra_button_' + this.position, '(' +
                    (Main_values.Play_ChatForceDisable ? STR_YES : STR_NO) + ')');
            },
        };

        Play_controls[Play_controlsChatPos] = { //chat position
            icons: "chat-pos",
            string: STR_CHAT_POS,
            values: [1, 2, 3, 4, 5, 6, 7, 8],
            defaultValue: Play_ChatPositions,
            opacity: 0,
            isChat: true,
            updown: function(adder) {
                if (!Play_isChatShown() || !Play_isFullScreen) return;
                this.defaultValue += adder;
                if (this.defaultValue < 0)
                    this.defaultValue = (this.values.length - 1);
                else if (this.defaultValue > (this.values.length - 1))
                    this.defaultValue = 0;

                Play_ChatPositions += adder;

                Play_ChatPosition();

                this.defaultValue = Play_ChatPositions;

                this.setLable();
            },
            setLable: function() {
                Main_textContent('controls_name_' + this.position, this.values[this.defaultValue]);
            },
        };

        Play_controls[Play_controlsChatSize] = { //chat size
            icons: "chat-size",
            string: STR_CHAT_SIZE,
            values: ["12.5%", "25%", "50%", "75%", "100%"],
            defaultValue: Play_ChatSizeValue,
            opacity: 0,
            isChat: true,
            updown: function(adder) {
                if (!Play_isChatShown() || !Play_isFullScreen) return;

                this.defaultValue += adder;

                if (this.defaultValue < 0)
                    this.defaultValue = 0;
                else if (this.defaultValue > (this.values.length - 1)) {
                    this.defaultValue = (this.values.length - 1);
                    return;
                }

                this.bottomArrows();
                Play_ChatSizeValue = this.defaultValue;

                if (Play_ChatSizeValue === (Play_MaxChatSizeValue - 1) && adder === -1) {
                    Play_ChatPositionConvert(false);
                } else if (Play_ChatSizeValue === Play_MaxChatSizeValue) Play_ChatPositionConvert(true);

                Play_ChatSize(true);

                Play_controls[Play_controlsChatPos].defaultValue = Play_ChatPositions;
                this.setLable();
            },
            setLable: function() {
                Main_textContent('controls_name_' + Play_controlsChatPos,
                    Play_controls[Play_controlsChatPos].values[Play_controls[Play_controlsChatPos].defaultValue]);
            },
            bottomArrows: function() {
                Play_BottomArrows(this.position);
            },
        };

        Play_controls[Play_controlsChatBright] = { //chat_brightness
            icons: "chat-brig",
            string: STR_CHAT_BRIGHTNESS,
            values: ["0%", "5%", "10%", "15%", "20%",
                "25%", "30%", "35%", "40%", "45%",
                "50%", "55%", "60%", "65%", "70%",
                "75%", "80%", "85%", "90%", "95%", "100%"
            ],
            defaultValue: Main_values.ChatBackground,
            opacity: 0,
            isChat: true,
            updown: function(adder) {
                if (!Play_isChatShown() || !Play_isFullScreen) return;
                this.defaultValue += adder;
                if (this.defaultValue < 0)
                    this.defaultValue = 0;
                else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);
                Main_values.ChatBackground = this.defaultValue;

                Play_ChatBackground = (this.defaultValue * 0.05).toFixed(2);
                Play_ChatBackgroundChange(false);

                this.setLable();
                this.bottomArrows();
                Main_SaveValues();
            },
            setLable: function() {
                Main_textContent('controls_name_' + this.position,
                    this.values[this.defaultValue]);
            },
            bottomArrows: function() {
                Play_BottomArrows(this.position);
            },
        };

        Play_controls[Play_controlsChatFont] = { //Chat font size
            icons: "chat-font",
            string: STR_CHAT_FONT,
            values: ["60%", "80%", "100%", "120%", "140%"],
            defaultValue: Main_values.Chat_font_size,
            opacity: 0,
            isChat: true,
            updown: function(adder) {
                if (!Play_isChatShown()) return;
                this.defaultValue += adder;
                if (this.defaultValue < 0)
                    this.defaultValue = 0;
                else if (this.defaultValue > (this.values.length - 1)) this.defaultValue = (this.values.length - 1);
                Main_values.Chat_font_size = this.defaultValue;

                Play_SetChatFont();
                this.setLable();
                this.bottomArrows();
                Main_SaveValues();
            },
            setLable: function() {
                Main_textContent('controls_name_' + this.position,
                    this.values[this.defaultValue]);
            },
            bottomArrows: function() {
                Play_BottomArrows(this.position);
            },
        };

        Play_controls[Play_controlsChatDelay] = { //chat delay
            icons: "chat-delay",
            string: STR_CHAT_DELAY,
            values: [STR_DISABLE, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                20, 25, 30, 45, 60, 90, 120, 150, 180, 240, 300
            ],
            defaultValue: Play_ChatDelayPosition,
            opacity: 0,
            isChat: false,
            updown: function(adder) {
                this.defaultValue += adder;

                if (this.defaultValue < 0)
                    this.defaultValue = 0;
                else if (this.defaultValue > (this.values.length - 1))
                    this.defaultValue = (this.values.length - 1);

                Play_ChatDelayPosition = this.defaultValue;

                Main_setItem('Play_ChatDelayPosition', Play_ChatDelayPosition);
                this.bottomArrows();
                this.setLable();
            },
            setLable: function() {
                var stringSec = '';

                if (this.defaultValue > 1) stringSec = STR_SECONDS;
                else if (this.defaultValue > 0) stringSec = STR_SECOND;

                Main_textContent('controls_name_' + this.position, this.values[this.defaultValue] + stringSec);
            },
            bottomArrows: function() {
                Play_BottomArrows(this.position);
            },
        };
    }

    function Play_SetAudioIcon() {
        if (Play_controlsAudioPos === 2) {
            Main_innerHTML("chat_container_sound_icon", '<i class="icon-sound strokicon" ></i>');
            Main_innerHTML("chat_container2_sound_icon", '<i class="icon-sound strokicon" ></i>');
        } else if (Play_controlsAudioPos === 1) {
            Main_innerHTML("chat_container_sound_icon", '<i class="icon-sound strokicon" ></i>');
            Main_innerHTML("chat_container2_sound_icon", '<i class="icon-sound-off strokicon" ></i>');
        } else {
            Main_innerHTML("chat_container_sound_icon", '<i class="icon-sound-off strokicon" ></i>');
            Main_innerHTML("chat_container2_sound_icon", '<i class="icon-sound strokicon" ></i>');
        }
    }

    function Play_IconsAddFocus() {
        Main_AddClass('controls_button_' + Play_Panelcounter, 'progress_bar_div_focus');
        document.getElementById('controls_button_text_' + Play_Panelcounter).style.opacity = "1";

        if (Play_controls[Play_Panelcounter].isChat && (!Play_isChatShown() || !Play_isFullScreen))
            document.getElementById('controls_button_text_' + Play_controlsChat).style.opacity = "1";
        else if (Play_Panelcounter !== Play_controlsChat && !Play_controls[Play_Panelcounter].isChat)
            document.getElementById('controls_button_text_' + Play_controlsChat).style.opacity = "0";
    }

    function Play_IconsRemoveFocus() {
        Main_RemoveClass('controls_button_' + Play_Panelcounter, 'progress_bar_div_focus');
        document.getElementById('controls_button_text_' + Play_Panelcounter).style.opacity = "0";
        //in case chat is disable and the warning is showing because some chat option was selected
        document.getElementById('controls_button_text_' + Play_controlsChat).style.opacity = "0";
    }

    function Play_KeyChatSizeChage() {
        Play_ChatSizeValue++;
        if (Play_ChatSizeValue > Play_MaxChatSizeValue) {
            Play_ChatSizeValue = 0;
            Play_ChatPositionConvert(false);
        } else if (Play_ChatSizeValue === Play_MaxChatSizeValue) Play_ChatPositionConvert(true);
        Play_ChatSize(true);
        Play_controls[Play_controlsChatSize].defaultValue = Play_ChatSizeValue;
        Play_controls[Play_controlsChatSize].bottomArrows();
        Play_controls[Play_controlsChatSize].setLable();
    }

    function Play_BottomOptionsPressed(PlayVodClip) {
        Main_ready(function() {
            if (Play_controls[Play_Panelcounter].enterKey) {
                Play_controls[Play_Panelcounter].enterKey(PlayVodClip);
            } else {
                Play_Resetpanel(PlayVodClip);
            }
        });
        Main_SaveValues();
    }

    function Play_Resetpanel(PlayVodClip) {
        Play_clearHidePanel();
        if (PlayVodClip === 1) Play_setHidePanel();
        else if (PlayVodClip === 2) PlayVod_setHidePanel();
        else if (PlayVodClip === 3) PlayClip_setHidePanel();
    }

    function Play_BottomUpDown(PlayVodClip, adder) {
        if (Play_controls[Play_Panelcounter].updown) {
            Play_controls[Play_Panelcounter].updown(adder, PlayVodClip);
        } else if (adder === 1) {
            PlayVod_PanelY--;
            PlayVod_IconsBottonFocus();
        }
    }

    function Play_BottomLeftRigt(PlayVodClip, adder) {
        Play_IconsRemoveFocus();
        Play_Panelcounter += adder;
        if (Play_Panelcounter > Play_controlsSize) Play_Panelcounter = 0;
        else if (Play_Panelcounter < 0) Play_Panelcounter = Play_controlsSize;

        if (document.getElementById('controls_' + Play_Panelcounter).style.display === 'none') {
            Play_BottomLeftRigt(PlayVodClip, adder);
            return;
        }

        Play_IconsAddFocus();
    }

    function Play_BottomArrows(position) {
        var doc_up = document.getElementById("control_arrow_up_" + position),
            doc_down = document.getElementById("control_arrow_down" + position);

        if (Play_controls[position].values.length === 1) {
            doc_up.classList.add('hide');
            doc_down.classList.add('hide');
        } else if (!Play_controls[position].defaultValue) {
            doc_up.classList.remove('hide');
            doc_down.classList.remove('hide');

            doc_up.style.opacity = "1";
            doc_down.style.opacity = "0.2";
        } else if (Play_controls[position].defaultValue === (Play_controls[position].values.length - 1)) {
            doc_up.classList.remove('hide');
            doc_down.classList.remove('hide');

            doc_up.style.opacity = "0.2";
            doc_down.style.opacity = "1";
        } else {
            doc_up.classList.remove('hide');
            doc_down.classList.remove('hide');

            doc_up.style.opacity = "1";
            doc_down.style.opacity = "1";
        }

        Main_textContent('controls_name_' + position, Play_controls[position].values[Play_controls[position].defaultValue]);
    }

    function Play_SetControls() {
        var div, doc = document.getElementById('controls_holder');
        for (var key in Play_controls) {
            div = document.createElement('div');
            div.classList.add('controls_button_holder');
            div.setAttribute('id', 'controls_' + key);

            div.innerHTML = '<div id="controls_button_' + key +
                '" class="controls_button"><div id="controls_icon_' + key +
                '"><i class="pause_button3d icon-' + Play_controls[key].icons +
                '" ></i></div></div><div id="controls_button_text_' + key +
                '" class="extra_button_text_holder" style="opacity: ' + Play_controls[key].opacity +
                ';"><div id="extra_button_text' + key + '" class="extra_button_text strokedeline" >' +
                Play_controls[key].string + '</div><div id="extra_button_' + key +
                '" class="extra_button_text strokedeline" >' +
                (Play_controls[key].values ? Play_SetControlsArrows(key) : STR_SPACE) + '</div></div></div>';

            doc.appendChild(div);
            Play_controlsSize++;
            Play_controls[key].position = key;
            if (Play_controls[key].bottomArrows) Play_BottomArrows(key);
            if (Play_controls[key].setLable) Play_controls[key].setLable();
        }
    }

    function Play_SetControlsArrows(key) {
        return '<div id="controls_arrows_' + key + '" style="font-size: 50%; display: inline-block; vertical-align: middle;"><div style="display: inline-block;"><div id="control_arrow_up_' + key + '" class="up"></div><div id="control_arrow_down' + key + '" class="down"></div></div></div>&nbsp;<div id="controls_name_' + key + '" class="arrows_text">' + Play_controls[key].values[Play_controls[key].defaultValue] + '</div>';
    }
    //Variable initialization
    var PlayVod_quality = 'Auto';
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

    var Play_jumping = false;
    var PlayVod_SizeClearID;
    var PlayVod_updateStreamInfId;
    var PlayVod_addToJump = 0;
    var PlayVod_IsJumping = false;
    var PlayVod_jumpCount = 0;
    var PlayVod_loadingDataTimeout = 2000;
    var PlayVod_qualitiesFound = false;
    var PlayVod_currentTime = 0;
    var PlayVod_VodPositions = 0;
    var PlayVod_PanelY = 0;
    var PlayVod_ProgressBaroffset = 0;
    var PlayVod_StepsCount = 0;
    var PlayVod_TimeToJump = 0;
    var PlayVod_replay = false;
    var PlayVod_jumpTimers = [0, 10, 30, 60, 120, 300, 600, 900, 1200, 1800];

    var PlayVod_RefreshProgressBarrID;
    var PlayVod_SaveOffsetId;
    var PlayVod_WasSubChekd = false;
    var PlayVod_VodIdex;
    var PlayVod_VodOffset;
    var PlayVod_VodOffsetTemp;
    var PlayVod_HasVodInfo = false;
    //Variable initialization end

    function PlayVod_Start() {
        Play_showBufferDialog();
        Play_HideEndDialog();
        //Play_SupportsSource = true;
        PlayVod_currentTime = 0;
        Main_textContent("stream_live_time", '');
        Main_textContent('progress_bar_current_time', Play_timeS(0));
        Chat_title = STR_PAST_BROA + '.';
        Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i> </div>');
        Main_HideElement('progress_pause_holder');
        Main_ShowElement('progress_bar_div');

        document.getElementById('controls_' + Play_MultiStream).style.display = 'none';
        document.getElementById('controls_' + Play_controlsOpenVod).style.display = 'none';
        document.getElementById('controls_' + Play_controlsChatDelay).style.display = 'none';
        document.getElementById('controls_' + Play_controlsLowLatency).style.display = 'none';
        PlayExtra_UnSetPanel();
        Play_CurrentSpeed = 3;
        Play_IconsResetFocus();
        UserLiveFeed_Unset();
        Play_ShowPanelStatus(2);

        PlayVod_StepsCount = 0;
        Play_DefaultjumpTimers = PlayVod_jumpTimers;
        PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);
        PlayVod_state = Play_STATE_LOADING_TOKEN;
        PlayClip_HasVOD = true;
        UserLiveFeed_PreventHide = false;
        ChannelVod_vodOffset = 0;
        Main_values.Play_isHost = false;
        PlayClip_HideShowNext(0, 0);
        PlayClip_HideShowNext(1, 0);

        if (Main_values.vodOffset) { // this is a vod coming from a clip or from restore playback
            PlayVod_HasVodInfo = false;
            PlayVod_PrepareLoad();
            PlayVod_updateVodInfo();
        } else {
            PlayVod_HasVodInfo = true;
            PlayVod_updateStreamerInfoValues();
            Main_innerHTML("stream_info_title", ChannelVod_title);
            Main_textContent("stream_info_game", ChannelVod_game);
            Main_innerHTML("stream_live_time", ChannelVod_createdAt + ',' + STR_SPACE + ChannelVod_views);
            Main_textContent("stream_live_viewers", '');
            Main_textContent("stream_watching_time", '');

            Main_replaceClassEmoji('stream_info_title');
        }

        PlayVod_VodIdex = Main_history_Exist('vod', Main_values.ChannelVod_vodId);
        PlayVod_VodOffset = (PlayVod_VodIdex > -1) ?
            Main_values_History_data[AddUser_UsernameArray[0].id].vod[PlayVod_VodIdex].watched : 0;

        if (PlayVod_VodOffset && !Main_values.vodOffset) {
            Play_HideBufferDialog();
            Play_showVodDialog();
        } else {
            PlayVod_PosStart();
        }
    }

    function PlayVod_PosStart() {
        window.setTimeout(function() {
            Main_ShowElement('controls_holder');
            Main_ShowElement('progress_pause_holder');
        }, 1000);
        Main_textContent('progress_bar_duration', Play_timeS(ChannelVod_DurationSeconds));

        Main_values.Play_WasPlaying = 2;
        Main_SaveValues();

        PlayVod_SaveOffsetId = window.setInterval(PlayVod_SaveOffset, 60000);
        //View bot is blocking it
        //new Image().src = Play_IncrementView;

        Play_PlayerPanelOffset = -13;
        PlayVod_qualitiesFound = false;
        Play_IsWarning = false;
        PlayVod_jumpCount = 0;
        PlayVod_IsJumping = false;
        PlayVod_tokenResponse = 0;
        PlayVod_playlistResponse = 0;
        PlayVod_playingTry = 0;
        Play_jumping = false;
        PlayVod_isOn = true;
        PlayVod_WasSubChekd = false;
        PlayVod_loadData();

        if (!PlayVod_replay) PlayVod_loadData();
        else PlayVod_qualityChanged();

        Play_EndSet(2);
        document.body.removeEventListener("keyup", Main_handleKeyUp);

        Play_controls[Play_controlsChanelCont].setLable(Main_values.Main_selectedChannelDisplayname);
        Play_controls[Play_controlsGameCont].setLable(Play_data.data[3]);
    }

    function PlayVod_PrepareLoad() {
        PlayVod_loadingInfoDataTry = 0;
        PlayVod_loadingInfoDataTryMax = 5;
        PlayVod_loadingInfoDataTimeout = 10000;
    }

    function PlayVod_updateStreamerInfoValues() {
        Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);
        Play_partnerIcon(Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelPartner, false, ' [' + (ChannelVod_language).toUpperCase() + ']');

        //The chat init will happens after user click on vod dialog
        if (!PlayVod_VodOffset) Chat_Init();

        if (AddUser_UserIsSet()) {
            AddCode_Channel_id = Main_values.Main_selectedChannel_id;
            AddCode_PlayRequest = true;
            AddCode_CheckFallow();
        } else Play_hideFallow();
    }

    function PlayVod_updateVodInfo() {
        var theUrl = Main_kraken_api + 'videos/' + Main_values.ChannelVod_vodId + Main_TwithcV5Flag_I;
        BasexmlHttpGet(theUrl, PlayVod_loadingInfoDataTimeout, 2, null, PlayVod_updateVodInfoPannel, PlayVod_updateVodInfoError);
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

        ChannelVod_DurationSeconds = parseInt(response.length);

        if (ChannelVod_DurationSeconds < PlayVod_VodOffsetTemp) {
            Android.mseekTo(0);
            Main_values.vodOffset = 0;
            Chat_offset = 0;
            Chat_Init();
        }
        PlayVod_VodOffsetTemp = 0;

        Main_values_Play_data = ScreensObj_VodCellArray(response);
        Main_Set_history('vod', Main_values_Play_data);

        ChannelVod_title = twemoji.parse(response.title, false, true);

        //TODO add a warning about muted segments
        //if (response.muted_segments) console.log(response.muted_segments);

        Main_values.Main_selectedChannelPartner = response.channel.partner;
        Play_partnerIcon(Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelPartner, false,
            '[' + (response.channel.broadcaster_language).toUpperCase() + ']');

        Main_innerHTML("stream_info_title", ChannelVod_title);
        Main_innerHTML("stream_info_game", (response.game !== "" && response.game !== null ? STR_STARTED + STR_PLAYING +
            response.game : ""));

        Main_innerHTML("stream_live_time", STR_STREAM_ON + Main_videoCreatedAt(response.created_at) + ',' + STR_SPACE + Main_addCommas(response.views) + STR_VIEWS);
        Main_textContent("stream_live_viewers", '');
        Main_textContent("stream_watching_time", '');


        Main_textContent('progress_bar_duration', Play_timeS(ChannelVod_DurationSeconds));

        PlayVod_currentTime = Main_values.vodOffset * 1000;
        PlayVod_ProgresBarrUpdate(Main_values.vodOffset, ChannelVod_DurationSeconds, true);

        Main_values.Main_selectedChannelDisplayname = response.channel.display_name;
        //Main_textContent("stream_info_name", Main_values.Main_selectedChannelDisplayname);

        Main_values.Main_selectedChannelLogo = response.channel.logo;
        Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);

        Main_values.Main_selectedChannel_id = response.channel._id;
        Main_values.Main_selectedChannel = response.channel.name;

        if (AddUser_UserIsSet()) {
            AddCode_PlayRequest = true;
            AddCode_Channel_id = Main_values.Main_selectedChannel_id;
            AddCode_CheckFallow();
        } else Play_hideFallow();

        //View bot is blocking it
        //new Image().src = response.increment_view_count_url;

        Play_EndSet(2);
    }

    function PlayVod_Resume() {
        UserLiveFeed_Hide();
        PlayVod_isOn = true;
        Play_showBufferDialog();
        Play_ResumeAfterOnlineCounter = 0;

        //Get the time from android as it can save it more reliably
        Main_values.vodOffset = Android.getsavedtime() / 1000;

        window.clearInterval(Play_ResumeAfterOnlineId);

        if (navigator.onLine) PlayVod_ResumeAfterOnline();
        else Play_ResumeAfterOnlineId = window.setInterval(PlayVod_ResumeAfterOnline, 100);

        Play_EndSet(2);
        window.clearInterval(PlayVod_SaveOffsetId);
        PlayVod_SaveOffsetId = window.setInterval(PlayVod_SaveOffset, 60000);

        window.clearInterval(Play_ShowPanelStatusId);
        Play_ShowPanelStatusId = window.setInterval(function() {
            Play_UpdateStatus(2);
        }, 1000);
    }

    function PlayVod_ResumeAfterOnline(forced) {
        if (forced || navigator.onLine || Play_ResumeAfterOnlineCounter > 200) {
            window.clearInterval(Play_ResumeAfterOnlineId);
            PlayVod_state = Play_STATE_LOADING_TOKEN;
            PlayVod_loadData();
        }
        Play_ResumeAfterOnlineCounter++;
    }

    function PlayVod_SaveOffset() {
        //Prevent setting it to 0 before it was used
        if (!Main_values.vodOffset) {
            Main_values.vodOffset = Main_IsNotBrowser ? (parseInt(Android.gettime() / 1000)) : 0;
            if (Main_values.vodOffset > 0) {
                Main_SaveValues();
                PlayVod_SaveVodIds();
            }
            Main_values.vodOffset = 0;
        }
    }


    function PlayVod_loadData() {
        PlayVod_loadingDataTry = 0;
        PlayVod_loadingDataTimeout = 2000;
        PlayVod_loadDataRequest();
    }

    var PlayVod_autoUrl;

    function PlayVod_loadDataRequest() {
        var theUrl,
            state = PlayVod_state === Play_STATE_LOADING_TOKEN;

        if (state) {
            theUrl = 'https://api.twitch.tv/api/vods/' + Main_values.ChannelVod_vodId + '/access_token?platform=_';
        } else {
            if (!PlayVod_tokenResponse.hasOwnProperty('token') || !PlayVod_tokenResponse.hasOwnProperty('sig')) {
                PlayVod_loadDataError();
                return;
            }
            theUrl = 'https://usher.ttvnw.net/vod/' + Main_values.ChannelVod_vodId +
                '.m3u8?&nauth=' + encodeURIComponent(PlayVod_tokenResponse.token) + '&nauthsig=' +
                PlayVod_tokenResponse.sig +
                '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true' +
                (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&cdm=wv&p=' + Main_RandomInt();
            //(Play_SupportsSource ? "&allow_source=true" : '') +
            //(Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&cdm=wv&p=' + Main_RandomInt();

            PlayVod_autoUrl = theUrl;

        }


        if (Main_IsNotBrowser) {
            var xmlHttp;

            if (state) xmlHttp = Android.mreadUrlHLS(theUrl);
            else xmlHttp = Android.mreadUrl(theUrl, Play_loadingDataTimeout, 0, null);

            if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
            else {
                PlayVod_loadDataError();
                return;
            }
            PlayVod_loadDataEnd(xmlHttp);

        } else PlayVod_loadDataSuccessFake();
    }

    function PlayVod_loadDataEnd(xmlHttp) {
        if (xmlHttp.status === 200) {
            if (xmlHttp.responseText.indexOf('"status":410') !== -1) PlayVod_loadDataError();
            else PlayVod_loadDataSuccess(xmlHttp.responseText);
        } else if (xmlHttp.status === 410) {
            //410 = api v3 is gone use v5 bug
            PlayVod_410Error();
        } else PlayVod_loadDataError();
    }

    function PlayVod_410Error() {
        Play_HideBufferDialog();
        Play_showWarningDialog(STR_410_ERROR);
        window.setTimeout(function() {
            if (PlayVod_isOn) PlayVod_shutdownStream();
        }, 3000);
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
                if (Main_IsNotBrowser) {
                    Play_HideBufferDialog();
                    Play_PlayEndStart(2);
                } else PlayVod_loadDataSuccessFake();
            }
        }
    }

    //Browsers crash trying to get the streams link
    function PlayVod_loadDataSuccessFake() {
        PlayVod_qualities = [{
                'id': 'Auto',
                'band': 0,
                'codec': 'avc',
                'url': 'https://auto'
            },
            {
                'id': '1080p60 | source ',
                'band': '| 10.00Mbps',
                'codec': ' | avc',
                'url': 'https://souce'
            },
            {
                'id': '720p60',
                'band': ' | 5.00Mbps',
                'codec': ' | avc',
                'url': 'https://720p60'
            },
            {
                'id': '720p',
                'band': ' | 2.50Mbps',
                'codec': ' | avc',
                'url': 'https://720'
            },
            {
                'id': '480p',
                'band': ' | 2.50Mbps',
                'codec': ' | avc',
                'url': 'https://480'
            },
            {
                'id': '320p',
                'band': ' | 2.50Mbps',
                'codec': ' | avc',
                'url': 'https://320'
            },
        ];
        PlayVod_state = Play_STATE_PLAYING;
        if (PlayVod_isOn) PlayVod_qualityChanged();
        if (PlayVod_HasVodInfo) Main_Set_history('vod', Main_values_Play_data);
    }

    function PlayVod_loadDataSuccess(responseText) {
        if (PlayVod_state === Play_STATE_LOADING_TOKEN) {
            PlayVod_tokenResponse = JSON.parse(responseText);
            PlayVod_state = Play_STATE_LOADING_PLAYLIST;
            PlayVod_loadData();
        } else if (PlayVod_state === Play_STATE_LOADING_PLAYLIST) {

            //Low end device will not support High Level 5.2 video/mp4; codecs="avc1.640034"
            //        if (!Main_SupportsAvc1High && Play_SupportsSource && responseText.indexOf('avc1.640034') !== -1) {
            //            Play_SupportsSource = false;
            //            PlayVod_loadData();
            //            return;
            //        }

            PlayVod_playlistResponse = responseText;
            PlayVod_qualities = Play_extractQualities(PlayVod_playlistResponse);
            PlayVod_state = Play_STATE_PLAYING;
            if (Main_IsNotBrowser) Android.SetAuto(PlayVod_autoUrl);
            if (PlayVod_isOn) PlayVod_qualityChanged();
            if (PlayVod_HasVodInfo) Main_Set_history('vod', Main_values_Play_data);
        }
    }

    function PlayVod_loadDataCheckSub() {
        if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
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
            Play_showWarningDialog(STR_IS_SUB_ONLY + STR_IS_SUB_IS_SUB + STR_410_FEATURING);
            window.setTimeout(function() {
                if (PlayVod_isOn) PlayVod_shutdownStream();
            }, 4000);
        }
    }

    function PlayVod_qualityChanged() {
        PlayVod_qualityIndex = 1;
        PlayVod_playingUrl = PlayVod_qualities[1].url;

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

        PlayVod_quality = PlayVod_qualities[PlayVod_qualityIndex].id;
        PlayVod_qualityPlaying = PlayVod_quality;

        PlayVod_SetHtmlQuality('stream_quality');
        PlayVod_onPlayer();
        //Play_PannelEndStart(2);
    }

    function PlayVod_onPlayer() {
        if (Main_isDebug) console.log('PlayVod_onPlayer:', '\n' + '\n"' + PlayVod_playingUrl + '"\n');

        if (Main_IsNotBrowser) {
            if (Main_values.vodOffset) {
                Chat_offset = Main_values.vodOffset;
                Chat_Init();
                PlayVod_onPlayerStartPlay(Main_values.vodOffset * 1000);
                Main_values.vodOffset = 0;
            } else {
                PlayVod_onPlayerStartPlay(Android.gettime());
            }
        }

        PlayVod_replay = false;
        if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
        Play_SetFullScreen(Play_isFullScreen);
    }

    function PlayVod_onPlayerStartPlay(time) {
        if (PlayVod_isOn) {
            if (PlayVod_quality.indexOf("Auto") !== -1) Android.StartAuto(2, PlayVod_replay ? -1 : time);
            else Android.startVideoOffset(PlayVod_playingUrl, 2, PlayVod_replay ? -1 : time);
        }
    }

    function PlayVod_UpdateDuration(duration) {
        ChannelVod_DurationSeconds = duration / 1000;
        Main_textContent('progress_bar_duration', Play_timeS(ChannelVod_DurationSeconds));
        PlayVod_RefreshProgressBarr();
    }

    function PlayVod_shutdownStream() {
        if (PlayVod_isOn) {
            PlayVod_PreshutdownStream(true);
            PlayVod_qualities = [];
            Play_exitMain();
        }
    }

    function PlayVod_PreshutdownStream(saveOffset) {
        if (saveOffset) PlayVod_SaveVodIds();
        if (Main_IsNotBrowser) Android.stopVideo(2);
        Main_ShowElement('controls_holder');
        Main_ShowElement('progress_pause_holder');
        PlayVod_isOn = false;
        window.clearInterval(PlayVod_SaveOffsetId);
        window.clearInterval(PlayVod_updateStreamInfId);
        Main_values.Play_WasPlaying = 0;
        Chat_Clear();
        UserLiveFeed_Hide();
        Play_ClearPlayer();
        PlayVod_ClearVod();
    }

    function PlayVod_ClearVod() {
        document.body.removeEventListener("keydown", PlayVod_handleKeyDown);
        Main_values.vodOffset = 0;
        window.clearInterval(PlayVod_streamInfoTimerId);
        ChannelVod_DurationSeconds = 0;
    }

    function PlayVod_hidePanel() {
        //return;//return;
        PlayVod_jumpCount = 0;
        PlayVod_IsJumping = false;
        PlayVod_addToJump = 0;
        Play_clearHidePanel();
        Play_ForceHidePannel();
        if (Main_IsNotBrowser) PlayVod_ProgresBarrUpdate((Android.gettime() / 1000), ChannelVod_DurationSeconds, true);
        Main_innerHTML('progress_bar_jump_to', STR_SPACE);
        document.getElementById('progress_bar_steps').style.display = 'none';
        PlayVod_quality = PlayVod_qualityPlaying;
        window.clearInterval(PlayVod_RefreshProgressBarrID);
    }

    function PlayVod_showPanel(autoHide) {
        PlayVod_RefreshProgressBarr(autoHide);
        Play_clock();
        Play_CleanHideExit();
        window.clearInterval(PlayVod_RefreshProgressBarrID);
        PlayVod_RefreshProgressBarrID = window.setInterval(function() {
            PlayVod_RefreshProgressBarr(autoHide);
        }, 1000);

        if (autoHide) {
            PlayVod_IconsBottonResetFocus();
            PlayVod_qualityIndexReset();
            Play_qualityDisplay(PlayVod_getQualitiesCount, PlayVod_qualityIndex, PlayVod_SetHtmlQuality);
            if (PlayVod_qualityPlaying.indexOf("Auto") === -1) PlayVod_SetHtmlQuality('stream_quality');
            Play_clearHidePanel();
            PlayExtra_ResetSpeed();
            PlayVod_setHidePanel();
        }
        Play_ForceShowPannel();
    }

    function PlayVod_RefreshProgressBarr(show) {
        if (Main_IsNotBrowser) PlayVod_ProgresBarrUpdate((Android.gettime() / 1000), ChannelVod_DurationSeconds, !PlayVod_IsJumping);

        if (!Play_Status_Always_On) {
            if (Main_IsNotBrowser && PlayVod_qualityPlaying.indexOf("Auto") !== -1 && show)
                Play_getVideoQuality(false, PlayVod_SetHtmlQuality);

            if (Main_IsNotBrowser) Play_VideoStatus(false);
            else Play_VideoStatusTest();
        }
    }

    function PlayVod_IconsBottonResetFocus() {
        PlayVod_PanelY = 1;
        PlayClip_EnterPos = 0;
        PlayVod_IconsBottonFocus();
    }

    function PlayVod_IconsBottonFocus() {
        if (PlayVod_PanelY < 0) {
            PlayVod_PanelY = 0;
            return;
        }
        Main_RemoveClass('pause_button', 'progress_bar_div_focus');
        Main_RemoveClass('next_button', 'progress_bar_div_focus');
        Main_RemoveClass('back_button', 'progress_bar_div_focus');
        Main_RemoveClass('progress_bar_div', 'progress_bar_div_focus');

        if (!PlayVod_PanelY) { //progress_bar
            Main_AddClass('progress_bar_div', 'progress_bar_div_focus');
            Play_IconsRemoveFocus();
            if (PlayVod_addToJump) {
                PlayVod_jumpTime();
                document.getElementById('progress_bar_steps').style.display = 'inline-block';
            }
        } else if (PlayVod_PanelY === 1) { //pause/next/back buttons
            if (!PlayClip_EnterPos) { //pause
                Main_AddClass('pause_button', 'progress_bar_div_focus');
            } else if (PlayClip_EnterPos === 1) { //next
                Main_AddClass('next_button', 'progress_bar_div_focus');
            } else if (PlayClip_EnterPos === -1) { //back
                Main_AddClass('back_button', 'progress_bar_div_focus');
            }

            Play_IconsRemoveFocus();
            Main_innerHTML('progress_bar_jump_to', STR_SPACE);
            document.getElementById('progress_bar_steps').style.display = 'none';
        } else if (PlayVod_PanelY === 2) { //botton icons
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

    function PlayVod_SetHtmlQuality(element) {
        if (!PlayVod_qualities[PlayVod_qualityIndex] || !PlayVod_qualities[PlayVod_qualityIndex].hasOwnProperty('id')) return;

        PlayVod_quality = PlayVod_qualities[PlayVod_qualityIndex].id;

        var quality_string = '';
        if (PlayVod_quality.indexOf('source') !== -1) quality_string = PlayVod_quality.replace("source", STR_SOURCE);
        else quality_string = PlayVod_quality;

        quality_string += PlayVod_quality.indexOf('Auto') === -1 ? PlayVod_qualities[PlayVod_qualityIndex].band + PlayVod_qualities[PlayVod_qualityIndex].codec : "";

        Main_textContent(element, quality_string);
    }

    function PlayVod_getQualitiesCount() {
        return PlayVod_qualities.length;
    }

    function PlayVod_ProgresBarrUpdate(current_time_seconds, duration_seconds, update_bar) {
        Main_textContent('progress_bar_current_time', Play_timeS(current_time_seconds));
        if (update_bar) Play_ProgresBarrElm.style.width = ((current_time_seconds / duration_seconds) * 100) + '%';
    }

    function PlayVod_jump() {
        if (!Play_isEndDialogVisible()) {

            if (PlayVod_isOn) {
                Chat_Pause();
                Chat_offset = PlayVod_TimeToJump;
                Main_values.vodOffset = PlayVod_TimeToJump;
                Main_SaveValues();
                Main_values.vodOffset = 0;
            } else Chat_offset = ChannelVod_vodOffset;

            if (Main_IsNotBrowser) {
                Android.mseekTo(PlayVod_TimeToJump > 0 ? (PlayVod_TimeToJump * 1000) : 0);
            }
            window.setTimeout(PlayVod_SaveOffset, 1000);
            if (PlayClip_HasVOD) Chat_Init();
        }
        Main_innerHTML('progress_bar_jump_to', STR_SPACE);
        document.getElementById('progress_bar_steps').style.display = 'none';
        Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i> </div>');
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
        var currentTime = Main_IsNotBrowser ? (Android.gettime() / 1000) : 0;

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
        Main_history_UpdateVod(Main_values.ChannelVod_vodId, Main_IsNotBrowser ? (parseInt(Android.gettime() / 1000)) : 0);
    }

    function Play_showVodDialog() {
        Main_HideElement('controls_holder');
        PlayVod_showPanel(false);
        Main_textContent('stream_quality', '');
        Main_innerHTML("dialog_vod_saved_text", STR_FROM + Play_timeMs(PlayVod_VodOffset * 1000));
        Main_ShowElement('dialog_vod_start');
    }

    function Play_HideVodDialog() {
        PlayVod_hidePanel();
        Main_HideElement('dialog_vod_start');
        PlayVod_IconsResetFocus();
        window.setTimeout(function() {
            Main_ShowElement('controls_holder');
        }, 1000);
    }

    function Play_isVodDialogVisible() {
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
        Play_showBufferDialog();
        Main_ready(function() {
            if (!fromStart) {
                Main_values.vodOffset = PlayVod_VodOffset;
                PlayVod_currentTime = Main_values.vodOffset * 1000;
                PlayVod_ProgresBarrUpdate(Main_values.vodOffset, ChannelVod_DurationSeconds, true);
                PlayVod_PosStart();
            } else {
                Main_history_UpdateVod(Main_values.ChannelVod_vodId, 0);
                Main_values.vodOffset = 0;
                PlayVod_Start();
            }
        });
    }

    function PlayVod_OpenLiveStream() {
        PlayVod_PreshutdownStream(true);
        Main_OpenLiveStream(UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX], UserLiveFeed_ids, PlayVod_handleKeyDown);
    }

    function PlayVod_handleKeyDown(e) {
        if (PlayVod_state !== Play_STATE_PLAYING && !Play_isVodDialogVisible()) {
            switch (e.keyCode) {
                case KEY_STOP:
                    Play_CleanHideExit();
                    PlayVod_shutdownStream();
                    break;
                case KEY_RETURN_Q:
                case KEY_KEYBOARD_BACKSPACE:
                case KEY_RETURN:
                    if (Play_ExitDialogVisible() || Play_SingleClickExit) {
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
                    if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) UserLiveFeed_KeyRightLeft(-1);
                    else if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown()) {
                        Play_ChatPositions++;
                        Play_ChatPosition();
                        Play_controls[Play_controlsChatPos].defaultValue = Play_ChatPositions;
                        Play_controls[Play_controlsChatPos].setLable();
                    } else if (Play_isPanelShown() && !Play_isVodDialogVisible()) {
                        Play_clearHidePanel();
                        if (PlayVod_PanelY === 2) Play_BottomLeftRigt(2, -1);
                        else if (!PlayVod_PanelY) {
                            PlayVod_jumpStart(-1, ChannelVod_DurationSeconds);
                            PlayVod_ProgressBaroffset = 2500;
                        }
                        PlayVod_setHidePanel();
                    } else if (Play_isVodDialogVisible()) {
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
                    } else if (!Play_isVodDialogVisible()) PlayVod_showPanel(true);
                    break;
                case KEY_RIGHT:
                    if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) UserLiveFeed_KeyRightLeft(1);
                    else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible()) {
                        Play_controls[Play_controlsChat].enterKey(2);
                    } else if (Play_isPanelShown() && !Play_isVodDialogVisible()) {
                        Play_clearHidePanel();
                        if (PlayVod_PanelY === 2) Play_BottomLeftRigt(2, 1);
                        else if (!PlayVod_PanelY) {
                            PlayVod_jumpStart(1, ChannelVod_DurationSeconds);
                            PlayVod_ProgressBaroffset = 2500;
                        }
                        PlayVod_setHidePanel();
                    } else if (Play_isVodDialogVisible()) {
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
                    } else if (!Play_isVodDialogVisible()) PlayVod_showPanel(true);
                    break;
                case KEY_UP:
                    if (Play_isEndDialogVisible() || UserLiveFeed_isFeedShow()) {
                        Play_EndTextClear();
                        document.body.removeEventListener("keydown", PlayVod_handleKeyDown, false);
                        document.body.addEventListener("keyup", Play_handleKeyUp, false);
                        Play_EndUpclear = false;
                        Play_EndUpclearCalback = PlayVod_handleKeyDown;
                        Play_EndUpclearID = window.setTimeout(Play_keyUpEnd, 250);
                    } else if (Play_isPanelShown() && !Play_isVodDialogVisible()) {
                        Play_clearHidePanel();
                        if (PlayVod_PanelY < 2) {
                            PlayVod_PanelY--;
                            PlayVod_IconsBottonFocus();
                        } else Play_BottomUpDown(2, 1);
                        PlayVod_setHidePanel();
                    } else if (!UserLiveFeed_isFeedShow() && !Play_isVodDialogVisible()) UserLiveFeed_ShowFeed();
                    else if (!Play_isVodDialogVisible()) PlayVod_showPanel(true);
                    break;
                case KEY_DOWN:
                    if (Play_isEndDialogVisible()) Play_EndDialogUpDown(1);
                    else if (Play_isPanelShown() && !Play_isVodDialogVisible()) {
                        Play_clearHidePanel();
                        if (PlayVod_PanelY < 2) {
                            PlayVod_PanelY++;
                            PlayVod_IconsBottonFocus();
                        } else Play_BottomUpDown(2, -1);
                        PlayVod_setHidePanel();
                    } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_KeyUpDown(1);
                    else if (Play_isFullScreen && Play_isChatShown()) {
                        Play_KeyChatSizeChage();
                    } else if (!Play_isVodDialogVisible()) PlayVod_showPanel(true);
                    break;
                case KEY_ENTER:
                    if (Play_isVodDialogVisible()) PlayVod_DialogPressed(PlayVod_VodPositions);
                    else if (Play_isEndDialogVisible()) {
                        if (Play_EndFocus) Play_EndDialogPressed(2);
                        else {
                            Play_EndDialogEnter = 2;
                            Play_EndUpclearCalback = PlayVod_handleKeyDown;
                            Play_SavePlayData();
                            Main_OpenLiveStream(UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX], UserLiveFeed_ids, Play_handleKeyDown);
                        }
                    } else if (Play_isPanelShown()) {
                        Play_clearHidePanel();
                        if (!PlayVod_PanelY) {
                            if (PlayVod_addToJump) PlayVod_jump();
                        } else if (PlayVod_PanelY === 1) {
                            if (!Main_values.Play_ChatForceDisable) {
                                if (Play_isNotplaying()) Chat_Play(Chat_Id);
                                else Chat_Pause();
                            }
                            if (!Play_isEndDialogVisible()) Play_KeyPause(2);
                        } else Play_BottomOptionsPressed(2);
                        PlayVod_setHidePanel();
                    } else if (UserLiveFeed_isFeedShow()) Play_CheckIfIsLiveStart(PlayVod_OpenLiveStream);
                    else PlayVod_showPanel(true);
                    break;
                case KEY_STOP:
                    Play_CleanHideExit();
                    PlayVod_shutdownStream();
                    break;
                case KEY_RETURN_Q:
                case KEY_KEYBOARD_BACKSPACE:
                case KEY_RETURN:
                    Play_KeyReturn(true);
                    break;
                case KEY_PLAY:
                    if (!Play_isEndDialogVisible() && Play_isNotplaying()) {
                        Play_KeyPause(2);
                        if (!Main_values.Play_ChatForceDisable) Chat_Play(Chat_Id);
                    }
                    break;
                case KEY_PAUSE:
                    if (!Play_isEndDialogVisible() && !Play_isNotplaying()) {
                        Play_KeyPause(2);
                        if (!Main_values.Play_ChatForceDisable) Chat_Pause();
                    }
                    break;
                case KEY_PLAYPAUSE:
                case KEY_KEYBOARD_SPACE:
                    if (!Main_values.Play_ChatForceDisable) {
                        if (Play_isNotplaying()) Chat_Play(Chat_Id);
                        else Chat_Pause();
                    }
                    if (!Play_isEndDialogVisible()) Play_KeyPause(2);
                    break;
                case KEY_REFRESH:
                    if (UserLiveFeed_isFeedShow()) Play_CheckIfIsLiveStart(PlayVod_OpenLiveStream);
                    break;
                case KEY_CHAT:
                    Play_controls[Play_controlsChat].enterKey(2);
                    break;
                case KEY_PG_UP:
                    Play_Panelcounter = Play_controlsChatPos;
                    Play_BottomUpDown(2, 1);
                    Play_Panelcounter = Play_controlsDefault;
                    break;
                case KEY_PG_DOWN:
                    Play_Panelcounter = Play_controlsChatPos;
                    Play_BottomUpDown(2, -1);
                    Play_Panelcounter = Play_controlsDefault;
                    break;
                case KEY_MEDIA_FAST_FORWARD:
                    if (!Play_isEndDialogVisible()) PlayVod_FastBackForward(1);
                    break;
                case KEY_MEDIA_REWIND:
                    if (!Play_isEndDialogVisible()) PlayVod_FastBackForward(-1);
                    break;
                default:
                    break;
            }
        }
    }

    function PlayVod_FastBackForward(position) {
        if (!Play_isPanelShown()) PlayVod_showPanel(true);
        Play_clearHidePanel();
        PlayVod_PanelY = 0;
        PlayVod_IconsBottonFocus();

        PlayVod_jumpStart(position, ChannelVod_DurationSeconds);
        PlayVod_ProgressBaroffset = 2500;
        PlayVod_setHidePanel();
    }
    //Variable initialization
    var inUseObj = {};
    var Screens_clear = false;
    var Screens_KeyEnterID;
    var Screens_ScrollAnimationTimeout = 350; //Same time as animate_height_transition
    var Screens_ChangeFocusAnimationFinished = true;
    var Screens_ChangeFocusAnimationFast = false;
    var Screens_SettingDoAnimations = true;
    //Start the app in async mode by default
    var Screens_ForceSync = false;

    //Initiate all Secondary screens obj and they properties
    function Screens_InitScreens() {
        //Live screens
        ScreensObj_InitLive();
        ScreensObj_InitFeatured();
        ScreensObj_InitAGame();
        //Live user screens
        ScreensObj_InitUserHost();
        ScreensObj_InitUserLive();

        //Clips screens
        ScreensObj_InitClip();
        ScreensObj_InitChannelClip();
        ScreensObj_InitAGameClip();

        //Games screens
        ScreensObj_InitGame();
        //Games user screen
        ScreensObj_InitUserGames();

        //Vod screens
        ScreensObj_InitVod();
        ScreensObj_InitAGameVod();
        ScreensObj_InitChannelVod();
        //Vod user screen
        ScreensObj_InitUserVod();

        //Channels screens
        ScreensObj_InitUserChannels();

        //Search screen
        ScreensObj_InitSearchGames();
        ScreensObj_InitSearchLive();
        ScreensObj_InitSearchChannels();

        //History screen
        ScreensObj_HistoryLive();
        ScreensObj_HistoryVod();
        ScreensObj_HistoryClip();
    }

    //TODO cleanup not used when finished migrate all
    function Screens_ScreenIds(base) {
        return [
            base + '_thumbdiv', //0
            base + '_img', //1
            base + '_infodiv', //2
            base + '_title', //3
            base + '_createdon', //4
            base + '_game', //5
            base + '_viewers', //6
            base + '_duration', //7
            base + '_cell', //8
            'cpempty_', //9
            base + '_scroll', //10
            base + '_lang', //11
            base + '_row' //12
        ];
    }

    function Screens_assign() {
        var ret = {},
            i = 0,
            j;
        for (i; i < arguments.length; i++) {

            var obj = arguments[i],
                keys = Object.keys(obj);

            for (j = 0; j < keys.length; j++)
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
        Main_ShowElement(inUseObj.ids[10]);

        if (inUseObj.status) {
            Main_YRst(inUseObj.posY);
            Screens_addFocus(true);
            Main_SaveValues();
        } else Screens_StartLoad();
    }

    function Screens_exit() {
        Main_addFocusVideoOffset = 0;
        if (inUseObj.label_exit) inUseObj.label_exit();
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
        Main_HideElement(inUseObj.ids[10]);
        Main_HideWarningDialog();
        Screens_ClearAnimation();
    }

    function Screens_StartLoad() {
        Main_showLoadDialog();
        Main_updateclock();
        Main_empty(inUseObj.table);
        Main_HideWarningDialog();

        //After one refresh reset helix
        if (inUseObj.useHelix) {
            if (inUseObj.forceResetHelix) inUseObj.resetHelix();
            else inUseObj.forceResetHelix = true;
        }

        inUseObj.cursor = null;
        inUseObj.after = '';
        inUseObj.status = false;
        inUseObj.TopRowCreated = false;
        inUseObj.offset = 0;
        inUseObj.offsettop = 0;
        inUseObj.idObject = {};
        inUseObj.Cells = [];
        inUseObj.FirstLoad = true;
        inUseObj.itemsCount = 0;
        inUseObj.posX = 0;
        inUseObj.posY = 0;
        inUseObj.row_id = 0;
        inUseObj.currY = 0;
        inUseObj.loadChannelOffsset = 0;
        inUseObj.followerChannels = '';
        inUseObj.followerChannelsDone = false;
        inUseObj.coloumn_id = 0;
        inUseObj.data = null;
        inUseObj.data_cursor = 0;
        inUseObj.dataEnded = false;
        Main_CounterDialogRst();
        Screens_loadDataRequestStart();
    }

    function Screens_loadDataRequestStart() {
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
        if (inUseObj.isHistory)
            inUseObj.history_concatenate();
        else if (inUseObj.use_hls)
            BasehttpHlsGet(inUseObj.url + Main_TwithcV5Flag, inUseObj.loadingDataTimeout, inUseObj.HeaderQuatity, inUseObj.token, Screens_concatenate, Screens_loadDataError);
        else if (Main_IsNotBrowser && !inUseObj.itemsCount && Screens_ForceSync)
            BaseAndroidhttpGet(inUseObj.url + Main_TwithcV5Flag, inUseObj.loadingDataTimeout, inUseObj.HeaderQuatity, inUseObj.token, Screens_concatenate, Screens_loadDataError);
        else
            BasexmlHttpGet(inUseObj.url + Main_TwithcV5Flag, inUseObj.loadingDataTimeout, inUseObj.HeaderQuatity, inUseObj.token, Screens_concatenate, Screens_loadDataError, false);

        Screens_ForceSync = true;
    }

    function Screens_loadDataError() {
        inUseObj.loadingDataTry++;
        if (inUseObj.loadingDataTry < inUseObj.loadingDataTryMax) {
            inUseObj.loadingDataTimeout += 500;
            Screens_loadDataRequest();
        } else Screens_loadDatafail();
    }

    function Screens_loadDatafail() {
        inUseObj.loadingData = false;
        if (!inUseObj.itemsCount) {
            Sidepannel_SetTopOpacity(Main_values.Main_Go);
            inUseObj.FirstLoad = false;
            Main_HideLoadDialog();
            Main_showWarningDialog(STR_REFRESH_PROBLEM);
            inUseObj.key_exit();
            Main_ShowElement('topbar');
            Main_ShowElement('side_panel_new_holder');
        } else inUseObj.dataEnded = true;
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

        if (inUseObj.HasSwitches && !inUseObj.TopRowCreated) inUseObj.addSwitches();

        if (response_items) {

            if (!inUseObj.row_id) {
                inUseObj.row = document.createElement('div');
                if (inUseObj.rowClass) inUseObj.row.classList.add(inUseObj.rowClass);
                inUseObj.row.id = inUseObj.ids[12] + inUseObj.row_id;
            }

            var response_rows = Math.ceil(response_items / inUseObj.ColoumnsCount);

            var max_row = inUseObj.row_id + response_rows;

            for (inUseObj.row_id; inUseObj.row_id < max_row;) {

                if (inUseObj.coloumn_id === inUseObj.ColoumnsCount) {
                    inUseObj.row = document.createElement('div');
                    if (inUseObj.rowClass) inUseObj.row.classList.add(inUseObj.rowClass);
                    inUseObj.row.id = inUseObj.ids[12] + inUseObj.row_id;
                    inUseObj.coloumn_id = 0;
                }

                for (inUseObj.coloumn_id; inUseObj.coloumn_id < inUseObj.ColoumnsCount && inUseObj.data_cursor < inUseObj.data.length; inUseObj.data_cursor++) {
                    //TODO understand and fix before the code reaches this point way a cell is undefined some times
                    if (inUseObj.data[inUseObj.data_cursor]) inUseObj.addCell(inUseObj.data[inUseObj.data_cursor]);
                }

                //doc.appendChild(inUseObj.row);
                if (inUseObj.coloumn_id === inUseObj.ColoumnsCount) {
                    inUseObj.Cells[inUseObj.row_id] = inUseObj.row;
                    inUseObj.row_id++;
                } else if (inUseObj.data_cursor >= inUseObj.data.length) {
                    if (inUseObj.row.innerHTML !== '') inUseObj.Cells[inUseObj.row_id] = inUseObj.row;
                    break;
                }
            }
        }
        inUseObj.emptyContent = !response_items && !inUseObj.status;
        Screens_loadDataSuccessFinish();
    }

    function Screens_createCell(id_attribute, Data_content, html_content) {
        var div = document.createElement('div');

        div.setAttribute('id', id_attribute);
        div.setAttribute(Main_DataAttribute, JSON.stringify(Data_content));
        div.classList.add(inUseObj.thumbclass);

        div.innerHTML = html_content;

        return div;
    }

    function Screens_createCellChannel(id, idArray, valuesArray) {
        return Screens_createCell(
            idArray[8] + id,
            valuesArray,
            '<div id="' + idArray[0] + id + '" class="stream_thumbnail_channel" ><div class="stream_thumbnail_channel_img"><img id="' + idArray[1] +
            id + '" alt="" class="stream_img" src="' + valuesArray[2] +
            '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\';"></div>' +
            '<div id="' + idArray[2] + id + '" class="stream_thumbnail_channel_text_holder">' +
            '<div id="' + idArray[3] + id + '" class="stream_info_channel_name">' + valuesArray[3] +
            (valuesArray[4] ? STR_SPACE + STR_SPACE +
                '</div><div class="stream_info_channel_partner_icon"><img style="width: 2ch;" alt="" src="' +
                IMG_PARTNER + '">' : "") + '</div></div></div>');
    }

    function Screens_createCellGame(id, idArray, valuesArray) {
        return Screens_createCell(
            idArray[5] + id,
            valuesArray,
            '<div id="' + idArray[0] + id + '" class="stream_thumbnail_game"><div class="stream_thumbnail_live_game"><img id="' +
            idArray[1] + id + '" class="stream_img" alt="" src="' + valuesArray[0] +
            '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\';"></div><div id="' +
            idArray[2] + id +
            '" class="stream_thumbnail_game_text_holder"><span class="stream_spam_text_holder"><div id="<div id="' +
            idArray[3] + id + '" class="stream_info_game_name">' + valuesArray[1] + '</div>' +
            (valuesArray[2] !== '' ? '<div id="' + idArray[4] + id +
                '"class="stream_info_live" style="width: 100%; display: inline-block;">' + valuesArray[2] +
                '</div>' : '') + '</div></span></div>');
    }

    function Screens_createCellClip(id, idArray, valuesArray, Extra_when, Extra_until) {
        var playing = (valuesArray[3] !== "" ? STR_PLAYING + valuesArray[3] : "");

        return Screens_createCell(
            idArray[8] + id,
            valuesArray,
            '<div id="' + idArray[0] + id + '" class="stream_thumbnail_live"><div class="stream_thumbnail_live_img"><img id="' +
            idArray[1] + id + '" class="stream_img" alt="" src="' + valuesArray[15] +
            '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\';"></div><div id="' +
            idArray[2] + id +
            '" class="stream_thumbnail_live_text_holder"><span class="stream_spam_text_holder"><div style="line-height: 1.6ch;"><div id="' +
            idArray[3] + id + '" class="stream_info_live_name" style="width: 72%; display: inline-block;">' +
            valuesArray[4] + '</div><div id="' + idArray[7] + id +
            '"class="stream_info_live" style="width:27%; float: right; text-align: right; display: inline-block;">' +
            valuesArray[11] + '</div></div><div id="' + idArray[11] + id + '"class="' +
            (Extra_when ? 'stream_info_live_title_single_line' : 'stream_info_live_title') + '">' +
            valuesArray[10] + '</div>' +
            '<div id="' + idArray[4] + id + '"class="stream_info_live">' + playing + '</div>' +
            '<div style="line-height: 1.3ch;"><div id="' + idArray[6] + id +
            '"class="stream_info_live" style="width: auto; display: inline-block;">' + (valuesArray[16] ? valuesArray[16] : valuesArray[12]) + ',' + STR_SPACE + //Old sorting fix
            valuesArray[14] + '</div><div id="' + idArray[5] + id +
            '"class="stream_info_live" style="width: 6ch; display: inline-block; float: right; text-align: right;">' +
            Play_timeS(valuesArray[1]) + '</div></div>' +
            (Extra_when ? ('<div class="stream_info_live">' + STR_WATCHED + Main_videoCreatedAtWithHM(Extra_when) + STR_SPACE +
                STR_UNTIL + Play_timeS(Extra_until < valuesArray[1] ? Extra_until : valuesArray[1]) + '</div>') : '') +
            '</div></span></div></div>');
    }

    function Screens_createCellVod(id, idArray, valuesArray, Extra_when, Extra_until) {
        return Screens_createCell(
            idArray[8] + id,
            valuesArray,
            '<div id="' + idArray[0] + id + '" class="stream_thumbnail_live"><div id="' + idArray[6] + id + '" class="stream_thumbnail_live_img" ' +
            (valuesArray[8] ? ' style="width: 100%; padding-bottom: 56.25%; background-size: 0 0; background-image: url(' + valuesArray[8] + ');"' : '') +
            '><img id="' + idArray[1] + id + '" class="stream_img" alt="" src="' + valuesArray[0] +
            '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\';"></div><div id="' +
            idArray[2] + id +
            '" class="stream_thumbnail_live_text_holder"><span class="stream_spam_text_holder"><div style="line-height: 1.6ch;"><div id="' +
            idArray[3] + id + '" class="stream_info_live_name" style="width: 72%; display: inline-block;">' +
            valuesArray[1] + '</div><div id="' + idArray[7] + id +
            '"class="stream_info_live" style="width:27%; float: right; text-align: right; display: inline-block;">' + valuesArray[5] +
            '</div></div><div id="' + idArray[11] + id +
            '"class="' + (Extra_when ? 'stream_info_live_title_single_line' : 'stream_info_live_title') + '">' + valuesArray[10] + '</div>' +
            '<div id="' + idArray[9] + id + '"class="stream_info_live">' +
            (valuesArray[3] !== "" && valuesArray[3] !== null ? STR_STARTED + STR_PLAYING + valuesArray[3] : "") + '</div>' +
            '<div style="line-height: 1.3ch;"><div id="' + idArray[4] + id + '"class="stream_info_live" style="width: auto; display: inline-block;">' +
            valuesArray[2] + ',' + STR_SPACE + valuesArray[4] + '</div><div id="' + idArray[5] + id +
            '"class="stream_info_live" style="width: 9ch; display: inline-block; float: right; text-align: right;">' +
            Play_timeS(valuesArray[11]) + '</div></div>' +
            (Extra_when ? ('<div class="stream_info_live">' + STR_WATCHED + Main_videoCreatedAtWithHM(Extra_when) + STR_SPACE +
                STR_UNTIL + Play_timeS(Extra_until) + '</div>') : '') +
            '</span></div></div>');
    }

    //TODO uncomplicate this ifs
    function Screens_createCellLive(id, idArray, valuesArray, Extra_when, Extra_vodimg, force_VOD) {
        var ishosting = valuesArray[1].indexOf(STR_USER_HOSTING) !== -1;

        return Screens_createCell(
            idArray[8] + id,
            valuesArray,
            '<div id="' + idArray[0] + id + '" class="stream_thumbnail_live"><div class="stream_thumbnail_live_img"><img id="' +
            idArray[1] + id + '" class="stream_img" alt="" src="' +
            (force_VOD ? Extra_vodimg : (valuesArray[0].replace("{width}x{height}", Main_VideoSize) + Main_randomimg)) +
            (Extra_vodimg ?
                ('" onerror="this.onerror=function(){this.onerror=null;this.src=\'' + inUseObj.img_404 +
                    '\';};this.src=\'' + Extra_vodimg + '\';' +
                    'this.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].classList.add(\'hideimp\');' +
                    'this.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[2].classList.remove(\'hideimp\');" crossorigin="anonymous"></div><div id="') :
                ('" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\';"></div><div id="')) +
            idArray[2] + id +
            '" class="stream_thumbnail_live_text_holder"><span class="stream_spam_text_holder"><div style="line-height: 1.6ch;"><div id="' +
            idArray[3] + id + '" class="stream_info_live_name" style="width:' + (ishosting ? 99 : 66) + '%; display: inline-block;">' +
            '<i class="icon-' + (valuesArray[8] ? 'refresh' : 'circle') + ' live_icon strokedeline' + (force_VOD ? ' hideimp' : '') + '" style="color: ' +
            (valuesArray[8] ? '#FFFFFF' : ishosting ? '#FED000' : 'red') + ';"></i> ' +
            (Extra_vodimg || force_VOD ?
                ('<div class="vodicon_text ' + (force_VOD ? '' : 'hideimp') + '" style="background: #00a94b;">&nbsp;&nbsp;VOD&nbsp;&nbsp;</div>&nbsp;') :
                '<span ></span>') + //empty span to prevent error when childNodes[2].classList.remove
            valuesArray[1] + '</div><div id="' + idArray[7] + id +
            '"class="stream_info_live" style="width:' + (ishosting ? 0 : 33) + '%; float: right; text-align: right; display: inline-block;">' +
            valuesArray[5] + '</div></div>' +
            '<div id="' + idArray[4] + id + '"class="' +
            (Extra_when ? 'stream_info_live_title_single_line' : 'stream_info_live_title') + '">' + twemoji.parse(valuesArray[2]) + '</div>' +
            '<div id="' + idArray[5] + id + '"class="stream_info_live">' + (valuesArray[3] !== "" ? STR_PLAYING + valuesArray[3] : "") +
            '</div><div id="' + idArray[6] + id + '"class="stream_info_live">' +
            valuesArray[11] + valuesArray[4] + '</div>' +
            (Extra_when ? ('<div class="stream_info_live">' + STR_WATCHED + Main_videoCreatedAtWithHM(Extra_when) + STR_SPACE +
                STR_UNTIL + Play_timeMs(Extra_when - (new Date(valuesArray[12]).getTime())) + '</div>') : '') +
            '</span></div></div>');
    }

    function Screens_loadDataSuccessFinish() {
        if (!inUseObj.status) {
            if (Main_values.Main_Go === Main_aGame) AGame_Checkfallow();

            if (inUseObj.emptyContent) Main_showWarningDialog(inUseObj.empty_str());
            else {
                inUseObj.status = true;
                var doc = document.getElementById(inUseObj.table);
                for (var i = 0; i < (inUseObj.Cells.length < inUseObj.visiblerows ? inUseObj.Cells.length : inUseObj.visiblerows); i++)
                    doc.appendChild(inUseObj.Cells[i]);

            }
            inUseObj.FirstLoad = false;
            //TODO improve this check
            if (Main_FirstRun) {
                //Force reset some values as I have reset the Never_run_new value and some things may crash
                if (Main_values.Never_run_new) {
                    Main_GoBefore = Main_Live;
                    Main_values.Play_WasPlaying = 0;
                }
                Screens_ForceSync = false;

                if (Settings_value.restor_playback.defaultValue && Main_values.Play_WasPlaying && inUseObj.status) {

                    Main_ExitCurrent(Main_values.Main_Go);
                    Main_values.Main_Go = Main_GoBefore;
                    Play_showWarningDialog(STR_RESTORE_PLAYBACK_WARN);

                    Main_ready(function() {
                        if (Main_values.Play_WasPlaying === 1) {
                            if (Play_data.data.length > 0) {
                                Main_openStream();
                                Main_SwitchScreen(true);
                            } else Main_SwitchScreen(false);
                        } else {
                            if (!Main_values.vodOffset) Main_values.vodOffset = 1;
                            ChannelVod_DurationSeconds = Main_values.vodOffset + 1;

                            Main_openVod();
                            Main_SwitchScreen(true);
                        }

                        window.setTimeout(function() {
                            if (!Play_IsWarning) Play_HideWarningDialog();
                        }, 3000);
                        Screens_loadDataSuccessFinishEnd();
                    });
                } else if (Main_GoBefore !== Main_Live && Main_GoBefore !== Main_addUser &&
                    Main_GoBefore !== Main_Search) {
                    Main_HideElement(inUseObj.ids[10]);
                    Main_ready(function() {
                        Main_ExitCurrent(Main_values.Main_Go);
                        Main_values.Main_Go = Main_GoBefore;
                        Screens_RemoveAllFocus();
                        Main_SwitchScreenAction();
                        if (!Main_newUsercode) Screens_loadDataSuccessFinishEnd();
                        else {
                            Main_FirstRun = false;
                            Main_HideLoadDialog();
                        }
                    });
                } else {
                    Main_ready(function() {
                        //Values that need to be reset to prevent app odd behavier
                        Main_values.Search_isSearching = false;
                        Main_values.Main_BeforeChannelisSet = false;
                        Main_values.Main_BeforeAgameisSet = false;

                        if (Main_values.Never_run_new)
                            Main_showControlsDialog(Screens_handleKeyDown, Screens_handleKeyControls);

                        if (Main_values.Never_run_phone && !Main_isTV) {
                            Main_showphoneDialog(Main_values.Never_run_new ?
                                Screens_handleKeyControls : Screens_handleKeyDown, Screens_handleKeyControls);
                            Settings_value.global_font_offset.defaultValue = 6;
                            Main_setItem('global_font_offset', 7);
                            Main_textContent('global_font_offset', Settings_Obj_values('global_font_offset'));
                            calculateFontSize();
                            Main_values.Never_run_phone = false;
                        }

                        Main_values.Never_run_new = false;

                        Screens_addFocus(true);
                        Main_SaveValues();
                        Screens_loadDataSuccessFinishEnd();
                    });
                }
            } else {
                Screens_addFocus(true);
                Main_SaveValues();
                Screens_loadDataSuccessFinishEnd();
            }
        } else {
            Main_CounterDialog(inUseObj.posX, inUseObj.posY, inUseObj.ColoumnsCount, inUseObj.itemsCount);
        }
    }

    function Screens_handleKeyControls(event) {
        switch (event.keyCode) {
            case KEY_ENTER:
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                if (Main_isphoneDialogVisible()) {
                    Main_HidephoneDialog();
                    break;
                }
                Main_HideControlsDialog();
                Main_HideAboutDialog();
                document.body.addEventListener("keydown", Screens_handleKeyDown, false);
                document.body.removeEventListener("keydown", Screens_handleKeyControls);
                Screens_addFocus(true);
                break;
            default:
                break;
        }
    }

    function Screens_loadDataSuccessFinishEnd() {
        Main_FirstRun = false;
        Main_HideLoadDialog();
        Main_ShowElement('topbar');
        Main_ShowElement('side_panel_new_holder');

        if (Main_values.Sidepannel_IsUser) Sidepannel_SetUserLables();
        else Sidepannel_SetDefaultLables();

        Sidepannel_SetTopOpacity(Main_values.Main_Go);
    }

    function Screens_addFocus(forceScroll) {

        if (inUseObj.emptyContent) {
            if (inUseObj.HasSwitches) inUseObj.posY = -1;
            else {
                inUseObj.key_exit(inUseObj.emptyContent);
                return;
            }
        }
        if (inUseObj.posY < 0) {
            Screens_addFocusFallow();
            //Reset screen position
            document.getElementById(inUseObj.ids[10]).style.top = '';
            if (!inUseObj.emptyContent)
                Main_CounterDialog(inUseObj.posX, inUseObj.posY + 1, inUseObj.ColoumnsCount, inUseObj.itemsCount);

            return;
        }

        //Load more as the data is getting used
        if ((inUseObj.posY > 2) && (inUseObj.data_cursor + Main_ItemsLimitMax) > inUseObj.data.length && !inUseObj.dataEnded && !inUseObj.loadingData) {
            Screens_loadDataRequestStart();
        } else if ((inUseObj.posY + inUseObj.ItemsReloadLimit) > (inUseObj.itemsCount / inUseObj.ColoumnsCount) && inUseObj.data_cursor < inUseObj.data.length) {
            inUseObj.loadDataSuccess();
        }

        inUseObj.addrow(forceScroll, inUseObj.posY);
    }

    function Screens_ThumbNotNull(thumbnail) {
        return document.getElementById(thumbnail) !== null;
    }


    function Screens_addrowChannel(forceScroll, y) {
        if (inUseObj.currY < y) { // down
            inUseObj.currY = inUseObj.posY;
            if (y > 2) Screens_addrowChannelDown(y);
        } else if (inUseObj.currY > y) { // Up
            inUseObj.currY = inUseObj.posY;
            if (y > 1 && (inUseObj.Cells.length) > (y + 3)) {
                var doc = document.getElementById(inUseObj.table);
                doc.insertBefore(inUseObj.Cells[y - 2], doc.childNodes[0]);
                document.getElementById(inUseObj.ids[12] + (y - 2)).classList.add('animate_height');

                if (Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
                    !Screens_ChangeFocusAnimationFast) { //If with animation
                    Screens_ChangeFocusAnimationFinished = false;
                    Screens_ChangeFocusAnimationFast = true;

                    Main_ready(function() {
                        document.getElementById(inUseObj.ids[12] + (y - 2)).classList.remove('animate_height');
                    });

                    window.setTimeout(function() {
                        Screens_RemoveElement(inUseObj.ids[12] + (y + 3));
                        Screens_ChangeFocusAnimationFinished = true;

                    }, Screens_ScrollAnimationTimeout);
                } else {
                    document.getElementById(inUseObj.ids[12] + (y - 2)).classList.remove('animate_height');
                    Screens_RemoveElement(inUseObj.ids[12] + (y + 3));
                }
            }
        }

        Screens_addrowEnd(forceScroll);
    }

    function Screens_addrowChannelDown(y) {
        if (inUseObj.Cells[y + 2]) {
            document.getElementById(inUseObj.table).appendChild(inUseObj.Cells[y + 2]);

            if (Screens_ThumbNotNull(inUseObj.ids[12] + (y - 3))) {
                if (Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
                    !Screens_ChangeFocusAnimationFast) { //If with animation
                    Screens_ChangeFocusAnimationFinished = false;
                    Screens_ChangeFocusAnimationFast = true;

                    document.getElementById(inUseObj.ids[12] + (y - 3)).classList.add('animate_height');

                    window.setTimeout(function() {
                        Screens_RemoveElement(inUseObj.ids[12] + (y - 3));
                        Screens_ChangeFocusAnimationFinished = true;
                    }, Screens_ScrollAnimationTimeout);

                } else Screens_RemoveElement(inUseObj.ids[12] + (y - 3));
            }

        } else if (inUseObj.loadingData) {
            //Technically we will not get here because
            //Key down or right (inUseObj.Cells.length - 1) >= (inUseObj.posY + 3) will hold the screen
            //but this works, the issue is related to slow to load more content
            //Only happens if scroll too fast
            window.setTimeout(function() {
                Screens_addrowChannelDown(y);
            }, 10);
        }
    }

    function Screens_addrow(forceScroll, y) {
        if (inUseObj.currY < y) { // down
            inUseObj.currY = inUseObj.posY;
            Screens_addrowDown(y);
        } else if (inUseObj.currY > y) { // Up
            inUseObj.currY = inUseObj.posY;
            if (y && (inUseObj.Cells.length) > (y + 1) && inUseObj.Cells[y + 2]) {
                var doc = document.getElementById(inUseObj.table);
                doc.insertBefore(inUseObj.Cells[y - 1], doc.childNodes[inUseObj.HasSwitches ? 1 : 0]);
                document.getElementById(inUseObj.ids[12] + (y - 1)).classList.add('animate_height');

                if (Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
                    !Screens_ChangeFocusAnimationFast) { //If with animation
                    Screens_ChangeFocusAnimationFinished = false;
                    Screens_ChangeFocusAnimationFast = true;

                    Main_ready(function() {
                        document.getElementById(inUseObj.ids[12] + (y - 1)).classList.remove('animate_height');
                    });

                    window.setTimeout(function() {
                        Screens_RemoveElement(inUseObj.ids[12] + (y + 2));
                        Screens_ChangeFocusAnimationFinished = true;

                    }, Screens_ScrollAnimationTimeout);
                } else {
                    document.getElementById(inUseObj.ids[12] + (y - 1)).classList.remove('animate_height');
                    Screens_RemoveElement(inUseObj.ids[12] + (y + 2));
                }

            }
        }
        Screens_addrowEnd(forceScroll);
    }

    function Screens_addrowDown(y) {
        if (inUseObj.Cells[y + 1]) {
            document.getElementById(inUseObj.table).appendChild(inUseObj.Cells[y + 1]);

            if (Screens_ThumbNotNull(inUseObj.ids[12] + (y - 2))) {
                if (Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
                    !Screens_ChangeFocusAnimationFast) { //If with animation
                    Screens_ChangeFocusAnimationFinished = false;
                    Screens_ChangeFocusAnimationFast = true;

                    document.getElementById(inUseObj.ids[12] + (y - 2)).classList.add('animate_height');

                    window.setTimeout(function() {
                        Screens_RemoveElement(inUseObj.ids[12] + (y - 2));
                        Screens_ChangeFocusAnimationFinished = true;
                    }, Screens_ScrollAnimationTimeout);

                } else Screens_RemoveElement(inUseObj.ids[12] + (y - 2));
            }
        } else if (inUseObj.loadingData) {
            //Technically we will not get here because
            //Key down or right (inUseObj.Cells.length - 1) >= (inUseObj.posY + 3) will hold the screen
            //but this works, the issue is related to slow to load more content
            //Only happens if scroll too fast
            window.setTimeout(function() {
                Screens_addrowDown(y);
            }, 10);
        }
    }

    function Screens_RemoveElement(id) {
        var ele = document.getElementById(id);
        if (ele) ele.remove();
    }

    function Screens_addrowEnd(forceScroll) {
        Main_AddClass(inUseObj.ids[0] + inUseObj.posY + '_' + inUseObj.posX, Main_classThumb);
        Main_CounterDialog(inUseObj.posX, inUseObj.posY, inUseObj.ColoumnsCount, inUseObj.itemsCount);

        inUseObj.addFocus(inUseObj.posY, inUseObj.ids, forceScroll);
    }

    function Screens_setOffset(pos, y) {
        if (!inUseObj.offsettop || inUseObj.offsettopFontsize !== Settings_Obj_default('global_font_offset')) {
            pos = !y ? (y + pos) : y;
            if (inUseObj.Cells[pos]) {
                inUseObj.offsettop = document.getElementById(inUseObj.ids[0] + pos + '_0').offsetTop / BodyfontSize;
                inUseObj.offsettopFontsize = Settings_Obj_default('global_font_offset');
            }
        }
    }

    function Screens_addFocusChannel(y, idArray, forceScroll) {
        Screens_setOffset(2, y);

        if (Main_YchangeAddFocus(y) || forceScroll) {

            if (y > 1) {

                //Channels is a odd screen as thumb are small it need a minor workaround to get all working
                //TODO revise this for a simple implementeation
                if (inUseObj.Cells.length < 6) {
                    if (inUseObj.Cells[y + 1] && (y + 2) < inUseObj.Cells.length || inUseObj.Cells.length === 4)
                        document.getElementById(idArray[10]).style.top = 'calc(39% - ' + inUseObj.offsettop + 'em)';
                    else if (inUseObj.Cells.length > 3)
                        document.getElementById(idArray[10]).style.top = 'calc(39% - ' + (inUseObj.offsettop * 3 / 2) + 'em)';
                } else {
                    if (inUseObj.Cells[y + 2])
                        document.getElementById(idArray[10]).style.top = 'calc(39% - ' + inUseObj.offsettop + 'em)';
                    else
                        document.getElementById(idArray[10]).style.top = 'calc(39% - ' + (inUseObj.offsettop * 3 / 2) + 'em)';
                }

            } else document.getElementById(idArray[10]).style.top = '';

        }
        Main_handleKeyUp();
    }

    function Screens_addFocusVideo(y, idArray, forceScroll) {
        Screens_setOffset(1, y);

        if (Main_YchangeAddFocus(y) || forceScroll) {
            if (y > 0) {

                if (Main_ThumbNull((y + 1), 0, idArray[0])) //We didn't reach the bottom yet
                    document.getElementById(idArray[10]).style.top = 'calc(7.65% - ' + inUseObj.offsettop + 'em)';

            } else document.getElementById(idArray[10]).style.top = '';
        }

        Main_handleKeyUp();
    }

    function Screens_addFocusGame(y, idArray, forceScroll) {
        Screens_setOffset(1, y);

        if (Main_YchangeAddFocus(y) || forceScroll) {
            if (y > 0) {

                if (Main_ThumbNull((y + 1), 0, idArray[0])) //We didn't reach the bottom yet
                    document.getElementById(idArray[10]).style.top = 'calc(4.5% - ' + inUseObj.offsettop + 'em)';

            } else document.getElementById(idArray[10]).style.top = '';
        }

        Main_handleKeyUp();
    }

    function Screens_ChangeFocus(y, x) {
        if (inUseObj.posY > -1) Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
        else Screens_removeFocusFallow();

        Screens_ClearAnimation();
        inUseObj.posY += y;
        inUseObj.posX = x;
        Screens_addFocus();
    }

    function Screens_addFocusFallow() {
        if (inUseObj.posX > inUseObj.SwitchesIcons.length - 1) inUseObj.posX = 0;
        else if (inUseObj.posX < 0) inUseObj.posX = inUseObj.SwitchesIcons.length - 1;

        Main_AddClass(inUseObj.ids[0] + 'y_' + inUseObj.posX, 'stream_switch_focused');
    }

    function Screens_removeFocusFallow() {
        if (inUseObj.posX > inUseObj.SwitchesIcons.length - 1) inUseObj.posX = 0;
        else if (inUseObj.posX < 0) inUseObj.posX = inUseObj.SwitchesIcons.length - 1;

        Main_RemoveClass(inUseObj.ids[0] + 'y_' + inUseObj.posX, 'stream_switch_focused');
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
            Screens_ClearAnimation();
            inUseObj.posY = -1;
            if (inUseObj.posX > inUseObj.SwitchesIcons.length - 1) inUseObj.posX = 1;
            Screens_addFocusFallow();
        } else if (inUseObj.HasSwitches && (inUseObj.posY) === -1 && (Main_ThumbNull(0, inUseObj.posX, inUseObj.ids[0]))) {
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

    function Screens_ClearAnimation() {
        if (inUseObj.HasAnimateThumb) {
            window.clearInterval(inUseObj.AnimateThumbId);
            if (Screens_ThumbNotNull(inUseObj.ids[6] + inUseObj.posY + '_' + inUseObj.posX)) Main_ShowElement(inUseObj.ids[6] + inUseObj.posY + '_' + inUseObj.posX);
        }
    }

    function Screens_KeyLeftRight(y, x) {
        if (inUseObj.HasSwitches && inUseObj.posY === -1) {
            inUseObj.posY = -1;
            Screens_removeFocusFallow();
            inUseObj.posX += (!x ? 1 : -1);
            Screens_addFocusFallow();
        } else if (Main_ThumbNull((inUseObj.posY), (inUseObj.posX + y), inUseObj.ids[0]))
            Screens_ChangeFocus(0, (inUseObj.posX + y));
        else if (Main_ThumbNull((inUseObj.posY + y), x, inUseObj.ids[0]))
            Screens_ChangeFocus(y, x);
    }

    function Screens_OpenSidePanel(forceFeed) {
        Screens_RemoveAllFocus();
        if (Main_values.Main_Go === Main_aGame) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
        Screens_ClearAnimation();
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
        Sidepannel_Start(Screens_handleKeyDown, forceFeed);
    }

    function Screens_RemoveAllFocus() {
        if (Main_ThumbNull(inUseObj.posY, inUseObj.posX, inUseObj.ids[0])) {
            Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
        } else if (inUseObj.posY < 0) {
            Screens_removeFocusFallow();
            inUseObj.posY = 0;
            inUseObj.posX = 0;
        }
    }

    var Screens_handleKeyUpIsClear = false;

    function Screens_handleKeyUp(e) {
        if (e.keyCode === KEY_ENTER) {
            Screens_handleKeyUpClear();
            if (!Screens_clear) inUseObj.key_play();
        } else if (e.keyCode === KEY_RIGHT) {
            window.clearTimeout(Screens_KeyEnterID);
            document.body.removeEventListener("keyup", Screens_handleKeyUp);
            if (!Screens_clear) {
                Screens_keyRight();
                document.body.addEventListener("keydown", Screens_handleKeyDown, false);
                Screens_ChangeFocusAnimationFast = false;
            }
        }
        Screens_handleKeyUpIsClear = true;
    }

    function Screens_handleKeyUpClear() {
        window.clearTimeout(Screens_KeyEnterID);
        document.body.removeEventListener("keyup", Screens_handleKeyUp);
        document.body.addEventListener("keydown", Screens_handleKeyDown, false);
    }

    document.body.addEventListener("keyup", Screens_handleKeyUpAnimationFast);

    function Screens_handleKeyUpAnimationFast() {
        Screens_ChangeFocusAnimationFast = false;
    }

    function Screens_keyRight() {
        //Prevent scroll too fast out of inUseObj.Cells.length
        //here (inUseObj.posY + 3) the 3 is 1 bigger then the 2 in Screens_addrow*Down (inUseObj.Cells[y + 2])
        if (inUseObj.dataEnded ||
            inUseObj.posX < (inUseObj.ColoumnsCount - 1) ||
            (inUseObj.Cells.length - 1) >= (inUseObj.posY + 1)) {
            if (inUseObj.posX === (inUseObj.ColoumnsCount - 1)) {
                if (Screens_ChangeFocusAnimationFinished) Screens_KeyLeftRight(1, 0);
            } else Screens_KeyLeftRight(1, 0);
        } else Screens_addFocus(true);
    }

    function Screens_handleKeyDown(event) {
        if (inUseObj.FirstLoad || Main_CantClick()) return;
        else Main_keyClickDelayStart();

        switch (event.keyCode) {
            case KEY_PG_UP:
                //TODO improve this pg up and down so many unnecessary ifs
                if (inUseObj.key_pgUp) {
                    Screens_RemoveAllFocus();
                    if (inUseObj.screen === Main_UserChannels)
                        Sidepannel_Go(!AddUser_UsernameArray[0].access_token ? inUseObj.key_pgUpNext : inUseObj.key_pgUp);
                    else if (inUseObj.screen === Main_UserLive)
                        Sidepannel_Go(Main_History[Main_HistoryPos]);
                    else if (inUseObj.screen === Main_aGame) {

                        if (Main_values.Main_BeforeAgame === Main_usergames) Sidepannel_Go(Main_UserHost);
                        else Sidepannel_Go(Main_Featured);

                    } else Sidepannel_Go(inUseObj.key_pgUp);
                }
                break;
            case KEY_PG_DOWN:
                if (inUseObj.key_pgDown) {
                    Screens_RemoveAllFocus();
                    if (inUseObj.screen === Main_usergames)
                        Sidepannel_Go(!AddUser_UsernameArray[0].access_token ? inUseObj.key_pgDownNext : inUseObj.key_pgDown);
                    else if (inUseObj.screen === Main_UserChannels)
                        Sidepannel_Go(Main_History[Main_HistoryPos]);
                    else if (inUseObj.screen === Main_aGame) {

                        if (Main_values.Main_BeforeAgame === Main_usergames) Sidepannel_Go(Main_UserVod);
                        else Sidepannel_Go(Main_Vod);

                    } else Sidepannel_Go(inUseObj.key_pgDown);
                }
                break;
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                inUseObj.key_exit();
                break;
            case KEY_LEFT:
                if (!inUseObj.posX) Screens_OpenSidePanel();
                else Screens_KeyLeftRight(-1, inUseObj.ColoumnsCount - 1);
                break;
            case KEY_RIGHT:
                if (inUseObj.posY === -1) {
                    Screens_keyRight();
                    break;
                }

                Screens_ThumbOptionSpecial = inUseObj.histPosXName ? false : true;
                Screens_handleKeyUpIsClear = false;

                document.body.removeEventListener("keydown", Screens_handleKeyDown, false);
                document.body.addEventListener("keyup", Screens_handleKeyUp, false);
                Screens_clear = false;
                Screens_KeyEnterID = window.setTimeout(Screens_ThumbOptionStart, 500);
                break;
            case KEY_UP:
                if (Screens_ChangeFocusAnimationFinished) Screens_KeyUpDown(-1);
                break;
            case KEY_DOWN:
                //Prevent scroll too fast out of inUseObj.Cells.length
                //here (inUseObj.posY + 3) the 3 is 1 bigger then the 2 in Screens_addrow*Down (inUseObj.Cells[y + 2])
                if (inUseObj.dataEnded ||
                    (inUseObj.Cells.length - 1) >= (inUseObj.posY + 1)) {
                    if (Screens_ChangeFocusAnimationFinished) Screens_KeyUpDown(1);
                } else {
                    Screens_addFocus(true);
                }
                break;
            case KEY_PLAY:
            case KEY_PLAYPAUSE:
            case KEY_KEYBOARD_SPACE:
                inUseObj.key_play();
                break;
            case KEY_ENTER:
                document.body.removeEventListener("keydown", Screens_handleKeyDown, false);
                document.body.addEventListener("keyup", Screens_handleKeyUp, false);
                Screens_clear = false;
                Screens_KeyEnterID = window.setTimeout(Main_ReloadScreen, 400);
                break;
            case KEY_REFRESH:
                Main_ReloadScreen();
                break;
            case KEY_PAUSE: //key s
            case KEY_6:
                Main_showSettings();
                break;
            case KEY_A:
            case KEY_7:
                Main_showAboutDialog(Screens_handleKeyDown, Screens_handleKeyControls);
                break;
            case KEY_C:
            case KEY_8:
                Main_showControlsDialog(Screens_handleKeyDown, Screens_handleKeyControls);
                break;
            case KEY_E:
            case KEY_9:
                document.body.removeEventListener("keydown", Screens_handleKeyDown);
                Main_showExitDialog();
                break;
            case KEY_CHAT:
                Screens_OpenSidePanel(AddUser_UserIsSet());
                if (!AddUser_UserIsSet()) {
                    Main_showWarningDialog(STR_NOKUSER_WARN);
                    window.setTimeout(Main_HideWarningDialog, 2000);
                }
                break;
            default:
                break;
        }
    }

    function AGame_headerOptions() {
        if (!inUseObj.posX) {
            Main_values.Main_Go = Main_AGameVod;
            Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
            AGame_headerOptionsExit();
            Main_SwitchScreenAction();
        } else if (inUseObj.posX === 1) {
            Main_values.Main_Go = Main_AGameClip;
            Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
            AGame_headerOptionsExit();
            Main_SwitchScreenAction();
        } else AGame_fallow();
    }

    function AGame_headerOptionsExit() {
        if (inUseObj.status && inUseObj.posY === -1) {
            Screens_removeFocusFallow();
            inUseObj.posY = 0;
            inUseObj.posX = 0;
            Main_AddClass(inUseObj.ids[0] + '0_' + inUseObj.posX, Main_classThumb);
        }
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
        Main_HideElement(inUseObj.ids[10]);
    }

    function AGame_fallow() {
        if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
            if (AGame_fallowing) AddCode_UnFallowGame();
            else AddCode_FallowGame();
        } else {
            Main_showWarningDialog(STR_NOKEY_WARN);
            window.setTimeout(function() {
                if (inUseObj.emptyContent && Main_values.Main_Go === Main_aGame) Main_showWarningDialog(STR_NO + STR_LIVE_GAMES);
                else Main_HideWarningDialog();
            }, 2000);
        }
    }

    function AGame_Checkfallow() {
        if (AddUser_UserIsSet()) AddCode_CheckFallowGame();
        else {
            AGame_fallowing = false;
            AGame_setFallow();
        }
    }

    function AGame_setFallow() {
        if (AGame_fallowing) Main_innerHTML(AGame.ids[3] + "y_2", '<i class="icon-heart" style="color: #6441a4; font-size: 100%;"></i>' + STR_SPACE + STR_SPACE + STR_FALLOWING);
        else Main_innerHTML(AGame.ids[3] + "y_2", '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; "></i>' + STR_SPACE + STR_SPACE + (AddUser_UserIsSet() ? STR_FALLOW : STR_NOKEY));
    }

    var Screens_PeriodDialogID;
    var Screens_PeriodDialogPos = 0;

    function Screens_PeriodStart() {
        Screens_setPeriodDialog();
        Main_ShowElement('dialog_period');
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
        document.body.addEventListener("keydown", Screens_PeriodhandleKeyDown, false);
    }

    function Screens_clearPeriodDialogId() {
        window.clearTimeout(Screens_PeriodDialogID);
    }

    function Screens_SetPeriodDialogId() {
        window.clearTimeout(Screens_PeriodDialogID);
        Screens_PeriodDialogID = window.setTimeout(Screens_PeriodDialogHide, 6000);
    }

    function Screens_setPeriodDialog() {
        Screens_PeriodDialogPos = inUseObj.periodPos;
        Screens_PeriodAddFocus(Screens_PeriodDialogPos);
        Screens_SetPeriodDialogId();
    }

    function Screens_PeriodDialogHide() {
        Screens_clearPeriodDialogId();
        Screens_PeriodRemoveFocus(Screens_PeriodDialogPos);
        document.body.removeEventListener("keydown", Screens_PeriodhandleKeyDown, false);
        document.body.addEventListener("keydown", Screens_handleKeyDown, false);
        Main_HideElement('dialog_period');
    }

    function Screens_PeriodAddFocus(pos) {
        Main_AddClass('dialog_period_' + pos, 'button_dialog_focused');
    }

    function Screens_PeriodRemoveFocus(pos) {
        Main_RemoveClass('dialog_period_' + pos, 'button_dialog_focused');
    }

    function Screens_PeriodhandleKeyDown(event) {
        switch (event.keyCode) {
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                Screens_PeriodRemoveFocus(Screens_PeriodDialogPos);
                Screens_PeriodDialogHide();
                break;
            case KEY_LEFT:
                Screens_clearPeriodDialogId();
                Screens_SetPeriodDialogId();
                Screens_PeriodRemoveFocus(Screens_PeriodDialogPos);
                Screens_PeriodDialogPos--;
                if (Screens_PeriodDialogPos < 1) Screens_PeriodDialogPos = 4;
                Screens_PeriodAddFocus(Screens_PeriodDialogPos);
                break;
            case KEY_RIGHT:
                Screens_clearPeriodDialogId();
                Screens_SetPeriodDialogId();
                Screens_PeriodRemoveFocus(Screens_PeriodDialogPos);
                Screens_PeriodDialogPos++;
                if (Screens_PeriodDialogPos > 4) Screens_PeriodDialogPos = 1;
                Screens_PeriodAddFocus(Screens_PeriodDialogPos);
                break;
            case KEY_PLAY:
            case KEY_PLAYPAUSE:
            case KEY_KEYBOARD_SPACE:
            case KEY_ENTER:
                Screens_PeriodDialogHide();
                if (inUseObj.periodPos !== Screens_PeriodDialogPos) {
                    inUseObj.periodPos = Screens_PeriodDialogPos;
                    inUseObj.SetPeriod();
                    Screens_StartLoad();
                }
                break;
            default:
                break;
        }
    }

    var Screens_OffSetDialogID;
    var Screens_ThumbOptionSpecial;

    function Screens_OffSetStart() {
        inUseObj.OffSetPos = inUseObj.extraoffset / 100;
        Screens_setOffSetDialog();
        Main_ShowElement('dialog_OffSet');
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
        document.body.addEventListener("keydown", Screens_OffSethandleKeyDown, false);
    }

    function Screens_clearOffSetDialogId() {
        window.clearTimeout(Screens_OffSetDialogID);
    }

    function Screens_SetOffSetDialogId() {
        window.clearTimeout(Screens_OffSetDialogID);
        Screens_OffSetDialogID = window.setTimeout(Screens_OffSetDialogHide, 6000);
    }

    function Screens_setOffSetDialog() {
        Screens_OffSetAddFocus(inUseObj.OffSetPos * 100);
        Screens_SetOffSetDialogId();
    }

    function Screens_OffSetDialogHide() {
        Screens_clearOffSetDialogId();
        document.body.removeEventListener("keydown", Screens_OffSethandleKeyDown, false);
        document.body.addEventListener("keydown", Screens_handleKeyDown, false);
        Main_HideElement('dialog_OffSet');
    }

    function Screens_OffSetAddFocus(pos) {
        Main_textContent("dialog_OffSet_val", pos);
        var maxValue = 5000;

        if (pos > 0 && pos < maxValue) {
            document.getElementById("dialog_OffSet_left").style.opacity = "1";
            document.getElementById("dialog_OffSet_right").style.opacity = "1";
        } else if (pos === maxValue) {
            document.getElementById("dialog_OffSet_left").style.opacity = "1";
            document.getElementById("dialog_OffSet_right").style.opacity = "0.2";
        } else {
            document.getElementById("dialog_OffSet_left").style.opacity = "0.2";
            document.getElementById("dialog_OffSet_right").style.opacity = "1";
        }
    }

    function Screens_OffSethandleKeyDown(event) {
        switch (event.keyCode) {
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                Screens_OffSetDialogHide();
                break;
            case KEY_LEFT:
                Screens_clearOffSetDialogId();
                Screens_SetOffSetDialogId();
                inUseObj.OffSetPos--;
                if (inUseObj.OffSetPos < 0) inUseObj.OffSetPos = 0;
                Screens_OffSetAddFocus(inUseObj.OffSetPos * 100);
                break;
            case KEY_RIGHT:
                Screens_clearOffSetDialogId();
                Screens_SetOffSetDialogId();
                inUseObj.OffSetPos++;
                if (inUseObj.OffSetPos > 50) inUseObj.OffSetPos = 50;
                Screens_OffSetAddFocus(inUseObj.OffSetPos * 100);
                break;
            case KEY_PLAY:
            case KEY_PAUSE:
            case KEY_PLAYPAUSE:
            case KEY_KEYBOARD_SPACE:
            case KEY_ENTER:
                Screens_OffSetDialogHide();
                if (inUseObj.extraoffset !== inUseObj.OffSetPos) {
                    inUseObj.extraoffset = inUseObj.OffSetPos * 100;
                    inUseObj.SetPeriod();
                    Screens_StartLoad();
                }
                break;
            default:
                break;
        }
    }

    var Screens_histDialogID;

    function Screens_histStart() {
        inUseObj.sethistDialog();
        Main_ShowElement('dialog_hist_setting');
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
        document.body.addEventListener("keydown", Screens_histhandleKeyDown, false);
    }

    function Screens_clearhistDialogId() {
        window.clearTimeout(Screens_histDialogID);
    }

    function Screens_SethistDialogId() {
        window.clearTimeout(Screens_histDialogID);
        Screens_histDialogID = window.setTimeout(Screens_histDialogHide, 6000);
    }

    var Screens_DeleteDialogAll = true;

    function Screens_histDialogHide(Update) {
        Screens_histRemoveFocus(inUseObj.histPosY, 'hist');

        Screens_histAddFocus(0);
        Screens_clearhistDialogId();
        document.body.removeEventListener("keydown", Screens_histhandleKeyDown, false);
        document.body.addEventListener("keydown", Screens_handleKeyDown, false);
        Main_HideElement('dialog_hist_setting');

        if (Update) {
            if (inUseObj.histPosY === 2) {
                Screens_DeleteDialogAll = true;
                Screens_showDeleteDialog(STR_DELETE_SURE + inUseObj.history_Type() + STR_SPACE + STR_HISTORY + '?');
            } else if (inUseObj.histPosX[0] !== inUseObj.histPosXTemp[0]) {
                inUseObj.label_init();
                Main_ReloadScreen();
            }
        } else {
            inUseObj.histPosX = Main_Slice(inUseObj.histPosXTemp);
            Main_setItem(inUseObj.histPosXName, JSON.stringify(inUseObj.histPosX));
        }
        inUseObj.histPosY = 0;
    }

    function Screens_showDeleteDialog(text) {
        Main_innerHTML("main_dialog_remove", text);
        Main_ShowElement('main_remove_dialog');
        document.body.removeEventListener("keydown", Screens_handleKeyDown, false);
        document.body.addEventListener("keydown", Screens_histDeleteKeyDown, false);
        Screens_setRemoveDialog();
    }

    function Screens_setRemoveDialog() {
        Users_RemoveDialogID = window.setTimeout(Screens_HideRemoveDialog, 5000);
    }

    function Screens_HideRemoveDialog() {
        Users_clearRemoveDialog();
        document.body.removeEventListener("keydown", Screens_histDeleteKeyDown);
        document.body.addEventListener("keydown", Screens_handleKeyDown, false);
        Main_HideElement('main_remove_dialog');
        Users_RemoveCursor = 0;
        Users_UserCursorSet();
        Users_RemoveCursorSet();
    }

    function Screens_histDeleteKeyDown(event) {
        switch (event.keyCode) {
            case KEY_LEFT:
                Users_RemoveCursor--;
                if (Users_RemoveCursor < 0) Users_RemoveCursor = 1;
                Users_RemoveCursorSet();
                Users_clearRemoveDialog();
                Screens_setRemoveDialog();
                break;
            case KEY_RIGHT:
                Users_RemoveCursor++;
                if (Users_RemoveCursor > 1) Users_RemoveCursor = 0;
                Users_RemoveCursorSet();
                Users_clearRemoveDialog();
                Screens_setRemoveDialog();
                break;
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                Users_RemoveCursor = 0;
                /* falls through */
            case KEY_ENTER:
                var temp = Users_RemoveCursor;
                Screens_HideRemoveDialog();

                if (temp) Screens_histDelete();
                break;
            default:
                break;
        }
    }

    function Screens_histDelete() {
        if (Screens_DeleteDialogAll) {
            Main_values_History_data[AddUser_UsernameArray[0].id][inUseObj.Type] = [];
            Main_setHistoryItem();
            Main_ReloadScreen();
        } else {
            var type = 'live';

            if (inUseObj.screen === Main_HistoryVod) type = 'vod';
            else if (inUseObj.screen === Main_HistoryClip) type = 'clip';

            var index = Main_history_Exist(type, Screens_values_Play_data[7]);
            if (index > -1) {
                Main_values_History_data[AddUser_UsernameArray[0].id][type].splice(index, 1);
                Main_setHistoryItem();
            }
        }
    }

    function Screens_histAddFocus(divPos) {
        Main_AddClass('dialog_hist_setting_' + divPos, 'settings_div_focus');
        Main_AddClass('dialog_hist_val_' + divPos, 'settings_value_focus');
        Screens_histSetArrow();
    }

    function Screens_histRemoveFocus(divPos, dialog) {
        Main_RemoveClass('dialog_' + dialog + '_setting_' + divPos, 'settings_div_focus');
        Main_RemoveClass('dialog_' + dialog + '_val_' + divPos, 'settings_value_focus');
        document.getElementById('dialog_' + dialog + '_left_' + divPos).style.opacity = "0";
        document.getElementById('dialog_' + dialog + '_right_' + divPos).style.opacity = "0";
    }

    function Screens_histSetArrow() {
        Screens_histArrow(
            'hist',
            inUseObj.histPosX[inUseObj.histPosY],
            inUseObj.histArrays[inUseObj.histPosY].length,
            inUseObj.histArrays[inUseObj.histPosY][inUseObj.histPosX[inUseObj.histPosY]],
            inUseObj.histPosY
        );

        Main_setItem(inUseObj.histPosXName, JSON.stringify(inUseObj.histPosX));
    }

    function Screens_histArrow(dialog, pos, maxValue, text, divPos) {
        Main_innerHTML('dialog_' + dialog + '_val_' + divPos, text);

        if (maxValue === 1) {
            document.getElementById('dialog_' + dialog + '_left_' + divPos).style.opacity = "0";
            document.getElementById('dialog_' + dialog + '_right_' + divPos).style.opacity = "0";
        } else if (!pos) {
            document.getElementById('dialog_' + dialog + '_left_' + divPos).style.opacity = "0.2";
            document.getElementById('dialog_' + dialog + '_right_' + divPos).style.opacity = "1";
        } else if (pos === (maxValue - 1)) {
            document.getElementById('dialog_' + dialog + '_left_' + divPos).style.opacity = "1";
            document.getElementById('dialog_' + dialog + '_right_' + divPos).style.opacity = "0.2";
        } else {
            document.getElementById('dialog_' + dialog + '_left_' + divPos).style.opacity = "1";
            document.getElementById('dialog_' + dialog + '_right_' + divPos).style.opacity = "1";
        }
    }

    function Screens_histhandleKeyDown(event) {
        switch (event.keyCode) {
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                Screens_histDialogHide();
                break;
            case KEY_LEFT:
                Screens_clearhistDialogId();
                Screens_SethistDialogId();
                inUseObj.histPosX[inUseObj.histPosY]--;
                if (inUseObj.histPosX[inUseObj.histPosY] < 0) inUseObj.histPosX[inUseObj.histPosY] = 0;
                else Screens_histSetArrow();
                break;
            case KEY_RIGHT:
                Screens_clearhistDialogId();
                Screens_SethistDialogId();
                inUseObj.histPosX[inUseObj.histPosY]++;
                if (inUseObj.histPosX[inUseObj.histPosY] > (inUseObj.histArrays[inUseObj.histPosY].length - 1))
                    inUseObj.histPosX[inUseObj.histPosY] = inUseObj.histArrays[inUseObj.histPosY].length - 1;
                else Screens_histSetArrow();
                break;
            case KEY_UP:
                Screens_clearhistDialogId();
                Screens_SethistDialogId();
                inUseObj.histPosY--;
                if (inUseObj.histPosY < 0) inUseObj.histPosY = 0;
                else {
                    Screens_histRemoveFocus(inUseObj.histPosY + 1, 'hist');
                    Screens_histAddFocus(inUseObj.histPosY);
                }
                break;
            case KEY_DOWN:
                Screens_clearhistDialogId();
                Screens_SethistDialogId();
                inUseObj.histPosY++;
                if (inUseObj.histPosY > (inUseObj.histArrays.length - 1))
                    inUseObj.histPosY = inUseObj.histArrays.length - 1;
                else {
                    Screens_histRemoveFocus(inUseObj.histPosY - 1, 'hist');
                    Screens_histAddFocus(inUseObj.histPosY);
                }
                break;
            case KEY_ENTER:
                Screens_histDialogHide(true);
                break;
            default:
                break;
        }
    }

    var Screens_ThumbOptionPosY = 0;

    function Screens_ThumbOptionStart() {
        Screens_clear = true;

        Screens_ThumbOptionSetArrowArray();

        if (Screens_ThumbOptionSpecial) {
            Screens_ThumbOptionPosY = 4;
            Main_textContent('dialog_thumb_opt_val_4', Screens_ThumbOptionScreens[0]);
            Screens_ThumbOptionAddFocus(Screens_ThumbOptionPosY);
        } else {
            Screens_ThumbOptionShowSpecial();

            Screens_ThumbOptionStringSet();
            Screens_ThumbOptionPosY = 0;
        }

        inUseObj.setTODialog();
        Screens_SeTODialogId();
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
        document.body.addEventListener("keydown", Screens_ThumbOptionhandleKeyDown, false);

        Main_ShowElement('dialog_thumb_opt');
    }

    function Screens_ThumbOptionShowSpecial() {
        for (var i = 0; i < 4; i++)
            Main_RemoveClass('dialog_thumb_opt_setting_' + i, 'hideimp');
    }

    function Screens_ThumbOptionHideSpecial() {
        for (var i = -1; i < 4; i++)
            Main_AddClass('dialog_thumb_opt_setting_' + i, 'hideimp');
    }

    var Screens_values_Play_data;
    var Screens_canFallow = false;
    var Screens_isFallowing = false;

    function Screens_ThumbOptionStringSet() {
        Screens_canFallow = false;
        Screens_values_Play_data = JSON.parse(document.getElementById(inUseObj.ids[8] + inUseObj.posY + '_' + inUseObj.posX).getAttribute(Main_DataAttribute));

        if (AddUser_UserIsSet()) {
            Screens_ThumbOption_CheckFallow(Screens_values_Play_data);
            Main_textContent('dialog_thumb_opt_setting_name_2', STR_CHECK_HISTORY);
        } else Main_textContent('dialog_thumb_opt_setting_name_2', STR_NOKEY + STR_CANT_FALLOW);

        Main_textContent('dialog_thumb_opt_val_2', '...');

        if (inUseObj.screenType < 2) {
            Main_values.Play_isHost = (Main_values.Main_Go === Main_UserHost) && !Play_UserLiveFeedPressed;

            if (Main_values.Play_isHost) {
                Main_textContent('dialog_thumb_opt_val_0', Screens_values_Play_data[1].split(STR_USER_HOSTING)[1]);
            } else Main_textContent('dialog_thumb_opt_val_0', Screens_values_Play_data[1]);

        } else if (inUseObj.screenType === 2) {
            Main_textContent('dialog_thumb_opt_val_0', Screens_values_Play_data[4]);
        }

        Main_textContent('dialog_thumb_opt_val_1', (Screens_values_Play_data[3] !== "" ? Screens_values_Play_data[3] : ''));
        Main_textContent('dialog_thumb_opt_val_3', Screens_YesNo[Screens_ThumbOptionStringGetHistory()]);
        Main_textContent('dialog_thumb_opt_val_4', Screens_ThumbOptionScreens[0]);
    }

    var Screens_ThumbOption_CheckFallow_ID;

    function Screens_ThumbOption_CheckFallow(data) {
        Screens_ThumbOption_CheckFallow_ID = (new Date()).getTime();
        if (inUseObj.screenType < 2) Screens_ThumbOption_RequestCheckFallow(data[14], 0, Screens_ThumbOption_CheckFallow_ID);
        else Screens_ThumbOption_RequestCheckFallow(data[2], 0, Screens_ThumbOption_CheckFallow_ID);
    }

    function Screens_ThumbOption_RequestCheckFallow(channel_id, trye, ID) {
        var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + channel_id + Main_TwithcV5Flag_I;

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open('GET', theUrl, true);
        xmlHttp.timeout = 5000;

        for (var i = 0; i < 2; i++)
            xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (Screens_ThumbOption_CheckFallow_ID === ID) Screens_ThumbOption_RequestCheckFallowReady(xmlHttp, channel_id, trye, ID);
        };

        xmlHttp.send(null);
    }

    function Screens_ThumbOption_RequestCheckFallowReady(xmlHttp, channel_id, trye, ID) {
        if (xmlHttp.readyState === 4) {
            if (Screens_ThumbOption_CheckFallow_ID !== ID) return;

            if (xmlHttp.status === 200) { //yes
                Screens_canFallow = true;
                Screens_isFallowing = true;
                Main_textContent('dialog_thumb_opt_setting_name_2', STR_FALLOWING);
                Main_textContent('dialog_thumb_opt_val_2', STR_CLICK_UNFALLOW.replace('(', '').replace(')', ''));
            } else if (xmlHttp.status === 404) { //no
                Screens_canFallow = true;
                Screens_isFallowing = false;
                Main_textContent('dialog_thumb_opt_setting_name_2', STR_FALLOW);
                Main_textContent('dialog_thumb_opt_val_2', STR_CLICK_FALLOW.replace('(', '').replace(')', ''));
            } else { // internet error
                if (trye < 5) Screens_ThumbOption_RequestCheckFallow(channel_id, trye++, ID);
            }
        }
    }

    function Screens_ThumbOptionStringGetHistory() {
        return Main_getItemJson(inUseObj.histPosXName, [0, 0, 0])[1];
    }

    function Screens_ThumbOptionhandleKeyDown(event) {
        switch (event.keyCode) {
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                Screens_ThumbOptionDialogHide();
                break;
            case KEY_LEFT:
                Screens_clearTODialogId();
                Screens_SeTODialogId();
                if (Screens_ThumbOptionPosY > 2) {
                    Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY]--;
                    if (Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY] < 0) Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY] = 0;
                    else Screens_ThumbOptionSetArrow(Screens_ThumbOptionArrays[Screens_ThumbOptionPosY]);
                }
                break;
            case KEY_RIGHT:
                Screens_clearTODialogId();
                Screens_SeTODialogId();
                if (!Screens_handleKeyUpIsClear) break;
                if (Screens_ThumbOptionPosY > 2) {
                    Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY]++;
                    if (Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY] > (Screens_ThumbOptionArrays[Screens_ThumbOptionPosY].length - 1))
                        Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY] = Screens_ThumbOptionArrays[Screens_ThumbOptionPosY].length - 1;
                    else Screens_ThumbOptionSetArrow(Screens_ThumbOptionArrays[Screens_ThumbOptionPosY]);
                }
                break;
            case KEY_UP:
                if (Screens_ThumbOptionSpecial) break;
                var lower = document.getElementById('dialog_thumb_opt_setting_-1').className.indexOf('hideimp') === -1 ? -1 : 0;
                Screens_clearTODialogId();
                Screens_SeTODialogId();
                Screens_ThumbOptionPosY--;
                if (Screens_ThumbOptionPosY < lower) Screens_ThumbOptionPosY = lower;
                else {
                    Screens_histRemoveFocus(Screens_ThumbOptionPosY + 1, 'thumb_opt');
                    Screens_ThumbOptionAddFocus(Screens_ThumbOptionPosY);
                }
                break;
            case KEY_DOWN:
                if (Screens_ThumbOptionSpecial) break;
                Screens_clearTODialogId();
                Screens_SeTODialogId();
                Screens_ThumbOptionPosY++;
                if (Screens_ThumbOptionPosY > 4)
                    Screens_ThumbOptionPosY = 4;
                else {
                    Screens_histRemoveFocus(Screens_ThumbOptionPosY - 1, 'thumb_opt');
                    Screens_ThumbOptionAddFocus(Screens_ThumbOptionPosY);
                }
                break;
            case KEY_ENTER:
                if (Screens_ThumbOptionPosY === 2) {
                    Screens_clearTODialogId();
                    Screens_SeTODialogId();
                    Screens_FallowUnfallow();
                } else Screens_ThumbOptionDialogHide(true);
                break;
            default:
                break;
        }
    }

    var Screens_ThumbOptionDialogID;

    function Screens_clearTODialogId() {
        window.clearTimeout(Screens_ThumbOptionDialogID);
    }

    function Screens_SeTODialogId() {
        window.clearTimeout(Screens_ThumbOptionDialogID);
        Screens_ThumbOptionDialogID = window.setTimeout(Screens_ThumbOptionDialogHide, 6000);
    }

    function Screens_ThumbOptionDialogHide(Update) {
        Screens_histRemoveFocus(Screens_ThumbOptionPosY, 'thumb_opt');

        Screens_clearTODialogId();
        document.body.removeEventListener("keydown", Screens_ThumbOptionhandleKeyDown, false);
        document.body.addEventListener("keydown", Screens_handleKeyDown, false);
        Main_HideElement('dialog_thumb_opt');

        if (Update) {

            if (Screens_ThumbOptionPosY === -1) {
                var streamer, title;
                if (!inUseObj.screenType) {
                    streamer = Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[1];
                    title = Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[2];
                } else if (inUseObj.screenType === 1) {
                    streamer = Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[1];
                    title = Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[10];
                } else if (inUseObj.screenType === 2) {
                    streamer = Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[4];
                    title = Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[10];
                }

                Screens_DeleteDialogAll = false;
                Screens_showDeleteDialog(
                    STR_DELETE_SURE + inUseObj.history_Type() + STR_SPACE + STR_HISTORY + STR_SPACE + STR_FOR + '?' +
                    STR_BR + STR_BR + streamer + STR_BR + title + STR_BR + STR_BR +
                    STR_REFRESH_DELETE);

            } else if (!Screens_ThumbOptionPosY) Screens_OpenChannel();
            else if (Screens_ThumbOptionPosY === 1) Screens_OpenGame();
            else if (Screens_ThumbOptionPosY === 3) {
                if (!inUseObj.screenType) {
                    HistoryLive.histPosX[1] = Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY];
                    Main_setItem(inUseObj.histPosXName, JSON.stringify(HistoryLive.histPosX));
                } else if (inUseObj.screenType === 1) {
                    HistoryVod.histPosX[1] = Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY];
                    Main_setItem(inUseObj.histPosXName, JSON.stringify(HistoryVod.histPosX));
                } else if (inUseObj.screenType === 2) {
                    HistoryClip.histPosX[1] = Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY];
                    Main_setItem(inUseObj.histPosXName, JSON.stringify(HistoryClip.histPosX));
                }

            } else if (Screens_ThumbOptionPosY === 4) Screens_OpenScreen();
        }
        Screens_ThumbOptionPosY = 0;
        Screens_ThumbOptionAddFocus(0);
    }

    function Screens_FallowUnfallow() {
        if (Screens_canFallow && AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
            var theUrl, channel_id = inUseObj.screenType < 2 ? Screens_values_Play_data[14] : Screens_values_Play_data[2];

            if (Screens_isFallowing) {
                theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + channel_id + Main_TwithcV5Flag_I;
                AddCode_BasexmlHttpGet(theUrl, 'DELETE', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, Screens_UnFallowRequestReady);
            } else {
                theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + channel_id + Main_TwithcV5Flag_I;
                AddCode_BasexmlHttpGet(theUrl, 'PUT', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, Screens_FallowRequestReady);
            }
        } else {
            Main_showWarningDialog(STR_NOKEY_WARN);
            window.setTimeout(Main_HideWarningDialog, 2000);
        }
    }

    function Screens_UnFallowRequestReady(xmlHttp) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 204) { //success user is now not fallowing the channel
                Screens_canFallow = true;
                Screens_isFallowing = false;
                Main_textContent('dialog_thumb_opt_setting_name_2', STR_FALLOW);
                Main_textContent('dialog_thumb_opt_val_2', STR_CLICK_FALLOW.replace('(', '').replace(')', ''));
            } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
                AddCode_refreshTokens(0, 0, Screens_FallowUnfallow, null);
            }
        }
    }

    function Screens_FallowRequestReady(xmlHttp) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) { //success user is now fallowing the channel
                Screens_isFallowing = true;
                Main_textContent('dialog_thumb_opt_setting_name_2', STR_FALLOWING);
                Main_textContent('dialog_thumb_opt_val_2', STR_CLICK_UNFALLOW.replace('(', '').replace(')', ''));
            } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
                AddCode_refreshTokens(0, 0, Screens_FallowUnfallow, null);
            }
        }
    }

    function Screens_OpenScreen() {

        if (Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY] === 8 && !AddUser_UsernameArray[0].access_token) {
            Main_showWarningDialog(STR_NOKEY_VIDEO_WARN);
            window.setTimeout(Main_HideWarningDialog, 3000);
            return;
        }

        if (!Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_AGameVod && Main_values.Main_Go !== Main_AGameClip) {
            Main_values.Main_BeforeAgame = (Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelContent && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) ? Main_values.Main_BeforeChannel : Main_values.Main_Go;
            Main_values.Main_BeforeAgameisSet = true;
        }

        Main_ExitCurrent(Main_values.Main_Go);
        Main_values.Main_Go = Screens_ThumbOptionGOTO[Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY]];

        Main_ReStartScreens();
    }

    function Screens_OpenGame() {
        Play_data.data[3] = (Screens_values_Play_data[3] !== "" ? Screens_values_Play_data[3] : '');
        if (Play_data.data[3] === '') {

            Main_showWarningDialog(STR_NO_GAME);
            window.setTimeout(Main_HideWarningDialog, 2000);
            return;
        }

        if (!Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_AGameVod && Main_values.Main_Go !== Main_AGameClip) {
            Main_values.Main_BeforeAgame = (Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelContent && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) ? Main_values.Main_BeforeChannel : Main_values.Main_Go;
            Main_values.Main_BeforeAgameisSet = true;
        }

        Main_ExitCurrent(Main_values.Main_Go);
        Main_values.Main_Go = Main_aGame;

        Main_values.Main_gameSelected = Play_data.data[3];
        Main_ReStartScreens();
    }

    function Screens_OpenChannel() {
        if (!Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) {
            Main_values.Main_BeforeChannel = (Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_aGame) ? Main_values.Main_BeforeAgame : Main_values.Main_Go;
            Main_values.Main_BeforeChannelisSet = true;
        }

        if (inUseObj.screenType < 2) {
            Main_values.Main_selectedChannel_id = Screens_values_Play_data[14];

            Main_values.Play_isHost = (Main_values.Main_Go === Main_UserHost) && !Play_UserLiveFeedPressed;

            if (Main_values.Play_isHost) {
                Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[1].split(STR_USER_HOSTING)[1];
            } else Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[1];

        } else {
            Main_values.Main_selectedChannel_id = Screens_values_Play_data[2];
            Main_values.Main_selectedChannelDisplayname = Screens_values_Play_data[4];
        }
        Main_values.Main_selectedChannel = Screens_values_Play_data[6];

        Main_ExitCurrent(Main_values.Main_Go);
        Main_values.Main_Go = Main_ChannelContent;
        Main_ReStartScreens();
    }

    function Screens_ThumbOptionAddFocus(divPos) {
        Main_AddClass('dialog_thumb_opt_setting_' + divPos, 'settings_div_focus');
        Main_AddClass('dialog_thumb_opt_val_' + divPos, 'settings_value_focus');
        if (Screens_ThumbOptionPosY === 3) Screens_ThumbOptionSetArrow(Screens_YesNo);
        else if (Screens_ThumbOptionPosY === 4) Screens_ThumbOptionSetArrow(Screens_ThumbOptionScreens);
    }

    function Screens_ThumbOptionSetArrow(array) {
        Screens_histArrow(
            'thumb_opt',
            Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY],
            array.length,
            array[Screens_ThumbOptionPosXArrays[Screens_ThumbOptionPosY]],
            Screens_ThumbOptionPosY
        );
    }

    var Screens_ThumbOptionScreens = [];
    var Screens_YesNo = [];
    var Screens_ThumbOptionArrays = [];
    var Screens_ThumbOptionPosXArrays = [];
    var Screens_ThumbOptionGOTO = [];

    function Screens_ThumbOptionSetArrowArray() {
        Screens_ThumbOptionScreens = [
            STR_LIVE,
            STR_FEATURED,
            STR_GAMES,
            STR_VIDEOS,
            STR_CLIP
        ];

        if (AddUser_UserIsSet()) {
            Screens_ThumbOptionScreens.push(STR_USER + STR_SPACE + STR_LIVE);
            Screens_ThumbOptionScreens.push(STR_USER + STR_SPACE + STR_LIVE_HOSTS);
            Screens_ThumbOptionScreens.push(STR_USER + STR_SPACE + STR_GAMES);
            Screens_ThumbOptionScreens.push(STR_USER + STR_SPACE + STR_VIDEOS);
            Screens_ThumbOptionScreens.push(STR_USER + STR_SPACE + STR_CHANNELS);
            Screens_ThumbOptionScreens.push(STR_USER + STR_SPACE + STR_HISTORY);
        }

        Screens_YesNo = [
            STR_YES,
            STR_NO
        ];
        Screens_ThumbOptionArrays = ['', '', '', Screens_YesNo, Screens_ThumbOptionScreens];
        Screens_ThumbOptionPosXArrays = [0, 0, 0, Screens_ThumbOptionStringGetHistory(), 0];

        Screens_ThumbOptionGOTO = [
            Main_Live,
            Main_Featured,
            Main_games,
            Main_Vod,
            Main_Clip,
            Main_UserLive,
            Main_UserHost,
            Main_usergames,
            Main_UserVod,
            Main_UserChannels,
            Main_History[Main_HistoryPos]
        ];
    }
    //Spacing for reease maker not trow erros frm jshint
    var Main_ItemsLimitMax = 100;

    var ChannelClip_game = '';
    var ChannelClip_views = '';
    var ChannelClip_title = '';
    var ChannelClip_playUrl = '';
    var ChannelClip_playUrl2 = '';
    var ChannelClip_createdAt = '';
    var ChannelClip_language = '';
    var ChannelClip_Id = 0;

    var ChannelVod_vodOffset = 0;
    var ChannelVod_DurationSeconds = 0;
    var ChannelVod_language = '';
    var ChannelVod_createdAt = '';
    var ChannelVod_views = '';
    var ChannelVod_Duration = '';
    var ChannelVod_title = '';
    var ChannelVod_game = '';
    var Main_History = [Main_HistoryLive, Main_HistoryVod, Main_HistoryClip];
    var Main_HistoryPos = 0;

    var Vod_DoAnimateThumb = 1;

    var AGame_fallowing = false;

    //Screens
    var Clip;
    var ChannelClip;
    var AGameClip;
    var Game;
    var UserGames;
    var Live;
    var Featured;
    var AGame;
    var Vod;
    var AGameVod;
    var UserVod;
    var ChannelVod;
    var UserHost;
    var UserLive;
    var UserChannels;
    var SearchGames;
    var SearchLive;
    var SearchChannels;
    var HistoryLive;
    var HistoryVod;
    var HistoryClip;

    var Base_obj = {
        posX: 0,
        posY: 0,
        currY: 0,
        row_id: 0,
        offsettopFontsize: 0,
        offsettop: 0,
        coloumn_id: 0,
        dataEnded: false,
        idObject: {},
        loadingData: false,
        itemsCount: 0,
        loadingDataTryMax: 5,
        loadingDataTimeout: 3500,
        MaxOffset: 0,
        offset: 0,
        visiblerows: 3,
        status: false,
        emptyContent: false,
        itemsCountCheck: false,
        FirstLoad: false,
        row: 0,
        data: null,
        token: null,
        data_cursor: 0,
        loadDataSuccess: Screens_loadDataSuccess,
        addrow: Screens_addrow,
        key_exit: function(goSidepanel) { //TODO overwrite this on if object
            Screens_RemoveAllFocus();

            if ((this.screen === Main_aGame) && !goSidepanel) {
                if (Main_values.Games_return) {
                    Main_values.Main_Go = Main_SearchGames;
                    Main_values.Main_gameSelected = Main_values.gameSelectedOld;
                    Main_values.gameSelectedOld = null;
                } else {
                    Main_values.Main_Go = Main_values.Main_BeforeAgame;
                    Main_values.Main_BeforeAgame = Main_games;
                }
                Screens_BasicExit(Main_values.Main_Go);
                Main_SwitchScreenAction();
            } else if ((this.screen === Main_SearchLive || this.screen === Main_SearchGames ||
                    this.screen === Main_SearchChannels) && !goSidepanel) {
                if (Main_values.Main_Go === Main_values.Main_BeforeSearch) Main_values.Main_Go = Main_Live;
                else Main_values.Main_Go = Main_values.Main_BeforeSearch;
                Main_values.Search_isSearching = false;
                Screens_BasicExit(Main_values.Main_Go);
                Main_SwitchScreenAction();
            } else if ((this.screen === Main_AGameClip || this.screen === Main_AGameVod) && !goSidepanel) {
                Screens_BasicExit(Main_aGame);
                Main_SwitchScreenAction();
            } else if ((this.screen === Main_ChannelClip || this.screen === Main_ChannelVod) && !goSidepanel) {
                Screens_BasicExit(Main_ChannelContent);
                Main_SwitchScreenAction();
            } else Screens_OpenSidePanel();
        },
        concatenate: function(responseText) {
            //console.log(responseText);
            if (this.data) {
                responseText = JSON.parse(responseText);

                if (responseText[this.object]) {
                    this.data = this.data.concat(responseText[this.object]);
                    this.offset = this.data.length;
                }

                this.setMax(responseText);
            } else {
                responseText = JSON.parse(responseText);

                this.data = responseText[this.object];
                if (this.data) {
                    this.offset = this.data.length;
                    this.setMax(responseText);
                } else this.data = [];

                this.loadDataSuccess();
            }
            this.loadingData = false;
        }
    };

    var Base_Vod_obj = {
        ItemsLimit: Main_ItemsLimitVideo,
        ColoumnsCount: Main_ColoumnsCountVideo,
        ItemsReloadLimit: Main_ItemsReloadLimitVideo,
        thumbclass: 'stream_thumbnail_live_holder',
        rowClass: 'animate_height_transition',
        histPosXName: 'HistoryVod_histPosX',
        screenType: 1,
        addFocus: function(y, x, idArray, forceScroll) {
            this.AnimateThumb(this);
            Screens_addFocusVideo(y, x, idArray, forceScroll);
        },
        setTODialog: function() {
            Main_AddClass('dialog_thumb_opt_setting_-1', 'hideimp');
            Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_VOD_DIS);
        },
        setMax: function(tempObj) {
            if (tempObj[this.object].length < (Main_ItemsLimitMax - 5)) this.dataEnded = true;
        },
        img_404: IMG_404_VOD,
        HasSwitches: true,
        period: ['day', 'week', 'month', 'all'],
        empty_str: function() {
            return STR_NO + STR_SPACE + (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA);
        },
        AnimateThumbId: null,
        HasAnimateThumb: true,
        Vod_newImg: new Image(),
        AnimateThumb: ScreensObj_AnimateThumbId,
        addCellBase: function(cell, thubnail) {
            if (!this.idObject[cell._id] && (thubnail + '').indexOf('404_processing') === -1) {

                cell.preview.template = thubnail;

                this.itemsCount++;
                this.idObject[cell._id] = 1;

                this.row.appendChild(
                    Screens_createCellVod(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        ScreensObj_VodCellArray(cell)
                    )
                );

                this.coloumn_id++;
            }
        },
        addCell: function(cell) {
            this.addCellBase(cell, cell.preview.template);
        }
    };

    function ScreensObj_InitVod() {
        Vod = Screens_assign({
            periodMaxPos: 4,
            HeaderQuatity: 2,
            key_pgDown: Main_Clip,
            key_pgUp: Main_games,
            object: 'vods',
            ids: Screens_ScreenIds('Vod'),
            table: 'stream_table_vod',
            screen: Main_Vod,
            highlightSTR: 'Vod_highlight',
            highlight: Main_getItemBool('Vod_highlight', false),
            periodPos: Main_getItemInt('vod_periodPos', 2),
            base_url: Main_kraken_api + 'videos/top?limit=' + Main_ItemsLimitMax,
            set_url: function() {
                this.url = this.base_url + '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') +
                    '&sort=views&offset=' + this.offset + '&period=' + this.period[this.periodPos - 1] +
                    (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
            },
            key_play: function() {
                if (this.posY === -1) {
                    if (this.posX === 0) {
                        this.highlight = !this.highlight;
                        this.SetPeriod();
                        Screens_StartLoad();
                        Main_setItem(this.highlightSTR, this.highlight ? 'true' : 'false');
                    } else Screens_PeriodStart();
                } else Main_OpenVod(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            },
            SwitchesIcons: ['movie-play', 'history'],
            addSwitches: function() {
                ScreensObj_addSwitches(
                    [
                        STR_SPACE + STR_SPACE + STR_SWITCH_VOD,
                        STR_SPACE + STR_SPACE + STR_SWITCH_CLIP
                    ]
                );
            },
            label_init: function() {
                Sidepannel_SetDefaultLables();
                Main_values.Sidepannel_IsUser = false;
                Sidepannel_SetTopOpacity(this.screen);
                this.SetPeriod();
            },
            SetPeriod: function() {
                Main_setItem('vod_periodPos', this.periodPos);
                ScreensObj_SetTopLable(STR_VIDEOS, (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) +
                    STR_SPACE + Main_Periods[this.periodPos - 1]);
            },
        }, Base_obj);

        Vod = Screens_assign(Vod, Base_Vod_obj);
    }

    function ScreensObj_InitChannelVod() {
        ChannelVod = Screens_assign({
            periodMaxPos: 2,
            HeaderQuatity: 2,
            key_pgDown: Main_ChannelClip,
            object: 'videos',
            ids: Screens_ScreenIds('ChannelVod'),
            table: 'stream_table_channel_vod',
            screen: Main_ChannelVod,
            time: ['time', 'views'],
            extraoffset: 0,
            OffSetPos: 0,
            highlightSTR: 'ChannelVod_highlight',
            highlight: Main_getItemBool('ChannelVod_highlight', false),
            periodPos: Main_getItemInt('ChannelVod_periodPos', 1),
            base_url: Main_kraken_api + 'channels/',
            set_url: function() {
                this.url = this.base_url +
                    encodeURIComponent(Main_values.Main_selectedChannel_id) + '/videos?limit=' + Main_ItemsLimitMax +
                    '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') + '&sort=' +
                    this.time[this.periodPos - 1] + '&offset=' + (this.offset + this.extraoffset);
            },
            key_play: function() {
                if (this.posY === -1) {
                    if (this.posX === 0) {
                        this.highlight = !this.highlight;
                        this.SetPeriod();
                        Screens_StartLoad();
                        Main_setItem(this.highlightSTR, this.highlight ? 'true' : 'false');
                    } else if (this.posX === 1) {
                        this.periodPos++;
                        if (this.periodPos > this.periodMaxPos) this.periodPos = 1;
                        this.SetPeriod();
                        Screens_StartLoad();
                    } else Screens_OffSetStart();
                } else Main_OpenVod(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            },
            SwitchesIcons: ['movie-play', 'history', 'offset'],
            addSwitches: function() {
                ScreensObj_addSwitches(
                    [
                        STR_SPACE + STR_SPACE + STR_SWITCH_VOD,
                        STR_SPACE + STR_SPACE + STR_SWITCH_TYPE,
                        STR_SPACE + STR_SPACE + STR_SWITCH_POS
                    ]
                );
            },
            lastselectedChannel: '',
            label_init: function() {
                if (!Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
                if (Main_values.Main_selectedChannel !== this.lastselectedChannel) {
                    this.OffSetPos = 0;
                    this.extraoffset = 0;
                    this.status = false;
                }
                this.lastselectedChannel = Main_values.Main_selectedChannel;
                Main_cleanTopLabel();
                Main_IconLoad('label_side_panel', 'icon-arrow-left', STR_GOBACK);
                this.SetPeriod();
            },
            SetPeriod: function() {
                Main_setItem('UserVod_periodPos', this.periodPos);

                ScreensObj_SetTopLable(Main_values.Main_selectedChannelDisplayname,
                    (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) +
                    (this.periodPos === 1 ? STR_TIME : STR_VIWES) + ", Offset " + inUseObj.extraoffset);

            },
            label_exit: function() {
                Main_RestoreTopLabel();
            }
        }, Base_obj);

        ChannelVod = Screens_assign(ChannelVod, Base_Vod_obj);

        ChannelVod.addCell = function(cell) {

            var thumbnail = cell.preview.template;

            // video content can be null sometimes, in that case the preview will be 404_processing
            // but if the video is from the stream that has not yet ended it can also be 404_processing and not be a null video
            if (!this.row_id && (thumbnail + '').indexOf('404_processing') !== -1)
                thumbnail = (ChannelContent_offline_image !== null ? ChannelContent_offline_image : this.img_404);

            this.addCellBase(cell, thumbnail);
        };
    }

    function ScreensObj_InitAGameVod() {
        AGameVod = Screens_assign({
            periodMaxPos: 4,
            HeaderQuatity: 2,
            object: 'vods',
            key_pgDown: Main_Vod,
            key_pgUp: Main_Featured,
            ids: Screens_ScreenIds('AGameVod'),
            table: 'stream_table_a_game_vod',
            screen: Main_AGameVod,
            highlightSTR: 'AGameVod_highlight',
            highlight: Main_getItemBool('AGameVod_highlight', false),
            periodPos: Main_getItemInt('AGameVod_periodPos', 2),
            base_url: Main_kraken_api + 'videos/top?game=',
            set_url: function() {
                this.url = this.base_url + encodeURIComponent(Main_values.Main_gameSelected) + '&limit=' +
                    Main_ItemsLimitMax + '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') +
                    '&sort=views&offset=' + this.offset + '&period=' + this.period[this.periodPos - 1] +
                    (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
            },
            key_play: function() {
                if (this.posY === -1) {
                    if (this.posX === 0) {
                        this.highlight = !this.highlight;
                        this.SetPeriod();
                        Screens_StartLoad();
                        Main_setItem(this.highlightSTR, this.highlight ? 'true' : 'false');
                    } else Screens_PeriodStart();
                } else Main_OpenVod(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            },
            SwitchesIcons: ['movie-play', 'history'],
            addSwitches: function() {
                ScreensObj_addSwitches(
                    [
                        STR_SPACE + STR_SPACE + STR_SWITCH_VOD,
                        STR_SPACE + STR_SPACE + STR_SWITCH_CLIP
                    ]
                );
            },
            OldgameSelected: '',
            label_init: function() {
                ScreensObj_TopLableAgameInit();
                this.SetPeriod();
            },
            label_exit: ScreensObj_TopLableAgameExit,
            SetPeriod: function() {
                Main_setItem('AGameVod_periodPos', this.periodPos);

                ScreensObj_SetTopLable(Main_values.Main_gameSelected, (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_SPACE + Main_Periods[this.periodPos - 1]);
            }
        }, Base_obj);

        AGameVod = Screens_assign(AGameVod, Base_Vod_obj);
    }

    function ScreensObj_InitUserVod() {
        UserVod = Screens_assign({
            periodMaxPos: 2,
            HeaderQuatity: 3,
            object: 'videos',
            key_pgDown: Main_UserChannels,
            key_pgUp: Main_usergames,
            ids: Screens_ScreenIds('UserVod'),
            table: 'stream_table_user_vod',
            screen: Main_UserVod,
            time: ['time', 'views'],
            highlightSTR: 'UserVod_highlight',
            highlight: Main_getItemBool('UserVod_highlight', false),
            periodPos: Main_getItemInt('UserVod_periodPos', 1),
            base_url: Main_kraken_api + 'videos/followed?limit=' + Main_ItemsLimitMax,
            set_url: function() {
                this.token = Main_OAuth + AddUser_UsernameArray[0].access_token;

                this.url = this.base_url + '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') +
                    '&sort=' + this.time[this.periodPos - 1] + '&offset=' + this.offset;
            },
            key_play: function() {
                if (this.posY === -1) {
                    if (this.posX === 0) {
                        this.highlight = !this.highlight;
                        this.SetPeriod();
                        Screens_StartLoad();
                        Main_setItem(this.highlightSTR, this.highlight ? 'true' : 'false');
                    } else {
                        this.periodPos++;
                        if (this.periodPos > this.periodMaxPos) this.periodPos = 1;
                        this.SetPeriod();
                        Screens_StartLoad();
                    }
                } else Main_OpenVod(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            },
            SwitchesIcons: ['movie-play', 'history'],
            addSwitches: function() {
                ScreensObj_addSwitches(
                    [
                        STR_SPACE + STR_SPACE + STR_SWITCH_VOD,
                        STR_SPACE + STR_SPACE + STR_SWITCH_TYPE
                    ]
                );
            },
            label_init: function() {
                this.SetPeriod();
                Sidepannel_SetTopOpacity(this.screen);
            },
            SetPeriod: function() {
                Main_setItem('UserVod_periodPos', this.periodPos);

                ScreensObj_SetTopLable(STR_USER, (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) +
                    (this.periodPos === 1 ? STR_TIME : STR_VIWES));
            }
        }, Base_obj);

        UserVod = Screens_assign(UserVod, Base_Vod_obj);
    }

    var Base_Live_obj = {
        ItemsReloadLimit: Main_ItemsReloadLimitVideo,
        ItemsLimit: Main_ItemsLimitVideo,
        ColoumnsCount: Main_ColoumnsCountVideo,
        addFocus: Screens_addFocusVideo,
        rowClass: 'animate_height_transition',
        thumbclass: 'stream_thumbnail_live_holder',
        histPosXName: 'HistoryLive_histPosX',
        screenType: 0,
        img_404: IMG_404_VIDEO,
        setMax: function(tempObj) {
            this.MaxOffset = tempObj._total;
            if (this.data.length >= this.MaxOffset || typeof this.MaxOffset === 'undefined') this.dataEnded = true;
        },
        empty_str: function() {
            return STR_NO + STR_SPACE + STR_LIVE_CHANNELS;
        },
        setTODialog: function() {
            Main_AddClass('dialog_thumb_opt_setting_-1', 'hideimp');
            Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_LIVE_DIS);
        },
        addCell: function(cell) {
            this.addCellTemp(cell);
        },
        addCellTemp: function(cell) {
            if (!this.idObject[cell.channel._id]) {

                this.itemsCount++;
                this.idObject[cell.channel._id] = 1;

                this.row.appendChild(
                    Screens_createCellLive(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        ScreensObj_LiveCellArray(cell)
                    )
                );

                this.coloumn_id++;
            }
        },
    };

    function ScreensObj_InitLive() {
        Live = Screens_assign({
            HeaderQuatity: 2,
            ids: Screens_ScreenIds('Live'),
            table: 'stream_table_live',
            screen: Main_Live,
            object: 'streams',
            key_pgDown: Main_Featured,
            key_pgUp: Main_Clip,
            base_url: Main_kraken_api + 'streams?limit=' + Main_ItemsLimitMax,
            set_url: function() {
                if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
                this.url = this.base_url + '&offset=' + this.offset +
                    (Main_ContentLang !== "" ? ('&broadcaster_language=' + Main_ContentLang) : '');
            },
            label_init: function() {
                Sidepannel_SetDefaultLables();
                Main_values.Sidepannel_IsUser = false;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_LIVE);
            },
            key_play: function() {
                Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            }
        }, Base_obj);

        Live = Screens_assign(Live, Base_Live_obj);
    }

    function ScreensObj_InitSearchLive() {
        SearchLive = Screens_assign({
            HeaderQuatity: 2,
            ids: Screens_ScreenIds('SearchLive'),
            table: 'stream_table_search_live',
            screen: Main_SearchLive,
            object: 'streams',
            base_url: Main_kraken_api + 'search/streams?limit=' + Main_ItemsLimitMax + '&query=',
            set_url: function() {
                if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
                this.url = this.base_url + encodeURIComponent(Main_values.Search_data) +
                    '&offset=' + this.offset;
            },
            label_init: function() {
                Main_values.Search_isSearching = true;
                Main_cleanTopLabel();
                if (this.lastData !== Main_values.Search_data) this.status = false;
                this.lastData = Main_values.Search_data;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_SEARCH + STR_SPACE + STR_LIVE, "'" + Main_values.Search_data + "'");
            },
            label_exit: function() {
                Main_values.Search_isSearching = false;
                if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
            },
            key_play: function() {
                Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            }
        }, Base_obj);

        SearchLive = Screens_assign(SearchLive, Base_Live_obj);

        SearchLive.setMax = function(tempObj) {
            this.MaxOffset = tempObj._total;
            if (this.data.length >= this.MaxOffset || typeof this.MaxOffset === 'undefined' ||
                (this.data.length < Main_ItemsLimitMax)) this.dataEnded = true;
        };
    }

    function ScreensObj_InitUserLive() {
        UserLive = Screens_assign({
            HeaderQuatity: 3,
            ids: Screens_ScreenIds('UserLive'),
            table: 'stream_table_user_live',
            screen: Main_UserLive,
            object: 'streams',
            key_pgDown: Main_UserHost,
            key_pgUp: Main_HistoryLive,
            base_url: Main_kraken_api + 'streams/',
            loadChannelOffsset: 0,
            followerChannels: '',
            followerChannelsDone: false,
            set_url: function() {
                if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;

                if (AddUser_UsernameArray[0].access_token) {
                    //User has added a key
                    this.HeaderQuatity = 3;
                    this.token = Main_OAuth + AddUser_UsernameArray[0].access_token;
                    this.url = this.base_url + 'followed?' + 'limit=' + Main_ItemsLimitMax + '&offset=' +
                        this.offset + '&stream_type=all';
                } else {
                    //User didn't added a key
                    this.HeaderQuatity = 2;
                    this.token = null;
                    if (this.followerChannelsDone) {
                        //User fallowed channels list is done, load live channels
                        this.url = this.base_url + '?channel=' + encodeURIComponent(this.followerChannels) + '&' +
                            'limit=' + Main_ItemsLimitMax + '&offset=' + this.offset + '&stream_type=all';
                    } else {
                        //User fallowed channels list is not done, load fallowed channels
                        this.url = Main_kraken_api + 'users/' +
                            encodeURIComponent(AddUser_UsernameArray[0].id) +
                            '/follows/channels?limit=' + Main_ItemsLimitMax + '&offset=' + this.loadChannelOffsset +
                            '&sortby=created_at';
                    }
                }
            },
            label_init: function() {
                ScreensObj_TopLableUserInit();
                ScreensObj_SetTopLable(STR_USER, STR_LIVE_CHANNELS);
            },
            key_play: function() {
                Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            }
        }, Base_obj);

        UserLive = Screens_assign(UserLive, Base_Live_obj);

        UserLive.concatenate = function(responseText) {
            //console.log(responseText);
            if (this.token || this.followerChannelsDone) {
                //User has added a key or fallowed channels list is done, concatenate live channels
                if (this.data) {
                    responseText = JSON.parse(responseText);

                    if (responseText[this.object]) {
                        this.data = this.data.concat(responseText[this.object]);
                        this.offset = this.data.length;
                    }

                    this.setMax(responseText);
                } else {
                    responseText = JSON.parse(responseText);

                    this.data = responseText[this.object];
                    if (this.data) this.offset = this.data.length;
                    else this.data = [];

                    this.setMax(responseText);

                    //Live user sort by views was removed bt twitch without any warning.
                    if (this.dataEnded && this.token) {
                        this.data.sort(function(a, b) {
                            return (b.viewers - a.viewers);
                        });
                    }

                    this.loadDataSuccess();
                }
                this.loadingData = false;
            } else {
                var response = JSON.parse(responseText).follows,
                    response_items = response.length;

                if (response_items) { // response_items here is not always 99 because banned channels, so check until it is 0
                    //User fallowed channels list is not done, load fallowed channels
                    var ChannelTemp = '',
                        x = 0;

                    for (x; x < response_items; x++) {
                        ChannelTemp = response[x].channel._id + ',';
                        if (this.followerChannels.indexOf(ChannelTemp) === -1) this.followerChannels += ChannelTemp;
                    }

                    this.loadChannelOffsset += response_items;
                } else { // end
                    //User fallowed channels list is done, load live channels
                    this.followerChannels = this.followerChannels.slice(0, -1);
                    this.followerChannelsDone = true;
                }
                Screens_loadDataRequest();
            }
        };
    }

    function ScreensObj_InitUserHost() {
        UserHost = Screens_assign({
            HeaderQuatity: 2,
            ids: Screens_ScreenIds('UserHost'),
            table: 'stream_table_user_host',
            screen: Main_UserHost,
            object: 'hosts',
            key_pgDown: Main_usergames,
            key_pgUp: Main_UserLive,
            use_hls: true,
            base_url: 'https://api.twitch.tv/api/users/',
            set_url: function() {
                if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
                this.url = this.base_url +
                    encodeURIComponent(AddUser_UsernameArray[0].name) +
                    '/followed/hosting?limit=' + Main_ItemsLimitMax + '&offset=' + this.offset;
            },
            label_init: function() {
                ScreensObj_TopLableUserInit();

                ScreensObj_SetTopLable(STR_USER, STR_LIVE_HOSTS);
            },
            key_play: function() {
                Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            }
        }, Base_obj);

        UserHost = Screens_assign(UserHost, Base_Live_obj);

        UserHost.addCell = function(cell) {
            if (!this.idObject[cell.target._id + '' + cell._id]) { //combined id host and hosted

                this.itemsCount++;
                this.idObject[cell.target._id + '' + cell._id] = 1;

                this.row.appendChild(
                    Screens_createCellLive(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        [
                            cell.target.preview_urls.template, //0
                            cell.display_name + STR_USER_HOSTING + cell.target.channel.display_name, //1
                            cell.target.title, //2
                            cell.target.meta_game, //3
                            STR_FOR.charAt(0).toUpperCase() + STR_FOR.slice(1) +
                            Main_addCommas(cell.target.viewers) + STR_SPACE + STR_VIEWER, //4
                            '', //5 quality
                            cell.target.channel.name, //6
                            '', //7 broadcast id
                            false, //8
                            cell.target.channel.logo, //9
                            '', //10 partner
                            '', //11 stream creat at string
                            '', //12 stream creat at
                            cell.target.viewers, //13
                            cell.target._id //14
                        ]
                    )
                );

                this.coloumn_id++;
            }
        };
    }

    function ScreensObj_InitAGame() {
        AGame = Screens_assign({
            HeaderQuatity: 2,
            ids: Screens_ScreenIds('AGame'),
            table: 'stream_table_a_game',
            screen: Main_aGame,
            object: 'streams',
            key_pgDown: Main_Vod,
            key_pgUp: Main_Featured,
            base_url: Main_kraken_api + 'streams?game=',
            set_url: function() {
                if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
                this.url = this.base_url + encodeURIComponent(Main_values.Main_gameSelected) +
                    '&limit=' + Main_ItemsLimitMax + '&offset=' + this.offset +
                    (Main_ContentLang !== "" ? ('&broadcaster_language=' + Main_ContentLang) : '');
            },
            label_init: function() {
                ScreensObj_TopLableAgameInit();

                if (Main_values.Search_isSearching) { //Reset label as the app may be restoring from background
                    Main_cleanTopLabel();
                } else Main_values.gameSelectedOld = null;

                ScreensObj_SetTopLable(Main_values.Main_gameSelected, STR_LIVE);
            },
            label_exit: ScreensObj_TopLableAgameExit,
            HasSwitches: true,
            SwitchesIcons: ['movie-play', 'movie', 'heart-o'],
            addSwitches: function() {
                ScreensObj_addSwitches(
                    [
                        STR_SPACE + STR_SPACE + STR_VIDEOS,
                        STR_SPACE + STR_SPACE + STR_CLIPS,
                        STR_SPACE + STR_SPACE + STR_FALLOW
                    ]
                );
            },
            key_play: function() {
                if (this.posY !== -1) {
                    Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
                } else AGame_headerOptions();
            },
        }, Base_obj);

        AGame = Screens_assign(AGame, Base_Live_obj);
    }

    function ScreensObj_InitFeatured() {
        Featured = Screens_assign({
            HeaderQuatity: 2,
            ids: Screens_ScreenIds('Featured'),
            table: 'stream_table_featured',
            screen: Main_Featured,
            key_pgDown: Main_games,
            key_pgUp: Main_Live,
            base_url: Main_kraken_api + 'streams/featured?limit=' + Main_ItemsLimitMax,
            set_url: function() {
                this.url = this.base_url + '&offset=' + this.offset +
                    (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token ? '&oauth_token=' +
                        AddUser_UsernameArray[0].access_token : '');
            },
            label_init: function() {
                Sidepannel_SetDefaultLables();
                Main_values.Sidepannel_IsUser = false;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_FEATURED);
            },
            object: 'featured',
            key_play: function() {
                Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            }
        }, Base_obj);

        Featured = Screens_assign(Featured, Base_Live_obj);

        Featured.addCell = function(cell) {
            cell = cell.stream;
            this.addCellTemp(cell);
        };
    }

    var Base_Clip_obj = {
        HeaderQuatity: 2,
        ItemsLimit: Main_ItemsLimitVideo,
        TopRowCreated: false,
        ItemsReloadLimit: Main_ItemsReloadLimitVideo,
        ColoumnsCount: Main_ColoumnsCountVideo,
        addFocus: Screens_addFocusVideo,
        rowClass: 'animate_height_transition',
        thumbclass: 'stream_thumbnail_live_holder',
        histPosXName: 'HistoryClip_histPosX',
        screenType: 2,
        cursor: null,
        object: 'clips',
        period: ['day', 'week', 'month', 'all'],
        img_404: IMG_404_VIDEO,
        empty_str: function() {
            return STR_NO + STR_SPACE + STR_CLIPS;
        },
        setTODialog: function() {
            Main_AddClass('dialog_thumb_opt_setting_-1', 'hideimp');
            Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_CLIP_DIS);
        },
        HasSwitches: true,
        SwitchesIcons: ['history', 'play-1'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE + STR_SPACE + STR_SWITCH_CLIP,
                    STR_SPACE + STR_SPACE + STR_PLAY_ALL
                ]
            );
        },
        setMax: function(tempObj) {
            this.cursor = tempObj._cursor;
            if (this.cursor === '') this.dataEnded = true;
        },
        key_play: function() {
            if (this.posY === -1) {
                if (!this.loadingData) {
                    if (!this.posX) Screens_PeriodStart();
                    else {
                        PlayClip_All = true;
                        Screens_removeFocusFallow();
                        this.posX = 0;
                        this.posY = 0;
                        Main_OpenClip(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
                    }
                }
            } else Main_OpenClip(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
        },
        Cells: [],
        addCell: function(cell) {
            if (!this.idObject[cell.tracking_id]) {
                this.itemsCount++;
                this.idObject[cell.tracking_id] = 1;

                this.row.appendChild(
                    Screens_createCellClip(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        [
                            cell.slug, //0
                            cell.duration, //1
                            cell.broadcaster.id, //2
                            cell.game, //3
                            cell.broadcaster.display_name, //4
                            cell.broadcaster.logo.replace("150x150", "300x300"), //5
                            cell.broadcaster.name, //6
                            cell.tracking_id, //7
                            (cell.vod !== null ? cell.vod.id : null), //8
                            (cell.vod !== null ? cell.vod.offset : null), //9
                            twemoji.parse(cell.title), //10
                            '[' + cell.language.toUpperCase() + ']', //11
                            cell.created_at, //12
                            cell.views, //13
                            Main_addCommas(cell.views) + STR_VIEWS, //14
                            cell.thumbnails.medium, //15
                            STR_CREATED_AT + Main_videoCreatedAt(cell.created_at), //16
                        ]
                    )
                );

                this.coloumn_id++;
            }
        }
    };

    function ScreensObj_InitClip() {
        Clip = Screens_assign({
            ids: Screens_ScreenIds('Clip'),
            table: 'stream_table_clip',
            screen: Main_Clip,
            key_pgDown: Main_Live,
            key_pgUp: Main_Vod,
            periodPos: Main_getItemInt('Clip_periodPos', 2),
            base_url: Main_kraken_api + 'clips/top?limit=' + Main_ItemsLimitMax,
            set_url: function() {
                this.url = this.base_url + '&period=' + this.period[this.periodPos - 1] +
                    (this.cursor ? '&cursor=' + this.cursor : '') +
                    (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
            },
            SetPeriod: function() {
                Main_setItem('Clip_periodPos', this.periodPos);
                ScreensObj_SetTopLable(STR_CLIPS, Main_Periods[this.periodPos - 1]);
            },
            label_init: function() {
                this.SetPeriod();
                Sidepannel_SetDefaultLables();
                Main_values.Sidepannel_IsUser = false;
                Sidepannel_SetTopOpacity(this.screen);

            },
            label_exit: function() {
                Main_RestoreTopLabel();
            },
        }, Base_obj);

        Clip = Screens_assign(Clip, Base_Clip_obj);
    }

    function ScreensObj_InitChannelClip() {
        ChannelClip = Screens_assign({
            ids: Screens_ScreenIds('ChannelClip'),
            table: 'stream_table_channel_clip',
            screen: Main_ChannelClip,
            key_pgUp: Main_ChannelVod,
            periodPos: Main_getItemInt('ChannelClip_periodPos', 2),
            base_url: Main_kraken_api + 'clips/top?channel=',
            set_url: function() {
                this.url = this.base_url + encodeURIComponent(Main_values.Main_selectedChannel) +
                    '&limit=' + Main_ItemsLimitMax + '&period=' +
                    this.period[this.periodPos - 1] + (this.cursor ? '&cursor=' + this.cursor : '');
            },
            SetPeriod: function() {
                Main_setItem('ChannelClip_periodPos', this.periodPos);

                ScreensObj_SetTopLable(Main_values.Main_selectedChannelDisplayname, STR_CLIPS + STR_SPACE +
                    Main_Periods[this.periodPos - 1]);
            },
            label_init: function() {
                if (!Main_values.Search_isSearching && Main_values.Main_selectedChannel_id)
                    ChannelContent_RestoreChannelValue();
                if (Main_values.Main_selectedChannel !== this.lastselectedChannel) this.status = false;
                Main_cleanTopLabel();
                this.SetPeriod();
                Main_IconLoad('label_side_panel', 'icon-arrow-left', STR_GOBACK);
                this.lastselectedChannel = Main_values.Main_selectedChannel;
            },
            label_exit: Main_RestoreTopLabel,
        }, Base_obj);

        ChannelClip = Screens_assign(ChannelClip, Base_Clip_obj);
    }

    function ScreensObj_InitAGameClip() {
        AGameClip = Screens_assign({
            ids: Screens_ScreenIds('AGameClip'),
            table: 'stream_table_a_game_clip',
            screen: Main_AGameClip,
            key_pgDown: Main_Vod,
            key_pgUp: Main_Featured,
            periodPos: Main_getItemInt('AGameClip_periodPos', 2),
            base_url: Main_kraken_api + 'clips/top?game=',
            set_url: function() {
                this.url = this.base_url + encodeURIComponent(Main_values.Main_gameSelected) + '&limit=' + Main_ItemsLimitMax +
                    '&period=' + this.period[this.periodPos - 1] + (this.cursor ? '&cursor=' + this.cursor : '') +
                    (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
            },
            SetPeriod: function() {
                Main_setItem('AGameClip_periodPos', this.periodPos);

                ScreensObj_SetTopLable(Main_values.Main_gameSelected, STR_CLIPS + STR_SPACE +
                    Main_Periods[this.periodPos - 1]);
            },
            label_init: function() {
                ScreensObj_TopLableAgameInit();
                this.SetPeriod();
            },
            label_exit: ScreensObj_TopLableAgameExit,
        }, Base_obj);

        AGameClip = Screens_assign(AGameClip, Base_Clip_obj);
    }

    var Base_Game_obj = {
        HeaderQuatity: 2,
        thumbclass: 'stream_thumbnail_game_holder',
        ItemsReloadLimit: Main_ItemsReloadLimitGame,
        ItemsLimit: Main_ItemsLimitGame,
        rowClass: 'animate_height_transition_games',
        ColoumnsCount: Main_ColoumnsCountGame,
        addFocus: Screens_addFocusGame,
        img_404: IMG_404_GAME,
        screenType: 3,
        empty_str: function() {
            return STR_NO + STR_SPACE + STR_LIVE_GAMES;
        },
        setTODialog: Screens_ThumbOptionHideSpecial,
        key_play: function() {
            Main_removeFocus(this.posY + '_' + this.posX, this.ids);

            Main_values.Main_gameSelected = JSON.parse(document.getElementById(this.ids[5] + this.posY + '_' + this.posX).getAttribute(Main_DataAttribute));
            Main_values.Main_gameSelected_id = Main_values.Main_gameSelected[3];
            Main_values.Main_gameSelected = Main_values.Main_gameSelected[1];

            document.body.removeEventListener("keydown", Screens_handleKeyDown);
            Main_values.Main_BeforeAgame = this.screen;
            Main_values.Main_Go = Main_aGame;
            Main_values.Main_BeforeAgameisSet = true;

            Main_addFocusVideoOffset = 0;
            document.body.removeEventListener("keydown", Screens_handleKeyDown);
            Main_HideElement(this.ids[10]);

            Main_SwitchScreenAction();
        },
        setMax: function(tempObj) {
            if (this.useHelix) {
                if (tempObj.pagination.cursor) this.after = tempObj.pagination.cursor;
                else this.dataEnded = true;
            } else {
                this.MaxOffset = tempObj._total;
                if (this.data.length >= this.MaxOffset) this.dataEnded = true;
            }
        },
        addCell: function(cell) {
            var hasLive = this.isLive || this.screen === Main_games;
            var game = hasLive ? cell.game : cell;
            if (!this.idObject[game._id]) {

                this.itemsCount++;
                this.idObject[game._id] = 1;

                this.row.appendChild(
                    Screens_createCellGame(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids, [game.box.template.replace("{width}x{height}", Main_GameSize),
                            game.name,
                            hasLive ? Main_addCommas(cell.channels) + STR_SPACE + STR_CHANNELS + STR_BR + STR_FOR +
                            Main_addCommas(cell.viewers) + STR_SPACE + STR_VIEWER : '',
                            game._id
                        ]));

                this.coloumn_id++;
            }
        }
    };

    function ScreensObj_InitGame() {
        Game = Screens_assign({
            ids: Screens_ScreenIds('Game'),
            table: 'stream_table_games',
            screen: Main_games,
            key_pgDown: Main_Vod,
            key_pgUp: Main_Featured,
            object: 'top',
            useHelix: false,
            base_url: Main_kraken_api + 'games/top?limit=' + Main_ItemsLimitMax,
            set_url: function() {
                if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset && !this.useHelix) this.dataEnded = true;
                this.url = this.base_url + (this.useHelix ? '&after=' + this.after : '&offset=' + this.offset);
            },
            label_init: function() {
                Sidepannel_SetDefaultLables();
                Main_values.Sidepannel_IsUser = false;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_GAMES);
            },
            setHelix: function() {
                this.useHelix = true;
                this.base_url = 'https://api.twitch.tv/helix/games/top?first=' + Main_ItemsLimitMax;
                this.object = 'data';
                this.forceResetHelix = false;
                this.addCell = function(cell) {
                    if (!this.idObject[cell.id]) {

                        this.itemsCount++;
                        this.idObject[cell.id] = 1;

                        this.row.appendChild(
                            Screens_createCellGame(
                                this.row_id + '_' + this.coloumn_id,
                                this.ids, [cell.box_art_url.replace("{width}x{height}", Main_GameSize),
                                    cell.name,
                                    '',
                                    cell._id
                                ]));

                        this.coloumn_id++;
                    }
                };
                Screens_StartLoad();
            },
            resetHelix: function() {
                this.useHelix = false;
                this.base_url = Main_kraken_api + 'games/top?limit=' + Main_ItemsLimitMax;
                this.object = 'top';
                this.addCell = Base_Game_obj.addCell;
            },
        }, Base_obj);

        Game = Screens_assign(Game, Base_Game_obj);
    }

    function ScreensObj_InitUserGames() {
        UserGames = Screens_assign({
            ids: Screens_ScreenIds('UserGames'),
            table: 'stream_table_user_games',
            screen: Main_usergames,
            key_pgDownNext: Main_UserChannels,
            key_pgDown: Main_UserVod,
            key_pgUp: Main_UserHost,
            isLive: Main_getItemBool('user_Games_live', true),
            OldUserName: '',
            object: 'follows',
            use_hls: true,
            base_url: 'https://api.twitch.tv/api/users/',
            set_url: function() {
                if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
                this.url = this.base_url + encodeURIComponent(AddUser_UsernameArray[0].name) + '/follows/games';

                if (this.isLive) this.url += '/live?limit=750';
                else this.url += '?limit=' + Main_ItemsLimitMax + '&offset=' + this.offset;
            },
            key_refresh: function() {
                this.isLive = !this.isLive;

                ScreensObj_SetTopLable(STR_USER, (this.isLive ? STR_LIVE_GAMES : STR_FALLOW_GAMES));

                Screens_StartLoad();

                Main_setItem('user_Games_live', this.isLive ? 'true' : 'false');
            },
            label_init: function() {
                ScreensObj_TopLableUserInit();
                Main_IconLoad('label_refresh', 'icon-refresh', STR_USER_GAMES_CHANGE + STR_LIVE_GAMES + '/' + STR_FALLOW_GAMES + ":" + STR_GUIDE);

                ScreensObj_SetTopLable(STR_USER, (this.isLive ? STR_LIVE_GAMES : STR_FALLOW_GAMES));
            },
            label_exit: function() {
                Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);
            },
        }, Base_obj);

        UserGames = Screens_assign(UserGames, Base_Game_obj);
    }

    function ScreensObj_InitSearchGames() {
        SearchGames = Screens_assign({
            ids: Screens_ScreenIds('SearchGames'),
            table: 'stream_table_search_game',
            screen: Main_SearchGames,
            isLive: false,
            OldUserName: '',
            object: 'games',
            lastData: '',
            base_url: Main_kraken_api + 'search/games?query=',
            set_url: function() {
                this.dataEnded = true;
                this.url = this.base_url + encodeURIComponent(Main_values.Search_data);
            },
            label_init: function() {
                if (!Main_values.gameSelectedOld) Main_values.gameSelectedOld = Main_values.Main_gameSelected;
                Main_values.Search_isSearching = true;
                Main_cleanTopLabel();
                if (this.lastData !== Main_values.Search_data) this.status = false;
                this.lastData = Main_values.Search_data;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_SEARCH + STR_SPACE + STR_GAMES, "'" + Main_values.Search_data + "'");
            },
            label_exit: function() {
                Main_values.Main_gameSelected = Main_values.gameSelectedOld;
                if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
                Main_values.Games_return = false;
            },
        }, Base_obj);

        SearchGames = Screens_assign(SearchGames, Base_Game_obj);
        SearchGames.ItemsLimit = 100;
    }

    var Base_Channel_obj = {
        ItemsLimit: Main_ItemsLimitChannel,
        ColoumnsCount: Main_ColoumnsCountChannel,
        addFocus: Screens_addFocusChannel,
        ItemsReloadLimit: Main_ItemsReloadLimitChannel,
        thumbclass: 'stream_thumbnail_channel_holder',
        rowClass: 'animate_height_transition_channel',
        screenType: 4,
        img_404: IMG_404_LOGO,
        setMax: function(tempObj) {
            this.MaxOffset = tempObj._total;
            if (this.data.length >= this.MaxOffset || typeof this.MaxOffset === 'undefined') this.dataEnded = true;
        },
        setTODialog: Screens_ThumbOptionHideSpecial,
        empty_str: function() {
            return STR_NO + STR_SPACE + STR_USER_CHANNEL;
        },
        addCellTemp: function(cell) {
            if (!this.idObject[cell._id]) {

                this.itemsCount++;
                this.idObject[cell._id] = 1;

                this.row.appendChild(
                    Screens_createCellChannel(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids, [cell.name, cell._id, cell.logo, cell.display_name, cell.partner]));

                this.coloumn_id++;
            }
        },
    };

    function ScreensObj_InitUserChannels() {
        UserChannels = Screens_assign({
            HeaderQuatity: 2,
            ids: Screens_ScreenIds('UserChannels'),
            table: 'stream_table_user_channels',
            screen: Main_UserChannels,
            object: 'follows',
            key_pgDown: Main_History[Main_HistoryPos],
            key_pgUp: Main_UserVod,
            key_pgUpNext: Main_usergames,
            base_url: Main_kraken_api + 'users/',
            set_url: function() {
                if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
                this.url = this.base_url + encodeURIComponent(AddUser_UsernameArray[0].id) +
                    '/follows/channels?limit=' + Main_ItemsLimitMax + '&offset=' + this.offset + '&sortby=login&direction=asc';
            },
            label_init: function() {
                ScreensObj_TopLableUserInit();

                ScreensObj_SetTopLable(STR_USER, STR_USER_CHANNEL);
            },
            key_play: function() {
                if (Main_ThumbOpenIsNull(this.posY + '_' + this.posX, this.ids[0])) return;

                Main_values.Main_selectedChannel = JSON.parse(document.getElementById(this.ids[8] + this.posY + '_' + this.posX).getAttribute(Main_DataAttribute));

                Main_values.Main_selectedChannel_id = Main_values.Main_selectedChannel[1];
                Main_values.Main_selectedChannelDisplayname = Main_values.Main_selectedChannel[3];
                Main_values.Main_selectedChannelLogo = Main_values.Main_selectedChannel[2];
                Main_values.Main_selectedChannel = Main_values.Main_selectedChannel[0];

                document.body.removeEventListener("keydown", Screens_handleKeyDown);
                Main_values.Main_BeforeChannel = Main_UserChannels;
                Main_values.Main_Go = Main_ChannelContent;
                Main_values.Main_BeforeChannelisSet = true;
                AddCode_IsFallowing = true;
                ChannelContent_UserChannels = true;
                Screens_exit();
                Main_SwitchScreen();
            },
            addCell: function(cell) {
                cell = cell.channel;
                this.addCellTemp(cell);
            }
        }, Base_obj);

        UserChannels = Screens_assign(UserChannels, Base_Channel_obj);
        UserChannels.addrow = Screens_addrowChannel;
        UserChannels.visiblerows = 5;
    }

    function ScreensObj_InitSearchChannels() {
        SearchChannels = Screens_assign({
            HeaderQuatity: 2,
            ids: Screens_ScreenIds('SearchChannels'),
            table: 'stream_table_search_channel',
            screen: Main_SearchChannels,
            object: 'channels',
            base_url: Main_kraken_api + 'search/channels?limit=' + Main_ItemsLimitMax + '&query=',
            set_url: function() {
                if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
                this.url = this.base_url + encodeURIComponent(Main_values.Search_data) +
                    '&offset=' + this.offset;
            },
            label_init: function() {
                Main_values.Search_isSearching = true;
                Main_cleanTopLabel();
                if (this.lastData !== Main_values.Search_data) this.status = false;
                this.lastData = Main_values.Search_data;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_SEARCH + STR_SPACE + STR_CHANNELS, "'" + Main_values.Search_data + "'");
            },
            label_exit: function() {
                if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
            },
            key_play: function() {
                if (Main_ThumbOpenIsNull(this.posY + '_' + this.posX, this.ids[0])) return;

                Main_values.Main_selectedChannel = JSON.parse(document.getElementById(this.ids[8] + this.posY + '_' + this.posX).getAttribute(Main_DataAttribute));

                Main_values.Main_selectedChannel_id = Main_values.Main_selectedChannel[1];
                Main_values.Main_selectedChannelDisplayname = Main_values.Main_selectedChannel[3];
                Main_values.Main_selectedChannelLogo = Main_values.Main_selectedChannel[2];
                Main_values.Main_selectedChannel = Main_values.Main_selectedChannel[0];

                document.body.removeEventListener("keydown", Screens_handleKeyDown);
                Main_values.Main_BeforeChannel = Main_SearchChannels;
                Main_values.Main_Go = Main_ChannelContent;
                Main_values.Main_BeforeChannelisSet = true;
                AddCode_IsFallowing = false;
                ChannelContent_UserChannels = false;
                Screens_exit();
                Main_SwitchScreen();
            },
            addCell: function(cell) {
                this.addCellTemp(cell);
            }
        }, Base_obj);

        SearchChannels = Screens_assign(SearchChannels, Base_Channel_obj);
        SearchChannels.addrow = Screens_addrowChannel;
        SearchChannels.visiblerows = 5;
    }

    var Base_History_obj = {
        ItemsReloadLimit: Main_ItemsReloadLimitVideo,
        ItemsLimit: Main_ItemsLimitVideo,
        ColoumnsCount: Main_ColoumnsCountVideo,
        addFocus: Screens_addFocusVideo,
        rowClass: 'animate_height_transition',
        thumbclass: 'stream_thumbnail_live_holder',
        img_404: IMG_404_VIDEO,
        isHistory: true,
        streamerID: {},
        HasSwitches: true,
        key_pgDown: Main_UserLive,
        key_pgUp: Main_UserChannels,
        histPosY: 0,
        histPosXTemp: [0, 0, 0],
        sorting: [],
        sortingValues: [
            ['date', 0],
            ['date', 1],
            ['name', 1],
            ['name', 0],
            ['game', 1],
            ['game', 0],
            ['views', 0],
            ['views', 1],
            ['created_at', 0],
            ['created_at', 1]
        ],
        sortingPos: 0,
        Upsorting: function() {
            this.sorting = [
                STR_NEWEST,
                STR_OLDEST,
                STR_NAME_A_Z,
                STR_NAME_Z_A,
                STR_GAME_A_Z,
                STR_GAME_Z_A,
                STR_VIWES_MOST,
                STR_VIWES_LOWEST,
                STR_CREATED_NEWEST,
                STR_CREATED_OLDEST
            ];
        },
        histEna: [],
        histEnaPos: 0,
        UpEna: function() {
            this.histEna = [
                STR_YES,
                STR_NO
            ];
        },
        histArrays: [],
        UpArrays: function() {
            this.histArrays = [
                this.sorting,
                this.histEna,
                [STR_PRESS_ENTER_D]
            ];
        },
        set_url: function() {
            return;
        },
        empty_str: function() {
            return STR_NO + STR_SPACE + STR_HISTORY;
        },
        history_concatenate: function() {
            this.streamerID = {};
            this.data = JSON.parse(JSON.stringify(Main_values_History_data[AddUser_UsernameArray[0].id][this.Type]));
            Main_History_Sort(this.data, this.sortingValues[this.histPosX[0]][0], this.sortingValues[this.histPosX[0]][1]);
            this.dataEnded = true;
            this.loadDataSuccess();
            this.loadingData = false;
        },
        history_exit: function() {
            if (this.status) {
                Screens_removeFocusFallow();
                this.posY = 0;
                this.posX = 0;
                Main_AddClass(this.ids[0] + '0_' + this.posX, Main_classThumb);
            }
            document.body.removeEventListener("keydown", Screens_handleKeyDown);
            Main_HideElement(this.ids[10]);
        },
        sethistMainDialog: function() {
            this.Upsorting();
            this.UpEna();
            this.UpArrays();

            Screens_histSetArrow();

            Main_textContent(
                'dialog_hist_val_1',
                this.histArrays[1][this.histPosX[1]]
            );
            document.getElementById("dialog_hist_left_1").style.opacity = "0";
            document.getElementById("dialog_hist_right_1").style.opacity = "0";
            this.histPosXTemp = Main_Slice(this.histPosX);
        }
    };

    function ScreensObj_HistoryLive() {
        HistoryLive = Screens_assign({
            Type: 'live',
            ids: Screens_ScreenIds('HistoryLive'),
            table: 'stream_table_historylive',
            screen: Main_HistoryLive,
            histPosXName: 'HistoryLive_histPosX',
            screenType: 0,
            histPosX: Main_getItemJson('HistoryLive_histPosX', [0, 0, 0]),
            sethistDialog: function() {
                Screens_SethistDialogId();
                Main_innerHTML("dialog_hist_text", STR_LIVE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_SETTINGS);
                this.sethistMainDialog();
            },
            setTODialog: function() {
                Main_RemoveClass('dialog_thumb_opt_setting_-1', 'hideimp');
                Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_LIVE_DIS);
            },
            label_init: function() {
                Main_HistoryPos = 0;
                ScreensObj_TopLableUserInit();
                ScreensObj_SetTopLable(
                    STR_USER,
                    STR_HISTORY + STR_SPACE + STR_LIVE + STR_SPACE +
                    '(' + this.sorting[this.histPosX[0]] + ')'
                );
            },
            history_Type: function() {
                return STR_LIVE;
            },
            key_play: function() {

                if (this.posY === -1) {
                    if (this.posX === 0) {
                        Main_values.Main_Go = Main_HistoryVod;
                        this.history_exit();
                        Main_SwitchScreenAction();
                    } else if (this.posX === 1) {
                        Main_values.Main_Go = Main_HistoryClip;
                        this.history_exit();
                        Main_SwitchScreenAction();
                    } else Screens_histStart();
                } else Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown, true);

            },
            addCell: function(cell) {
                //cell.data[14] check here to a bug that introduce emtpy values todo maybe can be removed ins some months
                if (!this.idObject[cell.data[7]] && cell.data[14] !== '') {

                    this.itemsCount++;
                    this.idObject[cell.data[7]] = 1;

                    this.row.appendChild(
                        Screens_createCellLive(
                            this.row_id + '_' + this.coloumn_id,
                            this.ids,
                            cell.data,
                            cell.date,
                            cell.vodimg,
                            (this.streamerID[cell.data[14]] && cell.vodid) || cell.forceVod
                        )
                    );

                    //If there is alredy one stream shoing all the rest is a VOD
                    this.streamerID[cell.data[14]] = 1;
                    this.coloumn_id++;
                }
            },
            SwitchesIcons: ['movie-play', 'movie', 'settings'],
            addSwitches: function() {
                ScreensObj_addSwitches(
                    [
                        STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_VIDEOS,
                        STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_CLIPS,
                        STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_LIVE + STR_SPACE + STR_SETTINGS
                    ]
                );
            },
        }, Base_obj);

        HistoryLive = Screens_assign(HistoryLive, Base_History_obj);
        HistoryLive.Upsorting();
    }

    function ScreensObj_HistoryVod() {
        HistoryVod = Screens_assign({
            Type: 'vod',
            ids: Screens_ScreenIds('HistoryVod'),
            table: 'stream_table_historyvod',
            screen: Main_HistoryVod,
            screenType: 1,
            Vod_newImg: new Image(),
            HasAnimateThumb: true,
            AnimateThumb: ScreensObj_AnimateThumbId,
            histPosXName: 'HistoryVod_histPosX',
            histPosX: Main_getItemJson('HistoryVod_histPosX', [0, 0, 0]),
            sethistDialog: function() {
                Screens_SethistDialogId();
                Main_innerHTML("dialog_hist_text", STR_VIDEOS + STR_SPACE + STR_HISTORY + STR_SPACE + STR_SETTINGS);
                this.sethistMainDialog();
            },
            setTODialog: function() {
                Main_RemoveClass('dialog_thumb_opt_setting_-1', 'hideimp');
                Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_VOD_DIS);
            },
            history_Type: function() {
                return STR_VIDEOS;
            },
            label_init: function() {
                Main_HistoryPos = 1;
                ScreensObj_TopLableUserInit();

                ScreensObj_SetTopLable(
                    STR_USER,
                    STR_HISTORY + STR_SPACE + STR_VIDEOS + STR_SPACE +
                    '(' + this.sorting[this.histPosX[0]] + ')'
                );
            },
            key_play: function() {

                if (this.posY === -1) {
                    if (this.posX === 0) {
                        Main_values.Main_Go = Main_HistoryLive;
                        this.history_exit();
                        Main_SwitchScreenAction();
                    } else if (this.posX === 1) {
                        Main_values.Main_Go = Main_HistoryClip;
                        this.history_exit();
                        Main_SwitchScreenAction();
                    } else Screens_histStart();
                } else Main_OpenVod(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);

            },
            addCell: function(cell) {
                if (!this.idObject[cell.data[7]]) {

                    this.itemsCount++;
                    this.idObject[cell.data[7]] = 1;

                    this.row.appendChild(
                        Screens_createCellVod(
                            this.row_id + '_' + this.coloumn_id,
                            this.ids,
                            cell.data,
                            cell.date,
                            cell.watched
                        )
                    );

                    this.coloumn_id++;
                }
            },
            SwitchesIcons: ['play', 'movie', 'settings'],
            addSwitches: function() {
                ScreensObj_addSwitches(
                    [
                        STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_LIVE,
                        STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_CLIPS,
                        STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_VIDEOS + STR_SPACE + STR_SETTINGS
                    ]
                );
            },
        }, Base_obj);

        HistoryVod = Screens_assign(HistoryVod, Base_History_obj);

        HistoryVod.addFocus = function(y, x, idArray, forceScroll) {
            this.AnimateThumb(this);
            Screens_addFocusVideo(y, x, idArray, forceScroll);
        };
        HistoryVod.Upsorting();
    }

    function ScreensObj_HistoryClip() {
        HistoryClip = Screens_assign({
            Type: 'clip',
            ids: Screens_ScreenIds('HistoryClip'),
            table: 'stream_table_historyclip',
            screen: Main_HistoryClip,
            screenType: 2,
            histPosXName: 'HistoryClip_histPosX',
            histPosX: Main_getItemJson('HistoryClip_histPosX', [0, 0, 0]),
            sethistDialog: function() {
                Screens_SethistDialogId();
                Main_innerHTML("dialog_hist_text", STR_CLIPS + STR_SPACE + STR_HISTORY + STR_SPACE + STR_SETTINGS);
                this.sethistMainDialog();
            },
            setTODialog: function() {
                Main_RemoveClass('dialog_thumb_opt_setting_-1', 'hideimp');
                Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_CLIP_DIS);
            },
            history_Type: function() {
                return STR_CLIPS;
            },
            label_init: function() {
                Main_HistoryPos = 2;
                ScreensObj_TopLableUserInit();

                ScreensObj_SetTopLable(
                    STR_USER,
                    STR_HISTORY + STR_SPACE + STR_CLIPS + STR_SPACE +
                    '(' + this.sorting[this.histPosX[0]] + ')'
                );

            },
            key_play: function() {

                if (this.posY === -1) {
                    if (this.posX === 0) {
                        Main_values.Main_Go = Main_HistoryLive;
                        this.history_exit();
                        Main_SwitchScreenAction();
                    } else if (this.posX === 1) {
                        Main_values.Main_Go = Main_HistoryVod;
                        this.history_exit();
                        Main_SwitchScreenAction();
                    } else Screens_histStart();
                } else Main_OpenClip(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);

            },
            addCell: function(cell) {
                if (!this.idObject[cell.data[7]]) {

                    this.itemsCount++;
                    this.idObject[cell.data[7]] = 1;

                    this.row.appendChild(
                        Screens_createCellClip(
                            this.row_id + '_' + this.coloumn_id,
                            this.ids,
                            cell.data,
                            cell.date,
                            cell.watched
                        )
                    );

                    this.coloumn_id++;
                }
            },
            SwitchesIcons: ['play', 'movie-play', 'settings'],
            addSwitches: function() {
                ScreensObj_addSwitches(
                    [
                        STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_LIVE,
                        STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_VIDEOS,
                        STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_CLIPS + STR_SPACE + STR_SETTINGS
                    ]
                );
            },
        }, Base_obj);

        HistoryClip = Screens_assign(HistoryClip, Base_History_obj);
        HistoryClip.Upsorting();
    }

    function ScreensObj_addSwitches(StringsArray) {
        inUseObj.TopRowCreated = true;
        inUseObj.row = document.createElement('div');
        var thumbfallow, div, i = 0;

        for (i; i < StringsArray.length; i++) {
            thumbfallow = '<i class="icon-' + inUseObj.SwitchesIcons[i] + ' stream_channel_fallow_icon"></i>' + StringsArray[i];
            div = document.createElement('div');
            div.setAttribute('id', inUseObj.ids[8] + 'y_' + i);
            div.className = 'stream_cell_period';
            div.innerHTML = '<div id="' + inUseObj.ids[0] +
                'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + inUseObj.ids[3] +
                'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
            inUseObj.row.appendChild(div);
        }
        document.getElementById(inUseObj.table).appendChild(inUseObj.row);
    }

    function ScreensObj_TopLableAgameInit() {
        if (Main_values.Main_OldgameSelected === null) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;

        Main_IconLoad('label_side_panel', 'icon-arrow-left', STR_GOBACK);

        if (Main_values.Main_OldgameSelected !== Main_values.Main_gameSelected ||
            inUseObj.gameSelected !== Main_values.Main_gameSelected)
            inUseObj.status = false;

        inUseObj.gameSelected = Main_values.Main_gameSelected;
        Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;

        if (Main_values.Sidepannel_IsUser || Main_values.Main_BeforeAgame === Main_usergames) Sidepannel_SetUserLables();
        else Sidepannel_SetDefaultLables();

        Sidepannel_SetTopOpacity(inUseObj.screen);
    }

    function ScreensObj_TopLableAgameExit() {
        inUseObj.gameSelected = Main_values.Main_gameSelected;
        Main_IconLoad('label_side_panel', 'icon-arrow-right', STR_THUMB_OPTIONS_TOP);
    }

    function ScreensObj_TopLableUserInit() {
        if (inUseObj.OldUserName !== AddUser_UsernameArray[0].name) inUseObj.status = false;
        inUseObj.OldUserName = AddUser_UsernameArray[0].name;

        Sidepannel_SetUserLables();
        Sidepannel_SetTopOpacity(inUseObj.screen);
    }

    function ScreensObj_SetTopLable(text, small_text) {
        Main_innerHTML('top_lable', text + STR_SPACE + (small_text ? '<div style="font-size: 65%;display: inline-block;">' + small_text + '</div>' : ""));
    }

    function ScreensObj_LiveCellArray(cell) {
        return [
            cell.preview.template, //0
            cell.channel.display_name, //1
            cell.channel.status, //2
            cell.game, //3
            STR_FOR + Main_addCommas(cell.viewers) + STR_SPACE + STR_VIEWER, //4
            Main_videoqualitylang(cell.video_height, cell.average_fps, cell.channel.broadcaster_language), //5
            cell.channel.name, //6
            cell._id, //7
            Main_is_rerun(cell.broadcast_platform), //8
            cell.channel.logo, //9
            cell.channel.partner, //10
            STR_SINCE + Play_streamLiveAt(cell.created_at) + STR_SPACE, //11
            cell.created_at, //12
            cell.viewers, //13
            cell.channel._id //14
        ];
    }

    function ScreensObj_VodCellArray(cell) {
        return [
            cell.preview.template.replace("{width}x{height}", Main_VideoSize), //0
            cell.channel.display_name, //1
            STR_STREAM_ON + Main_videoCreatedAt(cell.created_at), //2
            cell.game, //3
            Main_addCommas(cell.views) + STR_VIEWS, //4
            cell.resolutions.chunked ? Main_videoqualitylang(cell.resolutions.chunked.slice(-4), (parseInt(cell.fps.chunked) || 0), cell.channel.broadcaster_language) : '', //5
            cell.channel.name, //6
            cell._id.substr(1), //7
            cell.animated_preview_url, //8
            cell.channel.broadcaster_language, //9
            twemoji.parse(cell.title), //10
            cell.length, //11
            cell.created_at, //12
            cell.views, //13
            cell.channel._id, //14
            cell.channel.logo, //15
            cell.channel.partner, //16
            cell.increment_view_count_url //17
        ];
    }

    function ScreensObj_AnimateThumbId(screen) {
        window.clearInterval(screen.AnimateThumbId);
        if (!Vod_DoAnimateThumb) return;
        var div = document.getElementById(screen.ids[6] + screen.posY + '_' + screen.posX);

        // Only load the animation if it can be loaded
        // This prevent starting animating before it has loaded or animated a empty image
        screen.Vod_newImg.onload = function() {
            screen.onload = null;
            Main_HideElement(screen.ids[1] + screen.posY + '_' + screen.posX);
            div.style.backgroundSize = div.offsetWidth + "px";
            var frame = 0;
            screen.AnimateThumbId = window.setInterval(function() {
                // 10 = quantity of frames in the preview img
                div.style.backgroundPosition = "0px " + ((++frame % 10) * (-div.offsetHeight)) + "px";
            }, 650);
        };

        screen.Vod_newImg.src = div.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
    }
    //Variable initialization
    var Search_cursorY = 0;
    var Search_cursorX = 0;
    var Search_keyBoardOn = false;
    //Variable initialization end

    function Search_init() {
        Main_HideWarningDialog();
        Main_HideElement('label_refresh');
        Main_IconLoad('label_side_panel', 'icon-arrow-left', STR_GOBACK);
        Main_SearchInput.placeholder = STR_PLACEHOLDER_SEARCH;
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
        Main_IconLoad('label_side_panel', 'icon-arrow-right', STR_THUMB_OPTIONS_TOP);
        Main_ShowElement('label_refresh');
        Main_SearchInput.value = '';
        Main_HideElement('search_scroll');
    }

    function Search_loadData() {
        Search_exit();
        Main_ready(function() {
            if (!Search_cursorX) {
                inUseObj = SearchChannels;
                Screens_init();
            } else if (Search_cursorX === 1) {
                inUseObj = SearchGames;
                Screens_init();
            } else if (Search_cursorX === 2) {
                inUseObj = SearchLive;
                Screens_init();
            }
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
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
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
        //Main_AddClass('scenekeys', 'avoidclicks');
        Main_AddClass('scenefeed', 'avoidclicks');
        document.body.removeEventListener("keydown", Search_handleKeyDown);
        document.body.addEventListener("keydown", Search_KeyboardEvent, false);
        Main_SearchInput.placeholder = STR_PLACEHOLDER_SEARCH;
        Main_SearchInput.focus();
        Search_keyBoardOn = true;
    }

    function Search_RemoveinputFocus(EnaKeydown) {
        if (!Main_isTV && Main_IsNotBrowser) Android.mhideSystemUI();

        Main_RemoveClass('scenefeed', 'avoidclicks');
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
            case KEY_RETURN_Q:
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
                Search_KeyboardDismiss();
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
    }

    function Search_KeyboardDismiss() {
        Search_RemoveinputFocus(true);
        Search_cursorY = 1;
        Search_refreshInputFocusTools();
    }
    //Variable initialization
    var Settings_cursorY = 0;
    var Settings_value = {
        "restor_playback": { //restor_playback
            "values": ["no", "yes"],
            "defaultValue": 2
        },
        "clip_auto_play_next": { //clip_auto_play_next
            "values": ["no", "yes"],
            "defaultValue": 2
        },
        "pp_workaround": { //pp_workaround
            "values": ["no", "yes"],
            "defaultValue": 1
        },
        "keep_panel_info_visible": { //clip_auto_play_next
            "values": ["no", "yes"],
            "defaultValue": 1
        },
        "single_click_exit": { //single_click_exit
            "values": ["no", "yes"],
            "defaultValue": 1
        },
        "app_animations": { //app_animations
            "values": ["no", "yes"],
            "defaultValue": 1
        },
        "show_screen_counter": { //show_screen_counter
            "values": ["no", "yes"],
            "defaultValue": 2
        },
        "live_feed_sort": { //show_screen_counter
            "values": [
                "views_more",
                "views_less",
                "name_a-z",
                "name_z-a",
                "game_a-z",
                "game_z-a",
                "uptime_new",
                "uptime_old",
            ],
            "defaultValue": 1
        },
        "live_notification": { //buffer_live
            "values": ["no", "yes"],
            "defaultValue": 2
        },
        "global_font_offset": { //live notification
            "values": [-3, -2, -1, 0, 1, 2, 3],
            "defaultValue": 4
        },
        "live_notification_time": { //live notification
            "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            "defaultValue": 4
        },
        "buffer_live": { //buffer_live
            "values": [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            "defaultValue": 5
        },
        "buffer_vod": { //buffer_vod
            "values": [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            "defaultValue": 8
        },
        "buffer_clip": { //buffer_clip
            "values": [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            "defaultValue": 5
        },
        "end_dialog_counter": { //end_dialog_counter
            "values": ['disable', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            "defaultValue": 4
        },
        "bitrate_main": { //bitrate_main
            "values": ['disable', 11, 10.5, 10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1],
            "defaultValue": 1
        },
        "bitrate_min": { //bitrate_min
            "values": ['disable', 11, 10.5, 10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1],
            "defaultValue": 18
        },
        "videos_animation": { //videos_animation
            "values": ["no", "yes"],
            "defaultValue": 2
        },
        "thumb_quality": { //thumbnail quality
            "values": ["very-low", "low", "normal", "high", "very-high"],
            "defaultValue": 3
        },
        "default_quality": { //default player quality Auto or source
            "values": ["Auto", "source"],
            "defaultValue": 1
        },
        "clock_offset": { //clock_offset
            "values": Settings_GenerateClock(),
            "defaultValue": 49
        },
        "content_lang": { //content_lang
            "values": ["All"],
            "set_values": [""],
            "defaultValue": 1
        },
        "blocked_codecs": { //blocked_codecs
            "values": ["None"],
            "set_values": [""],
            "defaultValue": 1
        },
        "dpad_position": { //dpad postion
            "values": ["Right-Bottom", "Right-Top", "Left-Top", "Left-Bottom"],
            "defaultValue": 1
        },
        "dpad_opacity": { //dpad opacity
            "values": [
                "0%", "5%", "10%", "15%", "20%", "25%", "30%", "35%", "40%", "45%", "50%",
                "55%", "60%", "65%", "70%", "75%", "80%", "85%", "90%", "95%", "100%"
            ],
            "defaultValue": 12
        }
    };

    var Settings_FeedSort = [
        [null, 'viewers', 0],
        [null, 'viewers', 1],
        ['channel', 'name', 1],
        ['channel', 'name', 0],
        [null, 'game', 1],
        [null, 'game', 0],
        [null, 'created_at', 0],
        [null, 'created_at', 1]
    ];

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
        document.body.addEventListener("keydown", Settings_handleKeyDown, false);
        ScreensObj_SetTopLable(STR_SETTINGS);
        Main_ShowElement('settings_holder');
        Main_IconLoad('label_side_panel', 'icon-arrow-left', STR_GOBACK);
        Main_HideElement('label_refresh');
        Settings_cursorY = 0;
        Settings_inputFocus(Settings_cursorY);
        Settings_DivOptionChangeLang('content_lang', STR_CONTENT_LANG, Languages_Selected);
    }

    function Settings_exit() {
        Settings_ScrollTableReset();
        document.body.removeEventListener("keydown", Settings_handleKeyDown);
        Main_IconLoad('label_side_panel', 'icon-arrow-right', STR_THUMB_OPTIONS_TOP);
        Main_ShowElement('label_refresh');
        Settings_RemoveinputFocus();
        Main_HideElement('settings_holder');
    }

    // The order in Settings_SetSettings is the display order
    function Settings_SetSettings() {
        var div = '',
            key,
            array_no_yes = [STR_NO, STR_YES];

        // General settings title
        div += Settings_DivTitle('general', STR_SETTINGS_GENERAL);

        div += Settings_Content('content_lang', [STR_CONTENT_LANG_SUMMARY], STR_CONTENT_LANG, '');

        div += Settings_Content('live_feed_sort',
            [
                STR_VIWES_MOST,
                STR_VIWES_LOWEST,
                STR_NAME_A_Z,
                STR_NAME_Z_A,
                STR_GAME_A_Z,
                STR_GAME_Z_A,
                STR_CREATED_NEWEST,
                STR_CREATED_OLDEST
            ],
            STR_LIVE_FEED_SORT,
            STR_LIVE_FEED_SORT_SUMMARY
        );

        div += Settings_Content('thumb_quality',
            [STR_VERY_LOW, STR_LOW, STR_NORMAL, STR_HIGH, STR_VERY_HIGH],
            STR_THUMB_RESOLUTION, STR_THUMB_RESOLUTION_SUMMARY);

        div += Settings_Content('global_font_offset', null, STR_GLOBAL_FONT, STR_GLOBAL_FONT_SUMMARY);

        div += Settings_Content('restor_playback', array_no_yes, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMMARY);

        div += Settings_Content('videos_animation', array_no_yes, STR_VIDEOS_ANIMATION, null);

        div += Settings_Content('app_animations', array_no_yes, STR_APP_ANIMATIONS, null);

        div += Settings_Content('clip_auto_play_next', array_no_yes, STR_AUTO_PLAY_NEXT, null);

        div += Settings_Content('live_notification', array_no_yes, STR_NOW_LIVE_SHOW, null);

        div += Settings_Content('live_notification_time', null, STR_NOW_DURATION, null);

        div += Settings_Content('clock_offset', null, STR_CLOCK_OFFSET, null);

        div += Settings_Content('show_screen_counter', array_no_yes, STR_SCREEN_COUNTER, null);


        if (!Main_isTV || !Main_IsNotBrowser) {
            div += Settings_Content('dpad_position', null, STR_DPAD_POSTION, null);

            div += Settings_Content('dpad_opacity', null, STR_DPAD_OPACITY, null);
        }

        // Player settings title
        div += Settings_DivTitle('play', STR_SETTINGS_PLAYER);

        div += Settings_Content('keep_panel_info_visible', array_no_yes, STR_KEEP_INFO_VISIBLE, null);

        div += Settings_Content('single_click_exit', array_no_yes, STR_SINGLE_EXIT, STR_SINGLE_EXIT_SUMMARY);

        div += Settings_Content('end_dialog_counter', null, STR_END_DIALOG_SETTINGS, STR_END_DIALOG_SETTINGS_SUMMARY);
        Settings_value.end_dialog_counter.values[0] = STR_END_DIALOG_DISABLE;

        div += Settings_Content('default_quality', [STR_AUTO, STR_SOURCE], STR_DEF_QUALITY, STR_DEF_QUALITY_SUMMARY);

        div += Settings_Content('blocked_codecs', [STR_CONTENT_LANG_SUMMARY], STR_BLOCKED_CODEC, STR_BLOCKED_CODEC_SUMMARY);

        div += Settings_Content('pp_workaround', [STR_DISABLE, STR_ENABLE], STR_PP_WORKAROUND, STR_PP_WORKAROUND_SUMMARY);

        // Player buffer title/summary
        div += '<div id="setting_title_bandwidth" class="settings_title">' + STR_PLAYER_BITRATE + '</div>' +
            '<div id="setting_title_bandwidth_summary" class="settings_summary">' + STR_PLAYER_BITRATE_SUMMARY + '</div>';

        // Player buffer live
        key = "bitrate_main";
        Settings_value_keys.push(key);

        for (var i = 1; i < Settings_value[key].values.length; i++) {
            Settings_value[key].values[i] = Settings_value[key].values[i] + " Mbps";
        }
        Settings_value[key].values[0] = STR_PLAYER_BITRATE_UNLIMITED;

        div += Settings_DivOptionNoSummary(key, STR_PLAYER_BITRATE_MAIN);

        div += Settings_Content('bitrate_min',
            Settings_value.bitrate_main.values, STR_PLAYER_BITRATE_SMALL, STR_PLAYER_BITRATE_SMALL_SUMMARY);
        Settings_value.bitrate_min.values[0] = STR_PLAYER_BITRATE_UNLIMITED;
        Settings_SetBitRate(0);

        // Player buffer title/summary
        div += '<div id="setting_title_buffers" class="settings_title">' + STR_SETTINGS_BUFFER_SIZE + '</div>' +
            '<div id="setting_title_buffers_summary" class="settings_summary">' + STR_SETTINGS_BUFFER_SIZE_SUMMARY + '</div>';


        div += Settings_Content('buffer_live', null, STR_SETTINGS_BUFFER_LIVE, null);

        div += Settings_Content('buffer_vod', null, STR_SETTINGS_BUFFER_VOD, null);

        div += Settings_Content('buffer_clip', null, STR_SETTINGS_BUFFER_CLIP, null);

        Main_innerHTML("settings_main", div);
        Settings_positions_length = Settings_value_keys.length;
        Languages_SetSettings();
    }

    function Settings_Content(key, valuesArray, STR, STR_SUMMARY) {
        Settings_value_keys.push(key);
        if (valuesArray) Settings_value[key].values = valuesArray;

        return (STR_SUMMARY ? Settings_DivOptionWithSummary(key, STR, STR_SUMMARY) : Settings_DivOptionNoSummary(key, STR));
    }

    function Settings_DivTitle(key, string) {
        return '<div id="setting_title_' + key + '" class="settings_section">' + string + '</div>';
    }

    function Settings_DivOptionNoSummary(key, string) {
        return '<div id="' + key + '_div" class="settings_div"><div id="' +
            key + '_name" class="settings_name">' + string + '</div>' +
            '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
            '<div id="' + key + '" class="strokedeline settings_value">' + Settings_Obj_values(key) + '</div>' +
            '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';
    }

    function Settings_DivOptionWithSummary(key, string_title, string_summary) {
        return '<div id="' + key + '_div" class="settings_div"><div id="' + key + '_name" class="settings_name">' +
            string_title + '<div id="' + key + '_summary" class="settings_summary" style="font-size: 65%;">' + string_summary + '</div></div>' +
            '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
            '<div id="' + key + '" class="strokedeline settings_value">' + Settings_Obj_values(key) + '</div>' +
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

        Main_textContent('clock_offset_name', STR_CLOCK_OFFSET);

        Main_textContent('show_screen_counter_name', STR_SCREEN_COUNTER);

        Main_textContent('dpad_position_name', STR_DPAD_POSTION);

        Main_textContent('dpad_opacity_name', STR_DPAD_OPACITY);

        // Content Language selection
        key = "content_lang";
        Main_textContent(key + '_name', STR_CONTENT_LANG);
        Main_textContent(key, Settings_Obj_values(key));
        Settings_value[key].values = [STR_CONTENT_LANG_SUMMARY];

        key = "live_feed_sort";
        Settings_DivOptionChangeLang(key, STR_LIVE_FEED_SORT, STR_LIVE_FEED_SORT_SUMMARY);
        Main_textContent(key, Settings_Obj_values(key));
        Settings_value[key].values = [
            STR_VIWES_MOST,
            STR_VIWES_LOWEST,
            STR_NAME_A_Z,
            STR_NAME_Z_A,
            STR_GAME_A_Z,
            STR_GAME_Z_A,
            STR_CREATED_NEWEST,
            STR_CREATED_OLDEST
        ];

        //Player settings
        Main_textContent('setting_title_play', STR_SETTINGS_PLAYER);

        // Player buffer title/summary
        Main_textContent('setting_title_bandwidth', STR_PLAYER_BITRATE);
        Main_textContent('setting_title_bandwidth_summary', STR_PLAYER_BITRATE_SUMMARY);

        key = "bitrate_main";
        Main_textContent(key + '_name', STR_PLAYER_BITRATE_MAIN);
        Settings_value[key].values[0] = STR_DISABLE;

        key = "bitrate_min";
        Settings_DivOptionChangeLang(key, STR_PLAYER_BITRATE_SMALL, STR_PLAYER_BITRATE_SMALL_SUMMARY);
        Settings_value[key].values[0] = STR_DISABLE;

        // Player buffer title/summary
        Main_textContent('setting_title_buffers', STR_SETTINGS_BUFFER_SIZE);
        Main_textContent('setting_title_buffers_summary', STR_SETTINGS_BUFFER_SIZE_SUMMARY);

        Main_textContent('buffer_live_name', STR_SETTINGS_BUFFER_LIVE);
        Main_textContent('buffer_vod_name', STR_SETTINGS_BUFFER_VOD);
        Main_textContent('buffer_clip_name', STR_SETTINGS_BUFFER_CLIP);

        //Player restore
        key = "restor_playback";
        Settings_DivOptionChangeLang(key, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMMARY);
        Settings_value[key].values = [STR_YES, STR_NO];

        //Thumb quality
        key = "thumb_quality";
        Settings_DivOptionChangeLang(key, STR_THUMB_RESOLUTION, STR_THUMB_RESOLUTION_SUMMARY);
        Settings_value[key].values = [STR_VERY_LOW, STR_LOW, STR_NORMAL, STR_HIGH, STR_VERY_HIGH];

        Settings_DivOptionChangeLang('global_font_offset', STR_GLOBAL_FONT, STR_GLOBAL_FONT_SUMMARY);

        //Player restore
        key = "default_quality";
        Settings_DivOptionChangeLang(key, STR_DEF_QUALITY, STR_DEF_QUALITY_SUMMARY);
        Settings_value[key].values = [STR_AUTO, STR_SOURCE];

        // Chat size
        key = "end_dialog_counter";
        Settings_DivOptionChangeLang(key, STR_END_DIALOG_SETTINGS, STR_END_DIALOG_SETTINGS_SUMMARY);
        Settings_value[key].values[0] = STR_END_DIALOG_DISABLE;

        // Videos
        key = "videos_animation";
        Main_textContent(key + '_name', STR_VIDEOS_ANIMATION);
        Settings_value[key].values = [STR_YES, STR_NO];

        key = "pp_workaround";
        Settings_DivOptionChangeLang(key, STR_PP_WORKAROUND, STR_PP_WORKAROUND_SUMMARY);
        Settings_value[key].values = [STR_DISABLE, STR_ENABLE];

        key = "clip_auto_play_next";
        Main_textContent(key + '_name', STR_AUTO_PLAY_NEXT);
        Settings_value[key].values = [STR_NO, STR_YES];

        key = "live_notification";
        Main_textContent(key + '_name', STR_NOW_LIVE_SHOW);
        Settings_value[key].values = [STR_NO, STR_YES];

        Main_textContent('live_notification_time_name', STR_NOW_DURATION);

        key = "keep_panel_info_visible";
        Main_textContent(key + '_name', STR_KEEP_INFO_VISIBLE);
        Settings_value[key].values = [STR_NO, STR_YES];

        key = "single_click_exit";
        Settings_DivOptionChangeLang(key, STR_SINGLE_EXIT, STR_SINGLE_EXIT_SUMMARY);
        Settings_value[key].values = [STR_NO, STR_YES];

        key = "app_animations";
        Main_textContent(key + '_name', STR_APP_ANIMATIONS);
        Settings_value[key].values = [STR_NO, STR_YES];

        for (key in Settings_value)
            if (Settings_value.hasOwnProperty(key))
                Main_textContent(key, Settings_Obj_values(key));

        Languages_SetLang();
    }

    function Settings_SetDefautls() {
        for (var key in Settings_value) {
            Settings_value[key].defaultValue = Main_getItemInt(key, Settings_value[key].defaultValue);
            Settings_value[key].defaultValue -= 1;
            if (Settings_value[key].defaultValue > Settings_Obj_length(key)) Settings_value[key].defaultValue = 0;
        }
        Settings_SetBuffers(0);
        Settings_SetClock();
        if (!Main_isTV) {
            Settings_DpadOpacity();
            Settings_DpadPOsition();
        }
        Main_SetThumb();
        if (!Settings_Obj_default("app_animations")) Settings_SetAnimations();
        Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
        PlayClip_All_Forced = Settings_Obj_default("clip_auto_play_next");
        UserLiveFeed_Notify = Settings_Obj_default("live_notification");
        UserLiveFeed_NotifyTimeout = Settings_Obj_values("live_notification_time") * 1000;
        Play_Status_Always_On = Settings_Obj_default("keep_panel_info_visible");
        Play_SingleClickExit = Settings_Obj_default("single_click_exit");
        Play_EndSettingsCounter = Settings_Obj_default("end_dialog_counter");
        Settings_ShowCounter(Settings_Obj_default("show_screen_counter"));
        Settings_DisableCodecsNames = Main_getItemJson('Settings_DisableCodecsNames', []);
        Settings_CodecsSet();
    }

    function Settings_Obj_values(key) {
        return Settings_value[key].values[Settings_Obj_default(key)];
    }

    //function Settings_Obj_set_values(key) {
    //    return Settings_value[key].set_values[Settings_Obj_default(key)];
    //}

    function Settings_Obj_default(key) {
        return Settings_value[key].defaultValue;
    }

    function Settings_Obj_length(key) {
        return Settings_value[key].values.length - 1;
    }

    function Settings_inputFocus(position) {
        var key = Settings_value_keys[position];
        Main_AddClass(key, 'settings_value_focus');
        Main_AddClass(key + '_div', 'settings_div_focus');
        Settings_Setarrows(position);
        Settings_ScrollTable();
    }

    function Settings_RemoveinputFocus() {
        Settings_RemoveinputFocusKey(Settings_value_keys[Settings_cursorY]);
    }

    function Settings_RemoveinputFocusKey(key) {
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
        Settings_SetarrowsKey(Settings_value_keys[position]);
    }

    function Settings_SetarrowsKey(key) {
        if (!Settings_Obj_length(key)) return;

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

        if (position === "videos_animation") Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
        else if (position === "clip_auto_play_next") PlayClip_All_Forced = Settings_Obj_default("clip_auto_play_next");
        else if (position === "live_notification") UserLiveFeed_Notify = Settings_Obj_default("live_notification");
        else if (position === "live_notification_time") UserLiveFeed_NotifyTimeout = Settings_Obj_values("live_notification_time") * 1000;
        else if (position === "keep_panel_info_visible") Play_Status_Always_On = Settings_Obj_default("keep_panel_info_visible");
        else if (position === "single_click_exit") Play_SingleClickExit = Settings_Obj_default("single_click_exit");
        else if (position === "app_animations") Settings_SetAnimations();
        else if (position === "buffer_live") Settings_SetBuffers(1);
        else if (position === "buffer_vod") Settings_SetBuffers(2);
        else if (position === "buffer_clip") Settings_SetBuffers(3);
        else if (position === "end_dialog_counter") Play_EndSettingsCounter = Settings_Obj_default("end_dialog_counter");
        else if (position === "default_quality") Play_SetQuality();
        else if (position === "thumb_quality") Main_SetThumb();
        else if (position === "global_font_offset") calculateFontSize();
        else if (position === "show_screen_counter") Settings_ShowCounter(Settings_Obj_default("show_screen_counter"));
        else if (position === "clock_offset") {
            Settings_SetClock();
            Main_updateclock();
        } else if (position === "bitrate_main") Settings_SetBitRate(1);
        else if (position === "bitrate_min") Settings_SetBitRate(2);
        else if (position === "dpad_opacity") Settings_DpadOpacity();
        else if (position === "dpad_position") Settings_DpadPOsition();
        else if (position === "pp_workaround") Settings_PP_Workaround();
    }

    function Settings_PP_Workaround() {
        Android.msetPlayer(!Settings_Obj_default("pp_workaround"), Play_isFullScreen);
    }

    function Settings_DpadOpacity() {
        Main_clearHideButtons();
        Main_setHideButtons();
        Main_scenekeysDoc.style.opacity = Settings_Obj_default("dpad_opacity") * 0.05;
    }

    var Settings_DpadPOsitions = [
        [6, 0],
        [6, 44],
        [63, 44],
        [63, 0]
    ];

    function Settings_DpadPOsition() {
        Settings_DpadOpacity();
        Main_clearHideButtons();
        Main_setHideButtons();
        Main_scenekeysPositionDoc.style.right = Settings_DpadPOsitions[Settings_Obj_default("dpad_position")][0] + "%";
        Main_scenekeysPositionDoc.style.bottom = Settings_DpadPOsitions[Settings_Obj_default("dpad_position")][1] + "%";
    }

    function Settings_SetAnimations() {
        var i, array,
            classes = ['screen_holder',
                'screen_holder_channel',
                'screen_holder_switch',
                'screen_holder_user',
                'screen_holder_games',
                'animate_height_transition_channel',
                'animate_height_transition_games',
                'animate_height_transition',
                'side_panel_holder_ani',
                'scenefeed_background',
                'user_feed_notify',
                'user_feed_scroll_ani',
                'side_panel_fix',
                'side_panel_movel',
                'side_panel'
            ],
            animate = Settings_Obj_default("app_animations"),
            mtransition = animate ? '' : 'none';

        classes.forEach(
            function(classe) {
                array = document.getElementsByClassName(classe);
                for (i = 0; i < array.length; i++)
                    array[i].style.transition = mtransition;
            }
        );

        UserLiveFeed_FeedRemoveFocus(UserLiveFeed_FeedPosX);

        array = document.getElementsByClassName(Main_classThumb);

        try {
            //Array.prototype maybe not supported by all browsers
            Array.prototype.forEach.call(array,
                function(el) {
                    el.classList.remove(Main_classThumb);
                }
            );
        } catch (e) {}

        Main_classThumb = animate ? 'stream_thumbnail_focused' : 'stream_thumbnail_focused_no_ani';
        UserLiveFeed_FocusClass = animate ? 'feed_thumbnail_focused' : 'feed_thumbnail_focused_no_ani';
        Screens_SettingDoAnimations = animate;
    }

    function Settings_ShowCounter(show) {
        if (show) Main_ShowElement('dialog_counter_text');
        else Main_HideElement('dialog_counter_text');
    }

    function Settings_SetBitRate(whocall) {
        if (Main_IsNotBrowser) {
            if (!whocall) {
                Settings_SetBitRateMain();
                Settings_SetBitRateMin();
            } else if (whocall === 1) Settings_SetBitRateMain();
            else if (whocall === 2) Settings_SetBitRateMin();
        }
    }

    function Settings_SetBitRateMain() {
        var value;

        if (Settings_Obj_default("bitrate_main") > 0)
            value = parseInt(Settings_Obj_values("bitrate_main").split(" ")[0] * 1000000);
        else value = 0;

        Android.SetMainPlayerBandwidth(value);
    }

    function Settings_SetBitRateMin() {
        var value;

        if (Settings_Obj_default("bitrate_min") > 0)
            value = parseInt(Settings_Obj_values("bitrate_min").split(" ")[0] * 1000000);
        else value = 0;

        Android.SetSmallPlayerBandwidth(value);
    }

    function Settings_SetBuffers(whocall) {
        if (!whocall) {
            Play_Buffer = Settings_Obj_values("buffer_live") * 1000;
            PlayVod_Buffer = Settings_Obj_values("buffer_vod") * 1000;
            PlayClip_Buffer = Settings_Obj_values("buffer_clip") * 1000;
            if (Main_IsNotBrowser) {
                Android.SetBuffer(1, Play_Buffer);
                Android.SetBuffer(2, PlayVod_Buffer);
                Android.SetBuffer(3, PlayClip_Buffer);
            }
        } else if (whocall === 1) {
            Play_Buffer = Settings_Obj_values("buffer_live") * 1000;
            if (Main_IsNotBrowser) Android.SetBuffer(1, Play_Buffer);
        } else if (whocall === 2) {
            PlayVod_Buffer = Settings_Obj_values("buffer_vod") * 1000;
            if (Main_IsNotBrowser) Android.SetBuffer(2, PlayVod_Buffer);
        } else if (whocall === 3) {
            PlayClip_Buffer = Settings_Obj_values("buffer_clip") * 1000;
            if (Main_IsNotBrowser) Android.SetBuffer(3, PlayClip_Buffer);
        }
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

    var Settings_CurY = 0;

    function Settings_ScrollTable() {
        var doc,
            offset = (!Main_isTV || !Main_IsNotBrowser) ? 2 : 0;

        if (Settings_CurY < Settings_cursorY && Settings_cursorY === (12 + offset)) {
            doc = document.getElementById('settings_scroll');
            doc.scrollTop = doc.scrollHeight;
            if (Settings_Obj_default("app_animations")) {
                var position = doc.scrollTop;
                doc.scrollTop = 0;
                scrollTo(doc, position, 400);
            }
        } else if (Settings_CurY > Settings_cursorY && Settings_cursorY === (11 + offset)) {
            doc = document.getElementById('settings_scroll');
            if (Settings_Obj_default("app_animations")) scrollTo(doc, 0, 400);
            else doc.scrollTop = 0;
        }

        Settings_CurY = Settings_cursorY;
    }

    function Settings_ScrollTableReset() {
        document.getElementById('settings_scroll').scrollTop = 0;
        Settings_CurY = 0;
    }

    function scrollTo(element, to, duration) {
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 3;

        var animateScroll = function() {
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    Math.easeInOutQuad = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    function Settings_handleKeyDown(event) {
        var key;
        switch (event.keyCode) {
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
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
            case KEY_ENTER:
                if (!Settings_cursorY) Languages_init();
                else if (Settings_value_keys[Settings_cursorY].indexOf('blocked_codecs') !== -1) Settings_CodecsShow();
                break;
            default:
                break;
        }
    }

    var Settings_CodecsValue;
    var Settings_CodecsTotal;
    var Settings_CodecsPos;
    var Settings_CodecsNames = [];
    var Settings_DisableCodecsNames = [];

    function Settings_CodecsShow() {
        document.body.removeEventListener("keydown", Settings_handleKeyDown);

        if (!Settings_CodecsValue) {

            if (!Main_IsNotBrowser) Settings_CodecsValue = "video/avc,OMX.Nvidia.h264.decode,3840x2176,120 Mbps,524288,5.2,32,160p : 960.00,360p : 960.00,480p : 960.00,720p : 555.56,1080p : 245.10,1440p : 138.89,4k : 61.73|video/avc,OMX.google.h264.decoder,4080x4080,48 Mbps,8,5.2,32,-1,160p : 960.00,360p : 960.00,480p : 960.00,720p : 546.13,1080p : 240.94,1440p : 136.53,4k : 60.68|video/avc,OMX.chico.h264.decoder,4080x4080,48 Mbps,8,5.2,-1,160p : 960.00,360p : 960.00,480p : 960.00,720p : 546.13,1080p : 240.94,1440p : 136.53,4k : 60.68";
            else Settings_CodecsValue = Android.getcodecCapabilities('avc');

            var dialogContent = '',
                codecs = Settings_CodecsValue.split('|'),
                codecsValue,
                i = 0,
                j,
                temptitlecontent,
                key,
                spacer = " | ";

            Settings_CodecsTotal = codecs.length;
            Settings_CodecsNames = [];

            dialogContent += STR_CODEC_DIALOG_TITLE + STR_BR +
                STR_DIV_TITLE + STR_SUPPORTED_CODEC + '</div>' + STR_BR;

            for (i; i < Settings_CodecsTotal; i++) {
                codecsValue = codecs[i].split(',');

                key = codecsValue[1];
                Settings_value[key] = {
                    "values": [STR_ENABLE, STR_DISABLE],
                    "defaultValue": Main_getItemInt(key, 0)
                };

                Settings_CodecsNames.push(key);

                temptitlecontent = "";
                temptitlecontent += STR_MAX_RES + codecsValue[2] + spacer;
                temptitlecontent += STR_MAX_BIT + codecsValue[3] + spacer;
                temptitlecontent += STR_MAX_LEVEL + codecsValue[5] + spacer;
                temptitlecontent += STR_MAX_INSTANCES + ((codecsValue[6] > -1) ? codecsValue[6] : STR_UNKNOWN) + STR_BR;
                for (j = 7; j < codecsValue.length; j++) {
                    temptitlecontent += (parseFloat(codecsValue[j].split(': ')[1]) > 0) ? codecsValue[j] + " fps" + spacer : "";
                }

                temptitlecontent = temptitlecontent.substring(0, temptitlecontent.length - 3);

                dialogContent += Settings_DivOptionWithSummary(key, codecsValue[1], temptitlecontent + STR_BR + STR_BR);
            }

            Main_innerHTML("dialog_codecs_text", dialogContent + STR_DIV_TITLE + STR_CLOSE_THIS + '</div>');

        }

        if (Settings_CodecsTotal > 0) {
            Settings_CodecsPos = 0;
            Main_AddClass(Settings_CodecsNames[Settings_CodecsPos], 'settings_value_focus');
            Main_AddClass(Settings_CodecsNames[Settings_CodecsPos] + '_div', 'settings_div_focus');
            Settings_SetarrowsKey(Settings_CodecsNames[Settings_CodecsPos]);
        }

        Main_ShowElement('dialog_codecs');
        document.body.addEventListener("keydown", Settings_handleKeyDownCodecs, false);
    }

    function Settings_handleKeyDownCodecs(event) {
        var key;
        switch (event.keyCode) {
            case KEY_ENTER:
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                Settings_RemoveinputFocusKey(Settings_CodecsNames[Settings_CodecsPos]);
                Main_HideElement('dialog_codecs');
                document.body.removeEventListener("keydown", Settings_handleKeyDownCodecs);
                document.body.addEventListener("keydown", Settings_handleKeyDown, false);
                break;
            case KEY_LEFT:
                key = Settings_CodecsNames[Settings_CodecsPos];
                if (Settings_Obj_default(key) > 0) Settings_CodecsRigthLeft(-1);
                break;
            case KEY_RIGHT:
                key = Settings_CodecsNames[Settings_CodecsPos];
                if (Settings_Obj_default(key) < Settings_Obj_length(key)) Settings_CodecsRigthLeft(1);
                break;
            case KEY_UP:
                if (Settings_CodecsPos > 0) Settings_CodecsUpDown(-1);
                break;
            case KEY_DOWN:
                if (Settings_CodecsPos < (Settings_CodecsTotal - 1)) Settings_CodecsUpDown(1);
                break;
            default:
                break;
        }
    }

    function Settings_CodecsUpDown(offset) {
        Settings_RemoveinputFocusKey(Settings_CodecsNames[Settings_CodecsPos]);
        Settings_CodecsPos += offset;

        var key = Settings_CodecsNames[Settings_CodecsPos];
        Main_AddClass(key, 'settings_value_focus');
        Main_AddClass(key + '_div', 'settings_div_focus');
        Settings_SetarrowsKey(key);
    }

    function Settings_CodecsRigthLeft(offset) {

        if (Settings_CodecsTotal < 2) {
            Main_showWarningDialog(STR_ONE_CODEC_ENA);
            window.setTimeout(Main_HideWarningDialog, 2000);
            return;
        }

        var key = Settings_CodecsNames[Settings_CodecsPos],
            index;

        Settings_value[key].defaultValue += offset;

        Main_setItem(key, Settings_Obj_default(key));
        Main_textContent(key, Settings_Obj_values(key));
        Settings_SetarrowsKey(key);

        if (Settings_value[key].defaultValue) {
            Settings_DisableCodecsNames.push(Settings_CodecsNames[Settings_CodecsPos]);

            //Make sure at least one is enable
            var oneEnable = false,
                i = 0;

            for (i; i < Settings_CodecsTotal; i++) {
                if (!Settings_value[Settings_CodecsNames[i]].defaultValue) {
                    oneEnable = true;
                    break;
                }
            }
            if (!oneEnable) {
                Main_showWarningDialog(STR_ONE_CODEC_ENA);
                window.setTimeout(Main_HideWarningDialog, 2000);
                for (i = 0; i < Settings_CodecsTotal; i++) {
                    if (Settings_CodecsPos !== i) {
                        key = Settings_CodecsNames[i];
                        Settings_value[key].defaultValue += -1;
                        Main_setItem(key, Settings_Obj_default(key));
                        Main_textContent(key, Settings_Obj_values(key));
                        index = Settings_DisableCodecsNames.indexOf(Settings_CodecsNames[i]);
                        if (index > -1) Settings_DisableCodecsNames.splice(index, 1);

                        break;
                    }
                }
            }
        } else {
            index = Settings_DisableCodecsNames.indexOf(Settings_CodecsNames[Settings_CodecsPos]);
            if (index > -1) Settings_DisableCodecsNames.splice(index, 1);
        }

        Main_setItem('Settings_DisableCodecsNames', JSON.stringify(Settings_DisableCodecsNames));
        Settings_CodecsSet();
    }

    function Settings_CodecsSet() {
        if (Main_IsNotBrowser) Android.setBlackListMediaCodec(Settings_DisableCodecsNames.join());
    }
    //Variable initialization
    var Languages_cursorY = 0;
    var Languages_Selected = '';
    var Languages_value = {
        "All": {
            "values": ["off", "on"],
            "defaultValue": 2,
            "set_values": ""
        },
        "Bulgarian [BG]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "bg"
        },
        "Dansk [DA]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "da"
        },
        "Deutsch [DE]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "de"
        },
        "English [EN]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "en,en-gb"
        },
        "Español [ES]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "es,es-mx"
        },
        "Français [FR]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "fr"
        },
        "Italiano [IT]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "it"
        },
        "Magyar [HU]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "hu"
        },
        "Nederlands [NL]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "nl"
        },
        "Norsk [NO]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "no"
        },
        "Polski [PL]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "pl"
        },
        "Português [PT]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "pt,pt-br"
        },
        "Slovenčina [SK]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "sk"
        },
        "Suomi [FI]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "fi"
        },
        "Svenska [SV]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "sv"
        },
        "Tiếng Việt [VI]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "vi"
        },
        "Türkçe [TR]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "tr"
        },
        "Čeština [CS]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "cs"
        },
        "Ελληνικά [EL]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "el"
        },
        "Русский [RU]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "ru"
        },
        "ภาษาไทย [TH]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "th"
        },
        "中文 [ZH]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "zh"
        },
        "日本語 [JA]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "ja"
        },
        "한국어 [KO]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "ko"
        },
        "Română [RO]": {
            "values": ["off", "on"],
            "defaultValue": 1,
            "set_values": "ro"
        }
    };

    var Languages_value_keys = [];
    var Languages_positions_length = 0;
    //Variable initialization end

    function Languages_init() {
        document.body.removeEventListener("keydown", Settings_handleKeyDown);
        Main_HideElement('settings_main');
        Main_ShowElement('settings_lang');
        Languages_HideShowAll();
        ScreensObj_SetTopLable(STR_SETTINGS + STR_SPACE + STR_CONTENT_LANG);
        document.body.addEventListener("keydown", Languages_handleKeyDown, false);
        Languages_cursorY = 0;
        Languages_inputFocus(Languages_cursorY);
        Languages_ResetLang();
    }

    function Languages_exit() {
        document.body.removeEventListener("keydown", Languages_handleKeyDown);
        document.body.addEventListener("keydown", Settings_handleKeyDown, false);
        Settings_ScrollTableReset();
        Main_ShowElement('settings_main');
        Main_HideElement('settings_lang');
        Languages_RemoveinputFocus();
        Languages_SetLang();
        Languages_ResetLang();
    }

    function Languages_ResetLang() {
        if (Main_ContentLang === "") {
            Languages_Selected = STR_LANG_ALL;
            Languages_value.All.defaultValue = 1;
            Languages_ChangeSettigs(0);
            Main_AddClass(Languages_value_keys[0], 'red_text');
            Languages_HideShowAll();
        }
        Settings_DivOptionChangeLang('content_lang', STR_CONTENT_LANG, Languages_Selected);
    }

    function Languages_SetLang() {
        Main_ContentLang = "";
        if (!Languages_Obj_default('All')) {
            for (var key in Languages_value) {
                if (Languages_Obj_default(key)) Main_ContentLang += ',' + Languages_value[key].set_values;
            }
            Main_ContentLang = Main_ContentLang.slice(1);
        }
        if (Main_ContentLang === "") Languages_Selected = STR_LANG_ALL;
        else Languages_Selected = Main_ContentLang.toUpperCase();
    }

    // The order in Languages_SetSettings is the display order
    function Languages_SetSettings() {
        var div = '';

        for (var key in Languages_value) {
            Languages_value_keys.push(key);
            Languages_value[key].values = [STR_NO, STR_YES];
            div += Languages_DivOptionNoSummary(key, key);
        }

        Main_innerHTML("settings_lang", div);
        Languages_positions_length = Languages_value_keys.length;
    }

    function Languages_DivOptionNoSummary(key, string) {
        return '<div id="' + key + '_div" class="settings_div"><div id="' +
            key + '_name" class="settings_name">' + string + '</div>' +
            '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
            '<div id="' + key + '" class="' + (Languages_Obj_default(key) ? 'red_text ' : '') + 'strokedeline settings_value">' + Languages_Obj_values(key) + '</div>' +
            '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';
    }

    function Languages_SetDefautls() {
        for (var key in Languages_value) {
            Languages_value[key].defaultValue = Main_getItemInt(key, Languages_value[key].defaultValue);
            Languages_value[key].defaultValue -= 1;
        }
        Languages_SetLang();
    }

    function Languages_Obj_values(key) {
        return Languages_value[key].values[Languages_Obj_default(key)];
    }

    //function Languages_Obj_set_values(key) {
    //    return Languages_value[key].set_values[Languages_Obj_default(key)];
    //}

    function Languages_Obj_default(key) {
        return Languages_value[key].defaultValue;
    }

    function Languages_Obj_length(key) {
        return Languages_value[key].values.length - 1;
    }

    function Languages_inputFocus(position) {
        var key = Languages_value_keys[Languages_cursorY];
        Main_AddClass(key, 'settings_value_focus');
        Main_AddClass(key + '_div', 'settings_div_focus');
        Languages_Setarrows(position);
        Languages_ScrollTable(key);
    }

    function Languages_RemoveinputFocus() {
        var key = Languages_value_keys[Languages_cursorY];
        document.getElementById(key + "arrow_left").style.opacity = "0";
        document.getElementById(key + "arrow_right").style.opacity = "0";
        Main_RemoveClass(key, 'settings_value_focus');
        Main_RemoveClass(key + '_div', 'settings_div_focus');
    }

    function Languages_ScrollTable() {

        document.getElementById('settings_scroll').scrollTop =
            (Languages_cursorY > 7) ? document.getElementById(Languages_value_keys[Languages_cursorY - 7]).offsetTop : 0;
    }

    function Languages_ChangeSettigs(position) {
        var key = Languages_value_keys[position];
        Main_setItem(key, Languages_Obj_default(key) + 1);
        Main_textContent(key, Languages_Obj_values(key));
        Languages_Setarrows(position);
    }

    function Languages_Setarrows(position) {
        var key = Languages_value_keys[position];

        var currentValue = Languages_Obj_default(key);
        var maxValue = Languages_Obj_length(key);

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

    function Languages_HideShowAll() {
        for (var key in Languages_value) {
            if (key.indexOf('All') === -1) {
                document.getElementById(key + '_div').style.display = Languages_Obj_default('All') ? 'none' : 'inline-block';
            }
        }
    }

    function Languages_handleKeyDown(event) {
        var key;
        switch (event.keyCode) {
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                Languages_exit();
                break;
            case KEY_LEFT:
                key = Languages_value_keys[Languages_cursorY];
                if (Languages_Obj_default(key) > 0) {
                    Languages_value[key].defaultValue -= 1;
                    Languages_ChangeSettigs(Languages_cursorY);
                    Main_RemoveClass(Languages_value_keys[Languages_cursorY], 'red_text');
                    if (key.indexOf('All') !== -1) Languages_HideShowAll();
                }
                break;
            case KEY_RIGHT:
                key = Languages_value_keys[Languages_cursorY];
                if (Languages_Obj_default(key) < Languages_Obj_length(key)) {
                    Languages_value[key].defaultValue += 1;
                    Languages_ChangeSettigs(Languages_cursorY);
                    Main_AddClass(Languages_value_keys[Languages_cursorY], 'red_text');
                    if (key.indexOf('All') !== -1) Languages_HideShowAll();
                }
                break;
            case KEY_UP:
                if (Languages_cursorY > 0) {
                    Languages_RemoveinputFocus();
                    Languages_cursorY--;
                    Languages_inputFocus(Languages_cursorY);
                }
                break;
            case KEY_DOWN:
                if (!Languages_Obj_default('All') && Languages_cursorY < (Languages_positions_length - 1)) {
                    Languages_RemoveinputFocus();
                    Languages_cursorY++;
                    Languages_inputFocus(Languages_cursorY);
                }
                break;
            default:
                break;
        }
    } //Spacing for reease maker not trow erros frm jshint
    var Sidepannel_PosFeed = 0;
    var Sidepannel_Callback;
    var Sidepannel_UpdateThumbDoc;
    var Sidepannel_IsMain = true;

    var Sidepannel_MoveldefaultMargin = 13.5;
    var Sidepannel_FixdefaultMargin = 5;
    var Sidepannel_MoveldefaultWidth = Sidepannel_MoveldefaultMargin + Sidepannel_FixdefaultMargin - 1;

    function Sidepannel_AddFocusMain() {
        Main_AddClass('side_panel_movel_new_' + Main_values.Sidepannel_Pos, 'side_panel_new_icons_text');
    }

    function Sidepannel_RemoveFocusMain() {
        Main_RemoveClass('side_panel_movel_new_' + Main_values.Sidepannel_Pos, 'side_panel_new_icons_text');
    }

    function Sidepannel_AddFocusFeed(skipAnimation) {
        if (Sidepannel_GetSize()) {
            Main_AddClass(UserLiveFeed_side_ids[0] + Sidepannel_PosFeed, 'side_panel_div_focused');
            Sidepannel_Scroll(skipAnimation);
            Sidepannel_UpdateThumb();
        } else document.getElementById('side_panel_warn').style.display = 'inline-block';
    }

    function Sidepannel_RemoveFocusFeed() {
        Main_RemoveClass(UserLiveFeed_side_ids[0] + Sidepannel_PosFeed, 'side_panel_div_focused');
    }

    function Sidepannel_isShowing() {
        return document.getElementById('side_panel').className.indexOf('side_panel_hide') === -1;
    }

    function Sidepannel_UpdateThumb() {
        var info = JSON.parse(document.getElementById(UserLiveFeed_side_ids[8] + Sidepannel_PosFeed)
            .getAttribute(Main_DataAttribute));

        Sidepannel_UpdateThumbDoc.onerror = function() {
            this.onerror = null;
            this.src = IMG_404_VIDEO;
        };
        Sidepannel_UpdateThumbDoc.src = info[0].replace("{width}x{height}", Main_SidePannelSize) + Main_randomimg;

        Main_innerHTML('feed_thum_name', Sidepannel_partnerIcon(Main_ReplaceLargeFont(info[1]), info[10], info[8]));
        Main_innerHTML('feed_thum_quality', info[5]);
        Main_innerHTML('feed_thum_title', Main_ReplaceLargeFont(twemoji.parse(info[2])));
        Main_innerHTML('feed_thum_game', (info[3] !== "" ? STR_PLAYING + info[3] : ""));
        Main_innerHTML('feed_thum_views', info[11] + STR_FOR + info[4] + STR_SPACE + STR_VIEWER);

        if (Main_isElementShowing('side_panel_feed_holder') && Sidepannel_isShowing())
            Main_ShowElement('side_panel_feed_thumb');
    }

    function Sidepannel_partnerIcon(name, partner, isrerun) {
        return '<div class="partnericon_div"> ' + name + STR_SPACE + STR_SPACE + '</div>' +
            (partner ? ('<img class="partnericon_img" alt="" src="' +
                IMG_PARTNER + '">' + STR_SPACE + STR_SPACE) : "") + '<div class="partnericon_text" style="background: #' +
            (isrerun ? 'FFFFFF; color: #000000;' : 'E21212;') + '">' + STR_SPACE + STR_SPACE +
            (isrerun ? STR_NOT_LIVE : STR_LIVE) + STR_SPACE + STR_SPACE + '</div>';
    }

    function Sidepannel_PreloadImgs() {
        for (var i = 0; i < UserLiveFeed_PreloadImgs.length; i++) {
            ImageLoaderWorker.postMessage({
                id: 'image_temp',
                url: UserLiveFeed_PreloadImgs[i].replace("{width}x{height}", Main_SidePannelSize) + Main_randomimg
            });
        }
    }

    function Sidepannel_GetSize() {
        return document.getElementById('side_panel_holder').getElementsByClassName('side_panel_feed').length;
    }

    function Sidepannel_KeyEnterUser() {
        var hidepanel = true;
        if (Main_values.Sidepannel_Pos === 6 && !AddUser_UsernameArray[0].access_token) {
            Main_showWarningDialog(STR_NOKEY_VIDEO_WARN);
            window.setTimeout(Main_HideWarningDialog, 5000);
            return;
        }

        if (Main_values.Sidepannel_Pos === 2) {
            Main_values.Sidepannel_IsUser = false;
            Sidepannel_SetDefaultLables();
            Sidepannel_UnSetTopOpacity();

            if (!Sidepannel_MainISuser()) {
                Sidepannel_RemoveFocusMain();
                Main_values.Sidepannel_Pos++;
                Sidepannel_SetTopOpacity(Main_values.Main_Go);
                Sidepannel_AddFocusMain();
            }
            hidepanel = false;
        } else if (Main_values.Sidepannel_Pos === 3) Sidepannel_Go(Main_UserLive);
        else if (Main_values.Sidepannel_Pos === 4) Sidepannel_Go(Main_UserHost);
        else if (Main_values.Sidepannel_Pos === 5) Sidepannel_Go(Main_usergames);
        else if (Main_values.Sidepannel_Pos === 6) Sidepannel_Go(Main_UserVod);
        else if (Main_values.Sidepannel_Pos === 7) Sidepannel_Go(Main_UserChannels);
        else if (Main_values.Sidepannel_Pos === 8) {
            Main_values.Main_selectedChannel_id = AddUser_UsernameArray[0].id;
            Main_values.Main_selectedChannelDisplayname = AddUser_UsernameArray[0].display_name ? AddUser_UsernameArray[0].display_name : AddUser_UsernameArray[0].name;
            Main_values.Main_selectedChannel = AddUser_UsernameArray[0].name;

            Main_values.Main_BeforeChannel = Main_values.Main_Go;
            Main_values.Main_Go = Main_ChannelContent;
            Main_values.Main_BeforeChannelisSet = true;
            AddCode_IsFallowing = false;
            ChannelContent_UserChannels = false;
            Main_ExitCurrent(Main_values.Main_BeforeChannel);
            Main_values.My_channel = true;
            Main_SwitchScreen();
        } else if (Main_values.Sidepannel_Pos === 9) Sidepannel_Go(Main_History[Main_HistoryPos]);
        else Sidepannel_KeyEnterBase();

        if (hidepanel) Sidepannel_Hide();
    }

    function Sidepannel_MainISuser() {
        return Main_values.Main_Go === Main_UserLive || Main_values.Main_Go === Main_UserHost ||
            Main_values.Main_Go === Main_usergames || Main_values.Main_Go === Main_UserVod ||
            Main_values.Main_Go === Main_UserChannels || Main_values.Main_Go === Main_ChannelContent ||
            Main_values.Main_Go === Main_HistoryLive || Main_values.Main_Go === Main_HistoryVod ||
            Main_values.Main_Go === Main_HistoryClip;
    }

    function Sidepannel_KeyEnterBase() {
        if (!Main_values.Sidepannel_Pos) {
            Main_values.Main_Before = Main_values.Main_Go;
            Main_ExitCurrent(Main_values.Main_Go);
            if (AddUser_UserIsSet()) Users_init();
            else AddUser_init();
        } else if (Main_values.Sidepannel_Pos === 1) {
            if (Main_values.Main_Go !== Main_Search) {
                if (!Main_values.Search_isSearching &&
                    (Main_values.Main_Go === Main_ChannelContent || Main_values.Main_Go === Main_ChannelClip || Main_values.Main_Go === Main_ChannelVod))
                    ChannelContent_SetChannelValue();
                Main_OpenSearch();
            } else document.body.addEventListener("keydown", Sidepannel_Callback, false);
        } else if (Main_values.Sidepannel_Pos === 10) {
            Main_showSettings();
        } else if (Main_values.Sidepannel_Pos === 11)
            Main_showAboutDialog(Sidepannel_Callback, Screens_handleKeyControls);
        else if (Main_values.Sidepannel_Pos === 12)
            Main_showControlsDialog(Sidepannel_Callback, Screens_handleKeyControls);
        else if (Main_values.Sidepannel_Pos === 13) Main_showExitDialog();
    }

    function Sidepannel_KeyEnter() {
        if (Main_values.Sidepannel_IsUser) {
            Sidepannel_KeyEnterUser();
            return;
        }

        var hidepanel = true;

        if (Main_values.Sidepannel_Pos === 2) {
            if (AddUser_IsUserSet()) {
                Sidepannel_SetUserLables();
                Sidepannel_UnSetTopOpacity();

                if (Sidepannel_MainISuser()) {
                    Sidepannel_RemoveFocusMain();
                    Sidepannel_SetTopOpacity(Main_values.Main_Go);
                    Sidepannel_AddFocusMain();
                }
            } else {
                Main_showWarningDialog(STR_NOKUSER_WARN);
                window.setTimeout(Main_HideWarningDialog, 2000);
            }
            hidepanel = false;
        } else if (Main_values.Sidepannel_Pos === 3) Sidepannel_Go(Main_Live);
        else if (Main_values.Sidepannel_Pos === 4) Sidepannel_Go(Main_Featured);
        else if (Main_values.Sidepannel_Pos === 5) Sidepannel_Go(Main_games);
        else if (Main_values.Sidepannel_Pos === 6) Sidepannel_Go(Main_Vod);
        else if (Main_values.Sidepannel_Pos === 7) Sidepannel_Go(Main_Clip);
        else Sidepannel_KeyEnterBase();

        if (hidepanel) Sidepannel_Hide();
    }

    function Sidepannel_Go(GoTo) {
        if (GoTo === Main_values.Main_Go) {
            document.body.addEventListener("keydown", Sidepannel_Callback, false);
            Main_SwitchScreenAction();
        } else {
            Main_values.Main_Before = Main_values.Main_Go;
            Main_values.Main_Go = GoTo;
            Main_ExitCurrent(Main_values.Main_Before);
            Main_SwitchScreen();
        }
    }

    function Sidepannel_Start(callback, forceFeed) {
        Sidepannel_Callback = callback;
        document.body.removeEventListener("keydown", Sidepannel_Callback);
        if (!Sidepannel_IsMain || forceFeed) {
            if (AddUser_UserIsSet()) Sidepannel_StartFeed();
            else {
                Main_showWarningDialog(STR_NOKUSER_WARN);
                window.setTimeout(Main_HideWarningDialog, 2000);
                Sidepannel_StartMain();
            }
        } else Sidepannel_StartMain();
    }

    function Sidepannel_StartMain() {
        Main_RemoveClass('scenefeed', Screens_SettingDoAnimations ? 'scenefeed_background' : 'scenefeed_background_no_ani');
        Sidepannel_IsMain = true;
        Main_ShowElement('side_panel_fix');
        document.getElementById('side_panel_movel').style.marginLeft = 0;
        document.getElementById('side_panel_fix').style.marginLeft = '';
        document.body.addEventListener("keydown", Sidepannel_handleKeyDownMain, false);
        Sidepannel_AddFocusMain();
    }

    function Sidepannel_StartFeed() {
        Sidepannel_IsMain = false;
        document.body.addEventListener("keydown", Sidepannel_handleKeyDown, false);
        Main_RemoveClass('side_panel', 'side_panel_hide');
        Sidepannel_ShowFeed();
        Sidepannel_HideMain(true);
    }

    function Sidepannel_ShowFeed() {
        Main_AddClass('scenefeed', Screens_SettingDoAnimations ? 'scenefeed_background' : 'scenefeed_background_no_ani');
        if (UserLiveFeedobj_LiveFeedOldUserName !== AddUser_UsernameArray[0].name) UserLiveFeed_status[UserLiveFeedobj_UserLivePos] = false;
        UserLiveFeedobj_LiveFeedOldUserName = AddUser_UsernameArray[0].name;

        if (!UserLiveFeed_ThumbNull(UserLiveFeedobj_UserLivePos + '_0', UserLiveFeed_ids[0])) UserLiveFeed_status[UserLiveFeedobj_UserLivePos] = false;

        if (!UserLiveFeed_status[UserLiveFeedobj_UserLivePos] && !UserLiveFeed_loadingData) UserLiveFeed_RefreshLive();

        if (document.getElementById(UserLiveFeed_side_ids[0] + Sidepannel_PosFeed) !== null) {
            Sidepannel_PreloadImgs();
            Sidepannel_AddFocusFeed(true);
        }
    }

    function Sidepannel_HideMain(hideAll) {
        var size = AddUser_UsernameArray[0] ? AddUser_UsernameArray[0].display_name.length : STR_USER_ADD;
        size = (size > 11 ? size - 11 : 0);

        if (hideAll) document.getElementById('side_panel_fix').style.marginLeft = '-' + Sidepannel_FixdefaultMargin + '%';

        document.getElementById('side_panel_movel').style.marginLeft =
            'calc(-' + (hideAll ? (Sidepannel_MoveldefaultWidth + 0.5) : Sidepannel_MoveldefaultMargin) + '% - ' + size + 'ch)';
    }

    function Sidepannel_Hide() {
        Sidepannel_HideMain();
        Sidepannel_RemoveFocusMain();
        Sidepannel_SetTopOpacity(Main_values.Main_Go);
        Main_ShowElement('side_panel_fix');
        document.getElementById('side_panel_fix').style.marginLeft = '';
        Main_AddClass('side_panel', 'side_panel_hide');
        Main_HideElement('side_panel_feed_thumb');
        Main_RemoveClass('scenefeed', Screens_SettingDoAnimations ? 'scenefeed_background' : 'scenefeed_background_no_ani');

        document.body.removeEventListener("keydown", Sidepannel_handleKeyDown);
        document.body.removeEventListener("keydown", Sidepannel_handleKeyDownMain);
    }

    function Sidepannel_SetTopOpacity(Main_Go) {
        if (Sidepannel_Pos_Screens[Main_Go]) Main_values.Sidepannel_Pos = Sidepannel_Pos_Screens[Main_Go];
        Sidepannel_UnSetTopOpacity();

        if (Main_values.Sidepannel_Pos && Main_values.Sidepannel_Pos < 10) Main_AddClass('side_panel_new_' + Main_values.Sidepannel_Pos, 'side_panel_new_icons_text');
    }

    var Sidepannel_Pos_Screens = [
        1, //Main_Search 0
        3, //Main_Live 1
        0, //Main_Users 2
        4, //Main_Featured 3
        5, //Main_games 4
        6, //Main_Vod 5
        7, //Main_Clip 6
        3, //Main_UserLive 7
        4, //Main_UserHost 8
        5, //Main_usergames 9
        6, //Main_UserVod 10
        7, //Main_UserChannels 11
        1, // Main_SearchGames 12
        1, // Main_SearchLive 13
        1, // Main_SearchChannels 14
        0, // Main_ChannelContent 15
        0, // Main_ChannelVod 16
        0, // Main_ChannelClip 17
        0, // Main_addUser 18
        5, //Main_aGame 19
        5, //Main_AGameVod 20
        5, //Main_AGameClip 21
        9, //Main_AGameClip 22
        9, //Main_AGameClip 23
        9, //Main_AGameClip 24
    ];

    function Sidepannel_UnSetTopOpacity() {
        for (var i = 1; i < 10; i++) Main_RemoveClass('side_panel_new_' + i, 'side_panel_new_icons_text');
    }

    function Sidepannel_SetUserLables() {
        Main_values.Sidepannel_IsUser = true;

        Main_innerHTML('side_panel_movel_user_text', STR_SPACE + STR_USER_MENU + STR_SPACE);
        Main_ShowElement('side_panel_movel_user_text_holder');
        Main_ShowElement('side_panel_movel_new_8');
        Main_ShowElement('side_panel_new_8');

        Main_ShowElement('side_panel_movel_new_9');
        Main_ShowElement('side_panel_new_9');

        Main_innerHTML('side_panel_movel_new_2', STR_SPACE + STR_MAIN_MENU);
        Main_innerHTML('side_panel_movel_new_4', STR_SPACE + STR_LIVE_HOSTS);
        Main_innerHTML('side_panel_movel_new_5', STR_SPACE + STR_GAMES);
        Main_innerHTML('side_panel_movel_new_6', STR_SPACE + STR_VIDEOS);
        Main_innerHTML('side_panel_movel_new_7', STR_SPACE + STR_CHANNELS);
        Main_innerHTML('side_panel_movel_new_8', STR_SPACE + STR_USER_MY_CHANNEL);
        Main_innerHTML('side_panel_movel_new_9', STR_SPACE + STR_HISTORY);

        Sidepannel_SetIcons('side_panel_new_2', 'arrow-left');
        Sidepannel_SetIcons('side_panel_new_4', 'users');
        Sidepannel_SetIcons('side_panel_new_5', 'gamepad');
        Sidepannel_SetIcons('side_panel_new_6', 'movie-play');
        Sidepannel_SetIcons('side_panel_new_7', 'filmstrip');

    }

    function Sidepannel_SetDefaultLables() {
        if (AddUser_UsernameArray[0]) Sidepannel_SetUserlable(AddUser_UsernameArray[0].display_name);
        else Sidepannel_SetUserlable(STR_USER_ADD);

        Main_HideElement('side_panel_movel_new_9');
        Main_HideElement('side_panel_new_9');

        Main_HideElement('side_panel_movel_new_8');
        Main_HideElement('side_panel_new_8');
        Main_HideElement('side_panel_movel_user_text_holder');

        Main_innerHTML('side_panel_movel_new_1', STR_SPACE + STR_SEARCH);

        Main_innerHTML('side_panel_movel_new_2', STR_SPACE + STR_USER_MENU);
        Main_innerHTML('side_panel_movel_new_3', STR_SPACE + STR_LIVE);
        Main_innerHTML('side_panel_movel_new_4', STR_SPACE + STR_FEATURED);
        Main_innerHTML('side_panel_movel_new_5', STR_SPACE + STR_GAMES);
        Main_innerHTML('side_panel_movel_new_6', STR_SPACE + STR_VIDEOS);
        Main_innerHTML('side_panel_movel_new_7', STR_SPACE + STR_CLIPS);
        Main_innerHTML('side_panel_movel_new_8', STR_SPACE + STR_USER_MY_CHANNEL);
        Main_innerHTML('side_panel_movel_new_9', STR_SPACE + STR_HISTORY);

        Main_innerHTML('side_panel_movel_new_10', STR_SPACE + STR_SETTINGS);
        Main_innerHTML('side_panel_movel_new_11', STR_SPACE + STR_ABOUT);
        Main_innerHTML('side_panel_movel_new_12', STR_SPACE + STR_CONTROLS);
        Main_innerHTML('side_panel_movel_new_13', STR_SPACE + STR_EXIT);

        Sidepannel_SetIcons('side_panel_new_1', 'search');
        Sidepannel_SetIcons('side_panel_new_2', 'user');
        Sidepannel_SetIcons('side_panel_new_3', 'play');
        Sidepannel_SetIcons('side_panel_new_4', 'star');
        Sidepannel_SetIcons('side_panel_new_5', 'gamepad');
        Sidepannel_SetIcons('side_panel_new_6', 'movie-play');
        Sidepannel_SetIcons('side_panel_new_7', 'movie');
        Sidepannel_SetIcons('side_panel_new_8', 'user');
    }

    function Sidepannel_SetUserlable(text) {
        Main_innerHTML('side_panel_movel_new_0', STR_SPACE + text + STR_BR +
            '<div style="font-size: 45%;display: inline-block; transform: translateY(-80%);">' + STR_SPACE + STR_SPACE + STR_USER_EXTRAS + '</div>');
    }

    function Sidepannel_SetIcons(div, icon) {
        if (icon) Main_innerHTML(div, '<i class="icon icon-' + icon + ' side_panel_new_icons_pad"></i>');
        else Main_textContent(div, '');
    }

    function Sidepannel_Scroll(skipAnimation) {
        var value = '0%', //default
            center = 6,
            doc = document.getElementById('side_panel_holder');

        if (Sidepannel_PosFeed > center) { //Start scrolling in the middle
            if (Sidepannel_PosFeed < (Sidepannel_GetSize() - center))
                value = (-18.115 * (Sidepannel_PosFeed - center)) + '%';
            else if (((Sidepannel_GetSize() - center) - center) > 0) //if we are in the 7 left
                value = (-18.115 * (Sidepannel_GetSize() - (center * 2))) + '%';
        }

        if (!skipAnimation && Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
            !Screens_ChangeFocusAnimationFast) {
            Screens_ChangeFocusAnimationFinished = false;
            Screens_ChangeFocusAnimationFast = true;

            doc.style.transition = '';
            doc.classList.add('side_panel_holder_ani');

            window.setTimeout(function() {
                Screens_ChangeFocusAnimationFinished = true;
            }, 200); //Same value as side_panel_holder_ani

        } else {
            if (skipAnimation) Screens_ChangeFocusAnimationFast = false;
            doc.style.transition = 'none';
            doc.classList.remove('side_panel_holder_ani');
        }

        doc.style.marginTop = value;

    }

    function Sidepannel_handleKeyDown(event) {
        switch (event.keyCode) {
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
            case KEY_CHAT:
                Sidepannel_Hide();
                Main_SwitchScreenAction();
                break;
            case KEY_RIGHT:
                Main_AddClass('side_panel', 'side_panel_hide');
                Main_RemoveClass('scenefeed', Screens_SettingDoAnimations ? 'scenefeed_background' : 'scenefeed_background_no_ani');
                Main_HideElement('side_panel_feed_thumb');
                document.body.removeEventListener("keydown", Sidepannel_handleKeyDown);
                Sidepannel_StartMain();
                break;
            case KEY_REFRESH:
            case KEY_LEFT:
                if (!UserLiveFeed_loadingData) UserLiveFeed_RefreshLive();
                break;
            case KEY_PG_UP:
            case KEY_UP:
                if (Screens_ChangeFocusAnimationFinished && Sidepannel_PosFeed && !UserLiveFeed_loadingData) {
                    Sidepannel_RemoveFocusFeed();
                    Sidepannel_PosFeed--;
                    Sidepannel_AddFocusFeed();
                }
                break;
            case KEY_PG_DOWN:
            case KEY_DOWN:
                if (Screens_ChangeFocusAnimationFinished && Sidepannel_PosFeed < (Sidepannel_GetSize() - 1) && !UserLiveFeed_loadingData) {
                    Sidepannel_RemoveFocusFeed();
                    Sidepannel_PosFeed++;
                    Sidepannel_AddFocusFeed();
                }
                break;
            case KEY_PLAY:
            case KEY_PLAYPAUSE:
            case KEY_KEYBOARD_SPACE:
            case KEY_ENTER:
                if (!UserLiveFeed_loadingData) {
                    var doc = document.getElementById("side_panel");
                    doc.style.transition = 'none';
                    Sidepannel_Hide();
                    Main_values.Play_isHost = false;
                    Play_UserLiveFeedPressed = true;
                    Main_ready(function() {
                        Main_OpenLiveStream(Sidepannel_PosFeed, UserLiveFeed_side_ids, Sidepannel_handleKeyDown);
                        if (Settings_Obj_default("app_animations")) doc.style.transition = '';
                    });
                }
                break;
            case KEY_PAUSE: //key s
            case KEY_6:
                Main_showSettings();
                Sidepannel_Hide();
                break;
            case KEY_A:
            case KEY_7:
                Main_showAboutDialog(Sidepannel_Callback, Screens_handleKeyControls);
                Sidepannel_Hide();
                break;
            case KEY_C:
            case KEY_8:
                Main_showControlsDialog(Sidepannel_Callback, Screens_handleKeyControls);
                Sidepannel_Hide();
                break;
            case KEY_E:
            case KEY_9:
                Main_showExitDialog();
                Sidepannel_Hide();
                break;
            default:
                break;
        }
    }

    function Sidepannel_handleKeyDownMain(event) {
        switch (event.keyCode) {
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
            case KEY_RIGHT:
                Sidepannel_Hide();
                Main_SwitchScreenAction();
                break;
            case KEY_CHAT:
            case KEY_LEFT:
                if (AddUser_UserIsSet()) {
                    document.body.removeEventListener("keydown", Sidepannel_handleKeyDownMain);
                    Sidepannel_StartFeed();
                } else {
                    Main_showWarningDialog(STR_NOKUSER_WARN);
                    window.setTimeout(Main_HideWarningDialog, 2000);
                }
                break;
            case KEY_PG_UP:
            case KEY_UP:
                if (Main_values.Sidepannel_Pos) {
                    Sidepannel_RemoveFocusMain();
                    Main_values.Sidepannel_Pos--;
                    if (!Main_values.Sidepannel_IsUser && Main_values.Sidepannel_Pos === 8) Main_values.Sidepannel_Pos -= 2;
                    Sidepannel_AddFocusMain();
                }
                break;
            case KEY_PG_DOWN:
            case KEY_DOWN:
                if (Main_values.Sidepannel_Pos < 13) {
                    Sidepannel_RemoveFocusMain();
                    Main_values.Sidepannel_Pos++;
                    if (!Main_values.Sidepannel_IsUser && Main_values.Sidepannel_Pos === 8) Main_values.Sidepannel_Pos += 2;
                    Sidepannel_AddFocusMain();
                }
                break;
            case KEY_PLAY:
            case KEY_PLAYPAUSE:
            case KEY_KEYBOARD_SPACE:
            case KEY_ENTER:
                Sidepannel_KeyEnter();
                break;
            case KEY_PAUSE: //key s
            case KEY_6:
                Main_showSettings();
                Sidepannel_Hide();
                break;
            case KEY_A:
            case KEY_7:
                Main_showAboutDialog(Sidepannel_Callback, Screens_handleKeyControls);
                Sidepannel_Hide();
                break;
            case KEY_C:
            case KEY_8:
                Main_showControlsDialog(Sidepannel_Callback, Screens_handleKeyControls);
                Sidepannel_Hide();
                break;
            case KEY_E:
            case KEY_9:
                Main_showExitDialog();
                Sidepannel_Hide();
                break;
            default:
                break;
        }
    }
    //Spacing for reease maker not trow erros frm jshint
    var UserLiveFeed_loadingData = false;
    var UserLiveFeed_loadingDataId;
    var UserLiveFeed_loadingDataTry = 0;
    var UserLiveFeed_loadingDataTimeout = 3500;
    var UserLiveFeed_loadChannelOffsset = 0;
    var UserLiveFeed_loadingDataTryMax = 5;
    var UserLiveFeed_followerChannels = '';
    var UserLiveFeed_idObject = [];
    var UserLiveFeed_status = [];
    var UserLiveFeed_LastPos = [];
    var UserSidePannel_LastPos = [];
    var UserLiveFeed_token = null;
    var UserLiveFeed_Feedid;
    var UserLiveFeed_FocusClass = 'feed_thumbnail_focused';
    var UserLiveFeed_PreventHide = false;

    var UserLiveFeed_CheckNotifycation = false;
    var UserLiveFeed_WasLiveidObject = {};
    var UserLiveFeed_NotifyLiveidObject = [];
    var UserLiveFeed_PreloadImgs = [];
    var UserLiveFeed_Notify = true;
    var UserLiveFeed_NotifyRunning = false;
    var UserLiveFeed_NotifyTimeout = 3000;

    var UserLiveFeed_FeedPosY = [];
    var UserLiveFeed_itemsCount = [];
    var UserLiveFeed_obj = {};
    var ImageLoaderWorker;
    var UserLiveFeed_ImgObj = [];

    var UserLiveFeed_ids = ['ulf_thumbdiv', 'ulf_img', 'ulf_infodiv', 'ulf_displayname', 'ulf_streamtitle', 'ulf_streamgame', 'ulf_viwers', 'ulf_quality', 'ulf_cell', 'ulempty_', 'user_live_scroll'];

    var UserLiveFeed_side_ids = ['usf_thumbdiv', 'usf_img', 'usf_infodiv', 'usf_displayname', 'usf_streamtitle', 'usf_streamgame', 'usf_viwers', 'usf_quality', 'usf_cell', 'ulempty_', 'user_live_scroll'];

    function UserLiveFeed_StartLoad() {
        UserLiveFeed_StartLoadPos(UserLiveFeed_FeedPosX);
    }

    function UserLiveFeed_StartLoadPos(pos) {
        UserLiveFeed_clearHideFeed();

        UserLiveFeed_CounterDialogRst();
        UserLiveFeed_Showloading(true);
        UserLiveFeedobj_loadDataPrepare();
        UserLiveFeed_obj[pos].load();
    }

    function UserLiveFeed_Prepare() {
        //User live
        UserLiveFeed_obj[UserLiveFeedobj_UserLivePos] = {};
        UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].load = UserLiveFeedobj_CheckToken;
        UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].show = UserLiveFeedobj_ShowFeed;
        UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].hide = UserLiveFeedobj_HideFeed;
        UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].div = 'user_feed_scroll';

        //User live
        UserLiveFeed_obj[UserLiveFeedobj_UserHostPos] = {};
        UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].load = UserLiveFeedobj_UserHost;
        UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].show = UserLiveFeedobj_ShowUserHost;
        UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].hide = UserLiveFeedobj_HideUserHost;
        UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].div = 'user_host_scroll';

        //Live
        UserLiveFeed_obj[UserLiveFeedobj_LivePos] = {};
        UserLiveFeed_obj[UserLiveFeedobj_LivePos].load = UserLiveFeedobj_Live;
        UserLiveFeed_obj[UserLiveFeedobj_LivePos].show = UserLiveFeedobj_ShowLive;
        UserLiveFeed_obj[UserLiveFeedobj_LivePos].hide = UserLiveFeedobj_HideLive;
        UserLiveFeed_obj[UserLiveFeedobj_LivePos].div = 'live_feed_scroll';
        UserLiveFeed_obj[UserLiveFeedobj_LivePos].StreamType = 'streams';
        UserLiveFeed_obj[UserLiveFeedobj_LivePos].cell = UserLiveFeedobj_LiveCell;

        //Current Game
        UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos] = {};
        UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].load = UserLiveFeedobj_CurrentGame;
        UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].show = UserLiveFeedobj_ShowCurrentGame;
        UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].hide = UserLiveFeedobj_HideCurrentGame;
        UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].div = 'current_game_feed_scroll';
        UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].StreamType = 'streams';
        UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].cell = UserLiveFeedobj_CurrentGameCell;

        //Featured
        UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos] = {};
        UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].load = UserLiveFeedobj_Featured;
        UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].show = UserLiveFeedobj_ShowFeatured;
        UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].hide = UserLiveFeedobj_HideFeatured;
        UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].div = 'featured_feed_scroll';
        UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].StreamType = 'featured';
        UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].cell = UserLiveFeedobj_FeaturedCell;

        if (!AddUser_UserIsSet()) UserLiveFeed_FeedPosX = UserLiveFeedobj_LivePos;

        UserLiveFeed_Setworker();
    }

    function UserLiveFeed_Setworker() {
        //Adapted from https://dev.to/trezy/loading-images-with-web-workers-49ap
        var blobURL = URL.createObjectURL(new Blob(['(',

            function() {
                this.addEventListener('message',
                    function(event) {
                        var onload = function(obj) {
                            if (obj.status !== 200) obj.response = null;

                            this.postMessage({
                                url: obj.mData.url,
                                blob: obj.response,
                                id: obj.mData.id,
                            });
                        };

                        var xmlHttp = new XMLHttpRequest();
                        xmlHttp.responseType = 'blob';
                        xmlHttp.mData = event.data;

                        xmlHttp.onreadystatechange = function() {
                            if (xmlHttp.readyState === 4) {
                                onload(xmlHttp);
                            }
                        };

                        xmlHttp.open('GET', xmlHttp.mData.url, true);
                        xmlHttp.timeout = 3000;
                        xmlHttp.ontimeout = function() {};
                        xmlHttp.send();
                    }
                );

            }.toString(),

            ')()'
        ], {
            type: 'application/javascript'
        }));

        ImageLoaderWorker = new Worker(blobURL);

        ImageLoaderWorker.addEventListener('message',
            function(event) {
                var imageData = event.data,
                    imageElement = document.getElementById(imageData.id),
                    objectURL = imageData.blob ? URL.createObjectURL(imageData.blob) : imageData.url;

                imageElement.onload = function() {
                    this.onload = null;
                    URL.revokeObjectURL(objectURL);
                };
                imageElement.setAttribute('src', objectURL);
            }
        );
    }

    function UserLiveFeed_LoadImg(pos) {
        for (var i = 0; i < UserLiveFeed_ImgObj[pos].length; i++) {
            ImageLoaderWorker.postMessage(UserLiveFeed_ImgObj[pos][i]);
        }
    }

    function UserLiveFeed_LoadImgPush(pos, url, id) {
        UserLiveFeed_ImgObj[pos].push({
            id: UserLiveFeed_ids[1] + id,
            url: url.replace("{width}x{height}", Main_VideoSizeLiveFeed) + Main_randomimg
        });
    }

    var UserLiveFeed_ImgSideObj = [];

    function UserLiveFeed_LoadImgSidePush(url, id) {
        UserLiveFeed_ImgSideObj.push({
            id: id,
            url: url
        });
    }

    function UserLiveFeed_LoadImgSide() {
        for (var i = 0; i < UserLiveFeed_ImgSideObj.length; i++) {
            ImageLoaderWorker.postMessage(UserLiveFeed_ImgSideObj[i]);
        }
    }

    function UserLiveFeed_RefreshLive() {
        if (AddUser_UserIsSet()) {
            UserLiveFeedobj_loadDataPrepare();
            UserLiveFeedobj_CheckToken();
        }
    }

    function UserLiveFeed_CounterDialogRst() {
        Main_empty('feed_counter');
    }

    function UserLiveFeed_CounterDialog(pos, total) {
        if (total > 0) Main_textContent('feed_counter', (pos + 1) + '/' + (total));
        else UserLiveFeed_CounterDialogRst();
    }

    function UserLiveFeed_loadDataSuccessFinish(ShowNotifications, pos) {
        UserLiveFeed_loadingData = false;
        UserLiveFeed_status[pos] = true;

        UserLiveFeed_Showloading(false);
        Main_HideElement('dialog_loading_side_feed');
        Sidepannel_AddFocusFeed(true);
        UserLiveFeed_FeedAddFocus(true, pos);

        if (ShowNotifications) {
            //The app just started or user change don't nottify
            if (UserLiveFeed_CheckNotifycation) UserLiveFeedobj_LiveNotification();
            else {
                UserLiveFeed_NotifyLiveidObject = [];
                UserLiveFeed_CheckNotifycation = true;
            }
        }
    }

    function UserLiveFeed_GetSize(pos) {
        return UserLiveFeed_itemsCount[pos];
    }

    function UserLiveFeed_CreatFeed(id, data) {
        var ishosting = data[1].indexOf(STR_USER_HOSTING) !== -1,
            div = document.createElement('div');

        div.setAttribute('id', UserLiveFeed_ids[8] + id);
        div.setAttribute(Main_DataAttribute, JSON.stringify(data));

        div.className = 'user_feed_thumb';
        div.innerHTML = '<div id="' + UserLiveFeed_ids[0] + id + '" class="stream_thumbnail_player_feed" >' +
            '<div class="stream_thumbnail_live_img"><img id="' + UserLiveFeed_ids[1] + id +
            '" alt="" class="stream_img" onerror="this.onerror=null;this.src=\'' + IMG_404_VIDEO + '\';"></div>' +
            '<div id="' + UserLiveFeed_ids[2] + id + '" class="player_live_feed_text"><span class="stream_spam_text_holder">' +
            '<div id="' + UserLiveFeed_ids[3] + id + '" class="stream_info_live_name"' +
            (ishosting ? ' style="max-height: 2.4em; overflow: hidden; white-space: normal;' : '') + '">' + Main_ReplaceLargeFont(data[1]) + '</div>' +
            '<div id="' + UserLiveFeed_ids[4] + id + '"class="stream_info_live_title" ' + (ishosting ? 'style="max-height: 1.2em;"' : '') +
            '>' + Main_ReplaceLargeFont(twemoji.parse(data[2])) + '</div><div style="line-height: 1.6ch;"><div id="' +
            UserLiveFeed_ids[5] + id + '"class="stream_info_live" style="width: 70.75%; display: inline-block;">' + data[3] +
            '</div><div "class="stream_info_live " style="width:29%; float: right; text-align: right; display: inline-block; font-size: 75%; ">' +
            '<i class="icon-' + (!data[8] ? 'circle" style="color: ' + (ishosting ? '#FED000' : 'red') + ';' : 'refresh" style="') + ' font-size: 75%; "></i>' +
            STR_SPACE + Main_addCommas(data[13]) + '</div></div></span></div></div>';

        return div;
    }

    function UserLiveFeed_isFeedShow() {
        return document.getElementById('user_feed').className.indexOf('user_feed_hide') === -1;
    }

    function UserLiveFeed_ShowFeed() {
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();
    }

    function UserLiveFeed_Show() {
        Main_RemoveClass('user_feed', 'user_feed_hide');
    }

    function UserLiveFeed_Hide() {
        Main_AddClass('user_feed', 'user_feed_hide');
    }

    function UserLiveFeed_ResetFeedId() {
        UserLiveFeed_clearHideFeed();
        if (!UserLiveFeed_PreventHide) UserLiveFeed_setHideFeed();
    }

    function UserLiveFeed_clearHideFeed() {
        window.clearTimeout(UserLiveFeed_Feedid);
    }

    function UserLiveFeed_setHideFeed() {
        if (UserLiveFeed_isFeedShow()) UserLiveFeed_Feedid = window.setTimeout(UserLiveFeed_Hide, 5500);
    }

    function UserLiveFeed_FeedRefresh() {
        UserLiveFeed_clearHideFeed();
        if (!UserLiveFeed_loadingData) UserLiveFeed_StartLoad();
        else {
            window.clearTimeout(UserLiveFeed_loadingDataId);
            UserLiveFeed_loadingDataId = window.setTimeout(function() {
                UserLiveFeed_loadingData = false;
            }, 15000);
        }
    }

    function UserLiveFeed_FeedAddFocus(skipAnimation, pos) {
        if (!UserLiveFeed_ThumbNull(pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_ids[0])) return;

        if (!Play_isEndDialogVisible() || !Play_EndFocus)
            Main_AddClass(UserLiveFeed_ids[0] + pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_FocusClass);

        UserLiveFeed_FeedSetPos(skipAnimation, pos);
        UserLiveFeed_CounterDialog(UserLiveFeed_FeedPosY[pos], UserLiveFeed_itemsCount[pos]);
        UserLiveFeed_ResetFeedId();
    }

    function UserLiveFeed_FeedRemoveFocus(pos) {
        if (UserLiveFeed_ThumbNull(pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_ids[0]))
            Main_RemoveClass(UserLiveFeed_ids[0] + pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_FocusClass);
    }

    function UserLiveFeed_FeedGetPos(pos) {
        var position = 0;

        if (UserLiveFeed_FeedPosY[pos] < 3) position = 2.5;
        else if (UserLiveFeed_ThumbNull((pos + '_' + (UserLiveFeed_FeedPosY[pos] + 2)), UserLiveFeed_ids[0]))
            position = (document.getElementById(UserLiveFeed_ids[8] + pos + '_' + (UserLiveFeed_FeedPosY[pos] - 2)).offsetLeft * -1);
        else if (UserLiveFeed_ThumbNull(pos + '_' + (UserLiveFeed_FeedPosY[pos] + 1), UserLiveFeed_ids[0]))
            position = (document.getElementById(UserLiveFeed_ids[8] + pos + '_' + (UserLiveFeed_FeedPosY[pos] - 3)).offsetLeft * -1);
        else position = (document.getElementById(UserLiveFeed_ids[8] + pos + '_' + (UserLiveFeed_FeedPosY[pos] - (UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX] > 3 ? 4 : 3))).offsetLeft * -1);

        return position;
    }

    function UserLiveFeed_FeedSetPos(skipAnimation, pos) {
        var position = UserLiveFeed_FeedGetPos(pos);
        var doc = document.getElementById(UserLiveFeed_obj[pos].div);

        if (!skipAnimation && Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
            !Screens_ChangeFocusAnimationFast) {
            Screens_ChangeFocusAnimationFinished = false;
            Screens_ChangeFocusAnimationFast = true;

            doc.style.transition = '';
            doc.classList.add('user_feed_scroll_ani');

            window.setTimeout(function() {
                Screens_ChangeFocusAnimationFinished = true;
            }, 200); //Same value as user_feed_scroll_ani
        } else {
            if (skipAnimation) Screens_ChangeFocusAnimationFast = false;
            doc.style.transition = 'none';
            doc.classList.remove('user_feed_scroll_ani');
        }

        if (position) doc.style.left = (position / BodyfontSize) + "em";
    }

    function UserLiveFeed_ThumbNull(y, thumbnail) {
        return document.getElementById(thumbnail + y) !== null;
    }

    function UserLiveFeed_SetFeedPicText() {
        Main_innerHTML('icon_feed_refresh', '<div class="strokedelinebig" style="vertical-align: middle; display: inline-block;"><i class="icon-refresh" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_REFRESH + ':' + STR_HOLD_UP + STR_SPACE + STR_SPACE + '</div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block;"><i class="icon-pp" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_PICTURE_LIVE_FEED + '</div>');
    }

    function UserLiveFeed_Unset() {
        Main_IconLoad('icon_feed_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_HOLD_UP);
    }

    function UserLiveFeed_SetMulti() {
        Main_IconLoad('icon_feed_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_HOLD_UP + STR_MULTI_TITLE);
    }

    function UserLiveFeed_SetHoldUp() {
        Main_IconLoad('icon_feed_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_HOLD_UP + STR_FEED_END_DIALOG);
    }

    function UserLiveFeed_KeyRightLeft(Adder) {
        if (Screens_ChangeFocusAnimationFinished && !UserLiveFeed_loadingData) {
            var NextPos = UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX] + Adder;
            if (NextPos > (UserLiveFeed_GetSize(UserLiveFeed_FeedPosX) - 1) || NextPos < 0) return;

            UserLiveFeed_FeedRemoveFocus(UserLiveFeed_FeedPosX);
            UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX] = NextPos;
            UserLiveFeed_FeedAddFocus(false, UserLiveFeed_FeedPosX);
        }
        UserLiveFeed_ResetFeedId();
    }

    function UserLiveFeed_KeyUpDown(Adder) {
        if (Screens_ChangeFocusAnimationFinished && !UserLiveFeed_loadingData) {

            var NextPos = UserLiveFeed_FeedPosX + Adder,
                userSet = AddUser_UserIsSet();

            if (NextPos > (userSet ? UserLiveFeedobj_MAX : UserLiveFeedobj_MAX_No_user)) {
                NextPos = 0;
                if (!userSet) Play_showWarningDialog(STR_NOKUSER_WARN, 1000);
            } else if (NextPos < 0) {
                NextPos = userSet ? UserLiveFeedobj_MAX : UserLiveFeedobj_MAX_No_user;
                if (!userSet) Play_showWarningDialog(STR_NOKUSER_WARN, 1000);
            }

            if (NextPos === UserLiveFeedobj_CurrentGamePos && Play_data.data[3] === '') {
                UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
                UserLiveFeed_FeedPosX = NextPos;
                UserLiveFeed_KeyUpDown(Adder);
                return;
            }

            UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
            UserLiveFeed_FeedPosX = NextPos;
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();
        }
        UserLiveFeed_ResetFeedId();
    }

    function UserLiveFeed_Showloading(show) {
        if (Main_IsNotBrowser) {
            try {
                Android.mshowLoadingBotton(show);
            } catch (e) {
                if (show) Main_ShowElement('dialog_loading_feed');
                else Main_HideElement('dialog_loading_feed');
            }
        } else {
            if (show) Main_ShowElement('dialog_loading_feed');
            else Main_HideElement('dialog_loading_feed');
        }
    }
    var UserLiveFeedobj_loadErrorCallback;

    //Global
    var UserLiveFeedobj_FeaturedPos = 0;
    var UserLiveFeedobj_CurrentGamePos = 1;
    var UserLiveFeedobj_LivePos = 2;
    //User
    var UserLiveFeedobj_UserLivePos = 3;
    var UserLiveFeedobj_UserHostPos = 4;

    var UserLiveFeed_FeedPosX = UserLiveFeedobj_UserLivePos; //Default pos
    var UserLiveFeedobj_MAX = UserLiveFeedobj_UserHostPos;
    var UserLiveFeedobj_MAX_No_user = UserLiveFeedobj_LivePos;

    function UserLiveFeedobj_StartDefault(pos) {
        if (UserLiveFeed_status[pos]) {
            if (UserLiveFeed_ThumbNull(pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_ids[0]))
                UserLiveFeed_LastPos[pos] = JSON.parse(document.getElementById(UserLiveFeed_ids[8] + pos + '_' + UserLiveFeed_FeedPosY[pos]).getAttribute(Main_DataAttribute))[6];
        } else {
            UserSidePannel_LastPos[pos] = null;
            UserLiveFeed_LastPos[pos] = null;
        }

        UserLiveFeed_ImgObj[pos] = [];
        UserLiveFeed_itemsCount[pos] = 0;
        Main_empty(UserLiveFeed_obj[pos].div);
        UserLiveFeed_status[pos] = false;
        document.getElementById(UserLiveFeed_obj[pos].div).style.left = "0.125em";
        UserLiveFeed_FeedPosY[pos] = 0;
        UserLiveFeed_idObject[pos] = {};

        Main_updateclock();
        Main_ShowElement('dialog_loading_side_feed');
        if (UserLiveFeed_isFeedShow()) Main_RemoveClass(UserLiveFeed_obj[pos].div, 'opacity_zero');
    }

    function UserLiveFeedobj_CheckToken() {
        if (UserLiveFeed_status[UserLiveFeed_FeedPosX]) {
            if (UserLiveFeed_ThumbNull(Sidepannel_PosFeed, UserLiveFeed_side_ids[0]))
                UserSidePannel_LastPos[UserLiveFeedobj_UserLivePos] = JSON.parse(document.getElementById(UserLiveFeed_side_ids[8] + Sidepannel_PosFeed).getAttribute(Main_DataAttribute))[6];
        }
        UserLiveFeed_ImgSideObj = [];
        UserLiveFeed_PreloadImgs = [];
        Sidepannel_PosFeed = 0;
        Main_empty('side_panel_holder');
        document.getElementById('side_panel_warn').style.display = 'none';
        Main_HideElement('side_panel_feed_thumb');
        UserLiveFeed_loadChannelOffsset = 0;
        UserLiveFeed_followerChannels = '';

        UserLiveFeedobj_StartDefault(UserLiveFeedobj_UserLivePos);

        UserLiveFeed_token = AddUser_UsernameArray[0].access_token;
        if (UserLiveFeed_token) {
            UserLiveFeed_token = Main_OAuth + UserLiveFeed_token;
            UserLiveFeedobj_loadChannelUserLive();
        } else {
            UserLiveFeedobj_loadDataPrepare();
            UserLiveFeed_token = null;
            UserLiveFeedobj_loadChannels();
        }
    }

    function UserLiveFeedobj_loadDataPrepare() {
        UserLiveFeed_loadingData = true;
        UserLiveFeed_loadingDataTry = 0;
        UserLiveFeed_loadingDataTimeout = 3500;
    }

    function UserLiveFeedobj_loadChannels() {
        var theUrl = Main_kraken_api + 'users/' + encodeURIComponent(AddUser_UsernameArray[0].id) +
            '/follows/channels?limit=100&offset=' + UserLiveFeed_loadChannelOffsset + '&sortby=created_at' + Main_TwithcV5Flag;

        UserLiveFeedobj_loadErrorCallback = UserLiveFeedobj_loadChannels;

        if (Main_IsNotBrowser && UserLiveFeed_isFeedShow()) BaseAndroidhttpGet(theUrl, UserLiveFeed_loadingDataTimeout, 2, null, UserLiveFeedobj_loadChannelLive, UserLiveFeedobj_loadDataError);
        else BasexmlHttpGet(theUrl, UserLiveFeed_loadingDataTimeout, 2, null, UserLiveFeedobj_loadChannelLive, UserLiveFeedobj_loadDataError);
    }

    function UserLiveFeedobj_loadDataError() {
        UserLiveFeed_loadingDataTry++;
        if (UserLiveFeed_loadingDataTry < UserLiveFeed_loadingDataTryMax) {
            UserLiveFeed_loadingDataTimeout += 500;
            UserLiveFeedobj_loadErrorCallback();
        } else {
            UserLiveFeed_loadingData = false;
            UserLiveFeed_Showloading(false);
            Main_HideElement('dialog_loading_side_feed');

            if (UserLiveFeed_isFeedShow()) {
                Main_innerHTML(UserLiveFeed_obj[UserLiveFeed_FeedPosX].div,
                    '<div style="color: #FFFFFF;text-align: center;vertical-align: middle;margin-bottom: 7%;font-size: 150%;"> ' + STR_REFRESH_PROBLEM + '</div>');
            }
        }
    }

    function UserLiveFeedobj_loadChannelLive(responseText) {
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
            UserLiveFeedobj_loadDataPrepare();
            UserLiveFeedobj_loadChannels();
        } else { // end
            UserLiveFeed_followerChannels = UserLiveFeed_followerChannels.slice(0, -1);
            UserLiveFeedobj_loadDataPrepare();
            UserLiveFeedobj_loadChannelUserLive();
        }
    }

    function UserLiveFeedobj_loadChannelUserLive() {
        var theUrl = Main_kraken_api + 'streams/';

        if (UserLiveFeed_token) {
            theUrl += 'followed?';
        } else {
            theUrl += '?channel=' + encodeURIComponent(UserLiveFeed_followerChannels) + '&';
        }
        theUrl += 'limit=100&offset=0&stream_type=all' + Main_TwithcV5Flag;

        UserLiveFeedobj_loadErrorCallback = UserLiveFeedobj_loadChannelUserLive;
        UserLiveFeedobj_loadChannelUserLiveGet(theUrl);
    }

    function UserLiveFeedobj_loadChannelUserLiveGet(theUrl) {
        var xmlHttp;

        if (Main_IsNotBrowser && UserLiveFeed_isFeedShow()) {
            xmlHttp = Android.mreadUrl(theUrl, UserLiveFeed_loadingDataTimeout, UserLiveFeed_token ? 3 : 2, UserLiveFeed_token);

            if (xmlHttp) UserLiveFeedobj_loadChannelUserLiveGetEnd(JSON.parse(xmlHttp));
            else {
                UserLiveFeedobj_loadDataError();
                return;
            }

        } else {
            xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.timeout = UserLiveFeed_loadingDataTimeout;

            xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
            xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
            if (UserLiveFeed_token) xmlHttp.setRequestHeader(Main_Authorization, UserLiveFeed_token);

            xmlHttp.ontimeout = function() {};

            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState === 4) UserLiveFeedobj_loadChannelUserLiveGetEnd(xmlHttp);
            };

            xmlHttp.send(null);
        }
    }

    function UserLiveFeedobj_loadChannelUserLiveGetEnd(xmlHttp) {
        if (xmlHttp.status === 200) {
            UserLiveFeedobj_loadDataSuccess(xmlHttp.responseText);
        } else if (UserLiveFeed_token && (xmlHttp.status === 401 || xmlHttp.status === 403)) { //token expired
            //Token has change or because is new or because it is invalid because user delete in twitch settings
            // so callbackFuncOK and callbackFuncNOK must be the same to recheck the token
            AddCode_refreshTokens(0, 0, UserLiveFeedobj_CheckToken, UserLiveFeedobj_loadDataRefreshTokenError);
        } else {
            UserLiveFeedobj_loadDataError();
        }
    }

    function UserLiveFeedobj_loadDataRefreshTokenError() {
        if (!AddUser_UsernameArray[0].access_token) UserLiveFeedobj_CheckToken();
        else UserLiveFeedobj_loadDataError();
    }

    function UserLiveFeedobj_loadDataSuccess(responseText) {

        var response = JSON.parse(responseText).streams,
            response_items = response.length,
            sorting = Settings_Obj_default('live_feed_sort'),
            stream, id, mArray, obj_id,
            doc = document.getElementById(UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].div),
            docside = document.getElementById("side_panel_holder"),
            i = 0;

        //if (response_items < Main_ItemsLimitVideo) UserLiveFeed_dataEnded = true;

        if (!UserLiveFeed_WasLiveidObject[AddUser_UsernameArray[0].name]) {
            UserLiveFeed_WasLiveidObject[AddUser_UsernameArray[0].name] = {};
            UserLiveFeed_CheckNotifycation = false;
        }

        var sorting_type1 = Settings_FeedSort[sorting][0],
            sorting_type2 = Settings_FeedSort[sorting][1],
            sorting_direction = Settings_FeedSort[sorting][2];

        if (sorting_direction) {
            //A-Z
            if (sorting_type1) {
                response.sort(function(a, b) {
                    return (a[sorting_type1][sorting_type2] < b[sorting_type1][sorting_type2] ? -1 :
                        (a[sorting_type1][sorting_type2] > b[sorting_type1][sorting_type2] ? 1 : 0));
                });
            } else {
                response.sort(function(a, b) {
                    return (a[sorting_type2] < b[sorting_type2] ? -1 :
                        (a[sorting_type2] > b[sorting_type2] ? 1 : 0));
                });
            }
        } else {
            //Z-A
            if (sorting_type1) {
                response.sort(function(a, b) {
                    return (a[sorting_type1][sorting_type2] > b[sorting_type1][sorting_type2] ? -1 :
                        (a[sorting_type1][sorting_type2] < b[sorting_type1][sorting_type2] ? 1 : 0));
                });
            } else {
                response.sort(function(a, b) {
                    return (a[sorting_type2] > b[sorting_type2] ? -1 :
                        (a[sorting_type2] < b[sorting_type2] ? 1 : 0));
                });
            }
        }

        for (i; i < response_items; i++) {
            stream = response[i];
            id = stream.channel._id;
            if (!UserLiveFeed_idObject[UserLiveFeedobj_UserLivePos][id]) {

                UserLiveFeed_idObject[UserLiveFeedobj_UserLivePos][id] = 1;
                mArray = ScreensObj_LiveCellArray(stream);
                UserLiveFeed_PreloadImgs.push(mArray[0]);

                //Check if was live if not notificate
                if (!UserLiveFeed_WasLiveidObject[AddUser_UsernameArray[0].name][id]) {
                    UserLiveFeed_NotifyLiveidObject.push({
                        name: mArray[1],
                        logo: mArray[9],
                        title: Main_ReplaceLargeFont(twemoji.parse(mArray[2])),
                        game: mArray[3],
                        rerun: mArray[8],
                    });
                }
                obj_id = UserLiveFeedobj_UserLivePos + '_' + UserLiveFeed_itemsCount[UserLiveFeedobj_UserLivePos];
                UserLiveFeed_LoadImgPush(UserLiveFeedobj_UserLivePos, mArray[0], obj_id);

                if (UserLiveFeed_LastPos[UserLiveFeedobj_UserLivePos] !== null && UserLiveFeed_LastPos[UserLiveFeedobj_UserLivePos] === stream.channel.name)
                    UserLiveFeed_FeedPosY[UserLiveFeedobj_UserLivePos] = UserLiveFeed_itemsCount[UserLiveFeedobj_UserLivePos];

                doc.appendChild(
                    UserLiveFeed_CreatFeed(
                        obj_id,
                        mArray
                    )
                );

                if (UserSidePannel_LastPos[UserLiveFeedobj_UserLivePos] !== null && UserSidePannel_LastPos[UserLiveFeedobj_UserLivePos] === stream.channel.name)
                    Sidepannel_PosFeed = UserLiveFeed_itemsCount[UserLiveFeedobj_UserLivePos];

                UserLiveFeed_LoadImgSidePush(mArray[9], UserLiveFeed_side_ids[1] + UserLiveFeed_itemsCount[UserLiveFeedobj_UserLivePos]);
                docside.appendChild(
                    UserLiveFeedobj_CreatSideFeed(
                        UserLiveFeed_itemsCount[UserLiveFeedobj_UserLivePos],
                        mArray
                    )
                );

                UserLiveFeed_itemsCount[UserLiveFeedobj_UserLivePos]++;
            }
        }

        UserLiveFeed_WasLiveidObject[AddUser_UsernameArray[0].name] = JSON.parse(JSON.stringify(UserLiveFeed_idObject[UserLiveFeedobj_UserLivePos]));

        // doc.appendChild(
        //     UserLiveFeed_CreatFeed(i++,
        //         [
        //             IMG_404_VIDEO,
        //             "ashlynn",
        //             "title",
        //             "game",
        //             "for 1000 Viewers",
        //             "720p30 [EN]",
        //             "ashlynn",
        //             10000000000,
        //             true,
        //             IMG_404_LOGO,
        //             true,
        //             "Since 11:04:36&nbsp;",
        //             "2020-01-25T09:49:05Z",
        //             1000,
        //             35618666]
        //     )
        // );

        UserLiveFeed_loadDataSuccessFinish(true, UserLiveFeedobj_UserLivePos);
        UserLiveFeed_LoadImg(UserLiveFeedobj_UserLivePos);
        UserLiveFeed_LoadImgSide();
        Sidepannel_PreloadImgs();
    }

    var UserLiveFeedobj_LiveNotificationClearId;

    function UserLiveFeedobj_LiveNotification() {
        if (UserLiveFeed_NotifyRunning || !UserLiveFeed_NotifyLiveidObject.length) {
            if (!UserLiveFeed_Notify) UserLiveFeed_NotifyLiveidObject = [];

            return;
        }

        //Reset notifications after 2 times the time it takes just in case imf load and error fail some how
        window.clearTimeout(UserLiveFeedobj_LiveNotificationClearId);
        UserLiveFeedobj_LiveNotificationClearId = window.setTimeout(function() {
            UserLiveFeed_NotifyRunning = false;
            UserLiveFeed_NotifyLiveidObject = [];
        }, ((UserLiveFeed_NotifyTimeout + 1000) * 2 * UserLiveFeed_NotifyLiveidObject.length));

        UserLiveFeed_NotifyRunning = true;
        UserLiveFeedobj_LiveNotificationShow(0);
    }

    function UserLiveFeedobj_LiveNotificationShow(position) {
        var img = document.getElementById('user_feed_notify_img');

        img.onload = function() {
            this.onload = null;
            this.onerror = null;
            UserLiveFeedobj_LiveNotificationOnload(position);
        };

        img.onerror = function() {
            this.onerror = null;
            this.onload = null;
            this.src = IMG_404_LOGO;
            UserLiveFeedobj_LiveNotificationOnload(position);
        };

        img.src = UserLiveFeed_NotifyLiveidObject[position].logo;
    }

    var UserLiveFeedobj_LiveNotificationHideId;

    function UserLiveFeedobj_LiveNotificationOnload(position) {
        Main_innerHTML('user_feed_notify_name', '<i class="icon-' + (!UserLiveFeed_NotifyLiveidObject[position].rerun ? 'circle" style="color: red;' : 'refresh" style="') + ' font-size: 75%; "></i>' + STR_SPACE + UserLiveFeed_NotifyLiveidObject[position].name);

        Main_textContent('user_feed_notify_game', UserLiveFeed_NotifyLiveidObject[position].game);
        Main_innerHTML('user_feed_notify_title', UserLiveFeed_NotifyLiveidObject[position].title);

        Main_ready(function() {
            Main_RemoveClass('user_feed_notify', 'user_feed_notify_hide');

            window.clearTimeout(UserLiveFeedobj_LiveNotificationHideId);
            UserLiveFeedobj_LiveNotificationHideId = window.setTimeout(function() {
                UserLiveFeedobj_LiveNotificationHide(position);
            }, UserLiveFeed_NotifyTimeout);
        });
    }

    var UserLiveFeedobj_LiveNotificationShowId;

    function UserLiveFeedobj_LiveNotificationHide(position) {
        Main_AddClass('user_feed_notify', 'user_feed_notify_hide');

        if (position < (UserLiveFeed_NotifyLiveidObject.length - 1)) {
            window.clearTimeout(UserLiveFeedobj_LiveNotificationShowId);
            UserLiveFeedobj_LiveNotificationShowId = window.setTimeout(function() {
                UserLiveFeedobj_LiveNotificationShow(position + 1);
            }, 800);
        } else {
            window.clearTimeout(UserLiveFeedobj_LiveNotificationClearId);
            UserLiveFeed_NotifyRunning = false;
            UserLiveFeed_NotifyLiveidObject = [];
        }
    }

    function UserLiveFeedobj_CreatSideFeed(id, data) {

        var div = document.createElement('div');
        div.setAttribute('id', UserLiveFeed_side_ids[8] + id);
        div.setAttribute(Main_DataAttribute, JSON.stringify(data));
        div.className = 'side_panel_feed';

        div.innerHTML = '<div id="' + UserLiveFeed_side_ids[0] + id +
            '" class="side_panel_div"><div id="' + UserLiveFeed_side_ids[2] + id +
            '" style="width: 100%;"><div id="' + UserLiveFeed_side_ids[3] + id +
            '" style="display: none;">' + data[1] +
            '</div><div class="side_panel_iner_div1"><img id="' + UserLiveFeed_side_ids[1] + id +
            '" class="side_panel_channel_img" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO +
            '\';"></div><div class="side_panel_iner_div2"><div id="' + UserLiveFeed_side_ids[4] + id +
            '" class="side_panel_new_title">' + Main_ReplaceLargeFont(data[1]) + '</div><div id="' +
            UserLiveFeed_side_ids[5] + id + '" class="side_panel_new_game">' + data[3] +
            '</div></div><div class="side_panel_iner_div3"><div style="text-align: center;"><i class="icon-' +
            (!data[8] ? 'circle" style="color: red;' : 'refresh" style="') +
            ' font-size: 55%; "></i><div style="font-size: 58%;">' + Main_addCommas(data[13]) + '</div></div></div></div></div></div>';

        return div;
    }

    var UserLiveFeedobj_LiveFeedOldUserName = '';

    function UserLiveFeedobj_ShowFeed() {
        Main_innerHTML('feed_end',
            STR_FEATURED + UserLiveFeedobj_BottonIcon(1) +
            (Play_data.data[3] !== '' ? Play_data.data[3] : STR_NO_GAME) + UserLiveFeedobj_BottonIcon(1) +
            STR_LIVE + UserLiveFeedobj_BottonIcon(1) +
            UserLiveFeedobj_BottonText(STR_USER + STR_SPACE + STR_LIVE) +
            UserLiveFeedobj_BottonIcon(0) + STR_USER + STR_SPACE + STR_LIVE_HOSTS);

        if (AddUser_UserIsSet()) {
            UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_UserLivePos, (UserLiveFeedobj_LiveFeedOldUserName !== AddUser_UsernameArray[0].name));
            UserLiveFeedobj_LiveFeedOldUserName = AddUser_UsernameArray[0].name;
        }
    }

    function UserLiveFeedobj_ShowFeedCheck(pos, forceRefressh) {
        if (Main_isElementShowing('scene2') && !UserLiveFeed_isFeedShow()) UserLiveFeed_Show();

        if ((!UserLiveFeed_ThumbNull(pos + '_0', UserLiveFeed_ids[0]) || forceRefressh) && !UserLiveFeed_loadingData) UserLiveFeed_StartLoad();
        else {
            Main_RemoveClass(UserLiveFeed_obj[pos].div, 'opacity_zero');
            UserLiveFeed_FeedAddFocus(true, pos);
        }
    }

    function UserLiveFeedobj_HideFeed() {
        Main_AddClass(UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].div, 'opacity_zero');
    }

    function UserLiveFeedobj_loadDataBaseLiveSuccess(responseText, pos) {

        var response = JSON.parse(responseText)[UserLiveFeed_obj[pos].StreamType],
            response_items = response.length,
            stream, id, mArray, obj_id,
            doc = document.getElementById(UserLiveFeed_obj[pos].div),
            i = 0;

        //if (response_items < Main_ItemsLimitVideo) UserLiveFeed_dataEnded = true;

        for (i; i < response_items; i++) {
            stream = UserLiveFeed_obj[pos].cell(response[i]);
            id = stream.channel._id;
            if (!UserLiveFeed_idObject[pos][id]) {

                UserLiveFeed_idObject[pos][id] = 1;
                mArray = ScreensObj_LiveCellArray(stream);

                obj_id = pos + '_' + UserLiveFeed_itemsCount[pos];
                UserLiveFeed_LoadImgPush(pos, mArray[0], obj_id);

                if (UserLiveFeed_LastPos[pos] !== null && UserLiveFeed_LastPos[pos] === stream.channel.name)
                    UserLiveFeed_FeedPosY[pos] = UserLiveFeed_itemsCount[pos];

                doc.appendChild(
                    UserLiveFeed_CreatFeed(
                        obj_id,
                        mArray
                    )
                );
                UserLiveFeed_itemsCount[pos]++;
            }
        }

        // doc.appendChild(
        //     UserLiveFeed_CreatFeed(pos + '_' + (i + 1),
        //         [
        //             IMG_404_VIDEO,
        //             "ashlynn",
        //             "title",
        //             "game",
        //             "for 1000 Viewers",
        //             "720p30 [EN]",
        //             "ashlynn",
        //             10000000000,
        //             true,
        //             IMG_404_LOGO,
        //             true,
        //             "Since 11:04:36&nbsp;",
        //             "2020-01-25T09:49:05Z",
        //             1000,
        //             35618666]
        //     )
        // );

        UserLiveFeed_loadDataSuccessFinish(false, pos);
        UserLiveFeed_LoadImg(pos);
    }

    //Live Start
    function UserLiveFeedobj_Live() {
        UserLiveFeedobj_StartDefault(UserLiveFeedobj_LivePos);
        UserLiveFeedobj_loadLive();
    }

    function UserLiveFeedobj_loadLive() {
        var theUrl = Main_kraken_api + 'streams?limit=100' + (Main_ContentLang !== "" ? ('&broadcaster_language=' + Main_ContentLang) : '') +
            Main_TwithcV5Flag;

        UserLiveFeedobj_loadErrorCallback = UserLiveFeedobj_loadLive;
        BasehttpGet(theUrl, UserLiveFeed_loadingDataTimeout, 2, null, UserLiveFeedobj_loadDataLiveSuccess, UserLiveFeedobj_loadDataError);
    }

    function UserLiveFeedobj_LiveCell(cell) {
        return cell;
    }

    function UserLiveFeedobj_loadDataLiveSuccess(responseText) {
        UserLiveFeedobj_loadDataBaseLiveSuccess(responseText, UserLiveFeedobj_LivePos);
    }

    function UserLiveFeedobj_ShowLive() {
        Main_innerHTML('feed_end',
            STR_FEATURED + UserLiveFeedobj_BottonIcon(1) +
            (Play_data.data[3] !== '' ? Play_data.data[3] : STR_NO_GAME) + UserLiveFeedobj_BottonIcon(1) +
            UserLiveFeedobj_BottonText(STR_LIVE) +
            UserLiveFeedobj_BottonIcon(0) + STR_USER + STR_SPACE + STR_LIVE +
            UserLiveFeedobj_BottonIcon(0) + STR_USER + STR_SPACE + STR_LIVE_HOSTS);

        UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_LivePos);
    }

    function UserLiveFeedobj_HideLive() {
        Main_AddClass(UserLiveFeed_obj[UserLiveFeedobj_LivePos].div, 'opacity_zero');
    }

    //Live end

    //Featured Start
    function UserLiveFeedobj_Featured() {
        UserLiveFeedobj_StartDefault(UserLiveFeedobj_FeaturedPos);
        UserLiveFeedobj_loadFeatured();
    }

    function UserLiveFeedobj_loadFeatured() {
        var theUrl = Main_kraken_api + 'streams/featured?limit=100' + (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token ? '&oauth_token=' +
            AddUser_UsernameArray[0].access_token : '') + Main_TwithcV5Flag;

        UserLiveFeedobj_loadErrorCallback = UserLiveFeedobj_loadFeatured;
        BasehttpGet(theUrl, UserLiveFeed_loadingDataTimeout, 2, null, UserLiveFeedobj_loadDataFeaturedSuccess, UserLiveFeedobj_loadDataError);
    }

    function UserLiveFeedobj_FeaturedCell(cell) {
        return cell.stream;
    }

    function UserLiveFeedobj_loadDataFeaturedSuccess(responseText) {
        UserLiveFeedobj_loadDataBaseLiveSuccess(responseText, UserLiveFeedobj_FeaturedPos);
    }

    function UserLiveFeedobj_ShowFeatured() {
        Main_innerHTML('feed_end',
            UserLiveFeedobj_BottonText(STR_FEATURED) +
            UserLiveFeedobj_BottonIcon(0) + (Play_data.data[3] !== '' ? Play_data.data[3] : STR_NO_GAME) +
            UserLiveFeedobj_BottonIcon(0) + STR_LIVE +
            UserLiveFeedobj_BottonIcon(0) + STR_USER + STR_SPACE + STR_LIVE +
            UserLiveFeedobj_BottonIcon(0) + STR_USER + STR_SPACE + STR_LIVE_HOSTS);

        UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_FeaturedPos);
    }

    function UserLiveFeedobj_HideFeatured() {
        Main_AddClass(UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].div, 'opacity_zero');
    }
    //Featured end

    //Current game Start
    function UserLiveFeedobj_CurrentGame() {
        UserLiveFeedobj_StartDefault(UserLiveFeedobj_CurrentGamePos);
        UserLiveFeedobj_loadCurrentGame();
    }

    function UserLiveFeedobj_loadCurrentGame() {
        var theUrl = Main_kraken_api + 'streams?game=' + encodeURIComponent(Play_data.data[3]) +
            '&limit=100' + (Main_ContentLang !== "" ? ('&broadcaster_language=' + Main_ContentLang) : '') + Main_TwithcV5Flag;

        UserLiveFeedobj_loadErrorCallback = UserLiveFeedobj_loadCurrentGame;
        BasehttpGet(theUrl, UserLiveFeed_loadingDataTimeout, 2, null, UserLiveFeedobj_loadDataCurrentGameSuccess, UserLiveFeedobj_loadDataError);
    }

    function UserLiveFeedobj_CurrentGameCell(cell) {
        return cell;
    }

    function UserLiveFeedobj_loadDataCurrentGameSuccess(responseText) {
        UserLiveFeedobj_loadDataBaseLiveSuccess(responseText, UserLiveFeedobj_CurrentGamePos);
    }

    var UserLiveFeedobj_CurrentGameName = '';

    function UserLiveFeedobj_ShowCurrentGame() {
        Main_innerHTML('feed_end',
            STR_FEATURED + UserLiveFeedobj_BottonIcon(1) +
            UserLiveFeedobj_BottonText(Play_data.data[3] !== '' ? Play_data.data[3] : STR_NO_GAME) +
            UserLiveFeedobj_BottonIcon(0) + STR_LIVE +
            UserLiveFeedobj_BottonIcon(0) + STR_USER + STR_SPACE + STR_LIVE +
            UserLiveFeedobj_BottonIcon(0) + STR_USER + STR_SPACE + STR_LIVE_HOSTS);

        UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_CurrentGamePos, (UserLiveFeedobj_CurrentGameName !== Play_data.data[3]));
        UserLiveFeedobj_CurrentGameName = Play_data.data[3];
    }

    function UserLiveFeedobj_HideCurrentGame() {
        Main_AddClass(UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].div, 'opacity_zero');
    }
    //Current game end

    //User Host Start
    function UserLiveFeedobj_UserHost() {
        UserLiveFeedobj_StartDefault(UserLiveFeedobj_UserHostPos);
        UserLiveFeedobj_loadUserHost();
    }

    function UserLiveFeedobj_loadUserHost() {
        var theUrl = 'https://api.twitch.tv/api/users/' + encodeURIComponent(AddUser_UsernameArray[0].name) +
            '/followed/hosting?limit=100';

        UserLiveFeedobj_loadErrorCallback = UserLiveFeedobj_loadUserHost;
        BasehttpHlsGet(theUrl, UserLiveFeed_loadingDataTimeout, 2, null, UserLiveFeedobj_loadDataUserHostSuccess, UserLiveFeedobj_loadDataError);
    }

    function UserLiveFeedobj_loadDataUserHostSuccess(responseText) {
        var response = JSON.parse(responseText).hosts,
            response_items = response.length,
            stream, id, obj_id,
            doc = document.getElementById(UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].div),
            i = 0;

        //if (response_items < Main_ItemsLimitVideo) UserLiveFeed_dataEnded = true;

        for (i; i < response_items; i++) {
            stream = response[i];
            id = stream.target._id + '' + stream._id;

            if (!UserLiveFeed_idObject[UserLiveFeedobj_UserHostPos][id]) {

                UserLiveFeed_idObject[UserLiveFeedobj_UserHostPos][id] = 1;

                if (UserLiveFeed_LastPos[UserLiveFeedobj_UserHostPos] !== null && UserLiveFeed_LastPos[UserLiveFeedobj_UserHostPos] === stream.target.channel.name)
                    UserLiveFeed_FeedPosY[UserLiveFeedobj_UserHostPos] = UserLiveFeed_itemsCount[UserLiveFeedobj_UserHostPos];

                obj_id = UserLiveFeedobj_UserHostPos + '_' + UserLiveFeed_itemsCount[UserLiveFeedobj_UserHostPos];
                UserLiveFeed_LoadImgPush(UserLiveFeedobj_UserHostPos, stream.target.preview_urls.template, obj_id);

                doc.appendChild(
                    UserLiveFeed_CreatFeed(
                        obj_id,
                        [
                            stream.target.preview_urls.template, //0
                            stream.display_name + STR_USER_HOSTING + stream.target.channel.display_name, //1
                            stream.target.title, //2
                            stream.target.meta_game, //3
                            STR_FOR.charAt(0).toUpperCase() + STR_FOR.slice(1) +
                            Main_addCommas(stream.target.viewers) + STR_SPACE + STR_VIEWER, //4
                            '', //5 quality
                            stream.target.channel.name, //6
                            '', //7 broadcast id
                            false, //8
                            stream.target.channel.logo, //9
                            '', //10 partner
                            '', //11 stream creat at string
                            '', //12 stream creat at
                            stream.target.viewers, //13
                            stream.target._id //14
                        ]
                    )
                );
                UserLiveFeed_itemsCount[UserLiveFeedobj_UserHostPos]++;
            }
        }

        UserLiveFeed_loadDataSuccessFinish(false, UserLiveFeedobj_UserHostPos);
        UserLiveFeed_LoadImg(UserLiveFeedobj_UserHostPos);
    }

    var UserLiveFeedobj_HostFeedOldUserName = '';

    function UserLiveFeedobj_ShowUserHost() {
        Main_innerHTML('feed_end',
            STR_FEATURED + UserLiveFeedobj_BottonIcon(1) +
            (Play_data.data[3] !== '' ? Play_data.data[3] : STR_NO_GAME) + UserLiveFeedobj_BottonIcon(1) +
            STR_LIVE + UserLiveFeedobj_BottonIcon(1) +
            STR_USER + STR_SPACE + STR_LIVE + UserLiveFeedobj_BottonIcon(1) +
            UserLiveFeedobj_BottonText(STR_USER + STR_SPACE + STR_LIVE_HOSTS));

        if (AddUser_UserIsSet()) {
            UserLiveFeedobj_ShowFeedCheck(UserLiveFeedobj_UserHostPos, (UserLiveFeedobj_HostFeedOldUserName !== AddUser_UsernameArray[0].name));
            UserLiveFeedobj_HostFeedOldUserName = AddUser_UsernameArray[0].name;
        }
    }

    function UserLiveFeedobj_HideUserHost() {
        Main_AddClass(UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].div, 'opacity_zero');
    }
    //User Host end


    function UserLiveFeedobj_BottonIcon(up) {
        return STR_SPACE + '<i  class="icon-' + (up ? 'key-up' : 'key-down') +
            ' class_bold strokicon" style="vertical-align: middle; color:' + (up ? '#FED000' : 'red') + ';"></i>' + STR_SPACE;
    }

    function UserLiveFeedobj_BottonText(text) {
        return '<span style="font-size: 150%; font-family: \'Roboto-Bold\'; color:#00a94b;">' + text + '</span>';
    }
    //Variable initialization
    var Users_cursorY = 0;
    var Users_cursorX = 0;
    var Users_ColoumnsCount = 8;
    var Users_RemoveCursor = 0;
    var Users_RemoveDialogID = null;
    var Users_beforeUser = 1;
    var Users_UserDialogID = null;
    var Users_Isautentication = true;
    var Users_ShowAutetication = false;
    var Users_Userlastadded = '';

    var Users_ids = ['u_thumbdiv', 'u_img', 'u_infodiv', 'u_displayname', 'u_cell', 'user_scroll'];
    var Users_status = false;
    var Users_loadingData = true;
    //Variable initialization end

    function Users_init() {
        if (Main_newUsercode) {
            Main_HideElement('topbar');
            Main_HideElement('side_panel_new_holder');
            Main_ready(function() {
                Users_exit();
                AddCode_CheckNewCode(Main_newUsercode);
            });
            return;
        } else if (!AddUser_IsUserSet()) {
            Main_values.Main_Go = Main_Live;
            Users_exit();
            Main_SwitchScreen();
            return;
        }

        if (Main_values.Main_Before !== Main_Users) Users_beforeUser = Main_values.Main_Before;
        Main_IconLoad('label_side_panel', 'icon-arrow-left', STR_GOBACK);
        Main_IconLoad('label_refresh', 'icon-user', STR_USER_TOP_LABLE);

        Main_values.Main_Go = Main_Users;
        Main_HideWarningDialog();
        ScreensObj_SetTopLable(STR_USER, STR_MAIN_USER + " " + AddUser_UsernameArray[0].display_name);
        document.body.addEventListener("keydown", Users_handleKeyDown, false);
        if (Users_status) {
            Main_YRst(Users_cursorY);
            Main_ShowElement(Users_ids[5]);
            Users_addFocus();
            Main_SaveValues();
        } else Users_StartLoad();
    }

    function Users_exit() {
        Main_IconLoad('label_side_panel', 'icon-arrow-right', STR_THUMB_OPTIONS_TOP);
        document.body.removeEventListener("keydown", Users_handleKeyDown);
        Main_HideElement(Users_ids[5]);
        Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);
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
        Main_CounterDialogRst();
        Main_ready(function() {
            Users_loadData();
        });
    }

    function Users_loadData() {
        var row = document.createElement('div');
        var doc = document.getElementById('stream_table_user');
        var x = 1; // 1 as first is used by add user
        var y = 0;

        var div = document.createElement('div');

        div.setAttribute('id', Users_ids[4] + '0_0');
        div.classList.add('stream_thumbnail_user_icon_holder');

        div.innerHTML = '<div id="' + Users_ids[0] + '0_0' +
            '" class="stream_thumbnail_user" ><div class="stream_thumbnail_channel_img"></div>' +
            '<div  class="stream_thumbnail_user_text_holder">' +
            '<div class="stream_info_user_name">' + STR_USER_ADD +
            '</div><div style="color:#FFFFFF;font-size: 17vh; text-align: center; transform: translateY(-24.5vh);"><i class="icon-user-plus" ></i></div></div></div>';

        row.appendChild(div);

        for (var user = 0; user < AddUser_UsernameArray.length; user++) {

            row.appendChild(Users_createCell(y + '_' + x, user));
            x++;
            if (x > 5) {
                doc.appendChild(row);
                row = document.createElement('div');
                y++;
                x = 0;
            }
        }

        if (x <= 5) doc.appendChild(row);

        Users_loadDataSuccessFinish();
    }


    function Users_createCell(id, pos) {
        var div = document.createElement('div');

        div.setAttribute('id', Users_ids[4] + id);
        div.setAttribute(Main_DataAttribute, pos);
        div.classList.add('stream_thumbnail_user_icon_holder');

        div.innerHTML = '<div id="' + Users_ids[0] + id +
            '" class="stream_thumbnail_user" ><div class="stream_thumbnail_channel_img"><img id="' + Users_ids[1] +
            id + '" alt="" class="stream_img" src="' + AddUser_UsernameArray[pos].logo +
            '" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\';"></div>' +
            '<div  class="stream_thumbnail_user_text_holder">' +
            '<div class="stream_info_user_name">' + AddUser_UsernameArray[pos].display_name +
            '</div><div class="stream_info_user_title">' +
            (AddUser_UsernameArray[pos].access_token ? STR_USER_CODE_OK : STR_USER_CODE) +
            '</div></div></div>';

        return div;
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
            if (Users_ShowAutetication) {
                Users_ShowAutetication = false;
                Users_showUserDialogPos = AddUser_UserFindpos(Users_Userlastadded);
                Users_Isautentication = true;
                Users_showRemoveDialog();
            }
        });
    }

    function Users_addFocus(forceScroll) {
        Main_AddClass(Users_ids[0] + Users_cursorY + '_' + Users_cursorX, Main_classThumb);

        Main_CounterDialog(Users_cursorX, Users_cursorY, Main_ColoumnsCountChannel, AddUser_UsernameArray.length + 1);

        if (Main_YchangeAddFocus(Users_cursorY) || forceScroll) {

            if (Users_cursorY > 1) {

                if (Main_ThumbNull((Users_cursorY + 1), 0, Users_ids[0]))
                    Main_ScrollTableCalc(Users_ids[5], (document.getElementById(Users_ids[4] + Users_cursorY + '_' + Users_cursorX).offsetTop * -1), 39);
            } else Main_ScrollTable(Users_ids[5], 0);

        } else Main_handleKeyUp();
    }

    function Users_removeFocus() {
        Main_addFocusFinish = false;
        Main_RemoveClass(Users_ids[0] + Users_cursorY + '_' + Users_cursorX, Main_classThumb);
    }

    //TODO add a temp user for when going back and for from user to games or etc
    function Users_keyEnter() {
        if (!Users_cursorX && !Users_cursorY) {
            Main_values.Main_Before = Main_values.Main_Go;
            Main_HideElement(Users_ids[5]);
            document.body.removeEventListener("keydown", Users_handleKeyDown);
            AddUser_init();
        } else Users_showUserDialog();
    }

    function Users_clearUserDialog() {
        window.clearTimeout(Users_UserDialogID);
    }

    function Users_setUserDialog() {
        Users_UserDialogID = window.setTimeout(Users_HideUserDialog, 20000);
    }

    var Users_showUserDialogPos = 0;

    function Users_showUserDialog() {
        Users_RemoveCursor = 0;
        Users_setUserDialog();
        Users_showUserDialogPos = parseInt(document.getElementById(Users_ids[4] + Users_cursorY + '_' + Users_cursorX).getAttribute(Main_DataAttribute));

        Main_innerHTML("main_dialog_user_text", STR_USER_OPTION + " " + AddUser_UsernameArray[Users_showUserDialogPos].display_name);
        Main_innerHTML("main_dialog_user_key", (AddUser_UsernameArray[Users_showUserDialogPos].access_token ? STR_USER_CODE_OK : STR_USER_CODE));

        Main_ShowElement('main_dialog_user');
    }

    function Users_HideUserDialog() {
        Users_clearUserDialog();
        Main_HideElement('main_dialog_user');
        Users_RemoveCursor = 0;
        Users_UserCursorSet();
    }

    function Users_isUserDialogShown() {
        return Main_isElementShowing('main_dialog_user');
    }

    function Users_UserCursorSet() {
        Main_RemoveClass('main_dialog_user_first', 'button_dialog_focused');
        Main_RemoveClass('main_dialog_user_key', 'button_dialog_focused');
        Main_RemoveClass('main_dialog_user_remove', 'button_dialog_focused');

        if (!Users_RemoveCursor) Main_AddClass('main_dialog_user_first', 'button_dialog_focused');
        else if (Users_RemoveCursor === 1) Main_AddClass('main_dialog_user_key', 'button_dialog_focused');
        else if (Users_RemoveCursor) Main_AddClass('main_dialog_user_remove', 'button_dialog_focused');
    }

    function Users_clearRemoveDialog() {
        window.clearTimeout(Users_RemoveDialogID);
    }

    function Users_setRemoveDialog() {
        Users_RemoveDialogID = window.setTimeout(Users_HideRemoveDialog, 30000);
    }

    function Users_showRemoveDialog() {
        Users_setRemoveDialog();
        if (!Users_Isautentication) Main_innerHTML("main_dialog_remove", STR_REMOVE_USER + STR_BR + AddUser_UsernameArray[Users_showUserDialogPos].name + '?');
        else Main_innerHTML("main_dialog_remove", STR_OAUTH_IN + ' ' + AddUser_UsernameArray[Users_showUserDialogPos].name + '?');
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
            Main_AddClass('remove_cancel', 'button_dialog_focused');
            Main_RemoveClass('remove_yes', 'button_dialog_focused');
        } else {
            Main_RemoveClass('remove_cancel', 'button_dialog_focused');
            Main_AddClass('remove_yes', 'button_dialog_focused');
        }
    }

    function Users_handleKeyDown(event) {
        if (Main_FirstLoad || Main_CantClick()) return;
        else Main_keyClickDelayStart();

        var i;

        switch (event.keyCode) {
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                if (Users_isRemoveDialogShown()) Users_HideRemoveDialog();
                else if (Users_isUserDialogShown()) Users_HideUserDialog();
                else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
                else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
                else {
                    Users_exit();
                    Sidepannel_RemoveFocusMain();
                    Main_values.Main_Go = Users_beforeUser;
                    Sidepannel_SetTopOpacity(Main_values.Main_Go);
                    Main_SwitchScreenAction();
                }
                break;
            case KEY_LEFT:
                if (Users_isRemoveDialogShown()) {
                    Users_RemoveCursor--;
                    if (Users_RemoveCursor < 0) Users_RemoveCursor = 1;
                    Users_RemoveCursorSet();
                    Users_clearRemoveDialog();
                    Users_setRemoveDialog();
                } else if (Users_isUserDialogShown()) {
                    Users_RemoveCursor--;
                    if (Users_RemoveCursor < 0) Users_RemoveCursor = 2;
                    Users_UserCursorSet();
                    Users_clearUserDialog();
                    Users_setUserDialog();
                } else if (!Users_cursorX) {
                    Users_removeFocus();
                    Sidepannel_Start(Users_handleKeyDown);
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
                } else if (Users_isUserDialogShown()) {
                    Users_RemoveCursor++;
                    if (Users_RemoveCursor > 2) Users_RemoveCursor = 0;
                    Users_UserCursorSet();
                    Users_clearUserDialog();
                    Users_setUserDialog();
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
                if (Users_isRemoveDialogShown() || Users_isUserDialogShown()) break;
                if (Users_cursorY) {
                    for (i = 0; i < Users_ColoumnsCount; i++) {
                        if (Main_ThumbNull((Users_cursorY - 1), (Users_cursorX - i), Users_ids[0])) {
                            Users_removeFocus();
                            Users_cursorY--;
                            Users_cursorX = Users_cursorX - i;
                            Users_addFocus();
                            break;
                        }
                    }
                }
                break;
            case KEY_DOWN:
                if (Users_isRemoveDialogShown() || Users_isUserDialogShown()) break;
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
            case KEY_KEYBOARD_SPACE:
            case KEY_ENTER:
                // HideRemoveDialog set Users_RemoveCursor to 0, is better to hide befor remove, use temp var
                var temp_RemoveCursor = Users_RemoveCursor;
                if (Users_isRemoveDialogShown()) {
                    Users_HideRemoveDialog();
                    if (!Users_Isautentication) {
                        if (temp_RemoveCursor) {
                            document.body.removeEventListener("keydown", Users_handleKeyDown);
                            Users_exit();
                            AddUser_removeUser(Users_showUserDialogPos);
                        }
                    } else {
                        if (temp_RemoveCursor) {
                            Main_values.Users_AddcodePosition = Users_showUserDialogPos;
                            Main_SaveValues();
                            var baseUrlCode = 'https://id.twitch.tv/oauth2/authorize?';
                            var type_code = 'code';
                            var client_id = Main_clientId;
                            var redirect_uri = AddCode_redirect_uri;
                            var scope = 'user_read+user_follows_edit+user_subscriptions';
                            var force_verify = 'true';
                            var url = baseUrlCode + 'response_type=' + type_code + '&client_id=' +
                                encodeURIComponent(client_id) + '&redirect_uri=' + redirect_uri + '&scope=' + scope +
                                '&force_verify=' + force_verify;
                            window.location = url;
                        }
                    }
                } else if (Users_isUserDialogShown()) {
                    Users_HideUserDialog();
                    if (!temp_RemoveCursor) {
                        AddUser_UserMakeOne(Users_showUserDialogPos);
                    } else if (temp_RemoveCursor === 1) {
                        if (AddUser_UsernameArray[Users_showUserDialogPos].access_token) {
                            Main_showWarningDialog(STR_USER_CODE_OK);
                            window.setTimeout(Main_HideWarningDialog, 1500);
                        } else {
                            Users_Isautentication = true;
                            Users_showRemoveDialog();
                        }
                    } else {
                        Users_Isautentication = false;
                        Users_showRemoveDialog();
                    }
                } else Users_keyEnter();
                break;
            case KEY_REFRESH:
                Main_ReloadScreen();
                break;
            case KEY_CHAT:
                Users_removeFocus();
                Sidepannel_Start(Users_handleKeyDown, AddUser_UserIsSet());
                if (!AddUser_UserIsSet()) {
                    Main_showWarningDialog(STR_NOKUSER_WARN);
                    window.setTimeout(Main_HideWarningDialog, 2000);
                }
                break;
            default:
                break;
        }
    }
    //Spacing for reease maker not trow erros frm jshint
    window.parseIRC = function(data) {
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
                var pair = rawTags[i].split('=');
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
    }; // The bellow are some function or adptations of function from
    // https://www.nightdev.com/kapchat/
    function extraEmoticonize(message, emote) {
        return message.replace(emote.code, extraEmoteTemplate(emote));
    }

    function extraEmoteTemplate(emote) {
        return '<img class="emoticon" alt="" src="' + emote['4x'] + '"/>';
    }

    function emoteURL(id) {
        return 'https://static-cdn.jtvnw.net/emoticons/v1/' + id + '/3.0'; //emotes 3.0 === 4.0
    }

    function emoteTemplate(url) {
        return '<img class="emoticon" alt="" src="' + url + '"/>';
    }

    function mescape(message) {
        return message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function extraMessageTokenize(message, chat_number, bits) {
        var tokenizedString = message.split(' '),
            emote,
            cheer;

        for (var i = 0; i < tokenizedString.length; i++) {
            message = tokenizedString[i];

            cheer = bits ? findCheerInToken(message, chat_number) : 0;

            if (cheer) {
                tokenizedString[i] = emoteTemplate(cheer);
                continue;
            }

            emote = extraEmotes[message.replace(/(^[~!@#$%\^&\*\(\)]+|[~!@#$%\^&\*\(\)]+$)/g, '')] || extraEmotes[message];

            tokenizedString[i] = emote ? extraEmoticonize(message, emote) : mescape(message);
        }

        return tokenizedString.join(' ') + (bits ? (' ' + bits + ' bits') : '');
    }

    function calculateColorReplacement(color) {
        // Modified from http://www.sitepoint.com/javascript-generate-lighter-darker-color/
        var rgb = "#",
            brightness = "0.5",
            c, i;

        if (color === '#000000') return "#2cffa2"; //Black can't be see on a black background

        color = String(color).replace(/[^0-9a-f]/gi, '');
        if (color.length < 6) {
            color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
        }

        for (i = 0; i < 3; i++) {
            c = parseInt(color.substr(i * 2, 2), 16);
            if (c < 10) c = 10;
            c = Math.round(Math.min(Math.max(0, c + (c * brightness)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }

        return rgb;
    }

    function findCheerInToken(message, chat_number) {
        var cheerPrefixes = Object.keys(cheers[ChatLive_selectedChannel_id[chat_number]]),
            tokenLower = message.toLowerCase(),
            index = -1;


        for (var i = 0; i < cheerPrefixes.length; i++) {
            //Try  case sensitive first as some prefixes start the same, but some users type without carrying about case
            if (message.startsWith(cheerPrefixes[i]))
                return getCheer(cheerPrefixes[i], parseInt(message.substr(cheerPrefixes[i].length), 10), chat_number);

            //Try  case insensitive after
            if (tokenLower.startsWith(cheerPrefixes[i].toLowerCase())) index = i;
        }

        return ((index > -1) ?
            getCheer(cheerPrefixes[index], parseInt(tokenLower.substr(cheerPrefixes[index].toLowerCase().length), 10), chat_number) :
            null);
    }

    function getCheer(prefix, amount, chat_number) {
        var amounts = cheers[ChatLive_selectedChannel_id[chat_number]][prefix],
            amountsArray = Object.keys(amounts),
            length = amountsArray.length;

        //Run on reverse order to catch the correct position amountsArray = 1000, 500, 100, 1 ... amount = 250
        while (length--) {
            if (amount >= amountsArray[length]) return amounts[amountsArray[length]];
        }

        //Fail safe
        return amounts[amountsArray[0]];
    }

    function emoticonize(message, emotes) {
        if (!emotes) return [message];

        var tokenizedMessage = [],
            emotesList = Object.keys(emotes),
            replacements = [],
            emote, i;

        emotesList.forEach(function(id) {
            emote = emotes[id];

            for (i = emote.length - 1; i >= 0; i--) {
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
            tokenizedMessage.unshift([emoteTemplate(emoteURL(replacement.id))]);

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
    } /*! https://mths.be/punycode v1.4.1 by @mathias */

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

    }(this)); // https://github.com/joewalnes/reconnecting-websocket/

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
                maxReconnectAttempts: 50,

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

            eventTarget.addEventListener('open',
                function(event) {
                    self.onopen(event);
                }
            );
            eventTarget.addEventListener('close',
                function(event) {
                    self.onclose(event);
                }
            );
            eventTarget.addEventListener('connecting',
                function(event) {
                    self.onconnecting(event);
                }
            );
            eventTarget.addEventListener('message',
                function(event) {
                    self.onmessage(event);
                }
            );
            eventTarget.addEventListener('error',
                function(event) {
                    self.onerror(event);
                });
            eventTarget.addEventListener('maxAttemptsExceed',
                function(event) {
                    self.onmaxattemptsexceed(event);
                }
            );


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
                if (reconnectAttempt && this.reconnectAttempts > this.maxReconnectAttempts) {
                    return;
                }

                ws = new WebSocket(self.url, protocols || []);
                ws.binaryType = this.binaryType;

                if (!reconnectAttempt) {
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
        /** An event listener to be called when connecting attempts exceeded */
        ReconnectingWebSocket.prototype.onmaxattemptsexceed = function() {};

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
    }); // https://github.com/twitter/twemoji

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
            re = /(?:\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d])|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5\udeeb\udeec\udef4-\udefa\udfe0-\udfeb]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd71\udd73-\udd76\udd7a-\udda2\udda5-\uddaa\uddae-\uddb4\uddb7\uddba\uddbc-\uddca\uddd0\uddde-\uddff\ude70-\ude73\ude78-\ude7a\ude80-\ude82\ude90-\ude95]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g,

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
            if (!str) return;
            if (!dontremove) str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            //Replace line break
            str = str.replace(/(\r\n|\n|\r)/gm, "");
            return replace(str, function(rawText) {
                var iconId = grabTheRightIcon(rawText);

                return iconId ? '<img class="' + (emoticon ? 'emoticon' : 'emoji') + '" alt="" src="https://twemoji.maxcdn.com/2/72x72/' + iconId + '.png"/>' : rawText;
            });
        }

        function replace(text, callback) {
            return String(text).replace(re, callback);
        }

    }());
    /**
     * Define the public API
     * and all function need to be called outiside the API
     * smartTwitchTV + all functions called by java
     */
    smartTwitchTV = { // smartTwitchTV var is defined in app/specific/Main.js
        'mainstart': Main_Start, //Main_Start id Main_Start() func from app/specific/Main.js
        'Play_PannelEndStart': Play_PannelEndStart, //Play_PannelEndStart() func from app/specific/Play.js
        'Play_CheckResume': Play_CheckResume, //Play_CheckResume() func from app/specific/Play.js
        'Play_PlayerCheck': Play_PlayerCheck, //Play_PlayerCheck() func from app/specific/Play.js
        'Play_UpdateDuration': Play_UpdateDuration, //Play_UpdateDuration() func from app/specific/Play.js
        'Play_CheckResumeForced': Play_CheckResumeForced, //Play_CheckResumeForced() func from app/specific/Play.js
        'PlayExtra_End': PlayExtra_End, //PlayExtra_End() func from app/specific/PlayExtra.js
        'Play_MultiEnd': Play_MultiEnd // Play_MultiEndede() func from app/specific/Play.js
    };

    /** Expose `smartTwitchTV` */
    root.smartTwitchTV = smartTwitchTV;
}(this));

smartTwitchTV.mainstart();