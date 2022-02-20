/*
 * Copyright (c) 2017-2020 Felipe de Leon <fglfgl27@gmail.com>
 *
 * This file is part of SmartTwitchTV <https://github.com/fgl27/SmartTwitchTV>
 *
 * SmartTwitchTV is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SmartTwitchTV is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SmartTwitchTV.  If not, see <https://github.com/fgl27/SmartTwitchTV/blob/master/LICENSE>.
 *
 */

//Variable initialization
var Chat_Id = [];
var ChatLive_loadBadgesChannelId;
var ChatLive_socket = [];
var ChatLive_loaded = [];
var ChatLive_CheckId = [];
var ChatLive_JoinID = [];
var ChatLive_LineAddCounter = [];
var ChatLive_Messages = [];
var ChatLive_Banned = [];
var ChatLive_FollowState = [];
var ChatLive_SubState = [];
var ChatLive_Playing = true;
var ChatLive_SetCheckTimout = 10000;
var ChatLive_ReTryDelay = 1000;
var extraEmotesDone = {
    bttv: {},
    ffz: {},
    seven_tv: {},
    cheers: {},
    BadgesChannel: {}
};

var emojis = [];
var userEmote = {};
var extraEmotes = {};
var cheers = {};

var ChatLive_selectedChannel_id = [];
var ChatLive_loadChattersId = [];
var ChatLive_PingId = [];
var ChatLive_SendPingId;
var ChatLive_selectedChannel = [];
var ChatLive_sub_replace = new RegExp('\\\\s', 'gi');
var ChatLive_chat_line_class = '';

var KnowBots = {
    Nightbot: 1,
    StreamElements: 1,
    Moobot: 1,
    Deepbot: 1,
    Wizebot: 1,
    Ankhbot: 1,
    Streamlabs: 1,
    Phantombot: 1,
    Xanbot: 1
};

var emoteReplace = {
    "B-?\\)": "B)",
    "\\:-?\\)": ":)",
    "\\:-?\\(": ":(",
    "\\:-?(p|P)": ":P",
    "\\;-?(p|P)": ";P",
    "\\:-?[\\\\/]": ":/",
    "\\;-?\\)": ";)",
    "R-?\\)": "R)",
    ":>": ":>",
    "\\:\\&gt\\;": ":>",
    "[oO](_|\\.)[oO]": "O_O",
    "\\:-?D": ":D",
    "\\:-?(o|O)": ":O",
    ">\\\\(": ">(",
    ":-?(?:7|L)": ":7",
    "\\:-?(S|s)": ":s",
    "#-?[\\\\/]": "#/",
    "<\\]": "<]",
    "<3": "<3",
    "\\&lt\\;3": "<3",
    "\\&lt\\;\\]": "<]",
    "\\&gt\\;\\(": ">(",
    "\\:-?[z|Z|\\|]": ":Z",
};

var ChatLive_ROOMSTATE_Regex = /emote-only=(\d+).*followers-only=(-1|\d+).*r9k=(\d+).*slow=(\d+).*subs-only=(\d+).*/;

var ChatLive_Base_BTTV_url = 'https://cdn.betterttv.net/emote/';
var ChatLive_Base_chat_url = 'https://tmi.twitch.tv/';
//Variable initialization end

function ChatLive_Init(chat_number, SkipClear) {
    if (!SkipClear) {
        ChatLive_Clear(chat_number);
    }

    if (Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }

    if (!Main_IsOn_OSInterface) {

        Chat_StartFakeClock();

    }

    Chat_loadBadgesGlobal();

    ChatLive_SetOptions(
        chat_number,
        !chat_number ? Play_data.data[14] : PlayExtra_data.data[14],
        !chat_number ? Play_data.data[6] : PlayExtra_data.data[6]
    );

    if (!SkipClear) {
        ChatLive_PreLoadChat(chat_number, Chat_Id[chat_number]);
    }

    ChatLive_loadChat(chat_number, Chat_Id[chat_number], SkipClear);

    if (!SkipClear) {
        ChatLive_SendStart(chat_number, Chat_Id[chat_number]);
        ChatLive_loadChatters(chat_number, Chat_Id[chat_number]);
    }

    ChatLive_loadEmotesUser();
    ChatLive_checkFallow(chat_number, Chat_Id[chat_number]);
    ChatLive_checkSub(chat_number, Chat_Id[chat_number]);
}


function ChatLive_Switch() {
    var innerHTMLTemp = Chat_div[1].innerHTML;

    Chat_div[1].innerHTML = Chat_div[0].innerHTML;
    Chat_div[0].innerHTML = innerHTMLTemp;

    var logged0 = Main_getElementById('chat_loggedin0'),
        logged1 = Main_getElementById('chat_loggedin1');

    innerHTMLTemp = logged1.innerHTML;
    logged1.innerHTML = logged0.innerHTML;
    logged0.innerHTML = innerHTMLTemp;

    for (var i = 0; i < 2; i++) {

        ChatLive_Close(i);
        ChatLive_Init(i, true);

    }

}

var ChatLive_Logging;
var ChatLive_Highlight_Rewards;
var ChatLive_Highlight_AtStreamer;
var ChatLive_Highlight_FromStreamer;
var ChatLive_Highlight_Mod;
var ChatLive_Highlight_AtUser;
var ChatLive_Highlight_User_send;
var ChatLive_Individual_Background;//Play_ChatBackground
var ChatLive_Individual_Background_flip = [];
var ChatLive_Highlight_Actions;
var ChatLive_Highlight_Bits;
var ChatLive_Show_SUB;
var ChatLive_User_Set;
var chat_lineChatLive_Individual_Lines;
var chat_Line_highlight_green = ' style="color: #4eff42;" ';
var chat_Line_highlight_blue = ' style="color: #4AA4FD;" ';
var ChatLive_User_Regex_Search;
var ChatLive_User_Regex_Replace;
var ChatLive_Channel_Regex_Search = [];
var ChatLive_Channel_Regex_Replace = [];
var ChatLive_Custom_Nick_Color;
var ChatLive_Show_TimeStamp;
var ChatLive_ClearChat;
var ChatLive_HideBots;

function ChatLive_SetOptions(chat_number, Channel_id, selectedChannel) {

    ChatLive_selectedChannel_id[chat_number] = Channel_id;
    ChatLive_selectedChannel[chat_number] = selectedChannel;
    if (ChatLive_selectedChannel[chat_number])
        ChatLive_selectedChannel[chat_number] = ChatLive_selectedChannel[chat_number].toLowerCase();

    ChatLive_User_Set = AddUser_IsUserSet();

    ChatLive_Logging = Settings_value.chat_logging.defaultValue;
    ChatLive_Individual_Background = Settings_value.chat_individual_background.defaultValue;
    ChatLive_Highlight_Rewards = Settings_value.highlight_rewards.defaultValue;
    ChatLive_Highlight_AtStreamer = Settings_value.highlight_atstreamer.defaultValue;
    ChatLive_Highlight_FromStreamer = Settings_value.highlight_streamer.defaultValue;
    ChatLive_Highlight_Mod = Settings_value.highlight_mod.defaultValue;
    ChatLive_Highlight_AtUser = ChatLive_User_Set && Settings_value.highlight_atuser.defaultValue;
    ChatLive_Highlight_User_send = ChatLive_User_Set && Settings_value.highlight_user_send.defaultValue;
    ChatLive_Highlight_Actions = Settings_value.show_actions.defaultValue;
    ChatLive_Highlight_Bits = Settings_value.highlight_bits.defaultValue;
    ChatLive_Show_SUB = Settings_value.show_sub.defaultValue;
    chat_lineChatLive_Individual_Lines = Settings_value.individual_lines.defaultValue;
    ChatLive_Custom_Nick_Color = Settings_value.chat_nickcolor.defaultValue;
    ChatLive_Show_TimeStamp = Settings_value.chat_timestamp.defaultValue;
    ChatLive_ClearChat = Settings_value.clear_chat.defaultValue;
    ChatLive_HideBots = Settings_value.chat_bot.defaultValue;
    ChatLive_Individual_Background_flip[chat_number] = 0;

    ChatLive_Channel_Regex_Search[chat_number] = new RegExp('@' + ChatLive_selectedChannel[chat_number] + '(?=\\s|$)', "i");
    ChatLive_Channel_Regex_Replace[chat_number] = new RegExp('@' + ChatLive_selectedChannel[chat_number], "gi");

    ChatLive_chat_line_class =
        (Settings_value.chat_line_animation.defaultValue ? 'chat_line_animation ' : '') +
        'chat_line_holder';

    if (ChatLive_User_Set) {
        ChatLive_User_Regex_Search = new RegExp('@' + AddUser_UsernameArray[0].name + '(?=\\s|$)', "i");
        ChatLive_User_Regex_Replace = new RegExp('@' + AddUser_UsernameArray[0].name, "gi");
    }

    Chat_Id[chat_number] = (new Date()).getTime();

    ChatLive_loadEmotesChannelbttv(chat_number, Chat_Id[chat_number]);
    ChatLive_loadEmotesChannelffz(chat_number, Chat_Id[chat_number]);
    ChatLive_loadEmotesChannelseven_tv(chat_number, Chat_Id[chat_number]);
    Chat_loadBadgesGlobalRequest(chat_number, Chat_Id[chat_number]);

    ChatLive_loadBadgesChannel(chat_number, Chat_Id[chat_number]);
    ChatLive_loadCheersChannel(chat_number, Chat_Id[chat_number]);

}

function ChatLive_checkFallow(chat_number, id) {
    if (!AddUser_IsUserSet() || !AddUser_UsernameArray[0].access_token) return;

    ChatLive_FollowState[chat_number] = {};
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + ChatLive_selectedChannel_id[chat_number] + Main_TwithcV5Flag_I;

    BaseXmlHttpGet(
        theUrl,
        2,
        null,
        ChatLive_checkFallowSuccess,
        ChatLive_RequestCheckFollowNOK,
        chat_number,
        id
    );

}

function ChatLive_checkFallowSuccess(responseText, chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;

    ChatLive_checkFallowSuccessUpdate(responseText, chat_number);
}

function ChatLive_checkFallowSuccessUpdate(responseText, chat_number) {
    var obj = JSON.parse(responseText);

    ChatLive_FollowState[chat_number] = {
        created_at: obj.created_at,
        follows: true
    };
}

function ChatLive_RequestCheckFollowNOK(chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;

    ChatLive_FollowState[chat_number].follows = false;
}

function ChatLive_GetMinutes(time) {// "2020-04-17T21:03:42Z"
    time = (new Date().getTime()) - (new Date(time).getTime());
    return Math.floor(Math.floor(parseInt(time / 1000)) / 60);
}

function ChatLive_checkSub(chat_number, id) {
    ChatLive_SubState[chat_number] = {};

    if (!AddUser_IsUserSet() || !AddUser_UsernameArray[0].access_token || id !== Chat_Id[chat_number]) {
        ChatLive_checkSubFail(chat_number, id);
        return;
    }

    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/subscriptions/' + ChatLive_selectedChannel_id[chat_number] + Main_TwithcV5Flag_I;

    BaseXmlHttpGet(
        theUrl,
        3,
        Main_OAuth + AddUser_UsernameArray[0].access_token,
        ChatLive_checkSubSucess,
        ChatLive_checkSubFail,
        chat_number,
        id
    );

}

function ChatLive_checkSubSucess(responseText, chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;

    ChatLive_SubState[chat_number].state = true;

}

function ChatLive_checkSubFail(chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;

    ChatLive_SubState[chat_number].state = false;
}

function ChatLive_loadBadgesChannel(chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;

    if (!extraEmotesDone.BadgesChannel[ChatLive_selectedChannel_id[chat_number]]) {

        BaseXmlHttpGet(
            'https://badges.twitch.tv/v1/badges/channels/' + ChatLive_selectedChannel_id[chat_number] + '/display',
            0,
            null,
            ChatLive_loadBadgesChannelSuccess,
            noop_fun,
            chat_number,
            id
        );

    } else {

        Chat_tagCSS(
            extraEmotesDone.BadgesChannel[ChatLive_selectedChannel_id[chat_number]],
            Chat_div[chat_number]
        );

    }
}

function ChatLive_loadBadgesChannelSuccess(responseText, chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;

    extraEmotesDone.BadgesChannel[ChatLive_selectedChannel_id[chat_number]] =
        Chat_loadBadgesTransform(
            JSON.parse(responseText),
            ChatLive_selectedChannel_id[chat_number],
            true
        );

    Chat_tagCSS(
        extraEmotesDone.BadgesChannel[ChatLive_selectedChannel_id[chat_number]],
        Chat_div[chat_number]
    );
}

function ChatLive_resetChatters(chat_number) {
    Main_textContent('chat_loggedin' + chat_number, '');
    Main_AddClass('chat_loggedin' + chat_number, 'hide');
    Main_getElementById('chat_box_holder' + chat_number).style.height = '';
    Main_getElementById('chat_container_name' + chat_number).style.top = '';
}

function ChatLive_loadChatters(chat_number, id) {

    if (Settings_value.show_chatters.defaultValue) {

        Main_innerHTML(
            "chat_loggedin" + chat_number,
            '...' + (Settings_value.show_chatters.defaultValue === 1 ? STR_IN_CHAT : STR_VIEWERS)
        );
        Main_RemoveClass('chat_loggedin' + chat_number, 'hide');

        Main_getElementById('chat_box_holder' + chat_number).style.height = 'calc(100% - 2.9vh)';

        if (!chat_number) Main_getElementById('chat_container_name' + chat_number).style.top = '3vh';

        ChatLive_loadChattersCheckType(chat_number, id);
    }

}

function ChatLive_loadChattersCheckType(chat_number, id) {

    if (Settings_value.show_chatters.defaultValue === 1 && Main_IsOn_OSInterface) ChatLive_loadChattersLoad(chat_number, id);
    else ChatLive_loadChattersViewers(chat_number, id);

    ChatLive_loadChattersId[chat_number] = Main_setInterval(
        function() {
            if (Settings_value.show_chatters.defaultValue === 1 && Main_IsOn_OSInterface) ChatLive_loadChattersLoad(chat_number, id);
            else ChatLive_loadChattersViewers(chat_number, id);
        },
        5 * 60 * 1000,//5 min
        ChatLive_loadChattersId[chat_number]
    );

}

function ChatLive_loadChattersViewers(chat_number, id) {

    var theUrl = Main_helix_api + 'streams/?user_id=' + ChatLive_selectedChannel_id[chat_number];

    BaseXmlHttpGet(
        theUrl,
        2,
        null,
        ChatLive_loadChattersViewersSuccess,
        noop_fun,
        chat_number,
        id,
        true
    );

}

function ChatLive_loadChattersViewersSuccess(responseText, chat_number, id) {
    try {

        if (id === Chat_Id[chat_number]) {

            var resultObj = JSON.parse(responseText);

            if (resultObj.data && resultObj.data.length) {

                var viewers = resultObj.data[0].viewer_count;

                Main_innerHTML(
                    "chat_loggedin" + chat_number,
                    Main_addCommas(viewers) + STR_SPACE_HTML + Main_GetViewerStrings(viewers)
                );
            }

        }

    } catch (e) {
        Main_Log('ChatLive_loadChattersSuccess ' + e);
    }
}

function ChatLive_loadChattersLoad(chat_number, id) {

    BaseXmlHttpGet(
        ChatLive_Base_chat_url + 'group/user/' + ChatLive_selectedChannel[chat_number],
        0,
        null,
        ChatLive_loadChattersSuccess,
        noop_fun,
        chat_number,
        id
    );

}

function ChatLive_loadChattersSuccess(responseText, chat_number, id) {
    try {

        if (id === Chat_Id[chat_number]) {

            var resultObj = JSON.parse(responseText);

            Main_innerHTML(
                "chat_loggedin" + chat_number,
                Main_addCommas(resultObj.chatter_count) + STR_IN_CHAT
            );

        }

    } catch (e) {
        Main_Log('ChatLive_loadChattersSuccess ' + e);
    }
}

function ChatLive_loadEmotesUser() {
    if (AddUser_IsUserSet() && AddUser_UsernameArray[0].access_token) {

        BaseXmlHttpGet(
            Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/emotes',
            3,
            Main_OAuth + AddUser_UsernameArray[0].access_token,
            ChatLive_loadEmotesUserSuccess,
            noop_fun,
            0,
            0
        );

    }
}


function ChatLive_loadEmotesUserSuccess(result) {
    try {

        var data = JSON.parse(result);
        if (!userEmote.hasOwnProperty(AddUser_UsernameArray[0].id)) userEmote[AddUser_UsernameArray[0].id] = {};

        var url, id;

        Object.keys(data.emoticon_sets).forEach(function(set) {
            set = data.emoticon_sets[set];
            if (Array.isArray(set)) {

                set.forEach(function(emoticon) {

                    if (!emoticon.code || !emoticon.id) return;
                    if (typeof emoticon.code !== 'string' || typeof emoticon.id !== 'number') return;

                    emoticon.code = emoteReplace[emoticon.code] || emoticon.code;

                    if (userEmote[AddUser_UsernameArray[0].id].hasOwnProperty(emoticon.code)) return;

                    url = emoteURL(emoticon.id);
                    id = emoticon.code + emoticon.id;//combine code and id to make t uniq

                    extraEmotes[emoticon.code] = {
                        code: emoticon.code,
                        id: id,
                        chat_div: emoteTemplate(url),
                        '4x': url
                    };

                    userEmote[AddUser_UsernameArray[0].id][emoticon.code] = {
                        code: emoticon.code,
                        id: id,
                        '4x': url
                    };

                });
            }
        });

    } catch (e) {
        Main_Log('ChatLive_loadEmotesUserSuccess ' + e);
    }
}

function ChatLive_loadEmotesChannelbttv(chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;

    if (!extraEmotesDone.bttv[ChatLive_selectedChannel_id[chat_number]]) {

        BaseXmlHttpGet(
            'https://api.betterttv.net/3/cached/users/twitch/' + encodeURIComponent(ChatLive_selectedChannel_id[chat_number]),
            0,
            null,
            ChatLive_loadEmotesChannelbttvSuccess,
            noop_fun,
            chat_number,
            id
        );

    } else {

        ChatLive_updateExtraEmotes(extraEmotesDone.bttv[ChatLive_selectedChannel_id[chat_number]]);

    }
}

function ChatLive_loadEmotesChannelbttvSuccess(data, chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;

    ChatLive_loadEmotesbttv(JSON.parse(data), chat_number, false);
}

function ChatLive_loadEmotesbttv(data, chat_number) {
    extraEmotesDone.bttv[ChatLive_selectedChannel_id[chat_number]] = {};

    try {
        ChatLive_loadEmotesbttvChannel(data.channelEmotes, chat_number);
        ChatLive_loadEmotesbttvChannel(data.sharedEmotes, chat_number);

        var len = data.bots.length,
            i = 0;

        for (i; i < len; i++) {
            KnowBots[data.bots[i]] = 1;
        }

    } catch (e) {
        Main_Log('ChatLive_loadEmotesbttv ' + e);
    }

}

function ChatLive_loadEmotesbttvChannel(data, chat_number) {

    var url, chat_div, id;

    try {
        data.forEach(function(emote) {

            url = ChatLive_Base_BTTV_url + emote.id + '/3x';
            chat_div = emoteTemplate(url);
            id = emote.code + emote.id;

            extraEmotes[emote.code] = {
                code: emote.code,
                id: id,
                chat_div: chat_div,
                '4x': url
            };

            extraEmotesDone.bttv[ChatLive_selectedChannel_id[chat_number]][emote.code] = {
                code: emote.code,
                id: id,
                chat_div: chat_div,
                '4x': url
            };

        });
    } catch (e) {
        Main_Log('ChatLive_loadEmotesbttvChannel ' + e);
    }

}

function ChatLive_loadCheersChannel(chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;

    if (!extraEmotesDone.cheers[ChatLive_selectedChannel_id[chat_number]]) {

        BaseXmlHttpGet(
            'https://api.twitch.tv/v5/bits/actions?channel_id=' + encodeURIComponent(ChatLive_selectedChannel_id[chat_number]),
            1,
            null,
            ChatLive_loadCheersChannelSuccess,
            noop_fun,
            chat_number,
            id
        );

    }
}

function ChatLive_loadCheersChannelSuccess(responseText, chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;

    cheers[ChatLive_selectedChannel_id[chat_number]] = {};
    var data = JSON.parse(responseText);

    try {
        data.actions.forEach(
            function(action) {

                cheers[ChatLive_selectedChannel_id[chat_number]][action.prefix] = {};

                action.tiers.forEach(
                    function(tier) {
                        cheers[ChatLive_selectedChannel_id[chat_number]][action.prefix][tier.min_bits] = emoteTemplate(tier.images.light.animated['4']);
                    }
                );
            }
        );

        extraEmotesDone.cheers[ChatLive_selectedChannel_id[chat_number]] = 1;
    } catch (e) {
        Main_Log('ChatLive_loadCheersChannelSuccess ' + e);
    }

}

function ChatLive_updateExtraEmotes(obj) {
    //We need to update the main obj as some channel have the same code for different emotes image
    for (var property in obj) {
        extraEmotes[property] = {
            code: obj[property].code,
            id: obj[property].id,
            chat_div: obj[property].chat_div,
            '4x': obj[property]['4x']
        };
    }
}

function ChatLive_loadEmotesChannelffz(chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;

    if (!extraEmotesDone.ffz[ChatLive_selectedChannel_id[chat_number]]) {

        BaseXmlHttpGet(
            'https://api.frankerfacez.com/v1/room/' + encodeURIComponent(ChatLive_selectedChannel[chat_number]),
            0,
            null,
            ChatLive_loadEmotesChannelffzSuccess,
            noop_fun,
            chat_number,
            id
        );

    } else {
        ChatLive_updateExtraEmotes(extraEmotesDone.ffz[ChatLive_selectedChannel_id[chat_number]]);
    }
}

function ChatLive_loadEmotesChannelffzSuccess(data, chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;

    ChatLive_loadEmotesffz(JSON.parse(data), chat_number, false);
}

function ChatLive_loadEmotesffz(data, chat_number, isGlobal) {
    if (isGlobal) extraEmotesDone.ffzGlobal = {};
    else extraEmotesDone.ffz[ChatLive_selectedChannel_id[chat_number]] = {};

    var url, chat_div, id;

    try {
        Object.keys(data.sets).forEach(function(set) {
            set = data.sets[set];
            if (set.emoticons || Array.isArray(set.emoticons)) {

                set.emoticons.forEach(function(emoticon) {

                    if (!emoticon.name || !emoticon.id) return;
                    if (typeof emoticon.name !== 'string' || typeof emoticon.id !== 'number') return;

                    if (!emoticon.urls || typeof emoticon.urls !== 'object') return;

                    if (typeof emoticon.urls[1] !== 'string') return;
                    if (emoticon.urls[2] && typeof emoticon.urls[2] !== 'string') return;

                    url = 'https:' + (emoticon.urls[4] || emoticon.urls[2] || emoticon.urls[1]);
                    chat_div = emoteTemplate(url);
                    id = emoticon.name + emoticon.id;

                    extraEmotes[emoticon.name] = {
                        code: emoticon.name,
                        id: id,
                        chat_div: chat_div,
                        '4x': url
                    };

                    //Don't copy to prevent shallow clone
                    if (isGlobal) {
                        extraEmotesDone.ffzGlobal[emoticon.name] = {
                            code: emoticon.name,
                            id: id,
                            chat_div: chat_div,
                            '4x': url
                        };
                    } else {
                        extraEmotesDone.ffz[ChatLive_selectedChannel_id[chat_number]][emoticon.name] = {
                            code: emoticon.name,
                            id: id,
                            chat_div: chat_div,
                            '4x': url
                        };
                    }

                });
            }
        });
    } catch (e) {
        Main_Log('ChatLive_loadEmotesffz ' + e);
    }

}

function ChatLive_loadEmotesChannelseven_tv(chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;

    if (!extraEmotesDone.seven_tv[ChatLive_selectedChannel_id[chat_number]]) {

        BaseXmlHttpGet(
            'https://api.7tv.app/v2/users/' + encodeURIComponent(ChatLive_selectedChannel_id[chat_number]) + "/emotes",
            0,
            null,
            ChatLive_loadEmotesChannelseven_tvSuccess,
            noop_fun,
            chat_number,
            id
        );

    } else {

        ChatLive_updateExtraEmotes(extraEmotesDone.seven_tv[ChatLive_selectedChannel_id[chat_number]]);

    }
}

function ChatLive_loadEmotesChannelseven_tvSuccess(data, chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;
    ChatLive_loadEmotesseven_tv(JSON.parse(data), chat_number, false);
}

function ChatLive_loadEmotesseven_tv(data, chat_number, isGlobal) {
    if (isGlobal) extraEmotesDone.seven_tvGlobal = {};
    else extraEmotesDone.seven_tv[ChatLive_selectedChannel_id[chat_number]] = {};

    var url, chat_div, id;

    try {
        data.forEach(function(emote) {

            url = emote.urls[3][1];
            chat_div = emoteTemplate(url);
            id = emote.name + emote.id;

            extraEmotes[emote.name] = {
                code: emote.name,
                id: id,
                chat_div: chat_div,
                '4x': url
            };

            //Don't copy to prevent shallow clone
            if (isGlobal) {
                extraEmotesDone.seven_tvGlobal[emote.name] = {
                    code: emote.name,
                    id: id,
                    chat_div: chat_div,
                    '4x': url
                };
            } else {
                extraEmotesDone.seven_tv[ChatLive_selectedChannel_id[chat_number]][emote.name] = {
                    code: emote.name,
                    id: id,
                    chat_div: chat_div,
                    '4x': url
                };
            }

        });
    } catch (e) {
        Main_Log('ChatLive_loadEmotesseven_tvChannel ' + e);
    }

}

function ChatLive_PreLoadChat(chat_number, id) {

    BaseXmlHttpGet(
        'https://recent-messages.robotty.de/api/v2/recent-messages/' + ChatLive_selectedChannel[chat_number] + '?limit=30&hide_moderation_messages=true',
        0,
        null,
        ChatLive_PreLoadChatSuccess,
        noop_fun,
        chat_number,
        id
    );

}

function ChatLive_PreLoadChatSuccess(data, chat_number, id) {

    if (id !== Chat_Id[chat_number]) return;

    var obj = JSON.parse(data),
        len = obj.messages.length,
        i = len - 1,
        message;

    for (i; i >= 0; i--) {

        message = window.parseIRC(obj.messages[i].trim());

        if (message.command === "PRIVMSG") {

            ChatLive_loadChatSuccess(message, chat_number, true);

        }

    }

}

var useToken = [];

function ChatLive_loadChat(chat_number, id, SkipStartLine) {
    if (id !== Chat_Id[chat_number]) return;

    ChatLive_CheckClear(chat_number);

    if (!SkipStartLine) {
        ChatLive_LineAdd(
            {
                chat_number: chat_number,
                message: ChatLive_LineAddSimple(STR_LOADING_CHAT + STR_SPACE_HTML + (!chat_number ? Play_data.data[1] : PlayExtra_data.data[1])) + STR_SPACE_HTML + STR_LIVE
            }
        );
    }

    useToken[chat_number] = ChatLive_Logging && !ChatLive_Banned[chat_number] && AddUser_IsUserSet() && AddUser_UsernameArray[0].access_token;

    ChatLive_loadChatRequest(chat_number, id, SkipStartLine);
}

function ChatLive_loadChatRequest(chat_number, id, SkipStartLine) {
    if (id !== Chat_Id[chat_number]) return;
    //Main_Log('ChatLive_loadChatRequest');

    ChatLive_socket[chat_number] = new WebSocket('wss://irc-ws.chat.twitch.tv:443', 'irc');

    ChatLive_socket[chat_number].onopen = function() {
        if (useToken[chat_number]) {
            var username = AddUser_UsernameArray[0].name.toLowerCase();

            ChatLive_socket[chat_number].send('PASS oauth:' + AddUser_UsernameArray[0].access_token);
            ChatLive_socket[chat_number].send('NICK ' + username);
            ChatLive_socket[chat_number].send('USER ' + username + ' 8 * :' + username);
        } else {
            ChatLive_socket[chat_number].send('PASS blah');
            ChatLive_socket[chat_number].send('NICK justinfan12345');
            ChatLive_socket[chat_number].send('CAP REQ :twitch.tv/commands twitch.tv/tags');
            ChatLive_socket[chat_number].send('JOIN #' + ChatLive_selectedChannel[chat_number]);
        }
    };

    ChatLive_socket[chat_number].onmessage = function(data) {

        if (!data.data) return;

        var message = window.parseIRC(data.data.trim());

        if (!message.command) return;

        // if (message.command !== "PRIVMSG") {
        //     Main_Log(message.command + ' Main');
        //     Main_Log(JSON.stringify(message));
        // }

        switch (message.command) {
            case "PRIVMSG":
                //Main_Log(JSON.stringify(message));
                ChatLive_loadChatSuccess(message, chat_number);
                break;
            case "PING":
                //Main_Log('ChatLive_socket[chat_number] ' + chat_number + ' PING');
                //Main_Log(JSON.stringify(message));
                ChatLive_socket[chat_number].send('PONG ' + message.params[0]);
                break;
            case "001":
                if (useToken[chat_number] &&
                    Main_A_includes_B(message.params[1], AddUser_UsernameArray[0].name.toLowerCase())) {

                    ChatLive_SetCheck(chat_number, id);
                    ChatLive_socket[chat_number].send('CAP REQ :twitch.tv/tags twitch.tv/commands');

                }
                break;
            case "CAP":
                if (useToken[chat_number]) {
                    //Delay the joing so the cap get fully accepted
                    ChatLive_JoinID[chat_number] = Main_setTimeout(
                        function() {
                            ChatLive_socket[chat_number].send('JOIN #' + ChatLive_selectedChannel[chat_number]);
                        },
                        500,
                        ChatLive_JoinID[chat_number]
                    );
                }
                break;
            case "JOIN":
                //Main_Log("JOIN");
                if (!ChatLive_loaded[chat_number]) {
                    ChatLive_loaded[chat_number] = true;

                    if (!SkipStartLine) {
                        ChatLive_LineAdd(
                            {
                                chat_number: chat_number,
                                message: ChatLive_LineAddSimple(STR_CHAT_CONNECTED + STR_SPACE_HTML + STR_AS + STR_SPACE_HTML +
                                    (useToken[chat_number] ? AddUser_UsernameArray[0].display_name : STR_ANONYMOUS))
                            }
                        );
                    }

                    if (Play_ChatDelayPosition) {
                        var stringSec = '';

                        if (Play_controls[Play_controlsChatDelay].defaultValue > 2) stringSec = STR_SECONDS;
                        else if (Play_controls[Play_controlsChatDelay].defaultValue > 1) stringSec = STR_SECOND;

                        ChatLive_LineAdd(
                            {
                                chat_number: chat_number,
                                message: ChatLive_LineAddSimple(STR_CHAT_DELAY + ' ' +
                                    Play_controls[Play_controlsChatDelay].values[Play_controls[Play_controlsChatDelay].defaultValue] + stringSec)
                            }
                        );

                        if (Play_ChatDelayPosition === 1)
                            OSInterface_getLatency(chat_number);
                    }

                    //On old implementation of webview or malfunction implementations, there is the need to send a a "heartbeat"
                    //from time to time, to prevent the connection from be closed, only one device need this Amazon firestick 4k Model AFTMM
                    //On that device the onclose is automatic call after 60 seconds of inactivity
                    ChatLive_PingId[chat_number] = Main_setInterval(
                        function() {
                            if (ChatLive_socket[chat_number] && ChatLive_socket[chat_number].readyState === 1)
                                ChatLive_socket[chat_number].send('PONG tmi.twitch.tv');
                        },
                        30 * 1000,//30 
                        ChatLive_PingId[chat_number]
                    );
                }
                ChatLive_CheckRoomState(message, chat_number, true);

                break;
            case "USERNOTICE":
                ChatLive_CheckIfSub(message, chat_number);
                break;
            case "USERSTATE":
                //Main_Log('USERSTATE chat ' + chat_number);
                //Main_Log(message);
                ChatLive_CheckRoomState(message, chat_number);
                //ROOMSTATE
                //{"raw":"@badge-info=;badges=;color=;display-name=fglfgl27;emote-sets=0,300374282;mod=0;subscriber=0;user-type= :tmi.twitch.tv USERSTATE #kimchi\r\n@emote-only=0;followers-only=-1;r9k=0;rituals=0;room-id=54281335;slow=0;subs-only=0 :tmi.twitch.tv ROOMSTATE #kimchi\r\n:fglfgl27.tmi.twitch.tv 353 fglfgl27 = #kimchi :fglfgl27\r\n:fglfgl27.tmi.twitch.tv 366 fglfgl27 #kimchi :End of /NAMES list","tags":{"badge-info":true,"badges":true,"color":true,"display-name":"fglfgl27","emote-sets":"0,300374282","mod":"0","subscriber":"0","user-type":true},"prefix":"tmi.twitch.tv","command":"USERSTATE","params":["#kimchi\r\n@emote-only=0;followers-only=-1;r9k=0;rituals=0;room-id=54281335;slow=0;subs-only=0","tmi.twitch.tv ROOMSTATE #kimchi\r\n:fglfgl27.tmi.twitch.tv 353 fglfgl27 = #kimchi :fglfgl27\r\n:fglfgl27.tmi.twitch.tv 366 fglfgl27 #kimchi :End of /NAMES list"]}

                // tags:
                // badge-info: true
                // badges: true
                // color: true
                // display-name: "testtwitch27"
                // emote-sets: "0"
                // mod: "0"
                // subscriber: "0"
                // user-type: true
                break;
            case "NOTICE":
                ChatLive_UserNoticeCheck(message, chat_number, id);
                // command: "NOTICE"
                // params: Array(2)
                // 0: "#channel"
                // 1: "You are permanently banned from talking in buddha."
                // length: 2
                // __proto__: Array(0)
                // prefix: "tmi.twitch.tv"
                // raw: "@msg-id=msg_banned :tmi.twitch.tv NOTICE #channel :You are permanently banned from talking in channel."
                // tags:
                // msg-id: "msg_banned"
                break;
            case "ROOMSTATE":
                ChatLive_UpdateRoomState(message, chat_number);
                // command: "ROOMSTATE"
                // params: Array(6)
                // 0: "#sayeedblack
                // ↵:testtwitch27.tmi.twitch.tv"
                // 1: "353"
                // 2: "testtwitch27"
                // 3: "="
                // 4: "#sayeedblack"
                // 5: "testtwitch27
                // ↵:testtwitch27.tmi.twitch.tv 366 testtwitch27 #sayeedblack :End of /NAMES list"
                // length: 6
                // __proto__: Array(0)
                // prefix: "tmi.twitch.tv"
                // raw: "@emote-only=0;followers-only=-1;r9k=0;rituals=1;room-id=83084666;slow=0;subs-only=0 :tmi.twitch.tv ROOMSTATE #sayeedblack
                // ↵:testtwitch27.tmi.twitch.tv 353 testtwitch27 = #sayeedblack :testtwitch27
                // ↵:testtwitch27.tmi.twitch.tv 366 testtwitch27 #sayeedblack :End of /NAMES list"
                // tags:
                // emote-only: "0"
                // followers-only: "-1"
                // r9k: "0"
                // rituals: "1"
                // room-id: "83084666"
                // slow: "0"
                // subs-only: "0"
                // __proto__: Object
                // __proto__: Object
                break;
            case "PART":
                if (ChatLive_socket[chat_number]) {
                    ChatLive_reset(chat_number);
                    ChatLive_socket[chat_number].close(1000);
                }
                break;
            case "CLEARCHAT":
                //Main_Log(JSON.stringify(message));
                ChatLive_CleanUser(chat_number, message);
                break;
            case "CLEARMSG":
                //Main_Log(JSON.stringify(message));
                ChatLive_CleanMessage(message);
                break;
            default:
                break;
        }
    };

    ChatLive_socket[chat_number].onclose =
        function(event) {
            //Main_Log(JSON.stringify(event) + ' onclose main ');
            ChatLive_LineAddErro('Websocket closed remotely... ' + JSON.stringify(event), chat_number);
            ChatLive_loaded[chat_number] = false;
            ChatLive_Check(chat_number, id, ChatLive_ReTryDelay, true);
        };

    ChatLive_socket[chat_number].onerror =
        function(error) {
            //Main_Log(JSON.stringify(error) + ' erro main');
            ChatLive_LineAddErro('Error... ' + JSON.stringify(error), chat_number);
            ChatLive_loaded[chat_number] = false;
            ChatLive_Check(chat_number, id, ChatLive_ReTryDelay, true);
        };

    ChatLive_SetCheck(chat_number, id);
}

function ChatLive_SetCheck(chat_number, id) {
    Main_clearTimeout(ChatLive_CheckId[chat_number]);
    if (!ChatLive_loaded[chat_number] && id === Chat_Id[chat_number]) {
        ChatLive_CheckId[chat_number] = Main_setTimeout(
            function() {
                ChatLive_Check(chat_number, id, 0);
            },
            ChatLive_SetCheckTimout * (useToken[chat_number] ? 2 : 1),
            ChatLive_CheckId[chat_number]
        );
    }
}

function ChatLive_reset(chat_number) {
    ChatLive_socket[chat_number].onclose = noop_fun;
    ChatLive_socket[chat_number].onerror = noop_fun;
    ChatLive_socket[chat_number].onmessage = noop_fun;
    ChatLive_socket[chat_number].onopen = noop_fun;
}

function ChatLive_Close(chat_number) {
    if (ChatLive_socket[chat_number]) {

        if (ChatLive_socket[chat_number].readyState === 1)
            ChatLive_socket[chat_number].send('PART #' + ChatLive_selectedChannel[chat_number]);

        ChatLive_reset(chat_number);
        ChatLive_socket[chat_number].close(1000);
    }
    ChatLive_loaded[chat_number] = false;
    Main_clearInterval(ChatLive_PingId[chat_number]);
}

function ChatLive_Check(chat_number, id, timeout, silent) {
    if (!ChatLive_loaded[chat_number] && id === Chat_Id[chat_number]) {
        ChatLive_Close(chat_number);

        ChatLive_CheckId[chat_number] = Main_setTimeout(
            function() {
                //Silent error message already added
                if (!silent) ChatLive_LineAddErro(STR_LOADING_FAIL, chat_number);
                ChatLive_loadChat(chat_number, id);
            },
            timeout ? timeout : 0,
            ChatLive_CheckId[chat_number]
        );
    }
}

function ChatLive_LineAddErro(message, chat_number, chatsend) {
    ChatLive_LineAdd(
        {
            chat_number: chat_number,
            message: '<span class="message">' + (chatsend ? 'ChatSend:' : 'Chat:') + STR_SPACE_HTML + message + '</span>'
        }
    );
}

function ChatLive_CheckClear(chat_number) {
    Main_clearTimeout(ChatLive_JoinID[chat_number]);
    Main_clearTimeout(ChatLive_CheckId[chat_number]);
}

function ChatLive_CheckRoomState(message, chat_number, retry) {
    if (useToken[chat_number]) {
        //params = ["#yogscast\r\n@badge-info=;badges=;color=;display-name=fglfgl27;emote-sets=0,300374282;mod=0;subscriber=0;user-type=", "tmi.twitch.tv USERSTATE #yogscast\r\n@emote-only=0;followers-only=5;r9k=0;rituals=0;room-id=20786541;slow=0;subs-only=0 :tmi.twitch.tv ROOMSTATE #yogscast\r\n:fglfgl27.tmi.twitch.tv 353 fglfgl27 = #yogscast :fglfgl27\r\n:fglfgl27.tmi.twitch.tv 366 fglfgl27 #yogscast :End of /NAMES list"]
        var mparams = message.hasOwnProperty('params') ? JSON.stringify(message.params) : '';
        var array = ChatLive_ROOMSTATE_Regex.exec(mparams);
        ChatLive_ROOMSTATE_Regex.lastIndex = 0;//Reset index after use,only need for /g ... may not be using it but force reset in case I change and forget it

        if (array && array.length === 6) {

            Main_clearTimeout(ChatLive_JoinID[chat_number]);
            ChatLive_SetRoomState(array, chat_number);
            return;

        }

        if (retry) {//Don't retry for USERSTATE only on join
            //try a join again so the ROOMSTATE get send
            ChatLive_JoinID[chat_number] = Main_setTimeout(
                function() {
                    ChatLive_socket[chat_number].send('JOIN #' + ChatLive_selectedChannel[chat_number]);
                },
                1000,
                ChatLive_JoinID[chat_number]
            );
        }
    }
}

var ChatLive_RoomState = [];
function ChatLive_SetRoomState(array, chat_number) {
    //Main_Log('ChatLive_SetRoomState');

    ChatLive_RoomState[chat_number] = {
        'emote-only': parseInt(array[1]),
        'followers-only': parseInt(array[2]),
        rk9: parseInt(array[3]),
        slow: parseInt(array[4]),
        'subs-only': parseInt(array[5])
    };

    //Main_Log(ChatLive_RoomState[chat_number]);
    ChatLiveControls_RefreshRoomState(chat_number);
}

function ChatLive_UpdateRoomState(message, chat_number) {
    //Main_Log('ChatLive_UpdateRoomState');
    //Main_Log(message);
    if (message.tags) {

        if (!ChatLive_RoomState[chat_number]) ChatLive_RoomState[chat_number] = {};

        var tags = message.tags;

        if (tags.hasOwnProperty('emote-only')) ChatLive_RoomState[chat_number]['emote-only'] = parseInt(tags['emote-only']);
        if (tags.hasOwnProperty('followers-only')) ChatLive_RoomState[chat_number]['followers-only'] = parseInt(tags['followers-only']);
        if (tags.hasOwnProperty('rk9')) ChatLive_RoomState[chat_number].rk9 = parseInt(tags.rk9);
        if (tags.hasOwnProperty('slow')) ChatLive_RoomState[chat_number].slow = parseInt(tags.slow);
        if (tags.hasOwnProperty('subs-only')) ChatLive_RoomState[chat_number]['subs-only'] = parseInt(tags['subs-only']);

        //Main_Log(ChatLive_RoomState[chat_number]);
        ChatLiveControls_RefreshRoomState(chat_number);
    }
}

function ChatLive_SendStart(chat_number, id) {
    //Main_Log('ChatLive_SendStart');
    if (id !== Chat_Id[chat_number]) return;

    if (!chat_number) {
        if (!ChatLive_Banned[chat_number] && AddUser_IsUserSet() && AddUser_UsernameArray[0].access_token)
            ChatLive_SendPrepared(chat_number, id);
        else
            ChatLive_SendClose();
    }

}

var ChatLive_socketSend;
var ChatLive_socketSendJoin = false;
var ChatLive_socketSendCheckID;

function ChatLive_SendPrepared(chat_number, id) {
    //Main_Log('ChatLive_SendPrepared');

    ChatLive_socketSend = new WebSocket('wss://irc-ws.chat.twitch.tv:443', 'irc');

    ChatLive_socketSend.onopen = function() {
        var username = AddUser_UsernameArray[0].name.toLowerCase();

        ChatLive_socketSend.send('PASS oauth:' + AddUser_UsernameArray[0].access_token);
        ChatLive_socketSend.send('NICK ' + username);
        ChatLive_socketSend.send('USER ' + username + ' 8 * :' + username);
    };

    ChatLive_socketSend.onmessage = function(data) {

        if (!data.data) return;

        var message = window.parseIRC(data.data.trim());

        if (!message.command) return;

        //Main_Log(message.command + ' send');
        //Main_Log(JSON.stringify(message));

        switch (message.command) {
            case "PING":
                //Main_Log('ChatLive_socketSend PING');
                //Main_Log(message);
                ChatLive_socketSend.send('PONG ' + message.params[0]);
                break;
            case "001":
                if (Main_A_includes_B(message.params[1], AddUser_UsernameArray[0].name.toLowerCase())) {
                    ChatLive_socketSendSetCheck(chat_number, id);
                    ChatLive_socketSend.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
                }
                break;
            case "CAP":
                ChatLive_socketSendJoin = true;

                //On old implementation of webview or malfunction implementations, there is the need to send a a "heartbeat"
                //from time to time, to prevent the connection from be closed, only one device need this Amazon firestick 4k Model AFTMM
                //On that device the onclose is automatic call after 60 seconds of inactivity
                ChatLive_SendPingId = Main_setInterval(
                    function() {
                        if (ChatLive_socketSend && ChatLive_socketSend.readyState === 1)
                            ChatLive_socketSend.send('PONG tmi.twitch.tv');
                    },
                    30 * 1000,//30 sec
                    ChatLive_SendPingId
                );
                break;
            case "NOTICE":
                if (message.params && message.params[1] && Main_A_includes_B(message.params[1] + '', 'authentication failed')) {

                    ChatLive_LineAddErro(message.params[1], 0, true);
                    if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) AddCode_refreshTokens(0, null, null);

                } else ChatLive_UserNoticeWarn(message);
                break;
            // case "USERSTATE":
            //     Main_Log('USERSTATE send');
            //     Main_Log(message);
            //     break;
            case "PART":
                if (ChatLive_socketSend) {
                    ChatLive_SendReset();
                    ChatLive_socketSend.close(1000);
                }
                break;
            default:
                break;
        }
    };

    ChatLive_socketSend.onclose =
        function(event) {
            //Main_Log(JSON.stringify(event) + ' onclose send');
            ChatLive_LineAddErro('Websocket closed remotely... ' + JSON.stringify(event), 0, true);
            ChatLive_socketSendJoin = false;
            ChatLive_socketSendCheck(chat_number, id, ChatLive_ReTryDelay, true);
        };

    ChatLive_socketSend.onerror =
        function(error) {
            //Main_Log(JSON.stringify(error) + ' error send');
            ChatLive_LineAddErro('Error... ' + JSON.stringify(error), 0, true);
            ChatLive_socketSendJoin = false;
            ChatLive_socketSendCheck(chat_number, id, ChatLive_ReTryDelay, true);
        };

    ChatLive_socketSendSetCheck(chat_number, id);
}

function ChatLive_SendReset() {
    ChatLive_socketSend.onclose = noop_fun;
    ChatLive_socketSend.onerror = noop_fun;
    ChatLive_socketSend.onmessage = noop_fun;
    ChatLive_socketSend.onopen = noop_fun;
}

function ChatLive_SendClose() {
    if (ChatLive_socketSend) {
        if (ChatLive_socketSend.readyState === 1) ChatLive_socketSend.send('PART ');
        ChatLive_SendReset();
        ChatLive_socketSend.close(1000);

    }
    ChatLive_socketSendJoin = false;
    Main_clearInterval(ChatLive_SendPingId);
}

function ChatLive_socketSendSetCheck(chat_number, id) {
    ChatLive_socketSendCheckID = Main_setTimeout(
        function() {
            ChatLive_socketSendCheck(chat_number, id, 0);
        },
        ChatLive_SetCheckTimout * 2,
        ChatLive_socketSendCheckID
    );
}

function ChatLive_socketSendCheck(chat_number, id, timeout, silent) {
    if (!ChatLive_socketSendJoin) {
        ChatLive_SendClose();

        ChatLive_socketSendCheckID = Main_setTimeout(
            function() {
                if (!silent) ChatLive_LineAddErro(STR_LOADING_FAIL, chat_number, true);
                ChatLive_SendStart(chat_number, id);
            },
            timeout ? timeout : 0,
            ChatLive_socketSendCheckID
        );

    }

}

function ChatLive_CheckHost(chat_number, id) {

    //If on multi or auto open host not enable, let the player end and do the checks
    if (id !== Chat_Id[chat_number] || Play_MultiEnable ||
        !Settings_value.open_host.defaultValue) return;

    Main_GetHost(
        ChatLive_CheckHostResult,
        chat_number,
        id,
        ChatLive_selectedChannel[chat_number]
    );

}

function ChatLive_CheckHostResult(responseObj, chat_number, id) {

    if (id !== Chat_Id[chat_number] || Play_MultiEnable) return;

    if (responseObj.status === 200) {

        var data = JSON.parse(responseObj.responseText).data;

        if (data.user && data.user.hosting) {

            if (PlayExtra_PicturePicture) {

                PlayExtra_loadDataCheckHostId = new Date().getTime();

                PlayExtra_CheckHost(
                    responseObj,
                    chat_number ^ 1,
                    PlayExtra_loadDataCheckHostId
                );

            } else {

                Play_loadDataCheckHostId = new Date().getTime();

                Play_CheckHost(
                    responseObj,
                    0,
                    Play_loadDataCheckHostId
                );

            }

        }
    }

}

function ChatLive_UserNoticeCheck(message, chat_number, id) {
    //Main_Log(JSON.stringify(message));
    var msgId = message.tags && message.tags.hasOwnProperty('msg-id');

    if (msgId && Main_A_includes_B(message.tags['msg-id'] + '', "host_on")) {

        ChatLive_CheckHost(chat_number, id);
        ChatLive_UserNoticeWarn(message);

    } else if (msgId && useToken[chat_number] &&
        Main_A_includes_B(message.tags['msg-id'] + '', "msg_banned")) {

        var text = message.params && message.params[1] ? message.params[1] : STR_CHAT_BANNED + ChatLive_selectedChannel[chat_number];
        ChatLive_Warn(text, 3500);

        ChatLive_Banned[chat_number] = true;

        Main_clearTimeout(ChatLive_CheckId[chat_number]);
        ChatLive_Check(chat_number, id, 0);

    } else if (message.params && message.params[1] && Main_A_includes_B(message.params[1] + '', 'authentication failed')) {

        ChatLive_LineAddErro(message.params[1], chat_number);
        if (useToken[chat_number] && AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) AddCode_refreshTokens(0, null, null);

    } else ChatLive_UserNoticeWarn(message);

}

function ChatLive_UserNoticeWarn(message) {
    //Main_Log(JSON.stringify(message));
    if (message.params[1] && !Main_A_includes_B(message.params[1], "NICK already set")) {

        //Main_Log(message.params[1]);
        ChatLive_Warn(message.params[1], 3500);

    }

}

function ChatLive_Warn(message, time) {
    ChatLiveControls_showWarningDialog('Chat: ' + message, time);
    Play_showWarningMidleDialog('Chat: ' + message, time);
}

function ChatLive_SendMessage(message, chat_number) {
    //Main_Log('ChatLive_SendMessage ' + ChatLive_socketSendJoin + ' msg ' + message);

    if (ChatLive_socketSendJoin && ChatLive_socketSend && ChatLive_socketSend.readyState === 1) {
        //Main_Log('ChatLive_SendMessage sended');
        ChatLive_socketSend.send('PRIVMSG #' + ChatLive_selectedChannel[chat_number] + ' :' + message);

        if (Play_ChatDelayPosition) {
            var time = Math.ceil((Play_ChatDelayPosition === 1 ? ChatLive_Latency[chat_number] : Play_ChatDelayPosition) / 1000);

            ChatLiveControls_showWarningDialog(
                STR_CHAT_SEND_DELAY + STR_SPACE_HTML + time + (time > 1 ? STR_SECONDS : STR_SECOND),
                5000
            );
        }

        return true;
    }

    return false;
}

// function ChatLive_FakeSendMessage(messageText, chat_number) {
//     //Main_Log('ChatLive_FakeSendMessage ' + messageText);

//     var message = {
//         params: [
//             "",
//             messageText
//         ],
//         tags: {
//             "badge-info": true,
//             badges: true,
//             color: true,
//             "display-name": "testtwitch27",
//             "emote-sets": "0",
//             mod: "0",
//             subscriber: "0",
//             "user-type": true
//         }
//     };

//     ChatLive_loadChatSuccess(message, chat_number);
// }

function ChatLive_CheckIfSub(message, chat_number) {
    //Main_Log(JSON.stringify(message));

    if (!ChatLive_Show_SUB) return;

    //reference smartTwitchTV/jsonreferences/sub.json
    var tags = message.tags;
    var params = message.params;

    if (!tags || !tags.hasOwnProperty('msg-id') || !tags['system-msg']) return; //bad formatted message

    var gifter_Or_Sub_name = tags['display-name'] || null,
        msgid = tags['msg-id'] || null,
        recipient = tags['msg-param-recipient-display-name'] || tags["msg-param-recipient-user-name"] || null,
        recipientId = tags['msg-param-recipient-id'] || null,
        msg = tags['system-msg'] || null;

    if (msg && msgid) {

        var isAnon = Main_A_includes_B(msgid + '', 'anon');

        msg = msg.replace(ChatLive_sub_replace, ' ');

        //who sub or gift a sub
        if (gifter_Or_Sub_name) {

            msg = msg.replace(gifter_Or_Sub_name, "<span style='color: #0fffff; font-weight: bold'>$&</span>");

        }

        //who received a sub
        if (recipient) {

            msg = msg.replace(recipient, "<span style='color: #0fffff; font-weight: bold'>$&</span>");

        }

        //who sub or gift a sub message
        if (params && params[1]) {

            msg += (params && params[1] ? STR_BR + STR_BR + ChatLive_GetBadges(tags, chat_number) +
                "<span style='color: #0fffff; font-weight: bold'>" + (isAnon || !gifter_Or_Sub_name ? STR_ANONYMOUS : gifter_Or_Sub_name) + "</span>: " +
                ChatLive_extraMessageTokenize(
                    emoticonize(params[1], ChatLive_checkEmotes(tags)),
                    chat_number,
                    0
                ) : '');
        }

        ChatLive_CheckIfSubSend(
            msg,
            chat_number
        );

        //check if who received a sub is current active user
        if (ChatLive_User_Set && recipient && recipientId &&
            (Main_A_equals_B(recipient + '', AddUser_UsernameArray[0].id + '') ||
                Main_A_equals_B(recipientId.toLowerCase() + '', AddUser_UsernameArray[0].name.toLowerCase() + ''))) {

            ChatLive_Warn((isAnon ? STR_ANONYMOUS : tags['display-name']) + STR_GIFT_SUB, 10000);

        }

    }

}

function ChatLive_CheckIfSubSend(message, chat_number) {
    ChatLive_LineAddCheckDelay(
        chat_number,
        {
            chat_number: chat_number,
            message: '<span class="message">' + message + '</span>',
            sub: 1,
        }
    );
}

function ChatLive_GetTimeStamp(time) {
    var date = new Date(parseInt(time) + Main_ClockOffset);

    return Play_lessthanten(date.getHours()) + ':' + Play_lessthanten(date.getMinutes());
}

function ChatLive_loadChatSuccess(message, chat_number, addToStart) {
    var div = '',
        tags = message.tags,
        nick,
        nickColor,
        highlighted = '',
        extraMessage,
        atstreamer = false,
        atuser = false,
        hasbits = false,
        fromstreamer = false,
        mod = false,
        action;

    if (!tags || !tags.hasOwnProperty('display-name') ||
        (ChatLive_HideBots && KnowBots[tags['display-name']])) {
        return; //bad formatted message
    }

    var mmessage = message.params[1];
    //For some bug on the chat implementation some message comes with the raw message of the next message
    //Remove the next to fix current... next will be lost as is not correctly formated
    if (Main_A_includes_B(mmessage, 'PRIVMSG')) mmessage = mmessage.split('@badge-info=')[0];

    if (ChatLive_HideBots && mmessage && mmessage.startsWith("!") && mmessage.indexOf(' ') === -1) {
        return;
    }

    //str.startsWith("Hello")
    if (ChatLive_Highlight_Rewards && tags.hasOwnProperty('msg-id')) {

        //Stringfy to prevent crashes
        tags['msg-id'] = tags['msg-id'] + '';

        if (Main_A_includes_B(tags['msg-id'], "highlighted-message")) {

            highlighted = ' chat_highlighted ';
            extraMessage = STR_CHAT_REDEEMED_MESSAGE_HIGH;

        } else if (Main_A_includes_B(tags['msg-id'], "skip-subs-mode-message")) {

            highlighted = ' chat_highlighted ';
            extraMessage = STR_CHAT_REDEEMED_MESSAGE_SUB;

        }

    }

    if (ChatLive_Show_TimeStamp) {
        div += addToStart && tags.hasOwnProperty('tmi-sent-ts') ? ChatLive_GetTimeStamp(tags['tmi-sent-ts']) + ' ' : Main_clock_H_M + ' ';
    }

    //Add badges
    div += ChatLive_GetBadges(tags, chat_number);

    //Add message

    if (/^\x01ACTION.*\x01$/.test(mmessage)) {
        if (!ChatLive_Highlight_Actions) return;

        action = true;
        mmessage = mmessage.replace(/^\x01ACTION/, '').replace(/\x01$/, '').trim();
    }

    if (ChatLive_Highlight_AtStreamer && ChatLive_Channel_Regex_Search[chat_number].test(mmessage)) {

        atstreamer = true;

    } else if (ChatLive_Highlight_FromStreamer &&
        Main_A_equals_B(tags['display-name'].toLowerCase(), ChatLive_selectedChannel[chat_number])) {

        fromstreamer = true;

    } else if (ChatLive_Highlight_Mod && tags.mod && tags.mod !== "0") {

        mod = true;

    } else if (ChatLive_Highlight_AtUser && ChatLive_User_Regex_Search.test(mmessage)) {

        atuser = true;

    } else if (ChatLive_Highlight_User_send &&
        Main_A_equals_B(tags['display-name'].toLowerCase(), (AddUser_UsernameArray[0].display_name).toLowerCase())) {

        atuser = true;

    }

    hasbits = (tags.hasOwnProperty('bits') && cheers.hasOwnProperty(ChatLive_selectedChannel_id[chat_number]));

    //Add nick
    nick = tags['display-name'];
    if (atstreamer || (ChatLive_Highlight_Bits && hasbits) || mod || fromstreamer) {

        nickColor = chat_Line_highlight_green;

    } else if (atuser) {

        nickColor = chat_Line_highlight_blue;

    } else {

        if (!ChatLive_Custom_Nick_Color && (typeof tags.color !== "boolean")) {

            nickColor = 'style="color: ' + tags.color + ';"';

        } else {

            nickColor = 'style="color: ' + (defaultColors[(nick).charCodeAt(0) % defaultColorsLength]) + ';"';

        }
    }
    div += '<span ' + (action ? 'class="class_bold" ' : '') + nickColor + '>' + nick + '</span>' + (action ? '' : '&#58;') + '&nbsp;';

    div += '<span ' + (tags.id ? 'id="' + tags.id + '"' : '') + ' class="' + (tags['user-id'] ? tags['user-id'] : '') + ' message' + highlighted + (action ? (' class_bold" ' + nickColor) : '"') + '>' +
        ChatLive_extraMessageTokenize(
            emoticonize(mmessage, ChatLive_checkEmotes(tags)),
            chat_number,
            (hasbits ? parseInt(tags.bits) : 0)
        ) + '</span>';

    var messageObj = {
        chat_number: chat_number,
        message: div,
        atstreamer: atstreamer,
        atuser: atuser,
        fromstreamer: fromstreamer,
        mod: mod,
        hasbits: (hasbits && ChatLive_Highlight_Bits),
        extraMessage: extraMessage,
        addToStart: addToStart
    };

    ChatLive_LineAddCheckDelay(chat_number, messageObj);
}

function ChatLive_LineAddCheckDelay(chat_number, messageObj) {

    if (!Play_ChatDelayPosition) ChatLive_LineAdd(messageObj);
    else ChatLive_LineAddDelay(chat_number, Chat_Id[chat_number], messageObj);

}

function ChatLive_LineAddDelay(chat_number, id, messageObj) {
    Main_setTimeout(
        function() {
            if (id === Chat_Id[chat_number]) ChatLive_LineAdd(messageObj);
        },
        Play_ChatDelayPosition === 1 ? ChatLive_Latency[chat_number] : Play_ChatDelayPosition
    );
}

function ChatLive_GetBadges(tags, chat_number) {

    if (tags.hasOwnProperty('badges')) {

        if (typeof tags.badges === 'string') {

            var badges = tags.badges.split(','),
                badge,
                ret = '';

            for (var i = 0, len = badges.length; i < len; i++) {
                badge = badges[i].split('/');

                ret += '<span class="a' + badge[0] + ChatLive_selectedChannel_id[chat_number] + '-' + badge[1] + ' tag"></span>';
            }

            return ret;
        }

    }

    return '';

}

function ChatLive_checkEmotes(tags) {
    var emotes = null;

    if (tags.hasOwnProperty('emotes')) {

        if (typeof tags.emotes === 'string') {

            tags.emotes = tags.emotes.split('/');

            var emote, replacements, replacement, j, len_j;
            emotes = {};

            for (var i = 0, len = tags.emotes.length; i < len; i++) {
                emote = tags.emotes[i].split(':');

                if (!emotes[emote[0]]) emotes[emote[0]] = [];

                replacements = emote[1].split(',');

                for (j = 0, len_j = replacements.length; j < len_j; j++) {
                    replacement = replacements[j].split('-');

                    emotes[emote[0]].push([parseInt(replacement[0]), parseInt(replacement[1])]);
                }
            }
        }
    }

    return emotes;
}

function ChatLive_extraMessageTokenize(tokenizedMessage, chat_number, tags) {

    for (var i = 0, len = tokenizedMessage.length; i < len; i++) {

        if (typeof tokenizedMessage[i] === 'string') {

            tokenizedMessage[i] = extraMessageTokenize(tokenizedMessage[i], chat_number, tags);

        } else {

            tokenizedMessage[i] = tokenizedMessage[i][0];

        }
    }

    return twemoji.parse(tokenizedMessage.join(' '), true, true);
}

function ChatLive_LineAddSimple(message) {
    return '<span class="message">' + message + '</span>';
}

function ChatLive_LineAdd(messageObj) {
    if (ChatLive_Playing) {

        ChatLive_ElemntAdd(messageObj);

        if (ChatLive_LineAddCounter[messageObj.chat_number]++ > Chat_CleanMax) {
            ChatLive_LineAddCounter[messageObj.chat_number] = 0;
            Chat_Clean(messageObj.chat_number);
        }

    } else {

        ChatLive_Messages[messageObj.chat_number].push(messageObj);

    }
}

//Full messageObj current is
// messageObj = {
//     chat_number: chat_number,
//     message: message,
//     atstreamer: atstreamer,
//     atuser: atuser,
//     fromstreamer: atuser,
//     mod: atuser,
//     hasbits: hasbits,
//     sub: sub,
//     skip_addline: skip_addline,
// };

function ChatLive_ElemntAdd(messageObj) {

    var style = '',
        classname = 'chat_line';

    if (messageObj.atstreamer) {

        classname += ' chat_atstreamer';
        messageObj.message = messageObj.message.replace(ChatLive_Channel_Regex_Replace[messageObj.chat_number], "<span style='color: #34B5FF; font-weight: bold'>$&</span>");

    } else if (messageObj.fromstreamer) {

        classname += ' chat_fromstreamer';

    } else if (messageObj.mod) {

        classname += ' chat_mod';

    } else if (messageObj.atuser) {

        classname += ' chat_atuser';

        messageObj.message = messageObj.message.replace(ChatLive_User_Regex_Replace, "<span style='color: #34B5FF; font-weight: bold'>$&</span>");

    } else if (messageObj.hasbits) {

        classname += ' chat_bits';

    } else if (messageObj.sub) {

        classname += ' chat_sub';

    } else if (ChatLive_Individual_Background) {

        if (ChatLive_Individual_Background_flip[messageObj.chat_number]) {

            if (ChatLive_Individual_Background === 1) {

                var color = (!Play_isFullScreen && !Play_MultiEnable) || Play_Multi_MainBig ? '100,100,100,' : '0, 0, 0,';
                style = 'background-color: rgba(' + color + ' ' + Play_ChatBackground + ');';

            } else if (ChatLive_Individual_Background === 2) {

                style = 'background-color: rgba(100,100,100, ' + Play_ChatBackground + ')';

            } else if (ChatLive_Individual_Background === 3) {

                style = 'background-color: rgba(0,0,0, ' + Play_ChatBackground + ')';

            }
        }

        ChatLive_Individual_Background_flip[messageObj.chat_number] = ChatLive_Individual_Background_flip[messageObj.chat_number] ^ 1;
    }

    if (chat_lineChatLive_Individual_Lines && !messageObj.skip_addline) classname += ' chat_line_ind';
    else classname += ' chat_line_slim';

    var chat_line = '<div style="' + style + '" class="' + classname + '">' + messageObj.message + '</div>';

    // <div class="chat_line chat_line_ind">
    // <span style="color: #D463FF;">USER Name</span>:&nbsp;
    // <span id="msg-id" class="user-id message">message <img class="emoticon" alt="" src="https://cdn.betterttv.net/emote/60007afdc96152314ad6629f/3x">
    // </span>
    // </div>

    var chat_line_holder = document.createElement('div');
    chat_line_holder.innerHTML = chat_line;

    if (!messageObj.addToStart) {

        //skip animation if chat not showing to prevent animations when it shows
        chat_line_holder.className = Play_ChatEnable ? ChatLive_chat_line_class : 'chat_line_holder';
        ChatLive_ElemntAddCheckExtra(messageObj);
        Chat_div[messageObj.chat_number].appendChild(chat_line_holder);

    } else {

        chat_line_holder.className = 'chat_line_holder';
        Chat_div[messageObj.chat_number].insertBefore(chat_line_holder, Chat_div[messageObj.chat_number].childNodes[0]);
        ChatLive_ElemntAddCheckExtra(messageObj);

    }

}

function ChatLive_ElemntAddCheckExtra(messageObj) {

    if (messageObj.extraMessage) {//REDEEMED_MESSAGE or etc related

        ChatLive_ElemntAdd(
            {
                chat_number: messageObj.chat_number,
                message: ChatLive_LineAddSimple(messageObj.extraMessage),
                skip_addline: 1,
                addToStart: messageObj.addToStart
            }
        );

    }

}

function ChatLive_MessagesRunAfterPause() {
    var i, j, len;

    for (i = 0; i < 2; i++) {
        len = ChatLive_Messages[i].length;

        for (j = 0; j < len; j++) {

            ChatLive_LineAdd(ChatLive_Messages[i][j]);

        }

        ChatLive_Messages[i] = [];
    }

    //After a pause/play UpdateLatency
    ChatLive_UpdateLatency();
}

function ChatLive_UpdateLatency() {
    if (Play_ChatDelayPosition === 1) {
        if (Chat_Id[0]) OSInterface_getLatency(0);
        if (Chat_Id[1]) OSInterface_getLatency(1);
    }
}

var ChatLive_Latency = [];
var ChatLive_LatencyId = [];
function ChatLive_SetLatency(chat_number, latency) {
    ChatLive_Latency[chat_number] = latency > 0 ? latency : 0;

    if (Play_ChatDelayPosition === 1) {
        //Update after it 30 seconds as the value may vary after some time
        ChatLive_LatencyId[chat_number] = Main_setTimeout(
            function() {
                if (Chat_Id[chat_number]) OSInterface_getLatency(chat_number);
            },
            30 * 1000,
            ChatLive_LatencyId[chat_number]
        );
    }
}

function ChatLive_ClearIds(chat_number) {
    ChatLive_CheckClear(chat_number);
    Main_clearTimeout(ChatLive_socketSendCheckID);
    Main_clearTimeout(ChatLive_loadBadgesChannelId);
    Main_clearTimeout(ChatLive_LatencyId[chat_number]);
    Main_clearInterval(ChatLive_loadChattersId[chat_number]);
    Main_clearInterval(ChatLive_PingId[chat_number]);
    Main_clearInterval(ChatLive_SendPingId);
}

function ChatLive_Clear(chat_number) {
    ChatLive_ClearIds(chat_number);

    Chat_Id[chat_number] = 0;
    ChatLive_LineAddCounter[chat_number] = 0;
    ChatLive_Messages[chat_number] = [];

    ChatLive_resetChatters(chat_number);
    Main_emptyWithEle(Chat_div[chat_number]);

    ChatLive_loaded[chat_number] = false;
    ChatLive_Banned[chat_number] = false;
    ChatLive_RoomState[chat_number] = null;

    ChatLive_CheckClear(chat_number);

    ChatLive_Close(chat_number);

    if (!chat_number) {
        ChatLive_SendClose();
    }

}

// {
// 	"raw": "@ban-duration=5;room-id=1234;target-user-id=1234;tmi-sent-ts=1611278054054 :tmi.twitch.tv CLEARCHAT #streamer :user",
// 	"tags": {
// 		"ban-duration": "5",
// 		"room-id": "1234",
// 		"target-user-id": "1234",
// 		"tmi-sent-ts": "1611278054054"
// 	},
// 	"prefix": "tmi.twitch.tv",
// 	"command": "CLEARCHAT",
// 	"params": ["#streamer", "user name"]
// }

function ChatLive_CleanUser(chat_number, message) {

    if (message.tags && message.tags.hasOwnProperty('target-user-id')) {

        var duration = message.tags['ban-duration'] || 0,
            msg = STR_CHAT_MESSAGE_DELETED_ALL,
            classId = message.tags['target-user-id'],
            array = Chat_div[chat_number].getElementsByClassName(classId);//The user id is added as a class

        if (duration) {

            msg += STR_CHAT_MESSAGE_DELETED_TIMEOUT + duration + (duration > 1 ? STR_SECONDS : STR_SECOND);

        }

        try {
            //Array.prototype maybe not supported by all browsers
            Array.prototype.forEach.call(array,
                function(el) {
                    if (el) {

                        if (ChatLive_ClearChat) el.innerHTML = msg;
                        else el.innerHTML += STR_BR + STR_BR + msg;

                        Main_AddClassWitEle(el.parentElement, 'chat_purged');
                        //Prevent duplicate removal
                        Main_RemoveClassWithEle(el, classId);

                    }
                }
            );
        } catch (e) {
            Main_Log('ChatLive_Clean Array.prototype message ' + JSON.stringify(message) + ' e ' + e);
        }
    }

}

// {
// 	"raw": "@login=user name;room-id=;target-msg-id=a long hash;tmi-sent-ts=1611277844517 :tmi.twitch.tv CLEARMSG #streamer :the message",
// 	"tags": {
// 		"login": "user name",
// 		"room-id": true,
// 		"target-msg-id": "a long hash",
// 		"tmi-sent-ts": "1611277844517"
// 	},
// 	"prefix": "tmi.twitch.tv",
// 	"command": "CLEARMSG",
// 	"params": ["#streamer", "the message"]
// }

function ChatLive_CleanMessage(message) {

    if (message.tags && message.tags.hasOwnProperty('target-msg-id')) {
        //Elem may not be there anymore
        var el = Main_getElementById(message.tags['target-msg-id']);

        if (el) {

            if (ChatLive_ClearChat) el.innerHTML = STR_CHAT_MESSAGE_DELETED;
            else el.innerHTML += STR_BR + STR_BR + STR_CHAT_MESSAGE_DELETED;

            Main_AddClassWitEle(el.parentElement, 'chat_purged');
            //Prevent duplicate removal
            el.id = '_';
        }
    }

}