// FilterSection.jsx
import React, { useState, useEffect } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import ScopeDropdown from "./ScopeDropdown";
import MetricsSelector from "./MetricsSelector";

const FilterSection = ({ 
  selectedScenarios,
  allScenarios,
  selectedScope,
  setSelectedScope,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  selectedActivity,
  setSelectedActivity,
  
  // Replace with callback to parent
  onScenarioSettingsChange
}) => {
  // Create local state for scenario-specific settings including metrics
  const [scenarioSettings, setScenarioSettings] = useState({});

  // Default business metrics template
  const defaultMetrics = [
    { id: "fte", name: "FTE", selected: true },
    { id: "area", name: "Area", selected: true },
    { id: "production_volume", name: "Production Volume", selected: true },
    { id: "revenue", name: "Revenue", selected: false },
    { id: "employees", name: "Employees", selected: false }
  ];

  // Initialize settings for each scenario when selectedScenarios changes
  useEffect(() => {
    const initialSettings = {};
    
    selectedScenarios.forEach(scenarioId => {
      const scenario = allScenarios.find(s => s.id === scenarioId);
      if (!scenario) return;
      
      // If we don't have settings for this scenario yet, initialize them
      if (!scenarioSettings[scenarioId]) {
        initialSettings[scenarioId] = {
          includeNetZero: true,
          targetYear: scenario.targetYear || 2035,
          metrics: [...defaultMetrics] // Clone the default metrics
        };
      } else {
        // Keep existing settings
        initialSettings[scenarioId] = scenarioSettings[scenarioId];
      }
    });
    
    setScenarioSettings(initialSettings);
  }, [selectedScenarios]);

  // Update a specific setting for a scenario
  const updateScenarioSetting = (scenarioId, key, value) => {
    const updatedSettings = {
      ...scenarioSettings,
      [scenarioId]: {
        ...scenarioSettings[scenarioId],
        [key]: value
      }
    };
    
    setScenarioSettings(updatedSettings);
    
    // Notify parent component of changes
    if (onScenarioSettingsChange) {
      onScenarioSettingsChange(updatedSettings);
    }
  };
  
  // Update metrics for a specific scenario
  const updateScenarioMetrics = (scenarioId, updatedMetrics) => {
    updateScenarioSetting(scenarioId, 'metrics', updatedMetrics);
  };

  return (
    <div className="border-b border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Showing Result for:
      </h2>

      <div className="border border-gray-100 rounded-md p-3">
      
      {/* Scopes and Categories Filters - Horizontal Layout */}
      <div className="flex flex-wrap items-center justify-between w-full px-3 py-2 text-sm gap-4 mb-6">
        <ScopeDropdown 
          label="Scope:"
          selected={selectedScope}
          setSelected={setSelectedScope}
          options={["Aggregated Scope", "Scope 1", "Scope 2", "Scope 3"]}
          multiSelect={false}
        />
        
        <ScopeDropdown 
          label="Category:"
          selected={selectedCategory}
          setSelected={setSelectedCategory}
          options={["Aggregated Scope", "Mobile Combustion", "Stationary Combustion", "Fugitive Emissions"]}
          multiSelect={false}
        />
        
        <ScopeDropdown 
          label="Sub Category:"
          selected={selectedSubCategory}
          setSelected={setSelectedSubCategory}
          options={["Aggregated Scope", "Fuel", "Rail Freight", "Refrigerants"]}
          multiSelect={false}
        />
        
        <ScopeDropdown 
          label="Activity:"
          selected={selectedActivity}
          setSelected={setSelectedActivity}
          options={["Aggregated Scope", "Diesel Combustion", "Natural Gas", "Electricity"]}
          multiSelect={false}
        />
      </div>

      {/* Metrics and settings for each scenario */}
      {selectedScenarios.map((scenarioId) => {
        const scenario = allScenarios.find(s => s.id === scenarioId);
        if (!scenario) return null;
        
        // Get settings for this scenario
        const settings = scenarioSettings[scenarioId] || {
          includeNetZero: true,
          targetYear: scenario.targetYear || 2035,
          metrics: []
        };
        
        return (
          <div key={scenarioId} className="grid grid-cols-4 gap-4 mb-4">
            
            <MetricsSelector 
              scenario={scenario}
              scenarioMetrics={settings.metrics || []}
              onMetricsChange={(updatedMetrics) => updateScenarioMetrics(scenarioId, updatedMetrics)}
            />

            <div className="flex items-center">
              <input
                id={`include-net-zero-${scenarioId}`}
                type="checkbox"
                checked={settings.includeNetZero}
                onChange={() => updateScenarioSetting(
                  scenarioId, 
                  'includeNetZero', 
                  !settings.includeNetZero
                )}
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
              <label htmlFor={`target-year-${scenarioId}`} className="text-sm text-gray-700 whitespace-nowrap">
                Enter Target Year:
              </label>
              <input
                id={`target-year-${scenarioId}`}
                type="number"
                min={scenario.baseYear}
                max={2050}
                value={settings.targetYear}
                onChange={(e) => updateScenarioSetting(
                  scenarioId,
                  'targetYear',
                  parseInt(e.target.value)
                )}
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