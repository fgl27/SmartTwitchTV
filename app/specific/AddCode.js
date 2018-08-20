//Variable initialization
var AddCode_loadingDataTry = 0;
var AddCode_loadingDataTryMax = 5;
var AddCode_loadingDataTimeout = 10000;
var AddCode_UsercodeArray = [];
var AddCode_Username = null;
var AddCode_loadingData = false;
var AddCode_keyBoardOn = false;
var AddCode_userId = '';
var AddCode_OauthToken = '';
var AddCode_IsFallowing = false;
var AddCode_IsSub = false;
var AddCode_PlayRequest = false;
var AddCode_input = '';
var AddCode_isCheckFallow = false;
var AddCode_Channel_id = '';
//Variable initialization end

function AddCode_init() {
    if (AddCode_OauthToken !== '') {
        AddCode_TimeoutReset10();
        AddCode_CheckToken();
        Users_init();
        return;
    } else {
        Main_Go = Main_addCode;
        Main_AddClass('top_bar_user', 'icon_center_focus');
        Main_HideWarningDialog();
        AddCode_input = document.querySelector('#oauth_input');
        Main_AddCodeInput.placeholder = STR_PLACEHOLDER_OAUTH;
        Main_ShowElement('oauth_scroll');
        Main_innerHTML("oauth_text", STR_OAUTH_IN + Main_UserName + STR_OAUTH_EXPLAIN);
        AddCode_inputFocus();
    }
}

function AddCode_exit() {
    AddCode_RemoveinputFocus();
    document.body.removeEventListener("keydown", AddCode_handleKeyDown);
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_HideElement('oauth_scroll');
}

function AddCode_handleKeyDown(event) {
    if (AddCode_loadingData || AddCode_keyBoardOn) return;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Main_Go = Main_Users;
                AddCode_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_CHANNELUP:
            Main_Go = Main_games;
            AddCode_exit();
            Main_SwitchScreen();
            break;
        case KEY_CHANNELDOWN:
            Main_Go = Main_Live;
            AddCode_exit();
            Main_SwitchScreen();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            AddCode_inputFocus();
            break;
        case KEY_RED:
            Main_showSettings();
            break;
        case KEY_GREEN:
            AddCode_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_BeforeSearch = Main_Go;
            Main_Go = Main_Search;
            AddCode_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}

function AddCode_inputFocus() {
    document.body.removeEventListener("keydown", AddCode_handleKeyDown);
    document.body.addEventListener("keydown", AddCode_KeyboardEvent, false);
    AddCode_input.addEventListener('input');
    AddCode_input.addEventListener('compositionend');
    Main_AddCodeInput.placeholder = STR_PLACEHOLDER_OAUTH;
    AddCode_input.focus();
    AddCode_keyBoardOn = true;
}

function AddCode_RemoveinputFocus() {
    AddCode_input.blur();
    document.body.removeEventListener("keydown", AddCode_KeyboardEvent);
    document.body.addEventListener("keydown", AddCode_handleKeyDown, false);
    Main_AddCodeInput.placeholder = STR_PLACEHOLDER_PRESS + STR_PLACEHOLDER_OAUTH;
    window.setTimeout(function() {
        AddCode_keyBoardOn = false;
    }, 250);
}

function AddCode_KeyboardEvent(event) {
    if (AddCode_loadingData) return;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Main_Go = Main_Users;
                AddCode_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_KEYBOARD_DELETE_ALL:
            Main_AddCodeInput.value = '';
            event.preventDefault();
            break;
        case KEY_KEYBOARD_DONE:
        case KEY_KEYBOARD_CANCEL:
            if (Main_AddCodeInput.value !== '' && Main_AddCodeInput.value !== null) {

                AddCode_OauthToken = Main_AddCodeInput.value;

                AddCode_TimeoutReset10();
                Main_HideElement('oauth_scroll');
                Main_showLoadDialog();
                AddCode_CheckKey();
            }
            AddCode_RemoveinputFocus();
            break;
        case KEY_KEYBOARD_BACKSPACE:
            Main_AddCodeInput.value = Main_AddCodeInput.value.slice(0, -1);
            event.preventDefault();
            break;
        case KEY_KEYBOARD_SPACE:
            Main_AddCodeInput.value += ' ';
            event.preventDefault();
            break;
        default:
            break;
    }
}

function AddCode_RestoreUsers() {
    AddCode_UsercodeArray = JSON.parse(localStorage.getItem("userkeys")) || [];

    AddCode_SetDefaultOAuth(0);
}

function AddCode_SaveNewUser() {
    AddCode_UsercodeArray.push(AddCode_Username + ',' + AddCode_userId + ',' + AddCode_OauthToken);
    AddCode_SaveKeyArray();

    Main_HideLoadDialog();
    AddCode_exit();
    Main_HideElement('oauth_scroll');
    Users_init();
    AddCode_loadingData = false;
}

function AddCode_removeUser(Position) {
    var index = AddCode_UsercodeArray.indexOf(AddCode_UsercodeArray[Position]);
    if (index > -1) AddCode_UsercodeArray.splice(index, 1);
    AddCode_SaveKeyArray();
}

function AddCode_SaveKeyArray() {
    localStorage.setItem("userkeys", JSON.stringify(AddCode_UsercodeArray));
}

function AddCode_SetDefaultOAuth(position) {
    if (AddUser_UsernameArray.length > 0) Main_UserName = AddUser_UsernameArray[position];
    if (AddCode_UsercodeArray.length > 0) {
        var userCode = AddCode_UserCodeExist(AddUser_UsernameArray[position]);
        if (userCode > -1) {
            var values = AddCode_UsercodeArray[userCode].split(",");
            AddCode_Username = values[0];
            AddCode_userId = values[1];
            AddCode_OauthToken = values[2];
        } else AddCode_SetemptyOAuth();
    } else AddCode_SetemptyOAuth();
}

function AddCode_SetemptyOAuth() {
    AddCode_Username = '';
    AddCode_userId = '';
    AddCode_OauthToken = '';
}

function AddCode_UserCodeExist(user) {
    for (var i = 0; i < AddCode_UsercodeArray.length; i++) {
        if (user === AddCode_UsercodeArray[i].split(",")[0]) return i;
    }
    return -1;
}

function AddCode_CheckKey() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken?oauth_token=' + AddCode_OauthToken, true);
        xmlHttp.timeout = AddCode_loadingDataTimeout;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    AddCode_CheckKeySuccess(xmlHttp.responseText);
                    return;
                } else {
                    AddCode_CheckKeyError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode_CheckKeyError();
    }
}

function AddCode_CheckKeyError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_CheckKey();
    } else {
        AddCode_loadingData = false;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_OAUTH_FAIL);
        window.setTimeout(function() {
            Main_HideWarningDialog();
            Main_ShowElement('oauth_scroll');
            AddCode_inputFocus();
        }, 4000);
    }
}

function AddCode_CheckKeySuccess(responseText) {
    if (Users_checkKey(responseText)) {
        AddCode_Username = JSON.parse(responseText).token.user_name + '';
        AddCode_TimeoutReset10();
        AddCode_isCheckFallow = false;
        AddCode_CheckId();
    } else {
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_OAUTH_WRONG + Main_UserName + STR_OAUTH_WRONG2 + AddCode_Username);
        window.setTimeout(function() {
            Main_HideWarningDialog();
            Main_ShowElement('oauth_scroll');
            AddCode_inputFocus();
        }, 3500);
    }
}

function AddCode_CheckId() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users?login=' + Main_UserName, true);
        xmlHttp.timeout = AddCode_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    if (AddCode_isCheckFallow) AddCode_CheckFallowId(xmlHttp.responseText);
                    else AddCode_CheckIdSuccess(xmlHttp.responseText);
                    return;
                } else {
                    AddCode_CheckIdError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode_CheckIdError();
    }
}

function AddCode_CheckIdError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_CheckId();
    }
}

function AddCode_CheckIdSuccess(responseText) {
    AddCode_userId = JSON.parse(responseText).users[0]._id;
    Main_AddCodeInput.value = '';
    document.body.removeEventListener("keydown", AddCode_handleKeyDown);
    Users_SetKeyTitle(true);
    AddCode_SaveNewUser();
}

function AddCode_CheckFallow() {
    AddCode_TimeoutReset10();
    AddCode_IsFallowing = false;
    if (AddCode_userId !== '') AddCode_RequestCheckFallow();
    else {
        AddCode_isCheckFallow = true;
        AddCode_CheckId();
    }
}

function AddCode_CheckFallowId(responseText) {
    var users = JSON.parse(responseText).users[0];
    if (users !== undefined) {
        AddCode_userId = users._id;
        AddCode_TimeoutReset10();
        AddCode_IsFallowing = false;
        AddCode_RequestCheckFallow();
    } else {
        AddCode_IsFallowing = false;
        AddCode_loadingData = false;
        if (AddCode_PlayRequest) Play_setFallow();
        else ChannelContent_setFallow();
    }
}

function AddCode_RequestCheckFallow() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + AddCode_userId + '/follows/channels/' + AddCode_Channel_id, true);
        xmlHttp.timeout = AddCode_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //yes
                    AddCode_IsFallowing = true;
                    AddCode_loadingData = false;
                    if (AddCode_PlayRequest) Play_setFallow();
                    else ChannelContent_setFallow();
                    return;
                } else if (xmlHttp.status === 404) { //no
                    if ((JSON.parse(xmlHttp.responseText).error + '').indexOf('Not Found') !== -1) {
                        AddCode_IsFallowing = false;
                        AddCode_loadingData = false;
                        if (AddCode_PlayRequest) Play_setFallow();
                        else ChannelContent_setFallow();
                        return;
                    } else AddCode_RequestCheckFallowError();
                } else { // internet error
                    AddCode_RequestCheckFallowError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode_RequestCheckFallowError();
    }
}

function AddCode_RequestCheckFallowError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_RequestCheckFallow();
    } else {
        AddCode_loadingData = false;
        if (AddCode_PlayRequest) Play_setFallow();
        else ChannelContent_setFallow();
    }
}

function AddCode_Fallow() {
    AddCode_TimeoutReset10();
    AddCode_FallowRequest();
}

function AddCode_FallowRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("PUT", 'https://api.twitch.tv/kraken/users/' + AddCode_userId + '/follows/channels/' + AddCode_Channel_id, true);
        xmlHttp.timeout = AddCode_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader('Authorization', 'OAuth ' + AddCode_OauthToken);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //success user now is fallowing the channel
                    AddCode_loadingData = false;
                    AddCode_IsFallowing = true;
                    if (AddCode_PlayRequest) Play_setFallow();
                    else ChannelContent_setFallow();
                    return;
                } else {
                    AddCode_FallowRequestError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode_FallowRequestError();
    }
}

function AddCode_FallowRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_FallowRequest();
    }
}

function AddCode_UnFallow() {
    AddCode_TimeoutReset10();
    AddCode_UnFallowRequest();
}

function AddCode_UnFallowRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("DELETE", 'https://api.twitch.tv/kraken/users/' + AddCode_userId + '/follows/channels/' + AddCode_Channel_id, true);
        xmlHttp.timeout = AddCode_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader('Authorization', 'OAuth ' + AddCode_OauthToken);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 204) { //success user is now not fallowing the channel
                    AddCode_IsFallowing = false;
                    AddCode_loadingData = false;
                    if (AddCode_PlayRequest) Play_setFallow();
                    else ChannelContent_setFallow();
                    return;
                } else {
                    AddCode_UnFallowRequestError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode_UnFallowRequestError();
    }
}

function AddCode_UnFallowRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_UnFallowRequest();
    }
}

function AddCode_CheckSub() {
    AddCode_TimeoutReset10();
    AddCode_IsSub = false;
    AddCode_RequestCheckSub();
}

function AddCode_TimeoutReset10() {
    AddCode_loadingDataTry = 0;
    AddCode_loadingDataTimeout = 10000;
    AddCode_loadingData = true;
}

function AddCode_RequestCheckSub() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + AddCode_userId + '/subscriptions/' + AddCode_Channel_id, true);
        xmlHttp.timeout = AddCode_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.setRequestHeader('Authorization', 'OAuth ' + AddCode_OauthToken);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //success yes user is a SUB
                    AddCode_IsSub = true;
                    AddCode_loadingData = false;
                    PlayVod_isSub();
                    return;
                } else if (xmlHttp.status === 422) { //channel does not have a subscription program
                    console.log('channel does not have a subscription program');
                } else if (xmlHttp.status === 404) { //success no user is not a sub
                    if ((JSON.parse(xmlHttp.responseText).error + '').indexOf('Not Found') !== -1) {
                        AddCode_IsSub = false;
                        AddCode_loadingData = false;
                        PlayVod_NotSub();
                        return;
                    } else AddCode_RequestCheckSubError();
                } else { // internet error
                    AddCode_RequestCheckSubError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode_RequestCheckSubError();
    }
}

function AddCode_RequestCheckSubError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_RequestCheckSub();
    } else {
        AddCode_loadingData = false;
    }
}

function AddCode_CheckToken() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken?oauth_token=' + AddCode_OauthToken, true);
        xmlHttp.timeout = AddCode_loadingDataTimeout;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    var bool = Users_checkKey(xmlHttp.responseText);
                    Users_SetKeyTitle(bool);
                    Main_showWarningDialog(bool ? STR_KEY_OK : STR_KEY_BAD);
                    window.setTimeout(function() {
                        Main_HideWarningDialog();
                    }, 4000);
                    AddCode_loadingData = false;
                    return;
                } else {
                    AddCode_CheckTokenError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode_CheckTokenError();
    }
}

function AddCode_CheckTokenError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_CheckToken();
    } else {
        Main_showWarningDialog(STR_KEY_BAD);
        Users_SetKeyTitle(false);
        window.setTimeout(function() {
            Main_HideWarningDialog();
        }, 4000);
        AddCode_loadingData = false;
    }
}

function AddCode_CheckTokenStart(position) {
    try {

        var userCode = AddCode_UserCodeExist(AddUser_UsernameArray[position]);
        if (userCode > -1) {
            AddCode_OauthToken = AddCode_UsercodeArray[userCode].split(",")[2];
            Main_UserName = AddUser_UsernameArray[position];

            var xmlHttp = new XMLHttpRequest();

            xmlHttp.open("GET", 'https://api.twitch.tv/kraken?oauth_token=' + AddCode_OauthToken, true);
            xmlHttp.timeout = AddCode_loadingDataTimeout;
            xmlHttp.ontimeout = function() {};

            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 200) {
                        Users_SetKeyTitleStart(Users_checkKey(xmlHttp.responseText), position);
                        return;
                    } else {
                        AddCode_CheckTokenStartError(position);
                    }
                }
            };

            xmlHttp.send(null);
        } else Users_SetKeyTitleStart(false, position);
    } catch (e) {
        AddCode_CheckTokenStartError(position);
    }
}

function AddCode_CheckTokenStartError(position) {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_CheckTokenStart(position);
    } else Users_SetKeyTitleStart(false, position);
}

function AddCode_FallowGame() {
    AddCode_TimeoutReset10();
    AddCode_RequestFallowGame();
}

function AddCode_RequestFallowGame() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("PUT", 'https://api.twitch.tv/api/users/' + Main_UserName + '/follows/games/' + encodeURIComponent(Main_gameSelected) +
            '?oauth_token=' + AddCode_OauthToken, true);
        xmlHttp.timeout = 10000;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //success we now fallow the game
                    AGame_fallowing = true;
                    AGame_setFallow();
                    return;
                } else { // internet error
                    AddCode_FallowGameRequestError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode_FallowGameRequestError();
    }
}

function AddCode_FallowGameRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_RequestFallowGame();
    }
}

function AddCode_UnFallowGame() {
    AddCode_TimeoutReset10();
    AddCode_RequestUnFallowGame();
}

function AddCode_RequestUnFallowGame() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("DELETE", 'https://api.twitch.tv/api/users/' + Main_UserName + '/follows/games/' + encodeURIComponent(Main_gameSelected) + '?oauth_token=' + AddCode_OauthToken, true);
        xmlHttp.timeout = 10000;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 204) { // success we now unfallow the game
                    AGame_fallowing = false;
                    AGame_setFallow();
                    return;
                } else { // internet error
                    AddCode_UnFallowGameRequestError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode_UnFallowGameRequestError();
    }
}

function AddCode_UnFallowGameRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_RequestUnFallowGame();
    }
}

function AddCode_CheckFallowGame() {
    AddCode_TimeoutReset10();
    AddCode_RequestCheckFallowGame();
}

function AddCode_RequestCheckFallowGame() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/api/users/' + Main_UserName + '/follows/games/' + encodeURIComponent(Main_gameSelected), true);
        xmlHttp.timeout = 10000;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //success yes user fallows
                    AGame_fallowing = true;
                    AGame_setFallow();
                    return;
                } else if (xmlHttp.status === 404) { //success no user doesnot fallows
                    AGame_fallowing = false;
                    AGame_setFallow();
                    return;
                } else { // internet error
                    AddCode_CheckFallowGameError();
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode_CheckFallowGameError();
    }
}

function AddCode_CheckFallowGameError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_loadingDataTimeout += 500;
        AddCode_RequestCheckFallowGame();
    } else {
        AGame_fallowing = false;
        AGame_setFallow();
    }
}