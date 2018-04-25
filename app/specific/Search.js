//Variable initialization
var Search_cursorY = 0;
var Search_cursorX = 0;
var Search_data = '';
var Search_keyBoardOn = false;
var Search_input = '';
//Variable initialization end

function Search_init() {
    Main_HideWarningDialog();
    Main_IconLoad('label_refresh', 'icon-arrow-circle-left', STR_GOBACK);
    document.getElementById('label_search').innerHTML = '';
    document.getElementById('label_switch').innerHTML = '';
    document.getElementById('top_bar_live').innerHTML = '';
    document.getElementById('top_bar_user').innerHTML = STR_SEARCH;
    document.getElementById('top_bar_game').innerHTML = '';
    document.getElementById("search_input").placeholder = STR_PLACEHOLDER_SEARCH;
    document.getElementById('top_bar_user').classList.add('icon_center_focus');
    Search_cursorY = 0;
    Search_cursorX = 0;
    Search_input = document.querySelector('#search_input');
    Search_refreshInputFocusTools();
    Search_inputFocus();
    Search_scrollVerticalToElementById('search_input');
}

function Search_exit() {
    Search_RemoveinputFocus();
    document.body.removeEventListener("keydown", Search_handleKeyDown);
    Search_refreshInputFocusTools();
    Main_Go = Main_BeforeSearch;
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH);
    Main_IconLoad('label_search', 'icon-search', STR_SEARCH_KEY);
    Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
    document.getElementById('top_bar_user').classList.remove('icon_center_focus');
    document.getElementById('top_bar_live').innerHTML = STR_LIVE;
    document.getElementById('top_bar_user').innerHTML = STR_USER;
    document.getElementById('top_bar_game').innerHTML = STR_GAMES;
    document.getElementById("search_input").value = '';
}

function Search_loadData() {
    Search_exit();
    if (!Search_cursorX) SChannels_init();
    else if (Search_cursorX === 1) SGames_init();
    else if (Search_cursorX === 2) SLive_init();
}

function Search_refreshInputFocusTools() {
    document.getElementById('chanel_button').classList.remove('button_search_focused');
    document.getElementById('game_button').classList.remove('button_search_focused');
    document.getElementById('live_button').classList.remove('button_search_focused');
    document.getElementById("search_input").value = $('#search_input').val();

    if (Search_cursorY) {
        if (!Search_cursorX) document.getElementById('chanel_button').classList.add('button_search_focused');
        else if (Search_cursorX === 1) document.getElementById('game_button').classList.add('button_search_focused');
        else if (Search_cursorX === 2) document.getElementById('live_button').classList.add('button_search_focused');
    }
}

function Search_handleKeyDown(event) {
    if (Search_keyBoardOn) return;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Search_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (Search_cursorY === 1) {
                Search_cursorX--;
                if (Search_cursorX < 0) Search_cursorX = 2;
                Search_refreshInputFocusTools();
            }
            break;
        case KEY_RIGHT:
            if (Search_cursorY === 1) {
                Search_cursorX++;
                if (Search_cursorX > 2) Search_cursorX = 0;
                Search_refreshInputFocusTools();
            }
            break;
        case KEY_UP:
            if (Search_cursorY === 1) {
                Search_cursorY = 0;
                Search_refreshInputFocusTools();
                Search_inputFocus();
            }
            break;
        case KEY_DOWN:
            if (!Search_cursorY) {
                Search_RemoveinputFocus();
                Search_cursorY = 1;
                Search_refreshInputFocusTools();
            } else if (Search_cursorY === 1) {
                Search_cursorY = 0;
                Search_refreshInputFocusTools();
                Search_inputFocus();
            }
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            break;
        case KEY_CHANNELUP:
            Search_exit();
            Main_SwitchScreen();
            break;
        case KEY_CHANNELDOWN:
            Search_exit();
            Main_SwitchScreen();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            if (!Search_cursorY) Search_inputFocus();
            else {
                if ($('#search_input').val() !== '' && $('#search_input').val() !== null) {
                    Search_data = $('#search_input').val();
                    document.getElementById("search_input").value = '';
                    Search_loadData();
                } else {
                    Main_showWarningDialog(STR_SEARCH_EMPTY);
                    window.setTimeout(function() {
                        Main_HideWarningDialog();
                    }, 1000);
                }
            }
            break;
        case KEY_RED:
            Main_showAboutDialog();
            break;
        case KEY_GREEN:
            Search_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            break;
        default:
            break;
    }
}

function Search_scrollVerticalToElementById(id) {
    window.scroll(0, Main_documentVerticalScrollPosition() + Main_elementVerticalClientPositionById(id) - Main_ScrollOffSetMinusVideo + Main_ScrollOffSetMinusSearch);
}

function Search_inputFocus() {
    document.body.removeEventListener("keydown", Search_handleKeyDown);
    document.body.addEventListener("keydown", Search_KeyboardEvent, false);
    Search_input.addEventListener('input');
    Search_input.addEventListener('compositionend');
    document.getElementById("search_input").placeholder = STR_PLACEHOLDER_SEARCH;
    Search_input.focus();
    Search_keyBoardOn = true;
}

function Search_RemoveinputFocus() {
    Search_input.blur();
    document.body.removeEventListener("keydown", Search_KeyboardEvent);
    document.body.addEventListener("keydown", Search_handleKeyDown, false);
    document.getElementById("search_input").placeholder = STR_PLACEHOLDER_PRESS + STR_PLACEHOLDER_SEARCH;
    window.setTimeout(function() {
        Search_keyBoardOn = false;
    }, 500);
}

function Search_KeyboardEvent(event) {
    switch (event.keyCode) {
        case KEY_KEYBOARD_DELETE_ALL:
            document.getElementById("search_input").value = '';
            event.preventDefault();
            break;
        case KEY_KEYBOARD_DONE:
        case KEY_KEYBOARD_CANCEL:
            document.getElementById("search_input").value = $('#search_input').val();
            Search_RemoveinputFocus();
            Search_cursorY = 1;
            Search_refreshInputFocusTools();
            break;
        case KEY_KEYBOARD_BACKSPACE:
            document.getElementById("search_input").value = $('#search_input').val().slice(0, -1);
            event.preventDefault();
            break;
        case KEY_KEYBOARD_SPACE:
            document.getElementById("search_input").value = $('#search_input').val() + ' ';
            event.preventDefault();
            break;
        default:
            break;
    }
}