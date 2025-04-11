// EmissionsTrendChart.jsx
import React from "react";
import { ResponsiveLine } from '@nivo/line';
import { FiDownload } from "react-icons/fi";

const EmissionsTrendChart = ({ data, selectedScope }) => {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-gray-900">
          Predicted Trend of chosen Business Metrics over Years for ({selectedScope})
        </h3>
        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Download results
          <FiDownload className="ml-2 h-4 w-4" />
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-100" style={{ height: 400 }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 40, right: 140, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ 
            type: 'linear', 
            min: 'auto',
            max: 'auto',
            stacked: false, 
            reverse: false 
          }}
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
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Emissions (in kgCO₂e)',
            legendOffset: -50,
            legendPosition: 'middle',
            format: value => `${value}M`
          }}
          enableGridX={false}
          colors={{ scheme: 'paired' }}
          lineWidth={3}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          enableArea={true}
          areaOpacity={0.1}
          useMesh={true}
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
        />
      </div>
    </div>
  );
};

export default EmissionsTrendChart;