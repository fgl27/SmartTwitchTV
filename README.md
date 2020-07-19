SmartTwitchTV
==============

This is an web application designed to watch Twitch broadcasts on SmartTV's , A good official Twitch app is not available for most devices, that is way this project exist.

The intention of this is to make a web app that runs on all modern browser and can be easily ported to any OS that can run a web app's.

[Project resumed Changelog](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/Changelog.md)

This project is a port of this repo [smarttv-twitch](https://github.com/fgl27/smarttv-twitch) using separated repo to make easier use of github pages and commit history

Are phones and tablets supported?
==============

Yes but is limited, you need to use the APK from [release](https://github.com/fgl27/SmartTwitchTV/releases) and manually install the APK. Be aware that this app is design to be used mainly on TVs, the support for other device is limited and may never receive a better support, if you don't have a keyboard or a D-pad + enter key controller use the on screen virtual D-pad + back key to navigate, in settings you can change position and opacity of the virtual D-pad, click anywhere on the screen to show the virtual D-pad when it is hidden it doesn't work.

Download
==============

[Download apk from last release version](https://github.com/fgl27/SmartTwitchTV/releases)

[Google Play](https://play.google.com/store/apps/details?id=com.fgl27.twitch)

Contributing instructions
==============

Any Help is welcome you can use a github PR, [issue](https://github.com/fgl27/SmartTwitchTV/issues/new/choose) or send a [email](mailto:fglfgl27@gmail.com).

About this fork
===============

I initially fork this from https://github.com/CazuzaCzz/SmartTwitchTV/commits/tizen
The original fork is https://github.com/nikitakatchik/SmartTwitchTV

I have started this project because the above Repos of the app did not fully support my TV model and don't have all possible Twitch featuring.

I start this new repo keep the original name and commit history, work a long time writing this a new application basically from scratch focusing on performance and all available Twitch featuring, with the help of some users reporting bugs and features request, I add many features and work to resolve all the bugs, today the application is very complete, can be easily used to watch all available Twitch content and give the user a lot of extra options, but is know that the application can be always improved, new featuring and improves are always in the works, mostly to give a better experience and more options to the user, but that process is slow.

Project Web Dependencies
==============

* [irc-message - Performant, streaming IRC message parser](https://github.com/sigkell/irc-message)
* [punycode - A robust Punycode converter that fully complies to RFC 3492 and RFC 5891](https://github.com/bestiejs/punycode.js)
* [crass - A CSS minification, pretty printing, and general utility library written in JS](https://github.com/mattbasta/crass)
* [UglifyJS - is a JavaScript parser, minifier, compressor and beautifier toolkit](https://github.com/mishoo/UglifyJS2)
* [HTMLMinifier - is a highly configurable, well-tested, JavaScript-based HTML minifier](https://github.com/kangax/html-minifier)
* [JSHint - A Static Code Analysis Tool for JavaScript](https://github.com/jshint/jshint)
* [Twemoji - A simple library that provides standard Unicode emoji support across all platforms](https://github.com/twitter/twemoji)
* [Fontastic - Create your customized icon fonts in seconds](http://app.fontastic.me)
* [Twitch Developer Documentation](https://dev.Twitch/docs/)

[Project Android Dependencies](https://github.com/fgl27/SmartTwitchTV/tree/master/apk#project-apk-dependencies)
==============

## [How the application looks](https://github.com/fgl27/SmartTwitchTV/tree/master/screenshot)

The application never stops receiving updates the bellow video may be outdated
[![How the application looks](https://fgl27.github.io/SmartTwitchTV/screenshot/Screenshot_you.png)](http://www.youtube.com/watch?v=LA2x1c-BOJg)

## Authorization
The user can add a authorization key if you have the twitch password for that user (aka you are it).
That key will be used to access twitch content for that account, when accessing twitch authorization site it will show:

	SmartTV Android TV by fgl27
	wants to access your account
	
	This will allow SmartTV Android TV by fgl27 to:
	* Manage your followed channels
	* Send live Stream Chat and Rooms messages
	* View your email address
	* View your paid subscriptions
	* View live Stream Chat and Rooms messages

**The app user current permision:**

* user_read, user_follows_edit, user_subscriptions, chat:edit, chat:read they are summarized here [authentication twitch-api-v5](https://dev.Twitch/docs/authentication#twitch-api-v5)<br>

**It of the permission has a reason:**

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


