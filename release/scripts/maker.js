console.log('Start');

minify = require('html-minifier').minify;
const tools = require('./tools');

//This will update the version JSON file and the temp Changelog_Up.md file
function version_up() {
    console.log('version_up start');

    //create a temp file with the content of versions file (./app/general/version.js and ./release/scripts/version.js)
    const version = tools.readFileSync('./app/general/version.js') + tools.readFileSync('./release/scripts/version.js');
    const scripPath = './release/version.js';

    tools.writeFileSync(scripPath, version);

    // execute
    tools.runNodeJsSync(scripPath);

    // delete the temp file
    tools.deleteFileSync(scripPath);

    console.log('version_up end');
}

//Clean up HTML files, replace all local reference and minify
function cleanMinifyHTML(filePath, singleJSPath, writePath) {
    //read the main html file
    let htmlFile = tools.readFileSync(filePath);

    //replace all js code with single line of js code
    htmlFile = htmlFile.replace(/(.*jsstart)([\s\S]*)(.*jsend-->)/g, '<script src="' + singleJSPath + '" defer></script>');

    //replace local path reference
    htmlFile = htmlFile.replaceAll('../release/', '');

    //add .min reference to css files
    htmlFile = htmlFile.replaceAll('css/icons.css', 'css/icons.min.css');

    //minify and clean
    htmlFile = minify(htmlFile, {
        collapseWhitespace: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true
    });

    //write to main folder
    tools.writeFileSync(writePath, htmlFile);

    console.log('cleanMinifyHTML ' + filePath + ' end');
}

function prepareHTML() {
    cleanMinifyHTML('app/index.html', 'githubio/js/main.js', 'release/index.html');
    cleanMinifyHTML('app/Extrapage/index.html', 'githubio/js/Extrapage.js', 'release/extrapageindex.html');

    console.log('prepareHTMLs end');
}

function run_all() {
    const temp_maker_folder = 'release/temp_maker/';
    tools.mkdirSync(temp_maker_folder);

    prepareHTML();
    version_up();
}

run_all();
console.log('End');
