#!/bin/bash
#code compressor using yui-compressor, install on linux 
#sudo apt-get install yui-compressor
#drag to terminal to run

# add html files here
html_file=("config.xml" "index.html");

# add js folders here
js_folders=("app/general/" "app/specific/");


# no changes needed bellow here
cd "$(dirname "$0")"
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
		for i in *.js; do
			if [ ! "$i" == "jquery.js" ] && [ ! "$i" == "imagesloaded.js" ]; then
				echo -e "Compressing $i";
				yui-compressor "$i" -o "$i";
			fi;
		done
		cd - > /dev/null;
	done
}

echo -e "\nStarting compression optimization of source files\n";


sed_comp "${html_file[@]}"

if ! which yui-compressor >/dev/null  ; then
	echo -e "\ncan't run yui-compressor it's not installed"
        echo -e "Install using command:";
        echo -e "sudo apt-get install yui-compressor\n";
	echo -e ".js files not compressed."
	exit;
fi;

js_comp "${js_folders[@]}"

echo -e "\nCompression done\n";
echo -e "Install the app now enjoy it!\n";

exit;
