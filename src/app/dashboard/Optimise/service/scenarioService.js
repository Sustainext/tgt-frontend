import axios from "axios";
import Cookies from "js-cookie";

// Base API URL - replace with your actual API base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL;

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return Cookies.get("token")?.replace(/"/g, "");
  }
  return "";
};

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token if available
// Fix: Apply the interceptor to the apiClient instance, not the global axios
apiClient.interceptors.request.use(
  async (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Scenario API endpoints
const SCENARIO_ENDPOINT = "/optimize/scenario/";

/**
 * Get all scenarios with optional filtering
 * @param {Object} filters - Optional filters for scenarios
 * @returns {Promise} Promise resolving to scenarios data
 */
export const fetchScenarios = async (filters = {}) => {
  try {
    // Convert filters object to URL query params
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (
        filters[key] !== null &&
        filters[key] !== undefined &&
        filters[key] !== ""
      ) {
        // Handle arrays for multi-select filters
        if (Array.isArray(filters[key]) && filters[key].length > 0) {
          filters[key].forEach((value) => queryParams.append(key, value));
        } else {
          queryParams.append(key, filters[key]);
        }
      }
    });

    const response = await apiClient.get(
      `${SCENARIO_ENDPOINT}?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching scenarios:", error);
    throw error;
  }
};

/**
 * Get a specific scenario by ID
 * @param {number} id - Scenario ID
 * @returns {Promise} Promise resolving to scenario data
 */
export const fetchScenarioById = async (id) => {
  try {
    const response = await apiClient.get(`${SCENARIO_ENDPOINT}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching scenario with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new scenario
 * @param {Object} scenarioData - New scenario data
 * @returns {Promise} Promise resolving to created scenario
 */
export const createScenario = async (scenarioData) => {
  try {
    // Transform data to match API requirements
    const payload = {
      name: scenarioData.name,
      scenario_by: scenarioData.selectionType?.toLowerCase() || "organization",
      base_year: parseInt(scenarioData.baseYear),
      target_year: parseInt(scenarioData.targetYear),
      organization: scenarioData.selectedOrg ? scenarioData.selectedOrg : "",
      corporate: scenarioData.selectedCorp ? scenarioData.selectedCorp : "",
    };

    const response = await apiClient.post(SCENARIO_ENDPOINT, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating scenario:", error);
    throw error;
  }
};

/**
 * Update an existing scenario
 * @param {number} id - Scenario ID
 * @param {Object} scenarioData - Updated scenario data
 * @returns {Promise} Promise resolving to updated scenario
 */
export const updateScenario = async (id, scenarioData) => {
  try {
    // Transform data to match API requirements
    const payload = {};

    // Only include fields that are present in the update data
    if (scenarioData.name) payload.name = scenarioData.name;
    if (scenarioData.scenario_by || scenarioData.selectionType) {
      payload.scenario_by =
        scenarioData.scenario_by ||
        scenarioData.selectionType?.toLowerCase() ||
        "organization";
    }
    if (scenarioData.baseYear)
      payload.base_year = parseInt(scenarioData.baseYear);
    if (scenarioData.targetYear)
      payload.target_year = parseInt(scenarioData.targetYear);
    if (scenarioData.selectedOrg)
      payload.organization = scenarioData.selectedOrg;
    if (scenarioData.selectedCorp)
      payload.corporate = scenarioData.selectedCorp;

    // Include metrics data if available
    if (scenarioData.metrics) {
      payload.metrics = scenarioData.metrics;
    }

    // Include activities data if available
    if (scenarioData.activities) {
      payload.activities = scenarioData.activities;
    }

    const response = await apiClient.patch(
      `${SCENARIO_ENDPOINT}${id}/`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating scenario with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a scenario
 * @param {number} id - Scenario ID to delete
 * @returns {Promise} Promise resolving to delete response
 */
export const deleteScenario = async (id) => {
  try {
    const response = await apiClient.delete(`${SCENARIO_ENDPOINT}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting scenario with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch business metrics for a scenario
 * @param {number} scenarioId - Scenario ID
 * @returns {Promise} Promise resolving to metrics data
 */
export const fetchScenarioMetrics = async (scenarioId) => {
    try {
      const response = await apiClient.get(
        `/optimize/${scenarioId}/businessmetric/`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching metrics for scenario ${scenarioId}:`, error);
      throw error;
    }
  };
  
  /**
   * Update business metrics for a scenario
   * @param {number} scenarioId - Scenario ID
   * @param {Object} payload - Metrics data with updates
   * @returns {Promise} Promise resolving to updated metrics
   */
  export const updateScenarioMetrics = async (scenarioId, payload) => {
    try {
      const response = await apiClient.patch(
        `/optimize/${scenarioId}/businessmetric/`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating metrics for scenario ${scenarioId}:`, error);
      throw error;
    }
  };
  
  /**
   * Transform metrics data from component format to API payload format
   * Utility function for when you need to send complete metrics data
   * @param {Object} metrics - Metrics data from component state
   * @returns {Object} API-formatted payload
   */
  export const formatMetricsPayload = (metrics) => {
    const payload = {};
    
    // Process each metric
    Object.keys(metrics).forEach(metricKey => {
      // Handle boolean toggle fields (e.g., "fte")
      if (!metricKey.includes('_')) {
        payload[metricKey] = metrics[metricKey];
      }
      
      // Handle data fields (e.g., "fte_data")
      if (metricKey.endsWith('_data')) {
        payload[metricKey] = metrics[metricKey];
      }
      
      // Handle weightage fields (e.g., "fte_weightage")
      if (metricKey.endsWith('_weightage')) {
        payload[metricKey] = metrics[metricKey];
      }
    });
    
    return payload;
  };

/**
 * Get activities for a scenario
 * @param {number} scenarioId - Scenario ID
 * @returns {Promise} Promise resolving to scenario activities
 */
export const fetchScenarioActivities = async (scenarioId) => {
    try {
      const response = await apiClient.get(
        `${SCENARIO_ENDPOINT}${scenarioId}/activities/`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching activities for scenario ${scenarioId}:`,
        error
      );
      throw error;
    }
  };
  
  /**
   * Update activities for a scenario
   * @param {number} scenarioId - Scenario ID
   * @param {Array} activities - Array of activity objects
   * @returns {Promise} Promise resolving to updated activities
   */
  export const updateScenarioActivities = async (scenarioId, activities) => {
    try {
      const response = await apiClient.put(
        `${SCENARIO_ENDPOINT}${scenarioId}/activities/`,
        { activities }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating activities for scenario ${scenarioId}:`,
        error
      );
      throw error;
    }
  };
  

const EMISSION_DATA_CHECK_ENDPOINT = 'optimize/emissiondataexists/'
export const checkEmissionDataExists = async (
  year,
  organization,
  corporate = null
) => {
  try {
    const payload = {
      year: parseInt(year),
      organization: organization,
    };

    // Add corporate to payload if provided
    if (corporate) {
      payload.corporate = corporate;
    }

    const response = await apiClient.post(
      EMISSION_DATA_CHECK_ENDPOINT,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error checking emission data availability:", error);
    throw error;
  }
};

export default {
  checkEmissionDataExists,
  fetchScenarios,
  fetchScenarioById,
  createScenario,
  updateScenario,
  deleteScenario,
  fetchScenarioActivities,
  updateScenarioActivities,
  fetchScenarioMetrics,
  updateScenarioMetrics,
};
