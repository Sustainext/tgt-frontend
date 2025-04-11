// MetricsSelector.jsx
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiX, FiCheck } from "react-icons/fi";

const MetricsSelector = ({ scenario, businessMetrics, setBusinessMetrics }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
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
  
  const toggleMetric = (metricId) => {
    setBusinessMetrics(metrics => 
      metrics.map(metric => 
        metric.id === metricId 
          ? { ...metric, selected: !metric.selected } 
          : metric
      )
    );
  };
  
  const selectedMetrics = businessMetrics.filter(metric => metric.selected);
  const selectedCount = selectedMetrics.length;
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="flex items-center justify-between w-full md:w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-expanded={isDropdownOpen}
          aria-haspopup="listbox"
        >
          <span className="flex items-center">
            <span className="truncate mr-2">Business metrics for {scenario.name}</span>
            {selectedCount > 0 && (
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                {selectedCount}
              </span>
            )}
          </span>
          <FiChevronDown 
            className={`h-4 w-4 ml-1 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            aria-hidden="true" 
          />
        </button>

        {isDropdownOpen && (
          <div 
            className="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 py-1 max-h-60 overflow-auto focus:outline-none"
            role="listbox"
            tabIndex={-1}
          >
            <div className="px-3 py-2 border-b border-gray-200">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Select Business Metrics</h4>
            </div>
            {businessMetrics.map((metric) => (
              <div 
                key={metric.id} 
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => toggleMetric(metric.id)}
                role="option"
                aria-selected={metric.selected}
              >
                <div className="flex items-center flex-1">
                  <span className={`flex items-center justify-center w-5 h-5 mr-3 rounded border ${
                    metric.selected 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : 'border-gray-300'
                  }`}>
                    {metric.selected && <FiCheck className="w-3 h-3" />}
                  </span>
                  <span className={`${metric.selected ? 'font-medium' : 'font-normal'}`}>
                    {metric.name}
                  </span>
                </div>
              </div>
            ))}
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => setIsDropdownOpen(false)}
              >
                Done
              </button>
            </div>
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
              onClick={() => toggleMetric(metric.id)}
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