fs = require('fs');

function writeFileSync(path, text, LogMsg) {
    fs.writeFileSync(path, text, function (err) {
        if (err) {
            return console.log(err);
        } else if (LogMsg) {
            console.log(LogMsg);
        }
    });
}

function readFileSync(path) {
    return fs.readFileSync(path, 'utf8');
}

function runNodeJsSync(path) {
    require('child_process').execSync('node ' + path);
}

function deleteFileSync(path) {
    fs.unlinkSync(path);
}

module.exports = {writeFileSync, readFileSync, runNodeJsSync, deleteFileSync};
