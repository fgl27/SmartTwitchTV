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
    publishVersionCode: 343, //Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/343/SmartTV_twitch_3_0_343.apk',
    WebVersion: 'August 17 2022',
    WebTag: 629, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'August 19 2022 and Apk Version 3.0.343 and Up',
            changes: [
                'Demanding make sure you are running the latest version of the APK 343, if not the app will not work properly',
                'Add Proxy to setting player options (all proxy disabled by default), this are internet censorship and related proxy',
                'When the Proxy is enable you may experience longer buffer at start of a stream, but after all must work OK, if not disable it or change to a different proxy option',
                'Add proxy status to the player status (player top right info)',
                'Proxy only affects live streams',
                'General improves'
            ]
        },
        {
            title: 'August 03 2022 and Apk Version 3.0.338',
            changes: [
                'Fix sometimes missing streamer name on notification and home screen content',
                'Migrate Vod seek preview image to new Twitch API',
                'General improves'
            ]
        },
        {
            title: 'Web Version July 27 2022',
            changes: ['Fixes issue when using the app without a user']
        },
        {
            title: 'Web Version July 16 2022 and Apk Version 3.0.335 and up',
            changes: ['Update app Player to latest version', 'General improves']
        },
        {
            title: 'Web Version July 13 2022 and Apk Version 3.0.334',
            changes: [
                'Update channel on the home screen to work on the new Twitch API',
                'Update notifications to work on the new Twitch API',
                'Is now necessary to have added a user and a key for all channel on the home screen',
                'General improves'
            ]
        }
    ]
};
