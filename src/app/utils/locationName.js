import axiosInstance from "../utils/axiosMiddleware";

let locationCache = null; // Store location data globally
let fetchPromise = null;  // Store fetch promise to prevent duplicate requests

// Function to fetch locations only once
const fetchLocations = async () => {
  if (!fetchPromise) {
    fetchPromise = axiosInstance.get("/sustainapp/get_location")
      .then(response => {
        locationCache = response.data;
        return locationCache;
      })
      .catch(error => {
        console.error("Error fetching locations:", error);
        return [];
      });
  }
  return fetchPromise; // Return the same promise if called multiple times
};

// Function to get location name
export const getLocationName = async (locationId) => {
  if (!locationId) return ''; // Return early if no locationId is provided

  if (!locationCache) {
    await fetchLocations(); // Ensure cache is loaded
  }

  const location = locationCache?.find(loc => loc.id === parseInt(locationId));
  return location ? location.name : '';
};
