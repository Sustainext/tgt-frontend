// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
function MyResponsiveloction({ locatiodata }) {
      const [isMobile, setIsMobile] = useState(false);
    
      useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
      }, []);
  const locationsData = locatiodata.reduce((acc, corporate) => {
    // Optionally, you can add more details to each location object here
    const locations = corporate.locations.map(location => ({
      ...location,
      corporate_name: corporate.corporate_name // Include corporate name for reference
    }));
    return acc.concat(locations);
  }, []);

  // Transform the locations data for the chart
  const transformedData = locationsData.map(location => ({
    id: location.location_name,
    label: `${location.location_name}`,
    value: parseFloat(location.total_co2e),
    color: `hsl(${Math.random() * 360}, 70%, 50%)` // Random color for each location
  }));


  return (
    <>
    {
      transformedData.length>0 && (
        <h3 className="text-left mb-2 p-3 mt-3">
        <b>Emissions by location</b>
      </h3>
      )
    }
     

      <ResponsivePie
        data={transformedData}
        enableArcLabels={false}
        margin={{ top: 40, right: isMobile ? 10 : 250, bottom: isMobile ? 120 : 80, left: 0 }}
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
            anchor: isMobile ? "bottom" : "right",
            direction: isMobile ? "row" : "column",
              justify: false,
              translateX: isMobile ? 0 : 120,
              translateY: isMobile ? 60 : 0,
              itemsSpacing: isMobile ? 20 : 2,
              itemWidth: isMobile ? 80 : 80,
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
        // ... rest of your chart configuration
      />
    </>
  );
}

export default MyResponsiveloction;
