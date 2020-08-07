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
var STR_BR = "<br>";
var STR_SPACE = '&nbsp;';
var STR_ABOUT_EMAIL = "fglfgl27@gmail.com";
var STR_DOT = '<i  class="icon-circle class_bold" style="font-size: 50%; vertical-align: middle;"></i>' + "  ";
var STR_DIV_TITLE = '<div class="about_text_title">';
var STR_DIV_TITLE_LEFT = '<div class="about_text_title" style="text-align: left;">';
var STR_DIV_MIDLE_LEFT = '<div style="text-align: left;">';
var STR_DIV_LINK = '<div style="text-align: center; width: 100%; display: inline-block; color: #0366d6;">';
var STR_RED_DIV = '<div class="class_bold" style="text-align: center; width: 100%; display: inline-block; color: #FF0000; font-size: 110%;">';
var STR_CONTROL_KEY = '';
var STR_SEARCH_KEY = '';
var STR_ABOUT_KEY = '';
var STR_SETTINGS_KEY = '';
var STR_CONTROLS_MAIN_0 = '';
var STR_ABOUT_PHONE_0 = '';
var STR_ABOUT_INFO_HEADER = '';
var STR_ABOUT_INFO_0 = '';
var STR_ACCESSIBILITY_WARN_TEXT = '';
var STR_CONTROLS_PLAY_0 = '';
var STR_PAYPAL;
var STR_BITCOIN;
var STR_BITCOIN_WALLET = "1DuhCT6L3VfBtFcS8FNfVXgBzE2rwCPx3x";
var STR_APP_LAG = 'https://tinyurl.com/applag';

// This function is called after the main language is loaded, the above are initialized empty so it doesn't cause loading exceptions
function DefaultLang() {
    STR_CONTROL_KEY = STR_CONTROLS + " (C)";
    STR_SEARCH_KEY = STR_SEARCH + " (D)";
    STR_SETTINGS_KEY = STR_SETTINGS + " (A)";
    STR_ABOUT_KEY = STR_ABOUT + " (A)";
    STR_SWITCH = STR_SWITCH + STR_KEY_UP_DOWN;
    STR_SWITCH_USER = STR_SWITCH_USER + STR_KEY_UP_DOWN;
    STR_CONTROLS_MAIN_3 = STR_CONTROLS_MAIN_3 + STR_GUIDE + STR_GUIDE_EXTRA + STR_GUIDE_EXTRA2;
    STR_GOBACK = STR_GOBACK_START;
    STR_PAYPAL = '<div style="vertical-align: middle;"><img style="vertical-align: middle; display: inline-block; width: 4%;" alt="" src="https://fgl27.github.io/SmartTwitchTV/release/githubio/images/paypal.png"><div class="class_bold" style="vertical-align: middle; display: inline-block; font-size: 120%;">' +
        STR_PAYPAL_SUMMARY + '</div></div>';
    STR_BITCOIN = '<div style="vertical-align: middle;"><img style="vertical-align: middle; display: inline-block; width: 4%;" alt="" src="https://fgl27.github.io/SmartTwitchTV/release/githubio/images/bitcoin.png"><div class="class_bold" style="vertical-align: middle; display: inline-block; font-size: 120%;">' +
        STR_SPACE + STR_BITCOIN_SUMMARY + STR_BR + STR_SPACE + STR_BITCOIN_WALLET + '</div></div>';

    STR_CONTROLS_PLAY_0 = STR_DIV_TITLE + STR_PLAYER + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_CONTROLS_PLAY_4 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_1 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_2 + STR_BR + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_CONTROLS_PLAY_3 + STR_BR +
        STR_DOT + STR_CONTROLS_MEDIA_FF + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_5 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_6 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_13 + STR_BR +

        STR_DIV_TITLE + STR_CHAT + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_CONTROLS_PLAY_7 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_14 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_8 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_9 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_10 + STR_BR +
        STR_DOT + STR_CONTROLS_PLAY_11 + STR_BR +

        STR_DIV_TITLE + STR_PICTURE_PICTURE + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_PICTURE_CONTROLS13 + STR_BR +
        STR_DOT + STR_MAIN_MULTI_BIG + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS1 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS12 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS2 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS4 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS5 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS6 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS11 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS7 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS3 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS8 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS9 + STR_BR +
        STR_DOT + STR_PICTURE_CONTROLS10;

    STR_CONTROLS_MULTI = STR_DIV_TITLE + STR_CONTROLS_MULTI_0 + '</div>' +
        STR_DIV_MIDLE_LEFT +
        STR_DOT + STR_CONTROLS_MULTI_1 + STR_BR +
        STR_DOT + STR_CONTROLS_MULTI_2 + STR_BR +
        STR_DOT + STR_CONTROLS_MULTI_3 + STR_BR +
        STR_DOT + STR_CONTROLS_MULTI_4 + STR_BR +
        STR_DOT + STR_MAIN_MULTI_BIG + STR_BR +
        STR_DOT + STR_CONTROLS_MULTI_5 + STR_BR + '</div>' +
        STR_DIV_TITLE + STR_CONTROLS_MULTI_6 + '</div>';

    STR_CONTROLS_MAIN_0 = STR_DIV_TITLE + STR_CONTROLS + STR_BR + STR_RED_DIV + STR_CONTROLS_ETC + '</div></div>' +
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

    STR_ACCESSIBILITY_WARN_TEXT = STR_DIV_TITLE + STR_WARNING + STR_ACCESSIBILITY_WARN + '</div>' + STR_BR +
        STR_SETTINGS_ACCESSIBILITY_SUMMARY + STR_BR + STR_ACCESSIBILITY_WARN_EXTRA + STR_BR + STR_BR +
        STR_RED_DIV + STR_APP_LAG + '</div>' + STR_BR + STR_BR + STR_ACCESSIBILITY_WARN_EXTRA2 + STR_BR + STR_BR +
        STR_DIV_TITLE + STR_CLOSE_THIS + '</div>';

    STR_ABOUT_INFO_HEADER = STR_DIV_TITLE + STR_TWITCH_TV + '</div></div>';
    STR_ABOUT_INFO_0 = STR_BR + STR_BR + STR_ABOUT_INFO_1 +
        (Main_IsOn_OSInterface ? '' : STR_BR + STR_RED_DIV + STR_ABOUT_INFO_2_SOURCE + '</div>') +

        STR_DIV_TITLE + STR_ABOUT_INFO_18 + '</div>' +
        STR_ABOUT_INFO_19 + STR_BR +
        STR_DIV_LINK + STR_ABOUT_INFO_20 + '</div>' + STR_BR +
        STR_DIV_TITLE + STR_ABOUT_INFO_3 + '</div>' +
        STR_DIV_LINK + STR_ABOUT_EMAIL + '</div>' + STR_BR +
        STR_PAYPAL +
        STR_BITCOIN + STR_BR +
        STR_ABOUT_INFO_4 + STR_BR +
        STR_DIV_LINK + STR_ABOUT_INFO_5 + '</div>' + STR_BR +
        STR_BR +
        STR_DIV_TITLE_LEFT + STR_ABOUT_INFO_6 + '</div>' +
        STR_DIV_MIDLE_LEFT + STR_BR +
        STR_SPACE + STR_SPACE + STR_SPACE + STR_ABOUT_INFO_14 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_7 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_23 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_24 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_10 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_12 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_13 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_9 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_8 + STR_BR +
        STR_SPACE + STR_SPACE + STR_SPACE + STR_ABOUT_INFO_15 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_16 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_17 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_21 + STR_BR +
        STR_DOT + STR_ABOUT_INFO_22 + STR_BR + STR_BR +
        STR_DIV_TITLE + STR_CLOSE_THIS + '</div></div>';
}