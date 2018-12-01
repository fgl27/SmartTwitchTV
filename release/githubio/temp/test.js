/* jshint eqeqeq: true, undef: true, unused: true, node: true, browser: true */

var Main_clientId = "ypvnuqrh98wqz1sr0ov3fgfu4jh1yx";
var Main_clientIdHeader = 'Client-ID';
var Main_AcceptHeader = 'Accept';
var Main_TwithcV5Json = 'application/vnd.twitchtv.v5+json';

// problematic games contains ","

var game = ["Pokemon: Let's Go, Pikachu!/Eevee!", "Warhammer 40,000: Mechanicus", "Counter-Strike: Global Offensive", "Dota 2"];

Start();

function Start() {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", getAclip);
    else getAclip(); // `DOMContentLoaded` already fired
}

function getAclip() {
    var xmlHttp = new XMLHttpRequest();

    var url = 'https://api.twitch.tv/kraken/clips/top?game=';

    var code = window.location.href.match(/game=(\w+)/);
    var mgame = '';

    if (code && code[1] < 4) mgame += game[code[1]];
    else mgame += game[0];

    url += encodeURIComponent(mgame);

    xmlHttp.open("GET", url, true);

    xmlHttp.timeout = 10000;
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            console.log(xmlHttp.responseText);

            var data = JSON.parse(xmlHttp.responseText).clips;

            var hascomma = mgame.indexOf(',') !== -1 ? "This Game has a comma" : "This Game doesn't has a comma";

            hascomma += " result will return " + data.length + " clips";

            var ele = document.getElementById('result');
            ele.innerHTML = addtitle() + redDiv(hascomma) + '<br>xmlHttp.status: ' +
                redDiv(xmlHttp.status) + 'api url call: ' + redDiv(url) +
                'clips quantity: ' + redDiv(data.length) + 'game: ' + redDiv(mgame) +
                '<br><br> In the log you can see and copy the json result.';
        }
    };

    xmlHttp.send(null);
}

function redDiv(text) {
    return '<div style="display: inline-block; color: #FF0000; font-size: 110%; font-weight: bold;">' + text + '</div><br>';
}

function addtitle() {
    var title = 'Possible call options are the bellow links:<br><br>';

    for (var i = 0; i < game.length; i++)
        title += '<a href="https://fgl27.github.io/smarttv-twitch/release/githubio/temp/test.html?game=' + i + '">For: ' + game[i] + '</a><br>';

    return title + '<br>';
}