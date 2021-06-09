var audio;

$(document).ready(function(){

   

    $("#btnVolumen").on('click', function(){
        PlaySound("sound/night.mp3")
    })

    $("#btnMute").on("click", function(){
        audio.pause();
        audio.currentTime = 0;
    })

    $("#Search").on("change", function(){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://api.openweathermap.org/data/2.5/weather?q=" + $(this).val() + "&lang=en&appid=" + config.TOK + "&units=" + "metric",
            "method": "GET"
          }
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
    
    
    
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
