console.log('Start');

const tools = require('./tools');

//create a temp file with the content of versions file and execute and delete it
function version_up() {
    console.log('version_up start');

    const version = tools.readFileSync('./app/general/version.js') + tools.readFileSync('./release/scripts/version.js');
    const scripPath = './release/version.js';

    tools.writeFileSync(scripPath, version);

    tools.runNodeJsSync(scripPath);

    tools.deleteFileSync(scripPath);

    console.log('version_up end');
}

version_up();

console.log('End');
