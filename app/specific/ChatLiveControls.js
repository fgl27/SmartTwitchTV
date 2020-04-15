var ChatLiveControls_inputFocusId;
var ChatLiveControls_keyBoardOn = false;
var ChatLiveControls_cursor = 4;
var ChatLiveControls_Channel = 0;

function ChatLiveControls_Show() {
    document.body.removeEventListener("keydown", Play_handleKeyDown);
    document.body.addEventListener("keydown", ChatLiveControls_handleKeyDown, false);
    Main_ChatLiveInput.placeholder = STR_PLACEHOLDER_CHAT;
    ChatLiveControls_SetRoomState();
    Main_ShowElement('chat_send');
    Play_hidePanel();

    Main_innerHTML("chat_result_text", STR_SPACE);

    ChatLiveControls_inputFocus();
}

function ChatLiveControls_Hide() {
    document.body.removeEventListener("keydown", ChatLiveControls_KeyboardEvent);
    document.body.removeEventListener("keydown", ChatLiveControls_handleKeyDown);
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

        if (ChatLive_RoomState[ChatLiveControls_Channel]['emote-only']) text += "Emote-only, ";
        if (ChatLive_RoomState[ChatLiveControls_Channel]['followers-only'] !== -1) {
            text += "Followers-only" + (
                ChatLive_RoomState[ChatLiveControls_Channel]['followers-only'] ? (' minimum ' + ChatLive_RoomState[ChatLiveControls_Channel]['followers-only'] + ' minute(s) fallowing') : '') + ', ';
        }
        if (ChatLive_RoomState[ChatLiveControls_Channel].rk9) text += 'R9K messages with more than 9 characters must be unique, ';
        if (ChatLive_RoomState[ChatLiveControls_Channel].slow) {
            text += "Slow" + (
                ChatLive_RoomState[ChatLiveControls_Channel].slow ? (' wait ' + ChatLive_RoomState[ChatLiveControls_Channel].slow + ' second(s)  between sending messages') : '') + ', ';
        }
        if (ChatLive_RoomState[ChatLiveControls_Channel]['subs-only']) text += 'Subscribers-only, ';

        text = text.slice(0, -2);
    }

    var streamer = !ChatLiveControls_Channel ? Play_data.data[1] : PlayExtra_data.data[1];
    Main_innerHTML("chat_state", streamer + STR_SPACE + STR_CHAT_ROOMSTATE + STR_BR + (text === '' ? STR_CHAT_NO_RESTRICTIONS : text));
}

function ChatLiveControls_inputFocus() {
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
        document.body.addEventListener("keydown", ChatLiveControls_KeyboardEvent, false);
        //Set the avoidclicks only after focus
        Main_AddClass('scene_notify', 'avoidclicks');
        Main_AddClass('scenefeed', 'avoidclicks');
    }, 250);

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

    if (EnaKeydown) document.body.addEventListener("keydown", ChatLiveControls_handleKeyDown, false);
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
    for (var i = 0; i < 9; i++)
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
    if (!ChatLiveControls_cursor) console.log('options');
    if (ChatLiveControls_cursor === 1) {
        Main_ChatLiveInput.value = '';
        Main_innerHTML("chat_result_text", STR_SPACE);
    } else if (ChatLiveControls_cursor === 2) {
        console.log('tw emotes');
        ChatLiveControls_SetEmotesDiv(userEmote, STR_CHAT_TW_EMOTES);
    } else if (ChatLiveControls_cursor === 3) {
        console.log('bbtv global');
        ChatLiveControls_SetEmotesDiv(extraEmotesDone.bbtvGlobal, STR_CHAT_BBTV_GLOBAL);
    } else if (ChatLiveControls_cursor === 4) {
        console.log('ffz global');
        ChatLiveControls_SetEmotesDiv(extraEmotesDone.ffzGlobal, STR_CHAT_FFZ_GLOBAL);
    } else if (ChatLiveControls_cursor === 5) {
        if (Main_ChatLiveInput.value !== '' && Main_ChatLiveInput.value !== null) {
            var sen_text = Main_ChatLiveInput.value;
            Main_ChatLiveInput.value = '';
            ChatLive_FakeSendMessage(sen_text, 0);
        } else ChatLiveControls_showWarningDialog(STR_SEARCH_EMPTY, 1000);
    } else if (ChatLiveControls_cursor === 6) {
        Main_ChatLiveInput.value += '@' + (!ChatLiveControls_Channel ? Play_data.data[1] : PlayExtra_data.data[1]) + ' ';
        ChatLiveControls_inputFocus();
    } else if (ChatLiveControls_cursor === 7) {
        console.log('bbtv stream');
        ChatLiveControls_SetEmotesDiv(extraEmotesDone.bbtv[ChatLive_selectedChannel_id[ChatLiveControls_Channel]], STR_CHAT_BBTV_STREAM);
    } else if (ChatLiveControls_cursor === 8) {
        console.log('ffz stream');
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
            if (ChatLiveControls_cursor < 0) ChatLiveControls_cursor = 8;
            ChatLiveControls_refreshInputFocusTools();
            break;
        case KEY_RIGHT:
            ChatLiveControls_cursor++;
            if (ChatLiveControls_cursor > 8) ChatLiveControls_cursor = 0;
            ChatLiveControls_refreshInputFocusTools();
            break;
        case KEY_UP:
            if (ChatLiveControls_cursor > 4) {
                ChatLiveControls_cursor -= 4;
                ChatLiveControls_refreshInputFocusTools();
            } else {
                ChatLiveControls_inputFocus();
            }
            break;
        case KEY_DOWN:
            if (ChatLiveControls_cursor < 5) {
                ChatLiveControls_cursor += 4;
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

function ChatLiveControls_SetEmotesDiv(array, text) {

    if (array && array.length > 1) {
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

    for (var i = 0; i < array.length; i++) {
        div_holder.appendChild(
            ChatLiveControls_SetEmoteDiv(array[i], i)
        );
    }

    Main_ShowElement('chat_emotes_holder');
}

function ChatLiveControls_SetEmoteDiv(obj, position) {

    var div = document.createElement('div');

    div.setAttribute('id', 'chat_emotes' + position);
    div.setAttribute(Main_DataAttribute, JSON.stringify(obj));
    div.classList.add('chat_emotes_img_holer');

    div.innerHTML = '<div ><img alt="" class="chat_emotes_img" src="' + obj['4x'] +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_BANNER +
        '\';"><div class="chat_emotes_name_holder"><div class="chat_emotes_name">' + obj.code + '</div></div></div>';

    return div;
}