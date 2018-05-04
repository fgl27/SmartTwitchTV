smarttv-twitch
==============

This is an application for Samsung SmartTV's designed to watch Twitch.tv broadcasts, A official Twitch.TV app is not availably for most TV, that is way this project exist.

The application is tested and fully support 4k and 1080p Samsung TV released on 2016 and up, if yours Smart Hub menu is different from the one below yours TV is probably not supported as it doesn't run Tizen version supported by the application.
![Live](https://bhb27.github.io/smarttv-twitch/screenshot/smarthub.jpeg)

Full support for all 2015 TV is under work, but there is a know bug from some TV FW running Tizen 2.3 that prevent the app from work, Samsung is revising the problems, but as I don't have a 2015 TV model I can't test, if you wanna this app to support yours TV post that you wanna to help on the open issue [**2015 TV model running Tizen 2.3, can't play bug [Testers needed]**](https://github.com/bhb27/smarttv-twitch/issues/12)

In doubt [open a issue](https://github.com/bhb27/smarttv-twitch/issues/new) inform yours TV model, computer OS and problem, if is a installation problem share the fail LOG

## [How the application looks](https://github.com/bhb27/smarttv-twitch/tree/master/screenshot)
The application never stops receiving updates the bellow images may be outdated
![Live](https://bhb27.github.io/smarttv-twitch/screenshot/animated.gif)

Twitch.TV authentication key
===============

![Add_key](https://bhb27.github.io/smarttv-twitch/screenshot/Add_key.png)

After setting up a user on the application you can add a Twitch.TV authentication key, to be able to fallow/unfallow and access subscribed only past broadcast (of streamers you are subscribed to) as described on the above screen shot. The key is generated on the bellow page (Twitch.TV app for Samsung TV authorization page) through Twitch.TV web site, the bellow page link is the same as showed on the application screen.

## [Twitch.TV app for Samsung TV authorization page](http://tiny.cc/twitchkey)

About this fork
===============

I fork this from https://github.com/CazuzaCzz/smarttv-twitch/commits/tizen
The original fork is https://github.com/nikitakatchik/smarttv-twitch

I have started this project because the above repo of the app did not fully support my TV model, it had many bugs and the app did not had the main Twitch.TV featuring like a more complete users interface (For VOD, cips, Channel off line content etc), did not fully support the latest smart remote, the looks of the app was a little old-fashioned, etc...

So I work alone writing a new application from scratch focusing on performance and needed featuring, with the help of some users reporting bugs and featuring request, I add the many featuring and work all the bugs, today the application is very complete, can be easily used to watch all available Twitch content and give the user a lot of options, but is know that the application can be improve new featuring and improves are in works to give a better experience and more options to the user, but as today there is only one main developer working on the project the process is slow.

Project Dependencies
==============
* [Font Awesome - The iconic font and CSS toolkit by FortAwesome](https://github.com/FortAwesome/Font-Awesome)
* [Video.js - HTML5 Video Player](https://github.com/videojs/video.js)
* [UglifyJS - is a JavaScript parser, minifier, compressor and beautifier toolkit](https://github.com/mishoo/UglifyJS2)
* [JS Beautifier - Beautify, unpack or deobfuscate JavaScript and HTML, make JSON/JSONP readable, etc.](https://github.com/beautify-web/js-beautify)
* [JSHint - A Static Code Analysis Tool for JavaScript](https://github.com/jshint/jshint)
* [Samsung WebApi API - this module defines the functionalities that are provides as the Samsung TV for Tizen Platform Product API](http://developer.samsung.com/tv/develop/api-references/samsung-product-api-references/webapi-api)

Controls
==============
![control](https://bhb27.github.io/smarttv-twitch/screenshot/controler.png)

The Application is tested with the above remotes (Any Samsung remote that has those same key/function must control the app even if the remote looks is a little different)

The key **INFO** is also map on the app with the same functions as the **GUIDE** key, as some remotes may not have the **GUIDE** one.

## Bellow are the on screens controls
### To access the controls from any screen press key C or on smart remote press the 4 color buttons (color) after Directional pad down for yellow C


## Main controls
![Main](https://bhb27.github.io/smarttv-twitch/screenshot/controls_main_simple.png)
==============
## Player controls
![Players](https://bhb27.github.io/smarttv-twitch/screenshot/controls_play_simple.png)


Installation guide **Tizen Studio** (tested on Linux ubuntu 18.04 and windows 10 64 bits)
==============

* Create a Samsung account if you don't have one and set it up as a developer account [SAMSUNG DEVELOPERS](http://developer.samsung.com/home.do)
* Log in with the developer account on the TV, open the application "APPS", hit number button (smart remote) and press the key sequence 12345, a new window will pop, enter your computer LAN IP address and make sure you click "On" to enable the developer mode, after pressing OK, reboot the TV by unplugging from power and plug back on. [Click here to read SAMSUNG Guide Connecting the TV and SDK](http://developer.samsung.com/tv/develop/getting-started/using-sdk/tv-device)
* [Download and install **Tizen Studio**](https://developer.tizen.org/development/tizen-studio/download)
* I used the **Tizen Studio 2.3 with IDE installer** (Any version above that must work well), download the 32/64 bit according to yours CPU architecture, on linux the file is a executable binary 480Mb size, give the file permission to execute, properties >  permission > Execute... mark, then just drag the file to a terminal window and click enter, on windows it is a .exe file around 480MB, **On linux it may ask you to use apt-get to install missing dependencies below are the one asked by **Tizen Studio** 2.3**
#

	sudo apt-get install libwebkitgtk-1.0-0 rpm2cpio expect python2.7 ruby

#
* Install Java SDK, I install this app with **Open JDK java 8** on linux terminal commands below, on windows go to [Java SE Development Kit 8 Downloads
](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) download the latest version of jdk when this was tested it was "jdk-8u152-windows-x64.exe" for 64bit windows or "jdk-8u152-windows-i586.exe 32bits
"
#

	sudo add-apt-repository ppa:openjdk-r/ppa
	sudo apt-get update
	sudo apt-get openjdk-8-jdk

#
* Press enter and Click OK/YES and accept all the requests from java installer on the terminal
* Open **Tizen Package Manager** (on linux it may request you to use apt-get to install missing dependencies)
* Main page **(Main SDK)** Install **Tizen SDK tools**,  **(on linux it may request you to use apt-get to install missing dependencies)**
* Second page **(Extension SDK)** Install **Samsung Certificate Extension** and under **TV Extension Tools** install **Web app. Tools** (on linux it may request you to use apt-get to install missing dependencies)
* After everything finish installing close the package manager it will ask if you wanna to open the **Tizen Studio** YES click open, if on windows it may request to add firewall permission for tizen give.
* **Setting up the build environment:**
* On the **Tizen Studio** start the device manager by clicking on drop down menu that has a option by default "No target" and select "Launch remote device manager" if you don't find the device manager on the studio just open it as a separated app it must be installed just like the studio
* On device manager click on **Scan** it must find your TV if it is setup ok and on the same network, if it doesnot find try to add it manually by clicking on the  **+** opton and add your TV IP address don't change the **Port**, to get the address go to main menu > network > Network status... wait a moment extra options will be loaded, click on **IP Settings** read yours TV IP Address
* **Generate a certificate**, back to **Tizen Studio** > Tools > Certificate Manager > + > select/click **Tizen** > create a new author.. next > setup name password etc... next > Use the default Tizen... Finish > **Sucess** click OK
* Select the certificate it must have a **"V"** on the front of it (that means yo have select it) close the Certificate Manager
* Making the app, Top menu > File > New > Tizen Project > click twice in **Template** > click twice in **TV** > click twice in **Web Application** > click twice in **Basic Project** > chose a project name any name ....click finish
* Wait for it to load
* **[Download and extract the release_4.0.0_V2.zip file Click here, this is the application recipe file](https://github.com/bhb27/smarttv-twitch/releases/download/4.0.0_V2/release_4.0.0_V2.zip)**
* Back on **Tizen Studio**, Left click on the folder symbol with **BasicProject-tv-samsung-X.0** on the left corner under project explorer just to select the folder(**BasicProject-tv-samsung-X.0** is the default name give when you created a project on the past step, if you change the name click on that)
* Top menu > **File** > Import > General > File System ... next > Browser to find the extracted folder from the release_X_X_X.zip ... > click Select All, mark Overwrite existing ... > Finish
* Wait for it to load
* The name of the folder **BasicProject-tv-samsung-X.0** changes to **BasicProject-tv-samsung-public-2.4**
* Click on that folder **BasicProject-tv-samsung-public-2.4** left click, then right click > Run as > **1 Tizen wen Application**, the installation will start
* If everything goes OK the app must automatic open in a few seconds on the TV and work
* If it fail during the instantiation make shore you don't have any other Twitch application installed on the TV, to uninstall the app manually, just open the **"apps"** application find all twitch app you have install in **"my app"** tab hold down the enter/select key on the top of the app and choose delete, after you have delete all twitch apps, try to install again.
* This app can update it self on 99% of the update cases, so this installation process will only be needed to be redone on a major update were the change are not possible to be done by the app it self, the app will warn the user the day there is a need to update manually and then will be necessary to redo the installation process.

## In doubt or a featuring request [open a issue](https://github.com/bhb27/smarttv-twitch/issues/new)

* If is a installation problem share the fail LOG and inform yours TV model, computer OS and detailed description of the problem.
* If is a featuring request try to detailed it a much as possible if is something you can screen shot share the pic.
