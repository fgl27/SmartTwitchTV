/*
 *  original file is from exoplayer source https://github.com/google/ExoPlayer
 *
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
package com.fgl27.twitch.DataSource;

import android.net.Uri;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.google.android.exoplayer2.upstream.HttpDataSource;
import com.google.android.exoplayer2.upstream.HttpDataSource.BaseFactory;
import com.google.android.exoplayer2.upstream.HttpDataSource.Factory;
import com.google.android.exoplayer2.upstream.TransferListener;
import com.google.android.exoplayer2.util.Assertions;

/**
 * A {@link Factory} that produces {@link mDefaultHttpDataSource} instances.
 */
public final class mDefaultHttpDataSourceFactory extends BaseFactory {

    private final String userAgent;
    @Nullable
    private final TransferListener listener;
    private final int connectTimeoutMillis;
    private final int readTimeoutMillis;
    private final boolean allowCrossProtocolRedirects;
    private final String masterPlaylistString;
    private final Uri uri;

    public mDefaultHttpDataSourceFactory(
            String userAgent,
            @Nullable TransferListener listener,
            int connectTimeoutMillis,
            int readTimeoutMillis,
            boolean allowCrossProtocolRedirects,
            String masterPlaylist,
            Uri uri) {
        this.userAgent = Assertions.checkNotEmpty(userAgent);
        this.listener = listener;
        this.connectTimeoutMillis = connectTimeoutMillis;
        this.readTimeoutMillis = readTimeoutMillis;
        this.allowCrossProtocolRedirects = allowCrossProtocolRedirects;
        this.masterPlaylistString = masterPlaylist;
        this.uri = uri;
    }

    @Override
    protected mDefaultHttpDataSource createDataSourceInternal(
            @NonNull HttpDataSource.RequestProperties defaultRequestProperties) {
        mDefaultHttpDataSource dataSource =
                new mDefaultHttpDataSource(
                        userAgent,
                        connectTimeoutMillis,
                        readTimeoutMillis,
                        allowCrossProtocolRedirects,
                        defaultRequestProperties,
                        masterPlaylistString,
                        uri
                );
        if (listener != null) {
            dataSource.addTransferListener(listener);
        }
        return dataSource;
    }
}
