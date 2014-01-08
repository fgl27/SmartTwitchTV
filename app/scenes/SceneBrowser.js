alert('SceneSceneBrowser.js loaded');

SceneSceneBrowser.selectedChannel;

SceneSceneBrowser.StreamsLimit = 100;
SceneSceneBrowser.ColoumnsCount = 4;

SceneSceneBrowser.streamsCount = 0;
SceneSceneBrowser.cursorX = 0;
SceneSceneBrowser.cursorY = 0;

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

function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

SceneSceneBrowser.loadData = function()
{
	var offset = SceneSceneBrowser.streamsCount;
	var responceText = httpGet('https://api.twitch.tv/kraken/streams?limit=' + SceneSceneBrowser.StreamsLimit + '&offset=' + offset);
	var response = JSON.parse(responceText);
	SceneSceneBrowser.streamsCount += SceneSceneBrowser.StreamsLimit;
	
	var cursor = 0;
		
	for (var i = 0; i < response.streams.length / SceneSceneBrowser.ColoumnsCount; i++)
	{        
		var row_id = offset / SceneSceneBrowser.ColoumnsCount + i;
		var row = $('<tr></tr>');
		
    	for (var t = 0; t < SceneSceneBrowser.ColoumnsCount; t++, cursor++)
    	{
    		var stream = response.streams[cursor];
    		
            var cell = $('<td id="cell_' + row_id + '_' + t + '" class="stream_cell" align="center" data-channelname="' + stream.channel.name + '"></td>').html(
				'<img id="thumbnail_' + row_id + '_' + t + '" class="stream_thumbnail" src="' + stream.preview.medium + '"/> \
				<div class="stream_title">' + stream.channel.status + '</div> \
				<div class="stream_info">' + stream.channel.display_name + ' (' + stream.viewers +')</div>');
            
            row.append(cell);
    	}

        $('#stream_table').append(row);
    }
};

SceneSceneBrowser.clean = function()
{
	$('#stream_table').empty();
	SceneSceneBrowser.streamsCount = 0;
	SceneSceneBrowser.cursorX = 0;
	SceneSceneBrowser.cursorY = 0;
};

SceneSceneBrowser.refresh = function()
{
	SceneSceneBrowser.clean();
	SceneSceneBrowser.loadData();
	SceneSceneBrowser.addFocus();
};


SceneSceneBrowser.removeFocus = function()
{
    $('#thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).removeClass('stream_thumbnail_focused');
};

SceneSceneBrowser.addFocus = function()
{
	if (SceneSceneBrowser.cursorY + 5 > SceneSceneBrowser.streamsCount / SceneSceneBrowser.ColoumnsCount)
	{
		SceneSceneBrowser.loadData();
	}
	
    $('#thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).addClass('stream_thumbnail_focused');
    
    ScrollHelper.scrollVerticalToElementById('thumbnail_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX, 0);
};

SceneSceneBrowser.getCellsCount = function()
{
	return Math.min(
			SceneSceneBrowser.ColoumnsCount,
			SceneSceneBrowser.streamsCount - SceneSceneBrowser.cursorY * SceneSceneBrowser.ColoumnsCount);	
};

SceneSceneBrowser.getRowsCount = function()
{
	var count = SceneSceneBrowser.streamsCount / SceneSceneBrowser.ColoumnsCount;
	if (SceneSceneBrowser.streamsCount % SceneSceneBrowser.ColoumnsCount > 0)
	{
		count++;
	}
	
	return count;
};

function SceneSceneBrowser() {

};

SceneSceneBrowser.prototype.initialize = function () {
	alert("SceneSceneBrowser.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
};

SceneSceneBrowser.prototype.handleShow = function (data) {
	alert("SceneSceneBrowser.handleShow()");
	// this function will be called when the scene manager show this scene
};

SceneSceneBrowser.prototype.handleHide = function () {
	alert("SceneSceneBrowser.handleHide()");
	// this function will be called when the scene manager hide this scene
	SceneSceneBrowser.clean();
};

SceneSceneBrowser.prototype.handleFocus = function () {
	alert("SceneSceneBrowser.handleFocus()");
	// this function will be called when the scene manager focus this scene
	SceneSceneBrowser.refresh();
};

SceneSceneBrowser.prototype.handleBlur = function () {
	alert("SceneSceneBrowser.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneSceneBrowser.prototype.handleKeyDown = function (keyCode) {
	alert("SceneSceneBrowser.handleKeyDown(" + keyCode + ")");
	
	switch (keyCode) {
		case sf.key.LEFT:
			if (SceneSceneBrowser.cursorX > 0)
			{
				SceneSceneBrowser.removeFocus();
				SceneSceneBrowser.cursorX--;
				SceneSceneBrowser.addFocus();
			}
			break;
		case sf.key.RIGHT:
			if (SceneSceneBrowser.cursorX < SceneSceneBrowser.getCellsCount() - 1)
			{
				SceneSceneBrowser.removeFocus();
				SceneSceneBrowser.cursorX++;
				SceneSceneBrowser.addFocus();
			}
			break;
		case sf.key.UP:
			if (SceneSceneBrowser.cursorY > 0)
			{
				SceneSceneBrowser.removeFocus();
				SceneSceneBrowser.cursorY--;
				SceneSceneBrowser.addFocus();
			}
			break;
		case sf.key.DOWN:
			if (SceneSceneBrowser.cursorY < SceneSceneBrowser.getRowsCount())
			SceneSceneBrowser.removeFocus();
			SceneSceneBrowser.cursorY++;
			SceneSceneBrowser.addFocus();
			break;
		case sf.key.ENTER:
			SceneSceneBrowser.selectedChannel = $('#cell_' + SceneSceneBrowser.cursorY + '_' + SceneSceneBrowser.cursorX).attr('data-channelname');
	        $(window).scrollTop(0);
			sf.scene.show('SceneChannel');
			sf.scene.hide('SceneBrowser');
			sf.scene.focus('SceneChannel');
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
