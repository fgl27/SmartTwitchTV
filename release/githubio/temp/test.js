/* jshint eqeqeq: true, undef: true, unused: true, node: true, browser: true */
var PlayVod_jumpTimers = [0, 15, 30, 60, 120, 300, 600, 900, 1800];
var general_counter = 0;
var jump_counter = 0;
test();

function test() {
    //window.setInterval(dodo, 1000);
}

function dodo() {
    if (!(general_counter++ % 6)) jump_counter++;
    console.log(jump_counter);
}
