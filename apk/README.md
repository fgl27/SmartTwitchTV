SmartTV Twitch AndroidTV APK
==============

This is the apk to run the web app on android TV

Are phones and tablets supported?
==============

Yes but is limited, you need to use the APK from [release](https://github.com/fgl27/SmartTwitchTV/releases) and manually install the APK. Be aware that this app is design to be used mainly on TVs, the support for other device is limited and may never receive a better support, if you don't have a keyboard or a D-pad + enter key controller use the on screen virtual D-pad + back key to navigate, in settings you can change position and opacity of the virtual D-pad, click anywhere on the screen to show the virtual D-pad when it is hidden it doesn't work.

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

