// GLOBAL VARIABLES
var apiKey = "e1df124c208137221a2dfb932d052cc6";
var savedSearches = [];

// FUNCTIONS

displayCurrentWeather();

displayFiveDay();

// USER INTERACTION

// user submits form
$("#form-location").on("submit", function (event) {
  event.preventDefault();

  // get city name
  var cityName = $("#search-input").val();

  // alert if user enters no city or unknown city
  if (cityName === "" || cityName == null) {
    alert("Please enter name of valid city.");
    return;
  } else {
    // functions to display current and 5 day forecast
    displayCurrentWeather();
    displayFiveDay();
  }
});

// INITIALIZATION
