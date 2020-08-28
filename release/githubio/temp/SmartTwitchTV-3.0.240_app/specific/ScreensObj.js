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

//Spacing for reease maker not trow erros frm jshint
var Main_ItemsLimitMax = 100;

var ChannelClip_game = '';
var ChannelClip_views = '';
var ChannelClip_title = '';
var ChannelClip_playUrl = '';
var ChannelClip_playUrl2 = '';
var ChannelClip_createdAt = '';
var ChannelClip_language = '';
var ChannelClip_Id = 0;

var ChannelVod_vodOffset = 0;
var ChannelVod_language = '';
var ChannelVod_createdAt = '';
var ChannelVod_views = '';
var ChannelVod_title = '';
var ChannelVod_game = '';
var Main_History = [Main_HistoryLive, Main_HistoryVod, Main_HistoryClip];
var Main_HistoryPos = 0;

var AGame_following = false;

var DefaultHttpGetTimeout = 6000;
var DefaultHttpGetTimeoutPlus = 3000;
var DefaultHttpGetReTryMax = 3;
var empty_fun = function() {};

var Base_obj = {
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
    loadingDataTryMax: DefaultHttpGetReTryMax,
    MaxOffset: 0,
    offset: 0,
    visiblerows: 3,
    status: false,
    emptyContent: true,
    itemsCountCheck: false,
    FirstLoad: false,
    row: 0,
    Headers: [],
    data: null,
    token: null,
    data_cursor: 0,
    lastRefresh: 0,
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
    concatenate: function(responseText) {
        //Main_Log(responseText);
        if (this.data) {
            responseText = JSON.parse(responseText);

            if (responseText[this.object]) {
                this.data = this.data.concat(responseText[this.object]);
                this.offset = this.data.length;
            }

            this.setMax(responseText);
        } else {
            responseText = JSON.parse(responseText);

            this.data = responseText[this.object];
            if (this.data) {
                this.offset = this.data.length;
                this.setMax(responseText);
            } else this.data = [];

            this.loadDataSuccess();
        }
        this.loadingData = false;
    },
    screen_view: function() {
        if (this.ScreenName)
            Main_EventScreen(this.ScreenName);
    },
};

var Base_Vod_obj = {
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
    empty_str: function() {
        return STR_NO + STR_SPACE + (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA);
    },
    AnimateThumbId: null,
    HasAnimateThumb: true,
    Vod_newImg: new Image(),
    AnimateThumb: ScreensObj_AnimateThumbId,
    addCell: function(cell) {
        if (!this.idObject[cell._id]) {

            this.itemsCount++;
            this.idObject[cell._id] = 1;

            this.row.appendChild(
                Screens_createCellVod(
                    this.row_id + '_' + this.coloumn_id,
                    this.ids,
                    ScreensObj_VodCellArray(cell),
                    this.screen
                )
            );

            this.coloumn_id++;
        }
    }
};

function ScreensObj_InitVod() {
    ScreenObj[Main_Vod] = Screens_assign({
        periodMaxPos: 4,
        HeaderQuatity: 2,
        key_pgDown: Main_Clip,
        key_pgUp: Main_games,
        object: 'vods',
        ids: Screens_ScreenIds('Vod'),
        ScreenName: 'Vod',
        table: 'stream_table_vod',
        screen: Main_Vod,
        highlightSTR: 'Vod_highlight',
        highlight: Main_getItemBool('Vod_highlight', false),
        periodPos: Main_getItemInt('vod_periodPos', 2),
        base_url: Main_kraken_api + 'videos/top?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            this.url = this.base_url + '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') +
                '&sort=views&offset=' + this.offset + '&period=' + this.period[this.periodPos - 1] +
                (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
        },
        key_play: function() {
            if (this.posY === -1) {
                if (this.posX === 0) {
                    this.highlight = !this.highlight;
                    this.SetPeriod();
                    Screens_StartLoad(this.screen);
                    Main_setItem(this.highlightSTR, this.highlight ? 'true' : 'false');
                } else Screens_PeriodStart(this.screen);
            } else Main_OpenVodStart(this.posY + '_' + this.posX, this.ids, this.key_fun, this.ScreenName);
        },
        SwitchesIcons: ['movie-play', 'history'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE + STR_SPACE + STR_SWITCH_VOD,
                    STR_SPACE + STR_SPACE + STR_SWITCH_CLIP
                ],
                this.screen
            );
        },
        label_init: function() {
            Sidepannel_SetDefaultLables();
            Main_values.Sidepannel_IsUser = false;
            Sidepannel_SetTopOpacity(this.screen);
            this.SetPeriod();
        },
        SetPeriod: function() {
            Main_setItem('vod_periodPos', this.periodPos);
            ScreensObj_SetTopLable(STR_VIDEOS, (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) +
                STR_SPACE + Main_Periods[this.periodPos - 1]);
        },
    }, Base_obj);

    ScreenObj[Main_Vod] = Screens_assign(ScreenObj[Main_Vod], Base_Vod_obj);
    ScreenObj[Main_Vod].Set_Scroll();
}

function ScreensObj_InitChannelVod() {
    ScreenObj[Main_ChannelVod] = Screens_assign({
        periodMaxPos: 2,
        HeaderQuatity: 2,
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
            } else Main_OpenVodStart(this.posY + '_' + this.posX, this.ids, this.key_fun, this.ScreenName);
        },
        SwitchesIcons: ['movie-play', 'history', 'offset'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE + STR_SPACE + STR_SWITCH_VOD,
                    STR_SPACE + STR_SPACE + STR_SWITCH_TYPE,
                    STR_SPACE + STR_SPACE + STR_SWITCH_POS
                ],
                this.screen
            );
        },
        lastselectedChannel: '',
        label_init: function() {
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
                (this.periodPos === 1 ? STR_TIME : STR_VIWES) + ", Offset " + ScreenObj[this.screen].extraoffset);

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
        HeaderQuatity: 2,
        object: 'vods',
        key_pgDown: Main_Vod,
        key_pgUp: Main_Featured,
        ids: Screens_ScreenIds('AGameVod'),
        ScreenName: 'AGameVod',
        table: 'stream_table_a_game_vod',
        screen: Main_AGameVod,
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
            if (this.posY === -1) {
                if (this.posX === 0) {
                    this.highlight = !this.highlight;
                    this.SetPeriod();
                    Screens_StartLoad(this.screen);
                    Main_setItem(this.highlightSTR, this.highlight ? 'true' : 'false');
                } else Screens_PeriodStart(this.screen);
            } else Main_OpenVodStart(this.posY + '_' + this.posX, this.ids, this.key_fun, this.ScreenName);
        },
        SwitchesIcons: ['movie-play', 'history'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE + STR_SPACE + STR_SWITCH_VOD,
                    STR_SPACE + STR_SPACE + STR_SWITCH_CLIP
                ],
                this.screen
            );
        },
        OldgameSelected: '',
        label_init: function() {
            ScreensObj_TopLableAgameInit(this.screen);
            this.SetPeriod();
        },
        label_exit: function() {
            ScreensObj_TopLableAgameExit(this.screen);
        },
        SetPeriod: function() {
            Main_setItem('AGameVod_periodPos', this.periodPos);

            ScreensObj_SetTopLable(Main_values.Main_gameSelected, (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_SPACE + Main_Periods[this.periodPos - 1]);
        }
    }, Base_obj);

    ScreenObj[Main_AGameVod] = Screens_assign(ScreenObj[Main_AGameVod], Base_Vod_obj);
    ScreenObj[Main_AGameVod].Set_Scroll();
}

function ScreensObj_InitUserVod() {
    ScreenObj[Main_UserVod] = Screens_assign({
        periodMaxPos: 2,
        HeaderQuatity: 3,
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

            this.url = this.base_url + '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') +
                '&sort=' + this.time[this.periodPos - 1] + '&offset=' + this.offset;
        },
        key_play: function() {
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
            } else Main_OpenVodStart(this.posY + '_' + this.posX, this.ids, this.key_fun, this.ScreenName);
        },
        SwitchesIcons: ['movie-play', 'history'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE + STR_SPACE + STR_SWITCH_VOD,
                    STR_SPACE + STR_SPACE + STR_SWITCH_TYPE
                ],
                this.screen
            );
        },
        label_init: function() {
            this.SetPeriod();
            ScreensObj_TopLableUserInit(this.screen);
        },
        SetPeriod: function() {
            Main_setItem('UserVod_periodPos', this.periodPos);

            ScreensObj_SetTopLable(STR_USER, (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) +
                (this.periodPos === 1 ? STR_TIME : STR_VIWES));
        }
    }, Base_obj);

    ScreenObj[Main_UserVod] = Screens_assign(ScreenObj[Main_UserVod], Base_Vod_obj);
    ScreenObj[Main_UserVod].Set_Scroll();
}

var Base_Live_obj = {
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
    empty_str: function() {
        return STR_NO + STR_SPACE + STR_LIVE_CHANNELS;
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

            this.row.appendChild(
                Screens_createCellLive(
                    this.row_id + '_' + this.coloumn_id,
                    this.ids,
                    ScreensObj_LiveCellArray(cell),
                    this.screen
                )
            );

            this.coloumn_id++;
        }
    },
    key_play: function() {
        if (this.itemsCount) {
            Main_RemoveClass(this.ids[1] + this.posY + '_' + this.posX, 'visibility_hidden');
            Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, this.key_fun, false, this.ScreenName);
        }
    }
};

function ScreensObj_InitLive() {
    ScreenObj[Main_Live] = Screens_assign({
        HeaderQuatity: 2,
        ids: Screens_ScreenIds('Live'),
        table: 'stream_table_live',
        screen: Main_Live,
        object: 'streams',
        ScreenName: 'Live',
        key_pgDown: Main_Featured,
        key_pgUp: Main_Clip,
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
        HeaderQuatity: 2,
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

            ScreensObj_SetTopLable(STR_SEARCH + STR_SPACE + STR_LIVE, "'" + Main_values.Search_data + "'");
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
        HeaderQuatity: 3,
        ids: Screens_ScreenIds('UserLive'),
        ScreenName: 'UserLive',
        table: 'stream_table_user_live',
        screen: Main_UserLive,
        object: 'streams',
        IsUser: true,
        key_pgDown: Main_UserHost,
        key_pgUp: Main_HistoryLive,
        base_url: Main_kraken_api + 'streams/',
        loadChannelOffsset: 0,
        followerChannels: [],
        followerChannelsDone: false,
        set_url: function() {
            this.check_offset();

            if (AddUser_UsernameArray[0].access_token) {
                //User has added a key
                this.HeaderQuatity = 3;
                this.token = Main_OAuth + AddUser_UsernameArray[0].access_token;
                this.url = this.base_url + 'followed?' + 'limit=' + Main_ItemsLimitMax + '&offset=' +
                    this.offset + '&stream_type=all';
            } else {
                //User didn't added a key
                this.HeaderQuatity = 2;
                this.token = null;
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

    ScreenObj[Main_UserLive].concatenate = function(responseText) {
        ////Main_Log(responseText);
        if (this.token || this.followerChannelsDone) {
            //User has added a key or followed channels list is done, concatenate live channels
            if (this.data) {
                responseText = JSON.parse(responseText);

                if (responseText[this.object]) {
                    this.data = this.data.concat(responseText[this.object]);
                    this.offset = this.data.length;
                }

                this.setMax(responseText);
            } else {
                responseText = JSON.parse(responseText);

                this.data = responseText[this.object];
                if (this.data) this.offset = this.data.length;
                else this.data = [];

                this.setMax(responseText);

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
            var response = JSON.parse(responseText).follows,
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

function ScreensObj_InitUserHost() {
    ScreenObj[Main_UserHost] = Screens_assign({
        HeaderQuatity: 1,
        ids: Screens_ScreenIds('UserHost'),
        ScreenName: 'UserHost',
        table: 'stream_table_user_host',
        screen: Main_UserHost,
        object: 'hosts',
        IsUser: true,
        key_pgDown: Main_usergames,
        key_pgUp: Main_UserLive,
        base_url: 'https://api.twitch.tv/api/users/',
        set_url: function() {
            if ((typeof this.MaxOffset !== 'undefined') &&
                this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;

            this.url = this.base_url +
                encodeURIComponent(AddUser_UsernameArray[0].name) +
                '/followed/hosting?limit=' + Main_ItemsLimitMax + '&offset=' + this.offset;
        },
        label_init: function() {
            ScreensObj_TopLableUserInit(this.screen);

            ScreensObj_SetTopLable(STR_USER, STR_LIVE_HOSTS);
        },
    }, Base_obj);

    ScreenObj[Main_UserHost] = Screens_assign(ScreenObj[Main_UserHost], Base_Live_obj);

    ScreenObj[Main_UserHost].addCell = function(cell) {
        if (!this.idObject[cell.target._id]) { //combined id host and hosted

            this.itemsCount++;
            this.idObject[cell.target._id] = 1;

            this.row.appendChild(
                Screens_createCellLive(
                    this.row_id + '_' + this.coloumn_id,
                    this.ids,
                    ScreensObj_HostCellArray(cell),
                    this.screen
                )
            );

            this.coloumn_id++;
        }
    };
    ScreenObj[Main_UserHost].Set_Scroll();
    ScreenObj[Main_UserHost].Headers = Main_Headers_Priv;
}

function ScreensObj_InitAGame() {
    ScreenObj[Main_aGame] = Screens_assign({
        HeaderQuatity: 2,
        ids: Screens_ScreenIds('AGame'),
        ScreenName: 'AGame',
        table: 'stream_table_a_game',
        screen: Main_aGame,
        object: 'streams',
        key_pgDown: Main_Vod,
        key_pgUp: Main_Featured,
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
        },
        label_exit: function() {
            ScreensObj_TopLableAgameExit(this.screen);
        },
        HasSwitches: true,
        SwitchesIcons: ['movie-play', 'movie', 'heart-o'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE + STR_SPACE + STR_VIDEOS,
                    STR_SPACE + STR_SPACE + STR_CLIPS,
                    STR_SPACE + STR_SPACE + STR_FOLLOW
                ],
                this.screen
            );
        },
    }, Base_obj);

    ScreenObj[Main_aGame] = Screens_assign(ScreenObj[Main_aGame], Base_Live_obj);
    ScreenObj[Main_aGame].Set_Scroll();
    ScreenObj[Main_aGame].key_play = function() {
        if (this.itemsCount && this.posY !== -1) {
            Main_RemoveClass(this.ids[1] + this.posY + '_' + this.posX, 'visibility_hidden');

            Main_OpenLiveStream(
                this.posY + '_' + this.posX,
                this.ids,
                this.key_fun,
                false,
                Main_values.Main_BeforeAgameisSet && ScreenObj[Main_values.Main_BeforeAgame].ScreenName ? ScreenObj[Main_values.Main_BeforeAgame].ScreenName : this.ScreenName
            );

        } else AGame_headerOptions(this.screen);
    };
}

function ScreensObj_InitFeatured() {
    ScreenObj[Main_Featured] = Screens_assign({
        HeaderQuatity: 2,
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

var Base_Clip_obj = {
    HeaderQuatity: 2,
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
    object: 'clips',
    period: ['day', 'week', 'month', 'all'],
    img_404: IMG_404_VOD,
    empty_str: function() {
        return STR_NO + STR_SPACE + STR_CLIPS;
    },
    setTODialog: function() {
        Main_AddClass('dialog_thumb_opt_setting_-1', 'hideimp');
        Main_textContent('dialog_thumb_opt_setting_name_3', STR_HISTORY_CLIP_DIS);
    },
    HasSwitches: true,
    SwitchesIcons: ['history', 'play-1'],
    addSwitches: function() {
        ScreensObj_addSwitches(
            [
                STR_SPACE + STR_SPACE + STR_SWITCH_CLIP,
                STR_SPACE + STR_SPACE + STR_PLAY_ALL
            ],
            this.screen
        );
    },
    setMax: function(tempObj) {
        this.cursor = tempObj._cursor;
        if (this.cursor === '') this.dataEnded = true;
    },
    key_play: function() {
        if (this.posY === -1) {
            if (!this.loadingData) {
                if (!this.posX) Screens_PeriodStart(this.screen);
                else {
                    PlayClip_All = true;
                    Screens_removeFocusFollow(this.screen);
                    this.posX = 0;
                    this.posY = 0;
                    Main_OpenClip(this.posY + '_' + this.posX, this.ids, this.key_fun, this.ScreenName);
                }
            }
        } else Main_OpenClip(this.posY + '_' + this.posX, this.ids, this.key_fun, this.ScreenName);
    },
    Cells: [],
    addCell: function(cell) {
        if (!this.idObject[cell.tracking_id]) {
            this.itemsCount++;
            this.idObject[cell.tracking_id] = 1;

            this.row.appendChild(
                Screens_createCellClip(
                    this.row_id + '_' + this.coloumn_id,
                    this.ids,
                    ScreensObj_ClipCellArray(cell),
                    this.screen
                )
            );

            this.coloumn_id++;
        }
    }
};

function ScreensObj_InitClip() {
    ScreenObj[Main_Clip] = Screens_assign({
        ids: Screens_ScreenIds('Clip'),
        ScreenName: 'Clip',
        table: 'stream_table_clip',
        screen: Main_Clip,
        key_pgDown: Main_Live,
        key_pgUp: Main_Vod,
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

            ScreensObj_SetTopLable(Main_values.Main_selectedChannelDisplayname, STR_CLIPS + STR_SPACE +
                Main_Periods[this.periodPos - 1]);
        },
        label_init: function() {
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

            ScreensObj_SetTopLable(Main_values.Main_gameSelected, STR_CLIPS + STR_SPACE +
                Main_Periods[this.periodPos - 1]);
        },
        label_init: function() {
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

var Base_Game_obj = {
    HeaderQuatity: 2,
    thumbclass: 'stream_thumbnail_game_holder',
    ItemsReloadLimit: Main_ItemsReloadLimitGame,
    ItemsLimit: Main_ItemsLimitGame,
    rowClass: 'animate_height_transition_games',
    ColoumnsCount: Main_ColoumnsCountGame,
    addFocus: Screens_addFocusVideo,
    img_404: IMG_404_GAME,
    screenType: 3,
    empty_str: function() {
        return STR_NO + STR_SPACE + STR_LIVE_GAMES;
    },
    setTODialog: Screens_ThumbOptionHideSpecial,
    key_play: function() {
        Main_removeFocus(this.posY + '_' + this.posX, this.ids);

        Main_values.Main_gameSelected = JSON.parse(Main_getElementById(this.ids[3] + this.posY + '_' + this.posX).getAttribute(Main_DataAttribute));
        Main_values.Main_gameSelected_id = Main_values.Main_gameSelected[3];
        Main_values.Main_gameSelected = Main_values.Main_gameSelected[1];

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
        var game = hasLive ? cell.game : cell;
        if (!this.idObject[game._id]) {

            this.itemsCount++;
            this.idObject[game._id] = 1;

            this.row.appendChild(
                Screens_createCellGame(
                    this.row_id + '_' + this.coloumn_id,
                    this.ids,
                    [game.box.template.replace("{width}x{height}", Main_GameSize),
                    game.name,
                    hasLive ? Main_addCommas(cell.channels) + STR_SPACE + STR_CHANNELS + STR_BR + STR_FOR +
                        Main_addCommas(cell.viewers) + STR_SPACE + STR_VIEWER : '',
                    game._id
                    ],
                    this.screen
                )
            );

            this.coloumn_id++;
        }
    }
};

function ScreensObj_InitGame() {
    ScreenObj[Main_games] = Screens_assign({
        ids: Screens_ScreenIds('Game'),
        ScreenName: 'Game',
        table: 'stream_table_games',
        screen: Main_games,
        key_pgDown: Main_Vod,
        key_pgUp: Main_Featured,
        object: 'top',
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
}

function ScreensObj_InitUserGames() {
    ScreenObj[Main_usergames] = Screens_assign({
        ids: Screens_ScreenIds('UserGames'),
        ScreenName: 'UserGames',
        table: 'stream_table_user_games',
        screen: Main_usergames,
        key_pgDownNext: Main_UserChannels,
        key_pgDown: Main_UserVod,
        key_pgUp: Main_UserHost,
        isLive: Main_getItemBool('user_Games_live', true),
        OldUserName: '',
        IsUser: true,
        object: 'follows',
        base_url: 'https://api.twitch.tv/api/users/',
        set_url: function() {

            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + encodeURIComponent(AddUser_UsernameArray[0].name) + '/follows/games';

            if (this.isLive) this.url += '/live?limit=250';
            else this.url += '?limit=' + Main_ItemsLimitMax + '&offset=' + this.offset;
        },
        key_refresh: function() {
            this.isLive = !this.isLive;

            ScreensObj_SetTopLable(STR_USER, (this.isLive ? STR_LIVE_GAMES : STR_FOLLOW_GAMES));

            Screens_StartLoad(this.screen);

            Main_setItem('user_Games_live', this.isLive ? 'true' : 'false');
        },
        label_init: function() {
            ScreensObj_TopLableUserInit(this.screen);
            Main_IconLoad('label_refresh', 'icon-refresh', STR_USER_GAMES_CHANGE + STR_LIVE_GAMES + '/' + STR_FOLLOW_GAMES + ":" + STR_GUIDE);

            ScreensObj_SetTopLable(STR_USER, (this.isLive ? STR_LIVE_GAMES : STR_FOLLOW_GAMES));
        },
        label_exit: function() {
            Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);
        },
    }, Base_obj);

    ScreenObj[Main_usergames] = Screens_assign(ScreenObj[Main_usergames], Base_Game_obj);
    ScreenObj[Main_usergames].HeaderQuatity = 1;
    ScreenObj[Main_usergames].start_fun = function() {
        if (!this.loadingData) this.key_refresh();
    };
    ScreenObj[Main_usergames].Set_Scroll();
    ScreenObj[Main_usergames].Headers = Main_Headers_Priv;
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

            ScreensObj_SetTopLable(STR_SEARCH + STR_SPACE + STR_GAMES, "'" + Main_values.Search_data + "'");
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

var Base_Channel_obj = {
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
    setTODialog: Screens_ThumbOptionHideSpecial,
    empty_str: function() {
        return STR_NO + STR_SPACE + STR_USER_CHANNEL;
    },
    addCellTemp: function(cell) {
        if (!this.idObject[cell._id]) {

            this.itemsCount++;
            this.idObject[cell._id] = 1;

            this.row.appendChild(
                Screens_createCellChannel(
                    this.row_id + '_' + this.coloumn_id,
                    this.ids,
                    [cell.name, cell._id, cell.logo, cell.display_name, cell.partner],
                    this.screen
                )
            );

            this.coloumn_id++;
        }
    },
    base_key_play: function(go_screen, IsFollowing) {
        if (Main_ThumbOpenIsNull(this.posY + '_' + this.posX, this.ids[0])) return;

        Main_values.Main_selectedChannel = JSON.parse(Main_getElementById(this.ids[3] + this.posY + '_' + this.posX).getAttribute(Main_DataAttribute));

        Main_values.Main_selectedChannel_id = Main_values.Main_selectedChannel[1];
        Main_values.Main_selectedChannelDisplayname = Main_values.Main_selectedChannel[3];
        Main_values.Main_selectedChannelLogo = Main_values.Main_selectedChannel[2];
        Main_values.Main_selectedChannel = Main_values.Main_selectedChannel[0];
        //console.log(Main_values.Main_selectedChannel);
        //console.log(Main_values.Main_selectedChannel_id);

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

function ScreensObj_InitUserChannels() {
    ScreenObj[Main_UserChannels] = Screens_assign({
        HeaderQuatity: 2,
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
        HeaderQuatity: 2,
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

            ScreensObj_SetTopLable(STR_SEARCH + STR_SPACE + STR_CHANNELS, "'" + Main_values.Search_data + "'");
        },
        label_exit: function() {
            if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
        },
        key_play: function() {
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

var Base_History_obj = {
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
    histPosXTemp: [0, 0, 0],
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
    UpEna: function() {
        this.histEna = [
            STR_YES,
            STR_NO
        ];
    },
    histArrays: [],
    UpArrays: function() {
        this.histArrays = [
            this.sorting,
            this.histEna,
            [STR_PRESS_ENTER_D]
        ];
    },
    set_url: empty_fun,
    empty_str: function() {
        return STR_NO + STR_SPACE + STR_HISTORY;
    },
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
        Main_getElementById("dialog_hist_left_1").style.opacity = "0";
        Main_getElementById("dialog_hist_right_1").style.opacity = "0";
        this.histPosXTemp = Main_Slice(this.histPosX);
    }
};

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
        histPosX: Main_getItemJson('HistoryLive_histPosX', [0, 0, 0]),
        sethistDialog: function() {
            Screens_SethistDialogId();
            Main_innerHTML("dialog_hist_text", STR_LIVE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_SETTINGS);
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
                STR_HISTORY + STR_SPACE + STR_LIVE + STR_SPACE +
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

                this.row.appendChild(
                    Screens_createCellLive(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        cell.data,
                        this.screen,
                        cell.date,
                        cell.vodimg,
                        (this.streamerID[cell.data[14]] && cell.vodid) || cell.forceVod
                    )
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
                    STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_VIDEOS,
                    STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_CLIPS,
                    STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_LIVE + STR_SPACE + STR_SETTINGS
                ],
                this.screen
            );
        },
    }, Base_obj);

    ScreenObj[Main_HistoryLive] = Screens_assign(ScreenObj[Main_HistoryLive], Base_History_obj);
    ScreenObj[Main_HistoryLive].Upsorting();
    ScreenObj[Main_HistoryLive].Set_Scroll();
    ScreenObj[Main_HistoryLive].key_play = function() {
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
                Main_RemoveClass(this.ids[1] + this.posY + '_' + this.posX, 'visibility_hidden');
                Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, this.key_fun, true, this.ScreenName);
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
        histPosX: Main_getItemJson('HistoryVod_histPosX', [0, 0, 0]),
        sethistDialog: function() {
            Screens_SethistDialogId();
            Main_innerHTML("dialog_hist_text", STR_VIDEOS + STR_SPACE + STR_HISTORY + STR_SPACE + STR_SETTINGS);
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
                STR_HISTORY + STR_SPACE + STR_VIDEOS + STR_SPACE +
                '(' + this.sorting[this.histPosX[0]] + ')'
            );
        },
        key_play: function() {

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
            } else Main_OpenVodStart(this.posY + '_' + this.posX, this.ids, this.key_fun, this.ScreenName);

        },
        addCell: function(cell) {
            if (!this.idObject[cell.data[7]]) {

                this.itemsCount++;
                this.idObject[cell.data[7]] = 1;

                this.row.appendChild(
                    Screens_createCellVod(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        cell.data,
                        this.screen,
                        cell.date,
                        cell.watched
                    )
                );

                this.coloumn_id++;
            }
        },
        SwitchesIcons: ['play', 'movie', 'settings'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_LIVE,
                    STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_CLIPS,
                    STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_VIDEOS + STR_SPACE + STR_SETTINGS
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
        histPosX: Main_getItemJson('HistoryClip_histPosX', [0, 0, 0]),
        sethistDialog: function() {
            Screens_SethistDialogId();
            Main_innerHTML("dialog_hist_text", STR_CLIPS + STR_SPACE + STR_HISTORY + STR_SPACE + STR_SETTINGS);
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
                STR_HISTORY + STR_SPACE + STR_CLIPS + STR_SPACE +
                '(' + this.sorting[this.histPosX[0]] + ')'
            );

        },
        key_play: function() {

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
            } else Main_OpenClip(this.posY + '_' + this.posX, this.ids, this.key_fun, this.ScreenName);

        },
        addCell: function(cell) {
            if (!this.idObject[cell.data[7]]) {

                this.itemsCount++;
                this.idObject[cell.data[7]] = 1;

                this.row.appendChild(
                    Screens_createCellClip(
                        this.row_id + '_' + this.coloumn_id,
                        this.ids,
                        cell.data,
                        this.screen,
                        cell.date,
                        cell.watched
                    )
                );

                this.coloumn_id++;
            }
        },
        SwitchesIcons: ['play', 'movie-play', 'settings'],
        addSwitches: function() {
            ScreensObj_addSwitches(
                [
                    STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_LIVE,
                    STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_VIDEOS,
                    STR_SPACE + STR_SPACE + STR_HISTORY + STR_SPACE + STR_CLIPS + STR_SPACE + STR_SETTINGS
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

function ScreensObj_TopLableAgameInit(key) {
    if (Main_values.Main_OldgameSelected === null) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;

    Main_IconLoad('label_thumb', 'icon-return', STR_GOBACK);
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ":" + STR_GUIDE);

    if (Main_values.Main_OldgameSelected !== Main_values.Main_gameSelected ||
        ScreenObj[key].gameSelected !== Main_values.Main_gameSelected)
        ScreenObj[key].status = false;

    ScreenObj[key].gameSelected = Main_values.Main_gameSelected;
    Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;

    if (Main_values.Sidepannel_IsUser || Main_values.Main_BeforeAgame === Main_usergames) Sidepannel_SetUserLables();
    else Sidepannel_SetDefaultLables();

    Sidepannel_SetTopOpacity(ScreenObj[key].screen);

    Main_EventAgame(Main_values.Main_gameSelected);
}

function ScreensObj_TopLableAgameExit(key) {
    ScreenObj[key].gameSelected = Main_values.Main_gameSelected;
    Main_IconLoad('label_thumb', 'icon-options', STR_THUMB_OPTIONS_TOP);
}

function ScreensObj_TopLableUserInit(key) {
    if (ScreenObj[key].OldUserName !== AddUser_UsernameArray[0].name) ScreenObj[key].status = false;
    ScreenObj[key].OldUserName = AddUser_UsernameArray[0].name;

    Sidepannel_SetUserLables();
    Sidepannel_SetTopOpacity(ScreenObj[key].screen);
}

function ScreensObj_SetTopLable(text, small_text) {
    Main_innerHTML('top_lable', text + STR_SPACE + (small_text ? '<div style="font-size: 65%;display: inline-block;">' + small_text + '</div>' : ""));
}

function ScreensObj_LiveCellArray(cell) {
    return [
        cell.preview.template,//0
        cell.channel.display_name,//1
        cell.channel.status,//2
        cell.game,//3
        STR_FOR + Main_addCommas(cell.viewers) + STR_SPACE + STR_VIEWER,//4
        Main_videoqualitylang(cell.video_height, cell.average_fps, cell.channel.broadcaster_language),//5
        cell.channel.name,//6
        cell._id,//7 broadcast id
        Main_is_rerun(cell.broadcast_platform),//8
        cell.channel.logo,//9
        cell.channel.partner,//10
        STR_SINCE + Play_streamLiveAt(cell.created_at) + STR_SPACE,//11
        cell.created_at,//12
        cell.viewers,//13
        cell.channel._id,//14
        cell.channel.broadcaster_language//15
    ];
}

function ScreensObj_HostCellArray(cell) {
    return [
        cell.target.preview_urls.template,//0
        cell.display_name + STR_USER_HOSTING + cell.target.channel.display_name,//1
        cell.target.title, //2
        cell.target.meta_game,//3
        STR_FOR.charAt(0).toUpperCase() + STR_FOR.slice(1) +
        Main_addCommas(cell.target.viewers) + STR_SPACE + STR_VIEWER,//4
        '',//5 quality
        cell.target.channel.name,//6
        '',//7 broadcast id
        false,//8
        cell.target.channel.logo,//9
        '',//10 partner
        '',//11 stream creat at string
        '',//12 stream creat at
        cell.target.viewers,//13
        cell.target._id,//14
        cell.target.channel.display_name,//15
        true//16 is hosting
    ];
}

function ScreensObj_VodCellArray(cell) {
    return [
        //When the live hasn't yet ended the img is a default gray one, but the final is alredy generated for some reason not used
        Main_A_includes_B(cell.preview.template + '', '404_processing') ? 'https://static-cdn.jtvnw.net/s3_vods/' + cell.animated_preview_url.split('/')[3] +
            '/thumb/thumb0-' + Main_VideoSize + '.jpg' : cell.preview.template.replace("{width}x{height}", Main_VideoSize),//0
        cell.channel.display_name,//1
        STR_STREAM_ON + Main_videoCreatedAt(cell.created_at),//2
        cell.game,//3
        Main_addCommas(cell.views) + STR_VIEWS,//4
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
        Main_addCommas(cell.views) + STR_VIEWS,//14
        cell.thumbnails.medium,//15
        STR_CREATED_AT + Main_videoCreatedAt(cell.created_at),//16
        cell.language//17
    ];
}

function ScreensObj_AnimateThumbId(screen) {
    Main_clearInterval(screen.AnimateThumbId);
    if (!Settings_Obj_default("videos_animation")) return;
    var div = Main_getElementById(screen.ids[5] + screen.posY + '_' + screen.posX);

    // Only load the animation if it can be loaded
    // This prevent starting animating before it has loaded or animated a empty image
    screen.Vod_newImg.onload = function() {
        this.onload = null;
        Main_AddClass(screen.ids[1] + screen.posY + '_' + screen.posX, 'visibility_hidden');
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
