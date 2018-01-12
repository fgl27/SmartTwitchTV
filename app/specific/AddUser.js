/*jshint multistr: true */
//Variable initialization
function AddUser() {}
AddUser.loadingDataTry = 1;
AddUser.loadingDataTryMax = 10;
AddUser.loadingDataTimeout = 3500;
//Variable initialization end

AddUser.init = function() {
    Main.Go = Main.AddUser;
    Main.HideWarningDialog();
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    AddUser.input = document.querySelector('#user_input');
    $('.label_placeholder_user').attr("placeholder", STR_PLACEHOLDER_USER);
    document.body.addEventListener("keydown", AddUser.handleKeyDown, false);
    AddUser.inputFocus();
    AddUser.ScrollHelper.scrollVerticalToElementById('user_input');
};

AddUser.exit = function() {
    $('#top_bar_user').removeClass('icon_center_focus');
    $('#top_bar_user').addClass('icon_center_label');
    document.body.removeEventListener("keydown", AddUser.handleKeyDown);
    AddUser.input.blur();
    document.body.removeEventListener('keydown', function(event) {
        AddUser.KeyboardEvent(event);
    });
    Main.SwitchScreen();
};

AddUser.handleKeyDown = function(event) {
    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            Main.Go = Main.Before;
            AddUser.exit();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            Main.Go = Main.Live;
            AddUser.exit();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = Main.Games;
            AddUser.exit();
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
    AddUser.input.addEventListener('input');
    AddUser.input.addEventListener('compositionend');

    document.body.addEventListener('keydown', function(event) {
        AddUser.KeyboardEvent(event);
    });

    AddUser.input.focus();
};

AddUser.KeyboardEvent = function(event) {
    switch (event.keyCode) {
        case TvKeyCode.KEY_KEYBOARD_DELETE_ALL:
            document.getElementById("user_input").value = '';
            event.preventDefault();
            break;
        case TvKeyCode.KEY_KEYBOARD_DONE:
        case TvKeyCode.KEY_KEYBOARD_CANCEL:
            if ($('#user_input').val() !== '' && $('#user_input').val() !== null) {
                document.getElementById("user_input").value = $('#user_input').val();
                Main.UserName = $('#user_input').val();
                AddUser.input.blur();
                AddUser.loadingDataTry = 1;
                AddUser.loadingDataTimeout = 3500;
                Main.showLoadDialog();
                AddUser.ScrollHelper.scrollVerticalToElementById('blank_focus');
                AddUser.loadDataRequest();
                break;
            }
            AddUser.input.blur();
            document.body.removeEventListener('keydown', function(event) {
                AddUser.KeyboardEvent(event);
            });
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

        var offset = AddUser.itemsCount + AddUser.itemsCountOffset;
        if (offset !== 0 && offset >= (AddUser.MaxOffset - AddUser.ItemsLimit)) {
            offset = AddUser.MaxOffset - AddUser.ItemsLimit;
            AddUser.dataEnded = true;
            AddUser.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(Main.UserName) + '/follows/channels?limit=1&sortby=created_at', true);
        xmlHttp.timeout = AddUser.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        document.getElementById("user_input").value = '';
                        localStorage.setItem('UserName', Main.UserName);
                        document.body.removeEventListener("keydown", AddUser.handleKeyDown);
                        Users.init();
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
        Main.UserName = null;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_USER_ERROR);
        window.setTimeout(function() {
            AddUser.init();
        }, 1000);
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
        if (Main.Go === Main.AddUser) {
            $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight());
        } else return;
    }
};

AddUser.removeUser = function() {
    Users.status = false;
    Main.UserName = null;
    AddUser.init();
};
