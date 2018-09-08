
var defaultColors = ["#ff0000", "#ff4000", "#ff8000", "#ffbf00", "#ffff00", "#bfff00", "#80ff00", "#40ff00", "#00ff00", "#00ff40", "#00ff80", "#00ffbf", "#00ffff", "#00bfff", "#0080ff", "#0040ff", "#4000ff", "#8000ff", "#bf00ff", "#ff00ff", "#ff00bf", "#ff0080", "#ff0040", "#ff0000"];
var defaultColorsLength = defaultColors.length;

function Dolog(letter) {
    console.log(letter);
    console.log((letter).charCodeAt(0) % defaultColorsLength);
    console.log(defaultColors[(letter).charCodeAt(0) % defaultColorsLength]);
}

function test() {
    for (var i = 0; i < 26; i++) {
        Dolog((i+10).toString(36));
    }
}

test();
