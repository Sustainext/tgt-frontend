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
  setGhgIntensity,
  setGhgByScope,
  setGhgBySource,
  setGhgByBusiness,
  setGhgByLocation,
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
  const editorRef7 = useRef(null);
  const editorRef8 = useRef(null);
  const editorRef9 = useRef(null);
  const editorRef10 = useRef(null);
  const editorRef11 = useRef(null);

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

  const loadSectionAutoFillContent = () => {
    const autoFillContent = `<p>We manage our emissions through a comprehensive strategy that includes setting reduction targets, implementing energy-efficient technologies, and monitoring our progress</p>`;
    dispatch(setScope1Emissions(autoFillContent));
    if (editorRef2.current) {
      editorRef2.current.value = autoFillContent;
    }
  };

  // Auto-fill functions for each section
  const loadScope1AutoFillContent = () => {
    const autoFillContent = `<p>Scope 1 emissions are direct greenhouse gas (GHG) emissions from our operations, such as fuel combustion on-site. We measure and report these emissions annually, striving to reduce them through process optimization and cleaner technologies. </p>`;
    dispatch(setScope1Emissions(autoFillContent));
    if (editorRef2.current) {
      editorRef2.current.value = autoFillContent;
    }
  };

  const loadScope2AutoFillContent = () => {
    const autoFillContent = `<p>Scope 2 emissions are indirect GHG emissions from the consumption of purchased electricity, heat, or steam. We aim to reduce Scope 2 emissions by increasing our use of renewable energy and improving energy efficiency. .</p>`;
    dispatch(setScope2Emissions(autoFillContent));
    if (editorRef4.current) {
      editorRef4.current.value = autoFillContent;
    }
  };

  const loadScope3AutoFillContent = () => {
    const autoFillContent = `<p>Scope 3 emissions include all other indirect emissions in our value chain, such as those from suppliers and product use. We collaborate with suppliers to reduce these emissions and support initiatives that encourage sustainable practices throughout our supply chain.</p>`;
    dispatch(setScope3Emissions(autoFillContent));
    if (editorRef6.current) {
      editorRef6.current.value = autoFillContent;
    }
  };

  const loadGhgIntensityAutoFillContent = () => {
    const autoFillContent = `<p>${orgName || '[Company Name]'} calculates GHG emissions intensity to measure our environmental efficiency and track progress toward our climate goals. Our intensity metrics are expressed as tonnes of CO2 equivalent per unit of production, revenue, or other relevant business metrics, enabling meaningful comparisons over time and benchmarking against industry standards.</p>`;
    dispatch(setGhgIntensity(autoFillContent));
    if (editorRef7.current) {
      editorRef7.current.value = autoFillContent;
    }
  };

  const loadGhgByScopeAutoFillContent = () => {
    const autoFillContent = `<p>The following breakdown presents ${orgName || '[Company Name]'}'s total greenhouse gas emissions categorized by scope according to the GHG Protocol framework. This classification helps identify the most significant sources of emissions and prioritize reduction efforts across our direct operations and value chain.</p>`;
    dispatch(setGhgByScope(autoFillContent));
    if (editorRef8.current) {
      editorRef8.current.value = autoFillContent;
    }
  };

  const loadGhgBySourceAutoFillContent = () => {
    const autoFillContent = `<p>${orgName || '[Company Name]'}'s GHG emissions are categorized by source to provide detailed insight into the specific activities and processes that contribute to our carbon footprint. This granular analysis enables targeted mitigation strategies and helps track the effectiveness of our emission reduction initiatives.</p>`;
    dispatch(setGhgBySource(autoFillContent));
    if (editorRef9.current) {
      editorRef9.current.value = autoFillContent;
    }
  };

  const loadGhgByBusinessAutoFillContent = () => {
    const autoFillContent = `<p>Our GHG emissions are allocated across different business units to provide transparency on the environmental impact of each operational segment. This breakdown enables business unit leaders to understand their specific contributions to ${orgName || '[Company Name]'}'s overall carbon footprint and implement targeted reduction strategies.</p>`;
    dispatch(setGhgByBusiness(autoFillContent));
    if (editorRef10.current) {
      editorRef10.current.value = autoFillContent;
    }
  };

  const loadGhgByLocationAutoFillContent = () => {
    const autoFillContent = `<p>${orgName || '[Company Name]'}'s operations span multiple geographic locations, each with distinct emission profiles based on local energy grids, climate conditions, and operational activities. This geographic breakdown of our GHG emissions helps identify regional hotspots and supports location-specific emission reduction strategies.</p>`;
    dispatch(setGhgByLocation(autoFillContent));
    if (editorRef11.current) {
      editorRef11.current.value = autoFillContent;
    }
  };

  // Change handlers
  const handleScope1EditorChange = (content) => {
    dispatch(setScope1Emissions(content));
  };

  const handleScope2EditorChange = (content) => {
    dispatch(setScope2Emissions(content));
  };

  const handleScope3EditorChange = (content) => {
    dispatch(setScope3Emissions(content));
  };

  const handleGhgIntensityChange = (content) => {
    dispatch(setGhgIntensity(content));
  };

  const handleGhgByScopeChange = (content) => {
    dispatch(setGhgByScope(content));
  };

  const handleGhgBySourceChange = (content) => {
    dispatch(setGhgBySource(content));
  };

  const handleGhgByBusinessChange = (content) => {
    dispatch(setGhgByBusiness(content));
  };

  const handleGhgByLocationChange = (content) => {
    dispatch(setGhgByLocation(content));
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

  const mockIntensityData = [
    { metric: "Revenue Intensity", value: "15.2", unit: "tCO2e/Million USD" },
    { metric: "Production Intensity", value: "0.85", unit: "tCO2e/Unit Produced" },
    { metric: "Employee Intensity", value: "3.2", unit: "tCO2e/Employee" },
    { metric: "Floor Area Intensity", value: "0.12", unit: "tCO2e/sq meter" }
  ];

  const mockByScopeData = [
    { scope: "Scope 1", emissions: "3,245", percentage: "12.5%" },
    { scope: "Scope 2", emissions: "7,890", percentage: "30.4%" },
    { scope: "Scope 3", emissions: "14,810", percentage: "57.1%" }
  ];

  const mockBySourceData = [
    { source: "Electricity Consumption", emissions: "7,890", percentage: "30.4%" },
    { source: "Fleet Vehicles", emissions: "1,245", percentage: "4.8%" },
    { source: "Natural Gas", emissions: "1,850", percentage: "7.1%" },
    { source: "Business Travel", emissions: "3,200", percentage: "12.3%" },
    { source: "Purchased Goods", emissions: "12,450", percentage: "48.0%" }
  ];

  const mockByBusinessData = [
    { business: "Manufacturing Division", emissions: "15,250", percentage: "58.7%" },
    { business: "Corporate Offices", emissions: "4,890", percentage: "18.8%" },
    { source: "Logistics & Distribution", emissions: "3,450", percentage: "13.3%" },
    { business: "R&D Centers", emissions: "2,355", percentage: "9.1%" }
  ];

  const mockByLocationData = [
    { location: "North America", emissions: "12,450", percentage: "47.9%" },
    { location: "Europe", emissions: "8,970", percentage: "34.5%" },
    { location: "Asia Pacific", emissions: "4,525", percentage: "17.4%" },
    { location: "Other Regions", emissions: "100", percentage: "0.4%" }
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
              {data?.map((row, index) => (
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
              Add statement about company’s strategy to reduce GHG emissions
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadSectionAutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRef1}
              value={metricsTargets.scope1Emissions}
              config={{...config, placeholder: "Add statement about company’s strategy to reduce GHG emissions"}}
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
              {data?.scope1_total || "Total Scope 1 emissions data will be displayed here from GHG calculations."}
            </div>
          </div>

          <ScopeTable
            title="Scope 1 Emissions Breakdown"
            data={data?.scope1Breakdown || mockScope1Data}
            columns={["Category", "Subcategory", "Activity", "Emissions (tCO2e)"]}
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
              ref={editorRef4}
              value={metricsTargets.scope2Emissions}
              config={{...config, placeholder: "Add statement about company's scope 2 emissions"}}
              tabIndex={4}
              onBlur={handleScope2EditorChange}
              onChange={handleScope2EditorChange}
            />
          </div>

          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (Response from GHG 2.1 "Scope 2 - Total emissions")
            </p>
            <div className="text-sm text-gray-700">
              {data?.scope2_total || "Total Scope 2 emissions data will be displayed here from GHG calculations."}
            </div>
          </div>

          <ScopeTable
            title="Scope 2 Emissions Breakdown"
            data={data?.scope2Breakdown || mockScope2Data}
            columns={["Category", "Subcategory", "Activity", "Emissions (tCO2e)"]}
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
              ref={editorRef6}
              value={metricsTargets.scope3Emissions}
              config={{...config, placeholder: "Add statement about company's scope 3 emissions"}}
              tabIndex={6}
              onBlur={handleScope3EditorChange}
              onChange={handleScope3EditorChange}
            />
          </div>

          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (Response from GHG 3.1 "Scope 3 - Total emissions")
            </p>
            <div className="text-sm text-gray-700">
              {data?.scope3_total || "Total Scope 3 emissions data will be displayed here from GHG calculations."}
            </div>
          </div>

          <ScopeTable
            title="Scope 3 Emissions Breakdown"
            data={data?.scope3Breakdown || mockScope3Data}
            columns={["Category", "Subcategory", "Activity", "Emissions (tCO2e)"]}
          />



          {/* GHG EMISSIONS BY SCOPE SECTION */}
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold mt-8">
            GHG Emissions by Scope
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start">
            <p className="text-[15px] text-[#667085] mb-2 mt-0">
              Add statement about company's GHG emissions breakdown by scope
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadGhgByScopeAutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <ScopeTable
            title="GHG Emissions by Scope"
            data={data?.emissionsByScope || mockByScopeData}
            columns={["Scope", "Emissions (tCO2e)", "Percentage of Total"]}
          />

          {/* GHG EMISSIONS BY SOURCE SECTION */}
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold mt-8">
            GHG Emissions by Source
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start">
            <p className="text-[15px] text-[#667085] mb-2 mt-0">
              Add statement about company's GHG emissions breakdown by source
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadGhgBySourceAutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <ScopeTable
            title="GHG Emissions by Source"
            data={data?.emissionsBySource || mockBySourceData}
            columns={["Emission Source", "Emissions (tCO2e)", "Percentage of Total"]}
          />


          {/* GHG EMISSIONS BY LOCATION SECTION */}
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold mt-8">
            GHG Emissions by Location
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start">
            <p className="text-[15px] text-[#667085] mb-2 mt-0">
              Add statement about company's GHG emissions breakdown by geographic location
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadGhgByLocationAutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <ScopeTable
            title="GHG Emissions by Location"
            data={data?.emissionsByLocation || mockByLocationData}
            columns={["Geographic Location", "Emissions (tCO2e)", "Percentage of Total"]}
          />

                    {/* GHG EMISSIONS INTENSITY SECTION */}
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold mt-8">
            GHG Emissions Intensity
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start">
            <p className="text-[15px] text-[#667085] mb-2 mt-0">
              Add statement about company's GHG emissions intensity metrics
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadGhgIntensityAutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRef7}
              value={metricsTargets.ghgIntensity}
              config={{...config, placeholder: "Add statement about company's GHG emissions intensity metrics"}}
              tabIndex={7}
              onBlur={handleGhgIntensityChange}
              onChange={handleGhgIntensityChange}
            />
          </div>

          <ScopeTable
            title="GHG Emissions Intensity Metrics"
            data={data?.intensityMetrics || mockIntensityData}
            columns={["Intensity Metric", "Value", "Unit"]}
          />

          <div className="mb-6">
            <JoditEditor
              ref={editorRef7}
              value={metricsTargets.ghgIntensity}
              config={{...config, placeholder: "Add sector-specific (e.g., financial or non-financial) information relevant to the ‘metrics & targets ‘ disclosures, in line with TCFD sector guidance (if applicable). "}}
              tabIndex={7}
              onBlur={handleGhgIntensityChange}
              onChange={handleGhgIntensityChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;