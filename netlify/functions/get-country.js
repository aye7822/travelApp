const axios = require("axios");

exports.handler = async (event) => {
  const countryName = event.queryStringParameters.name;

  if (!countryName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing country name" }),
    };
  }

  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    );

    const country = response.data[0];

    return {
      statusCode: 200,
      body: JSON.stringify({
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
      }),
    };
  } catch (error) {
    console.error("Serverless function error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch country details" }),
    };
  }
};
