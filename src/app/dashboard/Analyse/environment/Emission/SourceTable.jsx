import React from "react";
import ReusableTable from "../../../../shared/components/Table";

const SourceTable = ({ data, organisation, corporate,location }) => {
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

  return <ReusableTable type='Source' columns={columns} data={data} organisation={organisation} corporate={corporate} location={location} />;
};

export default SourceTable;
