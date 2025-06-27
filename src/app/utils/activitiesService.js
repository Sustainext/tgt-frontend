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