/*jshint multistr: true */
//Variable initialization
function Search() {}
Search.cursorY = 0;
Search.cursorX = 0;
Search.status = false;
Search.data = '';

//Variable initialization end


Search.init = function() {
    Main.HideWarningDialog();
    $('.label_refresh').html('<i class="fa fa-arrow-circle-left" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_GOBACK);
    $('.label_search').html('');
    $('.label_switch').html('');
    $('.lable_live').html('');
    $('.lable_user').html(STR_SEARCHS);
    $('.lable_game').html('');
    $('.label_placeholder_search').attr("placeholder", STR_PLACEHOLDER_SEARCH);
    document.getElementById("top_bar_spacing").style.paddingLeft = "40.5%";
    $('#top_bar_user').removeClass('icon_center_label');
    $('#top_bar_user').addClass('icon_center_focus');
    Search.cursorY = 0;
    Search.cursorX = 0;
    Search.input = document.querySelector('#search_input');
    Search.refreshInputFocusTools();
    document.body.addEventListener("keydown", Search.handleKeyDown, false);
    Search.inputFocus();
    Search.ScrollHelper.scrollVerticalToElementById('search_input');
};

Search.exit = function() {
    $('.label_refresh').html('<i class="fa fa-refresh" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_REFRESH);
    $('.label_search').html('<i class="fa fa-search" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_SEARCH);
    $('.label_switch').html('<i class="fa fa-exchange" style="color: #FFFFFF; font-size: 115%; aria-hidden="true"></i> ' + STR_SWITCH);
    $('#top_bar_user').removeClass('icon_center_focus');
    $('#top_bar_user').addClass('icon_center_label');
    document.getElementById("top_bar_spacing").style.paddingLeft = "30%";
    $('.lable_live').html(STR_LIVE);
    $('.lable_user').html(STR_USER);
    $('.lable_game').html(STR_GAMES);
    document.body.removeEventListener("keydown", Search.handleKeyDown);
    document.getElementById("search_input").value = '';
};

Search.exitMain = function() {
    Main.SwitchScreen();
};

Search.loadData = function() {
    Search.exit();
    if (Search.cursorX == 0) SChannels.init();
    else if (Search.cursorX == 1) SGames.init();
    else if (Search.cursorX == 2) SLive.init();
};

Search.refreshInputFocusTools = function() {
    $('#chanel_button').removeClass('button_search_focused');
    $('#game_button').removeClass('button_search_focused');
    $('#live_button').removeClass('button_search_focused');

    if (Search.cursorY === 0) {
        $('#chanel_button').addClass('button_search');
        $('#game_button').addClass('button_search');
        $('#live_button').addClass('button_search');
    } else {
        if (Search.cursorX == 0) $('#chanel_button').addClass('button_search_focused');
        else if (Search.cursorX == 1) $('#game_button').addClass('button_search_focused');
        else if (Search.cursorX == 2) $('#live_button').addClass('button_search_focused');
    }
};

Search.handleKeyDown = function(event) {
    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            Main.Go = Main.Before;
            Search.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_LEFT:
            if (Search.cursorY === 1) {
                Search.cursorX--;
                if (Search.cursorX < 0) Search.cursorX = 2;
                Search.refreshInputFocusTools();
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            if (Search.cursorY === 1) {
                Search.cursorX++;
                if (Search.cursorX > 2) Search.cursorX = 0;
                Search.refreshInputFocusTools();
            }
            break;
        case TvKeyCode.KEY_UP:
            if (Search.cursorY === 1) {
                Search.cursorY = 0;
                Search.refreshInputFocusTools();
                Search.inputFocus();
            }
            break;
        case TvKeyCode.KEY_DOWN:
            if (Search.cursorY === 0) {
                Search.input.blur();
                Search.cursorY = 1;
                Search.refreshInputFocusTools();
            } else if (Search.cursorY === 1) {
                Search.cursorY = 0;
                Search.refreshInputFocusTools();
                Search.inputFocus();
            }
            break;
        case TvKeyCode.KEY_INFO:
        case TvKeyCode.KEY_CHANNELGUIDE:
            break;
        case TvKeyCode.KEY_CHANNELUP:
            Main.Go = Main.Live;
            Search.exit();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Main.Go = Main.Live;
            Search.exit();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (Search.cursorY == 0) Search.inputFocus();
            else {
                if ($('#search_input').val() != '' && $('#search_input').val() != null) {
                    Search.data = $('#search_input').val();
                    document.getElementById("search_input").value = '';
                    Search.input.blur();
                    document.body.removeEventListener('keydown', function(event) {
                        Search.KeyboardEvent(event)
                    });
                    Search.loadData();
                }
            }
            break;
        case TvKeyCode.KEY_RED:
        case TvKeyCode.KEY_GREEN:
        case TvKeyCode.KEY_YELLOW:
        case TvKeyCode.KEY_BLUE:
        case TvKeyCode.KEY_VOLUMEUP:
        case TvKeyCode.KEY_VOLUMEDOWN:
        case TvKeyCode.KEY_MUTE:
            break;
        default:
            break;
    }
};

Search.ScrollHelper = {
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

Search.inputFocus = function() {
    Search.input.addEventListener('input');
    Search.input.addEventListener('compositionend');

    document.body.addEventListener('keydown', function(event) {
        Search.KeyboardEvent(event);
    });

    Search.input.focus();
};
Search.KeyboardEvent = function(event) {
    switch (event.keyCode) {
        case TvKeyCode.KEY_KEYBOARD_DELETE_ALL:
            document.getElementById("search_input").value = '';
            event.preventDefault();
            break;
        case TvKeyCode.KEY_KEYBOARD_DONE:
        case TvKeyCode.KEY_KEYBOARD_CANCEL:
            document.getElementById("search_input").value = $('#search_input').val();
            Search.input.blur();
            Search.cursorY = 1;
            Search.refreshInputFocusTools();
            break;
        case TvKeyCode.KEY_KEYBOARD_BACKSPACE:
            document.getElementById("search_input").value = $('#search_input').val().slice(0, -1);
            event.preventDefault();
            break;
        case TvKeyCode.KEY_KEYBOARD_SPACE:
            document.getElementById("search_input").value = $('#search_input').val() + ' ';
            event.preventDefault();
            break;
        default:
            break;
    }
};
