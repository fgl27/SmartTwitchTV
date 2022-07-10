/*
 * Copyright (c) 2017-2021 Felipe de Leon <fglfgl27@gmail.com>
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
var version = {
    VersionBase: '3.0',
    publishVersionCode: 332, //Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/332/SmartTV_twitch_3_0_332.apk',
    WebVersion: 'July 10 2022',
    WebTag: 608, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'Web Version July 10 2022 and Apk Version 3.0.332 and up',
            changes: ['Fix FFZ emotes from channels that recently changed name by @Js41637', 'Fix latency issues', 'Improve the option Open game from Thumbnail options', 'General improves']
        },
        {
            title: 'Web Version February 21 2022 and Apk Version 3.0.330 and up',
            changes: [
                'Prepare the app for API changes',
                "Twitch is about to shutdown some of they API, because of that the app sometimes doesn't load content, the next few days the app will receive updates to deal with the shutdown, make sure you are on latest APK version to not have problem",
                'When Twitch Shutdown they API some parts of the app will not work, the most used part will work as they are already using the new API',
                'After this update the user must add a new authorization key even if one was added before',
                'This new API demands the user to have a authorization key to access most of content, make sure you have added a user and a authorization key to prevent issues',
                'Update app dependencies to latest version included the player',
                'If you have any issue check github https://github.com/fgl27/SmartTwitchTV/issues'
            ]
        },
        {
            title: 'Web Version December 04 2021',
            changes: [
                "Minor improve to screen aspect ratio, only improves on some devices that have issues, if you didn't had an screen size/aspect ratio  issue before and now you have please inform, contact inf in the about of the app"
            ]
        },
        {
            title: 'Web Version September 12 2021',
            changes: ['Allow to control audio and volumes for all types of players']
        }
    ]
};
