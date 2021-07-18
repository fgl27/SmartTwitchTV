/*
 * Copyright (c) 2017-2020 Felipe de Leon <fglfgl27@gmail.com>
 *
 * This file is part of SmartTwitchTV <https://github.com/fgl27/SmartTwitchTV>
 *
 * SmartTwitchTV is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SmartTwitchTV is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SmartTwitchTV.  If not, see <https://github.com/fgl27/SmartTwitchTV/blob/master/LICENSE>.
 *
 */

//Spacing for release maker not trow errors from jshint
var Main_ItemsLimitMax = 100;

//The values of thumbnail and related for it screen type
var Main_ReloadLimitOffsetGames = 1.35;
var Main_ReloadLimitOffsetVideos = 1.5;

var Main_ItemsLimitVideo = 45;
var Main_ColoumnsCountVideo = 3;
var Main_ItemsReloadLimitVideo = Math.floor((Main_ItemsLimitVideo / Main_ColoumnsCountVideo) / Main_ReloadLimitOffsetVideos);

var Main_ItemsLimitGame = 45;
var Main_ColoumnsCountGame = 5;
var Main_ItemsReloadLimitGame = Math.floor((Main_ItemsLimitGame / Main_ColoumnsCountGame) / Main_ReloadLimitOffsetGames);

var Main_ItemsLimitChannel = 48;
var Main_ColoumnsCountChannel = 6;
var Main_ItemsReloadLimitChannel = Math.floor((Main_ItemsLimitChannel / Main_ColoumnsCountChannel) / Main_ReloadLimitOffsetVideos);

var ChannelClip_game = '';
var ChannelClip_views = '';
var ChannelClip_title = '';
var ChannelClip_playUrl = '';
var ChannelClip_createdAt = '';
var ChannelClip_language = '';
var ChannelClip_Id = 0;

var ChannelVod_vodOffset = 0;
var ChannelVod_language = '';
var ChannelVod_createdAt = '';
var ChannelVod_views = '';
var ChannelVod_title = '';
var ChannelVod_game = '';

var DefaultPreviewDelay = 200;//To avoid multiple simultaneous request
var DefaultHttpGetTimeout = 30000;
var noop_fun = function() { };
var ScreensObj_banner_added_section = false;

var Base_obj;
var Base_Vod_obj;
var Base_Live_obj;
var Base_Clip_obj;
var Base_Game_obj;
var Base_Channel_obj;
var Base_History_obj;

function ScreensObj_StartAllVars() {

    Base_obj = {
        posX: 0,
        posY: -1,
        currY: 0,
        row_id: 0,
        offsettopFontsize: 0,
        offsettop: 0,
        coloumn_id: 0,
        dataEnded: false,
        idObject: {},
        loadingData: false,
        itemsCount: 0,
        MaxOffset: 0,
        offset: 0,
        visiblerows: 3,
        status: false,
        FirstRunEnd: false,
        emptyContent: true,
        itemsCountCheck: false,
        isRefreshing: false,
        Headers: Main_Headers,
        empty_str: STR_NO_CONTENT,
        data: null,
        token: null,
        data_cursor: 0,
        lastRefresh: 0,
        PreviewEnable: 0,
        DataObj: {},
        tempHtml: '',
        focusPos: '',
        IsOpen: 0,
        Lang: '',
        BannerTime: 0,
        SetPreviewEnable: function() {
            this.PreviewEnable =
                (this.screenType === 0 && Settings_Obj_default('show_live_player')) ||
                (this.screenType === 1 && Settings_Obj_default('show_vod_player')) ||
                (this.screenType === 2 && Settings_Obj_default('show_clip_player'));
        },
        AutoRefreshId: null,
        key_fun_start: function() {
            return Screens_handleKeyDown.bind(null, this.screen);
        },
        exit_fun: function() {
            Screens_exit(this.screen);
        },
        init_fun: function(preventRefresh) {
            Screens_init(this.screen, preventRefresh);
        },
        start_fun: function() {
            Screens_StartLoad(this.screen);
        },
        loadDataSuccess: function() {
            Screens_loadDataSuccess(this.screen);
        },
        Set_Scroll: function() {
            this.ScrollDoc = Main_getElementById(this.ids[4]);
            this.tableDoc = Main_getElementById(this.table);
        },
        addrow: Screens_addrow,
        key_exit: function(goSidepanel) {//TODO overwrite this on if object
            Screens_RemoveAllFocus(this.screen);

            if ((this.screen === Main_aGame) && !goSidepanel) {

                if (Main_values.Games_return) {

                    Main_values.Main_Go = Main_SearchGames;
                    Main_values.Main_gameSelected = Main_values.gameSelectedOld;
                    Main_values.gameSelectedOld = null;

                } else {

                    Main_values.Main_Go = Main_values.Main_BeforeAgame;
                    Main_values.Main_BeforeAgame = Main_games;

                }

                Screens_BasicExit(Main_values.Main_Go, this.screen);
                Main_SwitchScreen();

            } else if ((this.screen === Main_SearchLive || this.screen === Main_SearchGames ||
                this.screen === Main_SearchChannels) && !goSidepanel) {

                if (Main_values.Main_Go === Main_values.Main_BeforeSearch) Main_values.Main_Go = Main_Live;
                else Main_values.Main_Go = Main_values.Main_BeforeSearch;
                Main_values.Search_isSearching = false;
                Screens_BasicExit(Main_values.Main_Go, this.screen);
                Main_SwitchScreen();

            } else if ((this.screen === Main_AGameClip || this.screen === Main_AGameVod) && !goSidepanel) {

                Screens_BasicExit(Main_aGame, this.screen);
                Main_SwitchScreen();

            } else if ((this.screen === Main_ChannelClip || this.screen === Main_ChannelVod) && !goSidepanel) {

                Screens_BasicExit(Main_ChannelContent, this.screen);
                Main_SwitchScreen();

            } else Screens_OpenSidePanel(false, this.screen);
        },
        concatenate: function(responseObj) {

            if (this.data) {

                if (responseObj[this.object]) {
                    this.data.push.apply(this.data, responseObj[this.object]);
                    this.offset = this.data.length;
                }

                this.setMax(responseObj);
            } else {

                this.data = responseObj[this.object];
                if (this.data) {
                    this.offset = this.data.length;
                    this.setMax(responseObj);
                } else this.data = [];

                this.loadDataSuccess();
            }

            this.loadingData = false;

            if (this.hasBackupData) {
                this.setBackupData(
                    responseObj,
                    this.data,
                    this.lastRefresh,
                    Main_values.Main_gameSelected,
                    this.ContentLang,
                    this.Lang
                );
            }
        },
        setBackupData: function(responseObj, data, lastScreenRefresh, game, ContentLang, Lang) {

            if (!this.BackupData) {

                this.BackupData = {
                    data: {},
                    lastScreenRefresh: {},
                    responseObj: {},
                    ContentLang: {},
                    Lang: {},
                    offsettopFontsize: {}
                };

            }

            if (lastScreenRefresh > this.BackupData.lastScreenRefresh[game]) {

                this.eraseBackupData(game);

            }

            if (!this.BackupData.lastScreenRefresh[game] ||
                lastScreenRefresh >= this.BackupData.lastScreenRefresh[game]) {

                if ((this.BackupData.data[game] && this.BackupData.data[game].length >= data.length) ||
                    (this.BackupData.ContentLang[game] && !Main_A_equals_B(this.BackupData.ContentLang[game], ContentLang)) ||
                    (this.BackupData.Lang[game] && !Main_A_equals_B(this.BackupData.Lang[game], Lang))) {

                    return;
                }

                this.BackupData.data[game] = JSON.parse(JSON.stringify(data));
                this.BackupData.responseObj[game] = responseObj;
                this.BackupData.lastScreenRefresh[game] = lastScreenRefresh;

                this.BackupData.ContentLang[game] = Main_ContentLang;
                this.BackupData.Lang[game] = Settings_AppLang;
                this.BackupData.offsettopFontsize[game] = this.offsettopFontsize ? this.offsettopFontsize : Settings_Obj_default('global_font_offset');

            }

        },
        eraseBackupData: function(game) {

            if (this.BackupData) {

                this.BackupData.data[game] = null;
                this.BackupData.ContentLang[game] = null;
                this.BackupData.Lang[game] = null;
                this.BackupData.lastScreenRefresh[game] = 0;

            }

        },
        CheckBackupData: function(game) {

            return this.BackupData && (this.BackupData.data[game] && this.BackupData.data[game].length) &&
                Main_A_equals_B(this.BackupData.ContentLang[game], Main_ContentLang) &&
                Main_A_equals_B(this.BackupData.Lang[game], Settings_AppLang) &&
                this.BackupData.offsettopFontsize[game] === Settings_Obj_default('global_font_offset') &&
                (!Settings_Obj_default("auto_refresh_screen") ||
                    (new Date().getTime()) < (this.BackupData.lastScreenRefresh[game] + Settings_GetAutoRefreshTimeout()));
        },
        restoreBackup: function() {
            var game = Main_values.Main_gameSelected;

            this.data = JSON.parse(JSON.stringify(this.BackupData.data[game]));
            this.offset = this.data.length;
            this.setMax(this.BackupData.responseObj[game]);
            this.lastRefresh = this.BackupData.lastScreenRefresh[game];

            var hasFullBackup = this.ScreenBackup && this.ScreenBackup[game] && this.ScreenBackup[game].style;

            if (hasFullBackup) {

                this.RestoreBackupScreen(game);
                Screens_addFocus(true, this.screen);
                if (Screens_IsInUse(this.screen)) Main_HideLoadDialog();

            } else {

                this.loadDataSuccess();

            }

            this.loadingData = false;
        },
        BackupScreen: function(game) {

            if (!this.ScreenBackup) {
                this.ScreenBackup = {};
                this.ScreenBackup[game] = {};

            } else if (!this.ScreenBackup[game]) {
                this.ScreenBackup[game] = {};
            }

            if (!this.data.length) {

                this.ScreenBackup[game].style = null;
                return;

            }

            this.ScreenBackup[game].style = this.ScrollDoc.style.transform;
            this.ScreenBackup[game].innerHTML = '';
            this.ScreenBackup[game].innerHTML = this.tableDoc.innerHTML;
            this.ScreenBackup[game].DataObj = JSON.parse(JSON.stringify(this.DataObj));
            this.ScreenBackup[game].idObject = JSON.parse(JSON.stringify(this.idObject));

            this.ScreenBackup[game].Cells = Main_Slice(this.Cells);

            this.ScreenBackup[game].cursor = this.cursor;
            this.ScreenBackup[game].offset = this.offset;
            this.ScreenBackup[game].offsettop = this.offsettop;
            this.ScreenBackup[game].emptyContent = this.emptyContent;
            this.ScreenBackup[game].itemsCount = this.itemsCount;
            this.ScreenBackup[game].posX = this.posX;
            this.ScreenBackup[game].posY = this.posY;
            this.ScreenBackup[game].row_id = this.row_id;
            this.ScreenBackup[game].currY = this.currY;
            this.ScreenBackup[game].coloumn_id = this.coloumn_id;
            this.ScreenBackup[game].data_cursor = this.data_cursor;
            this.ScreenBackup[game].dataEnded = this.dataEnded;
            this.ScreenBackup[game].BannerCreated = this.BannerCreated;

        },
        RestoreBackupScreen: function(game) {

            this.ScrollDoc.style.transform = this.ScreenBackup[game].style;
            this.tableDoc.innerHTML = this.ScreenBackup[game].innerHTML;
            this.Cells = Main_Slice(this.ScreenBackup[game].Cells);

            //Backup of cells and the innerHTML disconnects the div in the table and on the Backup array
            var array = this.tableDoc.getElementsByClassName(this.rowClass),
                i = 0,
                len = array.length;

            for (i; i < len; i++) {

                this.Cells[(array[i].id).split(this.ids[6])[1]] = array[i];

            }

            this.DataObj = JSON.parse(JSON.stringify(this.ScreenBackup[game].DataObj));
            this.idObject = JSON.parse(JSON.stringify(this.ScreenBackup[game].idObject));

            this.cursor = this.ScreenBackup[game].cursor;
            this.offset = this.ScreenBackup[game].offset;
            this.offsettop = this.ScreenBackup[game].offsettop;
            this.emptyContent = this.ScreenBackup[game].emptyContent;
            this.itemsCount = this.ScreenBackup[game].itemsCount;
            this.posX = this.ScreenBackup[game].posX;
            this.posY = this.ScreenBackup[game].posY;
            this.row_id = this.ScreenBackup[game].row_id;
            this.currY = this.ScreenBackup[game].currY;
            this.currY = this.ScreenBackup[game].currY;
            this.coloumn_id = this.ScreenBackup[game].coloumn_id;
            this.data_cursor = this.ScreenBackup[game].data_cursor;
            this.dataEnded = this.ScreenBackup[game].dataEnded;
            this.BannerCreated = this.ScreenBackup[game].BannerCreated;

            this.status = true;
            this.FirstRunEnd = true;
            this.TopRowCreated = true;
            this.isRefreshing = false;
            Screens_Some_Screen_Is_Refreshing = false;
            Screens_SetAutoRefresh(this.screen);
            Main_SaveValuesWithTimeout();

        },
        screen_view: function() {
            if (this.ScreenName)
                Main_EventScreen(this.ScreenName);
        },
        OpenVodStart: function() {

            Main_OpenVodStart(
                Screens_GetObj(this.screen),
                this.posY + '_' + this.posX,
                this.ids,
                this.key_fun,
                this.ScreenName
            );

        },
        OpenClip: function() {

            Main_OpenClip(
                Screens_GetObj(this.screen),
                this.posY + '_' + this.posX,
                this.ids,
                this.key_fun,
                this.ScreenName
            );

        },
        OpenLiveStream: function(checkHistory) {

            Main_OpenLiveStream(
                Screens_GetObj(this.screen),
                this.posY + '_' + this.posX,
                this.ids,
                this.key_fun,
                checkHistory,
                this.ScreenName
            );

        },
        hasBanner: true,
        addBanner: function(forceAdd) {

            var lang = nordvpn[this.ContentLang] ? this.ContentLang : 'en',
                img_pos = Main_values.banner_pos++,
                len = nordvpn[lang].images.length;

            if (img_pos >= len)
                img_pos = 0;

            if (Main_values.banner_pos >= len)
                Main_values.banner_pos = 0;

            ScreensObj_addBanner(
                {
                    image: nordvpn.image_base + lang + nordvpn[lang].images[img_pos],
                    url: nordvpn.url,
                    text: nordvpn[lang].long_text.replace('%x', DefaultMakeLink(nordvpn.display_url, 'http://')),
                    event_name: nordvpn.event_name
                },
                this.screen,
                forceAdd
            );
        },
        emptyBanner: function(forceAdd) {
            ScreensObj_addBanner(
                {
                    image: 'https://fgl27.github.io/SmartTwitchTV/apk/app/src/main/res/mipmap-nodpi/ic_splash.png',
                    text: STR_REFRESH_PROBLEM_ENTER
                },
                this.screen,
                forceAdd
            );
        },
        addEmptyContentBanner: function() {

            if (this.hasBanner) {

                this.addBanner();

            } else {

                this.emptyBanner();

            }

            this.itemsCount = 1;
            this.emptyContent = false;

        },
        is_a_Banner: function() {

            var obj_id = this.posY + '_' + this.posX;

            if (this.posY > -1 && this.DataObj[obj_id].image) {

                this.banner_click(obj_id);

                return true;
            }

            return false;
        },
        banner_click: function(obj_id) {


            if (this.DataObj[obj_id].url) {

                if (Main_IsOn_OSInterface) {

                    Main_SaveValues();
                    Android.OpenURL(this.DataObj[obj_id].url);

                } else {

                    console.log(this.DataObj[obj_id]);

                }

            } else {

                Main_ReloadScreen();

            }

            if (this.DataObj[obj_id] && this.DataObj[obj_id].event_name) {

                Main_EventBanner(
                    this.DataObj[obj_id].event_name + '_click',
                    this.ScreenName
                );

            }
        },
    };

    Base_Vod_obj = {
        ItemsLimit: Main_ItemsLimitVideo,
        ColoumnsCount: Main_ColoumnsCountVideo,
        ItemsReloadLimit: Main_ItemsReloadLimitVideo,
        thumbclass: 'stream_thumbnail_live_holder',
        rowClass: 'animate_height_transition',
        histPosXName: 'HistoryVod_histPosX',
        screenType: 1,
        addFocus: function(forceScroll, key) {
            this.AnimateThumb(this);
            Screens_addFocusVideo(forceScroll, key);
        },
        setTODialog: function() {
            Main_AddClass('dialog_thumb_opt_setting_-1', 'hideimp');
            Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_VOD_DIS);
        },
        setMax: function(tempObj) {
            if (tempObj[this.object].length < (Main_ItemsLimitMax - 5)) this.dataEnded = true;
        },
        img_404: IMG_404_VOD,
        HasSwitches: true,
        period: ['day', 'week', 'month', 'all'],
        AnimateThumbId: null,
        HasAnimateThumb: true,
        Vod_newImg: new Image(),
        AnimateThumb: ScreensObj_AnimateThumbId,
        addCell: function(cell) {
            if (!this.idObject[cell._id]) {

                this.itemsCount++;
                this.idObject[cell._id] = 1;

                this.tempHtml +=
                    Screens_createCellVod(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        ScreensObj_VodCellArray(cell),
                        this.screen
                    );

                this.coloumn_id++;
            }
        }
    };

    Base_Live_obj = {
        ItemsReloadLimit: Main_ItemsReloadLimitVideo,
        ItemsLimit: Main_ItemsLimitVideo,
        ColoumnsCount: Main_ColoumnsCountVideo,
        addFocus: Screens_addFocusVideo,
        rowClass: 'animate_height_transition',
        thumbclass: 'stream_thumbnail_live_holder',
        histPosXName: 'HistoryLive_histPosX',
        screenType: 0,
        img_404: IMG_404_VIDEO,
        setMax: function(tempObj) {
            this.MaxOffset = tempObj._total;

            if (!tempObj[this.object]) this.dataEnded = true;
            else if (typeof this.MaxOffset === 'undefined') {
                if (tempObj[this.object].length < 90) this.dataEnded = true;
            } else {
                if (this.data.length >= this.MaxOffset) this.dataEnded = true;
            }
        },
        setTODialog: function() {
            Main_AddClass('dialog_thumb_opt_setting_-1', 'hideimp');
            Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_LIVE_DIS);
        },
        addCell: function(cell) {
            this.addCellTemp(cell);
        },
        check_offset: function() {
            if ((this.offset >= 900) ||
                ((typeof this.MaxOffset !== 'undefined') &&
                    this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset)) this.dataEnded = true;
        },
        addCellTemp: function(cell) {
            if (!this.idObject[cell.channel._id]) {

                this.itemsCount++;
                this.idObject[cell.channel._id] = 1;

                this.tempHtml += Screens_createCellLive(
                    this.row_id + '_' + this.coloumn_id,
                    this.ids,
                    ScreensObj_LiveCellArray(cell),
                    this.screen
                );

                this.coloumn_id++;
            }
        },
        key_play: function() {

            if (this.is_a_Banner()) return;

            if (this.itemsCount) {

                Main_RemoveClass(this.ids[1] + this.posY + '_' + this.posX, 'opacity_zero');
                this.OpenLiveStream(false);

            }

        }
    };

    Base_Clip_obj = {
        HeadersArray: Main_base_array_header,
        ItemsLimit: Main_ItemsLimitVideo,
        TopRowCreated: false,
        ItemsReloadLimit: Main_ItemsReloadLimitVideo,
        ColoumnsCount: Main_ColoumnsCountVideo,
        addFocus: Screens_addFocusVideo,
        rowClass: 'animate_height_transition',
        thumbclass: 'stream_thumbnail_live_holder',
        histPosXName: 'HistoryClip_histPosX',
        screenType: 2,
        cursor: null,
        OldUserName: '',
        object: 'clips',
        period: ['day', 'week', 'month', 'all'],
        img_404: IMG_404_VOD,
        setTODialog: function() {
            Main_AddClass('dialog_thumb_opt_setting_-1', 'hideimp');
            Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_CLIP_DIS);
        },
        HasSwitches: true,
        SwitchesIcons: ['history', 'play-1'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_CLIP,
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_PLAY_ALL
                ],
                this.screen
            );
        },
        setMax: function(tempObj) {
            this.cursor = tempObj._cursor;
            if (this.cursor === '') this.dataEnded = true;
        },
        key_play: function() {

            if (this.is_a_Banner()) return;

            if (this.posY === -1) {

                if (!this.loadingData) {

                    if (!this.posX) {

                        Screens_PeriodStart(this.screen);
                        return;

                    } else {

                        PlayClip_All = true;
                        Screens_removeFocusFollow(this.screen);
                        this.posX = 0;
                        this.posY = 0;

                    }

                } else return;
            }

            this.OpenClip();
        },
        Cells: [],
        addCell: function(cell) {
            if (!this.idObject[cell.tracking_id]) {
                this.itemsCount++;
                this.idObject[cell.tracking_id] = 1;

                this.tempHtml +=
                    Screens_createCellClip(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        ScreensObj_ClipCellArray(cell),
                        this.screen
                    );

                this.coloumn_id++;
            }
        }
    };

    Base_Game_obj = {
        HeadersArray: Main_base_array_header,
        thumbclass: 'stream_thumbnail_game_holder',
        ItemsReloadLimit: Main_ItemsReloadLimitGame,
        ItemsLimit: Main_ItemsLimitGame,
        rowClass: 'animate_height_transition_games',
        ColoumnsCount: Main_ColoumnsCountGame,
        addFocus: Screens_addFocusVideo,
        img_404: IMG_404_GAME,
        screenType: 3,
        key_play: function() {

            if (this.is_a_Banner()) return;

            Main_removeFocus(this.posY + '_' + this.posX, this.ids);

            var data = Screens_GetObj(this.screen);

            Main_values.Main_gameSelected_id = data[3];
            Main_values.Main_gameSelected = data[1];

            Main_removeEventListener("keydown", this.key_fun);
            Main_values.Main_BeforeAgame = this.screen;
            Main_values.Main_Go = Main_aGame;
            Main_values.Main_BeforeAgameisSet = true;

            Main_addFocusVideoOffset = 0;
            Main_removeEventListener("keydown", this.key_fun);
            Main_HideElementWithEle(this.ScrollDoc);

            Main_SwitchScreen();
        },
        setMax: function(tempObj) {

            this.MaxOffset = tempObj._total;
            if (this.data.length >= this.MaxOffset) this.dataEnded = true;

        },
        addCell: function(cell) {

            var hasLive = this.isLive || this.screen === Main_games;
            var game = this.hasGameProp ? cell.game : cell;

            if (!this.idObject[game._id]) {

                this.itemsCount++;
                this.idObject[game._id] = 1;

                this.tempHtml +=
                    Screens_createCellGame(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        [game.box.template.replace("{width}x{height}", Main_GameSize),//0
                        game.name,//1
                        hasLive ? Main_addCommas(cell.channels) + STR_SPACE_HTML + STR_CHANNELS + STR_BR + STR_FOR +
                            Main_addCommas(cell.viewers) + STR_SPACE_HTML + Main_GetViewerStrings(cell.viewers) : '',//2
                        game._id//3
                        ],
                        this.screen
                    );

                this.coloumn_id++;
            }
        }
    };

    Base_Channel_obj = {
        ItemsLimit: Main_ItemsLimitChannel,
        ColoumnsCount: Main_ColoumnsCountChannel,
        addFocus: Screens_addFocusChannel,
        ItemsReloadLimit: Main_ItemsReloadLimitChannel,
        thumbclass: 'stream_thumbnail_channel_holder',
        rowClass: 'animate_height_transition_channel',
        screenType: 4,
        img_404: IMG_404_LOGO,
        setMax: function(tempObj) {
            this.MaxOffset = tempObj._total;
            if (this.data.length >= this.MaxOffset || typeof this.MaxOffset === 'undefined') this.dataEnded = true;
        },
        addCellTemp: function(cell) {
            if (!this.idObject[cell._id]) {

                this.itemsCount++;
                this.idObject[cell._id] = 1;

                this.tempHtml +=
                    Screens_createCellChannel(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        [cell.name, cell._id, cell.logo, cell.display_name, cell.partner],
                        this.screen
                    );

                this.coloumn_id++;
            }
        },
        base_key_play: function(go_screen, IsFollowing) {

            if (this.is_a_Banner()) return;

            if (Main_ThumbOpenIsNull(this.posY + '_' + this.posX, this.ids[0])) return;

            var data = Screens_GetObj(this.screen);

            Main_values.Main_selectedChannel_id = data[1];
            Main_values.Main_selectedChannelDisplayname = data[3];
            Main_values.Main_selectedChannelLogo = data[2];
            Main_values.Main_selectedChannel = data[0];

            Main_removeEventListener("keydown", this.key_fun);
            Main_values.Main_BeforeChannel = go_screen;
            Main_values.Main_Go = Main_ChannelContent;
            Main_values.Main_BeforeChannelisSet = true;
            AddCode_IsFollowing = IsFollowing;
            ChannelContent_UserChannels = IsFollowing;
            Screens_exit(this.screen);
            Main_SwitchScreen();
        },
    };

    Base_History_obj = {
        ItemsReloadLimit: Main_ItemsReloadLimitVideo,
        ItemsLimit: Main_ItemsLimitVideo,
        ColoumnsCount: Main_ColoumnsCountVideo,
        addFocus: Screens_addFocusVideo,
        rowClass: 'animate_height_transition',
        thumbclass: 'stream_thumbnail_live_holder',
        isHistory: true,
        streamerID: {},
        HasSwitches: true,
        key_pgDown: Main_UserLive,
        key_pgUp: Main_UserChannels,
        histPosY: 0,
        histPosXTemp: [0, 0, 0, 0],
        sorting: [],
        sortingValues: [
            ['date', 0],
            ['date', 1],
            ['name', 1],
            ['name', 0],
            ['game', 1],
            ['game', 0],
            ['views', 0],
            ['views', 1],
            ['created_at', 0],
            ['created_at', 1]
        ],
        sortingPos: 0,
        Upsorting: function() {
            this.sorting = [
                STR_NEWEST,
                STR_OLDEST,
                STR_NAME_A_Z,
                STR_NAME_Z_A,
                STR_GAME_A_Z,
                STR_GAME_Z_A,
                STR_VIWES_MOST,
                STR_VIWES_LOWEST,
                STR_CREATED_NEWEST,
                STR_CREATED_OLDEST
            ];
        },
        histEna: [],
        histEnaPos: 0,
        histClean: [],
        histCleanPos: 0,
        UpEna: function() {

            this.histEna = [
                STR_YES,
                STR_NO
            ];

            this.histClean = [
                STR_YES,
                STR_NO
            ];

        },
        histArrays: [],
        UpArrays: function() {
            this.histArrays = [
                this.sorting,
                this.histEna,
                [STR_PRESS_ENTER_D],
                this.histClean
            ];
        },
        set_url: noop_fun,
        history_concatenate: function() {
            this.streamerID = {};
            this.data = JSON.parse(JSON.stringify(Main_values_History_data[AddUser_UsernameArray[0].id][this.Type]));
            Main_History_Sort(this.data, this.sortingValues[this.histPosX[0]][0], this.sortingValues[this.histPosX[0]][1]);
            this.dataEnded = true;
            this.loadDataSuccess();
            this.loadingData = false;
        },
        history_exit: function() {
            if (this.status) {
                Screens_removeFocusFollow(this.screen);
                this.posY = 0;
                this.posX = 0;
                Main_AddClass(this.ids[0] + '0_' + this.posX, Main_classThumb);
            }
            Main_removeEventListener("keydown", this.key_fun);
            Main_HideElementWithEle(this.ScrollDoc);
        },
        sethistMainDialog: function() {
            this.Upsorting();
            this.UpEna();
            this.UpArrays();

            Screens_histSetArrow(this.screen);

            Main_textContent(
                'dialog_hist_val_1',
                this.histArrays[1][this.histPosX[1]]
            );

            //History dialog pos 4 was added after, push in case was saved before the change
            if (this.histPosX.length < 4) this.histPosX.push(0);

            Main_textContent(
                'dialog_hist_val_3',
                this.histArrays[3][this.histPosX[3]]
            );

            Main_getElementById("dialog_hist_left_1").style.opacity = "0";
            Main_getElementById("dialog_hist_right_1").style.opacity = "0";
            this.histPosXTemp = Main_Slice(this.histPosX);
        }
    };
}

function ScreensObj_InitVod() {
    ScreenObj[Main_Vod] = Screens_assign({
        periodMaxPos: 4,
        HeadersArray: Main_base_array_header,
        key_pgDown: Main_Clip,
        key_pgUp: Main_games,
        object: 'vods',
        ids: Screens_ScreenIds('Vod'),
        ScreenName: 'Vod',
        table: 'stream_table_vod',
        screen: Main_Vod,
        highlightSTR: 'Vod_highlight',
        CheckContentLang: 1,
        ContentLang: '',
        highlight: Main_getItemBool('Vod_highlight', false),
        periodPos: Main_getItemInt('vod_periodPos', 2),
        base_url: Main_kraken_api + 'videos/top?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            this.url = this.base_url + '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') +
                '&sort=views&offset=' + this.offset + '&period=' + this.period[this.periodPos - 1] +
                (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
        },
        key_play: function() {

            if (this.is_a_Banner()) return;

            if (this.posY === -1) {
                if (this.posX === 0) {
                    this.highlight = !this.highlight;
                    this.SetPeriod();
                    Screens_StartLoad(this.screen);
                    Main_setItem(this.highlightSTR, this.highlight ? 'true' : 'false');
                } else Screens_PeriodStart(this.screen);
            } else this.OpenVodStart();
        },
        SwitchesIcons: ['movie-play', 'history'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_VOD,
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_CLIP
                ],
                this.screen
            );
        },
        label_init: function() {
            ScreensObj_CheckUser(this.screen);

            Sidepannel_SetDefaultLables();
            Main_values.Sidepannel_IsUser = false;
            Sidepannel_SetTopOpacity(this.screen);
            this.SetPeriod();
        },
        SetPeriod: function() {
            Main_setItem('vod_periodPos', this.periodPos);
            ScreensObj_SetTopLable(STR_VIDEOS, (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) +
                STR_SPACE_HTML + Main_Periods[this.periodPos - 1]);
        },
    }, Base_obj);

    ScreenObj[Main_Vod] = Screens_assign(ScreenObj[Main_Vod], Base_Vod_obj);
    ScreenObj[Main_Vod].Set_Scroll();
}

function ScreensObj_InitChannelVod() {
    ScreenObj[Main_ChannelVod] = Screens_assign({
        periodMaxPos: 2,
        HeadersArray: Main_base_array_header,
        key_pgDown: Main_ChannelClip,
        object: 'videos',
        ids: Screens_ScreenIds('ChannelVod'),
        ScreenName: 'ChannelVod',
        table: 'stream_table_channel_vod',
        screen: Main_ChannelVod,
        time: ['time', 'views'],
        extraoffset: 0,
        OffSetPos: 0,
        highlightSTR: 'ChannelVod_highlight',
        highlight: Main_getItemBool('ChannelVod_highlight', false),
        periodPos: Main_getItemInt('ChannelVod_periodPos', 1),
        base_url: Main_kraken_api + 'channels/',
        set_url: function() {
            this.url = this.base_url +
                encodeURIComponent(Main_values.Main_selectedChannel_id) + '/videos?limit=' + Main_ItemsLimitMax +
                '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') + '&sort=' +
                this.time[this.periodPos - 1] + '&offset=' + (this.offset + this.extraoffset);
        },
        key_play: function() {

            if (this.is_a_Banner()) return;

            if (this.posY === -1) {
                if (this.posX === 0) {
                    this.highlight = !this.highlight;
                    this.SetPeriod();
                    Screens_StartLoad(this.screen);
                    Main_setItem(this.highlightSTR, this.highlight ? 'true' : 'false');
                } else if (this.posX === 1) {
                    this.periodPos++;
                    if (this.periodPos > this.periodMaxPos) this.periodPos = 1;
                    this.SetPeriod();
                    Screens_StartLoad(this.screen);
                } else Screens_OffSetStart(this.screen);
            } else this.OpenVodStart();
        },
        SwitchesIcons: ['movie-play', 'history', 'offset'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_VOD,
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_TYPE,
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_POS
                ],
                this.screen
            );
        },
        lastselectedChannel: '',
        label_init: function() {
            ScreensObj_CheckUser(this.screen);

            if (!Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
            if (Main_values.Main_selectedChannel !== this.lastselectedChannel) {
                this.OffSetPos = 0;
                this.extraoffset = 0;
                this.status = false;
            }
            this.lastselectedChannel = Main_values.Main_selectedChannel;
            Main_cleanTopLabel();
            Main_IconLoad('label_thumb', 'icon-return', STR_GOBACK);
            this.SetPeriod();
        },
        SetPeriod: function() {
            Main_setItem('UserVod_periodPos', this.periodPos);

            ScreensObj_SetTopLable(Main_values.Main_selectedChannelDisplayname,
                (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) +
                (this.periodPos === 1 ? STR_RECENT : STR_VIWES) + "," + STR_OFFSET + ScreenObj[this.screen].extraoffset);

        },
        label_exit: function() {
            Main_RestoreTopLabel();
        }
    }, Base_obj);

    ScreenObj[Main_ChannelVod] = Screens_assign(ScreenObj[Main_ChannelVod], Base_Vod_obj);
    ScreenObj[Main_ChannelVod].Set_Scroll();
}

function ScreensObj_InitAGameVod() {
    ScreenObj[Main_AGameVod] = Screens_assign({
        periodMaxPos: 4,
        HeadersArray: Main_base_array_header,
        object: 'vods',
        key_pgDown: Main_Vod,
        key_pgUp: Main_Featured,
        ids: Screens_ScreenIds('AGameVod'),
        ScreenName: 'AGameVod',
        table: 'stream_table_a_game_vod',
        screen: Main_AGameVod,
        CheckContentLang: 1,
        ContentLang: '',
        hasBackupData: true,
        highlightSTR: 'AGameVod_highlight',
        highlight: Main_getItemBool('AGameVod_highlight', false),
        periodPos: Main_getItemInt('AGameVod_periodPos', 2),
        base_url: Main_kraken_api + 'videos/top?game=',
        set_url: function() {
            this.url = this.base_url + encodeURIComponent(Main_values.Main_gameSelected) + '&limit=' +
                Main_ItemsLimitMax + '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') +
                '&sort=views&offset=' + this.offset + '&period=' + this.period[this.periodPos - 1] +
                (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
        },
        key_play: function() {

            if (this.is_a_Banner()) return;

            if (this.posY === -1) {
                if (this.posX === 0) {
                    this.highlight = !this.highlight;
                    this.SetPeriod();
                    this.isReloadScreen = true;
                    Screens_StartLoad(this.screen);
                    Main_setItem(this.highlightSTR, this.highlight ? 'true' : 'false');
                } else Screens_PeriodStart(this.screen);
            } else this.OpenVodStart();
        },
        SwitchesIcons: ['movie-play', 'history'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_VOD,
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_CLIP
                ],
                this.screen
            );
        },
        OldgameSelected: '',
        label_init: function() {
            ScreensObj_CheckUser(this.screen);

            ScreensObj_TopLableAgameInit(this.screen);
            this.SetPeriod();
        },
        label_exit: function() {
            ScreensObj_TopLableAgameExit(this.screen);
        },
        SetPeriod: function() {
            Main_setItem('AGameVod_periodPos', this.periodPos);

            ScreensObj_SetTopLable(
                Main_values.Main_gameSelected,
                (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_SPACE_HTML + Main_Periods[this.periodPos - 1]
            );

        }
    }, Base_obj);

    ScreenObj[Main_AGameVod] = Screens_assign(ScreenObj[Main_AGameVod], Base_Vod_obj);
    ScreenObj[Main_AGameVod].Set_Scroll();
}

function ScreensObj_InitUserVod() {
    ScreenObj[Main_UserVod] = Screens_assign({
        periodMaxPos: 2,
        UseToken: true,
        object: 'videos',
        key_pgDown: Main_UserChannels,
        key_pgUp: Main_usergames,
        ids: Screens_ScreenIds('UserVod'),
        ScreenName: 'UserVod',
        table: 'stream_table_user_vod',
        screen: Main_UserVod,
        IsUser: true,
        time: ['time', 'views'],
        highlightSTR: 'UserVod_highlight',
        highlight: Main_getItemBool('UserVod_highlight', false),
        periodPos: Main_getItemInt('UserVod_periodPos', 1),
        base_url: Main_kraken_api + 'videos/followed?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            this.token = Main_OAuth + AddUser_UsernameArray[0].access_token;
            Main_Headers[2][1] = this.token;
            this.HeadersArray = Main_Headers;

            this.url = this.base_url + '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') +
                '&sort=' + this.time[this.periodPos - 1] + '&offset=' + this.offset;
        },
        key_play: function() {

            if (this.is_a_Banner()) return;

            if (this.posY === -1) {
                if (this.posX === 0) {
                    this.highlight = !this.highlight;
                    this.SetPeriod();
                    Screens_StartLoad(this.screen);
                    Main_setItem(this.highlightSTR, this.highlight ? 'true' : 'false');
                } else {
                    this.periodPos++;
                    if (this.periodPos > this.periodMaxPos) this.periodPos = 1;
                    this.SetPeriod();
                    Screens_StartLoad(this.screen);
                }
            } else this.OpenVodStart();
        },
        SwitchesIcons: ['movie-play', 'history'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_VOD,
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_TYPE
                ],
                this.screen
            );
        },
        label_init: function() {
            ScreensObj_CheckUser(this.screen);

            this.SetPeriod();
            ScreensObj_TopLableUserInit(this.screen);
        },
        SetPeriod: function() {
            Main_setItem('UserVod_periodPos', this.periodPos);

            ScreensObj_SetTopLable(STR_USER, (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) +
                (this.periodPos === 1 ? STR_RECENT : STR_VIWES));
        }
    }, Base_obj);

    ScreenObj[Main_UserVod] = Screens_assign(ScreenObj[Main_UserVod], Base_Vod_obj);
    ScreenObj[Main_UserVod].Set_Scroll();
}

function ScreensObj_InitLive() {
    ScreenObj[Main_Live] = Screens_assign({
        HeadersArray: Main_base_array_header,
        ids: Screens_ScreenIds('Live'),
        table: 'stream_table_live',
        screen: Main_Live,
        object: 'streams',
        ScreenName: 'Live',
        key_pgDown: Main_Featured,
        key_pgUp: Main_Clip,
        CheckContentLang: 1,
        ContentLang: '',
        base_url: Main_kraken_api + 'streams?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            this.check_offset();

            this.url = this.base_url + '&offset=' + this.offset +
                (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
        },
        label_init: function() {
            Sidepannel_SetDefaultLables();
            Main_values.Sidepannel_IsUser = false;
            Sidepannel_SetTopOpacity(this.screen);

            ScreensObj_SetTopLable(STR_LIVE);
        },
    }, Base_obj);

    ScreenObj[Main_Live] = Screens_assign(ScreenObj[Main_Live], Base_Live_obj);
    ScreenObj[Main_Live].Set_Scroll();
}

function ScreensObj_InitSearchLive() {
    ScreenObj[Main_SearchLive] = Screens_assign({
        HeadersArray: Main_base_array_header,
        ids: Screens_ScreenIds('SearchLive'),
        ScreenName: 'SearchLive',
        table: 'stream_table_search_live',
        screen: Main_SearchLive,
        object: 'streams',
        base_url: Main_kraken_api + 'search/streams?limit=' + Main_ItemsLimitMax + '&query=',
        set_url: function() {
            this.check_offset();
            this.url = this.base_url + encodeURIComponent(Main_values.Search_data) +
                '&offset=' + this.offset;
        },
        label_init: function() {
            Main_values.Search_isSearching = true;
            Main_cleanTopLabel();
            if (this.lastData !== Main_values.Search_data) this.status = false;
            this.lastData = Main_values.Search_data;
            Sidepannel_SetTopOpacity(this.screen);

            ScreensObj_SetTopLable(STR_SEARCH + STR_SPACE_HTML + STR_LIVE, "'" + Main_values.Search_data + "'");
        },
        label_exit: function() {
            Main_values.Search_isSearching = false;
            if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
        },
    }, Base_obj);

    ScreenObj[Main_SearchLive] = Screens_assign(ScreenObj[Main_SearchLive], Base_Live_obj);

    // SearchLive.setMax = function(tempObj) {
    //     this.MaxOffset = tempObj._total;
    //     if (typeof this.MaxOffset === 'undefined' || this.data.length >= this.MaxOffset ||
    //         (this.data.length < Main_ItemsLimitMax)) this.dataEnded = true;
    // };
    ScreenObj[Main_SearchLive].Set_Scroll();
}

function ScreensObj_InitUserLive() {
    ScreenObj[Main_UserLive] = Screens_assign({
        UseToken: true,
        ids: Screens_ScreenIds('UserLive'),
        ScreenName: 'UserLive',
        table: 'stream_table_user_live',
        screen: Main_UserLive,
        object: 'streams',
        IsUser: true,
        key_pgDown: Main_usergames,
        key_pgUp: Main_HistoryLive,
        base_url: Main_kraken_api + 'streams/',
        loadChannelOffsset: 0,
        followerChannels: [],
        followerChannelsDone: false,
        set_url: function() {
            this.check_offset();

            if (AddUser_UsernameArray[0].access_token) {
                //User has added a key
                this.UseToken = true;
                this.token = Main_OAuth + AddUser_UsernameArray[0].access_token;
                Main_Headers[2][1] = this.token;
                this.HeadersArray = Main_Headers;

                this.url = this.base_url + 'followed?' + 'limit=' + Main_ItemsLimitMax + '&offset=' +
                    this.offset + '&stream_type=all';
            } else {
                //User didn't added a key
                this.UseToken = false;
                this.token = null;
                this.HeadersArray = Main_base_array_header;

                if (this.followerChannelsDone) {
                    //User followed channels list is done, load live channels
                    this.url = this.base_url + '?channel=' + this.followerChannels.join() + '&' +
                        'limit=' + Main_ItemsLimitMax + '&offset=' + this.offset + '&stream_type=all';
                } else {
                    //User followed channels list is not done, load followed channels
                    this.url = Main_kraken_api + 'users/' +
                        encodeURIComponent(AddUser_UsernameArray[0].id) +
                        '/follows/channels?limit=' + Main_ItemsLimitMax + '&offset=' + this.loadChannelOffsset +
                        '&sortby=last_broadcast';
                }
            }
        },
        label_init: function() {
            ScreensObj_TopLableUserInit(this.screen);
            ScreensObj_SetTopLable(STR_USER, STR_LIVE_CHANNELS);
        },
    }, Base_obj);

    ScreenObj[Main_UserLive] = Screens_assign(ScreenObj[Main_UserLive], Base_Live_obj);

    ScreenObj[Main_UserLive].concatenate = function(responseObj) {

        if (this.token || this.followerChannelsDone) {
            //User has added a key or followed channels list is done, concatenate live channels
            if (this.data) {

                if (responseObj[this.object]) {
                    this.data.push.apply(this.data, responseObj[this.object]);
                    this.offset = this.data.length;
                }

                this.setMax(responseObj);
            } else {

                this.data = responseObj[this.object];
                if (this.data) this.offset = this.data.length;
                else this.data = [];

                this.setMax(responseObj);

                //Live user sort by views was removed bt twitch without any warning.
                if (this.dataEnded && this.token) {
                    this.data.sort(function(a, b) {
                        return (b.viewers - a.viewers);
                    });
                }

                this.loadDataSuccess();
            }
            this.loadingData = false;
        } else {
            var response = responseObj.follows,
                response_items = response.length;

            if (response_items) { // response_items here is not always 99 because banned channels, so check until it is 0
                //User followed channels list is not done, load followed channels
                var x = 0,
                    max = this.followerChannels.length + response_items;

                if (max > UserLiveFeed_maxChannels) {
                    this.followerChannelsDone = true;
                    response_items = Math.min(response_items, response_items - (max - UserLiveFeed_maxChannels));
                }

                for (x; x < response_items; x++) {
                    this.followerChannels.push(response[x].channel._id);
                }

                this.loadChannelOffsset += response_items;

            } else { // end
                //User followed channels list is done, load live channels
                this.followerChannelsDone = true;
            }
            Screens_loadDataRequest(this.screen);
        }
    };
    ScreenObj[Main_UserLive].Set_Scroll();
}

function ScreensObj_InitAGame() {
    ScreenObj[Main_aGame] = Screens_assign({
        HeadersArray: Main_base_array_header,
        ids: Screens_ScreenIds('AGame'),
        ScreenName: 'AGame',
        table: 'stream_table_a_game',
        screen: Main_aGame,
        object: 'streams',
        CheckContentLang: 1,
        ContentLang: '',
        key_pgDown: Main_Vod,
        key_pgUp: Main_Featured,
        hasBackupData: true,
        base_url: Main_kraken_api + 'streams?game=',
        set_url: function() {
            this.check_offset();

            this.url = this.base_url + encodeURIComponent(Main_values.Main_gameSelected) +
                '&limit=' + Main_ItemsLimitMax + '&offset=' + this.offset +
                (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
        },
        label_init: function() {
            ScreensObj_TopLableAgameInit(this.screen);

            if (Main_values.Search_isSearching) { //Reset label as the app may be restoring from background
                Main_cleanTopLabel();
            } else Main_values.gameSelectedOld = null;

            ScreensObj_SetTopLable(Main_values.Main_gameSelected, STR_LIVE);

            ScreenObj[Main_AGameVod].IsOpen = 0;
            ScreenObj[Main_AGameClip].IsOpen = 0;
        },
        label_exit: function() {
            ScreensObj_TopLableAgameExit(this.screen);
        },
        HasSwitches: true,
        SwitchesIcons: ['movie-play', 'movie'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_VIDEOS,
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_CLIPS
                ],
                this.screen
            );
        },
    }, Base_obj);

    ScreenObj[Main_aGame] = Screens_assign(ScreenObj[Main_aGame], Base_Live_obj);
    ScreenObj[Main_aGame].Set_Scroll();
    ScreenObj[Main_aGame].key_play = function() {

        if ((this.itemsCount || this.BannerCreated) && this.posY !== -1) {

            if (this.is_a_Banner()) return;

            if (this.itemsCount) {

                Main_RemoveClass(
                    this.ids[1] + this.posY + '_' + this.posX,
                    'opacity_zero'
                );

                this.OpenLiveStream(false);

            }

        } else AGame_headerOptions(this.screen);

        ScreenObj[this.screen].IsOpen = 0;
    };
}

function ScreensObj_InitFeatured() {
    ScreenObj[Main_Featured] = Screens_assign({
        HeadersArray: Main_base_array_header,
        ids: Screens_ScreenIds('Featured'),
        ScreenName: 'Featured',
        table: 'stream_table_featured',
        screen: Main_Featured,
        key_pgDown: Main_games,
        key_pgUp: Main_Live,
        base_url: Main_kraken_api + 'streams/featured?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            this.check_offset();

            this.url = this.base_url + '&offset=' + this.offset +
                (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token ? '&oauth_token=' +
                    AddUser_UsernameArray[0].access_token : '');
        },
        label_init: function() {
            Sidepannel_SetDefaultLables();
            Main_values.Sidepannel_IsUser = false;
            Sidepannel_SetTopOpacity(this.screen);

            ScreensObj_SetTopLable(STR_FEATURED);
        },
        object: 'featured',
    }, Base_obj);

    ScreenObj[Main_Featured] = Screens_assign(ScreenObj[Main_Featured], Base_Live_obj);

    ScreenObj[Main_Featured].addCell = function(cell) {
        cell = cell.stream;
        this.addCellTemp(cell);
    };
    ScreenObj[Main_Featured].Set_Scroll();
}

function ScreensObj_InitClip() {
    ScreenObj[Main_Clip] = Screens_assign({
        ids: Screens_ScreenIds('Clip'),
        ScreenName: 'Clip',
        table: 'stream_table_clip',
        screen: Main_Clip,
        key_pgDown: Main_Live,
        key_pgUp: Main_Vod,
        CheckContentLang: 1,
        ContentLang: '',
        periodPos: Main_getItemInt('Clip_periodPos', 2),
        base_url: Main_kraken_api + 'clips/top?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            this.url = this.base_url + '&period=' + this.period[this.periodPos - 1] +
                (this.cursor ? '&cursor=' + this.cursor : '') +
                (Main_ContentLang !== "" ?
                    ('&language=' + (Languages_Extra[Main_ContentLang] ? Languages_Extra[Main_ContentLang] : Main_ContentLang)) : '');
        },
        SetPeriod: function() {
            Main_setItem('Clip_periodPos', this.periodPos);
            ScreensObj_SetTopLable(STR_CLIPS, Main_Periods[this.periodPos - 1]);
        },
        label_init: function() {
            ScreensObj_CheckUser(this.screen);

            this.SetPeriod();
            Sidepannel_SetDefaultLables();
            Main_values.Sidepannel_IsUser = false;
            Sidepannel_SetTopOpacity(this.screen);

        },
        label_exit: function() {
            Main_RestoreTopLabel();
        },
    }, Base_obj);

    ScreenObj[Main_Clip] = Screens_assign(ScreenObj[Main_Clip], Base_Clip_obj);
    ScreenObj[Main_Clip].Set_Scroll();
}

function ScreensObj_InitChannelClip() {
    ScreenObj[Main_ChannelClip] = Screens_assign({
        ids: Screens_ScreenIds('ChannelClip'),
        ScreenName: 'ChannelClip',
        table: 'stream_table_channel_clip',
        screen: Main_ChannelClip,
        key_pgUp: Main_ChannelVod,
        periodPos: Main_getItemInt('ChannelClip_periodPos', 2),
        base_url: Main_kraken_api + 'clips/top?channel=',
        set_url: function() {
            this.url = this.base_url + encodeURIComponent(Main_values.Main_selectedChannel) +
                '&limit=' + Main_ItemsLimitMax + '&period=' +
                this.period[this.periodPos - 1] + (this.cursor ? '&cursor=' + this.cursor : '');
        },
        SetPeriod: function() {
            Main_setItem('ChannelClip_periodPos', this.periodPos);

            ScreensObj_SetTopLable(Main_values.Main_selectedChannelDisplayname, STR_CLIPS + STR_SPACE_HTML +
                Main_Periods[this.periodPos - 1]);
        },
        label_init: function() {
            ScreensObj_CheckUser(this.screen);

            if (!Main_values.Search_isSearching && Main_values.Main_selectedChannel_id)
                ChannelContent_RestoreChannelValue();
            if (Main_values.Main_selectedChannel !== this.lastselectedChannel) this.status = false;
            Main_cleanTopLabel();
            this.SetPeriod();
            Main_IconLoad('label_thumb', 'icon-return', STR_GOBACK);
            this.lastselectedChannel = Main_values.Main_selectedChannel;
        },
        label_exit: Main_RestoreTopLabel,
    }, Base_obj);

    ScreenObj[Main_ChannelClip] = Screens_assign(ScreenObj[Main_ChannelClip], Base_Clip_obj);
    ScreenObj[Main_ChannelClip].Set_Scroll();
}

function ScreensObj_InitAGameClip() {
    ScreenObj[Main_AGameClip] = Screens_assign({
        ids: Screens_ScreenIds('AGameClip'),
        ScreenName: 'AGameClip',
        table: 'stream_table_a_game_clip',
        screen: Main_AGameClip,
        key_pgDown: Main_Vod,
        key_pgUp: Main_Featured,
        CheckContentLang: 1,
        ContentLang: '',
        hasBackupData: true,
        periodPos: Main_getItemInt('AGameClip_periodPos', 2),
        base_url: Main_kraken_api + 'clips/top?game=',
        set_url: function() {
            this.url = this.base_url + encodeURIComponent(Main_values.Main_gameSelected) + '&limit=' + Main_ItemsLimitMax +
                '&period=' + this.period[this.periodPos - 1] + (this.cursor ? '&cursor=' + this.cursor : '') +
                (Main_ContentLang !== "" ?
                    ('&language=' + (Languages_Extra[Main_ContentLang] ? Languages_Extra[Main_ContentLang] : Main_ContentLang)) : '');
        },
        SetPeriod: function() {
            Main_setItem('AGameClip_periodPos', this.periodPos);

            ScreensObj_SetTopLable(
                Main_values.Main_gameSelected,
                STR_CLIPS + STR_SPACE_HTML + Main_Periods[this.periodPos - 1]
            );

        },
        label_init: function() {
            ScreensObj_CheckUser(this.screen);

            ScreensObj_TopLableAgameInit(this.screen);
            this.SetPeriod();
        },
        label_exit: function() {
            ScreensObj_TopLableAgameExit(this.screen);
        },
    }, Base_obj);

    ScreenObj[Main_AGameClip] = Screens_assign(ScreenObj[Main_AGameClip], Base_Clip_obj);
    ScreenObj[Main_AGameClip].Set_Scroll();
}

function ScreensObj_InitGame() {
    ScreenObj[Main_games] = Screens_assign({
        ids: Screens_ScreenIds('Game'),
        ScreenName: 'Game',
        table: 'stream_table_games',
        screen: Main_games,
        key_pgDown: Main_Vod,
        key_pgUp: Main_Featured,
        object: 'top',
        hasGameProp: true,
        base_url: Main_kraken_api + 'games/top?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + '&offset=' + this.offset;
        },
        label_init: function() {
            Sidepannel_SetDefaultLables();
            Main_values.Sidepannel_IsUser = false;
            Sidepannel_SetTopOpacity(this.screen);

            ScreensObj_SetTopLable(STR_GAMES);
        }
    }, Base_obj);

    ScreenObj[Main_games] = Screens_assign(ScreenObj[Main_games], Base_Game_obj);
    ScreenObj[Main_games].Set_Scroll();


    ScreenObj[Main_games].init_fun = function(preventRefresh) {

        ScreensObj_CheckIsOpen(this.screen, preventRefresh);

    };
}

function ScreensObj_InitUserGames() {
    ScreenObj[Main_usergames] = Screens_assign({
        ids: Screens_ScreenIds('UserGames'),
        ScreenName: 'UserGames',
        table: 'stream_table_user_games',
        screen: Main_usergames,
        key_pgDownNext: Main_UserChannels,
        key_pgDown: Main_UserVod,
        key_pgUp: Main_UserLive,
        isLive: false,
        hasGameProp: true,
        OldUserName: '',
        IsUser: true,
        object: 'follows',
        base_url: Main_kraken_api + 'users/',
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;

            this.url = this.base_url + encodeURIComponent(AddUser_UsernameArray[0].id) +
                '/follows/games?limit=' + Main_ItemsLimitMax + '&offset=' + this.offset;

        },
        label_init: function() {
            ScreensObj_TopLableUserInit(this.screen);
            ScreensObj_SetTopLable(STR_USER, STR_FOLLOW_GAMES);
        },
        label_exit: function() {
            Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);
        },
    }, Base_obj);

    ScreenObj[Main_usergames] = Screens_assign(ScreenObj[Main_usergames], Base_Game_obj);
    ScreenObj[Main_usergames].Set_Scroll();

    ScreenObj[Main_usergames].init_fun = function(preventRefresh) {

        ScreensObj_CheckIsOpen(this.screen, preventRefresh);

    };
}

function ScreensObj_InitSearchGames() {
    ScreenObj[Main_SearchGames] = Screens_assign({
        ids: Screens_ScreenIds('SearchGames'),
        ScreenName: 'SearchGames',
        table: 'stream_table_search_game',
        screen: Main_SearchGames,
        isLive: false,
        OldUserName: '',
        object: 'games',
        lastData: '',
        base_url: Main_kraken_api + 'search/games?query=',
        set_url: function() {
            this.dataEnded = true;
            this.url = this.base_url + encodeURIComponent(Main_values.Search_data);
        },
        label_init: function() {
            if (!Main_values.gameSelectedOld) Main_values.gameSelectedOld = Main_values.Main_gameSelected;
            Main_values.Search_isSearching = true;
            Main_cleanTopLabel();
            if (this.lastData !== Main_values.Search_data) this.status = false;
            this.lastData = Main_values.Search_data;
            Sidepannel_SetTopOpacity(this.screen);

            ScreensObj_SetTopLable(STR_SEARCH + STR_SPACE_HTML + STR_GAMES, "'" + Main_values.Search_data + "'");
        },
        label_exit: function() {
            Main_values.Main_gameSelected = Main_values.gameSelectedOld;
            if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
            Main_values.Games_return = false;
        },
    }, Base_obj);

    ScreenObj[Main_SearchGames] = Screens_assign(ScreenObj[Main_SearchGames], Base_Game_obj);
    ScreenObj[Main_SearchGames].ItemsLimit = 100;
    ScreenObj[Main_SearchGames].Set_Scroll();
}

function ScreensObj_InitUserChannels() {
    ScreenObj[Main_UserChannels] = Screens_assign({
        HeadersArray: Main_base_array_header,
        ids: Screens_ScreenIds('UserChannels'),
        ScreenName: 'UserChannels',
        table: 'stream_table_user_channels',
        screen: Main_UserChannels,
        object: 'follows',
        IsUser: true,
        key_pgDown: Main_History[Main_HistoryPos],
        key_pgUp: Main_UserVod,
        key_pgUpNext: Main_usergames,
        base_url: Main_kraken_api + 'users/',
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + encodeURIComponent(AddUser_UsernameArray[0].id) +
                '/follows/channels?limit=' + Main_ItemsLimitMax + '&offset=' + this.offset + '&sortby=login&direction=asc';
        },
        label_init: function() {
            ScreensObj_TopLableUserInit(this.screen);

            ScreensObj_SetTopLable(STR_USER, STR_USER_CHANNEL);
        },
        key_play: function() {

            if (this.is_a_Banner()) return;

            this.base_key_play(Main_UserChannels, true);

        },
        addCell: function(cell) {
            cell = cell.channel;
            this.addCellTemp(cell);
        }
    }, Base_obj);

    ScreenObj[Main_UserChannels] = Screens_assign(ScreenObj[Main_UserChannels], Base_Channel_obj);
    ScreenObj[Main_UserChannels].addrow = Screens_addrowChannel;
    ScreenObj[Main_UserChannels].visiblerows = 5;
    ScreenObj[Main_UserChannels].Set_Scroll();
}

function ScreensObj_InitSearchChannels() {
    ScreenObj[Main_SearchChannels] = Screens_assign({
        HeadersArray: Main_base_array_header,
        ids: Screens_ScreenIds('SearchChannels'),
        ScreenName: 'SearchChannels',
        table: 'stream_table_search_channel',
        screen: Main_SearchChannels,
        object: 'channels',
        base_url: Main_kraken_api + 'search/channels?limit=' + Main_ItemsLimitMax + '&query=',
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + encodeURIComponent(Main_values.Search_data) +
                '&offset=' + this.offset;
        },
        label_init: function() {
            Main_values.Search_isSearching = true;
            Main_cleanTopLabel();
            if (this.lastData !== Main_values.Search_data) this.status = false;
            this.lastData = Main_values.Search_data;
            Sidepannel_SetTopOpacity(this.screen);

            ScreensObj_SetTopLable(STR_SEARCH + STR_SPACE_HTML + STR_CHANNELS, "'" + Main_values.Search_data + "'");
        },
        label_exit: function() {
            if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
        },
        key_play: function() {
            if (this.is_a_Banner()) return;

            this.base_key_play(Main_SearchChannels, false);
        },
        addCell: function(cell) {
            this.addCellTemp(cell);
        }
    }, Base_obj);

    ScreenObj[Main_SearchChannels] = Screens_assign(ScreenObj[Main_SearchChannels], Base_Channel_obj);
    ScreenObj[Main_SearchChannels].addrow = Screens_addrowChannel;
    ScreenObj[Main_SearchChannels].visiblerows = 5;
    ScreenObj[Main_SearchChannels].Set_Scroll();
}

function ScreensObj_HistoryLive() {
    ScreenObj[Main_HistoryLive] = Screens_assign({
        Type: 'live',
        ids: Screens_ScreenIds('HistoryLive'),
        ScreenName: 'HistoryLive',
        table: 'stream_table_historylive',
        screen: Main_HistoryLive,
        img_404: IMG_404_VIDEO,
        histPosXName: 'HistoryLive_histPosX',
        screenType: 0,
        histPosX: Main_getItemJson('HistoryLive_histPosX', [0, 0, 0, 0]),
        sethistDialog: function() {
            Screens_SethistDialogId(this.screen);
            Main_innerHTML("dialog_hist_text", STR_LIVE + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_SETTINGS);
            this.sethistMainDialog();
        },
        setTODialog: function() {
            Main_RemoveClass('dialog_thumb_opt_setting_-1', 'hideimp');
            if (Main_A_includes_B(Main_getElementById(this.ids[1] + this.posY + '_' + this.posX).src, 's3_vods'))
                Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_VOD_DIS);
            else
                Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_LIVE_DIS);
        },
        label_init: function() {
            Main_HistoryPos = 0;
            ScreensObj_TopLableUserInit(this.screen);
            ScreensObj_SetTopLable(
                STR_USER,
                STR_HISTORY + STR_SPACE_HTML + STR_LIVE + STR_SPACE_HTML +
                '(' + this.sorting[this.histPosX[0]] + ')'
            );
        },
        history_Type: function() {
            return STR_LIVE;
        },
        addCell: function(cell) {
            //cell.data[14] check here to a bug that introduce emtpy values todo maybe can be removed ins some months
            if (!this.idObject[cell.data[7]] && cell.data[14] && cell.data[14] !== '') {

                this.itemsCount++;
                this.idObject[cell.data[7]] = 1;

                this.tempHtml +=
                    Screens_createCellLive(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        cell.data,
                        this.screen,
                        cell.date,
                        cell.vodimg,
                        (this.streamerID[cell.data[14]] && cell.vodid) || cell.forceVod
                    );

                //If there is alredy one stream shoing all the rest is a VOD
                this.streamerID[cell.data[14]] = 1;
                this.coloumn_id++;
            }
        },
        SwitchesIcons: ['movie-play', 'movie', 'settings'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_VIDEOS,
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_CLIPS,
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_LIVE + STR_SPACE_HTML + STR_SETTINGS
                ],
                this.screen
            );
        },
    }, Base_obj);

    ScreenObj[Main_HistoryLive] = Screens_assign(ScreenObj[Main_HistoryLive], Base_History_obj);
    ScreenObj[Main_HistoryLive].Upsorting();
    ScreenObj[Main_HistoryLive].Set_Scroll();
    ScreenObj[Main_HistoryLive].key_play = function() {

        if (this.is_a_Banner()) return;

        if (this.posY === -1) {
            if (this.posX === 0) {
                Main_values.Main_Go = Main_HistoryVod;
                this.history_exit();
                Main_SwitchScreen();
            } else if (this.posX === 1) {
                Main_values.Main_Go = Main_HistoryClip;
                this.history_exit();
                Main_SwitchScreen();
            } else Screens_histStart(this.screen);
        } else {
            if (this.itemsCount) {
                Main_RemoveClass(this.ids[1] + this.posY + '_' + this.posX, 'opacity_zero');
                this.OpenLiveStream(true);
            }
        }
    };
}

function ScreensObj_HistoryVod() {
    ScreenObj[Main_HistoryVod] = Screens_assign({
        Type: 'vod',
        ids: Screens_ScreenIds('HistoryVod'),
        ScreenName: 'HistoryVod',
        table: 'stream_table_historyvod',
        screen: Main_HistoryVod,
        screenType: 1,
        img_404: IMG_404_VOD,
        Vod_newImg: new Image(),
        HasAnimateThumb: true,
        AnimateThumb: ScreensObj_AnimateThumbId,
        histPosXName: 'HistoryVod_histPosX',
        histPosX: Main_getItemJson('HistoryVod_histPosX', [0, 0, 0, 0]),
        sethistDialog: function() {
            Screens_SethistDialogId(this.screen);
            Main_innerHTML("dialog_hist_text", STR_VIDEOS + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_SETTINGS);
            this.sethistMainDialog();
        },
        setTODialog: function() {
            Main_RemoveClass('dialog_thumb_opt_setting_-1', 'hideimp');
            Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_VOD_DIS);
        },
        history_Type: function() {
            return STR_VIDEOS;
        },
        label_init: function() {
            Main_HistoryPos = 1;
            ScreensObj_TopLableUserInit(this.screen);

            ScreensObj_SetTopLable(
                STR_USER,
                STR_HISTORY + STR_SPACE_HTML + STR_VIDEOS + STR_SPACE_HTML +
                '(' + this.sorting[this.histPosX[0]] + ')'
            );
        },
        key_play: function() {

            if (this.is_a_Banner()) return;

            if (this.posY === -1) {
                if (this.posX === 0) {
                    Main_values.Main_Go = Main_HistoryLive;
                    this.history_exit();
                    Main_SwitchScreen();
                } else if (this.posX === 1) {
                    Main_values.Main_Go = Main_HistoryClip;
                    this.history_exit();
                    Main_SwitchScreen();
                } else Screens_histStart(this.screen);
            } else this.OpenVodStart();

        },
        addCell: function(cell) {
            if (!this.idObject[cell.data[7]]) {

                this.itemsCount++;
                this.idObject[cell.data[7]] = 1;

                this.tempHtml +=
                    Screens_createCellVod(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        cell.data,
                        this.screen,
                        cell.date,
                        cell.watched
                    );

                this.coloumn_id++;
            }
        },
        SwitchesIcons: ['play', 'movie', 'settings'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_LIVE,
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_CLIPS,
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_VIDEOS + STR_SPACE_HTML + STR_SETTINGS
                ],
                this.screen
            );
        },
    }, Base_obj);

    ScreenObj[Main_HistoryVod] = Screens_assign(ScreenObj[Main_HistoryVod], Base_History_obj);

    ScreenObj[Main_HistoryVod].addFocus = function(forceScroll, key) {
        this.AnimateThumb(this);
        Screens_addFocusVideo(forceScroll, key);
    };
    ScreenObj[Main_HistoryVod].Upsorting();
    ScreenObj[Main_HistoryVod].Set_Scroll();
}

function ScreensObj_HistoryClip() {
    ScreenObj[Main_HistoryClip] = Screens_assign({
        Type: 'clip',
        ids: Screens_ScreenIds('HistoryClip'),
        ScreenName: 'HistoryClip',
        table: 'stream_table_historyclip',
        screen: Main_HistoryClip,
        img_404: IMG_404_VOD,
        screenType: 2,
        histPosXName: 'HistoryClip_histPosX',
        histPosX: Main_getItemJson('HistoryClip_histPosX', [0, 0, 0, 0]),
        sethistDialog: function() {
            Screens_SethistDialogId(this.screen);
            Main_innerHTML("dialog_hist_text", STR_CLIPS + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_SETTINGS);
            this.sethistMainDialog();
        },
        setTODialog: function() {
            Main_RemoveClass('dialog_thumb_opt_setting_-1', 'hideimp');
            Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_CLIP_DIS);
        },
        history_Type: function() {
            return STR_CLIPS;
        },
        label_init: function() {
            Main_HistoryPos = 2;
            ScreensObj_TopLableUserInit(this.screen);

            ScreensObj_SetTopLable(
                STR_USER,
                STR_HISTORY + STR_SPACE_HTML + STR_CLIPS + STR_SPACE_HTML +
                '(' + this.sorting[this.histPosX[0]] + ')'
            );

        },
        key_play: function() {

            if (this.is_a_Banner()) return;

            if (this.posY === -1) {

                if (this.posX === 0) {

                    Main_values.Main_Go = Main_HistoryLive;
                    this.history_exit();
                    Main_SwitchScreen();

                } else if (this.posX === 1) {

                    Main_values.Main_Go = Main_HistoryVod;
                    this.history_exit();
                    Main_SwitchScreen();

                } else Screens_histStart(this.screen);

            } else {

                this.OpenClip();

            }

        },
        addCell: function(cell) {
            if (!this.idObject[cell.data[7]]) {

                this.itemsCount++;
                this.idObject[cell.data[7]] = 1;

                this.tempHtml +=
                    Screens_createCellClip(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        cell.data,
                        this.screen,
                        cell.date,
                        cell.watched
                    );

                this.coloumn_id++;
            }
        },
        SwitchesIcons: ['play', 'movie-play', 'settings'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_LIVE,
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_VIDEOS,
                    STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_CLIPS + STR_SPACE_HTML + STR_SETTINGS
                ],
                this.screen
            );
        },
    }, Base_obj);

    ScreenObj[Main_HistoryClip] = Screens_assign(ScreenObj[Main_HistoryClip], Base_History_obj);
    ScreenObj[Main_HistoryClip].Upsorting();
    ScreenObj[Main_HistoryClip].Set_Scroll();
}

function ScreensObj_addSwitches(StringsArray, key) {
    ScreenObj[key].TopRowCreated = true;
    ScreenObj[key].row = document.createElement('div');
    var thumbfollow, div, i = 0, len = StringsArray.length;

    for (i; i < len; i++) {
        thumbfollow = '<i class="icon-' + ScreenObj[key].SwitchesIcons[i] + ' stream_channel_follow_icon"></i>' + StringsArray[i];
        div = document.createElement('div');
        div.setAttribute('id', ScreenObj[key].ids[3] + 'y_' + i);
        div.className = 'stream_cell_period';
        div.innerHTML = '<div id="' + ScreenObj[key].ids[0] +
            'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + ScreenObj[key].ids[2] +
            'y_' + i + '" class="stream_channel_follow_game">' + thumbfollow + '</div></div>';
        ScreenObj[key].row.appendChild(div);
    }
    ScreenObj[key].tableDoc.appendChild(ScreenObj[key].row);
}


function ScreensObj_addBanner(obj, key, forceAdd) {

    ScreenObj[key].BannerCreated = true;

    var id = ScreenObj[key].row_id + '_0',
        idArray = ScreenObj[key].ids;

    ScreenObj[key].row = Screens_createRow(key);
    ScreenObj[key].Cells[ScreenObj[key].row_id] = ScreenObj[key].row;
    ScreenObj[key].row_id++;

    ScreenObj[key].DataObj[id] = obj;

    var div = document.createElement('div');
    div.setAttribute('id', ScreenObj[key].ids[3] + id);
    div.className = 'banner_holder';

    div.innerHTML = '<div class="inner_banner_holder" id="' + idArray[0] + id + '"' +
        (ScreenObj[key].screenType === 3 ? ' style="width: 97%;"' : '') +
        '><div class="banner_img_holder" id="' + idArray[0] + id + '" ><img id="' +
        idArray[1] + id + '" class="banner_img" alt="" src="' + obj.image + '" onerror="this.onerror=null;this.src=\'' + ScreenObj[key].img_404 +
        '\';" ></div><div class="banner_text_holder"><div style="text-align: center;" class="stream_text_holder">' + obj.text + '</div></div></div>';

    ScreenObj[key].row.appendChild(div);

    if (!ScreensObj_banner_added_section || forceAdd) {

        ScreenObj[key].tableDoc.appendChild(ScreenObj[key].row);
    }

    this.itemsCount += 3;
    this.coloumn_id += 3;

    //ScreenObj[key].BannerTime = new Date().getTime() + (60 * 60 * 1000);

    //ScreensObj_banner_added_section = true;
    ScreenObj[key].itemsCount += ScreenObj[key].ColoumnsCount;

}

function ScreensObj_CheckIsOpen(key, preventRefresh) {

    if (ScreenObj[Main_aGame].IsOpen === key) {

        ScreenObj[Main_aGame].IsOpen = 0;
        key = Main_aGame;

    } else if (ScreenObj[Main_AGameVod].IsOpen === key) {

        ScreenObj[Main_AGameVod].IsOpen = 0;
        key = Main_AGameVod;

    } else if (ScreenObj[Main_AGameClip].IsOpen === key) {

        ScreenObj[Main_AGameClip].IsOpen = 0;
        key = Main_AGameClip;

    }

    Screens_init(key, preventRefresh);
}

function ScreensObj_TopLableAgameInit(key) {

    if (Main_values.Main_OldgameSelected === null) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;

    Main_IconLoad('label_thumb', 'icon-return', STR_GOBACK);
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);

    if (!Main_A_equals_B_No_Case(Main_values.Main_OldgameSelected, Main_values.Main_gameSelected) ||
        !Main_A_equals_B_No_Case(ScreenObj[key].gameSelected, Main_values.Main_gameSelected)) {

        ScreenObj[key].status = false;

        if (ScreenObj[key].Cells &&
            ScreenObj[key].Cells.length && ScreenObj[key].gameSelected) {

            ScreenObj[key].BackupScreen(ScreenObj[key].gameSelected);
        }

    }

    ScreenObj[key].gameSelected = Main_values.Main_gameSelected;
    Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;

    if (Main_values.Sidepannel_IsUser ||
        Main_values.Main_BeforeAgame === Main_usergames) {

        Sidepannel_SetUserLables();

    } else {

        Sidepannel_SetDefaultLables();

    }

    Sidepannel_Sidepannel_Pos = Main_values.Main_BeforeAgame === Main_usergames ? 4 : 5;
    Sidepannel_SetTopOpacity(Main_values.Main_Go);

    Main_EventAgame(Main_values.Main_gameSelected);
}

function ScreensObj_TopLableAgameExit(key) {
    ScreenObj[key].gameSelected = Main_values.Main_gameSelected;
    Main_IconLoad('label_thumb', 'icon-options', STR_THUMB_OPTIONS_TOP);
}

function ScreensObj_TopLableUserInit(key) {
    ScreensObj_CheckUser(key);

    Sidepannel_SetUserLables();
    Sidepannel_SetTopOpacity(ScreenObj[key].screen);
}

function ScreensObj_CheckUser(key) {
    if (!AddUser_UserIsSet()) return;

    if (ScreenObj[key].OldUserName !== AddUser_UsernameArray[0].name) ScreenObj[key].status = false;
    ScreenObj[key].OldUserName = AddUser_UsernameArray[0].name;
}

function ScreensObj_SetTopLable(text, small_text) {
    Main_innerHTML('top_lable', text + STR_SPACE_HTML + (small_text ? '<div style="font-size: 65%;display: inline-block;">' + small_text + '</div>' : ""));
}

function ScreensObj_LiveCellArray(cell) {
    return [
        cell.preview.template,//0
        cell.channel.display_name,//1
        cell.channel.status,//2
        cell.game,//3
        Main_addCommas(cell.viewers),//4
        Main_videoqualitylang(cell.video_height, cell.average_fps, cell.channel.broadcaster_language),//5
        cell.channel.name,//6
        cell._id,//7 broadcast id
        Main_is_rerun(cell.broadcast_platform),//8
        cell.channel.logo,//9
        cell.channel.partner,//10
        Play_streamLiveAt(cell.created_at),//11
        cell.created_at,//12
        cell.viewers,//13
        cell.channel._id,//14
        cell.channel.broadcaster_language//15
    ];
}

function ScreensObj_VodCellArray(cell) {
    return [
        ScreensObj_VodGetPreview(cell.preview.template, cell.animated_preview_url),//0
        cell.channel.display_name,//1
        Main_videoCreatedAt(cell.created_at),//2
        cell.game,//3
        Main_addCommas(cell.views),//4
        cell.resolutions.chunked ? Main_videoqualitylang(cell.resolutions.chunked.slice(-4), (parseInt(cell.fps.chunked) || 0), cell.channel.broadcaster_language) : '',//5
        cell.channel.name,//6
        cell._id.substr(1),//7
        cell.animated_preview_url,//8
        cell.channel.broadcaster_language,//9
        twemoji.parse(cell.title),//10
        cell.length,//11
        cell.created_at,//12
        cell.views,//13
        cell.channel._id,//14
        cell.channel.logo,//15
        cell.channel.partner//16
    ];
}

function ScreensObj_ClipCellArray(cell) {
    return [
        cell.slug,//0
        cell.duration,//1
        cell.broadcaster.id,//2
        cell.game,//3
        cell.broadcaster.display_name,//4
        cell.broadcaster.logo.replace("150x150", "300x300"),//5
        cell.broadcaster.name,//6
        cell.tracking_id,//7
        (cell.vod !== null ? cell.vod.id : null),//8
        (cell.vod !== null ? cell.vod.offset : null),//9
        twemoji.parse(cell.title),//10
        '[' + cell.language.toUpperCase() + ']',//11
        cell.created_at,//12
        cell.views,//13
        Main_addCommas(cell.views),//14
        cell.thumbnails.medium,//15
        Main_videoCreatedAt(cell.created_at),//16
        cell.language//17
    ];
}


function ScreensObj_VodGetPreview(preview, animated_preview_url) {
    //When the live hasn't yet ended the img is a default gray one, but the final is alredy generated for some reason not used
    if (!Main_IsOn_OSInterface) {

        if (!Main_A_includes_B(preview + '', '404_processing') && !Main_A_includes_B(preview + '', 'cf_vods')) {

            console.log('Revise vod links');

        }

    }
    return Main_A_includes_B(preview + '', '404_processing') ?
        ScreensObj_VodGetPreviewFromAnimated(animated_preview_url) : preview.replace("{width}x{height}", Main_VideoSize);
}

function ScreensObj_VodGetPreviewFromAnimated(animated_preview_url) {
    var animated_preview = animated_preview_url.split('/');

    return 'https://static-cdn.jtvnw.net/cf_vods/' + animated_preview[2].split('.')[0] + '/' + animated_preview[3] +
        '/thumb/thumb0-' + Main_VideoSize + '.jpg';
}

function ScreensObj_AnimateThumbId(screen) {
    Main_clearInterval(screen.AnimateThumbId);
    if (!Settings_Obj_default("videos_animation")) return;
    var div = Main_getElementById(screen.ids[5] + screen.posY + '_' + screen.posX);

    // Only load the animation if it can be loaded
    // This prevent starting animating before it has loaded or animated a empty image
    screen.Vod_newImg.onload = function() {
        this.onload = null;
        Main_AddClass(screen.ids[1] + screen.posY + '_' + screen.posX, 'opacity_zero');
        div.style.backgroundSize = div.offsetWidth + "px";
        var frame = 0;
        screen.AnimateThumbId = Main_setInterval(
            function() {
                // 10 = quantity of frames in the preview img
                div.style.backgroundPosition = "0px " + ((++frame % 10) * (-div.offsetHeight)) + "px";
            },
            650,
            screen.AnimateThumbId
        );
    };

    screen.Vod_newImg.src = div.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
}
