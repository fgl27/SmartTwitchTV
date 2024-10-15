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

package com.fgl27.twitch;

public final class Constants {

    //Load the page from assets for testing
    private final static boolean LoadFromAssets = false;

    final static String PageUrl = LoadFromAssets ?
            "file:///android_asset/app/index.html" :
            "https://fgl27.github.io/SmartTwitchTV/release/index.html";
    final static String KeyPageUrl = LoadFromAssets ?
            "file:///android_asset/app/Extrapage/index.html" :
            "https://fgl27.github.io/SmartTwitchTV/release/extrapageindex.html";

    final static String PageUrlBackup = "https://smarttv-client-for-twitch.web.app/index.html";
    final static String KeyPageUrlBackup = "https://smarttv-client-for-twitch.web.app/extrapageindex.html";

    //Keep all public constant on same place
    public static final String PREF_NOTIFY_OLD_STREAM_LIST = "stream_list";
    public static final String PREF_NOTIFY_OLD_GAME_LIST = "game_list";
    public static final String PREF_NOTIFICATION_BACKGROUND = "notification_background";
    public static final String PREF_NOTIFICATION_REPEAT = "notification_repeat";
    public static final String PREF_NOTIFICATION_SINCE_TIME = "notification_since";
    public static final String PREF_NOTIFICATION_POSITION = "notification_position";
    public static final String PREF_NOTIFICATION_WILL_END = "notification_end_time";
    public static final String PREF_NOTIFICATION_STREAM_LIVE = "notification_live";
    public static final String PREF_NOTIFICATION_STREAM_TITLE = "notification_title";
    public static final String PREF_NOTIFICATION_STREAM_GAME = "notification_game";

    public static final String PREF_CLIENT_ID = "client_id";
    static final String PREF_CLIENT_SECRET = "client_secret";
    static final String PREF_REDIRECT_URI = "redirect_uri";
    public static final String PREF_CLIENT_TOKEN = "client_token";

    public static final String PREF_USER_ID = "user_id";
    //public static final String PREF_USER_NAME = "user_name";
    public static final String PREF_USER_LANGUAGE = "user_lang";

    static final String PREF_REFRESH_TOKEN = "refresh_token";
    public static final String PREF_ACCESS_TOKEN = "access_token";
    public static final String PREF_TOKEN_EXPIRES_WHEN = "toke_expires_when";

    public static final String ACTION_SCREEN_ON = "action_screenOn";
    public static final String ACTION_SCREEN_OFF = "action_screenOff";
    public static final String ACTION_NOTIFY_START = "action_StartService";
    public static final String ACTION_NOTIFY_STOP = "action_StopService";

    public static final String CHANNEL_OBJ = "channel_obj";
    public static final String CHANNEL_INTENT = "channel_intent";//f update this also update it on the manifest... ChannelsReceiver & PlayerActivity
    public static final String CHANNEL_TYPE = "channel_type";

    public static final String DEEPLINK_SCHEME = "smarttvtwitch";
    public static final String BLOCKED_CHANNEL = "blocked_channel";
    public static final String BLOCKED_GAMES = "blocked_games";

    public static final String[][] BASE_HEADERS = {
            {"Client-ID", ""},
            {"Authorization", "Bearer "}
    };

    public static final String[] CHANNELS_NAMES = {
            "",//Default reserved getIntExtra (String name, int defaultValue : 0)
            "Live",
            "User Live",
            "Featured",
            "Games",
    };

    public static final int CHANNEL_TYPE_LIVE = 1;
    public static final int CHANNEL_TYPE_USER_LIVE = 2;
    public static final int CHANNEL_TYPE_FEATURED = 3;
    public static final int CHANNEL_TYPE_GAMES = 4;

    public static final int NOTIFICATION_CHECK_INTERVAL = 1000 * 60 * 5;//it 5 min
    public static final int DEFAULT_HTTP_TIMEOUT = 60000;
    public static final int DEFAULT_HTTP_EXTRA_TIMEOUT = 10000;

    public static final String VIDEO_404 = "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/404_video.png";
    public static final String LOGO_404 = "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/404_logo.png";
    public static final String GAME_404 = "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/404_game.png";
}
