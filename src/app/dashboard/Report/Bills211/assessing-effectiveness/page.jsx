"use client";
import { useState, useRef, useEffect } from "react";

import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
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
const Assessingeffectiveness = ({ orgName, data }) => {
  return (
    <>
      <div>
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          10.Assessing Effectiveness
        </h3>
      </div>
      <div>
        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          To measure its effectiveness in preventing forced and child labour,
          ABC takes the following steps:
        </p>
        <div className="mb-6">
          <ul className="list-disc pl-12">
            <li className="text-[14px] text-[#344054] mb-2">
              Setting up a regular review or audit of the entity's policies and
              procedures related to forced labour and child labour
            </li>
            <li className="text-[14px] text-[#344054] mb-2">
              Tracking relevant performance indicators, such as levels of
              employee awareness, numbers of cases reported and solved through
              grievance mechanisms and numbers of contracts with anti-forced
              labour and child labour clauses
            </li>
          </ul>
        </div>

        <p className="text-[15px] text-[#344054] mb-2">
          Add additional information on policies and procedures in place to
          assess its effectiveness in ensuring that forced labour and child
          labour are not being used in its activities and supply chains and Add
          a statement if no such policies and procedures are in place
        </p>
        <p className="text-[15px] text-[#344054] mb-4 ">
          Note: If an entity controls other entities, it must also describe how
          these controlled entities assess their effectiveness in ensuring that
          forced labour and child labour are not being used in their activities
          and supply chains
        </p>
      </div>
         <div className="mb-4">
        <JoditEditor
          // value={content}
          config={config}
          tabIndex={1}
          // onBlur={handleEditorChange}
        />
      </div>
    </>
  );
};

export default Assessingeffectiveness;
