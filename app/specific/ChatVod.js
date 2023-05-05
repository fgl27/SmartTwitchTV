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
var Chat_Messages = [];
var Chat_MessagesNext = [];
var Chat_addlinesId;
var Chat_cursor = null;
var Chat_loadChatId;
var Chat_loadChatNextId;
var Chat_offset = 0;
var Chat_fakeClock = 0;
var Chat_fakeClockOld = 0;
var Chat_title = '';
var defaultColors = [
    '#FC4F4F',
    '#ff8736',
    '#ffd830',
    '#ffff35',
    '#81ff2c',
    '#2dff2d',
    '#21ff7a',
    '#0fffc0',
    '#0fffff',
    '#20cfff',
    '#4d9bff',
    '#ff74ff',
    '#ff93ff',
    '#ff63ab',
    '#63FFBF',
    '#A363FF',
    '#B3FF63',
    '#D463FF'
];

var defaultColorsLength = defaultColors.length;
var Chat_div = [];
var Chat_Position = 0;
var Chat_hasEnded = false;
var Chat_CleanMax = 60;
var Chat_JustStarted = true;
var Chat_comment_ids = {};

var Chat_loadChatRequestPost =
    '{"operationName":"VideoCommentsByOffsetOrCursor","variables":{"videoID":"%v","contentOffsetSeconds":%o},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"b70a3591ff0f4e0313d126c6a1502d79a1c02baebb288227c582044aa76adf6a"}}}';
// var Chat_loadChatRequestPost_Cursor =
//     '{"operationName":"VideoCommentsByOffsetOrCursor","variables":{"videoID":"%v","cursor":"%c"},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"b70a3591ff0f4e0313d126c6a1502d79a1c02baebb288227c582044aa76adf6a"}}}';

var Chat_UserJPKRegex = new RegExp('[^\x00-\x7F]', 'g');

//Variable initialization end

function Chat_Preinit() {
    Chat_div[0] = Main_getElementById('chat_box0');
    Chat_div[1] = Main_getElementById('chat_box1');
    ChatLive_LineAddCounter[0] = 0;
    ChatLive_LineAddCounter[1] = 0;
    ChatLive_Messages[0] = [];
    ChatLive_Messages[1] = [];
    ChatLive_Latency[0] = 0;
    ChatLive_Latency[0] = 1;
}

function Chat_Init() {
    Chat_JustStarted = true;

    Chat_Clear();
    if (Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }

    if (!Main_IsOn_OSInterface) {
        Chat_StartFakeClock();
    }

    Chat_loadBadgesGlobal();

    ChatLive_SetOptions(0, Main_values.Main_selectedChannel_id, Main_values.Main_selectedChannel);

    Chat_loadChat(Chat_Id[0]);
}

var Chat_StartFakeClockId;
var Chat_StartFakeClockAdd = 1;
function Chat_StartFakeClock() {
    Chat_fakeClock = PlayClip_isOn ? 0 : Chat_offset;

    if (Play_isOn) {
        if (Play_LowLatency) Chat_fakeClock = Play_LowLatency === 1 ? 24 : 26;
        else Chat_fakeClock = 15;
    }

    Chat_StartFakeClockAdd = 1;
    Chat_StartFakeClockInterval();
    ChatLive_Playing = true;
}

function Chat_StartFakeClockInterval() {
    Chat_StartFakeClockId = Main_setInterval(
        function () {
            if (PlayClip_isOn) {
                try {
                    Chat_fakeClock = clip_player.currentTime;
                    Play_BufferSize = Chat_fakeClock + clip_player.buffered.end(0);
                } catch (e) {
                    console.log('Chat_StartFakeClockInterval e ' + e);
                }
            } else if (embedPlayer && PlayVod_isOn) {
                try {
                    var player = embedPlayer.getPlayer(),
                        time = player.getCurrentTime();

                    if (time > Chat_fakeClock + 10 || time < Chat_fakeClock - 10) {
                        //console.log('chat restart time ' + time + ' Chat_fakeClock ' + Chat_fakeClock);

                        Chat_fakeClock = time;
                        Chat_offset = Chat_fakeClock;

                        Chat_Init();

                        return;
                    }

                    Chat_fakeClock = time;
                } catch (e) {
                    console.log('Chat_StartFakeClockInterval e ' + e);
                }
            } else if (PlayVod_isOn) {
                if (Chat_fakeClockOld > Chat_fakeClock + 10 || Chat_fakeClockOld < Chat_fakeClock - 10) {
                    //console.log('chat restart time ' + Chat_fakeClockOld + ' Chat_fakeClock ' + Chat_fakeClock);

                    Chat_fakeClockOld = Chat_fakeClock;
                    Chat_offset = Chat_fakeClock;

                    Chat_Init();

                    return;
                }

                Chat_fakeClock += Chat_StartFakeClockAdd;
                Chat_fakeClockOld = Chat_fakeClock;
                Play_BufferSize = Chat_fakeClock / 2;
            }

            if (Play_isOn && Chat_fakeClock > 28) {
                if (Play_LowLatency) Chat_fakeClock = Play_LowLatency === 1 ? 24 : 26;
                else Chat_fakeClock = 15;
            }
        },
        1000,
        Chat_StartFakeClockId
    );
}

var Chat_GlobalBadges = null;
function Chat_loadBadgesGlobal() {
    //return;
    if (!extraEmotesDone.bttvGlobal) Chat_loadBTTVGlobalEmotes();
    if (!extraEmotesDone.ffzGlobal) Chat_loadEmotesffz();
    if (!extraEmotesDone.Seven_tvGlobal) Chat_loadSeven_tvGlobalEmotes();

    ChatLiveControls_Set();
}

function Chat_BaseLoadUrl(theUrl, callbackSucess, calbackError) {
    BaseXmlHttpGet(theUrl, callbackSucess, calbackError);
}

function Chat_loadBadgesGlobalRequest(chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;

    if (!Chat_GlobalBadges) {
        BaseXmlHttpGet('https://badges.twitch.tv/v1/badges/global/display', Chat_loadBadgesGlobalSuccess, noop_fun, chat_number, id);
    } else {
        if (!Chat_GlobalBadges[ChatLive_selectedChannel_id[chat_number]]) {
            Chat_GlobalBadges[ChatLive_selectedChannel_id[chat_number]] = Chat_GlobalBadges[0].replace(
                /\%x/g,
                ChatLive_selectedChannel_id[chat_number]
            );
        }

        Chat_tagCSS(Chat_GlobalBadges[ChatLive_selectedChannel_id[chat_number]], Chat_div[chat_number]);
    }
}

function Chat_loadBadgesGlobalSuccess(responseText, chat_number, id) {
    if (id !== Chat_Id[chat_number]) return;

    Chat_GlobalBadges = {};

    Chat_GlobalBadges[0] = Chat_loadBadgesTransform(JSON.parse(responseText), '%x');
    Chat_GlobalBadges[ChatLive_selectedChannel_id[chat_number]] = Chat_GlobalBadges[0].replace(/\%x/g, ChatLive_selectedChannel_id[chat_number]);

    Chat_tagCSS(Chat_GlobalBadges[ChatLive_selectedChannel_id[chat_number]], Chat_div[chat_number]);
}

function Chat_loadBadgesTransform(responseText, id, checkSubMissing) {
    var versions,
        property,
        version,
        innerHTML = '',
        versionInt;

    for (property in responseText.badge_sets) {
        versions = responseText.badge_sets[property].versions;

        for (version in versions) {
            innerHTML += Chat_BasetagCSS(property + id, version, Chat_BasetagCSSUrl(versions[version].image_url_4x));

            //some channel may be missing 0 3 6 12 etc badges but they have 2000 2003 etc
            if (checkSubMissing) {
                versionInt = parseInt(version) - parseInt(version.toString()[0]) * Math.pow(10, version.length - 1);

                if (versionInt > -1 && !versions.hasOwnProperty(versionInt)) {
                    innerHTML += Chat_BasetagCSS(property + id, versionInt, Chat_BasetagCSSUrl(versions[version].image_url_4x));
                }
            }
        }
    }

    return innerHTML;
}

function Chat_BasetagCSS(type, version, url) {
    //a prevent class starting with numbers
    return '.a' + type + '-' + version + url;
}

function Chat_BasetagCSSUrl(url) {
    //a prevent class starting with numbers
    return ' { background-image: url("' + url.replace('http:', 'https:') + '"); }';
}

function Chat_tagCSS(content, doc) {
    Main_ready(function () {
        var style = document.createElement('style');
        style.innerHTML = content;
        doc.insertBefore(style, doc.childNodes[0]);
    });
}

function Chat_loadBTTVGlobalEmotes() {
    Chat_BaseLoadUrl('https://api.betterttv.net/3/cached/emotes/global', Chat_loadEmotesSuccessBttv, noop_fun);
}

function Chat_loadEmotesSuccessBttv(data) {
    Chat_loadEmotesbttvGlobal(JSON.parse(data));
}

function Chat_loadEmotesbttvGlobal(data) {
    extraEmotesDone.bttvGlobal = {};

    var url, chat_div, id;

    try {
        data.forEach(function (emote) {
            url = ChatLive_Base_BTTV_url + emote.id + '/3x';
            chat_div = emoteTemplate(url);
            id = emote.code + emote.id;

            extraEmotes[emote.code] = {
                code: emote.code,
                id: id,
                chat_div: chat_div,
                '4x': url
            };

            extraEmotesDone.bttvGlobal[emote.code] = {
                code: emote.code,
                id: id,
                chat_div: chat_div,
                '4x': url
            };
        });
    } catch (e) {
        Main_Log('Chat_loadEmotesbttvGlobal ' + e);
    }
}

function Chat_loadSeven_tvGlobalEmotes() {
    Chat_BaseLoadUrl('https://api.7tv.app/v2/emotes/global', Chat_loadEmotesSuccessSeven_tv, noop_fun);
}

function Chat_loadEmotesSuccessSeven_tv(data) {
    ChatLive_loadEmotesseven_tv(JSON.parse(data), 0, true);
}

function Chat_loadEmotesffz() {
    Chat_BaseLoadUrl('https://api.frankerfacez.com/v1/set/global', Chat_loadEmotesSuccessffz, noop_fun);
}

function Chat_loadEmotesSuccessffz(data) {
    ChatLive_loadEmotesffz(JSON.parse(data), 0, true);
}

function Chat_loadChat(id) {
    if (Chat_Id[0] === id) Chat_loadChatRequest(id);
}

function Chat_loadChatRequest(id) {
    chat_next_offset = Chat_offset ? parseInt(Chat_offset) : 0;
    FullxmlHttpGet(
        PlayClip_BaseUrl,
        Play_base_backup_headers_Array,
        Chat_loadChatRequestResult,
        noop_fun,
        id,
        0,
        'POST', //Method, null for get
        Chat_loadChatRequestPost.replace('%v', Main_values.ChannelVod_vodId).replace('%o', chat_next_offset)
    );
    chat_next_offset++;
}

function Chat_loadChatRequestResult(responseObj, id) {
    if (Chat_hasEnded || Chat_Id[0] !== id) return;

    if (responseObj.status === 200) {
        Chat_loadChatSuccess(responseObj.responseText, id);
    } else {
        Chat_loadChatError(id);
    }
}

function Chat_loadChatError(id) {
    if (Chat_Id[0] === id) {
        Chat_loadChatId = Main_setTimeout(
            function () {
                var time = OSInterface_gettime() / 1000;
                if (time && time < Chat_offset) Chat_offset = time;

                Chat_loadChatRequest(id, 0);
            },
            2500,
            Chat_loadChatId
        );
    }
}

function Chat_loadChatSuccess(responseObj, id) {
    var responseText = JSON.parse(responseObj),
        comments;

    var duplicatedCounter = 0,
        div,
        mmessage,
        null_next = Chat_cursor === null,
        nickColor,
        atstreamer,
        atuser,
        fromstreamer,
        mod,
        hasbits,
        message_text,
        badges,
        fragment,
        i,
        len,
        j,
        len_j,
        messageObj;

    if (responseText.data && responseText.data.video && responseText.data.video.comments && responseText.data.video.comments.edges) {
        comments = responseText.data.video.comments.edges || [];
        Chat_cursor = comments.length ? comments[0].cursor : '';
    } else {
        return;
    }

    if (null_next) {
        Chat_MessageVector({
            chat_number: 0,
            time: 0,
            message:
                '<span class="message">' +
                STR_LOADING_CHAT +
                STR_SPACE_HTML +
                Main_values.Main_selectedChannelDisplayname +
                STR_SPACE_HTML +
                Chat_title +
                '</span>'
        });

        Chat_MessageVector({
            chat_number: 0,
            time: 0,
            message: '<span class="message">' + STR_CHAT_CONNECTED + '</span>'
        });
    }
    Chat_offset = 0;

    for (i = 0, len = comments.length; i < len; i++) {
        comments[i] = comments[i].node;
        if (Chat_comment_ids[comments[i].id]) {
            duplicatedCounter++;
            continue;
        }
        Chat_comment_ids[comments[i].id] = true;

        //some comments have no commenter I assume those have ben deleted during live chat but not fully from chat history
        if (!comments[i].commenter) continue;

        atstreamer = false;
        atuser = false;
        fromstreamer = false;
        mod = false;
        hasbits = false;
        message_text = '';

        div = '';
        mmessage = comments[i].message;

        //TODO check support for this feature
        // if (
        //     (!ChatLive_Highlight_Actions && mmessage.is_action) ||
        //     (ChatLive_HideBots &&
        //         (KnowBots[comments[i].commenter.displayName] ||
        //             (mmessage.body && mmessage.body.startsWith('!') && mmessage.body.indexOf(' ') === -1)))
        // ) {
        //     continue;
        // }

        if (ChatLive_Show_TimeStamp) {
            div += Play_timeS(comments[i].contentOffsetSeconds) + ' ';
        }

        //Add badges
        if (mmessage.hasOwnProperty('userBadges')) {
            for (j = 0, len_j = mmessage.userBadges.length; j < len_j; j++) {
                badges = mmessage.userBadges[j];

                div += '<span class="a' + badges.setID + ChatLive_selectedChannel_id[0] + '-' + badges.version + ' tag"></span>';

                if (ChatLive_Highlight_Mod && Main_A_includes_B(badges.setID, 'mod')) {
                    mod = true;
                }
            }
        }

        //TODO check support for this feature
        //hasbits = mmessage.hasOwnProperty('bits_spent') && cheers.hasOwnProperty(ChatLive_selectedChannel_id[0]);

        if (mmessage.fragments) {
            for (j = 0, len_j = mmessage.fragments.length; j < len_j; j++) {
                fragment = mmessage.fragments[j];

                if (fragment.emote) message_text += emoteTemplate(emoteURL(fragment.emote.emoteID));
                else {
                    message_text += ChatLive_extraMessageTokenize([fragment.text], 0, hasbits ? mmessage.bits_spent : 0);

                    if (!atstreamer && ChatLive_Highlight_AtStreamer && ChatLive_Channel_Regex_Search[0].test(fragment.text)) {
                        atstreamer = true;
                    } else if (!atuser && ChatLive_Highlight_AtUser && ChatLive_User_Regex_Search.test(fragment.text)) {
                        atuser = true;
                    }
                }
            }
        }

        if (ChatLive_Highlight_FromStreamer && Main_A_equals_B(comments[i].commenter.displayName.toLowerCase(), ChatLive_selectedChannel[0])) {
            fromstreamer = true;
        } else if (
            ChatLive_Highlight_User_send &&
            Main_A_equals_B(comments[i].commenter.displayName.toLowerCase(), AddUser_UsernameArray[0].display_name.toLowerCase())
        ) {
            atuser = true;
        }

        //Add nick
        if (atstreamer || (ChatLive_Highlight_Bits && hasbits) || mod || fromstreamer) {
            nickColor = chat_Line_highlight_green;
        } else if (atuser) {
            nickColor = chat_Line_highlight_blue;
        } else {
            if (!ChatLive_Custom_Nick_Color && mmessage.userColor) {
                nickColor = 'style="color: ' + mmessage.userColor + ';"';
            } else {
                nickColor = 'style="color: ' + defaultColors[comments[i].commenter.displayName.charCodeAt(0) % defaultColorsLength] + ';"';
            }
        }
        div +=
            '<span ' +
            (mmessage.is_action ? 'class="class_bold" ' + nickColor : '') +
            nickColor +
            '>' +
            comments[i].commenter.displayName +
            Chat_CheckUserName(comments[i].commenter.displayName, comments[i].commenter.login) +
            '</span>' +
            (mmessage.is_action ? '' : '&#58;') +
            '&nbsp;';

        //Add mesage
        div += '<span class="message' + (mmessage.is_action ? ' class_bold" ' + nickColor : '"') + '>' + message_text + '</span>';

        messageObj = {
            chat_number: 0,
            time: comments[i].contentOffsetSeconds,
            message: div,
            atstreamer: atstreamer,
            atuser: atuser,
            mod: mod,
            fromstreamer: fromstreamer,
            hasbits: hasbits && ChatLive_Highlight_Bits
        };

        if (null_next) Chat_MessageVector(messageObj);
        else if (Chat_cursor !== '') Chat_MessageVectorNext(messageObj);
    }

    chat_next_offset = comments[comments.length - 1].contentOffsetSeconds;

    //Iff all msg received are duplicated run again as it will run with a diff offset
    if (duplicatedCounter >= comments.length && Chat_cursor !== '') {
        Chat_loadChatNext(id);
    }

    if (null_next && Chat_Id[0] === id) {
        Chat_JustStarted = false;
        Chat_Play(id);
        if (Chat_cursor !== '') Chat_loadChatNext(id); //if (Chat_cursor === '') chat has ended
    }
}

function Chat_CheckUserName(displayName, login) {
    if (displayName && Chat_UserJPKRegex.test(displayName)) {
        return ' (' + login + ')';
    }

    return '';
}

function Chat_MessageVector(messageObj) {
    Chat_Messages.push(messageObj);
}

function Chat_MessageVectorNext(messageObj) {
    Chat_MessagesNext.push(messageObj);
}

function Chat_Play(id) {
    if (!Chat_JustStarted && !Chat_hasEnded && Chat_Id[0] === id && !Main_values.Play_ChatForceDisable) {
        Main_Addline(id);
        Chat_addlinesId = Main_setInterval(
            function () {
                Main_Addline(id);
            },
            1000,
            Chat_addlinesId
        );

        if (!Main_IsOn_OSInterface) {
            Chat_StartFakeClockInterval();
        }
    }
}

function Chat_Pause() {
    Main_clearTimeout(Chat_loadChatId);
    Main_clearTimeout(Chat_loadChatNextId);
    Main_clearInterval(Chat_addlinesId);
    Main_clearInterval(Chat_StartFakeClockId);
}

function Chat_Clear() {
    // on exit cleanup the div
    Chat_hasEnded = false;
    Chat_Pause();
    Chat_Id[0] = 0;
    Main_emptyWithEle(Chat_div[0]);
    Main_emptyWithEle(Chat_div[1]);
    Chat_cursor = null;
    Chat_Messages = [];
    Chat_MessagesNext = [];
    Chat_Position = 0;
    chat_next_offset = 0;
    chat_next_offset_old = 0;
    Chat_comment_ids = {};
    ChatLive_ClearIds(0);
    ChatLive_ClearIds(1);
    ChatLive_resetChatters(0);
}

function Main_Addline(id) {
    var i,
        len = Chat_Messages.length;

    if (Chat_Position < len - 1) {
        i = Chat_Position;
        for (i; i < len; i++, Chat_Position++) {
            if (Chat_Messages[i].time < ChannelVod_vodOffset + OSInterface_gettime() / 1000) {
                ChatLive_ElemntAdd(Chat_Messages[i]);
            } else {
                break;
            }
        }
    } else {
        if (Chat_cursor !== '') {
            //array.slice() may crash RangeError: Maximum call stack size exceeded
            Chat_Messages = Main_Slice(Chat_MessagesNext);

            Chat_Position = 0;

            Chat_MessagesNext = [];

            if (Chat_Id[0] === id) Chat_loadChatNext(id);
            Chat_Clean(0);
        } else {
            //Chat has ended

            if (!Chat_hasEnded) {
                ChatLive_ElemntAdd({
                    chat_number: 0,
                    message: '&nbsp;<span class="message">' + STR_BR + STR_BR + STR_CHAT_END + STR_BR + STR_BR + '</span>'
                });
            }

            Chat_hasEnded = true;
            Main_clearInterval(Chat_addlinesId);
        }
    }
}

function Chat_loadChatNext(id) {
    if (!Chat_hasEnded && Chat_Id[0] === id) Chat_loadChatNextRequest(id);
}

var chat_next_offset = 0;
var chat_next_offset_old = 0;

function Chat_loadChatNextRequest(id) {
    if (Chat_cursor === '') return;

    if (chat_next_offset_old === chat_next_offset) {
        chat_next_offset++;
    }
    chat_next_offset_old = chat_next_offset;

    FullxmlHttpGet(
        PlayClip_BaseUrl,
        Play_base_backup_headers_Array,
        Chat_loadChatNextResult,
        noop_fun,
        id,
        0,
        'POST', //Method, null for get
        Chat_loadChatRequestPost.replace('%v', Main_values.ChannelVod_vodId).replace('%o', chat_next_offset ? parseInt(chat_next_offset) : 0)
    );
}

function Chat_loadChatNextResult(responseObj, id) {
    if (Chat_hasEnded || Chat_Id[0] !== id) return;

    if (responseObj.status === 200) {
        Chat_loadChatSuccess(responseObj.responseText, id);
    } else {
        Chat_loadChatNextError(id);
    }
}

function Chat_loadChatNextError(id) {
    if (Chat_Id[0] === id) {
        Chat_loadChatNextId = Main_setTimeout(
            function () {
                Chat_loadChatNextRequest(id, 0);
            },
            2500,
            Chat_loadChatNextId
        );
    }
}

function Chat_NoVod() {
    Chat_Clear();
    Chat_SingleLine(STR_NO_BROADCAST_WARNING + STR_BR + STR_NO_CHAT);

    if (!Main_IsOn_OSInterface) {
        Chat_StartFakeClock();
    }
}

function Chat_Disable() {
    Chat_Clear();
    Chat_SingleLine(STR_CHAT_DISABLE);
}

function Chat_SingleLine(Line) {
    var div = '&nbsp;';
    div += '<span class="message">';
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
    var linesToDelete = Chat_div[chat_number].getElementsByClassName('chat_line_holder'),
        i = 0,
        len = linesToDelete.length - Chat_CleanMax;

    for (i; i < len; i++) {
        Chat_div[chat_number].removeChild(linesToDelete[0]);
    }
}
