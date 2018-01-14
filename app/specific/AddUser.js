/*jshint multistr: true */
//Variable initialization
function AddUser() {}
AddUser.loadingDataTry = 1;
AddUser.loadingDataTryMax = 10;
AddUser.loadingDataTimeout = 3500;
AddUser.UsernameArraySize = 0;
AddUser.UsernameArray = [];
AddUser.Followercount = 0;
AddUser.Username = null;
AddUser.loadingData = false;
//Variable initialization end

AddUser.init = function() {
    Main.Go = Main.AddUser;
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    Main.HideWarningDialog();
    AddUser.input = document.querySelector('#user_input');
    $('.label_placeholder_user').attr("placeholder", STR_PLACEHOLDER_USER);
    document.body.addEventListener("keydown", AddUser.handleKeyDown, false);
    AddUser.inputFocus();
    AddUser.ScrollHelper.scrollVerticalToElementById('user_input');
};

AddUser.exit = function() {
    AddUser.input.blur();
    document.body.removeEventListener("keydown", AddUser.KeyboardEvent);
    document.body.removeEventListener("keydown", AddUser.handleKeyDown);
    window.setTimeout(function() {
        $('#top_bar_user').removeClass('icon_center_focus');
        $('#top_bar_user').addClass('icon_center_label');
    }, 250);
};

AddUser.exitMain = function() {
    window.setTimeout(function() {
        Main.SwitchScreen();
    }, 250);
};

AddUser.handleKeyDown = function(event) {
    if (AddUser.loadingData) {
        event.preventDefault();
        return;
    }

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            Main.Go = Main.Before;
            AddUser.exit();
            AddUser.exitMain();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            Main.Go = Main.Games;
            AddUser.exit();
            AddUser.exitMain();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = Main.Live;
            AddUser.exit();
            AddUser.exitMain();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            AddUser.inputFocus();
            break;
        case TvKeyCode.KEY_LEFT:
        case TvKeyCode.KEY_RIGHT:
        case TvKeyCode.KEY_UP:
        case TvKeyCode.KEY_DOWN:
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
        case TvKeyCode.KEY_RED:
        case TvKeyCode.KEY_GREEN:
        case TvKeyCode.KEY_YELLOW:
        case TvKeyCode.KEY_BLUE:
            Main.BeforeSearch = Main.Go;
            Main.Go = Main.Search;
            Live.exit();
            break;
        default:
            break;
    }
};

AddUser.ScrollHelper = {
    documentVerticalScrollPosition: function() {
        if (self.pageYOffset) return self.pageYOffset; // Firefox, Chrome, Opera, Safari.
        if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop; // Internet Explorer 6 (standards mode).
        if (document.body.scrollTop) return document.body.scrollTop; // Internet Explorer 6, 7 and 8.
        return 0; // None of the above.
    },

    viewportHeight: function() {
        return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight;
    },

    documentHeight: function() {
        return (document.height !== undefined) ? document.height : document.body.offsetHeight;
    },

    documentMaximumScrollPosition: function() {
        return this.documentHeight() - this.viewportHeight();
    },

    elementVerticalClientPositionById: function(id) {
        return document.getElementById(id).getBoundingClientRect().top;
    },

    scrollVerticalToElementById: function(id) {
        if (document.getElementById(id) === null) {
            return;
        }
        $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight() + 100);
    }
};

AddUser.inputFocus = function() {
    document.body.addEventListener("keydown", AddUser.KeyboardEvent, false);
    AddUser.input.addEventListener('input');
    AddUser.input.addEventListener('compositionend');
    AddUser.input.focus();
};

AddUser.KeyboardEvent = function(event) {
    if (AddUser.loadingData) {
        event.preventDefault();
        return;
    }
    switch (event.keyCode) {
        case TvKeyCode.KEY_KEYBOARD_DELETE_ALL:
            document.getElementById("user_input").value = '';
            event.preventDefault();
            break;
        case TvKeyCode.KEY_KEYBOARD_DONE:
        case TvKeyCode.KEY_KEYBOARD_CANCEL:
            if ($('#user_input').val() !== '' && $('#user_input').val() !== null) {

                document.getElementById("user_input").value = $('#user_input').val();
                AddUser.Username = $('#user_input').val();

                if (!AddUser.UserExist(AddUser.Username)) {
                    AddUser.loadingDataTry = 1;
                    AddUser.loadingDataTimeout = 3500;
                    AddUser.loadingData = true;
                    Main.showLoadDialog();
                    AddUser.ScrollHelper.scrollVerticalToElementById('blank_focus');
                    AddUser.loadDataRequest();
                } else {
                    Main.HideLoadDialog();
                    Main.showWarningDialog(STR_USER + AddUser.Username + STR_USER_SET);
                    window.setTimeout(function() {
                        Main.HideWarningDialog();
                        AddUser.inputFocus();
                    }, 1500);
                }
            }
            AddUser.input.blur();
            document.body.removeEventListener("keydown", AddUser.KeyboardEvent);
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
};

AddUser.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(AddUser.Username) + '/follows/channels?limit=1&sortby=created_at', true);
        xmlHttp.timeout = AddUser.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        document.getElementById("user_input").value = '';
                        document.body.removeEventListener("keydown", AddUser.handleKeyDown);
                        AddUser.SaveNewUser();
                        return;
                    } catch (e) {}
                } else {
                    AddUser.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        AddUser.loadDataError();
    }
};

AddUser.loadDataError = function() {
    AddUser.loadingDataTry++;
    if (AddUser.loadingDataTry < AddUser.loadingDataTryMax) {
        AddUser.loadingDataTimeout += (AddUser.loadingDataTry < 5) ? 250 : 3500;
        AddUser.loadDataRequest();
    } else {
        AddUser.Username = null;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_USER_ERROR);
        window.setTimeout(function() {
            AddUser.init();
        }, 1000);
        AddUser.loadingData = false;
    }
};

AddUser.RestoreUsers = function() {
    AddUser.UsernameArray = [];
    AddUser.UsernameArraySize = parseInt(localStorage.getItem('UsernameArraySize')) || 0;
    if (AddUser.UsernameArraySize > 0) {
        for (var x = 0; x < AddUser.UsernameArraySize; x++) {
            AddUser.UsernameArray[x] = localStorage.getItem('UsernameArray' + x);
        }

        SmartHub.Start();
        window.addEventListener('appcontrol', SmartHub.EventListener, false);
        Main.SmartHubId = window.setInterval(SmartHub.Start, 600000);
        document.addEventListener('visibilitychange', Main.Resume, false);

    }

    // else {
    //AddUser.UsernameArray[0] = ''; // hardcoded user 1
    //AddUser.UsernameArraySize++;
    //AddUser.UsernameArray[1] = ''; // hardcoded user 2
    //AddUser.UsernameArraySize++;
    // }
};

AddUser.SaveNewUser = function() {
    AddUser.UsernameArray[AddUser.UsernameArraySize] = AddUser.Username;
    localStorage.setItem('UsernameArray' + AddUser.UsernameArraySize, AddUser.Username);
    AddUser.UsernameArraySize++;
    localStorage.setItem('UsernameArraySize', AddUser.UsernameArraySize);
    Users.status = false;
    Users.init();
    AddUser.loadingData = false;

    if (AddUser.UsernameArray.length === 1) {
        SmartHub.Start();

        window.clearInterval(Main.SmartHubId);
        document.removeEventListener('visibilitychange', Main.Resume);
        window.removeEventListener('appcontrol', SmartHub.EventListener);

        window.addEventListener('appcontrol', SmartHub.EventListener, false);
        Main.SmartHubId = window.setInterval(SmartHub.Start, 600000);
        document.addEventListener('visibilitychange', Main.Resume, false);
    }
};

AddUser.removeUser = function(Position) {
    AddUser.UsernameArraySize--;
    localStorage.setItem('UsernameArraySize', AddUser.UsernameArraySize);

    var index = AddUser.UsernameArray.indexOf(AddUser.UsernameArray[Position]);
    if (index > -1) {
        AddUser.UsernameArray.splice(index, 1);
    }

    for (var x = 0; x < AddUser.UsernameArray.length; x++) {
        localStorage.setItem('UsernameArray' + x, AddUser.UsernameArray[x]);
    }
    if (AddUser.UsernameArray.length > 0) {
        Users.status = false;
        Users.init();
        if (Position === 0) SmartHub.Start();
    } else AddUser.init();
};

AddUser.UserMakeOne = function(Position) {
    AddUser.Username = AddUser.UsernameArray[0];
    AddUser.UsernameArray[0] = AddUser.UsernameArray[Position];
    AddUser.UsernameArray[Position] = AddUser.Username;
    Users.status = false;
    Users.init();
    SmartHub.Start();
};

AddUser.UserExist = function(user) {
    return AddUser.UsernameArray.indexOf(user) != -1;
};

AddUser.IsUserSet = function() {
    return AddUser.UsernameArray.length > 0;
};

AddUser.ScrollHelper = {
    documentVerticalScrollPosition: function() {
        if (self.pageYOffset) return self.pageYOffset; // Firefox, Chrome, Opera, Safari.
        if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop; // Internet Explorer 6 (standards mode).
        if (document.body.scrollTop) return document.body.scrollTop; // Internet Explorer 6, 7 and 8.
        return 0; // None of the above.
    },

    viewportHeight: function() {
        return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight;
    },

    documentHeight: function() {
        return (document.height !== undefined) ? document.height : document.body.offsetHeight;
    },

    documentMaximumScrollPosition: function() {
        return this.documentHeight() - this.viewportHeight();
    },

    elementVerticalClientPositionById: function(id) {
        return document.getElementById(id).getBoundingClientRect().top;
    },

    scrollVerticalToElementById: function(id) {
        if (document.getElementById(id) === null) {
            return;
        }
        if (Main.Go === Main.AddUser) {
            $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight());
        } else return;
    }
};
