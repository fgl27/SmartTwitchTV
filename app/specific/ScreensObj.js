var Main_ItemsLimitMax = 100;

var ChannelClip_game = '';
var ChannelClip_views = '';
var ChannelClip_title = '';
var ChannelClip_playUrl = '';
var ChannelClip_createdAt = '';
var ChannelClip_language = '';

var ChannelVod_vodOffset = 0;
var ChannelVod_DurationSeconds = 0;
var ChannelVod_language = '';
var ChannelVod_createdAt = '';
var ChannelVod_views = '';
var ChannelVod_Duration = '';

var Vod_DoAnimateThumb = 1;

var AGame_fallowing = false;

//Screens
var Clip;
var ChannelClip;
var AGameClip;
var Game;
var UserGames;
var Live;
var Featured;
var AGame;
var Vod;
var AGameVod;
var UserVod;
var ChannelVod;
var UserHost;
var UserLive;
var UserChannels;

var Base_obj = {
    posX: 0,
    posY: 0,
    currY: 0,
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
    token: null,
    data_cursor: 0,
    loadDataSuccess: Screens_loadDataSuccess,
    set_ThumbSize: function() {
        this.ThumbCssText = 'width: ' + this.ThumbSize + '%; display: inline-block; padding: 3px;';
    },
    key_exit: function(CenterLables) {
        if (Main_isControlsDialogShown()) Main_HideControlsDialog();
        else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
        else {
            if (Main_ThumbNull(this.posY, this.posX, this.ids[0])) {
                Main_removeFocus(this.posY + '_' + this.posX, this.ids);
            } else if (this.posY < 0) {
                Screens_removeFocusFallow();
                this.posY = 0;
            }
            if (!CenterLables) Main_CenterLablesStart(Screens_handleKeyDown);
        }
        Sidepannel_RestoreScreen();
    },
    concatenate: function(responseText) {
        if (this.data) {
            responseText = JSON.parse(responseText);

            this.data = this.data.concat(responseText[this.object]);
            this.offset = this.data.length;

            this.setMax(responseText);
        } else {
            responseText = JSON.parse(responseText);

            this.data = responseText[this.object];
            this.offset = this.data.length;

            this.setMax(responseText);
            this.loadDataSuccess();
        }
        this.loadingData = false;
    }
};

var Base_Vod_obj = {
    ThumbSize: 32.65,
    visiblerows: 3,
    ItemsLimit: Main_ItemsLimitVideo,
    ColoumnsCount: Main_ColoumnsCountVideo,
    addFocus: function(y, x, idArray, forceScroll) {
        this.AnimateThumb(this);
        Screens_addFocusVideo(y, x, idArray, forceScroll);
    },
    setMax: function(tempObj) {
        if (tempObj[this.object].length < (Main_ItemsLimitMax - 5)) this.dataEnded = true;
    },
    img_404: IMG_404_VIDEO,
    HasSwitches: true,
    period: ['day', 'week', 'month', 'all'],
    empty_str: function() {
        return STR_NO + (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA);
    },
    key_play: function() {
        if (this.posY === -1) {
            if (this.posX === 0) {
                this.highlight = !this.highlight;
                this.SetPeriod();
                Screens_StartLoad();
                Main_setItem(this.highlightSTR, this.highlight ? 'true' : 'false');
            } else {
                this.periodPos++;
                if (this.periodPos > this.periodMaxPos) this.periodPos = 1;
                this.SetPeriod();
                Screens_StartLoad();
            }
        } else Main_OpenVod(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
    },
    AnimateThumbId: null,
    HasAnimateThumb: true,
    Vod_newImg: new Image(),
    AnimateThumb: function(screen) {
        window.clearInterval(this.AnimateThumbId);
        if (!Vod_DoAnimateThumb) return;
        var div = document.getElementById(this.ids[0] + this.posY + '_' + this.posX);

        // Only load the animation if it can be loaded
        // This prevent starting animating before it has loaded or animated a empty image
        this.Vod_newImg.onload = function() {
            this.onload = null;
            Main_HideElement(screen.ids[1] + screen.posY + '_' + screen.posX);
            // background-size: 612px from  div.offsetWidth
            div.style.backgroundSize = "612px";
            var frame = 0;
            screen.AnimateThumbId = window.setInterval(function() {
                // 10 = quantity of frames in the preview img, 344 img height from the div.offsetHeight
                // But this img real height is 180 thus the quality is affected, higher resolution aren't available
                div.style.backgroundPosition = "0px " + ((++frame % 10) * (-344)) + "px";
            }, 650);
        };

        this.Vod_newImg.src = div.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
    },
    addCell: function(cell) {
        if (!this.idObject[cell._id] && (cell.preview.template + '').indexOf('404_processing') === -1) {

            this.itemsCount++;
            this.idObject[cell._id] = 1;

            this.row.appendChild(Screens_createCellVod(
                this.row_id,
                this.coloumn_id,
                [cell._id, cell.length, cell.channel.broadcaster_language, cell.game, cell.channel.name, cell.increment_view_count_url], this.ids,
                [cell.preview.template.replace("{width}x{height}", Main_VideoSize),
                    cell.channel.display_name, STR_STREAM_ON + Main_videoCreatedAt(cell.created_at),
                    twemoji.parse(cell.title) + STR_BR + (cell.game !== "" && cell.game !== null ? STR_STARTED + STR_PLAYING + cell.game : ""), Main_addCommas(cell.views) + STR_VIEWS,
                    Main_videoqualitylang(cell.resolutions.chunked.slice(-4), (parseInt(cell.fps.chunked) || 0), cell.channel.broadcaster_language),
                    STR_DURATION + Play_timeS(cell.length), cell.animated_preview_url
                ]));

            this.coloumn_id++;
        }
    }
};

function ScreensObj_InitVod() {
    Vod = Screens_assign({
        periodMaxPos: 4,
        HeaderQuatity: 2,
        object: 'vods',
        ids: Screens_ScreenIds('Vod'),
        table: 'stream_table_vod',
        screen: Main_Vod,
        highlightSTR: 'Vod_highlight',
        highlight: Main_getItemBool('Vod_highlight', false),
        periodPos: Main_getItemInt('vod_periodPos', 2),
        base_url: 'https://api.twitch.tv/kraken/videos/top?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            this.url = this.base_url + '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') +
                '&sort=views&offset=' + this.offset + '&period=' + this.period[this.periodPos - 1] +
                (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
        },
        SwitchesIcons: ['movie-play', 'history'],
        addSwitches: function() {
            this.TopRowCreated = true;
            this.row = document.createElement('div');
            var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_SWITCH_VOD, STR_SPACE + STR_SPACE + STR_SWITCH_CLIP];
            var thumbfallow, div, i = 0;

            for (i; i < SwitchesStrings.length; i++) {
                thumbfallow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_fallow_icon"></i>' + SwitchesStrings[i];
                div = document.createElement('div');
                div.setAttribute('id', this.ids[8] + 'y_' + i);
                div.className = 'stream_cell_period';
                div.innerHTML = '<div id="' + this.ids[0] +
                    'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + this.ids[3] +
                    'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
                this.row.appendChild(div);
            }
            document.getElementById(this.table).appendChild(this.row);
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 4;
            Main_AddClass('top_bar_vod', 'icon_center_focus');
            this.SetPeriod();
        },
        label_exit: function() {
            Main_textContent('top_bar_vod', STR_VIDEOS);
            Main_RemoveClass('top_bar_vod', 'icon_center_focus');
        },
        SetPeriod: function() {
            Main_innerHTML('top_bar_vod', STR_VIDEOS +
                Main_UnderCenter((this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + Main_Periods[this.periodPos - 1]));

            Main_setItem('vod_periodPos', this.periodPos);
        },
    }, Base_obj);

    Vod = Screens_assign(Vod, Base_Vod_obj);
    Vod.set_ThumbSize();
}

function ScreensObj_InitChannelVod() {
    ChannelVod = Screens_assign({
        periodMaxPos: 4,
        HeaderQuatity: 2,
        object: 'videos',
        ids: Screens_ScreenIds('ChannelVod'),
        table: 'stream_table_channel_vod',
        screen: Main_ChannelVod,
        highlightSTR: 'ChannelVod_highlight',
        highlight: Main_getItemBool('ChannelVod_highlight', false),
        periodPos: Main_getItemInt('ChannelVod_periodPos', 2),
        base_url: 'https://api.twitch.tv/kraken/channels/',
        set_url: function() {
            this.url = this.base_url +
                encodeURIComponent(Main_values.Main_selectedChannel_id) + '/videos?limit=' + Main_ItemsLimitMax +
                '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') + '&sort=time&offset=' + this.offset;
        },
        SwitchesIcons: ['movie-play'],
        addSwitches: function() {
            this.TopRowCreated = true;
            this.row = document.createElement('div');
            var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_SWITCH_VOD];
            var thumbfallow, div, i = 0;

            for (i; i < SwitchesStrings.length; i++) {
                thumbfallow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_fallow_icon"></i>' + SwitchesStrings[i];
                div = document.createElement('div');
                div.setAttribute('id', this.ids[8] + 'y_' + i);
                div.className = 'stream_cell_period';
                div.innerHTML = '<div id="' + this.ids[0] +
                    'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + this.ids[3] +
                    'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
                this.row.appendChild(div);
            }
            document.getElementById(this.table).appendChild(this.row);
        },
        lastselectedChannel: '',
        label_init: function() {
            if (!Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
            if (Main_values.Main_selectedChannel !== this.lastselectedChannel) this.status = false;
            this.lastselectedChannel = Main_values.Main_selectedChannel;
            Main_values.Main_CenterLablesVectorPos = 1;
            Main_cleanTopLabel();
            Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
            Main_textContent('top_bar_user', Main_values.Main_selectedChannelDisplayname);
            this.SetPeriod();
        },
        SetPeriod: function() {
            Main_textContent('top_bar_game', this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA);
        },
        label_exit: function() {
            Main_RestoreTopLabel();
        }
    }, Base_obj);

    ChannelVod = Screens_assign(ChannelVod, Base_Vod_obj);
    ChannelVod.set_ThumbSize();
}

function ScreensObj_InitAGameVod() {
    AGameVod = Screens_assign({
        periodMaxPos: 4,
        HeaderQuatity: 2,
        object: 'vods',
        ids: Screens_ScreenIds('AGameVod'),
        table: 'stream_table_a_game_vod',
        screen: Main_AGameVod,
        highlightSTR: 'AGameVod_highlight',
        highlight: Main_getItemBool('AGameVod_highlight', false),
        periodPos: Main_getItemInt('AGameVod_periodPos', 2),
        base_url: 'https://api.twitch.tv/kraken/videos/top?game=',
        set_url: function() {
            this.url = this.base_url + encodeURIComponent(Main_values.Main_gameSelected) + '&limit=' +
                Main_ItemsLimitMax + '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') +
                '&sort=views&offset=' + this.offset + '&period=' + this.period[this.periodPos - 1] +
                (Main_ContentLang !== "" ? ('&language=' + Main_ContentLang) : '');
        },
        SwitchesIcons: ['movie-play', 'history'],
        addSwitches: function() {
            this.TopRowCreated = true;
            this.row = document.createElement('div');
            var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_SWITCH_VOD, STR_SPACE + STR_SPACE + STR_SWITCH_CLIP];
            var thumbfallow, div, i = 0;

            for (i; i < SwitchesStrings.length; i++) {
                thumbfallow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_fallow_icon"></i>' + SwitchesStrings[i];
                div = document.createElement('div');
                div.setAttribute('id', this.ids[8] + 'y_' + i);
                div.className = 'stream_cell_period';
                div.innerHTML = '<div id="' + this.ids[0] +
                    'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + this.ids[3] +
                    'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
                this.row.appendChild(div);
            }
            document.getElementById(this.table).appendChild(this.row);
        },
        OldgameSelected: '',
        label_init: function() {
            ScreensObj_TopLableAgameInit();
            this.SetPeriod();
        },
        label_exit: ScreensObj_TopLableAgameExit,
        SetPeriod: function() {
            Main_innerHTML('top_bar_game', STR_AGAME +
                Main_UnderCenter((this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) +
                    Main_Periods[this.periodPos - 1] + ': ' + Main_values.Main_gameSelected));

            Main_setItem('AGameVod_periodPos', this.periodPos);
        }
    }, Base_obj);

    AGameVod = Screens_assign(AGameVod, Base_Vod_obj);
    AGameVod.set_ThumbSize();
}

function ScreensObj_InitUserVod() {
    UserVod = Screens_assign({
        periodMaxPos: 2,
        HeaderQuatity: 3,
        object: 'videos',
        ids: Screens_ScreenIds('UserVod'),
        table: 'stream_table_user_vod',
        screen: Main_UserVod,
        time: ['time', 'views'],
        highlightSTR: 'UserVod_highlight',
        highlight: Main_getItemBool('UserVod_highlight', false),
        periodPos: Main_getItemInt('UserVod_periodPos', 1),
        base_url: 'https://api.twitch.tv/kraken/videos/followed?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            this.token = Main_OAuth + AddUser_UsernameArray[Main_values.Users_Position].access_token;

            this.url = this.base_url + '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') +
                '&sort=' + this.time[this.periodPos - 1] + '&offset=' + this.offset;
        },
        SwitchesIcons: ['movie-play', 'history'],
        addSwitches: function() {
            this.TopRowCreated = true;
            this.row = document.createElement('div');
            var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_SWITCH_VOD, STR_SPACE + STR_SPACE + STR_SWITCH_TYPE];
            var thumbfallow, div, i = 0;

            for (i; i < SwitchesStrings.length; i++) {
                thumbfallow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_fallow_icon"></i>' + SwitchesStrings[i];
                div = document.createElement('div');
                div.setAttribute('id', this.ids[8] + 'y_' + i);
                div.className = 'stream_cell_period';
                div.innerHTML = '<div id="' + this.ids[0] +
                    'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + this.ids[3] +
                    'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
                this.row.appendChild(div);
            }
            document.getElementById(this.table).appendChild(this.row);
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 1;
            Main_AddClass('top_bar_user', 'icon_center_focus');
            Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
            this.SetPeriod();
        },
        label_exit: ScreensObj_TopLableUserExit,
        SetPeriod: function() {
            Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(
                AddUser_UsernameArray[Main_values.Users_Position].name + ' ' +
                (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + (this.periodPos === 1 ? STR_TIME : STR_VIWES)));

            Main_setItem('UserVod_periodPos', this.periodPos);
        }
    }, Base_obj);

    UserVod = Screens_assign(UserVod, Base_Vod_obj);
    UserVod.set_ThumbSize();
}

var Base_Live_obj = {
    ThumbSize: 32.65,
    visiblerows: 3,
    ItemsLimit: Main_ItemsLimitVideo,
    ColoumnsCount: Main_ColoumnsCountVideo,
    addFocus: Screens_addFocusVideo,
    img_404: IMG_404_VIDEO,
    setMax: function(tempObj) {
        this.MaxOffset = tempObj._total;
        if (this.data.length >= this.MaxOffset || typeof this.MaxOffset === 'undefined') this.dataEnded = true;
    },
    empty_str: function() {
        return STR_NO + STR_LIVE_CHANNELS;
    },
    addCell: function(cell) {
        this.addCellTemp(cell);
    },
    addCellTemp: function(cell) {
        if (!this.idObject[cell.channel._id]) {

            this.itemsCount++;
            this.idObject[cell.channel._id] = 1;

            this.row.appendChild(Screens_createCellLive(
                this.row_id,
                this.coloumn_id,
                [cell.channel.name, cell.channel._id, cell.channel.status], this.ids,
                [cell.preview.template.replace("{width}x{height}", Main_VideoSize),
                    Main_is_playlist(JSON.stringify(cell.stream_type)) + cell.channel.display_name,
                    cell.channel.status, cell.game,
                    STR_SINCE + Play_streamLiveAt(cell.created_at) + ' ' + STR_FOR + Main_addCommas(cell.viewers) + STR_VIEWER,
                    Main_videoqualitylang(cell.video_height, cell.average_fps, cell.channel.broadcaster_language)
                ]));

            this.coloumn_id++;
        }
    },
};

function ScreensObj_InitLive() {
    Live = Screens_assign({
        HeaderQuatity: 2,
        ids: Screens_ScreenIds('Live'),
        table: 'stream_table_live',
        screen: Main_Live,
        object: 'streams',
        base_url: 'https://api.twitch.tv/kraken/streams?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + '&offset=' + this.offset +
                (Main_ContentLang !== "" ? ('&broadcaster_language=' + Main_ContentLang) : '');
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 0;
            Main_AddClass('top_bar_live', 'icon_center_focus');
        },
        label_exit: function() {
            Main_RemoveClass('top_bar_live', 'icon_center_focus');
        },
        key_play: function() {
            Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
        }
    }, Base_obj);

    Live = Screens_assign(Live, Base_Live_obj);
    Live.set_ThumbSize();
}

function ScreensObj_InitUserLive() {
    UserLive = Screens_assign({
        HeaderQuatity: 3,
        ids: Screens_ScreenIds('UserLive'),
        table: 'stream_table_user_live',
        screen: Main_UserLive,
        object: 'streams',
        base_url: 'https://api.twitch.tv/kraken/streams/',
        loadChannelOffsset: 0,
        followerChannels: '',
        followerChannelsDone: false,
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;

            if (AddUser_UsernameArray[Main_values.Users_Position].access_token) {
                //User has added a key
                this.HeaderQuatity = 3;
                this.token = Main_OAuth + AddUser_UsernameArray[Main_values.Users_Position].access_token;
                this.url = this.base_url + 'followed?' + 'limit=' + Main_ItemsLimitMax + '&offset=' +
                    this.offset + '&stream_type=all';
            } else {
                //User didn't added a key
                this.HeaderQuatity = 2;
                this.token = null;
                if (this.followerChannelsDone) {
                    //User fallowed channels list is done, load live channels
                    this.url = this.base_url + '?channel=' + encodeURIComponent(this.followerChannels) + '&' +
                        'limit=' + Main_ItemsLimitMax + '&offset=' + this.offset + '&stream_type=all';
                } else {
                    //User fallowed channels list is not done, load fallowed channels
                    this.url = 'https://api.twitch.tv/kraken/users/' +
                        encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].id) +
                        '/follows/channels?limit=' + Main_ItemsLimitMax + '&offset=' + this.loadChannelOffsset +
                        '&sortby=created_at';
                }
            }
        },
        label_init: function() {
            ScreensObj_TopLableUserInit();
            Main_innerHTML('top_bar_user', STR_USER +
                Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + STR_LIVE_CHANNELS));
        },
        label_exit: ScreensObj_TopLableUserExit,
        key_play: function() {
            Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
        }
    }, Base_obj);

    UserLive = Screens_assign(UserLive, Base_Live_obj);
    UserLive.set_ThumbSize();

    UserLive.concatenate = function(responseText) {
        if (this.token || this.followerChannelsDone) {
            //User has added a key or fallowed channels list is done, concatenate live channels
            if (this.data) {
                responseText = JSON.parse(responseText);

                this.data = this.data.concat(responseText[this.object]);
                this.offset = this.data.length;

                this.setMax(responseText);
            } else {
                responseText = JSON.parse(responseText);

                this.data = responseText[this.object];
                this.offset = this.data.length;

                this.setMax(responseText);
                this.loadDataSuccess();
            }
            this.loadingData = false;
        } else {
            var response = JSON.parse(responseText).follows,
                response_items = response.length;

            if (response_items) { // response_items here is not always 99 because banned channels, so check until it is 0
                //User fallowed channels list is not done, load fallowed channels
                var ChannelTemp = '',
                    x = 0;

                for (x; x < response_items; x++) {
                    ChannelTemp = response[x].channel._id + ',';
                    if (this.followerChannels.indexOf(ChannelTemp) === -1) this.followerChannels += ChannelTemp;
                }

                this.loadChannelOffsset += response_items;
            } else { // end
                //User fallowed channels list is done, load live channels
                this.followerChannels = this.followerChannels.slice(0, -1);
                this.followerChannelsDone = true;
            }
            Screens_loadDataRequest();
        }
    };
}

function ScreensObj_InitUserHost() {
    UserHost = Screens_assign({
        HeaderQuatity: 2,
        ids: Screens_ScreenIds('UserHost'),
        table: 'stream_table_user_host',
        screen: Main_UserHost,
        object: 'hosts',
        base_url: 'https://api.twitch.tv/api/users/',
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url +
                encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].name) +
                '/followed/hosting?limit=' + Main_ItemsLimitMax + '&offset=' + this.offset;
        },
        label_init: function() {
            ScreensObj_TopLableUserInit();
            Main_innerHTML('top_bar_user', STR_USER +
                Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + STR_LIVE_HOSTS));
        },
        label_exit: ScreensObj_TopLableUserExit,
        key_play: function() {
            Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
        }
    }, Base_obj);

    UserHost = Screens_assign(UserHost, Base_Live_obj);
    UserHost.set_ThumbSize();

    UserHost.addCell = function(cell) {
        if (!this.idObject[cell.target._id + '' + cell._id]) { //combined id host and hosted

            this.itemsCount++;
            this.idObject[cell.target._id + '' + cell._id] = 1;

            this.row.appendChild(Screens_createCellLive(
                this.row_id,
                this.coloumn_id,
                [cell.target.channel.name, cell.target._id, cell.target.title], this.ids,
                [cell.target.preview_urls.template.replace("{width}x{height}", Main_VideoSize),
                    cell.display_name + STR_USER_HOSTING + cell.target.channel.display_name,
                    cell.target.title, cell.target.meta_game,
                    STR_FOR.charAt(1).toUpperCase() + STR_FOR.slice(2) +
                    Main_addCommas(cell.target.viewers) + STR_VIEWER, ''
                ]));

            this.coloumn_id++;
        }
    };
}

function ScreensObj_InitAGame() {
    AGame = Screens_assign({
        HeaderQuatity: 2,
        ids: Screens_ScreenIds('AGame'),
        table: 'stream_table_a_game',
        screen: Main_aGame,
        object: 'streams',
        base_url: 'https://api.twitch.tv/kraken/streams?game=',
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + encodeURIComponent(Main_values.Main_gameSelected) +
                '&limit=' + Main_ItemsLimitMax + '&offset=' + this.offset +
                (Main_ContentLang !== "" ? ('&broadcaster_language=' + Main_ContentLang) : '');
        },
        label_init: function() {
            ScreensObj_TopLableAgameInit();
            //fix user label
            Main_RemoveClass('top_bar_user', 'icon_center_focus');
            Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
            Main_textContent('top_bar_user', STR_USER);

            if (Main_values.Search_isSearching) { //Reset label as the app may be restoring from background
                Main_cleanTopLabel();
                Main_innerHTML('top_bar_user', STR_SEARCH + Main_UnderCenter(STR_GAMES + ' ' + "'" + Main_values.Search_data + "'"));
            }

            Main_innerHTML('top_bar_game', STR_AGAME + Main_UnderCenter(STR_LIVE +
                ': ' + Main_values.Main_gameSelected));
        },
        label_exit: ScreensObj_TopLableAgameExit,
        HasSwitches: true,
        SwitchesIcons: ['movie-play', 'movie', 'heart-o'],
        addSwitches: function() {
            this.TopRowCreated = true;
            this.row = document.createElement('div');
            var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_VIDEOS, STR_SPACE + STR_SPACE + STR_CLIPS, STR_SPACE + STR_SPACE + STR_FALLOW];
            var thumbfallow, div, i = 0;

            for (i; i < SwitchesStrings.length; i++) {
                thumbfallow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_fallow_icon"></i>' + SwitchesStrings[i];
                div = document.createElement('div');
                div.setAttribute('id', this.ids[8] + 'y_' + i);
                div.className = 'stream_cell_period';
                div.innerHTML = '<div id="' + this.ids[0] +
                    'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + this.ids[3] +
                    'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
                this.row.appendChild(div);
            }
            document.getElementById(this.table).appendChild(this.row);
        },
        key_play: function() {
            if (this.posY !== -1) {
                Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            } else AGame_headerOptions();
        },
    }, Base_obj);

    AGame = Screens_assign(AGame, Base_Live_obj);
    AGame.set_ThumbSize();
}

function ScreensObj_InitFeatured() {
    Featured = Screens_assign({
        HeaderQuatity: 2,
        ids: Screens_ScreenIds('Featured'),
        table: 'stream_table_featured',
        screen: Main_Featured,
        base_url: 'https://api.twitch.tv/kraken/streams/featured?limit=' + Main_ItemsLimitMax,
        set_url: function() {
            this.url = this.base_url + '&offset=' + this.offset +
                (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token ? '&oauth_token=' +
                    AddUser_UsernameArray[Main_values.Users_Position].access_token : '');
        },
        label_init: function() {
            Main_values.Main_CenterLablesVectorPos = 2;
            Main_AddClass('top_bar_featured', 'icon_center_focus');
        },
        label_exit: function() {
            Main_RemoveClass('top_bar_featured', 'icon_center_focus');
        },
        object: 'featured',
        key_play: function() {
            Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
        }
    }, Base_obj);

    Featured = Screens_assign(Featured, Base_Live_obj);
    Featured.set_ThumbSize();

    Featured.addCell = function(cell) {
        cell = cell.stream;
        this.addCellTemp(cell);
    };
}

var Base_Clip_obj = {
    HeaderQuatity: 2,
    ThumbSize: 32.65,
    ItemsLimit: Main_ItemsLimitVideo,
    TopRowCreated: false,
    ColoumnsCount: Main_ColoumnsCountVideo,
    addFocus: Screens_addFocusVideo,
    cursor: null,
    visiblerows: 3,
    object: 'clips',
    period: ['day', 'week', 'month', 'all'],
    img_404: IMG_404_VIDEO,
    empty_str: function() {
        return STR_NO + STR_CLIPS;
    },
    HasSwitches: true,
    SwitchesIcons: ['history', 'play-1'],
    addSwitches: function() {
        this.TopRowCreated = true;
        this.row = document.createElement('div');
        var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_SWITCH_CLIP, STR_SPACE + STR_SPACE + STR_PLAY_ALL];
        var thumbfallow, div, i = 0;

        for (i; i < SwitchesStrings.length; i++) {
            thumbfallow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_fallow_icon"></i>' + SwitchesStrings[i];
            div = document.createElement('div');
            div.setAttribute('id', this.ids[8] + 'y_' + i);
            div.className = 'stream_cell_period';
            div.innerHTML = '<div id="' + this.ids[0] +
                'y_' + i + '" class="stream_thumbnail_channel_vod" ><div id="' + this.ids[3] +
                'y_' + i + '" class="stream_channel_fallow_game">' + thumbfallow + '</div></div>';
            this.row.appendChild(div);
        }
        document.getElementById(this.table).appendChild(this.row);
    },
    setMax: function(tempObj) {
        this.cursor = tempObj._cursor;
        if (this.cursor === '') this.dataEnded = true;
    },
    key_play: function() {
        if (this.posY === -1) {
            if (!this.loadingData) {
                if (!this.posX) {
                    this.periodPos++;
                    if (this.periodPos > 4) this.periodPos = 1;
                    this.SetPeriod();
                    Screens_StartLoad();
                } else {
                    PlayClip_All = true;
                    Screens_removeFocusFallow();
                    this.posX = 0;
                    this.posY = 0;
                    Main_OpenClip(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
                }
            }
        } else Main_OpenClip(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
    },
    Cells: [],
    addCell: function(cell) {
        if (!this.idObject[cell.tracking_id]) {
            this.itemsCount++;
            this.idObject[cell.tracking_id] = 1;

            this.row.appendChild(Screens_createCellClip(this.row_id,
                this.coloumn_id,
                this.ids,
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

            this.coloumn_id++;
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
            ScreensObj_TopLableAgameInit();
            this.SetPeriod();
        },
        label_exit: ScreensObj_TopLableAgameExit,
    }, Base_obj);

    AGameClip = Screens_assign(AGameClip, Base_Clip_obj);
    AGameClip.set_ThumbSize();
}

var Base_Game_obj = {
    HeaderQuatity: 2,
    ThumbSize: 19.35,
    visiblerows: 3,
    ItemsLimit: Main_ItemsLimitGame,
    ColoumnsCount: Main_ColoumnsCountGame,
    addFocus: Screens_addFocusGame,
    img_404: IMG_404_GAME,
    empty_str: function() {
        return STR_NO + STR_LIVE_GAMES;
    },
    key_play: function() {
        Main_values.Main_gameSelected = document.getElementById(this.ids[5] + this.posY + '_' + this.posX).getAttribute(Main_DataAttribute);
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
        Main_values.Main_BeforeAgame = this.screen;
        Main_values.Main_Go = Main_aGame;
        Main_values.Main_BeforeAgameisSet = true;

        Main_addFocusVideoOffset = 0;
        document.body.removeEventListener("keydown", Screens_handleKeyDown);
        Main_HideElement(this.ids[10]);

        Main_SwitchScreenAction();
        Main_removeFocus(this.posY + '_' + this.posX, this.ids);
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

            this.row.appendChild(Screens_createCellGame(this.row_id,
                this.coloumn_id,
                this.ids,
                game.box.template.replace("{width}x{height}", Main_GameSize),
                game.name,
                hasLive ? Main_addCommas(cell.channels) + ' ' + STR_CHANNELS + STR_FOR + Main_addCommas(cell.viewers) + STR_VIEWER : ''));

            this.coloumn_id++;
        }
    }
};

function ScreensObj_InitGame() {
    Game = Screens_assign({
        ids: Screens_ScreenIds('Game'),
        table: 'stream_table_games',
        screen: Main_games,
        object: 'top',
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
        object: 'follows',
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
            ScreensObj_TopLableUserInit();
            Main_IconLoad('label_refresh', 'icon-refresh', STR_USER_GAMES_CHANGE + STR_LIVE_GAMES + '/' + STR_FALLOW_GAMES + ":" + STR_GUIDE);

            Main_innerHTML('top_bar_user', STR_USER + Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + ' ' + (this.isLive ? STR_LIVE_GAMES : STR_FALLOW_GAMES)));
        },
        label_exit: ScreensObj_TopLableUserExit,
    }, Base_obj);

    UserGames = Screens_assign(UserGames, Base_Game_obj);
    UserGames.set_ThumbSize();
}

var Base_Channel_obj = {
    ThumbSize: 16,
    visiblerows: 3,
    ItemsLimit: Main_ItemsLimitChannel,
    ColoumnsCount: Main_ColoumnsCountChannel,
    addFocus: Screens_addFocusVideo,
    img_404: IMG_404_LOGO,
    setMax: function(tempObj) {
        this.MaxOffset = tempObj._total;
        if (this.data.length >= this.MaxOffset || typeof this.MaxOffset === 'undefined') this.dataEnded = true;
    },
    empty_str: function() {
        return STR_NO + STR_USER_CHANNEL;
    },
    addCell: function(cell) {
        this.addCellTemp(cell);
    },
    addCellTemp: function(cell) {
        if (!this.idObject[cell.channel._id]) {

            this.itemsCount++;
            this.idObject[cell.channel._id] = 1;

            this.row.appendChild(Screens_createCellChannel(
                this.row_id,
                this.coloumn_id,
                this.ids,
                [cell.channel.name, cell.channel._id, cell.channel.logo, cell.channel.display_name]));

            this.coloumn_id++;
        }
    },
};

function ScreensObj_InitUserChannels() {
    UserChannels = Screens_assign({
        HeaderQuatity: 2,
        ids: Screens_ScreenIds('UserChannels'),
        table: 'stream_table_user_channels',
        screen: Main_UserChannels,
        object: 'follows',
        base_url: 'https://api.twitch.tv/kraken/users/',
        set_url: function() {
            if (this.offset && (this.offset + Main_ItemsLimitMax) > this.MaxOffset) this.dataEnded = true;
            this.url = this.base_url + encodeURIComponent(AddUser_UsernameArray[Main_values.Users_Position].id) +
        '/follows/channels?limit=' + Main_ItemsLimitMax + '&offset=' + this.offset + '&sortby=login&direction=asc';
        },
        label_init: function() {
            ScreensObj_TopLableUserInit();
            Main_innerHTML('top_bar_user', STR_USER +
                Main_UnderCenter(AddUser_UsernameArray[Main_values.Users_Position].name + STR_USER_CHANNEL));
        },
        label_exit: ScreensObj_TopLableUserExit,
        key_play: function() {
            if (Main_ThumbOpenIsNull(this.posY + '_' + this.posX, this.ids[0])) return;

            Main_values.Main_selectedChannel = JSON.parse(document.getElementById(this.ids[8] + this.posY + '_' + this.posX).getAttribute(Main_DataAttribute));

            Main_values.Main_selectedChannel_id = Main_values.Main_selectedChannel[1];
            Main_values.Main_selectedChannelDisplayname = Main_values.Main_selectedChannel[3];
            Main_values.Main_selectedChannelLogo = Main_values.Main_selectedChannel[2];
            Main_values.Main_selectedChannel = Main_values.Main_selectedChannel[0];

            document.body.removeEventListener("keydown", Screens_handleKeyDown);
            Main_values.Main_BeforeChannel = Main_UserChannels;
            Main_values.Main_Go = Main_ChannelContent;
            Main_values.Main_BeforeChannelisSet = true;
            AddCode_IsFallowing = true;
            ChannelContent_UserChannels = true;
            Screens_exit();
            Main_SwitchScreen();
        }
    }, Base_obj);

    UserChannels = Screens_assign(UserChannels, Base_Channel_obj);
    UserChannels.set_ThumbSize();
}

function ScreensObj_TopLableAgameInit() {
    Main_values.Main_CenterLablesVectorPos = 3;
    if (Main_values.Main_OldgameSelected === null) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
    Main_AddClass('top_bar_game', 'icon_center_focus');
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
    if (Main_values.Main_OldgameSelected !== Main_values.Main_gameSelected ||
        inUseObj.gameSelected !== Main_values.Main_gameSelected) inUseObj.status = false;
    inUseObj.gameSelected = Main_values.Main_gameSelected;
}

function ScreensObj_TopLableAgameExit() {
    Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
    inUseObj.gameSelected = Main_values.Main_gameSelected;
    Main_RemoveClass('top_bar_game', 'icon_center_focus');
    Main_innerHTML('top_bar_game', STR_GAMES);
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
}

function ScreensObj_TopLableUserInit() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_IconLoad('label_side_panel', 'icon-arrow-circle-left', STR_GOBACK);
    Main_AddClass('top_bar_user', 'icon_center_focus');
    if (inUseObj.OldUserName !== AddUser_UsernameArray[Main_values.Users_Position].name) inUseObj.status = false;
    inUseObj.OldUserName = AddUser_UsernameArray[Main_values.Users_Position].name;
}

function ScreensObj_TopLableUserExit() {
    Main_values.Users_Position = 0;
    Main_RemoveClass('top_bar_user', 'icon_center_focus');
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + STR_GUIDE);
    Main_textContent('top_bar_user', STR_USER);
    Main_IconLoad('label_side_panel', 'icon-ellipsis', STR_SIDE_PANEL);
}
