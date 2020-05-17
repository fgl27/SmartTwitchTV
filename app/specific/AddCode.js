
//Variable initialization
var AddCode_loadingDataTry = 0;
var AddCode_loadingDataTimeout = 10000;
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
var AddCode_client_secret = "elsu5d09k0xomu7cggx3qg5ybdwu7g";
var AddCode_UrlToken = 'https://id.twitch.tv/oauth2/token?';
var AddCode_ValidateUrl = 'https://id.twitch.tv/oauth2/validate';
//Variable initialization end

function AddCode_CheckNewCode(code) {
    AddCode_Code = code;
    AddCode_loadingDataTry = 0;
    Main_showLoadDialog();
    AddCode_requestTokens();
}

function AddCode_refreshTokens(position, tryes, callbackFunc, callbackFuncNOK, key, sync) {
    //Main_Log('AddCode_refreshTokens');
    if (!AddUser_UsernameArray[position] || !AddUser_UsernameArray[position].access_token) return;

    var xmlHttp,
        url = AddCode_UrlToken + 'grant_type=refresh_token&client_id=' +
            encodeURIComponent(Main_clientId) + '&client_secret=' + encodeURIComponent(AddCode_client_secret) +
            '&refresh_token=' + encodeURIComponent(AddUser_UsernameArray[position].refresh_token) +
            '&redirect_uri=' + AddCode_redirect_uri;

    //Run in synchronous mode to prevent anything happening until user token is restored
    if (sync) {
        try {
            xmlHttp = Android.mMethodUrlHeaders(
                url,
                AddCode_loadingDataTimeout,
                'POST',
                null,
                0,
                JSON.stringify([])
            );

            if (xmlHttp) {

                xmlHttp = JSON.parse(xmlHttp);

                if (xmlHttp) AddCode_refreshTokensReady(position, tryes, callbackFunc, callbackFuncNOK, key, xmlHttp, sync);

                return;
            }

            AddCode_refreshTokensError(position, tryes, callbackFunc, callbackFuncNOK, key, sync);
        } catch (e) {
            AddCode_refreshTokens(position, tryes, callbackFunc, callbackFuncNOK, key, false);
        }
    } else {
        xmlHttp = new XMLHttpRequest();

        xmlHttp.open("POST", url, true);
        xmlHttp.timeout = AddCode_loadingDataTimeout;

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
            var response = JSON.parse(xmlHttp.responseText);
            if (response.message) {
                if (Main_A_includes_B(response.message, 'Invalid refresh token')) {

                    AddCode_requestTokensFailRunning(position);
                    if (callbackFuncNOK) callbackFuncNOK(key);

                    return;
                }
            }
        } catch (e) {
            //Main_Log('AddCode_refreshTokens e ' + e);
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
    for (var i = 0; i < AddCode_Scopes.length; i++) {
        if (!Main_A_includes_B(scope, AddCode_Scopes[i])) return false;
    }
    return true;
}

function AddCode_requestTokens() {
    var theUrl = AddCode_UrlToken + 'grant_type=authorization_code&client_id=' +
        encodeURIComponent(Main_clientId) + '&client_secret=' + encodeURIComponent(AddCode_client_secret) +
        '&code=' + encodeURIComponent(AddCode_Code) + '&redirect_uri=' + AddCode_redirect_uri;

    AddCode_BasexmlHttpGet(theUrl, 'POST', 0, null, AddCode_requestTokensReady);
}

function AddCode_requestTokensReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
            AddCode_requestTokensSucess(xmlHttp.responseText);
        } else AddCode_requestTokensError();
        return;
    }
}

function AddCode_requestTokensError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < DefaultLoadingDataTryMax) {
        AddCode_requestTokens();
    } else AddCode_requestTokensFail();

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
            Main_LoadUrl(Main_IsOnAndroid ? Android.mPageUrl() : AddCode_redirect_uri);
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
    AddCode_loadingDataTry = 0;
    AddCode_CheckOauthToken();
}

function AddCode_CheckOauthToken() {
    AddCode_BasexmlHttpGetValidate(AddCode_CheckOauthTokenReady, Main_values.Users_AddcodePosition, 0);
}

function AddCode_CheckOauthTokenReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) AddCode_CheckOauthTokenSucess(xmlHttp.responseText);
        else AddCode_CheckOauthTokenError();
    }
}

function AddCode_CheckOauthTokenSucess(response) {
    var token = JSON.parse(response);
    if (token.login && Main_A_includes_B(token.login, AddUser_UsernameArray[Main_values.Users_AddcodePosition].name)) {
        AddUser_SaveUserArray();
        Main_newUsercode = 0;
        Main_HideLoadDialog();
        Users_status = false;
        Main_values.Main_Go = Main_Users;
        Main_SaveValues();
        Main_showWarningDialog(STR_USER_CODE_OK);
        if (Main_IsOnAndroid) Android.clearCookie();
        Main_setTimeout(
            function() {
                Main_LoadUrl(Main_IsOnAndroid ? Android.mPageUrl() : AddCode_redirect_uri);
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
                Main_LoadUrl(Main_IsOnAndroid ? Android.mPageUrl() : AddCode_redirect_uri);
            },
            4000
        );
    }
    return;
}

function AddCode_CheckOauthTokenError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < DefaultLoadingDataTryMax) AddCode_CheckOauthToken();
    else AddCode_requestTokensFail();
}

function AddCode_CheckTokenStart(position) {
    //Main_Log('AddCode_CheckTokenStart');

    if (!position) AddCode_CheckTokenSync(position, 0);
    else AddCode_CheckToken(position, 0);
}

//Run in synchronous mode to prevent anything happening until user token is checked and if needed restored
function AddCode_CheckTokenSync(position, tryes) {
    //Main_Log('AddCode_CheckToken');

    try {
        var xmlHttp = Android.mMethodUrlHeaders(
            AddCode_ValidateUrl,
            AddCode_loadingDataTimeout,
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
    } catch (e) {
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

    if (tryes < DefaultLoadingDataTryMax) {

        if (!position) AddCode_CheckTokenSync(position, tryes + 1);
        else AddCode_CheckToken(position, tryes + 1);

    }

}

function AddCode_CheckFollow() {
    AddCode_loadingDataTry = 0;
    AddCode_IsFollowing = false;
    AddCode_RequestCheckFollow();
}

function AddCode_RequestCheckFollow() {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'GET', 2, null, AddCode_RequestCheckFollowReady);
}

function AddCode_RequestCheckFollowReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) { //yes
            AddCode_RequestCheckFollowOK();
        } else if (xmlHttp.status === 404) { //no
            AddCode_RequestCheckFollowNOK(xmlHttp.responseText);
        } else { // internet error
            AddCode_RequestCheckFollowError();
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

function AddCode_RequestCheckFollowError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < DefaultLoadingDataTryMax) AddCode_RequestCheckFollow();
    else {
        if (AddCode_PlayRequest) Play_setFollow();
        else ChannelContent_setFollow();
    }
}

function AddCode_Follow() {
    AddCode_loadingDataTry = 0;
    AddCode_FollowRequest();
}

function AddCode_FollowRequest() {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'PUT', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_FollowRequestReady);
}

function AddCode_FollowRequestReady(xmlHttp) {
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
            AddCode_FollowRequestError();
        }
    }
}

function AddCode_FollowRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < DefaultLoadingDataTryMax) AddCode_FollowRequest();
}

function AddCode_UnFollow() {
    AddCode_loadingDataTry = 0;
    AddCode_UnFollowRequest();
}

function AddCode_UnFollowRequest() {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'DELETE', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_UnFollowRequestReady);
}

function AddCode_UnFollowRequestReady(xmlHttp) {
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
            AddCode_UnFollowRequestError();
        }
    }
}

function AddCode_UnFollowRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < DefaultLoadingDataTryMax) AddCode_UnFollowRequest();
}

function AddCode_CheckSub() {
    AddCode_loadingDataTry = 0;
    AddCode_IsSub = false;
    AddCode_RequestCheckSub();
}

function AddCode_RequestCheckSub() {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/subscriptions/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'GET', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_RequestCheckSubReady);
}

function AddCode_RequestCheckSubReady(xmlHttp) {
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
                } else AddCode_RequestCheckSubError();
            } else AddCode_RequestCheckSubError();
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(0, 0, AddCode_CheckSub, AddCode_RequestCheckSubfail);
        } else { // internet error
            AddCode_RequestCheckSubError();
        }
    }
}

function AddCode_RequestCheckSubError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < DefaultLoadingDataTryMax) AddCode_RequestCheckSub();
    else AddCode_RequestCheckSubfail();
}

function AddCode_RequestCheckSubfail() {
    AddCode_IsSub = false;
    PlayVod_NotSub();
}

function AddCode_FollowGame() {
    AddCode_loadingDataTry = 0;
    if (Main_values.Main_gameSelected_id) AddCode_RequestFollowGame();
    else AddCode_GetGameId();
}

function AddCode_GetGameId() {
    var theUrl = 'https://api.twitch.tv/api/games/' + encodeURIComponent(Main_values.Main_gameSelected);

    AddCode_BasexmlHttpGetBack(theUrl, 'GET', 2, null, AddCode_GetGameIdReady);
}

function AddCode_GetGameIdReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
            Main_values.Main_gameSelected_id = JSON.parse(xmlHttp.responseText)._id;
            AddCode_loadingDataTry = 0;
            AddCode_RequestFollowGame();
            return;
        } else { // internet error
            AddCode_GetGameIdError();
        }
    }
}

function AddCode_GetGameIdError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < DefaultLoadingDataTryMax) AddCode_GetGameId();
}

function AddCode_RequestFollowGame() {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/games/' +
        Main_values.Main_gameSelected_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'PUT', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_RequestFollowGameReady);
}

function AddCode_RequestFollowGameReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) { //success we now follow the game
            AGame_following = true;
            AGame_setFollow();
            return;
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(0, 0, AddCode_FollowGame, null);
        } else { // internet error
            AddCode_FollowGameRequestError();
        }
    }
}

function AddCode_FollowGameRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < DefaultLoadingDataTryMax) AddCode_RequestFollowGame();
}

function AddCode_UnFollowGame() {
    AddCode_loadingDataTry = 0;
    AddCode_RequestUnFollowGame();
}

function AddCode_RequestUnFollowGame() {
    var theUrl = 'https://api.twitch.tv/api/users/' + AddUser_UsernameArray[0].name +
        '/follows/games/' + encodeURIComponent(Main_values.Main_gameSelected) + '?oauth_token=' +
        AddUser_UsernameArray[0].access_token + Main_TwithcV5Flag;

    if (Main_IsOnAndroid)
        AddCode_BasereadwritedUrl(theUrl, 'DELETE', 2, null, AddCode_UnFollowGameAndroid);
    else
        AddCode_BasexmlHttpGet(theUrl, 'DELETE', 2, null, AddCode_UnFollowGameJs);
}

function AddCode_UnFollowGameAndroid(xmlHttp) {
    if (xmlHttp !== null) AddCode_UnFollowGameEnd(xmlHttp);
    else AddCode_UnFollowGameRequestError();
}

function AddCode_UnFollowGameJs(xmlHttp) {
    if (xmlHttp.readyState === 4) AddCode_UnFollowGameEnd(xmlHttp);
}

function AddCode_UnFollowGameEnd(xmlHttp) {
    if (xmlHttp.status === 404 || xmlHttp.status === 204) { // success we now unfollow the game
        if (xmlHttp.status === 204) { // success we now unfollow the game
            AGame_following = false;
            AGame_setFollow();
        } else if (Main_A_includes_B(JSON.parse(xmlHttp.responseText).message, 'does not follow')) {
            AGame_following = false;
            AGame_setFollow();
        } else AddCode_UnFollowGameRequestError();
    } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
        AddCode_refreshTokens(0, 0, AddCode_UnFollowGame, null);
    } else { // internet error
        AddCode_UnFollowGameRequestError();
    }
}

function AddCode_UnFollowGameRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < DefaultLoadingDataTryMax) AddCode_RequestUnFollowGame();
    else {
        Main_showWarningDialog(STR_410_FEATURING);
        Main_setTimeout(Main_HideWarningDialog, 2000);
    }
}

function AddCode_CheckFollowGame() {
    AddCode_loadingDataTry = 0;
    AddCode_RequestCheckFollowGame();
}

function AddCode_RequestCheckFollowGame() {
    var theUrl = 'https://api.twitch.tv/api/users/' + AddUser_UsernameArray[0].name + '/follows/games/' +
        encodeURIComponent(Main_values.Main_gameSelected) + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGetBack(theUrl, 'GET', 2, null, AddCode_CheckFollowGameReady);
}

function AddCode_CheckFollowGameReady(xmlHttp) {
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
            AddCode_CheckFollowGameError();
            return;
        }
    }
}

function AddCode_CheckFollowGameError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < DefaultLoadingDataTryMax) AddCode_RequestCheckFollowGame();
    else {
        AGame_following = false;
        AGame_setFollow();
    }
}

function AddCode_BasexmlHttpGet(theUrl, Method, HeaderQuatity, access_token, callbackready) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open(Method, theUrl, true);
    xmlHttp.timeout = AddCode_loadingDataTimeout;

    Main_Headers[2][1] = access_token;

    for (var i = 0; i < HeaderQuatity; i++)
        xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

    xmlHttp.onreadystatechange = function() {
        callbackready(xmlHttp);
    };

    xmlHttp.send(null);
}

function AddCode_BasexmlHttpGetValidate(callbackready, position, tryes) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", AddCode_ValidateUrl, true);
    xmlHttp.setRequestHeader(Main_Authorization, Main_OAuth + AddUser_UsernameArray[position].access_token);

    xmlHttp.timeout = AddCode_loadingDataTimeout;

    xmlHttp.onreadystatechange = function() {
        callbackready(xmlHttp, position, tryes);
    };

    xmlHttp.send(null);
}

function AddCode_BasereadwritedUrl(theUrl, Method, HeaderQuatity, access_token, callbackready) {
    var xmlHttp = Android.mMethodUrl(theUrl, 5000, HeaderQuatity, access_token, null, null, Method);

    if (xmlHttp) callbackready(JSON.parse(xmlHttp));
    else callbackready(xmlHttp);

}

function AddCode_BasexmlHttpGetBack(theUrl, type, HeaderQuatity, access_token, callbackready) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open(type, theUrl, true);
    xmlHttp.timeout = AddCode_loadingDataTimeout;

    Main_Headers_Back[2][1] = access_token;

    for (var i = 0; i < HeaderQuatity; i++)
        xmlHttp.setRequestHeader(Main_Headers_Back[i][0], Main_Headers_Back[i][1]);

    xmlHttp.onreadystatechange = function() {
        callbackready(xmlHttp);
    };

    xmlHttp.send(null);
}