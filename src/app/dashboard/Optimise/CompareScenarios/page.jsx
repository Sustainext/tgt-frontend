// page.jsx - CompareScenarios
import React, { useState, useEffect } from "react";
import ScenarioSearch from "./ScenarioSearch";
import ScenarioList from "./ScenarioList";
import ComparisonView from "./ComparisonView";
import EmptyState from "./EmptyState";
import LoadingSpinner from "./LoadingSpinner";
import NoScenarioSelected from "./NoScenarioSelected";

const CompareScenarios = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScenarios, setSelectedScenarios] = useState([]);
  const [allScenarios, setAllScenarios] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fetch scenarios
  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = () => {
    setIsLoading(true);
    // API call simulation with mock data
    setTimeout(() => {
      const mockScenarios = [
        {
          id: 1,
          name: "Scenario 1",
          description: "Continue with current policies and practices with minimal changes to operations",
          baseYear: 2024,
          targetYear: 2035,
          scope1Emissions: 2500,
          scope2Emissions: 3800,
          scope3Emissions: 12000,
          measures: [
            "Basic energy efficiency measures",
            "Standard building maintenance",
            "Regular equipment upgrades",
            "Minimal renewable energy adoption"
          ]
        },
        {
          id: 2,
          name: "Scenario 2",
          description: "Gradual implementation of sustainability measures with balanced investment",
          baseYear: 2024,
          targetYear: 2035,
          scope1Emissions: 2500,
          scope2Emissions: 3800,
          scope3Emissions: 12000,
          measures: [
            "30% renewable energy by 2030",
            "Electric vehicle fleet transition",
            "Supply chain optimization",
            "Smart building technology implementation",
            "Employee commute reduction program"
          ]
        },
        {
          id: 3,
          name: "Scenario 3",
          description: "Aggressive sustainability strategy aiming for complete carbon neutrality",
          baseYear: 2024,
          targetYear: 2035,
          scope1Emissions: 2500,
          scope2Emissions: 3800,
          scope3Emissions: 12000,
          measures: [
            "100% renewable energy by 2030",
            "Complete electrification of fleet",
            "Carbon-neutral supply chain requirement",
            "Zero-waste operations",
            "Carbon removal investments",
            "Sustainable materials in all products"
          ]
        }
      ];
      setAllScenarios(mockScenarios);
      setIsLoading(false);
    }, 1000);
  };

  // Filter scenarios based on search
  const filteredScenarios = allScenarios.filter(scenario =>
    scenario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scenario.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle scenario selection
  const handleScenarioSelect = (scenarioId) => {
    if (selectedScenarios.includes(scenarioId)) {
      setSelectedScenarios(selectedScenarios.filter(id => id !== scenarioId));
    } else {
      setSelectedScenarios([...selectedScenarios, scenarioId]);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Scenario Analysis
            </h1>
            <p className="text-gray-500 mt-1 max-w-3xl">
              Analyze scenarios, view existing ones, and make adjustments to your plans. Track your progress, compare different strategies, and visualize your path to achieving net-zero goals. Start by creating a new scenario or explore your saved plans to refine and optimize your sustainability journey.
            </p>
          </div>
        </div>
        
        {/* Search Component */}
        <ScenarioSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        
        {/* Scenarios List or Empty State */}
        {isLoading ? (
          <LoadingSpinner />
        ) : allScenarios.length === 0 ? (
          <EmptyState setIsCreateModalOpen={setIsCreateModalOpen} />
        ) : (
          <>
            <ScenarioList 
              scenarios={filteredScenarios}
              selectedScenarios={selectedScenarios}
              handleScenarioSelect={handleScenarioSelect}
            />
            
            {/* Show message if no scenarios selected */}
            {filteredScenarios.length > 0 && selectedScenarios.length === 0 && (
              <NoScenarioSelected />
            )}
          </>
        )}
        
        {/* Comparison View when scenarios are selected */}
        {selectedScenarios.length > 0 && (
          <ComparisonView 
            selectedScenarios={selectedScenarios}
            allScenarios={allScenarios}
          />
        )}
      </div>
    </div>
  );
};

export default CompareScenarios;