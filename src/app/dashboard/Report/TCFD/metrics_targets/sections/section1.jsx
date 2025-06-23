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

const Section1 = ({ section7_1Ref, data, tcfdCollectData, orgName }) => {
  const dispatch = useDispatch();
  const metricsTargets = useSelector(selectMetricsTargets);
  const editorRef1 = useRef(null);
  const editorRef2 = useRef(null);

  // Extract metrics data from tcfdCollectData
  const riskMetrics = tcfdCollectData?.metrics_used_to_assess_climate_related_risks_and_opportunities || [];
  const opportunityMetrics = tcfdCollectData?.metrics_used_to_assess_climate_related_opportunities || [];

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
    const autoFillContent = `<p>${orgName || '[Company Name]'} applies a systematic process to track and manage climate-related risks and opportunities through clearly defined metrics and targets. Metrics help monitor and evaluate climate performance, while targets provide directional goals to guide decision-making and track long-term progress. Together, they support alignment with the company's overall business and sustainability objectives.</p>`;

    dispatch(setClimateMetrics(autoFillContent));
    
    // Force update the JoditEditor if it's mounted
    if (editorRef1.current) {
      editorRef1.current.value = autoFillContent;
    }
  };

  const loadAutoFillContent2 = () => {
    const autoFillContent = `<p>As ${orgName || '[Company Name]'} operates in a dynamic business environment, we recognize the importance of integrating sector-specific considerations into our climate metrics and targets framework. Our approach includes industry-specific indicators, regulatory compliance metrics, and stakeholder-relevant performance measures that align with sector best practices and emerging standards.</p>`;

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

  // Helper function to render array values
  const renderArrayValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value || '';
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
              {data.length > 0 ? data.map((row, index) => (
                <tr
                  key={index}
                  className="bg-white border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="border-r border-gray-200 p-4 text-gray-700">
                    {renderArrayValue(row.MetricCategory)}
                  </td>
                  <td className="border-r border-gray-200 p-4 text-gray-700">
                    {row.KeyMetric || ''}
                  </td>
                  <td className="border-r border-gray-200 p-4 text-gray-700">
                    {row.ClimateRelatedRisk || ''}
                  </td>
                  <td className="border-r border-gray-200 p-4 text-gray-700">
                    {row.MetricValue || ''}
                  </td>
                  <td className="border-r border-gray-200 p-4 text-gray-700">
                    {row.MetricUnit || ''}
                  </td>
                  <td className="p-4 text-gray-700">
                    {row.TimeHorizon || ''}
                  </td>
                </tr>
              )) : (
                <tr className="bg-white border-t border-gray-200">
                  <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
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

          {/* Climate-Related Risk Metrics Table */}
          <MetricsTable
            title="Metrics used to assess climate-related risks"
            data={riskMetrics}
            columns={[
              "Metric Category",
              "Key Metric",
              "Climate Related Risk",
              "Metric Value",
              "Metric Unit",
              "Time Horizon"
            ]}
          />

          {/* Climate-Related Opportunity Metrics Table */}
          <MetricsTable
            title="Metrics used to assess climate-related opportunities"
            data={opportunityMetrics}
            columns={[
              "Metric Category",
              "Key Metric",
              "Climate Related Opportunity",
              "Metric Value",
              "Metric Unit",
              "Time Horizon"
            ]}
          />

          {/* Show message if no metrics data available */}
          {riskMetrics.length === 0 && opportunityMetrics.length === 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                No climate-related metrics data available. Please complete the questionnaire to see detailed metrics information here.
              </p>
            </div>
          )}

          {/* Integration of Climate Related Metrics into Remuneration Policies */}
          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Integration of Climate-Related Metrics into Remuneration Policies
            </h4>
            <div className="text-sm">
              {/* This will be populated from API when available */}
              {data?.remuneration_integration || "Information about climate metrics integration into remuneration policies will be displayed here when available."}
            </div>
          </div>

          {/* Internal Carbon Pricing Mechanisms */}
          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Internal Carbon Pricing Mechanisms
            </h4>
            <div className="text-sm">
              {/* This will be populated from API when available */}
              {data?.carbon_pricing || "Internal carbon pricing mechanism information will be displayed here when available."}
            </div>
          </div>

          {/* Revenue from Low-Carbon Products and Services */}
          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Revenue from Low-Carbon Products and Services
            </h4>
            <div className="text-sm">
              {/* This will be populated from API when available */}
              {data?.low_carbon_revenue || "Revenue from low-carbon products and services information will be displayed here when available."}
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