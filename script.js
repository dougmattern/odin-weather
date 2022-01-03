// current weather app

const apiKey = "09ce9eb342aca170012cfec623cc98e5";
const search = document.getElementById("search");
const locationInput = document.getElementById("location");
search.addEventListener("click", (e) => {
  e.preventDefault();
  inputLocation();
});

// click temp to toggle celsius/fahrenheit
const temperature = document.querySelector(".temp");
temperature.addEventListener("click", toggleTemp);

function toggleTemp() {
  if (temperature.innerText.includes("F"))
    temperature.innerText = celsius + " °C";
  else {
    temperature.innerText = myTemp + " °F";
  }
}

let myTemp;
let celsius;

function convertCelsius() {
  celsius = ((myTemp - 32) / 1.8).toFixed(2);
}

// API call
async function getWeather(location) {
  spinnerIn();
  try {
    if (location.includes(", ")) {
      // pull out state code or country code
      let stateCode = location.split(",")[1].trim();
      let searchCity = location.substring(0, location.indexOf(","));
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity},${stateCode},US&units=imperial&appid=${apiKey}`,
        { mode: "cors" }
      );
      const data = await response.json();
      processData(data);
      spinnerOut();
    } else {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`,
        { mode: "cors" }
      );
      const data = await response.json();
      processData(data);
      spinnerOut();
    }
  } catch (e) {
    document.querySelector(".name").innerText = "Not Found";
    document.querySelector(".temp").innerText = ".";
    document.querySelector(".humidity").innerText = ".";
    document.querySelector(".main").innerText = ".";
    document.querySelector(".description").innerText = ".";
    document.querySelector(".speed").innerText = ".";
    spinnerOut();
  }
}

// pull out data wanted for display
function processData(data) {
  const {
    main: { temp, humidity },
    name,
    weather: [{ description, main }],
    wind: { speed },
  } = data;
  displayData(name, temp, humidity, main, description, speed);
  myTemp = temp;
  convertCelsius();
}

// display data
function displayData(name, temp, humidity, main, description, speed) {
  const card = document.getElementById("card");
  const cityName = document.querySelector(".name");
  // box shadow and underline effect based on weather
  if (main == "Clouds") {
    // increased gray in color with increased cloud cover
    if (description == "few clouds") {
      card.style.boxShadow = "20px 20px 20px 20px #A6A600";
      cityName.style.textDecoration = "underline solid #A6A600";
    } else if (description == "scattered clouds") {
      card.style.boxShadow = "20px 20px 20px 20px #808000";
      cityName.style.textDecoration = "underline solid #808000";
    } else if (description == "broken clouds") {
      card.style.boxShadow = "20px 20px 20px 20px #5A5A00";
      cityName.style.textDecoration = "underline solid #5A5A00";
    } else {
      card.style.boxShadow = "20px 20px 20px 20px #464646";
      cityName.style.textDecoration = "underline solid #464646";
    }
  } else if (main == "Clear") {
    card.style.boxShadow = "20px 20px 20px 20px #CACA00";
    cityName.style.textDecoration = "underline solid #CACA00";
  } else if (main == "Snow") {
    card.style.boxShadow = "20px 20px 20px 20px #85BDCD";
    cityName.style.textDecoration = "underline solid #85BDCD";
  } else if (
    main == "Rain" ||
    main == "Drizzle" ||
    main == "Thunderstorm" ||
    main == "Mist"
  ) {
    card.style.boxShadow = "20px 20px 20px 20px #000073";
    cityName.style.textDecoration = "underline solid #000073";
  } else {
    card.style.boxShadow = "20px 20px 20px 20px rgba(235, 235, 235, 0.5)";
    cityName.style.textDecoration = "underline solid rgba(235, 235, 235, 0.5)";
  }

  // input selected data
  document.querySelector(".name").innerText = name;
  document.querySelector(".temp").innerText = temp + " °F";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".main").innerText = main;
  document.querySelector(".description").innerText = description;
  document.querySelector(".speed").innerText = "Wind: " + speed + " mph";
}

// search/get a location to call data for
function inputLocation() {
  const location = locationInput.value;
  getWeather(location);
  locationInput.value = "";
}

function spinnerOut() {
  document.querySelector(".loading").style.display = "none";
}

function spinnerIn() {
  document.querySelector(".loading").style.display = "block";
}

getWeather("San Francisco");
