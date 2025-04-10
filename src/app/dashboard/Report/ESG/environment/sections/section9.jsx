"use client";
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import dynamic from "next/dynamic";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import AirQualityTable from "../tables/airQualityTable";
import { useDispatch, useSelector } from "react-redux";
import { setOzoneDepletingSubstanceElimination } from "../../../../../../lib/redux/features/ESGSlice/screen12Slice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section9 = ({ section12_1_9Ref, data }) => {
  const content = useSelector(
    (state) => state.screen12Slice.ozone_depleting_substance_elimination
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setOzoneDepletingSubstanceElimination(
        `We are committed to eliminating the use of ozone-depleting substances (ODS) in our operations. We track and report our use of ODS and have implemented measures to phase out their use in line with international agreements.  
(Data of ODS can be represented in graphical form e.g. bar graphs, pie charts etc.)`
      )
    );
  };

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
    dispatch(setOzoneDepletingSubstanceElimination(e.target.value));
  };

  const col1 = [
    {
      label: "S.No",
      dataIndex: "SNO",
      headerClass:
        "px-4 py-2 text-[12px] border-r text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y border-r text-slate-500 font-normal text-[12px]  w-[10%] text-left",
    },
    {
      label: "Source",
      dataIndex: "source",
      headerClass:
        "px-4 py-2 text-[12px] border-r  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y border-r text-slate-500 font-normal text-[12px]  w-[10%] text-left",
    },
    {
      label: "ODS",
      dataIndex: "ods",
      headerClass:
        "px-2 py-2 border-r text-[12px]  text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y border-r text-center text-slate-500 font-normal text-[12px] ",
    },
    {
      label: "Net ODS Emitted (tCFC-11e)",
      dataIndex: "net_ods_emitted",
      headerClass:
        "px-2 py-2 border-r text-[12px]  text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y border-r text-center text-slate-500 font-normal text-[12px] ",
    },

    {
      label: "Contribution %",
      dataIndex: "contribution_percentage",
      headerClass:
        "px-2 py-2 border-r text-[12px]  text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y border-r text-center text-slate-500 font-normal text-[12px] ",
    },

    {
      label: "ODS Production (t)",
      dataIndex: "net_ods_production_ton",
      headerClass:
        "px-2 py-2 border-r text-[12px]  text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y border-r text-center text-slate-500 font-normal text-[12px] ",
    },

    {
      label: "ODS Import (t)",
      dataIndex: "total_ods_imported_ton",
      headerClass:
        "px-2 py-2 border-r text-[12px]  text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y border-r text-center text-slate-500 font-normal text-[12px] ",
    },
    {
      label: "ODS Export (t)",
      dataIndex: "total_ods_exported_ton",
      headerClass:
        "px-2 py-2 border-r text-[12px]  text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y border-r text-center text-slate-500 font-normal text-[12px] ",
    },
    {
      label: "Source of emission factor used",
      dataIndex: "source_of_emission_factor",
      headerClass:
        "px-2 py-2 border-r text-[12px]  text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y border-r text-center text-slate-500 font-normal text-[12px] ",
    },
  ];

  col1.totalLabelKey = "Total";
  const col2 = [
    {
      label: "Standards used",
      dataIndex: "StandardsUsed",
      headerClass:
        "px-4 py-2 text-[12px] border-r text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y  border-r font-normal text-[13px]  w-[13%] text-left",
    },
    {
      label: "Methodologies used",
      dataIndex: "MethodologiesUsed",
      headerClass:
        "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
    },
    {
      label: "Assumptions considered",
      dataIndex: "AssumptionsConsidered",
      headerClass:
        "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
    },

    {
      label: "Calculation tools used",
      dataIndex: "CalculationToolsUsed",
      headerClass:
        "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
    },
  ];

  const TableData1 =
    data && data["air_quality_analyze"]
      ? data["air_quality_analyze"]["ozone_depleting_substances"]
        ? data["air_quality_analyze"]["ozone_depleting_substances"]
        : []
      : [];
  const TableData2 =
    data && data["air_quality_collect"]
      ? data["air_quality_collect"]["ods_standard_methodology"]
        ? data["air_quality_collect"]["ods_standard_methodology"]
        : []
      : [];
  return (
    <>
      <div id="section12_1_9" ref={section12_1_9Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          12.1.9 Ozone Depleting Substances
        </h3>

        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s commitment to eliminate use of ozone
            depleting substance
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

        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Ozone Depleting Substances
        </p>
        <div className="shadow-md rounded-md mb-4">
          <AirQualityTable columns={col1} data={TableData1} />
        </div>

        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Standards, methodologies, assumptions, and/or calculation tools used
        </p>
        <div className="shadow-md rounded-md mb-4">
          <AirQualityTable columns={col2} data={TableData2} />
        </div>
      </div>
    </>
  );
};

export default Section9;
