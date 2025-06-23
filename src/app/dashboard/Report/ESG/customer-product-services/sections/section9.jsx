"use client";
import { useState, useRef, useEffect } from "react";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { setConclusion } from "../../../../../../lib/redux/features/ESGSlice/screen15Slice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section9 = ({ section15_3_1Ref, orgName, data, reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'15.3.1':'',
 
  sectionTitle = 'Management of material topic',
  sectionOrder = 15,
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
     {
      reportType=='GRI Report: In accordance With' || (reportType==='Custom ESG Report' && shouldRender)?(
        <div id="setion15_3_1" ref={section15_3_1Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          {sectionNumber} {sectionTitle}
        </h3>
        {data["3-3cde_15-3-1"] && data["3-3cde_15-3-1"].length > 0 ? (
          data["3-3cde_15-3-1"].map((val, index) => (
            <div key={index}>
              <p className="text-sm mb-2">
                {val.GRI33cd ? val.GRI33cd : "No data available"}
              </p>
              <p className="text-sm mb-4">
                {val.GRI33e ? val.GRI33e : "No data available"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm mb-4">No data available</p>
        )}
      </div>
      ):(
        <div></div>
      )
     }
    </>
  );
};

export default Section9;
