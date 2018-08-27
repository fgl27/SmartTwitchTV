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

//vars to get the token and refresh token
var authorization_code = "authorization_code";
var baseUrlToken = baseUrl + '/token?';
var code = '';

//vars to refresh the token
var access_token = '';
var refresh_token = '';
var type_refresh_token = 'refresh_token';

//etc var
var loadingDataTry = 0;
var loadingDataTryMax = 10;


document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded");
    console.log(window.location.href);

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
        //requestTokens();
    } else document.getElementById("PageText").innerHTML = '<div style="font-size: 150%; font-weight: bold; color: #FFFFFF;">An error occurred, please try again, if the error persists contact the developer in the bellow github link</div>';
}

function requestTokens() {
    console.log("requestTokens");
    try {

        var xmlHttp = new XMLHttpRequest();
        var url = baseUrlToken + 'grant_type=' + authorization_code + '&client_id=' + encodeURIComponent(client_id) +
            '&client_secret=' + encodeURIComponent(client_secret) + '&code=' + encodeURIComponent(code) +
             '&redirect_uri=' + redirect_uri;

        xmlHttp.open("POST", url, true);
        xmlHttp.timeout = 10000;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                console.log(xmlHttp.responseText);
                if (xmlHttp.status === 200) {
                    requestTokensSucess(xmlHttp.responseText);
                } else requestTokensError();
                return;
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        requestTokensError();
    }
}

function requestTokensError() {
    loadingDataTry++;
    if (loadingDataTry < loadingDataTryMax) {
        requestTokens();
    } else console.log("requestTokensError error");
}

function requestTokensSucess(responseText) {
    console.log("requestTokensSucess");

    var response = JSON.parse(responseText);
    access_token = response.access_token;
    refresh_token = response.refresh_token;

    console.log("access_token = " + access_token);
    console.log("refresh_token = " + refresh_token);

    loadingDataTry = 0;
    refreshTokens();
}

function refreshTokens() {
    console.log("refreshTokens");
    try {

        var xmlHttp = new XMLHttpRequest();
        var url = baseUrlToken + 'grant_type=' + type_refresh_token + '&client_id=' + encodeURIComponent(client_id) +
            '&client_secret=' + encodeURIComponent(client_secret) + '&refresh_token=' + encodeURIComponent(refresh_token);

        xmlHttp.open("POST", url, true);
        xmlHttp.timeout = 10000;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                console.log(xmlHttp.responseText);
                if (xmlHttp.status === 200) {
                    refreshTokensSucess(xmlHttp.responseText);
                } else refreshTokensError();
                return;
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        refreshTokensError();
    }
}

function refreshTokensError() {
    loadingDataTry++;
    if (loadingDataTry < loadingDataTryMax) {
        refreshTokens();
    } else console.log("refreshTokensError error");
}

function refreshTokensSucess(responseText) {
    console.log("refreshTokensSucess");
    var response = JSON.parse(responseText);
    access_token = response.access_token;
    refresh_token = response.refresh_token;

    console.log("access_token = " + access_token);
    console.log("refresh_token = " + refresh_token);
}
