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
    publishVersionCode: 315,//Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/315/SmartTV_twitch_3_0_315.apk',
    WebVersion: 'May 07 2021',
    WebTag: 587,//Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: "Apk Version 3.0.315 and Web Version May 07 2021",
            changes: [
                "Improve translation",
                "General improves and bug fixes"
            ]
        },
        {
            title: "Apk Version 3.0.314 and Web Version May 06 2021",
            changes: [
                "Improve translation",
                "General improves and bug fixes"
            ]
        },
        {
            title: "Apk Version 3.0.313 and Web Version May 03 2021",
            changes: [
                "Add Portuguese (PT-BR) and Russian translation,Thanks to Stay vibrant for the help",
                "Any one can help to improve the app, if you wanna to add yours language to the app translations or improve a existent one, just check the app github page for instructions on how to help",
                "General improves and bug fixes"
            ]
        },
        {
            title: "Apk Version 3.0.312 and Web Version April 09 2021",
            changes: [
                "General improves and bug fixes"
            ]
        },
        {
            title: "Web Version April 02 2021",
            changes: [
                "Fix 'Highlight @streamer messages' not working some times"
            ]
        },
        {
            title: "Web Version March 13 2021",
            changes: [
                "Fix host checks"
            ]
        }
    ]
};
