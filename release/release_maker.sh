#!/bin/bash
#code compressor using uglifyjs or yui-compressor and sed, runs on linux shell base system

#instalation of uglifyjs has more then one step
#1# Donwload npm/node and https://nodejs.org/en/
# extract the download file then do the bellow on the terminal

# sudo mkdir /usr/lib/nodejs
# sudo mv /path_of_extracted_node_version /usr/lib/nodejs/node

# after OK on the terminal commands export the variable past the below at the end of yours .bashrc file (remove the #)
# export NODEJS_HOME=/usr/lib/nodejs/node
# export PATH=$NODEJS_HOME/bin:$PATH

# now install uglifyjs via terminal
# npm install uglify-js -g

#instalation of yui-compressor and sed is via more used apt-get

#sudo apt-get install yui-compressor
#sudo apt-get install sed

#exect this file or drag this .sh file to terminal to generate a released

# add html files here
html_file=("config.xml" "index.html" "release/index.html");

# add js folders here
js_folders=("app/general/" "app/specific/");

# no changes needed to be done bellow this line
sh_folder="$(dirname "$0")";
mainfolder="$(dirname "$sh_folder")";
cd $mainfolder
sed_comp() {
        array=( "$@" );
	for i in ${array[@]}; do
		echo -e "Compressing $i";
                sed -i -e :a -re 's/<!--.*?-->//g;/<!--/N;//ba' $i;
                sed -i "/\/\*.*\*\//d;/\/\*/,/\*\// d" $i;
		sed -i '/^\(\s*\)\/\//d' $i;
		sed -i 's/^[ \t]*//g; s/[ \t]*$//g' $i;
		sed -i ':a;N;$!ba;s/\n/ /g' $i;
		sed -i 's/\s*:/:/g' $i;
		sed -i 's/; \+/;/g' $i;
		sed -i 's/: \+/:/g' $i;
		sed -i 's/> \+/>/g' $i;
		sed -i 's/\s*</</g' $i;
		sed -i 's/} \+/}/g' $i;
		sed -i 's/{ \+/{/g' $i;
		sed -i 's/\s*{/{/g' $i;
		sed -i 's/\s*}/}/g' $i;
#		sed -i 's/" \+/"/g' $i;
	done
}

js_comp_yuo() {
        array=( "$@" );
	for i in ${array[@]}; do
		cd $i || exit;
		for x in *.js; do
			echo -e "Compressing $x";
			yui-compressor "$x" -o "$x";
		done
		cd - > /dev/null;
	done
}

js_comp_ugf() {
        array=( "$@" );
	for i in ${array[@]}; do
		cd $i || exit;
		for x in *.js; do
			echo -e "Compressing $x";
			uglifyjs "$x" -c -m -o "$x";
		done
		cd - > /dev/null;
	done
}

master_maker() {
        array=( "$@" );
	for i in ${array[@]}; do
		cd $i || exit;
		for x in *.js; do
			echo -e "Including $x";
			echo $(cat $x) >> $mainfolder/release/master.js;
		done
		cd - > /dev/null;
	done
}

echo -e "\nStarting Release maker\n";

sed -i 's/isReleased = false/isReleased = true/g' app/specific/Main.js;
rm -rf release/app/
mkdir -p 'release/app/images/'
cp -rf app/images/app_icon.png release/app/images/app_icon.png
cp -rf widget.info release/widget.info
cp -rf .project release/.project
cp -rf .tproject release/.tproject

echo -e "\nCompressing Start\n";

if which 'sed' >/dev/null  ; then
	sed_comp "${html_file[@]}"
else
	echo -e "can't run sed it's not installed"
        echo -e "Install using command:";
        echo -e "sudo apt-get install sed\n";
	echo -e ".html files not compressed."
fi;

if which 'uglifyjs' >/dev/null  ; then
	js_comp_ugf "${js_folders[@]}"
elif which 'yui-compressor' >/dev/null  ; then
	js_comp_yuo "${js_folders[@]}"
else
	echo -e "\ncan't run uglifyjs or yui-compressor as they are not installed"
        echo -e "To install uglifyjs read the release maker notes on the top\n";
        echo -e "Install yui-compressor using command:";
        echo -e "sudo apt-get install yui-compressor\n";
	echo -e ".js files not compressed.\n"
fi;

echo -e "\nCompression done\n";

echo -e "\nMaking new files up\n";

cp -rf config.xml release/config.xml
echo $(cat release/html_body.js) > $mainfolder/release/master.js;
master_maker "${js_folders[@]}"

cd release/
rm -rf release.zip
zip -qr9 release ./ -x master.* html_body.js master.js release_maker.sh \*githubio\*
git stash &> /dev/null
uglifyjs master.js -c -o master.js

echo -e "\nMaking done\n";

echo -e "Release zip generated at $mainfolder/release/release.zip\n";
cp -rf master.js githubio/js/master.js
cd - &> /dev/null
git_check="$(git status | grep modified)";

if [ ! -z "$git_check" ]; then
	echo -e "Is necessary to update githubio as below files are modify:\n"
	echo -e "$git_check"
fi;
exit;
