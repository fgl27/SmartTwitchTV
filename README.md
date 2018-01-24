smarttv-twitch
==============

This is an app for Samsung SmartTV's designed to watch twitch.tv broadcasts.
The application was tested on TV model UN40KU6000HXPA 40" 4k Series 6 or related **xx" KU6000H Flat Smart 4K UHD TV** and on TV model UE40K6372SUXXH 40" FHD Series 6 or related **xx" K6372 Flat Smart FHD TV**.
This branch is only dedicated for TV models from 2016 and up that run Tizen OS, if yours Smart Hub menu is different from the one below yours TV is probably not supported.
![Live](https://bhb27.github.io/smarttv-twitch/screenshot/smarthub.jpeg)

In doubt [open a issue](https://github.com/bhb27/smarttv-twitch/issues/new) inform yours TV model, computer OS and problem, if is a installation problem share the fail LOG

## [All Screen shots](https://github.com/bhb27/smarttv-twitch/tree/tizen/screenshot)
![Live](https://bhb27.github.io/smarttv-twitch/screenshot/animated.gif)

About this fork
===============

I fork this from https://github.com/CazuzaCzz/smarttv-twitch/commits/tizen
The original fork is https://github.com/nikitakatchik/smarttv-twitch

Dependencies
==============
* [imagesLoaded - JavaScript is all like "You images done yet or what?" by desandro](https://github.com/desandro/imagesloaded)
* [Font Awesome - The iconic font and CSS toolkit by FortAwesome](https://github.com/FortAwesome/Font-Awesome)
* [Video.js - HTML5 Video Player](https://github.com/videojs/video.js)
* [jQuery - fast, small, and feature-rich JavaScript library](https://code.jquery.com/jquery/)
* [Samsung WebApi API - this module defines the functionalities that are provides as the Samsung TV for Tizen Platform Product API](http://developer.samsung.com/tv/develop/api-references/samsung-product-api-references/webapi-api)

Controls
==============
![control](https://bhb27.github.io/smarttv-twitch/screenshot/controler.png)

The Application is tested with the above remotes (Any Samsung remote that has those same key/function must control the app even if the remote looks different)(The key **INFO** is also map on the app to do the **GUIDE** key function as some remotes may not have the **GUIDE** one), below are the controls and section explains.
## Top toolbar
![top_toolbar](https://bhb27.github.io/smarttv-twitch/screenshot/top_toolbar.png)
* **CH Press (Guide)/Up or Down**: Press (Guide) Refresh current Screen (The key **info** is also map to to this function), Up change the Screen on the sequence A - B - C - A (if on C back to A), Down do the reverse C - B - A - C (if on A back to C)
* **Live**: All [twitch.tv](https://www.twitch.tv) live Channel that is displayed on [twitch.tv as Popular](https://www.twitch.tv/directory/all)
* **User** Two options: Setup your [twitch.tv](https://www.twitch.tv) username (using 4 color buttons (color), after green or right) / using CH **UP** (Channel Up) from live screen if user is set will show user [live following channels](https://www.twitch.tv/directory/following/live), [Hots from following channels](https://www.twitch.tv/directory/following/hosts) and [Live following games](https://www.twitch.tv/directory/following/games)
* **Games**: All [twitch.tv live Games](https://www.twitch.tv/directory)
* **Open a channel**: Open a channel by name if it is streaming live

## Action: Remote Key
### From Any Screen
* **Force close the app (in case the app froze)**: Hold Return

### [Live Screen](https://bhb27.github.io/smarttv-twitch/screenshot/Live.png)
* **To move between videos**: Directional pad (up/down/left/right)
* **Open a video**: Select or Play/Pause
* **Change Screen**: CH **UP or DOWN**
* **Refresh Live Screen**: CH **PRESS** (on smart remote) or **GUIDE** or **INFO** (on normal remote) 
* **Top left options (Live, User, Games and Open a channel)**: 4 color buttons (color), after Directional pad (up/down/left/right) for (red/yellow/blue/green)
* **Close the app**: Return (click it twice under 3 seconds)

### [User Setup (Access using 4 color buttons (color), after Directional pad (right) for (green))](https://bhb27.github.io/smarttv-twitch/screenshot/User.png)
* **Open Key Board**: Directional pad (Up) to select "text box" after Select (key) to enter, type your user and click done
* **Load User**: Directional pad (Down) to select "Open Button" after Select (key) to enter
* **Change Screen**: CH **UP or DOWN**
* **Return to Live Screen**: Return

### [User Followed Channels Screen (Access using CH UP (Channel Up) (from Live Screen) after having setup a User)](https://bhb27.github.io/smarttv-twitch/screenshot/User_live_host.png)
* **To move between videos/games**: Directional pad (up/down/left/right)
* **Open a video/game**: Select or Play/Pause
* **Change Screen**: CH **UP or DOWN**
* **Refresh User Followed Screen**: CH **PRESS** (on smart remote) or **GUIDE** or **INFO** (on normal remote) 
* **Top left options (Live, User, Games and Open a channel)**: 4 color buttons (color), after Directional pad (up/down/left/right) for (red/yellow/blue/green)
* **Return to Live Screen**: Return

### [Games category Screen (select a game category, access using Access using CH UP (Channel Up) (from User Followed Screen)](https://bhb27.github.io/smarttv-twitch/screenshot/Games.png)
* **To move between games**: Directional pad (up/down/left/right)
* **Open a game category**: Select or Play/Pause
* **Refresh (Games category Screen**: CH **PRESS** (on smart remote) or **GUIDE** or **INFO** (on normal remote) 
* **Top left options (Channels, Games, Open (to open a channel by name) and Refresh current screen)**: 4 color buttons (color) after Directional pad (up/down/left/right) for (red/yellow/blue/green)
* **Return to Followed Channels/Games Screen**: Return
* **Change Screen**: CH **UP or DOWN**

### [A Game Screen (Select a video of a game category, access using Access using Select or Play/Pause (from Games category Screen)](https://bhb27.github.io/smarttv-twitch/screenshot/A_Game.png)
* **To move between videos**: Directional pad (up/down/left/right)
* **Open a video**: Select or Play/Pause
* **Refresh (From "A Game" screen)**: CH **PRESS** (on smart remote) or **GUIDE** or **INFO** (on normal remote) 
* **Top left options (Channels, Games, Open (to open a channel by name) and Refresh current screen)**: 4 color buttons (color) after Directional pad (up/down/left/right) for (red/yellow/blue/green)
* **Return to Games category Screen**: Return
* **Change Screen**: CH **UP or DOWN**

### [Playing a video Screen](https://bhb27.github.io/smarttv-twitch/screenshot/float_chat.jpg)
* **Play/Pause a video**: Play/Pause
* **Force refresh a video (in case it freezes)**: Press **Select** twice (first open info panel) to restart buffering for current video quality, if it keeps freezing change to a lower video quality (below how to), but if it freezes not responding to key commands force close the app by holding the Return key
* **Close a video**: Return twice (click it twice under 3 seconds) if info panel is showing do it tree times first one will dismiss the info panel
* **Show info panel(if chat is showing)**: Press **Select** once
* **Show info panel(if chat is not showing)**: Directional pad (up/down/left/right) or Press **Select** once
* **Dismiss info panel(if info panel it's showing)**: Return or wait 5 seconds it will auto dismiss
* **Change video quality (if info panel is showing it will be on bottom right corner)**: Directional pad (up/down) to change after Press **Select** to confirm
* **Show or hide the Chat**: CH **PRESS** (on smart remote) or **GUIDE** or **INFO** (on normal remote) 
* **Change Chat position (if chat it's showing)**: CH **UP or DOWN**
* **Change Chat size (if chat it's showing and info panel is not)**: Directional pad (up/down)
* **Change Chat background brightness (if chat it's showing)**: Directional pad (left/right)

Installation guide Tizen studio (tested on Linux ubuntu 16.04 and windows 10 64 bits)
==============

* Create a Samsung account if you don't have one and set it up as a developer account [SAMSUNG DEVELOPERS](http://developer.samsung.com/home.do)
* Log in with the developer account on the TV, open "APPS", hit number button and press the sequence 12345 A new window will pop, enter your computer LAN IP address and make sure you click "On" for enabling the developer mode, after pressing OK, reboot the TV by unplugging from power and plug back on [SAMSUNG Guide Connecting the TV and SDK](http://developer.samsung.com/tv/develop/getting-started/using-sdk/tv-device)
* [Download and install Tizen Studio](https://developer.tizen.org/development/tizen-studio/download)
* I used the "Tizen Studio 2.0 with IDE installer", download the 32/64 bit according to yours CPU, on linux the file is a executable binary 480Mb size, give the file permission to execute, properties >  permission > Execute... mark, then just drag the file to a terminal window and click enter, **it may ask you to use apt-get to install missing dependencies**, on windows it is a .exe file around 480MB
* Install Java SDK, I install this app with **Oracle JDK java 8** on linux terminal commands below, on windows go to [Java SE Development Kit 8 Downloads
](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) download the latest version of jdk when this was tested it was "jdk-8u152-windows-x64.exe" for 64bit windows or "jdk-8u152-windows-i586.exe 32bits
"
#

	sudo add-apt-repository ppa:webupd8team/java
	sudo apt-get update
	sudo apt-get install oracle-java8-installer

#
* Press enter and Click OK/YES and accept all the requests from java installer on the terminal
* **[Download and extract the release_4_0_0.zip file Click here](https://github.com/bhb27/smarttv-twitch/releases/download/4.0.0/release_4_0_0.zip)**
* Open the tizen Package manager (on linux it may request you to use apt-get to install missing dependencies)
* Main page (Main SDK) Install Tizen SDK tools and all the etc under it (on linux it may request you to use apt-get to install missing dependencies)
* Extension SDK page Install everything (TV extensions-3.0 and all under, TV extensions Tools) (on linux it may request you to use apt-get to install missing dependencies)
* After everything finish installing close the package manager it will ask if you wanna to open the Tizen studio YES click open, if on windows it may request to add firewall permission for tizen give.
* Setting up the build environment...
* On the Tizen studio start the device manager by clicking on drop down menu that has a option by default "No target" and select "Launch remote device manager" if you don't find the device manager on the studio just open it as a separated app it must be installed just like the studio
* on device manager click + and add your TV IP address don't change the **Port**, to get the address go to main menu > network > Network status... wait a moment extra options will be loaded, click on **IP Settings** read yours TV IP Address
* Generate a certificate, back to Tizen studio > Tools > Certificate Manager > + > select/click **Tizen** > create a new author.. next > setup name password etc... next > Use the default Tizen... Finish > **Sucess** click OK
* Select the certificate it must have a **"V"** on the front of it (that means yo have select it) close the Certificate Manager
* Making the app, Top menu > File > New > Tizen Project > click twice in **Template** > click twice in **TV** > click twice in **Web Application** > click twice in **Basic Project** > chose a project name any name ....click finish
* wait for it to load
* Left click on the folder symbol with **BasicProject-tv-samsung-3.0** on the left corner under project explorer just to select it(**BasicProject-tv-samsung-3.0** is the default name give when you created a project on the past step, if you change the name click on that)
* Top menu > File > Import > General > File System ... next > Browser to find the extracted folder from the release_X_X_X.zip ... > click Select All, mark Overwrite existing ... > Finish
* wait for it to load
* The name  the folder symbol with was **BasicProject-tv-samsung-X.0** now change to **BasicProject-tv-samsung-public-2.4**
* Click on that folder **BasicProject-tv-samsung-public-2.4** left click, then right click > Run as > 1 Tizen wen Application, the installation will start
* If everything goes OK the app must automatic open on the TV
* If it fail during the instantiation make shore you don't have any other Twitch application installed, to uninstall the app manually, just open the **"apps"** application find all twitch app you have install in **"my app"** tab hold down the enter/select key on the top of the app and choose delete, after you have delete all twitch apps, try to install again.
* This app can update it self on 99% of the update cases, so this installation process will only be needed to be redone on a major update were the change is not possible to be done by the app it self, the app will warn the user the day there is a need to update and will be necessary to redo the installation process.

## In doubt [open a issue](https://github.com/bhb27/smarttv-twitch/issues/new)
Inform yours TV model, computer OS and problem, if is a installation problem share the fail LOG
