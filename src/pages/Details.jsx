import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCountryDetails } from "../api/geoAPI";
import { fetchWeather } from "../api/weatherAPI";
import { fetchLandmarks } from "../api/placesAPI";
import WeatherCard from "../components/WeatherCard";
import { AppContext } from "../context/AppProvider";

const Details = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [landmarks, setLandmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { favorites, toggleFavoriteCountry, toggleFavoriteLandmark } = useContext(AppContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(`🌍 Fetching details for: ${countryName}...`);

        const countryData = await fetchCountryDetails(countryName);
        if (!countryData || !countryData.lat || !countryData.lon) {
          throw new Error("Country not found or missing coordinates.");
        }

        setCountry(countryData);

        const weatherData = await fetchWeather(countryData.lat, countryData.lon);
        setWeather(weatherData);

        const landmarksData = await fetchLandmarks(countryData.name);
        setLandmarks(landmarksData);

        console.log("Country Data:", countryData);
        console.log(" Weather Data:", weatherData);
        console.log("Landmarks:", landmarksData);
      } catch (err) {
        console.error("Data Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [countryName]);

  const isFavorited = favorites.countries.includes(country?.name);

  if (loading) return <p className="loading-message">Loading country details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="container">
      {country && (
        <div className="country-card">
          <h2>{country.name} ({country.code})</h2>
          <img src={country.flag} alt={`${country.name} flag`} className="country-flag" />
          <p><strong>Capital:</strong> {country.capital}</p>
          <p><strong>Latitude:</strong> {country.lat}, <strong>Longitude:</strong> {country.lon}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Subregion:</strong> {country.subregion}</p>
          <p><strong>Currency:</strong> {country.currency}</p>
          <p><strong>Languages:</strong> {country.language}</p>

          <button
            className="button-primary"
            onClick={() => toggleFavoriteCountry(country.name)}
            style={{
              backgroundColor: isFavorited ? "#F44336" : "#007bff",
            }}
          >
            {isFavorited ? "Remove from Favorites ❤️" : "Add to Favorites 💙"}
          </button>
        </div>
      )}

      {weather && <WeatherCard country={country} />}

      {landmarks.length > 0 && (
        <div className="landmarks-section">
          <h3>🏛 Landmarks</h3>
          <div className="landmarks-grid">
            {landmarks.map((landmark) => (
              <div key={landmark.id} className="landmark-card">
                <img src={landmark.photoUrl} alt={landmark.name} className="landmark-image" />
                <p>{landmark.name}</p>
                <Link to={`/landmark/${landmark.id}`} className="view-landmark-link">
                  View Landmark
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
