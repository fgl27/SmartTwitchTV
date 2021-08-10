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
    publishVersionCode: 328,//Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/328/SmartTV_twitch_3_0_328.apk',
    WebVersion: 'August 10 2021',
    WebTag: 603,//Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: "Apk Version 3.0.328",
            changes: [
                "Fix minor player regression"
            ]
        },
        {
            title: "Apk Version 3.0.327 and Web Version August 10 2021",
            changes: [
                "Add settings Chat option to Highlight messages from the streamer and mods",
                "Add player bottom controls option to show all player controls",
                "General improves and bug fixes"
            ]
        },
        {
            title: "Apk Version 3.0.326 and Web Version August 07 2021",
            changes: [
                "General improves and bug fixes"
            ]
        },
        {
            title: "Web Version July 22 2021",
            changes: [
                "General improves and bug fixes"

            ]
        },
        {
            title: "Apk Version 3.0.325",
            changes: [
                "General improves and bug fixes"
            ]
        },
        {
            title: "Web Version July 21 2021",
            changes: [
                "Add a new setting Chat option 'Block bots and bot commands (!command) from show in chat'",
                "General improves and bug fixes"

            ]
        }
    ]
};
