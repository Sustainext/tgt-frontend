"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setScope2Emissions,
  selectMetricsTargets,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section3 = ({ section7_3Ref, data, orgName }) => {
  const dispatch = useDispatch();
  const metricsTargets = useSelector(selectMetricsTargets);
  const editorRef = useRef(null);

  // Jodit Editor configuration
  const config = {
    readonly: false,
    placeholder: "Add details about the organization's Scope 2 GHG emissions and calculation approach.",
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

  const loadAutoFillContent = () => {
    const autoFillContent = `<p>Our Scope 2 emissions result from the consumption of purchased electricity, heating, cooling, and steam. We calculate these emissions using both location-based and market-based approaches as recommended by the GHG Protocol Scope 2 Guidance.</p>`;
    
    dispatch(setScope2Emissions(autoFillContent));
  };

  const handleEditorChange = (content) => {
    dispatch(setScope2Emissions(content));
  };

  // Mock data for scope 2 emissions
  const mockScope2Data = [
    { source: "Purchased Electricity", emissions: "6,750", unit: "tCO2e", percentage: "86%" },
    { source: "Purchased Heating", emissions: "890", unit: "tCO2e", percentage: "11%" },
    { source: "Purchased Cooling", emissions: "250", unit: "tCO2e", percentage: "3%" }
  ];

  return (
    <>
      <div>
        <div id="section7_3" ref={section7_3Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            7.3 Scope 2 Emissions
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
            <p className="text-[15px] text-[#667085] mb-2 mt-3">
              Add details about the organization's Scope 2 GHG emissions and calculation approach.
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
              ref={editorRef}
              value={metricsTargets.scope2Emissions}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
              onChange={() => {}}
            />
          </div>

          {/* Blue placeholder for GHG emissions data */}
          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (Response from GHG 2.1 "Scope 2 - Total emissions")
            </p>
            <div className="text-sm text-gray-700">
              {data.scope2_total || "Total Scope 2 emissions data will be displayed here from GHG calculations."}
            </div>
          </div>

          {/* Scope 2 Emissions Breakdown Table */}
          <div className="mb-8">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Scope 2 Emissions Breakdown
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Emission Source</th>
                    <th className="border border-gray-300 p-2 text-left">Emissions</th>
                    <th className="border border-gray-300 p-2 text-left">Unit</th>
                    <th className="border border-gray-300 p-2 text-left">% of Total Scope 2</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.scope2Breakdown || mockScope2Data).map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{row.source}</td>
                      <td className="border border-gray-300 p-2">{row.emissions}</td>
                      <td className="border border-gray-300 p-2">{row.unit}</td>
                      <td className="border border-gray-300 p-2">{row.percentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Methodology */}
          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Methodology by Source
            </h4>
            <div className="bg-blue-50 p-4 rounded border">
              <p className="text-blue-600 text-sm mb-2">
                (Response from "The methodology by source")
              </p>
              <div className="text-sm text-gray-700">
                {data.scope2_methodology || "Scope 2 emissions calculation methodology will be displayed here."}
              </div>
            </div>
          </div>

          {/* Methodology by Activity */}
          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Methodology by Activity
            </h4>
            <div className="bg-blue-50 p-4 rounded border">
              <p className="text-blue-600 text-sm mb-2">
                (Response from "The methodology by Activity")
              </p>
              <div className="text-sm text-gray-700">
                {data.scope2_methodology_activity || "Scope 2 emissions methodology by activity will be displayed here."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section3;