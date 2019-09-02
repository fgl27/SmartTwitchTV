//Variable initialization
var ChannelContent_cursorY = 0;
var ChannelContent_cursorX = 0;
var ChannelContent_dataEnded = false;
var ChannelContent_itemsCount = 0;
var ChannelContent_loadingDataTry = 0;
var ChannelContent_loadingDataTryMax = 5;
var ChannelContent_loadingDataTimeout = 3500;
var ChannelContent_itemsCountOffset = 0;
var ChannelContent_skipImg = false;
var ChannelContent_UserChannels = false;
var ChannelContent_TargetId;
var ChannelContent_ids = ['cc_thumbdiv', 'cc_img', 'cc_infodiv', 'cc_name', 'cc_createdon', 'cc_game', 'cc_viwers', 'cc_duration', 'cc_cell', 'sccempty_', 'channel_content_scroll'];
var ChannelContent_status = false;
var ChannelContent_lastselectedChannel = '';
var ChannelContent_responseText = null;
var ChannelContent_selectedChannelViews = '';
var ChannelContent_selectedChannelFallower = '';
var ChannelContent_description = '';
var ChannelContent_ChannelValue = {};
var ChannelContent_ChannelValueIsset = false;
var ChannelContent_offline_image = null;
var ChannelContent_profile_banner = '';
//Variable initialization end

function ChannelContent_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_ChannelContent;
    if (ChannelContent_ChannelValueIsset && !Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
    if (ChannelContent_lastselectedChannel !== Main_values.Main_selectedChannel) ChannelContent_status = false;
    Main_cleanTopLabel();
    document.body.addEventListener("keydown", ChannelContent_handleKeyDown, false);
    AddCode_PlayRequest = false;

    if (Main_values.Main_BeforeChannel === Main_UserChannels || Main_values.My_channel) {
        Main_values.Sidepannel_Pos = Main_values.My_channel ? 8 : 7;
        Sidepannel_SetUserLables();
        Sidepannel_SetTopOpacity(Main_values.Main_Go);
    }

    if (ChannelContent_status) {
        Main_YRst(ChannelContent_cursorY);
        Main_ShowElement(ChannelContent_ids[10]);
        ChannelContent_checkUser();
        ChannelContent_addFocus();
        Main_SaveValues();
    } else ChannelContent_StartLoad();
}

function ChannelContent_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
    Main_HideElement(ChannelContent_ids[10]);
    Main_values.My_channel = false;
}

function ChannelContent_StartLoad() {
    Main_empty('stream_table_channel_content');
    Main_HideElement(ChannelContent_ids[10]);
    ChannelContent_offline_image = null;
    Main_showLoadDialog();
    Main_HideWarningDialog();
    ChannelContent_lastselectedChannel = Main_values.Main_selectedChannel;
    ChannelContent_status = false;
    ChannelContent_skipImg = false;
    ChannelContent_itemsCountOffset = 0;
    ChannelContent_itemsCount = 0;
    ChannelContent_cursorX = 0;
    ChannelContent_cursorY = 0;
    ChannelContent_dataEnded = false;
    ChannelContent_TargetId = undefined;
    ChannelContent_loadDataPrepare();
    ChannelContent_loadDataRequest();
}

function ChannelContent_loadDataPrepare() {
    Main_FirstLoad = true;
    ChannelContent_loadingDataTry = 0;
    ChannelContent_loadingDataTimeout = 3500;
}

function ChannelContent_loadDataRequest() {
    var theUrl = 'https://api.twitch.tv/kraken/streams/' + encodeURIComponent(ChannelContent_TargetId !== undefined ? ChannelContent_TargetId : Main_values.Main_selectedChannel_id);

    BasehttpGet(theUrl, ChannelContent_loadingDataTimeout, 2, null, ChannelContent_loadDataRequestSuccess, ChannelContent_loadDataError);
}

function ChannelContent_loadDataRequestSuccess(response) {
    if (JSON.parse(response).stream !== null) {
        ChannelContent_responseText = response;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    } else if (!ChannelContent_TargetId) {
        ChannelContent_loadDataPrepare();
        ChannelContent_loadDataCheckHost();
    } else {
        ChannelContent_responseText = null;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
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
    var theUrl = 'https://tmi.twitch.tv/hosts?include_logins=1&host=' + encodeURIComponent(Main_values.Main_selectedChannel_id);

    BasehttpGet(theUrl, ChannelContent_loadingDataTimeout, 1, null, ChannelContent_CheckHost, ChannelContent_loadDataCheckHostError, true);
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
    ChannelContent_TargetId = response.hosts[0].target_id;
    if (ChannelContent_TargetId !== undefined) {
        ChannelContent_loadDataPrepare();
        ChannelContent_loadDataRequest();
    } else {
        ChannelContent_responseText = null;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    }
}

function ChannelContent_GetStreamerInfo() {
    var theUrl = 'https://api.twitch.tv/kraken/channels/' + Main_values.Main_selectedChannel_id;

    BasehttpGet(theUrl, PlayVod_loadingInfoDataTimeout, 2, null, ChannelContent_GetStreamerInfoSuccess, ChannelContent_GetStreamerInfoError);
}

function ChannelContent_GetStreamerInfoSuccess(responseText) {
    var channel = JSON.parse(responseText);
    ChannelContent_offline_image = channel.video_banner;
    ChannelContent_offline_image = ChannelContent_offline_image ? ChannelContent_offline_image.replace("1920x1080", Main_VideoSize) : ChannelContent_offline_image;
    ChannelContent_profile_banner = channel.profile_banner;
    ChannelContent_selectedChannelViews = channel.views;
    ChannelContent_selectedChannelFallower = channel.followers;
    ChannelContent_description = channel.description;
    Main_values.Main_selectedChannelLogo = channel.logo;
    Main_values.Main_selectedChannelPartner = channel.partner;

    ChannelContent_loadDataSuccess();
}

function ChannelContent_GetStreamerInfoError() {
    ChannelContent_loadingDataTry++;
    if (ChannelContent_loadingDataTry < ChannelContent_loadingDataTryMax) {
        ChannelContent_loadingDataTimeout += 500;
        ChannelContent_GetStreamerInfo();
    } else {
        ChannelContent_offline_image = null;
        ChannelContent_profile_banner = IMG_404_BANNER;
        ChannelContent_selectedChannelViews = '';
        ChannelContent_selectedChannelFallower = '';
        ChannelContent_description = '';
        Main_values.Main_selectedChannelLogo = IMG_404_LOGO;
        ChannelContent_loadDataSuccess();
    }
}

//TODO improve te looks of this screen
function ChannelContent_loadDataSuccess() {
    var row = document.createElement('tr'),
        coloumn_id = 0,
        doc = document.getElementById("stream_table_channel_content");

    var td = document.createElement('td');
    td.className = 'stream_cell';
    row.appendChild(td);

    td = document.createElement('td');
    td.className = 'follower_banner';
    td.innerHTML = '<div id="' + ChannelContent_ids[0] + 'x_0" class="follower_banner"><img id="' +
        ChannelContent_ids[1] + 'x_0" alt="" class="stream_img_banner" src="' + ChannelContent_profile_banner +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_BANNER + '\'"></div>';
    row.appendChild(td);

    doc.appendChild(row);

    row = document.createElement('tr');

    if (ChannelContent_responseText !== null) {
        var response = JSON.parse(ChannelContent_responseText);
        if (response.stream !== null) {
            var hosting = ChannelContent_TargetId !== undefined ? Main_values.Main_selectedChannelDisplayname +
                STR_USER_HOSTING : '';
            var stream = response.stream;
            row.appendChild(ChannelContent_createCell('0_' + coloumn_id, stream.channel.name, stream.channel._id, stream.preview.template,
                twemoji.parse(stream.channel.status), stream.game,
                hosting + stream.channel.display_name,
                STR_SINCE + Play_streamLiveAt(stream.created_at) + STR_SPACE + STR_FOR +
                Main_addCommas(stream.viewers) + STR_SPACE + STR_VIEWER,
                Main_videoqualitylang(stream.video_height, stream.average_fps, stream.channel.broadcaster_language),
                Main_is_rerun(stream.stream_type)));
            coloumn_id++;
        } else ChannelContent_skipImg = true;
    } else ChannelContent_skipImg = true;

    row.appendChild(ChannelContent_createChannelCell('0_' + coloumn_id,
        Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelDisplayname + STR_PAST_BROA, 'movie-play'));
    coloumn_id++;
    row.appendChild(ChannelContent_createChannelCell('0_' + coloumn_id,
        Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelDisplayname + STR_CLIPS, 'movie'));

    if (coloumn_id < 2) {
        coloumn_id++;
        row.appendChild(ChannelContent_createEmptyCell(ChannelContent_ids[9] + '0_' + coloumn_id));
    }

    doc.appendChild(row);

    row = document.createElement('tr');

    row.appendChild(ChannelContent_createFallow('1_0',
        Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelLogo));

    td = document.createElement('td');
    td.setAttribute('id', 'stream_cell_x_x');
    td.className = 'stream_cell';
    td.innerHTML = '<div id="' + ChannelContent_ids[0] +
        'x_x" class="stream_thumbnail_video" ><div id="' +
        ChannelContent_ids[4] + 'x_x" class="stream_channel_info">' +
        twemoji.parse(ChannelContent_description) + '</div></div>';
    row.appendChild(td);

    doc.appendChild(row);

    ChannelContent_loadDataSuccessFinish();
}


function ChannelContent_createEmptyCell(id) {
    var td = document.createElement('td');
    td.setAttribute('id', id);
    td.className = 'stream_cell';

    return td;
}

//TODO revise this functions there is too many
function ChannelContent_createCell(id, channel_name, channel_id, preview_thumbnail, stream_title, stream_game, channel_display_name, viwers, quality, rerun) {

    var icon = 'circle',
        ishosting = ChannelContent_TargetId !== undefined,
        color = ishosting ? '#FED000' : 'red';

    if (rerun) {
        color = '#FFFFFF';
        icon = 'refresh';
    }

    var td = document.createElement('td');
    td.setAttribute('id', ChannelContent_ids[8] + id);
    td.setAttribute(Main_DataAttribute, JSON.stringify([channel_name, channel_id, rerun]));

    td.className = 'stream_cell';
    td.innerHTML = '<div id="' + ChannelContent_ids[0] + id + '" class="stream_thumbnail_video" >' +
        '<img id="' + ChannelContent_ids[1] + id + '" alt="" class="stream_img"src="' + preview_thumbnail.replace("{width}x{height}", Main_VideoSize) + Main_randomimg +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_VIDEO + '\'"></div>' +
        '<div id="' + ChannelContent_ids[2] + id + '" class="stream_text">' +
        '<div id="' + ChannelContent_ids[3] + id + '" class="stream_channel" style="width:' + (ishosting ? 99 : 66) + '%; display: inline-block;">' +
        '<i class="icon-' + icon + ' live_icon" style="color: ' + color + ';"></i> ' + channel_display_name + '</div>' +
        '<div id="' + ChannelContent_ids[7] + id + '"class="stream_info" style="width:' + (ishosting ? 0 : 33) + '%; float: right; text-align: right; display: inline-block;">' +
        (ishosting ? '' : quality) + '</div>' +
        '<div id="' + ChannelContent_ids[4] + id + '"class="stream_info">' + stream_title + '</div>' +
        '<div id="' + ChannelContent_ids[5] + id + '"class="stream_info">' +
        (stream_game !== "" ? STR_PLAYING + stream_game : "") + '</div>' +
        '<div id="' + ChannelContent_ids[6] + id + '"class="stream_info">' + viwers + '</div>' + '</div>';

    return td;
}

function ChannelContent_createChannelCell(id, user_name, stream_type, icons) {
    var td = document.createElement('td');
    td.setAttribute('id', 'channel_' + id);
    td.className = 'stream_cell';
    td.innerHTML = '<div id="' + ChannelContent_ids[0] + id + '" class="stream_thumbnail_video" ><div id="' +
        ChannelContent_ids[1] + id +
        '" class="stream_channel_content_icon"><i class="icon-' + icons + ' strokicon"></i></div></div>' +
        '<div id="' + ChannelContent_ids[2] + id + '" class="stream_text">' +
        '<div id="' + ChannelContent_ids[3] + id + '" class="stream_channel" style="text-align: center">' + stream_type +
        '</div></div>';

    return td;
}

function ChannelContent_createFallow(id, user_name, stream_type, preview_thumbnail) {
    var td = document.createElement('td');
    td.setAttribute('id', 'fallow_' + id);
    td.className = 'stream_cell';
    td.innerHTML = '<div id="' + ChannelContent_ids[0] + id +
        '" class="stream_thumbnail_video" ><div id="schannel_cont_heart" style="position: absolute; top: 5%; left: 6%;"></div><img id="' +
        ChannelContent_ids[1] + id + '" alt="" class="stream_img_fallow"src="' + preview_thumbnail +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\'"></div>' +
        '<div id="' + ChannelContent_ids[2] + id + '" class="stream_text_channel">' +
        '<div id="' + ChannelContent_ids[3] + id + '" class="stream_channel">' + stream_type + '</div>' +
        '<div id="' + ChannelContent_ids[5] + id + '"class="stream_info">' + Main_addCommas(ChannelContent_selectedChannelViews) +
        STR_VIEWS + '</div>' +
        '<div id="' + ChannelContent_ids[6] + id + '"class="stream_info" >' + Main_addCommas(ChannelContent_selectedChannelFallower) +
        STR_FALLOWERS + '</div></div>';

    return td;
}

function ChannelContent_setFallow() {
    var partnerIcon = Main_values.Main_selectedChannelDisplayname + STR_SPACE + STR_SPACE +
        (Main_values.Main_selectedChannelPartner ? '<img style="display: inline-block; width: 2ch; vertical-align: middle;" alt="" src="' + IMG_PARTNER + '">' + STR_SPACE + STR_SPACE : "");

    if (AddCode_IsFallowing) {
        Main_innerHTML("schannel_cont_heart", '<i class="icon-heart strokicon" style="color: #00b300; font-size: 600%;"></i>');
        Main_innerHTML(ChannelContent_ids[3] + "1_0", partnerIcon + STR_FALLOWING);
    } else {
        Main_innerHTML("schannel_cont_heart", '<i class="icon-heart-o strokicon" style="color: #FFFFFF; font-size: 600%;"></i>');
        if (AddUser_UserIsSet()) Main_innerHTML(ChannelContent_ids[3] + "1_0", partnerIcon + STR_FALLOW);
        else Main_innerHTML(ChannelContent_ids[3] + "1_0", partnerIcon + STR_CANT_FALLOW);
    }
}

function ChannelContent_loadDataSuccessFinish() {
    if (!ChannelContent_status) {
        ChannelContent_status = true;
        ChannelContent_addFocus();
        Main_SaveValues();
        Main_ShowElement(ChannelContent_ids[10]);
        Main_HideLoadDialog();
    }
    ChannelContent_checkUser();
    Main_FirstLoad = false;
}

function ChannelContent_checkUser() {
    if (ChannelContent_UserChannels) ChannelContent_setFallow();
    else if (AddUser_UserIsSet()) {
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
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
    Main_handleKeyUp();
}

function ChannelContent_removeFocus() {
    Main_removeFocus(ChannelContent_cursorY + '_' + (!ChannelContent_cursorY ? ChannelContent_cursorX : 0), ChannelContent_ids);
}

function ChannelContent_keyEnter() {
    if (ChannelContent_cursorY) {
        if (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token) {
            AddCode_PlayRequest = false;
            AddCode_Channel_id = Main_values.Main_selectedChannel_id;
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

            Main_values.Play_selectedChannel = JSON.parse(document.getElementById(ChannelContent_ids[8] + ChannelContent_cursorY +
                '_' + ChannelContent_cursorX).getAttribute(Main_DataAttribute));

            Main_values.IsRerun = Main_values.Play_selectedChannel[2];
            Main_values.Play_selectedChannel = Main_values.Play_selectedChannel[0];

            Main_values.Play_selectedChannelDisplayname = document.getElementById(ChannelContent_ids[3] + ChannelContent_cursorY +
                '_' + ChannelContent_cursorX).textContent;

            if (Main_values.Play_selectedChannelDisplayname.indexOf(STR_USER_HOSTING) !== -1) {
                Main_values.Play_isHost = true;
                Main_values.Play_DisplaynameHost = Main_values.Play_selectedChannelDisplayname;
                Main_values.Play_selectedChannelDisplayname = Main_values.Play_selectedChannelDisplayname.split(STR_USER_HOSTING)[1];
                Main_values.Play_selectedChannel_id = ChannelContent_TargetId;
            } else Main_values.Play_selectedChannel_id = Main_values.Main_selectedChannel_id;

            var playing = document.getElementById(ChannelContent_ids[5] + ChannelContent_cursorY + '_' + ChannelContent_cursorX).textContent;
            Main_values.Play_gameSelected = playing.indexOf(STR_PLAYING) !== -1 ? playing.split(STR_PLAYING)[1] : "";

            Main_ready(Main_openStream);
        } else if (ChannelContent_cursorX === (1 - value)) {
            Main_ready(function() {
                inUseObj = ChannelVod;
                Screens_init();
            });
        } else if (ChannelContent_cursorX === (2 - value)) {
            inUseObj = ChannelClip;
            Main_ready(Screens_init);
        }
    }
}

function ChannelContent_SetChannelValue() {
    ChannelContent_ChannelValue = {
        "Main_values.Main_selectedChannel_id": Main_values.Main_selectedChannel_id,
        "Main_values.Main_selectedChannelLogo": Main_values.Main_selectedChannelLogo,
        "Main_values.Main_selectedChannel": Main_values.Main_selectedChannel,
        "Main_values.Main_selectedChannelDisplayname": Main_values.Main_selectedChannelDisplayname,
        "ChannelContent_UserChannels": ChannelContent_UserChannels,
        "Main_values.Main_BeforeChannel": Main_values.Main_BeforeChannel
    };
}

function ChannelContent_RestoreChannelValue() {
    Main_values.Main_selectedChannel_id = Main_values.Main_selectedChannel_id;
    Main_values.Main_selectedChannelLogo = Main_values.Main_selectedChannelLogo;
    Main_values.Main_selectedChannel = Main_values.Main_selectedChannel;
    Main_values.Main_selectedChannelDisplayname = Main_values.Main_selectedChannelDisplayname;
    ChannelContent_UserChannels = ChannelContent_ChannelValue.ChannelContent_UserChannels;
    Main_values.Main_BeforeChannel = Main_values.Main_BeforeChannel;
    ChannelContent_ChannelValue = {};
    ChannelContent_ChannelValueIsset = false;
}

function ChannelContent_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                ChannelContent_removeFocus();
                document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
                Main_values.Main_Go = Main_values.Main_BeforeChannel;
                Main_values.Main_BeforeChannel = Main_Live;
                ChannelContent_exit();
                Sidepannel_SetDefaultLables();
                Main_values.Main_selectedChannel_id = '';
                Main_SwitchScreenAction();
            }
            break;
        case KEY_LEFT:
            if (!ChannelContent_cursorX) {
                ChannelContent_removeFocus();
                Sidepannel_Start(ChannelContent_handleKeyDown);
            } else if (!ChannelContent_cursorY) {
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
            if (!ChannelContent_cursorY) {
                ChannelContent_removeFocus();
            } else {
                ChannelContent_removeFocus();
                ChannelContent_cursorY = 0;
                ChannelContent_addFocus();
            }
            break;
        case KEY_DOWN:
            if (!ChannelContent_cursorY) {
                ChannelContent_removeFocus();
                ChannelContent_cursorY = 1;
                ChannelContent_addFocus();
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            ChannelContent_keyEnter();
            break;
        case KEY_REFRESH:
            Main_ReloadScreen();
            break;
        default:
            break;
    }
}