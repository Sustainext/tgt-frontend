"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setScope1Emissions,
  setScope2Emissions,
  setScope3Emissions,
  selectMetricsTargets,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section2 = ({ section7_2Ref, data, orgName }) => {
  const dispatch = useDispatch();
  const metricsTargets = useSelector(selectMetricsTargets);
  const editorRef1 = useRef(null);
  const editorRef2 = useRef(null);
  const editorRef3 = useRef(null);
  const editorRef4 = useRef(null);
  const editorRef5 = useRef(null);
  const editorRef6 = useRef(null);

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

  // Scope 1 autofill
  const loadScope1AutoFillContent = () => {
    const autoFillContent = `<p>Our Scope 1 emissions primarily result from direct combustion in owned or controlled sources, including company vehicles, on-site fuel combustion, and process emissions. ${orgName || '[Company Name]'} follows the GHG Protocol Corporate Accounting and Reporting Standard for calculation and reporting of these emissions, ensuring accurate measurement and transparent disclosure of our direct greenhouse gas impacts.</p>`;
    
    dispatch(setScope1Emissions(autoFillContent));
    
    if (editorRef1.current) {
      editorRef1.current.value = autoFillContent;
    }
    if (editorRef2.current) {
      editorRef2.current.value = autoFillContent;
    }
  };

  // Scope 2 autofill
  const loadScope2AutoFillContent = () => {
    const autoFillContent = `<p>Scope 2 emissions are indirect greenhouse gas emissions from the consumption of purchased electricity, steam, heating, and cooling. ${orgName || '[Company Name]'} follows the GHG Protocol Corporate Accounting and Reporting Standard for calculation and reporting of these emissions, ensuring accurate measurement and transparent disclosure of our indirect energy-related greenhouse gas impacts.</p>`;
    
    dispatch(setScope2Emissions(autoFillContent));
    
    if (editorRef3.current) {
      editorRef3.current.value = autoFillContent;
    }
    if (editorRef4.current) {
      editorRef4.current.value = autoFillContent;
    }
  };

  // Scope 3 autofill
  const loadScope3AutoFillContent = () => {
    const autoFillContent = `<p>Scope 3 emissions include all other indirect emissions that occur in ${orgName || '[Company Name]'}'s value chain, including both upstream and downstream activities. This encompasses emissions from purchased goods and services, business travel, employee commuting, waste disposal, and product use. ${orgName || '[Company Name]'} follows the GHG Protocol Corporate Value Chain (Scope 3) Accounting and Reporting Standard for calculation and reporting of these emissions.</p>`;
    
    dispatch(setScope3Emissions(autoFillContent));
    
    if (editorRef5.current) {
      editorRef5.current.value = autoFillContent;
    }
    if (editorRef6.current) {
      editorRef6.current.value = autoFillContent;
    }
  };

  const handleScope1EditorChange = (content) => {
    dispatch(setScope1Emissions(content));
  };

  const handleScope2EditorChange = (content) => {
    dispatch(setScope2Emissions(content));
  };

  const handleScope3EditorChange = (content) => {
    dispatch(setScope3Emissions(content));
  };

  // Mock data for emissions tables
  const mockScope1Data = [
    { category: "Mobile Combustion", subcategory: "Company Vehicles", activity: "Fleet Operations", emissions: "1,245" },
    { category: "Stationary Combustion", subcategory: "On-site Fuel Combustion", activity: "Heating & Power Generation", emissions: "1,850" },
    { category: "Process Emissions", subcategory: "Manufacturing Process", activity: "Chemical Reactions", emissions: "150" }
  ];

  const mockScope2Data = [
    { category: "Purchased Electricity", subcategory: "Grid Electricity", activity: "Office & Manufacturing Operations", emissions: "4,850" },
    { category: "Purchased Steam", subcategory: "Industrial Steam", activity: "Manufacturing Processes", emissions: "2,340" },
    { category: "Purchased Heating/Cooling", subcategory: "District Energy", activity: "HVAC Systems", emissions: "700" }
  ];

  const mockScope3Data = [
    { category: "Upstream", subcategory: "Purchased Goods and Services", activity: "Raw Materials & Supplies", emissions: "12,450" },
    { category: "Upstream", subcategory: "Business Travel", activity: "Employee Air & Ground Travel", emissions: "3,200" },
    { category: "Upstream", subcategory: "Employee Commuting", activity: "Daily Commute to Work", emissions: "2,800" },
    { category: "Upstream", subcategory: "Waste Generated", activity: "Operational Waste Disposal", emissions: "1,500" },
    { category: "Downstream", subcategory: "Use of Sold Products", activity: "Product Lifecycle Usage", emissions: "9,750" }
  ];

  const ScopeTable = ({ title, data, columns }) => (
    <div className="mb-8">
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
        <div id="section7_2" ref={section7_2Ref}>
          {/* 7.2 GHG Emissions - Main Header */}
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            7.2 GHG Emissions 
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start">
            <p className="text-[15px] text-[#667085] mb-2 mt-0">
              Add details about the organization's GHG emissions and methodology.
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadScope1AutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRef1}
              value={metricsTargets.scope1Emissions}
              config={{...config, placeholder: "Add details about the organization's GHG emissions and methodology."}}
              tabIndex={1}
              onBlur={handleScope1EditorChange}
              onChange={handleScope1EditorChange}
            />
          </div>

          {/* SCOPE 1 SECTION */}
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            Scope 1 GHG Emissions
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start">
            <p className="text-[15px] text-[#667085] mb-2 mt-0">
              Add statement about company's scope 1 emissions
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadScope1AutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRef2}
              value={metricsTargets.scope1Emissions}
              config={{...config, placeholder: "Add statement about company's scope 1 emissions"}}
              tabIndex={2}
              onBlur={handleScope1EditorChange}
              onChange={handleScope1EditorChange}
            />
          </div>

          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (Response from GHG 1.1 "Scope 1 - Total emissions")
            </p>
            <div className="text-sm text-gray-700">
              {data.scope1_total || "Total Scope 1 emissions data will be displayed here from GHG calculations."}
            </div>
          </div>

          <ScopeTable
            title="Scope 1 Emissions Breakdown"
            data={data.scope1Breakdown || mockScope1Data}
            columns={["Category", "Subcategory", "Activity", "Emissions"]}
          />


          {/* SCOPE 2 SECTION */}
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold mt-8">
            Scope 2 GHG Emissions
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start">
            <p className="text-[15px] text-[#667085] mb-2 mt-0">
              Add statement about company's scope 2 emissions
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadScope2AutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRef3}
              value={metricsTargets.scope2Emissions}
              config={{...config, placeholder: "Add statement about company's scope 2 emissions"}}
              tabIndex={3}
              onBlur={handleScope2EditorChange}
              onChange={handleScope2EditorChange}
            />
          </div>

          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (Response from GHG 2.1 "Scope 2 - Total emissions")
            </p>
            <div className="text-sm text-gray-700">
              {data.scope2_total || "Total Scope 2 emissions data will be displayed here from GHG calculations."}
            </div>
          </div>

          <ScopeTable
            title="Scope 2 Emissions Breakdown"
            data={data.scope2Breakdown || mockScope2Data}
            columns={["Category", "Subcategory", "Activity", "Emissions"]}
          />



          {/* SCOPE 3 SECTION */}
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold mt-8">
            Scope 3 GHG Emissions
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start">
            <p className="text-[15px] text-[#667085] mb-2 mt-0">
              Add statement about company's scope 3 emissions
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadScope3AutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRef5}
              value={metricsTargets.scope3Emissions}
              config={{...config, placeholder: "Add statement about company's scope 3 emissions"}}
              tabIndex={5}
              onBlur={handleScope3EditorChange}
              onChange={handleScope3EditorChange}
            />
          </div>

          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (Response from GHG 3.1 "Scope 3 - Total emissions")
            </p>
            <div className="text-sm text-gray-700">
              {data.scope3_total || "Total Scope 3 emissions data will be displayed here from GHG calculations."}
            </div>
          </div>

          <ScopeTable
            title="Scope 3 Emissions Breakdown"
            data={data.scope3Breakdown || mockScope3Data}
            columns={["Category", "Subcategory", "Activity", "Emissions"]}
          />

        </div>
      </div>
    </>
  );
};

export default Section2;