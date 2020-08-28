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
var AddCode_Code = 0;
var AddCode_IsFollowing = false;
var AddCode_IsSub = false;
var AddCode_PlayRequest = false;
var AddCode_Channel_id = '';
var AddCode_Expires_in_offset = 100;

var AddCode_Scopes = [
    'user_read',
    'user_follows_edit',
    'user_subscriptions',
    'chat:edit',
    'chat:read'
];

var AddCode_redirect_uri = 'https://fgl27.github.io/SmartTwitchTV/release/index.min.html';
//Get yours client id and secret from https://docs.aws.amazon.com/lumberyard/latest/userguide/chatplay-generate-twitch-client-id.html
var AddCode_clientId = "5seja5ptej058mxqy7gh5tcudjqtm9";//public but get yours link above is free
var AddCode_client_secret;//none public get yours link above is free
var AddCode_UrlToken = 'https://id.twitch.tv/oauth2/token?';
var AddCode_ValidateUrl = 'https://id.twitch.tv/oauth2/validate';
//Variable initialization end

function AddCode_CheckNewCode(code) {
    AddCode_Code = code;
    Main_showLoadDialog();
    AddCode_requestTokens(0);
}

function AddCode_refreshTokens(position, tryes, callbackFunc, callbackFuncNOK, key, sync) {
    //Main_Log('AddCode_refreshTokens');
    if (!AddUser_UsernameArray[position] || !AddUser_UsernameArray[position].access_token) return;

    var xmlHttp,
        url = AddCode_UrlToken + 'grant_type=refresh_token&client_id=' + AddCode_clientId +
            '&client_secret=' + AddCode_client_secret + '&refresh_token=' + AddUser_UsernameArray[position].refresh_token +
            '&redirect_uri=' + AddCode_redirect_uri;

    //Run in synchronous mode to prevent anything happening until user token is restored
    if (Main_IsOn_OSInterface && sync) {

        xmlHttp = OSInterface_mMethodUrlHeaders(
            url,
            (DefaultHttpGetTimeout * 2) + (DefaultHttpGetTimeoutPlus * tryes),
            'POST',
            null,
            0,
            '[]'
        );

        if (xmlHttp) {

            xmlHttp = JSON.parse(xmlHttp);

            if (xmlHttp) AddCode_refreshTokensReady(position, tryes, callbackFunc, callbackFuncNOK, key, xmlHttp, sync);

            return;
        }

        AddCode_refreshTokensError(position, tryes, callbackFunc, callbackFuncNOK, key, sync);

    } else {
        xmlHttp = new XMLHttpRequest();

        xmlHttp.open("POST", url, true);
        xmlHttp.timeout = (DefaultHttpGetTimeout * 2) + (DefaultHttpGetTimeoutPlus * tryes);

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                //Main_Log('AddCode_refreshTokens ' + xmlHttp.status);
                AddCode_refreshTokensReady(position, tryes, callbackFunc, callbackFuncNOK, key, xmlHttp, sync);
            }
        };

        xmlHttp.send(null);
    }
}

function AddCode_refreshTokensReady(position, tryes, callbackFunc, callbackFuncNOK, key, xmlHttp, sync) {
    if (xmlHttp.status === 200) {
        AddCode_refreshTokensSucess(xmlHttp.responseText, position, callbackFunc, key);
        return;
    } else {

        try {
            var response = JSON.stringify(JSON.parse(xmlHttp.responseText));
            if (response) {
                if (Main_A_includes_B(response, 'Invalid refresh token')) {

                    AddCode_requestTokensFailRunning(position);
                    if (callbackFuncNOK) callbackFuncNOK(key);

                    return;
                }
            }
        } catch (e) {
            Main_Log('AddCode_refreshTokens e ' + e);
        }

    }
    AddCode_refreshTokensError(position, tryes, callbackFunc, callbackFuncNOK, key, sync);
}

function AddCode_refreshTokensError(position, tryes, callbackFuncOK, callbackFuncNOK, key, sync) {
    if (tryes < 5) AddCode_refreshTokens(position, tryes + 1, callbackFuncOK, callbackFuncNOK, key, sync);
    else if (callbackFuncNOK) callbackFuncNOK(key);
}

function AddCode_refreshTokensSucess(responseText, position, callbackFunc, key) {
    //Main_Log('AddCode_refreshTokensSucess');
    //Main_Log(responseText);

    var response = JSON.parse(responseText);
    if (AddCode_TokensCheckScope(response.scope)) {
        AddUser_UsernameArray[position].access_token = response.access_token;
        AddUser_UsernameArray[position].refresh_token = response.refresh_token;
        AddUser_UsernameArray[position].expires_in = (parseInt(response.expires_in) - AddCode_Expires_in_offset) * 1000;
        AddUser_UsernameArray[position].expires_when = (new Date().getTime()) + AddUser_UsernameArray[position].expires_in;
        //Main_Log(JSON.stringify(AddUser_UsernameArray[position]));

        AddUser_SaveUserArray();

        AddCode_Refreshtimeout(position);

    } else AddCode_requestTokensFailRunning(position);

    if (callbackFunc) callbackFunc(key);
}

//Check if has all scopes, in canse they change
function AddCode_TokensCheckScope(scope) {
    var i = 0, len = AddCode_Scopes.length;
    for (i; i < len; i++) {
        if (!Main_A_includes_B(scope, AddCode_Scopes[i])) return false;
    }
    return true;
}

function AddCode_requestTokens(tryes) {
    var theUrl = AddCode_UrlToken + 'grant_type=authorization_code&client_id=' + AddCode_clientId +
        '&client_secret=' + AddCode_client_secret + '&code=' + AddCode_Code + '&redirect_uri=' + AddCode_redirect_uri;

    AddCode_BasexmlHttpGet(theUrl, 'POST', 0, null, AddCode_requestTokensReady, tryes);
}

function AddCode_requestTokensReady(xmlHttp, tryes) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
            AddCode_requestTokensSucess(xmlHttp.responseText);
        } else AddCode_requestTokensError(tryes);
        return;
    }
}

function AddCode_requestTokensError(tryes) {
    if (tryes < DefaultHttpGetReTryMax) AddCode_requestTokens(tryes + 1);
    else AddCode_requestTokensFail();

}

function AddCode_requestTokensFail() {
    Main_HideLoadDialog();
    Main_showWarningDialog(STR_OAUTH_FAIL);
    Main_setTimeout(
        function() {
            Main_HideWarningDialog();
            Main_newUsercode = 0;
            Main_SaveValues();
            Main_values.Main_Go = Main_Users;
            Main_LoadUrl(Main_IsOn_OSInterface ? OSInterface_mPageUrl() : AddCode_redirect_uri);
        },
        4000
    );
    AddUser_UsernameArray[Main_values.Users_AddcodePosition].access_token = 0;
    AddUser_UsernameArray[Main_values.Users_AddcodePosition].refresh_token = 0;
    AddUser_SaveUserArray();
}

function AddCode_requestTokensFailRunning(position) {
    //Token fail remove it and warn
    Users_status = false;
    Main_HideLoadDialog();
    AddUser_UsernameArray[position].access_token = 0;
    AddUser_UsernameArray[position].refresh_token = 0;
    AddUser_SaveUserArray();
    Main_SaveValues();
}

function AddCode_requestTokensSucess(responseText) {
    var response = JSON.parse(responseText);
    AddUser_UsernameArray[Main_values.Users_AddcodePosition].access_token = response.access_token;
    AddUser_UsernameArray[Main_values.Users_AddcodePosition].refresh_token = response.refresh_token;
    AddCode_CheckOauthToken(Main_values.Users_AddcodePosition, 0);
}

function AddCode_CheckOauthToken(position, tryes) {
    AddCode_BasexmlHttpGetValidate(AddCode_CheckOauthTokenReady, position, tryes);
}

function AddCode_CheckOauthTokenReady(xmlHttp, position, tryes) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) AddCode_CheckOauthTokenSucess(xmlHttp.responseText);
        else AddCode_CheckOauthTokenError(position, tryes);
    }
}

function AddCode_CheckOauthTokenSucess(response) {
    var token = JSON.parse(response);
    if (token.login && Main_A_includes_B(token.login, AddUser_UsernameArray[Main_values.Users_AddcodePosition].name)) {
        Main_setItem('New_User_Token_Added', 1);
        AddUser_SaveUserArray();
        Main_newUsercode = 0;
        Main_HideLoadDialog();
        Users_status = false;
        Main_values.Main_Go = Main_Users;
        Main_SaveValues();
        Main_showWarningDialog(STR_USER_CODE_OK);
        OSInterface_clearCookie();
        Main_setTimeout(
            function() {
                Main_LoadUrl(Main_IsOn_OSInterface ? OSInterface_mPageUrl() : AddCode_redirect_uri);
            },
            3000
        );
    } else {
        AddUser_UsernameArray[Main_values.Users_AddcodePosition].access_token = 0;
        AddUser_UsernameArray[Main_values.Users_AddcodePosition].refresh_token = 0;
        Main_showWarningDialog(STR_OAUTH_FAIL_USER + AddUser_UsernameArray[Main_values.Users_AddcodePosition].name);
        Main_setTimeout(
            function() {
                Main_HideWarningDialog();
                Main_newUsercode = 0;
                Main_SaveValues();
                Main_values.Main_Go = Main_Users;
                Main_LoadUrl(Main_IsOn_OSInterface ? OSInterface_mPageUrl() : AddCode_redirect_uri);
            },
            4000
        );
    }
    return;
}

function AddCode_CheckOauthTokenError(position, tryes) {
    if (tryes < DefaultHttpGetReTryMax) AddCode_CheckOauthToken(position, tryes + 1);
    else AddCode_requestTokensFail();
}

function AddCode_CheckTokenStart(position) {
    //Main_Log('AddCode_CheckTokenStart');

    if (!position) AddCode_CheckTokenSync(position, 0);
    else AddCode_CheckToken(position, 0);
}
var AddCode_priv_client_id;
//Run in synchronous mode to prevent anything happening until user token is checked and if needed restored
function AddCode_CheckTokenSync(position, tryes) {
    //Main_Log('AddCode_CheckToken');

    if (Main_IsOn_OSInterface) {
        var xmlHttp = OSInterface_mMethodUrlHeaders(
            AddCode_ValidateUrl,
            (DefaultHttpGetTimeout * 2) + (DefaultHttpGetTimeoutPlus * tryes),
            null,
            null,
            0,
            JSON.stringify(
                [
                    [Main_Authorization, Main_OAuth + AddUser_UsernameArray[position].access_token]
                ]
            )
        );

        if (xmlHttp) {

            xmlHttp = JSON.parse(xmlHttp);

            if (xmlHttp) AddCode_CheckTokenReadyEnd(xmlHttp, position, tryes);

            return;
        }

        AddCode_CheckTokenError(position, tryes);
    } else {
        AddCode_BasexmlHttpGetValidate(AddCode_CheckTokenReady, position, tryes);
    }
}

function AddCode_CheckToken(position, tryes) {
    //Main_Log('AddCode_CheckToken');
    AddCode_BasexmlHttpGetValidate(AddCode_CheckTokenReady, position, tryes);
}

function AddCode_CheckTokenReady(xmlHttp, position, tryes) {
    if (xmlHttp.readyState === 4) AddCode_CheckTokenReadyEnd(xmlHttp, position, tryes);
}

function AddCode_CheckTokenReadyEnd(xmlHttp, position, tryes) {
    //Main_Log('AddCode_CheckTokenReady ' + xmlHttp.status);
    if (xmlHttp.status === 200) AddCode_CheckTokenSuccess(xmlHttp.responseText, position);
    else if (xmlHttp.status === 401 || xmlHttp.status === 403) AddCode_refreshTokens(position, 0, null, null, null, !position); //token expired
    else AddCode_CheckTokenError(position, tryes);
}

function AddCode_CheckTokenSuccess(responseText, position) {
    //Main_Log('AddCode_CheckTokenSuccess ' + responseText);

    var token = JSON.parse(responseText);

    if (token.hasOwnProperty('scopes') && !AddCode_TokensCheckScope(token.scopes)) AddCode_requestTokensFailRunning(position);
    else if (token.hasOwnProperty('expires_in')) {

        AddUser_UsernameArray[position].expires_in = (parseInt(token.expires_in) - AddCode_Expires_in_offset) * 1000;
        AddUser_UsernameArray[position].expires_when = (new Date().getTime()) + AddUser_UsernameArray[position].expires_in;
        AddCode_Refreshtimeout(position);

    }
}

function AddCode_Refreshtimeout(position) {

    if (AddUser_UsernameArray[position].access_token) {

        AddUser_UsernameArray[position].timeout_id = Main_setTimeout(
            function() {

                AddCode_refreshTokens(position, 0, null, null);

            },
            AddUser_UsernameArray[position].expires_in,
            AddUser_UsernameArray[position].timeout_id
        );

    } else Main_clearTimeout(AddUser_UsernameArray[position].timeout_id);

    //Main_Log('AddCode_Refreshtimeout position ' + position + ' expires_in ' + AddUser_UsernameArray[position].expires_in + ' min ' + (AddUser_UsernameArray[position].expires_in / 60000) + ' plus offset ' + AddCode_Expires_in_offset + ' s');
}

function AddCode_CheckTokenError(position, tryes) {

    if (tryes < DefaultHttpGetReTryMax) {

        if (!position) AddCode_CheckTokenSync(position, tryes + 1);
        else AddCode_CheckToken(position, tryes + 1);

    }

}

function AddCode_CheckFollow() {
    AddCode_IsFollowing = false;
    AddCode_RequestCheckFollow(0);
}

function AddCode_RequestCheckFollow(tryes) {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'GET', 2, null, AddCode_RequestCheckFollowReady, tryes);
}

function AddCode_RequestCheckFollowReady(xmlHttp, tryes) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) { //yes
            AddCode_RequestCheckFollowOK();
        } else if (xmlHttp.status === 404) { //no
            AddCode_RequestCheckFollowNOK(xmlHttp.responseText);
        } else { // internet error
            AddCode_RequestCheckFollowError(tryes);
        }
    }
}

function AddCode_RequestCheckFollowOK() {
    AddCode_IsFollowing = true;
    if (AddCode_PlayRequest) Play_setFollow();
    else ChannelContent_setFollow();
}

function AddCode_RequestCheckFollowNOK(response) {
    response = JSON.parse(response);
    if (response.error) {
        if (Main_A_includes_B((response.error + ''), 'Not Found')) {
            AddCode_IsFollowing = false;
            if (AddCode_PlayRequest) Play_setFollow();
            else ChannelContent_setFollow();
        } else AddCode_RequestCheckFollowError();
    } else AddCode_RequestCheckFollowError();
}

function AddCode_RequestCheckFollowError(tryes) {
    if (tryes < DefaultHttpGetReTryMax) AddCode_RequestCheckFollow(tryes + 1);
    else {
        if (AddCode_PlayRequest) Play_setFollow();
        else ChannelContent_setFollow();
    }
}

function AddCode_Follow() {
    AddCode_FollowRequest(0);
}

function AddCode_FollowRequest(tryes) {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'PUT', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_FollowRequestReady, tryes);
}

function AddCode_FollowRequestReady(xmlHttp, tryes) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) { //success user now is following the channel
            AddCode_IsFollowing = true;
            if (AddCode_PlayRequest) {
                Play_setFollow();
                ChatLive_checkFallowSuccessUpdate(xmlHttp.responseText, 0);
            } else ChannelContent_setFollow();
            return;
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(0, 0, AddCode_Follow, null);
        } else {
            AddCode_FollowRequestError(tryes);
        }
    }
}

function AddCode_FollowRequestError(tryes) {
    if (tryes < DefaultHttpGetReTryMax) AddCode_FollowRequest(tryes + 1);
}

function AddCode_UnFollow() {
    AddCode_UnFollowRequest(0);
}

function AddCode_UnFollowRequest(tryes) {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'DELETE', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_UnFollowRequestReady, tryes);
}

function AddCode_UnFollowRequestReady(xmlHttp, tryes) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 204) { //success user is now not following the channel
            AddCode_IsFollowing = false;
            if (AddCode_PlayRequest) {
                Play_setFollow();
                ChatLive_FollowState[0].follows = false;
            } else ChannelContent_setFollow();
            return;
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(0, 0, AddCode_UnFollow, null);
        } else {
            AddCode_UnFollowRequestError(tryes);
        }
    }
}

function AddCode_UnFollowRequestError(tryes) {
    if (tryes < DefaultHttpGetReTryMax) AddCode_UnFollowRequest(tryes + 1);
}

function AddCode_CheckSub() {
    AddCode_IsSub = false;
    AddCode_RequestCheckSub(0);
}

function AddCode_RequestCheckSub(tryes) {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/subscriptions/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'GET', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_RequestCheckSubReady, tryes);
}

function AddCode_RequestCheckSubReady(xmlHttp, tryes) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) { //success yes user is a SUB
            AddCode_IsSub = true;
            PlayVod_isSub();
        } else if (xmlHttp.status === 422) { //channel does not have a subscription program
            AddCode_RequestCheckSubfail();
        } else if (xmlHttp.status === 404) { //success no user is not a sub
            var response = JSON.parse(xmlHttp.responseText);
            if (response.error) {
                if (Main_A_includes_B((response.error + ''), 'Not Found')) {
                    AddCode_RequestCheckSubfail();
                } else AddCode_RequestCheckSubError(tryes);
            } else AddCode_RequestCheckSubError(tryes);
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(0, 0, AddCode_CheckSub, AddCode_RequestCheckSubfail);
        } else { // internet error
            AddCode_RequestCheckSubError(tryes);
        }
    }
}

function AddCode_RequestCheckSubError(tryes) {
    if (tryes < DefaultHttpGetReTryMax) AddCode_RequestCheckSub(tryes + 1);
    else AddCode_RequestCheckSubfail();
}

function AddCode_RequestCheckSubfail() {
    AddCode_IsSub = false;
    PlayVod_NotSub();
}

function AddCode_FollowGame() {
    if (Main_values.Main_gameSelected_id) AddCode_RequestFollowGame(0);
    else AddCode_GetGameId(0);
}

function AddCode_GetGameId(tryes) {
    var theUrl = 'https://api.twitch.tv/api/games/' + encodeURIComponent(Main_values.Main_gameSelected);

    AddCode_BasexmlHttpGetBack(theUrl, 'GET', 2, null, AddCode_GetGameIdReady, tryes);
}

function AddCode_GetGameIdReady(xmlHttp, tryes) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
            Main_values.Main_gameSelected_id = JSON.parse(xmlHttp.responseText)._id;
            AddCode_RequestFollowGame(0);
            return;
        } else { // internet error
            AddCode_GetGameIdError(tryes);
        }
    }
}

function AddCode_GetGameIdError(tryes) {
    if (tryes < DefaultHttpGetReTryMax) AddCode_GetGameId(tryes + 1);
}

function AddCode_RequestFollowGame(tryes) {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/games/' +
        Main_values.Main_gameSelected_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'PUT', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_RequestFollowGameReady, tryes);
}

function AddCode_RequestFollowGameReady(xmlHttp, tryes) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) { //success we now follow the game
            AGame_following = true;
            AGame_setFollow();
            return;
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(0, 0, AddCode_FollowGame, null);
        } else { // internet error
            AddCode_FollowGameRequestError(tryes);
        }
    }
}

function AddCode_FollowGameRequestError(tryes) {
    if (tryes < DefaultHttpGetReTryMax) AddCode_RequestFollowGame(tryes + 1);
}

function AddCode_UnFollowGame() {
    AddCode_RequestUnFollowGame(0);
}

function AddCode_RequestUnFollowGame(tryes) {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/games/' +
        Main_values.Main_gameSelected_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'DELETE', 2, null, AddCode_UnFollowGameJs, tryes);
}

function AddCode_UnFollowGameJs(xmlHttp, tryes) {
    if (xmlHttp.readyState === 4) AddCode_UnFollowGameEnd(xmlHttp, tryes);
}

function AddCode_UnFollowGameEnd(xmlHttp, tryes) {
    if (xmlHttp.status === 404 || xmlHttp.status === 204) { // success we now unfollow the game
        if (xmlHttp.status === 204) { // success we now unfollow the game
            AGame_following = false;
            AGame_setFollow();
        } else if (Main_A_includes_B(JSON.parse(xmlHttp.responseText).message, 'does not follow')) {
            AGame_following = false;
            AGame_setFollow();
        } else AddCode_UnFollowGameRequestError(tryes);
    } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
        AddCode_refreshTokens(0, 0, AddCode_UnFollowGame, null);
    } else { // internet error
        AddCode_UnFollowGameRequestError(tryes);
    }
}

function AddCode_UnFollowGameRequestError(tryes) {
    if (tryes < DefaultHttpGetReTryMax) AddCode_RequestUnFollowGame(tryes + 1);
    else {
        Main_showWarningDialog(STR_410_FEATURING, 2000);
    }
}

function AddCode_CheckFollowGame() {
    AddCode_RequestCheckFollowGame(0);
}

function AddCode_RequestCheckFollowGame(tryes) {
    var theUrl = 'https://api.twitch.tv/api/users/' + AddUser_UsernameArray[0].name + '/follows/games/' +
        encodeURIComponent(Main_values.Main_gameSelected) + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGetBack(theUrl, 'GET', 2, null, AddCode_CheckFollowGameReady, tryes);
}

function AddCode_CheckFollowGameReady(xmlHttp, tryes) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) { //success yes user follows
            AGame_following = true;
            AGame_setFollow();
            return;
        } else if (xmlHttp.status === 404) { //success no user doesnot follows
            AGame_following = false;
            AGame_setFollow();
            return;
        } else { // internet error
            AddCode_CheckFollowGameError(tryes);
            return;
        }
    }
}

function AddCode_CheckFollowGameError(tryes) {
    if (tryes < DefaultHttpGetReTryMax) AddCode_RequestCheckFollowGame(tryes + 1);
    else {
        AGame_following = false;
        AGame_setFollow();
    }
}

function AddCode_BasexmlHttpGet(theUrl, Method, HeaderQuatity, access_token, callbackready, tryes) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open(Method, theUrl, true);
    xmlHttp.timeout = (DefaultHttpGetTimeout * 2) + (DefaultHttpGetTimeoutPlus * tryes);

    Main_Headers[2][1] = access_token;

    for (var i = 0; i < HeaderQuatity; i++)
        xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

    xmlHttp.onreadystatechange = function() {
        callbackready(xmlHttp, tryes);
    };

    xmlHttp.send(null);
}

function AddCode_BasexmlHttpGetValidate(callbackready, position, tryes) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", AddCode_ValidateUrl, true);
    xmlHttp.setRequestHeader(Main_Authorization, Main_OAuth + AddUser_UsernameArray[position].access_token);

    xmlHttp.timeout = (DefaultHttpGetTimeout * 2) + (DefaultHttpGetTimeoutPlus * tryes);

    xmlHttp.onreadystatechange = function() {
        callbackready(xmlHttp, position, tryes);
    };

    xmlHttp.send(null);
}

function AddCode_BasexmlHttpGetBack(theUrl, type, HeaderQuatity, access_token, callbackready, tryes) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open(type, theUrl, true);
    xmlHttp.timeout = (DefaultHttpGetTimeout * 2) + (DefaultHttpGetTimeoutPlus * tryes);

    Main_Headers_Priv[2][1] = access_token;

    for (var i = 0; i < HeaderQuatity; i++)
        xmlHttp.setRequestHeader(Main_Headers_Priv[i][0], Main_Headers_Priv[i][1]);

    xmlHttp.onreadystatechange = function() {
        callbackready(xmlHttp, tryes);
    };

    xmlHttp.send(null);
}
