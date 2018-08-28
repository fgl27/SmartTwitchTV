/* jshint undef: true, unused: true, node: true, browser: true */
// Keep this file named as (zero)*** so it loads first in release_maker

var baseUrl = 'https://api.twitch.tv/kraken/oauth2';

//vars to get the code
var baseUrlCode = baseUrl + '/authorize?';
var type_code = 'code';
var client_id = 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx';
var redirect_uri = 'https://bhb27.github.io/smarttv-twitch/release/githubio/login/twitch.html';
var scope = 'user_follows_edit+user_subscriptions';
var force_verify = 'true';
var client_secret = "zhd1wr8lxyz9snzo48rfb70r7vtod6";
var code = '';

document.addEventListener("DOMContentLoaded", function() {
    console.log("Process Started");
    if (window.location.href.indexOf('code') !== -1) processCode(window.location.href);
    else document.getElementById("Authorize").addEventListener("click", autorizationClick);
});

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
        document.getElementById("PageText").innerHTML = 'Enter the bellow key in the above screen of the app (There is only lower case letters)<br><div style="font-size: 150%; font-weight: bold; color: #FFFFFF;">Key:<br><br>' + code + '<br></div>';
        console.log(code);
    } else {
        document.getElementById("PageText").innerHTML = '<div style="font-size: 150%; font-weight: bold; color: #FFFFFF;">An error occurred, please try again, if the error persists contact the developer in the bellow github link</div>';
        document.getElementById("Authorize").addEventListener("click", autorizationClick);
    }
}