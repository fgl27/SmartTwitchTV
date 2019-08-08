//Variable initialization
var PlayExtra_KeyEnterID;
var PlayExtra_clear = false;
var PlayExtra_selectedChannel = '';
var PlayExtra_selectedChannelDisplayname = '';
var PlayExtra_loadingDataTry = 0;
var PlayExtra_state = Play_STATE_LOADING_TOKEN;
var PlayExtra_qualities;
var PlayExtra_qualityIndex = 0;
var PlayExtra_playingUrl = '';
var PlayExtra_quality = "Auto";
var PlayExtra_qualityPlaying = PlayExtra_quality;
var PlayExtra_selectedChannel_id = 0;
var PlayExtra_IsRerun = false;
var PlayExtra_gameSelected = '';
var PlayExtra_isHost = '';
var PlayExtra_DisplaynameHost = '';
var PlayExtra_PicturePicture = false;

var PlayExtra_selectedChannel_id_Old;
var PlayExtra_IsRerun_Old;
var PlayExtra_selectedChannel_Old;
var PlayExtra_isHost_Old;
var PlayExtra_DisplaynameHost_Old;
var PlayExtra_selectedChannelDisplayname_Old;
var PlayExtra_gameSelected_Old;
var PlayExtra_qualities_Old;
var PlayExtra_qualityPlaying_Old;
var PlayExtra_quality_Old;

function PlayExtra_ResetSpeed() {
    Play_controls[Play_controlsSpeed].defaultValue = Play_CurrentSpeed;
    Play_controls[Play_controlsSpeed].bottomArrows();
    Play_controls[Play_controlsSpeed].setLable();
}

function PlayExtra_KeyEnter() {
    console.log('PlayExtra_KeyEnter');
    PlayExtra_clear = true;

    var doc = document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos);
    if (doc === null) UserLiveFeed_ResetFeedId();
    else {
        var selectedChannel = JSON.parse(doc.getAttribute(Main_DataAttribute))[0];
        if (Main_values.Play_selectedChannel !== selectedChannel && PlayExtra_selectedChannel !== selectedChannel) {
            if (Main_IsNotBrowser) Android.mClearSmallPlayer();
            PlayExtra_PicturePicture = true;
            UserLiveFeed_Hide();

            Main_values.Play_isHost = false;
            Play_UserLiveFeedPressed = true;

            PlayExtra_selectedChannel = JSON.parse(doc.getAttribute(Main_DataAttribute));
            PlayExtra_selectedChannel_id = PlayExtra_selectedChannel[1];
            PlayExtra_IsRerun = PlayExtra_selectedChannel[2];
            PlayExtra_selectedChannel = PlayExtra_selectedChannel[0];
            PlayExtra_isHost = false;
            PlayExtra_selectedChannelDisplayname = document.getElementById(UserLiveFeed_ids[3] + Play_FeedPos).textContent;

            PlayExtra_DisplaynameHost = Main_values.Play_DisplaynameHost;

            var playing = document.getElementById(UserLiveFeed_ids[5] + Play_FeedPos).textContent;
            PlayExtra_gameSelected = playing.indexOf(STR_PLAYING) !== -1 ? playing.split(STR_PLAYING)[1] : "";

            if (Main_IsNotBrowser) {
                //Not on auto mode for change to auto before start picture in picture
                if (Play_quality.indexOf("Auto") === -1) Android.StartAutoPlay(1, 1, false);
                else Android.play(false);

                Play_quality = "Auto";
                Play_qualityPlaying = Play_quality;
            }
            PlayExtra_Resume()
        } else UserLiveFeed_ResetFeedId();
    }
}

function PlayExtra_Resume() {
    PlayExtra_state = Play_STATE_LOADING_TOKEN;
    PlayExtra_loadingDataTry = 0;
    PlayExtra_loadDataRequest();
}

function PlayExtra_SwitchPlayerStoreOld() {
    PlayExtra_selectedChannel_id_Old = Main_values.Play_selectedChannel_id;
    PlayExtra_IsRerun_Old = Main_values.IsRerun;
    PlayExtra_selectedChannel_Old = Main_values.Play_selectedChannel;
    PlayExtra_isHost_Old = Play_isHost;
    PlayExtra_DisplaynameHost_Old = Main_values.Play_DisplaynameHost;
    PlayExtra_selectedChannelDisplayname_Old = Main_values.Play_selectedChannelDisplayname;
    PlayExtra_gameSelected_Old = Main_values.Play_gameSelected;
    PlayExtra_qualities_Old = Play_qualities;
    PlayExtra_qualityPlaying_Old = Play_qualityPlaying;
    PlayExtra_quality_Old = Play_quality;
}

function PlayExtra_SwitchPlayerResStoreOld() {
    PlayExtra_selectedChannel_id = PlayExtra_selectedChannel_id_Old;
    PlayExtra_IsRerun = PlayExtra_IsRerun_Old;
    PlayExtra_selectedChannel = PlayExtra_selectedChannel_Old;
    PlayExtra_isHost = PlayExtra_isHost_Old;
    PlayExtra_DisplaynameHost = PlayExtra_DisplaynameHost_Old;
    PlayExtra_selectedChannelDisplayname = PlayExtra_selectedChannelDisplayname_Old;
    PlayExtra_gameSelected = PlayExtra_gameSelected_Old;
    PlayExtra_qualities = PlayExtra_qualities_Old;
    PlayExtra_qualityPlaying = PlayExtra_qualityPlaying_Old;
    PlayExtra_quality = PlayExtra_quality_Old;
}

function PlayExtra_SwitchPlayer() {
    PlayExtra_SwitchPlayerStoreOld();
    Main_values.Play_selectedChannel_id = PlayExtra_selectedChannel_id;
    Main_values.IsRerun = PlayExtra_IsRerun;
    Main_values.Play_selectedChannel = PlayExtra_selectedChannel;

    Play_isHost = PlayExtra_isHost;

    if (Play_isHost) {
        Main_values.Play_DisplaynameHost = PlayExtra_DisplaynameHost;
        Main_values.Play_selectedChannelDisplayname = Main_values.Play_DisplaynameHost.split(STR_USER_HOSTING)[1];
    } else Main_values.Play_selectedChannelDisplayname = PlayExtra_selectedChannelDisplayname;

    Main_values.Play_gameSelected = PlayExtra_gameSelected;

    if (Main_values.Main_Go === Main_aGame) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
    Play_loadingInfoDataTry = 0;
    Play_updateStreamInfoStart();
    Play_loadChat();

    Play_qualities = PlayExtra_qualities;
    Play_qualityPlaying = PlayExtra_qualityPlaying;
    Play_quality = PlayExtra_quality;

    PlayExtra_SwitchPlayerResStoreOld();
    Main_SaveValues();
}

function PlayExtra_loadDataSuccess(responseText) {
    if (PlayExtra_state === Play_STATE_LOADING_TOKEN) {
        Play_tokenResponse = JSON.parse(responseText);
        PlayExtra_state = Play_STATE_LOADING_PLAYLIST;
        PlayExtra_loadingDataTry = 0;
        PlayExtra_loadDataRequest();
    } else if (PlayExtra_state === Play_STATE_LOADING_PLAYLIST) {
        PlayExtra_qualities = Play_extractQualities(responseText);
        PlayExtra_state = Play_STATE_PLAYING;
        if (Play_isOn) PlayExtra_qualityChanged();
    }
}

function PlayExtra_getQualitiesCount() {
    return PlayExtra_qualities.length;
}

function PlayExtra_qualityChanged() {
    PlayExtra_qualityIndex = 0;
    PlayExtra_playingUrl = PlayExtra_qualities[0].url;
    if (Play_quality.indexOf("source") !== -1) PlayExtra_quality = "source";

    for (var i = 0; i < PlayExtra_getQualitiesCount(); i++) {
        if (PlayExtra_qualities[i].id.indexOf(PlayExtra_quality) !== -1) {
            PlayExtra_qualityIndex = i;
            PlayExtra_playingUrl = PlayExtra_qualities[i].url;
            break;
        }
    }

    PlayExtra_qualityPlaying = PlayExtra_quality;

    if (Main_isDebug) console.log('PlayExtra_onPlayer:', '\n' + '\n"' + Play_playingUrl + '"\n');

    if (Main_IsNotBrowser && Play_isOn) {
        console.log('PlayExtra_qualityChanged');
        //if (PlayExtra_quality.indexOf("Auto") !== -1) Android.initializePlayer2Auto();
        //else Android.initializePlayer2(PlayExtra_playingUrl);
        Android.initializePlayer2Auto();
    }
}

function PlayExtra_loadDataRequest() {
    var theUrl, state = PlayExtra_state === Play_STATE_LOADING_TOKEN;

    if (state) {
        theUrl = 'https://api.twitch.tv/api/channels/' + PlayExtra_selectedChannel + '/access_token?platform=_' +
            (AddUser_UserIsSet() && AddUser_UsernameArray[Main_values.Users_Position].access_token ? '&oauth_token=' +
                AddUser_UsernameArray[Main_values.Users_Position].access_token : '');
    } else {
        theUrl = 'https://usher.ttvnw.net/api/channel/hls/' + PlayExtra_selectedChannel +
            '.m3u8?&token=' + encodeURIComponent(Play_tokenResponse.token) + '&sig=' + Play_tokenResponse.sig +
            '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true' +
            (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();
    }

    var xmlHttp;
    if (Main_IsNotBrowser) {
        xmlHttp = Android.mreadUrl(theUrl, 3000, 1, null);
        if (xmlHttp) xmlHttp = JSON.parse(xmlHttp);
        else {
            Play_loadDataError();
            return;
        }

        PlayExtra_loadDataSuccessreadyState(xmlHttp, state, theUrl);

    } else {
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.timeout = Play_loadingDataTimeout;
        xmlHttp.setRequestHeader(Main_clientIdHeader, Main_clientId);

        xmlHttp.ontimeout = function() {};

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) PlayExtra_loadDataSuccessreadyState(xmlHttp, state, theUrl);
        };

        xmlHttp.send(null);
    }
}

function PlayExtra_loadDataSuccessreadyState(xmlHttp, state, theUrl) {
    if (xmlHttp.status === 200) {
        Play_loadingDataTry = 0;

        if (Play_isOn && !state) {
            try {
                Android.SetAuto2(theUrl);
            } catch (e) {}
        }

        PlayExtra_loadDataSuccess(xmlHttp.responseText);
    } else if (xmlHttp.status === 403) { //forbidden access
        PlayExtra_loadDataFail(STR_FORBIDDEN);
    } else if (xmlHttp.status === 404) { //off line
        PlayExtra_loadDataFail(PlayExtra_selectedChannelDisplayname + ' ' + STR_LIVE + STR_IS_OFFLINE);
    } else {
        PlayExtra_loadDataError();
    }
}

function PlayExtra_loadDataError() {
    if (Play_isOn && Play_isLive) {
        PlayExtra_loadingDataTry++;
        if (PlayExtra_loadingDataTry < Play_loadingDataTryMax) PlayExtra_loadDataRequest();
        else PlayExtra_loadDataFail(STR_PLAYER_PROBLEM_2);
    }
}

function PlayExtra_loadDataFail(Reason) {
    PlayExtra_PicturePicture = false;
    PlayExtra_selectedChannel = '';
    if (Main_IsNotBrowser) {
        Android.play(true);
        Android.mClearSmallPlayer();
    }
    Play_HideBufferDialog();
    Play_showWarningDialog(Reason);
    window.setTimeout(function() {
        Play_HideWarningDialog();
    }, 2500);
}