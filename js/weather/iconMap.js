"use strict";

const icons = document.getElementById("icons");
const hour = new Date().getHours();
const isDay = hour >= 6 && hour < 19;
const prefix = isDay ? "day" : "night";

export const setWeatherIcon = (weathercode) => {
  switch (weathercode) {
    case 0:
    case 1:
      icons.setAttribute("src", `./img/${prefix}/sunny.png`);
      break;
    case 2:
      icons.setAttribute("src", `./img/${prefix}/cloudy.png`);
      break;
    case 3:
      icons.setAttribute("src", `./img/${prefix}/overcast.png`);
      break;
    case 61:
    case 63:
      icons.setAttribute("src", `./img/${prefix}/rain.png`);
      break;
    case 65:
      icons.setAttribute("src", `./img/${prefix}/heavyRain.png`);
      break;
    case 80:
    case 81:
    case 82:
      icons.setAttribute("src", `./img/${prefix}/rainShowers.png`);
      break;
    case 95:
    case 96:
    case 99:
      icons.setAttribute("src", `./img/${prefix}/storm.png`);
      break;
    default:
      break;
  }
};
