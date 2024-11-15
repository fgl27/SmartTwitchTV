const minify = require('html-minifier').minify;
const jshint = require('jshint').JSHINT;

const crass = require('crass');
const UglifyJS = require('uglify-js');

const prettier = require('prettier');

const tools = require('./tools');
const temp_maker_folder = 'release/temp_maker/';
const mainJSFile = temp_maker_folder + 'main_temp.js';

const UglifyJS_compress = {arrows: false}; //prevent devices with old browser implementation may not supporting arrows

//This will update the version JSON file and the temp Changelog_Up.md file
function version_up() {
    console.log('\nCreating Version files...');

    //create a temp file with the content of versions file (./app/general/version.js and ./release/scripts/version.js)
    const version = tools.readFileSync('./app/general/version.js') + tools.readFileSync('./release/scripts/version.js');
    const scripPath = './release/temp_maker/version.js';

    //write in sync as we will execute it
    tools.writeFileSync(scripPath, version);

    // execute
    tools.runNodeJsASync(scripPath);
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
}

function make_HTML() {
    console.log('\nCreating HTML files...');

    cleanMinifyHTML('app/index.html', 'githubio/js/main.js', 'release/index.html');
    cleanMinifyHTML('app/Extrapage/index.html', 'githubio/js/Extrapage.js', 'release/extrapageindex.html');
}

function make_CSS() {
    console.log('\nCreating CSS files...');

    const iconCSS = tools.readFileSync('release/githubio/css/icons.css');

    //compress the stylesheet
    let parsed = crass.parse(iconCSS);
    // Optimize the stylesheet:
    parsed = parsed.optimize();

    // Save the stylesheet:
    tools.writeFileASync('release/githubio/css/icons.min.css', parsed.toString());
}

function make_JS(jshOnly) {
    console.log(jshOnly ? '\nVerifying js files...' : '\nCreating js files...');

    const options = {
        compress: UglifyJS_compress,
        mangle: true
    };

    const allJSFiles = tools.getFilesFromArrayByType(['app/languages/', 'app/general/', 'app/specific/', 'app/thirdparty/'], '.js');
    let mainJSContent = '';
    let mainJSContentCompressed = '';
    let fileContent = '';

    for (const file of allJSFiles) {
        fileContent = tools.readFileSync(file);

        if (file.includes('Main.js')) {
            fileContent = fileContent.replace('Main_Start();', '');
        }
        mainJSContent += fileContent;
        mainJSContentCompressed += UglifyJS.minify(fileContent, options).code;
    }

    tools.writeFileASync(mainJSFile, mainJSContent);

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

    if (jshOnly) {
        console.log('\nVerifying complete no issues found...\n');
        return false;
    }

    tools.writeFileASync(temp_maker_folder + 'Extrapage.js', extraJSContent);

    makeMainJS(mainJSContentCompressed, mainJSContent, extraJSContent);

    return true;
}

async function makeMainJS(mainJSContentCompressed, mainJSContent, extraJSContent) {
    const releaseAPI = tools.readFileSync('release/api.js');

    const releaseAPIStart = releaseAPI.split('APISPLITSTART')[1].split('//APIMID')[0];
    const releaseAPIEnd = releaseAPI.split('APISPLITCENTER')[1].split('//APIEND')[0];

    const options = await prettier.resolveConfig('.prettierrc');

    const finalMainJSContent = await prettier.format(releaseAPIStart + mainJSContent + releaseAPIEnd, options);
    const finalMainJSContentCompressed = await prettier.format(releaseAPIStart + mainJSContentCompressed + releaseAPIEnd, options);

    tools.writeFileASync(temp_maker_folder + 'main_uncompressed.js', finalMainJSContent);
    tools.writeFileASync('release/githubio/js/main_uncompressed.js', finalMainJSContent);

    make_uglifyjs(finalMainJSContentCompressed, extraJSContent);
}

function make_uglifyjs(finalMainJSContentCompressed, extraJSContent) {
    const options = {
        compress: UglifyJS_compress,
        mangle: {
            toplevel: true,
            eval: true
        }
    };

    tools.writeFileASync('release/githubio/js/main.js', UglifyJS.minify(finalMainJSContentCompressed, options).code);
    tools.writeFileASync('release/githubio/js/Extrapage.js', UglifyJS.minify(extraJSContent, options).code);
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
    const args = process.argv.slice(2);
    const jshOnly = args[0] === 'jsh';

    if (!jshOnly) console.log('Started release maker...');

    tools.mkdirSync(temp_maker_folder);

    //make main js file if doesn't pass jshint validation exit.
    //Or if on jshint only mode also exit
    if (!make_JS(jshOnly)) return;

    make_HTML();
    make_CSS();
    version_up();

    console.log('\nFinishing release maker...');
}

run_all();
