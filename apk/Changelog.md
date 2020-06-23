SmartTV Twitch AndroidTV APP latest changes
==============

The App is divided in two part, **Apk** and **Web** you can check it version in the about of the app:
* The **Apk** is updated via play store it contains the app video player and the basic function that don't work on the web part of the app.
* The **Web** is update every time that the app is closed and you re-open it (of course if a update is available in the web server), it contains the user interface and related functions. If the app is open and you change apps that process doesn't closes the app only minimizes it unless the system run out of memory and close the app, to manually close it's needed to select close on the exit dialog or simply holding the return key to force close it.

The app has a building update check function, so whenever there is a update a red text will show up below the main pages clock, also a small warning will pop on the screen

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

