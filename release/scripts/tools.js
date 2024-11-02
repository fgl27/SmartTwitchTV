fs = require('fs');

const errorFun = function (e) {
    if (e) {
        console.log(e);
        throw e;
    }
};

function writeFileSync(path, text) {
    fs.writeFileSync(path, text);
}

function writeFileASync(path, text) {
    fs.writeFile(path, text, errorFun);
}

function readFileSync(path) {
    return fs.readFileSync(path, 'utf8');
}

function getFilesFromArrayByType(folderPathArray, type) {
    const result = [];
    for (const path of folderPathArray) {
        result.push(...getFilesFromPathByType(path, type));
    }
    return result;
}

function getFilesFromPathByType(folderPath, type) {
    const result = [];

    fs.readdirSync(folderPath).forEach(file => {
        if (file.endsWith(type)) {
            result.push(folderPath + file);
        }
    });

    return result;
}

function mkdirSync(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true});
    }
}

function copyFileSync(srcPath, destPath) {
    fs.copyFileSync(srcPath, destPath);
}

function runNodeJsSync(path) {
    require('child_process').execSync('node ' + path);
}

function runNodeJsASync(path) {
    require('child_process').fork(path);
}

function deleteFileSync(path) {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

function deleteFolderSync(path) {
    if (fs.existsSync(path)) {
        fs.rmSync(path, {recursive: true});
    }
}

function copySync(source, dest) {
    fs.cpSync(source, dest, {recursive: true});
}

module.exports = {
    writeFileSync,
    writeFileASync,
    readFileSync,
    getFilesFromArrayByType,
    getFilesFromPathByType,
    runNodeJsSync,
    runNodeJsASync,
    deleteFileSync,
    mkdirSync,
    copyFileSync,
    copySync,
    deleteFolderSync
};
