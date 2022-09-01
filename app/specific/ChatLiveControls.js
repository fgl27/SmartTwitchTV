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

var ChatLiveControls_inputFocusId;
var ChatLiveControls_keyBoardOn = false;
var ChatLiveControls_cursor_default = 6;
var ChatLiveControls_cursor_size = 11;
var ChatLiveControls_cursor_half_size = parseInt((ChatLiveControls_cursor_size + 1) / 2);
var ChatLiveControls_cursor = ChatLiveControls_cursor_default;
var ChatLiveControls_Channel = 0;
var ChatLiveControls_LastChannel = '';

var ChatLiveControls_Cursor_Options;
var ChatLiveControls_Cursor_Delete;
var ChatLiveControls_Cursor_Emojis;
var ChatLiveControls_Cursor_BTTV_Global;
var ChatLiveControls_Cursor_FFZ_Global;
var ChatLiveControls_Cursor_7TV_Global;
var ChatLiveControls_Cursor_SEND;
var ChatLiveControls_Cursor_AT_STREAMER;
var ChatLiveControls_Cursor_Twitch_Emotes;
var ChatLiveControls_Cursor_BTTV_STREAMER;
var ChatLiveControls_Cursor_FFZ_STREAMER;
var ChatLiveControls_Cursor_7TV_STREAMER;

function ChatLiveControls_Set() {
    ChatLiveControls_SetEmojisObj();

    var temp_controls_pos = 0;

    ChatLiveControls_Cursor_Options = temp_controls_pos++;
    ChatLiveControls_Cursor_Delete = temp_controls_pos++;
    ChatLiveControls_Cursor_Emojis = temp_controls_pos++;
    ChatLiveControls_Cursor_BTTV_Global = temp_controls_pos++;
    ChatLiveControls_Cursor_FFZ_Global = temp_controls_pos++;
    ChatLiveControls_Cursor_7TV_Global = temp_controls_pos++;
    ChatLiveControls_Cursor_SEND = temp_controls_pos++;
    ChatLiveControls_Cursor_AT_STREAMER = temp_controls_pos++;
    ChatLiveControls_Cursor_Twitch_Emotes = temp_controls_pos++;
    ChatLiveControls_Cursor_BTTV_STREAMER = temp_controls_pos++;
    ChatLiveControls_Cursor_FFZ_STREAMER = temp_controls_pos++;
    ChatLiveControls_Cursor_7TV_STREAMER = temp_controls_pos++;
}

function ChatLiveControls_Show() {
    var streamer = !ChatLiveControls_Channel ? Play_data.data[1] : PlayExtra_data.data[1];

    if (ChatLive_Banned[ChatLiveControls_Channel]) {
        Play_showWarningMiddleDialog(STR_CHAT_BANNED + streamer, 1500);
        return;
    }

    Main_removeEventListener('keydown', Play_handleKeyDown);
    Main_addEventListener('keydown', ChatLiveControls_handleKeyDown);
    Main_ChatLiveInput.placeholder = STR_PLACEHOLDER_CHAT;
    ChatLiveControls_SetRoomState();
    Main_ShowElement('chat_send');
    Play_hidePanel();

    //Reset the chat result if streamer has changed

    if (!Main_A_equals_B(ChatLiveControls_LastChannel, streamer)) Main_ChatLiveInput.value = '';
    ChatLiveControls_LastChannel = streamer;

    if (Main_ChatLiveInput.value !== '' && Main_ChatLiveInput.value !== null) ChatLiveControls_UpdateResultText();
    else ChatLiveControls_UpdateResultTextEmpty();

    if (OptionsShowObj.force_show_chat_write.defaultValue && !Play_isChatShown()) Play_controls[Play_controlsChat].enterKey(1);

    ChatLiveControls_inputFocus();
}

function ChatLiveControls_Hide() {
    ChatLiveControls_Channel = 0;
    ChatLiveControls_PreventInputClear();
    Main_removeEventListener('keydown', ChatLiveControls_KeyboardEvent);
    Main_removeEventListener('keydown', ChatLiveControls_handleKeyDown);
    Main_removeEventListener('keydown', ChatLiveControls_EmotesEvent);
    Main_removeEventListener('keydown', ChatLiveControls_ChooseChat);
    Main_removeEventListener('keydown', ChatLiveControls_OptionsKeyDown);

    Main_addEventListener('keydown', Play_handleKeyDown);

    Main_HideElement('chat_send');
    Main_HideElement('chat_emotes_holder');
    Main_HideElement('dialog_warning_chat');
    Main_HideElement('chat_choose');
    Main_HideElement('chat_options');

    ChatLiveControls_RemoveinputFocus(false);
}

function ChatLiveControls_RefreshRoomState(chat_number) {
    if (chat_number === ChatLiveControls_Channel) {
        ChatLiveControls_SetRoomState();
        if (Main_isElementShowing('chat_send') && !ChatLiveControls_CanSend()) ChatLiveControls_CantSend();
    }
}

function ChatLiveControls_SetRoomState() {
    var text = '';

    if (!ChatLive_RoomState[ChatLiveControls_Channel]) text = STR_UNKNOWN;
    else {
        var tags = ChatLive_RoomState[ChatLiveControls_Channel];

        if (tags.hasOwnProperty('emote-only') && tags['emote-only']) text += 'Emote-only, ';

        if (tags.hasOwnProperty('rk9') && tags.rk9) text += 'R9K messages with more than 9 characters must be unique, ';

        if (tags.hasOwnProperty('slow') && tags.slow) {
            text += 'Slow' + (tags.slow ? ' wait ' + tags.slow + ' second(s)  between sending messages' : '') + ', ';
        }

        if (tags.hasOwnProperty('subs-only') && tags['subs-only']) text += 'Subscribers-only, ';

        //TODO convert this to strings
        if (tags.hasOwnProperty('followers-only') && tags['followers-only'] !== -1) {
            text += 'Followers-only' + (tags['followers-only'] ? ' minimum ' + tags['followers-only'] + ' minute(s) fallowing' : '') + ', ';
        }

        text = text.slice(0, -2);
    }

    var streamer = !ChatLiveControls_Channel ? Play_data.data[1] : PlayExtra_data.data[1];
    Main_innerHTML('chat_state', streamer + STR_SPACE_HTML + STR_CHAT_ROOMSTATE + STR_BR + (text === '' ? STR_CHAT_NO_RESTRICTIONS : text));
}

function ChatLiveControls_inputFocus() {
    if (ChatLiveControls_CanSend()) {
        ChatLiveControls_resetInputFocusTools();
        Main_removeEventListener('keydown', ChatLiveControls_handleKeyDown);
        Main_ChatLiveInput.placeholder = STR_PLACEHOLDER_CHAT;

        ChatLiveControls_inputFocusId = Main_setTimeout(
            function () {
                OSInterface_AvoidClicks(true);
                Main_AddClassWitEle(Main_ChatLiveInput, 'chat_input_class_focus');
                Main_ChatLiveInput.focus();
                if (Main_IsOn_OSInterface) {
                    if (OptionsShowObj.keyboard_options.defaultValue === 1) OSInterface_KeyboardCheckAndHIde();
                    else if (OptionsShowObj.keyboard_options.defaultValue === 2) OSInterface_hideKeyboardFrom();
                }
                ChatLiveControls_keyBoardOn = true;
                Main_addEventListener('keydown', ChatLiveControls_KeyboardEvent);
                //Set the avoidclicks only after focus
                Main_AddClass('scene_keys', 'avoidclicks');
                Main_AddClass('scenefeed', 'avoidclicks');
            },
            200,
            ChatLiveControls_inputFocusId
        );
    } else {
        ChatLiveControls_CantSend();
    }
}

function ChatLiveControls_removeEventListener() {
    if (Main_ChatLiveInput !== null) {
        var elClone = Main_ChatLiveInput.cloneNode(true);
        Main_ChatLiveInput.parentNode.replaceChild(elClone, Main_ChatLiveInput);
        Main_ChatLiveInput = Main_getElementById('chat_send_input');
    }
}

function ChatLiveControls_RemoveinputFocus(EnaKeydown) {
    Main_clearTimeout(ChatLiveControls_inputFocusId);
    if (!Main_isTV && Main_IsOn_OSInterface) OSInterface_mhideSystemUI();

    Main_RemoveClass('scenefeed', 'avoidclicks');
    Main_RemoveClass('scene_keys', 'avoidclicks');
    OSInterface_AvoidClicks(false);
    Main_RemoveClassWithEle(Main_ChatLiveInput, 'chat_input_class_focus');
    Main_ChatLiveInput.blur();
    ChatLiveControls_removeEventListener();
    Main_removeEventListener('keydown', ChatLiveControls_KeyboardEvent);
    Main_ChatLiveInput.placeholder = STR_PLACEHOLDER_CHAT;

    if (EnaKeydown) {
        Main_addEventListener('keydown', ChatLiveControls_handleKeyDown);
    }

    ChatLiveControls_keyBoardOn = false;
}

function ChatLiveControls_KeyboardDismiss() {
    Main_clearTimeout(ChatLiveControls_inputFocusId);
    ChatLiveControls_RemoveinputFocus(true);
    ChatLiveControls_cursor = ChatLiveControls_cursor_default;
    ChatLiveControls_refreshInputFocusTools();
}

function ChatLiveControls_refreshInputFocusTools() {
    ChatLiveControls_resetInputFocusTools();
    Main_AddClass('chat_send_button' + ChatLiveControls_cursor, 'button_chat_focused');
}

function ChatLiveControls_resetInputFocusTools() {
    for (var i = 0; i < ChatLiveControls_cursor_size + 1; i++) Main_RemoveClass('chat_send_button' + i, 'button_chat_focused');
}

var ChatLiveControls_showWarningDialogId;
function ChatLiveControls_showWarningDialog(text, timeout) {
    Main_innerHTML('dialog_warning_chat_text', text);
    Main_ShowElement('dialog_warning_chat');

    Main_clearTimeout(ChatLiveControls_showWarningDialogId);

    if (timeout) {
        ChatLiveControls_showWarningDialogId = Main_setTimeout(function () {
            Main_HideElement('dialog_warning_chat');
        }, timeout);
    }
}

function ChatLiveControls_HandleKeyEnter() {
    switch (ChatLiveControls_cursor) {
        case ChatLiveControls_Cursor_Options:
            ChatLiveControls_OptionsShow();

            break;
        case ChatLiveControls_Cursor_Delete:
            Main_ChatLiveInput.value = '';
            ChatLiveControls_UpdateResultTextEmpty();

            break;
        case ChatLiveControls_Cursor_Emojis:
            ChatLiveControls_SetEmotesDiv(emojis, STR_CHAT_UNICODE_EMOJI, 'unicode');

            break;
        case ChatLiveControls_Cursor_BTTV_Global:
            ChatLiveControls_SetEmotesDiv(extraEmotesDone.bttvGlobal, STR_CHAT_BTTV_GLOBAL, 'code');

            break;
        case ChatLiveControls_Cursor_FFZ_Global:
            ChatLiveControls_SetEmotesDiv(extraEmotesDone.ffzGlobal, STR_CHAT_FFZ_GLOBAL, 'code');

            break;
        case ChatLiveControls_Cursor_7TV_Global:
            ChatLiveControls_SetEmotesDiv(extraEmotesDone.seven_tvGlobal, STR_CHAT_SEVENTV_GLOBAL, 'code');

            break;
        case ChatLiveControls_Cursor_SEND:
            if (Main_ChatLiveInput.value !== '' && Main_ChatLiveInput.value !== null) {
                if (ChatLiveControls_CanSend()) {
                    if (ChatLive_SendMessage(Main_ChatLiveInput.value, ChatLiveControls_Channel)) {
                        Main_ChatLiveInput.value = '';
                        ChatLiveControls_UpdateResultTextEmpty();
                    } else {
                        ChatLiveControls_showWarningDialog(STR_CHAT_NOT_READY, 1500);
                    }
                } else {
                    ChatLiveControls_CantSend();
                }
            } else {
                ChatLiveControls_showWarningDialog(STR_SEARCH_EMPTY, 1000);
            }

            break;
        case ChatLiveControls_Cursor_AT_STREAMER:
            ChatLiveControls_UpdateTextInput('@' + (!ChatLiveControls_Channel ? Play_data.data[1] : PlayExtra_data.data[1]));

            break;
        case ChatLiveControls_Cursor_Twitch_Emotes:
            ChatLiveControls_SetEmotesDiv(userEmote[AddUser_UsernameArray[0].id], STR_CHAT_TW_EMOTES, 'code');

            break;
        case ChatLiveControls_Cursor_BTTV_STREAMER:
            ChatLiveControls_SetEmotesDiv(extraEmotesDone.bttv[ChatLive_selectedChannel_id[ChatLiveControls_Channel]], STR_CHAT_BTTV_STREAM, 'code');

            break;
        case ChatLiveControls_Cursor_FFZ_STREAMER:
            ChatLiveControls_SetEmotesDiv(extraEmotesDone.ffz[ChatLive_selectedChannel_id[ChatLiveControls_Channel]], STR_CHAT_FFZ_STREAM, 'code');

            break;
        case ChatLiveControls_Cursor_7TV_STREAMER:
            ChatLiveControls_SetEmotesDiv(
                extraEmotesDone.seven_tv[ChatLive_selectedChannel_id[ChatLiveControls_Channel]],
                STR_CHAT_SEVENTV_STREAM,
                'code'
            );

            break;
        default:
            break;
    }
}

function ChatLiveControls_handleKeyDown(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
            ChatLiveControls_Hide();
            break;
        case KEY_LEFT:
            ChatLiveControls_cursor--;
            if (ChatLiveControls_cursor < 0) ChatLiveControls_cursor = ChatLiveControls_cursor_size;
            ChatLiveControls_refreshInputFocusTools();
            break;
        case KEY_RIGHT:
            ChatLiveControls_cursor++;
            if (ChatLiveControls_cursor > ChatLiveControls_cursor_size) ChatLiveControls_cursor = 0;
            ChatLiveControls_refreshInputFocusTools();
            break;
        case KEY_UP:
            if (ChatLiveControls_cursor > ChatLiveControls_cursor_half_size - 1) {
                ChatLiveControls_cursor -= ChatLiveControls_cursor_half_size;
                ChatLiveControls_refreshInputFocusTools();
            } else {
                ChatLiveControls_inputFocus();
            }
            break;
        case KEY_DOWN:
            if (ChatLiveControls_cursor < ChatLiveControls_cursor_half_size) {
                ChatLiveControls_cursor += ChatLiveControls_cursor_half_size;
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
var ChatLiveControls_EmotesArray = [];

function ChatLiveControls_SetEmotesDiv(obj, text, prop) {
    var array = [];

    for (var property in obj) {
        array.push(obj[property]);
    }

    if (array.length > 1) {
        Main_textContent('chat_emotes_text', text);
    } else {
        ChatLiveControls_showWarningDialog(STR_CHAT_EMOTE_EMPTY, 1000);
        return;
    }

    var direction = OptionsShowObj.emote_sorting.defaultValue;

    if (direction === 1) {
        //a-z
        array.sort(function (a, b) {
            return a.code < b.code ? -1 : a.code > b.code ? 1 : 0;
        });
    } else if (direction === 2) {
        //z-a
        array.sort(function (a, b) {
            return a.code > b.code ? -1 : a.code < b.code ? 1 : 0;
        });
    }

    var div_holder = Main_getElementById('chat_emotes'),
        i = 0,
        create_elements = Boolean(!array[0].hasOwnProperty('div'));

    Main_emptyWithEle(div_holder);

    ChatLiveControls_EmotesTotal = array.length;
    ChatLiveControls_EmotesPos = 0;
    ChatLiveControls_EmotesArray = [];

    //Create the first 40 elem's and show the holder div, after add the rest
    //To prevent not update the UI for the whole div creation that can be +500 elem
    var len = Math.min(ChatLiveControls_EmotesTotal, 39);

    for (i; i < len; i++) {
        ChatLiveControls_CreateEmoteDiv(array, i, create_elements, prop, div_holder);
    }

    ChatLiveControls_ShowEmotes();

    if (i < ChatLiveControls_EmotesTotal) {
        Main_setTimeout(function () {
            for (i; i < ChatLiveControls_EmotesTotal; i++) {
                ChatLiveControls_CreateEmoteDiv(array, i, create_elements, prop, div_holder);
            }
        }, 10);
    }
}

function ChatLiveControls_CreateEmoteDiv(array, pos, create_elements, prop, div_holder) {
    ChatLiveControls_EmotesArray.push(array[pos].id);

    if (create_elements || !array[pos].div) {
        array[pos].div = ChatLiveControls_SetEmoteDiv(array[pos]['4x'], array[pos].id, array[pos][prop], array[pos].code);
    }

    div_holder.appendChild(array[pos].div);
}

function ChatLiveControls_SetEmoteDiv(url, id, code, name) {
    var div = document.createElement('div');
    div.setAttribute('id', 'chat_emotes' + id);
    div.setAttribute(Main_DataAttribute, code);
    div.classList.add('chat_emotes_img_holder');

    div.innerHTML =
        '<div id="chat_emotes_img' +
        id +
        '" class="chat_emotes_img_div" ><img alt="" class="chat_emotes_img" src="' +
        url +
        '" onerror="this.onerror=null;this.src=\'' +
        IMG_404_BANNER +
        '\';"></div><div class="chat_emotes_name_holder"><div id="chat_emotes_name' +
        id +
        '" class="chat_emotes_name opacity_zero">' +
        name +
        '</div></div>';

    return div;
}

function ChatLiveControls_SetEmojisObj() {
    emojis = JSON.parse(emojis_string);

    //gen the array in canse is needed
    // for (i = 0; i < emojis.length; i++) {

    //     emojis[i]['4x'] = twemoji.parseIcon(emojis[i].unicode);
    //     emojis[i].id = emojis[i].id + '_' + emojis[i].code;

    // }

    // console.log(JSON.stringify(emojis));
}

function ChatLiveControls_ShowEmotes() {
    Main_ready(function () {
        Main_removeEventListener('keydown', ChatLiveControls_KeyboardEvent);
        Main_removeEventListener('keydown', ChatLiveControls_handleKeyDown);

        Main_addEventListener('keydown', ChatLiveControls_EmotesEvent);

        Main_getElementById('chat_emotes').style.transform = '';
        ChatLiveControls_EmotesUpdateCounter(0);
        Main_ShowElement('chat_emotes_holder');
        ChatLiveControls_EmotesAddFocus(0);
    });
}

function ChatLiveControls_HideEmotes() {
    Main_removeEventListener('keydown', ChatLiveControls_EmotesEvent);
    Main_addEventListener('keydown', ChatLiveControls_handleKeyDown);

    Main_HideElement('chat_emotes_holder');
    ChatLiveControls_EmotesRemoveFocus(ChatLiveControls_EmotesPos);
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
            if (
                (ChatLiveControls_cursor === ChatLiveControls_Cursor_Twitch_Emotes || ChatLiveControls_CanSendAnyEmote()) &&
                ChatLiveControls_CanSend()
            )
                ChatLiveControls_AddToChat(ChatLiveControls_EmotesPos);
            break;
        default:
            break;
    }
}

function ChatLiveControls_AddToChat(position) {
    var doc = Main_getElementById('chat_emotes' + ChatLiveControls_EmotesArray[position]);
    if (doc) ChatLiveControls_UpdateTextInput(doc.getAttribute(Main_DataAttribute));
}

function ChatLiveControls_EmotesAddFocus(position) {
    Main_AddClass('chat_emotes_img' + ChatLiveControls_EmotesArray[position], 'chat_emotes_focus');
    ChatLiveControls_EmotesUpdateCounter(ChatLiveControls_EmotesPos);
    Main_RemoveClass('chat_emotes_name' + ChatLiveControls_EmotesArray[position], 'opacity_zero');
}

function ChatLiveControls_EmotesRemoveFocus(position) {
    Main_RemoveClass('chat_emotes_img' + ChatLiveControls_EmotesArray[position], 'chat_emotes_focus');
    Main_AddClass('chat_emotes_name' + ChatLiveControls_EmotesArray[position], 'opacity_zero');
}

function ChatLiveControls_EmotesChangeFocus(position, adder) {
    if (ChatLiveControls_EmotesArray[position + adder]) {
        ChatLiveControls_EmotesRemoveFocus(position);
        ChatLiveControls_EmotesPos += adder;
        ChatLiveControls_EmotesAddFocus(ChatLiveControls_EmotesPos);
        ChatLiveControls_EmotesScroll(ChatLiveControls_EmotesPos);
    } else if (adder > 0) {
        //go to last of next line
        var postion_now = parseInt(position / 20);
        var postion_down = (postion_now + 1) * 20;

        if (ChatLiveControls_EmotesArray[postion_down]) {
            ChatLiveControls_EmotesRemoveFocus(position);
            ChatLiveControls_EmotesPos = ChatLiveControls_EmotesTotal - 1;
            ChatLiveControls_EmotesAddFocus(ChatLiveControls_EmotesPos);
            ChatLiveControls_EmotesScroll(ChatLiveControls_EmotesPos);
        }
    }
}

function ChatLiveControls_EmotesUpdateCounter(position) {
    Main_textContent('chat_emotes_counter', position + 1 + '/' + ChatLiveControls_EmotesTotal);
}

function ChatLiveControls_EmotesScroll(position) {
    if (position > 39) {
        var postion_now = parseInt(position / 20);
        var postion_down = (postion_now + 2) * 20;
        var postion_up = (postion_now - 1) * 20;

        var how_much = Main_getElementById('chat_emotes' + ChatLiveControls_EmotesArray[postion_up]).offsetHeight;

        if (ChatLiveControls_EmotesArray[postion_down]) {
            Main_getElementById('chat_emotes').style.transform = 'translateY(-' + how_much * (postion_now - 1) + 'px)';
        }
    } else Main_getElementById('chat_emotes').style.transform = '';
}

function ChatLiveControls_UpdateTextInput(text) {
    if (Main_ChatLiveInput.value !== '' && Main_ChatLiveInput.value !== null && !Main_endsWith(Main_ChatLiveInput.value, ' '))
        Main_ChatLiveInput.value += ' ';
    Main_ChatLiveInput.value += text + ' ';
    ChatLiveControls_UpdateResultText();
}

var ChatLiveControls_UpdateResultTextId;
function ChatLiveControls_UpdateResultText() {
    // delay the check to prevent lag on fun call spaming
    ChatLiveControls_UpdateResultTextId = Main_setTimeout(
        function () {
            if (Main_ChatLiveInput.value !== '' && Main_ChatLiveInput.value !== null) {
                Main_innerHTML('chat_result_text', ChatLiveControls_extraMessageTokenize([Main_ChatLiveInput.value]));
            } else ChatLiveControls_UpdateResultTextEmpty();
        },
        10,
        ChatLiveControls_UpdateResultTextId
    );
}
function ChatLiveControls_UpdateResultTextEmpty() {
    Main_textContent('chat_result_text', '');
}

function ChatLiveControls_extraMessageTokenize(message) {
    var i = 0,
        len = message.length;
    for (i; i < len; i++) {
        message[i] = extraMessageTokenize(message[i], 0, null);
    }

    return '<span class="message">' + twemoji.parse(message.join(' '), true, true) + '</span>';
}

function ChatLiveControls_CanSendAnyEmote() {
    var tags = ChatLive_RoomState[ChatLiveControls_Channel];

    if (tags && tags.hasOwnProperty('emote-only') && tags['emote-only']) {
        ChatLiveControls_showWarningDialog(STR_CHAT_EMOTE_ONLY, 1500);
        return false;
    }

    return true;
}

function ChatLiveControls_ShowChooseChat() {
    Main_removeEventListener('keydown', Play_handleKeyDown);
    Main_addEventListener('keydown', ChatLiveControls_ChooseChat);

    Main_textContent('chat_choose_dialog_text', STR_CHAT_CHOOSE);
    Main_textContent('chat_choose_dialog0', Play_data.data[1]);
    Main_textContent('chat_choose_dialog1', PlayExtra_data.data[1]);
    ChatLiveControls_ChooseChatChannel = 0;

    Main_ShowElement('chat_choose');
    ChatLiveControls_ChooseChatFocus(0);
}

function ChatLiveControls_ChooseChatFocus(position) {
    Main_AddClass('chat_choose_dialog' + position, 'button_dialog_focused');
    Main_RemoveClass('chat_choose_dialog' + (position ^ 1), 'button_dialog_focused');
}

function ChatLiveControls_HideChooseChat() {
    Main_removeEventListener('keydown', ChatLiveControls_ChooseChat);
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
    Main_clearTimeout(ChatLiveControls_inputFocusId);

    if (Main_isElementShowing('chat_emotes_holder')) ChatLiveControls_HideEmotes();
    else if (Main_isElementShowing('chat_send')) {
        ChatLiveControls_RemoveinputFocus(true);
        ChatLiveControls_refreshInputFocusTools();
    }
}

var ChatLiveControls_CanSendText = '';
var ChatLiveControls_CanSendBool = true;

function ChatLiveControls_CanSend() {
    ChatLiveControls_CanSendText = '';
    ChatLiveControls_CanSendBool = true;
    var streamer = !ChatLiveControls_Channel ? Play_data.data[1] : PlayExtra_data.data[1];

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
            if (tags['followers-only'] > -1 && user_fallow.hasOwnProperty('follows') && !user_fallow.follows) {
                ChatLiveControls_CanSendText = STR_CHAT_FOLLOWER_ONLY + streamer;
                ChatLiveControls_CanSendBool = false;
                ChatLiveControls_PreventInput();

                return false;
            } else if (
                tags['followers-only'] &&
                user_fallow.hasOwnProperty('created_at') &&
                tags['followers-only'] > ChatLive_GetMinutes(user_fallow.created_at)
            ) {
                var time = ChatLive_GetMinutes(user_fallow.created_at);

                ChatLiveControls_CanSendText =
                    'Followers-only' +
                    (tags['followers-only'] ? ' minimum ' + tags['followers-only'] + ' minute(s) fallowing' : '') +
                    ' ' +
                    STR_CHAT_FOLLOWER_ONLY_USER_TIME +
                    time +
                    (time > 1 ? STR_MINUTES : STR_MINUTE);

                ChatLiveControls_CanSendBool = false;
                ChatLiveControls_PreventInput();

                return false;
            }
        }
    }

    ChatLiveControls_PreventInputClear();
    return true;
}

function ChatLiveControls_PreventInput() {
    Main_RemoveClassWithEle(Main_ChatLiveInput, 'chat_input_class_focus');
    Main_AddClassWitEle(Main_ChatLiveInput, 'chat_input_class_block');
    Main_ChatLiveInput.value = ChatLiveControls_CanSendText;
    ChatLiveControls_showWarningDialog(ChatLiveControls_CanSendText, 1000);
    ChatLiveControls_UpdateResultTextEmpty();
}

function ChatLiveControls_PreventInputClear() {
    if (Main_A_includes_B(Main_ChatLiveInput.className, 'chat_input_class_block')) {
        Main_RemoveClassWithEle(Main_ChatLiveInput, 'chat_input_class_block');
        Main_ChatLiveInput.value = '';
        ChatLiveControls_UpdateResultTextEmpty();
    }
}

var OptionsShowObj = {};
var OptionsShowArray = [];
var ChatLiveControls_OptionsY = 0;

function ChatLiveControls_OptionsUpdate_defautls() {
    OptionsShowObj.keyboard_options = {};
    OptionsShowObj.keyboard_options.defaultValue = Main_getItemInt('keyboard_options', 1);
    OptionsShowObj.emote_sorting = {};
    OptionsShowObj.emote_sorting.defaultValue = Main_getItemInt('emote_sorting', 0);
    OptionsShowObj.force_show_chat_write = {};
    OptionsShowObj.force_show_chat_write.defaultValue = Main_getItemInt('force_show_chat_write', 1);
}

function ChatLiveControls_OptionsShow() {
    Main_removeEventListener('keydown', ChatLiveControls_handleKeyDown);

    OptionsShowObj = {
        keyboard_options: {
            defaultValue: OptionsShowObj.keyboard_options.defaultValue,
            values: [STR_CHAT_OPTIONS_KEYBOARD_1, STR_CHAT_OPTIONS_KEYBOARD_2, STR_CHAT_OPTIONS_KEYBOARD_3],
            title: STR_CHAT_OPTIONS_KEYBOARD,
            summary: STR_CHAT_OPTIONS_KEYBOARD_SUMMARY
        },
        emote_sorting: {
            defaultValue: OptionsShowObj.emote_sorting.defaultValue,
            values: [STR_DISABLED, STR_A_Z, STR_Z_A],
            title: STR_CHAT_OPTIONS_EMOTE_SORT,
            summary: STR_CHAT_OPTIONS_EMOTE_SORT_SUMMARY
        },
        force_show_chat_write: {
            defaultValue: OptionsShowObj.force_show_chat_write.defaultValue,
            values: [STR_DISABLED, STR_ENABLED],
            title: STR_CHAT_OPTIONS_FORCE_SHOW,
            summary: STR_CHAT_OPTIONS_FORCE_SHOW_SUMMARY
        }
    };

    var dialogContent = STR_CHAT_OPTIONS_TITLE + STR_BR;
    OptionsShowArray = [];

    for (var property in OptionsShowObj) {
        OptionsShowArray.push(property);
        dialogContent += ChatLiveControls_DivOptionWithSummary(property, OptionsShowObj[property].title + STR_BR, OptionsShowObj[property].summary);
    }

    Main_innerHTML('chat_options_text', dialogContent + STR_DIV_TITLE + STR_CLOSE_THIS + '</div>');

    ChatLiveControls_OptionsY = 0;
    Main_AddClass(OptionsShowArray[0], 'settings_value_focus');
    Main_AddClass(OptionsShowArray[0] + '_div', 'settings_div_focus');
    ChatLiveControls_SetarrowsKey(OptionsShowArray[0]);

    Main_ShowElement('chat_options');
    Main_addEventListener('keydown', ChatLiveControls_OptionsKeyDown);
}

function ChatLiveControls_DivOptionWithSummary(key, string_title, string_summary) {
    return (
        '<div id="' +
        key +
        '_div" class="settings_div"><div id="' +
        key +
        '_name" class="settings_name">' +
        string_title +
        '<div id="' +
        key +
        '_summary" class="settings_summary" style="font-size: 73%;">' +
        string_summary +
        '</div></div>' +
        '<div class="settings_arraw_div"><div id="' +
        key +
        'arrow_left" class="left"></div></div>' +
        '<div id="' +
        key +
        '" class="strokedeline settings_value">' +
        OptionsShowObj[key].values[OptionsShowObj[key].defaultValue] +
        '</div>' +
        '<div class="settings_arraw_div"><div id="' +
        key +
        'arrow_right" class="right"></div></div></div>'
    );
}

function ChatLiveControls_SetarrowsKey(key) {
    var currentValue = OptionsShowObj[key].defaultValue;
    var maxValue = OptionsShowObj[key].values.length - 1;

    if (currentValue > 0 && currentValue < maxValue) {
        Main_getElementById(key + 'arrow_left').style.opacity = '1';
        Main_getElementById(key + 'arrow_right').style.opacity = '1';
    } else if (currentValue === maxValue) {
        Main_getElementById(key + 'arrow_left').style.opacity = '1';
        Main_getElementById(key + 'arrow_right').style.opacity = '0.2';
    } else {
        Main_getElementById(key + 'arrow_left').style.opacity = '0.2';
        Main_getElementById(key + 'arrow_right').style.opacity = '1';
    }
}

function ChatLiveControls_Optionshide() {
    Main_HideElement('chat_options');
    Main_removeEventListener('keydown', ChatLiveControls_OptionsKeyDown);
    Main_addEventListener('keydown', ChatLiveControls_handleKeyDown);
}

function ChatLiveControls_OptionsKeyDown(event) {
    var key;
    switch (event.keyCode) {
        case KEY_ENTER:
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            ChatLiveControls_Optionshide();
            break;
        case KEY_LEFT:
            key = OptionsShowArray[ChatLiveControls_OptionsY];
            if (OptionsShowObj[key].defaultValue > 0) ChatLiveControls_OptionsRigthLeft(-1);
            break;
        case KEY_RIGHT:
            key = OptionsShowArray[ChatLiveControls_OptionsY];
            if (OptionsShowObj[key].defaultValue < OptionsShowObj[key].values.length - 1) ChatLiveControls_OptionsRigthLeft(1);
            break;
        case KEY_UP:
            if (ChatLiveControls_OptionsY > 0) ChatLiveControls_OptionsUpDown(-1);
            break;
        case KEY_DOWN:
            if (ChatLiveControls_OptionsY < OptionsShowArray.length - 1) ChatLiveControls_OptionsUpDown(1);
            break;
        default:
            break;
    }
}

function ChatLiveControls_OptionsUpDown(offset) {
    var key = OptionsShowArray[ChatLiveControls_OptionsY];

    ChatLiveControls_RemoveinputFocusKey(key);
    ChatLiveControls_OptionsY += offset;

    key = OptionsShowArray[ChatLiveControls_OptionsY];

    Main_AddClass(key, 'settings_value_focus');
    Main_AddClass(key + '_div', 'settings_div_focus');
    ChatLiveControls_SetarrowsKey(key);
}

function ChatLiveControls_RemoveinputFocusKey(key) {
    Main_getElementById(key + 'arrow_left').style.opacity = '0';
    Main_getElementById(key + 'arrow_right').style.opacity = '0';
    Main_RemoveClass(key, 'settings_value_focus');
    Main_RemoveClass(key + '_div', 'settings_div_focus');
}

function ChatLiveControls_OptionsRigthLeft(offset) {
    var key = OptionsShowArray[ChatLiveControls_OptionsY];

    OptionsShowObj[key].defaultValue += offset;

    Main_setItem(key, OptionsShowObj[key].defaultValue);
    Main_textContent(key, OptionsShowObj[key].values[OptionsShowObj[key].defaultValue]);
    ChatLiveControls_SetarrowsKey(key);
}
