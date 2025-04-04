import axios from "axios";


const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
console.log(WEATHER_API_KEY)

export const fetchWeather = async (lat, lon) => {
  if (!WEATHER_API_KEY) {
    console.error("❌ Weather API Key is missing!");
    return null;
  }

  if (!lat || !lon) {
    console.error("❌ Missing latitude or longitude for weather fetch!");
    return null;
  }

  try {
    console.log(`🌤 Fetching weather for lat: ${lat}, lon: ${lon}...`);
    
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: "metric",
      },
    });

    const data = response.data;

    return {
      temp: data.main.temp,
      condition: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,
    };
  } catch (error) {
    console.error("❌ Weather Fetch Error:", error.response?.data || error.message);
    return null;
  }
};
