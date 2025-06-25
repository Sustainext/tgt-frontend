"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setMainContentEmissions,
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

  // Separate refs for each editor
  const editorRefMain = useRef(null);
  const editorRefScope1 = useRef(null);
  const editorRefScope2 = useRef(null);
  const editorRefScope3 = useRef(null);
  const editorRefIntensity = useRef(null);

  // Extract emission data from tcfdCollectData
  const emissionAnalyse = tcfdCollectData?.emission_analyse || {};
  const allEmissionByScope = emissionAnalyse?.all_emission_by_scope || [];
  const allEmissionBySource = emissionAnalyse?.top_5_emisson_by_source || [];
  const allEmissionByLocation =
    emissionAnalyse?.top_5_emisson_by_location || [];
  const ghgEmissionIntensity = emissionAnalyse?.ghg_emission_intensity || [];

  // Extract scope-specific data
  const scope1Data = tcfdCollectData.scope_1 || [];
  const scope2Data = tcfdCollectData.scope_2 || [];
  const scope3Data = tcfdCollectData.scope_3 || [];

  // Jodit Editor configuration
  const config = {
    readonly: false,
    height: 200,
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

  // Main section autofill
  const loadMainAutoFillContent = () => {
    const autoFillContent = `<p>We manage our emissions through a comprehensive strategy that includes setting reduction targets, implementing energy-efficient technologies, and monitoring our progress across all scopes of our operations.</p>`;
    dispatch(setMainContentEmissions(autoFillContent));
    if (editorRefMain.current) {
      editorRefMain.current.value = autoFillContent;
    }
  };

  // Scope 1 autofill
  const loadScope1AutoFillContent = () => {
    const autoFillContent = `<p>Scope 1 emissions are direct greenhouse gas (GHG) emissions from our operations, such as fuel combustion on-site. We measure and report these emissions annually, striving to reduce them through process optimization and cleaner technologies.</p>`;
    dispatch(setScope1Emissions(autoFillContent));
    if (editorRefScope1.current) {
      editorRefScope1.current.value = autoFillContent;
    }
  };

  // Scope 2 autofill
  const loadScope2AutoFillContent = () => {
    const autoFillContent = `<p>Scope 2 emissions are indirect GHG emissions from the consumption of purchased electricity, heat, or steam. We aim to reduce Scope 2 emissions by increasing our use of renewable energy and improving energy efficiency.</p>`;
    dispatch(setScope2Emissions(autoFillContent));
    if (editorRefScope2.current) {
      editorRefScope2.current.value = autoFillContent;
    }
  };

  // Scope 3 autofill
  const loadScope3AutoFillContent = () => {
    const autoFillContent = `<p>Scope 3 emissions include all other indirect emissions in our value chain, such as those from suppliers and product use. We collaborate with suppliers to reduce these emissions and support initiatives that promote sustainable practices throughout our supply chain.</p>`;
    dispatch(setScope3Emissions(autoFillContent));
    if (editorRefScope3.current) {
      editorRefScope3.current.value = autoFillContent;
    }
  };

  const loadGhgIntensityAutoFillContent = () => {
    const autoFillContent = `<p>We track GHG emission intensity to understand our emissions in relation to our business growth and efficiency improvements.</p>`;
    dispatch(setGhgIntensity(autoFillContent));
    if (editorRefIntensity.current) {
      editorRefIntensity.current.value = autoFillContent;
    }
  };

  // Add this change handler for GHG Intensity
  const handleGhgIntensityEditorChange = (content) => {
    dispatch(setGhgIntensity(content));
  };

  // Change handlers
  const handleMainEditorChange = (content) => {
    dispatch(setMainContentEmissions(content));
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

  const ScopeTable = ({ title, data, columns, dataType }) => (
    <div className="mb-8">
      {title && (
        <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
          {title}
        </h4>
      )}
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
              {data && data.length > 0 ? (
                data.map((row, index) => (
                  <tr
                    key={index}
                    className="bg-white border-t border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {dataType === "scope" && (
                      <>
                        <td className="border-r border-gray-200 p-4 text-gray-700">
                          {row.scope || "-"}
                        </td>
                        <td className="border-r border-gray-200 p-4 text-gray-700">
                          {row.total || "-"} {row.Units || "tCO2e"}
                        </td>
                        <td className="p-4 text-gray-700">
                          {row.contribution || "-"}%
                        </td>
                      </>
                    )}
                    {dataType === "source" && (
                      <>
                        <td className="border-r border-gray-200 p-4 text-gray-700">
                          {row.source || "-"}
                        </td>
                        <td className="border-r border-gray-200 p-4 text-gray-700">
                          {row.total || "-"} {row.Units || "tCO2e"}
                        </td>
                        <td className="p-4 text-gray-700">
                          {row.contribution || "-"}%
                        </td>
                      </>
                    )}
                    {dataType === "location" && (
                      <>
                        <td className="border-r border-gray-200 p-4 text-gray-700">
                          {row.location || "-"}
                        </td>
                        <td className="border-r border-gray-200 p-4 text-gray-700">
                          {row.total || "-"} {row.Units || "tCO2e"}
                        </td>
                        <td className="p-4 text-gray-700">
                          {row.contribution || "-"}%
                        </td>
                      </>
                    )}
                    {dataType === "intensity" && (
                      <>
                        <td className="border-r border-gray-200 p-4 text-gray-700">
                          {row.intensityMetric || "-"}
                        </td>
                        <td className="border-r border-gray-200 p-4 text-gray-700">
                          {row.value || "-"}
                        </td>
                        <td className="p-4 text-gray-700">{row.unit || "-"}</td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-t border-gray-200">
                  <td
                    colSpan={columns.length}
                    className="p-4 text-center text-gray-500"
                  >
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
              onClick={loadMainAutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRefMain}
              value={metricsTargets.mainContentEmissions}
              config={{
                ...config,
                placeholder:
                  "Add statement about company's strategy to reduce GHG emissions",
              }}
              tabIndex={1}
              onBlur={handleMainEditorChange}
              onChange={() => {}}
            />
          </div>

          {/* SCOPE 1 GHG EMISSIONS SECTION */}
          <div className="mb-8">
            <h4 className="text-[16px] text-[#344054] mb-4 text-left font-semibold">
              Scope 1 GHG Emissions
            </h4>

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

            <div className="mb-4">
              <JoditEditor
                ref={editorRefScope1}
                value={metricsTargets.scope1Emissions}
                config={{
                  ...config,
                  placeholder:
                    "Add statement about company's scope 1 emissions",
                }}
                tabIndex={2}
                onBlur={handleScope1EditorChange}
                onChange={() => {}}
              />
            </div>

            {/* Response from GRI 305-1 placeholder */}
            <div className="mb-4 rounded-lg">
              <div className="mt-2">
                <div className="overflow-x-auto">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-sky-500/5 to-lime-500/5">
                          <th className="text-left py-2 px-4 border-r border-gray-200 font-medium text-gray-600">
                            Category
                          </th>
                          <th className="text-left py-2 px-4 border-r border-gray-200 font-medium text-gray-600">
                            Sub Category
                          </th>
                          <th className="text-left py-2 px-4 border-r border-gray-200 font-medium text-gray-600">
                            Activity
                          </th>
                          <th className="text-left py-2 px-4 font-medium text-gray-600">
                            Emissions (tCO2e)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {scope1Data.length > 0 ? (
                          scope1Data.map((item, index) => (
                            <tr
                              key={index}
                              className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                              <td className="py-2 px-4 border-r border-gray-200 text-gray-700">
                                {item.category || ""}
                              </td>
                              <td className="py-2 px-4 border-r border-gray-200 text-gray-700">
                                {item.subcategory}
                              </td>
                              <td className="py-2 px-4 border-r border-gray-200 text-gray-700">
                                {item.activity}
                              </td>
                              <td className="py-2 px-4 text-gray-700">
                                {item.emission_unit || "-"}{" "}
                                {item.Units || "tCO2e"}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr className="border-t border-gray-200">
                            <td
                              colSpan="4"
                              className="py-2 px-4 text-center text-gray-500"
                            >
                              No Scope 1 data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SCOPE 2 GHG EMISSIONS SECTION */}
          <div className="mb-8">
            <h4 className="text-[16px] text-[#344054] mb-4 text-left font-semibold">
              Scope 2 GHG Emissions
            </h4>

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

            <div className="mb-4">
              <JoditEditor
                ref={editorRefScope2}
                value={metricsTargets.scope2Emissions}
                config={{
                  ...config,
                  placeholder:
                    "Add statement about company's scope 2 emissions",
                }}
                tabIndex={3}
                onBlur={handleScope2EditorChange}
                onChange={() => {}}
              />
            </div>

            {/* Response from GRI 305-2 placeholder */}
            <div className="mb-4 rounded-lg">
              <div className="mt-2">
                <div className="overflow-x-auto">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-sky-500/5 to-lime-500/5">
                          <th className="text-left py-2 px-4 border-r border-gray-200 font-medium text-gray-600">
                            Category
                          </th>
                          <th className="text-left py-2 px-4 border-r border-gray-200 font-medium text-gray-600">
                            Sub Category
                          </th>
                          <th className="text-left py-2 px-4 border-r border-gray-200 font-medium text-gray-600">
                            Activity
                          </th>
                          <th className="text-left py-2 px-4 font-medium text-gray-600">
                            Emissions (tCO2e)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {scope2Data.length > 0 ? (
                          scope2Data.map((item, index) => (
                            <tr
                              key={index}
                              className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                              <td className="py-2 px-4 border-r border-gray-200 text-gray-700">
                                {item.category || ""}
                              </td>
                              <td className="py-2 px-4 border-r border-gray-200 text-gray-700">
                                {item.subcategory}
                              </td>
                              <td className="py-2 px-4 border-r border-gray-200 text-gray-700">
                                {item.activity}
                              </td>
                              <td className="py-2 px-4 text-gray-700">
                                {item.emission_unit || "-"}{" "}
                                {item.Units || "tCO2e"}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr className="border-t border-gray-200">
                            <td
                              colSpan="4"
                              className="py-2 px-4 text-center text-gray-500"
                            >
                              No Scope 2 data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SCOPE 3 GHG EMISSIONS SECTION */}
          <div className="mb-8">
            <h4 className="text-[16px] text-[#344054] mb-4 text-left font-semibold">
              Scope 3 GHG Emissions
            </h4>

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

            <div className="mb-4">
              <JoditEditor
                ref={editorRefScope3}
                value={metricsTargets.scope3Emissions}
                config={{
                  ...config,
                  placeholder:
                    "Add statement about company's scope 3 emissions",
                }}
                tabIndex={4}
                onBlur={handleScope3EditorChange}
                onChange={() => {}}
              />
            </div>

            {/* Response from GRI 305-3 placeholder */}
            <div className="mb-4 rounded-lg">
              <div className="mt-2">
                <div className="overflow-x-auto">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-sky-500/5 to-lime-500/5">
                          <th className="text-left py-2 px-4 border-r border-gray-200 font-medium text-gray-600">
                            Category
                          </th>
                          <th className="text-left py-2 px-4 border-r border-gray-200 font-medium text-gray-600">
                            Sub Category
                          </th>
                          <th className="text-left py-2 px-4 border-r border-gray-200 font-medium text-gray-600">
                            Activity
                          </th>
                          <th className="text-left py-2 px-4 font-medium text-gray-600">
                            Emissions (tCO2e)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {scope3Data.length > 0 ? (
                          scope3Data.map((item, index) => (
                            <tr
                              key={index}
                              className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                              <td className="py-2 px-4 border-r border-gray-200 text-gray-700">
                                {item.category || ""}
                              </td>
                              <td className="py-2 px-4 border-r border-gray-200 text-gray-700">
                                {item.subcategory}
                              </td>
                              <td className="py-2 px-4 border-r border-gray-200 text-gray-700">
                                {item.activity}
                              </td>
                              <td className="py-2 px-4 text-gray-700">
                                {item.emission || "-"}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr className="border-t border-gray-200">
                            <td
                              colSpan="4"
                              className="py-2 px-4 text-center text-gray-500"
                            >
                              No Scope 3 data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONSOLIDATED EMISSIONS TABLES */}
          {/* GHG EMISSIONS BY SCOPE SECTION */}
          {allEmissionByScope.length > 0 && (
            <>
              <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
                Top Emissions by Scope
              </h4>
              <ScopeTable
                title=""
                data={allEmissionByScope}
                columns={["Scope", "Emissions (tCO2e)", "Percentage of Total"]}
                dataType="scope"
              />
            </>
          )}

          {/* GHG EMISSIONS BY SOURCE SECTION */}
          {allEmissionBySource.length > 0 && (
            <>
              <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
                Top Emissions by Source
              </h4>
              <ScopeTable
                title=""
                data={allEmissionBySource}
                columns={[
                  "Emission Source",
                  "Emissions (tCO2e)",
                  "Percentage of Total",
                ]}
                dataType="source"
              />
            </>
          )}

          {/* GHG EMISSIONS BY LOCATION SECTION */}
          {allEmissionByLocation.length > 0 && (
            <>
              <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
                Top Emissions by Location
              </h4>
              <ScopeTable
                title=""
                data={allEmissionByLocation}
                columns={[
                  "Geographic Location",
                  "Emissions (tCO2e)",
                  "Percentage of Total",
                ]}
                dataType="location"
              />
            </>
          )}

          {/* GHG EMISSIONS INTENSITY SECTION */}
          <div className="mb-8">
            <h4 className="text-[16px] text-[#344054] mb-4 text-left font-semibold">
              GHG Emissions Intensity
            </h4>

            <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start">
              <p className="text-[15px] text-[#667085] mb-2 mt-0">
                Add statement about tracking of GHG emission intensity
              </p>
              <button
                className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
                onClick={loadGhgIntensityAutoFillContent}
              >
                <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
                Auto Fill
              </button>
            </div>

            <div className="mb-4">
              <JoditEditor
                ref={editorRefIntensity}
                value={metricsTargets.ghgIntensity}
                config={{
                  ...config,
                  placeholder:
                    "Add statement about tracking of GHG emission intensity",
                }}
                tabIndex={5}
                onBlur={handleGhgIntensityEditorChange}
                onChange={() => {}}
              />
            </div>

            {/* Response from Analysis+Environment+Emissions placeholder */}
            <div className="mb-4 rounded-lg">
              <div className="mt-2">
                <div className="overflow-x-auto">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-sky-500/5 to-lime-500/5">
                          <th className="text-left py-2 px-4 border-r border-gray-200 font-medium text-gray-600">
                            Organization Metric
                          </th>
                          <th className="text-left py-2 px-4 border-r border-gray-200 font-medium text-gray-600">
                            Quantity
                          </th>
                          <th className="text-left py-2 px-4 border-r border-gray-200 font-medium text-gray-600">
                            Unit
                          </th>
                          <th className="text-left py-2 px-4 border-r border-gray-200 font-medium text-gray-600">
                            Type of GHG
                          </th>
                          <th className="text-left py-2 px-4 font-medium text-gray-600">
                            GHG Emission Intensity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ghgEmissionIntensity.length > 0 ? (
                          ghgEmissionIntensity.map((item, index) => (
                            <tr
                              key={index}
                              className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                              <td className="py-2 px-4 border-r border-gray-200 text-gray-700">
                                Data
                              </td>
                              <td className="py-2 px-4 border-r border-gray-200 text-gray-700">
                                Data
                              </td>
                              <td className="py-2 px-4 border-r border-gray-200 text-gray-700">
                                Data
                              </td>
                              <td className="py-2 px-4 border-r border-gray-200 text-gray-700">
                                Data
                              </td>
                              <td className="py-2 px-4 text-gray-700">Data</td>
                            </tr>
                          ))
                        ) : (
                          <tr className="border-t border-gray-200">
                            <td
                              colSpan="5"
                              className="py-2 px-4 text-center text-gray-500"
                            >
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Show message if no emissions data available */}
          {allEmissionByScope.length === 0 &&
            allEmissionBySource.length === 0 &&
            allEmissionByLocation.length === 0 &&
            ghgEmissionIntensity.length === 0 && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700 text-sm">
                  No GHG emissions analysis data available. Please complete the
                  emissions calculations to see detailed breakdowns by scope,
                  source, location, and intensity metrics here.
                </p>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default Section2;
