package com.fgl27.twitch;

import android.content.Context;
import android.util.Log;

import com.google.firebase.FirebaseApp;
import com.google.firebase.crashlytics.FirebaseCrashlytics;

public final class CrashlyticsHelper {

    public static void init(Context context) {
        FirebaseApp.initializeApp(context);
        FirebaseCrashlytics.getInstance().setCrashlyticsCollectionEnabled(true);
    }

    public static void recordException(String TAG, String message, Throwable e) {
        try {
            FirebaseCrashlytics.getInstance().log(TAG + " " + message);
            if (e != null) {
                FirebaseCrashlytics.getInstance().recordException(e);
                Log.w(TAG, message, e);
            } else {
                FirebaseCrashlytics.getInstance().recordException(new RuntimeException(TAG + " e " + message));
                Log.w(TAG, message);
            }
            FirebaseCrashlytics.getInstance().sendUnsentReports();
        } catch (Exception ignore) {
        }
    }

    public static void sendUnsentReports() {
        try {
            FirebaseCrashlytics.getInstance().sendUnsentReports();
        } catch (Exception ignore) {
        }
    }
}