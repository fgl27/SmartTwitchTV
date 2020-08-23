SmartTV Twitch AndroidTV APK
==============

Readme content:
==============

* [About the project](#about-the-project)
* [How the application works](#how-the-application-works)
* [Application languages and build process](#application-languages-and-build-process)
* [How to make changes and test it (in case you are making chages)](#how-to-make-changes-and-test-it)
* [Download](#download)
* [Dependencies](#dependencies)
* [Changelog](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/Changelog.md)
* [Are phones and tablets supported](#are-phones-and-tablets-supported)
* [Contributing instructions](#contributing-instructions)
* [How the application looks](#how-the-application-looks)
* [User Authorization key](#authorization)
* [Donations](#donations)


About the project:
==============

This is an web application designed to watch Twitch broadcasts on SmartTV's , A good official Twitch app is not available for most devices, that is way this project exist.

The intention of this is to make a web app that runs on all modern browser and can be easily ported to any OS that can run a web app's.

This project is a port of this repo [smarttv-twitch](https://github.com/fgl27/smarttv-twitch) using separated repo to make easier use of github pages and commit history

## About this fork

I initially fork this from https://github.com/CazuzaCzz/SmartTwitchTV/commits/tizen
The original fork is https://github.com/nikitakatchik/SmartTwitchTV

I have started this project because the above Repos of the app did not fully support my TV model and don't have all possible Twitch featuring.

I start this new repo keep the original name and commit history, work a long time writing this a new application basically from scratch focusing on performance and all available Twitch featuring, with the help of some users reporting bugs and features request, I add many features and work to resolve all the bugs, today the application is very complete, can be easily used to watch all available Twitch content and give the user a lot of extra options, but is know that the application can be always improved, new featuring and improves are always in the works, mostly to give a better experience and more options to the user, but that process is slow.

How the application works
==============

The application is splinted on two parts, a web app and apk.

### The web app

The web app is a web page [App web page](https://fgl27.github.io/SmartTwitchTV/release/index.min.html) that contains the app user interface and most of it's logic.

### The Apk

The apk holds two main views of the app, the Webview the view that loads the web app page and the [PlayerActivity](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/src/main/java/com/fgl27/twitch/PlayerActivity.java) the main app activity and the activity that holds the app players and web UI, the apk also handles the Android specific interactions that the app needs to work.<br>

### The interactions between web app and apk

The web app and the apk use a "OS interface" to communicate back and for.<br>

To the web app interact with the apk it will use [one of this function](https://github.com/fgl27/SmartTwitchTV/blob/master/app/specific/OSInterface.js) it of those function has a function on the JAVA side of the code, the java side of those functions is on the **JavascriptInterface** of the [PlayerActivity](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/src/main/java/com/fgl27/twitch/PlayerActivity.java) that **JavascriptInterface** uses the class named **public class WebAppInterface**.

To the apk communicate with the web app it will call it will call a function `WebView.loadUrl("javascript:smartTwitchTV.FUN_NAME()")` where that FUN_NAME must be one of the function exposed on the [app API](https://github.com/fgl27/SmartTwitchTV/blob/master/release/api.js)

Application languages and build process
==============

## Languages

Languages used by the app, the web app code is compose of a html, CSS and a Javascript files, to edit those files use VS code (recomendede) or any text editor. The apk code is compose of JAVA, xml and basic build files use android Studio to edit and build apk.

## build process

The web app and the apk need to be build/generated here is a simple explanation on how that is done.<br>

## The web app

The web app files are locate here [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) but that is not direct the code that app uses, to generate the final code first is need to process those files, for that process is used this script [release_maker.sh](https://github.com/fgl27/SmartTwitchTV/blob/master/release/scripts/release_maker.sh).

How that process works is divided on it language...

### Javascript

The script process the Javascript code from this folder [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) plus this file [app API](https://github.com/fgl27/SmartTwitchTV/blob/master/release/api.js), on that process the script will validate the code checking for error and general code miss use, if the validation pass the Javascript code will be mangle and compressed [to this files](https://github.com/fgl27/SmartTwitchTV/tree/master/release/githubio/js).

### Html

The html files from this folder [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) will processed and compressed [to this files](https://github.com/fgl27/SmartTwitchTV/tree/master/release).

### CSS

The CSS files [this folder](https://github.com/fgl27/SmartTwitchTV/tree/master/release/githubio/css) from will processed and compressed the same folder.<br>

If all the process finises OK the scrip will inform with of those files changed in relation to the last time the script run, a commit can be pushed to update those files on the repo, every time that the apk start those files will downloaded by the app, this way the majority of the app Logic and UI can be updated without having to push a new apk.

## The apk

The apk files, [those files are located here](https://github.com/fgl27/SmartTwitchTV/tree/master/apk), because the app uses a modified version of ExoPlayer the player API there is also [this fork of ExoPlayer](https://github.com/fgl27/ExoPlayer).<br>

To build the apk:

* Create a new folder (the name is irrelevant) inside of that folder...
* [Download or clone app source](https://github.com/fgl27/SmartTwitchTV), if download make sure you extract the app to the new folder
* [Download or clone ExoPlayer source](https://github.com/fgl27/ExoPlayer), if download make sure you extract the app to the new folder
* Install android studio after open it and add a new project ... File -> Open... Select the folder [SmartTwitchTV/apk](https://github.com/fgl27/SmartTwitchTV/tree/master/apk)
* Wait studio load and download all app dependencies, if it ask to install extra dependencies follow it's instructions
* If you have any problem after this step try to google as the project is solely build using Android Studio so it must work for you, but if you have a problem that you can't solve [open a issue](https://github.com/fgl27/SmartTwitchTV/issues/new/choose).
* Building the apk, on studio, Build -> Build Bundle(s) / APK(s) -> Build APK(s)... if all OK after a few moments a app will be generated studio will let you click to show where that apk is generated to.

How to make changes and test it
==============

To make changes on the web app, edit the files from [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app), to test those changes just open the file smartTwitchTV/app/index.html on a browser preferably Chrome (the Webview that the app uses use the same web interface as Chrome).

If the changes that you are making are on a part of the app that interacts with the apk you must be changing functions that use functions of this file [OSInterface.js](https://github.com/fgl27/SmartTwitchTV/blob/master/app/specific/OSInterface.js), in order to test those changes/functions you can build the app and included the [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) inside the app assets. To do that copy the [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) to the `assets` folder [create that folder here](https://github.com/fgl27/SmartTwitchTV/tree/master/apk/app/src/main), after before build modify [Constants.java](the https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/src/main/java/com/fgl27/twitch/Constants.java) file, un-comment the two lines `//final static String PageUrl` and `//final static String KeyPageUrl` and comment-out the next two lines that are from the same variables. Now build the app and test yours changes.

To make changes to the app apk, just use the studio to make the changes and follow the build process to make a app.


Download
==============

If you are using this on a Android TV device install it from play Google Play, if you can't see the app on the store use the release version, you can't install the release apk if you already have the play store apk installed and vice versa.

[Google Play](https://play.google.com/store/apps/details?id=com.fgl27.twitch)

[Download apk from last release version](https://github.com/fgl27/SmartTwitchTV/releases)

Dependencies
==============

## Web Dependencies

* [crass - A CSS minification, pretty printing, and general utility library written in JS](https://github.com/mattbasta/crass)
* [Fontastic - Create your customized icon fonts in seconds](http://app.fontastic.me)
* [HTMLMinifier - is a highly configurable, well-tested, JavaScript-based HTML minifier](https://github.com/kangax/html-minifier)
* [irc-message - Performant, streaming IRC message parser](https://github.com/sigkell/irc-message)
* [JSHint - A Static Code Analysis Tool for JavaScript](https://github.com/jshint/jshint)
* [punycode - A robust Punycode converter that fully complies to RFC 3492 and RFC 5891](https://github.com/bestiejs/punycode.js)
* [Twemoji - A simple library that provides standard Unicode emoji support across all platforms](https://github.com/twitter/twemoji)
* [Twitch Developer Documentation](https://dev.Twitch/docs/)
* [UglifyJS - is a JavaScript parser, minifier, compressor and beautifier toolkit](https://github.com/mishoo/UglifyJS2)

## Apk Dependencies

* [ExoPlayer: An extensible media player for Android](https://github.com/google/ExoPlayer)
* [Gradle Versions Plugin: Gradle plugin to discover dependency updates](https://github.com/ben-manes/gradle-versions-plugin)
* [Gson: Gson is a Java library that can be used to convert Java Objects into their JSON representation.](https://github.com/google/gson)
* [Leanback v17: Support classes for building Leanback user experiences](https://developer.android.com/reference/android/support/v17/leanback/package-summary)
* [Tray: a SharedPreferences replacement for Android](https://github.com/grandcentrix/tray)

Are phones and tablets supported?
==============

Yes but is limited, you need to use the APK from [release](https://github.com/fgl27/SmartTwitchTV/releases) and manually install the APK. Be aware that this app is design to be used mainly on TVs, the support for other device is limited and may never receive a better support, if you don't have a keyboard or a D-pad + enter key controller use the on screen virtual D-pad + back key to navigate, in settings you can change position and opacity of the virtual D-pad, click anywhere on the screen to show the virtual D-pad when it is hidden it doesn't work.

Contributing instructions
==============

Any Help is welcome you can use a github PR, [issue](https://github.com/fgl27/SmartTwitchTV/issues/new/choose) or send a [email](mailto:fglfgl27@gmail.com).

[How the application looks](https://github.com/fgl27/SmartTwitchTV/tree/master/screenshot)
==============

The application never stops receiving updates the bellow video may be outdated
[![How the application looks](https://fgl27.github.io/SmartTwitchTV/screenshot/Screenshot_you.png)](http://www.youtube.com/watch?v=LA2x1c-BOJg)

Authorization
==============

The user can add a authorization key (not demanding to use the app), here is the complete description of what that keys is and how it's used by the app.<br>
That key will be used to access Twitch specific content of that user, it permission requested has a reason and bellow is the full description of what it permission will be used for:<br>

### when accessing Twitch authorization site it will show:

	SmartTV Android TV by fgl27
	wants to access your account
	
	This will allow SmartTV Android TV by fgl27 to:
	* Manage your followed channels
	* Send live Stream Chat and Rooms messages
	* View your email address
	* View your paid subscriptions
	* View live Stream Chat and Rooms messages

**The app uses the following permission:**

* user_read, user_follows_edit, user_subscriptions, chat:edit, chat:read they are summarized here [authentication twitch-api-v5](https://dev.Twitch/docs/authentication#twitch-api-v5)<br>

**How the app uses it individual permission:**

**Manage your followed channels:**

* The permission used for this is **user_follows_edit** the API used on this is [Follow Channel](https://dev.Twitch/docs/v5/reference/users/#follow-channel)
* Allow to follow or unfollow streamers or games for that user (unfollow a game is current not supported by Twitch for third party app, but follow is).<br>

**Send live Stream Chat and Rooms messages:**

* The permission used for this is **chat:edit** the API used on this is [Connecting to Twitch IRC](https://dev.Twitch/docs/irc/guide/#connecting-to-twitch-irc)
* Allows access so you can use the app to logging in on Twitch chat using yours username to send chat messages.
* Also enable you to receive gifted sub give for user in chat.<br>

**View your email address:**

* The permission used for this is **user_read** the API used on this is [Get Followed Streams](https://dev.Twitch/docs/v5/reference/streams#get-followed-streams)
* Email will not be read! (you can search the source code if you are in doubt no user email is accessed), this permission has many uses, as the above API, it allows to access user live channels list in a faster way, the app can load user live list without this but it can be really slow if you follow too many streamers (100+ you already notice the slow down).<br>

**View your paid subscriptions:**

* The permission used for this is **user_subscriptions** the API's used on this are [Get User Emotes](https://dev.Twitch/docs/v5/reference/users/#get-user-emotes ) and [Check User Subscription by Channel](https://dev.Twitch/docs/v5/reference/users#check-user-subscription-by-channel)
* Allows to get yours emotes list from all subscriptions you have, even if you aren't sub to a channel this is needed to get yours available Twitch emotes, this list will be used on the write to chat implementation.
* Allows to check if you are sub to a particularly channel, that information is used to give a on screen warning when a content is block for Sub-only (a Sub-only chat ROOM (write mode, read will always work) or a VOD for example) and you don't have access because you aren't a sub of a particularly channel (unfortunately twitch has blocked all third party app's to access sub-only VOD's so this warning will let you know that, on the past that wasn't a issue for sub-only VOD's)<br>

**View live Stream Chat and Rooms messages:**

* The permission used for this is **chat:read** the API used on this is [Connecting to Twitch IRC](https://dev.Twitch/docs/irc/guide/#connecting-to-twitch-irc)
* Allows access so you can use the app to logging in on Twitch chat using yours username to read chat messages as yours user (technically the app can read chat without a user but the bellow option will not work on that case as the login is as anonymous).
* Also enable you to receive gifted sub give for user in chat.<br>

Donations
==============

![Main](https://fgl27.github.io/SmartTwitchTV/screenshot/paypal.png) **Paypal email link (clickable donation link):** [fglfgl27@gmail.com](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=fglfgl27@gmail.com&lc=US&no_note=0&item_name=Donate+to+thanks+for+the+Twitch+app&cn=&curency_code=USD&bn=PP-DonationsBF:btn_donateCC_LG.gif:NonHosted)
#
![Main](https://fgl27.github.io/SmartTwitchTV/screenshot/bitcoin.png)**Bitcoin walet adress (or use bellow QR code):** 1DuhCT6L3VfBtFcS8FNfVXgBzE2rwCPx3x

![Main](https://fgl27.github.io/SmartTwitchTV/screenshot/chart.png)

## In doubt [open a issue](https://github.com/fgl27/SmartTwitchTV/issues/new/choose)

