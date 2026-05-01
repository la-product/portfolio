import { locatePosition } from "./weather/getLocation.js";
import { fetchWeather } from "./weather/fetchWeather.js";
import { setWeatherIcon } from "./weather/iconMap.js"; // pojmenovaný import

async function init() {
  try {
    const coords = await locatePosition();
    const weatherData = await fetchWeather(coords.lat, coords.lon);

    const tempElement = document.querySelector("#weather");
    const locationElement = document.querySelector("#location");

    if (tempElement) {
      tempElement.textContent = `${weatherData.temperature}°C`;
    }

    if (locationElement && weatherData.location) {
      locationElement.textContent = `${weatherData.location.city}`;
    }

    setWeatherIcon(weatherData.weathercode);
  } catch (error) {
    console.error("Chyba", error);
  }
}

init();
