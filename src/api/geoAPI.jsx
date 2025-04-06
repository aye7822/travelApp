// src/api/geoAPI.jsx
import axios from "axios";

const BASE_URL = import.meta.env.VITE_REST_COUNTRIES_API;

export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);

    return response.data.map((country) => ({
      name: country.name?.common || "Unknown",
      code: country.cca2 || "N/A",
      capital: country.capital?.[0] || "Unknown",
      lat: country.latlng?.[0] || null,
      lon: country.latlng?.[1] || null,
      flag: country.flags?.png || country.flags?.svg || "",
      population: country.population || "Unknown",
      region: country.region || "Unknown",
      subregion: country.subregion || "Unknown",
      currency:
        Object.values(country.currencies || {})[0]?.name || "Unknown",
      language:
        Object.values(country.languages || {})[0] || "Unknown",
    }));
  } catch (error) {
    console.error("🌍 Country List Fetch Error:", error);
    return [];
  }
};

export const fetchCountryDetails = async (countryName) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/name/${encodeURIComponent(countryName)}?fullText=true`
    );

    const country = response.data?.[0];

    return {
      name: country.name?.common || "Unknown",
      code: country.cca2 || "N/A",
      capital: country.capital?.[0] || "Unknown",
      lat: country.latlng?.[0] || null,
      lon: country.latlng?.[1] || null,
      flag: country.flags?.png || country.flags?.svg || "",
      population: country.population || "Unknown",
      region: country.region || "Unknown",
      subregion: country.subregion || "Unknown",
      currency:
        Object.values(country.currencies || {})[0]?.name || "Unknown",
      language:
        Object.values(country.languages || {})[0] || "Unknown",
    };
  } catch (error) {
    console.error("🌐 Country Fetch Error:", error);
    return null;
  }
};
