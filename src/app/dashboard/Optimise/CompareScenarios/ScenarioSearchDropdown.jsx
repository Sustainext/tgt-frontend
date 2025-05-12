// ScenarioSearchDropdown.jsx
import React, { useRef, useEffect } from "react";
import { FiCheck, FiInfo } from "react-icons/fi";

const ScenarioSearchDropdown = ({ 
  scenarios, 
  selectedScenarios, 
  handleScenarioSelect, 
  isOpen, 
  setIsOpen, 
  searchTerm
}) => {
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  // Filter scenarios based on search term
  const filteredScenarios = scenarios.filter(scenario =>
    scenario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scenario.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div 
      ref={dropdownRef} 
      className={`absolute z-20 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-auto transition-all duration-150 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      {/* Header with selection count */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          {selectedScenarios.length === 0 
            ? "Select scenarios to compare" 
            : `${selectedScenarios.length} scenario${selectedScenarios.length > 1 ? 's' : ''} selected`
          }
        </span>
        {selectedScenarios.length > 0 && (
          <button 
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            onClick={(e) => {
              e.stopPropagation();
              // Clear all selected scenarios
              selectedScenarios.forEach(id => handleScenarioSelect(id));
            }}
          >
            Clear all
          </button>
        )}
      </div>
      
      {filteredScenarios.length === 0 ? (
        <div className="p-6 text-center">
          <FiInfo className="h-6 w-6 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">
            No scenarios found matching <span className="font-medium">"{searchTerm}"</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Try adjusting your search or using different keywords
          </p>
        </div>
      ) : (
        <div className="py-1">
          {filteredScenarios.map((scenario) => (
            <div 
              key={scenario.id}
              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                selectedScenarios.includes(scenario.id) ? 'bg-blue-50' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleScenarioSelect(scenario.id);
              }}
            >
              <div className="flex items-start">
                <div className={`flex items-center justify-center h-5 w-5 mr-3 rounded border ${
                  selectedScenarios.includes(scenario.id) 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'border-gray-300'
                }`}>
                  {selectedScenarios.includes(scenario.id) && (
                    <FiCheck className="h-3 w-3" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{scenario.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{scenario.description || "No description available"}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                      Base Year: {scenario.baseYear}
                    </span>
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                      Target: {scenario.targetYear}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScenarioSearchDropdown;