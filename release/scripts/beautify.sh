#!/bin/bash

# Copyright (c) 2017–present Felipe de Leon <fglfgl27@gmail.com>
#
# This file is part of SmartTwitchTV <https://github.com/fgl27/SmartTwitchTV>
#
# SmartTwitchTV is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# SmartTwitchTV is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with SmartTwitchTV.  If not, see <https://github.com/fgl27/SmartTwitchTV/blob/master/LICENSE>.

#code beautify using js-beautify, runs on linux shell base system

#instalation of js-beautify has more then one step
#1# Donwload npm/node and https://nodejs.org/en/
# extract the download file then do the bellow on the terminal

# sudo mkdir /usr/lib/nodejs
# sudo mv /path_of_extracted_node_version /usr/lib/nodejs/node

# after OK on the terminal commands export the variable past the below at the end of yours .bashrc file (remove the #)
# export NODEJS_HOME=/usr/lib/nodejs/node
# export PATH=$NODEJS_HOME/bin:$PATH

# now install js-beautify via terminal
# npm install js-beautify -g

#to exec this file or drag this .sh file to terminal to generate a released

#timer counter
START=$(date +%s.%N);
#colors
txtbld=$(tput bold) # Bold
bldred=${txtbld}$(tput setaf 1) # bldred
bldyel=${txtbld}$(tput setaf 3) # bldyel
bldgrn=${txtbld}$(tput setaf 2) # green
bldblu=${txtbld}$(tput setaf 4) # blue

# add js folders here
js_folders=("app/languages/" "app/general/" "app/specific/" "app/thirdparty/");

# no changes needed to be done bellow this line
mainfolder="$(dirname ""$(dirname "$0")"")";
mainfolder="$(dirname "$mainfolder")";

cd "$mainfolder" || exit

# js-beautify indent all the *.js code
js_beautify() {
	js-beautify index.html -o index.html &
	array=( "$@" );
	for i in "${array[@]}"; do
		cd "$i" || exit;
		for x in *.js; do
			js-beautify "$x" -o "$x" &
		done
		cd - &> /dev/null || exit;
	done
	wait
}

if which 'js-beautify' >/dev/null ; then
	if [ "$1" == 1 ]; then
		npm install js-beautify -g
	fi;
	echo -e "${bldgrn}\nJS Beautifier code formarter started...\\n";
	beautify_check="$(js_beautify "${js_folders[@]}" | grep -v unchanged)";
	if [ ! -z "$beautify_check" ]; then
		echo -e "${bldblu}	$beautify_check"
	fi;
else
	echo -e "\\ncan't run js-beautify because it is not installed";
	echo -e "To install js-beautify read the beautify.sh notes on the top of the file\\n";
	echo -e ".js files not beautified.\\n";
	exit;
fi;

# Warn if a change was detected to src files
git_check="$(git status | grep modified)";
if [ ! -z "$git_check" ]; then
	echo -e "${bldblu}Is necessary to update github as below files are modify:\\n"
	echo -e "$git_check"
fi;

END=$(date +%s.%N);
echo -e "\n${bldgrn}Total elapsed time of the script: ${bldred}$(echo "($END - $START) / 60"|bc ):$(echo "(($END - $START) - (($END - $START) / 60) * 60)"|bc ) ${bldyel}(minutes:seconds).\n";
exit;
