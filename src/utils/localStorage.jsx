const FAVORITES_KEY = "travel-explorer-favorites";

// Save favorites to localStorage
export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites:", error);
  }
};


export const loadFavorites = () => {
  try {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : { countries: [], landmarks: [] };
  } catch (error) {
    console.error("Error loading favorites:", error);
    return { countries: [], landmarks: [] };
  }
};
