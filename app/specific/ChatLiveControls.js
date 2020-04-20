var ChatLiveControls_inputFocusId;
var ChatLiveControls_keyBoardOn = false;
var ChatLiveControls_cursor = 5;
var ChatLiveControls_Channel = 0;
var ChatLiveControls_LastChannel = '';

function ChatLiveControls_Show() {

    var streamer = !ChatLiveControls_Channel ? Play_data.data[1] : PlayExtra_data.data[1];

    if (ChatLive_Banned[ChatLiveControls_Channel]) {
        Play_showWarningDialog(STR_CHAT_BANNED + streamer, 1500);
        return;
    }

    document.body.removeEventListener("keydown", Play_handleKeyDown);
    document.body.removeEventListener("keydown", ChatLiveControls_handleKeyDown);
    document.body.addEventListener("keydown", ChatLiveControls_handleKeyDown, false);
    Main_ChatLiveInput.placeholder = STR_PLACEHOLDER_CHAT;
    ChatLiveControls_SetRoomState();
    Main_ShowElement('chat_send');
    Play_hidePanel();

    //Reset the chat result if streamer has changed

    if (!Main_A_equals_B(ChatLiveControls_LastChannel, streamer)) Main_ChatLiveInput.value = '';
    ChatLiveControls_LastChannel = streamer;

    if (Main_ChatLiveInput.value !== '' && Main_ChatLiveInput.value !== null) ChatLiveControls_UpdateResultText();
    else ChatLiveControls_UpdateResultTextEmpty();

    ChatLiveControls_inputFocus();
}

function ChatLiveControls_Hide() {
    ChatLiveControls_Channel = 0;
    ChatLiveControls_PreventInputClear();
    document.body.removeEventListener("keydown", ChatLiveControls_KeyboardEvent);
    document.body.removeEventListener("keydown", ChatLiveControls_handleKeyDown);
    document.body.removeEventListener("keydown", Play_handleKeyDown);
    document.body.addEventListener("keydown", Play_handleKeyDown, false);
    Main_HideElement('chat_send');
    Main_HideElement('chat_emotes_holder');
    ChatLiveControls_RemoveinputFocus(false);
}

function ChatLiveControls_RefreshRoomState(chat_number) {
    if (chat_number === ChatLiveControls_Channel) ChatLiveControls_SetRoomState();
}

function ChatLiveControls_SetRoomState() {
    var text = '';

    if (!ChatLive_RoomState[ChatLiveControls_Channel]) text = STR_UNKNOWN;
    else {

        var tags = ChatLive_RoomState[ChatLiveControls_Channel];

        if (tags.hasOwnProperty('emote-only') && tags['emote-only']) text += "Emote-only, ";

        //TODO convert this to strings
        if (tags.hasOwnProperty('followers-only') && tags['followers-only'] !== -1) {
            text += "Followers-only" + (tags['followers-only'] ? (' minimum ' + tags['followers-only'] + ' minute(s) fallowing') : '') + ', ';
        }

        if (tags.hasOwnProperty('rk9') && tags.rk9) text += 'R9K messages with more than 9 characters must be unique, ';

        if (tags.hasOwnProperty('slow') && tags.slow) {
            text += "Slow" + (tags.slow ? (' wait ' + tags.slow + ' second(s)  between sending messages') : '') + ', ';
        }

        if (tags.hasOwnProperty('subs-only') && tags['subs-only']) text += 'Subscribers-only, ';

        text = text.slice(0, -2);
    }

    var streamer = !ChatLiveControls_Channel ? Play_data.data[1] : PlayExtra_data.data[1];
    Main_innerHTML("chat_state", streamer + STR_SPACE + STR_CHAT_ROOMSTATE + STR_BR + (text === '' ? STR_CHAT_NO_RESTRICTIONS : text));
}

function ChatLiveControls_inputFocus() {
    if (ChatLiveControls_CanSend()) {
        ChatLiveControls_resetInputFocusTools();
        document.body.removeEventListener("keydown", ChatLiveControls_handleKeyDown);
        Main_ChatLiveInput.placeholder = STR_PLACEHOLDER_CHAT;

        window.clearTimeout(ChatLiveControls_inputFocusId);
        ChatLiveControls_inputFocusId = window.setTimeout(function() {
            Main_AddClassWitEle(Main_ChatLiveInput, 'chat_input_class_focus');
            Main_ChatLiveInput.focus();
            try {
                if (Main_IsOnAndroid) Android.KeyboardCheckAndHIde();
            } catch (e) {}
            ChatLiveControls_keyBoardOn = true;
            document.body.removeEventListener("keydown", ChatLiveControls_KeyboardEvent);
            document.body.addEventListener("keydown", ChatLiveControls_KeyboardEvent, false);
            //Set the avoidclicks only after focus
            Main_AddClass('scene_notify', 'avoidclicks');
            Main_AddClass('scenefeed', 'avoidclicks');
        }, 200);
    } else {
        ChatLiveControls_CantSend();
    }
}

function ChatLiveControls_removeEventListener() {
    if (Main_ChatLiveInput !== null) {
        var elClone = Main_ChatLiveInput.cloneNode(true);
        Main_ChatLiveInput.parentNode.replaceChild(elClone, Main_ChatLiveInput);
        Main_ChatLiveInput = document.getElementById("chat_send_input");
    }
}

function ChatLiveControls_RemoveinputFocus(EnaKeydown) {
    window.clearTimeout(ChatLiveControls_inputFocusId);
    if (!Main_isTV && Main_IsOnAndroid) Android.mhideSystemUI();

    Main_RemoveClass('scenefeed', 'avoidclicks');
    Main_RemoveClass('scene_notify', 'avoidclicks');
    Main_RemoveClassWithEle(Main_ChatLiveInput, 'chat_input_class_focus');
    Main_ChatLiveInput.blur();
    ChatLiveControls_removeEventListener();
    document.body.removeEventListener("keydown", ChatLiveControls_KeyboardEvent);
    Main_ChatLiveInput.placeholder = STR_PLACEHOLDER_CHAT;

    if (EnaKeydown) {
        document.body.removeEventListener("keydown", ChatLiveControls_handleKeyDown);
        document.body.addEventListener("keydown", ChatLiveControls_handleKeyDown, false);
    }

    ChatLiveControls_keyBoardOn = false;
}

function ChatLiveControls_KeyboardDismiss() {
    window.clearTimeout(ChatLiveControls_inputFocusId);
    ChatLiveControls_RemoveinputFocus(true);
    ChatLiveControls_cursor = 5;
    ChatLiveControls_refreshInputFocusTools();
}

function ChatLiveControls_refreshInputFocusTools() {
    ChatLiveControls_resetInputFocusTools();
    Main_AddClass('chat_send_button' + ChatLiveControls_cursor, 'button_chat_focused');
}

function ChatLiveControls_resetInputFocusTools() {
    for (var i = 0; i < 10; i++)
        Main_RemoveClass('chat_send_button' + i, 'button_chat_focused');
}

var ChatLiveControls_showWarningDialogId;
function ChatLiveControls_showWarningDialog(text, timeout) {
    Main_innerHTML("dialog_warning_chat_text", text);
    Main_ShowElement('dialog_warning_chat');

    window.clearTimeout(ChatLiveControls_showWarningDialogId);
    if (timeout) {
        ChatLiveControls_showWarningDialogId = window.setTimeout(function() {
            Main_HideElement('dialog_warning_chat');
        }, timeout);
    }
}

function ChatLiveControls_HandleKeyEnter() {
    if (!ChatLiveControls_cursor) Main_Log('ChatLiveControls_HandleKeyEnter options');
    if (ChatLiveControls_cursor === 1 && ChatLiveControls_CanSend()) {
        Main_ChatLiveInput.value = '';
        ChatLiveControls_UpdateResultTextEmpty();
    } else if (ChatLiveControls_cursor === 2 && ChatLiveControls_CheckEmoteStatus() && ChatLiveControls_CanSend()) {

        ChatLiveControls_SetEmojisDiv();

    } else if (ChatLiveControls_cursor === 3 && ChatLiveControls_CheckEmoteStatus() && ChatLiveControls_CanSend()) {

        ChatLiveControls_SetEmotesDiv(extraEmotesDone.bbtvGlobal, STR_CHAT_BBTV_GLOBAL);

    } else if (ChatLiveControls_cursor === 4 && ChatLiveControls_CheckEmoteStatus() && ChatLiveControls_CanSend()) {

        ChatLiveControls_SetEmotesDiv(extraEmotesDone.ffzGlobal, STR_CHAT_FFZ_GLOBAL);

    } else if (ChatLiveControls_cursor === 5) {
        if (Main_ChatLiveInput.value !== '' && Main_ChatLiveInput.value !== null) {
            if (ChatLiveControls_CanSend()) {
                ChatLive_FakeSendMessage(Main_ChatLiveInput.value, 0);
                Main_ChatLiveInput.value = '';
                ChatLiveControls_UpdateResultText();
            } else ChatLiveControls_CantSend();
        } else ChatLiveControls_showWarningDialog(STR_SEARCH_EMPTY, 1000);
    } else if (ChatLiveControls_cursor === 6 && ChatLiveControls_CheckEmoteStatus() && ChatLiveControls_CanSend()) {

        ChatLiveControls_UpdateTextInput('@' + (!ChatLiveControls_Channel ? Play_data.data[1] : PlayExtra_data.data[1]));

    } else if (ChatLiveControls_cursor === 7 && ChatLiveControls_CanSend()) {

        ChatLiveControls_SetEmotesDiv(userEmote, STR_CHAT_TW_EMOTES);

    } else if (ChatLiveControls_cursor === 8 && ChatLiveControls_CheckEmoteStatus() && ChatLiveControls_CanSend()) {

        ChatLiveControls_SetEmotesDiv(extraEmotesDone.bbtv[ChatLive_selectedChannel_id[ChatLiveControls_Channel]], STR_CHAT_BBTV_STREAM);

    } else if (ChatLiveControls_cursor === 9 && ChatLiveControls_CheckEmoteStatus() && ChatLiveControls_CanSend()) {

        ChatLiveControls_SetEmotesDiv(extraEmotesDone.ffz[ChatLive_selectedChannel_id[ChatLiveControls_Channel]], STR_CHAT_FFZ_STREAM);

    }
}

function ChatLiveControls_handleKeyDown(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
            ChatLiveControls_Hide();
            break;
        case KEY_LEFT:
            ChatLiveControls_cursor--;
            if (ChatLiveControls_cursor < 0) ChatLiveControls_cursor = 9;
            ChatLiveControls_refreshInputFocusTools();
            break;
        case KEY_RIGHT:
            ChatLiveControls_cursor++;
            if (ChatLiveControls_cursor > 9) ChatLiveControls_cursor = 0;
            ChatLiveControls_refreshInputFocusTools();
            break;
        case KEY_UP:
            if (ChatLiveControls_cursor > 4) {
                ChatLiveControls_cursor -= 5;
                ChatLiveControls_refreshInputFocusTools();
            } else {
                ChatLiveControls_inputFocus();
            }
            break;
        case KEY_DOWN:
            if (ChatLiveControls_cursor < 5) {
                ChatLiveControls_cursor += 5;
                ChatLiveControls_refreshInputFocusTools();
            } else {
                ChatLiveControls_inputFocus();
            }
            break;
        case KEY_ENTER:
            ChatLiveControls_HandleKeyEnter();
            break;
        default:
            break;
    }
}

function ChatLiveControls_KeyboardEvent(event) {
    ChatLiveControls_UpdateResultText();
    switch (event.keyCode) {
        case KEY_RETURN:
        case KEY_KEYBOARD_DONE:
        case KEY_DOWN:
        case KEY_UP:
            ChatLiveControls_KeyboardDismiss();
            break;
        default:
            break;
    }
}

var ChatLiveControls_EmotesTotal = 0;
var ChatLiveControls_EmotesPos = 0;
function ChatLiveControls_SetEmotesDiv(obj, text) {
    var array = [];

    for (var property in obj) {
        array.push(obj[property]);
    }

    if (array.length > 1) {
        Main_textContent("chat_emotes_text", text);
    } else {
        ChatLiveControls_showWarningDialog(STR_CHAT_EMOTE_EMPTY, 1000);
        return;
    }

    var direction = 1;

    if (direction) {//a-z
        array.sort(
            function(a, b) {
                return (a.code < b.code ? -1 : (a.code > b.code ? 1 : 0));
            }
        );
    } else {//z-a
        array.sort(
            function(a, b) {
                return (a.code > b.code ? -1 : (a.code < b.code ? 1 : 0));
            }
        );
    }

    var div_holder = document.getElementById('chat_emotes');
    Main_emptyWithEle(div_holder);

    ChatLiveControls_EmotesTotal = array.length;
    ChatLiveControls_EmotesPos = 0;

    for (var i = 0; i < ChatLiveControls_EmotesTotal; i++) {
        div_holder.appendChild(
            ChatLiveControls_SetEmoteDiv(array[i], i)
        );
    }

    ChatLiveControls_ShowEmotes();
}

function ChatLiveControls_SetEmoteDiv(obj, position) {

    var div = document.createElement('div');

    div.setAttribute('id', 'chat_emotes' + position);
    div.setAttribute(Main_DataAttribute, obj.code);
    div.classList.add('chat_emotes_img_holder');

    div.innerHTML = '<div ><div id="chat_emotes_img' + position + '" class="chat_emotes_img_div" ><img alt="" class="chat_emotes_img" src="' + obj['4x'] +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_BANNER +
        '\';"></div><div class="chat_emotes_name_holder"><div id="chat_emotes_name' + position + '" class="chat_emotes_name opacity_zero">' + obj.code + '</div></div></div>';

    return div;
}

function ChatLiveControls_SetEmojisDiv() {

    if (emojis && emojis.length > 1) {
        Main_textContent("chat_emotes_text", STR_CHAT_UNICODE_EMOJI);
    } else {
        ChatLiveControls_showWarningDialog(STR_CHAT_EMOTE_EMPTY, 1000);
        return;
    }

    var div_holder = document.getElementById('chat_emotes');
    Main_emptyWithEle(div_holder);

    ChatLiveControls_EmotesTotal = emojis.length;
    ChatLiveControls_EmotesPos = 0;

    for (var i = 0; i < ChatLiveControls_EmotesTotal; i++) {
        div_holder.appendChild(
            ChatLiveControls_SetEmojiDiv(emojis[i], i)
        );
    }

    ChatLiveControls_ShowEmotes();
}

function ChatLiveControls_SetEmojiDiv(obj, position) {

    var div = document.createElement('div');

    div.setAttribute('id', 'chat_emotes' + position);
    div.setAttribute(Main_DataAttribute, obj.unicode);
    div.classList.add('chat_emotes_img_holder');

    div.innerHTML = '<div ><div id="chat_emotes_img' + position + '" class="chat_emotes_img_div" ><img alt="" class="chat_emotes_img" src="' + twemoji.parseIcon(obj.unicode) +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_BANNER +
        '\';"></div><div class="chat_emotes_name_holder"><div id="chat_emotes_name' + position + '" class="chat_emotes_name opacity_zero">' + obj.tags + '</div></div></div>';

    return div;
}

function ChatLiveControls_ShowEmotes() {
    Main_ready(function() {
        document.body.removeEventListener("keydown", ChatLiveControls_KeyboardEvent);
        document.body.removeEventListener("keydown", ChatLiveControls_handleKeyDown);
        document.body.removeEventListener("keydown", ChatLiveControls_EmotesEvent);

        document.body.addEventListener("keydown", ChatLiveControls_EmotesEvent, false);
        ChatLiveControls_resetInputFocusTools();

        document.getElementById('chat_emotes').style.transform = '';
        ChatLiveControls_EmotesUpdateCounter(0);
        Main_ShowElement('chat_emotes_holder');
        ChatLiveControls_EmotesAddFocus(0);
    });
}

function ChatLiveControls_HideEmotes() {
    document.body.removeEventListener("keydown", ChatLiveControls_EmotesEvent);
    document.body.removeEventListener("keydown", ChatLiveControls_handleKeyDown);
    document.body.addEventListener("keydown", ChatLiveControls_handleKeyDown);

    Main_HideElement('chat_emotes_holder');
    ChatLiveControls_refreshInputFocusTools();
}

function ChatLiveControls_EmotesEvent(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
            ChatLiveControls_HideEmotes();
            break;
        case KEY_LEFT:
            ChatLiveControls_EmotesChangeFocus(ChatLiveControls_EmotesPos, -1);
            break;
        case KEY_RIGHT:
            ChatLiveControls_EmotesChangeFocus(ChatLiveControls_EmotesPos, 1);
            break;
        case KEY_UP:
            if (ChatLiveControls_EmotesPos < 20) ChatLiveControls_HideEmotes();
            else ChatLiveControls_EmotesChangeFocus(ChatLiveControls_EmotesPos, -20);
            break;
        case KEY_DOWN:
            ChatLiveControls_EmotesChangeFocus(ChatLiveControls_EmotesPos, 20);
            break;
        case KEY_ENTER:
            ChatLiveControls_AddToChat(ChatLiveControls_EmotesPos);
            break;
        default:
            break;
    }
}

function ChatLiveControls_AddToChat(position) {
    var doc = document.getElementById('chat_emotes' + position);
    if (doc) ChatLiveControls_UpdateTextInput(doc.getAttribute(Main_DataAttribute));
}

function ChatLiveControls_EmotesAddFocus(position) {
    Main_AddClass('chat_emotes_img' + position, 'chat_emotes_focus');
    ChatLiveControls_EmotesUpdateCounter(ChatLiveControls_EmotesPos);
    Main_RemoveClass('chat_emotes_name' + position, 'opacity_zero');
}

function ChatLiveControls_EmotesRemoveFocus(position) {
    Main_RemoveClass('chat_emotes_img' + position, 'chat_emotes_focus');
    Main_AddClass('chat_emotes_name' + position, 'opacity_zero');
}

function ChatLiveControls_EmotesChangeFocus(position, adder) {
    var doc = document.getElementById('chat_emotes' + (position + adder));
    if (doc) {
        ChatLiveControls_EmotesRemoveFocus(position);
        ChatLiveControls_EmotesPos += adder;
        ChatLiveControls_EmotesAddFocus(ChatLiveControls_EmotesPos);
        ChatLiveControls_EmotesScroll(ChatLiveControls_EmotesPos);
    } else if (adder > 0) { //go to last of next line
        var postion_now = parseInt(position / 20);
        var postion_down = (postion_now + 1) * 20;

        if (document.getElementById('chat_emotes' + postion_down)) {
            ChatLiveControls_EmotesRemoveFocus(position);
            ChatLiveControls_EmotesPos = ChatLiveControls_EmotesTotal - 1;
            ChatLiveControls_EmotesAddFocus(ChatLiveControls_EmotesPos);
            ChatLiveControls_EmotesScroll(ChatLiveControls_EmotesPos);
        }
    }
}

function ChatLiveControls_EmotesUpdateCounter(position) {
    Main_textContent('chat_emotes_counter', (position + 1) + '/' + ChatLiveControls_EmotesTotal);
}

function ChatLiveControls_EmotesScroll(position) {

    if (position > 39) {

        var postion_now = parseInt(position / 20);
        var postion_down = (postion_now + 2) * 20;
        var postion_up = (postion_now - 1) * 20;

        var how_much = document.getElementById('chat_emotes' + postion_up).offsetHeight;

        if (document.getElementById('chat_emotes' + postion_down)) {

            document.getElementById('chat_emotes').style.transform = 'translateY(-' + (how_much * (postion_now - 1)) + 'px)';

        }
    } else document.getElementById('chat_emotes').style.transform = '';
}

function ChatLiveControls_UpdateTextInput(text) {
    if (Main_ChatLiveInput.value !== '' && Main_ChatLiveInput.value !== null && !(Main_ChatLiveInput.value).endsWith(' ')) Main_ChatLiveInput.value += ' ';
    Main_ChatLiveInput.value += text;
    ChatLiveControls_UpdateResultText();
}

var ChatLiveControls_UpdateResultTextId;
function ChatLiveControls_UpdateResultText() {

    window.clearTimeout(ChatLiveControls_UpdateResultTextId);
    // delay the check to prevent lag on fun call spaming
    ChatLiveControls_UpdateResultTextId = window.setTimeout(function() {

        if (Main_ChatLiveInput.value !== '' && Main_ChatLiveInput.value !== null) {

            Main_innerHTML("chat_result_text", ChatLiveControls_extraMessageTokenize([Main_ChatLiveInput.value]));

        } else ChatLiveControls_UpdateResultTextEmpty();

    }, 10);
}
function ChatLiveControls_UpdateResultTextEmpty() {
    Main_textContent("chat_result_text", '');
}

function ChatLiveControls_extraMessageTokenize(message) {

    for (var i = 0; i < message.length; i++) {
        message[i] = extraMessageTokenize(message[i], 0, null);
    }

    return '<span class="message">' + twemoji.parse(message.join(' '), true, true) + '</span>';
}

function ChatLiveControls_CheckEmoteStatus() {

    var tags = ChatLive_RoomState[ChatLiveControls_Channel];

    if (tags && tags.hasOwnProperty('emote-only') && tags['emote-only']) {
        ChatLiveControls_showWarningDialog(STR_CHAT_EMOTE_ONLY, 1500);
        return false;
    }

    return true;
}

function ChatLiveControls_ShowChooseChat() {
    document.body.removeEventListener("keydown", Play_handleKeyDown);
    document.body.removeEventListener("keydown", ChatLiveControls_ChooseChat);
    document.body.addEventListener("keydown", ChatLiveControls_ChooseChat, false);

    Main_textContent("chat_choose_dialog_text", STR_CHAT_CHOOSE);
    Main_textContent("chat_choose_dialog0", Play_data.data[1]);
    Main_textContent("chat_choose_dialog1", PlayExtra_data.data[1]);
    ChatLiveControls_ChooseChatChannel = 0;

    Main_ShowElement('chat_choose');
    ChatLiveControls_ChooseChatFocus(0);
}

function ChatLiveControls_ChooseChatFocus(position) {
    Main_AddClass('chat_choose_dialog' + position, 'button_dialog_focused');
    Main_RemoveClass('chat_choose_dialog' + (position ^ 1), 'button_dialog_focused');

}

function ChatLiveControls_HideChooseChat() {
    document.body.removeEventListener("keydown", ChatLiveControls_ChooseChat);
    Main_HideElement('chat_choose');
}

var ChatLiveControls_ChooseChatChannel = 0;
function ChatLiveControls_ChooseChat(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
            ChatLiveControls_HideChooseChat();
            ChatLiveControls_Hide();
            break;
        case KEY_RIGHT:
        case KEY_LEFT:
            ChatLiveControls_ChooseChatChannel = ChatLiveControls_ChooseChatChannel ^ 1;
            ChatLiveControls_ChooseChatFocus(ChatLiveControls_ChooseChatChannel);
            break;
        case KEY_ENTER:
            ChatLiveControls_HideChooseChat();
            ChatLiveControls_Channel = ChatLiveControls_ChooseChatChannel;
            ChatLiveControls_Show();
            break;
        default:
            break;
    }
}

// function ChatLiveControls_EmotesOnlyEnabled(position) {
//     var tags = ChatLive_RoomState[position];

//     return tags && tags.hasOwnProperty('emote-only') && tags['emote-only'];
// }

// function ChatLiveControls_rk9Enabled(position) {
//     var tags = ChatLive_RoomState[position];

//     return tags && tags.hasOwnProperty('rk9') && tags.rk9;
// }

// function ChatLiveControls_slowEnabled(position) {
//     var tags = ChatLive_RoomState[position];

//     return tags && tags.hasOwnProperty('slow') && tags.slow;
// }

// function ChatLiveControls_slowEnableTime(position) {
//     var tags = ChatLive_RoomState[position];

//     return (tags && tags.hasOwnProperty('slow')) ? tags.slow : 0;
// }

// function ChatLiveControls_FallowersOnlyEnabled(position) {
//     var tags = ChatLive_RoomState[position];

//     return tags && tags.hasOwnProperty('followers-only') && tags['followers-only'] !== -1;
// }

// function ChatLiveControls_FallowersOnlyTime(position) {
//     var tags = ChatLive_RoomState[position];

//     return (tags && tags.hasOwnProperty('followers-only')) ? tags['followers-only'] : 0;
// }

// function ChatLiveControls_SubOnlyEnabled(position) {
//     var tags = ChatLive_RoomState[position];

//     return tags && tags.hasOwnProperty('subs-only') && tags['subs-only'];
// }

function ChatLiveControls_CantSend() {
    window.clearTimeout(ChatLiveControls_inputFocusId);
    ChatLiveControls_RemoveinputFocus(true);
    ChatLiveControls_refreshInputFocusTools();
}

var ChatLiveControls_CanSendText = '';
var ChatLiveControls_CanSendBool = true;

function ChatLiveControls_CanSend() {
    ChatLiveControls_CanSendText = '';
    ChatLiveControls_CanSendBool = true;
    var streamer = (!ChatLiveControls_Channel ? Play_data.data[1] : PlayExtra_data.data[1]);

    if (ChatLive_Banned[ChatLiveControls_Channel]) {

        ChatLiveControls_CanSendText = STR_CHAT_BANNED + streamer;
        ChatLiveControls_CanSendBool = false;
        ChatLiveControls_PreventInput();

        return false;

    } else if (ChatLive_RoomState[ChatLiveControls_Channel]) {

        var tags = ChatLive_RoomState[ChatLiveControls_Channel];
        var user_fallow = ChatLive_FollowState[ChatLiveControls_Channel];

        var user_sub = ChatLive_SubState[ChatLiveControls_Channel];
        var user_issub = user_sub && user_sub.hasOwnProperty('state') && !user_sub.state;

        if (tags.hasOwnProperty('subs-only') && tags['subs-only'] && user_issub) {

            ChatLiveControls_CanSendText = 'Chat Subscribers-only mode ' + STR_IS_SUB_NOT_SUB;
            ChatLiveControls_CanSendBool = false;
            ChatLiveControls_PreventInput();

            return false;
        }

        if (tags.hasOwnProperty('followers-only') && tags['followers-only'] !== -1 && user_fallow) {

            if ((tags['followers-only'] > -1) && user_fallow.hasOwnProperty('follows') && !user_fallow.follows) {

                ChatLiveControls_CanSendText = STR_CHAT_FOLLOWER_ONLY + streamer;
                ChatLiveControls_CanSendBool = false;
                ChatLiveControls_PreventInput();

                return false;

            } else if (tags['followers-only'] && user_fallow.hasOwnProperty('created_at') && (tags['followers-only'] > ChatLive_GetMinutes(user_fallow.created_at))) {

                ChatLiveControls_CanSendText = "Followers-only" + (tags['followers-only'] ? (' minimum ' + tags['followers-only'] + ' minute(s) fallowing') : '') +
                    ' ' + STR_CHAT_FOLLOWER_ONLY_USER_TIME + ChatLive_GetMinutes(user_fallow.created_at);
                ChatLiveControls_CanSendBool = false;
                ChatLiveControls_PreventInput();

                return false;
            }
        }

    }

    return true;
}

function ChatLiveControls_PreventInput() {
    Main_RemoveClassWithEle(Main_ChatLiveInput, 'chat_input_class_focus');
    Main_AddClassWitEle(Main_ChatLiveInput, 'chat_input_class_block');
    Main_ChatLiveInput.value = ChatLiveControls_CanSendText;
    ChatLiveControls_showWarningDialog(ChatLiveControls_CanSendText, 1000)
    ChatLiveControls_UpdateResultTextEmpty();
}

function ChatLiveControls_PreventInputClear() {
    if (Main_A_includes_B(Main_ChatLiveInput.className, 'chat_input_class_block')) {
        Main_RemoveClassWithEle(Main_ChatLiveInput, 'chat_input_class_block');
        Main_ChatLiveInput.value = '';
        ChatLiveControls_UpdateResultTextEmpty();
    }
}