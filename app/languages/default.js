/*
 * Copyright (c) 2017-2020 Felipe de Leon <fglfgl27@gmail.com>
 *
 * This file is part of SmartTwitchTV <https://github.com/fgl27/SmartTwitchTV>
 *
 * SmartTwitchTV is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SmartTwitchTV is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SmartTwitchTV.  If not, see <https://github.com/fgl27/SmartTwitchTV/blob/master/LICENSE>.
 *
 */

// Bellow here are the all untranslatable string,they are a combination of strings and html code use by pats of the code
var LINK_COLOR = '#328df5';
var STR_BR = '<br>';
var STR_SPACE_HTML = '&nbsp;';
var STR_SPACE = ' ';
var STR_ABOUT_EMAIL = 'fglfgl27@gmail.com';
var STR_DOT = '<i  class="icon-circle class_bold" style="font-size: 50%; vertical-align: middle;"></i>' + '  ';
var STR_DIV_TITLE = '<div class="about_text_title">';
var STR_DIV_MIDLE_LEFT = '<div style="text-align: left;">';
var STR_DIV_LINK = '<div style="text-align: center; width: 100%; display: inline-block; color: ' + LINK_COLOR + ';">';
var STR_SPAN_LINK = '<span style="color: ' + LINK_COLOR + ';">';
var STR_RED_DIV = '<div class="class_bold" style="text-align: center; width: 100%; display: inline-block; color: #FF0000; font-size: 110%;">';
var STR_CONTROL_KEY = '';
var STR_SEARCH_KEY = '';
var STR_ABOUT_KEY = '';
var STR_SETTINGS_KEY = '';
var STR_CONTROLS_MAIN_0 = '';
var STR_CONTROLS_PLAYER_0 = '';
var STR_ABOUT_INFO_HEADER = '';
var STR_ABOUT_INFO_0 = '';
var STR_ACCESSIBILITY_WARN_TEXT = '';
var STR_CONTROLS_PLAY_0 = '';
var STR_CONTACT;
var STR_PAYPAL;
var STR_BITCOIN;
var STR_BITCOIN_WALLET = '1DuhCT6L3VfBtFcS8FNfVXgBzE2rwCPx3x';
var STR_APP_LAG = 'https://tinyurl.com/applag';
var STR_ABOUT_INFO_5 = 'https://github.com/fgl27/SmartTwitchTV';
var STR_ABOUT_INFO_20 = 'https://github.com/fgl27/SmartTwitchTV/releases';

// This function is called after the main language is loaded, the above are initialized empty so it doesn't cause loading exceptions
function DefaultLang() {
    //Strings that are used between others strings
    STR_FOR_THIS = STR_SPACE + STR_FOR_THIS + STR_SPACE;
    STR_USER_HOSTING = STR_SPACE + STR_USER_HOSTING + STR_SPACE;
    STR_USER_HOSTED_BY = STR_SPACE + STR_USER_HOSTED_BY + STR_SPACE;
    STR_JUMP_T0 = STR_SPACE + STR_JUMP_T0 + STR_SPACE;
    STR_LATEST_VERSION = STR_SPACE + STR_LATEST_VERSION + STR_SPACE;
    STR_OAUTH_WRONG2 = STR_SPACE + STR_OAUTH_WRONG2 + STR_SPACE;
    STR_IS_SUB_IS_SUB = STR_SPACE + STR_IS_SUB_IS_SUB + STR_SPACE;
    STR_BACK_USER_GAMES = STR_SPACE + STR_BACK_USER_GAMES + STR_SPACE;
    STR_OFFSET = STR_SPACE + STR_OFFSET + STR_SPACE;

    //Strings that are used before others strings
    STR_GO_TO += STR_SPACE;
    STR_PLAYING += STR_SPACE;
    STR_FOR += STR_SPACE;
    STR_WATCHING += STR_SPACE;
    STR_WAITING += STR_SPACE;
    STR_SINCE += STR_SPACE;
    STR_PLACEHOLDER_PRESS += STR_SPACE;
    STR_STREAM_ON += STR_SPACE;
    STR_DURATION += STR_SPACE;
    STR_UPDATE_LAST_CHECK += STR_SPACE;
    STR_CURRENT_VERSION += STR_SPACE;
    STR_CONTROLS_MAIN_3 += STR_SPACE;
    STR_OAUTH_WRONG += STR_SPACE;
    STR_OAUTH_FAIL_USER += STR_SPACE;
    STR_CANT_FOLLOW += STR_SPACE;
    STR_REMOVE_USER += STR_SPACE;
    STR_PLACEHOLDER_PRESS_UP += STR_SPACE;
    STR_STARTED += STR_SPACE;
    STR_STREAM_END += STR_SPACE;
    STR_CREATED_AT += STR_SPACE;
    STR_SIZE += STR_SPACE;
    STR_BRIGHTNESS += STR_SPACE;
    STR_JUMPING_STEP += STR_SPACE;
    STR_PLAY_NEXT_IN += STR_SPACE;
    STR_AUDIO_SOURCE += STR_SPACE;
    STR_VOLUME += STR_SPACE;
    STR_AUDIO += STR_SPACE;
    STR_PRESS_ENTER_TO_CHANGE += STR_SPACE;
    STR_DROOPED_FRAMES += STR_SPACE;
    STR_BUFFER_HEALT += STR_SPACE;
    STR_NET_ACT += STR_SPACE;
    STR_LATENCY += STR_SPACE;
    STR_PING += STR_SPACE;
    STR_MAX_RES += STR_SPACE;
    STR_MAX_BIT += STR_SPACE;
    STR_MAX_LEVEL += STR_SPACE;
    STR_MAX_INSTANCES += STR_SPACE;
    STR_WATCHED += STR_SPACE;
    STR_UNTIL += STR_SPACE;
    STR_DELETE_SURE += STR_SPACE;
    STR_4_WAY_MULTI_INSTANCES += STR_SPACE;
    STR_PREVIEW_SIZE_SCREEN_SUMMARY += STR_SPACE;
    STR_LAST_REFRESH += STR_SPACE;
    STR_CHAT_BANNED += STR_SPACE;
    STR_CHAT_FOLLOWER_ONLY += STR_SPACE;
    STR_CHAT_FOLLOWER_ONLY_USER_TIME += STR_SPACE;
    STR_CHAT_MESSAGE_DELETED_TIMEOUT += STR_SPACE;
    STR_PLAYED += STR_SPACE;
    STR_FROM_SIMPLE += STR_SPACE;
    STR_REMAINING += STR_SPACE;

    //Strings that are used after others strings
    STR_KEY_UP_DOWN = STR_SPACE + STR_KEY_UP_DOWN;
    STR_KEY_MEDIA_FF = STR_SPACE + STR_KEY_MEDIA_FF;
    STR_GUIDE_EXTRA2 = STR_SPACE + STR_GUIDE_EXTRA2;
    STR_IS_OFFLINE = STR_SPACE + STR_IS_OFFLINE;
    STR_IS_SUB_ONLY_ERROR = STR_SPACE + STR_IS_SUB_ONLY_ERROR;
    STR_VODS = STR_SPACE + STR_VODS;
    STR_HIGHLIGHTS = STR_SPACE + STR_HIGHLIGHTS;
    STR_CONTENT = STR_SPACE + STR_CONTENT;
    STR_VIEWS = STR_SPACE + STR_VIEWS;
    STR_VIEW = STR_SPACE + STR_VIEW;
    STR_LIVE_CHANNELS = STR_SPACE + STR_LIVE_CHANNELS;
    STR_LIVE_GAMES = STR_SPACE + STR_LIVE_GAMES;
    STR_USER_CHANNEL = STR_SPACE + STR_USER_CHANNEL;
    STR_USER_REMOVE = STR_SPACE + STR_USER_REMOVE;
    STR_USER_SET = STR_SPACE + STR_USER_SET;
    STR_JUMP_TIME_BIG = STR_SPACE + STR_JUMP_TIME_BIG;
    STR_SEC = STR_SPACE + STR_SEC;
    STR_MIN = STR_SPACE + STR_MIN;
    STR_MS = STR_SPACE + STR_MS;
    STR_HR = STR_SPACE + STR_HR;
    STR_CONTROLS_MAIN_6 = STR_SPACE + STR_CONTROLS_MAIN_6;
    STR_FOLLOWING = STR_SPACE + STR_FOLLOWING;
    STR_FOLLOW = STR_SPACE + STR_FOLLOW;
    STR_IS_SUB_NOOAUTH = STR_SPACE + STR_IS_SUB_NOOAUTH;
    STR_IS_SUB_NOT_SUB = STR_SPACE + STR_IS_SUB_NOT_SUB;
    STR_CLIP = STR_SPACE + STR_CLIP;
    STR_FOLLOWERS = STR_SPACE + STR_FOLLOWERS;
    STR_GUIDE = STR_SPACE + STR_GUIDE;
    STR_IS_NOW = STR_SPACE + STR_IS_NOW;
    STR_SECOND = STR_SPACE + STR_SECOND;
    STR_SECONDS = STR_SPACE + STR_SECONDS;
    STR_MINUTE = STR_SPACE + STR_MINUTE;
    STR_MINUTES = STR_SPACE + STR_MINUTES;
    STR_UP = STR_SPACE + STR_UP;
    STR_HOLD_UP = STR_SPACE + STR_HOLD_UP;
    STR_PLAYER_PROBLEM_2 = STR_SPACE + STR_PLAYER_PROBLEM_2;
    STR_TODAY = STR_SPACE + STR_TODAY;
    STR_PREVIEW_ERROR_LINK = STR_SPACE + STR_PREVIEW_ERROR_LINK;
    STR_PREVIEW_VOD_DELETED = STR_SPACE + STR_PREVIEW_VOD_DELETED;
    STR_TOO_ERRORS = STR_SPACE + STR_TOO_ERRORS;
    STR_GIFT_SUB = STR_SPACE + STR_GIFT_SUB;
    STR_IN_CHAT = STR_SPACE + STR_IN_CHAT;
    STR_MILLISECONDS = STR_SPACE + STR_MILLISECONDS;
    STR_HOUR = STR_SPACE + STR_HOUR;
    STR_HOURS = STR_SPACE + STR_HOURS;
    STR_AVG = STR_SPACE + STR_AVG;
    STR_AVG = STR_SPACE + STR_AVG;

    //Strings that are need a line breack after
    STR_USER_NUMBER_ONE += STR_BR;

    if (!Main_IsOn_OSInterface) {
        STR_CLOSE_THIS = STR_CLOSE_THIS_BROWSER;
    }

    //Strings that have a link
    STR_OAUTH_IN = DefaultReplaceLink('https://github.com/fgl27/SmartTwitchTV#authorization', STR_OAUTH_IN, true);

    //Making the finals strings of strings
    STR_GUIDE_EXTRA = STR_SPACE_HTML + STR_GUIDE_EXTRA;
    STR_CONTROLS_PLAY_0 = STR_SPACE_HTML + STR_CONTROLS_PLAY_0;
    STR_CONTROL_KEY = STR_CONTROLS + ' (C)';
    STR_SEARCH_KEY = STR_SEARCH + ' (D)';
    STR_SETTINGS_KEY = STR_SETTINGS + ' (A)';
    STR_ABOUT_KEY = STR_ABOUT + ' (A)';
    STR_SWITCH = STR_SWITCH + STR_KEY_UP_DOWN;
    STR_SWITCH_USER = STR_SWITCH_USER + STR_KEY_UP_DOWN;
    STR_CONTROLS_MAIN_3 = STR_CONTROLS_MAIN_3 + STR_GUIDE + STR_GUIDE_EXTRA + STR_GUIDE_EXTRA2;
    STR_GOBACK = STR_GOBACK_START;
    STR_PAYPAL =
        '<div style="vertical-align: middle;"><img style="vertical-align: middle; display: inline-block; width: 4%;" alt="" src="https://fgl27.github.io/SmartTwitchTV/release/githubio/images/paypal.png"><div class="class_bold" style="vertical-align: middle; display: inline-block; font-size: 120%;">' +
        STR_PAYPAL_SUMMARY +
        STR_BR +
        '<div style="display: inline-block; color: ' +
        LINK_COLOR +
        ';font-size: 2vh;text-align: center; font-family: Roboto;">' +
        DefaultMakeLink('  http://tiny.cc/donatetofgl27') +
        '</div></div></div>';
    STR_BITCOIN =
        '<div style="vertical-align: middle;"><div class="class_bold" style="vertical-align: middle; display: inline-block; font-size: 120%;"><img style="vertical-align: middle; display: inline-block; width: 4%;" alt="" src="https://fgl27.github.io/SmartTwitchTV/release/githubio/images/bitcoin.png">' +
        STR_SPACE_HTML +
        STR_BITCOIN_SUMMARY +
        STR_BR +
        STR_SPACE_HTML +
        '<div style="display: inline-block; color: ' +
        LINK_COLOR +
        ';font-size: 2.7vh;text-align: center; font-family: Roboto;">' +
        STR_BITCOIN_WALLET +
        STR_SPACE_HTML +
        '</div><img style="vertical-align: middle; display: inline-block; width: 17%;" alt="" src="https://fgl27.github.io/SmartTwitchTV/screenshot/chart.png"></div></div>';

    STR_CONTROLS_PLAY_0 =
        STR_DIV_MIDLE_LEFT +
        STR_DOT +
        STR_CONTROLS_PLAY_4 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_PLAY_1 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_PLAY_2 +
        STR_BR +
        '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT +
        STR_CONTROLS_PLAY_3 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_MEDIA_FF +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_PLAY_5 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_PLAY_6 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_PLAY_13 +
        STR_BR +
        STR_DIV_TITLE +
        STR_CHAT +
        '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT +
        STR_CONTROLS_PLAY_7 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_PLAY_14 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_PLAY_8 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_PLAY_9 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_PLAY_10 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_PLAY_11 +
        STR_BR +
        STR_DIV_TITLE +
        STR_PICTURE_PICTURE +
        '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT +
        STR_PICTURE_CONTROLS13 +
        STR_BR +
        STR_DOT +
        STR_MAIN_MULTI_BIG +
        STR_BR +
        STR_DOT +
        STR_PICTURE_CONTROLS1 +
        STR_BR +
        STR_DOT +
        STR_PICTURE_CONTROLS12 +
        STR_BR +
        STR_DOT +
        STR_PICTURE_CONTROLS2 +
        STR_BR +
        STR_DOT +
        STR_PICTURE_CONTROLS4 +
        STR_BR +
        STR_DOT +
        STR_PICTURE_CONTROLS5 +
        STR_BR +
        STR_DOT +
        STR_PICTURE_CONTROLS6 +
        STR_BR +
        STR_DOT +
        STR_PICTURE_CONTROLS11 +
        STR_BR +
        STR_DOT +
        STR_PICTURE_CONTROLS7 +
        STR_BR +
        STR_DOT +
        STR_PICTURE_CONTROLS3 +
        STR_BR +
        STR_DOT +
        STR_PICTURE_CONTROLS8 +
        STR_BR +
        STR_DOT +
        STR_PICTURE_CONTROLS9 +
        STR_BR +
        STR_DOT +
        STR_PICTURE_CONTROLS10;

    STR_CONTROLS_MULTI =
        STR_DIV_TITLE +
        STR_CONTROLS_MULTI_0 +
        '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT +
        STR_CONTROLS_MULTI_1 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_MULTI_2 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_MULTI_3 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_MULTI_4 +
        STR_BR +
        STR_DOT +
        STR_MAIN_MULTI_BIG +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_MULTI_5 +
        STR_BR +
        '</div>' +
        STR_DIV_TITLE +
        STR_CONTROLS_MULTI_6 +
        '</div>';

    STR_CONTROLS_MAIN_0 =
        STR_DIV_TITLE +
        STR_CONTROLS +
        '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT +
        STR_SIDE_PANEL +
        STR_BR +
        STR_DOT +
        STR_USER_LIVE +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_MAIN_2 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_MAIN_3 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_MAIN_4 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_MAIN_5 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_MAIN_6 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_MAIN_10 +
        STR_BR +
        STR_DOT +
        STR_CONTROLS_MAIN_14 +
        STR_BR +
        '</div>' +
        STR_DIV_TITLE +
        STR_PLAYER +
        '</div>' +
        STR_CONTROLS_PLAY_0 +
        STR_BR +
        STR_DIV_TITLE +
        STR_CLOSE_THIS +
        '</div>';

    STR_CONTROLS_PLAYER_0 = STR_DIV_TITLE + STR_CONTROLS + '</div>' + STR_CONTROLS_PLAY_0 + STR_BR + STR_DIV_TITLE + STR_CLOSE_THIS + '</div>';

    STR_ACCESSIBILITY_WARN_TEXT =
        STR_DIV_TITLE +
        STR_ACCESSIBILITY_WARN +
        '</div>' +
        STR_BR +
        STR_SETTINGS_ACCESSIBILITY_SUMMARY +
        STR_BR +
        STR_ACCESSIBILITY_WARN_EXTRA +
        STR_BR +
        STR_BR +
        STR_RED_DIV +
        STR_APP_LAG +
        '</div>' +
        STR_BR +
        STR_BR +
        STR_ACCESSIBILITY_WARN_EXTRA2 +
        STR_BR +
        STR_BR +
        STR_DIV_TITLE +
        STR_CLOSE_THIS +
        '</div>';

    STR_CONTACT =
        STR_DIV_TITLE +
        STR_ABOUT_INFO_3 +
        '</div>' +
        STR_DIV_LINK +
        DefaultMakeLink(STR_ABOUT_EMAIL, 'mailto:') +
        '</div>' +
        STR_BR +
        STR_PAYPAL +
        STR_BITCOIN +
        STR_BR;

    STR_ABOUT_INFO_HEADER = STR_DIV_TITLE + STR_TWITCH_TV + '</div></div>';
    STR_ABOUT_INFO_0 =
        STR_BR +
        STR_BR +
        STR_ABOUT_INFO_1 +
        STR_BR +
        STR_ABOUT_INFO_2 +
        (Main_IsOn_OSInterface ? '' : STR_BR + STR_RED_DIV + STR_ABOUT_INFO_2_SOURCE + '</div>') +
        STR_CONTACT +
        // STR_DIV_TITLE + STR_AFFILIATE + ':</div>' +
        // STR_AFFILIATE_ABOUT + STR_SPACE + STR_AFFILIATE_ABOUT_DIS + STR_BR + STR_BR +
        STR_DIV_TITLE +
        STR_ABOUT_INFO_18 +
        '</div>' +
        STR_ABOUT_INFO_19 +
        STR_BR +
        STR_DIV_LINK +
        DefaultMakeLink(STR_ABOUT_INFO_20) +
        '</div>' +
        STR_BR +
        STR_BR +
        STR_ABOUT_INFO_4 +
        STR_BR +
        STR_DIV_LINK +
        DefaultMakeLink(STR_ABOUT_INFO_5) +
        '</div>' +
        STR_BR +
        STR_BR +
        STR_DIV_TITLE +
        STR_ABOUT_INFO_6 +
        '</div>' +
        STR_DIV_LINK +
        DefaultMakeLink('https://tinyurl.com/sttvdependency') +
        '</div>' +
        STR_BR +
        STR_BR +
        STR_DIV_TITLE +
        STR_CLOSE_THIS +
        '</div></div>';

    STR_NOKUSER_WARNING = STR_NOKUSER_WARN + STR_NOKEY_GENERAL_WARN;

    STR_K_TWITCH_SUMMARY =
        STR_PROXY_DONATE_SUMMARY +
        STR_SPACE_HTML +
        STR_SPACE_HTML +
        STR_SPAN_LINK +
        DefaultMakeLink('https://github.com/Kwabang/K-Twitch-Bypass') +
        '</span>';

    STR_TTV_LOL_SUMMARY =
        STR_PROXY_DONATE_SUMMARY + STR_SPACE_HTML + STR_SPACE_HTML + STR_SPAN_LINK + DefaultMakeLink('https://ttv.lol/donate') + '</span>';

    STR_PROXY_CONTROLS_ARRAY = [STR_K_TWITCH, STR_TTV_LOL, STR_DISABLED];
}

function DefaultReplaceLink(link, string, center) {
    return center
        ? string.replace('%x', STR_DIV_LINK + DefaultMakeLink(link) + '</div>')
        : string.replace('%x', STR_SPAN_LINK + DefaultMakeLink(link) + '</span>');
}

function DefaultMakeLink(link, prefix) {
    return (
        '<a style="color: ' + LINK_COLOR + '; text-decoration:none;" href="' + (prefix ? prefix : '') + link + '" target="_blank">' + link + '</a>'
    );
}
