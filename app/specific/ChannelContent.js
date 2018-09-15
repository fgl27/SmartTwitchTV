//Variable initialization
var ChannelContent_cursorY = 0;
var ChannelContent_cursorX = 0;
var ChannelContent_dataEnded = false;
var ChannelContent_itemsCount = 0;
var ChannelContent_loadingData = false;
var ChannelContent_loadingDataTry = 0;
var ChannelContent_loadingDataTryMax = 5;
var ChannelContent_loadingDataTimeout = 3500;
var ChannelContent_itemsCountOffset = 0;
var ChannelContent_skipImg = false;
var ChannelContent_UserChannels = false;
var ChannelContent_TargetName;
var ChannelContent_ids = ['cc_thumbdiv', 'cc_img', 'cc_infodiv', 'cc_name', 'cc_createdon', 'cc_game', 'cc_viwers', 'cc_duration', 'cc_cell', 'sccempty_', 'channel_content_scroll'];
var ChannelContent_status = false;
var ChannelContent_lastselectedChannel = '';
var ChannelContent_responseText = null;
var ChannelContent_selectedChannelViews = '';
var ChannelContent_selectedChannelFallower = '';
var ChannelContent_description = '';
var ChannelContent_thumbnail = '';
var ChannelContent_thumbnail_fallow = '';
var ChannelContent_ChannelValue = {};
//Variable initialization end

function ChannelContent_init() {
    Main_Go = Main_ChannelContent;
    if (!Search_isSearching && ChannelContent_ChannelValue.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
    if (ChannelContent_lastselectedChannel !== Main_selectedChannel) ChannelContent_status = false;
    Main_cleanTopLabel();
    Main_selectedChannelDisplayname = Main_selectedChannelDisplayname.replace(STR_NOT_LIVE, '');
    Main_textContent('top_bar_user', Main_selectedChannelDisplayname);
    Main_textContent('top_bar_game', STR_CHANNEL_CONT);
    document.body.addEventListener("keydown", ChannelContent_handleKeyDown, false);
    AddCode_PlayRequest = false;
    if (ChannelContent_status) {
        Main_YRst(ChannelContent_cursorY);
        Main_ShowElement(ChannelContent_ids[10]);
        ChannelContent_checkUser();
    } else ChannelContent_StartLoad();
}

function ChannelContent_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
    Main_HideElement(ChannelContent_ids[10]);
}

function ChannelContent_StartLoad() {
    Main_HideElement(ChannelContent_ids[10]);
    Main_showLoadDialog();
    Main_HideWarningDialog();
    ChannelContent_lastselectedChannel = Main_selectedChannel;
    ChannelContent_status = false;
    ChannelContent_skipImg = false;
    Main_empty('stream_table_channel_content');
    ChannelContent_thumbnail = '';
    ChannelContent_itemsCountOffset = 0;
    ChannelContent_itemsCount = 0;
    ChannelContent_cursorX = 0;
    ChannelContent_cursorY = 0;
    ChannelContent_dataEnded = false;
    ChannelContent_TargetName = undefined;
    ChannelContent_loadDataPrepare();
    ChannelContent_loadDataRequest();
}

function ChannelContent_loadDataPrepare() {
    ChannelContent_loadingData = true;
    ChannelContent_loadingDataTry = 0;
    ChannelContent_loadingDataTimeout = 3500;
}

function ChannelContent_loadDataRequest() {
    try {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + encodeURIComponent(ChannelContent_TargetName !== undefined ? ChannelContent_TargetName : Main_selectedChannel) + '?' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = ChannelContent_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    if (JSON.parse(xmlHttp.responseText).stream !== null) {
                        ChannelContent_responseText = xmlHttp.responseText;
                        ChannelContent_loadDataPrepare();
                        ChannelContent_GetStreamerInfo();
                    } else {
                        ChannelContent_loadDataPrepare();
                        ChannelContent_loadDataCheckHost();
                    }
                    return;
                } else {
                    ChannelContent_loadDataError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        ChannelContent_loadDataError();
    }
}

function ChannelContent_loadDataError() {
    ChannelContent_loadingDataTry++;
    if (ChannelContent_loadingDataTry < ChannelContent_loadingDataTryMax) {
        ChannelContent_loadingDataTimeout += 500;
        ChannelContent_loadDataRequest();
    } else {
        ChannelContent_responseText = null;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    }
}

function ChannelContent_loadDataCheckHost() {
    try {

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'http://tmi.twitch.tv/hosts?include_logins=1&host=' + encodeURIComponent(Main_selectedChannel_id) + '&' + Math.round(Math.random() * 1e7), true);
        xmlHttp.timeout = ChannelContent_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    ChannelContent_CheckHost(xmlHttp.responseText);
                    return;
                } else ChannelContent_loadDataCheckHostError();
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        ChannelContent_loadDataCheckHostError();
    }
}

function ChannelContent_loadDataCheckHostError() {
    ChannelContent_loadingDataTry++;
    if (ChannelContent_loadingDataTry < ChannelContent_loadingDataTryMax) {
        ChannelContent_loadingDataTimeout += 500;
        ChannelContent_loadDataCheckHost();
    } else {
        ChannelContent_responseText = null;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    }
}

function ChannelContent_CheckHost(responseText) {
    var response = JSON.parse(responseText);
    ChannelContent_TargetName = response.hosts[0].target_login;
    if (ChannelContent_TargetName !== undefined) {
        ChannelContent_loadDataPrepare();
        ChannelContent_loadDataRequest();
    } else {
        ChannelContent_responseText = null;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    }
}

function ChannelContent_GetStreamerInfo() {
    try {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", 'https://api.twitch.tv/kraken/channels/' + Main_selectedChannel_id, true);
        xmlHttp.timeout = PlayVod_loadingInfoDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);
        xmlHttp.setRequestHeader(Main_AcceptHeader, Main_TwithcV5Json);
        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    var channel = JSON.parse(xmlHttp.responseText);
                    ChannelContent_selectedChannelViews = channel.views;
                    ChannelContent_selectedChannelFallower = channel.followers;
                    ChannelContent_description = channel.description;
                    Main_selectedChannelLogo = channel.logo;
                    ChannelContent_loadDataSuccess();
                    return;
                } else {
                    PlayVod_GetStreamerInfoError();
                }
            }
        };

        xmlHttp.send(null);
    } catch (e) {
        PlayVod_GetStreamerInfoError();
    }
}

function PlayVod_GetStreamerInfoError() {
    ChannelContent_loadingDataTry++;
    if (ChannelContent_loadingDataTry < ChannelContent_loadingDataTryMax) {
        ChannelContent_loadingDataTimeout += 500;
        ChannelContent_GetStreamerInfo();
    } else {
        ChannelContent_selectedChannelViews = '';
        ChannelContent_selectedChannelFallower = '';
        ChannelContent_description = '';
        Main_selectedChannelLogo = IMG_404_LOGO;
        ChannelContent_loadDataSuccess();
    }
}

function ChannelContent_loadDataSuccess() {
    var row = document.createElement('tr'),
        tbody = document.createElement('tbody'),
        coloumn_id = 0;

    Main_td = document.createElement('tr');
    Main_td.className = 'follower_header';
    Main_td.innerHTML = '<div class="follower_header">' + twemoji.parse(ChannelContent_description) + '</div>';

    document.getElementById("stream_table_channel_content").appendChild(tbody);
    document.getElementById("stream_table_channel_content").appendChild(Main_td);

    if (ChannelContent_responseText !== null) {
        var response = JSON.parse(ChannelContent_responseText);
        if (response.stream !== null) {
            var hosting = ChannelContent_TargetName !== undefined ? Main_selectedChannelDisplayname +
                STR_USER_HOSTING : '';
            var stream = response.stream;
            row.appendChild(ChannelContent_createCell('0_' + coloumn_id, stream.channel.name, stream.preview.template,
                twemoji.parse(stream.channel.status), stream.game,
                Main_is_playlist(JSON.stringify(stream.stream_type)) +
                hosting + stream.channel.display_name,
                STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_AGO + ', ' + STR_FOR +
                Main_addCommas(stream.viewers) + STR_VIEWER,
                Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.language)));
            coloumn_id++;
        } else ChannelContent_skipImg = true;
    } else ChannelContent_skipImg = true;

    row.appendChild(ChannelContent_createChannelCell('0_' + coloumn_id,
        Main_selectedChannelDisplayname, Main_selectedChannelDisplayname + STR_PAST_BROA, 'movie-play'));
    coloumn_id++;
    row.appendChild(ChannelContent_createChannelCell('0_' + coloumn_id,
        Main_selectedChannelDisplayname, Main_selectedChannelDisplayname + STR_CLIPS, 'movie'));

    if (coloumn_id < 2) {
        coloumn_id++;
        row.appendChild(Main_createEmptyCell(ChannelContent_ids[9] + '0_' + coloumn_id));
    }

    document.getElementById("stream_table_channel_content").appendChild(row);

    row = document.createElement('tr');
    row.appendChild(ChannelContent_createFallow('1_0',
        Main_selectedChannelDisplayname, Main_selectedChannelDisplayname, Main_selectedChannelLogo));
    document.getElementById("stream_table_channel_content").appendChild(row);

    ChannelContent_loadDataSuccessFinish();
}

//TODO revise this functions there is too many
function ChannelContent_createCell(id, channel_name, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality) {
    ChannelContent_thumbnail = preview_thumbnail.replace("{width}x{height}", Main_VideoSize);

    Main_td = document.createElement('td');
    Main_td.setAttribute('id', ChannelContent_ids[8] + id);
    Main_td.setAttribute(Main_DataAttribute, channel_name);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = '<div id="' + ChannelContent_ids[0] + id + '" class="stream_thumbnail_video" >' +
        '<img id="' + ChannelContent_ids[1] + id + '" class="stream_img"></div>' +
        '<div id="' + ChannelContent_ids[2] + id + '" class="stream_text">' +
        '<div id="' + ChannelContent_ids[3] + id + '" class="stream_channel" style="width: 66%; display: inline-block;">' +
        '<i class="icon-circle" style="color: ' +
        (ChannelContent_TargetName !== undefined ? '#FED000' : 'red') + '; font-size: 90%; aria-hidden="true"></i> ' + STR_SPACE +
        channel_display_name + '</div>' +
        '<div id="' + ChannelContent_ids[7] + id + '"class="stream_info" style="width:33%; float: right; text-align: right; display: inline-block;">' +
        quality + '</div>' +
        '<div id="' + ChannelContent_ids[4] + id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + ChannelContent_ids[5] + id + '"class="stream_info">' + STR_PLAYING + stream_game + '</div>' +
        '<div id="' + ChannelContent_ids[6] + id + '"class="stream_info">' + viwers + '</div>' + '</div>';

    return Main_td;
}

function ChannelContent_createChannelCell(id, user_name, stream_type, icons) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', ChannelContent_ids[8] + id);
    Main_td.setAttribute(Main_DataAttribute, user_name);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = '<div id="' + ChannelContent_ids[0] + id + '" class="stream_thumbnail_video" ><div id="' +
        ChannelContent_ids[1] + id +
        '" class="stream_channel_content_icon"><i class="icon-' + icons + '"></i></div></div>' +
        '<div id="' + ChannelContent_ids[2] + id + '" class="stream_text">' +
        '<div id="' + ChannelContent_ids[3] + id + '" class="stream_channel" style="text-align: center">' + stream_type +
        '</div></div>';

    return Main_td;
}

function ChannelContent_createFallow(id, user_name, stream_type, preview_thumbnail) {
    ChannelContent_thumbnail_fallow = preview_thumbnail;
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', ChannelContent_ids[8] + id);
    Main_td.setAttribute(Main_DataAttribute, user_name);
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = '<div id="' + ChannelContent_ids[0] + id +
        '" class="stream_thumbnail_video" ><div id="schannel_cont_heart" style="position: absolute; top: 5%; left: 6%;"></div><img id="' +
        ChannelContent_ids[1] + id + '" class="stream_img_fallow"></div>' +
        '<div id="' + ChannelContent_ids[2] + id + '" class="stream_text">' +
        '<div id="' + ChannelContent_ids[3] + id + '" class="stream_channel">' + stream_type + '</div>' +
        '<div id="' + ChannelContent_ids[5] + id + '"class="stream_info">' + Main_addCommas(ChannelContent_selectedChannelViews) +
        STR_VIEWS + '</div>' +
        '<div id="' + ChannelContent_ids[6] + id + '"class="stream_info" >' + Main_addCommas(ChannelContent_selectedChannelFallower) +
        STR_FALLOWERS + '</div></div>';

    return Main_td;
}

function ChannelContent_setFallow() {
    if (AddCode_IsFallowing) {
        Main_innerHTML("schannel_cont_heart", '<i class="icon-heart" style="color: #00b300; font-size: 1200%; text-shadow: #FFFFFF 0 0 10px, #FFFFFF 0 0 10px, #FFFFFF 0 0 8px;"></i>');
        Main_textContent(ChannelContent_ids[3] + "1_0", Main_selectedChannelDisplayname + STR_FALLOWING);
    } else {
        Main_innerHTML("schannel_cont_heart", '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 1200%; text-shadow: #000000 0 0 10px, #000000 0 0 10px, #000000 0 0 8px;"></i>');
        if (AddUser_UserIsSet()) Main_textContent(ChannelContent_ids[3] + "1_0", Main_selectedChannelDisplayname + STR_FALLOW);
        else Main_textContent(ChannelContent_ids[3] + "1_0", Main_selectedChannelDisplayname + STR_CANT_FALLOW);
    }
}

function ChannelContent_loadDataSuccessFinish() {
    Main_ready(function() {
        if (!ChannelContent_status) {
            Main_HideLoadDialog();
            ChannelContent_status = true;
            if (ChannelContent_thumbnail !== '')
                Main_loadImg(document.getElementById(ChannelContent_ids[1] + '0_0'),
                    ChannelContent_thumbnail, IMG_404_VIDEO);
            Main_loadImg(document.getElementById(ChannelContent_ids[1] + '1_0'), ChannelContent_thumbnail_fallow, IMG_404_LOGO);
            ChannelContent_addFocus();
            Main_ShowElement(ChannelContent_ids[10]);
        }
        ChannelContent_checkUser();
        ChannelContent_loadingData = false;
    });
}

function ChannelContent_checkUser() {
    if (ChannelContent_UserChannels) ChannelContent_setFallow();
    else if (AddUser_UserIsSet()) {
        AddCode_Channel_id = Main_selectedChannel_id;
        AddCode_PlayRequest = false;
        AddCode_CheckFallow();
    } else {
        AddCode_IsFallowing = false;
        ChannelContent_setFallow();
    }
}

function ChannelContent_addFocus() {
    Main_AddClass(ChannelContent_ids[0] +
        ChannelContent_cursorY + '_' + (!ChannelContent_cursorY ? ChannelContent_cursorX : 0), Main_classThumb);
}

function ChannelContent_removeFocus() {
    Main_removeFocus(ChannelContent_cursorY + '_' + (!ChannelContent_cursorY ? ChannelContent_cursorX : 0), ChannelContent_ids);
}

function ChannelContent_keyEnter() {
    if (ChannelContent_cursorY) {
        if (AddUser_UserIsSet() && AddUser_UsernameArray[Users_Position].access_token) {
            AddCode_PlayRequest = false;
            AddCode_Channel_id = Main_selectedChannel_id;
            if (AddCode_IsFallowing) AddCode_UnFallow();
            else AddCode_Fallow();
        } else {
            Main_showWarningDialog(STR_NOKEY_WARN);
            window.setTimeout(Main_HideWarningDialog, 2000);
        }
    } else {
        document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
        Main_HideElement(ChannelContent_ids[10]);
        var value = (!ChannelContent_skipImg ? 0 : 1);
        if (ChannelContent_cursorX === (0 - value)) {

            Play_selectedChannel = document.getElementById(ChannelContent_ids[8] + ChannelContent_cursorY +
                '_' + ChannelContent_cursorX).getAttribute(Main_DataAttribute);

            Play_selectedChannelDisplayname = document.getElementById(ChannelContent_ids[3] + ChannelContent_cursorY +
                '_' + ChannelContent_cursorX).textContent;

            if (Play_selectedChannelDisplayname.indexOf(STR_USER_HOSTING) !== -1) {
                Play_isHost = true;
                Play_DisplaynameHost = Play_selectedChannelDisplayname;
                Play_selectedChannelDisplayname = Play_selectedChannelDisplayname.split(STR_USER_HOSTING)[1];
            }

            Main_openStream();
        } else if (ChannelContent_cursorX === (1 - value)) ChannelVod_init();
        else if (ChannelContent_cursorX === (2 - value)) ChannelClip_init();
    }
}

function ChannelContent_SetChannelValue() {
    ChannelContent_ChannelValue = {
        "Main_selectedChannel_id": Main_selectedChannel_id,
        "Main_selectedChannelLogo": Main_selectedChannelLogo,
        "Main_selectedChannel": Main_selectedChannel,
        "Main_selectedChannelDisplayname": Main_selectedChannelDisplayname,
        "ChannelContent_UserChannels": ChannelContent_UserChannels,
        "Main_BeforeChannel": Main_BeforeChannel
    };
}

function ChannelContent_RestoreChannelValue() {
    Main_selectedChannel_id = ChannelContent_ChannelValue.Main_selectedChannel_id;
    Main_selectedChannelLogo = ChannelContent_ChannelValue.Main_selectedChannelLogo;
    Main_selectedChannel = ChannelContent_ChannelValue.Main_selectedChannel;
    Main_selectedChannelDisplayname = ChannelContent_ChannelValue.Main_selectedChannelDisplayname;
    ChannelContent_UserChannels = ChannelContent_ChannelValue.ChannelContent_UserChannels;
    Main_BeforeChannel = ChannelContent_ChannelValue.Main_BeforeChannel;
    ChannelContent_ChannelValue = {};
}

function ChannelContent_handleKeyDown(event) {
    if (ChannelContent_loadingData || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                Main_Go = Main_BeforeChannel;
                Main_BeforeChannel = Main_Live;
                ChannelContent_exit();
                Main_selectedChannel_id = '';
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            if (!ChannelContent_cursorY) {
                ChannelContent_removeFocus();
                ChannelContent_cursorX--;
                if (ChannelContent_cursorX < 0) ChannelContent_cursorX = (!ChannelContent_skipImg ? 2 : 1);
                ChannelContent_addFocus();
            }
            break;
        case KEY_RIGHT:
            if (!ChannelContent_cursorY) {
                ChannelContent_removeFocus();
                ChannelContent_cursorX++;
                if (ChannelContent_cursorX > (!ChannelContent_skipImg ? 2 : 1)) ChannelContent_cursorX = 0;
                ChannelContent_addFocus();
            }
            break;
        case KEY_UP:
        case KEY_DOWN:
            ChannelContent_removeFocus();
            ChannelContent_cursorY = !ChannelContent_cursorY ? 1 : 0;
            ChannelContent_addFocus();
            break;
        case KEY_INFO:
        case KEY_CHANNELGUIDE:
            ChannelContent_StartLoad();
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            ChannelContent_keyEnter();
            break;
        case KEY_RED:
            Main_SidePannelStart(ChannelContent_handleKeyDown);
            break;
        case KEY_GREEN:
            ChannelContent_exit();
            Main_GoLive();
            break;
        case KEY_YELLOW:
            Main_showControlsDialog();
            break;
        case KEY_BLUE:
            if (!Search_isSearching) {
                ChannelContent_SetChannelValue();
                Main_BeforeSearch = Main_ChannelContent;
            }
            Main_Go = Main_Search;
            ChannelContent_exit();
            Main_SwitchScreen();
            break;
        default:
            break;
    }
}