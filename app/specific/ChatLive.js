//Variable initialization
var ChatLive_loadingDataTry = 0;
var ChatLive_loadingDataTryMax = 10;
var ChatLive_Id = [];
var ChatLive_loadBadgesChannelId;
var ChatLive_socket = [];
var ChatLive_loaded = [];
var ChatLive_CheckId = [];
var ChatLive_LineAddCounter = [];
var extraEmotesDone = {
    bbtv: {},
    ffz: {},
    cheers: {}
};
var extraEmotes = {};
var cheers = {};

var ChatLive_selectedChannel_id = [];
var ChatLive_selectedChannel = [];

//Variable initialization end

function ChatLive_Init(chat_number) {
    ChatLive_Clear(chat_number);
    if (Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }
    if (!Chat_LoadGlobal) Chat_loadBadgesGlobal();

    ChatLive_loaded[chat_number] = false;


    ChatLive_Id[chat_number] = (new Date()).getTime();
    ChatLive_selectedChannel_id[chat_number] = !chat_number ? Main_values.Play_selectedChannel_id : PlayExtra_selectedChannel_id;
    ChatLive_selectedChannel[chat_number] = !chat_number ? Main_values.Play_selectedChannel : PlayExtra_selectedChannel;
    ChatLive_loadBadgesChannel(ChatLive_Id[chat_number], ChatLive_loadBadgesChannelSuccess, chat_number);

}

function ChatLive_loadBadgesChannel(id, callbackSucess, chat_number) {
    ChatLive_loadingDataTry = 0;
    ChatLive_loadBadgesChannelRequest(id, callbackSucess, chat_number);
}

function ChatLive_loadBadgesChannelRequest(id, callbackSucess, chat_number) {
    var theUrl = 'https://badges.twitch.tv/v1/badges/channels/' + ChatLive_selectedChannel_id[chat_number] + '/display';
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                callbackSucess(xmlHttp.responseText, id, chat_number);
                return;
            } else {
                ChatLive_loadBadgesChannelError(id, callbackSucess, chat_number);
            }
        }
    };

    xmlHttp.send(null);
}

function ChatLive_loadBadgesChannelError(id, callbackSucess, chat_number) {
    ChatLive_loadingDataTry++;
    if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadBadgesChannelRequest(id, callbackSucess, chat_number);
    else {
        if (ChatLive_Id[chat_number] === id) {
            window.clearTimeout(ChatLive_loadBadgesChannelId);
            ChatLive_loadBadgesChannelId = window.setTimeout(function() {
                ChatLive_loadBadgesChannelRequest(id, callbackSucess, chat_number);
            }, 500);
        }
    }
}

function ChatLive_loadBadgesChannelSuccess(responseText, id, chat_number) {
    Chat_loadBadgesTransform(responseText, chat_number);

    ChatLive_loadEmotesChannel(chat_number);
    ChatLive_loadCheersChannel(chat_number);
    ChatLive_loadEmotesChannelffz(chat_number);
    if (ChatLive_Id[chat_number] === id) ChatLive_loadChat(chat_number);
}

function ChatLive_loadEmotesChannel(chat_number) {
    if (!extraEmotesDone.bbtv[ChatLive_selectedChannel_id[chat_number]]) {
        ChatLive_loadingDataTry = 0;
        ChatLive_loadEmotesChannelRequest(chat_number);
    }
}

function ChatLive_loadEmotesChannelRequest(chat_number) {
    var theUrl = 'https://api.betterttv.net/2/channels/' + encodeURIComponent(ChatLive_selectedChannel[chat_number]);
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                ChatLive_loadEmotesChannelSuccess(xmlHttp.responseText, chat_number);
            } else if (xmlHttp.status === 404) { //not supported by this channel
                extraEmotesDone.bbtv[ChatLive_selectedChannel_id[chat_number]] = 1;
            } else {
                ChatLive_loadEmotesChannelError(chat_number);
            }
        }
    };

    xmlHttp.send(null);
}

function ChatLive_loadEmotesChannelError(chat_number) {
    ChatLive_loadingDataTry++;
    if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadEmotesChannelRequest(chat_number);
}

function ChatLive_loadEmotesChannelSuccess(data, chat_number) {
    ChatLive_loadEmotesbbtv(JSON.parse(data));
    extraEmotesDone.bbtv[ChatLive_selectedChannel_id[chat_number]] = 1;
}

function ChatLive_loadCheersChannel(chat_number) {
    if (!extraEmotesDone.cheers[ChatLive_selectedChannel_id[chat_number]]) {
        ChatLive_loadingDataTry = 0;
        ChatLive_loadCheersChannelRequest(chat_number);
    }
}

function ChatLive_loadCheersChannelRequest(chat_number) {
    var theUrl = 'https://api.twitch.tv/v5/bits/actions?channel_id=' + encodeURIComponent(ChatLive_selectedChannel_id[chat_number]);
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};
    xmlHttp.setRequestHeader(Main_Headers[0][0], Main_Headers[0][1]);

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                ChatLive_loadCheersChannelSuccess(JSON.parse(xmlHttp.responseText), chat_number);
            } else {
                ChatLive_loadCheersChannelError(chat_number);
            }
        }
    };

    xmlHttp.send(null);
}

function ChatLive_loadCheersChannelError(chat_number) {
    ChatLive_loadingDataTry++;
    if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadCheersChannelRequest(chat_number);
}

function ChatLive_loadCheersChannelSuccess(data, chat_number) {
    cheers[ChatLive_selectedChannel_id[chat_number]] = {};
    data.actions.forEach(function(action) {
        cheers[ChatLive_selectedChannel_id[chat_number]][action.prefix] = {};
        action.tiers.forEach(function(tier) {
            cheers[ChatLive_selectedChannel_id[chat_number]][action.prefix][tier.min_bits] = tier.images.light.animated['4'];
        });
    });

    extraEmotesDone.cheers[ChatLive_selectedChannel_id[chat_number]] = 1;
}

function ChatLive_loadEmotesChannelffz(chat_number) {
    if (!extraEmotesDone.ffz[ChatLive_selectedChannel_id[chat_number]]) {
        ChatLive_loadingDataTry = 0;
        ChatLive_loadEmotesChannelffzRequest(chat_number);
    }
}

function ChatLive_loadEmotesChannelffzRequest(chat_number) {
    var theUrl = 'https://api.frankerfacez.com/v1/room/' + encodeURIComponent(ChatLive_selectedChannel[chat_number]);
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                ChatLive_loadEmotesChannelffzSuccess(xmlHttp.responseText, chat_number);
            } else if (xmlHttp.status === 404) { //not supported by this channel
                extraEmotesDone.ffz[ChatLive_selectedChannel_id[chat_number]] = 1;
            } else {
                ChatLive_loadEmotesChannelffzError(chat_number);
            }
        }
    };

    xmlHttp.send(null);
}

function ChatLive_loadEmotesChannelffzError(chat_number) {
    ChatLive_loadingDataTry++;
    if (ChatLive_loadingDataTry < ChatLive_loadingDataTryMax) ChatLive_loadEmotesChannelffzRequest(chat_number);
}

function ChatLive_loadEmotesChannelffzSuccess(data, chat_number) {
    ChatLive_loadEmotesffz(JSON.parse(data));
    extraEmotesDone.ffz[ChatLive_selectedChannel_id[chat_number]] = 1;
}

function ChatLive_loadEmotesbbtv(data) {
    data.emotes.forEach(function(emote) {
        extraEmotes[emote.code] = {
            code: emote.code,
            id: emote.id,
            '4x': 'https:' + data.urlTemplate.replace('{{id}}', emote.id).replace('{{image}}', '3x')
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
                    '4x': 'https:' + (emoticon.urls[4] || emoticon.urls[2] || emoticon.urls[1])
                };

            });
        }
    });
}

function ChatLive_loadChat(chat_number) {
    ChatLive_CheckClear(chat_number);
    ChatLive_loadChatRequest(chat_number);
}

function ChatLive_loadChatRequest(chat_number) {
    ChatLive_socket[chat_number] = new ReconnectingWebSocket('wss://irc-ws.chat.twitch.tv', 'irc', {
        reconnectInterval: 3000
    });

    ChatLive_socket[chat_number].onopen = function() {
        ChatLive_socket[chat_number].send('PASS blah\r\n');
        ChatLive_socket[chat_number].send('NICK justinfan12345\r\n');
        ChatLive_socket[chat_number].send('CAP REQ :twitch.tv/commands twitch.tv/tags\r\n');
        ChatLive_socket[chat_number].send('JOIN #' + ChatLive_selectedChannel[chat_number] + '\r\n');
    };

    ChatLive_socket[chat_number].onmessage = function(data) {

        var message = window.parseIRC(data.data.trim());

        if (!message.command) return;

        switch (message.command) {
            case "PING":
                ChatLive_socket[chat_number].send('PONG ' + message.params[0]);
                break;
            case "JOIN":
                ChatLive_loaded[chat_number] = true;
                var div = '&nbsp;<span class="message">' + STR_BR + STR_LOADING_CHAT +
                    (!chat_number ? Main_values.Play_selectedChannelDisplayname : PlayExtra_selectedChannelDisplayname) + ' ' + STR_LIVE + '</span>';

                if (Play_ChatDelayPosition) {
                    var stringSec = STR_SECOND;
                    if (Play_controls[Play_controlsChatDelay].defaultValue > 1) stringSec = STR_SECONDS;

                    div += '&nbsp;<span class="message">' + STR_BR + STR_BR + STR_CHAT_DELAY + ' ' +
                        Play_controls[Play_controlsChatDelay].values[Play_controls[Play_controlsChatDelay].defaultValue] +
                        stringSec + '</span>';
                }

                ChatLive_LineAdd(div, chat_number);
                break;
            case "PRIVMSG":
                ChatLive_loadChatSuccess(message, chat_number);
                break;
            default:
                break;
        }
    };

    ChatLive_CheckId[chat_number] = window.setTimeout(function() {
        ChatLive_Check(chat_number);
    }, 5000);
}

function ChatLive_Check(chat_number) {
    if (!ChatLive_loaded[chat_number]) {
        ChatLive_socket[chat_number].close(1000);
        ChatLive_loadChat(chat_number);
    }
}

function ChatLive_CheckClear(chat_number) {
    window.clearTimeout(ChatLive_CheckId[chat_number]);
}

function ChatLive_loadChatSuccess(message, chat_number) {
    var div = '',
        tags = message.tags;

    //Add badges
    if (tags.hasOwnProperty('badges')) {
        if (typeof tags.badges === 'string') {
            tags.badges.split(',').forEach(function(badge) {
                badge = badge.split('/');

                div += '<span class="' + badge[0] + (badge[0].indexOf('subscriber') !== -1 ? chat_number : "") + '-' + badge[1] + ' tag"></span>';
            });
        }
    }

    //Add nick
    if (tags.hasOwnProperty('display-name')) {
        var nick = tags['display-name'];
        if (typeof nick === 'string')
            div += '<span style="color: #' + defaultColors[(nick).charCodeAt(0) % defaultColorsLength] + ';">' + nick + '</span>&#58;&nbsp;';
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

    div += '<span class="message">' +
        ChatLive_extraMessageTokenize(
            emoticonize(mmessage, emotes),
            chat_number,
            (tags.hasOwnProperty('bits') && cheers.hasOwnProperty(ChatLive_selectedChannel_id[chat_number]))
        ) + '</span>';

    if (!Play_ChatDelayPosition) ChatLive_LineAdd(div, chat_number);
    else {
        var id = ChatLive_Id[chat_number];
        window.setTimeout(function() {
            if (id === ChatLive_Id[chat_number]) ChatLive_LineAdd(div, chat_number);
        }, (Play_controls[Play_controlsChatDelay].values[Play_controls[Play_controlsChatDelay].defaultValue] * 1000));
    }
}

function ChatLive_extraMessageTokenize(tokenizedMessage, chat_number, tags) {

    for (var i = 0; i < tokenizedMessage.length; i++) {
        if (typeof tokenizedMessage[i] === 'string') {
            tokenizedMessage[i] = extraMessageTokenize(tokenizedMessage[i], chat_number, tags);
        } else {
            tokenizedMessage[i] = tokenizedMessage[i][0];
        }
    }

    return twemoji.parse(tokenizedMessage.join(' '), true, true);
}

function ChatLive_LineAdd(message, chat_number) {
    var elem = document.createElement('div');
    elem.className = 'chat_line';
    elem.innerHTML = message;

    Chat_div[chat_number].appendChild(elem);

    ChatLive_LineAddCounter[chat_number]++;
    if (ChatLive_LineAddCounter[chat_number] > Chat_CleanMax) {
        ChatLive_LineAddCounter[chat_number] = 0;
        Chat_Clean(chat_number);
    }
}

function ChatLive_ClearIds(chat_number) {
    ChatLive_CheckClear(chat_number);
    window.clearTimeout(ChatLive_loadBadgesChannelId);
}

function ChatLive_Clear(chat_number) {
    ChatLive_ClearIds(chat_number);
    if (ChatLive_socket[chat_number]) ChatLive_socket[chat_number].close(1000);
    ChatLive_Id[chat_number] = 0;
    ChatLive_LineAddCounter[chat_number] = 0;

    if (!chat_number) Main_empty('chat_box');
    else Main_empty('chat_box2');

    ChatLive_loaded[chat_number] = false;
}
