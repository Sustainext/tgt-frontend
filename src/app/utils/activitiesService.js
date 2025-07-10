// A centralized service for fetching and managing activities data

import { createCacheKey, makeDedupedRequest } from './apiRequestManager';
import { fetchClimatiqActivities } from './climatiqApi';

// In-memory cache with timestamps
const activitiesCache = new Map();
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes

/**
 * Get activities for a given category/subcategory, using cache where possible
 * 
 * @param {Object} params - Request parameters
 * @param {string} params.category - The category 
 * @param {string} params.subcategory - The subcategory
 * @param {string} params.countryCode - The country code
 * @param {string} params.year - The year
 * @param {boolean} params.skipCache - Whether to bypass cache
 * @returns {Promise<Array>} - Promise resolving to activities array
 */
export const getActivities = async ({
  category,
  subcategory,
  countryCode,
  year,
  skipCache = false
}) => {
  if (!subcategory) {
    return Promise.resolve([]);
  }
  
  // Create a cache key for this request
  const cacheKey = createCacheKey({
    category,
    subcategory,
    countryCode, 
    year
  });
  
  // Check cache unless skipCache is true
  if (!skipCache) {
    const cachedData = getCachedActivities(cacheKey);
    if (cachedData) {
      console.log(`Using cached activities for: ${cacheKey}`);
      return Promise.resolve(cachedData);
    }
  }
  
  // Define the actual API call function
  const apiCallFn = async () => {
    console.log(`Fetching activities from API for: ${cacheKey}`);
    const response = await fetchClimatiqActivities({
      subcategory,
      region: countryCode,
      year
    });
    
    const activities = response?.results || response;
    return activities;
  };
  
  // Make the request with deduplication
  return makeDedupedRequest(
    cacheKey,
    apiCallFn,
    // onSuccess callback to save to cache
    (activities) => {
      saveCachedActivities(cacheKey, activities);
    }
  );
};

/**
 * Get activities from cache if available and not expired
 * 
 * @param {string} cacheKey - The cache key
 * @returns {Array|null} - Activities array or null if not in cache
 */
const getCachedActivities = (cacheKey) => {
  if (!activitiesCache.has(cacheKey)) {
    return null;
  }
  
  const { data, timestamp } = activitiesCache.get(cacheKey);
  const now = Date.now();
  
  // Check if cache has expired
  if (now - timestamp > CACHE_EXPIRY) {
    console.log(`Cache expired for key: ${cacheKey}`);
    activitiesCache.delete(cacheKey);
    return null;
  }
  
  return data;
};

/**
 * Save activities to cache with timestamp
 * 
 * @param {string} cacheKey - The cache key
 * @param {Array} activities - The activities array to cache
 */
const saveCachedActivities = (cacheKey, activities) => {
  activitiesCache.set(cacheKey, {
    data: activities,
    timestamp: Date.now()
  });
  console.log(`Saved ${activities.length} activities to cache for: ${cacheKey}`);
};

/**
 * Clear all expired entries from the cache
 */
export const pruneExpiredCache = () => {
  const now = Date.now();
  let deletedCount = 0;
  
  activitiesCache.forEach((value, key) => {
    if (now - value.timestamp > CACHE_EXPIRY) {
      activitiesCache.delete(key);
      deletedCount++;
    }
  });
  
  console.log(`Pruned ${deletedCount} expired cache entries`);
};

/**
 * Clear activities cache for a specific subcategory or pattern
 * 
 * @param {string} pattern - Optional pattern to match for selective clearing
 * @returns {number} - Number of cleared cache entries
 */
export const clearActivitiesCache = (pattern) => {
  if (!pattern) {
    const count = activitiesCache.size;
    activitiesCache.clear();
    return count;
  }
  
  let deletedCount = 0;
  activitiesCache.forEach((_, key) => {
    if (key.includes(pattern)) {
      activitiesCache.delete(key);
      deletedCount++;
    }
  });
  
  return deletedCount;
};

/**
 * Get cache statistics for debugging
 * 
 * @returns {Object} - Cache statistics
 */
export const getActivitiesCacheStats = () => {
  return {
    size: activitiesCache.size,
    keys: Array.from(activitiesCache.keys()),
    totalEntries: activitiesCache.size,
    memory: JSON.stringify(Array.from(activitiesCache.entries())).length
  };
};

// Add this function to activitiesService.js

/**
 * Find an activity by its details from the activities data
 * 
 * @param {Object} params - Search parameters
 * @param {string} params.activityName - The activity name
 * @param {string} params.source - The activity source
 * @param {string} params.year - The year
 * @param {string} params.region - The region
 * @param {string} params.source_lca_activity - The LCA activity (optional)
 * @param {string} params.subcategory - The subcategory to search in
 * @param {string} params.category - The category
 * @param {string} params.countryCode - The country code
 * @returns {Promise<Object|null>} - Promise resolving to activity object or null
 */
export const findActivityByDetails = async ({
  activityName,
  source,
  year,
  region,
  source_lca_activity,
  subcategory,
  category,
  countryCode
}) => {
  try {
    // First get all activities for this subcategory
    const activities = await getActivities({
      category,
      subcategory,
      countryCode,
      year
    });

    // Search for the activity that matches the provided details
    const foundActivity = activities.find(activity => {
      const nameMatch = activity.name === activityName;
      const sourceMatch = activity.source === source;
      const yearMatch = activity.year.toString() === year.toString();
      const regionMatch = activity.region === region;
      
      // Handle source_lca_activity - it might be "unknown" or undefined
      const lcaMatch = source_lca_activity ? 
        activity.source_lca_activity === source_lca_activity :
        (activity.source_lca_activity === "unknown" || !activity.source_lca_activity);

      return nameMatch && sourceMatch && yearMatch && regionMatch && lcaMatch;
    });


    if (foundActivity) {
      console.log('Found activity by details:', foundActivity);
      return foundActivity;
    } else {
      console.log('No activity found matching the provided details');
      return null;
    }
  } catch (error) {
    console.error('Error finding activity by details:', error);
    return null;
  }
};

/**
 * Parse activity string and extract details
 * 
 * @param {string} activityString - The full activity string
 * @returns {Object|null} - Parsed activity details or null
 */
export const parseActivityString = (activityString) => {s
  if (!activityString) return null;

  // Split by ' - ' (the separator)
  const parts = activityString.split(' - ').map(p => p.trim());
  
  // Find the index of the first part with parenthesis (source)
  let sourceIdx = null;
  for (let i = 0; i < parts.length; i++) {
    if (/^\(.*\)$/.test(parts[i])) {  // e.g. '(UBA)', '(IPCC)'
      sourceIdx = i;
      break;
    }
  }
  
  if (sourceIdx === null || sourceIdx + 4 > parts.length - 1) {
    console.warn('Could not parse activity string reliably:', activityString);
    return null;
  }
  
  // Compose fields based on source index
  const activityName = parts.slice(0, sourceIdx).join(' - ');  // Join in case name had hyphens
  const source = parts[sourceIdx].replace(/[()]/g, ''); // Remove parentheses
  const unitType = parts[sourceIdx + 1];
  const region = parts[sourceIdx + 2];
  const year = parts[sourceIdx + 3];
  const source_lca_activity = parts[sourceIdx + 4] || null; // May not always exist
  
  return {
    activityName,
    source,
    unitType,
    region,
    year,
    source_lca_activity
  };
};

