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
    publishVersionCode: 347, //Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/347/SmartTV_twitch_3_0_347.apk',
    WebVersion: 'June 11 2023',
    WebTag: 663, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'Web Version June 11 2023',
            changes: ['Add setting options to block Mature content']
        },
        {
            title: 'Web Version June 03 2023',
            changes: ['General chat improves']
        },
        {
            title: 'Web Version May 31 2023',
            changes: ['Fix live playback', 'Fix chat badges']
        },
        {
            title: 'Web Version May 08 2023',
            changes: [
                'Add Top VOD section back',
                'Fix Top Clip and VOD',
                "This section's API are undocumented and a little unstable, but works most of the time, if it fails refresh it"
            ]
        },
        {
            title: 'Web Version May 05 2023',
            changes: ['Fix VOD chat']
        },
        {
            title: 'Web Version February 25 2023',
            changes: ['General UI improves', 'General improves']
        }
    ]
};
