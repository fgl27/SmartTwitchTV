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
    main_HideWarningDialog();
    main_IconLoad('label_refresh', 'icon-arrow-circle-left', STR_GOBACK);
    document.getElementById('label_search').innerHTML = '';
    document.getElementById('label_switch').innerHTML = '';
    document.getElementById('top_bar_live').innerHTML = '';
    document.getElementById('top_bar_user').innerHTML = STR_SEARCH;
    document.getElementById('top_bar_game').innerHTML = '';
    document.getElementById("search_input").placeholder = STR_PLACEHOLDER_SEARCH;
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    Search.cursorY = 0;
    Search.cursorX = 0;
    Search.input = document.querySelector('#search_input');
    Search.refreshInputFocusTools();
    Search.inputFocus();
    Search.scrollVerticalToElementById('search_input');
};

Search.exit = function() {
    Search.RemoveinputFocus();
    document.body.removeEventListener("keydown", Search.handleKeyDown);
    Search.refreshInputFocusTools();
    main_Go = main_BeforeSearch;
    main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH);
    main_IconLoad('label_search', 'icon-search', STR_SEARCH_KEY);
    main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.getElementById('top_bar_live').innerHTML = STR_LIVE;
    document.getElementById('top_bar_user').innerHTML = STR_USER;
    document.getElementById('top_bar_game').innerHTML = STR_GAMES;
    document.getElementById("search_input").value = '';
};

Search.loadData = function() {
    Search.exit();
    if (!Search.cursorX) SChannels.init();
    else if (Search.cursorX === 1) sgames_init();
    else if (Search.cursorX === 2) SLive_init();
};

Search.refreshInputFocusTools = function() {
    document.getElementById('chanel_button').classList.remove('button_search_focused');
    document.getElementById('game_button').classList.remove('button_search_focused');
    document.getElementById('live_button').classList.remove('button_search_focused');

    if (Search.cursorY) {
        if (!Search.cursorX) document.getElementById('chanel_button').classList.add('button_search_focused');
        else if (Search.cursorX === 1) document.getElementById('game_button').classList.add('button_search_focused');
        else if (Search.cursorX === 2) document.getElementById('live_button').classList.add('button_search_focused');
    }
};

Search.handleKeyDown = function(event) {
    if (Search.keyBoardOn) return;

    switch (event.keyCode) {
        case TvKeyCode.KEY_RETURN:
            if (main_isAboutDialogShown()) main_HideAboutDialog();
            else if (main_isControlsDialogShown()) main_HideControlsDialog();
            else {
                Search.exit();
                main_SwitchScreen();
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
            main_SwitchScreen();
            break;
        case TvKeyCode.KEY_CHANNELDOWN:
            Search.exit();
            main_SwitchScreen();
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
                    main_showWarningDialog(STR_SEARCH_EMPTY);
                    window.setTimeout(function() {
                        main_HideWarningDialog();
                    }, 1000);
                }
            }
            break;
        case TvKeyCode.KEY_RED:
            main_showAboutDialog();
            break;
        case TvKeyCode.KEY_GREEN:
            Search.exit();
            main_GoLive();
            break;
        case TvKeyCode.KEY_YELLOW:
            main_showControlsDialog();
            break;
        case TvKeyCode.KEY_BLUE:
            break;
        default:
            break;
    }
};

Search.scrollVerticalToElementById = function(id) {
    window.scroll(0, main_documentVerticalScrollPosition() + main_elementVerticalClientPositionById(id) - main_ScrollOffSetMinusVideo + main_ScrollOffSetMinusSearch);
};

Search.inputFocus = function() {
    document.body.removeEventListener("keydown", Search.handleKeyDown);
    document.body.addEventListener("keydown", Search.KeyboardEvent, false);
    Search.input.addEventListener('input');
    Search.input.addEventListener('compositionend');
    document.getElementById("search_input").placeholder = STR_PLACEHOLDER_SEARCH;
    Search.input.focus();
    Search.keyBoardOn = true;
};

Search.RemoveinputFocus = function() {
    Search.input.blur();
    document.body.removeEventListener("keydown", Search.KeyboardEvent);
    document.body.addEventListener("keydown", Search.handleKeyDown, false);
    document.getElementById("search_input").placeholder = STR_PLACEHOLDER_PRESS + STR_PLACEHOLDER_SEARCH;
    window.setTimeout(function() {
        Search.keyBoardOn = false;
    }, 500);
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
