smarttv-twitch
==============

This is an app for Samsung SmartTV's designed to watch twitch.tv broadcasts.

About this fork
===============

This is a try to upgrade smarttv-twitch so i can use it on my UN48j6300AGXZD Samsung TV, that has a Tizen OS.
I didn't know anything about the SmartTV app. Lots of things i still don't know what they do, so i left then alone :) .
It's not the best way, but its working for me. Almost everything is working on the emulator and on my TV.
Some handlers for errors on connections need to be fix (onConnectionFailed, onAuthenticationFailed, onStreamNotFound, onNetworkDisconnected, onRenderError);
Changed languages files, to work in Tizen.
Put SceneBrowser.html and SceneChannel.html inside index.html, each one inside a div, and i toggle visibility off then when the app change betwen them.
Moved CSS inside index.html too.
On tizen every time you scroll the window, it will show a ScrollBar.
When you keep pressed UP and DOWN the screen don't update correctly, but if you press Left or Right it fix.

BHB27
I clone this from https://github.com/CazuzaCzz/smarttv-twitch/commits/tizen

Bug
==============
- Everytime the app scroll to much content, it will make a white flicker. This happens only on TV. Dont happen on TV Emulator.
	- So when the app will start loading 100 more streams to show on the screen. It will scroll to the top of the window, making the white flicker, to show the loading msg. And when the loading finish, it will scroll to the bottom of page to focus on the current selected stream, making the screen flicker again.  	

Installation
==============

How to install and run App in the TV
http://107.22.233.36/TizenGuide/tizen3511/index.html

[@sparkozos](https://github.com/sparkozos) made this guide
https://github.com/mkvd/smarttv-twitch/issues/53#issuecomment-183156136

[Getting Twitch onto a 2015 or newer Samsung TV running Tizen](https://www.reddit.com/r/Twitch/comments/46unro/getting_twitch_onto_a_2015_or_newer_samsung_tv/)

Revised installation guide Tizen studio
==============

* Create a Samsung account if you don't have one and set it up as a developer account [SAMSUNG DEVELOPERS](http://developer.samsung.com/home.do)
* Log in with the developer account on the TV, open "APPS", hit number button and press the sequence 12345 A new window will pop, enter your computer LAN IP address and make sure you click "On" for enabling the developer mode, after pressing OK, reboot the TV by unplugging from power and plug back on
* Download and install Tizen Studio https://developer.tizen.org/development/tizen-studio/download
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

Change Log
==============
3.6.0
- Added a timer on stream info.
- Added Game name on stream info.
- Added key_up and key_down to change quality of stream.

3.6.1
- Fixed KEY_UP and KEY_DOWN. Stopped them from doing default.
- Added language support.(RU localization need test).
- Added logo 512x423 - GlitchIcon_WhiteonPurple512x423.jpg
- Started to add support for Follower
- Added license to config.xml <license xml:lang="en-gb" href="http://www.gnu.org/licenses/gpl.html">GNU GENERAL PUBLIC LICENSE</license>
- Changed organization on index.html. Used Code Beautifier.

3.6.3
- Changed version to 3.6.3
- Changed to Required version 2.3 on config.xml
- Added some STR for languages changes. Used what twitch use on their site, don't know if its the better translation
	- Didn't test DE and RU languages on my TV. It should work.
- Added support to follower.
	- Added KEY_TOOLS to open window to input username and open follower window.
	- Added KEY_0 to open follower window with saved username. If there is no username save, it will open window to input username. 
	- You can input username on the app, and see list of streams, live hosts, and live games which that that user is following.
	- The username should save on WebStorage, so when you close and open the app, it should still be there.
	- You can press the key TOOLS to open interface where you can input the username, and save/open.
	- if there there is already a username you can pres the KEY_0 to open the list whithout typing again the username.
3.6.4
- Change Return key behaivor:
	- on main window, close app
	- on other windows return to main window. 	
- Fixed refresh key, to work on follower window
- Added Network.public privilege to get network changes.
- Changed behaivor when connection lost, stream will play until finish then close player returning to streams list  
- Changed error dialog when Channel or Username does not exist.	
- Added Message error when stream is offline
- Added addNetworkStateChangeListener();
	- It will check when the network is disconnected and show it to the user. But it will not work when only internet turn off, and network keep online)
- Added some languages STR.
- Changed jQuery to new version and to min.js

-TODO:
	- Save Quality on WebStorage.

Contribution
==============
If you made a fix for your TV please feel free to make a push request.
