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

//Spacing for release maker not trow errors from jshint
function en_USLang() {
    // This is a false/true var change if day comes first in your language eg (27/12/2010) day 27 month 12 year 2010
    //Then copy this and set it to true, if doesn't don't copy it
    Main_IsDayFirst = false;

    // This is the size of side pannel a adjustments may be needed here so it can fit all words in the horizontal axis
    // If it need ajustment or yours language just copy the below line and change it value until it does
    Sidepannel_MoveldefaultMargin = 14.5;

    //Below are variables to translate
    STR_KEY_UP_DOWN = 'PG up/down';
    STR_KEY_MEDIA_FF = 'or fast forward rewind media key';
    STR_GUIDE_EXTRA = 'or press key 2';
    STR_GUIDE_EXTRA2 = 'or media key next track';
    STR_REFRESH = 'Refresh';
    STR_SEARCH = 'Search';
    STR_SETTINGS = 'Settings';
    STR_CONTROLS = 'Controls';
    STR_ABOUT = 'About';
    STR_HIDE = 'Hide';
    STR_SEARCH_EMPTY = 'You entered an empty search term';
    STR_SEARCH_RESULT_EMPTY = 'No search results found';
    STR_SWITCH = 'Switch screen';
    STR_SWITCH_USER = 'Switch user screen';
    STR_SWITCH_VOD = 'Switch: VODs or highlights';
    STR_SWITCH_CLIP = 'Switch: Period (24h, 7d, 30d, all)';
    STR_GO_TO = 'Go to screen';
    STR_USER = 'User';
    STR_LIVE = 'Live';
    STR_GAMES = 'Games';
    STR_PLAYING = 'Playing';
    STR_FOR = 'for';
    STR_WATCHING = 'Watch time';
    STR_WAITING = 'Wait time';
    STR_SINCE = 'Since';
    STR_AGAME = 'A Game';
    STR_PLACEHOLDER_PASS = 'Enter your password...';
    STR_PLACEHOLDER_SEARCH = 'Enter your search ...';
    STR_PLACEHOLDER_OAUTH = 'Enter your authorization key ...';
    STR_PLACEHOLDER_USER = 'Enter your username and press Enter ...';
    STR_PLACEHOLDER_PRESS = 'Press Enter or Select key to,';
    STR_CHANNELS = 'Channels';
    STR_CHANNEL = 'Channel';
    STR_GOBACK_START = 'Back to the previous screen: Press return';
    STR_IS_OFFLINE = 'has ended';
    STR_CHECK_HOST = ', checking host';
    STR_IS_SUB_ONLY = 'This video is only available to subscribers';
    STR_IS_SUB_ONLY_ERROR = 'is sub-only content.';
    STR_NOKEY_GENERAL_WARN = ', navigate to the side panel (Top option) Add User or User: Switch, add, key, press enter on the user';
    STR_REFRESH_PROBLEM = 'Connection failed or no content available. Try refreshing';
    STR_REFRESH_PROBLEM_ENTER = 'Failed to connect or no content available. Try refreshing.';
    STR_REFRESH_PROBLEM_ENTER_LANG =
        'Connection failed or there is no content for this language. Change content language (hold left) or Press enter to Refresh';
    STR_NO = 'No';
    STR_FOR_THIS = 'for this';
    STR_PLAYER_PROBLEM = 'Connection failed, unable to load video content, exiting ...';
    STR_VODS = 'VODs';
    STR_HIGHLIGHTS = 'Highlights';
    STR_CLIPS = 'Clips';
    STR_CONTENT = 'Content';
    STR_STREAM_ON = 'Streamed';
    STR_DURATION = 'Duration';
    STR_VIEW = 'View';
    STR_VIEWS = 'Views';
    STR_VIEWER = 'Viewer';
    STR_VIEWERS = 'Viewers';
    STR_EXIT_AGAIN = 'Click again to exit';
    STR_EXIT_AGAIN_PICTURE = 'Click again to exit picture-in-picture mode';
    STR_EXIT_AGAIN_MULTI = 'Click again to exit multistream mode';
    STR_EXIT_MESSAGE = 'Are you sure you want to exit the SmartTV Client for Twitch?';
    STR_EXIT = 'Exit';
    STR_CHANGELOG = 'Changelog';
    STR_FULL_CHANGELOG = 'Full changelog';
    STR_CHANGELOG_SUMMARY = 'These are the latest changes. For the full list, check out the link below:';
    STR_UPDATE = 'Click to Update';
    STR_UPDATE_CHECK = 'Check for Updates';
    STR_UPDATE_CHECKING = 'Checking for Updates ...';
    STR_UPDATE_CHECKING_FAIL = 'Update check failed';
    STR_NO_UPDATES = 'The app is up to date';
    STR_UPDATE_CHANGELOG = 'Updates & Changelog';
    STR_UPDATE_LATEST = 'Latest change:';
    STR_UPDATE_FAIL = 'Update process failed, please try manually!';
    STR_UPDATE_FAIL_DOWNLOAD = 'Failed to download update. Please try manually';
    STR_UPDATE_AVAILABLE = 'APK Update available';
    STR_WEB_UPDATE_AVAILABLE = 'Web Update available';
    STR_UPDATE_CHECK_SIDE = ', check the side panel for updates';
    STR_UPDATE_LAST_CHECK = 'Last checked:';
    STR_UPDATE_OPT = 'Updates options';
    STR_UPDATE_CHECK_FOR = 'Check for updates in background';
    STR_UPDATE_SHOW = 'Show the updates dialog when updates are available';
    STR_UPDATE_SHOW_ARRAY = ['Yes', 'Only a toast message', 'No'];
    STR_UPDATE_START = 'Update process started. This may take a few seconds, please wait!';
    STR_UPDATE_PLAY = "If Play Store doesn't show the update, try again after a few minutes!";
    STR_UPDATE_ERROR = 'You need APK version 3.0.303 or newer to be able to use this, please update the old way!';
    STR_UPDATE_WARNING_OK = 'App updated successfully';
    STR_CLOSE = 'Close';
    STR_MINIMIZE = 'Minimize';
    STR_CANCEL = 'Cancel';
    STR_RERUN = 'Rerun';
    STR_LIVE_CHANNELS = 'Channels live';
    STR_LIVE_HOSTS = 'Hosts';
    STR_LIVE_GAMES = 'Games live';
    STR_USER_CHANNEL = 'Followed Channels';
    STR_USER_MY_CHANNEL = 'My Channel';
    STR_USER_ADD = 'Add User';
    STR_USER_REMOVE = 'Remove User';
    STR_USER_ERROR = "User doesn't exist";
    STR_USER_HOSTING = 'hosting';
    STR_USER_HOSTED_BY = 'hosted by';
    STR_USER_SET = 'already set';
    STR_USER_MAKE_ONE = 'Switch to';
    STR_USER_NUMBER_ONE = 'The first user can see the live channels feed and follow/unfollow';
    STR_ADD_USER_SH = 'Add a Twitch user to display their followed content here';
    STR_CLIP_DAY = '24h';
    STR_CLIP_WEEK = '7d';
    STR_CLIP_MONTH = '30d';
    STR_CLIP_ALL = 'all';
    STR_JUMP_TIME = 'Jumping';
    STR_JUMP_TIME_CLICK_AGAIN = 'Click again to jump';
    STR_JUMP_T0 = 'to';
    STR_JUMP_CANCEL = 'Jump Canceled';
    STR_JUMP_TIME_BIG = ', jump time bigger than duration';
    STR_SEC = 'Sec';
    STR_MIN = 'Min';
    STR_MS = 'Ms';
    STR_HR = 'Hr';
    STR_SOURCE = 'Source';
    STR_TWITCH_TV = 'SmartTV Client for Twitch';
    STR_CLOSE_THIS = 'Press return or enter to close this';
    STR_CLOSE_THIS2 = 'Press return to close this';
    STR_CLOSE_THIS3 = 'Press return to show the update dialog or enter to close this';
    STR_PLAYER = 'Player related:';
    STR_CHAT = 'Chat related:';
    STR_CHAT_SHOW = 'Show chat';
    STR_CURRENT_VERSION = 'Currently installed version';
    STR_LATEST_VERSION = 'latest available version';
    STR_CONTROLS_MAIN_2 = 'Play a video: Navigate using (up/down/left/right) D-pad, press enter, play/pause, preview track media keys or key 1';
    STR_CONTROLS_MAIN_3 = 'Refresh screen content:';
    STR_CONTROLS_MAIN_4 = 'Exit the application: Click exit in the side panel';
    STR_CONTROLS_MAIN_5 = 'Force close the application: Hold return until it auto force closes';
    STR_CONTROLS_MAIN_6 = 'Switch screens: Press return, then up/down D-Pad or ' + STR_KEY_UP_DOWN + ' ' + STR_KEY_MEDIA_FF;
    STR_CONTROLS_MAIN_10 =
        'Start a search: In the side panel, click search, type in your query, and press enter on the virtual keyboard, then choose one of the searching options';
    STR_CONTROLS_MAIN_14 = 'About this application: Click about in the side panel';
    STR_ABOUT_INFO_1 = 'This is an Android TV Twitch Client, released for free to anyone who wants to use it.';
    STR_ABOUT_INFO_2 =
        'This app has no affiliation with Twitch, this is a user-made app, but is only possible because Twitch provides all the API that allows the app to show the Twitch content.';
    STR_ABOUT_INFO_2_SOURCE = 'This version of the app is only for testing in the browser!';
    STR_ABOUT_INFO_3 = 'Contact information:';
    STR_ABOUT_INFO_4 = 'This is an open source application licensed under the GNU General Public License v3.0, check it out on GitHub:';

    STR_ABOUT_INFO_6 = 'To see the application dependencies use the link:';
    STR_ABOUT_INFO_18 = 'Phone and tablet support:';
    STR_ABOUT_INFO_19 =
        'It is possible to use this app on phones and tablets, but this app is designed to be used mainly on TVs. Support for other devices is limited, and because of that, it is not released on the Play Store. Use the link below to download the latest APK and manually install the app on a phone or tablet:';

    STR_CONTROLS_PLAY_0 = 'or in the controls at the bottom of the player';
    STR_CONTROLS_PLAY_1 = "Show the information panel: Press enter or D-pad keys if the chat and the live channel feed aren't showing";
    STR_CONTROLS_PLAY_2 = 'Close the video: Press return twice or the stop media key';
    STR_CONTROLS_PLAY_3 = 'Pause/play a video: Open the information panel and click on the pause icon';
    STR_CONTROLS_PLAY_4 = 'Show preview feed: Up D-pad';
    STR_CONTROLS_PLAY_5 = "Change video quality: Choose the 'Quality' option at the bottom of the player";
    STR_CONTROLS_PLAY_6 = 'Force refresh a video (in case it freezes): Change video quality to the same';
    STR_CONTROLS_PLAY_7 = 'Show or hide the chat: Down D-pad or key 3 ' + STR_CONTROLS_PLAY_0;
    STR_CONTROLS_PLAY_8 = 'Change chat position: Left D-pad, PG up or the rewind keys (VODs and clips only) ' + STR_CONTROLS_PLAY_0;
    STR_CONTROLS_PLAY_9 = 'Change chat size: Right D-pad, PG down ' + STR_CONTROLS_PLAY_0;
    STR_CONTROLS_PLAY_10 = 'Change chat background brightness: Change in the controls at the bottom of the player';
    STR_CONTROLS_PLAY_11 =
        "Force refresh the chat in a live (in case it freezes or doesn't load): Choose the 'Chat force disable' option at the bottom of the player (click twice)";
    STR_CONTROLS_PLAY_12 = "Start a search: Open information panel, navigate using use Directional pad (left/right) to 'Search' and press enter";
    STR_CONTROLS_PLAY_13 =
        'All media keys are supported (play, pause, stop, next track, fast forward etc ...), some are used as shortcuts for audio and video mode changes';
    STR_CONTROLS_PLAY_14 =
        'Chat and video (side by side): Key 2 or the fast forward media key. It also switches between the picture in picture and the 50/50 mode';
    STR_F_DISABLE_CHAT = 'Force disable chat';
    STR_OAUTH_IN =
        'Adding a key allows the app to access chat using your user to send messages and get your emote list (enables you to be gifted subs given in chat), follow/unfollow channels, and access some user content faster.<br><br>Adding a key is not demanding and can be done at any point later.<br><br>In doubt read the contents of this link:<br><br>%x<br><br>For some devices, a mouse is necessary to complete the authorization action as you may need to manually click on a button to confirm certain actions.<br><br>Add a key for';
    STR_USER_CODE = 'Add an authorization key';
    STR_USER_CODE_OK = 'Key added successfully';
    STR_KEY_BAD = 'Key test failed, new one needs to be added';
    STR_OAUTH_WRONG = 'You try to add a key for user';
    STR_OAUTH_WRONG2 = 'but this key is for user';
    STR_FOLLOWING = 'Following';
    STR_FOLLOW = 'Not Following';
    STR_IS_SUB_NOOAUTH = "and you haven't added an authorization key, so the app can't check your sub status.";
    STR_IS_SUB_NOT_SUB = "and you aren't a sub of this channel";
    STR_IS_SUB_IS_SUB = 'You are a sub of this channel, but an unknown issue has prevented this from playing.';
    STR_OAUTH_FAIL = 'Failed authorization check with the provided key, please check and try again';
    STR_OAUTH_FAIL_USER = "The added key doesn't belong to the user";
    STR_NOKEY = 'No user';
    STR_NOKEY_WARN = 'You must set a user to follow or unfollow channels.';
    STR_FOLLOW_ISSUE =
        'Third-party apps can no longer follow or unfollow channels. The button will only appear if you are already following a channel.';
    STR_NOKUSER_WARN = 'You need to set a user to view followed content.';
    STR_RESET = 'Restart the';
    STR_CLIP = 'Clip';
    STR_CHANNEL_CONT = 'Channel content';
    STR_NET_DOWN = 'No network connection. The app requires an internet connection to function.';
    STR_NET_UP = 'Network connection restored';
    STR_FOLLOWERS = 'Followers';
    STR_FOLLOWER = 'Follower';
    STR_CANT_FOLLOW = ", Can't follow or unfollow";
    STR_GAME_CONT = 'Game content';
    STR_YES = 'Yes';
    STR_REMOVE_USER = 'Are you sure you want to remove the user';
    STR_PLACEHOLDER_PRESS_UP = 'Press Up to';
    STR_FOLLOW_GAMES = 'Followed Live Games';
    STR_USER_GAMES_CHANGE = 'Change between';
    STR_GUIDE = 'Hold enter';
    STR_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    STR_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    STR_STARTED = 'Started';
    STR_VIDEOS = 'Videos';
    STR_REPLAY = 'Replay';
    STR_STREAM_END = 'exiting in';
    STR_STREAM_END_EXIT = "Press 'Return' to exit";
    STR_FEATURED = 'Front Page';
    STR_CREATED_AT = 'Created';
    STR_OPEN_BROADCAST = 'Open the VOD';
    STR_OPEN_LAST_BROADCAST = 'Open the Last VOD';
    STR_IS_LIVE = 'Is now live';
    STR_SHOW_ISLIVE_WARNING = "Show 'Streamer is live' warning";
    STR_SHOW_ISLIVE_WARNING_SUMMARY =
        'While watching a clip or VOD, the app can check if the streamer is live. If enabled, a warning will appear. To watch the live stream, use the controls at the bottom of the player.';
    STR_OPEN_CHAT = 'Click to open the chat or wait for the stream to return live.';
    STR_STAY_OPEN = 'Stay on the stream';
    STR_STAY_OPEN_SUMMARY = 'Remain on the stream and the app will check periodically to see if it returns live.';
    STR_STAY_CHECK = 'Check if stream is live in:';
    STR_STAY_CHECKING = 'Checking if is live ...';
    STR_STAY_CHECK_LAST = 'Last result:';
    STR_STAY_IS_OFFLINE = 'The stream was offline';
    STR_NO_BROADCAST = 'No VOD';
    STR_NO_BROADCAST_WARNING = 'There are no VODs for this clip';
    STR_NO_CHAT = 'and because of that no chat';
    STR_IS_NOW = 'is now';
    STR_OPEN_HOST = 'Open the Hosting';
    STR_SETTINGS_PLAYER = 'Player related';
    STR_SETTINGS_BUFFER_SIZE = 'Start buffer size:';
    STR_SETTINGS_BUFFER_SIZE_SHORT_SUMMARY = 'Controls start buffer size';
    STR_SETTINGS_BUFFER_SIZE_SUMMARY =
        'Specifies the amount of data needed to buffer before starting playback. This value is unrelated to the maximum buffer size, which depends on the device’s available RAM. A lower setting will start playback sooner, which is generally recommended. Increasing this value rarely improves performance and may cause delays.';
    STR_SETTINGS_BUFFER_LIVE = 'Lives start buffer';
    STR_SETTINGS_BUFFER_VOD = 'Videos (past broadcasts and highlights) start buffer';
    STR_SETTINGS_BUFFER_CLIP = 'Clips start buffer';
    STR_SETTINGS_LANG = 'Language';
    STR_LOADING_CHAT = 'Chat: Connecting to';
    STR_LOADING_FAIL = 'Connecting timeout, Failed to log ...';
    STR_CHAT_CONNECTED = 'Chat: Connected';
    STR_CHAT_SEND_DELAY = 'Message sent. Due to chat delay settings, it will appear in the chat shortly.';
    STR_CHAT_DELAY = 'Chat: delay';
    STR_VOD_HISTORY_BASE = 'Start playback from the beginning or resume from where you last stopped watching.';
    STR_VOD_HISTORY = STR_VOD_HISTORY_BASE + ' VOD?';
    STR_VOD_HISTORY_FORM_LIVE = STR_VOD_HISTORY_BASE + ' LIVE?';
    STR_FROM = 'From:' + STR_BR;
    STR_FROM_START = STR_FROM + 'Start';
    STR_CHAT_END = 'Chat: The Chat has ended!';
    STR_RECENT = ', Most recent';
    STR_VIWES = ', Most views';
    STR_NOKEY_VIDEO_WARN = 'Add a user to access followed videos.';
    STR_SWITCH_TYPE = 'Switch: Most recent or views';
    STR_ENABLE = 'Enable';
    STR_ENABLED = 'Enabled';
    STR_DISABLE = 'Disable';
    STR_DISABLED = 'Disabled';
    STR_DARK_MODE = 'Dark mode';
    STR_BRIGHT_MODE = 'Bright mode';
    STR_RESTORE_PLAYBACK_WARN = 'The app was closed during playback. Restoring previous session...';
    STR_RESTORE_PLAYBACK = 'Restore Previous Playback';
    STR_RESTORE_PLAYBACK_SUMMARY =
        'The app saves playback progress in case it’s closed unintentionally. Switching apps may lead to system out of memory issues that close the app. When reopened, it will resume the previous playback.';
    STR_CHAT_FONT = 'Chat Font Size';
    STR_VIDEOS_ANIMATION = 'Animated Video Thumbnails';
    STR_VIDEOS_ANIMATION_SUMMARY =
        'When a VOD or highlight is selected, animate the thumbnail if an animated version is available (note: not all videos have one).';
    STR_SIDE_PANEL = 'Side panel: Press left D-pad or return';
    STR_SIZE = 'Size';
    STR_BRIGHTNESS = 'Brightness';
    STR_FORBIDDEN = 'This content is restricted in your region or only accessible via the official Twitch app.';
    STR_JUMPING_STEP = 'Jump step';
    STR_SECOND = 'second';
    STR_SECONDS = 'seconds';
    STR_MINUTE = 'minute';
    STR_MINUTES = 'minutes';
    STR_CLOCK_OFFSET = 'Clock offset';
    STR_CLOCK_OFFSET_SUMMARY = 'Adjust the app’s main clock based on your preferred time offset.';
    STR_CONTENT_LANG = 'Content language';
    STR_CONTENT_LANG_SUMMARY = 'The language of the content on the screen, lives, VODs, clips.';
    STR_APP_LANG = 'Application language';
    STR_APP_LANG_SUMMARY = "The language of the app's text.";
    STR_ENTER_TO_OPEN = 'Press enter to access';
    STR_LANG_ALL = 'All';
    STR_NO_GAME = "Can't get game from this";
    STR_EMPTY = 'Empty';
    STR_JUMP_BUFFER_WARNING = "Isn't possible to jump during buffering";
    STR_CHAT_DISABLE = "Chat is currently disabled. You can enable it with the 'Chat force disable' option at the bottom of the player.";
    STR_CLIP_FAIL = "This clip/video failed to load. Can't replay";
    STR_CHAT_BRIGHTNESS = 'Chat background brightness';
    STR_PLAY_NEXT = 'Play Next';
    STR_PLAY_NEXT_IN = 'Playing next in';
    STR_PLAY_ALL = 'Play All';
    STR_AUTO_PLAY_NEXT = 'Auto play next clip';
    STR_SIDE_PANEL_BACK_MAIN_MENU = 'Back to main menu';
    STR_UP = 'Press up';
    STR_HOLD_UP = 'Hold UP or key 2';
    STR_LIVE_FEED = 'Live Feed';
    STR_VOD_DIALOG = 'VOD start dialog';
    STR_VOD_DIALOG_SUMMARY =
        "Set the default behavior for playing VODs saved in your history. Choosing 'Always from the start' will also apply to VOD previews.";
    STR_VOD_DIALOG_START = 'Always from the start';
    STR_VOD_DIALOG_LAST = 'Always from the last stop';
    STR_VOD_DIALOG_SHOW = 'Always ask';
    STR_END_DIALOG_OPT = 'Player end dialog options';
    STR_END_DIALOG_SETTINGS = 'Player end dialog timeout';
    STR_END_DIALOG_SETTINGS_SUMMARY =
        'When a live stream, VOD, or clip ends, a dialog appears with options for what to do next. Set the time (in seconds) for the default option to take action.';
    //TODO improve more after this
    STR_END_DIALOG_DISABLE = 'Disable the timer';
    STR_CHAT_SIZE = 'Chat size';
    STR_CHAT_POS = 'Chat position';
    STR_CHAT_VIDEO_MODE = 'Video mode';
    STR_CHAT_SIDE_FULL = 'Full screen';
    STR_CHAT_PP_SIDE_FULL = 'Big plus small screen';
    STR_CHAT_SIDE = 'Side by side, video and chat';
    STR_CHAT_5050 = '50/50 and chats';
    STR_SPEED = 'Speed';
    STR_QUALITY = 'Quality';
    STR_NORMAL = 'Normal';
    STR_AUTO = 'Auto';
    STR_VERY_LOW = 'Very low';
    STR_LOW = 'Low';
    STR_HIGH = 'High';
    STR_VERY_HIGH = 'Very high';
    STR_THUMB_RESOLUTION = 'Thumbnail quality';
    STR_THUMB_RESOLUTION_SUMMARY =
        "Default thumbnail resolution for lives, videos and games (can't be applied for clips). A lower value will help the app load faster, but the thumbnail may look blurry.";
    STR_PAYPAL_SUMMARY = 'Paypal donations, use the link or QR code:';
    STR_BITCOIN_SUMMARY = 'Bitcoin donations, use the wallet address or read the QR Code:';
    STR_PLAYER_PROBLEM_2 = 'Connection failed, unable to load stream info';
    STR_PLAYER_RESYNC = 'Player restart';
    STR_PLAYER_MULTI_ALL = 'All';
    STR_QUALITY_PP = ['Small', 'Big', STR_PLAYER_MULTI_ALL];
    STR_QUALITY_MULTI = [STR_PLAYER_MULTI_ALL, 'Top left', 'Top right', 'Bottom left', 'Bottom right'];
    STR_QUALITY_MULTI_BIG = [STR_PLAYER_MULTI_ALL, 'Top', 'Bottom left', 'Bottom center', 'Bottom right'];
    STR_PLAYER_BITRATE_UNLIMITED = 'Unlimited';
    STR_PLAYER_BITRATE = 'Auto quality maximum allowed Resolution/Bitrate';
    STR_PLAYER_BITRATE_SHORT_SUMMARY = 'Allows to set max Resolution/Bitrate used by Auto quality playback';
    STR_PLAYER_BITRATE_SUMMARY =
        "This is used to prevent lag on low-end devices when playing multiple videos at the same time (most devices will lag by skipping frames in that situation, as they are only made to play a single video). Also helps limit the internet bandwidth use in case you need a limit that also sets the 'Default player quality' to auto quality. The recommended resolution/bitrate for all small players is 720p/3 Mbps and unlimited for main or big players for most low-end devices.";
    STR_PLAYER_BITRATE_SUMMARY_ETC =
        'Different values here for main and small player resolution and or bitrate may cause a short buffering/loading when changing it with the main player in picture-in-picture mode (pressing down will change the players). To prevent this, set both values to the same at the cost of possible lag. The best indication of too high of a bitrate is a constant accumulation of skipped frames or a constant buffering of the stream.';
    STR_PLAYER_MAIN = 'Main player, for the big player of the picture in picture or the Top player 50/50';
    STR_PLAYER_RES_SMALL = 'Small players, for the small player of the picture in picture mode and all multistream players';
    STR_PLAYER_BITRATE_MAIN = 'Bitrate - ' + STR_PLAYER_MAIN;
    STR_PLAYER_BITRATE_SMALL = 'Bitrate - ' + STR_PLAYER_RES_SMALL;
    STR_PLAYER_RES_MAIN = 'Resolution - ' + STR_PLAYER_MAIN;
    STR_PLAYER_RES_SMALL = 'Resolution - ' + STR_PLAYER_RES_SMALL;
    STR_BLOCK_RES = 'Blocked resolutions';
    STR_BLOCK_RES_SHORT_SUMMARY = 'Allows to block one or more resolutions from ever being used';
    STR_BLOCK_RES_SUMMARY =
        "When using auto quality, it's possible to block one or more resolutions from ever being used. This is useful for devices that lag playing at a particular resolution. As clips can't be played in auto mode, this will also block the automatic part of this resolution in a clip.";
    STR_BLOCK_RES_SUMMARY_EXTRA =
        'The user can overwrite the selection manually during the playback.<br><br>XX means that all resolutions starting with same value before the XX will be denied from being used if that resolution is marked as blocked.';
    STR_BLOCKED = 'Blocked';
    STR_BLOCKED_NOT = 'Not blocked';
    STR_AUDIO_SOURCE = 'Audio source';
    STR_VOLUME_CONTROLS = 'Audio & Volume controls';
    STR_AUDIO_ALL = 'Audio enable all';
    STR_AUDIO_ALL_ENA = 'All audio sources enabled';
    STR_AUDIO_ALL_100 = 'Volume all to 100%';
    STR_AUDIO_ALL_100_SET = 'All player volume set to 100%';
    STR_VOLUME = 'Volume -';
    STR_AUDIO = 'Audio -';
    STR_DEF_QUALITY = 'Default player quality';
    STR_DEF_QUALITY_SUMMARY =
        "This option will override all others when playing a single video. In multi-player modes, the playback needs to use auto quality. The reason for this can be found under the settings option '" +
        STR_PLAYER_BITRATE +
        "'.";
    STR_PICTURE_PICTURE = 'Picture in picture, 50/50 or multistream (for lives only):';
    STR_PICTURE_CONTROLS1 =
        'Enable picture in picture mode: Press up when playing a video. To show the preview feed, choose a stream, then hold enter or press key 1 to start';
    STR_PICTURE_CONTROLS2 =
        'Change video content: If in multiplayer mode, always single-click from the player preview. If on picture in picture or 50/50, a single click updates the big or top video, and holding enter or pressing key 1 updates the small or bottom video';
    STR_PICTURE_CONTROLS4 = 'Change content between videos (only picture in picture): Down D-pad. Big becomes small and vice versa';
    STR_PICTURE_CONTROLS5 = 'Change small video position (only picture in picture): Left D-pad';
    STR_PICTURE_CONTROLS6 = 'Change small video size (only picture in picture): Right D-pad';
    STR_PICTURE_CONTROLS7 =
        "Change audio source: Choose the 'Audio source' option at the bottom of the player. If in 50/50 or multistream, use left/right D-pad. If in picture in picture, use previous/next track media keys";
    STR_PICTURE_CONTROLS3 = 'Change audio source for all videos: Hold down D-pad.';
    STR_PICTURE_CONTROLS8 =
        "Player restart: Choose the 'Player restart' option at the bottom of the player. This will only restart the players, which is useful fpr syncing the player and the chat. This will not sync one player's content with another's";
    STR_PICTURE_CONTROLS9 =
        "Manually sync players: The workaround is to choose the 'Speed' option at the bottom of the player to slow down the stream that is in front or vice versa. Only works for picture in picture mode";
    STR_PICTURE_CONTROLS10 = "Picture in picture video quality: Check the in-app '" + STR_PLAYER_BITRATE + "' settings";
    STR_PICTURE_CONTROLS11 =
        'Close small or bottom video (only picture in picture): Pressing return twice will exit picture in picture or 50/50 mode';
    STR_PICTURE_CONTROLS12 =
        "Enable 50/50 mode (two streams and two chats): If picture in picture is enabled, press key 2, the fast forward media key or use the 'Video mode' option at the bottom of the player, or if already in its 'Side by side' mode, hold enter over a tile in the preview feed";
    STR_PICTURE_CONTROLS13 = 'Enable multistream: Use the controls at the bottom of the player or the rewind media key';
    STR_PLAYER_INFO_VISIBILITY_ARRAY = ['When player info is visible', 'Always visible', 'Never visible'];
    STR_SINGLE_EXIT = 'Single return press';
    STR_SINGLE_EXIT_SUMMARY = 'Exit the player, picture in picture, 50/50 or multistream mode with a single key return click.';
    STR_NOTIFICATION_OPT = 'Notification options';
    STR_NOW_LIVE_SHOW = "Show 'Streamer is live' notification for followed channels";
    STR_TITLE_CHANGE_SHOW = "Show 'Streamer changed title' notification for followed channels";
    STR_GAME_CHANGE_SHOW = "Show 'Streamer changed game' notification for followed channels";
    STR_NOW_LIVE_GAME_SHOW = "Show 'Game is live' notification for followed games";
    STR_NOW_BACKGROUND = 'Notification over other apps when the app is running in the background';
    STR_NOW_BACKGROUND_SUMMARY =
        "If you disabled notifications for this app in the system settings, this feature won't work. If the app notifications are already running and you exit the app, the notification will show over other apps, even if this is disabled.";
    STR_NOTIFICATION_REPEAT = 'Number of times an individual notification in shown';
    STR_NOTIFICATION_REPEAT_SUMMARY =
        "The individual notification timeout is around 3 seconds, and can't be changed, because this timeout is controlled by the system, but you can set the number of times the same notification shows with this option.";
    STR_NOTIFICATION_SINCE = "Prevent showing 'Streamer is live' notification for streams that are live for over";
    STR_NOTIFICATION_SINCE_SUMMARY =
        'This is useful to prevent the app showing a long list of notifications when the app is not used for some time, for example when you turn off the device, or for when the screen is off (the app will not show notification in case the device is on but the screen is off).';
    STR_GLOBAL_FONT = 'Global app font size offset';
    STR_GLOBAL_FONT_SUMMARY =
        'This will change the size of all text and most icons in the app (minus chat font size, because it has its own control), too small value may not be visible too big value will overflow the text box holder, that is way this value is limited, changing this will refresh all screens.';
    STR_MAIN_MENU = 'Main Menu';
    STR_USER_MENU = 'User Menu';
    STR_CH_IS_OFFLINE = 'Is offline';
    STR_ROUND_IMAGES = 'Rounded channel images';
    STR_ROUND_IMAGES_SUMMARY = 'As most channel images are squares, some images may not look great.';
    STR_SCREEN_COUNTER = 'Hide Position/Total counter';
    STR_SCREEN_COUNTER_SUMMARY =
        'There is a position counter that informs the current position, and the total loaded content on screens that have playable content. As you scroll, more content will load, and the total gets updated.';
    STR_SWITCH_POS = 'Switch: Starting Position offset';
    STR_SWITCH_POS_SUMMARY =
        'Instead of starting at the first possible video, start a a lower position on the list, so there is no need to go lower down to find an older video.';
    STR_USER_OPTION = 'Choose an option for user';
    STR_MAIN_USER = 'Main user';
    STR_USER_TOP_LABEL = 'Click on a user to see options';
    STR_USER_EXTRAS = 'User: Switch, add, key';
    STR_LOW_LATENCY = 'Low latency';
    STR_LOW_LATENCY_SUMMARY =
        'If you start getting buffer issue, disable ' +
        STR_LOW_LATENCY +
        '<br>Use ' +
        STR_SETTINGS_BUFFER_LIVE +
        ' equal or below 1 for this to have effect';
    STR_GAME_SORT = 'Games Preview sorting';
    STR_LIVE_FEED_SORT = 'Side panel or player preview sorting';
    STR_LIVE_FEED_SORT_SUMMARY =
        "Sorts side panel live feed and player preview. On the preview, this only applies to the user's live and front page (all non-history are view based, history is last watched first, and VOD is the most recent).";
    STR_A_Z = 'Alphabetical A - Z';
    STR_Z_A = 'Alphabetical Z - A';
    STR_APP_ANIMATIONS = 'Enable app animations';
    STR_APP_ANIMATIONS_SUMMARY = 'Enables side panel, scroll and related animations.';
    STR_UI_SETTINGS = 'Customize interface, color style, animations and related';
    STR_GENERAL_CUSTOM = 'Customize content, sorting, auto refresh, timeouts and related';
    STR_RUNNINGTIME = 'App running for:';
    STR_410_ERROR = 'Unable to get video link';
    STR_PRESS_ENTER_TO_CHANGE = 'Press enter to change to -';
    STR_CLICK_UNFOLLOW = '(Press enter to unfollow)';
    STR_CLICK_FOLLOW = '(Press enter to follow)';
    STR_TODAY = 'Today';
    STR_DROOPED_FRAMES = 'Skipped Frames:';
    STR_BUFFER_HEALT = 'Buffer Size (Sec):';
    STR_NET_ACT = 'Net Activity (Mb):';
    STR_NET_SPEED = 'Net Speed (Mb):';
    STR_LATENCY_TO_BROADCASTER = 'Latency To Broadcaster';
    STR_LATENCY = 'Latency To Broadcaster (Sec):';
    STR_CHAT_DELAY_LATENCY_TO_BROADCASTER = 'Based on ' + STR_LATENCY_TO_BROADCASTER;
    STR_PING = 'Ping to Twitch (Ms):';
    STR_WARNINGS = 'Warnings';
    STR_WELCOME = 'Welcome to';
    STR_WELCOME_SUMMARY =
        'This application has a lot of features and was designed to give the user full control of it, because of that it has many options, controls and customizations. Check the app settings and controls to understasnd how to use it. In doubt, check the Play Store demonstration video, if still unsure, use the contact info.';
    STR_WARNING_PHONE = 'Cellphones warning';
    STR_WARNING_PHONE_SUMMARY =
        "This app is designed to be used mainly on TVs, the support for other devices is limited and may never receive a better support. If you don't have a keyboard or a D-pad + enter and return controller (ESC works as a return on a computer), use the virtual on-screen keys to navigate (only visible on phone/tablet devices). In settings you can change the position and the opacity of the virtual D-pad, click anywhere on the screen to show the virtual D-pad. When it's hidden, it doesn't work.";
    STR_DPAD_POSTION = 'D-pad screen position';
    STR_DPAD_OPACITY = 'D-pad opacity';
    STR_DPAD_OPT = 'D-pad options';

    STR_MAX_RES = 'Max resolution:';
    STR_MAX_BIT = 'Max bitrate:';
    STR_MAX_LEVEL = 'Max level:';
    STR_MAX_FPS = 'Max fps per resolution:';
    STR_MAX_INSTANCES = 'Max instances:';
    STR_UNKNOWN = 'Unknown';
    STR_USER_LIVE = 'User live side panel: Left D-pad from the side panel or key 3 from anywhere';
    STR_PP_WORKAROUND = 'Multiplayer, PP and preview mode workaround';
    STR_PP_WORKAROUND_SUMMARY =
        "For some devices, it is necessary to enable this to have multiplayer mode working properly. The issue is usually that one of the two players becomes a black screen. Don't enable it if you don't have issues, as it will cause lower image quality and poor performance.";
    STR_HISTORY = 'History';
    STR_WATCHED = 'Watched on';
    STR_UNTIL = 'until';
    STR_SORTING = 'Sorting';
    STR_DELETE_HISTORY = 'Delete this history';
    STR_DELETE_UNREACHABLE = 'Automatic delete unreachable content';
    STR_DELETE_UNREACHABLE_SUMMARY =
        'If this is set to YES, the app will automatically remove VODs and clips that are unreachable (Have been deleted by the streamer/creator) from the history';
    STR_NAME_A_Z = 'Name A - Z';
    STR_NAME_Z_A = 'Name Z - A';
    STR_GAME_A_Z = 'Game A - Z';
    STR_GAME_Z_A = 'Game Z - A';
    STR_VIWES_MOST = 'Most views';
    STR_VIWES_LOWEST = 'Least views';
    STR_CHANNELS_MOST = 'Highest channel quantity';
    STR_CHANNELS_LOWEST = 'Lowest channel quantity';
    STR_NEWEST = 'Most recently watched';
    STR_OLDEST = 'Oldest watched';
    STR_PRESS_ENTER_D = 'Press enter to delete';
    STR_LIVE_VOD = 'This live is now a VOD<br>opening the VOD from where you last stopped watching the live:<br>';
    STR_BACKUP =
        'Allow the app to make and restore backups?<br>(Users and their history will be backed up)' +
        '<br><br>' +
        'If you click Yes, the app will save backups for future use, and restore a saved backup if app data is empty.' +
        'Is necessary to give the app storage permission for this, so give before click yes.' +
        '<br><br>' +
        "If you don't give storage permission, no backups will be ever made." +
        '<br><br>' +
        'The Backup folder path is Main_Storage/data/com.fgl27.twitch/Backup';
    STR_DELETE_SURE = 'Are you sure you want to delete all';
    STR_CREATED_NEWEST = 'Created / Uptime newest';
    STR_CREATED_OLDEST = 'Created / Uptime Oldest';
    STR_THUMB_OPTIONS = 'Thumbnail Options';
    STR_HISTORY_LIVE_DIS = 'Enable live history';
    STR_HISTORY_VOD_DIS = 'Enable VOD history';
    STR_HISTORY_CLIP_DIS = 'Enable clip history';
    STR_OPEN_GAME = 'Open the game';
    STR_OPEN_CHANNEL = 'Open the channel';
    STR_THUMB_OPTIONS_KEY = 'Press enter above an action (to open or apply it), return to exit without applying';
    STR_DELETE_FROM_HISTORY = 'Delete this from history';
    STR_CHECK_FOLLOW = 'Checking follow status ...';
    STR_REFRESH_DELETE = 'Refresh the screen after deleting to see the change.';
    STR_THUMB_OPTIONS_TOP = 'Hold left for thumbnail options';
    STR_REPLACE_MULTI = 'Choose with to replace by the above?';
    STR_REPLACE_MULTI_ENTER = 'Press enter to replace or return to exit without.';
    STR_ALREDY_PLAYING = 'Already playing this';
    STR_STREAM_ERROR = 'Unable to open preview';
    STR_PP_MODO = 'Picture in picture mode';
    STR_4_WAY_MULTI_INSTANCES = "Your device only supports %x codec instances (player playing) at the same time, can't use";
    STR_MULTI_EMPTY = 'Ended and/or empty';
    STR_4_WAY_MULTI = '4-way multistream';
    STR_CONTROLS_MULTI_0 = 'Multistream help:';
    STR_CONTROLS_MULTI_1 =
        "If you are having lag issues after enabling multistream, try lowering the value of 'Small player bitrate' in settings, accumulation of skipped frames or constant buffering is an indication of too high bitrate or too slow internet";
    STR_CONTROLS_MULTI_2 = 'Add streams: open preview feed key up and click on a live';
    STR_CONTROLS_MULTI_3 = 'Replace streams: after multistream is full, choose one from preview feed and choose one to replace from the dialog';
    STR_CONTROLS_MULTI_4 = 'Change audio source: D-pad right or left or media keys next previews track, hold down to audio source all videos';
    STR_CONTROLS_MULTI_5 = 'Exit multistream: Press return twice or exit through the option at the bottom of the player.';
    STR_CONTROLS_MULTI_6 = 'To close this, open 4 lives';
    STR_PICTURE_LIVE_FEED = 'Picture in picture: Hold enter or press key 1, after use D-Pad left to move, right to resize or down to change videos';
    STR_MULTI_TITLE = ', Click on a thumbnail to open or replace a stream, use D-pad left/right to change audio source';
    STR_FEED_END_DIALOG = ', Press return to go back to top menu';
    STR_BACK_USER_GAMES = 'Press return to go back to';
    STR_SHOW_LIVE_PLAYER = 'Show preview on the live screens';
    STR_SHOW_VOD_PLAYER_WARNING = 'Starting playback from where it last stopped:';
    STR_SHOW_VOD_PLAYER = 'Show preview on the VOD screens';
    STR_SHOW_CLIP_PLAYER = 'Show preview on the clip screens';
    STR_PREVIEW_CLIP_NEXT = 'When a clip preview ends, automatically switch to the next available clip.';
    STR_SHOW_SIDE_PLAYER = 'Show preview on the side panel';
    STR_SHOW_FEED_PLAYER = 'Show preview on the player preview thumbnails';
    STR_SHOW_FEED_PLAYER_SUMMARY = "If you don't want to, or your device lags when more than one player is active, set this to NO.";
    STR_DISABLED_FEED_PLAYER_MULTI = 'Disable preview when multistream is enabled';
    STR_DISABLED_FEED_PLAYER_MULTI_SUMMARY =
        'For performance reasons, some devices may lag with multiple players. If yours is fine for multistream, but lags when the preview player and a multistream are active, set this option to NO.';
    STR_PREVIEW_ERROR_LOAD = 'Preview failed to load:';
    STR_PREVIEW_ERROR_LINK = 'unreachable';
    STR_PREVIEW_VOD_DELETED = ', this VOD may have been deleted';
    STR_PREVIEW_END = 'Preview video has ended';
    STR_PLAYER_LAG_ERRO = 'Player unable to play due to a network connection issue';
    STR_PLAYER_ERROR = 'Player unable to play due to player error';
    STR_PLAYER_ERROR_MULTI = ', try to lower small player bitrate value in settings';
    STR_PREVIEW_SIZE = 'Player preview size';
    STR_PREVIEW_SIZE_SUMMARY =
        'Set the size of the preview player the small preview player that show when pressing up when a Live, VOD or clip is open.';
    STR_PREVIEW_SIZE_ARRAY = ['Small', 'Medium', 'Large', 'Extra large'];
    STR_PREVIEW_SIZE_SCREEN = 'Screen preview size';
    STR_PREVIEW_SIZE_SCREEN_SUMMARY = 'Set the size of the preview player that show above the main app screens.';
    STR_PREVIEW_VOLUME_SCREEN = 'Screen preview volume';
    STR_PREVIEW_VOLUME_SCREEN_SUMMARY = 'Set the volume of the preview player that show above the main app screens and side panel.';
    STR_PREVIEW_SIZE_SCREEN_ARRAY = ['Thumbnail size', 'Larger'];
    STR_SIDE_PANEL_PLAYER_DELAY = 'Preview delay';
    STR_SIDE_PANEL_PLAYER_DELAY_SUMMARY =
        'Set the delay time that the preview will take to start loading after a thumbnail is selected. This helps with slow devices which lag when scrolling.';
    STR_PREVIEW_VOLUME = 'Player Preview volume';
    STR_PREVIEW_VOLUME_SUMMARY = 'Set preview player volume, the small preview player that show when pressing up when a Live, VOD or clip is open.';
    STR_PREVIEW_OTHERS_VOLUME = 'Main player volume (When preview is showing)';
    STR_PREVIEW_OTHERS_VOLUME_SUMMARY =
        'The main player (all picture in picture players, multistream players) volume can be lowered when the preview player is showing.';
    STR_SIDE_PANEL_PLAYER = 'Preview thumbnail player settings';
    STR_START_AT_USER = 'Always start the app in the user screen';
    STR_START_AT_USER_SUMMARY = "This option disables the 'Restore playback' option, but allows you to choose the user upon opening the app.";
    STR_LAST_REFRESH = 'Last refreshed:';
    STR_PP_VOD_ERROR = 'Exit picture in picture or multistream to open this VOD';
    STR_SETTINGS_ACCESSIBILITY = "Show 'an accessibility service is running' warning";
    STR_SETTINGS_ACCESSIBILITY_SUMMARY =
        "If the device has an accessibility service enabled, the app will show a warning. It's a known android issue that accessibility service can lag some devices and cause freezes or lags on this app.";
    STR_ACCESSIBILITY_WARN = 'Accessibility service(s) detected';
    STR_ACCESSIBILITY_WARN_EXTRA = 'Read more on this link:';
    STR_ACCESSIBILITY_WARN_EXTRA2 =
        'If you have freezes or lag related issues, close this app and disable all accessibility services, after that, all issues will be gone.<br>To not show this warning ever again, disable it in settings.';
    STR_AUTO_REFRESH = 'Auto refresh timeout';
    STR_AUTO_REFRESH_SUMMARY = 'When this is enabled, the app will auto-refresh the content in the background.';
    STR_AUTO_REFRESH_BACKGROUND = 'Auto refresh in the background';
    STR_AUTO_REFRESH_BACKGROUND_SUMMARY =
        "When 'Auto refresh timeout' is set and this is enabled, the auto refresh will happen in the background (but with the app visible, android doesn't allow to run unrestrictedly in the background in order to avoid lagging other apps). When the screen is not visible or when you go back to a screen that the refresh didn't run before, be careful, because if the app has too many screens when this option is enabled, the auto refresh may cause random lag on some low-end devices.";
    STR_MAIN_WINDOW = 'Main video';
    STR_MULTI_MAIN_WINDOW = 'Multistream main video';
    STR_MAIN_MULTI_BIG =
        STR_MULTI_MAIN_WINDOW + ' bigger and chat: Press the down key and after that use the left/right keys to change the big video';
    STR_SOURCE_CHECK = 'Automatically change player quality from Source to Auto when the player lags';
    STR_SOURCE_CHECK_SUMMARY =
        'When enabled, and not using auto quality, the player will switch to auto quality and warn about it if the player is lagging. A Player lag is when the player is unable to play for a few seconds (the algorithm is more complex than just time), if you play something else it will go back to the original quality.';
    STR_PLAYER_LAG = "Player is lagging, quality changed to 'Auto mode'";
    STR_PLAYER_SOURCE = 'Player is lagging, quality was lowered';
    STR_TOO_ERRORS = 'or too many errors';
    STR_STREAM_ERROR_SMALL = 'Preview, stream ended' + STR_TOO_ERRORS;
    STR_CONTROLS_MEDIA_FF = 'Forward or rewind (only for VODs and clips): Use the left/right D-pad or the fast forward/rewind media keys';
    STR_VOD_MUTED = 'A portion of this is muted as it contains copyrighted content, indicated by the darker colored portions on the play bar';
    STR_GIFT_SUB = 'has gifted you a sub!';
    STR_ANONYMOUS = 'Anonymous';
    STR_CHAT_BANNED = 'You are permanently banned from talking in';
    STR_CHAT_WRITE = 'Write to chat';
    STR_CHAT_EXTRA = 'Chat extra settings';
    STR_PLACEHOLDER_CHAT =
        'When this is selected, press enter to show onscreen keyboard. If you have a physical keyboard connected, press return or esc to hide the onscreen keyboard';
    STR_CHAT_ROOMSTATE = 'Chat ROOMSTATE:';
    STR_CHAT_NO_RESTRICTIONS = 'No restrictions';
    STR_OPTIONS = 'Options';
    STR_CHAT_DELL_ALL = 'Delete all';
    STR_CHAT_UNICODE_EMOJI = 'Unicode Emoji';
    STR_CHAT_TW_EMOTES = 'Twitch emotes';
    STR_CHAT_BTTV_GLOBAL = 'BTTV global';
    STR_CHAT_BTTV_STREAM = 'BTTV streamer';
    STR_CHAT_FFZ_GLOBAL = 'FFZ global';
    STR_CHAT_FFZ_STREAM = 'FFZ streamer';
    STR_CHAT_SEVENTV_GLOBAL = '7TV global';
    STR_CHAT_SEVENTV_STREAM = '7TV streamer';
    STR_CHAT_AT_STREAM = '@streamer';
    STR_CHAT_RESULT = 'In Chat expected result:';
    STR_CHAT_SEND = 'Send';
    STR_CHAT_EMOTE_EMPTY = 'This emote list is empty';
    STR_CHAT_FOLLOWER_ONLY = 'Chat is in Followers-only mode, and you are not a follower of';
    STR_CHAT_FOLLOWER_ONLY_USER_TIME = 'and you have only been following for';
    STR_CHAT_EMOTE_ONLY = 'Twitch Emote-only mode';
    STR_CHAT_CHOOSE = 'Choose which chat to write to or press return to close this';
    STR_CHAT_OPTIONS_TITLE = 'Write to chat options';
    STR_CHAT_OPTIONS_KEYBOARD = 'Software Keyboard auto hide';
    STR_CHAT_OPTIONS_KEYBOARD_SUMMARY =
        'Allows to control the behavior of the on-screen software keyboard. If you have a physical keyboard connected, use it, if not, set to never';
    STR_CHAT_OPTIONS_KEYBOARD_1 = 'Never';
    STR_CHAT_OPTIONS_KEYBOARD_2 = 'If Keyboard detected';
    STR_CHAT_OPTIONS_KEYBOARD_3 = 'Always';
    STR_CHAT_OPTIONS_EMOTE_SORT = 'Emotes sorting';
    STR_CHAT_OPTIONS_EMOTE_SORT_SUMMARY = 'If this is disabled, the lists of emotes will be shown in the order, provided by the server.';
    STR_CHAT_OPTIONS_FORCE_SHOW = 'Force show chat';
    STR_CHAT_OPTIONS_FORCE_SHOW_SUMMARY = 'If you want to see the chat when write to chat is used, enable this';
    STR_NOKEY_CHAT_WARN = 'Add a user authorization key to be able to log and write to chat';
    STR_CHAT_NOT_READY = 'Chat not ready to send! Try again is a second or two.';
    STR_CHAT_REDEEMED_MESSAGE_HIGH = 'Redeemed highlight My Message';
    STR_CHAT_REDEEMED_MESSAGE_SUB = 'Redeemed send a message in sub-only mode';
    STR_CHAT_OPTIONS = 'Chat options';
    STR_CHAT_HIGHLIGHT_STREAMER_MSG = 'Highlight messages from the streamer (Dark pink background)';
    STR_CHAT_HIGHLIGHT_MOD_MSG = 'Highlight messages from moderators (Dark cyan background)';
    STR_CHAT_HIGHLIGHT_REDEEMED = 'Highlight reward messages (Purple background message only)';
    STR_CHAT_HIGHLIGHT_STREAMER = "Highlight @streamer messages (Dark red background, the '@' is blue)";
    STR_CHAT_HIGHLIGHT_USER = "Highlight your @username messages (Dark Green background, the '@' is blue)";
    STR_CHAT_HIGHLIGHT_USER_SEND = 'Highlight your sent messages (Dark Green background)';
    STR_CHAT_SHOW_SUB = 'Show sub messages in chat (Dark orange background)';
    STR_CHAT_HIGHLIGHT_BIT = 'Highlight bits messages (Dark Yellow background)';
    STR_CHAT_HIGHLIGHT_ACTIONS = 'Show Action messages (usually from stream bots)';
    STR_CHAT_HIGHLIGHT_ACTIONS_SUMMARY =
        "These messages are usually equal to sub messages, but sent via a stream bot, so if you have 'Show sub ...' enabled, it's redundant.";
    STR_CHAT_INDIVIDUAL_BACKGROUND = 'Background color difference between individual messages';
    STR_CHAT_INDIVIDUAL_BACKGROUND_SUMMARY =
        "Modes are 'disable', 'enable' (auto mode), Bright or Darker. In auto mode, if the chat is above the stream, the odd message will have a darker background accent color from the even. If the chat is not above (side by side for example), the color will be bright.";
    STR_CHAT_INDIVIDUAL_LINE = 'Insert a line to separate individual chat messages';
    STR_CHAT_LINE_ANIMATION = 'Animated scrolling when adding a new chat message';
    STR_CHAT_LOGGING = 'Logging in the chat with the current user';
    STR_CHAT_LOGGING_SUMMARY =
        "The app will always log to chat using the current user when an authorization key is provided, unless chat is disabled within the controls at the bottom of the player, but if this option if set to NO, it will prevent logging using current username, and will instead log as anonymous, even with a provided authorization key. This doesn't prevent from sending chat messages for this user, if a key was added, but does prevent from knowing if you are banned in the chat and prevents from seeing the chat's ROOMSTATE.";
    STR_CHAT_BOTS = 'Block bots and bot commands (!command) from show in chat';
    STR_CHAT_TIMESTAMP = 'Show message timestamp';
    STR_CHAT_NICK_COLOR = 'Readable nick colors';
    STR_CHAT_NICK_COLOR_SUMMARY =
        "Instead of using the default nick color that sometimes can't be readable on a dark background, use a custom easily visible color.";
    STR_CHAT_CLEAR_MSG = 'Clear chat, delete user messages';
    STR_CHAT_BADGES_OPTIONS = 'Chat user badges options';
    STR_CHAT_SHOW_BADGES = 'Show user badges (excluding the ones below)';
    STR_CHAT_SHOW_BADGES_MOD = 'Show Moderator badges';
    STR_CHAT_SHOW_BADGES_VIP = 'Show VIP badges';
    STR_CHAT_MESSAGE_DELETED = 'This single user message was requested to be deleted';
    STR_CHAT_MESSAGE_DELETED_ALL = 'All messages from this user were requested to be deleted';
    STR_CHAT_MESSAGE_DELETED_TIMEOUT = ", they've been timed out for";
    STR_CHAT_CLEAR_MSG_SUMMARY =
        "Delete chat messages from a specific user (typically after they've received a timeout or ban). Deleted messages will always have a blue background, the message will be deleted if this is set to yes, if not, only the background color will change.";
    STR_OPEN_HOST_SETTINGS = 'Always open the hosted live at the end of the stream if available';
    STR_ALWAYS_STAY = 'Always stay with the player opened after a live ends';
    STR_PING_WARNING = "Show 'Ping to Twitch fail' warning";
    STR_PING_WARNING_SUMMARY =
        'The app constantly checks the connection with Twitch via a ping. If it fails too many times, a warning will show. If you believe this warning is showing unintentionally, set this option to NO.';
    STR_KEY_UP_TIMEOUT = 'Key hold timeout (in milliseconds)';
    STR_KEY_UP_TIMEOUT_SUMMARY =
        'How long you need to hold a key for until a hold action happens. Actions such as refresh the screen, show thumbnails options etc.';
    STR_CURRENT_THUMB_STYLE = 'Current focus style';
    STR_NEW_THUMB_STYLE = 'New focus style';
    STR_COLOR_STYLE_TEXT = "Press up/down to select an option, press return to exit this, press enter on 'Apply changes' to confirm before exiting.";
    STR_SHADOWS = 'Shadows';
    STR_SHADOWS_NONE = 'None';
    STR_SHADOWS_WHITE = 'White';
    STR_SHADOWS_GRAY = 'Gray';
    STR_SHADOWS_BLACK = 'Black';
    STR_COLORS = 'Colors';
    STR_RESULT = 'Result';
    STR_APPLY = 'Apply changes';
    STR_COLOR_TYPE = 'Color type';
    STR_STYLES = 'Styles';
    STR_ENTER = 'Press enter';
    STR_COLOR_ARRAY = 'Background,Text,Border,Watched progress bar';
    STR_STYLES_ARRAY = 'Default,Custom,White,Grey,Red,Orange,Yellow,Green,Blue,Purple,Pink';
    STR_ENTER_RGB = STR_ENTER + ' to accept RGB change';
    STR_THUMB_STYLE = 'Selected thumbnail style';
    STR_OPEN_EXTERNAL_PLAYER = 'Open in an external player';
    STR_CHAT_SIDE_ARRAY = ['Left', 'Right'];
    STR_CHAT_BASE_ARRAY = ['Bottom right', 'Center right', 'Top right', 'Center top', 'Top left', 'Center left', 'Bottom left', 'Center bottom'];
    STR_CHAT_100_ARRAY = ['Right', 'Center', 'Left'];
    STR_NOTIFICATION_POS = 'Notification position on the screen';
    STR_NOTIFICATION_POS_ARRAY = ['Top right', 'Top center', 'Top left', 'Bottom left', 'Bottom center', 'Bottom right'];
    STR_LOWLATENCY_ARRAY = [STR_DISABLE, 'Normal mode, may cause re-buffers', 'Lowest mode, may cause even more re-buffers'];
    STR_LOWLATENCY_ENABLE_ARRAY = [STR_LOW_LATENCY + ' - ' + STR_DISABLED, STR_LOW_LATENCY + ' - Normal mode', STR_LOW_LATENCY + ' - Lowest mode'];
    STR_VOD_SEEK = 'VOD fast backward/forward controls';
    STR_VOD_SEEK_SUMMARY =
        'Controls how fast the backwards/forward steps will work. When clicking and holding left/right, the step time will increase. After the increase timeout has passed, it will increase up to the maximum step time. Then, after releasing the key, and not clicking for one second, the step time will reset back to the minimum step time.<br><br>Pressing up will overwrite the mim/max value, allowing you to go through all the possible steps and lock the value until the progress bar is dismissed.<br><br>Doing single-clicks without holding the key will not increase the time.<br><br>These options only work with VODs. For clips, the step is always 1 second.';
    STR_VOD_SEEK_MIN = 'Minimum (starting) step time';
    STR_VOD_SEEK_MAX = 'Maximum step time';
    STR_VOD_SEEK_TIME = 'Increase timeout after holding for';
    STR_UP_LOCKED = 'press up to lock the step value';
    STR_LOCKED = 'locked press up to change';
    STR_IN_CHAT = 'In chat';
    STR_SHOW_IN_CHAT = 'Show total logged in users on top of the chat or viewers';
    STR_SHOW_IN_CHAT_SUMMARY =
        'This is very helpful to know, for example if the offline chat has any user to talk to, also lets the user know the difference from total viewers VS total chat users.';
    STR_SHOW_IN_CHAT_VIEWERS = 'Show viewers';
    STR_SHOW_IN_CHAT_CHATTERS = 'Show chatters';
    STR_PLAYED = 'Played';
    STR_CHAPTERS = 'Chapters';
    STR_FROM_SIMPLE = 'from';
    STR_HIDE_MAIN_CLOCK = 'Hide main screen clock';
    STR_HIDE_PLAYER_CLOCK = 'Hide player clock';
    STR_HIDE_MAIN_SCREEN_TITLE = 'Hide main screen title';
    STR_HIDE_MAIN_SCREEN_TITLE_SUMMARY = 'The center title, lives, clips, settings etc ...';
    STR_HIDE_ETC_HELP_INFO = 'Hide on-screen navigation tips';
    STR_HIDE_ETC_HELP_INFO_SUMMARY = "Navigation tips, such as 'Hold a key for an action' and related.";
    STR_INACTIVE_SETTINGS = 'Automatically minimize the app when inactive for';
    STR_INACTIVE_SETTINGS_SUMMARY =
        'Prevent the app from keep running when no one is watching it. A warning will show up, giving the user 15 seconds to press any key to prevent the minimizing.';
    STR_INACTIVE_WARNING = 'The app will auto minimize due to inactivity in<br><br>%x<br><br>Press any key to cancel';
    STR_REMAINING = 'Remaining:';
    STR_PLAYER_INFO_VISIBILITY = 'Player status visibility';
    STR_PREVIEW_SET = 'Preview settings';
    STR_PREVIEW_SHOW = 'Show preview';
    STR_PREVIEW_SIZE_CONTROLS = 'Preview size';
    STR_OLED_BURN_IN = 'OLED Burn in protection';
    STR_OLED_BURN_IN_SUMMARY =
        'When this is enabled the screen will fully turn black for 50 ms once every 20 minutes. Only needed for devices with OLED displays that have issues of burn-ins.';
    STR_AS = 'as';
    STR_MILLISECONDS = 'milliseconds';
    STR_HOUR = 'hour';
    STR_HOURS = 'hours';
    STR_RIGHT = 'Right';
    STR_LEFT = 'Left';
    STR_BOTTOM = 'Bottom';
    STR_TOP = 'Top';
    STR_AVG = 'Avg';
    STR_OFFSET = 'Offset';

    STR_AFFILIATE = 'Affiliate content';
    STR_AFFILIATE_SUMMARY = "If you don't wanna to see the affiliate content set this to disabled.";
    STR_AFFILIATE_ABOUT =
        'This application has some affiliated links and images, from partners that have highly recommended products, the application owner may receive commissions for purchases made through those links, all links, images or anything related to a product are properly verified and or used before be displayed on the application.';
    STR_AFFILIATE_ABOUT_DIS = 'The affiliated content can be disabled in settings.';

    STR_HISTORY_EMPTY_CONTENT = 'The app history shows what you have watched in the app only if history is enabled';
    STR_PREVIEW = 'the preview';

    STR_EMBED = 'Embed player ';
    STR_CLICK_EXIT = 'Click here to exit the player';
    STR_GO_FULL = 'Full screen';
    STR_GO_FULL_HELP = 'Click, press 9 or F11';
    STR_NOT_SUPPORT_BROWSER = 'This is not supported on a browser';

    STR_WARNING_BROWSER = 'Browser warning';
    STR_WARNING_BROWSER_SUMMARY =
        'This app is designed to be used mainly on TVs, the support for other devices is limited. You can control the app using a mouse but it works better using the keyboard keys up, down, left, right, enter and return controller (ESC works as a return).';
    STR_THUMB_OPTIONS_CLICK = 'Click twice above an action (to open or apply it), click outside the dialog to exit without applying';
    STR_CLOSE_THIS_BROWSER = 'Press return, enter or click outside to close this';

    STR_DISABLE_EMBED = 'Enable Live and Vod Twitch player';
    STR_DISABLE_EMBED_SUMMARY =
        'This is only needed to disable if you want to see the Android player to check its strings and layout for testing proposes';

    STR_SPECIAL_FEATURE = 'Use the keyboard for this feature';
    STR_FAIL_VOD_INFO = 'Fail to load VOD info';

    STR_PROXY_DONATE_SUMMARY = 'If you wanna know more or thanks the proxy server maintainer use the link:';

    STR_TTV_LOL = 'TTV LOL';
    STR_K_TWITCH = 'K-Twitch-Bypass';
    STR_T1080 = 'T1080';

    STR_PROXY_TIMEOUT = 'Proxy timeout (time in seconds)';
    STR_PROXY_TIMEOUT_SUMMARY =
        'If the proxy server is out this will be the time that will take to "give up" on the connection and fallback to default Twitch implementation';

    PROXY_SERVICE = 'Proxy: ';
    PROXY_SERVICE_STATUS = 'Enabled and working';
    PROXY_SERVICE_OFF = 'Disabled in settings';
    PROXY_SERVICE_FAIL = 'Not working, fail %x times';

    PROXY_SETTINGS = 'Proxy Settings (Internet censorship and related proxy)';
    PROXY_SETTINGS_SUMMARY =
        'Only one proxy can be enable, enables proxy server to get stream links from a different server, that may allow you to see content that is forbidden on yours region and avoid ads, disable this if you have any live stream issue too many or longer buffers, freezes or slow connection that may cause the stream quality to drop.';
    SEEK_PREVIEW = 'Seek Preview';
    SEEK_PREVIEW_SUMMARY =
        "Allows to control the VOD seek preview image that shows when rewind or fast forward, seek preview isn't available to all VODs.";
    SEEK_PREVIEW_SINGLE = 'Single image';
    SEEK_PREVIEW_CAROUSEL = 'Carousel of images';

    OPEN_NEW_ISSUE = '(Click New issue)';

    STR_CONFIRM = 'Confirm';

    STR_MATURE_NO_CHANGES = 'No changes to mature content due to missing password';
    STR_MATURE_PROTECT = 'Protect mature changes with a password';
    STR_MATURE_HELP_SET_PASS = 'Set an password and click Confirm, exit will reset the mature settings';
    STR_MATURE_HELP_CHECK_PASS = 'Enter the saved password and click Confirm, exit will reset the mature settings';

    STR_MATURE_DISABLED = 'Mature content is disabled';
    STR_ENABLE_MATURE = 'Mature content';
    STR_ENABLE_MATURE_SUMMARY =
        'When disabled the app will block all content marked as mature including followed content, that includes lives marked as mature, and all content from clip and VOD sections';

    STR_SCREEN_OFF = 'Screen off (Audio only)';

    STR_UNBLOCK_CHANNEL = 'Unblock channel';
    STR_UNBLOCK_GAME = 'Unblock game';
    STR_BLOCK_CHANNEL = 'Block channel';
    STR_BLOCK_GAME = 'Block game';
    STR_BLOCK_NO_USER = 'Add a user first before being able to block';
    STR_BLOCK_NO_CHANNEL = "Can't get the channel for this";
    STR_BLOCK_OVERWRITE = 'Show blocked';
    STR_BLOCK_SORT_DATE = 'Sorted by blocked date';
    STR_BLOCK_SORT_NAME = 'Sorted by name A to Z';
    STR_BLOCK_EMPTY_CONTENT = 'There is no blocked content of this type';

    STR_NO_TOKEN_WARNING = 'Without adding a user the app, may fail to load the content, this is a Twitch API limitation';
    STR_NO_TOKEN_WARNING_429 = 'The app is failing to load the content due to a Twitch API limitation, to fix this add a user.';

    STR_ADD_USER_TEXT = 'Visit %site on another device and enter the code: %code';
    STR_ADD_USER_TEXT_COUNTER = 'Checking access confirmation in %d...';
    STR_ADD_USER_TEXT_COUNTER_NOW = 'Checking now!';
    STR_ADD_ERROR = "Can't access the add user service";
    STR_USER_TOKEN_ERROR = 'Lost access to current user, please revise the user section';

    STR_WRONG_PASS = 'Wrong password!';
    STR_PASS_MATURE_ENABLED = 'Mature content is enabled, old password deleted';

    STR_PLAYER_EXTRA_CODEC = 'Extra codec support';
    STR_PLAYER_EXTRA_CODEC_SUMMARY = 'Beta codec support that are being tested by Twitch';

    STR_PLAYER_EXTRA_CODEC_SUMMARY_EXTRA = 'Most streams only have AVC H.264 support ';

    STR_PLAYER_EXTRA_CODEC_SUMMARY_EXTRA2 =
        'For the codec to work the device must be capable, check the capability below (must be green), and the stream must be using the codec.';

    STR_PLAYER_CODEC_AV1 = 'AV1';
    STR_PLAYER_CODEC_HEVC = 'HEVC';

    STR_PLAYER_CODEC_SUPPORTED = 'supported';
    STR_PLAYER_CODEC_NOT_SUPPORTED = 'Not supported! Enabling this codec can cause playback errors and no playback.';

    STR_PLAYER_EXTRA_CODEC_SUMMARY_EXTRA3 = 'To better understand the device capability check the settings option: ';

    STR_BLOCKED_CODEC = 'Codec capability & Blocked codecs';
    STR_BLOCKED_CODEC_SUMMARY = 'List used codec capabilities and allow blocking codecs from being used.';

    STR_CODEC_DIALOG_SUMMARY_1 = 'This section lists all device-supported codec types AVC H.264, HEVC H.265, and AV1  used by this app.';

    STR_CODEC_DIALOG_SUMMARY_2 =
        'Software codecs (OMX.google) are disabled by default if a hardware codec is available, if you have a playback problem try to disable the software codec and enable the hardware or vice versa (A constant accumulation of skipped frames is indicative of a codec issue).';

    STR_CODEC_DIALOG_SUMMARY_3 = 'At least one codec of each type must be enabled at all times.';

    STR_SPEED_ADJUST = 'Catch-up with low latency';
    STR_SPEED_ADJUST_SUMMARY =
        'When low latency is enabled, auto-adjust the latency if it is off the expected target, by slowing or speeding the stream by 1%, the speed change can cause minor audio noise when the latency is being adjusted.';

    STR_SW_CODEC = 'Software codec';
    STR_HW_CODEC = 'Hardware codec';
}
