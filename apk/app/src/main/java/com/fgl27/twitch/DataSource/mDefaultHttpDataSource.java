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
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.annotation.VisibleForTesting;

import com.google.android.exoplayer2.C;
import com.google.android.exoplayer2.upstream.BaseDataSource;
import com.google.android.exoplayer2.upstream.DataSourceException;
import com.google.android.exoplayer2.upstream.DataSpec;
import com.google.android.exoplayer2.upstream.DefaultHttpDataSource;
import com.google.android.exoplayer2.upstream.HttpDataSource;
import com.google.android.exoplayer2.util.Assertions;

import java.io.ByteArrayInputStream;
import java.io.EOFException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InterruptedIOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.NoRouteToHostException;
import java.net.URL;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;
import java.util.zip.GZIPInputStream;

import static com.google.android.exoplayer2.upstream.DefaultHttpDataSource.handleRedirect;

public class mDefaultHttpDataSource extends BaseDataSource implements HttpDataSource {

    private static final String TAG = "DefaultHttpDataSource";
    private static final int MAX_REDIRECTS = 20; // Same limit as okhttp.
    private static final int HTTP_STATUS_TEMPORARY_REDIRECT = 307;
    private static final int HTTP_STATUS_PERMANENT_REDIRECT = 308;
    private static final AtomicReference<byte[]> skipBufferReference = new AtomicReference<>();
    private final String masterPlaylistString;
    private final Uri uri;
    private final boolean allowCrossProtocolRedirects;
    private final int connectTimeoutMillis;
    private final int readTimeoutMillis;
    private final String userAgent;
    @Nullable
    private final RequestProperties defaultRequestProperties;
    private final RequestProperties requestProperties;

    @Nullable
    private DataSpec dataSpec;
    @Nullable
    private HttpURLConnection connection;
    @Nullable
    private InputStream inputStream;
    private boolean opened;
    private int responseCode;

    private long bytesToSkip;
    private long bytesToRead;

    private long bytesSkipped;
    private long bytesRead;

    public mDefaultHttpDataSource(
            String userAgent,
            int connectTimeoutMillis,
            int readTimeoutMillis,
            boolean allowCrossProtocolRedirects,
            @Nullable RequestProperties defaultRequestProperties,
            String masterPlaylist,
            Uri uri) {
        super(/* isNetwork= */ true);
        this.userAgent = Assertions.checkNotEmpty(userAgent);
        this.requestProperties = new RequestProperties();
        this.connectTimeoutMillis = connectTimeoutMillis;
        this.readTimeoutMillis = readTimeoutMillis;
        this.allowCrossProtocolRedirects = allowCrossProtocolRedirects;
        this.defaultRequestProperties = defaultRequestProperties;
        this.masterPlaylistString = masterPlaylist;
        this.uri = uri;
    }

    @Override
    @Nullable
    public Uri getUri() {
        return connection == null ? null : Uri.parse(connection.getURL().toString());
    }

    @Override
    public int getResponseCode() {
        return connection == null || responseCode <= 0 ? -1 : responseCode;
    }

    @Override
    public Map<String, List<String>> getResponseHeaders() {
        return connection == null ? Collections.emptyMap() : connection.getHeaderFields();
    }

    @Override
    public void setRequestProperty(String name, String value) {
        Assertions.checkNotNull(name);
        Assertions.checkNotNull(value);
        requestProperties.set(name, value);
    }

    @Override
    public void clearRequestProperty(String name) {
        Assertions.checkNotNull(name);
        requestProperties.remove(name);
    }

    @Override
    public void clearAllRequestProperties() {
        requestProperties.clear();
    }

    /**
     * Opens the source to read the specified data.
     */
    @Override
    public long open(DataSpec dataSpec) throws HttpDataSourceException {
        this.dataSpec = dataSpec;
        this.bytesRead = 0;
        this.bytesSkipped = 0;

        transferInitializing(dataSpec);

        if (dataSpec.uri.toString().equals(uri.toString())) {
            Log.d("dataSpec", "dataSpec " + dataSpec.uri.toString());

            byte[] bytes = masterPlaylistString.getBytes();

            bytesToRead = bytes.length;

            //Start the connection even if it will fail that is not a problem
            //It fails only if a connection is done after 18min of link creation
            //That is the time the stream Token last
            try {
                connection = makeConnection(dataSpec);
            } catch (IOException e) {
                // Ignore
            }

            inputStream = new ByteArrayInputStream(bytes);

        } else {

            try {
                connection = makeConnection(dataSpec);
            } catch (IOException e) {
                throw new HttpDataSourceException(
                        "Unable to connect", e, dataSpec, HttpDataSourceException.TYPE_OPEN);
            }

            String responseMessage;
            try {
                responseCode = connection.getResponseCode();
                responseMessage = connection.getResponseMessage();
            } catch (IOException e) {
                closeConnectionQuietly();
                throw new HttpDataSourceException(
                        "Unable to connect", e, dataSpec, HttpDataSourceException.TYPE_OPEN);
            }

            // Check for a valid response code.
            if (responseCode < 200 || responseCode > 299) {
                Map<String, List<String>> headers = connection.getHeaderFields();
                closeConnectionQuietly();
                InvalidResponseCodeException exception =
                        new InvalidResponseCodeException(responseCode, responseMessage, headers, dataSpec);
                if (responseCode == 416) {
                    exception.initCause(new DataSourceException(DataSourceException.POSITION_OUT_OF_RANGE));
                }
                throw exception;
            }

            // If we requested a range starting from a non-zero position and received a 200 rather than a
            // 206, then the server does not support partial requests. We'll need to manually skip to the
            // requested position.
            bytesToSkip = responseCode == 200 && dataSpec.position != 0 ? dataSpec.position : 0;

            // Determine the length of the data to be read, after skipping.
            boolean isCompressed = DefaultHttpDataSource.isCompressed(connection);
            if (!isCompressed) {
                if (dataSpec.length != C.LENGTH_UNSET) {
                    bytesToRead = dataSpec.length;
                } else {
                    long contentLength = DefaultHttpDataSource.getContentLength(connection);
                    bytesToRead = contentLength != C.LENGTH_UNSET ? (contentLength - bytesToSkip)
                            : C.LENGTH_UNSET;
                }
            } else {
                // Gzip is enabled. If the server opts to use gzip then the content length in the response
                // will be that of the compressed data, which isn't what we want. Always use the dataSpec
                // length in this case.
                bytesToRead = dataSpec.length;
            }

            try {
                inputStream = connection.getInputStream();
                if (isCompressed) {
                    inputStream = new GZIPInputStream(inputStream);
                }
            } catch (IOException e) {
                closeConnectionQuietly();
                throw new HttpDataSourceException(e, dataSpec, HttpDataSourceException.TYPE_OPEN);
            }
        }

        opened = true;
        transferStarted(dataSpec);

        return bytesToRead;
    }

    protected final long bytesRemaining() {
        return bytesToRead == C.LENGTH_UNSET ? bytesToRead : bytesToRead - bytesRead;
    }

    @Override
    public int read(byte[] buffer, int offset, int readLength) throws HttpDataSourceException {
        try {
            skipInternal();
            return readInternal(buffer, offset, readLength);
        } catch (IOException e) {
            throw new HttpDataSourceException(e, dataSpec, HttpDataSourceException.TYPE_READ);
        }
    }

    private int readInternal(byte[] buffer, int offset, int readLength) throws IOException {
        if (readLength == 0) {
            return 0;
        }
        if (bytesToRead != C.LENGTH_UNSET) {
            long bytesRemaining = bytesToRead - bytesRead;
            if (bytesRemaining == 0) {
                return C.RESULT_END_OF_INPUT;
            }
            readLength = (int) Math.min(readLength, bytesRemaining);
        }

        int read = inputStream.read(buffer, offset, readLength);
        if (read == -1) {
            if (bytesToRead != C.LENGTH_UNSET) {
                // End of stream reached having not read sufficient data.
                throw new EOFException();
            }
            return C.RESULT_END_OF_INPUT;
        }

        bytesRead += read;
        bytesTransferred(read);
        return read;
    }

    public void skipInternal() throws IOException {
        if (bytesSkipped == bytesToSkip) {
            return;
        }

        // Acquire the shared skip buffer.
        byte[] skipBuffer = skipBufferReference.getAndSet(null);
        if (skipBuffer == null) {
            skipBuffer = new byte[4096];
        }

        while (bytesSkipped != bytesToSkip) {
            int readLength = (int) Math.min(bytesToSkip - bytesSkipped, skipBuffer.length);
            int read = inputStream.read(skipBuffer, 0, readLength);
            if (Thread.currentThread().isInterrupted()) {
                throw new InterruptedIOException();
            }
            if (read == -1) {
                throw new EOFException();
            }
            bytesSkipped += read;
            bytesTransferred(read);
        }

        // Release the shared skip buffer.
        skipBufferReference.set(skipBuffer);
    }

    @Override
    public void close() throws HttpDataSourceException {
        try {
            if (inputStream != null) {
                DefaultHttpDataSource.maybeTerminateInputStream(connection, bytesRemaining());
                try {
                    inputStream.close();
                } catch (IOException e) {
                    throw new HttpDataSourceException(e, dataSpec, HttpDataSourceException.TYPE_CLOSE);
                }
            }
        } finally {
            inputStream = null;
            closeConnectionQuietly();
            if (opened) {
                opened = false;
                transferEnded();
            }
        }
    }

    /**
     * Closes the current connection quietly, if there is one.
     */
    private void closeConnectionQuietly() {
        if (connection != null) {
            try {
                connection.disconnect();
            } catch (Exception e) {
                Log.e(TAG, "Unexpected error while disconnecting", e);
            }
            connection = null;
        }
    }

    private HttpURLConnection makeConnection(DataSpec dataSpec) throws IOException {
        URL url = new URL(dataSpec.uri.toString());
        @DataSpec.HttpMethod int httpMethod = dataSpec.httpMethod;
        @Nullable byte[] httpBody = dataSpec.httpBody;
        long position = dataSpec.position;
        long length = dataSpec.length;
        boolean allowGzip = dataSpec.isFlagSet(DataSpec.FLAG_ALLOW_GZIP);

        if (!allowCrossProtocolRedirects) {
            // HttpURLConnection disallows cross-protocol redirects, but otherwise performs redirection
            // automatically. This is the behavior we want, so use it.
            return makeConnection(
                    url,
                    httpMethod,
                    httpBody,
                    position,
                    length,
                    allowGzip,
                    /* followRedirects= */ true,
                    dataSpec.httpRequestHeaders);
        }

        // We need to handle redirects ourselves to allow cross-protocol redirects.
        int redirectCount = 0;
        while (redirectCount++ <= MAX_REDIRECTS) {
            HttpURLConnection connection =
                    makeConnection(
                            url,
                            httpMethod,
                            httpBody,
                            position,
                            length,
                            allowGzip,
                            /* followRedirects= */ false,
                            dataSpec.httpRequestHeaders);
            int responseCode = connection.getResponseCode();
            String location = connection.getHeaderField("Location");
            if ((httpMethod == DataSpec.HTTP_METHOD_GET || httpMethod == DataSpec.HTTP_METHOD_HEAD)
                    && (responseCode == HttpURLConnection.HTTP_MULT_CHOICE
                    || responseCode == HttpURLConnection.HTTP_MOVED_PERM
                    || responseCode == HttpURLConnection.HTTP_MOVED_TEMP
                    || responseCode == HttpURLConnection.HTTP_SEE_OTHER
                    || responseCode == HTTP_STATUS_TEMPORARY_REDIRECT
                    || responseCode == HTTP_STATUS_PERMANENT_REDIRECT)) {
                connection.disconnect();
                url = handleRedirect(url, location);
            } else if (httpMethod == DataSpec.HTTP_METHOD_POST
                    && (responseCode == HttpURLConnection.HTTP_MULT_CHOICE
                    || responseCode == HttpURLConnection.HTTP_MOVED_PERM
                    || responseCode == HttpURLConnection.HTTP_MOVED_TEMP
                    || responseCode == HttpURLConnection.HTTP_SEE_OTHER)) {
                // POST request follows the redirect and is transformed into a GET request.
                connection.disconnect();
                httpMethod = DataSpec.HTTP_METHOD_GET;
                httpBody = null;
                url = handleRedirect(url, location);
            } else {
                return connection;
            }
        }

        // If we get here we've been redirected more times than are permitted.
        throw new NoRouteToHostException("Too many redirects: " + redirectCount);
    }

    /**
     * Configures a connection and opens it.
     *
     * @param url               The url to connect to.
     * @param httpMethod        The http method.
     * @param httpBody          The body data, or {@code null} if not required.
     * @param position          The byte offset of the requested data.
     * @param length            The length of the requested data, or {@link C#LENGTH_UNSET}.
     * @param allowGzip         Whether to allow the use of gzip.
     * @param followRedirects   Whether to follow redirects.
     * @param requestParameters parameters (HTTP headers) to include in request.
     */
    private HttpURLConnection makeConnection(
            URL url,
            @DataSpec.HttpMethod int httpMethod,
            @Nullable byte[] httpBody,
            long position,
            long length,
            boolean allowGzip,
            boolean followRedirects,
            Map<String, String> requestParameters)
            throws IOException {
        HttpURLConnection connection = openConnection(url);
        connection.setConnectTimeout(connectTimeoutMillis);
        connection.setReadTimeout(readTimeoutMillis);

        Map<String, String> requestHeaders = new HashMap<>();
        if (defaultRequestProperties != null) {
            requestHeaders.putAll(defaultRequestProperties.getSnapshot());
        }
        requestHeaders.putAll(requestProperties.getSnapshot());
        requestHeaders.putAll(requestParameters);

        for (Map.Entry<String, String> property : requestHeaders.entrySet()) {
            connection.setRequestProperty(property.getKey(), property.getValue());
        }

        if (!(position == 0 && length == C.LENGTH_UNSET)) {
            String rangeRequest = "bytes=" + position + "-";
            if (length != C.LENGTH_UNSET) {
                rangeRequest += (position + length - 1);
            }
            connection.setRequestProperty("Range", rangeRequest);
        }
        connection.setRequestProperty("User-Agent", userAgent);
        connection.setRequestProperty("Accept-Encoding", allowGzip ? "gzip" : "identity");
        connection.setInstanceFollowRedirects(followRedirects);
        connection.setDoOutput(httpBody != null);
        connection.setRequestMethod(DataSpec.getStringForHttpMethod(httpMethod));

        if (httpBody != null) {
            connection.setFixedLengthStreamingMode(httpBody.length);
            connection.connect();
            OutputStream os = connection.getOutputStream();
            os.write(httpBody);
            os.close();
        } else {
            connection.connect();
        }
        return connection;
    }

    /**
     * Creates an {@link HttpURLConnection} that is connected with the {@code url}.
     */
    @VisibleForTesting
    /* package */ HttpURLConnection openConnection(URL url) throws IOException {
        return (HttpURLConnection) url.openConnection();
    }
}
