/*jshint multistr: true */
//Variable initialization
function User() {}
User.UserName = null;
//Variable initialization end

User.init = function() {
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
        case TvKeyCode.KEY_LEFT:
        case TvKeyCode.KEY_RIGHT:
        case TvKeyCode.KEY_UP:
        case TvKeyCode.KEY_DOWN:
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
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
            document.getElementById("user_input").value = $('#user_input').val();
            User.UserName = $('#user_input').val();
            document.getElementById("user_input").value = '';
            User.input.blur();
            Users.init();
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
