import {
  categoriesToAppend,
  categoryMappings,
} from "../shared/data/customActivities";

// Cache for storing API responses
const requestCache = new Map();
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

const createCacheKey = (params) => {
  return JSON.stringify(params);
};

export async function fetchClimatiqActivities({
  subcategory,
  page = 1,
  region,
  year,
  customFetchExecuted = false,
}) {
  const cacheKey = createCacheKey({
    subcategory,
    page,
    region,
    year,
    customFetchExecuted,
  });

  // Check cache
  const now = Date.now();
  const cachedResponse = requestCache.get(cacheKey);
  if (cachedResponse && now - cachedResponse.timestamp < CACHE_TIMEOUT) {
    return cachedResponse.data;
  }

  let activitiesData = [];
  let totalPages = 1;
  let wildcardActivitiesData = [];
  let yearlyResponseData = [];
  let customFetchData = [];

  // Helper function to make the API call
  const fetchData = async (params) => {
    if (
      params.region &&
      !params.region.endsWith("*") &&
      params.region !== "*"
    ) {
      params.region = `${params.region}*`;
    }

    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/api/climatiq?${queryString}`);
    if (!response.ok) {
      throw new Error("Failed to fetch activities");
    }
    return response.json();
  };

  try {
    // Initial fetch with region
    const initialData = await fetchData({
      subcategory,
      page,
      region,
      year,
    });

    activitiesData = initialData.results;
    totalPages = initialData.last_page;

    // Check if we need to do a wildcard search
    const totalResults = initialData.results.length;
    const totalPrivateResults = activitiesData.reduce(
      (count, activity) => count + (activity.access_type === "private" ? 1 : 0),
      0
    );

    const effectiveCount = totalResults - totalPrivateResults;

    if (effectiveCount <= 5) {
      // Wildcard search
      const wildcardData = await fetchData({
        subcategory,
        page,
        region: "*",
        year,
      });

      wildcardActivitiesData = wildcardData.results;
      totalPages = wildcardData.last_page;

      if (wildcardData.last_page === 0) {
        // Historical data search
        for (let i = parseInt(year) - 1; i >= 2019; i--) {
          const yearlyData = await fetchData({
            subcategory,
            page,
            region,
            year: i,
          });

          if (yearlyData.results.length > 0) {
            yearlyResponseData = yearlyData.results;
            break;
          }
        }
      }
    }

    // Custom activities fetch if needed
    if (
      categoriesToAppend.includes(subcategory) &&
      categoryMappings[subcategory] &&
      !customFetchExecuted
    ) {
      // Use Promise.all to fetch custom activities in parallel
      const customFetchPromises = categoryMappings[subcategory].map((entry) =>
        fetchData({
          subcategory,
          page,
          year: entry.year,
          source: entry.source,
        })
      );

      const customResults = await Promise.all(customFetchPromises);
      customFetchData = customResults.flatMap((result) => result.results);
    }

    // Combine all results
    const combinedResults = [
      ...activitiesData,
      ...wildcardActivitiesData,
      ...yearlyResponseData,
      ...customFetchData,
    ];

    // Sort results
    combinedResults.sort((a, b) => {
      if (a.access_type === "private" && b.access_type !== "private") return -1;
      if (a.access_type !== "private" && b.access_type === "private") return 1;
      return a.name.localeCompare(b.name);
    });

    const result = {
      results: combinedResults,
      totalPages,
      hasCustomData: customFetchData.length > 0,
    };

    // Cache the result
    requestCache.set(cacheKey, {
      data: result,
      timestamp: now,
    });

    // Clean up old cache entries
    for (const [key, value] of requestCache.entries()) {
      if (now - value.timestamp > CACHE_TIMEOUT) {
        requestCache.delete(key);
      }
    }

    return result;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
}
