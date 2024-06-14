// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
function MyResponsivePie({ exdata }) {

  const aggregatedDataByScope = exdata.reduce((acc, corporate) => {
    corporate.scopes.forEach(scope => { // Corrected from `exdata.corporate.scopes` to `corporate.scopes`
      if (acc[scope.scope_name]) {
        acc[scope.scope_name].value += parseFloat(scope.total_co2e);
      } else {
        acc[scope.scope_name] = {
          id: scope.scope_name,
          label: scope.scope_name,
          value: parseFloat(scope.total_co2e),
          color: `hsl(${Math.random() * 360}, 70%, 50%)` // Random color for each scope
        };
      }
    });
    return acc;
  }, {});
  
  // Convert the aggregated object back into an array for @nivo/pie
  const dataForPieChart = Object.values(aggregatedDataByScope);
 
  // The rest of your component that renders the pie chart...
  return (
    <>
      <h3 className="text-left mb-2 p-3">
        <b>Emissions by Scope</b>
      </h3>

      <ResponsivePie
        data={dataForPieChart}
        enableArcLabels={false}
        margin={{ top: 40, right: 250, bottom: 80, left: 0 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 120, // Adjust this value to move the legend closer or further from the chart
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 80, // Adjust based on your text length
              itemHeight: 20,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemTextColor: '#000'
                      }
                  }
              ]
          }
      ]}
      />
    </>
  );
}

export default MyResponsivePie;
