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

The reason to build **ExoPlayer** from source is because I made changes to improve the performance and to add some features [ExoPlayer/commits?author=fgl27](https://github.com/fgl27/ExoPlayer/commits?author=fgl27), isn't possible to build this project using google **ExoPlayer** repo.

Project Apk Dependencies
==============
* [Google: Leanback v17](https://developer.android.com/reference/android/support/v17/leanback/package-summary)
* [Google: ExoPlayer](https://github.com/google/ExoPlayer)
* [ben-manes: gradle-versions-plugin](https://github.com/ben-manes/gradle-versions-plugin)


[Check main readme for more info](https://github.com/fgl27/SmartTwitchTV#smarttwitchtv)

