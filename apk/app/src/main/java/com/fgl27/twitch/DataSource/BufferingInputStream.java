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

package com.fgl27.twitch.DataSource;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * An InputStream wrapper that buffers all data read from the underlying stream.
 * This allows us to capture playlist content for parsing while ExoPlayer reads normally.
 */
public class BufferingInputStream extends InputStream {
    private final InputStream wrapped;
    private final ByteArrayOutputStream buffer;
    private final int maxBufferSize;
    private boolean closed = false;

    /**
     * Creates a buffering input stream.
     *
     * @param wrapped The underlying input stream to wrap.
     * @param maxBufferSize Maximum size to buffer (to avoid memory issues with large files).
     *                      Use 0 for unlimited (not recommended for non-playlist content).
     */
    public BufferingInputStream(InputStream wrapped, int maxBufferSize) {
        this.wrapped = wrapped;
        this.maxBufferSize = maxBufferSize;
        this.buffer = new ByteArrayOutputStream();
    }

    @Override
    public int read() throws IOException {
        if (closed) {
            throw new IOException("Stream closed");
        }
        int b = wrapped.read();
        if (b != -1 && (maxBufferSize == 0 || buffer.size() < maxBufferSize)) {
            buffer.write(b);
        }
        return b;
    }

    @Override
    public int read(byte[] b, int off, int len) throws IOException {
        if (closed) {
            throw new IOException("Stream closed");
        }
        int read = wrapped.read(b, off, len);
        if (read > 0 && (maxBufferSize == 0 || buffer.size() < maxBufferSize)) {
            int bytesToWrite = read;
            if (maxBufferSize > 0 && buffer.size() + bytesToWrite > maxBufferSize) {
                bytesToWrite = maxBufferSize - buffer.size();
            }
            if (bytesToWrite > 0) {
                buffer.write(b, off, bytesToWrite);
            }
        }
        return read;
    }

    @Override
    public void close() throws IOException {
        if (!closed) {
            closed = true;
            wrapped.close();
        }
    }

    /**
     * Gets the buffered content as a byte array.
     * Should be called after reading is complete.
     *
     * @return The buffered content, or empty array if nothing was read.
     */
    public byte[] getBufferedContent() {
        return buffer.toByteArray();
    }

    /**
     * Gets the buffered content as a string (UTF-8).
     * Should be called after reading is complete.
     *
     * @return The buffered content as a string, or empty string if nothing was read.
     */
    public String getBufferedContentAsString() {
        return buffer.toString(java.nio.charset.StandardCharsets.UTF_8);
    }

    /**
     * Gets the current buffer size.
     *
     * @return The number of bytes currently buffered.
     */
    public int getBufferSize() {
        return buffer.size();
    }
}

