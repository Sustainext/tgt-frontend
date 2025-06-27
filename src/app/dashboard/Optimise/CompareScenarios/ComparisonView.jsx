import React, { useState, useEffect, useCallback, useRef } from "react";
import { FiDownload, FiInfo, FiChevronDown, FiX } from "react-icons/fi";
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
  onDownloadResults,
}) => {
  // Manage filter state in this component
  const [filters, setFilters] = useState({
    scope: ["Aggregated Scope"],
    category: ["Aggregated Scope"],
    subCategory: ["Aggregated Scope"],
    activity: ["Aggregated Scope"],
    metrics: [],
    scenarioMetrics: {},
  });

  // Scenario-specific settings
  const [scenarioSettings, setScenarioSettings] = useState({});

  // Chart data states
  const [emissionsLineData, setEmissionsLineData] = useState([]);
  const [emissionsGapData, setEmissionsGapData] = useState([]);

  // Filter options extracted from API data
  const [scopeOptions, setScopeOptions] = useState(["Aggregated Scope"]);
  const [categoryOptions, setCategoryOptions] = useState(["Aggregated Scope"]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([
    "Aggregated Scope",
  ]);
  const [activityOptions, setActivityOptions] = useState(["Aggregated Scope"]);

  // Download state
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  // Download refs and states for both chart types
  const trendDownloadButtonRef = useRef(null);
  const trendDownloadOptionsRef = useRef(null);
  const [showTrendDownloadOptions, setShowTrendDownloadOptions] =
    useState(false);

  const gapDownloadButtonRef = useRef(null);
  const gapDownloadOptionsRef = useRef(null);
  const [showGapDownloadOptions, setShowGapDownloadOptions] = useState(false);

  // Refs for chart containers (used for PNG export)
  const trendChartContainerRef = useRef(null);
  const gapChartContainerRef = useRef(null);

  const extractUniqueMetricsForScenarios = (comparisonData) => {
    if (!comparisonData) return {};

    const scenarioMetricsMap = {};

    // Format metric name for display (e.g., production_volume -> Production Volume)
    const formatMetricName = (metric) => {
      return metric
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    // Process all scenarios in comparison data
    Object.entries(comparisonData).forEach(([scenarioId, scenarioData]) => {
      // Set to collect unique metrics for this scenario
      const scenarioMetricSet = new Set();

      // Extract business metrics from totals
      if (scenarioData.totals) {
        const yearData = Object.values(scenarioData.totals)[0] || {};
        Object.keys(yearData).forEach((metric) => {
          if (metric !== "total") {
            scenarioMetricSet.add(metric);
          }
        });
      }

      // Get the yearly_data
      const yearlyData = scenarioData.yearly_data || {};

      // Iterate through each year's data
      Object.values(yearlyData).forEach((activities) => {
        if (Array.isArray(activities)) {
          activities.forEach((activity) => {
            // Add any activity-specific business metrics
            Object.keys(activity).forEach((key) => {
              if (
                [
                  "fte",
                  "area",
                  "production_volume",
                  "revenue",
                  "employees",
                ].includes(key)
              ) {
                scenarioMetricSet.add(key);
              }
            });
          });
        }
      });

      // Convert set to formatted array for UI and store in map
      const formattedMetrics = Array.from(scenarioMetricSet).map((metric) => ({
        id: metric,
        name: formatMetricName(metric),
        selected: true, // Auto-select all metrics by default
      }));

      scenarioMetricsMap[scenarioId] = formattedMetrics;
    });

    return scenarioMetricsMap;
  };

  // Helper function to normalize scope format for comparison
  const normalizeScope = (scope) => {
    if (!scope) return "";

    // Remove spaces and convert to lowercase
    return scope.toLowerCase().replace(/\s+/g, "");
  };

  // Initialize settings when scenarios change
  useEffect(() => {
    const initialSettings = {};

    selectedScenarios.forEach((scenarioId) => {
      const scenario = allScenarios.find((s) => s.id === scenarioId);
      if (!scenario) return;

      initialSettings[scenarioId] = {
        includeNetZero: true,
        targetYear: scenario.targetYear || 2035,
      };
    });

    setScenarioSettings(initialSettings);
  }, [selectedScenarios, allScenarios]);

  // In your component
  useEffect(() => {
    if (comparisonData) {
      const scenarioMetrics = extractUniqueMetricsForScenarios(comparisonData);

      // Update filters with the extracted scenario metrics
      setFilters((prevFilters) => ({
        ...prevFilters,
        scenarioMetrics,
      }));
    }
  }, [comparisonData]);

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
    if (typeof comparisonData === "object" && !Array.isArray(comparisonData)) {
      // Process all scenarios in comparison data
      Object.entries(comparisonData).forEach(([scenarioId, scenarioData]) => {
        // Get the yearly_data
        const yearlyData = scenarioData.yearly_data || {};

        // Iterate through each year's data
        Object.values(yearlyData).forEach((activities) => {
          if (Array.isArray(activities)) {
            activities.forEach((activity) => {
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
    if (typeof comparisonData === "object" && !Array.isArray(comparisonData)) {
      // Process all scenarios in comparison data
      Object.entries(comparisonData).forEach(([scenarioId, scenarioData]) => {
        // Get the yearly_data
        const yearlyData = scenarioData.yearly_data || {};

        // Iterate through each year's data
        Object.values(yearlyData).forEach((activities) => {
          if (Array.isArray(activities)) {
            activities.forEach((activity) => {
              // Check if the activity matches the selected scope
              const scopeMatch =
                (filters.scope && filters.scope.includes("Aggregated Scope")) ||
                (Array.isArray(filters.scope) &&
                  filters.scope.some(
                    (s) => normalizeScope(activity.scope) === normalizeScope(s)
                  ));

              // Add category if scope matches and category exists
              if (
                scopeMatch &&
                activity.category &&
                activity.category !== "Aggregated Scope"
              ) {
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
    if (typeof comparisonData === "object" && !Array.isArray(comparisonData)) {
      // Process all scenarios in comparison data
      Object.entries(comparisonData).forEach(([scenarioId, scenarioData]) => {
        // Get the yearly_data
        const yearlyData = scenarioData.yearly_data || {};

        // Iterate through each year's data
        Object.values(yearlyData).forEach((activities) => {
          if (Array.isArray(activities)) {
            activities.forEach((activity) => {
              // Check if the activity matches the selected scope and category
              const scopeMatch =
                (filters.scope && filters.scope.includes("Aggregated Scope")) ||
                (Array.isArray(filters.scope) &&
                  filters.scope.some(
                    (s) => normalizeScope(activity.scope) === normalizeScope(s)
                  ));

              const categoryMatch =
                (filters.category &&
                  filters.category.includes("Aggregated Scope")) ||
                (Array.isArray(filters.category) &&
                  filters.category.some((c) => activity.category === c));

              // Add subcategory if scope and category match and subcategory exists
              if (
                scopeMatch &&
                categoryMatch &&
                activity.sub_category &&
                activity.sub_category !== "Aggregated Scope"
              ) {
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
    if (typeof comparisonData === "object" && !Array.isArray(comparisonData)) {
      // Process all scenarios in comparison data
      Object.entries(comparisonData).forEach(([scenarioId, scenarioData]) => {
        // Get the yearly_data
        const yearlyData = scenarioData.yearly_data || {};

        // Iterate through each year's data
        Object.values(yearlyData).forEach((activities) => {
          if (Array.isArray(activities)) {
            activities.forEach((activity) => {
              const scopeMatch =
                (filters.scope && filters.scope.includes("Aggregated Scope")) ||
                (Array.isArray(filters.scope) &&
                  filters.scope.some(
                    (s) => normalizeScope(activity.scope) === normalizeScope(s)
                  ));

              const categoryMatch =
                (filters.category &&
                  filters.category.includes("Aggregated Scope")) ||
                (Array.isArray(filters.category) &&
                  filters.category.some((c) => activity.category === c));

              const subCategoryMatch =
                (filters.subCategory &&
                  filters.subCategory.includes("Aggregated Scope")) ||
                (Array.isArray(filters.subCategory) &&
                  filters.subCategory.some(
                    (sc) => activity.sub_category === sc
                  ));

              // Add activity name if it matches filters
              if (
                scopeMatch &&
                categoryMatch &&
                subCategoryMatch &&
                activity.activity_name &&
                activity.activity_name !== "Aggregated Scope"
              ) {
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
      setFilters((prevFilters) => {
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
              existingMetrics.map((m) => [m.id, m])
            );

            // For each new metric, check if it exists and preserve selection state
            mergedScenarioMetrics[scenarioId] = newMetrics.map((newMetric) => {
              if (existingMetricsMap.has(newMetric.id)) {
                // Preserve the selection state if metric already exists
                return {
                  ...newMetric,
                  selected: existingMetricsMap.get(newMetric.id).selected,
                };
              }
              // New metrics are selected by default
              return newMetric;
            });
          }
        });

        return {
          ...prevFilters,
          scenarioMetrics: mergedScenarioMetrics,
        };
      });
    }
  }, [comparisonData]);

  // Handle outside clicks for download dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close trend chart dropdown if clicked outside
      if (
        trendDownloadButtonRef.current &&
        trendDownloadOptionsRef.current &&
        !trendDownloadButtonRef.current.contains(event.target) &&
        !trendDownloadOptionsRef.current.contains(event.target)
      ) {
        setShowTrendDownloadOptions(false);
      }

      // Close gap chart dropdown if clicked outside
      if (
        gapDownloadButtonRef.current &&
        gapDownloadOptionsRef.current &&
        !gapDownloadButtonRef.current.contains(event.target) &&
        !gapDownloadOptionsRef.current.contains(event.target)
      ) {
        setShowGapDownloadOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    console.log("ComparisonView: Filter change detected:", newFilters);

    // Properly handle the scenarioMetrics to avoid losing state
    setFilters((prevFilters) => {
      console.log("ComparisonView: Previous filters:", prevFilters);

      // Create a new object (important for React to detect changes)
      const updatedFilters = { ...prevFilters };

      // Special handling for scenarioMetrics
      if (newFilters.scenarioMetrics) {
        updatedFilters.scenarioMetrics = {
          ...(prevFilters.scenarioMetrics || {}),
          ...newFilters.scenarioMetrics,
        };

        console.log(
          "ComparisonView: Updated scenarioMetrics:",
          updatedFilters.scenarioMetrics
        );
      }

      // Handle all other filter types
      Object.entries(newFilters).forEach(([key, value]) => {
        // Skip scenarioMetrics as we've already handled it
        if (key === "scenarioMetrics") return;

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
    if (
      comparisonData &&
      Object.keys(comparisonData).length > 0 &&
      Object.keys(scenarioSettings).length > 0 &&
      filters.scenarioMetrics
    ) {
      console.log(
        "ComparisonView: Regenerating chart data due to filters change"
      );
      console.log(
        "ComparisonView: Current scenarioMetrics:",
        filters.scenarioMetrics
      );

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
    if (
      comparisonData &&
      Object.keys(comparisonData).length > 0 &&
      Object.keys(scenarioSettings).length > 0
    ) {
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
    // This is for the OVERALL chart display range - it should show all scenarios to their full extent
    let maxTargetYear = 0;
    let minBaseYear = Number.MAX_SAFE_INTEGER;

    selectedScenarios.forEach((scenarioId) => {
      const scenario = allScenarios.find((s) => s.id === scenarioId);
      if (!scenario) return;

      // Always use the scenario's original target year for chart range calculation
      // NOT the user-adjusted target year for net-zero pathways
      const baseYear = scenario.baseYear || 2024;
      const originalTargetYear = scenario.targetYear || 2035;

      console.log(
        `Scenario ${scenarioId}: baseYear=${baseYear}, originalTargetYear=${originalTargetYear}`
      );

      // Update max target year and min base year for CHART RANGE
      maxTargetYear = Math.max(maxTargetYear, originalTargetYear);
      minBaseYear = Math.min(minBaseYear, baseYear);
    });

    console.log(
      `Chart range: minBaseYear=${minBaseYear}, maxTargetYear=${maxTargetYear}`
    );

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
      const scenario = allScenarios.find((s) => s.id === scenarioId);
      if (!scenario) return;

      // Get scenario-specific data
      const scenarioData = comparisonData[scenarioId];
      if (!scenarioData) return;

      // Get selected metrics for this scenario
      const scenarioMetrics = filters.scenarioMetrics?.[scenarioId] || [];
      const selectedMetricIds = scenarioMetrics
        .filter((metric) => metric.selected)
        .map((metric) => metric.id);

      console.log(
        `Scenario ${scenarioId} selected metrics:`,
        selectedMetricIds
      );

      // If no metrics are selected, don't show any data
      if (selectedMetricIds.length === 0) {
        console.log(`No metrics selected for scenario ${scenarioId}, skipping`);
        return;
      }

      // Colors for emissions and net-zero lines
      const colors = ["#3182CE", "#2563EB", "#EF4444", "#8B5CF6", "#10B981"];
      const netZeroColors = [
        "#48BB78",
        "#10B981",
        "#FB7185",
        "#A78BFA",
        "#14B8A6",
      ];

      // Get base year and target year for this scenario
      const baseYear = scenario.baseYear || 2024;
      const scenarioTargetYear = scenario.targetYear || 2035; // Original scenario target year

      // Get user-adjusted settings (for net-zero pathway only)
      const settings = scenarioSettings[scenarioId] || {};
      const userTargetYear = settings.targetYear || scenarioTargetYear; // User-adjusted target year

      // Extract unique years from the comparison data
      const yearsSet = new Set();

      // Add years from yearly_data
      if (scenarioData.yearly_data) {
        Object.keys(scenarioData.yearly_data).forEach((year) => {
          yearsSet.add(parseInt(year));
        });
      }

      // Add years from totals
      if (scenarioData.totals) {
        Object.keys(scenarioData.totals).forEach((year) => {
          yearsSet.add(parseInt(year));
        });
      }

      // Create a years array from minBaseYear to maxTargetYear for this scenario
      // Important: We want the x-axis to go up to the scenario's original target year
      // NOT the user-adjusted target year (which only affects net-zero)
      const scenarioYears = [];
      for (let year = minBaseYear; year <= scenarioTargetYear; year++) {
        scenarioYears.push(year);
      }

      console.log(`Scenario ${scenarioId} year range:`, scenarioYears);

      // We'll store calculated values for each year to use for extrapolation
      const calculatedValues = {};

      // First pass: calculate values for years we have data for
      scenarioYears.forEach((year) => {
        if (scenarioData.totals && scenarioData.totals[year]) {
          let totalValue = 0;
          const yearTotals = scenarioData.totals[year];

          // Sum up the selected metrics
          selectedMetricIds.forEach((metricId) => {
            if (yearTotals[metricId] !== undefined) {
              totalValue += parseFloat(yearTotals[metricId]);
            }
          });

          calculatedValues[year] = totalValue;
        } else if (scenarioData.yearly_data && scenarioData.yearly_data[year]) {
          let totalValue = 0;
          const activities = scenarioData.yearly_data[year] || [];

          // Sum up the selected metrics across all activities
          if (Array.isArray(activities)) {
            activities.forEach((activity) => {
              selectedMetricIds.forEach((metricId) => {
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
      scenarioYears.forEach((year) => {
        if (calculatedValues[year] === undefined) {
          // Find the closest year with data before this year
          const previousYears = scenarioYears.filter(
            (y) => y < year && calculatedValues[y] !== undefined
          );

          if (previousYears.length > 0) {
            // Use the most recent year with data for extrapolation
            const latestPreviousYear = Math.max(...previousYears);
            const yearDiff = year - latestPreviousYear;

            // Apply a simple reduction factor (5% per year) for future projections
            calculatedValues[year] =
              calculatedValues[latestPreviousYear] * Math.pow(0.95, yearDiff);
          } else {
            // No previous data points, check if we have any future data points
            const futureYears = scenarioYears.filter(
              (y) => y > year && calculatedValues[y] !== undefined
            );

            if (futureYears.length > 0) {
              // Use the earliest future year with data for backward extrapolation
              const earliestFutureYear = Math.min(...futureYears);
              const yearDiff = earliestFutureYear - year;

              // Apply an increase factor (5% per year) for backward projections
              calculatedValues[year] =
                calculatedValues[earliestFutureYear] * Math.pow(1.05, yearDiff);
            } else {
              // No data at all, default to zero
              calculatedValues[year] = 0;
            }
          }
        }
      });

      // Convert to data points format for the chart
      const dataPoints = scenarioYears.map((year) => ({
        x: year,
        y: parseFloat((calculatedValues[year] || 0).toFixed(2)), // Round emissions values to 2 decimal places
      }));

      console.log(`Scenario ${scenarioId} emissions data points:`, dataPoints);

      // Add to results with appropriate color - one line per scenario (total)
      result.push({
        id: `${scenario.name} (Emissions)`,
        data: dataPoints,
        color: colors[index % colors.length],
      });

      // Only generate net-zero line if it's enabled in settings
      if (settings?.includeNetZero) {
        // Find starting emissions value from the first year
        const startValue =
          dataPoints.find((p) => p.x === scenarioYears[0])?.y || 0;

        // Create a years array specifically for the net-zero pathway
        // This might be shorter than the scenario years if user selected an earlier target year
        const netZeroYears = [];
        for (
          let year = minBaseYear;
          year <= Math.max(userTargetYear, baseYear);
          year++
        ) {
          netZeroYears.push(year);
        }

        // Generate net-zero points based on the user-adjusted target year setting
        const netZeroPoints = netZeroYears.map((year) => {
          // Calculate based on this scenario's USER-ADJUSTED target year
          const yearFactor = (year - baseYear) / (userTargetYear - baseYear);

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
            y: Math.max(0, parseFloat(value.toFixed(2))), // Round to 2 decimal places
          };
        });

        console.log(
          `Scenario ${scenarioId} net-zero data points with target year ${userTargetYear}:`,
          netZeroPoints
        );

        result.push({
          id: `${scenario.name} (Net-Zero to ${userTargetYear})`,
          data: netZeroPoints,
          color: netZeroColors[index % netZeroColors.length],
          dashed: true,
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
    // For the chart range, use the scenario's ORIGINAL target year, not the user-adjusted one
    let maxTargetYear = 0;
    let minBaseYear = Number.MAX_SAFE_INTEGER;

    selectedScenarios.forEach((scenarioId) => {
      const scenario = allScenarios.find((s) => s.id === scenarioId);
      if (!scenario) return;

      // Get base year and original target year from scenario
      const baseYear = scenario.baseYear || 2024;
      const originalTargetYear = scenario.targetYear || 2035;

      console.log(
        `Gap chart - Scenario ${scenarioId}: baseYear=${baseYear}, originalTargetYear=${originalTargetYear}`
      );

      // Update max target year and min base year
      maxTargetYear = Math.max(maxTargetYear, originalTargetYear);
      minBaseYear = Math.min(minBaseYear, baseYear);
    });

    console.log(
      `Gap chart range: minBaseYear=${minBaseYear}, maxTargetYear=${maxTargetYear}`
    );

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
    const result = allYears.map((year) => {
      const yearData = { year };

      selectedScenarios.forEach((scenarioId) => {
        const scenario = allScenarios.find((s) => s.id === scenarioId);
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

        // Get base year and target years
        const baseYear = scenario.baseYear || 2024;
        const originalTargetYear = scenario.targetYear || 2035;
        const userTargetYear = settings.targetYear || originalTargetYear;

        // If net-zero is not included or this year is beyond the user's target year, set gap to 0
        if (!settings.includeNetZero || year > userTargetYear) {
          yearData[`${scenario.name} Gap`] = 0;
          return;
        }

        // Get selected metrics for this scenario
        const scenarioMetrics = filters.scenarioMetrics?.[scenarioId] || [];
        const selectedMetricIds = scenarioMetrics
          .filter((metric) => metric.selected)
          .map((metric) => metric.id);

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
            selectedMetricIds.forEach((metricId) => {
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
              activities.forEach((activity) => {
                selectedMetricIds.forEach((metricId) => {
                  if (activity[metricId] !== undefined) {
                    value += parseFloat(activity[metricId]);
                  }
                });
              });
            }
          }

          return value;
        };

        // Create years array for this specific scenario (up to its original target year)
        const scenarioYears = [];
        for (let y = minBaseYear; y <= originalTargetYear; y++) {
          scenarioYears.push(y);
        }

        // First calculate values for years with available data
        scenarioYears.forEach((y) => {
          // Check if we have data for this year
          if (
            (scenarioData.totals && scenarioData.totals[y]) ||
            (scenarioData.yearly_data && scenarioData.yearly_data[y])
          ) {
            calculatedEmissions[y] = calculateEmissionsForYear(y);
          }
        });

        // Now fill in missing years with extrapolated data
        scenarioYears.forEach((y) => {
          if (calculatedEmissions[y] === undefined) {
            // Find the closest year with data before this year
            const previousYears = scenarioYears.filter(
              (prevY) => prevY < y && calculatedEmissions[prevY] !== undefined
            );

            if (previousYears.length > 0) {
              // Use the most recent year with data
              const latestPreviousYear = Math.max(...previousYears);
              const yearDiff = y - latestPreviousYear;

              // Simple 5% reduction per year for future extrapolation
              calculatedEmissions[y] =
                calculatedEmissions[latestPreviousYear] *
                Math.pow(0.95, yearDiff);
            } else {
              // No previous data, try future years
              const futureYears = scenarioYears.filter(
                (futY) => futY > y && calculatedEmissions[futY] !== undefined
              );

              if (futureYears.length > 0) {
                // Use earliest future year
                const earliestFutureYear = Math.min(...futureYears);
                const yearDiff = earliestFutureYear - y;

                // Simple 5% increase per year for backward extrapolation
                calculatedEmissions[y] =
                  calculatedEmissions[earliestFutureYear] *
                  Math.pow(1.05, yearDiff);
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
          const availableYears = Object.keys(calculatedEmissions).map((y) =>
            parseInt(y)
          );
          if (availableYears.length > 0) {
            const earliestYear = Math.min(...availableYears);
            startingEmissions = calculatedEmissions[earliestYear] || 0;
          }
        }

        // Calculate net-zero pathway value for this year using the USER-ADJUSTED target year
        const yearFactor = (year - baseYear) / (userTargetYear - baseYear);
        // Ensure factor is between 0 and 1 for more robust calculation
        const boundedFactor = Math.max(0, Math.min(1, yearFactor));

        // Linear reduction to zero by target year
        const netZeroValue = parseFloat(
          (startingEmissions * (1 - boundedFactor)).toFixed(2)
        );

        // The gap is the difference (but never negative)
        const gap = Math.max(0, emissionsValue - netZeroValue);
        yearData[`${scenario.name} Gap`] = parseFloat(gap.toFixed(2)); // Round to 2 decimal places
      });

      return yearData;
    });

    console.log("Final gap data:", result);
    return result;
  };

  // Handle trend chart download toggle
  const handleTrendDownloadToggle = useCallback(() => {
    setShowTrendDownloadOptions((prev) => !prev);
    // Always close the other dropdown
    setShowGapDownloadOptions(false);
  }, []);

  // Handle gap chart download toggle
  const handleGapDownloadToggle = useCallback(() => {
    setShowGapDownloadOptions((prev) => !prev);
    // Always close the other dropdown
    setShowTrendDownloadOptions(false);
  }, []);

  // Handle CSV download for trend chart
  const handleTrendDownloadCSV = useCallback(
    (e) => {
      // Stop propagation to prevent dropdown from closing immediately
      e.stopPropagation();

      if (!emissionsLineData || emissionsLineData.length === 0) {
        setDownloadError("No data available to download");
        return;
      }

      setIsDownloading(true);
      try {
        // Create CSV header row with column for year and a column for each series
        const headers = ["Year"];
        emissionsLineData.forEach((series) => {
          headers.push(series.id);
        });

        let csvContent = headers.join(",") + "\n";

        // Collect all years from all series for complete dataset
        const allYears = new Set();
        emissionsLineData.forEach((series) => {
          series.data.forEach((point) => {
            allYears.add(point.x);
          });
        });

        // Sort years numerically
        const sortedYears = Array.from(allYears).sort((a, b) => a - b);

        // Generate a row for each year
        sortedYears.forEach((year) => {
          const row = [year];

          // Add data for each series
          emissionsLineData.forEach((series) => {
            const point = series.data.find((p) => p.x === year);
            row.push(point ? point.y.toFixed(4) : "");
          });

          // Add the row to CSV content, properly escaped
          csvContent +=
            row
              .map((cell) => {
                // Escape cells with commas or quotes
                if (
                  typeof cell === "string" &&
                  (cell.includes(",") || cell.includes('"'))
                ) {
                  return `"${cell.replace(/"/g, '""')}"`;
                }
                return cell;
              })
              .join(",") + "\n";
        });

        // Create and download the CSV file
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const scenarioNames = selectedScenarios
          .map((id) => allScenarios.find((s) => s.id === id)?.name || id)
          .join("-");

        const a = document.createElement("a");
        a.setAttribute("hidden", "");
        a.setAttribute("href", url);
        a.setAttribute(
          "download",
          `emissions-trend-${scenarioNames}-${timestamp}.csv`
        );
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Close dropdown after download
        setShowTrendDownloadOptions(false);
      } catch (error) {
        console.error("Error creating trend CSV:", error);
        setDownloadError("Failed to download trend chart CSV");
      } finally {
        setIsDownloading(false);
      }
    },
    [emissionsLineData, selectedScenarios, allScenarios]
  );

  // Handle CSV download for gap chart
  const handleGapDownloadCSV = useCallback(
    (e) => {
      // Stop propagation to prevent dropdown from closing immediately
      e.stopPropagation();

      if (!emissionsGapData || emissionsGapData.length === 0) {
        setDownloadError("No gap data available to download");
        return;
      }

      setIsDownloading(true);
      try {
        // Get all columns for this dataset (first row contains all keys)
        const firstRow = emissionsGapData[0] || {};
        const headers = Object.keys(firstRow);

        let csvContent = headers.join(",") + "\n";

        // Process each data row
        emissionsGapData.forEach((rowData) => {
          const row = headers.map((key) =>
            rowData[key] !== undefined ? rowData[key] : ""
          );

          // Add the row to CSV content, properly escaped
          csvContent +=
            row
              .map((cell) => {
                // Escape cells with commas or quotes
                if (
                  typeof cell === "string" &&
                  (cell.includes(",") || cell.includes('"'))
                ) {
                  return `"${cell.replace(/"/g, '""')}"`;
                }
                return cell;
              })
              .join(",") + "\n";
        });

        // Create and download the CSV file
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const scenarioNames = selectedScenarios
          .map((id) => allScenarios.find((s) => s.id === id)?.name || id)
          .join("-");

        const a = document.createElement("a");
        a.setAttribute("hidden", "");
        a.setAttribute("href", url);
        a.setAttribute(
          "download",
          `emissions-gap-${scenarioNames}-${timestamp}.csv`
        );
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Close dropdown after download
        setShowGapDownloadOptions(false);
      } catch (error) {
        console.error("Error creating gap CSV:", error);
        setDownloadError("Failed to download gap chart CSV");
      } finally {
        setIsDownloading(false);
      }
    },
    [emissionsGapData, selectedScenarios, allScenarios]
  );

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

  // Handle PNG download for trend chart
  const handleTrendDownloadPNG = useCallback(
    (e) => {
      // Stop propagation to prevent dropdown from closing immediately
      e.stopPropagation();

      if (!trendChartContainerRef.current) {
        setDownloadError("Trend chart element not found");
        return;
      }

      setIsDownloading(true);
      try {
        // Find the chart SVG element
        const svgElement = trendChartContainerRef.current.querySelector("svg");

        if (!svgElement) {
          console.error("Could not find trend chart SVG element");
          setDownloadError("Could not find trend chart to download");
          setIsDownloading(false);
          return;
        }

        // Create a copy of the SVG to manipulate without affecting the displayed one
        const svgClone = svgElement.cloneNode(true);

        // Get the original dimensions
        const originalWidth = svgElement.getBoundingClientRect().width;
        const originalHeight = svgElement.getBoundingClientRect().height;

        // Increased padding for better spacing and to prevent cutoff
        const paddingLeft = 60; // Reduced left padding as requested
        const paddingRight = 250; // Significantly increased to prevent right-side data cutoff
        const paddingTop = 100; // Increased for title and top spacing
        const paddingBottom = 180; // Increased for bottom text and x-axis labels

        // Increase the base dimensions to ensure full graph visibility
        const extraWidth = 200; // Additional width to ensure full graph capture
        const extraHeight = 50; // Additional height for better proportion

        const newWidth =
          originalWidth + paddingLeft + paddingRight + extraWidth;
        const newHeight =
          originalHeight + paddingTop + paddingBottom + extraHeight;

        // Set expanded dimensions
        svgClone.setAttribute("width", newWidth);
        svgClone.setAttribute("height", newHeight);

        // Set viewBox to ensure proper scaling
        svgClone.setAttribute("viewBox", `0 0 ${newWidth} ${newHeight}`);

        // Create a padding group that will offset everything
        const paddingGroup = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g"
        );
        paddingGroup.setAttribute(
          "transform",
          `translate(${paddingLeft}, ${paddingTop})`
        );

        // Move all original children to the padding group
        while (svgClone.firstChild) {
          paddingGroup.appendChild(svgClone.firstChild);
        }

        // Add white background as the first element
        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        rect.setAttribute("width", newWidth);
        rect.setAttribute("height", newHeight);
        rect.setAttribute("fill", "white");
        svgClone.appendChild(rect);

        // Add the padding group after the background
        svgClone.appendChild(paddingGroup);

        // Find and adjust x-axis labels to ensure they're visible
        const xAxisLabels = svgClone.querySelectorAll(
          'g.xAxis text, text[class*="axis-bottom"], [class*="nivo"] text'
        );
        xAxisLabels.forEach((label) => {
          // Move x-axis labels down and ensure they're visible
          const currentDy = label.getAttribute("dy") || "0";
          const newDy = parseFloat(currentDy.replace("em", "")) + 1.2;
          label.setAttribute("dy", `${newDy}em`);

          // Ensure text is black and visible
          label.setAttribute("fill", "#333");
          label.setAttribute("font-size", "12px");
        });

        // Find and adjust y-axis labels
        const yAxisLabels = svgClone.querySelectorAll(
          'g.yAxis text, text[class*="axis-left"]'
        );
        yAxisLabels.forEach((label) => {
          // Ensure y-axis labels are visible and properly positioned
          label.setAttribute("fill", "#333");
          label.setAttribute("font-size", "12px");
        });

        // Add chart title at the top
        const chartTitle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        chartTitle.setAttribute("x", newWidth / 2);
        chartTitle.setAttribute("y", 40); // Top padding area
        chartTitle.setAttribute("text-anchor", "middle");
        chartTitle.setAttribute("font-family", "Arial, sans-serif");
        chartTitle.setAttribute("font-size", "18px");
        chartTitle.setAttribute("font-weight", "bold");
        chartTitle.setAttribute("fill", "#333");
        chartTitle.textContent = "Emissions Trend Comparison";
        svgClone.appendChild(chartTitle);

        // Add a subtle border around the entire image
        const border = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        border.setAttribute("x", "5");
        border.setAttribute("y", "5");
        border.setAttribute("width", newWidth - 10);
        border.setAttribute("height", newHeight - 10);
        border.setAttribute("fill", "none");
        border.setAttribute("stroke", "#e5e5e5");
        border.setAttribute("stroke-width", "2");
        border.setAttribute("rx", "8");
        svgClone.appendChild(border);

        // Add a separator line above the bottom information
        const separator = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        separator.setAttribute("x1", paddingLeft);
        separator.setAttribute("y1", newHeight - paddingBottom + 20);
        separator.setAttribute("x2", newWidth - paddingRight);
        separator.setAttribute("y2", newHeight - paddingBottom + 20);
        separator.setAttribute("stroke", "#d1d5db");
        separator.setAttribute("stroke-width", "1");
        svgClone.appendChild(separator);

        // Add scenarios subtitle
        const scenarioNames = selectedScenarios
          .map((id) => allScenarios.find((s) => s.id === id)?.name || id)
          .join(", ");

        const subtitleText = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        subtitleText.setAttribute("x", newWidth / 2);
        subtitleText.setAttribute("y", newHeight - paddingBottom + 50); // Better spacing
        subtitleText.setAttribute("text-anchor", "middle");
        subtitleText.setAttribute("font-family", "Arial, sans-serif");
        subtitleText.setAttribute("font-size", "14px");
        subtitleText.setAttribute("font-weight", "600");
        subtitleText.setAttribute("fill", "#555");
        subtitleText.textContent = `Scenarios: ${scenarioNames}`;
        svgClone.appendChild(subtitleText);

        // Add scope information
        const scopeInfo = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        scopeInfo.setAttribute("x", newWidth / 2);
        scopeInfo.setAttribute("y", newHeight - paddingBottom + 75);
        scopeInfo.setAttribute("text-anchor", "middle");
        scopeInfo.setAttribute("font-family", "Arial, sans-serif");
        scopeInfo.setAttribute("font-size", "12px");
        scopeInfo.setAttribute("fill", "#666");
        scopeInfo.textContent = `Scope: ${getScopeDisplayLabel()}`;
        svgClone.appendChild(scopeInfo);

        // Add generation info
        const infoText = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        infoText.setAttribute("x", newWidth / 2);
        infoText.setAttribute("y", newHeight - paddingBottom + 100);
        infoText.setAttribute("text-anchor", "middle");
        infoText.setAttribute("font-family", "Arial, sans-serif");
        infoText.setAttribute("font-size", "11px");
        infoText.setAttribute("fill", "#888");
        const now = new Date();
        infoText.textContent = `Generated on ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
        svgClone.appendChild(infoText);

        // Convert SVG to string
        const svgString = new XMLSerializer().serializeToString(svgClone);
        const svgBlob = new Blob([svgString], {
          type: "image/svg+xml;charset=utf-8",
        });

        // Create canvas with higher resolution for better quality
        const canvas = document.createElement("canvas");
        const scale = Math.max(window.devicePixelRatio || 1, 2); // Minimum 2x for high quality
        canvas.width = newWidth * scale;
        canvas.height = newHeight * scale;

        // Set up the context with proper scaling for high DPI
        const ctx = canvas.getContext("2d");
        ctx.scale(scale, scale);

        // Enable better rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Convert to data URL first, then draw to canvas
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();

        img.onload = () => {
          // Fill with white background first
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, newWidth, newHeight);

          // Draw the SVG image
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          URL.revokeObjectURL(url);

          // Get file name with timestamp for uniqueness
          const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
          const scenarioIds = selectedScenarios.join("-");
          const fileName = `emissions-trend-${scenarioIds}-${timestamp}.png`;

          // Download as PNG with high quality
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                console.error("Canvas to Blob conversion failed");
                setDownloadError("Failed to generate trend PNG");
                setIsDownloading(false);
                return;
              }

              const downloadUrl = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = downloadUrl;
              a.download = fileName;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(downloadUrl);

              // Close dropdown after successful download
              setShowTrendDownloadOptions(false);
              setIsDownloading(false);
            },
            "image/png",
            1.0
          );
        };

        // Handle load errors
        img.onerror = (error) => {
          console.error("Error loading SVG for trend conversion:", error);
          setDownloadError("Failed to create PNG from trend chart");
          URL.revokeObjectURL(url);
          setIsDownloading(false);
        };

        img.src = url;
      } catch (error) {
        console.error("Error creating trend PNG:", error);
        setDownloadError("Failed to download trend PNG");
        setIsDownloading(false);
      }
    },
    [
      trendChartContainerRef,
      selectedScenarios,
      allScenarios,
      getScopeDisplayLabel,
    ]
  );

  // Handle PNG download for gap chart
  const handleGapDownloadPNG = useCallback(
    (e) => {
      // Stop propagation to prevent dropdown from closing immediately
      e.stopPropagation();

      if (!gapChartContainerRef.current) {
        setDownloadError("Gap chart element not found");
        return;
      }

      setIsDownloading(true);
      try {
        // Find the chart SVG element
        const svgElement = gapChartContainerRef.current.querySelector("svg");

        if (!svgElement) {
          console.error("Could not find gap chart SVG element");
          setDownloadError("Could not find gap chart to download");
          setIsDownloading(false);
          return;
        }

        // Create a copy of the SVG to manipulate without affecting the displayed one
        const svgClone = svgElement.cloneNode(true);

        // Get the original dimensions
        const originalWidth = svgElement.getBoundingClientRect().width;
        const originalHeight = svgElement.getBoundingClientRect().height;

        // Increased padding for better spacing and to prevent cutoff
        const paddingLeft = 60; // Reduced left padding as requested
        const paddingRight = 250; // Significantly increased to prevent right-side data cutoff
        const paddingTop = 100; // Increased for title and top spacing
        const paddingBottom = 180; // Increased for bottom text and x-axis labels

        // Increase the base dimensions to ensure full graph visibility
        const extraWidth = 200; // Additional width to ensure full graph capture
        const extraHeight = 50; // Additional height for better proportion

        const newWidth =
          originalWidth + paddingLeft + paddingRight + extraWidth;
        const newHeight =
          originalHeight + paddingTop + paddingBottom + extraHeight;

        // Set expanded dimensions
        svgClone.setAttribute("width", newWidth);
        svgClone.setAttribute("height", newHeight);

        // Set viewBox to ensure proper scaling
        svgClone.setAttribute("viewBox", `0 0 ${newWidth} ${newHeight}`);

        // Create a padding group that will offset everything
        const paddingGroup = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g"
        );
        paddingGroup.setAttribute(
          "transform",
          `translate(${paddingLeft}, ${paddingTop})`
        );

        // Move all original children to the padding group
        while (svgClone.firstChild) {
          paddingGroup.appendChild(svgClone.firstChild);
        }

        // Add white background as the first element
        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        rect.setAttribute("width", newWidth);
        rect.setAttribute("height", newHeight);
        rect.setAttribute("fill", "white");
        svgClone.appendChild(rect);

        // Add the padding group after the background
        svgClone.appendChild(paddingGroup);

        // Find and adjust x-axis labels to ensure they're visible
        const xAxisLabels = svgClone.querySelectorAll(
          'g.xAxis text, text[class*="axis-bottom"], [class*="nivo"] text'
        );
        xAxisLabels.forEach((label) => {
          // Move x-axis labels down and ensure they're visible
          const currentDy = label.getAttribute("dy") || "0";
          const newDy = parseFloat(currentDy.replace("em", "")) + 1.2;
          label.setAttribute("dy", `${newDy}em`);

          // Ensure text is black and visible
          label.setAttribute("fill", "#333");
          label.setAttribute("font-size", "12px");
        });

        // Find and adjust y-axis labels
        const yAxisLabels = svgClone.querySelectorAll(
          'g.yAxis text, text[class*="axis-left"]'
        );
        yAxisLabels.forEach((label) => {
          // Ensure y-axis labels are visible and properly positioned
          label.setAttribute("fill", "#333");
          label.setAttribute("font-size", "12px");
        });

        // Add chart title at the top
        const chartTitle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        chartTitle.setAttribute("x", newWidth / 2);
        chartTitle.setAttribute("y", 40); // Top padding area
        chartTitle.setAttribute("text-anchor", "middle");
        chartTitle.setAttribute("font-family", "Arial, sans-serif");
        chartTitle.setAttribute("font-size", "18px");
        chartTitle.setAttribute("font-weight", "bold");
        chartTitle.setAttribute("fill", "#333");
        chartTitle.textContent = "Emissions Gap Analysis";
        svgClone.appendChild(chartTitle);

        // Add a subtle border around the entire image
        const border = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        border.setAttribute("x", "5");
        border.setAttribute("y", "5");
        border.setAttribute("width", newWidth - 10);
        border.setAttribute("height", newHeight - 10);
        border.setAttribute("fill", "none");
        border.setAttribute("stroke", "#e5e5e5");
        border.setAttribute("stroke-width", "2");
        border.setAttribute("rx", "8");
        svgClone.appendChild(border);

        // Add a separator line above the bottom information
        const separator = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        separator.setAttribute("x1", paddingLeft);
        separator.setAttribute("y1", newHeight - paddingBottom + 20);
        separator.setAttribute("x2", newWidth - paddingRight);
        separator.setAttribute("y2", newHeight - paddingBottom + 20);
        separator.setAttribute("stroke", "#d1d5db");
        separator.setAttribute("stroke-width", "1");
        svgClone.appendChild(separator);

        // Add scenarios subtitle
        const scenarioNames = selectedScenarios
          .map((id) => allScenarios.find((s) => s.id === id)?.name || id)
          .join(", ");

        const subtitleText = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        subtitleText.setAttribute("x", newWidth / 2);
        subtitleText.setAttribute("y", newHeight - paddingBottom + 50); // Better spacing
        subtitleText.setAttribute("text-anchor", "middle");
        subtitleText.setAttribute("font-family", "Arial, sans-serif");
        subtitleText.setAttribute("font-size", "14px");
        subtitleText.setAttribute("font-weight", "600");
        subtitleText.setAttribute("fill", "#555");
        subtitleText.textContent = `Scenarios: ${scenarioNames}`;
        svgClone.appendChild(subtitleText);

        // Add scope information
        const scopeInfo = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        scopeInfo.setAttribute("x", newWidth / 2);
        scopeInfo.setAttribute("y", newHeight - paddingBottom + 75);
        scopeInfo.setAttribute("text-anchor", "middle");
        scopeInfo.setAttribute("font-family", "Arial, sans-serif");
        scopeInfo.setAttribute("font-size", "12px");
        scopeInfo.setAttribute("fill", "#666");
        scopeInfo.textContent = `Analysis showing emissions gap from net-zero targets`;
        svgClone.appendChild(scopeInfo);

        // Add generation info
        const infoText = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        infoText.setAttribute("x", newWidth / 2);
        infoText.setAttribute("y", newHeight - paddingBottom + 100);
        infoText.setAttribute("text-anchor", "middle");
        infoText.setAttribute("font-family", "Arial, sans-serif");
        infoText.setAttribute("font-size", "11px");
        infoText.setAttribute("fill", "#888");
        const now = new Date();
        infoText.textContent = `Generated on ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
        svgClone.appendChild(infoText);

        // Convert SVG to string
        const svgString = new XMLSerializer().serializeToString(svgClone);
        const svgBlob = new Blob([svgString], {
          type: "image/svg+xml;charset=utf-8",
        });

        // Create canvas with higher resolution for better quality
        const canvas = document.createElement("canvas");
        const scale = Math.max(window.devicePixelRatio || 1, 2); // Minimum 2x for high quality
        canvas.width = newWidth * scale;
        canvas.height = newHeight * scale;

        // Set up the context with proper scaling for high DPI
        const ctx = canvas.getContext("2d");
        ctx.scale(scale, scale);

        // Enable better rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Convert to data URL first, then draw to canvas
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();

        img.onload = () => {
          // Fill with white background first
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, newWidth, newHeight);

          // Draw the SVG image
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          URL.revokeObjectURL(url);

          // Get file name with timestamp for uniqueness
          const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
          const scenarioIds = selectedScenarios.join("-");
          const fileName = `emissions-gap-${scenarioIds}-${timestamp}.png`;

          // Download as PNG with high quality
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                console.error("Canvas to Blob conversion failed");
                setDownloadError("Failed to generate gap PNG");
                setIsDownloading(false);
                return;
              }

              const downloadUrl = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = downloadUrl;
              a.download = fileName;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(downloadUrl);

              // Close dropdown after successful download
              setShowGapDownloadOptions(false);
              setIsDownloading(false);
            },
            "image/png",
            1.0
          );
        };

        // Handle load errors
        img.onerror = (error) => {
          console.error("Error loading SVG for gap conversion:", error);
          setDownloadError("Failed to create PNG from gap chart");
          URL.revokeObjectURL(url);
          setIsDownloading(false);
        };

        img.src = url;
      } catch (error) {
        console.error("Error creating gap PNG:", error);
        setDownloadError("Failed to download gap PNG");
        setIsDownloading(false);
      }
    },
    [gapChartContainerRef, selectedScenarios, allScenarios]
  );

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
          {/* Emissions Trend Chart Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-gray-900">
                Predicted Trend of Emissions over Years for (
                {getScopeDisplayLabel()})
              </h3>
              <div className="relative" ref={trendDownloadButtonRef}>
                <button
                  onClick={handleTrendDownloadToggle}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  disabled={isLoading || !comparisonData || isDownloading}
                >
                  {isDownloading ? "Processing..." : "Download"}
                  <FiDownload className="ml-2 h-4 w-4" />
                </button>

                {/* Download options dropdown */}
                {showTrendDownloadOptions && (
                  <div
                    ref={trendDownloadOptionsRef}
                    className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-md z-20"
                  >
                    <div className="py-1">
                      <button
                        onClick={handleTrendDownloadCSV}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                        disabled={isDownloading}
                      >
                        Download as CSV
                      </button>
                      <button
                        onClick={handleTrendDownloadPNG}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                        disabled={isDownloading}
                      >
                        Download as PNG
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Error message for downloads */}
            {downloadError && (
              <div className="mb-3 px-3 py-2 bg-red-50 text-red-600 rounded-md text-sm">
                {downloadError}
                <button
                  className="ml-2 text-red-700 hover:text-red-900"
                  onClick={() => setDownloadError(null)}
                >
                  <FiX className="inline h-4 w-4" />
                </button>
              </div>
            )}

            {comparisonData &&
            Object.keys(comparisonData).length > 0 &&
            emissionsLineData.length > 0 ? (
              <div
                ref={trendChartContainerRef}
                className="emission-chart-container"
              >
                <EmissionsTrendChart
                  data={emissionsLineData}
                  selectedScope={getScopeDisplayLabel()}
                />
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-md border border-gray-100">
                <FiInfo className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No emissions trend data available.
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {selectedScenarios.length === 0
                    ? "Please select scenarios to compare."
                    : "Try adjusting your filter settings or wait for data to load."}
                </p>
              </div>
            )}
          </div>

          {/* Emissions Gap Chart Section */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-gray-900">
                Emissions Gap vs Net-Zero Pathway
              </h3>
              <div className="relative" ref={gapDownloadButtonRef}>
                <button
                  onClick={handleGapDownloadToggle}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  disabled={
                    isLoading ||
                    !comparisonData ||
                    emissionsGapData.length === 0 ||
                    isDownloading
                  }
                >
                  {isDownloading ? "Processing..." : "Download"}
                  <FiDownload className="ml-2 h-4 w-4" />
                </button>

                {/* Download options dropdown */}
                {showGapDownloadOptions && (
                  <div
                    ref={gapDownloadOptionsRef}
                    className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-md z-20"
                  >
                    <div className="py-1">
                      <button
                        onClick={handleGapDownloadCSV}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                        disabled={isDownloading}
                      >
                        Download as CSV
                      </button>
                      <button
                        onClick={handleGapDownloadPNG}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                        disabled={isDownloading}
                      >
                        Download as PNG
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {comparisonData &&
            Object.keys(comparisonData).length > 0 &&
            emissionsGapData.length > 0 ? (
              <div
                ref={gapChartContainerRef}
                className="emission-chart-container"
              >
                <EmissionsGapChart data={emissionsGapData} />
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-md border border-gray-100">
                <FiInfo className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No emissions gap data available.
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {selectedScenarios.length === 0
                    ? "Please select scenarios to compare."
                    : "Try adjusting your filter settings or ensure net-zero projections are enabled."}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonView;
