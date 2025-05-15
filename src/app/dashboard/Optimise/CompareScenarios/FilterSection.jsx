// Updated FilterSection.jsx with debounced validation
import React, { useState, useEffect } from "react";
import FilterDropdown from "./FilterDropdown";
import MetricsSelector from "./MetricsSelector";

/**
 * Filter section component for scenario comparison
 *
 * @param {Object} props Component props
 * @param {Array} props.selectedScenarios IDs of selected scenarios
 * @param {Array} props.allScenarios All available scenarios
 * @param {Object} props.filters Current filter values
 * @param {Function} props.onFilterChange Callback for filter changes
 * @param {Function} props.onScenarioSettingsChange Callback for scenario settings changes
 * @param {Array} props.scopeOptions Available scope options
 * @param {Array} props.categoryOptions Available category options
 * @param {Array} props.subCategoryOptions Available subcategory options
 * @param {Array} props.activityOptions Available activity options
 */
const FilterSection = ({
  selectedScenarios = [],
  allScenarios = [],
  filters = {},
  onFilterChange,
  onScenarioSettingsChange,
  scopeOptions = ["Aggregated Scope"],
  categoryOptions = ["Aggregated Scope"],
  subCategoryOptions = ["Aggregated Scope"],
  activityOptions = ["Aggregated Scope"],
}) => {
  // Create local state for scenario-specific settings (excluding metrics)
  const [scenarioSettings, setScenarioSettings] = useState({});
  
  // Add validation errors state
  const [validationErrors, setValidationErrors] = useState({});
  
  // Temporary input values state (for debouncing)
  const [inputValues, setInputValues] = useState({});
  
  // Timeout refs for debouncing
  const timeoutRefs = React.useRef({});

  // Initialize settings for each scenario when selectedScenarios changes
  useEffect(() => {
    const initialSettings = {};
    const initialInputValues = {};

    selectedScenarios.forEach((scenarioId) => {
      const scenario = allScenarios.find((s) => s.id === scenarioId);
      if (!scenario) return;

      const targetYear = scenarioSettings[scenarioId]?.targetYear || scenario.targetYear || 2035;
      
      if (!scenarioSettings[scenarioId]) {
        initialSettings[scenarioId] = {
          includeNetZero: true,
          targetYear: targetYear,
        };
      } else {
        initialSettings[scenarioId] = { ...scenarioSettings[scenarioId] };
      }
      
      // Initialize input values
      initialInputValues[scenarioId] = {
        ...inputValues[scenarioId],
        targetYear: targetYear
      };
    });

    if (Object.keys(initialSettings).length > 0) {
      setScenarioSettings(initialSettings);
      setInputValues(prev => ({ ...prev, ...initialInputValues }));

      if (onScenarioSettingsChange) {
        onScenarioSettingsChange(initialSettings);
      }
    }
    
    // Clear timeout refs for scenarios that are no longer selected
    Object.keys(timeoutRefs.current).forEach(id => {
      if (!selectedScenarios.includes(id)) {
        if (timeoutRefs.current[id]) {
          clearTimeout(timeoutRefs.current[id]);
          delete timeoutRefs.current[id];
        }
      }
    });
    
  }, [selectedScenarios, allScenarios]);

  // Update a specific setting for a scenario with validation
  const updateScenarioSetting = (scenarioId, key, value) => {
    // If it's not the target year, update immediately
    if (key !== 'targetYear') {
      const updatedSettings = {
        ...scenarioSettings,
        [scenarioId]: {
          ...scenarioSettings[scenarioId],
          [key]: value,
        },
      };
      
      setScenarioSettings(updatedSettings);
      
      if (onScenarioSettingsChange) {
        onScenarioSettingsChange(updatedSettings);
      }
      return;
    }
    
    // For target year, validate after debounce
    validateAndUpdateTargetYear(scenarioId, value);
  };
  
  // Handle input change for target year (immediate update to input value)
  const handleTargetYearInputChange = (scenarioId, value) => {
    // Update the input value immediately for better user experience
    setInputValues(prev => ({
      ...prev,
      [scenarioId]: {
        ...prev[scenarioId],
        targetYear: value
      }
    }));
    
    // Clear any existing timeout
    if (timeoutRefs.current[scenarioId]) {
      clearTimeout(timeoutRefs.current[scenarioId]);
    }
    
    // Set new timeout for validation
    timeoutRefs.current[scenarioId] = setTimeout(() => {
      validateAndUpdateTargetYear(scenarioId, value);
    }, 500); // 500ms debounce
  };
  
  // Validate and update target year
  const validateAndUpdateTargetYear = (scenarioId, value) => {
    // Get the current scenario
    const scenario = allScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;
    
    const scenarioTargetYear = scenario.targetYear || 2035;
    const baseYear = scenario.baseYear || 2024;
    
    // Clear previous errors
    setValidationErrors(prev => ({
      ...prev,
      [scenarioId]: {
        ...prev[scenarioId],
        targetYear: null
      }
    }));
    
    // Convert string to number if needed
    const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
    
    // Check if the input is a valid number
    if (isNaN(numValue)) {
      setValidationErrors(prev => ({
        ...prev,
        [scenarioId]: {
          ...prev[scenarioId],
          targetYear: 'Please enter a valid year'
        }
      }));
      return;
    }
    
    // Check if the new target year exceeds the scenario's original target year
    if (numValue > scenarioTargetYear) {
      setValidationErrors(prev => ({
        ...prev,
        [scenarioId]: {
          ...prev[scenarioId],
          targetYear: `Cannot exceed scenario's target year (${scenarioTargetYear})`
        }
      }));
      return;
    }
    
    // Check if the target year is less than the base year
    if (numValue < baseYear) {
      setValidationErrors(prev => ({
        ...prev,
        [scenarioId]: {
          ...prev[scenarioId],
          targetYear: `Cannot be earlier than base year (${baseYear})`
        }
      }));
      return;
    }
    
    // Proceed with the update since validation passed
    const updatedSettings = {
      ...scenarioSettings,
      [scenarioId]: {
        ...scenarioSettings[scenarioId],
        targetYear: numValue,
      },
    };
    
    setScenarioSettings(updatedSettings);
    
    if (onScenarioSettingsChange) {
      onScenarioSettingsChange(updatedSettings);
    }
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, []);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    if (!onFilterChange) return;

    const arrayValue = Array.isArray(value) ? value : [value];

    switch (filterType) {
      case "scope":
        if (arrayValue.includes("Aggregated Scope")) {
          onFilterChange({
            scope: arrayValue,
            category: ["Aggregated Scope"],
            subCategory: ["Aggregated Scope"],
            activity: ["Aggregated Scope"],
          });
        } else {
          onFilterChange({ scope: arrayValue });
        }
        break;

      case "category":
        if (arrayValue.includes("Aggregated Scope")) {
          onFilterChange({
            category: arrayValue,
            subCategory: ["Aggregated Scope"],
            activity: ["Aggregated Scope"],
          });
        } else {
          onFilterChange({ category: arrayValue });
        }
        break;

      case "subCategory":
        if (arrayValue.includes("Aggregated Scope")) {
          onFilterChange({
            subCategory: arrayValue,
            activity: ["Aggregated Scope"],
          });
        } else {
          onFilterChange({ subCategory: arrayValue });
        }
        break;

      case "activity":
        onFilterChange({ activity: arrayValue });
        break;

      default:
        console.warn(`Unknown filter type: ${filterType}`);
    }
  };

  const getFilterValue = (key, defaultValue = ["Aggregated Scope"]) => {
    const value = filters[key];
    if (!value) return defaultValue;
    return Array.isArray(value) ? value : [value];
  };

  const currentScope = getFilterValue("scope");
  const currentCategory = getFilterValue("category");
  const currentSubCategory = getFilterValue("subCategory");
  const currentActivity = getFilterValue("activity");

  const isCategoryDisabled = currentScope.includes("Aggregated Scope");
  const isSubCategoryDisabled =
    isCategoryDisabled || currentCategory.includes("Aggregated Scope");
  const isActivityDisabled =
    isSubCategoryDisabled || currentSubCategory.includes("Aggregated Scope");

  // Handle metrics changes
  const handleMetricsChange = (scenarioId, updatedMetrics) => {
    console.log("FilterSection: Metrics changed for scenario", scenarioId);
    
    if (!onFilterChange) {
      console.error("FilterSection: onFilterChange callback is missing!");
      return;
    }
    
    // Create a deep copy of the current scenarioMetrics
    const updatedScenarioMetrics = { ...(filters.scenarioMetrics || {}) };
    
    // Update the metrics for this specific scenario
    updatedScenarioMetrics[scenarioId] = [...updatedMetrics];
    
    // Call the onFilterChange with the updated filters
    const newFilters = {
      ...filters,
      scenarioMetrics: updatedScenarioMetrics
    };
    
    onFilterChange(newFilters);
  };

  // Get the input value for a specific scenario and key
  const getInputValue = (scenarioId, key, defaultValue) => {
    if (inputValues[scenarioId] && inputValues[scenarioId][key] !== undefined) {
      return inputValues[scenarioId][key];
    }
    
    if (scenarioSettings[scenarioId] && scenarioSettings[scenarioId][key] !== undefined) {
      return scenarioSettings[scenarioId][key];
    }
    
    return defaultValue;
  };

  return (
    <div className="border-b border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Showing Result for:
      </h2>

      <div className="border border-gray-100 rounded-md p-3">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between w-full px-3 py-2 text-sm gap-4 mb-6">
          <FilterDropdown
            label="Scope:"
            selected={currentScope}
            setSelected={(value) => handleFilterChange("scope", value)}
            options={scopeOptions}
            defaultLabel="All Scopes"
            disabled={false}
          />
          <FilterDropdown
            label="Category:"
            selected={currentCategory}
            setSelected={(value) => handleFilterChange("category", value)}
            options={categoryOptions}
            defaultLabel="All Categories"
            disabled={isCategoryDisabled}
          />
          <FilterDropdown
            label="Sub Category:"
            selected={currentSubCategory}
            setSelected={(value) => handleFilterChange("subCategory", value)}
            options={subCategoryOptions}
            defaultLabel="All Sub-Categories"
            disabled={isSubCategoryDisabled}
          />
          <FilterDropdown
            label="Activity:"
            selected={currentActivity}
            setSelected={(value) => handleFilterChange("activity", value)}
            options={activityOptions}
            defaultLabel="All Activities"
            disabled={isActivityDisabled}
          />
        </div>

        {/* Scenario-specific metrics and settings */}
        {selectedScenarios.map((scenarioId) => {
          const scenario = allScenarios.find((s) => s.id === scenarioId);
          if (!scenario) return null;

          const settings = scenarioSettings[scenarioId] || {
            includeNetZero: true,
            targetYear: scenario.targetYear || 2035,
          };

          const scenarioMetrics = filters.scenarioMetrics?.[scenarioId] || [];
          
          // Get target year input value
          const targetYearValue = getInputValue(
            scenarioId, 
            'targetYear', 
            scenario.targetYear || 2035
          );

          return (
            <div
              key={scenarioId}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
            >
              <MetricsSelector
                scenario={scenario}
                scenarioMetrics={scenarioMetrics}
                onMetricsChange={(updatedMetrics) =>
                  handleMetricsChange(scenarioId, updatedMetrics)
                }
              />

              <div className="flex items-center">
                <input
                  id={`include-net-zero-${scenarioId}`}
                  type="checkbox"
                  checked={settings.includeNetZero}
                  onChange={() =>
                    updateScenarioSetting(
                      scenarioId,
                      "includeNetZero",
                      !settings.includeNetZero
                    )
                  }
                  className="h-4 w-4 green-checkbox border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`include-net-zero-${scenarioId}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  Include a net zero scenario for {scenario.name}
                </label>
              </div>

              <div className="flex flex-col items-start gap-1 justify-self-end">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor={`target-year-${scenarioId}`}
                    className="text-sm text-gray-700 whitespace-nowrap"
                  >
                    Enter Target Year:
                  </label>
                  <input
                    id={`target-year-${scenarioId}`}
                    type="number"
                    min={scenario.baseYear}
                    max={scenario.targetYear}
                    value={targetYearValue}
                    onChange={(e) => 
                      handleTargetYearInputChange(
                        scenarioId,
                        e.target.value
                      )
                    }
                    onBlur={() => {
                      // Validate on blur to ensure validation happens
                      // even if the user doesn't type for a while
                      if (timeoutRefs.current[scenarioId]) {
                        clearTimeout(timeoutRefs.current[scenarioId]);
                      }
                      validateAndUpdateTargetYear(scenarioId, targetYearValue);
                    }}
                    className={`w-24 rounded-md border ${validationErrors[scenarioId]?.targetYear ? 'border-red-500' : 'border-gray-300'} py-1 px-2 text-gray-700 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                  />
                </div>
                {validationErrors[scenarioId]?.targetYear && (
                  <p className="text-xs text-red-500 mt-1">
                    {validationErrors[scenarioId].targetYear}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSection;