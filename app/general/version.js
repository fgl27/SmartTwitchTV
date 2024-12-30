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
    publishVersionCode: 372, //Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/372/SmartTV_twitch_3_0_372.apk',
    WebVersion: 'December 30 2024',
    WebTag: 701, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'Version December 29/30 2024 🎉 🎊 🥂 ✨ 🎅 💖 🤶 ✨ 🥂 🎊 🎉',
            changes: [
                'Add support for Shared chat',
                'Add new settings option Chat > Disable shared chat (No by default)',
                'Add new settings option Chat > Show Shared chat badges (Yes by default)',
                'Add new Player controls Chat extra settings > Disable shared chat (No by default)',
                '🎉 🎊 🥂 ✨ 🎅 💖 🤶 ✨ 🥂 🎊 🎉 Happy New Year, Merry Christmas, and Happy Holidays everybody!!! 🎉 🎊 🥂 ✨ 🎅 💖 🤶 ✨ 🥂 🎊 🎉'
            ]
        },
        {
            title: 'Version December 28 2024 🎉 🎊 🥂 ✨ 🎅 💖 🤶 ✨ 🥂 🎊 🎉',
            changes: [
                'Fix scenarios where the player was in an "undefined" state, this was happening mostly  when playing 4 way multistream with only 3 streams',
                '🎉 🎊 🥂 ✨ 🎅 💖 🤶 ✨ 🥂 🎊 🎉 Happy New Year, Merry Christmas, and Happy Holidays everybody!!! 🎉 🎊 🥂 ✨ 🎅 💖 🤶 ✨ 🥂 🎊 🎉'
            ]
        },
        {
            title: 'Version December 24 2024 ✨🎄🎅 🔔 🤶🎄✨',
            changes: [
                'Add new settings option to Auto Switch content to All language when current language has no content enabled by default',
                '✨🎄🎅 🔔 🤶🎄✨ Merry Christmas, and Happy Holidays everybody!!! ✨🎄🎅 🔔 🤶🎄✨'
            ]
        },
        {
            title: 'Version December 19 2024',
            changes: ['Add zero-width/overlay emote support, thanks to @JanitorialMess for the help', 'General improvements']
        },
        {
            title: 'Version December 01 2024',
            changes: [
                'Add Highlight First-Time ChatterSettings chat option, enabled by default',
                'Add option to configure chat badges, change by @Js41637',
                'General improvements'
            ]
        }
    ]
};
