var Main_ItemsLimitMax = 100;
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
var Live;

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
    set_ThumbSize: function() {
        this.ThumbCssText = 'width: ' + this.ThumbSize + '%; display: inline-block; padding: 3px;';
    },
    key_exit: function() {
        if (Main_isControlsDialogShown()) Main_HideControlsDialog();
        else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
        else {
            if (this.itemsCount) Main_removeFocus(this.posY + '_' + this.posX, this.ids);
            Main_CenterLablesStart(Screens_handleKeyDown);
        }
    },
};

var Base_Live_obj = {
    ThumbSize: 32.65,
    ItemsLimit: Main_ItemsLimitVideo,
    ItemsReloadLimit: Main_ItemsReloadLimitVideo,
    ColoumnsCount: Main_ColoumnsCountVideo,
    addFocus: Main_addFocusVideo,
    key_refresh: Screens_StartLoad,
    img_404: IMG_404_VIDEO,
    empty_str: function() {
        return STR_NO + STR_LIVE_CHANNELS;
    },
    key_play: function() {
        Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
    },
    concatenate: function(responseText) {
        if (this.data) {

            var tempObj = JSON.parse(responseText);

            this.MaxOffset = tempObj._total;
            this.data = this.data.concat(tempObj.streams);

            this.offset = this.data.length;
            if (this.offset > this.MaxOffset) this.dataEnded = true;

            inUseObj.loadingData = false;
        } else {
            this.data = JSON.parse(responseText);

            this.MaxOffset = this.data._total;
            this.data = this.data.streams;

            this.offset = this.data.length;
            if (this.offset > this.MaxOffset) this.dataEnded = true;

            this.loadDataSuccess();
            inUseObj.loadingData = false;
        }
    },
    addCell: function(cell) {
        if (!inUseObj.idObject[cell.channel._id]) {

            inUseObj.itemsCount++;
            inUseObj.idObject[cell.channel._id] = 1;

            inUseObj.row.appendChild(Screens_createCellLive(
                inUseObj.row_id,
                inUseObj.coloumn_id,
                [cell.channel.name, cell.channel._id, cell.channel.status], this.ids,
                [cell.preview.template.replace("{width}x{height}", Main_VideoSize),
                    Main_is_playlist(JSON.stringify(cell.stream_type)) + cell.channel.display_name,
                    cell.channel.status, cell.game,
                    STR_SINCE + Play_streamLiveAt(cell.created_at) + STR_AGO + ', ' + STR_FOR + Main_addCommas(cell.viewers) + STR_VIEWER,
                    Main_videoqualitylang(cell.video_height, cell.average_fps, cell.channel.language)
                ]));

            inUseObj.coloumn_id++;
        }
    },
};

function ScreensObj_InitLive() {
    Live = Screens_assign({
        ids: Screens_ScreenIds('Live'),
        table: 'stream_table_live',
        screen: Main_Live,
        base_url: 'https://api.twitch.tv/kraken/streams?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + '&offset=' + this.offset +
                (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 0;
            Main_AddClass('top_bar_live', 'icon_center_focus');
        },
        label_exit: function() {
            Main_RemoveClass('top_bar_live', 'icon_center_focus');
        },
    }, Base_obj);

    Live = Screens_assign(Live, Base_Live_obj);
    Live.set_ThumbSize();
}

var Base_Clip_obj = {
    ThumbSize: 32.65,
    ItemsLimit: Main_ItemsLimitVideo,
    HasSwitches: true,
    TopRowCreated: false,
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
    key_play: function() {
        if (this.posY === -1) {
            if (!this.loadingData) {
                this.periodPos++;
                if (this.periodPos > 4) this.periodPos = 1;
                this.SetPeriod();
                Screens_StartLoad();
            }
        } else Main_OpenClip(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
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
    ThumbSize: 19.35,
    ItemsLimit: Main_ItemsLimitGame,
    ItemsReloadLimit: Main_ItemsReloadLimitGame,
    ColoumnsCount: Main_ColoumnsCountGame,
    addFocus: Main_addFocusGame,
    img_404: IMG_404_GAME,
    empty_str: function() {
        return STR_NO + STR_LIVE_GAMES;
    },
    concatenate: function(responseText) {
        if (this.data) {
            var tempObj = JSON.parse(responseText);

            this.MaxOffset = tempObj._total;
            this.data = this.data.concat(this.screen === Main_usergames ? tempObj.follows : tempObj.top);

            this.offset = this.data.length;
            if (this.offset > this.MaxOffset) this.dataEnded = true;

            inUseObj.loadingData = false;
        } else {

            this.data = JSON.parse(responseText);

            this.MaxOffset = this.data._total;
            this.data = this.screen === Main_usergames ? this.data.follows : this.data.top;

            this.offset = this.data.length;
            if (this.isLive) this.dataEnded = true;
            else if (this.offset > this.MaxOffset) this.dataEnded = true;

            this.loadDataSuccess();
            inUseObj.loadingData = false;
        }
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
        Main_removeFocus(this.posY + '_' + this.posX, this.ids);
    },

    addCell: function(cell) {
        var hasLive = this.isLive || this.screen === Main_games;
        var game = hasLive ? cell.game : cell;
        if (!inUseObj.idObject[game._id]) {

            inUseObj.itemsCount++;
            inUseObj.idObject[game._id] = 1;

            inUseObj.row.appendChild(Screens_createCellGame(inUseObj.row_id,
                inUseObj.coloumn_id,
                inUseObj.ids,
                game.box.template.replace("{width}x{height}", Main_GameSize),
                game.name,
                hasLive ? Main_addCommas(cell.channels) + ' ' + STR_CHANNELS + STR_FOR + Main_addCommas(cell.viewers) + STR_VIEWER : ''));

            inUseObj.coloumn_id++;
        }
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
        SetPeriod: function() {
            Main_innerHTML('top_bar_clip', STR_CLIPS + Main_UnderCenter(Main_Periods[this.periodPos - 1]));
            Main_setItem('Clip_periodPos', this.periodPos);
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 5;
            this.SetPeriod();
            Main_AddClass('top_bar_clip', 'icon_center_focus');
            Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
        },
        label_exit: function() {
            Main_RestoreTopLabel();
            Main_RemoveClass('top_bar_clip', 'icon_center_focus');
            Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
        },
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
        SetPeriod: function() {
            Main_innerHTML('top_bar_game', STR_CLIPS + Main_Periods[this.periodPos - 1]);
            Main_setItem('ChannelClip_periodPos', this.periodPos);
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 1;
            if (!Main_values.Search_isSearching && Main_values.Main_selectedChannel_id)
                ChannelContent_RestoreChannelValue();
            if (Main_values.Main_selectedChannel !== this.lastselectedChannel) this.status = false;
            Main_cleanTopLabel();
            this.SetPeriod();
            Main_textContent('top_bar_user', Main_values.Main_selectedChannelDisplayname);
            Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
            this.lastselectedChannel = Main_values.Main_selectedChannel;
        },
        label_exit: Main_RestoreTopLabel,
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
        SetPeriod: function() {
            Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter(STR_CLIPS +
                Main_Periods[this.periodPos - 1] + ': ' + Main_values.Main_gameSelected));
            Main_setItem('AGameClip_periodPos', this.periodPos);
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 3;
            this.SetPeriod();
            Main_AddClass('top_bar_game', 'icon_center_focus');
            Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
            if (this.gameSelected !== Main_values.Main_gameSelected) this.status = false;
            this.gameSelected = Main_values.Main_gameSelected;
        },
        label_exit: function() {
            Main_RemoveClass('top_bar_game', 'icon_center_focus');
            Main_innerHTML('top_bar_game', STR_GAMES);
            Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
        },
    }, Base_obj);

    AGameClip = Screens_assign(AGameClip, Base_Clip_obj);
    AGameClip.set_ThumbSize();
}

function ScreensObj_InitGame() {
    Game = Screens_assign({
        ids: Screens_ScreenIds('Game'),
        table: 'stream_table_games',
        screen: Main_games,
        key_refresh: Screens_StartLoad,
        base_url: 'https://api.twitch.tv/kraken/games/top?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + '&offset=' + this.offset;
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 3;
            Main_AddClass('top_bar_game', 'icon_center_focus');
        },
        label_exit: function() {
            Main_RemoveClass('top_bar_game', 'icon_center_focus');
        },
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
        key_refresh: function() {
            this.isLive = !this.isLive;

            Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + ' ' + (this.isLive ? STR_LIVE_GAMES : STR_FALLOW_GAMES)));

            Screens_StartLoad();

            Main_setItem('user_Games_live', this.isLive ? 'true' : 'false');
            if (Users_status) Users_resetGameCell();

        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 1;
            Main_IconLoad('label_refresh', 'icon-refresh', STR_USER_GAMES_CHANGE + STR_LIVE_GAMES + '/' + STR_FALLOW_GAMES + ":" + STR_GUIDE);
            Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
            Main_AddClass('top_bar_user', 'icon_center_focus');

            if (this.OldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) this.status = false;

            this.OldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;

            Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + ' ' + (this.isLive ? STR_LIVE_GAMES : STR_FALLOW_GAMES)));
        },
        label_exit: function() {
            Main_values.Users_Position = 0;
            Main_RemoveClass('top_bar_user', 'icon_center_focus');
            Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
            Main_textContent('top_bar_user', STR_USER);
            Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
        },
    }, Base_obj);

    UserGames = Screens_assign(UserGames, Base_Game_obj);
    UserGames.set_ThumbSize();
}