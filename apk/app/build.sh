#!/bin/bash
# simple build sh to build a apk check folder and sign ...set on yours .bashrc to call this sh from anywhere alias bt='/home/user/this.sh'
#colors
RED='\033[1;31m'
CYAN='\033[1;36m' 
GREEN='\033[1;32m' 
YELLOW='\033[1;33m' 
NC='\033[1m'
#timer counter
START=$(date +%s.%N);
START2="$(date)";
echo -e "\n Script start $(date)\n";

#Folders Folder= you app folder SDK_Folder android sdk folder Download it if you don't have it, don't remove the sdk.dir= from the line
FOLDER="$(dirname ""$(dirname "$0")"")";
SDK_FOLDER="$HOME"/android/sdk;
SDK_DIR="sdk.dir=$SDK_FOLDER";
NDK_DIR="ndk.dir=$SDK_FOLDER/ndk-bundle";

#build the app BAPP=1?
BAPP=1;

# Export Java path in some machines is necessary put your java path

#export JAVA_HOME="/usr/lib/jvm/java-7-openjdk-amd64/"

#Generate and use a sign key https://developer.android.com/studio/publish/app-signing.html
#keytool -genkey -v -keystore key_name.key -alias <chose_a_alias> -keyalg RSA -keysize 2048 -validity 10000
#sign with
#jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -storepass <yours_password> -keystore <file_path.apk> <new_file_path.apk> <chose_a_alias>
#check
# jarsigner -verify -verbose -certs <my_application.apk>
# for play auto sign tool
#java -jar pepk.jar --keystore=fgl.key --alias=felipe_leon --output=fgl.keystore --encryptionkey=eb10fe8f7c7c9df715022017b00c6471f8ba8170b13049a11e6c09ffe3056a104a3bbe4ac5a955f4ba4fe93fc8cef27558a3eb9d2a529a2092761fb833b656cd48b9de6a
#keytool -genkey -v -keystore fgl_pem.key -alias felipe_leon -keyalg RSA -keysize 2048 -validity 10000
#
#keytool -export -rfc -keystore fgl_pem.key -alias felipe_leon -file fgl_pem.pem

SIGN=1;
TOOLVERSION=$(grep buildTools "$FOLDER"/versions.gradle | head -n1 | cut -d\' -f2);
ZIPALIGN_FOLDER=$SDK_FOLDER/build-tools/$TOOLVERSION/zipalign;
KEY_FOLDER="$HOME"/android/temp/sign/fgl_pem.key;
KEY_PASS=$(<"$HOME"/android/temp/sign/pass);

# out app folder and out app name
VERSION=$(grep publishVersion "$FOLDER"/versions.gradle | head -n1 | cut -d\' -f2 | sed 's/\./_/' | sed 's/\./_/');
OUT_FOLDER="$FOLDER"/app/build/outputs/apk/release;
APP_FINAL_NAME=Twitch$VERSION.apk;
#making start here...
contains() {
    string="$1"
    substring="$2"
    if test "${string#*$substring}" != "$string"
    then
        return 0    # $substring is in $string
    else
        return 1    # $substring is not in $string
    fi
}

cd $FOLDER;

if [ ! -e ./local.properties ]; then
	echo -e "$\n local.properties not found...\nMaking a local.properties files using script information\n
\n local.properties done starting the build";
	touch "$FOLDER".local.properties;
	echo "$SDK_DIR" > local.properties;
	echo "$NDK_DIR" >> local.properties;
fi;

localproperties=$(echo $(cat local.properties));
localOK=0;
contains "$localproperties" "$NDK_DIR" && contains "$localproperties" "$SDK_DIR" && localOK=1;

if [ "$localOK" == 0 ]; then
	echo -e "\nSDK folder set as \n$SDK_DIR in the script \nbut local.properties file content is\n$localproperties\nfix it using script value";
	rm -rf .local.properties;
	touch "$FOLDER".local.properties;
	echo "$SDK_DIR" > local.properties;
	echo "$NDK_DIR" >> local.properties;
fi;

if [ $BAPP == 1 ]; then
	./gradlew clean
	echo -e "\n The above is just the cleaning build start now\n";
	rm -rf app/build/outputs/apk/**
	./gradlew build 2>&1 --warning-mode all | tee build_log.txt
fi;

END2="$(date)";
END=$(date +%s.%N);

if [ ! -e ./app/build/outputs/apk/release/app-release-unsigned.apk ]; then
	echo -e "\n${bldred}App not build${txtrst}\n"
	exit 1;
else
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -storepass "$KEY_PASS" -keystore "$KEY_FOLDER" "$OUT_FOLDER"/app-release-unsigned.apk Felipe_Leon
	"$ZIPALIGN_FOLDER" -v 4 "$OUT_FOLDER"/app-release-unsigned.apk "$OUT_FOLDER"/"$APP_FINAL_NAME"
	cp "$OUT_FOLDER"/"$APP_FINAL_NAME" "$OUT_FOLDER"/isu"$(date +%s)".apk

	echo "$(./gradlew -q gradleUpdates | sed '/jacoco/d')" >> build_log.txt

        ISSUES=$(grep issues build_log.txt | grep release)
	if [ -n "$ISSUES" ]; then
		NOISSUES=0;
		contains "$ISSUES" ": 1 issues" && NOISSUES=1;
		if [ $NOISSUES == 0 ]; then
			echo -e "\n${CYAN}Lint issues:\n${NC}";
			echo -e "${RED}$ISSUES${NC}";
			sensible-browser "$FOLDER"/app/build/reports/lint-results.html
		fi;
	fi;

        DEPRECATION=$(grep deprecation build_log.txt)
	if [ -n "$DEPRECATION" ]; then
		echo -e "\n${CYAN}Build deprecation:\n${NC}";
		echo -e "${RED}$DEPRECATION${NC}";
	fi;

        UPDATEDEPENDENCIES=$(grep ' \-> ' build_log.txt)
	if [ -n "$UPDATEDEPENDENCIES" ]; then
		echo -e "\n${CYAN}Dependencies that need update:\n${NC}";
		echo -e "${RED}$UPDATEDEPENDENCIES${NC}";
	fi;

        GRADLEVERSION=$(grep distributionUrl ./gradle/wrapper/gradle-wrapper.properties | head -n1 | cut -d\/ -f5)
        LASTGRADLEVERSION=$(grep 'current version' build_log.txt  | head -n1 | cut -d\/ -f5| cut -d\) -f1)
        LASTRCGRADLEVERSION=$(grep 'release-candidat' build_log.txt  | head -n1 | cut -d\/ -f5| cut -d\) -f1)
        NORC=1;
	contains "$LASTRCGRADLEVERSION" "null" && NORC=0;
	if [ $NORC == 1 ]; then
		if [ ! "$GRADLEVERSION" == "$LASTRCGRADLEVERSION" ]; then
			echo -e "\n${CYAN}Gradlew RC need update:\n${NC}";
			echo -e "\n${RED}current $GRADLEVERSION latest RC $LASTRCGRADLEVERSION\n${NC}";
		fi;
	elif [ ! "$GRADLEVERSION" == "$LASTGRADLEVERSION" ]; then
		echo -e "\n${CYAN}Gradlew need update:\n${NC}";
		echo -e "\n${RED}Current $GRADLEVERSION latest $LASTGRADLEVERSION\n${NC}";
	fi;

	echo -e "\n${GREEN}App saved at $OUT_FOLDER"/"$APP_FINAL_NAME${NC}";
fi;

echo -e "\n${YELLOW}*** Build END ***\n";
echo -e "Total elapsed time of the script: ${RED}$(echo "($END - $START) / 60"|bc ):$(echo "(($END - $START) - (($END - $START) / 60) * 60)"|bc ) ${YELLOW}(minutes:seconds).\n${NC}";
exit 1;

