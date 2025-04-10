// ScenarioList.jsx
import React from "react";
import { FiX } from "react-icons/fi";
import ScenarioCard from "./ScenarioCard";

const ScenarioList = ({ scenarios, selectedScenarios, handleScenarioSelect }) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            isSelected={selectedScenarios.includes(scenario.id)}
            onSelect={() => handleScenarioSelect(scenario.id)}
          />
        ))}
      </div>
      
      {/* Selected Scenarios Chips */}
      {selectedScenarios.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedScenarios.map(id => {
            const scenario = scenarios.find(s => s.id === id) || 
                            // Find in all scenarios if not in filtered list
                            scenarios.flatMap(s => s.scenarios || []).find(s => s.id === id);
            
            if (!scenario) return null;
            
            return (
              <div key={id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                <span>{scenario.name}</span>
                <button 
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleScenarioSelect(id)}
                  aria-label={`Remove ${scenario.name}`}
                >
                  <FiX size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScenarioList;