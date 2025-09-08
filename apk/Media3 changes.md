# AndroidX Media3 Modifications.
The goal of this readme is to track all the changes done to [AndroidX Media3](https://github.com/fgl27/media)

## Background
In order to better support all the type of playable content that Twitch has, I decided to use a custom version of [Exoplayer](https://github.com/fgl27/ExoPlayer) that I modify myself.
After a few years using Exoplayer I had to migrate to Media3 because Exoplayer was deprecated.
AndroidX Media3 has the same support as Exoplayer just the way the project is delivered is a little different.

## Changes

### [Disabled performance check](https://github.com/fgl27/media/commit/82df34f3627d56397c71cd1762b1f422c18eadf5)
Some devices don’t report proper Capabilities, which causes the player to select the wrong quality at a lower resolution then the device is capable of playing, we can skip the check as is not needed.
Update [Remove Util.SDK_INT usage in MediaCodecInfo](https://github.com/fgl27/media/commit/4d0e6705a28d55c82787ed4c2870dd3efa8b5749)

### [Improve DEFAULT_INITIAL_BITRATE_ESTIMATES_WIFI](https://github.com/fgl27/media/commit/82df34f3627d56397c71cd1762b1f422c18eadf5)
The default values are too low for standard 1080p streams, when the app first start the playback starts at a lower resolution, the problem also happens after the user changes the content being played, in this change we  just change the initial values to be higher if the player does identify that the internet bandwidth is too low it will lower the quality otherwise will just play the best possible,

### [Add support for LowLatency](https://github.com/fgl27/media/commit/f09b49b1a87ef3b4657a3e37ded2d010746b297f)
Twitch provides on their website a feature called LowLatency, that is a way to play the stream as close to the live window as possible.
On this change we implemented a similar approach that works with Media3, Twitch implementation is different. They use a modified version of the m3u implementation, something Media3 implementation doesn’t support, that is why we create this change.

### [Add support for LowLatency](https://github.com/fgl27/media/commit/4e9f78f610547da6265503f834c472837e5bf181)
When the player is buffering after it is playing it isn't paused, but if we check if playing it also isn't playing.
This change allows the playback state to be detected as playing if we are playing and buffering.
This is the old behavior of the Exoplayer implementation, that was changed sometime ago. This just keeps the app working as expected as it depends on proper state identification of playing or not playing.
