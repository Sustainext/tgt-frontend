import React from "react";
import ReusableTable from "../../../shared/components/Table";

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

export default SourceTable;
