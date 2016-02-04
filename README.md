smarttv-twitch
==============

This is an app for Samsung SmartTV's designed to watch twitch.tv broadcasts.

==============

This is a try to upgrade smarttv-twitch so i can use it on my UN48j6300AGXZD Samsung TV, that has a Tizen OS.

I didn't know anything about the SmartTV app. Lots of things i still don't know what they do, so i left then alone :) .
Tried to use Caph.Scene because don't have more sf.scene on Tinzen. But i couldn't make it work. So i changed lots of things to make the app run.
It's not the best way, but its working for me. Almost everything is working on the emulator and on my TV.
Some handlers for errors on connections need to be fix (onConnectionFailed,onAuthenticationFailed,onStreamNotFound,onNetworkDisconnected);
Didn't find anyway to use languagues. So it's just using en.js for now. 
Put SceneBrowser.html and SceneChannel.html inside index.html, each one inside a div, and i toggle visibility off then when the app change betwen them.
Moved CSS inside index.html too.
Last time I tried to use on my TV, a scrollbar showed on the right side of the screen.
And when you press UP and DOWN the screen don't update correctly, but if you press Left or Right it fix.  
Still don't understand config.xml, so left lots of things there. Still need to clean it.


- Added a timer on stream info.
- Added Game name on stream info.
- Added key_up and key_down to change quality of stream.


Change Log
==============
3.600
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

Installation
==============

How to install and run App in the TV
http://107.22.233.36/TizenGuide/tizen3511/index.html

https://github.com/mkvd/smarttv-twitch/issues/53#issuecomment-176191422

Contribution
==============
If you made a fix for your TV please feel free to make a push request.
