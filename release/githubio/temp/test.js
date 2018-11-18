/* jshint eqeqeq: true, undef: true, unused: true, node: true, browser: true */

var Main_clientId = "ypvnuqrh98wqz1sr0ov3fgfu4jh1yx";
var Main_clientIdHeader = 'Client-ID';
var Main_AcceptHeader = 'Accept';
var Main_TwithcV5Json = 'application/vnd.twitchtv.v5+json';

// problematic games with ,,,,,,,,
var game1 = "506237";//"Pokemon: Let's Go, Pikachu!/Eevee!";
var game2 = "Warhammer 40,000: Mechanicus";

//OK games
var game3 = "Fortnite";
var game4 = "Dota 2";

//console.log(Settings_GenerateClock());

function getclips() {
    var xmlHttp = new XMLHttpRequest();


    var url = 'https://api.twitch.tv/kraken/clips/top?game=';
    url += game1 + '&limit=100&period=all';

    url = 'https://api.twitch.tv/helix/clips?game_id=';
    url += game1 + '&limit=100&period=all';


    //url = 'https://api.twitch.tv/kraken/games/top';

url = encodeURI(url);
//.replace("%2C", ",")

    console.log(url);

    xmlHttp.open("GET", url, true);

    xmlHttp.timeout = 10000;
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            console.log(xmlHttp.status);
            console.log(xmlHttp.responseText);
            //var data = JSON.parse(xmlHttp.responseText).clips;
            //console.log('quantity ' + data.length);
        }
    };

    xmlHttp.send(null);
}

getclips();
