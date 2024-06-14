'use client'
import React, { useRef } from "react";
import JoditEditor from "jodit-react";

function Datacollection({
  souresdata,
  display,
  selectedOptions,
  setSelectedOptions,
  excludedsources,
  setExcludedsources,
}) {
  const orgname = localStorage.getItem("reportorgname");
  const sourcesData = souresdata.flatMap((corporate) => corporate.sources || []); // Flatten sources if nested

  // Filter sources by scope
  const scope1 = sourcesData.filter((source) => source.scope_name === "Scope-1");
  const scope2 = sourcesData.filter((source) => source.scope_name === "Scope-2");
  const scope3 = sourcesData.filter((source) => source.scope_name === "Scope-3");

  // Calculate total CO2e emissions for each scope
  const calculateTotalEmissions = (scope) => {
    return scope.reduce((acc, curr) => {
      const co2e = parseFloat(curr.total_co2e);
      return acc + (isNaN(co2e) ? 0 : co2e);
    }, 0).toFixed(2);
  };

  const totalone = calculateTotalEmissions(scope1);
  const totaltwo = calculateTotalEmissions(scope2);
  const totalthree = calculateTotalEmissions(scope3);

  const handleSelectChange = (compositeKey, selectedValue) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [compositeKey]: selectedValue,
    }));
  };

  const handleEditorChange = (newContent) => {
    setExcludedsources(newContent);
  };

  const editor = useRef(null);
  const config = {
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: 'insert_clear_html',
    height: 400, // sets the height to 400 pixels
  };

  const options = [
    { value: "Bill/Invoice", label: "Bill/Invoice" },
    { value: "meter-information", label: "Meter Information" },
    { value: "iot-sensor", label: "IoT Sensor" },
    { value: "excel-spreadsheet/manual-record", label: "Excel Spreadsheet/Manual Record" },
    { value: "erp/crm-system", label: "ERP/CRM System" },
    { value: "travel-management-system", label: "Travel Management System" },
    { value: "distance-based-method", label: "Distance-based Method" },
    { value: "trip-itinerary", label: "Trip Itinerary" },
  ];

  return (
    <>
      <div className="div">
        <div className="px-3">
          <h3 className="text-left mb-2 p-3">
            <b>DATA COLLECTION AND QUANTIFICATION METHODOLOGY</b>
          </h3>
          <div className="box rounded-lg p-4">
            <h4 className="text-left mb-2">
              <b>Data Collection and Monitoring Methodology </b>
            </h4>
            <p className="text-left wordsping">
              All emission activity data is collected from multiple data owners
              using the Sustainext platform. Data is centralized on the platform
              and is reviewed for completeness, accuracy, duplication and human
              errors.
            </p>
          </div>
        </div>
        <div className="px-3">
          <div className="box rounded-lg p-4">
            <h4 className="text-left mb-2">
              <b>Quantification Methodology </b>
            </h4>
            <p className="text-left mb-4">
              The process of identifying GHG emission sources is the first step
              involved in the quantification of GHG emissions. The GHG sources
              are then classified following the GHG Protocol – Corporate
              Standard. This is followed by gathering accurate activity data.
              Selection of nationally or internationally accepted emission
              factors is a crucial step and these are available through DEFRA,
              IPCC and National GHG Inventories for the calculation of GHG
              emissions.
            </p>
            <p className="text-left wordsping">
              {orgname} {display} GHG inventory is based on the activity data
              and the use of appropriate emission factors to arrive at a total
              emission value or carbon footprint.
            </p>
          </div>
        </div>
        <div className="px-3">
          <div className="box rounded-lg p-4 mb-5">
            <h4 className="text-left">
              <b>GHG Emission Activity Data Sources </b>
            </h4>
            <p className="text-left mb-4 wordsping">
              The following table shows the sources of emissions for which
              activity data has been collected along with the sources of data:
            </p>
            <p className="text-left mb-2">Table 3: Emission Sources</p>
            <table className="min-w-full leading-normal border border-slate-200 rounded-lg">
              <thead className="border-s-slate-200">
                <tr className="border-s-slate-200">
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                    Emission Source
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Data Source
                  </th>
                </tr>
              </thead>
              <tbody>
                {sourcesData &&
                  sourcesData.map((data) => {
                    const compositeKey = `${data.source_name}-${data.category_name}`;
                    return (
                      <tr key={compositeKey}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                          {data.source_name}-{data.category_name}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <select
                            className="block w-[210px] py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b"
                            value={selectedOptions[compositeKey] || ""}
                            onChange={(e) =>
                              handleSelectChange(compositeKey, e.target.value)
                            }
                          >
                            <option value="" disabled>
                              --Select options--
                            </option>
                            {options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="box rounded-lg p-4 mb-5">
            <h4 className="text-left">
              <b>Excluded Sources </b>
            </h4>
            <p className="text-left mb-2 wordsping">
              The following sources of emissions have been excluded from the
              calculation of {orgname} total emissions
            </p>
            <form>
              <JoditEditor
                ref={editor}
                value={excludedsources}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={handleEditorChange} // preferred to use only this option to update the content for performance reasons
              />
            </form>
          </div>
          <div className="box rounded-lg p-4 mb-5">
            <h4 className="text-left">
              <b>Emission Factors Considered</b>
            </h4>
            <p className="text-left mb-2">Table 4: Emission Factors</p>
            <table className="min-w-full leading-normal border border-slate-200 rounded-lg">
              <thead className="border-s-slate-200">
                <tr className="border-s-slate-200">
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                    Emission Factor Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Unit
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Year
                  </th>
                </tr>
              </thead>
              <tbody>
                {sourcesData &&
                  sourcesData.map((data, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                        {data.category_name} - {data.activity_name?.split(' - ')[0] ?? ''}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {data.co2e_unit}CO<sub>2</sub>e/
                        {data.activity_data && (
                          <>{data.activity_data.activity_unit}</>
                        )}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {data.source}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {display}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="px-3">
          <div className="box rounded-lg p-4 mb-5">
            <h4 className="text-left">
              <b>Quantification of Direct & Indirect Emissions </b>
            </h4>
            <p className="text-left mb-4 wordsping">
              The following are the direct and indirect emissions from{" "}
              <b>{orgname}</b> operations during FY <b>{display}</b>
            </p>
            <h5 className="text-left mb-4">Direct GHG Emission: Scope 1</h5>
            <p className="text-left mb-2">Table 5 : Scope 1</p>
            <table className="min-w-full leading-normal border border-slate-200 rounded-lg">
              <thead className="border-s-slate-200 mb-5">
                <tr className="border-s-slate-200">
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                    Scope 1 - Activity
                  </th>
                  <th className="px-5 py-3 text-center border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Consumption {display}
                  </th>
                  <th className="px-5 py-3 text-center border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Greenhouse Gas Emissions {display}{" "}
                    <p className="normal-case">(tCO2e)</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {scope1 &&
                  scope1.map((data, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                        {data.source_name} - {data.category_name}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        {data.activity_data && (
                          <>
                            {data.activity_data.activity_value}{" "}
                            {data.activity_data.activity_unit}
                          </>
                        )}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        {data.total_co2e}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <p className="text-left mb-2 mt-4 wordsping">
              The total Scope 1 emissions from {orgname} were {totalone} tCO2e
              for FY {display}
            </p>
          </div>
          <div className="box rounded-lg p-4 mb-5">
            <h4 className="text-left">
              <b>Indirect GHG Emission: Scope 2</b>
            </h4>
            <p className="text-left mb-4 wordsping">
              The grid electricity purchased to run operations for the {orgname}{" "}
              offices/factories along with the purchased backup electricity and
              purchased cooling/HVAC are considered indirect emissions (Scope 2)
            </p>
            <p className="text-left">Table 6: Scope 2</p>
            <table className="min-w-full leading-normal border border-slate-200 rounded-lg">
              <thead className="border-s-slate-200 mb-5">
                <tr className="border-s-slate-200">
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                    Scope 2 - Activity
                  </th>
                  <th className="px-5 py-3 text-center border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Consumption {display}
                  </th>
                  <th className="px-5 py-3 text-center border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Greenhouse Gas Emissions {display}{" "}
                    <p className="normal-case">(tCO2e)</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {scope2 &&
                  scope2.map((data, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                        {data.source_name} - {data.category_name}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        {data.activity_data && (
                          <>
                            {data.activity_data.activity_value}{" "}
                            {data.activity_data.activity_unit}
                          </>
                        )}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        {data.total_co2e}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <p className="text-left mt-4 wordsping">
              The total Scope 2 emissions from {orgname} were {totaltwo} tCO2e
              for FY {display}
            </p>
          </div>
          <div className="box rounded-lg p-4 mb-5">
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
                    Scope 3 - Activity
                  </th>
                  <th className="px-5 py-3 text-center border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Consumption {display}
                  </th>
                  <th className="px-5 py-3 text-center border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Greenhouse Gas Emissions {display}{" "}
                    <p className="normal-case">(tCO2e)</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {scope3 &&
                  scope3.map((data, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                        {data.source_name} - {data.category_name}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        {data.activity_data && (
                          <>
                            {data.activity_data.activity_value}{" "}
                            {data.activity_data.activity_unit}
                          </>
                        )}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        {data.total_co2e}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <p className="text-left mb-2 mt-4 wordsping">
              The total Scope 3 emissions from {orgname} were {totalthree} tCO2e
              for FY {display}
            </p>
          </div>
          <div className="box rounded-lg p-4 mb-5">
            <h4 className="text-left">
              <b>Reducing uncertainties </b>
            </h4>
            <p className="text-left mb-4 wordsping">
              It is assumed that there is +/- 5% to 10 % uncertainty associated
              with the calculation of total emission of {orgname} each year. It
              is based on the following:
            </p>
            <p className="text-left mb-4 wordsping">
              - Based on the accuracy of the activity data collected, the
              uncertainty associated can be approximately 5%.
            </p>
            <p className="text-left mb-4 wordsping">
              - Uncertainty associated with estimating emission factors.
            </p>
            <p className="text-left mb-4 wordsping">
              - Concerning Activity Data (AD), calculation methodology with less
              uncertainty has been prioritized.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Datacollection;

