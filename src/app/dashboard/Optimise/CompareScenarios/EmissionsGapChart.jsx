// EmissionsGapChart.jsx
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
    <div className="mt-12">
      <h3 className="text-base font-bold text-gray-900 mb-4">
        Emissions Gap vs Net-Zero Pathway
      </h3>
      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm" style={{ height: 400 }}>
        <ResponsiveBar
          data={data}
          keys={chartKeys}
          indexBy="year"
          margin={{ top: 40, right: 130, bottom: 50, left: 60 }}
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
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 8,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 12,
              symbolShape: 'square',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
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