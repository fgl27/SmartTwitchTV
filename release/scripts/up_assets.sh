#!/bin/bash

mainfolder="$(dirname ""$(dirname "$0")"")";
mainfolder="$(dirname "$mainfolder")";

cd "$mainfolder" || exit

if [ "$1" == 1 ]; then

    sed -i 's/LoadFromAssets = true/LoadFromAssets = false/' apk/app/src/main/java/com/fgl27/twitch/Constants.java;

	rm -rf apk/app/src/main/assets/app

	#rm -rf apk/app/src/main/assets/release

	exit;
fi;

sed -i 's/LoadFromAssets = false/LoadFromAssets = true/' apk/app/src/main/java/com/fgl27/twitch/Constants.java;

cp -rf app/ apk/app/src/main/assets

#mkdir -p apk/app/src/main/assets/release/githubio/images/
#cp -rf release/githubio/images/nordvpn/ apk/app/src/main/assets/release/githubio/images/
