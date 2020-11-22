Project TODO, featured request, ideas and etc related list
==============

The information on this file is a expectation of what will be done to the app, that means that some of the information here may change be removed or not become a real featuring, there is no priority on what will be done first or when will be done also the order of the list don't affect what will be done first or when.<br>

One observation is that if a feature was added by a user request that feature will only be removed if is something that isn't possible to do and the user will be informed about it, but doesn't guarantee that will be done.

Featured request list
==============

* [Light mode for chat](https://github.com/fgl27/smarttv-twitch/issues/122) ... White background for chat and side by side mode, all the logic and a control need to be created, looks very terrible on most TV
* [Separate @ Mentions from Chat Scroll](https://github.com/fgl27/smarttv-twitch/issues/131) ... Pin a chat message when the user is mention, all the logic need to be created
* [Select multiple languages](https://github.com/fgl27/SmartTwitchTV/issues/21) ... Allow to select more then one language for app content, is not just allow, all the logic need to be created Twitch API doesn't support this
* VIA EMAIL, add a way to change the device screen refresh hate base on the app content, some user prefers to use a refresh other then 30 or 60 because of that request this option, the app has too many player that work at the same time, one player may be using one refresh rate another other and that makes things very complicated, also I personalty don't like this feature as it can little cause a device sync error after some changes and the screen will just go black forcing the user to reboot the devices BOX and or TV, plus if the device is slow to change there may be a long 3+ seconds of noting bug black screen, so this is technically something unnecessary (as one can just keep the device at 60 as twitch content is most 30 or 60 no issue there will be) and can cause bugs

TODO list
==============

### Update screens thumbnail options

* General improve
* Change the name to "Extra screen options" or something like this
* Update the function so it work more like the player controls, in relation to the construction of the UI
* Construct the UI with all possible options, and on it screen there will be a function that will set with options will be visible, technically what is done today but on a way that is easier to manage
* Add two extra option to replace the "Content language", one is global language and one is screen language, if the screen is not set the screen will load on the global
* Add a option to follow and unfollow channel and games
* Maybe add some extra options that makes sense...

### Update screens general use of storing stream data in attribute plus general improves

* General improve
* Make screen to use only one value X, not X_Y, this will make easier to understand and use the screens
* Add some proper check to prevent preview on screens to remove and add thumbnail on a browser when exiting the player... browser only check probably can improve general use of the app

### Add a dialog that add extra options to the player preview

* New feature
* Probably will show when holding down
* similar to the dialog that exist today on the main screen when left key is hold, similar options similar behavior
* Do this only after screens thumbnail options have be updated, so is all similar

### Update the channels screen

* New feature
* Update top option that today are 3 to 4 and on that forth add a "is following who" option so one can see what channel that channel/user follows
* For this probably need to add a extra channel holder screen, on title show "Name is following channels" or something like that

### Add a pop warning and a way to open a live from a clip and vod

* New feature
* in player controls add a option that checks if the streamer is live from time to time and let the user know and open the live from the icon
* make the warning a pop that can be disabled

### Add a audio volume dialog to the player

* New feature
* Allows to control it player individual volume on PP and Multistream mode
* This features need a UI with a slider 0 to 100% for it player that is visible, showing with video it belong to, the slider and the streamer name...
* For the name just use the same logic that add the title and streamer name to the player `Play_controlsAudio` and `Play_controlsAudioMulti`

### Convert all chat controls option to a single control

* General improve
* So in one click the player controls hide all other controls and show only chat controls
* This will allow to add some of the controls that today are in setting to the player
* Will also improve the UI as there will be less controls visible will make easier to use and understand

### Improve hosting related screen and notifications

* New feature and general improve
* Multiple followed streamer can host the same stream, today the behavior is just excluded duplicate host change that
* Add a option to setting to show duplicate/triplicate etc hosting
* this option must be apply to the user hosting, preview user hosting and channels to the home screen user hosting
* Add a new notification "Streamer is now hosting" showing Streamer A is not hosting Streamer B
* the notification must also follow the duplicate/triplicate etc rules if enabled

### Move all new strings that are harcodede to the apk/app/src/main/res/values/strings.xml

* General improve
* Some string are "harcoded" on the apk
* they are probably all on the `apk/app/src/main/java/com/fgl27/twitch/notification` and `apk/app/src/main/java/com/fgl27/twitch/channels`
* Maybe some are on apk/app/src/main/java/com/fgl27/twitch/PlayerActivity.java
* there is probably the needed to convert some of the final `ChannelContentObj` from `apk/app/src/main/java/com/fgl27/twitch/channels` to a function similar to `getRefreshContent()` fun as may be needed a context to get the string from the values/strings.xml as a static final obj can load strings

### Update how content languages works

* General improve
* Old twitch API allowed multiple languages today that is not the case it only allows one language on most API calls
* That is way the content language is not just a array left and right click option
* So change the content language and update the related code to be just a array left and right click option

### Add translations, improve strings

* General improve
* I (project main developer) don't nativity speak English, but PT-BR
* So on the future I will add PT-BR translation
* Because the above the main app English strings probably aren't 100% as I don't nativity speak English so they can always receive a check/improve

### Improve restore backup dialog

* General improve
* Add more restore options that can be disable
* Add restore settings
* Add restore screens position and etc related as player settings
* to add this featuring is better to add a obj that saves all the things, one for settings one for general player and screen things
* Make Main obj the singular obj that is used to save all minus history and user
* On settings update the settings obj so it loads from a fun as screen, included on it the strings and remove the old workaround for 0 defaults
* On settings add a temp var to check if the prop already exist on main obj if yes restore from it if not set the prop to main prop

### Update how string works on the JS side of the code

* General improve
* Change strings to be a obj, this will make easier to work with languages changes by the user
* The idea is to have a main string obj default_string, saved as a `JSON.stringify` string...
* When the app first load it parses the string `JSON.parse`, is faster to the JS engine to parse a `JSON.stringify` in relation to have the obj as a obj (this in relation to when all JS files are first parsed)
* When the app first loads it clones the default string to the EN_US language
* When a language change is requested first we reset the default obj base on EN_US then change to the new Lang
* That is to make sure the app lang is fully reset before change from one none default language to another, as some languages may not have all strings translated
* Don't keep any translation on the app master code, but download they on the app start
* Use a background http get fun to download all the strings that are save as a `JSON.stringify` string obj
* Make a page similar to the app/etc/emojis.js that generates the translations `JSON.stringify` string obj all in one single obj
* When the app first loads, download that and parse it to a obj
* use the EN_US, PT_BR and etc standard as the obj property the same that will be used by the UI that allows language change
* In order to show the user the language that he chose when the app first start and may have not yet finished download the extra language, save current user language using `Main_setItem` and restore that at start
* Once the app has finished downloading the languages update from it and save it again `Main_setItem`
* Make sure that this starting process doesn't crash the app, as if the downloading happens too fast and right after it download it tries to update the strings there may be some app function and obj that aren't fully initialized
* So make sure this process doesn't crash at app start

### Update the player files Play*.js

* General improve
* make the player something similar to how the screen works
* A base player file, and a base playerObj file
* the player is the base player and work always in a regularly way and order, the peculiar things that differentiates it type of playback (Live, VOD, CLIPS, Picture in Picture, Multistream) stay on the obj that the player call on it function to make it work as a it individual player
* this technically will not add any gain in performance, but will be a much easier to maintain and work on player code
* current player is one of the oldest code of the app that is why need some work as when I first wrote the code I didn't know how to do better, now I know and can see that it can be a lot better

### Update the player files UserLiveFeed*.js

* General improve
* Similar to "Update the player files Play*.js" the UserLiveFeed and UserLiveFeedobj can be improved
* To make it work similar to how the screen works
* Simpler obj initialization and use
* Also this UserLiveFeed is old code and can be improve

### Update the back process to work with targetSdk=30

* General improve
* From [Meet Google Play's target API level requirement](https://developer.android.com/distribute/best-practices/develop/target-sdk) the min sdk of target changes every year and will on the end of 2021 change to 30
* Permission to access external storage changed on sdk 30 https://developer.android.com/training/data-storage#permissions
* Making current option not working on that sdk when targeting 30, works if targeting 29
* Update the process to work on all OS

### Improve searches

* General improve
* Add a side panel to the search panel that stores and allows to reuse a search save it per user
* Separated from the above check how to add voice search

### Check if is possible to re add some removed features

* General improve
* User followed live games and host

### Add more option on video sizes

* General improve
* for the 50/50 mode but also for others Multi and PP mode, check what is possible to do and add more

### Add some proper test scripts

* General improve

### Improve the main app README.md

* The main `README.md` can always be improved
* as thing change on the project revise the information there

### Port the project to Samsung

* Today this is the main SmartTV Twitch project any changes done here needed to be ported to The Samsung version [smarttv-twitch](https://github.com/fgl27/smarttv-twitch)
* Samsung Tizen OS is very limited not all features of the Android project can be ported

