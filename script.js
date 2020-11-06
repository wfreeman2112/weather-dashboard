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




$(document).ready(function() {

    
    //AJAX call for weather info
    
    $('#weather-form').submit(function(e) {
        e.preventDefault()
        var city = $('#weather-input').val();
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid=6d33391dce0cc9321d1501a34aba3f3d&units=imperial',
            type: "GET",
            dataType: "json",
            success: firstWeatherSuccess
               

         // error: function (error) {
         // console.log(`Error ${error}`);
         // };
     
     
           
    
        });
    
    
    });

//make 5 day call
});

function firstWeatherSuccess(data){

        console.log(data);

        //getting UV AJAX call
     
     
    
         var lat = data.coord.lat;
         var lon = data.coord.lon;
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/uvi?&lat=' + lat + '&lon=' + lon + '&appid=6d33391dce0cc9321d1501a34aba3f3d',
             type: 'GET',
             dataType: "json",
            success: function (data) {
            console.log(data);
            console.log(data.value);
             }
         });

     
    
        //  displaying info 

        $('#weather-info').html('');
        //$("#weather-info").append('<p>' + city + '</p>');
        $("#weather-info").append('<p>' + moment.unix(data.dt).format('MMMM DD, YYYY') + '</p>');
        $("#weather-info").append('<p>' + data.main.temp + " degrees F" + '</p>');
        $("#weather-info").append('<p>' + data.main.humidity + "% humidity" + '</p>');
        $("#weather-info").append('<p>' + data.wind.speed + '</p>');
        //$("#weather-info").append('<p>'  + data.value + '</p>');
        $("#weather-info").append('<img src = "http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png">');
   
    
}