Project TODO, featured request, ideas and etc related list
==============

The information on this file is a expectation of what will be done to the app, that means that some of the information here may change be removed or not become a real featuring, there is no priority on what will be done first or when will be done also the order of the list don't affect what will be done first or when.<br>

One observation is that if a feature was added by a user request that feature will only be removed if is something that isn't possible to do and the user will be informed about it.

Featured request list
==============

* Current empty

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
* Store the added div data in a obj part of the screen, this will make it faster to access and faster to create screens
* The above also affect how side panel and prayer preview store stream info so update there too
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

### Add a audio volume dialog to the player

* New feature
* Allows to control it player individual volume on PP and Multistream mode
* This features need a UI with a slider 0 to 100% for it player that is visible, showing with video it belong to, the slider and the streamer name...
* For the name just use the same logic that add the title and streamer name to the player `Play_controlsAudio` and `Play_controlsAudioMulti`

### Improve the player PP mode start when the preview player is visible

* General improve
* Technically is possible to use the PP player as the preview player if the user is only playing one video
* Then when the user hold enter to start the PP mode if the small player preview is visible it just gets positioned on the correct place and becomes the PP player

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

### Improve the main app README.md

* The main `README.md` can always be improved
* as thing change on the project revise the information there

### Port the project to Samsung

* Today this is the main SmartTV Twitch project any changes done here needed to be ported to The Samsung version [smarttv-twitch](https://github.com/fgl27/smarttv-twitch)
* Samsung Tizen OS is very limited not all features of the Android project can be ported

