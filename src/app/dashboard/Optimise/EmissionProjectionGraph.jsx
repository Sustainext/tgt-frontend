import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';

const EmissionsProjectionGraph = ({ 
  scenario, 
  includeNetZero, 
  targetYear,  // This is the extendedTargetYear that can be changed by the user
  mainTargetYear,
  selectedScope= "scope1", 
  selectedBusinessMetrics 
}) => {
  // Set up the years for the x-axis, based on extendedTargetYear
  const baseYear = scenario?.baseYear || 2024;
  const years = [];
  for (let year = baseYear; year <= targetYear; year++) {
    years.push(year);
  }

  // Generate sample data for the emissions projection
  const generateEmissionsData = () => {
    // Initial value (starting at a higher value)
    const initialValue = 76.2225;
    const dataPoints = years.map((year, index) => {
      // Business-as-usual projection (slight increase over time)
      let value = initialValue;
      
      // Create a more realistic curve - initial decrease then stabilization
      if (index === 0) {
        value = initialValue;
      } else if (index === 1) {
        value = initialValue + 56.0015;
      } else if (index === 2) {
        value = initialValue - 17.0025;
      } else if (index === 3) {
        value = initialValue + 10.0015;
      } else {
        // For years beyond the original scenario, continue with a slight trend
        const beyondBaseYears = index - 4;
        value = initialValue + 37.0015 + (beyondBaseYears * 0.0005);
      }
      
      return {
        x: year,
        y: value
      };
    });

    return dataPoints;
  };

  // Generate net zero trajectory data
  const generateNetZeroData = () => {
    const initialValue = 76.2225;
    
    return years.map((year, index) => {
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

  // Generate data for the graph
  const [graphData, setGraphData] = useState([
    {
      id: "Usual",
      data: generateEmissionsData()
    }
  ]);

  // Update graph data when relevant props change
  useEffect(() => {
    const businessData = {
      id: "Usual",
      data: generateEmissionsData(),
      curve: "monotoneX" // Apply curve to business as usual line
    };
    
    const netZeroData = {
      id: "Net Zero Scenario",
      data: generateNetZeroData(),
      curve: "linear" // Keep net zero line straight
    };
    
    if (includeNetZero) {
      setGraphData([businessData, netZeroData]);
    } else {
      setGraphData([businessData]);
    }
  }, [scenario, includeNetZero, targetYear, mainTargetYear, selectedScope, selectedBusinessMetrics]);

  // Add markers for the main target year
  const markers = [
    // {
    //   axis: 'x',
    //   value: mainTargetYear,
    //   lineStyle: { stroke: '#FF6B6B', strokeWidth: 2, strokeDasharray: '6 6' },
    //   legend: 'Main Target',
    //   legendOrientation: 'vertical',
    //   legendPosition: 'top',
    //   textStyle: { fill: '#FF6B6B', fontSize: 12 }
    // }
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

  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        data={graphData}
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
        yFormat=" >-.4f"
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
          tickPadding: 10, // Increased padding between ticks and labels
          tickRotation: 0,
          tickValues: 5,
          legend: 'Emissions (in tCO2e)',
          legendOffset: -75, // Move legend further from axis
          legendPosition: 'middle',
          format: value => `${value.toFixed(4)}M`
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
            itemWidth: 80,
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
        colors={includeNetZero ? ['#3182CE', '#48BB78'] : ['#3182CE']}
        lineWidth={3}
        curve="monotoneX" // Apply curve to all lines by default
        layers={[
          'grid',
          'markers',
          'axes',
          'areas',
          'crosshair',
          'lines',
          'points',
          'slices',
          'mesh',
          'legends',
          ({ points }) => {
            // Add the value labels above each point
            return (
              <g>
                {points.map(point => {
                  // Only apply to specific series if needed
                  if (point.serieId === 'Business As Usual') {
                    return (
                      <g key={`value-${point.id}`} transform={`translate(${point.x},${point.y - 20})`}> {/* Increased vertical offset */}
                        <rect 
                          x="-20" 
                          y="-10" 
                          width="40" 
                          height="16" 
                          fill="white" 
                          fillOpacity="0.7" 
                          rx="2" 
                        />
                        <text
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize={11}
                          fontWeight="bold"
                          fill="#555"
                        >
                          {point.data.yFormatted}
                        </text>
                      </g>
                    );
                  }
                  return null;
                })}
              </g>
            );
          }
        ]}
      />
    </div>
  );
};

export default EmissionsProjectionGraph;