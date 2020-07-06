SmartTV Twitch AndroidTV APP latest changes
==============

The App is divided in two part, **Apk** and **Web** you can check it version in the about of the app:
* The **Apk** is updated via play store it contains the app video player and the basic function that don't work on the web part of the app.
* The **Web** is update every time that the app is closed and you re-open it (of course if a update is available in the web server), it contains the user interface and related functions. If the app is open and you change apps that process doesn't closes the app only minimizes it unless the system run out of memory and close the app, to manually close it's needed to select close on the exit dialog or simply holding the return key to force close it.

The app has a building update check function, so whenever there is a update a red text will show up bellow the main pages clock, also a short warning will pop on the screen

Apk Version 3.0.216 & Web Version July 06 2020
==============

* Improve notification service
* General performance improves and bug fixes

Apk Version 3.0.214 and up - July 05 2020
==============

* Fix wrong qualities be display on player controls when switching between VODs and Lives

Apk Version 3.0.213 & Web Version July 04 2020
==============

* Improve auto refresh option adding a new option to separate the auto refresh and the refresh in background option, with is disable by default, auto refresh on background may causes lag to some devices
* Add a option on settings to disable the player check that automatic changes from **Source** to **Auto** when a player lag is detected, the player buffering for over 15 seconds is a lag situation for example other situation compose the check algorithm
* Change back to **Source quality** on next video start if previously the player automatic check changed from **Source** to **Auto** do to lag or something related that prevent the **Source** playback
* Change back to **Source** quality if that is enable after exiting Picture and Picture, 50/50 or Multistream mode, those mode exclusively work on **Auto mode**, without **Auto mode** most devices will lag when playing multiple videos

Apk Version 3.0.212 - July 04 2020
==============

* Fix small player not showing sometimes when exiting Multistream mode and Picture and picture mode was enable
* Update ExoPlayer to latest version
* General performance improves and bug fixes

Web Version July 03 2020
==============

* Allow to use channel screen to open chat if the channel is offline and not hosting (chat doesn't work when hosting)
* Fix viewers counter on player top information and channel contennt for rerun, plus general information refresh improves

Apk Version 3.0.211 & Web Version July 01 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.210 & Web Version June 30 2020
==============

* General performance improves and bug fixes
* Allow to disable the player status the one that shows quality, network activity, skipped frame etc.

Web Version June 28 2020
==============

* Improve auto refresh featuring

Apk Version 3.0.209 - June 27 2020
==============

* Update ExoPlayer to latest version
* General performance improves and bug fixes

Web Version June 26 2020
==============

* Add a setting options to enable chat message timestamp  (Settings > Chat options > Show message timestamp) disable by default

Web Version June 25 2020
==============

* Improve auto refresh featuring

Apk Version 3.0.208 - June 25 2020
==============

* Update ExoPlayer to latest version
* General performance improves and bug fixes

Web Version June 24 2020
==============

* Improve side panel auto refresh and refresh after resume (resume when you go back to the app after it be on background, when you use another app for example)

Web Version June 23 2020
==============

* Add a separated update check function for the **Web** and **Apk** part of the app, with a proper warning of what need to be updated
* Improve the auto refresh function to allow auto refresh on background without any user interaction

Web Version June 22 2020
==============

* Fix live chat messages showing on the VOD chat when playing a LIVE and opening a VOD from preview feed
* Fix checking and open a VOD from preview feed on all situation, before the check wasn't working when playing a VOD or a clip
* Fix Preview feed Current game after the app was open using the feature restore playback restoring a VOD
* Fix accessibility warning check

Apk Version 3.0.207 & Web Version June 21 2020
==============

* Allow to repeat the same notification, the individual notification timeout is around 3 seconds, and can't be changed because this timeout is control by the system, but you can set the number of times the same notification will show

Apk Version 3.0.206 - June 21 2020
==============

* Fix keyboard and remote input from none TV devices or TV devices that don't use Android TV (use a modified phone version of the OS)

Apk Version 3.0.203 and up & Web Version June 20 2020
==============

I took sometime from making small updates to make a bigger update.
On this version I addressed all minor problems that I have on the app TODO list plus added all features that was on the app user request list.

## Improves changes:

* Improve Notification service, it now fully works on phones and tablets and is more reliable
* Phones and tablet only, Fix virtual D-pad not showing when a preview video was playing
* General performance improve 
* General visual improves
* Genera Strings (app text) improves (English is my second language I keep improve as I learn it)
* Fix issue prevent visualizing VODs on user VOD list from lives that have yet ended
* General user history improves
* Improved error detection, when a page fail or a video fail to load, a proper error message will explain what happen (this can be used to understand if there is a issue or was just something expected as a error cause by internet lag)
* Improve player controls descriptions and functionality

## New features:

* Preview video everywhere (setting options to disable it new preview)
* The preview is the main player, meaning that after the preview has loaded you can press enter to open the player without any buffer, the same for exiting, after a video is playing exiting will go back to the screen that open the video without closing the player
* Multi settings option to control all types of previews, controls for sizes, volume and etc related
* Multiple preview and picture and picture video sizes
* Add User VOD and VOD history to the player preview feed
* Add last refresh information on preview feed and side panel
* Allow to change size and position on side by side video and chat mode
* Allow to change Notification position
* End stream dialog option, to stay on the stream after it has ended

## Better described changelog started on the version from June 20 2020, before this version a changelog didn't exist and the bellow changes are ported from play store changelog that because has a limit of 500 character is very limited on changes tecnicly there is way more changes to be on the bellow list so for Full list of changes check [Project commits](https://github.com/fgl27/SmartTwitchTV/commits/master)

Version 3.0.200 and up & Web Version June 3 2020
==============

* General performance improves and bug fixes

Version 3.0.195 and up & Web Version May 18 2020
==============

* General performance improves and bug fixes

Version 3.0.194 & Web Version May 18 2020
==============

* Add a player control to open the Main player on a external player, this is very useful with a popup external player.
* General performance improves and bug fixes

Version 3.0.177 and up & Web Version April 28 2020
==============

* General performance improves and bug fixes


Version 3.0.172 and up & Web Version April 20 2020
==============

* Add a write to chat option included to the player controls, on it added fully customizable keyboards, a keyboard for it type of emote from Twitch, BetterTTV, FrankerFaceZ and another for Unicode emojis
* General performance improves and bug fixes

Version 3.0.168 and up & Web Version April 11 2020
==============

* Add a setting option to allow background notification over other apps, this is disabled by default.
* General performance improves and bug fixes

Version 3.0.164 and up & Web Version April 1 2020
==============

* General performance improves and bug fixes

Version 3.0.163 & Web Version March 30 2020
==============

* Add preview thumbnail to VODs SeekBar (only available for VODs that have this featuring working on twitch website), as you scroll to the SeekBar you see a preview of the content is on that position in time, the number of preview images is limited to 200 by Twitch, meaning that on stream that are very long the preview image is responsible for a long part of the video meaning_2 that when you press to seek to a position the playback maybe a little before or after the preview

Version 3.0.155 and up & Web Version March 25 2020
==============

* General performance improves and bug fixes

Version 3.0.153 an up & Web Version March 24 2020
==============

* Add new player status, Ping to Twitch, allows to know what is the latency to Twitch servers, high latency means slow to load content, this included all app content streams, refreshes, images etc...
* General performance improves and bug fixes

Version 3.0.148 and up & Web Version March 22 2020
==============

* Update all the players process to improve performance and reliability
* General performance improves and bug fixes

Version 3.0.146 and up & Web Version March 17 2020
==============

* General performance improves and bug fixes

Version 3.0.145 & Web Version March 16 2020
==============

* Click left/right on Multistream main window bigger mode to change with is the main window, it's chat
* Update controls related to audio changes on PP and Multistream, check controls
* General performance improves and bug fixes


Version 3.0.144 and up & Web Version March 14 2020
==============

* General performance improves and bug fixes

Version 3.0.143 & Web Version March 13 2020
==============

* Add a new mode for Multistream that makes the main window bigger show it's chat on the side and makes all other widows smaller, press key down to enable/disable

Version 3.0.122 and up & Web Version February 27 2020
==============

* General performance improves and bug fixes

Version 3.0.119 and up & Web Version February 25 2020
==============

* Add a side panel player and a small player to the player live feed (auto-plays when select a tile, similar to Netflix autoplay when hover featuring, small player can be disable in settings)


Version 3.0.110 and up & Web Version February 4 2020
==============

* General performance improves and bug fixes

Version 3.0.109 and up & Web Version January 31 2020
==============

* Major version update from 2.0.X to 3.0.X
* Add 4 way Multistream for user live content

Version 2.0.107 and up & Web Version January 6 2020
==============

* New User history screen for Live, VOD and clip histories

Version 2.0.105 and up & Web Version December 29 2020
==============

* General performance improves  and bug fixes

Version 2.0.67 and up & Web Version September 10 2020
==============

* General performance improves  and bug fixes

Version 2.0.66 & Web Version September 9 2020
==============

* Add Low latency controls to Live player 
* General improves for performance

Version 2.0.52 and up & Web Version August 15 2020
==============

* General improves for performance and minor bug fixes

Version 2.0.51 & Web Version August 13 2020
==============

* 50/50 Mode two live stream and two chats at the same time

Version 2.0.46 and up & Web Version August 11 2020
==============

* Major version update from 1.0.X to 2.0.X
* Rework the player interface to add new features and general improves.
* Add Picture in Picture mode (Check setting and controls to understand how to setup and use it)
* Add full player status in player top right corner, can be set to be visible all the time in settings

Version 1.0.10 and up & Web Version April 24 2020
==============

* General improves for performance, bug fixes and new features.


Version 1.0.0 to Version 1.0.9 & Web Version April 20 2020
==============

* Initial app release, that was a port from the Samsung version of the app https://github.com/fgl27/smarttv-twitch

## Full list of changes check [Project commits](https://github.com/fgl27/SmartTwitchTV/commits/master)
