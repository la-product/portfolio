import { locatePosition } from "./weather/getLocation.js";
import { fetchWeather } from "./weather/fetchWeather.js";
import "./weather/iconMap.js";

async function init() {
  try {
    const coords = await locatePosition();

    const weatherData = await fetchWeather(coords.lat, coords.lon);

    const tempElement = document.querySelector("#weather");

    if (tempElement) {
      tempElement.textContent = `${weatherData.temperature}°C`;
    }
  } catch (error) {
    console.error("Chyba", error);
  }
}

init();
