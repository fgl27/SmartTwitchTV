package com.fgl27.twitchtv.listener;

import android.os.Environment;
import android.util.Log;
import com.google.android.exoplayer2.upstream.BandwidthMeter;

import java.io.File;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

public class BandWidthListener implements BandwidthMeter.EventListener {
    ViewControlInterface viewControlInterface;

    public BandWidthListener(ViewControlInterface viewControlInterface) {
        this.viewControlInterface = viewControlInterface;
    }

    @Override
    public void onBandwidthSample(int elapsedMs, long bytes, long bitrate) {
        viewControlInterface.catchBufferPosition();
        Log.d("FRNT Bandwidth listener",elapsedMs+","+bytes+","+bitrate);
    }

}
