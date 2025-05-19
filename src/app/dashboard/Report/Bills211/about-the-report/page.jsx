"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import STARSVG from "../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setAboutTheReport } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Aboutthereport = ({ orgName, data }) => {
  const content = useSelector((state) => state.BillScreen1About.about_the_Report);
  const dispatch = useDispatch();

  const loadContent = () => {
    dispatch(
      setAboutTheReport(
        `<p>This report is prepared in compliance with the Fighting Against Forced Labour and Child Labour in Supply Chains Act (Bill S-211). It provides transparency on [Company Name – P1-Q2]’s structure, activities, and supply chains, as well as its policies and due diligence measures to prevent the use of forced labour and child labour. The report outlines identified risks, remediation measures, training initiatives, and assessment processes to ensure responsible business practices. This report corresponds to the [reporting year- year selected] reporting year, covering the financial year from [P1-Q4 – Calendar date input 1] to [P1-Q4 – Calendar date input 2]. </p>`
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

  const handleEditorChange = (value) => {
    dispatch(setAboutTheReport(value));
  };

  return (
    <>
        <div>
          <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          About the Report 
          </h3>
        </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between items-center">

        <p className="text-[15px] text-[#344054] mb-4 mt-3">
          Add Introduction about the Report
        </p>
        <button
           className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex h-[35px]"
          onClick={loadContent}

        >
          <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
          Auto Fill
        </button>
      </div>

      <div className="mb-4">
        <JoditEditor
          value={content}
          config={config}
          tabIndex={1}
          onBlur={handleEditorChange}
        />
      </div>

    
    </>
  );
};

export default Aboutthereport;

