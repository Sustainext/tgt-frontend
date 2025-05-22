"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import STARSVG from "../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setTrainingforcedchildlabour } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Trainingforcedchildlabour = ({ orgName, data }) => {
  const content = useSelector(
    (state) => state.BillScreen1About.training_forced_child_labour
  );
  const dispatch = useDispatch();

  const loadContent = () => {
    dispatch(
      setTrainingforcedchildlabour(
        `<p style="margin-bottom: 8px;">Training content: Overview of international and domestic labour rights</p>
<ul style="list-style-type: disc; padding-left: 40px; margin-bottom: 16px;">
  <li style="margin-bottom: 5px;">Identification of risk indicators for forced and child labour</li>
  <li style="margin-bottom: 5px;">Supplier due diligence procedures and reporting protocols</li>
  <li style="margin-bottom: 5px;">Company policies and legal obligations under Bill S-211</li>
   <li style="margin-bottom: 5px;">Case studies on ethical sourcing and remediation practices</li>
</ul>
<p style="margin-bottom: 8px;">Delivery method:</p>
<ul style="list-style-type: disc; padding-left: 40px; margin-bottom: 16px;">
  <li style="margin-bottom: 5px;">Interactive online learning modules available in multiple languages</li>
  <li style="margin-bottom: 5px;">Annual in-person or virtual workshops for high-risk departments</li>
  <li style="margin-bottom: 5px;">Live sessions conducted by third-party experts in ethical supply chain practices</li>
   <li style="margin-bottom: 5px;">Onboarding sessions for all new employees covering human rights and labour standards</li>
</ul>`
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
    dispatch(setTrainingforcedchildlabour(value));
  };

  return (
    <>
      <div>
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          9.Training on Forced Labour and Child Labour 
        </h3>
      </div>
      <div>
        <p className="text-[15px] text-[#344054] mb-2">
          ABC provides training on forced labour and/or child labour to its
          employees. Training details include:
        </p>
        <ul className="list-disc pl-6">
          <li className="text-[14px] text-[#344054] mb-2">
            Scope (is the training mandatory?): Yes, the training is mandatory
            for all employees
          </li>
        </ul>
      </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
        <div className="w-[85%]">
          <p className="text-[15px] text-[#344054] mb-2">
            Add additional information about the Training on Forced Labour and
            Child Labour (If available) or Add a statement if no such trainings
            were provided
          </p>
          <p className="text-[15px] text-[#344054] mb-4 ">
            Note: If an entity controls other entities, it must also describe
            the training that these controlled entities provide to employees on
            forced labour and child labour, if applicable
          </p>
        </div>
        <div>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex h-[35px]"
            onClick={loadContent}
          >
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
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

export default Trainingforcedchildlabour;
