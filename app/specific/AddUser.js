//Variable initialization
var AddUser_loadingDataTry = 0;
var AddUser_loadingDataTryMax = 5;
var AddUser_loadingDataTimeout = 3500;
var AddUser_UsernameArray = [];
var AddUser_Username = null;
var AddUser_loadingData = false;
var AddUser_keyBoardOn = false;
var AddUser_input = null;
//Variable initialization end

function AddUser_init() {
    Main_Go = Main_addUser;
    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_HideWarningDialog();
    AddUser_input = document.querySelector('#user_input');
    Main_AddUserInput.placeholder = STR_PLACEHOLDER_USER;
    Main_ShowElement('add_user_scroll');
    AddUser_inputFocus();
}

function AddUser_exit() {
    AddUser_RemoveinputFocus();
    document.body.removeEventListener("keydown", AddUser_handleKeyDown);
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_HideElement('add_user_scroll');
}

function AddUser_handleKeyDown(event) {
    if (AddUser_loadingData || AddUser_keyBoardOn) return;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                if (AddUser_UsernameArray.length > 0 && Main_Go !== Main_Users) Main_Go = Main_Before;
                else Main_Go = Main_Live;
                AddUser_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_CHANNELUP:
            Main_Go = Main_Featured;
            AddUser_exit();
            Main_SwitchScreen();
            break;
        case KEY_CHANNELDOWN:
            Main_Go = Main_Live;
            AddUser_exit();
            Main_SwitchScreen();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            AddUser_inputFocus();
            break;
        case KEY_RED:
            Main_SidePannelStart(AddUser_handleKeyDown);
            break;
        case KEY_GREEN:
            AddUser_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            Main_BeforeSearch = Main_Go;
            Main_Go = Main_Search;
            AddUser_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}

function AddUser_inputFocus() {
    document.body.removeEventListener("keydown", AddUser_handleKeyDown);
    document.body.addEventListener("keydown", AddUser_KeyboardEvent, false);
    AddUser_input.addEventListener('input');
    AddUser_input.addEventListener('compositionend');
    Main_AddUserInput.placeholder = STR_PLACEHOLDER_USER;
    AddUser_input.focus();
    AddUser_keyBoardOn = true;
}

function AddUser_RemoveinputFocus() {
    AddUser_input.blur();
    document.body.removeEventListener("keydown", AddUser_KeyboardEvent);
    document.body.addEventListener("keydown", AddUser_handleKeyDown, false);
    Main_AddUserInput.placeholder = STR_PLACEHOLDER_PRESS + STR_PLACEHOLDER_USER;
    window.setTimeout(function() {
        AddUser_keyBoardOn = false;
    }, 250);
}

function AddUser_KeyboardEvent(event) {
    if (AddUser_loadingData) return;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                if (AddUser_UsernameArray.length > 0 && Main_Go !== Main_Users) Main_Go = Main_Before;
                else Main_Go = Main_Live;
                AddUser_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_KEYBOARD_DELETE_ALL:
            Main_AddUserInput.value = '';
            break;
        case KEY_KEYBOARD_DONE:
        case KEY_KEYBOARD_CANCEL:
            if (Main_AddUserInput.value !== '' && Main_AddUserInput.value !== null) {

                if (!Main_isReleased && !AddUser_UserIsSet()) AddUser_Username = 'testtwitch27';
                else AddUser_Username = Main_AddUserInput.value;

                if (!AddUser_UserCodeExist(AddUser_Username)) {
                    AddUser_loadingDataTry = 0;
                    AddUser_loadingDataTimeout = 3500;
                    AddUser_loadingData = true;
                    Main_HideElement('add_user_scroll');
                    Main_showLoadDialog();
                    AddUser_loadDataRequest();
                } else {
                    Main_HideLoadDialog();
                    Main_showWarningDialog(STR_USER + AddUser_Username + STR_USER_SET);
                    window.setTimeout(function() {
                        Main_HideWarningDialog();
                        AddUser_inputFocus();
                    }, 1500);
                }
            }
            AddUser_RemoveinputFocus();
            break;
        case KEY_KEYBOARD_BACKSPACE:
            Main_AddUserInput.value = Main_AddUserInput.value.slice(0, -1);
            break;
        case KEY_KEYBOARD_SPACE:
            Main_AddUserInput.value += ' ';
            break;
        default:
            break;
    }
}

function AddUser_loadDataRequest() {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users?login=' + encodeURIComponent(AddUser_Username), true);
    xmlHttp.timeout = AddUser_loadingDataTimeout;
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                if (JSON.parse(xmlHttp.responseText)._total) {
                    Main_AddUserInput.value = '';
                    document.body.removeEventListener("keydown", AddUser_handleKeyDown);
                    AddUser_SaveNewUser(xmlHttp.responseText);
                } else AddUser_loadDataNoUser();
                return;
            } else {
                AddUser_loadDataError();
            }
        }
    };

    xmlHttp.send(null);
}

function AddUser_loadDataError() {
    AddUser_loadingDataTry++;
    if (AddUser_loadingDataTry < AddUser_loadingDataTryMax) {
        AddUser_loadingDataTimeout += 500;
        AddUser_loadDataRequest();
    } else AddUser_loadDataNoUser();
}

function AddUser_loadDataNoUser() {
    AddUser_Username = null;
    Main_HideLoadDialog();
    Main_showWarningDialog(STR_USER_ERROR);
    window.setTimeout(function() {
        AddUser_init();
    }, 1000);
    AddUser_loadingData = false;
}

function AddUser_RestoreUsers() {
    AddUser_UsernameArray = JSON.parse(localStorage.getItem("AddUser_UsernameArray")) || [];
    if (AddUser_UsernameArray.length > 0) {
        //Check and refresh all tokens at start
        for (var i = 0; i < AddUser_UsernameArray.length; i++)
            if (AddUser_UsernameArray[i].access_token) AddCode_CheckTokenStart(i);
    }

    Main_TizenVersion = parseFloat(tizen.systeminfo.getCapability("http://tizen.org/feature/platform.version")) >= 2.4;

    if (Main_TizenVersion) {
        window.setTimeout(function() {
            SmartHub_SetNoUserPreviewData();
            window.addEventListener('appcontrol', SmartHub_EventListener, false);

            SmartHub_StartInterval();
            document.addEventListener('visibilitychange', Main_ResumeSmarthub, false);
        }, 3500);
    }
}

function AddUser_UserIsSet() {
    return AddUser_UsernameArray.length > 0;
}

function AddUser_GetIdRequest(position, trys) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users?login=' + AddUser_UsernameArray[position].name, true);
    xmlHttp.timeout = 10000;
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
    xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                Main_AddUserInput.value = '';
                document.body.removeEventListener("keydown", AddUser_handleKeyDown);
                AddUser_SaveOldUser(xmlHttp.responseText, position);
                return;
            } else {
                AddUser_GetIdRequestError(position, trys);
            }
        }
    };

    xmlHttp.send(null);
}

function AddUser_GetIdRequestError(position, trys) {
    trys++;
    if (trys < 10) AddUser_GetIdRequest(position, trys);
    else { //It fails too much remove it
        var index = AddUser_UsernameArray.indexOf(AddUser_UsernameArray[position]);
        if (index > -1) AddUser_UsernameArray.splice(index, 1);
    }

}

function AddUser_SaveOldUser(responseText, position) {
    AddUser_Username = JSON.parse(responseText).users[0];

    AddUser_UsernameArray[position].name = AddUser_Username.name;
    AddUser_UsernameArray[position].id = AddUser_Username._id;

    var mlength = AddUser_UsernameArray.length;

    AddUser_SaveUserArray();

    if (Main_TizenVersion && mlength === 1) {
        window.clearInterval(Main_SmartHubId);
        document.removeEventListener('visibilitychange', Main_ResumeSmarthub);
        document.addEventListener('visibilitychange', Main_ResumeSmarthub, false);
        SmartHub_StartInterval();
    }
}

function AddUser_SaveNewUser(responseText) {
    AddUser_Username = JSON.parse(responseText).users[0];
    AddUser_UsernameArray.push({
        'name': AddUser_Username.name,
        'id': AddUser_Username._id,
        'access_token': 0,
        'refresh_token': 0
    });

    AddUser_SaveUserArray();
    Users_status = false;
    AddUser_exit();
    Users_init();
    AddUser_loadingData = false;

    if (Main_TizenVersion && AddUser_UsernameArray.length === 1) {
        window.clearInterval(Main_SmartHubId);
        document.removeEventListener('visibilitychange', Main_ResumeSmarthub);
        document.addEventListener('visibilitychange', Main_ResumeSmarthub, false);
        SmartHub_StartInterval();
    }
}

function AddUser_removeUser(Position) {

    // remove the user
    var index = AddUser_UsernameArray.indexOf(AddUser_UsernameArray[Position]);
    if (index > -1) AddUser_UsernameArray.splice(index, 1);

    // restart users and smarthub
    if (AddUser_UsernameArray.length > 0) {
        Users_status = false;
        Users_init();
        if (!Position) SmartHub_Start();
    } else {
        AddUser_init();
        SmartHub_Start();
    }

    // reset localStorage usernames
    AddUser_SaveUserArray();
}

function AddUser_SaveUserArray() {
    Main_setItem('AddUser_UsernameArray', JSON.stringify(AddUser_UsernameArray));
}

function AddUser_UserMakeOne(Position) {
    AddUser_Username = AddUser_UsernameArray[0];
    AddUser_UsernameArray[0] = AddUser_UsernameArray[Position];
    AddUser_UsernameArray[Position] = AddUser_Username;
    Users_status = false;
    Users_init();
    SmartHub_Start();
}

function AddUser_UserCodeExist(user) {
    return AddUser_UsernameArray.indexOf(user) !== -1;
}

function AddUser_IsUserSet() {
    return AddUser_UsernameArray.length > 0;
}