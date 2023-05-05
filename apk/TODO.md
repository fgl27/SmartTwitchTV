# Project TODO, featured request, ideas and etc related list

The information on this file is a expectation of what will be done to the app, that means that some of the information here may change, be removed or not become a real featuring, there is no priority on what will be done first or when, also the order of the list doesn't affect what will be done first or when.<br>

One observation: if a feature was added by a user request that feature will only be removed if is something that isn't possible to do and the user will be informed about it.

# Featured request list

-   **[Light mode for chat](https://github.com/fgl27/smarttv-twitch/issues/122)** ... White background for chat and side by side mode, all the logic and a control need to be created, looks very terrible on most TV
-   **[Separate @ Mentions from Chat Scroll](https://github.com/fgl27/smarttv-twitch/issues/131)** ... Pin a chat message when the user is mention, all the logic need to be created
-   **[Select multiple languages](https://github.com/fgl27/SmartTwitchTV/issues/21)** ... Allow to select more then one language for app content, is not just allow, all the logic need to be created Twitch API doesn't support this
-   **Add a way to change the device screen refresh hate base on the app content** (requested via EMAIL), some user prefers to use a refresh other then 30 or 60 because of it they requested this, the app has too many player that work at the same time, one player may be using one refresh rate another other the refresh may change dynamically do to auto quality playback, all of that makes things very complicated, also I personalty don't like this feature as it can cause a device sync error after some changes mostly if you change too fast (something that may happens when playing in auto mode) the screen will just go black and never restore, forcing the user to do something as change/restart the video source or reboot the devices BOX and or TV, plus if the device is slow to change there may be a long 3+ seconds of noting bug black screen until the new refresh rate is accepted, as this is technically something unnecessary (as one can just keep the device at 60 as twitch content is most 30 or 60 no issue there will be) and can cause bugs I @fgl27 personalty will not add it, any one is welcome to do add it as long all described here is addressed is fine.
-   **[Ability to "follow" channels without any Twitch account whatsoever](https://github.com/fgl27/SmartTwitchTV/issues/30)** ... Too much work the app must be redesign to work as if there is a user when there is no user, with will take a complete redesign of almost all app, as a user or no user check is everywhere
-   **[Feature Request - Sort Twitch channel emotes to the top of the Twitch emotes category](https://github.com/fgl27/SmartTwitchTV/issues/72)** ... something not supported today re check on the future to see if supported
-   **[Feature Request - Highlight keywords in chat](https://github.com/fgl27/SmartTwitchTV/issues/69)** & **[Feature Request - Blacklist user or message](https://github.com/fgl27/SmartTwitchTV/issues/83)** ... this needs a UI that allow to add, edit and remove strings to filter, that UI can be used for different things filter chat, filter content games or channels etc related.
-   **See if is possible to add support for closed captions** (requested via EMAIL), Channel Ezekiel_III uses an OBS plugin that sends the closed captions into Twitch's interface, verify if is possible to get that info and use in the app.
-   **Workaround for devices without PP or Multistream capability (low number of codec instances)** (requested via EMAIL), Multiplayer settings workaround section, contain a option that allows to use HW codec for the main player and SW codec for the others, probably will only work OK if the player resolutions are low.
-   **Add an player option to stretch 4 by 3 streams** requested via play store.
-   **Hide channels and game from showing** (requested via EMAIL and issue [Feature Request: Hide thumbnails](https://github.com/fgl27/SmartTwitchTV/issues/144)) New entry on thumbnails option (hold left) to set, plus one option to display the list of hidden, new UI to enable and disable those added
-   **[Save individual channel volume settings](https://github.com/fgl27/SmartTwitchTV/issues/127)**... Possible, probably by only changing JS code, eg. After playback starts, if volume is saved for the current channel we can set volume by restoring the value of Play_volumes[0] and calling OSInterface_SetVolumes and OSInterface_ApplyAudio.
-   **Allow to control the Main player of multi stream separated** Today the same control for resolutions and bitrate applies to all small players that includes all Multi stream players, technically it is possible to add a separated option just for the Main one when it is on Main big mode related to [Picture in Picture Quality issue ](https://github.com/fgl27/SmartTwitchTV/issues/138).

# Issues list

-   Improve quality selection fun when not using source \* **[Changing default player quality to 720p doesn't change bitrate](https://github.com/fgl27/SmartTwitchTV/issues/40)**

# TODO list

### Update screens thumbnail options

-   General improve
-   Change the name to "Extra screen options" or something like this
-   Update the function so it work more like the player controls, in relation to the construction of the UI
-   Construct the UI with all possible options, and on it screen there will be a function that will set with options will be visible, technically what is done today but on a way that is easier to manage
-   Add two extra option to replace the "Content language", one is global language and one is screen language, if the screen is not set the screen will load on the global
-   Add a option to follow and unfollow channel and games
-   Maybe add some extra options that makes sense...

### Update screens general improves

-   General improve
-   Make screen to use only one value X, not X_Y, this will make easier to understand and use the screens
-   Add some proper check to prevent preview on screens to remove and add thumbnail on a browser when exiting the player... browser only check probably can improve general use of the app

### Add a dialog that add extra options to the player preview

-   New feature
-   Probably will show when holding down
-   similar to the dialog that exist today on the main screen when left key is hold, similar options similar behavior
-   Do this only after screens thumbnail options have be updated, so is all similar

### Update the channels screen

-   New feature
-   Update top option that today are 3 to 4 and on that forth add a "is following who" option so one can see what channel that channel/user follows
-   For this probably need to add a extra channel holder screen, on title show "Name is following channels" or something like that

### Improve translations

-   General improve
-   I (project main developer) don't nativity speak English, but do PT-BR
-   Because the above the main app English strings probably aren't 100%, so it can always be improved

### Improve restore backup dialog

-   General improve
-   Add more restore options that can be disable
-   Add restore settings
-   Add restore screens position and etc related as player settings
-   to add this featuring is better to add a obj that saves all the things, one for settings one for general player and screen things
-   Make Main obj the singular obj that is used to save all minus history and user
-   On settings update the settings obj so it loads from a fun as screen, included on it the strings and remove the old workaround for 0 defaults
-   On settings add a temp var to check if the prop already exist on main obj if yes restore from it if not set the prop to main prop

### Update how string works on the JS side of the code

-   General improve
-   Change strings to be a obj, this will make easier to work with languages changes by the user
-   The idea is to have a main string obj default_string, saved as a `JSON.stringify` string...
-   When the app first load it parses the string `JSON.parse`, is faster to the JS engine to parse a `JSON.stringify` in relation to have the obj as a obj (this in relation to when all JS files are first parsed)
-   When the app first loads it clones the default string to the EN_US language
-   When a language change is requested first we reset the default obj base on EN_US then change to the new Lang
-   That is to make sure the app lang is fully reset before change from one none default language to another, as some languages may not have all strings translated
-   Don't keep any translation on the app master code, but download they on the app start
-   Use a background http get fun to download all the strings that are save as a `JSON.stringify` string obj
-   Make a page similar to the app/etc/emojis.js that generates the translations `JSON.stringify` string obj all in one single obj
-   When the app first loads, download that and parse it to a obj
-   use the EN_US, PT_BR and etc standard as the obj property the same that will be used by the UI that allows language change
-   In order to show the user the language that he chose when the app first start and may have not yet finished download the extra language, save current user language using `Main_setItem` and restore that at start
-   Once the app has finished downloading the languages update from it and save it again `Main_setItem`
-   Make sure that this starting process doesn't crash the app, as if the downloading happens too fast and right after it download it tries to update the strings there may be some app function and obj that aren't fully initialized
-   So make sure this process doesn't crash at app start

### Update the player files Play\*.js

-   General improve
-   make the player something similar to how the screen works
-   A base player file, and a base playerObj file
-   the player is the base player and work always in a regularly way and order, the peculiar things that differentiates it type of playback (Live, VOD, CLIPS, Picture in Picture, Multistream) stay on the obj that the player call on it function to make it work as a it individual player
-   this technically will not add any gain in performance, but will be a much easier to maintain and work on player code
-   current player is one of the oldest code of the app that is why need some work as when I first wrote the code I didn't know how to do better, now I know and can see that it can be a lot better

### Update the player files UserLiveFeed\*.js

-   General improve
-   Similar to "Update the player files Play\*.js" the UserLiveFeed and UserLiveFeedobj can be improved
-   To make it work similar to how the screen works
-   Simpler obj initialization and use
-   Also this UserLiveFeed is old code and can be improve

### Update the backup process to work with targetSdk=30

-   General improve
-   From [Meet Google Play's target API level requirement](https://developer.android.com/distribute/best-practices/develop/target-sdk) the min sdk of target changes every year and will on the end of 2021 change to 30
-   Permission to access external storage changed on sdk 30 https://developer.android.com/training/data-storage#permissions
-   Making current option not working on that sdk when targeting 30, works if targeting 29
-   Update the process to work on all OS

### Update the background notifications process to work with targetSdk=30

-   General improve
-   From [Updates to toasts](https://developer.android.com/about/versions/11/behavior-changes-11#toasts) For security reasons and to maintain a good user experience, the system blocks toasts that contain custom views if those toasts are sent from the background by an app that targets Android 11 or higher.

### Improve searches

-   General improve
-   Add a side panel to the search panel that stores and allows to reuse a search save it per user
-   Separated from the above check how to add voice search

### Check if is possible to re add some removed features

-   General improve
-   User followed live games and host
-   Multi language selection for screen

### Add more option on video sizes PP multiStream

-   General improve
-   for the 50/50 mode but also for others Multi and PP mode, check what is possible to do and add more

### Add some proper test scripts

-   General improve

### Improve the main app README.md

-   The main `README.md` can always be improved
-   as thing change on the project revise the information there

### Port the project to Samsung

-   Today this is the main SmartTV Twitch project any changes done here needed to be ported to The Samsung version [smarttv-twitch](https://github.com/fgl27/smarttv-twitch)
-   Samsung Tizen OS is very limited not all features of the Android project can be ported
