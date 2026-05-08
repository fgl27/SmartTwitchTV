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

import android.util.Log;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Pure playlist + segment labeling for the volume-reducer feature.
 *
 * <p>SmartTwitchTV can lower or mute audio while certain Twitch HLS segments are classified as
 * blocked. This file is the parsing layer only: it turns raw M3U8 text into structured segments
 * (URI, duration, blocked flag) and blocked date ranges. It does not change ExoPlayer volume;
 * {@link VolReducer} consumes the parsed data together with playback position to decide when to
 * mute or restore.
 *
 * <p>Pipeline: ExoPlayer reads HLS through {@code DefaultHttpDataSource}. For Twitch playlists the
 * data source captures the media playlist body, calls {@link #parsePlaylist} here, then forwards
 * the same bytes to ExoPlayer unchanged. Parsed results are delivered on a network thread through
 * {@link PlaylistListener#onPlaylistParsed}; the listener implementation is responsible for any
 * thread hop before touching ExoPlayer.
 *
 * <p>Detection heuristics align with streamlink's Twitch plugin (TwitchM3U8Parser in
 * twitch.py): EXT-X-DATERANGE class names / id prefixes, EXTINF titles (e.g. Amazon),
 * EXT-X-DISCONTINUITY, EXT-X-TWITCH-LIVE-SEQUENCE and prefetch lines, and whether a segment time
 * falls inside a blocked date range.
 * Reference: https://github.com/streamlink/streamlink/blob/master/src/streamlink/plugins/twitch.py
 */
public class VolReducerPlaylistParser {

    // Same value as VolReducer.LOG_TAG — keep in sync so "adb logcat -s VolReducer" catches parser summaries.
    private static final String TAG = "VolReducer";
    /**
     * Flip to {@code true} (locally — never commit) to log a one-line summary on every parsed
     * playlist. Useful when a segment isn't being detected and you need to confirm whether the
     * parser actually saw any blocked EXT-X-DATERANGE / EXTINF markers in the body.
     */
    private static final boolean LOG_VERBOSE = false;

    private static final Pattern EXT_X_DATERANGE = Pattern.compile("#EXT-X-DATERANGE:(.+)");
    private static final Pattern EXT_X_TWITCH_PREFETCH = Pattern.compile("#EXT-X-TWITCH-PREFETCH:(.+)");
    private static final Pattern EXTINF = Pattern.compile("#EXTINF:([\\d.]+)(?:,(.+))?");
    private static final Pattern EXT_X_DISCONTINUITY = Pattern.compile("#EXT-X-DISCONTINUITY");
    private static final Pattern EXT_X_TWITCH_LIVE_SEQUENCE = Pattern.compile("#EXT-X-TWITCH-LIVE-SEQUENCE:(.+)");

    // Twitch protocol literals used to classify segments — keep these strings exactly as Twitch
    // emits them in HLS playlists. The Java symbol names are generic; only the literals match.
    private static final String DATERANGE_CLASS_BLOCKED = "twitch-stitched-ad";
    private static final String DATERANGE_ID_PREFIX_BLOCKED = "stitched-ad-";
    private static final String SEGMENT_TITLE_AMAZON = "Amazon";

    /**
     * Represents a date range from EXT-X-DATERANGE tag.
     */
    public static class DateRange {
        public final String classname;
        public final String id;
        public final long startDate; // Absolute timestamp in milliseconds
        public final long duration; // Duration in milliseconds
        public final Map<String, String> attributes;
        public final double relativeStartTime; // Relative time in seconds when this daterange appears in playlist

        public DateRange(String classname, String id, long startDate, long duration, Map<String, String> attributes, double relativeStartTime) {
            this.classname = classname;
            this.id = id;
            this.startDate = startDate;
            this.duration = duration;
            this.attributes = attributes;
            this.relativeStartTime = relativeStartTime;
        }

        public boolean isBlocked() {
            return DATERANGE_CLASS_BLOCKED.equals(classname) ||
                   (id != null && id.startsWith(DATERANGE_ID_PREFIX_BLOCKED));
        }

        /**
         * Check if a relative time (in seconds) falls within this daterange's window.
         */
        public boolean containsTime(double relativeTime) {
            double endTime = relativeStartTime + (duration / 1000.0);
            return relativeTime >= relativeStartTime && relativeTime < endTime;
        }
    }

    /**
     * Represents an HLS segment. {@code isBlocked} is set by {@link #isSegmentBlocked} during
     * parsing; the consumer ({@link VolReducer}) uses it to decide when to reduce volume.
     */
    public static class Segment {
        public final String uri;
        public final double duration;
        public final String title;
        public final boolean isBlocked;
        public final boolean isPrefetch;
        public final boolean hasDiscontinuity;

        public Segment(String uri, double duration, String title, boolean isBlocked, boolean isPrefetch, boolean hasDiscontinuity) {
            this.uri = uri;
            this.duration = duration;
            this.title = title;
            this.isBlocked = isBlocked;
            this.isPrefetch = isPrefetch;
            this.hasDiscontinuity = hasDiscontinuity;
        }
    }

    /**
     * Parsed playlist result.
     */
    public static class ParsedPlaylist {
        public final List<Segment> segments;
        public final List<DateRange> blockedDateRanges;
        public final boolean hasContent;

        public ParsedPlaylist(List<Segment> segments, List<DateRange> blockedDateRanges, boolean hasContent) {
            this.segments = segments;
            this.blockedDateRanges = blockedDateRanges;
            this.hasContent = hasContent;
        }
    }

    /**
     * Callback delivered by {@code DefaultHttpDataSource} after a Twitch media playlist is parsed.
     * Invoked on the network thread; implementations that touch ExoPlayer must hop to the UI thread.
     *
     * <p>{@code sessionId} is minted per MediaSource by the caller (see
     * {@link Tools#buildMediaSource}) so listener state stays bound to a stream and does not get
     * confused when a stream moves between player slots.
     */
    public interface PlaylistListener {
        void onPlaylistParsed(int sessionId, @NonNull ParsedPlaylist parsedPlaylist, @NonNull String playlistUri);
    }

    /**
     * Parses raw M3U8 text into segments and blocked dateranges (same role as streamlink's
     * TwitchM3U8Parser).
     *
     * @param playlistContent full playlist body as returned by the server
     * @return parsed segments, blocked dateranges, and whether non-blocked content was seen
     */
    @NonNull
    public static ParsedPlaylist parsePlaylist(@NonNull String playlistContent) {
        List<Segment> segments = new ArrayList<>();
        List<DateRange> blockedDateRanges = new ArrayList<>();
        boolean hasContent = false;
        boolean discontinuity = false;
        double currentTime = 0.0;
        double lastSegmentDuration = 0.0;

        String[] lines = playlistContent.split("\n");
        for (int i = 0; i < lines.length; i++) {
            String line = lines[i].trim();
            if (line.isEmpty()) continue;

            // EXT-X-DATERANGE: a stitched range marks a timeline window that should be blocked.
            Matcher daterangeMatcher = EXT_X_DATERANGE.matcher(line);
            if (daterangeMatcher.matches()) {
                Map<String, String> attrs = parseAttributes(daterangeMatcher.group(1));
                String classname = attrs.get("CLASS");
                String id = attrs.get("ID");
                if (DATERANGE_CLASS_BLOCKED.equals(classname) || (id != null && id.startsWith(DATERANGE_ID_PREFIX_BLOCKED))) {
                    long startMs = 0;
                    long durationMs = 0;
                    String startDateStr = attrs.get("START-DATE");
                    if (startDateStr != null) startMs = parseISO8601(startDateStr);
                    String durationStr = attrs.get("DURATION");
                    if (durationStr != null) {
                        try { durationMs = (long) (Double.parseDouble(durationStr) * 1000); } catch (NumberFormatException ignored) {}
                    }
                    blockedDateRanges.add(new DateRange(classname, id, startMs, durationMs, attrs, currentTime));
                }
                continue;
            }

            if (EXT_X_DISCONTINUITY.matcher(line).matches()) {
                discontinuity = true;
                continue;
            }

            // EXT-X-TWITCH-LIVE-SEQUENCE: a return-to-live marker; clear discontinuity if we were on real content.
            if (EXT_X_TWITCH_LIVE_SEQUENCE.matcher(line).matches()) {
                if (!segments.isEmpty() && !segments.get(segments.size() - 1).isBlocked) {
                    discontinuity = false;
                }
                continue;
            }

            // EXTINF + URI on next line: a real segment; classify it and advance the timeline.
            Matcher extinfMatcher = EXTINF.matcher(line);
            if (extinfMatcher.matches()) {
                try {
                    double duration = Double.parseDouble(extinfMatcher.group(1));
                    String title = extinfMatcher.group(2);
                    if (i + 1 < lines.length) {
                        String uri = lines[i + 1].trim();
                        if (!uri.isEmpty() && !uri.startsWith("#")) {
                            boolean isBlocked = isSegmentBlocked(title, currentTime, blockedDateRanges);
                            segments.add(new Segment(uri, duration, title, isBlocked, false, discontinuity));
                            if (!isBlocked) {
                                hasContent = true;
                                discontinuity = false;
                            }
                            currentTime += duration;
                            lastSegmentDuration = duration;
                            i++;
                        }
                    }
                } catch (NumberFormatException ignored) {
                    // Bad EXTINF duration — skip.
                }
                continue;
            }

            // EXT-X-TWITCH-PREFETCH: optimistic next-segment hint with no EXTINF; estimate duration from peers.
            Matcher prefetchMatcher = EXT_X_TWITCH_PREFETCH.matcher(line);
            if (prefetchMatcher.matches() && !segments.isEmpty()) {
                String uri = prefetchMatcher.group(1).trim();
                Segment lastSegment = segments.get(segments.size() - 1);
                double avgDuration = segments.stream()
                    .filter(s -> !s.isPrefetch)
                    .mapToDouble(s -> s.duration)
                    .average()
                    .orElse(lastSegmentDuration);
                boolean isBlocked = discontinuity || isSegmentBlocked(null, currentTime, blockedDateRanges);
                segments.add(new Segment(uri, avgDuration, null, isBlocked, true, isBlocked != lastSegment.isBlocked));
                currentTime += avgDuration;
            }
        }

        ParsedPlaylist result = new ParsedPlaylist(segments, blockedDateRanges, hasContent);
        if (LOG_VERBOSE && BuildConfig.DEBUG) {
            int blockedSegs = 0;
            for (Segment s : segments) if (s.isBlocked) blockedSegs++;
            Log.d(TAG, "parsePlaylist bytes=" + playlistContent.length()
                + " segs=" + segments.size()
                + " blockedSegs=" + blockedSegs
                + " blockedRanges=" + blockedDateRanges.size()
                + " hasContent=" + hasContent);
        }
        return result;
    }

    /**
     * Streamlink-style segment classification: title heuristic ("Amazon" / "AD" / "ADVERT") OR
     * the cumulative segment time falls inside a matched daterange. Discontinuity alone is not
     * enough — it can also fire at non-blocked stream boundaries.
     */
    private static boolean isSegmentBlocked(@Nullable String title, double currentTime, List<DateRange> blockedDateRanges) {
        if (title != null && title.contains(SEGMENT_TITLE_AMAZON)) return true;
        for (DateRange range : blockedDateRanges) {
            if (range.containsTime(currentTime)) return true;
        }
        if (title != null) {
            String upper = title.toUpperCase(Locale.US);
            if (upper.contains("AD") || upper.contains("ADVERT")) return true;
        }
        return false;
    }

    /** Parses {@code KEY=value,KEY2="quoted",...} attribute lists from HLS tag lines. */
    @NonNull
    private static Map<String, String> parseAttributes(@NonNull String attrsStr) {
        Map<String, String> attrs = new HashMap<>();
        for (String pair : attrsStr.split(",")) {
            String[] kv = pair.split("=", 2);
            if (kv.length == 2) {
                attrs.put(kv[0].trim(), kv[1].trim().replaceAll("^\"|\"$", ""));
            }
        }
        return attrs;
    }

    /** Best-effort ISO 8601 parser for EXT-X-DATERANGE START-DATE; returns 0 if no format matched. */
    private static final SimpleDateFormat[] ISO8601_FORMATS = {
        new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US),
        new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US),
        new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX", Locale.US),
        new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX", Locale.US),
    };

    static {
        for (SimpleDateFormat f : ISO8601_FORMATS) f.setTimeZone(TimeZone.getTimeZone("UTC"));
    }

    private static long parseISO8601(@NonNull String dateStr) {
        for (SimpleDateFormat format : ISO8601_FORMATS) {
            try {
                synchronized (format) {
                    return format.parse(dateStr).getTime();
                }
            } catch (Exception ignored) {
                // Try next format.
            }
        }
        return 0;
    }
}
