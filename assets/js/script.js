// var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
var key = "2e72e53f481f6b9de8ec80bdf19fe4dd"
var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
var weatherUrl = 'http://api.openweathermap.org/data/2.5/';

var featuredContainer = $('#featured');
var forecastContainer = $('#forecast');

// var stateList = $('.dropdown-menu')
// $.each(states, function (i) {
//     $('<li>')
//         .addClass('dropdown-item')
//         .attr('id', states[i])
//         .text(states[i])
//         .appendTo(stateList);
// })

// $('.dropdown-item').on('click', function () {
//     var selectedState = $(this).attr('id');
//     $(".dropdown-toggle").text(selectedState)
//     localStorage.setItem("State", selectedState)

// })
// not running current search it's running what was previously in local storage
$(".search-btn").on("click", pullEntry);
function pullEntry(event) {
    var searchTerm = $(".search-term").val();
    var storedSearchTerm = localStorage.getItem("Search Term");
    var storedState = localStorage.getItem("State");
    localStorage.setItem("Search Term", searchTerm);
    var history = $("<button>")
    history.attr("id", searchTerm).attr("class", "d-grid gap-2  btn btn-secondary  history-btn").text(searchTerm);
    $(".search-history").append(history)
    featuredContainer.empty();
    forecastContainer.empty();
    requestGeoCode(storedSearchTerm);

};
    
function requestGeoCode (storedSearchTerm) {
    fetch(geoUrl + "?q=" + storedSearchTerm + ",US&appid=" + key)
        .then((response) =>
            response.json())

        .then((data) => {
            console.log(data);
            var long = data[0].lon;
            var lat = data[0].lat;
            var city = data[0].name;
            var state = data[0].state;
            requestForecast(lat, long)
            requestCurrent(city,state)
        })
}

function requestCurrent (city, state) {
    fetch(weatherUrl + "weather?appid=" + key + "&q=" + city + "," + state + ",US&units=imperial")
    .then((response) =>
            response.json())

        .then((data) => {
            console.log(data);
            
            var currentTemp = data.main.temp;
            var currentWind = data.wind.speed;
            var currentHumidity = data.main.humidity;
            var cityEl = $('<div>');
            var card = $('<div>');
            var content = $('<ul>');
            var tempEl = $('<li>');
            var windEl = $('<li>');
            var humidityEl = $('<li>');
            var iconEl = $('<img>')
            var iconId = data.weather[0].icon;
            var iconUrl =  "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
            card.attr("class", "col-9 card city");
            cityEl.attr("class", "card-header");
            cityEl.attr("id", "featured");
            content.attr("class", "list-group list-group-flush");
            tempEl.attr("class", "list-group-item");
            windEl.attr("class", "list-group-item");
            humidityEl.attr("class", "list-group-item");
            iconEl.attr("src", iconUrl)
            featuredContainer.append(card);
            card.append(cityEl);
            cityEl.append(city + ", " + state, iconEl);
            card.append(content);
            content.append(tempEl)
            tempEl.text("Temp: " + currentTemp + "F");
            content.append(windEl)
            windEl.text("Wind: " + currentWind + "mph");
            content.append(humidityEl)
            humidityEl.text("Humidity: " + currentHumidity + "%");

})
}

function requestForecast(lat, long) {
    var searchTerm = $(".search-term").val();
    localStorage.setItem("Search Term", searchTerm);

    fetch(weatherUrl + "forecast?lat=" + lat + "&lon=" + long + "&units=imperial&appid=" + key)
        .then((response) =>
            response.json())

        .then((data) => {
            console.log(data);
            var daysIndex = [0, 8, 16, 24, 32]
            for (var i = 0; i < daysIndex.length; i++) {
                var forecastArr = data.list[daysIndex[i]];
                console.log(forecastArr)
                var card = $('<div>');
                var content = $('<ul>');
                var tempEl = $('<li>');
                var windEl = $('<li>');
                var humidityEl = $('<li>');
                var day = $('<h3>');
                var iconEl = $('<img>')
                var unix = forecastArr.dt_txt
                var date = new Date(unix).toDateString();
                var temp = forecastArr.main.temp_min + " - " + forecastArr.main.temp_max;
                var wind = forecastArr.wind.speed;
                var humidity = forecastArr.main.humidity;
                
                var iconId = forecastArr.weather[0].icon;
                var iconUrl =  "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
                
                card.attr("class", "col-12 card");
                day.attr("class", "card-header");
                day.attr("id", "day");
                content.attr("class", "list-group list-group-flush");
                tempEl.attr("class", "list-group-item");
                windEl.attr("class", "list-group-item");
                humidityEl.attr("class", "list-group-item");
                iconEl.attr("src", iconUrl)
                forecastContainer.append(card);
                card.append(day);
                day.append(date, iconEl);
                card.append(content);
                content.append(tempEl)
                tempEl.text("Temp: " + temp + "F");
                content.append(windEl)
                windEl.text("Wind: " + wind + "mph");
                content.append(humidityEl)
                humidityEl.text("Humidity: " + humidity + "%");

            }
            

        })
}

function searchHistory() {

}



// eventually for search history?
    // var currentSearch = searchTerm + ", " + selectedState
    // console.log(currentSearch)
                    // div.attr(".col-12 card")
                // divEl.append(div)
                // div.text(forecastArr.main.temp + "F")

                // divEl.append(div)
                // create div  
// displayForecast(forecastArr)
// function displayForecast(forecastArr) {
//     // 

//     let temp = forecastArr.main.temp
//     // append to 
//     console.log(temp)
// $("#featured-city").text(name + ", " + storedState)
// $('#featured-temp').text("Temp: " + temp + "F")
// $('#featured-wind').text("Wind: " + wind + "mph")
// $('#featured-humidity').text("Humidity: " + humidity + "%")
//}