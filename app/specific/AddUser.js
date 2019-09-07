//Variable initialization
var AddUser_loadingDataTry = 0;
var AddUser_loadingDataTryMax = 5;
var AddUser_loadingDataTimeout = 3500;
var AddUser_UsernameArray = [];
var AddUser_Username = null;
var AddUser_loadingData = false;
var AddUser_keyBoardOn = false;
//Variable initialization end

function AddUser_init() {
    Main_values.Main_Go = Main_addUser;
    ScreensObj_SetTopLable(STR_USER_ADD);
    Main_HideWarningDialog();
    Main_AddUserInput.placeholder = STR_PLACEHOLDER_USER;
    Main_ShowElement('add_user_scroll');
    AddUser_inputFocus();
}

function AddUser_exit() {
    AddUser_RemoveinputFocus(false);
    document.body.removeEventListener("keydown", AddUser_handleKeyDown);
    document.body.removeEventListener("keydown", AddUser_KeyboardEvent);
    Main_HideElement('add_user_scroll');
}

function AddUser_handleKeyDown(event) {
    if (AddUser_loadingData || AddUser_keyBoardOn || Main_values.Main_Go !== Main_addUser) return;
    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                if (AddUser_UsernameArray.length > 0 && Main_values.Main_Go !== Main_Users) Main_values.Main_Go = Main_values.Main_Before;
                else Main_values.Main_Go = Main_Live;
                AddUser_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            AddUser_inputFocus();
            break;
        default:
            break;
    }
}

function AddUser_inputFocus() {
    document.body.removeEventListener("keydown", AddUser_handleKeyDown);
    document.body.addEventListener("keydown", AddUser_KeyboardEvent, false);
    Main_AddUserInput.placeholder = STR_PLACEHOLDER_USER;

    Main_AddUserInput.focus();
    AddUser_keyBoardOn = true;
}

function AddUser_removeEventListener() {
    if (Main_AddUserInput !== null) {
        var elClone = Main_AddUserInput.cloneNode(true);
        Main_AddUserInput.parentNode.replaceChild(elClone, Main_AddUserInput);
        Main_AddUserInput = document.getElementById("user_input");
    }
}

function AddUser_RemoveinputFocus(EnaKeydown) {
    Main_AddUserInput.blur();
    AddUser_removeEventListener();
    document.body.removeEventListener("keydown", AddUser_KeyboardEvent);
    Main_AddUserInput.placeholder = STR_PLACEHOLDER_PRESS + STR_PLACEHOLDER_USER;

    if (EnaKeydown) document.body.addEventListener("keydown", AddUser_handleKeyDown, false);
    AddUser_keyBoardOn = false;
}

function AddUser_KeyboardEvent(event) {
    if (AddUser_loadingData || Main_values.Main_Go !== Main_addUser) return;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                if (AddUser_UsernameArray.length > 0 && Main_values.Main_Go !== Main_Users) Main_values.Main_Go = Main_values.Main_Before;
                else Main_values.Main_Go = Main_Live;
                AddUser_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_KEYBOARD_DELETE_ALL:
            Main_AddUserInput.value = '';
            break;
        case KEY_KEYBOARD_DONE:
        case KEY_DOWN:
            if (Main_AddUserInput.value !== '' && Main_AddUserInput.value !== null) {

                AddUser_Username = Main_AddUserInput.value;

                if (!AddUser_UserCodeExist(AddUser_Username)) {
                    AddUser_loadingDataTry = 0;
                    AddUser_loadingDataTimeout = 3500;
                    AddUser_loadingData = true;
                    Main_HideElement('add_user_scroll');
                    Main_showLoadDialog();
                    AddUser_loadDataRequest();
                } else {
                    Main_HideLoadDialog();
                    Main_showWarningDialog(STR_USER + " " + AddUser_Username + STR_USER_SET);
                    window.setTimeout(function() {
                        Main_HideWarningDialog();
                        AddUser_inputFocus();
                    }, 1500);
                }
            } else AddUser_inputFocus();
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
    var theUrl = 'https://api.twitch.tv/kraken/users?login=' + encodeURIComponent(AddUser_Username);

    BasehttpGet(theUrl, AddUser_loadingDataTimeout, 2, null, AddUser_loadDataRequestSuccess, AddUser_loadDataError);
}

function AddUser_loadDataRequestSuccess(response) {
    if (JSON.parse(response)._total) {
        Main_AddUserInput.value = '';
        document.body.removeEventListener("keydown", AddUser_handleKeyDown);
        AddUser_SaveNewUser(response);
    } else AddUser_loadDataNoUser();
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
    AddUser_UsernameArray = Main_getItemJson('AddUser_UsernameArray', []);
    if (AddUser_UsernameArray.length > 0) {
        //Check and refresh all tokens at start
        for (var i = 0; i < AddUser_UsernameArray.length; i++) {
            if (AddUser_UsernameArray[i].access_token) AddCode_CheckTokenStart(i);

            if (!AddUser_UsernameArray[i].logo) AddUser_UpdateUser(i, 0);
            else if (!i) AddUser_UpdateSidepanel();
        }
    } else AddUser_UpdateSidepanelDefault();
}

function AddUser_UpdateSidepanel() {
    AddUser_UpdateSidepanelSize(AddUser_UsernameArray[0].logo, AddUser_UsernameArray[0].display_name);
}

function AddUser_UpdateSidepanelDefault() {
    AddUser_UpdateSidepanelSize(IMG_404_LOGO, STR_USER_ADD);
}

function AddUser_UpdateSidepanelSize(logo, username) {
    Main_innerHTML("side_panel_new_0_img", '<img id="side_panel_new_0_img" class="side_panel_new_img" alt="" src="' + logo + '" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\'">');
    Sidepannel_SetUserlable(username);

    var size = username.length,
        doc = document.getElementById('side_panel_movel');

    size = (size > 8 ? size - 8 : 0);

    doc.style.marginLeft = 'calc(-' + Sidepannel_MoveldefaultMargin + '% - ' + size + 'ch)';
    doc.style.width = 'calc(' + Sidepannel_MoveldefaultWidth + '% + ' + size + 'ch)';
}

function AddUser_UserIsSet() {
    return AddUser_UsernameArray.length > 0;
}

function AddUser_UpdateUser(position, tryes) {
    var theUrl = 'https://api.twitch.tv/kraken/users?login=' + encodeURIComponent(AddUser_UsernameArray[position].name);
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = 10000;

    for (var i = 0; i < 2; i++)
        xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) AddUser_UpdateUsertSuccess(xmlHttp.responseText, position);
            else AddUser_UpdateUserError(position, tryes);
        }
    };

    xmlHttp.send(null);
}

function AddUser_UpdateUsertSuccess(response, position) {
    var user = JSON.parse(response);
    if (user._total) {
        Main_AddUserInput.value = '';
        document.body.removeEventListener("keydown", AddUser_handleKeyDown);
        user = user.users[0];
        AddUser_UsernameArray[position].display_name = user.display_name;
        AddUser_UsernameArray[position].logo = user.logo;
        if (!position) AddUser_UpdateSidepanel();
    }
    AddUser_SaveUserArray();
}

function AddUser_UpdateUserError(position, tryes) {
    tryes++;
    if (tryes < AddUser_loadingDataTryMax) AddUser_UpdateUser(position, tryes);
}

function AddUser_SaveNewUser(responseText) {
    AddUser_Username = JSON.parse(responseText).users[0];
    AddUser_UsernameArray.push({
        name: AddUser_Username.name,
        id: AddUser_Username._id,
        display_name: AddUser_Username.display_name,
        logo: AddUser_Username.logo,
        access_token: 0,
        refresh_token: 0
    });

    AddUser_SaveUserArray();
    Users_status = false;
    Users_Userlastadded = AddUser_Username.name;
    Users_ShowAutetication = true;
    AddUser_exit();
    Main_values.Main_Go = Main_Users;
    Main_HideLoadDialog();
    if (AddUser_UsernameArray.length === 1) AddUser_UpdateSidepanel();
    Main_SwitchScreenAction();
    AddUser_loadingData = false;
}

function AddUser_removeUser(Position) {

    // remove the user
    var index = AddUser_UsernameArray.indexOf(AddUser_UsernameArray[Position]);
    if (index > -1) AddUser_UsernameArray.splice(index, 1);

    // reset localStorage usernames
    AddUser_SaveUserArray();

    // restart users and smarthub
    if (AddUser_UsernameArray.length > 0) {
        Users_status = false;
        Users_init();
    } else AddUser_init();
}

function AddUser_SaveUserArray() {
    //Remove first user alphabetical sort and add first back
    var mainuser = AddUser_UsernameArray.splice(0, 1);
    AddUser_UsernameArray.sort(function(a, b) {
        return (a.display_name).toLowerCase().localeCompare((b.display_name).toLowerCase());
    });
    AddUser_UsernameArray.splice(0, 0, mainuser[0]);

    Main_setItem('AddUser_UsernameArray', JSON.stringify(AddUser_UsernameArray));
}

function AddUser_UserMakeOne(Position) {
    AddUser_Username = AddUser_UsernameArray[0];
    AddUser_UsernameArray[0] = AddUser_UsernameArray[Position];
    AddUser_UsernameArray[Position] = AddUser_Username;
    AddUser_SaveUserArray();
    Users_status = false;
    AddUser_UpdateSidepanel();
    Users_init();
    Main_values.Users_Position = 0;
}

function AddUser_UserCodeExist(user) {
    return AddUser_UsernameArray.filter(function(array) {
        return array.name === user;
    }).length > 0;
}

function AddUser_UserFindpos(user) {
    return AddUser_UsernameArray.map(function(array) {
        return array.name;
    }).indexOf(user);
}

function AddUser_IsUserSet() {
    return AddUser_UsernameArray.length > 0;
}