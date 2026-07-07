/*
 * Copyright (c) 2017–present Felipe de Leon <fglfgl27@gmail.com>
 *
 * This file is part of SmartTwitchTV <https://github.com/fglfgl27/SmartTwitchTV>
 *
 * SmartTwitchTV is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SmartTwitchTV is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SmartTwitchTV. If not, see <https://github.com/fglfgl27/SmartTwitchTV/blob/master/LICENSE>.
 *
 */
var PlayRaid_WebSocketUrl = 'wss://eventsub.wss.twitch.tv/ws?keepalive_timeout_seconds=30';
var PlayRaid_Socket = null;
var PlayRaid_ReconnectSocket = null;
var PlayRaid_BroadcasterId = null;
var PlayRaid_SubscriptionId = 0;
var PlayRaid_TargetEvent = null;
var PlayRaid_TargetRequestId = 0;
var PlayRaid_TargetRequestStart = 0;
var PlayRaid_ReconnectId = null;
var PlayRaid_KeepAliveId = null;
var PlayRaid_OpenDelayId = null;
var PlayRaid_KeepAliveSeconds = 30;
var PlayRaid_OpenMessageMinimumMs = 2500;

function PlayRaid_ShouldRun() {
    return (
        Play_isOn &&
        Play_data &&
        Play_data.data &&
        Play_data.data.length &&
        Settings_Obj_default('auto_open_raid') === 1 &&
        AddUser_UserHasToken() &&
        Play_data.data[14]
    );
}

function PlayRaid_Start() {
    if (!PlayRaid_ShouldRun()) {
        PlayRaid_Stop();
        return;
    }

    if (PlayRaid_Socket && Main_A_equals_B(PlayRaid_BroadcasterId, Play_data.data[14])) return;

    PlayRaid_Stop();
    PlayRaid_BroadcasterId = Play_data.data[14] + '';
    PlayRaid_OpenSocket(PlayRaid_WebSocketUrl, false);
}

function PlayRaid_Stop() {
    Main_clearTimeout(PlayRaid_ReconnectId);
    Main_clearTimeout(PlayRaid_KeepAliveId);
    Main_clearTimeout(PlayRaid_OpenDelayId);

    PlayRaid_CloseSocket(PlayRaid_Socket, 'PlayRaid_Stop');
    PlayRaid_CloseSocket(PlayRaid_ReconnectSocket, 'PlayRaid_Stop');

    PlayRaid_Socket = null;
    PlayRaid_ReconnectSocket = null;
    PlayRaid_BroadcasterId = null;
    PlayRaid_TargetEvent = null;
    PlayRaid_TargetRequestStart = 0;
}

function PlayRaid_UpdateSetting() {
    if (Settings_Obj_default('auto_open_raid') === 1) PlayRaid_Start();
    else PlayRaid_Stop();
}

function PlayRaid_CloseSocket(socket, logText) {
    if (!socket) return;

    try {
        socket.onclose = noop_fun;
        socket.onmessage = noop_fun;
        socket.onerror = noop_fun;
        socket.close();
    } catch (e) {
        Main_Log(logText + ' ' + e);
    }
}

function PlayRaid_OpenSocket(url, isReconnect) {
    if (!window.WebSocket || !PlayRaid_ShouldRun()) return;

    var socket;

    try {
        socket = new WebSocket(url);
    } catch (e) {
        Main_Log('PlayRaid_OpenSocket ' + e);
        return;
    }

    socket.PlayRaid_IsReconnect = Boolean(isReconnect);
    socket.onmessage = function (event) {
        PlayRaid_OnMessage(event, socket);
    };
    socket.onerror = PlayRaid_OnError;
    socket.onclose = function () {
        PlayRaid_OnClose(socket);
    };

    if (isReconnect) PlayRaid_ReconnectSocket = socket;
    else PlayRaid_Socket = socket;
}

function PlayRaid_OnMessage(event, socket) {
    var message;

    try {
        message = JSON.parse(event.data);
    } catch (e) {
        Main_Log('PlayRaid_OnMessage ' + e);
        return;
    }

    PlayRaid_ResetKeepAlive();

    if (!message.metadata || !message.metadata.message_type) return;

    switch (message.metadata.message_type) {
        case 'session_welcome':
            PlayRaid_HandleWelcome(message, socket);
            break;
        case 'notification':
            PlayRaid_HandleNotification(message);
            break;
        case 'session_reconnect':
            PlayRaid_HandleReconnect(message);
            break;
        case 'revocation':
            PlayRaid_Stop();
            break;
        default:
            break;
    }
}

function PlayRaid_HandleWelcome(message, socket) {
    if (!message.payload || !message.payload.session || !message.payload.session.id) return;

    PlayRaid_KeepAliveSeconds = message.payload.session.keepalive_timeout_seconds || PlayRaid_KeepAliveSeconds;
    PlayRaid_ResetKeepAlive();

    if (socket && socket.PlayRaid_IsReconnect) {
        PlayRaid_ActivateReconnectSocket(socket);
        return;
    }

    PlayRaid_Subscribe(message.payload.session.id);
}

function PlayRaid_ActivateReconnectSocket(socket) {
    if (socket !== PlayRaid_ReconnectSocket) return;

    PlayRaid_CloseSocket(PlayRaid_Socket, 'PlayRaid_ActivateReconnectSocket');
    PlayRaid_Socket = socket;
    PlayRaid_ReconnectSocket = null;
    PlayRaid_Socket.PlayRaid_IsReconnect = false;
}

function PlayRaid_ResetKeepAlive() {
    Main_clearTimeout(PlayRaid_KeepAliveId);

    PlayRaid_KeepAliveId = Main_setTimeout(
        function () {
            PlayRaid_Reconnect();
        },
        (PlayRaid_KeepAliveSeconds + 5) * 1000,
        PlayRaid_KeepAliveId
    );
}

function PlayRaid_Subscribe(sessionId) {
    if (!PlayRaid_ShouldRun()) return;

    PlayRaid_SubscriptionId = new Date().getTime();

    FullxmlHttpGet(
        Main_helix_api + 'eventsub/subscriptions',
        [
            [clientIdHeader, AddCode_backup_client_id],
            [Bearer_Header, Bearer + AddUser_UsernameArray[0].access_token],
            ['Content-Type', 'application/json']
        ],
        PlayRaid_SubscribeSuccess,
        noop_fun,
        0,
        PlayRaid_SubscriptionId,
        'POST',
        JSON.stringify({
            type: 'channel.raid',
            version: '1',
            condition: {
                from_broadcaster_user_id: PlayRaid_BroadcasterId
            },
            transport: {
                method: 'websocket',
                session_id: sessionId
            }
        })
    );
}

function PlayRaid_SubscribeSuccess(obj, key, id) {
    if (id !== PlayRaid_SubscriptionId) return;

    key = key || 0;

    if (obj.status === 202) return;

    if (obj.status === 401 || obj.status === 403) AddCode_validateToken(0);

    PlayRaid_Stop();
}

function PlayRaid_HandleNotification(message) {
    if (
        !message.metadata ||
        message.metadata.subscription_type !== 'channel.raid' ||
        !message.payload ||
        !message.payload.event ||
        !PlayRaid_ShouldRun()
    ) {
        return;
    }

    var raidEvent = message.payload.event;

    if (
        !Main_A_equals_B(raidEvent.from_broadcaster_user_id, PlayRaid_BroadcasterId) ||
        Main_A_equals_B(raidEvent.to_broadcaster_user_id, Play_data.data[14])
    ) {
        return;
    }

    PlayRaid_TargetEvent = raidEvent;
    PlayRaid_TargetRequestId = new Date().getTime();
    PlayRaid_TargetRequestStart = PlayRaid_TargetRequestId;

    Play_showWarningMiddleDialog(
        STR_RAID_OPENING.replace('%from', raidEvent.from_broadcaster_user_name).replace('%to', raidEvent.to_broadcaster_user_name),
        3000
    );

    BaseXmlHttpGet(
        Main_helix_api + 'streams?user_id=' + raidEvent.to_broadcaster_user_id,
        PlayRaid_LoadTargetSuccess,
        PlayRaid_LoadTargetError,
        0,
        PlayRaid_TargetRequestId,
        true
    );
}

function PlayRaid_LoadTargetSuccess(responseText, key, id) {
    if (id !== PlayRaid_TargetRequestId || !PlayRaid_TargetEvent) return;

    key = key || 0;

    var response = JSON.parse(responseText);

    if (response.data && response.data.length) {
        PlayRaid_OpenStreamAfterMessage(ScreensObj_LiveCellArray(response.data[0]), id);
    } else {
        PlayRaid_LoadTargetError();
    }
}

function PlayRaid_OpenStreamAfterMessage(data, id) {
    var remaining = PlayRaid_OpenMessageMinimumMs - (new Date().getTime() - PlayRaid_TargetRequestStart);

    if (remaining > 0) {
        PlayRaid_OpenDelayId = Main_setTimeout(
            function () {
                PlayRaid_OpenStreamForRequest(data, id);
            },
            remaining,
            PlayRaid_OpenDelayId
        );
    } else {
        PlayRaid_OpenStreamForRequest(data, id);
    }
}

function PlayRaid_OpenStreamForRequest(data, id) {
    if (id !== PlayRaid_TargetRequestId || !PlayRaid_TargetEvent) return;

    PlayRaid_OpenStream(data);
}

function PlayRaid_LoadTargetError() {
    if (!PlayRaid_TargetEvent) return;

    Play_showWarningMiddleDialog(STR_RAID_OPEN_FAILED.replace('%to', PlayRaid_TargetEvent.to_broadcaster_user_name), 3000);
    PlayRaid_TargetEvent = null;
}

function PlayRaid_OpenStream(data) {
    PlayRaid_Stop();
    Play_SavePlayData();
    Play_ClearPP();
    Play_PreshutdownStream(true);

    Play_data = JSON.parse(JSON.stringify(Play_data_base));
    Main_values_Play_data = data;
    Play_data.data = Main_values_Play_data;

    Main_values.Play_isHost = false;
    Main_values.Play_WasPlaying = 1;
    Main_values.Main_selectedChannelDisplayname = data[1];
    Main_values.Main_selectedChannel = data[6];
    Main_values.Main_selectedChannelLogo = data[9];
    Main_values.Main_selectedChannelPartner = data[10];
    Main_values.Main_selectedChannel_id = data[14];

    Main_openStream();
    Main_EventPlay('live', data[6], data[3], data[15], 'Raid');
    Main_SaveValues(true);
}

function PlayRaid_HandleReconnect(message) {
    if (!message.payload || !message.payload.session || !message.payload.session.reconnect_url) return;

    PlayRaid_Reconnect(message.payload.session.reconnect_url, true);
}

function PlayRaid_Reconnect(url, isReconnectMessage) {
    if (!PlayRaid_ShouldRun()) {
        PlayRaid_Stop();
        return;
    }

    if (isReconnectMessage) {
        PlayRaid_CloseSocket(PlayRaid_ReconnectSocket, 'PlayRaid_Reconnect');
        PlayRaid_ReconnectSocket = null;
        PlayRaid_OpenSocket(url, true);
        return;
    }

    PlayRaid_CloseSocket(PlayRaid_Socket, 'PlayRaid_Reconnect');
    PlayRaid_CloseSocket(PlayRaid_ReconnectSocket, 'PlayRaid_Reconnect');

    PlayRaid_Socket = null;
    PlayRaid_ReconnectSocket = null;
    PlayRaid_OpenSocket(url || PlayRaid_WebSocketUrl, false);
}

function PlayRaid_OnError() {
    Main_Log('PlayRaid_OnError');
}

function PlayRaid_OnClose(socket) {
    Main_clearTimeout(PlayRaid_KeepAliveId);

    if (socket !== PlayRaid_Socket || PlayRaid_ReconnectSocket || !PlayRaid_ShouldRun()) return;

    PlayRaid_ReconnectId = Main_setTimeout(
        function () {
            PlayRaid_Reconnect();
        },
        3000,
        PlayRaid_ReconnectId
    );
}
