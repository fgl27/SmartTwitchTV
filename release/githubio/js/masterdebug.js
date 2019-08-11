/* jshint undef: true, unused: true, node: true, browser: true */
/*globals Android, ReconnectingWebSocket, punycode, LazyLoad */
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
var STR_CONTENT_LANG_SUMARRY;
var STR_LANG_ALL;
var STR_NO_GAME;
var STR_ABOUT_INFO_2_SOURCE;
var STR_JUMP_BUFFER_WARNING;
var STR_CHAT_DISABLE;
var STR_CLIP_FAIL;
var STR_F_DISABLE_CHAT;
var STR_CHAT_BRIGHTNESS;
var STR_GOBACK_START;
var STR_TWICE;
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
var STR_CHAT;
var STR_CHAT_SIDE_FULL;
var STR_CHAT_SIDE;
var STR_SPEED;
var STR_QUALITY;
var STR_CHAT_VIDEO_MODE;
var STR_NORMAL;
var STR_AUTO;
var STR_DEF_QUALITY;
var STR_DEF_QUALITY_SUMARRY;
var STR_VERY_LOW;
var STR_LOW;
var STR_HIGH;
var STR_VERY_HIGH;
var STR_THUMB_RESOLUTION;
var STR_THUMB_RESOLUTION_SUMARRY;
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
var STR_PLAYER_BITRATE_SUMARRY;
var STR_PLAYER_BITRATE_MAIN;
var STR_PLAYER_BITRATE_SMALL;
var STR_PLAYER_BITRATE_SMALL_SUMARRY;
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
var STR_KEEP_INFO_VISIBLE;// Bellow here are the all untranslatable string,they are a combination of strings and html code use by pats of the code
var STR_ABOUT_EMAIL = "fglfgl27@gmail.com";
var STR_BR = "<br>";
var STR_DOT = '<i  class="icon-circle class_bold" style="font-size: 50%; vertical-align: middle;"></i>' + "  ";
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
    STR_GOBACK = STR_GOBACK_START + STR_TWICE;
    STR_PAYPAL = '<div style="vertical-align: middle;"><img style="vertical-align: middle; display: inline-block; width: 4%;" alt="" src="https://fgl27.github.io/SmartTwitchTV/release/githubio/images/paypal.png"><div style="vertical-align: middle; display: inline-block;">' + STR_PAYPAL_SUMMARY + '</div></div>';

    STR_CONTROLS_PLAY_0 = STR_DIV_TITLE + STR_PLAYER + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_CONTROLS_PLAY_4 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_1 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_2 + STR_BR + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_CONTROLS_PLAY_3 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_5 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_6 + STR_BR + STR_BR +

        STR_DIV_TITLE + STR_PICTURE_PICTURE + '</div>' + STR_BR +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_PICTURE_CONTROLS1 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS2 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS3 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS4 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS5 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS6 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS7 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS8 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS9 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS10 + STR_BR +

        STR_DIV_TITLE + STR_CHAT + ':</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_CONTROLS_PLAY_7 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_8 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_9 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_10 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_11;

    STR_CONTROLS_MAIN_0 = STR_DIV_TITLE + STR_CONTROLS + '</div>' +
        STR_DIV_TITLE + STR_GENERAL + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_SIDE_PANEL + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_2 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_3 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_4 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_5 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_6 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_10 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_14 + STR_BR + '</div>' +
        STR_CONTROLS_PLAY_0 + STR_BR +
        STR_DIV_TITLE + STR_CLOSE_THIS + '</div>';

    STR_ABOUT_INFO_HEADER = STR_DIV_TITLE + STR_TWITCH_TV + '</div></div>';
    STR_ABOUT_INFO_0 = STR_DIV_MIDLE_LEFT + STR_BR + STR_ABOUT_INFO_1 + STR_BR +
        (Main_IsNotBrowser ? '' : STR_BR + '<div class="class_bold" style="display: inline-block; color: #FF0000; font-size: 110%;">' + STR_ABOUT_INFO_2_SOURCE + '</div>') + '</div>' +
        STR_BR +
        STR_DIV_TITLE + STR_ABOUT_INFO_3 + '</div>' +
        STR_ABOUT_EMAIL + STR_BR +
        STR_PAYPAL +
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
        STR_DOT + STR_OAUTH_EXPLAIN2.replace('link_link', '<div class="class_bold" style="display: inline-block; color: #FF0000; font-size: 110%;">http://tiny.cc/twitchkeycode</div>') + STR_BR +
        STR_DOT + STR_OAUTH_EXPLAIN3 + STR_BR +
        STR_DOT + STR_OAUTH_EXPLAIN4 + STR_BR +
        STR_DOT + STR_OAUTH_EXPLAIN5 + STR_BR +
        STR_DOT + STR_OAUTH_EXPLAIN6;
}//Spacing for reease maker not trow erros frm jshint
var IMG_404_GAME = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeEAAAKgCAMAAACbeDVoAAAAM1BMVEU3NTZoZ2eura6enp4+PD1MS0vq6en09PQ0MjPy8vJ9fX1YV1jT09O7u7vf3t+NjY3GxsZnLAeWAAAI3UlEQVR4Ae3d7XabOrcGUPEBWguMzf1f7dltd3u6Q1rHNk5I3jn/NmPYo48lJC1JFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgf0+UoenatpuGEuUdRD8009S806cR/eWU9bs8d0M8/eOmZazfjcvUR3kuYmiz/m6Z46n5dmP9zdjJ+Ln6NusLuQ7labqxvpBdX3iaaayv6cpTxJT1FTlF4Sn6Jeur8vSErjqGP37c0hf2F/Op/tHY7d+Az/WPznMUdhbNWP8iT0M8rb/YGvXUT34Eb2VO8ayf01bmJQo7ikvWq9a+7KStV2UX5X0JuOZOfed8zvoGIn72tGUrs91xDizijx9kbWQ9NVEeMpzq1nOf/Mxjfbts+/KALuuWEfVz9ed6ixzvb8bzueZNHzUXHneut7pvbhzDmvVG2RceFEvWm41dH/dUkW6VeSo8Ji51a/+Mo+/O9S5tFB4xZ73TeMPugG37NaA+4ChrI5emRLkmytxmzXovo61HxFIfktldqwIN3Vgfcyrc7ZL1UTkuTf+Hptw3y5h1490exQxj3cV4Wi7N0JcSP5TSD81lOY1Zsz4ssyncJc51T3k+reuyLOt6OmfdUY594R6Xenz66QcMWT+NptyMONWjOa/rWF917gt3FP0P5dSU+Ec/nfXTu+jHeiCZXfkhonRp3eNx0dYjyUtc6V5OhZs0WQ8k27i2Uy8vhR2KwvPwU31Hm4FUPz5WKia6+rooP9V3tN0529WNXKLwVn0eKuE6lxeaupVD4a26eqyE+/JCX1+hEb/ZkMdKOMvGIytbxFIP1obLS/0jlWLmerSEh/LCUF81Fd5iPVzC09vKXnkuvEGTh0t4jfJfp7px/7KHmtLHJ5xTbE7K3VtjosnjJVzHeXOQ6s5GTJzrARPOcX7bSbksV9DkEROuWf89RBF9d9ugbMtT+BAJ5zLN8zytWX8a10vTXNYx679y/f4nS9bfjIW/mushEs5liJ8HEutPmfV3668/WVIjfqtYDpHw+HvBv71ab4ou6095KvzFkEdI+L9XKcWa1/YERJdWp9+mqx+e8HaBoz9fX71alZjepB/vr9UMzysHT3Wj+fP4IefyNrZ25AclfIrNGdfrC9CnO3bW2p01f0zCXVwd/7Xxlx/n2BfettrxQW14ur61tysvTfX/Xcp1VjuOlHC5MeExypuYKs3l7fqh7uUS19vwJsOLA8XXtXmMNryd7pyuFoxj2f4zL0TWeoix9Nhf61wyh7/u/82+bNHUbz5+LL3ppmO5etYwLvdUmCxJN/FS+SVemutuxuFaQTPHpvwm5nE7peb6BtWPWLXcbsYZ8uqvYDhf3Z1ZmI6TcNZxjmtbErKJ8kM0eX08TqwfmPBWLnOJiL5Zs/4ynk5j/SXX739S5iWvr3wSQx4q4Zp5/nEtU9YfzlMf/xgu5/pDfr/YYz1n3VJ+2Jrqxye8kb9fPR/lu+iXvH1xm1iPk/CVwCLadNvlzYbcM+Fc2hfW+kKu2z/4syVu+jluTxMz1V0Tvj4Xy/6GBZOxv/3Cza6waRX7JRx7Jrx9qEZ74z4C+nHPhHOTcDyW8PaWhxsXxmjy0G24Ly/0N5aZWeqR2/D1Wx6uHCYmxnroNnzXInoWfhny2G346i0PV5a1mPLYbXgqL0w3nZwg1vrMNvx4wpt9PetN+66JrDu34aF/Yd72of1/NPUvsrlr6F/4IYb6Vs0v9V2dh/983/G20zE09e3yu5r1fY3DHS8JuhR+6Orh5TiV76JMY972ChfiXD+DU9cMQ9Odsr7VGIVv+vo55J132jLXr2oufDPVr+pS2J4L//QMtTbW+lWdCt+M9avKvhRiqF/XUEphrl9XU9gczDSY/nLa+nW1UYilfl1rFGKt9UtPlzjXr+tcCv1Yv66xL1sODu8sx7W7TM089P8opfT/GOZmmrr1/PTPHgpzfZpx7aa5j3+UiPJClBIR/Tx161ifZi409Rny1E7Dt1yv+pb/MLWntOTxaRLO8/It3XKDiOib5Qmd9lSY6q5yXOYSJcqt+hJlbsfcO2EudUfZzVEeEXOXdUddoat7ybUpUR4TJUqz5AETlvDYDVH2EUM31n20hbbu4dz1UfYSEf3lvFPCtHu+4mxHfZsS3kO09WFjE2V/0YyHSFgbzqU8y5Ifn7C9tOMU5VliGo2lP3o+fJ6jPNF8so3nY9e01r48U5R+sab1gQnnUp5vyY9KWPUw2yhPF9FmvVc2haHeK7so7yEuWe81FPp8/EXfTxZT1rtk9qVwrnfJKUo5esTnUojT429yf747Iz5FIZYjBrxxyXtfoUh3xEHWRnR555IWzSED3ojORrw7DZ/kwFe0d06WGOuNloPec74xFu4Zap368iGiPxlovcMR8Rz78lH6MVWWbhfz5zkKNIzPPtPiQTw25SM1o8fwkwepl/jgR0rePuSn+UT/adGaDT/xLQB5+kzr6Fn4qf1MR+r7USf9rPct5fClv60KYk6f6vVQ5yj80uRn6vWiS1u0bhTr57qbalX8378Rj0M5jmHUhHcvPzRRDqRRdLhRXGsVXXym41bbHoeYPtkFkaf6N1MUXloP1yTufxSvha1+PPRMeGMa9dG36efxjjP+B6wkZjblVczn+pq2L8fUt/U157lEeQ1Rpk3GYztEOaoY2nGT7+Wv+dK056z/ynPb9FGOLPqXX/h6vgzNpW3b7tIMJcrxRRmaqWvb9sYvTET5JKIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF/F/wGK2iVvT89ySQAAAABJRU5ErkJggg==";

var IMG_404_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAASFBMVEVHcEw1NTXb29swMDB9fX1DQ0NeXl5RUVFtbW3m5ubT09Pg4ODKyso7Ozufn5+9vb2urq62traQkJClpaWJiYmYmJjCwsLq6uo9xg8yAAAAF3RSTlMACeoDbBxBLlX54PHUEZnCrbiFonuQyd/Z9QoAAAhdSURBVHgB7MGBAAAAAICg/akXqQIAAAAAYO7qJdtSEIbC8AKREB4icI57/jOtzm1Ur1ZdFRO/GfxxqzdbTFnJex9+eO9pLWZ5fbgpFFwf7cg2MeNvnGw+2uguUDFvfOaFQt+zZfwT27z3QOU9ezDkvtUy/gvb4+vIvCF+RMYvcRyqj7CGLTNO4ryFVWM9uZZwkdQcqatnXIqrnhusP/VX4+YUvAuL3yxuYze/CH/4FTergmdAPWKC2Enk9mkkTJKGF9fvd8ZEvHth+ZhO0AloQr7gE9BgPIQHPZ5fPhYPsp/ybH/IeFgOT66/QYBGD+UvLkEE+1me6PcVYlQ/Pd90hiDczdx+qhCm0sx+lyBOctPy1x0i7eucfh8hVPRT5s8Qi93t+WWDaFu5t58OCHeQ3Ndf/4cgJCiQwl39Dkp8bslfvlDju1zfbwYUGeby/h2q7BdfoDQo08ql/RXq1CK6f4Kj6N+/jA2YBqWa0f/9F/AvGFBsnO/vUK2f7XdQzp3rDwzlOJzpJwv1Ev2+f424EScb83HkaNOf9u5Ex3EQCQPwjznA+D7sev83XWnVGu1oZ9Jp8pcTNP4eIN2xOaqgCK0oyh6F7CJKunPbU/SDMdYaM/iY9u3sPi4cOERFHpO3ACx+Y30as6g4UCSJgnwEg78y4ciiIKFA7IRucgO+MbjpIwZCa3phW8Lbas76AT81CtmU8LQ0Cdn47gEgpzcXH6X3RgCbxw/5Tagajx+wM/v1F0hZmJb3pUCLRxG/vCktsr75jF0Ke7ypE8wfs2XvWuGZ+TOA/k5laq6fCYYsNF3Ai0J3eV44ftL3hw3dxeFQbLXa//urEtqI7y3vX43SW5dbLh0BHUjcheMgMQncQLMJS28ue9inAY2ZriqfGZrr465rY9NmwCM7v7NxpGv2ingPegbZfEnTXN/fAfTfzXrFH0mgS0LSef0GMEHBJCSrfhYUoCCoTwSOPAJ+7DjolIPANkJFbHXDwcSPgclG3TF6+vAGQGwCk8X/i0KyQM0iJEG/fWmwSUhGxTSoN1Bjer2Z0AnJDkW7kLjKhkD+MKj2ySdUTUIStdKAHap2pYTAfnoUyI8GrU6icVqosqeQBJ0ecEDZISSrSg+QBGVJZYE86O89scRWow+s7MdaQTAoq8bsukHdprBu5zshcVDnFBZHk7AkaLMa/+wmLBHqYkvvrybzWxUfv79mw14LkmygzmR6e3XCMuECi7A4elXUjAvM7Jopyy4K0Q8EuBmhb9mPVNcoLK1nl0UduMAhNIl9OniFPv7/OwvNjgvs5PJp29f3AKjJq+/q6wLUyDXIvzsISiAfjxlrewCO/HnXBELkJjuLVJwLEKaBU8ijqjLbC88J2Cw8zQBt1jTCkw11FpT2ohUhZjYQhSlBXRKmiCBMDuqcMCXyAz2g7hCmRH6gE9RN5Ca7C1PnocsOjTDtOIQqQFkQqgOzUO1QtgvVjEnqGgQW9v97ClUb1feFqHr0UlUfSMLVI0tVfWATroxGauoDvhGuBo2QOShyQtaglZr6wCRkLYStDaqpMBtaYZuhZhS2Fp2wtVExCGDr0AjdBiWr0DXIUk0T8I3QZWThG6tpAJLRC1/nwWd9J3w9JlGwKUXBfBNm0ZBAl0TDjFE05AFkQxYNI1ZRMYJsFBUrnOgIGh2Az6l9cj8odAA+hyBKNoUOwJcQW1Gy1nDPXcTQiRYHktCKktZz6wN0VgZiI1oaAyyipokg8FnU9BYYRU/v8TLfi54FwC6K+sj8/nwjf4Ql3wEbe/VbiIKo6tIn3/ObHqy0srSOess9f+3KZFG2WhSxqyjLBgBm0TZFFIiLaFsKSg6KNA4/5hpRdxRkmoWWSHj9dKlgu6FUe3g8zR+tFChdvz/lEt0R8ZR4NHKJbIqS7XLdGPGtOHZykfn6WyXbxXk84N3cymV2pU3ndhoffGIzJ2/xB9a7uZErBf6BdJFucfG7SxG6c3TBG4sv1vjgxrOTB9p979XW7md+C49ZvtH05zKP6zpuy9Q3zyRVJqy9TiGDE4pzj/hirT+F6Pz6ZBPGRlgctfKkGYPF/xpGodkG/DK4paX/4MkpLzqd17sjqHMqgUJvaBXISzJF8Wx5KuX3TD3cEeUFc8Df2L2TF7W7xZ8M7iTuYNue/vW/xFntmk6bet4G9qp3jWg6pVif8HcWxvWsrbsgJc6EJxiXpUh2Bt8Y9obQAwqDwewsnjOUvKneeTwhboQeUJQRjh7PM2n6aeMyeFI4GRUcidL6H7BhzD+4nNvieaZkrgmv/VDjOuDnhrQ18q1mTgN+KE4lm4K/c5ds9/i0Tg9eVzcdyaOA2dtXixd8V3CJcOlD2Kbcym/a5tzW5C1Khf7Vat6xYKenmB1icm5fj3E81t25FAeL1/j5xZL+oNz89e3ytFR8HOX0+Fg2dT9LBAuGwc1An/5m8l5aizfiw8X+lavgDvXCN33+lO8dhWeydnw+O5zynS6W1WOuqII/y2tYY/e43dTB9+VHmo4Hj82iFj7LI3PRsZzFoB6hK2gAj5tA9qiJK65i941q1e9ljoIp4NHqqENl7FQ6lv+xCSyoTuxK7wPeH7ea2oeBveR0jkOF7FL6i4/pwf2UFXgc2KeSI6oBdRpLBzPfPA6cauGb0sHMPQ6camH30nTWTg8Cp4qbwGlKxo+Aeo3F4eyqf3/g9RPBUXSjmUPNluLDzKG94JeS9bnyfG6vcg58sN+3l93m41C3pTyc9VkvCLi+DzSx7Mj2icpF+a82FT69EZUbmld2NGZxqN3ySjTrc0Ltjq8QuEz0qJ17aUXbonY2SRvwL0vi8E8LB/5txuKX2+12u91ut9vtdrvdbrfb7Xa7/Qf0wSAxhEqDGQAAAABJRU5ErkJggg==";

var IMG_404_VIDEO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhAAAAEpBAMAAAAwswZCAAAAJ1BMVEU3NTbV1dU2NDXU1NTDwsOrq6t9fX1IR0dwb3DNzc2cm5xbWlqPj4+TNW2cAAAFhElEQVQYGe3AQYud5R0F8MPhzoxSN4d/buoUgcODtIFs+jCmaUqAuQ1RJJuZFAR3mUHE5TBqQFc3iUHcdVpQoZsE0GxjAcFdRPRz9b2ZmbTfoHKf80NERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERExK8VCRj4/pu3+7Wb3z4FTDQSoyGAhrvvSjt9p/ftd45oA8ZobBgPS6UuqaT5kmgwhtOI99Sl0pkLd4hGjIbAZ+ol9dJKV7+wJInRGB9rRypJpZUuzY9gjIaXTkqnuiZVkr4GMZyf9F9dz9XOM2MoBDa6ulZu/vLB+z8v9Fyfw8Q4GoC/qST1K5/DNLce7qg02SOMcTRuaKXePCZt2r57QyVpDsMYhYl9TepLwM1strl5opK0RwzEr0hd/S/HaECzG0x/qkm9ZoyDuKdS3z60TRiECeILqaT7GEf7w4mk+pdJ2IRNE758Q5OvQAxjo0r9wpEJm2ggCAMfdUlzGCOwDdxTL71lGyvGma2FpL4kRkCCXnRp+ylIwAZxhj9Iql0MwSQ2u6Q/22g0YOLcpa7SRWIINmaaPCII04Zxhnws6Q0MoQF+oNL2MWgQ/8v4pKtriSE0cl/Sn2DDvnzjiXGO/r2kuo0REG2rS9q1TWBD20vjDImF1K9iBCY2u6RDkEB7vff5Mc4RB5IuYgQkNiTVkU0AM0nXQRIGYH8o6YqNARgvl3SFhAHMJO3csk2CJje6+jZpY/35u6561Q0EMCup9ASECRgvSb0/bVh/BA4kXaWJyUxV0rUlCJPwliaHILH27MeSdg0YwEwrNT8GSQNcqPSIJtadwX1V7YEwgJl6SerXYRgE96W6DRprz15U6RnRDGBWmpR2bsEkgB8l/RUmBrBQ1aGNlZm6VFLVIzYYOOhVu2DD2iNOJN3BqZnOzWE24KCkfxAjsEq6j1MznSkBBvBA0h8NY92RPJF0B6dmWilJc9hoOJD0d2L9uXEh6RCnZnqudz1qNMGDLu0SxAAWJT3DqZkmXTt1iyQM/yj1XWP9kdyXdBunZpqU6jpgw8C+pD0YA/Bjde3i1EzPzY9IA7AXkh4Zxrpj44Gk3+LUTCvbSxgAiS1NDgli/fE7Sa8CNoGZ1KUnMCYNfklS/dvG2qPxclefG4DJmaR+iyBW3DZK/RpIjGCjtLNzZJjNr6t0HTZWTHyoXnOYWHsENlXSIQnbs9L8CMZzpA+qdLEBxtqzt3ov7ZpoxIa2lyBNrBgLSVdBE2uPwL56vwibxuUbTwgYxoTc7JL2CBLrjjDuSbV9BBiTRtAwJsQnpd6XJIy1Z2AmqT8iCJuwQeLUY0kXYDRiBJuavArAJs4QJF7S5CKG4UXv2n7KCc6ZJn+Q1HeJYTyQVG95ghdMby2kqiXGsdGl/sYRDeMMQX7UJc3RMApvnah33QKIF+zf3ChJX9kYBXFPKm0vDeJMg79QV+/3QYzCeEUrvzu2ca59Kqn0mhuGwYb9Lqm+hHGmbZ5IJe3BxjCIDUldevOoGbaBu4veJc0BG6MgiH2VVHXlczebWw+7ulTaA2yMZENSL/W6+csH7/+86L2rSnOCGIhN/KRJl0qTLqmkemYY4zAml/6pF7omvfQ12TAQT+CPpR1JvdQ1qdL8mMRISNjAZ12lKvWSVOoXljAaBmIQJP2epNK5C3cAYkwPe5WkrpKuLI1RkXff7ZJK2n7nyMawDHz/zdv92s1vn8LEsIyJG2iCjRiXbYBAA0xjWAZhAAZAgxiX2QgbhpuNcRGACcAgIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiLi/+Y/XKfZaw0ONrwAAAAASUVORK5CYII=";

var IMG_404_BANNER = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

var IMG_404_LOGO_TEMP = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAABHNCSVQICAgIfAhkiAAAAXRJREFUeJztwTEBAAAAwqD1T20MH6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gZ/twABJJA/XAAAAABJRU5ErkJggg==";

var IMG_PARTNER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAADJCAYAAACJxhYFAAAOyUlEQVR42uydX4hcZxnG3+/bnYU2yia21F60ZBtLLUJJtqLEWpyuBtoI2qG5UFzqzCbVm1w4BWOuGpf2xkQh48WCmCYzQ1lJLwq7elEDLckUjQslmqVeaElilhXUQt1dadowszlHzuxsmJ3Mn/PnO9/f57lMk92ZM++v7/eced73cIIgqK8ACQQBErN0KPvaU7gKeonhEqhXPlseG6aRAuNUIKKdRLTke1RZp3qlWpu6jisESBzvGqzAOMv3+ju+51eJ/Mrp2vMXcMUAiStdY/sQjeQ4p+lW1wirJfL8UoMaQXdZxZUEJBbCMbtnmPwi4yxHRKMJftSa7/lz68RK1drkZVxZQGK8DmZnm16DEWVF/2yfqBZ4lzO1yQquNCAx1YgXE3aNCN2FSjD6gMQII844D8B4VuHLmPc9LzD6c/hEAIk2RjxDmQJxVoxoxNMWjD4g0caI53V/rb7nV2H0AYlkI86KjPzdpr12n9ii7/mlW1SfQ3cBJGkY8WLrG/FRC97SWusb/RKMPiBJasRzxHkxjdu3+nQXqpHnlWD0AUkkI97WNXY69NaRFwMkA7vGwByVK0JeDJBs6RpDNJIz1YjL6C6eR9OuG33mrhHPTAvIUbmiVl6sMe3iUcwpSNLMUTlzFHMwL8bc6BpbBpogYd3FjbwYs9mIa5CjckXz/sZt5AuAxAAjrmmOyhmjb2NejNkBh7CBJkiUd7EoL8bMN+K4fau30d/Ii5ls9JmhRtymHJVLRt/IvBgzyIjnGOcFGHFrjL4xg2EMRhxSafTbussqIInWNZCjctDo65oXYzp1DeSoIB0HwxiMOKSv0dcjL8bUHqtmS4zTj1APUP+jGP3ydG2y6BwkTVPOR66je0Bh1PDqO1Qdv5Q9eiHwHwAECqvmXU5FUgZJa2E0BIUsGFZ0CpLWg2rwvQcURTtVPeBIUSdhBXzmUOSq2Rh9sN+457PlsQwf+Qc+ciimgX9I9i1h6Z1kmEbQRSCj6ofLb5kESKAk9VO0GpKD2VnMmUNJNdqqIzshQReBTKwjBsMOmWngaVzWaDCXaLiK+GghcfXkF63qJMhpQSloreHVx2TkuaR0EuS0oDQMfKuu7DhuMYW5G8heycr/pQ5Jc5MiJg2hdCQlzyWhkyCnBZldX0yCYV/BBwmlqbTzXKl2EpWDMpA7SjvPle5xC4YdknHgSvkbeJ6iYc8hpwVJNPA54yBprSSFIDlKcSCLpWTYkdOCrDHwPCUjBS8CqTDwRWOOW4jEQ6oMfD5b3q49JK2BGOS0IBVKJc/FxdOM276Qym4ivv64WMM+uwc5LUgpJOTvFp3n4mKNk48uYrgefHgHfffwF01HpSAWPGFdBINVNgBy5OQ+umtbhi6eu0bl4wvGvheRC7aFdZJWTguAWABIoCee3kXHTu2nuz81YuT7EZkbFHfcgmE3VgEIh1/52m1AboPzuR3045PfMBMUgfUoBBIswDYbkACEez67rXuHMRcUYXkuIZCoWmQMiQEkAKHvUcxQUETlB5kAw46clsWAtGv56grNvPQOffjvGyYZ+MR5rsSdBAuw3QBks6P89NQ3mybfFInIc/HkLQ05LdP0ncOPRwZkU4G5P3JynzGgiKjPRJBgAbZ5mjq6t3l7N4kMAyXxgm2OLgJAbAclaZ0yGHYAkkSf3GjQ2ZlLdPH31zQ38PEXbPP4hiiDp+c6DshmR5n6yV564pldmhv4+LlCHrOLbGec5VB++iso3rQA2QKi5qAE9Rp3ICsWJFiAbQ4gQfFK61h6gzIaN88VCxJZi4ohcwDZ1L4Dn9f3osTMc0WGBDktANLPxM+89I7OlybWgu0YnQQLsHXW+JMPKAPk5y++ZUBkJXr9sqiGHQuw9VXnTIhsQJavmFEaUfNckToJ9mkBENMBoRh5w0iQ4Bt2AGI6IHHqmEcw7FiADUC26OzMJeMA2TTwUfJc4TsJBqu00z33b1MGSPnEgvZRFFHdhIc07GOMKIuy1Ee95tIBSEhIiLJBXQuDBIZdP0DiDE0BkM66Dpc/5DDsAMRFQChCnmsgJFiADUACXTx3zSpAWgq1YJuHoA1HLU0UeBBVgJi8zTFpffP+hh0LsHXR1NG99Mju+wCIcAM/eME2729ssABbF0BkzIS4BkgbKoX+IPXsIshpAZAFZ65zvwXbPTuJyIXDkFmALF9doddn/uzUte73NUfv4xYMu1J9O/+YMkB+8eLb9PFHdaeud7+vObpCgsEqtXrimV30rfxjAESuei7Y5t2pQk5LJSAqhqYcB2Sz7guhjDv2abkHyIf/uUEv/+BNpwFpM/B3DGTxLgYGht0hQDbn0gFIbwPPuxgYp45aOqzpDF6Dyrl0Q2dCpBn4LZC4ltMaf/IBOvbr/c1brSoBOXJyHwDRR3cs2OaDKLK5g0wd/crGUefpXUpAwditrt1k69cfvMPF73EFkM7iDEAJ/kzWI89Ujt0CkAGQkD/WExLf8+dcBGRTj+y+T8qzAVUCUj6xAEAGqJODLZCsU2PaVUBu/52UH6KJsVv9tU6s1BOSam3quk9Us/GNB8UZ+I4wxZkWKIMeBw1ANOgiRLXO55jwO1sNVWwEJOpEX/B3j53aL+wWMcZuTTlq3Vn/XaPyL0zMXrclu5W0OEXcCVIJyO+q79Fvq++h+sNp7dXzk3fMvPOwNLkICAl4NqDquXQAEqmLlLr9Oe9uXOpWQBJ4EBHFmQSUJI+DTgqIS0NTYgx797of6vaHi0vzq48/dGCciB41GZAvTYg7MWZGhujLXx+jtZWboY9emCo0SvPlC9//VehOstF6vJLJgKRRnFEeoglATDtqeT1PT32fT2KigZdVnP3uGKkC5P3FD5o3GaDIWnr1/GTPlaf99255vlHdRObIa6+OonIuXfNHsemrAXXeF5IGNYIWtGbC+1Qx8hqA0h6MlPU46G6AuD5VmEStOu+poX7/cXFp/ub4zuceZYxpHXx88OEdVPzZhLLffe/92+juT49g7NZIL+JXy7X82didhLrkWHTU8pWVpkdQ1sWexly6qQpT3wMhqdYmL5uQ5wpMtEpQZOuTGw0AkrSLEFvszGnFgoQM+gbeFVA2ozIAJPFRK9QpKRQkZ2qTxhh420HBVKEwrd2i+pwwSMiwPFcAyss/fLNZUAAE6lXPvXb/xoZknepGfWcSFFJQULaAAkBEG/bw9RwaktbCrnmAokbl438CIMIMO9U6F9AJgYQG5FsASoqAnFigv/zhn6huUYqYS2RRf76pA1kq5zqSAoKpQqHqm9NK3Ek2KPSNTAd//FG9+b3C8tUVAOK4YY/6byJDMijnAlAAiC2GPTYk1drUqu/5VdNBeX/xA21f49tv/B2ApNJF/GrY277Jjlsbv87o8d4AlMDMXzynXyEGr+nszCVUdDqYxKpbFvfXHZr4zWUbHl+tav6jFyCYKtTHsCfsJOFzL9qf/Y8vaNFRAEi68jyKvZ00NiSt3MuaLaAEPgCAWKvQOa1uGor7DzcGsg7czxjtteEq/vXdfzUfizb+1Qek/t7lqyt06pWL1KjfQimnZ9hfHzRYlUonIQPzXAP/jy45QYyhKTlKugg+ESQ2LtiWBQoAkdRFIua0hEPSckQl2y7sJihp5b0AiMyjVvIRDybihdi0YLtdaTxsB4DINezdFmDL7ySWPq6BUkgQBz+nfHwBgMjrIkJOOVyMMapXbL3QokDB0JQKwy6mLodE/JDFpfnV8Z3PPaT7fq64+t9/bzZvEe/6wr00+pm7AIgZ6rkAW0knaTW3is1XPCjwOAliAKLqqCXuhhIT+cJsNfDtijK8BUCUKXZOK+VOkiwfY4qizKScnbkEQFRIcK5QKCQ25bnCgHL5j73nzjE0pU6iBwOHRP4wUxZsC/kg6rfo3fNLzWXZnY+JAyAqvcjgBdhKOwkZsmBbpDqj9gBErdKoP5bGCz00MXuBEWVd+nCmju6l5Sur9NYbf0OlquoixBZPn/+e8FPMcDotjyqMuwUJ5kG0OGqlcophab3gFyZmV4loFB8dJElCclpSPElbNynhc4PkdZH08oM8PQNVr+Cjg+QZ9vQGAFODxMQF25Cxmk86WKUEEhKcn4GgPnWW6qmFpf0GXMhzQUolNKclvZM0Zcl+Lsg9wy4NEpMXbENuG3ZpkJi+YBvSuYvEW4Ct33HLwTwXJA0TKacUJuvt2LJgG9IEj5RyWso6CVm0YBvS5qglrZ6kQXKmNllxYSALkqJEC7C1hYQs3s8FSe8iczIMuxJIbFuwDalR0gXYWkNi44JtSLZhT74AW2tImkKeCzLsyM5UvFHkuaCYSj2npUcngYGHDKsbrsZ4wcBDserGHUiQ54Kid5FmTuu6M5C03jaOXJAR9cJUvm3kuSCdDbsGnYRo3fMLmIOHBmi+4VFO5QtgOlyFfLY8NkwjBcapiF1dEBGt+R5V1qleUuVDtIOkXQezswEsBdfWpEIb36YHcLTCsNqI6XrB8tnZPcPkFxlnOXQX27uGP7dOrFStTV7W8QUy3a9gPlvePkQjOc6bDwjCt/QWmXHy/FKDGhWZiV4rIWnXoexrTxGxAuMsjxoz14j7nlc6XXv+gikvmJl4lduMfgHdxYyu0TLiFR2MuBOQwOjDiAOS+N2l2OouMPrKjXhj2sSuYTUknUafcVbEt/kyuwZb9D2/dIvqc7obcechgdGXDEczqOpXTDLigKRHd8lQpkCcFWH0hRrxkm1dw1lIOrpLjnEe+JZnUevRjTht3L6dc+l9M1c/cBj9KEZcnxwVIFGkjdvIMPrdjLjpt28BifDugrxYYMR1zlEBEhh9ZUbclBwVINHT6D/FOC9aavSNy1EBEv2Nvg15scCIl0zNUQESo4y+WXkxW3JUgMTI7pKZ1tjoW5ejAiQGG33NBsOWPI+mbcxRARJLjL6qvJgLOSpAYll3aftGP83uYvRAEyCBNrtLjjgvijT6ruaoAIkTRj9RXsz5HBUgcUhR8mI2DzQBEihEd7mdF8t3M+LIUQESqM3oZyhT8DnLMc+fQ44KgiBjxHEJIAiQQFAi/T8AAP//NojMSb2rf6kAAAAASUVORK5CYII=";
//empty//Variable initialization
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
    tryes++;
    if (tryes < 5) AddCode_refreshTokens(position, tryes, callbackFuncOK, callbackFuncNOK);
    else if (callbackFuncNOK) callbackFuncNOK();
}

function AddCode_refreshTokensSucess(responseText, position, callbackFunc) {
    var response = JSON.parse(responseText);

    if (AddCode_TokensCheckScope(response.scope)) {
        AddUser_UsernameArray[position].access_token = response.access_token;
        AddUser_UsernameArray[position].refresh_token = response.refresh_token;

        AddUser_SaveUserArray();
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

    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("POST", theUrl, true);
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

    //BasehttpPost(theUrl, AddCode_loadingDataTimeout, 0, null, AddCode_requestTokensSucess, AddCode_requestTokensError, false);
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
        Main_values.Main_Go = Main_Users;
        Main_SaveValues();
        Main_showWarningDialog(STR_USER_CODE_OK);
        if (Main_IsNotBrowser) Android.clearCookie();
        window.setTimeout(function() {
            window.location = AddCode_redirect_uri;
        }, 3000);
    } else {
        AddUser_UsernameArray[Main_values.Users_Position].access_token = 0;
        AddUser_UsernameArray[Main_values.Users_Position].refresh_token = 0;
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
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_RequestCheckFallow();
    } else {
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
}

function AddCode_RequestCheckSub() {
    var theUrl = 'https://api.twitch.tv/kraken/users/' + AddUser_UsernameArray[Main_values.Users_Position].id + '/subscriptions/' + AddCode_Channel_id;
    var xmlHttp;
    if (Main_IsNotBrowser) {

        xmlHttp = Android.mreadUrl(theUrl, AddCode_loadingDataTimeout, 3, 'OAuth ' + AddUser_UsernameArray[Main_values.Users_Position].access_token);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            AddCode_RequestCheckSubError();
            return;
        }

        AddCode_RequestCheckSubreadyState(xmlHttp);

    } else {

        xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = AddCode_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader('Authorization', 'OAuth ' + AddUser_UsernameArray[Main_values.Users_Position].access_token);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) AddCode_RequestCheckSubreadyState(xmlHttp);
        };

        xmlHttp.send(null);
    }
}

function AddCode_RequestCheckSubreadyState(xmlHttp) {
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
        AddCode_refreshTokens(Main_values.Users_Position, 0, AddCode_CheckSub, AddCode_RequestCheckSubfail);
    } else { // internet error
        AddCode_RequestCheckSubError();
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
    PlayVod_NotSub();
}

function AddCode_CheckTokenStart(position) {
    AddCode_TimeoutReset10();
    AddCode_CheckToken(position, 0);
}

function AddCode_CheckToken(position, tryes) {
    var theUrl = 'https://api.twitch.tv/kraken?oauth_token=' +
        AddUser_UsernameArray[position].access_token;

    var xmlHttp;

    if (Main_IsNotBrowser) {

        xmlHttp = Android.mreadUrl(theUrl, 3500, 0, null);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            AddCode_CheckTokenError(position, tryes);
            return;
        }

        if (xmlHttp.status === 200) {
            AddCode_CheckTokenSuccess(xmlHttp.responseText, position);
        } else if (xmlHttp.status === 400) { //token expired
            AddCode_TimeoutReset10();
            AddCode_refreshTokens(position, 0, null, null);
        } else {
            AddCode_CheckTokenError(position, tryes);
        }

    } else {

        xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = 10000;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    AddCode_CheckTokenSuccess(xmlHttp.responseText, position);
                } else if (xmlHttp.status === 400) { //token expired
                    AddCode_TimeoutReset10();
                    AddCode_refreshTokens(position, 0, null, null);
                } else {
                    AddCode_CheckTokenError(position, tryes);
                }
            }
        };

        xmlHttp.send(null);
    }
}

function AddCode_CheckTokenSuccess(responseText, position) {
    var token = JSON.parse(responseText);
    if (!token.token.valid) {
        AddCode_TimeoutReset10();
        AddCode_refreshTokens(position, 0, null, null);
    } else {
        if (!AddCode_TokensCheckScope(token.token.authorization.scopes)) AddCode_requestTokensFailRunning(position);
    }
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
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
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
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
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
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
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
}//https://developer.android.com/reference/android/view/KeyEvent
var KEY_PAUSE = 127;
var KEY_PLAY = 126;
var KEY_PLAYPAUSE = 179;

var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_ENTER = 13;

var KEY_PG_DOWN = 34;
var KEY_PG_UP = 33;
var KEY_REFRESH = 50; //key #2

var KEY_RETURN = 49; //key #1

var KEY_KEYBOARD_BACKSPACE = 8; // http://developer.samsung.com/tv/develop/guides/user-interaction/keyboardime
var KEY_KEYBOARD_DONE = 13;
var KEY_KEYBOARD_SPACE = 32;
var KEY_KEYBOARD_DELETE_ALL = 46;//Variable initialization
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
var defaultColors = ["fe2424", "fc5a24", "ff9020", "fEc723", "ffff1d", "bfff00", "c3ff12", "56fe1d", "1eff1e", "16ff51", "00ff80", "00ffbf", "00ffff", "1dc6ff", "158aff", "3367ff", "ff4dff", "ff4ad2", "ff62b1", "ff4272"];
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
    if (!Main_IsNotBrowser || Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }
    if (!Chat_LoadGlobal) Chat_loadBadgesGlobal();

    Main_ready(function() {
        Chat_Id = (new Date()).getTime();
        ChatLive_selectedChannel_id = Main_values.Main_selectedChannel_id;
        ChatLive_selectedChannel = Main_values.Main_selectedChannel;
        ChatLive_loadBadgesChannel(Chat_Id, Chat_loadBadgesChannelSuccess);
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
    ChatLive_loadEmotesbbtv(JSON.parse(data));
    Chat_loadEmotesffz();
}

function Chat_loadEmotesffz() {
    Chat_loadingDataTry = 0;
    Chat_loadEmotesRequestffz();
}

function Chat_loadEmotesRequestffz() {
    var theUrl = 'https://api.frankerfacez.com/v1/set/global';
    BasexmlHttpGet(theUrl, 10000, 0, null, Chat_loadEmotesSuccessffz, Chat_loadEmotesErrorffz, false);
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

function Chat_loadBadgesTransform(responseText) {
    transformBadges(JSON.parse(responseText).badge_sets).forEach(function(badge) {
        badge.versions.forEach(function(version) {
            tagCSS(badge.type, version.type, version.image_url_4x, Chat_div);
        });
    });
}

function Chat_loadBadgesChannelSuccess(responseText, id) {
    Chat_loadBadgesTransform(responseText);

    ChatLive_loadEmotesChannel();
    ChatLive_loadEmotesChannelffz();
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
            if (fragments.hasOwnProperty('emoticon')) div += '<img class="emoticon" alt="" src="https://static-cdn.jtvnw.net/emoticons/v1/' + fragments.emoticon.emoticon_id + '/1.0" srcset="https://static-cdn.jtvnw.net/emoticons/v1/' + fragments.emoticon.emoticon_id + '/2.0 2x, https://static-cdn.jtvnw.net/emoticons/v1/' + fragments.emoticon.emoticon_id + '/3.0 4x">';
            else div += ChatLive_extraMessageTokenize([fragments.text]);
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
    if (!Chat_hasEnded && Chat_Id === id && !Main_values.Play_ChatForceDisable) {
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
    Main_ready(function() {
        Chat_div.scrollTop = Chat_div.scrollHeight;
    });
}

function Chat_SingleLine(Line) {
    var div = '&nbsp;';
    div += '<span class="message">';
    div += STR_BR + STR_BR + STR_BR + STR_BR + STR_BR + STR_BR;
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
}//Spacing for reease maker not trow erros frm jshint
function en_USLang() {
    // This is a false/true var change if day comes first in your language eg (27/12/2010) day 27 month 12 year 2010
    Main_IsDayFirst = false;

    // This is the size of side pannel a adjustments may be needed here so it can fit all words in the horizontal axis
    //document.getElementById("side_panel").style.width = "25%";

    //Below are variables to translate
    STR_KEY_UP_DOWN = " (PG Up/Down)";
    STR_GUIDE_EXTRA = "or key 2";
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
    STR_USER = "User ";
    STR_LIVE = "Live";
    STR_GAMES = "Games";
    STR_PLAYING = "Playing ";
    STR_FOR = " for ";
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
    STR_TWICE = " twice";
    STR_IS_OFFLINE = " has ended";
    STR_IS_SUB_ONLY = "This video is only available to subscribers.";
    STR_REFRESH_PROBLEM = "Connection failed, unable to load content. Hit refresh to try again";
    STR_NO = "No";
    STR_FOR_THIS = " for this ";
    STR_PLAYER_PROBLEM = "Connection failed, unable to load video content exiting...";
    STR_PAST_BROA = " Past Broadcasts";
    STR_PAST_HIGHL = " Highlights";
    STR_CLIPS = " Clips";
    STR_CONTENT = " Content";
    STR_STREAM_ON = "Streamed ";
    STR_DURATION = "Duration ";
    STR_VIEWS = " Views";
    STR_VIEWER = " Viewers";
    STR_EXIT_AGAIN = "Click again to exit!";
    STR_EXIT_AGAIN_PICTURE = "Click again to hide Picture in Picture!";
    STR_EXIT_MESSAGE = "Do you want to exit SmartTV Twitch?";
    STR_EXIT = "Exit";
    STR_CLOSE = "Close";
    STR_MINIMIZE = "Minimize";
    STR_CANCEL = "Cancel";
    STR_NOT_LIVE = "Rerun";
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
    STR_USER_NUMBER_ONE = "First user can follow (when providing a key) and see live channels feed outside of the user screen<br>";
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
    STR_CLOSE_THIS = "Press back or enter key to close this.";
    STR_PLAYER = "Player Related:";
    STR_CHAT = "Chat Related:";
    STR_GENERAL = "General Related:";
    STR_UPDATE = 'Update';
    STR_CURRENT_VERSION = "Current installed version ";
    STR_LATEST_VERSION = " latest available version ";
    STR_CONTROLS_MAIN_2 = "Play a video: Navigate using Directional pad (up/down/left/right), press enter to start playing";
    STR_CONTROLS_MAIN_3 = "Refresh screen content: ";
    STR_CONTROLS_MAIN_4 = "Exit the application: from side panel click exit";
    STR_CONTROLS_MAIN_5 = "Force close the application: Hold the back key until it closes";
    STR_CONTROLS_MAIN_6 = " Switch screen: Back key then D-Pad left or right or" + STR_KEY_UP_DOWN;
    STR_CONTROLS_MAIN_10 = "Start a search: from side panel click search, writing the search press the Enter key on the virtual keyboard and choose a search option";
    STR_CONTROLS_MAIN_14 = "About this application: from side panel click about";
    STR_ABOUT_INFO_1 = "This is a SmartTV Twitch client developed by a individual on his free time, for TVs that don't have access to a good official application, released for free to anyone who wants to use it.";
    STR_ABOUT_INFO_2_SOURCE = "This version of the app is for test in browser only!";
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
    STR_CONTROLS_PLAY_3 = "Play/Pause a video: open information panel and click on pause symbol";
    STR_CONTROLS_PLAY_4 = "Show user live channels feed: D-pad up";
    STR_CONTROLS_PLAY_5 = "Change video quality: use the player bottom controls Quality";
    STR_CONTROLS_PLAY_6 = "Force refresh a video (in case it freezes): Change video quality to the same";
    STR_CONTROLS_PLAY_7 = "Show or hide the Chat : D-pad right" + STR_GUIDE_EXTRA;
    STR_CONTROLS_PLAY_8 = "Change Chat position : D-pad left or " + STR_KEY_UP_DOWN;
    STR_CONTROLS_PLAY_9 = "Change Chat size : D-pad down";
    STR_CONTROLS_PLAY_10 = "Change Chat background brightness: Change in side panel settings";
    STR_CONTROLS_PLAY_11 = "Force refresh the Chat in Live streams (in case it freezes or doesn\'t load): use the player bottom controls Chat force disable (click twice)";
    STR_CONTROLS_PLAY_12 = "Start a search: open information panel, navigate using use Directional pad (left/right) to \"Search\" and press enter";
    STR_CONTROLS_PLAY_14 = "Chat and video (Side by side): Color button red (A)";
    STR_F_DISABLE_CHAT = "Chat force disable";
    STR_UPDATE_AVAILABLE = "Update available, check google play store";
    STR_OAUTH_IN = 'Adding a key allows the app to access live user content faster, follow/unfollow channels/games and access subscribed only past broadcast (for channel you are Sub to and block VOD access to none subscribers) <br> <br> In doubt read this link  <br> <br> https://github.com/fgl27/SmartTwitchTV#authentication <br> <br> add key for';
    STR_OAUTH_EXPLAIN1 = " below, fallowing this steps:";
    STR_OAUTH_EXPLAIN2 = "Access the site link_link (using a computer or a smart phone)";
    STR_OAUTH_EXPLAIN3 = "Click the \"Authorize\" button which will take you to main Twitch.TV authentication site";
    STR_OAUTH_EXPLAIN4 = "Login to Twitch.TV using the username you are trying to add a key for";
    STR_OAUTH_EXPLAIN5 = "Click on Authorize button of Twitch.TV site if you agree with the requested permissions";
    STR_OAUTH_EXPLAIN6 = "The web page will update and show a key code, the key only has lowercase letters and nubers.";
    STR_USER_CODE = " Add Authentication key";
    STR_USER_CODE_OK = "Key added OK";
    STR_KEY_BAD = "Key test failed, new one needs to be added";
    STR_KEY_OK = "Key test return OK";
    STR_OAUTH_WRONG = "You try to add a key for user ";
    STR_OAUTH_WRONG2 = " but this key is for user ";
    STR_FALLOWING = " Following";
    STR_FALLOW = " Follow";
    STR_IS_SUB_NOOAUTH = " And you have not set a authentication key the app can\'t check yours sub status.";
    STR_IS_SUB_NOT_SUB = " And you are not a sub of this channel";
    STR_IS_SUB_IS_SUB = " You are a sub of this channel but the app failed to authenticate contact the developer\'s email in About";
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
    STR_GUIDE = " Back key then Enter";
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
    STR_SETTINGS_BUFFER_SIZE = "Buffer size:";
    STR_SETTINGS_BUFFER_SIZE_SUMMARY = "A lower value here will make the player start playing sooner, but it may cause re-buffering which will cause the player to pause to buffer.";
    STR_SETTINGS_BUFFER_LIVE = "Live streams buffer";
    STR_SETTINGS_BUFFER_VOD = "Videos (Past Broadcast and Highlight) buffer";
    STR_SETTINGS_BUFFER_CLIP = "Clips buffer";
    STR_SETTINGS_GENERAL = "General related";
    STR_SETTINGS_LANG = "Language";
    STR_LOADING_CHAT = "Chat: Connecting to chat server..." + STR_BR + "Chat: Connected." + STR_BR + "Chat: Joined channel ";
    STR_VOD_HISTORY = "Play from the start or from where you stopped watching last time?";
    STR_FROM = "From:" + STR_BR;
    STR_FROM_START = STR_FROM + "Start";
    STR_CHAT_END = "Chat: The Chat has ended!";
    STR_TIME = ": Most recent";
    STR_VIWES = ": Most views";
    STR_NOKEY_VIDEO_WARN = "Set an authentication key to be able to see followed videos";
    STR_SWITCH_TYPE = "Switch: Most recent or views";
    STR_ENABLE = "Enable";
    STR_DISABLE = "Disable";
    STR_RESTORE_PLAYBACK_WARN = "The app was closed while playing, restoring playback";
    STR_RESTORE_PLAYBACK = "Restore playback";
    STR_RESTORE_PLAYBACK_SUMARRY = "When changing apps, the app might get closed by the system for more memory. In this case the app saves what it was playing and restores the playback when reopened";
    STR_CHAT_FONT = "Chat font size";
    STR_VIDEOS_ANIMATION = "Video\'s animated thumbnails";
    STR_SIDE_PANEL = "Side panel: D-pad left or Back key twice";
    STR_SIZE = "Size ";
    STR_BRIGHTNESS = "Brightness ";
    STR_FORBIDDEN = "Forbidden content, this Live content must be for Prime only subscribers or restrained to the official Twitch app";
    STR_JUMPING_STEP = "Jump step ";
    STR_SECOND = " second";
    STR_SECONDS = STR_SECOND + "s";
    STR_MINUTES = " minutes";
    STR_CLOCK_OFFSET = "Clock offset";
    STR_APP_LANG = "Application language";
    STR_CONTENT_LANG = "Content language";
    STR_CONTENT_LANG_SUMARRY = "Press enter to change";
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
    STR_SIDE_PANEL_SETTINGS = "Settings, about, etc...";
    STR_UP = " Press up";
    STR_LIVE_FEED = "Live Feed";
    STR_END_DIALOG_SETTINGS = "End dialog";
    STR_END_DIALOG_SETTINGS_SUMMARY = "Set the time that it will take for the stream/video/clip to end dialog taking action";
    STR_END_DIALOG_DISABLE = "Disable the timer";
    STR_CHAT = "Chat Show";
    STR_CHAT_SIZE = "Chat size";
    STR_CHAT_POS = "Chat position";
    STR_CHAT_VIDEO_MODE = "Video mode";
    STR_CHAT_SIDE_FULL = "Full screen";
    STR_CHAT_SIDE = "Smaller screen and chat";
    STR_CHAT_DELAY = "Chat delay";
    STR_SPEED = "Speed";
    STR_QUALITY = "Quality";
    STR_NORMAL = "Normal";
    STR_AUTO = "Auto";
    STR_DEF_QUALITY = "Default player start quality";
    STR_DEF_QUALITY_SUMARRY = "Used when the app is first opened, after the user change the quality that becomes default for that section, a section ends when the apps is closed";
    STR_VERY_LOW = "Very low";
    STR_LOW = "Low";
    STR_HIGH = "High";
    STR_VERY_HIGH = "Very high";
    STR_THUMB_RESOLUTION = "Thumbnails quality";
    STR_THUMB_RESOLUTION_SUMARRY = "Default thumbnails resolution for live, videos and games (can't be applied for clips) a lower value will help the app load faster but the thumbnail may look blurry";
    STR_PAYPAL_SUMMARY = "Donations use above Email.";
    STR_PLAYER_PROBLEM_2 = "Connection failed, unable to load stream info";
    STR_PLAYER_RESYNC = "Player Sync";
    STR_PLAYER_AUTO_BIG = "Main window";
    STR_PLAYER_AUTO_SMALLS = "Small window";
    STR_PLAYER_AUTO_ALL = "Both windows";
    STR_PLAYER_BITRATE_UNLIMITED = "Unlimited";
    STR_PLAYER_BITRATE = "Auto quality Bitrate limit:";
    STR_PLAYER_BITRATE_SUMARRY = "The maximum video allowed bitrate for the auto quality, this is most to prevent lag or slowdowns when playing in picture and picture mode as that mode used Auto quality only, but also can be used to limit the Main window bitrate when using Auto quality and prevent the player from trying bitrate bigger then what yours internet supports, some devices will slowdown too much if the main and small window bitrate is too high, the recommended is 3Mbps for small and unlimited for main.";
    STR_PLAYER_BITRATE_MAIN = "Main player bitrate";
    STR_PLAYER_BITRATE_SMALL = "Small player bitrate (for Picture in Picture mode)";
    STR_PLAYER_BITRATE_SMALL_SUMARRY = "Different values for Main and small player bitrate may cause a short loading call when changing video source, to prevent this set both values the same at the cost of possible app slowdowns if the bitrate values are too high, the best indicative for detecting too high bitrate for picture in picture is the player Drooped frames value if you are constantly drooping the bitrate is too high, other indicative is the constantly buffering of the stream.";
    STR_PICTURE_LIVE_FEED = 'Hold enter to start "Picture in Picture Mode" then use D-Pad to move, resize or change videos';
    STR_AUDIO_SOURCE = "Audio source";
    STR_PICTURE_PICTURE = "Picture in Picture (Live streams only):";
    STR_PICTURE_CONTROLS1 = "Enable picture in Picture mode: Playing a video press up to show live feed choose a stream then hold key enter to start";
    STR_PICTURE_CONTROLS2 = "Change small window content: Same as before, hold key enter to start above a stream in live feed";
    STR_PICTURE_CONTROLS3 = "Change big window content: simple click above a stream in live feed";
    STR_PICTURE_CONTROLS4 = "Change content between windows: D-pad down big becomes small and vice versa";
    STR_PICTURE_CONTROLS5 = "Change small window position: D-pad left";
    STR_PICTURE_CONTROLS6 = "Change small window size: D-pad right";
    STR_PICTURE_CONTROLS7 = "Change audio source: use the player bottom controls Audio source";
    STR_PICTURE_CONTROLS8 = "Sync playback: use the player bottom controls Player Sync";
    STR_PICTURE_CONTROLS9 = "Picture in Picture video quality: Check in app settings Auto quality Bitrate limit";
    STR_PICTURE_CONTROLS10 = "Close small window: back key twice";
    STR_KEEP_INFO_VISIBLE = "Keep player status always visible";
}//Variable initialization
var PlayExtra_KeyEnterID;
var PlayExtra_clear = false;
var PlayExtra_selectedChannel = '';
var PlayExtra_selectedChannelDisplayname = '';
var PlayExtra_loadingDataTry = 0;
var PlayExtra_state = Play_STATE_LOADING_TOKEN;
var PlayExtra_qualities;
//var PlayExtra_qualityIndex = 0;
//var PlayExtra_playingUrl = '';
var PlayExtra_quality = "Auto";
var PlayExtra_qualityPlaying = PlayExtra_quality;
var PlayExtra_selectedChannel_id = 0;
var PlayExtra_IsRerun = false;
var PlayExtra_gameSelected = '';
var PlayExtra_isHost = '';
var PlayExtra_DisplaynameHost = '';
var PlayExtra_PicturePicture = false;

var PlayExtra_selectedChannel_id_Old;
var PlayExtra_IsRerun_Old;
var PlayExtra_selectedChannel_Old;
var PlayExtra_isHost_Old;
var PlayExtra_DisplaynameHost_Old;
var PlayExtra_selectedChannelDisplayname_Old;
var PlayExtra_gameSelected_Old;
var PlayExtra_qualities_Old;
var PlayExtra_qualityPlaying_Old;
var PlayExtra_quality_Old;

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
    console.log('PlayExtra_KeyEnter');
    PlayExtra_clear = true;

    var doc = document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos);
    if (doc === null) UserLiveFeed_ResetFeedId();
    else {
        var selectedChannel = JSON.parse(doc.getAttribute(Main_DataAttribute))[0];
        if (Main_values.Play_selectedChannel !== selectedChannel && PlayExtra_selectedChannel !== selectedChannel) {
            if (Main_IsNotBrowser) {
                Android.play(true);
                try {
                    Android.mClearSmallPlayer();
                } catch (e) {}
            }

            PlayExtra_PicturePicture = true;
            UserLiveFeed_Hide();

            Main_values.Play_isHost = false;
            Play_UserLiveFeedPressed = true;

            PlayExtra_selectedChannel = JSON.parse(doc.getAttribute(Main_DataAttribute));
            PlayExtra_selectedChannel_id = PlayExtra_selectedChannel[1];
            PlayExtra_IsRerun = PlayExtra_selectedChannel[2];
            PlayExtra_selectedChannel = PlayExtra_selectedChannel[0];
            PlayExtra_isHost = false;
            PlayExtra_selectedChannelDisplayname = document.getElementById(UserLiveFeed_ids[3] + Play_FeedPos).textContent;

            PlayExtra_DisplaynameHost = Main_values.Play_DisplaynameHost;

            var playing = document.getElementById(UserLiveFeed_ids[5] + Play_FeedPos).textContent;
            PlayExtra_gameSelected = playing.indexOf(STR_PLAYING) !== -1 ? playing.split(STR_PLAYING)[1] : "";

            if (Main_IsNotBrowser) {
                //Not on auto mode for change to auto before start picture in picture
                if (Play_quality.indexOf("Auto") === -1) Android.StartAuto(1, 0);
                Android.play(false);

                Play_quality = "Auto";
                Play_qualityPlaying = Play_quality;
                PlayExtra_quality = "Auto";
                PlayExtra_qualityPlaying = PlayExtra_quality;
            }
            PlayExtra_Resume();
        } else UserLiveFeed_ResetFeedId();
    }
}

function PlayExtra_Resume() {
    // restart audio source position when first re-start PlayExtra_PicturePicture
    try {
        Android.mSwitchPlayerAudio(Play_controlsAudioPos);
    } catch (e) {}
    PlayExtra_state = Play_STATE_LOADING_TOKEN;
    PlayExtra_loadingDataTry = 0;
    PlayExtra_loadDataRequest();
}

function PlayExtra_SwitchPlayerStoreOld() {
    PlayExtra_selectedChannel_id_Old = Main_values.Play_selectedChannel_id;
    PlayExtra_IsRerun_Old = Main_values.IsRerun;
    PlayExtra_selectedChannel_Old = Main_values.Play_selectedChannel;
    PlayExtra_isHost_Old = Play_isHost;
    PlayExtra_DisplaynameHost_Old = Main_values.Play_DisplaynameHost;
    PlayExtra_selectedChannelDisplayname_Old = Main_values.Play_selectedChannelDisplayname;
    PlayExtra_gameSelected_Old = Main_values.Play_gameSelected;
    PlayExtra_qualities_Old = Play_qualities;
    PlayExtra_qualityPlaying_Old = Play_qualityPlaying;
    PlayExtra_quality_Old = Play_quality;
}

function PlayExtra_SwitchPlayerResStoreOld() {
    PlayExtra_selectedChannel_id = PlayExtra_selectedChannel_id_Old;
    PlayExtra_IsRerun = PlayExtra_IsRerun_Old;
    PlayExtra_selectedChannel = PlayExtra_selectedChannel_Old;
    PlayExtra_isHost = PlayExtra_isHost_Old;
    PlayExtra_DisplaynameHost = PlayExtra_DisplaynameHost_Old;
    PlayExtra_selectedChannelDisplayname = PlayExtra_selectedChannelDisplayname_Old;
    PlayExtra_gameSelected = PlayExtra_gameSelected_Old;
    PlayExtra_qualities = PlayExtra_qualities_Old;
    PlayExtra_qualityPlaying = PlayExtra_qualityPlaying_Old;
    PlayExtra_quality = PlayExtra_quality_Old;
}

function PlayExtra_SwitchPlayer() {
    PlayExtra_SwitchPlayerStoreOld();
    Main_values.Play_selectedChannel_id = PlayExtra_selectedChannel_id;
    Main_values.IsRerun = PlayExtra_IsRerun;
    Main_values.Play_selectedChannel = PlayExtra_selectedChannel;

    Play_isHost = PlayExtra_isHost;

    if (Play_isHost) {
        Main_values.Play_DisplaynameHost = PlayExtra_DisplaynameHost;
        Main_values.Play_selectedChannelDisplayname = Main_values.Play_DisplaynameHost.split(STR_USER_HOSTING)[1];
    } else Main_values.Play_selectedChannelDisplayname = PlayExtra_selectedChannelDisplayname;

    Main_values.Play_gameSelected = PlayExtra_gameSelected;

    if (Main_values.Main_Go === Main_aGame) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
    Play_loadingInfoDataTry = 0;
    Play_updateStreamInfoStart();
    Play_loadChat();

    Play_qualities = PlayExtra_qualities;
    Play_qualityPlaying = PlayExtra_qualityPlaying;
    Play_quality = PlayExtra_quality;

    PlayExtra_SwitchPlayerResStoreOld();
    Main_SaveValues();
}

function PlayExtra_loadDataSuccess(responseText) {
    if (PlayExtra_state === Play_STATE_LOADING_TOKEN) {
        Play_tokenResponse = JSON.parse(responseText);
        PlayExtra_state = Play_STATE_LOADING_PLAYLIST;
        PlayExtra_loadingDataTry = 0;
        PlayExtra_loadDataRequest();
    } else if (PlayExtra_state === Play_STATE_LOADING_PLAYLIST) {
        PlayExtra_qualities = Play_extractQualities(responseText);
        PlayExtra_state = Play_STATE_PLAYING;
        PlayExtra_SetPanel();
        if (!Play_isFullScreen) Play_controls[Play_controlsChatSide].enterKey();

        if (Play_isOn) PlayExtra_qualityChanged();
    }
}

function PlayExtra_SetPanel() {
    document.getElementById('controls_' + Play_controlsChatSide).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQuality).style.display = 'none';
    document.getElementById('controls_' + Play_controlsAudio).style.display = '';
    document.getElementById('controls_' + Play_controlsQualityMini).style.display = '';
    Play_IconsResetFocus();
}

function PlayExtra_UnSetPanel() {
    document.getElementById('controls_' + Play_controlsChatSide).style.display = '';
    document.getElementById('controls_' + Play_controlsQuality).style.display = '';
    document.getElementById('controls_' + Play_controlsAudio).style.display = 'none';
    document.getElementById('controls_' + Play_controlsQualityMini).style.display = 'none';
    Play_IconsResetFocus();
}


//function PlayExtra_getQualitiesCount() {
//    return PlayExtra_qualities.length;
//}

function PlayExtra_qualityChanged() {
    //    PlayExtra_qualityIndex = 0;
    //    PlayExtra_playingUrl = PlayExtra_qualities[0].url;
    //    if (Play_quality.indexOf("source") !== -1) PlayExtra_quality = "source";

    //    for (var i = 0; i < PlayExtra_getQualitiesCount(); i++) {
    //        if (PlayExtra_qualities[i].id.indexOf(PlayExtra_quality) !== -1) {
    //            PlayExtra_qualityIndex = i;
    //            PlayExtra_playingUrl = PlayExtra_qualities[i].url;
    //            break;
    //        }
    //    }

    //    PlayExtra_qualityPlaying = PlayExtra_quality;

    if (Main_isDebug) console.log('PlayExtra_onPlayer: Auto');

    if (Main_IsNotBrowser && Play_isOn) {
        //if (PlayExtra_quality.indexOf("Auto") !== -1) Android.initializePlayer2Auto();
        //else Android.initializePlayer2(PlayExtra_playingUrl);
        try {
            Android.initializePlayer2Auto();
        } catch (e) {}
    }
}

function PlayExtra_loadDataRequest() {
    var theUrl, state = PlayExtra_state === Play_STATE_LOADING_TOKEN;

    if (state) {
        theUrl = 'https://api.twitch.tv/api/channels/' + PlayExtra_selectedChannel + '/access_token?platform=_' +
            (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token ? '&oauth_token=' +
                AddUser_UsernameArray[Main_values.Users_Position].access_token : '');
    } else {
        theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + PlayExtra_selectedChannel +
            '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
            '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true' +
            (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();
    }

    var xmlHttp;
    if (Main_IsNotBrowser) {
        xmlHttp = Android.mreadUrl(theUrl, 3000, 1, null);
        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            Play_loadDataError();
            return;
        }

        PlayExtra_loadDataSuccessreadyState(xmlHttp, state, theUrl);

    } else {
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = Play_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) PlayExtra_loadDataSuccessreadyState(xmlHttp, state, theUrl);
        };

        xmlHttp.send(null);
    }
}

function PlayExtra_loadDataSuccessreadyState(xmlHttp, state, theUrl) {
    if (xmlHttp.status === 200) {
        Play_loadingDataTry = 0;

        if (Play_isOn && !state) {
            try {
                Android.SetAuto2(theUrl);
            } catch (e) {}
        }

        PlayExtra_loadDataSuccess(xmlHttp.responseText);
    } else if (xmlHttp.status === 403) { //forbidden access
        PlayExtra_loadDataFail(STR_FORBIDDEN);
    } else if (xmlHttp.status === 404) { //off line
        PlayExtra_loadDataFail(PlayExtra_selectedChannelDisplayname + ' ' + STR_LIVE + STR_IS_OFFLINE);
    } else {
        PlayExtra_loadDataError();
    }
}

function PlayExtra_loadDataError() {
    if (Play_isOn && Play_isLive) {
        PlayExtra_loadingDataTry++;
        if (PlayExtra_loadingDataTry < Play_loadingDataTryMax) PlayExtra_loadDataRequest();
        else PlayExtra_loadDataFail(STR_PLAYER_PROBLEM_2);
    }
}

function PlayExtra_loadDataFail(Reason) {
    PlayExtra_PicturePicture = false;
    PlayExtra_selectedChannel = '';
    if (Main_IsNotBrowser) {
        Android.play(true);
        try {
            Android.mClearSmallPlayer();
        } catch (e) {}
    }
    Play_HideBufferDialog();
    Play_showWarningDialog(Reason);
    window.setTimeout(function() {
        Play_HideWarningDialog();
    }, 2500);
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
    Main_CounterDialogRst();
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
    Main_values.Users_Position = 0;
}

function AddUser_UserCodeExist(user) {
    return AddUser_UsernameArray.indexOf(user) !== -1;
}

function AddUser_IsUserSet() {
    return AddUser_UsernameArray.length > 0;
}//Spacing for reease maker not trow erros frm jshint
var Sidepannel_Isscreen = false;
var Sidepannel_Pos = 0;
var Sidepannel_PosFeed = 0;
var Sidepannel_Callback;
var Sidepannel_UpdateThumbDoc;

function Sidepannel_AddFocusEtc() {
    Main_AddClass('side_panel_' + Sidepannel_Pos, 'side_panel_text_focus');
}

function Sidepannel_RemoveFocusEtc() {
    Main_RemoveClass('side_panel_' + Sidepannel_Pos, 'side_panel_text_focus');
}

function Sidepannel_AddFocusFeed() {
    Main_AddClass(UserLiveFeed_side_ids[0] + Sidepannel_PosFeed, 'side_panel_feed_text_focus');
    document.getElementById(UserLiveFeed_side_ids[1] + Sidepannel_PosFeed).style.boxShadow = "0 0 0 2px #000000, 0 0 0 4px #FFFFFF";
    Sidepannel_Scroll();
    Sidepannel_UpdateThumb();
}

function Sidepannel_isShowing() {
    return document.getElementById('side_panel').className.indexOf('side_panel_hide') === -1;
}

function Sidepannel_RemoveFocusFeed() {
    Main_RemoveClass(UserLiveFeed_side_ids[0] + Sidepannel_PosFeed, 'side_panel_feed_text_focus');
    document.getElementById(UserLiveFeed_side_ids[1] + Sidepannel_PosFeed).style.boxShadow = "";
}

function Sidepannel_UpdateThumb() {
    var info = JSON.parse(document.getElementById(UserLiveFeed_side_ids[8] + Sidepannel_PosFeed).getAttribute('side_panel_data'));

    Sidepannel_UpdateThumbDoc.onerror = function() {
        this.onerror = null;
        this.src = IMG_404_VIDEO;
    };
    Sidepannel_UpdateThumbDoc.src = info[2] + Main_randomimg;

    Main_innerHTML('feed_thum_name', Sidepannel_partnerIcon(info[3], info[9], info[8]));
    Main_innerHTML('feed_thum_quality', info[7]);
    Main_innerHTML('feed_thum_title', twemoji.parse(info[4]));
    Main_innerHTML('feed_thum_game', (info[5] !== "" ? STR_PLAYING + info[5] : ""));
    Main_innerHTML('feed_thum_views', info[6]);

    if (Main_isElementShowing('side_panel_feed_holder') && Sidepannel_isShowing()) Main_ShowElement('side_panel_feed_thumb');
}

function Sidepannel_partnerIcon(name, partner, isrerun) {
    return '<div class="partnericon_div"> ' + name + STR_SPACE + STR_SPACE + '</div>' +
        (partner ? ('<img class="partnericon_img" alt="" src="' +
            IMG_PARTNER + '">' + STR_SPACE + STR_SPACE) : "") + '<div class="partnericon_text" style="background: #' +
        (isrerun ? 'FFFFFF; color: #000000;' : 'E21212;') + '">' + STR_SPACE + STR_SPACE +
        (isrerun ? STR_NOT_LIVE : STR_LIVE) + STR_SPACE + STR_SPACE + '</div>';
}

function Sidepannel_PreloadImgs() {
    var doc;
    for (var i = 0; i < Sidepannel_GetSize(); i++) {
        doc = document.getElementById(UserLiveFeed_side_ids[8] + i);
        if (doc !== null) {
            new Image().src = JSON.parse(doc.getAttribute('side_panel_data'))[2] + Main_randomimg;
        }
    }
}

function Sidepannel_GetSize() {
    return document.getElementById('side_panel_holder').getElementsByClassName('side_panel_feed').length;
}

function Sidepannel_KeyEnter() {
    if (!Sidepannel_Pos) {
        Sidepannel_Isscreen = false;
        if (Main_values.Main_Go !== Main_Search) {
            if (!Main_values.Search_isSearching &&
                (Main_values.Main_Go === Main_ChannelContent || Main_values.Main_Go === Main_ChannelClip || Main_values.Main_Go === Main_ChannelVod))
                ChannelContent_SetChannelValue();
            Main_OpenSearch();
        } else document.body.addEventListener("keydown", Sidepannel_Callback, false);
    } else if (Sidepannel_Pos === 1) {
        Sidepannel_Isscreen = false;
        Main_showSettings();
    } else if (Sidepannel_Pos === 2) {
        document.body.removeEventListener("keydown", Sidepannel_Callback, false);
        document.body.addEventListener("keydown", Screens_handleKeyControls);
        Main_showAboutDialog();
        Sidepannel_Isscreen = false;
    } else if (Sidepannel_Pos === 3) {
        document.body.removeEventListener("keydown", Sidepannel_Callback, false);
        document.body.addEventListener("keydown", Screens_handleKeyControls);
        Main_showControlsDialog();
        Sidepannel_Isscreen = false;
    } else if (Sidepannel_Pos === 4) Main_showExitDialog(Sidepannel_Callback);
    else if (Sidepannel_Pos === 5) Sidepannel_Go(Main_Live);
    else if (Sidepannel_Pos === 6) Sidepannel_Go(AddUser_IsUserSet() ? Main_Users : Main_addUser);
    else if (Sidepannel_Pos === 7) Sidepannel_Go(Main_Featured);
    else if (Sidepannel_Pos === 8) Sidepannel_Go(Main_games);
    else if (Sidepannel_Pos === 9) Sidepannel_Go(Main_Vod);
    else if (Sidepannel_Pos === 10) Sidepannel_Go(Main_Clip);
    Sidepannel_Hide();
}

function Sidepannel_RestoreScreen() {
    if (Sidepannel_Isscreen) {
        Sidepannel_Isscreen = false;
        Main_SwitchScreenAction();
    }
}

function Sidepannel_Go(GoTo) {
    Sidepannel_Isscreen = false;
    if (GoTo === Main_values.Main_Go) document.body.addEventListener("keydown", Sidepannel_Callback, false);
    else {
        Main_values.Main_Before = Main_values.Main_Go;
        Main_values.Main_Go = GoTo;
        Main_ExitCurrent(Main_values.Main_Before);
        Main_SwitchScreen();
    }
}

function Sidepannel_Start(callback, Isscreen) {
    Main_RemoveClass('side_panel', 'side_panel_hide');
    Sidepannel_Callback = callback;
    Sidepannel_Isscreen = Isscreen;
    document.body.removeEventListener("keydown", Sidepannel_Callback);
    Sidepannel_ShowFeed();
}


function Sidepannel_ShowFeed() {
    var hasuser = AddUser_UserIsSet();

    if (hasuser) {
        if (Play_FeedOldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) UserLiveFeed_status = false;
        Play_FeedOldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
    }

    if (!hasuser || !UserLiveFeed_ThumbNull(0, UserLiveFeed_ids[0])) UserLiveFeed_status = false;

    if (!UserLiveFeed_status && !UserLiveFeed_loadingData) UserLiveFeed_StartLoad();

    if (hasuser) {
        if (Main_isElementShowing('side_panel_feed_holder')) {
            document.body.addEventListener("keydown", Sidepannel_handleKeyDown, false);
            if (document.getElementById(UserLiveFeed_side_ids[0] + Sidepannel_PosFeed) !== null) {
                Sidepannel_PreloadImgs();
                Sidepannel_AddFocusFeed();
            }
        } else {
            document.body.addEventListener("keydown", Sidepannel_handleKeyDownEtc, false);
        }
    } else {
        Main_HideElement('side_panel_feed_holder');
        Main_ShowElement('side_panel_etc');
        document.body.addEventListener("keydown", Sidepannel_handleKeyDownEtc, false);
    }
}

function Sidepannel_Hide() {
    Main_AddClass('side_panel', 'side_panel_hide');
    Main_HideElement('side_panel_feed_thumb');
    Sidepannel_RemoveFocusEtc();
    Sidepannel_Pos = 0;
    Sidepannel_AddFocusEtc();
    document.body.removeEventListener("keydown", Sidepannel_handleKeyDown);
    document.body.removeEventListener("keydown", Sidepannel_handleKeyDownEtc);
}

function Sidepannel_Scroll() {
    var value = '1%'; //default
    if (Sidepannel_PosFeed > 5) { //Start scrolling in the middle
        if (Sidepannel_PosFeed < (Sidepannel_GetSize() - 5))
            value = 'calc(-18.1% *' + (Sidepannel_PosFeed - 5) + ')';
        else if (((Sidepannel_GetSize() - 5) - 6) > 0) //if we are in the 5 left
            value = 'calc(-18.1% *' + ((Sidepannel_GetSize() - 5) - 6) + ')';
    }

    document.getElementById('side_panel_holder').style.marginTop = value;
}

function Sidepannel_handleKeyDown(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
            Sidepannel_Hide();
            if (Sidepannel_Isscreen) {
                Sidepannel_Isscreen = false;
                Main_SwitchScreenAction();
            } else {
                document.body.addEventListener("keydown", Sidepannel_Callback, false);
                Main_CenterLablesChange();
            }
            break;
        case KEY_LEFT:
            document.body.removeEventListener("keydown", Sidepannel_handleKeyDown);
            document.body.addEventListener("keydown", Sidepannel_handleKeyDownEtc, false);
            Main_HideElement('side_panel_feed_thumb');
            Main_HideElement('side_panel_feed_holder');
            Main_ShowElement('side_panel_etc');
            break;
        case KEY_RIGHT:
            UserLiveFeed_FeedRefreshFocus();
            break;
        case KEY_UP:
            if (Sidepannel_PosFeed && !UserLiveFeed_loadingData) {
                Sidepannel_RemoveFocusFeed();
                Sidepannel_PosFeed--;
                Sidepannel_AddFocusFeed();
            }
            break;
        case KEY_DOWN:
            if (Sidepannel_PosFeed < (Sidepannel_GetSize() - 1) && !UserLiveFeed_loadingData) {
                Sidepannel_RemoveFocusFeed();
                Sidepannel_PosFeed++;
                Sidepannel_AddFocusFeed();
            }
            break;
        case KEY_ENTER:
            var doc = document.getElementById("side_panel");
            doc.style.transition = 'none';
            Sidepannel_Hide();
            Main_values.Play_isHost = false;
            Play_UserLiveFeedPressed = true;
            Sidepannel_Isscreen = false;
            Main_ready(function() {
                Main_OpenLiveStream(Sidepannel_PosFeed, UserLiveFeed_side_ids, Sidepannel_handleKeyDown);
                doc.style.transition = '';
            });
            break;
        default:
            break;
    }
}

function Sidepannel_handleKeyDownEtc(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
        case KEY_LEFT:
            Sidepannel_Hide();
            if (Sidepannel_Isscreen) {
                Sidepannel_Isscreen = false;
                Main_SwitchScreenAction();
            } else {
                document.body.addEventListener("keydown", Sidepannel_Callback, false);
                Main_CenterLablesChange();
            }
            break;
        case KEY_RIGHT:
            if (AddUser_UserIsSet()) {
                document.body.removeEventListener("keydown", Sidepannel_handleKeyDownEtc);
                document.body.addEventListener("keydown", Sidepannel_handleKeyDown, false);
                Main_HideElement('side_panel_etc');
                Main_ShowElement('side_panel_feed_holder');
                Main_ShowElement('side_panel_feed_thumb');
            } else {
                Main_showWarningDialog(STR_NOKUSER_WARN);
                window.setTimeout(Main_HideWarningDialog, 2000);
            }
            break;
        case KEY_UP:
            if (Sidepannel_Pos) {
                Sidepannel_RemoveFocusEtc();
                Sidepannel_Pos--;
                Sidepannel_AddFocusEtc();
            }
            break;
        case KEY_DOWN:
            if (Sidepannel_Pos < 10) {
                Sidepannel_RemoveFocusEtc();
                Sidepannel_Pos++;
                Sidepannel_AddFocusEtc();
            }
            break;
        case KEY_ENTER:
            Sidepannel_KeyEnter();
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
var extraEmotesDone = {
    bbtv: {},
    ffz: {}
};
var extraEmotes = {};

var ChatLive_selectedChannel_id;
var ChatLive_selectedChannel;

//Variable initialization end

function ChatLive_Init() { // jshint ignore:line
    ChatLive_Clear();
    if (Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }
    if (!Chat_LoadGlobal) Chat_loadBadgesGlobal();

    ChatLive_loaded = false;

    Main_ready(function() {
        ChatLive_Id = (new Date()).getTime();
        ChatLive_selectedChannel_id = Main_values.Play_selectedChannel_id;
        ChatLive_selectedChannel = Main_values.Play_selectedChannel;
        ChatLive_loadBadgesChannel(ChatLive_Id, ChatLive_loadBadgesChannelSuccess);
    });

}

function ChatLive_loadBadgesChannel(id, callbackSucess) {
    ChatLive_loadingDataTry = 0;
    ChatLive_loadBadgesChannelRequest(id, callbackSucess);
}

function ChatLive_loadBadgesChannelRequest(id, callbackSucess) {
    var theUrl = 'https://badges.twitch.tv/v1/badges/channels/' + ChatLive_selectedChannel_id + '/display';
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                callbackSucess(xmlHttp.responseText, id);
                return;
            } else {
                ChatLive_loadBadgesChannelError(id, callbackSucess);
            }
        }
    };

    xmlHttp.send(null);
}

function ChatLive_loadBadgesChannelError(id, callbackSucess) {
    ChatLive_loadingDataTry++;
    if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadBadgesChannelRequest(id, callbackSucess);
    else {
        if (ChatLive_Id === id) ChatLive_loadBadgesChannelId = window.setTimeout(function() {
            ChatLive_loadBadgesChannelRequest(id, callbackSucess);
        }, 500);
    }
}

function ChatLive_loadBadgesChannelSuccess(responseText, id) {
    Chat_loadBadgesTransform(responseText);

    ChatLive_loadEmotesChannel();
    ChatLive_loadEmotesChannelffz();
    if (ChatLive_Id === id) ChatLive_loadChat();
}

function ChatLive_loadEmotesChannel() {
    if (!extraEmotesDone.bbtv[ChatLive_selectedChannel_id]) {
        ChatLive_loadingDataTry = 0;
        ChatLive_loadEmotesChannelRequest();
    }
}

function ChatLive_loadEmotesChannelRequest() {
    var theUrl = 'https://api.betterttv.net/2/channels/' + encodeURIComponent(ChatLive_selectedChannel);
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                ChatLive_loadEmotesChannelSuccess(xmlHttp.responseText);
            } else if (xmlHttp.status === 404) { //not supported by this channel
                extraEmotesDone.bbtv[ChatLive_selectedChannel_id] = 1;
            } else {
                ChatLive_loadEmotesChannelError();
            }
        }
    };

    xmlHttp.send(null);
}

function ChatLive_loadEmotesChannelError() {
    ChatLive_loadingDataTry++;
    if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadEmotesChannelRequest();
}

function ChatLive_loadEmotesChannelSuccess(data) {
    ChatLive_loadEmotesbbtv(JSON.parse(data));
    extraEmotesDone.bbtv[ChatLive_selectedChannel_id] = 1;
}

function ChatLive_loadEmotesChannelffz() {
    if (!extraEmotesDone.ffz[ChatLive_selectedChannel_id]) {
        ChatLive_loadingDataTry = 0;
        ChatLive_loadEmotesChannelffzRequest();
    }
}

function ChatLive_loadEmotesChannelffzRequest() {
    var theUrl = 'https://api.frankerfacez.com/v1/room/' + encodeURIComponent(ChatLive_selectedChannel);
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                ChatLive_loadEmotesChannelffzSuccess(xmlHttp.responseText);
            } else if (xmlHttp.status === 404) { //not supported by this channel
                extraEmotesDone.ffz[ChatLive_selectedChannel_id] = 1;
            } else {
                ChatLive_loadEmotesChannelffzError();
            }
        }
    };

    xmlHttp.send(null);
}

function ChatLive_loadEmotesChannelffzError() {
    ChatLive_loadingDataTry++;
    if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadEmotesChannelffzRequest();
}

function ChatLive_loadEmotesChannelffzSuccess(data) {
    ChatLive_loadEmotesffz(JSON.parse(data));
    extraEmotesDone.ffz[ChatLive_selectedChannel_id] = 1;
}

function ChatLive_loadEmotesbbtv(data) {
    data.emotes.forEach(function(emote) {
        extraEmotes[emote.code] = {
            code: emote.code,
            id: emote.id,
            '3x': 'https:' + data.urlTemplate.replace('{{id}}', emote.id).replace('{{image}}', '3x')
        };
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
                    '3x': 'https:' + (emoticon.urls[4] || (emoticon.urls[2] || emoticon.urls[1].replace(/1$/, '2')))
                };

            });
        }
    });
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
        ChatLive_socket.send('JOIN #' + ChatLive_selectedChannel + '\r\n');
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

                if (Play_ChatDelayPosition) {
                    var stringSec = STR_SECOND;
                    if (Play_controls[Play_controlsChatDelay].defaultValue > 1) stringSec = STR_SECONDS;

                    div += '&nbsp;<span class="message">' + STR_BR + STR_BR + STR_CHAT_DELAY + ' ' +
                        Play_controls[Play_controlsChatDelay].values[Play_controls[Play_controlsChatDelay].defaultValue] +
                        stringSec + '</span>';
                }

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

    div += '<span class="message">' + ChatLive_extraMessageTokenize(emoticonize(mmessage, emotes)) + '</span>';

    if (!Play_ChatDelayPosition) ChatLive_LineAdd(div);
    else {
        var id = ChatLive_Id;
        window.setTimeout(function() {
            if (id === ChatLive_Id) ChatLive_LineAdd(div);
        }, (Play_controls[Play_controlsChatDelay].values[Play_controls[Play_controlsChatDelay].defaultValue] * 1000));
    }
}

function ChatLive_extraMessageTokenize(tokenizedMessage) {

    for (var i = 0; i < tokenizedMessage.length; i++) {
        if (typeof tokenizedMessage[i] === 'string') {
            tokenizedMessage[i] = extraMessageTokenize(tokenizedMessage[i]);
        } else {
            tokenizedMessage[i] = tokenizedMessage[i][0];
        }
    }

    return twemoji.parse(tokenizedMessage.join(' '), true, true);
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
        Main_HideElement('topbar');
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
        '<div id="' + Users_ids[3] + id + '" class="stream_channel" style="text-align: center;">' + stream_type + '</div></div>';

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
                Main_ScrollTable(Users_ids[5], (document.getElementById(Users_ids[4] + Users_cursorY + '_' + Users_cursorX).offsetTop * -1) + (screen.height * 0.42));

        } else Main_ScrollTable(Users_ids[5], ((screen.height / 100) * 7));

    } else Main_handleKeyUp();
    if (Main_CenterLablesInUse) Users_removeFocus();
}

function Users_removeFocus() {
    Main_addFocusFinish = false;
    Main_RemoveClass(Users_ids[0] + Users_cursorY + '_' + Users_cursorX, 'stream_thumbnail_focused');
}

//TODO add a temp user for when going back and for from user to games or etc
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
        if (!Users_cursorX) {
            inUseObj = UserLive;
            Screens_init();
        } else if (Users_cursorX === 1) {
            inUseObj = UserHost;
            Screens_init();
        } else if (Users_cursorX === 2) {
            inUseObj = UserGames;
            Screens_init();
        } else if (Users_cursorX === 3) {
            inUseObj = UserVod;
            Screens_init();
        } else if (Users_cursorX === 4) {
            inUseObj = UserChannels;
            Screens_init();
        } else if (Users_cursorX === 5) {
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
            Sidepannel_RestoreScreen();
            break;
        case KEY_LEFT:
            if (Users_isRemoveDialogShown()) {
                Users_RemoveCursor--;
                if (Users_RemoveCursor < 0) Users_RemoveCursor = 1;
                Users_RemoveCursorSet();
                Users_clearRemoveDialog();
                Users_setRemoveDialog();
            } else if (!Users_cursorX) {
                Users_removeFocus();
                Sidepannel_Start(Users_handleKeyDown, true);
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
            if (!Users_cursorY) {
                Users_removeFocus();
                Main_CenterLablesStart(Users_handleKeyDown);
            } else {
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
                        var scope = 'user_read+user_follows_edit+user_subscriptions';
                        var force_verify = 'true';
                        var url = baseUrlCode + 'response_type=' + type_code + '&client_id=' + encodeURIComponent(client_id) +
                            '&redirect_uri=' + redirect_uri + '&scope=' + scope + '&force_verify=' + force_verify;
                        window.location = url;
                    }
                }
            } else Users_keyEnter();
            break;
        case KEY_PG_DOWN:
        case KEY_PG_UP:
            Screens_SwitchScreen(event);
            break;
        case KEY_REFRESH:
            Main_ReloadScreen();
            break;
        default:
            break;
    }
}//Variable initialization
var Play_ChatPositions = 0;
var Play_ChatPositionConvertBefore = Play_ChatPositions;
var Play_PlayerPanelOffset = -5;
var Play_ChatBackground = 0.55;
var Play_ChatSizeValue = 2;
var Play_PanelHideID = null;
var Play_quality = "Auto";
var Play_qualityPlaying = Play_quality;
var Play_isFullScreen = true;
var Play_ChatPositionsBF;
var Play_ChatEnableBF;
var Play_ChatSizeValueBF;
var Play_isHost = false;
var Play_FeedOldUserName = '';
var Play_FeedPos = 0;
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

var Play_streamInfoTimerId = null;
var Play_tokenResponse = 0;
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
var Play_DialogEndText = '';
var Play_currentTime = 0;
var Play_watching_time = 0;
var Play_ChatDelayPosition = 0;
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

var Play_ChatFontObj = ['chat_extra_small', 'chat_size_small', 'chat_size_default', 'chat_size_biger', 'chat_size_bigest'];

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

    try {
        Android.mSetPlayerPosition(Play_PicturePicturePos);
        Android.mSetPlayerSize(Play_PicturePictureSize);
    } catch (e) {}

    Play_SetQuality();

    Play_ChatSize(false);
    Play_ChatBackgroundChange(false);
    Play_SetChatFont();
}

function Play_SetQuality() {
    Play_quality = Settings_Obj_values('default_quality').replace(STR_SOURCE, "source");
    Play_qualityPlaying = Play_quality;

    PlayVod_quality = Play_quality;
    PlayVod_qualityPlaying = Play_quality;
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
        Play_ChatSizeValue = 3;
        Play_ChatPositionConvert(true);
        Play_ChatSize(false);
        if (Chat_div) Chat_div.scrollTop = Chat_div.scrollHeight;
    }

    //TODO remove the try some day after the app update has be live for some time
    Android.mupdatesize(!Play_isFullScreen);

    Main_setItem('Play_isFullScreen', Play_isFullScreen);
}

function Play_SetChatFont() {
    for (var i = 0; i < Play_ChatFontObj.length; i++)
        Main_RemoveClass('chat_inner_container', Play_ChatFontObj[i]);

    Main_AddClass('chat_inner_container', Play_ChatFontObj[Main_values.Chat_font_size]);
}

function Play_Start() {
    Play_showBufferDialog();

    Main_empty('stream_info_title');
    Play_LoadLogoSucess = false;
    PlayClip_HasVOD = true;
    //reset channel logo to prevent another channel logo
    Play_LoadLogo(document.getElementById('stream_info_icon'), IMG_404_LOGO_TEMP);

    //past broadcast
    document.getElementById('controls_' + Play_controlsOpenVod).style.display = 'none';
    //Chat delay
    document.getElementById('controls_' + Play_controlsChatDelay).style.display = '';
    if (!PlayExtra_PicturePicture) PlayExtra_UnSetPanel();
    Play_CurrentSpeed = 3;

    Play_ShowPanelStatus(1);

    Play_IconsResetFocus();

    PlayClip_HideShowNext(0, 0);
    PlayClip_HideShowNext(1, 0);

    Main_values.Play_WasPlaying = 1;
    Main_SaveValues();

    Play_isHost = Main_values.Play_isHost;
    Main_values.Play_isHost = false;
    Play_RestoreFromResume = false;
    Main_ShowElement('controls_holder');

    Play_currentTime = 0;
    Play_watching_time = new Date().getTime();
    Main_innerHTML("stream_watching_time", STR_SPACE + "|" + STR_SPACE + STR_WATCHING + Play_timeS(0));
    Play_created = Play_timeMs(0);

    Main_textContent("stream_live_time", Play_created);
    Main_HideElement('progress_bar_div');

    Play_UserLiveFeedPressed = false;
    Play_EndSet(1);
    Play_PlayerPanelOffset = -5;
    Play_updateStreamInfoErrorTry = 0;
    Play_loadingInfoDataTry = 0;
    Play_loadingInfoDataTimeout = 3000;
    Play_isLive = true;
    Play_tokenResponse = 0;
    Play_playingTry = 0;
    Play_isOn = true;
    Play_Playing = false;
    Play_state = Play_STATE_LOADING_TOKEN;
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
    if (PlayClip_isOn) PlayClip_shutdownStream();
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
        Play_watching_time = new Date().getTime();
        Play_isOn = true;
        Play_clearPause();
        if (Play_isOn) {
            Play_showBufferDialog();
            Play_loadingInfoDataTry = 0;
            Play_loadingInfoDataTimeout = 3000;
            Play_RestoreFromResume = true;
            if (!Play_LoadLogoSucess) Play_updateStreamInfoStart();
            else Play_updateStreamInfo();
            Play_ResumeAfterOnlineCounter = 0;
            if (navigator.onLine) Play_ResumeAfterOnline();
            else Play_ResumeAfterOnlineId = window.setInterval(Play_ResumeAfterOnline, 100);
            Play_streamInfoTimerId = window.setInterval(Play_updateStreamInfo, 60000);
            window.clearInterval(Play_ShowPanelStatusId);

            Play_ShowPanelStatusId = window.setInterval(function() {
                Play_UpdateStatus(1);
            }, 1000);
        }
    }
}

function Play_ResumeAfterOnline() {
    if (navigator.onLine || Play_ResumeAfterOnlineCounter > 200) {
        window.clearInterval(Play_ResumeAfterOnlineId);
        Play_state = Play_STATE_LOADING_TOKEN;
        Play_loadData();
        if (PlayExtra_PicturePicture) PlayExtra_Resume();
    }
    Play_ResumeAfterOnlineCounter++;
}

function Play_updateStreamInfoStart() {
    var theUrl = 'https://api.twitch.tv/kraken/streams/' + Main_values.Play_selectedChannel_id;
    BasexmlHttpGet(theUrl, Play_loadingInfoDataTimeout, 2, null, Play_updateStreamInfoStartValues, Play_updateStreamInfoStartError, false);
}

function Play_partnerIcon(name, partner, islive, lang) {
    var div = '<div class="partnericon_div"> ' + name + STR_SPACE + STR_SPACE + '</div>' +
        (partner ? ('<img class="partnericon_img" alt="" src="' +
            IMG_PARTNER + '">') : "");

    if (islive) {
        div += STR_SPACE + STR_SPACE + '<div class="partnericon_text" style="background: #' +
            (Main_values.IsRerun ? 'FFFFFF; color: #000000;' : 'E21212;') + '">' +
            STR_SPACE + STR_SPACE + (Main_values.IsRerun ? STR_NOT_LIVE : STR_LIVE) + STR_SPACE + STR_SPACE + '</div>';
    }

    div += '<div class="lang_text" ">' + STR_SPACE + STR_SPACE + lang + '</div>';

    Main_innerHTML("stream_info_name", div);
}

function Play_updateStreamInfoStartValues(response) {
    response = JSON.parse(response);
    if (response.stream !== null) {
        Main_values.IsRerun = Main_is_rerun(response.stream.stream_type);

        Main_values.Play_selectedChannel_id = response.stream.channel._id;
        Main_innerHTML("stream_info_title", twemoji.parse(response.stream.channel.status, false, true));
        Main_values.Play_gameSelected = response.stream.game;
        Play_Lang = ' [' + (response.stream.channel.broadcaster_language).toUpperCase() + ']';

        Play_partnerIcon(Play_isHost ? Main_values.Play_DisplaynameHost : Main_values.Play_selectedChannelDisplayname, response.stream.channel.partner, true, Play_Lang);

        var playing = (Main_values.Play_gameSelected !== "" ? STR_PLAYING + Main_values.Play_gameSelected : "");
        Main_textContent("stream_info_game", playing);

        Main_innerHTML("stream_live_viewers", STR_SPACE + STR_FOR + Main_addCommas(response.stream.viewers) + ' ' + STR_VIEWER);
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
        Main_innerHTML("stream_info_title", twemoji.parse(response.stream.channel.status, false, true));
        Main_values.Play_gameSelected = response.stream.game;
        Main_textContent("stream_info_game", STR_PLAYING + Main_values.Play_gameSelected);

        Main_innerHTML("stream_live_viewers", STR_SPACE + STR_FOR + Main_addCommas(response.stream.viewers) +
            ' ' + STR_VIEWER);

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

function Play_loadDataRequest() {
    var theUrl, state = Play_state === Play_STATE_LOADING_TOKEN;

    if (state) {
        theUrl = 'https://api.twitch.tv/api/channels/' + Main_values.Play_selectedChannel + '/access_token?platform=_' +
            (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token ? '&oauth_token=' +
                AddUser_UsernameArray[Main_values.Users_Position].access_token : '');
    } else {
        theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + Main_values.Play_selectedChannel +
            '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
            '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true' +
            (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();
    }

    var xmlHttp;
    if (Main_IsNotBrowser) {

        xmlHttp = Android.mreadUrl(theUrl, Play_loadingDataTimeout, 1, null);
        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            Play_loadDataError();
            return;
        }
        if (xmlHttp.status === 200) {
            Play_loadingDataTry = 0;
            if (Play_isOn) {
                if (!state) Android.SetAuto(theUrl);
                Play_loadDataSuccess(xmlHttp.responseText);
            }
        } else if (xmlHttp.status === 403) { //forbidden access
            Play_ForbiddenLive();
        } else if (xmlHttp.status === 404) { //off line
            Play_CheckHostStart();
        } else {
            Play_loadDataError();
        }

    } else {
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, true);
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
                    if (Main_IsNotBrowser) Play_ForbiddenLive();
                    else Play_loadDataSuccessFake();
                } else if (xmlHttp.status === 404) { //off line
                    Play_loadDataErrorLog(xmlHttp);
                    if (Main_IsNotBrowser) Play_CheckHostStart();
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
        if (Play_loadingDataTry < (Play_loadingDataTryMax + (Play_RestoreFromResume ? 7 : 0))) {
            Play_loadingDataTimeout += 250;
            if (Play_RestoreFromResume) window.setTimeout(Play_loadDataRequest, 500);
            else Play_loadDataRequest();
        } else {
            if (Main_IsNotBrowser) Play_CheckHostStart();
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
            'id': 'Auto',
            'band': 0,
            'codec': 'avc',
            'url': ''
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
    ];
    Play_state = Play_STATE_PLAYING;
    if (Play_isOn) Play_qualityChanged();
}

function Play_loadDataSuccess(responseText) {
    if (Play_state === Play_STATE_LOADING_TOKEN) {
        Play_tokenResponse = JSON.parse(responseText);
        Play_state = Play_STATE_LOADING_PLAYLIST;
        Play_loadData();
    } else if (Play_state === Play_STATE_LOADING_PLAYLIST) {
        Play_qualities = Play_extractQualities(responseText);
        Play_state = Play_STATE_PLAYING;
        if (Play_isOn) Play_qualityChanged();
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
                'url': ''
            });
            if (TempId.indexOf('ource') === -1) TempId = TempId + ' | source';
            else TempId = TempId.replace('(', ' | ').replace(')', '');
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
    while (marray = myRegexp.exec(input)) result.push(marray[0]); // jshint ignore:line 

    return result;
}

function Play_qualityChanged() {
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
    Play_SetHtmlQuality('stream_quality');

    Play_state = Play_STATE_PLAYING;
    if (Main_isDebug) console.log('Play_onPlayer:', '\n' + '\n"' + Play_playingUrl + '"\n');

    if (Main_IsNotBrowser && Play_isOn) {
        if (Play_quality.indexOf("Auto") !== -1 || PlayExtra_PicturePicture) Android.StartAuto(1, 0);
        else Android.startVideo(Play_playingUrl, 1);
    }

    Play_onPlayer();
}

function Play_SetHtmlQuality(element) {
    if (!Play_qualities[Play_qualityIndex].hasOwnProperty('id')) return;

    Play_quality = Play_qualities[Play_qualityIndex].id;

    var quality_string = '';

    if (Play_quality.indexOf('source') !== -1) quality_string = Play_quality.replace("source", STR_SOURCE);
    else quality_string = Play_quality;

    quality_string += Play_quality.indexOf('Auto') === -1 ? Play_qualities[Play_qualityIndex].band + Play_qualities[Play_qualityIndex].codec : "";

    Main_innerHTML(element, quality_string);
}

function Play_onPlayer() {
    if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
    Play_SetFullScreen(Play_isFullScreen);
    Play_Playing = true;
    Play_loadChat();
}

function Play_loadChat() {
    if (Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }

    ChatLive_Init();
}

//called by android PlayerActivity
function Play_PlayerCheck(mwhocall) { // jshint ignore:line
    if (mwhocall === 1) {

        if (Play_qualityPlaying.indexOf("Auto") !== -1) Play_qualityChanged();
        else if (navigator.onLine && (Play_qualityIndex < Play_getQualitiesCount() - 1)) {
            Play_qualityIndex++;
            Play_qualityDisplay();
            Play_qualityChanged();
        } else Play_EndStart(false, 1);

    } else if (mwhocall === 2) {

        if (PlayVod_quality.indexOf("Auto") !== -1) PlayVod_qualityChanged();
        else if (navigator.onLine && (PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1)) {
            PlayVod_qualityIndex++;
            PlayVod_qualityDisplay();
            PlayVod_qualityChanged();
        } else Play_EndStart(false, 2);

    } else if (mwhocall === 3) {

        if (navigator.onLine && (PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1)) {
            PlayClip_qualityIndex++;
            PlayClip_qualityDisplay();
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
    return Play_timeS(parseInt(time / 1000));
}

function Play_streamLiveAt(time) { //time in '2017-10-27T13:27:27Z'
    return Play_timeMs((new Date().getTime()) - (new Date(time).getTime()));
}

function Play_shutdownStream() {
    if (Play_isOn) {
        Play_PreshutdownStream();
        Play_qualities = [];
        Main_values.Play_WasPlaying = 0;
        Play_exitMain();
    }
}

function Play_PreshutdownStream() {
    if (Main_IsNotBrowser) {
        //we are updating the main player via live feed
        try {
            if (PlayExtra_PicturePicture) Android.mClearBigPlayer();
            else {
                //We are closing the player on error or on end
                Android.mClearSmallPlayer();
                Android.stopVideo(1);
            }
        } catch (e) {}
    }

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
    window.clearInterval(Play_ShowPanelStatusId);
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
}

function Play_isPanelShown() {
    return document.getElementById("scene_channel_panel").style.opacity === '1';
}

function Play_hidePanel() {
    //return;//return;
    Play_clearHidePanel();
    Play_ForceHidePannel();
    Play_quality = Play_qualityPlaying;
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
    if (Play_Status_Always_On) {

        window.clearInterval(Play_ShowPanelStatusId);

        Play_ShowPanelStatusId = window.setInterval(function() {
            Play_UpdateStatus(mwhocall);
        }, 1000);

        Main_ShowElement('playsideinfo');
        Main_AddClass('playsideinfo', 'playsideinfofocus');
    } else {
        Main_HideElement('playsideinfo');
        Main_RemoveClass('playsideinfo', 'playsideinfofocus');
        window.clearInterval(Play_ShowPanelStatusId);
    }
}
//tdo cleac 
function Play_UpdateStatus(mwhocall) {
    if (Main_IsNotBrowser) {
        var value = null;

        if (mwhocall === 1) {

            if (Play_qualityPlaying.indexOf("Auto") === -1) Play_SetHtmlQuality('stream_quality');
            else {
                value = Android.getVideoQuality();
                if (value !== null && value !== undefined) Play_getVideoQuality(value);
            }

        } else if (mwhocall === 2) {

            if (PlayVod_qualityPlaying.indexOf("Auto") === -1) PlayVod_SetHtmlQuality('stream_quality');
            else {
                value = Android.getVideoQuality();
                if (value !== null && value !== undefined) Play_getVideoQuality(value);
            }

        }

        try {
            Play_Status(Android.getVideoStatus());
        } catch (e) {}
    } else Play_StatusFake();
}

function Play_showPanel() {
    PlayVod_IconsBottonResetFocus();
    Play_qualityIndexReset();
    Play_qualityDisplay();
    PlayExtra_ResetSpeed();
    PlayExtra_ResetAudio();
    if (Play_qualityPlaying.indexOf("Auto") === -1) Play_SetHtmlQuality('stream_quality');
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
    Main_innerHTML("stream_watching_time", STR_SPACE + "|" + STR_SPACE +
        STR_WATCHING + Play_timeMs((new Date().getTime()) - (Play_watching_time)));

    Main_innerHTML("stream_live_time", STR_SINCE +
        (Play_created.indexOf('00:00') === -1 ? Play_streamLiveAt(Play_created) : '00:00'));

    if (!Play_Status_Always_On) {
        if (Play_qualityPlaying.indexOf("Auto") !== -1 && Main_IsNotBrowser) {
            var value = Android.getVideoQuality();

            if (value !== null && value !== undefined) Play_getVideoQuality(value);
            else Play_SetHtmlQuality('stream_quality');
        }

        if (Main_IsNotBrowser) {
            try {
                Play_Status(Android.getVideoStatus());
            } catch (e) {}
        } else Play_StatusFake();
    }
}

function Play_StatusFake() {
    Main_innerHTML("stream_status", "Net Speed:&nbsp;&nbsp;&nbsp;90.00 (90.00 Avg) Mbps" + STR_BR +
        "Net Activity: 20.00 (20.00 Avg) Mb" + STR_BR + "Drooped frames: 100 (100 Today)" + STR_BR +
        " Buffer health: 22.22 s");
}

function Play_Status(value) {
    value = value.split(',');

    Main_innerHTML("stream_status", "Net Speed:" + STR_SPACE + STR_SPACE + STR_SPACE + Play_getMbps(value[2]) +
        " (" + value[3] + " Avg) Mbps" + STR_BR + "Net Activity: " + Play_getMbps(value[4]) + " (" +
        value[5] + " Avg) Mb" + STR_BR + "Drooped frames: " + value[0] + " (" + value[1] + " Today)" +
        STR_BR + " Buffer health: " + Play_getBuffer(value[6]));
}

function Play_getMbps(value) {
    value = (parseInt(value) / 1000000).toFixed(2);

    return (parseInt(value) < 10 ? (STR_SPACE + STR_SPACE + value) : value);
}

function Play_getBuffer(value) {
    value = (value > 0 ? (value / 1000).toFixed(2) : 0);

    return (parseInt(value) < 10 ? (STR_SPACE + value) : value) + " s";
}

function Play_getVideoQuality(value) {
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
    return Play_qualities.length;
}

function Play_ChatSize(showDialog) {
    if (Play_ChatSizeValue > 3) Play_ChatSizeValue = 3;
    Play_chat_container.style.height = Play_ChatSizeVal[Play_ChatSizeValue].containerHeight + '%';
    document.getElementById("play_chat_dialog").style.marginTop = Play_ChatSizeVal[Play_ChatSizeValue].dialogTop + '%';
    Play_ChatPosition();
    ChatLive_ChatFixPosition();

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
    var bool = (Play_ChatSizeValue === 3);

    if (Play_ChatPositions < 0) Play_ChatPositions = (bool ? 2 : 7);
    else if (Play_ChatPositions > (bool ? 2 : 7)) Play_ChatPositions = 0;

    Play_chat_container.style.top = (bool ? 0.2 : (Play_ChatPositionVal[Play_ChatPositions].top + Play_ChatPositionVal[Play_ChatPositions].sizeOffset[Play_ChatSizeValue])) + '%';

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
        Play_HideBufferDialog();

        Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i> </div>');

        if (Play_isPanelShown()) {
            if (PlayVodClip === 1) Play_hidePanel();
            else if (PlayVodClip === 2) PlayVod_hidePanel();
            else if (PlayVodClip === 3) PlayClip_hidePanel();
        }

        if (Main_IsNotBrowser) {
            Android.play(true);
        }
    } else {
        Play_HideBufferDialog();

        Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-play-1"></i> </div>');

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
    UserLiveFeed_Hide();
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
                PlayExtra_selectedChannel = '';
                Play_shutdownStream();
            } else if (PlayVodClip === 2) PlayVod_shutdownStream();
            else if (PlayVodClip === 3) {
                if (PlayClip_HasNext && (PlayClip_All || PlayClip_All_Forced)) PlayClip_PlayNext();
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
                Play_showWarningDialog(STR_CLIP_FAIL);
                window.setTimeout(function() {
                    Play_HideWarningDialog();
                }, 2000);
            } else {
                PlayVod_replay = true;
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
        } else {
            PlayClip_OpenVod();
            if (!PlayClip_HasVOD) canhide = false;
        }
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
        document.getElementById('dialog_end_-1').style.display = 'none';
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'inline-block';
        Main_textContent("dialog_end_vod_text", STR_OPEN_HOST);
    } else if (PlayVodClip === 1) { // play
        Play_EndIconsRemoveFocus();
        Play_Endcounter = 2;
        Play_EndIconsAddFocus();
        document.getElementById('dialog_end_-1').style.display = 'none';
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'none';
    } else if (PlayVodClip === 2) { // vod
        Play_EndIconsResetFocus();
        document.getElementById('dialog_end_-1').style.display = 'none';
        document.getElementById('dialog_end_0').style.display = 'inline-block';
        document.getElementById('dialog_end_1').style.display = 'none';
    } else if (PlayVodClip === 3) { // clip
        Play_EndIconsResetFocus();
        document.getElementById('dialog_end_-1').style.display = PlayClip_HasNext ? 'inline-block' : 'none';
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
        PlayExtra_PicturePicture = false;
        PlayExtra_selectedChannel = '';
        Main_values.Main_selectedChannel_id = Main_values.Play_selectedChannel_id;
        Main_values.Main_selectedChannel = Main_values.Play_selectedChannel;
        Main_values.Main_selectedChannelDisplayname = Main_values.Play_selectedChannelDisplayname;
        ChannelContent_UserChannels = AddCode_IsFallowing;
        Play_hideChat();
        Play_shutdownStream();
    } else if (PlayVodClip === 2) PlayVod_shutdownStream();
    else if (PlayVodClip === 3) PlayClip_shutdownStream();
}

//TODO improve this
function Play_OpenSearch(PlayVodClip) {
    if (PlayVodClip === 1) {
        PlayExtra_PicturePicture = false;
        PlayExtra_selectedChannel = '';
        Play_hideChat();
        Play_PreshutdownStream();
    } else if (PlayVodClip === 2) PlayVod_PreshutdownStream();
    else if (PlayVodClip === 3) PlayClip_PreshutdownStream();

    Main_values.Play_WasPlaying = 0;
    PlayVod_ProgresBarrUpdate(0, 0);
    Main_ShowElement('scene1');
    Main_HideElement('scene2');
    Main_updateclock();
    document.body.addEventListener("keyup", Main_handleKeyUp, false);
    Main_OpenSearch();
}

function Play_OpenGame(PlayVodClip) {
    if (Main_values.Play_gameSelected === '') {
        Play_clearHidePanel();
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

    Main_values.Main_gameSelected = Main_values.Play_gameSelected;
    Play_hideChat();
    if (PlayVodClip === 1) {
        PlayExtra_PicturePicture = false;
        PlayExtra_selectedChannel = '';
        Play_shutdownStream();
    } else if (PlayVodClip === 2) PlayVod_shutdownStream();
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

//TODO improve this position base
function Play_qualityDisplay() {
    if (Play_getQualitiesCount() === 1) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "0";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "0";
    } else if (!Play_qualityIndex) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "0.2";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "1";
    } else if (Play_qualityIndex === Play_getQualitiesCount() - 1) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "1";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "0.2";
    } else {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "1";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "1";
    }

    Play_SetHtmlQuality('controls_name_' + Play_controlsQuality);
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

//called by android PlayerActivity
function Play_PannelEndStart(PlayVodClip) { // jshint ignore:line
    if (PlayVodClip === 1) { //live
        PlayExtra_PicturePicture = false;
        PlayExtra_selectedChannel = '';
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

function Play_CheckHostStart() {
    Play_showBufferDialog();
    Play_state = -1;
    Play_loadingDataTry = 0;
    Play_loadingDataTimeout = 2000;
    ChatLive_Clear();
    window.clearInterval(Play_streamInfoTimerId);
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

function Play_UpdateDuration(mwhocall, duration) { // jshint ignore:line
    if (duration > 0) {
        if (mwhocall === 2) PlayVod_UpdateDuration(duration);
        else if (mwhocall === 3) PlayClip_UpdateDuration(duration);
    }
}

function Play_setFallow() {
    Play_controls[Play_controlsFallow].setLable(AddCode_IsFallowing ? STR_FALLOWING : STR_FALLOW, AddCode_IsFallowing);
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
            if (PlayExtra_PicturePicture) {
                try {
                    if (Main_IsNotBrowser) Android.mClearSmallPlayer();
                } catch (e) {}
                PlayExtra_PicturePicture = false;
                PlayExtra_selectedChannel = '';
                PlayExtra_UnSetPanel();
                Play_CleanHideExit();
            } else {
                Play_CleanHideExit();
                Play_hideChat();
                if (is_vod) PlayVod_shutdownStream();
                else Play_shutdownStream();
            }
        } else if (Play_WarningDialogVisible()) {
            Play_HideWarningDialog();
            Play_showExitDialog();
        } else {
            Main_textContent("play_dialog_exit_text", PlayExtra_PicturePicture ? STR_EXIT_AGAIN_PICTURE : STR_EXIT_AGAIN);
            Play_showExitDialog();
        }
    }
}

function Play_handleKeyUp(e) {
    console.log('Play_handleKeyUp');
    if (e.keyCode === KEY_ENTER) {
        Play_handleKeyUpClear();
        if (!PlayExtra_clear) {
            var doc = document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos);
            if (doc === null) UserLiveFeed_ResetFeedId();
            else {
                var selectedChannel = JSON.parse(doc.getAttribute(Main_DataAttribute))[0];
                if (Main_values.Play_selectedChannel !== selectedChannel && PlayExtra_selectedChannel !== selectedChannel) {
                    console.log('KEY_ENTER Main_OpenLiveStream');
                    Play_PreshutdownStream();
                    Main_values.Play_isHost = false;
                    Play_UserLiveFeedPressed = true;
                    Main_OpenLiveStream(Play_FeedPos, UserLiveFeed_ids, Play_handleKeyDown);
                } else UserLiveFeed_ResetFeedId();
            }
        }
    }
}

function Play_handleKeyUpClear() {
    window.clearTimeout(PlayExtra_KeyEnterID);
    document.body.removeEventListener("keyup", Play_handleKeyUp);
    document.body.addEventListener("keydown", Play_handleKeyDown, false);
}

function Play_handleKeyDown(e) {
    if (Play_state !== Play_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_RETURN:
                if (Play_ExitDialogVisible()) {
                    Play_CleanHideExit();
                    Play_hideChat();
                    PlayExtra_PicturePicture = false;
                    PlayExtra_selectedChannel = '';
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
                } else if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown() &&
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
                } else if (PlayExtra_PicturePicture) {
                    Play_PicturePicturePos++;
                    if (Play_PicturePicturePos > 7) Play_PicturePicturePos = 0;

                    try {
                        Android.mSwitchPlayerPosition(Play_PicturePicturePos);
                    } catch (e) {}
                    Main_setItem('Play_PicturePicturePos', Play_PicturePicturePos);
                } else {
                    Play_showPanel();
                }
                break;
            case KEY_RIGHT:
                if (UserLiveFeed_isFeedShow()) {
                    if (Play_FeedPos < (UserLiveFeed_GetSize() - 1) && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos++;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible() &&
                    !PlayExtra_PicturePicture) {
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
                } else if (PlayExtra_PicturePicture) {
                    Play_PicturePictureSize++;
                    if (Play_PicturePictureSize > 4) Play_PicturePictureSize = 2;
                    try {
                        Android.mSwitchPlayerSize(Play_PicturePictureSize);
                    } catch (e) {}
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
                } else if (!UserLiveFeed_isFeedShow() && AddUser_UserIsSet()) UserLiveFeed_ShowFeed();
                else if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedRefreshFocus();
                break;
            case KEY_DOWN:
                if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(1, -1);
                    Play_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
                else if (Play_isFullScreen && Play_isChatShown() && !PlayExtra_PicturePicture) {
                    Play_ChatSizeValue++;
                    if (Play_ChatSizeValue > 3) {
                        Play_ChatSizeValue = 0;
                        Play_ChatPositionConvert(false);
                    } else if (Play_ChatSizeValue === 3) Play_ChatPositionConvert(true);
                    Play_ChatSize(true);

                    Play_controls[Play_controlsChatSize].defaultValue = Play_ChatSizeValue;
                    Play_controls[Play_controlsChatSize].bottomArrows();
                    Play_controls[Play_controlsChatSize].setLable();
                } else if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (PlayExtra_PicturePicture) {
                    PlayExtra_SwitchPlayer();

                    try {
                        if (Main_IsNotBrowser) Android.mSwitchPlayer();
                    } catch (e) {}
                } else Play_showPanel();
                break;
            case KEY_ENTER:
                if (Play_isEndDialogVisible()) Play_EndDialogPressed(1);
                else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 1) {
                        if (!Play_isEndDialogVisible()) Play_KeyPause(1);
                    } else Play_BottomOptionsPressed(1);
                    Play_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) {
                    document.body.removeEventListener("keydown", Play_handleKeyDown, false);
                    document.body.addEventListener("keyup", Play_handleKeyUp, false);
                    PlayExtra_clear = false;
                    UserLiveFeed_ResetFeedId();
                    PlayExtra_KeyEnterID = window.setTimeout(PlayExtra_KeyEnter, 1000);
                } else Play_showPanel();
                break;
            case KEY_RETURN:
                Play_KeyReturn(false);
                break;
            case KEY_PLAY:
                if (!Play_isEndDialogVisible() && Play_isNotplaying()) Play_KeyPause(1);
                break;
            case KEY_PAUSE:
                if (!Play_isEndDialogVisible() && !Play_isNotplaying()) Play_KeyPause(1);
                break;
            case KEY_PLAYPAUSE:
                if (!Play_isEndDialogVisible()) Play_KeyPause(1);
                break;
            case KEY_REFRESH:
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
var Play_controlsAudio = 8;
var Play_controlsChat = 9;
var Play_controlsChatSide = 10;
var Play_controlsChatForceDis = 11;
var Play_controlsChatPos = 12;
var Play_controlsChatSize = 13;
var Play_controlsChatBright = 14;
var Play_controlsChatFont = 15;
var Play_controlsChatDelay = 16;

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
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function(PlayVodClip) {
            Play_ForceHidePannel();
            Play_OpenChannel(PlayVodClip);
        },
    };

    Play_controls[Play_controlsGameCont] = { //game content
        icons: "gamepad",
        string: STR_GAME_CONT,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function(PlayVodClip) {
            Play_ForceHidePannel();
            Play_OpenGame(PlayVodClip);
        },
    };

    Play_controls[Play_controlsOpenVod] = { //open vod
        icons: "movie-play",
        string: STR_OPEN_BROADCAST,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function() {
            Play_ForceHidePannel();
            PlayClip_OpenVod();
        },
    };


    Play_controls[Play_controlsFallow] = { //fallowing
        icons: "heart-o",
        string: STR_FALLOW,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function(PlayVodClip) {

            AddCode_Channel_id = (PlayVodClip === 1 ? Main_values.Play_selectedChannel_id : Main_values.Main_selectedChannel_id);
            Play_FallowUnfallow();

            Play_Resetpanel(PlayVodClip);
        },
        setLable: function(string, AddCode_IsFallowing) {
            Main_textContent('extra_button_text' + this.position, string);
            this.setIcon(AddCode_IsFallowing);
        },
        setIcon: function(AddCode_IsFallowing) {
            Main_innerHTML('controls_icon_' + this.position, '<i class="pause_button3d icon-' +
                (AddCode_IsFallowing ? "heart" : "heart-o") +
                '" style="color: #' + (AddCode_IsFallowing ? "00b300" : "FFFFFF") + ';" ></i>');
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
        values: ['1080p60 | Source | 10.00Mbps'],
        defaultValue: 0,
        opacity: 0,
        enterKey: function(PlayVodClip) {

            if (PlayVodClip === 1) {
                Play_qualityChanged();
                Play_hidePanel();
            } else if (PlayVodClip === 2) {
                PlayVod_qualityChanged();
                PlayVod_hidePanel();
            } else if (PlayVodClip === 3) {
                PlayClip_PlayerCheckQualityChanged = false;
                PlayClip_qualityChanged();
                PlayClip_hidePanel();
            }
            Play_clearPause();
        },
        updown: function(adder, PlayVodClip) {

            if (PlayVodClip === 1) {
                //TODO fix this reversed logic
                Play_qualityIndex += adder * -1;

                if (Play_qualityIndex > (Play_getQualitiesCount() - 1))
                    Play_qualityIndex = (Play_getQualitiesCount() - 1);
                else if (Play_qualityIndex < 0)
                    Play_qualityIndex = 0;

                Play_qualityDisplay();
            } else if (PlayVodClip === 2) {
                //TODO fix this reversed logic
                PlayVod_qualityIndex += adder * -1;

                if (PlayVod_qualityIndex > (PlayVod_getQualitiesCount() - 1))
                    PlayVod_qualityIndex = (PlayVod_getQualitiesCount() - 1);
                else if (PlayVod_qualityIndex < 0)
                    PlayVod_qualityIndex = 0;

                PlayVod_qualityDisplay();
            } else if (PlayVodClip === 3) {
                //TODO fix this reversed logic
                PlayClip_qualityIndex += adder * -1;

                if (PlayClip_qualityIndex > (PlayClip_getQualitiesCount() - 1))
                    PlayClip_qualityIndex = (PlayClip_getQualitiesCount() - 1);
                else if (PlayClip_qualityIndex < 0)
                    PlayClip_qualityIndex = 0;

                PlayClip_qualityDisplay();
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

            try {
                if (this.defaultValue === 2) {
                    Android.StartAuto(1, 0);
                    Android.initializePlayer2Auto();
                } else if (this.defaultValue) Android.StartAuto(1, 0);
                else Android.initializePlayer2Auto();
            } catch (e) {}

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

    Play_controls[Play_controlsAudio] = { //speed
        icons: "sound",
        string: STR_AUDIO_SOURCE,
        values: [STR_PLAYER_AUTO_SMALLS, STR_PLAYER_AUTO_BIG, STR_PLAYER_AUTO_ALL],
        defaultValue: Play_controlsAudioPos,
        opacity: 0,
        enterKey: function() {

            try {
                Android.mSwitchPlayerAudio(this.defaultValue);
            } catch (e) {}

            Play_hidePanel();
            Play_controlsAudioPos = this.defaultValue;

            Main_setItem('Play_controlsAudioPos', Play_controlsAudioPos);

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

    Play_controls[Play_controlsChat] = { //chat enable disable
        icons: "chat",
        string: STR_CHAT,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function() {
            if (!Play_isFullScreen) return;
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
            if (!Play_isFullScreen) string = STR_CHAT_SIDE;

            Main_textContent('extra_button_' + this.position, '(' + string + ')');
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

            if (PlayVodClip === 1) ChatLive_Init();
            else Chat_Init();

            this.setLable();
            Main_SaveValues();
        },
        setLable: function() {
            Main_textContent('extra_button_' + this.position, '(' +
                (Main_values.Play_ChatForceDisable ? STR_YES : STR_NO) + ')');
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
            Main_textContent('extra_button_' + this.position, '(' + (Play_isFullScreen ? STR_CHAT_SIDE_FULL : STR_CHAT_SIDE) + ')');

            Play_controls[Play_controlsChat].setLable();
        },
        setIcon: function() {
            Main_innerHTML('controls_icon_' + this.position, '<i class="pause_button3d icon-' +
                (Play_isFullScreen ? "resize-down" : "resize-up") + '" ></i>');
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
        values: ["12.5%", "25%", "50%", "100%"],
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

            if (Play_ChatSizeValue === 2 && adder === -1) {
                Play_ChatPositionConvert(false);
            } else if (Play_ChatSizeValue === 3) Play_ChatPositionConvert(true);

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
    if (Play_controls[position].values.length === 1) {
        document.getElementById("control_arrow_up_" + position).style.opacity = "0";
        document.getElementById("control_arrow_down" + position).style.opacity = "0";
    } else if (!Play_controls[position].defaultValue) {
        document.getElementById("control_arrow_up_" + position).style.opacity = "1";
        document.getElementById("control_arrow_down" + position).style.opacity = "0.2";
    } else if (Play_controls[position].defaultValue === (Play_controls[position].values.length - 1)) {
        document.getElementById("control_arrow_up_" + position).style.opacity = "0.2";
        document.getElementById("control_arrow_down" + position).style.opacity = "1";
    } else {
        document.getElementById("control_arrow_up_" + position).style.opacity = "1";
        document.getElementById("control_arrow_down" + position).style.opacity = "1";
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
var ChannelContent_ChannelValue = {};
var ChannelContent_ChannelValueIsset = false;
var ChannelContent_offline_image = null;
var ChannelContent_profile_banner = '';
//Variable initialization end

function ChannelContent_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_ChannelContent;
    if (ChannelContent_ChannelValueIsset && !Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
    if (ChannelContent_lastselectedChannel !== Main_values.Main_selectedChannel) ChannelContent_status = false;
    Main_cleanTopLabel();
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
    ChannelContent_offline_image = null;
    Main_showLoadDialog();
    Main_HideWarningDialog();
    ChannelContent_lastselectedChannel = Main_values.Main_selectedChannel;
    ChannelContent_status = false;
    ChannelContent_skipImg = false;
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

//TODO improve te looks of this screen
function ChannelContent_loadDataSuccess() {
    var row = document.createElement('tr'),
        coloumn_id = 0,
        doc = document.getElementById("stream_table_channel_content");

    Main_td = document.createElement('tr');
    Main_td.className = 'follower_banner';
    Main_td.innerHTML = '<div id="' + ChannelContent_ids[0] + 'x_0" class="follower_banner"><img id="' +
        ChannelContent_ids[1] + 'x_0" alt="" class="stream_img_banner" src="' + ChannelContent_profile_banner +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_BANNER + '\'"></div>';
    doc.appendChild(Main_td);

    if (ChannelContent_responseText !== null) {
        var response = JSON.parse(ChannelContent_responseText);
        if (response.stream !== null) {
            var hosting = ChannelContent_TargetId !== undefined ? Main_values.Main_selectedChannelDisplayname +
                STR_USER_HOSTING : '';
            var stream = response.stream;
            row.appendChild(ChannelContent_createCell('0_' + coloumn_id, stream.channel.name, stream.channel._id, stream.preview.template,
                twemoji.parse(stream.channel.status), stream.game,
                hosting + stream.channel.display_name,
                STR_SINCE + Play_streamLiveAt(stream.created_at) + ' ' + STR_FOR +
                Main_addCommas(stream.viewers) + STR_VIEWER,
                Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.broadcaster_language),
                Main_is_rerun(stream.stream_type)));
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

    Main_td = document.createElement('td');
    Main_td.setAttribute('id', 'stream_cell_x_x');
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = '<div id="' + ChannelContent_ids[0] +
        'x_x" class="stream_thumbnail_video" ><div id="' +
        ChannelContent_ids[4] + 'x_x" class="stream_channel_info">' +
        twemoji.parse(ChannelContent_description) + '</div></div>';
    row.appendChild(Main_td);

    doc.appendChild(row);

    ChannelContent_loadDataSuccessFinish();
}

//TODO revise this functions there is too many
function ChannelContent_createCell(id, channel_name, channel_id, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality, rerun) {

    var icon = 'circle';
    var color = (ChannelContent_TargetId !== undefined ? '#FED000' : 'red');
    if (rerun) {
        color = '#FFFFFF';
        icon = 'refresh';
    }

    Main_td = document.createElement('td');
    Main_td.setAttribute('id', ChannelContent_ids[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify([channel_name, channel_id, rerun]));

    Main_td.className = 'stream_cell';
    Main_td.innerHTML = '<div id="' + ChannelContent_ids[0] + id + '" class="stream_thumbnail_video" >' +
        '<img id="' + ChannelContent_ids[1] + id + '" alt="" class="stream_img"src="' + preview_thumbnail.replace("{width}x{height}", Main_VideoSize) + Main_randomimg +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_VIDEO + '\'"></div>' +
        '<div id="' + ChannelContent_ids[2] + id + '" class="stream_text">' +
        '<div id="' + ChannelContent_ids[3] + id + '" class="stream_channel" style="width: 66%; display: inline-block;">' +
        '<i class="icon-' + icon + ' live_icon" style="color: ' + color + ';"></i> ' + channel_display_name + '</div>' +
        '<div id="' + ChannelContent_ids[7] + id + '"class="stream_info" style="width:33%; float: right; text-align: right; display: inline-block;">' +
        quality + '</div>' +
        '<div id="' + ChannelContent_ids[4] + id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + ChannelContent_ids[5] + id + '"class="stream_info">' +
        (stream_game !== "" ? STR_PLAYING + stream_game : "") + '</div>' +
        '<div id="' + ChannelContent_ids[6] + id + '"class="stream_info">' + viwers + '</div>' + '</div>';

    return Main_td;
}

function ChannelContent_createChannelCell(id, user_name, stream_type, icons) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', 'channel_' + id);
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
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', 'fallow_' + id);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = '<div id="' + ChannelContent_ids[0] + id +
        '" class="stream_thumbnail_video" ><div id="schannel_cont_heart" style="position: absolute; top: 5%; left: 6%;"></div><img id="' +
        ChannelContent_ids[1] + id + '" alt="" class="stream_img_fallow"src="' + preview_thumbnail +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\'"></div>' +
        '<div id="' + ChannelContent_ids[2] + id + '" class="stream_text_channel">' +
        '<div id="' + ChannelContent_ids[3] + id + '" class="stream_channel">' + stream_type + '</div>' +
        '<div id="' + ChannelContent_ids[5] + id + '"class="stream_info">' + Main_addCommas(ChannelContent_selectedChannelViews) +
        STR_VIEWS + '</div>' +
        '<div id="' + ChannelContent_ids[6] + id + '"class="stream_info" >' + Main_addCommas(ChannelContent_selectedChannelFallower) +
        STR_FALLOWERS + '</div></div>';

    return Main_td;
}

function ChannelContent_setFallow() {
    var partnerIcon = Main_values.Main_selectedChannelDisplayname + STR_SPACE + STR_SPACE +
        (Main_values.Main_selectedChannelPartner ? '<img style="display: inline-block; width: 2ch; vertical-align: middle;" alt="" src="' + IMG_PARTNER + '">' + STR_SPACE + STR_SPACE : "");

    if (AddCode_IsFallowing) {
        Main_innerHTML("schannel_cont_heart", '<i class="icon-heart" style="color: #00b300; font-size: 600%; text-shadow: #FFFFFF 0 0 10px, #FFFFFF 0 0 10px, #FFFFFF 0 0 8px;"></i>');
        Main_innerHTML(ChannelContent_ids[3] + "1_0", partnerIcon + STR_FALLOWING);
    } else {
        Main_innerHTML("schannel_cont_heart", '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 600%; text-shadow: #000000 0 0 10px, #000000 0 0 10px, #000000 0 0 8px;"></i>');
        if (AddUser_UserIsSet()) Main_innerHTML(ChannelContent_ids[3] + "1_0", partnerIcon + STR_FALLOW);
        else Main_innerHTML(ChannelContent_ids[3] + "1_0", partnerIcon + STR_CANT_FALLOW);
    }
}

function ChannelContent_loadDataSuccessFinish() {
    if (!ChannelContent_status) {
        ChannelContent_status = true;
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

            Main_values.Play_selectedChannel = JSON.parse(document.getElementById(ChannelContent_ids[8] + ChannelContent_cursorY +
                '_' + ChannelContent_cursorX).getAttribute(Main_DataAttribute));

            Main_values.IsRerun = Main_values.Play_selectedChannel[2];
            Main_values.Play_selectedChannel = Main_values.Play_selectedChannel[0];

            Main_values.Play_selectedChannelDisplayname = document.getElementById(ChannelContent_ids[3] + ChannelContent_cursorY +
                '_' + ChannelContent_cursorX).textContent;

            if (Main_values.Play_selectedChannelDisplayname.indexOf(STR_USER_HOSTING) !== -1) {
                Main_values.Play_isHost = true;
                Main_values.Play_DisplaynameHost = Main_values.Play_selectedChannelDisplayname;
                Main_values.Play_selectedChannelDisplayname = Main_values.Play_selectedChannelDisplayname.split(STR_USER_HOSTING)[1];
                Main_values.Play_selectedChannel_id = ChannelContent_TargetId;
            } else Main_values.Play_selectedChannel_id = Main_values.Main_selectedChannel_id;

            var playing = document.getElementById(ChannelContent_ids[5] + ChannelContent_cursorY + '_' + ChannelContent_cursorX).textContent;
            Main_values.Play_gameSelected = playing.indexOf(STR_PLAYING) !== -1 ? playing.split(STR_PLAYING)[1] : "";

            Main_ready(Main_openStream);
        } else if (ChannelContent_cursorX === (1 - value)) {
            Main_ready(function() {
                inUseObj = ChannelVod;
                Screens_init();
            });
        } else if (ChannelContent_cursorX === (2 - value)) {
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
            Sidepannel_RestoreScreen();
            break;
        case KEY_LEFT:
            if (!ChannelContent_cursorX) {
                ChannelContent_removeFocus();
                Sidepannel_Start(ChannelContent_handleKeyDown, true);
            } else if (!ChannelContent_cursorY) {
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
            if (!ChannelContent_cursorY) {
                ChannelContent_removeFocus();
                Main_CenterLablesStart(ChannelContent_handleKeyDown);
            } else {
                ChannelContent_removeFocus();
                ChannelContent_cursorY = 0;
                ChannelContent_addFocus();
            }
            break;
        case KEY_DOWN:
            if (!ChannelContent_cursorY) {
                ChannelContent_removeFocus();
                ChannelContent_cursorY = 1;
                ChannelContent_addFocus();
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            ChannelContent_keyEnter();
            break;
        case KEY_REFRESH:
            Main_ReloadScreen();
            break;
        default:
            break;
    }
}//Variable initialization
var Languages_cursorY = 0;
var Languages_Selected = '';
var Languages_value = {
    "All": {
        "values": ["off", "on"],
        "defaultValue": 2,
        "set_values": ""
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
        "set_values": "zh-cn,zh-tw"
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
    Main_UnSetTopOpacity();
    document.body.removeEventListener("keydown", Settings_handleKeyDown);
    Main_HideElement('settings_main');
    Main_ShowElement('settings_lang');
    Languages_HideShowAll();
    Main_textContent('top_bar_featured', STR_SETTINGS_LANG);
    document.getElementById('top_bar_featured').style.display = 'inline-block';
    document.body.addEventListener("keydown", Languages_handleKeyDown, false);
    Languages_cursorY = 0;
    Languages_inputFocus(Languages_cursorY);
    Languages_ResetLang();
}

function Languages_exit() {
    document.body.removeEventListener("keydown", Languages_handleKeyDown);
    document.body.addEventListener("keydown", Settings_handleKeyDown, false);
    Settings_ScrollTable();
    //document.getElementById('settings_scroll').style.top = (screen.height * 0.085) + "px";
    Main_ShowElement('settings_main');
    Main_HideElement('settings_lang');
    Main_textContent('top_bar_featured', STR_FEATURED);
    document.getElementById('top_bar_featured').style.display = 'none';
    Languages_RemoveinputFocus();
    Languages_SetLang();
    Languages_ResetLang();
}

function Languages_ResetLang() {
    if (Main_ContentLang === "") {
        Languages_Selected = STR_LANG_ALL;
        Languages_value.All.defaultValue = 1;
        Languages_ChangeSettigs(0);
        Main_AddClass(Languages_value_keys[0], 'strokedextraminired');
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
        '<div id="' + key + '" class="' + (Languages_Obj_default(key) ? 'strokedextraminired ' : '') + 'strokedextramini settings_value">' + Languages_Obj_values(key) + '</div>' +
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
        case KEY_RETURN:
            Languages_exit();
            break;
        case KEY_LEFT:
            key = Languages_value_keys[Languages_cursorY];
            if (Languages_Obj_default(key) > 0) {
                Languages_value[key].defaultValue -= 1;
                Languages_ChangeSettigs(Languages_cursorY);
                Main_RemoveClass(Languages_value_keys[Languages_cursorY], 'strokedextraminired');
                if (key.indexOf('All') !== -1) Languages_HideShowAll();
            }
            break;
        case KEY_RIGHT:
            key = Languages_value_keys[Languages_cursorY];
            if (Languages_Obj_default(key) < Languages_Obj_length(key)) {
                Languages_value[key].defaultValue += 1;
                Languages_ChangeSettigs(Languages_cursorY);
                Main_AddClass(Languages_value_keys[Languages_cursorY], 'strokedextraminired');
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
}//Spacing for reease maker not trow erros frm jshint
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
var inUseObj = {};

//Initiate all Main screens obj and they properties
function Screens_InitScreens() {
    console.log('InitScreens place holder');
}

//Initiate all Secondary screens obj and they properties
function Screens_InitSecondaryScreens() {
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
}

//TODO cleanup not used when finished migrate all
function Screens_ScreenIds(base) {
    return [base + '_thumbdiv',
        base + '_img',
        base + '_infodiv',
        base + '_title',
        base + '_createdon',
        base + '_game',
        base + '_viewers',
        base + '_duration',
        base + '_cell',
        'cpempty_',
        base + '_scroll',
        base + '_lang',
        base + '_row'
    ];
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
    Main_ShowElement(inUseObj.ids[10]);

    if (inUseObj.status) {
        Main_YRst(inUseObj.posY);
        Screens_addFocus(true);
        Main_SaveValues();
    } else Screens_StartLoad();
}

function Screens_exit() {
    Main_addFocusVideoOffset = 0;
    inUseObj.label_exit();
    document.body.removeEventListener("keydown", Screens_handleKeyDown);
    Main_HideElement(inUseObj.ids[10]);
    Main_HideWarningDialog();
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
    if (Main_IsNotBrowser && !inUseObj.itemsCount)
        BaseAndroidhttpGet(inUseObj.url, inUseObj.loadingDataTimeout, inUseObj.HeaderQuatity, inUseObj.token, Screens_concatenate, Screens_loadDataError);
    else
        BasexmlHttpGet(inUseObj.url, inUseObj.loadingDataTimeout, inUseObj.HeaderQuatity, inUseObj.token, Screens_concatenate, Screens_loadDataError, false);
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
        inUseObj.FirstLoad = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_REFRESH_PROBLEM);
        inUseObj.key_exit();
        Main_ShowElement('topbar');
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
            inUseObj.row.id = this.ids[12] + inUseObj.row_id;
        }

        var response_rows = Math.ceil(response_items / inUseObj.ColoumnsCount);

        var max_row = inUseObj.row_id + response_rows;

        for (inUseObj.row_id; inUseObj.row_id < max_row;) {

            if (inUseObj.coloumn_id === inUseObj.ColoumnsCount) {
                inUseObj.row = document.createElement('div');
                inUseObj.row.id = this.ids[12] + inUseObj.row_id;
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

function Screens_createCellBase(row_id, coloumn_id) {

    var id = row_id + '_' + coloumn_id;

    Main_td = document.createElement('div');
    Main_td.style.cssText = inUseObj.ThumbCssText;

    return id;
}

function Screens_createCellGame(row_id, coloumn_id, idArray, thumbnail, game_name, views) {

    var id = Screens_createCellBase(row_id, coloumn_id);

    Main_td.setAttribute('id', idArray[5] + id);
    Main_td.setAttribute(Main_DataAttribute, game_name);

    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_game"><div><img id="' +
        idArray[1] + id + '" class="lazy stream_img" alt="" data-src="' + thumbnail +
        '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\'"></div><div id="' +
        idArray[2] + id + '" class="stream_text2"><div id="<div id="' +
        idArray[3] + id + '" class="stream_channel">' + game_name + '</div>' +
        (views !== '' ? '<div id="' + idArray[4] + id + '"class="stream_info_games" style="width: 100%; display: inline-block;">' + views + '</div>' : '') +
        '</div></div>';

    return Main_td;
}

//TODO Reduce the number of vars here please
function Screens_createCellClip(row_id, coloumn_id, idArray, thumbnail, display_name, created_at, title_game, views, language, duration, video_id, name, logo, streamer_id, vod_id, vod_offset) {

    var id = Screens_createCellBase(row_id, coloumn_id);
    var playing = (title_game[2] !== "" ? title_game[1] + title_game[2] : "");
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
        playing
    ]));
    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_clip"><div><img id="' +
        idArray[1] + id + '" class="lazy stream_img" alt="" data-src="' + thumbnail +
        '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\'"></div><div id="' +
        idArray[2] + id + '" class="stream_text2"><div style="line-height: 14px;"><div id="' +
        idArray[3] + id + '" class="stream_channel" style="width: 72%; display: inline-block;">' +
        display_name + '</div><div id="' + idArray[7] + id +
        '"class="stream_info" style="width:27%; float: right; text-align: right; display: inline-block;">' + language +
        '</div></div><div id="' + idArray[11] + id + '"class="stream_info">' +
        title_game[0] + STR_BR + playing + '</div><div id="' + idArray[6] + id +
        '"class="stream_info">' + views + STR_VIEWS + '</div><div  style="line-height: 12px;"><div id="' +
        idArray[4] + id + '"class="stream_info" style="width: 59%; display: inline-block;">' +
        created_at[0] + created_at[1] + '</div><div id="' + idArray[5] + id +
        '"class="stream_info" style="width: 39%; display: inline-block; float: right; text-align: right;">' +
        STR_DURATION + Play_timeS(duration) + '</div></div></div></div>';

    return Main_td;
}

function Screens_createCellLive(row_id, coloumn_id, data, idArray, valuesArray) {

    var id = Screens_createCellBase(row_id, coloumn_id);

    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify(data));

    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_clip"><div><img id="' +
        idArray[1] + id + '" class="lazy stream_img" alt="" data-src="' + valuesArray[0] + Main_randomimg +
        '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\'"></div><div id="' +
        idArray[2] + id + '" class="stream_text2"><div style="line-height: 14px;"><div id="' +
        idArray[3] + id + '" class="stream_channel" style="width: 66%; display: inline-block;">' +
        '<i class="icon-' + (data[2] ? 'refresh' : 'circle') + ' live_icon" style="color: ' + (data[2] ? '#FFFFFF' : valuesArray[1].indexOf(STR_USER_HOSTING) !== -1 ? '#FED000' : 'red') +
        ';"></i> ' + valuesArray[1] + '</div><div id="' + idArray[7] + id +
        '"class="stream_info" style="width:33%; float: right; text-align: right; display: inline-block;">' +
        valuesArray[5] + '</div></div>' +
        '<div id="' + idArray[4] + id + '"class="stream_info">' + twemoji.parse(valuesArray[2]) + '</div>' +
        '<div id="' + idArray[5] + id + '"class="stream_info">' + (valuesArray[3] !== "" ? STR_PLAYING + valuesArray[3] : "") +
        '</div>' + '<div id="' + idArray[6] + id + '"class="stream_info">' + valuesArray[4] + '</div></div></div>';

    return Main_td;
}


function Screens_createCellChannel(row_id, coloumn_id, idArray, valuesArray) {

    var id = Screens_createCellBase(row_id, coloumn_id);

    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify(valuesArray));

    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_channel" ><div><img id="' + idArray[1] +
        id + '" alt="" class="lazy stream_img" data-src="' + valuesArray[2] +
        '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\'"></div>' +
        '<div id="' + idArray[2] + id + '" class="stream_text2">' +
        '<div id="' + idArray[3] + id + '" class="stream_channel">' + valuesArray[3] +
        (valuesArray[4] ? STR_SPACE + STR_SPACE + '<img style="display: inline-block; width: 2ch; vertical-align: middle;" alt="" src="' + IMG_PARTNER + '">' : "") +
        '</div></div></div>';

    return Main_td;
}

function Screens_createCellVod(row_id, coloumn_id, data, idArray, valuesArray) {

    var id = Screens_createCellBase(row_id, coloumn_id);

    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify(data));

    Main_td.innerHTML = '<div id="' + idArray[0] + id + '" class="stream_thumbnail_clip"' +
        (valuesArray[7] ? ' style="background-size: 0 0; background-image: url(' + valuesArray[7] + ');"' : '') +
        '><div><img id="' +
        idArray[1] + id + '" class="lazy stream_img" alt="" data-src="' + valuesArray[0] +
        '" onerror="this.onerror=null;this.src=\'' + inUseObj.img_404 + '\'"></div><div id="' +
        idArray[2] + id + '" class="stream_text2"><div style="line-height: 14px;"><div id="' +
        idArray[3] + id + '" class="stream_channel" style="width: 72%; display: inline-block;">' +
        valuesArray[1] + '</div><div id="' + idArray[7] + id +
        '"class="stream_info" style="width:27%; float: right; text-align: right; display: inline-block;">' + valuesArray[5] +
        '</div></div><div id="' + idArray[11] + id + '"class="stream_info">' +
        valuesArray[3] + '</div><div id="' + idArray[6] + id +
        '"class="stream_info">' + valuesArray[4] + '</div><div style="line-height: 12px;"><div id="' + idArray[4] + id + '"class="stream_info" style="width: 59%; display: inline-block;">' +
        valuesArray[2] + '</div><div id="' + idArray[5] + id +
        '"class="stream_info" style="width: 39%; display: inline-block; float: right; text-align: right;">' +
        valuesArray[6] + '</div></div></div></div>';

    return Main_td;
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
        if (Main_FirstRun && inUseObj.status && Settings_value.restor_playback.defaultValue) {
            if (Main_values.Play_WasPlaying) {

                Main_ExitCurrent(Main_values.Main_Go);
                Main_values.Main_Go = Main_GoBefore;
                if (!Main_values.vodOffset) Main_values.vodOffset = 1;
                ChannelVod_DurationSeconds = Main_values.vodOffset + 1;

                Play_showWarningDialog(STR_RESTORE_PLAYBACK_WARN);

                Main_ready(function() {
                    if (Main_values.Play_WasPlaying === 1) Main_openStream();
                    else Main_openVod();

                    Main_SwitchScreen(true);
                    window.setTimeout(function() {
                        if (!Play_IsWarning) Play_HideWarningDialog();
                    }, 2000);
                    Screens_loadDataSuccessFinishEnd();
                });
            } else if (Main_GoBefore !== 1) {
                Main_HideElement(inUseObj.ids[10]);
                Main_ready(function() {
                    Main_ExitCurrent(Main_values.Main_Go);
                    Main_values.Main_Go = Main_GoBefore;
                    Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
                    window.clearTimeout(Main_SetTopOpacityId);
                    Main_UnSetTopOpacity();
                    Main_SwitchScreenAction();
                    if (!Main_newUsercode) Screens_loadDataSuccessFinishEnd();
                    else {
                        Main_FirstRun = false;
                        Main_HideLoadDialog();
                    }
                });
            } else {
                Main_ready(function() {
                    if (Main_values.Never_run) {
                        Main_showControlsDialog();
                        document.body.removeEventListener("keydown", Screens_handleKeyDown);
                        document.body.addEventListener("keydown", Screens_handleKeyControls, false);
                    }
                    Main_values.Never_run = false;
                    Screens_addFocus(true);
                    Main_SaveValues();
                    Screens_loadDataSuccessFinishEnd();
                });
            }
        } else {
            //Main_ready(function() {
            Screens_addFocus(true);
            Main_SaveValues();
            Screens_loadDataSuccessFinishEnd();
            //});
        }
    } else {
        Main_CounterDialog(inUseObj.posX, inUseObj.posY, inUseObj.ColoumnsCount, inUseObj.itemsCount);
    }
}

function Screens_handleKeyControls(event) {
    switch (event.keyCode) {
        case KEY_ENTER:
        case KEY_RETURN:
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
}

function Screens_addFocus(forceScroll) {
    if (inUseObj.emptyContent) {
        if (inUseObj.HasSwitches) inUseObj.posY = -1;
        else {
            inUseObj.key_exit();
            return;
        }
    }
    if (inUseObj.posY < 0) {
        Screens_addFocusFallow();
        if (!inUseObj.emptyContent) Main_CounterDialog(inUseObj.posX, inUseObj.posY + 1, inUseObj.ColoumnsCount, inUseObj.itemsCount);
        return;
    }

    //Load more as the data is getting used
    if ((inUseObj.posY > 2) && (inUseObj.data_cursor + Main_ItemsLimitMax) > inUseObj.data.length && !inUseObj.dataEnded && !inUseObj.loadingData) {
        Screens_loadDataRequestStart();
    } else if ((inUseObj.posY + inUseObj.ItemsReloadLimit) > (inUseObj.itemsCount / inUseObj.ColoumnsCount) && inUseObj.data_cursor < inUseObj.data.length) {
        inUseObj.loadDataSuccess();
    }

    inUseObj.addrow(forceScroll, inUseObj.posY);
    if (Main_CenterLablesInUse) Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
    lazyLoadInstance.update();
}

function Screens_ThumbNotNull(thumbnail) {
    return document.getElementById(thumbnail) !== null;
}

function Screens_addrow(forceScroll, y) {
    if (inUseObj.currY < y) { // down
        inUseObj.currY = inUseObj.posY;
        if (y > 1) Screens_addrowDown(y);
    } else if (inUseObj.currY > y) { // Up
        inUseObj.currY = inUseObj.posY;
        if (y > 0 && (inUseObj.Cells.length) > (y + 2)) {
            var doc = document.getElementById(inUseObj.table);
            doc.insertBefore(inUseObj.Cells[y - 1], doc.childNodes[inUseObj.HasSwitches ? 1 : 0]);
            if (Screens_ThumbNotNull(inUseObj.ids[12] + (y + 3)))
                document.getElementById(inUseObj.ids[12] + (y + 3)).remove();
        }
    }

    Screens_addrowEnd(forceScroll);
}

function Screens_addrowDown(y) {
    if (inUseObj.Cells[y + 2]) {
        document.getElementById(inUseObj.table).appendChild(inUseObj.Cells[y + 2]);
        if (Screens_ThumbNotNull(inUseObj.ids[12] + (y - 2)))
            document.getElementById(inUseObj.ids[12] + (y - 2)).remove();
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

function Screens_addrowChannel(forceScroll, y) {
    if (inUseObj.currY < y) { // down
        inUseObj.currY = inUseObj.posY;
        if (y > 2) Screens_addrowChannelDown(y);
    } else if (inUseObj.currY > y) { // Up
        inUseObj.currY = inUseObj.posY;
        if (y > 1 && (inUseObj.Cells.length) > (y + 3)) {
            var doc = document.getElementById(inUseObj.table);
            doc.insertBefore(inUseObj.Cells[y - 2], doc.childNodes[inUseObj.HasSwitches ? 1 : 0]);
            if (Screens_ThumbNotNull(inUseObj.ids[12] + (y + 3)))
                document.getElementById(inUseObj.ids[12] + (y + 3)).remove();
        }
    }

    Screens_addrowEnd(forceScroll);
}

function Screens_addrowChannelDown(y) {
    if (inUseObj.Cells[y + 2]) {
        document.getElementById(inUseObj.table).appendChild(inUseObj.Cells[y + 2]);
        if (Screens_ThumbNotNull(inUseObj.ids[12] + (y - 3)))
            document.getElementById(inUseObj.ids[12] + (y - 3)).remove();
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

function Screens_addrowEnd(forceScroll) {
    Main_AddClass(inUseObj.ids[0] + inUseObj.posY + '_' + inUseObj.posX, Main_classThumb);
    Main_CounterDialog(inUseObj.posX, inUseObj.posY, inUseObj.ColoumnsCount, inUseObj.itemsCount);

    inUseObj.addFocus(inUseObj.posY, inUseObj.posX, inUseObj.ids, forceScroll);
}

function Screens_addFocusVideo(y, x, idArray, forceScroll) {
    if (Main_YchangeAddFocus(y) || forceScroll) {
        if (y > 0) {
            if (Main_ThumbNull((y + 1), 0, idArray[0])) {
                Main_ScrollTable(idArray[10],
                    (document.getElementById(idArray[0] + (y - 1) + '_' + x).offsetTop * -1) - 8 +
                    (inUseObj.HasSwitches ? 1 : 0));
            } else Main_handleKeyUp();
        } else Main_ScrollTable(idArray[10], screen.height * 0.07);

    } else Main_handleKeyUp();
}

function Screens_addFocusChannel(y, x, idArray, forceScroll) {
    if (Main_YchangeAddFocus(y) || forceScroll) {

        if (y > 1) {
            if (Main_ThumbNull((y + 1), 0, idArray[0])) {
                Main_ScrollTable(idArray[10],
                    (document.getElementById(idArray[0] + y + '_' + x).offsetTop * -1) + (screen.height * 0.41));
            } else Main_handleKeyUp();
        } else Main_ScrollTable(idArray[10], screen.height * 0.07);

    } else Main_handleKeyUp();
}

function Screens_addFocusGame(y, x, idArray, forceScroll) {
    if (Main_YchangeAddFocus(y) || forceScroll) {

        if (inUseObj.posY < (inUseObj.Cells.length - 1) || forceScroll) {
            Main_ScrollTable((idArray[10] ? idArray[10] : idArray[7]),
                (document.getElementById(idArray[5] + y + '_' + x).offsetTop * -1) + screen.height * 0.025);
        }

    } else if ((inUseObj.Cells.length - 1) === y && (Main_ThumbNull(y - 1, x, idArray[0]))) {

        Main_ScrollTable((idArray[10] ? idArray[10] : idArray[7]),
            (document.getElementById(idArray[5] + (y - 1) + '_' + x).offsetTop * -1) + screen.height * 0.025);
    } else Main_handleKeyUp();
}

function Screens_ChangeFocus(y, x) {
    Main_removeFocus(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids);
    if (inUseObj.HasAnimateThumb) Main_ShowElement(inUseObj.ids[1] + inUseObj.posY + '_' + inUseObj.posX);
    inUseObj.posY += y;
    inUseObj.posX = x;
    Screens_addFocus();
}

function Screens_addFocusFallow() {
    if (inUseObj.posX > inUseObj.SwitchesIcons.length - 1) inUseObj.posX = 0;
    else if (inUseObj.posX < 0) inUseObj.posX = inUseObj.SwitchesIcons.length - 1;
    Main_AddClass(inUseObj.ids[0] + 'y_' + inUseObj.posX, Main_classThumb);
}

function Screens_removeFocusFallow() {
    if (inUseObj.posX > inUseObj.SwitchesIcons.length - 1) inUseObj.posX = 0;
    else if (inUseObj.posX < 0) inUseObj.posX = inUseObj.SwitchesIcons.length - 1;
    Main_RemoveClass(inUseObj.ids[0] + 'y_' + inUseObj.posX, Main_classThumb);
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
        if (inUseObj.HasAnimateThumb) {
            window.clearInterval(this.AnimateThumbId);
            Main_ShowElement(inUseObj.ids[1] + inUseObj.posY + '_' + inUseObj.posX);
        }
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

function Screens_handleKeyDown(event) {
    if (inUseObj.FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    switch (event.keyCode) {
        case KEY_RETURN:
            if (!inUseObj.loadingData) inUseObj.key_exit();
            break;
        case KEY_LEFT:
            if (inUseObj.loadingData) break;
            if (!inUseObj.posX) {
                if (Main_values.Main_Go === Main_aGame) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
                inUseObj.key_exit(true);
                document.body.removeEventListener("keydown", Screens_handleKeyDown);
                Sidepannel_Start(Screens_handleKeyDown, true);
            } else Screens_KeyLeftRight(-1, inUseObj.ColoumnsCount - 1);
            break;
        case KEY_RIGHT:
            //Prevent scroll too fast out of inUseObj.Cells.length
            //here (inUseObj.posY + 3) the 3 is 1 bigger then the 2 in Screens_addrow*Down (inUseObj.Cells[y + 2])
            if (inUseObj.dataEnded ||
                inUseObj.posX < (inUseObj.ColoumnsCount - 1) ||
                (inUseObj.Cells.length - 1) >= (inUseObj.posY + 3)) Screens_KeyLeftRight(1, 0);
            else Screens_addFocus(true);
            break;
        case KEY_UP:
            if (inUseObj.HasSwitches) {
                if (inUseObj.posY === -1) inUseObj.key_exit();
                else Screens_KeyUpDown(-1);
            } else if (!inUseObj.posY) inUseObj.key_exit();
            else Screens_KeyUpDown(-1);
            break;
        case KEY_DOWN:
            //Prevent scroll too fast out of inUseObj.Cells.length
            //here (inUseObj.posY + 3) the 3 is 1 bigger then the 2 in Screens_addrow*Down (inUseObj.Cells[y + 2])
            if (inUseObj.dataEnded ||
                (inUseObj.Cells.length - 1) >= (inUseObj.posY + 3)) Screens_KeyUpDown(1);
            else Screens_addFocus(true);
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            inUseObj.key_play();
            break;
        case KEY_PG_DOWN:
        case KEY_PG_UP:
            Screens_SwitchScreen(event);
            break;
        case KEY_REFRESH:
            Main_ReloadScreen();
            break;
        default:
            break;
    }
}

function Screens_SwitchScreen(event) {
    if (Main_ForbidenScreens()) return;
    Main_keyClickDelay();
    document.body.addEventListener("keydown", Main_CenterLables, false);
    Main_CenterLables(event);
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
    if (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token) {
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
    if (AGame_fallowing) Main_innerHTML(AGame.ids[3] + "y_2", '<i class="icon-heart" style="color: #00b300; font-size: 100%;"></i>' + STR_SPACE + STR_SPACE + STR_FALLOWING);
    else Main_innerHTML(AGame.ids[3] + "y_2", '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; "></i>' + STR_SPACE + STR_SPACE + (AddUser_UserIsSet() ? STR_FALLOW : STR_NOKEY));
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

}(this));// https://github.com/verlok/lazyload

(function(global, factory) {
    global.LazyLoad = factory();
})(this, function() {
    var runningOnBrowser = typeof window !== "undefined";
    var isBot = runningOnBrowser && !("onscroll" in window) || typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent);
    var supportsIntersectionObserver = runningOnBrowser &&
        "IntersectionObserver" in window &&
        "IntersectionObserverEntry" in window &&
        "intersectionRatio" in window.IntersectionObserverEntry.prototype &&
        "isIntersecting" in window.IntersectionObserverEntry.prototype;
    var supportsClassList = runningOnBrowser && "classList" in document.createElement("p");
    var defaultSettings = {
        elements_selector: ".lazy",
        container: isBot || runningOnBrowser ? document : null,
        threshold: 300,
        thresholds: null,
        data_src: "src",
        data_srcset: "srcset",
        data_sizes: "sizes",
        data_bg: "bg",
        class_loading: "loading",
        class_loaded: "loaded",
        class_error: "error",
        load_delay: 0,
        auto_unobserve: true,
        callback_enter: null,
        callback_exit: null,
        callback_reveal: null,
        callback_loaded: null,
        callback_error: null,
        callback_finish: null,
        use_native: false
    };

    /* Creates instance and notifies it through the window element */
    var createInstance = function createInstance(classObj, options) {
        var event;
        var eventString = "LazyLoad::Initialized";
        var instance = new classObj(options);

        try {
            // Works in modern browsers
            event = new CustomEvent(eventString, {
                detail: {
                    instance: instance
                }
            });
        } catch (err) {
            // Works in Internet Explorer (all versions)
            event = document.createEvent("CustomEvent");
            event.initCustomEvent(eventString, false, false, {
                instance: instance
            });
        }

        window.dispatchEvent(event);
    };
    /* Auto initialization of one or more instances of lazyload, depending on the 
        options passed in (plain object or an array) */


    function autoInitialize(classObj, options) {
        if (!options) {
            return;
        }

        if (!options.length) {
            // Plain object
            createInstance(classObj, options);
        } else {
            // Array of objects
            for (var i = 0; options[i]; i++) {
                createInstance(classObj, options[i]);
            }
        }
    }

    var dataPrefix = "data-";
    var processedDataName = "was-processed";
    var timeoutDataName = "ll-timeout";
    var trueString = "true";

    var getData = function getData(element, attribute) {
        return element.getAttribute(dataPrefix + attribute);
    };

    var setData = function setData(element, attribute, value) {
        var attrName = dataPrefix + attribute;

        if (value === null) {
            element.removeAttribute(attrName);
            return;
        }

        element.setAttribute(attrName, value);
    };

    var setWasProcessedData = function setWasProcessedData(element) {
        return setData(element, processedDataName, trueString);
    };

    var getWasProcessedData = function getWasProcessedData(element) {
        return getData(element, processedDataName) === trueString;
    };

    var setTimeoutData = function setTimeoutData(element, value) {
        return setData(element, timeoutDataName, value);
    };

    var getTimeoutData = function getTimeoutData(element) {
        return getData(element, timeoutDataName);
    };

    var purgeProcessedElements = function purgeProcessedElements(elements) {
        return elements.filter(function(element) {
            return !getWasProcessedData(element);
        });
    };

    var purgeOneElement = function purgeOneElement(elements, elementToPurge) {
        return elements.filter(function(element) {
            return element !== elementToPurge;
        });
    };

    var callbackIfSet = function callbackIfSet(callback, argument) {
        if (callback) {
            callback(argument);
        }
    };

    var updateLoadingCount = function updateLoadingCount(instance, plusMinus) {
        instance._loadingCount += plusMinus;

        if (instance._elements.length === 0 && instance._loadingCount === 0) {
            callbackIfSet(instance._settings.callback_finish);
        }
    };

    var getSourceTags = function getSourceTags(parentTag) {
        var sourceTags = [];

        for (var i = 0; parentTag.children[i]; i++) {
            if (parentTag.children[i].tagName === "SOURCE") {
                sourceTags.push(parentTag.children[i]);
            }
        }

        return sourceTags;
    };

    var setAttributeIfValue = function setAttributeIfValue(element, attrName, value) {
        if (!value) {
            return;
        }

        element.setAttribute(attrName, value);
    };

    var setImageAttributes = function setImageAttributes(element, settings) {
        setAttributeIfValue(element, "sizes", getData(element, settings.data_sizes));
        setAttributeIfValue(element, "srcset", getData(element, settings.data_srcset));
        setAttributeIfValue(element, "src", getData(element, settings.data_src));
    };

    var setSourcesImg = function setSourcesImg(element, settings) {
        var parent = element.parentNode;

        if (parent && parent.tagName === "PICTURE") {
            var sourceTags = getSourceTags(parent);
            sourceTags.forEach(function(sourceTag) {
                setImageAttributes(sourceTag, settings);
            });
        }

        setImageAttributes(element, settings);
    };

    var setSourcesIframe = function setSourcesIframe(element, settings) {
        setAttributeIfValue(element, "src", getData(element, settings.data_src));
    };

    var setSourcesVideo = function setSourcesVideo(element, settings) {
        var sourceTags = getSourceTags(element);
        sourceTags.forEach(function(sourceTag) {
            setAttributeIfValue(sourceTag, "src", getData(sourceTag, settings.data_src));
        });
        setAttributeIfValue(element, "src", getData(element, settings.data_src));
        element.load();
    };

    var setSourcesBgImage = function setSourcesBgImage(element, settings) {
        var srcDataValue = getData(element, settings.data_src);
        var bgDataValue = getData(element, settings.data_bg);

        if (srcDataValue) {
            element.style.backgroundImage = "url(\"".concat(srcDataValue, "\")");
        }

        if (bgDataValue) {
            element.style.backgroundImage = bgDataValue;
        }
    };

    var setSourcesFunctions = {
        IMG: setSourcesImg,
        IFRAME: setSourcesIframe,
        VIDEO: setSourcesVideo
    };

    var setSources = function setSources(element, instance) {
        var settings = instance._settings;
        var tagName = element.tagName;
        var setSourcesFunction = setSourcesFunctions[tagName];

        if (setSourcesFunction) {
            setSourcesFunction(element, settings);
            updateLoadingCount(instance, 1);
            instance._elements = purgeOneElement(instance._elements, element);
            return;
        }

        setSourcesBgImage(element, settings);
    };

    var addClass = function addClass(element, className) {
        if (supportsClassList) {
            element.classList.add(className);
            return;
        }

        element.className += (element.className ? " " : "") + className;
    };

    var removeClass = function removeClass(element, className) {
        if (supportsClassList) {
            element.classList.remove(className);
            return;
        }

        element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
    };

    var genericLoadEventName = "load";
    var mediaLoadEventName = "loadeddata";
    var errorEventName = "error";

    var addEventListener = function addEventListener(element, eventName, handler) {
        element.addEventListener(eventName, handler);
    };

    var removeEventListener = function removeEventListener(element, eventName, handler) {
        element.removeEventListener(eventName, handler);
    };

    var addEventListeners = function addEventListeners(element, loadHandler, errorHandler) {
        addEventListener(element, genericLoadEventName, loadHandler);
        addEventListener(element, mediaLoadEventName, loadHandler);
        addEventListener(element, errorEventName, errorHandler);
    };

    var removeEventListeners = function removeEventListeners(element, loadHandler, errorHandler) {
        removeEventListener(element, genericLoadEventName, loadHandler);
        removeEventListener(element, mediaLoadEventName, loadHandler);
        removeEventListener(element, errorEventName, errorHandler);
    };

    var eventHandler = function eventHandler(event, success, instance) {
        var settings = instance._settings;
        var className = success ? settings.class_loaded : settings.class_error;
        var callback = success ? settings.callback_loaded : settings.callback_error;
        var element = event.target;
        removeClass(element, settings.class_loading);
        addClass(element, className);
        callbackIfSet(callback, element);
        updateLoadingCount(instance, -1);
    };

    var addOneShotEventListeners = function addOneShotEventListeners(element, instance) {
        var loadHandler = function loadHandler(event) {
            eventHandler(event, true, instance);
            removeEventListeners(element, loadHandler, errorHandler);
        };

        var errorHandler = function errorHandler(event) {
            eventHandler(event, false, instance);
            removeEventListeners(element, loadHandler, errorHandler);
        };

        addEventListeners(element, loadHandler, errorHandler);
    };

    var managedTags = ["IMG", "IFRAME", "VIDEO"];

    var onEnter = function onEnter(element, instance) {
        var settings = instance._settings;
        callbackIfSet(settings.callback_enter, element);

        if (!settings.load_delay) {
            revealAndUnobserve(element, instance);
            return;
        }

        delayLoad(element, instance);
    };

    var revealAndUnobserve = function revealAndUnobserve(element, instance) {
        var observer = instance._observer;
        revealElement(element, instance);

        if (observer && instance._settings.auto_unobserve) {
            observer.unobserve(element);
        }
    };

    var onExit = function onExit(element, instance) {
        var settings = instance._settings;
        callbackIfSet(settings.callback_exit, element);

        if (!settings.load_delay) {
            return;
        }

        cancelDelayLoad(element);
    };

    var cancelDelayLoad = function cancelDelayLoad(element) {
        var timeoutId = getTimeoutData(element);

        if (!timeoutId) {
            return; // do nothing if timeout doesn't exist
        }

        clearTimeout(timeoutId);
        setTimeoutData(element, null);
    };

    var delayLoad = function delayLoad(element, instance) {
        var loadDelay = instance._settings.load_delay;
        var timeoutId = getTimeoutData(element);

        if (timeoutId) {
            return; // do nothing if timeout already set
        }

        timeoutId = setTimeout(function() {
            revealAndUnobserve(element, instance);
            cancelDelayLoad(element);
        }, loadDelay);
        setTimeoutData(element, timeoutId);
    };

    var revealElement = function revealElement(element, instance, force) {
        var settings = instance._settings;

        if (!force && getWasProcessedData(element)) {
            return; // element has already been processed and force wasn't true
        }

        if (managedTags.indexOf(element.tagName) > -1) {
            addOneShotEventListeners(element, instance);
            addClass(element, settings.class_loading);
        }

        setSources(element, instance);
        setWasProcessedData(element);
        callbackIfSet(settings.callback_reveal, element);
        callbackIfSet(settings.callback_set, element);
    };

    var isIntersecting = function isIntersecting(entry) {
        return entry.isIntersecting || entry.intersectionRatio > 0;
    };

    var getObserverSettings = function getObserverSettings(settings) {
        return {
            root: settings.container === document ? null : settings.container,
            rootMargin: settings.thresholds || settings.threshold + "px"
        };
    };

    var setObserver = function setObserver(instance) {
        if (!supportsIntersectionObserver) {
            return false;
        }

        instance._observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                return isIntersecting(entry) ? onEnter(entry.target, instance) : onExit(entry.target, instance);
            });
        }, getObserverSettings(instance._settings));
        return true;
    };

    var nativeLazyTags = ["IMG", "IFRAME"];

    var shouldUseNative = function shouldUseNative(settings) {
        return settings.use_native && "loading" in HTMLImageElement.prototype;
    };

    var loadAllNative = function loadAllNative(instance) {
        instance._elements.forEach(function(element) {
            if (nativeLazyTags.indexOf(element.tagName) === -1) {
                return;
            }

            element.setAttribute("loading", "lazy");
            revealElement(element, instance);
        });
    };

    var nodeSetToArray = function nodeSetToArray(nodeSet) {
        return Array.prototype.slice.call(nodeSet);
    };

    var queryElements = function queryElements(settings) {
        return settings.container.querySelectorAll(settings.elements_selector);
    };

    var getElements = function getElements(elements, settings) {
        return purgeProcessedElements(nodeSetToArray(elements || queryElements(settings)));
    };

    var LazyLoad = function LazyLoad(customSettings, elements) {
        this._settings = defaultSettings;
        this._loadingCount = 0;
        setObserver(this);
        this.update(elements);
    };

    LazyLoad.prototype = {
        update: function update(elements) {
            var _this = this;

            var settings = this._settings;
            this._elements = getElements(elements, settings);

            if (isBot || !this._observer) {
                this.loadAll();
                return;
            }

            if (shouldUseNative(settings)) {
                loadAllNative(this);
                this._elements = getElements(elements, settings);
            }

            this._elements.forEach(function(element) {
                _this._observer.observe(element);
            });
        },
        destroy: function destroy() {
            var _this2 = this;

            if (this._observer) {
                this._elements.forEach(function(element) {
                    _this2._observer.unobserve(element);
                });

                this._observer = null;
            }

            this._elements = null;
            this._settings = null;
        },
        load: function load(element, force) {
            revealElement(element, this, force);
        },
        loadAll: function loadAll() {
            var _this3 = this;

            this._elements.forEach(function(element) {
                revealAndUnobserve(element, _this3);
            });
        }
    };
    /* Automatic instances creation if required (useful for async script loading) */

    if (runningOnBrowser) {
        autoInitialize(LazyLoad, window.lazyLoadOptions);
    }

    return LazyLoad;
});//Variable initialization
var Main_isReleased = false;
var Main_isDebug = false;

var Main_cursorYAddFocus = -1;

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
    "gameSelectedOld": null,
    "Games_return": false,
    "Search_isSearching": false,
    "Play_ChatForceDisable": false,
    "Never_run": true,
    "Main_CenterLablesVectorPos": 0,
    "Chat_font_size": 3,
    "ChatBackground": 10,
    "IsRerun": false,
    "Main_selectedChannelPartner": false,
};

var Main_LastClickFinish = true;
var Main_addFocusFinish = true;
var Main_CenterLablesInUse = false;
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

var Main_clientId = "5seja5ptej058mxqy7gh5tcudjqtm9";
var Main_clientIdHeader = 'Client-ID';
var Main_AcceptHeader = 'Accept';
var Main_Authorization = 'Authorization';
var Main_OAuth = 'OAuth ';
var Main_TwithcV5Json = 'application/vnd.twitchtv.v5+json';

var Main_classThumb = 'stream_thumbnail_focused';
var Main_DataAttribute = 'data_attribute';

var Main_stringVersion = '2.0';
var Main_stringVersion_Min = '.48';
var Main_minversion = '081119';
var Main_versionTag = Main_stringVersion + Main_stringVersion_Min + '-' + Main_minversion;
var Main_IsNotBrowserVersion = '';
var Main_ClockOffset = 0;
var Main_IsNotBrowser = 0;
var Main_randomimg = '?' + Math.random();
var proxyurl = "https://cors-anywhere.herokuapp.com/";
var Main_updateUserFeedId;
var Main_vp9supported = false;
var lazyLoadInstance;
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
        }
        Main_showLoadDialog();

        if (Main_IsNotBrowser) Main_vp9supported = Android.misCodecSupported();

        Settings_SetDefautls();
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

        Main_initWindows();
    });

}

function Main_initWindows() {
    lazyLoadInstance = new LazyLoad();

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
        }
        document.body.addEventListener("keyup", Main_handleKeyUp, false);
        Screens_InitSecondaryScreens();

        document.getElementById("side_panel").style.marginLeft = '';

        Main_checkVersion();

        Main_SetStringsSecondary();

        Play_MakeControls();
        Play_SetControls();
        Play_SetFullScreen(Play_isFullScreen);

        PlayVod_RestoreVodIds();

        Main_SearchInput = document.getElementById("search_input");
        Main_AddUserInput = document.getElementById("user_input");

        document.addEventListener('visibilitychange', Main_Resume, false);
        Main_updateclockId = window.setInterval(Main_updateclock, 60000);

        inUseObj = Live;
        //Minor delay to let all properly load before starting to show the app
        window.setTimeout(function() {
            Main_ready(function() {
                Screens_init();
                Main_SetTopOpacityId = window.setTimeout(Main_SetTopOpacity, 5000);
                Sidepannel_UpdateThumbDoc = document.getElementById("feed_thumb_img");
            });
        }, (Main_IsNotBrowser && Settings_value.restor_playback.defaultValue && !Main_values.Play_WasPlaying) ? 1000 : 0);
    });
}

function Main_SetStringsMain(isStarting) {
    Main_updateclock();

    //set top bar labels
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);
    Main_innerHTML('label_update', '<div class="strokedeline" style="vertical-align: middle; display: inline-block;"><i class="icon-arrow-up" style="color: #FF0000; font-size: 115%; "></i></div><div class="strokedeline" style="vertical-align: middle; display: inline-block; color: #FF0000">' + STR_SPACE + STR_UPDATE_AVAILABLE + '</div>');

    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);

    Main_innerHTML('icon_feed_refresh', '<div class="strokedelinebig" style="vertical-align: middle; display: inline-block;"><i class="icon-refresh" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_REFRESH + ':' + STR_UP + STR_SPACE + STR_SPACE + '</div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block;"><i class="icon-pp" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_PICTURE_LIVE_FEED + '</div>');


    Main_textContent('top_bar_live', STR_LIVE);
    Main_textContent('top_bar_user', isStarting ? STR_USER : STR_SETTINGS);
    Main_textContent('top_bar_featured', STR_FEATURED);
    Main_textContent('top_bar_game', STR_GAMES);
    Main_textContent('top_bar_vod', STR_VIDEOS);
    Main_textContent('top_bar_clip', STR_CLIPS);

    Main_textContent("dialog_end_next_text", STR_PLAY_NEXT);
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

    Main_textContent('side_panel_feed_settings', STR_SIDE_PANEL_SETTINGS);
    Main_textContent('side_panel_feed_refresh', STR_REFRESH);

    Main_textContent('side_panel_live', STR_LIVE);
    Main_textContent('side_panel_user', STR_USER);
    Main_textContent('side_panel_featured', STR_FEATURED);
    Main_textContent('side_panel_games', STR_GAMES);
    Main_textContent('side_panel_videos', STR_VIDEOS);
    Main_textContent('side_panel_clips', STR_CLIPS);
    Main_textContent('side_panel_hide', STR_HIDE);
    Main_textContent('side_panel_back', STR_LIVE_FEED);

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
    Main_innerHTML(lable, '<div class="strokedeline" style="vertical-align: middle; display: inline-block;"><i class="' + icon + '" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedeline" style="vertical-align: middle; display: inline-block">' + STR_SPACE + string + '</div>');
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
    if (Sidepannel_Isscreen) {
        Sidepannel_Isscreen = false;
        Main_SwitchScreenAction();
    } else Main_CenterLablesStart(Sidepannel_Callback);
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

function Main_SwitchScreenAction(removekey) {
    Main_HideWarningDialog();
    if (Main_values.Main_Go !== Main_ChannelContent) Main_values.Main_BeforeChannelisSet = false;
    if (Main_values.Main_Go !== Main_aGame) Main_values.Main_BeforeAgameisSet = false;

    Main_CounterDialogRst();

    if (Main_Switchobj[Main_values.Main_Go]) Main_Switchobj[Main_values.Main_Go]();
    else Main_Switchobj[1]();

    Main_SetTopOpacityId = window.setTimeout(Main_SetTopOpacity, 3000);
    if (removekey) Main_RemoveKeys();
}

function Main_OpenSearch() {
    if (!Main_values.Search_isSearching) Main_values.Main_BeforeSearch = Main_values.Main_Go;
    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_Search;
    Main_HideWarningDialog();
    Main_CounterDialogRst();
    window.clearTimeout(Main_SetTopOpacityId);
    Main_UnSetTopOpacity();
    Search_init();
}

function Main_SaveValues() {
    Main_setItem('Main_values', JSON.stringify(Main_values));
}

function Main_RestoreValues() {
    Main_values = Screens_assign(Main_values, Main_getItemJson('Main_values', {}));
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

function Main_ExitCurrent(ExitCurrent) {
    if (Main_ExitCurrentobj[ExitCurrent]) Main_ExitCurrentobj[ExitCurrent]();
    if (Main_isElementShowing('settings_scroll')) Settings_exit();
}

function Main_RestoreTopLabel() {
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);
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
    if (Main_IsDayFirst) return time.getDate() + ' ' + STR_MONTHS[time.getMonth()] + ' ' + time.getFullYear();
    else return STR_MONTHS[time.getMonth()] + ' ' + time.getDate() + ' ' + time.getFullYear();
}

function Main_checkVersion() {
    //TODO remove the try after android app update has be releaased for some time
    if (Main_IsNotBrowser) {
        Main_versionTag = "Android: " + Main_IsNotBrowserVersion + ' Web: ' + Main_minversion;
        if (Main_needUpdate(Main_IsNotBrowserVersion)) Main_ShowElement('label_update');
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

function Main_createEmptyCell(id) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', id);
    Main_td.className = 'stream_cell';

    return Main_td;
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

function Main_OpenLiveStream(id, idsArray, handleKeyDownFunction) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    document.body.removeEventListener("keydown", handleKeyDownFunction);
    Main_values.Play_selectedChannel = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));

    Main_values.Play_selectedChannel_id = Main_values.Play_selectedChannel[1];
    Main_values.IsRerun = Main_values.Play_selectedChannel[2];
    Main_values.Play_selectedChannel = Main_values.Play_selectedChannel[0];

    Main_values.Play_isHost = (Main_values.Main_Go === Main_UserHost) && !Play_UserLiveFeedPressed;

    if (Main_values.Play_isHost) {
        Main_values.Play_DisplaynameHost = document.getElementById(idsArray[3] + id).textContent;
        Main_values.Play_selectedChannelDisplayname = Main_values.Play_DisplaynameHost.split(STR_USER_HOSTING)[1];
    } else Main_values.Play_selectedChannelDisplayname = document.getElementById(idsArray[3] + id).textContent;

    var playing = document.getElementById(idsArray[5] + id).textContent;
    Main_values.Play_gameSelected = playing.indexOf(STR_PLAYING) !== -1 ? playing.split(STR_PLAYING)[1] : "";

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
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
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
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    document.body.removeEventListener("keydown", handleKeyDownFunction);
    Main_values.ChannelVod_vodId = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));
    ChannelVod_DurationSeconds = parseInt(Main_values.ChannelVod_vodId[1]);
    ChannelVod_language = Main_values.ChannelVod_vodId[2];
    Main_values.Play_gameSelected = Main_values.ChannelVod_vodId[3];

    if (Main_values.Play_gameSelected === null) Main_values.Play_gameSelected = "";

    Main_values.Main_selectedChannel_id = Main_values.ChannelVod_vodId[6];
    Main_values.Main_selectedChannelLogo = Main_values.ChannelVod_vodId[7];
    Main_values.Main_selectedChannelPartner = Main_values.ChannelVod_vodId[8];

    Main_values.Main_selectedChannel = Main_values.ChannelVod_vodId[4];
    Play_IncrementView = Main_values.ChannelVod_vodId[5];
    Main_values.ChannelVod_vodId = Main_values.ChannelVod_vodId[0].substr(1);
    Main_values.Main_selectedChannelDisplayname = document.getElementById(idsArray[3] + id).textContent;

    ChannelVod_createdAt = document.getElementById(idsArray[4] + id).textContent;
    ChannelVod_Duration = document.getElementById(idsArray[5] + id).textContent;
    ChannelVod_title = document.getElementById(idsArray[11] + id).innerHTML;
    ChannelVod_views = document.getElementById(idsArray[6] + id).textContent;

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

    if (Main_IsDayFirst) dayMonth = STR_DAYS[date.getDay()] + ' ' + date.getDate() + ' ' + STR_MONTHS[date.getMonth()];
    else dayMonth = STR_DAYS[date.getDay()] + ' ' + STR_MONTHS[date.getMonth()] + ' ' + date.getDate();

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

function Main_RandomInt() {
    return parseInt(Math.random() * 1000000000);
}

function Main_updateUserFeed() {
    if (AddUser_UserIsSet()) {
        window.setTimeout(function() {
            if (!document.hidden && !UserLiveFeed_isFeedShow() && !Sidepannel_isShowing() && !UserLiveFeed_loadingData) {
                Play_FeedOldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
                UserLiveFeed_StartLoad();
            }
        }, 15000);
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
                    if (Main_values.Games_return) {
                        Main_values.Main_Go = Main_SearchGames;
                        Main_values.Main_gameSelected = Main_values.gameSelectedOld;
                        Main_values.gameSelectedOld = null;
                    } else {
                        Main_values.Main_Go = Main_values.Main_BeforeAgame;
                        Main_values.Main_BeforeAgame = Main_games;
                    }
                    Main_CenterLablesCleanSwitchScreen(Main_values.Main_Go);
                } else if (Main_values.Main_Go === Main_AGameClip) {
                    Main_CenterLablesCleanSwitchScreen(Main_aGame);
                } else if (Main_values.Main_Go === Main_usergames ||
                    Main_values.Main_Go === Main_UserHost || Main_values.Main_Go === Main_UserVod ||
                    Main_values.Main_Go === Main_UserLive || Main_values.Main_Go === Main_UserChannels) {
                    Main_CenterLablesCleanSwitchScreen(Main_Users);
                } else if (Main_values.Main_Go === Main_ChannelClip) {
                    Main_CenterLablesCleanSwitchScreen(Main_ChannelContent);
                } else if (Main_values.Main_Go === Main_AGameVod) {
                    Main_CenterLablesCleanSwitchScreen(Main_aGame);
                } else if (Main_values.Main_Go === Main_ChannelContent) {
                    Main_values.Main_Go = Main_values.Main_BeforeChannel;
                    Main_values.Main_BeforeChannel = Main_Live;
                    ChannelContent_exit();
                    Main_values.Main_selectedChannel_id = '';
                    Main_CenterLablesCleanSwitch();
                } else if (Main_values.Main_Go === Main_ChannelVod) {
                    Main_CenterLablesCleanSwitchScreen(Main_ChannelContent);
                } else if (Main_values.Main_Go === Main_SearchLive) {
                    if (Main_values.Main_Go === Main_values.Main_BeforeSearch) Main_values.Main_Go = Main_Live;
                    else Main_values.Main_Go = Main_values.Main_BeforeSearch;
                    Main_values.Search_isSearching = false;
                    Main_CenterLablesCleanSwitchScreen(Main_values.Main_Go);
                } else if (Main_values.Main_Go === Main_SearchGames) {
                    if (Main_values.Main_Go === Main_values.Main_BeforeSearch) Main_values.Main_Go = Main_Live;
                    else Main_values.Main_Go = Main_values.Main_BeforeSearch;
                    Main_values.Search_isSearching = false;
                    Main_CenterLablesCleanSwitchScreen(Main_values.Main_Go);
                } else if (Main_values.Main_Go === Main_SearchChannels) {
                    if (Main_values.Main_Go === Main_values.Main_BeforeSearch) Main_values.Main_Go = Main_Live;
                    else Main_values.Main_Go = Main_values.Main_BeforeSearch;
                    if (Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
                    Main_values.Search_isSearching = false;
                    Main_CenterLablesCleanSwitchScreen(Main_values.Main_Go);
                } else {
                    Main_CenterLablesClean();
                    Sidepannel_Start(Main_CenterLables);
                }
            }
            break;
        case KEY_PG_UP:
        case KEY_RIGHT:
            if (Main_ForbidenScreens()) break;
            Main_RemoveClass(Main_CenterLablesVector[Main_values.Main_CenterLablesVectorPos], 'icon_center_line');
            Main_values.Main_CenterLablesVectorPos++;
            if (Main_values.Main_CenterLablesVectorPos > 5) Main_values.Main_CenterLablesVectorPos = 0;
            Main_CenterLablesChange();
            Main_CenterLablesExit();
            break;
        case KEY_PG_DOWN:
        case KEY_LEFT:
            if (Main_ForbidenScreens()) break;
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
        case KEY_REFRESH:
            Main_ReloadScreen();
            break;
        default:
            break;
    }
}

function Main_ForbidenScreens() {
    return Main_values.Search_isSearching || Main_values.Main_Go === Main_ChannelContent ||
        Main_values.Main_Go === Main_ChannelVod || Main_values.Main_Go === Main_ChannelClip ||
        Main_values.Main_Go === Main_SearchLive || Main_values.Main_Go === Main_SearchGames ||
        Main_values.Main_Go === Main_SearchChannels;
}

function Main_CenterLablesCleanSwitchScreen(screen) {
    Screens_BasicExit(screen);
    Main_CenterLablesCleanSwitch();
}

function Main_CenterLablesCleanSwitch() {
    Main_CenterLablesClean();
    Main_SwitchScreenAction();
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
        AddUser_init();
    } else Main_SwitchScreen(true);
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

        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    }
}

function Main_ReloadScreen() {
    window.clearTimeout(Main_SetTopOpacityId);
    Main_UnSetTopOpacity();

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

        Screens_StartLoad();
    }

    Main_SetTopOpacityId = window.setTimeout(Main_SetTopOpacity, 3000);
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
        console.log('if code ' + code);
        Main_newUsercode = code;
    } else {
        console.log('else code ' + code);
        Main_newUsercode = 0;
    }
}

//Basic XMLHttpRequest thatonly returns error or 200 status
function BasehttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, useProxy) {
    if (Main_IsNotBrowser) BaseAndroidhttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError);
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
    } else if (HeaderQuatity > 2 && (xmlHttp.status === 401 || xmlHttp.status === 403)) { //token expired
        AddCode_refreshTokens(Main_values.Users_Position, 0, Screens_loadDataRequestStart, Screens_loadDatafail);
    } else {
        calbackError();
    }
}

var Main_Headers = [
    [Main_clientIdHeader, Main_clientId],
    [Main_AcceptHeader, Main_TwithcV5Json],
    [Main_Authorization, null]
];

function BasexmlHttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, useProxy) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", (useProxy ? proxyurl : '') + theUrl, true);
    xmlHttp.timeout = Timeout;

    Main_Headers[2][1] = access_token;

    for (var i = 0; i < HeaderQuatity; i++)
        xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                callbackSucess(xmlHttp.responseText);
            } else if (HeaderQuatity > 2 && (xmlHttp.status === 401 || xmlHttp.status === 403)) { //token expired
                AddCode_refreshTokens(Main_values.Users_Position, 0, Screens_loadDataRequestStart, Screens_loadDatafail);
            } else {
                calbackError();
            }
        }
    };

    xmlHttp.send(null);
}

//Duplicated (BasehttpPost === BasehttpGet minus the post part ) as the android side may not be there and is not needed yet
//function BasehttpPost(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, useProxy) { // jshint ignore:line
//    if (Main_IsNotBrowser) BasexmlHttpPost(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError);
//    else BasexmlHttpGet(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, useProxy);
//}

//function BasexmlHttpPost(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError) {
//    var xmlHttp = Android.mreadUrl(theUrl, Timeout, HeaderQuatity, access_token, true);

//    if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
//    else {
//        calbackError();
//        return;
//    }

//    if (xmlHttp.status === 200) {
//        callbackSucess(xmlHttp.responseText);
//    } else {
//        calbackError();
//    }
//}

//function BasexmlHttpPost(theUrl, Timeout, HeaderQuatity, access_token, callbackSucess, calbackError, useProxy) {
//    var xmlHttp = new XMLHttpRequest();

//    xmlHttp.open("POST", (useProxy ? proxyurl : '') + theUrl, true);
//    xmlHttp.timeout = Timeout;

//    Main_Headers[2][1] = access_token;

//    for (var i = 0; i < HeaderQuatity; i++)
//       xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

//    xmlHttp.ontimeout = function() {};

//    xmlHttp.onreadystatechange = function() {
//        if (xmlHttp.readyState === 4) {
//            if (xmlHttp.status === 200) {
//                callbackSucess(xmlHttp.responseText);
//                return;
//            } else {
//                calbackError();
//            }
//        }
//    };

//    xmlHttp.send(null);
//}

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
var PlayVod_VodIds = {};
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
//Variable initialization end

function PlayVod_Start() {
    Play_showBufferDialog();
    Play_HideEndDialog();
    PlayVod_currentTime = 0;
    Main_textContent("stream_live_time", '');
    Main_textContent('progress_bar_current_time', Play_timeS(0));
    Chat_title = STR_PAST_BROA + '.';
    Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i> </div>');
    Main_HideElement('progress_pause_holder');
    Main_ShowElement('progress_bar_div');

    //past broadcast
    document.getElementById('controls_' + Play_controlsOpenVod).style.display = 'none';
    //Chat delay
    document.getElementById('controls_' + Play_controlsChatDelay).style.display = 'none';
    PlayExtra_UnSetPanel();
    Play_CurrentSpeed = 3;
    Play_IconsResetFocus();

    Play_ShowPanelStatus(2);

    PlayVod_StepsCount = 0;
    Play_DefaultjumpTimers = PlayVod_jumpTimers;
    PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);
    PlayVod_state = Play_STATE_LOADING_TOKEN;
    PlayClip_HasVOD = true;
    ChannelVod_vodOffset = 0;
    Main_values.Play_isHost = false;
    PlayClip_HideShowNext(0, 0);
    PlayClip_HideShowNext(1, 0);

    if (Main_values.vodOffset) { // this is a vod coming from a clip or from restore playback
        PlayVod_PrepareLoad();
        PlayVod_updateVodInfo();
    } else {
        PlayVod_updateStreamerInfoValues();
        Main_innerHTML("stream_info_title", ChannelVod_title);
        Main_innerHTML("stream_info_game", '');
        //todo fix this
        Main_textContent("stream_live_viewers", ChannelVod_views);
        Main_innerHTML("stream_watching_time", STR_SPACE + "|" + STR_SPACE + ChannelVod_createdAt);

        Main_replaceClassEmoji('stream_info_game');
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
        Main_ShowElement('controls_holder');
        Main_ShowElement('progress_pause_holder');
    }, 1000);
    Main_textContent('progress_bar_duration', Play_timeS(ChannelVod_DurationSeconds));

    Main_values.Play_WasPlaying = 2;
    Main_SaveValues();

    PlayVod_SaveOffsetId = window.setInterval(PlayVod_SaveOffset, 60000);
    new Image().src = Play_IncrementView;

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

function PlayVod_updateStreamerInfoValues() {
    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);
    Play_partnerIcon(Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelPartner, false, ' [' + (ChannelVod_language).toUpperCase() + ']');

    //The chat init will happens after user click on vod dialog
    if (!PlayVod_VodIds['#' + Main_values.ChannelVod_vodId]) Chat_Init();

    if (AddUser_UserIsSet()) {
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
        AddCode_PlayRequest = true;
        AddCode_CheckFallow();
    } else Play_hideFallow();
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

    //TODO add a warning about muted segments
    //if (response.muted_segments) console.log(response.muted_segments);

    Main_values.Main_selectedChannelPartner = response.channel.partner;
    Play_partnerIcon(Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelPartner, false,
        '[' + (response.channel.broadcaster_language).toUpperCase() + ']');

    Main_innerHTML("stream_info_title", twemoji.parse(response.title, false, true));
    Main_innerHTML("stream_info_game", (response.game !== "" && response.game !== null ? STR_STARTED + STR_PLAYING +
        response.game : ""));
    Main_textContent("stream_live_viewers", Main_addCommas(response.views) + STR_VIEWS);

    Main_innerHTML("stream_watching_time", STR_SPACE + "|" + STR_SPACE + STR_STREAM_ON + Main_videoCreatedAt(response.created_at));

    ChannelVod_DurationSeconds = parseInt(response.length);
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
    new Image().src = response.increment_view_count_url;
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
            Play_ClearPlayer();
            window.clearInterval(PlayVod_SaveOffsetId);
        }
    } else {
        PlayVod_isOn = true;
        Play_clearPause();
        if (PlayVod_isOn) {
            Play_showBufferDialog();
            Play_ResumeAfterOnlineCounter = 0;

            //Get the time from android as it can save it more reliably
            Main_values.vodOffset = Android.getsavedtime() / 1000;

            if (navigator.onLine) PlayVod_ResumeAfterOnline();
            else Play_ResumeAfterOnlineId = window.setInterval(PlayVod_ResumeAfterOnline, 100);

            Play_EndSet(2);
            PlayVod_SaveOffsetId = window.setInterval(PlayVod_SaveOffset, 60000);

            window.clearInterval(Play_ShowPanelStatusId);
            Play_ShowPanelStatusId = window.setInterval(function() {
                Play_UpdateStatus(2);
            }, 1000);
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
    //Prevent setting it to 0 before it was used
    if (!Main_values.vodOffset) {
        Main_values.vodOffset = Main_IsNotBrowser ? (parseInt(Android.gettime() / 1000)) : 0;
        Main_SaveValues();
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
    var theUrl;

    if (PlayVod_state === Play_STATE_LOADING_TOKEN) {
        theUrl = 'https://api.twitch.tv/api/vods/' + Main_values.ChannelVod_vodId + '/access_token?platform=_' +
            (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token ? '&oauth_token=' +
                AddUser_UsernameArray[Main_values.Users_Position].access_token : '');
    } else {
        theUrl = 'https://usher.ttvnw.net/vod/' + Main_values.ChannelVod_vodId +
            '.m3u8?&nauth=' + encodeURIComponent(PlayVod_tokenResponse.token) + '&nauthsig=' +
            PlayVod_tokenResponse.sig +
            '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true' +
            (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();
        PlayVod_autoUrl = theUrl;
    }

    BasehttpGet(theUrl, Play_loadingDataTimeout, 1, null, PlayVod_loadDataSuccess, PlayVod_loadDataError, false);
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
            'url': ''
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
    ];
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
        if (Main_IsNotBrowser) Android.SetAuto(PlayVod_autoUrl);
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
    PlayVod_qualityIndex = 0;
    PlayVod_playingUrl = PlayVod_qualities[0].url;
    if (PlayVod_quality.indexOf("source") !== -1) PlayVod_quality = "source";

    for (var i = 0; i < PlayVod_getQualitiesCount(); i++) {
        if (PlayVod_qualities[i].id.indexOf(PlayVod_quality) !== -1) {
            PlayVod_qualityIndex = i;
            PlayVod_playingUrl = PlayVod_qualities[i].url;
        }
    }

    PlayVod_qualityPlaying = PlayVod_quality;
    PlayVod_SetHtmlQuality('stream_quality');
    PlayVod_onPlayer();
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
        PlayVod_qualities = [];
        PlayVod_PreshutdownStream(true);
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
    document.removeEventListener('visibilitychange', PlayVod_Resume);
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
        PlayVod_qualityDisplay();
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
        if (PlayVod_qualityPlaying.indexOf("Auto") !== -1 && show) {
            var value = Android.getVideoQuality();

            if (value !== null && value !== undefined) Play_getVideoQuality(value);
            else PlayVod_SetHtmlQuality('stream_quality');
        }

        if (Main_IsNotBrowser) {
            try {
                Play_Status(Android.getVideoStatus());
            } catch (e) {}
        } else Play_StatusFake();
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

function PlayVod_qualityDisplay() {
    if (PlayVod_getQualitiesCount() === 1) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "0";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "0";
    } else if (!PlayVod_qualityIndex) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "0.2";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "1";
    } else if (PlayVod_qualityIndex === PlayVod_getQualitiesCount() - 1) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "1";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "0.2";
    } else {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "1";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "1";
    }

    PlayVod_SetHtmlQuality('controls_name_' + Play_controlsQuality);
}

function PlayVod_SetHtmlQuality(element) {
    if (!PlayVod_qualities[PlayVod_qualityIndex].hasOwnProperty('id')) return;

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
    Play_clearPause();
    if (!Play_isEndDialogVisible()) {

        if (PlayVod_isOn) {
            if (Main_IsNotBrowser) {
                if (PlayVod_quality.indexOf("Auto") !== -1) Android.StartAuto(2,
                    (PlayVod_TimeToJump > 0) ? (PlayVod_TimeToJump * 1000) : -1);
                else Android.startVideoOffset(PlayVod_playingUrl, 2,
                    (PlayVod_TimeToJump > 0) ? (PlayVod_TimeToJump * 1000) : -1);

                Chat_offset = PlayVod_TimeToJump;
            }

        } else {
            Chat_offset = ChannelVod_vodOffset;
            if (Main_IsNotBrowser) Android.startVideoOffset(PlayClip_playingUrl, 3,
                (PlayVod_TimeToJump > 0) ? (PlayVod_TimeToJump * 1000) : -1);
        }

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
    var time = Main_IsNotBrowser ? (parseInt(Android.gettime() / 1000)) : 0;

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
    Main_HideElement('controls_holder');
    PlayVod_showPanel(false);
    Main_textContent('stream_quality', '');
    Main_innerHTML("dialog_vod_saved_text", STR_FROM + Play_timeMs(PlayVod_VodIds['#' + Main_values.ChannelVod_vodId] * 1000));
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
    Play_showBufferDialog();
    Main_ready(function() {
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
    });
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
                    Play_controls[Play_controlsChatPos].defaultValue = Play_ChatPositions;
                    Play_controls[Play_controlsChatPos].setLable();
                } else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(2, -1);
                    else if (!PlayVod_PanelY) {
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
                    if (Play_FeedPos < (UserLiveFeed_GetSize() - 1) && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos++;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible()) {
                    Play_controls[Play_controlsChat].enterKey(2);
                } else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(2, 1);
                    else if (!PlayVod_PanelY) {
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
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY--;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(2, 1);
                    PlayVod_setHidePanel();
                } else if (!UserLiveFeed_isFeedShow()) UserLiveFeed_ShowFeed();
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedRefreshFocus();
                else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_DOWN:
                if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(2, -1);
                    PlayVod_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
                else if (Play_isFullScreen && Play_isChatShown()) {
                    Play_ChatSizeValue++;
                    if (Play_ChatSizeValue > 3) {
                        Play_ChatSizeValue = 0;
                        Play_ChatPositionConvert(false);
                    } else if (Play_ChatSizeValue === 3) Play_ChatPositionConvert(true);
                    Play_ChatSize(true);
                    Play_controls[Play_controlsChatSize].defaultValue = Play_ChatSizeValue;
                    Play_controls[Play_controlsChatSize].bottomArrows();
                    Play_controls[Play_controlsChatSize].setLable();
                } else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_ENTER:
                if (Play_isVodDialogShown()) PlayVod_DialogPressed(PlayVod_VodPositions);
                else if (Play_isEndDialogVisible()) Play_EndDialogPressed(2);
                else if (Play_isPanelShown()) {
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
                } else if (UserLiveFeed_isFeedShow()) {
                    PlayVod_PreshutdownStream(true);
                    Main_OpenLiveStream(Play_FeedPos, UserLiveFeed_ids, Play_handleKeyDown);
                } else PlayVod_showPanel(true);
                break;
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
                if (!Main_values.Play_ChatForceDisable) {
                    if (Play_isNotplaying()) Chat_Play(Chat_Id);
                    else Chat_Pause();
                }
                if (!Play_isEndDialogVisible()) Play_KeyPause(2);
                break;
            case KEY_REFRESH:
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
            default:
                break;
        }
    }
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

}());//Variable initialization
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
    "keep_panel_info_visible": { //clip_auto_play_next
        "values": ["no", "yes"],
        "defaultValue": 1
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
    Main_HideElement('label_side_panel');
    Main_IconLoad('label_refresh', 'icon-arrow-circle-left', STR_GOBACK_START);
    document.body.addEventListener("keydown", Settings_handleKeyDown, false);
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
    Settings_DivOptionChangeLang('content_lang', STR_CONTENT_LANG, Languages_Selected);
}

function Settings_exit() {
    document.body.removeEventListener("keydown", Settings_handleKeyDown);
    Main_ShowElement('label_side_panel');
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
    Settings_value[key].values = [STR_CONTENT_LANG_SUMARRY];

    div += Settings_DivOptionWithSummary(key, STR_CONTENT_LANG, '');

    //thumb qualityes
    key = "thumb_quality";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_VERY_LOW, STR_LOW, STR_NORMAL, STR_HIGH, STR_VERY_HIGH];

    div += Settings_DivOptionWithSummary(key, STR_THUMB_RESOLUTION, STR_THUMB_RESOLUTION_SUMARRY);

    //Player restore playback
    key = "restor_playback";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionWithSummary(key, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMARRY);

    // Videos
    key = "videos_animation";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionNoSummary(key, STR_VIDEOS_ANIMATION);

    key = "clip_auto_play_next";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionNoSummary(key, STR_AUTO_PLAY_NEXT);

    // Clock offset
    key = "clock_offset";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_CLOCK_OFFSET);

    // Player settings title
    div += Settings_DivTitle('play', STR_SETTINGS_PLAYER);

    key = "keep_panel_info_visible";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionNoSummary(key, STR_KEEP_INFO_VISIBLE);

    // end_dialog_counter
    key = "end_dialog_counter";
    Settings_value_keys.push(key);
    Settings_value[key].values[0] = STR_END_DIALOG_DISABLE;

    div += Settings_DivOptionWithSummary(key, STR_END_DIALOG_SETTINGS, STR_END_DIALOG_SETTINGS_SUMMARY);

    //Player restore playback
    key = "default_quality";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_AUTO, STR_SOURCE];

    div += Settings_DivOptionWithSummary(key, STR_DEF_QUALITY, STR_DEF_QUALITY_SUMARRY);

    // Player buffer title/summary
    div += '<div id="setting_title_bandwidth" class="settings_title">' + STR_PLAYER_BITRATE + '</div>' +
        '<div id="setting_title_bandwidth_summary" class="settings_summary">' + STR_PLAYER_BITRATE_SUMARRY + '</div>';

    // Player buffer live
    key = "bitrate_main";
    Settings_value_keys.push(key);

    for (var i = 1; i < Settings_value[key].values.length; i++) {
        Settings_value[key].values[i] = Settings_value[key].values[i] + " Mbps";
    }
    Settings_value[key].values[0] = STR_PLAYER_BITRATE_UNLIMITED;

    div += Settings_DivOptionNoSummary(key, STR_PLAYER_BITRATE_MAIN);

    // Player buffer vod
    key = "bitrate_min";
    Settings_value_keys.push(key);
    Settings_value[key].values = Settings_value.bitrate_main.values;
    Settings_value[key].values[0] = STR_PLAYER_BITRATE_UNLIMITED;

    div += Settings_DivOptionWithSummary(key, STR_PLAYER_BITRATE_SMALL, STR_PLAYER_BITRATE_SMALL_SUMARRY);
    Settings_SetBitRate(0);

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
    Languages_SetSettings();
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
    Main_textContent(key, Settings_Obj_values(key));
    Settings_value[key].values = [STR_CONTENT_LANG_SUMARRY];

    //Player settings
    Main_textContent('setting_title_play', STR_SETTINGS_PLAYER);

    // Player buffer title/summary
    Main_textContent('setting_title_bandwidth', STR_PLAYER_BITRATE);
    Main_textContent('setting_title_bandwidth_summary', STR_PLAYER_BITRATE_SUMARRY);

    key = "bitrate_main";
    Main_textContent(key + '_name', STR_PLAYER_BITRATE_MAIN);
    Settings_value[key].values[0] = STR_DISABLE;
    key = "bitrate_min";
    Settings_DivOptionChangeLang(key, STR_PLAYER_BITRATE_SMALL, STR_PLAYER_BITRATE_SMALL_SUMARRY);
    Settings_value[key].values[0] = STR_DISABLE;

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
    Settings_value[key].values = [STR_YES, STR_NO];

    //Thumb quality
    key = "thumb_quality";
    Settings_DivOptionChangeLang(key, STR_THUMB_RESOLUTION, STR_THUMB_RESOLUTION_SUMARRY);
    Settings_value[key].values = [STR_VERY_LOW, STR_LOW, STR_NORMAL, STR_HIGH, STR_VERY_HIGH];

    //Player restore
    key = "default_quality";
    Settings_DivOptionChangeLang(key, STR_DEF_QUALITY, STR_DEF_QUALITY_SUMARRY);
    Settings_value[key].values = [STR_AUTO, STR_SOURCE];

    // Chat size
    key = "end_dialog_counter";
    Settings_DivOptionChangeLang(key, STR_END_DIALOG_SETTINGS, STR_END_DIALOG_SETTINGS_SUMMARY);
    Settings_value[key].values[0] = STR_END_DIALOG_DISABLE;

    // Videos
    key = "videos_animation";
    Main_textContent(key + '_name', STR_VIDEOS_ANIMATION);
    Settings_value[key].values = [STR_YES, STR_NO];

    key = "clip_auto_play_next";
    Main_textContent(key + '_name', STR_AUTO_PLAY_NEXT);
    Settings_value[key].values = [STR_NO, STR_YES];

    key = "keep_panel_info_visible";
    Main_textContent(key + '_name', STR_KEEP_INFO_VISIBLE);
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
    Main_SetThumb();
    Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
    PlayClip_All_Forced = Settings_Obj_default("clip_auto_play_next");
    Play_Status_Always_On = Settings_Obj_default("keep_panel_info_visible");
    Play_EndSettingsCounter = Settings_Obj_default("end_dialog_counter");
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
    var key = Settings_value_keys[Settings_cursorY];
    Main_AddClass(key, 'settings_value_focus');
    Main_AddClass(key + '_div', 'settings_div_focus');
    Settings_Setarrows(position);
    Settings_ScrollTable();
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
    else if (position === "keep_panel_info_visible") Play_Status_Always_On = Settings_Obj_default("keep_panel_info_visible");
    else if (position === "buffer_live") Settings_SetBuffers(1);
    else if (position === "buffer_vod") Settings_SetBuffers(2);
    else if (position === "buffer_clip") Settings_SetBuffers(3);
    else if (position === "end_dialog_counter") Play_EndSettingsCounter = Settings_Obj_default("end_dialog_counter");
    else if (position === "default_quality") Play_SetQuality();
    else if (position === "thumb_quality") Main_SetThumb();
    else if (position === "clock_offset") {
        Settings_SetClock();
        Main_updateclock();
    } else if (position === "bitrate_main") Settings_SetBitRate(1);
    else if (position === "bitrate_min") Settings_SetBitRate(2);
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

    try {
        Android.SetMainPlayerBandwidth(value);
    } catch (e) {}
    console.log('main value ' + value);
}

function Settings_SetBitRateMin() {
    var value;

    if (Settings_Obj_default("bitrate_min") > 0)
        value = parseInt(Settings_Obj_values("bitrate_min").split(" ")[0] * 1000000);
    else value = 0;

    try {
        Android.SetSmallPlayerBandwidth(value);
    } catch (e) {}
    console.log('min value ' + value);
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

function Settings_ScrollTable() {
    var doc = document.getElementById('settings_scroll');

    doc.scrollTop = (Settings_cursorY > 7) ? doc.scrollHeight : 0;
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
        case KEY_ENTER:
            if (!Settings_cursorY) Languages_init();
            break;
        default:
            break;
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
}//Variable initialization
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
var PlayClip_PlayerCheckQualityChanged = false;
var PlayClip_Buffer = 2000;

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
    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);
    Main_textContent("stream_info_name", Main_values.Main_selectedChannelDisplayname);
    Main_innerHTML("stream_info_title", ChannelClip_title);
    Main_innerHTML("stream_info_game", ChannelClip_game);
    Main_textContent("stream_live_viewers", ChannelClip_views);
    Main_innerHTML("stream_watching_time", STR_SPACE + "|" + STR_SPACE + ChannelClip_createdAt);
    Main_textContent('progress_bar_duration', Play_timeS(PlayClip_DurationSeconds));
    Play_DefaultjumpTimers = PlayClip_jumpTimers;
    PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);
    Main_replaceClassEmoji('stream_info_title');

    Main_values.Play_isHost = false;
    PlayClip_SetOpenVod();
    document.getElementById('controls_' + Play_controlsChatDelay).style.display = 'none';
    PlayExtra_UnSetPanel();
    Play_CurrentSpeed = 3;
    Play_IconsResetFocus();

    Play_ShowPanelStatus(3);

    Main_textContent('progress_bar_current_time', Play_timeS(0));
    Main_textContent("stream_live_time", '');
    PlayClip_HasVOD = Main_values.ChannelVod_vodId !== null;
    Chat_title = STR_CLIP + '.';
    if (PlayClip_HasVOD) {
        Chat_offset = ChannelVod_vodOffset;
        Chat_Init();
    } else Chat_NoVod();
    Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i> </div>');
    Main_ShowElement('progress_bar_div');
    Main_ShowElement('controls_holder');

    Play_PlayerPanelOffset = -13;
    PlayClip_state = 0;
    PlayClip_currentTime = 0;
    PlayClip_qualityIndex = 2;
    PlayClip_UpdateNext();
    Play_EndSet(3);
    Play_IsWarning = false;

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

    PlayClip_loadingtreamerInfoTry = 0;
    PlayClip_GetStreamerInfo();
}

function PlayClip_GetStreamerInfo() {
    var theUrl = 'https://api.twitch.tv/kraken/channels/' + Main_values.Main_selectedChannel_id;

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
}

function PlayClip_QualityGenerate(response) {
    PlayClip_qualities = [];

    response = JSON.parse(response).quality_options;

    for (var i = 0; i < response.length; i++) {

        if (!PlayClip_qualities.length) {
            PlayClip_qualities.push({
                'id': response[i].quality + 'p' + PlayClip_FrameRate(response[i].frame_rate) + ' | source | mp4',
                'url': response[i].source
            });
        } else {
            PlayClip_qualities.push({
                'id': response[i].quality + 'p' + PlayClip_FrameRate(response[i].frame_rate) + ' | mp4',
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
    PlayClip_SetHtmlQuality('stream_quality');

    if (Main_IsNotBrowser && PlayClip_isOn) Android.startVideoOffset(PlayClip_playingUrl, 3,
        PlayClip_replay ? -1 : Android.gettime());
    PlayClip_replay = false;
    PlayClip_onPlayer();
}

function PlayClip_onPlayer() {
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
    if (document.hidden) PlayClip_shutdownStream();
}

function PlayClip_shutdownStream() {
    if (PlayClip_isOn) {
        PlayClip_All = false;
        PlayClip_PreshutdownStream();
        Play_CleanHideExit();
        Play_exitMain();
    }
}

function PlayClip_PreshutdownStream() {
    PlayClip_hidePanel();
    PlayClip_qualities = [];
    if (Main_IsNotBrowser) Android.stopVideo(3);
    PlayClip_isOn = false;
    Chat_Clear();
    Play_ClearPlayer();
    UserLiveFeed_Hide();
    document.body.removeEventListener("keydown", PlayClip_handleKeyDown);
    document.removeEventListener('visibilitychange', PlayClip_Resume);
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
        Main_innerHTML("next_button_text_title", text[9]);

        Main_textContent("end_next_button_text_name", text[4]);
        Main_innerHTML("end_next_button_text_title", text[9]);

        PlayClip_HideShowNext(0, 1);
    } else PlayClip_HideShowNext(0, 0);

    if (backid) {
        PlayClip_HasBack = true;
        text = JSON.parse(document.getElementById(inUseObj.ids[8] + backid).getAttribute(Main_DataAttribute));
        Main_textContent("back_button_text_name", text[4]);
        Main_innerHTML("back_button_text_title", text[9]);
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
        PlayClip_PreshutdownStream();
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
    PlayClip_qualityDisplay();
    Play_ForceShowPannel();
    Play_clearHidePanel();
    PlayClip_setHidePanel();
}

function PlayClip_RefreshProgressBarr() {
    if (Main_IsNotBrowser) PlayVod_ProgresBarrUpdate((Android.gettime() / 1000), PlayClip_DurationSeconds, !PlayVod_IsJumping);

    if (!Play_Status_Always_On) {
        if (Main_IsNotBrowser) {
            try {
                Play_Status(Android.getVideoStatus());
            } catch (e) {}
        } else Play_StatusFake();
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

function PlayClip_qualityDisplay() {
    if (PlayClip_getQualitiesCount() === 1) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "0";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "0";
    } else if (!PlayClip_qualityIndex) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "0.2";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "1";
    } else if (PlayClip_qualityIndex === PlayClip_getQualitiesCount() - 1) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "1";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "0.2";
    } else {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "1";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "1";
    }

    PlayClip_SetHtmlQuality('controls_name_' + Play_controlsQuality);
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
        PlayClip_PreshutdownStream();
        document.body.addEventListener("keydown", PlayVod_handleKeyDown, false);
        Play_IconsResetFocus();
        Main_ready(PlayVod_Start);
    } else {
        Play_clearHidePanel();
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
                if (UserLiveFeed_isFeedShow()) {
                    if (Play_FeedPos < (UserLiveFeed_GetSize() - 1) && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos++;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible()) {
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
                if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY--;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(3, 1);
                    PlayClip_setHidePanel();
                } else if (!UserLiveFeed_isFeedShow()) UserLiveFeed_ShowFeed();
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedRefreshFocus();
                else PlayClip_showPanel();
                break;
            case KEY_DOWN:
                if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(3, -1);
                    PlayClip_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
                else if (Play_isFullScreen && Play_isChatShown()) {
                    Play_ChatSizeValue++;
                    if (Play_ChatSizeValue > 3) {
                        Play_ChatSizeValue = 0;
                        Play_ChatPositionConvert(false);
                    } else if (Play_ChatSizeValue === 3) Play_ChatPositionConvert(true);
                    Play_ChatSize(true);
                    Play_controls[Play_controlsChatSize].defaultValue = Play_ChatSizeValue;
                    Play_controls[Play_controlsChatSize].bottomArrows();
                    Play_controls[Play_controlsChatSize].setLable();
                } else PlayClip_showPanel();
                break;
            case KEY_ENTER:
                if (Play_isEndDialogVisible()) Play_EndDialogPressed(3);
                else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (!PlayVod_PanelY) {
                        if (PlayVod_addToJump) PlayVod_jump();
                    } else if (PlayVod_PanelY === 1) PlayClip_Enter();
                    else Play_BottomOptionsPressed(3);
                    PlayClip_setHidePanel();
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
                if (PlayClip_HasVOD && !Main_values.Play_ChatForceDisable) {
                    if (Play_isNotplaying()) Chat_Play(Chat_Id);
                    else Chat_Pause();
                }
                if (!Play_isEndDialogVisible()) Play_KeyPause(3);
                break;
            case KEY_REFRESH:
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
            default:
                break;
        }
    }
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
});//Spacing for reease maker not trow erros frm jshint
var UserLiveFeed_loadingData = false;
var UserLiveFeed_loadingDataTry = 0;
var UserLiveFeed_loadingDataTimeout = 3500;
var UserLiveFeed_loadChannelOffsset = 0;
var UserLiveFeed_loadingDataTryMax = 5;
var UserLiveFeed_dataEnded = false;
var UserLiveFeed_followerChannels = '';
var UserLiveFeed_idObject = {};
var UserLiveFeed_status = false;
var UserLiveFeed_LastPos = null;
var UserSidePannel_LastPos = null;
var UserLiveFeed_token = null;
var UserLiveFeed_Feedid;
var UserLiveFeed_ids = ['ulf_thumbdiv', 'ulf_img', 'ulf_infodiv', 'ulf_displayname', 'ulf_streamtitle', 'ulf_streamgame', 'ulf_viwers', 'ulf_quality', 'ulf_cell', 'ulempty_', 'user_live_scroll'];

var UserLiveFeed_side_ids = ['usf_thumbdiv', 'usf_img', 'usf_infodiv', 'usf_displayname', 'usf_streamtitle', 'usf_streamgame', 'usf_viwers', 'usf_quality', 'usf_cell', 'ulempty_', 'user_live_scroll'];

function UserLiveFeed_StartLoad() {
    if (AddUser_UserIsSet()) {
        UserLiveFeed_clearHideFeed();

        if (UserLiveFeed_status) {
            if (UserLiveFeed_ThumbNull(Play_FeedPos, UserLiveFeed_ids[0]))
                UserLiveFeed_LastPos = JSON.parse(document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos).getAttribute(Main_DataAttribute))[0];

            if (UserLiveFeed_ThumbNull(Sidepannel_PosFeed, UserLiveFeed_side_ids[0]))
                UserSidePannel_LastPos = JSON.parse(document.getElementById(UserLiveFeed_side_ids[8] + Sidepannel_PosFeed).getAttribute(Main_DataAttribute))[0];
        } else {
            UserSidePannel_LastPos = null;
            UserLiveFeed_LastPos = null;
        }

        Main_empty('user_feed_scroll');
        Main_HideElement('side_panel_feed_thumb');
        Sidepannel_PosFeed = 0;
        Main_empty('side_panel_holder');
        UserLiveFeed_status = false;
        document.getElementById('user_feed_scroll').style.left = "2.5px";
        Main_ShowElement('dialog_loading_feed');
        Main_ShowElement('dialog_loading_side_feed');
        UserLiveFeed_loadChannelOffsset = 0;
        UserLiveFeed_followerChannels = '';
        Play_FeedPos = 0;
        UserLiveFeed_idObject = {};

        UserLiveFeed_loadDataPrepare();
        UserLiveFeed_CheckToken();
    }
}

function UserLiveFeed_CheckToken() {
    UserLiveFeed_token = AddUser_UsernameArray[Main_values.Users_Position].access_token;
    if (UserLiveFeed_token) {
        UserLiveFeed_token = Main_OAuth + UserLiveFeed_token;
        UserLiveFeed_loadChannelUserLive();
    } else {
        UserLiveFeed_loadDataPrepare();
        UserLiveFeed_token = null;
        UserLiveFeed_loadChannels();
    }
}

function UserLiveFeed_loadDataPrepare() {
    UserLiveFeed_loadingData = true;
    UserLiveFeed_loadingDataTry = 0;
    UserLiveFeed_loadingDataTimeout = 3500;
}

function UserLiveFeed_loadChannels() {
    var theUrl = 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].id) +
        '/follows/channels?limit=100&offset=' + UserLiveFeed_loadChannelOffsset + '&sortby=created_at';

    BasexmlHttpGet(theUrl, UserLiveFeed_loadingDataTimeout, 2, null, UserLiveFeed_loadChannelLive, UserLiveFeed_loadDataError, false);
}

function UserLiveFeed_loadDataError() {
    UserLiveFeed_loadingDataTry++;
    if (UserLiveFeed_loadingDataTry < UserLiveFeed_loadingDataTryMax) {
        UserLiveFeed_loadingDataTimeout += 500;
        UserLiveFeed_loadChannels();
    } else {
        UserLiveFeed_loadingData = false;
        if (!UserLiveFeed_GetSize()) {
            Main_HideElement('dialog_loading_feed');
            Main_HideElement('dialog_loading_side_feed');
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
    var theUrl = 'https://api.twitch.tv/kraken/streams/';

    if (UserLiveFeed_token) {
        theUrl += 'followed?';
    } else {
        theUrl += '?channel=' + encodeURIComponent(UserLiveFeed_followerChannels) + '&';
    }
    theUrl += 'limit=100&offset=0&stream_type=all';

    UserLiveFeed_loadChannelUserLiveGet(theUrl);
}

function UserLiveFeed_loadChannelUserLiveGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = UserLiveFeed_loadingDataTimeout;

    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
    if (UserLiveFeed_token) xmlHttp.setRequestHeader(Main_Authorization, UserLiveFeed_token);

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                UserLiveFeed_loadDataSuccess(xmlHttp.responseText);
            } else if (UserLiveFeed_token && (xmlHttp.status === 401 || xmlHttp.status === 403)) { //token expired
                //Token has change or because is new or because it is invalid because user delete in twitch settings
                // so callbackFuncOK and callbackFuncNOK must be the same to recheck the token
                AddCode_refreshTokens(Main_values.Users_Position, 0, UserLiveFeed_CheckToken, UserLiveFeed_loadDataRefreshTokenError);
            } else {
                UserLiveFeed_loadDataErrorLive();
            }
        }
    };

    xmlHttp.send(null);
}

function UserLiveFeed_loadDataRefreshTokenError() {
    if (!AddUser_UsernameArray[Main_values.Users_Position].access_token) UserLiveFeed_CheckToken();
    else UserLiveFeed_loadDataErrorLive();
}

function UserLiveFeed_loadDataErrorLive() {
    UserLiveFeed_loadingDataTry++;
    if (UserLiveFeed_loadingDataTry < UserLiveFeed_loadingDataTryMax) {
        UserLiveFeed_loadingDataTimeout += 500;
        UserLiveFeed_loadChannelUserLive();
    } else {
        UserLiveFeed_loadingData = false;
        Main_HideElement('dialog_loading_feed');
        Main_HideElement('dialog_loading_side_feed');
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

    var stream, id, doc = document.getElementById("user_feed_scroll"),
        docside = document.getElementById("side_panel_holder");

    for (var i = 0; i < response_items; i++) {
        stream = response.streams[i];
        id = stream.channel._id;
        if (!UserLiveFeed_idObject[id]) {
            UserLiveFeed_idObject[id] = 1;
            if (UserLiveFeed_LastPos !== null && UserLiveFeed_LastPos === stream.channel.name) Play_FeedPos = i;
            doc.appendChild(UserLiveFeed_CreatFeed(i,
                [stream.channel.name, id, Main_is_rerun(stream.stream_type)],
                [stream.preview.template.replace("{width}x{height}", Main_VideoSize),
                    stream.channel.display_name,
                    stream.game
                ]));

            if (UserSidePannel_LastPos !== null && UserSidePannel_LastPos === stream.channel.name) Sidepannel_PosFeed = i;
            docside.appendChild(UserLiveFeed_CreatSideFeed(i,
                [stream.channel.name, id, Main_is_rerun(stream.stream_type)],
                [stream.channel.name, id, stream.preview.template.replace("{width}x{height}", Main_SidePannelSize),
                    stream.channel.display_name,
                    stream.channel.status, stream.game,
                    STR_SINCE + Play_streamLiveAt(stream.created_at) + ' ' +
                    STR_FOR + Main_addCommas(stream.viewers) + STR_VIEWER,
                    Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.broadcaster_language),
                    Main_is_rerun(stream.stream_type), stream.channel.partner
                ],
                [stream.channel.logo,
                    stream.channel.display_name,
                    stream.channel.display_name,
                    stream.game, Main_addCommas(stream.viewers)
                ]));
        }
    }

    UserLiveFeed_loadDataSuccessFinish();
}

function UserLiveFeed_loadDataSuccessFinish() {
    UserLiveFeed_loadingData = false;
    UserLiveFeed_status = true;
    Main_ready(function() {
        Main_HideElement('dialog_loading_feed');
        Main_HideElement('dialog_loading_side_feed');
        UserLiveFeed_FeedAddFocus();
        Sidepannel_PreloadImgs();
        Sidepannel_AddFocusFeed();
    });
}

function UserLiveFeed_GetSize() {
    return document.getElementById('user_feed_scroll').getElementsByClassName('user_feed_thumb').length;
}

function UserLiveFeed_CreatFeed(id, data, valuesArray) {
    Main_td = document.createElement('div');
    Main_td.setAttribute('id', UserLiveFeed_ids[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify(data));

    Main_td.className = 'user_feed_thumb';
    Main_td.innerHTML = '<div id="' + UserLiveFeed_ids[0] + id + '" class="stream_thumbnail_clip" >' +
        '<div><img id="' + UserLiveFeed_ids[1] + id + '" alt="" class="stream_img" src="' + valuesArray[0] +
        Main_randomimg + '" onerror="this.onerror=null;this.src=\'' + IMG_404_VIDEO + '\'"></div>' +
        '<div id="' + UserLiveFeed_ids[2] + id + '" class="stream_text2">' +
        '<div id="' + UserLiveFeed_ids[3] + id +
        '" class="stream_channel" style="width: 66%; display: inline-block;"><i class="icon-' +
        (!data[2] ? 'circle" style="color: red;' : 'refresh" style="') + ' font-size: 75%; "></i>' + STR_SPACE +
        valuesArray[1] + '</div>' + '<div id="' + UserLiveFeed_ids[5] + id +
        '"class="stream_info">' + valuesArray[2] + '</div>' + '</div></div>';

    return Main_td;
}

function UserLiveFeed_CreatSideFeed(id, jsondata, data, valuesArray) {

    Main_td = document.createElement('div');
    Main_td.setAttribute('id', UserLiveFeed_side_ids[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify(jsondata));
    Main_td.setAttribute('side_panel_data', JSON.stringify(data));
    Main_td.className = 'side_panel_feed';

    Main_td.innerHTML = '<div id="' + UserLiveFeed_side_ids[0] + id +
        '" class="side_panel_div"><div style="width: 100%;"><div id="' +
        UserLiveFeed_side_ids[3] + id + '" style="display: none;">' + valuesArray[1] +
        '</div><div class="side_panel_iner_div1"><img id="' + UserLiveFeed_side_ids[1] + id +
        '" class="side_panel_channel_img" src="' + valuesArray[0] +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO +
        '\'"></div><div class="side_panel_iner_div2"><div id="' + UserLiveFeed_side_ids[4] + id +
        '" class="side_panel_new_title">' + valuesArray[2] + '</div><div id="' +
        UserLiveFeed_side_ids[5] + id + '" class="side_panel_new_game">' + valuesArray[3] +
        '</div></div><div class="side_panel_iner_div3"><div style="text-align: center;"><i class="icon-' +
        (!jsondata[2] ? 'circle" style="color: red;' : 'refresh" style="') +
        ' font-size: 55%; "></i><div style="font-size: 58%;">' + valuesArray[4] + '</div></div></div></div></div></div>';

    return Main_td;
}

function UserLiveFeed_isFeedShow() {
    return document.getElementById('user_feed').className.indexOf('user_feed_hide') === -1;
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
        Main_RemoveClass('user_feed', 'user_feed_hide');
        UserLiveFeed_FeedAddFocus();
    }
}

function UserLiveFeed_Hide() {
    Main_AddClass('user_feed', 'user_feed_hide');
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
    var position = UserLiveFeed_FeedSetPos();
    if (position) document.getElementById('user_feed_scroll').style.left = position + "px";
}

function UserLiveFeed_ThumbNull(y, thumbnail) {
    return document.getElementById(thumbnail + y) !== null;
}

function UserLiveFeed_FeedRemoveFocus() {
    if (UserLiveFeed_ThumbNull(Play_FeedPos, UserLiveFeed_ids[0]))
        Main_RemoveClass(UserLiveFeed_ids[0] + Play_FeedPos, 'feed_thumbnail_focused');
}// The bellow are some function or adptations of function from
// https://www.nightdev.com/kapchat/
function extraEmoticonize(message, emote) {
    return message.replace(emote.code, extraEmoteTemplate(emote));
}

function extraEmoteTemplate(emote) {
    return '<img class="emoticon" alt="" src="' + emote['3x'] + '"/>';
}

function emoteTemplate(id) {
    return '<img class="emoticon" alt="" src="https://static-cdn.jtvnw.net/emoticons/v1/' + id + '/3.0"/>';
}


function mescape(message) {
    return message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function extraMessageTokenize(message) {
    var tokenizedString = message.split(' ');

    for (var i = 0; i < tokenizedString.length; i++) {
        message = tokenizedString[i];

        var test = message.replace(/(^[~!@#$%\^&\*\(\)]+|[~!@#$%\^&\*\(\)]+$)/g, '');
        var emote = extraEmotes[test] || extraEmotes[message];

        if (emote) {
            message = extraEmoticonize(message, emote);
        } else {
            message = mescape(message);
        }

        tokenizedString[i] = message;
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
}//Spacing for reease maker not trow erros frm jshint
var Main_ItemsLimitMax = 100;

var ChannelClip_game = '';
var ChannelClip_views = '';
var ChannelClip_title = '';
var ChannelClip_playUrl = '';
var ChannelClip_createdAt = '';
var ChannelClip_language = '';

var ChannelVod_vodOffset = 0;
var ChannelVod_DurationSeconds = 0;
var ChannelVod_language = '';
var ChannelVod_createdAt = '';
var ChannelVod_views = '';
var ChannelVod_Duration = '';
var ChannelVod_title = '';

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

var Base_obj = {
    posX: 0,
    posY: 0,
    currY: 0,
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
    visiblerows: 4,
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
    set_ThumbSize: function() {
        this.ThumbCssText = 'width: ' + this.ThumbSize + '%; display: inline-block; padding: 3px;';
    },
    key_exit: function(CenterLables) {
        if (Main_isControlsDialogShown()) Main_HideControlsDialog();
        else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
        else {
            if (Main_ThumbNull(this.posY, this.posX, this.ids[0])) {
                Main_removeFocus(this.posY + '_' + this.posX, this.ids);
            } else if (this.posY < 0) {
                Screens_removeFocusFallow();
                this.posY = 0;
            }
            if (!CenterLables) Main_CenterLablesStart(Screens_handleKeyDown);
        }
        Sidepannel_RestoreScreen();
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
    },
    concatenate: function(responseText) {
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
    ThumbSize: 32.65,
    ItemsLimit: Main_ItemsLimitVideo,
    ColoumnsCount: Main_ColoumnsCountVideo,
    ItemsReloadLimit: Main_ItemsReloadLimitVideo,
    addFocus: function(y, x, idArray, forceScroll) {
        this.AnimateThumb(this);
        Screens_addFocusVideo(y, x, idArray, forceScroll);
    },
    setMax: function(tempObj) {
        if (tempObj[this.object].length < (Main_ItemsLimitMax - 5)) this.dataEnded = true;
    },
    img_404: IMG_404_VIDEO,
    HasSwitches: true,
    period: ['day', 'week', 'month', 'all'],
    empty_str: function() {
        return STR_NO + (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA);
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
    AnimateThumbId: null,
    HasAnimateThumb: true,
    Vod_newImg: new Image(),
    AnimateThumb: function(screen) {
        window.clearInterval(this.AnimateThumbId);
        if (!Vod_DoAnimateThumb) return;
        var div = document.getElementById(this.ids[0] + this.posY + '_' + this.posX);

        // Only load the animation if it can be loaded
        // This prevent starting animating before it has loaded or animated a empty image
        this.Vod_newImg.onload = function() {
            this.onload = null;
            Main_HideElement(screen.ids[1] + screen.posY + '_' + screen.posX);
            // background-size: 612px from  div.offsetWidth
            div.style.backgroundSize = "612px";
            var frame = 0;
            screen.AnimateThumbId = window.setInterval(function() {
                // 10 = quantity of frames in the preview img, 344 img height from the div.offsetHeight
                // But this img real height is 180 thus the quality is affected, higher resolution aren't available
                div.style.backgroundPosition = "0px " + ((++frame % 10) * (-344)) + "px";
            }, 650);
        };

        this.Vod_newImg.src = div.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
    },
    addCell: function(cell) {
        if (!this.idObject[cell._id] && (cell.preview.template + '').indexOf('404_processing') === -1) {

            this.itemsCount++;
            this.idObject[cell._id] = 1;

            this.row.appendChild(Screens_createCellVod(
                this.row_id,
                this.coloumn_id,
                [cell._id, cell.length, cell.channel.broadcaster_language, cell.game, cell.channel.name, cell.increment_view_count_url, cell.channel._id, cell.channel.logo, cell.channel.partner], this.ids,
                [cell.preview.template.replace("{width}x{height}", Main_VideoSize),
                    cell.channel.display_name,
                    STR_STREAM_ON + Main_videoCreatedAt(cell.created_at),
                    twemoji.parse(cell.title) + STR_BR + (cell.game !== "" && cell.game !== null ? STR_STARTED + STR_PLAYING + cell.game : ""),
                    Main_addCommas(cell.views) + STR_VIEWS,
                    Main_videoqualitylang(cell.resolutions.chunked.slice(-4),
                        (parseInt(cell.fps.chunked) || 0), cell.channel.broadcaster_language),
                    STR_DURATION + Play_timeS(cell.length), cell.animated_preview_url
                ]));

            this.coloumn_id++;
        }
    }
};

function ScreensObj_InitVod() {
    Vod = Screens_assign({
        periodMaxPos: 4,
        HeaderQuatity: 2,
        object: 'vods',
        ids: Screens_ScreenIds('Vod'),
        table: 'stream_table_vod',
        screen: Main_Vod,
        highlightSTR: 'Vod_highlight',
        highlight: Main_getItemBool('Vod_highlight', false),
        periodPos: Main_getItemInt('vod_periodPos', 2),
        base_url: 'https://api.twitch.tv/kraken/videos/top?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            this.url = this.base_url + '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') +
                '&sort=views&offset=' + this.offset + '&period=' + this.period[this.periodPos - 1] +
                (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
        },
        SwitchesIcons: ['movie-play', 'history'],
        addSwitches: function() {
            this.TopRowCreated = true;
            this.row = document.createElement('div');
            var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_SWITCH_VOD, STR_SPACE + STR_SPACE + STR_SWITCH_CLIP];
            var thumbfallow, div, i = 0;

            for (i; i < SwitchesStrings.length; i++) {
                thumbfallow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_fallow_icon"></i>' + SwitchesStrings[i];
                div = document.createElement('div');
                div.setAttribute('id', this.ids[8] + 'y_' + i);
                div.className = 'stream_cell_period';
                div.innerHTML = '<div id="' + this.ids[0] +
                    'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + this.ids[3] +
                    'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
                this.row.appendChild(div);
            }
            document.getElementById(this.table).appendChild(this.row);
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 4;
            Main_AddClass('top_bar_vod', 'icon_center_focus');
            this.SetPeriod();
        },
        label_exit: function() {
            Main_textContent('top_bar_vod', STR_VIDEOS);
            Main_RemoveClass('top_bar_vod', 'icon_center_focus');
        },
        SetPeriod: function() {
            Main_innerHTML('top_bar_vod', STR_VIDEOS +
                Main_UnderCenter((this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + Main_Periods[this.periodPos - 1]));

            Main_setItem('vod_periodPos', this.periodPos);
        },
    }, Base_obj);

    Vod = Screens_assign(Vod, Base_Vod_obj);
    Vod.set_ThumbSize();
}

function ScreensObj_InitChannelVod() {
    ChannelVod = Screens_assign({
        periodMaxPos: 4,
        HeaderQuatity: 2,
        object: 'videos',
        ids: Screens_ScreenIds('ChannelVod'),
        table: 'stream_table_channel_vod',
        screen: Main_ChannelVod,
        highlightSTR: 'ChannelVod_highlight',
        highlight: Main_getItemBool('ChannelVod_highlight', false),
        periodPos: Main_getItemInt('ChannelVod_periodPos', 2),
        base_url: 'https://api.twitch.tv/kraken/channels/',
        set_url: function() {
            this.url = this.base_url +
                encodeURIComponent(Main_values.Main_selectedChannel_id) + '/videos?limit=' + Main_ItemsLimitMax +
                '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + this.offset;
        },
        SwitchesIcons: ['movie-play'],
        addSwitches: function() {
            this.TopRowCreated = true;
            this.row = document.createElement('div');
            var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_SWITCH_VOD];
            var thumbfallow, div, i = 0;

            for (i; i < SwitchesStrings.length; i++) {
                thumbfallow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_fallow_icon"></i>' + SwitchesStrings[i];
                div = document.createElement('div');
                div.setAttribute('id', this.ids[8] + 'y_' + i);
                div.className = 'stream_cell_period';
                div.innerHTML = '<div id="' + this.ids[0] +
                    'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + this.ids[3] +
                    'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
                this.row.appendChild(div);
            }
            document.getElementById(this.table).appendChild(this.row);
        },
        lastselectedChannel: '',
        label_init: function() {
            if (!Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
            if (Main_values.Main_selectedChannel !== this.lastselectedChannel) this.status = false;
            this.lastselectedChannel = Main_values.Main_selectedChannel;
            Main_values.Main_CenterLablesVectorPos = 1;
            Main_cleanTopLabel();
            Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
            Main_textContent('top_bar_user', Main_values.Main_selectedChannelDisplayname);
            this.SetPeriod();
        },
        SetPeriod: function() {
            Main_textContent('top_bar_game', this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA);
        },
        label_exit: function() {
            Main_RestoreTopLabel();
        }
    }, Base_obj);

    ChannelVod = Screens_assign(ChannelVod, Base_Vod_obj);
    ChannelVod.set_ThumbSize();

    ChannelVod.addCell = function(cell) {

        var thumbnail = cell.preview.template;
        var thumbnail_404 = (thumbnail + '').indexOf('404_processing') !== -1;

        // video content can be null sometimes, in that case the preview will be 404_processing
        // but if the video is from the stream that has not yet ended it can also be 404_processing and not be a null video
        if (!this.row_id && !this.row_id && thumbnail_404) {
            thumbnail_404 = false;
            thumbnail = (ChannelContent_offline_image !== null ? ChannelContent_offline_image : this.img_404);
        }


        if (!this.idObject[cell._id] && !thumbnail_404) {
            this.itemsCount++;
            this.idObject[cell._id] = 1;

            this.row.appendChild(Screens_createCellVod(
                this.row_id,
                this.coloumn_id,
                [cell._id, cell.length, cell.channel.broadcaster_language, cell.game, cell.channel.name, cell.increment_view_count_url, cell.channel._id, cell.channel.logo, cell.channel.partner], this.ids,
                [thumbnail.replace("{width}x{height}", Main_VideoSize),
                    cell.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(cell.created_at),
                    twemoji.parse(cell.title) + STR_BR + (cell.game !== "" && cell.game !== null ? STR_STARTED + STR_PLAYING + cell.game : ""), Main_addCommas(cell.views) + STR_VIEWS,
                    Main_videoqualitylang(cell.resolutions.chunked.slice(-4), (parseInt(cell.fps.chunked) || 0), cell.channel.broadcaster_language),
                    STR_DURATION + Play_timeS(cell.length), cell.animated_preview_url
                ]));

            this.coloumn_id++;
        }
    };
}

function ScreensObj_InitAGameVod() {
    AGameVod = Screens_assign({
        periodMaxPos: 4,
        HeaderQuatity: 2,
        object: 'vods',
        ids: Screens_ScreenIds('AGameVod'),
        table: 'stream_table_a_game_vod',
        screen: Main_AGameVod,
        highlightSTR: 'AGameVod_highlight',
        highlight: Main_getItemBool('AGameVod_highlight', false),
        periodPos: Main_getItemInt('AGameVod_periodPos', 2),
        base_url: 'https://api.twitch.tv/kraken/videos/top?game=',
        set_url: function() {
            this.url = this.base_url + encodeURIComponent(Main_values.Main_gameSelected) + '&limit=' +
                Main_ItemsLimitMax + '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') +
                '&sort=views&offset=' + this.offset + '&period=' + this.period[this.periodPos - 1] +
                (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
        },
        SwitchesIcons: ['movie-play', 'history'],
        addSwitches: function() {
            this.TopRowCreated = true;
            this.row = document.createElement('div');
            var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_SWITCH_VOD, STR_SPACE + STR_SPACE + STR_SWITCH_CLIP];
            var thumbfallow, div, i = 0;

            for (i; i < SwitchesStrings.length; i++) {
                thumbfallow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_fallow_icon"></i>' + SwitchesStrings[i];
                div = document.createElement('div');
                div.setAttribute('id', this.ids[8] + 'y_' + i);
                div.className = 'stream_cell_period';
                div.innerHTML = '<div id="' + this.ids[0] +
                    'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + this.ids[3] +
                    'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
                this.row.appendChild(div);
            }
            document.getElementById(this.table).appendChild(this.row);
        },
        OldgameSelected: '',
        label_init: function() {
            ScreensObj_TopLableAgameInit();
            this.SetPeriod();
        },
        label_exit: ScreensObj_TopLableAgameExit,
        SetPeriod: function() {
            Main_innerHTML('top_bar_game', STR_AGAME +
                Main_UnderCenter((this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) +
                    Main_Periods[this.periodPos - 1] + ': ' + Main_values.Main_gameSelected));

            Main_setItem('AGameVod_periodPos', this.periodPos);
        }
    }, Base_obj);

    AGameVod = Screens_assign(AGameVod, Base_Vod_obj);
    AGameVod.set_ThumbSize();
}

function ScreensObj_InitUserVod() {
    UserVod = Screens_assign({
        periodMaxPos: 2,
        HeaderQuatity: 3,
        object: 'videos',
        ids: Screens_ScreenIds('UserVod'),
        table: 'stream_table_user_vod',
        screen: Main_UserVod,
        time: ['time', 'views'],
        highlightSTR: 'UserVod_highlight',
        highlight: Main_getItemBool('UserVod_highlight', false),
        periodPos: Main_getItemInt('UserVod_periodPos', 1),
        base_url: 'https://api.twitch.tv/kraken/videos/followed?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            this.token = Main_OAuth + AddUser_UsernameArray[Main_values.Users_Position].access_token;

            this.url = this.base_url + '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') +
                '&sort=' + this.time[this.periodPos - 1] + '&offset=' + this.offset;
        },
        SwitchesIcons: ['movie-play', 'history'],
        addSwitches: function() {
            this.TopRowCreated = true;
            this.row = document.createElement('div');
            var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_SWITCH_VOD, STR_SPACE + STR_SPACE + STR_SWITCH_TYPE];
            var thumbfallow, div, i = 0;

            for (i; i < SwitchesStrings.length; i++) {
                thumbfallow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_fallow_icon"></i>' + SwitchesStrings[i];
                div = document.createElement('div');
                div.setAttribute('id', this.ids[8] + 'y_' + i);
                div.className = 'stream_cell_period';
                div.innerHTML = '<div id="' + this.ids[0] +
                    'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + this.ids[3] +
                    'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
                this.row.appendChild(div);
            }
            document.getElementById(this.table).appendChild(this.row);
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 1;
            Main_AddClass('top_bar_user', 'icon_center_focus');
            Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
            this.SetPeriod();
        },
        label_exit: ScreensObj_TopLableUserExit,
        SetPeriod: function() {
            Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(
                AddUser_UsernameArray[Main_values.Users_Position].name + ' ' +
                (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + (this.periodPos === 1 ? STR_TIME : STR_VIWES)));

            Main_setItem('UserVod_periodPos', this.periodPos);
        }
    }, Base_obj);

    UserVod = Screens_assign(UserVod, Base_Vod_obj);
    UserVod.set_ThumbSize();
}

var Base_Live_obj = {
    ThumbSize: 32.65,
    ItemsReloadLimit: Main_ItemsReloadLimitVideo,
    ItemsLimit: Main_ItemsLimitVideo,
    ColoumnsCount: Main_ColoumnsCountVideo,
    addFocus: Screens_addFocusVideo,
    img_404: IMG_404_VIDEO,
    setMax: function(tempObj) {
        this.MaxOffset = tempObj._total;
        if (this.data.length >= this.MaxOffset || typeof this.MaxOffset === 'undefined') this.dataEnded = true;
    },
    empty_str: function() {
        return STR_NO + STR_LIVE_CHANNELS;
    },
    addCell: function(cell) {
        this.addCellTemp(cell);
    },
    addCellTemp: function(cell) {
        if (!this.idObject[cell.channel._id]) {

            this.itemsCount++;
            this.idObject[cell.channel._id] = 1;

            this.row.appendChild(Screens_createCellLive(
                this.row_id,
                this.coloumn_id,
                [cell.channel.name, cell.channel._id, Main_is_rerun(cell.stream_type)], this.ids,
                [cell.preview.template.replace("{width}x{height}", Main_VideoSize),
                    cell.channel.display_name,
                    cell.channel.status, cell.game,
                    STR_SINCE + Play_streamLiveAt(cell.created_at) + ' ' + STR_FOR + Main_addCommas(cell.viewers) + STR_VIEWER,
                    Main_videoqualitylang(cell.video_height, cell.average_fps, cell.channel.broadcaster_language)
                ]));

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
        key_play: function() {
            Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
        }
    }, Base_obj);

    Live = Screens_assign(Live, Base_Live_obj);
    Live.set_ThumbSize();
}

function ScreensObj_InitSearchLive() {
    SearchLive = Screens_assign({
        HeaderQuatity: 2,
        ids: Screens_ScreenIds('SearchLive'),
        table: 'stream_table_search_live',
        screen: Main_SearchLive,
        object: 'streams',
        base_url: 'https://api.twitch.tv/kraken/search/streams?limit=' + Main_ItemsLimitMax + '&query=',
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + encodeURIComponent(Main_values.Search_data) +
                '&offset=' + this.offset;
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 1;
            Main_values.Search_isSearching = true;
            Main_cleanTopLabel();
            if (this.lastData !== Main_values.Search_data) this.status = false;
            this.lastData = Main_values.Search_data;
            Main_innerHTML('top_bar_user', STR_SEARCH + Main_UnderCenter(STR_LIVE + ' ' + "'" + Main_values.Search_data + "'"));
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
    SearchLive.set_ThumbSize();

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
        base_url: 'https://api.twitch.tv/kraken/streams/',
        loadChannelOffsset: 0,
        followerChannels: '',
        followerChannelsDone: false,
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;

            if (AddUser_UsernameArray[Main_values.Users_Position].access_token) {
                //User has added a key
                this.HeaderQuatity = 3;
                this.token = Main_OAuth + AddUser_UsernameArray[Main_values.Users_Position].access_token;
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
                    this.url = 'https://api.twitch.tv/kraken/users/' +
                        encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].id) +
                        '/follows/channels?limit=' + Main_ItemsLimitMax + '&offset=' + this.loadChannelOffsset +
                        '&sortby=created_at';
                }
            }
        },
        label_init: function() {
            ScreensObj_TopLableUserInit();
            Main_innerHTML('top_bar_user', STR_USER +
                Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + STR_LIVE_CHANNELS));
        },
        label_exit: ScreensObj_TopLableUserExit,
        key_play: function() {
            Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
        }
    }, Base_obj);

    UserLive = Screens_assign(UserLive, Base_Live_obj);
    UserLive.set_ThumbSize();

    UserLive.concatenate = function(responseText) {
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
        base_url: 'https://api.twitch.tv/api/users/',
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url +
                encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].name) +
                '/followed/hosting?limit=' + Main_ItemsLimitMax + '&offset=' + this.offset;
        },
        label_init: function() {
            ScreensObj_TopLableUserInit();
            Main_innerHTML('top_bar_user', STR_USER +
                Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + STR_LIVE_HOSTS));
        },
        label_exit: ScreensObj_TopLableUserExit,
        key_play: function() {
            Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
        }
    }, Base_obj);

    UserHost = Screens_assign(UserHost, Base_Live_obj);
    UserHost.set_ThumbSize();

    UserHost.addCell = function(cell) {
        if (!this.idObject[cell.target._id + '' + cell._id]) { //combined id host and hosted

            this.itemsCount++;
            this.idObject[cell.target._id + '' + cell._id] = 1;

            this.row.appendChild(Screens_createCellLive(
                this.row_id,
                this.coloumn_id,
                [cell.target.channel.name, cell.target._id, false], this.ids,
                [cell.target.preview_urls.template.replace("{width}x{height}", Main_VideoSize),
                    cell.display_name + STR_USER_HOSTING + cell.target.channel.display_name,
                    cell.target.title, cell.target.meta_game,
                    STR_FOR.charAt(1).toUpperCase() + STR_FOR.slice(2) +
                    Main_addCommas(cell.target.viewers) + STR_VIEWER, ''
                ]));

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
        base_url: 'https://api.twitch.tv/kraken/streams?game=',
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + encodeURIComponent(Main_values.Main_gameSelected) +
                '&limit=' + Main_ItemsLimitMax + '&offset=' + this.offset +
                (Main_ContentLang !== "" ? ('&broadcaster_language=' + Main_ContentLang) : '');
        },
        label_init: function() {
            ScreensObj_TopLableAgameInit();
            //fix user label
            Main_RemoveClass('top_bar_user', 'icon_center_focus');
            Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
            Main_textContent('top_bar_user', STR_USER);

            if (Main_values.Search_isSearching) { //Reset label as the app may be restoring from background
                Main_cleanTopLabel();
                Main_innerHTML('top_bar_user', STR_SEARCH + Main_UnderCenter(STR_GAMES + ' ' + "'" + Main_values.Search_data + "'"));
            } else Main_values.gameSelectedOld = null;

            Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter(STR_LIVE +
                ': ' + Main_values.Main_gameSelected));
        },
        label_exit: ScreensObj_TopLableAgameExit,
        HasSwitches: true,
        SwitchesIcons: ['movie-play', 'movie', 'heart-o'],
        addSwitches: function() {
            this.TopRowCreated = true;
            this.row = document.createElement('div');
            var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_VIDEOS, STR_SPACE + STR_SPACE + STR_CLIPS, STR_SPACE + STR_SPACE + STR_FALLOW];
            var thumbfallow, div, i = 0;

            for (i; i < SwitchesStrings.length; i++) {
                thumbfallow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_fallow_icon"></i>' + SwitchesStrings[i];
                div = document.createElement('div');
                div.setAttribute('id', this.ids[8] + 'y_' + i);
                div.className = 'stream_cell_period';
                div.innerHTML = '<div id="' + this.ids[0] +
                    'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + this.ids[3] +
                    'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
                this.row.appendChild(div);
            }
            document.getElementById(this.table).appendChild(this.row);
        },
        key_play: function() {
            if (this.posY !== -1) {
                Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            } else AGame_headerOptions();
        },
    }, Base_obj);

    AGame = Screens_assign(AGame, Base_Live_obj);
    AGame.set_ThumbSize();
}

function ScreensObj_InitFeatured() {
    Featured = Screens_assign({
        HeaderQuatity: 2,
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
        object: 'featured',
        key_play: function() {
            Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
        }
    }, Base_obj);

    Featured = Screens_assign(Featured, Base_Live_obj);
    Featured.set_ThumbSize();

    Featured.addCell = function(cell) {
        cell = cell.stream;
        this.addCellTemp(cell);
    };
}

var Base_Clip_obj = {
    HeaderQuatity: 2,
    ThumbSize: 32.65,
    ItemsLimit: Main_ItemsLimitVideo,
    TopRowCreated: false,
    ItemsReloadLimit: Main_ItemsReloadLimitVideo,
    ColoumnsCount: Main_ColoumnsCountVideo,
    addFocus: Screens_addFocusVideo,
    cursor: null,
    object: 'clips',
    period: ['day', 'week', 'month', 'all'],
    img_404: IMG_404_VIDEO,
    empty_str: function() {
        return STR_NO + STR_CLIPS;
    },
    HasSwitches: true,
    SwitchesIcons: ['history', 'play-1'],
    addSwitches: function() {
        this.TopRowCreated = true;
        this.row = document.createElement('div');
        var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_SWITCH_CLIP, STR_SPACE + STR_SPACE + STR_PLAY_ALL];
        var thumbfallow, div, i = 0;

        for (i; i < SwitchesStrings.length; i++) {
            thumbfallow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_fallow_icon"></i>' + SwitchesStrings[i];
            div = document.createElement('div');
            div.setAttribute('id', this.ids[8] + 'y_' + i);
            div.className = 'stream_cell_period';
            div.innerHTML = '<div id="' + this.ids[0] +
                'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + this.ids[3] +
                'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
            this.row.appendChild(div);
        }
        document.getElementById(this.table).appendChild(this.row);
    },
    setMax: function(tempObj) {
        this.cursor = tempObj._cursor;
        if (this.cursor === '') this.dataEnded = true;
    },
    key_play: function() {
        if (this.posY === -1) {
            if (!this.loadingData) {
                if (!this.posX) {
                    this.periodPos++;
                    if (this.periodPos > 4) this.periodPos = 1;
                    this.SetPeriod();
                    Screens_StartLoad();
                } else {
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

            this.row.appendChild(Screens_createCellClip(this.row_id,
                this.coloumn_id,
                this.ids,
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

            this.coloumn_id++;
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
            ScreensObj_TopLableAgameInit();
            this.SetPeriod();
        },
        label_exit: ScreensObj_TopLableAgameExit,
    }, Base_obj);

    AGameClip = Screens_assign(AGameClip, Base_Clip_obj);
    AGameClip.set_ThumbSize();
}

var Base_Game_obj = {
    HeaderQuatity: 2,
    ThumbSize: 19.35,
    ItemsReloadLimit: Main_ItemsReloadLimitGame,
    ItemsLimit: Main_ItemsLimitGame,
    ColoumnsCount: Main_ColoumnsCountGame,
    addFocus: Screens_addFocusGame,
    img_404: IMG_404_GAME,
    empty_str: function() {
        return STR_NO + STR_LIVE_GAMES;
    },
    key_play: function() {
        Main_values.Main_gameSelected = document.getElementById(this.ids[5] + this.posY + '_' + this.posX).getAttribute(Main_DataAttribute);
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
        Main_values.Main_BeforeAgame = this.screen;
        Main_values.Main_Go = Main_aGame;
        Main_values.Main_BeforeAgameisSet = true;

        Main_addFocusVideoOffset = 0;
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
        Main_HideElement(this.ids[10]);

        Main_SwitchScreenAction();
        Main_removeFocus(this.posY + '_' + this.posX, this.ids);
    },
    setMax: function(tempObj) {
        this.MaxOffset = tempObj._total;
        if (this.data.length >= this.MaxOffset) this.dataEnded = true;
    },
    addCell: function(cell) {
        var hasLive = this.isLive || this.screen === Main_games;
        var game = hasLive ? cell.game : cell;
        if (!this.idObject[game._id]) {

            this.itemsCount++;
            this.idObject[game._id] = 1;

            this.row.appendChild(Screens_createCellGame(this.row_id,
                this.coloumn_id,
                this.ids,
                game.box.template.replace("{width}x{height}", Main_GameSize),
                game.name,
                hasLive ? Main_addCommas(cell.channels) + ' ' + STR_CHANNELS + STR_FOR + Main_addCommas(cell.viewers) + STR_VIEWER : ''));

            this.coloumn_id++;
        }
    }
};

function ScreensObj_InitGame() {
    Game = Screens_assign({
        ids: Screens_ScreenIds('Game'),
        table: 'stream_table_games',
        screen: Main_games,
        object: 'top',
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
        object: 'follows',
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
            ScreensObj_TopLableUserInit();
            Main_IconLoad('label_refresh', 'icon-refresh', STR_USER_GAMES_CHANGE + STR_LIVE_GAMES + '/' + STR_FALLOW_GAMES + ":" + STR_BR + STR_GUIDE);

            Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + ' ' + (this.isLive ? STR_LIVE_GAMES : STR_FALLOW_GAMES)));
        },
        label_exit: ScreensObj_TopLableUserExit,
    }, Base_obj);

    UserGames = Screens_assign(UserGames, Base_Game_obj);
    UserGames.set_ThumbSize();
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
        base_url: 'https://api.twitch.tv/kraken/search/games?query=',
        set_url: function() {
            this.dataEnded = true;
            this.url = this.base_url + encodeURIComponent(Main_values.Search_data);
        },
        label_init: function() {
            if (!Main_values.gameSelectedOld) Main_values.gameSelectedOld = Main_values.Main_gameSelected;
            Main_values.Main_CenterLablesVectorPos = 1;
            Main_values.Search_isSearching = true;
            Main_cleanTopLabel();
            if (this.lastData !== Main_values.Search_data) this.status = false;
            this.lastData = Main_values.Search_data;
            Main_innerHTML('top_bar_user', STR_SEARCH + Main_UnderCenter(STR_GAMES + ' ' + "'" + Main_values.Search_data + "'"));
        },
        label_exit: function() {
            Main_values.Main_gameSelected = Main_values.gameSelectedOld;
            if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
            Main_values.Games_return = false;
        },
    }, Base_obj);

    SearchGames = Screens_assign(SearchGames, Base_Game_obj);
    SearchGames.set_ThumbSize();
    SearchGames.ItemsLimit = 100;
}

var Base_Channel_obj = {
    ThumbSize: 16,
    ItemsLimit: Main_ItemsLimitChannel,
    ColoumnsCount: Main_ColoumnsCountChannel,
    addFocus: Screens_addFocusChannel,
    ItemsReloadLimit: Main_ItemsReloadLimitChannel,
    img_404: IMG_404_LOGO,
    setMax: function(tempObj) {
        this.MaxOffset = tempObj._total;
        if (this.data.length >= this.MaxOffset || typeof this.MaxOffset === 'undefined') this.dataEnded = true;
    },
    empty_str: function() {
        return STR_NO + STR_USER_CHANNEL;
    },
    addCellTemp: function(cell) {
        if (!this.idObject[cell._id]) {

            this.itemsCount++;
            this.idObject[cell._id] = 1;

            this.row.appendChild(Screens_createCellChannel(
                this.row_id,
                this.coloumn_id,
                this.ids,
                [cell.name, cell._id, cell.logo, cell.display_name, cell.partner]));

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
        base_url: 'https://api.twitch.tv/kraken/users/',
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].id) +
                '/follows/channels?limit=' + Main_ItemsLimitMax + '&offset=' + this.offset + '&sortby=login&direction=asc';
        },
        label_init: function() {
            ScreensObj_TopLableUserInit();
            Main_innerHTML('top_bar_user', STR_USER +
                Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + STR_USER_CHANNEL));
        },
        label_exit: ScreensObj_TopLableUserExit,
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
    UserChannels.set_ThumbSize();
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
        base_url: 'https://api.twitch.tv/kraken/search/channels?limit=' + Main_ItemsLimitMax + '&query=',
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + encodeURIComponent(Main_values.Search_data) +
                '&offset=' + this.offset;
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 1;
            Main_values.Search_isSearching = true;
            Main_cleanTopLabel();
            if (this.lastData !== Main_values.Search_data) this.status = false;
            this.lastData = Main_values.Search_data;
            Main_innerHTML('top_bar_user', STR_SEARCH + Main_UnderCenter(STR_CHANNELS + ' ' + "'" + Main_values.Search_data + "'"));
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
    SearchChannels.set_ThumbSize();
    SearchChannels.addrow = Screens_addrowChannel;
    SearchChannels.visiblerows = 5;
}

function ScreensObj_TopLableAgameInit() {
    Main_values.Main_CenterLablesVectorPos = 3;
    if (Main_values.Main_OldgameSelected === null) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
    Main_AddClass('top_bar_game', 'icon_center_focus');
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
    if (Main_values.Main_OldgameSelected !== Main_values.Main_gameSelected ||
        inUseObj.gameSelected !== Main_values.Main_gameSelected) inUseObj.status = false;
    inUseObj.gameSelected = Main_values.Main_gameSelected;
    Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
}

function ScreensObj_TopLableAgameExit() {
    inUseObj.gameSelected = Main_values.Main_gameSelected;
    Main_RemoveClass('top_bar_game', 'icon_center_focus');
    Main_innerHTML('top_bar_game', STR_GAMES);
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
}

function ScreensObj_TopLableUserInit() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
    Main_AddClass('top_bar_user', 'icon_center_focus');
    if (inUseObj.OldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) inUseObj.status = false;
    inUseObj.OldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
}

function ScreensObj_TopLableUserExit() {
    Main_values.Users_Position = 0;
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    Main_textContent('top_bar_user', STR_USER);
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
}