/* jshint eqeqeq: true, undef: true, unused: true, node: true, browser: true */

//console.log(Settings_GenerateClock());

function Settings_GenerateClock() {
    var clock = [], time = 43200;
    Play_offsettimeMinus = 0;

    for (var i = 0; i < 48; i++) {
        clock.push("-" + Play_timeS(time));
        time -= 900;
    }

    clock.push(Play_timeS(0));
    time = 900;

    for (var i = 0; i < 48; i++) {
        clock.push(Play_timeS(time));
        time += 900;
    }

    return clock;
}

function Play_timeS(time) {
    var seconds, minutes, hours;
    time += Play_offsettimeMinus / 1000;

    seconds = Play_lessthanten(parseInt(time) % 60);

    time = Math.floor(time / 60);
    minutes = Play_lessthanten(time % 60);

    time = Math.floor(time / 60);
    hours = Play_lessthanten(time);

    //final time 00:00 or 00:00:00
    return (!time) ? (minutes + ":" + seconds) : (hours + ":" + minutes + ":" + seconds);
}

function Play_lessthanten(time) {
    return (time < 10) ? "0" + time : time;
}
dates();
function dates() {
    var d = new Date();
    var n = new Date().getTime() - 38700000;
    console.log(d);
    console.log(new Date(n));
}



