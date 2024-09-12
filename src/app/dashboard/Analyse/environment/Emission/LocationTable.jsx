import React from "react";
import ReusableTable from "../../../../shared/components/Table";

const LocationTable = ({ data, fullData, organisation, corporate,location, fromDate, toDate }) => {
  const columns = [
    {
      Header: "S.No",
      accessor: "sno",
    },
    {
      Header: "Location",
      accessor: "location",
    },
    {
      Header: "Percentage contribution",
      accessor: "ageContribution",
    },
    {
      Header: "Total Emissions",
      accessor: "totalemissions",
    },
    {
      Header: "Units",
      accessor: "units",
    },
  ];

  return <ReusableTable type='Location' columns={columns} data={data} fullData={fullData} organisation={organisation} corporate={corporate} location={location} fromDate={fromDate} toDate={toDate} />;
};

export default LocationTable;
