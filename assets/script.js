// GLOBAL VARIABLES
var apiKey = "e1df124c208137221a2dfb932d052cc6";
var keyCount = 0;
var searchButton = $(".searchButton");

console.log(apiKey);

// DATA

// for loop to get data on webpage using local storage

// FUNCTIONS

// function to display weather, both current and forecast
searchButton.click(function displayWeather(event) {
  event.preventDefault();
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
    // jquery ajax get method to pull data from api
    $.ajax({
      url: apiUrlCurrent,
      method: "GET",
    }).then(function (response) {
      // log to confirm no response error
      console.log(response);
      // saving name to local storage to grab later
      var local = localStorage.setItem(keyCount, response.name);
      keyCount = keyCount + 1;

      // appends div to current weather, then appends p tag to the card
      var currentWeatherCard = $(".currentCard")
        .append("<div>")
        .addClass("card-body");
      currentWeatherCard.empty();
      var currentCityName = currentWeatherCard.append("<p>");

      currentWeatherCard.append(currentCityName);

      // saves current city to var, then appends it to search history element
      var searchItem = $(".list-group").addClass("list-group-item");
      searchItem.append("<li>" + response.name + "</li>");

      // var to track the current date using the dt object in the response and appending it to city name
      var timeUTC = new Date(response.dt * 1000);
      // append response.name + current date to p tag variable we created above
      currentCityName.append(
        // converting date to a string using "en-us"
        response.name + " (" + timeUTC.toLocaleDateString("en-US") + ")"
      );
      currentCityName.append(
        `<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`
      );

      // variable to store the three weather conditions, which append to the city name
      var currentConditions = currentCityName.append(currentConditions);
      // append each condition using response.(condition)
      currentConditions.append(
        "<p>" + "Temperature: " + response.main.temp + "</p>"
      );
      currentConditions.append(
        "<p>" + "Humidity: " + response.main.humidity + "%" + "</p>"
      );
      currentConditions.append(
        "<p>" + "Wind Speed: " + response.wind.speed + "</p>"
      );

      // jquery ajax get method to gather five day forecast data
      $.ajax({
        url: apiUrlFiveDay,
        method: "GET",
      }).then(function (response) {
        console.log(response);

        // variable to capture an array which are noon of of the following 5 days
        var futureDayArr = [3, 11, 19, 27, 35];
        // variable to capture the container that will hold each of the five days, while adding the bootstrap card-body class
        var fiveDayContainer = $(".fiveDayCard").addClass("card-body");
        // variable to capture the individual cards for each forecasted day, while applying the bootstrap class card-text
        var fiveDaySingleCard = $(".fiveDaySingleCard").addClass("card-text");
        fiveDaySingleCard.empty();

        // for each function to apply the date and weather conditions to each card for the 5 days in the day array
        futureDayArr.forEach(function (i) {
          // var to pull date data for each of the 5 listed in the array, then converting them to dates
          var forecastUTC = new Date(response.list[i].dt * 1000);
          // converting date to a string using "en-us"
          forecastUTC = forecastUTC.toLocaleDateString("en-US");

          // appending each forecast card element to the container we created above
          fiveDayContainer.append(
            "<div>" +
              "<p>" +
              forecastUTC +
              "</p>" +
              `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` +
              "<p>" +
              "Temperature: " +
              response.list[i].main.temp +
              "</p>" +
              "<p>" +
              "Humidity: " +
              response.list[i].main.humidity +
              "%" +
              "</p>" +
              "</div>"
          );
        });
      });
    });
  }
});

// USER INTERACTION

// INITIALIZATION
