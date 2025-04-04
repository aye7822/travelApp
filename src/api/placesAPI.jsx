import axios from "axios";


const API_KEY = import.meta.env.VITE_FOURSQUARE_API_KEY;
const BASE_URL = "https://api.foursquare.com/v3/places";

export const fetchLandmarks = async (countryName) => {
  if (!API_KEY) {
    console.error("❌ Places API Key is missing!");
    return [];
  }

  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      headers: {
        Authorization: API_KEY,
        Accept: "application/json",
      },
      params: {
        near: countryName,
        limit: 50,
        categories: "16000",
      },
    });

    const placesData = response.data.results;

    const placesWithDetails = await Promise.all(
      placesData.map(async (place) => {
        try {
          const [photoRes, detailsRes] = await Promise.all([
            axios.get(`${BASE_URL}/${place.fsq_id}/photos`, {
              headers: {
                Authorization: API_KEY,
                Accept: "application/json",
              },
            }),
            axios.get(`${BASE_URL}/${place.fsq_id}`, {
              headers: {
                Authorization: API_KEY,
                Accept: "application/json",
              },
            }),
          ]);

          return {
            id: place.fsq_id,
            name: place.name || "Unknown Landmark",
            photoUrl:
              photoRes.data.length > 0
                ? `${photoRes.data[0].prefix}original${photoRes.data[0].suffix}`
                : null,
            description: detailsRes.data.description || "No description available",
            address:
              detailsRes.data.location?.formatted_address || "Address not available",
          };
        } catch (error) {
          console.error(`Error fetching details for ${place.name}:`, error);
          return {
            id: place.fsq_id,
            name: place.name || "Unknown Landmark",
            photoUrl: null,
            description: "No description available",
            address: "Address not available",
          };
        }
      })
    );

    return placesWithDetails;
  } catch (error) {
    console.error(" Landmark Fetch Error:", error);
    return [];
  }
};

export const fetchLandmarkById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: API_KEY,
        Accept: "application/json",
      },
    });

    const landmarkData = response.data;

    return {
      id: landmarkData.fsq_id,
      name: landmarkData.name || "Unknown Landmark",
      photoUrl:
        landmarkData.photos?.length > 0
          ? `${landmarkData.photos[0].prefix}original${landmarkData.photos[0].suffix}`
          : null,
      description: landmarkData.description || "No description available",
      address: landmarkData.location?.formatted_address || "Address not available",
      lat: landmarkData.geocodes?.main?.latitude || null,
      lon: landmarkData.geocodes?.main?.longitude || null,
    };
  } catch (error) {
    console.error(" Error fetching landmark details:", error);
    return null;
  }
}
export const fetchNearbyRestaurants = async (lat, lon) => {
  if (!API_KEY) {
    console.error(" Places API Key is missing!");
    return [];
  }

  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      headers: {
        Authorization: API_KEY,
        Accept: "application/json",
      },
      params: {
        ll: `${lat},${lon}`,
        categories: "13065", 
        limit: 20,
        radius: 2000, 
        sort: "DISTANCE",
      },
    });

    return response.data.results.map((place) => ({
      id: place.fsq_id,
      name: place.name,
      address: place.location?.formatted_address || "Address not available",
      category: place.categories?.[0]?.name || "Restaurant",
    }));
  } catch (error) {
    console.error(" Error fetching nearby restaurants:", error);
    return [];
  }
};

