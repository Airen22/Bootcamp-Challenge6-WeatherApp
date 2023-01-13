var key = "2e72e53f481f6b9de8ec80bdf19fe4dd" 
var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
var weatherUrl = 'http://api.openweathermap.org/data/2.5/';
var storedSearchTerm = localStorage.getItem("Search Term");
var storedState = localStorage.getItem("State")
var temp = "";
var wind = "";
var humidity = "";
var city = "";
var long = "";
var lat = "";
var state = "";

// not running current search it's running what was previously in local storage

function requestForecast(){
    var searchTerm = $(".search-term").val();
    localStorage.setItem("Search Term", searchTerm);

    fetch(weatherUrl + "weather?q=" + storedSearchTerm + ",US&units=imperial&appid=" + key)
    .then((response) => 
        response.json())

    .then ((data) => {
        console.log(data);
        temp = data.main.temp;
        wind = data.wind.speed;
        humidity = data.main.humidity;
// displayFeature()
})
  }

    // function displayFeature() {
    //     $("#featured-city").text(name + ", " + storedState)
    //     $('#featured-temp').text("Temp: " + temp + "F")
    //     $('#featured-wind').text("Wind: " + wind + "mph")
    //     $('#featured-humidity').text("Humidity: " + humidity + "%")
    // }

  $(".search-btn").on("click", function (event){
    var searchTerm = $(".search-term").val();
    localStorage.setItem("Search Term", searchTerm);

    fetch(geoUrl + "?q=" + storedSearchTerm + ","+ storedState + ",US&appid=" + key)
    .then((response) => 
        response.json())

    .then ((data) => {
        console.log(data);
        long = data[0].lon;
        lat = data[0].lat;
        city = data[0].name;
        state = data[0].state;
    })
    requestForecast()

  })


var states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

    var stateList = $('.dropdown-menu')
    $.each(states, function(i) {
        $('<li>')
        .addClass('dropdown-item')
        .attr('id', states[i])
        .text(states[i])
        .appendTo(stateList);
    })

    $('.dropdown-item').on('click', function () {
        var selectedState = $(this).attr('id');
        $(".dropdown-toggle").text(selectedState)
        localStorage.setItem("State", selectedState)

    })

// eventually for search history?
    // var currentSearch = searchTerm + ", " + selectedState
    // console.log(currentSearch)