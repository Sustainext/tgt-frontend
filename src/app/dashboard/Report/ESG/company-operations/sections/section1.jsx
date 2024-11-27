"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { setAboutTheCompany } from "../../../../../../lib/redux/features/ESGSlice/screen2Slice";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section1 = ({ orgName, data }) => {
  const content = useSelector(state => state.screen2Slice.about_the_company);
  const dispatch = useDispatch();

  const loadContent = () => {
    dispatch(setAboutTheCompany(
      `<p>This ESG report, prepared in accordance with the Global Reporting Initiative (GRI) standards, provides a comprehensive overview of ${orgName ? orgName : "[legal Name of the Company]'s"} environmental, social, and governance (ESG) performance for the reporting period [Year]. It reflects our commitment to transparency, accountability, and continuous improvement in our sustainability practices.</p>`
    ))
  }

  const config = {
    enter: "BR", // Or customize behavior on Enter key
  cleanHTML: true,
    enablePasteHTMLFilter: false, 
    askBeforePasteHTML: false, 
    askBeforePasteFromWord: false,
    style: {
      fontSize: "14px",
      color: "#667085"
    },
    allowResizeY: false,
    defaultActionOnPaste: 'insert_clear_html',
    toolbarSticky: false,
    toolbar: true,
    buttons: [
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'align',
      'outdent',
      'indent',
      'ul',
      'ol',
      'paragraph',
      'link',
      'table',
      'undo',
      'redo',
      'hr',
      'fontsize',
      'selectall'
    ],
    removeButtons: ['fullsize', 'preview', 'source', 'print', 'about', 'find', 'changeMode', 'paintFormat', 'image', 'brush', 'font'],
  };


  const handleEditorChange = (value) => {
    dispatch(setAboutTheCompany(value))
  }

  return (
    <>
      <div className="flex justify-between">
        <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about stakeholder engagement</p>
        <button className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
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

      <ul className="list-disc ml-6">
      <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Nature of Ownership and Legal Form:
              <p className="mb-4 font-normal text-sm">{data["2-1"]?data["2-1"].nature_of_ownership_and_legal_form?data["2-1"].nature_of_ownership_and_legal_form:"No data available":"No data available"}</p>
            </li>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Headquarters:
              <p className="mb-4 font-normal text-sm">{data["2-1"]?data["2-1"].location_of_headquarters?data["2-1"].location_of_headquarters:"No data available":"No data available"}</p>
            </li>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Countries of Operation:
              <p className="mb-4 font-normal  text-sm">
                {data["2-1"]?data["2-1"].countries_of_operation?data["2-1"].countries_of_operation.length > 0
                  ? data["2-1"].countries_of_operation.join(', ')
                  :"No data available":"No data available":"No data available"}
              </p>
            </li>
      </ul>
    </>
  )
}

export default Section1;
