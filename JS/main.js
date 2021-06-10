var audio = new Audio();
var metric = "C";
let Time = new Date();
let _dayArray = [
    {weather : { icon: "icons/sun.png", code : 800,  sound: "sound/day.mp3"}},
    {weather : { icon: "icons/partly-cloudy.png", code : 801, sound: "sound/day.mp3"}},
    {weather : { icon: "icons/cloud.png", code : 802, sound: "sound/day.mp3"}},
    {weather : { icon: "icons/cloud.png", code : 803, sound: "sound/day.mp3"}},
]
let _nightArray = [
     {weather : { icon: "icons/moon.png", code : 800, sound: "sound/night.mp3"}},
     {weather : { icon: "icons/partly-cloudy-moon.png", code : 801,  sound: "sound/night.mp3"}},
     {weather : { icon: "icons/cloud.png", code : 802,  sound: "sound/night.mp3"}},
     {weather : { icon: "icons/cloud.png", code : 802,  sound: "sound/night.mp3"}},
]

//VARIABLES  THAT INTERACT WITH THE HTML
var CurrentIcon = "";
var CurrentWeather = "";
var City = "";
var Degrees = "";


$(document).ready(function(){

    $("#btnVolumen").on('click', function(){
        PlaySound("sound/night.mp3")
    })

    $("#btnMute").on("click", function(){
        audio.pause();
        audio.currentTime = 0;
    })

    $("#Search").on("change", function(){

        $("#start").attr("hidden", "hidden")
        $("#loading").removeAttr("hidden");
        

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://api.openweathermap.org/data/2.5/weather?q=" + $(this).val() + "&lang=en&appid=" + config.TOK + "&units=" + "metric",
            "method": "GET"
          }
          $.ajax(settings).done(function (response) {
            let IsDayTime = WhatTimeIsIt() > 6 && WhatTimeIsIt < 19 ? true : false;
            let weatherArr = IsDayTime ? _dayArray : _nightArray;
            var icon = "";
            var sound = "";
            for(var i = 0; i < weatherArr.length; i++){
                if(weatherArr[i].weather.code === response.weather[0].id){
                    CurrentIcon = weatherArr[i].weather.icon;
                    sound = weatherArr[i].weather.sound;
                }
            }
            Degrees = Math.round(response.main.temp) + " °" + metric;
            CurrentWeather = response.weather[0].description;
            City =  response.name;

            $("#CityName").html(City);
            $("#CurrentDegrees").html(Degrees);
            $("#currentWeather").html(CurrentWeather)
            $(".iconcurrent").attr("src", CurrentIcon)
            audio.pause();
            audio.currentTime = 0;
            PlaySound(sound);




            $("#loading").attr("hidden", "hidden");
            $("#current").removeAttr("hidden");
            $("#greenBand").removeAttr("hidden");
          });

    })
    
})

function PlaySound(sound){
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio(sound);
    audio.autoplay = true;
    audio.play();
}

function StopSound(){
    audio.stop();
}

function WhatTimeIsIt(){
    return Time.getHours();
}
