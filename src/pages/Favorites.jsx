import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { favorites, toggleFavoriteCountry, toggleFavoriteLandmark } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div style={{ padding: '24px', color: 'white',backgroundColor: 'rgba(0, 0, 0, 0.6)', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
        Favorite Destinations & Landmarks
      </h1>

  
      <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Countries</h2>
      {favorites.countries.length > 0 ? (
        <div>
          {favorites.countries.map((country, index) => (
            <div key={index} style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{country}</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => toggleFavoriteCountry(country)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#F44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Remove
                </button>
                <button
                  onClick={() => navigate(`/details/${country}`)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#A1A1A1' }}>You haven't added any favorite countries yet!</p>
      )}

    
      <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Landmarks</h2>
      {favorites.landmarks.length > 0 ? (
        <div>
          {favorites.landmarks.map((landmark) => (
            <div key={landmark.id} style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{landmark.name}</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => toggleFavoriteLandmark(landmark)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#F44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Remove
                </button>
                <button
                  onClick={() => navigate(`/landmark/${landmark.id}`)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#A1A1A1' }}>No favorite landmarks yet! Start exploring now!</p>
      )}
    </div>
  );
};

export default Favorites;
