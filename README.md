**SmartTV Twitch AndroidTV APK**

<!-- TOC -->

- [About the project](#about-the-project)
- [About this fork](#about-this-fork)
- [How the application works](#how-the-application-works)
    - [The web app](#the-web-app)
    - [The APK](#the-apk)
    - [The interactions between web app and APK](#the-interactions-between-web-app-and-apk)
- [How the application looks](#how-the-application-looks)
- [How to translate this](#how-to-translate-this)
    - [How to translate and test?](#how-to-translate-and-test)
    - [Translate](#translate)
    - [Testing app/languages/en_US.js](#testing-applanguagesen_usjs)
    - [Testing apk/app/src/main/res/values/strings.xml](#testing-apkappsrcmainresvaluesstringsxml)
    - [How to send the files](#how-to-send-the-files)
- [Download](#download)
- [Dependencies](#dependencies)
    - [Web Dependencies](#web-dependencies)
    - [APK Dependencies](#apk-dependencies)
- [Are phones and tablets supported?](#are-phones-and-tablets-supported)
- [Authorization](#authorization)
    - [when accessing Twitch authorization site after adding yours credential User and password you will see the below information](#when-accessing-twitch-authorization-site-after-adding-yours-credential-user-and-password-you-will-see-the-below-information)
- [How to build, languages and etc related](#how-to-build-languages-and-etc-related)
    - [Code Languages used by the project](#code-languages-used-by-the-project)
    - [How to Build](#how-to-build)
    - [Building The web app](#building-the-web-app)
    - [Javascript building The web app](#javascript-building-the-web-app)
    - [HTML building The web app](#html-building-the-web-app)
    - [CSS building The web app](#css-building-the-web-app)
    - [Build The APK](#build-the-apk)
- [How to test the Web app](#how-to-test-the-web-app)
    - [In an browser](#in-an-browser)
    - [Inside the APK](#inside-the-apk)
- [Contributing instructions](#contributing-instructions)
- [How to make changes and test it](#how-to-make-changes-and-test-it)
- [Changelog](#changelog)
- [TODO list](#todo-list)
- [Donations](#donations)
    - [PayPal](#paypal)
    - [BitCoin](#bitcoin)
    - [Pix](#pix)
- [In doubt open a issue](#in-doubt-open-a-issue)

<!-- /TOC -->

## About the project

This is a web application designed to give access to Twitch features on SmartTV's, the official Twitch app is not available for most devices, that is why this project exists.

The intention of this is to make a web app that works on all modern browsers and can be easily ported to any OS that can run a web app.

This app has no affiliation with Twitch, this is a user made app, but is only possible because Twitch provides all the APIs that allow the app to show Twitch content.

Those APIs are documented here:

[Twitch Developer Documentation](https://dev.twitch.tv/docs/)

This app has to be registered to access Twitch API, that registration process is described here:

[Twitch Registration process](https://dev.twitch.tv/docs/authentication#registration)

This project is the main project of two Twitch projects I current maintain, originally I started working on the [smarttv-twitch](https://github.com/fgl27/smarttv-twitch) repo, I'm using separate repos to make it easier to use GitHub pages and keep commit history separated.

The original project runs on Samsung Tizen OS, which is very limited. Because of that, the Android version has become the main project, not all features of the Android project can be ported to the Samsung one, but from time to time I will port the features from the Android version to the Samsung version.

## About this fork

I initially forked this from https://github.com/CazuzaCzz/SmartTwitchTV/commits/tizen
The original fork is https://github.com/nikitakatchik/SmartTwitchTV

I have started this project because the above repos of the app did not fully support my TV model (at the time this was a Samsung Tizen OS only project) and didn't have all possible Twitch features.

I keep the original name and commit history but not as a fork simply because I made so many changes and it makes no sense to call this a fork. I have made a new application from scratch focusing on performance and all available Twitch features, with the help of users and contributors reporting bugs and asking for features the app has become what is today, an app that can be easily used to watch all available Twitch content and give the user lots of extra options, but I know that the application can be improved with new features and improvements are always in the works, mostly to provide better experience and more options to the user, but that process is slow mostly because there is only one person working on the project and that work is done for free on spare time.

## How the application works

The application is split into two parts: a web app and an Android APK.

### The web app

The web app is a web page [Click here to access it](https://fgl27.github.io/SmartTwitchTV/release/index.html), this page contains the app user interface and most of the app logic.

### The APK

The APK holds two main views of the app:

-   the Webview the view that loads - the web app page
-   the [PlayerActivity](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/src/main/java/com/fgl27/twitch/PlayerActivity.java) - the main app activity and the activity that holds the app players and web UI
    The APK also handles the Android specific interactions that the app needs to make all to work.<br>

### The interactions between web app and APK

The web app and the APK use a "OS interface" to communicate back and forth.<br>

The web app interacts with the APK by using one of the functions in [SmartTwitchTV/app/specific/OSInterface.js](https://github.com/fgl27/SmartTwitchTV/blob/master/app/specific/OSInterface.js). Each of those functions has a "mirror function" on the Java side of the code, the Java side of those functions is annotated with **JavascriptInterface** in [PlayerActivity](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/src/main/java/com/fgl27/twitch/PlayerActivity.java). That **JavascriptInterface** uses the class named **public class WebAppInterface** to hold all the functions.

To communicate with the web app, the APK will use this function call `WebView.loadUrl("javascript:smartTwitchTV.FUN_NAME()")` where that `FUN_NAME` must be one of the functions exposed by [app API](https://github.com/fgl27/SmartTwitchTV/blob/master/release/api.js)

In order for the app to work, the back and forth communication between the UI and the APK is necessary. The process is technically simple but if you've never seen it, it may seem complicated at first.<br>

## [How the application looks](https://github.com/fgl27/SmartTwitchTV/tree/master/screenshot)

The application never stops receiving updates. The below video may be outdated, I try to keep an updated video always available but is not a priority
[![How the application looks](https://fgl27.github.io/SmartTwitchTV/screenshot/Screenshot_you.png)](http://www.youtube.com/watch?v=PI2yrGb3pnY)

## How to translate this

The app has two strings files:<br>

-   [app/languages/en_US.js](https://github.com/fgl27/SmartTwitchTV/blob/master/app/languages/en_US.js)
-   [apk/app/src/main/res/values/strings.xml](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/src/main/res/values/strings.xml)

Follow the below instruction to translate, test and send the files back.

### How to translate and test?

-   [Download and extract the app source](https://github.com/fgl27/SmartTwitchTV/archive/master.zip)
-   Navigate and open [app/languages/en_US.js](https://github.com/fgl27/SmartTwitchTV/blob/master/app/languages/en_US.js) and follow the below [Translate](#translate) and [Testing](#testing) steps
-   Do the same for [apk/app/src/main/res/values/strings.xml](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/src/main/res/values/strings.xml)

### Translate

-   Translate all string to the language you're adding
-   Delete from the file any string that when translated has no difference to the original EN_US String
-   Remove from the file any string that wasn't translated and add it to a separate file named `untranslated_js.txt` for `app/languages/en_US.js` and `untranslated_xml.txt` for `apk/app/src/main/res/values/strings.xml`; make sure you inform why you didn't translate in case there's an issue that needs to be resolved.
-   The files `untranslated_*.txt` must be named this way so in the future it's easier to know which strings need to be updated, as when changes are made to the original strings I may remove them from the translation so the translator knows that they need to update, also new strings created after the translation will be added to `untranslated_*.txt`

### Testing [app/languages/en_US.js](https://github.com/fgl27/SmartTwitchTV/blob/master/app/languages/en_US.js)

This file is part of the web app. The easiest wat to test that file is to:<br>

-   Open [app/index.html](https://github.com/fgl27/SmartTwitchTV/blob/master/app/index.html) locally in a web browser (recommended Chrome), that will load the web app
-   To navigate use the keyboard arrow keys, enter and esc
-   Make sure you go to all app screens included in the player (open Live, VOD and clips) and check if the translated strings do not overflow or cause the app to look odd
-   Make sure you open the side panel screens Settings, About and Controls, as those are the screens that have more text so they usually need some work to make everything look OK
-   If any screen looks odd and there's no way to make the string fit, inform which string/screen has the problem when you share the file
-   If you want to compare your changes VS the original app side by side, open the [main app page](https://fgl27.github.io/SmartTwitchTV/release/index.html) in a new browser tab

### Testing [apk/app/src/main/res/values/strings.xml](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/src/main/res/values/strings.xml)

This file is part of the APK and it's technically not needed to test it, just make sure you've followed the [Translate](#translate) instructions, I will do a check, and if I find an issue I'll let you know.

### How to send the files

If you're updating an existing language, you can send the update via GitHub pull request (that is the preferred way), but if you don't use GitHub, just send the files via [email fglfgl27@gmail.com](mailto:fglfgl27@gmail.com), make sure to send the full file not just what you have changed.<br>

If you're adding a new language, send all the files (including the `untranslated_*.txt`) via a [issue](https://github.com/fgl27/SmartTwitchTV/issues/new/choose) or a [email fglfgl27@gmail.com](mailto:fglfgl27@gmail.com) (specify the language they are for, make sure you've tested/validated the files and report the result and issues you've found). Once those files are added to the repository, one can update them just using GitHub pull request.<br>

## Download

If you are using this on an Android TV device, install it from Google Play. If you can't see the app on the store, use the release version. You can't install the release APK if you already have the Google Play store APK installed and vice versa.

[Google Play](https://play.google.com/store/apps/details?id=com.fgl27.twitch)

[Download APK from last release version](https://github.com/fgl27/SmartTwitchTV/releases)

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

### APK Dependencies

-   [AndroidX Media: An extensible media player for Android](https://github.com/androidx/media) The app uses a custom version of Media, the difference form the default dependencie are described here [AndroidX Media3 Modifications](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/Media3%20changes.md)
-   [Gradle Versions Plugin: Gradle plugin to discover dependency updates](https://github.com/ben-manes/gradle-versions-plugin)
-   [Gson: Gson is a Java library that can be used to convert Java Objects into their JSON representation.](https://github.com/google/gson)
-   [Leanback v17: Support classes for building Leanback user experiences](https://developer.android.com/reference/android/support/v17/leanback/package-summary)
-   [Tray: a SharedPreferences replacement for Android](https://github.com/grandcentrix/tray)

## Are phones and tablets supported?

Yes, but the support is limited, you need to use the APK from [release](https://github.com/fgl27/SmartTwitchTV/releases) and manually install the APK. Be aware that this app is designed to be used mainly on TVs, the support for other devices is limited and may never receive better support. If you don't have a keyboard or a D-pad + enter key controller, use the on screen virtual D-pad + back key to navigate. In settings you can change position and opacity of the virtual D-pad, click anywhere on the screen to show the virtual D-pad (when it is hidden it doesn't work).

## Authorization

The user can add an authorization key (not required to use the app), here is the complete description of what that key is and how it's used by the app.<br>
That key will be used to access Twitch content specific to the user. Each requested permission has a reason and below is the full description of what each permission will be used for:<br>

### when accessing Twitch authorization site after adding yours credential (User and password) you will see the below information

![logging](https://fgl27.github.io/SmartTwitchTV/screenshot/logging.png)

**The app uses the following permission:**

-   user:read:follows, user:read:subscriptions, chat:edit, chat:read they are summarized here [Twitch Access Token Scopes](https://dev.twitch.tv/docs/authentication/scopes)<br>

**How the app uses it individual permission:**

**Read your list of follows:**

-   The permission used for this is **user:read:follows** the API used on this is [Get Followed Streams](https://dev.twitch.tv/docs/api/reference#get-followed-streams)
-   This allows to show the list of channels you follow

**Get the details of your subscription to a channel.:**

-   The permission used for this is **user:read:subscriptions** the API's used for this is [Check User Subscription by Channel](https://dev.twitch.tv/docs/api/reference#check-user-subscription)
-   Allows to check if you are subscribed to a particular channel, that information is used to display chat emotes on the "write to chat" option and also to give an on screen warning when a content is blocked for Sub-only (a Sub-only chat ROOM (write mode, read will always work) or a VOD for example)<br>

**Send live Stream Chat and Rooms messages:**

-   The permission used for this is **chat:edit** the API used for this is [Authenticating with the Twitch IRC Server](https://dev.twitch.tv/docs/irc/authenticate-bot#getting-an-access-token)
-   Allows the app access to sending messages in Twitch chat using your username
-   Also enables you to receive gifted sub given for user in chat<br>

**View live Stream Chat and Rooms messages:**

-   The permission used for this is **chat:read** the API used for this is [Authenticating with the Twitch IRC Server](https://dev.twitch.tv/docs/irc/authenticate-bot#getting-an-access-token)
-   Allows the app access to reading messages in Twitch chat using your username as your user (technically the app can read chat without this permission but the below option will not work in that case as the login is anonymous)
-   Also enables you to receive gifted sub given for user in chat<br>

## How to build, languages and etc related

### Code Languages used by the project

-   The web app code is composed of HTML/CSS (UI code) and JavaScript files (logic code), to edit those files use `VS Code` (recommended) or any text editor or IDE of your choice.
-   The APK code is composed of Java (logic code), XML (UI and related code) and basic build files, use `Android Studio` to edit and build the PK.

### How to Build

The web app and the APK need to be build/generated. Here is a simple explanation on how that is done.<br>

### Building The web app

The web app files are located here [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) but that is not the code that the end user runs. To generate the final code, first those files need to be processed. To do that, this script [release_maker.sh](https://github.com/fgl27/SmartTwitchTV/blob/master/release/scripts/maker.js) can be used, this is node script, a [help on how to setup Node and etc here](https://github.com/fgl27/SmartTwitchTV/blob/master/release/scripts/HELP.md).

How that process works is divided on each language of the web app...

### Javascript (building The web app)

The script processes all the Javascript code from this folder [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) and sub folders plus this file [app API](https://github.com/fgl27/SmartTwitchTV/blob/master/release/api.js). During that process the script will validate the code checking for errors and general code misuse. If the validation passes, the Javascript code will be cleaned, mangled and compressed in [this folder](https://github.com/fgl27/SmartTwitchTV/tree/master/release/githubio/js).

The `smartTwitchTV/release/githubio/js/main.js` is the main app Javascript code, that file contains a single function in a form of a "API" that contains one single exported or global object `smartTwitchTV`. `smartTwitchTV` is the object that the APK uses to communicate with the web app, that is why it has some exported properties - those properties are all functions that the APK uses to communicate with the web app.

### HTML (building The web app)

The HTML files from this folder [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) and sub folders will be processed, clean and compressed in [this folder](https://github.com/fgl27/SmartTwitchTV/tree/master/release).

### CSS (building The web app)

The CSS files from [this folder](https://github.com/fgl27/SmartTwitchTV/tree/master/release/githubio/css) will be processed, cleaned and compressed in the same folder.<br>

If all the process finises OK, the script will inform which of those files have changed in relation to the last time the script was executed. A commit can be pushed to update those files in the repo. Every time that the APK starts, those files will be downloaded by the app, this way the majority of the app Logic and UI can be updated without having to push a new APK, simply by closing and opening the app the end user updates to latest version, the app has a building update check function that informs the user when a update is available, so the user is always up to date.

**If you don't understand why Javascript, HTML and CSS files need to be process like this, the simple answer is that they work better, faster and more reliably this way, if you need more info about that process just search about it as it's the most common process used by web projects.**

### Build The APK

The APK files are located here [SmartTwitchTV/apk](https://github.com/fgl27/SmartTwitchTV/tree/master/apk), because the app uses a modified version of **AndroidX Media** (the app player API) there is also [this fork of media](https://github.com/fgl27/media).<br>

To build the APK:

-   Create a `new folder` (the name is irrelevant) inside of that folder...
-   [Download and extract](https://github.com/fgl27/SmartTwitchTV/archive/refs/heads/master.zip) the app source or clone it (`git clone https://github.com/fgl27/SmartTwitchTV`), if you download it make sure you extract it to the `new folder`
-   [Download and extract](https://github.com/fgl27/media/archive/refs/heads/release.zip) media or clone it (`https://github.com/fgl27/media`), if download make sure you extract it to the `new folder`
-   Make sure your `new folder` contains these two folders `SmartTwitchTV` and `media` before proceeding to the next step
-   Install **Android Studio**, open it and add a new project ... File -> Open... Select the folder [SmartTwitchTV/apk](https://github.com/fgl27/SmartTwitchTV/tree/master/apk)
-   Wait for **Android Studio** to finish it's preparation, it will load and download all app dependencies and etc related needed for this app, if it asks to install extra dependencies/sdk/etc follow its instructions
-   [Use this commit as example on how to Comment out Crashlytics and related services](https://github.com/fgl27/SmartTwitchTV/commit/b421b6a504a922da1e0bfd53a29610801c84ff29), this app uses [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics) to be able to get crash reports from the app and use those to improve it, that process uses a file `google-services.json` in that file there are private keys that can't be published, so in order to build the app for testing you need to comment out a few lines use the commit as example.
-   Building the APK, in **Android Studio**, Build -> Build Bundle(s) / APK(s) -> Build APK(s)... if all OK after a few moments an app will be generated, a popup notification inside **Android Studio** will show and let you click to see where that APK is generated to.
-   If you have any problem using **Android Studio** just try to google for help, as the project is solely built using **Android Studio** it must work for anyone, but sometimes doesn't if you have a problem that you can't solve [open a issue](https://github.com/fgl27/SmartTwitchTV/issues/new/choose) or [send a email fglfgl27@gmail.com](mailto:fglfgl27@gmail.com)

## How to test the Web app

### In an browser

You can just open the [SmartTwitchTV/app/index.html](https://github.com/fgl27/SmartTwitchTV/tree/master/app/index.html) in a browser, but that will not allow you to, for example, add a user and authorization key.

To be able to do that, you need to run this html from the https link https://127.0.0.1:5000/app/, to do that you can just use Node.js extension `http-server` (npm install http-server -g) to create a web server and call the link https://127.0.0.1:5000/app/.

I have made a simple script that starts the server at the correct URL just call this if you are on Linux [SmartTwitchTV/release/scripts/http-server.sh](https://github.com/fgl27/SmartTwitchTV/tree/master/release/scripts/http-server.sh) or Windows (CMD or powerShell) [SmartTwitchTV/release/scripts/http-server_windows.cmd](https://github.com/fgl27/SmartTwitchTV/tree/master/release/scripts/http-server_windows.cmd), or [use this command](https://github.com/fgl27/SmartTwitchTV/blob/9c157c457751525f84e19126190389c498a4876a/release/scripts/http-server.sh#L23) from root project directory.

### Inside the APK

Let's say you've made modifications to the web app and you want to test those on a real device.

You need to copy the content of the [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) folder to the [SmartTwitchTV/apk/app/src/main/assets/app](https://github.com/fgl27/SmartTwitchTV/tree/master/apk/app/src/main/assets/app) (this folder may not exist, just create it), then set `LoadFromAssets` to true in [SmartTwitchTV/apk/app/src/main/java/com/fgl27/twitch/Constants.java](https://github.com/fgl27/SmartTwitchTV/blob/9c157c457751525f84e19126190389c498a4876a/apk/app/src/main/java/com/fgl27/twitch/Constants.java#L26)

I have made a script that does it for you, works on Linux [SmartTwitchTV/release/scripts/up_assets.sh](https://github.com/fgl27/SmartTwitchTV/tree/master/release/scripts/up_assets.sh), call the script without passing any argument to set, pass 1 to unset or clean the assets folder.

## Contributing instructions

Any help is welcome.<br>

-   If you know how to code you can use a github PR to send your changes/improvements etc... Check [How to make changes and test it](#how-to-make-changes-and-test-it) to better understand how to do that...
-   If you have an idea, feature request, a problem or anything related you can report it by [creating an issue](https://github.com/fgl27/SmartTwitchTV/issues/new/choose) or sending an [email fglfgl27@gmail.com](mailto:fglfgl27@gmail.com).

## How to make changes and test it

To make changes on the web app, edit the files from [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app), to test those changes just open the file `smartTwitchTV/app/index.html` on a browser preferably Chrome (the Webview that the app uses use the same web interface as Chrome so testing on Chrome on a computer is very close to test on a device).

If the changes that you are making are on a part of the app that interacts with the APK you must be changing functions that use functions of this file [OSInterface.js](https://github.com/fgl27/SmartTwitchTV/blob/master/app/specific/OSInterface.js), in order to test those you can build the app and included the folder [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) inside the app `assets` folder.

To do that create a `assets` folder on [SmartTwitchTV/apk/app/src/main/](https://github.com/fgl27/SmartTwitchTV/tree/master/apk/app/src/main) folder copy the [SmartTwitchTV/app](https://github.com/fgl27/SmartTwitchTV/tree/master/app) folder to it, after before build modify the [Constants.java](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/app/src/main/java/com/fgl27/twitch/Constants.java) file, and set the boolean **LoadFromAssets** to true. Now build the app and test yours changes.

To make changes to the app APK, just use the **Android Studio** to make the changes, to build and test use the [build process of the APK](#build-the-apk).

## Changelog

[To check the latest app changes click here](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/Changelog.md)

## TODO list

[To check the project TODO list click here](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/TODO.md) the TODO list contains all user request and future project improves and features

## Donations

### PayPal

![Main](https://fgl27.github.io/SmartTwitchTV/screenshot/paypal.png) **Paypal email link:** [clickable donation link fglfgl27@gmail.com](https://www.paypal.com/donate/?hosted_button_id=8YVE3JFTJFUNW)

### BitCoin

![Main](https://fgl27.github.io/SmartTwitchTV/screenshot/bitcoin.png)**Bitcoin wallet address (or use below QR code):** 1DuhCT6L3VfBtFcS8FNfVXgBzE2rwCPx3x

![Main](https://fgl27.github.io/SmartTwitchTV/screenshot/chart.png)

### Pix

Use the email fglfgl27@gmail.com

## In doubt [open a issue](https://github.com/fgl27/SmartTwitchTV/issues/new/choose)
