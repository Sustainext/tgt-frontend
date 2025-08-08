import React, { useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiX, FiDownload, FiInfo, FiChevronDown } from "react-icons/fi";
import EmissionsProjectionGraph from "./EmissionProjectionGraph";
import { useDispatch, useSelector } from "react-redux";
import { fetchScenarioGraphData } from "../../../lib/redux/features/optimiseSlice";

const ScenarioViewModal = ({ isOpen, onClose, scenarioData = {} }) => {
  const dispatch = useDispatch();
  
  // Get graph data from Redux store
  const graphData = useSelector(state => state.optimise?.graphData);
  const loading = useSelector(state => state.optimise?.loading?.graphData);
  const error = useSelector(state => state.optimise?.error?.graphData);

  // IMPORTANT: Use safe defaults that don't directly depend on props
  const [baseYear, setBaseYear] = useState(2024);
  const [mainTargetYear, setMainTargetYear] = useState(2030);
  const [extendedTargetYear, setExtendedTargetYear] = useState(2030);
  const [extendedTargetYearInput, setExtendedTargetYearInput] = useState('2030');
  const [targetYearError, setTargetYearError] = useState(null);
  const [includeNetZero, setIncludeNetZero] = useState(false);
  
  // Timeout ref for debounced validation
  const targetYearTimeoutRef = useRef(null);
  
  // Dropdown selections - arrays for multiselect
  const [selectedScopes, setSelectedScopes] = useState(["Aggregated Scope"]);
  const [selectedCategories, setSelectedCategories] = useState(["Aggregated Scope"]);
  const [selectedSubCategories, setSelectedSubCategories] = useState(["Aggregated Scope"]);
  const [selectedActivities, setSelectedActivities] = useState(["Aggregated Scope"]);

  // Dropdown options - will be populated from API data
  const [scopeOptions, setScopeOptions] = useState(["Aggregated Scope"]);
  const [categoryOptions, setCategoryOptions] = useState(["Aggregated Scope"]);
  const [subCategoryOptions, setSubCategoryOptions] = useState(["Aggregated Scope"]);
  const [activityOptions, setActivityOptions] = useState(["Aggregated Scope"]);

  // Dropdown open states
  const [isScopeDropdownOpen, setScopeDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isSubCategoryDropdownOpen, setSubCategoryDropdownOpen] = useState(false);
  const [isActivityDropdownOpen, setActivityDropdownOpen] = useState(false);
  const [isMetricsDropdownOpen, setIsMetricsDropdownOpen] = useState(false);

  // Refs for detecting clicks outside dropdowns
  const scopeRef = useRef(null);
  const categoryRef = useRef(null);
  const subCategoryRef = useRef(null);
  const activityRef = useRef(null);
  const metricsRef = useRef(null);
  const downloadButtonRef = useRef(null);

  // Determine if child dropdowns should be disabled
  // If a parent is set to "Aggregated Scope", all children should be disabled
  const isCategoryDropdownDisabled = selectedScopes.includes("Aggregated Scope");
  const isSubCategoryDropdownDisabled = isCategoryDropdownDisabled || selectedCategories.includes("Aggregated Scope");
  const isActivityDropdownDisabled = isSubCategoryDropdownDisabled || selectedSubCategories.includes("Aggregated Scope");

  // Business metrics filter state
  const [businessMetrics, setBusinessMetrics] = useState([
    { id: "fte", name: "FTE", selected: false },
    { id: "area", name: "Area", selected: false },
    { id: "production_volume", name: "Production Volume", selected: false },
    { id: "revenue", name: "Revenue", selected: false },
  ]);

  // State to control download options dropdown
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  // Extract values from props in useEffect instead of directly in render
  useEffect(() => {
    if (scenarioData) {
      const newBaseYear = scenarioData?.base_year || scenarioData?.baseYear || 2024;
      const newMainTargetYear = scenarioData?.target_year || scenarioData?.targetYear || 2030;
      
      setBaseYear(newBaseYear);
      setMainTargetYear(newMainTargetYear);
      setExtendedTargetYear(newMainTargetYear);
      setExtendedTargetYearInput(newMainTargetYear.toString());
    }
  }, [scenarioData]);

  // Handle target year input with validation
  const handleTargetYearInputChange = (e) => {
    const value = e.target.value;
    setExtendedTargetYearInput(value);

    // Clear any existing timeout
    if (targetYearTimeoutRef.current) {
      clearTimeout(targetYearTimeoutRef.current);
    }

    // Set a timeout for validation after typing stops
    targetYearTimeoutRef.current = setTimeout(() => {
      validateAndUpdateTargetYear(value);
    }, 500);
  };

  // Validate and update the target year
  const validateAndUpdateTargetYear = (value) => {
    // Clear previous errors
    setTargetYearError(null);

    // Convert to number
    const numValue = parseInt(value, 10);

    // Validate if it's a number
    if (isNaN(numValue)) {
      setTargetYearError("Please enter a valid year");
      return;
    }

    // Validate range
    if (numValue < baseYear) {
      setTargetYearError(`Cannot be earlier than base year (${baseYear})`);
      return;
    }

    if (numValue > 2050) {
      setTargetYearError("Year cannot exceed 2050");
      return;
    }

    // Update the actual value if validation passes
    setExtendedTargetYear(numValue);
  };

  // Helper function to extract business metrics from graph data
  const extractBusinessMetricsFromData = (graphData) => {
    if (!graphData) return [];

    // Set to collect unique metrics
    const uniqueMetrics = new Set();

    // Format metric name for display
    const formatMetricName = (metric) => {
      return metric
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    // Check metrics in totals if available
    if (graphData.totals) {
      Object.values(graphData.totals).forEach((yearData) => {
        Object.keys(yearData).forEach((key) => {
          if (
            ["fte", "area", "production_volume", "revenue", "employees"].includes(key)
          ) {
            uniqueMetrics.add(key);
          }
        });
      });
    }

    // Check metrics in yearly_data
    if (graphData.yearly_data) {
      Object.values(graphData.yearly_data).forEach((activities) => {
        if (Array.isArray(activities)) {
          activities.forEach((activity) => {
            Object.keys(activity).forEach((key) => {
              if (
                ["fte", "area", "production_volume", "revenue", "employees"].includes(key)
              ) {
                uniqueMetrics.add(key);
              }
            });
          });
        }
      });
    }

    // Convert to array of objects
    return Array.from(uniqueMetrics).map((metric) => ({
      id: metric,
      name: formatMetricName(metric),
      selected: false,
    }));
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
      if (downloadButtonRef.current && !downloadButtonRef.current.contains(event.target)) {
        setShowDownloadOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      
      // Clear any existing timeouts
      if (targetYearTimeoutRef.current) {
        clearTimeout(targetYearTimeoutRef.current);
      }
    };
  }, []);
  
  // Handle scope selection with enhanced parent-child dependencies
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

  // Handle category selection with parent-child dependencies
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
        // Reset subcategories since category relationship changed
        setSelectedSubCategories(["Aggregated Scope"]);
        setSelectedActivities(["Aggregated Scope"]);
      }
    } else {
      // Adding another category
      setSelectedCategories([...selectedCategories, category]);
      // Reset subcategories to avoid mismatches
      setSelectedSubCategories(["Aggregated Scope"]);
      setSelectedActivities(["Aggregated Scope"]);
    }
  };

  // Handle subcategory selection with parent-child dependencies
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
      const newSelectedActivities = selectedActivities.filter((a) => a !== activity);
      if (newSelectedActivities.length === 0) {
        setSelectedActivities(["Aggregated Scope"]);
      } else {
        setSelectedActivities(newSelectedActivities);
      }
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  // Toggle business metric selection
  const toggleMetric = (metricId) => {
    setBusinessMetrics((metrics) =>
      metrics.map((metric) =>
        metric.id === metricId
          ? { ...metric, selected: !metric.selected }
          : metric
      )
    );
  };

  // Remove a selected metric
  const removeMetric = (metricId) => {
    toggleMetric(metricId);
  };

  // Get the currently selected metrics
  const selectedMetrics = businessMetrics.filter((metric) => metric.selected);

  // Update available options based on API data
  useEffect(() => {
    if (graphData && graphData.yearly_data) {
      // Extract unique values for each filter type
      const uniqueScopes = new Set(["Aggregated Scope"]);
      const uniqueCategories = new Set(["Aggregated Scope"]);
      const uniqueSubCategories = new Set(["Aggregated Scope"]);
      const uniqueActivities = new Set(["Aggregated Scope"]);
      
      // Go through each year's data
      Object.values(graphData.yearly_data).forEach((yearActivities) => {
        yearActivities.forEach((activity) => {
          // Add values to their respective sets
          if (activity.scope) uniqueScopes.add(activity.scope);
          if (activity.category) uniqueCategories.add(activity.category);
          if (activity.sub_category) uniqueSubCategories.add(activity.sub_category);
          if (activity.activity_name) uniqueActivities.add(activity.activity_name);
        });
      });
      
      // Prepare all the options before any state updates
      let scopeOptionsToSet = Array.from(uniqueScopes);
      let categoryOptionsToSet = Array.from(uniqueCategories);
      let subCategoryOptionsToSet = Array.from(uniqueSubCategories);
      let activityOptionsToSet = Array.from(uniqueActivities);
      
      // Filter category options based on selected scopes
      if (!selectedScopes.includes("Aggregated Scope")) {
        const filteredCategories = new Set(["Aggregated Scope"]);
        
        Object.values(graphData.yearly_data).forEach((yearActivities) => {
          yearActivities.forEach((activity) => {
            if (selectedScopes.includes(activity.scope) && activity.category) {
              filteredCategories.add(activity.category);
            }
          });
        });
        
        categoryOptionsToSet = Array.from(filteredCategories);
      }
      
      // Filter subcategory options based on selected categories
      if (!selectedCategories.includes("Aggregated Scope")) {
        const filteredSubCategories = new Set(["Aggregated Scope"]);
        
        Object.values(graphData.yearly_data).forEach((yearActivities) => {
          yearActivities.forEach((activity) => {
            const matchesScope = selectedScopes.includes("Aggregated Scope") || 
                                selectedScopes.includes(activity.scope);
                                
            const matchesCategory = selectedCategories.includes(activity.category);
            
            if (matchesScope && matchesCategory && activity.sub_category) {
              filteredSubCategories.add(activity.sub_category);
            }
          });
        });
        
        subCategoryOptionsToSet = Array.from(filteredSubCategories);
      }
      
      // Filter activity options based on selected subcategories
      if (!selectedSubCategories.includes("Aggregated Scope")) {
        const filteredActivities = new Set(["Aggregated Scope"]);
        
        Object.values(graphData.yearly_data).forEach((yearActivities) => {
          yearActivities.forEach((activity) => {
            const matchesScope = selectedScopes.includes("Aggregated Scope") || 
                                selectedScopes.includes(activity.scope);
                                
            const matchesCategory = selectedCategories.includes("Aggregated Scope") || 
                                  selectedCategories.includes(activity.category);
                                  
            const matchesSubCategory = selectedSubCategories.includes(activity.sub_category);
            
            if (matchesScope && matchesCategory && matchesSubCategory && activity.activity_name) {
              filteredActivities.add(activity.activity_name);
            }
          });
        });
        
        activityOptionsToSet = Array.from(filteredActivities);
      }
      
      // Update the options if not in dropdown interactions
      // Batch all state updates to minimize re-renders
      const stateUpdates = [];
      
      if (!isScopeDropdownOpen) {
        stateUpdates.push(() => setScopeOptions(scopeOptionsToSet));
      }
      
      if (!isCategoryDropdownOpen) {
        stateUpdates.push(() => setCategoryOptions(categoryOptionsToSet));
      }
      
      if (!isSubCategoryDropdownOpen) {
        stateUpdates.push(() => setSubCategoryOptions(subCategoryOptionsToSet));
      }
      
      if (!isActivityDropdownOpen) {
        stateUpdates.push(() => setActivityOptions(activityOptionsToSet));
      }
      
      // Extract and update business metrics
      const availableMetrics = extractBusinessMetricsFromData(graphData);
      if (availableMetrics.length > 0) {
        stateUpdates.push(() => 
          setBusinessMetrics((prevMetrics) => {
            // Skip update if metrics are the same (prevents unnecessary re-renders)
            if (prevMetrics.length === availableMetrics.length && 
                prevMetrics.every((m) => availableMetrics.some((am) => am.id === m.id))) {
              // Just preserve selections
              const existingMetricsMap = new Map(
                prevMetrics.map((m) => [m.id, m.selected])
              );
              
              const noChangeNeeded = availableMetrics.every(
                (newMetric) => 
                  existingMetricsMap.has(newMetric.id) && 
                  prevMetrics.find((m) => m.id === newMetric.id)?.name === newMetric.name
              );
              
              if (noChangeNeeded) {
                return prevMetrics;
              }
            }
            
            // Create a map of existing metrics for quick lookup
            const existingMetricsMap = new Map(
              prevMetrics.map((m) => [m.id, m.selected])
            );
            
            // Preserve selection state for metrics that already exist
            return availableMetrics.map((newMetric) => ({
              ...newMetric,
              selected: existingMetricsMap.has(newMetric.id)
                ? existingMetricsMap.get(newMetric.id)
                : false,
            }));
          })
        );
      }
      
      // Apply all state updates
      stateUpdates.forEach((updateFn) => updateFn());
    }
  }, [
    graphData, 
    selectedScopes, 
    selectedCategories, 
    selectedSubCategories,
    isScopeDropdownOpen,
    isCategoryDropdownOpen,
    isSubCategoryDropdownOpen,
    isActivityDropdownOpen
  ]);

  // Fetch graph data when filters change or modal opens
  useEffect(() => {
    if (!isOpen || !scenarioData?.id) return;

    // Build filter object for API call
    const filters = {};
    
    // Only add scopes if not using aggregated
    if (!selectedScopes.includes("Aggregated Scope")) {
      filters.scope = selectedScopes;
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
    
    // Add net zero parameter
    filters.include_net_zero = includeNetZero;
    
    // Add target year parameters
    filters.target_year = extendedTargetYear;
    filters.main_target_year = mainTargetYear;
    
    // Add business metrics
    filters.metrics = businessMetrics
      .filter(m => m.selected)
      .map(m => m.id)
      .join(',');
    
    // Fetch the graph data
    dispatch(fetchScenarioGraphData({ 
      scenarioId: scenarioData.id, 
      filters 
    }));
  }, [
    isOpen,
    dispatch, 
    scenarioData?.id, 
    selectedScopes, 
    selectedCategories, 
    selectedSubCategories, 
    selectedActivities,
    includeNetZero,
    extendedTargetYear,
    mainTargetYear,
    businessMetrics
  ]);

  // Handle downloading results
  const handleDownloadResults = () => {
    if (!graphData) return;
    setShowDownloadOptions(!showDownloadOptions);
  };

  // Handle CSV download
  const handleDownloadCSV = () => {
    try {
      // Create CSV header row
      const headers = ["Year", "Scope", "Category", "Sub_Category", "Activity", "Emissions_Value", "Unit"];
      let csvContent = headers.join(",") + "\n";
      
      // Extract data from graphData
      if (graphData.yearly_data) {
        Object.entries(graphData.yearly_data).forEach(([year, activities]) => {
          activities.forEach(activity => {
            // Create a row for each activity
            const row = [
              year,
              activity.scope || "",
              activity.category || "",
              activity.sub_category || "",
              activity.activity_name || "",
              activity.co2e || "0",
              "tCO2e"
            ];
            
            // Add the row to CSV content, properly escaped
            csvContent += row.map(cell => {
              // Escape cells with commas or quotes
              if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))) {
                return `"${cell.replace(/"/g, '""')}"`;
              }
              return cell;
            }).join(",") + "\n";
          });
        });
      }
      
      // Create and download the CSV file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url);
      a.setAttribute("download", `scenario-${scenarioData.id}-data.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Close dropdown after download
      setShowDownloadOptions(false);
    } catch (error) {
      console.error("Error creating CSV:", error);
      alert("Failed to download CSV. Please try again.");
    }
  };

  // Handle PNG download
  const handleDownloadPNG = () => {
    try {
      // Find the chart SVG element
      const svgElement = document.querySelector('.emission-chart-container svg');
      if (!svgElement) {
        console.error("Could not find chart SVG element");
        alert("Could not find chart to download. Please try again.");
        return;
      }
      
      // Create a canvas for the PNG
      const canvas = document.createElement('canvas');
      const width = svgElement.width.baseVal.value || 1200;
      const height = svgElement.height.baseVal.value || 600;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);
      
      // Convert SVG to PNG
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        
        // Download the PNG
        canvas.toBlob((blob) => {
          const pngUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.setAttribute("hidden", "");
          a.setAttribute("href", pngUrl);
          a.setAttribute("download", `scenario-${scenarioData.id}-chart.png`);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(pngUrl);
          
          // Close dropdown after download
          setShowDownloadOptions(false);
        }, 'image/png');
      };
      
      img.src = url;
    } catch (error) {
      console.error("Error creating PNG:", error);
      alert("Failed to download PNG. Please try again.");
    }
  };

  // If there's no scenarioData or it's not open, don't render anything
  if (!scenarioData || !isOpen) {
    return null;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-10">
          <div className="flex max-h-[90vh] scrollable-content overflow-y-auto items-start justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[1100px] transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all mb-8 max-h-[105vh] flex flex-col">
                {/* Header section with scenario details */}
                <div className="p-6 pb-4">
                  <Dialog.Title className="text-2xl font-medium text-gray-900 mb-3">
                    {scenarioData.name || "Scenario Name"}
                  </Dialog.Title>

                  <div className="flex flex-wrap gap-x-8 text-sm">
                    <div className="mb-2">
                      <span className="text-gray-500">Organization:</span>{" "}
                      <span className="text-blue-600 font-semibold bg-blue-100 rounded-md px-2 py-0.5">
                        {scenarioData.organization_name || scenarioData.organization || "-"}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-500">Corporate Entity:</span>{" "}
                      <span className="text-green-600 font-semibold bg-green-100 rounded-md px-2 py-0.5">
                        {scenarioData.corporate_name || scenarioData.corporate || "-"}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-500">Base Year:</span>{" "}
                      <span className="font-medium">
                        {baseYear}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-500">Target Year:</span>{" "}
                      <span className="font-medium">
                        {mainTargetYear}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {/* Results section */}
                  <div className="mb-6">
                    <h2 className="text-md font-semibold text-gray-900 mb-4">
                      Showing Result for:
                    </h2>

                    {/* Filters row */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {/* Scope Dropdown */}
                      <div className="flex items-center" ref={scopeRef}>
                        <span className="text-gray-600 font-medium mr-1">
                          Scope:
                        </span>
                        <div className="relative">
                          <button
                            onClick={() => setScopeDropdownOpen(!isScopeDropdownOpen)}
                            className="flex items-center text-gray-800 hover:text-gray-900 font-medium focus:outline-none"
                          >
                            <span className="max-w-[150px] truncate">
                              {selectedScopes.includes("Aggregated Scope")
                                ? "Aggregated Scope"
                                : selectedScopes.length === 1
                                ? selectedScopes[0]
                                : `${selectedScopes.length} selected`}
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
                                    <label className="ml-2 block text-sm text-gray-900 truncate">
                                      {scope}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <div className="border-t border-gray-200 px-4 py-2">
                                <button
                                  className="text-sm text-blue-600 hover:text-blue-800"
                                  onClick={() => {
                                    // Reset to Aggregated Scope and close dropdown
                                    setSelectedScopes(["Aggregated Scope"]);
                                    setSelectedCategories(["Aggregated Scope"]);
                                    setSelectedSubCategories(["Aggregated Scope"]);
                                    setSelectedActivities(["Aggregated Scope"]);
                                    setScopeDropdownOpen(false);
                                  }}
                                >
                                  Reset
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Category Dropdown */}
                      <div className="flex items-center" ref={categoryRef}>
                        <span className="text-gray-600 font-medium mr-1">
                          Category:
                        </span>
                        <div className="relative">
                          <button
                            onClick={() =>
                              setCategoryDropdownOpen(
                                !isCategoryDropdownDisabled && !isCategoryDropdownOpen
                              )
                            }
                            className={`flex items-center font-medium focus:outline-none ${
                              isCategoryDropdownDisabled
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-gray-800 hover:text-gray-900 cursor-pointer"
                            }`}
                          >
                            <span className="max-w-[150px] truncate">
                              {selectedCategories.includes("Aggregated Scope")
                                ? "Aggregated Scope"
                                : selectedCategories.length === 1
                                ? selectedCategories[0]
                                : `${selectedCategories.length} selected`}
                            </span>
                            <FiChevronDown
                              className={`ml-1 h-4 w-4 ${
                                isCategoryDropdownDisabled
                                  ? "text-gray-300"
                                  : "text-gray-500"
                              }`}
                            />
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
                                    <label className="ml-2 block text-sm text-gray-900 truncate">
                                      {category}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <div className="border-t border-gray-200 px-4 py-2">
                                <button
                                  className="text-sm text-blue-600 hover:text-blue-800"
                                  onClick={() => {
                                    // Reset to Aggregated Scope and close dropdown
                                    setSelectedCategories(["Aggregated Scope"]);
                                    setSelectedSubCategories(["Aggregated Scope"]);
                                    setSelectedActivities(["Aggregated Scope"]);
                                    setCategoryDropdownOpen(false);
                                  }}
                                >
                                  Reset
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
                            onClick={() =>
                              setSubCategoryDropdownOpen(
                                !isSubCategoryDropdownDisabled && !isSubCategoryDropdownOpen
                              )
                            }
                            className={`flex items-center font-medium focus:outline-none ${
                              isSubCategoryDropdownDisabled
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-gray-800 hover:text-gray-900 cursor-pointer"
                            }`}
                          >
                            <span className="max-w-[150px] truncate">
                              {selectedSubCategories.includes("Aggregated Scope")
                                ? "Aggregated Scope"
                                : selectedSubCategories.length === 1
                                ? selectedSubCategories[0]
                                : `${selectedSubCategories.length} selected`}
                            </span>
                            <FiChevronDown
                              className={`ml-1 h-4 w-4 ${
                                isSubCategoryDropdownDisabled
                                  ? "text-gray-300"
                                  : "text-gray-500"
                              }`}
                            />
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
                                  onClick={() => {
                                    // Reset to Aggregated Scope and close dropdown
                                    setSelectedSubCategories(["Aggregated Scope"]);
                                    setSelectedActivities(["Aggregated Scope"]);
                                    setSubCategoryDropdownOpen(false);
                                  }}
                                >
                                  Reset
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Activity Dropdown */}
                      <div className="flex items-center" ref={activityRef}>
                        <span className="text-gray-600 font-medium mr-1">
                          Activity:
                        </span>
                        <div className="relative">
                          <button
                            onClick={() =>
                              setActivityDropdownOpen(
                                !isActivityDropdownDisabled && !isActivityDropdownOpen
                              )
                            }
                            className={`flex items-center font-medium focus:outline-none ${
                              isActivityDropdownDisabled
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-gray-800 hover:text-gray-900 cursor-pointer"
                            }`}
                          >
                            <span className="max-w-[150px] truncate">
                              {selectedActivities.includes("Aggregated Scope")
                                ? "Aggregated Scope"
                                : selectedActivities.length === 1
                                ? selectedActivities[0]
                                : `${selectedActivities.length} selected`}
                            </span>
                            <FiChevronDown
                              className={`ml-1 h-4 w-4 ${
                                isActivityDropdownDisabled
                                  ? "text-gray-300"
                                  : "text-gray-500"
                              }`}
                            />
                          </button>

                          {isActivityDropdownOpen && !isActivityDropdownDisabled && (
                            <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-gray-200 rounded shadow-md z-10">
                              <div className="py-1 max-h-60 overflow-y-auto">
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
                                    <label className="ml-2 block text-sm text-gray-900 truncate">
                                      {activity}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <div className="border-t border-gray-200 px-4 py-2">
                                <button
                                  className="text-sm text-blue-600 hover:text-blue-800"
                                  onClick={() => {
                                    // Reset to Aggregated Scope and close dropdown
                                    setSelectedActivities(["Aggregated Scope"]);
                                    setActivityDropdownOpen(false);
                                  }}
                                >
                                  Reset
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
                            className="flex items-center justify-between w-48 rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
                            onClick={() => setIsMetricsDropdownOpen(!isMetricsDropdownOpen)}
                          >
                            <span>Business metrics</span>
                            <FiChevronDown className="h-4 w-4" />
                          </button>

                          {isMetricsDropdownOpen && (
                            <div className="absolute z-10 mt-1 w-48 rounded-md bg-white shadow-lg border border-gray-200">
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

                      <div className="flex flex-col items-start gap-1 ml-4">
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="target-year"
                            className="text-sm text-gray-700 whitespace-nowrap"
                          >
                            Target Year:
                          </label>
                          <input
                            id="target-year"
                            type="number"
                            min={baseYear}
                            max={2050}
                            value={extendedTargetYearInput}
                            onChange={handleTargetYearInputChange}
                            onBlur={() => {
                              // Validate on blur to ensure validation happens
                              // even if the user doesn't type for a while
                              if (targetYearTimeoutRef.current) {
                                clearTimeout(targetYearTimeoutRef.current);
                              }
                              validateAndUpdateTargetYear(extendedTargetYearInput);
                            }}
                            className={`w-24 rounded-md border ${
                              targetYearError ? "border-red-500" : "border-gray-300"
                            } py-1 px-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm`}
                          />
                        </div>
                        {targetYearError && (
                          <p className="text-xs text-red-500 mt-1">{targetYearError}</p>
                        )}
                      </div>
                    </div>

                    {/* Chart visualization */}
                    <div className="mb-6 mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base font-semibold text-gray-900">
                          Predicted Trend of chosen Business Metrics over Years
                          for {selectedScopes.includes("Aggregated Scope") 
                               ? " (Aggregated Scopes)" 
                               : ` (${selectedScopes.join(", ")})`}
                        </h3>
                        <div className="relative" ref={downloadButtonRef}>
                          <button
                            onClick={handleDownloadResults}
                            disabled={!graphData || loading}
                            className={`inline-flex items-center px-3 py-2 border ${
                              !graphData || loading 
                                ? "border-gray-200 text-gray-400 cursor-not-allowed" 
                                : "border-gray-300 shadow-sm text-gray-700 hover:bg-gray-50"
                            } rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                          >
                            Download
                            <FiDownload className="ml-2 h-4 w-4" />
                          </button>

                          {/* Download options dropdown */}
                          {showDownloadOptions && !loading && graphData && (
                            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-md z-20">
                              <div className="py-1">
                                <button
                                  onClick={handleDownloadCSV}
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                >
                                  Download as CSV
                                </button>
                                <button
                                  onClick={handleDownloadPNG}
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                >
                                  Download as PNG
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Chart container with loading, error, and no data states */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden emission-chart-container relative">
                        {/* Loading state */}
                        {loading && (
                          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                          </div>
                        )}
                        
                        {/* Error state */}
                        {error && !loading && (
                          <div className="h-80 flex items-center justify-center">
                            <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md">
                              <p className="text-red-700">{error}</p>
                              <button 
                                onClick={() => {
                                  // Retry fetching
                                  if (scenarioData.id) {
                                    dispatch(fetchScenarioGraphData({
                                      scenarioId: scenarioData.id,
                                      filters: {
                                        scope: !selectedScopes.includes("Aggregated Scope") 
                                          ? selectedScopes.map(scope => scope)
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
                          </div>
                        )}

                        {/* No data state */}
                        {!loading && !error && (!graphData || !Object.keys(graphData).length) && (
                          <div className="h-80 flex items-center justify-center">
                            <div className="text-gray-500 text-center">
                              <p className="mb-2 font-medium">No emission data available</p>
                              <p className="text-sm">Adjust your filters or check if this scenario has emission data</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Graph component */}
                        {!loading && !error && graphData && Object.keys(graphData).length > 0 && (
                          <EmissionsProjectionGraph
                            scenario={scenarioData}
                            graphData={graphData}
                            includeNetZero={includeNetZero}
                            baseYear={baseYear}
                            targetYear={extendedTargetYear}
                            mainTargetYear={mainTargetYear}
                            selectedScope={selectedScopes.includes("Aggregated Scope") 
                              ? "scope1" 
                              : selectedScopes[0]?.toLowerCase().replace(/[- ]/g, "")}
                            selectedBusinessMetrics={businessMetrics
                              .filter(m => m.selected)
                              .map(m => m.id)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close button - fixed at top right corner */}
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={onClose}
                >
                  <FiX className="h-5 w-5" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ScenarioViewModal;