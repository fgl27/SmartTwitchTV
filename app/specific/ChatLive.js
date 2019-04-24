//Variable initialization
var ChatLive_loadingDataTry = 0;
var ChatLive_loadingDataTryMax = 10;
var ChatLive_loadEmotesChannelId;
var ChatLive_hasEnded = false;
var ChatLive_Id = 0;
var ChatLive_loadBadgesChannelId;
var ChatLive_socket = null;
var ChatLive_loaded = false;
var ChatLive_CheckId;
var ChatLive_FixId;
var ChatLive_LineAddCounter = 0;
var extraEmotesDone = {};
var extraEmotes = {};
//Variable initialization end

function ChatLive_Init() { // jshint ignore:line
    ChatLive_Clear();
    if (!Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }
    if (!Chat_LoadGlobal) Chat_loadBadgesGlobal();

    ChatLive_loaded = false;

    Main_ready(function() {
        ChatLive_Id = (new Date()).getTime();
        ChatLive_loadBadgesChannel(ChatLive_Id);
    });

}

function ChatLive_loadBadgesChannel(id) {
    ChatLive_loadingDataTry = 0;
    ChatLive_loadBadgesChannelRequest(id);
}

function ChatLive_loadBadgesChannelRequest(id) {
    var theUrl = 'https://badges.twitch.tv/v1/badges/channels/' + Main_values.Play_selectedChannel_id + '/display';
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                if (ChatLive_Id === id) ChatLive_loadBadgesChannelSuccess(xmlHttp.responseText, id);
                return;
            } else {
                if (ChatLive_Id === id) ChatLive_loadBadgesChannelError(id);
            }
        }
    };

    xmlHttp.send(null);
}

function ChatLive_loadBadgesChannelError(id) {
    ChatLive_loadingDataTry++;
    if (ChatLive_Id === id) {
        if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadBadgesChannelRequest(id);
        else {
            ChatLive_loadBadgesChannelId = window.setTimeout(function() {
                ChatLive_loadBadgesChannelRequest(id);
            }, 1000);
        }
    }
}

function ChatLive_loadBadgesChannelSuccess(responseText, id) {
    transformBadges(JSON.parse(responseText).badge_sets).forEach(function(badge) {
        badge.versions.forEach(function(version) {
            tagCSS(badge.type, version.type, version.image_url_4x, Chat_div);
        });
    });

    if (!extraEmotesDone[Main_values.Play_selectedChannel_id]) ChatLive_loadEmotesChannel(id);
    else if (ChatLive_Id === id) ChatLive_loadChat();
}

function ChatLive_loadEmotesChannel(id) {
    ChatLive_loadingDataTry = 0;
    ChatLive_loadEmotesChannelRequest(id);
}

function ChatLive_loadEmotesChannelRequest(id) {
    var theUrl = 'https://api.betterttv.net/2/channels/' + encodeURIComponent(Main_values.Play_selectedChannel);
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                if (ChatLive_Id === id) ChatLive_loadEmotesChannelSuccess(xmlHttp.responseText, id);
            } else if (xmlHttp.status === 404) {
                extraEmotesDone[Main_values.Play_selectedChannel_id] = 1;
                if (ChatLive_Id === id) ChatLive_loadChat();
            } else {
                if (ChatLive_Id === id) ChatLive_loadEmotesChannelError(id);
            }
        }
    };

    xmlHttp.send(null);
}

function ChatLive_loadEmotesChannelError(id) {
    ChatLive_loadingDataTry++;
    if (ChatLive_Id === id) {
        if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadEmotesChannelRequest(id);
        else if (ChatLive_Id === id) ChatLive_loadChat();
    }
}

function ChatLive_loadEmotesChannelSuccess(data, id) {
    data = JSON.parse(data);
    data.emotes.forEach(function(emote) {
        extraEmotes[emote.code] = {
            restrictions: emote.restrictions,
            code: emote.code,
            source: 'bttv',
            id: emote.id,
            '1x': 'https:' + data.urlTemplate.replace('{{id}}', emote.id).replace('{{image}}', '1x'),
            '2x': 'https:' + data.urlTemplate.replace('{{id}}', emote.id).replace('{{image}}', '2x'),
            '3x': 'https:' + data.urlTemplate.replace('{{id}}', emote.id).replace('{{image}}', '3x')
        };
    });

    extraEmotesDone[Main_values.Play_selectedChannel_id] = 1;
    if (ChatLive_Id === id) ChatLive_loadChat();
}

function ChatLive_loadChat() {
    ChatLive_CheckClear();
    ChatLive_loadChatRequest();
}

function ChatLive_loadChatRequest() {

    ChatLive_socket = new ReconnectingWebSocket('wss://irc-ws.chat.twitch.tv', 'irc', {
        reconnectInterval: 3000
    });

    ChatLive_socket.onopen = function() {
        ChatLive_socket.send('PASS blah\r\n');
        ChatLive_socket.send('NICK justinfan12345\r\n');
        ChatLive_socket.send('CAP REQ :twitch.tv/commands twitch.tv/tags\r\n');
        ChatLive_socket.send('JOIN #' + Main_values.Play_selectedChannel + '\r\n');
    };

    ChatLive_socket.onclose = function() {
        ChatLive_hasEnded = true;
    };

    ChatLive_socket.onmessage = function(data) {

        var message = window.parseIRC(data.data.trim());

        if (!message.command) return;

        switch (message.command) {
            case "PING":
                ChatLive_socket.send('PONG ' + message.params[0]);
                break;
            case "JOIN":
                ChatLive_loaded = true;
                var div = '&nbsp;<span class="message">' + STR_BR + STR_LOADING_CHAT +
                    Main_values.Play_selectedChannelDisplayname + ' ' + STR_LIVE + '</span>';
                ChatLive_LineAdd(div);
                break;
            case "PRIVMSG":
                ChatLive_loadChatSuccess(message);
                break;
            default:
                break;
        }
    };

    ChatLive_CheckId = window.setTimeout(ChatLive_Check, 5000);
}

function ChatLive_Check() {
    if (!ChatLive_loaded) {
        ChatLive_socket.close(1000);
        ChatLive_loadChat();
    } else ChatLive_FixId = window.setInterval(ChatLive_ChatFixPosition, 1000);
}

function ChatLive_CheckClear() {
    window.clearTimeout(ChatLive_CheckId);
}

function ChatLive_loadChatSuccess(message) {
    var div = '',
        tags = message.tags;

    //Add badges
    if (tags.hasOwnProperty('badges')) {
        if (typeof tags.badges === 'string') {
            tags.badges.split(',').forEach(function(badge) {
                badge = badge.split('/');

                div += '<span class="' + badge[0] + '-' + badge[1] + ' tag"></span>';
            });
        }
    }

    //Add nick
    if (tags.hasOwnProperty('display-name')) {
        var nick = tags['display-name'];
        if (typeof nick === 'string')
            div += '<span class="nick" style="color: #' + defaultColors[(nick).charCodeAt(0) % defaultColorsLength] + ';">' + nick + '</span>&#58;&nbsp;';
    }

    //Add message
    var mmessage = message.params[1];
    mmessage = mmessage.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    if (/^\x01ACTION.*\x01$/.test(mmessage))
        mmessage = mmessage.replace(/^\x01ACTION/, '').replace(/\x01$/, '').trim();

    var emotes = {};

    if (tags.hasOwnProperty('emotes')) {
        if (typeof tags.emotes === 'string') {

            tags.emotes = tags.emotes.split('/');

            tags.emotes.forEach(function(emote) {
                emote = emote.split(':');

                if (!emotes[emote[0]]) emotes[emote[0]] = [];

                var replacements = emote[1].split(',');
                replacements.forEach(function(replacement) {
                    replacement = replacement.split('-');

                    emotes[emote[0]].push([parseInt(replacement[0]), parseInt(replacement[1])]);
                });
            });
        }
    }

    var tokenizedMessage = emoticonize(mmessage, emotes);

    for (var i = 0; i < tokenizedMessage.length; i++) {
        if (typeof tokenizedMessage[i] === 'string') {
            tokenizedMessage[i] = extraMessageTokenize(tags, tokenizedMessage[i]);
        } else {
            tokenizedMessage[i] = tokenizedMessage[i][0];
        }
    }

    message = tokenizedMessage.join(' ');
    message = twemoji.parse(message, true);

    div += '<span class="message">' + message + '</span>';

    ChatLive_LineAdd(div);
}

function ChatLive_LineAdd(message) {
    var elem = document.createElement('div');
    elem.className = 'chat_line';
    elem.innerHTML = message;

    Chat_div.appendChild(elem);
    ChatLive_ChatFixPosition();
    ChatLive_LineAddCounter++;
    if (ChatLive_LineAddCounter > 100) {
        ChatLive_LineAddCounter = 0;
        Chat_Clean();
    }
}

function ChatLive_ChatFixPosition() {
    Chat_div.scrollTop = Chat_div.scrollHeight;
}

function ChatLive_ClearIds() {
    ChatLive_CheckClear();
    window.clearTimeout(ChatLive_loadBadgesChannelId);
    window.clearTimeout(ChatLive_loadEmotesChannelId);
    window.clearInterval(ChatLive_FixId);
}

function ChatLive_Clear() {
    ChatLive_ClearIds();
    if (ChatLive_socket) ChatLive_socket.close(1000);
    ChatLive_Id = 0;
    Main_empty('chat_box');
    ChatLive_hasEnded = false;
    ChatLive_loaded = false;
}