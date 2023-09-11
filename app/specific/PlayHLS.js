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

//To pass to Java
var Play_Headers;
//Live
var Play_live_token_prop = 'streamPlaybackAccessToken';
var Play_live_token =
    '{"operationName":"PlaybackAccessToken_Template","query":"query PlaybackAccessToken_Template($login: String!, $isLive: Boolean!, $vodID: ID!, $isVod: Boolean!, $playerType: String!, $platform: String!) ' +
    '{  streamPlaybackAccessToken(channelName: $login, params: {platform: $platform, playerBackend: \\"mediaplayer\\", playerType: $playerType}) @include(if: $isLive) {    value    signature    __typename  } ' +
    ' videoPlaybackAccessToken(id: $vodID, params: {platform: $platform, playerBackend: \\"mediaplayer\\", playerType: $playerType}) @include(if: $isVod) {    value    signature    __typename  }}",' +
    '"variables":{"isLive":true,"login":"%x","isVod":false,"vodID":"","playerType":"pulsar","platform":"switch_web_tv"}}';
var Play_base_live_links =
    'player_backend=mediaplayer&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=false&cdm=wv&acmb=e30%3D&p=%p&play_session_id=%i&player_version=1.13.0';

var Play_original_live_links = 'https://usher.ttvnw.net/api/channel/hls/';

var Play_live_ttv_lol_links = 'https://api.ttv.lol/playlist/';
var ttv_lol_headers = JSON.stringify([['X-Donate-To', 'https://ttv.lol/donate']]);

var ktwitch_proxy = 'https://api.twitch.hkg.kwabang.net/hls-raw/';

var T1080_proxy = 'https://api1080.ontdb.com/';

var proxy_timeout = 5000;
var proxy_url = '';
var proxy_headers = null;
var proxy_has_parameter = false;
var proxy_has_token = false;

//var proxy_ping_url = 'https://api.ttv.lol/ping';

var use_proxy = false;
var proxy_fail_counter = 0;
var proxy_fail_counter_checker = 0;

//VOD
var Play_vod_token_prop = 'videoPlaybackAccessToken';
var Play_vod_token = '{"query":"{videoPlaybackAccessToken(id:\\"%x\\", params:{platform:\\"android\\",playerType:\\"mobile\\"}){value signature}}"}';
var Play_vod_links =
    'https://usher.ttvnw.net/vod/%x.m3u8?&nauth=%t&nauthsig=%s&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&cdm=wv&p=%d';

function PlayHLS_GetPlayListAsync(isLive, Channel_or_VOD_Id, CheckId_y, CheckId_x, callBackSuccess) {
    // console.log('isLive', isLive);
    // console.log('Channel_or_VOD_Id', Channel_or_VOD_Id);
    // console.log('CheckId_y', CheckId_y);
    // console.log('CheckId_x', CheckId_x);
    // console.log('callBackSuccess', callBackSuccess.name);

    //if at te end of a request the values are different we have a issues
    proxy_fail_counter_checker = proxy_fail_counter;

    if (use_proxy && isLive && !proxy_has_token) {
        PlayHLS_PlayListUrl(isLive, Channel_or_VOD_Id, CheckId_y, CheckId_x, callBackSuccess.name, null, null, true);
    } else {
        PlayHLS_GetToken(isLive, Channel_or_VOD_Id, CheckId_y, CheckId_x, callBackSuccess.name, use_proxy);
    }
}

function PlayHLS_GetToken(isLive, Channel_or_VOD_Id, CheckId_y, CheckId_x, callBackSuccess, useProxy) {
    OSInterface_XmlHttpGetFull(
        PlayClip_BaseUrl, //String urlString
        DefaultHttpGetTimeout, //int timeout
        (isLive ? Play_live_token : Play_vod_token).replace('%x', Channel_or_VOD_Id), // String postMessage
        'POST', //String Method
        Play_Headers, //String JsonHeadersArray
        'PlayHLS_GetTokenResult', //String callback
        CheckId_y, //long checkResult
        isLive ? '1' : '0', //String check_1
        useProxy ? '1' : '0', //String check_2
        Channel_or_VOD_Id.toString(), // String check_3
        null, // reserved for token result String check_4
        CheckId_x, // String check_5
        callBackSuccess, //String callBackSuccess
        null //String callBackError
    );
}

function PlayHLS_GetTokenResult(result, checkResult, check_1, check_2, check_3, check_4, check_5, callBackSuccess) {
    //console.log('result', result);
    // console.log('checkResult', checkResult);
    // console.log('check_1', check_1);
    // console.log('check_2', check_2);
    // console.log('check_3', check_3);
    // console.log('check_4', check_4);
    // console.log('check_5', check_5);
    // console.log('callBackSuccess', callBackSuccess);

    var isLive = check_1 === '1',
        useProxy = check_2 === '1',
        Channel_or_VOD_Id = check_3,
        CheckId_x = check_5;

    var response = JSON.parse(result);

    if (response.status === 200) {
        var obj = JSON.parse(response.responseText);

        if (obj.data && obj.data[isLive ? Play_live_token_prop : Play_vod_token_prop]) {
            var tokenObj = obj.data[isLive ? Play_live_token_prop : Play_vod_token_prop];
            var Token = tokenObj.value;
            var Sig = tokenObj.signature;

            PlayHLS_PlayListUrl(isLive, Channel_or_VOD_Id, checkResult, CheckId_x, callBackSuccess, Token, Sig, useProxy);
        }

        return;
    }

    // prettier-ignore
    eval(callBackSuccess)(// jshint ignore:line
        null
    );
}

function PlayHLS_CheckToken(tokenString) {
    if (!tokenString) {
        return '0';
    }

    var Token = JSON.parse(tokenString);

    if (Token.chansub && Token.chansub.restricted_bitrates) {
        var restricted_bitrates = Token.chansub.restricted_bitrates;

        return restricted_bitrates.length ? '1' : '0';
    }

    return '0';
}

function PlayHLS_GetPlayListUrl(isLive, Channel_or_VOD_Id, Token, Sig, useProxy) {
    var url = '',
        headers;

    if (isLive) {
        var randomId = parseInt(Math.random() * 10000000000000000);
        var randomInt = parseInt(Math.random() * 100000000);
        var URL_parameters = Play_base_live_links.replace('%p', randomInt).replace('%i', randomId + '' + randomId);

        if (useProxy) {
            headers = proxy_headers;

            if (proxy_has_parameter && !proxy_has_token) {
                url = proxy_url + Channel_or_VOD_Id + '.m3u8' + encodeURIComponent('?' + URL_parameters);
            } else {
                url = proxy_url + Channel_or_VOD_Id + '.m3u8?token=' + encodeURIComponent(Token) + '&sig=' + Sig + '&' + URL_parameters;
            }
        } else {
            url = Play_original_live_links + Channel_or_VOD_Id + '.m3u8?token=' + encodeURIComponent(Token) + '&sig=' + Sig + '&' + URL_parameters;
        }
    } else {
        url = Play_vod_links.replace('%x', Channel_or_VOD_Id)
            .replace('%t', encodeURIComponent(Token))
            .replace('%s', Sig)
            .replace('%d', Math.random() * 100000);
    }

    return {url: url, headers: headers};
}

function PlayHLS_PlayListUrl(isLive, Channel_or_VOD_Id, CheckId_y, CheckId_x, callBackSuccess, Token, Sig, useProxy) {
    // console.log('isLive', isLive);
    // console.log('Channel_or_VOD_Id', Channel_or_VOD_Id);
    // console.log('CheckId_y', CheckId_y);
    // console.log('CheckId_x', CheckId_x);
    // console.log('callBackSuccess', callBackSuccess);
    // console.log('Token', Token);
    // console.log('Sig', Sig);
    // console.log('callBackSuccess', callBackSuccess);

    var urlObj = PlayHLS_GetPlayListUrl(isLive, Channel_or_VOD_Id, Token, Sig, useProxy);

    OSInterface_XmlHttpGetFull(
        urlObj.url, //String urlString
        useProxy ? proxy_timeout : DefaultHttpGetTimeout, //int timeout
        null, // String postMessage
        null, //String Method
        urlObj.headers ? urlObj.headers : null, //String JsonHeadersArray
        'PlayHLS_PlayListUrlResult', //String callback
        CheckId_y, //long checkResult
        isLive ? '1' : '0', //String check_1
        useProxy ? '1' : '0', // String check_2
        Channel_or_VOD_Id, // String check_3
        PlayHLS_CheckToken(Token), // String check_4
        CheckId_x, // String check_5
        callBackSuccess, //String callBackSuccess
        null //String callBackError
    );
}

function PlayHLS_PlayListUrlResult(result, checkResult, check_1, check_2, check_3, check_4, check_5, callBackSuccess) {
    // console.log('result', result);
    // console.log('checkResult', checkResult);
    // console.log('check_1', check_1);
    // console.log('check_2', check_2);
    // console.log('check_3', check_3);
    // console.log('check_4', check_4);
    // console.log('check_5', check_5);
    // console.log('callBackSuccess', callBackSuccess);

    var CheckId_y = checkResult,
        isLive = check_1 === '1',
        useProxy = check_2 === '1',
        Channel_or_VOD_Id = check_3,
        Checked_Token = check_4,
        CheckId_x = check_5,
        response = JSON.parse(result);

    if (response.status !== 200) {
        //in case we fail using proxy restart the process without using proxy
        if (isLive && useProxy && PlayHLS_CheckProxyResultFail(response.responseText)) {
            PlayHLS_GetToken(isLive, Channel_or_VOD_Id, CheckId_y, CheckId_x, callBackSuccess, false);
            return;
        }

        result = JSON.stringify({
            status: Checked_Token === '1' ? 1 : response.status,
            responseText: response.responseText,
            checkResult: response.checkResult
        });
    }

    // prettier-ignore
    eval(callBackSuccess)(// jshint ignore:line
        result,
       parseInt(CheckId_x),
       parseInt(CheckId_y)
    );

    if (useProxy) {
        Main_EventProxy(true);
    }
}

function PlayHLS_CheckProxyResultFail(responseText) {
    if (Main_A_includes_B(responseText, 'not_found: transcode does not exist')) {
        return false;
    }

    proxy_fail_counter++;
    Main_EventProxy(false);

    return true;
}

function PlayHLS_GetPlayListSync(isLive, Channel_or_VOD_Id) {
    //if at te end of a request the values are different we have a issues
    proxy_fail_counter_checker = proxy_fail_counter;

    return PlayHLS_GetPlayListSyncToken(isLive, Channel_or_VOD_Id, use_proxy);
}

function PlayHLS_GetPlayListSyncToken(isLive, Channel_or_VOD_Id, useProxy) {
    var tokenObj, Token, Sig;

    if (useProxy && isLive && !proxy_has_token) {
        return PlayHLS_GetPlayListSyncUrl(isLive, Channel_or_VOD_Id, true);
    } else {
        //getToken
        var obj = OSInterface_mMethodUrlHeaders(
            PlayClip_BaseUrl, //urlString
            DefaultHttpGetTimeout, //timeout
            (isLive ? Play_live_token : Play_vod_token).replace('%x', Channel_or_VOD_Id), //postMessage
            'POST', //Method
            0, //checkResult
            JSON.stringify(Play_base_backup_headers_Array) //JsonHeadersArray
        );

        if (obj) {
            var response = JSON.parse(obj);
            if (response && response.status === 200) {
                var tokenResult = JSON.parse(response.responseText);

                if (tokenResult.data && tokenResult.data[isLive ? Play_live_token_prop : Play_vod_token_prop]) {
                    tokenObj = tokenResult.data[isLive ? Play_live_token_prop : Play_vod_token_prop];
                    Token = tokenObj.value;
                    Sig = tokenObj.signature;

                    return PlayHLS_GetPlayListSyncUrl(isLive, Channel_or_VOD_Id, useProxy, Token, Sig, tokenObj);
                }
            }
        }
    }
    return null;
}

function PlayHLS_GetPlayListSyncUrl(isLive, Channel_or_VOD_Id, useProxy, Token, Sig, tokenObj) {
    var urlObj = PlayHLS_GetPlayListUrl(isLive, Channel_or_VOD_Id, Token, Sig, useProxy);

    var obj = OSInterface_mMethodUrlHeaders(
        urlObj.url, //urlString
        useProxy ? proxy_timeout : DefaultHttpGetTimeout, //timeout
        null, //postMessage
        null, //Method
        0, //checkResult
        urlObj.headers ? urlObj.headers : null //JsonHeadersArray
    );

    if (obj) {
        var response = JSON.parse(obj);

        if (response) {
            if (response.status === 200) {
                if (useProxy) {
                    Main_EventProxy(true);
                }
                return obj;
            } else {
                //in case we fail using proxy restart the process without using proxy
                if (isLive && useProxy && PlayHLS_CheckProxyResultFail(response.responseText)) {
                    return PlayHLS_GetPlayListSyncToken(isLive, Channel_or_VOD_Id, false);
                } else {
                    return JSON.stringify({
                        status: PlayHLS_CheckToken(tokenObj) === '1' ? 1 : response.status,
                        responseText: response.responseText,
                        checkResult: response.checkResult
                    });
                }
            }
        }
    }

    return null;
}
