
var yOnwheel = 0;
var OnwheelId;
var OnClickId;
var OnDuploClick;

var player_embed;
var clip_player;
var exit_player_embed;

function BrowserTestFun() {
    if (!Main_IsOn_OSInterface) {
        //This if is just for testing on a browser the code here is not ideal but works for testing

        var embed_script = document.createElement('script');
        embed_script.setAttribute('src', 'https://embed.twitch.tv/embed/v1.js');
        document.head.appendChild(embed_script);

        var key = 0,
            sidepanel_Menus_hover = Main_getElementById('side_panel_movel'),
            controls_holder_hover = Main_getElementById('controls_holder'),
            progress_pause_holder_hover = Main_getElementById('progress_pause_holder'),
            sidepanel_elem_hide = Main_getElementById('screens_holder'),
            sidepanel_elem_show = Main_getElementById('side_panel_new_holder'),
            exit_player = Main_getElementById('exit_player');

        exit_player_embed = Main_getElementById('twitch-embed_exit');
        player_embed = Main_getElementById('twitch-embed');
        clip_player = Main_getElementById('clip_player');

        Main_RemoveClassWithEle(exit_player, 'hide');
        Main_IconLoad('exit_player', 'icon-return', STR_GOBACK);

        Main_IconLoad('twitch-embed_exit', 'icon-return', STR_GOBACK);

        exit_player_embed.onclick = function() {
            Main_AddClassWitEle(exit_player_embed, 'hide');
            if (Play_isOn) {
                Play_CheckPreview();
                Play_shutdownStream();
            }
            else if (PlayVod_isOn) {
                PlayVod_CheckPreview();
                PlayVod_shutdownStream();
            }
            else if (PlayClip_isOn) {
                PlayClip_CheckPreview();
                Play_CleanHideExit();
                PlayClip_shutdownStream();
            }

            Main_emptyWithEle(player_embed);
        };

        sidepanel_elem_show.onmouseover = function() {
            key = Main_values.Main_Go;
            if (Screens_IsInUse(key) && !Sidepannel_isShowingMenus()) {

                if (key === Main_ChannelContent) {
                    ChannelContent_removeFocus();
                    Sidepannel_Start(ChannelContent_handleKeyDown);
                } else {
                    Screens_OpenSidePanel(false, key);
                }

            }
        };

        progress_pause_holder_hover.onmouseover = function(event) {
            if (Main_isScene2DocVisible() && Play_isPanelShowing()) {

                var id = event.target.id;

                var PlayVodClip = 0;

                if (Play_isOn) PlayVodClip = 1;
                else if (PlayVod_isOn) PlayVodClip = 2;
                else if (PlayClip_isOn); PlayVodClip = 3;

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


        controls_holder_hover.onmouseover = function(event) {
            if (Main_isScene2DocVisible() && Play_isPanelShowing()) {

                var id = event.target.id;

                if (Main_A_includes_B(id, 'controls_button_')) {

                    var PlayVodClip = 0;

                    if (Play_isOn) PlayVodClip = 1;
                    else if (PlayVod_isOn) PlayVodClip = 2;
                    else if (PlayClip_isOn); PlayVodClip = 3;

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

        sidepanel_Menus_hover.onmouseover = function(event) {
            if (Sidepannel_isShowingMenus()) {

                var id = event.target.id;

                if (Main_A_includes_B(id, 'side_panel_movel_new_')) {
                    Sidepannel_RemoveFocusMain();
                    Sidepannel_Sidepannel_Pos = parseInt(id.split('_')[4]);
                    Sidepannel_AddFocusMain();
                }
            }
        };

        sidepanel_elem_hide.onmouseover = function() {
            if (Sidepannel_isShowingMenus() || Sidepannel_isShowingUserLive()) {
                Sidepannel_Hide();
                Main_SwitchScreen();
            }
        };
        Main_getElementById('side_panel_feed_thumb').onmouseover = sidepanel_elem_hide.onmouseover;

        window.onclick = function(event) {
            var id = event.target.id,
                div;

            //console.log(id);

            var idArray = id.split('_');

            var y = parseInt(idArray[2]),
                x = parseInt(idArray[3]);

            key = parseInt(idArray[0]);

            if (!isNaN(key)) {
                if (Screens_IsInUse(key)) {

                    var isChannelScreen = key === Main_ChannelContent;

                    div = y + '_' + x;

                    if (isChannelScreen) {
                        ChannelContent_removeFocus();
                        ChannelContent_cursorY = 0;
                        ChannelContent_keyUpDown();
                    } else if ((ScreenObj[key].posY !== y || ScreenObj[key].posX !== x)) {
                        Screens_RemoveFocus(key);
                        ScreenObj[key].posY = y;
                        Screens_ChangeFocus(0, x, key);
                        Screens_handleKeyUpAnimationFast();
                    }

                    OnClickId = Main_setTimeout(
                        function() {

                            OnDuploClick = '';

                        },
                        500,
                        OnClickId
                    );

                    if (Main_A_equals_B(OnDuploClick, div)) {

                        if (isChannelScreen) {
                            ChannelContent_keyEnter();
                        } else {
                            ScreenObj[key].key_play();
                        }

                    }

                    OnDuploClick = div;
                } else if (Sidepannel_isShowingMenus()) {

                    Sidepannel_Hide();
                    Main_SwitchScreen();

                }
            } else if (Main_isScene2DocVisible()) {

                var PlayVodClip = 0;

                if (Play_isOn) PlayVodClip = 1;
                else if (PlayVod_isOn) PlayVodClip = 2;
                else if (PlayClip_isOn) PlayVodClip = 3;

                if (!Play_isPanelShowing()) {

                    // if (PlayVodClip === 1) Play_showPanel();
                    // else if (PlayVodClip === 2) PlayVod_showPanel(true);
                    // else
                    if (PlayVodClip === 3) PlayClip_showPanel();

                } else {

                    Play_Resetpanel(PlayVodClip);

                    if (Main_A_includes_B(id, 'exit_player')) {
                        if (Play_isOn) {
                            Play_CheckPreview();
                            Play_shutdownStream();
                        }
                        else if (PlayVod_isOn) {
                            PlayVod_CheckPreview();
                            PlayVod_shutdownStream();
                        }
                        else if (PlayClip_isOn) {
                            PlayClip_CheckPreview();
                            Play_CleanHideExit();
                            PlayClip_shutdownStream();
                        }
                    } else if (Main_A_includes_B(id, 'controls_button_')) {
                        Play_BottomOptionsPressed(PlayVodClip);
                    } else if (Main_A_includes_B(id, 'pause_button')) {
                        OSInterface_PlayPauseChange(PlayVodClip);
                    } else if (Main_A_includes_B(id, 'next_button_') ||
                        Main_A_includes_B(id, 'back_button_')) {
                        PlayClip_Enter();
                    } else if (Main_A_includes_B(id, 'progress_bar_inner') && PlayClip_isOn) {
                        Chat_fakeClock = parseInt(clip_player.duration * (event.offsetX / event.target.offsetWidth));
                        clip_player.currentTime = Chat_fakeClock;

                        Play_ProgresBarrElm.style.transition = '';
                        PlayVod_ProgresBarrUpdateNoAnimation(Chat_fakeClock, clip_player.duration, true);
                    }

                }

            } else if (Sidepannel_isShowingMenus()) {

                if (Main_A_includes_B(id, 'side_panel_movel_new_')) {
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
                        function() {

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
                    function() {

                        OnDuploClick = '';

                    },
                    500,
                    OnClickId
                );

                if (Main_A_equals_B(OnDuploClick, div)) {
                    ChannelContent_keyEnter();
                }

                OnDuploClick = div;
            }
        };

        window.onwheel = function(event) {
            var y = event.deltaY > 0 ? 1 : -1;

            key = Main_values.Main_Go;
            if (!yOnwheel && Screens_IsInUse(key) && !Sidepannel_isShowingMenus() &&
                (y > 0 || ScreenObj[key].posY > 0)) {

                Screens_KeyUpDownClick(key, y);

            } else if (!yOnwheel && Sidepannel_isShowingUserLive() && (Sidepannel_PosFeed + y) > 0 &&
                (y < 0 || Sidepannel_PosFeed + y < (Sidepannel_GetSize()))) {

                Sidepannel_RemoveFocusFeed();
                Sidepannel_PosFeed += y;
                Sidepannel_AddFocusLiveFeed();

            }

            OnwheelId = Main_setTimeout(
                function() {

                    Screens_handleKeyUpAnimationFast();
                    yOnwheel = 0;

                },
                Screens_ScrollAnimationTimeout * 1.5,
                OnwheelId
            );

            yOnwheel++;
            if (yOnwheel > 3) yOnwheel = 0;
        };

    }
}