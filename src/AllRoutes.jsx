import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";
import Landmark from "./pages/Landmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons"; 
import { faHeart } from "@fortawesome/free-regular-svg-icons"; 


const AllRoutes = () => {
  const backgroundStyle = {
    backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww')`,
    backgroundSize: "cover",
   backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100vw", 
    left:0,
    minHeight: "100vh",
    position: "relative",
    color: "white",
    overflowX: "hidden", 
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)", 
    zIndex: 1,
  };

  const navStyle = {
    position: "relative",
    zIndex: 2,
    backgroundColor: "white",
    padding: "16px",
    display: "flex",
    gap: "20px",
    fontSize: "18px",
    fontWeight: "500",
    width: "100%", 
  };

  const linkStyle = {
    color: "black",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.5s ease-in-out, text-decoration 0.3s ease-in-out",
  };

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}></div>

      <nav style={navStyle}>
        <Link 
          to="/" 
          style={linkStyle} 
          onMouseOver={(e) => {
            e.target.style.color = "#333";
            e.target.style.textDecoration = "underline";
          }} 
          onMouseOut={(e) => {
            e.target.style.color = "black";
            e.target.style.textDecoration = "none";
          }}
        >
              <FontAwesomeIcon icon={faHouse} />  Home
        </Link>
        <Link 
          to="/favorites" 
          style={linkStyle} 
          onMouseOver={(e) => {
            e.target.style.color = "#333";
            e.target.style.textDecoration = "underline";
          }} 
          onMouseOut={(e) => {
            e.target.style.color = "black";
            e.target.style.textDecoration = "none";
          }}
        >
         <FontAwesomeIcon icon={faHeart} /> Favorites
        </Link>
      </nav>

      <div style={{ position: "relative", zIndex: 2, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:countryName" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/landmark/:id" element={<Landmark />} />
        </Routes>
      </div>
    </div>
  );
};

export default AllRoutes;
