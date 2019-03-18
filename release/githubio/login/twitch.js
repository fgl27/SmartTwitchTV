/* jshint eqeqeq: true, undef: true, unused: true, node: true, browser: true */

var baseUrlCode = 'https://id.twitch.tv/oauth2/authorize?';
var type_code = 'code';
var client_id = 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx';
var redirect_uri = 'https://fgl27.github.io/SmartTwitchTV/release/githubio/login/twitch.html';
var scope = 'user_follows_edit+user_subscriptions';
var force_verify = 'true';
var code = '';

Start();

function Start() {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ProcessStart);
    else ProcessStart(); // `DOMContentLoaded` already fired
}

function ProcessStart() {
    console.log("ProcessStart");
    if (window.location.href.indexOf('code') !== -1) processCode(window.location.href);
    else document.getElementById("Authorize").addEventListener("click", autorizationClick);
}

function autorizationClick() {
    console.log("autorizationClick");
    var url = baseUrlCode + 'response_type=' + type_code + '&client_id=' + encodeURIComponent(client_id) +
        '&redirect_uri=' + redirect_uri + '&scope=' + scope + '&force_verify=' + force_verify;
    window.location = url;
}

function processCode(pageUrl) {
    console.log("processCode");
    code = pageUrl.match(/code=(\w+)/);
    if (code) {
        code = code[1];
        document.getElementById('Authorize').classList.add('hidden');
        document.getElementById("PageText").innerHTML = 'Enter the bellow key in the above screen of the app (There is only lower case letters and numbers)<br><div style="font-size: 150%; font-weight: bold; color: #FFFFFF;">Key:<br><br>' + code + '<br></div>';
        console.log('if code ' + code);
    } else {
        document.getElementById("PageText").innerHTML = '<div style="font-size: 150%; font-weight: bold; color: #FFFFFF;">An error occurred, please try again, if the error persists contact the developer in the bellow github link</div>';
        document.getElementById("Authorize").addEventListener("click", autorizationClick);
        console.log('else code ' + code);
    }
}