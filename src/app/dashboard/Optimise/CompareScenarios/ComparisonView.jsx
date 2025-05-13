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

// Add/replace this code in ComparisonView.jsx

// Handle filter changes
const handleFilterChange = useCallback((newFilters) => {
  console.log("ComparisonView: Filter change detected:", newFilters);
  
  // Properly handle the scenarioMetrics to avoid losing state
  setFilters(prevFilters => {
    console.log("ComparisonView: Previous filters:", prevFilters);
    
    // Create a new object (important for React to detect changes)
    const updatedFilters = { ...prevFilters };
    
    // Special handling for scenarioMetrics
    if (newFilters.scenarioMetrics) {
      updatedFilters.scenarioMetrics = {
        ...(prevFilters.scenarioMetrics || {}),
        ...newFilters.scenarioMetrics
      };
      
      console.log("ComparisonView: Updated scenarioMetrics:", updatedFilters.scenarioMetrics);
    }
    
    // Handle all other filter types
    Object.entries(newFilters).forEach(([key, value]) => {
      // Skip scenarioMetrics as we've already handled it
      if (key === 'scenarioMetrics') return;
      
      // Ensure value is an array
      updatedFilters[key] = Array.isArray(value) ? value : [value];
    });
    
    console.log("ComparisonView: New filters state:", updatedFilters);
    return updatedFilters;
  });
}, []);

// Add a dedicated effect to handle metrics changes
useEffect(() => {
  // Only trigger chart data regeneration when we have the necessary data
  if (comparisonData && 
      Object.keys(comparisonData).length > 0 && 
      Object.keys(scenarioSettings).length > 0 &&
      filters.scenarioMetrics) {
        
    console.log("ComparisonView: Regenerating chart data due to filters change");
    console.log("ComparisonView: Current scenarioMetrics:", filters.scenarioMetrics);
    
    // Generate emissions line chart data
    const lineData = generateEmissionsLineData();
    setEmissionsLineData(lineData);
    
    // Generate emissions gap chart data
    const gapData = generateEmissionsGapData();
    setEmissionsGapData(gapData);
  }
}, [comparisonData, scenarioSettings, filters, filters.scenarioMetrics]);

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


const generateEmissionsLineData = () => {
  console.log("Generating emissions line data");
  
  if (!comparisonData || Object.keys(comparisonData).length === 0) {
    console.log("No comparison data available");
    return [];
  }
  
  const result = [];
  
  // First, determine the maximum target year across all selected scenarios
  let maxTargetYear = 0;
  let minBaseYear = Number.MAX_SAFE_INTEGER;
  
  selectedScenarios.forEach(scenarioId => {
    const scenario = allScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;
    
    // Get base year and target year
    const baseYear = scenario.baseYear || 2024;
    const settings = scenarioSettings[scenarioId] || {};
    const targetYear = settings.targetYear || 2035;
    
    console.log(`Scenario ${scenarioId}: baseYear=${baseYear}, targetYear=${targetYear}`);
    
    // Update max target year and min base year
    maxTargetYear = Math.max(maxTargetYear, targetYear);
    minBaseYear = Math.min(minBaseYear, baseYear);
  });
  
  console.log(`Chart range: minBaseYear=${minBaseYear}, maxTargetYear=${maxTargetYear}`);
  
  // Default to current year + 10 if maxTargetYear is still 0
  if (maxTargetYear === 0) {
    maxTargetYear = new Date().getFullYear() + 10;
  }
  
  // Handle case where minBaseYear wasn't set
  if (minBaseYear === Number.MAX_SAFE_INTEGER) {
    minBaseYear = 2024;
  }
  
  // Create the full year range for the x-axis
  const fullYearRange = [];
  for (let year = minBaseYear; year <= maxTargetYear; year++) {
    fullYearRange.push(year);
  }
  
  // Now generate data for each scenario
  selectedScenarios.forEach((scenarioId, index) => {
    const scenario = allScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;
    
    // Get scenario-specific data
    const scenarioData = comparisonData[scenarioId];
    if (!scenarioData) return;
    
    // Get selected metrics for this scenario
    const scenarioMetrics = filters.scenarioMetrics?.[scenarioId] || [];
    const selectedMetricIds = scenarioMetrics
      .filter(metric => metric.selected)
      .map(metric => metric.id);
    
    console.log(`Scenario ${scenarioId} selected metrics:`, selectedMetricIds);
    
    // If no metrics are selected, don't show any data
    if (selectedMetricIds.length === 0) {
      console.log(`No metrics selected for scenario ${scenarioId}, skipping`);
      return;
    }
    
    // Colors for emissions and net-zero lines
    const colors = ["#3182CE", "#2563EB", "#EF4444", "#8B5CF6", "#10B981"];
    const netZeroColors = ["#48BB78", "#10B981", "#FB7185", "#A78BFA", "#14B8A6"];
    
    // Get base year and target year for this scenario
    const baseYear = scenario.baseYear || 2024;
    const settings = scenarioSettings[scenarioId] || {};
    const targetYear = settings.targetYear || 2035;
    
    // Extract unique years from the comparison data
    const yearsSet = new Set();
    
    // Add years from yearly_data
    if (scenarioData.yearly_data) {
      Object.keys(scenarioData.yearly_data).forEach(year => {
        yearsSet.add(parseInt(year));
      });
    }
    
    // Add years from totals
    if (scenarioData.totals) {
      Object.keys(scenarioData.totals).forEach(year => {
        yearsSet.add(parseInt(year));
      });
    }
    
    // Create a years array from minBaseYear to maxTargetYear for this scenario
    // Important: We want the x-axis to go up to maxTargetYear
    const scenarioYears = [];
    for (let year = minBaseYear; year <= targetYear; year++) {
      scenarioYears.push(year);
    }
    
    console.log(`Scenario ${scenarioId} year range:`, scenarioYears);
    
    // We'll store calculated values for each year to use for extrapolation
    const calculatedValues = {};
    
    // First pass: calculate values for years we have data for
    scenarioYears.forEach(year => {
      if (scenarioData.totals && scenarioData.totals[year]) {
        let totalValue = 0;
        const yearTotals = scenarioData.totals[year];
        
        // Sum up the selected metrics
        selectedMetricIds.forEach(metricId => {
          if (yearTotals[metricId] !== undefined) {
            totalValue += parseFloat(yearTotals[metricId]);
          }
        });
        
        calculatedValues[year] = totalValue;
      } 
      else if (scenarioData.yearly_data && scenarioData.yearly_data[year]) {
        let totalValue = 0;
        const activities = scenarioData.yearly_data[year] || [];
        
        // Sum up the selected metrics across all activities
        if (Array.isArray(activities)) {
          activities.forEach(activity => {
            selectedMetricIds.forEach(metricId => {
              if (activity[metricId] !== undefined) {
                totalValue += parseFloat(activity[metricId]);
              }
            });
          });
        }
        
        calculatedValues[year] = totalValue;
      }
    });
    
    // Second pass: fill in missing values through extrapolation
    scenarioYears.forEach(year => {
      if (calculatedValues[year] === undefined) {
        // Find the closest year with data before this year
        const previousYears = scenarioYears.filter(y => y < year && calculatedValues[y] !== undefined);
        
        if (previousYears.length > 0) {
          // Use the most recent year with data for extrapolation
          const latestPreviousYear = Math.max(...previousYears);
          const yearDiff = year - latestPreviousYear;
          
          // Apply a simple reduction factor (5% per year) for future projections
          calculatedValues[year] = calculatedValues[latestPreviousYear] * Math.pow(0.95, yearDiff);
        } else {
          // No previous data points, check if we have any future data points
          const futureYears = scenarioYears.filter(y => y > year && calculatedValues[y] !== undefined);
          
          if (futureYears.length > 0) {
            // Use the earliest future year with data for backward extrapolation
            const earliestFutureYear = Math.min(...futureYears);
            const yearDiff = earliestFutureYear - year;
            
            // Apply an increase factor (5% per year) for backward projections
            calculatedValues[year] = calculatedValues[earliestFutureYear] * Math.pow(1.05, yearDiff);
          } else {
            // No data at all, default to zero
            calculatedValues[year] = 0;
          }
        }
      }
    });
    
    // Convert to data points format for the chart
    const dataPoints = scenarioYears.map(year => ({
      x: year,
      y: calculatedValues[year] || 0
    }));
    
    console.log(`Scenario ${scenarioId} emissions data points:`, dataPoints);
    
    // Add to results with appropriate color - one line per scenario (total)
    result.push({
      id: `${scenario.name} (Emissions)`,
      data: dataPoints,
      color: colors[index % colors.length]
    });
    
    if (settings?.includeNetZero) {
      // Find starting emissions value from the first year
      const startValue = dataPoints.find(p => p.x === scenarioYears[0])?.y || 0;
      
      // Generate net-zero points based on the current target year setting
      const netZeroPoints = scenarioYears.map(year => {
        // Calculate based on this scenario's target year (may have been updated by user)
        const yearFactor = (year - baseYear) / (targetYear - baseYear);
        
        // Linear reduction to zero by target year
        let value;
        
        if (yearFactor >= 1) {
          // At or after target year, emissions are zero
          value = 0;
        } else if (yearFactor <= 0) {
          // Before or at base year, emissions are at starting level
          value = startValue;
        } else {
          // In between, linear reduction
          value = startValue * (1 - yearFactor);
        }
        
        return {
          x: year,
          y: Math.max(0, value)
        };
      });
      
      console.log(`Scenario ${scenarioId} net-zero data points with target year ${targetYear}:`, netZeroPoints);
      
      result.push({
        id: `${scenario.name} (Net-Zero)`,
        data: netZeroPoints,
        color: netZeroColors[index % netZeroColors.length],
        dashed: true
      });
    }
  });
  
  console.log("Final chart data:", result);
  return result;
};
  
const generateEmissionsGapData = () => {
  console.log("Generating emissions gap data");
  
  if (!comparisonData || Object.keys(comparisonData).length === 0) {
    console.log("No comparison data available");
    return [];
  }
  
  // First, determine the maximum target year and minimum base year across all selected scenarios
  let maxTargetYear = 0;
  let minBaseYear = Number.MAX_SAFE_INTEGER;
  
  selectedScenarios.forEach(scenarioId => {
    const scenario = allScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;
    
    // Get base year and target year
    const baseYear = scenario.baseYear || 2024;
    const settings = scenarioSettings[scenarioId] || {};
    const targetYear = settings.targetYear || 2035;
    
    console.log(`Scenario ${scenarioId}: baseYear=${baseYear}, targetYear=${targetYear}`);
    
    // Update max target year and min base year
    maxTargetYear = Math.max(maxTargetYear, targetYear);
    minBaseYear = Math.min(minBaseYear, baseYear);
  });
  
  console.log(`Gap chart range: minBaseYear=${minBaseYear}, maxTargetYear=${maxTargetYear}`);
  
  // Default to current year + 10 if maxTargetYear is still 0
  if (maxTargetYear === 0) {
    maxTargetYear = new Date().getFullYear() + 10;
  }
  
  // Handle case where minBaseYear wasn't set
  if (minBaseYear === Number.MAX_SAFE_INTEGER) {
    minBaseYear = 2024;
  }
  
  // Create array of years from min base year to max target year
  const allYears = [];
  for (let year = minBaseYear; year <= maxTargetYear; year++) {
    allYears.push(year);
  }
  
  // Generate gap data for each year across the full timeline
  const result = allYears.map(year => {
    const yearData = { year };
    
    selectedScenarios.forEach(scenarioId => {
      const scenario = allScenarios.find(s => s.id === scenarioId);
      if (!scenario) return;
      
      // Get scenario-specific data
      const scenarioData = comparisonData[scenarioId];
      if (!scenarioData) return;
      
      // Get settings for this scenario
      const settings = scenarioSettings[scenarioId];
      if (!settings || !settings.includeNetZero) {
        yearData[`${scenario.name} Gap`] = 0;
        return;
      }
      
      // Get base year and target year for this scenario
      const baseYear = scenario.baseYear || 2024;
      const targetYear = settings.targetYear || 2035;
      
      // If this year is beyond this scenario's target year, set gap to 0
      if (year > targetYear) {
        yearData[`${scenario.name} Gap`] = 0;
        return;
      }
      
      // Get selected metrics for this scenario
      const scenarioMetrics = filters.scenarioMetrics?.[scenarioId] || [];
      const selectedMetricIds = scenarioMetrics
        .filter(metric => metric.selected)
        .map(metric => metric.id);
      
      // If no metrics are selected, don't show any gap
      if (selectedMetricIds.length === 0) {
        yearData[`${scenario.name} Gap`] = 0;
        return;
      }
      
      // Store calculated values for each year to use for calculations
      const calculatedEmissions = {};
      
      // Helper function to calculate emissions for a specific year from data
      const calculateEmissionsForYear = (year) => {
        let value = 0;
        
        // If we have totals data for this year, use it
        if (scenarioData.totals && scenarioData.totals[year]) {
          const yearTotals = scenarioData.totals[year];
          
          // Sum up the selected metrics
          selectedMetricIds.forEach(metricId => {
            if (yearTotals[metricId] !== undefined) {
              value += parseFloat(yearTotals[metricId]);
            }
          });
        } 
        // If we don't have totals, try to calculate from yearly_data
        else if (scenarioData.yearly_data && scenarioData.yearly_data[year]) {
          const activities = scenarioData.yearly_data[year] || [];
          
          // Sum up the selected metrics across all activities
          if (Array.isArray(activities)) {
            activities.forEach(activity => {
              selectedMetricIds.forEach(metricId => {
                if (activity[metricId] !== undefined) {
                  value += parseFloat(activity[metricId]);
                }
              });
            });
          }
        }
        
        return value;
      };
      
      // Create years array for this specific scenario (up to its target year)
      const scenarioYears = [];
      for (let y = minBaseYear; y <= targetYear; y++) {
        scenarioYears.push(y);
      }
      
      // First calculate values for years with available data
      scenarioYears.forEach(y => {
        // Check if we have data for this year
        if (
          (scenarioData.totals && scenarioData.totals[y]) ||
          (scenarioData.yearly_data && scenarioData.yearly_data[y])
        ) {
          calculatedEmissions[y] = calculateEmissionsForYear(y);
        }
      });
      
      // Now fill in missing years with extrapolated data
      scenarioYears.forEach(y => {
        if (calculatedEmissions[y] === undefined) {
          // Find the closest year with data before this year
          const previousYears = scenarioYears.filter(prevY => 
            prevY < y && calculatedEmissions[prevY] !== undefined
          );
          
          if (previousYears.length > 0) {
            // Use the most recent year with data
            const latestPreviousYear = Math.max(...previousYears);
            const yearDiff = y - latestPreviousYear;
            
            // Simple 5% reduction per year for future extrapolation
            calculatedEmissions[y] = calculatedEmissions[latestPreviousYear] * Math.pow(0.95, yearDiff);
          } else {
            // No previous data, try future years
            const futureYears = scenarioYears.filter(futY => 
              futY > y && calculatedEmissions[futY] !== undefined
            );
            
            if (futureYears.length > 0) {
              // Use earliest future year
              const earliestFutureYear = Math.min(...futureYears);
              const yearDiff = earliestFutureYear - y;
              
              // Simple 5% increase per year for backward extrapolation
              calculatedEmissions[y] = calculatedEmissions[earliestFutureYear] * Math.pow(1.05, yearDiff);
            } else {
              // No data at all, default to zero
              calculatedEmissions[y] = 0;
            }
          }
        }
      });
      
      // Get the emissions value for the current year
      const emissionsValue = calculatedEmissions[year] || 0;
      
      // Get starting emissions value (for baseline)
      let startingEmissions = calculatedEmissions[minBaseYear] || 0;
      
      // If we don't have a starting value, use the first available value
      if (startingEmissions === 0) {
        const availableYears = Object.keys(calculatedEmissions).map(y => parseInt(y));
        if (availableYears.length > 0) {
          const earliestYear = Math.min(...availableYears);
          startingEmissions = calculatedEmissions[earliestYear] || 0;
        }
      }
      
      // Calculate net-zero pathway value for this year
      if (year <= targetYear) {
        const yearFactor = (year - baseYear) / (targetYear - baseYear);
        // Ensure factor is between 0 and 1 for more robust calculation
        const boundedFactor = Math.max(0, Math.min(1, yearFactor));
        
        // Linear reduction to zero by target year
        const netZeroValue = startingEmissions * (1 - boundedFactor);
        
        // The gap is the difference (but never negative)
        const gap = Math.max(0, emissionsValue - netZeroValue);
        yearData[`${scenario.name} Gap`] = gap;
      } else {
        // For years beyond target year, gap is zero (emissions should be zero)
        yearData[`${scenario.name} Gap`] = 0;
      }
    });
    
    return yearData;
  });
  
  console.log("Final gap data:", result);
  return result;
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