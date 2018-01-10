/*jshint multistr: true */
//Variable initialization
function User() {}
User.UserName = 'fglfgl27';
User.loadingDataTry = 1;
User.loadingDataTryMax = 10;
User.loadingDataTimeout = 3500;
//Variable initialization end

User.init = function() {
    Main.HideWarningDialog();
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    User.input = document.querySelector('#user_input');
    $('.label_placeholder_user').attr("placeholder", STR_PLACEHOLDER_USER);
    document.body.addEventListener("keydown", User.handleKeyDown, false);
    User.inputFocus();
    User.ScrollHelper.scrollVerticalToElementById('user_input');
};

User.exit = function() {
    $('#top_bar_user').removeClass('icon_center_focus');
    $('#top_bar_user').addClass('icon_center_label');
    document.body.removeEventListener("keydown", User.handleKeyDown);
    Main.SwitchScreen();
};

User.handleKeyDown = function(event) {
    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            Main.Go = Main.Before;
            User.exit();
            break;
        case TvKeyCode.KEY_CHANNELUP:
            Main.Go = Main.Live;
            User.exit();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = Main.Games;
            User.exit();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            User.inputFocus();
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
            break;
        default:
            break;
    }
};

User.ScrollHelper = {
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

User.inputFocus = function() {
    User.input.addEventListener('input');
    User.input.addEventListener('compositionend');

    document.body.addEventListener('keydown', function(event) {
        User.KeyboardEvent(event);
    });

    User.input.focus();
};

User.KeyboardEvent = function(event) {
    switch (event.keyCode) {
        case TvKeyCode.KEY_KEYBOARD_DELETE_ALL:
            document.getElementById("user_input").value = '';
            event.preventDefault();
            break;
        case TvKeyCode.KEY_KEYBOARD_DONE:
        case TvKeyCode.KEY_KEYBOARD_CANCEL:
            if ($('#user_input').val() != '' && $('#user_input').val() != null) {
                document.getElementById("user_input").value = $('#user_input').val();
                User.UserName = $('#user_input').val();
                User.input.blur();
                User.loadingDataTry = 1;
                User.loadingDataTimeout = 3500;
                Main.showLoadDialog();
                User.ScrollHelper.scrollVerticalToElementById('blank_focus');
                User.loadDataRequest();
                break;
            }
            User.input.blur();
            document.body.removeEventListener('keydown', function(event) {
                User.KeyboardEvent(event)
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

User.loadDataRequest = function() {
    try {

        var xmlHttp = new XMLHttpRequest();

        var offset = User.itemsCount + User.itemsCountOffset;
        if (offset !== 0 && offset >= (User.MaxOffset - User.ItemsLimit)) {
            offset = User.MaxOffset - User.ItemsLimit;
            User.dataEnded = true;
            User.ReplacedataEnded = true;
        }

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/users/' + encodeURIComponent(User.UserName) + '/follows/channels?limit=1&sortby=created_at', true);
        xmlHttp.timeout = User.loadingDataTimeout;
        xmlHttp.setRequestHeader('Client-ID', 'ypvnuqrh98wqz1sr0ov3fgfu4jh1yx');
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        document.getElementById("user_input").value = '';
                        document.body.removeEventListener("keydown", User.handleKeyDown);
                        Users.init();
                        return;
                    } catch (e) {}
                } else {
                    User.loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        User.loadDataError();
    }
};

User.loadDataError = function() {
    User.loadingDataTry++;
    if (User.loadingDataTry < User.loadingDataTryMax) {
        User.loadingDataTimeout += (User.loadingDataTry < 5) ? 250 : 3500;
        User.loadDataRequest();
    } else {
        User.UserName = null;
        Main.HideLoadDialog();
        Main.showWarningDialog(STR_USER_ERROR);
        window.setTimeout(function() {
            User.init();
        }, 1000);
    }
};

User.ScrollHelper = {
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
        if (Main.Go === Main.User) {
            $(window).scrollTop(this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight());
        } else return;
    }
};
