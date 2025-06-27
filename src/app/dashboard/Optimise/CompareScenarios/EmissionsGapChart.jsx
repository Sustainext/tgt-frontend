// Updated EmissionsGapChart with legends at top and full width
import React from "react";
import { ResponsiveBar } from '@nivo/bar';

const EmissionsGapChart = ({ data }) => {
  // Custom tooltip to show formatted values
  const CustomTooltip = ({ id, value, color, indexValue }) => (
    <div style={{ 
      background: 'white', 
      padding: '9px 12px', 
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '5px' 
      }}>
        <span style={{ 
          display: 'block', 
          width: '12px', 
          height: '12px', 
          background: color, 
          marginRight: '7px',
          borderRadius: '2px'
        }}></span>
        <strong>{id.replace(' Gap', '')}</strong>
      </div>
      <div>
        <div>Year: <strong>{indexValue}</strong></div>
        <div>Gap: <strong>{value.toLocaleString()} tCO₂e</strong></div>
      </div>
    </div>
  );

  // Extract keys from data
  const chartKeys = data[0] 
    ? Object.keys(data[0])
        .filter(key => key !== 'year' && key.includes('Gap'))
        .map(key => ({
          id: key,
          // Create shorter display names for legend
          label: key.replace(' Gap', '')
        }))
    : [];

  // Generate custom colors that look better than the default scheme
  const customColors = [
    '#3182CE', // blue
    '#2563EB', // indigo
    '#EF4444', // red
    '#10B981', // emerald
    '#8B5CF6', // violet
    '#F59E0B'  // amber
  ];

  return (
    <div className="mt-12 w-full">
      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm w-full" style={{ height: 460 }}> {/* Increased height for top legend */}
        <ResponsiveBar
          data={data}
          keys={chartKeys.map(k => k.id)} // Use the original keys for the chart
          indexBy="year"
          margin={{ top: 80, right: 20, bottom: 50, left: 60 }} 
          padding={0.2}
          innerPadding={3}
          groupMode="grouped"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={customColors}
          borderRadius={2}
          borderWidth={0}
          borderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Projection Timeline',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Gap (Emissions vs Net-Zero)',
            legendPosition: 'middle',
            legendOffset: -55,
            format: value => `${Math.round(value)}`,
            truncateTickAt: 0
          }}
          enableGridY={true}
          gridYValues={5}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          tooltip={CustomTooltip}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'top', // Position at the top center
              direction: 'row', // Display in a row
              justify: false,
              translateX: 0,
              translateY: -50, // Move up from the top of the chart
              itemsSpacing: 20, // Increased spacing between items
              itemWidth: 100, // Adjusted width for items in a row
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 12,
              symbolShape: 'square',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              // Use custom data mapping to display shorter legend labels
              data: chartKeys.map((k, i) => ({
                id: k.id,
                label: k.label, // Use the shorter display name
                color: customColors[i % customColors.length]
              })),
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate={true}
          motionConfig="gentle"
          theme={{
            grid: {
              line: {
                stroke: "#e2e8f0",
                strokeWidth: 1
              }
            },
            axis: {
              ticks: {
                text: {
                  fontSize: 11,
                  fill: "#64748b"
                }
              },
              legend: {
                text: {
                  fontSize: 12,
                  fontWeight: 600,
                  fill: "#475569"
                }
              }
            },
            legends: {
              text: {
                fontSize: 11,
                fill: "#475569"
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default EmissionsGapChart;