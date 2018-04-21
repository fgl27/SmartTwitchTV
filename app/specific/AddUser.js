//Variable initialization
var addUser_loadingDataTry = 0;
var addUser_loadingDataTryMax = 10;
var addUser_loadingDataTimeout = 3500;
var addUser_UsernameArray = [];
var addUser_UserIdArray = [];
var addUser_Followercount = 0;
var addUser_Username = null;
var addUser_loadingData = false;
var addUser_keyBoardOn = false;
//Variable initialization end

function addUser_init() {
    main_Go = main_addUser;
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    main_HideWarningDialog();
    addUser_input = document.querySelector('#user_input');
    document.getElementById("user_input").placeholder = STR_PLACEHOLDER_USER;
    addUser_inputFocus();
    addUser_scrollVerticalToElementById('user_input');
}

function addUser_exit() {
    addUser_RemoveinputFocus();
    document.body.removeEventListener("keydown", addUser_handleKeyDown);
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
}

function addUser_handleKeyDown(event) {
    if (addUser_loadingData || addUser_keyBoardOn) return;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (main_isAboutDialogShown()) main_HideAboutDialog();
            else if (main_isControlsDialogShown()) main_HideControlsDialog();
            else {
                main_Go = main_Before;
                addUser_exit();
                main_SwitchScreen();
            }
            break;
        case TvKeyCode.KEY_CHANNELUP:
            main_Go = main_games;
            addUser_exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            main_Go = main_Live;
            addUser_exit();
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            addUser_inputFocus();
            break;
        case TvKeyCode.KEY_RED:
            main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            addUser_exit();
            main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            main_BeforeSearch = main_Go;
            main_Go = main_Search;
            addUser_exit();
            main_SwitchScreen();
            break;
        default:
            break;
    }
}

function addUser_inputFocus() {
    document.body.removeEventListener("keydown", addUser_handleKeyDown);
    document.body.addEventListener("keydown", addUser_KeyboardEvent, false);
    addUser_input.addEventListener('input');
    addUser_input.addEventListener('compositionend');
    document.getElementById("user_input").placeholder = STR_PLACEHOLDER_USER;
    addUser_input.focus();
    addUser_keyBoardOn = true;
}

function addUser_RemoveinputFocus() {
    addUser_input.blur();
    document.body.removeEventListener("keydown", addUser_KeyboardEvent);
    document.body.addEventListener("keydown", addUser_handleKeyDown, false);
    document.getElementById("user_input").placeholder = STR_PLACEHOLDER_PRESS + STR_PLACEHOLDER_USER;
    window.setTimeout(function() {
        addUser_keyBoardOn = false;
    }, 250);
}

function addUser_KeyboardEvent(event) {
    if (addUser_loadingData) return;

    switch (event.keyCode) {
        case TvKeyCode.KEY_KEYBOARD_DELETE_ALL:
            document.getElementById("user_input").value = '';
            event.preventDefault();
            break;
        case TvKeyCode.KEY_KEYBOARD_DONE:
        case TvKeyCode.KEY_KEYBOARD_CANCEL:
            if ($('#user_input').val() !== '' && $('#user_input').val() !== null) {

                document.getElementById("user_input").value = $('#user_input').val();
                addUser_Username = $('#user_input').val();

                if (!addUser_UserCodeExist(addUser_Username)) {
                    addUser_loadingDataTry = 0;
                    addUser_loadingDataTimeout = 3500;
                    addUser_loadingData = true;
                    main_showLoadDialog();
                    addUser_scrollVerticalToElementById('blank_focus');
                    addUser_loadDataRequest();
                } else {
                    main_HideLoadDialog();
                    main_showWarningDialog(STR_USER + addUser_Username + STR_USER_SET);
                    window.setTimeout(function() {
                        main_HideWarningDialog();
                        addUser_inputFocus();
                    }, 1500);
                }
            }
            addUser_RemoveinputFocus();
            break;
        case TvKeyCode.KEY_KEYBOARD_BACKSPACE:
            document.getElementById("user_input").value = $('#user_input').val().slice(0, -1);
            event.preventDefault();
            break;
        case TvKeyCode.KEY_KEYBOARD_SPACE:
            document.getElementById("user_input").value = $('#user_input').val() + ' ';
            event.preventDefault();
            break;
        default:
            break;
    }
}

function addUser_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(addUser_Username) + '/follows/channels?limit=1&sortby=created_at&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = addUser_loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    document.getElementById("user_input").value = '';
                    document.body.removeEventListener("keydown", addUser_handleKeyDown);
                    addUser_SaveNewUser();
                    return;
                } else {
                    addUser_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        addUser_loadDataError();
    }
}

function addUser_loadDataError() {
    addUser_loadingDataTry++;
    if (addUser_loadingDataTry < addUser_loadingDataTryMax) {
        addUser_loadingDataTimeout += (addUser_loadingDataTry < 5) ? 250 : 3500;
        addUser_loadDataRequest();
    } else {
        addUser_Username = null;
        main_HideLoadDialog();
        main_showWarningDialog(STR_USER_ERROR);
        window.setTimeout(function() {
            addUser_init();
        }, 1000);
        addUser_loadingData = false;
    }
}

function addUser_OldRestoreUsers() {
    addUser_UsernameArray = [];
    var size = parseInt(localStorage.getItem('UsernameArraySize')) || 0;
    if (size > 0)
        for (var x = 0; x < size; x++) addUser_UsernameArray[x] = localStorage.getItem('UsernameArray' + x);

    addUser_SaveUserArray();
}

function addUser_RestoreUsers() {
    addUser_UsernameArray = JSON.parse(localStorage.getItem("usernames")) || [];

    //TODO remove this after some time, the app is in use and OldRestoreUsers is needed
    if (!addUser_UsernameArray.length) addUser_OldRestoreUsers();

    if (addUser_UsernameArray.length) addCode_RestoreUsers();

    window.setTimeout(function() {
        SmartHub.Start();
        window.addEventListener('appcontrol', SmartHub.EventListener, false);

        main_SmartHubId = window.setInterval(SmartHub.Start, 600000);
        document.addEventListener('visibilitychange', main_Resume, false);
    }, 3500);
}

function addUser_SaveNewUser() {
    addUser_UsernameArray.push(addUser_Username);
    addUser_SaveUserArray();

    Users.status = false;
    Users.init();
    addUser_loadingData = false;

    if (addUser_UsernameArray.length === 1) {
        window.clearInterval(main_SmartHubId);
        document.removeEventListener('visibilitychange', main_Resume);

        main_SmartHubId = window.setInterval(SmartHub.Start, 600000);
        document.addEventListener('visibilitychange', main_Resume, false);

        SmartHub.Start();
    }
}

function addUser_removeUser(Position) {

    var userCode = addCode_UserCodeExist(addUser_UsernameArray[Position]);

    // remove the code key
    if (userCode > -1) addCode_removeUser(userCode);

    // remove the user
    var index = addUser_UsernameArray.indexOf(addUser_UsernameArray[Position]);
    if (index > -1) addUser_UsernameArray.splice(index, 1);

    // restart users and smarthub
    if (addUser_UsernameArray.length > 0) {
        Users.status = false;
        Users.init();
        if (!Position) SmartHub.Start();
    } else {
        addUser_init();
        SmartHub.Start();
    }
    addCode_SetDefaultOAuth(Position);

    // reset localStorage usernames
    addUser_SaveUserArray();
}

function addUser_SaveUserArray() {
    localStorage.setItem("usernames", JSON.stringify(addUser_UsernameArray));
}

function addUser_UserMakeOne(Position) {
    addUser_Username = addUser_UsernameArray[0];
    addUser_UsernameArray[0] = addUser_UsernameArray[Position];
    addUser_UsernameArray[Position] = addUser_Username;
    Users.status = false;
    Users.init();
    SmartHub.Start();
}

function addUser_UserCodeExist(user) {
    return addUser_UsernameArray.indexOf(user) !== -1;
}

function addUser_IsUserSet() {
    return addUser_UsernameArray.length > 0;
}

function addUser_scrollVerticalToElementById(id) {
    window.scroll(0, main_documentVerticalScrollPosition() + main_elementVerticalClientPositionById(id) - main_ScrollOffSetMinusVideo - main_ScrollOffSetMinusaddUser);
}
