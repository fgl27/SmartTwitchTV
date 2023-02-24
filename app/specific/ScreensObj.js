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
var Main_ItemsReloadLimitVideo = Math.floor(Main_ItemsLimitVideo / Main_ColoumnsCountVideo / Main_ReloadLimitOffsetVideos);

var Main_ItemsLimitGame = 45;
var Main_ColoumnsCountGame = 5;
var Main_ItemsReloadLimitGame = Math.floor(Main_ItemsLimitGame / Main_ColoumnsCountGame / Main_ReloadLimitOffsetGames);

var Main_ItemsLimitChannel = 48;
var Main_ColoumnsCountChannel = 6;
var Main_ItemsReloadLimitChannel = Math.floor(Main_ItemsLimitChannel / Main_ColoumnsCountChannel / Main_ReloadLimitOffsetVideos);

var ChannelClip_game = '';
var ChannelClip_views = '';
var ChannelClip_title = '';
var ChannelClip_playUrl = '';
var ChannelClip_createdAt = '';
var ChannelClip_language = '';
var ChannelClip_Id = 0;
var ChannelClip_game_Id = null;

var ChannelVod_vodOffset = 0;
var ChannelVod_language = '';
var ChannelVod_createdAt = '';
var ChannelVod_views = '';
var ChannelVod_title = '';
var ChannelVod_game = '';

var DefaultPreviewDelay = 200; //To avoid multiple simultaneous request
var DefaultHttpGetTimeout = 30000;
var noop_fun = function () {};
var ScreensObj_banner_added_section = false;

var AffiliatedTIme = 60 * 120 * 1000;

var userGameQuery =
    '{"query":"{user(id: \\"%x\\") {followedGames(first: 100,type:LIVE){nodes {id displayName boxArtURL viewersCount channelsCount }}}}"}';
var featuredQuery =
    '{"query":"{featuredStreams(first:10,acceptedMature:true%x){stream{type,game{displayName,id},title,id,previewImageURL,viewersCount,createdAt,broadcaster{roles{isPartner},id,login,displayName,language,profileImageURL(width: 300)}}}}"}';

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
        SetPreviewEnable: function () {
            this.PreviewEnable =
                (this.screenType === 0 && Settings_Obj_default('show_live_player')) ||
                (this.screenType === 1 && Settings_Obj_default('show_vod_player')) ||
                (this.screenType === 2 && Settings_Obj_default('show_clip_player'));
        },
        AutoRefreshId: null,
        key_fun_start: function () {
            return Screens_handleKeyDown.bind(null, this.screen);
        },
        exit_fun: function () {
            Screens_exit(this.screen);
        },
        init_fun: function (preventRefresh) {
            Screens_init(this.screen, preventRefresh);
        },
        start_fun: function () {
            Screens_StartLoad(this.screen);
        },
        loadDataSuccess: function () {
            Screens_loadDataSuccess(this.screen);
        },
        Set_Scroll: function () {
            this.ScrollDoc = Main_getElementById(this.ids[4]);
            this.tableDoc = Main_getElementById(this.table);
        },
        addrow: Screens_addrow,
        key_exit: function (goSidepanel) {
            //TODO overwrite this on if object
            Screens_RemoveAllFocus(this.screen);

            if (this.screen === Main_aGame && !goSidepanel) {
                if (Main_values.Games_return) {
                    Main_values.Main_Go = Main_SearchGames;
                    Main_values.Main_gameSelected_id = Main_values.gameSelected_IdOld;
                    Main_values.gameSelected_IdOld = null;
                } else {
                    Main_values.Main_Go = Main_values.Main_BeforeAgame;
                    Main_values.Main_BeforeAgame = Main_games;
                }

                Screens_BasicExit(Main_values.Main_Go, this.screen);
                Main_SwitchScreen();
            } else if ((this.screen === Main_SearchLive || this.screen === Main_SearchGames || this.screen === Main_SearchChannels) && !goSidepanel) {
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
        concatenate: function (responseObj) {
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
                this.setBackupData(responseObj, this.data, this.lastRefresh, this.gameSelected_Id, this.ContentLang, this.Lang);
            }

            //console.log(this.data);
        },
        setBackupData: function (responseObj, data, lastScreenRefresh, game, ContentLang, Lang) {
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

            if (!this.BackupData.lastScreenRefresh[game] || lastScreenRefresh >= this.BackupData.lastScreenRefresh[game]) {
                if (
                    (this.BackupData.data[game] && this.BackupData.data[game].length >= data.length) ||
                    (this.BackupData.ContentLang[game] && !Main_A_equals_B(this.BackupData.ContentLang[game], ContentLang)) ||
                    (this.BackupData.Lang[game] && !Main_A_equals_B(this.BackupData.Lang[game], Lang))
                ) {
                    return;
                }

                this.BackupData.data[game] = JSON.parse(JSON.stringify(data));
                this.BackupData.responseObj[game] = responseObj;
                this.BackupData.lastScreenRefresh[game] = lastScreenRefresh;

                this.BackupData.ContentLang[game] = Main_ContentLang;
                this.BackupData.Lang[game] = Settings_AppLang;
                this.BackupData.offsettopFontsize[game] = this.offsettopFontsize
                    ? this.offsettopFontsize
                    : Settings_Obj_default('global_font_offset');
            }
        },
        eraseBackupData: function (game) {
            if (this.BackupData) {
                this.BackupData.data[game] = null;
                this.BackupData.ContentLang[game] = null;
                this.BackupData.Lang[game] = null;
                this.BackupData.lastScreenRefresh[game] = 0;
            }
        },
        CheckBackupData: function (game) {
            return (
                this.BackupData &&
                this.BackupData.data[game] &&
                this.BackupData.data[game].length &&
                Main_A_equals_B(this.BackupData.ContentLang[game], Main_ContentLang) &&
                Main_A_equals_B(this.BackupData.Lang[game], Settings_AppLang) &&
                this.BackupData.offsettopFontsize[game] === Settings_Obj_default('global_font_offset') &&
                (!Settings_Obj_default('auto_refresh_screen') ||
                    new Date().getTime() < this.BackupData.lastScreenRefresh[game] + Settings_GetAutoRefreshTimeout())
            );
        },
        restoreBackup: function () {
            var game = Main_values.Main_gameSelected_id;

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
        BackupScreen: function (game) {
            if (!this.ScreenBackup) {
                this.ScreenBackup = {};
                this.ScreenBackup[game] = {};
            } else if (!this.ScreenBackup[game]) {
                this.ScreenBackup[game] = {};
            }

            if (!this.data || !this.data.length) {
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
        RestoreBackupScreen: function (game) {
            this.ScrollDoc.style.transform = this.ScreenBackup[game].style;
            this.tableDoc.innerHTML = this.ScreenBackup[game].innerHTML;
            this.Cells = Main_Slice(this.ScreenBackup[game].Cells);

            //Backup of cells and the innerHTML disconnects the div in the table and on the Backup array
            var array = this.tableDoc.getElementsByClassName(this.rowClass),
                i = 0,
                len = array.length;

            for (i; i < len; i++) {
                this.Cells[array[i].id.split(this.ids[6])[1]] = array[i];
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
        screen_view: function () {
            if (this.ScreenName) Main_EventScreen(this.ScreenName);
        },
        OpenVodStart: function () {
            Main_OpenVodStart(Screens_GetObj(this.screen), this.posY + '_' + this.posX, this.ids, this.key_fun, this.ScreenName);
        },
        OpenClip: function () {
            Main_OpenClip(Screens_GetObj(this.screen), this.posY + '_' + this.posX, this.ids, this.key_fun, this.ScreenName);
        },
        OpenLiveStream: function (checkHistory) {
            Main_OpenLiveStream(Screens_GetObj(this.screen), this.posY + '_' + this.posX, this.ids, this.key_fun, checkHistory, this.ScreenName);
        },
        hasBanner: function () {
            return this.showBanner && Settings_Obj_default('show_affiliate');
        },
        addBanner: function () {
            return null;
        },
        emptyBanner: function (forceAdd) {
            ScreensObj_addBanner(
                {
                    image: 'https://fgl27.github.io/SmartTwitchTV/apk/app/src/main/res/mipmap-nodpi/ic_splash.png',
                    text: this.emptyContent_STR ? this.emptyContent_STR() : STR_REFRESH_PROBLEM_ENTER,
                    empty: true
                },
                this.screen,
                forceAdd
            );
        },
        addEmptyContentBanner: function (showWarning) {
            if (this.hasBanner()) {
                this.addBanner();

                if (showWarning) {
                    Main_showWarningDialog(STR_REFRESH_PROBLEM, 0, true);
                }
            } else {
                this.emptyBanner();
            }

            this.itemsCount = 1;
            this.emptyContent = false;
        },
        is_a_Banner: function () {
            var obj_id = this.posY + '_' + this.posX;

            if (this.posY > -1 && this.DataObj[obj_id].image) {
                this.banner_click(obj_id);

                return true;
            }

            return false;
        },
        banner_click: function (obj_id) {
            if (this.DataObj[obj_id] && this.DataObj[obj_id].event_name) {
                Main_EventBanner(this.DataObj[obj_id].event_name + '_click', this.ScreenName, this.DataObj[obj_id].image);
            }

            if (this.DataObj[obj_id] && this.DataObj[obj_id].url) {
                UserLiveFeed_OpenBannerUrl(this.DataObj[obj_id]);
            } else {
                Main_ReloadScreen();
            }
        }
    };

    Base_Vod_obj = {
        ItemsLimit: Main_ItemsLimitVideo,
        ColoumnsCount: Main_ColoumnsCountVideo,
        ItemsReloadLimit: Main_ItemsReloadLimitVideo,
        thumbclass: 'stream_thumbnail_live_holder',
        rowClass: 'animate_height_transition',
        histPosXName: 'HistoryVod_histPosX',
        screenType: 1,
        addFocus: function (forceScroll, key) {
            this.AnimateThumb(this);
            Screens_addFocusVideo(forceScroll, key);
        },
        setTODialog: function () {
            Main_AddClass('dialog_thumb_opt_setting_-1', 'hideimp');
            Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_VOD_DIS);
        },
        setMax: function (tempObj) {
            if (this.useHelix) {
                this.cursor = tempObj.pagination.cursor;
                if (!this.cursor || this.cursor === '') this.dataEnded = true;
            } else {
                if (tempObj[this.object].length < Main_ItemsLimitMax - 5) this.dataEnded = true;
            }
        },
        img_404: IMG_404_VOD,
        HasSwitches: true,
        period: ['day', 'week', 'month', 'all'],
        AnimateThumbId: null,
        HasAnimateThumb: true,
        Vod_newImg: new Image(),
        AnimateThumb: ScreensObj_AnimateThumbId,
        addCell: function (cell) {
            if (!this.idObject[cell.id]) {
                this.itemsCount++;
                this.idObject[cell.id] = 1;

                this.tempHtml += Screens_createCellVod(this.row_id + '_' + this.coloumn_id, this.ids, ScreensObj_VodCellArray(cell), this.screen);

                this.coloumn_id++;
            }
        }
    };

    Base_Live_obj = {
        ItemsReloadLimit: Main_ItemsReloadLimitVideo,
        ItemsLimit: Main_ItemsLimitVideo,
        ColoumnsCount: Main_ColoumnsCountVideo,
        rowClass: 'animate_height_transition',
        thumbclass: 'stream_thumbnail_live_holder',
        histPosXName: 'HistoryLive_histPosX',
        screenType: 0,
        img_404: IMG_404_VIDEO,
        setMax: function (tempObj) {
            if (this.useHelix) {
                this.cursor = tempObj.pagination.cursor;
                if (!this.cursor || this.cursor === '') this.dataEnded = true;
            } else {
                this.MaxOffset = tempObj._total;

                if (!tempObj[this.object]) this.dataEnded = true;
                else if (typeof this.MaxOffset === 'undefined') {
                    if (tempObj[this.object].length < 90) this.dataEnded = true;
                } else {
                    if (this.data.length >= this.MaxOffset) this.dataEnded = true;
                }
            }
        },
        setTODialog: function () {
            Main_AddClass('dialog_thumb_opt_setting_-1', 'hideimp');
            Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_LIVE_DIS);
        },
        addCell: function (cell) {
            this.addCellTemp(cell);
        },
        check_offset: function () {
            if (this.offset >= 900 || (typeof this.MaxOffset !== 'undefined' && this.offset && this.offset + Main_ItemsLimitMax > this.MaxOffset))
                this.dataEnded = true;
        },
        addCellTemp: function (cell) {
            var id_cell = this.useHelix ? cell.user_id : cell.channel._id;

            if (!this.idObject[id_cell]) {
                this.itemsCount++;
                this.idObject[id_cell] = 1;

                this.tempHtml += Screens_createCellLive(this.row_id + '_' + this.coloumn_id, this.ids, ScreensObj_LiveCellArray(cell), this.screen);

                this.coloumn_id++;
            }
        },
        key_play: function () {
            if (this.is_a_Banner()) return;

            if (this.itemsCount) {
                Main_RemoveClass(this.ids[1] + this.posY + '_' + this.posX, 'opacity_zero');
                this.OpenLiveStream(false);
            }
        },
        refreshThumb: function () {
            if (!this.DataObj || !this.DataObj.length) {
                return;
            }
            var url = this.DataObj[this.posY + '_' + this.posX][0].replace('{width}x{height}', Main_VideoSize) + Main_randomImg;
            var div = Main_getElementById(this.ids[1] + this.posY + '_' + this.posX);

            Play_seek_previews_img.onload = function () {
                div.src = url;
            };

            Play_seek_previews_img.src = url;
        },
        addFocus: function (forceScroll, key) {
            this.refreshThumb(this);
            Screens_addFocusVideo(forceScroll, key);
        }
    };

    Base_Clip_obj = {
        HeadersArray: Main_Bearer_Headers,
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
        object: 'data',
        period: ['day', 'week', 'month', 'all'],
        img_404: IMG_404_VOD,
        setTODialog: function () {
            Main_AddClass('dialog_thumb_opt_setting_-1', 'hideimp');
            Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_CLIP_DIS);
        },
        HasSwitches: true,
        SwitchesIcons: ['history', 'play-1'],
        addSwitches: function () {
            ScreensObj_addSwitches([STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_CLIP, STR_SPACE_HTML + STR_SPACE_HTML + STR_PLAY_ALL], this.screen);
        },
        setMax: function (tempObj) {
            if (this.useHelix) {
                this.cursor = tempObj.pagination.cursor;
                if (!this.cursor) this.dataEnded = true;
            } else {
                this.cursor = tempObj._cursor;
                if (this.cursor === '') this.dataEnded = true;
            }
        },
        key_play: function () {
            if (this.is_a_Banner()) return;

            if (this.posY === -1) {
                if (!this.loadingData) {
                    if (!this.posX) {
                        Screens_PeriodStart(this.screen);
                        return;
                    } else if (!this.DataObj['0_0'].image) {
                        PlayClip_All = true;
                        Screens_removeFocusFollow(this.screen);
                        this.posX = 0;
                        this.posY = 0;
                    } else {
                        return;
                    }
                } else return;
            }

            this.OpenClip();
        },
        Cells: [],
        addCell: function (cell) {
            var idValue = this.useHelix ? cell.id : cell.tracking_id;

            if (!this.idObject[idValue]) {
                this.itemsCount++;
                this.idObject[idValue] = 1;

                this.tempHtml += Screens_createCellClip(
                    this.row_id + '_' + this.coloumn_id,
                    this.ids,
                    ScreensObj_ClipCellArray(cell, this.isKraken),
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
        key_play: function () {
            if (this.is_a_Banner()) return;

            Main_removeFocus(this.posY + '_' + this.posX, this.ids);

            var data = Screens_GetObj(this.screen);

            Main_values.Main_gameSelected_id = data[3];
            Main_values.Main_gameSelected = data[1];

            Main_removeEventListener('keydown', this.key_fun);
            Main_values.Main_BeforeAgame = this.screen;
            Main_values.Main_Go = Main_aGame;
            Main_values.Main_BeforeAgameisSet = true;

            Main_addFocusVideoOffset = 0;
            Main_removeEventListener('keydown', this.key_fun);
            Main_HideElementWithEle(this.ScrollDoc);

            Main_SwitchScreen();
        },
        setMax: function (tempObj) {
            if (this.useHelix) {
                this.cursor = tempObj.pagination.cursor;
                if (!this.cursor || this.cursor === '') this.dataEnded = true;
            } else {
                this.MaxOffset = tempObj._total;
                if (this.data.length >= this.MaxOffset) this.dataEnded = true;
            }
        },
        addCell: function (cell) {
            var hasLive = this.isLive || this.screen === Main_games;
            var game = this.hasGameProp && !this.isQuery ? cell.game : cell;

            var id_cell = this.useHelix || this.isQuery ? game.id : game._id;

            if (!this.idObject[id_cell]) {
                this.itemsCount++;
                this.idObject[id_cell] = 1;

                if (this.useHelix) {
                    this.tempHtml += Screens_createCellGame(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        [
                            game.box_art_url ? game.box_art_url.replace(this.isSearch ? '52x72' : '{width}x{height}', Main_GameSize) : '', //0
                            game.name, //1
                            '', //2
                            id_cell //3
                        ],
                        this.screen
                    );
                } else if (this.isQuery) {
                    if (!game) {
                        return;
                    }
                    this.tempHtml += Screens_createCellGame(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        [
                            game.boxArtURL ? game.boxArtURL.replace('{width}x{height}', Main_GameSize) : '', //0
                            game.displayName, //1
                            (cell.channelsCount ? Main_addCommas(cell.channelsCount) : 0) +
                                STR_SPACE_HTML +
                                STR_CHANNELS +
                                STR_BR +
                                STR_FOR +
                                (cell.viewersCount ? Main_addCommas(cell.viewersCount) : 0) +
                                STR_SPACE_HTML +
                                Main_GetViewerStrings(cell.viewersCount ? cell.viewersCount : 0), //2
                            id_cell //3
                        ],
                        this.screen
                    );
                } else {
                    this.tempHtml += Screens_createCellGame(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        [
                            game.box && game.box.template ? game.box.template.replace('{width}x{height}', Main_GameSize) : '', //0
                            game.name, //1
                            hasLive
                                ? Main_addCommas(cell.channels) +
                                  STR_SPACE_HTML +
                                  STR_CHANNELS +
                                  STR_BR +
                                  STR_FOR +
                                  Main_addCommas(cell.viewers) +
                                  STR_SPACE_HTML +
                                  Main_GetViewerStrings(cell.viewers)
                                : '', //2
                            game._id //3
                        ],
                        this.screen
                    );
                }

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
        setMax: function (tempObj) {
            if (this.useHelix) {
                this.cursor = tempObj.pagination.cursor;
                if (!this.cursor || this.cursor === '') this.dataEnded = true;
            } else {
                this.MaxOffset = tempObj._total;
                if (this.data.length >= this.MaxOffset || typeof this.MaxOffset === 'undefined') this.dataEnded = true;
            }
        },
        addCellTemp: function (cell) {
            if (!this.idObject[cell.id]) {
                this.itemsCount++;
                this.idObject[cell.id] = 1;

                this.tempHtml += Screens_createCellChannel(
                    this.row_id + '_' + this.coloumn_id,
                    this.ids,
                    [cell.broadcaster_login, cell.id, cell.thumbnail_url, cell.display_name, null],
                    this.screen
                );

                this.coloumn_id++;
            }
        },
        base_key_play: function (go_screen, IsFollowing) {
            if (this.is_a_Banner()) return;

            if (Main_ThumbOpenIsNull(this.posY + '_' + this.posX, this.ids[0])) return;

            var data = Screens_GetObj(this.screen);

            Main_values.Main_selectedChannel_id = data[1];
            Main_values.Main_selectedChannelDisplayname = data[3];
            Main_values.Main_selectedChannelLogo = data[2];
            Main_values.Main_selectedChannel = data[0];

            Main_removeEventListener('keydown', this.key_fun);
            Main_values.Main_BeforeChannel = go_screen;
            Main_values.Main_Go = Main_ChannelContent;
            Main_values.Main_BeforeChannelisSet = true;
            AddCode_IsFollowing = IsFollowing;
            ChannelContent_UserChannels = IsFollowing;
            Screens_exit(this.screen);
            Main_SwitchScreen();
        }
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
        emptyContent_STR: function () {
            return STR_HISTORY_EMPTY_CONTENT;
        },
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
        Upsorting: function () {
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
        UpEna: function () {
            this.histEna = [STR_YES, STR_NO];

            this.histClean = [STR_YES, STR_NO];
        },
        histArrays: [],
        UpArrays: function () {
            this.histArrays = [this.sorting, this.histEna, [STR_PRESS_ENTER_D], this.histClean];
        },
        set_url: noop_fun,
        history_concatenate: function () {
            this.streamerID = {};
            this.data = JSON.parse(JSON.stringify(Main_values_History_data[AddUser_UsernameArray[0].id][this.Type]));
            Main_History_Sort(this.data, this.sortingValues[this.histPosX[0]][0], this.sortingValues[this.histPosX[0]][1]);
            this.dataEnded = true;
            this.loadDataSuccess();
            this.loadingData = false;
        },
        history_exit: function () {
            if (this.status) {
                Screens_removeFocusFollow(this.screen);
                this.posY = 0;
                this.posX = 0;
                Main_AddClass(this.ids[0] + '0_' + this.posX, Main_classThumb);
            }
            Main_removeEventListener('keydown', this.key_fun);
            Main_HideElementWithEle(this.ScrollDoc);
        },
        sethistMainDialog: function () {
            this.Upsorting();
            this.UpEna();
            this.UpArrays();

            Screens_histSetArrow(this.screen);

            Main_textContent('dialog_hist_val_1', this.histArrays[1][this.histPosX[1]]);

            //History dialog pos 4 was added after, push in case was saved before the change
            if (this.histPosX.length < 4) this.histPosX.push(0);

            Main_textContent('dialog_hist_val_3', this.histArrays[3][this.histPosX[3]]);

            Main_getElementById('dialog_hist_left_1').style.opacity = '0';
            Main_getElementById('dialog_hist_right_1').style.opacity = '0';
            this.histPosXTemp = Main_Slice(this.histPosX);
        }
    };
}

function ScreensObj_InitVod() {
    var key = Main_Vod;

    ScreenObj[key] = Screens_assign(
        {
            periodMaxPos: 4,
            HeadersArray: Main_base_array_header,
            key_pgDown: Main_Clip,
            key_pgUp: Main_games,
            object: 'vods',
            ids: Screens_ScreenIds('Vod', key),
            ScreenName: 'Vod',
            table: 'stream_table_vod',
            screen: key,
            highlightSTR: 'Vod_highlight',
            CheckContentLang: 1,
            ContentLang: '',
            highlight: Main_getItemBool('Vod_highlight', false),
            periodPos: Main_getItemInt('vod_periodPos', 2),
            base_url: Main_kraken_api + 'videos/top?limit=' + Main_ItemsLimitMax,
            set_url: function () {
                this.url =
                    this.base_url +
                    '&broadcast_type=' +
                    (this.highlight ? 'highlight' : 'archive') +
                    '&sort=views&offset=' +
                    this.offset +
                    '&period=' +
                    this.period[this.periodPos - 1] +
                    (Main_ContentLang !== '' ? '&language=' + Main_ContentLang : '');
            },
            key_play: function () {
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
            addSwitches: function () {
                ScreensObj_addSwitches(
                    [STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_VOD, STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_CLIP],
                    this.screen
                );
            },
            label_init: function () {
                ScreensObj_CheckUser(this.screen);

                Sidepannel_SetDefaultLabels();
                Main_values.Sidepannel_IsUser = false;
                Sidepannel_SetTopOpacity(this.screen);
                this.SetPeriod();
            },
            SetPeriod: function () {
                Main_setItem('vod_periodPos', this.periodPos);
                ScreensObj_SetTopLable(STR_VIDEOS, (this.highlight ? STR_HIGHLIGHTS : STR_VODS) + STR_SPACE_HTML + Main_Periods[this.periodPos - 1]);
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Vod_obj);
    ScreenObj[key].Set_Scroll();
}

function ScreensObj_InitChannelVod() {
    var key = Main_ChannelVod;

    ScreenObj[key] = Screens_assign(
        {
            useHelix: true,
            periodMaxPos: 2,
            HeadersArray: Main_base_array_header,
            key_pgDown: Main_ChannelClip,
            object: 'data',
            ids: Screens_ScreenIds('ChannelVod', key),
            ScreenName: 'ChannelVod',
            table: 'stream_table_channel_vod',
            screen: key,
            time: ['time', 'views'],
            extraoffset: 0,
            OffSetPos: 0,
            highlightSTR: 'ChannelVod_highlight',
            highlight: Main_getItemBool('ChannelVod_highlight', false),
            periodPos: Main_getItemInt('ChannelVod_periodPos', 1),
            base_url: Main_helix_api + 'videos?first=' + Main_ItemsLimitMax + '&user_id=',
            set_url: function () {
                this.url =
                    this.base_url +
                    Main_values.Main_selectedChannel_id +
                    '&type=' +
                    (this.highlight ? 'highlight' : 'archive') +
                    '&sort=' +
                    this.time[this.periodPos - 1] +
                    (this.cursor ? '&after=' + this.cursor : '');
            },
            key_play: function () {
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
                    }
                    //else Screens_OffSetStart(this.screen, click);
                } else this.OpenVodStart();
            },
            SwitchesIcons: ['movie-play', 'history'],
            addSwitches: function () {
                ScreensObj_addSwitches(
                    [STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_VOD, STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_TYPE],
                    this.screen
                );
            },
            lastselectedChannel: '',
            label_init: function () {
                ScreensObj_CheckUser(this.screen);

                if (!Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
                if (Main_values.Main_selectedChannel_id !== this.lastselectedChannel) {
                    this.OffSetPos = 0;
                    this.extraoffset = 0;
                    this.status = false;
                }
                this.lastselectedChannel = Main_values.Main_selectedChannel_id;
                Main_cleanTopLabel();
                Main_IconLoad('label_thumb', 'icon-return', STR_GOBACK);
                this.SetPeriod();
            },
            SetPeriod: function () {
                Main_setItem('UserVod_periodPos', this.periodPos);

                ScreensObj_SetTopLable(
                    Main_values.Main_selectedChannelDisplayname,
                    (this.highlight ? STR_HIGHLIGHTS : STR_VODS) + (this.periodPos === 1 ? STR_RECENT : STR_VIWES) //+ ',' + STR_OFFSET + ScreenObj[this.screen].extraoffset
                );
            },
            label_exit: function () {
                Main_RestoreTopLabel();
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Vod_obj);
    ScreenObj[key].Set_Scroll();
}

function ScreensObj_InitAGameVod() {
    var key = Main_AGameVod;

    ScreenObj[key] = Screens_assign(
        {
            useHelix: true,
            periodMaxPos: 4,
            HeadersArray: Main_base_array_header,
            object: 'data',
            key_pgDown: Main_Clip,
            key_pgUp: Main_Featured,
            ids: Screens_ScreenIds('AGameVod', key),
            ScreenName: 'AGameVod',
            table: 'stream_table_a_game_vod',
            screen: key,
            CheckContentLang: 1,
            ContentLang: '',
            hasBackupData: true,
            highlightSTR: 'AGameVod_highlight',
            highlight: Main_getItemBool('AGameVod_highlight', false),
            periodPos: Main_getItemInt('AGameVod_periodPos', 2),
            base_url: Main_helix_api + 'videos?first=' + Main_ItemsLimitMax + '&game_id=',
            set_url: function () {
                this.url =
                    this.base_url +
                    Main_values.Main_gameSelected_id +
                    '&type=' +
                    (this.highlight ? 'highlight' : 'archive') +
                    '&sort=views' +
                    '&period=' +
                    this.period[this.periodPos - 1] +
                    (this.cursor ? '&after=' + this.cursor : '') +
                    (Main_ContentLang !== '' ? '&language=' + Main_ContentLang : '');
            },
            key_play: function () {
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
            addSwitches: function () {
                ScreensObj_addSwitches(
                    [STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_VOD, STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_CLIP],
                    this.screen
                );
            },
            OldgameSelected: '',
            label_init: function () {
                ScreensObj_CheckUser(this.screen);

                ScreensObj_TopLableAgameInit(this.screen);
                this.SetPeriod();
            },
            label_exit: function () {
                ScreensObj_TopLableAgameExit(this.screen);
            },
            SetPeriod: function () {
                Main_setItem('AGameVod_periodPos', this.periodPos);

                if (Main_values.Main_gameSelected) {
                    ScreensObj_SetTopLable(
                        Main_values.Main_gameSelected,
                        (this.highlight ? STR_HIGHLIGHTS : STR_VODS) + STR_SPACE_HTML + Main_Periods[this.periodPos - 1]
                    );
                } else {
                    ScreensObj_UpdateGameInfo(2, this.screen);
                }
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Vod_obj);
    ScreenObj[key].Set_Scroll();
}

function ScreensObj_InitUserVod() {
    var key = Main_UserVod;

    ScreenObj[key] = Screens_assign(
        {
            periodMaxPos: 2,
            UseToken: true,
            object: 'videos',
            key_pgDown: Main_UserChannels,
            key_pgUp: Main_usergames,
            ids: Screens_ScreenIds('UserVod', key),
            ScreenName: 'UserVod',
            table: 'stream_table_user_vod',
            screen: key,
            IsUser: true,
            time: ['time', 'views'],
            highlightSTR: 'UserVod_highlight',
            highlight: Main_getItemBool('UserVod_highlight', false),
            periodPos: Main_getItemInt('UserVod_periodPos', 1),
            base_url: Main_kraken_api + 'videos/followed?limit=' + Main_ItemsLimitMax,
            set_url: function () {
                this.token = Main_OAuth + AddUser_UsernameArray[0].access_token;
                Main_Headers[2][1] = this.token;
                this.HeadersArray = Main_Headers;

                this.url =
                    this.base_url +
                    '&broadcast_type=' +
                    (this.highlight ? 'highlight' : 'archive') +
                    '&sort=' +
                    this.time[this.periodPos - 1] +
                    '&offset=' +
                    this.offset;
            },
            key_play: function () {
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
            addSwitches: function () {
                ScreensObj_addSwitches(
                    [STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_VOD, STR_SPACE_HTML + STR_SPACE_HTML + STR_SWITCH_TYPE],
                    this.screen
                );
            },
            label_init: function () {
                ScreensObj_CheckUser(this.screen);

                this.SetPeriod();
                ScreensObj_TopLableUserInit(this.screen);
            },
            SetPeriod: function () {
                Main_setItem('UserVod_periodPos', this.periodPos);

                ScreensObj_SetTopLable(STR_USER, (this.highlight ? STR_HIGHLIGHTS : STR_VODS) + (this.periodPos === 1 ? STR_RECENT : STR_VIWES));
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Vod_obj);
    ScreenObj[key].Set_Scroll();
}

function ScreensObj_InitLive() {
    var key = Main_Live;

    ScreenObj[key] = Screens_assign(
        {
            useHelix: true,
            HeadersArray: Main_Bearer_Headers,
            ids: Screens_ScreenIds('Live', key),
            table: 'stream_table_live',
            screen: key,
            object: 'data',
            ScreenName: 'Live',
            key_pgDown: Main_Featured,
            key_pgUp: Main_Clip,
            CheckContentLang: 1,
            ContentLang: '',
            base_url: Main_helix_api + 'streams?first=' + Main_ItemsLimitMax,
            set_url: function () {
                this.url =
                    this.base_url + (this.cursor ? '&after=' + this.cursor : '') + (Main_ContentLang !== '' ? '&language=' + Main_ContentLang : '');
            },
            label_init: function () {
                Sidepannel_SetDefaultLabels();
                Main_values.Sidepannel_IsUser = false;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_LIVE);
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Live_obj);
    ScreenObj[key].Set_Scroll();
}

function ScreensObj_InitSearchLive() {
    var key = Main_SearchLive;

    ScreenObj[key] = Screens_assign(
        {
            useHelix: true,
            HeadersArray: Main_base_array_header,
            ids: Screens_ScreenIds('SearchLive', key),
            ScreenName: 'SearchLive',
            table: 'stream_table_search_live',
            screen: key,
            object: 'streams',
            base_url: Main_kraken_api + 'search/streams?limit=' + Main_ItemsLimitMax + '&query=',
            set_url: function () {
                this.check_offset();
                this.url = this.base_url + encodeURIComponent(Main_values.Search_data) + '&offset=' + this.offset;
            },
            label_init: function () {
                Main_values.Search_isSearching = true;
                Main_cleanTopLabel();
                if (this.lastData !== Main_values.Search_data) this.status = false;
                this.lastData = Main_values.Search_data;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_SEARCH + STR_SPACE_HTML + STR_LIVE, "'" + Main_values.Search_data + "'");
            },
            label_exit: function () {
                Main_values.Search_isSearching = false;
                if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Live_obj);
    ScreenObj[key].Set_Scroll();
}

function ScreensObj_InitUserLive() {
    var key = Main_UserLive;

    ScreenObj[key] = Screens_assign(
        {
            useHelix: true,
            UseToken: true,
            ids: Screens_ScreenIds('UserLive', key),
            ScreenName: 'UserLive',
            table: 'stream_table_user_live',
            screen: key,
            object: 'data',
            IsUser: true,
            key_pgDown: Main_usergames,
            key_pgUp: Main_HistoryLive,
            base_url: Main_helix_api + 'streams/',
            loadChannelOffsset: 0,
            followerChannels: [],
            followerChannelsDone: false,
            set_url: function () {
                this.url =
                    this.base_url +
                    'followed?user_id=' +
                    AddUser_UsernameArray[0].id +
                    '&first=' +
                    Main_ItemsLimitMax +
                    (this.cursor ? '&after=' + this.cursor : '');
            },
            label_init: function () {
                ScreensObj_TopLableUserInit(this.screen);
                ScreensObj_SetTopLable(STR_USER, STR_LIVE_CHANNELS);
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Live_obj);

    ScreenObj[key].Set_Scroll();
}

function ScreensObj_InitAGame() {
    var key = Main_aGame;

    ScreenObj[key] = Screens_assign(
        {
            useHelix: true,
            HeadersArray: Main_base_array_header,
            ids: Screens_ScreenIds('AGame', key),
            ScreenName: 'AGame',
            table: 'stream_table_a_game',
            screen: key,
            object: 'data',
            CheckContentLang: 1,
            ContentLang: '',
            key_pgDown: Main_Clip,
            key_pgUp: Main_Featured,
            hasBackupData: true,
            base_url: Main_helix_api + 'streams?game_id=',
            set_url: function () {
                this.url =
                    this.base_url +
                    this.gameSelected_Id +
                    '&first=' +
                    Main_ItemsLimitMax +
                    (this.cursor ? '&after=' + this.cursor : '') +
                    (Main_ContentLang !== '' ? '&language=' + Main_ContentLang : '');
            },
            label_init: function () {
                ScreensObj_TopLableAgameInit(this.screen);

                if (Main_values.Search_isSearching) {
                    //Reset label as the app may be restoring from background
                    Main_cleanTopLabel();
                } else Main_values.gameSelected_IdOld = null;

                if (Main_values.Main_gameSelected) {
                    ScreensObj_SetTopLable(Main_values.Main_gameSelected, STR_LIVE);
                } else {
                    ScreensObj_UpdateGameInfo(1, this.screen);
                }

                ScreenObj[Main_AGameVod].IsOpen = 0;
                ScreenObj[Main_AGameClip].IsOpen = 0;
            },
            label_exit: function () {
                ScreensObj_TopLableAgameExit(this.screen);
            },
            HasSwitches: true,
            SwitchesIcons: ['movie-play', 'movie'],
            addSwitches: function () {
                ScreensObj_addSwitches([STR_SPACE_HTML + STR_SPACE_HTML + STR_VIDEOS, STR_SPACE_HTML + STR_SPACE_HTML + STR_CLIPS], this.screen);
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Live_obj);
    ScreenObj[key].Set_Scroll();
    ScreenObj[key].key_play = function () {
        if ((this.itemsCount || this.BannerCreated) && this.posY !== -1) {
            if (this.is_a_Banner()) return;

            if (this.itemsCount) {
                Main_RemoveClass(this.ids[1] + this.posY + '_' + this.posX, 'opacity_zero');

                this.OpenLiveStream(false);
            }
        } else AGame_headerOptions(this.screen);

        ScreenObj[this.screen].IsOpen = 0;
    };
}

function ScreensObj_InitFeatured() {
    var key = Main_Featured;

    ScreenObj[key] = Screens_assign(
        {
            isQuery: true,
            HeadersArray: Main_base_array_header,
            ids: Screens_ScreenIds('Featured', key),
            ScreenName: 'Featured',
            table: 'stream_table_featured',
            screen: key,
            key_pgDown: Main_games,
            key_pgUp: Main_Live,
            base_post: featuredQuery,
            CheckContentLang: 1,
            set_url: function () {
                this.dataEnded = true;
                this.url = PlayClip_BaseUrl;
                this.post = this.base_post.replace('%x', Main_ContentLang === '' ? '' : ',language:\\"' + Main_ContentLang + '\\"');
            },
            label_init: function () {
                Sidepannel_SetDefaultLabels();
                Main_values.Sidepannel_IsUser = false;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_FEATURED);
            },
            object: 'featured'
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Live_obj);

    ScreenObj[key].addCell = function (cell) {
        cell = cell.stream;
        this.addCellTemp(cell);
    };
    ScreenObj[key].Set_Scroll();

    ScreenObj[key].concatenate = function (responseObj) {
        var hasData = responseObj.data && responseObj.data.featuredStreams;

        if (hasData) {
            this.data = responseObj.data.featuredStreams;
            this.loadDataSuccess();
        }

        this.loadingData = false;

        if (this.hasBackupData) {
            this.setBackupData(responseObj, this.data, this.lastRefresh, this.gameSelected_Id, this.ContentLang, this.Lang);
        }
    };

    ScreenObj[key].addCell = function (cell) {
        if (!cell || !cell.stream) {
            return;
        }
        var id_cell = cell.stream.broadcaster.id;

        if (!this.idObject[id_cell]) {
            this.itemsCount++;
            this.idObject[id_cell] = 1;

            this.tempHtml += Screens_createCellLive(this.row_id + '_' + this.coloumn_id, this.ids, ScreensObj_FeaturedCellArray(cell), this.screen);

            this.coloumn_id++;
        }
    };
}

function ScreensObj_InitClip() {
    var key = Main_Clip;

    ScreenObj[key] = Screens_assign(
        {
            ids: Screens_ScreenIds('Clip', key),
            ScreenName: 'Clip',
            table: 'stream_table_clip',
            screen: key,
            key_pgDown: Main_Live,
            key_pgUp: Main_games,
            CheckContentLang: 1,
            ContentLang: '',
            periodPos: Main_getItemInt('Clip_periodPos', 2),
            base_url: Main_kraken_api + 'clips/top?limit=' + Main_ItemsLimitMax,
            isKraken: true,
            set_url: function () {
                this.url =
                    this.base_url +
                    '&period=' +
                    this.period[this.periodPos - 1] +
                    (this.cursor ? '&cursor=' + this.cursor : '') +
                    (Main_ContentLang !== ''
                        ? '&language=' + (Languages_Extra[Main_ContentLang] ? Languages_Extra[Main_ContentLang] : Main_ContentLang)
                        : '');
            },
            SetPeriod: function () {
                Main_setItem('Clip_periodPos', this.periodPos);
                ScreensObj_SetTopLable(STR_CLIPS, Main_Periods[this.periodPos - 1]);
            },
            label_init: function () {
                ScreensObj_CheckUser(this.screen);

                this.SetPeriod();
                Sidepannel_SetDefaultLabels();
                Main_values.Sidepannel_IsUser = false;
                Sidepannel_SetTopOpacity(this.screen);
            },
            label_exit: function () {
                Main_RestoreTopLabel();
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Clip_obj);
    ScreenObj[key].HeadersArray = Main_base_array_header;
    ScreenObj[key].object = 'clips';
    ScreenObj[key].Set_Scroll();
}

function ScreensObj_InitChannelClip() {
    var key = Main_ChannelClip;

    ScreenObj[key] = Screens_assign(
        {
            useHelix: true,
            ids: Screens_ScreenIds('ChannelClip', key),
            ScreenName: 'ChannelClip',
            table: 'stream_table_channel_clip',
            screen: key,
            key_pgUp: Main_ChannelVod,
            periodPos: Main_getItemInt('ChannelClip_periodPos', 2),
            base_url: Main_helix_api + 'clips?broadcaster_id=',
            set_url: function () {
                this.url =
                    this.base_url +
                    encodeURIComponent(Main_values.Main_selectedChannel_id) +
                    '&first=' +
                    Main_ItemsLimitMax +
                    ScreensObj_ClipGetPeriod(this.periodPos) +
                    (this.cursor ? '&after=' + this.cursor : '') +
                    Main_TwitchV5Flag;
            },
            SetPeriod: function () {
                Main_setItem('ChannelClip_periodPos', this.periodPos);

                ScreensObj_SetTopLable(Main_values.Main_selectedChannelDisplayname, STR_CLIPS + STR_SPACE_HTML + Main_Periods[this.periodPos - 1]);
            },
            label_init: function () {
                ScreensObj_CheckUser(this.screen);

                if (!Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
                if (Main_values.Main_selectedChannel_id !== this.lastselectedChannel) this.status = false;

                Main_cleanTopLabel();
                this.SetPeriod();
                Main_IconLoad('label_thumb', 'icon-return', STR_GOBACK);
                this.lastselectedChannel = Main_values.Main_selectedChannel_id;
            },
            label_exit: Main_RestoreTopLabel
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Clip_obj);
    ScreenObj[key].Set_Scroll();
}

function ScreensObj_InitAGameClip() {
    var key = Main_AGameClip;

    ScreenObj[key] = Screens_assign(
        {
            useHelix: true,
            ids: Screens_ScreenIds('AGameClip', key),
            ScreenName: 'AGameClip',
            table: 'stream_table_a_game_clip',
            screen: key,
            key_pgDown: Main_Clip,
            key_pgUp: Main_Featured,
            CheckContentLang: 1,
            ContentLang: '',
            hasBackupData: true,
            periodPos: Main_getItemInt('AGameClip_periodPos', 2),
            base_url: Main_helix_api + 'clips?game_id=',
            set_url: function () {
                this.url =
                    this.base_url +
                    this.gameSelected_Id +
                    '&first=' +
                    Main_ItemsLimitMax +
                    ScreensObj_ClipGetPeriod(this.periodPos) +
                    (this.cursor ? '&after=' + this.cursor : '');
            },
            SetPeriod: function () {
                Main_setItem('AGameClip_periodPos', this.periodPos);

                if (Main_values.Main_gameSelected) {
                    ScreensObj_SetTopLable(Main_values.Main_gameSelected, STR_CLIPS + STR_SPACE_HTML + Main_Periods[this.periodPos - 1]);
                } else {
                    ScreensObj_UpdateGameInfo(3, this.screen);
                }
            },
            label_init: function () {
                ScreensObj_CheckUser(this.screen);

                ScreensObj_TopLableAgameInit(this.screen);
                this.SetPeriod();
            },
            label_exit: function () {
                ScreensObj_TopLableAgameExit(this.screen);
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Clip_obj);
    ScreenObj[key].Set_Scroll();
}

function ScreensObj_InitGame() {
    var key = Main_games;

    ScreenObj[key] = Screens_assign(
        {
            useHelix: true,
            ids: Screens_ScreenIds('Game', key),
            ScreenName: 'Game',
            table: 'stream_table_games',
            screen: key,
            key_pgDown: Main_Clip,
            key_pgUp: Main_Featured,
            object: 'data',
            base_url: Main_helix_api + 'games/top?first=' + Main_ItemsLimitMax,
            set_url: function () {
                if (!this.useHelix && this.offset && this.offset + Main_ItemsLimitMax > this.MaxOffset) this.dataEnded = true;
                this.url = this.base_url + (this.cursor ? '&after=' + this.cursor : '');
            },
            label_init: function () {
                Sidepannel_SetDefaultLabels();
                Main_values.Sidepannel_IsUser = false;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_GAMES);
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Game_obj);
    ScreenObj[key].Set_Scroll();

    ScreenObj[key].init_fun = function (preventRefresh) {
        ScreensObj_CheckIsOpen(this.screen, preventRefresh);
    };
}

function ScreensObj_InitUserGames() {
    var key = Main_usergames;

    ScreenObj[key] = Screens_assign(
        {
            ids: Screens_ScreenIds('UserGames', key),
            ScreenName: 'UserGames',
            table: 'stream_table_user_games',
            screen: key,
            key_pgDownNext: Main_UserChannels,
            key_pgDown: Main_UserChannels,
            key_pgUp: Main_UserLive,
            isLive: false,
            hasGameProp: true,
            OldUserName: '',
            IsUser: true,
            object: 'data',
            isQuery: true,
            base_post: userGameQuery,
            set_url: function () {
                this.dataEnded = true;
                this.url = PlayClip_BaseUrl;
                this.post = this.base_post.replace('%x', AddUser_UsernameArray[0].id);
            },
            label_init: function () {
                ScreensObj_TopLableUserInit(this.screen);
                ScreensObj_SetTopLable(STR_USER, STR_FOLLOW_GAMES);
            },
            label_exit: function () {
                Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_GUIDE);
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Game_obj);
    ScreenObj[key].Set_Scroll();

    ScreenObj[key].init_fun = function (preventRefresh) {
        ScreensObj_CheckIsOpen(this.screen, preventRefresh);
    };

    ScreenObj[key].concatenate = function (responseObj) {
        var hasData = responseObj.data && responseObj.data.user && responseObj.data.user.followedGames && responseObj.data.user.followedGames.nodes;

        if (hasData) {
            this.data = responseObj.data.user.followedGames.nodes;

            this.data.sort(function (a, b) {
                if (!a || !b) {
                    return 0;
                }
                return a.displayName < b.displayName ? -1 : a.displayName > b.displayName ? 1 : 0;
            });

            this.loadDataSuccess();
        }

        this.loadingData = false;

        if (this.hasBackupData) {
            this.setBackupData(responseObj, this.data, this.lastRefresh, this.gameSelected_Id, this.ContentLang, this.Lang);
        }
    };
}

function ScreensObj_InitSearchGames() {
    var key = Main_SearchGames;

    ScreenObj[key] = Screens_assign(
        {
            useHelix: true,
            ids: Screens_ScreenIds('SearchGames', key),
            ScreenName: 'SearchGames',
            table: 'stream_table_search_game',
            screen: key,
            isSearch: true,
            isLive: false,
            OldUserName: '',
            object: 'data',
            lastData: '',
            base_url: Main_helix_api + 'search/categories?query=',
            set_url: function () {
                this.url =
                    this.base_url +
                    encodeURIComponent(Main_values.Search_data) +
                    '&first=' +
                    Main_ItemsLimitMax +
                    (this.cursor ? '&after=' + this.cursor : '');
            },
            label_init: function () {
                if (!Main_values.gameSelected_IdOld) Main_values.gameSelected_IdOld = Main_values.Main_gameSelected_id;
                Main_values.Search_isSearching = true;
                Main_cleanTopLabel();
                if (this.lastData !== Main_values.Search_data) this.status = false;
                this.lastData = Main_values.Search_data;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_SEARCH + STR_SPACE_HTML + STR_GAMES, "'" + Main_values.Search_data + "'");
            },
            label_exit: function () {
                Main_values.Main_gameSelected = Main_values.gameSelected_IdOld;
                if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
                Main_values.Games_return = false;
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Game_obj);
    ScreenObj[key].Set_Scroll();
}

function ScreensObj_InitUserChannels() {
    var key = Main_UserChannels;

    ScreenObj[key] = Screens_assign(
        {
            useHelix: true,
            HeadersArray: Main_base_array_header,
            ids: Screens_ScreenIds('UserChannels', key),
            ScreenName: 'UserChannels',
            table: 'stream_table_user_channels',
            screen: key,
            object: 'data',
            IsUser: true,
            key_pgDown: Main_History[Main_HistoryPos],
            key_pgUp: Main_usergames,
            key_pgUpNext: Main_usergames,
            getFollowed: true,
            channelData: null,
            channelDataPos: 0,
            base_url: Main_helix_api + 'users/follows?first=' + Main_ItemsLimitMax + '&from_id=',
            base_url_channels: Main_helix_api + 'users?',
            set_url: function () {
                if (this.getFollowed) {
                    this.url = this.base_url + AddUser_UsernameArray[0].id + (this.cursor ? '&after=' + this.cursor : '');
                } else {
                    this.channels = 'id=' + this.channelData[this.channelDataPos].to_id;
                    var i = this.channelDataPos + 1,
                        dataLen = this.channelData.length,
                        len = Math.min(dataLen, i + 99);

                    this.channelDataPos++;
                    for (i; i < len; i++) {
                        this.channels += '&id=' + this.channelData[i].to_id;
                        this.channelDataPos++;
                    }

                    this.url = this.base_url_channels + this.channels;

                    if (dataLen <= i) {
                        this.dataEnded = true;
                    }
                }
            },
            label_init: function () {
                ScreensObj_TopLableUserInit(this.screen);

                ScreensObj_SetTopLable(STR_USER, STR_USER_CHANNEL);
            },
            key_play: function () {
                if (this.is_a_Banner()) return;

                this.base_key_play(key, true);
            },
            addCell: function (cell) {
                if (!this.idObject[cell.id]) {
                    this.itemsCount++;
                    this.idObject[cell.id] = 1;

                    this.tempHtml += Screens_createCellChannel(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        [cell.login, cell.id, cell.profile_image_url, cell.display_name, cell.broadcaster_type === 'partner'],
                        this.screen
                    );

                    this.coloumn_id++;
                }
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Channel_obj);
    ScreenObj[key].addrow = Screens_addrowChannel;
    ScreenObj[key].visiblerows = 5;
    ScreenObj[key].Set_Scroll();

    ScreenObj[key].concatenate = function (responseObj) {
        if (this.getFollowed) {
            var data = responseObj[this.object];
            this.cursor = responseObj.pagination.cursor;

            if (data.length) {
                if (!this.channelData) {
                    this.channelData = data;
                } else {
                    this.channelData.push.apply(this.channelData, responseObj[this.object]);
                }
            } else if (!this.channelData) {
                this.dataEnded = true;
                this.data = [];
                this.loadDataSuccess();
                this.loadingData = false;
                return;
            }

            if (this.cursor && this.cursor !== '') {
                Screens_loadDataRequest(this.screen);
            } else {
                //sort
                this.channelData.sort(function (a, b) {
                    if (!a || !b) {
                        return 0;
                    }
                    return a.to_login < b.to_login ? -1 : a.to_login > b.to_login ? 1 : 0;
                });
                this.getFollowed = false;
                Screens_loadDataRequest(this.screen);
            }
        } else {
            var tempData = responseObj[this.object];
            if (tempData) {
                tempData.sort(function (a, b) {
                    if (!a || !b) {
                        return 0;
                    }
                    return a.login < b.login ? -1 : a.login > b.login ? 1 : 0;
                });
            }

            if (this.data) {
                if (tempData) {
                    this.data.push.apply(this.data, tempData);
                    this.offset = this.data.length;
                }
            } else {
                this.data = tempData;
                if (this.data) {
                    this.offset = this.data.length;
                } else this.data = [];

                this.loadDataSuccess();
            }

            this.loadingData = false;
        }
    };
}

function ScreensObj_InitSearchChannels() {
    var key = Main_SearchChannels;

    ScreenObj[key] = Screens_assign(
        {
            useHelix: true,
            HeadersArray: Main_base_array_header,
            ids: Screens_ScreenIds('SearchChannels', key),
            ScreenName: 'SearchChannels',
            table: 'stream_table_search_channel',
            screen: key,
            object: 'data',
            base_url: Main_helix_api + 'search/channels?first=' + Main_ItemsLimitMax + '&query=',
            set_url: function () {
                this.url = this.base_url + encodeURIComponent(Main_values.Search_data) + (this.cursor ? '&after=' + this.cursor : '');
            },
            label_init: function () {
                Main_values.Search_isSearching = true;
                Main_cleanTopLabel();
                if (this.lastData !== Main_values.Search_data) this.status = false;
                this.lastData = Main_values.Search_data;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_SEARCH + STR_SPACE_HTML + STR_CHANNELS, "'" + Main_values.Search_data + "'");
            },
            label_exit: function () {
                if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
            },
            key_play: function () {
                if (this.is_a_Banner()) return;

                this.base_key_play(key, false);
            },
            addCell: function (cell) {
                this.addCellTemp(cell);
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_Channel_obj);
    ScreenObj[key].addrow = Screens_addrowChannel;
    ScreenObj[key].visiblerows = 5;
    ScreenObj[key].Set_Scroll();
}

function ScreensObj_HistoryLive() {
    var key = Main_HistoryLive;

    ScreenObj[key] = Screens_assign(
        {
            Type: 'live',
            ids: Screens_ScreenIds('HistoryLive', key),
            ScreenName: 'HistoryLive',
            table: 'stream_table_historylive',
            screen: key,
            img_404: IMG_404_VIDEO,
            histPosXName: 'HistoryLive_histPosX',
            screenType: 0,
            histPosX: Main_getItemJson('HistoryLive_histPosX', [0, 0, 0, 0]),
            sethistDialog: function () {
                Main_textContent('dialog_hist_setting_name_1', STR_HISTORY_LIVE_DIS);
                Main_innerHTML('dialog_hist_text', STR_LIVE + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_SETTINGS);
                this.sethistMainDialog();
            },
            setTODialog: function () {
                Main_RemoveClass('dialog_thumb_opt_setting_-1', 'hideimp');
                if (Main_A_includes_B(Main_getElementById(this.ids[1] + this.posY + '_' + this.posX).src, 's3_vods'))
                    Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_VOD_DIS);
                else Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_LIVE_DIS);
            },
            label_init: function () {
                Main_HistoryPos = 0;
                ScreensObj_TopLableUserInit(this.screen);
                ScreensObj_SetTopLable(
                    STR_USER,
                    STR_HISTORY + STR_SPACE_HTML + STR_LIVE + STR_SPACE_HTML + '(' + this.sorting[this.histPosX[0]] + ')'
                );
            },
            history_Type: function () {
                return STR_LIVE;
            },
            addCell: function (cell) {
                //cell.data[14] check here to a bug that introduce emtpy values todo maybe can be removed ins some months
                if (!this.idObject[cell.data[7]] && cell.data[14] && cell.data[14] !== '') {
                    this.itemsCount++;
                    this.idObject[cell.data[7]] = 1;

                    this.tempHtml += Screens_createCellLive(
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
            addSwitches: function () {
                ScreensObj_addSwitches(
                    [
                        STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_VIDEOS,
                        STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_CLIPS,
                        STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_LIVE + STR_SPACE_HTML + STR_SETTINGS
                    ],
                    this.screen
                );
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_History_obj);
    ScreenObj[key].Upsorting();
    ScreenObj[key].Set_Scroll();
    ScreenObj[key].key_play = function (click) {
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
            } else Screens_histStart(this.screen, click);
        } else {
            if (this.itemsCount) {
                Main_RemoveClass(this.ids[1] + this.posY + '_' + this.posX, 'opacity_zero');
                this.OpenLiveStream(true);
            }
        }
    };
}

function ScreensObj_HistoryVod() {
    var key = Main_HistoryVod;

    ScreenObj[key] = Screens_assign(
        {
            Type: 'vod',
            ids: Screens_ScreenIds('HistoryVod', key),
            ScreenName: 'HistoryVod',
            table: 'stream_table_historyvod',
            screen: key,
            screenType: 1,
            img_404: IMG_404_VOD,
            Vod_newImg: new Image(),
            HasAnimateThumb: true,
            AnimateThumb: ScreensObj_AnimateThumbId,
            histPosXName: 'HistoryVod_histPosX',
            histPosX: Main_getItemJson('HistoryVod_histPosX', [0, 0, 0, 0]),
            sethistDialog: function () {
                Main_textContent('dialog_hist_setting_name_1', STR_HISTORY_VOD_DIS);
                Main_innerHTML('dialog_hist_text', STR_VIDEOS + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_SETTINGS);
                this.sethistMainDialog();
            },
            setTODialog: function () {
                Main_RemoveClass('dialog_thumb_opt_setting_-1', 'hideimp');
                Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_VOD_DIS);
            },
            history_Type: function () {
                return STR_VIDEOS;
            },
            label_init: function () {
                Main_HistoryPos = 1;
                ScreensObj_TopLableUserInit(this.screen);

                ScreensObj_SetTopLable(
                    STR_USER,
                    STR_HISTORY + STR_SPACE_HTML + STR_VIDEOS + STR_SPACE_HTML + '(' + this.sorting[this.histPosX[0]] + ')'
                );
            },
            key_play: function (click) {
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
                    } else Screens_histStart(this.screen, click);
                } else this.OpenVodStart();
            },
            addCell: function (cell) {
                if (!this.idObject[cell.data[7]]) {
                    this.itemsCount++;
                    this.idObject[cell.data[7]] = 1;

                    this.tempHtml += Screens_createCellVod(
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
            addSwitches: function () {
                ScreensObj_addSwitches(
                    [
                        STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_LIVE,
                        STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_CLIPS,
                        STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_VIDEOS + STR_SPACE_HTML + STR_SETTINGS
                    ],
                    this.screen
                );
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_History_obj);

    ScreenObj[key].addFocus = function (forceScroll, key) {
        this.AnimateThumb(this);
        Screens_addFocusVideo(forceScroll, key);
    };
    ScreenObj[key].Upsorting();
    ScreenObj[key].Set_Scroll();
}

function ScreensObj_HistoryClip() {
    var key = Main_HistoryClip;

    ScreenObj[key] = Screens_assign(
        {
            Type: 'clip',
            ids: Screens_ScreenIds('HistoryClip', key),
            ScreenName: 'HistoryClip',
            table: 'stream_table_historyclip',
            screen: key,
            img_404: IMG_404_VOD,
            screenType: 2,
            histPosXName: 'HistoryClip_histPosX',
            histPosX: Main_getItemJson('HistoryClip_histPosX', [0, 0, 0, 0]),
            sethistDialog: function () {
                Main_textContent('dialog_hist_setting_name_1', STR_HISTORY_CLIP_DIS);
                Main_innerHTML('dialog_hist_text', STR_CLIPS + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_SETTINGS);
                this.sethistMainDialog();
            },
            setTODialog: function () {
                Main_RemoveClass('dialog_thumb_opt_setting_-1', 'hideimp');
                Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_CLIP_DIS);
            },
            history_Type: function () {
                return STR_CLIPS;
            },
            label_init: function () {
                Main_HistoryPos = 2;
                ScreensObj_TopLableUserInit(this.screen);

                ScreensObj_SetTopLable(
                    STR_USER,
                    STR_HISTORY + STR_SPACE_HTML + STR_CLIPS + STR_SPACE_HTML + '(' + this.sorting[this.histPosX[0]] + ')'
                );
            },
            key_play: function (click) {
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
                    } else Screens_histStart(this.screen, click);
                } else {
                    this.OpenClip();
                }
            },
            addCell: function (cell) {
                if (!this.idObject[cell.data[7]]) {
                    this.itemsCount++;
                    this.idObject[cell.data[7]] = 1;

                    this.tempHtml += Screens_createCellClip(
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
            addSwitches: function () {
                ScreensObj_addSwitches(
                    [
                        STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_LIVE,
                        STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_VIDEOS,
                        STR_SPACE_HTML + STR_SPACE_HTML + STR_HISTORY + STR_SPACE_HTML + STR_CLIPS + STR_SPACE_HTML + STR_SETTINGS
                    ],
                    this.screen
                );
            }
        },
        Base_obj
    );

    ScreenObj[key] = Screens_assign(ScreenObj[key], Base_History_obj);
    ScreenObj[key].Upsorting();
    ScreenObj[key].Set_Scroll();
}

function ScreensObj_addSwitches(StringsArray, key) {
    ScreenObj[key].TopRowCreated = true;
    ScreenObj[key].row = document.createElement('div');
    var thumbfollow,
        div,
        i = 0,
        len = StringsArray.length;

    for (i; i < len; i++) {
        thumbfollow = '<i class="icon-' + ScreenObj[key].SwitchesIcons[i] + ' stream_channel_follow_icon"></i>' + StringsArray[i];
        div = document.createElement('div');
        div.setAttribute('id', ScreenObj[key].ids[3] + 'y_' + i);
        div.className = 'stream_cell_period';
        div.innerHTML =
            '<div id="' +
            ScreenObj[key].ids[0] +
            '-1_' +
            i +
            '" class="stream_thumbnail_channel_vod" ><div id="' +
            ScreenObj[key].ids[2] +
            '-1_' +
            i +
            '" class="stream_channel_follow_game">' +
            thumbfollow +
            '</div></div>';
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

    div.innerHTML =
        '<div class="inner_banner_holder" id="' +
        idArray[0] +
        id +
        '"' +
        (ScreenObj[key].screenType === 3 || ScreenObj[key].screenType === 4 ? ' style="width: 95.75%;"' : '') +
        '><div class="banner_img_holder" id="' +
        idArray[0] +
        id +
        '" ><img id="' +
        idArray[1] +
        id +
        '" class="banner_img" alt="" src="' +
        obj.image +
        '" onerror="this.onerror=null;this.src=\'' +
        ScreenObj[key].img_404 +
        '\';" ></div><div class="banner_text_holder"><div style="text-align: center;" class="stream_text_holder">' +
        obj.text +
        '</div></div></div>';

    ScreenObj[key].row.appendChild(div);

    if (!ScreensObj_banner_added_section || forceAdd) {
        ScreenObj[key].tableDoc.appendChild(ScreenObj[key].row);
    }

    this.itemsCount += 3;
    this.coloumn_id += 3;

    ScreenObj[key].BannerTime = new Date().getTime() + AffiliatedTIme;

    ScreensObj_banner_added_section = true;
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
    if (Main_values.Main_OldGameSelected === null) {
        Main_values.Main_OldGameSelected = Main_values.Main_gameSelected_id;
    }

    Main_IconLoad('label_thumb', 'icon-return', STR_GOBACK);
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_GUIDE);

    if (
        !Main_A_equals_B_No_Case(Main_values.Main_OldGameSelected, Main_values.Main_gameSelected_id) ||
        !Main_A_equals_B_No_Case(ScreenObj[key].gameSelected_Id, Main_values.Main_gameSelected_id)
    ) {
        ScreenObj[key].status = false;

        if (ScreenObj[key].Cells && ScreenObj[key].Cells.length && ScreenObj[key].gameSelected_Id) {
            ScreenObj[key].BackupScreen(ScreenObj[key].gameSelected_Id);
        }
    }

    ScreenObj[key].gameSelected_Id = Main_values.Main_gameSelected_id;
    Main_values.Main_OldGameSelected = Main_values.Main_gameSelected_id;

    if (Main_values.Sidepannel_IsUser || Main_values.Main_BeforeAgame === Main_usergames) {
        Sidepannel_SetUserLabels();
    } else {
        Sidepannel_SetDefaultLabels();
    }

    Sidepannel_Sidepannel_Pos = Main_values.Main_BeforeAgame === Main_usergames ? 4 : 5;
    Sidepannel_SetTopOpacity(Main_values.Main_Go);

    Main_EventAgame(Main_values.Main_gameSelected);
}

function ScreensObj_TopLableAgameExit(key) {
    ScreenObj[key].gameSelected_Id = Main_values.Main_gameSelected_id;
    Main_IconLoad('label_thumb', 'icon-options', STR_THUMB_OPTIONS_TOP);
}

function ScreensObj_TopLableUserInit(key) {
    ScreensObj_CheckUser(key);

    Sidepannel_SetUserLabels();
    Sidepannel_SetTopOpacity(ScreenObj[key].screen);
}

function ScreensObj_CheckUser(key) {
    if (!AddUser_UserIsSet()) return;

    if (ScreenObj[key].OldUserName !== AddUser_UsernameArray[0].name) ScreenObj[key].status = false;
    ScreenObj[key].OldUserName = AddUser_UsernameArray[0].name;
}

function ScreensObj_SetTopLable(text, small_text) {
    Main_innerHTML(
        'top_lable',
        text + STR_SPACE_HTML + (small_text ? '<div style="font-size: 65%;display: inline-block;">' + small_text + '</div>' : '')
    );
}

function ScreensObj_FeaturedCellArray(cell) {
    return [
        cell.stream.previewImageURL ? cell.stream.previewImageURL.replace('{width}x{height}', Main_VideoSize) : '', //0
        cell.stream.broadcaster.displayName, //1
        cell.stream.title, //2
        cell.stream.game.displayName, //3
        Main_addCommas(cell.stream.viewersCount), //4
        cell.stream.broadcaster.language ? '[' + cell.stream.broadcaster.language.toUpperCase() + ']' : '', //5
        cell.stream.broadcaster.login, //6
        cell.stream.id.toString(), //7 broadcast id
        Main_is_rerun(cell.stream.type), //8
        cell.stream.broadcaster.profileImageURL, //9
        cell.stream.broadcaster.roles.isPartner, //10
        Play_streamLiveAt(cell.stream.createdAt), //11
        cell.stream.createdAt, //12
        cell.stream.viewersCount, //13
        cell.stream.broadcaster.id, //14
        cell.stream.broadcaster.language, //15
        null, //16
        null, //17
        cell.stream.game.id //18
    ];
}

function ScreensObj_LiveCellArray(cell, logo, partner) {
    return [
        cell.thumbnail_url, //0
        cell.user_name, //1
        cell.title, //2
        cell.game_name, //3
        Main_addCommas(cell.viewer_count), //4
        cell.language ? '[' + cell.language.toUpperCase() + ']' : '', //5
        cell.user_login, //6
        cell.id.toString(), //7 broadcast id
        Main_is_rerun(cell.type), //8
        logo ? logo : null, //9
        partner ? partner : null, //10
        Play_streamLiveAt(cell.started_at), //11
        cell.started_at, //12
        cell.viewer_count, //13
        cell.user_id, //14
        cell.language, //15
        null, //16
        null, //17
        cell.game_id //18
    ];
}

function ScreensObj_VodCellArray(cell) {
    return [
        ScreensObj_VodGetPreview(cell.thumbnail_url, null), //0
        cell.user_name, //1
        Main_videoCreatedAt(cell.created_at), //2
        null, //3
        Main_addCommas(cell.view_count), //4
        cell.language ? '[' + cell.language.toUpperCase() + ']' : '', //5
        cell.user_login, //6
        cell.id, //7
        null, //8
        cell.language, //9
        twemoji.parse(cell.title), //10
        Play_timeHMS(cell.duration), //11
        cell.created_at, //12
        cell.view_count, //13
        cell.user_id //14
    ];
}

function ScreensObj_ClipCellArray(cell, isKraken) {
    if (isKraken) {
        return [
            cell.slug, //0
            cell.duration, //1
            cell.broadcaster.id, //2
            cell.game, //3
            cell.broadcaster.display_name, //4
            cell.broadcaster.logo.replace('150x150', '300x300'), //5
            cell.broadcaster.name, //6
            cell.tracking_id, //7
            cell.vod !== null ? cell.vod.id : null, //8
            cell.vod !== null ? cell.vod.offset : null, //9
            twemoji.parse(cell.title), //10
            '[' + cell.language.toUpperCase() + ']', //11
            cell.created_at, //12
            cell.views, //13
            Main_addCommas(cell.views), //14
            cell.thumbnails.medium, //15
            Main_videoCreatedAt(cell.created_at), //16
            cell.language //17
        ];
    }
    return [
        cell.id, //0
        cell.duration, //1
        cell.broadcaster_id, //2
        null, //3
        cell.broadcaster_name, //6
        null, //5
        cell.broadcaster_name ? cell.broadcaster_name.toLowerCase() : cell.broadcaster_name, //6
        cell.id, //7
        cell.video_id ? cell.video_id : null, //8
        cell.vod !== null ? -1 : null, //9
        twemoji.parse(cell.title), //10
        cell.language ? '[' + cell.language.toUpperCase() + ']' : '', //11
        cell.created_at, //12
        cell.view_count, //13
        Main_addCommas(cell.view_count), //14
        cell.thumbnail_url, //15
        Main_videoCreatedAt(cell.created_at), //16
        cell.language, //17
        cell.game_id //18
    ];
}

function ScreensObj_ClipGetPeriod(periodPos) {
    if (periodPos === 4) return '';

    var date = '',
        today = new Date(),
        newDate = today,
        day = today.getDate(),
        month = today.getMonth() + 1,
        year = today.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    var dayEnd = '&ended_at=' + year + '-' + month + '-' + day + 'T23:59:59Z';

    newDate.setDate(newDate.getDate() - Main_Periods_Helix[periodPos]);
    day = newDate.getDate();
    month = newDate.getMonth() + 1;
    year = newDate.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    date = '&started_at=' + year + '-' + month + '-' + day + 'T00:00:00Z';

    date += dayEnd;

    return date;
}

function ScreensObj_VodGetPreview(preview, animated_preview_url) {
    //When the live hasn't yet ended the img is a default gray one, but the final is alredy generated for some reason not used
    // if (!Main_IsOn_OSInterface) {
    //     if (!Main_A_includes_B(preview + '', '404_processing') && !Main_A_includes_B(preview + '', 'cf_vods')) {
    //         console.log('Revise vod links');
    //     }
    // }
    return Main_A_includes_B(preview + '', '404_processing')
        ? ScreensObj_VodGetPreviewFromAnimated(animated_preview_url)
        : preview.replace('%{width}x%{height}', Main_VideoSize);
}

function ScreensObj_VodGetPreviewFromAnimated(animated_preview_url) {
    if (!animated_preview_url) {
        return null;
    }

    var animated_preview = animated_preview_url.split('/');

    return (
        'https://static-cdn.jtvnw.net/cf_vods/' +
        animated_preview[2].split('.')[0] +
        '/' +
        animated_preview[3] +
        '/thumb/thumb0-' +
        Main_VideoSize +
        '.jpg'
    );
}

function ScreensObj_AnimateThumbId(screen) {
    Main_clearInterval(screen.AnimateThumbId);
    if (!Settings_Obj_default('videos_animation')) return;
    var div = Main_getElementById(screen.ids[5] + screen.posY + '_' + screen.posX);

    if (!screen.DataObj[screen.posY + '_' + screen.posX][8]) {
        ScreensObj_getVodAnimatedUrl(screen);
    } else {
        // Only load the animation if it can be loaded
        // This prevent starting animating before it has loaded or animated a empty image
        screen.Vod_newImg.onload = function () {
            this.onload = null;
            Main_AddClass(screen.ids[1] + screen.posY + '_' + screen.posX, 'opacity_zero');
            div.style.backgroundSize = div.offsetWidth + 'px';
            var frame = 0;
            screen.AnimateThumbId = Main_setInterval(
                function () {
                    // 10 = quantity of frames in the preview img
                    div.style.backgroundPosition = '0px ' + (++frame % 10) * -div.offsetHeight + 'px';
                },
                650,
                screen.AnimateThumbId
            );
        };

        screen.Vod_newImg.src = div.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
    }
}

function ScreensObj_getVodAnimatedUrl(screen) {
    FullxmlHttpGet(
        Main_kraken_api + 'videos/' + screen.DataObj[screen.posY + '_' + screen.posX][7] + Main_TwitchV5Flag_I,
        Play_base_backup_headers_Array,
        ScreensObj_getVodAnimatedUrlResult,
        noop_fun,
        screen.screen,
        screen.screen,
        null, //Method, null for get
        null
    );
}

function ScreensObj_getVodAnimatedUrlResult(resultObj, key) {
    if (resultObj.status === 200) {
        var obj = JSON.parse(resultObj.responseText);
        if (obj.animated_preview_url) {
            ScreenObj[key].DataObj[ScreenObj[key].posY + '_' + ScreenObj[key].posX][8] = obj.animated_preview_url;
            var div = Main_getElementById(ScreenObj[key].ids[5] + ScreenObj[key].posY + '_' + ScreenObj[key].posX);
            div.style.cssText = 'width: 100%; padding-bottom: 56.25%; background-size: 0 0; background-image: url(' + obj.animated_preview_url + ');';
            ScreensObj_AnimateThumbId(ScreenObj[key]);
        }
    }
}

function ScreensObj_UpdateGameInfo(PlayVodClip, key) {
    var theUrl = Main_helix_api + 'games?id=' + Main_values.Main_gameSelected_id;

    BaseXmlHttpGet(theUrl, ScreensObj_UpdateGameInfoSuccess, noop_fun, PlayVodClip, key, true);
}

function ScreensObj_UpdateGameInfoSuccess(response, PlayVodClip, key) {
    response = JSON.parse(response);
    if (response.data && response.data.length) {
        Main_values.Main_gameSelected = response.data[0].name;
    }

    if (PlayVodClip === 1) {
        ScreensObj_SetTopLable(Main_values.Main_gameSelected, STR_LIVE);
    } else if (PlayVodClip === 2) {
        ScreensObj_SetTopLable(
            Main_values.Main_gameSelected,
            (ScreenObj[key].highlight ? STR_HIGHLIGHTS : STR_VODS) + STR_SPACE_HTML + Main_Periods[ScreenObj[key].periodPos - 1]
        );
    } else if (PlayVodClip === 3) {
        ScreensObj_SetTopLable(Main_values.Main_gameSelected, STR_CLIPS + STR_SPACE_HTML + Main_Periods[ScreenObj[key].periodPos - 1]);
    }
}
