#!/bin/bash

mainfolder="$(dirname ""$(dirname "$0")"")";
mainfolder="$(dirname "$mainfolder")";

cd "$mainfolder" || exit

if [ "$1" == 1 ]; then
	rm -rf apk/app/src/main/assets/app
	exit;
fi;

cp -rf app/ apk/app/src/main/assets
mkdir -p apk/app/src/main/assets/release/githubio/images/
cp -rf release/githubio/images/nordvpn/ apk/app/src/main/assets/release/githubio/images/
