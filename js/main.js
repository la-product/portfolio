import { locatePosition } from "./weather/getLocation.js";
import { fetchWeather } from "./weather/fetchWeather.js";
import { setWeatherIcon } from "./weather/iconMap.js";

async function init() {
  try {
    const spinner = document.querySelector("#weather-spinner");
    const icons = document.querySelector("#icons");
    const tempElement = document.querySelector("#weather");
    const locationElement = document.querySelector("#location");

    // skryj dokud se nenačte
    if (icons) icons.style.display = "none";
    if (tempElement) tempElement.style.display = "none";
    if (locationElement) locationElement.style.display = "none";

    const coords = await locatePosition();
    const weatherData = await fetchWeather(coords.lat, coords.lon);

    if (tempElement) {
      tempElement.textContent = `${weatherData.temperature}°C`;
      tempElement.style.display = "block";
    }
    if (locationElement && weatherData.location) {
      locationElement.textContent = `${weatherData.location.city}`;
      locationElement.style.display = "block";
    }

    setWeatherIcon(weatherData.weathercode);

    // schovej spinner, zobraz ikonu
    if (spinner) spinner.style.display = "none";
    if (icons) icons.style.display = "block";
  } catch (error) {
    console.error("Chyba", error);
    const spinner = document.querySelector("#weather-spinner");
    const icons = document.querySelector("#icons");
    const tempElement = document.querySelector("#weather");
    const locationElement = document.querySelector("#location");

    if (spinner) spinner.style.display = "none";
    if (icons) icons.style.display = "none";
    if (tempElement) {
      tempElement.textContent = "N/A";
      tempElement.style.display = "block";
    }
    if (locationElement) {
      locationElement.textContent = "Location unavailable";
      locationElement.style.display = "block";
    }
  }
}

init();
