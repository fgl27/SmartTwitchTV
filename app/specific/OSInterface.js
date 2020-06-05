//This file holds all 'Android.' function of the app
//Android is the JavascriptInterface or the OSInterface
//In order to port this web app to some other OS one must port some of this OSInterface function
//If a function is Android specific, the feature that it provides may only be needed on a Android device
//Check what the function does and if the new OS provides the function make a new one or find a way to adapt

//public long GetNotificationTime()
//Android specific: true
//with time im ms of when notifications will end
//To prevent show in app notification when background notification have ended showing
function OSInterface_GetNotificationTime() {
    return Main_IsOn_OSInterface ? Android.GetNotificationTime() : 0;
}

//public String GetNotificationOld()
//Android specific: true
//returns the last know list of live channels
function OSInterface_GetNotificationOld() {
    return Main_IsOn_OSInterface ? Android.GetNotificationOld() : null;
}

//public void SetNotificationOld(String list)
//Android specific: true
//returns the last know list of live channels
function OSInterface_SetNotificationOld(list) {
    if (Main_IsOn_OSInterface) Android.SetNotificationOld(list);
}

//public void StopNotificationService()
//Android specific: true
//Allows to stop the notification service from js side
function OSInterface_StopNotificationService() {
    if (Main_IsOn_OSInterface) Android.StopNotificationService();
}

//public void upNotificationState(boolean Notify)
//Notify  background notification are enable
//Android specific: true
//Allows to stop the notification service from js side
function OSInterface_upNotificationState(Notify) {
    if (Main_IsOn_OSInterface) Android.upNotificationState(Notify);
}

//public void Settings_SetPingWarning(boolean warning)
//warning enable or not the warning if ping fail for too long
//Android specific: true
//Allows to enable disable ping ail warning
function OSInterface_Settings_SetPingWarning(warning) {
    if (Main_IsOn_OSInterface) Android.Settings_SetPingWarning(warning);
}

//public void SetQuality(int position)
//position = the track position of the track group, the array of current available qualities of the player, -1 equals auto
//Android specific: false
//Allows to change the main player quality
function OSInterface_SetQuality(position) {
    Android.SetQuality(position);
}

//public void getStreamDataAsync(String token_url, String hls_url, String callback, long checkResult, int position, int ReTryMax, int Timeout)
//token_url = the base token url
//hls_url = the base hls playlist url
//callback = the call back function
//checkResult = a uniq ID number to prevent the callback answer to the wrong request, as this is a Async fun
//position = the position of the arrays that this function uses, arrays of string result and threads
//ReTryMax = the retry quanity in case the http request fails
//Timeout = http request timeout
//Android specific: false
//Allows to get the stream data, that if called from JS will fail do to CORS error
function OSInterface_getStreamDataAsync(token_url, hls_url, callback, checkResult, position, ReTryMax, Timeout) {
    Android.getStreamDataAsync(
        token_url,
        hls_url,
        callback,
        checkResult,
        position,
        ReTryMax,
        Timeout
    );
}

//public void CheckIfIsLiveFeed(String token_url, String hls_url, int Delay_ms, String callback, int x, int y, int ReTryMax, int Timeout)
//token_url = the base token url
//hls_url = the base hls playlist url
//Delay_ms = Delay in ms to start the check
//callback = the call back function
//x & y the position of the array that hold the result also used to check the received info can be used by callback 
//ReTryMax = the retry quanity in case the http request fails
//Timeout = http request timeout
//Android specific: false
//Allows to get the stream data, that if called from JS will fail do to CORS error
function OSInterface_CheckIfIsLiveFeed(token_url, hls_url, Delay_ms, callback, x, y, ReTryMax, Timeout) {
    Android.CheckIfIsLiveFeed(
        token_url,
        hls_url,
        Delay_ms,
        callback,
        x,
        y,
        ReTryMax,
        Timeout
    );
}

//public String getStreamData(String token_url, String hls_url, int ReTryMax, int Timeout)
//token_url = the base token url
//hls_url = the base hls playlist url
//ReTryMax = the retry quanity in case the http request fails
//Timeout = http request timeout
//Android specific: false
//Allows to get the stream data, that if called from JS will fail do to CORS error
function OSInterface_getStreamData(token_url, hls_url, ReTryMax, Timeout) {
    return Android.getStreamData(
        token_url,
        hls_url,
        ReTryMax,
        Timeout
    );
}

//public String getQualities()
//Android specific: true
//Allows to get the stream data, that if called from JS will fail do to CORS error
function OSInterface_getQualities() {
    return Android.getQualities();
}

//public void GetMethodUrlHeadersAsync(String urlString, int timeout, String postMessage, String Method, String JsonString,
//                                            String callback, long checkResult, int key, int thread)
//urlString = the url to to the http request
//timeout = http request timeout
//postMessage = if is a output message if not null
//Method = http Method 'GET, POST, PUT, DELETE'
//JsonHeadersArray = The stringify array contain the http request headers
//callback = the call back function
//checkResult = a uniq ID number to prevent the callback answer to the wrong request, as this is a Async fun
//key = the return key used by Screens, 0 if not a Screen call
//thread = the thread number to be used there is 4 thread, 0 to 3
//Android specific: false
//Allows to make a http request in a async function on a url that if called from JS will fail do to CORS error
function OSInterface_GetMethodUrlHeadersAsync(urlString, timeout, postMessage, Method, JsonHeadersArray, callback, checkResult, key, thread) {
    Android.GetMethodUrlHeadersAsync(
        urlString,
        timeout,
        postMessage,
        Method,
        JsonHeadersArray,
        callback,
        checkResult,
        key,
        thread
    );
}

//public String mMethodUrlHeaders(String urlString, int timeout, String postMessage, String Method, long checkResult, String JsonHeadersArray)
//urlString = the url to to the http request
//timeout = http request timeout
//postMessage = if is a output message if not null
//Method = http Method 'GET, POST, PUT, DELETE'
//checkResult = a uniq ID number to prevent the callback answer to the wrong request, as this is a Async fun
//JsonHeadersArray = The stringify array contain the http request headers
//callback = the call back function
//Android specific: false
//Allows to make a http request in a sync function on a url that if called from JS will fail do to CORS error
function OSInterface_mMethodUrlHeaders(urlString, timeout, postMessage, Method, checkResult, JsonHeadersArray) {
    return Android.mMethodUrlHeaders(
        urlString,
        timeout,
        postMessage,
        Method,
        checkResult,
        JsonHeadersArray
    );
}

//public void mSwitchPlayerAudio(int position)
//position = the audio position, 2 enables both player audio, 1 only Main player, 0 small player
//Android specific: false
//Allows to change the audio source on PP or 50/50 mode
function OSInterface_mSwitchPlayerAudio(position) {
    Android.mSwitchPlayerAudio(position);
}

//public void mupdatesizePP(boolean FullScreen)
//FullScreen = if true Main player full size small player will be small in relation to PlayerViewSmallSize[][], if false 50/50 mode
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Allows to change player size on PP mode
function OSInterface_mupdatesizePP(isFullScreen) {
    Android.mupdatesizePP(isFullScreen);
}

//public void mupdatesize(boolean FullScreen)
//FullScreen = if true Main player full size small player will be small in relation to PlayerViewSmallSize[][], if false 50/50 mode
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Allows to change player size on PP mode
function OSInterface_mupdatesize(isFullScreen) {
    Android.mupdatesize(isFullScreen);
}

//public void mSetPlayerPosition(int PicturePicturePos)
//PicturePicturePos = The position of the small player
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Changes small player position on the screen
function OSInterface_mSetPlayerPosition(PicturePicturePos) {
    Android.mSetPlayerPosition(PicturePicturePos);
}

//public void mSetPlayerSize(int mPicturePictureSize)
//mPicturePictureSize = The size of the small player
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Changes small player size
function OSInterface_mSetPlayerSize(mPicturePictureSize) {
    Android.mSetPlayerSize(mPicturePictureSize);
}

//public void msetPlayer(boolean surface_view, boolean FullScreen)
//surface_view = surface_view or texture_view
//FullScreen updae updateVideSizePP else updateVideSize
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//changes all player to surface_view or texture_view for PP workaround
function OSInterface_msetPlayer(surface_view, FullScreen) {
    if (Main_IsOn_OSInterface) Android.msetPlayer(surface_view, FullScreen);
}

//public void SetBuffer(int who_called, int buffer_size)
//who_called = 0 live, 1 vod, 2 clip
//buffer_size = buffer size in ms
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Change the player starting buffer
function OSInterface_SetBuffer(who_called, buffer_size) {
    if (Main_IsOn_OSInterface) Android.SetBuffer(who_called, buffer_size);
}

//public void mSetlatency(boolean LowLatency)
//LowLatency = if true LowLatency is enable
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Changes small player size
function OSInterface_mSetlatency(LowLatency) {
    Android.mSetlatency(LowLatency);
}

//public void mSwitchPlayerSize(int mPicturePictureSize)
//mPicturePictureSize = PicturePictureSize sizes are 0 , 1 , 2, of the 
//Array PlayerViewSmallSize[][PicturePictureSize] PicturePictureSize is the width size... 0 50% or 1/2, 1 33% or 1/3, 2 25% or 1/4
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Allows to change small player size
function OSInterface_mSwitchPlayerSize(PicturePictureSize) {
    Android.mSwitchPlayerSize(PicturePictureSize);
}

//public void mSwitchPlayer()
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Allows to change with will be the bigger player on PP mode
function OSInterface_mSwitchPlayer() {
    Android.mSwitchPlayer();
}

//public void mSwitchPlayerPosition(int mPicturePicturePosition)
//mPicturePicturePosition = the small player position on the screen
//Array PlayerViewSmallSize[mPicturePicturePosition][] 8 positions it screen side and corner
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Allows to change the small player position
function OSInterface_mSwitchPlayerPosition(mPicturePicturePosition) {
    Android.mSwitchPlayerPosition(mPicturePicturePosition);
}

//public void RestartPlayer(int who_called, long ResumePosition, int player)
//who_called = 0 live, 1 vod, 2 clip
//ResumePosition =  the position to start the video, if a live this is always 0
//player = the player position, there is several player to do multistream support
//Android specific: true
//Allows to get the stream data, that if called from JS will fail do to CORS error
function OSInterface_RestartPlayer(who_called, ResumePosition, player) {
    Android.RestartPlayer(who_called, ResumePosition, player);
}

//public void StartAuto(String uri, String masterPlaylistString, int who_called, long ResumePosition, int player)
//uri =  the url of the playlist or the clip
//masterPlaylistString = the stringify version of the url playlist content
//who_called = 0 live, 1 vod, 2 clip
//ResumePosition =  the position to start the video, if a live this is always 0
//player = the player position, there is several player to do multistream support
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Sets mediaSources and start the player
function OSInterface_StartAuto(uri, masterPlaylistString, who_called, ResumePosition, player) {
    Android.StartAuto(
        uri,
        masterPlaylistString,
        who_called,
        ResumePosition,
        player
    );
}

//public void mhideSystemUI()
//Android specific: true
//hides android SystemUI on a phone, top bar and sw navigation keys
function OSInterface_mhideSystemUI() {
    Android.mhideSystemUI();
}

//public void upNotificationId(String id)
//id =  the user id
//Android specific: true
//Sets the user id used by the notification services
function OSInterface_upNotificationId(id) {
    Android.upNotificationId(id);
}

//public void BackupFile(String file, String file_content)
//file =  the file name and or path
//file_content = the file content
//Android specific: true
//Backups user array and user history to a file
function OSInterface_BackupFile(file, file_content) {
    Android.BackupFile(file, file_content);
}

//public String mPageUrl()
//Android specific: true
//return the apk main url
function OSInterface_mPageUrl() {
    return Android.mPageUrl();
}

//public void clearCookie()
//Android specific: true
//Clears saved cookies to prevent show a already logged authentication page, as the app has multi users cookies are automatic saved after a login
function OSInterface_clearCookie() {
    if (Main_IsOn_OSInterface) Android.clearCookie();
}

//public long getsavedtime()
//Android specific: false
//returns mResumePosition to be used after the app has stopped, because the app was minimized or user changed apps
function OSInterface_getsavedtime() {
    return Android.getsavedtime();
}

//public long gettime()
//Android specific: false
//returns PlayerCurrentPosition valued used to show vod/clip position and sync vod/clip chat and video
function OSInterface_gettime() {
    return Android.gettime();
}

//public void stopVideo(int who_called)
//who_called = 0 live, 1 vod, 2 clip
//Android specific: false
//Allows to stop the player when the user chooses to end the playback
function OSInterface_stopVideo(who_called) {
    Android.stopVideo(who_called);
}

//public void mClearSmallPlayer()
//Android specific: false
//Clears the SmallPlayer
function OSInterface_mClearSmallPlayer() {
    Android.mClearSmallPlayer();
}

//public void mseekTo(long position)
//position in ms to seek to
//Android specific: false
//Allows to seek to a position
function OSInterface_mseekTo(position) {
    Android.mseekTo(position);
}

//public void PlayPauseChange()
//Android specific: false
//Allows to change the playback state, if playing pauses and vice versa
function OSInterface_PlayPauseChange() {
    Android.PlayPauseChange();
}

//public void PlayPause(boolean state)
//state the playback state
//Android specific: false
//Allows to set the playback state
function OSInterface_PlayPause(state) {
    Android.PlayPause(state);
}

//public void GetPreviews(String url)
//url = the url that contains the vod previews
//Android specific: false
//Allows to get the vod previews in a async function, need to call this as the url may not work do to CORS
function OSInterface_GetPreviews(url) {
    Android.GetPreviews(url);
}

//public String getversion()
//Android specific: true
//Allows to get app version
function OSInterface_getversion() {
    return Android.getversion();
}

//public boolean getdebug()
//Android specific: true
//Allows to get the app debug state
function OSInterface_getdebug() {
    return Android.getdebug();
}

//public void requestWr()
//Android specific: true
//Runs only once, this functions check for storage access and request the user to give the permission
function OSInterface_requestWr() {
    Android.requestWr();
}

//public boolean HasBackupFile(String file)
//file =  the file path to check
//Android specific: true
//Check if the file exist before restore it
function OSInterface_HasBackupFile(file) {
    return Android.HasBackupFile(file);
}

//public String RestoreBackupFile(String file)
//file =  the file path to restore
//Android specific: true
//Check if the file exist before restore it
function OSInterface_RestoreBackupFile(file) {
    return Android.RestoreBackupFile(file);
}

//public boolean canBackupFile()
//Android specific: true
//Check if storage access is available
function OSInterface_canBackupFile() {
    return Android.canBackupFile();
}

//public String getDevice()
//Android specific: true
//Returns Build.MODEL
function OSInterface_getDevice() {
    return Android.getDevice();
}

//public String getManufacturer()
//Android specific: true
//Returns Build.MANUFACTURER
function OSInterface_getManufacturer() {
    return Android.getManufacturer();
}

//public int getSDK()
//Android specific: true
//Returns Build.VERSION.SDK_INT
function OSInterface_getSDK() {
    return Android.getSDK();
}

//public boolean deviceIsTV()
//Android specific: true
//Returns true if device is a TV
function OSInterface_deviceIsTV() {
    return Android.deviceIsTV();
}

//public void keyEvent(int key, int keyaction)
//key = the key value
//keyaction =  the key action up down etc
//Android specific: true
//Sends a key event
function OSInterface_keyEvent(key, keyaction) {
    Android.keyEvent(key, keyaction);
}

//public void SetSmallPlayerBandwidth(int Bitrate)
//Bitrate = set mainPlayerBitrate, if 0 the value will be set to Integer.MAX_VALUE
//Android specific: true
//Sets small player max Bitrate
function OSInterface_SetSmallPlayerBandwidth(Bitrate) {
    //TODO remove the try after some app updates fun change name
    try {
        Android.SetSmallPlayerBitrate(Bitrate);
    } catch (e) {}
}

//public void SetSmallPlayerBandwidth(int Bitrate)
//Bitrate = set PP_PlayerBitrate, if 0 the value will be set to Integer.MAX_VALUE
//Android specific: true
//Sets Big player max Bitrate
function OSInterface_SetMainPlayerBitrate(Bitrate) {
    //TODO remove the try after some app updates fun change name
    try {
        Android.SetMainPlayerBitrate(Bitrate);
    } catch (e) {}
}

//public String getcodecCapabilities(String CodecType)
//CodecType = avc vp9 a codec type
//Android specific: true
//Returns the codecCapabilities for that codec type
function OSInterface_getcodecCapabilities(CodecType) {
    return Android.getcodecCapabilities(CodecType);
}

//public void setBlackListMediaCodec(String CodecList)
//CodecType = avc vp9 a codec type
//Android specific: true
//Returns the codecCapabilities for that codec type
function OSInterface_setBlackListMediaCodec(CodecList) {
    Android.setBlackListMediaCodec(CodecList);
}

//public void mshowLoading(boolean show)
//show = show or not
//Android specific: true
//Shows a spinning ProgressBar
function OSInterface_mshowLoading(show) {
    Android.mshowLoading(show);
}

//public String getWebviewVersion()
//Android specific: true
//returns the webview version
function OSInterface_getWebviewVersion() {
    return Android.getWebviewVersion();
}

//public void mclose(boolean close)
//close = close == true close else minimize
//Android specific: true
//closes or minimize the app
function OSInterface_mclose(close) {
    Android.mclose(close);
}

//public void mloadUrl(String url)
//url = the url to open
//Android specific: true
//opens a url on the main webview of the apk
function OSInterface_mloadUrl(url) {
    Android.mloadUrl(url);
}

//public boolean isAccessibilitySettingsOn()
//Android specific: true
//Checks is a Accessibility service is enable
function OSInterface_isAccessibilitySettingsOn() {
    Android.isAccessibilitySettingsOn();
}

//public void LongLog(String log)
//Android specific: true
//Logs to logcat the console.log of the app
function OSInterface_LongLog(log) {
    if (Main_IsOn_OSInterface) Android.LongLog(log);
}

//public void getVideoStatus(boolean showLatency)
//Android specific: true
//request the video status dropped frames, buffer size etc
function OSInterface_getVideoStatus(showLatency) {
    Android.getVideoStatus(showLatency);
}

//public String getVideoStatusString()
//Android specific: true
//request the video status dropped frames, buffer size etc
function OSInterface_getVideoStatusString() {
    return Android.getVideoStatusString();
}

//public void getVideoQuality(int who_called)
//who_called = 0 live 1 vod
//Android specific: true
//request the video quality for the auto playback
function OSInterface_getVideoQuality(who_called) {
    Android.getVideoQuality(who_called);
}

//public String getVideoStatusString()
//Android specific: true
//returns the video quality for the auto playback
function OSInterface_getVideoQualityString() {
    return Android.getVideoQualityString();
}

//public void DisableMultiStream()
//Android specific: true
//Disables MultiStream
function OSInterface_DisableMultiStream() {
    Android.DisableMultiStream();
}

//public void StartMultiStream(int position, String uri, String masterPlaylistString)
//position = position of the player
//uri = uri of the playlist
//masterPlaylistString = master Playlist String
//Android specific: true
//Start MultiStream at position
function OSInterface_StartMultiStream(position, uri, masterPlaylistString) {
    Android.StartMultiStream(position, uri, masterPlaylistString);
}

//public void EnableMultiStream(boolean MainBig, int offset)
//MainBig = MainBig mode if true the main player is bigger
//offset = is the player position offset on the screen, one can click left right to change with will be the main player, the offset determines the position of it player
//masterPlaylistString = master Playlist String
//Android specific: true
//Start MultiStream and allows to change its mode
function OSInterface_EnableMultiStream(MainBig, offset) {
    Android.EnableMultiStream(MainBig, offset);
}

//public void setPlaybackSpeed(float speed)
//speed = the playback speed
//Android specific: true
//Allows to change the playback speed
function OSInterface_setPlaybackSpeed(speed) {
    Android.setPlaybackSpeed(speed);
}

//public void OpenExternal(String url)
//url = the url of the video
//Android specific: true
//Allows to open current video on a external player
function OSInterface_OpenExternal(url) {
    Android.OpenExternal(url);
}

//public void SetPreviewSize(int mPreviewSize)
//mPreviewSize = the Preview Size
//Android specific: true
//Allows to change the player preview size
function OSInterface_SetPreviewSize(mPreviewSize) {
    //TODO remove the try after some apps updates
    try {
        Android.SetPreviewSize(mPreviewSize);
    } catch (e) {}
}

//public void SetPreviewAudio(int volume)
//volume = the volume of others player
//Android specific: true
//Allows to lower others player volume when preview player is showing
function OSInterface_SetPreviewAudio(volume) {
    //TODO remove the try after some apps updates
    try {
        Android.SetPreviewAudio(volume);
    } catch (e) {}
}

//public void mSetPlayerAudioMulti(int position)
//position = the player position to enable the audio 0 to 3, 4 all player enable
//Android specific: true
//Allows to set with player will produce audio
function OSInterface_mSetPlayerAudioMulti(position) {
    Android.mSetPlayerAudioMulti(position);
}

//public boolean IsMainNotMain()
//Android specific: true
//boolean if true the main player is not the original main player and a change is needed to prevent odd behavior when changing multistream players positon
function OSInterface_IsMainNotMain() {
    return Android.IsMainNotMain();
}

//public void PrepareForMulti(String uri, String masterPlaylistString)
//uri =  the url of the playlist or the clip
//masterPlaylistString = the stringify version of the url playlist content
//Android specific: true
//If IsMainNotMain fix player position
function OSInterface_PrepareForMulti(uri, masterPlaylistString) {
    Android.PrepareForMulti(uri, masterPlaylistString);
}

//public void StartFeedPlayer(String uri, String masterPlaylistString, int position, boolean fullBitrate)
//uri =  the url of the playlist or the clip
//masterPlaylistString = the stringify version of the url playlist content
//position = position of the player on the screen
//fullBitrate = if is side panel the player can use max Bitrate if not no
//Android specific: true
//Start MultiStream at position
function OSInterface_StartFeedPlayer(uri, masterPlaylistString, position) {
    //TODO remove the try after some apps updates
    try {
        Android.StartFeedPlayer(uri, masterPlaylistString, position);
    } catch (e) {
        Android.StartFeedPlayer(uri, masterPlaylistString, position, false);
    }
}

//public void StartFeedPlayer(String uri, String masterPlaylistString, , int top, int right, int bottom, int left)
//uri =  the url of the playlist or the clip
//masterPlaylistString = the stringify version of the url playlist content
//Android specific: true
//Start MultiStream at position
function OSInterface_StartSidePanelPlayer(uri, masterPlaylistString) {
    //TODO remove the try after some apps updates
    try {
        Android.StartSidePanelPlayer(
            uri,
            masterPlaylistString
        );
    } catch (e) {}
}

//public void SetPlayerViewSidePanel(int top, int right, int bottom, int left, int web_height)
//uri =  the url of the playlist or the clip
//masterPlaylistString = the stringify version of the url playlist content
//top, right, bottom, left = 'side_panel_feed_thumb'.getBoundingClientRect()
//Android specific: true
//Start MultiStream at position
function OSInterface_SetPlayerViewSidePanel(top, right, bottom, left, web_height) {
    //TODO remove the try after some apps updates
    try {
        Android.SetPlayerViewSidePanel(
            parseInt(top),
            parseInt(right),
            parseInt(bottom),
            parseInt(left),
            parseInt(web_height)
        );
    } catch (e) {}
}

//public void ClearFeedPlayer()
//Android specific: true
//Clear the side panel or small player over the live feed play removes it from the screen
function OSInterface_ClearFeedPlayer() {
    Android.ClearFeedPlayer();
}

//public void SetFeedPosition(int position)
//position the position on the screen
//Android specific: true
//Clear the side panel or small player over the live feed play removes it from the screen
function OSInterface_SetFeedPosition(position) {
    Android.SetFeedPosition(position);
}

//public void mshowLoadingBottom(boolean show)
//show =  show or hide
//Android specific: true
//Shows a spinning ProgressBar over live feed
function OSInterface_mshowLoadingBottom(show) {
    Android.mshowLoadingBottom(show);
}

//public void KeyboardCheckAndHIde()
//Android specific: true
//Checks and hide the on screen keyboard if a hw keyboard is connected to the devices
function OSInterface_KeyboardCheckAndHIde() {
    Android.KeyboardCheckAndHIde();
}

//public void hideKeyboardFrom()
//Android specific: true
//Hides the on screen keyboard
function OSInterface_hideKeyboardFrom() {
    Android.hideKeyboardFrom();
}

//public boolean isKeyboardConnected()
//Android specific: true
//informs if a hw Keyboard is connected to the devices
// function OSInterface_isKeyboardConnected() {//Not be used
//     return Android.isKeyboardConnected();
// }

//public boolean showKeyboardFrom()
//Android specific: true
//force show sw Keyboard
// function OSInterface_showKeyboardFrom() {//Not be used
//     Android.showKeyboardFrom();
// }

//public boolean getPlaybackState()
//Android specific: true
//return the playback state
// function OSInterface_getPlaybackState() {//Not be used
//     return Android.getPlaybackState();
// }

//public void mKeepScreenOn(boolean keepOn)
//Android specific: true
//Allows to control if the screen will be on or not from js side
// function OSInterface_mKeepScreenOn(keepOn) {//Not be used
//     Android.mKeepScreenOn(keepOn);
// }

//public void mSetAudio(int position, float volume)
//position player position
//volume the player volume
//Android specific: true
//Allows to control individual player volume
// function OSInterface_mSetAudio(position, volume) {//Not be used
//     Android.mSetAudio(position, volume);
// }

//public void showToast(String toast)
//position player position
//volume the player volume
//Android specific: true
//Allows to control individual player volume
// function OSInterface_showToast(toast) {//Not be used
//     Android.showToast(toast);
// }