//Variable initialization
var Search_cursorY = 0;
var Search_cursorX = 0;
var Search_keyBoardOn = false;
//Variable initialization end

function Search_init() {
    Main_HideWarningDialog();
    Main_IconLoad('label_refresh', 'icon-arrow-circle-left', STR_GOBACK);
    Main_textContent('top_bar_user', STR_SEARCH);
    document.getElementById("top_lables").style.marginLeft = '14%';
    document.getElementById('label_switch').style.display = 'none';
    document.getElementById('top_bar_live').style.display = 'none';
    document.getElementById('top_bar_featured').style.display = 'none';
    document.getElementById('top_bar_game').style.display = 'none';
    document.getElementById('top_bar_vod').style.display = 'none';
    document.getElementById('top_bar_clip').style.display = 'none';
    Main_SearchInput.placeholder = STR_PLACEHOLDER_SEARCH;
    Main_AddClass('top_bar_user', 'icon_center_focus');
    Main_ShowElement('search_scroll');
    Search_cursorY = 0;
    Search_cursorX = 0;
    Search_refreshInputFocusTools();
    Search_inputFocus();
}

function Search_exit() {
    Search_RemoveinputFocus(false);
    document.body.removeEventListener("keydown", Search_handleKeyDown);
    Search_refreshInputFocusTools();
    Main_values.Main_Go = Main_values.Main_BeforeSearch;
    document.getElementById("top_lables").style.marginLeft = '18.5%';
    Main_textContent('top_bar_user', STR_USER);
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    document.getElementById('label_switch').style.display = 'block';
    document.getElementById('top_bar_live').style.display = 'inline-block';
    document.getElementById('top_bar_featured').style.display = 'inline-block';
    document.getElementById('top_bar_game').style.display = 'inline-block';
    document.getElementById('top_bar_vod').style.display = 'inline-block';
    document.getElementById('top_bar_clip').style.display = 'inline-block';
    Main_SearchInput.value = '';
    Main_HideElement('search_scroll');
}

function Search_loadData() {
    Search_exit();
    if (!Search_cursorX) SearchChannels_init();
    else if (Search_cursorX === 1) SearchGames_init();
    else if (Search_cursorX === 2) SearchLive_init();
}

function Search_refreshInputFocusTools() {
    Main_RemoveClass('chanel_button', 'button_search_focused');
    Main_RemoveClass('game_button', 'button_search_focused');
    Main_RemoveClass('live_button', 'button_search_focused');

    if (Search_cursorY) {
        if (!Search_cursorX) Main_AddClass('chanel_button', 'button_search_focused');
        else if (Search_cursorX === 1) Main_AddClass('game_button', 'button_search_focused');
        else if (Search_cursorX === 2) Main_AddClass('live_button', 'button_search_focused');
    }
}

function Search_handleKeyDown(event) {
    if (Search_keyBoardOn) return;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
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
                Search_RemoveinputFocus(false);
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
                if (Main_SearchInput.value !== '' && Main_SearchInput.value !== null) {
                    Main_values.Search_data = Main_SearchInput.value;
                    Main_SearchInput.value = '';
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
            Main_SidePannelStart(Search_handleKeyDown);
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

function Search_inputFocus() {
    document.body.removeEventListener("keydown", Search_handleKeyDown);
    document.body.addEventListener("keydown", Search_KeyboardEvent, false);
    Main_SearchInput.placeholder = STR_PLACEHOLDER_SEARCH;
    Main_SearchInput.focus();
    Search_keyBoardOn = true;
}

function Search_RemoveinputFocus(EnaKeydown) {
    Main_SearchInput.blur();
    document.body.removeEventListener("keydown", Search_KeyboardEvent);
    Main_SearchInput.placeholder = STR_PLACEHOLDER_PRESS + STR_PLACEHOLDER_SEARCH;

    if (EnaKeydown) document.body.addEventListener("keydown", Search_handleKeyDown, false);
    window.setTimeout(function() {
        Search_keyBoardOn = false;
    }, 500);
}

function AddCode_removeEventListener() {
    if (Main_SearchInput !== null) {
        var elClone = Main_SearchInput.cloneNode(true);
        Main_SearchInput.parentNode.replaceChild(elClone, Main_SearchInput);
        Main_SearchInput = document.getElementById("search_input");
    }
}

function Search_KeyboardEvent(event) {
    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Search_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_KEYBOARD_DELETE_ALL:
            Main_SearchInput.value = '';
            break;
        case KEY_KEYBOARD_DONE:
        case KEY_KEYBOARD_CANCEL:
            Search_RemoveinputFocus(true);
            Search_cursorY = 1;
            Search_refreshInputFocusTools();
            break;
        case KEY_KEYBOARD_BACKSPACE:
            Main_SearchInput.value = Main_SearchInput.value.slice(0, -1);
            break;
        case KEY_KEYBOARD_SPACE:
            Main_SearchInput.value += ' ';
            break;
        default:
            break;
    }
}