alert('SceneSceneBrowser.js loaded');

SceneSceneBrowser.selectedChannel;

SceneSceneBrowser.ItemsLimit = 100;
SceneSceneBrowser.ColoumnsCount = 4;

SceneSceneBrowser.MODE_NONE = -1;
SceneSceneBrowser.MODE_ALL = 0;
SceneSceneBrowser.MODE_GAMES = 1;
SceneSceneBrowser.MODE_GAMES_STREAMS = 2;
SceneSceneBrowser.MODE_GO = 3;

SceneSceneBrowser.mode = SceneSceneBrowser.MODE_NONE;
SceneSceneBrowser.gameSelected = null;
SceneSceneBrowser.itemsCount = 0;
SceneSceneBrowser.cursorX = 0;
SceneSceneBrowser.cursorY = 0;

SceneSceneBrowser.ime = null;

SceneSceneBrowser.loadingData = false;
SceneSceneBrowser.loadingDataTryMax = 15;
SceneSceneBrowser.loadingDataTry;
SceneSceneBrowser.loadingDataTimeout;
SceneSceneBrowser.dataEnded = false;

var ScrollHelper =
{
    documentVerticalScrollPosition: function()
    {
        if (self.pageYOffset) return self.pageYOffset; // Firefox, Chrome, Opera, Safari.
        if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop; // Internet Explorer 6 (standards mode).
        if (document.body.scrollTop) return document.body.scrollTop; // Internet Explorer 6, 7 and 8.
        return 0; // None of the above.
    },

    viewportHeight: function()
    { return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight; },

    documentHeight: function()
    { return (document.height !== undefined) ? document.height : document.body.offsetHeight; },

    documentMaximumScrollPosition: function()
    { return this.documentHeight() - this.viewportHeight(); },

    elementVerticalClientPositionById: function(id)
    {
        var element = document.getElementById(id);
        var rectangle = element.getBoundingClientRect();
        return rectangle.top;
    },

    /**
     * For public use.
     *
     * @param id The id of the element to scroll to.
     * @param padding Top padding to apply above element.
     */
    scrollVerticalToElementById: function(id, padding)
    {
        var element = document.getElementById(id);
        if (element == null)
        {
            console.warn('Cannot find element with id \''+id+'\'.');
            return;
        }

        var targetPosition = this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - 0.25 * this.viewportHeight() - padding;
        
        $(window).scrollTop(targetPosition);
    }
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

function sleep(millis, callback) {
    setTimeout(function()
            { callback(); }
    , millis);
}

SceneSceneBrowser.createCell = function(row_id, coloumn_id, data_name, thumbnail, title, info, info2, info_fill)
{
	var infostyle;
	
	if (info_fill)
	{
		infostyle = 'style="right: 0;"';
	}
	else
	{
		infostyle = 'style="right: 20%;"';
	}
	
	return $('<td id="cell_' + row_id + '_' + coloumn_id + '" class="stream_cell" data-channelname="' + data_name + '"></td>').html(
			'<img id="thumbnail_' + row_id + '_' + coloumn_id + '" class="stream_thumbnail" src="' + thumbnail + '"/> \
			<div class="stream_text" ' + infostyle + '> \
			<div class="stream_title">' + title + '</div> \
			<div class="stream_info">' + info + '</div> \
            <div class="stream_info">' + info2 + '</div> \
            </div>');
};

SceneSceneBrowser.createCellEmpty = function()
{
	return $('<td class="stream_cell"></td>').html('');
};

SceneSceneBrowser.loadDataError = function(reason)
{
	SceneSceneBrowser.loadingDataTry++;
	if (SceneSceneBrowser.loadingDataTry < SceneSceneBrowser.loadingDataTryMax)
	{
		if (SceneSceneBrowser.loadingDataTry < 10)
		{
			SceneSceneBrowser.loadingDataTimeout += 100;
		}
		else
		{
			switch (SceneSceneBrowser.loadingDataTry)
			{
			case 10:
				SceneSceneBrowser.loadingDataTimeout = 5000;
				break;
			case 11:
				SceneSceneBrowser.loadingDataTimeout = 10000;
				break;
			case 12:
				SceneSceneBrowser.loadingDataTimeout = 30000;
				break;
			case 13:
				SceneSceneBrowser.loadingDataTimeout = 60000;
				break;
			default:
				SceneSceneBrowser.loadingDataTimeout = 300000;
				break;
			}
		}
		SceneSceneBrowser.loadDataRequest();
	}
	else
	{
		reason = (typeof reason === 'undefined') ? 'Unknown' : reason;
		SceneSceneBrowser.loadingData = false;
		SceneSceneBrowser.showDialog("Unable to load stream data. Reason: " + reason);
	}
};

SceneSceneBrowser.loadDataSuccess = function(responseText)
{
	var response = $.parseJSON(responseText);
	
	var response_items;
	if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES)
	{
		response_items = response.top.length;
	}
	else
	{
		response_items = response.streams.length;
	}
	
	if (response_items < SceneSceneBrowser.ItemsLimit)
	{
		SceneSceneBrowser.dataEnded = true;
	}
	
	var offset = SceneSceneBrowser.itemsCount;
	SceneSceneBrowser.itemsCount += response_items;
	
	var response_rows = response_items / SceneSceneBrowser.ColoumnsCount;
	if (response_items % SceneSceneBrowser.ColoumnsCount > 0)
	{
		response_rows++;
	}
	
	var cursor = 0;

	var t;
	for (var i = 0; i < response_rows; i++)
	{        
		var row_id = offset / SceneSceneBrowser.ColoumnsCount + i;
		var row = $('<tr></tr>');
		
    	for (t = 0; t < SceneSceneBrowser.ColoumnsCount && cursor < response_items; t++, cursor++)
    	{
    		var cell;
    		
    		if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GAMES)
    		{
    			var game = response.top[cursor];
    			
    			cell = SceneSceneBrowser.createCell(row_id, t, game.game.name, game.game.box.large, game.game.name, addCommas(game.viewers) + ' Viewers' , '', true);
    		}
    		else
    		{
        		var stream = response.streams[cursor];
        		
        		cell = SceneSceneBrowser.createCell(row_id, t, stream.channel.name, stream.preview.medium, stream.channel.status, stream.channel.display_name, addCommas(stream.viewers) + ' Viewers', false);
    		}
            
            row.append(cell);
    	}
    	
    	for (; t < SceneSceneBrowser.ColoumnsCount; t++)
    	{
            row.append(SceneSceneBrowser.createCellEmpty());
    	}

        $('#stream_table').append(row);
    }
	
	sleep(2000, function() {
		SceneSceneBrowser.showTable();
		SceneSceneBrowser.addFocus();
		SceneSceneBrowser.loadingData = false;
	});
};

SceneSceneBrowser.loadDataRequest = function()
{
	try
	{
		var dialog_title = "";
		if (SceneSceneBrowser.loadingDataTry > 0)
		{
			dialog_title = STR_RETRYING + " (" + (SceneSceneBrowser.loadingDataTry + 1) + "/" + SceneSceneBrowser.loadingDataTryMax + ")";
		}
		SceneSceneBrowser.showDialog(dialog_title);
		
		var xmlHttp = new XMLHttpRequest();
		var theUrl;
	    
		var offset = SceneSceneBrowser.itemsCount;
		if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES)
		{
			theUrl = 'https://api.twitch.tv/kraken/games/top?limit=' + SceneSceneBrowser.ItemsLimit + '&offset=' + offset;
		}
		else if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES_STREAMS)
		{
			theUrl = 'https://api.twitch.tv/kraken/streams?game=' + encodeURIComponent(SceneSceneBrowser.gameSelected) + '&limit=' + SceneSceneBrowser.ItemsLimit + '&offset=' + offset;
		}
		else
		{
			theUrl = 'https://api.twitch.tv/kraken/streams?limit=' + SceneSceneBrowser.ItemsLimit + '&offset=' + offset;
		}
		
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
						SceneSceneBrowser.loadDataSuccess(xmlHttp.responseText);
					}
					catch (err)
					{
						SceneSceneBrowser.showDialog("loadDataSuccess() exception: " + err.name + ' ' + err.message);
					}
					
				}
				else
				{
					SceneSceneBrowser.loadDataError('HTTP Status ' + xmlHttp.status);
				}
			}
		};
	    xmlHttp.open("GET", theUrl, true);
		xmlHttp.timeout = SceneSceneBrowser.loadingDataTimeout;
	    xmlHttp.send(null);
	}
	catch (error)
	{
		SceneSceneBrowser.loadDataError(error.message);
	}
};

SceneSceneBrowser.loadData = function()
{
	// Even though loading data after end is safe it is pointless and causes lag
	if ((SceneSceneBrowser.itemsCount % SceneSceneBrowser.ColoumnsCount != 0) || SceneSceneBrowser.loadingData)
	{
		return;
	}
	
	SceneSceneBrowser.loadingData = true;
	SceneSceneBrowser.loadingDataTry = 0;
	SceneSceneBrowser.loadingDataTimeout = 500;
	
	SceneSceneBrowser.loadDataRequest();
};

SceneSceneBrowser.showDialog = function(title)
{
	$("#streamname_frame").hide();
	$("#stream_table").hide();
	$("#dialog_loading_text").text(title);
	$("#dialog_loading").show();
};

SceneSceneBrowser.showTable = function()
{
	$("#dialog_loading").hide();
	$("#streamname_frame").hide();
	$("#stream_table").show();
    
    ScrollHelper.scrollVerticalToElementById('thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX, 0);
};

SceneSceneBrowser.showInput = function()
{
	$("#dialog_loading").hide();
	$("#stream_table").hide();
	$("#streamname_frame").show();
};

SceneSceneBrowser.switchMode = function(mode)
{
	if (mode != SceneSceneBrowser.mode)
	{
		SceneSceneBrowser.mode = mode;

		$("#tip_icon_channels").removeClass('tip_icon_active');
		$("#tip_icon_games").removeClass('tip_icon_active');
		$("#tip_icon_open").removeClass('tip_icon_active');
		$("#tip_icon_refresh").removeClass('tip_icon_active');
		
		if (mode == SceneSceneBrowser.MODE_ALL)
		{
			$("#tip_icon_channels").addClass('tip_icon_active');
			SceneSceneBrowser.refresh();
		}
		else if (mode == SceneSceneBrowser.MODE_GAMES)
		{
			$("#tip_icon_games").addClass('tip_icon_active');
			SceneSceneBrowser.refresh();	
		}
		else if (mode == SceneSceneBrowser.MODE_GAMES_STREAMS)
		{
			$("#tip_icon_games").addClass('tip_icon_active');
			SceneSceneBrowser.refresh();
		}
		else if (mode == SceneSceneBrowser.MODE_GO)
		{
			$("#tip_icon_open").addClass('tip_icon_active');
			SceneSceneBrowser.clean();
			SceneSceneBrowser.showInput();
			SceneSceneBrowser.refreshInputFocus();
		}
	}
};

SceneSceneBrowser.clean = function()
{
	$('#stream_table').empty();
	SceneSceneBrowser.itemsCount = 0;
	SceneSceneBrowser.cursorX = 0;
	SceneSceneBrowser.cursorY = 0;
	SceneSceneBrowser.dataEnded = false;
};

SceneSceneBrowser.refresh = function()
{
	if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO)
	{
		SceneSceneBrowser.clean();
		
		SceneSceneBrowser.loadData();
	}
};


SceneSceneBrowser.removeFocus = function()
{
    $('#thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).removeClass('stream_thumbnail_focused');
};

SceneSceneBrowser.addFocus = function()
{
	if (SceneSceneBrowser.cursorY + 5 > SceneSceneBrowser.itemsCount / SceneSceneBrowser.ColoumnsCount
			&& !SceneSceneBrowser.dataEnded)
	{
		SceneSceneBrowser.loadData();
	}
	
    $('#thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).addClass('stream_thumbnail_focused');
    
    ScrollHelper.scrollVerticalToElementById('thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX, 0);
};

SceneSceneBrowser.getCellsCount = function(posY)
{
	return Math.min(
			SceneSceneBrowser.ColoumnsCount,
			SceneSceneBrowser.itemsCount - posY * SceneSceneBrowser.ColoumnsCount);	
};

SceneSceneBrowser.getRowsCount = function()
{
	var count = SceneSceneBrowser.itemsCount / SceneSceneBrowser.ColoumnsCount;
	if (SceneSceneBrowser.itemsCount % SceneSceneBrowser.ColoumnsCount > 0)
	{
		count++;
	}
	
	return count;
};

SceneSceneBrowser.refreshInputFocus = function()
{
    $('#streamname_input').removeClass('channelname');
    $('#streamname_input').removeClass('channelname_focused');
    $('#streamname_button').removeClass('button_go');
    $('#streamname_button').removeClass('button_go_focused');
    
	if (SceneSceneBrowser.cursorY == 0)
	{
	    $('#streamname_input').addClass('channelname_focused');
	    $('#streamname_button').addClass('button_go');
	}
	else
	{
	    $('#streamname_input').addClass('channelname');
	    $('#streamname_button').addClass('button_go_focused');
	}
};

SceneSceneBrowser.openStream = function()
{
	$(window).scrollTop(0);
	sf.scene.show('SceneChannel');
	sf.scene.hide('SceneBrowser');
	sf.scene.focus('SceneChannel');
};

function SceneSceneBrowser()
{

};

SceneSceneBrowser.initLanguage = function ()
{
	//set correct labels
	$('.label_channels').html(STR_CHANNELS);
	$('.label_games').html(STR_GAMES);
	$('.label_open').html(STR_OPEN);
	$('.label_refresh').html(STR_REFRESH);
	$('.label_placeholder_open').attr("placeholder", STR_PLACEHOLDER_OPEN);
};


SceneSceneBrowser.prototype.initialize = function ()
{
	alert("SceneSceneBrowser.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	
	SceneSceneBrowser.initLanguage();
	
	SceneSceneBrowser.loadingData = false;
	
	SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_ALL);
};


SceneSceneBrowser.prototype.handleShow = function (data)
{
	alert("SceneSceneBrowser.handleShow()");
	// this function will be called when the scene manager show this scene
};

SceneSceneBrowser.prototype.handleHide = function ()
{
	alert("SceneSceneBrowser.handleHide()");
	// this function will be called when the scene manager hide this scene
	SceneSceneBrowser.clean();
};

SceneSceneBrowser.prototype.handleFocus = function ()
{
	alert("SceneSceneBrowser.handleFocus()");
	// this function will be called when the scene manager focus this scene
	SceneSceneBrowser.refresh();
};

SceneSceneBrowser.prototype.handleBlur = function ()
{
	alert("SceneSceneBrowser.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneSceneBrowser.prototype.handleKeyDown = function (keyCode)
{
	alert("SceneSceneBrowser.handleKeyDown(" + keyCode + ")");
	
	if (keyCode == sf.key.RETURN)
	{
		if (SceneSceneBrowser.mode === SceneSceneBrowser.MODE_GAMES_STREAMS && !SceneSceneBrowser.loadingData)
		{
			sf.key.preventDefault();
			SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_GAMES);
			return;
		}
	}
	
	if (SceneSceneBrowser.loadingData)
	{
		return;
	}

	switch (keyCode)
	{
		case sf.key.LEFT:
			if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO)
			{
				if (SceneSceneBrowser.cursorX > 0)
				{
					SceneSceneBrowser.removeFocus();
					SceneSceneBrowser.cursorX--;
					SceneSceneBrowser.addFocus();
				}
			}
			break;
		case sf.key.RIGHT:
			if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO)
			{
				if (SceneSceneBrowser.cursorX < SceneSceneBrowser.getCellsCount(SceneSceneBrowser.cursorY) - 1)
				{
					SceneSceneBrowser.removeFocus();
					SceneSceneBrowser.cursorX++;
					SceneSceneBrowser.addFocus();
				}
			}
			break;
		case sf.key.UP:
			if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO)
			{
				if (SceneSceneBrowser.cursorY > 0)
				{
					SceneSceneBrowser.removeFocus();
					SceneSceneBrowser.cursorY--;
					SceneSceneBrowser.addFocus();
				}
			}
			else
			{
				SceneSceneBrowser.cursorY = 0;
				SceneSceneBrowser.refreshInputFocus();
			}
			break;
		case sf.key.DOWN:
			if (SceneSceneBrowser.mode != SceneSceneBrowser.MODE_GO)
			{
				if (SceneSceneBrowser.cursorY < SceneSceneBrowser.getRowsCount() - 1
						&& SceneSceneBrowser.cursorX < SceneSceneBrowser.getCellsCount(SceneSceneBrowser.cursorY + 1))
				{
					SceneSceneBrowser.removeFocus();
					SceneSceneBrowser.cursorY++;
					SceneSceneBrowser.addFocus();
				}
			}
			else
			{
				SceneSceneBrowser.cursorY = 1;
				SceneSceneBrowser.refreshInputFocus();
			}
			break;
		case sf.key.ENTER:
			if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GO)
			{
				if (SceneSceneBrowser.cursorY == 0)
				{
					SceneSceneBrowser.ime = new IMEShell_Common();
					SceneSceneBrowser.ime.inputboxID = 'streamname_input';
				    SceneSceneBrowser.ime.inputTitle = 'Channel name';
				    SceneSceneBrowser.ime.setOnCompleteFunc = onCompleteText;
					SceneSceneBrowser.ime.onShow();
				}
				else
				{
					SceneSceneBrowser.selectedChannel = $('#streamname_input').val();
					SceneSceneBrowser.openStream();
				}
			}
			else if (SceneSceneBrowser.mode == SceneSceneBrowser.MODE_GAMES)
			{	
				SceneSceneBrowser.gameSelected = $('#cell_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).attr('data-channelname');
				SceneSceneBrowser.mode = SceneSceneBrowser.MODE_GAMES_STREAMS;
				SceneSceneBrowser.refresh();
			}
			else
			{
				SceneSceneBrowser.selectedChannel = $('#cell_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).attr('data-channelname');
				SceneSceneBrowser.openStream();
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
			SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_ALL);
			break;
		case sf.key.GREEN:
			SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_GAMES);
			break;
		case sf.key.YELLOW:
			SceneSceneBrowser.switchMode(SceneSceneBrowser.MODE_GO);
			break;
		case sf.key.BLUE:
			SceneSceneBrowser.refresh();
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};

function onCompleteText(string)
{

}
