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

  return <ReusableTable columns={columns} data={data} />;
};

export default LocationTable;
