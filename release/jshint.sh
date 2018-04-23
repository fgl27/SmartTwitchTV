#!/bin/bash
#code jshint using jshint, runs on linux shell base system

#instalation of jshint has more then one step
#1# Donwload npm/node and https://nodejs.org/en/
# extract the download file then do the bellow on the terminal

# sudo mkdir /usr/lib/nodejs
# sudo mv /path_of_extracted_node_version /usr/lib/nodejs/node

# after OK on the terminal commands export the variable past the below at the end of yours .bashrc file (remove the #)
# export NODEJS_HOME=/usr/lib/nodejs/node
# export PATH=$NODEJS_HOME/bin:$PATH

# now install jshint via terminal
# npm install jshint -g

#to exec this file or drag this .sh file to terminal to generate a released

# add js folders here
js_folders=("app/languages/" "app/general/" "app/specific/");

# no changes needed to be done bellow this line
mainfolder="$(dirname ""$(dirname "$0")"")";

cd "$mainfolder" || exit

# jshint indent all the *.js code
js_jshint() {
        array=( "$@" );
	for i in "${array[@]}"; do
		cd "$i" || exit;
		for x in *.js; do
			if [ ! "$x" == "video.min.js" ]; then
				echo -e "jshint checking $x";
				jshint "$x";
			fi;
		done
		cd - &> /dev/null || exit;
	done
}

if which 'jshint' >/dev/null ; then
	if [ "$1" == 1 ]; then
		npm install jshint -g
	fi;
	js_jshint "${js_folders[@]}";
else
	echo -e "\\ncan't run jshint because it is not installed";
        echo -e "To install jshint read the jshint.sh notes on the top of the file\\n";
	echo -e ".js files not checked.\\n";
	exit;
fi;

exit;
