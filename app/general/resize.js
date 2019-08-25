//https://developer.tizen.org/community/tip-tech/using-css3-units-support-low-and-high-density-screens
// Initial sizes.
var initialFontSize = 29,
    initialWidth = 1920,
    initialHeight = 1080,
    calculateFontSize;

calculateFontSize = function() {
    var currentHeight,
        scaleFactor,
        fontSize,
        scaledWidth,
        scaledHeight,
        container;

    // Get current client/screen height.
    currentHeight = window.innerHeight;

    // Calculate scale factor and scaled font size.
    scaleFactor = currentHeight / initialHeight;
    fontSize = initialFontSize * scaleFactor;

    // Calculate scaled container size.
    scaledHeight = currentHeight;
    scaledWidth = initialWidth * scaleFactor;

    // Set scaled container and font size.
    container = document.getElementById('body_container');
    container.style.width = scaledWidth + 'px';
    container.style.height = scaledHeight + 'px';
    document.body.style.fontSize = fontSize + 'px';
};

window.addEventListener('resize', calculateFontSize, false);
window.addEventListener('load', calculateFontSize, false);