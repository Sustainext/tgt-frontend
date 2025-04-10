import React, { useState, useEffect, useRef } from "react";
import { FiDownload, FiInfo, FiChevronDown, FiX } from "react-icons/fi";
import EmissionProjectionGraph from "./EmissionProjectionGraph";

const EmissionProjectionView = ({ scenario = {}, onSave, onPrevious }) => {
  // Main target year comes from scenario creation
  const mainTargetYear = scenario?.targetYear || 2030;
  // Extended target year can be adjusted by the user (defaults to main target year)
  const [extendedTargetYear, setExtendedTargetYear] = useState(mainTargetYear);
  const [includeNetZero, setIncludeNetZero] = useState(true);

  // Update extended target year if main target year changes
  useEffect(() => {
    setExtendedTargetYear(mainTargetYear);
  }, [mainTargetYear]);

  // Dropdown selections - now arrays for multiselect
  const [selectedScopes, setSelectedScopes] = useState(["Aggregated Scope"]);
  const [selectedCategories, setSelectedCategories] = useState(["Aggregated Scope"]);
  const [selectedSubCategories, setSelectedSubCategories] = useState(["Aggregated Scope"]);
  const [selectedActivities, setSelectedActivities] = useState(["Aggregated Scope"]);

  // Dropdown open states
  const [isScopeDropdownOpen, setScopeDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isSubCategoryDropdownOpen, setSubCategoryDropdownOpen] = useState(false);
  const [isActivityDropdownOpen, setActivityDropdownOpen] = useState(false);

  // Refs for detecting clicks outside dropdowns
  const scopeRef = useRef(null);
  const categoryRef = useRef(null);
  const subCategoryRef = useRef(null);
  const activityRef = useRef(null);
  const metricsRef = useRef(null);

  // Business metrics filter state
  const [isMetricsDropdownOpen, setIsMetricsDropdownOpen] = useState(false);
  const [businessMetrics, setBusinessMetrics] = useState([
    { id: "fte", name: "FTE", selected: true },
    { id: "area", name: "Area", selected: true },
    { id: "productionVolume", name: "Production Volume", selected: true },
    { id: "revenue", name: "Revenue", selected: false },
  ]);

  const toggleMetric = (metricId) => {
    setBusinessMetrics((metrics) =>
      metrics.map((metric) =>
        metric.id === metricId
          ? { ...metric, selected: !metric.selected }
          : metric
      )
    );
  };

  const removeMetric = (metricId) => {
    toggleMetric(metricId);
  };

  const selectedMetrics = businessMetrics.filter((metric) => metric.selected);

  const handleDownloadResults = () => {
    console.log("Downloading results...");
  };

  // Information about target years for display
  const isExtended = extendedTargetYear > mainTargetYear;

  // Available options for dropdowns
  const scopeOptions = ["Aggregated Scope", "Scope 1", "Scope 2", "Scope 3"];
  const categoryOptions = [
    "Aggregated Scope",
    "Mobile Combustion",
    "Stationary Combustion",
    "Fugitive Emissions",
  ];
  const subCategoryOptions = [
    "Aggregated Scope",
    "Fuel",
    "Rail Freight",
    "Refrigerants",
  ];
  const activityOptions = [
    "Aggregated Scope",
    "Diesel Combustion",
    "Natural Gas",
    "Electricity",
  ];

  // Handle scope selection
  const handleScopeSelection = (scope) => {
    if (scope === "Aggregated Scope") {
      setSelectedScopes(["Aggregated Scope"]);
      setScopeDropdownOpen(false);
    } else if (selectedScopes.includes("Aggregated Scope")) {
      setSelectedScopes([scope]);
    } else if (selectedScopes.includes(scope)) {
      setSelectedScopes(selectedScopes.filter((s) => s !== scope));
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

  // Handle category selection
  const handleCategorySelection = (category) => {
    if (category === "Aggregated Scope") {
      setSelectedCategories(["Aggregated Scope"]);
      setCategoryDropdownOpen(false);
    } else if (selectedCategories.includes("Aggregated Scope")) {
      setSelectedCategories([category]);
    } else if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Handle subcategory selection
  const handleSubCategorySelection = (subCategory) => {
    if (subCategory === "Aggregated Scope") {
      setSelectedSubCategories(["Aggregated Scope"]);
      setSubCategoryDropdownOpen(false);
    } else if (selectedSubCategories.includes("Aggregated Scope")) {
      setSelectedSubCategories([subCategory]);
    } else if (selectedSubCategories.includes(subCategory)) {
      setSelectedSubCategories(
        selectedSubCategories.filter((s) => s !== subCategory)
      );
    } else {
      setSelectedSubCategories([...selectedSubCategories, subCategory]);
    }
  };

  // Handle activity selection
  const handleActivitySelection = (activity) => {
    if (activity === "Aggregated Scope") {
      setSelectedActivities(["Aggregated Scope"]);
      setActivityDropdownOpen(false);
    } else if (selectedActivities.includes("Aggregated Scope")) {
      setSelectedActivities([activity]);
    } else if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (scopeRef.current && !scopeRef.current.contains(event.target)) {
        setScopeDropdownOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false);
      }
      if (subCategoryRef.current && !subCategoryRef.current.contains(event.target)) {
        setSubCategoryDropdownOpen(false);
      }
      if (activityRef.current && !activityRef.current.contains(event.target)) {
        setActivityDropdownOpen(false);
      }
      if (metricsRef.current && !metricsRef.current.contains(event.target)) {
        setIsMetricsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 min-h-screen">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Showing Result for:
      </h2>

      <div className="border border-gray-200 p-6 rounded-md mb-6">
        {/* Scopes and Categories Filters */}
        <div className="flex items-center justify-between w-full px-3 py-2 text-sm">
          {/* Scope Dropdown */}
          <div className="flex items-center" ref={scopeRef}>
            <span className="text-gray-600 font-medium mr-1">Scope:</span>
            <div className="relative">
              <button
                onClick={() => setScopeDropdownOpen(!isScopeDropdownOpen)}
                className="flex items-center text-gray-800 hover:text-gray-900 font-medium focus:outline-none"
              >
                <span>
                  {selectedScopes.includes("Aggregated Scope")
                    ? "Aggregated Scope"
                    : selectedScopes.join(", ")}
                </span>
                <FiChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </button>

              {isScopeDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-md z-10">
                  <div className="py-1">
                    {scopeOptions.map((scope) => (
                      <div
                        key={scope}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleScopeSelection(scope)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedScopes.includes(scope)}
                          onChange={() => {}}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                          {scope}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 px-4 py-2">
                    <button
                      className="text-sm text-blue-600 hover:text-blue-800"
                      onClick={() => setScopeDropdownOpen(false)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center" ref={categoryRef}>
            <span className="text-gray-600 font-medium mr-1">Category:</span>
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center text-gray-800 hover:text-gray-900 font-medium focus:outline-none"
              >
                <span>
                  {selectedCategories.includes("Aggregated Scope")
                    ? "Aggregated Scope"
                    : selectedCategories.join(", ")}
                </span>
                <FiChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-md z-10">
                  <div className="py-1">
                    {categoryOptions.map((category) => (
                      <div
                        key={category}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCategorySelection(category)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => {}}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 px-4 py-2">
                    <button
                      className="text-sm text-blue-600 hover:text-blue-800"
                      onClick={() => setCategoryDropdownOpen(false)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sub Category Dropdown */}
          <div className="flex items-center" ref={subCategoryRef}>
            <span className="text-gray-600 font-medium mr-1">
              Sub Category:
            </span>
            <div className="relative">
              <button
                onClick={() => setSubCategoryDropdownOpen(!isSubCategoryDropdownOpen)}
                className="flex items-center text-gray-800 hover:text-gray-900 font-medium focus:outline-none"
              >
                <span>
                  {selectedSubCategories.includes("Aggregated Scope")
                    ? "Aggregated Scope"
                    : selectedSubCategories.join(", ")}
                </span>
                <FiChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </button>

              {isSubCategoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-md z-10">
                  <div className="py-1">
                    {subCategoryOptions.map((subCategory) => (
                      <div
                        key={subCategory}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubCategorySelection(subCategory)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSubCategories.includes(subCategory)}
                          onChange={() => {}}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                          {subCategory}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 px-4 py-2">
                    <button
                      className="text-sm text-blue-600 hover:text-blue-800"
                      onClick={() => setSubCategoryDropdownOpen(false)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity Dropdown */}
          <div className="flex items-center" ref={activityRef}>
            <span className="text-gray-600 font-medium mr-1">Activity:</span>
            <div className="relative">
              <button
                onClick={() => setActivityDropdownOpen(!isActivityDropdownOpen)}
                className="flex items-center text-gray-800 hover:text-gray-900 font-medium focus:outline-none"
              >
                <span>
                  {selectedActivities.includes("Aggregated Scope")
                    ? "Aggregated Scope"
                    : selectedActivities.join(", ")}
                </span>
                <FiChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </button>

              {isActivityDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-md z-10">
                  <div className="py-1">
                    {activityOptions.map((activity) => (
                      <div
                        key={activity}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleActivitySelection(activity)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedActivities.includes(activity)}
                          onChange={() => {}}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                          {activity}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 px-4 py-2">
                    <button
                      className="text-sm text-blue-600 hover:text-blue-800"
                      onClick={() => setActivityDropdownOpen(false)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Business Metrics & Target Year Row */}
        <div className="flex flex-wrap items-center gap-4 mt-6">
          <div className="relative" ref={metricsRef}>
            <div className="relative">
              <button
                type="button"
                className="flex items-center justify-between w-48 rounded-md bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
                onClick={() => setIsMetricsDropdownOpen(!isMetricsDropdownOpen)}
              >
                <span>Business metrics</span>
                <FiChevronDown className="h-4 w-4" />
              </button>

              {isMetricsDropdownOpen && (
                <div className="absolute z-10 mt-1 w-48 rounded-md bg-white shadow-lg">
                  <div className="py-1">
                    {businessMetrics.map((metric) => (
                      <div
                        key={metric.id}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => toggleMetric(metric.id)}
                      >
                        <input
                          type="checkbox"
                          checked={metric.selected}
                          onChange={() => {}}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                          {metric.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 ml-2">
            {selectedMetrics.map((metric) => (
              <div
                key={metric.id}
                className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm"
              >
                {metric.name}
                <button
                  type="button"
                  onClick={() => removeMetric(metric.id)}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center ml-auto">
            <input
              id="include-net-zero"
              type="checkbox"
              checked={includeNetZero}
              onChange={() => setIncludeNetZero(!includeNetZero)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="include-net-zero"
              className="ml-2 text-sm text-gray-700"
            >
              Include a net zero scenario
            </label>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <label
              htmlFor="target-year"
              className="text-sm text-gray-700 whitespace-nowrap"
            >
              Enter Target Year:
            </label>
            <input
              id="target-year"
              type="number"
              min={scenario?.baseYear || 2024}
              max={2050}
              value={extendedTargetYear}
              onChange={(e) => setExtendedTargetYear(parseInt(e.target.value))}
              className="w-24 rounded-md border-b border-gray-300 py-1 px-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4 pt-8">
          <h3 className="text-base font-bold text-gray-900 flex items-center">
            <span>
              Predicted Trend of chosen Business Metrics over Years for
              (Aggregated Scopes)
            </span>
          </h3>
          {/* <button
            onClick={handleDownloadResults}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Download results
            <FiDownload className="ml-2 h-4 w-4" />
          </button> */}
        </div>

        <div className="px-4 py-8">
          <EmissionProjectionGraph
            scenario={scenario}
            includeNetZero={includeNetZero}
            targetYear={mainTargetYear}
            mainTargetYear={extendedTargetYear}
            selectedBusinessMetrics={businessMetrics
              .filter((m) => m.selected)
              .map((m) => m.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default EmissionProjectionView;