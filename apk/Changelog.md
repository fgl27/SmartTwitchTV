SmartTV Twitch AndroidTV APP latest changes
==============

Bellow changes are just a resume of all changes made to the repo to check the full changelog list check the [commit list](https://github.com/fgl27/SmartTwitchTV/commits/master).

The App is divided in two part, **Apk** and **Web** you can check it version in the about of the app:
* The **Apk** is updated via play store it contains the app video player and the basic function that don't work on the web part of the app.
* The **Web** is update every time that the app is closed and you re-open it (of course if a update is available in the web server), it contains the user interface and related functions. If the app is open and you change apps that process doesn't closes the app only minimizes it unless the system run out of memory and close the app, to manually close it's needed to select close on the exit dialog or simply holding the return key to force close it.

The app has a building update check function, so whenever there is a update a red text will show up bellow the main pages clock, also a short warning will pop on the screen let you know if is a **Apk** or **Web** update.

Version May 27
==============

* Update player dependencies to latest version, this may solve some player related issue
* Fix support for VOD of current live, Twitch is now providing full replay of the live but you need to open it from the most recent VOD, when detected the playback will start from the end of the VOD and will continue update the duration
* Chat is not perfect in the VOD of current live if you are too close to where the live is, some chat messages may not show and the sync is a little off
* Fix random scenario that after changing app the player stayed loading for ever when returning to the app
* General improves

Version March 09
==============

* Improve clock style
* Add 24, 12h AM PM and 12h clock styles to Settings > Customize interface, color style, animations and related
* General improves



Version January 27 & 28 2024
==============

* General improves

Version January 19 2024
==============

* General visual improves

Version December 29 2024 🎉 🎊 🥂 ✨ 🎅 💖 🤶 ✨ 🥂 🎊 🎉
==============

* Add support for Shared chat
* Add new settings option Chat > Disable shared chat (No by default)
* Add new settings option Chat > Show Shared chat badges (Yes by default)
* Add new Player controls Chat extra settings > Disable shared chat (No by default)
* 🎉 🎊 🥂 ✨ 🎅 💖 🤶 ✨ 🥂 🎊 🎉 Happy New Year, Merry Christmas, and Happy Holidays everybody!!! 🎉 🎊 🥂 ✨ 🎅 💖 🤶 ✨ 🥂 🎊 🎉

Version December 28 2024 🎉 🎊 🥂 ✨ 🎅 💖 🤶 ✨ 🥂 🎊 🎉
==============

* Fix scenarios where the player was in an "undefined" state, this was happening mostly  when playing 4 way multistream with only 3 streams
* 🎉 🎊 🥂 ✨ 🎅 💖 🤶 ✨ 🥂 🎊 🎉 Happy New Year, Merry Christmas, and Happy Holidays everybody!!! 🎉 🎊 🥂 ✨ 🎅 💖 🤶 ✨ 🥂 🎊 🎉

Version December 24 2024 ✨🎄🎅 🔔 🤶🎄✨
==============

* Add new settings option to Auto Switch content to All language when current language has no content enabled by default
* ✨🎄🎅 🔔 🤶🎄✨ Merry Christmas, and Happy Holidays everybody!!! ✨🎄🎅 🔔 🤶🎄✨

Version December 19 2024
==============

* Add zero-width/overlay emote support, thanks to @JanitorialMess for the help
* General improvements

Version December 01 2024
==============

* Add Highlight First-Time ChatterSettings chat option, enabled by default
* Add option to configure chat badges, change by @Js41637
* General improvements

Version November 29 2024
==============

* Prevent issues when switching or auto-refreshing game sections, the app always tries to remember the position and Streams showing when you exit and go back to a game section it only refreshes when the Auto-refresh timeout expires, but before this changes sometimes it was not doing it instead, it was showing old streams after an auto-refresh
* Fix player User Games section not loading more than 100 live channels for a selected game
* General improvements

Version November 27 2024 Apk Version 3.0.372
==============

* Update player dependencies to latest version
* General improvements

Version November 15 2024
==============

* Add extra languages to the Content language, this may change your previously selected language after the update set the language again
* General improvements

Version October 25 2024 Apk Version 3.0.369
==============

* Fix crashes for devices with bigger RAM (4+GB) when playing VOD, even that teh device has a large amount of RAM if the app uses it for buffer the app will crash
* Fix old deleted vod not being deleted from live history
* Fix old deleted Lives not being deleted from live history
* Fix Game content not showing the latest content when the app did a auto refresh in background, very  hare but after the app was running for a long time there was a chance the app did refresh in background but shows old none refreshed content
* Fix showing blocked content randomly, after navigating to a blocked content and exit the app in a very random scenario this can happens
* Fix player controls miss behaving randomly
* Fix screen with a single content not allowing to open the content, issue introduced in last version
* Improve numeric VODs jump to % function
* Improve media keys Live/VODs jump to 5/30 seconds function
* Other General improvements

WebVersion September / October
==============

* Fix missing information on player top info for some scenarios
* Fix missing information on channel content screens
* Fix not be able to open the game for some scenarios in the thumbnail options
* Fix current game in player content not always showing current game
* Fix scenario where not enough content load on the screen even when it is available preventing scrolling to get more content
* General etc improvements

WebVersion September 09
==============

* Fix animation lag in the Clip section, Twitch was sending images that were too big causing lags
* General performance improvements

WebVersion August 17
==============

* Update the emotes selection screen to improve performance, no magic can improve the performance here more than what is, simply some devices are capable of playing 8k but they can't handle multiple animated images, also some emotes servers are terribly optimized, for example, 7TV


Version August 2024 Apk Version 3.0.367
==============

* Update Codec capability & Blocked codecs settings section to support devices that have the same name for multiple codecs
* Android 10 and up now can see with codecs are hardware or software
* Due to changes above the codec section was reseted if you make changes to it please redo yours changes
* General visual improvements
* Other General improvements

Version August 2024 Apk Version 3.0.365
==============

* Add support for HEVC H.265 and AV1 Live and VOD (Settings Extra codec support), it still depends on the streamer to use and is on beta testing only some can
* Update Codec capability & Blocked codecs settings section to support new codecs and to show better information
* Improve display and sorting for player quality, sometimes it can come out of order from the server or have missing information
* Fix Auto quality not playing stream with a resolution bigger than the device's current resolution
* Home screen content will no longer show blocked content
* Add new settings option "Catch-up with low latency" auto-adjust the latency if it is behind the expected target, by slowing or speeding the stream by 1%
* Improve progress bar for lives playback, show proper duration if paused for too long
* General app text improves, this is an open source app anyone that wanna improve app text or add translations can the process is simple
* Other General improvements

Version March to July 2024 Apk Version 3.0.363
==============

* Add a red icon when the channel is live for the User channel and channel search screen
* Improve User live side panel loading
* Improve User channel screen loading
* Player: Migrate from Exoplayer to Media3, the Exoplayer changed its name to Media3 and stop received updates on the old project, if anyone has any issue regarding playback please open a GitHub issue or send an email
* Change Featured to Front Page (name change only)
* Add User Videos section
* Improve channel search results order, Twitch provides no order on the result, do a local ordering to show a more constant result
* Add search Live
* Add Search Videos
* Show all counters on all game screens
* Fix sometimes opening the wrong VOD for "Open the Last VOD" (the one of the options that show when a live end)
* Fix preview animated image not always showing
* Fix VOD seek preview image not always showing
* Improve exiting a search or search content as Channel content you enter after a search, before the app sometimes exit a search on the wrong section
* Improve app exit functionality
* Improve disable mature content with a password, now after enabling mature the old pass will be deleted, add a new one if disable again
* General app text improves, this is an open source app anyone that wanna improve app text or add translations can the process is simple
* Other General improvements

Version September 2023 to March 2024
==============

* Fix App not able to start when Settings Chat options 'Show viewers' and player chat settings 'Side by Side, video and chat' was enabled
* Fix unable to change quality during playback if the default quality in settings was different than AUTO
* Fix playing single quality streams
* Fix auto playback not selecting the best possible quality for Live streams, Twitch messed up their bitrate information provided by their servers, with caused issues as the app uses the bitrate and current available internet speed (bandwidth) to determinate what quality to select
* Fix VOD playback starting from 00:00, after switching apps during a VOD playback the app could lose the VOD time position when you come back to it
* Improve the chat delay option, sometimes the chosen option wasn't working as expected
* Improve player controls, sometime the player would show an option not available for that type of playback which causes control issues
* Add extra playback speeds (by Js41637)
* Fix the thumbnails option (hold left) not showing all options or showing and not allowing to move up/down
* Fix hiding blocked VODs in some of the VOD section
* Fix clip playback selecting the best quality, Twitch changed how they order clip options on the server, making necessary local ordering.
* General chat improvements
* General UI/UX improvements, make it easier to use or understand the app
* Other General improvements

Web Version September 11 2023 and Apk Version 3.0.349 and 3.0.350
==============

* Add new user logging method that allows you to fully use yours privileged in the app
* Note: after opening this update there will be no user, after adding a user history and blocked configuration will be restored
* Add follow/unfollow buttons back
* General improvements

Web Version August 08 2023
==============

* Add an option to block channels and games, use the thumbnail option to set by holding left above any thumbnail, then press enter above the channel or game to block
* Add "Show blocked" to the thumbnail option, setting this to YES allows you to see all blocked content without having to unblock it
* Add a new user section "Blocked", to manage blocked content
* Note about blocked: Blocked channels or games don't apply to followed channels
* Note about blocked: If you open a blocked game content, it will show all content minus blocked channels
* Note about blocked: If you open a blocked channel content, it will show all content
* Make highlighted messages in chat have the same background transparency as the chat
* Fix extra emotes (FFZ, BTTV, 7TV) not showing on one of the chats in 50/50 plus chats mode
* Add a new warning for users using the app without a user or authorization token: The app is failing to load the content due to a Twitch API limitation, to fix this add a user and authorization token, there is no workaround for this is just a Twitch API limitation
* General improves

Web Version June 17 2023
==============

* Add Screen off (Audio only) option to player
* General improves

Web Version June 11 2023
==============

* Add setting options to block Mature content

Web Version June 03 2023
==============

* General chat improves

Web Version May 31 2023
==============

* Fix live playback
* Fix chat badges

Web Version May 08 2023
==============

* Add Top VOD section back
* Fix Top Clip and VOD
* This section's API are undocumented and a little unstable, but works most of the time, if it fails refresh it

Web Version May 05 2023
==============

* Fix VOD chat

Web Version February 25 2023
==============

* General UI improves
* General improves

Web Version February 24 2023
==============

* Add Carousel seek preview mode for VOD, enabled by default
* Add settings options to change or disable seek preview mode
* Fix VOD animated preview img, not all VOD have an animated preview
* General improves

Web Version February 23 2022 and Apk Version 3.0.347
==============

* Update player to latest version
* Fix resolution cap at 720p or lower for the main player during PP mode (only affected a few devices)
* General improves

Web Version February 18 2023
==============

* Improve volume scale to use steps of 5% (this reset some volumes to default, Player Preview volume to 100% and player volume (When preview is showing) to 25%)
* Improve preview related settings description to be easier to understand
* Add controls over the mains screen player volume (Settings Player section -> Preview thumbnail player settings -> Screen preview volume)
* General improves

Web Version January 29 2022 and Apk Version 3.0.345 and Up
==============

* Update player to latest version
* Fix random unwanted background playback
* Add a option to open the VOD of current Live once the Live end (Only works if you have a user and Live history enabled)
* General improves

Web Version January 16 2023
==============

* Replace Purple proxy with K-Twitch-Bypass
* General improves

Web Version December 14 2022
==============

* Update VOD/Clip chat to use new API, old one was disabled
* General improves

Web Version November 15 2022
==============

* General improves

Web Version October 17 2022 and Apk Version 3.0.344
==============

* General improves

Web Version September 06 2022
==============

* Fix VOD playback for devices running Old Android version

Web Version August 28 2022
==============

* Re enable Clip screen, temporarily as this API may stop work at any moment
* General improves

Web Version August 20 2022
==============

* Add proxy controls to player

Web Version August 19 2022 and Apk Version 3.0.343 and Up
==============

* Demanding make sure you are running the latest version of the APK 343, if not the app will not work properly
* Add Proxy to setting player options (all proxy disabled by default), this are internet censorship and related proxy
* When the Proxy is enable you may experience longer buffer at start of a stream, but after all must work OK, if not disable it or change to a different proxy option
* Add proxy status to the player status (player top right info)
* Proxy only affects live streams
* General improves

Web Version August 03 2022 and Apk Version 3.0.338 and Up
==============

* Fix sometimes missing streamer name on notification and home screen content
* Migrate Vod seek preview image to new Twitch API
* General improves

Web Version July 27 2022
==============

* Fixes issue when using the app without a user

Web Version July 16 2022 and Apk Version 3.0.335 and up
==============

* Update app Player to latest version
* General improves

Web Version July 13 2022 and Apk Version 3.0.334 and up
==============

* Update channel on the home screen to work on the new Twitch API
* Update notificatons to work on the new Twitch API
* Is now necessary to have added a user and a key for all channel on the home screen
* General improves

Web Version July 12 2022
==============

* Update User channel screen to use new Twitch API
* Update Search Game to use new Twitch API
* Update Search Channel to use new Twitch API
* Remove Search Live no longer supported by new Twitch API
* Update Feature screen to use new Twitch API
* General improves

Web Version July 11 2022
==============

* Update User games screen, Twitch API no longer support Followed games this API is unsupported and may stop working, this Followed games API can only provide 100 Live games, if you follow more then that the last Games you follow will not show
* Update User channel Vod screen to use new Twitch API
* Update Game Vod screen to use new Twitch API
* Remove unsupported side panel screens
* General improves

Web Version July 10 2022 and Apk Version 3.0.332 and up
==============

* Fix FFZ emotes from channels that recently changed name by @Js41637
* Fix latency issues
* Improve the option Open game from Thumbnail options
* General improves

Web Version February 21 2022 and Apk Version 3.0.330 and up
==============

* Prepare the app for API changes
* Twitch is about to shutdown some of they API, because of that the app sometimes doesn't load content, the next few days the app will receive updates to deal with the shutdown, make sure you are on latest APK version to not have problem
* When Twitch Shutdown they API some parts of the app will not work, the most used part will work as they are already using the new API
* After this update the user must add a new authorization key even if one was added before
* This new API demands the user to have a authorization key to access most of content, make sure you have added a user and a authorization key to prevent issues
* Update app dependencies to latest version included the player
* If you have any issue check github https://github.com/fgl27/SmartTwitchTV/issues

Web Version December 04 2021
==============

* Minor improve to screen aspect ratio, only improves on some devices that have issues, if you didn't had an screen size/aspect ratio  issue before and now you have please inform, contact inf in the about of the app


Web Version September 12 2021
==============

* Allow to control audio and volumes for all types of players

Web Version August 28 2021
==============

* General improves and bug fixes
* Add minimal support for Browsers, allowing the app to work on any device that has a working Web Browsers
* Acess using the link https://fgl27.github.io/SmartTwitchTV/release/index.html
* Not all Browsers may support the app
* The Browsers support is limited, the limitation is on the player and chat, there isn't support for Picture in Picture mode, Multistream or Previews
* The chat that shows in the Live player will logging with the same user that you have looged in on the Twitch official site on that Browser
* The Browsers support mouse input, clicks, mouse wheel and mouse hover
* One click selects, two will open a Live, VOD or Clip
* To show the in player preview, place the mouse on the top-center of the screen and use the mouse wheel, UP shows, Down hide
* Place the mouse over the preview and use the wheel to scroll throw the content

Apk Version 3.0.329
==============

* Fix channels on the home screen not showing content

Apk Version 3.0.328
==============

* Fix minor player regression

Apk Version 3.0.327 and Web Version August 10 2021
==============

* Add settings Chat option to Highlight messages from the streamer and mods
* Add player bottom controls option to show all player controls
* General improves and bug fixes

Apk Version 3.0.326 and Web Version August 07 2021
==============

* General improves and bug fixes

Web Version July 22 2021
==============

* General improves and bug fixes

Apk Version 3.0.325
==============

* General improves and bug fixes

Web Version July 21 2021
==============

* Add a new setting Chat option 'Block bots and bot commands (!command) from show in chat'
* General improves and bug fixes

Apk Version 3.0.324 and Web Version July 17 2021
==============

* Update side panel styles
* Add a new settings option 'Hide the side panel after 5 seconds of not using it' to 'Customize interface, color style, animations and related'
* Allow to access the 'Thumbnail Options' even when the content of the screen is empty, this is useful when changing to a language that has no content
* General improves and bug fixes

Apk Version 3.0.323
==============

* General improves and bug fixes

Apk Version 3.0.322
==============

* General improves and bug fixes

Web Version July 4 2021
==============

* Update Game section to allow changing games back and for without having to refresh and loose previously loaded content and position, now the app will always remember the content and position of a game that you have open before (For Live, Clips and VOD), until you refresh or the app auto refreshes (if 'Auto refresh in background' is enable in setting -> Content customization's ...)
* General improves and bug fixes

Apk Version 3.0.321
==============

* General improves and bug fixes

Web Version June 24 2021
==============

* General improves and bug fixes

Web Version June 22 2021
==============

* Add support to 7TV emotes

Web Version June 21 2021
==============

* Add support for Twitch animated emotes

Web Version June 13 2021
==============

* General improves

Apk Version 3.0.319 and Web Version Jun 10 2021
==============

* Improve Auto quality playback
* General improves and bug fixes

Web Version May 27 2021
==============

* Fix clips playback

Apk Version 3.0.318 and Web Version May 23 2021
==============

* General improves and bug fixes

Apk Version 3.0.317 and Web Version May 17 2021
==============

* Add Spanish translation (not complete),Thanks to Lucas for the help
* Any one can help to improve the app, if you wanna to add yours language to the app translations or improve a existent one, just check the app github page for instructions on how to help
* General improves and bug fixes

Web Version May 16 2021
==============

* General improves and bug fixes

Apk Version 3.0.316 and Web Version May 13 2021
==============

* General improves and bug fixes

Apk Version 3.0.315 and Web Version May 07 2021
==============

* Improve translation
* General improves and bug fixes

Apk Version 3.0.314 and Web Version May 06 2021
==============

* Improve translation
* General improves and bug fixes

Apk Version 3.0.313 and Web Version May 03 2021
==============

* Add Portuguese (PT-BR) and Russian translation,Thanks to Stay vibrant for the help
* Any one can help to improve the app, if you wanna to add yours language to the app translations or improve a existent one, just check the app github page for instructions on how to help
* General improves and bug fixes

Apk Version 3.0.312 and Web Version April 09 2021
==============

* General improves and bug fixes

Web Version April 02 2021
==============

* Fix 'Highlight @streamer messages' not working some times

Web Version March 13 2021
==============

* Fix host checks

Apk Version 3.0.311 and Web Version March 10 2021
==============

* General improves and bug fixes

Web Version March 8 2021
==============

* Add support to see chat messages that were sent before you joined the stream

Web Version February 28 2021
==============

* General improves and bug fixes

Apk Version 3.0.310 and Web Version February 25 2021
==============

* General improves and bug fixes

Apk Version 3.0.309 and Web Version February 20 2021
==============

* General improves and bug fixes

Apk Version 3.0.308 and Web Version February 18 2021
==============

* General improves and bug fixes

Apk Version 3.0.307 and Web Version February 17 2021
==============

* General improves and bug fixes

Apk Version 3.0.306 and Web Version February 15 2021
==============

* General improves and bug fixes

Apk Version 3.0.305 and Web Version February 11 2021
==============

* General improves and bug fixes

Apk Version 3.0.304 and Web Version February 10 2021
==============

* Add new End dialog and player controls button, "Streamer is now Live", let you know when watching a VOD or a Clip that the streamer come online
* Add a new warning in Setting -> Warnings, Show "Streamer is now Live" warning, disable by default, small pop warning that show the first time the streamer comes online
* General improve on playback experience
* General improves on player controls looks
* Others general improves and bug fixes

Web Version February 06 2021
==============

* General improves and bug fixes

Apk Version 3.0.303 and Web Version February 02 2021
==============

* Add a new in app update process to update the APP the APK and Web app
* Change side panel option 'Changelog' to 'Update & Changelog'
* Add a new settings 'Update options' to controls if the app will check for updates and if will show a dialog informing a update is available and allowing to click to update
* This new dialog allows to check for updates, and when updates are available you can update on one click, also allows to read the changelog
* If you install the app from Play store (TV only device), this dialog will inform and allow you to open the play store direct on the app page so you can update easily
* If you install manually, the app can now just update it self by downloading the APK and allowing to install, if you are on Android 8 or newer make sure to give the APP install permission
* If the update is only on the Web app now you can use the update dialog to update on one click, no longer need to close the app to update
* As this feature was added on APK version 3.0.299 you need to be on that version or newer so all features can work
* General improves and bug fixes
                
Apk Version 3.0.297 and Web Version January 28 2021
==============

* Prevent to show wrong value for Latency to broadcaster, may take 5 to 30 seconds for the value correct it self after the next problem happens, only happens after a stream goes offline unintentionally and to prevent closing the stream Twitch keeps the stream open until the stream comes back, on this case for internal reason the clock generated by the server became delay with makes the value of the latency way too offsetted
* General improves and bug fixes

Web Version January 22 2021
==============

* Add new setting options 'Use rounded channel images' (disabled by default) to settings -> Interface customization's, color style, animations and related
* Improve live channels side panel looks
* General improves and bug fixes

Web Version January 21 2021
==============

* General improves and bug fixes

Apk Version 3.0.295 to 3.0.296 and Web Version January 15 2021
==============

* Add **OLED Burn in protection** option to Settings -> Interface customization's, color style, animations and related
* General performance improves and bug fixes"

Web Version January 09 2021
==============

* General performance improves and bug fixes

Apk Version 3.0.294 and Web Version December 28 2020
==============

* Update how the player UI works, to improve the experience also to add more controls
* Add a Preview settings to the player controls
* Add a Audio & Volume controls to the player controls, for PP and or MultiStream, now next to the streamer name there will be two icon one indicates if the audio is enable the other the approximated volume
* Add a Player status visibility control to the player controls
* Add a options in settings -> chat to Allow to see viewers on top of chat
* Fix all minor issues that was found on the past few weeks, if any one has any issue or request use the contact info in about of the app to inform
* General performance improves and bug fixes
* Is demanding to update to the latest APK if you don't the app will not work properly
* Enjoy the app! Have a great new years!

Web Version December 05 2020
==============

* Revert 9XXp60 be disable by default on Xiaomi Mi Box S, as the device received a OS update to fix the problem, if you didn't received yet check the device update in settings, device preference, about then system upgrade, this closes the bellow issue
* [Xiaomi Mi Box S: 90% frame drops on 9XXp60 but OK for 1080p60](https://github.com/google/ExoPlayer/issues/7411) issue closed the resolution there is that the Manufacturer will update the OS to fix the problem, the problem is on the this device maybe on others that use Amlogic CPU
* Fix games search
* General performance improves and bug fixes

Web Version December 05 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.290 to 3.0.293 - Web Version December 01 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.288 and 3.0.289 - Web Version November 30 2020
==============

* General performance improves and bug fixes

Web Version November 29 2020
==============

* General performance improves and bug fixes

Web Version November 24 2020
==============

* Add new settings options to auto minimize the app do to inactivity... See it on Settings -> Content customization's, sorting, auto refresh, timeouts and related
* General performance improves and bug fixes


Web Version November 23 2020
==============

* Add new settings options to hide UI elements as clock, navigation help and etc... See it on Settings -> Interface customization's, color style, animations and related
* General performance improves and bug fixes

Apk Version 3.0.287 - Web Version November 22 2020
==============

 * Twitch disable some of they API used to get user content lists followed hosts and followed games, because of that some of the app features was removed or changed the changes see bellow
 * User followed host content was fully removed
 * Live followed game notification is no longer available
 * User followed games content was changed the app will only display the full list of followed games all of yours followed games will be displayed, the user live games list is no longer available, the only other available user live game API is limited to displayed 100 games MAX and it will only show the first 100 you followed meaning that if you follow more then 100 games you will not be able to see any new game you followed after that 100 mark if that API was used, because of that the app will not used that 100 caped API and will use the full followed API that show the full list of followed games, the sort of this list is base on the game you followed first and can't be changed
 * Is no longer possible to see on the 'A Game' screen if you follow that game, also not possible to follow or un-follow a game
 * Channels on the home screen features will no logger have user followed host or followed games
 * If in the future a new way to access this content changed/removed is available this features will be revised
 * Is demanding to update to the latest APK if you don't the app will no longer work
 * General performance improves and bug fixes

Apk Version 3.0.286 - Web Version November 16 2020
==============

* General performance improves and bug fixes

Web Version November 16 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.284 to 3.0.285 - Web Version November 10 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.280 to 3.0.283 - Web Version November 09 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.279 - Web Version November 03 2020
==============

* General performance improves and bug fixes

Web Version November 02 2020
==============

* Improve the sub message displayed in chat

Apk Version 3.0.278 - Web Version November 01 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.274 to 3.0.277 - Web Version October 31 2020
==============

* General performance improves and bug fixes

Web Version October 30 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.273 - Web Version October 29 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.272 - Web Version October 28 2020
==============

* General performance improves and bug fixes

Web Version October 27 2020
==============

* General performance improves

Apk Version 3.0.270 - Web Version October 26 2020
==============

* Add controls over the color of VOD/Clip thumbnails Watched progress bar
* Fix random cases that cause playback issues after an internet lag
* General performance improves and bug fixes

Apk Version 3.0.268 and 3.0.269 - Web Version October 22 2020
==============

* Fix preview volume control
* Automatic cleanup history unreachable Lives that became a VOD but the VOD is now deleted
* General performance improves and bug fixes

Web Version October 21 2020
==============

* Add a progress indicator to already watched VOD/Clip
* Save a clip as watched when the previewed clip ends (of course if history is enabled for clips)
* Automatic cleanup history unreachable (deleted from the server) VOD/Clip
* General performance improves and bug fixes

Web Version October 20 2020
==============

* Improve player progressbar use, by hiding etc information not needed when using it
* General performance improves

Apk Version 3.0.267 - Web Version October 19 2020
==============

* Allow the settings blocked resolution to also work on clips
* General performance improves and bug fixes

Apk Version 3.0.265 and 3.0.266 - Web Version October 18 2020
==============

* Fix issue that sometimes a stream didn't play and the app did noting about it, this was most noticeable after a resume (restoring the app from background AKA change apps) and multistream was enable one of the stream may not properly load do to error, now the app will try to prevent it if not possible will warn
* General performance improves and bug fixes

Web Version October 13 2020
==============

* General performance improves and bug fixes
* Fix player top panel not showing the correct audio source icon next to the streamer name

Apk Version 3.0.264 - October 12 2020
==============

* Fix Multistream audio issue, sometimes a stream that didn't had audio enable changed the audio to enable without user interaction
* General performance improves and bug fixes

Apk Version 3.0.263 - Web Version October 11 2020
==============

* General performance improves and bug fixes

Apk Version 3.0.262 - Web Version October 05 2020
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
* On future app updates I'll update on the resolution of this issues
* Thanks for all the users and the ExoPlayer team members that helped with this issues

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
