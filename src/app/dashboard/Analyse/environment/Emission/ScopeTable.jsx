import React from "react";
import ReusableTable from "../../../../shared/components/Table";

const ScopeTable = ({ data }) => {
  const columns = [
    {
      Header: "S.No",
      accessor: "sno",
    },
    {
      Header: "Scope",
      accessor: "scope",
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

export default ScopeTable;
