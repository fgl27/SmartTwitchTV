package com.fgl27.twitchtv.listener

import android.content.Context
import android.support.design.widget.TabLayout
import android.util.Log
import com.google.android.exoplayer2.Format
import com.google.android.exoplayer2.audio.AudioRendererEventListener
import com.google.android.exoplayer2.decoder.DecoderCounters

class AudioEventListener(private val context: Context) : AudioRendererEventListener{

    override fun onAudioSinkUnderrun(bufferSize: Int, bufferSizeMs: Long, elapsedSinceLastFeedMs: Long) {
        Log.d(TAG, "on audio Enabled ----->$bufferSize$elapsedSinceLastFeedMs")

    }

    override fun onAudioEnabled(counters: DecoderCounters?) {
        Log.d(TAG,"on audio Enabled ----->$counters")

    }

    override fun onAudioInputFormatChanged(format: Format?) {
    }

    override fun onAudioSessionId(audioSessionId: Int) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun onAudioDecoderInitialized(decoderName: String?, initializedTimestampMs: Long, initializationDurationMs: Long) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun onAudioDisabled(counters: DecoderCounters?) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    companion object {
        private val TAG = AudioEventListener::class.java.name
    }
}
