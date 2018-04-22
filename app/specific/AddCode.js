//Variable initialization
var addCode_loadingDataTry = 0;
var addCode_loadingDataTryMax = 10;
var addCode_loadingDataTimeout = 10000;
var addCode_UsercodeArray = [];
var addCode_UserIdArray = [];
var addCode_Followercount = 0;
var addCode_Username = null;
var addCode_loadingData = false;
var addCode_keyBoardOn = false;
var addCode_userId = '';
var addCode_userChannel = '';
var addCode_OauthToken = '';
var addCode_IsFallowing = false;
var addCode_IsSub = false;
var addCode_PlayRequest = false;
//Variable initialization end

function addCode_init() {
    if (addCode_OauthToken !== '') {
        addCode_TimeoutReset10();
        addCode_CheckToken();
        Users.init();
        return;
    } else {
        main_Go = main_addCode;
        document.getElementById('top_bar_user').classList.add('icon_center_focus');
        main_HideWarningDialog();
        addCode_input = document.querySelector('#oauth_input');
        document.getElementById("oauth_input").placeholder = STR_PLACEHOLDER_OAUTH;
        document.getElementById("oauth_text").innerHTML = STR_OAUTH_IN + main_UserName + STR_OAUTH_EXPLAIN;
        addCode_inputFocus();
        addUser_scrollVerticalToElementById('oauth_input');
    }
}

function addCode_exit() {
    addCode_RemoveinputFocus();
    document.body.removeEventListener("keydown", addCode_handleKeyDown);
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
}

function addCode_handleKeyDown(event) {
    if (addCode_loadingData || addCode_keyBoardOn) return;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (main_isAboutDialogShown()) main_HideAboutDialog();
            else if (main_isControlsDialogShown()) main_HideControlsDialog();
            else {
                main_Go = main_Users;
                addCode_exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_CHANNELUP:
            main_Go = main_games;
            addCode_exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            main_Go = main_Live;
            addCode_exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            addCode_inputFocus();
            break;
        case TvKeyCode.KEY_RED:
            main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            addCode_exit();
            main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            main_BeforeSearch = main_Go;
            main_Go = main_Search;
            addCode_exit();
            main_SwitchScreen();
            break;
        default:
            break;
    }
}

function addCode_inputFocus() {
    document.body.removeEventListener("keydown", addCode_handleKeyDown);
    document.body.addEventListener("keydown", addCode_KeyboardEvent, false);
    addCode_input.addEventListener('input');
    addCode_input.addEventListener('compositionend');
    document.getElementById("oauth_input").placeholder = STR_PLACEHOLDER_OAUTH;
    addCode_input.focus();
    addCode_keyBoardOn = true;
}

function addCode_RemoveinputFocus() {
    addCode_input.blur();
    document.body.removeEventListener("keydown", addCode_KeyboardEvent);
    document.body.addEventListener("keydown", addCode_handleKeyDown, false);
    document.getElementById("oauth_input").placeholder = STR_PLACEHOLDER_PRESS + STR_PLACEHOLDER_OAUTH;
    window.setTimeout(function() {
        addCode_keyBoardOn = false;
    }, 250);
}

function addCode_KeyboardEvent(event) {
    if (addCode_loadingData) return;

    switch (event.keyCode) {
        case TvKeyCode.KEY_KEYBOARD_DELETE_ALL:
            document.getElementById("oauth_input").value = '';
            event.preventDefault();
            break;
        case TvKeyCode.KEY_KEYBOARD_DONE:
        case TvKeyCode.KEY_KEYBOARD_CANCEL:
            if ($('#oauth_input').val() !== '' && $('#oauth_input').val() !== null) {

                document.getElementById("oauth_input").value = $('#oauth_input').val();
                addCode_OauthToken = $('#oauth_input').val();

                addCode_TimeoutReset10();
                main_showLoadDialog();
                addUser_scrollVerticalToElementById('blank_focus');
                addCode_CheckKey();
            }
            addCode_RemoveinputFocus();
            break;
        case TvKeyCode.KEY_KEYBOARD_BACKSPACE:
            document.getElementById("oauth_input").value = $('#oauth_input').val().slice(0, -1);
            event.preventDefault();
            break;
        case TvKeyCode.KEY_KEYBOARD_SPACE:
            document.getElementById("oauth_input").value = $('#oauth_input').val() + ' ';
            event.preventDefault();
            break;
        default:
            break;
    }
}

function addCode_OldRestoreUsers() {
    addCode_UsercodeArray = [];
    var size = parseInt(localStorage.getItem('UsercodeArraySize')) || 0;
    if (size > 0)
        for (var x = 0; x < size; x++)
            addCode_UsercodeArray[x] = localStorage.getItem('UsercodeArray' + x);

    addCode_SaveKeyArray();
}

function addCode_RestoreUsers() {
    addCode_UsercodeArray = JSON.parse(localStorage.getItem("userkeys")) || [];

    //TODO remove this after some time, the app is in use and OldRestoreUsers is needed
    if (!addCode_UsercodeArray.length) addCode_OldRestoreUsers();

    addCode_SetDefaultOAuth(0);
}

function addCode_SaveNewUser() {
    addCode_UsercodeArray.push(addCode_Username + ',' + addCode_userId + ',' + addCode_OauthToken);
    addCode_SaveKeyArray();

    main_HideLoadDialog();
    Users.init();
    addCode_loadingData = false;
}

function addCode_removeUser(Position) {
    var index = addCode_UsercodeArray.indexOf(addCode_UsercodeArray[Position]);
    if (index > -1) addCode_UsercodeArray.splice(index, 1);
    addCode_SaveKeyArray();
}

function addCode_SaveKeyArray() {
    localStorage.setItem("userkeys", JSON.stringify(addCode_UsercodeArray));
}

function addCode_SetDefaultOAuth(position) {
    if (addUser_UsernameArray.length > 0) main_UserName = addUser_UsernameArray[position];
    if (addCode_UsercodeArray.length > 0) {
        var userCode = addCode_UserCodeExist(addUser_UsernameArray[position]);
        if (userCode > -1) {
            var values = addCode_UsercodeArray[userCode].split(",");
            addCode_Username = values[0];
            addCode_userId = values[1];
            addCode_OauthToken = values[2];
        } else addCode_SetemptyOAuth();
    } else addCode_SetemptyOAuth();
}

function addCode_SetemptyOAuth() {
    addCode_Username = '';
    addCode_userId = '';
    addCode_OauthToken = '';
}

function addCode_UserCodeExist(user) {
    for (var i = 0; i < addCode_UsercodeArray.length; i++) {
        if (user === addCode_UsercodeArray[i].split(",")[0]) return i;
    }
    return -1;
}

function addCode_CheckKey() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken?oauth_token=' + addCode_OauthToken, true);
        xmlHttp.timeout = addCode_loadingDataTimeout;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    addCode_CheckKeySuccess(xmlHttp.responseText);
                    return;
                } else {
                    addCode_CheckKeyError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        addCode_CheckKeyError();
    }
}

function addCode_CheckKeyError() {
    addCode_loadingDataTry++;
    if (addCode_loadingDataTry < addCode_loadingDataTryMax) {
        addCode_loadingDataTimeout += (addCode_loadingDataTry < 5) ? 250 : 3500;
        addCode_CheckKey();
    } else {
        addCode_loadingData = false;
        main_HideLoadDialog();
        main_showWarningDialog(STR_OAUTH_FAIL);
        window.setTimeout(function() {
            main_HideWarningDialog();
            addCode_inputFocus();
        }, 4000);
    }
}

function addCode_CheckKeySuccess(responseText) {
    if (Users.checkKey(responseText)) {
        addCode_Username = JSON.parse(responseText).token.user_name + '';
        addCode_TimeoutReset10();
        addCode_isCheckFallow = false;
        addCode_CheckId();
    } else {
        main_HideLoadDialog();
        main_showWarningDialog(STR_OAUTH_WRONG + main_UserName + STR_OAUTH_WRONG2 + addCode_Username);
        window.setTimeout(function() {
            main_HideWarningDialog();
            addCode_inputFocus();
        }, 3500);
    }
}

function addCode_CheckId() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users?login=' + main_UserName, true);
        xmlHttp.timeout = addCode_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    if (addCode_isCheckFallow) addCode_CheckFallowId(xmlHttp.responseText);
                    else addCode_CheckIdSuccess(xmlHttp.responseText);
                    return;
                } else {
                    addCode_CheckIdError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        addCode_CheckIdError();
    }
}

function addCode_CheckIdError() {
    addCode_loadingDataTry++;
    if (addCode_loadingDataTry < addCode_loadingDataTryMax) {
        addCode_loadingDataTimeout += (addCode_loadingDataTry < 5) ? 250 : 3500;
        addCode_CheckId();
    }
}

function addCode_CheckIdSuccess(responseText) {
    addCode_userId = JSON.parse(responseText).users[0]._id;
    document.getElementById("oauth_input").value = '';
    document.body.removeEventListener("keydown", addCode_handleKeyDown);
    Users.SetKeyTitle(true);
    addCode_SaveNewUser();
}

function addCode_CheckFallow() {
    addCode_TimeoutReset10();
    addCode_IsFallowing = false;
    if (addCode_userId !== '') addCode_RequestCheckFallow();
    else {
        addCode_isCheckFallow = true;
        addCode_CheckId();
    }
}

function addCode_CheckFallowId(responseText) {
    var users = JSON.parse(responseText).users[0];
    if (users !== undefined) {
        addCode_userId = users._id;
        addCode_TimeoutReset10();
        addCode_IsFallowing = false;
        addCode_RequestCheckFallow();
    } else {
        addCode_IsFallowing = false;
        addCode_loadingData = false;
        if (addCode_PlayRequest) Play_setFallow();
        else SChannelContent.setFallow();
    }
}

function addCode_RequestCheckFallow() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + addCode_userId + '/follows/channels/' + addCode_userChannel, true);
        xmlHttp.timeout = addCode_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //yes
                    addCode_IsFallowing = true;
                    addCode_loadingData = false;
                    if (addCode_PlayRequest) Play_setFallow();
                    else SChannelContent.setFallow();
                    return;
                } else if (xmlHttp.status === 404) { //no
                    if ((JSON.parse(xmlHttp.responseText).error + '').indexOf('Not Found') !== -1) {
                        addCode_IsFallowing = false;
                        addCode_loadingData = false;
                        if (addCode_PlayRequest) Play_setFallow();
                        else SChannelContent.setFallow();
                        return;
                    } else addCode_RequestCheckFallowError();
                } else { // internet error
                    addCode_RequestCheckFallowError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        addCode_RequestCheckFallowError();
    }
}

function addCode_RequestCheckFallowError() {
    addCode_loadingDataTry++;
    if (addCode_loadingDataTry < addCode_loadingDataTryMax) {
        addCode_loadingDataTimeout += (addCode_loadingDataTry < 5) ? 250 : 3500;
        addCode_RequestCheckFallow();
    } else {
        addCode_loadingData = false;
        if (addCode_PlayRequest) Play_setFallow();
        else SChannelContent.setFallow();
    }
}

function addCode_Fallow() {
    addCode_TimeoutReset10();
    addCode_FallowRequest();
}

function addCode_FallowRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("PUT", 'https://api.twitch.tv/kraken/users/' + addCode_userId + '/follows/channels/' + addCode_userChannel, true);
        xmlHttp.timeout = addCode_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.setRequestHeader('Authorization', 'OAuth ' + addCode_OauthToken);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //success user now is fallowing the channel
                    addCode_loadingData = false;
                    addCode_IsFallowing = true;
                    if (addCode_PlayRequest) Play_setFallow();
                    else SChannelContent.setFallow();
                    return;
                } else {
                    addCode_FallowRequestError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        addCode_FallowRequestError();
    }
}

function addCode_FallowRequestError() {
    addCode_loadingDataTry++;
    if (addCode_loadingDataTry < addCode_loadingDataTryMax) {
        addCode_loadingDataTimeout += 3500;
        addCode_FallowRequest();
    }
}

function addCode_UnFallow() {
    addCode_TimeoutReset10();
    addCode_UnFallowRequest();
}

function addCode_UnFallowRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("DELETE", 'https://api.twitch.tv/kraken/users/' + addCode_userId + '/follows/channels/' + addCode_userChannel, true);
        xmlHttp.timeout = addCode_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.setRequestHeader('Authorization', 'OAuth ' + addCode_OauthToken);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 204) { //success user is now not fallowing the channel
                    addCode_IsFallowing = false;
                    addCode_loadingData = false;
                    if (addCode_PlayRequest) Play_setFallow();
                    else SChannelContent.setFallow();
                    return;
                } else {
                    addCode_UnFallowRequestError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        addCode_UnFallowRequestError();
    }
}

function addCode_UnFallowRequestError() {
    addCode_loadingDataTry++;
    if (addCode_loadingDataTry < addCode_loadingDataTryMax) {
        addCode_loadingDataTimeout += 3500;
        addCode_UnFallowRequest();
    }
}

function addCode_CheckSub() {
    addCode_TimeoutReset10();
    addCode_IsSub = false;
    addCode_RequestCheckSub();
}

function addCode_TimeoutReset10() {
    addCode_loadingDataTry = 0;
    addCode_loadingDataTimeout = 10000;
    addCode_loadingData = true;
}

function addCode_RequestCheckSub() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + addCode_userId + '/subscriptions/' + addCode_userChannel, true);
        xmlHttp.timeout = addCode_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.setRequestHeader('Authorization', 'OAuth ' + addCode_OauthToken);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //success yes user is a SUB
                    addCode_IsSub = true;
                    addCode_loadingData = false;
                    PlayVod_isSub();
                    return;
                } else if (xmlHttp.status === 422) { //channel does not have a subscription program
                    console.log('channel does not have a subscription program');
                } else if (xmlHttp.status === 404) { //success no user is not a sub
                    if ((JSON.parse(xmlHttp.responseText).error + '').indexOf('Not Found') !== -1) {
                        addCode_IsSub = false;
                        addCode_loadingData = false;
                        PlayVod_NotSub();
                        return;
                    } else addCode_RequestCheckSubError();
                } else { // internet error
                    addCode_RequestCheckSubError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        addCode_RequestCheckSubError();
    }
}

function addCode_RequestCheckSubError() {
    addCode_loadingDataTry++;
    if (addCode_loadingDataTry < addCode_loadingDataTryMax) {
        addCode_loadingDataTimeout += (addCode_loadingDataTry < 5) ? 250 : 3500;
        addCode_RequestCheckSub();
    } else {
        addCode_loadingData = false;
    }
}

function addCode_CheckToken() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken?oauth_token=' + addCode_OauthToken, true);
        xmlHttp.timeout = addCode_loadingDataTimeout;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    var bool = Users.checkKey(xmlHttp.responseText);
                    Users.SetKeyTitle(bool);
                    main_showWarningDialog(bool ? STR_KEY_OK : STR_KEY_BAD);
                    window.setTimeout(function() {
                        main_HideWarningDialog();
                    }, 4000);
                    addCode_loadingData = false;
                    return;
                } else {
                    addCode_CheckTokenError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        addCode_CheckTokenError();
    }
}

function addCode_CheckTokenError() {
    addCode_loadingDataTry++;
    if (addCode_loadingDataTry < addCode_loadingDataTryMax) {
        addCode_loadingDataTimeout += (addCode_loadingDataTry < 5) ? 250 : 3500;
        addCode_CheckToken();
    } else {
        main_showWarningDialog(STR_USER_CODE_BAD);
        Users.SetKeyTitle(false);
        window.setTimeout(function() {
            main_HideWarningDialog();
        }, 4000);
        addCode_loadingData = false;
    }
}

function addCode_CheckTokenStart(position) {
    try {

        var userCode = addCode_UserCodeExist(addUser_UsernameArray[position]);
        if (userCode > -1) {
            addCode_OauthToken = addCode_UsercodeArray[userCode].split(",")[2];
            main_UserName = addUser_UsernameArray[position];

            var xmlHttp = new XMLHttpRequest();

            xmlHttp.open("GET", 'https://api.twitch.tv/kraken?oauth_token=' + addCode_OauthToken, true);
            xmlHttp.timeout = addCode_loadingDataTimeout;
            xmlHttp.ontimeout = function() {};

            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 200) {
                        Users.SetKeyTitleStart(Users.checkKey(xmlHttp.responseText), position);
                        return;
                    } else {
                        addCode_CheckTokenStartError(position);
                    }
                }
            };

            xmlHttp.send(null);
        } else Users.SetKeyTitleStart(false, position);
    } catch (e) {
        addCode_CheckTokenStartError(position);
    }
}

function addCode_CheckTokenStartError(position) {
    addCode_loadingDataTry++;
    if (addCode_loadingDataTry < addCode_loadingDataTryMax) {
        addCode_loadingDataTimeout += 3500;
        addCode_CheckTokenStart(position);
    } else Users.SetKeyTitleStart(false, position);
}

function addCode_FallowGame() {
    addCode_TimeoutReset10();
    addCode_RequestFallowGame();
}

function addCode_RequestFallowGame() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("PUT", ' https://api.twitch.tv/api/users/' + main_UserName + '/follows/games/' + encodeURIComponent(main_gameSelected) +
            '?oauth_token=' + addCode_OauthToken, true);
        xmlHttp.timeout = 10000;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //success we now fallow the game
                    aGame_fallowing = true;
                    aGame_setFallow();
                    return;
                } else { // internet error
                    addCode_FallowGameRequestError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        addCode_FallowGameRequestError();
    }
}

function addCode_FallowGameRequestError() {
    addCode_loadingDataTry++;
    if (addCode_loadingDataTry < addCode_loadingDataTryMax) {
        addCode_loadingDataTimeout += 3500;
        addCode_RequestFallowGame();
    }
}

function addCode_UnFallowGame() {
    addCode_TimeoutReset10();
    addCode_RequestUnFallowGame();
}

function addCode_RequestUnFallowGame() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("DELETE", ' https://api.twitch.tv/api/users/' + main_UserName + '/follows/games/' + encodeURIComponent(main_gameSelected) + '?oauth_token=' + addCode_OauthToken, true);
        xmlHttp.timeout = 10000;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 204) { // success we now unfallow the game
                    aGame_fallowing = false;
                    aGame_setFallow();
                    return;
                } else { // internet error
                    addCode_UnFallowGameRequestError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        addCode_UnFallowGameRequestError();
    }
}

function addCode_UnFallowGameRequestError() {
    addCode_loadingDataTry++;
    if (addCode_loadingDataTry < addCode_loadingDataTryMax) {
        addCode_loadingDataTimeout += 3500;
        addCode_RequestUnFallowGame();
    }
}

function addCode_CheckFallowGame() {
    addCode_TimeoutReset10();
    addCode_RequestCheckFallowGame();
}

function addCode_RequestCheckFallowGame() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", ' https://api.twitch.tv/api/users/' + main_UserName + '/follows/games/' + encodeURIComponent(main_gameSelected), true);
        xmlHttp.timeout = 10000;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //success yes user fallows
                    aGame_fallowing = true;
                    aGame_setFallow();
                    return;
                } else if (xmlHttp.status === 404) { //success no user doesnot fallows
                    aGame_fallowing = false;
                    aGame_setFallow();
                    return;
                } else { // internet error
                    addCode_CheckFallowGameError();
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        addCode_CheckFallowGameError();
    }
}

function addCode_CheckFallowGameError() {
    addCode_loadingDataTry++;
    if (addCode_loadingDataTry < addCode_loadingDataTryMax) {
        addCode_loadingDataTimeout += 3500;
        addCode_RequestCheckFallowGame();
    } else {
        aGame_fallowing = false;
        aGame_setFallow();
    }
}
