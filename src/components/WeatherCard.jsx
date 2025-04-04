import React, { useEffect, useState } from "react";
import { fetchWeather } from "../api/weatherAPI";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

const WeatherCard = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!country || !country.lat || !country.lon) return;

    const getWeatherData = async () => {
      const weatherData = await fetchWeather(country.lat, country.lon);
      setWeather(weatherData);
    };

    getWeatherData();
  }, [country]);

  if (!weather) {
    return <p style={styles.loadingText}>Fetching Weather...</p>;
  }

  const getWeatherIcon = (condition) => {
    const cond = condition.toLowerCase();

    if (cond.includes("clear")) return <WiDaySunny style={{ ...styles.icon, animation: "bounce 2s infinite" }} />;
    if (cond.includes("cloud")) return <WiCloud style={{ ...styles.icon, animation: "drift 5s infinite linear" }} />;
    if (cond.includes("rain")) return <WiRain style={{ ...styles.icon, animation: "raindrop 1.5s infinite alternate" }} />;
    if (cond.includes("snow")) return <WiSnow style={{ ...styles.icon, animation: "snowfall 2s infinite alternate" }} />;
    if (cond.includes("thunder")) return <WiThunderstorm style={{ ...styles.icon, animation: "flicker 1s infinite alternate" }} />;
    if (cond.includes("fog") || cond.includes("mist")) return <WiFog style={{ ...styles.icon, animation: "drift 4s infinite linear" }} />;

    return <WiDaySunny style={{ ...styles.icon, animation: "bounce 2s infinite" }} />;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>{country.name} - Weather</h2>
      </div>
      <div style={styles.weatherContent}>
        <div style={styles.iconWrapper}>{getWeatherIcon(weather.condition)}</div>
        <div style={styles.info}>
          <p style={styles.temp}>{weather.temp}°C</p>
          <p style={styles.description}>{weather.condition}</p>
          <div style={styles.details}>
            <p>💨 Wind: {weather.windSpeed} km/h</p>
            <p>💧 Humidity: {weather.humidity}%</p>
          </div>
        </div>
      </div>
      <style>{keyframes}</style>
    </div>
  );
};

const styles = {
  container: {
    width: "90%",
    maxWidth: "1000px",
    background: "linear-gradient(135deg, #ffffff, #f5f5f5)",
    borderRadius: "12px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    margin: "20px auto",
    textAlign: "center",
    transition: "transform 0.2s ease-in-out",
  },
  header: {
    borderBottom: "2px solid #ddd",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#333",
  },
  weatherContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  iconWrapper: {
    flex: "1",
    textAlign: "center",
  },
  icon: {
    fontSize: "80px",
  },
  info: {
    flex: "1",
    textAlign: "center",
  },
  temp: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#222",
  },
  description: {
    fontSize: "18px",
    textTransform: "capitalize",
    color: "#555",
    marginBottom: "10px",
  },
  details: {
    fontSize: "16px",
    color: "#666",
  },
  loadingText: {
    textAlign: "center",
    fontSize: "18px",
    color: "#777",
  },
};

const keyframes = `
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes drift {
    0% { transform: translateX(0); }
    100% { transform: translateX(10px); }
  }
  @keyframes raindrop {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(10px); opacity: 0.6; }
  }
  @keyframes snowfall {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(10px) scale(1.1); opacity: 0.7; }
  }
  @keyframes flicker {
    0% { opacity: 0.8; transform: scale(1); }
    100% { opacity: 1; transform: scale(1.05); }
  }
`;

export default WeatherCard;
