// ScopeDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const ScopeDropdown = ({ 
  label, 
  selected, 
  setSelected, 
  options,
  multiSelect = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Convert to array if string is passed
  const selectedArray = Array.isArray(selected) ? selected : [selected];
  
  // Handle selection
  const handleSelection = (option) => {
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
      // Prevent removing last option
      if (selectedArray.length > 1) {
        setSelected(selectedArray.filter(item => item !== option));
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
  
  // Display label for selected items
  const displayLabel = selectedArray.includes("Aggregated Scope") 
    ? "Aggregated Scope" 
    : selectedArray.join(", ");
  
  return (
    <div className="flex items-center" ref={dropdownRef}>
      <span className="text-gray-600 font-medium mr-1">
        {label}
      </span>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-gray-800 hover:text-gray-900 font-medium focus:outline-none"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="truncate max-w-[140px]">{displayLabel}</span>
          <FiChevronDown 
            className={`ml-1 h-4 w-4 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {isOpen && (
          <div 
            className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-md z-10"
            role="listbox"
          >
            <div className="py-1">
              {options.map((option) => (
                <div 
                  key={option} 
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelection(option)}
                  role="option"
                  aria-selected={selectedArray.includes(option)}
                >
                  <input
                    type="checkbox"
                    checked={selectedArray.includes(option)}
                    onChange={() => {}}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    {option}
                  </label>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 px-4 py-2">
              <button
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={() => setIsOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScopeDropdown;