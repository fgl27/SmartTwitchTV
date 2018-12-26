var Main_ItemsLimitMax = 100;
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
var Game;
var UserGames;

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
    offset: 0,
    status: false,
    emptyContent: false,
    itemsCountCheck: false,
    FirstLoad: false,
    row: 0,
    data: null,
    data_cursor: 0,
    loadDataSuccess: Screens_loadDataSuccess,
    ThumbPading: Main_ThumbPading,
    key_blue: function() {
        if (!Main_values.Search_isSearching) Main_values.Main_BeforeSearch = inUseObj.screen;
        Main_values.Main_Go = Main_Search;
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
    addFocus: Main_addFocusVideo,
    cursor: null,
    key_refresh: Screens_StartLoad,
    period: ['day', 'week', 'month', 'all'],
    img_404: IMG_404_VIDEO,
    empty_str: function() {
        return STR_NO + STR_CLIPS;
    },
    addCell: function(cell) {
        if (!inUseObj.idObject[cell.tracking_id]) {

            inUseObj.itemsCount++;
            inUseObj.idObject[cell.tracking_id] = 1;

            inUseObj.row.appendChild(Screens_createCellClip(inUseObj.row_id,
                inUseObj.coloumn_id,
                inUseObj.ids,
                cell.thumbnails.medium,
                cell.broadcaster.display_name,
                [STR_CREATED_AT,
                    Main_videoCreatedAt(cell.created_at)
                ],
                [twemoji.parse(cell.title), STR_PLAYING, cell.game],
                Main_addCommas(cell.views),
                '[' + cell.language.toUpperCase() + ']',
                cell.duration,
                cell.slug,
                cell.broadcaster.name,
                cell.broadcaster.logo.replace("150x150", "300x300"),
                cell.broadcaster.id,
                (cell.vod !== null ? cell.vod.id : null),
                (cell.vod !== null ? cell.vod.offset : null)));

            inUseObj.coloumn_id++;
        }
    }
};

var Base_Game_obj = {
    ItemsLimit: Main_ItemsLimitGame,
    ItemsReloadLimit: Main_ItemsReloadLimitGame,
    ColoumnsCount: Main_ColoumnsCountGame,
    addFocus: Main_addFocusGame,
    img_404: IMG_404_GAME,
    empty_str: function() {
        return STR_NO + STR_LIVE_GAMES;
    }
};

function ScreensObj_InitClip() {
    Clip = Screens_assign({
        ids: Screens_ScreenIds('Clip'),
        table: 'stream_table_clip',
        screen: Main_Clip,
        periodPos: Main_getItemInt('Clip_periodPos', 2),
        base_url: 'https://api.twitch.tv/kraken/clips/top?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            this.url = this.base_url + '&period=' + this.period[this.periodPos - 1] +
                (this.cursor ? '&cursor=' + this.cursor : '') +
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
        SetPeriod: function() {
            Main_innerHTML('top_bar_clip', STR_CLIPS + Main_UnderCenter(Main_Periods[this.periodPos - 1]));
            Main_setItem('Clip_periodPos', this.periodPos);
        },
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
            Screens_BasicExit(Main_values.Main_Before);
        },
        key_channelup: function() {
            Main_values.Main_Before = this.screen;
            Main_values.Main_Go = Main_Live;
            Screens_exit();
            Main_SwitchScreen();
        },
        key_channeldown: function() {
            Main_values.Main_Before = this.screen;
            Main_values.Main_Go = Main_Vod;
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
        periodPos: Main_getItemInt('ChannelClip_periodPos', 2),
        base_url: 'https://api.twitch.tv/kraken/clips/top?channel=',
        set_url: function() {
            this.url = this.base_url + encodeURIComponent(Main_values.Main_selectedChannel) +
                '&limit=' + Main_ItemsLimitMax + '&period=' +
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
        SetPeriod: function() {
            Main_innerHTML('top_bar_game', STR_CLIPS + Main_Periods[this.periodPos - 1]);
            Main_setItem('ChannelClip_periodPos', this.periodPos);
        },
        label_init: function() {
            if (!Main_values.Search_isSearching && Main_values.Main_selectedChannel_id)
                ChannelContent_RestoreChannelValue();
            if (Main_values.Main_selectedChannel !== this.lastselectedChannel) this.status = false;
            Main_cleanTopLabel();
            this.SetPeriod();
            Main_textContent('top_bar_user', Main_values.Main_selectedChannelDisplayname);
            Main_IconLoad('label_switch', 'icon-history', STR_SWITCH_CLIP + STR_KEY_UP_DOWN);
            this.lastselectedChannel = Main_values.Main_selectedChannel;
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
            if (!Main_values.Search_isSearching) {
                ChannelContent_SetChannelValue();
                Main_values.Main_BeforeSearch = inUseObj.screen;
            }
            Main_values.Main_Go = Main_Search;
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
        periodPos: Main_getItemInt('AGameClip_periodPos', 2),
        base_url: 'https://api.twitch.tv/kraken/clips/top?game=',
        set_url: function() {
            this.url = this.base_url + encodeURIComponent(Main_values.Main_gameSelected) + '&limit=' + Main_ItemsLimitMax +
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
        SetPeriod: function() {
            Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter(STR_CLIPS +
                Main_Periods[this.periodPos - 1] + ': ' + Main_values.Main_gameSelected));
            Main_setItem('AGameClip_periodPos', this.periodPos);
        },
        label_init: function() {
            this.SetPeriod();
            Main_AddClass('top_bar_game', 'icon_center_focus');
            Main_IconLoad('label_extra', 'icon-arrow-circle-left', STR_GOBACK);
            Main_IconLoad('label_switch', 'icon-history', STR_SWITCH_CLIP + STR_KEY_UP_DOWN);
            Main_ShowElement('label_extra');
            if (this.gameSelected !== Main_values.Main_gameSelected) this.status = false;
            this.gameSelected = Main_values.Main_gameSelected;
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

function ScreensObj_InitGame() {
    Game = Screens_assign({
        ids: Screens_ScreenIds('Game'),
        table: 'stream_table_games',
        screen: Main_games,
        base_url: 'https://api.twitch.tv/kraken/games/top?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + '&offset=' + this.offset;
        },
        concatenate: function(responseText) {
            if (this.data) {
                var tempObj = JSON.parse(responseText);

                this.MaxOffset = this.data._total;
                this.data = this.data.concat(tempObj.top);

                this.offset = this.data.length;
                if (this.offset > this.MaxOffset) this.dataEnded = true;

                inUseObj.loadingData = false;
            } else {
                this.data = JSON.parse(responseText);

                this.MaxOffset = this.data._total;
                this.data = this.data.top;

                this.offset = this.data.length;
                if (this.offset > this.MaxOffset) this.dataEnded = true;

                this.loadDataSuccess();
                inUseObj.loadingData = false;
            }
        },
        label_init: function() {
            Main_AddClass('top_bar_game', 'icon_center_focus');
        },
        label_exit: function() {
            Main_RemoveClass('top_bar_game', 'icon_center_focus');
        },
        key_refresh: Screens_StartLoad,
        key_exit: function() {
            if (Main_values.Main_Go === Main_values.Main_Before || Main_values.Main_Before === Main_aGame || Main_values.Main_Before === Main_Search) Screens_BasicExit(Main_Live);
            else Screens_BasicExit(Main_values.Main_Before);
        },
        key_channelup: function() {
            Main_values.Main_Before = this.screen;
            Main_values.Main_Go = Main_Vod;
            Screens_exit();
            Main_SwitchScreen();
        },
        key_channeldown: function() {
            Main_values.Main_Before = this.screen;
            Main_values.Main_Go = Main_Featured;
            Screens_exit();
            Main_SwitchScreen();
        },
        key_play: function() {
            Main_values.Main_gameSelected = document.getElementById(this.ids[5] + this.posY + '_' + this.posX).getAttribute(Main_DataAttribute);
            document.body.removeEventListener("keydown", Screens_handleKeyDown);
            Main_values.Main_BeforeAgame = this.screen;
            Main_values.Main_Go = Main_aGame;
            Main_values.Main_BeforeAgameisSet = true;
            AGame_UserGames = false;
            Screens_exit();
            Main_SwitchScreen();
        },
        key_yellow: Main_showControlsDialog,
        key_green: function() {
            Screens_exit();
            Main_GoLive();
        },
        addCell: function(cell) {
            if (!inUseObj.idObject[cell.game._id]) {

                inUseObj.itemsCount++;
                inUseObj.idObject[cell.game._id] = 1;

                inUseObj.row.appendChild(Screens_createCellGame(inUseObj.row_id,
                    inUseObj.coloumn_id,
                    inUseObj.ids,
                    cell.game.box.template.replace("{width}x{height}", Main_GameSize),
                    cell.game.name,
                    Main_addCommas(cell.channels) + ' ' + STR_CHANNELS + STR_FOR + Main_addCommas(cell.viewers) + STR_VIEWER));

                inUseObj.coloumn_id++;
            }
        }
    }, Base_obj);

    Game = Screens_assign(Game, Base_Game_obj);
    Game.set_ThumbSize();
}

function ScreensObj_InitUserGames() {
    UserGames = Screens_assign({
        ids: Screens_ScreenIds('UserGames'),
        table: 'stream_table_user_games',
        screen: Main_usergames,
        isLive: Main_getItemBool('user_Games_live', true),
        OldUserName: '',
        base_url: 'https://api.twitch.tv/api/users/',
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].name) + '/follows/games';

            if (this.isLive) this.url += '/live?limit=750';
            else this.url += '?limit=' + Main_ItemsLimitMax + '&offset=' + this.offset;
        },
        concatenate: function(responseText) {
            if (this.data) {
                var tempObj = JSON.parse(responseText);

                this.MaxOffset = this.data._total;
                this.data = this.data.concat(tempObj.follows);

                this.offset = this.data.length;
                if (this.offset > this.MaxOffset) this.dataEnded = true;

                inUseObj.loadingData = false;
            } else {

                this.data = JSON.parse(responseText);

                this.MaxOffset = this.data._total;
                this.data = this.data.follows;

                this.offset = this.data.length;
                if (this.isLive) this.dataEnded = true;
                else if (this.offset > this.MaxOffset) this.dataEnded = true;

                this.loadDataSuccess();
                inUseObj.loadingData = false;
            }
        },
        label_init: function() {
            Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH_USER);
            Main_IconLoad('label_refresh', 'icon-refresh', STR_USER_GAMES_CHANGE + STR_LIVE_GAMES + '/' + STR_FALLOW_GAMES + STR_GUIDE);
            Main_AddClass('top_bar_user', 'icon_center_focus');

            if (this.OldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) this.status = false;

            this.OldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;

            Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + ' ' + (this.isLive ? STR_LIVE_GAMES : STR_FALLOW_GAMES)));
        },
        label_exit: function() {
            Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
            Main_RemoveClass('top_bar_user', 'icon_center_focus');
            Main_textContent('top_bar_user', STR_USER);
            Main_IconLoad('label_switch', 'icon-switch', STR_SWITCH);
        },
        key_refresh: function() {
            this.isLive = !this.isLive;

            Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + ' ' + (this.isLive ? STR_LIVE_GAMES : STR_FALLOW_GAMES)));

            Screens_StartLoad();

            Main_setItem('user_Games_live', this.isLive ? 'true' : 'false');
            Users_resetGameCell();

        },
        key_exit: function() {
            Screens_BasicExit(Main_Users);
        },
        key_channelup: function() {
            Main_values.Main_Before = this.screen;
            if (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token) Main_values.Main_Go = Main_UserVod;
            else Main_values.Main_Go = Main_UserChannels;
            Screens_exit();
            Main_SwitchScreen();
        },
        key_channeldown: function() {
            Main_values.Main_Before = this.screen;
            Main_values.Main_Go = Main_UserHost;
            Screens_exit();
            Main_SwitchScreen();
        },
        key_play: function() {
            Main_values.Main_gameSelected = document.getElementById(this.ids[5] + this.posY + '_' + this.posX).getAttribute(Main_DataAttribute);
            document.body.removeEventListener("keydown", Screens_handleKeyDown);
            Main_values.Main_BeforeAgame = this.screen;
            Main_values.Main_Go = Main_aGame;
            Main_values.Main_BeforeAgameisSet = true;
            AGame_UserGames = false;
            Screens_exit();
            Main_SwitchScreen();
        },
        key_yellow: Main_showControlsDialog,
        key_green: function() {
            Screens_exit();
            Main_GoLive();
        },
        addCell: function(cell) {
            var game = this.isLive ? cell.game : cell;
            if (!inUseObj.idObject[game._id]) {

                inUseObj.itemsCount++;
                inUseObj.idObject[game._id] = 1;

                inUseObj.row.appendChild(Screens_createCellGame(inUseObj.row_id,
                    inUseObj.coloumn_id,
                    inUseObj.ids,
                    game.box.template.replace("{width}x{height}", Main_GameSize),
                    game.name,
                    this.isLive ? Main_addCommas(cell.channels) + ' ' + STR_CHANNELS + STR_FOR + Main_addCommas(cell.viewers) + STR_VIEWER : ''));

                inUseObj.coloumn_id++;
            }
        }
    }, Base_obj);

    UserGames = Screens_assign(UserGames, Base_Game_obj);
    UserGames.set_ThumbSize();
}