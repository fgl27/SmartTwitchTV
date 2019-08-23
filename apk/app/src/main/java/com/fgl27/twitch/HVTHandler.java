// https://raw.githubusercontent.com/Petrakeas/HVTHandler/master/HVTHandler.java
package com.fgl27.twitch;

import android.os.Handler;
import android.os.Looper;

/**
 * A helper class that provides more ways to post a runnable than {@link android.os.Handler}.
 */
public final class HVTHandler {

    private static class NotifyRunnable implements Runnable {
        private final Runnable mRunnable;
        private boolean mFinished = false;

        private NotifyRunnable(final Runnable r) {
            mRunnable = r;
        }

        private boolean isFinished() {
            return mFinished;
        }

        @Override
        public void run() {
            synchronized (this) {
                mRunnable.run();
                mFinished = true;
                this.notifyAll();
            }
        }
    }

    /**
     * Posts a runnable on a handler's thread and returns a RunnableResult object that can be used to
     * get a return value.
     * <p>
     * You should set the return value by setting {@link RunnableValue#value} in the
     * {@link RunnableValue#run()} method. You can retrieve it on the calling thread using
     * {@link RunnableResult#get()}.
     * <p>
     * The handler may be on the same or a different thread than the one calling this method.
     *
     * @return a RunnableResult instance that can be used to retrieve the return value
     */
    public static <T> RunnableResult<T> post(final Handler handler, final RunnableValue<T> r) {
        NotifyRunnable runnable = new NotifyRunnable(r); // we use the runnable as synchronization object
        RunnableResult<T> result = new RunnableResult<>(r, runnable);
        if (handler.getLooper() == Looper.myLooper()) {
            r.run();
        } else {
            handler.post(runnable);
        }
        return result;
    }

    /**
     * A runnable that also has a variable that can be used to return a value.
     * <p>
     * In your {@link #run()} implementation you should set the return value to {@link #value}.
     *
     * @param <T> the type of the return value.
     */
    public static abstract class RunnableValue<T> implements Runnable {
        public T value;
    }

    /**
     * The result of the runnable. You should call {@link #get()} to retrieve the result.
     */
    public static class RunnableResult<T> {
        private final RunnableValue<T> mRunnable;
        private final NotifyRunnable mNotifyRunnable;

        private RunnableResult(final RunnableValue<T> r, final NotifyRunnable notifyRunnable) {
            mRunnable = r;
            mNotifyRunnable = notifyRunnable;
        }

        /**
         * Get the return value. Blocks until the runnable has finished running.
         */
        public T get() {
            synchronized (mNotifyRunnable) {
                while (!mNotifyRunnable.isFinished()) {
                    try {
                        mNotifyRunnable.wait();
                    } catch (InterruptedException is) {
                        // ignore
                    }
                }
            }
            return mRunnable.value;
        }
    }
}
