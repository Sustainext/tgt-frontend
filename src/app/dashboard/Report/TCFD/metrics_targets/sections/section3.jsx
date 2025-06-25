"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setClimateTargets,
  setClosingRemarks, // Add this new action to your Redux slice
  selectMetricsTargets,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section3 = ({ section7_3Ref, data, tcfdCollectData, orgName }) => {
  const dispatch = useDispatch();
  const metricsTargets = useSelector(selectMetricsTargets);
  const editorRef1 = useRef(null);
  const editorRef2 = useRef(null);

  // Extract targets data from tcfdCollectData
  const climateTargets = tcfdCollectData?.targets_used_to_manage_climate_related_risks_and_opportunities_and_performance_against_targets || [];

  // Jodit Editor configuration
  const config = {
    readonly: false,
    height: 200,
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'font', 'fontsize', '|',
      'align', '|',
      'undo', 'redo'
    ],
  };

  // Auto-fill functions
  const loadTargetsAutoFillContent = () => {
    const autoFillContent = `<p>${orgName || '[Company Name]'} has adopted a formal process for setting and monitoring climate-related targets as part of its broader sustainability and risk management strategy. These targets guide the company's response to climate-related risks and opportunities, ensuring alignment with long-term business and sustainability goals.</p>
<br/>
<p>To ensure clarity and comparability, targets are defined using established metric categories and key performance indicators.</p>
<br/>
<p>Overall, ${orgName || '[Company Name]'}'s approach to climate target-setting reflects a commitment to proactive climate management and supports its transition to a more sustainable and resilient operating model.</p>`;
    
    dispatch(setClimateTargets(autoFillContent));
    if (editorRef1.current) {
      editorRef1.current.value = autoFillContent;
    }
  };

  const loadClosingRemarksAutoFillContent = () => {
    const autoFillContent = `<p>As climate-related risks and opportunities continue to evolve, ${orgName || '[Company Name]'} remains committed to enhancing the transparency, consistency, and depth of our climate-related disclosures. This report reflects our ongoing efforts to integrate climate considerations into our governance, strategy, risk management, and performance monitoring processes. We recognize that collective action is paramount, and we will continue to strengthen our capabilities, refine our approach, and engage with stakeholders to build a resilient, low-carbon future.</p>`;
    
    dispatch(setClosingRemarks(autoFillContent));
    if (editorRef2.current) {
      editorRef2.current.value = autoFillContent;
    }
  };

  const handleTargetsEditorChange = (content) => {
    dispatch(setClimateTargets(content));
  };

  const handleClosingRemarksEditorChange = (content) => {
    dispatch(setClosingRemarks(content));
  };

  // Helper function to render array values
  const renderArrayValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value || '';
  };

  const TargetsTable = ({ title, data, columns }) => (
    <div className="mb-8">
      <div className="overflow-x-auto">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-sky-500/5 to-lime-500/5">
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
              {data && data.length > 0 ? data.map((row, index) => (
                <tr
                  key={index}
                  className="bg-white border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="border-r border-gray-200 p-4 text-gray-700">{row.RelatedTarget || '-'}</td>
                  <td className="border-r border-gray-200 p-4 text-gray-700">{renderArrayValue(row.MetricCategory)}</td>
                  <td className="border-r border-gray-200 p-4 text-gray-700">{row.TargetType || '-'}</td>
                  <td className="border-r border-gray-200 p-4 text-gray-700">{row.MetricUnit || '-'}</td>
                  <td className="border-r border-gray-200 p-4 text-gray-700">{row.BaseYear || '-'}</td>
                  <td className="border-r border-gray-200 p-4 text-gray-700">{row.BaselineValue || '-'}</td>
                  <td className="border-r border-gray-200 p-4 text-gray-700">{row.TargetTimeFrame || '-'}</td>
                  <td className="border-r border-gray-200 p-4 text-gray-700">{row.TargetValue || '-'}</td>
                  <td className="border-r border-gray-200 p-4 text-gray-700">{row.TargetGoals || '-'}</td>
                  <td className="border-r border-gray-200 p-4 text-gray-700">{row.PerformanceIndicators || '-'}</td>
                  <td className="p-4 text-gray-700">{row.MethodologyUsed || '-'}</td>
                </tr>
              )) : (
                <tr className="bg-white border-t border-gray-200">
                  <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                    No targets data available
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
        <div id="section7_3" ref={section7_3Ref}>
          {/* 7.3 Climate Targets - Main Header */}
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            7.3 Targets used to manage climate related risks and opportunities and performance against targets.
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start">
            <p className="text-[15px] text-[#667085] mb-2 mt-0">
              Add a statement about targets set to manage climate risks and opportunities, and the company's performance against them.
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadTargetsAutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRef1}
              value={metricsTargets.climateTargets}
              config={{...config, placeholder: "Add a statement about targets set to manage climate risks and opportunities, and the company's performance against them."}}
              tabIndex={1}
              onBlur={handleTargetsEditorChange}
              onChange={handleTargetsEditorChange}
            />
          </div>

          {/* Climate Targets Table */}
          {climateTargets.length > 0 ? (
            <TargetsTable
              title="Climate Targets and Performance"
              data={climateTargets}
              columns={[
                "Key Metrics or Climate Related Target",
                "Target Metric Category",
                "Target Type",
                "Metric Unit",
                "Base Year",
                "Base line value",
                "Target Time Frame",
                "Target Value",
                "Target Goals",
                "Key Performance Indicator",
                "Methodology Used"
              ]}
            />
          ) : (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                No climate targets data available. Please complete the targets questionnaire to see detailed targets and performance information here.
              </p>
            </div>
          )}

          {/* Closing Remarks Section */}
          <div className="mt-8">

            <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start">
              <div className="text-slate-700 text-base font-normal font-['Manrope'] leading-tight">Add your closing remarks here</div>
              <button
                className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
                onClick={loadClosingRemarksAutoFillContent}
              >
                <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
                Auto Fill
              </button>
            </div>

            <div className="mb-6">
              <JoditEditor
                ref={editorRef2}
                value={metricsTargets.closingRemarks}
                config={{...config, placeholder: "Add your closing remarks here."}}
                tabIndex={2}
                onBlur={handleClosingRemarksEditorChange}
                onChange={()=>{}}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Section3;