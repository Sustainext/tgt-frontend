// ComparisonView.jsx
import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import FilterSection from "./FilterSection";
import EmissionsTrendChart from "./EmissionsTrendChart";
import EmissionsGapChart from "./EmissionsGapChart";

const ComparisonView = ({ selectedScenarios, allScenarios }) => {
  const [selectedScope, setSelectedScope] = useState("Aggregated Scope");
  const [selectedCategory, setSelectedCategory] = useState("Aggregated Scope");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Aggregated Scope");
  const [selectedActivity, setSelectedActivity] = useState("Aggregated Scope");
  
  // Replace single state with scenario-specific settings
  const [scenarioSettings, setScenarioSettings] = useState({});
  
  const [businessMetrics, setBusinessMetrics] = useState([
    { id: "fte", name: "FTE", selected: true },
    { id: "area", name: "Area", selected: true },
    { id: "productionVolume", name: "Production Volume", selected: true },
    { id: "revenue", name: "Revenue", selected: false },
    { id: "employees", name: "Employees", selected: false }
  ]);

  const [emissionsLineData, setEmissionsLineData] = useState([]);
  const [emissionsGapData, setEmissionsGapData] = useState([]);

  // Initialize scenario settings when scenarios change
  useEffect(() => {
    const initialSettings = {};
    
    selectedScenarios.forEach(scenarioId => {
      const scenario = allScenarios.find(s => s.id === scenarioId);
      if (!scenario) return;
      
      initialSettings[scenarioId] = {
        includeNetZero: true,
        targetYear: scenario.targetYear || 2035
      };
    });
    
    setScenarioSettings(initialSettings);
  }, [selectedScenarios, allScenarios]);

  // Handle scenario settings changes from FilterSection
  const handleScenarioSettingsChange = (newSettings) => {
    setScenarioSettings(newSettings);
  };

  // Generate chart data when selected scenarios or other parameters change
  useEffect(() => {
    if (selectedScenarios.length > 0 && Object.keys(scenarioSettings).length > 0) {
      setEmissionsLineData(generateEmissionsLineData());
      setEmissionsGapData(generateEmissionsGapData());
    }
  }, [selectedScenarios, scenarioSettings, selectedScope]);

  // Generate data for line chart
  const generateEmissionsLineData = () => {
    let result = [];

    selectedScenarios.forEach(scenarioId => {
      const scenario = allScenarios.find(s => s.id === scenarioId);
      if (!scenario) return;
      
      // Get settings for this scenario
      const settings = scenarioSettings[scenarioId];
      if (!settings) return;
      
      // Determine initial value based on selected scope
      let initialValue;
      if (selectedScope === "Scope 1") {
        initialValue = scenario.scope1Emissions;
      } else if (selectedScope === "Scope 2") {
        initialValue = scenario.scope2Emissions;
      } else if (selectedScope === "Scope 3") {
        initialValue = scenario.scope3Emissions;
      } else {
        // Aggregated scope
        initialValue = scenario.scope1Emissions + scenario.scope2Emissions + scenario.scope3Emissions;
      }

      // Generate years array based on scenario's target year
      const years = [];
      const baseYear = 2024;
      for (let year = baseYear; year <= settings.targetYear; year++) {
        years.push(year);
      }

      // Generate business-as-usual (BAU) data
      const bauData = years.map((year, index) => {
        // Custom trajectory for each scenario
        let value;
        if (scenario.name.includes("Ultimate")) {
          // Ultimate scenario has decreasing emissions
          const yearsFactor = (year - baseYear) / (scenario.targetYear - baseYear);
          value = initialValue * (1 - (yearsFactor * 0.7)); // 70% reduction by target year
        } else if (scenario.id === 2) {
          // Scenario 2 - gradual reduction after initial spike
          if (index < 2) {
            value = initialValue * (1 + 0.05 * index); // Initial 5% increase per year
          } else {
            const remainingYears = scenario.targetYear - (baseYear + 2);
            const yearsSincePeak = year - (baseYear + 2);
            const reductionFactor = yearsSincePeak / Math.max(1, remainingYears);
            value = initialValue * 1.1 * (1 - (reductionFactor * 0.5)); // 50% reduction from peak
          }
        } else {
          // Scenario 1 - slight increase then stabilization
          if (index < 3) {
            value = initialValue * (1 + 0.03 * index); // 3% increase per year
          } else {
            value = initialValue * 1.09; // 9% total increase then flat
          }
        }
        
        return {
          x: year,
          y: Math.max(0, value)
        };
      });

      // Generate net-zero trajectory if included
      if (settings.includeNetZero) {
        const netZeroData = years.map((year) => {
          if (year > scenario.targetYear) {
            return { x: year, y: 0 };
          }
          
          const yearsFactor = (year - baseYear) / (scenario.targetYear - baseYear);
          const value = initialValue * (1 - yearsFactor);
          
          return {
            x: year,
            y: Math.max(0, value)
          };
        });

        result.push(
          {
            id: `${scenario.name} (Emissions)`,
            data: bauData,
            color: scenarioId === 1 ? "#3182CE" : 
                   scenarioId === 2 ? "#2563EB" : 
                   "#EF4444"
          },
          {
            id: `${scenario.name} (Net-Zero)`,
            data: netZeroData,
            color: scenarioId === 1 ? "#48BB78" : 
                   scenarioId === 2 ? "#10B981" : 
                   "#FB7185",
            dashed: true
          }
        );
      } else {
        result.push({
          id: `${scenario.name} (Emissions)`,
          data: bauData,
          color: scenarioId === 1 ? "#3182CE" : 
                 scenarioId === 2 ? "#2563EB" : 
                 "#EF4444"
        });
      }
    });

    return result;
  };
  
  // Generate data for gap chart
  const generateEmissionsGapData = () => {
    const allYears = new Set();
    const baseYear = 2024;
    
    // Collect all years across all scenarios
    selectedScenarios.forEach(scenarioId => {
      const settings = scenarioSettings[scenarioId];
      if (!settings) return;
      
      for (let year = baseYear; year <= settings.targetYear; year++) {
        allYears.add(year);
      }
    });
    
    const years = Array.from(allYears).sort((a, b) => a - b);
    
    return years.map(year => {
      const result = { year };
      
      selectedScenarios.forEach(scenarioId => {
        const scenario = allScenarios.find(s => s.id === scenarioId);
        if (!scenario) return;
        
        // Get settings for this scenario
        const settings = scenarioSettings[scenarioId];
        if (!settings) return;
        
        // Only calculate gap if we're including net-zero for this scenario
        // and the year is within the scenario's target year range
        if (!settings.includeNetZero || year > settings.targetYear) {
          result[`${scenario.name} Gap`] = 0;
          return;
        }
        
        // Get initial value based on selected scope
        let initialValue;
        if (selectedScope === "Scope 1") {
          initialValue = scenario.scope1Emissions;
        } else if (selectedScope === "Scope 2") {
          initialValue = scenario.scope2Emissions;
        } else if (selectedScope === "Scope 3") {
          initialValue = scenario.scope3Emissions;
        } else {
          // Aggregated scope
          initialValue = scenario.scope1Emissions + scenario.scope2Emissions + scenario.scope3Emissions;
        }
        
        // Calculate BAU value
        let bauValue;
        const yearIndex = year - baseYear;
        
        if (scenario.name.includes("Ultimate")) {
          const yearsFactor = (year - baseYear) / (scenario.targetYear - baseYear);
          bauValue = initialValue * (1 - (yearsFactor * 0.7));
        } else if (scenario.id === 2) {
          if (yearIndex < 2) {
            bauValue = initialValue * (1 + 0.05 * yearIndex);
          } else {
            const remainingYears = scenario.targetYear - (baseYear + 2);
            const yearsSincePeak = year - (baseYear + 2);
            const reductionFactor = yearsSincePeak / Math.max(1, remainingYears);
            bauValue = initialValue * 1.1 * (1 - (reductionFactor * 0.5));
          }
        } else {
          if (yearIndex < 3) {
            bauValue = initialValue * (1 + 0.03 * yearIndex);
          } else {
            bauValue = initialValue * 1.09;
          }
        }
        
        // Calculate net-zero value
        let netZeroValue = 0;
        
        if (year <= scenario.targetYear) {
          const yearsFactor = (year - baseYear) / (scenario.targetYear - baseYear);
          netZeroValue = initialValue * (1 - yearsFactor);
        }
        
        // The gap is the difference
        const gap = Math.max(0, bauValue - netZeroValue);
        result[`${scenario.name} Gap`] = gap;
      });
      
      return result;
    });
  };

  // Handle download functionality
  const handleDownloadResults = () => {
    console.log("Downloading results...");
    // Implement download functionality
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      <FilterSection 
        selectedScenarios={selectedScenarios}
        allScenarios={allScenarios}
        selectedScope={selectedScope}
        setSelectedScope={setSelectedScope}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        selectedActivity={selectedActivity}
        setSelectedActivity={setSelectedActivity}
        businessMetrics={businessMetrics}
        setBusinessMetrics={setBusinessMetrics}
        onScenarioSettingsChange={handleScenarioSettingsChange}
      />

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-gray-900">
            Predicted Trend of Emissions over Years for ({selectedScope})
          </h3>
          <button
            onClick={handleDownloadResults}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Download results
            <FiDownload className="ml-2 h-4 w-4" />
          </button>
        </div>

        <EmissionsTrendChart 
          data={emissionsLineData} 
          selectedScope={selectedScope} 
        />
        
        <EmissionsGapChart 
          data={emissionsGapData} 
        />
        
      </div>
    </div>
  );
};

export default ComparisonView;