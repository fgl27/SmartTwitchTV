var Main_ItemsLimitVideo = 45;
var Main_ColoumnsCountVideo = 3;
var Main_ItemsReloadLimitVideo = Math.floor((Main_ItemsLimitVideo / Main_ColoumnsCountVideo) / Main_ReloadLimitOffsetVideos);
var Main_ThumbPading = 7.5;
var Main_ThumbWidth = 1881; // window.innerWidth = 1920px - 2%  = 1881)
var ChannelClip_game = '';
var ChannelClip_views = '';
var ChannelClip_title = '';
var ChannelClip_playUrl = '';
var ChannelClip_createdAt = '';
var ChannelClip_language = '';

//Screens
var Clip;
var ChannelClip;
var AGameClip;

var Base_obj = {
    posX: 0,
    posY: 0,
    row_id: 0,
    coloumn_id: 0,
    dataEnded: false,
    idObject: {},
    loadingData: false,
    itemsCount: 0,
    loadingDataTryMax: 5,
    loadingDataTimeout: 3500,
    MaxOffset: 0,
    emptyContent: false,
    itemsCountCheck: false,
    FirstLoad: false,
    row: 0,
    data: null,
    data_cursor: 0,
    ThumbPading: Main_ThumbPading,
    key_blue: function() {
        if (!Search_isSearching) Main_BeforeSearch = inUseObj.screen;
        Main_Go = Main_Search;
        Screens_exit();
        Main_SwitchScreen();
    },
    set_ThumbSize: function() {
        // on a 1881px screen size - 2%, ColoumnsCount = 3 and ThumbPading = 7.5, Main_ThumbWidth must result in 612px
        this.ThumbCssText = 'width: ' + parseInt((Main_ThumbWidth / this.ColoumnsCount) - (this.ThumbPading * 2)) + 'px; display: inline-block; padding: ' + this.ThumbPading + 'px;';
    }
};

var Base_Clip_obj = {
    ItemsLimit: Main_ItemsLimitVideo,
    ItemsReloadLimit: Main_ItemsReloadLimitVideo,
    ColoumnsCount: Main_ColoumnsCountVideo,
    cursor: null,
    periodPos: 2,
    period: ['day', 'week', 'month', 'all'],
    type: 2 //2 = clip, 0 = live, 1 = vod
};

function ScreensObj_InitClip() {
    Clip = Screens_assign({
        ids: Screens_ScreenIds('Clip'),
        table: 'stream_table_clip',
        screen: Main_Clip,
        base_url: 'https://api.twitch.tv/kraken/clips/top?limit=',
        set_url: function() {
            this.url = this.base_url + (this.ItemsLimit * 2) +
                '&period=' + this.period[this.periodPos - 1] + (this.cursor ? '&cursor=' + this.cursor : '') +
                (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
        },
        concatenate: function(responseText) {
            if (this.data) {
                var tempObj = JSON.parse(responseText);
                this.cursor = tempObj._cursor;
                if (this.cursor === '') this.dataEnded = true;
                this.data = this.data.concat(tempObj.clips);
                inUseObj.loadingData = false;
            } else {
                this.data = JSON.parse(responseText);
                this.cursor = this.data._cursor;
                if (this.cursor === '') this.dataEnded = true;

                this.data = this.data.clips;
                this.loadDataSuccess();
                inUseObj.loadingData = false;
            }
        },
        loadDataSuccess: Screens_loadDataSuccessClip,
        SetPeriod: Screens_Clip_SetPeriod,
        label_init: function() {
            this.SetPeriod();
            Main_AddClass('top_bar_clip', 'icon_center_focus');
            Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
            Main_IconLoad('label_extra', 'icon-history', STR_SWITCH_CLIP + ' (C)');
            Main_ShowElement('label_extra');
        },
        label_exit: function() {
            Main_RestoreTopLabel();
            Main_RemoveClass('top_bar_clip', 'icon_center_focus');
            Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
            Main_HideElement('label_extra');
        },
        key_exit: function() {
            Screens_BasicExit(Main_Before);
        },
        key_channelup: function() {
            Main_Before = this.screen;
            Main_Go = Main_Live;
            Screens_exit();
            Main_SwitchScreen();
        },
        key_channeldown: function() {
            Main_Before = this.screen;
            Main_Go = Main_Vod;
            Screens_exit();
            Main_SwitchScreen();
        },
        key_play: function() {
            Main_OpenClip(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
        },
        key_yellow: function() {
            if (!this.loadingData) {
                this.periodPos++;
                if (this.periodPos > 4) this.periodPos = 1;
                this.SetPeriod();
                Screens_StartLoad();
            }
        },
        key_green: function() {
            Screens_exit();
            Main_GoLive();
        }
    }, Base_obj);

    Clip = Screens_assign(Clip, Base_Clip_obj);
    Clip.set_ThumbSize();
}

function ScreensObj_InitChannelClip() {
    ChannelClip = Screens_assign({
        ids: Screens_ScreenIds('ChannelClip'),
        table: 'stream_table_channel_clip',
        screen: Main_ChannelClip,
        base_url: 'https://api.twitch.tv/kraken/clips/top?channel=',
        set_url: function() {
            this.url = this.base_url + encodeURIComponent(Main_selectedChannel) +
                '&limit=' + (this.ItemsLimit * 2) + '&period=' +
                this.period[this.periodPos - 1] + (this.cursor ? '&cursor=' + this.cursor : '');
        },
        concatenate: function(responseText) {
            if (this.data) {
                var tempObj = JSON.parse(responseText);
                this.cursor = tempObj._cursor;
                if (this.cursor === '') this.dataEnded = true;

                this.data = this.data.concat(tempObj.clips);
                inUseObj.loadingData = false;
            } else {
                this.data = JSON.parse(responseText);
                this.cursor = this.data._cursor;
                if (this.cursor === '') this.dataEnded = true;

                this.data = this.data.clips;
                this.loadDataSuccess();
                inUseObj.loadingData = false;
            }
        },
        loadDataSuccess: Screens_loadDataSuccessClip,
        SetPeriod: Screens_ChannelClip_SetPeriod,
        label_init: function() {
            if (!Search_isSearching && ChannelContent_ChannelValue.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
            if (Main_selectedChannel !== this.lastselectedChannel) this.status = false;
            Main_cleanTopLabel();
            this.SetPeriod();
            Main_textContent('top_bar_user', Main_selectedChannelDisplayname);
            Main_IconLoad('label_switch', 'icon-history', STR_SWITCH_CLIP + STR_KEY_UP_DOWN);
            this.lastselectedChannel = Main_selectedChannel;
        },
        label_exit: Main_RestoreTopLabel,
        key_exit: function() {
            Screens_BasicExit(Main_ChannelContent);
        },
        key_channelup: function() {
            if (!this.loadingData) {
                this.periodPos++;
                if (this.periodPos > 4) this.periodPos = 1;
                this.SetPeriod();
                Screens_StartLoad();
            }
        },
        key_channeldown: function() {
            if (!this.loadingData) {
                this.periodPos--;
                if (this.periodPos < 1) this.periodPos = 4;
                this.SetPeriod();
                Screens_StartLoad();
            }
        },
        key_play: function() {
            Main_OpenClip(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
        },
        key_yellow: Main_showControlsDialog,
        key_green: function() {
            Screens_exit();
            Main_GoLive();
        },
        key_blue: function() {
            if (!Search_isSearching) {
                ChannelContent_SetChannelValue();
                Main_BeforeSearch = inUseObj.screen;
            }
            Main_Go = Main_Search;
            Screens_exit();
            Main_SwitchScreen();
        }
    }, Base_obj);

    ChannelClip = Screens_assign(ChannelClip, Base_Clip_obj);
    ChannelClip.set_ThumbSize();
}

function ScreensObj_InitAGameClip() {
    AGameClip = Screens_assign({
        ids: Screens_ScreenIds('AGameClip'),
        table: 'stream_table_a_game_clip',
        screen: Main_AGameClip,
        base_url: 'https://api.twitch.tv/kraken/clips/top?game=',
        set_url: function() {
            this.url = this.base_url + encodeURIComponent(Main_gameSelected) + '&limit=' + (this.ItemsLimit * 2) +
                '&period=' + this.period[this.periodPos - 1] + (this.cursor ? '&cursor=' + this.cursor : '') +
                (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
        },
        concatenate: function(responseText) {
            if (this.data) {
                var tempObj = JSON.parse(responseText);
                this.cursor = tempObj._cursor;
                if (this.cursor === '') this.dataEnded = true;
                this.data = this.data.concat(tempObj.clips);
                inUseObj.loadingData = false;
            } else {
                this.data = JSON.parse(responseText);
                this.cursor = this.data._cursor;
                if (this.cursor === '') this.dataEnded = true;

                this.data = this.data.clips;
                this.loadDataSuccess();
                inUseObj.loadingData = false;
            }
        },
        loadDataSuccess: Screens_loadDataSuccessClip,
        SetPeriod: Screens_AGameClip_SetPeriod,
        label_init: function() {
            this.SetPeriod();
            Main_AddClass('top_bar_game', 'icon_center_focus');
            Main_IconLoad('label_extra', 'icon-arrow-circle-left', STR_GOBACK);
            Main_IconLoad('label_switch', 'icon-history', STR_SWITCH_CLIP + STR_KEY_UP_DOWN);
            Main_ShowElement('label_extra');
        },
        label_exit: function() {
            Main_RemoveClass('top_bar_game', 'icon_center_focus');
            Main_innerHTML('top_bar_game', STR_GAMES);
            Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
            Main_HideElement('label_extra');
        },
        key_exit: function() {
            Screens_BasicExit(Main_aGame);
        },
        key_channelup: function() {
            if (!this.loadingData) {
                this.periodPos++;
                if (this.periodPos > 4) this.periodPos = 1;
                this.SetPeriod();
                Screens_StartLoad();
            }
        },
        key_channeldown: function() {
            if (!this.loadingData) {
                this.periodPos--;
                if (this.periodPos < 1) this.periodPos = 4;
                this.SetPeriod();
                Screens_StartLoad();
            }
        },
        key_play: function() {
            Main_OpenClip(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
        },
        key_yellow: Main_showControlsDialog,
        key_green: function() {
            Screens_exit();
            Main_GoLive();
        }
    }, Base_obj);

    AGameClip = Screens_assign(AGameClip, Base_Clip_obj);
    AGameClip.set_ThumbSize();
}