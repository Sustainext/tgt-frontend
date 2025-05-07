import React, { useState, useEffect, useRef } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useDispatch } from "react-redux";
import {
  FiChevronDown,
  FiInfo,
  FiPlus,
  FiTrash2,
  FiRefreshCw,
  FiChevronUp,
} from "react-icons/fi";
import useActivityChanges from "../../../lib/redux/customHooks/useActivityChanges";
import { fetchClimatiqActivities } from "../../utils/climatiqApi";


// Add CSS for the scrollable-content class to hide scrollbars if needed
const scrollableContentStyle = `
.scrollable-content {
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}
.scrollable-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}
`;

const ActivitiesGraph = ({
  baseYear = 2025,
  targetYear = 2030,
  activityName = "Agricultural byproducts - EPA - Energy - US - 2024 - biogenic_co2_combustion",
  activityId = "",
  factorId = "",
  activity = {},
  scenarioId = null,
  onActivityChange = () => {},
  saveToAPI = false,
}) => {
  const dispatch = useDispatch();
  // Using useRef to track whether we're in an update cycle to prevent infinite loops
  const isUpdating = useRef(false);
  const initialRender = useRef(true);
  
  console.log("[ActivitiesGraph] Rendering with activity:", 
    activity?.activity_change ? "activity_change: true" : "activity_change: false"
  );
  
  // Make sure we're using the fixed hook
  const { handleActivityGraphChange } = useActivityChanges();

  // Initial activity options for bootstrapping (will be replaced with API data)
  const initialActivityOptions = [

  ];

  // State for activity options
  const [activityOptions, setActivityOptions] = useState(initialActivityOptions);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);
  const [activityError, setActivityError] = useState(null);

  // State for expanded/collapsed view - default to expanded when activity_change is already enabled
  const [isExpanded, setIsExpanded] = useState(
    activity?.activity_change ? true : false
  );

  // State for including activity changes - initialize based on activity_change or percentage_change
  const [includeActivityChanges, setIncludeActivityChanges] = useState(
    activity?.activity_change ? true : false
  );
  
  // Generate years between base and target (fixed to convert to numbers first)
  const years = React.useMemo(() => {
    const baseYearNum = parseInt(baseYear);
    const targetYearNum = parseInt(targetYear);
    const yearArray = [];
    
    // Ensure we always generate years from baseYear to targetYear inclusive
    for (let year = baseYearNum; year <= targetYearNum; year++) {
      yearArray.push(year.toString());
    }
    return yearArray;
  }, [baseYear, targetYear]);

  // State for the selected activities per year
  const [selectedActivities, setSelectedActivities] = useState(() => {
    // Initialize from existing changes_in_activity if available
    if (activity?.changes_in_activity) {
      console.log("[ActivitiesGraph] Initializing with existing changes_in_activity");
      const initialSelections = {};
      years.forEach((year) => {
        if (activity.changes_in_activity[year]) {
          // Store the ID that matches our selection dropdown (the option.id value)
          // We need to match this with how we're setting the dropdown value
          const activityData = activity.changes_in_activity[year];
          // Look for an option that matches this activity_id
          const matchingOption = initialActivityOptions.find(
            (opt) =>
              opt.activity_id === activityData.activity_id ||
              opt.id === activityData.activity_id
          );

          // If we find a matching option, use its id (which is what the dropdown uses)
          initialSelections[year] = matchingOption ? matchingOption.id : null;
        } else {
          initialSelections[year] = null;
        }
      });
      return initialSelections;
    } else {
      console.log("[ActivitiesGraph] No existing changes_in_activity, using empty selection");
      // Default initialization if no existing data
      const initialSelections = {};
      years.forEach((year) => {
        initialSelections[year] = null;
      });
      return initialSelections;
    }
  });

  // State for common activity selection
  const [commonActivity, setCommonActivity] = useState("");

  // Initialize data structure for the graph with values from existing activity_change or percentage_change
  const [data, setData] = useState(() => {
    const initialData = [];
    years.forEach((year) => {
      // Get values from activity_change or percentage_change (for backward compatibility)
      const existingValue =
          activity?.percentage_change?.[year] !== undefined
          ? activity.percentage_change[year]
          : 0;

      initialData.push({
        x: year,
        y: existingValue,
      });
    });
    console.log("[ActivitiesGraph] Initialized data from activity_change/percentage_change:", initialData);
    return initialData;
  });

  // State for the absolute value in base year
  const [baseValue, setBaseValue] = useState("");

  // State for the y-axis range
  const [maxRange, setMaxRange] = useState(100);

  // Calculate dynamic width based on number of years
  const yearCount = years.length;
  const baseWidth = 1470; // Base width for 10 years
  const yearSpacing = 140; // Approximate spacing per year point
  const dynamicWidth = Math.max(baseWidth, yearCount * yearSpacing);

  // Update the activity change state and notify parent
  const updateActivityChange = (updatedData, updatedActivityChanges) => {
    if (isUpdating.current) {
      console.log("[ActivitiesGraph] Skipping updateActivityChange due to active update");
      return;
    }
    
    console.log("[ActivitiesGraph] updateActivityChange called", 
      "includeActivityChanges:", includeActivityChanges);
    
    // Generate the change data object based on current graph data
    const newChangeData = Object.fromEntries(updatedData.map((point) => [point.x, point.y]));
        
    console.log("[ActivitiesGraph] New percentage change value:", newChangeData);
  
    // Create the update object with all required fields
    const changes = {
      // Set activity_change to the current toggle state
      activity_change: includeActivityChanges,
      // Always include percentage_change data
      percentage_change: newChangeData,
      // Include changes_in_activity if provided
      changes_in_activity: updatedActivityChanges || {},
    };
  
    // Log payload for debugging
    console.log("[ActivitiesGraph] Update payload:", changes);
    
    // Update the parent component with new data (for local state updates)
    onActivityChange(changes);
  
    // If we have an activityId and saveToAPI is true, update the Redux store and optionally API
    if (activityId) {
      console.log("[ActivitiesGraph] Calling handleActivityGraphChange with activityId:", activityId);
      handleActivityGraphChange(activityId, changes, saveToAPI, scenarioId);
    }
  };

  // Apply common activity to all years
  const applyCommonActivity = (activityId) => {
    console.log("[ActivitiesGraph] applyCommonActivity called with:", activityId);
    setCommonActivity(activityId);

    if (activityId) {
      const updatedActivities = {};
      const selectedOption = activityOptions.find(
        (opt) => opt.id === activityId
      );

      if (selectedOption) {
        // Create changes_in_activity structure for all years
        const changes = {};
        years.forEach((year) => {
          updatedActivities[year] = activityId;
          changes[year] = {
            // Use the activity_id field from selectedOption
            activity_id: selectedOption.activity_id || selectedOption.id,
            activity_name: selectedOption.name,
            // Use the factor_id field from selectedOption
            factor_id:
              selectedOption.factor_id ||
              selectedOption.factorId ||
              "default-factor-id",
          };
        });

        setSelectedActivities(updatedActivities);
        updateActivityChange(data, changes);
      }
    }
  };

  // Function to handle activity selection for a specific year
  const handleActivityChange = (year, activityId) => {
    console.log("[ActivitiesGraph] handleActivityChange called for year:", year);
    const updatedActivities = {
      ...selectedActivities,
      [year]: activityId,
    };

    setSelectedActivities(updatedActivities);

    // Create or update the changes_in_activity object
    const changesInActivity = { ...(activity?.changes_in_activity || {}) };

    if (activityId) {
      const selectedOption = activityOptions.find(
        (opt) => opt.id === activityId
      );
      if (selectedOption) {
        changesInActivity[year] = {
          // Use the activity_id field from the selectedOption
          activity_id: selectedOption.activity_id || selectedOption.id,
          activity_name: selectedOption.name,
          // Use the factor_id field from the selectedOption
          factor_id:
            selectedOption.factor_id ||
            selectedOption.factorId ||
            "default-factor-id",
        };
      }
    } else {
      // If no activity selected, remove the entry
      delete changesInActivity[year];
    }

    // Check if all years now have the same activity
    const allSame =
      Object.values(updatedActivities).every((val) => val === activityId) &&
      Object.values(updatedActivities).every((val) => val !== null);
    if (allSame) {
      setCommonActivity(activityId);
    } else {
      setCommonActivity("");
    }

    // Update the parent component
    updateActivityChange(data, changesInActivity);
  };

  // Function to clear activity for a specific year
  const handleClearActivity = (year) => {
    console.log("[ActivitiesGraph] handleClearActivity called for year:", year);
    const updatedActivities = {
      ...selectedActivities,
      [year]: null,
    };

    setSelectedActivities(updatedActivities);

    // Create or update the changes_in_activity object
    const changesInActivity = { ...(activity?.changes_in_activity || {}) };

    // Remove the entry for this year
    delete changesInActivity[year];

    // Clear common activity since they're no longer all the same
    setCommonActivity("");

    // Update the parent component
    updateActivityChange(data, changesInActivity);
  };

  // Reset all year-specific selections
  const handleResetActivities = () => {
    console.log("[ActivitiesGraph] handleResetActivities called");
    const emptySelections = {};
    years.forEach((year) => {
      emptySelections[year] = null;
    });
    setSelectedActivities(emptySelections);
    setCommonActivity("");

    // Update the parent component with empty changes_in_activity
    updateActivityChange(data, {});
  };

  // Function to auto-adjust range based on values
  const autoAdjustRange = (value) => {
    if (Math.abs(value) > maxRange) {
      if (maxRange === 100) {
        setMaxRange(200);
      } else if (maxRange === 200) {
        setMaxRange(500);
      } else if (maxRange === 500) {
        setMaxRange(1000);
      } else if (maxRange === 1000) {
        setMaxRange(2000);
      }
      return true;
    }
    return false;
  };

  // Function to handle percentage input
  const handlePercentageChange = (index, value) => {
    // Handle special case: if user is just typing a minus sign
    if (value === "-") {
      const newData = [...data];
      // Store the negative sign as a special flag in the data
      newData[index] = { ...newData[index], y: "-" };
      setData(newData);
      return;
    }

    // Check if we have a negative sign stored
    const isNegativeIntent = data[index].y === "-";

    // Strip non-numeric characters except the leading minus
    let processedValue = value.replace(/[^0-9\-+]/g, "");

    // If there's a negative intent and user is now typing numbers
    if (isNegativeIntent && /^\d+$/.test(processedValue)) {
      // Apply the stored negative sign
      processedValue = "-" + processedValue;
    }

    // Parse the value as an integer
    let numValue = parseInt(processedValue, 10);

    // Check if the value is valid
    if (isNaN(numValue)) {
      return; // Keep the current value if invalid
    }

    // Apply constraints based on current max range
    numValue = Math.min(numValue, maxRange);
    numValue = Math.max(numValue, -maxRange);

    // Update the data
    const newData = [...data];
    newData[index] = { ...newData[index], y: numValue };
    setData(newData);

    // Check if range needs to be adjusted
    autoAdjustRange(numValue);

    // Update the parent component
    updateActivityChange(newData, activity?.changes_in_activity);
  };

  // Function to handle point drag
  const handlePointDrag = (pointIndex, event) => {
    const year = years[pointIndex];

    // Capture initial mouse position and point value
    const initialY = event.clientY;
    const initialValue = data[pointIndex].y;

    // Flag to track if we're dragging
    let isDragging = true;

    // Handlers for smooth dragging
    const handleMouseMove = (moveEvent) => {
      if (!isDragging) return;

      // Calculate delta from starting position
      const deltaY = initialY - moveEvent.clientY;

      // More responsive sensitivity factor
      const chartContainer = event.target.closest("svg").parentElement;
      const sensitivity =
        (maxRange * 2) / (chartContainer.getBoundingClientRect().height / 5);
      const valueChange = deltaY * sensitivity;

      // Calculate new value with smoothing
      const newValue = Math.round(initialValue + valueChange);

      // Check if we need to auto-adjust range
      const rangeAdjusted = autoAdjustRange(newValue);

      // Apply constraints based on current max range
      const constrainedValue = rangeAdjusted
        ? newValue
        : Math.max(Math.min(newValue, maxRange), -maxRange);

      // Update state
      const updatedData = [...data];
      updatedData[pointIndex] = {
        ...updatedData[pointIndex],
        y: constrainedValue,
      };
      setData(updatedData);

      // Update the parent component
      updateActivityChange(updatedData, activity?.changes_in_activity);
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add global event listeners for dragging beyond the element
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Prevent default behaviors
    event.preventDefault();
    event.stopPropagation();
  };

  const handleToggleChange = (e) => {
    console.log('[ActivitiesGraph] Toggle checkbox clicked, new value:', e.target.checked);
    
    // Set the isUpdating flag to prevent effects from triggering additional updates
    isUpdating.current = true;
    
    try {
      const newValue = e.target.checked;
      setIncludeActivityChanges(newValue);
      
      // When enabling, always expand the section
      if (newValue) {
        setIsExpanded(true);
      }
      
      // Create change data from the current data
      const newChangeData = Object.fromEntries(data.map((point) => [point.x, point.y]));
      
      // Create the complete changes object with all required fields
      const changes = {
        activity_change: newValue, // Use the new value directly
        percentage_change: newChangeData,
        changes_in_activity: activity?.changes_in_activity || {}
      };
      
      console.log('[ActivitiesGraph] Sending toggle update with changes:', changes);
      
      // Update parent component and Redux directly in the handler
      onActivityChange(changes);
      
      if (activityId) {
        handleActivityGraphChange(activityId, changes, saveToAPI, scenarioId);
      }
    } finally {
      // Clear the updating flag to allow future updates
      isUpdating.current = false;
    }
  };

  // Toggle the expanded/collapsed state
  const toggleExpanded = () => {
    // If activity changes are enabled, don't allow collapse
    if (includeActivityChanges) {
      // Keep it expanded
      setIsExpanded(true);
    } else {
      // Normal toggle behavior when activity changes are disabled
      setIsExpanded(!isExpanded);
    }
  };

  // Get activity name from ID
  const getActivityName = (activityId) => {
    if (!activityId) return "";
    const activity = activityOptions.find((a) => a.id === activityId);
    return activity ? activity.name : "";
  };

  // Fetch activity options when needed
  useEffect(() => {
    const fetchActivities = async () => {
      // Only fetch activities if toggle is enabled and we don't have options yet
      if (includeActivityChanges) {
        try {
          console.log("[ActivitiesGraph] Fetching activity options");
          setIsLoadingActivities(true);
          setActivityError(null);

          // Extract subcategory from the activity
          const subcategory =
            activity?.sub_category || activity?.subCategory || "";
          const unitType = activity?.unit_type || "";
          const region = activity?.region || "*";

          // Call the fetch function with the appropriate parameters
          const response = await fetchClimatiqActivities({
            subcategory,
            unit_type: unitType,
            region,
            year: baseYear.toString(),
            page: 1,
          });

          // Transform the API response into activity options
          const options = response.results.map((item) => ({
            id: item.id,
            activity_id: item.activity_id,
            name: item.name || item.activity_name,
            factorId: item.id || item.factor_id,
            source: item.source || "",
            unit_type: item.unit_type || "",
            region: item.region || "",
            year: item.year || "",
            source_lca_activity: item.source_lca_activity || "",
          }));

          console.log("[ActivitiesGraph] Fetched options:", options.length);
          const filteredOptions = options.filter(item=>item.unit_type===activity.unit_type)
          setActivityOptions([...initialActivityOptions, ...filteredOptions]);
        } catch (error) {
          console.error("Error fetching activity options:", error);
          setActivityError(
            "Failed to load activity options. Please try again."
          );

          // Fallback options in case of error
          setActivityOptions([...initialActivityOptions]);
        } finally {
          setIsLoadingActivities(false);
        }
      }
    };

    fetchActivities();
  }, [includeActivityChanges, activity, baseYear]);

  // Update data state when years change to ensure all years are represented
  useEffect(() => {
    // Skip if we're in the middle of another update
    if (isUpdating.current) return;
    
    console.log("[ActivitiesGraph] Years changed, updating data structure");
    
    // Set updating flag to prevent infinite loops
    isUpdating.current = true;
    
    try {
      // Create a new data array with entries for each year
      const updatedData = [];
      
      // For each year in our current years array
      years.forEach((year) => {
        // Try to find existing data point for this year
        const existingPoint = data.find(point => point.x === year);
        
        if (existingPoint) {
          // If we have data for this year, use it
          updatedData.push(existingPoint);
        } else {
          // Otherwise create a new data point with default value
          updatedData.push({
            x: year,
            y: 0
          });
        }
      });
      
      // Update the data state with our new array
      setData(updatedData);
      
      // Also update selectedActivities to include all years
      setSelectedActivities((prev) => {
        const updatedSelections = {...prev};
        
        // Ensure each year has an entry (null if not previously set)
        years.forEach((year) => {
          if (updatedSelections[year] === undefined) {
            updatedSelections[year] = null;
          }
        });
        
        return updatedSelections;
      });
    } finally {
      // Clear the updating flag
      isUpdating.current = false;
    }
  }, [years]);

  // Refs for scroll synchronization
  const chartScrollRef = useRef(null);
  const percentageScrollRef = useRef(null);

  // Setup scroll synchronization
  useEffect(() => {
    const chartContainer = chartScrollRef.current;
    const percentageContainer = percentageScrollRef.current;

    if (!chartContainer || !percentageContainer) return;

    // Function to sync scrolling
    const syncScroll = (sourceRef, targetRef) => {
      const handler = () => {
        targetRef.scrollLeft = sourceRef.scrollLeft;
      };
      sourceRef.addEventListener("scroll", handler);
      return () => sourceRef.removeEventListener("scroll", handler);
    };

    // Set up bidirectional scroll syncing
    const cleanup1 = syncScroll(chartContainer, percentageContainer);
    const cleanup2 = syncScroll(percentageContainer, chartContainer);

    return () => {
      cleanup1();
      cleanup2();
    };
  }, [isExpanded, includeActivityChanges]);

  // Listen for changes to the activity prop to update the local state
  useEffect(() => {
    // Skip this effect during updates initiated by this component
    if (isUpdating.current) {
      console.log("[ActivitiesGraph] Skipping activity update effect due to active update");
      return;
    }
    
    // Skip the first render to avoid double-initialization
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    
    if (!activity) return;
    
    console.log("[ActivitiesGraph] Activity prop changed, updating component state");
    console.log("[ActivitiesGraph] New activity has activity_change:", 
      activity.activity_change ? "true" : "false");
    
    // Set the updating flag to prevent infinite loops
    isUpdating.current = true;
    
    try {
      // Update includeActivityChanges state based on activity_change or percentage_change
      // (for backward compatibility)
      const hasActivityChanges = Boolean(activity.activity_change);
      setIncludeActivityChanges(hasActivityChanges);
      
      // Auto expand if activity changes are already enabled
      if (hasActivityChanges) {
        setIsExpanded(true);
      }
      
      // Update selectedActivities state when we have activityOptions available
      if (activity.changes_in_activity && activityOptions.length > 0) {
        console.log("[ActivitiesGraph] Updating selectedActivities from changes_in_activity");
        const updatedSelections = {};

        years.forEach((year) => {
          if (activity.changes_in_activity[year]) {
            const activityData = activity.changes_in_activity[year];

            // Find the matching option in our dropdown options
            const matchingOption = activityOptions.find(
              (opt) =>
                opt.activity_id === activityData.activity_id ||
                opt.id === activityData.activity_id
            );

            // Store the option.id which is what our dropdown uses for value
            updatedSelections[year] = matchingOption ? matchingOption.id : null;
          } else {
            updatedSelections[year] = null;
          }
        });

        setSelectedActivities(updatedSelections);

        // Check if all selections are the same to update commonActivity
        const uniqueValues = [
          ...new Set(Object.values(updatedSelections).filter(Boolean)),
        ];
        if (uniqueValues.length === 1 && uniqueValues[0]) {
          setCommonActivity(uniqueValues[0]);
        } else {
          setCommonActivity("");
        }
      }

      // Update data state - use activity_change or percentage_change (for backward compatibility)
      console.log("[ActivitiesGraph] Updating chart data from activity_change/percentage_change");
      const updatedData = [];
      years.forEach((year) => {
        // Try to get the value from activity_change or percentage_change
        const existingValue = activity?.percentage_change?.[year] !== undefined
          ? activity.percentage_change[year]
          : 0;

        updatedData.push({
          x: year,
          y: existingValue,
        });
      });
      setData(updatedData);
    } finally {
      // Clear the updating flag
      isUpdating.current = false;
    }
  }, [activity, activityOptions, years]);

  // Format the chart data for Nivo
  const chartData = [
    {
      id: activityName,
      data: data,
    },
  ];

  return (
    <div className="bg-white rounded-lg overflow-hidden mb-6">
      {/* Add the style for scrollable-content */}
      <style>{scrollableContentStyle}</style>

      {/* Main component container */}
      <div className="mb-4">
        {/* Activity changes section - togglable */}
        <div className="p-4 border border-gray-300 rounded-md mb-6">
          <div
            className="flex items-center cursor-pointer mb-4"
            onClick={toggleExpanded}
          >
            {/* Toggle switch - FIXED to use handleToggleChange */}
            <label className="relative inline-flex items-center cursor-pointer mr-4">
              <input
                type="checkbox"
                checked={includeActivityChanges}
                onChange={handleToggleChange}
                className="sr-only peer"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
            <span className="font-medium">Include Activity Changes</span>
            <FiInfo className="ml-2 text-gray-400" />

            {/* Only show collapse/expand button if activity changes are disabled */}
            {!includeActivityChanges && (
              <button className="ml-auto text-gray-500">
                {isExpanded ? (
                  <FiChevronUp size={20} />
                ) : (
                  <FiChevronDown size={20} />
                )}
              </button>
            )}
          </div>

          {/* Expanded activity changes content - always visible when includeActivityChanges is true */}
          {isExpanded && includeActivityChanges && (
            <div className="mb-6 px-4">
              {/* Common activity selector */}
              <div className="my-6 flex items-center">
                <div className="text-gray-600 mb-2 w-1/4">
                  Select a common activity change for all the years:
                </div>
                <div className="relative w-3/4">
                  <select
                    value={commonActivity}
                    onChange={(e) => applyCommonActivity(e.target.value)}
                    className="w-full py-2 pl-3 pr-10 text-gray-700 bg-white border-b border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select activity...</option>
                    {activityOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                        {option.source && ` - (${option.source})`}
                        {option.unit_type && ` - ${option.unit_type}`}
                        {option.region && ` - ${option.region}`}
                        {option.year && ` - ${option.year}`}
                        {option.source_lca_activity && ` - ${option.source_lca_activity}`}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <FiChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Individual year activity selectors */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-gray-600">
                    Select activity change for years individually
                  </div>
                  <button
                    onClick={handleResetActivities}
                    className="text-blue-500 flex items-center text-sm"
                  >
                    <FiRefreshCw className="mr-1" /> Reset
                  </button>
                </div>

                {/* Year-by-year selectors - grid layout with no scrolling */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {years.map((year) => {
                    // Get the currently selected activity ID for this year
                    const selectedActivityId = selectedActivities[year] || "";

                    return (
                      <div key={year} className="mb-4">
                        <div className="text-sm font-medium text-neutral-600 mb-1 pl-3">
                          {year}
                        </div>
                        <div className="relative">
                          <select
                            value={selectedActivityId}
                            onChange={(e) =>
                              handleActivityChange(year, e.target.value)
                            }
                            className="w-full py-2 pl-3 pr-10 text-sm border-b border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none text-neutral-500"
                          >
                            <option value="">Select activity...</option>
                            {activityOptions.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                                {option.source && ` - (${option.source || "N/A"})`}
                                {option.unit_type && ` - ${option.unit_type || "N/A"}`}
                                {option.region && ` - ${option.region || "N/A"}`}
                                {option.year && ` - ${option.year || "N/A"}`}
                                {option.source_lca_activity && ` - ${option.source_lca_activity || "N/A"}`}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <FiChevronDown className="w-4 h-4 text-gray-400" />
                          </div>
                          {selectedActivityId && (
                            <button
                              onClick={() => handleClearActivity(year)}
                              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              <FiTrash2 className="w-4 h-4 hover:text-red-600" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-sm mb-4">
          For each year based on the emission projection, increase or decrease
          the percentage of the consumption activity
        </div>

        {/* Chart - Contained in the scrollable-content wrapper */}
        <div
          ref={chartScrollRef}
          className="h-80 pl-12 pr-4 scrollable-content border border-gray-100 rounded-md"
        >
          <div style={{ width: `${dynamicWidth}px`, height: "100%" }}>
            <ResponsiveLine
              data={chartData}
              margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
              xScale={{
                type: "point",
                padding: 0.5,
              }}
              yScale={{
                type: "linear",
                min: -maxRange,
                max: maxRange,
                stacked: false,
                reverse: false,
              }}
              curve="monotoneX"
              axisBottom={{
                enabled: false,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 20,
                tickRotation: 0,
                legend: "Growth (%)",
                legendOffset: -105,
                legendPosition: "middle",
                format: (value) => `${value > 0 ? "+" : ""}${value}%`,
              }}
              enableGridX={false}
              colors={["#3182CE"]}
              pointSize={10}
              pointColor="#ffffff"
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={false}
              enableArea={true}
              areaOpacity={0.1}
              lineWidth={3}
              tooltip={({ point }) => (
                <div className="bg-white shadow-lg p-2 rounded border border-gray-200">
                  <div className="font-medium text-gray-700">
                    {point.data.x}
                  </div>
                  <div className="text-blue-600 font-bold">
                    {point.data.y > 0 ? "+" : ""}
                    {point.data.y}%
                  </div>
                  <div className="text-gray-500 text-xs">
                    Value:{" "}
                    {baseValue
                      ? Math.round(
                          (Number(baseValue) * (100 + point.data.y)) / 100
                        )
                      : "-"}
                  </div>
                  <div className="text-xs italic text-gray-500">
                    Click and drag to adjust
                  </div>
                </div>
              )}
              markers={[
                {
                  axis: "y",
                  value: 0,
                  lineStyle: {
                    stroke: "#888",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  },
                  legend: "",
                  legendOrientation: "horizontal",
                },
              ]}
              // Custom layers for interactive points
              layers={[
                "grid",
                "markers",
                "axes",
                "areas",
                "lines",
                "crosshair",
                ({ points, ...rest }) => (
                  <g>
                    <defs>
                      <filter
                        id="circleShadow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feDropShadow
                          dx="0"
                          dy="2"
                          stdDeviation="3"
                          floodColor="rgba(0, 0, 0, 0.3)"
                        />
                      </filter>
                    </defs>

                    {points.map((point, index) => (
                      <g
                        key={point.id}
                        transform={`translate(${point.x},${point.y})`}
                        onMouseDown={(e) => handlePointDrag(index, e)}
                        style={{ cursor: "pointer" }}
                      >
                        {/* Larger hit area */}
                        <circle
                          r={20}
                          fill="rgba(255,255,255,0.01)"
                          stroke="transparent"
                          strokeWidth={0}
                        />

                        {/* Visual indicator line */}
                        <line
                          x1={0}
                          y1={-20}
                          x2={0}
                          y2={20}
                          stroke={point.data.y >= 0 ? "#3182CE" : "#E53E3E"}
                          strokeWidth={1}
                          strokeDasharray="2,2"
                          strokeOpacity={0.5}
                          pointerEvents="none"
                        />

                        {/* Visible point */}
                        <circle
                          r={8}
                          fill="white"
                          stroke={point.data.y >= 0 ? "#3182CE" : "#E53E3E"}
                          strokeWidth={0.2}
                          pointerEvents="none"
                          filter="url(#circleShadow)"
                        />

                        {/* Value label */}
                        <text
                          y={point.data.y >= 0 ? -15 : 20}
                          textAnchor="middle"
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            fill: point.data.y >= 0 ? "#3182CE" : "#E53E3E",
                            pointerEvents: "none",
                          }}
                        >
                          {point.data.y > 0 ? "+" : ""}
                          {point.data.y}%
                        </text>
                      </g>
                    ))}
                  </g>
                ),
              ]}
            />
          </div>
        </div>

        {/* Percentage change in consumption */}
        <div
          ref={percentageScrollRef}
          className="mb-6 mt-1 ml-2 pl-6 relative overflow-x-auto scrollable-content"
        >
          <div className="flex justify-between items-center">
            <div className="flex-none w-12 text-[11px] font-medium text-gray-500 relative -left-6">
              Percentage change
            </div>
            <div className="flex-1">
              <div
                className="flex justify-between"
                style={{ width: `${dynamicWidth - 20}px` }}
              >
                {years.map((year, index) => (
                  <div
                    key={year}
                    className="flex flex-col items-center"
                    style={{ width: "60px" }}
                  >
                    <input
                      type="text"
                      value={
                        // Special handling for negative intent
                        data[index].y === "-"
                          ? "-"
                          : data[index].y > 0
                          ? `+${data[index].y}%`
                          : `${data[index].y}%`
                      }
                      onFocus={(e) => {
                        e.target.select();
                      }}
                      className="w-16 text-center border-b border-gray-300 rounded py-1 text-[11px] focus:outline-none focus:border-blue-500"
                      onChange={(e) => {
                        // Pass the raw value to our handler function
                        const rawValue = e.target.value.replace("%", "");
                        handlePercentageChange(index, rawValue);
                      }}
                      onBlur={(e) => {
                        // On blur, ensure we don't leave a bare minus sign
                        if (data[index].y === "-") {
                          const newData = [...data];
                          newData[index] = { ...newData[index], y: 0 };
                          setData(newData);
                          updateActivityChange(
                            newData,
                            activity?.changes_in_activity
                          );
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesGraph;