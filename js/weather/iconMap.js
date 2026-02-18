"use strict";
import { fetchWeather } from "./fetchWeather.js";
import { locatePosition } from "./getLocation.js";

const icons = document.getElementById("icons");

const iconDisplay = async () => {
  const { lat, lon } = await locatePosition();
  const { weathercode } = await fetchWeather(lat, lon);

  if (weathercode === 71) {
    icons.setAttribute("src", "./img/weather-icons.svg#cloudy");
  }
};

iconDisplay();
