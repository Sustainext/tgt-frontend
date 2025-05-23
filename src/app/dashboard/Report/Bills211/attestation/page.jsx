"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlinePlaylistAdd, MdOutlineFileUpload } from "react-icons/md";
import STARSVG from "../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setAboutTheReport } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Attestation = ({ orgName, data }) => {
  const content = useSelector(
    (state) => state.BillScreen1About.about_the_Report
  );
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
          Attestation
        </h3>
      </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between items-center">
        <p className="text-[15px] text-[#344054] mb-4 mt-3 w-[85%]">
          Add a statement confirming that the approving member has the legal
          authority to bind the entity should also be included in the
          attestation
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
      <div className="flex mt-8">
        <p className="text-[15px] text-[#344054]">Signature: </p>
        <button
          // onClick={handleButtonClick}
          className="flex bg-transparent  text-center text-[#007EEF] text-[15px] rounded-md ml-2"
        >
          <p>
            <MdOutlineFileUpload
              className="mt-1"
              style={{ fontSize: "16px" }}
            />
          </p>
          <p className="ml-2">Upload Image</p>
        </button>
      </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between items-center mt-4">
        <p className="text-[15px] text-[#344054] mb-4 mt-3 w-[85%]">
          Note: In the case of a report submitted on behalf of a single entity,
          the report must be approved by the entity's governing body. The
          approval must be evidenced by a statement that indicates it was
          approved by its governing body and includes the signature of one or
          more members of the governing body.
        </p>

        <button
          className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex h-[35px]"
          onClick={loadContent}
        >
          <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
          Auto Fill
        </button>
      </div>
      <p className="text-[15px] text-[#344054] mb-4 mt-3">
        In the case of a joint report, however, the approval must be evidenced
        by a statement that states whether it was approved by the governing body
        of each entity included in the report or by the governing body of the
        entity, if any, that controls each entity included in the report, and
        include the signature of one or more members of the governing body(ies).
        It is up to each entity to determine the appropriate governing body or
        bodies to approve the report.{" "}
      </p>
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

export default Attestation;
