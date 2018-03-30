/*jshint multistr: true */
//Variable initialization
function AddCode() {}
AddCode.loadingDataTry = 0;
AddCode.loadingDataTryMax = 10;
AddCode.loadingDataTimeout = 10000;
AddCode.UsercodeArraySize = 0;
AddCode.UsercodeArray = [];
AddCode.UserIdArray = [];
AddCode.Followercount = 0;
AddCode.Username = null;
AddCode.loadingData = false;
AddCode.keyBoardOn = false;
//Variable initialization end
AddCode.userId = '';
AddCode.userChannel = '';
AddCode.OauthToken = '';
AddCode.IsFallowing = false;
AddCode.IsSub = false;
AddCode.PlayRequest = false;

AddCode.init = function() {
    if (AddCode.OauthToken !== '') {
        AddCode.TimeoutReset10();
        AddCode.CheckToken();
        Users.init();
        return;
    } else {
        Main.Go = Main.AddCode;
        $('#top_bar_user').removeClass('icon_center_label');
        $('#top_bar_user').addClass('icon_center_focus');
        Main.HideWarningDialog();
        AddCode.input = document.querySelector('#oauth_input');
        $('.label_placeholder_oauth').attr("placeholder", STR_PLACEHOLDER_OAUTH);
        document.getElementById("oauth_text").innerHTML = STR_OAUTH_IN + Main.UserName + STR_OAUTH_EXPLAIN;
        AddCode.inputFocus();
        AddUser.ScrollHelper.scrollVerticalToElementById('oauth_input');
    }
};

AddCode.exit = function() {
    AddCode.RemoveinputFocus();
    document.body.removeEventListener("keydown", AddCode.handleKeyDown);
    $('#top_bar_user').removeClass('icon_center_focus');
    $('#top_bar_user').addClass('icon_center_label');
};

AddCode.handleKeyDown = function(event) {
    if (AddCode.loadingData || AddCode.keyBoardOn) return;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                Main.Go = Main.Users;
                AddCode.exit();
                Main.SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_CHANNELUP:
            Main.Go = Main.Games;
            AddCode.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = Main.Live;
            AddCode.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            AddCode.inputFocus();
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            AddCode.exit();
            Main.GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.Go;
            Main.Go = Main.Search;
            AddCode.exit();
            Main.SwitchScreen();
            break;
        default:
            break;
    }
};

AddCode.inputFocus = function() {
    document.body.removeEventListener("keydown", AddCode.handleKeyDown);
    document.body.addEventListener("keydown", AddCode.KeyboardEvent, false);
    AddCode.input.addEventListener('input');
    AddCode.input.addEventListener('compositionend');
    $('.label_placeholder_oauth').attr("placeholder", STR_PLACEHOLDER_OAUTH);
    AddCode.input.focus();
    AddCode.keyBoardOn = true;
};

AddCode.RemoveinputFocus = function() {
    AddCode.input.blur();
    document.body.removeEventListener("keydown", AddCode.KeyboardEvent);
    document.body.addEventListener("keydown", AddCode.handleKeyDown, false);
    $('.label_placeholder_oauth').attr("placeholder", STR_PLACEHOLDER_PRESS + STR_PLACEHOLDER_OAUTH);
    window.setTimeout(function() {
        AddCode.keyBoardOn = false;
    }, 250);
};

AddCode.KeyboardEvent = function(event) {
    if (AddCode.loadingData) return;

    switch (event.keyCode) {
        case TvKeyCode.KEY_KEYBOARD_DELETE_ALL:
            document.getElementById("oauth_input").value = '';
            event.preventDefault();
            break;
        case TvKeyCode.KEY_KEYBOARD_DONE:
        case TvKeyCode.KEY_KEYBOARD_CANCEL:
            if ($('#oauth_input').val() !== '' && $('#oauth_input').val() !== null) {

                document.getElementById("oauth_input").value = $('#oauth_input').val();
                AddCode.OauthToken = $('#oauth_input').val();

                AddCode.TimeoutReset10();
                Main.showLoadDialog();
                AddUser.ScrollHelper.scrollVerticalToElementById('blank_focus');
                AddCode.CheckKey();
            }
            AddCode.RemoveinputFocus();
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
};

AddCode.RestoreUsers = function() {
    AddCode.UsercodeArray = [];
    AddCode.UsercodeArraySize = parseInt(localStorage.getItem('UsercodeArraySize')) || 0;
    if (AddCode.UsercodeArraySize > 0) {
        for (var x = 0; x < AddCode.UsercodeArraySize; x++) {
            AddCode.UsercodeArray[x] = localStorage.getItem('UsercodeArray' + x);
        }
    }
    AddCode.SetDefaultOAuth(0);
};

AddCode.SaveNewUser = function() {
    var value = AddCode.Username + ',' + AddCode.userId + ',' + AddCode.OauthToken;
    AddCode.UsercodeArray[AddCode.UsercodeArraySize] = value;
    localStorage.setItem('UsercodeArray' + AddCode.UsercodeArraySize, value);
    AddCode.UsercodeArraySize++;
    localStorage.setItem('UsercodeArraySize', AddCode.UsercodeArraySize);
    Main.HideLoadDialog();
    Users.init();
    AddCode.loadingData = false;
};

AddCode.removeUser = function(Position) {
    AddCode.UsercodeArraySize--;
    if (AddCode.UsercodeArraySize < 0) AddCode.UsercodeArraySize = 0;
    localStorage.setItem('UsercodeArraySize', AddCode.UsercodeArraySize);

    var index = AddCode.UsercodeArray.indexOf(AddCode.UsercodeArray[Position]);
    if (index > -1) {
        AddCode.UsercodeArray.splice(index, 1);
    }

    for (var x = 0; x < AddCode.UsercodeArray.length; x++) {
        localStorage.setItem('UsercodeArray' + x, AddCode.UsercodeArray[x]);
    }
};

AddCode.SetDefaultOAuth = function(position) {
    if (AddCode.UsercodeArray.length > 0) Main.UserName = AddUser.UsernameArray[position];
    if (AddUser.UsernameArray.length > 0) {
        var userCode = AddCode.UserCodeExist(AddUser.UsernameArray[position]);
        if (userCode > -1) {
            var values = AddCode.UsercodeArray[userCode].split(",");
            AddCode.Username = values[0];
            AddCode.userId = values[1];
            AddCode.OauthToken = values[2];
        } else AddCode.SetemptyOAuth();
    } else AddCode.SetemptyOAuth();
};

AddCode.SetemptyOAuth = function() {
    AddCode.Username = '';
    AddCode.userId = '';
    AddCode.OauthToken = '';
};

AddCode.UserCodeExist = function(user) {
    for (var i = 0; i < AddCode.UsercodeArray.length; i++) {
        if (user == AddCode.UsercodeArray[i].split(",")[0]) return i;
    }
    return -1;
};

AddCode.CheckKey = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken?oauth_token=' + AddCode.OauthToken, true);
        xmlHttp.timeout = AddCode.loadingDataTimeout;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    AddCode.CheckKeySuccess(xmlHttp.responseText);
                    return;
                } else {
                    AddCode.CheckKeyError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode.CheckKeyError();
    }
};

AddCode.CheckKeyError = function() {
    AddCode.loadingDataTry++;
    if (AddCode.loadingDataTry < AddCode.loadingDataTryMax) {
        AddCode.loadingDataTimeout += (AddCode.loadingDataTry < 5) ? 250 : 3500;
        AddCode.CheckKey();
    } else {
        AddCode.loadingData = false;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_OAUTH_FAIL);
        window.setTimeout(function() {
            Main.HideWarningDialog();
            AddCode.inputFocus();
        }, 4000);
    }
};

AddCode.CheckKeySuccess = function(responseText) {
    if (Users.checkKey(responseText)) {
        AddCode.Username = $.parseJSON(responseText).token.user_name + '';
        AddCode.TimeoutReset10();
        AddCode.isCheckFallow = false;
        AddCode.CheckId();
    } else {
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_OAUTH_WRONG + Main.UserName + STR_OAUTH_WRONG2 + AddCode.Username);
        window.setTimeout(function() {
            Main.HideWarningDialog();
            AddCode.inputFocus();
        }, 3500);
    }
};

AddCode.CheckId = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users?login=' + Main.UserName, true);
        xmlHttp.timeout = AddCode.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    if (AddCode.isCheckFallow) AddCode.CheckFallowId(xmlHttp.responseText);
                    else AddCode.CheckIdSuccess(xmlHttp.responseText);
                    return;
                } else {
                    AddCode.CheckIdError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode.CheckIdError();
    }
};

AddCode.CheckIdError = function() {
    AddCode.loadingDataTry++;
    if (AddCode.loadingDataTry < AddCode.loadingDataTryMax) {
        AddCode.loadingDataTimeout += (AddCode.loadingDataTry < 5) ? 250 : 3500;
        AddCode.CheckId();
    }
};

AddCode.CheckIdSuccess = function(responseText) {
    AddCode.userId = $.parseJSON(responseText).users[0]._id;
    document.getElementById("oauth_input").value = '';
    document.body.removeEventListener("keydown", AddCode.handleKeyDown);
    Users.SetKeyTitle(true);
    AddCode.SaveNewUser();
};

AddCode.CheckFallow = function() {
    AddCode.TimeoutReset10();
    AddCode.IsFallowing = false;
    if (AddCode.userId !== '') AddCode.RequestCheckFallow();
    else {
        AddCode.isCheckFallow = true;
        AddCode.CheckId();
    }
};

AddCode.CheckFallowId = function(responseText) {
    AddCode.userId = $.parseJSON(responseText).users[0]._id;
    AddCode.TimeoutReset10();
    AddCode.IsFallowing = false;
    AddCode.RequestCheckFallow();
};

AddCode.RequestCheckFallow = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + AddCode.userId + '/follows/channels/' + AddCode.userChannel, true);
        xmlHttp.timeout = AddCode.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //yes
                    AddCode.IsFallowing = true;
                    AddCode.loadingData = false;
                    if (AddCode.PlayRequest) Play.setFallow();
                    else SChannelContent.setFallow();
                    return;
                } else if (xmlHttp.status === 404) { //no
                    if ((JSON.parse(xmlHttp.responseText).error + '').indexOf('Not Found') !== -1) {
                        AddCode.IsFallowing = false;
                        AddCode.loadingData = false;
                        if (AddCode.PlayRequest) Play.setFallow();
                        else SChannelContent.setFallow();
                        return;
                    } else AddCode.RequestCheckFallowError();
                } else { // internet error
                    AddCode.RequestCheckFallowError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode.RequestCheckFallowError();
    }
};

AddCode.RequestCheckFallowError = function() {
    AddCode.loadingDataTry++;
    if (AddCode.loadingDataTry < AddCode.loadingDataTryMax) {
        AddCode.loadingDataTimeout += (AddCode.loadingDataTry < 5) ? 250 : 3500;
        AddCode.RequestCheckFallow();
    } else {
        AddCode.loadingData = false;
        if (AddCode.PlayRequest) Play.setFallow();
        else SChannelContent.setFallow();
    }
};

AddCode.Fallow = function() {
    AddCode.TimeoutReset10();
    AddCode.FallowRequest();
};

AddCode.FallowRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("PUT", 'https://api.twitch.tv/kraken/users/' + AddCode.userId + '/follows/channels/' + AddCode.userChannel, true);
        xmlHttp.timeout = AddCode.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.setRequestHeader('Authorization', 'OAuth ' + AddCode.OauthToken);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //success user now is fallowing the channel
                    AddCode.loadingData = false;
                    AddCode.IsFallowing = true;
                    if (AddCode.PlayRequest) Play.setFallow();
                    else SChannelContent.setFallow();
                    return;
                } else {
                    AddCode.FallowRequestError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode.FallowRequestError();
    }
};

AddCode.FallowRequestError = function() {
    AddCode.loadingDataTry++;
    if (AddCode.loadingDataTry < AddCode.loadingDataTryMax) {
        AddCode.loadingDataTimeout += 3500;
        AddCode.FallowRequest();
    }
};

AddCode.UnFallow = function() {
    AddCode.TimeoutReset10();
    AddCode.UnFallowRequest();
};

AddCode.UnFallowRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("DELETE", 'https://api.twitch.tv/kraken/users/' + AddCode.userId + '/follows/channels/' + AddCode.userChannel, true);
        xmlHttp.timeout = AddCode.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.setRequestHeader('Authorization', 'OAuth ' + AddCode.OauthToken);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 204) { //success user is now not fallowing the channel
                    AddCode.IsFallowing = false;
                    AddCode.loadingData = false;
                    if (AddCode.PlayRequest) Play.setFallow();
                    else SChannelContent.setFallow();
                    return;
                } else {
                    AddCode.UnFallowRequestError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode.UnFallowRequestError();
    }
};

AddCode.UnFallowRequestError = function() {
    AddCode.loadingDataTry++;
    if (AddCode.loadingDataTry < AddCode.loadingDataTryMax) {
        AddCode.loadingDataTimeout += 3500;
        AddCode.UnFallowRequest();
    }
};

AddCode.CheckSub = function() {
    AddCode.TimeoutReset10();
    AddCode.IsSub = false;
    AddCode.RequestCheckSub();
};

AddCode.TimeoutReset10 = function() {
    AddCode.loadingDataTry = 0;
    AddCode.loadingDataTimeout = 10000;
    AddCode.loadingData = true;
};

AddCode.RequestCheckSub = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + AddCode.userId + '/subscriptions/' + AddCode.userChannel, true);
        xmlHttp.timeout = AddCode.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.setRequestHeader('Authorization', 'OAuth ' + AddCode.OauthToken);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //success yes user is a SUB
                    AddCode.IsSub = true;
                    AddCode.loadingData = false;
                    PlayVod.isSub();
                    return;
                } else if (xmlHttp.status === 422) { //channel does not have a subscription program
                    console.log('channel does not have a subscription program');
                } else if (xmlHttp.status === 404) { //success no user is not a sub
                    if ((JSON.parse(xmlHttp.responseText).error + '').indexOf('Not Found') !== -1) {
                        AddCode.IsSub = false;
                        AddCode.loadingData = false;
                        PlayVod.NotSub();
                        return;
                    } else AddCode.RequestCheckSubError();
                } else { // internet error
                    AddCode.RequestCheckSubError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode.RequestCheckSubError();
    }
};

AddCode.RequestCheckSubError = function() {
    AddCode.loadingDataTry++;
    if (AddCode.loadingDataTry < AddCode.loadingDataTryMax) {
        AddCode.loadingDataTimeout += (AddCode.loadingDataTry < 5) ? 250 : 3500;
        AddCode.RequestCheckSub();
    } else {
        AddCode.loadingData = false;
    }
};

AddCode.CheckToken = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken?oauth_token=' + AddCode.OauthToken, true);
        xmlHttp.timeout = AddCode.loadingDataTimeout;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    var bool = Users.checkKey(xmlHttp.responseText);
                    Users.SetKeyTitle(bool);
                    Main.showWarningDialog(bool ? STR_KEY_OK : STR_KEY_BAD);
                    window.setTimeout(function() {
                        Main.HideWarningDialog();
                    }, 4000);
                    AddCode.loadingData = false;
                    return;
                } else {
                    AddCode.CheckTokenError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode.CheckTokenError();
    }
};

AddCode.CheckTokenError = function() {
    AddCode.loadingDataTry++;
    if (AddCode.loadingDataTry < AddCode.loadingDataTryMax) {
        AddCode.loadingDataTimeout += (AddCode.loadingDataTry < 5) ? 250 : 3500;
        AddCode.CheckToken();
    } else {
        Main.showWarningDialog(STR_USER_CODE_BAD);
        Users.SetKeyTitle(false);
        window.setTimeout(function() {
            Main.HideWarningDialog();
        }, 4000);
        AddCode.loadingData = false;
    }
};

AddCode.CheckTokenStart = function(position) {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken?oauth_token=' + AddCode.OauthToken, true);
        xmlHttp.timeout = AddCode.loadingDataTimeout;
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Users.SetKeyTitleStart(Users.checkKey(xmlHttp.responseText), position);
                    return;
                } else {
                    AddCode.CheckTokenStartError(position);
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode.CheckTokenStartError(position);
    }
};

AddCode.CheckTokenStartError = function(position) {
    AddCode.loadingDataTry++;
    if (AddCode.loadingDataTry < AddCode.loadingDataTryMax) {
        AddCode.loadingDataTimeout += 3500;
        AddCode.CheckTokenStart(position);
    } else Users.SetKeyTitleStart(false, position);
};

AddCode.FallowGame = function() {
    AddCode.TimeoutReset10();
    AddCode.RequestFallowGame();
};

AddCode.RequestFallowGame = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("PUT", ' https://api.twitch.tv/api/users/' + Main.UserName + '/follows/games/' + encodeURIComponent(Main.gameSelected) +
            '?oauth_token=' + AddCode.OauthToken, true);
        xmlHttp.timeout = 10000;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //success we now fallow the game
                    AGame.fallowing = true;
                    AGame.setFallow();
                    return;
                } else { // internet error
                    AddCode.FallowGameRequestError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode.FallowGameRequestError();
    }
};

AddCode.FallowGameRequestError = function() {
    AddCode.loadingDataTry++;
    if (AddCode.loadingDataTry < AddCode.loadingDataTryMax) {
        AddCode.loadingDataTimeout += 3500;
        AddCode.RequestFallowGame();
    }
};

AddCode.UnFallowGame = function() {
    AddCode.TimeoutReset10();
    AddCode.RequestUnFallowGame();
};

AddCode.RequestUnFallowGame = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("DELETE", ' https://api.twitch.tv/api/users/' + Main.UserName + '/follows/games/' + encodeURIComponent(Main.gameSelected) + '?oauth_token=' + AddCode.OauthToken, true);
        xmlHttp.timeout = 10000;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 204) { // success we now unfallow the game
                    AGame.fallowing = false;
                    AGame.setFallow();
                    return;
                } else { // internet error
                    AddCode.UnFallowGameRequestError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode.UnFallowGameRequestError();
    }
};

AddCode.UnFallowGameRequestError = function() {
    AddCode.loadingDataTry++;
    if (AddCode.loadingDataTry < AddCode.loadingDataTryMax) {
        AddCode.loadingDataTimeout += 3500;
        AddCode.RequestUnFallowGame();
    }
};

AddCode.CheckFallowGame = function() {
    AddCode.TimeoutReset10();
    AddCode.RequestCheckFallowGame();
};

AddCode.RequestCheckFallowGame = function() {
    console.log('RequestCheckFallowGame');
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", ' https://api.twitch.tv/api/users/' + Main.UserName + '/follows/games/' + encodeURIComponent(Main.gameSelected), true);
        xmlHttp.timeout = 10000;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) { //success yes user fallows
                    AGame.fallowing = true;
                    AGame.setFallow();
                    return;
                } else if (xmlHttp.status === 404) { //success no user doesnot fallows
                    AGame.fallowing = false;
                    AGame.setFallow();
                    return;
                } else { // internet error
                    AddCode.CheckFallowGameError();
                    return;
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode.CheckFallowGameError();
    }
};

AddCode.CheckFallowGameError = function() {
    AddCode.loadingDataTry++;
    if (AddCode.loadingDataTry < AddCode.loadingDataTryMax) {
        AddCode.loadingDataTimeout += 3500;
        AddCode.RequestCheckFallowGame();
    } else {
        AGame.fallowing = false;
        AGame.setFallow();
    }
};
