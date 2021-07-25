#!/bin/bash

gnome-terminal

#install the server
#npm install http-server -g

#add a alias
#alias alias_cmd='~/workspace/smartTwitchTV/release/scripts/http-server.sh & exit'

#key
#ssh-keygen -t rsa -m PEM
#cert
#openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem


mainfolder="$(dirname ""$(dirname "$0")"")";
mainfolder="$(dirname "$mainfolder")";

cd "$mainfolder" || exit

# -c-1 disable cache
http-server -S -C release/scripts/cert.pem -K release/scripts/key.pem -c-1
