"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setClimateTargets,
  selectMetricsTargets,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section3 = ({ section7_3Ref, data, orgName }) => {
  const dispatch = useDispatch();
  const metricsTargets = useSelector(selectMetricsTargets);
  const editorRef1 = useRef(null);
  const editorRef2 = useRef(null);

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

<p>To ensure clarity and comparability, targets are defined using established metric categories and key performance indicators.</p>

<p>Overall, ${orgName || '[Company Name]'}'s approach to climate target-setting reflects a commitment to proactive climate management and supports its transition to a more sustainable and resilient operating model.</p>`;
    
    dispatch(setClimateTargets(autoFillContent));
    if (editorRef1.current) {
      editorRef1.current.value = autoFillContent;
    }
  };

  const loadClosingRemarksAutoFillContent = () => {
    const autoFillContent = `<p>As climate-related risks and opportunities continue to evolve, ${orgName || '[Company Name]'} remains committed to enhancing the transparency, consistency, and depth of our climate-related disclosures. This report reflects our ongoing efforts to integrate climate considerations into our governance, strategy, risk management, and performance monitoring processes. We recognize that collective action is paramount, and we will continue to strengthen our capabilities, refine our approach, and engage with stakeholders to build a resilient, low-carbon future.</p>`;
    
    dispatch(setClimateTargets(autoFillContent));
    if (editorRef2.current) {
      editorRef2.current.value = autoFillContent;
    }
  };

  const handleTargetsEditorChange = (content) => {
    dispatch(setClimateTargets(content));
  };

  // Mock data for climate targets table
  const mockTargetsData = [
    { 
      keyMetric: "Scope 1 & 2 GHG Emissions Reduction",
      targetCategory: "Emissions Reduction",
      targetType: "Absolute",
      metricUnit: "% reduction from baseline",
      baseYear: "2020"
    },
    { 
      keyMetric: "Renewable Energy Procurement",
      targetCategory: "Energy Transition",
      targetType: "Intensity",
      metricUnit: "% of total energy consumption",
      baseYear: "2021"
    },
    { 
      keyMetric: "Carbon Intensity Reduction",
      targetCategory: "Emissions Intensity",
      targetType: "Intensity",
      metricUnit: "tCO2e per unit of production",
      baseYear: "2020"
    },
    { 
      keyMetric: "Scope 3 Emissions Reduction",
      targetCategory: "Value Chain Emissions",
      targetType: "Absolute",
      metricUnit: "% reduction from baseline",
      baseYear: "2022"
    },
    { 
      keyMetric: "Water Use Efficiency",
      targetCategory: "Resource Management",
      targetType: "Intensity",
      metricUnit: "m³ per unit of production",
      baseYear: "2021"
    }
  ];

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

          {/* Blue placeholder for TCFD targets data */}
          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (Response from TCFD M&T-C "Targets used to manage climate related risks and opportunities and performance against targets" without heading)
            </p>
            <div className="text-sm text-gray-700">
              {data.climate_targets_response || "Climate targets and performance data will be displayed here from TCFD calculations."}
            </div>
          </div>

          {/* Climate Targets Table */}
          <div className="mb-8">
            <div className="overflow-x-auto">
              <div className="border border-blue-400 rounded-lg overflow-hidden">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="py-3 px-4 text-left text-gray-600 font-medium border-r border-blue-200">
                        Key Metrics or Climate Related Target
                      </th>
                      <th className="py-3 px-4 text-left text-gray-600 font-medium border-r border-blue-200">
                        Target Metric Category
                      </th>
                      <th className="py-3 px-4 text-left text-gray-600 font-medium border-r border-blue-200">
                        Target Type
                      </th>
                      <th className="py-3 px-4 text-left text-gray-600 font-medium border-r border-blue-200">
                        Metric Unit
                      </th>
                      <th className="py-3 px-4 text-left text-gray-600 font-medium">
                        Base Year
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.climateTargetsTable || mockTargetsData).map((row, index) => (
                      <tr
                        key={index}
                        className="bg-white border-t border-blue-200 hover:bg-blue-25 transition-colors"
                      >
                        <td className="p-4 text-gray-700 border-r border-blue-200">
                          {row.keyMetric || "Data"}
                        </td>
                        <td className="p-4 text-gray-700 border-r border-blue-200">
                          {row.targetCategory || "Data"}
                        </td>
                        <td className="p-4 text-gray-700 border-r border-blue-200">
                          {row.targetType || "Data"}
                        </td>
                        <td className="p-4 text-gray-700 border-r border-blue-200">
                          {row.metricUnit || "Data"}
                        </td>
                        <td className="p-4 text-gray-700">
                          {row.baseYear || "Data"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Closing Remarks Section */}
          <div className="mt-8">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Add closing remarks here
            </h4>

            <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start">
              <div className="flex-1"></div>
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
                value={metricsTargets.climateTargets}
                config={{...config, placeholder: "Add closing remarks about climate targets and future commitments"}}
                tabIndex={2}
                onBlur={handleTargetsEditorChange}
                onChange={handleTargetsEditorChange}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Section3;