"use strict";
import { fetchWeather } from "./fetchWeather.js";
import { locatePosition } from "./getLocation.js";

const icons = document.getElementById("icons");

const iconDisplay = async () => {
  const { lat, lon } = await locatePosition();
  const { weathercode } = await fetchWeather(lat, lon);

  console.log(weathercode);

  switch (weathercode) {
    case 0:
      icons.setAttribute("src", "./img/sunny.png");
      break;
    case 1:
      icons.setAttribute("src", "./img/mainly-clear.png");
      break;
    case 2:
      icons.setAttribute("src", "./img/cloudy.png");
      break;
    case 3:
      icons.setAttribute("src", "./img/overcast.png");
      break;
  }
};

iconDisplay();
