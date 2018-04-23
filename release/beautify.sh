#!/bin/bash
#code beautify using js-beautify, runs on linux shell base system

#instalation of js-beautify has more then one step
#1# Donwload npm/node and https://nodejs.org/en/
# extract the download file then do the bellow on the terminal

# sudo mkdir /usr/lib/nodejs
# sudo mv /path_of_extracted_node_version /usr/lib/nodejs/node

# after OK on the terminal commands export the variable past the below at the end of yours .bashrc file (remove the #)
# export NODEJS_HOME=/usr/lib/nodejs/node
# export PATH=$NODEJS_HOME/bin:$PATH

# now install uglifyjs via terminal
# npm install js-beautify -g

#exect this file or drag this .sh file to terminal to generate a released

# add js folders here
js_folders=("app/languages/" "app/general/" "app/specific/");

# no changes needed to be done bellow this line
mainfolder="$(dirname ""$(dirname "$0")"")";

cd "$mainfolder" || exit

# uglifyjs cleans/compress up js related files, is better then yui-compressor
js_beautify() {
        array=( "$@" );
	for i in "${array[@]}"; do
		cd "$i" || exit;
		for x in *.js; do
			if [ ! "$x" == "video.min.js" ]; then
				js-beautify "$x" -o "$x";
			fi;
		done
		cd - &> /dev/null || exit;
	done
}

if which 'js-beautify' >/dev/null ; then
	if [ "$1" == 1 ]; then
		npm install js-beautify -g
	fi;
	js_beautify "${js_folders[@]}";
else
	echo -e "\\ncan't run js-beautify because it is not installed";
        echo -e "To install js-beautify read the beautify.sh notes on the top of the file\\n";
	echo -e ".js files not beautified.\\n";
	exit;
fi;

# Warn if a change was detected to master.js or master.css file
git_check="$(git status | grep modified)";
if [ ! -z "$git_check" ]; then
	echo -e "Is necessary to update github as below files are modify:\\n"
	echo -e "$git_check"
fi;

exit;
