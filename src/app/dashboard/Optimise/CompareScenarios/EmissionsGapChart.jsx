// EmissionsGapChart.jsx
import React from "react";
import { ResponsiveBar } from '@nivo/bar';

const EmissionsGapChart = ({ data }) => {
  return (
    <div className="mt-12">
      <h3 className="text-base font-bold text-gray-900 mb-4">
        Emissions Gap vs Net-Zero Pathway
      </h3>
      <div className="bg-white p-4 rounded-lg border border-gray-100" style={{ height: 400 }}>
        <ResponsiveBar
          data={data}
          keys={data[0] ? Object.keys(data[0]).filter(key => key !== 'year' && key.includes('Gap')) : []}
          indexBy="year"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="grouped"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'paired' }}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Projection Timeline',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Gap (Emissions vs Net-Zero)',
            legendPosition: 'middle',
            legendOffset: -40,
            format: value => `${value}M`
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
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
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  );
};

export default EmissionsGapChart;