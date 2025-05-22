"use client";
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import dynamic from "next/dynamic";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setGHGEmissionReductionEfforts } from "../../../../../../lib/redux/features/ESGSlice/screen12Slice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section8 = ({ section12_1_8Ref, data,reportType }) => {
  const content = useSelector(
    (state) => state.screen12Slice.ghg_emission_reduction_efforts
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setGHGEmissionReductionEfforts(
        `Our efforts to reduce GHG emissions include investing in energy-efficient equipment, optimizing production processes, and sourcing renewable energy. We set ambitious reduction targets and report our progress annually. (Initiatives taken by an organisation to reduce emissions can be represented with graphics)`
      )
    );
  };

  const col1 = [
    "S.No",
    "Initiatve taken to reduce GHG emissions",
    "Method to account for reductions",
    "Base Year or Baseline",
    "Year",
    "Rationale for choosing base year or baseline",
    "GHG Emission reduced (tCO2e)",
    "Scopes in which reduction took place",
    "Gases included in the calculations",
    "Standard, Methodology, Assumptions and/or Calculation tools used",
  ];

  const formattedReduction =
    data && data["305_123_analyse"]
      ? data["305_123_analyse"]["disclosure_analyze_305_5"]
        ? data["305_123_analyse"]["disclosure_analyze_305_5"].length > 0
          ? data["305_123_analyse"]["disclosure_analyze_305_5"].map(
              (s, index) => {
                return {
                  "S.No": String(index + 1),
                  "Initiatve taken to reduce GHG emissions": s.initiative_taken,
                  "Method to account for reductions": s.method,
                  "Base Year or Baseline": s.base_year_or_base_inline,
                  Year: s.year,
                  "Rationale for choosing base year or baseline": s.rationale,
                  "GHG Emission reduced (tCO2e)": s.ghg_emission_reduced,
                  "Scopes in which reduction took place":
                    s.scopes?.length > 0 ? s.scopes.join(", ") : "",
                  "Gases included in the calculations":
                    s.gases_included?.length > 0
                      ? s.gases_included.join(", ")
                      : "",
                  "Standard, Methodology, Assumptions and/or Calculation tools used":
                    s.assumption_or_calculation,
                };
              }
            )
          : [
              {
                "S.No": "No data available",
                "Initiatve taken to reduce GHG emissions": "No data available",
                "Method to account for reductions": "No data available",
                "Base Year or Baseline": "No data available",
                Year: "No data available",
                "Rationale for choosing base year or baseline":
                  "No data available",
                "GHG Emission reduced (tCO2e)": "No data available",
                "Scopes in which reduction took place": "No data available",
                "Gases included in the calculations": "No data available",
                "Standard, Methodology, Assumptions and/or Calculation tools used":
                  "No data available",
              },
            ]
        : [
            {
              "S.No": "No data available",
              "Initiatve taken to reduce GHG emissions": "No data available",
              "Method to account for reductions": "No data available",
              "Base Year or Baseline": "No data available",
              Year: "No data available",
              "Rationale for choosing base year or baseline":
                "No data available",
              "GHG Emission reduced (tCO2e)": "No data available",
              "Scopes in which reduction took place": "No data available",
              "Gases included in the calculations": "No data available",
              "Standard, Methodology, Assumptions and/or Calculation tools used":
                "No data available",
            },
          ]
      : [
          {
            "S.No": "No data available",
            "Initiatve taken to reduce GHG emissions": "No data available",
            "Method to account for reductions": "No data available",
            "Base Year or Baseline": "No data available",
            Year: "No data available",
            "Rationale for choosing base year or baseline": "No data available",
            "GHG Emission reduced (tCO2e)": "No data available",
            "Scopes in which reduction took place": "No data available",
            "Gases included in the calculations": "No data available",
            "Standard, Methodology, Assumptions and/or Calculation tools used":
              "No data available",
          },
        ];

  const config = {
    enter: "BR", // Or customize behavior on Enter key
    cleanHTML: true,
    enablePasteHTMLFilter: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    style: {
      fontSize: "14px",
      color: "#667085",
    },
    allowResizeY: false,
    defaultActionOnPaste: "insert_clear_html",
    toolbarSticky: false,
    toolbar: true,
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "align",
      "outdent",
      "indent",
      "ul",
      "ol",
      "paragraph",
      "link",
      "table",
      "undo",
      "redo",
      "hr",
      "fontsize",
      "selectall",
    ],
    // Remove buttons from the extra buttons list
    removeButtons: [
      "fullsize",
      "preview",
      "source",
      "print",
      "about",
      "find",
      "changeMode",
      "paintFormat",
      "image",
      "brush",
      "font",
    ],
  };

  const handleEditorChange = (e) => {
    dispatch(setGHGEmissionReductionEfforts(e.target.value));
  };

  return (
    <>
      <div id="section12_1_8" ref={section12_1_8Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {reportType=='GRI Report: In accordance With'?'12.1.8':'12.1.7'}  Reduction in GHG Emissions
        </h3>

        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about efforts to reduce GHG emission
          </p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
        {/* <div className="mb-4">
              <JoditEditor
              // ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
              />
            </div> */}
        <textarea
          onChange={handleEditorChange}
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
        <div className="shadow-md rounded-md mb-4">
          <LeaveTable columns={col1} data={formattedReduction} />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">Standards</p>
        {data["emission_collect"] &&
        data["emission_collect"]["standard_methodology_used"] &&
        data["emission_collect"]["standard_methodology_used"].length > 0 ? (
          data["emission_collect"]["standard_methodology_used"].map(
            (val, index) => (
              <div key={index}>
                <p className="text-sm mb-4">
                  {val.Q1 ? val.Q1 : "No data available"}
                </p>
              </div>
            )
          )
        ) : (
          <p className="text-sm mb-4">No data available</p>
        )}

        <p className="text-[15px]  mb-2 font-semibold">Methodology</p>
        {data["emission_collect"] &&
        data["emission_collect"]["standard_methodology_used"] &&
        data["emission_collect"]["standard_methodology_used"].length > 0 ? (
          data["emission_collect"]["standard_methodology_used"].map(
            (val, index) => (
              <div key={index}>
                <p className="text-sm mb-4">
                  {val.Q2
                    ? val.Q2.split("\n").map((line, index) => (
                        <>
                          {line}
                          <br />
                        </>
                      ))
                    : "No data available"}
                </p>
              </div>
            )
          )
        ) : (
          <p className="text-sm mb-4">No data available</p>
        )}

        <p className="text-[15px]  mb-2 font-semibold">Calculation Tool</p>
        {data["emission_collect"] &&
        data["emission_collect"]["standard_methodology_used"] &&
        data["emission_collect"]["standard_methodology_used"].length > 0 ? (
          data["emission_collect"]["standard_methodology_used"].map(
            (val, index) => (
              <div key={index}>
                <p className="text-sm mb-4">
                  {val.Q3 ? val.Q3 : "No data available"}
                </p>
              </div>
            )
          )
        ) : (
          <p className="text-sm mb-4">No data available</p>
        )}

        <p className="text-[15px]  mb-2 font-semibold">
          Assumptions Considered
        </p>
        {data["emission_collect"] &&
        data["emission_collect"]["consolidation_assumption_considered"] &&
        data["emission_collect"]["consolidation_assumption_considered"].length >
          0 ? (
          data["emission_collect"]["consolidation_assumption_considered"].map(
            (val, index) => (
              <div key={index}>
                <p className="text-sm mb-4">
                  {val.Q1 ? val.Q1 : "No data available"}
                </p>
              </div>
            )
          )
        ) : (
          <p className="text-sm mb-4">No data available</p>
        )}
      </div>
    </>
  );
};

export default Section8;
