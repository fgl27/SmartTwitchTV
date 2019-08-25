//https://developer.tizen.org/community/tip-tech/using-css3-units-support-low-and-high-density-screens

var BodyfontSize;

function calculateFontSize() {
    // Initial sizes.
    var initialFontSize = 29,
        initialWidth = 1920,
        initialHeight = 1080,

        currentHeight,
        scaleFactor,
        scaledWidth,
        scaledHeight,
        container,
        elements,
        i,
        j,
        classes = ['screen_holder', 'screen_size', 'screen_holder_games'];

    // Get current client/screen height.
    currentHeight = window.innerHeight;

    // Calculate scale factor and scaled font size.
    scaleFactor = currentHeight / initialHeight;
    BodyfontSize = initialFontSize * scaleFactor;

    // Calculate scaled container size.
    scaledHeight = currentHeight;
    scaledWidth = initialWidth * scaleFactor;

    // Set scaled container and font size.
    container = document.getElementById('body_container');
    container.style.width = scaledWidth + 'px';
    container.style.height = scaledHeight + 'px';

    document.body.style.width = scaledWidth + 'px';
    document.body.style.height = scaledHeight + 'px';
    document.body.style.fontSize = BodyfontSize + 'px';

    for (j = 0; j < classes.length; j++) {
        elements = document.getElementsByClassName(classes[j]);

        for (i = 0; i < elements.length; i++) {
            elements[i].style.width = scaledWidth + 'px';
            elements[i].style.height = scaledHeight + 'px';
        }
    }

    document.getElementById('topbar').style.width = scaledWidth + 'px';

    elements = document.getElementsByClassName('dialogs');
    for (i = 0; i < elements.length; i++) {
        elements[i].style.width = scaledWidth + 'px';
        elements[i].style.height = scaledHeight + 'px';
    }

}

window.addEventListener('resize', calculateFontSize, false);
window.addEventListener('load', calculateFontSize, false);