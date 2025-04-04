import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCountries } from "../api/geoAPI";

const SearchBar = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      try {
        const data = await fetchCountries();
        setAllCountries(data);
      } catch (err) {
        setError("Failed to load countries.");
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  const searchCountries = useCallback(
    (query) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      const filteredResults = allCountries.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filteredResults);
    },
    [allCountries]
  );

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (query) {
      timeoutRef.current = setTimeout(() => {
        searchCountries(query);
      }, 300);
    } else {
      setResults([]);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [query, searchCountries]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setResults([]);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCountrySelect = (country) => {
    setQuery(country.name);
    setResults([]);
    navigate(`/details/${country.name}`);
  };

  return (
    <div
      ref={inputRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "420px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <input
        type="text"
        placeholder="Search for a country..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 18px",
          fontSize: "16px",
          border: "2px solid #ccc",
          borderRadius: results.length ? "8px 8px 0 0" : "8px",
          outline: "none",
          transition: "border 0.2s ease",
        }}
      />

      {loading && (
        <p style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}>
          Loading...
        </p>
      )}
      {error && (
        <p style={{ fontSize: "14px", color: "#e63946", marginTop: "8px" }}>
          {error}
        </p>
      )}

      {results.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderTop: "none",
            borderRadius: "0 0 8px 8px",
            maxHeight: "240px",
            overflowY: "auto",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {results.map((country) => (
            <li
              key={country.code}
              onClick={() => handleCountrySelect(country)}
              style={{
                padding: "12px 18px",
                cursor: "pointer",
                fontWeight: "bold",
                color: "#000",
                borderBottom: "1px solid #f0f0f0",
                transition: "background 0.2s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#f5f5f5")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "white")
              }
            >
              {country.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
