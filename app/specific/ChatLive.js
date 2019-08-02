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
var extraEmotesDone = {
    bbtv: {},
    ffz: {}
};
var extraEmotes = {};

var ChatLive_selectedChannel_id;
var ChatLive_selectedChannel;

//Variable initialization end

function ChatLive_Init() { // jshint ignore:line
    ChatLive_Clear();
    if (Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }
    if (!Chat_LoadGlobal) Chat_loadBadgesGlobal();

    ChatLive_loaded = false;

    Main_ready(function() {
        ChatLive_Id = (new Date()).getTime();
        ChatLive_selectedChannel_id = Main_values.Play_selectedChannel_id;
        ChatLive_selectedChannel = Main_values.Play_selectedChannel;
        ChatLive_loadBadgesChannel(ChatLive_Id, ChatLive_loadBadgesChannelSuccess);
    });

}

function ChatLive_loadBadgesChannel(id, callbackSucess) {
    ChatLive_loadingDataTry = 0;
    ChatLive_loadBadgesChannelRequest(id, callbackSucess);
}

function ChatLive_loadBadgesChannelRequest(id, callbackSucess) {
    var theUrl = 'https://badges.twitch.tv/v1/badges/channels/' + ChatLive_selectedChannel_id + '/display';
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                callbackSucess(xmlHttp.responseText, id);
                return;
            } else {
                ChatLive_loadBadgesChannelError(id, callbackSucess);
            }
        }
    };

    xmlHttp.send(null);
}

function ChatLive_loadBadgesChannelError(id, callbackSucess) {
    ChatLive_loadingDataTry++;
    if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadBadgesChannelRequest(id, callbackSucess);
    else {
        if (ChatLive_Id === id) ChatLive_loadBadgesChannelId = window.setTimeout(function() {
            ChatLive_loadBadgesChannelRequest(id, callbackSucess);
        }, 500);
    }
}

function ChatLive_loadBadgesChannelSuccess(responseText, id) {
    Chat_loadBadgesTransform(responseText);

    ChatLive_loadEmotesChannel();
    ChatLive_loadEmotesChannelffz();
    if (ChatLive_Id === id) ChatLive_loadChat();
}

function ChatLive_loadEmotesChannel() {
    if (!extraEmotesDone.bbtv[ChatLive_selectedChannel_id]) {
        ChatLive_loadingDataTry = 0;
        ChatLive_loadEmotesChannelRequest();
    }
}

function ChatLive_loadEmotesChannelRequest() {
    var theUrl = 'https://api.betterttv.net/2/channels/' + encodeURIComponent(ChatLive_selectedChannel);
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                ChatLive_loadEmotesChannelSuccess(xmlHttp.responseText);
            } else if (xmlHttp.status === 404) { //not supported by this channel
                extraEmotesDone.bbtv[ChatLive_selectedChannel_id] = 1;
            } else {
                ChatLive_loadEmotesChannelError();
            }
        }
    };

    xmlHttp.send(null);
}

function ChatLive_loadEmotesChannelError() {
    ChatLive_loadingDataTry++;
    if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadEmotesChannelRequest();
}

function ChatLive_loadEmotesChannelSuccess(data) {
    ChatLive_loadEmotesbbtv(JSON.parse(data));
    extraEmotesDone.bbtv[ChatLive_selectedChannel_id] = 1;
}

function ChatLive_loadEmotesChannelffz() {
    if (!extraEmotesDone.ffz[ChatLive_selectedChannel_id]) {
        ChatLive_loadingDataTry = 0;
        ChatLive_loadEmotesChannelffzRequest();
    }
}

function ChatLive_loadEmotesChannelffzRequest() {
    var theUrl = 'https://api.frankerfacez.com/v1/room/' + encodeURIComponent(ChatLive_selectedChannel);
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                ChatLive_loadEmotesChannelffzSuccess(xmlHttp.responseText);
            } else if (xmlHttp.status === 404) { //not supported by this channel
                extraEmotesDone.ffz[ChatLive_selectedChannel_id] = 1;
            } else {
                ChatLive_loadEmotesChannelffzError();
            }
        }
    };

    xmlHttp.send(null);
}

function ChatLive_loadEmotesChannelffzError() {
    ChatLive_loadingDataTry++;
    if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadEmotesChannelffzRequest();
}

function ChatLive_loadEmotesChannelffzSuccess(data) {
    ChatLive_loadEmotesffz(JSON.parse(data));
    extraEmotesDone.ffz[ChatLive_selectedChannel_id] = 1;
}

function ChatLive_loadEmotesbbtv(data) {
    data.emotes.forEach(function(emote) {
        extraEmotes[emote.code] = {
            code: emote.code,
            id: emote.id,
            '3x': 'https:' + data.urlTemplate.replace('{{id}}', emote.id).replace('{{image}}', '3x')
        };
    });
}

function ChatLive_loadEmotesffz(data) {
    Object.keys(data.sets).forEach(function(set) {
        set = data.sets[set];
        if (set.emoticons || Array.isArray(set.emoticons)) {

            set.emoticons.forEach(function(emoticon) {

                if (!emoticon.name || !emoticon.id) return;
                if (typeof emoticon.name !== 'string' || typeof emoticon.id !== 'number') return;

                if (extraEmotes[emoticon.name]) return;

                if (!emoticon.urls || typeof emoticon.urls !== 'object') return;

                if (typeof emoticon.urls[1] !== 'string') return;
                if (emoticon.urls[2] && typeof emoticon.urls[2] !== 'string') return;
                extraEmotes[emoticon.name] = {
                    code: emoticon.name,
                    id: emoticon.id,
                    '3x': 'https:' + (emoticon.urls[4] || (emoticon.urls[2] || emoticon.urls[1].replace(/1$/, '2')))
                };

            });
        }
    });
}

function ChatLive_loadChat() {
    ChatLive_CheckClear();
    ChatLive_loadChatRequest();
}

function ChatLive_loadChatRequest() {

    ChatLive_socket = new ReconnectingWebSocket('ws://irc-ws.chat.twitch.tv', 'irc', {
        reconnectInterval: 3000
    });

    ChatLive_socket.onopen = function() {
        ChatLive_socket.send('PASS blah\r\n');
        ChatLive_socket.send('NICK justinfan12345\r\n');
        ChatLive_socket.send('CAP REQ :twitch.tv/commands twitch.tv/tags\r\n');
        ChatLive_socket.send('JOIN #' + ChatLive_selectedChannel + '\r\n');
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

                if (Play_ChatDelayPosition) {
                    var stringSec = STR_SECOND;
                    if (Play_controls[Play_controlsChatDelay].defaultValue > 1) stringSec = STR_SECONDS;

                    div += '&nbsp;<span class="message">' + STR_BR + STR_BR + STR_CHAT_DELAY + ' ' +
                        Play_controls[Play_controlsChatDelay].values[Play_controls[Play_controlsChatDelay].defaultValue] +
                        stringSec + '</span>';
                }

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

    div += '<span class="message">' + ChatLive_extraMessageTokenize(emoticonize(mmessage, emotes)) + '</span>';

    if (!Play_ChatDelayPosition) ChatLive_LineAdd(div);
    else {
        var id = ChatLive_Id;
        window.setTimeout(function() {
            if (id === ChatLive_Id) ChatLive_LineAdd(div);
        }, (Play_controls[Play_controlsChatDelay].values[Play_controls[Play_controlsChatDelay].defaultValue] * 1000));
    }
}

function ChatLive_extraMessageTokenize(tokenizedMessage) {

    for (var i = 0; i < tokenizedMessage.length; i++) {
        if (typeof tokenizedMessage[i] === 'string') {
            tokenizedMessage[i] = extraMessageTokenize(tokenizedMessage[i]);
        } else {
            tokenizedMessage[i] = tokenizedMessage[i][0];
        }
    }

    return twemoji.parse(tokenizedMessage.join(' '), true, true);
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