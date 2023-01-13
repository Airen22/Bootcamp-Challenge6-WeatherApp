var key = "2e72e53f481f6b9de8ec80bdf19fe4dd"
var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
var weatherUrl = 'http://api.openweathermap.org/data/2.5/';
var storedSearchTerm = localStorage.getItem("Search Term");
var storedState = localStorage.getItem("State")
// var temp = "";
// var wind = "";
// var humidity = "";
var city = "";
var state = "";
let divEl = $('#forecast')

// not running current search it's running what was previously in local storage
$(".search-btn").on("click", function (event) {
    var searchTerm = $(".search-term").val();
    localStorage.setItem("Search Term", searchTerm);

    fetch(geoUrl + "?q=" + storedSearchTerm + "," + storedState + ",US&appid=" + key)
        .then((response) =>
            response.json())

        .then((data) => {
            console.log(data);
            let long = data[0].lon;
            let lat = data[0].lat;
            city = data[0].name;
            state = data[0].state;
            requestCurrentWeather(lat, long)
            requestForecast(lat, long)
        })

})

function requestCurrentWeather(lat, long) {
    fetch(weatherUrl + )
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
                var day = $('<h3>');
                var content = $('<ul>');
                var tempEl = $('<li>');
                var windEl = $('<li>');
                var humidityEl = $('<li>');
                var date = forecastArr.dt_txt;
                var temp = forecastArr.main.temp_min + " - " + forecastArr.main.temp_max;
                var wind = forecastArr.wind.speed;
                var humidity = forecastArr.main.humidity;


                card.attr("class", "col-12 card");
                day.attr("class", "card-header");
                day.attr("id", "day");
                content.attr("class", "list-group list-group-flush");
                tempEl.attr("class", "list-group-item");
                windEl.attr("class", "list-group-item");
                humidityEl.attr("class", "list-group-item");
                divEl.append(card);
                card.append(day);
                day.append(date);
                card.append(content);
                content.append(tempEl)
                tempEl.text("Temp: " + temp + "F");
                content.append(windEl)
                windEl.text("Wind: " + wind + "mph");
                content.append(humidityEl)
                humidityEl.text("Humidity: " + humidity + "%");


                // div.attr(".col-12 card")
                // divEl.append(div)
                // div.text(forecastArr.main.temp + "F")

                // divEl.append(div)
                // create div  
            }
            // displayForecast(forecastArr)

        })
}

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




var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

var stateList = $('.dropdown-menu')
$.each(states, function (i) {
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