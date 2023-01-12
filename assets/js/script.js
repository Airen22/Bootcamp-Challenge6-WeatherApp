var key = "2e72e53f481f6b9de8ec80bdf19fe4dd" 
var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
var weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast';
var storedSearchTerm = localStorage.getItem("Search Term");

// var searchBtn = $('.search-btn')
// searchBtn.on('click', setGeoQuery);

// function setGeoQuery (event) {
//     if (event)
// }

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