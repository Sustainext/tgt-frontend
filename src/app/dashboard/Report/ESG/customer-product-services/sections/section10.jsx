"use client";
import { useState, useRef, useEffect } from "react";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { setConclusion } from "../../../../../../lib/redux/features/ESGSlice/screen15Slice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section10 = ({ section15_3_1Ref, orgName, data, reportType,
 }) => {
  const shouldRender = useSelector((state)=> state.reportCreation.includeMaterialTopics)
  const conclusion = useSelector((state) => state.screen15Slice.conclusion);
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setConclusion(
        `<p>Conclusion<br/>
At ${
          orgName ? orgName : "[Company Name]"
        }, our commitment to sustainability is unwavering. This report, prepared in accordance with the Global Reporting Initiative (GRI) standards, outlines our efforts, achievements, and future goals in fostering sustainable development across our operations. We recognize that our journey toward sustainability is continuous and requires persistent effort, innovation, and collaboration<br/>Our Commitment to Continuous Improvement<br/> 
Sustainability is embedded in our corporate strategy, and we are dedicated to continuous improvement in all areas of our business. We have set ambitious targets and implemented robust systems to monitor our progress. Our commitment is reflected in the strides we have made in reducing our environmental footprint, enhancing our social contributions, and upholding strong governance practices</p>`
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
    dispatch(setConclusion(value));
  };
  return (
    <>
    <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add a conclusion to the report
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
        {/* <textarea
            onChange={handleEditorChange}
          value={conclusion}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        /> */}
        <div>
          <JoditEditor
            // ref={editor}
            // className="whitespace-pre-wrap"
            value={conclusion}
            config={config}
            tabIndex={1}
            onBlur={handleEditorChange}
          />
        </div>
    </>
  );
};

export default Section10;
