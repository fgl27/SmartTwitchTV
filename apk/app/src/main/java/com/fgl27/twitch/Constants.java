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

package com.fgl27.twitch;

public interface Constants {

    String PREF_NOTIFY_OLD_LIST = "not_list";
    String PREF_NOTIFICATION_BACKGROUND = "notification_background";
    String PREF_NOTIFICATION_REPEAT = "notification_repeat";
    String PREF_NOTIFICATION_POSITION = "notification_position";
    String PREF_NOTIFICATION_WILL_END = "notification_end_time";
    String PREF_USER_ID = "user_id";

    String ACTION_SCREEN_ON = "action_screenOn";
    String ACTION_SCREEN_OFF = "action_screenOff";

    String ACTION_NOTIFY_START = "action_StartService";
    String ACTION_NOTIFY_STOP = "action_StopService";
    String ACTION_NOTIFY_PAUSE = "action_PauseService";

}
