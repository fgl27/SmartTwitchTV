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
var version = {
    VersionBase: '3.0',
    publishVersionCode: 307,//Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/307/SmartTV_twitch_3_0_307.apk',
    WebVersion: 'February 17 2020',
    WebTag: 574,//Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: "Apk Version 3.0.307 and Web Version February 17 2020",
            changes: [
                "General improves and bug fixes"
            ]
        },
        {
            title: "Apk Version 3.0.306 and Web Version February 15 2020",
            changes: [
                "General improves and bug fixes"
            ]
        },
        {
            title: "Apk Version 3.0.305 and Web Version February 11 2020",
            changes: [
                "General improves and bug fixes"
            ]
        },
        {
            title: "Apk Version 3.0.304 and Web Version February 10 2020",
            changes: [
                "Add new End dialog and player controls button, \"Streamer is now Live\", let you know when watching a VOD or a Clip that the streamer come online",
                "Add a new warning in Setting -> Warnings, Show \"Streamer is now Live\" warning, disable by default, small pop warning that show the first time the streamer comes online",
                "General improve on playback experience",
                "General improves on player controls looks",
                "Others general improves and bug fixes"
            ]
        },
        {
            title: "Web Version February 06 2020",
            changes: [
                "General improves and bug fixes"
            ]
        }
    ]
};
