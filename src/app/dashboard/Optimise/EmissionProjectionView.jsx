import React, { useState } from "react";
import { FiDownload, FiSliders, FiInfo } from "react-icons/fi";
import EmissionProjectionGraph from "./EmissionProjectionGraph";

const EmissionProjectionView = ({ scenario, onSave, onPrevious }) => {
  const [includeNetZero, setIncludeNetZero] = useState(true);
  const [targetYear, setTargetYear] = useState(scenario?.targetYear || 2030);

  // Dropdown selections
  const [selectedScope, setSelectedScope] = useState("Aggregated Scope");
  const [selectedCategory, setSelectedCategory] = useState("Aggregated Scope");
  const [selectedSubCategory, setSelectedSubCategory] =
    useState("Aggregated Scope");
  const [selectedActivity, setSelectedActivity] = useState("Aggregated Scope");

  // Business metrics that have been selected in previous steps
  const [businessMetrics, setBusinessMetrics] = useState([
    { id: "fte", name: "FTE", selected: true },
    { id: "area", name: "Area", selected: true },
    { id: "productionVolume", name: "Production Volume", selected: true },
  ]);

  const handleSaveScenario = () => {
    // Here you would include logic to finalize and save all the scenario data
    onSave({
      ...scenario,
      includeNetZero,
      targetYear,
      selectedScope,
      selectedCategory,
      selectedSubCategory,
      selectedActivity,
      businessMetrics: businessMetrics
        .filter((m) => m.selected)
        .map((m) => m.id),
    });
  };

  const handleToggleMetric = (metricId) => {
    setBusinessMetrics((metrics) =>
      metrics.map((m) =>
        m.id === metricId ? { ...m, selected: !m.selected } : m
      )
    );
  };

  const handleDownloadResults = () => {
    // Logic to download the results as CSV/Excel
    console.log("Downloading results...");
  };

  return (
    <div className="flex flex-col space-y-6 px-8">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Showing result for:
        </h2>

        <div className="border border-gray-200 p-4 rounded-md">
          {/* Filters Section */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1 w-1/4">
                Select Scope
              </label>
              <select
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.target.value)}
                className="block border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option>Aggregated Scope</option>
                <option>Scope 1</option>
                <option>Scope 2</option>
                <option>Scope 3</option>
              </select>
            </div>

            <div className="flex items-center w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option>Aggregated Scope</option>
                <option>Mobile Combustion</option>
                <option>Stationary Combustion</option>
                <option>Fugitive Emissions</option>
              </select>
            </div>

            <div className="flex items-center w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Sub Category
              </label>
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="block border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option>Aggregated Scope</option>
                <option>Fuel</option>
                <option>Rail Freight</option>
                <option>Refrigerants</option>
              </select>
            </div>

            <div className="flex items-center w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Activity
              </label>
              <select
                value={selectedActivity}
                onChange={(e) => setSelectedActivity(e.target.value)}
                className="block border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option>Aggregated Scope</option>
                <option>Diesel Combustion</option>
                <option>Natural Gas</option>
                <option>Electricity</option>
              </select>
            </div>
          </div>

          {/* Business Metrics & Net Zero Settings Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Business Metrics
              </label>
              <div className="flex items-center gap-2">
                {businessMetrics.map((metric) => (
                  <div key={metric.id} className="flex items-center">
                    <input
                      id={`metric-${metric.id}`}
                      type="checkbox"
                      checked={metric.selected}
                      onChange={() => handleToggleMetric(metric.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`metric-${metric.id}`}
                      className="ml-2 block text-sm text-gray-900"
                    >
                      {metric.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div></div>

            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mt-4">
                  <input
                    id="include-net-zero"
                    type="checkbox"
                    checked={includeNetZero}
                    onChange={() => setIncludeNetZero(!includeNetZero)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="include-net-zero"
                    className="text-sm text-gray-900"
                  >
                    Include Net Zero Scenario
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label
                  htmlFor="target-year"
                  className="text-sm text-gray-700"
                >
                  Target Year
                </label>
                <input
                  id="target-year"
                  type="number"
                  min={scenario?.baseYear || 2024}
                  max={2050}
                  value={targetYear}
                  onChange={(e) => setTargetYear(parseInt(e.target.value))}
                  className="block w-full sm:max-w-xs border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                />
              </div>
          </div>
        </div>

        {/* Emissions Projection Graph */}
        <div className="my-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-medium text-gray-900 flex items-center">
              <span>
                Predicted Trend of chosen Business Metrics over Years for{" "}
                {selectedScope}
              </span>
              <FiInfo className="ml-2 text-gray-400" />
            </h3>
            <button
              onClick={handleDownloadResults}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Download results
              <FiDownload className="ml-2 h-4 w-4" />
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg px-4 py-8">
            <EmissionProjectionGraph
              scenario={scenario}
              includeNetZero={includeNetZero}
              targetYear={targetYear}
              selectedScope={selectedScope}
              selectedBusinessMetrics={businessMetrics
                .filter((m) => m.selected)
                .map((m) => m.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmissionProjectionView;
