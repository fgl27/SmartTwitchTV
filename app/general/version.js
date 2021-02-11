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
    publishVersionCode: 305,//Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/305/SmartTV_twitch_3_0_305.apk',
    WebVersion: 'February 11 2020',
    WebTag: 572,//Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
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
        },
        {
            title: "Apk Version 3.0.303 and Web Version February 02 2020",
            changes: [
                "Add a new in app update process to update the APP the APK and Web app",
                "Change side panel option 'Changelog' to 'Update & Changelog'",
                "Add a new settings 'Update options' to controls if the app will check for updates and if will show a dialog informing a update is available and allowing to click to update",
                "This new dialog allows to check for updates, and when updates are available you can update on one click, also allows to read the changelog",
                "If you install the app from Play store (TV only device), this dialog will inform and allow you to open the play store direct on the app page so you can update easily",
                "If you install manually, the app can now just update it self by downloading the APK and allowing to install, if you are on Android 8 or newer make sure to give the APP install permission",
                "If the update is only on the Web app now you can use the update dialog to update on one click, no longer need to close the app to update",
                "As this feature was added on APK version 3.0.303 you need to be on that version or newer so all features can work",
                "General improves and bug fixes"
            ]
        }
    ]
};
