package com.fgl27.twitchtv.listener

import android.content.Context
import android.util.Log
import android.view.Surface

import com.frontiir.dasher.PlayerActivity
import com.google.android.exoplayer2.Format
import com.google.android.exoplayer2.decoder.DecoderCounters
import com.google.android.exoplayer2.video.VideoRendererEventListener

class VideoEventListener(private val context: Context) : VideoRendererEventListener {

    override fun onVideoEnabled(counters: DecoderCounters) {
        Log.d(TAG, "on video enabled--->$counters")
    }

    override fun onVideoDecoderInitialized(decoderName: String, initializedTimestampMs: Long, initializationDurationMs: Long) {
        Log.d(TAG, "on video decoder initialized--->$decoderName$initializedTimestampMs$initializationDurationMs")
    }

    override fun onVideoInputFormatChanged(format: Format) {
        Log.d(TAG, "on video input format changed--->$format")
    }

    override fun onDroppedFrames(count: Int, elapsedMs: Long) {
        Log.d(TAG, "on video drop frames--->$count$elapsedMs")
    }

    override fun onVideoSizeChanged(width: Int, height: Int, unappliedRotationDegrees: Int, pixelWidthHeightRatio: Float) {
        Log.d(TAG, "on video size changed--->$width$height$unappliedRotationDegrees$pixelWidthHeightRatio")
    }

    override fun onRenderedFirstFrame(surface: Surface?) {
        Log.d(TAG, "on video rendered first frame--->" + surface!!)
    }

    override fun onVideoDisabled(counters: DecoderCounters) {
        Log.d(TAG, "on video disabled--->$counters")
    }

    companion object {
        private val TAG = VideoEventListener::class.java.name
    }
}
