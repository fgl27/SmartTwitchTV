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
    publishVersionCode: 324,//Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/324/SmartTV_twitch_3_0_324.apk',
    WebVersion: 'July 17 2021',
    WebTag: 599,//Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: "Apk Version 3.0.324 and Web Version July 17 2021",
            changes: [
                "Update side panel styles",
                "The settings option 'Rounded channel images' is now enable by default change it in 'Customize interface, color style, animations and related'",
                "Add a new settings option 'Hide the side panel after 5 seconds of not using it' to 'Customize interface, color style, animations and related'",
                "Allow to access the 'Thumbnail Options' even when the content of the screen is empty, this is useful when changing to a language that has no content",
                "General improves and bug fixes"
            ]
        },
        {
            title: "Apk Version 3.0.323",
            changes: [
                "General improves and bug fixes"
            ]
        },
        {
            title: "Apk Version 3.0.322",
            changes: [
                "General improves and bug fixes"
            ]
        },
        {
            title: "Web Version July 4 2021",
            changes: [
                "Update Game section to allow changing games back and for without having to refresh and loose previously loaded content and position, now the app will always remember the content and position of a game that you have open before (For Live, Clips and VOD), until you refresh or the app auto refreshes (if 'Auto refresh in background' is enable in setting -> Content customization's ...)",
                "General improves and bug fixes"
            ]
        },
        {
            title: "Apk Version 3.0.321",
            changes: [
                "General improves and bug fixes"
            ]
        }
    ]
};
