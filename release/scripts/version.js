fs = require('fs');

function mWriteFile(path, text, LogMsg) {
    fs.writeFileSync(path, text, function (err) {
        if (err) return console.log(err);
        else if (LogMsg) console.log(LogMsg);
    });
}

//UPdate version.json file use so the app can check for updates
mWriteFile('./release/githubio/version/version.json', JSON.stringify(version), 'Save version.json OK');

//Update the temp Changelog_Up.md, content used to update the main Changelog.md
var changelog = version.changelog,
    len = changelog[0].changes.length,
    i = 0,
    newLine = '\n',
    text = changelog[0].title;

text += newLine + '==============' + newLine + newLine;

for (i; i < len; i++) {
    text += '* ' + changelog[0].changes[i] + newLine;
}

mWriteFile('./apk/Changelog_Up.md', text + newLine);

console.log('Version run');
