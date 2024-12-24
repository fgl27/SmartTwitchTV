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
    publishVersionCode: 372, //Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/372/SmartTV_twitch_3_0_372.apk',
    WebVersion: 'December 24 2024',
    WebTag: 695, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'Version December 24 2024 ✨🎄🎅 🔔 🤶🎄✨',
            changes: [
                'Add new settings option to Auto Switch content to All language when current language has no content enabled by default',
                '✨🎄🎅 🔔 🤶🎄✨ Merry christmas happy holidays everybody!!! ✨🎄🎅 🔔 🤶🎄✨'
            ]
        },
        {
            title: 'Version December 19 2024',
            changes: ['Add zero-width/overlay emote support, thanks to @JanitorialMess for the help', 'General improvements']
        },
        {
            title: 'Version December 01 2024',
            changes: [
                'Add Highlight First-Time ChatterSettings chat option, enabled by default',
                'Add option to configure chat badges, change by @Js41637',
                'General improvements'
            ]
        },
        {
            title: 'Version November 29 2024',
            changes: [
                'Prevent issues when switching or auto-refreshing game sections, the app always tries to remember the position and Streams showing when you exit and go back to a game section it only refreshes when the Auto-refresh timeout expires, but before this changes sometimes it was not doing it instead, it was showing old streams after an auto-refresh',
                'Fix player User Games section not loading more than 100 live channels for a selected game',
                'General improvements'
            ]
        },
        {
            title: 'Version November 27 2024 Apk Version 3.0.372',
            changes: ['Update player dependencies to latest version', 'General improvements']
        }
    ]
};
