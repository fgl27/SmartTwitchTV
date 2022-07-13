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
    publishVersionCode: 334, //Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/334/SmartTV_twitch_3_0_334.apk',
    WebVersion: 'July 13 2022',
    WebTag: 613, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'Web Version July 13 2022 and Apk Version 3.0.334 and up',
            changes: [
                'Update channel on the home screen to work on the new Twitch API',
                'Update notificatons to work on the new Twitch API',
                'Is now necessary to have added a user and a key for all channel on the home screen',
                'General improves'
            ]
        },
        {
            title: 'Web Version July 12 2022 and Apk Version 3.0.333',
            changes: [
                'Update User channel screen to use new Twitch API',
                'Update Search Game to use new Twitch API',
                'Update Search Channel to use new Twitch API',
                'Remove Search Live no longer supported by new Twitch API',
                'Update Feature screen to use new Twitch API',
                'General improves'
            ]
        },
        {
            title: 'Web Version July 11 2022',
            changes: [
                'Update User games screen, Twitch API no longer support Followed games this API is unsupported and may stop working, this Followed games API can only provide 100 Live games, if you follow more then that the last Games you follow will not show',
                'Update User channel Vod screen to use new Twitch API',
                'Update Game Vod screen to use new Twitch API',
                'Remove unsupported side panel screens',
                'General improves'
            ]
        },
        {
            title: 'Web Version July 10 2022 and Apk Version 3.0.332 and up',
            changes: ['Fix FFZ emotes from channels that recently changed name by @Js41637', 'Fix latency issues', 'Improve the option Open game from Thumbnail options', 'General improves']
        }
    ]
};
