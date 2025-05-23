import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiDownload, FiInfo, FiChevronDown, FiX } from "react-icons/fi";
import EmissionProjectionGraph from "./EmissionProjectionGraph";
import { fetchScenarioGraphData } from "../../../lib/redux/features/optimiseSlice";
import { debounce } from "lodash";

// Helper functions to extract unique values from graph data
const extractUniqueScopes = (graphData) => {
  if (!graphData || !graphData.yearly_data) return ["All Scopes"];
  
  const uniqueScopes = new Set(["All Scopes"]);
  
  Object.values(graphData.yearly_data).forEach((yearActivities) => {
    yearActivities.forEach((activity) => {
      if (activity.scope) uniqueScopes.add(activity.scope);
    });
  });
  
  return Array.from(uniqueScopes);
};

const extractUniqueCategories = (graphData) => {
  if (!graphData || !graphData.yearly_data) return ["All Categories"];
  
  const uniqueCategories = new Set(["All Categories"]);
  
  Object.values(graphData.yearly_data).forEach((yearActivities) => {
    yearActivities.forEach((activity) => {
      if (activity.category) uniqueCategories.add(activity.category);
    });
  });
  
  return Array.from(uniqueCategories);
};

const extractUniqueSubCategories = (graphData) => {
  if (!graphData || !graphData.yearly_data) return ["All Sub Categories"];
  
  const uniqueSubCategories = new Set(["All Sub Categories"]);
  
  Object.values(graphData.yearly_data).forEach((yearActivities) => {
    yearActivities.forEach((activity) => {
      if (activity.sub_category) uniqueSubCategories.add(activity.sub_category);
    });
  });
  
  return Array.from(uniqueSubCategories);
};

const extractUniqueActivities = (graphData) => {
  if (!graphData || !graphData.yearly_data) return ["All Activities"];
  
  const uniqueActivities = new Set(["All Activities"]);
  
  Object.values(graphData.yearly_data).forEach((yearActivities) => {
    yearActivities.forEach((activity) => {
      if (activity.activity_name) uniqueActivities.add(activity.activity_name);
    });
  });
  
  return Array.from(uniqueActivities);
};

// Helper function to get filtered options based on current selections
const getFilteredOptions = (graphData, originalResponse, selectedScopes, selectedCategories, selectedSubCategories) => {
  if (!graphData || !originalResponse) {
    return {
      categories: ["All Categories"],
      subCategories: ["All Sub Categories"], 
      activities: ["All Activities"]
    };
  }

  const filteredCategories = new Set(["All Categories"]);
  const filteredSubCategories = new Set(["All Sub Categories"]);
  const filteredActivities = new Set(["All Activities"]);

  Object.values(originalResponse.yearly_data).forEach((yearActivities) => {
    yearActivities.forEach((activity) => {
      // Check if activity matches current scope selection
      const scopeMatches = selectedScopes.includes("All Scopes") || 
                          selectedScopes.includes(activity.scope);
      
      if (scopeMatches) {
        if (activity.category) filteredCategories.add(activity.category);
        
        // Check if activity matches current category selection
        const categoryMatches = selectedCategories.includes("All Categories") || 
                               selectedCategories.includes(activity.category);
        
        if (categoryMatches) {
          if (activity.sub_category) filteredSubCategories.add(activity.sub_category);
          
          // Check if activity matches current sub-category selection
          const subCategoryMatches = selectedSubCategories.includes("All Sub Categories") || 
                                    selectedSubCategories.includes(activity.sub_category);
          
          if (subCategoryMatches) {
            if (activity.activity_name) filteredActivities.add(activity.activity_name);
          }
        }
      }
    });
  });

  return {
    categories: Array.from(filteredCategories),
    subCategories: Array.from(filteredSubCategories),
    activities: Array.from(filteredActivities)
  };
};

const EmissionProjectionView = ({ scenario = {} }) => {
  const [originalResponse, setOriginalResponse] = useState(null);

  const dispatch = useDispatch();
  const scenarioId = scenario?.id;

  // Get state from Redux
  const graphData = useSelector((state) => state.optimise?.graphData);
  const loading = useSelector((state) => state.optimise?.loading?.graphData);
  const error = useSelector((state) => state.optimise?.error?.graphData);

  // Main target year comes from scenario creation
  const baseYear = scenario?.base_year || 2024;
  const mainTargetYear = scenario?.target_year || 2030;

  // Extended target year can be adjusted by the user (defaults to main target year)
  const [extendedTargetYear, setExtendedTargetYear] = useState(mainTargetYear);
  const [extendedTargetYearInput, setExtendedTargetYearInput] = useState(
    mainTargetYear.toString()
  );
  const [targetYearError, setTargetYearError] = useState(null);
  const [includeNetZero, setIncludeNetZero] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Timeout ref for debounced validation
  const targetYearTimeoutRef = useRef(null);

  // Update extended target year if main target year changes
  useEffect(() => {
    setExtendedTargetYear(mainTargetYear);
    setExtendedTargetYearInput(mainTargetYear.toString());
  }, [mainTargetYear]);

  // ORIGINAL COMPLETE OPTIONS - Set once from first API response, never change
  const [originalCompleteOptions, setOriginalCompleteOptions] = useState({
    scopes: ["All Scopes"],
    categories: ["All Categories"],
    subCategories: ["All Sub Categories"],
    activities: ["All Activities"]
  });

  useEffect(()=>{
    if(originalResponse === null)
      setOriginalResponse(graphData);
  },[graphData])

  // Flag to track if original options have been set (to prevent multiple updates)
  const [originalOptionsSet, setOriginalOptionsSet] = useState(false);

  // CURRENT FILTERED OPTIONS - Update based on current selections
  const [currentFilteredOptions, setCurrentFilteredOptions] = useState({
    categories: ["All Categories"],
    subCategories: ["All Sub Categories"],
    activities: ["All Activities"]
  });

  // Selection states
  const [selectedScopes, setSelectedScopes] = useState(["All Scopes"]);
  const [selectedCategories, setSelectedCategories] = useState(["All Categories"]);
  const [selectedSubCategories, setSelectedSubCategories] = useState(["All Sub Categories"]);
  const [selectedActivities, setSelectedActivities] = useState(["All Activities"]);

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
  const downloadButtonRef = useRef(null);
  const downloadOptionsRef = useRef(null);

  // Business metrics filter state
  const [isMetricsDropdownOpen, setIsMetricsDropdownOpen] = useState(false);
  const [businessMetrics, setBusinessMetrics] = useState([]);

  // State to control download options dropdown
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  // Determine if child dropdowns should be disabled
  const isCategoryDropdownDisabled = selectedScopes.includes("All Scopes");
  const isSubCategoryDropdownDisabled =
    isCategoryDropdownDisabled || selectedCategories.includes("All Categories");
  const isActivityDropdownDisabled =
    isSubCategoryDropdownDisabled || selectedSubCategories.includes("All Sub Categories");

  // SET ORIGINAL COMPLETE OPTIONS - Only once from first API response
  useEffect(() => {
    // Only proceed if we have graph data and original options haven't been set yet
    if (!graphData || !graphData.yearly_data || originalOptionsSet) return;

    console.log("Setting original complete options from FIRST API response...");

    const extractedOptions = {
      scopes: extractUniqueScopes(graphData),
      categories: extractUniqueCategories(graphData),
      subCategories: extractUniqueSubCategories(graphData),
      activities: extractUniqueActivities(graphData)
    };

    console.log("Original complete options (SET ONCE):", extractedOptions);

    // Set the original complete options ONCE and mark as set
    setOriginalCompleteOptions(extractedOptions);
    setOriginalOptionsSet(true); // Prevent future updates to original options

    // Extract and update business metrics
    const availableMetrics = extractBusinessMetricsFromData(graphData);
    if (availableMetrics.length > 0) {
      setBusinessMetrics((prevMetrics) => {
        // Skip update if metrics are the same (prevents unnecessary re-renders)
        if (
          prevMetrics.length === availableMetrics.length &&
          prevMetrics.every((m) => availableMetrics.some((am) => am.id === m.id))
        ) {
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
            : true,
        }));
      });
    }
  }, [graphData, originalOptionsSet]); // Dependency on originalOptionsSet ensures this runs only once

  // UPDATE FILTERED OPTIONS - Based on current selections and current API response
  // This runs on every API response AFTER the original options are set
  useEffect(() => {
    // Only update filtered options if original options have been set
    if (!originalOptionsSet) return;

    if (!graphData || !graphData.yearly_data) {
      setCurrentFilteredOptions({
        categories: ["All Categories"],
        subCategories: ["All Sub Categories"],
        activities: ["All Activities"]
      });
      return;
    }

    console.log("Updating filtered child options based on current selections and latest API response...");

    const filteredOptions = getFilteredOptions(
      graphData, 
      originalResponse,
      selectedScopes, 
      selectedCategories, 
      selectedSubCategories
    );

    console.log("Updated filtered options:", filteredOptions);

    setCurrentFilteredOptions(filteredOptions);
  }, [graphData, selectedScopes, selectedCategories, selectedSubCategories, originalOptionsSet]);

  // ASSIGN OPTIONS TO DROPDOWNS
  // Scopes: Always use original complete options
  const scopeOptions = originalCompleteOptions.scopes;
  
  // Categories: Use filtered options if scope is selected, otherwise use original complete options
  const categoryOptions = selectedScopes.includes("All Scopes") 
    ? originalCompleteOptions.categories 
    : currentFilteredOptions.categories;
  
  // Sub Categories: Use filtered options if category is selected, otherwise use original complete options
  const subCategoryOptions = selectedCategories.includes("All Categories")
    ? originalCompleteOptions.subCategories
    : currentFilteredOptions.subCategories;
  
  // Activities: Use filtered options if sub-category is selected, otherwise use original complete options
  const activityOptions = selectedSubCategories.includes("All Sub Categories")
    ? originalCompleteOptions.activities
    : currentFilteredOptions.activities;

  // CLEAN UP INVALID SELECTIONS when filtered options change
  useEffect(() => {
    // Clean up category selections when available categories change
    if (!selectedCategories.includes("All Categories")) {
      const validCategories = selectedCategories.filter(category => 
        categoryOptions.includes(category)
      );
      if (validCategories.length === 0) {
        setSelectedCategories(["All Categories"]);
        setSelectedSubCategories(["All Sub Categories"]);
        setSelectedActivities(["All Activities"]);
      } else if (validCategories.length !== selectedCategories.length) {
        setSelectedCategories(validCategories);
      }
    }
  }, [categoryOptions]);

  useEffect(() => {
    // Clean up sub-category selections when available sub-categories change
    if (!selectedSubCategories.includes("All Sub Categories")) {
      const validSubCategories = selectedSubCategories.filter(subCategory => 
        subCategoryOptions.includes(subCategory)
      );
      if (validSubCategories.length === 0) {
        setSelectedSubCategories(["All Sub Categories"]);
        setSelectedActivities(["All Activities"]);
      } else if (validSubCategories.length !== selectedSubCategories.length) {
        setSelectedSubCategories(validSubCategories);
      }
    }
  }, [subCategoryOptions]);

  useEffect(() => {
    // Clean up activity selections when available activities change
    if (!selectedActivities.includes("All Activities")) {
      const validActivities = selectedActivities.filter(activity => 
        activityOptions.includes(activity)
      );
      if (validActivities.length === 0) {
        setSelectedActivities(["All Activities"]);
      } else if (validActivities.length !== selectedActivities.length) {
        setSelectedActivities(validActivities);
      }
    }
  }, [activityOptions]);

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
    if (!graphData) return;
    setShowDownloadOptions(!showDownloadOptions);
  };

  // Handle CSV download
  const handleDownloadCSV = (e) => {
    e.stopPropagation();
    console.log("Download CSV invoked !");
    
    setIsDownloading(true);
    try {
      const headers = [
        "Year",
        "Scope",
        "Category",
        "Sub_Category",
        "Activity",
        "Emissions_Value",
        "Unit",
      ];
      let csvContent = headers.join(",") + "\n";

      if (graphData.yearly_data) {
        Object.entries(graphData.yearly_data).forEach(([year, activities]) => {
          activities.forEach((activity) => {
            const row = [
              year,
              activity.scope || "",
              activity.category || "",
              activity.sub_category || "",
              activity.activity_name || "",
              activity.co2e,
              "tCO2e",
            ];

            csvContent +=
              row
                .map((cell) => {
                  if (
                    typeof cell === "string" &&
                    (cell.includes(",") || cell.includes('"'))
                  ) {
                    return `"${cell.replace(/"/g, '""')}"`;
                  }
                  return cell;
                })
                .join(",") + "\n";
          });
        });
      }

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url);
      a.setAttribute("download", `scenario-${scenario.id}-data.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setShowDownloadOptions(false);
    } catch (error) {
      console.error("Error creating CSV:", error);
      alert("Failed to download CSV. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

// Handle PNG download with improved padding and sizing
const handleDownloadPNG = (e) => {
  e.stopPropagation();
  console.log("Download PNG invoked!");
  
  setIsDownloading(true);
  try {
    const svgElement = document.querySelector(".emission-chart-container svg");
    
    if (!svgElement) {
      console.error("Could not find chart SVG element");
      alert("Could not find chart to download. Please try again.");
      setIsDownloading(false);
      return;
    }

    // Get the actual bounding box of the SVG content
    const svgBBox = svgElement.getBBox();
    const svgRect = svgElement.getBoundingClientRect();
    
    // Use the larger of the two dimensions to ensure nothing gets cut
    const contentWidth = Math.max(svgBBox.width, svgRect.width);
    const contentHeight = Math.max(svgBBox.height, svgRect.height);
    
    // Increased padding for better spacing
    const paddingLeft = 120;
    const paddingRight = 120;
    const paddingTop = 100;
    const paddingBottom = 150;
    
    // Calculate new dimensions with generous padding
    const newWidth = contentWidth + paddingLeft + paddingRight;
    const newHeight = contentHeight + paddingTop + paddingBottom;
    
    // Clone the SVG
    const svgClone = svgElement.cloneNode(true);
    
    // Set new dimensions
    svgClone.setAttribute("width", newWidth);
    svgClone.setAttribute("height", newHeight);
    svgClone.setAttribute("viewBox", `0 0 ${newWidth} ${newHeight}`);
    
    // Create white background first
    const backgroundRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    backgroundRect.setAttribute("x", "0");
    backgroundRect.setAttribute("y", "0");
    backgroundRect.setAttribute("width", newWidth);
    backgroundRect.setAttribute("height", newHeight);
    backgroundRect.setAttribute("fill", "white");
    backgroundRect.setAttribute("stroke", "none");
    
    // Create a group for the original content with proper positioning
    const contentGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    contentGroup.setAttribute("transform", `translate(${paddingLeft}, ${paddingTop})`);
    
    // Move all original children to the content group
    const originalChildren = Array.from(svgClone.children);
    originalChildren.forEach(child => {
      contentGroup.appendChild(child);
    });
    
    // Clear the clone and add elements in correct order
    svgClone.innerHTML = '';
    svgClone.appendChild(backgroundRect);
    svgClone.appendChild(contentGroup);
    
    // Add decorative elements
    const decorativeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Add separator line
    const separator = document.createElementNS("http://www.w3.org/2000/svg", "line");
    separator.setAttribute("x1", paddingLeft);
    separator.setAttribute("y1", newHeight - paddingBottom + 40);
    separator.setAttribute("x2", newWidth - paddingRight);
    separator.setAttribute("y2", newHeight - paddingBottom + 40);
    separator.setAttribute("stroke", "#e5e7eb");
    separator.setAttribute("stroke-width", "1");
    decorativeGroup.appendChild(separator);
    
    // Add title
    const titleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    titleText.setAttribute("x", newWidth / 2);
    titleText.setAttribute("y", newHeight - paddingBottom + 70);
    titleText.setAttribute("text-anchor", "middle");
    titleText.setAttribute("font-family", "Arial, sans-serif");
    titleText.setAttribute("font-size", "16px");
    titleText.setAttribute("font-weight", "bold");
    titleText.setAttribute("fill", "#374151");
    titleText.textContent = scenario?.name || 'Emission Projection Chart';
    decorativeGroup.appendChild(titleText);
    
    // Add subtitle with filters info
    const filterInfo = [];
    if (!selectedScopes.includes("All Scopes")) {
      filterInfo.push(`Scopes: ${selectedScopes.join(", ")}`);
    }
    if (!selectedCategories.includes("All Categories")) {
      filterInfo.push(`Categories: ${selectedCategories.join(", ")}`);
    }
    
    if (filterInfo.length > 0) {
      const subtitleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      subtitleText.setAttribute("x", newWidth / 2);
      subtitleText.setAttribute("y", newHeight - paddingBottom + 95);
      subtitleText.setAttribute("text-anchor", "middle");
      subtitleText.setAttribute("font-family", "Arial, sans-serif");
      subtitleText.setAttribute("font-size", "12px");
      subtitleText.setAttribute("fill", "#6b7280");
      subtitleText.textContent = filterInfo.join(" | ");
      decorativeGroup.appendChild(subtitleText);
    }
    
    // Add generation info
    const infoText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    infoText.setAttribute("x", newWidth / 2);
    infoText.setAttribute("y", newHeight - paddingBottom + (filterInfo.length > 0 ? 120 : 100));
    infoText.setAttribute("text-anchor", "middle");
    infoText.setAttribute("font-family", "Arial, sans-serif");
    infoText.setAttribute("font-size", "10px");
    infoText.setAttribute("fill", "#9ca3af");
    infoText.textContent = `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`;
    decorativeGroup.appendChild(infoText);
    
    // Add the decorative group to the SVG
    svgClone.appendChild(decorativeGroup);
    
    // Convert to string and create blob
    const svgString = new XMLSerializer().serializeToString(svgClone);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    
    // Create high-resolution canvas
    const canvas = document.createElement("canvas");
    const scale = Math.max(window.devicePixelRatio || 1, 2); // Minimum 2x for better quality
    canvas.width = newWidth * scale;
    canvas.height = newHeight * scale;
    
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);
    
    // Enable anti-aliasing for better quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    
    img.onload = () => {
      try {
        // Fill background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, newWidth, newHeight);
        
        // Draw the SVG
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        URL.revokeObjectURL(url);
        
        // Generate filename with timestamp
        const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, "-");
        const scenarioName = scenario?.name?.replace(/[^a-zA-Z0-9]/g, "-") || "scenario";
        const fileName = `${scenarioName}-chart-${timestamp}.png`;
        
        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (!blob) {
            console.error("Canvas to Blob conversion failed");
            alert("Failed to generate PNG. Please try again.");
            setIsDownloading(false);
            return;
          }
          
          const downloadUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = downloadUrl;
          a.download = fileName;
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(downloadUrl);
          
          setShowDownloadOptions(false);
          setIsDownloading(false);
          
          // Show success message
          console.log(`Chart downloaded successfully as ${fileName}`);
        }, "image/png", 0.95); // Slightly compress for smaller file size
        
      } catch (drawError) {
        console.error("Error drawing to canvas:", drawError);
        alert("Failed to create PNG from chart. Please try again.");
        URL.revokeObjectURL(url);
        setIsDownloading(false);
      }
    };
    
    img.onerror = (error) => {
      console.error("Error loading SVG for conversion:", error);
      alert("Failed to create PNG from chart. Please try again.");
      URL.revokeObjectURL(url);
      setIsDownloading(false);
    };
    
    // Set crossOrigin to handle any potential CORS issues
    img.crossOrigin = "anonymous";
    img.src = url;
    
  } catch (error) {
    console.error("Error creating PNG:", error);
    alert("Failed to download PNG. Please try again.");
    setIsDownloading(false);
  }
};

  // Handle scope selection with cascading reset
  const handleScopeSelection = (scope) => {
    if (scope === "All Scopes") {
      // Reset all dropdowns to "All X"
      setSelectedScopes(["All Scopes"]);
      setSelectedCategories(["All Categories"]);
      setSelectedSubCategories(["All Sub Categories"]);
      setSelectedActivities(["All Activities"]);
      setScopeDropdownOpen(false);
    } else if (selectedScopes.includes("All Scopes")) {
      // When switching from "All Scopes" to a specific scope
      // Reset all children to "All X"
      setSelectedScopes([scope]);
      setSelectedCategories(["All Categories"]);
      setSelectedSubCategories(["All Sub Categories"]);
      setSelectedActivities(["All Activities"]);
    } else if (selectedScopes.includes(scope)) {
      // If removing a scope
      const newSelectedScopes = selectedScopes.filter((s) => s !== scope);
      if (newSelectedScopes.length === 0) {
        // If no scopes left, reset everything to "All X"
        setSelectedScopes(["All Scopes"]);
        setSelectedCategories(["All Categories"]);
        setSelectedSubCategories(["All Sub Categories"]);
        setSelectedActivities(["All Activities"]);
      } else {
        // Just update scopes
        setSelectedScopes(newSelectedScopes);
      }
    } else {
      // Adding another scope
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

  // Handle category selection with cascading reset
  const handleCategorySelection = (category) => {
    if (isCategoryDropdownDisabled) return;

    if (category === "All Categories") {
      setSelectedCategories(["All Categories"]);
      setSelectedSubCategories(["All Sub Categories"]);
      setSelectedActivities(["All Activities"]);
      setCategoryDropdownOpen(false);
    } else if (selectedCategories.includes("All Categories")) {
      setSelectedCategories([category]);
      setSelectedSubCategories(["All Sub Categories"]);
      setSelectedActivities(["All Activities"]);
    } else if (selectedCategories.includes(category)) {
      const newSelectedCategories = selectedCategories.filter((c) => c !== category);
      if (newSelectedCategories.length === 0) {
        setSelectedCategories(["All Categories"]);
        setSelectedSubCategories(["All Sub Categories"]);
        setSelectedActivities(["All Activities"]);
      } else {
        setSelectedCategories(newSelectedCategories);
        setSelectedSubCategories(["All Sub Categories"]);
        setSelectedActivities(["All Activities"]);
      }
    } else {
      setSelectedCategories([...selectedCategories, category]);
      setSelectedSubCategories(["All Sub Categories"]);
      setSelectedActivities(["All Activities"]);
    }
  };

  // Handle subcategory selection with cascading reset
  const handleSubCategorySelection = (subCategory) => {
    if (isSubCategoryDropdownDisabled) return;

    if (subCategory === "All Sub Categories") {
      setSelectedSubCategories(["All Sub Categories"]);
      setSelectedActivities(["All Activities"]);
      setSubCategoryDropdownOpen(false);
    } else if (selectedSubCategories.includes("All Sub Categories")) {
      setSelectedSubCategories([subCategory]);
      setSelectedActivities(["All Activities"]);
    } else if (selectedSubCategories.includes(subCategory)) {
      const newSelectedSubCategories = selectedSubCategories.filter(
        (s) => s !== subCategory
      );
      if (newSelectedSubCategories.length === 0) {
        setSelectedSubCategories(["All Sub Categories"]);
        setSelectedActivities(["All Activities"]);
      } else {
        setSelectedSubCategories(newSelectedSubCategories);
        setSelectedActivities(["All Activities"]);
      }
    } else {
      setSelectedSubCategories([...selectedSubCategories, subCategory]);
      setSelectedActivities(["All Activities"]);
    }
  };

  // Handle activity selection
  const handleActivitySelection = (activity) => {
    if (isActivityDropdownDisabled) return;

    if (activity === "All Activities") {
      setSelectedActivities(["All Activities"]);
      setActivityDropdownOpen(false);
    } else if (selectedActivities.includes("All Activities")) {
      setSelectedActivities([activity]);
    } else if (selectedActivities.includes(activity)) {
      const newSelectedActivities = selectedActivities.filter(
        (a) => a !== activity
      );
      if (newSelectedActivities.length === 0) {
        setSelectedActivities(["All Activities"]);
      } else {
        setSelectedActivities(newSelectedActivities);
      }
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  // Handle target year input with validation
  const handleTargetYearInputChange = (e) => {
    const value = e.target.value;
    setExtendedTargetYearInput(value);

    if (targetYearTimeoutRef.current) {
      clearTimeout(targetYearTimeoutRef.current);
    }

    targetYearTimeoutRef.current = setTimeout(() => {
      validateAndUpdateTargetYear(value);
    }, 500);
  };

  // Validate and update the target year
  const validateAndUpdateTargetYear = (value) => {
    setTargetYearError(null);

    const numValue = parseInt(value, 10);

    if (isNaN(numValue)) {
      setTargetYearError("Please enter a valid year");
      return;
    }

    if (numValue < baseYear) {
      setTargetYearError(`Cannot be earlier than base year (${baseYear})`);
      return;
    }

    if (numValue > mainTargetYear) {
      setTargetYearError(
        `Cannot exceed scenario's target year (${mainTargetYear})`
      );
      return;
    }

    setExtendedTargetYear(numValue);
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
      if (
        subCategoryRef.current &&
        !subCategoryRef.current.contains(event.target)
      ) {
        setSubCategoryDropdownOpen(false);
      }
      if (activityRef.current && !activityRef.current.contains(event.target)) {
        setActivityDropdownOpen(false);
      }
      if (metricsRef.current && !metricsRef.current.contains(event.target)) {
        setIsMetricsDropdownOpen(false);
      }
      if (
        downloadButtonRef.current &&
        downloadOptionsRef.current &&
        !downloadButtonRef.current.contains(event.target) &&
        !downloadOptionsRef.current.contains(event.target)
      ) {
        setShowDownloadOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      if (targetYearTimeoutRef.current) {
        clearTimeout(targetYearTimeoutRef.current);
      }
    };
  }, []);

  // Fetch graph data when filters change
  useEffect(() => {
    if (!scenarioId) return;

    const filters = {};

    if (!selectedScopes.includes("All Scopes")) {
      filters.scope = selectedScopes;
    }

    if (!selectedCategories.includes("All Categories")) {
      filters.category = selectedCategories;
    }

    if (!selectedSubCategories.includes("All Sub Categories")) {
      filters.sub_category = selectedSubCategories;
    }

    if (!selectedActivities.includes("All Activities")) {
      filters.activity = selectedActivities;
    }

    filters.include_net_zero = includeNetZero;
    filters.target_year = extendedTargetYear;
    filters.main_target_year = mainTargetYear;

    filters.metrics = businessMetrics
      .filter((m) => m.selected)
      .map((m) => m.id)
      .join(",");

    dispatch(fetchScenarioGraphData({ scenarioId, filters }));
  }, [
    dispatch,
    scenarioId,
    selectedScopes,
    selectedCategories,
    selectedSubCategories,
    selectedActivities,
    includeNetZero,
    extendedTargetYear,
    businessMetrics,
  ]);

  // Helper function to extract business metrics from data
  const extractBusinessMetricsFromData = (graphData) => {
    if (!graphData) return [];

    const uniqueMetrics = new Set();

    const formatMetricName = (metric) => {
      return metric
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    if (graphData.totals) {
      Object.values(graphData.totals).forEach((yearData) => {
        Object.keys(yearData).forEach((key) => {
          if (
            [
              "fte",
              "area",
              "production_volume",
              "revenue",
              "employees",
            ].includes(key)
          ) {
            uniqueMetrics.add(key);
          }
        });
      });
    }

    if (graphData.yearly_data) {
      Object.values(graphData.yearly_data).forEach((activities) => {
        if (Array.isArray(activities)) {
          activities.forEach((activity) => {
            Object.keys(activity).forEach((key) => {
              if (
                [
                  "fte",
                  "area",
                  "production_volume",
                  "revenue",
                  "employees",
                ].includes(key)
              ) {
                uniqueMetrics.add(key);
              }
            });
          });
        }
      });
    }

    return Array.from(uniqueMetrics).map((metric) => ({
      id: metric,
      name: formatMetricName(metric),
      selected: false,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 min-h-screen">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Showing Result for:
      </h2>

      <div className="border border-gray-200 p-6 rounded-md mb-6">
        {/* Scopes and Categories Filters */}
        <div className="flex items-center justify-between w-full px-3 py-2 text-sm">
          {/* Scope Dropdown - Always use original complete options */}
          <div className="flex items-center" ref={scopeRef}>
            <span className="text-gray-600 font-medium mr-1">Scope:</span>
            <div className="relative">
              <button
                onClick={() => setScopeDropdownOpen(!isScopeDropdownOpen)}
                className="flex items-center text-gray-800 hover:text-gray-900 font-medium focus:outline-none"
              >
                <span className="max-w-[150px] truncate">
                  {selectedScopes.includes("All Scopes")
                    ? "All Scopes"
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
                        setSelectedScopes(["All Scopes"]);
                        setSelectedCategories(["All Categories"]);
                        setSelectedSubCategories(["All Sub Categories"]);
                        setSelectedActivities(["All Activities"]);
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

          {/* Category Dropdown - Use filtered or original options based on scope selection */}
         <div className="flex items-center" ref={categoryRef}>
           <span className="text-gray-600 font-medium mr-1">Category:</span>
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
                 {selectedCategories.includes("All Categories")
                   ? "All Categories"
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
               <div className="absolute top-full -left-[70px] mt-1 w-[300px] bg-white border border-gray-200 rounded shadow-md z-10">
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
                       setSelectedCategories(["All Categories"]);
                       setSelectedSubCategories(["All Sub Categories"]);
                       setSelectedActivities(["All Activities"]);
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

         {/* Sub Category Dropdown - Use filtered or original options based on category selection */}
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
                 {selectedSubCategories.includes("All Sub Categories")
                   ? "All Sub Categories"
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
               <div className="absolute top-full -left-[100px] mt-1 w-[300px] bg-white border border-gray-200 rounded shadow-md z-10">
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
                       setSelectedSubCategories(["All Sub Categories"]);
                       setSelectedActivities(["All Activities"]);
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

         {/* Activity Dropdown - Use filtered or original options based on sub-category selection */}
         <div className="flex items-center" ref={activityRef}>
           <span className="text-gray-600 font-medium mr-1">Activity:</span>
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
                 {selectedActivities.includes("All Activities")
                   ? "All Activities"
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
               <div className="absolute top-full right-0 mt-1 w-[300px] bg-white border border-gray-200 rounded shadow-md z-10">
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
                       <label className="ml-2 block text-sm text-gray-900">
                         {activity}
                       </label>
                     </div>
                   ))}
                 </div>
                 <div className="border-t border-gray-200 px-4 py-2">
                   <button
                     className="text-sm text-blue-600 hover:text-blue-800"
                     onClick={() => {
                       setSelectedActivities(["All Activities"]);
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

         <div className="flex flex-col items-start gap-1 ml-4">
           <div className="flex items-center gap-2">
             <label
               htmlFor="target-year"
               className="text-sm text-gray-700 whitespace-nowrap"
             >
               Enter Target Year:
             </label>
             <input
               id="target-year"
               type="number"
               min={baseYear}
               max={mainTargetYear}
               value={extendedTargetYearInput}
               onChange={handleTargetYearInputChange}
               onBlur={() => {
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
     </div>

     {/* Chart Section */}
     <div className="mb-6">
       <div className="flex justify-between items-center mb-4 pt-8">
         <h3 className="text-base font-bold text-gray-900 flex items-center">
           <span>
             Predicted Trend for chosen Business Metrics over Years for
             {selectedScopes.includes("All Scopes")
               ? " (All Scopes)"
               : ` (${selectedScopes.join(", ")})`}
           </span>
         </h3>
         <div className="relative" ref={downloadButtonRef}>
           <button
             onClick={handleDownloadResults}
             disabled={!graphData || loading || isDownloading}
             className={`inline-flex items-center px-3 py-2 border ${
               !graphData || loading || isDownloading
                 ? "border-gray-200 text-gray-400 cursor-not-allowed"
                 : "border-gray-300 shadow-sm text-gray-700 hover:bg-gray-50"
             } rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
           >
             {isDownloading ? "Preparing..." : "Download"}
             {!isDownloading && <FiDownload className="ml-2 h-4 w-4" />}
           </button>

           {showDownloadOptions && !loading && !isDownloading && graphData && (
             <div 
               ref={downloadOptionsRef}
               className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-md z-20"
             >
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

       <div className="px-4 py-8 relative emission-chart-container">
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
                 if (scenarioId) {
                   dispatch(
                     fetchScenarioGraphData({
                       scenarioId,
                       filters: {
                         scope: !selectedScopes.includes("All Scopes")
                           ? selectedScopes
                           : undefined,
                         category: !selectedCategories.includes(
                           "All Categories"
                         )
                           ? selectedCategories
                           : undefined,
                         sub_category: !selectedSubCategories.includes(
                           "All Sub Categories"
                         )
                           ? selectedSubCategories
                           : undefined,
                         activity: !selectedActivities.includes(
                           "All Activities"
                         )
                           ? selectedActivities
                           : undefined,
                         include_net_zero: includeNetZero,
                         target_year: extendedTargetYear,
                         main_target_year: mainTargetYear,
                         metrics: businessMetrics
                           .filter((m) => m.selected)
                           .map((m) => m.id)
                           .join(","),
                       },
                     })
                   );
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
               No graph data available. Please adjust your filter criteria or
               check if this scenario has emission data.
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
             selectedScope={
               selectedScopes.includes("All Scopes")
                 ? "scope1"
                 : selectedScopes[0]?.toLowerCase().replace(" ", "")
             }
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