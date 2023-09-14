#!/bin/bash

# Copyright (c) 2017-2020 Felipe de Leon <fglfgl27@gmail.com>
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

#code compressor using uglifyjs, jshint, js-beautify, sed and cleancss, this .sh runs on linux shell base system

#installation of uglifyjs jshint, js-beautify and html-minifier has more then one step
#1# Donwload npm/node and https://nodejs.org/en/
# extract the download file then do the bellow on the terminal

# sudo mkdir /usr/lib/nodejs
# sudo mv /path_of_extracted_node_version /usr/lib/nodejs/node

# after OK on the terminal commands export the variable past the below at the end of yours .bashrc file (remove the #)
# export NODEJS_HOME=/usr/lib/nodejs/node
# export PATH=$NODEJS_HOME/bin:$PATH

# now install uglifyjs jshint, js-beautify, html-minifier and crass via terminal
# npm install uglify-js jshint js-beautify html-minifier crass -g

#exec this file or drag this .sh file to terminal to generate a released

temp_maker_folder="release/temp_maker/";

# add js folders here
js_folders=("app/languages/" "app/general/" "app/specific/" "app/thirdparty/");

# no changes needed to be done bellow this line

#timer counter
START=$(date +%s.%N);
#colors
txtbld=$(tput bold) # Bold
bldred=${txtbld}$(tput setaf 1) # red
bldgrn=${txtbld}$(tput setaf 2) # green
bldyel=${txtbld}$(tput setaf 3) # yellow
bldblu=${txtbld}$(tput setaf 4) # blue
bldcya=${txtbld}$(tput setaf 6) # cyan

# Exit if sed is not available
if ! which 'sed' >/dev/null  ; then
	echo -e "\\n${bldred}can't run sed it's not installed";
	echo -e "${bldred}Install using command:";
	echo -e "${bldred}sudo apt-get install sed\\n";
	echo -e "${bldred}Release maker aborted"
	exit;
fi;

# Exit if uglifyjs is not available
canjshint=0;
if which 'jshint' >/dev/null  ; then
	# call this .sh and 1 "this.sh 1" to update uglify-js
	if [ "$1" == 1 ]; then
    	echo -e "${bldred}npm install jshint -g\\n";
		npm install jshint -g
	fi;
	canjshint=1;
else
	echo -e "\\n${bldred}can't run jshint, as it's not installed";
	echo -e "${bldred}To install jshint read the release maker notes on the top\\n";
	echo -e "${bldred}Release maker aborted\\n"
	exit;
fi;

#canbeautify=0;
#if which 'js-beautify' >/dev/null  ; then
#	# call this .sh and 1 "this.sh 1" to update uglify-js
#	if [ "$1" == 1 ]; then
#		npm install js-beautify -g
#	fi;
#	canbeautify=1;
#fi;

# Exit if uglifyjs is not available
canuglifyjs=0;
if which 'uglifyjs' >/dev/null  ; then
	# call this .sh and 1 "this.sh 1" to update uglify-js
	if [ "$1" == 1 ]; then
    	echo -e "${bldred}npm install uglify-js -g\\n";
		npm install uglify-js -g
	fi;
	canuglifyjs=1;
else
	echo -e "\\n${bldred}can't run uglifyjs, as it's not installed";
	echo -e "${bldred}To install uglifyjs read the release maker notes on the top\\n";
	echo -e "${bldred}Release maker aborted\\n"
	exit;
fi;

# Exit if canhtmlminifier is not available
canhtmlminifier=0;
if which 'html-minifier' >/dev/null  ; then
	# call this .sh and 1 "this.sh 1" to update uglify-js
	if [ "$1" == 1 ]; then
    	echo -e "${bldred}npm install html-minifier -g\\n";
		npm install html-minifier -g
	fi;
	canhtmlminifier=1;
else
	echo -e "\\n${bldred}can't run html-minifier, as it's not installed";
	echo -e "${bldred}To install html-minifier read the release maker notes on the top\\n";
	echo -e "${bldred}Release maker aborted\\n"
	exit;
fi;

# Check crass
cancrass=0;
if which 'crass' >/dev/null  ; then
	# call this .sh and 1 "this.sh 1" to update uglify-js
	if [ "$1" == 1 ]; then
    	echo -e "${bldred}npm install crass -g\\n";
		npm install crass -g
	fi;
	cancrass=1;
else
	echo -e "\\n${bldred}can't run cancrass, as it's not installed";
	echo -e "${bldred}To install cancrass read the release maker notes on the top\\n";
	echo -e "${bldred}Release wil work but it can be more compressed using crass"
fi;

if which 'firebase' >/dev/null  ; then
	if [ "$1" == 1 ]; then
    	echo -e "${bldred}npm install firebase-tools -g\\n";
		npm install -g firebase-tools
	fi;
fi;

# this .sh folder used for cd back and for
mainfolder="$(dirname ""$(dirname "$0")"")";
mainfolder="$(dirname "$mainfolder")";

cd "$mainfolder" || exit

version_up() {

    # update version obj
    echo "$(cat ./app/general/version.js)" > ./release/version.js
    echo "$(cat ./release/scripts/version.js)" >> ./release/version.js
    noderun=$(node ./release/version.js);
    rm ./release/version.js
    echo -e "${bldgrn}$noderun";

}

if [ "$1" == 2 ]; then
    echo -e "\\n";
	version_up;
    echo -e "\\n";
	exit 0;
fi;

# uglifyjs cleans/compress js related files
js_comp_ugf() {
	array=( "$@" );
	for i in "${array[@]}"; do
		cd "$i" || exit;
		for x in *.js; do
			echo -e "${bldblu}	Including compresed version of $x to main.js";
			uglifyjs "$x" -c -m -o "$mainfolder"/"$temp_maker_folder""$x";
			cat "$mainfolder"/"$temp_maker_folder""$x" >> "$mainfolder"/release/main.js;
		done
		cd - &> /dev/null || exit;
	done
}

js_jshint() {
	array=( "$@" );
	for i in "${array[@]}"; do
		cd "$i" || exit;
		for x in *.js; do
   			cat "$x" >> "$mainfolder"/release/main.js
		done
		cd - &> /dev/null || exit;
	done

	echo "$main_end" >> "$mainfolder"/release/main.js;

	jsh_check="$(jshint "$mainfolder"/release/main.js)";
	if [ ! -z "$jsh_check" ]; then
		echo -e "${bldred}	JSHint erros or warnings found:\\n"
		echo -e "${bldred}	$jsh_check"
		echo -e "\\n${bldred}	Fix the problems and try the release maker again\\n"
		exit;
	else
		echo -e "${bldblu}JSHint Test finished no errors or warnings found\\n"
		cp -rf "$mainfolder"/release/main.js "$mainfolder"/release/githubio/js/main_uncompressed.js;
		js-beautify -q "$mainfolder"/release/githubio/js/main_uncompressed.js -o "$mainfolder"/release/githubio/js/main_uncompressed.js
	fi;

	jsh_check="$(jshint "$mainfolder"/app/Extrapage/Extrapage.js)";
	if [ ! -z "$jsh_check" ]; then
		echo -e "${bldred}	JSHint erros or warnings found on Extrapage:\\n"
		echo -e "${bldred}	$jsh_check"
		echo -e "\\n${bldred}	Fix the problems and try the release maker again\\n"
		exit;
	else
		echo -e "${bldblu}JSHint Test finished no errors or warnings found on Extrapage\\n"
		cp -rf "$mainfolder"/release/main.js "$mainfolder"/release/githubio/js/main_uncompressed.js;
		js-beautify -q "$mainfolder"/release/githubio/js/main_uncompressed.js -o "$mainfolder"/release/githubio/js/main_uncompressed.js
	fi;
}

main_start=$(echo "$a" | sed '/APISTART/,/APIMID/!d;/APIMID/d;/APISTART/d' release/api.js);
main_end=$(echo "$a" | sed '/APICENTER/,/APIEND/!d;/APIEND/d;/APICENTER/d' release/api.js);

echo -e "\\n${bldred}####################################\\n#				   #";
echo -e "#				   #\\n#	${bldcya}Starting Release maker${bldred}	   #\\n#				   #";
echo -e "#				   #\\n####################################\\n";

if [ "$canjshint" == 1 ]; then
	echo -e "${bldgrn}JSHint Test started...\\n";
	echo -e '/* jshint eqeqeq: true, laxbreak: true, undef: true, unused: true, node: true, browser: true */\n/*globals Android, punycode, smartTwitchTV, firebase, dataLayer, ActiveXObject, Twitch */\n/* exported Play_CheckResume */' > "$mainfolder"/release/main.js;
	echo "$main_start" >> "$mainfolder"/release/main.js;
	js_jshint "${js_folders[@]}";
fi;

# Prepare the release folder copy files to correct place and make new temp files
mkdir -p "$temp_maker_folder"

# this var is used for debugging
sed -i 's/Main_Start();/\/\/Main_Start();/g' app/specific/Main.js;

# make the release/index.html
cp -rf app/index.html release/index.html
sed -i ':a;N;$!ba;s/jsstart.*jsend/httpmin/g' release/index.html
old='<!-- httpmin-->'
new='<script src="githubio/js/main.js" defer></script>'
sed --in-place "s%$old%$new%g" release/index.html

cp -rf app/Extrapage/index.html release/extrapageindex.html
sed -i ':a;N;$!ba;s/jsstart.*jsend/httpmin/g' release/extrapageindex.html
old='<!-- httpmin-->'
new='<script src="githubio/js/Extrapage.js" defer></script>'
sed --in-place "s%$old%$new%g" release/extrapageindex.html
cp -rf app/Extrapage/Extrapage.js release/githubio/js/Extrapage.js;

old='../release/'
new=''
sed --in-place "s%$old%$new%g" release/index.html
sed --in-place "s%$old%$new%g" release/extrapageindex.html

old='css/icons.css'
new='css/icons.min.css'
sed --in-place "s%$old%$new%g" release/index.html
sed --in-place "s%$old%$new%g" release/extrapageindex.html

version_up

echo -e "\\n${bldgrn}Compressing Start\\n";

# run the cleans/compress tools

if [ "$canhtmlminifier" == 1 ]; then
	html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --use-short-doctype --minify-css true --minify-js true release/index.html -o release/index.html

	html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --use-short-doctype --minify-css true --minify-js true release/extrapageindex.html -o release/extrapageindex.html
fi;

echo "" > release/main.js;
echo "$main_start" > release/main.js;

if [ "$canuglifyjs" == 1 ]; then
	js_comp_ugf "${js_folders[@]}";
fi;

# Compress using crass, just compress no optimization is needed as it will cause css problems
if [ "$cancrass" == 1 ]; then
	crass release/githubio/css/icons.css > release/githubio/css/icons.min.css
fi;

cd release/ || exit

# Run uglifyjs one more time with "toplevel" enable, only here as if run before js files don't work, the result is around 10% compression improve
if [ "$canuglifyjs" == 1 ]; then
	echo "$main_end" >> main.js;
	echo -e "${bldblu}	uglifyjs  main.js";
	uglifyjs main.js -c -m toplevel=true,eval=true -o main.js;
	uglifyjs githubio/js/Extrapage.js -c -m toplevel=true,eval=true -o githubio/js/Extrapage.js;
fi;

echo -e "\\n${bldgrn}Compression done\\n";

# copy main.js temp files to githubio/js/
cp -rf main.js githubio/js/main.js;
cd - &> /dev/null || exit;
rm -rf "$temp_maker_folder"
sed -i 's/\/\/Main_Start();/Main_Start();/g' app/specific/Main.js;

#if [ "$canbeautify" == 1 ]; then
#	echo -e "${bldgrn}JS Beautifier code formarter started...\\n";
#	beautify_check="$(js_beautify "${js_folders[@]}" | grep -v unchanged)";
#	if [ ! -z "$beautify_check" ]; then
#		echo -e "${bldblu}	JS Beautifier - finished below files are beautified:\\n"
#		echo -e "${bldblu}	$beautify_check"
#	else
#		echo -e "${bldblu}	JS Beautifier - finished none file modify\\n"
#	fi;
#else
#	echo -e "\\n	${bldred}can't run js-beautify, as it's not installed";
#	echo -e "	${bldred}To install js-beautify read the release maker notes on the top\\n";
#	echo -e "	${bldred}Repo files not beautifyed\\n"
#fi;

# Warn if a change was detected to main.js and release/html
git_check="$(git status | grep modified)";
if [ ! -z "$git_check" ]; then
	echo -e "${bldgrn}Is necessary to update githubio as below files are modify:\\n"
	echo -e "${bldred}	$git_check"
fi;

END=$(date +%s.%N);
echo -e "${bldgrn}Total elapsed time of the script: ${bldred}$(echo "($END - $START) / 60"|bc ):$(echo "(($END - $START) - (($END - $START) / 60) * 60)"|bc ) ${bldyel}(minutes:seconds).\n";
exit;
