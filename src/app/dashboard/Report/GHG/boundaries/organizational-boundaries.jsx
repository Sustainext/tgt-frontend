import React from "react";

function Organizationalboundaries({ locatiodata, setBoundaries, boundaries }) {
  const orgname = localStorage.getItem("reportorgname");
  const handleBoundaries = (event) => {
    setBoundaries(event.target.value);
  };
  return (
    <>
      <div className="div">
        <div className="px-3">
          <h3 className="text-left mb-2 p-3">
            <b>BOUNDARIES</b>
          </h3>
          <div className="box rounded-lg p-4">
            <h4 className="text-left mb-2">
              <b>Organizational boundaries </b>
            </h4>
            <p className="text-left wordsping">
              According to the GHG Protocol – Corporate Standard, the reporting
              company must set the scope and boundary for calculation of
              emissions by deciding the approach to consolidate GHG emissions.{" "}
              {orgname} adopts the
              <select
                className=" mx-2 w-[26%] rounded-md border-0 py-1 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={boundaries}
                onChange={handleBoundaries}
              >
                <option>---Select options---</option>
                <option value="Operational">Operational Control</option>
                <option value="Financial">Financial Control</option>
                <option value="Equity">Equity Share</option>
              </select>
              approach to consolidate and report on its emissions.
            </p>
          </div>
        </div>
        <div className="px-3">
          <div className="box rounded-lg p-4">
            <h4 className="text-left mb-2">
              <b>Operational boundaries </b>
            </h4>
            <p className="text-left mb-4 wordsping">
              The following table lists the sites operated by {orgname} and
              their corresponding addresses:
            </p>
            <div>
              <div className="mb-5">
                <p className="text-left mb-3 font-bold">
                  Table2 : Geographical Locations of Offices / Factories
                </p>
                <table className="min-w-full leading-normal border border-slate-200 rounded-lg">
                  <thead className="border-s-slate-200">
                    <tr className="border-s-slate-200">
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Site
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Address
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {locatiodata &&
                      locatiodata.flatMap((corporate, corpIndex) =>
                        corporate.locations.map((location, index) => (
                          <tr key={`${corpIndex}-${index}`}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              {location.location_name}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              {location.location_type}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              {location.location_address}
                            </td>
                          </tr>
                        ))
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Organizationalboundaries;
