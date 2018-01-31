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

# add html files here, master.css here is a temp file generate by this .sh it has the css content of index.html
html_file=("config.xml" "index.html" "master.css" "release/index.html");

# add js folders here
js_folders=("app/general/" "app/specific/");

# no changes needed to be done bellow this line

# Exit if sed is not available
if ! which 'sed' >/dev/null  ; then
	echo -e "\\ncan't run sed it's not installed";
        echo -e "Install using command:";
        echo -e "sudo apt-get install sed\\n";
	echo -e "Release maker aborted"
	exit;
fi;

# this .sh folder used for cd back and for
sh_folder="$(dirname "$0")";
mainfolder="$(dirname "$sh_folder")";
canuglifyjs=0;

cd "$mainfolder" || exit

# sed_comp cleans/compress up html/xml related files
sed_comp() {
        array=( "$@" );
	for i in "${array[@]}"; do
		echo -e "sed compressing $i";
                sed -i -e :a -re 's/<!--.*?-->//g;/<!--/N;//ba' "$i";
                sed -i "/\\/\\*.*\\*\\//d;/\\/\\*/,/\\*\\// d" "$i";
		sed -i '/^\(\s*\)\/\//d' "$i";
		sed -i 's/^[ \t]*//g; s/[ \t]*$//g' "$i";
		sed -i ':a;N;$!ba;s/\n/ /g' "$i";
		sed -i 's/\s*:/:/g' "$i";
		sed -i 's/; \+/;/g' "$i";
		sed -i 's/: \+/:/g' "$i";
		sed -i 's/> \+/>/g' "$i";
		sed -i 's/\s*</</g' "$i";
		sed -i 's/} \+/}/g' "$i";
		sed -i 's/{ \+/{/g' "$i";
		sed -i 's/\s*{/{/g' "$i";
		sed -i 's/\s*}/}/g' "$i";
#		sed -i 's/" \+/"/g' "$i";
	done
	echo -e "";
}

# yui-compressor cleans/compress up js related files
js_comp_yuo() {
        array=( "$@" );
	for i in "${array[@]}"; do
		cd "$i" || exit;
		for x in *.js; do
			echo -e "yui-compressor $x";
			yui-compressor "$x" -o "$x";
		done
		cd - &> /dev/null || exit;
	done
}

# uglifyjs cleans/compress up js related files, is better then yui-compressor
js_comp_ugf() {
        array=( "$@" );
	for i in "${array[@]}"; do
		cd "$i" || exit;
		for x in *.js; do
			echo -e "uglifyjs $x";
			uglifyjs "$x" -c -m -o "$x";
		done
		cd - &> /dev/null || exit;
	done
}

# copy all files to release/master.js
master_maker() {
        array=( "$@" );
	for i in "${array[@]}"; do
		cd "$i" || exit;
		for x in *.js; do
			echo -e "Including $x to master.js";
			cat "$x" >> "$mainfolder"/release/master.js;
		done
		cd - &> /dev/null || exit;
	done
}

echo -e "\\nStarting Release maker";

# Prepare the release folder copy files to correct place and make new temp files
sed -i 's/isReleased = false/isReleased = true/g' app/specific/Main.js;
cp -rf index.html master.css
sed -i -n '/bodystart/,/bodyend/p' index.html
sed -i -n '/cssstart/,/cssend/p' master.css
rm -rf release/app/
mkdir -p 'release/app/images/'
cp -rf app/images/app_icon.png release/app/images/app_icon.png
cp -rf widget.info release/widget.info
cp -rf .project release/.project
cp -rf .tproject release/.tproject

echo -e "\\nCompressing Start\\n";

# run the cleans/compress tools
sed_comp "${html_file[@]}";

if which 'uglifyjs' >/dev/null  ; then
	js_comp_ugf "${js_folders[@]}";
        canuglifyjs=1;
elif which 'yui-compressor' >/dev/null  ; then
	js_comp_yuo "${js_folders[@]}";
else
	echo -e "\\ncan't run uglifyjs or yui-compressor as they are not installed";
        echo -e "To install uglifyjs read the release maker notes on the top\\n";
        echo -e "Install yui-compressor using command:";
        echo -e "sudo apt-get install yui-compressor\\n";
	echo -e ".js files not compressed.\\n"
fi;

echo -e "\\nCompression done\\n";

echo -e "\\nMaking new files up\\n";

# Include STR_BODY to release/master, STR_BODY has the content of index.html body
cp -rf config.xml release/config.xml
echo "var STR_BODY='""$(cat index.html)""';" > release/master.js;

# Runs the copy all files to release/master.js
master_maker "${js_folders[@]}"

#Make a zip
cd release/ || exit
rm -rf release.zip
zip -qr9 release ./ -x master.* html_body.js master.js release_maker.sh \*githubio\*

# Clean up release/ folder temp files and stash all over git changes
rm -rf app/
rm -rf config.xml release/config.xml
rm -rf widget.info release/widget.info
rm -rf .project release/.project
rm -rf .tproject release/.tproject

cd - &> /dev/null || exit;
git stash &> /dev/null;

# Copy master.css to its place, it's the css content of index.html
cp -rf master.css release/githubio/css/master.css
rm -rf master.css;
cd release/ || exit

# Run uglifyjs one more time with "toplevel" enable, only here as if run before js files don't work, the result is around 10% compression improve
if [ "$canuglifyjs" == 1 ]; then
	echo -e "\\nuglifyjs master.js";
	uglifyjs master.js -c -m toplevel -o master.js;
fi;

echo -e "\\nMaking done\\n";

echo -e "Release zip generated at $mainfolder/release/release.zip\\n";

# compy master.js temp files to githubio/js/
cp -rf master.js githubio/js/master.js;
cd - &> /dev/null || exit;

# Warn if a change was detected to master.js or master.css file
git_check="$(git status | grep modified)";
if [ ! -z "$git_check" ]; then
	echo -e "Is necessary to update githubio as below files are modify:\\n"
	echo -e "$git_check"
fi;

exit;
