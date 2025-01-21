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
  // Adjust year if it's 2025
  const adjustedYear = year === "2025" || year === 2025 ? "2024" : year;

  const cacheKey = createCacheKey({
    subcategory,
    page,
    region,
    year: adjustedYear,
    customFetchExecuted,
  });

  // Check cache
  const now = Date.now();
  const cachedResponse = requestCache.get(cacheKey);
  if (cachedResponse && now - cachedResponse.timestamp < CACHE_TIMEOUT) {
    return cachedResponse.data;
  }

  let activitiesData = [];
  let wildcardActivitiesData = [];
  let yearlyResponseData = [];
  let customFetchData = [];

  // Helper function to make the API call
  const fetchData = async (params) => {
    // Ensure year is adjusted in the helper function as well
    if (params.year === "2025" || params.year === 2025) {
      params.year = "2024";
    }

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

  // Helper function to fetch all pages
  const fetchAllPages = async (params, initialResponse) => {
    const allResults = [...initialResponse.results];
    const totalPages = initialResponse.last_page;

    if (totalPages > 1) {
      const pagePromises = [];
      for (let pageNum = 2; pageNum <= totalPages; pageNum++) {
        pagePromises.push(
          fetchData({
            ...params,
            page: pageNum,
          })
        );
      }

      const pageResults = await Promise.all(pagePromises);
      pageResults.forEach((result) => {
        allResults.push(...result.results);
      });
    }

    return allResults;
  };

  try {
    // Initial fetch with region
    const initialData = await fetchData({
      subcategory,
      region,
      year: adjustedYear,
      page,
    });

    activitiesData = await fetchAllPages(
      { subcategory, region, year: adjustedYear },
      initialData
    );

    // Check if we need to do a wildcard search
    const totalResults = activitiesData.length;
    const totalPrivateResults = activitiesData.reduce(
      (count, activity) => count + (activity.access_type === "private" ? 1 : 0),
      0
    );

    const effectiveCount = totalResults - totalPrivateResults;

    if (effectiveCount <= 5) {
      // Wildcard search
      const wildcardInitialData = await fetchData({
        subcategory,
        page,
        region: "*",
        year: adjustedYear,
      });

      wildcardActivitiesData = await fetchAllPages(
        { subcategory, region: "*", year: adjustedYear },
        wildcardInitialData
      );

      if (wildcardInitialData.last_page === 0) {
        // Historical data search
        for (let i = parseInt(adjustedYear) - 1; i >= 2019; i--) {
          const yearlyInitialData = await fetchData({
            subcategory,
            page,
            region,
            year: i,
          });

          if (yearlyInitialData.results.length > 0) {
            yearlyResponseData = await fetchAllPages(
              { subcategory, region, year: i },
              yearlyInitialData
            );
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
      const customFetchPromises = categoryMappings[subcategory].map(async (entry) => {
        const initialCustomData = await fetchData({
          subcategory,
          page,
          year: entry.year === "2025" || entry.year === 2025 ? "2024" : entry.year,
          source: entry.source,
        });

        return fetchAllPages(
          {
            subcategory,
            year: entry.year === "2025" || entry.year === 2025 ? "2024" : entry.year,
            source: entry.source,
          },
          initialCustomData
        );
      });

      const customResults = await Promise.all(customFetchPromises);
      customFetchData = customResults.flat();
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
      totalPages: 1, // Since we're returning all results, we set totalPages to 1
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