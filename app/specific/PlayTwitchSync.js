/*
 * Copyright (c) 2017–present Felipe de Leon <fglfgl27@gmail.com>
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

var PlayTwitchSync_BaseUrl = 'https://gql.twitch.tv/gql';
var PlayTwitchSync_fetchQuery = '{"query":"{video(id:\\"%x\\"){self{viewingHistory{position updatedAt}}}}"}';
var PlayTwitchSync_updateMutation =
    '{"query":"mutation UpdateUserViewedVideo($input: UpdateUserViewedVideoInput!){updateUserViewedVideo(input:$input){video{id}}}","variables":{"input":{"userID":"%u","videoID":"%v","videoType":"VOD","position":%p}}}';

var PlayTwitchSync_fetchId = 0;
var PlayTwitchSync_pushId = 0;
var PlayTwitchSync_resolveTimeoutMs = 2500;
var PlayTwitchSync_minPushIntervalMs = 30000;
var PlayTwitchSync_lastPushTime = 0;
var PlayTwitchSync_lastPushed = {};
var PlayTwitchSync_pendingResolve = {};

function PlayTwitchSync_IsEnabled() {
    return AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token;
}

function PlayTwitchSync_ParseUpdatedAt(updatedAt) {
    if (!updatedAt) return 0;

    var time = new Date(updatedAt).getTime();

    return isNaN(time) ? 0 : time;
}

function PlayTwitchSync_PickOffset(localOffset, localUpdatedAt, remoteOffset, remoteUpdatedAt) {
    localOffset = parseFloat(localOffset) || 0;
    remoteOffset = parseFloat(remoteOffset) || 0;
    localUpdatedAt = localUpdatedAt || 0;
    remoteUpdatedAt = remoteUpdatedAt || 0;

    if (!remoteOffset) return localOffset;
    if (!localOffset) return remoteOffset;

    if (remoteUpdatedAt > localUpdatedAt) return remoteOffset;
    if (localUpdatedAt > remoteUpdatedAt) return localOffset;

    return Math.max(localOffset, remoteOffset);
}

function PlayTwitchSync_GetLocalVodProgress(vodId) {
    var offset = 0,
        updatedAt = 0,
        index;

    if (!AddUser_UserIsSet()) return {offset: offset, updatedAt: updatedAt};

    index = Main_history_Exist('vod', vodId);

    if (index > -1) {
        offset = Main_values_History_data[AddUser_UsernameArray[0].id].vod[index].watched || 0;
        updatedAt = Main_values_History_data[AddUser_UsernameArray[0].id].vod[index].date || 0;
    }

    return {offset: offset, updatedAt: updatedAt};
}

function PlayTwitchSync_ResolveTimeout(requestId) {
    var pending = PlayTwitchSync_pendingResolve[requestId];

    if (!pending || pending.resolved) return;

    pending.resolved = true;
    delete PlayTwitchSync_pendingResolve[requestId];
    pending.callback(pending.localOffset);
}

function PlayTwitchSync_FetchResult(responseObj, key, requestId) {
    var pending = PlayTwitchSync_pendingResolve[requestId],
        remoteOffset = 0,
        remoteUpdatedAt = 0,
        history,
        obj;

    if (!pending || pending.resolved) return;

    pending.resolved = true;
    delete PlayTwitchSync_pendingResolve[requestId];

    if (responseObj.status === 200) {
        try {
            obj = JSON.parse(responseObj.responseText);
            history = obj.data && obj.data.video && obj.data.video.self && obj.data.video.self.viewingHistory;

            if (history && history.position) {
                remoteOffset = history.position;
                remoteUpdatedAt = PlayTwitchSync_ParseUpdatedAt(history.updatedAt);
            }
        } catch (ignore) {
            remoteOffset = 0;
        }
    }

    pending.callback(
        PlayTwitchSync_PickOffset(pending.localOffset, pending.localUpdatedAt, remoteOffset, remoteUpdatedAt)
    );
}

function PlayTwitchSync_ResolveOffset(vodId, callback) {
    var local = PlayTwitchSync_GetLocalVodProgress(vodId),
        requestId;

    if (!PlayTwitchSync_IsEnabled()) {
        callback(local.offset);
        return;
    }

    requestId = ++PlayTwitchSync_fetchId;

    PlayTwitchSync_pendingResolve[requestId] = {
        callback: callback,
        localOffset: local.offset,
        localUpdatedAt: local.updatedAt,
        resolved: false
    };

    Main_setTimeout(PlayTwitchSync_ResolveTimeout, PlayTwitchSync_resolveTimeoutMs, requestId);

    FullxmlHttpGet(
        PlayTwitchSync_BaseUrl,
        Main_OAuth_User_Headers,
        PlayTwitchSync_FetchResult,
        noop_fun,
        0,
        requestId,
        'POST',
        PlayTwitchSync_fetchQuery.replace('%x', vodId)
    );
}

function PlayTwitchSync_PushResult() {}

function PlayTwitchSync_Push(vodId, position) {
    var now,
        body,
        pushId;

    if (!PlayTwitchSync_IsEnabled() || !vodId) return;

    position = parseInt(position);

    if (position <= 0) return;

    now = new Date().getTime();

    if (PlayTwitchSync_lastPushed[vodId] === position && now - PlayTwitchSync_lastPushTime < PlayTwitchSync_minPushIntervalMs) return;

    PlayTwitchSync_lastPushed[vodId] = position;
    PlayTwitchSync_lastPushTime = now;

    body = PlayTwitchSync_updateMutation
        .replace('%u', AddUser_UsernameArray[0].id)
        .replace('%v', vodId)
        .replace('%p', position);

    pushId = ++PlayTwitchSync_pushId;

    FullxmlHttpGet(
        PlayTwitchSync_BaseUrl,
        Main_OAuth_User_Headers,
        PlayTwitchSync_PushResult,
        noop_fun,
        0,
        pushId,
        'POST',
        body
    );
}
