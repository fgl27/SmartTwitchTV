console.log('Start');

const minify = require('html-minifier').minify;
const jshint = require('jshint').JSHINT;

const tools = require('./tools');
const temp_maker_folder = 'release/temp_maker/';
const mainJSFile = temp_maker_folder + 'main.js';

//This will update the version JSON file and the temp Changelog_Up.md file
function version_up() {
    console.log('version_up start');

    //create a temp file with the content of versions file (./app/general/version.js and ./release/scripts/version.js)
    const version = tools.readFileSync('./app/general/version.js') + tools.readFileSync('./release/scripts/version.js');
    const scripPath = './release/temp_maker/version.js';

    //write in sync as we will execute it
    tools.writeFileSync(scripPath, version);

    // execute
    tools.runNodeJsASync(scripPath);

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

    //write a uncompressed copy to temp folder for visual debug proposes
    tools.writeFileASync(writePath.replace('index', 'index_uncompressed').replace('release/', 'release/temp_maker/'), htmlFile);

    //minify and clean
    const options = {
        collapseWhitespace: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true
    };
    htmlFile = minify(htmlFile, options);

    //write to main folder
    tools.writeFileASync(writePath, htmlFile);

    console.log('cleanMinifyHTML ' + filePath + ' end');
}

function make_HTML() {
    cleanMinifyHTML('app/index.html', 'githubio/js/main.js', 'release/index.html');
    cleanMinifyHTML('app/Extrapage/index.html', 'githubio/js/Extrapage.js', 'release/extrapageindex.html');

    console.log('make_HTML end');
}

function make_JS() {
    const allJSFiles = tools.getFilesFromArrayByType(['app/languages/', 'app/general/', 'app/specific/', 'app/thirdparty/'], '.js');
    let mainJSContent = '';

    for (const file of allJSFiles) {
        mainJSContent += tools.readFileSync(file);
    }

    tools.writeFileSync(mainJSFile, mainJSContent);

    if (js_jshint(mainJSContent)) {
        console.log('\nFile ' + mainJSFile);
        console.log('');
        return false;
    }

    const extraJSContent = tools.readFileSync('app/Extrapage/Extrapage.js');

    if (js_jshint(extraJSContent)) {
        console.log('\nFile ' + 'app/Extrapage/Extrapage.js');
        console.log('');
        return false;
    }

    tools.writeFileSync(temp_maker_folder + 'Extrapage.js', extraJSContent);

    console.log('make_mainJS end');

    return true;
}

function js_jshint(source) {
    const options = {
        eqeqeq: true,
        laxbreak: true,
        undef: true,
        unused: true,
        browser: true,
        node: true
    };

    const predef = {
        Android: true,
        punycode: true,
        smartTwitchTV: true,
        firebase: true,
        dataLayer: true,
        firebase: true,
        ActiveXObject: true,
        Twitch: true,
        global: true
    };

    jshint(source, options, predef);
    const errors = jshint.data().errors;

    if (errors) {
        console.log('\njshint fail:\n');
        for (const error of errors) {
            console.log('Line ' + error.line + ' reason ' + error.reason + ' code ' + error.code + ' evidence ' + error.evidence);
        }

        console.log('\nTotal errors = ' + errors.length);
    }

    return Boolean(errors && errors.length);
}

function run_all() {
    tools.mkdirSync(temp_maker_folder);

    //make main js file if doesn't pass jshint validation exit.
    if (!make_JS()) return;

    make_HTML();

    version_up();
}

run_all();
console.log('End');
