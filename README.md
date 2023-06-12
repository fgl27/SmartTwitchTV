**SmartTV Twitch AndroidTV APK**

-   [About the project](#about-the-project)
-   [About this fork](#about-this-fork)
-   [How the application works](#how-the-application-works)
    -   [The web app](#the-web-app)
    -   [The Apk](#the-apk)
    -   [The interactions between web app and apk](#the-interactions-between-web-app-and-apk)
-   [How the application looks](#how-the-application-looks)
-   [How to translate this](#how-to-translate-this)
    -   [How to translate and test?](#how-to-translate-and-test)
    -   [Translate](#translate)
    -   [Testing app/languages/en_US.js](#testing-applanguagesen_usjs)
    -   [Testing apk/app/src/main/res/values/strings.xml](#testing-apkappsrcmainresvaluesstringsxml)
    -   [How to send the files](#how-to-send-the-files)
-   [Download](#download)
-   [Dependencies](#dependencies)
    -   [Web Dependencies](#web-dependencies)
    -   [Apk Dependencies](#apk-dependencies)
-   [Are phones and tablets supported?](#are-phones-and-tablets-supported)
-   [Authorization](#authorization)
    -   [when accessing Twitch authorization site after adding yours credential (User and password) you will see the bellow information](#when-accessing-twitch-authorization-site-after-adding-yours-credential-user-and-password-you-will-see-the-bellow-information)
-   [How to build, languages and etc related](#how-to-build-languages-and-etc-related)
    -   [Code Languages used by the project](#code-languages-used-by-the-project)
    -   [How to Build](#how-to-build)
    -   [Building The web app](#building-the-web-app)
    -   [Javascript (building The web app)](#javascript-building-the-web-app)
    -   [Html (building The web app)](#html-building-the-web-app)
    -   [CSS (building The web app)](#css-building-the-web-app)
    -   [Build The apk](#build-the-apk)
-   [Contributing instructions](#contributing-instructions)
-   [How to make changes and test it](#how-to-make-changes-and-test-it)
-   [Changelog](#changelog)
-   [TODO list](#todo-list)
-   [Donations](#donations)
-   [In doubt open a issue](#in-doubt-open-a-issue)

## About the project

This is an web application designed to give access to Twitch features on SmartTV's, a official Twitch app is not available for most devices, that is why this project exist.

The intention of this is to make a web app that works on all modern browser and can be easily ported to any OS that can run a web app.

This app has no affiliation with Twitch, this is a user made app, but is only possible because Twitch provide all the API that allows the app to show Twitch content.

Those API are documented here:

[Twitch Developer Documentation](https://dev.twitch.tv/docs/)

This app has be registered to access Twitch API, that registration process is described here:

[Twitch Registration process](https://dev.twitch.tv/docs/authentication#registration)

This project is the main project of two Twitch project I current maintain, originally I start working on the [smarttv-twitch](https://github.com/fgl27/smarttv-twitch) repo, I'm using separated repos to make easier use of GitHub pages and commit history.

The original project runs on Samsung Tizen OS, with is very limited because of that the Android version has become the main project, not all features of the Android project can be ported to the Samsung one, but from time to time I will port the features from the Android version to the Samsung version.

## About this fork

I initially fork this from https://github.com/CazuzaCzz/SmartTwitchTV/commits/tizen
The original fork is https://github.com/nikitakatchik/SmartTwitchTV

I have started this project because the above repos of the app did not fully support my TV model (at the time this was a Samsung Tizen OS only project) and didn't had all possible Twitch featuring.

I keep the original name and commit history but not as a fork simply because I made so may changes that makes no sense to call this a fork, I have made an new application from scratch focusing on performance and all available Twitch featuring, with the help of users and contributors reporting bugs and asking for features the app became what is today, a app that can be easily used to watch all available Twitch content and give the user a lot of extra options, but is know that the application can be improved new featuring and improves are always in the works, mostly to give a better experience and more options to the user, but that process is slow mostly because there is only one person working on the project and that work is done for free on spare time.

## How the application works

The application is splinted in two parts, a web app and Android apk.

### The web app

The web app is a web page [Click here to access it](https://fgl27.github.io/SmartTwitchTV/release/index.html), this page contains the app user interface and most of the app logic.

### The Apk

The apk holds two main views of the app, the Webview the view that loads the web app page and the [PlayerActivity](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/src/main/java/com/fgl27/twitch/PlayerActivity.java) the main app activity and the activity that holds the app players and web UI, the apk also handles the Android specific interactions that the app needs to make all to work.<br>

### The interactions between web app and apk

The web app and the apk use a "OS interface" to communicate back and for.<br>

To the web app interact with the apk it will use one of this function of this file [SmartTwitchTV/app/specific/OSInterface.js](https://github.com/fgl27/SmartTwitchTV/blob/master/app/specific/OSInterface.js) it of those function has a "mirror function" on the JAVA side of the code, the java side of those functions is on a **JavascriptInterface** of the [PlayerActivity](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/src/main/java/com/fgl27/twitch/PlayerActivity.java) that **JavascriptInterface** uses the class named **public class WebAppInterface** to hold all the functions.

To the apk communicate with the web app it will use this function call `WebView.loadUrl("javascript:smartTwitchTV.FUN_NAME()")` where that `FUN_NAME` must be one of the function exposed on the [app API](https://github.com/fgl27/SmartTwitchTV/blob/master/release/api.js)

In order for the app to work is necessary that back and for communication between the UI and the apk, the process is technically simple but if you never sow it at first it may seems complicated.<br>

## [How the application looks](https://github.com/fgl27/SmartTwitchTV/tree/master/screenshot)

The application never stops receiving updates the bellow video may be outdated, I try to keep a updated video always available but is not a priority
[![How the application looks](https://fgl27.github.io/SmartTwitchTV/screenshot/Screenshot_you.png)](http://www.youtube.com/watch?v=PI2yrGb3pnY)

## How to translate this

The app has two strings files:<br>

-   [app/languages/en_US.js](https://github.com/fgl27/SmartTwitchTV/blob/master/app/languages/en_US.js)
-   [apk/app/src/main/res/values/strings.xml](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/src/main/res/values/strings.xml)

Follow the bellow instruction to translate, test and send the files back.

### How to translate and test?

-   [Download and extract the app source](https://github.com/fgl27/SmartTwitchTV/archive/master.zip)
-   Navigate and open [app/languages/en_US.js](https://github.com/fgl27/SmartTwitchTV/blob/master/app/languages/en_US.js) and follow the bellow Translate and Testing steps
-   Do the same for [apk/app/src/main/res/values/strings.xml](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/src/main/res/values/strings.xml)

### Translate

-   Translate all string to yours language
-   Delete from the file any string that when translated has no difference to the original EN_US String
-   Remove from the file any string that wasn't translated and add it to a separated file name it `untranslated_js.txt` for `app/languages/en_US.js` and `untranslated_xml.txt` for `apk/app/src/main/res/values/strings.xml` make sure you inform why you didn't translate in case is a issue that needed to be resolved.
-   The files `untranslated_*.txt` are a way so in the future is easier to know with string need to be updates, as when changes are made to the original strings I may remove them from the translation so the translator know that they need a update, also new string created after the translation will be added to `untranslated_*.txt`

### Testing [app/languages/en_US.js](https://github.com/fgl27/SmartTwitchTV/blob/master/app/languages/en_US.js)

This file is part of the web app to test that file the easiest way is to:<br>

-   Open this file [app/index.html](https://github.com/fgl27/SmartTwitchTV/blob/master/app/index.html) locally on a web browser (recommended chrome) that will load the web app
-   To navigate use the keyboard arrow keys, enter and esc
-   Make sure you go to all app screens included the player (open Live, VOD and clips) and check if the translate string do not overflow and or cause the app to look odd
-   Make sure you open the fallowing side panel screens Settings, About and Controls as those are the screens that have more text so they usually need some work to make all look OK.
-   If any screen looks odd and isn't possible in any for or way to make the string to feet inform with string/screen has the problem when you share the file
-   If you wanna compare yours changes VS the original app side by side open on a new tab the [main app page](https://fgl27.github.io/SmartTwitchTV/release/index.html)

### Testing [apk/app/src/main/res/values/strings.xml](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/src/main/res/values/strings.xml)

This file is part of the apk and is technically not needed to test it, just make sure you followed the `Translate` instructions, I will do a check if I find a issue I'll inform.

### How to send the files

If is a update of a existent language you can send the update via github pull request that is prefered, but if you don't use github, just send the files via [email fglfgl27@gmail.com](mailto:fglfgl27@gmail.com), make sure to send the full file not just what you have changed.<br>

If is a full new translation send all the files included the `untranslated_*.txt` files via a [issue](https://github.com/fgl27/SmartTwitchTV/issues/new/choose) or a [email fglfgl27@gmail.com](mailto:fglfgl27@gmail.com) inform the language they are for, make sure you tested/validate the file and inform the result and issues you found, once those files are added to the repository one can update them just using github pull request.<br>

## Download

If you are using this on a Android TV device install it from play Google Play, if you can't see the app on the store use the release version, you can't install the release apk if you already have the play store apk installed and vice versa.

[Google Play](https://play.google.com/store/apps/details?id=com.fgl27.twitch)

[Download apk from last release version](https://github.com/fgl27/SmartTwitchTV/releases)

## Dependencies

### Web Dependencies

-   [crass - A CSS minification, pretty printing, and general utility library written in JS](https://github.com/mattbasta/crass)
-   [Fontastic - Create your customized icon fonts in seconds](http://app.fontastic.me)
-   [HTMLMinifier - is a highly configurable, well-tested, JavaScript-based HTML minifier](https://github.com/kangax/html-minifier)
-   [irc-message - Performant, streaming IRC message parser](https://github.com/sigkell/irc-message)
-   [JSHint - A Static Code Analysis Tool for JavaScript](https://github.com/jshint/jshint)
-   [punycode - A robust Punycode converter that fully complies to RFC 3492 and RFC 5891](https://github.com/bestiejs/punycode.js)
-   [Twemoji - A simple library that provides standard Unicode emoji support across all platforms](https://github.com/twitter/twemoji)
-   [Twitch Developer Documentation](https://dev.twitch.tv/docs/)
-   [UglifyJS - is a JavaScript parser, minifier, compressor and beautifier toolkit](https://github.com/mishoo/UglifyJS2)

### Apk Dependencies

-   [ExoPlayer: An extensible media player for Android](https://github.com/google/ExoPlayer)
-   [Gradle Versions Plugin: Gradle plugin to discover dependency updates](https://github.com/ben-manes/gradle-versions-plugin)
-   [Gson: Gson is a Java library that can be used to convert Java Objects into their JSON representation.](https://github.com/google/gson)
-   [Leanback v17: Support classes for building Leanback user experiences](https://developer.android.com/reference/android/support/v17/leanback/package-summary)
-   [Tray: a SharedPreferences replacement for Android](https://github.com/grandcentrix/tray)

## Are phones and tablets supported?

Yes but is limited, you need to use the APK from [release](https://github.com/fgl27/SmartTwitchTV/releases) and manually install the APK. Be aware that this app is design to be used mainly on TVs, the support for other device is limited and may never receive a better support, if you don't have a keyboard or a D-pad + enter key controller use the on screen virtual D-pad + back key to navigate, in settings you can change position and opacity of the virtual D-pad, click anywhere on the screen to show the virtual D-pad when it is hidden it doesn't work.

## Authorization

The user can add a authorization key (not demanding to use the app), here is the complete description of what that keys is and how it's used by the app.<br>
That key will be used to access Twitch specific content of that user, it permission requested has a reason and bellow is the full description of what it permission will be used for:<br>

### when accessing Twitch authorization site after adding yours credential (User and password) you will see the bellow information

![logging](https://fgl27.github.io/SmartTwitchTV/screenshot/logging.png)

**The app uses the following permission:**

-   user:read:follows, user:read:subscriptions, chat:edit, chat:read they are summarized here [Twitch Access Token Scopes](https://dev.twitch.tv/docs/authentication/scopes)<br>

**How the app uses it individual permission:**

**Read your list of follows:**

-   The permission used for this is **user:read:follows** the API used on this is [Get Followed Streams](https://dev.twitch.tv/docs/api/reference#get-followed-streams)
-   This allows to show yours list of followed channels

**Get the details of your subscription to a channel.:**

-   The permission used for this is **user:read:subscriptions** the API's used on this is [Check User Subscription by Channel](https://dev.twitch.tv/docs/api/reference#check-user-subscription)
-   Allows to check if you are sub to a particularly channel, that information is used to display chat emotes on the write to chat option and also to give a on screen warning when a content is block for Sub-only (a Sub-only chat ROOM (write mode, read will always work) or a VOD for example).
-   Unfortunately twitch has blocked all third party app's to access any user privilege that includes sub or turbo privilege, on the past that wasn't a issue but today is, so today the app can only let you know why you can't see something by displaying a on-screen warning<br>

**Send live Stream Chat and Rooms messages:**

-   The permission used for this is **chat:edit** the API used on this is [Authenticating with the Twitch IRC Server](https://dev.twitch.tv/docs/irc/authenticate-bot#getting-an-access-token)
-   Allows access so you can use the app to logging in on Twitch chat using yours username to send chat messages.
-   Also enable you to receive gifted sub give for user in chat.<br>

**View live Stream Chat and Rooms messages:**

-   The permission used for this is **chat:read** the API used on this is [Authenticating with the Twitch IRC Server](https://dev.twitch.tv/docs/irc/authenticate-bot#getting-an-access-token)
-   Allows access so you can use the app to logging in on Twitch chat using yours username to read chat messages as yours user (technically the app can read chat without a user but the bellow option will not work on that case as the login is as anonymous).
-   Also enable you to receive gifted sub give for user in chat.<br>

## How to build, languages and etc related

### Code Languages used by the project

-   The web app code is compose of HTML/CSS (UI code) and a JavaScript files (logic code), to edit those files use VS code (recommend) or any text editor of yours choice.
-   The apk code is compose of JAVA (logic code), xml (UI and related code) and basic build files use android Studio to edit and build apk.

### How to Build

The web app and the apk need to be build/generated here is a simple explanation on how that is done.<br>

### Building The web app

The web app files are locate here [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) but that is not the code that the end user runs, to generate the final code first is need to process those files, for that process is used this script [release_maker.sh](https://github.com/fgl27/SmartTwitchTV/blob/master/release/scripts/release_maker.sh).

How that process works is divided on it language of the web app...

### Javascript (building The web app)

The script process all the Javascript code from this folder [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) and sub folders plus this file [app API](https://github.com/fgl27/SmartTwitchTV/blob/master/release/api.js), on that process the script will validate the code checking for error and general code miss use, if the validation pass the Javascript code will be clean, mangle and compressed [to this files](https://github.com/fgl27/SmartTwitchTV/tree/master/release/githubio/js).

The `smartTwitchTV/release/githubio/js/main.js` is the main app Javascript code, that file contains a single function in a form of a "API" that contains one single exported or global object smartTwitchTV, smartTwitchTV is the object that the apk uses to communicate with the web app that is why it has some exported properties those properties are all function that the apk use to communicate with the web app.

### Html (building The web app)

The html files from this folder [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) and sub folders will be processed, clean and compressed [to this files](https://github.com/fgl27/SmartTwitchTV/tree/master/release).

### CSS (building The web app)

The CSS files from [this folder](https://github.com/fgl27/SmartTwitchTV/tree/master/release/githubio/css) will be processed, clean and compressed the same folder.<br>

If all the process finises OK the scrip will inform with of those files changed in relation to the last time the script run, a commit can be pushed to update those files on the repo, every time that the apk start those files will downloaded by the app, this way the majority of the app Logic and UI can be updated without having to push a new apk, simply by closing and opening the app the end user updates to latest version, the app has a building update check function that informs the user when a update is available, so the user is always up to date.

**If you don't understand why Javascript, Html and css file need to be process like this, the simple answer is that they work better, faster and reliable this way, if you need more info about that process just search about it as is the most common process used by web projects.**

### Build The apk

The apk files are located here [SmartTwitchTV/apk](https://github.com/fgl27/SmartTwitchTV/tree/master/apk), because the app uses a modified version of **ExoPlayer** (the app player API) there is also [this fork of ExoPlayer](https://github.com/fgl27/ExoPlayer).<br>

To build the apk:

-   Create a `new folder` (the name is irrelevant) inside of that folder...
-   [Download and extract](https://github.com/fgl27/SmartTwitchTV/archive/master.zip) the app source or clone it (`git clone https://github.com/fgl27/SmartTwitchTV`), if you download it make sure you extract it to the `new folder`
-   [Download and extract](https://github.com/fgl27/ExoPlayer/archive/dev-v2.zip) ExoPlayer or clone it (`https://github.com/fgl27/ExoPlayer`), if download make sure you extract it to the `new folder`
-   Make sure yours `new folder` contains this two folders `SmartTwitchTV` and `ExoPlayer` before proceed to next step
-   Install **Android Studio** after open it and add a new project ... File -> Open... Select the folder [SmartTwitchTV/apk](https://github.com/fgl27/SmartTwitchTV/tree/master/apk)
-   Wait **Studio** do it's preparation it will load and download all app dependencies and etc related needed for this app, if it ask to install extra dependencies/sdk/etc follow it's instructions
-   Comment out `Crashlytics` and related services, this app uses [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics) to be able to get crash reports from the app and use those to improve it, that process uses a file `google-services.json` in that file there is private keys that can't be published, so in order to build the app for testing you need to comment out a few lines those lines start with `Crashlytics` and end `Crashlytics end` comment out all in between on this files [SmartTwitchTV/apk/build.gradle](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/build.gradle) and [SmartTwitchTV/apk/app/build.gradle](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/build.gradle)
-   Building the apk, on **Studio**, Build -> Build Bundle(s) / APK(s) -> Build APK(s)... if all OK after a few moments a app will be generated, a pop notification inside **Studio** will show and let you click to see where that apk is generated to.
-   If you have any problem using **Android Studio** just try to google as the project is solely build using **Android Studio** it must work for you, if it doesn't is because you did something wrong, **Android Studio** apk build is a very common thing one can find any type of help about it just by "googling it", but if you have a problem that you can't solve [open a issue](https://github.com/fgl27/SmartTwitchTV/issues/new/choose) or [send a email fglfgl27@gmail.com](mailto:fglfgl27@gmail.com)

## Contributing instructions

Any help is welcome.<br>

-   If you know how to code you can use a github PR to send yours changes/improves etc... Check [How to make changes and test it](#how-to-make-changes-and-test-it) to better understand how to do that...
-   If you have a idea, feature request, a problem or anything related you can inform it on a [issue](https://github.com/fgl27/SmartTwitchTV/issues/new/choose) or send a [email fglfgl27@gmail.com](mailto:fglfgl27@gmail.com).

## How to make changes and test it

To make changes on the web app, edit the files from [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app), to test those changes just open the file `smartTwitchTV/app/index.html` on a browser preferably Chrome (the Webview that the app uses use the same web interface as Chrome so testing on Chrome on a computer is very close to test on a device).

If the changes that you are making are on a part of the app that interacts with the apk you must be changing functions that use functions of this file [OSInterface.js](https://github.com/fgl27/SmartTwitchTV/blob/master/app/specific/OSInterface.js), in order to test those you can build the app and included the folder [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) inside the app `assets` folder.

To do that create a `assets` folder on [SmartTwitchTV/apk/app/src/main/](https://github.com/fgl27/SmartTwitchTV/tree/master/apk/app/src/main) folder copy the [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) folder to it, after before build modify the [Constants.java](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/src/main/java/com/fgl27/twitch/Constants.java) file, un-comment the first two lines `//final static String PageUrl` and `//final static String KeyPageUrl` and comment-out the next two lines that are of the same variables. Now build the app and test yours changes.

To make changes to the app apk, just use the **Android Studio** to make the changes, to build and test use the [build process of the apk](#build-the-apk).

## Changelog

[To check the latest app changes click here](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/Changelog.md)

## TODO list

[To check the project TODO list click here](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/TODO.md) the TODO list contains all user request and future project improves and features

## Donations

![Main](https://fgl27.github.io/SmartTwitchTV/screenshot/paypal.png) **Paypal email link (clickable donation link):** [fglfgl27@gmail.com](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=fglfgl27@gmail.com&lc=US&no_note=0&item_name=Donate+to+thanks+for+the+Twitch+Android+app&cn=&curency_code=USD&bn=PP-DonationsBF:btn_donateCC_LG.gif:NonHosted)

#

![Main](https://fgl27.github.io/SmartTwitchTV/screenshot/bitcoin.png)**Bitcoin wallet address (or use bellow QR code):** 1DuhCT6L3VfBtFcS8FNfVXgBzE2rwCPx3x

![Main](https://fgl27.github.io/SmartTwitchTV/screenshot/chart.png)

## In doubt [open a issue](https://github.com/fgl27/SmartTwitchTV/issues/new/choose)
