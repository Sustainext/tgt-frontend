import React from "react";
import ReusableTable from "../../../../shared/components/Table";

const ReductionTable = ({ data, fullData, organisation, corporate,location, fromDate, toDate }) => {
  const columns = [
    {
      Header: "S.No",
      accessor: "sno",
    },
    {
      Header: "Initiatve taken to reduce GHG emissions",
      accessor: "initiatve",
    },
    {
      Header: "Method to account for reductions",
      accessor: "reductions",
    },
    {
      Header: "Base Year or Baseline",
      accessor: "baseline",
    },
    {
      Header: "Year",
      accessor: "year",
    },
    {
        Header: "Rationale for choosing base year or baseline",
        accessor: "rationale",
      },
      {
        Header: "GHG Emission reduced (tCO2e)",
        accessor: "emissionReduction",
      },
      {
        Header: "Scopes in which reduction took place",
        accessor: "scopeReduction",
      },
      {
        Header: "Gases included in the calculations",
        accessor: "gases",
      },
      {
        Header: "Standard, Methodology, Assumptions and/or Calculation tools used",
        accessor: "tools",
      },
  ];

  return <ReusableTable type='Reduction' columns={columns} data={data} fullData={fullData} organisation={organisation} corporate={corporate} location={location} fromDate={fromDate} toDate={toDate} />;
};

export default ReductionTable;
