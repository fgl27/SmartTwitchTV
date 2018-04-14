/*jshint multistr: true */
//Variable initialization
function Search() {}
Search.cursorY = 0;
Search.cursorX = 0;
Search.status = false;
Search.data = '';
Search.keyBoardOn = false;
//Variable initialization end


Search.init = function() {
    Main.HideWarningDialog();
    Main.IconLoad('.label_refresh', 'icon-arrow-circle-left', STR_GOBACK);
    $('.label_search').html('');
    $('.label_switch').html('');
    $('.lable_live').html('');
    $('.lable_user').html(STR_SEARCH);
    $('.lable_game').html('');
    $('.label_placeholder_search').attr("placeholder", STR_PLACEHOLDER_SEARCH);
    document.getElementById("top_bar_spacing").style.paddingLeft = Main.TopSpacingSearchLable + "%";
    $('#top_bar_user').addClass('icon_center_focus');
    Search.cursorY = 0;
    Search.cursorX = 0;
    Search.input = document.querySelector('#search_input');
    Search.refreshInputFocusTools();
    Search.inputFocus();
    Search.ScrollHelper.scrollVerticalToElementById('search_input');
};

Search.exit = function() {
    Search.RemoveinputFocus();
    document.body.removeEventListener("keydown", Search.handleKeyDown);
    Search.refreshInputFocusTools();
    Main.Go = Main.BeforeSearch;
    Main.IconLoad('.label_refresh', 'icon-refresh', STR_REFRESH);
    Main.IconLoad('.label_search', 'icon-search', STR_SEARCH_KEY);
    Main.IconLoad('.label_switch', 'icon-switch', STR_SWITCH);
    $('#top_bar_user').removeClass('icon_center_focus');
    document.getElementById("top_bar_spacing").style.paddingLeft = Main.TopSpacingDefault + "%";
    $('.lable_live').html(STR_LIVE);
    $('.lable_user').html(STR_USER);
    $('.lable_game').html(STR_GAMES);
    document.getElementById("search_input").value = '';
};

Search.loadData = function() {
    Search.exit();
    if (!Search.cursorX) SChannels.init();
    else if (Search.cursorX == 1) SGames.init();
    else if (Search.cursorX == 2) SLive.init();
};

Search.refreshInputFocusTools = function() {
    $('#chanel_button').removeClass('button_search_focused');
    $('#game_button').removeClass('button_search_focused');
    $('#live_button').removeClass('button_search_focused');

    if (Search.cursorY) {
        if (!Search.cursorX) $('#chanel_button').addClass('button_search_focused');
        else if (Search.cursorX == 1) $('#game_button').addClass('button_search_focused');
        else if (Search.cursorX == 2) $('#live_button').addClass('button_search_focused');
    }
};

Search.handleKeyDown = function(event) {
    if (Search.keyBoardOn) return;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (Main.isAboutDialogShown()) Main.HideAboutDialog();
            else if (Main.isControlsDialogShown()) Main.HideControlsDialog();
            else {
                Search.exit();
                Main.SwitchScreen();
            }
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
            if (!Search.cursorY) {
                Search.RemoveinputFocus();
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
            Search.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Search.exit();
            Main.SwitchScreen();
            break;
        case TvKeyCode.KEY_PLAY:
        case TvKeyCode.KEY_PAUSE:
        case TvKeyCode.KEY_PLAYPAUSE:
        case TvKeyCode.KEY_ENTER:
            if (!Search.cursorY) Search.inputFocus();
            else {
                if ($('#search_input').val() !== '' && $('#search_input').val() !== null) {
                    Search.data = $('#search_input').val();
                    document.getElementById("search_input").value = '';
                    Search.loadData();
                } else {
                    Main.showWarningDialog(STR_SEARCH_EMPTY);
                    window.setTimeout(function() {
                        Main.HideWarningDialog();
                    }, 1000);
                }
            }
            break;
        case TvKeyCode.KEY_RED:
            Main.showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Search.exit();
            Main.GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            Main.showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
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
        window.scroll(0, this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.345 * this.viewportHeight() + 100);
    }
};

Search.inputFocus = function() {
    document.body.removeEventListener("keydown", Search.handleKeyDown);
    document.body.addEventListener("keydown", Search.KeyboardEvent, false);
    Search.input.addEventListener('input');
    Search.input.addEventListener('compositionend');
    $('.label_placeholder_search').attr("placeholder", STR_PLACEHOLDER_SEARCH);
    Search.input.focus();
    Search.keyBoardOn = true;
};

Search.RemoveinputFocus = function() {
    Search.input.blur();
    document.body.removeEventListener("keydown", Search.KeyboardEvent);
    document.body.addEventListener("keydown", Search.handleKeyDown, false);
    $('.label_placeholder_search').attr("placeholder", STR_PLACEHOLDER_PRESS + STR_PLACEHOLDER_SEARCH);
    window.setTimeout(function() {
        Search.keyBoardOn = false;
    }, 250);
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
            Search.RemoveinputFocus();
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
