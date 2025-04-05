import axios from "axios";

export const fetchCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");

    return response.data.map((country) => ({
      name: country.name?.common || "Unknown",
      code: country.cca2 || "N/A",
      capital: country.capital?.[0] || "Unknown",
      lat: country.latlng?.[0] || null,
      lon: country.latlng?.[1] || null,
      flag: country.flags?.png || country.flags?.svg || "",
    }));
  } catch (error) {
    console.error("Country List Fetch Error:", error);
    return [];
  }
};



export const fetchCountryDetails = async (countryName) => {
  try {
    const response = await axios.get(`/api/get-country?name=${countryName}`);
    const country = response.data;

    return {
      name: country.name || "Unknown",
      code: country.code || "N/A",
      capital: country.capital || "Unknown",
      lat: country.lat || null,
      lon: country.lon || null,
      flag: country.flag || "",
      population: country.population || "Unknown",
      region: country.region || "Unknown",
      subregion: country.subregion || "Unknown",
      currency: country.currency || "Unknown",
      language: country.language || "Unknown",
    };
  } catch (error) {
    console.error("🌐 Country Fetch Error:", error);
    return null;
  }
};
