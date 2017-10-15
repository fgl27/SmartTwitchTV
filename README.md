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

The Application is tested with the above remote, below are the controls
## Action: Remote Key
### From Any Screen
* **Force close the app**: Hold Return

### Channels Screen
* **To move between videos**: Directional pad (up/down/left/right)
* **Open a video**: Select or Play/Pause
* **Move to "Games" Screen**: CH **UP** (Channel Up)
* **Refresh (From "Channels" screen)**: CH **DOWN** (Channel Down)
* **Top left options (Channels, Games, Open (to open a channel by name) and Refresh current screen)**: 4 color buttons (color) after Directional pad (up/down/left/right)
* **Close the app**: Return

### Games category Screen (select a game category)
* **To move between games**: Directional pad (up/down/left/right)
* **Open a game category**: Select or Play/Pause
* **Move to "Channels" Screen**: CH **DOWN** (Channel Down)
* **Refresh (From "Games" screen)**: CH **UP** (Channel Up)
* **Top left options (Channels, Games, Open (to open a channel by name) and Refresh current screen)**: 4 color buttons (color) after Directional pad (up/down/left/right)
* **Return to Channels Screen**: Return

### Game Screen (Select a video)
* **To move between videos**: Directional pad (up/down/left/right)
* **Open a video**: Select or Play/Pause
* **Move to "Channels" Screen**: CH **DOWN** (Channel Down)
* **Refresh (From "A Game" screen)**: CH **UP** (Channel Up)
* **Top left options (Channels, Games, Open (to open a channel by name) and Refresh current screen)**: 4 color buttons (color) after Directional pad (up/down/left/right)
* **Return to Games category Screen**: Return

### Playing a video Screen
* **Play/Pause a video**: Play/Pause
* **Open side panel**: Directional pad (left)
* **If side panel is closed**:
* **Close running video** : Return
* **If side panel is open**:
* **Close side panel**: Directional pad (right) or Return
* **Change quality**: Directional pad (up/down) or CH **UP/DOWN** (Channel Up/Down) after Press **Select** to confirm

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
