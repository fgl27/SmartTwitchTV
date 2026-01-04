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
    publishVersionCode: 377, //Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/377/SmartTV_twitch_3_0_377.apk',
    WebVersion: 'December 30 2025',
    WebTag: 723, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'Version December 30',
            changes: ['Add French application language by @UnicodeApocalypse', 'General performance improvements and bug fixes']
        },
        {
            title: 'Version June 17',
            changes: ['Add Turkish application language by @G-35']
        },
        {
            title: 'Version June 13',
            changes: [
                'Added Sync across devices, Backup, and Restore using Google Drive',
                'Sync across devices is disabled by default. It is recommended to enable it only if you use the app on multiple devices with the same Google Drive account',
                'Notifications: Added background notification support for Android 11 and above. This uses a simplified single-line text notification while running in the background',
                'Chat VOD: Improved chat synchronization when starting playback. For VODs of an ongoing live stream, there was a chance the chat could take a long time to load and/or sync',
                'Player: Added rewind button for live streams. This plays the VOD of the current live (when available) stream starting from the most recent point',
                'User Live Feed (accessed by pressing Up on the player): Live history now shows the last 100 watched channels that are Live',
                'User Live Feed (accessed by pressing Up on the player): Re-added the User VODs section',
                'Player: Removed buffer settings since they no longer provide any benefit in the current player version',
                'Updated Ukrainian language translation by @sladkOy',
                'General performance improvements and bug fixes'
            ]
        },
        {
            title: 'Version June 07',
            changes: ['Add Ukraine application language by @sladkOy']
        }
    ]
};
