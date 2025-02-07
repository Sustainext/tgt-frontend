// locationUtils.js
import axiosInstance from "../utils/axiosMiddleware";

let locationCache = [];

export const getLocationName = async (locationId) => {
  console.log('id received for location name',locationId)
  // Return empty if no locationId provided
  if (!locationId) return '';
  
  try {
    // If cache is empty, fetch locations first
    if (locationCache.length === 0) {
      const response = await axiosInstance.get("/sustainapp/get_location");
      locationCache = response.data;
    }

    // Find and return location name
    const location = locationCache.find(loc => loc.id === parseInt(locationId));
    return location ? location.name : '';
  } catch (error) {
    console.error("Error getting location name:", error);
    return '';
  }
};