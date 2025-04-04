import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FavoriteButton = ({ landmark }) => {
  const { favorites, toggleFavoriteLandmark } = useContext(AppContext);

  if (!favorites || !favorites.landmarks) {
    console.warn("Favorites context is undefined or not properly initialized.");
    return null;
  }

  const isFavorite = favorites.landmarks.some(item => item.id === landmark.id); 

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    transition: "all 0.3s ease",
    background: "none",
    border: "none",
    cursor: "pointer",
  };

  const iconStyle = isFavorite
    ? { color: "#ef4444", fontSize: "1.25rem", animation: "pulse 1s infinite" }
    : { color: "#9ca3af", fontSize: "1.25rem" };

  const textStyle = {
    color: "#ffffff",
  };

  return (
    <button style={buttonStyle} onClick={() => toggleFavoriteLandmark(landmark)}>
      {isFavorite ? (
        <FaHeart style={iconStyle} />
      ) : (
        <FaRegHeart style={iconStyle} />
      )}
      <span style={textStyle}>
        {isFavorite ? "Remove Favorite" : "Add to Favorites"}
      </span>
    </button>
  );
};

export default FavoriteButton;