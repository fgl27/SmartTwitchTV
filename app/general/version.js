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
    publishVersionCode: 367, //Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/367/SmartTV_twitch_3_0_367.apk',
    WebVersion: 'September 09 2024',
    WebTag: 677, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'WebVersion September 09',
            changes: [
                'Fix animation lag in the Clip section, Twitch was sending images that were too big causing lags',
                'General performance improvements'
            ]
        },
        {
            title: 'WebVersion August 17',
            changes: [
                "Update the emotes selection screen to improve performance, no magic can improve the performance here more than what is, simply some devices are capable of playing 8k but they can't handle multiple animated images, also some emotes servers are terribly optimized, for example, 7TV"
            ]
        },
        {
            title: 'Version August 2024 Apk Version 3.0.367',
            changes: [
                'Update Codec capability & Blocked codecs settings section to support devices that have the same name for multiple codecs',
                'Android 10 and up now can see with codecs are hardware or software',
                'Due to changes above the codec section was reseted if you make changes to it please redo yours changes',
                'General visual improvements',
                'Other General improvements'
            ]
        },
        {
            title: 'Version August 2024 Apk Version 3.0.365',
            changes: [
                'Add support for HEVC H.265 and AV1 Live and VOD (Settings Extra codec support), it still depends on the streamer to use and is on beta testing only some can',
                'Update Codec capability & Blocked codecs settings section to support new codecs and to show better information',
                'Improve display and sorting for player quality, sometimes it can come out of order from the server or have missing information',
                "Fix Auto quality not playing stream with a resolution bigger than the device's current resolution",
                'Home screen content will no longer show blocked content',
                'Add new settings option "Catch-up with low latency" auto-adjust the latency if it is behind the expected target, by slowing or speeding the stream by 1%',
                'Improve progress bar for lives playback, show proper duration if paused for too long',
                'General app text improves, this is an open source app anyone that wanna improve app text or add translations can the process is simple',
                'Other General improvements'
            ]
        }
    ]
};
