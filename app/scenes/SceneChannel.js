alert('SceneSceneChannel.js loaded');

SceneSceneChannel.Player = null;

function SceneSceneChannel() {

};

function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

SceneSceneChannel.shutdownStream = function()
{
	SceneSceneChannel.Player.Stop();
	
	sf.scene.show('SceneBrowser');
	sf.scene.hide('SceneChannel');
	sf.scene.focus('SceneBrowser');
};


SceneSceneChannel.prototype.initialize = function ()
{	
	SceneSceneChannel.Player = document.getElementById('pluginObjectPlayer');
    SceneSceneChannel.Player.SetDisplayArea(0, 0, 1280, 720);
};



SceneSceneChannel.prototype.handleShow = function (data) {
	alert("SceneSceneChannel.handleShow()");
};

SceneSceneChannel.prototype.handleHide = function () {
	alert("SceneSceneChannel.handleHide()");
};

SceneSceneChannel.prototype.handleFocus = function () {
	alert("SceneSceneChannel.handleFocus()");
	
	var channel = SceneSceneBrowser.selectedChannel;
	
    var responceText = httpGet('http://api.twitch.tv/api/channels/' + channel + '/access_token');
	var response = JSON.parse(responceText);
    var url = 'http://usher.twitch.tv/select/' + channel + '.json?type=any&nauthsig='+response.sig+'&nauth='+escape(response.token);

    SceneSceneChannel.Player.OnConnectionFailed = 'SceneSceneChannel.onConnectionFailed';
    SceneSceneChannel.Player.OnAuthenticationFailed = 'SceneSceneChannel.onAuthenticationFailed';
    SceneSceneChannel.Player.OnStreamNotFound = 'SceneSceneChannel.onStreamNotFound';
    SceneSceneChannel.Player.OnNetworkDisconnected = 'SceneSceneChannel.onNetworkDisconnected';
    SceneSceneChannel.Player.OnRenderError = 'SceneSceneChannel.onRenderError';
    SceneSceneChannel.Player.OnRenderingComplete = 'SceneSceneChannel.onRenderingComplete';
    SceneSceneChannel.Player.OnBufferingComplete = 'SceneSceneChannel.onBufferingComplete';
    SceneSceneChannel.Player.OnBufferingStart = 'SceneSceneChannel.onBufferingStart';
    SceneSceneChannel.Player.OnBufferingProgress = 'SceneSceneChannel.onBufferingProgress';
	
    SceneSceneChannel.Player.Play(url + '|COMPONENT=HLS');  
};

SceneSceneChannel.prototype.handleBlur = function () {
	alert("SceneSceneChannel.handleBlur()");
};

SceneSceneChannel.prototype.handleKeyDown = function (keyCode) {
	alert("SceneSceneChannel.handleKeyDown(" + keyCode + ")");

	switch (keyCode) {
		case sf.key.LEFT:
			break;
		case sf.key.RIGHT:
			break;
		case sf.key.UP:
			break;
		case sf.key.DOWN:
			break;
		case sf.key.ENTER:
			break;
		case sf.key.RETURN:
			sf.key.preventDefault();
			SceneSceneChannel.shutdownStream();
			break;
		case sf.key.VOL_UP:
			sf.service.setVolumeControl(true);
			break;
		case sf.key.VOL_DOWN:
			sf.service.setVolumeControl(true);
			break;
		case sf.key.MUTE:
			sf.service.setVolumeControl(true);
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};


SceneSceneChannel.onConnectionFailed = function () {
	SceneSceneChannel.shutdownStream();
};

SceneSceneChannel.onAuthenticationFailed = function () {
	SceneSceneChannel.shutdownStream();
};

SceneSceneChannel.onStreamNotFound = function () {
	SceneSceneChannel.shutdownStream();
};

SceneSceneChannel.onNetworkDisconnected = function () {
	SceneSceneChannel.shutdownStream();
};

SceneSceneChannel.onRenderError = function (RenderErrorType) {
	SceneSceneChannel.shutdownStream();
};

SceneSceneChannel.onRenderingComplete = function () {
	SceneSceneChannel.shutdownStream();
};

SceneSceneChannel.onBufferingStart = function () {
};

SceneSceneChannel.onBufferingProgress = function (percent) {
};

SceneSceneChannel.onBufferingComplete = function () {
};


