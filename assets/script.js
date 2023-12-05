// GLOBAL VARIABLES
var apiKey = "e1df124c208137221a2dfb932d052cc6";
var keyCount = 0;
var searchButton = $(".searchButton");

console.log(apiKey);

// DATA

// for loop to get data on webpage using local storage

// FUNCTIONS

// function to display weather, both current and forecast
searchButton.click(function displayWeather() {
  // variable to grab search input value
  var cityName = $(".cityName").val().trim();
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

  if (cityName === "") {
    alert("Please enter a valid city!");
    return;
  } else {
    // ajax get method to pull data from api
    $.ajax({
      url: apiUrlCurrent,
      method: "GET",
    }).then(function (response) {
      // saves current city to var, then appends it to unordered list element
      var currentCity = $(".list-group").addClass("list-group-item");
      currentCity.append("<li>" + response.name + "</li>");

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
});

// USER INTERACTION

// INITIALIZATION
