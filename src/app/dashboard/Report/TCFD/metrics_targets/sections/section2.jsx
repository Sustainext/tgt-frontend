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

const Section2 = ({ section7_2Ref, data, tcfdCollectData, orgName }) => {
  const dispatch = useDispatch();
  const metricsTargets = useSelector(selectMetricsTargets);
  const editorRef1 = useRef(null);

  // Extract emission data from tcfdCollectData
  const emissionAnalyse = tcfdCollectData?.emission_analyse || {};
  const allEmissionByScope = emissionAnalyse?.all_emission_by_scope || [];
  const allEmissionBySource = emissionAnalyse?.all_emission_by_source || [];
  const allEmissionByLocation = emissionAnalyse?.all_emission_by_location || [];
  const ghgEmissionIntensity = emissionAnalyse?.ghg_emission_intensity || [];

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
    const autoFillContent = `<p>We manage our emissions through a comprehensive strategy that includes setting reduction targets, implementing energy-efficient technologies, and monitoring our progress across all scopes of our operations.</p>`;
    dispatch(setScope1Emissions(autoFillContent));
    if (editorRef1.current) {
      editorRef1.current.value = autoFillContent;
    }
  };

  const handleEditorChange = (content) => {
    dispatch(setScope1Emissions(content));
  };

  // Helper function to render array values
  const renderArrayValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value || '';
  };

  const ScopeTable = ({ title, data, columns }) => (
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
              {data && data.length > 0 ? data.map((row, index) => (
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
                      {renderArrayValue(value)}
                    </td>
                  ))}
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
        <div id="section7_2" ref={section7_2Ref}>
          {/* 7.2 GHG Emissions - Main Header */}
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            7.2 GHG Emissions 
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start">
            <p className="text-[15px] text-[#667085] mb-2 mt-0">
              Add statement about company's strategy to reduce GHG emissions
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
              config={{...config, placeholder: "Add statement about company's strategy to reduce GHG emissions"}}
              tabIndex={1}
              onBlur={handleEditorChange}
              onChange={handleEditorChange}
            />
          </div>

          {/* GHG EMISSIONS BY SCOPE SECTION */}
          {allEmissionByScope.length > 0 && (
            <>
              <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
                GHG Emissions by Scope
              </h4>
              <ScopeTable
                title=""
                data={allEmissionByScope}
                columns={["Scope", "Emissions (tCO2e)", "Percentage of Total"]}
              />
            </>
          )}

          {/* GHG EMISSIONS BY SOURCE SECTION */}
          {allEmissionBySource.length > 0 && (
            <>
              <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
                GHG Emissions by Source
              </h4>
              <ScopeTable
                title=""
                data={allEmissionBySource}
                columns={["Emission Source", "Emissions (tCO2e)", "Percentage of Total"]}
              />
            </>
          )}

          {/* GHG EMISSIONS BY LOCATION SECTION */}
          {allEmissionByLocation.length > 0 && (
            <>
              <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
                GHG Emissions by Location
              </h4>
              <ScopeTable
                title=""
                data={allEmissionByLocation}
                columns={["Geographic Location", "Emissions (tCO2e)", "Percentage of Total"]}
              />
            </>
          )}

          {/* GHG EMISSIONS INTENSITY SECTION */}
          {ghgEmissionIntensity.length > 0 && (
            <>
              <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
                GHG Emissions Intensity
              </h4>
              <ScopeTable
                title=""
                data={ghgEmissionIntensity}
                columns={["Intensity Metric", "Value", "Unit"]}
              />
            </>
          )}

          {/* Show message if no emissions data available */}
          {allEmissionByScope.length === 0 && 
           allEmissionBySource.length === 0 && 
           allEmissionByLocation.length === 0 && 
           ghgEmissionIntensity.length === 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                No GHG emissions analysis data available. Please complete the emissions calculations to see detailed breakdowns by scope, source, location, and intensity metrics here.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Section2;