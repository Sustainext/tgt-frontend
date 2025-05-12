import { 
  categoriesToAppend, 
  categoryMappings, 
  shouldFetchFromCustomMapping 
} from "../shared/data/customActivities";  

// Cache for storing API responses
const requestCache = new Map();
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

const createCacheKey = (params) => JSON.stringify(params);

export async function fetchClimatiqActivities({ 
  subcategory, 
  unit_type='*',
  page = 1, 
  region, 
  year, 
  customFetchExecuted = false, 
}) {
  console.log(`\n=== fetchClimatiqActivities called ===`);
  console.log(`Params:`, { subcategory, unit_type, page, region, year }); // Log unit_type

  // Adjust year if it's 2025
  const adjustedYear = year === "2025" || year === 2025 ? "2024" : year;
  
  const cacheKey = createCacheKey({ 
    subcategory, 
    unit_type, // Include unit_type in cache key
    page, 
    region, 
    year: adjustedYear
  });

  // Check cache with single return point
  const now = Date.now();
  if (requestCache.has(cacheKey)) {
    const cachedResponse = requestCache.get(cacheKey);
    if (now - cachedResponse.timestamp < CACHE_TIMEOUT) {
      console.log(`Returning cached data for key: ${cacheKey}`);
      return cachedResponse.data;
    }
  }

  let activitiesData = [];
  let wildcardActivitiesData = [];
  let yearlyResponseData = [];
  let customFetchData = [];
  let wildcardFetched = false; // Prevent multiple wildcard fetches

  // Helper function to make the API call
  const fetchData = async (params) => {
    console.log(`Fetching data with params:`, params);

    // Adjust year for Electricity
    if (params.year === "2024" && params.subcategory === "Electricity") {
      params.year = "2023";
    }

    // Append '*' to the region if needed
    if (params.region && !params.region.endsWith("*") && params.region !== "*") {
      params.region = `${params.region}*`;
    }

    const queryString = new URLSearchParams(params).toString();
    console.log(`Final API Request: /api/climatiq?${queryString}`);

    const response = await fetch(`/api/climatiq?${queryString}`);
    if (!response.ok) {
      console.error("API request failed:", response.statusText);
      throw new Error("Failed to fetch activities");
    }
    return response.json();
  };

  // Helper function to fetch all pages
  const fetchAllPages = async (params, initialResponse) => {
    console.log(`Fetching all pages for`, params);
    const allResults = [...initialResponse.results];
    const totalPages = initialResponse.last_page;

    if (totalPages > 1) {
      const pagePromises = [];
      for (let pageNum = 2; pageNum <= totalPages; pageNum++) {
        console.log(`Fetching additional page: ${pageNum}`);
        pagePromises.push(
          fetchData({ ...params, page: pageNum })
        );
      }

      const pageResults = await Promise.all(pagePromises);
      pageResults.forEach((result) => {
        allResults.push(...result.results);
      });
    }

    console.log(`Fetched ${allResults.length} results across all pages.`);
    return allResults;
  };

  try {
    console.log(`Starting initial data fetch...`);
    
    // Initial fetch with region and unit_type
    const initialData = await fetchData({ 
      subcategory, 
      unit_type, // Pass unit_type to API
      region, 
      year: adjustedYear, 
      page, 
    });

    console.log(`Initial fetch returned ${initialData.results.length} results.`);
    activitiesData = await fetchAllPages(
      { subcategory, unit_type, region, year: adjustedYear }, // Include unit_type
      initialData
    );

    // Check if we need to do a wildcard search
    const totalResults = activitiesData.length;
    const totalPrivateResults = activitiesData.reduce(
      (count, activity) => count + (activity.access_type === "private" ? 1 : 0),
      0
    );
    const effectiveCount = totalResults - totalPrivateResults;

    console.log(`Total Results: ${totalResults}, Private Results: ${totalPrivateResults}, Effective Count: ${effectiveCount}`);

    if (effectiveCount <= 5 && !wildcardFetched) {
      console.log(`Performing wildcard search...`);
      wildcardFetched = true; // Prevent second wildcard fetch
      const wildcardInitialData = await fetchData({
        subcategory,
        unit_type, // Include unit_type in wildcard search
        page,
        region: "*",
        year: adjustedYear,
      });

      wildcardActivitiesData = await fetchAllPages(
        { subcategory, unit_type, region: "*", year: adjustedYear }, // Include unit_type
        wildcardInitialData
      );

      wildcardActivitiesData = wildcardActivitiesData.filter(
        (activity) => activity.access_type !== "private"
      );
    }

    // Custom Fetch Logic
    if (
      categoriesToAppend.includes(subcategory) &&
      categoryMappings[subcategory] &&
      !customFetchExecuted
    ) {
      console.log(`Fetching custom category mappings...`);
      const customFetchPromises = categoryMappings[subcategory]
        .filter((entry) => {
          if (!entry.checkConditions) return true;
          return shouldFetchFromCustomMapping(entry, {
            year: adjustedYear,
            region,
            unit_type, // Pass unit_type to condition check
          });
        })
        .map(async (entry) => {
          console.log(`Fetching custom data from source: ${entry.source}`);
          const initialCustomData = await fetchData({
            subcategory,
            unit_type, // Include unit_type in custom fetch
            page,
            year: entry.year,
            source: entry.source,
            ...(entry.category && { category: entry.category }),
            ...(entry.region && { region: entry.region }),
          });

          return fetchAllPages(
            { 
              subcategory, 
              unit_type, // Include unit_type
              year: entry.year, 
              source: entry.source 
            },
            initialCustomData
          );
        });

      const customResults = await Promise.all(customFetchPromises);
      customFetchData = customResults.flat();
    }

    // Combine and sort results
    const combinedResults = [
      ...activitiesData,
      ...wildcardActivitiesData,
      ...yearlyResponseData,
      ...customFetchData,
    ].sort((a, b) => {
      const nameA = (a.name || "").toLowerCase();
      const nameB = (b.name || "").toLowerCase();
      return nameA.localeCompare(nameB);
    });

    console.log(`Total combined results: ${combinedResults.length}`);

    const result = {
      results: combinedResults,
      totalPages: 1,
      hasCustomData: customFetchData.length > 0,
    };

    // Cache the result
    requestCache.set(cacheKey, { data: result, timestamp: now });

    // Clear cache when subcategory or unit_type changes
    requestCache.forEach((value, key) => {
      if (
        !key.includes(`"subcategory":"${subcategory}"`) || 
        (unit_type && !key.includes(`"unit_type":"${unit_type}"`))
      ) {
        requestCache.delete(key);
      }
    });

    console.log(`Returning final data set with ${result.results.length} results.`);
    return result;

  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
}