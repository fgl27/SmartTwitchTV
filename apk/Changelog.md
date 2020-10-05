SmartTV Twitch AndroidTV APP latest changes
==============

Bellow changes are just a resume of all changes made to the repo to check the full changelog list check the [commit list](https://github.com/fgl27/SmartTwitchTV/commits/master).

The App is divided in two part, **Apk** and **Web** you can check it version in the about of the app:
* The **Apk** is updated via play store it contains the app video player and the basic function that don't work on the web part of the app.
* The **Web** is update every time that the app is closed and you re-open it (of course if a update is available in the web server), it contains the user interface and related functions. If the app is open and you change apps that process doesn't closes the app only minimizes it unless the system run out of memory and close the app, to manually close it's needed to select close on the exit dialog or simply holding the return key to force close it.

The app has a building update check function, so whenever there is a update a red text will show up bellow the main pages clock, also a short warning will pop on the screen let you know if is a **Apk** or **Web** update.

Apk Version 3.0.262 - Web Version October XX 2020
==============

* Add back all performance improves and features of Apk Version 3.0.260 but this time without any device incompatibility and with even better performance gain
* Addressed all problems discovered on Apk Version 3.0.260 plus also addressed old reported or discovered problems, it problem that was fix or at least mitigate is on the bellow lines
* Re-organized settings order, clean up some strings
* Add new Settings **Auto quality Blocked resolutions** this is to address the issue that some devices have with some resolutions as the Xiaomi Mi Box S and 9XXp resolution problem, this issue was already informed to Xiaomi see bellow issue list and probably on next update from they it will be fixed, but as this maybe a issue on the Amlogic Codecs this is a good feature to have, as there is a lot of TV device that use Amlogic and may never get updates
* Add new Settings **Auto quality maximum allowed Resolution/Bitrate** this new settings allows to control more then the old option that only allowed Bitrate control, with this device that was lagging on the past playing multiple streams have more control and can mitigate the lags
* Setting is no longer necessary to enable **Multiplayer mode old OS workaround** for most device (probably all), so it comes disabled by default on all devices, if you need this on yours device send a email (contact info in the about), this option when enable may cause lag on some devices so only use if you really needed
* Prevent flicker green screen on NVIDIA SHIELD, I only have the 2017 darcy model but this probably prevent on all models, this issue is better described bellow
* Bellow are the list of issue and discussion that I have started in order to addressed all device specific issue that I know the app has, again this are device specific so only some unlucky user are affected, the goal her is to find a solution on the device side that is why I have started the bellow discussion so the Manufacturer get informed.
* [Xiaomi Mi Box S: 90% frame drops on 9XXp60 but OK for 1080p60](https://github.com/google/ExoPlayer/issues/7411) issue closed the resolution there is that the Manufacturer will update the OS to fix the problem, the problem is on the this device maybe on others that use Amlogic CPU
* [Xiaomi Mi Box S: Error when changing PP mode causing too long buffers](https://github.com/google/ExoPlayer/issues/7996) issue open, the problem was mitigate on the app side, but this error may occurs and cause long buffer for the user, the problem is on the Amlogic codec the goal of the discussion is reach a conclusion and inform the Manufacturer to fix the problem
* [NVIDIA SHIELD flicker green screen](https://github.com/google/ExoPlayer/issues/7998), issue open, the problem here is only on streams that use **Rec._709 color profile**, was possible to prevent the issue from happening on almost all situations, but randomly it may happen when this happens isn't possible for the app to detect, so to fix after you notice it just restart the player, if playing a single video just change the quality to the same (press enter in the quality control option), if playing multiple streams just restart the problematic stream (Using the controls restart, choose the affected stream only), the goal of the discussion is reach a conclusion and inform the Manufacturer to fix the problem
* [Amazon Fire Stick Gen 2: visual glitches when playing multiple streams](https://github.com/fgl27/SmartTwitchTV/issues/13), this issue has not yet a full fix, if you try any type of multiple stream options one or all video may have visual glitches, as this is a very old device there may not be a solution only mitigation.

Apk Version 3.0.261 - Web Version September 27 2020
==============

* Revert the player change of previously version (Apk Version 3.0.260) as some devices (Xiaomi Mi Box S) can't handle them as they are today

Apk Version 3.0.260 - Web Version September 26 2020
==============

* Update app player functionality to make it more reliable and add features, if anyone has a player issues inform, contact information on the about of the app
* Open PP or Multistream mode is instantaneous now if the player preview is showing (the preview is the player that shows over the player when pressing UP)
* Click enter when the preview is showing to open the preview on the Main player will open instantaneous if you have in settings the "Auto quality Bitrates" set to the same value for all the player, if not (if the Bitrates are different) is not instantaneous but is much faster now
* General performance improves and bug fixes

Apk Version 3.0.255 - Web Version September 25 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.254 - Web Version September 23 2020
==============

* General performance improves and bug fixes

Web Version September 21 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.253 - Web Version September 20 2020
==============

* General performance improves and bug fixes

Web Version September 19 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.251 - Web Version September 18 2020
==============

* Add extra quality options for the "default player quality" in settings (1080p60, 720p60, etc... etc)
* Update the player API (ExoPlayer) to latest version, if anyone has a player issues inform, contact information on the about of the app
* Allow to use the player progressbar on live streams, Twitch keeps only 28 to 32 seconds of it live stream duration on the server, so isn't' possible to go back to the beginning of a streams
* The above change add a few features requested before see bellow
* Manually sync multiple streams using the progress bar, on Picture in Picture, 50/50 mode or on Multistream mode, the progress bar will control the main player, on PP mode that is the big player, on 50/50 is the top, on Multistream is the top left or the big one, this way use the progress bar to delay one of the streams until they sink
* Quick replay using progress bar, use the progress bar to quickly replay a few seconds
* Lower the latency to the streamer as lower as possible using the progress bar, be aware this will cause re-buffer if the value is too much close to the duration
* Clips and Live progress bar step is 1 second, allowing more control over the time position
* General performance improves and bug fixes

Web Version September 17 2020
==============

* General performance improves and bug fixes

Web Version September 04 2020
==============

* Prevent chat disconnection do to inactivity, technically this only affect devices running outdated version of Webview 75.X and older


Apk Version 3.0.247 - Web Version September 05 2020
==============

* General performance and visual improves

Web Version September 04 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.246 - Web Version September 03 2020
==============

* Prevent displaying wrong stream information on PP mode (only happened on a very odd case)
* General performance improves and bug fixes

Web Version September 01 2020
==============

* Improve Stay on the stream feature, prevent buffer dialog and last video frame from be displayed when the mode starts, prevent screen saver
* Improve offline chat visual and fix write to chat not showing some times

Web Version August 30 2020
==============

* General performance and visual improves

Apk Version 3.0.245 - Web Version August 22 2020
==============

* Add chat delay option base on Latency To Broadcaster, requested on [issue 15](https://github.com/fgl27/SmartTwitchTV/issues/15)
* Fix Multistream not enable when it was never used yet and PP or 50/50 was enable, bug introduced on Web version August 19 2020
* General performance improves and bug fixes

Web Version August 19 2020
==============

* Fix hold key down to enable audio all videos on Multistream, bug added on last Web version August 18 2020
* General performance improves and bug fixes

Web Version August 18 2020
==============

* Improve player bottom controls, make easier to understand what is be changed, fix not properly working options (Multistream audio and player restart was not working sometimes)

Apk Version 3.0.244 - Web Version August 17 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.241 - Web Version August 15 2020
==============

* Mitigate the freeze effects when using accessibility service, most noticeably when exiting the player, slowdowns do to accessibility service can't be fixed only mitigated, read more about it here: [“Working As Intended” – An Exploration into Android’s Accessibility Lag](https://www.xda-developers.com/working-as-intended-an-exploration-into-androids-accessibility-lag/)
* General performance improves and bug fixes

Apk Version 3.0.240 - August 10 2020
==============

* General performance improves and bug fixes

Web Version August 09 2020
==============

* Improve app start performance
* General performance improves and bug fixes

Apk Version 3.0.239 - August 08 2020
==============

* General performance improves and bug fixes

Web Version August 07 2020
==============

* Add a in app Changelog on the side panel bottom options, just a resume of the latest changes for a complete [changelog click here](https://github.com/fgl27/SmartTwitchTV/blob/master/apk/Changelog.md)

Web Version August 06 2020
==============

* Change default selected thumbnail background color to black, if you prefer the old way change it back in settings... Interface customization... Select thumbnail style... Styles... White...Apply changes... press enter

Apk Version 3.0.238 - August 05 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.237 & Web Version August 05 2020
==============

* Add new notification options on settings.. Notifications options
* Add **"Streamer changed title"** notification for followed channels, disable by defaults
* Add **"Streamer changed game"** notification for followed channels, disable by defaults
* Add **"Game is Live"** notification for followed games, disable by defaults
* General improves to the reliability and performance of notifications
* General performance improves and bug fixes

Apk Version 3.0.236 - August 03 2020
==============

* General performance improves and bug fixes

Web Version August 02 2020
==============

* Improve settings order and strings, separate Interface customizations and Content customizations
* Add a separate preview games sorting options
* General performance improves and bug fixes


Web Version August 01 2020
==============

* Add VOD chapters controls, chapters are available for VODs that the streamer played multiple games, click on a chapter go to the start of that game on the VOD
* Fix Show total logged in user in chat when the channel has too many connected users
* General performance improves and bug fixes

Web Version July 31 2020
==============

* Fix VOD chat not working when opening a VOD from the live history screen using the preview
* Add a new settings chat option: Show total logged in user on top of the chat (disable by default)

Apk Version 3.0.235 - July 30 2020
==============

* General performance improves and bug fixes

Web Version July 30 2020
==============

* Update how VOD fast backwards/forward works with a new settings options
* Add new settings options, **Minimum (starting) step time** for VOD fast backwards/forward
* Add new settings options, **Maximum step time** for VOD fast backwards/forward
* Add new settings options, **Increase timeout after** for VOD fast backwards/forward
* Add a way to lock the step, press up to lock the step value when locked press up to change the value
* VOD fast backwards/forward: when click and hold left/right the step time will increase after the increase timeout has passed, it will increase up to the maximum step time, after releasing the key and not clicking for one second the step time will reset back to the minimum step time.
* VOD fast backwards/forward: Doing single clicks without hold the key will not increase the time
* Clip fast backwards/forward didn't changed the step is always 5 seconds
* Chat purged messages: replace content with "Message purged" and change background color to blue, the color change happens whether the message was removed or not

Web Version July 29 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.234 & Web Version July 28 2020
==============

* General improve on the warning information when a video fail to play
* Fix show all latest viewed VOD on the player preview VOD history, VODs from the same channels wasn't showing by mistake
* General performance improves and bug fixes

Apk Version 3.0.233 & Web Version July 27 2020
==============

* Add three modes for low latency (press enter no enable after change) Disable and normal mode are the older modes the new is lowest mode, that can cause some more re-buffers but allows lower latency
* Add a settings options to prevent notification of streams that are live for over a mouth of time
* Improve [Channel on the home screen](https://developer.android.com/training/tv/discovery/recommendations-channel), add more information to the thumbnails and improve some things related layout and performance
* General performance improves and bug fixes

Apk Version 3.0.232 - July 25 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.231 & Web Version July 25 2020
==============

* Fix live playback when lowlatency was enable (issue added on Apk Version 3.0.230)
* General performance improves and bug fixes

Apk Version 3.0.230 & Web Version July 24 2020
==============

* General improves to [Channel on the home screen](https://developer.android.com/training/tv/discovery/recommendations-channel), this feature only works on devices running Android TV 8 Oreo and up
* Home screen Channel will no longer have content if they were never used or have be disable for over 30 minutes, Use the refresh option right after enable a channel to update it
* Clicking on the app icon of a home screen channel takes you to that in app screen
* Update ExoPlayer to latest version
* General performance improves and bug fixes

Web Version July 22 2020
==============

* General performance improves and bug fixes

Web Version July 21 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.229 - July 19 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.228 & Web Version July 19 2020
==============

* Add **User Hosting** [Channel on the home screen](https://developer.android.com/training/tv/discovery/recommendations-channel), this feature only works on devices running Android TV 8 Oreo and up, after install the app open it at least once so the new channel shows up on the available list.
* General performance improves and bug fixes

Apk Version 3.0.227 - July 18 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.226 and up & Web Version July 18 2020
==============

* Fix notification not showing for users that follow over 800 channels
* Fix home screen channel **User Live** not showing content for users that follow over 800 channels
* Fix in app **User Live** content not showing for users that didn't added a authorization key and follow over 800 channels
* Improve side panel looks, to properly show big usernames and general side panel improves
* General performance improves and bug fixes

Web Version July 17 2020
==============

* General performance improves and bug fixes

Web Version July 16 2020
==============

* Improve preview player behavier when end dialog is showing

Apk Version 3.0.225 and up & Web Version July 14 2020
==============

* Update ExoPlayer to latest version
* General performance improves and bug fixes

Web Version July 13 2020
==============

* Fix VOD not playing sometimes after exit the app playing a VOD and going back to the app

Apk Version 3.0.221 and up & Web Version July 12 2020
==============

* Update ExoPlayer to latest version
* General performance improves and bug fixes
* Add new feature [Channels on the home screen](https://developer.android.com/training/tv/discovery/recommendations-channel) added Live, User Live, Featured, Games and User games home screen channels, the channels only show up after the new app is installed and open
* **Obs.1:** This featuring is only available on AndroidTV 8 Oreo and newer OS
* **Obs.2:** Technically this featuring is just a simpler version of the in app implementation of previews over the player, but this works from the home screen and has way less features than the in app player one, this is the main reason it wasn't added before, after all the app has a way easier and better form to navigate and find what to play next...
* **Obs.3:** With the in app preview one can simply press up that is it press up noting else, and you will be able to navigate on the preview and find what play next, not just that before press enter to play if you have preview enable you can see the preview and see what is going on on the stream, so in a easy step of just pressing up then right/left one can find the next content on the other hand using the **Channels on the home screen** is very different...
* **Obs.4:** Now with the **Channels on the home screen** yes one can exclusively navigate from the home channels to the app and back for in one click, but how? Open a stream or game from a channel by pressing enter now if you wanna open something else from home, just click the home key (not the return key) this will send you back to the channel now select something else... But be aware that the process of exiting the app and going back to the app is much but much more slower then just press up and click enter on the player preview to open a new stream, simply because you are exiting the app and the process of exiting a app causes a lot of Android internal function calls and those will cost time to process a time that is 5 to 10 times bigger then opening something from the in the app preview. Any way **Channels on the home screen** is a AndroidTV featuring that was requested by users as I had some free time I could take a couple of hours of it to make add this featuring, enjoy it.

Web Version July 09 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.219 and up & Web Version July 08 2020
==============

* Update ExoPlayer to latest version
* General performance improves and bug fixes

Apk Version 3.0.218 - July 07 2020
==============

* General performance improves and bug fixes

Web Version July 07 2020
==============

* Display extra languages EN-GB for EN, ES-MX for ES and PT-BR for PT only for clips, only the clips Twitch API has support for this extra languages

Apk Version 3.0.217 - July 06 2020
==============

* Notification service, closing the app (by holding return key or using the exit dialog -> close) will now stop all running notifications
* Update ExoPlayer to latest version
* General performance improves and bug fixes

Apk Version 3.0.216 & Web Version July 06 2020
==============

* Improve notification service to be more reliable
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

Apk Version 3.0.200 and up & Web Version June 3 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.195 and up & Web Version May 18 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.194 & Web Version May 18 2020
==============

* Add a player control to open the Main player on a external player, this is very useful with a popup external player.
* General performance improves and bug fixes

Apk Version 3.0.177 and up & Web Version April 28 2020
==============

* General performance improves and bug fixes


Apk Version 3.0.172 and up & Web Version April 20 2020
==============

* Add a write to chat option included to the player controls, on it added fully customizable keyboards, a keyboard for it type of emote from Twitch, BetterTTV, FrankerFaceZ and another for Unicode emojis
* General performance improves and bug fixes

Apk Version 3.0.168 and up & Web Version April 11 2020
==============

* Add a setting option to allow background notification over other apps, this is disabled by default.
* General performance improves and bug fixes

Apk Version 3.0.164 and up & Web Version April 1 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.163 & Web Version March 30 2020
==============

* Add preview thumbnail to VODs SeekBar (only available for VODs that have this featuring working on twitch website), as you scroll to the SeekBar you see a preview of the content is on that position in time, the number of preview images is limited to 200 by Twitch, meaning that on stream that are very long the preview image is responsible for a long part of the video meaning_2 that when you press to seek to a position the playback maybe a little before or after the preview

Apk Version 3.0.155 and up & Web Version March 25 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.153 an up & Web Version March 24 2020
==============

* Add new player status, Ping to Twitch, allows to know what is the latency to Twitch servers, high latency means slow to load content, this included all app content streams, refreshes, images etc...
* General performance improves and bug fixes

Apk Version 3.0.148 and up & Web Version March 22 2020
==============

* Update all the players process to improve performance and reliability
* General performance improves and bug fixes

Apk Version 3.0.146 and up & Web Version March 17 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.145 & Web Version March 16 2020
==============

* Click left/right on Multistream main window bigger mode to change with is the main window, it's chat
* Update controls related to audio changes on PP and Multistream, check controls
* General performance improves and bug fixes


Apk Version 3.0.144 and up & Web Version March 14 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.143 & Web Version March 13 2020
==============

* Add a new mode for Multistream that makes the main window bigger show it's chat on the side and makes all other widows smaller, press key down to enable/disable

Apk Version 3.0.122 and up & Web Version February 27 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.119 and up & Web Version February 25 2020
==============

* Add a side panel player and a small player to the player live feed (auto-plays when select a tile, similar to Netflix autoplay when hover featuring, small player can be disable in settings)

Apk Version 3.0.110 and up & Web Version February 4 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.109 and up & Web Version January 31 2020
==============

* Major version update from 2.0.X to 3.0.X
* Add 4 way Multistream for user live content

Apk Version 2.0.107 and up & Web Version January 6 2020
==============

* New User history screen for Live, VOD and clip histories

Apk Version 2.0.105 and up & Web Version December 29 2019
==============

* General performance improves  and bug fixes

Apk Version 2.0.67 and up & Web Version September 10 2019
==============

* General performance improves  and bug fixes

Apk Version 2.0.66 & Web Version September 9 2019
==============

* Add Low latency controls to Live player 
* General improves for performance

Apk Version 2.0.52 and up & Web Version August 15 2019
==============

* General improves for performance and minor bug fixes

Apk Version 2.0.51 & Web Version August 13 2019
==============

* 50/50 Mode two live stream and two chats at the same time

Apk Version 2.0.46 and up & Web Version August 11 2019
==============

* Major version update from 1.0.X to 2.0.X
* Rework the player interface to add new features and general improves.
* Add Picture in Picture mode (Check setting and controls to understand how to setup and use it)
* Add full player status in player top right corner, can be set to be visible all the time in settings

Apk Version 1.0.10 and up & Web Version April 24 2019
==============

* General improves for performance, bug fixes and new features.


Apk Version 1.0.0 to Version 1.0.9 & Web Version April 20 2019
==============

* Initial app release, that was a port from the Samsung version of the app https://github.com/fgl27/smarttv-twitch

## Full list of changes check [Project commits](https://github.com/fgl27/SmartTwitchTV/commits/master)
