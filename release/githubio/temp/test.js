

//temp var
var duration_seconds = 1250;
var current_time_seconds = 125;
var id;
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded");


  var elem = document.getElementById("inner_progress_bar");
  var width = parseInt((current_time_seconds / duration_seconds) * 100);
  elem.style.width = width + '%';
  id = window.setInterval(Play_ProgresBarrUpdate, 1000);
});

function Play_ProgresBarrUpdate() {
    console.log("Play_ProgresBarrUpdate");
  document.getElementById('progress_bar').classList.add('progress_bar_holder_focus');
  var elem = document.getElementById("inner_progress_bar");
   current_time_seconds += 125;

  var width = parseInt((current_time_seconds / duration_seconds) * 100);

    console.log("width " + width);

    if (width >= 120) {
      elem.style.width = width + '%';
      clearInterval(id);
    } else {
      elem.style.width = width + '%';
    }


}
