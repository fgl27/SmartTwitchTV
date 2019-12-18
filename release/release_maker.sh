#!/bin/bash
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

# add html files here, master.css here is a temp file generate by this .sh it has the css content of index.html
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
		npm install crass -g
	fi;
	cancrass=1;
else
	echo -e "\\n${bldred}can't run cancrass, as it's not installed";
	echo -e "${bldred}To install cancrass read the release maker notes on the top\\n";
	echo -e "${bldred}Release wil work but it can be more compressed using crass"
fi;

# this .sh folder used for cd back and for
mainfolder="$(dirname ""$(dirname "$0")"")";

cd "$mainfolder" || exit

# uglifyjs cleans/compress js related files
js_comp_ugf() {
	array=( "$@" );
	for i in "${array[@]}"; do
		cd "$i" || exit;
		for x in *.js; do
			echo -e "${bldblu}	Including compresed version of $x to master.js";
			uglifyjs "$x" -c -m -o "$mainfolder"/"$temp_maker_folder""$x";
			cat "$mainfolder"/"$temp_maker_folder""$x" >> "$mainfolder"/release/master.js;
		done
		cd - &> /dev/null || exit;
	done
}

js_jshint() {
	array=( "$@" );
	for i in "${array[@]}"; do
		cd "$i" || exit;
		for x in *.js; do
			cat "$x" >> "$mainfolder"/release/master.js
		done
		cd - &> /dev/null || exit;
	done

	echo "$master_end" >> "$mainfolder"/release/master.js;

	jsh_check="$(jshint "$mainfolder"/release/master.js)";
	if [ ! -z "$jsh_check" ]; then
		echo -e "${bldred}	JSHint erros or warnings found:\\n"
		echo -e "${bldred}	$jsh_check"
		echo -e "\\n${bldred}	Fix the problems and try the release maker again\\n"
		exit;
	else
		echo -e "${bldblu}JSHint Test finished no errors or warnings found\\n"
		cp -rf "$mainfolder"/release/master.js "$mainfolder"/release/githubio/js/master_uncompressed.js;
		js-beautify -q "$mainfolder"/release/githubio/js/master_uncompressed.js -o "$mainfolder"/release/githubio/js/master_uncompressed.js
	fi;
}

master_start=$(echo "$a" | sed '/APISTART/,/APIMID/!d;/APIMID/d;/APISTART/d' release/api.js);
master_end=$(echo "$a" | sed '/APICENTER/,/APIEND/!d;/APIEND/d;/APICENTER/d' release/api.js);

echo -e "\\n${bldred}####################################\\n#				   #";
echo -e "#				   #\\n#	${bldcya}Starting Release maker${bldred}	   #\\n#				   #";
echo -e "#				   #\\n####################################\\n";

if [ "$canjshint" == 1 ]; then
	echo -e "${bldgrn}JSHint Test started...\\n";
	echo -e '/* jshint undef: true, unused: true, node: true, browser: true */\n/*globals Android, ReconnectingWebSocket, punycode, smartTwitchTV */\n/* exported Play_CheckResume */' > "$mainfolder"/release/master.js;
	echo "$master_start" >> "$mainfolder"/release/master.js;
	js_jshint "${js_folders[@]}";
fi;

# Prepare the release folder copy files to correct place and make new temp files
mkdir -p "$temp_maker_folder"

# this var is used for debugging
sed -i 's/Main_isReleased = false/Main_isReleased = true/g' app/specific/Main.js;

# make the release/index.min.html
cp -rf index.html release/index.min.html
sed -i ':a;N;$!ba;s/jsstart.*jsend/httpmin/g' release/index.min.html
old='<!-- httpmin-->'
new='<script src="https://fgl27.github.io/SmartTwitchTV/release/githubio/js/master.js" defer></script>'
sed --in-place "s%$old%$new%g" release/index.min.html

echo -e "\\n${bldgrn}Compressing Start\\n";

# run the cleans/compress tools

if [ "$canhtmlminifier" == 1 ]; then
	html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true release/index.min.html -o release/index.min.html
fi;

echo "" > release/master.js;
echo "$master_start" > release/master.js;

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
	echo "$master_end" >> master.js;
	echo -e "${bldblu}	uglifyjs  master.js";
	uglifyjs master.js -c -m toplevel -o master.js;
fi;

echo -e "\\n${bldgrn}Compression done\\n";

# copy master.js temp files to githubio/js/
cp -rf master.js githubio/js/master.js;
cd - &> /dev/null || exit;
rm -rf "$temp_maker_folder"
sed -i 's/Main_isReleased = true/Main_isReleased = false/g' app/specific/Main.js;

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

# Warn if a change was detected to master.js and release/html
git_check="$(git status | grep modified)";
if [ ! -z "$git_check" ]; then
	echo -e "${bldgrn}Is necessary to update githubio as below files are modify:\\n"
	echo -e "${bldred}	$git_check"
fi;

END=$(date +%s.%N);
echo -e "${bldgrn}Total elapsed time of the script: ${bldred}$(echo "($END - $START) / 60"|bc ):$(echo "(($END - $START) - (($END - $START) / 60) * 60)"|bc ) ${bldyel}(minutes:seconds).\n";
exit;
