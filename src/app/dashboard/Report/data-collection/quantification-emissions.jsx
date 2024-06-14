const Quantificationemissions = () => {
  return (
    <>
      <div className="px-3">
        <div className="box rounded-lg p-4  mb-5">
          <h4 className="text-left">
            <b>Quantification of Direct & Indirect Emissions </b>
          </h4>
          <p className="text-left mb-4">
            The following are the direct and indirect emissions from{" "}
            <b>(Organization’s name)</b>
            operations during FY <b>(Year)</b>
          </p>
          {/* <h5 className="text-left mb-4">Direct GHG Emission: Scope 1</h5> */}
          <p className="text-left mb-2">Direct GHG Emission: Scope 1</p>
          <table className="min-w-full leading-normal border border-slate-200 rounded-lg">
            <thead className="border-s-slate-200 mb-5">
              <tr className="border-s-slate-200">
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                  Scope 1
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Consumption (Annual)
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Consumption Unit
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Greenhouse Gas Emissions (Reporting Period) (tCO2e)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                  EX: Passenger Car
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  Ex: 144,215
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  Ex: Miles
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  Ex: 49.51
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-left mb-2">
            The total Scope 1 emissions from (Organization’s name) were
            _____tCO2e for FY (Reporting Period)
          </p>
        </div>

        <div className="box rounded-lg p-4  mb-5">
          <h4 className="text-left">
            <b>Indirect GHG Emission: Scope 2</b>
          </h4>
          <p className="text-left mb-4">
            The grid electricity purchased to run operations for the
            (Organization’s name) offices/factories along with the purchased
            backup electricity and purchased cooling/HVAC are considered
            indirect emissions (Scope 2)
          </p>

          <p className="text-left mb-2">Table 6: Scope 2</p>
          <table className="min-w-full leading-normal border border-slate-200 rounded-lg">
            <thead className="border-s-slate-200 mb-5">
              <tr className="border-s-slate-200">
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                  Scope 2
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Consumption (Annual)
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Consumption Unit
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Greenhouse Gas Emissions (Reporting Period) (tCO2e)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                  EX: Passenger Car
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  Ex: 144,215
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  Ex: Miles
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  Ex: 49.51
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-left mb-2">
            The total Scope 2 emissions from (Organization’s name) were
            _____tCO2e for FY (Reporting Period)
          </p>
        </div>
        <div className="box rounded-lg p-4  mb-5">
          <h4 className="text-left">
            <b>Other indirect GHG Emission: Scope 3</b>
          </h4>
          <p className="text-left mb-4">
            Employee commute, business travel, public transport travel, waste
            consumption and T&D losses from grid electricity are categorized
            under other indirect emissions (Scope 3).
          </p>

          <p className="text-left mb-2">Table 7: Scope 3</p>
          <table className="min-w-full leading-normal border border-slate-200 rounded-lg">
            <thead className="border-s-slate-200 mb-5">
              <tr className="border-s-slate-200">
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                  Scope 3
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Consumption (Annual)
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Consumption Unit
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Greenhouse Gas Emissions (Reporting Period) (tCO2e)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                  EX: Passenger Car
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  Ex: 144,215
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  Ex: Miles
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  Ex: 49.51
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-left mb-2">
            The total Scope 3 emissions from (Organization’s name) were
            _____tCO2e for FY (Reporting Period)
          </p>
        </div>

        <div className="box rounded-lg p-4  mb-5">
          <h4 className="text-left">
            <b>Reducing uncertainties </b>
          </h4>
          <p className="text-left mb-4">
            It is assumed that there is +/- 5% to 10 % uncertainty associated
            with the calculation of total emission of (Organization’s name) each
            year. It is based on the following:{" "}
          </p>
          <p className="text-left mb-4">
            {" "}
            -Based on the accuracy of the activity data collected, the
            uncertainty associated can be approximately 5%.{" "}
          </p>
          <p className="text-left mb-4">
            {" "}
            - Uncertainty associated with estimating emission factors .{" "}
          </p>
          <p className="text-left mb-4">
            {" "}
            - Concerning Activity Data (AD), calculation methodology with less
            uncertainty has been prioritized.{" "}
          </p>
        </div>
      </div>
    </>
  );
};
export default Quantificationemissions;
