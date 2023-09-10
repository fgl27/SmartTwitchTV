var yOnwheel = 0;
var OnwheelId;
var OnClickId;
var OnDuploClick;

var player_embed;
var clip_player;
var clip_embed;
var player_embed_clicks;
var scene2_click;
var enable_embed;

var xDown;
var yDown;

function BrowserTestLoadScript(url) {
    var embed_script = document.createElement('script');
    embed_script.setAttribute('src', url);
    document.head.appendChild(embed_script);
}

function BrowserTestSetStrings() {
    if (!Main_IsOn_OSInterface) {
        Main_textContent('scene2_click_0_text_title', STR_GO_FULL);
        Main_textContent('scene2_click_1_text_title', STR_CHAT_SHOW);
        Main_textContent('scene2_click_2_text_title', STR_CHAT_POS);
        Main_textContent('scene2_click_3_text_title', STR_CHAT_SIZE);
        Main_textContent('scene2_click_4_text_title', STR_CHAT_SIDE);
        Main_innerHTML('button_full_screen_text', STR_GO_FULL + STR_BR + STR_GO_FULL_HELP);
        Main_textContent('feed_refresh_button_text_title', STR_REFRESH);

        Main_IconLoad('exit_player', 'icon-return', STR_CLICK_EXIT);
        Main_IconLoad('twitch-embed_exit', 'icon-return', STR_CLICK_EXIT);
    }
}

function BrowserTestFun() {
    if (Main_IsOn_OSInterface) {
        Main_RemoveElement(Main_getElementById('clip_embed'));
        Main_RemoveElement(Main_getElementById('player_embed_clicks'));
    } else {
        //This if is just for testing on a browser the code here is not ideal but works for testing

        BrowserTestLoadScript('https://embed.twitch.tv/embed/v1.js');
        BrowserTestSetStrings();

        //csss class from elem that need to show a mouse pointer
        Main_innerHTML(
            'pointer_css', //style elem
            //classes
            '.hist_name,' +
                '.settings_value_focus,' +
                '.right,' +
                '.left,' +
                '.feed_end_name,' +
                '.progress_bar_div,' +
                '.next_button,' +
                '.stream_cell_period,' +
                '.exit_player,' +
                '.side_panel_div,' +
                '.side_panel_feed_top,' +
                '.side_panel_movel_bottom_text,' +
                '.side_panel_new_icons_text_holder,' +
                '.side_panel_new_icons,' +
                '.streams_game_div,' +
                '.streams_div,' +
                '.show_pointer { cursor: pointer;}'
        );

        var sidepanel_Menus_hover = Main_getElementById('side_panel_movel'),
            controls_holder_hover = Main_getElementById('controls_holder'),
            progress_pause_holder_hover = Main_getElementById('progress_pause_holder'),
            sidepanel_elem_hide = Main_getElementById('screens_holder'),
            sidepanel_elem_show = Main_getElementById('side_panel_new_holder'),
            exit_player = Main_getElementById('exit_player');

        scene2_click = Main_getElementById('scene2_click');
        player_embed_clicks = Main_getElementById('player_embed_clicks');
        player_embed = Main_getElementById('twitch-embed');
        clip_player = Main_getElementById('clip_player');
        clip_embed = Main_getElementById('clip_embed');

        enable_embed = Settings_value.enable_embed.defaultValue;

        Main_RemoveClass('feed_refresh_button', 'hideimp');
        Main_ShowElementWithEle(exit_player);
        Main_ShowElement('button_full_screen');
        Main_Scene2Doc.style.backgroundColor = '#000000';

        Main_getElementById('twitch-embed_exit').onclick = function () {
            if (!enable_embed) {
                return;
            }

            Main_HideElementWithEle(scene2_click);
            BrowserTestStartPlayerShutDown();
        };

        scene2_click.onmousemove = function () {
            if (PlayClip_isOn || !enable_embed) return;

            BrowserTestShowEmbedClicks();
        };

        sidepanel_elem_show.onmousemove = function () {
            BrowserTest_Sidepanel_elem_show();
        };

        Main_getElementById('dialog_OffSet').onclick = function (event) {
            var id = event.target.id;

            //if (Main_A_includes_B(id, 'dialog_OffSet_left')) {
            //    Screens_OffSethandleKeyLeft(Main_values.Main_Go);
            //} else
            //if (Main_A_includes_B(id, 'dialog_OffSet_right')) {
            //    Screens_OffSethandleKeyRight(Main_values.Main_Go);
            //} else
            if (
                Main_A_includes_B(id, 'dialog_OffSet_val') ||
                Main_A_includes_B(id, 'dialog_OffSet_text') ||
                Main_A_includes_B(id, 'dialog_OffSet_text_summary')
            ) {
                var div = id;

                OnClickId = Main_setTimeout(
                    function () {
                        OnDuploClick = '';
                    },
                    500,
                    OnClickId
                );

                //if (Main_A_equals_B(OnDuploClick, div)) {
                //    Screens_OffSethandleKeyEnter(Main_values.Main_Go);
                //}

                OnDuploClick = div;
            }
            // else if (Main_A_includes_B(id, 'dialog_OffSet')) {
            //    Screens_OffSetDialogHide(Main_values.Main_Go);
            // }
        };

        var dialogHistory = Main_getElementById('dialog_hist_setting');
        dialogHistory.onmousemove = function (event) {
            var id = event.target.id;

            if (Main_A_includes_B(id, 'dialog_hist')) {
                var array = id.split('_'),
                    pos = parseInt(array[array.length - 1]);

                if (!isNaN(pos)) {
                    Screens_histRemoveFocus(ScreenObj[Main_values.Main_Go].histPosY, 'hist');
                    ScreenObj[Main_values.Main_Go].histPosY = pos;
                    Screens_histAddFocus(ScreenObj[Main_values.Main_Go].histPosY, Main_values.Main_Go);
                }
            }
        };

        dialogHistory.onclick = function (event) {
            var id = event.target.id,
                pos,
                array;

            if (Main_A_includes_B(id, 'dialog_hist_right')) {
                array = id.split('_');
                pos = parseInt(array[array.length - 1]);

                if (!isNaN(pos)) {
                    ScreenObj[Main_values.Main_Go].histPosY = pos;
                    Screens_histhandleKeyRight(Main_values.Main_Go);
                }
            } else if (Main_A_includes_B(id, 'dialog_hist_left')) {
                array = id.split('_');
                pos = parseInt(array[array.length - 1]);

                if (!isNaN(pos)) {
                    ScreenObj[Main_values.Main_Go].histPosY = pos;
                    Screens_histhandleKeyLeft(Main_values.Main_Go);
                }
            } else if (
                Main_A_includes_B(id, 'dialog_hist_val_') ||
                Main_A_includes_B(id, 'dialog_hist_setting_') ||
                Main_A_includes_B(id, 'dialog_hist_setting_name_') ||
                Main_A_includes_B(id, 'dialog_hist_setting_summary_3')
            ) {
                var div = id;

                OnClickId = Main_setTimeout(
                    function () {
                        OnDuploClick = '';
                    },
                    500,
                    OnClickId
                );

                if (Main_A_equals_B(OnDuploClick, div)) {
                    Screens_histDialogHide(true, Main_values.Main_Go);
                }

                OnDuploClick = div;
            } else if (Main_A_includes_B(id, 'dialog_hist_setting')) {
                Screens_histDialogHide(false, Main_values.Main_Go);
            }
        };

        var settings_holder = Main_getElementById('settings_holder');
        settings_holder.onmousemove = function (event) {
            if (!Settings_isVisible()) return;

            var id = event.target.id,
                array = id.split('_'),
                pos = -1,
                len = array.length - 1,
                i = 1,
                key = array[0];

            for (i; i < len; i++) {
                key += '_' + array[i];
            }

            pos = Settings_value_keys.indexOf(key);

            if (pos > -1) {
                Settings_RemoveinputFocus();
                Settings_cursorY = pos;
                Settings_inputFocus(Settings_cursorY);
            }
        };

        settings_holder.onclick = function (event) {
            if (!Settings_isVisible()) return;

            var id = event.target.id,
                array = id.split('_');

            if (array.length > 1) {
                var key = array[0] + '_' + array[1];

                if (Main_A_includes_B(id, 'left')) {
                    Settings_handleKeyLeft(key);
                } else if (Main_A_includes_B(id, 'right')) {
                    Settings_handleKeyRight(key);
                } else {
                    Settings_KeyEnter(true);
                }
            }
        };

        var dialog_codecs = Main_getElementById('dialog_codecs');
        dialog_codecs.onmousemove = function (event) {
            if (!Settings_isVisible()) return;

            var id = event.target.id,
                key = id.split('_')[0],
                elemArray = dialog_codecs.getElementsByClassName('settings_div_focus');

            if (elemArray.length) {
                var elem = elemArray[0].id.split('_')[0];
                Settings_RemoveinputFocusKey(elem);
            }

            if (Main_A_includes_B(id, '.')) Settings_CodecsUpDownAfter(key);
        };

        dialog_codecs.onclick = function (event) {
            if (!Settings_isVisible()) return;

            var id = event.target.id,
                i,
                len,
                key,
                right = Main_A_includes_B(id, 'right'),
                left = Main_A_includes_B(id, 'left');

            if (right || left) {
                i = 0;
                len = Settings_CodecsValue.length;
                key = id.split('_')[0];

                for (i; i < len; i++) {
                    if (Main_A_includes_B(Settings_CodecsValue[i].name, key)) {
                        Settings_CodecsPos = i;
                        break;
                    }
                }

                if (right) Settings_handleKeyDownCodecsRight();
                else Settings_handleKeyDownCodecsLeft();
            } else if (Main_A_includes_B(id, 'dialog_codecs')) {
                Settings_handleKeyDownReturn();
            }
        };

        var dialog_settings = Main_getElementById('dialog_settings');
        dialog_settings.onmousemove = function (event) {
            if (!Settings_isVisible()) return;

            var id = event.target.id,
                array = id.split('_'),
                len = array.length - 1,
                i = 1,
                pos = -1,
                key = array[0];

            for (i; i < len; i++) {
                key += '_' + array[i];
            }

            pos = Settings_DialogValue.indexOf(key);

            if (pos > -1) {
                Settings_RemoveinputFocusKey(Settings_DialogValue[Settings_DialogPos]);
                Settings_DialogPos = pos;
                Settings_DialogUpDownAfter();
            }
        };

        dialog_settings.onclick = function (event) {
            if (!Settings_isVisible()) return;

            var id = event.target.id;
            console.log(id);

            if (Main_A_includes_B(id, 'left')) {
                Settings_DialoghandleKeyLeft();
            } else if (Main_A_includes_B(id, 'right')) {
                Settings_DialoghandleKeyRight();
            } else if (Main_A_includes_B(id, 'dialog_settings')) {
                Settings_DialoghandleKeyReturn();
            } else if (Main_A_includes_B(id, 'thumb_background')) {
                Main_showWarningDialog(STR_SPECIAL_FEATURE, 2000);
            }
        };

        // settings_holder.onwheel = function(event) {
        //     if (!Settings_isVisible()) return;
        //     var y = event.deltaY > 0 ? 1 : -1;
        //     var doc = Main_getElementById('settings_scroll');

        //     if (y > 0 && !doc.scrollTop) {

        //         Settings_ScrollDown();

        //     } else if (y < 0 && doc.scrollTop) {

        //         Settings_ScrollUp();

        //     }

        // };

        var burn_in_protection = Main_getElementById('burn_in_protection');
        burn_in_protection.onmousemove = Play_screeOn;
        burn_in_protection.onclick = Play_screeOn;

        var dialogThumb = Main_getElementById('dialog_thumb_opt');
        dialogThumb.onmousemove = function (event) {
            var id = event.target.id;

            if (Main_A_includes_B(id, 'dialog_thumb')) {
                var array = id.split('_'),
                    pos = parseInt(array[array.length - 1]);

                if (!isNaN(pos)) {
                    Screens_histRemoveFocus(Screens_ThumbOptionPosY, 'thumb_opt');
                    Screens_ThumbOptionPosY = pos;
                    Screens_ThumbOptionAddFocus(Screens_ThumbOptionPosY);
                }
            }
        };

        dialogThumb.onclick = function (event) {
            var id = event.target.id,
                pos,
                array;

            if (Main_A_includes_B(id, 'dialog_thumb_opt_right')) {
                array = id.split('_');
                pos = parseInt(array[array.length - 1]);

                if (!isNaN(pos)) {
                    Screens_ThumbOptionPosY = pos;
                    Screens_ThumbOptionhandleKeyRight();
                }
            } else if (Main_A_includes_B(id, 'dialog_thumb_opt_left')) {
                array = id.split('_');
                pos = parseInt(array[array.length - 1]);

                if (!isNaN(pos)) {
                    Screens_ThumbOptionPosY = pos;
                    Screens_ThumbOptionhandleKeyLeft();
                }
            } else if (
                Main_A_includes_B(id, 'dialog_thumb_opt_val_') ||
                Main_A_includes_B(id, 'dialog_thumb_opt_setting_') ||
                Main_A_includes_B(id, 'dialog_thumb_opt_setting_name_')
            ) {
                var div = id;

                OnClickId = Main_setTimeout(
                    function () {
                        OnDuploClick = '';
                    },
                    500,
                    OnClickId
                );

                if (Main_A_equals_B(OnDuploClick, div)) {
                    Screens_ThumbOptionDialogKeyEnter(Main_values.Main_Go);
                }

                OnDuploClick = div;
            } else if (Main_A_includes_B(id, 'dialog_thumb_opt')) {
                Screens_ThumbOptionDialogHide(false, Main_values.Main_Go);
            }
        };

        progress_pause_holder_hover.onmousemove = function (event) {
            if (Main_isScene2DocVisible() && Play_isPanelShowing()) {
                var id = event.target.id;

                var PlayVodClip = getPlayVodClip();

                Play_Resetpanel(PlayVodClip);

                if (PlayClip_HasNext && Main_A_includes_B(id, 'next_button_')) {
                    PlayVod_PanelY = 1;
                    PlayClip_EnterPos = 1;
                    Play_BottonIconsFocus(null, null, true);
                } else if (PlayClip_HasBack && Main_A_includes_B(id, 'back_button_')) {
                    PlayVod_PanelY = 1;
                    PlayClip_EnterPos = -1;
                    Play_BottonIconsFocus(null, null, true);
                } else if (Main_A_includes_B(id, 'pause_button')) {
                    PlayVod_PanelY = 1;
                    PlayClip_EnterPos = 0;
                    Play_BottonIconsFocus();
                } else if (Main_A_includes_B(id, 'progress_bar')) {
                    PlayVod_PanelY = 1;
                    PlayClip_EnterPos = 0;
                    Play_BottonIconsFocus();
                }
            }
        };

        controls_holder_hover.onmousemove = function (event) {
            if (Main_isScene2DocVisible() && Play_isPanelShowing()) {
                var id = event.target.id;

                if (Main_A_includes_B(id, 'controls_button_')) {
                    var PlayVodClip = getPlayVodClip();

                    Play_Resetpanel(PlayVodClip);

                    var array = id.split('_');

                    if (PlayVod_PanelY !== 2) {
                        PlayVod_PanelY = 2;
                        Play_BottonIconsFocusClear();
                    }
                    var newPos = parseInt(array[array.length - 1]);
                    if (newPos !== Play_Panelcounter) {
                        Play_IconsRemoveFocus();
                        Play_Panelcounter = newPos;
                        Play_IconsAddFocus();
                    }
                }
            }
        };

        sidepanel_Menus_hover.onmousemove = function (event) {
            if (Sidepannel_isShowingMenus()) {
                var id = event.target.id;

                if (Main_A_includes_B(id, 'side_panel_movel_new_')) {
                    Sidepannel_RemoveFocusMain();
                    Sidepannel_Sidepannel_Pos = parseInt(id.split('_')[4]);
                    Sidepannel_AddFocusMain();
                }
            }
        };

        sidepanel_elem_hide.onmousemove = BrowserTest_Sidepanel_elem_hide;
        Main_getElementById('side_panel_feed_thumb').onmousemove = BrowserTest_Sidepanel_elem_hide;

        Main_getElementById('main_dialog_user').onmousemove = function (event) {
            var id = event.target.id;

            Users_setUserDialog();
            if (Main_A_includes_B(id, 'main_dialog_user_first') && Users_RemoveCursor) {
                Users_RemoveCursor = 0;
                Users_UserCursorSet();
            } else if (Main_A_includes_B(id, 'main_dialog_user_remove') && Users_RemoveCursor !== 2) {
                Users_RemoveCursor = 2;
                Users_UserCursorSet();
            }
        };

        Main_getElementById('yes_no_dialog').onmousemove = function (event) {
            var id = event.target.id;

            Users_setUserDialog();
            if (Main_A_includes_B(id, 'yes_no_dialog_button_no') && Users_RemoveCursor) {
                Users_RemoveCursor = 0;
                Users_RemoveCursorSet();
            } else if (Main_A_includes_B(id, 'yes_no_dialog_button_yes') && !Users_RemoveCursor) {
                Users_RemoveCursor = 1;
                Users_RemoveCursorSet();
            }
        };

        Main_Scene1Doc.onclick = function (event) {
            var id = event.target.id,
                div;

            //console.log(id);

            var idArray = id.split('_'),
                key = parseInt(idArray[0]),
                y = parseInt(idArray[2]),
                x = parseInt(idArray[3]);

            if (!isNaN(key)) {
                if (Screens_IsInUse(key)) {
                    var isChannelScreen = key === Main_ChannelContent,
                        isUserScrren = key === Main_Users;

                    div = y + '_' + x;

                    if (isChannelScreen) {
                        ChannelContent_removeFocus();
                        ChannelContent_cursorY = 0;
                        ChannelContent_keyUpDown();
                    } else if (isUserScrren) {
                        if (idArray.length < 4) return;

                        Users_removeFocus();
                        Users_cursorX = x;
                        Users_cursorY = y;
                        Users_addFocus();
                    } else if (ScreenObj[key].posY !== y || ScreenObj[key].posX !== x) {
                        Screens_RemoveFocus(key);
                        ScreenObj[key].posY = y;
                        Screens_ChangeFocus(0, x, key);
                        Screens_handleKeyUpAnimationFast();
                    }

                    OnClickId = Main_setTimeout(
                        function () {
                            OnDuploClick = '';
                        },
                        500,
                        OnClickId
                    );

                    if (Main_A_equals_B(OnDuploClick, div)) {
                        if (isChannelScreen) {
                            ChannelContent_keyEnter();
                        } else if (isUserScrren) {
                            Users_keyEnter();
                        } else {
                            ScreenObj[key].key_play(true);
                        }
                    }

                    OnDuploClick = div;
                } else if (Sidepannel_isShowingMenus()) {
                    Sidepannel_Hide();
                    Main_SwitchScreen();
                }
            } else if (Main_A_includes_B(id, 'main_dialog_user') || Main_A_includes_B(id, 'yes_no_dialog')) {
                if (Main_A_equals_B(id, 'main_dialog_user') || Main_A_equals_B(id, 'yes_no_dialog')) {
                    Users_handleKeyBack();
                } else if (Main_A_includes_B(id, 'main_dialog_user') || Main_A_includes_B(id, 'yes_no_dialog_button')) {
                    if (Main_values.Main_Go === Main_Users) {
                        Users_handleKeyEnter();
                    } else if (Settings_isVisible()) {
                        Settings_checkMatureKeyEnter();
                    } else {
                        Screens_histDeleteKeyEnter(Main_values.Main_Go);
                    }
                }
            } else if (Main_A_includes_B(id, 'dialog_period')) {
                if (idArray.length === 3) {
                    Screens_PeriodRemoveFocus(Screens_PeriodDialogPos);
                    Screens_PeriodDialogPos = parseInt(idArray[2]);
                    Screens_PeriodhandleKeyEnter(Main_values.Main_Go);
                } else {
                    Screens_PeriodRemoveFocus(Screens_PeriodDialogPos);
                    Screens_PeriodDialogHide(Main_values.Main_Go);
                }
            } else if (Main_A_includes_B(id, 'button_full_screen')) {
                requestFullScreen();
            } else if (Main_A_includes_B(id, 'label_refresh') || Main_A_includes_B(id, 'label_last_refresh')) {
                if (!Settings_isVisible()) Main_ReloadScreen();
            } else if (Main_A_includes_B(id, 'label_thumb')) {
                if (Settings_isVisible()) {
                    Settings_exit();
                    Main_SwitchScreen();
                } else if (ScreenObj[Main_values.Main_Go] && ScreenObj[Main_values.Main_Go].key_exit) {
                    if (
                        Main_values.Main_Go === Main_aGame ||
                        Main_values.Main_Go === Main_AGameVod ||
                        Main_values.Main_Go === Main_AGameClip ||
                        Main_values.Main_Go === Main_ChannelVod ||
                        Main_values.Main_Go === Main_ChannelClip
                    ) {
                        ScreenObj[Main_values.Main_Go].IsOpen = 0;
                        ScreenObj[Main_values.Main_Go].key_exit();
                    } else if (Screens_IsInUse(Main_values.Main_Go)) {
                        Screens_ThumbOptionStart(Main_values.Main_Go, true);
                    }
                    Screens_handleKeyUpIsClear = true;
                } else if (Main_values.Main_Go === Main_ChannelContent) {
                    ChannelContent_handleKeyBakc();
                } else if (Main_values.Main_Go === Main_addUser) {
                    AddUser_handleKeyBack();
                } else if (Main_values.Main_Go === Main_Users) {
                    Users_handleKeyBack();
                } else if (Main_isElementShowing('search_scroll')) {
                    Search_exit();
                    Main_SwitchScreen();
                } else if (Main_isElementShowing('password_scroll')) {
                    Password_exitWarning();
                }
            } else if (Sidepannel_isShowingMenus()) {
                if (Main_A_includes_B(id, 'side_panel_movel_new_') || Main_A_includes_B(id, 'icon_side_panel')) {
                    var sidepannel_pos = parseInt(idArray[4]);
                    Sidepannel_RemoveFocusMain();
                    Sidepannel_Sidepannel_Pos = sidepannel_pos;
                    if (sidepannel_pos === 2) Sidepannel_AddFocusMain();

                    Sidepannel_KeyEnter();
                } else if (Main_A_includes_B(id, 'side_panel_top_text_empty')) {
                    Sidepannel_MainKeyLeft();
                } else if (Main_A_includes_B(id, 'side_panel_back_main_menu')) {
                    Sidepannel_userLiveKeyRight();
                }
            } else if (Sidepannel_isShowingUserLive()) {
                if (Main_A_includes_B(id, 'side_panel_back_main_menu')) {
                    Sidepannel_userLiveKeyRight();
                } else if (Main_A_includes_B(id, 'side_panel_feed_refresh')) {
                    if (!UserLiveFeed_loadingData[UserLiveFeedobj_UserLivePos]) UserLiveFeed_RefreshLive();
                } else if (Main_A_includes_B(id, 'usf')) {
                    Sidepannel_RemoveFocusFeed();
                    Sidepannel_PosFeed = y;
                    Sidepannel_AddFocusLiveFeed();
                    Screens_handleKeyUpAnimationFast();

                    OnClickId = Main_setTimeout(
                        function () {
                            OnDuploClick = '';
                        },
                        500,
                        OnClickId
                    );

                    if (Main_A_equals_B(OnDuploClick, UserLiveFeedobj_UserLivePos)) {
                        Sidepannel_userLiveKeyEnter();
                    }

                    OnDuploClick = UserLiveFeedobj_UserLivePos;
                }
            } else if (Main_A_includes_B(id, 'channel_content')) {
                ChannelContent_removeFocus();
                ChannelContent_cursorY = 1;
                ChannelContent_cursorX = parseInt(idArray[3]);
                ChannelContent_keyUpDown();

                div = ChannelContent_cursorY + '_' + ChannelContent_cursorX;

                OnClickId = Main_setTimeout(
                    function () {
                        OnDuploClick = '';
                    },
                    500,
                    OnClickId
                );

                if (Main_A_equals_B(OnDuploClick, div)) {
                    ChannelContent_keyEnter();
                }

                OnDuploClick = div;
            } else if (Main_A_includes_B(id, 'chanel_button')) {
                Search_cursorY = 1;
                Search_cursorX = 0;
                Search_KeyEnter();
            } else if (Main_A_includes_B(id, 'game_button')) {
                Search_cursorY = 1;
                Search_cursorX = 1;
                Search_KeyEnter();
            } else if (Main_A_includes_B(id, 'live_button')) {
                Search_cursorY = 1;
                Search_cursorX = 2;
                Search_KeyEnter();
            } else if (Main_A_includes_B(id, 'password_view')) {
                Password_cursorY = 1;
                Password_cursorX = 2;
                Password_KeyEnter();
            } else if (Main_A_includes_B(id, 'password_save')) {
                Password_cursorY = 1;
                Password_cursorX = 2;
                Password_KeyEnter();
            } else Main_CheckDialogs();
        };

        Main_Scene1Doc.ontouchstart = function (event) {
            var firstTouch = event.touches[0];
            xDown = firstTouch.clientX;
            yDown = firstTouch.clientY;
        };
        Main_Scene2Doc.ontouchstart = Main_Scene1Doc.ontouchstart;

        Main_Scene1Doc.onwheel = function (event) {
            BrowserTest_Scene1DocOnwheel(event.deltaY > 0 ? 1 : -1);
        };

        Main_Scene1Doc.ontouchmove = function (event) {
            event.stopPropagation();
            var firstTouch = event.touches[0];

            var yUp = firstTouch.clientY;
            var xUp = firstTouch.clientX;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff < 0) {
                    BrowserTest_Sidepanel_elem_show();
                } else {
                    BrowserTest_Sidepanel_elem_hide();
                }
            } else {
                BrowserTest_Scene1DocOnwheel(yDiff > 0 ? 1 : -1);
            }
        };

        Main_Scene2Doc.onwheel = function (event) {
            BrowserTest_Scene2DocOnwheel(event.deltaY > 0 ? 1 : -1, event.target.id);
        };

        Main_Scene2Doc.ontouchmove = function (event) {
            event.stopPropagation();

            var firstTouch = event.touches[0];
            var yUp = firstTouch.clientY;
            var xUp = firstTouch.clientX;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                UserLiveFeed_KeyRightLeft(xDiff > 0 ? -1 : 1);
            } else {
                BrowserTest_Scene2DocOnwheel(yDiff > 0 ? -1 : 1, event.target.id);
            }
        };

        Main_Scene2Doc.onmousemove = function () {
            if (Main_isScene2DocVisible()) {
                if (!Play_isPanelShowing() && !UserLiveFeed_isPreviewShowing()) {
                    if (!enable_embed && Play_isOn) Play_showPanel();
                    else if (!enable_embed && PlayVod_isOn) PlayVod_showPanel(true);
                    else if (PlayClip_isOn) PlayClip_showPanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    BrowserTestShowEmbedClicks();
                }
            }
        };

        Main_Scene2Doc.onclick = function (event) {
            var id = event.target.id,
                div,
                idArray,
                pos,
                previewShowing = UserLiveFeed_isPreviewShowing();

            //console.log(id);

            if (Main_isScene2DocVisible()) {
                var PlayVodClip = getPlayVodClip();

                if (Main_A_includes_B(id, 'ulf_') && previewShowing) {
                    if (Play_isEndDialogVisible()) {
                        Play_EndFocus = true;
                        Play_EndDialogUpDown();
                    }

                    idArray = id.split('_');
                    var x = parseInt(idArray[2]),
                        y = parseInt(idArray[3]),
                        newY = y - UserLiveFeed_FeedPosY[x],
                        multiplier = newY / Math.abs(newY),
                        len = Math.abs(newY),
                        i = 0;

                    for (i; i < len; i++) {
                        UserLiveFeed_KeyRightLeft(multiplier);
                    }

                    div = y + '_' + x;

                    OnClickId = Main_setTimeout(
                        function () {
                            OnDuploClick = '';
                        },
                        500,
                        OnClickId
                    );

                    if (Main_A_equals_B(OnDuploClick, div)) {
                        if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].IsGame) {
                            UserLiveFeed_KeyEnter(UserLiveFeed_FeedPosX);
                        } else {
                            Play_OpenLiveFeedCheck();
                        }
                    }

                    OnDuploClick = div;
                } else if (Play_isControlsDialogVisible()) {
                    Play_HideControlsDialog();
                } else if (Main_A_includes_B(id, 'feed_refresh_button') && previewShowing) {
                    UserLiveFeed_FeedRefresh();
                } else if (Main_A_includes_B(id, 'scene2_click') && previewShowing) {
                    UserLiveFeed_Hide();
                } else if (Main_A_includes_B(id, 'feed_end_') && previewShowing) {
                    pos = parseInt(id.split('_')[2]) + 1;

                    if (isNaN(pos)) {
                        console.log('feed_end_ ' + pos + ' dsd ' + id.split('_'));
                        return;
                    }

                    if (pos > UserLiveFeedobj_UserGamesPos) {
                        pos++;
                    } else if (pos === UserLiveFeedobj_GamesPos) {
                        pos = UserLiveFeedobj_CurrentAGameEnable ? 0 : 1;
                    } else if (pos === UserLiveFeedobj_UserGamesPos) {
                        pos = UserLiveFeedobj_CurrentUserAGameEnable ? 8 : 7;
                    }

                    if (pos !== UserLiveFeedobj_AGamesPos || pos !== UserLiveFeedobj_UserAGamesPos) {
                        Main_AddClass('icon_feed_back', 'opacity_zero');
                    }

                    UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
                    UserLiveFeed_FeedPosX = pos;
                    UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();
                } else if (Main_A_includes_B(id, 'icon_feed_back') && previewShowing) {
                    UserLiveFeed_KeyEnter(UserLiveFeed_FeedPosX);
                } else if (Play_isEndDialogVisible()) {
                    if (!Play_EndFocus) {
                        Play_EndFocus = true;
                        UserLiveFeed_FeedRemoveFocus(UserLiveFeed_FeedPosX);
                        Play_EndIconsAddFocus();
                    } else {
                        idArray = id.split('_');

                        pos = parseInt(idArray[idArray.length - 1]);

                        if (isNaN(pos)) {
                            console.log('Main_Scene2Doc.onclick ' + pos);
                            return;
                        }

                        Play_EndIconsRemoveFocus();
                        Play_EndCounter = pos;
                        Play_EndIconsAddFocus();

                        div = pos;

                        OnClickId = Main_setTimeout(
                            function () {
                                OnDuploClick = '';
                            },
                            500,
                            OnClickId
                        );

                        if (Main_A_equals_B(OnDuploClick, div)) {
                            Play_EndDialogPressed(PlayVodClip);
                        }

                        OnDuploClick = div;
                    }
                } else if (!Play_isPanelShowing() && !previewShowing) {
                    // if (PlayVodClip === 1) Play_showPanel();
                    // else if (PlayVodClip === 2) PlayVod_showPanel(true);
                    // else
                    if (!enable_embed || PlayVodClip === 3) {
                        PlayClip_showPanel();
                    } else {
                        BrowserTestShowEmbedClicks();

                        if (Main_A_includes_B(id, 'scene2_click_0')) {
                            requestFullScreen();
                        } else if (Main_A_includes_B(id, 'scene2_click_1') && PlayVod_isOn) {
                            Play_controls[Play_controlsChat].enterKey(PlayVodClip);
                        } else if (Main_A_includes_B(id, 'scene2_click_2') && PlayVod_isOn) {
                            Play_controls[Play_controlsChatSide].enterKey(PlayVodClip);
                        } else if (Main_A_includes_B(id, 'scene2_click_3') && PlayVod_isOn) {
                            Play_controls[Play_controlsChatPos].updown(1);
                        } else if (Main_A_includes_B(id, 'scene2_click_4') && PlayVod_isOn) {
                            if (Play_controls[Play_controlsChatSize].defaultValue === 0) {
                                Play_controls[Play_controlsChatSize].defaultValue = Play_controls[Play_controlsChatSize].values.length;
                            }

                            Play_controls[Play_controlsChatSize].updown(-1);
                        }
                    }
                } else {
                    Play_Resetpanel(PlayVodClip);

                    if (Main_A_includes_B(id, 'exit_player')) {
                        BrowserTestStartPlayerShutDown();
                    } else if (Main_A_includes_B(id, 'controls_button_')) {
                        Play_BottomOptionsPressed(PlayVodClip);
                    } else if (Main_A_includes_B(id, 'pause_button')) {
                        OSInterface_PlayPauseChange(PlayVodClip);
                    } else if (Main_A_includes_B(id, 'next_button_') || Main_A_includes_B(id, 'back_button_')) {
                        PlayClip_Enter();
                    } else if (Main_A_includes_B(id, 'progress_bar_inner') && (PlayClip_isOn || PlayVod_isOn)) {
                        var duration = PlayClip_isOn ? clip_player.duration : Play_DurationSeconds;

                        try {
                            Chat_fakeClock = parseInt(duration * (event.offsetX / event.target.offsetWidth));
                            if (PlayClip_isOn) clip_player.currentTime = Chat_fakeClock;
                        } catch (e) {
                            console.log('Main_Scene2Doc.onclick e ' + e);
                        }

                        Play_ProgresBarrElm.style.transition = '';
                        PlayVod_ProgresBarrUpdateNoAnimation(Chat_fakeClock, duration, true);
                    }
                }
            }
        };

        Main_getElementById('dialog_about').onclick = function () {
            Main_CheckDialogs();
        };

        Main_getElementById('welcome_dialog').onclick = function () {
            Screens_handleKeyControlsEnter(Main_values.Main_Go);
        };

        Main_getElementById('update_dialog').onclick = function (event) {
            var id = event.target.id;

            if (Main_A_includes_B(id, 'update_dialog_upbutton')) {
                Main_UpdateCursor = 0;
                Main_UpdateDialogSet();
                Main_UpdateDialogKeyEnter();
            } else if (Main_A_includes_B(id, 'update_dialog_changebutton')) {
                Main_UpdateCursor = 1;
                Main_UpdateDialogSet();
                Main_UpdateDialogKeyEnter();
            } else {
                Main_HideUpdateDialog();
            }
        };
    }
}

function BrowserTestStartPlayerShutDown() {
    if (Play_isOn) {
        Play_CheckPreview();
        Play_shutdownStream();
    } else if (PlayVod_isOn) {
        PlayVod_CheckPreview();
        PlayVod_shutdownStream();
    } else if (PlayClip_isOn) {
        PlayClip_CheckPreview();
        Play_CleanHideExit();
        PlayClip_shutdownStream();
    }
}
var embedPlayer;

function BrowserTestSetPlayer(prop, value, prop2, value2, force_restart) {
    if (!embedPlayer || force_restart) {
        var obj = {
            width: embedWidth,
            height: embedheight,
            allowfullscreen: true,
            autoplay: false,
            layout: 'video-with-chat',
            muted: false,
            theme: 'dark'
        };

        if (prop) {
            obj[prop] = value;
        }

        if (prop2) {
            obj[prop2] = value2;
        }

        embedPlayer = new Twitch.Embed('twitch-embed', obj);
    }
    BrowserTestSetListners();
}

var BrowserTestStartPlayingId;
function BrowserTestStartPlaying() {
    Main_ShowElementWithEle(scene2_click);
    BrowserTestStartPlayingId = Main_setTimeout(
        function () {
            var player = embedPlayer.getPlayer();

            player.play();
            player.setMuted(false);
            BrowserTestStartSetQuality();

            Main_ShowElementWithEle(player_embed);
        },
        500,
        BrowserTestStartPlayingId
    );
}

var BrowserTestStartSetQualityId;
function BrowserTestStartSetQuality() {
    if (!Main_A_includes_B(Settings_Obj_values('default_quality'), STR_AUTO)) {
        BrowserTestStartSetQualityId = Main_setTimeout(
            function () {
                var player = embedPlayer.getPlayer(),
                    Qualities = player.getQualities();

                if (Qualities.length > 1) {
                    if (Qualities[1].group) player.setQuality(Qualities[1].group);
                } else {
                    BrowserTestStartSetQuality();
                }
            },
            50,
            BrowserTestStartSetQualityId
        );
    }
}

function BrowserTestStartVod(vodId, time) {
    Main_empty('twitch-embed');
    BrowserTestSetPlayer('video', vodId, 'time', time, true);
    Main_ShowElementWithEle(player_embed);

    BrowserTestStartPlaying();

    Main_ShowElement('scene2_click_1');
    Main_ShowElement('scene2_click_2');
    Main_ShowElement('scene2_click_3');
    Main_ShowElement('scene2_click_4');
}

function BrowserTestStartLive(channel) {
    BrowserTestSetPlayer('channel', channel);
    embedPlayer.setChannel(channel);
    BrowserTestStartPlaying();

    Main_HideElement('scene2_click_1');
    Main_HideElement('scene2_click_2');
    Main_HideElement('scene2_click_3');
    Main_HideElement('scene2_click_4');
}

function BrowserTestSetListners() {
    embedPlayer.addEventListener(Twitch.Embed.VIDEO_READY, function () {
        var player = embedPlayer.getPlayer();
        player.play();
        player.setMuted(false);
    });

    embedPlayer.addEventListener(Twitch.Embed.ENDED, function () {
        BrowserTestPlayerEnded(false);
    });
}

function BrowserTestPlayerEnded(skipEndStart) {
    if (embedPlayer) {
        var player = embedPlayer.getPlayer();

        //pause empty and restart the player with a not available vod
        player.pause();
        Main_empty('twitch-embed');
        BrowserTestSetPlayer('video', '0', 'time', '0h0m0s', true);
    }

    Main_HideElementWithEle(player_embed);
    Main_HideElementWithEle(scene2_click);
    if (!skipEndStart) Play_PannelEndStart(PlayVod_isOn ? 2 : 1);
}

function BrowserTestStartClip(url) {
    Main_ShowElementWithEle(clip_embed);
    Main_setTimeout(Play_HideBufferDialog, 100);
    clip_player.src = url;
    clip_player.onended = function () {
        Play_PlayEndStart(3);
    };
    clip_player.onerror = clip_player.onended;
}

function BrowserTestClipSpeed(speed) {
    if (PlayClip_isOn) {
        clip_player.playbackRate = speed;
    }
}

function BrowserTestStopClip() {
    clip_player.pause();
    clip_player.onended = noop_fun;
    clip_player.onerror = noop_fun;
    clip_player.src = '';
    Main_HideElementWithEle(clip_embed);
}
var BrowserTestVideoSizes = [0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6];

var embedWidth;
var embedheight;

function BrowserTestSetVideoSize() {
    if (!Main_IsOn_OSInterface) {
        var isFullSCreen = Play_isOn || Play_isFullScreen;

        var size = isFullSCreen ? 1 : BrowserTestVideoSizes[Play_FullScreenSize];

        embedWidth = scaledWidth * size;
        embedheight = currentHeight * size;

        if (!isFullSCreen && (enable_embed || PlayClip_isOn)) {
            Play_SetSceneBackground(null);
        }

        if (clip_player) {
            clip_player.width = embedWidth;
            clip_player.height = embedheight;

            clip_embed.style.marginTop = isFullSCreen ? 0 : 100 * ((1 - size) / 4) + '%';

            clip_embed.style.marginLeft = Play_FullScreenPosition ? 0 : 100 - size * 100 + '%';
        }

        if (player_embed) {
            player_embed.style.width = embedWidth + 'px';
            player_embed.style.height = embedheight + 'px';

            player_embed.style.marginTop = isFullSCreen ? 0 : 100 * ((1 - size) / 4) + '%';
            player_embed.style.marginLeft = Play_FullScreenPosition ? 0 : 100 - size * 100 + '%';

            var iFrame = player_embed.getElementsByTagName('iframe')[0];
            if (iFrame) {
                iFrame.width = embedWidth;
                iFrame.height = embedheight;
            }
        }
    }
}

function getPlayVodClip() {
    var PlayVodClip = 1;

    if (PlayVod_isOn) PlayVodClip = 2;
    else if (PlayClip_isOn) PlayVodClip = 3;

    return PlayVodClip;
}

function isFullScreen() {
    return (
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
}

function requestFullScreen() {
    if (typeof window.ActiveXObject !== 'undefined') {
        // Older IE.
        var wscript = new ActiveXObject('WScript.Shell');

        if (wscript !== null) {
            wscript.SendKeys('{F11}');
        }
    } else {
        var isInFullScreen = isFullScreen();

        var docElm = document.documentElement;
        if (!isInFullScreen) {
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
}

function BrowserTestShowEmbedClicks() {
    Main_ShowElementWithEle(player_embed_clicks);

    OnClickId = Main_setTimeout(
        function () {
            Main_HideElementWithEle(player_embed_clicks);
        },
        5000,
        OnClickId
    );
}

function BrowserTest_Scene2DocOnwheel(y, id) {
    if (Main_isScene2DocVisible()) {
        if (Main_A_includes_B(id, 'scene2') || Main_A_includes_B(id, 'clip_player') || Main_A_includes_B(id, 'scene_channel_panel')) {
            if (!yOnwheel && y < 0 && !UserLiveFeed_isPreviewShowing()) {
                PlayClip_hidePanel();
                UserLiveFeed_ShowFeed();
            } else if (!yOnwheel && y > 0 && UserLiveFeed_isPreviewShowing()) {
                UserLiveFeed_Hide();
            }
        } else if (!yOnwheel && Main_A_includes_B(id, 'ulf_') && UserLiveFeed_isPreviewShowing()) {
            UserLiveFeed_KeyRightLeft(y * -1);
        } else if (!yOnwheel && Main_A_includes_B(id, 'controls_button_') && Play_isPanelShowing()) {
            var PlayVodClip = getPlayVodClip();
            Play_Resetpanel(PlayVodClip);
            Play_BottomUpDown(PlayVodClip, y * -1);
        }

        OnwheelId = Main_setTimeout(
            function () {
                Screens_handleKeyUpAnimationFast();
                yOnwheel = 0;
            },
            Screens_ScrollAnimationTimeout * 1.5,
            OnwheelId
        );

        yOnwheel++;
        if (yOnwheel > 1) yOnwheel = 0;
    }

    /* reset values */
    xDown = null;
    yDown = null;
}

function BrowserTest_Scene1DocOnwheel(y) {
    var key = Main_values.Main_Go;

    if (!yOnwheel) {
        var isChannelScreen = key === Main_ChannelContent,
            isUserScrren = key === Main_Users;

        if (isChannelScreen || isUserScrren) {
            if (isUserScrren && Main_ThumbNull(Users_cursorY + y, Users_cursorX, Users_ids[0])) {
                Users_removeFocus();
                Users_cursorY += y;
                Users_addFocus();
            }
        } else if (Screens_IsInUse(key) && (y > 0 || ScreenObj[key].posY > 0)) {
            Screens_KeyUpDownClick(key, y);
        } else if (Sidepannel_isShowingUserLive() && Sidepannel_PosFeed + y > 0 && (y < 0 || Sidepannel_PosFeed + y < Sidepannel_GetSize())) {
            Sidepannel_RemoveFocusFeed();
            Sidepannel_PosFeed += y;
            Sidepannel_AddFocusLiveFeed();
        }
    }

    OnwheelId = Main_setTimeout(
        function () {
            Screens_handleKeyUpAnimationFast();
            yOnwheel = 0;
        },
        Screens_ScrollAnimationTimeout * 1.5,
        OnwheelId
    );

    yOnwheel++;
    if (yOnwheel > 3) yOnwheel = 0;

    /* reset values */
    xDown = null;
    yDown = null;
}

function BrowserTest_Sidepanel_elem_hide() {
    if (Sidepannel_isShowingMenus() || Sidepannel_isShowingUserLive()) {
        Sidepannel_Hide();
        Main_SwitchScreen();
    }
}

function BrowserTest_Sidepanel_elem_show() {
    var key = Main_values.Main_Go;

    if (Screens_IsInUse(key) && !Sidepannel_isShowingMenus()) {
        if (key === Main_ChannelContent) {
            ChannelContent_removeFocus();
            Sidepannel_Start(ChannelContent_handleKeyDown);
        } else if (key === Main_Users) {
            Users_removeFocus();
            Sidepannel_Start(Users_handleKeyDown);
        } else if (key === Main_addUser) {
            AddUser_exit();
            Main_SwitchScreen();
            Sidepannel_Start(Users_handleKeyDown);
        } else if (Main_isElementShowing('search_scroll')) {
            Search_exit();
            Main_SwitchScreen();
        } else if (Main_isElementShowing('password_scroll')) {
            Password_exitWarning();
        } else {
            Screens_OpenSidePanel(false, key);
        }
    }
}
