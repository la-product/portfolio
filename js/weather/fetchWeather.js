"use strict";

export const fetchWeather = async (lat, lon) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    return {
      temperature: data.current_weather.temperature,
      weathercode: data.current_weather.weathercode,
    };
  } catch (error) {
    console.error("Nepodařilo se získat data o počasí", error);
    return null;
  }
};
