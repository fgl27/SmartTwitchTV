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
    WebVersion: 'October 21 2024',
    WebTag: 679, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'WebVersion September / October 21',
            changes: [
                'Fix missing information on player top info for some scenarios',
                'Fix missing information on channel content screens',
                'Fix not be able to open the game for some scenarios in the thumbnail options',
                'Fix current game in player content not always showing current game',
                'Fix scenario where not enough content load on the screen even when it is available preventing scrolling to get more content',
                'Improve numeric VODs jump to % function',
                'Improve media keys Live/VODs jump to 5/30 seconds function',
                'General etc improvements'
            ]
        },
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
        }
    ]
};
