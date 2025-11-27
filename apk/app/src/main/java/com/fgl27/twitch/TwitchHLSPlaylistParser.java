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
import androidx.annotation.Nullable;
import android.util.Log;
import com.fgl27.twitch.BuildConfig;
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
 * Parser for Twitch HLS playlists that detects ad segments.
 * Based on streamlink's TwitchM3U8Parser implementation.
 * https://github.com/streamlink/streamlink/blob/master/src/streamlink/plugins/twitch.py
 */
public class TwitchHLSPlaylistParser {

    private static final String TAG = "STTV_TwitchHLSPlaylistParser";

    // Patterns for detecting ads
    private static final Pattern EXT_X_DATERANGE = Pattern.compile("#EXT-X-DATERANGE:(.+)");
    private static final Pattern EXT_X_TWITCH_PREFETCH = Pattern.compile("#EXT-X-TWITCH-PREFETCH:(.+)");
    private static final Pattern EXTINF = Pattern.compile("#EXTINF:([\\d.]+)(?:,(.+))?");
    private static final Pattern EXT_X_DISCONTINUITY = Pattern.compile("#EXT-X-DISCONTINUITY");
    private static final Pattern EXT_X_TWITCH_LIVE_SEQUENCE = Pattern.compile("#EXT-X-TWITCH-LIVE-SEQUENCE:(.+)");

    // Ad detection patterns
    private static final String DATERANGE_CLASSNAME_AD = "twitch-stitched-ad";
    private static final String DATERANGE_ID_PREFIX_AD = "stitched-ad-";
    private static final String SEGMENT_TITLE_AMAZON = "Amazon";

    /**
     * Represents a date range from EXT-X-DATERANGE tag
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

        public boolean isAd() {
            return DATERANGE_CLASSNAME_AD.equals(classname) ||
                   (id != null && id.startsWith(DATERANGE_ID_PREFIX_AD));
        }
        
        /**
         * Check if a relative time (in seconds) falls within this daterange's window
         */
        public boolean containsTime(double relativeTime) {
            double endTime = relativeStartTime + (duration / 1000.0);
            return relativeTime >= relativeStartTime && relativeTime < endTime;
        }
    }

    /**
     * Represents an HLS segment
     */
    public static class Segment {
        public final String uri;
        public final double duration;
        public final String title;
        public final boolean isAd;
        public final boolean isPrefetch;
        public final boolean hasDiscontinuity;

        public Segment(String uri, double duration, String title, boolean isAd, boolean isPrefetch, boolean hasDiscontinuity) {
            this.uri = uri;
            this.duration = duration;
            this.title = title;
            this.isAd = isAd;
            this.isPrefetch = isPrefetch;
            this.hasDiscontinuity = hasDiscontinuity;
        }
    }

    /**
     * Parsed playlist result
     */
    public static class ParsedPlaylist {
        public final List<Segment> segments;
        public final List<DateRange> adDateRanges;
        public final boolean hasContent;

        public ParsedPlaylist(List<Segment> segments, List<DateRange> adDateRanges, boolean hasContent) {
            this.segments = segments;
            this.adDateRanges = adDateRanges;
            this.hasContent = hasContent;
        }
    }

    /**
     * Parse an M3U8 playlist and detect ad segments
     */
    @NonNull
    public static ParsedPlaylist parsePlaylist(@NonNull String playlistContent) {
        List<Segment> segments = new ArrayList<>();
        List<DateRange> adDateRanges = new ArrayList<>();
        boolean hasContent = false;
        boolean discontinuity = false;
        double currentTime = 0.0;
        String lastSegmentTitle = null;
        double lastSegmentDuration = 0.0;

        String[] lines = playlistContent.split("\n");
        Map<String, String> currentDateRangeAttrs = null;
        String currentDateRangeClassname = null;
        String currentDateRangeId = null;
        long currentDateRangeStart = 0;
        long currentDateRangeDuration = 0;

        for (int i = 0; i < lines.length; i++) {
            String line = lines[i].trim();
            if (line.isEmpty()) continue;

            // Parse EXT-X-DATERANGE
            Matcher daterangeMatcher = EXT_X_DATERANGE.matcher(line);
            if (daterangeMatcher.matches()) {
                String attrsStr = daterangeMatcher.group(1);
                currentDateRangeAttrs = parseAttributes(attrsStr);
                currentDateRangeClassname = currentDateRangeAttrs.get("CLASS");
                currentDateRangeId = currentDateRangeAttrs.get("ID");
                String startDateStr = currentDateRangeAttrs.get("START-DATE");
                String durationStr = currentDateRangeAttrs.get("DURATION");

                if (startDateStr != null) {
                    try {
                        // Parse ISO 8601 date (simplified - just get timestamp)
                        currentDateRangeStart = parseISO8601(startDateStr);
                    } catch (Exception e) {
                        // Ignore parsing errors
                    }
                }
                if (durationStr != null) {
                    try {
                        currentDateRangeDuration = (long) (Double.parseDouble(durationStr) * 1000);
                    } catch (Exception e) {
                        // Ignore parsing errors
                    }
                }

                // Check if this is an ad date range (using the same logic as streamlink)
                if (DATERANGE_CLASSNAME_AD.equals(currentDateRangeClassname) ||
                    (currentDateRangeId != null && currentDateRangeId.startsWith(DATERANGE_ID_PREFIX_AD))) {
                    DateRange adRange = new DateRange(
                        currentDateRangeClassname,
                        currentDateRangeId,
                        currentDateRangeStart,
                        currentDateRangeDuration,
                        currentDateRangeAttrs,
                        currentTime // Track relative time when this daterange appears
                    );
                    adDateRanges.add(adRange);
                    
                    if (BuildConfig.DEBUG) {
                        String adsId = currentDateRangeAttrs.get("X-TV-TWITCH-AD-COMMERCIAL-ID");
                        if (adsId == null || adsId.isEmpty()) {
                            adsId = currentDateRangeAttrs.get("X-TV-TWITCH-AD-ROLL-TYPE");
                        }
                        double durationSeconds = currentDateRangeDuration / 1000.0;
                        Log.d(TAG, "Detected ad daterange: ID=" + currentDateRangeId + 
                              ", duration=" + durationSeconds + "s" +
                              (adsId != null ? ", adId=" + adsId : ""));
                    }
                }
                continue;
            }

            // Parse EXT-X-DISCONTINUITY
            if (EXT_X_DISCONTINUITY.matcher(line).matches()) {
                discontinuity = true;
                continue;
            }

            // Parse EXT-X-TWITCH-LIVE-SEQUENCE
            Matcher liveSeqMatcher = EXT_X_TWITCH_LIVE_SEQUENCE.matcher(line);
            if (liveSeqMatcher.matches()) {
                // Unset discontinuity if previous segment was not an ad
                if (!segments.isEmpty() && !segments.get(segments.size() - 1).isAd) {
                    discontinuity = false;
                }
                continue;
            }

            // Parse EXTINF
            Matcher extinfMatcher = EXTINF.matcher(line);
            if (extinfMatcher.matches()) {
                try {
                    double duration = Double.parseDouble(extinfMatcher.group(1));
                    String title = extinfMatcher.group(2);

                    // Get the URI from the next line
                    if (i + 1 < lines.length) {
                        String uri = lines[i + 1].trim();
                        if (!uri.isEmpty() && !uri.startsWith("#")) {
                            boolean isAd = isSegmentAd(title, currentTime, adDateRanges, discontinuity);
                            Segment segment = new Segment(uri, duration, title, isAd, false, discontinuity);
                            segments.add(segment);

                            if (!isAd) {
                                hasContent = true;
                                lastSegmentTitle = title;
                                lastSegmentDuration = duration;
                                // Clear discontinuity when we see non-ad content
                                discontinuity = false;
                            }

                            currentTime += duration;
                            // Only clear discontinuity after processing the segment
                            // If this segment is an ad, keep discontinuity for next segment
                            // If this segment is not an ad, discontinuity was already cleared above
                            if (isAd) {
                                // Keep discontinuity flag for potential next ad segment
                                // It will be cleared when we see non-ad content
                            }
                            i++; // Skip the URI line
                        }
                    }
                } catch (Exception e) {
                    // Ignore parsing errors
                }
                continue;
            }

            // Parse EXT-X-TWITCH-PREFETCH
            Matcher prefetchMatcher = EXT_X_TWITCH_PREFETCH.matcher(line);
            if (prefetchMatcher.matches() && !segments.isEmpty()) {
                String uri = prefetchMatcher.group(1).trim();
                Segment lastSegment = segments.get(segments.size() - 1);

                // Use average duration for prefetch segments
                double avgDuration = segments.stream()
                    .filter(s -> !s.isPrefetch)
                    .mapToDouble(s -> s.duration)
                    .average()
                    .orElse(lastSegmentDuration);

                // Prefetch segments after discontinuity are ads
                boolean isAd = discontinuity || isSegmentAd(null, currentTime, adDateRanges, true);

                Segment prefetchSegment = new Segment(uri, avgDuration, null, isAd, true, isAd != lastSegment.isAd);
                segments.add(prefetchSegment);

                currentTime += avgDuration;
                // Don't reset discontinuity for prefetch segments
                continue;
            }
        }

        return new ParsedPlaylist(segments, adDateRanges, hasContent);
    }

    /**
     * Check if a segment is an ad based on title, time, and date ranges
     * Similar to streamlink's _is_segment_ad method
     * @param title The segment title (from EXTINF tag)
     * @param currentTime The cumulative time of this segment in the playlist (in seconds)
     * @param adDateRanges List of ad date ranges from EXT-X-DATERANGE tags
     * @param discontinuity Whether this segment follows a DISCONTINUITY tag
     * @return true if this segment is an ad
     */
    private static boolean isSegmentAd(@Nullable String title, double currentTime, List<DateRange> adDateRanges, boolean discontinuity) {
        // Check title for "Amazon" - this is a clear indicator of an ad (like streamlink)
        if (title != null && title.contains(SEGMENT_TITLE_AMAZON)) {
            return true;
        }
        
        // Check if segment time falls within any ad daterange (like streamlink's is_date_in_daterange check)
        for (DateRange adRange : adDateRanges) {
            if (adRange.containsTime(currentTime)) {
                return true;
            }
        }
        
        // Fallback: Check if title contains "AD" or "ADVERT" (case-insensitive) - common ad indicators
        // Examples: "AdServer", "Advertisement", etc.
        if (title != null) {
            String titleUpper = title.toUpperCase();
            if (titleUpper.contains("AD") || titleUpper.contains("ADVERT")) {
                return true;
            }
        }

        // Don't mark segments as ads just because there's a discontinuity
        // Discontinuity can occur at ad boundaries, but also at stream boundaries (e.g., when transitioning back to live)
        return false;
    }

    /**
     * Parse attributes from a tag line (e.g., "CLASS=value,ID=value2")
     */
    @NonNull
    private static Map<String, String> parseAttributes(@NonNull String attrsStr) {
        Map<String, String> attrs = new HashMap<>();
        String[] pairs = attrsStr.split(",");
        for (String pair : pairs) {
            String[] kv = pair.split("=", 2);
            if (kv.length == 2) {
                attrs.put(kv[0].trim(), kv[1].trim().replaceAll("^\"|\"$", ""));
            }
        }
        return attrs;
    }

    /**
     * Parse ISO 8601 date string to timestamp in milliseconds
     * Format: "2025-11-27T09:48:43.684Z" or similar ISO 8601 formats
     */
    private static long parseISO8601(@NonNull String dateStr) {
        try {
            // Try parsing with different ISO 8601 formats
            // Format: "2025-11-27T09:48:43.684Z"
            SimpleDateFormat[] formats = {
                new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US),
                new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US),
                new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX", Locale.US),
                new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX", Locale.US),
            };
            
            for (SimpleDateFormat format : formats) {
                format.setTimeZone(TimeZone.getTimeZone("UTC"));
                try {
                    return format.parse(dateStr).getTime();
                } catch (Exception e) {
                    // Try next format
                }
            }
        } catch (Exception e) {
            // If all parsing fails, return 0
        }
        return 0;
    }

    /**
     * Check if a segment URI matches any segment in the parsed playlist
     * Uses flexible matching to handle different base URLs and query parameters
     */
    public static boolean isSegmentAd(@NonNull ParsedPlaylist playlist, @NonNull String segmentUri) {
        // Extract the segment filename/identifier from the URI
        String uriToCheck = segmentUri;
        try {
            // Remove query parameters and fragments
            int queryIndex = uriToCheck.indexOf('?');
            if (queryIndex > 0) {
                uriToCheck = uriToCheck.substring(0, queryIndex);
            }
            int fragmentIndex = uriToCheck.indexOf('#');
            if (fragmentIndex > 0) {
                uriToCheck = uriToCheck.substring(0, fragmentIndex);
            }
            
            // Extract just the filename part
            int lastSlash = uriToCheck.lastIndexOf('/');
            String filename = lastSlash >= 0 ? uriToCheck.substring(lastSlash + 1) : uriToCheck;
            
            // Check each segment in the playlist
            for (Segment segment : playlist.segments) {
                String segmentUriToCheck = segment.uri;
                // Remove query parameters from segment URI
                int segQueryIndex = segmentUriToCheck.indexOf('?');
                if (segQueryIndex > 0) {
                    segmentUriToCheck = segmentUriToCheck.substring(0, segQueryIndex);
                }
                int segLastSlash = segmentUriToCheck.lastIndexOf('/');
                String segmentFilename = segLastSlash >= 0 ? segmentUriToCheck.substring(segLastSlash + 1) : segmentUriToCheck;
                
                // Match by filename (most reliable) or full URI
                if (filename.equals(segmentFilename) || 
                    uriToCheck.equals(segmentUriToCheck) ||
                    uriToCheck.endsWith(segmentUriToCheck) ||
                    segmentUriToCheck.endsWith(uriToCheck)) {
                    return segment.isAd;
                }
            }
        } catch (Exception e) {
            // If parsing fails, fall back to simple string matching
            for (Segment segment : playlist.segments) {
                if (segmentUri.contains(segment.uri) || segment.uri.contains(segmentUri)) {
                    return segment.isAd;
                }
            }
        }
        return false;
    }
}

