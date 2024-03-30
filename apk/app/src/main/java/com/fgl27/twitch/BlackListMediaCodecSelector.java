/*
 * Copyright (c) 2017-2020 Felipe de Leon <fglfgl27@gmail.com>
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
 *
 */

//Original idea
//https://github.com/tadaam-tv/react-native-video/blob/master/android-exoplayer/src/main/java/com/brentvatne/exoplayer/BlackListMediaCodecSelector.java

package com.fgl27.twitch;

import androidx.annotation.NonNull;

import androidx.media3.exoplayer.mediacodec.MediaCodecInfo;
import androidx.media3.exoplayer.mediacodec.MediaCodecSelector;
import androidx.media3.exoplayer.mediacodec.MediaCodecUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;


public class BlackListMediaCodecSelector implements MediaCodecSelector {

    private final String[] BLACKLISTEDCODECS;

    BlackListMediaCodecSelector(String[] BLACKLISTEDCODECS) {
        this.BLACKLISTEDCODECS = BLACKLISTEDCODECS;
    }

    @NonNull
    @Override
    public List<MediaCodecInfo> getDecoderInfos(@NonNull String mimeType, boolean requiresSecureDecoder, boolean requiresTunnelingDecoder)
            throws MediaCodecUtil.DecoderQueryException {

        List<MediaCodecInfo> codecInfoList = MediaCodecUtil.getDecoderInfos(
                mimeType,
                requiresSecureDecoder,
                requiresTunnelingDecoder
        );

        // filter codecs based on blacklist template
        List<MediaCodecInfo> filteredCodecInfo = new ArrayList<>();

        for (MediaCodecInfo codecInfo : codecInfoList) {
            if (codecInfo != null && !blacklistedCodec(codecInfo.name.toLowerCase(Locale.US))) {

                filteredCodecInfo.add(codecInfo);

            }
        }
        return filteredCodecInfo;
    }

    private boolean blacklistedCodec(String codecName) {

        for (String blackListedCodec : BLACKLISTEDCODECS) {

            if (codecName.contains(blackListedCodec)) {
                return true;
            }

        }

        return false;
    }

}
