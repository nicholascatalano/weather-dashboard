// GLOBAL VARIABLES
var apiKey = "e1df124c208137221a2dfb932d052cc6";
var keyCount = 0;

console.log(apiKey);

// FUNCTIONS

// function to handle search using city in form
var searchSubmitHandler = function (event) {
  event.preventDefault();
  var cityName = $(".cityName").val().trim();
  if (cityName) {
    displayWeather(cityName);
    $(".cityName").val("");
  } else {
    alert("Please enter a city name!");
  }
};

// function to display weather, both current and forecast
function displayWeather() {
  // api urls for current day and forecast
  var cityName = $(".cityName").val();
  var apiUrlCurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&Appid=" +
    apiKey +
    "&units=imperial";
  var apiUrlFiveDay =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&Appid=" +
    apiKey +
    "&units=imperial";

  // ajax get method to pull data from api
  $.ajax({
    url: apiUrlCurrent,
    method: "GET",
  }).then(function (response) {
    var currentCity = $("#searchedCityName");
    currentCity.append(response.name);
    console.log(response);

    // saving name to local storage to grab later
    var local = localStorage.setItem(keyCount, response.name);
    keyCount = keyCount + 1;

    // var to track the current date using the dt object in the response and appending it to city name
    var timeUTC = new Date(response.dt * 1000);
    currentCity.append(" " + "(" + timeUTC.toLocaleDateString("en-US") + ")");
    currentCity.append(
      `<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`
    );

  });
}

// var displayCurrentWeather = function displayCurrentWeather(city) {
//   var apiUrl =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     city +
//     "&Appid=" +
//     apiKey +
//     "&units=imperial";

//   fetch(apiUrl)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log("data", data);
//       return;
//     });

//   var currentApiUrl =
//   "http://api.openweathermap.org/geo/1.0/reverse?lat=${response.coord.lat}&lon={lon}&limit={limit}&appid={API key}";

//   fetch(currentApiUrl).then(function (response) {
//     console.log(response);
//   });
// };

// USER INTERACTION

// user submits form
$(".search-form").submit(searchSubmitHandler);

// INITIALIZATION
