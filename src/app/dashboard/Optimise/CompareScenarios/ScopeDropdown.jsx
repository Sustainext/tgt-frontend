// ScopeDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const ScopeDropdown = ({ label, selected, setSelected, options }) => {
  const [isOpen, setIsOpen] = useState(false);
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
  }, []);
  
  return (
    <div className="flex items-center">
      <label className="text-sm font-medium text-gray-700 w-24">
        {label}
      </label>
      <div className="relative flex-1" ref={dropdownRef}>
        <div 
          className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 cursor-pointer hover:border-gray-400 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="block truncate">{selected}</span>
          <FiChevronDown 
            className={`h-4 w-4 ml-1 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
        
        {isOpen && (
          <div 
            className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-md border border-gray-200 max-h-60 overflow-auto"
            role="listbox"
          >
            <div className="py-1">
              {options.map((option) => (
                <div 
                  key={option} 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${
                    selected === option ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                  }`}
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={selected === option}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScopeDropdown;