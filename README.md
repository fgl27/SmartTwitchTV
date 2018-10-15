smarttv-twitch
==============

This is an application for Samsung SmartTV's designed to watch Twitch.tv broadcasts, A official Twitch.TV app is not available for most countries, that is way this project exist.

The application fully support all 4k and 1080p Samsung TV released in 2016 and up, if yours TV is a 2015 or older model and it's SmartHub menu is different from the bellow image, yours TV may not fully supported Twitch Live Streams and some Vod streams.
![Live](https://fgl27.github.io/smarttv-twitch/screenshot/smarthub.jpeg)

Full support for all 2015 TV is not possible as the TV firmware doesn't supports it, Samsung doesn't seems to care and may have remove the featuring intentionally (as the featuring simply stop working), a discussion about it was done in a issue from a repository that is no longer available, the final answer from Samsung can be read here [Samsung final answer about 2015 TV](https://fgl27.github.io/smarttv-twitch/screenshot/etc/samsung_final.png) it summarize what happened from they side.

In doubt [open a issue](https://github.com/fgl27/smarttv-twitch/issues/new/choose)

About this fork
===============

I initially fork this from https://github.com/CazuzaCzz/smarttv-twitch/commits/tizen
The original fork is https://github.com/nikitakatchik/smarttv-twitch

I have started this project because the above Repos of the app did not fully support my TV model, it had many bugs and the app did not had all Twitch.TV featuring like a more complete users interface (For VOD, Cips, basic Channel off line content, Chat and etc related) it also didn't fully support the latest version of Samsung smart remote.

So I start this new repo keep the original name and commit history, work a long time writing this a new application basically from scratch focusing on performance and all available Twitch.TV featuring, with the help of some users reporting bugs and making featuring request, I add many features and work to resolve all the bugs, today the application is very complete, can be easily used to watch all available Twitch.TV content and give the user a lot of extra options, but is know that the application can be always improved, new featuring and improves are always in the works, mostly to give a better experience and more options to the user, but as today there is only one main developer working on this project the process is slow, but fell free to report bugs and make request, for that use the [open a issue option of this repo](https://github.com/fgl27/smarttv-twitch/issues/new/choose).

Project Dependencies
==============
* [Nightdev KapChat - KapChat captures (kaptures ![kapa](https://static-cdn.jtvnw.net/emoticons/v1/25/1.0)) Twitch chat directly into OBS or XSplit.](https://www.nightdev.com/kapchat/)
* [Fontastic - Create your customized icon fonts in seconds](http://app.fontastic.me)
* [Twemoji - A simple library that provides standard Unicode emoji support across all platforms](https://github.com/twitter/twemoji)
* [UglifyJS - is a JavaScript parser, minifier, compressor and beautifier toolkit](https://github.com/mishoo/UglifyJS2)
* [JS Beautifier - Beautify, unpack or deobfuscate JavaScript and HTML, make JSON/JSONP readable, etc.](https://github.com/beautify-web/js-beautify)
* [JSHint - A Static Code Analysis Tool for JavaScript](https://github.com/jshint/jshint)
* [Twitch Developer Documentation](https://dev.twitch.tv/docs/)
* [Samsung WebApi API - this module defines the functionalities that are provides as the Samsung TV for Tizen Platform Product API](http://developer.samsung.com/tv/develop/api-references/samsung-product-api-references/webapi-api)

## [How the application looks](https://github.com/fgl27/smarttv-twitch/tree/master/screenshot)
The application never stops receiving updates the bellow images can be outdated
![Live](https://fgl27.github.io/smarttv-twitch/screenshot/animated.gif)

Twitch.TV authentication key
===============

![Add_key](https://fgl27.github.io/smarttv-twitch/screenshot/Add_key.png)

After setting up a user on the application you can add a Twitch.TV authentication key, to be able to fallow/unfallow and access subscribed only past broadcast (for channel you are Sub to and block VOD access to none subscribers) as described on the above screen shot. The key is generated on the bellow page, the page receives a key after you use it to request one with the official Twitch.TV web site, the bellow page link is the same as showed on the application screen.

## [Twitch.TV app for Samsung TV authorization request page](http://tiny.cc/twitchkeycode)

Controls
==============
![control](https://fgl27.github.io/smarttv-twitch/screenshot/controler.png)

The Application is tested with the above remotes (Any Samsung remote that has those same key/function must control the app even if the remote looks is a little different)

The key **INFO** is also map in the app with the same functions as the **GUIDE** key, as some remotes may not have one of those.

## Bellow are the on screens controls
### To access the controls from any screen press key A or on smart remote press the 4 color buttons (color) after Directional pad up for red A key and chose controls, if you are playing a stream use the C yellow key to directly open the controls


## Main controls
![Main](https://fgl27.github.io/smarttv-twitch/screenshot/controls_main_simple.png)
==============
## Player controls
![Players](https://fgl27.github.io/smarttv-twitch/screenshot/controls_play_simple.png)


Installation guide **Tizen Studio** (tested on Linux Ubuntu 16 and up and windows 10 64 bits)
==============

## Account and Downloads

* Create a Samsung account if you don't have one, and set it up as a developer account [SAMSUNG DEVELOPERS](http://developer.samsung.com/home.do)
* Log in with the developer account on the TV, open the application "APPS", press the key sequence 12345 in the remote, a new window will pop, enter your computer LAN IP address (The computer you plane to use to install this app) and make sure you click "On" to enable the developer mode, after pressing OK, reboot the TV by unplugging from power and plug back on. [Click here to read SAMSUNG Guide Connecting the TV and SDK](http://developer.samsung.com/tv/develop/getting-started/using-sdk/tv-device)
* [Download and install **Tizen Studio**](https://developer.tizen.org/development/tizen-studio/download)

## Installation Tizen and Java SDK

* I used the **Tizen Studio 2.4 with IDE installer** (Any version above that must work well), download the 32/64 bit according to yours CPU architecture, on windows it is a .exe file around 480MB just install it like any other .exe file, on Linux the file is a executable binary 480Mb size, to run it first give the file permission to execute, properties >  permission > Execute... mark, then just drag the file to a terminal window and click enter, **On Linux it may ask you to use apt-get to install missing dependencies below are the one asked by Tizen Studio 2.4 last time I installed it**
#

	sudo apt-get install libwebkitgtk-1.0-0 rpm2cpio expect python2.7 ruby

#
* Install Java SDK, I install this app with **Open JDK java 8** on windows go to [Java SE Development Kit 8 Downloads
](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) download the latest version of jdk when this was tested it was "jdk-8u152-windows-x64.exe" for 64bit windows or "jdk-8u152-windows-i586.exe 32bits
", on linux terminal commands below
#

	sudo add-apt-repository ppa:openjdk-r/ppa
	sudo apt-get update
	sudo apt-get install openjdk-8-jdk

#
* Press enter and Click OK/YES and accept all the requests from java installer on the terminal

## Tizen Package Manager(Installing the tools)

* Open **Tizen Package Manager** to start install the bellow, some may already be installed by default
* Main tab **(Main SDK)** Install **4.0 TV**(or wherever X.X TV version there is) and **Tizen SDK tools**,  **(on linux it may request you to use apt-get to install missing dependencies)**
* Second tab **(Extension SDK)** under **TV Extensions-4.0** (or wherever X.X TV version there is) install **Web app. Development**, install **Samsung Certificate Extension** and under **TV Extension Tools** install **Web app. Tools** (on Linux it may request you to use apt-get to install missing dependencies)
* After everything finish installing close the package manager it will ask if you wanna to open the **Tizen Studio** YES click open, if on windows it may request to add firewall permission for Tizen give.

### Bellow imgs showing the installed packages (the one with a delete option are installed)
![SDK_installation_1](https://fgl27.github.io/smarttv-twitch/screenshot/install/sdk_1.png)
![SDK_installation_2](https://fgl27.github.io/smarttv-twitch/screenshot/install/sdk_2.png)
![SDK_installation_3](https://fgl27.github.io/smarttv-twitch/screenshot/install/sdk_3.png)
![SDK_installation_4](https://fgl27.github.io/smarttv-twitch/screenshot/install/sdk_4.png)

## Setting up the build environment:

* Open **Tizen Studio**, then start the device manager by clicking on drop down menu that has a option by default **"No target"** and select **"Launch remote device manager"** if you don't find the device manager on the studio just open it as a separated app it must be installed just like the studio
* On device manager click on **Scan** it must find your TV if it is setup ok and on the same network, if it doesn't find try to add it manually by clicking on the  **+** option and add your TV IP address don't change the **Port**, to get the address go to main menu > network > Network status... wait a moment extra options will be loaded, click on **IP Settings** read yours TV IP Address

![device_manager](https://fgl27.github.io/smarttv-twitch/screenshot/install/device_manager.png)
* After having the TV IP showing in the screen, click in to connect, when connect you see something like the bellow
![device_manager](https://fgl27.github.io/smarttv-twitch/screenshot/install/device_manager2.png)

## Generate a certificate:

* back to **Tizen Studio** > Tools > Certificate Manager > + > select/click **Tizen** > create a new author.. next > setup name password etc... next > Use the default Tizen... Finish > **Success** click OK
* Select the certificate it must have a **"V"** on the front of it (that means yo have select it) close the Certificate Manager

![certificate](https://fgl27.github.io/smarttv-twitch/screenshot/install/certificate.png)

## Setup the application:

* **[Download and extract the release_4.0.1_V2.zip file Click here, this is the application recipe file](https://github.com/fgl27/smarttv-twitch/releases/download/v4.0.1/4.0.1_V2.zip)**

![install_app1](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app1.png)

* Making the app, Top menu > File > New > Tizen Project > click twice in **Template** > click twice in **TV** > click twice in **Web Application** > click twice in **Basic Project** > chose a project name any name ....click finish

![install_app2](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app2.png)
![install_app3](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app3.png)
![install_app4](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app4.png)
![install_app5](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app5.png)
![install_app6](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app6.png)

* Wait for it to load
* Back on **Tizen Studio**, Left click on the folder symbol with **AnyName-X.0** on the left corner under project explorer just to select the folder(**AnyName-X.0** is the default name give when you created a project on the past step, if you change the name click on that)
* Top menu > **File** > Import > General > File System ... next > Browser to find the extracted folder from the release_X_X_X.zip ... > click Select All, mark Overwrite existing ... > Finish
* Wait for it to load
* The name of the folder **AnyName-X.0** changes to **AnyName-something-public-2.4**

![install_app7](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app7.png)
![install_app8_1](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app8_1.png)
![install_app8_2](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app8_2.png)
![install_app8_3](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app8_3.png)
![install_app9](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app9.png)

## Install the application:

* Click on that folder **AnyName-public-2.4** left click, then right click > Run as > **1 Tizen wen Application**, the installation will start
* If everything goes OK the app must be opened in a few seconds on the TV, and you can start using

![install_app10](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app10.png)

* If it fail during the installation make shore you don't have any other Twitch.TV application installed on the TV, to uninstall the app manually, just open the **"apps"** application find all Twitch.TV app you have install in **"my app"** tab hold down the enter/select key on the top of the app and choose delete, after you have delete all Twitch.TV apps, try to install again.
* This app can update it self on 99% of the update cases, so this installation process will only be needed to be redone on a major update were the change are not possible to be done by the app it self, the app will warn the user the day there is a need to update manually and then will be necessary to redo the installation process.

## In doubt [open a issue](https://github.com/fgl27/smarttv-twitch/issues/new/choose)
