'use client'
import React, { useState, useEffect, useCallback } from "react";
import ScenarioSearch from "./ScenarioSearch";
import ComparisonView from "./ComparisonView";
import EmptyState from "./EmptyState";
import LoadingSpinner from "./LoadingSpinner";
import NoScenarioSelected from "./NoScenarioSelected";
import useComparisonScenarios from "../../../../lib/redux/customHooks/useComparisonScenarios";

/**
 * Main Scenario Comparison Page
 * Allows users to select and compare different scenarios with visualizations
 */
const CompareScenarios = () => {
  // Local state
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Set up filters with proper structure for multi-select
  const [filters, setFilters] = useState({
    scope: ["Aggregated Scope"],
    category: ["Aggregated Scope"],
    subCategory: ["Aggregated Scope"],
    activity: ["Aggregated Scope"],
    metrics: [],
    scenarioMetrics: {} // Store metrics specific to each scenario
  });
  
  // This flag will prevent initial API calls when the component mounts
  const [shouldFetchData, setShouldFetchData] = useState(false);
  
  // Use custom hook for scenario data
  const {
    allScenarios,
    selectedScenarios,
    comparisonData,
    isLoading,
    error,
    fetchComparisonData,
    handleDownloadResults,
    handleScenarioSelect
  } = useComparisonScenarios();

  // Memoize the handleScenarioSelect to avoid recreating it on every render
  const onScenarioSelect = useCallback((scenarioId) => {
    handleScenarioSelect(scenarioId);
    // Enable data fetching when a scenario is selected
    setShouldFetchData(true);
  }, [handleScenarioSelect]);

  // Fetch comparison data when filters or selectedScenarios change
  useEffect(() => {
    // Only fetch if we have selected scenarios and shouldFetchData is true
    if (selectedScenarios.length > 0 && shouldFetchData) {
      console.log("Fetching comparison data with filters:", filters);
      fetchComparisonData(selectedScenarios, filters);
    }
  }, [selectedScenarios, filters, fetchComparisonData, shouldFetchData]);

  // Handle filter changes from ComparisonView
  const handleFilterChange = useCallback((newFilters) => {
    console.log("Filter change detected:", newFilters);
    
    // Update filters, maintaining arrays for multi-select
    setFilters(prev => {
      const updated = { ...prev };
      
      // Process each filter type
      Object.entries(newFilters).forEach(([key, value]) => {
        // Ensure value is an array
        updated[key] = Array.isArray(value) ? value : [value];
      });
      console.log('updated filters',updated)
      return updated;
    });
  }, []);

  // Handle download request
  const handleDownload = useCallback((format) => {
    if (handleDownloadResults) {
      handleDownloadResults(filters, format);
    }
  }, [filters, handleDownloadResults]);

  return (
    <div className="bg-white min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Scenario Analysis
            </h1>
            <p className="text-gray-500 mt-1 max-w-full">
              Analyze scenarios, view existing ones, and make adjustments to your plans. Track your progress, compare different strategies, and visualize your path to achieving net-zero goals. Start by creating a new scenario or explore your saved plans to refine and optimize your sustainability journey.
            </p>
          </div>
        </div>
        
        {/* Main content */}
        {isLoading && allScenarios.length === 0 ? (
          <LoadingSpinner />
        ) : allScenarios.length === 0 ? (
          <EmptyState setIsCreateModalOpen={setIsCreateModalOpen} />
        ) : (
          <>
            <ScenarioSearch 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              scenarios={allScenarios}
              selectedScenarios={selectedScenarios}
              handleScenarioSelect={onScenarioSelect}
            />
            
            {/* Show message if no scenarios selected */}
            {selectedScenarios.length === 0 ? (
              <NoScenarioSelected />
            ) : (
              <ComparisonView 
                selectedScenarios={selectedScenarios}
                allScenarios={allScenarios}
                comparisonData={comparisonData}
                isLoading={isLoading && selectedScenarios.length > 0}
                filters={filters}
                onFilterChange={handleFilterChange}
                onDownloadResults={handleDownload}
              />
            )}
            
            {/* Show error message if there is one */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CompareScenarios;