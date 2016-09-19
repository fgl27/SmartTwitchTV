var random_int = Math.round(Math.random() * 1e7);
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
SceneSceneChannel.isShowDialogOn = false;

SceneSceneChannel.QualityAuto = "Auto";
SceneSceneChannel.quality = "Source";
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

	var quality;
	if (match !== null)
	{
		quality = match[1];
	}
	else
	{
		var values = input.split("\n");
		values = values[0].split(":");
		values = values[1].split(",");

		var set = {};
		for(var i = 0; i<values.length; i++) {
			var value = values[i].split("=");
			set[value[0]] = value[1].replace(/"/g, '');
		}
		quality = set.NAME;
	}
	return quality;
}
function extractUrlFromStream(input)
{
	return input.split("\n")[2];
}
function extractQualities(input)
{
  var result = [ ];

  var streams = extractStreamDeclarations(input);
  for (var i = 0; i < streams.length; i++)
  {
    result.push({
        'id' : extractQualityFromStream(streams[i]),
        'url' : extractUrlFromStream(streams[i])
    });
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
	webapis.avplay.close();
	webapis.avplay.stop();
	$("#scene1").show(); //sf.scene.show('SceneBrowser');
	$("#scene2").hide(); //sf.scene.hide('SceneChannel');
	$("#scene1").focus();
	document.body.removeEventListener("keydown",SceneSceneChannel.prototype.handleKeyDown);
	document.body.addEventListener("keydown",SceneSceneBrowser.prototype.handleKeyDown ,false);
	SceneSceneBrowser.browser = true;
	//sf.scene.focus('SceneBrowser');
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
	$('#label_quality').html(STR_QUALITY);
};

var listener = {
        onbufferingstart: function() {
        		console.log("Buffering start.");
        		SceneSceneChannel.onBufferingStart();
        },
        onbufferingprogress: function(percent) {
	                console.log("Buffering progress data : " + percent);
	        		SceneSceneChannel.onBufferingProgress(percent);
        },
        onbufferingcomplete: function() {
        		console.log("Buffering complete.");
        		SceneSceneChannel.onBufferingComplete();
        },
        oncurrentplaytime: function(currentTime) {
                console.log("Current Playtime : " + currentTime);
                updateCurrentTime(currentTime);
        },
        onevent: function(eventType, eventData) {
                console.log("event type error : " + eventType + ", data: " + eventData);
                if (eventType == 'PLAYER_MSG_RESOLUTION_CHANGED'){
                	console.log("Mudou de Qualidade");
                }
        },
        onerror: function(eventType) {
                console.log("event type error : " + eventType);
	        	if(eventType == 'PLAYER_ERROR_CONNECTION_FAILED'){
	            	console.log("Closing stream from eventType == 'PLAYER_ERROR_CONNECTION_FAILED'");
	            	SceneSceneBrowser.errorNetwork = true;
	            	SceneSceneChannel.shutdownStream();
	            }
        },
        onsubtitlechange: function(duration, text, data3, data4) {
                console.log("Subtitle Changed.");
        },
        ondrmevent: function(drmEvent, drmData) {
                console.log("DRM callback: " + drmEvent + ", data: " + drmData);
        },
        onstreamcompleted: function() {
                console.log("Stream Completed");
                SceneSceneChannel.onRenderingComplete();
        }
 }

var updateCurrentTime = function(currentTime){
	//current time is given in millisecond
	if(currentTime == null){
	    currentTime = webapis.avplay.getCurrentTime();
	}
	document.getElementById("stream_info_currentTime").innerHTML = Math.floor(currentTime/3600000) + ":" + Math.floor((currentTime/60000)%60) + ":" + Math.floor((currentTime/1000)%60);
}

SceneSceneChannel.prototype.initialize = function ()
{
	SceneSceneChannel.initLanguage();
	SceneSceneChannel.Player = document.getElementById('av-player');

	document.addEventListener('visibilitychange', function() {
	    if(document.hidden){
	        webapis.avplay.suspend();//Mandatory. You should call it, if you use avplay.
	        // Something you want to do when hide.
	    } else {
	    	if(!SceneSceneBrowser.browser){
	        	webapis.avplay.restore();
	        }else{
	        	SceneSceneBrowser.refresh();
	        }
	        // Something you want to do when resume.
	    }
	});
};

SceneSceneChannel.prototype.handleShow = function (data) {
	console.log("SceneSceneChannel.handleShow()");
};

SceneSceneChannel.prototype.handleHide = function () {
	console.log("SceneSceneChannel.handleHide()");
	window.clearInterval(SceneSceneChannel.streamInfoTimer);
};

SceneSceneChannel.prototype.handleFocus = function () {
	console.log("SceneSceneChannel.handleFocus()");

	webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF); //screensaver off

	 	//SceneSceneChannel.Player.OnConnectionFailed = 'SceneSceneChannel.onConnectionFailed';          Not implemented
	    //SceneSceneChannel.Player.OnAuthenticationFailed = 'SceneSceneChannel.onAuthenticationFailed';  Not implemented
	    //SceneSceneChannel.Player.OnStreamNotFound = 'SceneSceneChannel.onStreamNotFound';              Not implemented
	    //SceneSceneChannel.Player.OnNetworkDisconnected = 'SceneSceneChannel.onNetworkDisconnected';    Not implemented
	    //SceneSceneChannel.Player.OnRenderError = 'SceneSceneChannel.onRenderError';                    Not implemented
	 	//http://107.22.233.36/guide_static/tizenguide/_downloads/Tizen_AppConverting_Guide_1_10.pdf page 14 example to solve

    SceneSceneChannel.hidePanel();
    $('#stream_info_name').text(SceneSceneBrowser.selectedChannel);
	$("#stream_info_title").text("");
	$("#stream_info_viewer").text("");
	$("#stream_info_icon").attr("src", "");

	SceneSceneChannel.updateStreamInfo();
	SceneSceneChannel.streamInfoTimer = window.setInterval(SceneSceneChannel.updateStreamInfo, 10000);

    SceneSceneChannel.tokenResponse = 0;
    SceneSceneChannel.playlistResponse = 0;
    SceneSceneChannel.playingTry = 0;
    SceneSceneChannel.state = SceneSceneChannel.STATE_LOADING_TOKEN;
    SceneSceneChannel.loadData();
};

SceneSceneChannel.prototype.handleBlur = function () {
	console.log("SceneSceneChannel.handleBlur()");

	webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON); //make screen saver on, when go back for SceneBrowser
};

SceneSceneChannel.prototype.handleKeyDown = function (e) {
	//console.log("SceneSceneChannel.handleKeyDown(" + e.keyCode + ")");
	if (SceneSceneChannel.state != SceneSceneChannel.STATE_PLAYING)
	{
		switch (e.keyCode) {
			case TvKeyCode.KEY_RETURN:
				console.log("KEY_RETURN");
				e.preventDefault(); //prevent key to do default
				SceneSceneChannel.shutdownStream();
				break;
			case TvKeyCode.KEY_VOLUMEUP:
				console.log("KEY_VOLUMEUP");
				break;
			case TvKeyCode.KEY_VOLUMEDOWN:
				console.log("KEY_VOLUMEDOWN");
				break;
			case TvKeyCode.KEY_MUTE:
				console.log("KEY_MUTE");
				break;
		}
	}
	else
	{
		switch (e.keyCode) {
			case TvKeyCode.KEY_CHANNELUP:
			case TvKeyCode.KEY_1:
			case TvKeyCode.KEY_UP:
				if (SceneSceneChannel.isPanelShown() && SceneSceneChannel.qualityIndex > 0)
				{
					console.log("KEY_CHANNELDOWN or KEY_4");
					SceneSceneChannel.qualityIndex--;
					SceneSceneChannel.qualityDisplay();
				}
				break;
			case TvKeyCode.KEY_CHANNELDOWN:
			case TvKeyCode.KEY_4:
			case TvKeyCode.KEY_DOWN:
				if (SceneSceneChannel.isPanelShown()
						&& SceneSceneChannel.qualityIndex < SceneSceneChannel.getQualitiesCount() - 1)
				{
					console.log("KEY_CHANNELDOWN or KEY_4");
					SceneSceneChannel.qualityIndex++;
					SceneSceneChannel.qualityDisplay();
				}
				break;
			case TvKeyCode.KEY_LEFT:
				console.log("KEY_LEFT");
				SceneSceneChannel.showPanel();
				break;
			case TvKeyCode.KEY_RIGHT:
				console.log("KEY_RIGHT");
				SceneSceneChannel.hidePanel();
				break;
			case TvKeyCode.KEY_9:
				console.log("Key9");
				if (SceneSceneChannel.isPanelShown())
				{
					if (SceneSceneChannel.qualityIndex == 0)
					{
						localStorage.setItem('defaultQuality', SceneSceneChannel.QualityAuto);
					}
					else
					{
						localStorage.setItem('defaultQuality', SceneSceneChannel.qualities[SceneSceneChannel.qualityIndex - 1].id);
					}
				}
				break;
			case TvKeyCode.KEY_ENTER:
				console.log("KEY_ENTER");
				if (SceneSceneChannel.isPanelShown())
				{
					SceneSceneChannel.qualityChanged();
				}
				else
				{
					SceneSceneChannel.showPanel();
				}
				break;
			case TvKeyCode.KEY_RETURN:
				e.preventDefault();//prevent key to do default
				if (SceneSceneChannel.isPanelShown())
				{
					SceneSceneChannel.hidePanel();
				}
				else
				{
					SceneSceneChannel.shutdownStream();
				}
				break;
			case TvKeyCode.KEY_VOLUMEUP:
			case TvKeyCode.KEY_VOLUMEDOWN:
				break;
			case TvKeyCode.KEY_MUTE:
				break;
			case TvKeyCode.KEY_RED:
				break;
			case TvKeyCode.KEY_GREEN:
				break;
			case TvKeyCode.KEY_YELLOW:
				break;
			case TvKeyCode.KEY_BLUE:
				break;
			default:
				console.log("handle default key event, key code(" + keyCode + ")");
				break;
		}
	}
};


SceneSceneChannel.onConnectionFailed = function () {
	if (SceneSceneChannel.playingTry++ < SceneSceneChannel.playingTryMax)
	{
		SceneSceneChannel.showDialog(STR_RETRYING + " (" + SceneSceneChannel.playingTry + "/" + SceneSceneChannel.playingTryMax + ")");
		SceneSceneChannel.Player.Play(SceneSceneChannel.playingUrl);
	}
	else
	{
		SceneSceneChannel.showDialog(STR_ERROR_CONNECTION_FAIL);
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
	SceneSceneChannel.shutdownStream();
};

SceneSceneChannel.onRenderError = function (RenderErrorType)
{
	if (SceneSceneChannel.quality == "High"
		|| SceneSceneChannel.quality == "Medium"
		|| SceneSceneChannel.quality == "Low")
	{
		SceneSceneChannel.showDialog(STR_ERROR_RENDER_FIXED);
	}
	else
	{
		SceneSceneChannel.showDialog(STR_ERROR_RENDER_SOURCE);
	}
};

SceneSceneChannel.onRenderingComplete = function () {
	SceneSceneChannel.shutdownStream();
};

SceneSceneChannel.onBufferingStart = function () {
	console.log("onBufferingStart");
	SceneSceneChannel.showDialog(STR_BUFFERING);
};

SceneSceneChannel.onBufferingProgress = function (percent) {
	SceneSceneChannel.showDialog( STR_BUFFERING + ": " + percent + "%");
};

SceneSceneChannel.onBufferingComplete = function () {
	SceneSceneChannel.showPlayer();
};


SceneSceneChannel.qualityChanged = function() {
  SceneSceneChannel.showDialog("");
	SceneSceneChannel.playingUrl = 'http://usher.twitch.tv/api/channel/hls/' + SceneSceneBrowser.selectedChannel + '.m3u8?player=twitchweb&token=' + escape(SceneSceneChannel.tokenResponse.token) + '&sig=' + SceneSceneChannel.tokenResponse.sig + '&$allow_audio_only=true&allow_source=true&type=any&p=' + random_int;
  SceneSceneChannel.qualityIndex = 0;

  console.log(SceneSceneChannel.qualities[0]);

  SceneSceneChannel.qualityIndex = 1;
  SceneSceneChannel.playingUrl = SceneSceneChannel.qualities[0].url;

	SceneSceneChannel.qualityPlaying = SceneSceneChannel.quality;
  SceneSceneChannel.qualityPlayingIndex = SceneSceneChannel.qualityIndex;
  console.log("playing quality: " + SceneSceneChannel.qualityPlaying);
  console.log("quality index: " + SceneSceneChannel.qualityIndex);

  try {
    webapis.avplay.stop();
    console.log("playing url: " + SceneSceneChannel.playingUrl);
    webapis.avplay.open(SceneSceneChannel.playingUrl);
    webapis.avplay.setListener(listener);
    webapis.avplay.setDisplayRect(0, 0, 1920, 1080);
    webapis.avplay.prepare();
    webapis.avplay.play();
  }
  catch (e) {
    console.error(e);
  }
};

SceneSceneChannel.showDialog = function(title)
{
	$("#scene_channel_dialog_loading_text").text(title);
	if(!SceneSceneChannel.isShowDialogOn){
		$("#scene_channel_dialog_loading").show();
		SceneSceneChannel.isShowDialogOn = true;
	}
};

SceneSceneChannel.showPlayer = function()
{
	$("#scene_channel_dialog_loading").hide();
	$("scene_channel_panel").hide();
	SceneSceneChannel.isShowDialogOn = false;
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
	xmlHttp.onreadystatechange = function()
	{
		if (xmlHttp.readyState === 4)
		{
			if (xmlHttp.status === 200)
			{
				try
				{
					var response = $.parseJSON(xmlHttp.responseText);
					$("#stream_info_title").text(response.stream.channel.status);
					$("#stream_info_game").text(response.stream.game);
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
	xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');
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
	//SceneSceneChannel.showDialog("");
	if (SceneSceneChannel.state == SceneSceneChannel.STATE_LOADING_TOKEN)
	{
		SceneSceneChannel.tokenResponse = $.parseJSON(responseText);
		SceneSceneChannel.state = SceneSceneChannel.STATE_LOADING_PLAYLIST;
		SceneSceneChannel.loadData();
	}
	else if (SceneSceneChannel.state == SceneSceneChannel.STATE_LOADING_PLAYLIST)
	{
		SceneSceneChannel.playlistResponse = responseText;
		SceneSceneChannel.qualities = extractQualities(SceneSceneChannel.playlistResponse);
		SceneSceneChannel.state = SceneSceneChannel.STATE_PLAYING;
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
			theUrl = 'http://usher.twitch.tv/api/channel/hls/' + SceneSceneBrowser.selectedChannel + '.m3u8?player=twitchweb&&type=any&sig=' + SceneSceneChannel.tokenResponse.sig + '&token=' + escape(SceneSceneChannel.tokenResponse.token) + '&allow_source=true&allow_audi_only=true&p=' + random_int;
		}
		console.log(theUrl);
		xmlHttp.ontimeout = function()
		{
		};
	    xmlHttp.onreadystatechange = function()
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
						console.log("loadDataSuccess() exception: " + err.name + ' ' + err.message);
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
		xmlHttp.setRequestHeader('Client-ID', 'anwtqukxvrtwxb4flazs2lqlabe3hqv');
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
