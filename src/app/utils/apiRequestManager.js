// A centralized request manager to handle API call deduplication

// In-memory tracking of pending requests by cache key
const pendingRequests = new Map();

/**
 * Makes an API call and ensures only one request is in flight for identical parameters
 * 
 * @param {string} cacheKey - Unique identifier for this request
 * @param {Function} apiCallFn - The actual API call function that returns a promise
 * @param {Function} onSuccess - Optional callback for successful responses
 * @param {Function} onError - Optional callback for error handling
 * @returns {Promise} - Promise that resolves with the API response
 */
export const makeDedupedRequest = async (cacheKey, apiCallFn, onSuccess, onError) => {
  // If a request with this key is already in flight, return that promise
  if (pendingRequests.has(cacheKey)) {
    console.log(`Request already in progress for key: ${cacheKey}, reusing promise`);
    return pendingRequests.get(cacheKey);
  }

  // Create a new promise for this request
  const requestPromise = (async () => {
    try {
      console.log(`Making API call for key: ${cacheKey}`);
      const result = await apiCallFn();
      
      // Call success callback if provided
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(result);
      }
      
      return result;
    } catch (error) {
      console.error(`API request failed for key: ${cacheKey}`, error);
      
      // Call error callback if provided
      if (onError && typeof onError === 'function') {
        onError(error);
      }
      
      throw error;
    } finally {
      // Always remove the request from pending map when done
      pendingRequests.delete(cacheKey);
      console.log(`Removed completed request for key: ${cacheKey}`);
    }
  })();

  // Store the promise in our map
  pendingRequests.set(cacheKey, requestPromise);
  
  return requestPromise;
};

/**
 * Creates a unique cache key for API requests
 * 
 * @param {Object} params - Request parameters to include in the key
 * @returns {string} - A unique string key
 */
export const createCacheKey = (params) => {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}:${value}`)
    .join('::');
};

/**
 * Gets the number of currently pending requests
 * 
 * @returns {number} - Count of pending requests
 */
export const getPendingRequestCount = () => {
  return pendingRequests.size;
};

/**
 * Checks if a request with the given key is currently pending
 * 
 * @param {string} cacheKey - The key to check
 * @returns {boolean} - True if the request is pending
 */
export const isRequestPending = (cacheKey) => {
  return pendingRequests.has(cacheKey);
};

/**
 * For debugging: get a list of all pending request keys
 * 
 * @returns {string[]} - Array of pending request keys
 */
export const getPendingRequestKeys = () => {
  return Array.from(pendingRequests.keys());
};