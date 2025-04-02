import React, { useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { FiCalendar, FiMinus, FiPlus, FiInfo } from "react-icons/fi";

const MetricsGraph = ({
  baseYear = 2025,
  targetYear = 2035,
  metricName = "FTE",
}) => {
  // Initial data structure
  const initialData = [];

  // Generate years between base and target
  const years = [];
  for (let year = baseYear; year <= targetYear; year++) {
    years.push(year.toString());
    // Start with 0% growth for all years
    initialData.push({
      x: year.toString(),
      y: 0,
    });
  }

  // State for the growth data
  const [data, setData] = useState(initialData);
  // State for the absolute value in base year
  const [baseValue, setBaseValue] = useState();
  // State for the y-axis range
  const [maxRange, setMaxRange] = useState(100);

  // Function to auto-adjust range based on values
  const autoAdjustRange = (value) => {
    // If a value exceeds current range, bump up to the next range level
    if (Math.abs(value) > maxRange) {
      // Determine next appropriate range
      if (maxRange === 100) {
        setMaxRange(200);
      } else if (maxRange === 200) {
        setMaxRange(500);
      } else if (maxRange === 500) {
        setMaxRange(1000);
      } else if (maxRange === 1000) {
        setMaxRange(2000);
      }
      // Return true to indicate the range was adjusted
      return true;
    }
    return false;
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
      id: metricName,
      data: data,
    },
  ];

  return (
    <div className="bg-white rounded-lg px-2">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center rounded-lg">
          <div className="flex items-center mr-4">
            <span className="text-sm font-medium text-gray-700 mr-2">
              Enter Absolute Value for the base year*
            </span>
            <input
              type="text"
              value={baseValue}
              onChange={(e) => setBaseValue(Number(e.target.value) || 0)}
              className="w-32 text-center bg-white border-b border-gray-300 rounded py-1 px-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter Value"
            />
          </div>
        </div>
      </div>

      <div className="text-gray-500 text-sm mb-4">
        Increase or decrease the percentage of the consumption pattern
      </div>

      {/* Chart */}
      <div className="h-80 pl-12 pr-6">
        <ResponsiveLine
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
          xScale={{
            type: "point",
            padding: 0.5, // Add padding to give more space around points, especially the first one
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
            enabled: false, // Disable the built-in axis as we'll create our own with inputs
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
              <div className="font-medium text-gray-700">{point.data.x}</div>
              <div className="text-blue-600 font-bold">
                {point.data.y > 0 ? "+" : ""}
                {point.data.y}%
              </div>
              <div className="text-gray-500 text-xs">
                Value: {Math.round((baseValue * (100 + point.data.y)) / 100)}
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

      {/* Percentage change in consumption */}
      <div className="mb-6 ml-2 -mt-2 pl-6 relative">
        <div className="flex justify-between items-center">
          <div className="flex-none w-12 text-[11px] font-medium text-gray-500 relative -left-6">
            Percentage change in consumption
          </div>
          <div className="flex-1 overflow-x-hidden">
            <div className="flex justify-between" style={{ minWidth: "800px" }}>
              {years.map((year, index) => (
                <div
                  key={year}
                  className="flex flex-col items-center"
                  style={{ width: "60px" }}
                >
                  <input
                    type="text"
                    value={`${data[index].y > 0 ? "+" : ""}${data[index].y}%`}
                    className="w-16 text-center border-b border-gray-300 rounded py-1 text-[11px] focus:outline-none focus:border-blue-500"
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9\-+%]/g, "");
                      const numValue = parseInt(value) || 0;
                      const newData = [...data];
                      newData[index] = { ...newData[index], y: numValue };
                      setData(newData);
                    }}
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
