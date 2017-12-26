#!/bin/bash
#code compressor using yui-compressor and sed, install on linux 
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
		for x in *.js; do
			if [ ! "$x" == "jquery.js" ] && [ ! "$x" == "imagesloaded.js" ]; then
				echo -e "Compressing $x";
				yui-compressor "$x" -o "$x";
			fi;
		done
		cd - > /dev/null;
	done
}

echo -e "\nStarting compression optimization of source files\n";

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
echo -e "Install the app now enjoy it!\n";

exit;
