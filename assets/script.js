// GLOBAL VARIABLES
var apiKey = "e1df124c208137221a2dfb932d052cc6";
var savedSearches = [];

console.log(apiKey);

// FUNCTIONS

// function to handle search using city in form
var searchSubmitHandler = function (event) {
  event.preventDefault();
  var cityName = $("#cityName").val().trim();
  if (cityName) {
    displayCurrentWeather();
    $("#cityName").val("");
  } else {
    alert("Please enter a city name!");
  }
};

var displayCurrentWeather = function displayCurrentWeather(city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&Appid=" +
    apiKey +
    "&units=imperial";

  fetch(apiUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log("data", data);
      return;
    });
};

function displayFiveDay() {}

// USER INTERACTION

// user submits form
$("#search-form").submit(searchSubmitHandler);

// INITIALIZATION
