import { ResponsivePie } from "@nivo/pie";

function MyResponsivesouresdata({ souresdata }) {
  const uniqueSources = new Map();

  souresdata.forEach(corporate => {
    corporate.sources.forEach(source => {
      const key = source.source_name;
      // Check if the source is already added, if not or if you want to aggregate, adjust the logic here
      if (!uniqueSources.has(key)) {
        uniqueSources.set(key, {
          ...source,
          corporate_name: corporate.corporate_name,
        });
      }
    });
  });

  const sourcesDataForChart = Array.from(uniqueSources.values()).map(source => ({
    id: source.source_name,
    label: source.category_name,
    value: parseFloat(source.total_co2e),
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  }));

  // Your existing component code continues here...


  return (
    <>
      <h3 className="text-left mb-2 p-3 mt-3">
        <b>Emissions by Sources</b>
      </h3>

      <ResponsivePie
        data={sourcesDataForChart}
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
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 120, // Adjust this value to move the legend closer or further from the chart
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 80, // Adjust based on your text length
            itemHeight: 20,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
        // ... rest of your chart configuration
      />
    </>
  );
}

export default MyResponsivesouresdata;
