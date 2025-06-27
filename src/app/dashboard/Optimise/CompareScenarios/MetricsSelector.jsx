// MetricsSelector.jsx
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

const MetricsSelector = ({ 
  scenario, 
  scenarioMetrics, // Array of { id, name, selected } objects from extractUniqueMetricsForScenarios
  onMetricsChange   // Callback to update metrics
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Maintain a local copy of the metrics to prevent issues during updates
  const [localMetrics, setLocalMetrics] = useState([]);
  
  // Update local metrics when props change
  useEffect(() => {
    if (Array.isArray(scenarioMetrics) && scenarioMetrics.length > 0) {
      console.log("MetricsSelector: Updating local metrics from props", scenarioMetrics);
      setLocalMetrics(scenarioMetrics);
    }
  }, [scenarioMetrics]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (metricId) => {
    console.log("MetricsSelector: Toggling metric", metricId);
    console.log("MetricsSelector: Current local metrics", localMetrics);
    
    // Create a copy of the metrics array with the selected state toggled
    const updatedMetrics = localMetrics.map(metric => 
      metric.id === metricId 
        ? { ...metric, selected: !metric.selected } 
        : metric
    );
    
    console.log("MetricsSelector: Updated metrics after toggle", updatedMetrics);
    
    // Update local state first
    setLocalMetrics(updatedMetrics);
    
    // Then call the callback with the updated metrics
    if (onMetricsChange) {
      onMetricsChange(updatedMetrics);
    }
  };
  
  const handleSelectAll = () => {
    console.log("MetricsSelector: Selecting all metrics");
    
    const allSelected = localMetrics.map(m => ({ ...m, selected: true }));
    
    // Update local state first
    setLocalMetrics(allSelected);
    
    if (onMetricsChange) {
      onMetricsChange(allSelected);
    }
  };
  
  const handleDeselectAll = () => {
    console.log("MetricsSelector: Deselecting all metrics");
    
    const allDeselected = localMetrics.map(m => ({ ...m, selected: false }));
    
    // Update local state first
    setLocalMetrics(allDeselected);
    
    if (onMetricsChange) {
      onMetricsChange(allDeselected);
    }
  };
  
  const selectedMetrics = localMetrics.filter(metric => metric.selected);
  
  return (
    <div className="flex items-center gap-2 col-span-2">
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="flex items-center justify-between w-full md:w-64 rounded-md bg-white px-3 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-expanded={isDropdownOpen}
          aria-haspopup="listbox"
        >
          <span className="flex items-center">
            <span className="truncate mr-2">Business metrics for {scenario.name}</span>
          </span>
          <FiChevronDown 
            className={`h-4 w-4 ml-1 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            aria-hidden="true" 
          />
        </button>

        {isDropdownOpen && localMetrics.length > 0 && (
          <div 
            className="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 py-1 max-h-60 overflow-auto focus:outline-none"
            role="listbox"
            tabIndex={-1}
          >
            <div className="px-3 py-2 border-b border-gray-200">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Select Business Metrics</h4>
            </div>
            {localMetrics.map((metric) => (
              <div 
                key={metric.id} 
                className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm"
              >
                <div className="flex items-center flex-1">
                  <input
                    id={`metric-${scenario.id}-${metric.id}`}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={metric.selected}
                    onChange={() => handleCheckboxChange(metric.id)}
                  />
                  <label 
                    htmlFor={`metric-${scenario.id}-${metric.id}`}
                    className={`ml-3 ${metric.selected ? 'font-medium' : 'font-normal'} cursor-pointer`}
                  >
                    {metric.name}
                  </label>
                </div>
              </div>
            ))}
            <div className="px-4 py-2 border-t border-gray-200">
              <div className="flex justify-between">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={handleSelectAll}
                >
                  Select All
                </button>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={handleDeselectAll}
                >
                  Deselect All
                </button>
              </div>
            </div>
          </div>
        )}
        
        {isDropdownOpen && localMetrics.length === 0 && (
          <div 
            className="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 py-4 focus:outline-none"
          >
            <p className="text-center text-gray-500 text-sm">No business metrics available for this scenario</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {selectedMetrics.map((metric) => (
          <div 
            key={metric.id} 
            className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm group transition-shadow hover:shadow-sm"
          >
            {metric.name}
            <button
              type="button"
              onClick={() => handleCheckboxChange(metric.id)}
              className="ml-1 text-blue-400 group-hover:text-blue-600 transition-colors"
              aria-label={`Remove ${metric.name} metric`}
            >
              <FiX className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsSelector;