/*
 * Copyright (c) 2017-∞ Felipe de Leon <fglfgl27@gmail.com>
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
    publishVersionCode: 375, //Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/375/SmartTV_twitch_3_0_375.apk',
    WebVersion: 'June 03 2025',
    WebTag: 709, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'Version June 07',
            changes: ['Add Ukraine application language by @sladkOy']
        },
        {
            title: 'Version June 03',
            changes: [
                'Enhanced Broadcasting support for HEVC/AV1 codecs now enabled by default on compatible devices',
                'Upgraded from "Extra codec support" to "Enhanced Broadcasting" with improved HEVC/AV1 implementation',
                'Most streams use AVC (H.264) up to 1080p60, while HEVC/AV1 enable higher quality 1440p, 4K, and 60+fps streams where available',
                'Device compatibility is automatically detected to ensure optimal streaming performance',
                'Access the new setting in player options to enable/disable Enhanced Broadcasting support based on your preferences',
                'General improvements to streaming performance and stability'
            ]
        },
        {
            title: 'Version May 27',
            changes: [
                'Update player dependencies to latest version, this may solve some player related issue',
                'Fix support for VOD of current live, Twitch is now providing full replay of the live but you need to open it from the most recent VOD, when detected the playback will start from the end of the VOD and will continue update the duration',
                'Chat is not perfect in the VOD of current live if you are too close to where the live is, some chat messages may not show and the sync is a little off, recommended keep remaining time to 1 minute or longer',
                'Fix random scenario that after changing app the player stayed loading for ever when returning to the app',
                'General improves'
            ]
        },
        {
            title: 'Version March 9',
            changes: [
                'Improve clock style',
                'Add 24, 12h AM PM and 12h clock styles to Settings > Customize interface, color style, animations and related',
                'General improves'
            ]
        }
    ]
};
