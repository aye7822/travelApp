import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLandmarkById, fetchNearbyRestaurants } from "../api/placesAPI";
import { fetchWeather } from "../api/weatherAPI";
import { AppContext } from "../context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Landmark = () => {
  const { id } = useParams();
  const [landmark, setLandmark] = useState(null);
  const [weather, setWeather] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, toggleFavoriteLandmark } = useContext(AppContext);

  useEffect(() => {
    const getLandmarkDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const landmarkData = await fetchLandmarkById(id);
        if (!landmarkData) throw new Error("Landmark not found");

        setLandmark(landmarkData);

        if (landmarkData.lat && landmarkData.lon) {
          const weatherData = await fetchWeather(landmarkData.lat, landmarkData.lon);
          setWeather(weatherData);

          const nearbyRestaurants = await fetchNearbyRestaurants(landmarkData.lat, landmarkData.lon);
          setRestaurants(nearbyRestaurants);
        }
      } catch (err) {
        console.error("Error fetching landmark:", err);

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getLandmarkDetails();
  }, [id]);

  const isFavorite = landmark && favorites?.landmarks?.some((fav) => fav.id === landmark.id);

  if (loading) return <p style={styles.loadingMessage}>⏳ Loading Landmark...</p>;
  if (error) return <p style={styles.errorMessage}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{landmark.name}</h1>
      
      <button 
        onClick={() => toggleFavoriteLandmark(landmark)}
        style={{
          ...styles.favoriteBtn,
          backgroundColor: isFavorite ? "#F44336" : "#3B82F6",
        }}
      >
        {isFavorite ? "❤ Remove from Favorites" : "💙 Add to Favorites"}
      </button>

      <p style={styles.address}>
        <FontAwesomeIcon icon={faLocationDot} style={{ color: "red", fontSize: "24px", marginRight: "8px" }} />
        {landmark.address}
      </p>

      {/* Weather Section */}
      {weather ? (
        <div style={styles.weatherBox}>
          <h2 style={styles.weatherTitle}>🌤 Current Weather</h2>
          <p style={styles.weatherInfo}>
            {weather.temp}°C — {weather.condition}
          </p>
        </div>
      ) : (
        <p style={styles.weatherLoading}>Fetching weather...</p>
      )}

      {/* Restaurants Section */}
      {restaurants.length > 0 && (
        <div style={styles.restaurantSection}>
          <h2 style={styles.sectionTitle}>🍽 Nearby Restaurants</h2>
          <ul style={styles.restaurantList}>
            {restaurants.map((res) => (
              <li key={res.id} style={styles.restaurantItem}>
                <strong>{res.name}</strong><br />
                <span style={styles.restaurantAddress}>{res.address}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    color: "#fff",
    padding: "24px",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: "34px",
    fontWeight: "bold",
    marginBottom: "16px",
    textAlign: "center",
    color: "black",
  },
  address: {
    fontSize: "20px",
    color: "black",
    marginTop: "8px",
  },
  weatherBox: {
    backgroundColor: "#444",
    padding: "16px 24px",
    borderRadius: "10px",
    marginTop: "20px",
    textAlign: "center",
    color: "#E0E0E0",
    width: "100%",
    maxWidth: "500px",
  },
  weatherTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  weatherInfo: {
    fontSize: "16px",
  },
  weatherLoading: {
    fontSize: "14px",
    fontStyle: "italic",
    color: "#A1A1A1",
    marginTop: "10px",
  },
  favoriteBtn: {
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background-color 0.3s ease",
  },
  loadingMessage: {
    textAlign: "center",
    fontSize: "18px",
    color: "black",
    marginTop: "20px",
  },
  errorMessage: {
    textAlign: "center",
    fontSize: "18px",
    color: "#FF3B3B",
    marginTop: "20px",
  },
  restaurantSection: {
    marginTop: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.15)", 
    padding: "20px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "600px",
    backdropFilter: "blur(4px)", 
  },
  sectionTitle: {
    fontSize: "20px",
    color: "#fff",
    marginBottom: "16px",
    textAlign: "center",
  },
  restaurantList: {
    listStyle: "none",
    paddingLeft: 0,
    margin: 0,
  },
  restaurantItem: {
    marginBottom: "12px",
    color: "black",
    textAlign: "left",
    backgroundColor: "rgba(255, 255, 255, 0.4)", 
    padding: "12px",
    borderRadius: "8px",
  },
  restaurantAddress: {
    fontSize: "14px",
    color: "black",
  },
};

export default Landmark;
