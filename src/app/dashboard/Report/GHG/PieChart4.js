import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";
function EmissionByInvestment({ souresdata }) {
  const [isMobile, setIsMobile] = useState(false);
  const reportType = typeof window !== 'undefined' ? localStorage.getItem("reportType") : '';
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const uniqueSources = new Map();



//   souresdata.forEach((corporate) => {
//     corporate.sources.forEach((source) => {
//       const key = source.source_name;
//       // Check if the source is already added, if not or if you want to aggregate, adjust the logic here
//       if (!uniqueSources.has(key)) {
//         uniqueSources.set(key, {
//           ...source,
//           corporate_name: corporate.corporate_name,
//         });
//       }
//     });
//   });

//   const sourcesDataForChart = Array.from(uniqueSources.values()).map(
//     (source) => ({
//       id: source.source_name,
//       label:
//         source.category_name.length > 14
//           ? source.category_name.slice(0, 14) + "…"
//           : source.category_name,
//       value: parseFloat(source.total_co2e),
//       color: `hsl(${Math.random() * 360}, 70%, 50%)`,
//     })
//   );


souresdata.forEach((corporate) => {
    // Only process corporates with type 'Investment'
    if (corporate.corporate_type === "Investment") {
      corporate.sources.forEach((source) => {
        const key = source.source_name;
        if (!uniqueSources.has(key)) {
          uniqueSources.set(key, {
            ...source,
            corporate_name: corporate.corporate_name,
          });
        }
      });
    }
  });
  
  const sourcesDataForChart = Array.from(uniqueSources.values()).map(
    (source) => ({
      id: source.source_name,
      label:
        source.category_name?.length > 14
          ? source.category_name.slice(0, 14) + "…"
          : source.category_name || source.source_name,
      value: parseFloat(source.total_co2e),
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    })
  );

  

 
  // Your existing component code continues here...

  return (
    <>
   {reportType=='GHG Report - Investments' && (
    <div>
       <h3 className="text-left mb-2 p-3 mt-3">
      <b>Emissions by Investments</b>
    </h3>

    
    </div>
   )}
   <ResponsivePie
      data={sourcesDataForChart}
      enableArcLabels={false}
      margin={{
        top: 40,
        right: isMobile ? 10 : 250,
        bottom: isMobile ? 120 : 80,
        left: 0,
      }}
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
          translateX: isMobile ? 0 : 0,
          translateY: isMobile ? 80 : 0,
          itemsSpacing: isMobile ? 20 : 10, // more spacing between items on mobile
          itemWidth: isMobile ? 100 : 80, // give more width
          itemHeight: isMobile ? 20 : 10, // increase height to avoid squish
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

export default EmissionByInvestment;
