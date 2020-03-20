/*
 *  original file is from exoplayer source https://github.com/google/ExoPlayer
 *
 *  original License:
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

import android.content.Context;
import android.net.Uri;

import androidx.annotation.Nullable;

import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DataSource.Factory;
import com.google.android.exoplayer2.upstream.DefaultDataSource;
import com.google.android.exoplayer2.upstream.TransferListener;

/**
 * A {@link Factory} that produces {@link DefaultDataSource} instances that delegate to
 * {@link mDefaultHttpDataSource}s for non-file/asset/content URIs.
 */
public final class mDefaultDataSourceFactory implements Factory {

    private final Context context;
    @Nullable
    private final TransferListener listener;
    private final DataSource.Factory baseDataSourceFactory;

    public mDefaultDataSourceFactory(Context context, String userAgent, String masterPlaylist, Uri uri) {
        this(context, userAgent, /* listener= */ null, masterPlaylist, uri);
    }

    public mDefaultDataSourceFactory(
            Context context, String userAgent, @Nullable TransferListener listener, String masterPlaylist, Uri uri) {
        this(context, listener, new mDefaultHttpDataSourceFactory(userAgent, listener, masterPlaylist, uri));
    }

    public mDefaultDataSourceFactory(
            Context context,
            @Nullable TransferListener listener,
            DataSource.Factory baseDataSourceFactory) {
        this.context = context.getApplicationContext();
        this.listener = listener;
        this.baseDataSourceFactory = baseDataSourceFactory;
    }

    @Override
    public DefaultDataSource createDataSource() {
        DefaultDataSource dataSource =
                new DefaultDataSource(context, baseDataSourceFactory.createDataSource());
        if (listener != null) {
            dataSource.addTransferListener(listener);
        }
        return dataSource;
    }

}
