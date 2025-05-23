// UpdatedFilterDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

const FilterDropdown = ({ 
  label, 
  selected, 
  setSelected, 
  options = [],
  multiSelect = true,
  disabled = false,
  defaultLabel = "All"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Convert to array if string is passed
  const selectedArray = Array.isArray(selected) ? selected : [selected];
  
  // Handle selection
  const handleSelection = (option) => {
    if (disabled) return;
    
    if (!multiSelect) {
      setSelected(option);
      setIsOpen(false);
      return;
    }

    if (option === "Aggregated Scope") {
      setSelected(["Aggregated Scope"]);
      setIsOpen(false);
    } else if (selectedArray.includes("Aggregated Scope")) {
      setSelected([option]);
    } else if (selectedArray.includes(option)) {
      // Prevent removing last option - if this is the last one, select "Aggregated Scope" instead
      if (selectedArray.length > 1) {
        setSelected(selectedArray.filter(item => item !== option));
      } else {
        setSelected(["Aggregated Scope"]);
      }
    } else {
      setSelected([...selectedArray, option]);
    }
  };

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
  }, []);
  
  // Display label based on selection
  const getDisplayLabel = () => {
    if (selectedArray.includes("Aggregated Scope")) {
      return defaultLabel;
    } else if (selectedArray.length === 1) {
      return selectedArray[0];
    } else {
      return `${selectedArray.length} selected`;
    }
  };
  
  // Determine the width class for the dropdown
  const getDropdownWidthClass = () => {
    return label === 'Activity:' ? 'w-[380px]' : 'w-56';
  };
  
  return (
    <div className="flex items-center" ref={dropdownRef}>
      <span className={`text-gray-600 font-medium mr-1 ${disabled ? 'opacity-50' : ''}`}>
        {label}
      </span>
      <div className="relative">
        {/* Fixed width container for the button to prevent shifting */}
        <div className={`${label === 'Activity:' ? 'w-[200px]' : 'w-[140px]'}`}>
          <button
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={`flex items-center text-gray-800 hover:text-gray-900 font-medium focus:outline-none ${
              disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            } w-full justify-between`}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            disabled={disabled}
          >
            <span className="truncate">{getDisplayLabel()}</span>
            <FiChevronDown 
              className={`ml-1 h-4 w-4 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>
        
        {isOpen && !disabled && (
          <div
            className={`absolute top-full ${
              label === 'Activity:' ? 'right-0' : 'left-0'
            } ${getDropdownWidthClass()} mt-1 bg-white border border-gray-200 rounded shadow-md z-10`}
            role="listbox"
          >
            <div className="py-1 max-h-60 overflow-y-auto">
              {options.map((option) => (
                <div
                  key={option}
                  className="flex items-start px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelection(option)}
                  role="option"
                  aria-selected={selectedArray.includes(option)}
                >
                  <div className="flex-shrink-0 pt-0.5">
                    <div className={`flex items-center justify-center w-5 h-5 rounded border ${
                      selectedArray.includes(option)
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'border-gray-300'
                    }`}>
                      {selectedArray.includes(option) && <FiCheck className="w-3 h-3" />}
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-sm text-gray-900 cursor-pointer break-words">
                      {option === "Aggregated Scope" ? defaultLabel : option}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;