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
