import React, { useState, useEffect, useRef } from "react";
import { ResponsiveLine } from "@nivo/line";
import {
  FiChevronDown,
  FiInfo,
  FiPlus,
  FiTrash2,
  FiRefreshCw
} from "react-icons/fi";

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
  targetYear = 2038,
  activityName = "Agricultural byproducts - EPA - Energy - US - 2024 - biogenic_co2_combustion",
}) => {
  // State for expanded/collapsed view
  const [isExpanded, setIsExpanded] = useState(false);

  // State for including activity changes
  const [includeActivityChanges, setIncludeActivityChanges] = useState(false);

  // Generate years between base and target
  const years = [];
  for (let year = baseYear; year <= targetYear; year++) {
    years.push(year.toString());
  }

  // State for the selected activities per year
  const [selectedActivities, setSelectedActivities] = useState(() => {
    const initialSelections = {};
    years.forEach((year) => {
      initialSelections[year] = null;
    });
    return initialSelections;
  });

  // State for common activity selection
  const [commonActivity, setCommonActivity] = useState("");

  // Sample activity options for dropdown
  const activityOptions = [
    { id: "act1", name: "Agricultural byproducts - EPA - Energy - US - 2024 - biogenic_co2_combustion" },
    { id: "act2", name: "Rail freight - EPA - WeightOverDistance - GB - 2024 - fuel_combustion" },
    { id: "act3", name: "Motor vehicles/trailers - EXIOBASE - Money - RU - 2019 - unknown" },
    { id: "act4", name: "Bamboo - EPA - Energy - US - 2024 - biogenic_co2_combustion" },
  ];

  // Initial data structure for the graph
  const initialData = [];
  years.forEach((year) => {
    initialData.push({
      x: year,
      y: 0,
    });
  });

  // State for the growth data
  const [data, setData] = useState(initialData);

  // State for the absolute value in base year
  const [baseValue, setBaseValue] = useState("");

  // State for the y-axis range
  const [maxRange, setMaxRange] = useState(100);

  // Calculate dynamic width based on number of years
  const yearCount = years.length;
  const baseWidth = 1470; // Base width for 10 years
  const yearSpacing = 140; // Approximate spacing per year point
  const dynamicWidth = Math.max(baseWidth, yearCount * yearSpacing);

  // Apply common activity to all years
  const applyCommonActivity = (activityId) => {
    setCommonActivity(activityId);
    
    if (activityId) {
      const updatedActivities = {};
      years.forEach(year => {
        updatedActivities[year] = activityId;
      });
      setSelectedActivities(updatedActivities);
    }
  };

  // Function to handle activity selection for a specific year
  const handleActivityChange = (year, activityId) => {
    setSelectedActivities((prev) => ({
      ...prev,
      [year]: activityId,
    }));
    
    // If all years now have the same activity, update common activity state
    const allSame = Object.values(selectedActivities).every(val => val === activityId);
    if (allSame) {
      setCommonActivity(activityId);
    } else {
      setCommonActivity("");
    }
  };

  // Function to clear activity for a specific year
  const handleClearActivity = (year) => {
    setSelectedActivities((prev) => ({
      ...prev,
      [year]: null,
    }));
    // Clear common activity since they're no longer all the same
    setCommonActivity("");
  };

  // Reset all year-specific selections
  const handleResetActivities = () => {
    const emptySelections = {};
    years.forEach(year => {
      emptySelections[year] = null;
    });
    setSelectedActivities(emptySelections);
    setCommonActivity("");
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
      // Use a string to maintain the "negative intent" for future input
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

  // Format the chart data for Nivo
  const chartData = [
    {
      id: activityName,
      data: data,
    },
  ];

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

  // Toggle the expanded/collapsed state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Toggle include activity changes
  const toggleIncludeActivityChanges = () => {
    setIncludeActivityChanges(!includeActivityChanges);
  };
  
  // Get activity name from ID
  const getActivityName = (activityId) => {
    if (!activityId) return "";
    const activity = activityOptions.find(a => a.id === activityId);
    return activity ? activity.name : "";
  };

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
            {/* Toggle switch */}
            <label className="relative inline-flex items-center cursor-pointer mr-4">
              <input
                type="checkbox"
                checked={includeActivityChanges}
                onChange={toggleIncludeActivityChanges}
                className="sr-only peer"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
            <span className="font-medium">Include Activity Changes</span>
            <FiInfo className="ml-2 text-gray-400" />
          </div>

          {/* Expanded activity changes content */}
          {isExpanded && includeActivityChanges && (
            <div className="mb-6 px-4">
              {/* Common activity selector */}
              <div className="my-6 flex items-center">
                <div className="text-gray-600 mb-2 w-1/4">Select a common activity change for all the years:</div>
                <div className="relative w-3/4">
                  <select
                    value={commonActivity}
                    onChange={(e) => applyCommonActivity(e.target.value)}
                    className="w-full py-2 pl-3 pr-10 text-gray-700 bg-white borderb border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select activity...</option>
                    {activityOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
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
                  <div className="text-gray-600">Select activity change for years individually</div>
                  <button 
                    onClick={handleResetActivities}
                    className="text-blue-500 flex items-center text-sm"
                  >
                    <FiRefreshCw className="mr-1" /> Reset
                  </button>
                </div>

                {/* Year-by-year selectors - grid layout with no scrolling */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {years.map((year) => (
                    <div key={year} className="mb-4">
                      <div className="text-sm font-medium text-neutral-600 mb-1 pl-3">{year}</div>
                      <div className="relative">
                        <select
                          value={selectedActivities[year] || ""}
                          onChange={(e) => handleActivityChange(year, e.target.value)}
                          className="w-full py-2 pl-3 pr-10 text-sm border-b border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none text-neutral-500"
                        >
                          <option value="">Select activity...</option>
                          {activityOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <FiChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                        {selectedActivities[year] && (
                          <button
                            onClick={() => handleClearActivity(year)}
                            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-sm mb-4">
        For each year based on the emission projection, increase or decrease the percentage of the consumption activity         </div>

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
              Percentage change in consumption
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