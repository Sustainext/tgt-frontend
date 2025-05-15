import React, { useState, useEffect, useRef } from "react";
import { ResponsiveLine } from "@nivo/line";
import { FiCalendar, FiMinus, FiPlus, FiInfo } from "react-icons/fi";

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

const MetricsGraph = ({
  baseYear = 2025,
  targetYear = 2045,
  metricName = "FTE",
  initialMaxRange = 100,
  allowNegative = true,
  minNegativeValue = null,
  rangeSteps = [100, 200, 500, 1000, 2000, 5000],
  // Added props for syncing with Redux
  metricData = {},
  onPercentageChange = () => {},
  onBaseValueChange = () => {},
  disabled = false,
}) => {
  // Generate years between base and target
  const years = [];
  for (let year = baseYear + 1; year <= targetYear; year++) {
    years.push(year.toString());
  }

  // Initialize data structure with values from metricData if available
  const initializeData = () => {
    const initialData = [];

    years.forEach((year) => {
      const percentageChange = metricData.percentage_change
        ? metricData.percentage_change[year] || 0
        : 0;

      initialData.push({
        x: year,
        y: percentageChange,
      });
    });

    return initialData;
  };

  // Calculate dynamic width based on number of years
  const yearCount = years.length;
  const baseWidth = 1470; // Base width for 10 years
  const yearSpacing = 140; // Approximate spacing per year point
  const dynamicWidth = Math.max(baseWidth, yearCount * yearSpacing);

  // Container width calculation - will be the visible container width
  const [containerWidth, setContainerWidth] = useState(0);

  // State for the growth data
  const [data, setData] = useState(initializeData);

  // State for the absolute value in base year
  const [baseValue, setBaseValue] = useState(metricData.abs_value || "");

  // State for validation errors - don't show errors initially
  const [baseValueError, setBaseValueError] = useState(false);

  // State for displaying validation error when trying to drag without baseValue
  const [showDragError, setShowDragError] = useState(false);

  // State to track if user has interacted with the component
  const [hasInteracted, setHasInteracted] = useState(false);

  const [maxRange, setMaxRange] = useState(initialMaxRange);

  // Update data when metricData changes (from Redux)
  useEffect(() => {
    // Update base value if it exists in metricData
    if (metricData.abs_value !== undefined) {
      setBaseValue(metricData.abs_value);
      // Clear error if value is valid, but only if user has interacted
      if (hasInteracted && metricData.abs_value !== "" && !isNaN(metricData.abs_value) && parseFloat(metricData.abs_value) > 0) {
        setBaseValueError(false);
      }
    }

    // Update percentage changes if they exist
    if (metricData.percentage_change) {
      const newData = [...data];
      years.forEach((year, index) => {
        const percentageChange = metricData.percentage_change[year];
        if (percentageChange !== undefined) {
          newData[index] = {
            ...newData[index],
            y: percentageChange,
          };
        }
      });
      setData(newData);
    }
  }, [metricData, hasInteracted]);

  // Update container width on mount and resize
  useEffect(() => {
    const updateContainerWidth = () => {
      const container = document.querySelector(".scrollable-content");
      if (container) {
        setContainerWidth(container.clientWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  // Hide the drag error message after 3 seconds
  useEffect(() => {
    if (showDragError) {
      const timer = setTimeout(() => {
        setShowDragError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showDragError]);

  // Calculate effective min negative value - dynamic unless specified for certain metrics
  const getEffectiveMinNegative = () => {
    // For FTE, always keep it at -100 regardless of the positive range
    if (metricName === "fte") {
      return -100;
    }

    // For others, mirror the positive range (i.e., -maxRange) unless specifically provided
    return minNegativeValue !== null ? minNegativeValue : -maxRange;
  };

  // Function to auto-adjust range based on values
  const autoAdjustRange = (value) => {
    // If a value exceeds current range, bump up to the next range level
    if (Math.abs(value) > maxRange) {
      // Find the next appropriate range level
      const currentIndex = rangeSteps.indexOf(maxRange);
      if (currentIndex !== -1 && currentIndex < rangeSteps.length - 1) {
        // Get the next range step
        const nextRange = rangeSteps[currentIndex + 1];

        // Set the new max range
        setMaxRange(nextRange);

        return true;
      }
    }
    return false;
  };

  // Check if baseValue is valid for interactions
  const isBaseValueValid = () => {
    return baseValue !== "" && !isNaN(baseValue) && parseFloat(baseValue) > 0;
  };

  // Function to handle point drag
  const handlePointDrag = (pointIndex, event) => {
    // First check if dragging is allowed
    if (disabled) return;
    
    // Mark that user has interacted with the component
    setHasInteracted(true);
    
    // Validate baseValue before allowing drag
    if (!isBaseValueValid()) {
      setBaseValueError(true);
      setShowDragError(true);
      return;
    }

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
      const rangeAdjusted = autoAdjustRange(Math.abs(newValue));

      // Apply constraints based on current max range
      const upperConstrained = Math.min(newValue, maxRange);

      // Apply negative constraint based on allowNegative and getEffectiveMinNegative()
      let finalValue;
      if (!allowNegative) {
        finalValue = Math.max(upperConstrained, 0);
      } else {
        // Get the current effective min negative value
        const effectiveMin = getEffectiveMinNegative();

        // Apply the constraint - Important: Only restrict FTE values, let others go below -100%
        if (metricName === "fte") {
          finalValue = Math.max(upperConstrained, effectiveMin);
        } else {
          // For other metrics, adjust range but don't enforce the -100% limit
          // Instead, we'll just enforce the current negative range limit (which can auto-scale)
          finalValue = Math.max(upperConstrained, -maxRange);
        }
      }

      // Update state
      const updatedData = [...data];
      updatedData[pointIndex] = {
        ...updatedData[pointIndex],
        y: finalValue,
      };
      setData(updatedData);

      // Create complete object with both abs_value and percentage_change
      const updatedPercentageChanges = {};
      updatedData.forEach((item) => {
        updatedPercentageChanges[item.x] = item.y;
      });

      // Create complete data object for Redux
      const completeData = {
        abs_value: parseFloat(baseValue),
        percentage_change: updatedPercentageChanges,
      };

      // Update the parent via callback with complete data object
      onPercentageChange(completeData);
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
      id: metricName,
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
  }, []);

  // Function to handle percentage input
  const handlePercentageChange = (index, value) => {
    // First check if editing is allowed
    if (disabled) return;
    
    // Mark that user has interacted with the component
    setHasInteracted(true);
    
    // Validate baseValue before allowing changes
    if (!isBaseValueValid()) {
      setBaseValueError(true);
      setShowDragError(true);
      return;
    }

    // Handle special case: if user is just typing a minus sign
    if (value === "-" && allowNegative) {
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
    let processedValue = value.replace(/[^0-9\-]/g, "");

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

    // Apply constraints based on allowNegative, minNegativeValue, and maxRange
    numValue = Math.min(numValue, maxRange);

    if (!allowNegative) {
      numValue = Math.max(numValue, 0);
    } else {
      // Apply different constraints based on the metric type
      if (metricName === "fte") {
        // FTE is strictly limited to -100%
        numValue = Math.max(numValue, -100);
      } else {
        // Other metrics can go below -100%, but are constrained by the current maxRange
        numValue = Math.max(numValue, -maxRange);

        // Auto-adjust range if needed for large negative values
        if (numValue < -maxRange) {
          autoAdjustRange(Math.abs(numValue));
        }
      }
    }

    // Update the data
    const newData = [...data];
    newData[index] = { ...newData[index], y: numValue };
    setData(newData);

    // Check if range needs to be adjusted for positive values
    autoAdjustRange(Math.abs(numValue));

    // Create complete object with both abs_value and percentage_change
    const updatedPercentageChanges = {};
    newData.forEach((item) => {
      updatedPercentageChanges[item.x] = item.y;
    });

    // Create complete data object for Redux
    const completeData = {
      abs_value: parseFloat(baseValue),
      percentage_change: updatedPercentageChanges,
    };

    // Update the parent via callback with complete data object
    onPercentageChange(completeData);
  };

  // handleBaseValueChange
  const handleBaseValueChange = (e) => {
    if (disabled) return;
    
    // Mark that user has interacted with the component
    setHasInteracted(true);

    const inputValue = e.target.value;
    
    // Always update the input value for better UX
    setBaseValue(inputValue);
    
    // Parse the value - ensure it's a number
    const value = parseFloat(inputValue);

    // Validate input - check if it's a valid number and not empty and greater than zero
    const isValid = inputValue !== "" && !isNaN(value) && value > 0;
    
    // Update error state
    setBaseValueError(!isValid);

    // Only send update to parent if value is valid
    if (isValid) {
      // Create complete data object with current percentage changes
      const percentageChanges = {};
      data.forEach((item) => {
        percentageChanges[item.x] = item.y;
      });

      // Send complete data object to parent
      const completeData = {
        abs_value: value,
        percentage_change: percentageChanges,
      };

      onBaseValueChange(completeData);
    }
  };

  // Calculate the effective min negative value for chart display
  const chartMinValue = getEffectiveMinNegative();

  return (
    <div className="bg-white rounded-lg pl-2 overflow-auto">
      {/* Add the style for scrollable-content */}
      <style>{scrollableContentStyle}</style>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center rounded-lg">
          <div className="flex items-center mr-4">
            <span className="text-sm font-medium text-gray-700 mr-2">
              Enter Absolute Value for the base year*
            </span>
            <input
              type="text"
              value={baseValue}
              onChange={handleBaseValueChange}
              className={`w-32 text-center bg-white border-b ${
                hasInteracted && baseValueError ? "border-red-500" : "border-gray-300"
              } rounded py-1 px-2 text-sm focus:outline-none focus:${
                hasInteracted && baseValueError ? "border-red-500" : "border-blue-500"
              } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
              placeholder="Enter Value *"
              disabled={disabled}
              required
            />
            {hasInteracted && (baseValueError || showDragError) && (
              <span className="text-red-500 text-xs ml-2">
                Absolute value for {metricName} is required
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="text-gray-500 text-sm mb-4">
        Increase or decrease the percentage of the consumption pattern
      </div>

      {/* Chart - Contained in the scrollable-content wrapper */}
      <div ref={chartScrollRef} className="h-80 pl-12 pr-4 scrollable-content">
        <div style={{ width: `${dynamicWidth}px`, height: "100%" }}>
          <ResponsiveLine
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 60, left: 60 }} // Increased bottom margin to prevent overlap
            xScale={{
              type: "point",
              padding: 0.5,
            }}
            yScale={{
              type: "linear",
              min: allowNegative ? chartMinValue : 0,
              max: maxRange,
              stacked: false,
              reverse: false,
            }}
            curve="monotoneX"
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
                <div className="font-medium text-gray-700">{point.data.x}</div>
                <div className="text-blue-600 font-bold">
                  {point.data.y > 0 ? "+" : ""}
                  {point.data.y}%
                </div>
                <div className="text-gray-500 text-xs">
                  Value: {isBaseValueValid() ? Math.round((parseFloat(baseValue) * (100 + point.data.y)) / 100) : "N/A"}
                </div>
                {!disabled && isBaseValueValid() && (
                  <div className="text-xs italic text-gray-500">
                    Click and drag to adjust
                  </div>
                )}
                {!disabled && !isBaseValueValid() && (
                  <div className="text-xs italic text-red-500">
                    Enter base value first
                  </div>
                )}
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
              // Custom layer for interactive points
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
                      style={{ 
                        cursor: disabled || !isBaseValueValid() ? "not-allowed" : "pointer",
                        opacity: disabled || !isBaseValueValid() ? 0.7 : 1 
                      }}
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

                      {/* Value label - Moving negative labels up instead of down to prevent overlap */}
                      <text
                        y={-15} // Always place labels above the point to avoid overlap with x-axis
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

      {/* Percentage change in consumption - Synchronized with chart scrolling */}
      <div
        ref={percentageScrollRef}
        className="mb-6 ml-2 pl-6 relative overflow-x-auto scrollable-content"
        style={{ marginTop: "10px" }} /* Added additional space */
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
                    className={`w-16 text-center border-b ${
                      !isBaseValueValid() ? "border-red-100" : "border-gray-300"
                    } rounded py-1 text-[11px] focus:outline-none focus:border-blue-500 ${
                      disabled || !isBaseValueValid() ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                    onChange={(e) => {
                      // Pass the raw value to our handler function
                      const rawValue = e.target.value.replace("%", "");
                      handlePercentageChange(index, rawValue);
                    }}
                                          onFocus={(e) => {
                      if (!disabled) {
                        // Mark that user has interacted
                        setHasInteracted(true);
                        
                        if (isBaseValueValid()) {
                          e.target.select();
                        } else {
                          // Show error if base value is invalid
                          setBaseValueError(true);
                          setShowDragError(true);
                        }
                      }
                    }}
                    onBlur={(e) => {
                      // On blur, ensure we don't leave a bare minus sign
                      if (data[index].y === "-") {
                        const newData = [...data];
                        newData[index] = { ...newData[index], y: 0 };
                        setData(newData);

                        // Only update if base value is valid
                        if (isBaseValueValid()) {
                          // Create the year-wise percentage changes for Redux with complete data
                          const percentageChanges = {};
                          newData.forEach((item) => {
                            percentageChanges[item.x] = item.y;
                          });

                          // Create complete data object
                          const completeData = {
                            abs_value: parseFloat(baseValue),
                            percentage_change: percentageChanges,
                          };

                          // Update the parent via callback with complete data
                          onPercentageChange(completeData);
                        }
                      }
                    }}
                    disabled={disabled || !isBaseValueValid()}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsGraph;