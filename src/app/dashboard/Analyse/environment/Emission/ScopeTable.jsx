import React from "react";
import ReusableTable from "../../../../shared/components/Table";

const ScopeTable = ({ data }) => {
  const columns = [
    {
      Header: "S.No",
      accessor: "sno",
    },
    {
      Header: "Scope ",
      accessor: "scope",
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

  return <ReusableTable type='Scope' columns={columns} data={data} />;
};

export default ScopeTable;
