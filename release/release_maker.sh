#!/bin/bash
#code compressor using yui-compressor and sed, runs on linux shell base system
#sudo apt-get install yui-compressor
#sudo apt-get install sed
#drag this file to terminal before installing the app

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

js_comp() {
        array=( "$@" );
	for i in ${array[@]}; do
		cd $i || exit;
		for x in *.js; do
			if [ ! "$x" == "imagesloaded.min.js" ] && [ ! "$x" == "video.min.js" ]; then
				echo -e "Compressing $x";
				yui-compressor "$x" -o "$x";
			fi;
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

echo -e "\nCompression\n";

if ! which 'sed' >/dev/null  ; then
	echo -e "can't run sed it's not installed"
        echo -e "Install using command:";
        echo -e "sudo apt-get install sed\n";
	echo -e ".html files not compressed."
else
	sed_comp "${html_file[@]}"
fi;

if ! which 'yui-compressor' >/dev/null  ; then
	echo -e "\ncan't run yui-compressor it's not installed"
        echo -e "Install using command:";
        echo -e "sudo apt-get install yui-compressor\n";
	echo -e ".js files not compressed.\n"
	exit;
else
	js_comp "${js_folders[@]}"
fi;

echo -e "\nCompression done\n";

echo -e "\nMaking new files up\n";

cp -rf config.xml release/config.xml
echo $(cat release/html_body.js) > $mainfolder/release/master.js;
master_maker "${js_folders[@]}"

echo -e "\nMaking done\n";

cd release/
rm -rf release.zip
zip -qr9 release ./ -x master.* html_body.js master.js
git stash &> /dev/null

echo -e "Release zip generated at $mainfolder/release/release.zip\n";
cp -rf master.js githubio/js/master.js
cd - &> /dev/null
git_check="$(git status | grep modified)";

if [ ! -z "$git_check" ]; then
	echo -e "Is necessary to update githubio as below files are modify:\n"
	echo -e "$git_check"
fi;
exit;

