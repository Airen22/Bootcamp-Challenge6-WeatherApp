var key = "2e72e53f481f6b9de8ec80bdf19fe4dd" 
var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
var weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast';
var storedSearchTerm = localStorage.getItem("Search Term");


$(".search-btn").on("click", function (event){
    var searchTerm = $(this).prev().val();
    localStorage.setItem("Search Term", searchTerm);
    fetch(geoUrl + "?q=" + storedSearchTerm + ",US&limit=5&appid=" + key)
    .then(function (response) {
        return response.json();
    }) 
    .then (function(data) {
        console.log(data);
        saveLatLong(data);
    });
  })

  function saveLatLong (data) {
    var searchLat = data.lat;
   console.log(searchLat)
  }


  var states = [
    'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
    ]

    var stateList = $('.dropdown-menu')
    $.each(states, function(i) {
        $('<li>')
        .addClass('dropdown-item')
        .text(states[i])
        .appendTo(stateList);
    })
