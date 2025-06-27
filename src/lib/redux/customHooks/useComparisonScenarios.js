import { useState, useEffect, useCallback, useRef } from 'react';
import scenarioService from '../../../app/dashboard/Optimise/service/scenarioService';

/**
 * Custom hook for managing scenario comparison data
 * @returns {Object} Functions and state for managing comparison data
 */
const useComparisonScenarios = () => {
  const [allScenarios, setAllScenarios] = useState([]);
  const [selectedScenarios, setSelectedScenarios] = useState([]);
  const [comparisonData, setComparisonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Use refs to track the latest filters and prevent unnecessary fetches
  const previousFiltersRef = useRef(null);
  const previousScenariosRef = useRef([]);
  
  // Flag to prevent initial data fetching
  const initialFetchDoneRef = useRef(false);

  // Fetch all scenarios
  const fetchAllScenarios = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the existing service to fetch scenarios
      const scenarios = await scenarioService.fetchScenariosForComparison();
      setAllScenarios(scenarios);
      return scenarios;
    } catch (error) {
      console.error("Error fetching scenarios:", error);
      setError("Failed to fetch scenarios. Please try again later.");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

// Helper to check if filters have changed
const areFiltersEqual = (filtersA, filtersB) => {
    if (!filtersA || !filtersB) return false;
    
    // Check scope, category, subCategory, activity
    if (filtersA.scope !== filtersB.scope) return false;
    if (filtersA.category !== filtersB.category) return false;
    if (filtersA.subCategory !== filtersB.subCategory) return false;
    if (filtersA.activity !== filtersB.activity) return false;
    
    // Check metrics array if present
    if (Array.isArray(filtersA.metrics) && Array.isArray(filtersB.metrics)) {
      if (filtersA.metrics.length !== filtersB.metrics.length) return false;
      if (!filtersA.metrics.every(metric => filtersB.metrics.includes(metric))) return false;
    }
    
    // Check scenario-specific metrics if present
    if (filtersA.scenarioMetrics || filtersB.scenarioMetrics) {
      const metricsA = filtersA.scenarioMetrics || {};
      const metricsB = filtersB.scenarioMetrics || {};
      
      // Compare scenario IDs
      const scenarioIdsA = Object.keys(metricsA);
      const scenarioIdsB = Object.keys(metricsB);
      
      if (scenarioIdsA.length !== scenarioIdsB.length) return false;
      
      // Check each scenario's metrics
      for (const scenarioId of scenarioIdsA) {
        if (!scenarioIdsB.includes(scenarioId)) return false;
        
        const scenarioMetricsA = metricsA[scenarioId] || [];
        const scenarioMetricsB = metricsB[scenarioId] || [];
        
        if (scenarioMetricsA.length !== scenarioMetricsB.length) return false;
        if (!scenarioMetricsA.every(metric => scenarioMetricsB.includes(metric))) return false;
      }
    }
    
    return true;
  };
  
  // Helper to check if scenario arrays are equal
  const areScenariosEqual = (scenariosA, scenariosB) => {
    if (!scenariosA || !scenariosB) return false;
    if (scenariosA.length !== scenariosB.length) return false;
    return scenariosA.every(id => scenariosB.includes(id));
  };

// Fetch comparison data for selected scenarios
const fetchComparisonData = useCallback(async (scenarioIds, filters = {}) => {
    if (!scenarioIds || scenarioIds.length === 0) {
      setComparisonData(null);
      return null;
    }
    
    // Skip if the request is identical to the previous one
    if (
      areScenariosEqual(scenarioIds, previousScenariosRef.current) && 
      areFiltersEqual(filters, previousFiltersRef.current) &&
      initialFetchDoneRef.current
    ) {
      console.log("Skipping duplicate fetch request");
      return comparisonData;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Extract scenario-specific metrics if available
      const scenarioMetrics = filters.scenarioMetrics || {};
      
      // Prepare the payload using the integrated service
      const payload = scenarioService.prepareComparisonPayload(
        scenarioIds, 
        filters, 
        scenarioMetrics
      );
      
      // Make the API call
      const data = await scenarioService.fetchComparisonData(payload);
      setComparisonData(data);
      
      // Update refs to track the latest request
      previousScenariosRef.current = [...scenarioIds];
      previousFiltersRef.current = {...filters};
      initialFetchDoneRef.current = true;
      
      return data;
    } catch (error) {
      console.error("Error fetching comparison data:", error);
      setError("Failed to fetch comparison data. Please try again later.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [comparisonData]);

  // Handle scenario selection
  const handleScenarioSelect = useCallback((scenarioId) => {
    setSelectedScenarios(prevSelected => {
      const newSelected = prevSelected.includes(scenarioId)
        ? prevSelected.filter(id => id !== scenarioId)
        : [...prevSelected, scenarioId];
      
      // Reset data when deselecting all scenarios
      if (newSelected.length === 0) {
        setComparisonData(null);
      }
      
      return newSelected;
    });
  }, []);

// Download comparison results
const handleDownloadResults = useCallback(async (filters = {}) => {
    if (selectedScenarios.length === 0) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Make sure we're passing scenario-specific metrics if available
      const downloadFilters = {
        ...filters,
        // If filter section metrics are provided, use them
        scenarioMetrics: filters.scenarioMetrics || {}
      };
      
      await scenarioService.downloadComparisonResults(selectedScenarios, downloadFilters);
    } catch (error) {
      console.error("Error downloading comparison results:", error);
      setError("Failed to download comparison results. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedScenarios]);

  // Fetch scenarios on component mount
  useEffect(() => {
    fetchAllScenarios();
  }, [fetchAllScenarios]);

  return {
    allScenarios,
    selectedScenarios,
    comparisonData,
    isLoading,
    error,
    fetchAllScenarios,
    fetchComparisonData,
    handleDownloadResults,
    handleScenarioSelect,
    setSelectedScenarios
  };
};

export default useComparisonScenarios;