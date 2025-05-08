import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector import
import { FiDownload, FiInfo, FiChevronDown, FiX } from "react-icons/fi";
import EmissionProjectionGraph from "./EmissionProjectionGraph";
import { scope1Info, scope2Info, scope3Info } from "../../shared/data/scopeInfo";
import { fetchScenarioGraphData } from "../../../lib/redux/features/optimiseSlice";

const EmissionProjectionView = ({ scenario = {} }) => {
  const dispatch = useDispatch();
  const scenarioId = scenario?.id;

  // Get state from Redux
  const graphData = useSelector(state => state.optimise?.graphData);
  const loading = useSelector(state => state.optimise?.loading?.graphData);
  const error = useSelector(state => state.optimise?.error?.graphData);

  // Main target year comes from scenario creation
  const baseYear = scenario?.base_year || 2024;
  const mainTargetYear = scenario?.target_year || 2030;
  // Extended target year can be adjusted by the user (defaults to main target year)
  const [extendedTargetYear, setExtendedTargetYear] = useState(mainTargetYear);
  const [includeNetZero, setIncludeNetZero] = useState(false);

  // Update extended target year if main target year changes
  useEffect(() => {
    setExtendedTargetYear(mainTargetYear);
  }, [mainTargetYear]);

  // Generate dropdown options from scope info
  const generateScopeOptions = () => {
    return ["Aggregated Scope", "Scope-1", "Scope-2", "Scope-3"];
  };

  // Generate category options based on selected scope
  const generateCategoryOptions = (selectedScopes) => {
    let categoryOptions = ["Aggregated Scope"];
    
    if (selectedScopes.includes("Scope-1") || selectedScopes.includes("Aggregated Scope")) {
      scope1Info[0].Category.forEach(cat => {
        if (!categoryOptions.includes(cat.name)) {
          categoryOptions.push(cat.name);
        }
      });
    }
    
    if (selectedScopes.includes("Scope-2") || selectedScopes.includes("Aggregated Scope")) {
      scope2Info[0].Category.forEach(cat => {
        if (!categoryOptions.includes(cat.name)) {
          categoryOptions.push(cat.name);
        }
      });
    }
    
    if (selectedScopes.includes("Scope-3") || selectedScopes.includes("Aggregated Scope")) {
      scope3Info[0].Category.forEach(cat => {
        if (!categoryOptions.includes(cat.name)) {
          categoryOptions.push(cat.name);
        }
      });
    }
    
    return categoryOptions;
  };

  // Generate subcategory options based on selected categories
  const generateSubCategoryOptions = (selectedCategories) => {
    let subCategoryOptions = ["Aggregated Scope"];
    
    const allScopeInfos = [scope1Info, scope2Info, scope3Info];
    
    allScopeInfos.forEach(scopeInfo => {
      scopeInfo[0].Category.forEach(cat => {
        if (selectedCategories.includes(cat.name) || selectedCategories.includes("Aggregated Scope")) {
          cat.SubCategory.forEach(subCat => {
            if (!subCategoryOptions.includes(subCat)) {
              subCategoryOptions.push(subCat);
            }
          });
        }
      });
    });
    
    return subCategoryOptions;
  };

  // Generate activity options (simplified for demonstration)
  const generateActivityOptions = (selectedSubCategories) => {
    // In a real implementation, you would associate activities with subcategories
    // For now, we'll return some sample activities
    return [
      "Aggregated Scope",
      "Diesel Combustion",
      "Natural Gas",
      "Electricity",
      "Refrigerant Leakage",
      "Freight Transport",
      "Employee Commuting"
    ];
  };

  // Dropdown selections - now arrays for multiselect
  const [selectedScopes, setSelectedScopes] = useState(["Aggregated Scope"]);
  const [selectedCategories, setSelectedCategories] = useState(["Aggregated Scope"]);
  const [selectedSubCategories, setSelectedSubCategories] = useState(["Aggregated Scope"]);
  const [selectedActivities, setSelectedActivities] = useState(["Aggregated Scope"]);

  // Dropdown options - dynamically generated based on selections
  const [scopeOptions, setScopeOptions] = useState(generateScopeOptions());
  const [categoryOptions, setCategoryOptions] = useState(generateCategoryOptions(selectedScopes));
  const [subCategoryOptions, setSubCategoryOptions] = useState(generateSubCategoryOptions(selectedCategories));
  const [activityOptions, setActivityOptions] = useState(generateActivityOptions(selectedSubCategories));

  // Determine if child dropdowns should be disabled
  // If a parent is set to "Aggregated Scope", all children should be disabled
  const isCategoryDropdownDisabled = selectedScopes.includes("Aggregated Scope");
  const isSubCategoryDropdownDisabled = isCategoryDropdownDisabled || selectedCategories.includes("Aggregated Scope");
  const isActivityDropdownDisabled = isSubCategoryDropdownDisabled || selectedSubCategories.includes("Aggregated Scope");

  // Update options when selections change
  useEffect(() => {
    setCategoryOptions(generateCategoryOptions(selectedScopes));
    
    // If scope is set to "Aggregated Scope", force categories to "Aggregated Scope" too
    if (selectedScopes.includes("Aggregated Scope")) {
      setSelectedCategories(["Aggregated Scope"]);
    }
  }, [selectedScopes]);

  useEffect(() => {
    setSubCategoryOptions(generateSubCategoryOptions(selectedCategories));
    
    // If category is set to "Aggregated Scope", force subcategories to "Aggregated Scope" too
    if (selectedCategories.includes("Aggregated Scope")) {
      setSelectedSubCategories(["Aggregated Scope"]);
    }
  }, [selectedCategories]);

  useEffect(() => {
    setActivityOptions(generateActivityOptions(selectedSubCategories));
    
    // If subcategory is set to "Aggregated Scope", force activities to "Aggregated Scope" too
    if (selectedSubCategories.includes("Aggregated Scope")) {
      setSelectedActivities(["Aggregated Scope"]);
    }
  }, [selectedSubCategories]);

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
    { id: "fte", name: "FTE", selected: false },
    { id: "area", name: "Area", selected: false },
    { id: "production_volume", name: "Production Volume", selected: false },
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
    // Implementation for downloading results
    if (!graphData) return;
    
    // Create a JSON blob and download it
    const dataStr = JSON.stringify(graphData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `scenario-${scenarioId}-projection.json`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Information about target years for display
  const isExtended = extendedTargetYear > mainTargetYear;

 // Handle scope selection
const handleScopeSelection = (scope) => {
  if (scope === "Aggregated Scope") {
    // Reset all dropdowns to "Aggregated Scope"
    setSelectedScopes(["Aggregated Scope"]);
    setSelectedCategories(["Aggregated Scope"]);
    setSelectedSubCategories(["Aggregated Scope"]);
    setSelectedActivities(["Aggregated Scope"]);
    setScopeDropdownOpen(false);
  } else if (selectedScopes.includes("Aggregated Scope")) {
    // When switching from "Aggregated Scope" to a specific scope
    // Reset all children to "Aggregated Scope"
    setSelectedScopes([scope]);
    setSelectedCategories(["Aggregated Scope"]);
    setSelectedSubCategories(["Aggregated Scope"]);
    setSelectedActivities(["Aggregated Scope"]);
  } else if (selectedScopes.includes(scope)) {
    // If removing a scope
    const newSelectedScopes = selectedScopes.filter((s) => s !== scope);
    if (newSelectedScopes.length === 0) {
      // If no scopes left, reset to "Aggregated Scope"
      setSelectedScopes(["Aggregated Scope"]);
      setSelectedCategories(["Aggregated Scope"]);
      setSelectedSubCategories(["Aggregated Scope"]);
      setSelectedActivities(["Aggregated Scope"]);
    } else {
      // Just update scopes without affecting children
      setSelectedScopes(newSelectedScopes);
    }
  } else {
    // Adding another scope - keep children as they are
    setSelectedScopes([...selectedScopes, scope]);
  }
};

// Handle category selection
const handleCategorySelection = (category) => {
  // Do nothing if the dropdown is disabled
  if (isCategoryDropdownDisabled) return;
  
  if (category === "Aggregated Scope") {
    // Reset this dropdown and all children to "Aggregated Scope"
    setSelectedCategories(["Aggregated Scope"]);
    setSelectedSubCategories(["Aggregated Scope"]);
    setSelectedActivities(["Aggregated Scope"]);
    setCategoryDropdownOpen(false);
  } else if (selectedCategories.includes("Aggregated Scope")) {
    // When switching from "Aggregated Scope" to a specific category
    // Reset all children to "Aggregated Scope"
    setSelectedCategories([category]);
    setSelectedSubCategories(["Aggregated Scope"]);
    setSelectedActivities(["Aggregated Scope"]);
  } else if (selectedCategories.includes(category)) {
    // If removing a category
    const newSelectedCategories = selectedCategories.filter((c) => c !== category);
    if (newSelectedCategories.length === 0) {
      // If no categories left, reset to "Aggregated Scope"
      setSelectedCategories(["Aggregated Scope"]);
      setSelectedSubCategories(["Aggregated Scope"]);
      setSelectedActivities(["Aggregated Scope"]);
    } else {
      // Just update categories
      setSelectedCategories(newSelectedCategories);
      
      // Check if any current subcategories don't belong to the remaining categories
      // This requires knowing the relationship between categories and subcategories
      // For now, we'll reset subcategories to be safe
      setSelectedSubCategories(["Aggregated Scope"]);
      setSelectedActivities(["Aggregated Scope"]);
    }
  } else {
    // Adding another category
    setSelectedCategories([...selectedCategories, category]);
    // No need to reset children since we're broadening the filter
  }
};

// Handle subcategory selection
const handleSubCategorySelection = (subCategory) => {
  // Do nothing if the dropdown is disabled
  if (isSubCategoryDropdownDisabled) return;
  
  if (subCategory === "Aggregated Scope") {
    // Reset this dropdown and activities to "Aggregated Scope"
    setSelectedSubCategories(["Aggregated Scope"]);
    setSelectedActivities(["Aggregated Scope"]);
    setSubCategoryDropdownOpen(false);
  } else if (selectedSubCategories.includes("Aggregated Scope")) {
    // When switching from "Aggregated Scope" to a specific subcategory
    // Reset activities to "Aggregated Scope"
    setSelectedSubCategories([subCategory]);
    setSelectedActivities(["Aggregated Scope"]);
  } else if (selectedSubCategories.includes(subCategory)) {
    // If removing a subcategory
    const newSelectedSubCategories = selectedSubCategories.filter((s) => s !== subCategory);
    if (newSelectedSubCategories.length === 0) {
      // If no subcategories left, reset to "Aggregated Scope"
      setSelectedSubCategories(["Aggregated Scope"]);
      setSelectedActivities(["Aggregated Scope"]);
    } else {
      // Just update subcategories
      setSelectedSubCategories(newSelectedSubCategories);
      
      // Reset activities since the subcategory relationship changed
      setSelectedActivities(["Aggregated Scope"]);
    }
  } else {
    // Adding another subcategory
    setSelectedSubCategories([...selectedSubCategories, subCategory]);
    // Reset activities when a new subcategory is added
    setSelectedActivities(["Aggregated Scope"]);
  }
};

  // Handle activity selection
  const handleActivitySelection = (activity) => {
    // Do nothing if the dropdown is disabled
    if (isActivityDropdownDisabled) return;
    
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

  // Handle dropdown toggle
  const toggleScopeDropdown = () => {
    setScopeDropdownOpen(!isScopeDropdownOpen);
  };

  const toggleCategoryDropdown = () => {
    // Do nothing if the dropdown is disabled
    if (isCategoryDropdownDisabled) return;
    setCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const toggleSubCategoryDropdown = () => {
    // Do nothing if the dropdown is disabled
    if (isSubCategoryDropdownDisabled) return;
    setSubCategoryDropdownOpen(!isSubCategoryDropdownOpen);
  };

  const toggleActivityDropdown = () => {
    // Do nothing if the dropdown is disabled
    if (isActivityDropdownDisabled) return;
    setActivityDropdownOpen(!isActivityDropdownOpen);
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

  // Fetch graph data when filters change
  useEffect(() => {
    if (!scenarioId) return;

    // Build filter object for API call
    const filters = {};
    
    // Only add scopes if not using aggregated
    if (!selectedScopes.includes("Aggregated Scope")) {
      filters.scope = selectedScopes.map(scope => scope);
    }
    
    // Only add categories if not using aggregated
    if (!selectedCategories.includes("Aggregated Scope")) {
      filters.category = selectedCategories;
    }
    
    // Only add subcategories if not using aggregated
    if (!selectedSubCategories.includes("Aggregated Scope")) {
      filters.sub_category = selectedSubCategories;
    }
    
    // Only add activities if not using aggregated
    if (!selectedActivities.includes("Aggregated Scope")) {
      filters.activity = selectedActivities;
    }
    
    // // Add net zero parameter
    // filters.include_net_zero = includeNetZero;
    
    // // Add target year parameters
    // filters.target_year = extendedTargetYear;
    // filters.main_target_year = mainTargetYear;
    
    // Add business metrics
    filters.metric = businessMetrics
      .filter(m => m.selected)
      .map(m => m.id)
      .join(',');
    
    // Fetch the graph data
    dispatch(fetchScenarioGraphData({ scenarioId, filters }));
  }, [
    dispatch, 
    scenarioId, 
    selectedScopes, 
    selectedCategories, 
    selectedSubCategories, 
    selectedActivities, 
    businessMetrics
  ]);

// Extract unique activities from graph data 
useEffect(() => {
  if (!graphData || !graphData.yearly_data) return;
  
  // Extract unique scopes, categories, subcategories, and activities
  const uniqueScopes = new Set(["Aggregated Scope"]);
  const uniqueCategories = new Set(["Aggregated Scope"]);
  const uniqueSubCategories = new Set(["Aggregated Scope"]);
  const uniqueActivities = new Set(["Aggregated Scope"]);
  
  // Go through each year's data
  Object.keys(graphData.yearly_data).forEach(year => {
    const yearActivities = graphData.yearly_data[year];
    
    yearActivities.forEach(activity => {
      // Extract each field and add to the corresponding Set
      if (activity.scope) uniqueScopes.add(activity.scope);
      if (activity.category) uniqueCategories.add(activity.category);
      if (activity.sub_category) uniqueSubCategories.add(activity.sub_category);
      if (activity.activity_name) uniqueActivities.add(activity.activity_name);
    });
  });
  
  // Update scope options if we're not in the middle of a filter
  if (!isScopeDropdownOpen) {
    setScopeOptions(Array.from(uniqueScopes));
  }
  
  // Filter activities based on selected filters
  const filteredActivities = new Set(["Aggregated Scope"]);
  
  Object.values(graphData.yearly_data).forEach(yearActivities => {
    yearActivities.forEach(activity => {
      const matchesScope = selectedScopes.includes("Aggregated Scope") || 
        selectedScopes.includes(activity.scope);
      
      const matchesCategory = selectedCategories.includes("Aggregated Scope") || 
        selectedCategories.includes(activity.category);
      
      const matchesSubCategory = selectedSubCategories.includes("Aggregated Scope") || 
        selectedSubCategories.includes(activity.sub_category);
      
      // Only add if all filters match
      if (matchesScope && matchesCategory && matchesSubCategory) {
        filteredActivities.add(activity.activity_name);
      }
    });
  });
  
  // Update activity options
  setActivityOptions(Array.from(filteredActivities));
  
}, [graphData, selectedScopes, selectedCategories, selectedSubCategories]);

// When updating category options based on scope selection
useEffect(() => {
  // Generate new category options based on selected scopes
  const newCategoryOptions = generateCategoryOptions(selectedScopes);
  setCategoryOptions(newCategoryOptions);
  
  // If a scope is selected, filter out any category selections that are no longer valid
  if (!selectedScopes.includes("Aggregated Scope")) {
    // Filter out category selections that aren't in the new options
    const validCategories = selectedCategories.filter(
      category => category === "Aggregated Scope" || newCategoryOptions.includes(category)
    );
    
    // If we removed some selections and now have none, reset to "Aggregated Scope"
    if (validCategories.length === 0 || validCategories.length < selectedCategories.length) {
      setSelectedCategories(["Aggregated Scope"]);
      setSelectedSubCategories(["Aggregated Scope"]);
      setSelectedActivities(["Aggregated Scope"]);
    }
  } else {
    // If "Aggregated Scope" is selected in scopes, reset child dropdowns
    setSelectedCategories(["Aggregated Scope"]);
    setSelectedSubCategories(["Aggregated Scope"]);
    setSelectedActivities(["Aggregated Scope"]);
  }
}, [selectedScopes]);

// When updating subcategory options based on category selection
useEffect(() => {
  // Generate new subcategory options based on selected categories
  const newSubCategoryOptions = generateSubCategoryOptions(selectedCategories);
  setSubCategoryOptions(newSubCategoryOptions);
  
  // If specific categories are selected, filter out any subcategory selections that are no longer valid
  if (!selectedCategories.includes("Aggregated Scope")) {
    // Filter out subcategory selections that aren't in the new options
    const validSubCategories = selectedSubCategories.filter(
      subCategory => subCategory === "Aggregated Scope" || newSubCategoryOptions.includes(subCategory)
    );
    
    // If we removed some selections and now have none, reset to "Aggregated Scope"
    if (validSubCategories.length === 0 || validSubCategories.length < selectedSubCategories.length) {
      setSelectedSubCategories(["Aggregated Scope"]);
      setSelectedActivities(["Aggregated Scope"]);
    }
  } else {
    // If "Aggregated Scope" is selected in categories, reset child dropdowns
    setSelectedSubCategories(["Aggregated Scope"]);
    setSelectedActivities(["Aggregated Scope"]);
  }
}, [selectedCategories]);

// When updating activity options based on subcategory selection
useEffect(() => {
  // Generate new activity options (this would be filtered based on the API data)
  const newActivityOptions = generateActivityOptions(selectedSubCategories);
  setActivityOptions(newActivityOptions);
  
  // If specific subcategories are selected, filter out any activity selections that are no longer valid
  if (!selectedSubCategories.includes("Aggregated Scope")) {
    // Filter out activity selections that aren't in the new options
    const validActivities = selectedActivities.filter(
      activity => activity === "Aggregated Scope" || newActivityOptions.includes(activity)
    );
    
    // If we removed some selections and now have none, reset to "Aggregated Scope"
    if (validActivities.length === 0 || validActivities.length < selectedActivities.length) {
      setSelectedActivities(["Aggregated Scope"]);
    }
  } else {
    // If "Aggregated Scope" is selected in subcategories, reset activities
    setSelectedActivities(["Aggregated Scope"]);
  }
}, [selectedSubCategories]);

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
                onClick={toggleScopeDropdown}
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
                onClick={toggleCategoryDropdown}
                className={`flex items-center font-medium focus:outline-none ${
                  isCategoryDropdownDisabled 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "text-gray-800 hover:text-gray-900 cursor-pointer"
                }`}
              >
                <span>
                  {selectedCategories.includes("Aggregated Scope")
                    ? "Aggregated Scope"
                    : selectedCategories.join(", ")}
                </span>
                <FiChevronDown className={`ml-1 h-4 w-4 ${isCategoryDropdownDisabled ? "text-gray-300" : "text-gray-500"}`} />
              </button>

              {isCategoryDropdownOpen && !isCategoryDropdownDisabled && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-md z-10">
                  <div className="py-1 max-h-60 overflow-y-auto">
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
                onClick={toggleSubCategoryDropdown}
                className={`flex items-center font-medium focus:outline-none ${
                  isSubCategoryDropdownDisabled 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "text-gray-800 hover:text-gray-900 cursor-pointer"
                }`}
              >
                <span>
                  {selectedSubCategories.includes("Aggregated Scope")
                    ? "Aggregated Scope"
                    : selectedSubCategories.join(", ")}
                </span>
                <FiChevronDown className={`ml-1 h-4 w-4 ${isSubCategoryDropdownDisabled ? "text-gray-300" : "text-gray-500"}`} />
              </button>

              {isSubCategoryDropdownOpen && !isSubCategoryDropdownDisabled && (
                <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-gray-200 rounded shadow-md z-10">
                  <div className="py-1 max-h-60 overflow-y-auto">
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
                        <label className="ml-2 block text-sm text-gray-900 truncate">
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
                onClick={toggleActivityDropdown}
                className={`flex items-center font-medium focus:outline-none ${
                  isActivityDropdownDisabled 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "text-gray-800 hover:text-gray-900 cursor-pointer"
                }`}
              >
                <span>
                  {selectedActivities.includes("Aggregated Scope")
                    ? "Aggregated Scope"
                    : selectedActivities.join(", ")}
                </span>
                <FiChevronDown className={`ml-1 h-4 w-4 ${isActivityDropdownDisabled ? "text-gray-300" : "text-gray-500"}`} />
              </button>

              {isActivityDropdownOpen && !isActivityDropdownDisabled && (
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
              {selectedScopes.includes("Aggregated Scope")
                ? " (Aggregated Scopes)"
                : ` (${selectedScopes.join(", ")})`}
            </span>
          </h3>
          <button
            onClick={handleDownloadResults}
            disabled={!graphData}
            className={`inline-flex items-center px-3 py-2 border ${
              !graphData 
                ? "border-gray-200 text-gray-400 cursor-not-allowed" 
                : "border-gray-300 shadow-sm text-gray-700 hover:bg-gray-50"
            } rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            Download results
            <FiDownload className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div className="px-4 py-8 relative">
          {/* Loading state */}
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {/* Error state */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <p className="text-red-700">{error}</p>
              <button 
                onClick={() => {
                  // Retry fetching
                  if (scenarioId) {
                    dispatch(fetchScenarioGraphData({
                      scenarioId,
                      filters: {
                        scope: !selectedScopes.includes("Aggregated Scope") 
                          ? selectedScopes.map(scope => scope.toLowerCase().replace(" ", ""))
                          : undefined,
                        category: !selectedCategories.includes("Aggregated Scope")
                          ? selectedCategories
                          : undefined,
                        sub_category: !selectedSubCategories.includes("Aggregated Scope")
                          ? selectedSubCategories
                          : undefined,
                        activity: !selectedActivities.includes("Aggregated Scope")
                          ? selectedActivities
                          : undefined,
                        include_net_zero: includeNetZero,
                        target_year: extendedTargetYear,
                        main_target_year: mainTargetYear,
                        metrics: businessMetrics
                          .filter(m => m.selected)
                          .map(m => m.id)
                          .join(',')
                      }
                    }));
                  }
                }}
                className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
              >
                Retry
              </button>
            </div>
          )}

          {/* No data state */}
          {!loading && !error && !graphData && (
            <div className="flex flex-col items-center justify-center h-80 bg-gray-50 rounded-md border border-gray-200">
              <FiInfo className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-center max-w-md">
                No graph data available. Please adjust your filter criteria or check if this scenario has emission data.
              </p>
            </div>
          )}
          
          {/* Graph component */}
          {!loading && !error && graphData && (
            <EmissionProjectionGraph
              scenario={scenario}
              graphData={graphData}
              includeNetZero={includeNetZero}
              baseYear={baseYear}
              targetYear={extendedTargetYear}
              mainTargetYear={mainTargetYear}
              selectedScope={selectedScopes.includes("Aggregated Scope") ? "scope1" : selectedScopes[0]?.toLowerCase().replace(" ", "")}
              selectedBusinessMetrics={businessMetrics
                .filter((m) => m.selected)
                .map((m) => m.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmissionProjectionView;