import axios from "axios";
export const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) throw new Error(`Country API error: ${response.statusText}`);

    const data = await response.json();

    return data.map((country) => ({
      name: country.name?.common || "Unknown", 
      code: country.cca2 || "N/A", 
      capital: country.capital?.[0] || "Unknown", 
      lat: country.latlng?.[0] || null, 
      lon: country.latlng?.[1] || null, 
      flag: country.flags?.png || country.flags?.svg || "", 
    }));
  } catch (error) {
    console.error(" Country List Fetch Error:", error);
    return [];
  }
};


export const fetchCountryDetails = async (countryName) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
    if (!response.ok) throw new Error(`Country API error: ${response.statusText}`);

    const data = await response.json();
    const country = data[0];

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
      currency: country.currencies
        ? Object.values(country.currencies)[0].name
        : "Unknown", 
      language: country.languages
        ? Object.values(country.languages).join(", ")
        : "Unknown", 
    };
  } catch (error) {
    console.error(" Country Fetch Error:", error);
    return null;
  }
};
