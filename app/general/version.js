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
 *y
 */

//Spacing for release maker not trow errors from jshint
var version = {
    VersionBase: '3.0',
    publishVersionCode: 371, //Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/371/SmartTV_twitch_3_0_371.apk',
    WebVersion: 'October 25 2024',
    WebTag: 683, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'Version October 25 2024 Apk Version 3.0.369 and up',
            changes: [
                'Fix crashes for devices with bigger RAM (4+GB) when playing VOD, even that teh device has a large amount of RAM if the app uses it for buffer the app will crash',
                'Fix old deleted vod not being deleted from live history',
                'Fix old deleted Lives not being deleted from live history',
                'Fix Game content not showing the latest content when the app did a auto refresh in background, very  hare but after the app was running for a long time there was a chance the app did refresh in background but shows old none refreshed content',
                'Fix showing blocked content randomly, after navigating to a blocked content and exit the app in a very random scenario this can happens',
                'Fix player controls miss behaving randomly',
                'Fix screen with a single content not allowing to open the content, issue introduced in last version',
                'Improve numeric VODs jump to % function',
                'Improve media keys Live/VODs jump to 5/30 seconds function',
                'Other General improvements'
            ]
        },
        {
            title: 'WebVersion September / October 21',
            changes: [
                'Fix missing information on player top info for some scenarios',
                'Fix missing information on channel content screens',
                'Fix not be able to open the game for some scenarios in the thumbnail options',
                'Fix current game in player content not always showing current game',
                'Fix scenario where not enough content load on the screen even when it is available preventing scrolling to get more content',
                'General etc improvements'
            ]
        },
        {
            title: 'WebVersion September 09',
            changes: [
                'Fix animation lag in the Clip section, Twitch was sending images that were too big causing lags',
                'General performance improvements'
            ]
        }
    ]
};
