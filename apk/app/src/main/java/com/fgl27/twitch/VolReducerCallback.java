/*
 * Copyright (c) 2017–present Felipe de Leon <fglfgl27@gmail.com>
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
 */

package com.fgl27.twitch;

import androidx.annotation.NonNull;

/**
 * Callback interface for volume reducer events
 */
public interface VolReducerCallback {
    /**
     * Called when an ad segment is detected and should be muted
     * @param playerPosition The player position (0-3)
     */
    void onAdDetected(int playerPosition);

    /**
     * Called when an ad segment ends and volume should be restored
     * @param playerPosition The player position (0-3)
     */
    void onAdEnded(int playerPosition);

    /**
     * Called when a playlist is parsed and ad information is available
     * @param playerPosition The player position (0-3)
     * @param parsedPlaylist The parsed playlist with ad information
     * @param playlistUri The URI of the playlist (for identifying duplicates and matching segments)
     */
    void onPlaylistParsed(int playerPosition, @NonNull TwitchHLSPlaylistParser.ParsedPlaylist parsedPlaylist, @NonNull String playlistUri);
}

