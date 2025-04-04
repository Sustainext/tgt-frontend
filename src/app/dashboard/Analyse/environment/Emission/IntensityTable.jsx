import React from "react";
import SubHeaderTable from "../../../../shared/components/subheaderTable";

const IntensityTable = ({ data, fullData, organisation, corporate,location, fromDate, toDate }) => {
    const columns = [
        { header: "S.No", subHeaders: [] },
        { header: "Organisation Metric", subHeaders: [] },
        { header: "Quantity", subHeaders: [] },
        { header: "Unit", subHeaders: [] },
        { header: "Type of GHGs", subHeaders: [] },
        { header: "GHG Emission Intensity", subHeaders: [] },
        { header: "Unit", subHeaders: [] },
        { 
          header: "Gases included in the calculation", 
          subHeaders: ["CO2", "N2O", "CH4", "HFCs", "PFCs", "SF6", "NF3"] 
        }
      ];
      
  

  return <SubHeaderTable columns={columns} data={data} fullData={fullData} organisation={organisation} corporate={corporate} location={location} fromDate={fromDate} toDate={toDate} />;
};

export default IntensityTable;
