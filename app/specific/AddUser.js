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
    AddUser_scrollVerticalToElementById('user_input');
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
                Main_Go = Main_Before;
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
            Main_showAboutDialog();
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
        case KEY_KEYBOARD_DELETE_ALL:
            Main_AddUserInput.value = '';
            event.preventDefault();
            break;
        case KEY_KEYBOARD_DONE:
        case KEY_KEYBOARD_CANCEL:
            if (Main_AddUserInput.value !== '' && Main_AddUserInput.value !== null) {
                if (Main_isReleased) AddUser_Username = Main_AddUserInput.value;
                else AddUser_Username = 'testtwitch27';

                if (!AddUser_UserCodeExist(AddUser_Username)) {
                    AddUser_loadingDataTry = 0;
                    AddUser_loadingDataTimeout = 3500;
                    AddUser_loadingData = true;
                    Main_HideElement('add_user_scroll');
                    Main_showLoadDialog();
                    AddUser_scrollVerticalToElementById('blank_focus');
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
            event.preventDefault();
            break;
        case KEY_KEYBOARD_SPACE:
            Main_AddUserInput.value += ' ';
            event.preventDefault();
            break;
        default:
            break;
    }
}

function AddUser_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(AddUser_Username) + '/follows/channels?limit=1&sortby=created_at&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = AddUser_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Main_AddUserInput.value = '';
                    document.body.removeEventListener("keydown", AddUser_handleKeyDown);
                    AddUser_SaveNewUser();
                    return;
                } else {
                    AddUser_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddUser_loadDataError();
    }
}

function AddUser_loadDataError() {
    AddUser_loadingDataTry++;
    if (AddUser_loadingDataTry < AddUser_loadingDataTryMax) {
        AddUser_loadingDataTimeout += 500;
        AddUser_loadDataRequest();
    } else {
        AddUser_Username = null;
        Main_HideLoadDialog();
        Main_showWarningDialog(STR_USER_ERROR);
        window.setTimeout(function() {
            AddUser_init();
        }, 1000);
        AddUser_loadingData = false;
    }
}

function AddUser_RestoreUsers() {
    AddUser_UsernameArray = JSON.parse(localStorage.getItem("usernames")) || [];

    if (AddUser_UsernameArray.length) AddCode_RestoreUsers();

    Main_TizenVersion = parseFloat(tizen.systeminfo.getCapability("http://tizen.org/feature/platform.version")) >= 2.4;

    if (Main_TizenVersion) {
        window.setTimeout(function() {
            window.addEventListener('appcontrol', SmartHub_EventListener, false);

            SmartHub_StartInterval();
            document.addEventListener('visibilitychange', Main_ResumeSmarthub, false);
        }, 3500);
    }
}

function AddUser_SaveNewUser() {
    AddUser_UsernameArray.push(AddUser_Username);
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

    var userCode = AddCode_UserCodeExist(AddUser_UsernameArray[Position]);

    // remove the code key
    if (userCode > -1) AddCode_removeUser(userCode);

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
    AddCode_SetDefaultOAuth(Position);

    // reset localStorage usernames
    AddUser_SaveUserArray();
}

function AddUser_SaveUserArray() {
    localStorage.setItem("usernames", JSON.stringify(AddUser_UsernameArray));
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

function AddUser_scrollVerticalToElementById(id) {
    window.scroll(0, Main_documentVerticalScrollPosition() + Main_elementVerticalClientPositionById(id) - Main_ScrollOffSetMinusVideo - Main_ScrollOffSetMinusaddUser);
}