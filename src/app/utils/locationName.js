import axiosInstance from "../utils/axiosMiddleware";

let locationCacheMap = new Map();
let fetchingLocationsPromise = null;

export const getLocationName = async (locationId) => {
  console.log('Received location ID:', locationId);

  if (!locationId) return '';

  // Check cache first
  if (locationCacheMap.has(locationId)) {
    return locationCacheMap.get(locationId);
  }

  // Check localStorage cache
  const cachedLocations = JSON.parse(localStorage.getItem('locationsCache')) || {};
  if (cachedLocations[locationId]) {
    locationCacheMap.set(locationId, cachedLocations[locationId]);
    return cachedLocations[locationId];
  }

  // Fetch locations if not cached
  if (!fetchingLocationsPromise) {
    fetchingLocationsPromise = axiosInstance.get("/sustainapp/get_location")
      .then(response => {
        // Populate cache
        response.data.forEach(loc => {
          locationCacheMap.set(loc.id, loc.name);
        });

        // Update localStorage
        const updatedCache = {};
        locationCacheMap.forEach((name, id) => {
          updatedCache[id] = name;
        });
        localStorage.setItem('locationsCache', JSON.stringify(updatedCache));

        fetchingLocationsPromise = null;
      })
      .catch(error => {
        console.error("Error fetching location names:", error);
        fetchingLocationsPromise = null;
      });
  }

  // Wait for the fetch promise to resolve
  await fetchingLocationsPromise;

  // Return the location name if available after the fetch
  return locationCacheMap.get(locationId) || '';
};
