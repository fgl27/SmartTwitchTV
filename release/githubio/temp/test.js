/* jshint eqeqeq: true, undef: true, unused: true, node: true, browser: true */
var Main_clientId = "ypvnuqrh98wqz1sr0ov3fgfu4jh1yx";
var Main_clientIdHeader = 'Client-ID';
var Main_ItemsLimitGame = 45;
var counter = 0;
var offset = 0;

test();

function test() {
    Games_loadDataRequest(0);
}

function Games_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/games/top?limit=' + Main_ItemsLimitGame + '&offset=' + offset, true);

        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Games_loadDataSuccess(xmlHttp.responseText);
                    return;
                } else {
                    console.log("else error Games_loadDataRequest");
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        console.log("catch error Games_loadDataRequest");
    }
}

function Games_loadDataSuccess(responseText) {
    //console.log(responseText);
    var response = JSON.parse(responseText);
    var response_items = response.top.length;
    console.log(response_items);
    offset += response_items;
    counter++;
    if (counter < 10)Games_loadDataRequest(response_items);
}
