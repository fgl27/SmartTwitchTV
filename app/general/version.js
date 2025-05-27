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
    WebVersion: 'May 27 2024',
    WebTag: 707, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
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
        },
        {
            title: 'Version January 27 & 28 2024',
            changes: ['General improves']
        },
        {
            title: 'Version January 19 2024',
            changes: ['General visual improves']
        }
    ]
};
