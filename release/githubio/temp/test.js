var mobj = {};

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded");
    test("#1", "333");
    test("#3", "333");
    test("#2", "333");
    test("#0", "333");
    console.log(mobj);
    console.log(mobj['#224']);

for (var key in mobj)
        if (mobj.hasOwnProperty(key)) 
        console.log(key + ' ' + mobj[key]);

testnull(null);
testnull(testLog);

AddCode_CheckToken()
});


function test(key, value) {
    mobj[key] = value;
}

function testnull(func) {
   if (func) func();
   else console.log(func);

}

function testLog() {
   console.log('testlog');
}

function AddCode_CheckToken() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken?oauth_token=buliu8ht6eps2vzw9qqeuqlp920c44', true);
        xmlHttp.timeout = 10000;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                    console.log(xmlHttp.responseText);
                if (xmlHttp.status === 200) {
                    console.log(xmlHttp.responseText);
                    if (!JSON.parse(xmlHttp.responseText).token.valid) AddCode_refreshTokens(position, 0, null);
                    else console.log('else');
                    return;
                } 
            }
        };

        xmlHttp.send(null);
    } catch (e) {

    }
}
