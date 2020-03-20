/*
 *  original file https://github.com/fgl27/ExoPlayer/blob/dev-v2/library/hls/src/main/java/com/google/android/exoplayer2/source/hls/playlist/HlsPlaylistParser.java
 *  original file https://github.com/fgl27/ExoPlayer/blob/dev-v2/library/hls/src/main/java/com/google/android/exoplayer2/source/hls/playlist/DefaultHlsPlaylistParserFactory.java
 * This classes only work because I build exoplayer from source and have made some private fun public on teh local source
 *
 *  original License:
 *
 * Copyright (C) 2016 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.fgl27.twitch;

import android.net.Uri;

import com.google.android.exoplayer2.ParserException;
import com.google.android.exoplayer2.source.UnrecognizedInputFormatException;
import com.google.android.exoplayer2.source.hls.playlist.HlsMasterPlaylist;
import com.google.android.exoplayer2.source.hls.playlist.HlsPlaylist;
import com.google.android.exoplayer2.source.hls.playlist.HlsPlaylistParser;
import com.google.android.exoplayer2.source.hls.playlist.HlsPlaylistParserFactory;
import com.google.android.exoplayer2.upstream.ParsingLoadable;
import com.google.android.exoplayer2.util.Util;

import androidx.annotation.NonNull;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Queue;

import static com.google.android.exoplayer2.source.hls.playlist.HlsPlaylistParser.checkPlaylistHeader;
import static com.google.android.exoplayer2.source.hls.playlist.HlsPlaylistParser.parseMasterPlaylist;
import static com.google.android.exoplayer2.source.hls.playlist.HlsPlaylistParser.parseMediaPlaylist;

/**
 * Default implementation for {@link HlsPlaylistParserFactory}.
 * update it if the file:
 * https://github.com/fgl27/ExoPlayer/blob/dev-v2/library/hls/src/main/java/com/google/android/exoplayer2/source/hls/playlist/DefaultHlsPlaylistParserFactory.java
 * receives update, as I build exoplayer from source I control when its update so is very simple to keep this update
 */
public final class mDefaultHlsPlaylistParserFactory implements HlsPlaylistParserFactory {

    private final String masterPlaylistString;
    private final Uri muri;

    public mDefaultHlsPlaylistParserFactory(String masterPlaylist, Uri uri) {
        this.masterPlaylistString = masterPlaylist;
        this.muri = uri;
    }

    @Override
    public ParsingLoadable.Parser<HlsPlaylist> createPlaylistParser() {
        return new HlsPlaylistParser();
    }

    @Override
    public ParsingLoadable.Parser<HlsPlaylist> createPlaylistParser(
            @NonNull HlsMasterPlaylist masterPlaylist) {
        return new mHlsPlaylistParser(masterPlaylist, masterPlaylistString, muri);
    }

    /**
     * Default implementation for {@link HlsPlaylistParser}.
     * update it if the file:
     * https://github.com/fgl27/ExoPlayer/blob/dev-v2/library/hls/src/main/java/com/google/android/exoplayer2/source/hls/playlist/HlsPlaylistParser.java
     * receives update, as I build exoplayer from source I control when its update so is very simple to keep this update
     */

    private static final class mHlsPlaylistParser implements ParsingLoadable.Parser<HlsPlaylist> {

        private static final String TAG_STREAM_INF = "#EXT-X-STREAM-INF";
        private static final String TAG_TARGET_DURATION = "#EXT-X-TARGETDURATION";
        private static final String TAG_DISCONTINUITY = "#EXT-X-DISCONTINUITY";
        private static final String TAG_DISCONTINUITY_SEQUENCE = "#EXT-X-DISCONTINUITY-SEQUENCE";
        private static final String TAG_MEDIA_DURATION = "#EXTINF";
        private static final String TAG_MEDIA_SEQUENCE = "#EXT-X-MEDIA-SEQUENCE";
        private static final String TAG_ENDLIST = "#EXT-X-ENDLIST";
        private static final String TAG_KEY = "#EXT-X-KEY";
        private static final String TAG_BYTERANGE = "#EXT-X-BYTERANGE";

        private final HlsMasterPlaylist masterPlaylist;
        private final String masterPlaylistString;
        private final Uri muri;

        public mHlsPlaylistParser(HlsMasterPlaylist masterPlaylist, String masterPlaylistString, Uri uri) {
            this.masterPlaylist = masterPlaylist;
            this.masterPlaylistString = masterPlaylistString;
            this.muri = uri;
        }

        @NonNull
        @Override
        public HlsPlaylist parse(@NonNull Uri uri, @NonNull InputStream inputStream) throws IOException {
            BufferedReader reader;
            if (uri == muri) reader = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(masterPlaylistString.getBytes())));
            else reader = new BufferedReader(new InputStreamReader(inputStream));

            Queue<String> extraLines = new ArrayDeque<>();
            String line;
            try {
                if (!checkPlaylistHeader(reader)) {
                    throw new UnrecognizedInputFormatException("Input does not start with the #EXTM3U header.",
                            uri);
                }
                while ((line = reader.readLine()) != null) {
                    line = line.trim();
                    if (!line.isEmpty()) {
                        if (line.startsWith(TAG_STREAM_INF)) {
                            extraLines.add(line);
                            return parseMasterPlaylist(new HlsPlaylistParser.LineIterator(extraLines, reader), uri.toString());
                        } else if (line.startsWith(TAG_TARGET_DURATION)
                                || line.startsWith(TAG_MEDIA_SEQUENCE)
                                || line.startsWith(TAG_MEDIA_DURATION)
                                || line.startsWith(TAG_KEY)
                                || line.startsWith(TAG_BYTERANGE)
                                || line.equals(TAG_DISCONTINUITY)
                                || line.equals(TAG_DISCONTINUITY_SEQUENCE)
                                || line.equals(TAG_ENDLIST)) {
                            extraLines.add(line);
                            return parseMediaPlaylist(
                                    masterPlaylist, new HlsPlaylistParser.LineIterator(extraLines, reader), uri.toString());
                        } else {
                            extraLines.add(line);
                        }
                    }
                }
            } finally {
                Util.closeQuietly(reader);
            }
            throw new ParserException("Failed to parse the playlist, could not identify any tags.");
        }

    }
}
