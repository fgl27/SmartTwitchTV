const tools = require('./tools');
require('shelljs/global');

const assetDir = 'apk/app/src/main/assets';

function clean() {
    sed('-i', 'LoadFromAssets = true', 'LoadFromAssets = false', 'apk/app/src/main/java/com/fgl27/twitch/Constants.java');

    tools.deleteFolderSync(assetDir);

    console.log('Clean assets run');
}

function set() {
    console.log('set');
    sed('-i', 'LoadFromAssets = false', 'LoadFromAssets = true', 'apk/app/src/main/java/com/fgl27/twitch/Constants.java');

    //prepare folders
    tools.deleteFolderSync(assetDir);
    tools.mkdirSync(assetDir);
    tools.mkdirSync(assetDir + '/release/githubio');

    //copy files

    tools.copySync('app/', assetDir + '/app');
    tools.copySync('release/githubio/css/', assetDir + '/release/githubio/');

    console.log('Set assets run');
}

function run() {
    const args = process.argv.slice(2);

    if (args[0] === 'clean') {
        clean();
        return;
    }

    set();
}

run();
