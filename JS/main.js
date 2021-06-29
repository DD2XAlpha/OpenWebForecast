var audio = new Audio();
var metric = "C";
var metricSpeed = "m/s";
let Time = new Date();
var Units = "metric";


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

    $("#btnCentigrados").on("click", function(){
        if(metric != "C"){
            metric = "C";
            metricSpeed = "m/s";
            Units = "metric";
        $("#Search").trigger("change");
        }
        
    })

    $("#btnFarenheit").on("click", function(){
        if(metric != "F"){
            metric = "F";
            Units = "imperial"
            metricSpeed = "mph"
            $("#Search").trigger("change");
        }
       
    })

    $("#Search").on("change", function(){
        $("#start").attr("hidden", "hidden")
        $("#loading").removeAttr("hidden");
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.openweathermap.org/data/2.5/weather?q=" + $(this).val() + "&lang=en&appid=" + config.TOK + "&units=" + Units,
            "method": "GET"
          }
          $.ajax(settings).done(function (response) {
            let IsDayTime = WhatTimeIsIt() > 6 && WhatTimeIsIt() < 19 ? true : false;
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
            $("#windSpeed").html("Wind: " + response.wind.speed + " " + metricSpeed);
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
    let time =  Time.getHours();
    return time;
}
