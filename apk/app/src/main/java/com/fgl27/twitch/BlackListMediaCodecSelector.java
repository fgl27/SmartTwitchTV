//https://github.com/tadaam-tv/react-native-video/blob/master/android-exoplayer/src/main/java/com/brentvatne/exoplayer/BlackListMediaCodecSelector.java

package com.fgl27.twitch;

import androidx.annotation.NonNull;

import com.google.android.exoplayer2.mediacodec.MediaCodecInfo;
import com.google.android.exoplayer2.mediacodec.MediaCodecSelector;
import com.google.android.exoplayer2.mediacodec.MediaCodecUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;


public class BlackListMediaCodecSelector implements MediaCodecSelector {

    private final String[] BLACKLISTEDCODECS;

    public BlackListMediaCodecSelector(String[] BLACKLISTEDCODECS) {
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
        boolean blacklisted;

        for (MediaCodecInfo codecInfo : codecInfoList) {
            blacklisted = false;
            for (String blackListedCodec : BLACKLISTEDCODECS) {
                if (codecInfo != null && codecInfo.name.toLowerCase(Locale.US).contains(blackListedCodec.toLowerCase(Locale.US))) {
                    blacklisted = true;
                    break;
                }
            }
            if (!blacklisted) {
                filteredCodecInfo.add(codecInfo);
            }
        }
        return filteredCodecInfo;
    }

}
