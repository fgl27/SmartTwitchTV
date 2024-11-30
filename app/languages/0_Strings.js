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

// Keep this file named as (zero)*** so it loads first in release_maker
var STR_REFRESH,
    STR_SEARCH,
    STR_SETTINGS,
    STR_CONTROLS,
    STR_ABOUT,
    STR_HIDE,
    STR_SEARCH_EMPTY,
    STR_SEARCH_RESULT_EMPTY,
    STR_SWITCH,
    STR_SWITCH_USER,
    STR_SWITCH_VOD,
    STR_SWITCH_CLIP,
    STR_GO_TO,
    STR_USER,
    STR_LIVE,
    STR_GAMES,
    STR_PLAYING,
    STR_FOR,
    STR_WATCHING,
    STR_SINCE,
    STR_AGAME,
    STR_PLACEHOLDER_SEARCH,
    STR_PLACEHOLDER_OAUTH,
    STR_PLACEHOLDER_USER,
    STR_PLACEHOLDER_PRESS,
    STR_CHANNELS,
    STR_CHANNEL,
    STR_GOBACK,
    STR_IS_OFFLINE,
    STR_IS_SUB_ONLY,
    STR_REFRESH_PROBLEM,
    STR_REFRESH_PROBLEM_ENTER,
    STR_NO,
    STR_FOR_THIS,
    STR_PLAYER_PROBLEM,
    STR_VODS,
    STR_HIGHLIGHTS,
    STR_CLIPS,
    STR_CONTENT,
    STR_STREAM_ON,
    STR_DURATION,
    STR_VIEW,
    STR_VIEWS,
    STR_VIEWER,
    STR_VIEWERS,
    STR_EXIT_AGAIN,
    STR_EXIT_MESSAGE,
    STR_EXIT,
    STR_CLOSE,
    STR_MINIMIZE,
    STR_CANCEL,
    STR_RERUN,
    STR_LIVE_CHANNELS,
    STR_LIVE_HOSTS,
    STR_LIVE_GAMES,
    STR_USER_CHANNEL,
    STR_USER_ADD,
    STR_USER_REMOVE,
    STR_USER_ERROR,
    STR_USER_HOSTING,
    STR_USER_HOSTED_BY,
    STR_USER_SET,
    STR_USER_MAKE_ONE,
    STR_USER_NUMBER_ONE,
    STR_ADD_USER_SH,
    STR_CLIP_DAY,
    STR_CLIP_WEEK,
    STR_CLIP_MONTH,
    STR_CLIP_ALL,
    STR_JUMP_TIME,
    STR_JUMP_T0,
    STR_JUMP_CANCEL,
    STR_JUMP_TIME_BIG,
    STR_SEC,
    STR_MIN,
    STR_MS,
    STR_HR,
    STR_SOURCE,
    STR_TWITCH_TV,
    STR_CLOSE_THIS,
    STR_CLOSE_THIS2,
    STR_CLOSE_THIS3,
    STR_PLAYER,
    STR_CHAT,
    STR_CURRENT_VERSION,
    STR_LATEST_VERSION,
    STR_CONTROLS_MAIN_2,
    STR_CONTROLS_MAIN_3,
    STR_CONTROLS_MAIN_4,
    STR_CONTROLS_MAIN_6,
    STR_CONTROLS_MAIN_10,
    STR_CONTROLS_MAIN_14,
    STR_ABOUT_INFO_1,
    STR_ABOUT_INFO_2,
    STR_ABOUT_INFO_3,
    STR_ABOUT_INFO_4,
    STR_ABOUT_INFO_6,
    STR_ABOUT_INFO_18,
    STR_ABOUT_INFO_19,
    STR_CONTROLS_PLAY_1,
    STR_CONTROLS_PLAY_2,
    STR_CONTROLS_PLAY_3,
    STR_CONTROLS_PLAY_4,
    STR_CONTROLS_PLAY_5,
    STR_CONTROLS_PLAY_6,
    STR_CONTROLS_PLAY_7,
    STR_CONTROLS_PLAY_8,
    STR_CONTROLS_PLAY_9,
    STR_CONTROLS_PLAY_10,
    STR_CONTROLS_PLAY_11,
    STR_CONTROLS_PLAY_12,
    STR_CONTROLS_PLAY_14,
    STR_OAUTH_IN,
    STR_USER_CODE,
    STR_USER_CODE_OK,
    STR_KEY_BAD,
    STR_OAUTH_WRONG,
    STR_OAUTH_WRONG2,
    STR_FOLLOWING,
    STR_FOLLOW,
    STR_IS_SUB_NOOAUTH,
    STR_IS_SUB_NOT_SUB,
    STR_IS_SUB_IS_SUB,
    STR_OAUTH_FAIL,
    STR_NOKEY,
    STR_NOKEY_WARN,
    STR_FOLLOW_ISSUE,
    STR_RESET,
    STR_CLIP,
    STR_CHANNEL_CONT,
    STR_NET_DOWN,
    STR_NET_UP,
    STR_FOLLOWERS,
    STR_FOLLOWER,
    STR_CANT_FOLLOW,
    STR_GAME_CONT,
    STR_YES,
    STR_REMOVE_USER,
    STR_PLACEHOLDER_PRESS_UP,
    STR_FOLLOW_GAMES,
    STR_USER_GAMES_CHANGE,
    STR_GUIDE,
    STR_MONTHS,
    STR_DAYS,
    STR_STARTED,
    STR_KEY_UP_DOWN,
    STR_VIDEOS,
    STR_REPLAY,
    STR_STREAM_END,
    STR_STREAM_END_EXIT,
    STR_FEATURED,
    STR_CREATED_AT,
    STR_OPEN_BROADCAST,
    STR_OPEN_LAST_BROADCAST,
    STR_NO_BROADCAST,
    STR_NO_BROADCAST_WARNING,
    STR_NO_CHAT,
    STR_IS_NOW,
    STR_OPEN_HOST,
    STR_SETTINGS_PLAYER,
    STR_SETTINGS_BUFFER_SIZE,
    STR_SETTINGS_BUFFER_SIZE_SHORT_SUMMARY,
    STR_SETTINGS_BUFFER_SIZE_SUMMARY,
    STR_SETTINGS_BUFFER_LIVE,
    STR_SETTINGS_BUFFER_VOD,
    STR_SETTINGS_BUFFER_CLIP,
    STR_SETTINGS_LANG,
    STR_LOADING_CHAT,
    STR_VOD_HISTORY,
    STR_FROM,
    STR_FROM_START,
    STR_CHAT_END,
    STR_RECENT,
    STR_VIWES,
    STR_NOKEY_VIDEO_WARN,
    STR_SWITCH_TYPE,
    STR_ENABLED,
    STR_DISABLED,
    STR_RESTORE_PLAYBACK,
    STR_RESTORE_PLAYBACK_SUMMARY,
    STR_CHAT_FONT,
    STR_CHAT_LINE_ANIMATION,
    STR_OAUTH_FAIL_USER,
    STR_VIDEOS_ANIMATION,
    STR_SIDE_PANEL,
    STR_SIZE,
    STR_BRIGHTNESS,
    STR_FORBIDDEN,
    STR_JUMPING_STEP,
    STR_SECONDS,
    STR_MINUTE,
    STR_MINUTES,
    STR_RESTORE_PLAYBACK_WARN,
    STR_CLOCK_OFFSET,
    STR_CONTENT_LANG,
    STR_CONTENT_LANG_SUMMARY,
    STR_APP_LANG,
    STR_APP_LANG_SUMMARY,
    STR_ENTER_TO_OPEN,
    STR_LANG_ALL,
    STR_NO_GAME,
    STR_ABOUT_INFO_2_SOURCE,
    STR_JUMP_BUFFER_WARNING,
    STR_CHAT_DISABLE,
    STR_CLIP_FAIL,
    STR_F_DISABLE_CHAT,
    STR_CHAT_BRIGHTNESS,
    STR_GOBACK_START,
    STR_PLAY_NEXT,
    STR_PLAY_ALL,
    STR_PLAY_NEXT_IN,
    STR_AUTO_PLAY_NEXT,
    STR_CONTROLS_MAIN_5,
    STR_SIDE_PANEL_BACK_MAIN_MENU,
    STR_UP,
    STR_LIVE_FEED,
    STR_NOKUSER_WARN,
    STR_END_DIALOG_SETTINGS,
    STR_END_DIALOG_SETTINGS_SUMMARY,
    STR_END_DIALOG_DISABLE,
    STR_CHAT_SIZE,
    STR_CHAT_POS,
    STR_CHAT_SIDE_FULL,
    STR_CHAT_SIDE,
    STR_SPEED,
    STR_QUALITY,
    STR_CHAT_VIDEO_MODE,
    STR_NORMAL,
    STR_AUTO,
    STR_DEF_QUALITY,
    STR_DEF_QUALITY_SUMMARY,
    STR_VERY_LOW,
    STR_LOW,
    STR_HIGH,
    STR_VERY_HIGH,
    STR_THUMB_RESOLUTION,
    STR_THUMB_RESOLUTION_SUMMARY,
    STR_PAYPAL_SUMMARY,
    STR_CHAT_DELAY,
    STR_SECOND,
    STR_GUIDE_EXTRA,
    STR_PLAYER_PROBLEM_2,
    STR_EXIT_AGAIN_PICTURE,
    STR_PLAYER_RESYNC,
    STR_PLAYER_BITRATE,
    STR_PLAYER_BITRATE_SHORT_SUMMARY,
    STR_PLAYER_BITRATE_SUMMARY,
    STR_PLAYER_BITRATE_MAIN,
    STR_PLAYER_BITRATE_SMALL,
    STR_PLAYER_BITRATE_SUMMARY_ETC,
    STR_PLAYER_BITRATE_UNLIMITED,
    STR_PICTURE_LIVE_FEED,
    STR_AUDIO_SOURCE,
    STR_PICTURE_PICTURE,
    STR_PICTURE_CONTROLS1,
    STR_PICTURE_CONTROLS2,
    STR_PICTURE_CONTROLS3,
    STR_PICTURE_CONTROLS4,
    STR_PICTURE_CONTROLS5,
    STR_PICTURE_CONTROLS6,
    STR_PICTURE_CONTROLS7,
    STR_PICTURE_CONTROLS8,
    STR_PICTURE_CONTROLS9,
    STR_PICTURE_CONTROLS10,
    STR_PICTURE_CONTROLS11,
    STR_CHAT_5050,
    STR_CHAT_PP_SIDE_FULL,
    STR_PICTURE_CONTROLS12,
    STR_SINGLE_EXIT,
    STR_SINGLE_EXIT_SUMMARY,
    STR_USER_MY_CHANNEL,
    STR_NOW_LIVE_SHOW,
    STR_GLOBAL_FONT,
    STR_GLOBAL_FONT_SUMMARY,
    STR_MAIN_MENU,
    STR_USER_MENU,
    STR_CH_IS_OFFLINE,
    STR_SCREEN_COUNTER,
    STR_ROUND_IMAGES,
    STR_ROUND_IMAGES_SUMMARY,
    STR_SWITCH_POS,
    STR_SWITCH_POS_SUMMARY,
    STR_MAIN_USER,
    STR_USER_OPTION,
    STR_USER_TOP_LABEL,
    STR_USER_EXTRAS,
    STR_LOW_LATENCY,
    STR_LIVE_FEED_SORT,
    STR_LIVE_FEED_SORT_SUMMARY,
    STR_A_Z,
    STR_Z_A,
    STR_APP_ANIMATIONS,
    STR_LOW_LATENCY_SUMMARY,
    STR_CONTROLS_PLAY_13,
    STR_RUNNINGTIME,
    STR_410_ERROR,
    STR_CLICK_UNFOLLOW,
    STR_CLICK_FOLLOW,
    STR_HOLD_UP,
    STR_TODAY,
    STR_DROOPED_FRAMES,
    STR_BUFFER_HEALT,
    STR_NET_SPEED,
    STR_NET_ACT,
    STR_LATENCY,
    STR_WELCOME,
    STR_WELCOME_SUMMARY,
    STR_WARNING_PHONE,
    STR_WARNING_PHONE_SUMMARY,
    STR_CHAT_SHOW,
    STR_DPAD_POSTION,
    STR_DPAD_OPACITY,
    STR_BLOCKED_CODEC,
    STR_BLOCKED_CODEC_SUMMARY,
    STR_CODEC_DIALOG_SUMMARY_1,
    STR_CODEC_DIALOG_SUMMARY_2,
    STR_CODEC_DIALOG_SUMMARY_3,
    STR_MAX_RES,
    STR_MAX_BIT,
    STR_MAX_LEVEL,
    STR_MAX_FPS,
    STR_USER_LIVE,
    STR_PP_WORKAROUND,
    STR_PP_WORKAROUND_SUMMARY,
    STR_HISTORY,
    STR_WATCHED,
    STR_UNTIL,
    STR_SORTING,
    STR_DELETE_HISTORY,
    STR_NAME_A_Z,
    STR_NAME_Z_A,
    STR_GAME_A_Z,
    STR_GAME_Z_A,
    STR_VIWES_MOST,
    STR_VIWES_LOWEST,
    STR_NEWEST,
    STR_OLDEST,
    STR_PRESS_ENTER_D,
    STR_LIVE_VOD,
    STR_BACKUP,
    STR_DELETE_SURE,
    STR_CREATED_NEWEST,
    STR_CREATED_OLDEST,
    STR_THUMB_OPTIONS,
    STR_HISTORY_LIVE_DIS,
    STR_HISTORY_VOD_DIS,
    STR_HISTORY_CLIP_DIS,
    STR_OPEN_GAME,
    STR_OPEN_CHANNEL,
    STR_THUMB_OPTIONS_KEY,
    STR_CHECK_FOLLOW,
    STR_DELETE_FROM_HISTORY,
    STR_REFRESH_DELETE,
    STR_THUMB_OPTIONS_TOP,
    STR_MAX_INSTANCES,
    STR_UNKNOWN,
    STR_PLAYER_MULTI_ALL,
    STR_REPLACE_MULTI,
    STR_REPLACE_MULTI_ENTER,
    STR_ALREDY_PLAYING,
    STR_STREAM_ERROR,
    STR_EXIT_AGAIN_MULTI,
    STR_MULTI_EMPTY,
    STR_4_WAY_MULTI,
    STR_CONTROLS_MULTI,
    STR_CONTROLS_MULTI_0,
    STR_CONTROLS_MULTI_1,
    STR_CONTROLS_MULTI_2,
    STR_CONTROLS_MULTI_3,
    STR_CONTROLS_MULTI_4,
    STR_CONTROLS_MULTI_5,
    STR_CONTROLS_MULTI_6,
    STR_FEED_END_DIALOG,
    STR_MULTI_TITLE,
    STR_BACK_USER_GAMES,
    STR_BITCOIN_SUMMARY,
    STR_SHOW_FEED_PLAYER,
    STR_DISABLED_FEED_PLAYER_MULTI,
    STR_SIDE_PANEL_PLAYER_DELAY,
    STR_SIDE_PANEL_PLAYER_DELAY_SUMMARY,
    STR_START_AT_USER,
    STR_LAST_REFRESH,
    STR_PP_VOD_ERROR,
    STR_SETTINGS_ACCESSIBILITY,
    STR_ACCESSIBILITY_WARN,
    STR_ACCESSIBILITY_WARN_EXTRA,
    STR_ACCESSIBILITY_WARN_EXTRA2,
    STR_AUTO_REFRESH,
    STR_PICTURE_CONTROLS13,
    STR_GUIDE_EXTRA2,
    STR_KEY_MEDIA_FF,
    STR_MAIN_MULTI_BIG,
    STR_MAIN_WINDOW,
    STR_LOADING_FAIL,
    STR_CHAT_CONNECTED,
    STR_MULTI_MAIN_WINDOW,
    STR_PLAYER_LAG,
    STR_STREAM_ERROR_SMALL,
    STR_TOO_ERRORS,
    STR_PING,
    STR_PLAYER_SOURCE,
    STR_CONTROLS_MEDIA_FF,
    STR_VOD_MUTED,
    STR_NOW_BACKGROUND,
    STR_GIFT_SUB,
    STR_CHAT_BANNED,
    STR_CHAT_WRITE,
    STR_PLACEHOLDER_CHAT,
    STR_CHAT_ROOMSTATE,
    STR_CHAT_NO_RESTRICTIONS,
    STR_CHAT_OPTIONS,
    STR_CHAT_DELL_ALL,
    STR_CHAT_TW_EMOTES,
    STR_CHAT_BTTV_GLOBAL,
    STR_CHAT_BTTV_STREAM,
    STR_CHAT_FFZ_GLOBAL,
    STR_CHAT_FFZ_STREAM,
    STR_CHAT_SEVENTV_GLOBAL,
    STR_CHAT_SEVENTV_STREAM,
    STR_CHAT_AT_STREAM,
    STR_CHAT_RESULT,
    STR_CHAT_SEND,
    STR_CHAT_EMOTE_EMPTY,
    STR_CHAT_FOLLOWER_ONLY,
    STR_CHAT_FOLLOWER_ONLY_USER_TIME,
    STR_CHAT_EMOTE_ONLY,
    STR_CHAT_CHOOSE,
    STR_CHAT_UNICODE_EMOJI,
    STR_CHAT_OPTIONS_TITLE,
    STR_CHAT_OPTIONS_KEYBOARD,
    STR_CHAT_OPTIONS_KEYBOARD_SUMMARY,
    STR_CHAT_OPTIONS_KEYBOARD_1,
    STR_CHAT_OPTIONS_KEYBOARD_2,
    STR_CHAT_OPTIONS_KEYBOARD_3,
    STR_CHAT_OPTIONS_EMOTE_SORT,
    STR_NOKEY_CHAT_WARN,
    STR_CHAT_OPTIONS_EMOTE_SORT_SUMMARY,
    STR_CHAT_OPTIONS_FORCE_SHOW,
    STR_CHAT_OPTIONS_FORCE_SHOW_SUMMARY,
    STR_CHAT_NOT_READY,
    STR_CHAT_REDEEMED_MESSAGE_HIGH,
    STR_CHAT_REDEEMED_MESSAGE_SUB,
    STR_SIDE_PANEL_PLAYER,
    STR_NOTIFICATION_OPT,
    STR_DPAD_OPT,
    STR_UI_SETTINGS,
    STR_APP_ANIMATIONS_SUMMARY,
    STR_VIDEOS_ANIMATION_SUMMARY,
    STR_SETTINGS_ACCESSIBILITY_SUMMARY,
    STR_START_AT_USER_SUMMARY,
    STR_AUTO_REFRESH_SUMMARY,
    STR_OPTIONS,
    STR_CHAT_HIGHLIGHT_STREAMER,
    STR_CHAT_HIGHLIGHT_USER,
    STR_CHAT_HIGHLIGHT_USER_SEND,
    STR_CHAT_SHOW_SUB,
    STR_CHAT_HIGHLIGHT_BIT,
    STR_CHAT_HIGHLIGHT_ACTIONS,
    STR_CHAT_HIGHLIGHT_ACTIONS_SUMMARY,
    STR_CHAT_INDIVIDUAL_BACKGROUND,
    STR_CHAT_INDIVIDUAL_BACKGROUND_SUMMARY,
    STR_CHAT_LOGGING,
    STR_CHAT_LOGGING_SUMMARY,
    STR_CHAT_HIGHLIGHT_STREAMER_MSG,
    STR_CHAT_HIGHLIGHT_MOD_MSG,
    STR_CHAT_HIGHLIGHT_REDEEMED,
    STR_CHAT_INDIVIDUAL_LINE,
    STR_BRIGHT_MODE,
    STR_DARK_MODE,
    STR_CHAT_NICK_COLOR,
    STR_CHAT_NICK_COLOR_SUMMARY,
    STR_OPEN_HOST_SETTINGS,
    STR_PING_WARNING,
    STR_PING_WARNING_SUMMARY,
    STR_SHOW_FEED_PLAYER_SUMMARY,
    STR_DISABLED_FEED_PLAYER_MULTI_SUMMARY,
    STR_CHECK_HOST,
    STR_ANONYMOUS,
    STR_SCREEN_COUNTER_SUMMARY,
    STR_WARNINGS,
    STR_KEY_UP_TIMEOUT,
    STR_KEY_UP_TIMEOUT_SUMMARY,
    STR_CURRENT_THUMB_STYLE,
    STR_NEW_THUMB_STYLE,
    STR_COLOR_STYLE_TEXT,
    STR_SHADOWS,
    STR_COLORS,
    STR_RESULT,
    STR_SHADOWS_NONE,
    STR_SHADOWS_WHITE,
    STR_SHADOWS_GRAY,
    STR_SHADOWS_BLACK,
    STR_APPLY,
    STR_COLOR_TYPE,
    STR_STYLES,
    STR_ENTER,
    STR_COLOR_ARRAY,
    STR_STYLES_ARRAY,
    STR_ENTER_RGB,
    STR_THUMB_STYLE,
    STR_END_DIALOG_OPT,
    STR_OPEN_EXTERNAL_PLAYER,
    STR_CHAT_CLEAR_MSG,
    STR_CHAT_CLEAR_MSG_SUMMARY,
    STR_CHAT_BADGES_OPTIONS,
    STR_CHAT_SHOW_BADGES,
    STR_CHAT_SHOW_BADGES_MOD,
    STR_CHAT_SHOW_BADGES_VIP,
    STR_SHOW_SIDE_PLAYER,
    STR_PREVIEW_OTHERS_VOLUME,
    STR_PREVIEW_OTHERS_VOLUME_SUMMARY,
    STR_PREVIEW_SIZE,
    STR_PREVIEW_SIZE_SUMMARY,
    STR_PREVIEW_SIZE_ARRAY,
    STR_PREVIEW_VOLUME,
    STR_PREVIEW_VOLUME_SUMMARY,
    STR_SHOW_LIVE_PLAYER,
    STR_SHOW_VOD_PLAYER,
    STR_SHOW_VOD_PLAYER_WARNING,
    STR_PREVIEW_END,
    STR_SHOW_CLIP_PLAYER,
    STR_PREVIEW_ERROR_LOAD,
    STR_PREVIEW_ERROR_LINK,
    STR_PLAYER_LAG_ERRO,
    STR_PLAYER_ERROR,
    STR_PLAYER_ERROR_MULTI,
    STR_PREVIEW_CLIP_NEXT,
    STR_EMPTY,
    STR_VOD_HISTORY_FORM_LIVE,
    STR_VOD_HISTORY_BASE,
    STR_PREVIEW_VOD_DELETED,
    STR_CHAT_SIDE_ARRAY,
    STR_CHAT_BASE_ARRAY,
    STR_CHAT_100_ARRAY,
    STR_VOD_DIALOG,
    STR_VOD_DIALOG_SUMMARY,
    STR_VOD_DIALOG_START,
    STR_VOD_DIALOG_LAST,
    STR_VOD_DIALOG_SHOW,
    STR_PREVIEW_SIZE_SCREEN_ARRAY,
    STR_PREVIEW_SIZE_SCREEN,
    STR_PREVIEW_SIZE_SCREEN_SUMMARY,
    STR_NOW_BACKGROUND_SUMMARY,
    STR_NOTIFICATION_POS_ARRAY,
    STR_NOTIFICATION_POS,
    STR_STAY_OPEN,
    STR_STAY_OPEN_SUMMARY,
    STR_STAY_CHECK,
    STR_STAY_CHECKING,
    STR_STAY_CHECK_LAST,
    STR_STAY_IS_OFFLINE,
    STR_ALWAYS_STAY,
    STR_NOTIFICATION_REPEAT,
    STR_NOTIFICATION_REPEAT_SUMMARY,
    STR_CHAT_TIMESTAMP,
    STR_PLAYER_INFO_VISIBILITY_ARRAY,
    STR_OPEN_CHAT,
    STR_WAITING,
    STR_SOURCE_CHECK,
    STR_SOURCE_CHECK_SUMMARY,
    STR_AUTO_REFRESH_BACKGROUND,
    STR_AUTO_REFRESH_BACKGROUND_SUMMARY,
    STR_LOWLATENCY_ARRAY,
    STR_NOTIFICATION_SINCE,
    STR_NOTIFICATION_SINCE_SUMMARY,
    STR_IS_SUB_ONLY_ERROR,
    STR_VOD_SEEK,
    STR_VOD_SEEK_SUMMARY,
    STR_VOD_SEEK_MIN,
    STR_VOD_SEEK_MAX,
    STR_VOD_SEEK_TIME,
    STR_UP_LOCKED,
    STR_LOCKED,
    STR_CHAT_MESSAGE_DELETED,
    STR_CHAT_MESSAGE_DELETED_ALL,
    STR_CHAT_MESSAGE_DELETED_TIMEOUT,
    STR_IN_CHAT,
    STR_SHOW_IN_CHAT,
    STR_PLAYED,
    STR_CHAPTERS,
    STR_FROM_SIMPLE,
    STR_GENERAL_CUSTOM,
    STR_CHANNELS_MOST,
    STR_CHANNELS_LOWEST,
    STR_GAME_SORT,
    STR_CLOCK_OFFSET_SUMMARY,
    STR_SHOW_IN_CHAT_SUMMARY,
    STR_NOW_LIVE_GAME_SHOW,
    STR_TITLE_CHANGE_SHOW,
    STR_GAME_CHANGE_SHOW,
    STR_CHANGELOG,
    STR_FULL_CHANGELOG,
    STR_CHANGELOG_SUMMARY,
    STR_UPDATE,
    STR_UPDATE_CHECK,
    STR_UPDATE_CHANGELOG,
    STR_UPDATE_LATEST,
    STR_UPDATE_FAIL,
    STR_UPDATE_FAIL_DOWNLOAD,
    STR_UPDATE_CHECKING,
    STR_UPDATE_CHECKING_FAIL,
    STR_NO_UPDATES,
    STR_UPDATE_AVAILABLE,
    STR_WEB_UPDATE_AVAILABLE,
    STR_UPDATE_LAST_CHECK,
    STR_UPDATE_CHECK_SIDE,
    STR_UPDATE_OPT,
    STR_UPDATE_CHECK_FOR,
    STR_UPDATE_SHOW,
    STR_UPDATE_SHOW_ARRAY,
    STR_UPDATE_START,
    STR_UPDATE_PLAY,
    STR_UPDATE_ERROR,
    STR_UPDATE_WARNING_OK,
    STR_DISABLE,
    STR_ENABLE,
    STR_LOWLATENCY_ENABLE_ARRAY,
    STR_QUALITY_MULTI,
    STR_QUALITY_MULTI_BIG,
    STR_PRESS_ENTER_TO_CHANGE,
    STR_LATENCY_TO_BROADCASTER,
    STR_CHAT_DELAY_LATENCY_TO_BROADCASTER,
    STR_CHAT_SEND_DELAY,
    STR_BLOCK_RES,
    STR_BLOCK_RES_SHORT_SUMMARY,
    STR_BLOCK_RES_SUMMARY,
    STR_BLOCK_RES_SUMMARY_EXTRA,
    STR_BLOCKED,
    STR_BLOCKED_NOT,
    STR_PLAYER_MAIN,
    STR_PLAYER_RES_MAIN,
    STR_PLAYER_RES_SMALL,
    STR_HIDE_PLAYER_CLOCK,
    STR_HIDE_MAIN_CLOCK,
    STR_HIDE_MAIN_SCREEN_TITLE,
    STR_HIDE_ETC_HELP_INFO,
    STR_HIDE_MAIN_SCREEN_TITLE_SUMMARY,
    STR_HIDE_ETC_HELP_INFO_SUMMARY,
    STR_INACTIVE_SETTINGS,
    STR_INACTIVE_SETTINGS_SUMMARY,
    STR_INACTIVE_WARNING,
    STR_SHOW_ISLIVE_WARNING,
    STR_SHOW_ISLIVE_WARNING_SUMMARY,
    STR_REMAINING,
    STR_CHAT_EXTRA,
    STR_AUDIO_ALL,
    STR_AUDIO_ALL_100,
    STR_VOLUME,
    STR_AUDIO,
    STR_VOLUME_CONTROLS,
    STR_AUDIO_ALL_100_SET,
    STR_AUDIO_ALL_ENA,
    STR_QUALITY_PP,
    STR_PREVIEW_SHOW,
    STR_PREVIEW_SET,
    STR_PREVIEW_SIZE_CONTROLS,
    STR_PLAYER_INFO_VISIBILITY,
    STR_SHOW_IN_CHAT_VIEWERS,
    STR_SHOW_IN_CHAT_CHATTERS,
    STR_OLED_BURN_IN,
    STR_OLED_BURN_IN_SUMMARY,
    STR_DELETE_UNREACHABLE,
    STR_DELETE_UNREACHABLE_SUMMARY,
    STR_4_WAY_MULTI_INSTANCES,
    STR_PP_MODO,
    STR_IS_LIVE,
    STR_AS,
    STR_MILLISECONDS,
    STR_HOUR,
    STR_HOURS,
    STR_RIGHT,
    STR_LEFT,
    STR_BOTTOM,
    STR_TOP,
    STR_AVG,
    STR_OFFSET,
    STR_AFFILIATE,
    STR_AFFILIATE_SUMMARY,
    STR_AFFILIATE_ABOUT,
    STR_CHAT_BOTS,
    STR_AFFILIATE_ABOUT_DIS,
    STR_HISTORY_EMPTY_CONTENT,
    STR_PREVIEW,
    STR_CLICK_EXIT,
    STR_EMBED,
    STR_GO_FULL,
    STR_NOT_SUPPORT_BROWSER,
    STR_WARNING_BROWSER,
    STR_WARNING_BROWSER_SUMMARY,
    STR_GO_FULL_HELP,
    STR_THUMB_OPTIONS_CLICK,
    STR_CLOSE_THIS_BROWSER,
    STR_DISABLE_EMBED,
    STR_DISABLE_EMBED_SUMMARY,
    STR_SPECIAL_FEATURE,
    STR_FAIL_VOD_INFO,
    STR_NOKUSER_WARNING,
    STR_NOKEY_GENERAL_WARN,
    STR_TTV_LOL,
    STR_TTV_LOL_SUMMARY,
    PROXY_SERVICE,
    PROXY_SERVICE_STATUS,
    PROXY_SERVICE_FAIL,
    PROXY_SERVICE_OFF,
    PROXY_SETTINGS,
    PROXY_SETTINGS_SUMMARY,
    STR_K_TWITCH,
    STR_K_TWITCH_SUMMARY,
    STR_T1080,
    STR_T1080_SUMMARY,
    STR_PROXY_TIMEOUT,
    STR_PROXY_TIMEOUT_SUMMARY,
    STR_PROXY_DONATE_SUMMARY,
    STR_PROXY_CONTROLS_ARRAY,
    STR_PREVIEW_VOLUME_SCREEN,
    STR_PREVIEW_VOLUME_SCREEN_SUMMARY,
    SEEK_PREVIEW,
    SEEK_PREVIEW_SUMMARY,
    SEEK_PREVIEW_SINGLE,
    SEEK_PREVIEW_CAROUSEL,
    SEEK_PREVIEW_ARRAY,
    OPEN_NEW_ISSUE,
    STR_MATURE_DISABLED,
    STR_ENABLE_MATURE,
    STR_ENABLE_MATURE_SUMMARY,
    STR_MATURE_PROTECT,
    STR_PLACEHOLDER_PASS,
    STR_MATURE_NO_CHANGES,
    STR_MATURE_HELP_SET_PASS,
    STR_MATURE_HELP_CHECK_PASS,
    STR_CONFIRM,
    STR_SCREEN_OFF,
    STR_UNBLOCK_CHANNEL,
    STR_UNBLOCK_GAME,
    STR_BLOCK_CHANNEL,
    STR_BLOCK_GAME,
    STR_BLOCK_NO_USER,
    STR_BLOCK_NO_CHANNEL,
    STR_BLOCK_OVERWRITE,
    STR_BLOCK_SORT_DATE,
    STR_BLOCK_SORT_NAME,
    STR_BLOCK_EMPTY_CONTENT,
    STR_NO_TOKEN_WARNING,
    STR_NO_TOKEN_WARNING_429,
    STR_ADD_USER_TEXT,
    STR_ADD_USER_TEXT_COUNTER,
    STR_ADD_USER_TEXT_COUNTER_NOW,
    STR_ADD_ERROR,
    STR_USER_TOKEN_ERROR,
    STR_REFRESH_PROBLEM_ENTER_LANG,
    STR_PASS_MATURE_ENABLED,
    STR_WRONG_PASS,
    STR_PLAYER_EXTRA_CODEC,
    STR_PLAYER_EXTRA_CODEC_SUMMARY,
    STR_PLAYER_EXTRA_CODEC_SUMMARY_EXTRA,
    STR_PLAYER_EXTRA_CODEC_SUMMARY_EXTRA2,
    STR_PLAYER_EXTRA_CODEC_SUMMARY_EXTRA3,
    STR_PLAYER_CODEC_AV1,
    STR_PLAYER_CODEC_HEVC,
    STR_PLAYER_CODEC_SUPPORTED,
    STR_PLAYER_CODEC_NOT_SUPPORTED,
    STR_SPEED_ADJUST,
    STR_SPEED_ADJUST_SUMMARY,
    STR_SW_CODEC,
    STR_HW_CODEC,
    STR_JUMP_TIME_CLICK_AGAIN;
