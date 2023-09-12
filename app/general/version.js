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
    publishVersionCode: 350, //Always update (+1 to current value) Main_version_java after update publishVersionCode or a major update of the apk is released
    ApkUrl: 'https://github.com/fgl27/SmartTwitchTV/releases/download/350/SmartTV_twitch_3_0_350.apk',
    WebVersion: 'September 11 2023',
    WebTag: 671, //Always update (+1 to current value) Main_version_web after update Main_minversion or a major update of the web part of the app
    changelog: [
        {
            title: 'Web Version September 11 2023 and Apk Version 3.0.349 and 3.0.350',
            changes: [
                'Add new user logging method that allows you to fully use yours privileged in the app',
                'Note: after opening this update there will be no user, after adding a user history and blocked configuration will be restored',
                'Add follow/unfollow buttons back',
                'General improves'
            ]
        },
        {
            title: 'Web Version August 08 2023',
            changes: [
                'Add an option to block channels and games, use the thumbnail option to set by holding left above any thumbnail, then press enter above the channel or game to block',
                'Add "Show blocked" to the thumbnail option, setting this to YES allows you to see all blocked content without having to unblock it',
                'Add a new user section "Blocked", to manage blocked content',
                "Note about blocked: Blocked channels or games don't apply to followed channels",
                'Note about blocked: If you open a blocked game content, it will show all content minus blocked channels',
                'Note about blocked: If you open a blocked channel content, it will show all content',
                'Make highlighted messages in chat have the same background transparency as the chat',
                'Fix extra emotes (FFZ, BTTV, 7TV) not showing on one of the chats in 50/50 plus chats mode',
                'Add a new warning for users using the app without a user or authorization token: The app is failing to load the content due to a Twitch API limitation, to fix this add a user and authorization token, there is no workaround for this is just a Twitch API limitation',
                'General improves'
            ]
        },
        {
            title: 'Web Version June 27 2023',
            changes: ['General improves']
        },
        {
            title: 'Web Version June 17 2023',
            changes: ['Add Screen off (Audio only) option to player', 'General improves']
        }
    ]
};
