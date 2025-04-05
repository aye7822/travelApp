const fetch = require("node-fetch");

exports.handler = async (event) => {
  const countryName = event.queryStringParameters.name;

  if (!countryName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing country name" }),
    };
  }

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: "Country not found" }),
      };
    }

    const data = await res.json();
    const country = data[0];

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
    console.error("Serverless function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
