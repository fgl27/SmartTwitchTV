alert('SceneSceneChannel.js loaded');

SceneSceneChannel.Player = null;

SceneSceneChannel.loadingDataTryMax = 15;
SceneSceneChannel.loadingDataTry;
SceneSceneChannel.loadingDataTimeout;

SceneSceneChannel.playingTryMax = 10;
SceneSceneChannel.playingTry;
SceneSceneChannel.playingUrl;

SceneSceneChannel.STATE_LOADING_TOKEN = 0;
SceneSceneChannel.STATE_LOADING_PLAYLIST = 1;
SceneSceneChannel.STATE_PLAYING = 2;
SceneSceneChannel.state = SceneSceneChannel.STATE_LOADING_TOKEN;

SceneSceneChannel.QualityAuto = "Auto";
SceneSceneChannel.quality = "High";
SceneSceneChannel.qualityIndex;
SceneSceneChannel.qualities;

SceneSceneChannel.tokenResponse;
SceneSceneChannel.playlistResponse;

SceneSceneChannel.streamInfoTimer = null;

function extractStreamDeclarations(input)
{
  var result = [];

  var myRegexp = /#EXT-X-MEDIA:(.)*\n#EXT-X-STREAM-INF:(.)*\n(.)*/g;
  var match;
  while (match = myRegexp.exec(input))
  {
    result.push(match[0]);
  }

  return result;
}
function extractQualityFromStream(input)
{
  var myRegexp = /#EXT-X-MEDIA:.*NAME=\"(\w+)\".*/g;
  var match = myRegexp.exec(input);

  return match[1];
}
function extractUrlFromStream(input)
{
  var myRegexp = /#EXT-X-MEDIA:.*\n#EXT-X-STREAM-INF:.*\n(.+)/g;
  var match = myRegexp.exec(input);

  return match[1];
}
function extractQualities(input)
{
  var result = [ ];

  var streams = extractStreamDeclarations(input);
  for (var i = 0; i < streams.length; i++)
  {
    result.push({'id' : extractQualityFromStream(streams[i]), 'url' : extractUrlFromStream(streams[i])});
  }

  return result;
}

function sleep(millis, callback) {
    setTimeout(function()
            { callback(); }
    , millis);
}

function SceneSceneChannel() {

};

SceneSceneChannel.shutdownStream = function()
{
	SceneSceneChannel.Player.Stop();
	
	sf.scene.show('SceneBrowser');
	sf.scene.hide('SceneChannel');
	sf.scene.focus('SceneBrowser');
};

SceneSceneChannel.getQualitiesCount = function()
{
	return SceneSceneChannel.qualities.length + 1;
};

SceneSceneChannel.qualityDisplay = function()
{
	if (SceneSceneChannel.qualityIndex == 0)
	{
		$('#quality_arrow_up').show();
		$('#quality_arrow_down').hide();
	}
	else if (SceneSceneChannel.qualityIndex == SceneSceneChannel.getQualitiesCount() - 1)
	{
		$('#quality_arrow_up').hide();
		$('#quality_arrow_down').show();
	}
	else
	{
		$('#quality_arrow_up').show();
		$('#quality_arrow_down').show();
	}
	
	if (SceneSceneChannel.qualityIndex == 0)
	{
		SceneSceneChannel.quality = SceneSceneChannel.QualityAuto;
	}
	else
	{
		SceneSceneChannel.quality = SceneSceneChannel.qualities[SceneSceneChannel.qualityIndex - 1].id;
	}
	
	$('#quality_name').text(SceneSceneChannel.quality);
};

SceneSceneChannel.prototype.initialize = function ()
{	
	SceneSceneChannel.Player = document.getElementById('pluginObjectPlayer');
};

SceneSceneChannel.prototype.handleShow = function (data) {
	alert("SceneSceneChannel.handleShow()");
};

SceneSceneChannel.prototype.handleHide = function () {
	alert("SceneSceneChannel.handleHide()");
	window.clearInterval(SceneSceneChannel.streamInfoTimer);
};

SceneSceneChannel.prototype.handleFocus = function () {
	alert("SceneSceneChannel.handleFocus()");

    SceneSceneChannel.Player.OnConnectionFailed = 'SceneSceneChannel.onConnectionFailed';
    SceneSceneChannel.Player.OnAuthenticationFailed = 'SceneSceneChannel.onAuthenticationFailed';
    SceneSceneChannel.Player.OnStreamNotFound = 'SceneSceneChannel.onStreamNotFound';
    SceneSceneChannel.Player.OnNetworkDisconnected = 'SceneSceneChannel.onNetworkDisconnected';
    SceneSceneChannel.Player.OnRenderError = 'SceneSceneChannel.onRenderError';
    SceneSceneChannel.Player.OnRenderingComplete = 'SceneSceneChannel.onRenderingComplete';
    SceneSceneChannel.Player.OnBufferingComplete = 'SceneSceneChannel.onBufferingComplete';
    SceneSceneChannel.Player.OnBufferingStart = 'SceneSceneChannel.onBufferingStart';
    SceneSceneChannel.Player.OnBufferingProgress = 'SceneSceneChannel.onBufferingProgress';
    
    SceneSceneChannel.hidePanel();
    
    SceneSceneChannel.streamInfoTimer = window.setInterval(SceneSceneChannel.updateStreamInfo, 20000);
    
    SceneSceneChannel.Player.SetDisplayArea(0, 0, 1280, 720);
    
    SceneSceneChannel.playingTry = 0;
    SceneSceneChannel.state = SceneSceneChannel.STATE_LOADING_TOKEN;
    
    SceneSceneChannel.loadData();
};

SceneSceneChannel.prototype.handleBlur = function () {
	alert("SceneSceneChannel.handleBlur()");
};

SceneSceneChannel.prototype.handleKeyDown = function (keyCode) {
	alert("SceneSceneChannel.handleKeyDown(" + keyCode + ")");

	switch (keyCode) {
		case sf.key.CH_UP:
			if (SceneSceneChannel.qualityIndex > 0)
			{
				SceneSceneChannel.qualityIndex--;
				SceneSceneChannel.qualityDisplay();
			}
			break;
		case sf.key.CH_DOWN:
			if (SceneSceneChannel.qualityIndex < SceneSceneChannel.getQualitiesCount() - 1)
			{
				SceneSceneChannel.qualityIndex++;
				SceneSceneChannel.qualityDisplay();
			}
			break;
		case sf.key.LEFT:
			SceneSceneChannel.showPanel();
			break;
		case sf.key.RIGHT:
			SceneSceneChannel.hidePanel();
			break;
		case sf.key.UP:
			break;
		case sf.key.DOWN:
			break;
		case sf.key.ENTER:
			if (SceneSceneChannel.isPanelShown())
			{
				SceneSceneChannel.hidePanel();
			}
			else
			{
				SceneSceneChannel.showPanel();
			}
			break;
		case sf.key.RETURN:
			sf.key.preventDefault();
			if (SceneSceneChannel.isPanelShown())
			{
				SceneSceneChannel.hidePanel();
			}
			else
			{
				SceneSceneChannel.shutdownStream();
			}
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
		case sf.key.RED:
			SceneSceneChannel.qualityChanged();
			break;
		case sf.key.GREEN:
			break;
		case sf.key.YELLOW:
			break;
		case sf.key.BLUE:
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};


SceneSceneChannel.onConnectionFailed = function () {
	if (SceneSceneChannel.playingTry++ < SceneSceneChannel.playingTryMax)
	{
		SceneSceneChannel.showDialog("Opening (" + SceneSceneChannel.playingTry + "/" + SceneSceneChannel.playingTryMax + ")");
		SceneSceneChannel.Player.Play(SceneSceneChannel.playingUrl + '|COMPONENT=HLS');
	}
	else
	{
		SceneSceneChannel.showDialog("Connection failed.");
	}
};

SceneSceneChannel.onAuthenticationFailed = function () {
	SceneSceneChannel.showDialog("Authentication failed.");
};

SceneSceneChannel.onStreamNotFound = function () {
	SceneSceneChannel.showDialog("Stream not found.");
};

SceneSceneChannel.onNetworkDisconnected = function () {
	SceneSceneChannel.showDialog("Network disconnected.");
};

SceneSceneChannel.onRenderError = function (RenderErrorType) {
	SceneSceneChannel.showDialog("Render error.");
};

SceneSceneChannel.onRenderingComplete = function () {
	SceneSceneChannel.shutdownStream();
};

SceneSceneChannel.onBufferingStart = function () {
	SceneSceneChannel.showDialog("Buffering");
};

SceneSceneChannel.onBufferingProgress = function (percent) {
	SceneSceneChannel.showDialog("Buffering: " + percent + "%");
};

SceneSceneChannel.onBufferingComplete = function () {
	SceneSceneChannel.showPlayer();
};


SceneSceneChannel.qualityChanged = function()
{
	SceneSceneChannel.playingUrl = 'http://usher.twitch.tv/select/' + SceneSceneBrowser.selectedChannel + '.json?type=any&nauthsig=' + SceneSceneChannel.tokenResponse.sig + '&nauth=' + escape(SceneSceneChannel.tokenResponse.token);
	SceneSceneChannel.qualityIndex = 0;
	SceneSceneChannel.quality = SceneSceneChannel.QualityAuto;
	
	for (var i = 0; i < SceneSceneChannel.qualities.length; i++)
	{
		if (SceneSceneChannel.qualities[i].id === SceneSceneChannel.quality)
		{
			SceneSceneChannel.qualityIndex = i + 1;
			SceneSceneChannel.playingUrl = SceneSceneChannel.qualities[i].url;
			break;
		}
	}

	SceneSceneChannel.Player.Stop();
	SceneSceneChannel.Player.Play(SceneSceneChannel.playingUrl + '|COMPONENT=HLS');
};

SceneSceneChannel.showDialog = function(title)
{
	$("#scene_channel_dialog_loading_text").text(title);
	$("#scene_channel_dialog_loading").show();
};

SceneSceneChannel.showPlayer = function()
{
	$("#scene_channel_dialog_loading").hide();
};

SceneSceneChannel.updateStreamInfo = function()
{
	
};

SceneSceneChannel.showPanel = function()
{
	SceneSceneChannel.qualityDisplay();
	$("#scene_channel_panel").show();
};

SceneSceneChannel.hidePanel = function()
{
	$("#scene_channel_panel").hide();
};

SceneSceneChannel.isPanelShown = function()
{
	return $("#scene_channel_panel").is(":visible");
};

SceneSceneChannel.loadDataError = function()
{
	SceneSceneChannel.loadingDataTry++;
	if (SceneSceneChannel.loadingDataTry < SceneSceneChannel.loadingDataTryMax)
	{
		if (SceneSceneChannel.loadingDataTry < 10)
		{
			SceneSceneChannel.loadingDataTimeout += 100;
		}
		else
		{
			switch (SceneSceneChannel.loadingDataTry)
			{
			case 10:
				SceneSceneChannel.loadingDataTimeout = 5000;
				break;
			case 11:
				SceneSceneChannel.loadingDataTimeout = 10000;
				break;
			case 12:
				SceneSceneChannel.loadingDataTimeout = 30000;
				break;
			case 13:
				SceneSceneChannel.loadingDataTimeout = 60000;
				break;
			default:
				SceneSceneChannel.loadingDataTimeout = 300000;
				break;
			}
		}
		SceneSceneChannel.loadDataRequest();
	}
	else
	{
		SceneSceneChannel.showDialog("Error: Unable to retrieve access token.");
	}
};

SceneSceneChannel.loadDataSuccess = function(responseText)
{
	SceneSceneChannel.showDialog("");
	
	if (SceneSceneChannel.state == SceneSceneChannel.STATE_LOADING_TOKEN)
	{
		SceneSceneChannel.tokenResponse = JSON.parse(responseText);
		SceneSceneChannel.state = SceneSceneChannel.STATE_LOADING_PLAYLIST;
		SceneSceneChannel.loadData();
	}
	else
	{
		SceneSceneChannel.playlistResponse = responseText;
		SceneSceneChannel.qualities = extractQualities(SceneSceneChannel.playlistResponse);
		alert(SceneSceneChannel.qualities);
		SceneSceneChannel.qualityChanged();
	} 
};

SceneSceneChannel.loadDataRequest = function()
{
	try
	{
		var dialog_title = "";
		if (SceneSceneChannel.loadingDataTry > 0)
		{
			dialog_title = "Retrying (" + (SceneSceneChannel.loadingDataTry + 1) + "/" + SceneSceneChannel.loadingDataTryMax + ")";
		}
		SceneSceneChannel.showDialog(dialog_title);
		
		var xmlHttp = new XMLHttpRequest();
		var theUrl;
		if (SceneSceneChannel.state == SceneSceneChannel.STATE_LOADING_TOKEN)
		{
			theUrl = 'http://api.twitch.tv/api/channels/' + SceneSceneBrowser.selectedChannel + '/access_token';
		}
		else
		{
			theUrl = 'http://usher.twitch.tv/select/' + SceneSceneBrowser.selectedChannel + '.json?type=any&nauthsig=' + SceneSceneChannel.tokenResponse.sig + '&nauth=' + escape(SceneSceneChannel.tokenResponse.token);
		}
		
		xmlHttp.ontimeout = function()
		{
			SceneSceneChannel.loadDataError();
		};
		xmlHttp.onload = function()
		{
			if (xmlHttp.readyState === 4)
			{ 
				if (xmlHttp.status === 200)
				{
					try
					{
						SceneSceneChannel.loadDataSuccess(xmlHttp.responseText);
					}
					catch (err)
					{
						SceneSceneChannel.showDialog("loadDataSuccess() exception: " + err.name + ' ' + err.message);
					}
					
				}
				else
				{
					SceneSceneChannel.loadDataError();
				}
			}
		};
	    xmlHttp.open("GET", theUrl, true);
		xmlHttp.timeout = SceneSceneChannel.loadingDataTimeout;
	    xmlHttp.send(null);
	}
	catch (error)
	{
		SceneSceneChannel.loadDataError();
	}
};

SceneSceneChannel.loadData = function()
{	
	SceneSceneChannel.loadingDataTry = 0;
	SceneSceneChannel.loadingDataTimeout = 500;
	
	SceneSceneChannel.loadDataRequest();
};
