"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setClimateMetrics,
  selectMetricsTargets,
  setSectorInfo
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section1 = ({ section7_1Ref, data, orgName }) => {
  const dispatch = useDispatch();
  const metricsTargets = useSelector(selectMetricsTargets);
  const editorRef1 = useRef(null);
  const editorRef2 = useRef(null);

  // Jodit Editor configuration
  const config = {
    readonly: false,
    placeholder: "Add a statement about the company's climate-related metrics.",
    height: 300,
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "|",
      "align",
      "|",
      "undo",
      "redo",
    ],
  };

  const loadAutoFillContent = () => {
    const autoFillContent = `<p>(Fetch company name here) ${orgName || '[Company Name]'} applies a systematic process to track and manage climate-related risks and opportunities through clearly defined metrics and targets. Metrics help monitor and evaluate climate performance, while targets provide directional goals to guide decision-making and track long-term progress. Together, they support alignment with the company's overall business and sustainability objectives.</p>`;

    dispatch(setClimateMetrics(autoFillContent));
    
    // Force update the JoditEditor if it's mounted
    if (editorRef1.current) {
      editorRef1.current.value = autoFillContent;
    }
  };

  const loadAutoFillContent2 = () => {
    const autoFillContent = `<p>As ${orgName || '[Company Name]'} applies a systematic process to track and manage climate-related risks and opportunities through clearly defined metrics and targets. Metrics help monitor and evaluate climate performance, while targets provide directional goals to guide decision-making and track long-term progress. Together, they support alignment with the company’s overall business and sustainability objectives. >`;

    dispatch(setSectorInfo(autoFillContent));
    
    // Force update the JoditEditor if it's mounted
    if (editorRef2.current) {
      editorRef2.current.value = autoFillContent;
    }
  };

  const handleEditorChange = (content) => {
    dispatch(setClimateMetrics(content));
  };

  const handleSectorInfoChange = (content) => {
    dispatch(setSectorInfo(content));
  };

  // Mock data for metrics tables
  const mockMetricsData = {
    climateRelatedMetrics: [
      {
        metric: "Total GHG Emissions",
        unit: "tCO2e",
        current: "15,420",
        previous: "16,250",
        change: "-5.1%",
      },
      {
        metric: "Energy Consumption",
        unit: "MWh",
        current: "8,750",
        previous: "9,100",
        change: "-3.8%",
      },
      {
        metric: "Water Usage",
        unit: "m³",
        current: "12,500",
        previous: "13,200",
        change: "-5.3%",
      },
    ],
    scopeRelatedMetrics: [
      {
        scope: "Scope 1",
        emissions: "3,245",
        unit: "tCO2e",
        percentage: "21%",
      },
      {
        scope: "Scope 2",
        emissions: "7,890",
        unit: "tCO2e",
        percentage: "51%",
      },
      {
        scope: "Scope 3",
        emissions: "4,285",
        unit: "tCO2e",
        percentage: "28%",
      },
    ],
  };

  const MetricsTable = ({ title, data, columns }) => (
    <div className="mb-8">
      <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">{title}</h4>
      <div className="overflow-x-auto">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="">
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className={`py-8 px-4 text-left text-gray-600 font-medium ${
                      index < columns.length - 1
                        ? "border-r border-gray-200"
                        : ""
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="bg-white border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  {Object.values(row).map((value, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`p-4 text-gray-700 ${
                        cellIndex < Object.values(row).length - 1
                          ? "border-r border-gray-200"
                          : ""
                      }`}
                    >
                      {value || "Data"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div>
        <div id="section7_1" ref={section7_1Ref}>
          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start">
            <p className="text-[15px] text-[#667085] mb-2 mt-0">
              Add a statement about the company's climate-related metrics.
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadAutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRef1}
              value={metricsTargets.climateMetrics}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
              onChange={handleEditorChange}
            />
          </div>

          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            7.1 Climate-Related Metrics
          </h3>
          
          <div className="bg-blue-50 p-4 rounded border mb-6">
            <p className="text-blue-600 text-sm mb-2">
              (This will be a text box with autofill button)
            </p>
          </div>

          <div className="text-gray-500 text-base font-normal font-['Manrope'] leading-tight mb-6">
            <p className="mb-4">
              {orgName || '[Company Name]'} uses clearly defined metrics to monitor and evaluate climate-related risks and 
              opportunities as part of its broader sustainability management framework. These metrics support risk assessment, 
              strategic planning, and operational decision-making.
            </p>
            <p className="mb-4">
              To understand potential vulnerabilities and exposures from evolving environmental, regulatory, or market conditions, 
              {orgName || '[Company Name]'} applies climate-related metrics that are periodically reviewed to inform risk management 
              strategies and ensure alignment with long-term business objectives.
            </p>
            <p className="mb-4">
              Where applicable, both historical and forward-looking performance is tracked to assess past trends and anticipate 
              future outcomes. The scope and timeframe of assessment are determined based on internal relevance and materiality.
            </p>
            <p className="mb-4">
              All methodologies for calculating and interpreting metrics follow industry-aligned practices and internal protocols. 
              These may evolve over time to reflect improvements in data quality and reporting standards. In certain cases, 
              climate-related metrics are also incorporated into business planning and performance evaluation frameworks, further 
              embedding climate considerations across operations and governance.
            </p>
          </div>

          {/* Climate-Related Metrics Table */}
          <MetricsTable
            title="Metrics used to assess climate-related risks and opportunities"
            data={
              data.climateRelatedMetrics ||
              mockMetricsData.climateRelatedMetrics
            }
            columns={[
              "Metric",
              "Unit",
              "Current Year",
              "Previous Year",
              "Change (%)",
            ]}
          />

          {/* Scope-Related Metrics Table */}
          <MetricsTable
            title="Metrics used to assess climate-related opportunities"
            data={
              data.scopeRelatedMetrics || mockMetricsData.scopeRelatedMetrics
            }
            columns={["Scope", "Emissions", "Unit", "Percentage of Total"]}
          />

          {/* Additional sections */}
          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Integration of Climate-Related Metrics into Remuneration Policies
            </h4>
            <div className="bg-blue-50 p-4 rounded border">
              <p className="text-blue-600 text-sm mb-2">
                (Response from "Does climate-related metrics being part of the
                remuneration linked policies of the organization" question,
                without heading)
              </p>
              <div className="text-sm text-gray-700">
                {data.remuneration_integration ||
                  "Information about climate metrics integration into remuneration policies will be displayed here."}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Internal Carbon Pricing Mechanisms
            </h4>
            <div className="bg-blue-50 p-4 rounded border">
              <p className="text-blue-600 text-sm mb-2">
                (Note for devs: A tailored version of the "Metrics used to
                assess climate related opportunities" section's data is required
                here. i.e. skip yes/no response) (If 'Yes' option is selected
                for the question "Has your organization implemented an internal
                carbon pricing mechanism?", fetch response from TCFD-M&T-A, "If
                Yes, please provide details" without heading)
              </p>
              <div className="text-sm text-gray-700">
                {data.carbon_pricing ||
                  "Internal carbon pricing mechanism information will be displayed here."}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Revenue from Low-Carbon Products and Services
            </h4>
            <div className="bg-blue-50 p-4 rounded border">
              <p className="text-blue-600 text-sm mb-2">
                (Note for devs: A tailored version of the "Metrics used to
                assess climate related opportunities" section's data is required
                here. i.e. skip yes/no response) (If 'Yes' option is selected
                for the question "Does your organization generate revenue from
                products or services designed for a low-carbon economy?", fetch
                response from TCFD-M&T-A "If Yes, please provide details"
                without heading)
              </p>
              <div className="text-sm text-gray-700">
                {data.low_carbon_revenue ||
                  "Revenue from low-carbon products and services information will be displayed here."}
              </div>
            </div>
          </div>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start mt-6">
            <p className="text-[15px] text-[#667085] mb-2 mt-0">
              Add sector-specific (e.g., financial or non-financial) information relevant to the 'metrics & targets' disclosures, in line with TCFD sector guidance (if applicable).
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadAutoFillContent2} 
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRef2}
              value={metricsTargets.sectorInfo}
              config={{...config, placeholder: "Add sector-specific information relevant to the 'metrics & targets' disclosures"}}
              tabIndex={2}
              onBlur={handleSectorInfoChange}
              onChange={handleSectorInfoChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Section1;