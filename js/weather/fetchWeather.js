"use strict";

export const fetchWeather = async (lat, lon) => {
  try {
    const [weatherResponse, locationResponse] = await Promise.all([
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
      ),
      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=cs`,
      ),
    ]);

    if (!weatherResponse.ok) throw new Error("Weather API selhalo");
    if (!locationResponse.ok) throw new Error("Location API selhalo");

    const weatherData = await weatherResponse.json();
    const locationData = await locationResponse.json();

    return {
      temperature: weatherData.current_weather.temperature,
      weathercode: weatherData.current_weather.weathercode,
      location: {
        city: locationData.city || locationData.locality || null,
      },
    };
  } catch (error) {
    console.error("Nepodařilo se získat data o počasí", error);
    return null;
  }
};
