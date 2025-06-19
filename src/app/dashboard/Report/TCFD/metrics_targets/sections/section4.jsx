"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setScope3Emissions,
  setClimateTargets,
  selectMetricsTargets,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section4 = ({ section7_4Ref, data, orgName }) => {
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

  const loadScope3AutoFill = () => {
    const autoFillContent = `<p>Our Scope 3 emissions encompass indirect emissions throughout our value chain, including purchased goods and services, business travel, employee commuting, and end-of-life treatment of sold products. We prioritize the most significant categories and follow the GHG Protocol Corporate Value Chain (Scope 3) Accounting and Reporting Standard.</p>`;
    
    dispatch(setScope3Emissions(autoFillContent));
  };

  const loadTargetsAutoFill = () => {
    const autoFillContent = `<p>We have established science-based targets aligned with limiting global warming to 1.5°C above pre-industrial levels. Our targets include both near-term (2030) and long-term (2050) commitments covering all relevant emission scopes. We regularly monitor progress and adjust our strategies to ensure we remain on track to achieve these ambitious climate goals.</p>`;
    
    dispatch(setClimateTargets(autoFillContent));
  };

  const handleScope3Change = (content) => {
    dispatch(setScope3Emissions(content));
  };

  const handleTargetsChange = (content) => {
    dispatch(setClimateTargets(content));
  };

  // Mock data for scope 3 emissions and targets
  const mockScope3Data = [
    { category: "Purchased Goods & Services", emissions: "2,150", unit: "tCO2e", percentage: "50%" },
    { category: "Business Travel", emissions: "890", unit: "tCO2e", percentage: "21%" },
    { category: "Employee Commuting", emissions: "750", unit: "tCO2e", percentage: "18%" },
    { category: "Waste Generated", emissions: "495", unit: "tCO2e", percentage: "11%" }
  ];

  const mockTargetsData = [
    { target: "Net Zero by 2050", scope: "All Scopes", baseYear: "2020", progress: "15%", status: "On Track" },
    { target: "50% Reduction by 2030", scope: "Scope 1 & 2", baseYear: "2020", progress: "28%", status: "Ahead" },
    { target: "30% Reduction by 2030", scope: "Scope 3", baseYear: "2020", progress: "12%", status: "On Track" }
  ];

  return (
    <>
      <div>
        <div id="section7_4" ref={section7_4Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            7.4 Scope 3 Emissions
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
            <p className="text-[15px] text-[#667085] mb-2 mt-3">
              Add details about the organization's Scope 3 GHG emissions and value chain approach.
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadScope3AutoFill}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRef1}
              value={metricsTargets.scope3Emissions}
              config={{...config, placeholder: "Add details about the organization's Scope 3 GHG emissions and value chain approach."}}
              tabIndex={1}
              onBlur={handleScope3Change}
              onChange={() => {}}
            />
          </div>

          {/* Blue placeholder for GHG emissions data */}
          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (Response from GHG 3.1 "Scope 3 - Total emissions")
            </p>
            <div className="text-sm text-gray-700">
              {data.scope3_total || "Total Scope 3 emissions data will be displayed here from GHG calculations."}
            </div>
          </div>

          {/* Scope 3 Emissions Breakdown Table */}
          <div className="mb-8">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Scope 3 Emissions by Category
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Category</th>
                    <th className="border border-gray-300 p-2 text-left">Emissions</th>
                    <th className="border border-gray-300 p-2 text-left">Unit</th>
                    <th className="border border-gray-300 p-2 text-left">% of Total Scope 3</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.scope3Breakdown || mockScope3Data).map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{row.category}</td>
                      <td className="border border-gray-300 p-2">{row.emissions}</td>
                      <td className="border border-gray-300 p-2">{row.unit}</td>
                      <td className="border border-gray-300 p-2">{row.percentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Methodology sections */}
          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Methodology by Source
            </h4>
            <div className="bg-blue-50 p-4 rounded border">
              <p className="text-blue-600 text-sm mb-2">
                (Response from "The methodology by source")
              </p>
              <div className="text-sm text-gray-700">
                {data.scope3_methodology || "Scope 3 emissions calculation methodology will be displayed here."}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Methodology by Activity
            </h4>
            <div className="bg-blue-50 p-4 rounded border">
              <p className="text-blue-600 text-sm mb-2">
                (Response from "The methodology by Activity")
              </p>
              <div className="text-sm text-gray-700">
                {data.scope3_methodology_activity || "Scope 3 emissions methodology by activity will be displayed here."}
              </div>
            </div>
          </div>

          {/* Targets and Performance Section */}
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            7.5 Targets and Performance
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
            <p className="text-[15px] text-[#667085] mb-2 mt-3">
              Add information about climate-related targets and performance against those targets.
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadTargetsAutoFill}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRef2}
              value={metricsTargets.climateTargets}
              config={{...config, placeholder: "Add information about climate-related targets and performance against those targets."}}
              tabIndex={2}
              onBlur={handleTargetsChange}
              onChange={() => {}}
            />
          </div>

          {/* Climate Targets Table */}
          <div className="mb-8">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Climate-Related Targets and Performance
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Target</th>
                    <th className="border border-gray-300 p-2 text-left">Scope</th>
                    <th className="border border-gray-300 p-2 text-left">Base Year</th>
                    <th className="border border-gray-300 p-2 text-left">Progress</th>
                    <th className="border border-gray-300 p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.climateTargets || mockTargetsData).map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{row.target}</td>
                      <td className="border border-gray-300 p-2">{row.scope}</td>
                      <td className="border border-gray-300 p-2">{row.baseYear}</td>
                      <td className="border border-gray-300 p-2">{row.progress}</td>
                      <td className="border border-gray-300 p-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          row.status === 'On Track' ? 'bg-green-100 text-green-800' :
                          row.status === 'Ahead' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional blue placeholder sections */}
          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (If target section changes include related risks and opportunities it should display targets)
            </p>
            <div className="text-sm text-gray-700">
              {data.target_risks_opportunities || "Information about targets related to climate risks and opportunities will be displayed here."}
            </div>
          </div>

          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (Response from "Description of target and objective performance for managing climate-related issues, including how targets relate to expected regulatory, market, and technology developments" question, without heading)
            </p>
            <div className="text-sm text-gray-700">
              {data.target_performance_description || "Target performance and regulatory alignment details will be displayed here."}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section4;