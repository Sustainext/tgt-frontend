// ComparisonView.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FiDownload, FiInfo, FiChevronDown } from "react-icons/fi";
import FilterSection from "./FilterSection";
import EmissionsTrendChart from "./EmissionsTrendChart";
import EmissionsGapChart from "./EmissionsGapChart";
import LoadingSpinner from "./LoadingSpinner";

/**
 * Comparison view component for scenario analysis
 * 
 * @param {Object} props Component props
 * @param {Array} props.selectedScenarios IDs of selected scenarios
 * @param {Array} props.allScenarios All available scenarios
 * @param {Object} props.comparisonData Data for comparison from API
 * @param {boolean} props.isLoading Loading state indicator
 * @param {Function} props.fetchComparisonData Function to fetch comparison data
 * @param {Function} props.onDownloadResults Callback to download results
 */
const ComparisonView = ({ 
  selectedScenarios, 
  allScenarios, 
  comparisonData,
  isLoading,
  fetchComparisonData,
  onDownloadResults 
}) => {
  // Manage filter state in this component
  // In your React component
const [filters, setFilters] = useState({
  scope: ["Aggregated Scope"],
  category: ["Aggregated Scope"],
  subCategory: ["Aggregated Scope"],
  activity: ["Aggregated Scope"],
  metrics: [],
  scenarioMetrics: {} 
});

const extractUniqueMetricsForScenarios = (comparisonData) => {
  if (!comparisonData) return {};
  
  const scenarioMetricsMap = {};
  
  // Format metric name for display (e.g., production_volume -> Production Volume)
  const formatMetricName = (metric) => {
    return metric
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Process all scenarios in comparison data
  Object.entries(comparisonData).forEach(([scenarioId, scenarioData]) => {
    // Set to collect unique metrics for this scenario
    const scenarioMetricSet = new Set();
    
    // Extract business metrics from totals
    if (scenarioData.totals) {
      const yearData = Object.values(scenarioData.totals)[0] || {};
      Object.keys(yearData).forEach(metric => {
        if (metric !== 'total') {
          scenarioMetricSet.add(metric);
        }
      });
    }
    
    // Get the yearly_data
    const yearlyData = scenarioData.yearly_data || {};
    
    // Iterate through each year's data
    Object.values(yearlyData).forEach(activities => {
      if (Array.isArray(activities)) {
        activities.forEach(activity => {
          // Add any activity-specific business metrics
          Object.keys(activity).forEach(key => {
            if (['fte', 'area', 'production_volume', 'revenue', 'employees'].includes(key)) {
              scenarioMetricSet.add(key);
            }
          });
        });
      }
    });
    
    // Convert set to formatted array for UI and store in map
    const formattedMetrics = Array.from(scenarioMetricSet).map(metric => ({
      id: metric,
      name: formatMetricName(metric),
      selected: true // Auto-select all metrics by default
    }));
    
    scenarioMetricsMap[scenarioId] = formattedMetrics;
  });
  
  return scenarioMetricsMap;
};

// In your component
useEffect(() => {
  if (comparisonData) {
    const scenarioMetrics = extractUniqueMetricsForScenarios(comparisonData);
    
    // Update filters with the extracted scenario metrics
    setFilters(prevFilters => ({
      ...prevFilters,
      scenarioMetrics
    }));
  }
}, [comparisonData]);
  
  // Scenario-specific settings
  const [scenarioSettings, setScenarioSettings] = useState({});
  
  // Chart data states
  const [emissionsLineData, setEmissionsLineData] = useState([]);
  const [emissionsGapData, setEmissionsGapData] = useState([]);

  // Filter options extracted from API data
  const [scopeOptions, setScopeOptions] = useState(["Aggregated Scope"]);
  const [categoryOptions, setCategoryOptions] = useState(["Aggregated Scope"]);
  const [subCategoryOptions, setSubCategoryOptions] = useState(["Aggregated Scope"]);
  const [activityOptions, setActivityOptions] = useState(["Aggregated Scope"]);

  // Download dropdown ref and state
  const downloadButtonRef = useRef(null);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  // Helper function to normalize scope format for comparison
  const normalizeScope = (scope) => {
    if (!scope) return '';
    
    // Remove spaces and convert to lowercase
    return scope.toLowerCase().replace(/\s+/g, '');
  };

  // Initialize settings when scenarios change
  useEffect(() => {
    const initialSettings = {};
    
    selectedScenarios.forEach(scenarioId => {
      const scenario = allScenarios.find(s => s.id === scenarioId);
      if (!scenario) return;
      
      initialSettings[scenarioId] = {
        includeNetZero: true,
        targetYear: scenario.targetYear || 2035
      };
    });
    
    setScenarioSettings(initialSettings);
  }, [selectedScenarios, allScenarios]);

  // Fetch comparison data when filters or selectedScenarios change
  useEffect(() => {
    if (selectedScenarios.length > 0 && fetchComparisonData) {
      console.log("Fetching comparison data with filters:", filters);
      fetchComparisonData(selectedScenarios, filters);
    }
  }, [selectedScenarios, filters, fetchComparisonData]);

  // Extract scope options from comparison data
  useEffect(() => {
    if (!comparisonData) return;
    
    // Start with default "Aggregated Scope" option
    const uniqueScopes = new Set(["Aggregated Scope"]);
    
    // Check if comparisonData is an object with scenario IDs as keys
    if (typeof comparisonData === 'object' && !Array.isArray(comparisonData)) {
      // Process all scenarios in comparison data
      Object.entries(comparisonData).forEach(([scenarioId, scenarioData]) => {
        // Get the yearly_data
        const yearlyData = scenarioData.yearly_data || {};
        
        // Iterate through each year's data
        Object.values(yearlyData).forEach(activities => {
          if (Array.isArray(activities)) {
            activities.forEach(activity => {
              // Add scope if it exists
              if (activity.scope && activity.scope !== "Aggregated Scope") {
                uniqueScopes.add(activity.scope);
              }
            });
          }
        });
      });
    }
    
    // Update scope options
    setScopeOptions(Array.from(uniqueScopes));
  }, [comparisonData]);

  // Extract category options from comparison data based on selected scope
  useEffect(() => {
    if (!comparisonData) return;
    
    // Start with default "Aggregated Scope" option
    const uniqueCategories = new Set(["Aggregated Scope"]);
    
    // Check if comparisonData is an object with scenario IDs as keys
    if (typeof comparisonData === 'object' && !Array.isArray(comparisonData)) {
      // Process all scenarios in comparison data
      Object.entries(comparisonData).forEach(([scenarioId, scenarioData]) => {
        // Get the yearly_data
        const yearlyData = scenarioData.yearly_data || {};
        
        // Iterate through each year's data
        Object.values(yearlyData).forEach(activities => {
          if (Array.isArray(activities)) {
            activities.forEach(activity => {
              // Check if the activity matches the selected scope
              const scopeMatch = 
                filters.scope && filters.scope.includes("Aggregated Scope") || 
                (Array.isArray(filters.scope) && filters.scope.some(s => 
                  normalizeScope(activity.scope) === normalizeScope(s)
                ));
                
              // Add category if scope matches and category exists
              if (scopeMatch && activity.category && activity.category !== "Aggregated Scope") {
                uniqueCategories.add(activity.category);
              }
            });
          }
        });
      });
    }
    
    // Update category options
    setCategoryOptions(Array.from(uniqueCategories));
  }, [comparisonData, filters.scope]);

  // Extract subcategory options from comparison data based on selected scope and category
  useEffect(() => {
    if (!comparisonData) return;
    
    // Start with default "Aggregated Scope" option
    const uniqueSubCategories = new Set(["Aggregated Scope"]);
    
    // Check if comparisonData is an object with scenario IDs as keys
    if (typeof comparisonData === 'object' && !Array.isArray(comparisonData)) {
      // Process all scenarios in comparison data
      Object.entries(comparisonData).forEach(([scenarioId, scenarioData]) => {
        // Get the yearly_data
        const yearlyData = scenarioData.yearly_data || {};
        
        // Iterate through each year's data
        Object.values(yearlyData).forEach(activities => {
          if (Array.isArray(activities)) {
            activities.forEach(activity => {
              // Check if the activity matches the selected scope and category
              const scopeMatch = 
                filters.scope && filters.scope.includes("Aggregated Scope") || 
                (Array.isArray(filters.scope) && filters.scope.some(s => 
                  normalizeScope(activity.scope) === normalizeScope(s)
                ));
                
              const categoryMatch = 
                filters.category && filters.category.includes("Aggregated Scope") || 
                (Array.isArray(filters.category) && filters.category.some(c => 
                  activity.category === c
                ));
                
              // Add subcategory if scope and category match and subcategory exists
              if (scopeMatch && categoryMatch && activity.sub_category && 
                  activity.sub_category !== "Aggregated Scope") {
                uniqueSubCategories.add(activity.sub_category);
              }
            });
          }
        });
      });
    }
    
    // Update subcategory options
    setSubCategoryOptions(Array.from(uniqueSubCategories));
  }, [comparisonData, filters.scope, filters.category]);

  // Extract activity options from comparison data
  useEffect(() => {
    if (!comparisonData) return;
    
    // Start with default "Aggregated Scope" option
    const uniqueActivities = new Set(["Aggregated Scope"]);
    
    // Check if comparisonData is an object with scenario IDs as keys
    if (typeof comparisonData === 'object' && !Array.isArray(comparisonData)) {
      // Process all scenarios in comparison data
      Object.entries(comparisonData).forEach(([scenarioId, scenarioData]) => {
        // Get the yearly_data
        const yearlyData = scenarioData.yearly_data || {};
        
        // Iterate through each year's data
        Object.values(yearlyData).forEach(activities => {
          if (Array.isArray(activities)) {
            activities.forEach(activity => {
              const scopeMatch = 
                filters.scope && filters.scope.includes("Aggregated Scope") || 
                (Array.isArray(filters.scope) && filters.scope.some(s => 
                  normalizeScope(activity.scope) === normalizeScope(s)
                ));
                
              const categoryMatch = 
                filters.category && filters.category.includes("Aggregated Scope") || 
                (Array.isArray(filters.category) && filters.category.some(c => 
                  activity.category === c
                ));
                
                const subCategoryMatch = 
                filters.subCategory && filters.subCategory.includes("Aggregated Scope") || 
                (Array.isArray(filters.subCategory) && filters.subCategory.some(sc => 
                  activity.sub_category === sc
                ));
              
              // Add activity name if it matches filters
              if (scopeMatch && categoryMatch && subCategoryMatch && 
                  activity.activity_name && activity.activity_name !== "Aggregated Scope") {
                uniqueActivities.add(activity.activity_name);
              }
            });
          }
        });
      });
    }
    
    setActivityOptions(Array.from(uniqueActivities));
  }, [comparisonData, filters.scope, filters.category, filters.subCategory]);

// In ComparisonView.jsx
useEffect(() => {
  if (comparisonData) {
    // Extract unique metrics for each scenario
    const scenarioMetrics = extractUniqueMetricsForScenarios(comparisonData);
    
    // Merge with existing filters to preserve any user settings
    setFilters(prevFilters => {
      const mergedScenarioMetrics = { ...prevFilters.scenarioMetrics };
      
      // For each scenario in the new data
      Object.entries(scenarioMetrics).forEach(([scenarioId, newMetrics]) => {
        const existingMetrics = mergedScenarioMetrics[scenarioId] || [];
        
        if (existingMetrics.length === 0) {
          // If no existing metrics, use the new ones (all selected by default)
          mergedScenarioMetrics[scenarioId] = newMetrics;
        } else {
          // If there are existing metrics, merge with new ones
          // Create a map of existing metrics for quick lookup
          const existingMetricsMap = new Map(
            existingMetrics.map(m => [m.id, m])
          );
          
          // For each new metric, check if it exists and preserve selection state
          mergedScenarioMetrics[scenarioId] = newMetrics.map(newMetric => {
            if (existingMetricsMap.has(newMetric.id)) {
              // Preserve the selection state if metric already exists
              return {
                ...newMetric,
                selected: existingMetricsMap.get(newMetric.id).selected
              };
            }
            // New metrics are selected by default
            return newMetric;
          });
        }
      });
      
      return {
        ...prevFilters,
        scenarioMetrics: mergedScenarioMetrics
      };
    });
  }
}, [comparisonData]);

  // Handle outside clicks for download dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (downloadButtonRef.current && !downloadButtonRef.current.contains(event.target)) {
        setShowDownloadOptions(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle filter changes
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
      
      return updated;
    });
  }, []);

  // Handle scenario settings changes
  const handleScenarioSettingsChange = useCallback((newSettings) => {
    setScenarioSettings(newSettings);
  }, []);

  // Generate chart data when comparison data changes
  useEffect(() => {
    if (comparisonData && Object.keys(comparisonData).length > 0 && 
        Object.keys(scenarioSettings).length > 0) {
      // Generate emissions line chart data
      const lineData = generateEmissionsLineData();
      setEmissionsLineData(lineData);
      
      // Generate emissions gap chart data
      const gapData = generateEmissionsGapData();
      setEmissionsGapData(gapData);
    }
  }, [comparisonData, scenarioSettings, filters]);

  // Generate line chart data
  const generateEmissionsLineData = () => {
    // Sample data generation logic - replace with your actual logic
    const result = [];
    
    selectedScenarios.forEach((scenarioId, index) => {
      const scenario = allScenarios.find(s => s.id === scenarioId);
      if (!scenario) return;
      
      // Sample data - replace with real data processing from comparisonData
      const colors = ["#3182CE", "#2563EB", "#EF4444", "#8B5CF6", "#10B981"];
      const baseYear = 2024;
      const years = [];
      
      // Create years array
      for (let year = baseYear; year <= baseYear + 10; year++) {
        years.push(year);
      }
      
      // Generate sample data points
      const dataPoints = years.map(year => ({
        x: year,
        y: 1000 * (1 - (0.05 * (year - baseYear))) + (index * 100)
      }));
      
      // Add to results with appropriate color
      result.push({
        id: `${scenario.name} (Emissions)`,
        data: dataPoints,
        color: colors[index % colors.length]
      });
      
      // Add net-zero trajectory if enabled
      const settings = scenarioSettings[scenarioId];
      if (settings?.includeNetZero) {
        const netZeroColors = ["#48BB78", "#10B981", "#FB7185", "#A78BFA", "#14B8A6"];
        
        const netZeroPoints = years.map(year => {
          const targetYear = settings.targetYear || baseYear + 10;
          const yearFactor = (year - baseYear) / (targetYear - baseYear);
          const value = 1000 * (1 - yearFactor) + (index * 100);
          
          return {
            x: year,
            y: Math.max(0, value)
          };
        });
        
        result.push({
          id: `${scenario.name} (Net-Zero)`,
          data: netZeroPoints,
          color: netZeroColors[index % netZeroColors.length],
          dashed: true
        });
      }
    });
    
    return result;
  };
  
  // Generate emissions gap chart data
  const generateEmissionsGapData = () => {
    // Sample data generation logic - replace with your actual logic
    const baseYear = 2024;
    const years = [];
    
    // Create years array
    for (let year = baseYear; year <= baseYear + 10; year++) {
      years.push(year);
    }
    
    // Generate gap data for each year
    return years.map(year => {
      const result = { year };
      
      selectedScenarios.forEach(scenarioId => {
        const scenario = allScenarios.find(s => s.id === scenarioId);
        if (!scenario) return;
        
        // Get settings for this scenario
        const settings = scenarioSettings[scenarioId];
        if (!settings || !settings.includeNetZero) {
          result[`${scenario.name} Gap`] = 0;
          return;
        }
        
        // Sample gap calculation - replace with real data
        const targetYear = settings.targetYear || baseYear + 10;
        const yearFactor = (year - baseYear) / (targetYear - baseYear);
        const emissionsValue = 1000 * (1 - (0.05 * (year - baseYear)));
        const netZeroValue = 1000 * (1 - yearFactor);
        
        // The gap is the difference
        const gap = Math.max(0, emissionsValue - netZeroValue);
        result[`${scenario.name} Gap`] = gap;
      });
      
      return result;
    });
  };

  // Handle download request
  const handleDownloadResults = useCallback(() => {
    setShowDownloadOptions(!showDownloadOptions);
  }, [showDownloadOptions]);

  // Handle CSV download
  const handleDownloadCSV = useCallback(() => {
    if (onDownloadResults) {
      onDownloadResults(filters, "csv");
    }
    setShowDownloadOptions(false);
  }, [onDownloadResults, filters]);

  // Handle PNG download
  const handleDownloadPNG = useCallback(() => {
    if (onDownloadResults) {
      onDownloadResults(filters, "png");
    }
    setShowDownloadOptions(false);
  }, [onDownloadResults, filters]);

  // Get display label for scope based on selection
  const getScopeDisplayLabel = () => {
    if (!filters.scope) return "All Scopes";
    
    if (Array.isArray(filters.scope)) {
      return filters.scope.includes("Aggregated Scope") 
        ? "All Scopes" 
        : filters.scope.join(", ");
    }
    
    return filters.scope === "Aggregated Scope" ? "All Scopes" : filters.scope;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      <FilterSection 
        selectedScenarios={selectedScenarios}
        allScenarios={allScenarios}
        filters={filters}
        onFilterChange={handleFilterChange}
        onScenarioSettingsChange={handleScenarioSettingsChange}
        scopeOptions={scopeOptions}
        categoryOptions={categoryOptions}
        subCategoryOptions={subCategoryOptions}
        activityOptions={activityOptions}
      />

      {isLoading ? (
        <div className="p-6">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-gray-900">
              Predicted Trend of Emissions over Years for ({getScopeDisplayLabel()})
            </h3>
            <div className="relative" ref={downloadButtonRef}>
              <button
                onClick={handleDownloadResults}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                disabled={isLoading || !comparisonData}
              >
                Download results
                <FiDownload className="ml-2 h-4 w-4" />
              </button>
              
              {/* Download options dropdown */}
              {showDownloadOptions && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-md z-20">
                  <div className="py-1">
                    <button
                      onClick={handleDownloadCSV}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Download as CSV
                    </button>
                    <button
                      onClick={handleDownloadPNG}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Download as PNG
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {comparisonData && Object.keys(comparisonData).length > 0 && emissionsLineData.length > 0 ? (
            <>
              <EmissionsTrendChart 
                data={emissionsLineData} 
                selectedScope={getScopeDisplayLabel()}
              />
              
              <EmissionsGapChart 
                data={emissionsGapData} 
              />
            </>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-md border border-gray-100">
              <FiInfo className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No comparison data available.</p>
              <p className="text-sm text-gray-400 mt-1">
                {selectedScenarios.length === 0 
                  ? "Please select scenarios to compare." 
                  : "Try adjusting your filter settings or wait for data to load."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComparisonView;