import React from "react";
import ReusableTable from "../../../../shared/components/Table";

const LocationTable = ({ data }) => {
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
      Header: "Contribution %",
      accessor: "ageContribution",
    },
    {
      Header: "Total Emissions (tCO2e)",
      accessor: "totalemissions",
    },
  ];

  return <ReusableTable columns={columns} data={data} />;
};

export default LocationTable;
