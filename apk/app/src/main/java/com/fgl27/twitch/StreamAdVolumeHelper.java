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

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.media3.exoplayer.ExoPlayer;
import com.fgl27.twitch.StreamAdHLSPlaylistParser.ParsedPlaylist;
import com.fgl27.twitch.StreamAdHLSPlaylistParser.Segment;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Drives ExoPlayer audio reduction during Twitch HLS ad segments.
 *
 * <p>{@link StreamAdHLSPlaylistParser} produces ad-flagged segment timelines from media playlists;
 * this helper consumes them and decides per player slot whether the current playback position sits
 * inside an ad window. When it does, {@link #adjustVolume} returns a reduced or muted gain that
 * {@link PlayerActivity#ApplyAudioAll} applies via ExoPlayer.
 *
 * <h3>Why session ids, not slot ids</h3>
 *
 * Each Twitch MediaSource is tagged with a unique sessionId at build time
 * (see {@link Tools#buildMediaSource}). All parsed-playlist state lives keyed by sessionId rather
 * than the player slot the source happens to be in right now. The active multi-stream / preview
 * features in PlayerActivity move a MediaSource between slots (preview → main grid, swap), so
 * keying by slot would require migrating state on every move. Keying by sessionId means the slot
 * just looks up "what session am I displaying?" at audio-apply time.
 *
 * <h3>Threads</h3>
 *
 * {@link PlaylistListener#onPlaylistParsed} fires on a network thread (DefaultHttpDataSource.open).
 * State maps are concurrent, but ExoPlayer touches and Toasts hop to the main thread via the
 * shared {@link #handler}. The position checker also runs on the main thread.
 */
public final class StreamAdVolumeHelper implements StreamAdHLSPlaylistParser.PlaylistListener {

    private static final String TAG = "StreamAd";
    /**
     * Flip to {@code true} (locally — never commit) when chasing a parsing or polling bug. Logs
     * every intercepted playlist and every position-vs-segment evaluation. Lifecycle and ad
     * transitions are always logged in debug builds regardless of this flag.
     */
    private static final boolean LOG_VERBOSE = false;

    /** User mode for the reducer, sent from JS via {@link PlayerActivity#SetVolReducer}. */
    public static final int MODE_NONE = 0;
    public static final int MODE_HALF = 1;
    public static final int MODE_FULL = 2;

    /** Delay before unmuting after a position leaves an ad window — avoids flicker on playlist refresh. */
    private static final long DELAYED_UNMUTE_MS = 400L;
    /** Poll interval for the segment-vs-position check while at least one slot is playing an ad-aware session. */
    private static final long POSITION_POLL_MS = 100L;
    /** A live playlist is "stale" once playback has moved this far past its end — drop it. */
    private static final double PLAYLIST_STALE_MARGIN_S = 30.0;
    /** Total player slots: 0–3 main grid + 4 preview. Mirrors {@code PlayerActivity.PlayerAccountPlus}. */
    private static final int TOTAL_SLOTS = 5;
    /**
     * If playback is within this many milliseconds of the end of a content segment that is followed
     * by an ad segment, mute slightly early to avoid a brief audio blast at the boundary.
     */
    private static final long SEGMENT_BOUNDARY_PRE_MUTE_MS = 50L;

    /**
     * What PlayerActivity exposes to the helper. Kept tight on purpose so most logic stays here.
     */
    public interface Host {
        /** @return ExoPlayer for the slot, or null if released. */
        @Nullable ExoPlayer playerForSlot(int slot);

        /** @return the ad sessionId for the slot, or 0 if no ad-aware session is bound there. */
        int sessionForSlot(int slot);

        /** Re-apply audio for every slot using {@link #adjustVolume}. */
        void applyAudioAll();
    }

    /** Per-session bookkeeping: the recent parsed playlists for one MediaSource lifetime. */
    private static final class Session {
        final List<TimedPlaylist> playlists = new ArrayList<>();
        boolean reducerActive;
        Runnable pendingUnmute;
    }

    /** A parsed playlist alongside its total duration (computed once for staleness checks). */
    private static final class TimedPlaylist {
        final ParsedPlaylist playlist;
        final String playlistUri;
        final double totalDuration;

        TimedPlaylist(ParsedPlaylist playlist, String playlistUri) {
            this.playlist = playlist;
            this.playlistUri = playlistUri;
            double total = 0.0;
            for (Segment segment : playlist.segments) total += segment.duration;
            this.totalDuration = total;
        }
    }

    private static final AtomicInteger NEXT_SESSION_ID = new AtomicInteger(1);

    private final Host host;
    private final Context context;
    private final Handler handler;

    /** sessionId → Session. Concurrent because parser callbacks fire on a network thread. */
    private final ConcurrentHashMap<Integer, Session> sessions = new ConcurrentHashMap<>();

    /** User setting — one of MODE_*. Updated from JS via {@link PlayerActivity#SetVolReducer}. */
    private volatile int mode = MODE_NONE;

    private boolean pollScheduled;

    public StreamAdVolumeHelper(@NonNull Context context, @NonNull Host host) {
        // Hold the application context for Toast lifetime safety: this helper outlives a single
        // ExoPlayer setup but is bound to PlayerActivity, and Toasts that fire after Activity
        // teardown should still display cleanly without leaking the Activity.
        this.context = context.getApplicationContext();
        this.host = host;
        this.handler = new Handler(Looper.getMainLooper());
    }

    /** Mints a fresh sessionId for a new MediaSource. Always non-zero. */
    public int newSession() {
        int id = NEXT_SESSION_ID.getAndIncrement();
        sessions.put(id, new Session());
        if (BuildConfig.DEBUG) Log.d(TAG, "newSession id=" + id + " activeSessions=" + sessions.size());
        return id;
    }

    /** Drops all state for a session (call when the MediaSource is no longer referenced anywhere). */
    public void releaseSession(int sessionId) {
        if (sessionId == 0) return;
        Session session = sessions.remove(sessionId);
        if (session != null && session.pendingUnmute != null) {
            handler.removeCallbacks(session.pendingUnmute);
        }
        if (BuildConfig.DEBUG) {
            Log.d(TAG, "releaseSession id=" + sessionId + " hadEntry=" + (session != null)
                + " activeSessions=" + sessions.size());
        }
    }

    /** JS setting hook. Always called on the main thread by PlayerActivity. */
    public void setMode(int newMode) {
        int oldMode = this.mode;
        this.mode = newMode;
        if (newMode == MODE_NONE) {
            for (Session session : sessions.values()) session.reducerActive = false;
        } else {
            // Re-arm the poll so the user sees ad detection apply on the next position check
            // rather than waiting for the next live playlist refresh.
            schedulePoll();
        }
        host.applyAudioAll();
        if (BuildConfig.DEBUG) Log.d(TAG, "setMode " + modeName(oldMode) + " -> " + modeName(newMode));
    }

    /**
     * Returns the volume to actually apply for the given slot, given the user setting and whether
     * the slot's session is currently inside an ad window. Called from {@code ApplyAudioAll}.
     */
    public float adjustVolume(int slot, float baseVolume) {
        if (mode == MODE_NONE) return baseVolume;
        Session session = sessionForSlot(slot);
        if (session == null || !session.reducerActive) return baseVolume;
        return mode == MODE_FULL ? 0f : baseVolume * 0.5f;
    }

    // region Parser callback (network thread)

    @Override
    public void onPlaylistParsed(int sessionId, @NonNull ParsedPlaylist parsedPlaylist, @NonNull String playlistUri) {
        if (LOG_VERBOSE && BuildConfig.DEBUG) {
            int adCount = 0;
            for (Segment seg : parsedPlaylist.segments) if (seg.isAd) adCount++;
            Log.d(TAG, "onPlaylistParsed session=" + sessionId
                + " segs=" + parsedPlaylist.segments.size()
                + " adSegs=" + adCount
                + " adRanges=" + parsedPlaylist.adDateRanges.size()
                + " hasContent=" + parsedPlaylist.hasContent);
        }
        if (sessionId == 0 || parsedPlaylist.segments.isEmpty()) return;
        handler.post(() -> storeParsed(sessionId, parsedPlaylist, playlistUri));
    }

    private void storeParsed(int sessionId, ParsedPlaylist parsed, String uri) {
        Session session = sessions.get(sessionId);
        if (session == null) {
            // Late callback for a session that has already been released (e.g. user changed
            // streams while a playlist parse was in-flight). Safe to drop.
            if (BuildConfig.DEBUG) Log.d(TAG, "storeParsed: stale session id=" + sessionId);
            return;
        }

        // Replace any existing entry for the same URI (live playlists update every few seconds).
        for (Iterator<TimedPlaylist> it = session.playlists.iterator(); it.hasNext(); ) {
            if (uri.equals(it.next().playlistUri)) {
                it.remove();
                break;
            }
        }
        session.playlists.add(new TimedPlaylist(parsed, uri));
        schedulePoll();
    }

    // endregion

    // region Position checker

    /** Schedules the periodic position-vs-ad-segment check on the main thread. */
    private void schedulePoll() {
        if (pollScheduled) return;
        pollScheduled = true;
        handler.post(this::poll);
    }

    private void poll() {
        pollScheduled = false;
        if (mode == MODE_NONE) return; // Feature disabled — don't toggle state or toast.

        boolean anyActive = false;
        for (int slot = 0; slot < TOTAL_SLOTS; slot++) {
            ExoPlayer player = host.playerForSlot(slot);
            Session session = sessionForSlot(slot);
            if (player == null || session == null || session.playlists.isEmpty()) continue;

            anyActive |= player.isPlaying();
            evaluateSlot(slot, player, session);
        }

        if (anyActive) {
            pollScheduled = true;
            handler.postDelayed(this::poll, POSITION_POLL_MS);
        }
    }

    private void evaluateSlot(int slot, ExoPlayer player, Session session) {
        long posMs = player.getCurrentPosition();
        boolean inAd = isPositionInAd(session, posMs);
        if (LOG_VERBOSE && BuildConfig.DEBUG) {
            Log.d(TAG, "evaluateSlot slot=" + slot + " posMs=" + posMs + " inAd=" + inAd
                + " reducerActive=" + session.reducerActive
                + " pendingUnmute=" + (session.pendingUnmute != null)
                + " playlists=" + session.playlists.size());
        }

        if (inAd && !session.reducerActive) {
            session.reducerActive = true;
            host.applyAudioAll();
            showToast(slot, mode == MODE_FULL ? R.string.volume_muted : R.string.volume_reduced);
            if (BuildConfig.DEBUG) {
                Log.d(TAG, "ad ENTER slot=" + slot + " mode=" + modeName(mode) + " posMs=" + posMs
                    + " playlists=" + session.playlists.size());
            }
        } else if (!inAd && session.reducerActive && session.pendingUnmute == null) {
            // Confirm we're still out of an ad after a short delay; live playlists can refresh every
            // few seconds and we don't want to flap. The callback re-checks position before unmuting.
            session.pendingUnmute = () -> {
                session.pendingUnmute = null;
                ExoPlayer p = host.playerForSlot(slot);
                if (p == null || !session.reducerActive) return;
                long unmutePosMs = p.getCurrentPosition();
                if (!isPositionInAd(session, unmutePosMs)) {
                    session.reducerActive = false;
                    host.applyAudioAll();
                    showToast(slot, R.string.volume_unmuted);
                    if (BuildConfig.DEBUG) Log.d(TAG, "ad EXIT slot=" + slot + " posMs=" + unmutePosMs);
                } else if (BuildConfig.DEBUG) {
                    Log.d(TAG, "ad EXIT cancelled slot=" + slot + " posMs=" + unmutePosMs
                        + " (still in ad after debounce)");
                }
            };
            handler.postDelayed(session.pendingUnmute, DELAYED_UNMUTE_MS);
        }
    }

    /**
     * Walks the most recently parsed playlists newest first and finds the segment containing the
     * current playback position. Returns true when that segment is an ad, or when the playback
     * position is on the cusp of entering one (early-mute on segment boundary).
     *
     * <p>Also drops playlists whose timelines have been overrun by playback (live playlists are
     * appended each refresh, but old ones become obsolete once we're past their end).
     */
    private static boolean isPositionInAd(Session session, long positionMs) {
        double positionSec = positionMs / 1000.0;
        boolean foundAd = false;
        TimedPlaylist matched = null;

        for (int i = session.playlists.size() - 1; i >= 0 && matched == null; i--) {
            TimedPlaylist tp = session.playlists.get(i);
            double t = 0.0;
            for (int s = 0; s < tp.playlist.segments.size(); s++) {
                Segment seg = tp.playlist.segments.get(s);
                double end = t + seg.duration;
                if (positionSec >= t && positionSec < end) {
                    matched = tp;
                    foundAd = seg.isAd;
                    // Pre-mute the tail of a content segment that is immediately followed by an ad
                    // (see SEGMENT_BOUNDARY_PRE_MUTE_MS) — prevents a brief audio blast at the boundary.
                    if (!seg.isAd
                        && (end - positionSec) * 1000 <= SEGMENT_BOUNDARY_PRE_MUTE_MS
                        && s + 1 < tp.playlist.segments.size()
                        && tp.playlist.segments.get(s + 1).isAd) {
                        foundAd = true;
                    }
                    break;
                }
                t = end;
            }
        }

        for (Iterator<TimedPlaylist> it = session.playlists.iterator(); it.hasNext(); ) {
            TimedPlaylist tp = it.next();
            if (tp != matched && positionSec > tp.totalDuration + PLAYLIST_STALE_MARGIN_S) {
                it.remove();
            }
        }

        return foundAd;
    }

    // endregion

    // region Helpers

    @Nullable
    private Session sessionForSlot(int slot) {
        int sessionId = host.sessionForSlot(slot);
        return sessionId == 0 ? null : sessions.get(sessionId);
    }

    private void showToast(int slot, int stringRes) {
        Toast.makeText(context, String.format(Locale.US, context.getString(stringRes), slot), Toast.LENGTH_SHORT).show();
    }

    private static String modeName(int mode) {
        switch (mode) {
            case MODE_NONE: return "NONE";
            case MODE_HALF: return "HALF";
            case MODE_FULL: return "FULL";
            default: return "?(" + mode + ")";
        }
    }

    // endregion
}
