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
    publishVersionCode: 345, //Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/345/SmartTV_twitch_3_0_345.apk',
    WebVersion: 'January 28 2023',
    WebTag: 641, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'Web Version January 28 2022 and Apk Version 3.0.345 and Up',
            changes: [
                'Update player to latest version',
                'Fix random unwanted background playback',
                'Add a option to open the VOD of current Live once the Live end',
                'General improves'
            ]
        },
        {
            title: 'Web Version January 27 2023',
            changes: ['Add T1080 Proxy', 'Fix Emoji support', 'Add content language controls to player', 'General improves']
        },
        {
            title: 'Web Version January 16 2023',
            changes: ['Replace Purple proxy with K-Twitch-Bypass', 'General improves']
        },
        {
            title: 'Web Version December 14 2022',
            changes: ['Update VOD/Clip chat to use new API, old one was disabled', 'General improves']
        },
        {
            title: 'Web Version November 15 2022',
            changes: ['General improves']
        }
    ]
};
