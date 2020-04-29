//Variable initialization
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
var defaultColors = [
    "#FC4F4F", "#ff8736", "#ffd830", "#ffff35", "#81ff2c", "#2dff2d",
    "#21ff7a", "#0fffc0", "#0fffff", "#20cfff", "#4d9bff", "#ff74ff",
    "#ff93ff", "#ff63ab", "#63FFBF", "#A363FF", "#B3FF63", "#D463FF"
];

var defaultColorsLength = defaultColors.length;
var Chat_div = [];
var Chat_Position = 0;
var Chat_hasEnded = false;
var Chat_CleanMax = 60;
var Chat_JustStarted = true;
//Variable initialization end

function Chat_Preinit() {
    Chat_div[0] = document.getElementById('chat_box');
    Chat_div[1] = document.getElementById('chat_box2');
    ChatLive_LineAddCounter[0] = 0;
    ChatLive_LineAddCounter[1] = 0;
    ChatLive_Messages[0] = [];
    ChatLive_Messages[1] = [];
    Chat_loadBadgesGlobal();
}

function Chat_Init() {
    Chat_JustStarted = true;
    Chat_Clear();
    if (!Main_IsOnAndroid || Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }

    Chat_loadBadgesGlobal();

    Chat_Id[0] = (new Date()).getTime();
    ChatLive_selectedChannel_id[0] = Main_values.Main_selectedChannel_id;
    ChatLive_selectedChannel[0] = Main_values.Main_selectedChannel;
    ChatLive_SetOptions(0, Chat_Id[0]);

    Chat_loadChat(Chat_Id[0]);
}

var Chat_LoadGlobalBadges = false;
function Chat_loadBadgesGlobal() {
    //return;
    if (!Chat_LoadGlobalBadges) Chat_loadBadgesGlobalRequest(0);
    if (!extraEmotesDone.bbtvGlobal) Chat_loadBBTVGlobalEmotes(0);
    if (!extraEmotesDone.ffzGlobal) Chat_loadEmotesffz(0);
    ChatLiveControls_SetEmojisObj();
}

function Chat_BaseLoadUrl(theUrl, tryes, callbackSucess, calbackError) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                callbackSucess(xmlHttp.responseText);
            } else {
                calbackError(tryes);
            }
        }
    };

    xmlHttp.send(null);
}

function Chat_loadBadgesGlobalRequest(tryes) {
    Chat_BaseLoadUrl(
        'https://badges.twitch.tv/v1/badges/global/display',
        tryes,
        Chat_loadBadgesGlobalSuccess,
        Chat_loadBadgesGlobalError
    );
}

function Chat_loadBadgesGlobalError(tryes) {
    if (tryes < Chat_loadingDataTryMax) Chat_loadBadgesGlobalRequest(tryes + 1);
}

function Chat_loadBadgesGlobalSuccess(responseText) {
    var versions, property, version, new_img, doc = document.head;

    responseText = JSON.parse(responseText);

    for (property in responseText.badge_sets) {
        versions = responseText.badge_sets[property].versions;
        for (version in versions) {
            tagCSS(property + 0, version, versions[version].image_url_4x, doc);
            tagCSS(property + 1, version, versions[version].image_url_4x, doc);

            new_img = new Image();
            new_img.src = versions[version].image_url_4x;
        }
    }

    Chat_LoadGlobalBadges = true;
}

function Chat_loadBadgesTransform(responseText, chat_number, doc) {
    var versions, property, version, new_img;

    for (property in responseText.badge_sets) {
        versions = responseText.badge_sets[property].versions;
        for (version in versions) {
            tagCSS(property + chat_number, version, versions[version].image_url_4x, doc);

            new_img = new Image();
            new_img.src = versions[version].image_url_4x;
        }
    }
}

function Chat_loadBBTVGlobalEmotes(tryes) {
    Chat_BaseLoadUrl(
        'https://api.betterttv.net/2/emotes',
        tryes,
        Chat_loadEmotesSuccess,
        Chat_loadEmotesError
    );
}

function Chat_loadEmotesError(tryes) {
    if (tryes < Chat_loadingDataTryMax) Chat_loadBBTVGlobalEmotes(tryes + 1);
}

function Chat_loadEmotesSuccess(data) {
    ChatLive_loadEmotesbbtv(JSON.parse(data), 0, true);
}

function Chat_loadEmotesffz(tryes) {
    Chat_BaseLoadUrl(
        'https://api.frankerfacez.com/v1/set/global',
        tryes,
        Chat_loadEmotesSuccessffz,
        Chat_loadEmotesErrorffz
    );
}

function Chat_loadEmotesErrorffz(tryes) {
    if (tryes < Chat_loadingDataTryMax) Chat_loadEmotesffz(tryes + 1);
}

function Chat_loadEmotesSuccessffz(data) {
    ChatLive_loadEmotesffz(JSON.parse(data), 0, true);
}

function Chat_loadChat(id) {
    Chat_loadingDataTry = 0;
    if (Chat_Id[0] === id) Chat_loadChatRequest(id);
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
                if (Chat_Id[0] === id) Chat_loadChatSuccess(xmlHttp.responseText, id);
            } else {
                if (Chat_Id[0] === id) Chat_loadChatError(id);
            }
        }
    };

    xmlHttp.send(null);
}

function Chat_loadChatError(id) {
    Chat_loadingDataTry++;
    if (Chat_Id[0] === id) {
        if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadChatRequest(id);
        else {
            Chat_loadChatId = Main_setTimeout(
                function() {
                    Chat_loadChatRequest(id);
                },
                2500,
                Chat_loadChatId
            );
        }
    }
}

function Chat_loadChatSuccess(responseText, id) {
    responseText = JSON.parse(responseText);
    var div,
        mmessage, null_next = (Chat_next === null),
        nickColor,
        atstreamer,
        atuser,
        hasbits,
        message_text,
        comments, badges, fragment,
        i, len, j, len_j;

    if (null_next) {

        Chat_MessageVector('<span class="message">' + STR_LOADING_CHAT + Chat_title + STR_SPACE + STR_CHANNEL + ': ' +
            Main_values.Main_selectedChannelDisplayname + '</span>', 0);
        Chat_MessageVector('<span class="message">' + STR_CHAT_CONNECTED + '</span>', 0);
    }
    Chat_offset = 0;
    Chat_next = responseText._next;

    comments = responseText.comments;

    for (i = 0, len = comments.length; i < len; i++) {

        atstreamer = false;
        atuser = false;
        hasbits = false;
        message_text = '';

        div = '';
        mmessage = comments[i].message;

        if (!ChatLive_Highlight_Actions && mmessage.is_action) continue;

        //Add badges
        if (mmessage.hasOwnProperty('user_badges')) {

            for (j = 0, len_j = mmessage.user_badges.length; j < len_j; j++) {
                badges = mmessage.user_badges[j];

                div += '<span class="' + badges._id + "0-" + badges.version + ' tag"></span>';

            }
        }

        for (j = 0, len_j = mmessage.fragments.length; j < len_j; j++) {
            fragment = mmessage.fragments[j];

            if (fragment.hasOwnProperty('emoticon')) message_text += emoteTemplate(emoteURL(fragment.emoticon.emoticon_id));
            else {
                message_text +=
                    ChatLive_extraMessageTokenize(
                        [fragment.text],
                        0,
                        (hasbits ? mmessage.bits_spent : 0)
                    );

                if (!atstreamer && ChatLive_Highlight_AtStreamer && ChatLive_Channel_Regex_Search[0].test(fragment.text)) {
                    atstreamer = true;
                } else if (!atuser && ChatLive_Highlight_AtUser && ChatLive_User_Regex_Search.test(fragment.text)) {
                    atuser = true;
                }
            }

        }

        if (ChatLive_Highlight_User_send && Main_A_includes_B((comments[i].commenter.display_name).toLowerCase(), (AddUser_UsernameArray[0].name).toLowerCase())) {
            atuser = true;
        }

        hasbits = mmessage.hasOwnProperty('bits_spent') && cheers.hasOwnProperty(ChatLive_selectedChannel_id[0]);

        //Add nick
        if (atstreamer || (ChatLive_Highlight_Bits && hasbits)) {
            nickColor = chat_Line_highlight_green;
        } else if (atuser) {
            nickColor = chat_Line_highlight_blue;
        } else {

            if (!ChatLive_Custom_Nick_Color && mmessage.hasOwnProperty('user_color')) {
                nickColor = 'style="color: ' + calculateColorReplacement(mmessage.user_color) + ';"';
            } else {
                nickColor = 'style="color: ' + (defaultColors[(comments[i].commenter.display_name).charCodeAt(0) % defaultColorsLength]) + ';"';
            }

        }
        div += '<span ' + (mmessage.is_action ? ('class="class_bold" ' + nickColor) : '') + nickColor + '>' +
            comments[i].commenter.display_name + '</span>' + (mmessage.is_action ? '' : '&#58;') + '&nbsp;';

        //Add mesage
        div += '<span class="message' + (mmessage.is_action ? (' class_bold" ' + nickColor) : '"') + '>';
        div += message_text;

        div += '</span>';
        if (null_next) Chat_MessageVector(div, comments[i].content_offset_seconds, atstreamer, atuser, hasbits);
        else if (Chat_next !== undefined) Chat_MessageVectorNext(div, comments[i].content_offset_seconds, atstreamer, atuser, hasbits);

    }

    if (null_next && Chat_Id[0] === id) {
        Chat_JustStarted = false;
        Chat_Play(id);
        if (Chat_next !== undefined) Chat_loadChatNext(id); //if (Chat_next === undefined) chat has ended
    }
}

function Chat_MessageVector(message, time, atstreamer, atuser, hasbits) {
    Chat_Messages.push({
        time: time,
        message: message,
        atstreamer: atstreamer,
        atuser: atuser,
        hasbits: hasbits
    });
}

function Chat_MessageVectorNext(message, time, atstreamer, atuser, hasbits) {
    Chat_MessagesNext.push({
        time: time,
        message: message,
        atstreamer: atstreamer,
        atuser: atuser,
        hasbits: hasbits
    });
}

function Chat_Play(id) {
    if (!Chat_JustStarted && !Chat_hasEnded && Chat_Id[0] === id && !Main_values.Play_ChatForceDisable) {
        Main_Addline(id);
        Chat_addlinesId = Main_setInterval(
            function() {
                Main_Addline(id);
            },
            1000,
            Chat_addlinesId
        );
    }
}

function Chat_Pause() {
    Main_clearTimeout(Chat_loadChatId);
    Main_clearTimeout(Chat_loadChatNextId);
    Main_clearInterval(Chat_addlinesId);
}

function Chat_Clear() {
    // on exit cleanup the div
    Chat_hasEnded = false;
    Chat_Pause();
    Chat_Id[0] = 0;
    Main_empty('chat_box');
    Main_empty('chat_box2');
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
                var classname = 'chat_line';

                if (Chat_Messages[i].atstreamer) {

                    classname += ' chat_atstreamer';

                    Chat_Messages[i].message = Chat_Messages[i].message.replace(ChatLive_Channel_Regex_Replace[0], "<span style='color: #34B5FF; font-weight: bold'>$&</span>");

                } else if (Chat_Messages[i].atuser) {

                    classname += ' chat_atuser';

                    Chat_Messages[i].message = Chat_Messages[i].message.replace(ChatLive_User_Regex_Replace, "<span style='color: #34B5FF; font-weight: bold'>$&</span>");

                } else if (ChatLive_Highlight_Bits && Chat_Messages[i].hasbits) {

                    classname += ' chat_bits';

                } else if (ChatLive_Individual_Background) {

                    if (ChatLive_Individual_Background_flip[0]) {

                        if (ChatLive_Individual_Background === 1) {

                            var color = !Play_isFullScreen ? '100,100,100,' : '0, 0, 0,';
                            elem.style.backgroundColor = 'rgba(' + color + ' ' + Play_ChatBackground + ')';

                        } else if (ChatLive_Individual_Background === 2) {

                            elem.style.backgroundColor = 'rgba(100,100,100, ' + Play_ChatBackground + ')';

                        } else if (ChatLive_Individual_Background === 3) {

                            elem.style.backgroundColor = 'rgba(0,0,0, ' + Play_ChatBackground + ')';

                        }
                    }

                    ChatLive_Individual_Background_flip[0] = ChatLive_Individual_Background_flip[0] ^ 1;
                }

                if (chat_lineChatLive_Individual_Lines) classname += ' chat_line_ind';

                elem.className = classname;
                elem.innerHTML = Chat_Messages[i].message;
                Chat_div[0].appendChild(elem);
            } else {
                break;
            }
        }
    } else {
        Chat_Pause();
        if (Chat_next !== undefined) {
            //array.slice() may crash RangeError: Maximum call stack size exceeded
            Chat_Messages = Main_Slice(Chat_MessagesNext);

            Chat_Position = 0;
            Chat_Play(id);
            Chat_MessagesNext = [];

            if (Chat_Id[0] === id) Chat_loadChatNext(id);
            Chat_Clean(0);
        } else { //Chat has eneded
            var div = '&nbsp;';
            div += '<span class="message">';
            div += STR_BR + STR_BR + STR_CHAT_END + STR_BR + STR_BR;
            div += '</span>';

            elem = document.createElement('div');
            elem.className = 'chat_line';
            elem.innerHTML = div;

            if (!Chat_hasEnded) Chat_div[0].appendChild(elem);

            Chat_hasEnded = true;
            Main_clearInterval(Chat_addlinesId);
        }
    }
}

function Chat_loadChatNext(id) {
    Chat_loadingDataTry = 0;
    if (!Chat_hasEnded && Chat_Id[0] === id) Chat_loadChatNextRequest(id);
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
                if (!Chat_hasEnded && Chat_Id[0] === id) Chat_loadChatSuccess(xmlHttp.responseText, id);
            } else {
                if (!Chat_hasEnded && Chat_Id[0] === id) Chat_loadChatNextError(id);
            }
        }
    };

    xmlHttp.send(null);
}

function Chat_loadChatNextError(id) {
    Chat_loadingDataTry++;
    if (Chat_Id[0] === id) {
        if (Chat_loadingDataTry < Chat_loadingDataTryMax) Chat_loadChatNextRequest(id);
        else {
            Chat_loadChatNextId = Main_setTimeout(
                function() {
                    Chat_loadChatNextRequest(id);
                },
                2500,
                Chat_loadChatNextId
            );
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
    var linesToDelete = Chat_div[chat_number].getElementsByClassName("chat_line");
    if ((linesToDelete.length - Chat_CleanMax) > 0) {
        for (var i = 0; i < (linesToDelete.length - Chat_CleanMax); i++) {
            Chat_div[chat_number].removeChild(linesToDelete[0]);
        }
    }
}
