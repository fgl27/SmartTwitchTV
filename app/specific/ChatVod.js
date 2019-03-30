//Variable initialization
var Chat_LoadGlobal = false;
var Chat_loadingDataTry = 0;
var Chat_Messages = [];
var Chat_MessagesNext = [];
var Chat_loadingDataTryMax = 10;
var Chat_addlines;
var Chat_next = null;
var Chat_loadChatId;
var Chat_loadChatNextId;
var Chat_offset = 0;
var Chat_title = '';
var defaultColors = ["ff0000", "ff4000", "ff8000", "ffbf00", "ffff00", "bfff00", "80ff00", "40ff00", "00ff00", "00ff40", "00ff80", "00ffbf", "00ffff", "00bfff", "0080ff", "0040ff", "ff00ff", "ff00bf", "ff0080", "ff0040"];
var defaultColorsLength = defaultColors.length;
var Chat_div;
var Chat_Position = 0;
var Chat_hasEnded = false;
var Chat_Id = 0;
var Chat_loadBadgesChannelId;
//Variable initialization end

function Chat_Preinit() {
    Chat_div = document.getElementById('chat_box');
    Chat_loadBadgesGlobal();
}

function Chat_Init() {
    Chat_Clear();
    if (!Main_Android || !Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }
    if (!Chat_LoadGlobal) Chat_loadBadgesGlobal();

    Main_ready(function() {
        Chat_Id = (new Date()).getTime();
        Chat_loadBadgesChannel(Chat_Id);
    });

}

//This file use some function or adptations of function from https://www.nightdev.com/kapchat/
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
    Chat_loadingDataTry = 0;
    Chat_LoadGlobal = false;
    Chat_loadBadgesGlobalRequest();
}

function Chat_loadBadgesGlobalRequest() {
    var theUrl = 'https://badges.twitch.tv/v1/badges/global/display';
    BasehttpGet(theUrl, 10000, 0, null, Chat_loadBadgesGlobalSuccess, Chat_loadBadgesGlobalError);
}

function Chat_loadBadgesGlobalError() {
    Chat_loadingDataTry++;
    if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadBadgesGlobalRequest();
    else Chat_LoadGlobal = false;
}

function Chat_loadBadgesGlobalSuccess(responseText) {
    transformBadges(JSON.parse(responseText).badge_sets).forEach(function(badge) {
        badge.versions.forEach(function(version) {
            tagCSS(badge.type, version.type, version.image_url_4x, true);
        });
    });
    Chat_LoadGlobal = true;
}

function Chat_loadBadgesChannel(id) {
    Chat_loadingDataTry = 0;
    Chat_loadBadgesChannelRequest(id);
}

function Chat_loadBadgesChannelRequest(id) {
    var theUrl = 'https://badges.twitch.tv/v1/badges/channels/' + Main_values.Main_selectedChannel_id + '/display';
    var xmlHttp;
    if (Main_Android) {

        xmlHttp = Android.mreadUrl(theUrl, 10000, 0, null);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            if (Chat_Id === id) Chat_loadBadgesChannelError(id);
            return;
        }

        if (xmlHttp.status === 200) {
            if (Chat_Id === id) Chat_loadBadgesChannelSuccess(xmlHttp.responseText, id);
            return;
        } else {
            if (Chat_Id === id) Chat_loadBadgesChannelError(id);
        }


    } else {
        xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = 10000;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    if (Chat_Id === id) Chat_loadBadgesChannelSuccess(xmlHttp.responseText, id);
                    return;
                } else {
                    if (Chat_Id === id) Chat_loadBadgesChannelError(id);
                }
            }
        };

        xmlHttp.send(null);
    }
}

function Chat_loadBadgesChannelError(id) {
    Chat_loadingDataTry++;
    if (Chat_Id === id) {
        if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadBadgesChannelRequest(id);
        else {
            Chat_loadBadgesChannelId = window.setTimeout(function() {
                Chat_loadBadgesChannelRequest(id);
            }, 2500);
        }
    }
}

function Chat_loadBadgesChannelSuccess(responseText, id) {
    transformBadges(JSON.parse(responseText).badge_sets).forEach(function(badge) {
        badge.versions.forEach(function(version) {
            tagCSS(badge.type, version.type, version.image_url_4x, false);
        });
    });

    if (Chat_Id === id) Chat_loadChat(id);
}

function Chat_loadChat(id) {
    Chat_loadingDataTry = 0;
    if (Chat_Id === id) Chat_loadChatRequest(id);
}

function Chat_loadChatRequest(id) {
    var theUrl = 'https://api.twitch.tv/v5/videos/' + Main_values.ChannelVod_vodId +
        '/comments?client_id=' + Main_clientId + (Chat_offset ? '&content_offset_seconds=' + parseInt(Chat_offset) : '');
    var xmlHttp;
    if (Main_Android) {

        xmlHttp = Android.mreadUrl(theUrl, 10000, 0, null);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            if (Chat_Id === id) Chat_loadChatError(id);
            return;
        }

        if (xmlHttp.status === 200) {
            if (Chat_Id === id) Chat_loadChatSuccess(xmlHttp.responseText, id);
            return;
        } else {
            if (Chat_Id === id) Chat_loadChatError(id);
        }


    } else {
        xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);

        xmlHttp.timeout = 10000;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    if (Chat_Id === id) Chat_loadChatSuccess(xmlHttp.responseText, id);
                    return;
                } else {
                    if (Chat_Id === id) Chat_loadChatError(id);
                }
            }
        };

        xmlHttp.send(null);
    }
}

function Chat_loadChatError(id) {
    Chat_loadingDataTry++;
    if (Chat_Id === id) {
        if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadChatRequest(id);
        else {
            Chat_loadChatId = window.setTimeout(function() {
                Chat_loadChatRequest(id);
            }, 2500);
        }
    }
}

function Chat_loadChatSuccess(responseText, id) {
    responseText = JSON.parse(responseText);
    var div, mmessage, null_next = (Chat_next === null);

    if (null_next) {
        div = '&nbsp;';
        div += '<span class="message">';
        div += STR_BR + STR_LOADING_CHAT + Main_values.Main_selectedChannelDisplayname + ' ' + Chat_title;
        div += '</span>';
        Chat_MessageVector(div, 0);
    }
    Chat_offset = 0;
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
        div += '<span class="nick" style="color: #' + defaultColors[(comments.commenter.display_name).charCodeAt(0) % defaultColorsLength] + ';">' + comments.commenter.display_name + '</span>&#58;&nbsp;';

        //Add mesage
        div += '<span class="message">';
        mmessage.fragments.forEach(function(fragments) {
            if (fragments.hasOwnProperty('emoticon')) div += '<img class="emoticon" src="https://static-cdn.jtvnw.net/emoticons/v1/' + fragments.emoticon.emoticon_id + '/1.0" srcset="https://static-cdn.jtvnw.net/emoticons/v1/' + fragments.emoticon.emoticon_id + '/2.0 2x, https://static-cdn.jtvnw.net/emoticons/v1/' + fragments.emoticon.emoticon_id + '/3.0 4x">';
            else div += twemoji.parse(fragments.text);
        });
        div += '</span>';
        if (null_next) Chat_MessageVector(div, comments.content_offset_seconds);
        else if (Chat_next !== undefined) Chat_MessageVectorNext(div, comments.content_offset_seconds);
    });
    if (null_next && Chat_Id === id) {
        Chat_Play(id);
        if (Chat_next !== undefined) Chat_loadChatNext(id); //if (Chat_next === undefined) chat has ended
    }
}

function Chat_MessageVector(message, time) {
    Chat_Messages.push({
        'time': time,
        'message': message
    });
}

function Chat_MessageVectorNext(message, time) {
    Chat_MessagesNext.push({
        'time': time,
        'message': message
    });
}

function Chat_Play(id) {
    if (!Chat_hasEnded && Chat_Id === id) {
        Chat_addlines = window.setInterval(function() {
            Main_Addline(id);
            Chat_div.scrollTop = Chat_div.scrollHeight;
        }, 1000);
    }
}

function Chat_Pause() {
    if (!Chat_hasEnded) {
        window.clearInterval(Chat_loadBadgesChannelId);
        window.clearInterval(Chat_addlines);
        window.clearInterval(Chat_loadChatId);
        window.clearInterval(Chat_loadChatNextId);
    }
}

function Chat_Clear() {
    // on exit cleanup the div
    Chat_Pause();
    Chat_Id = 0;
    Main_empty('chat_box');
    Chat_hasEnded = false;
    Chat_next = null;
    Chat_Messages = [];
    Chat_MessagesNext = [];
    Chat_Position = 0;
}

function Main_Addline(id) {
    var elem, i;
    if (Chat_Position < (Chat_Messages.length - 1)) {
        for (i = Chat_Position; i < Chat_Messages.length; i++, Chat_Position++) {
            if (Chat_Messages[i].time < (ChannelVod_vodOffset + (Android.gettime() / 1000))) {
                elem = document.createElement('div');
                elem.className = 'chat_line';
                elem.innerHTML = Chat_Messages[i].message;

                Chat_div.appendChild(elem);
            } else {
                break;
            }
        }
    } else {
        Chat_Pause();
        if (Chat_next !== undefined) {
            Chat_Messages = Chat_MessagesNext.slice();
            Chat_Position = 0;
            Chat_Play(id);
            Chat_MessagesNext = [];

            if (Chat_Id === id) Chat_loadChatNext(id);

            //delete old lines out of view
            var linesToDelete = document.getElementsByClassName("chat_line");
            if ((linesToDelete.length - 100) > 0) {
                for (i = 0; i < (linesToDelete.length - 100); i++) {
                    linesToDelete[0].parentNode.removeChild(linesToDelete[0]);
                }
            }
            Chat_div.scrollTop = Chat_div.scrollHeight;
        } else { //Chat has eneded
            var div = '&nbsp;';
            div += '<span class="message">';
            div += STR_BR + STR_BR + STR_CHAT_END + STR_BR + STR_BR;
            div += '</span>';

            elem = document.createElement('div');
            elem.className = 'chat_line';
            elem.innerHTML = div;

            Chat_div.appendChild(elem);

            Chat_hasEnded = true;
            Chat_div.scrollTop = Chat_div.scrollHeight;

            //keep refreshing in case user changes chat size
            window.clearInterval(Chat_addlines);
            Chat_addlines = window.setInterval(function() {
                Chat_div.scrollTop = Chat_div.scrollHeight;
            }, 250);
        }
    }
}

function Chat_loadChatNext(id) {
    Chat_loadingDataTry = 0;
    if (!Chat_hasEnded && Chat_Id === id) Chat_loadChatNextRequest(id);
}

function Chat_loadChatNextRequest(id) {
    var theUrl = 'https://api.twitch.tv/v5/videos/' + Main_values.ChannelVod_vodId +
        '/comments?client_id=' + Main_clientId + (Chat_next !== null ? '&cursor=' + Chat_next : '');
    var xmlHttp;
    if (Main_Android) {

        xmlHttp = Android.mreadUrl(theUrl, 10000, 0, null);

        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            if (!Chat_hasEnded && Chat_Id === id) Chat_loadChatNextError(id);
            return;
        }

        if (xmlHttp.status === 200) {
            if (!Chat_hasEnded && Chat_Id === id) Chat_loadChatSuccess(xmlHttp.responseText, id);
            return;
        } else {
            if (!Chat_hasEnded && Chat_Id === id) Chat_loadChatNextError(id);
        }

    } else {
        xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);

        xmlHttp.timeout = 10000;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    if (!Chat_hasEnded && Chat_Id === id) Chat_loadChatSuccess(xmlHttp.responseText, id);
                    return;
                } else {
                    if (!Chat_hasEnded && Chat_Id === id) Chat_loadChatNextError(id);
                }
            }
        };

        xmlHttp.send(null);
    }
}

function Chat_loadChatNextError(id) {
    Chat_loadingDataTry++;
    if (Chat_Id === id) {
        if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadChatNextRequest(id);
        else {
            Chat_loadChatNextId = window.setTimeout(function() {
                Chat_loadChatNextRequest(id);
            }, 2500);
        }
    }
}

function Chat_NoVod() {
    Chat_Id = 0;
    Chat_SingleLine(STR_NO_BROADCAST_WARNING + STR_BR + STR_NO_CHAT);
}

function Chat_Disable() {
    Chat_Clear();
    Main_HideElement('chat_frame');
    Main_ShowElement('chat_box');
    Chat_SingleLine(STR_CHAT_DISABLE);
}

function Chat_SingleLine(Line) {
    var div = '&nbsp;';
    div += '<span class="message">';
    div += STR_BR + STR_BR + STR_BR + STR_BR + STR_BR + STR_BR + STR_BR + STR_BR + STR_BR + STR_BR;
    div += Line;
    div += '</span>';

    var elem = document.createElement('div');
    elem.className = 'chat_line';
    elem.innerHTML = div;

    Chat_div.appendChild(elem);
}