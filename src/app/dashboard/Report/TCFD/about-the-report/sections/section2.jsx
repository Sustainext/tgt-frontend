"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setAboutReportDescription,
  selectAboutReport,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section2 = ({ section2_2Ref, data }) => {
  const dispatch = useDispatch();
  const aboutReport = useSelector(selectAboutReport);
  const editorRef = useRef(null);

  // Jodit Editor configuration
  const config = {
    readonly: false,
    placeholder: "Add a brief statement explaining the purpose of this report",
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
    const autoFillContent = `<p>This report has been prepared in alignment with the TCFD recommendations to provide stakeholders with a clear understanding of how [Company Name] identifies, manages, and responds to climate-related risks and opportunities.</p>`;
    
    dispatch(setAboutReportDescription(autoFillContent));
  };

  const handleEditorChange = (content) => {
    dispatch(setAboutReportDescription(content));
  };

  return (
    <>
      <div>
        <div id="section2_2" ref={section2_2Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            2.2 Purpose
          </h3>
          
          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
            <p className="text-[15px] text-[#344054] mb-2 mt-3">
             Add a brief statement explaining the purpose of this report
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadAutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-4">
            <JoditEditor
              ref={editorRef}
              value={aboutReport.description}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;