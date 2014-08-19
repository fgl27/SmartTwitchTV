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
SceneSceneChannel.qualityPlaying = SceneSceneChannel.quality;
SceneSceneChannel.qualityPlayingIndex = 2;
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
		$('#quality_arrow_up').css({ 'opacity' : 0.2 });
		$('#quality_arrow_down').css({ 'opacity' : 1.0 });
	}
	else if (SceneSceneChannel.qualityIndex == SceneSceneChannel.getQualitiesCount() - 1)
	{
		$('#quality_arrow_up').css({ 'opacity' : 1.0 });
		$('#quality_arrow_down').css({ 'opacity' : 0.2 });
	}
	else
	{
		$('#quality_arrow_up').css({ 'opacity' : 1.0 });
		$('#quality_arrow_down').css({ 'opacity' : 1.0 });
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

SceneSceneChannel.initLanguage = function ()
{
	//set correct labels
	$('#label_quality').html(STR_QUALITY);
};

SceneSceneChannel.prototype.initialize = function ()
{	
	SceneSceneChannel.initLanguage();
	
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
	
    sf.service.setScreenSaver(true, 100000);

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
    $('#stream_info_name').text(SceneSceneBrowser.selectedChannel);
	$("#stream_info_title").text("");
	$("#stream_info_viewer").text("");
	$("#stream_info_icon").attr("src", "");
	SceneSceneChannel.updateStreamInfo();
    
    SceneSceneChannel.streamInfoTimer = window.setInterval(SceneSceneChannel.updateStreamInfo, 10000);
    
    SceneSceneChannel.Player.SetDisplayArea(0, 0, 1280, 720);
    
    SceneSceneChannel.tokenResponse = 0;
    SceneSceneChannel.playlistResponse = 0;
    SceneSceneChannel.playingTry = 0;
    SceneSceneChannel.state = SceneSceneChannel.STATE_LOADING_TOKEN;
    
    SceneSceneChannel.loadData();
};

SceneSceneChannel.prototype.handleBlur = function () {
	alert("SceneSceneChannel.handleBlur()");
	
    sf.service.setScreenSaver(false);
};

SceneSceneChannel.prototype.handleKeyDown = function (keyCode) {
	alert("SceneSceneChannel.handleKeyDown(" + keyCode + ")");
	if (SceneSceneChannel.state != SceneSceneChannel.STATE_PLAYING)
	{
		switch (keyCode) {
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
		}
	}
	else
	{
		switch (keyCode) {
			case sf.key.CH_UP:
				if (SceneSceneChannel.isPanelShown() && SceneSceneChannel.qualityIndex > 0)
				{
					SceneSceneChannel.qualityIndex--;
					SceneSceneChannel.qualityDisplay();
				}
				break;
			case sf.key.CH_DOWN:
				if (SceneSceneChannel.isPanelShown()
						&& SceneSceneChannel.qualityIndex < SceneSceneChannel.getQualitiesCount() - 1)
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
					SceneSceneChannel.qualityChanged();
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
	}
};


SceneSceneChannel.onConnectionFailed = function () {
	if (SceneSceneChannel.playingTry++ < SceneSceneChannel.playingTryMax)
	{
		SceneSceneChannel.showDialog(STR_RETRYING + " (" + SceneSceneChannel.playingTry + "/" + SceneSceneChannel.playingTryMax + ")");
		SceneSceneChannel.Player.Play(SceneSceneChannel.playingUrl + '|COMPONENT=HLS');
	}
	else
	{
		SceneSceneChannel.showDialog(STR_ERROR_CONNECTION_FAIL );
	}
};

SceneSceneChannel.onAuthenticationFailed = function () {
	SceneSceneChannel.showDialog(STR_ERROR_AUTHENTICATION_FAIL);
};

SceneSceneChannel.onStreamNotFound = function () {
	SceneSceneChannel.showDialog(STR_ERROR_STREAM_NOT_FOUND);
};

SceneSceneChannel.onNetworkDisconnected = function () {
	SceneSceneChannel.showDialog(STR_ERROR_NETWORK_DISCONNECT);
};

SceneSceneChannel.onRenderError = function (RenderErrorType) {
	SceneSceneChannel.showDialog(STR_ERROR_RENDER);
};

SceneSceneChannel.onRenderingComplete = function () {
	SceneSceneChannel.shutdownStream();
};

SceneSceneChannel.onBufferingStart = function () {
	SceneSceneChannel.showDialog(STR_BUFFERING);
};

SceneSceneChannel.onBufferingProgress = function (percent) {
	SceneSceneChannel.showDialog( STR_BUFFERING + ": " + percent + "%");
};

SceneSceneChannel.onBufferingComplete = function () {
	SceneSceneChannel.showPlayer();
};


SceneSceneChannel.qualityChanged = function()
{
	SceneSceneChannel.showDialog("");
	SceneSceneChannel.playingUrl = 'http://usher.twitch.tv/select/' + SceneSceneBrowser.selectedChannel + '.json?type=any&nauthsig=' + SceneSceneChannel.tokenResponse.sig + '&nauth=' + escape(SceneSceneChannel.tokenResponse.token);
	SceneSceneChannel.qualityIndex = 0;
	
	for (var i = 0; i < SceneSceneChannel.qualities.length; i++)
	{
		if (SceneSceneChannel.qualities[i].id === SceneSceneChannel.quality)
		{
			SceneSceneChannel.qualityIndex = i + 1;
			SceneSceneChannel.playingUrl = SceneSceneChannel.qualities[i].url;
			break;
		}
	}
	
	if (SceneSceneChannel.qualityIndex == 0)
	{
		SceneSceneChannel.quality = SceneSceneChannel.QualityAuto;
	}

	SceneSceneChannel.qualityPlaying = SceneSceneChannel.quality;
	SceneSceneChannel.qualityPlayingIndex = SceneSceneChannel.qualityIndex;

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

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

SceneSceneChannel.updateStreamInfo = function()
{
	var xmlHttp = new XMLHttpRequest();
	
	xmlHttp.ontimeout = function()
	{

	};
	xmlHttp.onreadystatechange = onload;
	xmlHttp.onload = function()
	{
		if (xmlHttp.readyState === 4)
		{ 
			if (xmlHttp.status === 200)
			{
				try
				{
					var response = $.parseJSON(xmlHttp.responseText);
					$("#stream_info_title").text(response.stream.channel.status);
					$("#stream_info_viewer").text(addCommas(response.stream.viewers) + ' ' + STR_VIEWER);
					$("#stream_info_icon").attr("src", response.stream.channel.logo);
				}
				catch (err)
				{
					
				}
				
			}
			else
			{
			}
		}
	};
    xmlHttp.open("GET", 'https://api.twitch.tv/kraken/streams/' + SceneSceneBrowser.selectedChannel, true);
	xmlHttp.timeout = 10000;
    xmlHttp.send(null);
};

SceneSceneChannel.showPanel = function()
{
	SceneSceneChannel.qualityDisplay();
	$("#scene_channel_panel").show();
};

SceneSceneChannel.hidePanel = function()
{
	$("#scene_channel_panel").hide();
	SceneSceneChannel.quality = SceneSceneChannel.qualityPlaying;
	SceneSceneChannel.qualityIndex = SceneSceneChannel.qualityPlayingIndex;
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
		SceneSceneChannel.qualityChanged();
		SceneSceneChannel.state = SceneSceneChannel.STATE_PLAYING;
	} 
};

SceneSceneChannel.loadDataRequest = function()
{
	try
	{
		var dialog_title = "";
		if (SceneSceneChannel.loadingDataTry > 0)
		{
			dialog_title = STR_RETRYING + " (" + (SceneSceneChannel.loadingDataTry + 1) + "/" + SceneSceneChannel.loadingDataTryMax + ")";
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
			theUrl = 'http://usher.twitch.tv/select/' + SceneSceneBrowser.selectedChannel + '.json?type=any&nauthsig=' + SceneSceneChannel.tokenResponse.sig + '&nauth=' + escape(SceneSceneChannel.tokenResponse.token) + '&allow_source=true';
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
