#!/bin/bash

gnome-terminal

#install the server
#npm install http-server -g

#add a alias
#alias alias_cmd='~/workspace/smartTwitchTV/release/scripts/http-server.sh & exit'

mainfolder="$(dirname ""$(dirname "$0")"")";
mainfolder="$(dirname "$mainfolder")";

cd "$mainfolder" || exit

# -c-1 disable cache
http-server -c-1
