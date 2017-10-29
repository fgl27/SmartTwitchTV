smarttv-twitch
==============

This is an app for Samsung SmartTV's designed to watch twitch.tv broadcasts.
## [All Screen shots](https://github.com/bhb27/smarttv-twitch/tree/tizen/images/screenshot)
![Live](https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/images/screenshot/animated.gif)

About this fork
===============

I clone this from https://github.com/CazuzaCzz/smarttv-twitch/commits/tizen
The original Fork is https://github.com/nikitakatchik/smarttv-twitch

The application works well on the 2016 UN40KU6000HXPA or related **xx" KU6000H Flat Smart 4K UHD TV** from 2016/2017

Dependencies
==============
* [imagesLoaded JavaScript is all like "You images done yet or what?" by desandro](https://github.com/desandro/imagesloaded)

Controls
==============
![control](https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/images/controler.png)

The Application is tested with the above remote, below are the controls and section explains
## Top toolbar
![top_toolbar](https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/images/top_toolbar.png)
* **CH Down/Up**: Down Refresh current Screen, Up change for next Screen A - B - C - A (after C  back to A)
* **Live**: All TwitchTv live Channel
* **User**: Setup yours user name (using 4 color buttons (color), after green or right) / Show user Live Followed Channels (using CH **UP** (Channel Up) if user is setup if not goes to Setup yours user name)
* **Games**: All TwitchTv live Games
* **Open a channel**: Open a channel by name

## Action: Remote Key
### From Any Screen
* **Force close the app (in case the app froze)**: Hold Return

### [Live Screen](https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/images/screenshot/Live.png)
* **To move between videos**: Directional pad (up/down/left/right)
* **Open a video**: Select or Play/Pause
* **Move to "User"**: CH **UP** (Channel Up)
* **Refresh Live Screen**: CH **DOWN** (Channel Down)
* **Top left options (Live, User, Games and Open a channel)**: 4 color buttons (color), after Directional pad (up/down/left/right) for (red/yellow/blue/green)
* **Close the application**: Return  (click it twice under 3 seconds)

### [User Setup (Access using 4 color buttons (color), after Directional pad (right) for (green))](https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/images/screenshot/User.png)
* **Open Key Board**: Directional pad (Up) to select "text box" after Select (key) to enter, type your user and click done
* **Load User**: Directional pad (Down) to select "Open Button" after Select (key) to enter
* **Move to "Games"**: CH **UP** (Channel Up)
* **Return to Live Screen**: Return

### [User Followed Channels Screen (Access using CH UP (Channel Up) (from Live Screen) after having setup a User)](https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/images/screenshot/User_live_host.png)
* **To move between videos/games**: Directional pad (up/down/left/right)
* **Open a video/game**: Select or Play/Pause
* **Move to "Games"**: CH **UP** (Channel Up)
* **Refresh User Followed Screen**: CH **DOWN** (Channel Down)
* **Top left options (Live, User, Games and Open a channel)**: 4 color buttons (color), after Directional pad (up/down/left/right) for (red/yellow/blue/green)
* **Return to Live Screen**: Return

### [Games category Screen (select a game category, access using Access using CH UP (Channel Up) (from User Followed Screen)](https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/images/screenshot/Games.png)
* **To move between games**: Directional pad (up/down/left/right)
* **Open a game category**: Select or Play/Pause
* **Refresh (Games category Screen**: CH **DOWN** (Channel Down)
* **Top left options (Channels, Games, Open (to open a channel by name) and Refresh current screen)**: 4 color buttons (color) after Directional pad (up/down/left/right) for (red/yellow/blue/green)
* **Return to Followed Channels/Games Screen**: Return
* **Return to Live Screen**: CH **UP** (Channel Up)

### [A Game Screen (Select a video of a game category, access using Access using Select or Play/Pause (from Games category Screen)](https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/images/screenshot/A_Game.png)
* **To move between videos**: Directional pad (up/down/left/right)
* **Open a video**: Select or Play/Pause
* **Refresh (From "A Game" screen)**: CH **DOWN** (Channel Down)
* **Top left options (Channels, Games, Open (to open a channel by name) and Refresh current screen)**: 4 color buttons (color) after Directional pad (up/down/left/right) for (red/yellow/blue/green)
* **Return to Games category Screen**: Return
* **Return to Live Screen**: CH **UP** (Channel Up)

### [Playing a video Screen](https://raw.githubusercontent.com/bhb27/smarttv-twitch/tizen/images/screenshot/float_chat.jpg)
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

Installation guide Tizen studio (tested on Linux ubuntu 16.04 and windows 10 64 bits)
==============

* Create a Samsung account if you don't have one and set it up as a developer account [SAMSUNG DEVELOPERS](http://developer.samsung.com/home.do)
* Log in with the developer account on the TV, open "APPS", hit number button and press the sequence 12345 A new window will pop, enter your computer LAN IP address and make sure you click "On" for enabling the developer mode, after pressing OK, reboot the TV by unplugging from power and plug back on
* Download and install Tizen Studio https://developer.tizen.org/development/tizen-studio/download
* I used the "Tizen Studio 1.3 with IDE installer", download the 32/64 bit according to yours CPU, on linux the file is a executable binary 480Mb size, give the file permission to execute, properties >  permission > Execute... mark, then just drag the file to a terminal window and click enter, **it may ask you to use apt-get to install missing dependencies**, on windows it is a .exe file around 480MB
* Install Java SDK, I install this app with **Oracle JDK java 8** on linux terminal commands below, on windows go to [Java SE Development Kit 8 Downloads
](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) download the latest version of jdk when this was tested it was "jdk-8u152-windows-x64.exe" for 64bit windows or "jdk-8u152-windows-i586.exe 32bits
"
#

	sudo add-apt-repository ppa:webupd8team/java
	sudo apt-get update
	sudo apt-get install oracle-java8-installer

#
* Press enter and Click OK/YES and accept all the requests from java installer on the terminal
* Download and extract the github repo https://github.com/bhb27/smarttv-twitch clone or Download >  Download ZIP
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
* Top menu > File > Import > General > File System ... next > Browser find the extracted folder from github ... > click Select All, mark Overwrite existing ... > Finish
* wait for it to load
* The name  the folder symbol with was **BasicProject-tv-samsung-3.0** now change to **BasicProject-tv-samsung-public-2.4**
* Click on that folder **BasicProject-tv-samsung-public-2.4** left click, then right click > Run as > 1 Tizen wen Application, the installation will start
* If everything goes OK the app must automatic open on the TV
