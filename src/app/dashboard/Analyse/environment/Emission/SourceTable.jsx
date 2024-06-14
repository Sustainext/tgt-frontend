import React from "react";
import ReusableTable from "../../../../shared/components/Table";

const SourceTable = ({ data }) => {
  const columns = [
    {
      Header: "S.No",
      accessor: "sno",
    },
    {
      Header: "Source",
      accessor: "source",
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

export default SourceTable;
