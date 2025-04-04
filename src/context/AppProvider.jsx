import React, { createContext, useState, useEffect } from "react";
import { loadFavorites, saveFavorites } from "../utils/localStorage"; 

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const loaded = loadFavorites();
    return loaded || { countries: [], landmarks: [] }; 
  });

  useEffect(() => {
    saveFavorites(favorites); 
  }, [favorites]);


  const toggleFavoriteCountry = (country) => {
    setFavorites((prev) => {
      const updatedCountries = prev.countries.includes(country)
        ? prev.countries.filter((item) => item !== country)
        : [...prev.countries, country];
      const updatedFavorites = { ...prev, countries: updatedCountries };
      saveFavorites(updatedFavorites); 
      return updatedFavorites;
    });
  };

 
  const toggleFavoriteLandmark = (landmark) => {
    setFavorites((prev) => {
      const updatedLandmarks = prev.landmarks.some(item => item.id === landmark.id)
        ? prev.landmarks.filter(item => item.id !== landmark.id)
        : [...prev.landmarks, landmark];
      const updatedFavorites = { ...prev, landmarks: updatedLandmarks };
      saveFavorites(updatedFavorites); 
      return updatedFavorites;
    });
  };

  return (
    <AppContext.Provider value={{ favorites, toggleFavoriteCountry, toggleFavoriteLandmark }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;