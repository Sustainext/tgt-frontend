"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setMission } from "../../../../../../lib/redux/features/ESGSlice/screen3Slice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section1 = ({ orgName }) => {
  const content = useSelector((state) => state.screen3Slice.mission);
  const dispatch = useDispatch();

  const loadContent = () => {
    dispatch(
      setMission(
        `<p>
        Mission<br/>
        At ${
          orgName ? orgName : "[Company Name]"
        }, our mission is to innovate and manufacture high-quality products that meet the evolving needs of our customers while promoting sustainability and ethical practices. We are dedicated to creating value for our stakeholders through responsible operations, minimizing our environmental footprint, and fostering a positive social impact.<br/>
        Vision<br/>
        Our vision is to be a global leader in the manufacturing industry, recognized for our commitment to sustainability, innovation, and excellence. We aspire to set new benchmarks in environmental stewardship, social responsibility, and governance, driving progress towards a more sustainable and equitable future for all.<br/>
        Value<br/>
        3.1 Position Statement<br/>
        Climate Change<br/>
        ${
          orgName ? orgName : "[Company Name]"
        } recognizes the urgent need to address climate change and is committed to--<br/>
        Nature<br/>
        Protecting biodiversity and natural resources is a priority for us.
        </p>`
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

  const handleEditorChange = (value) => {
    dispatch(setMission(value));
  };
  return (
    <>
      <div>
        {/* <p className="text-[15px] text-[#344054] mb-4">
            Enter data and images related to company awards and recognitions
            </p> */}
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about Mission, Vision and Values of the company
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
        <div>
          <JoditEditor
            // ref={editor}
            // className="whitespace-pre-wrap"
            value={content}
            config={config}
            tabIndex={1}
            onBlur={handleEditorChange}
          />
        </div>
      </div>
    </>
  );
};

export default Section1;
