import React from "react";
import MyResponsivePie from "./PieChart";
import MyResponsivesouresdata from "./PieChart2";
import MyResponsiveloction from "./PieChart3";
import Moment from "react-moment";
import EmissionByInvestment from './PieChart4'

function Results({ exdata, totalContributionScope, souresdata, locatiodata }) {
  let totalScope1 = 0;
  let totalScope2 = 0;
  let totalScope3 = 0;

  // Loop through each corporate's scopes to sum up the emissions by scope
  exdata.forEach((corporate) => {
    corporate.scopes.forEach((scope) => {
      if (scope.scope_name === "Scope-1") {
        totalScope1 += parseFloat(scope.total_co2e);
      } else if (scope.scope_name === "Scope-2") {
        totalScope2 += parseFloat(scope.total_co2e);
      } else if (scope.scope_name === "Scope-3") {
        totalScope3 += parseFloat(scope.total_co2e);
      }
    });
  });

  // Calculate the overall total and percentages
  const overallTotal = totalScope1 + totalScope2 + totalScope3;
  const percentScope1 = (totalScope1 / overallTotal) * 100;
  const percentScope2 = (totalScope2 / overallTotal) * 100;
  const percentScope3 = (totalScope3 / overallTotal) * 100;
  const orgname = localStorage.getItem("reportorgname");
  const reportstartdateStr = localStorage.getItem("reportstartdate");
  const reportenddateStr = localStorage.getItem("reportenddate");

  return (
    <>
      <div className="xl:px-3 w-[95%]">
        <h3 className="text-left mb-2 p-3">
          <b>RESULTS</b>
        </h3>
        <div className="box rounded-lg p-4">
          <p className="text-left mb-4 wordsping">
            {orgname} total emissions for the period{" "}
            <Moment format="DD-MMM-YYYY">{reportstartdateStr}</Moment> to{" "}
            <Moment format="DD-MMM-YYYY">{reportenddateStr}</Moment> were{" "}
            {totalContributionScope} tCO2e.
          </p>
          <div className="mb-5">
            <h2 className="text-lg font-semibold my-4">
              GHG emissions by scope
            </h2>
            <table className="min-w-full leading-normal border border-slate-200 rounded-lg">
              <thead className="border-s-slate-200">
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Scope
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 tracking-wider">
                    EMISSIONS (tCO2e)
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 tracking-wider">
                    % of Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    Scope 1
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {totalScope1.toFixed(2)}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {percentScope1.toFixed(2)}%
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    Scope 2
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {totalScope2.toFixed(2)}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {percentScope2.toFixed(2)}%
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    Scope 3
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {totalScope3.toFixed(2)}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {percentScope3.toFixed(2)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="h-[401px] w-[90%] mb-5">
        <MyResponsivePie exdata={exdata} />
      </div>
      <div className="h-[401px] w-[90%]  mt-16 mb-5 ">
        <MyResponsivesouresdata souresdata={souresdata} />
      </div>
      <div className="h-[401px] w-[90%]  mt-16 mb-5">
        <MyResponsiveloction locatiodata={locatiodata} />
      </div>
      <div className="h-[401px] w-[90%]  mt-16 mb-5">
        <EmissionByInvestment souresdata={souresdata} />
      </div>
    </>
  );
}

export default Results;
