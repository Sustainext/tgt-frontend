// FilterSection.jsx
import React, { useState } from "react";
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
  businessMetrics,
  setBusinessMetrics,
  includeNetZero,
  setIncludeNetZero,
  targetYear,
  setTargetYear
}) => {
  return (
    <div className="border-b border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Showing Result for:
      </h2>
      
      {/* Scopes and Categories Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <ScopeDropdown 
          label="Scope:"
          selected={selectedScope}
          setSelected={setSelectedScope}
          options={["Aggregated Scope", "Scope 1", "Scope 2", "Scope 3"]}
        />
        
        <ScopeDropdown 
          label="Category:"
          selected={selectedCategory}
          setSelected={setSelectedCategory}
          options={["Aggregated Scope", "Mobile Combustion", "Stationary Combustion", "Fugitive Emissions"]}
        />
        
        <ScopeDropdown 
          label="Sub Category:"
          selected={selectedSubCategory}
          setSelected={setSelectedSubCategory}
          options={["Aggregated Scope", "Fuel", "Rail Freight", "Refrigerants"]}
        />
        
        <ScopeDropdown 
          label="Activity:"
          selected={selectedActivity}
          setSelected={setSelectedActivity}
          options={["Aggregated Scope", "Diesel Combustion", "Natural Gas", "Electricity"]}
        />
      </div>

      {/* Metrics and settings for each scenario */}
      {selectedScenarios.map((scenarioId) => {
        const scenario = allScenarios.find(s => s.id === scenarioId);
        if (!scenario) return null;
        
        return (
          <div key={scenarioId} className="flex flex-wrap items-center gap-4 mb-4">
            <MetricsSelector 
              scenario={scenario}
              businessMetrics={businessMetrics}
              setBusinessMetrics={setBusinessMetrics}
            />

            <div className="flex items-center ml-auto">
              <input
                id={`include-net-zero-${scenarioId}`}
                type="checkbox"
                checked={includeNetZero}
                onChange={() => setIncludeNetZero(!includeNetZero)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor={`include-net-zero-${scenarioId}`}
                className="ml-2 text-sm text-gray-700"
              >
                Include a net zero scenario for {scenario.name}
              </label>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <label htmlFor={`target-year-${scenarioId}`} className="text-sm text-gray-700 whitespace-nowrap">
                Enter Target Year:
              </label>
              <input
                id={`target-year-${scenarioId}`}
                type="number"
                min={scenario.baseYear}
                max={2050}
                value={targetYear}
                onChange={(e) => setTargetYear(parseInt(e.target.value))}
                className="w-20 rounded-md border border-gray-300 py-1 px-2 text-gray-700 text-sm"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FilterSection;