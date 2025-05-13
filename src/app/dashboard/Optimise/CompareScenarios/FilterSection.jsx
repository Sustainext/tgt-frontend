// FilterSection.jsx
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

  // Initialize settings for each scenario when selectedScenarios changes
  useEffect(() => {
    const initialSettings = {};

    selectedScenarios.forEach((scenarioId) => {
      const scenario = allScenarios.find((s) => s.id === scenarioId);
      if (!scenario) return;

      if (!scenarioSettings[scenarioId]) {
        initialSettings[scenarioId] = {
          includeNetZero: true,
          targetYear: scenario.targetYear || 2035,
        };
      } else {
        initialSettings[scenarioId] = { ...scenarioSettings[scenarioId] };
      }
    });

    if (Object.keys(initialSettings).length > 0) {
      setScenarioSettings(initialSettings);

      if (onScenarioSettingsChange) {
        onScenarioSettingsChange(initialSettings);
      }
    }
  }, [selectedScenarios, allScenarios]);

  // Update a specific setting for a scenario
  const updateScenarioSetting = (scenarioId, key, value) => {
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
  };

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

 // Add/replace this function in FilterSection.jsx

// Handle metrics changes
const handleMetricsChange = (scenarioId, updatedMetrics) => {
  console.log("FilterSection: Metrics changed for scenario", scenarioId);
  console.log("FilterSection: Updated metrics", updatedMetrics);
  console.log("FilterSection: Current filters", filters);
  
  if (!onFilterChange) {
    console.error("FilterSection: onFilterChange callback is missing!");
    return;
  }
  
  // Create a deep copy of the current scenarioMetrics
  const updatedScenarioMetrics = { ...(filters.scenarioMetrics || {}) };
  
  // Update the metrics for this specific scenario
  updatedScenarioMetrics[scenarioId] = [...updatedMetrics];
  
  console.log("FilterSection: New scenarioMetrics object", updatedScenarioMetrics);
  
  // Call the onFilterChange with the updated filters
  // Important: Create a new object to ensure React detects the change
  const newFilters = {
    ...filters,
    scenarioMetrics: updatedScenarioMetrics
  };
  
  console.log("FilterSection: Sending updated filters", newFilters);
  onFilterChange(newFilters);
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

              <div className="flex items-center gap-2 justify-self-end">
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
                  max={2050}
                  value={settings.targetYear}
                  onChange={(e) =>
                    updateScenarioSetting(
                      scenarioId,
                      "targetYear",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-24 rounded-md border border-gray-300 py-1 px-2 text-gray-700 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSection;
