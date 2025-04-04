import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function Home() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const navigate = useNavigate();

  const handleSelectedCountry = (country) => {
    setSelectedCountry(country);
    navigate(`/details/${country.name}`);
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "80px", position: "relative" }}>
      
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "700",
          color: "white", 
          animation: "fadeInUp 1s ease-out",
        }}
      >
        Travel Explorer
        <span
          style={{
            display: "inline-block",
            marginLeft: "12px",
            animation: "flyAcross 4s ease-in-out infinite",
            fontSize: "1.5rem",
          }}
        >
          🗺️⁀જ✈︎
        </span>
        
      </h1>

   
      <div style={{ marginTop: "40px" }}>
        <SearchBar onCountrySelect={handleSelectedCountry} />
      </div>

 
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes flyAcross {
            0% {
              transform: translateX(-10px) rotate(0deg);
              opacity: 0.6;
            }
            50% {
              transform: translateX(10px) rotate(5deg);
              opacity: 1;
            }
            100% {
              transform: translateX(-10px) rotate(0deg);
              opacity: 0.6;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Home;
