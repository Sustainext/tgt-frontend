// apiMiddleware.js
// Redux middleware to manage API calls, caching, and request deduplication

import { createCacheKey, makeDedupedRequest } from './apiRequestManager';

// Constants for action types
export const API_REQUEST = 'api/request';
export const API_SUCCESS = 'api/success';
export const API_FAILURE = 'api/failure';
export const API_RESET = 'api/reset';
export const CACHE_CLEAR = 'api/cacheClear';

// Create middleware
export const apiMiddleware = store => next => action => {
  // Pass non-API actions through
  if (action.type !== API_REQUEST) {
    return next(action);
  }
  
  const {
    endpoint,
    method = 'GET',
    body,
    params,
    headers,
    onSuccess,
    onFailure,
    skipCache = false,
    meta = {},
  } = action.payload;
  
  // Create a unique cache key for this request
  const cacheKey = createCacheKey({
    endpoint,
    method,
    ...params
  });
  
  // Check if we have this data in the cache already
  const state = store.getState();
  const cachedData = state.api?.cache?.[cacheKey];
  
  if (cachedData && !skipCache) {
    console.log(`Using cached data for ${cacheKey}`);
    
    // Dispatch success with cached data
    if (onSuccess) {
      store.dispatch({ type: onSuccess, payload: cachedData, meta });
    }
    
    return Promise.resolve(cachedData);
  }
  
  // Inform the app that we're loading data
  next({
    type: API_REQUEST,
    meta: {
      ...meta,
      cacheKey
    }
  });
  
  // Create the actual API call function
  const apiCallFn = async () => {
    const url = new URL(endpoint);
    
    // Add query parameters if any
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value);
        }
      });
    }
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined
    });
    
    if (!response.ok) {
      throw new Error(`API error ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  };
  
  // Make the deduped request
  return makeDedupedRequest(
    cacheKey,
    apiCallFn,
    // On success
    (data) => {
      // Dispatch success action
      store.dispatch({
        type: API_SUCCESS,
        payload: {
          cacheKey,
          data
        },
        meta
      });
      
      // Dispatch user-defined success action if provided
      if (onSuccess) {
        store.dispatch({ type: onSuccess, payload: data, meta });
      }
    },
    // On error
    (error) => {
      // Dispatch failure action
      store.dispatch({
        type: API_FAILURE,
        payload: {
          cacheKey,
          error: error.message
        },
        meta,
        error: true
      });
      
      // Dispatch user-defined error action if provided
      if (onFailure) {
        store.dispatch({ type: onFailure, payload: error, meta, error: true });
      }
    }
  );
};

// Action creators
export const apiRequest = (config) => ({
  type: API_REQUEST,
  payload: config
});

export const clearApiCache = (pattern) => ({
  type: CACHE_CLEAR,
  payload: pattern
});

export const resetApi = () => ({
  type: API_RESET
});

// Reducer to handle API state
export const apiReducer = (state = { loading: {}, cache: {}, errors: {} }, action) => {
  switch (action.type) {
    case API_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.meta.cacheKey]: true
        }
      };
    
    case API_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.cacheKey]: false
        },
        cache: {
          ...state.cache,
          [action.payload.cacheKey]: action.payload.data
        },
        errors: {
          ...state.errors,
          [action.payload.cacheKey]: null
        }
      };
    
    case API_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.cacheKey]: false
        },
        errors: {
          ...state.errors,
          [action.payload.cacheKey]: action.payload.error
        }
      };
    
    case CACHE_CLEAR:
      if (!action.payload) {
        // Clear entire cache
        return {
          ...state,
          cache: {}
        };
      }
      
      // Clear only matching cache entries
      const pattern = action.payload;
      const newCache = { ...state.cache };
      
      Object.keys(newCache).forEach(key => {
        if (key.includes(pattern)) {
          delete newCache[key];
        }
      });
      
      return {
        ...state,
        cache: newCache
      };
    
    case API_RESET:
      return {
        loading: {},
        cache: {},
        errors: {}
      };
    
    default:
      return state;
  }
};