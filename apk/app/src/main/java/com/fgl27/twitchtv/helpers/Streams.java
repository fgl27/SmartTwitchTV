//copied https://github.com/yuliskov/SmartYouTubeTV

package com.fgl27.twitchtv.helpers;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
public final class Streams {
    private Streams() {}

    public static byte[] readFully(InputStream in ) throws IOException {
        try {
            return readFullyNoClose( in );
        } finally {
            in .close();
        }
    }
    
    // Returns a byte[] containing the remainder of 'in'.
     
    private static byte[] readFullyNoClose(InputStream in) throws IOException {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int count;
        while ((count = in .read(buffer)) != -1) {
            bytes.write(buffer, 0, count);
        }
        return bytes.toByteArray();
    }
}
