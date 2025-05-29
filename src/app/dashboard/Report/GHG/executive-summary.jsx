import React from "react";
import Moment from "react-moment";

function Executivesummary({
  exdata,
  totalContributionScope,
  highestContributionSource,
}) {
  let totalScope1 = 0;
  let totalScope2 = 0;
  let totalScope3 = 0;
  let uint1 = '';
  let uint2 = '';
  let uint3 = '';


  const regularCorporateData = exdata && exdata.filter(item => item.corporate_type === "Regular");

  // Loop through each corporate's scopes to sum up the emissions by scope
  exdata.forEach((corporate) => {
    corporate.scopes.forEach((scope) => {
      if (scope.scope_name.toLowerCase() === "scope-1" && corporate.corporate_type === "Regular") {
        totalScope1 += parseFloat(scope.total_co2e);
        uint1 = scope.co2e_unit;
      } else if (scope.scope_name.toLowerCase() === "scope-2" && corporate.corporate_type === "Regular") {
        totalScope2 += parseFloat(scope.total_co2e);
        uint2 = scope.co2e_unit;
      } else if (scope.scope_name.toLowerCase() === "scope-3") {
        totalScope3 += parseFloat(scope.total_co2e);
        uint3 = scope.co2e_unit;
      }
    });
  });

  // Calculate the overall total and percentages
  const overallTotal = totalScope1 + totalScope2 + totalScope3;
  const percentScope1 = (totalScope1 / overallTotal) * 100;
  const percentScope2 = (totalScope2 / overallTotal) * 100;
  const percentScope3 = (totalScope3 / overallTotal) * 100;
  const orgname = localStorage.getItem("reportorgname");
  const corpName = localStorage.getItem("reportCorpName");
  const reportstartdateStr = localStorage.getItem("reportstartdate");
  const reportenddateStr = localStorage.getItem("reportenddate");
  const reportby = typeof window !== 'undefined' ? localStorage.getItem("reportby") : '';
  return (
    <>
      <div className="xl:px-3">
        <div className="flex">
          <h3 className="text-left mb-2 p-3">
            <b>EXECUTIVE SUMMARY</b>
          </h3>
        </div>
        <div className="box rounded-lg p-4">
          <p className="text-left mb-4 wordsping">
            This report details the Greenhouse Gas Emissions (GHG) accounting
            for the {reportby} <span>{reportby==='Corporate'?corpName:orgname}</span>. The total GHG
            emissions for the reporting period{" "}
            <Moment format="DD-MMM-YYYY">{reportstartdateStr}</Moment> to{" "}
            <Moment format="DD-MMM-YYYY">{reportenddateStr}</Moment> were found
            to be {totalContributionScope} tCO2e. The largest source of
            emissions was {highestContributionSource}.
          </p>
          {exdata.length > 1 && ( // Conditional rendering based on the number of corporations
            <div className="mb-5">
              <h2 className="text-lg font-semibold my-4">
                Table 1 : {reportby==='Corporate'?corpName:orgname} GHG emissions by scope
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
          )}

        {reportby==='Corporate'?(
          <div></div>
        ):(
          <div className="mb-5">
            {regularCorporateData &&
              regularCorporateData.map((corporate, corpIndex) => (
                corporate.scopes.length > 0 && ( // Check if there are scopes before rendering the table
                  <div key={corpIndex} className="mb-5">
                    <h2 className="text-lg font-semibold my-4">
                      {regularCorporateData.length > 0 ? `Table 1.${corpIndex + 1}` : "Table 1"} : {corporate.corporate_name} GHG emissions by scope
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
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            % of Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {corporate.scopes.map((scope, scopeIndex) => (
                          <tr key={scopeIndex}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                              {scope.scope_name}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {scope.total_co2e.toFixed(2)}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              {scope.contribution_scope}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              ))}
          </div>
        )}
      
          
        </div>
      </div>
    </>
  );
}

export default Executivesummary;
