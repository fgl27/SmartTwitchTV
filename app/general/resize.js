// Adapted from:
// https://developer.tizen.org/community/tip-tech/using-css3-units-support-low-and-high-density-screens

// BodyfontSize is used for px to em calculation used by scroll functions
var BodyfontSize;

function calculateFontSize() {
    // Initial sizes.
    var initialFontSize = 29 + Settings_value.global_font_offset.values[Main_getItemInt('global_font_offset', Settings_value.global_font_offset.defaultValue) - 1],
        initialWidth = 1920,
        initialHeight = 1080,

        currentHeight,
        scaleFactor,
        scaledWidth,

        //Classes that need width/height recalculated to 16 by 9
        classes = ['screen_holder', 'screen_size', 'screen_holder_games', 'dialogs'];

    // Get current client/screen height.
    currentHeight = window.innerHeight;

    // Calculate scale factor and scaled font size.
    scaleFactor = currentHeight / initialHeight;
    BodyfontSize = initialFontSize * scaleFactor;

    // Calculate scaled body/divs size.
    scaledWidth = initialWidth * scaleFactor;

    //Set new body width/height recalculated to 16 by 9 and scaled fontSize 
    document.body.style.width = scaledWidth + 'px';
    document.body.style.height = currentHeight + 'px';
    document.body.style.fontSize = BodyfontSize + 'px';

    //Some div need manual resizing do it after body
    for (var i = 0; i < classes.length; i++)
        setWidthHeight(document.getElementsByClassName(classes[i]), scaledWidth, currentHeight);

    //Some only need width changes as Height is not base on screen size
    document.getElementById('topbar').style.width = scaledWidth + 'px';
    document.getElementById('settings_holder').style.width = scaledWidth + 'px';
}

function setWidthHeight(elementsArray, Width, Height) {

    for (var i = 0; i < elementsArray.length; i++) {
        elementsArray[i].style.width = Width + 'px';
        elementsArray[i].style.height = Height + 'px';
    }
}

//Do the calculation and changes on proper events call
window.addEventListener('resize', calculateFontSize, false);
window.addEventListener('load', calculateFontSize, false);
