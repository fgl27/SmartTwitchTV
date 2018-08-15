/* jshint undef: true, unused: true, node: true, browser: true */
//Variable initialization
var Chat_LoadGlobal = false;
var Chat_loadingDataTry = 0;
var Chat_Messages = [];
var Chat_loadingDataTryMax = 10;
var Chat_addlines;
var Chat_next = null;
var defaultColors = ["#FF0000", "#0000FF", "#008000", "#B22222", "#FF7F50", "#9ACD32", "#FF4500", "#6BC81E", "#DAA520", "#D2691E", "#5F9EA0", "#1E90FF", "#FF69B4", "#8A2BE2", "#00FF7F"];
//Variable initialization end

//temp vars
var Main_selectedChannel_id = '71190292';
var Main_clientId = "ypvnuqrh98wqz1sr0ov3fgfu4jh1yx";
var ChannelVod_vodId = '296954486';
var Counter = 0;
var Position = 0;
var Chat_div;

//This js is a adaptation of https://www.nightdev.com/kapchat/ functions
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded");
    Chat_div = document.getElementById('chat_box');
    Chat_loadBadgesGlobal();
});

function transformBadges(sets) {
    return Object.keys(sets).map(function(b) {
        var badge = sets[b];
        badge.type = b;
        badge.versions = Object.keys(sets[b].versions).map(function(v) {
            var version = sets[b].versions[v];
            version.type = v;
            return version;
        });
        return badge;
    });
}

function tagCSS(type, version, url, addToHead) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.' + type + '-' + version + ' { background-image: url("' + url.replace('http:', 'https:') + '"); }';
    if (addToHead) document.head.appendChild(style);
    else Chat_div.appendChild(style);
}

function Chat_loadBadgesGlobal() {
    console.log("Chat_loadBadgesGlobal");
    Chat_loadingDataTry = 0;
    Chat_LoadGlobal = false;
    Chat_loadBadgesGlobalRequest();
}

function Chat_loadBadgesGlobalRequest() {
    console.log("Chat_loadBadgesGlobalRequest");
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://badges.twitch.tv/v1/badges/global/display', true);
        xmlHttp.timeout = 10000;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Chat_loadBadgesGlobalSuccess(xmlHttp.responseText);
                    return;
                } else {
                    Chat_loadBadgesGlobalError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Chat_loadBadgesGlobalError();
    }
}

function Chat_loadBadgesGlobalError() {
    console.log("Chat_loadBadgesGlobalError");
    Chat_loadingDataTry++;
    if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadBadgesGlobalRequest();
    else Chat_LoadGlobal = false;
}

function Chat_loadBadgesGlobalSuccess(responseText) {
    console.log("Chat_loadBadgesGlobalSuccess");

    transformBadges(JSON.parse(responseText).badge_sets).forEach(function(badge) {
        badge.versions.forEach(function(version) {
            tagCSS(badge.type, version.type, version.image_url_4x, true);
        });
    });
    Chat_LoadGlobal = true;
    Chat_loadBadgesChannel();
}

function Chat_loadBadgesChannel() {
    console.log("Chat_loadBadgesChannel");
    Chat_loadingDataTry = 0;
    Chat_loadBadgesChannelRequest();
}

function Chat_loadBadgesChannelRequest() {
    console.log("Chat_loadBadgesChannelRequest");
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://badges.twitch.tv/v1/badges/channels/' + Main_selectedChannel_id + '/display', true);
        xmlHttp.timeout = 10000;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Chat_loadBadgesChannelSuccess(xmlHttp.responseText);
                    return;
                } else {
                    Chat_loadBadgesChannelError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Chat_loadBadgesChannelError();
    }
}

function Chat_loadBadgesChannelError() {
    console.log("Chat_loadBadgesChannelError");
    Chat_loadingDataTry++;
    if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadBadgesChannelRequest();
    else window.setTimeout(Chat_loadBadgesChannelRequest, 2500);
}

function Chat_loadBadgesChannelSuccess(responseText) {
    console.log("Chat_loadBadgesChannelSuccess");

    transformBadges(JSON.parse(responseText).badge_sets).forEach(function(badge) {
        badge.versions.forEach(function(version) {
            tagCSS(badge.type, version.type, version.image_url_4x, false);
        });
    });
    Chat_loadChat();
}

function Chat_loadChat() {
    console.log("Chat_loadChat");
    Chat_loadingDataTry = 0;
    Chat_loadChatRequest();
}

function Chat_loadChatRequest() {
    console.log("Chat_loadChatRequest");
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/v5/videos/' + ChannelVod_vodId + '/comments?client_id=' + Main_clientId + (Chat_next !== null ? '&cursor=' + Chat_next : ''), true);
        xmlHttp.timeout = 10000;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Chat_loadChatSuccess(xmlHttp.responseText);
                    return;
                } else {
                    Chat_loadChatError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        Chat_loadChatError();
    }
}

function Chat_loadChatError() {
    console.log("Chat_loadChatError");
    Chat_loadingDataTry++;
    if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadChatRequest();
    else window.setTimeout(Chat_loadChatRequest, 2500);
}

function Chat_loadChatSuccess(responseText) {
    console.log("Chat_loadChatSuccess");
    responseText = JSON.parse(responseText);
    var div, mmessage;

    if (Chat_next === null) {
        div = '&nbsp;';
        Chat_MessageVector(div, 0);
    }

    Chat_next = responseText._next;

    responseText.comments.forEach(function(comments) {
        div = '';
        mmessage = comments.message;

        //Add badges
        if (mmessage.hasOwnProperty('user_badges')) {
            mmessage.user_badges.forEach(function(badges) {
                div += '<span class="' + badges._id + '-' + badges.version + ' tag"></span>';
            });
        }

        //Add nick
        div += '<span class="nick" style="color: ' + defaultColors[(comments.commenter.display_name).charCodeAt(0) % 15] + ';">' + comments.commenter.display_name + '</span>&#58;&nbsp;';

        //Add mesage
        div += '<span class="message">';
        mmessage.fragments.forEach(function(fragments) {
            if (fragments.hasOwnProperty('emoticon')) div += '<img class="emoticon" src="https://static-cdn.jtvnw.net/emoticons/v1/' + fragments.emoticon.emoticon_id + '/1.0" srcset="https://static-cdn.jtvnw.net/emoticons/v1/' + fragments.emoticon.emoticon_id + '/2.0 2x, https://static-cdn.jtvnw.net/emoticons/v1/' + fragments.emoticon.emoticon_id + '/3.0 4x">';
            else div += fragments.text;
        });
        div += '</span>';
        Chat_MessageVector(div, comments.content_offset_seconds);
    });

    Chat_addlines = window.setInterval(function() {
        Main_Addline();
        Chat_div.scrollTop = Chat_div.scrollHeight;
    }, 250);

}

function Chat_MessageVector(message, time) {
    Chat_Messages.push({
        'time': Math.floor(time),
        'message': message
    });
}

function Main_Addline() {
    var elem, i;
    if (Position < (Chat_Messages.length - 1)) {
        for (i = Position; i < Chat_Messages.length; i++, Position++) {
            if (Chat_Messages[i].time < Counter) {
                elem = document.createElement('div');
                elem.className = 'chat_line';
                elem.innerHTML = Chat_Messages[i].message;

                Chat_div.appendChild(elem);
            } else {
                break;
            }
        }
        Counter += 0.25;
    } else {
        window.clearInterval(Chat_addlines);
        console.log("time = " + Counter);
        //load more
        Position = 0;
        Chat_Messages = [];
        Chat_loadChat();
        
        //delete hided lines
        var linesToDelete = document.getElementsByClassName("chat_line");
        if ((linesToDelete.length - 100) > 0) {
            for (i = 0; i < (linesToDelete.length - 100); i++) {
                linesToDelete[0].parentNode.removeChild(linesToDelete[0]);
            }
        }
        Chat_div.scrollTop = Chat_div.scrollHeight;
        // on exit cleanup the div
        //Main_empty('chat_box');
    }
}
