// ScenarioSearch.jsx
import React, { useState, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";
import ScenarioSearchDropdown from "./ScenarioSearchDropdown";

const ScenarioSearch = ({ 
  searchTerm, 
  setSearchTerm, 
  scenarios, 
  selectedScenarios, 
  handleScenarioSelect 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  
  // Focus the input when clicking on the search container
  const handleContainerClick = (e) => {
    if (inputRef.current && e.target !== inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Get selected scenario objects
  const selectedScenarioObjects = selectedScenarios
    .map(id => scenarios.find(s => s.id === id))
    .filter(Boolean);
  
  return (
    <div className="bg-white rounded-lg shadow-sm py-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Select Scenarios</h2>
        {/* <div className="flex items-center gap-2">
          <button 
            className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100"
            aria-label="Filter options"
          >
            <MdFilterList size={20} />
          </button>
        </div> */}
      </div>
      
      <div className="relative">
        <div 
          className="flex flex-wrap items-center border rounded-lg mb-4 px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-300 min-h-11 cursor-text"
          onClick={handleContainerClick}
        >
          <FiSearch className="text-gray-400 mr-2 my-1" />
          
          {/* Selected scenario tags inside the input */}
          {selectedScenarioObjects.map(scenario => (
            <div 
              key={scenario.id} 
              className="bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded-md flex items-center gap-1 mr-2 my-1"
            >
              <span className="text-sm">{scenario.name}</span>
              <button 
                className="text-blue-600 hover:text-blue-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handleScenarioSelect(scenario.id);
                }}
                aria-label={`Remove ${scenario.name}`}
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
          
          <input
            ref={inputRef}
            type="text"
            placeholder={selectedScenarios.length > 0 ? "" : "Search scenarios by name or description..."}
            className="outline-none bg-transparent flex-1 min-w-[120px] my-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
          />
          
          {/* Only show clear button when there's text or selected scenarios */}
          {(searchTerm || selectedScenarios.length > 0) && (
            <button 
              className="text-gray-400 hover:text-gray-600 my-1"
              onClick={() => {
                if (searchTerm) {
                  setSearchTerm("");
                } else if (selectedScenarios.length > 0) {
                  // Clear all selected scenarios if no search term
                  selectedScenarios.forEach(id => handleScenarioSelect(id));
                }
                setIsDropdownOpen(true);
                inputRef.current?.focus();
              }}
              aria-label="Clear search or selections"
            >
              <FiX />
            </button>
          )}
        </div>
        
        <ScenarioSearchDropdown 
          scenarios={scenarios}
          selectedScenarios={selectedScenarios}
          handleScenarioSelect={handleScenarioSelect}
          isOpen={isDropdownOpen}
          setIsOpen={setIsDropdownOpen}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default ScenarioSearch;