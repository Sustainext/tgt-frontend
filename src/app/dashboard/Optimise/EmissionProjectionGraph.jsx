import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';

/**
 * EmissionProjectionGraph Component
 * Displays emissions projections based on API data with support for multiple business metrics
 * and optional net zero trajectory
 */
const EmissionProjectionGraph = ({ 
  scenario, 
  graphData, // Expected format matches the API response with metadata, totals and yearly_data
  includeNetZero, 
  targetYear,  // Extended target year that can be modified by the user
  mainTargetYear, // Original target year from scenario creation
  selectedScope = "scope1", 
  selectedBusinessMetrics = ["total"] // Default to showing total emissions if no metrics selected
}) => {
  // Set up the years for the x-axis, based on extendedTargetYear
  const baseYear = scenario?.baseYear || 2024;
  const years = [];
  for (let year = baseYear; year <= targetYear; year++) {
    years.push(year);
  }

  // Process API data into format needed for Nivo
  const processGraphData = () => {
    if (!graphData || !graphData.totals) return [];
    
    // Create lines for each selected business metric
    const businessMetricLines = [];
    
    // If no specific metrics are selected, use total
    const metricsToShow = selectedBusinessMetrics.length ? selectedBusinessMetrics : ["total"];
    
    // Create a line for each metric
    metricsToShow.forEach(metric => {
      const metricData = {
        id: metric === "total" ? "Total Emissions" : `${metric.charAt(0).toUpperCase() + metric.slice(1)} Emissions`,
        curve: "monotoneX",
        data: []
      };
      
      // Get data for each year
      years.forEach(year => {
        const yearStr = year.toString();
        if (graphData.totals[yearStr] && graphData.totals[yearStr][metric] !== undefined) {
          metricData.data.push({
            x: year,
            y: graphData.totals[yearStr][metric]
          });
        } else {
          metricData.data.push({
            x: year,
            y: null
          });
        }
      });
      
      // Fill in any missing data points using interpolation
      metricData.data = interpolateMissingValues(metricData.data);
      businessMetricLines.push(metricData);
    });
    
    return businessMetricLines;
  };

  // Helper function to interpolate missing values
  const interpolateMissingValues = (dataPoints) => {
    const result = [...dataPoints];
    
    // Find first and last valid data points
    const firstValidIndex = result.findIndex(point => point.y !== null);
    const lastValidIndex = result.map(point => point.y !== null).lastIndexOf(true);
    
    if (firstValidIndex === -1) return result; // No valid data
    
    // Interpolate between data points
    for (let i = firstValidIndex + 1; i < lastValidIndex; i++) {
      if (result[i].y === null) {
        // Find next valid point
        let nextValidIndex = i + 1;
        while (nextValidIndex < result.length && result[nextValidIndex].y === null) {
          nextValidIndex++;
        }
        
        if (nextValidIndex < result.length) {
          // Interpolate between last valid and next valid
          const lastValid = result[i - 1];
          const nextValid = result[nextValidIndex];
          const totalSteps = nextValidIndex - (i - 1);
          
          for (let step = 1; step < totalSteps; step++) {
            const progress = step / totalSteps;
            result[i - 1 + step].y = lastValid.y + (nextValid.y - lastValid.y) * progress;
          }
          
          // Skip to next valid index
          i = nextValidIndex - 1;
        }
      }
    }
    
    // Forward-fill any remaining nulls after last valid point
    for (let i = lastValidIndex + 1; i < result.length; i++) {
      if (result[i].y === null) {
        // Use slight trend based on last two points if available
        if (lastValidIndex > 0) {
          const lastTwo = result.slice(lastValidIndex - 1, lastValidIndex + 1);
          const trend = (lastTwo[1].y - lastTwo[0].y) * 0.5; // Reduced trend
          result[i].y = result[lastValidIndex].y + trend * (i - lastValidIndex);
        } else {
          result[i].y = result[lastValidIndex].y;
        }
      }
    }
    
    return result;
  };
  
  // Generate net zero trajectory data
  const generateNetZeroData = () => {
    // Find initial emissions value from first year of data
    if (!graphData || !graphData.totals) return [];
    
    // Use total emissions as base for net zero calculation
    const initialYear = baseYear.toString();
    let initialValue = 0;
    
    if (graphData.totals[initialYear]) {
      // Use the "total" field if available
      initialValue = graphData.totals[initialYear].total || 0;
    }
    
    return years.map((year) => {
      // Calculate based on the main target year for net zero goal
      const yearsToTarget = mainTargetYear - baseYear;
      const currentYearProgress = year - baseYear;
      
      // If we're beyond the main target year, keep at zero
      if (year > mainTargetYear) {
        return {
          x: year,
          y: 0
        };
      }
      
      // Linear reduction to reach zero by mainTargetYear
      const reduction = currentYearProgress / yearsToTarget;
      const value = initialValue * (1 - reduction);
      
      return {
        x: year,
        y: Math.max(0, value) // Ensure we don't go below zero
      };
    });
  };

  // State for graph data
  const [nivoGraphData, setNivoGraphData] = useState([]);

  // Update graph data when relevant props change
  useEffect(() => {
    // Process the business metrics data
    const businessData = processGraphData();
    
    if (!businessData || businessData.length === 0) {
      setNivoGraphData([]);
      return;
    }
    
    // Create net zero data if enabled
    if (includeNetZero) {
      const netZeroData = {
        id: "Net Zero Scenario",
        data: generateNetZeroData(),
        curve: "linear" // Keep net zero line straight
      };
      
      setNivoGraphData([...businessData, netZeroData]);
    } else {
      setNivoGraphData(businessData);
    }
  }, [graphData, includeNetZero, targetYear, mainTargetYear, selectedScope, selectedBusinessMetrics]);

  // Add markers for the main target year
  const markers = [
  ];

  // Custom theme for the graph
  const theme = {
    axis: {
      ticks: {
        text: {
          fontSize: 11,
          fill: "#777"
        }
      },
      legend: {
        text: {
          fontSize: 12,
          fontWeight: 'bold',
          fill: "#555"
        }
      }
    },
    grid: {
      line: {
        stroke: "#eee",
        strokeWidth: 1
      }
    },
    crosshair: {
      line: {
        stroke: "#999",
        strokeWidth: 1,
        strokeOpacity: 0.75,
        strokeDasharray: "6 6"
      }
    },
    tooltip: {
      container: {
        background: "white",
        fontSize: 12,
        borderRadius: 4,
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      }
    }
  };

  // Extract activities from the API data for parent component
  useEffect(() => {
    if (!graphData || !graphData.yearly_data) return;
    
    // This should be handled via a callback to inform the parent component
    // Implementation would depend on how the parent wants to receive this data
    // This is a placeholder for the actual implementation
    console.log("Activities available:", extractActivities(graphData.yearly_data));
  }, [graphData]);
  
  // Helper function to extract unique activities from graph data
  const extractActivities = (yearlyData) => {
    const activitySet = new Set();
    
    // Go through each year's data
    Object.keys(yearlyData).forEach(year => {
      const activities = yearlyData[year];
      
      // Extract activity names
      activities.forEach(activity => {
        if (activity.activity_name) {
          activitySet.add(activity.activity_name);
        }
      });
    });
    
    // Convert to array
    return Array.from(activitySet);
  };

  // If no data is available
  if (!nivoGraphData.length || !nivoGraphData[0]?.data?.length) {
    return (
      <div className="flex items-center justify-center h-80 bg-gray-50 rounded-md border border-gray-200">
        <div className="text-gray-500 text-center">
          <p className="mb-2 font-medium">No emission data available</p>
          <p className="text-sm">Adjust your filters or check if this scenario has emission data</p>
        </div>
      </div>
    );
  }

  // Format Y-axis values
  const formatYValue = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K`;
    }
    return value.toFixed(2);
  };

  // Generate dynamic colors for the metrics
  const generateColors = () => {
    const baseColors = ['#3182CE', '#38A169', '#DD6B20', '#805AD5', '#D69E2E'];
    
    if (includeNetZero) {
      // Reserve the last color for Net Zero
      return [...baseColors.slice(0, nivoGraphData.length - 1), '#48BB78'];
    }
    
    return baseColors.slice(0, nivoGraphData.length);
  };

  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        data={nivoGraphData}
        theme={theme}
        margin={{ top: 40, right: 110, bottom: 50, left: 80 }}
        xScale={{ 
          type: 'point',
          padding: 0.3 
        }}
        yScale={{ 
          type: 'linear', 
          min: 'auto',
          max: 'auto',
          stacked: false, 
          reverse: false 
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Projection Timeline',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          tickValues: 5,
          legend: `Emissions (${graphData?.metadata?.unit || 'tCO2e'})`,
          legendOffset: -75,
          legendPosition: 'middle',
          format: value => formatYValue(value)
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        markers={markers}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 120,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        enableSlices="x"
        enableArea={true}
        areaOpacity={0.1}
        enableGridX={false}
        colors={generateColors()}
        lineWidth={3}
        curve="monotoneX"
        tooltip={({ point }) => (
          <div className="bg-white p-2 shadow-md border border-gray-200 rounded">
            <strong>{point.serieId}</strong>
            <div className="text-sm">
              <div>Year: {point.data.x}</div>
              <div>Emissions: {formatYValue(point.data.y)} {graphData?.metadata?.unit || 'tCO2e'}</div>
              {selectedBusinessMetrics && selectedBusinessMetrics.length > 0 && (
                <div>Metric: {selectedBusinessMetrics.join(', ')}</div>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default EmissionProjectionGraph;