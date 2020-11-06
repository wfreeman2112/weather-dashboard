/*make form inputs
    -input city 
take weather info from input field
    -city name
    -date
    -icon 
    -temp
    -humidity
    -windspeed 
    -uv
-click on UV index
    -turn color that represents severity
-future weather conditions button
    -5 day forecast
-click on city in search history
    -presented with past and future
-when opened presented with last search city
*/


var city 
var temp
var humidity
var wind 
var UV 
var date 
var icon 

$(document).ready(function() {

    
    //AJAX call for weather info
    
    $('#weather-form').submit(function(e) {
        e.preventDefault()
        city = $('#weather-input').val();
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid=6d33391dce0cc9321d1501a34aba3f3d&units=imperial',
            type: "GET",
            dataType: "json",
            success: firstWeatherSuccess
    
        });
   
    });


});

function firstWeatherSuccess(data){

        console.log(data);
        temp = data.main.temp;
        humidity = data.main.humidity;
        wind = data.wind.speed;
        date = data.dt;
        icon = data.weather[0].icon;
        //getting UV AJAX call
     
     
    
         var lat = data.coord.lat;
         var lon = data.coord.lon;
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/uvi?&lat=' + lat + '&lon=' + lon + '&appid=6d33391dce0cc9321d1501a34aba3f3d',
             type: 'GET',
             dataType: "json",
            success: secondWeatherSuccess 
         });

         
     //AJAX call 5 day forecast
         
        
    
       
    
}
function secondWeatherSuccess(data) {
    console.log(data);
    UV = data.value;

    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=6d33391dce0cc9321d1501a34aba3f3d',
        type: 'GET',
        dataType: "json",
        success: thirdWeatherSuccess


       });
    
}
function thirdWeatherSuccess(data) {
    console.log(data);
    var forecast = data.forecast;

     //  displaying info 

     $('#weather-info').html('');
     $("#weather-info").append('<p>' + city + '</p>');
     $("#weather-info").append('<p>' + moment.unix(date).format('MMMM DD, YYYY') + '</p>');
     $("#weather-info").append('<p>' + temp + " degrees F" + '</p>');
     $("#weather-info").append('<p>' + humidity + "% humidity" + '</p>');
     $("#weather-info").append('<p>' + wind + '</p>');
     $("#weather-info").append('<p>'  + UV + '</p>');
     $("#weather-info").append('<img src = "http://openweathermap.org/img/wn/' + icon + '@2x.png">');
     
for (let i = 0; i < 5; i++) {
  var Day = data.list[i];
  var Temp = Day.main.temp;
  var Humidity = Day.main.humidity;
  var Date = Day.dt; 
  var Icon = Day.weather.icon;
  $("#weather-info").append('<p>' + Temp + '</p>');  
}

}