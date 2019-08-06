SmartTwitchTV
==============

This is an web application designed to watch Twitch.tv broadcasts on SmartTV's , A good official Twitch.TV app is not available for most devices, that is way this project exist.

The intention of this is to make a web app that runs on all modern browser and can be easily ported to any OS that can run a web app's.

This project is a port of this repo [smarttv-twitch](https://github.com/fgl27/smarttv-twitch) using separated repo to make easier use of github pages and commit history

Download
==============

[Download apk from last release version](https://github.com/fgl27/SmartTwitchTV/releases)

[Google Play](https://play.google.com/store/apps/details?id=com.fgl27.twitch)

About this fork
===============

I initially fork this from https://github.com/CazuzaCzz/SmartTwitchTV/commits/tizen
The original fork is https://github.com/nikitakatchik/SmartTwitchTV

I have started this project because the above Repos of the app did not fully support my TV model, it had many bugs and the app did not had all Twitch.TV featuring like a more complete users interface (For VOD, Cips, basic Channel off line content, Chat and etc related) it also didn't fully support the latest version of Samsung smart remote.

So I start this new repo keep the original name and commit history, work a long time writing this a new application basically from scratch focusing on performance and all available Twitch.TV featuring, with the help of some users reporting bugs and making featuring request, I add many features and work to resolve all the bugs, today the application is very complete, can be easily used to watch all available Twitch.TV content and give the user a lot of extra options, but is know that the application can be always improved, new featuring and improves are always in the works, mostly to give a better experience and more options to the user, but as today there is only one main developer working on this project the process is slow, but fell free to report bugs and make request, for that use the [open a issue option of this repo](https://github.com/fgl27/SmartTwitchTV/issues/new/choose).

Project Web Dependencies
==============
* [Nightdev KapChat - KapChat captures (kaptures ![kapa](https://static-cdn.jtvnw.net/emoticons/v1/25/1.0)) Twitch chat directly into OBS or XSplit.](https://www.nightdev.com/kapchat/)
* [Fontastic - Create your customized icon fonts in seconds](http://app.fontastic.me)
* [LazyLoad - A a fast, lightweight and flexible script that speeds up your web application by loading your content images, videos and iframes only as they enter the viewport](https://github.com/verlok/lazyload)
* [Twemoji - A simple library that provides standard Unicode emoji support across all platforms](https://github.com/twitter/twemoji)
* [UglifyJS - is a JavaScript parser, minifier, compressor and beautifier toolkit](https://github.com/mishoo/UglifyJS2)
* [HTMLMinifier - is a highly configurable, well-tested, JavaScript-based HTML minifier.](https://github.com/kangax/html-minifier)
* [JS Beautifier - Beautify, unpack or deobfuscate JavaScript and HTML, make JSON/JSONP readable, etc.](https://github.com/beautify-web/js-beautify)
* [JSHint - A Static Code Analysis Tool for JavaScript](https://github.com/jshint/jshint)
* [Twitch Developer Documentation](https://dev.twitch.tv/docs/)

[Project Android Dependencies](https://github.com/fgl27/SmartTwitchTV/tree/master/apk#project-dependencies)
==============

## [How the application looks](https://github.com/fgl27/SmartTwitchTV/tree/master/screenshot)
The application never stops receiving updates the bellow images can be outdated
![Live](https://fgl27.github.io/SmartTwitchTV/screenshot/animated.gif)


## Authentication
The user can add a authentication key if you have the twitch password for that user (aka you are it).
That key will be used to access twitch content for that account, when accessing twitch authentication site it will show:

	SmartTV Android TV by fgl27
	wants to access your account
	
	This will allow SmartTV Android TV by fgl27 to:
	* Manage your followed channels
	* View your email address
	* View your paid subscriptions

It of the permission has a reason:

**Manage your followed channels:** fallow or unfallow streamers or games for that user.<br>
**View your email address:** Email will not be read, this permission has other uses, it allows to access user live channels in a faster way, the app can load user live without this but it can be really lag if you fallow too many streamers. Let twitch know you are watching a stream/video (allows you to received a free sub in a random gifted sub for example) and show some target content as in featuring screen you will see the order in relation to yours twitch fallow content.<br>
**View your paid subscriptions:** Allows to access subscribed only past broadcast and highlight (vod) for the user that you have added the key, as some streamers block those content for subscribers only this is needed.<br>

## In doubt [open a issue](https://github.com/fgl27/SmartTwitchTV/issues/new/choose)
