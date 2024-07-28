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
    publishVersionCode: 363, //Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/363/SmartTV_twitch_3_0_363.apk',
    WebVersion: 'July 2024',
    WebTag: 677, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'Version March to July 2024 Apk Version 3.0.363',
            changes: [
                'Player: Migrate from Exoplayer to Media3, the Exoplayer changed name to Media3 and stop received updates on the old project, if anyone has any issue regarding playback please open github issue or send a email',
                'Change featured to front page (name change only)',
                'Add User Videos section',
                'Improve channel search results order, Twitch provides no order on the result, do a local ordering to show a more constant result',
                'Add search Live',
                'Add Search Videos',
                'Show all counters on all game screens',
                'Fix sometimes opening the wrong VOD for "Open the Last VOD" (one of the options that shows when a live end)',
                'Fix preview animated image not always showing',
                'Fix VOD seek preview image not always showing',
                'Improve exiting a search or search content as Channel content you enter after a search, before the app sometimes exit a search on the wrong section',
                'Improve app exit functionality',
                'Improve disable mature content with a password, now after enabling mature the old pass will be deleted, add a new one if disable again',
                'General app text improves, this is a open source app anyone that wanna to improve app text or add translations can the process is simple',
                'General UI/UX improvements, make it easier to use or understand the app',
                'Other General improvements'
            ]
        }
    ]
};
