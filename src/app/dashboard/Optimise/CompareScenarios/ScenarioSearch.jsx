// ScenarioSearch.jsx
import React from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";

const ScenarioSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Select Scenarios</h2>
        <div className="flex items-center gap-2">
          <button 
            className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100"
            aria-label="Filter options"
          >
            <MdFilterList size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center border rounded-lg mb-4 px-3 py-2 bg-gray-50">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search scenarios by name or description..."
          className="w-full outline-none bg-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setSearchTerm("")}
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
      </div>
    </div>
  );
};

export default ScenarioSearch;