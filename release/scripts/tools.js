fs = require('fs');

function writeFileSync(path, text) {
    fs.writeFileSync(path, text);
}

function readFileSync(path) {
    return fs.readFileSync(path, 'utf8');
}

function mkdirSync(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

function copyFileSync(srcPath, destPath) {
    fs.copyFileSync(srcPath, destPath);
}

function runNodeJsSync(path) {
    require('child_process').execSync('node ' + path);
}

function deleteFileSync(path) {
    fs.unlinkSync(path);
}

module.exports = {writeFileSync, readFileSync, runNodeJsSync, deleteFileSync, mkdirSync, copyFileSync};
