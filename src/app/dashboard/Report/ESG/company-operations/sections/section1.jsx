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
      `<p>Effective stakeholder engagement is vital to ${orgName ? orgName : "[Company Name]"}'s sustainability strategy and overall business success. We recognize that our actions impact a wide range of stakeholders, including employees, customers, suppliers, investors, local communities, and regulatory bodies.</p>`
    ))
  }

  const config = {
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
        <p className="text-[15px] text-[#344054] mb-2 mt-3">Edit Statement</p>
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
        {data["2-1"] && (
          <>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Nature of Ownership and Legal Form:
              <p className="mb-4 font-normal">{data["2-1"].nature_of_ownership_and_legal_form || 'N/A'}</p>
            </li>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Headquarters:
              <p className="mb-4 font-normal">{data["2-1"].location_of_headquarters || 'N/A'}</p>
            </li>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Countries of Operation:
              <p className="mb-4 font-normal">
                {data["2-1"].countries_of_operation && data["2-1"].countries_of_operation.length > 0
                  ? data["2-1"].countries_of_operation.join(', ')
                  : 'N/A'}
              </p>
            </li>
          </>
        )}
      </ul>
    </>
  )
}

export default Section1;
