package com.fgl27.twitch;

import android.content.Context;
import android.util.Log;

public final class CrashlyticsHelper {

    public static void init(Context context) {
    }

    public static void recordException(String TAG, String message, Throwable e) {
        if (e != null) {
            Log.w(TAG, message, e);
        } else {
            Log.w(TAG, message);
        }
    }

    public static void sendUnsentReports() {
    }
}