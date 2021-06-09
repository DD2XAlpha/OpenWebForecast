var audio;

$(document).ready(function(){

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://api.openweathermap.org/data/2.5/weather?id=524901&lang=fr&appid=" + config.TOK,
        "method": "GET"
      }
      $.ajax(settings).done(function (response) {
        console.log(response);
      });




    $("#btnVolumen").on('click', function(){
        PlaySound("sound/night.mp3")
    })

    $("#btnMute").on("click", function(){
        audio.pause();
        audio.currentTime = 0;
    })

    
})

function PlaySound(sound){
    audio = new Audio(sound);
    audio.autoplay = true;
    audio.play();
}

function StopSound(){
    audio.stop();
}
