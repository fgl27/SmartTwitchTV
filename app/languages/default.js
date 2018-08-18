// Bellow here are the all untranslatable string,they are a combination of strings and html code use by pats of the code
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
var STR_UPDATE_MAIN_HEADER = '';
var STR_OAUTH_EXPLAIN = '';
var STR_SPACE = '&nbsp;';
var STR_UPDATE_MAIN_0 = '';

// This function is called after the main language is loaded, the above are initialized empty so it doesn't cause loading exceptions
function DefaultLang() {
    STR_CONTROL_KEY = STR_CONTROLS + " (C)";
    STR_SEARCH_KEY = STR_SEARCH + " (D)";
    STR_SETTINGS_KEY = STR_SETTINGS + " (A)";
    STR_ABOUT_KEY = STR_ABOUT + " (A)";
    STR_SWITCH = STR_SWITCH + STR_KEY_UP_DOWN;
    STR_SWITCH_USER = STR_SWITCH_USER + STR_KEY_UP_DOWN;

    STR_CONTROLS_MAIN_0 = STR_DIV_TITLE + STR_CONTROLS + '</div>' +
        STR_CONTROLS_MAIN_1 + STR_BR +
        STR_BR +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_CONTROLS_MAIN_2 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_3 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_4 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_5 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_6 + STR_BR +
        STR_CONTROLS_MAIN_7 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_8 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_9 + STR_BR +
        STR_CONTROLS_MAIN_10 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_11 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_12 + STR_BR +
        STR_DOT + STR_CONTROLS_MAIN_13 + STR_BR + '</div>' + STR_BR +
        STR_DIV_TITLE + STR_CLOSE_THIS + '</div>';

    STR_ABOUT_INFO_HEADER = STR_DIV_TITLE + STR_TWITCH_TV + '</div>';
    STR_ABOUT_INFO_0 = STR_DIV_MIDLE_LEFT + STR_BR + STR_ABOUT_INFO_1 + STR_BR +
        STR_ABOUT_INFO_2 + '</div>' +
        STR_BR +
        STR_DIV_TITLE + STR_ABOUT_INFO_3 + '</div>' +
        STR_ABOUT_EMAIL + STR_BR +
        STR_BR +
        STR_ABOUT_INFO_4 + STR_BR +
        STR_ABOUT_INFO_5 + STR_BR +
        STR_BR +
        STR_DIV_TITLE_LEFT + STR_ABOUT_INFO_6 + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_ABOUT_INFO_8 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_9 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_10 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_11 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_12 + STR_BR +
        STR_DIV_TITLE + STR_CLOSE_THIS + '</div></div>';

    STR_CONTROLS_PLAY_0 = STR_DIV_TITLE + STR_CONTROLS + '</div>' +
        STR_DIV_TITLE + STR_GENERAL + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_CONTROLS_PLAY_1 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_2 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_12 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_13 + '</div>' +
        STR_DIV_TITLE + STR_PLAYER + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_CONTROLS_PLAY_3 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_4 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_5 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_6 +
        STR_DIV_TITLE + STR_CHAT + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_CONTROLS_PLAY_7 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_8 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_9 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_10 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_11 +
        STR_DIV_TITLE + STR_CLOSE_THIS + '</div>';

    STR_UPDATE_MAIN_HEADER = STR_DIV_TITLE + STR_UPDATE + '</div>' +
        STR_UPDATE_MAIN_1 + STR_BR;
    STR_UPDATE_MAIN_0 = STR_BR +
        STR_DIV_TITLE + STR_UPDATE_MAIN_2 + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_UPDATE_MAIN_3 + STR_BR +
        STR_BR + STR_DIV_TITLE + STR_UPDATE_MAIN_0 + '</div>' + STR_BR +
        STR_BR + STR_CLOSE_THIS + '</div>';

    STR_OAUTH_EXPLAIN = STR_OAUTH_EXPLAIN1 + STR_BR +
        STR_DOT + STR_OAUTH_EXPLAIN2 + STR_BR +
        STR_DOT + STR_OAUTH_EXPLAIN3 + STR_BR +
        STR_DOT + STR_OAUTH_EXPLAIN4 + STR_BR +
        STR_DOT + STR_OAUTH_EXPLAIN5 + STR_BR +
        STR_DOT + STR_OAUTH_EXPLAIN6;
}