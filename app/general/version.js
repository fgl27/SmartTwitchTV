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
    publishVersionCode: 350, //Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/350/SmartTV_twitch_3_0_350.apk',
    WebVersion: 'March 2024',
    WebTag: 673, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'Version September 2023 to March 2024',
            changes: [
                'Fix unable to change quality during playback if the default quality in settings was different than AUTO',
                'Fix playing single quality streams',
                'Fix auto playback not selecting the best possible quality for Live streams, Twitch messed up their bitrate information provided by their servers, with caused issues as the app uses the bitrate and current available internet speed (bandwidth) to determinate what quality to select',
                'Fix VOD playback starting from 00:00, after switching apps during a VOD playback the app could lose the VOD time position when you come back to it',
                "Improve the chat delay option, sometimes the chosen option wasn't working as expected",
                'Improve player controls, sometime the player would show an option not available for that type of playback which causes control issues',
                'Add extra playback speeds (by Js41637)',
                'Fix the thumbnails option (hold left) not showing all options or showing and not allowing to move up/down',
                'Fix hiding blocked VODs in some of the VOD section',
                'Fix clip playback selecting the best quality, Twitch changed how they order clip options on the server, making necessary local ordering.',
                'General chat improvements',
                'General UI/UX improvements, make it easier to use or understand the app',
                'Other General improvements'
            ]
        },
        {
            title: 'Web Version September 11 2023 and Apk Version 3.0.349 and 3.0.350',
            changes: [
                'Add new user logging method that allows you to fully use yours privileged in the app',
                'Note: after opening this update there will be no user, after adding a user history and blocked configuration will be restored',
                'Add follow/unfollow buttons back',
                'General improvements'
            ]
        }
    ]
};
