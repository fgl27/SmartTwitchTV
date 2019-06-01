//Variable initialization
var Vod_AnimateThumbId;
var Vod_newImg = new Image();
//Variable initialization end

function Vod_createCell(row_id, id, vod_data, valuesArray, idArray) {
    if (row_id < Main_ColoumnsCountVideo) Main_CacheImage(valuesArray[0]); //try to pre cache first 3 rows
    return Vod_createCellVideo(vod_data, id, valuesArray, idArray);
}

function Vod_createCellVideo(vod_data, id, valuesArray, idArray) {
    Main_td = document.createElement('td');
    Main_td.setAttribute('id', idArray[8] + id);
    Main_td.setAttribute(Main_DataAttribute, JSON.stringify(vod_data));
    Main_td.className = 'stream_cell';
    Main_td.innerHTML = Vod_VideoHtml(id, valuesArray, idArray);

    return Main_td;
}

function Vod_replaceVideo(id, vod_data, valuesArray, idArray) {
    var ele = document.getElementById(id);
    var splitedId = id.split(idArray[9])[1];
    ele.setAttribute(Main_DataAttribute, JSON.stringify(vod_data));
    ele.innerHTML = Vod_VideoHtml(splitedId, valuesArray, idArray);
    ele.setAttribute('id', idArray[8] + splitedId);
}

function Vod_VideoHtml(id, valuesArray, idArray) {

    return '<div id="' + idArray[0] + id + '" class="stream_thumbnail_clip"' +
        (valuesArray[7] ? ' style="background-size: 0 0; background-image: url(' + valuesArray[7] + ');"' : '') +
        '><div><img id="' +
        idArray[1] + id + '" alt="" class="stream_img" src="' + valuesArray[0] +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_VIDEO + '\'"></div><div id="' +
        idArray[2] + id + '" class="stream_text2"><div style="line-height: 14px;"><div id="' +
        idArray[3] + id + '" class="stream_channel" style="width: 72%; display: inline-block; font-size: 85%;">' +
        valuesArray[1] + '</div><div id="' + idArray[7] + id +
        '"class="stream_info" style="width:27%; float: right; text-align: right; display: inline-block;">' + valuesArray[5] +
        '</div></div><div id="' + idArray[11] + id + '"class="stream_info">' +
        valuesArray[3] + '</div><div id="' + idArray[6] + id +
        '"class="stream_info">' + valuesArray[4] + '</div><div style="line-height: 12px;"><div id="' + idArray[4] + id + '"class="stream_info" style="width: 59%; display: inline-block;">' +
        valuesArray[2] + '</div><div id="' + idArray[5] + id +
        '"class="stream_info" style="width: 39%; display: inline-block; float: right; text-align: right;">' +
        valuesArray[6] + '</div></div></div></div>';
}

function Vod_AnimateThumb(idArray, id) {
    window.clearInterval(Vod_AnimateThumbId);
    if (!Vod_DoAnimateThumb) return;
    var div = document.getElementById(idArray[0] + id);

    // Only load the animation if it can be loaded
    // This prevent starting animating before it has loaded or animated a empty image
    Vod_newImg.onload = function() {
        this.onload = null;
        Main_HideElement(idArray[1] + id);
        // background-size: 612px from  div.offsetWidth
        div.style.backgroundSize = "612px";
        var frame = 0;
        Vod_AnimateThumbId = window.setInterval(function() {
            // 10 = quantity of frames in the preview img, 344 img height from the div.offsetHeight
            // But this img real height is 180 thus the quality is affected, higher resolution aren't available
            div.style.backgroundPosition = "0px " + ((++frame % 10) * (-344)) + "px";
        }, 650);
    };

    Vod_newImg.src = div.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
}