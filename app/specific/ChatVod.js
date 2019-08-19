//Variable initialization
var Chat_LoadGlobal = false;
var Chat_loadingDataTry = 0;
var Chat_Messages = [];
var Chat_MessagesNext = [];
var Chat_loadingDataTryMax = 10;
var Chat_addlinesId;
var Chat_next = null;
var Chat_loadChatId;
var Chat_loadChatNextId;
var Chat_offset = 0;
var Chat_title = '';
var defaultColors = ["fe2424", "fc5a24", "ff9020", "fEc723", "ffff1d", "bfff00", "c3ff12", "56fe1d", "1eff1e", "16ff51", "00ff80", "00ffbf", "00ffff", "1dc6ff", "158aff", "3367ff", "ff4dff", "ff4ad2", "ff62b1", "ff4272"];
var defaultColorsLength = defaultColors.length;
var Chat_div = [];
var Chat_Position = 0;
var Chat_hasEnded = false;
var Chat_Id = 0;
var Chat_CleanMax = 60;
var Chat_loadBadgesChannelId;
//Variable initialization end

function Chat_Preinit() {
    Chat_div[0] = document.getElementById('chat_box');
    Chat_div[1] = document.getElementById('chat_box2');
    ChatLive_LineAddCounter[0] = 0;
    ChatLive_LineAddCounter[1] = 0;
    Chat_loadBadgesGlobal();
}

function Chat_Init() {
    Chat_Clear();
    if (!Main_IsNotBrowser || Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }
    if (!Chat_LoadGlobal) Chat_loadBadgesGlobal();

    Main_ready(function() {
        Chat_Id = (new Date()).getTime();
        ChatLive_selectedChannel_id[0] = Main_values.Main_selectedChannel_id;
        ChatLive_selectedChannel[0] = Main_values.Main_selectedChannel;
        ChatLive_loadBadgesChannel(Chat_Id, Chat_loadBadgesChannelSuccess, 0);
    });
}

function Chat_loadBadgesGlobal() {
    extraEmotes = {};
    Chat_loadingDataTry = 0;
    Chat_LoadGlobal = false;
    Chat_loadBadgesGlobalRequest();
}

function Chat_loadBadgesGlobalRequest() {
    var theUrl = 'https://badges.twitch.tv/v1/badges/global/display';
    BasexmlHttpGet(theUrl, 10000, 0, null, Chat_loadBadgesGlobalSuccess, Chat_loadBadgesGlobalError, false);
}

function Chat_loadBadgesGlobalError() {
    Chat_loadingDataTry++;
    if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadBadgesGlobalRequest();
    else Chat_LoadGlobal = false;
}

function Chat_loadBadgesGlobalSuccess(responseText) {
    transformBadges(JSON.parse(responseText).badge_sets).forEach(function(badge) {
        badge.versions.forEach(function(version) {
            tagCSS(badge.type, version.type, version.image_url_4x, null);
        });
    });

    Chat_loadEmotes();
}

function Chat_loadEmotes() {
    Chat_loadingDataTry = 0;
    Chat_loadEmotesRequest();
}

function Chat_loadEmotesRequest() {
    var theUrl = 'https://api.betterttv.net/2/emotes';
    BasexmlHttpGet(theUrl, 10000, 0, null, Chat_loadEmotesSuccess, Chat_loadEmotesError, false);
}

function Chat_loadEmotesError() {
    Chat_loadingDataTry++;
    if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadEmotesRequest();
    else Chat_LoadGlobal = false;
}

function Chat_loadEmotesSuccess(data) {
    ChatLive_loadEmotesbbtv(JSON.parse(data));
    Chat_loadEmotesffz();
}

function Chat_loadEmotesffz() {
    Chat_loadingDataTry = 0;
    Chat_loadEmotesRequestffz();
}

function Chat_loadEmotesRequestffz() {
    var theUrl = 'https://api.frankerfacez.com/v1/set/global';
    BasexmlHttpGet(theUrl, 10000, 0, null, Chat_loadEmotesSuccessffz, Chat_loadEmotesErrorffz, false);
}

function Chat_loadEmotesErrorffz() {
    Chat_loadingDataTry++;
    if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadEmotesRequestffz();
    else Chat_LoadGlobal = false;
}

function Chat_loadEmotesSuccessffz(data) {
    ChatLive_loadEmotesffz(JSON.parse(data));

    Chat_LoadGlobal = true;
}

function Chat_loadBadgesTransform(responseText, chat_number) {
    transformBadges(JSON.parse(responseText).badge_sets).forEach(function(badge) {
        badge.versions.forEach(function(version) {
            tagCSS(badge.type + chat_number, version.type, version.image_url_4x, Chat_div[chat_number]);
        });
    });
}

function Chat_loadBadgesChannelSuccess(responseText, id) {
    Chat_loadBadgesTransform(responseText, 0);

    ChatLive_loadEmotesChannel(0);
    ChatLive_loadEmotesChannelffz(0);
    if (Chat_Id === id) Chat_loadChat(id);
}

function Chat_loadChat(id) {
    Chat_loadingDataTry = 0;
    if (Chat_Id === id) Chat_loadChatRequest(id);
}

function Chat_loadChatRequest(id) {
    var theUrl = 'https://api.twitch.tv/v5/videos/' + Main_values.ChannelVod_vodId +
        '/comments?client_id=' + Main_clientId + (Chat_offset ? '&content_offset_seconds=' + parseInt(Chat_offset) : '');
    var xmlHttp = new XMLHttpRequest();

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
                div += '<span class="' + badges._id + (badges._id.indexOf('subscriber') !== -1 ? "0-" : "-") + badges.version + ' tag"></span>';
            });
        }

        //Add nick
        div += '<span class="nick" style="color: #' + defaultColors[(comments.commenter.display_name).charCodeAt(0) % defaultColorsLength] + ';">' + comments.commenter.display_name + '</span>&#58;&nbsp;';

        //Add mesage
        div += '<span class="message">';
        mmessage.fragments.forEach(function(fragments) {
            if (fragments.hasOwnProperty('emoticon')) div += '<img class="emoticon" alt="" src="https://static-cdn.jtvnw.net/emoticons/v1/' + fragments.emoticon.emoticon_id + '/2.0">';
            else div += ChatLive_extraMessageTokenize([fragments.text]);
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
    if (!Chat_hasEnded && Chat_Id === id && !Main_values.Play_ChatForceDisable) {
        Chat_addlinesId = window.setInterval(function() {
            Main_Addline(id);
            Chat_div[0].scrollTop = Chat_div[0].scrollHeight;
        }, 1000);
    }
}

function Chat_Pause() {
    if (!Chat_hasEnded) {
        window.clearTimeout(Chat_loadBadgesChannelId);
        window.clearTimeout(Chat_loadChatId);
        window.clearTimeout(Chat_loadChatNextId);
        window.clearInterval(Chat_addlinesId);
    }
}

function Chat_Clear() {
    // on exit cleanup the div
    Chat_Pause();
    Chat_Id = 0;
    Main_empty('chat_box');
    Main_empty('chat_box2');
    Chat_hasEnded = false;
    Chat_next = null;
    Chat_Messages = [];
    Chat_MessagesNext = [];
    Chat_Position = 0;
}

function Main_Addline(id) {
    var elem;
    if (Chat_Position < (Chat_Messages.length - 1)) {
        for (var i = Chat_Position; i < Chat_Messages.length; i++, Chat_Position++) {
            if (Chat_Messages[i].time < (ChannelVod_vodOffset + (Android.gettime() / 1000))) {
                elem = document.createElement('div');
                elem.className = 'chat_line';
                elem.innerHTML = Chat_Messages[i].message;

                Chat_div[0].appendChild(elem);
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
            Chat_Clean(0);
        } else { //Chat has eneded
            var div = '&nbsp;';
            div += '<span class="message">';
            div += STR_BR + STR_BR + STR_CHAT_END + STR_BR + STR_BR;
            div += '</span>';

            elem = document.createElement('div');
            elem.className = 'chat_line';
            elem.innerHTML = div;

            Chat_div[0].appendChild(elem);

            Chat_hasEnded = true;
            Chat_div[0].scrollTop = Chat_div[0].scrollHeight;

            //keep refreshing in case user changes chat size
            window.clearInterval(Chat_addlinesId);
            Chat_addlinesId = window.setInterval(function() {
                Chat_div[0].scrollTop = Chat_div[0].scrollHeight;
            }, 1000);
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
    var xmlHttp = new XMLHttpRequest();

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
    Chat_Clear();
    Chat_SingleLine(STR_NO_BROADCAST_WARNING + STR_BR + STR_NO_CHAT);
}

function Chat_Disable() {
    Chat_Clear();
    Chat_SingleLine(STR_CHAT_DISABLE);
    Main_ready(function() {
        Chat_div[0].scrollTop = Chat_div[0].scrollHeight;
        Chat_div[1].scrollTop = Chat_div[1].scrollHeight;
    });
}

function Chat_SingleLine(Line) {
    var div = '&nbsp;';
    div += '<span class="message">';
    div += STR_BR + STR_BR + STR_BR + STR_BR + STR_BR + STR_BR;
    div += Line;
    div += '</span>';

    var elem = document.createElement('div');
    elem.className = 'chat_line';
    elem.innerHTML = div;

    Chat_div[0].appendChild(elem);
    Chat_div[1].appendChild(elem.cloneNode(true));
}

function Chat_Clean(chat_number) {
    //delete old lines out of view
    var linesToDelete = Chat_div[chat_number].getElementsByClassName("chat_line");
    if ((linesToDelete.length - Chat_CleanMax) > 0) {
        for (var i = 0; i < (linesToDelete.length - Chat_CleanMax); i++) {
            Chat_div[chat_number].removeChild(linesToDelete[0]);
        }
    }
    ChatLive_ChatFixPosition(chat_number);
}