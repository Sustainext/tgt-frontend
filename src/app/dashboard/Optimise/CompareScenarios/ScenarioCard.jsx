// ScenarioCard.jsx
import React from "react";

const ScenarioCard = ({ scenario, isSelected, onSelect }) => {
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected 
          ? "border-blue-500 bg-blue-50" 
          : "border-gray-200 hover:border-blue-300"
      }`}
      onClick={onSelect}
      role="button"
      aria-pressed={isSelected}
    >
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {}}
          className="h-5 w-5 text-blue-600 rounded mt-1 mr-3"
        />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{scenario.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{scenario.description}</p>
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
  );
};

export default ScenarioCard;