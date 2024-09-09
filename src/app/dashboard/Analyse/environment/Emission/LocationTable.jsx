import React from "react";
import ReusableTable from "../../../../shared/components/Table";

const LocationTable = ({ data, organisation, corporate,location }) => {
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

  return <ReusableTable type='Location' columns={columns} data={data} organisation={organisation} corporate={corporate} location={location} />;
};

export default LocationTable;
