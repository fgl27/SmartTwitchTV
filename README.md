smarttv-twitch
==============

This is an app for Samsung SmartTV's designed to watch twitch.tv broadcasts.
![ss](https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/icon/original/ss.jpg)


About this fork
===============

I clone this from https://github.com/CazuzaCzz/smarttv-twitch/commits/tizen
The original Fork is https://github.com/nikitakatchik/smarttv-twitch

The application works well on the 2016 UN40KU6000HXPA or related **xx" KU6000H Flat Smart 4K UHD TV** from 2016/2017

Controls
==============
![control](https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/images/controler.png)

The Application is tested with the above remote, below are the controls and section explains
## Top toolbar
![top_toolbar](https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/images/top_toolbar.jpg)
* **CH Down/Up**: Down Refresh current Screen, Up change for next Screen A - B - C - A (after C  back to A)
* **Live**: All TwitchTv live Channel
* **User**: Setup yours user name (using 4 color buttons (color), after green or right) / Show user Live Followed Channels (using CH **UP** (Channel Up) if user is setup if not goes to Setup yours user name)
* **Games**: All TwitchTv live Games
* **Open a channel**: Open a channel by name

## Action: Remote Key
### From Any Screen
* **Force close the app (in case the app froze)**: Hold Return

### Live Screen
* **To move between videos**: Directional pad (up/down/left/right)
* **Open a video**: Select or Play/Pause
* **Move to "User"**: CH **UP** (Channel Up)
* **Refresh Live Screen**: CH **DOWN** (Channel Down)
* **Top left options (Live, User, Games and Open a channel)**: 4 color buttons (color), after Directional pad (up/down/left/right) for (red/yellow/blue/green)
* **Close the application**: Return  (click it twice under 3 seconds)

### User Setup (Access using 4 color buttons (color), after Directional pad (right) for (green))
* **Open Key Board**: Directional pad (Up) to select "text box" after Select (key) to enter, type your user and click done
* **Load User**: Directional pad (Down) to select "Open Button" after Select (key) to enter
* **Move to "Games"**: CH **UP** (Channel Up)
* **Return to Live Screen**: Return

### User Followed Channels Screen (Access using CH UP (Channel Up) (from Live Screen) after having setup a User)
* **To move between videos/games**: Directional pad (up/down/left/right)
* **Open a video/game**: Select or Play/Pause
* **Move to "Games"**: CH **UP** (Channel Up)
* **Refresh User Followed Screen**: CH **DOWN** (Channel Down)
* **Top left options (Live, User, Games and Open a channel)**: 4 color buttons (color), after Directional pad (up/down/left/right) for (red/yellow/blue/green)
* **Return to Live Screen**: Return

### Games category Screen (select a game category, access using Access using CH UP (Channel Up) (from User Followed Screen))
* **To move between games**: Directional pad (up/down/left/right)
* **Open a game category**: Select or Play/Pause
* **Refresh (Games category Screen**: CH **DOWN** (Channel Down)
* **Top left options (Channels, Games, Open (to open a channel by name) and Refresh current screen)**: 4 color buttons (color) after Directional pad (up/down/left/right) for (red/yellow/blue/green)
* **Return to Live Screen**: Return or CH **UP** (Channel Up)

### A Game Screen (Select a video of a game category, access using Access using Select or Play/Pause (from Games category Screen))
* **To move between videos**: Directional pad (up/down/left/right)
* **Open a video**: Select or Play/Pause
* **Refresh (From "A Game" screen)**: CH **DOWN** (Channel Down)
* **Top left options (Channels, Games, Open (to open a channel by name) and Refresh current screen)**: 4 color buttons (color) after Directional pad (up/down/left/right) for (red/yellow/blue/green)
* **Return to Games category Screen**: Return
* **Return to Live Screen**: CH **UP** (Channel Up)

### Playing a video Screen
* **Play/Pause a video**: Play/Pause
* **Force refresh a video (in case it froze)**: Directional pad (left) to open side panel, after Press **Select** to restart buffer for current video quality, if it keeps freezing change to a lower video quality (below how to)
* **Close a video (if side panel is open)**: Return (click it twice under 3 seconds)
* **Open side panel**: Directional pad (left)
* **Close side panel(if it's open)**: Directional pad (right) or Return
* **Change video quality (if side panel is open)**: Directional pad (up/down) or CH **UP/DOWN** (Channel Up/Down) after Press **Select** to confirm
* **Close video (If side panel is closed)** : Return twice
* **Show Transparent chat**: CH **UP** (Channel Up)
* **Move Transparent chat (if it's showing)**: CH **UP** (Channel Up)
* **Hide Transparent chat (if it's showing)**: CH **DOWN** (Channel Down)

Revised installation guide Tizen studio (tested on Linux)
==============

* Create a Samsung account if you don't have one and set it up as a developer account [SAMSUNG DEVELOPERS](http://developer.samsung.com/home.do)
* Log in with the developer account on the TV, open "APPS", hit number button and press the sequence 12345 A new window will pop, enter your computer LAN IP address and make sure you click "On" for enabling the developer mode, after pressing OK, reboot the TV by unplugging from power and plug back on
* Download and install Tizen Studio https://developer.tizen.org/development/tizen-studio/download
* I used the Tizen Studio 1.3 with IDE installer, download the 32/64 bit according to yours CPU, the file is a executable binary, give the file permission to execute, properties >  permission > Execute... mark, then just drag the file to a terminal window and click enter, **it may ask you to use apt-get to install missing dependencies**
* Install Java SDK, I tested this with **Oracle JDK java 8** on linux terminal commands
#

	sudo add-apt-repository ppa:webupd8team/java
	sudo apt-get update
	sudo apt-get install oracle-java8-installer

#
* Click OK/YES and accept all the requests from java installer
* Download and extract the github repo https://github.com/bhb27/smarttv-twitch clone or Download >  Download ZIP
* Open the package manager (on linux it may request you to use apt-get to install missing dependencies)
* Main page (Main SDK) Install Tizen SDK tools and all the etc under it (on linux it may request you to use apt-get to install missing dependencies)
* Extension SDK page Install everything (TV extensions-3.0 and all under, TV extentions Tools) (on linux it may request you to use apt-get to install missing dependencies)
* After everything finish installing close the package manager it will ask if you wanna to open the Tizen studio YES click open
* Setting up the build environment...
* On the Tizen studio start the device manager by clicking on drop down menu that has a option "launcher emulator..." if you don't find the device manager on the studio just open it as a separated app it must be installed just like the studio
* on device manager click + and add your TV IP address don't change the **Port**, to get the address go to main menu > network > Network status... wait a moment extra options will be loaded, click on **IP Settings** read yours TV IP Address
* Generate a certificate, back to Tizen studio > Tools > Certificate Manager > + > select/click **Tizen** > create a new author.. next > setup name password etc... next > Use the default Tizen... Finish > **Sucess** click OK
* Select the certificate it must have a **v** on the front of it close the Certificate Manager
* Making the app, Top menu > File > New > Tizen Project > click twice in **Template** > click twice in **TV** > click twice in **Web Application** > click twice in **Basic Project** > chose a project name any name ....click finish
* wait for it to load
* Click on the folder symbol with **BasicProject-tv-samsung-3.0** on the left corner under project explorer
* Top menu > File > Import > General > File System ... next > Browser find the extracted folder from github ... > click Select All, mark Overwrite existing ... > Finish
* wait for it to load
* The name  the folder symbol with was **BasicProject-tv-samsung-3.0** now change to **BasicProject-tv-samsung-public-2.4**
* Click on that folder **BasicProject-tv-samsung-public-2.4** left click, then rigth click > Run as > 1 Tizen wen Application
* If everything goes OK the app must open on the TV

Original Installation Guide
==============

How to install and run App in the TV
http://107.22.233.36/TizenGuide/tizen3511/index.html

[@sparkozos](https://github.com/sparkozos) made this guide
https://github.com/mkvd/smarttv-twitch/issues/53#issuecomment-183156136

[Getting Twitch onto a 2015 or newer Samsung TV running Tizen](https://www.reddit.com/r/Twitch/comments/46unro/getting_twitch_onto_a_2015_or_newer_samsung_tv/)
