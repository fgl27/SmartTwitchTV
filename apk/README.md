SmartTV Twitch AndroidTV APK
==============

This is the apk to run the web app on android TV

Download
==============

[Google Play](https://play.google.com/store/apps/details?id=com.fgl27.twitch)

[Download apk from last release version](https://github.com/fgl27/SmartTwitchTV/releases)

## Download/Clone & Build

``` bash
$ git clone git://github.com/fgl27/SmartTwitchTV.git
$ git clone git://github.com/fgl27/ExoPlayer.git
$ cd SmartTwitchTV/apk
$ ./gradlew assembleDebug
```

**Make sure SmartTwitchTV and ExoPlayer repo are cloned in to the same folder**<br>
**Android Studio build is supported**<br>

The reason to build **ExoPlayer** from source is because is necessary manly this change [HlsMediaPlaylist hardcoded targetDurationUs to 1s](https://github.com/fgl27/ExoPlayer/commit/0d05b9aa0e8e736ec82d65316694ce4f3aaf0aeb) to achieve a smooth playback experience , plus I add minor changes to **ExoPlayer** [ExoPlayer/commits?author=fgl27](https://github.com/fgl27/ExoPlayer/commits?author=fgl27), **ExoPlayer** supports all possible devices, but here I'm only supporting TV devices using SDK 22 and up, so we can update some dependencies without worry on old SDK devices support/workarounds plus I may add a improve here or there when I see feet, plus the branch used is the [dev-v2](https://github.com/fgl27/ExoPlayer/commits/dev-v2) that has the latest improves and fixes.

Project Apk Dependencies
==============
* [Google: Leanback v17](https://developer.android.com/reference/android/support/v17/leanback/package-summary)
* [Google: ExoPlayer](https://github.com/google/ExoPlayer)
* [ben-manes: gradle-versions-plugin](https://github.com/ben-manes/gradle-versions-plugin)


[Check main readme for more info](https://github.com/fgl27/SmartTwitchTV#smarttwitchtv)

