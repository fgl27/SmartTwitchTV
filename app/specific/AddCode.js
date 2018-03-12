/*jshint multistr: true */
//Variable initialization
function AddCode() {}
AddCode.loadingDataTry = 0;
AddCode.loadingDataTryMax = 10;
AddCode.loadingDataTimeout = 3500;
AddCode.UsercodeArraySize = 0;
AddCode.UsercodeArray = [];
AddCode.UserIdArray = [];
AddCode.Followercount = 0;
AddCode.Username = null;
AddCode.loadingData = false;
AddCode.keyBoardOn = false;
//Variable initialization end
AddCode.userId = '';
AddCode.userChannel = 26610234;
AddCode.OauthToken = '';

AddCode.init = function() {
    Main.Go = Main.AddCode;
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    Main.HideWarningDialog();
    AddCode.input = document.querySelector('#oauth_input');
    $('.label_placeholder_oauth').attr("placeholder", STR_PLACEHOLDER_OAUTH);
    document.getElementById("oauth_text").innerHTML = STR_OAUTH_IN + Main.UserName + STR_BR + STR_BR + STR_OAUTH_EXPLAIN;
    AddCode.inputFocus();
    Search.ScrollHelper.scrollVerticalToElementById('oauth_input');
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
                Main.Go = Main.Before;
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
            Main.Go = Main.Live;
            AddCode.exit();
            Main.SwitchScreen();
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
    AddCode.keyBoardOn = false;
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
                AddCode.OauthToken = ''; //$('#oauth_input').val();

                AddCode.loadingDataTry = 0;
                AddCode.loadingDataTimeout = 3500;
                AddCode.loadingData = true;
                Main.showLoadDialog();
                Search.ScrollHelper.scrollVerticalToElementById('blank_focus');
                AddCode.CheckId();
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

//Get user id
AddCode.CheckId = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/user', true);
        xmlHttp.timeout = AddCode.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.setRequestHeader('Authorization', 'OAuth ' + AddCode.OauthToken);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        AddCode.CheckIdSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
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
    } else {
        Main.HideLoadDialog();
        Main.showWarningDialog('OAuthError fail');
    }
};

AddCode.CheckIdSuccess = function(responseText) {
    console.log('OAuthId');
    console.log(responseText);
    AddCode.userId = $.parseJSON(responseText)._id;
    AddCode.Username = $.parseJSON(responseText).name + '';

    console.log('AddCode.userId ' + AddCode.userId);
    console.log('AddCode.Username ' + AddCode.Username);
    if (AddCode.Username == Main.UserName) {
        console.log('CheckIdSuccess is Success ');
        document.getElementById("oauth_input").value = '';
        document.body.removeEventListener("keydown", AddCode.handleKeyDown);
        AddCode.SaveNewUser()
    } else {
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_OAUTH_WRONG + Main.UserName + STR_OAUTH_WRONG2 + AddCode.Username);
        window.setTimeout(function() {
            Main.HideWarningDialog();
            AddUser.inputFocus();
        }, 3500);
    }
};

AddCode.RestoreUsers = function() {
    AddCode.UsercodeArray = [];
    AddCode.UsercodeArraySize = parseInt(localStorage.getItem('UsercodeArraySize')) || 0;
    if (AddCode.UsercodeArraySize > 0) {
        for (var x = 0; x < AddCode.UsercodeArraySize; x++) {
            AddCode.UsercodeArray[x] = localStorage.getItem('UsercodeArray' + x);
        }
    } //else {
    //AddCode.UsercodeArray[0] = ''; // hardcoded user 1
    //AddCode.UsercodeArraySize++;
    //AddCode.UsercodeArray[1] = ''; // hardcoded user 2
    //AddCode.UsercodeArraySize++;
    }
};

AddCode.SaveNewUser = function() {
    var value = AddCode.Username + ',' + AddCode.userId + ',' + AddCode.OauthToken;
    AddCode.UsercodeArray[AddCode.UsercodeArraySize] = value;
    console.log(AddCode.UsercodeArray[AddCode.UsercodeArraySize]);
    localStorage.setItem('UsercodeArray' + AddCode.UsercodeArraySize, value);
    AddCode.UsercodeArraySize++;
    localStorage.setItem('UsercodeArraySize', AddCode.UsercodeArraySize);
    Users.status = false;
    Users.init();
    AddCode.loadingData = false;
};

AddCode.removeUser = function(Position) {
    AddCode.UsercodeArraySize--;
    localStorage.setItem('UsercodeArraySize', AddCode.UsercodeArraySize);

    var index = AddCode.UsercodeArray.indexOf(AddCode.UsercodeArray[Position]);
    if (index > -1) {
        AddCode.UsercodeArray.splice(index, 1);
    }

    for (var x = 0; x < AddCode.UsercodeArray.length; x++) {
        localStorage.setItem('UsercodeArray' + x, AddCode.UsercodeArray[x]);
    }
    if (AddCode.UsercodeArray.length > 0) {
        Users.status = false;
        Users.init();
        if (Position === 0) SmartHub.Start();
    } else { 
        AddCode.init();
        SmartHub.Start();
    }
};

AddCode.UserMakeOne = function(Position) {
    AddCode.Username = AddCode.UsercodeArray[0];
    AddCode.UsercodeArray[0] = AddCode.UsercodeArray[Position];
    AddCode.UsercodeArray[Position] = AddCode.Username;
    Users.status = false;
    Users.init();
    SmartHub.Start();
};

AddCode.UserExist = function(user) {
    for (var i = 0; i < AddUser.UsercodeArray.length; i++) {
        if ((user + ',') == AddUser.UsercodeArray[i]) return i;
    }
    return -1;
};

//Twitch autentication
AddCode.OAuthStart = function(position) {
    Main.UserName = AddCode.UsercodeArray[position];
    //code to display dialog requesting autentication token
    //AddCode.startoauthDialog();
};

//startoauthDialog have added the token
AddCode.userGetid = function(position) {
    Main.UserName = AddCode.UsercodeArray[position];
    //code to display dialog requesting autentication token
    AddCode.loadingDataTry = 0;
    AddCode.loadingDataTimeout = 3500;
    AddCode.loadingData = true;
    AddCode.OAuthRequestStart();
};

//Check User Subscription
AddCode.OAuthRequestCheckSub = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + AddCode.userId + '/subscriptions/' + AddCode.userChannel, true);
        xmlHttp.timeout = AddCode.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try { //yes sub
                        console.log(xmlHttp.responseText);
                        AddCode.OAuthIsSub(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else if (xmlHttp.status === 402) { //channel does not have a subscription program
                    AddCode.OAuthChannelNoSubs(xmlHttp.responseText);
                } else if (xmlHttp.status === 404) { //not sub
                    console.log(xmlHttp.responseText);
                    if ((JSON.parse(xmlHttp.responseText).error + '').indexOf('Not Found') !== -1) {
                        AddCode.OAuthNotSub(xmlHttp.responseText);
                    } else AddCode.OAuthSubError();
                } else { // internet error
                    AddCode.OAuthSubError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode.OAuthSubError();
    }
};

AddCode.OAuthSubError = function() {
    AddCode.loadingDataTry++;
    if (AddCode.loadingDataTry < AddCode.loadingDataTryMax) {
        AddCode.loadingDataTimeout += (AddCode.loadingDataTry < 5) ? 250 : 3500;
        AddCode.OAuthRequestCheckSub();
    } else {
        Main.HideLoadDialog();
        Main.showWarningDialog('OAuth OAuthFallowsError fail');
    }
};

AddCode.OAuthIsSub = function(responseText) {
    console.log('OAuthIsSub');
    if (JSON.parse(responseText).channel._id) console.log($.parseJSON(responseText).channel._id);
    else console.log(responseText);
    //    AddCode.userChannel = 31089858;
    //    AddCode.OAuthRequestCheckFallow();

    AddCode.loadingDataTry = 0;
    AddCode.loadingDataTimeout = 3500;
    AddCode.loadingData = true;
    AddCode.FallowRequest();
};

AddCode.OAuthNotSub = function(responseText) {
    console.log(responseText);
    AddCode.loadingDataTry = 0;
    AddCode.loadingDataTimeout = 3500;
    AddCode.loadingData = true;
    AddCode.FallowRequest();
};

AddCode.OAuthChannelNoSubs = function(responseText) {
    console.log(responseText);
    AddCode.loadingDataTry = 0;
    AddCode.loadingDataTimeout = 3500;
    AddCode.loadingData = true;
    AddCode.FallowRequest();
};

AddCode.OAuthRequestCheckFallow = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + AddCode.userId + '/follows/channels/' + AddCode.userChannel, true);
        xmlHttp.timeout = AddCode.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', Main.clientId);
        xmlHttp.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try { //yes sub
                        console.log(xmlHttp.responseText);
                        AddCode.OAuthIsFallow(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else if (xmlHttp.status === 404) { //not sub
                    console.log(xmlHttp.responseText);
                    if ((JSON.parse(xmlHttp.responseText).error + '').indexOf('Not Found') !== -1) {
                        AddCode.OAuthNotFallow(xmlHttp.responseText);
                    } else AddCode.OAuthFallowError();
                } else { // internet error
                    AddCode.OAuthFallowError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddCode.OAuthFallowError();
    }
};

AddCode.OAuthFallowError = function() {
    AddCode.loadingDataTry++;
    if (AddCode.loadingDataTry < AddCode.loadingDataTryMax) {
        AddCode.loadingDataTimeout += (AddCode.loadingDataTry < 5) ? 250 : 3500;
        AddCode.OAuthRequestCheckSub();
    } else {
        Main.HideLoadDialog();
        Main.showWarningDialog('OAuth OAuthFallowsError fail');
    }
};

AddCode.OAuthIsFallow = function(responseText) {
    console.log('OAuthIsFallow');
    if (JSON.parse(responseText).channel._id) console.log($.parseJSON(responseText).channel._id);
    else console.log(responseText);
    //    AddCode.userChannel = 31089858;
    //    AddCode.OAuthRequestCheckFallow();

    AddCode.loadingDataTry = 0;
    AddCode.loadingDataTimeout = 3500;
    AddCode.loadingData = true;
    AddCode.FallowRequest();
};

AddCode.OAuthNotFallow = function(responseText) {
    console.log(responseText);
    AddCode.loadingDataTry = 0;
    AddCode.loadingDataTimeout = 3500;
    AddCode.loadingData = true;
    AddCode.FallowRequest();
};

//request to fallow
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
                if (xmlHttp.status === 200) {
                    try {
                        console.log(xmlHttp.responseText);
                        AddCode.FallowRequestSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else if (xmlHttp.status === 404) {
                    console.log(xmlHttp.responseText);
                    AddCode.FallowRequestError();
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
        AddCode.loadingDataTimeout += (AddCode.loadingDataTry < 5) ? 250 : 3500;
        AddCode.OAuthRequestCheckFallow();
    } else {
        Main.HideLoadDialog();
        Main.showWarningDialog('OAuth FallowRequest fail');
    }
};

AddCode.FallowRequestSuccess = function(responseText) {
    console.log('FallowRequestSuccess');
    console.log(responseText);
    AddCode.loadingDataTry = 0;
    AddCode.loadingDataTimeout = 3500;
    AddCode.loadingData = true;
    //    AddCode.UnFallowRequest();
};

//request to unfallow
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
                if (xmlHttp.status === 200) {
                    try {
                        console.log(xmlHttp.responseText);
                        AddCode.FallowRequestSuccess(xmlHttp.responseText);
                        return;
                    } catch (e) {}
                } else if (xmlHttp.status === 204) {
                    console.log(xmlHttp.responseText);
                    AddCode.UnFallowRequestSuccess(xmlHttp.responseText);
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
        AddCode.loadingDataTimeout += (AddCode.loadingDataTry < 5) ? 250 : 3500;
        AddCode.UnFallowRequest();
    } else {
        Main.HideLoadDialog();
        Main.showWarningDialog('OAuth UnFallowRequest fail');
    }
};

AddCode.UnFallowRequestSuccess = function(responseText) {
    console.log(responseText); //empty answer 204 mean we now unfallow the channel
};
