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
    publishVersionCode: 365, //Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/365/SmartTV_twitch_3_0_365.apk',
    WebVersion: 'August 2024',
    WebTag: 671, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'Version August 2024 Apk Version 3.0.365',
            changes: [
                'Add support for HEVC H.265 and AV1 Live and VOD (Settings Extra codec support), it still depends on the streamer to use and is on beta testing only some can',
                'Update Codec capability & Blocked codecs settings section to support new codecs and to show better information',
                'Improve display and section for player quality, sometimes it can come out of order from the server or have missing information',
                "Fix Auto quality not playing stream with a resolution bigger than the device's current resolution",
                'Home screen content will no longer show blocked content',
                'Add new settings option "Catch-up with low latency" auto-adjust the latency if it is off the expected target, by slowing or speeding the stream by 1%',
                'Improve progress bar for lives',
                'General app text improves, this is an open source app anyone that wanna improve app text or add translations can the process is simple',
                'Other General improvements'
            ]
        }
    ]
};
